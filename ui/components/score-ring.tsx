// @ts-nocheck
import {
  arc,
  color,
  hcl,
  interpolateHclLong,
  lab,
  range,
  scaleLinear,
} from "d3";
import { pillarColorsByName } from "data";
import { Fragment, useEffect, useMemo, useState } from "react";
import useDimensions from "react-cool-dimensions";
import pillarIcons from "components/icons";
import { CircleText } from "./circle-text";
import { Country } from "database/processed/db";
import { getOrdinal } from "lib";
import { ancillary } from "database/ancillary";
import kebabCase from "lodash/kebabCase";

const scoreDomain = [0, 5];
const numberOfStages = scoreDomain[1] - scoreDomain[0];
const tweakColor = (color: string) => {
  const d3Color = hcl(color);
  d3Color.l += 0.02;
  d3Color.c -= 0.01;
  d3Color.h -= 3;
  return d3Color.toString();
};
export const ScoreRing = ({
  country,
  pillars: pillarData,
  defaultHoveredSubpillar,
  type
}: {
  country: Country;
  pillars: typeof ancillary.pillars;
  defaultHoveredSubpillar?: string;
  type?:string
}) => {
  const pillars = useMemo(() => {
    return Object.keys(pillarData)
      .map((pillarName) => [pillarName, pillarData[pillarName]])
      .filter((d) => d[0] !== "Overall");
  }, []);
  const { pillarColorsMap, pillarColorScalesMap } = useMemo(() => {
    const pillarColors = pillars.map(
      (pillar) => ancillary.pillarColorMap[pillar[0]].base
    );
    let pillarColorsMap = {} as Record<string, string>;
    let pillarColorScalesMap = {} as Record<string, any>;
    pillars.forEach((pillar, i) => {
      // @ts-ignore
      pillarColorsMap[pillar[0]] = pillarColors[i];
      let darkerColor = lab(pillarColors[i]);
      darkerColor.b += 90;
      darkerColor.a += 10;
      darkerColor.l += 40;
      let lighterColor = lab(pillarColors[i]);
      lighterColor.b -= 9;
      lighterColor.a += 10;
      lighterColor.l -= 10;
      // @ts-ignore
      pillarColorScalesMap[pillar[0]] = scaleLinear<string>()
        .domain([scoreDomain[0] - 1, scoreDomain[1]])
        .range([lighterColor.formatHex(), darkerColor.formatHex()])
        .interpolate(interpolateHclLong)
        .clamp(true);
    });
    return {
      pillarColorScalesMap,
      pillarColorsMap,
    };
  }, []);

  const [hoveredSubpillar, setHoveredSubpillar] = useState<string | null>(null);
  useEffect(() => {
    setHoveredSubpillar(defaultHoveredSubpillar);
  }, [defaultHoveredSubpillar]);
  const hoveredPillarName =
    hoveredSubpillar &&
    pillars.find(([_, subpillars]) =>
      subpillars.includes(hoveredSubpillar)
    )?.[0];

  // get dimensions
  const { observe, width } = useDimensions();

  // width = '3000vh'
  // width = width * 2;
  const height = width * 0.55;
  const r = width * 0.45;
  const innerRingR = [r * 0.35, r * 0.55];
  const outerRingR = [r * 0.55, r * 0.9];

  let pillarAngles = {} as any;
  let subPillarAngles = {} as any;
  const minAngle = -Math.PI / 2;
  // const maxAngle = Math.PI / 2
  const allAngles = Math.PI;
  const degreesPerSubpillar =
    allAngles / pillars.reduce((acc, pillar) => acc + pillar[1].length, 0);
  const isPlaceholder = !country.scores;
  const numberOfMissingSubpillars = isPlaceholder
    ? 0
    : pillars.reduce((acc, pillar) => {
        const missingSubpillars = pillar[1].filter(
          (subpillar) => !country.scores?.[pillar[0]]?.[subpillar]?.score
        ).length;
        return acc + missingSubpillars;
      }, 0);
  const numberOfSubpillars = pillars.reduce((acc, pillar) => {
    const subpillars = pillar[1].length;
    return acc + subpillars;
  }, 0);
  // don't let filled subpillars get too large, it looks wonky
  const emptySubpillarRatio =
    numberOfMissingSubpillars / numberOfSubpillars > 0.5 ? 0.8 : 0.3;
  const emptySubpillarDegrees = 0; // degreesPerSubpillar * emptySubpillarRatio;
  const filledSubpillarDegrees =
    (allAngles - emptySubpillarDegrees * numberOfMissingSubpillars) /
    (numberOfSubpillars - numberOfMissingSubpillars);
  let startAngleRunning = minAngle;
  pillars.forEach(([name, subpillars]) => {
    let runningDegreesForPillar = 0;
    subpillars.forEach((subpillar, j) => {
      const isEmpty =
        !isPlaceholder && !country.scores?.[name]?.[subpillar]?.score;
      const degreesForSubpillar = isEmpty
        ? emptySubpillarDegrees
        : filledSubpillarDegrees;
      subPillarAngles[subpillar] = [
        startAngleRunning + runningDegreesForPillar,
        startAngleRunning + runningDegreesForPillar + degreesForSubpillar,
      ];
      runningDegreesForPillar += degreesForSubpillar;
    });
    pillarAngles[name] = [
      startAngleRunning,
      startAngleRunning + runningDegreesForPillar,
    ];
    startAngleRunning += runningDegreesForPillar;
  });
  const outerRingScale = scaleLinear()
    .domain(scoreDomain)
    .range([outerRingR[0], outerRingR[1]])
    .clamp(true);

  const arcTicks = range(0, numberOfStages, 1).map((i) => {
    const innerR = outerRingScale(0);
    const outerR = outerRingScale(i);
    return getArc(innerR, outerR, 0, 360);
  });
  if (numberOfMissingSubpillars === numberOfSubpillars) return null;

  return (
    <div
      ref={observe}
      className="relative items-center mx-auto"
      style={{
        width: "min(100%, 450vh)",
      }}
      onMouseLeave={() => {
        setHoveredSubpillar(null);
      }}
    >
      <div className="md:hidden w-full grid grid-cols-1 sm:grid-cols-2 gap-2 gap-x-20 mb-10">
        {pillars.map(([pillar, subpillars], index) => (
          <div key={index} className="flex flex-col sm:flex-row items-center rainbow-margin">
            <div
              className="mb-2 mr-2"
              style={{ color: `${pillarColorsMap[pillar]}` }}
            >
              {pillarIcons[pillar]}
            </div>
            <div className="mb-2">{pillar}</div>
          </div>
        ))}
      </div>

      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible mb-10 mx-auto w-12/12 md:w-10/12 xl:w-full"
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <g id="star">
            <polygon
              id="star"
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
              className="text-[#F9A315] fill-current"
            />
            <polygon
              transform="scale(1.4)"
              style={{ transformOrigin: "12px 12px" }}
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
              className="text-[#FEC704] stroke-current opacity-50"
              fill="none"
              strokeWidth="0.6"
            />
          </g>
          {pillars.map(([pillar]) => {
            return (
              <radialGradient
                key={pillar}
                id={`${pillar.replace(/\s+/g, "-")}-gradient`}
                gradientUnits="userSpaceOnUse"
                r={outerRingR[1]}
                cx={0}
                cy={0}
                // @ts-ignore
                fr={outerRingR[0]}
                fx={0}
                fy={0}
              >
                {range(0, numberOfStages).map((i) => {
                  const color = pillarColorScalesMap[pillar](i);
                  return (
                    <Fragment key={i}>
                      <stop
                        offset={`${i * (100 / numberOfStages)}%`}
                        stopColor={color}
                      />
                      <stop
                        offset={`${(i + 1) * (100 / numberOfStages)}%`}
                        stopColor={tweakColor(color)}
                      />
                    </Fragment>
                  );
                })}
              </radialGradient>
            );
          })}
        </defs>
        <g transform={`translate(${width / 2}, ${height})`}>
          {pillars.map(([pillar, subpillars], index) =>
            subpillars.map((subpillar) => {
              const mainArc = getArc(
                outerRingR[0],
                outerRingR[1],
                subPillarAngles[subpillar][0],
                subPillarAngles[subpillar][1]
              );
              // @ts-ignore
              const fillArc = getArc(
                outerRingR[0],
                outerRingScale(country.scores?.[pillar]?.[subpillar]?.score),
                subPillarAngles[subpillar][0],
                subPillarAngles[subpillar][1]
              );
              const isHovered = hoveredSubpillar === subpillar;
              const hasData =
                isPlaceholder || country.scores?.[pillar]?.[subpillar]?.score;
              return (
                <g
                  key={`${pillar}-${subpillar}-${index}`}
                  style={{
                    opacity: isHovered || hasData ? 1 : 0.6,
                  }}
                  onMouseEnter={() => setHoveredSubpillar(subpillar)}
                >
                  <path
                    d={mainArc}
                    className={`${
                      isHovered ? "text-indigo-100" : "text-gray-100"
                    } fill-current transition-all`}
                    strokeWidth={1}
                  />
                  <path
                    className="transition-all"
                    d={fillArc}
                    fill={`url(#${pillar.replace(/\s+/g, "-")}-gradient)`}
                  />
                </g>
              );
            })
          )}
          {arcTicks.map((path, i) => (
            <path
              key={i}
              d={path}
              fill="none"
              stroke="white"
              strokeWidth={0.1}
            />
          ))}
          {pillars.map(([pillar, subpillars], index) => {
            const angles = pillarAngles[pillar as string];
            if (angles[0] == angles[1]) return;
            const color = pillarColorsMap[pillar];
            const midAngle = (angles[0] + angles[1]) / 2;
            let iconPosition = getPointFromAngle(
              midAngle - Math.PI * 0.5,
              innerRingR[0] + r * 0.1
            );
            iconPosition[1] -= height / 2;
               const pillarsName = pillar == "Digital Public Infrastructure" ? "DPI" : pillar; 
            return (
              <g key={`${pillar}-${index}`}>
                <g className="text-sm">
                  <CircleText
                    id={`name-${pillar}`}
                    rotate={midAngle / (Math.PI / 180)}
                    text={pillarsName as string}
                    r={innerRingR[1] - r * 0.05}
                    stroke="white"
                    strokeWidth={4}
                    className="hidden md:block"
                  />
                  <CircleText
                    id={`name-${pillar}`}
                    rotate={midAngle / (Math.PI / 180)}
                    text={pillarsName as string}
                    r={innerRingR[1] - r * 0.05}
                    fill={color}
                    className="hidden md:block"
                  />
                  {/* web */}
                  <g
                    className="hidden md:block lg:text-2xl transition-all"
                    style={{
                      color,
                      transform: `translate(${iconPosition[0]}px, ${iconPosition[1]}px) translate(-0.5em, 0)`,
                    }}
                  >
                    {/* @ts-ignore */}
                    {pillarIcons[pillar]}
                  </g>
                  {/* mobile */}
                  <g
                    className="md:hidden lg:text-2xl transition-all"
                    style={{
                      color,
                      transform: `translate(${iconPosition[0]}px, ${iconPosition[1]}px) translate(-1em, 0)`,
                    }}
                  >
                    {/* @ts-ignore */}
                    {pillarIcons[pillar]}
                  </g>
                </g>
                {/* <text x={endPoint[0]} y={endPoint[1]} textAnchor={endPoint[0] < 0 ? "start" : "end"}>
                {pillar}
              </text> */}
                {subpillars.map((subpillar,index) => {
                 let yText  =  type == 'data' ?  (index == 2 ? -10: -8) : (index == 2 ? 4: 9) ;
                 let yValue  =  type == 'data' ? 15 : 24;
                //  const y:number = index == 8 ? - 19: -15;
                  const isHovered = hoveredSubpillar === subpillar;
                  const mainArc = getArc(
                    outerRingR[0],
                    outerRingR[1],
                    subPillarAngles[subpillar][0],
                    subPillarAngles[subpillar][1]
                  );
                  const midAngle =
                    (subPillarAngles[subpillar][0] +
                      subPillarAngles[subpillar][1]) /
                    2;
                  let endPoint = getPointFromAngle(
                    midAngle - Math.PI * 0.5,
                    outerRingR[1] + r * 0.1
                  );
                  const placement =
                    Math.abs(endPoint[0]) < 40
                      ? "end"
                      : endPoint[0] < 0
                      ? "end"
                      : "start";
                   const placementMobile =
                   Math.abs(endPoint[0]) < 50
                   ? "start"
                   : endPoint[0] < 20
                   ? "end"
                   : "start";
                  const offset = {
                    start: [10, 0],
                    middle: [0, -10],
                    end: [-10, 0],
                  }[placement];
                  let endPointLine = getPointFromAngle(
                    midAngle - Math.PI * 0.5,
                    outerRingR[1] + r * 0.06
                  );
                  let starPosition = getPointFromAngle(
                    midAngle - Math.PI * 0.5,
                    outerRingR[1] + r * 0.08
                  );
                  const distanceOffset = getDistanceOffsetFromAngle(midAngle);
                  // @ts-ignore
                  endPoint[1] = endPoint[1] + distanceOffset * r;
                  // @ts-ignore
                  endPointLine[1] = endPointLine[1] + distanceOffset * r;
                  // @ts-ignore
                  starPosition[1] = starPosition[1] + (distanceOffset * r) / 2;
                  const endPointInner = getPointFromAngle(
                    midAngle - Math.PI * 0.5,
                    outerRingR[1] - r * 0.08
                  );
                  // @ts-ignore
                  const value =
                    country.scores?.[pillar]?.[subpillar]?.["score"];
                  const hasData = isPlaceholder || !!value;
                  // @ts-ignore
                  const rank = country.scores?.[pillar]?.[subpillar]?.["rank"];
                  const isAStar = hasData && rank && rank <= 10;
                  return (
                    <g
                      key={`${pillar}-${subpillar}`}
                      style={{
                        opacity: isHovered || hasData ? 1 : 0.3,
                      }}
                      onMouseEnter={() => setHoveredSubpillar(subpillar)}
                    >
                      {/* <path d={mainArc}
                      fill="none"
                      stroke="white"
                      strokeWidth={1} /> */}
                      <path
                        d={mainArc}
                        fill="none"
                        stroke="white"
                        strokeWidth={3}
                      />
                      {hasData && (
                        <line
                          x1={endPointInner[0]}
                          y1={endPointInner[1]}
                          x2={endPointLine[0]}
                          y2={endPointLine[1]}
                          strokeWidth="1"
                          className={`${
                            isHovered ? "text-gray-400" : "text-gray-200"
                          } stroke-current transition-all`}
                        />
                      )}
                      {isAStar && (
                        <>
                          {/* mobile */}
                          <g
                            className="transition-all md:hidden"
                            transform={`translate(${starPosition[0] - 15} ${
                              starPosition[1] - 20
                            })`}
                          >
                            <use
                              href="#star"
                              style={{
                                transformOrigin: `12px 12px`,
                                transform: `rotate(${
                                  midAngle - Math.PI * 0.78
                                }rad)`,
                              }}
                            />
                          </g>
                          {/* web */}
                          <g
                            className="hidden md:block transition-all"
                            transform={`translate(${starPosition[0] - 12} ${
                              starPosition[1] - 12
                            })`}
                          >
                            <use
                              href="#star"
                              style={{
                                transformOrigin: `12px 12px`,
                                transform: `rotate(${
                                  midAngle - Math.PI * 0.78
                                }rad)`,
                              }}
                            />
                          </g>
                          <CircleText
                            id={`star--top`}
                            r={
                              outerRingR[1] +
                              r * 0.03 -
                              (distanceOffset * r) / 2
                            }
                            rotate={midAngle / (Math.PI / 180)}
                            text="top 10"
                            className="hidden md:block uppercase tracking-widest font-bold text-xs text-yellow-700 fill-current"
                          />
                        </>
                      )}

                      {hasData && (
                        <g
                          className={`hidden rainbow-web sp-txt text-sm ${
                            isHovered
                              ? "text-black font-semibold"
                              : "text-gray-500"
                          } fill-current transition-all duration-150`}
                          transform={`translate(${endPoint[0] + offset[0]},${
                            endPoint[1] + offset[1]
                          })`}
                          textAnchor={placement}
                          dominantBaseline="middle"
                        >
                          <text 
                             y= {yText}
                            className={`font-semibold ${
                              isHovered ? "text-indigo-500" : ""
                            } text-xs md:text-base`}
                          >
                            {subpillar}
                          </text>
                          <text y={yValue} className="font-light">
                            {value}
                          </text>
                          {/* {!!rank && (
                            <text
                              y="-18"
                              className="font-light opacity-80 text-xs"
                            >
                              {rank}
                              {getOrdinal(rank)}
                            </text>
                          )} */}
                        </g>
                      )}
                      {hasData && (
                        <g
                          className={`rainbow-mobile sp-txt text-sm ${
                            isHovered
                              ? "text-black font-semibold"
                              : "text-gray-500"
                          } fill-current transition-all duration-150`}
                          transform={`translate(${endPoint[0] + offset[0]},${
                            endPoint[1] + offset[1]
                          })`}
                          textAnchor={placementMobile}
                          dominantBaseline="middle"
                        >
                          {isHovered && (
                            <>
                              <text
                                y= {index == 2 ? -20: -30}
                                className={`font-semibold ${
                                  isHovered ? "text-indigo-500" : ""
                                } text-xs md:text-base `}
                              >
                                {subpillar}
                              </text>
                            </>
                          )}

                          {
                            <text y="-5" className="text-xs">
                              {value}
                            </text>
                          }
                          {/* {!!rank && (
                          <text
                            y="-18"
                            className="font-light opacity-80 text-xs"
                          >
                            {rank}
                            {getOrdinal(rank)}
                          </text>
                        )} */}
                        </g>
                      )}
                    </g>
                  );
                })}
              </g>
            );
          })}
        </g>
      </svg>
      {hoveredSubpillar 
      && (
        <Info
          country={country}
          pillar={hoveredPillarName || ""}
          subpillar={hoveredSubpillar}
        />
      )
      }
    </div>
  );
};

