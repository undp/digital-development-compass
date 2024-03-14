import icons from "components/icons";
import { arc } from "d3";
import { ancillary, Pillar } from "database/ancillary";
import type { Stage as DBStage } from "database/processed/db";
import { stageNames } from "lib";
import { useMemo, useState } from "react";

const degToRad = (deg: number) => (deg * Math.PI) / 180;

let numPillars = ancillary.pillarNames.length;
export interface StageGaugeProps {
  scores: any;
  pillar: Pillar;
  definitions: any;
  name: string;
}
interface Stage {
  name: string;
  score: number;
  description: string;
}

function InnerStageGauge(props: StageGaugeProps) {
  const { scores, pillar, definitions, name } = props;
  const [activeSubpillar, setActiveSubpillar] = useState<Stage | null>(null);

  const overallStageInfo = scores[pillar].stage;

  let primaryColor = ancillary.pillarColorMap[pillar].base;
  let subpillars = ancillary.pillars[pillar];
  let numSubpillars = subpillars.length || 1;
  let offset = 4;
  let size = 250;
  let ringSize = size / 4;
  let innerSize = ringSize / 1.5;
  let outerSize = ringSize * 2;

  const handleMouseEnter = (subpillar: Stage) => {
    setActiveSubpillar(subpillar);
  };

  const handleMouseOut = () => {
    setActiveSubpillar(null);
  };

  const rings = useMemo(() => {
    return Array.from({ length: numSubpillars }, (_, i) => {
      let subpillarName = "";
      let stageInfo: DBStage;

      if (pillar === "Overall") {
        subpillarName = "Overall";
        stageInfo = scores[pillar].stage;
      } else {
        subpillarName = subpillars[i];
        stageInfo = scores[pillar][subpillarName].stage;
      }

      const subpillarScore = stageInfo ? stageInfo.number : 0;

      const angleToIncrement = 220 / numSubpillars;

      const startRad = -110 + angleToIncrement * i;
      const endRad = startRad + angleToIncrement;
      const startAngle = degToRad(startRad + offset);
      const endAngle = degToRad(endRad - offset);

      const arcSize = outerSize - innerSize;

      const outerArcPath = arc()
        .innerRadius(innerSize)
        .outerRadius(outerSize)
        .startAngle(startAngle)
        // @ts-ignore
        .endAngle(endAngle)([{}]);

      const scoreArc = {
        stage: {
          score: subpillarScore,
          name: subpillarName,
          description: stageInfo?.description,
        },
        path: arc()
          .innerRadius(innerSize)
          .outerRadius(innerSize + (arcSize / 5) * subpillarScore)
          .startAngle(startAngle)
          // @ts-ignore
          .endAngle(endAngle)([{}]),
      };

      return {
        lines: Array.from({ length: 5 }).map((_, i) => {
          return (
            arc()
              .innerRadius(innerSize + (arcSize / 5) * i)
              .outerRadius(innerSize + (arcSize / 5) * i)
              .startAngle(startAngle)
              // @ts-ignore
              .endAngle(endAngle)([{}])
          );
        }),
        scoreArc,
        outerArc: {
          start: startAngle,
          end: endAngle,
          path: outerArcPath,
        },
      };
    });
  }, [pillar]);

  const stageName = activeSubpillar
    ? stageNames[activeSubpillar.score - 1]
    : "";

  const backupDefinition = activeSubpillar?.name
    ? // @ts-ignore
      (definitions || []).find((d) => d["Sub-Pillar"] === activeSubpillar.name)
        ?.Definition
    : null;

  return (
    <div style={{ width: size }} className="">
      <svg
        width={size}
        height={size / 2}
        viewBox={`0 0 ${size} ${size / 6}`}
        className="overflow-visible p-2"
        onMouseLeave={handleMouseOut}
      >
        <g transform={`translate(${size / 2}, ${size / 3})`}>
          {rings.map((ring, i) => {
            let opacity = 1;

            if (
              activeSubpillar &&
              activeSubpillar.name !== ring.scoreArc.stage.name
            ) {
              opacity = 0.5;
            }

            return (
              <g
                key={`arc-${i}`}
                className="transition-opacity"
                style={{
                  opacity,
                }}
              >
                <path
                  onMouseEnter={() => {
                    if (!overallStageInfo) return;
                    handleMouseEnter(ring.scoreArc.stage);
                  }}
                  id={`${ring.scoreArc.stage.name}-path`}
                  className={`opacity-20 transition-opacity ${
                    overallStageInfo ? "cursor-auto" : "cursor-not-allowed"
                  }`}
                  style={{
                    fill: primaryColor,
                  }}
                  d={ring.outerArc.path}
                />

                <path
                  className="pointer-events-none"
                  fill={primaryColor}
                  d={ring.scoreArc.path}
                />

                <g className="pointer-events-none">
                  {ring.lines.map((line, j) => {
                    return (
                      <path key={j} d={line} stroke="white" strokeWidth={2} />
                    );
                  })}
                </g>
              </g>
            );
          })}
        </g>
      </svg>
      <div className="text-center relative">
        <div
          style={{ color: primaryColor }}
          className="text-3xl flex items-center justify-center pointer-events-none absolute -top-8 left-0 right-0"
          aria-label={`${pillar} icon`}
        >
          {/* todo(Matt) refactor pillar data accessors */}
          {/* @ts-ignore */}
          {icons[pillar.toLowerCase()]}
        </div>

        <div className="mt-3">
          <div className="pt-3">
            <span
              style={{ background: primaryColor }}
              className="text-xs text-white font-medium uppercase tracking-widest py-[2px] px-[12px] rounded-full"
            >
              {pillar}
            </span>
          </div>

          {overallStageInfo ? (
            <>
              {activeSubpillar == null && (
                <div>
                  <p
                    className="text-sm font-medium uppercase tracking-widest mt-4"
                    style={{ color: primaryColor }}
                  >
                    Stage {overallStageInfo.number}: {overallStageInfo.name}
                  </p>
                  <p className="font-medium text-lg">Overall</p>
                  <p className="text-sm text-gray-600">
                    {overallStageInfo.description}
                  </p>
                </div>
              )}
              {/* 2. noScore */}
              {Boolean(activeSubpillar) && activeSubpillar?.score === 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium uppercase tracking-widest text-gray-400">
                    No Stage Data
                  </p>
                  <p className="font-medium text-lg">{activeSubpillar?.name}</p>
                  <p className="text-sm text-gray-600">
                    {
                      // prettier-ignore
                      // @ts-ignore
                      backupDefinition
                    }
                  </p>
                </div>
              )}
              {/* @ts-ignore */}
              {Boolean(activeSubpillar) && activeSubpillar?.score > 0 && (
                <div className="mt-4">
                  <p
                    className="text-sm font-medium uppercase tracking-widest"
                    style={{ color: primaryColor }}
                  >
                    Stage {activeSubpillar?.score}: {stageName}
                  </p>
                  <p className="font-medium text-lg">{activeSubpillar?.name}</p>
                  <p className="text-sm text-gray-600">
                    {activeSubpillar?.description}
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                No {pillar} data for {name}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function StageGauge(props: StageGaugeProps) {
  const { pillar } = props;
  if (pillar === "Overall") {
    return <OverallStageGauge {...props} />;
  } else {
    return <InnerStageGauge {...props} />;
  }
}

type OverallStageGaugeProps = Pick<
  StageGaugeProps,
  "scores" | "definitions" | "name"
>;

export function OverallStageGauge(props: OverallStageGaugeProps) {
  const { scores, name } = props;
  const [activePillar, setActivePillar] = useState<Pillar>("Overall");
  const stageInfo = scores[activePillar]?.stage;

  let offset = 4;
  let size = 250;
  let ringSize = size / 4;
  let innerSize = ringSize / 1.5;
  let outerSize = ringSize * 2;

  const handleMouseOut = () => {
    setActivePillar("Overall");
  };

  const handleMouseEnter = (pillar: Pillar) => {
    setActivePillar(pillar);
  };

  const rings = useMemo(() => {
    return Array.from({ length: numPillars }, (_, i) => {
      const pillarName = ancillary.pillarNames[i];
      const pillarStage = scores[pillarName]?.stage;
      const angleToIncrement = 220 / numPillars;
      const startRad = -110 + angleToIncrement * i;
      const endRad = startRad + angleToIncrement;
      const startAngle = degToRad(startRad + offset);
      const endAngle = degToRad(endRad - offset);
      const arcSize = outerSize - innerSize;
      const outerArcPath = arc()
        .innerRadius(innerSize)
        .outerRadius(outerSize)
        .startAngle(startAngle)
        // @ts-ignore
        .endAngle(endAngle)([{}]);

      const scoreArc = {
        stage: pillarStage,
        path: arc()
          .innerRadius(innerSize)
          .outerRadius(innerSize + (arcSize / 5) * pillarStage?.number)
          .startAngle(startAngle)
          // @ts-ignore
          .endAngle(endAngle)([{}]),
      };

      return {
        scoreArc,
        outlineArc: {
          start: startAngle,
          end: endAngle,
          path: outerArcPath,
        },
        lines: Array.from({ length: 5 }).map((_, i) => {
          return (
            arc()
              .innerRadius(innerSize + (arcSize / 5) * i)
              .outerRadius(innerSize + (arcSize / 5) * i)
              .startAngle(startAngle)
              // @ts-ignore
              .endAngle(endAngle)([{}])
          );
        }),
      };
    });
  }, []);

  return (
    <div style={{ width: size }} className="min-h-[290px]">
      <svg
        width={size}
        height={size / 2}
        viewBox={`0 0 ${size} ${size / 6}`}
        className="overflow-visible p-2"
        onMouseLeave={handleMouseOut}
      >
        <g transform={`translate(${size / 2}, ${size / 3})`}>
          {rings.map((ring, i) => {
            let pillarName = ancillary.pillarNames[i];
            let opacity = 1;

            if (activePillar !== pillarName) {
              opacity = 0.5;
            }

            let primaryColor = ancillary.pillarColorMap[pillarName].base;

            return (
              <g key={i} style={{ opacity }}>
                <path
                  onMouseEnter={() => {
                    // if (!overallStageInfo) return;
                    handleMouseEnter(ancillary.pillarNames[i]);
                  }}
                  id={`${ring.scoreArc?.stage?.name}-path`}
                  className={`opacity-20 transition-opacity ${
                    stageInfo ? "cursor-auto" : "cursor-not-allowed"
                  }`}
                  style={{
                    fill: primaryColor,
                  }}
                  d={ring.outlineArc.path}
                />
                <path
                  className="pointer-events-none"
                  fill={primaryColor}
                  d={ring.scoreArc.path}
                />
                <g className="pointer-events-none">
                  {ring.lines.map((line, j) => {
                    return (
                      <path key={j} d={line} stroke="white" strokeWidth={2} />
                    );
                  })}
                </g>
              </g>
            );
          })}
        </g>
      </svg>
      <div className="text-center relative">
        <div
          style={{ color: ancillary.pillarColorMap[activePillar].base }}
          className="text-3xl flex items-center justify-center pointer-events-none absolute -top-6 left-0 right-0"
          aria-label={`${activePillar} icon`}
        >
          {
            // @ts-ignore
            icons[activePillar.toLowerCase()]
          }
        </div>

        <div className="mt-3">
          <div className="pt-3">
            <span
              style={{ background: ancillary.pillarColorMap[activePillar].base }}
              className="text-xs text-white font-medium uppercase tracking-widest py-[2px] px-[12px] rounded-full"
            >
              {activePillar}
            </span>
          </div>

          {stageInfo ? (
            <>
              <div className="mt-4">
                <p
                  className="text-sm font-medium uppercase tracking-widest"
                  style={{ color: ancillary.pillarColorMap[activePillar].base }}
                >
                  Stage {stageInfo?.number}: {stageInfo?.name}
                </p>
                <p className="text-sm text-gray-600">
                  {stageInfo?.description}
                </p>
              </div>
            </>
          ) : (
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                No {activePillar} data for {name}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
