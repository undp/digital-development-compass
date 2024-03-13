import { Pillar } from "database/ancillary";
import ancillary from "database/processed/ancillary";
import { Country } from "database/processed/db";
import { useState } from "react";
import { CountryCard } from "./country-card";
import { Select } from "./select";

interface RelatedCountryListProps {
  countries: Pick<
    Country,
    "ISO-alpha3 Code" | "ISO-alpha2 Code" | "scores" | "Country or Area"
  >[];
  definitions: any;
  currentCountryId: string;
}

export function RelatedCountryList(props: RelatedCountryListProps) {
  const [pillar, setPillar] = useState<Pillar>("Overall");
  const { countries, definitions, currentCountryId } = props;
  return (
    <div>
      <h2 className="uppercase tracking-wider font-medium">
        Related countries
      </h2>
      <div className="mt-4 lg:w-1/3">
        <Select
          value={pillar}
          onChange={setPillar}
          label="Pillar"
          trigger={
            <span
              className="text-xs text-white font-medium uppercase tracking-widest py-[2px] px-[12px] rounded-full"
              style={{ background: ancillary.pillarColorMap[pillar].base }}
            >
              {pillar}
            </span>
          }
          itemRenderer={(option) => {
            let asPillar = option as Pillar;
            let color = ancillary.pillarColorMap[asPillar].base;
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
          // @ts-ignore
          options={ancillary.pillarNames}
        ></Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-6">
        {countries.slice(0, 8).map((country) => (
          <div key={country["ISO-alpha3 Code"]}>
            <CountryCard
              isActive={country["ISO-alpha3 Code"] === currentCountryId}
              country={{
                name: country["Country or Area"],
                alpha3: country["ISO-alpha3 Code"],
                alpha2: country["ISO-alpha2 Code"],
                scores: country["scores"],
              }}
              definitions={definitions}
              pillar={pillar}
              onPillarChange={setPillar}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
