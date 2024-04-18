import { CountryCard } from "components/country-card";
import { CountryComparisons } from "components/country-comparisons";
import { StageGauge } from "components/stage-gauge";
import { db } from "database";
import { ancillary } from "database/ancillary";
import groupBy from "lodash/groupBy";
import { InferGetStaticPropsType } from "next";
import React from "react";

export default function Sandbox(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { country, definitions } = props;

  return (
    <div className="p-8 space-y-8">
      <div className="gap-8 w-full flex-1">
        {country && (
          <div className="space-y-8 flex flex-col">
            <CountryComparisons pillars={ancillary.pillars} country={country} />
            <StageGauge
              name={country["Country or Area"]}
              scores={country.scores}
              definitions={definitions["Economy"]}
              pillar="Overall"
            />
            <StageGauge
              name={country["Country or Area"]}
              scores={country.scores}
              definitions={definitions["Economy"]}
              pillar="Economy"
            />
            <StageGauge
              name={country["Country or Area"]}
              scores={country.scores}
              definitions={definitions["Regulation"]}
              pillar="Regulation"
            />
            <StageGauge
              name={country["Country or Area"]}
              scores={country.scores}
              definitions={definitions["Digital Public Infrastructure"]}
              pillar="Digital Public Infrastructure"
            />
            <StageGauge
              name={country["Country or Area"]}
              scores={country.scores}
              definitions={definitions["Connectivity"]}
              pillar="Connectivity"
            />
            <StageGauge
              name={country["Country or Area"]}
              scores={country.scores}
              definitions={definitions["People"]}
              pillar="People"
            />
            <StageGauge
              name={country["Country or Area"]}
              scores={country.scores}
              definitions={definitions["Government"]}
              pillar="Government"
            />
            <div className="w-1/2 lg:w-1/2">
              <CountryCard
                country={{
                  name: country["Country or Area"],
                  alpha3: country["ISO-alpha3 Code"],
                  alpha2: country["ISO-alpha2 Code"],
                  scores: country["scores"],
                }}
                definitions={definitions}
                pillar="Economy"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const country = db.countries.find((c) => c["ISO-alpha3 Code"] === "FRA");
  return {
    props: {
      country,
      definitions: groupBy(db.definitions, "Pillar"),
    },
  };
};