const getPointFromAngle = (angle: number, radius: number) => {
  return [radius * Math.cos(angle), radius * Math.sin(angle)];
};

const getArc = (
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number
) => {
  return arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .startAngle(startAngle)
    .endAngle(endAngle)(
    // @ts-ignore
    [{}]
  );
};

const distanceOffset = scaleLinear()
  .domain([-Math.PI * 0.39, -Math.PI * 0.06, 0, Math.PI * 0.06, Math.PI * 0.21])
  .range([0, -0.04, -0.20, -0.19, 0])
  .clamp(true);
const getDistanceOffsetFromAngle = (angle: number) => distanceOffset(angle);

const Info = ({
  pillar,
  subpillar,
  country,
}: {
  pillar: string;
  subpillar: string;
  country: Country;
}) => {
  // @ts-ignore
  const stageInfo = country.scores?.[pillar]?.[subpillar]?.stage;
  const color = ancillary.pillarColorMap[pillar].base;

  return (
    <div className="text-center md:absolute md:top-[73%] md:bottom-0 md:left-0 md:right-0 md:w-full flex items-center justify-center max-w-full md:max-w-[30%] md:mx-auto md:text-center">
      <div>
        <h3
          className="text-2xl font-bold pointer-events-none"
          style={{
            color,
          }}
        >
          {pillar}
        </h3>
        <h3 className="text-2xl font-semibold pointer-events-auto">
          <a href={`#${kebabCase(pillar + subpillar)}`} className="underline">
            {subpillar}
          </a>
        </h3>
        {Boolean(stageInfo) ? (
          <>
            <p className="mt-4 font-semibold text-xl pointer-events-none">
              Stage {stageInfo.number}: {stageInfo.name}
            </p>
            <p className="leading-5 mt-1 font-light tracking-[0.01em]">
              {stageInfo.description}
            </p>
          </>
        ) : (
          <div className="pointer-events-none mt-6">
            <p className="font-semibold text-xl">No Public Data Available</p>
            <p className="leading-5 mt-1 font-light tracking-[0.01em]">
              Without data, a measurement cannot be made. As organizations do
              additional work in {country["Country or Area"]}, more data will be
              available and aggregated into our system.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoreRing;