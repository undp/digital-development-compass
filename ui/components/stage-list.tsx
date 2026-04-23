import { db } from "database";
import type { Definition } from "database/processed/db";
import { stageNames } from "lib";
import useSWR from "swr";
import { Spinner } from "./spinner";

const DISCLAIMER =
  "This analysis does not reflect quality of implementation or frameworks, and does not represent an analysis of the broader context of human rights.";

function renderWithBold(text: string): React.ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export function StageDescriptionText({ text }: { text: string }) {
  if (!text) return null;
  const [main] = text.split(DISCLAIMER);
  const hasDisclaimer = text.includes(DISCLAIMER);
  return (
    <>
      <span>{renderWithBold(main.trim())}</span>
      {hasDisclaimer && (
        <span
          className="block mt-2 text-xs italic"
          style={{ color: "#0468B1" }}
        >
          {DISCLAIMER}
        </span>
      )}
    </>
  );
}

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

const fetchStages = (_: string, pillar: string, subpillar: string | undefined) => {
  return db.definitions.find((d) => d["Pillar"] === pillar && d["Sub-Pillar"] === (subpillar || "")) ?? null;
};

const digitalRightFetchStages = (_: string, pillar: string) => {
  return db.digital_right_definitions.find((d) => d["Pillar"] === pillar) ?? null;
};

export function StageList(props: StageListProps) {
  const { pillar, subpillar, color, currentStage } = props;
  const { data } = useSWR(["stages", pillar, subpillar], fetchStages);

  if (data === undefined)
    return (
      <div className="flex items-center">
        <div style={{ color }} className="w-3 h-3 mr-2">
          <Spinner />
        </div>
        <p className="text-gray-600 text-sm">Loading stage information...</p>
      </div>
    );

  if (data === null)
    return <p className="text-sm text-gray-500">No stage information available.</p>;

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
            <p className="text-sm text-gray-600">
              <StageDescriptionText text={(data[name as keyof Definition] as string) ?? ""} />
            </p>
          </li>
        );
      })}
    </ul>
  );
}

export function DigitalRightStageList(props: DigitalRightStageListProps) {
  const { pillar, color, currentStage } = props;
  const { data } = useSWR(["stages", pillar], digitalRightFetchStages);

  if (data === undefined)
    return (
      <div className="flex items-center">
        <div style={{ color }} className="w-3 h-3 mr-2">
          <Spinner />
        </div>
        <p className="dp-text-color text-sm">Loading stage information...</p>
      </div>
    );

  if (data === null)
    return <p className="text-sm dp-text-color">No stage information available.</p>;

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
            <p className="text-sm dp-text-color">
              <StageDescriptionText text={(data[name as keyof Definition] as string) ?? ""} />
            </p>
          </li>
        );
      })}
    </ul>
  );
}
