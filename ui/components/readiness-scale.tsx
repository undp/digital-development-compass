import { Pillar, ancillary } from "database/ancillary";
import { Scores } from "database/processed/db";
import { Tooltip } from "./tooltip";
export function ReadinessScale({
  scores,
  onPillarClick = () => { },
  activePillar,
}: {
  scores: Scores;
  onPillarClick?: (pillar: Pillar) => void;
  activePillar?: Pillar;
}) {
  const pillars = ancillary.pillarNames;
  return (
    <div className="flex h-6 border-t px-1">
      {pillars.map((pillar) => {
        // @ts-ignore
        let pillarInfo = scores[pillar];
        let stage = pillarInfo?.stage;
        let tooltipMsg = pillarInfo
          ? `${pillar}: ${stage ? stage?.name : "No Data"}`
          : "No data";
        let color = ancillary.pillarColorMap[pillar].base;
        let percent = (stage?.number || 0) * 20;

        return (
          <Tooltip key={pillar} text={tooltipMsg}>
            <button
              onClick={(e) => {
                e.preventDefault();
                onPillarClick(pillar as Pillar)
              }}
              className={`relative flex-1 h-full appearance-none focus:outline-none transition-opacity border border-b-0 ${pillar === activePillar ? "bg-gray-100 border-gray-100" : "border-white"
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
