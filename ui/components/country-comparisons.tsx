// @ts-nocheck

import { interpolateHclLong, scaleLinear } from "d3";
import { ancillary, Pillar } from "database/ancillary";
import type { Country } from "database/processed/db";
import { AnimatePresence, motion } from "framer-motion";
import { pillarColorMap, roundNumber } from "lib";
import Link from "next/link";
import { useMemo, useState } from "react";
import useSWR from "swr";
import { Select } from "./select";
import { Spinner } from "./spinner";

async function fetchComparisonData(_: string, iso3: string, key: string) {
  let url = `/api/compare`;
  let params = { key, country: iso3 };
  let stringifiedParams = new URLSearchParams(params).toString();
  // @ts-ignore
  const res = await fetch(`${url}?${stringifiedParams}`);
  return await res.json();
}

interface CountryComparisonsProps {
  country: Country;
  pillars: typeof ancillary.pillars;
}

export function CountryComparisons(props: CountryComparisonsProps) {
  const { country, pillars } = props;
  const [sameKey, setSameKey] = useState<string>("Sub-region Name");
  const [pillar, setPillar] = useState<string>("Overall");
  const [subpillar, setSubpillar] = useState<string>();
  const countryCode = country["ISO-alpha3 Code"];
  const pillarNames = Object.keys(pillars);

  const colorScale = useMemo(() => {
    const colorRange = pillarColorMap[pillar];
    return scaleLinear<string>()
      .domain([0, 6])
      .range([colorRange.triple[1], colorRange.triple[2]])
      .interpolate(interpolateHclLong);
  }, [pillar]);

  // We only have a completely new data set when we filter by region or sub region.
  const { data, error } = useSWR<Country[]>(
    ["compare", countryCode, sameKey],
    fetchComparisonData
  );

  if (!data)
    return (
      <div className="flex items-center">
        <div className="w-4 h-4 mr-2 text-gray-500">
          <Spinner />
        </div>
        <p className="text-gray-600 text-sm">Loading comparison data...</p>
      </div>
    );

  // todo(Matt) I don't think this is right!
  const sortedData = data.sort((a, b) => {
    if (pillar === "Overall") {
      return b.scores[pillar].score - a.scores[pillar].score;
    } else if (pillar !== "Overall" && Boolean(subpillar)) {
      return (
        b.scores[pillar][subpillar].score - a.scores[pillar][subpillar].score
      );
    } else {
      return b.scores[pillar].score - a.scores[pillar].score;
    }
  });

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <Select
          value={sameKey}
          onChange={setSameKey}
          label="Compared to"
          trigger={options[sameKey]}
          itemRenderer={(option) => {
            return <span>{options[option]}</span>;
          }}
          options={Object.keys(options)}
        ></Select>

        <Select
          label="Pillar"
          value={pillar}
          trigger={
            <span
              className="text-xs text-white font-medium uppercase tracking-widest py-[2px] px-[12px] rounded-full"
              style={{ background: pillarColorMap[pillar].base }}
            >
              {pillar}
            </span>
          }
          itemRenderer={(option) => {
            let asPillar = option as Pillar;
            let color = pillarColorMap[asPillar].base;
            return (
              <div className="py-1">
                <span
                  className="text-xs text-white font-medium uppercase tracking-widest py-[2px] px-[12px] rounded-full"
                  style={{ background: color }}
                >
                  {asPillar}
                </span>
              </div>
            );
          }}
          onChange={(pillar) => {
            setSubpillar(undefined);
            setPillar(pillar);
          }}
          options={pillarNames}
        ></Select>
        <Select
          disabled={!pillar || pillar === "Overall"}
          trigger={
            !subpillar ? (
              <span className="text-gray-600">Select subpillar</span>
            ) : (
              subpillar
            )
          }
          label="Subpillar"
          value={subpillar}
          itemRenderer={(option) => {
            return <span>{option}</span>;
          }}
          onChange={(subpillar) => {
            const relevantSubpillars = pillars[pillar];
            // @ts-ignore
            setSubpillar(
              relevantSubpillars.includes(subpillar) ? subpillar : "Overall"
            );
          }}
          options={pillars[pillar] || []}
        ></Select>
      </div>
      <AnimatePresence>
        {sortedData.length === 0 && (
          <p className="text-gray-600 text-sm my-2">
            No data matching these filters.
          </p>
        )}
        {sortedData.map((country, index) => {
          const score = subpillar
            ? country.scores[pillar][subpillar]?.score
            : country.scores[pillar]?.score;

          const isSelected = country["ISO-alpha3 Code"] === countryCode;
          return (
            <motion.div
              className={`w-full flex items-center px-3 border rounded ${
                isSelected
                  ? " border-brand-blue bg-brand-blue/10 shadow-md"
                  : "border-transparent hover:bg-gray-100"
              }`}
              key={country["ISO-alpha3 Code"]}
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { type: "spring", stiffness: 200 },
              }}
              exit={{ opacity: 0, x: 10 }}
            >
              <Link href={`/country/${country["ISO-alpha3 Code"]}`}>
                <a
                  className="group flex-none flex items-center w-52 py-2"
                  title={country.name}
                >
                  <span
                    className={`fp fp-sm ${country[
                      "ISO-alpha2 Code"
                    ].toLowerCase()}`}
                  ></span>
                  <div className="text-gray-500 font-mono text-sm mr-2 w-8 text-right">
                    #{index + 1}
                  </div>
                  <div className="flex-1 truncate group-hover:underline">
                    {country["Country or Area"]}
                  </div>
                </a>
              </Link>
              {!!score ? (
                <div className="relative flex-1 border-b border-gray-200 h-1/2">
                  <motion.div
                    animate={{
                      left: `${xScale(score)}%`,
                      background: isSelected
                        ? pillarColorMap[pillar].base
                        : colorScale(score),
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                    }}
                    className={`w-6 h-6 rounded-full top-0 transform -translate-y-1/2 absolute flex items-center justify-center ${
                      isSelected ? "ring-2 ring-opacity-10 ring-white" : ""
                    }`}
                  >
                    <div className="font-mono absolute text-xs text-gray-600 left-full ml-2">
                      {roundNumber(score, 2)}
                    </div>
                  </motion.div>
                </div>
              ) : (
                <div className="flex-1 font-mono text-xs italic text-gray-400">
                  No data
                </div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

const xScale = scaleLinear().domain([0, 6]).range([0, 100]);

const options = {
  "Region Name": "Regional Neighbors",
  "Sub-region Name": "Subregional Neighbors",
  sids: "Small Island Developing States (SIDS)",
  lldc: "Land Locked Developing Countries (LLDC)",
  ldc: "Least Developed Countries (LDC)",
};
