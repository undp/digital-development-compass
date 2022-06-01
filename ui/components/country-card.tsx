import { Pillar } from "database/ancillary";
import type { Scores } from "database/processed/db";
import Link from "next/link";
import { useState } from "react";
import { ReadinessScale } from "./readiness-scale";
import { StageGauge } from "./stage-gauge";

export function CountryCard({
  country,
  pillar,
  definitions,
  onPillarChange,
  isActive,
}: {
  definitions: any;
  isActive?: boolean;
  onPillarChange?: (pillar: Pillar) => void;
  country: {
    alpha2: string;
    alpha3: string;
    name: string;
    scores: Scores;
  };
  pillar: Pillar;
}) {
  // This component can be used in a controlled/uncontrolled manner.
  const [localPillar, setLocalPillar] = useState(pillar);

  let maybeControlledPillar = onPillarChange ? pillar : localPillar;

  const handlePillarClick = (pillar: Pillar) => {
    if (onPillarChange) {
      onPillarChange(pillar);
    } else {
      setLocalPillar(pillar);
    }
  };

  return (
    <div
      id={`country-${country.alpha3}`}
      className={`${
        isActive
          ? "ring-4 ring-brand-blue/20 border-brand-blue shadow-lg shadow-brand-blue/20"
          : "border-gray-200 shadow-lg"
      } p-4 pb-0 w-full flex-1 h-full border  rounded-lg flex flex-col items-start bg-white`}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <span className={`fp ${country.alpha2?.toLowerCase()}`}></span>
        </div>
        <div className="flex-1 ml-2">
          <h3 className="text-xl">
            <Link href={`/country/${country.alpha3}`}>
              <a className="hover:underline">{country.name}</a>
            </Link>
          </h3>
        </div>
      </div>
      <div className="py-4 flex items-center justify-center text-center w-full">
        <StageGauge
          name={country.name}
          definitions={definitions[maybeControlledPillar]}
          pillar={maybeControlledPillar}
          scores={country.scores}
        />
      </div>
      <div className="w-full flex-1 flex flex-col justify-end">
        <ReadinessScale
          activePillar={maybeControlledPillar}
          onPillarClick={handlePillarClick}
          scores={country.scores}
        />
      </div>
    </div>
  );
}
