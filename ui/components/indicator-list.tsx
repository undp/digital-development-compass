import { Pillar } from "database/ancillary";
import { Score } from "database/processed/db";
import { roundNumber } from "lib";
import { useState } from "react";
import useSWR from "swr";
import ExternalDefault from "../public/external-default.svg";
import ExternalDefaultHover from "../public/external-hover.svg";
import Image from "next/image";

interface IndicatorListProps {
  country: string;
  pillar: Pillar;
  subpillar: string;
  isShowingRawScores: boolean;
  showIndicators: boolean;
  showMissingIndicators: boolean;
  showSources: boolean;
}

const fetchIndicators = async (
  _: string,
  country: string,
  pillar: string,
  subpillar: string
) => {
  let url = `/api/indicators`;
  let params = { country, pillar, subpillar };
  let stringifiedParams = new URLSearchParams(params).toString();
  // @ts-ignore
  const res = await fetch(`${url}?${stringifiedParams}`);
  return await res.json();
};

export function IndicatorList(props: IndicatorListProps) {
  const {
    country,
    pillar,
    subpillar,
    isShowingRawScores,
    showIndicators,
    showMissingIndicators,
    showSources,
  } = props;
  const { data } = useSWR(
    ["indicators", country, pillar, subpillar],
    fetchIndicators
  );
  if (!data)
    return <p className="text-sm text-gray-600">Loading indicator data...</p>;

  if (!showIndicators)
    return (
      <p className="font-medium text-sm mb-2">
        based on {data.length} indicator
        {data.length === 0 ? "s" : data.length > 1 ? "s" : ""}
      </p>
    );

  return (
    <div>
      <ul className="space-y-2">
        {data
          .filter((ind: any) => ind["data_status"] === "1")
          .map((indicator: any) => (
            <Indicator
              key={indicator.Indicator}
              indicator={indicator}
              showSources={showSources}
              isShowingRawScores={isShowingRawScores}
            />
          ))}
        {!showMissingIndicators && (
          <MissingIndicators
            filledIndicators={data.filter(
              (ind: any) => ind["data_status"] === "1"
            )}
            country={country}
            pillar={pillar}
            subpillar={subpillar}
            showSources={showSources}
            isShowingRawScores={isShowingRawScores}
          />
        )}
        {showMissingIndicators &&
          data
            .filter((ind: any) => ind["data_status"] === "0")
            .map((indicator: any) => (
              <Indicator
                key={indicator.Indicator}
                indicator={indicator}
                showSources={showSources}
                isShowingRawScores={isShowingRawScores}
              />
            ))}
      </ul>
    </div>
  );
}

const fetchIndicatorsForSubpillar = async (
  _: string,
  country: string,
  pillar: string,
  subpillar: string
) => {
  let url = `/api/indicators-for-subpillar`;
  let params = { country, pillar, subpillar };
  let stringifiedParams = new URLSearchParams(params).toString();
  // @ts-ignore
  const res = await fetch(`${url}?${stringifiedParams}`);
  return await res.json();
};
const MissingIndicators = ({
  filledIndicators,
  country,
  pillar,
  subpillar,
  showSources,
  isShowingRawScores,
}: {
  filledIndicators: Score[];
  country: string;
  pillar: Pillar;
  subpillar: string;
  showSources: boolean;
  isShowingRawScores: boolean;
}) => {
  const { data: allIndicators } = useSWR(
    ["indicators", country, pillar, subpillar, true],
    fetchIndicatorsForSubpillar
  );

  if (!allIndicators)
    return (
      <p className="text-sm text-gray-600">Loading missing indicators...</p>
    );

  const missingIndicators = allIndicators
    .filter(
      (indicator: Score) =>
        !filledIndicators.find(
          ({ Indicator }: Score) => Indicator === indicator["Indicator"]
        )
    )
    .map((indicator: Score) => ({
      ...indicator,
      new_rank_score: null,
      data_col: null,
    }));

  return (
    <>
      {missingIndicators.map((indicator: any) => (
        <Indicator
          key={indicator.Indicator}
          indicator={indicator}
          showSources={showSources}
          isShowingRawScores={isShowingRawScores}
        />
      ))}
    </>
  );
};

