import pillarIcons from "components/icons";
import { DigitalRightsPillar} from "database/ancillary";
import ancillary from "database/processed/ancillary";
import type { Country, Stage} from "database/processed/db";
import kebabCase from "lodash/kebabCase";
// import { useState } from "react";
import { ProgressPill } from "./progress-pill";
import { DigitalRightStageList } from "./stage-list";
import { DigitalRightIndicatorList } from "./digital-right-indicator-list";
import { useState } from "react";

interface Props {
  country: Country;
  isShowingRawScores: boolean;
  showIndicators: boolean;
  showMissingIndicators: boolean;
  showSources: boolean;
}

interface PillarProps {
  isShowingRawScores: boolean;
  showIndicators: boolean;
  showMissingIndicators: boolean;
  showSources: boolean;
  country: Country;
  pillar: DigitalRightsPillar;
}

interface PillarListProps {
  country: Country;
  pillar: DigitalRightsPillar;
  isShowingRawScores: boolean;
  showIndicators: boolean;
  showMissingIndicators: boolean;
  showSources: boolean;
  color: string;
}

const PillarList = (props: PillarListProps) => {
  const {
    color,
    country,
    pillar,
    isShowingRawScores,
    showIndicators,
    showMissingIndicators,
    showSources,
  } = props;
  // @ts-ignore
  let { score, stage, rank, confidence } = country.digitalRightScores[pillar];
  return (
    <div className="scroll-mt-24 group" id={kebabCase(pillar)}>
      <div className="flex items-center justify-between group-target:bg-yellow-50 group-target:ring-2 group-target:ring-offset-4 group-target:ring-yellow-300">
        <h3 className="text-base font-medium">{pillar}</h3>
        {score ? (
          <span className="text-sm text-right font-mono">
            {/* <span>
              {rank}
              <sup>{getOrdinal(rank)}</sup>
            </span>{" "} */}
            {/* /  */}
            {/* {score} */}
          </span>
        ) : (
          <span className="text-sm text-gray-600"></span>
        )}
      </div>
      {stage && (
        <div className="mt-4">
          <div className="pb-3 relative">
            <StageInfo
              stage={stage}
              color={color}
              pillar={pillar}
            />
          </div>
          {confidence && (
            <ProgressPill
              bar={color}
              background="white"
              border={color}
              value={confidence}
              label={`${Math.ceil(confidence)}% Data Availability`}
            />
          )}
        </div>
      )}
      <div className="mt-4">
        <DigitalRightIndicatorList
          isShowingRawScores={isShowingRawScores}
          country={country["Country or Area"]}
          pillar={pillar}
          showIndicators={showIndicators}
          showMissingIndicators={showMissingIndicators}
          showSources={showSources}
        />
      </div>
    </div>
  );
};
const Pillar = (props: PillarProps) => {
  const {
    country,
    isShowingRawScores,
    showIndicators,
    pillar,
    showMissingIndicators,
    showSources,
  } = props;
  let { score } = country.digitalRightScores[pillar];
  // @ts-ignore
  // let subpillars: SubPillar[] = ancillary.pillars[pillar];
  let color = ancillary.digitalRightPillarColorMap[pillar].base;
  // @ts-ignore
  let icon = pillarIcons[pillar] || null;

  return (
    <div className="border border-gray-200 rounded-lg shadow-lg overflow-hidden digital-right-bg-color">
      <header className="relative" style={{ background: color }}>
        <div
          className="h-6 absolute top-0 w-full inset-0 z-[-1]"
          style={{ background: color }}
        ></div>
        <div className="flex items-center justify-between p-3 z-10">
          <div className="text-white text-lg pr-3">{icon}</div>
          <div className="text-xs text-white text-center  font-medium uppercase tracking-widest py-[2px] px-[12px] rounded-full border-2 border-white">
            {pillar}
          </div>
          <div className="text-white font-mono font-semibold pl-2">{score}</div>
        </div>
      </header>
      {/* <div className="p-3 border-b relative">
        <div
          className="absolute inset-0 w-full h-full z-[-1]"
          style={{ background: color, opacity: 0.1 }}
        ></div>
        <p className="text-sm" style={{ color }}>
          <span className="font-medium">
            {rank}
            <sup>{getOrdinal(rank as number)}</sup>
          </span>{" "}
          highest score out of all countries
        </p>
      </div> */}
      {/* <div className="p-4 relative border-b">
        <StageInfo stage={stage} color={color} pillar={pillar} />
      </div> */}
      <div className="p-4">
        <ul className="divide-y">
              <li className="py-3 first:pt-0 last:pb-0" key={pillar}>
                <PillarList
                  country={country}
                  color={color}
                  pillar={pillar}
                  isShowingRawScores={isShowingRawScores}
                  showIndicators={showIndicators}
                  showSources={showSources}
                  showMissingIndicators={showMissingIndicators}
                />
              </li>
        </ul>
      </div>
    </div>
  );
};

export const DigitalRightsPillars = ({
  country,
  isShowingRawScores,
  showIndicators,
  showMissingIndicators,
  showSources,
}: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-x-10 md:gap-y-16">
      {ancillary.digitalRightPillarName
        .map((pillar) => {
          return (
            <Pillar
              country={country}
              key={pillar}
              pillar={pillar as DigitalRightsPillar}
              isShowingRawScores={isShowingRawScores}
              showIndicators={showIndicators}
              showMissingIndicators={showMissingIndicators}
              showSources={showSources}
            />
          );
        })}
    </div>
  );
};

const StageInfo = ({
  stage,
  color,
  pillar,
}: {
  stage: Stage | null;
  color: string;
  pillar: DigitalRightsPillar;
}) => {
  const [showAllStages, setShowAllStages] = useState(false);

  if (!stage)
    return <p className="text-gray-600 text-sm">No stage data available.</p>;

  return (
    <> 
      {showAllStages ? (
        <DigitalRightStageList
          currentStage={stage?.number}
          color={color}
          pillar={pillar}
        />
      ) : (
        <div>
          <p
            style={{ color }}
            className="text-xs font-semibold uppercase tracking-widest"
          >
            Stage {stage.number}: {stage.name}
          </p>
          <p className="text-sm dp-text-color">{stage.description}</p>
        </div>
      )}
      <button
        className="mt-2 text-sm dp-text-color underline"
        onClick={() => setShowAllStages((curr) => !curr)}
      >
        Show {showAllStages ? "just the current stage" : "all stages"}
      </button>
    </>
  );
};
