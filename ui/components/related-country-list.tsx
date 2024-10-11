import { Pillar } from "database/ancillary";
import ancillary from "database/processed/ancillary";
import { Country } from "database/processed/db";
import { useMemo, useState } from "react";
import { CountryCard } from "./country-card";
import { Select } from "./select";
import { OverflowList } from "react-overflow-list";
import { SideMenuFilterBadge } from "./filter-badge";

interface RelatedCountryListProps {
  countries: Pick<
    Country,
    "ISO-alpha3 Code" | "ISO-alpha2 Code" | "scores" | "Country or Area"
  >[];
  definitions: any;
  currentCountryId: string;
}

interface FilterItem {
  label: string;
  value: string;
  onReset: () => void;
}

export function RelatedCountryList(props: RelatedCountryListProps) {
  const [pillar, setPillar] = useState<Pillar>("Overall");
  const { countries, definitions, currentCountryId } = props;
  const appliedFilters: FilterItem[] = useMemo(() => {
    return [
      {
        label: "Pillar name",
        value: pillar,
        onReset: () => setPillar("Overall"),
      },
    ];
  }, [pillar]);

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
            pillar == "Overall" ? (
              <span
              className=" text-black font-semibold uppercase text-base"
            >
              PILLAR
            </span>
            ) : (
              <span
              className="text-black font-semibold uppercase text-base"
            >
              PILLAR (1)
            </span>
            )
          }
          itemRenderer={(option) => {
            let asPillar = option as Pillar;
            return (
              <div className="py-1">
                <span
                  className="text-[16px] font-normal"
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
      <OverflowList
        items={appliedFilters}
        className="flex-1 ml-4 md:ml-1 pt-2 flex items-center space-x-2 flex-nowrap"
        itemRenderer={(item) => {
          return (
            <div className="flex-shrink-0" key={item.label}>
              <SideMenuFilterBadge
                value={item.value}
                onClick={item.onReset}
                label={item.label}
              />
            </div>
          );
        }}
        overflowRenderer={(items) => {
          return (
            <div>
              <span className="text-sm text-gray-600">
                + {items.length} more
              </span>
            </div>
          );
        }}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-6">
        {countries.slice(0, 2).map((country) => (
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