const Indicator = ({
  indicator,
  showSources,
  isShowingRawScores,
}: {
  indicator: Score & { sources: Score[] };
  showSources: boolean;
  isShowingRawScores: boolean;
}) => {
  const hasNoData = indicator.data_col === null;
  const [isIconHovered, setIconIsHovered] = useState(false);
  // we want to get the source name from the list of sources,
  // but if empty, we need to fall back to the indicator's "Data Source"
  const sources = (indicator.sources || [indicator])
    .map((indicator) => ({
      link: indicator["Source URL"],
      source: indicator["Source URL"],
      year: indicator["Year"],
    }))
    .filter((indicator) => indicator.source && indicator.link);
  const value = +(isShowingRawScores
    ? indicator.data_col
    : indicator.new_rank_score);
  const disp_val = value == 0 ? 0 : roundNumber(value, 2);
  const [isHovered, setIsHovered] = useState(false);

  const renderValue = () => {
    if (isShowingRawScores && indicator.raw_data_col) {
      const number = parseFloat(indicator.raw_data_col);
      if (!isNaN(number)) {
        return number;
      }
      const cleanedData = indicator.raw_data_col
        .replace(/^["']+|["']+$/g, "")
        .trim();

      if (cleanedData.length > 9) {
        // Find the first word
        const firstWord = cleanedData.split(" ")[0];

        return (
          <span
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {firstWord}...
          </span>
        );
      } else {
        return cleanedData;
      }
    } else {
      return hasNoData ? "Data unavailable" : disp_val;
    }
  };

  const getWidthClass = () => {
    if (!indicator || !indicator.raw_data_col) {
      return "";
    }
    if (indicator.raw_data_col.length <= 7) {
      return "w-auto";
    }
    if (indicator.raw_data_col.length < 20) {
      return "sm:w-40 md:w-70 lg:w-128";
    }
    return "sm:w-80 md:w-80 lg:w-128";
  };

  return (
    <li className={hasNoData ? "text-slate-500" : ""}>
      <div className="flex items-center justify-between">
        <span className="text-sm">{indicator?.Indicator}</span>
        <span className="font-mono text-xs ml-4 flex-shrink-0 relative">
          {renderValue()}
          {isHovered && indicator.raw_data_col && (
            <div
              className={`absolute right-0 text-center bottom-full mb-2 bg-white shadow-lg border border-gray-200 z-50
              ${getWidthClass()} p-2`}
            >
              {indicator?.raw_data_col?.replace(/^["']+|["']+$/g, "").trim() ||
                ""}
            </div>
          )}
        </span>
      </div>
      {/* {isShowingRawScores && indicator.raw_data_col && (
        <ul className="mt-1 mb-2 divide-y-1">
          <li className="text-slate-600 text-xs mb-3">
            <div className="group flex items-center">
              <FaSourcetree className="group-hover:no-underline mr-1 flex-none" />
              <span>{indicator.raw_data_col}</span>
            </div>
          </li>
        </ul>
      )} */}
      {/* {isShowingRawScores && !indicator.raw_data_col && (
        <ul className="mt-1 mb-2 divide-y-1">
          <li className="text-slate-600 text-xs mb-3">
            <div className="group flex items-center">
              <span>Data unavailable</span>
            </div>
          </li>
        </ul>
      )} */}
      {showSources && sources.length === 0 && (
        <p className="text-xs text-gray-600">Source Data Unavailable</p>
      )}
      {showSources && sources.length > 0 && (
        <ul className="mt-1 mb-2 divide-y-1">
          {sources.map((source, i: number) => {
            return (
              <li className="text-slate-600 underline text-xs mb-3" key={i}>
                <a
                  className="group flex items-center"
                  target="_blank"
                  href={source.link}
                  onMouseEnter={() => setIconIsHovered(true)}
                  onMouseLeave={() => setIconIsHovered(false)}
                >
                  {isIconHovered ? (
                    <Image
                      src={ExternalDefaultHover}
                      height={12}
                      alt="ExternalDefaultHover"
                      className="mr-1 flex-none"
                    />
                  ) : (
                    <Image
                      src={ExternalDefault}
                      height={12}
                      alt="ExternalDefault"
                      className="mr-1 flex-none"
                    />
                  )}
                  <span className="group-hover:underline">{source.source}</span>{" "}
                  &nbsp;
                  <span className="group-hover:no-underline">
                    -<em>&nbsp;{source.year}</em>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
};
