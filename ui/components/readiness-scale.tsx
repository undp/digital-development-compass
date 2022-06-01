import { Pillar, ancillary } from "database/ancillary";
import { Scores } from "database/processed/db";
import { pillarColorMap } from "lib";
import { Tooltip } from "./tooltip";

export function ReadinessScale({
  scores,
  onPillarClick = () => {},
  activePillar,
}: {
  scores: Scores;
  onPillarClick?: (pillar: Pillar) => void;
  activePillar?: Pillar;
}) {
  const pillars = ancillary.pillarNames;
  return (
    <div className="flex h-6 bg-gray-100">
      {pillars.map((pillar) => {
        // @ts-ignore
        let pillarInfo = scores[pillar];
        let stage = pillarInfo?.stage;
        let tooltipMsg = pillarInfo
          ? `${pillar}: ${stage ? stage?.name : "No Data"}`
          : "No data";
        let color = pillarColorMap[pillar].base;
        let percent = (stage?.number || 0) * 20;

        return (
          <Tooltip key={pillar} text={tooltipMsg}>
            <button
              onClick={() => onPillarClick(pillar as Pillar)}
              className={`relative flex-1 h-full hover:opacity-100 appearance-none focus:outline-none transition-opacity ${
                pillar === activePillar ? "opacity-100" : "opacity-25"
              }`}
            >
              <div
                className="absolute left-0 bottom-0 right-0"
                style={{
                  height: `${percent}%`,
                  background: color,
                }}
              />
            </button>
          </Tooltip>
        );
      })}
    </div>
  );
}
