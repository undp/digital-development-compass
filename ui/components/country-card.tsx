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
  showFooterLink = false,
}: {
  definitions: any;
  isActive?: boolean;
  onPillarChange?: (pillar: Pillar) => void;
  showFooterLink?: boolean;
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
      } pb-0 w-full flex-1 h-full border rounded-lg flex flex-col items-center bg-white overflow-hidden`}
    >
      <div className="p-4 flex flex-col items-center">
        <Link href={`/country/${country.alpha3}`}>
          <div className="flex flex-col items-center group cursor-pointer">
            <div className="flex-shrink-0">
              <span className={`fp ${country.alpha2?.toLowerCase()}`}></span>
            </div>
            <div className="flex-1 ml-2">
              <h3 className="text-xl">
                <div className="group-hover:underline">{country.name}</div>
              </h3>
            </div>
          </div>
        </Link>
        <div className="py-4 flex items-center justify-center text-center w-full">
          <StageGauge
            name={country.name}
            definitions={definitions[maybeControlledPillar]}
            pillar={maybeControlledPillar}
            scores={country.scores}
          />
        </div>
      </div>
      {showFooterLink && (
        <div className="mb-4">
          <Link href={`/country/${country.alpha3}`}>
            <a className="bg-[#006EB5] hover:button-bg-color text-base uppercase font-bold px-6 py-4 text-white flex-shrink-0 flex items-center">
              view more
            </a>
          </Link>
        </div>
      )}
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
