import { stageNames } from "lib";
import useSWR from "swr";
import { Spinner } from "./spinner";

interface StageListProps {
  pillar: string;
  subpillar?: string;
  currentStage: number;
  color: string;
}

interface DigitalRightStageListProps {
  pillar: string;
  currentStage: number;
  color: string;
}

const fetchStages = async (_: string, pillar: string, subpillar: string) => {
  return await fetch(`/api/stages?pillar=${pillar}&subpillar=${subpillar || ""}`).then((res) => res.json());
};

const digitalRightFetchStages = async (_: string, pillar: string) => {
  return await fetch(`/api/digitalRightStages?pillar=${pillar}`).then((res) => res.json());
};

export function StageList(props: StageListProps) {
  const { pillar, subpillar, color, currentStage } = props;
  const { data } = useSWR(["stages", pillar, subpillar], fetchStages);

  if (!data)
    return (
      <div className="flex items-center">
        <div style={{ color }} className="w-3 h-3 mr-2">
          <Spinner />
        </div>
        <p className="text-gray-600 text-sm">Loading stage information...</p>
      </div>
    );

  return (
    <ul className="space-y-3">
      {stageNames.map((name, index) => {
        let stageNum = index + 1;
        let isActive = currentStage === stageNum;

        return (
          <li
            key={stageNum}
            style={{
              borderColor: isActive ? color : "transparent",
            }}
            className={`
              relative
              ${isActive ? "p-3 border transform scale-105" : "border"}
            `}
          >
            {isActive && (
              <div
                className="absolute inset-0 w-full h-full z-[-1] pointer-events-none"
                style={{ background: color, opacity: 0.1 }}
              ></div>
            )}
            <p
              style={{ color }}
              className="text-xs mb-1 font-semibold uppercase tracking-widest"
            >
              Stage {stageNum}: {name}
            </p>
            <p className="text-sm text-gray-600">{data[name]}</p>
          </li>
        );
      })}
    </ul>
  );
}

export function DigitalRightStageList(props: DigitalRightStageListProps) {
  const { pillar, color, currentStage } = props;
  const { data } = useSWR(["stages", pillar], digitalRightFetchStages);

  if (!data)
    return (
      <div className="flex items-center">
        <div style={{ color }} className="w-3 h-3 mr-2">
          <Spinner />
        </div>
        <p className="dp-text-color text-sm">Loading stage information...</p>
      </div>
    );

  return (
    <ul className="space-y-3">
      {stageNames.map((name, index) => {
        let stageNum = index + 1;
        let isActive = currentStage === stageNum;

        return (
          <li
            key={stageNum}
            style={{
              borderColor: isActive ? color : "transparent",
            }}
            className={`
              relative
              ${isActive ? "p-3 border transform scale-105" : "border"}
            `}
          >
            {isActive && (
              <div
                className="absolute inset-0 w-full h-full z-[-1] pointer-events-none"
                style={{ background: color, opacity: 0.1 }}
              ></div>
            )}
            <p
              style={{ color }}
              className="text-xs mb-1 font-semibold uppercase tracking-widest"
            >
              Stage {stageNum}: {name}
            </p>
            <p className="text-sm dp-text-color">{data[name]}</p>
          </li>
        );
      })}
    </ul>
  );
}
