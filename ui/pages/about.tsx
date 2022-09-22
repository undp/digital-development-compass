import { InferGetStaticPropsType } from "next";
import { db } from "database";
import dynamic from "next/dynamic";

import Layout from "components/Layout";
import ScoreRing from "components/score-ring";
import { groupBy } from "lodash";
import { isMemberState, pillarColorMap, stageNames } from "lib";
import Icons from "components/icons";
import { Definition } from "database/processed/db";
import { useEffect, useState } from "react";
import { interpolateHclLong, lab, scaleLinear } from "d3";
import { AnimatePresence, motion } from "framer-motion";
import { ancillary } from "database/ancillary";
import Image from "next/image";
import Script from "next/script";

import githubScreenshot from "../public/github.png";

const AboutScrollytelling = dynamic(
  () => import("components/about-scrollytelling"),
  { ssr: false }
);

interface Dictionary<T> {
  [Key: string]: T;
}
type Definitions = Dictionary<Definition[]>;

export default function About(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { definitions, countries, country } = props;
  const pillars = Object.keys(definitions);

  const handleScrollToTop = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout title="About" countries={countries}>
      <div className="py-16">
        <div className="container px-4 mx-auto">
          <div className="text-lg flex flex-col items-center">
            <div className="max-w-[40em] space-y-9">
              <p>
                The Digital Development Compass (DDC) is an exhaustive
                collection of a country's digital indicators, sourced from
                publicly available datasets that we have aggregated and made
                usable for the first time. The DDC was first created as a tool
                for UNDP's work in supporting inclusive, whole-of-society
                digital transformation with partners.
              </p>

              <p>
                The DDC features hundreds of existing public data sets that
                provide indicators that provide insights on a country's progress
                in digital transformation. Users can interact with the data to
                understand the digital state of any nation (based on publicly
                available data) and see comparisons and recommendations. It is
                the biggest compilation of global datasets on digital,
                aggregating and visualizing these metrics for the first time.
              </p>

              <p>
                The Digital Transformation Framework is split into{" "}
                {numberWords[pillars.length]} pillars:
              </p>
            </div>
            <div className="flex flex-wrap">
              {pillars.map((pillar) => (
                <a
                  href={`#${pillar}`}
                  key={pillar}
                  className="inline-flex text-sm text-white font-medium uppercase tracking-widest py-[0.3em] px-[1.2em] m-1 rounded-full z-10"
                  style={{
                    backgroundColor: pillarColorMap[pillar]?.base,
                  }}
                >
                  {pillar}
                </a>
              ))}
            </div>
            <p className="max-w-[40em] mt-9">
              Each pillar is then mapped to a sub-pillar. And each sub-pillar
              maps to a specific stage of digital transformation. The sub-pillar
              consists of any number of individual indicators. These indicators
              are used to calculate a country's Digital Transformation Score per
              sub-pillar. These scores are mapped to definitions explaining each
              stage of digital transformation.
            </p>
          </div>
        </div>

        <Scrollytelling country={country} />

        <div className="mt-40 mb-60 flex flex-col items-center">
          <div className="max-w-[40em] mr-10 py-10 text-lg">
            <h2 className="text-3xl font-bold mt-20 mb-6">
              Stages of Digital Transformation
            </h2>
          </div>

          <TablePillars pillars={pillars} definitions={definitions} />
          <MobilePillars pillars={pillars} definitions={definitions} />

          <div className="max-w-[40em] py-10 text-lg mt-20 px-4">
            <p>
              Automations scrape publicly available spreadsheets, PDFs, and
              documents into a machine-readable format. Scripts normalize the
              data according to a UN-defined list of countries, regions,
              sub-regions, income groups, & territorial borders. Data is
              automatically updated international organizations release new
              reports. All code and data is transparent and available as a
              global resource on GitHub. Visit{" "}
              <a
                className="underline"
                href="https://github.com/undp/digital-development-compass"
              >
                https://github.com/undp/digital-development-compass
              </a>{" "}
              to see the latest.
            </p>
          </div>

          <div className="max-w-[50em] mx-auto px-4">
            <Image
              src={githubScreenshot}
              alt="The undp/digital-nation-dashboard GitHub repository"
            />
          </div>

          <div className="max-w-[40em] py-10 text-lg px-4">
            <h2 className="text-3xl font-bold mt-20 mb-6">Our Methodology</h2>

            <ul className="space-y-4">
              <li>
                <strong>Inclusion of datasets</strong>
                <p>
                  Based on: Reliability of source, relevance of the source,
                  quality of methodology, and both recency and breadth of data.
                </p>
              </li>
              <li>
                <strong>Data availability</strong>
                <p>
                  Transparency into % of data unavailable per country per
                  sub-pillar.
                </p>
              </li>
              <li>
                <strong>Scoring</strong>
                <p>
                  Stage of Digital Readiness is determined from score of 1-5.99.
                  Indicators are converted from Index Data or Calculated
                  according to min/max from Raw Data. Scores are Weighted and
                  Averaged into Sub-Pillar Scores. Scores are Weighted and
                  Averaged into Pillar Scores & paired with a % Data
                  Availability Rate. Scores are Averaged into a Country's
                  Overall Score and paired with a Reliability Score. Weightings
                  of data and scores is under development.
                </p>
              </li>
              <li>
                <strong>Peer Review</strong>
                <p>
                  This tool is in Beta; we are currently under scientific peer
                  review with Expert Advisors. This tool does not intend or
                  imply any form of statistical significance.
                </p>
              </li>
            </ul>

            <p className="mt-10">
              We pulled together as many reliable data points on Digital
              Development that we could. For more details on our methodology,
              reach out to{" "}
              <a href="mailto:digital@undp.org" className="underline">
                digital@undp.org
              </a>
              .
            </p>

            <div className="flex justify-center mt-8">
              <button
                onClick={handleScrollToTop}
                className="bg-brand-blue-dark border-2 font-semibold border-brand-blue-dark hover:bg-brand-blue-dark/90 px-4 py-2 text-xs uppercase tracking-wide text-white flex-shrink-0 flex items-center"
              >
                Scroll To Top
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* typeform chat overlay */}
      <div
        data-tf-popover="BYPpMpFy"
        data-tf-custom-icon="https://images.typeform.com/images/H59S4N5KfwQY"
        data-tf-button-color="#0445AF"
        data-tf-tooltip="Hi 👋&nbsp;&nbsp;have feedback for us?"
        data-tf-chat
        data-tf-medium="snippet"
        data-tf-hidden="utm_source=xxxxx,utm_medium=xxxxx,utm_campaign=xxxxx,utm_term=xxxxx,utm_content=xxxxx"
        style={{ all: "unset" }}
      ></div>
      <Script src="//embed.typeform.com/next/embed.js"></Script>
    </Layout>
  );
}

const TablePillars = ({
  pillars,
  definitions,
  isExpandedDefault,
  isHighlightingPillars,
}: {
  pillars: string[];
  definitions: Definitions;
  isExpandedDefault?: boolean;
  isHighlightingPillars?: boolean;
}) => {
  return (
    <div className="container px-4 mx-auto hidden lg:block">
      <div
        className={`${gridClassName} mt-8 sticky top-0 bg-white z-10 border-b pb-3`}
      >
        <div className="p-2 font-semibold text-lg mt-auto">
          Stages of Digital Readiness
        </div>
        {stageNames.map((stage, index) => (
          <div
            key={stage}
            className="p-5 pb-2 text-lg font-semibold flex flex-col justify-end"
          >
            <div className="text-gray-500 flex-shrink-0 tracking-wider uppercase font-medium text-sm">
              Stage {index + 1}.
            </div>
            {stage}
          </div>
        ))}
      </div>

      {pillars.map((pillar) => {
        const defs = definitions[pillar];
        // @ts-ignore
        return (
          <TablePillar
            key={pillar}
            pillar={pillar}
            definitions={defs}
            isExpandedDefault={isExpandedDefault}
            isHighlightingPillars={isHighlightingPillars}
          />
        );
      })}
    </div>
  );
};

const gridClassName = "grid grid-cols-[1.3fr,1fr,1fr,1fr,1fr,1fr]";

const TablePillar = ({
  pillar,
  definitions,
  isExpandedDefault,
  isHighlightingPillars,
}: {
  pillar: string;
  definitions: Definition[];
  isExpandedDefault?: boolean;
  isHighlightingPillars?: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(isExpandedDefault);
  useEffect(() => {
    setIsExpanded(isExpandedDefault);
  }, [isExpandedDefault]);
  const pillarColors = pillarColorMap[pillar];
  const pillarColor = pillarColors?.base || "black";
  const pillarColorScale = scaleLinear<string>()
    .domain([0, 6])
    .range([pillarColors.triple[1], pillarColors.triple[2]])
    .interpolate(interpolateHclLong)
    .clamp(true);
  let pillarIcon = Icons[pillar.toLowerCase() as keyof typeof Icons];
  const overall = definitions[0];

  return (
    <div id={pillar} className={`${gridClassName} scroll-mt-20`} key={pillar}>
      <div
        className={`p-5 pt-0 mt-5 ${
          isHighlightingPillars ? "bg-yellow-50" : ""
        }`}
      >
        <div
          className={`flex items-center self-start font-semibold text-xl mt-10`}
          style={{
            color: pillarColor,
          }}
        >
          <div className="text-2xl w-[1.5em]">{pillarIcon}</div>
          {pillar}
        </div>
        <button
          onClick={() => setIsExpanded((d) => !d)}
          className="mt-0 p-2 ml-8 underline text-slate-500 text-sm"
        >
          {isExpanded ? "Hide" : "Show"} {definitions.length - 1} subpillars
        </button>
      </div>
      {stageNames.map((stageName, stageIndex) => (
        <div
          className={`group p-4 text-gray-700 relative group-hover:bg-slate-5000 mt-10`}
          style={
            {
              "--color": pillarColorScale(stageIndex),
            } as React.CSSProperties
          }
          key={`${stageName}-${0}`}
        >
          <div
            className="absolute inset-0 bottom-auto right-auto w-0 left-4 h-1 group-hover:w-20 transition-all"
            style={{
              background: pillarColorScale(stageIndex),
            }}
          />
          {/* @ts-ignore */}
          {overall[stageName] || ""}
        </div>
      ))}
      <AnimatePresence>
        {definitions.length === 1
          ? null
          : definitions.map((d, definitionIndex) => {
              if (!isExpanded && d["Sub-Pillar"]) return null;
              if (!d["Sub-Pillar"]) return null;
              return (
                <motion.div
                  className={`${gridClassName} col-span-6`}
                  key={definitionIndex}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.6, delay: definitionIndex * 0.2 }}
                >
                  <div
                    className={`p-2 col-start-1 pl-14 font-semibold ${
                      !definitionIndex ? "mt-10" : ""
                    }`}
                    style={{
                      color: pillarColor,
                    }}
                    key={`name-${definitionIndex}`}
                  >
                    {d["Sub-Pillar"] || "Overall"}
                  </div>
                  {stageNames.map((stageName, stageIndex) => (
                    <div
                      className={`group p-4 text-gray-700 relative group-hover:bg-slate-5000  ${
                        !definitionIndex ? " mt-10" : ""
                      }`}
                      style={
                        {
                          "--color": pillarColorScale(stageIndex),
                        } as React.CSSProperties
                      }
                      key={`${stageName}-${definitionIndex}`}
                    >
                      <div
                        className="absolute inset-0 bottom-auto right-auto w-0 left-4 h-1 group-hover:w-20 transition-all"
                        style={{
                          background: pillarColorScale(stageIndex),
                        }}
                      />
                      {/* @ts-ignore */}
                      {d[stageName] || ""}
                    </div>
                  ))}
                </motion.div>
              );
            })}
      </AnimatePresence>
    </div>
  );
};

const MobilePillars = ({
  pillars,
  definitions,
}: {
  pillars: string[];
  definitions: Dictionary<Definition[]>;
}) => {
  return (
    <div className="max-w-3xl mx-auto mt-20 lg:hidden px-4">
      {pillars.map((name) => {
        const defs = definitions[name];
        const pillarColor = pillarColorMap[name]?.base || "black";
        // @ts-ignore
        let pillarIcon = Icons[name.toLowerCase()];

        return (
          <section id={name} className="py-6 first:pt-0 mt-20" key={name}>
            <div className="text-center">
              <div
                className="text-4xl inline-block mx-auto -mb-3"
                style={{ color: pillarColor }}
              >
                {pillarIcon}
              </div>
            </div>
            <div className="text-center mt-1 sticky top-0 pt-3 mb-3 pb-3 z-10 bg-white">
              <h2
                style={{ background: pillarColor }}
                className="inline-flex text-md text-white font-medium uppercase tracking-widest py-[0.3em] px-[1.2em] rounded-full"
              >
                {name}
              </h2>
              <div
                aria-hidden="true"
                className="w-full absolute flex items-center inset-0"
              >
                <div
                  style={{ background: pillarColor }}
                  className="h-px w-full -z-10"
                ></div>
              </div>
            </div>
            {defs.length === 1 ? null : (
              <div className="space-y-6">
                {defs.map((d, i) => {
                  return (
                    <div key={i} className="flex md:flex-row flex-col">
                      <div className="sticky top-10 flex-none self-start w-full md:w-80">
                        <h3 className="text-xl text-gray-700 mt-2 bg-white pb-2 pt-1 w-full md:w-auto">
                          {d["Sub-Pillar"] || "Overall"}
                        </h3>
                      </div>
                      <dl className="mt-4 space-y-3">
                        {stageNames.map((stageName, index) => (
                          <div key={stageName} className="">
                            <dt className="text-gray-500 flex-shrink-0 tracking-wider uppercase font-medium text-sm mb-3">
                              Stage {index + 1}. {stageName}
                            </dt>
                            <dd className="text-gray-700">
                              {/* @ts-ignore */}
                              {d[stageName] || ""}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
};

const Scrollytelling = ({ country }: { country: any }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const onStepEnter = ({ data }: { data: number }) => {
    setCurrentStepIndex(data);
  };
  const focusedSubpillar = ["Infrastructure", "Connectivity Technology"];
  const countryFocusedSubpillar =
    country["scores"][focusedSubpillar[0]][focusedSubpillar[1]];

  const pillarColor = pillarColorMap[focusedSubpillar[0]]?.base || "black";
  let darkerColor = lab(pillarColor);
  darkerColor.b += 90;
  darkerColor.a += 10;
  darkerColor.l += 40;
  let lighterColor = lab(pillarColor);
  lighterColor.b -= 9;
  lighterColor.a += 10;
  lighterColor.l -= 10;
  const stepColors = scaleLinear<string>()
    .domain([0, 6])
    .range([lighterColor.formatHex(), darkerColor.formatHex()])
    .interpolate(interpolateHclLong)
    .clamp(true);

  return (
    <div className="w-full px-[2vw] mt-60">
      <h2 className="text-3xl text-gray-800 font-bold">So how does it work?</h2>

      <div className="relative w-full mb-[120vh]">
        <div className="sticky top-[10vh] w-full h-[80vh] mb-[-100vh] flex items-center justify-center">
          {currentStepIndex < 2 && (
            <div className="w-full h-full flex items-center justify-center">
              {stageNames.map((stageName, index) => (
                <div className="text-[2vw] relative" key={index}>
                  <div
                    className="py-[0.6em] px-[1em] font-semibold text-white"
                    style={{
                      background: stepColors(index),
                    }}
                  >
                    {stageName}
                  </div>

                  <motion.div
                    className="absolute bottom-[-2em] left-1/2 transform -translate-x-1/2 font-mono text-[0.7em]"
                    animate={{
                      y: currentStepIndex > 0 ? 0 : 10,
                      opacity: currentStepIndex > 0 ? 1 : 0,
                    }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    {index + 1}
                  </motion.div>
                </div>
              ))}
            </div>
          )}

          {currentStepIndex > 1 && currentStepIndex < 5 && (
            <>
              <SolarSystem
                isExpandedDefault={currentStepIndex === 4}
                isHighlightingPillars={currentStepIndex === 3}
              />
            </>
          )}

          {currentStepIndex > 4 && currentStepIndex < 7 && (
            <div className="h-full w-full flex items-center justify-center px-[5vw] mb-[5vw]">
              <ScoreRing
                defaultHoveredSubpillar={
                  currentStepIndex === 5 ? undefined : "Connectivity Technology"
                }
                country={
                  currentStepIndex > 5
                    ? country
                    : {
                        score: {},
                      }
                }
                pillars={ancillary.pillars}
              />
            </div>
          )}
        </div>

        <AboutScrollytelling
          country={country}
          onStepEnter={onStepEnter}
          countryFocusedSubpillar={countryFocusedSubpillar}
        />
      </div>
    </div>
  );
};

const SolarSystem = ({
  isExpandedDefault,
  isHighlightingPillars,
}: {
  isExpandedDefault?: boolean;
  isHighlightingPillars?: boolean;
}) => {
  return (
    <svg
      className="SolarSystem w-[min(70vh,100%)] pointer-events-[all]"
      viewBox="0 0 475.5 523.4"
    >
      <defs>
        <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
          <feFlood
            floodColor="rgb(255,255,180)"
            floodOpacity="0.6"
            in="SourceGraphic"
          />
          <feComposite operator="in" in2="SourceGraphic" />
          <feGaussianBlur stdDeviation="5" />
          <feComponentTransfer result="glow1">
            <feFuncA type="linear" slope="2" intercept="0" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode in="glow1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g id="Layer_6">
        {/* sectoral opportunities */}
        <g>
          <g>
            <path
              className="st0"
              d="M40.9,510.6v-2.4h-3.1v2.4h-0.7v-5.3h0.7v2.3h3.1v-2.3h0.7v5.3H40.9z"
            />
            <path
              className="st0"
              d="M42.6,508.7c0-1.1,0.8-2,1.9-2c1.2,0,1.9,0.9,1.9,2.1v0.2h-3.1c0,0.7,0.6,1.3,1.4,1.3c0.4,0,0.9-0.2,1.2-0.5
				l0.3,0.4c-0.4,0.4-0.9,0.6-1.5,0.6C43.4,510.7,42.6,509.9,42.6,508.7z M44.5,507.1c-0.8,0-1.2,0.7-1.3,1.3h2.5
				C45.7,507.8,45.3,507.1,44.5,507.1z"
            />
            <path
              className="st0"
              d="M49.7,510.6v-0.4c-0.3,0.4-0.8,0.5-1.3,0.5c-0.6,0-1.3-0.4-1.3-1.3s0.7-1.3,1.3-1.3c0.5,0,1,0.2,1.3,0.5V508
				c0-0.5-0.4-0.8-1-0.8c-0.5,0-0.8,0.2-1.2,0.5l-0.3-0.4c0.4-0.4,0.9-0.6,1.5-0.6c0.8,0,1.5,0.4,1.5,1.3v2.7h-0.5V510.6z
				 M49.7,509.8V509c-0.2-0.3-0.6-0.5-1.1-0.5c-0.6,0-1,0.4-1,0.8c0,0.5,0.4,0.8,1,0.8C49.1,510.3,49.5,510.1,49.7,509.8z"
            />
            <path className="st0" d="M51.5,510.6v-5.3h0.6v5.3H51.5z" />
            <path
              className="st0"
              d="M53.4,509.8v-2.5h-0.6v-0.5h0.6v-1.1H54v1.1h0.8v0.5H54v2.4c0,0.3,0.1,0.5,0.4,0.5c0.2,0,0.3-0.1,0.4-0.2
				l0.2,0.5c-0.2,0.1-0.4,0.2-0.7,0.2C53.7,510.7,53.4,510.4,53.4,509.8z"
            />
            <path
              className="st0"
              d="M58.3,510.6v-2.5c0-0.7-0.3-0.9-0.9-0.9c-0.5,0-0.9,0.3-1.1,0.6v2.8h-0.6v-5.3h0.6v2
				c0.3-0.3,0.8-0.7,1.4-0.7c0.8,0,1.2,0.4,1.2,1.2v2.7L58.3,510.6L58.3,510.6z"
            />
            <path
              className="st0"
              d="M59.9,508.7c0-1.1,0.8-2,1.9-2c0.7,0,1.1,0.3,1.4,0.7l-0.4,0.4c-0.3-0.4-0.6-0.5-1-0.5
				c-0.8,0-1.3,0.6-1.3,1.5s0.5,1.5,1.3,1.5c0.4,0,0.7-0.2,1-0.5l0.4,0.4c-0.3,0.4-0.7,0.7-1.4,0.7
				C60.6,510.7,59.9,509.8,59.9,508.7z"
            />
            <path
              className="st0"
              d="M66.5,510.6v-0.4c-0.3,0.4-0.8,0.5-1.3,0.5c-0.6,0-1.3-0.4-1.3-1.3s0.7-1.3,1.3-1.3c0.5,0,1,0.2,1.3,0.5V508
				c0-0.5-0.4-0.8-1-0.8c-0.5,0-0.8,0.2-1.2,0.5l-0.3-0.4c0.4-0.4,0.9-0.6,1.5-0.6c0.8,0,1.5,0.4,1.5,1.3v2.7h-0.5V510.6z
				 M66.5,509.8V509c-0.2-0.3-0.6-0.5-1.1-0.5c-0.6,0-1,0.4-1,0.8c0,0.5,0.4,0.8,1,0.8C65.8,510.3,66.2,510.1,66.5,509.8z"
            />
            <path
              className="st0"
              d="M68.3,510.6v-3.9h0.6v0.6c0.3-0.4,0.8-0.7,1.3-0.7v0.6c-0.1,0-0.1,0-0.2,0c-0.4,0-0.9,0.3-1.1,0.6v2.7
				L68.3,510.6L68.3,510.6z"
            />
            <path
              className="st0"
              d="M70.7,508.7c0-1.1,0.8-2,1.9-2c1.2,0,1.9,0.9,1.9,2.1v0.2h-3.1c0,0.7,0.6,1.3,1.4,1.3c0.4,0,0.9-0.2,1.2-0.5
				l0.3,0.4c-0.4,0.4-0.9,0.6-1.5,0.6C71.5,510.7,70.7,509.9,70.7,508.7z M72.6,507.1c-0.8,0-1.2,0.7-1.3,1.3h2.5
				C73.8,507.8,73.5,507.1,72.6,507.1z"
            />
            <path
              className="st0"
              d="M99.6,510.6v-5.3h3.5v0.6h-2.8v1.7h2.8v0.6h-2.8v1.8h2.8v0.6L99.6,510.6L99.6,510.6z"
            />
            <path
              className="st0"
              d="M106.8,510.6v-2.5c0-0.7-0.4-0.9-0.9-0.9s-0.9,0.3-1.1,0.6v2.8h-0.6v-3.9h0.6v0.6c0.3-0.3,0.8-0.7,1.4-0.7
				c0.8,0,1.2,0.4,1.2,1.2v2.7L106.8,510.6L106.8,510.6z"
            />
            <path
              className="st0"
              d="M109.6,510.6l-1.6-3.9h0.7l1.3,3.2l1.3-3.2h0.6l-1.6,3.9H109.6z"
            />
            <path
              className="st0"
              d="M112.4,505.8c0-0.2,0.2-0.4,0.4-0.4c0.2,0,0.4,0.2,0.4,0.4s-0.2,0.4-0.4,0.4
				C112.6,506.2,112.4,506,112.4,505.8z M112.5,510.6v-3.9h0.6v3.9H112.5z"
            />
            <path
              className="st0"
              d="M114.3,510.6v-3.9h0.6v0.6c0.3-0.4,0.8-0.7,1.3-0.7v0.6c-0.1,0-0.1,0-0.2,0c-0.4,0-0.9,0.3-1.1,0.6v2.7
				L114.3,510.6L114.3,510.6z"
            />
            <path
              className="st0"
              d="M116.7,508.7c0-1.1,0.7-2,1.9-2s1.9,0.9,1.9,2s-0.7,2-1.9,2S116.7,509.8,116.7,508.7z M119.9,508.7
				c0-0.8-0.5-1.5-1.3-1.5s-1.3,0.7-1.3,1.5s0.5,1.5,1.3,1.5S119.9,509.5,119.9,508.7z"
            />
            <path
              className="st0"
              d="M124.1,510.6v-2.5c0-0.7-0.4-0.9-0.9-0.9s-0.9,0.3-1.1,0.6v2.8h-0.6v-3.9h0.6v0.6c0.3-0.3,0.8-0.7,1.4-0.7
				c0.8,0,1.2,0.4,1.2,1.2v2.7L124.1,510.6L124.1,510.6z"
            />
            <path
              className="st0"
              d="M130.6,510.6V508c0-0.5-0.2-0.8-0.7-0.8c-0.4,0-0.8,0.3-1,0.6v2.8h-0.6V508c0-0.5-0.2-0.8-0.7-0.8
				c-0.4,0-0.8,0.3-1,0.6v2.8H126v-3.9h0.6v0.6c0.2-0.2,0.7-0.7,1.3-0.7s0.9,0.3,1,0.7c0.2-0.4,0.7-0.7,1.3-0.7
				c0.7,0,1.1,0.4,1.1,1.2v2.8H130.6z"
            />
            <path
              className="st0"
              d="M132.2,508.7c0-1.1,0.8-2,1.9-2c1.2,0,1.9,0.9,1.9,2.1v0.2h-3.1c0,0.7,0.6,1.3,1.4,1.3
				c0.4,0,0.9-0.2,1.2-0.5l0.3,0.4c-0.4,0.4-0.9,0.6-1.5,0.6C133,510.7,132.2,509.9,132.2,508.7z M134.1,507.1
				c-0.8,0-1.2,0.7-1.3,1.3h2.5C135.3,507.8,134.9,507.1,134.1,507.1z"
            />
            <path
              className="st0"
              d="M139.5,510.6v-2.5c0-0.7-0.4-0.9-0.9-0.9s-0.9,0.3-1.1,0.6v2.8h-0.6v-3.9h0.6v0.6c0.3-0.3,0.8-0.7,1.4-0.7
				c0.8,0,1.2,0.4,1.2,1.2v2.7L139.5,510.6L139.5,510.6z"
            />
            <path
              className="st0"
              d="M141.4,509.8v-2.5h-0.6v-0.5h0.6v-1.1h0.6v1.1h0.8v0.5H142v2.4c0,0.3,0.1,0.5,0.4,0.5c0.2,0,0.3-0.1,0.4-0.2
				l0.2,0.5c-0.2,0.1-0.4,0.2-0.7,0.2C141.7,510.7,141.4,510.4,141.4,509.8z"
            />
            <path
              className="st0"
              d="M161.7,507.9c0-1.6,1.2-2.8,2.7-2.8c0.9,0,1.6,0.4,2,1.1l-0.6,0.3c-0.3-0.5-0.9-0.8-1.5-0.8
				c-1.2,0-2.1,0.9-2.1,2.2c0,1.3,0.9,2.2,2.1,2.2c0.6,0,1.2-0.3,1.5-0.8l0.6,0.3c-0.4,0.6-1.1,1.1-2,1.1
				C162.9,510.7,161.7,509.6,161.7,507.9z"
            />
            <path className="st0" d="M167.3,510.6v-5.3h0.6v5.3H167.3z" />
            <path
              className="st0"
              d="M169,505.8c0-0.2,0.2-0.4,0.4-0.4s0.4,0.2,0.4,0.4s-0.2,0.4-0.4,0.4S169,506,169,505.8z M169.1,510.6v-3.9
				h0.6v3.9H169.1z"
            />
            <path
              className="st0"
              d="M175.6,510.6V508c0-0.5-0.2-0.8-0.7-0.8c-0.4,0-0.8,0.3-1,0.6v2.8h-0.6V508c0-0.5-0.2-0.8-0.7-0.8
				c-0.4,0-0.8,0.3-1,0.6v2.8H171v-3.9h0.6v0.6c0.2-0.2,0.7-0.7,1.3-0.7s0.9,0.3,1,0.7c0.2-0.4,0.7-0.7,1.3-0.7
				c0.7,0,1.1,0.4,1.1,1.2v2.8H175.6z"
            />
            <path
              className="st0"
              d="M179.8,510.6v-0.4c-0.3,0.4-0.8,0.5-1.3,0.5c-0.6,0-1.3-0.4-1.3-1.3s0.7-1.3,1.3-1.3c0.5,0,1,0.2,1.3,0.5
				V508c0-0.5-0.4-0.8-1-0.8c-0.5,0-0.8,0.2-1.2,0.5l-0.3-0.4c0.4-0.4,0.9-0.6,1.5-0.6c0.8,0,1.5,0.4,1.5,1.3v2.7h-0.5V510.6z
				 M179.8,509.8V509c-0.2-0.3-0.6-0.5-1.1-0.5c-0.6,0-1,0.4-1,0.8c0,0.5,0.4,0.8,1,0.8C179.2,510.3,179.6,510.1,179.8,509.8z"
            />
            <path
              className="st0"
              d="M181.7,509.8v-2.5h-0.6v-0.5h0.6v-1.1h0.6v1.1h0.8v0.5h-0.8v2.4c0,0.3,0.1,0.5,0.4,0.5
				c0.2,0,0.3-0.1,0.4-0.2l0.2,0.5c-0.2,0.1-0.4,0.2-0.7,0.2C182,510.7,181.7,510.4,181.7,509.8z"
            />
            <path
              className="st0"
              d="M183.8,508.7c0-1.1,0.8-2,1.9-2c1.2,0,1.9,0.9,1.9,2.1v0.2h-3.1c0,0.7,0.6,1.3,1.4,1.3
				c0.4,0,0.9-0.2,1.2-0.5l0.3,0.4c-0.4,0.4-0.9,0.6-1.5,0.6C184.6,510.7,183.8,509.9,183.8,508.7z M185.7,507.1
				c-0.8,0-1.2,0.7-1.3,1.3h2.5C186.9,507.8,186.5,507.1,185.7,507.1z"
            />
            <path
              className="st0"
              d="M194,510.6c-0.2-0.1-0.4-0.3-0.6-0.6c-0.4,0.4-0.9,0.7-1.5,0.7c-0.9,0-1.7-0.5-1.7-1.5
				c0-0.8,0.6-1.3,1.2-1.6c-0.2-0.4-0.4-0.8-0.4-1.2c0-0.7,0.6-1.2,1.3-1.2s1.2,0.4,1.2,1c0,0.8-0.7,1.2-1.4,1.5
				c0.2,0.3,0.4,0.6,0.6,0.8c0.2,0.3,0.4,0.5,0.6,0.7c0.3-0.4,0.5-0.9,0.6-1.2l0.5,0.2c-0.2,0.4-0.4,0.9-0.7,1.4
				c0.3,0.3,0.6,0.6,1,1L194,510.6L194,510.6z M193.1,509.7c-0.3-0.3-0.6-0.6-0.7-0.8c-0.2-0.3-0.5-0.5-0.7-0.8
				c-0.4,0.3-0.8,0.6-0.8,1.2c0,0.7,0.5,1,1.1,1C192.4,510.2,192.8,510,193.1,509.7z M192,507.4c0.6-0.3,1.1-0.6,1.1-1.1
				c0-0.4-0.3-0.6-0.6-0.6c-0.4,0-0.7,0.3-0.7,0.8C191.6,506.7,191.8,507,192,507.4z"
            />
            <path
              className="st0"
              d="M197.5,508.7c0-1.1,0.8-2,1.9-2c1.2,0,1.9,0.9,1.9,2.1v0.2h-3.1c0,0.7,0.6,1.3,1.4,1.3
				c0.4,0,0.9-0.2,1.2-0.5l0.3,0.4c-0.4,0.4-0.9,0.6-1.5,0.6C198.4,510.7,197.5,509.9,197.5,508.7z M199.4,507.1
				c-0.8,0-1.2,0.7-1.3,1.3h2.5C200.7,507.8,200.3,507.1,199.4,507.1z"
            />
            <path
              className="st0"
              d="M204.9,510.6v-2.5c0-0.7-0.4-0.9-0.9-0.9s-0.9,0.3-1.1,0.6v2.8h-0.6v-3.9h0.6v0.6c0.3-0.3,0.8-0.7,1.4-0.7
				c0.8,0,1.2,0.4,1.2,1.2v2.7L204.9,510.6L204.9,510.6z"
            />
            <path
              className="st0"
              d="M206.5,508.7c0-1.1,0.8-2,1.9-2c1.2,0,1.9,0.9,1.9,2.1v0.2h-3.1c0,0.7,0.6,1.3,1.4,1.3
				c0.4,0,0.9-0.2,1.2-0.5l0.3,0.4c-0.4,0.4-0.9,0.6-1.5,0.6C207.3,510.7,206.5,509.9,206.5,508.7z M208.4,507.1
				c-0.8,0-1.2,0.7-1.3,1.3h2.5C209.6,507.8,209.2,507.1,208.4,507.1z"
            />
            <path
              className="st0"
              d="M211.2,510.6v-3.9h0.6v0.6c0.3-0.4,0.8-0.7,1.3-0.7v0.6c-0.1,0-0.1,0-0.2,0c-0.4,0-0.9,0.3-1.1,0.6v2.7
				L211.2,510.6L211.2,510.6z"
            />
            <path
              className="st0"
              d="M213.8,511.6l0.3-0.4c0.3,0.4,0.7,0.5,1.3,0.5s1.2-0.3,1.2-1.1V510c-0.3,0.4-0.8,0.7-1.3,0.7
				c-1,0-1.7-0.8-1.7-2s0.7-2,1.7-2c0.5,0,1,0.3,1.3,0.7v-0.6h0.6v3.8c0,1.2-0.9,1.6-1.8,1.6C214.7,512.2,214.3,512,213.8,511.6z
				 M216.6,509.5v-1.7c-0.2-0.3-0.7-0.6-1.2-0.6c-0.8,0-1.2,0.6-1.2,1.5c0,0.8,0.5,1.5,1.2,1.5C215.9,510.1,216.4,509.8,216.6,509.5
				z"
            />
            <path
              className="st0"
              d="M218.3,511.6c0.1,0,0.2,0.1,0.3,0.1c0.3,0,0.4-0.1,0.6-0.4l0.3-0.6l-1.6-3.9h0.7l1.3,3.2l1.3-3.2h0.6
				l-1.9,4.6c-0.2,0.6-0.6,0.8-1.1,0.8c-0.1,0-0.3,0-0.4-0.1L218.3,511.6z"
            />
            <path
              className="st0"
              d="M249,507.9c0-1.6,1.2-2.8,2.7-2.8c0.9,0,1.6,0.4,2,1.1l-0.6,0.3c-0.3-0.5-0.9-0.8-1.5-0.8
				c-1.2,0-2.1,0.9-2.1,2.2c0,1.3,0.9,2.2,2.1,2.2c0.6,0,1.2-0.3,1.5-0.8l0.6,0.3c-0.4,0.6-1.1,1.1-2,1.1
				C250.3,510.7,249,509.6,249,507.9z"
            />
            <path
              className="st0"
              d="M254.6,510.6v-3.9h0.6v0.6c0.3-0.4,0.8-0.7,1.3-0.7v0.6c-0.1,0-0.1,0-0.2,0c-0.4,0-0.9,0.3-1.1,0.6v2.7
				L254.6,510.6L254.6,510.6z"
            />
            <path
              className="st0"
              d="M257.2,505.8c0-0.2,0.2-0.4,0.4-0.4s0.4,0.2,0.4,0.4s-0.2,0.4-0.4,0.4S257.2,506,257.2,505.8z M257.3,510.6
				v-3.9h0.6v3.9H257.3z"
            />
            <path
              className="st0"
              d="M258.8,510.1l0.3-0.4c0.3,0.3,0.7,0.6,1.3,0.6c0.6,0,0.9-0.3,0.9-0.7c0-0.9-2.4-0.4-2.4-1.8
				c0-0.6,0.5-1.1,1.4-1.1c0.7,0,1.1,0.2,1.4,0.6l-0.3,0.4c-0.2-0.3-0.6-0.5-1.2-0.5c-0.5,0-0.9,0.3-0.9,0.6c0,0.8,2.4,0.3,2.4,1.8
				c0,0.6-0.5,1.2-1.5,1.2C259.7,510.7,259.2,510.5,258.8,510.1z"
            />
            <path
              className="st0"
              d="M262.7,505.8c0-0.2,0.2-0.4,0.4-0.4s0.4,0.2,0.4,0.4s-0.2,0.4-0.4,0.4S262.7,506,262.7,505.8z M262.8,510.6
				v-3.9h0.6v3.9H262.8z"
            />
            <path
              className="st0"
              d="M264.3,510.1l0.3-0.4c0.3,0.3,0.7,0.6,1.3,0.6c0.6,0,0.9-0.3,0.9-0.7c0-0.9-2.4-0.4-2.4-1.8
				c0-0.6,0.5-1.1,1.4-1.1c0.7,0,1.1,0.2,1.4,0.6l-0.3,0.4c-0.2-0.3-0.6-0.5-1.2-0.5c-0.5,0-0.9,0.3-0.9,0.6c0,0.8,2.4,0.3,2.4,1.8
				c0,0.6-0.5,1.2-1.5,1.2C265.2,510.7,264.7,510.5,264.3,510.1z"
            />
            <path
              className="st0"
              d="M270.4,510.6v-3.9h0.6v0.6c0.3-0.4,0.8-0.7,1.3-0.7v0.6c-0.1,0-0.1,0-0.2,0c-0.4,0-0.9,0.3-1.1,0.6v2.7
				L270.4,510.6L270.4,510.6z"
            />
            <path
              className="st0"
              d="M272.8,508.7c0-1.1,0.8-2,1.9-2c1.2,0,1.9,0.9,1.9,2.1v0.2h-3.1c0,0.7,0.6,1.3,1.4,1.3
				c0.4,0,0.9-0.2,1.2-0.5l0.3,0.4c-0.4,0.4-0.9,0.6-1.5,0.6C273.6,510.7,272.8,509.9,272.8,508.7z M274.7,507.1
				c-0.8,0-1.2,0.7-1.3,1.3h2.5C276,507.8,275.6,507.1,274.7,507.1z"
            />
            <path
              className="st0"
              d="M277.2,510.1l0.3-0.4c0.3,0.3,0.7,0.6,1.3,0.6c0.6,0,0.9-0.3,0.9-0.7c0-0.9-2.4-0.4-2.4-1.8
				c0-0.6,0.5-1.1,1.4-1.1c0.7,0,1.1,0.2,1.4,0.6l-0.3,0.4c-0.2-0.3-0.6-0.5-1.2-0.5c-0.5,0-0.9,0.3-0.9,0.6c0,0.8,2.4,0.3,2.4,1.8
				c0,0.6-0.5,1.2-1.5,1.2C278.1,510.7,277.6,510.5,277.2,510.1z"
            />
            <path
              className="st0"
              d="M281.2,505.8c0-0.2,0.2-0.4,0.4-0.4s0.4,0.2,0.4,0.4s-0.2,0.4-0.4,0.4S281.2,506,281.2,505.8z M281.3,510.6
				v-3.9h0.6v3.9H281.3z"
            />
            <path className="st0" d="M283.1,510.6v-5.3h0.6v5.3H283.1z" />
            <path
              className="st0"
              d="M284.8,505.8c0-0.2,0.2-0.4,0.4-0.4s0.4,0.2,0.4,0.4s-0.2,0.4-0.4,0.4S284.8,506,284.8,505.8z M284.9,510.6
				v-3.9h0.6v3.9H284.9z"
            />
            <path
              className="st0"
              d="M286.4,508.7c0-1.1,0.8-2,1.9-2c1.2,0,1.9,0.9,1.9,2.1v0.2h-3.1c0,0.7,0.6,1.3,1.4,1.3
				c0.4,0,0.9-0.2,1.2-0.5l0.3,0.4c-0.4,0.4-0.9,0.6-1.5,0.6C287.3,510.7,286.4,509.9,286.4,508.7z M288.3,507.1
				c-0.8,0-1.2,0.7-1.3,1.3h2.5C289.6,507.8,289.2,507.1,288.3,507.1z"
            />
            <path
              className="st0"
              d="M293.8,510.6v-2.5c0-0.7-0.4-0.9-0.9-0.9s-0.9,0.3-1.1,0.6v2.8h-0.6v-3.9h0.6v0.6c0.3-0.3,0.8-0.7,1.4-0.7
				c0.8,0,1.2,0.4,1.2,1.2v2.7L293.8,510.6L293.8,510.6z"
            />
            <path
              className="st0"
              d="M295.4,508.7c0-1.1,0.8-2,1.9-2c0.7,0,1.1,0.3,1.4,0.7l-0.4,0.4c-0.3-0.4-0.6-0.5-1-0.5
				c-0.8,0-1.3,0.6-1.3,1.5s0.5,1.5,1.3,1.5c0.4,0,0.7-0.2,1-0.5l0.4,0.4c-0.3,0.4-0.7,0.7-1.4,0.7
				C296.1,510.7,295.4,509.8,295.4,508.7z"
            />
            <path
              className="st0"
              d="M299.3,508.7c0-1.1,0.8-2,1.9-2c1.2,0,1.9,0.9,1.9,2.1v0.2H300c0,0.7,0.6,1.3,1.4,1.3c0.4,0,0.9-0.2,1.2-0.5
				l0.3,0.4c-0.4,0.4-0.9,0.6-1.5,0.6C300.2,510.7,299.3,509.9,299.3,508.7z M301.2,507.1c-0.8,0-1.2,0.7-1.3,1.3h2.5
				C302.5,507.8,302.1,507.1,301.2,507.1z"
            />
            <path
              className="st0"
              d="M327.9,509.8l0.4-0.5c0.3,0.4,0.9,0.8,1.7,0.8c1,0,1.3-0.5,1.3-0.9c0-1.4-3.2-0.6-3.2-2.5
				c0-0.9,0.8-1.5,1.8-1.5c0.8,0,1.4,0.3,1.9,0.8l-0.4,0.5c-0.4-0.4-1-0.6-1.5-0.6c-0.6,0-1.1,0.3-1.1,0.8c0,1.2,3.2,0.5,3.2,2.5
				c0,0.8-0.5,1.6-2,1.6C329,510.7,328.3,510.3,327.9,509.8z"
            />
            <path
              className="st0"
              d="M337.6,510.6V508c0-0.5-0.2-0.8-0.7-0.8c-0.4,0-0.8,0.3-1,0.6v2.8h-0.6V508c0-0.5-0.2-0.8-0.7-0.8
				c-0.4,0-0.8,0.3-1,0.6v2.8H333v-3.9h0.6v0.6c0.2-0.2,0.7-0.7,1.3-0.7c0.6,0,0.9,0.3,1,0.7c0.2-0.4,0.7-0.7,1.3-0.7
				c0.7,0,1.1,0.4,1.1,1.2v2.8H337.6z"
            />
            <path
              className="st0"
              d="M341.8,510.6v-0.4c-0.3,0.4-0.8,0.5-1.3,0.5c-0.6,0-1.3-0.4-1.3-1.3s0.7-1.3,1.3-1.3c0.5,0,1,0.2,1.3,0.5
				V508c0-0.5-0.4-0.8-1-0.8c-0.5,0-0.8,0.2-1.2,0.5l-0.3-0.4c0.4-0.4,0.9-0.6,1.5-0.6c0.8,0,1.5,0.4,1.5,1.3v2.7h-0.5V510.6z
				 M341.8,509.8V509c-0.2-0.3-0.6-0.5-1.1-0.5c-0.6,0-1,0.4-1,0.8c0,0.5,0.4,0.8,1,0.8C341.1,510.3,341.5,510.1,341.8,509.8z"
            />
            <path
              className="st0"
              d="M343.6,510.6v-3.9h0.6v0.6c0.3-0.4,0.8-0.7,1.3-0.7v0.6c-0.1,0-0.1,0-0.2,0c-0.4,0-0.9,0.3-1.1,0.6v2.7
				L343.6,510.6L343.6,510.6z"
            />
            <path
              className="st0"
              d="M346.3,509.8v-2.5h-0.6v-0.5h0.6v-1.1h0.6v1.1h0.8v0.5h-0.8v2.4c0,0.3,0.1,0.5,0.4,0.5
				c0.2,0,0.3-0.1,0.4-0.2l0.2,0.5c-0.2,0.1-0.4,0.2-0.7,0.2C346.6,510.7,346.3,510.4,346.3,509.8z"
            />
            <path
              className="st0"
              d="M350.4,508.7c0-1.1,0.8-2,1.9-2c0.7,0,1.1,0.3,1.4,0.7l-0.4,0.4c-0.3-0.4-0.6-0.5-1-0.5
				c-0.8,0-1.3,0.6-1.3,1.5s0.5,1.5,1.3,1.5c0.4,0,0.7-0.2,1-0.5l0.4,0.4c-0.3,0.4-0.7,0.7-1.4,0.7
				C351.2,510.7,350.4,509.8,350.4,508.7z"
            />
            <path
              className="st0"
              d="M354.5,505.8c0-0.2,0.2-0.4,0.4-0.4s0.4,0.2,0.4,0.4s-0.2,0.4-0.4,0.4S354.5,506,354.5,505.8z M354.6,510.6
				v-3.9h0.6v3.9H354.6z"
            />
            <path
              className="st0"
              d="M356.5,509.8v-2.5h-0.6v-0.5h0.6v-1.1h0.6v1.1h0.8v0.5h-0.8v2.4c0,0.3,0.1,0.5,0.4,0.5
				c0.2,0,0.3-0.1,0.4-0.2l0.2,0.5c-0.2,0.1-0.4,0.2-0.7,0.2C356.8,510.7,356.5,510.4,356.5,509.8z"
            />
            <path
              className="st0"
              d="M358.7,505.8c0-0.2,0.2-0.4,0.4-0.4s0.4,0.2,0.4,0.4s-0.2,0.4-0.4,0.4S358.7,506,358.7,505.8z M358.8,510.6
				v-3.9h0.6v3.9H358.8z"
            />
            <path
              className="st0"
              d="M360.3,508.7c0-1.1,0.8-2,1.9-2c1.2,0,1.9,0.9,1.9,2.1v0.2H361c0,0.7,0.6,1.3,1.4,1.3c0.4,0,0.9-0.2,1.2-0.5
				l0.3,0.4c-0.4,0.4-0.9,0.6-1.5,0.6C361.2,510.7,360.3,509.9,360.3,508.7z M362.2,507.1c-0.8,0-1.2,0.7-1.3,1.3h2.5
				C363.5,507.8,363.1,507.1,362.2,507.1z"
            />
            <path
              className="st0"
              d="M364.7,510.1l0.3-0.4c0.3,0.3,0.7,0.6,1.3,0.6c0.6,0,0.9-0.3,0.9-0.7c0-0.9-2.4-0.4-2.4-1.8
				c0-0.6,0.5-1.1,1.4-1.1c0.7,0,1.1,0.2,1.4,0.6l-0.3,0.4c-0.2-0.3-0.6-0.5-1.2-0.5c-0.5,0-0.9,0.3-0.9,0.6c0,0.8,2.4,0.3,2.4,1.8
				c0,0.6-0.5,1.2-1.5,1.2C365.7,510.7,365.1,510.5,364.7,510.1z"
            />
            <path
              className="st0"
              d="M388.4,510.6v-5.3h1.8c1.7,0,2.7,1.2,2.7,2.7s-1.1,2.7-2.7,2.7h-1.8V510.6z M392.2,507.9
				c0-1.2-0.7-2.1-2-2.1H389v4.1h1.2C391.5,510,392.2,509.1,392.2,507.9z"
            />
            <path
              className="st0"
              d="M393.8,505.8c0-0.2,0.2-0.4,0.4-0.4s0.4,0.2,0.4,0.4s-0.2,0.4-0.4,0.4S393.8,506,393.8,505.8z M393.9,510.6
				v-3.9h0.6v3.9H393.9z"
            />
            <path
              className="st0"
              d="M395.7,511.6l0.3-0.4c0.3,0.4,0.7,0.5,1.3,0.5c0.6,0,1.2-0.3,1.2-1.1V510c-0.3,0.4-0.8,0.7-1.3,0.7
				c-1,0-1.7-0.8-1.7-2s0.7-2,1.7-2c0.5,0,1,0.3,1.3,0.7v-0.6h0.6v3.8c0,1.2-0.9,1.6-1.8,1.6C396.6,512.2,396.2,512,395.7,511.6z
				 M398.5,509.5v-1.7c-0.2-0.3-0.7-0.6-1.2-0.6c-0.8,0-1.2,0.6-1.2,1.5c0,0.8,0.5,1.5,1.2,1.5C397.8,510.1,398.3,509.8,398.5,509.5
				z"
            />
            <path
              className="st0"
              d="M400.2,505.8c0-0.2,0.2-0.4,0.4-0.4s0.4,0.2,0.4,0.4s-0.2,0.4-0.4,0.4S400.2,506,400.2,505.8z M400.3,510.6
				v-3.9h0.6v3.9H400.3z"
            />
            <path
              className="st0"
              d="M402.2,509.8v-2.5h-0.6v-0.5h0.6v-1.1h0.6v1.1h0.8v0.5h-0.8v2.4c0,0.3,0.1,0.5,0.4,0.5
				c0.2,0,0.3-0.1,0.4-0.2l0.2,0.5c-0.2,0.1-0.4,0.2-0.7,0.2C402.5,510.7,402.2,510.4,402.2,509.8z"
            />
            <path
              className="st0"
              d="M406.9,510.6v-0.4c-0.3,0.4-0.8,0.5-1.3,0.5c-0.6,0-1.3-0.4-1.3-1.3s0.7-1.3,1.3-1.3c0.5,0,1,0.2,1.3,0.5
				V508c0-0.5-0.4-0.8-1-0.8c-0.5,0-0.8,0.2-1.2,0.5l-0.3-0.4c0.4-0.4,0.9-0.6,1.5-0.6c0.8,0,1.5,0.4,1.5,1.3v2.7h-0.5V510.6z
				 M406.9,509.8V509c-0.2-0.3-0.6-0.5-1.1-0.5c-0.6,0-1,0.4-1,0.8c0,0.5,0.4,0.8,1,0.8C406.3,510.3,406.7,510.1,406.9,509.8z"
            />
            <path className="st0" d="M408.7,510.6v-5.3h0.6v5.3H408.7z" />
            <path
              className="st0"
              d="M412.7,510.6v-3.3h-0.6v-0.5h0.6v-0.3c0-0.8,0.5-1.3,1.1-1.3c0.2,0,0.4,0,0.6,0.1l-0.2,0.5
				c-0.1-0.1-0.2-0.1-0.3-0.1c-0.4,0-0.6,0.3-0.6,0.8v0.3h0.8v0.5h-0.8v3.3H412.7z M414.7,505.8c0-0.2,0.2-0.4,0.4-0.4
				c0.2,0,0.4,0.2,0.4,0.4s-0.2,0.4-0.4,0.4C414.9,506.2,414.7,506,414.7,505.8z M414.8,510.6v-3.9h0.6v3.9H414.8z"
            />
            <path
              className="st0"
              d="M419.3,510.6v-2.5c0-0.7-0.4-0.9-0.9-0.9s-0.9,0.3-1.1,0.6v2.8h-0.6v-3.9h0.6v0.6c0.3-0.3,0.8-0.7,1.4-0.7
				c0.8,0,1.2,0.4,1.2,1.2v2.7L419.3,510.6L419.3,510.6z"
            />
            <path
              className="st0"
              d="M423.5,510.6v-0.4c-0.3,0.4-0.8,0.5-1.3,0.5c-0.6,0-1.3-0.4-1.3-1.3s0.7-1.3,1.3-1.3c0.5,0,1,0.2,1.3,0.5
				V508c0-0.5-0.4-0.8-1-0.8c-0.5,0-0.8,0.2-1.2,0.5l-0.3-0.4c0.4-0.4,0.9-0.6,1.5-0.6c0.8,0,1.5,0.4,1.5,1.3v2.7h-0.5V510.6z
				 M423.5,509.8V509c-0.2-0.3-0.6-0.5-1.1-0.5c-0.6,0-1,0.4-1,0.8c0,0.5,0.4,0.8,1,0.8C422.8,510.3,423.2,510.1,423.5,509.8z"
            />
            <path
              className="st0"
              d="M427.9,510.6v-2.5c0-0.7-0.4-0.9-0.9-0.9s-0.9,0.3-1.1,0.6v2.8h-0.6v-3.9h0.6v0.6c0.3-0.3,0.8-0.7,1.4-0.7
				c0.8,0,1.2,0.4,1.2,1.2v2.7L427.9,510.6L427.9,510.6z"
            />
            <path
              className="st0"
              d="M429.5,508.7c0-1.1,0.8-2,1.9-2c0.7,0,1.1,0.3,1.4,0.7l-0.4,0.4c-0.3-0.4-0.6-0.5-1-0.5
				c-0.8,0-1.3,0.6-1.3,1.5s0.5,1.5,1.3,1.5c0.4,0,0.7-0.2,1-0.5l0.4,0.4c-0.3,0.4-0.7,0.7-1.4,0.7
				C430.3,510.7,429.5,509.8,429.5,508.7z"
            />
            <path
              className="st0"
              d="M433.4,508.7c0-1.1,0.8-2,1.9-2c1.2,0,1.9,0.9,1.9,2.1v0.2h-3.1c0,0.7,0.6,1.3,1.4,1.3
				c0.4,0,0.9-0.2,1.2-0.5l0.3,0.4c-0.4,0.4-0.9,0.6-1.5,0.6C434.3,510.7,433.4,509.9,433.4,508.7z M435.3,507.1
				c-0.8,0-1.2,0.7-1.3,1.3h2.5C436.6,507.8,436.2,507.1,435.3,507.1z"
            />
          </g>
        </g>
        <g>
          <g>
            <path
              className="st1"
              d="M180.5,494.8l0.5-0.6c0.4,0.5,1,0.9,1.9,0.9c1.1,0,1.4-0.6,1.4-1c0-1.5-3.6-0.7-3.6-2.8c0-1,0.9-1.7,2.1-1.7
				c0.9,0,1.6,0.3,2.1,0.8l-0.5,0.5c-0.5-0.5-1.1-0.7-1.7-0.7c-0.7,0-1.2,0.4-1.2,1c0,1.4,3.6,0.6,3.6,2.8c0,0.9-0.6,1.8-2.2,1.8
				C181.7,495.8,181,495.4,180.5,494.8z"
            />
            <path
              className="st1"
              d="M186.1,495.7v-6h3.9v0.7h-3.2v1.9h3.1v0.7h-3.1v2.1h3.2v0.7h-3.9V495.7z"
            />
            <path
              className="st1"
              d="M191,492.7c0-1.8,1.4-3.1,3.1-3.1c1.1,0,1.8,0.5,2.3,1.2l-0.6,0.4c-0.3-0.5-1-0.9-1.7-0.9
				c-1.3,0-2.3,1-2.3,2.4s1,2.4,2.3,2.4c0.7,0,1.3-0.4,1.7-0.9l0.6,0.3c-0.5,0.7-1.2,1.2-2.3,1.2C192.4,495.8,191,494.5,191,492.7z"
            />
            <path
              className="st1"
              d="M198.8,495.7v-5.3h-1.9v-0.7h4.6v0.7h-1.9v5.3H198.8z"
            />
            <path
              className="st1"
              d="M202,492.7c0-1.8,1.2-3.1,3-3.1s3,1.3,3,3.1s-1.2,3.1-3,3.1C203.2,495.8,202,494.5,202,492.7z M207.2,492.7
				c0-1.4-0.9-2.4-2.2-2.4c-1.4,0-2.2,1-2.2,2.4s0.9,2.4,2.2,2.4S207.2,494.1,207.2,492.7z"
            />
            <path
              className="st1"
              d="M212.6,495.7l-1.5-2.4h-1.2v2.4h-0.7v-6h2.4c1.1,0,1.9,0.7,1.9,1.8c0,1.1-0.7,1.7-1.6,1.7l1.6,2.4h-0.9
				V495.7z M212.6,491.5c0-0.7-0.5-1.1-1.2-1.1h-1.6v2.3h1.6C212.1,492.6,212.6,492.2,212.6,491.5z"
            />
            <path
              className="st1"
              d="M218.9,495.7l-0.5-1.3h-3l-0.5,1.3H214l2.4-6h0.9l2.4,6H218.9z M216.8,490.4l-1.3,3.2h2.5L216.8,490.4z"
            />
            <path className="st1" d="M220.4,495.7v-6h0.7v5.3h2.8v0.7H220.4z" />
            <path
              className="st1"
              d="M227,492.7c0-1.8,1.2-3.1,3-3.1s3,1.3,3,3.1s-1.2,3.1-3,3.1C228.2,495.8,227,494.5,227,492.7z M232.2,492.7
				c0-1.4-0.9-2.4-2.2-2.4c-1.4,0-2.2,1-2.2,2.4s0.9,2.4,2.2,2.4S232.2,494.1,232.2,492.7z"
            />
            <path
              className="st1"
              d="M234.1,495.7v-6h2.4c1.2,0,1.9,0.8,1.9,1.8s-0.7,1.8-1.9,1.8h-1.7v2.4L234.1,495.7L234.1,495.7z
				 M237.7,491.5c0-0.7-0.5-1.1-1.2-1.1h-1.6v2.3h1.6C237.2,492.6,237.7,492.2,237.7,491.5z"
            />
            <path
              className="st1"
              d="M239.4,495.7v-6h2.4c1.2,0,1.9,0.8,1.9,1.8s-0.7,1.8-1.9,1.8h-1.7v2.4L239.4,495.7L239.4,495.7z
				 M242.9,491.5c0-0.7-0.5-1.1-1.2-1.1h-1.6v2.3h1.6C242.5,492.6,242.9,492.2,242.9,491.5z"
            />
            <path
              className="st1"
              d="M244.5,492.7c0-1.8,1.2-3.1,3-3.1s3,1.3,3,3.1s-1.2,3.1-3,3.1C245.7,495.8,244.5,494.5,244.5,492.7z
				 M249.7,492.7c0-1.4-0.9-2.4-2.2-2.4c-1.4,0-2.2,1-2.2,2.4s0.9,2.4,2.2,2.4S249.7,494.1,249.7,492.7z"
            />
            <path
              className="st1"
              d="M255.1,495.7l-1.5-2.4h-1.2v2.4h-0.7v-6h2.4c1.1,0,1.9,0.7,1.9,1.8c0,1.1-0.7,1.7-1.6,1.7l1.6,2.4h-0.9
				V495.7z M255.1,491.5c0-0.7-0.5-1.1-1.2-1.1h-1.6v2.3h1.6C254.6,492.6,255.1,492.2,255.1,491.5z"
            />
            <path
              className="st1"
              d="M258.5,495.7v-5.3h-1.9v-0.7h4.6v0.7h-1.9v5.3H258.5z"
            />
            <path
              className="st1"
              d="M262.1,493.3v-3.7h0.8v3.7c0,1.1,0.6,1.8,1.7,1.8s1.7-0.7,1.7-1.8v-3.7h0.8v3.7c0,1.5-0.8,2.4-2.5,2.4
				C262.9,495.8,262.1,494.8,262.1,493.3z"
            />
            <path
              className="st1"
              d="M272.7,495.7l-3.5-4.8v4.8h-0.7v-6h0.8l3.5,4.7v-4.7h0.7v6H272.7z"
            />
            <path className="st1" d="M274.8,495.7v-6h0.7v6H274.8z" />
            <path
              className="st1"
              d="M278.4,495.7v-5.3h-1.9v-0.7h4.6v0.7h-1.9v5.3H278.4z"
            />
            <path className="st1" d="M282.1,495.7v-6h0.7v6H282.1z" />
            <path
              className="st1"
              d="M284.2,495.7v-6h3.9v0.7H285v1.9h3.1v0.7H285v2.1h3.2v0.7h-4V495.7z"
            />
            <path
              className="st1"
              d="M289,494.8l0.5-0.6c0.4,0.5,1,0.9,1.9,0.9c1.1,0,1.4-0.6,1.4-1c0-1.5-3.6-0.7-3.6-2.8c0-1,0.9-1.7,2.1-1.7
				c0.9,0,1.6,0.3,2.1,0.8l-0.5,0.5c-0.5-0.5-1.1-0.7-1.7-0.7c-0.7,0-1.2,0.4-1.2,1c0,1.4,3.6,0.6,3.6,2.8c0,0.9-0.6,1.8-2.2,1.8
				C290.3,495.8,289.5,495.4,289,494.8z"
            />
          </g>
        </g>
      </g>
      <g id="Layer_10">
        {/* principles */}
        <g>
          <path
            className="st2"
            d="M71.1,133.4l-1.3-0.3l-1.5,2.2l0.7,1.1l-0.4,0.6l-3.2-4.8l0.5-0.7l5.6,1.2L71.1,133.4z M66.3,132.3l1.8,2.5
			l1.3-1.9L66.3,132.3z"
          />
          <path
            className="st2"
            d="M72.4,131.6l-4.1-0.9l0.4-0.5L72,131l-1.8-2.9l0.4-0.5l2.2,3.5L72.4,131.6z"
          />
          <path
            className="st2"
            d="M75.5,127.3l-0.4-0.3c0.1,0.5,0,0.9-0.3,1.3c-0.4,0.5-1.2,0.8-1.8,0.3c-0.7-0.5-0.6-1.3-0.2-1.8
			c0.3-0.4,0.7-0.7,1.2-0.7l-0.6-0.4c-0.4-0.3-0.9-0.1-1.2,0.3c-0.3,0.4-0.4,0.8-0.3,1.3h-0.5c-0.1-0.6,0-1.1,0.4-1.6
			c0.5-0.7,1.2-1,1.9-0.4l2.1,1.6L75.5,127.3z M74.9,126.8l-0.6-0.4c-0.4,0-0.8,0.2-1,0.6c-0.3,0.5-0.3,1,0.1,1.3s0.9,0.2,1.3-0.3
			C74.9,127.6,75,127.2,74.9,126.8z"
          />
          <path
            className="st2"
            d="M72.7,123c-0.2-0.1-0.2-0.4-0.1-0.6s0.4-0.2,0.6-0.1s0.2,0.4,0.1,0.6C73.1,123.1,72.9,123.2,72.7,123z
			 M76.6,125.9l-3.1-2.3l0.4-0.5l3.1,2.3L76.6,125.9z"
          />
          <path
            className="st2"
            d="M77.7,124.5l-4.2-3.3l0.4-0.5l4.2,3.3L77.7,124.5z"
          />
          <path
            className="st2"
            d="M80.3,121.2l-0.3-0.3c0.1,0.5-0.1,0.9-0.4,1.3c-0.4,0.5-1.2,0.8-1.8,0.2c-0.7-0.5-0.6-1.3-0.2-1.8
			c0.3-0.4,0.7-0.7,1.2-0.7l-0.5-0.4c-0.4-0.3-0.9-0.2-1.2,0.3c-0.3,0.4-0.4,0.8-0.3,1.3h-0.5c-0.1-0.6,0.1-1.1,0.5-1.6
			c0.5-0.6,1.2-0.9,2-0.4l2.1,1.7L80.3,121.2z M79.7,120.6l-0.6-0.5c-0.4,0-0.8,0.2-1,0.5c-0.4,0.4-0.3,1,0.1,1.3s0.9,0.2,1.3-0.2
			C79.6,121.4,79.8,121,79.7,120.6z"
          />
          <path
            className="st2"
            d="M81.4,119.8l-4.1-3.4l0.4-0.5l1.6,1.3c-0.1-0.5,0-1,0.3-1.4c0.7-0.8,1.7-0.8,2.7,0s1.1,1.8,0.4,2.6
			c-0.3,0.4-0.9,0.6-1.4,0.6l0.4,0.4L81.4,119.8z M82.2,118.2c0.5-0.6,0.3-1.4-0.3-1.9c-0.7-0.5-1.4-0.6-1.9,0
			c-0.3,0.4-0.4,0.9-0.3,1.3l1.3,1.1C81.4,118.7,81.9,118.5,82.2,118.2z"
          />
          <path
            className="st2"
            d="M80.6,113.2c-0.2-0.1-0.2-0.4,0-0.6c0.1-0.2,0.4-0.2,0.6,0c0.2,0.1,0.2,0.4,0,0.6
			C81.1,113.3,80.8,113.4,80.6,113.2z M84.4,116.3l-2.9-2.5l0.4-0.5l2.9,2.5L84.4,116.3z"
          />
          <path
            className="st2"
            d="M85.5,114.9l-4-3.5l0.4-0.5l4,3.5L85.5,114.9z"
          />
          <path
            className="st2"
            d="M83,110.5c-0.2-0.1-0.2-0.4,0-0.6c0.1-0.2,0.4-0.2,0.6,0c0.2,0.1,0.2,0.4,0,0.6
			C83.5,110.6,83.2,110.6,83,110.5z M86.7,113.6l-2.9-2.6l0.4-0.4l2.9,2.6L86.7,113.6z"
          />
          <path
            className="st2"
            d="M87.4,111.6l-1.9-1.7l-0.4,0.5l-0.4-0.4l0.4-0.5l-0.8-0.7l0.4-0.4l0.8,0.7l0.5-0.6l0.4,0.4l-0.5,0.6l1.8,1.6
			c0.2,0.2,0.5,0.2,0.6,0.1s0.2-0.3,0.2-0.4L89,111c0,0.2-0.1,0.4-0.3,0.7C88.2,112,87.8,112,87.4,111.6z"
          />
          <path
            className="st2"
            d="M90.1,111.3c0.1,0,0.2-0.1,0.3-0.2c0.2-0.2,0.2-0.4,0.1-0.7l-0.2-0.6l-4-1.5l0.4-0.5l3.2,1.2l-1.4-3.1
			l0.4-0.5L91,110c0.2,0.6,0.1,1-0.2,1.4c-0.1,0.1-0.2,0.2-0.3,0.3L90.1,111.3z"
          />
          <path
            className="st2"
            d="M111.7,89.9l-1.1-0.6l-2.1,1.7l0.4,1.2l-0.6,0.5l-1.7-5.5l0.6-0.5l5,2.8L111.7,89.9z M107.4,87.4l0.9,2.9
			l1.8-1.4L107.4,87.4z"
          />
          <path
            className="st2"
            d="M111.4,87.6c-0.7-0.9-0.6-2.1,0.3-2.8c0.6-0.4,1.1-0.5,1.5-0.3l-0.1,0.5c-0.4-0.1-0.8,0-1.1,0.2
			c-0.6,0.5-0.7,1.3-0.1,2c0.5,0.7,1.3,0.9,2,0.4c0.3-0.2,0.5-0.6,0.5-1h0.5c0,0.5-0.1,1-0.7,1.4C113.3,88.8,112.1,88.5,111.4,87.6z
			"
          />
          <path
            className="st2"
            d="M114.6,85.2c-0.7-0.9-0.6-2.1,0.3-2.8c0.6-0.4,1.1-0.4,1.5-0.3l-0.1,0.5c-0.4-0.1-0.8,0-1.1,0.2
			c-0.7,0.5-0.7,1.3-0.2,2s1.3,0.9,2,0.4c0.3-0.2,0.5-0.6,0.5-1l0.5,0.1c0,0.5-0.2,1-0.7,1.4C116.4,86.4,115.3,86.1,114.6,85.2z"
          />
          <path
            className="st2"
            d="M117.8,82.8c-0.7-0.9-0.5-2.1,0.4-2.8c1-0.7,2-0.3,2.7,0.6l0.1,0.1l-2.5,1.8c0.5,0.6,1.2,0.8,1.9,0.3
			c0.4-0.3,0.6-0.7,0.7-1.1l0.5,0.2c-0.1,0.5-0.4,1-0.9,1.4C119.6,84,118.5,83.8,117.8,82.8z M118.4,80.5c-0.7,0.5-0.6,1.3-0.3,1.8
			l2.1-1.5C119.9,80.3,119.1,80,118.4,80.5z"
          />
          <path
            className="st2"
            d="M122.2,81.5V81c0.4,0.1,0.9,0,1.4-0.3s0.6-0.8,0.4-1.1c-0.5-0.8-2.2,1.1-3-0.1c-0.3-0.5-0.2-1.2,0.6-1.7
			c0.5-0.4,1.1-0.4,1.5-0.3V78c-0.3-0.1-0.8,0-1.2,0.2c-0.4,0.3-0.6,0.7-0.4,1c0.5,0.7,2.1-1.1,3,0.1c0.4,0.5,0.2,1.3-0.6,1.8
			C123.3,81.4,122.7,81.6,122.2,81.5z"
          />
          <path
            className="st2"
            d="M125.2,79.4v-0.5c0.4,0.1,0.9,0.1,1.4-0.2c0.5-0.3,0.6-0.7,0.4-1.1c-0.5-0.8-2.2,1-3-0.2
			c-0.3-0.5-0.2-1.2,0.6-1.7c0.6-0.4,1.1-0.4,1.5-0.3v0.5c-0.3-0.1-0.8-0.1-1.2,0.2c-0.4,0.3-0.6,0.7-0.4,1c0.5,0.7,2.2-1.1,3,0.2
			c0.4,0.5,0.2,1.3-0.6,1.8C126.3,79.4,125.8,79.5,125.2,79.4z"
          />
          <path
            className="st2"
            d="M126.2,73.6c-0.1-0.2-0.1-0.4,0.1-0.6c0.2-0.1,0.4-0.1,0.6,0.1c0.1,0.2,0.1,0.4-0.1,0.6
			C126.6,73.8,126.3,73.8,126.2,73.6z M128.9,77.6l-2.1-3.3l0.5-0.3l2.1,3.3L128.9,77.6z"
          />
          <path
            className="st2"
            d="M130.4,76.6l-2.8-4.5l0.5-0.3l1.1,1.7c0-0.5,0.3-1,0.8-1.3c0.9-0.5,1.9-0.2,2.5,0.8c0.7,1.1,0.5,2.1-0.4,2.6
			c-0.5,0.3-1,0.3-1.5,0.1l0.3,0.5L130.4,76.6z M131.6,75.3c0.7-0.4,0.7-1.2,0.3-1.9c-0.4-0.7-1.2-1-1.8-0.6
			c-0.4,0.3-0.7,0.7-0.7,1.1l0.9,1.5C130.7,75.6,131.2,75.6,131.6,75.3z"
          />
          <path
            className="st2"
            d="M131.8,70.1c-0.1-0.2-0.1-0.4,0.1-0.6c0.2-0.1,0.4,0,0.6,0.1c0.1,0.2,0.1,0.4-0.1,0.5
			C132.1,70.4,131.9,70.3,131.8,70.1z M134.3,74.2l-2-3.3l0.5-0.3l2,3.3L134.3,74.2z"
          />
          <path
            className="st2"
            d="M135.8,73.3l-2.7-4.6l0.5-0.3l2.7,4.6L135.8,73.3z"
          />
          <path
            className="st2"
            d="M134.9,68.3c-0.1-0.2,0-0.4,0.2-0.6c0.2-0.1,0.4,0,0.5,0.2s0,0.4-0.1,0.5C135.2,68.6,135,68.5,134.9,68.3z
			 M137.4,72.4l-1.9-3.4l0.5-0.3l1.9,3.4L137.4,72.4z"
          />
          <path
            className="st2"
            d="M138.6,70.8l-1.2-2.2l-0.6,0.3l-0.3-0.5l0.6-0.3l-0.5-0.9l0.5-0.3l0.5,0.9l0.7-0.4l0.3,0.5l-0.7,0.4l1.2,2.1
			c0.1,0.3,0.4,0.4,0.6,0.2c0.2-0.1,0.2-0.2,0.3-0.3l0.4,0.3c-0.1,0.2-0.2,0.4-0.5,0.6C139.3,71.4,138.9,71.3,138.6,70.8z"
          />
          <path
            className="st2"
            d="M141.3,71.3c0.1,0,0.2-0.1,0.3-0.1c0.2-0.1,0.3-0.3,0.3-0.6l-0.1-0.6l-3.3-2.7l0.6-0.3l2.6,2.2l-0.4-3.4
			l0.6-0.3l0.5,5c0.1,0.6-0.2,1-0.6,1.2c-0.1,0.1-0.3,0.1-0.4,0.2L141.3,71.3z"
          />
          <path
            className="st1"
            d="M167.5,58.3l-2-5.6l2.3-0.8c1.1-0.4,2.1,0.1,2.4,1.1c0.3,0.9,0,1.9-1.2,2.3l-1.6,0.6l0.8,2.2L167.5,58.3z
			 M169.4,53.2c-0.2-0.6-0.8-0.9-1.5-0.7l-1.5,0.5l0.8,2.2l1.5-0.5C169.3,54.4,169.6,53.8,169.4,53.2z"
          />
          <path
            className="st1"
            d="M175.7,55.5l-2.2-1.8l-1.1,0.4l0.7,2.3l-0.7,0.2l-1.9-5.7l2.3-0.8c1-0.3,2,0.1,2.4,1.1c0.3,1-0.2,1.8-0.9,2.1
			l2.3,1.8L175.7,55.5z M174.5,51.5c-0.2-0.6-0.8-0.9-1.5-0.7l-1.5,0.5l0.7,2.2l1.5-0.5C174.4,52.7,174.7,52.1,174.5,51.5z"
          />
          <path
            className="st1"
            d="M177.6,54.9l-1.8-5.7l0.7-0.2l1.8,5.7L177.6,54.9z"
          />
          <path
            className="st1"
            d="M183.7,53.1l-4.7-3.6l1.3,4.6l-0.7,0.2l-1.7-5.8l0.7-0.2l4.6,3.6l-1.3-4.5l0.7-0.2l1.7,5.8L183.7,53.1z"
          />
          <path
            className="st1"
            d="M184.8,49.7c-0.5-1.8,0.6-3.3,2.2-3.8c1-0.3,1.9,0,2.5,0.6L189,47c-0.5-0.4-1.2-0.6-1.8-0.4
			c-1.3,0.3-2,1.5-1.6,2.9c0.3,1.4,1.6,2.1,2.8,1.8c0.7-0.2,1.2-0.7,1.4-1.3l0.7,0.2c-0.3,0.8-0.9,1.5-1.9,1.7
			C186.9,52.3,185.2,51.5,184.8,49.7z"
          />
          <path
            className="st1"
            d="M191.6,51.1l-1.4-5.9L191,45l1.4,5.9L191.6,51.1z"
          />
          <path
            className="st1"
            d="M193.7,50.6l-1.3-5.9l2.4-0.5c1.2-0.3,2,0.4,2.2,1.4s-0.3,1.9-1.5,2.2l-1.6,0.3l0.5,2.3L193.7,50.6z
			 M196.3,45.7c-0.1-0.7-0.7-1-1.4-0.9l-1.5,0.3l0.5,2.2l1.5-0.3C196,47,196.4,46.4,196.3,45.7z"
          />
          <path
            className="st1"
            d="M198.7,49.5l-1.1-5.9l0.7-0.1l1,5.2l2.7-0.5l0.1,0.7L198.7,49.5z"
          />
          <path
            className="st1"
            d="M203.2,48.7l-1-5.9l3.9-0.6l0.1,0.7l-3.1,0.5l0.3,1.9l3.1-0.5l0.1,0.7l-3.1,0.5l0.3,2l3.1-0.5l0.1,0.7
			L203.2,48.7z"
          />
          <path
            className="st1"
            d="M207.7,47.1l0.4-0.6c0.4,0.4,1.1,0.7,2,0.6c1.1-0.1,1.3-0.8,1.3-1.2c-0.2-1.5-3.6-0.2-3.9-2.3
			c-0.1-1,0.6-1.8,1.8-1.9c0.9-0.1,1.6,0.1,2.2,0.5l-0.4,0.6c-0.5-0.4-1.2-0.6-1.8-0.5c-0.7,0.1-1.2,0.6-1.1,1.1
			c0.2,1.3,3.6,0.1,3.9,2.3c0.1,0.9-0.3,1.8-2,2C209.1,47.9,208.3,47.6,207.7,47.1z"
          />
          <path
            className="st1"
            d="M215.7,46.9l-0.6-6l3.9-0.4l0.1,0.7l-3.2,0.3l0.2,1.9l3.1-0.3l0.1,0.7l-3.1,0.3l0.3,2.7L215.7,46.9z"
          />
          <path
            className="st1"
            d="M220.1,43.5c-0.1-1.8,1-3.2,2.7-3.3c1.8-0.1,3.1,1.1,3.2,2.9c0.1,1.8-1,3.2-2.8,3.3
			C221.5,46.5,220.2,45.3,220.1,43.5z M225.3,43.1c-0.1-1.4-1-2.4-2.4-2.3c-1.3,0.1-2.1,1.2-2,2.6c0.1,1.4,1,2.4,2.4,2.3
			C224.6,45.6,225.4,44.5,225.3,43.1z"
          />
          <path
            className="st1"
            d="M230.9,45.9l-1.6-2.3h-1.2l0.1,2.4h-0.7l-0.2-6l2.4-0.1c1.1,0,1.9,0.6,2,1.7c0,1.1-0.7,1.7-1.5,1.8l1.7,2.4
			L230.9,45.9z M230.8,41.7c0-0.7-0.5-1.1-1.3-1.1l-1.6,0.1L228,43l1.6-0.1C230.3,42.8,230.8,42.3,230.8,41.7z"
          />
          <path
            className="st1"
            d="M235.2,45.8l-0.1-6h2.1c1.9,0,3.1,1.3,3.1,3s-1.2,3-3,3H235.2z M239.5,42.7c0-1.3-0.9-2.3-2.3-2.3h-1.3
			l0.1,4.7h1.3C238.7,45.1,239.5,44,239.5,42.7z"
          />
          <path className="st1" d="M241.4,45.8l0.1-6h0.7l-0.1,6H241.4z" />
          <path
            className="st1"
            d="M243.4,42.8c0.1-1.9,1.5-3,3.2-3c1.1,0,1.8,0.5,2.3,1.2l-0.6,0.4c-0.4-0.5-1-0.9-1.7-0.9
			c-1.3-0.1-2.3,0.9-2.4,2.3c-0.1,1.4,0.9,2.5,2.2,2.5c0.7,0,1.3-0.3,1.6-0.6v-1.2l-2.1-0.1v-0.7l2.8,0.1l-0.1,2.2
			c-0.6,0.6-1.4,1-2.4,1C244.7,46,243.3,44.7,243.4,42.8z"
          />
          <path className="st1" d="M249.9,46.1l0.4-6h0.7l-0.4,6H249.9z" />
          <path
            className="st1"
            d="M253.5,46.3L254,41l-1.9-0.1l0.1-0.7l4.5,0.4l-0.1,0.7l-1.9-0.1l-0.4,5.3L253.5,46.3z"
          />
          <path
            className="st1"
            d="M260.8,47l-0.4-1.4l-3-0.3l-0.7,1.3l-0.9-0.1l3-5.7l0.9,0.1l1.8,6.2L260.8,47z M259.3,41.6l-1.6,3.1l2.5,0.3
			L259.3,41.6z"
          />
          <path
            className="st1"
            d="M262.3,47.2l0.8-6l0.7,0.1l-0.7,5.3l2.8,0.4l-0.1,0.7L262.3,47.2z"
          />
          <path
            className="st1"
            d="M269,48.1l0.9-5.9l0.7,0.1l-0.9,5.9L269,48.1z"
          />
          <path
            className="st1"
            d="M275.3,49.2l-2.6-5.3l-0.8,4.7l-0.7-0.1l1-5.9l0.8,0.1l2.6,5.2l0.8-4.6l0.7,0.1l-1,5.9L275.3,49.2z"
          />
          <path
            className="st1"
            d="M277.8,46.6c0.4-1.8,2-2.8,3.7-2.4c1,0.2,1.7,0.9,2,1.6l-0.7,0.2c-0.2-0.6-0.8-1.1-1.4-1.2
			c-1.3-0.3-2.5,0.5-2.8,1.9s0.5,2.6,1.8,2.9c0.7,0.1,1.4-0.1,1.8-0.5l0.5,0.5c-0.6,0.6-1.4,0.9-2.5,0.7
			C278.4,49.9,277.4,48.4,277.8,46.6z"
          />
          <path
            className="st1"
            d="M283.2,50.8l1.4-5.8l0.7,0.2l-1.2,5.2l2.7,0.6l-0.2,0.6L283.2,50.8z"
          />
          <path
            className="st1"
            d="M287.9,49.5l0.9-3.5l0.7,0.2l-0.9,3.5c-0.3,1.1,0.1,1.9,1.2,2.2s1.8-0.2,2.1-1.3l0.9-3.5l0.7,0.2l-0.9,3.5
			c-0.4,1.4-1.4,2.2-3,1.7C288.1,52.1,287.6,51,287.9,49.5z"
          />
          <path
            className="st1"
            d="M293.3,52.5l0.6-0.4c0.2,0.5,0.7,1.1,1.6,1.4c1,0.3,1.5-0.2,1.7-0.6c0.4-1.5-3.2-1.7-2.6-3.7
			c0.3-1,1.3-1.4,2.5-1c0.9,0.3,1.5,0.8,1.8,1.4l-0.6,0.4c-0.3-0.6-0.8-1-1.5-1.2s-1.3,0-1.5,0.6c-0.4,1.3,3.2,1.6,2.6,3.7
			c-0.2,0.8-1.1,1.5-2.6,1.1C294.2,53.8,293.6,53.2,293.3,52.5z"
          />
          <path
            className="st1"
            d="M298.4,54.9l1.8-5.7l0.7,0.2l-1.8,5.7L298.4,54.9z"
          />
          <path
            className="st1"
            d="M301.2,52.6c0.6-1.7,2.1-2.6,3.8-2c1.7,0.6,2.4,2.2,1.8,3.9s-2.2,2.6-3.8,2C301.3,56,300.6,54.3,301.2,52.6z
			 M306.1,54.3c0.5-1.3,0-2.6-1.3-3s-2.4,0.3-2.9,1.6c-0.4,1.3,0,2.6,1.3,3S305.7,55.6,306.1,54.3z"
          />
          <path
            className="st1"
            d="M310.9,59.3l-1.6-5.7l-1.7,4.5l-0.7-0.3l2.1-5.6l0.7,0.3l1.6,5.6l1.7-4.4l0.7,0.3l-2.1,5.6L310.9,59.3z"
          />
          <path
            className="st0"
            d="M337.1,71.6l0.2-1.3L335,69l-1,0.8l-0.7-0.4l4.5-3.6l0.7,0.4l-0.7,5.7L337.1,71.6z M337.7,66.7l-2.4,2l2,1.1
			L337.7,66.7z"
          />
          <path
            className="st0"
            d="M340.7,73.7l0.3-0.5c-0.4,0.2-1,0.2-1.5-0.1c-0.9-0.5-1.1-1.5-0.5-2.6s1.6-1.4,2.5-0.9
			c0.4,0.3,0.7,0.7,0.8,1.2l1-1.8l0.5,0.3l-2.7,4.6L340.7,73.7z M341.2,72.8l0.9-1.5c0-0.4-0.3-0.9-0.7-1.1
			c-0.7-0.4-1.4-0.1-1.8,0.7c-0.4,0.7-0.3,1.5,0.3,1.9C340.3,73,340.9,73,341.2,72.8z"
          />
          <path
            className="st0"
            d="M343,72.8c0.6-1,1.7-1.3,2.7-0.7c1,0.6,1.2,1.8,0.6,2.7c-0.6,1-1.7,1.3-2.7,0.7C342.6,75,342.4,73.8,343,72.8
			z M345.8,74.5c0.4-0.7,0.4-1.5-0.3-1.9s-1.5-0.1-1.9,0.6s-0.4,1.5,0.3,1.9S345.3,75.2,345.8,74.5z"
          />
          <path
            className="st0"
            d="M346.9,76.8l-1.1,1.7l-0.5-0.3l2.9-4.5l0.5,0.3l-0.3,0.5c0.4-0.2,1-0.2,1.5,0.1c0.9,0.6,1,1.6,0.4,2.6
			c-0.7,1-1.7,1.3-2.5,0.8C347.2,77.8,347,77.4,346.9,76.8z M349.7,77c0.5-0.7,0.4-1.5-0.2-1.9c-0.4-0.3-0.9-0.3-1.3-0.1l-0.9,1.5
			c0,0.4,0.2,0.9,0.6,1.1C348.5,78,349.2,77.7,349.7,77z"
          />
          <path
            className="st0"
            d="M350.4,78.9l1.4-2.1l-0.5-0.4l0.3-0.4l0.5,0.4l0.6-0.9l0.5,0.3l-0.6,0.9l0.7,0.4l-0.3,0.4l-0.7-0.4l-1.3,2
			c-0.2,0.2-0.2,0.5,0,0.6c0.1,0.1,0.3,0.1,0.4,0.1l-0.1,0.5c-0.2,0-0.4,0-0.7-0.2C350.2,79.8,350.1,79.4,350.4,78.9z"
          />
          <path
            className="st0"
            d="M351.8,80.8l2.2-3.2l0.5,0.3l-2.2,3.2L351.8,80.8z M354.5,76.8c0.1-0.2,0.4-0.2,0.6-0.1s0.2,0.4,0.1,0.6
			s-0.4,0.2-0.6,0.1S354.3,76.9,354.5,76.8z"
          />
          <path
            className="st0"
            d="M354.2,80.1c0.6-0.9,1.8-1.2,2.7-0.5c1,0.7,1,1.8,0.4,2.8c-0.6,0.9-1.8,1.2-2.7,0.6
			C353.7,82.2,353.6,81,354.2,80.1z M356.8,81.9c0.5-0.6,0.5-1.5-0.2-2s-1.5-0.2-1.9,0.5c-0.5,0.6-0.5,1.5,0.2,2
			S356.4,82.6,356.8,81.9z"
          />
          <path
            className="st0"
            d="M359.1,86l1.5-2c0.4-0.6,0.3-0.9-0.2-1.2c-0.4-0.3-0.9-0.3-1.3-0.2l-1.7,2.3l-0.5-0.4l2.3-3.1l0.5,0.4
			l-0.3,0.4c0.4-0.1,1-0.1,1.5,0.3c0.6,0.5,0.7,1.1,0.2,1.7l-1.6,2.2L359.1,86z"
          />
          <path
            className="st0"
            d="M376,100.1l0.5-1.2l-2-1.8l-1.2,0.6l-0.6-0.5l5.2-2.5l0.6,0.6l-2,5.4L376,100.1z M377.9,95.5l-2.8,1.4
			l1.7,1.5L377.9,95.5z"
          />
          <path
            className="st0"
            d="M379.4,103.3l1.4-2.9l-2.9,1.5l-0.4-0.4l1.8-3.6l0.4,0.4l-1.5,2.9l2.9-1.5l0.4,0.4l-1.4,2.9l2.8-1.6l0.5,0.4
			l-3.6,1.9L379.4,103.3z"
          />
          <path
            className="st0"
            d="M382.8,106.8l0.3-0.3c-0.5,0-0.9-0.2-1.3-0.5c-0.5-0.5-0.6-1.3,0-1.9s1.4-0.4,1.9,0.1
			c0.4,0.4,0.6,0.8,0.5,1.3l0.5-0.5c0.4-0.4,0.3-0.9-0.1-1.3c-0.3-0.3-0.7-0.5-1.2-0.5l0.1-0.5c0.6,0,1.1,0.2,1.5,0.7
			c0.6,0.6,0.8,1.3,0.1,2l-1.9,1.9L382.8,106.8z M383.4,106.2l0.5-0.5c0.1-0.4-0.1-0.8-0.4-1.1c-0.4-0.4-0.9-0.4-1.3-0.1
			s-0.3,0.9,0.1,1.3C382.6,106.1,383,106.3,383.4,106.2z"
          />
          <path
            className="st0"
            d="M384.1,108.1l2.8-2.7l0.4,0.4l-0.4,0.4c0.5,0,1,0.1,1.4,0.4l-0.4,0.4c0-0.1-0.1-0.1-0.1-0.2
			c-0.3-0.3-0.8-0.4-1.2-0.3l-2,1.9L384.1,108.1z"
          />
          <path
            className="st0"
            d="M387.1,108.5c0.8-0.8,2-0.8,2.8,0c0.8,0.9,0.6,2-0.3,2.8l-0.1,0.1l-2.1-2.3c-0.5,0.5-0.6,1.3,0,1.9
			c0.3,0.3,0.7,0.5,1.2,0.5l-0.1,0.5c-0.5,0-1.1-0.3-1.5-0.7C386.2,110.5,386.2,109.3,387.1,108.5z M389.5,108.8
			c-0.6-0.6-1.3-0.4-1.8-0.1l1.7,1.9C389.9,110.3,390.1,109.5,389.5,108.8z"
          />
          <path
            className="st0"
            d="M390.6,115.2l1.9-1.7c0.5-0.5,0.4-0.9,0.1-1.2c-0.3-0.4-0.8-0.5-1.2-0.5l-2.1,1.9l-0.4-0.5l2.9-2.5l0.4,0.5
			l-0.4,0.4c0.4,0,1,0.2,1.4,0.6c0.5,0.6,0.5,1.2-0.1,1.7l-2,1.8L390.6,115.2z"
          />
          <path
            className="st0"
            d="M393.1,115.1c0.9-0.7,2.1-0.7,2.8,0.2c0.8,0.9,0.5,2-0.4,2.8l-0.1,0.1l-2-2.4c-0.5,0.5-0.7,1.3-0.1,1.9
			c0.3,0.3,0.7,0.6,1.2,0.6l-0.1,0.5c-0.5-0.1-1-0.3-1.4-0.8C392.1,117.1,392.2,115.9,393.1,115.1z M395.5,115.6
			c-0.5-0.6-1.3-0.5-1.8-0.1l1.6,1.9C395.8,117,396.1,116.3,395.5,115.6z"
          />
          <path
            className="st0"
            d="M394.8,119.4h0.5c-0.1,0.4,0,0.9,0.4,1.3c0.4,0.5,0.8,0.5,1.1,0.3c0.7-0.6-1.2-2.1-0.1-3
			c0.5-0.4,1.2-0.3,1.8,0.4c0.4,0.5,0.5,1,0.5,1.5h-0.5c0.1-0.4,0-0.8-0.3-1.2c-0.3-0.4-0.7-0.5-1-0.3c-0.7,0.5,1.3,2,0.1,3
			c-0.5,0.4-1.2,0.3-1.9-0.4C394.9,120.5,394.8,120,394.8,119.4z"
          />
          <path
            className="st0"
            d="M397.2,122.3h0.5c-0.1,0.4,0,0.9,0.3,1.3c0.4,0.5,0.8,0.6,1.1,0.3c0.7-0.6-1.2-2.1-0.1-3
			c0.5-0.4,1.2-0.3,1.8,0.4c0.4,0.5,0.5,1,0.4,1.5h-0.5c0.1-0.4,0-0.8-0.3-1.2c-0.3-0.4-0.7-0.5-1-0.3c-0.7,0.5,1.2,2.1,0.1,3
			c-0.5,0.4-1.2,0.3-1.9-0.5C397.2,123.4,397.1,122.9,397.2,122.3z"
          />
          <path
            className="st0"
            d="M411.9,144.5l4.6-2.7l1.1,1.8c0.5,0.9,0.2,1.8-0.5,2.3c-0.8,0.4-1.7,0.3-2.2-0.6l-0.7-1.3l-1.8,1.1
			L411.9,144.5z M416.7,145.4c0.5-0.3,0.7-0.9,0.3-1.4l-0.7-1.2l-1.8,1l0.7,1.2C415.6,145.5,416.2,145.7,416.7,145.4z"
          />
          <path
            className="st0"
            d="M414.2,148.6l3.4-1.9l0.3,0.5l-0.5,0.3c0.5,0.1,1,0.3,1.2,0.8l-0.5,0.3c0-0.1-0.1-0.1-0.1-0.2
			c-0.2-0.3-0.7-0.6-1.1-0.6l-2.4,1.3L414.2,148.6z"
          />
          <path
            className="st0"
            d="M417.1,149.7c1-0.5,2.1-0.3,2.7,0.7s0.1,2.1-0.9,2.6s-2.1,0.3-2.7-0.7C415.7,151.3,416.1,150.3,417.1,149.7z
			 M418.6,152.5c0.7-0.4,1.1-1.1,0.7-1.8s-1.2-0.8-1.9-0.4c-0.7,0.4-1.1,1.1-0.7,1.8C417.1,152.9,417.9,152.9,418.6,152.5z"
          />
          <path
            className="st0"
            d="M418.4,154.6l2.2-1.2l-0.3-0.6l0.5-0.2l0.3,0.6l0.9-0.5l0.3,0.5l-0.9,0.5l0.4,0.7l-0.5,0.2l-0.4-0.7l-2.1,1.1
			c-0.3,0.1-0.4,0.3-0.3,0.6c0.1,0.2,0.2,0.3,0.3,0.3l-0.3,0.4c-0.2-0.1-0.4-0.2-0.5-0.5C417.8,155.3,417.9,154.9,418.4,154.6z"
          />
          <path
            className="st0"
            d="M420.4,155.9c1-0.5,2.2-0.2,2.7,0.8s0,2.1-1,2.6l-0.1,0.1l-1.4-2.8c-0.6,0.4-1,1.1-0.6,1.8
			c0.2,0.4,0.6,0.7,1,0.9l-0.2,0.4c-0.5-0.2-0.9-0.6-1.2-1.1C418.9,157.5,419.3,156.4,420.4,155.9z M422.6,156.9
			c-0.4-0.7-1.2-0.8-1.7-0.6l1.1,2.3C422.5,158.4,423,157.7,422.6,156.9z"
          />
          <path
            className="st0"
            d="M422.4,159.9c1-0.5,2.2-0.2,2.7,0.9c0.3,0.6,0.2,1.1,0,1.6l-0.5-0.2c0.2-0.4,0.2-0.7,0-1.1
			c-0.3-0.7-1.1-0.9-1.9-0.6c-0.8,0.4-1.1,1.1-0.8,1.8c0.2,0.4,0.5,0.6,0.9,0.7l-0.2,0.5c-0.5-0.1-0.9-0.4-1.2-1
			C420.8,161.5,421.3,160.4,422.4,159.9z"
          />
          <path
            className="st0"
            d="M423.1,164.3l2.3-1l-0.3-0.6l0.5-0.2l0.3,0.6l1-0.4l0.3,0.6l-1,0.4l0.3,0.7l-0.5,0.2l-0.3-0.7l-2.2,1
			c-0.3,0.1-0.4,0.3-0.3,0.6c0.1,0.2,0.2,0.3,0.3,0.3l-0.3,0.3c-0.2-0.1-0.4-0.2-0.5-0.5C422.4,164.9,422.6,164.5,423.1,164.3z"
          />
          <path
            className="st0"
            d="M423.3,166.7l3.5-1.6l0.2,0.5l-3.5,1.6L423.3,166.7z M427.7,164.6c0.2-0.1,0.4,0,0.5,0.2s0,0.4-0.2,0.5
			s-0.4,0-0.5-0.2S427.5,164.7,427.7,164.6z"
          />
          <path
            className="st0"
            d="M425.7,167.3c1-0.4,2.1-0.1,2.6,1s-0.1,2.1-1.1,2.5s-2.2,0.1-2.6-1C424.1,168.8,424.7,167.8,425.7,167.3z
			 M427,170.3c0.7-0.3,1.2-1,0.9-1.8c-0.3-0.8-1.1-0.9-1.9-0.6c-0.7,0.3-1.2,1-0.9,1.8C425.4,170.4,426.2,170.6,427,170.3z"
          />
          <path
            className="st0"
            d="M426.7,174.9l2.4-0.9c0.6-0.3,0.7-0.7,0.5-1.1c-0.2-0.4-0.6-0.7-1-0.8l-2.6,1l-0.2-0.6l3.6-1.4l0.2,0.6
			l-0.5,0.2c0.4,0.1,0.9,0.5,1.1,1c0.3,0.7,0.1,1.3-0.7,1.6l-2.5,1L426.7,174.9z"
          />
        </g>
      </g>
      <g id="Layer_2_copy">
        <g>
          <motion.g
            filter={isExpandedDefault ? "url(#glow)" : undefined}
            animate={{
              opacity: isExpandedDefault ? 1 : 0,
              y: isExpandedDefault ? 0 : 10,
            }}
            transition={{
              delay: 0.3 * 0.7,
            }}
          >
            <path
              className="st3"
              d="M89.7,143.5v-6h2.5c1.9,0,3.2,1.1,3.2,3s-1.4,3-3.2,3H89.7z M93.8,140.5c0-0.9-0.6-1.6-1.7-1.6h-1v3.3h1
				C93.2,142.1,93.8,141.4,93.8,140.5z"
            />
            <path
              className="st3"
              d="M95.9,137.9c0-0.4,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8c0,0.4-0.4,0.8-0.8,0.8S95.9,138.4,95.9,137.9z M96,143.5
				v-4.3h1.4v4.3H96z"
            />
            <path
              className="st3"
              d="M98.6,144.6l0.6-1c0.3,0.4,0.8,0.5,1.3,0.5s1.1-0.2,1.1-1v-0.3c-0.4,0.4-0.8,0.6-1.3,0.6
				c-1.1,0-1.9-0.7-1.9-2.2c0-1.4,0.8-2.2,1.9-2.2c0.5,0,0.9,0.2,1.3,0.6v-0.5h1.4v4c0,1.8-1.4,2.1-2.5,2.1
				C99.8,145.2,99.2,145.1,98.6,144.6z M101.7,141.8v-1.2c-0.2-0.2-0.5-0.4-0.8-0.4c-0.5,0-1,0.3-1,1c0,0.6,0.4,1,1,1
				C101.1,142.2,101.5,142,101.7,141.8z"
            />
            <path
              className="st3"
              d="M103.9,137.9c0-0.4,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8c0,0.4-0.4,0.8-0.8,0.8S103.9,138.4,103.9,137.9z
				 M104,143.5v-4.3h1.4v4.3H104z"
            />
            <path
              className="st3"
              d="M107,142.3v-2h-0.7v-1.2h0.7v-1.2h1.4v1.2h0.9v1.2h-0.9v1.6c0,0.3,0.1,0.4,0.4,0.4c0.2,0,0.3-0.1,0.4-0.1
				l0.3,1c-0.2,0.2-0.5,0.3-1,0.3C107.5,143.6,107,143.1,107,142.3z"
            />
            <path
              className="st3"
              d="M112.5,143.5V143c-0.3,0.3-0.8,0.5-1.4,0.5c-0.7,0-1.5-0.5-1.5-1.4c0-1.1,0.8-1.4,1.5-1.4
				c0.6,0,1.1,0.2,1.4,0.5v-0.4c0-0.4-0.3-0.6-0.9-0.6c-0.4,0-0.9,0.2-1.2,0.5l-0.5-1c0.6-0.5,1.3-0.7,2-0.7c1,0,2,0.4,2,1.7v2.7
				L112.5,143.5L112.5,143.5z M112.5,142.4V142c-0.1-0.2-0.5-0.3-0.8-0.3c-0.4,0-0.7,0.2-0.7,0.5s0.3,0.5,0.7,0.5
				C112.1,142.7,112.4,142.6,112.5,142.4z"
            />
            <path className="st3" d="M114.8,143.5v-6h1.4v6H114.8z" />
            <path
              className="st3"
              d="M84.8,152.5l-0.8-2.7l-0.8,2.7h-1.5l-1.3-4.3h1.4l0.7,2.7l0.9-2.7h1.2l0.9,2.7l0.7-2.7h1.4l-1.3,4.3H84.8z"
            />
            <path
              className="st3"
              d="M87.9,150.3c0-1.3,0.9-2.3,2.3-2.3c1.3,0,2.2,0.9,2.2,2.4v0.3h-3.1c0.1,0.4,0.5,0.7,1.1,0.7
				c0.3,0,0.8-0.1,1.1-0.4l0.6,0.9c-0.4,0.4-1.2,0.6-1.8,0.6C88.9,152.6,87.9,151.7,87.9,150.3z M90.2,149.1c-0.6,0-0.8,0.4-0.9,0.7
				h1.8C91.1,149.5,90.8,149.1,90.2,149.1z"
            />
            <path className="st3" d="M93.4,152.5v-6h1.4v6H93.4z" />
            <path className="st3" d="M96.1,152.5v-6h1.4v6H96.1z" />
            <path className="st3" d="M98.6,150.9v-1.2h2.2v1.2H98.6z" />
            <path
              className="st3"
              d="M101.9,152.5v-6h1.4v2.2c0.3-0.4,0.8-0.6,1.3-0.6c1.1,0,1.9,0.9,1.9,2.3c0,1.5-0.8,2.3-1.9,2.3
				c-0.5,0-0.9-0.2-1.3-0.6v0.5L101.9,152.5L101.9,152.5z M104.1,151.4c0.5,0,1-0.4,1-1.1c0-0.6-0.4-1.1-1-1.1
				c-0.3,0-0.7,0.2-0.8,0.4v1.3C103.4,151.2,103.8,151.4,104.1,151.4z"
            />
            <path
              className="st3"
              d="M107,150.3c0-1.3,0.9-2.3,2.3-2.3c1.3,0,2.2,0.9,2.2,2.4v0.3h-3.1c0.1,0.4,0.5,0.7,1.1,0.7
				c0.3,0,0.8-0.1,1.1-0.4l0.6,0.9c-0.4,0.4-1.2,0.6-1.8,0.6C108,152.6,107,151.7,107,150.3z M109.3,149.1c-0.6,0-0.8,0.4-0.9,0.7
				h1.8C110.1,149.5,109.9,149.1,109.3,149.1z"
            />
            <path
              className="st3"
              d="M112.4,146.9c0-0.4,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8c0,0.4-0.4,0.8-0.8,0.8S112.4,147.4,112.4,146.9z
				 M112.5,152.5v-4.3h1.4v4.3H112.5z"
            />
            <path
              className="st3"
              d="M118.1,152.5V150c0-0.5-0.3-0.7-0.7-0.7c-0.4,0-0.7,0.2-0.8,0.4v2.8h-1.4v-4.3h1.4v0.5
				c0.3-0.3,0.8-0.6,1.5-0.6c1,0,1.4,0.6,1.4,1.4v3.1L118.1,152.5L118.1,152.5z"
            />
            <path
              className="st3"
              d="M120.5,153.6l0.6-1c0.3,0.4,0.8,0.5,1.3,0.5s1.1-0.2,1.1-1v-0.3c-0.4,0.4-0.8,0.6-1.3,0.6
				c-1.1,0-1.9-0.7-1.9-2.2c0-1.4,0.8-2.2,1.9-2.2c0.5,0,0.9,0.2,1.3,0.6v-0.5h1.4v4c0,1.8-1.4,2.1-2.5,2.1
				C121.6,154.2,121,154.1,120.5,153.6z M123.5,150.8v-1.2c-0.2-0.2-0.5-0.4-0.8-0.4c-0.5,0-1,0.3-1,1c0,0.6,0.4,1,1,1
				C123,151.2,123.3,151,123.5,150.8z"
            />
          </motion.g>
        </g>
        <g>
          <motion.g
            filter={isExpandedDefault ? "url(#glow)" : undefined}
            animate={{
              opacity: isExpandedDefault ? 1 : 0,
              y: isExpandedDefault ? 0 : 10,
            }}
            transition={{
              delay: 0.4 * 0.7,
            }}
          >
            <path
              className="st3"
              d="M63.1,182.9v-3.6h1.6v3.5c0,0.7,0.4,1.2,1.3,1.2c0.8,0,1.3-0.5,1.3-1.2v-3.5h1.6v3.6c0,1.5-0.9,2.5-2.8,2.5
				S63.1,184.4,63.1,182.9z"
            />
            <path
              className="st3"
              d="M69.1,184.7l0.6-1c0.3,0.3,1,0.6,1.5,0.6c0.4,0,0.6-0.1,0.6-0.3c0-0.5-2.5,0-2.5-1.7c0-0.8,0.7-1.4,1.9-1.4
				c0.7,0,1.3,0.2,1.8,0.6l-0.5,1c-0.3-0.3-0.8-0.5-1.3-0.5c-0.3,0-0.5,0.1-0.5,0.3c0,0.5,2.5,0,2.5,1.8c0,0.8-0.7,1.4-2,1.4
				C70.3,185.4,69.5,185.2,69.1,184.7z"
            />
            <path
              className="st3"
              d="M76.4,185.3v-0.4c-0.3,0.3-0.8,0.5-1.4,0.5c-0.7,0-1.5-0.5-1.5-1.4c0-1.1,0.8-1.4,1.5-1.4
				c0.6,0,1.1,0.2,1.4,0.5v-0.4c0-0.4-0.3-0.6-0.9-0.6c-0.4,0-0.9,0.2-1.2,0.5l-0.5-1c0.6-0.5,1.3-0.7,2-0.7c1,0,2,0.4,2,1.7v2.7
				L76.4,185.3L76.4,185.3z M76.4,184.2v-0.4c-0.1-0.2-0.5-0.3-0.8-0.3c-0.4,0-0.7,0.2-0.7,0.5s0.3,0.5,0.7,0.5
				C75.9,184.5,76.3,184.4,76.4,184.2z"
            />
            <path
              className="st3"
              d="M78.6,186.4l0.6-1c0.3,0.4,0.8,0.5,1.3,0.5s1.1-0.2,1.1-1v-0.3c-0.4,0.4-0.8,0.6-1.3,0.6
				c-1.1,0-1.9-0.7-1.9-2.2c0-1.4,0.8-2.2,1.9-2.2c0.5,0,0.9,0.2,1.3,0.6V181H83v4c0,1.8-1.4,2.1-2.5,2.1
				C79.8,187.1,79.2,186.9,78.6,186.4z M81.6,183.6v-1.2c-0.2-0.2-0.5-0.4-0.8-0.4c-0.5,0-1,0.3-1,1c0,0.6,0.4,1,1,1
				C81.1,184,81.5,183.9,81.6,183.6z"
            />
            <path
              className="st3"
              d="M83.7,183.1c0-1.3,0.9-2.3,2.3-2.3c1.3,0,2.2,0.9,2.2,2.4v0.3h-3.1c0.1,0.4,0.5,0.7,1.1,0.7
				c0.3,0,0.8-0.1,1.1-0.4l0.6,0.9c-0.4,0.4-1.2,0.6-1.8,0.6C84.8,185.4,83.7,184.5,83.7,183.1z M86.1,182c-0.6,0-0.8,0.4-0.9,0.7
				H87C86.9,182.3,86.7,182,86.1,182z"
            />
            <path
              className="st3"
              d="M94.5,185.3v-0.4c-0.3,0.3-0.8,0.5-1.4,0.5c-0.7,0-1.5-0.5-1.5-1.4c0-1.1,0.8-1.4,1.5-1.4
				c0.6,0,1.1,0.2,1.4,0.5v-0.4c0-0.4-0.3-0.6-0.9-0.6c-0.4,0-0.9,0.2-1.2,0.5l-0.5-1c0.6-0.5,1.3-0.7,2-0.7c1,0,2,0.4,2,1.7v2.7
				L94.5,185.3L94.5,185.3z M94.5,184.2v-0.4c-0.1-0.2-0.5-0.3-0.8-0.3c-0.4,0-0.7,0.2-0.7,0.5s0.3,0.5,0.7,0.5
				C94,184.5,94.3,184.4,94.5,184.2z"
            />
            <path
              className="st3"
              d="M99.7,185.3v-2.5c0-0.5-0.3-0.7-0.7-0.7c-0.4,0-0.7,0.2-0.8,0.4v2.8h-1.4V181h1.4v0.5
				c0.3-0.3,0.8-0.6,1.5-0.6c1,0,1.4,0.6,1.4,1.4v3.1L99.7,185.3L99.7,185.3z"
            />
            <path
              className="st3"
              d="M105.1,185.3v-0.5c-0.4,0.4-0.8,0.6-1.3,0.6c-1.1,0-1.9-0.8-1.9-2.3c0-1.4,0.8-2.3,1.9-2.3
				c0.5,0,0.9,0.2,1.3,0.6v-2.2h1.4v6L105.1,185.3L105.1,185.3z M105.1,183.8v-1.3c-0.2-0.2-0.5-0.4-0.8-0.4c-0.5,0-1,0.4-1,1.1
				s0.4,1.1,1,1.1C104.6,184.2,105,184,105.1,183.8z"
            />
            <path
              className="st3"
              d="M62.9,192.1c0-1.2,0.9-2.3,2.4-2.3s2.4,1.1,2.4,2.3s-0.9,2.3-2.4,2.3C63.8,194.4,62.9,193.4,62.9,192.1z
				 M66.2,192.1c0-0.6-0.3-1.1-1-1.1c-0.6,0-0.9,0.5-0.9,1.1s0.3,1.1,0.9,1.1C65.9,193.2,66.2,192.7,66.2,192.1z"
            />
            <path
              className="st3"
              d="M72.3,194.3l-0.8-2.7l-0.8,2.7h-1.5l-1.3-4.3h1.4l0.7,2.7l0.9-2.7h1.2l0.9,2.7l0.7-2.7H75l-1.3,4.3H72.3z"
            />
            <path
              className="st3"
              d="M78.6,194.3v-2.5c0-0.5-0.3-0.7-0.7-0.7c-0.4,0-0.7,0.2-0.8,0.4v2.8h-1.4V190H77v0.5
				c0.3-0.3,0.8-0.6,1.5-0.6c1,0,1.4,0.6,1.4,1.4v3.1L78.6,194.3L78.6,194.3z"
            />
            <path
              className="st3"
              d="M80.8,192.1c0-1.3,0.9-2.3,2.3-2.3c1.3,0,2.2,0.9,2.2,2.4v0.3h-3.1c0.1,0.4,0.5,0.7,1.1,0.7
				c0.3,0,0.8-0.1,1.1-0.4l0.6,0.9c-0.4,0.4-1.2,0.6-1.8,0.6C81.8,194.4,80.8,193.5,80.8,192.1z M83.1,191c-0.6,0-0.8,0.4-0.9,0.7
				H84C83.9,191.3,83.7,191,83.1,191z"
            />
            <path
              className="st3"
              d="M86.3,194.3V190h1.4v0.5c0.3-0.4,0.8-0.6,1.4-0.6v1.3c-0.1,0-0.2,0-0.3,0c-0.4,0-0.8,0.2-1,0.4v2.8
				L86.3,194.3L86.3,194.3z"
            />
            <path
              className="st3"
              d="M89.2,193.7l0.6-1c0.3,0.3,1,0.6,1.5,0.6c0.4,0,0.6-0.1,0.6-0.3c0-0.5-2.5,0-2.5-1.7c0-0.8,0.7-1.4,1.9-1.4
				c0.7,0,1.4,0.2,1.8,0.6l-0.5,1c-0.3-0.3-0.8-0.5-1.3-0.5c-0.3,0-0.5,0.1-0.5,0.3c0,0.5,2.5,0,2.5,1.8c0,0.8-0.7,1.4-2,1.4
				C90.4,194.4,89.6,194.2,89.2,193.7z"
            />
            <path
              className="st3"
              d="M96.9,194.3v-2.5c0-0.5-0.3-0.7-0.7-0.7c-0.4,0-0.7,0.2-0.8,0.4v2.8H94v-6h1.4v2.2c0.3-0.3,0.8-0.6,1.5-0.6
				c1,0,1.4,0.6,1.4,1.4v3.1L96.9,194.3L96.9,194.3z"
            />
            <path
              className="st3"
              d="M99.3,188.8c0-0.4,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8c0,0.4-0.4,0.8-0.8,0.8S99.3,189.2,99.3,188.8z
				 M99.4,194.3V190h1.4v4.3H99.4z"
            />
            <path
              className="st3"
              d="M103.5,193.8v2.2h-1.4v-6h1.4v0.5c0.3-0.4,0.8-0.6,1.3-0.6c1.1,0,1.9,0.8,1.9,2.3s-0.8,2.3-1.9,2.3
				C104.3,194.4,103.8,194.2,103.5,193.8z M105.2,192.1c0-0.6-0.4-1.1-1-1.1c-0.3,0-0.7,0.2-0.8,0.4v1.3c0.2,0.2,0.5,0.4,0.8,0.4
				C104.8,193.2,105.2,192.8,105.2,192.1z"
            />
          </motion.g>
        </g>
        <g>
          <motion.g
            filter={isExpandedDefault ? "url(#glow)" : undefined}
            animate={{
              opacity: isExpandedDefault ? 1 : 0,
              y: isExpandedDefault ? 0 : 10,
            }}
            transition={{
              delay: 0.2 * 0.7,
            }}
          >
            <path
              className="st3"
              d="M127.3,113.4c0-1.9,1.4-3.1,3.2-3.1c1.4,0,2.2,0.8,2.6,1.6l-1.3,0.6c-0.2-0.5-0.7-0.9-1.3-0.9
				c-1,0-1.7,0.7-1.7,1.7s0.7,1.7,1.7,1.7c0.6,0,1.1-0.4,1.3-0.9l1.3,0.6c-0.4,0.8-1.2,1.6-2.6,1.6
				C128.7,116.5,127.3,115.3,127.3,113.4z"
            />
            <path
              className="st3"
              d="M136.7,116.4v-0.5c-0.3,0.3-0.8,0.6-1.5,0.6c-1,0-1.4-0.6-1.4-1.4V112h1.4v2.5c0,0.5,0.3,0.7,0.7,0.7
				s0.7-0.2,0.8-0.4V112h1.4v4.3h-1.4V116.4z"
            />
            <path className="st3" d="M139.2,116.4v-6h1.4v6H139.2z" />
            <path
              className="st3"
              d="M142.2,115.2v-2h-0.7V112h0.7v-1.2h1.4v1.2h0.9v1.2h-0.9v1.6c0,0.3,0.1,0.4,0.4,0.4c0.2,0,0.3-0.1,0.4-0.1
				l0.3,1c-0.2,0.2-0.5,0.3-1,0.3C142.7,116.5,142.2,116.1,142.2,115.2z"
            />
            <path
              className="st3"
              d="M148.1,116.4v-0.5c-0.3,0.3-0.8,0.6-1.5,0.6c-1,0-1.4-0.6-1.4-1.4V112h1.4v2.5c0,0.5,0.3,0.7,0.7,0.7
				s0.7-0.2,0.8-0.4V112h1.4v4.3h-1.4V116.4z"
            />
            <path
              className="st3"
              d="M150.6,116.4v-4.3h1.4v0.5c0.3-0.4,0.8-0.6,1.4-0.6v1.3c-0.1,0-0.2,0-0.3,0c-0.4,0-0.8,0.2-1,0.4v2.8h-1.5
				V116.4z"
            />
            <path
              className="st3"
              d="M153.5,114.2c0-1.3,0.9-2.3,2.3-2.3c1.3,0,2.2,0.9,2.2,2.4v0.3h-3c0.1,0.4,0.5,0.7,1.1,0.7
				c0.3,0,0.8-0.1,1.1-0.4l0.6,0.9c-0.4,0.4-1.2,0.6-1.8,0.6C154.6,116.5,153.5,115.7,153.5,114.2z M155.8,113.1
				c-0.6,0-0.8,0.4-0.9,0.7h1.8C156.7,113.4,156.5,113.1,155.8,113.1z"
            />
          </motion.g>
        </g>
        <g>
          <motion.g
            filter={isExpandedDefault ? "url(#glow)" : undefined}
            animate={{
              opacity: isExpandedDefault ? 1 : 0,
              y: isExpandedDefault ? 0 : 10,
            }}
            transition={{
              delay: 0.1 * 0.7,
            }}
          >
            <path
              className="st3"
              d="M188.7,95.8v-6h2.5c1.9,0,3.2,1.1,3.2,3s-1.4,3-3.2,3H188.7z M192.9,92.8c0-0.9-0.6-1.6-1.7-1.6h-1v3.3h1
				C192.3,94.4,192.9,93.7,192.9,92.8z"
            />
            <path
              className="st3"
              d="M195,90.2c0-0.4,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8s-0.4,0.8-0.8,0.8S195,90.7,195,90.2z M195,95.8v-4.3h1.4
				v4.3H195z"
            />
            <path
              className="st3"
              d="M197.6,96.9l0.6-1c0.3,0.4,0.8,0.5,1.3,0.5s1.1-0.2,1.1-1v-0.3c-0.4,0.4-0.8,0.6-1.3,0.6
				c-1.1,0-1.9-0.7-1.9-2.2c0-1.4,0.8-2.2,1.9-2.2c0.5,0,0.9,0.2,1.3,0.6v-0.5h1.4v4c0,1.8-1.4,2.1-2.5,2.1
				C198.8,97.6,198.2,97.4,197.6,96.9z M200.7,94.1v-1.2c-0.2-0.2-0.5-0.4-0.8-0.4c-0.5,0-1,0.3-1,1c0,0.6,0.4,1,1,1
				C200.1,94.5,200.5,94.3,200.7,94.1z"
            />
            <path
              className="st3"
              d="M202.9,90.2c0-0.4,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8s-0.4,0.8-0.8,0.8S202.9,90.7,202.9,90.2z M203,95.8v-4.3
				h1.4v4.3H203z"
            />
            <path
              className="st3"
              d="M206,94.6v-2h-0.7v-1.2h0.7v-1.2h1.4v1.2h0.9v1.2h-0.9v1.6c0,0.3,0.1,0.4,0.4,0.4c0.2,0,0.3-0.1,0.4-0.1
				l0.3,1c-0.2,0.2-0.5,0.3-1,0.3C206.5,95.9,206,95.5,206,94.6z"
            />
            <path
              className="st3"
              d="M211.5,95.8v-0.4c-0.3,0.3-0.8,0.5-1.4,0.5c-0.7,0-1.5-0.5-1.5-1.4c0-1.1,0.8-1.4,1.5-1.4
				c0.6,0,1.1,0.2,1.4,0.5v-0.4c0-0.4-0.3-0.6-0.9-0.6c-0.4,0-0.9,0.2-1.2,0.5l-0.5-1c0.6-0.5,1.3-0.7,2-0.7c1,0,2,0.4,2,1.7v2.7
				C212.9,95.8,211.5,95.8,211.5,95.8z M211.5,94.7v-0.4c-0.1-0.2-0.5-0.3-0.8-0.3c-0.4,0-0.7,0.2-0.7,0.5s0.3,0.5,0.7,0.5
				C211.1,95,211.4,94.9,211.5,94.7z"
            />
            <path className="st3" d="M213.8,95.8v-6h1.4v6H213.8z" />
            <path className="st3" d="M174.9,104.8v-6h1.4v6H174.9z" />
            <path
              className="st3"
              d="M177.5,99.2c0-0.4,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8s-0.4,0.8-0.8,0.8S177.5,99.7,177.5,99.2z M177.6,104.8
				v-4.3h1.4v4.3H177.6z"
            />
            <path
              className="st3"
              d="M180.6,103.6v-2h-0.7v-1.2h0.7v-1.2h1.4v1.2h0.9v1.2H182v1.6c0,0.3,0.1,0.4,0.4,0.4c0.2,0,0.3-0.1,0.4-0.1
				l0.3,1c-0.2,0.2-0.5,0.3-1,0.3C181.1,104.9,180.6,104.5,180.6,103.6z"
            />
            <path
              className="st3"
              d="M183.2,102.6c0-1.3,0.9-2.3,2.3-2.3c1.3,0,2.2,0.9,2.2,2.4v0.3h-3.1c0.1,0.4,0.5,0.7,1.1,0.7
				c0.3,0,0.8-0.1,1.1-0.4l0.6,0.9c-0.4,0.4-1.2,0.6-1.8,0.6C184.3,104.9,183.2,104,183.2,102.6z M185.6,101.4
				c-0.6,0-0.8,0.4-0.9,0.7h1.8C186.4,101.8,186.2,101.4,185.6,101.4z"
            />
            <path
              className="st3"
              d="M188.8,104.8v-4.3h1.4v0.5c0.3-0.4,0.8-0.6,1.4-0.6v1.3c-0.1,0-0.2,0-0.3,0c-0.4,0-0.8,0.2-1,0.4v2.8h-1.5
				V104.8z"
            />
            <path
              className="st3"
              d="M194.6,104.8v-0.4c-0.3,0.3-0.8,0.5-1.4,0.5c-0.7,0-1.5-0.5-1.5-1.4c0-1.1,0.8-1.4,1.5-1.4
				c0.6,0,1.1,0.2,1.4,0.5v-0.4c0-0.4-0.3-0.6-0.9-0.6c-0.4,0-0.9,0.2-1.2,0.5l-0.5-1c0.6-0.5,1.3-0.7,2-0.7c1,0,2,0.4,2,1.7v2.7
				C196,104.8,194.6,104.8,194.6,104.8z M194.6,103.7v-0.4c-0.1-0.2-0.5-0.3-0.8-0.3c-0.4,0-0.7,0.2-0.7,0.5s0.3,0.5,0.7,0.5
				C194.1,104,194.4,103.9,194.6,103.7z"
            />
            <path
              className="st3"
              d="M196.6,102.6c0-1.4,1-2.3,2.4-2.3c0.9,0,1.5,0.4,1.8,0.8l-0.9,0.8c-0.2-0.3-0.4-0.4-0.8-0.4
				c-0.6,0-1,0.4-1,1.1s0.4,1.1,1,1.1c0.4,0,0.6-0.2,0.8-0.4l0.9,0.8c-0.3,0.4-0.8,0.8-1.8,0.8C197.6,104.9,196.6,104,196.6,102.6z"
            />
            <path
              className="st3"
              d="M201.3,105.2c0.1,0.1,0.2,0.1,0.3,0.1c0.3,0,0.5-0.1,0.6-0.2l0.1-0.2l-1.7-4.4h1.5l1,2.8l1-2.8h1.5l-2,5
				c-0.4,0.9-1,1.1-1.8,1.1c-0.1,0-0.5,0-0.6-0.1L201.3,105.2z"
            />
            <path
              className="st3"
              d="M207.7,104.2l0.6-1c0.3,0.3,1,0.6,1.5,0.6c0.4,0,0.6-0.1,0.6-0.3c0-0.5-2.5,0-2.5-1.7c0-0.8,0.7-1.4,1.9-1.4
				c0.7,0,1.3,0.2,1.8,0.6l-0.5,1c-0.3-0.3-0.8-0.5-1.3-0.5c-0.3,0-0.5,0.1-0.5,0.3c0,0.5,2.5,0,2.5,1.8c0,0.8-0.7,1.4-2,1.4
				C208.9,104.9,208.1,104.6,207.7,104.2z"
            />
            <path
              className="st3"
              d="M215.2,104.8l-1-1.5l-0.4,0.5v1h-1.4v-6h1.4v3.4l1.3-1.7h1.7l-1.6,2l1.7,2.4h-1.7V104.8z"
            />
            <path
              className="st3"
              d="M217.4,99.2c0-0.4,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8s-0.4,0.8-0.8,0.8S217.4,99.7,217.4,99.2z M217.5,104.8
				v-4.3h1.4v4.3H217.5z"
            />
            <path className="st3" d="M220.2,104.8v-6h1.4v6H220.2z" />
            <path className="st3" d="M222.9,104.8v-6h1.4v6H222.9z" />
            <path
              className="st3"
              d="M225.3,104.2l0.6-1c0.3,0.3,1,0.6,1.5,0.6c0.4,0,0.6-0.1,0.6-0.3c0-0.5-2.5,0-2.5-1.7c0-0.8,0.7-1.4,1.9-1.4
				c0.7,0,1.4,0.2,1.8,0.6l-0.5,1c-0.3-0.3-0.8-0.5-1.3-0.5c-0.3,0-0.5,0.1-0.5,0.3c0,0.5,2.5,0,2.5,1.8c0,0.8-0.7,1.4-2,1.4
				C226.5,104.9,225.7,104.6,225.3,104.2z"
            />
          </motion.g>
        </g>
      </g>
      <g id="Layer_19">
        <g>
          <motion.g
            filter={isExpandedDefault ? "url(#glow)" : undefined}
            animate={{
              opacity: isExpandedDefault ? 1 : 0,
              y: isExpandedDefault ? 0 : 10,
            }}
            transition={{
              delay: 0.6 * 0.7,
            }}
          >
            <path className="st4" d="M51.7,263.6v-6h1.5v6H51.7z" />
            <path
              className="st4"
              d="M59.9,263.6V261c0-0.3-0.2-0.6-0.6-0.6c-0.4,0-0.6,0.2-0.8,0.4v2.8h-1.4V261c0-0.3-0.2-0.6-0.6-0.6
				c-0.4,0-0.6,0.2-0.8,0.4v2.8h-1.4v-4.3h1.4v0.5c0.2-0.3,0.7-0.6,1.4-0.6c0.6,0,1.1,0.3,1.2,0.8c0.3-0.4,0.8-0.8,1.5-0.8
				c0.8,0,1.3,0.4,1.3,1.3v3.2L59.9,263.6L59.9,263.6z"
            />
            <path
              className="st4"
              d="M63.7,263.1v2.2h-1.4v-6h1.4v0.5c0.3-0.4,0.8-0.6,1.3-0.6c1.1,0,1.9,0.8,1.9,2.3s-0.8,2.3-1.9,2.3
				C64.5,263.7,64,263.5,63.7,263.1z M65.4,261.4c0-0.6-0.4-1.1-1-1.1c-0.3,0-0.7,0.2-0.8,0.4v1.3c0.2,0.2,0.5,0.4,0.8,0.4
				C65,262.4,65.4,262,65.4,261.4z"
            />
            <path
              className="st4"
              d="M70.2,263.6v-0.4c-0.3,0.3-0.8,0.5-1.4,0.5c-0.7,0-1.5-0.5-1.5-1.4c0-1.1,0.8-1.4,1.5-1.4
				c0.6,0,1.1,0.2,1.4,0.5V261c0-0.4-0.3-0.6-0.9-0.6c-0.4,0-0.9,0.2-1.2,0.5l-0.5-1c0.6-0.5,1.3-0.7,2-0.7c1,0,2,0.4,2,1.7v2.7
				L70.2,263.6L70.2,263.6z M70.2,262.4V262c-0.1-0.2-0.5-0.3-0.8-0.3c-0.4,0-0.7,0.2-0.7,0.5s0.3,0.5,0.7,0.5
				C69.7,262.8,70,262.7,70.2,262.4z"
            />
            <path
              className="st4"
              d="M72.2,261.4c0-1.4,1-2.3,2.4-2.3c0.9,0,1.5,0.4,1.8,0.8l-0.9,0.8c-0.2-0.3-0.4-0.4-0.8-0.4
				c-0.6,0-1,0.4-1,1.1s0.4,1.1,1,1.1c0.4,0,0.6-0.2,0.8-0.4l0.9,0.8c-0.3,0.4-0.8,0.8-1.8,0.8C73.2,263.7,72.2,262.7,72.2,261.4z"
            />
            <path
              className="st4"
              d="M77,262.4v-2h-0.7v-1.2H77V258h1.4v1.2h0.9v1.2h-0.9v1.6c0,0.3,0.1,0.4,0.4,0.4c0.2,0,0.3-0.1,0.4-0.1l0.3,1
				c-0.2,0.2-0.5,0.3-1,0.3C77.5,263.7,77,263.2,77,262.4z"
            />
            <path
              className="st4"
              d="M36.8,270.4c0-1.4,1-2.3,2.4-2.3c0.9,0,1.5,0.4,1.8,0.8l-0.9,0.8c-0.2-0.3-0.5-0.4-0.8-0.4
				c-0.6,0-1,0.4-1,1.1s0.4,1.1,1,1.1c0.4,0,0.6-0.2,0.8-0.4l0.9,0.8c-0.3,0.4-0.8,0.8-1.8,0.8C37.8,272.7,36.8,271.7,36.8,270.4z"
            />
            <path
              className="st4"
              d="M41.1,270.4c0-1.2,0.9-2.3,2.4-2.3s2.4,1.1,2.4,2.3s-0.9,2.3-2.4,2.3C42,272.7,41.1,271.6,41.1,270.4z
				 M44.4,270.4c0-0.6-0.3-1.1-1-1.1c-0.6,0-0.9,0.5-0.9,1.1s0.3,1.1,0.9,1.1C44.1,271.4,44.4,271,44.4,270.4z"
            />
            <path
              className="st4"
              d="M52.1,272.6V270c0-0.3-0.2-0.6-0.6-0.6c-0.4,0-0.6,0.2-0.8,0.4v2.8h-1.4V270c0-0.3-0.2-0.6-0.6-0.6
				c-0.4,0-0.6,0.2-0.8,0.4v2.8h-1.4v-4.3H48v0.5c0.2-0.3,0.7-0.6,1.4-0.6c0.6,0,1.1,0.3,1.2,0.8c0.3-0.4,0.8-0.8,1.5-0.8
				c0.8,0,1.3,0.4,1.3,1.3v3.2L52.1,272.6L52.1,272.6z"
            />
            <path
              className="st4"
              d="M60,272.6V270c0-0.3-0.2-0.6-0.6-0.6c-0.4,0-0.6,0.2-0.8,0.4v2.8h-1.4V270c0-0.3-0.2-0.6-0.6-0.6
				c-0.4,0-0.6,0.2-0.8,0.4v2.8h-1.4v-4.3h1.4v0.5c0.2-0.3,0.7-0.6,1.4-0.6c0.6,0,1.1,0.3,1.2,0.8c0.3-0.4,0.8-0.8,1.5-0.8
				c0.8,0,1.3,0.4,1.3,1.3v3.2L60,272.6L60,272.6z"
            />
            <path
              className="st4"
              d="M62.3,267c0-0.4,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8s-0.4,0.8-0.8,0.8S62.3,267.5,62.3,267z M62.4,272.6v-4.3
				h1.4v4.3H62.4z"
            />
            <path
              className="st4"
              d="M65.4,271.4v-2h-0.7v-1.2h0.7V267h1.4v1.2h0.9v1.2h-0.9v1.6c0,0.3,0.1,0.4,0.4,0.4c0.2,0,0.3-0.1,0.4-0.1
				l0.3,1c-0.2,0.2-0.5,0.3-1,0.3C65.9,272.7,65.4,272.2,65.4,271.4z"
            />
            <path
              className="st4"
              d="M73.9,272.6V270c0-0.3-0.2-0.6-0.6-0.6s-0.6,0.2-0.8,0.4v2.8h-1.4V270c0-0.3-0.2-0.6-0.6-0.6
				s-0.6,0.2-0.8,0.4v2.8h-1.4v-4.3h1.4v0.5c0.2-0.3,0.7-0.6,1.4-0.6c0.6,0,1.1,0.3,1.2,0.8c0.3-0.4,0.8-0.8,1.5-0.8
				c0.8,0,1.3,0.4,1.3,1.3v3.2L73.9,272.6L73.9,272.6z"
            />
            <path
              className="st4"
              d="M76,270.4c0-1.3,0.9-2.3,2.3-2.3c1.3,0,2.2,0.9,2.2,2.4v0.3h-3.1c0.1,0.4,0.5,0.7,1.1,0.7
				c0.3,0,0.8-0.1,1.1-0.4l0.6,0.9c-0.4,0.4-1.2,0.6-1.8,0.6C77,272.7,76,271.8,76,270.4z M78.3,269.2c-0.6,0-0.8,0.4-0.9,0.7h1.8
				C79.2,269.6,78.9,269.2,78.3,269.2z"
            />
            <path
              className="st4"
              d="M84.5,272.6v-2.5c0-0.5-0.3-0.7-0.7-0.7c-0.4,0-0.7,0.2-0.8,0.4v2.8h-1.4v-4.3H83v0.5
				c0.3-0.3,0.8-0.6,1.5-0.6c1,0,1.4,0.6,1.4,1.4v3.1L84.5,272.6L84.5,272.6z"
            />
            <path
              className="st4"
              d="M87.3,271.4v-2h-0.7v-1.2h0.7V267h1.4v1.2h0.9v1.2h-0.9v1.6c0,0.3,0.1,0.4,0.4,0.4c0.2,0,0.3-0.1,0.4-0.1
				l0.3,1c-0.2,0.2-0.5,0.3-1,0.3C87.7,272.7,87.3,272.2,87.3,271.4z"
            />
            <path
              className="st4"
              d="M89.8,272l0.6-1c0.3,0.3,1,0.6,1.5,0.6c0.4,0,0.6-0.1,0.6-0.3c0-0.5-2.5,0-2.5-1.7c0-0.8,0.7-1.4,1.9-1.4
				c0.7,0,1.3,0.2,1.8,0.6l-0.5,1c-0.3-0.3-0.8-0.5-1.3-0.5c-0.3,0-0.5,0.1-0.5,0.3c0,0.5,2.5,0,2.5,1.8c0,0.8-0.7,1.4-2,1.4
				C91.1,272.7,90.3,272.4,89.8,272z"
            />
          </motion.g>
        </g>
        <g>
          <motion.g
            filter={isExpandedDefault ? "url(#glow)" : undefined}
            animate={{
              opacity: isExpandedDefault ? 1 : 0,
              y: isExpandedDefault ? 0 : 10,
            }}
            transition={{
              delay: 0.5 * 0.7,
            }}
          >
            <path
              className="st4"
              d="M54.8,223.6l0.8-1.2c0.4,0.4,1.1,0.8,1.9,0.8c0.5,0,0.8-0.2,0.8-0.5c0-0.8-3.4-0.1-3.4-2.4
				c0-1,0.8-1.9,2.4-1.9c1,0,1.8,0.3,2.4,0.8l-0.8,1.2c-0.5-0.4-1.2-0.6-1.8-0.6c-0.4,0-0.6,0.2-0.6,0.4c0,0.7,3.4,0.2,3.4,2.4
				c0,1.2-0.9,2-2.5,2C56.2,224.5,55.4,224.2,54.8,223.6z"
            />
            <path
              className="st4"
              d="M61,223.3v-2h-0.7v-1.2H61v-1.2h1.4v1.2h0.9v1.2h-0.9v1.6c0,0.3,0.1,0.4,0.4,0.4c0.2,0,0.3-0.1,0.4-0.1
				l0.3,1c-0.2,0.2-0.5,0.3-1,0.3C61.5,224.5,61,224.1,61,223.3z"
            />
            <path
              className="st4"
              d="M66.5,224.4V224c-0.3,0.3-0.8,0.5-1.4,0.5c-0.7,0-1.5-0.5-1.5-1.4c0-1.1,0.8-1.4,1.5-1.4
				c0.6,0,1.1,0.2,1.4,0.5v-0.4c0-0.4-0.3-0.6-0.9-0.6c-0.4,0-0.9,0.2-1.2,0.5l-0.5-1c0.6-0.5,1.3-0.7,2-0.7c1,0,2,0.4,2,1.7v2.7
				L66.5,224.4L66.5,224.4z M66.5,223.3v-0.4c-0.1-0.2-0.5-0.3-0.8-0.3c-0.4,0-0.7,0.2-0.7,0.5s0.3,0.5,0.7,0.5
				C66,223.6,66.3,223.5,66.5,223.3z"
            />
            <path
              className="st4"
              d="M68.8,224.4v-4.3h1.4v0.5c0.3-0.4,0.8-0.6,1.4-0.6v1.3c-0.1,0-0.2,0-0.3,0c-0.4,0-0.8,0.2-1,0.4v2.8
				L68.8,224.4L68.8,224.4z"
            />
            <path
              className="st4"
              d="M72.3,223.3v-2h-0.7v-1.2h0.7v-1.2h1.4v1.2h0.9v1.2h-0.9v1.6c0,0.3,0.1,0.4,0.4,0.4c0.2,0,0.3-0.1,0.4-0.1
				l0.3,1c-0.2,0.2-0.5,0.3-1,0.3C72.8,224.5,72.3,224.1,72.3,223.3z"
            />
            <path
              className="st4"
              d="M78.2,224.4v-0.5c-0.3,0.3-0.8,0.6-1.5,0.6c-1,0-1.4-0.6-1.4-1.4V220h1.4v2.5c0,0.5,0.3,0.7,0.7,0.7
				c0.4,0,0.7-0.2,0.8-0.4V220h1.4v4.3L78.2,224.4L78.2,224.4z"
            />
            <path
              className="st4"
              d="M82,223.9v2.2h-1.4v-6H82v0.5c0.3-0.4,0.8-0.6,1.3-0.6c1.1,0,1.9,0.8,1.9,2.3s-0.8,2.3-1.9,2.3
				C82.8,224.5,82.4,224.4,82,223.9z M83.8,222.3c0-0.6-0.4-1.1-1-1.1c-0.3,0-0.7,0.2-0.8,0.4v1.3c0.2,0.2,0.5,0.4,0.8,0.4
				C83.4,223.3,83.8,222.9,83.8,222.3z"
            />
            <path
              className="st4"
              d="M44.7,231.3c0-1.3,0.9-2.3,2.3-2.3c1.3,0,2.2,0.9,2.2,2.4v0.3h-3.1c0.1,0.4,0.5,0.7,1.1,0.7
				c0.3,0,0.8-0.1,1.1-0.4l0.6,0.9c-0.4,0.4-1.2,0.6-1.8,0.6C45.8,233.5,44.7,232.7,44.7,231.3z M47,230.1c-0.6,0-0.8,0.4-0.9,0.7
				h1.8C47.9,230.5,47.7,230.1,47,230.1z"
            />
            <path
              className="st4"
              d="M52.9,233.4v-2.5c0-0.5-0.3-0.7-0.7-0.7s-0.7,0.2-0.8,0.4v2.8H50v-4.3h1.4v0.5c0.3-0.3,0.8-0.6,1.5-0.6
				c1,0,1.4,0.6,1.4,1.4v3.1L52.9,233.4L52.9,233.4z"
            />
            <path
              className="st4"
              d="M56.5,233.4l-1.7-4.3h1.5l1,2.8l1-2.8h1.5l-1.7,4.3H56.5z"
            />
            <path
              className="st4"
              d="M60.1,227.9c0-0.4,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8c0,0.4-0.4,0.8-0.8,0.8S60.1,228.3,60.1,227.9z
				 M60.2,233.4v-4.3h1.4v4.3H60.2z"
            />
            <path
              className="st4"
              d="M62.9,233.4v-4.3h1.4v0.5c0.3-0.4,0.8-0.6,1.4-0.6v1.3c-0.1,0-0.2,0-0.3,0c-0.4,0-0.8,0.2-1,0.4v2.8
				L62.9,233.4L62.9,233.4z"
            />
            <path
              className="st4"
              d="M65.9,231.3c0-1.2,0.9-2.3,2.4-2.3s2.4,1.1,2.4,2.3s-0.9,2.3-2.4,2.3C66.8,233.5,65.9,232.5,65.9,231.3z
				 M69.2,231.3c0-0.6-0.3-1.1-1-1.1c-0.6,0-0.9,0.5-0.9,1.1s0.3,1.1,0.9,1.1C68.9,232.3,69.2,231.8,69.2,231.3z"
            />
            <path
              className="st4"
              d="M74.3,233.4v-2.5c0-0.5-0.3-0.7-0.7-0.7c-0.4,0-0.7,0.2-0.8,0.4v2.8h-1.4v-4.3h1.4v0.5
				c0.3-0.3,0.8-0.6,1.5-0.6c1,0,1.4,0.6,1.4,1.4v3.1L74.3,233.4L74.3,233.4z"
            />
            <path
              className="st4"
              d="M82.2,233.4v-2.6c0-0.3-0.2-0.6-0.6-0.6s-0.6,0.2-0.8,0.4v2.8h-1.4v-2.6c0-0.3-0.2-0.6-0.6-0.6
				s-0.6,0.2-0.8,0.4v2.8h-1.4v-4.3H78v0.5c0.2-0.3,0.7-0.6,1.4-0.6c0.6,0,1.1,0.3,1.2,0.8c0.3-0.4,0.8-0.8,1.5-0.8
				c0.8,0,1.3,0.4,1.3,1.3v3.2L82.2,233.4L82.2,233.4z"
            />
            <path
              className="st4"
              d="M84.3,231.3c0-1.3,0.9-2.3,2.3-2.3c1.3,0,2.2,0.9,2.2,2.4v0.3h-3.1c0.1,0.4,0.5,0.7,1.1,0.7
				c0.3,0,0.8-0.1,1.1-0.4l0.6,0.9c-0.4,0.4-1.2,0.6-1.8,0.6C85.4,233.5,84.3,232.7,84.3,231.3z M86.7,230.1c-0.6,0-0.8,0.4-0.9,0.7
				h1.8C87.5,230.5,87.3,230.1,86.7,230.1z"
            />
            <path
              className="st4"
              d="M92.8,233.4v-2.5c0-0.5-0.3-0.7-0.7-0.7c-0.4,0-0.7,0.2-0.8,0.4v2.8h-1.4v-4.3h1.4v0.5
				c0.3-0.3,0.8-0.6,1.5-0.6c1,0,1.4,0.6,1.4,1.4v3.1L92.8,233.4L92.8,233.4z"
            />
            <path
              className="st4"
              d="M95.5,232.3v-2h-0.7v-1.2h0.7v-1.2h1.4v1.2h0.9v1.2h-0.9v1.6c0,0.3,0.1,0.4,0.4,0.4c0.2,0,0.3-0.1,0.4-0.1
				l0.3,1c-0.2,0.2-0.5,0.3-1,0.3C96,233.5,95.5,233.1,95.5,232.3z"
            />
          </motion.g>
        </g>
        <g>
          <motion.g
            filter={isExpandedDefault ? "url(#glow)" : undefined}
            animate={{
              opacity: isExpandedDefault ? 1 : 0,
              y: isExpandedDefault ? 0 : 10,
            }}
            transition={{
              delay: 0.7 * 0.7,
            }}
          >
            <path
              className="st4"
              d="M53.1,302.7v-6h4.4v1.4h-2.9v0.9h2.8v1.3h-2.8v2.4L53.1,302.7L53.1,302.7z"
            />
            <path
              className="st4"
              d="M58.2,297.2c0-0.4,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8S59.4,298,59,298S58.2,297.6,58.2,297.2z M58.3,302.7
				v-4.3h1.4v4.3H58.3z"
            />
            <path
              className="st4"
              d="M64,302.7v-2.5c0-0.5-0.3-0.7-0.7-0.7s-0.7,0.2-0.8,0.4v2.8H61v-4.3h1.4v0.5c0.3-0.3,0.8-0.6,1.5-0.6
				c1,0,1.4,0.6,1.4,1.4v3.1L64,302.7L64,302.7z"
            />
            <path
              className="st4"
              d="M69,302.7v-0.4c-0.3,0.3-0.8,0.5-1.4,0.5c-0.7,0-1.5-0.5-1.5-1.4c0-1.1,0.8-1.4,1.5-1.4
				c0.6,0,1.1,0.2,1.4,0.5V300c0-0.4-0.3-0.6-0.9-0.6c-0.4,0-0.9,0.2-1.2,0.5l-0.5-1c0.6-0.5,1.3-0.7,2-0.7c1,0,2,0.4,2,1.7v2.7H69
				V302.7z M69,301.6v-0.4c-0.1-0.2-0.5-0.3-0.8-0.3c-0.4,0-0.7,0.2-0.7,0.5s0.3,0.5,0.7,0.5C68.5,301.9,68.8,301.8,69,301.6z"
            />
            <path
              className="st4"
              d="M74.2,302.7v-2.5c0-0.5-0.3-0.7-0.7-0.7c-0.4,0-0.7,0.2-0.8,0.4v2.8h-1.4v-4.3h1.4v0.5
				c0.3-0.3,0.8-0.6,1.5-0.6c1,0,1.4,0.6,1.4,1.4v3.1L74.2,302.7L74.2,302.7z"
            />
            <path
              className="st4"
              d="M76.4,300.5c0-1.4,1-2.3,2.4-2.3c0.9,0,1.5,0.4,1.8,0.8l-0.9,0.8c-0.2-0.3-0.5-0.4-0.8-0.4
				c-0.6,0-1,0.4-1,1.1s0.4,1.1,1,1.1c0.4,0,0.6-0.2,0.8-0.4l0.9,0.8c-0.3,0.4-0.8,0.8-1.8,0.8C77.4,302.8,76.4,301.9,76.4,300.5z"
            />
            <path
              className="st4"
              d="M80.9,297.2c0-0.4,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8s-0.4,0.8-0.8,0.8S80.9,297.6,80.9,297.2z M81,302.7v-4.3
				h1.4v4.3H81z"
            />
            <path
              className="st4"
              d="M86.6,302.7v-2.5c0-0.5-0.3-0.7-0.7-0.7c-0.4,0-0.7,0.2-0.8,0.4v2.8h-1.4v-4.3H85v0.5
				c0.3-0.3,0.8-0.6,1.5-0.6c1,0,1.4,0.6,1.4,1.4v3.1L86.6,302.7L86.6,302.7z"
            />
            <path
              className="st4"
              d="M88.9,303.8l0.6-1c0.3,0.4,0.8,0.5,1.3,0.5s1.1-0.2,1.1-1V302c-0.4,0.4-0.8,0.6-1.3,0.6
				c-1.1,0-1.9-0.7-1.9-2.2c0-1.4,0.8-2.2,1.9-2.2c0.5,0,0.9,0.2,1.3,0.6v-0.5h1.4v4c0,1.8-1.4,2.1-2.5,2.1
				C90.1,304.5,89.5,304.3,88.9,303.8z M92,301v-1.2c-0.2-0.2-0.5-0.4-0.8-0.4c-0.5,0-1,0.3-1,1c0,0.6,0.4,1,1,1
				C91.4,301.4,91.8,301.2,92,301z"
            />
            <path
              className="st4"
              d="M51.9,306.2c0-0.4,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8s-0.4,0.8-0.8,0.8S51.9,306.6,51.9,306.2z M52,311.7v-4.3
				h1.4v4.3H52z"
            />
            <path
              className="st4"
              d="M57.7,311.7v-2.5c0-0.5-0.3-0.7-0.7-0.7s-0.7,0.2-0.8,0.4v2.8h-1.4v-4.3h1.4v0.5c0.3-0.3,0.8-0.6,1.5-0.6
				c1,0,1.4,0.6,1.4,1.4v3.1L57.7,311.7L57.7,311.7z"
            />
            <path
              className="st4"
              d="M59.8,309.5c0-1.4,1-2.3,2.4-2.3c0.9,0,1.5,0.4,1.8,0.8l-0.9,0.8c-0.2-0.3-0.5-0.4-0.8-0.4
				c-0.6,0-1,0.4-1,1.1s0.4,1.1,1,1.1c0.4,0,0.6-0.2,0.8-0.4L64,311c-0.3,0.4-0.8,0.8-1.8,0.8C60.9,311.8,59.8,310.9,59.8,309.5z"
            />
            <path
              className="st4"
              d="M64.1,309.5c0-1.3,0.9-2.3,2.3-2.3c1.3,0,2.2,0.9,2.2,2.4v0.3h-3.1c0.1,0.4,0.5,0.7,1.1,0.7
				c0.3,0,0.8-0.1,1.1-0.4l0.6,0.9c-0.4,0.4-1.2,0.6-1.8,0.6C65.2,311.8,64.1,310.9,64.1,309.5z M66.4,308.4c-0.6,0-0.8,0.4-0.9,0.7
				h1.8C67.3,308.7,67.1,308.4,66.4,308.4z"
            />
            <path
              className="st4"
              d="M72.6,311.7v-2.5c0-0.5-0.3-0.7-0.7-0.7c-0.4,0-0.7,0.2-0.8,0.4v2.8h-1.4v-4.3H71v0.5
				c0.3-0.3,0.8-0.6,1.5-0.6c1,0,1.4,0.6,1.4,1.4v3.1L72.6,311.7L72.6,311.7z"
            />
            <path
              className="st4"
              d="M75.3,310.5v-2h-0.7v-1.2h0.7v-1.2h1.4v1.2h0.9v1.2h-0.9v1.6c0,0.3,0.1,0.4,0.4,0.4c0.2,0,0.3-0.1,0.4-0.1
				l0.3,1c-0.2,0.2-0.5,0.3-1,0.3C75.8,311.8,75.3,311.4,75.3,310.5z"
            />
            <path
              className="st4"
              d="M78.2,306.2c0-0.4,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8S79.4,307,79,307S78.2,306.6,78.2,306.2z M78.3,311.7
				v-4.3h1.4v4.3H78.3z"
            />
            <path
              className="st4"
              d="M82.1,311.7l-1.7-4.3h1.5l1,2.8l1-2.8h1.5l-1.7,4.3H82.1z"
            />
            <path
              className="st4"
              d="M85.5,309.5c0-1.3,0.9-2.3,2.3-2.3c1.3,0,2.2,0.9,2.2,2.4v0.3h-3.1c0.1,0.4,0.5,0.7,1.1,0.7
				c0.3,0,0.8-0.1,1.1-0.4l0.6,0.9c-0.4,0.4-1.2,0.6-1.8,0.6C86.5,311.8,85.5,310.9,85.5,309.5z M87.8,308.4c-0.6,0-0.8,0.4-0.9,0.7
				h1.8C88.7,308.7,88.5,308.4,87.8,308.4z"
            />
            <path
              className="st4"
              d="M90.6,311.1l0.6-1c0.3,0.3,1,0.6,1.5,0.6c0.4,0,0.6-0.1,0.6-0.3c0-0.5-2.5,0-2.5-1.7c0-0.8,0.7-1.4,1.9-1.4
				c0.7,0,1.4,0.2,1.8,0.6l-0.5,1c-0.3-0.3-0.8-0.5-1.3-0.5c-0.3,0-0.5,0.1-0.5,0.3c0,0.5,2.5,0,2.5,1.8c0,0.8-0.7,1.4-2,1.4
				C91.9,311.8,91.1,311.5,90.6,311.1z"
            />
          </motion.g>
        </g>
        <g>
          <motion.g
            filter={isExpandedDefault ? "url(#glow)" : undefined}
            animate={{
              opacity: isExpandedDefault ? 1 : 0,
              y: isExpandedDefault ? 0 : 10,
            }}
            transition={{
              delay: 0.8 * 0.7,
            }}
          >
            <g>
              <path
                className="st4"
                d="M82.7,343.5v-4.7H81v-1.4h4.9v1.4h-1.7v4.7H82.7z"
              />
              <path
                className="st4"
                d="M86.2,341.3c0-1.3,0.9-2.3,2.3-2.3c1.3,0,2.2,0.9,2.2,2.4v0.3h-3.1c0.1,0.4,0.5,0.7,1.1,0.7
					c0.3,0,0.8-0.1,1.1-0.4l0.6,0.9c-0.4,0.4-1.2,0.6-1.8,0.6C87.2,343.6,86.2,342.7,86.2,341.3z M88.5,340.1
					c-0.6,0-0.8,0.4-0.9,0.7h1.8C89.3,340.5,89.1,340.1,88.5,340.1z"
              />
              <path
                className="st4"
                d="M91.4,341.3c0-1.4,1-2.3,2.4-2.3c0.9,0,1.5,0.4,1.8,0.8l-0.9,0.8c-0.2-0.3-0.4-0.4-0.8-0.4
					c-0.6,0-1,0.4-1,1.1s0.4,1.1,1,1.1c0.4,0,0.6-0.2,0.8-0.4l0.9,0.8c-0.3,0.4-0.8,0.8-1.8,0.8C92.4,343.6,91.4,342.7,91.4,341.3z"
              />
              <path
                className="st4"
                d="M98.9,343.5V341c0-0.5-0.3-0.7-0.7-0.7c-0.4,0-0.7,0.2-0.8,0.4v2.8H96v-6h1.4v2.2c0.3-0.3,0.8-0.6,1.5-0.6
					c1,0,1.4,0.6,1.4,1.4v3.1L98.9,343.5L98.9,343.5z"
              />
              <path
                className="st4"
                d="M104.3,343.5V341c0-0.5-0.3-0.7-0.7-0.7c-0.4,0-0.7,0.2-0.8,0.4v2.8h-1.4v-4.3h1.4v0.5
					c0.3-0.3,0.8-0.6,1.5-0.6c1,0,1.4,0.6,1.4,1.4v3.1L104.3,343.5L104.3,343.5z"
              />
              <path
                className="st4"
                d="M106.5,341.3c0-1.2,0.9-2.3,2.4-2.3s2.4,1.1,2.4,2.3s-0.9,2.3-2.4,2.3C107.4,343.6,106.5,342.5,106.5,341.3
					z M109.8,341.3c0-0.6-0.3-1.1-1-1.1c-0.6,0-0.9,0.5-0.9,1.1s0.3,1.1,0.9,1.1C109.5,342.4,109.8,341.9,109.8,341.3z"
              />
              <path className="st4" d="M112,343.5v-6h1.4v6H112z" />
              <path
                className="st4"
                d="M114.5,341.3c0-1.2,0.9-2.3,2.4-2.3s2.4,1.1,2.4,2.3s-0.9,2.3-2.4,2.3C115.3,343.6,114.5,342.5,114.5,341.3
					z M117.8,341.3c0-0.6-0.3-1.1-1-1.1c-0.6,0-0.9,0.5-0.9,1.1s0.3,1.1,0.9,1.1S117.8,341.9,117.8,341.3z"
              />
              <path
                className="st4"
                d="M119.8,344.6l0.6-1c0.3,0.4,0.8,0.5,1.3,0.5s1.1-0.2,1.1-1v-0.3c-0.4,0.4-0.8,0.6-1.3,0.6
					c-1.1,0-1.9-0.7-1.9-2.2c0-1.4,0.8-2.2,1.9-2.2c0.5,0,0.9,0.2,1.3,0.6v-0.5h1.4v4c0,1.8-1.4,2.1-2.5,2.1
					C121,345.2,120.4,345.1,119.8,344.6z M122.9,341.8v-1.2c-0.2-0.2-0.5-0.4-0.8-0.4c-0.5,0-1,0.3-1,1c0,0.6,0.4,1,1,1
					C122.3,342.2,122.7,342,122.9,341.8z"
              />
              <path
                className="st4"
                d="M125.4,343.9c0.1,0.1,0.2,0.1,0.3,0.1c0.3,0,0.5-0.1,0.6-0.2l0.1-0.2l-1.7-4.4h1.5l1,2.8l1-2.8h1.5l-2,5
					c-0.4,0.9-1,1.1-1.8,1.1c-0.1,0-0.5,0-0.6-0.1L125.4,343.9z"
              />
              <path
                className="st4"
                d="M89.6,352.5v-0.4c-0.3,0.3-0.8,0.5-1.4,0.5c-0.7,0-1.5-0.5-1.5-1.4c0-1.1,0.8-1.4,1.5-1.4
					c0.6,0,1.1,0.2,1.4,0.5v-0.4c0-0.4-0.3-0.6-0.9-0.6c-0.4,0-0.9,0.2-1.2,0.5l-0.5-1c0.6-0.5,1.3-0.7,2-0.7c1,0,2,0.4,2,1.7v2.7
					L89.6,352.5L89.6,352.5z M89.6,351.4V351c-0.1-0.2-0.5-0.3-0.8-0.3c-0.4,0-0.7,0.2-0.7,0.5s0.3,0.5,0.7,0.5
					C89.1,351.7,89.4,351.6,89.6,351.4z"
              />
              <path
                className="st4"
                d="M94.8,352.5V352c-0.4,0.4-0.8,0.6-1.3,0.6c-1.1,0-1.9-0.8-1.9-2.3c0-1.4,0.8-2.3,1.9-2.3
					c0.5,0,0.9,0.2,1.3,0.6v-2.2h1.4v6L94.8,352.5L94.8,352.5z M94.8,351v-1.3c-0.2-0.2-0.5-0.4-0.8-0.4c-0.5,0-1,0.4-1,1.1
					s0.4,1.1,1,1.1C94.2,351.4,94.6,351.2,94.8,351z"
              />
              <path
                className="st4"
                d="M96.9,350.3c0-1.2,0.9-2.3,2.4-2.3s2.4,1.1,2.4,2.3s-0.9,2.3-2.4,2.3C97.8,352.6,96.9,351.5,96.9,350.3z
					 M100.3,350.3c0-0.6-0.3-1.1-1-1.1c-0.6,0-0.9,0.5-0.9,1.1s0.3,1.1,0.9,1.1S100.3,350.9,100.3,350.3z"
              />
              <path
                className="st4"
                d="M103.8,352v2.2h-1.4v-6h1.4v0.5c0.3-0.4,0.8-0.6,1.3-0.6c1.1,0,1.9,0.8,1.9,2.3s-0.8,2.3-1.9,2.3
					C104.6,352.6,104.2,352.4,103.8,352z M105.6,350.3c0-0.6-0.4-1.1-1-1.1c-0.3,0-0.7,0.2-0.8,0.4v1.3c0.2,0.2,0.5,0.4,0.8,0.4
					C105.2,351.4,105.6,351,105.6,350.3z"
              />
              <path
                className="st4"
                d="M108.1,351.3v-2h-0.7v-1.2h0.7v-1.2h1.4v1.2h0.9v1.2h-0.9v1.6c0,0.3,0.1,0.4,0.4,0.4c0.2,0,0.3-0.1,0.4-0.1
					l0.3,1c-0.2,0.2-0.5,0.3-1,0.3C108.6,352.6,108.1,352.1,108.1,351.3z"
              />
              <path
                className="st4"
                d="M110.9,346.9c0-0.4,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8s-0.4,0.8-0.8,0.8S110.9,347.4,110.9,346.9z M111,352.5
					v-4.3h1.4v4.3H111z"
              />
              <path
                className="st4"
                d="M113.5,350.3c0-1.2,0.9-2.3,2.4-2.3s2.4,1.1,2.4,2.3s-0.9,2.3-2.4,2.3C114.3,352.6,113.5,351.5,113.5,350.3
					z M116.8,350.3c0-0.6-0.3-1.1-1-1.1c-0.6,0-0.9,0.5-0.9,1.1s0.3,1.1,0.9,1.1S116.8,350.9,116.8,350.3z"
              />
              <path
                className="st4"
                d="M121.9,352.5V350c0-0.5-0.3-0.7-0.7-0.7c-0.4,0-0.7,0.2-0.8,0.4v2.8H119v-4.3h1.4v0.5
					c0.3-0.3,0.8-0.6,1.5-0.6c1,0,1.4,0.6,1.4,1.4v3.1L121.9,352.5L121.9,352.5z"
              />
            </g>
          </motion.g>
        </g>
      </g>
      <g id="Layer_18">
        <g>
          <motion.g
            filter={isExpandedDefault ? "url(#glow)" : undefined}
            animate={{
              opacity: isExpandedDefault ? 1 : 0,
              y: isExpandedDefault ? 0 : 10,
            }}
            transition={{
              delay: 1.1 * 0.7,
            }}
          >
            <path
              className="st5"
              d="M214.9,428v-6h4.4v1.4h-2.9v0.9h2.8v1.3h-2.8v2.4L214.9,428L214.9,428z"
            />
            <path
              className="st5"
              d="M222.7,428v-0.4c-0.3,0.3-0.8,0.5-1.4,0.5c-0.7,0-1.5-0.5-1.5-1.4c0-1.1,0.8-1.4,1.5-1.4
				c0.6,0,1.1,0.2,1.4,0.5v-0.4c0-0.4-0.3-0.6-0.9-0.6c-0.4,0-0.9,0.2-1.2,0.5l-0.5-1c0.6-0.5,1.3-0.7,2-0.7c1,0,2,0.4,2,1.7v2.7
				L222.7,428L222.7,428z M222.7,426.9v-0.4c-0.1-0.2-0.5-0.3-0.8-0.3c-0.4,0-0.7,0.2-0.7,0.5s0.3,0.5,0.7,0.5
				C222.2,427.2,222.6,427.1,222.7,426.9z"
            />
            <path
              className="st5"
              d="M224.9,422.4c0-0.4,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8s-0.4,0.8-0.8,0.8S224.9,422.9,224.9,422.4z M225,428
				v-4.3h1.4v4.3H225z"
            />
            <path
              className="st5"
              d="M227.7,428v-4.3h1.4v0.5c0.3-0.4,0.8-0.6,1.4-0.6v1.3c-0.1,0-0.2,0-0.3,0c-0.4,0-0.8,0.2-1,0.4v2.8
				L227.7,428L227.7,428z"
            />
            <path
              className="st5"
              d="M239.1,428v-2.6c0-0.3-0.2-0.6-0.6-0.6c-0.4,0-0.6,0.2-0.8,0.4v2.8h-1.4v-2.6c0-0.3-0.2-0.6-0.6-0.6
				c-0.4,0-0.6,0.2-0.8,0.4v2.8h-1.4v-4.3h1.4v0.5c0.2-0.3,0.7-0.6,1.4-0.6c0.6,0,1.1,0.3,1.2,0.8c0.3-0.4,0.8-0.8,1.5-0.8
				c0.8,0,1.3,0.4,1.3,1.3v3.2L239.1,428L239.1,428z"
            />
            <path
              className="st5"
              d="M244,428v-0.4c-0.3,0.3-0.8,0.5-1.4,0.5c-0.7,0-1.5-0.5-1.5-1.4c0-1.1,0.8-1.4,1.5-1.4
				c0.6,0,1.1,0.2,1.4,0.5v-0.4c0-0.4-0.3-0.6-0.9-0.6c-0.4,0-0.9,0.2-1.2,0.5l-0.5-1c0.6-0.5,1.3-0.7,2-0.7c1,0,2,0.4,2,1.7v2.7
				L244,428L244,428z M244,426.9v-0.4c-0.1-0.2-0.5-0.3-0.8-0.3c-0.4,0-0.7,0.2-0.7,0.5s0.3,0.5,0.7,0.5
				C243.6,427.2,243.9,427.1,244,426.9z"
            />
            <path
              className="st5"
              d="M246.3,428v-4.3h1.4v0.5c0.3-0.4,0.8-0.6,1.4-0.6v1.3c-0.1,0-0.2,0-0.3,0c-0.4,0-0.8,0.2-1,0.4v2.8
				L246.3,428L246.3,428z"
            />
            <path
              className="st5"
              d="M252.3,428l-1-1.5l-0.4,0.5v1h-1.4v-6h1.4v3.4l1.3-1.7h1.7l-1.6,2l1.7,2.4L252.3,428L252.3,428z"
            />
            <path
              className="st5"
              d="M254.3,425.8c0-1.3,0.9-2.3,2.3-2.3c1.3,0,2.2,0.9,2.2,2.4v0.3h-3.1c0.1,0.4,0.5,0.7,1.1,0.7
				c0.3,0,0.8-0.1,1.1-0.4l0.6,0.9c-0.4,0.4-1.2,0.6-1.8,0.6C255.3,428.1,254.3,427.2,254.3,425.8z M256.6,424.6
				c-0.6,0-0.8,0.4-0.9,0.7h1.8C257.5,425,257.3,424.6,256.6,424.6z"
            />
            <path
              className="st5"
              d="M260.1,426.8v-2h-0.7v-1.2h0.7v-1.2h1.4v1.2h0.9v1.2h-0.9v1.6c0,0.3,0.1,0.4,0.4,0.4c0.2,0,0.3-0.1,0.4-0.1
				l0.3,1c-0.2,0.2-0.5,0.3-1,0.3C260.6,428.1,260.1,427.6,260.1,426.8z"
            />
            <path
              className="st5"
              d="M213.5,434.8c0-1.4,1-2.3,2.4-2.3c0.9,0,1.5,0.4,1.8,0.8l-0.9,0.8c-0.2-0.3-0.5-0.4-0.8-0.4
				c-0.6,0-1,0.4-1,1.1s0.4,1.1,1,1.1c0.4,0,0.6-0.2,0.8-0.4l0.9,0.8c-0.3,0.4-0.8,0.8-1.8,0.8C214.5,437.1,213.5,436.2,213.5,434.8
				z"
            />
            <path
              className="st5"
              d="M217.8,434.8c0-1.2,0.9-2.3,2.4-2.3s2.4,1.1,2.4,2.3s-0.9,2.3-2.4,2.3C218.7,437.1,217.8,436,217.8,434.8z
				 M221.1,434.8c0-0.6-0.3-1.1-1-1.1c-0.6,0-0.9,0.5-0.9,1.1s0.3,1.1,0.9,1.1C220.8,435.9,221.1,435.4,221.1,434.8z"
            />
            <path
              className="st5"
              d="M228.8,437v-2.6c0-0.3-0.2-0.6-0.6-0.6c-0.4,0-0.6,0.2-0.8,0.4v2.8H226v-2.6c0-0.3-0.2-0.6-0.6-0.6
				c-0.4,0-0.6,0.2-0.8,0.4v2.8h-1.4v-4.3h1.4v0.5c0.2-0.3,0.7-0.6,1.4-0.6c0.6,0,1.1,0.3,1.2,0.8c0.3-0.4,0.8-0.8,1.5-0.8
				c0.8,0,1.3,0.4,1.3,1.3v3.2L228.8,437L228.8,437z"
            />
            <path
              className="st5"
              d="M232.5,436.5v2.2h-1.4v-6h1.4v0.5c0.3-0.4,0.8-0.6,1.3-0.6c1.1,0,1.9,0.8,1.9,2.3s-0.8,2.3-1.9,2.3
				C233.3,437.1,232.9,436.9,232.5,436.5z M234.3,434.8c0-0.6-0.4-1.1-1-1.1c-0.3,0-0.7,0.2-0.8,0.4v1.3c0.2,0.2,0.5,0.4,0.8,0.4
				C233.9,435.9,234.3,435.5,234.3,434.8z"
            />
            <path
              className="st5"
              d="M236.2,434.8c0-1.3,0.9-2.3,2.3-2.3c1.3,0,2.2,0.9,2.2,2.4v0.3h-3.1c0.1,0.4,0.5,0.7,1.1,0.7
				c0.3,0,0.8-0.1,1.1-0.4l0.6,0.9c-0.4,0.4-1.2,0.6-1.8,0.6C237.2,437.1,236.2,436.2,236.2,434.8z M238.5,433.6
				c-0.6,0-0.8,0.4-0.9,0.7h1.8C239.4,434,239.2,433.6,238.5,433.6z"
            />
            <path
              className="st5"
              d="M242,435.8v-2h-0.7v-1.2h0.7v-1.2h1.4v1.2h0.9v1.2h-0.9v1.6c0,0.3,0.1,0.4,0.4,0.4c0.2,0,0.3-0.1,0.4-0.1
				l0.3,1c-0.2,0.2-0.5,0.3-1,0.3C242.5,437.1,242,436.6,242,435.8z"
            />
            <path
              className="st5"
              d="M244.9,431.4c0-0.4,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8s-0.4,0.8-0.8,0.8S244.9,431.9,244.9,431.4z M245,437
				v-4.3h1.4v4.3H245z"
            />
            <path
              className="st5"
              d="M247.9,435.8v-2h-0.7v-1.2h0.7v-1.2h1.4v1.2h0.9v1.2h-0.9v1.6c0,0.3,0.1,0.4,0.4,0.4c0.2,0,0.3-0.1,0.4-0.1
				l0.3,1c-0.2,0.2-0.5,0.3-1,0.3C248.4,437.1,247.9,436.6,247.9,435.8z"
            />
            <path
              className="st5"
              d="M250.8,431.4c0-0.4,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8s-0.4,0.8-0.8,0.8S250.8,431.9,250.8,431.4z M250.9,437
				v-4.3h1.4v4.3H250.9z"
            />
            <path
              className="st5"
              d="M253.3,434.8c0-1.2,0.9-2.3,2.4-2.3c1.5,0,2.4,1.1,2.4,2.3s-0.9,2.3-2.4,2.3
				C254.2,437.1,253.3,436,253.3,434.8z M256.6,434.8c0-0.6-0.3-1.1-1-1.1c-0.6,0-0.9,0.5-0.9,1.1s0.3,1.1,0.9,1.1
				C256.3,435.9,256.6,435.4,256.6,434.8z"
            />
            <path
              className="st5"
              d="M261.7,437v-2.5c0-0.5-0.3-0.7-0.7-0.7c-0.4,0-0.7,0.2-0.8,0.4v2.8h-1.4v-4.3h1.4v0.5
				c0.3-0.3,0.8-0.6,1.5-0.6c1,0,1.4,0.6,1.4,1.4v3.1L261.7,437L261.7,437z"
            />
          </motion.g>
        </g>
        <g>
          <motion.g
            filter={isExpandedDefault ? "url(#glow)" : undefined}
            animate={{
              opacity: isExpandedDefault ? 1 : 0,
              y: isExpandedDefault ? 0 : 10,
            }}
            transition={{
              delay: 1.0 * 0.7,
            }}
          >
            <path
              className="st5"
              d="M150.5,405.9c0-1.9,1.4-3.1,3.2-3.1c1.4,0,2.2,0.8,2.6,1.6L155,405c-0.2-0.5-0.7-0.9-1.3-0.9
				c-1,0-1.7,0.7-1.7,1.7s0.7,1.7,1.7,1.7c0.6,0,1.1-0.4,1.3-0.9l1.3,0.6c-0.4,0.8-1.2,1.6-2.6,1.6
				C151.9,409,150.5,407.8,150.5,405.9z"
            />
            <path
              className="st5"
              d="M157.1,409.4c0.1,0.1,0.2,0.1,0.3,0.1c0.3,0,0.5-0.1,0.6-0.2l0.1-0.2l-1.7-4.4h1.5l1,2.8l1-2.8h1.5l-2,5
				c-0.4,0.9-1,1.1-1.8,1.1c-0.1,0-0.5,0-0.6-0.1L157.1,409.4z"
            />
            <path
              className="st5"
              d="M161.8,408.9v-6h1.4v2.2c0.3-0.4,0.8-0.6,1.3-0.6c1.1,0,1.9,0.9,1.9,2.3c0,1.5-0.8,2.3-1.9,2.3
				c-0.5,0-0.9-0.2-1.3-0.6v0.5L161.8,408.9L161.8,408.9z M164.1,407.8c0.5,0,1-0.4,1-1.1c0-0.6-0.4-1.1-1-1.1
				c-0.3,0-0.7,0.2-0.8,0.4v1.3C163.4,407.7,163.8,407.8,164.1,407.8z"
            />
            <path
              className="st5"
              d="M166.9,406.8c0-1.3,0.9-2.3,2.3-2.3c1.3,0,2.2,0.9,2.2,2.4v0.3h-3.1c0.1,0.4,0.5,0.7,1.1,0.7
				c0.3,0,0.8-0.1,1.1-0.4l0.6,0.9c-0.4,0.4-1.2,0.6-1.8,0.6C168,409,166.9,408.2,166.9,406.8z M169.2,405.6c-0.6,0-0.8,0.4-0.9,0.7
				h1.8C170.1,406,169.9,405.6,169.2,405.6z"
            />
            <path
              className="st5"
              d="M172.4,408.9v-4.3h1.4v0.5c0.3-0.4,0.8-0.6,1.4-0.6v1.3c-0.1,0-0.2,0-0.3,0c-0.4,0-0.8,0.2-1,0.4v2.8
				L172.4,408.9L172.4,408.9z"
            />
            <path
              className="st5"
              d="M175.3,408.4l0.6-1c0.3,0.3,1,0.6,1.5,0.6c0.4,0,0.6-0.1,0.6-0.3c0-0.5-2.5,0-2.5-1.7c0-0.8,0.7-1.4,1.9-1.4
				c0.7,0,1.4,0.2,1.8,0.6l-0.5,1c-0.3-0.3-0.8-0.5-1.3-0.5c-0.3,0-0.5,0.1-0.5,0.3c0,0.5,2.5,0,2.5,1.8c0,0.8-0.7,1.4-2,1.4
				C176.6,409,175.8,408.8,175.3,408.4z"
            />
            <path
              className="st5"
              d="M179.8,406.8c0-1.3,0.9-2.3,2.3-2.3c1.3,0,2.2,0.9,2.2,2.4v0.3h-3.1c0.1,0.4,0.5,0.7,1.1,0.7
				c0.3,0,0.8-0.1,1.1-0.4l0.6,0.9c-0.4,0.4-1.2,0.6-1.8,0.6C180.8,409,179.8,408.2,179.8,406.8z M182.1,405.6
				c-0.6,0-0.8,0.4-0.9,0.7h1.8C183,406,182.7,405.6,182.1,405.6z"
            />
            <path
              className="st5"
              d="M185,406.8c0-1.4,1-2.3,2.4-2.3c0.9,0,1.5,0.4,1.8,0.8l-0.9,0.8c-0.2-0.3-0.4-0.4-0.8-0.4
				c-0.6,0-1,0.4-1,1.1s0.4,1.1,1,1.1c0.4,0,0.6-0.2,0.8-0.4l0.9,0.8c-0.3,0.4-0.8,0.8-1.8,0.8C186,409,185,408.1,185,406.8z"
            />
            <path
              className="st5"
              d="M192.5,408.9v-0.5c-0.3,0.3-0.8,0.6-1.5,0.6c-1,0-1.4-0.6-1.4-1.4v-3.1h1.4v2.5c0,0.5,0.3,0.7,0.7,0.7
				s0.7-0.2,0.8-0.4v-2.8h1.4v4.3L192.5,408.9L192.5,408.9z"
            />
            <path
              className="st5"
              d="M195,408.9v-4.3h1.4v0.5c0.3-0.4,0.8-0.6,1.4-0.6v1.3c-0.1,0-0.2,0-0.3,0c-0.4,0-0.8,0.2-1,0.4v2.8
				L195,408.9L195,408.9z"
            />
            <path
              className="st5"
              d="M198.1,403.4c0-0.4,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8s-0.4,0.8-0.8,0.8S198.1,403.8,198.1,403.4z
				 M198.2,408.9v-4.3h1.4v4.3H198.2z"
            />
            <path
              className="st5"
              d="M201.2,407.8v-2h-0.7v-1.2h0.7v-1.2h1.4v1.2h0.9v1.2h-0.9v1.6c0,0.3,0.1,0.4,0.4,0.4c0.2,0,0.3-0.1,0.4-0.1
				l0.3,1c-0.2,0.2-0.5,0.3-1,0.3C201.7,409,201.2,408.6,201.2,407.8z"
            />
            <path
              className="st5"
              d="M204.3,409.4c0.1,0.1,0.2,0.1,0.3,0.1c0.3,0,0.5-0.1,0.6-0.2l0.1-0.2l-1.7-4.4h1.5l1,2.8l1-2.8h1.5l-2,5
				c-0.4,0.9-1,1.1-1.8,1.1c-0.1,0-0.5,0-0.6-0.1L204.3,409.4z"
            />
          </motion.g>
        </g>
        <g>
          <motion.g
            filter={isExpandedDefault ? "url(#glow)" : undefined}
            animate={{
              opacity: isExpandedDefault ? 1 : 0,
              y: isExpandedDefault ? 0 : 10,
            }}
            transition={{
              delay: 1.2 * 0.7,
            }}
          >
            <path
              className="st5"
              d="M267,408.9v-6h4.4v1.4h-2.9v0.9h2.8v1.3h-2.8v1h2.9v1.4L267,408.9L267,408.9z"
            />
            <path className="st5" d="M271.8,407.3v-1.2h2.2v1.2H271.8z" />
            <path
              className="st5"
              d="M274.3,406.8c0-1.4,1-2.3,2.4-2.3c0.9,0,1.5,0.4,1.8,0.8l-0.9,0.8c-0.2-0.3-0.4-0.4-0.8-0.4
				c-0.6,0-1,0.4-1,1.1s0.4,1.1,1,1.1c0.4,0,0.6-0.2,0.8-0.4l0.9,0.8c-0.3,0.4-0.8,0.8-1.8,0.8C275.3,409,274.3,408.1,274.3,406.8z"
            />
            <path
              className="st5"
              d="M278.6,406.8c0-1.2,0.9-2.3,2.4-2.3s2.4,1.1,2.4,2.3s-0.9,2.3-2.4,2.3C279.5,409,278.6,408,278.6,406.8z
				 M281.9,406.8c0-0.6-0.3-1.1-1-1.1c-0.6,0-0.9,0.5-0.9,1.1s0.3,1.1,0.9,1.1C281.5,407.8,281.9,407.3,281.9,406.8z"
            />
            <path
              className="st5"
              d="M289.5,408.9v-2.6c0-0.3-0.2-0.6-0.6-0.6s-0.6,0.2-0.8,0.4v2.8h-1.4v-2.6c0-0.3-0.2-0.6-0.6-0.6
				s-0.6,0.2-0.8,0.4v2.8h-1.4v-4.3h1.4v0.5c0.2-0.3,0.7-0.6,1.4-0.6c0.6,0,1.1,0.3,1.2,0.8c0.3-0.4,0.8-0.8,1.5-0.8
				c0.8,0,1.3,0.4,1.3,1.3v3.2L289.5,408.9L289.5,408.9z"
            />
            <path
              className="st5"
              d="M297.4,408.9v-2.6c0-0.3-0.2-0.6-0.6-0.6s-0.6,0.2-0.8,0.4v2.8h-1.4v-2.6c0-0.3-0.2-0.6-0.6-0.6
				s-0.6,0.2-0.8,0.4v2.8h-1.4v-4.3h1.4v0.5c0.2-0.3,0.7-0.6,1.4-0.6c0.6,0,1.1,0.3,1.2,0.8c0.3-0.4,0.8-0.8,1.5-0.8
				c0.8,0,1.3,0.4,1.3,1.3v3.2L297.4,408.9L297.4,408.9z"
            />
            <path
              className="st5"
              d="M299.5,406.8c0-1.3,0.9-2.3,2.3-2.3c1.3,0,2.2,0.9,2.2,2.4v0.3h-3c0.1,0.4,0.5,0.7,1.1,0.7
				c0.3,0,0.8-0.1,1.1-0.4l0.6,0.9c-0.4,0.4-1.2,0.6-1.8,0.6C300.6,409,299.5,408.2,299.5,406.8z M301.8,405.6
				c-0.6,0-0.8,0.4-0.9,0.7h1.8C302.7,406,302.5,405.6,301.8,405.6z"
            />
            <path
              className="st5"
              d="M305.1,408.9v-4.3h1.4v0.5c0.3-0.4,0.8-0.6,1.4-0.6v1.3c-0.1,0-0.2,0-0.3,0c-0.4,0-0.8,0.2-1,0.4v2.8
				L305.1,408.9L305.1,408.9z"
            />
            <path
              className="st5"
              d="M308,406.8c0-1.4,1-2.3,2.4-2.3c0.9,0,1.5,0.4,1.8,0.8l-0.9,0.8c-0.2-0.3-0.5-0.4-0.8-0.4
				c-0.6,0-1,0.4-1,1.1s0.4,1.1,1,1.1c0.4,0,0.6-0.2,0.8-0.4l0.9,0.8c-0.3,0.4-0.8,0.8-1.8,0.8C309,409,308,408.1,308,406.8z"
            />
            <path
              className="st5"
              d="M312.3,406.8c0-1.3,0.9-2.3,2.3-2.3c1.3,0,2.2,0.9,2.2,2.4v0.3h-3.1c0.1,0.4,0.5,0.7,1.1,0.7
				c0.3,0,0.8-0.1,1.1-0.4l0.6,0.9c-0.4,0.4-1.2,0.6-1.8,0.6C313.3,409,312.3,408.2,312.3,406.8z M314.6,405.6
				c-0.6,0-0.8,0.4-0.9,0.7h1.8C315.5,406,315.3,405.6,314.6,405.6z"
            />
          </motion.g>
        </g>
        <g>
          <motion.g
            filter={isExpandedDefault ? "url(#glow)" : undefined}
            animate={{
              opacity: isExpandedDefault ? 1 : 0,
              y: isExpandedDefault ? 0 : 10,
            }}
            transition={{
              delay: 1.3 * 0.7,
            }}
          >
            <path
              className="st5"
              d="M307.4,376v-6h2.5c1.9,0,3.2,1.1,3.2,3s-1.4,3-3.2,3H307.4z M311.6,373c0-0.9-0.6-1.6-1.7-1.6h-1v3.3h1
				C311,374.6,311.6,373.8,311.6,373z"
            />
            <path
              className="st5"
              d="M316.3,376v-0.4c-0.3,0.3-0.8,0.5-1.4,0.5c-0.7,0-1.5-0.5-1.5-1.4c0-1.1,0.8-1.4,1.5-1.4
				c0.6,0,1.1,0.2,1.4,0.5v-0.4c0-0.4-0.3-0.6-0.9-0.6c-0.4,0-0.9,0.2-1.2,0.5l-0.5-1c0.6-0.5,1.3-0.7,2-0.7c1,0,2,0.4,2,1.7v2.7
				L316.3,376L316.3,376z M316.3,374.8v-0.4c-0.1-0.2-0.5-0.3-0.8-0.3c-0.4,0-0.7,0.2-0.7,0.5s0.3,0.5,0.7,0.5
				C315.9,375.2,316.2,375.1,316.3,374.8z"
            />
            <path
              className="st5"
              d="M318.9,374.8v-2h-0.7v-1.2h0.7v-1.2h1.4v1.2h0.9v1.2h-0.9v1.6c0,0.3,0.1,0.4,0.4,0.4c0.2,0,0.3-0.1,0.4-0.1
				l0.3,1c-0.2,0.2-0.5,0.3-1,0.3C319.4,376.1,318.9,375.6,318.9,374.8z"
            />
            <path
              className="st5"
              d="M324.4,376v-0.4c-0.3,0.3-0.8,0.5-1.4,0.5c-0.7,0-1.5-0.5-1.5-1.4c0-1.1,0.8-1.4,1.5-1.4
				c0.6,0,1.1,0.2,1.4,0.5v-0.4c0-0.4-0.3-0.6-0.9-0.6c-0.4,0-0.9,0.2-1.2,0.5l-0.5-1c0.6-0.5,1.3-0.7,2-0.7c1,0,2,0.4,2,1.7v2.7
				L324.4,376L324.4,376z M324.4,374.8v-0.4c-0.1-0.2-0.5-0.3-0.8-0.3c-0.4,0-0.7,0.2-0.7,0.5s0.3,0.5,0.7,0.5
				C324,375.2,324.3,375.1,324.4,374.8z"
            />
            <path
              className="st5"
              d="M329.6,375.4l0.6-1c0.3,0.3,1,0.6,1.5,0.6c0.4,0,0.6-0.1,0.6-0.3c0-0.5-2.5,0-2.5-1.7c0-0.8,0.7-1.4,1.9-1.4
				c0.7,0,1.4,0.2,1.8,0.6l-0.5,1c-0.3-0.3-0.8-0.5-1.3-0.5c-0.3,0-0.5,0.1-0.5,0.3c0,0.5,2.5,0,2.5,1.8c0,0.8-0.7,1.4-2,1.4
				C330.9,376.1,330.1,375.8,329.6,375.4z"
            />
            <path
              className="st5"
              d="M334.7,374.8v-2H334v-1.2h0.7v-1.2h1.4v1.2h0.9v1.2h-0.9v1.6c0,0.3,0.1,0.4,0.4,0.4c0.2,0,0.3-0.1,0.4-0.1
				l0.3,1c-0.2,0.2-0.5,0.3-1,0.3C335.2,376.1,334.7,375.6,334.7,374.8z"
            />
            <path
              className="st5"
              d="M340.2,376v-0.4c-0.3,0.3-0.8,0.5-1.4,0.5c-0.7,0-1.5-0.5-1.5-1.4c0-1.1,0.8-1.4,1.5-1.4
				c0.6,0,1.1,0.2,1.4,0.5v-0.4c0-0.4-0.3-0.6-0.9-0.6c-0.4,0-0.9,0.2-1.2,0.5l-0.5-1c0.6-0.5,1.3-0.7,2-0.7c1,0,2,0.4,2,1.7v2.7
				L340.2,376L340.2,376z M340.2,374.8v-0.4c-0.1-0.2-0.5-0.3-0.8-0.3c-0.4,0-0.7,0.2-0.7,0.5s0.3,0.5,0.7,0.5
				C339.8,375.2,340.1,375.1,340.2,374.8z"
            />
            <path
              className="st5"
              d="M345.5,376v-2.5c0-0.5-0.3-0.7-0.7-0.7c-0.4,0-0.7,0.2-0.8,0.4v2.8h-1.4v-4.3h1.4v0.5
				c0.3-0.3,0.8-0.6,1.5-0.6c1,0,1.4,0.6,1.4,1.4v3.1L345.5,376L345.5,376z"
            />
            <path
              className="st5"
              d="M350.9,376v-0.5c-0.4,0.4-0.8,0.6-1.3,0.6c-1.1,0-1.9-0.8-1.9-2.3c0-1.4,0.8-2.3,1.9-2.3
				c0.5,0,0.9,0.2,1.3,0.6V370h1.4v6H350.9z M350.9,374.5v-1.3c-0.2-0.2-0.5-0.4-0.8-0.4c-0.5,0-1,0.4-1,1.1s0.4,1.1,1,1.1
				C350.3,374.8,350.7,374.7,350.9,374.5z"
            />
            <path
              className="st5"
              d="M355.9,376v-0.4c-0.3,0.3-0.8,0.5-1.4,0.5c-0.7,0-1.5-0.5-1.5-1.4c0-1.1,0.8-1.4,1.5-1.4
				c0.6,0,1.1,0.2,1.4,0.5v-0.4c0-0.4-0.3-0.6-0.9-0.6c-0.4,0-0.9,0.2-1.2,0.5l-0.5-1c0.6-0.5,1.3-0.7,2-0.7c1,0,2,0.4,2,1.7v2.7
				L355.9,376L355.9,376z M355.9,374.8v-0.4c-0.1-0.2-0.5-0.3-0.8-0.3c-0.4,0-0.7,0.2-0.7,0.5s0.3,0.5,0.7,0.5
				C355.4,375.2,355.7,375.1,355.9,374.8z"
            />
            <path
              className="st5"
              d="M358.2,376v-4.3h1.4v0.5c0.3-0.4,0.8-0.6,1.4-0.6v1.3c-0.1,0-0.2,0-0.3,0c-0.4,0-0.8,0.2-1,0.4v2.8
				L358.2,376L358.2,376z"
            />
            <path
              className="st5"
              d="M364.4,376v-0.5c-0.4,0.4-0.8,0.6-1.3,0.6c-1.1,0-1.9-0.8-1.9-2.3c0-1.4,0.8-2.3,1.9-2.3
				c0.5,0,0.9,0.2,1.3,0.6V370h1.4v6H364.4z M364.4,374.5v-1.3c-0.2-0.2-0.5-0.4-0.8-0.4c-0.5,0-1,0.4-1,1.1s0.4,1.1,1,1.1
				C363.8,374.8,364.2,374.7,364.4,374.5z"
            />
            <path
              className="st5"
              d="M366.5,375.4l0.6-1c0.3,0.3,1,0.6,1.5,0.6c0.4,0,0.6-0.1,0.6-0.3c0-0.5-2.5,0-2.5-1.7c0-0.8,0.7-1.4,1.9-1.4
				c0.7,0,1.4,0.2,1.8,0.6l-0.5,1c-0.3-0.3-0.8-0.5-1.3-0.5c-0.3,0-0.5,0.1-0.5,0.3c0,0.5,2.5,0,2.5,1.8c0,0.8-0.7,1.4-2,1.4
				C367.7,376.1,366.9,375.8,366.5,375.4z"
            />
            <path
              className="st5"
              d="M311.3,385v-0.4c-0.3,0.3-0.8,0.5-1.4,0.5c-0.7,0-1.5-0.5-1.5-1.4c0-1.1,0.8-1.4,1.5-1.4
				c0.6,0,1.1,0.2,1.4,0.5v-0.4c0-0.4-0.3-0.6-0.9-0.6c-0.4,0-0.9,0.2-1.2,0.5l-0.5-1c0.6-0.5,1.3-0.7,2-0.7c1,0,2,0.4,2,1.7v2.7
				L311.3,385L311.3,385z M311.3,383.8v-0.4c-0.1-0.2-0.5-0.3-0.8-0.3c-0.4,0-0.7,0.2-0.7,0.5s0.3,0.5,0.7,0.5
				C310.9,384.2,311.2,384.1,311.3,383.8z"
            />
            <path
              className="st5"
              d="M316.6,385v-2.5c0-0.5-0.3-0.7-0.7-0.7c-0.4,0-0.7,0.2-0.8,0.4v2.8h-1.4v-4.3h1.4v0.5
				c0.3-0.3,0.8-0.6,1.5-0.6c1,0,1.4,0.6,1.4,1.4v3.1L316.6,385L316.6,385z"
            />
            <path
              className="st5"
              d="M321.9,385v-0.5c-0.4,0.4-0.8,0.6-1.3,0.6c-1.1,0-1.9-0.8-1.9-2.3c0-1.4,0.8-2.3,1.9-2.3
				c0.5,0,0.9,0.2,1.3,0.6V379h1.4v6H321.9z M321.9,383.5v-1.3c-0.2-0.2-0.5-0.4-0.8-0.4c-0.5,0-1,0.4-1,1.1s0.4,1.1,1,1.1
				C321.4,383.8,321.8,383.7,321.9,383.5z"
            />
            <path
              className="st5"
              d="M328.1,384.5v2.2h-1.4v-6h1.4v0.5c0.3-0.4,0.8-0.6,1.3-0.6c1.1,0,1.9,0.8,1.9,2.3s-0.8,2.3-1.9,2.3
				C328.9,385.1,328.4,384.9,328.1,384.5z M329.9,382.8c0-0.6-0.4-1.1-1-1.1c-0.3,0-0.7,0.2-0.8,0.4v1.3c0.2,0.2,0.5,0.4,0.8,0.4
				C329.5,383.8,329.9,383.4,329.9,382.8z"
            />
            <path
              className="st5"
              d="M332.1,385v-4.3h1.4v0.5c0.3-0.4,0.8-0.6,1.4-0.6v1.3c-0.1,0-0.2,0-0.3,0c-0.4,0-0.8,0.2-1,0.4v2.8
				L332.1,385L332.1,385z"
            />
            <path
              className="st5"
              d="M335,382.8c0-1.2,0.9-2.3,2.4-2.3s2.4,1.1,2.4,2.3s-0.9,2.3-2.4,2.3C335.9,385.1,335,384,335,382.8z
				 M338.3,382.8c0-0.6-0.3-1.1-1-1.1c-0.6,0-0.9,0.5-0.9,1.1s0.3,1.1,0.9,1.1C338,383.8,338.3,383.4,338.3,382.8z"
            />
            <path
              className="st5"
              d="M340.8,383.8v-2h-0.7v-1.2h0.7v-1.2h1.4v1.2h0.9v1.2h-0.9v1.6c0,0.3,0.1,0.4,0.4,0.4c0.2,0,0.3-0.1,0.4-0.1
				l0.3,1c-0.2,0.2-0.5,0.3-1,0.3C341.3,385.1,340.8,384.6,340.8,383.8z"
            />
            <path
              className="st5"
              d="M343.5,382.8c0-1.3,0.9-2.3,2.3-2.3c1.3,0,2.2,0.9,2.2,2.4v0.3h-3.1c0.1,0.4,0.5,0.7,1.1,0.7
				c0.3,0,0.8-0.1,1.1-0.4l0.6,0.9c-0.4,0.4-1.2,0.6-1.8,0.6C344.5,385.1,343.5,384.2,343.5,382.8z M345.8,381.6
				c-0.6,0-0.8,0.4-0.9,0.7h1.8C346.6,382,346.4,381.6,345.8,381.6z"
            />
            <path
              className="st5"
              d="M348.7,382.8c0-1.4,1-2.3,2.4-2.3c0.9,0,1.5,0.4,1.8,0.8l-0.9,0.8c-0.2-0.3-0.5-0.4-0.8-0.4
				c-0.6,0-1,0.4-1,1.1s0.4,1.1,1,1.1c0.4,0,0.6-0.2,0.8-0.4l0.9,0.8c-0.3,0.4-0.8,0.8-1.8,0.8C349.7,385.1,348.7,384.1,348.7,382.8
				z"
            />
            <path
              className="st5"
              d="M353.6,383.8v-2h-0.7v-1.2h0.7v-1.2h1.4v1.2h0.9v1.2H355v1.6c0,0.3,0.1,0.4,0.4,0.4c0.2,0,0.3-0.1,0.4-0.1
				l0.3,1c-0.2,0.2-0.5,0.3-1,0.3C354.1,385.1,353.6,384.6,353.6,383.8z"
            />
            <path
              className="st5"
              d="M356.4,379.4c0-0.4,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8s-0.4,0.8-0.8,0.8S356.4,379.9,356.4,379.4z M356.5,385
				v-4.3h1.4v4.3H356.5z"
            />
            <path
              className="st5"
              d="M358.9,382.8c0-1.2,0.9-2.3,2.4-2.3s2.4,1.1,2.4,2.3s-0.9,2.3-2.4,2.3C359.8,385.1,358.9,384,358.9,382.8z
				 M362.3,382.8c0-0.6-0.3-1.1-1-1.1c-0.6,0-0.9,0.5-0.9,1.1s0.3,1.1,0.9,1.1C361.9,383.8,362.3,383.4,362.3,382.8z"
            />
            <path
              className="st5"
              d="M367.4,385v-2.5c0-0.5-0.3-0.7-0.7-0.7c-0.4,0-0.7,0.2-0.8,0.4v2.8h-1.4v-4.3h1.4v0.5
				c0.3-0.3,0.8-0.6,1.5-0.6c1,0,1.4,0.6,1.4,1.4v3.1L367.4,385L367.4,385z"
            />
          </motion.g>
        </g>
        <g>
          <motion.g
            filter={isExpandedDefault ? "url(#glow)" : undefined}
            animate={{
              opacity: isExpandedDefault ? 1 : 0,
              y: isExpandedDefault ? 0 : 10,
            }}
            transition={{
              delay: 0.9 * 0.7,
            }}
          >
            <path
              className="st5"
              d="M122.1,375.2v-6h4.4v1.4h-2.9v0.9h2.8v1.4h-2.8v1h2.9v1.4L122.1,375.2L122.1,375.2z"
            />
            <path
              className="st5"
              d="M127.7,374v-2H127v-1.2h0.7v-1.2h1.4v1.2h0.9v1.2h-0.9v1.6c0,0.3,0.1,0.4,0.4,0.4c0.2,0,0.3-0.1,0.4-0.1
				l0.3,1c-0.2,0.2-0.5,0.3-1,0.3C128.2,375.3,127.7,374.9,127.7,374z"
            />
            <path
              className="st5"
              d="M133.7,375.2v-2.5c0-0.5-0.3-0.7-0.7-0.7s-0.7,0.2-0.8,0.4v2.8h-1.4v-6h1.4v2.2c0.3-0.3,0.8-0.6,1.5-0.6
				c1,0,1.4,0.6,1.4,1.4v3.1L133.7,375.2L133.7,375.2z"
            />
            <path
              className="st5"
              d="M136,369.7c0-0.4,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8s-0.4,0.8-0.8,0.8S136,370.1,136,369.7z M136.1,375.2v-4.3
				h1.4v4.3H136.1z"
            />
            <path
              className="st5"
              d="M138.3,373c0-1.4,1-2.3,2.4-2.3c0.9,0,1.5,0.4,1.8,0.8l-0.9,0.8c-0.2-0.3-0.5-0.4-0.8-0.4
				c-0.6,0-1,0.4-1,1.1s0.4,1.1,1,1.1c0.4,0,0.6-0.2,0.8-0.4l0.9,0.8c-0.3,0.4-0.8,0.8-1.8,0.8C139.3,375.3,138.3,374.4,138.3,373z"
            />
            <path
              className="st5"
              d="M145.7,375.2v-0.4c-0.3,0.3-0.8,0.5-1.4,0.5c-0.7,0-1.5-0.5-1.5-1.4c0-1.1,0.8-1.4,1.5-1.4
				c0.6,0,1.1,0.2,1.4,0.5v-0.4c0-0.4-0.3-0.6-0.9-0.6c-0.4,0-0.9,0.2-1.2,0.5l-0.5-1c0.6-0.5,1.3-0.7,2-0.7c1,0,2,0.4,2,1.7v2.7
				L145.7,375.2L145.7,375.2z M145.7,374.1v-0.4c-0.1-0.2-0.5-0.3-0.8-0.3c-0.4,0-0.7,0.2-0.7,0.5s0.3,0.5,0.7,0.5
				C145.2,374.4,145.5,374.3,145.7,374.1z"
            />
            <path className="st5" d="M148.1,375.2v-6h1.4v6H148.1z" />
            <path
              className="st5"
              d="M115.1,383.6l0.6-1c0.3,0.3,1,0.6,1.5,0.6c0.4,0,0.6-0.1,0.6-0.3c0-0.5-2.5,0-2.5-1.7c0-0.8,0.7-1.4,1.9-1.4
				c0.7,0,1.4,0.2,1.8,0.6l-0.5,1c-0.3-0.3-0.8-0.5-1.3-0.5c-0.3,0-0.5,0.1-0.5,0.3c0,0.5,2.5,0,2.5,1.8c0,0.8-0.7,1.4-2,1.4
				C116.4,384.3,115.6,384,115.1,383.6z"
            />
            <path
              className="st5"
              d="M120.2,383v-2h-0.7v-1.2h0.7v-1.2h1.4v1.2h0.9v1.2h-0.9v1.6c0,0.3,0.1,0.4,0.4,0.4c0.2,0,0.3-0.1,0.4-0.1
				l0.3,1c-0.2,0.2-0.5,0.3-1,0.3C120.6,384.3,120.2,383.9,120.2,383z"
            />
            <path
              className="st5"
              d="M125.7,384.2v-0.4c-0.3,0.3-0.8,0.5-1.4,0.5c-0.7,0-1.5-0.5-1.5-1.4c0-1.1,0.8-1.4,1.5-1.4
				c0.6,0,1.1,0.2,1.4,0.5v-0.4c0-0.4-0.3-0.6-0.9-0.6c-0.4,0-0.9,0.2-1.2,0.5l-0.5-1c0.6-0.5,1.3-0.7,2-0.7c1,0,2,0.4,2,1.7v2.7
				L125.7,384.2L125.7,384.2z M125.7,383.1v-0.4c-0.1-0.2-0.5-0.3-0.8-0.3c-0.4,0-0.7,0.2-0.7,0.5s0.3,0.5,0.7,0.5
				C125.3,383.4,125.6,383.3,125.7,383.1z"
            />
            <path
              className="st5"
              d="M131.1,384.2v-2.5c0-0.5-0.3-0.7-0.7-0.7s-0.7,0.2-0.8,0.4v2.8h-1.4v-4.3h1.4v0.5c0.3-0.3,0.8-0.6,1.5-0.6
				c1,0,1.4,0.6,1.4,1.4v3.1L131.1,384.2L131.1,384.2z"
            />
            <path
              className="st5"
              d="M136.5,384.2v-0.5c-0.4,0.4-0.8,0.6-1.3,0.6c-1.1,0-1.9-0.8-1.9-2.3c0-1.4,0.8-2.3,1.9-2.3
				c0.5,0,0.9,0.2,1.3,0.6v-2.2h1.4v6L136.5,384.2L136.5,384.2z M136.5,382.7v-1.3c-0.2-0.2-0.5-0.4-0.8-0.4c-0.5,0-1,0.4-1,1.1
				s0.4,1.1,1,1.1C136,383.1,136.3,382.9,136.5,382.7z"
            />
            <path
              className="st5"
              d="M141.5,384.2v-0.4c-0.3,0.3-0.8,0.5-1.4,0.5c-0.7,0-1.5-0.5-1.5-1.4c0-1.1,0.8-1.4,1.5-1.4
				c0.6,0,1.1,0.2,1.4,0.5v-0.4c0-0.4-0.3-0.6-0.9-0.6c-0.4,0-0.9,0.2-1.2,0.5l-0.5-1c0.6-0.5,1.3-0.7,2-0.7c1,0,2,0.4,2,1.7v2.7
				L141.5,384.2L141.5,384.2z M141.5,383.1v-0.4c-0.1-0.2-0.5-0.3-0.8-0.3c-0.4,0-0.7,0.2-0.7,0.5s0.3,0.5,0.7,0.5
				C141,383.4,141.4,383.3,141.5,383.1z"
            />
            <path
              className="st5"
              d="M144,384.2v-4.3h1.4v0.5c0.3-0.4,0.8-0.6,1.4-0.6v1.3c-0.1,0-0.2,0-0.3,0c-0.4,0-0.8,0.2-1,0.4v2.8
				L144,384.2L144,384.2z"
            />
            <path
              className="st5"
              d="M150.3,384.2v-0.5c-0.4,0.4-0.8,0.6-1.3,0.6c-1.1,0-1.9-0.8-1.9-2.3c0-1.4,0.8-2.3,1.9-2.3
				c0.5,0,0.9,0.2,1.3,0.6v-2.2h1.4v6L150.3,384.2L150.3,384.2z M150.3,382.7v-1.3c-0.2-0.2-0.5-0.4-0.8-0.4c-0.5,0-1,0.4-1,1.1
				s0.4,1.1,1,1.1C149.8,383.1,150.1,382.9,150.3,382.7z"
            />
            <path
              className="st5"
              d="M152.4,383.6l0.6-1c0.3,0.3,1,0.6,1.5,0.6c0.4,0,0.6-0.1,0.6-0.3c0-0.5-2.5,0-2.5-1.7c0-0.8,0.7-1.4,1.9-1.4
				c0.7,0,1.4,0.2,1.8,0.6l-0.5,1c-0.3-0.3-0.8-0.5-1.3-0.5c-0.3,0-0.5,0.1-0.5,0.3c0,0.5,2.5,0,2.5,1.8c0,0.8-0.7,1.4-2,1.4
				C153.7,384.3,152.9,384,152.4,383.6z"
            />
          </motion.g>
        </g>
      </g>
      <g id="Layer_17">
        <g>
          <motion.g
            filter={isExpandedDefault ? "url(#glow)" : undefined}
            animate={{
              opacity: isExpandedDefault ? 1 : 0,
              y: isExpandedDefault ? 0 : 10,
            }}
            transition={{
              delay: 1.5 * 0.7,
            }}
          >
            <g>
              <path
                className="st6"
                d="M386.3,305.7v-4l-1.5,4h-0.7l-1.5-4v4h-1.5v-6h2.2l1.3,3.3l1.3-3.3h2.2v6H386.3z"
              />
              <path
                className="st6"
                d="M388.6,303.5c0-1.2,0.9-2.3,2.4-2.3s2.4,1.1,2.4,2.3s-0.9,2.3-2.4,2.3S388.6,304.7,388.6,303.5z
					 M391.9,303.5c0-0.6-0.3-1.1-1-1.1c-0.6,0-0.9,0.5-0.9,1.1s0.3,1.1,0.9,1.1C391.6,304.6,391.9,304.1,391.9,303.5z"
              />
              <path
                className="st6"
                d="M397,305.7v-2.5c0-0.5-0.3-0.7-0.7-0.7c-0.4,0-0.7,0.2-0.8,0.4v2.8h-1.4v-4.3h1.4v0.5
					c0.3-0.3,0.8-0.6,1.5-0.6c1,0,1.4,0.6,1.4,1.4v3.1L397,305.7L397,305.7z"
              />
              <path
                className="st6"
                d="M399.3,300.2c0-0.4,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8s-0.4,0.8-0.8,0.8S399.3,300.6,399.3,300.2z
					 M399.4,305.7v-4.3h1.4v4.3H399.4z"
              />
              <path
                className="st6"
                d="M402.1,304.5v-2h-0.7v-1.2h0.7v-1.2h1.4v1.2h0.9v1.2h-0.9v1.6c0,0.3,0.1,0.4,0.4,0.4c0.2,0,0.3-0.1,0.4-0.1
					l0.3,1c-0.2,0.2-0.5,0.3-1,0.3C402.5,305.8,402.1,305.4,402.1,304.5z"
              />
              <path
                className="st6"
                d="M404.7,303.5c0-1.2,0.9-2.3,2.4-2.3s2.4,1.1,2.4,2.3s-0.9,2.3-2.4,2.3S404.7,304.7,404.7,303.5z M408,303.5
					c0-0.6-0.3-1.1-1-1.1c-0.6,0-0.9,0.5-0.9,1.1s0.3,1.1,0.9,1.1C407.7,304.6,408,304.1,408,303.5z"
              />
              <path
                className="st6"
                d="M410.2,305.7v-4.3h1.4v0.5c0.3-0.4,0.8-0.6,1.4-0.6v1.3c-0.1,0-0.2,0-0.3,0c-0.4,0-0.8,0.2-1,0.4v2.8
					L410.2,305.7L410.2,305.7z"
              />
              <path
                className="st6"
                d="M413.4,300.2c0-0.4,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8s-0.4,0.8-0.8,0.8S413.4,300.6,413.4,300.2z
					 M413.5,305.7v-4.3h1.4v4.3H413.5z"
              />
              <path
                className="st6"
                d="M418.8,305.7v-2.5c0-0.5-0.3-0.7-0.7-0.7c-0.4,0-0.7,0.2-0.8,0.4v2.8h-1.4v-4.3h1.4v0.5
					c0.3-0.3,0.8-0.6,1.5-0.6c1,0,1.4,0.6,1.4,1.4v3.1L418.8,305.7L418.8,305.7z"
              />
              <path
                className="st6"
                d="M421.1,306.8l0.6-1c0.3,0.4,0.8,0.5,1.3,0.5s1.1-0.2,1.1-1V305c-0.4,0.4-0.8,0.6-1.3,0.6
					c-1.1,0-1.9-0.7-1.9-2.2c0-1.4,0.8-2.2,1.9-2.2c0.5,0,0.9,0.2,1.3,0.6v-0.5h1.4v4c0,1.8-1.4,2.1-2.5,2.1
					C422.3,307.5,421.6,307.3,421.1,306.8z M424.1,304v-1.2c-0.2-0.2-0.5-0.4-0.8-0.4c-0.5,0-1,0.3-1,1c0,0.6,0.4,1,1,1
					C423.6,304.4,424,304.2,424.1,304z"
              />
            </g>
          </motion.g>
        </g>
        <g>
          <motion.g
            filter={isExpandedDefault ? "url(#glow)" : undefined}
            animate={{
              opacity: isExpandedDefault ? 1 : 0,
              y: isExpandedDefault ? 0 : 10,
            }}
            transition={{
              delay: 1.6 * 0.7,
            }}
          >
            <g>
              <path
                className="st6"
                d="M384.2,266.8v-6h1.5v4.7h2.4v1.4h-3.9V266.8z"
              />
              <path
                className="st6"
                d="M388.5,264.6c0-1.3,0.9-2.3,2.3-2.3c1.3,0,2.2,0.9,2.2,2.4v0.3h-3.1c0.1,0.4,0.5,0.7,1.1,0.7
					c0.3,0,0.8-0.1,1.1-0.4l0.6,0.9c-0.4,0.4-1.2,0.6-1.8,0.6C389.5,266.9,388.5,266,388.5,264.6z M390.8,263.4
					c-0.6,0-0.8,0.4-0.9,0.7h1.8C391.6,263.8,391.4,263.4,390.8,263.4z"
              />
              <path
                className="st6"
                d="M396.6,266.8v-0.4c-0.3,0.3-0.8,0.5-1.4,0.5c-0.7,0-1.5-0.5-1.5-1.4c0-1.1,0.8-1.4,1.5-1.4
					c0.6,0,1.1,0.2,1.4,0.5v-0.4c0-0.4-0.3-0.6-0.9-0.6c-0.4,0-0.9,0.2-1.2,0.5l-0.5-1c0.6-0.5,1.3-0.7,2-0.7c1,0,2,0.4,2,1.7v2.7
					L396.6,266.8L396.6,266.8z M396.6,265.6v-0.4c-0.1-0.2-0.5-0.3-0.8-0.3c-0.4,0-0.7,0.2-0.7,0.5s0.3,0.5,0.7,0.5
					C396.1,266,396.4,265.9,396.6,265.6z"
              />
              <path
                className="st6"
                d="M401.8,266.8v-0.5c-0.4,0.4-0.8,0.6-1.3,0.6c-1.1,0-1.9-0.8-1.9-2.3c0-1.4,0.8-2.3,1.9-2.3
					c0.5,0,0.9,0.2,1.3,0.6v-2.2h1.4v6L401.8,266.8L401.8,266.8z M401.8,265.3V264c-0.2-0.2-0.5-0.4-0.8-0.4c-0.5,0-1,0.4-1,1.1
					s0.4,1.1,1,1.1C401.2,265.6,401.6,265.5,401.8,265.3z"
              />
              <path
                className="st6"
                d="M403.9,264.6c0-1.3,0.9-2.3,2.3-2.3c1.3,0,2.2,0.9,2.2,2.4v0.3h-3.1c0.1,0.4,0.5,0.7,1.1,0.7
					c0.3,0,0.8-0.1,1.1-0.4l0.6,0.9c-0.4,0.4-1.2,0.6-1.8,0.6C405,266.9,403.9,266,403.9,264.6z M406.3,263.4
					c-0.6,0-0.8,0.4-0.9,0.7h1.8C407.1,263.8,406.9,263.4,406.3,263.4z"
              />
              <path
                className="st6"
                d="M409.5,266.8v-4.3h1.4v0.5c0.3-0.4,0.8-0.6,1.4-0.6v1.3c-0.1,0-0.2,0-0.3,0c-0.4,0-0.8,0.2-1,0.4v2.8
					L409.5,266.8L409.5,266.8z"
              />
              <path
                className="st6"
                d="M412.3,266.2l0.6-1c0.3,0.3,1,0.6,1.5,0.6c0.4,0,0.6-0.1,0.6-0.3c0-0.5-2.5,0-2.5-1.7
					c0-0.8,0.7-1.4,1.9-1.4c0.7,0,1.4,0.2,1.8,0.6l-0.5,1c-0.3-0.3-0.8-0.5-1.3-0.5c-0.3,0-0.5,0.1-0.5,0.3c0,0.5,2.5,0,2.5,1.8
					c0,0.8-0.7,1.4-2,1.4C413.6,266.9,412.8,266.6,412.3,266.2z"
              />
              <path
                className="st6"
                d="M420.1,266.8v-2.5c0-0.5-0.3-0.7-0.7-0.7c-0.4,0-0.7,0.2-0.8,0.4v2.8h-1.4v-6h1.4v2.2
					c0.3-0.3,0.8-0.6,1.5-0.6c1,0,1.4,0.6,1.4,1.4v3.1L420.1,266.8L420.1,266.8z"
              />
              <path
                className="st6"
                d="M422.4,261.2c0-0.4,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8s-0.4,0.8-0.8,0.8S422.4,261.7,422.4,261.2z
					 M422.5,266.8v-4.3h1.4v4.3H422.5z"
              />
              <path
                className="st6"
                d="M426.6,266.3v2.2h-1.4v-6h1.4v0.5c0.3-0.4,0.8-0.6,1.3-0.6c1.1,0,1.9,0.8,1.9,2.3s-0.8,2.3-1.9,2.3
					C427.4,266.9,427,266.7,426.6,266.3z M428.4,264.6c0-0.6-0.4-1.1-1-1.1c-0.3,0-0.7,0.2-0.8,0.4v1.3c0.2,0.2,0.5,0.4,0.8,0.4
					C428,265.6,428.4,265.2,428.4,264.6z"
              />
              <path
                className="st6"
                d="M435.2,266.8v-0.4c-0.3,0.3-0.8,0.5-1.4,0.5c-0.7,0-1.5-0.5-1.5-1.4c0-1.1,0.8-1.4,1.5-1.4
					c0.6,0,1.1,0.2,1.4,0.5v-0.4c0-0.4-0.3-0.6-0.9-0.6c-0.4,0-0.9,0.2-1.2,0.5l-0.5-1c0.6-0.5,1.3-0.7,2-0.7c1,0,2,0.4,2,1.7v2.7
					L435.2,266.8L435.2,266.8z M435.2,265.6v-0.4c-0.1-0.2-0.5-0.3-0.8-0.3c-0.4,0-0.7,0.2-0.7,0.5s0.3,0.5,0.7,0.5
					C434.8,266,435.1,265.9,435.2,265.6z"
              />
              <path
                className="st6"
                d="M440.5,266.8v-2.5c0-0.5-0.3-0.7-0.7-0.7c-0.4,0-0.7,0.2-0.8,0.4v2.8h-1.4v-4.3h1.4v0.5
					c0.3-0.3,0.8-0.6,1.5-0.6c1,0,1.4,0.6,1.4,1.4v3.1L440.5,266.8L440.5,266.8z"
              />
              <path
                className="st6"
                d="M445.8,266.8v-0.5c-0.4,0.4-0.8,0.6-1.3,0.6c-1.1,0-1.9-0.8-1.9-2.3c0-1.4,0.8-2.3,1.9-2.3
					c0.5,0,0.9,0.2,1.3,0.6v-2.2h1.4v6L445.8,266.8L445.8,266.8z M445.8,265.3V264c-0.2-0.2-0.5-0.4-0.8-0.4c-0.5,0-1,0.4-1,1.1
					s0.4,1.1,1,1.1C445.3,265.6,445.7,265.5,445.8,265.3z"
              />
              <path
                className="st6"
                d="M387.1,273.6c0-1.4,1-2.3,2.4-2.3c0.9,0,1.5,0.4,1.8,0.8l-0.9,0.8c-0.2-0.3-0.5-0.4-0.8-0.4
					c-0.6,0-1,0.4-1,1.1s0.4,1.1,1,1.1c0.4,0,0.6-0.2,0.8-0.4l0.9,0.8c-0.3,0.4-0.8,0.8-1.8,0.8
					C388.1,275.9,387.1,274.9,387.1,273.6z"
              />
              <path
                className="st6"
                d="M391.9,273.6c0-1.2,0.9-2.3,2.4-2.3s2.4,1.1,2.4,2.3s-0.9,2.3-2.4,2.3S391.9,274.8,391.9,273.6z
					 M395.2,273.6c0-0.6-0.3-1.1-1-1.1c-0.6,0-0.9,0.5-0.9,1.1s0.3,1.1,0.9,1.1C394.9,274.6,395.2,274.2,395.2,273.6z"
              />
              <path className="st6" d="M397.5,274.2V273h2.2v1.2H397.5z" />
              <path
                className="st6"
                d="M400.5,273.6c0-1.2,0.9-2.3,2.4-2.3s2.4,1.1,2.4,2.3s-0.9,2.3-2.4,2.3C401.3,275.9,400.5,274.8,400.5,273.6
					z M403.8,273.6c0-0.6-0.3-1.1-1-1.1c-0.6,0-0.9,0.5-0.9,1.1s0.3,1.1,0.9,1.1C403.4,274.6,403.8,274.2,403.8,273.6z"
              />
              <path
                className="st6"
                d="M406.3,275.8v-4.3h1.4v0.5c0.3-0.4,0.8-0.6,1.4-0.6v1.3c-0.1,0-0.2,0-0.3,0c-0.4,0-0.8,0.2-1,0.4v2.8
					L406.3,275.8L406.3,275.8z"
              />
              <path
                className="st6"
                d="M412.9,275.8v-0.5c-0.4,0.4-0.8,0.6-1.3,0.6c-1.1,0-1.9-0.8-1.9-2.3c0-1.4,0.8-2.3,1.9-2.3
					c0.5,0,0.9,0.2,1.3,0.6v-2.2h1.4v6L412.9,275.8L412.9,275.8z M412.9,274.3V273c-0.2-0.2-0.5-0.4-0.8-0.4c-0.5,0-1,0.4-1,1.1
					s0.4,1.1,1,1.1C412.3,274.6,412.7,274.5,412.9,274.3z"
              />
              <path
                className="st6"
                d="M415.5,270.2c0-0.4,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8s-0.4,0.8-0.8,0.8S415.5,270.7,415.5,270.2z
					 M415.6,275.8v-4.3h1.4v4.3H415.6z"
              />
              <path
                className="st6"
                d="M421.3,275.8v-2.5c0-0.5-0.3-0.7-0.7-0.7c-0.4,0-0.7,0.2-0.8,0.4v2.8h-1.4v-4.3h1.4v0.5
					c0.3-0.3,0.8-0.6,1.5-0.6c1,0,1.4,0.6,1.4,1.4v3.1L421.3,275.8L421.3,275.8z"
              />
              <path
                className="st6"
                d="M426.3,275.8v-0.4c-0.3,0.3-0.8,0.5-1.4,0.5c-0.7,0-1.5-0.5-1.5-1.4c0-1.1,0.8-1.4,1.5-1.4
					c0.6,0,1.1,0.2,1.4,0.5v-0.4c0-0.4-0.3-0.6-0.9-0.6c-0.4,0-0.9,0.2-1.2,0.5l-0.5-1c0.6-0.5,1.3-0.7,2-0.7c1,0,2,0.4,2,1.7v2.7
					L426.3,275.8L426.3,275.8z M426.3,274.6v-0.4c-0.1-0.2-0.5-0.3-0.8-0.3c-0.4,0-0.7,0.2-0.7,0.5s0.3,0.5,0.7,0.5
					C425.8,275,426.1,274.9,426.3,274.6z"
              />
              <path
                className="st6"
                d="M428.8,274.6v-2h-0.7v-1.2h0.7v-1.2h1.4v1.2h0.9v1.2h-0.9v1.6c0,0.3,0.1,0.4,0.4,0.4c0.2,0,0.3-0.1,0.4-0.1
					l0.3,1c-0.2,0.2-0.5,0.3-1,0.3C429.3,275.9,428.8,275.4,428.8,274.6z"
              />
              <path
                className="st6"
                d="M431.7,270.2c0-0.4,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8s-0.4,0.8-0.8,0.8S431.7,270.7,431.7,270.2z
					 M431.8,275.8v-4.3h1.4v4.3H431.8z"
              />
              <path
                className="st6"
                d="M434.2,273.6c0-1.2,0.9-2.3,2.4-2.3s2.4,1.1,2.4,2.3s-0.9,2.3-2.4,2.3S434.2,274.8,434.2,273.6z
					 M437.5,273.6c0-0.6-0.3-1.1-1-1.1c-0.6,0-0.9,0.5-0.9,1.1s0.3,1.1,0.9,1.1C437.2,274.6,437.5,274.2,437.5,273.6z"
              />
              <path
                className="st6"
                d="M442.7,275.8v-2.5c0-0.5-0.3-0.7-0.7-0.7c-0.4,0-0.7,0.2-0.8,0.4v2.8h-1.4v-4.3h1.4v0.5
					c0.3-0.3,0.8-0.6,1.5-0.6c1,0,1.4,0.6,1.4,1.4v3.1L442.7,275.8L442.7,275.8z"
              />
            </g>
          </motion.g>
        </g>
        <g>
          <motion.g
            filter={isExpandedDefault ? "url(#glow)" : undefined}
            animate={{
              opacity: isExpandedDefault ? 1 : 0,
              y: isExpandedDefault ? 0 : 10,
            }}
            transition={{
              delay: 1.7 * 0.7,
            }}
          >
            <g>
              <path
                className="st6"
                d="M379.2,227.8v-6h4.4v1.4h-2.9v0.9h2.8v1.3h-2.8v2.4L379.2,227.8L379.2,227.8z"
              />
              <path
                className="st6"
                d="M387.4,227.8v-0.5c-0.3,0.3-0.8,0.6-1.5,0.6c-1,0-1.4-0.6-1.4-1.4v-3.1h1.4v2.5c0,0.5,0.3,0.7,0.7,0.7
					c0.4,0,0.7-0.2,0.8-0.4v-2.8h1.4v4.3L387.4,227.8L387.4,227.8z"
              />
              <path
                className="st6"
                d="M392.8,227.8v-2.5c0-0.5-0.3-0.7-0.7-0.7c-0.4,0-0.7,0.2-0.8,0.4v2.8h-1.4v-4.3h1.4v0.5
					c0.3-0.3,0.8-0.6,1.5-0.6c1,0,1.4,0.6,1.4,1.4v3.1L392.8,227.8L392.8,227.8z"
              />
              <path
                className="st6"
                d="M398.2,227.8v-0.5c-0.4,0.4-0.8,0.6-1.3,0.6c-1.1,0-1.9-0.8-1.9-2.3c0-1.4,0.8-2.3,1.9-2.3
					c0.5,0,0.9,0.2,1.3,0.6v-2.2h1.4v6L398.2,227.8L398.2,227.8z M398.2,226.3V225c-0.2-0.2-0.5-0.4-0.8-0.4c-0.5,0-1,0.4-1,1.1
					s0.4,1.1,1,1.1C397.7,226.7,398,226.6,398.2,226.3z"
              />
              <path
                className="st6"
                d="M400.5,222.3c0-0.4,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8c0,0.4-0.4,0.8-0.8,0.8S400.5,222.7,400.5,222.3z
					 M400.6,227.8v-4.3h1.4v4.3H400.6z"
              />
              <path
                className="st6"
                d="M406.3,227.8v-2.5c0-0.5-0.3-0.7-0.7-0.7c-0.4,0-0.7,0.2-0.8,0.4v2.8h-1.4v-4.3h1.4v0.5
					c0.3-0.3,0.8-0.6,1.5-0.6c1,0,1.4,0.6,1.4,1.4v3.1L406.3,227.8L406.3,227.8z"
              />
              <path
                className="st6"
                d="M408.7,228.9l0.6-1c0.3,0.4,0.8,0.5,1.3,0.5s1.1-0.2,1.1-1v-0.3c-0.4,0.4-0.8,0.6-1.3,0.6
					c-1.1,0-1.9-0.7-1.9-2.2c0-1.4,0.8-2.2,1.9-2.2c0.5,0,0.9,0.2,1.3,0.6v-0.5h1.4v4c0,1.8-1.4,2.1-2.5,2.1
					C409.8,229.6,409.2,229.4,408.7,228.9z M411.7,226.1V225c-0.2-0.2-0.5-0.4-0.8-0.4c-0.5,0-1,0.3-1,1c0,0.6,0.4,1,1,1
					C411.2,226.5,411.5,226.4,411.7,226.1z"
              />
              <path
                className="st6"
                d="M418.7,227.8v-0.4c-0.3,0.3-0.8,0.5-1.4,0.5c-0.7,0-1.5-0.5-1.5-1.4c0-1.1,0.8-1.4,1.5-1.4
					c0.6,0,1.1,0.2,1.4,0.5v-0.4c0-0.4-0.3-0.6-0.9-0.6c-0.4,0-0.9,0.2-1.2,0.5l-0.5-1c0.6-0.5,1.3-0.7,2-0.7c1,0,2,0.4,2,1.7v2.7
					L418.7,227.8L418.7,227.8z M418.7,226.7v-0.4c-0.1-0.2-0.5-0.3-0.8-0.3c-0.4,0-0.7,0.2-0.7,0.5s0.3,0.5,0.7,0.5
					C418.3,227,418.6,226.9,418.7,226.7z"
              />
              <path
                className="st6"
                d="M424,227.8v-2.5c0-0.5-0.3-0.7-0.7-0.7c-0.4,0-0.7,0.2-0.8,0.4v2.8H421v-4.3h1.4v0.5
					c0.3-0.3,0.8-0.6,1.5-0.6c1,0,1.4,0.6,1.4,1.4v3.1L424,227.8L424,227.8z"
              />
              <path
                className="st6"
                d="M429.3,227.8v-0.5c-0.4,0.4-0.8,0.6-1.3,0.6c-1.1,0-1.9-0.8-1.9-2.3c0-1.4,0.8-2.3,1.9-2.3
					c0.5,0,0.9,0.2,1.3,0.6v-2.2h1.4v6L429.3,227.8L429.3,227.8z M429.3,226.3V225c-0.2-0.2-0.5-0.4-0.8-0.4c-0.5,0-1,0.4-1,1.1
					s0.4,1.1,1,1.1C428.8,226.7,429.2,226.6,429.3,226.3z"
              />
              <path
                className="st6"
                d="M379.9,236.3v2.2h-1.4v-6h1.4v0.5c0.3-0.4,0.8-0.6,1.3-0.6c1.1,0,1.9,0.8,1.9,2.3s-0.8,2.3-1.9,2.3
					C380.7,236.9,380.3,236.7,379.9,236.3z M381.7,234.6c0-0.6-0.4-1.1-1-1.1c-0.3,0-0.7,0.2-0.8,0.4v1.3c0.2,0.2,0.5,0.4,0.8,0.4
					C381.3,235.7,381.7,235.3,381.7,234.6z"
              />
              <path
                className="st6"
                d="M383.9,236.8v-4.3h1.4v0.5c0.3-0.4,0.8-0.6,1.4-0.6v1.3c-0.1,0-0.2,0-0.3,0c-0.4,0-0.8,0.2-1,0.4v2.8
					L383.9,236.8L383.9,236.8z"
              />
              <path
                className="st6"
                d="M386.9,234.6c0-1.2,0.9-2.3,2.4-2.3s2.4,1.1,2.4,2.3s-0.9,2.3-2.4,2.3C387.8,236.9,386.9,235.9,386.9,234.6
					z M390.2,234.6c0-0.6-0.3-1.1-1-1.1c-0.6,0-0.9,0.5-0.9,1.1s0.3,1.1,0.9,1.1C389.8,235.7,390.2,235.2,390.2,234.6z"
              />
              <path
                className="st6"
                d="M392.1,234.6c0-1.4,1-2.3,2.4-2.3c0.9,0,1.5,0.4,1.8,0.8l-0.9,0.8c-0.2-0.3-0.5-0.4-0.8-0.4
					c-0.6,0-1,0.4-1,1.1s0.4,1.1,1,1.1c0.4,0,0.6-0.2,0.8-0.4l0.9,0.8c-0.3,0.4-0.8,0.8-1.8,0.8C393.1,236.9,392.1,236,392.1,234.6z
					"
              />
              <path
                className="st6"
                d="M399.6,236.8v-0.5c-0.3,0.3-0.8,0.6-1.5,0.6c-1,0-1.4-0.6-1.4-1.4v-3.1h1.4v2.5c0,0.5,0.3,0.7,0.7,0.7
					c0.4,0,0.7-0.2,0.8-0.4v-2.8h1.4v4.3L399.6,236.8L399.6,236.8z"
              />
              <path
                className="st6"
                d="M402.1,236.8v-4.3h1.4v0.5c0.3-0.4,0.8-0.6,1.4-0.6v1.3c-0.1,0-0.2,0-0.3,0c-0.4,0-0.8,0.2-1,0.4v2.8
					L402.1,236.8L402.1,236.8z"
              />
              <path
                className="st6"
                d="M405.1,234.6c0-1.3,0.9-2.3,2.3-2.3c1.3,0,2.2,0.9,2.2,2.4v0.3h-3.1c0.1,0.4,0.5,0.7,1.1,0.7
					c0.3,0,0.8-0.1,1.1-0.4l0.6,0.9c-0.4,0.4-1.2,0.6-1.8,0.6C406.1,236.9,405.1,236.1,405.1,234.6z M407.4,233.5
					c-0.6,0-0.8,0.4-0.9,0.7h1.8C408.2,233.9,408,233.5,407.4,233.5z"
              />
              <path
                className="st6"
                d="M416.1,236.8v-2.6c0-0.3-0.2-0.6-0.6-0.6s-0.6,0.2-0.8,0.4v2.8h-1.4v-2.6c0-0.3-0.2-0.6-0.6-0.6
					s-0.6,0.2-0.8,0.4v2.8h-1.4v-4.3h1.4v0.5c0.2-0.3,0.7-0.6,1.4-0.6c0.6,0,1.1,0.3,1.2,0.8c0.3-0.4,0.8-0.8,1.5-0.8
					c0.8,0,1.3,0.4,1.3,1.3v3.2L416.1,236.8L416.1,236.8z"
              />
              <path
                className="st6"
                d="M418.2,234.6c0-1.3,0.9-2.3,2.3-2.3c1.3,0,2.2,0.9,2.2,2.4v0.3h-3.1c0.1,0.4,0.5,0.7,1.1,0.7
					c0.3,0,0.8-0.1,1.1-0.4l0.6,0.9c-0.4,0.4-1.2,0.6-1.8,0.6C419.2,236.9,418.2,236.1,418.2,234.6z M420.5,233.5
					c-0.6,0-0.8,0.4-0.9,0.7h1.8C421.4,233.9,421.1,233.5,420.5,233.5z"
              />
              <path
                className="st6"
                d="M426.7,236.8v-2.5c0-0.5-0.3-0.7-0.7-0.7c-0.4,0-0.7,0.2-0.8,0.4v2.8h-1.4v-4.3h1.4v0.5
					c0.3-0.3,0.8-0.6,1.5-0.6c1,0,1.4,0.6,1.4,1.4v3.1L426.7,236.8L426.7,236.8z"
              />
              <path
                className="st6"
                d="M429.4,235.7v-2h-0.7v-1.2h0.7v-1.2h1.4v1.2h0.9v1.2h-0.9v1.6c0,0.3,0.1,0.4,0.4,0.4c0.2,0,0.3-0.1,0.4-0.1
					l0.3,1c-0.2,0.2-0.5,0.3-1,0.3C429.9,236.9,429.4,236.5,429.4,235.7z"
              />
            </g>
          </motion.g>
        </g>
        <g>
          <motion.g
            filter={isExpandedDefault ? "url(#glow)" : undefined}
            animate={{
              opacity: isExpandedDefault ? 1 : 0,
              y: isExpandedDefault ? 0 : 10,
            }}
            transition={{
              delay: 1.8 * 0.7,
            }}
          >
            <path
              className="st6"
              d="M354.2,188.9v-6h2.5c1.9,0,3.2,1.1,3.2,3s-1.4,3-3.2,3H354.2z M358.4,185.9c0-0.9-0.6-1.6-1.7-1.6h-1v3.3h1
				C357.8,187.5,358.4,186.8,358.4,185.9z"
            />
            <path
              className="st6"
              d="M360.5,183.4c0-0.4,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8c0,0.4-0.4,0.8-0.8,0.8S360.5,183.8,360.5,183.4z
				 M360.6,188.9v-4.3h1.4v4.3H360.6z"
            />
            <path
              className="st6"
              d="M363.2,190l0.6-1c0.3,0.4,0.8,0.5,1.3,0.5s1.1-0.2,1.1-1v-0.3c-0.4,0.4-0.8,0.6-1.3,0.6
				c-1.1,0-1.9-0.7-1.9-2.2c0-1.4,0.8-2.2,1.9-2.2c0.5,0,0.9,0.2,1.3,0.6v-0.5h1.4v4c0,1.8-1.4,2.1-2.5,2.1
				C364.4,190.7,363.8,190.5,363.2,190z M366.2,187.2V186c-0.2-0.2-0.5-0.4-0.8-0.4c-0.5,0-1,0.3-1,1c0,0.6,0.4,1,1,1
				C365.7,187.6,366.1,187.4,366.2,187.2z"
            />
            <path
              className="st6"
              d="M368.5,183.4c0-0.4,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8c0,0.4-0.4,0.8-0.8,0.8
				C368.8,184.2,368.5,183.8,368.5,183.4z M368.6,188.9v-4.3h1.4v4.3H368.6z"
            />
            <path
              className="st6"
              d="M371.6,187.7v-2h-0.7v-1.2h0.7v-1.2h1.4v1.2h0.9v1.2H373v1.6c0,0.3,0.1,0.4,0.4,0.4c0.2,0,0.3-0.1,0.4-0.1
				l0.3,1c-0.2,0.2-0.5,0.3-1,0.3C372.1,189,371.6,188.6,371.6,187.7z"
            />
            <path
              className="st6"
              d="M377.1,188.9v-0.4c-0.3,0.3-0.8,0.5-1.4,0.5c-0.7,0-1.5-0.5-1.5-1.4c0-1.1,0.8-1.4,1.5-1.4
				c0.6,0,1.1,0.2,1.4,0.5v-0.4c0-0.4-0.3-0.6-0.9-0.6c-0.4,0-0.9,0.2-1.2,0.5l-0.5-1c0.6-0.5,1.3-0.7,2-0.7c1,0,2,0.4,2,1.7v2.7
				L377.1,188.9L377.1,188.9z M377.1,187.8v-0.4c-0.1-0.2-0.5-0.3-0.8-0.3c-0.4,0-0.7,0.2-0.7,0.5s0.3,0.5,0.7,0.5
				C376.6,188.1,377,188,377.1,187.8z"
            />
            <path className="st6" d="M379.4,188.9v-6h1.4v6H379.4z" />
            <path
              className="st6"
              d="M385.5,188.4v2.2h-1.4v-6h1.4v0.5c0.3-0.4,0.8-0.6,1.3-0.6c1.1,0,1.9,0.8,1.9,2.3s-0.8,2.3-1.9,2.3
				C386.3,189,385.9,188.8,385.5,188.4z M387.3,186.7c0-0.6-0.4-1.1-1-1.1c-0.3,0-0.7,0.2-0.8,0.4v1.3c0.2,0.2,0.5,0.4,0.8,0.4
				C386.9,187.8,387.3,187.4,387.3,186.7z"
            />
            <path
              className="st6"
              d="M392.4,188.9v-0.5c-0.3,0.3-0.8,0.6-1.5,0.6c-1,0-1.4-0.6-1.4-1.4v-3.1h1.4v2.5c0,0.5,0.3,0.7,0.7,0.7
				c0.4,0,0.7-0.2,0.8-0.4v-2.8h1.4v4.3L392.4,188.9L392.4,188.9z"
            />
            <path
              className="st6"
              d="M394.8,188.9v-6h1.4v2.2c0.3-0.4,0.8-0.6,1.3-0.6c1.1,0,1.9,0.9,1.9,2.3c0,1.5-0.8,2.3-1.9,2.3
				c-0.5,0-0.9-0.2-1.3-0.6v0.5L394.8,188.9L394.8,188.9z M397.1,187.8c0.5,0,1-0.4,1-1.1c0-0.6-0.4-1.1-1-1.1
				c-0.3,0-0.7,0.2-0.8,0.4v1.3C396.4,187.6,396.8,187.8,397.1,187.8z"
            />
            <path className="st6" d="M400.2,188.9v-6h1.4v6H400.2z" />
            <path
              className="st6"
              d="M402.8,183.4c0-0.4,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8c0,0.4-0.4,0.8-0.8,0.8S402.8,183.8,402.8,183.4z
				 M402.9,188.9v-4.3h1.4v4.3H402.9z"
            />
            <path
              className="st6"
              d="M405.4,186.7c0-1.4,1-2.3,2.4-2.3c0.9,0,1.5,0.4,1.8,0.8l-0.9,0.8c-0.2-0.3-0.4-0.4-0.8-0.4
				c-0.6,0-1,0.4-1,1.1s0.4,1.1,1,1.1c0.4,0,0.6-0.2,0.8-0.4l0.9,0.8c-0.3,0.4-0.8,0.8-1.8,0.8C406.4,189,405.4,188.1,405.4,186.7z"
            />
            <path
              className="st6"
              d="M364.5,197.3l0.6-1c0.3,0.3,1,0.6,1.5,0.6c0.4,0,0.6-0.1,0.6-0.3c0-0.5-2.5,0-2.5-1.7c0-0.8,0.7-1.4,1.9-1.4
				c0.7,0,1.4,0.2,1.8,0.6l-0.5,1c-0.3-0.3-0.8-0.5-1.3-0.5c-0.3,0-0.5,0.1-0.5,0.3c0,0.5,2.5,0,2.5,1.8c0,0.8-0.7,1.4-2,1.4
				C365.8,198,365,197.7,364.5,197.3z"
            />
            <path
              className="st6"
              d="M369.1,195.7c0-1.3,0.9-2.3,2.3-2.3c1.3,0,2.2,0.9,2.2,2.4v0.3h-3.1c0.1,0.4,0.5,0.7,1.1,0.7
				c0.3,0,0.8-0.1,1.1-0.4l0.6,0.9c-0.4,0.4-1.2,0.6-1.8,0.6C370.1,198,369.1,197.1,369.1,195.7z M371.4,194.6
				c-0.6,0-0.8,0.4-0.9,0.7h1.8C372.2,194.9,372,194.6,371.4,194.6z"
            />
            <path
              className="st6"
              d="M374.6,197.9v-4.3h1.4v0.5c0.3-0.4,0.8-0.6,1.4-0.6v1.3c-0.1,0-0.2,0-0.3,0c-0.4,0-0.8,0.2-1,0.4v2.8
				L374.6,197.9L374.6,197.9z"
            />
            <path
              className="st6"
              d="M379,197.9l-1.7-4.3h1.5l1,2.8l1-2.8h1.5l-1.7,4.3H379z"
            />
            <path
              className="st6"
              d="M382.6,192.4c0-0.4,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8c0,0.4-0.4,0.8-0.8,0.8S382.6,192.8,382.6,192.4z
				 M382.7,197.9v-4.3h1.4v4.3H382.7z"
            />
            <path
              className="st6"
              d="M385.2,195.7c0-1.4,1-2.3,2.4-2.3c0.9,0,1.5,0.4,1.8,0.8l-0.9,0.8c-0.2-0.3-0.5-0.4-0.8-0.4
				c-0.6,0-1,0.4-1,1.1s0.4,1.1,1,1.1c0.4,0,0.6-0.2,0.8-0.4l0.9,0.8c-0.3,0.4-0.8,0.8-1.8,0.8C386.2,198,385.2,197.1,385.2,195.7z"
            />
            <path
              className="st6"
              d="M389.5,195.7c0-1.3,0.9-2.3,2.3-2.3c1.3,0,2.2,0.9,2.2,2.4v0.3h-3c0.1,0.4,0.5,0.7,1.1,0.7
				c0.3,0,0.8-0.1,1.1-0.4l0.6,0.9c-0.4,0.4-1.2,0.6-1.8,0.6C390.5,198,389.5,197.1,389.5,195.7z M391.8,194.6
				c-0.6,0-0.8,0.4-0.9,0.7h1.8C392.7,194.9,392.5,194.6,391.8,194.6z"
            />
            <path
              className="st6"
              d="M394.7,197.3l0.6-1c0.3,0.3,1,0.6,1.5,0.6c0.4,0,0.6-0.1,0.6-0.3c0-0.5-2.5,0-2.5-1.7c0-0.8,0.7-1.4,1.9-1.4
				c0.7,0,1.4,0.2,1.8,0.6l-0.5,1c-0.3-0.3-0.8-0.5-1.3-0.5c-0.3,0-0.5,0.1-0.5,0.3c0,0.5,2.5,0,2.5,1.8c0,0.8-0.7,1.4-2,1.4
				C396,198,395.2,197.7,394.7,197.3z"
            />
          </motion.g>
        </g>
        <motion.g
          filter={isExpandedDefault ? "url(#glow)" : undefined}
          animate={{
            opacity: isExpandedDefault ? 1 : 0,
            y: isExpandedDefault ? 0 : 10,
          }}
          transition={{
            delay: 1.4 * 0.7,
          }}
        >
          <path
            className="st6"
            d="M347.1,341.6c0-1.9,1.4-3.1,3.2-3.1c1.5,0,2.2,0.8,2.6,1.6l-1.3,0.6c-0.2-0.5-0.7-0.9-1.3-0.9
			c-1,0-1.7,0.7-1.7,1.7s0.7,1.7,1.7,1.7c0.6,0,1.1-0.4,1.3-0.9l1.3,0.6c-0.4,0.8-1.2,1.6-2.6,1.6
			C348.5,344.7,347.1,343.5,347.1,341.6z"
          />
          <path
            className="st6"
            d="M356.2,344.6v-0.4c-0.3,0.3-0.8,0.5-1.3,0.5c-0.7,0-1.5-0.5-1.5-1.4c0-1.1,0.8-1.4,1.5-1.4
			c0.6,0,1.1,0.2,1.3,0.5V342c0-0.4-0.3-0.6-0.9-0.6c-0.4,0-0.9,0.2-1.2,0.5l-0.5-1c0.6-0.5,1.3-0.7,2-0.7c1,0,2,0.4,2,1.7v2.7
			H356.2z M356.2,343.5v-0.4c-0.1-0.2-0.5-0.3-0.8-0.3c-0.4,0-0.7,0.2-0.7,0.5s0.3,0.5,0.7,0.5C355.8,343.8,356.1,343.7,356.2,343.5
			z"
          />
          <path
            className="st6"
            d="M360.1,344.1v2.2h-1.4v-6h1.4v0.5c0.3-0.4,0.8-0.6,1.3-0.6c1.1,0,1.9,0.8,1.9,2.3s-0.8,2.3-1.9,2.3
			C360.9,344.7,360.4,344.6,360.1,344.1z M361.8,342.5c0-0.6-0.4-1.1-1-1.1c-0.3,0-0.7,0.2-0.8,0.4v1.3c0.2,0.2,0.5,0.4,0.8,0.4
			C361.4,343.5,361.8,343.1,361.8,342.5z"
          />
          <path
            className="st6"
            d="M366.6,344.6v-0.4c-0.3,0.3-0.8,0.5-1.4,0.5c-0.7,0-1.5-0.5-1.5-1.4c0-1.1,0.8-1.4,1.5-1.4
			c0.6,0,1.1,0.2,1.4,0.5V342c0-0.4-0.3-0.6-0.9-0.6c-0.4,0-0.9,0.2-1.2,0.5l-0.5-1c0.6-0.5,1.3-0.7,2-0.7c1,0,2,0.4,2,1.7v2.7
			H366.6z M366.6,343.5v-0.4c-0.1-0.2-0.5-0.3-0.8-0.3c-0.4,0-0.7,0.2-0.7,0.5s0.3,0.5,0.7,0.5C366.1,343.8,366.4,343.7,366.6,343.5
			z"
          />
          <path
            className="st6"
            d="M369,344.6v-6h1.4v2.2c0.3-0.4,0.8-0.6,1.3-0.6c1.1,0,1.9,0.9,1.9,2.3c0,1.5-0.8,2.3-1.9,2.3
			c-0.5,0-0.9-0.2-1.3-0.6v0.5L369,344.6L369,344.6z M371.2,343.5c0.5,0,1-0.4,1-1.1c0-0.6-0.4-1.1-1-1.1c-0.3,0-0.7,0.2-0.8,0.4
			v1.3C370.6,343.4,371,343.5,371.2,343.5z"
          />
          <path
            className="st6"
            d="M374.3,339.1c0-0.4,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8s-0.4,0.8-0.8,0.8S374.3,339.5,374.3,339.1z M374.4,344.6
			v-4.3h1.4v4.3H374.4z"
          />
          <path className="st6" d="M376.9,344.6v-6h1.4v6H376.9z" />
          <path
            className="st6"
            d="M379.2,339.1c0-0.4,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8s-0.4,0.8-0.8,0.8S379.2,339.5,379.2,339.1z M379.3,344.6
			v-4.3h1.4v4.3H379.3z"
          />
          <path
            className="st6"
            d="M382,343.5v-2h-0.7v-1.2h0.7v-1.2h1.4v1.2h0.9v1.2h-0.9v1.6c0,0.3,0.1,0.4,0.4,0.4c0.2,0,0.3-0.1,0.4-0.1
			l0.3,1c-0.2,0.2-0.5,0.3-1,0.3C382.5,344.7,382,344.3,382,343.5z"
          />
          <path
            className="st6"
            d="M384.9,339.1c0-0.4,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8s-0.4,0.8-0.8,0.8S384.9,339.5,384.9,339.1z M385,344.6
			v-4.3h1.4v4.3H385z"
          />
          <path
            className="st6"
            d="M387.2,342.5c0-1.3,0.9-2.3,2.3-2.3c1.3,0,2.2,0.9,2.2,2.4v0.3h-3.1c0.1,0.4,0.5,0.7,1.1,0.7
			c0.3,0,0.8-0.1,1.1-0.4l0.6,0.9c-0.4,0.4-1.2,0.6-1.8,0.6C388.2,344.7,387.2,343.9,387.2,342.5z M389.5,341.3
			c-0.6,0-0.8,0.4-0.9,0.7h1.8C390.4,341.7,390.2,341.3,389.5,341.3z"
          />
          <path
            className="st6"
            d="M392.1,344.1l0.6-1c0.3,0.3,1,0.6,1.5,0.6c0.4,0,0.6-0.1,0.6-0.3c0-0.5-2.5,0-2.5-1.7c0-0.8,0.7-1.4,1.9-1.4
			c0.7,0,1.4,0.2,1.8,0.6l-0.5,1c-0.3-0.3-0.8-0.5-1.3-0.5c-0.3,0-0.5,0.1-0.5,0.3c0,0.5,2.5,0,2.5,1.8c0,0.8-0.7,1.4-2,1.4
			C393.4,344.7,392.6,344.5,392.1,344.1z"
          />
        </motion.g>
      </g>
      <g id="Layer_16">
        <g>
          <motion.g
            filter={isExpandedDefault ? "url(#glow)" : undefined}
            animate={{
              opacity: isExpandedDefault ? 1 : 0,
              y: isExpandedDefault ? 0 : 10,
            }}
            transition={{
              delay: 1.9 * 0.7,
            }}
          >
            <path className="st7" d="M335.8,133.6v-6h1.5v6H335.8z" />
            <path
              className="st7"
              d="M341.5,133.6v-2.5c0-0.5-0.3-0.7-0.7-0.7c-0.4,0-0.7,0.2-0.8,0.4v2.8h-1.4v-4.3h1.4v0.5
				c0.3-0.3,0.8-0.6,1.5-0.6c1,0,1.4,0.6,1.4,1.4v3.1L341.5,133.6L341.5,133.6z"
            />
            <path
              className="st7"
              d="M346.9,133.6v-2.5c0-0.5-0.3-0.7-0.7-0.7c-0.4,0-0.7,0.2-0.8,0.4v2.8H344v-4.3h1.4v0.5
				c0.3-0.3,0.8-0.6,1.5-0.6c1,0,1.4,0.6,1.4,1.4v3.1L346.9,133.6L346.9,133.6z"
            />
            <path
              className="st7"
              d="M349,131.5c0-1.2,0.9-2.3,2.4-2.3s2.4,1.1,2.4,2.3s-0.9,2.3-2.4,2.3C349.9,133.7,349,132.7,349,131.5z
				 M352.3,131.5c0-0.6-0.3-1.1-1-1.1c-0.6,0-0.9,0.5-0.9,1.1s0.3,1.1,0.9,1.1C352,132.5,352.3,132,352.3,131.5z"
            />
            <path
              className="st7"
              d="M355.6,133.6l-1.7-4.3h1.5l1,2.8l1-2.8h1.5l-1.7,4.3H355.6z"
            />
            <path
              className="st7"
              d="M361.9,133.6v-0.4c-0.3,0.3-0.8,0.5-1.4,0.5c-0.7,0-1.5-0.5-1.5-1.4c0-1.1,0.8-1.4,1.5-1.4
				c0.6,0,1.1,0.2,1.4,0.5V131c0-0.4-0.3-0.6-0.9-0.6c-0.4,0-0.9,0.2-1.2,0.5l-0.5-1c0.6-0.5,1.3-0.7,2-0.7c1,0,2,0.4,2,1.7v2.7
				L361.9,133.6L361.9,133.6z M361.9,132.5v-0.4c-0.1-0.2-0.5-0.3-0.8-0.3c-0.4,0-0.7,0.2-0.7,0.5s0.3,0.5,0.7,0.5
				C361.4,132.8,361.8,132.7,361.9,132.5z"
            />
            <path
              className="st7"
              d="M364.5,132.5v-2h-0.7v-1.2h0.7v-1.2h1.4v1.2h0.9v1.2h-0.9v1.6c0,0.3,0.1,0.4,0.4,0.4c0.2,0,0.3-0.1,0.4-0.1
				l0.3,1c-0.2,0.2-0.5,0.3-1,0.3C364.9,133.7,364.5,133.3,364.5,132.5z"
            />
            <path
              className="st7"
              d="M367.3,128.1c0-0.4,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8c0,0.4-0.4,0.8-0.8,0.8
				C367.7,128.9,367.3,128.5,367.3,128.1z M367.4,133.6v-4.3h1.4v4.3H367.4z"
            />
            <path
              className="st7"
              d="M369.8,131.5c0-1.2,0.9-2.3,2.4-2.3s2.4,1.1,2.4,2.3s-0.9,2.3-2.4,2.3C370.7,133.7,369.8,132.7,369.8,131.5z
				 M373.1,131.5c0-0.6-0.3-1.1-1-1.1c-0.6,0-0.9,0.5-0.9,1.1s0.3,1.1,0.9,1.1C372.8,132.5,373.1,132,373.1,131.5z"
            />
            <path
              className="st7"
              d="M378.3,133.6v-2.5c0-0.5-0.3-0.7-0.7-0.7c-0.4,0-0.7,0.2-0.8,0.4v2.8h-1.4v-4.3h1.4v0.5
				c0.3-0.3,0.8-0.6,1.5-0.6c1,0,1.4,0.6,1.4,1.4v3.1L378.3,133.6L378.3,133.6z"
            />
            <path
              className="st7"
              d="M335.6,140.5c0-1.3,0.9-2.3,2.3-2.3c1.3,0,2.2,0.9,2.2,2.4v0.3H337c0.1,0.4,0.5,0.7,1.1,0.7
				c0.3,0,0.8-0.1,1.1-0.4l0.6,0.9c-0.4,0.4-1.2,0.6-1.8,0.6C336.6,142.7,335.6,141.9,335.6,140.5z M337.9,139.3
				c-0.6,0-0.8,0.4-0.9,0.7h1.8C338.8,139.7,338.5,139.3,337.9,139.3z"
            />
            <path
              className="st7"
              d="M340.8,140.5c0-1.4,1-2.3,2.4-2.3c0.9,0,1.5,0.4,1.8,0.8l-0.9,0.8c-0.2-0.3-0.5-0.4-0.8-0.4
				c-0.6,0-1,0.4-1,1.1s0.4,1.1,1,1.1c0.4,0,0.6-0.2,0.8-0.4l0.9,0.8c-0.3,0.4-0.8,0.8-1.8,0.8C341.8,142.7,340.8,141.8,340.8,140.5
				z"
            />
            <path
              className="st7"
              d="M345.1,140.5c0-1.2,0.9-2.3,2.4-2.3s2.4,1.1,2.4,2.3s-0.9,2.3-2.4,2.3C346,142.7,345.1,141.7,345.1,140.5z
				 M348.4,140.5c0-0.6-0.3-1.1-1-1.1c-0.6,0-0.9,0.5-0.9,1.1s0.3,1.1,0.9,1.1C348.1,141.5,348.4,141,348.4,140.5z"
            />
            <path
              className="st7"
              d="M350.2,142.1l0.6-1c0.3,0.3,1,0.6,1.5,0.6c0.4,0,0.6-0.1,0.6-0.3c0-0.5-2.5,0-2.5-1.7c0-0.8,0.7-1.4,1.9-1.4
				c0.7,0,1.4,0.2,1.8,0.6l-0.5,1c-0.3-0.3-0.8-0.5-1.3-0.5c-0.3,0-0.5,0.1-0.5,0.3c0,0.5,2.5,0,2.5,1.8c0,0.8-0.7,1.4-2,1.4
				C351.5,142.7,350.7,142.5,350.2,142.1z"
            />
            <path
              className="st7"
              d="M355.1,143.1c0.1,0.1,0.2,0.1,0.3,0.1c0.3,0,0.5-0.1,0.6-0.2l0.1-0.2l-1.7-4.4h1.5l1,2.8l1-2.8h1.5l-2,5
				c-0.4,0.9-1,1.1-1.8,1.1c-0.1,0-0.5,0-0.6-0.1L355.1,143.1z"
            />
            <path
              className="st7"
              d="M359.5,142.1l0.6-1c0.3,0.3,1,0.6,1.5,0.6c0.4,0,0.6-0.1,0.6-0.3c0-0.5-2.5,0-2.5-1.7c0-0.8,0.7-1.4,1.9-1.4
				c0.7,0,1.4,0.2,1.8,0.6l-0.5,1c-0.3-0.3-0.8-0.5-1.3-0.5c-0.3,0-0.5,0.1-0.5,0.3c0,0.5,2.5,0,2.5,1.8c0,0.8-0.7,1.4-2,1.4
				C360.7,142.7,359.9,142.5,359.5,142.1z"
            />
            <path
              className="st7"
              d="M364.5,141.5v-2h-0.7v-1.2h0.7v-1.2h1.4v1.2h0.9v1.2h-0.9v1.6c0,0.3,0.1,0.4,0.4,0.4c0.2,0,0.3-0.1,0.4-0.1
				l0.3,1c-0.2,0.2-0.5,0.3-1,0.3C365,142.7,364.5,142.3,364.5,141.5z"
            />
            <path
              className="st7"
              d="M367.2,140.5c0-1.3,0.9-2.3,2.3-2.3c1.3,0,2.2,0.9,2.2,2.4v0.3h-3.1c0.1,0.4,0.5,0.7,1.1,0.7
				c0.3,0,0.8-0.1,1.1-0.4l0.6,0.9c-0.4,0.4-1.2,0.6-1.8,0.6C368.2,142.7,367.2,141.9,367.2,140.5z M369.5,139.3
				c-0.6,0-0.8,0.4-0.9,0.7h1.8C370.4,139.7,370.1,139.3,369.5,139.3z"
            />
            <path
              className="st7"
              d="M378.2,142.6V140c0-0.3-0.2-0.6-0.6-0.6s-0.6,0.2-0.8,0.4v2.8h-1.4V140c0-0.3-0.2-0.6-0.6-0.6
				s-0.6,0.2-0.8,0.4v2.8h-1.4v-4.3h1.4v0.5c0.2-0.3,0.7-0.6,1.4-0.6c0.6,0,1.1,0.3,1.2,0.8c0.3-0.4,0.8-0.8,1.5-0.8
				c0.8,0,1.3,0.4,1.3,1.3v3.2L378.2,142.6L378.2,142.6z"
            />
          </motion.g>
        </g>
        <g>
          <motion.g
            filter={isExpandedDefault ? "url(#glow)" : undefined}
            animate={{
              opacity: isExpandedDefault ? 1 : 0,
              y: isExpandedDefault ? 0 : 10,
            }}
            transition={{
              delay: 2 * 0.7,
            }}
          >
            <path
              className="st7"
              d="M265.2,92c0-1.9,1.4-3.1,3.2-3.1c1.4,0,2.2,0.8,2.6,1.6l-1.3,0.6c-0.2-0.5-0.7-0.9-1.3-0.9
				c-1,0-1.7,0.7-1.7,1.7s0.7,1.7,1.7,1.7c0.6,0,1.1-0.4,1.3-0.9l1.3,0.6c-0.4,0.8-1.2,1.6-2.6,1.6C266.6,95.1,265.2,93.8,265.2,92z
				"
            />
            <path
              className="st7"
              d="M271.4,92.8c0-1.2,0.9-2.3,2.4-2.3s2.4,1.1,2.4,2.3s-0.9,2.3-2.4,2.3C272.3,95.1,271.4,94,271.4,92.8z
				 M274.7,92.8c0-0.6-0.3-1.1-1-1.1c-0.6,0-0.9,0.5-0.9,1.1s0.3,1.1,0.9,1.1C274.4,93.9,274.7,93.4,274.7,92.8z"
            />
            <path
              className="st7"
              d="M279.9,95v-2.5c0-0.5-0.3-0.7-0.7-0.7c-0.4,0-0.7,0.2-0.8,0.4V95H277v-4.3h1.4v0.5c0.3-0.3,0.8-0.6,1.5-0.6
				c1,0,1.4,0.6,1.4,1.4v3H279.9z"
            />
            <path
              className="st7"
              d="M285.2,95v-2.5c0-0.5-0.3-0.7-0.7-0.7c-0.4,0-0.7,0.2-0.8,0.4V95h-1.4v-4.3h1.4v0.5c0.3-0.3,0.8-0.6,1.5-0.6
				c1,0,1.4,0.6,1.4,1.4v3H285.2z"
            />
            <path
              className="st7"
              d="M287.4,92.8c0-1.3,0.9-2.3,2.3-2.3c1.3,0,2.2,0.9,2.2,2.4v0.3h-3.1c0.1,0.4,0.5,0.7,1.1,0.7
				c0.3,0,0.8-0.1,1.1-0.4l0.6,0.9c-0.4,0.4-1.2,0.6-1.8,0.6C288.4,95.1,287.4,94.2,287.4,92.8z M289.7,91.6c-0.6,0-0.8,0.4-0.9,0.7
				h1.8C290.6,92,290.3,91.6,289.7,91.6z"
            />
            <path
              className="st7"
              d="M292.6,92.8c0-1.4,1-2.3,2.4-2.3c0.9,0,1.5,0.4,1.8,0.8l-0.9,0.8c-0.2-0.3-0.5-0.4-0.8-0.4
				c-0.6,0-1,0.4-1,1.1s0.4,1.1,1,1.1c0.4,0,0.6-0.2,0.8-0.4l0.9,0.8c-0.3,0.4-0.8,0.8-1.8,0.8C293.6,95.1,292.6,94.1,292.6,92.8z"
            />
            <path
              className="st7"
              d="M297.5,93.8v-2h-0.7v-1.2h0.7v-1.2h1.4v1.2h0.9v1.2h-0.9v1.6c0,0.3,0.1,0.4,0.4,0.4c0.2,0,0.3-0.1,0.4-0.1
				l0.3,1c-0.2,0.2-0.5,0.3-1,0.3C298,95.1,297.5,94.6,297.5,93.8z"
            />
            <path
              className="st7"
              d="M300.3,89.4c0-0.4,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8s-0.4,0.8-0.8,0.8C300.7,90.2,300.3,89.9,300.3,89.4z
				 M300.4,95v-4.3h1.4V95H300.4z"
            />
            <path
              className="st7"
              d="M304.2,95l-1.7-4.3h1.5l1,2.8l1-2.8h1.5l-1.7,4.3H304.2z"
            />
            <path
              className="st7"
              d="M307.9,89.4c0-0.4,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8s-0.4,0.8-0.8,0.8C308.2,90.2,307.9,89.9,307.9,89.4z
				 M308,95v-4.3h1.4V95H308z"
            />
            <path
              className="st7"
              d="M311,93.8v-2h-0.7v-1.2h0.7v-1.2h1.4v1.2h0.9v1.2h-0.9v1.6c0,0.3,0.1,0.4,0.4,0.4c0.2,0,0.3-0.1,0.4-0.1
				l0.3,1c-0.2,0.2-0.5,0.3-1,0.3C311.4,95.1,311,94.6,311,93.8z"
            />
            <path
              className="st7"
              d="M314,95.4c0.1,0.1,0.2,0.1,0.3,0.1c0.3,0,0.5-0.1,0.6-0.2L315,95l-1.7-4.4h1.5l1,2.8l1-2.8h1.5l-2,5
				c-0.4,0.9-1,1.1-1.8,1.1c-0.1,0-0.5,0-0.6-0.1L314,95.4z"
            />
            <path
              className="st7"
              d="M263.5,98.4c0-0.4,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8s-0.4,0.8-0.8,0.8C263.8,99.2,263.5,98.9,263.5,98.4z
				 M263.6,104v-4.3h1.4v4.3H263.6z"
            />
            <path
              className="st7"
              d="M269.2,104v-2.5c0-0.5-0.3-0.7-0.7-0.7c-0.4,0-0.7,0.2-0.8,0.4v2.8h-1.4v-4.3h1.4v0.5
				c0.3-0.3,0.8-0.6,1.5-0.6c1,0,1.4,0.6,1.4,1.4v3.1h-1.4V104z"
            />
            <path
              className="st7"
              d="M272,104v-3.2h-0.7v-1.2h0.7v-0.1c0-1,0.6-1.6,1.6-1.6c0.5,0,1,0.1,1.2,0.4l-0.5,0.9
				c-0.1-0.1-0.3-0.2-0.4-0.2c-0.3,0-0.5,0.2-0.5,0.5v0.1h0.9v1.2h-0.9v3.2C273.4,104,272,104,272,104z"
            />
            <path
              className="st7"
              d="M275.1,104v-4.3h1.4v0.5c0.3-0.4,0.8-0.6,1.4-0.6v1.3c-0.1,0-0.2,0-0.3,0c-0.4,0-0.8,0.2-1,0.4v2.8h-1.5V104
				z"
            />
            <path
              className="st7"
              d="M280.9,104v-0.4c-0.3,0.3-0.8,0.5-1.4,0.5c-0.7,0-1.5-0.5-1.5-1.4c0-1.1,0.8-1.4,1.5-1.4
				c0.6,0,1.1,0.2,1.4,0.5v-0.4c0-0.4-0.3-0.6-0.9-0.6c-0.4,0-0.9,0.2-1.2,0.5l-0.5-1c0.6-0.5,1.3-0.7,2-0.7c1,0,2,0.4,2,1.7v2.7
				C282.3,104,280.9,104,280.9,104z M280.9,102.9v-0.4c-0.1-0.2-0.5-0.3-0.8-0.3c-0.4,0-0.7,0.2-0.7,0.5s0.3,0.5,0.7,0.5
				C280.4,103.2,280.7,103.1,280.9,102.9z"
            />
            <path
              className="st7"
              d="M282.8,103.4l0.6-1c0.3,0.3,1,0.6,1.5,0.6c0.4,0,0.6-0.1,0.6-0.3c0-0.5-2.5,0-2.5-1.7c0-0.8,0.7-1.4,1.9-1.4
				c0.7,0,1.4,0.2,1.8,0.6l-0.5,1c-0.3-0.3-0.8-0.5-1.3-0.5c-0.3,0-0.5,0.1-0.5,0.3c0,0.5,2.5,0,2.5,1.8c0,0.8-0.7,1.4-2,1.4
				C284.1,104.1,283.3,103.8,282.8,103.4z"
            />
            <path
              className="st7"
              d="M287.9,102.8v-2h-0.7v-1.2h0.7v-1.2h1.4v1.2h0.9v1.2h-0.9v1.6c0,0.3,0.1,0.4,0.4,0.4c0.2,0,0.3-0.1,0.4-0.1
				l0.3,1c-0.2,0.2-0.5,0.3-1,0.3C288.3,104.1,287.9,103.6,287.9,102.8z"
            />
            <path
              className="st7"
              d="M290.8,104v-4.3h1.4v0.5c0.3-0.4,0.8-0.6,1.4-0.6v1.3c-0.1,0-0.2,0-0.3,0c-0.4,0-0.8,0.2-1,0.4v2.8h-1.5V104
				z"
            />
            <path
              className="st7"
              d="M297,104v-0.5c-0.3,0.3-0.8,0.6-1.5,0.6c-1,0-1.4-0.6-1.4-1.4v-3.1h1.4v2.5c0,0.5,0.3,0.7,0.7,0.7
				c0.4,0,0.7-0.2,0.8-0.4v-2.8h1.4v4.3H297V104z"
            />
            <path
              className="st7"
              d="M299.2,101.8c0-1.4,1-2.3,2.4-2.3c0.9,0,1.5,0.4,1.8,0.8l-0.9,0.8c-0.2-0.3-0.5-0.4-0.8-0.4
				c-0.6,0-1,0.4-1,1.1s0.4,1.1,1,1.1c0.4,0,0.6-0.2,0.8-0.4l0.9,0.8c-0.3,0.4-0.8,0.8-1.8,0.8C300.2,104.1,299.2,103.1,299.2,101.8
				z"
            />
            <path
              className="st7"
              d="M304,102.8v-2h-0.7v-1.2h0.7v-1.2h1.4v1.2h0.9v1.2h-0.9v1.6c0,0.3,0.1,0.4,0.4,0.4c0.2,0,0.3-0.1,0.4-0.1
				l0.3,1c-0.2,0.2-0.5,0.3-1,0.3C304.5,104.1,304,103.6,304,102.8z"
            />
            <path
              className="st7"
              d="M309.9,104v-0.5c-0.3,0.3-0.8,0.6-1.5,0.6c-1,0-1.4-0.6-1.4-1.4v-3.1h1.4v2.5c0,0.5,0.3,0.7,0.7,0.7
				c0.4,0,0.7-0.2,0.8-0.4v-2.8h1.4v4.3h-1.4V104z"
            />
            <path
              className="st7"
              d="M312.3,104v-4.3h1.4v0.5c0.3-0.4,0.8-0.6,1.4-0.6v1.3c-0.1,0-0.2,0-0.3,0c-0.4,0-0.8,0.2-1,0.4v2.8h-1.5V104
				z"
            />
            <path
              className="st7"
              d="M315.3,101.8c0-1.3,0.9-2.3,2.3-2.3c1.3,0,2.2,0.9,2.2,2.4v0.3h-3.1c0.1,0.4,0.5,0.7,1.1,0.7
				c0.3,0,0.8-0.1,1.1-0.4l0.6,0.9c-0.4,0.4-1.2,0.6-1.8,0.6C316.3,104.1,315.3,103.2,315.3,101.8z M317.6,100.6
				c-0.6,0-0.8,0.4-0.9,0.7h1.8C318.5,101,318.3,100.6,317.6,100.6z"
            />
          </motion.g>
        </g>
      </g>
      <g id="Layer_7">
        <g>
          <polygon className="st8" points="296,264.4 296,264.4 328,274.1 		" />
          <path className="st8" d="M272.9,195.9l18.5-26.7L272.9,195.9z" />
          <path className="st8" d="M199.8,197.3l-19.5-25.6L199.8,197.3z" />
          <path className="st8" d="M179.7,267.1L148.4,278L179.7,267.1z" />
          <path className="st8" d="M238.9,307.3l0.7,34L238.9,307.3z" />
        </g>
        <circle className="st9" cx="237.4" cy="246.5" r="95" />
      </g>
      <g id="Layer_15">
        <circle
          filter={isHighlightingPillars ? "url(#glow)" : undefined}
          className="st3"
          cx="171.5"
          cy="162.9"
          r="37.6"
        />
        <g>
          <g>
            <path
              className="st10"
              d="M157.6,179.5v-6h3c1.4,0,2.1,0.9,2.1,2s-0.7,2-2.1,2h-1.5v2H157.6z M161.1,175.5c0-0.4-0.3-0.6-0.7-0.6
				h-1.2v1.3h1.2C160.8,176.1,161.1,175.9,161.1,175.5z"
            />
            <path
              className="st10"
              d="M163.1,177.3c0-1.3,0.9-2.3,2.3-2.3c1.3,0,2.2,0.9,2.2,2.4v0.3h-3.1c0.1,0.4,0.5,0.7,1.1,0.7
				c0.3,0,0.8-0.1,1.1-0.4l0.6,0.9c-0.4,0.4-1.2,0.6-1.8,0.6C164.2,179.6,163.1,178.7,163.1,177.3z M165.5,176.1
				c-0.6,0-0.8,0.4-0.9,0.7h1.8C166.3,176.5,166.1,176.1,165.5,176.1z"
            />
            <path
              className="st10"
              d="M168.1,177.3c0-1.2,0.9-2.3,2.4-2.3s2.4,1.1,2.4,2.3s-0.9,2.3-2.4,2.3S168.1,178.5,168.1,177.3z
				 M171.4,177.3c0-0.6-0.3-1.1-1-1.1c-0.6,0-0.9,0.5-0.9,1.1s0.3,1.1,0.9,1.1C171.1,178.3,171.4,177.9,171.4,177.3z"
            />
            <path
              className="st10"
              d="M175,178.9v2.2h-1.4v-6h1.4v0.5c0.3-0.4,0.8-0.6,1.3-0.6c1.1,0,1.9,0.8,1.9,2.3s-0.8,2.3-1.9,2.3
				C175.8,179.6,175.4,179.4,175,178.9z M176.8,177.3c0-0.6-0.4-1.1-1-1.1c-0.3,0-0.7,0.2-0.8,0.4v1.3c0.2,0.2,0.5,0.4,0.8,0.4
				C176.4,178.3,176.8,177.9,176.8,177.3z"
            />
            <path className="st10" d="M179,179.5v-6h1.4v6H179z" />
            <path
              className="st10"
              d="M181.2,177.3c0-1.3,0.9-2.3,2.3-2.3c1.3,0,2.2,0.9,2.2,2.4v0.3h-3.1c0.1,0.4,0.5,0.7,1.1,0.7
				c0.3,0,0.8-0.1,1.1-0.4l0.6,0.9c-0.4,0.4-1.2,0.6-1.8,0.6C182.2,179.6,181.2,178.7,181.2,177.3z M183.5,176.1
				c-0.6,0-0.8,0.4-0.9,0.7h1.8C184.3,176.5,184.1,176.1,183.5,176.1z"
            />
          </g>
        </g>
        <g>
          <path
            className="st10"
            d="M153.4,158.6c0.6,0,1.1-0.5,1.1-1.1c0-1.7,0.9-3.2,2.3-4.1v6.8c0,1.7,1.4,3.1,3.1,3.1c1.7,0,3.1-1.4,3.1-3.1
			v-6.8c1.4,0.9,2.3,2.4,2.3,4.1c0,0.6,0.5,1.1,1.1,1.1s1.1-0.5,1.1-1.1l0,0l0,0c0-0.9,0.3-1.6,0.8-2.2v2.7c0,1.3,1,2.3,2.3,2.3
			s2.3-1,2.3-2.3v-2.7c0.5,0.6,0.8,1.4,0.8,2.2l0,0c0,0.6,0.5,1.1,1.1,1.1s1.1-0.5,1.1-1.1c0-1.9,1.4-3.5,3.1-4.4l-1.5,5.5
			c-0.4,2.4,1.4,4.6,3.8,4.6c2.4,0,4.2-2.2,3.8-4.6l-1.5-5.5c1.7,0.8,3.1,2.4,3.1,4.4c0,0.6,0.5,1.1,1.1,1.1s1.1-0.5,1.1-1.1
			c0-4.1-3.3-7.2-7.6-7.2c-2.9,0-5.3,1.4-6.6,3.5c-1-1.2-2.5-2-4.1-2s-3.1,0.8-4.1,2c-1.3-2.1-3.7-3.5-6.6-3.5
			c-4.4,0-7.6,3.1-7.6,7.2C152.2,158.1,152.7,158.6,153.4,158.6"
          />
          <path
            className="st10"
            d="M181.3,148.6c1.3,0,2.3-1,2.3-2.3s-1-2.3-2.3-2.3s-2.3,1-2.3,2.3S180,148.6,181.3,148.6"
          />
          <path
            className="st10"
            d="M159.9,148.6c1.3,0,2.3-1,2.3-2.3s-1-2.3-2.3-2.3s-2.3,1-2.3,2.3C157.6,147.6,158.6,148.6,159.9,148.6"
          />
          <path
            className="st10"
            d="M170.6,150.2c1.1,0,1.9-0.9,1.9-1.9c0-1.1-0.9-1.9-1.9-1.9c-1.1,0-1.9,0.9-1.9,1.9
			C168.7,149.3,169.5,150.2,170.6,150.2"
          />
        </g>
      </g>
      <g id="Layer_14">
        <circle
          filter={isHighlightingPillars ? "url(#glow)" : undefined}
          className="st4"
          cx="135.4"
          cy="282.6"
          r="37.6"
        />
        <g>
          <g>
            <path
              className="st10"
              d="M117.2,300.1v-6h3.4c1.2,0,1.8,0.8,1.8,1.5s-0.5,1.3-1,1.4c0.6,0.1,1.1,0.7,1.1,1.5c0,0.9-0.6,1.6-1.8,1.6
				H117.2z M120.8,295.9c0-0.3-0.2-0.5-0.5-0.5h-1.5v0.9h1.5C120.5,296.4,120.8,296.2,120.8,295.9z M120.9,298.3
				c0-0.3-0.2-0.5-0.6-0.5h-1.6v1h1.6C120.7,298.8,120.9,298.6,120.9,298.3z"
            />
            <path
              className="st10"
              d="M126.3,300.1v-0.5c-0.3,0.3-0.8,0.6-1.5,0.6c-1,0-1.4-0.6-1.4-1.4v-3.1h1.4v2.5c0,0.5,0.3,0.7,0.7,0.7
				c0.4,0,0.7-0.2,0.8-0.4v-2.8h1.4v4.3L126.3,300.1L126.3,300.1z"
            />
            <path
              className="st10"
              d="M128.3,299.6l0.6-1c0.3,0.3,1,0.6,1.5,0.6c0.4,0,0.6-0.1,0.6-0.3c0-0.5-2.5,0-2.5-1.7
				c0-0.8,0.7-1.4,1.9-1.4c0.7,0,1.3,0.2,1.8,0.6l-0.5,1c-0.3-0.3-0.8-0.5-1.3-0.5c-0.3,0-0.5,0.1-0.5,0.3c0,0.5,2.5,0,2.5,1.8
				c0,0.8-0.7,1.4-2,1.4C129.6,300.2,128.8,300,128.3,299.6z"
            />
            <path
              className="st10"
              d="M133,294.6c0-0.4,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8s-0.4,0.8-0.8,0.8S133,295,133,294.6z M133.1,300.1v-4.3
				h1.4v4.3H133.1z"
            />
            <path
              className="st10"
              d="M138.5,300.1v-2.5c0-0.5-0.3-0.7-0.7-0.7s-0.7,0.2-0.8,0.4v2.8h-1.4v-4.3h1.4v0.5c0.3-0.3,0.8-0.6,1.5-0.6
				c1,0,1.4,0.6,1.4,1.4v3.1L138.5,300.1L138.5,300.1z"
            />
            <path
              className="st10"
              d="M140.7,297.9c0-1.3,0.9-2.3,2.3-2.3c1.3,0,2.2,0.9,2.2,2.4v0.3h-3.1c0.1,0.4,0.5,0.7,1.1,0.7
				c0.3,0,0.8-0.1,1.1-0.4l0.6,0.9c-0.4,0.4-1.2,0.6-1.8,0.6C141.7,300.2,140.7,299.4,140.7,297.9z M143,296.8
				c-0.6,0-0.8,0.4-0.9,0.7h1.8C143.8,297.1,143.6,296.8,143,296.8z"
            />
            <path
              className="st10"
              d="M145.6,299.6l0.6-1c0.3,0.3,1,0.6,1.5,0.6c0.4,0,0.6-0.1,0.6-0.3c0-0.5-2.5,0-2.5-1.7
				c0-0.8,0.7-1.4,1.9-1.4c0.7,0,1.4,0.2,1.8,0.6l-0.5,1c-0.3-0.3-0.8-0.5-1.3-0.5c-0.3,0-0.5,0.1-0.5,0.3c0,0.5,2.5,0,2.5,1.8
				c0,0.8-0.7,1.4-2,1.4C146.8,300.2,146,300,145.6,299.6z"
            />
            <path
              className="st10"
              d="M150,299.6l0.6-1c0.3,0.3,1,0.6,1.5,0.6c0.4,0,0.6-0.1,0.6-0.3c0-0.5-2.5,0-2.5-1.7c0-0.8,0.7-1.4,1.9-1.4
				c0.7,0,1.3,0.2,1.8,0.6l-0.5,1c-0.3-0.3-0.8-0.5-1.3-0.5c-0.3,0-0.5,0.1-0.5,0.3c0,0.5,2.5,0,2.5,1.8c0,0.8-0.7,1.4-2,1.4
				C151.2,300.2,150.4,300,150,299.6z"
            />
          </g>
        </g>
        <g>
          <g>
            <path
              className="st10"
              d="M146.9,267h-23.2c-0.3,0-0.6,0.3-0.6,0.6v3.4h9.1c1.1-1.7,3.4-2.2,5.1-1.1c0.4,0.3,0.8,0.7,1.1,1.1h5.7
				c0.9,0,1.7,0.8,1.7,1.7v6.2h1.1c0.3,0,0.6-0.3,0.6-0.6v-10.8C147.5,267.3,147.2,267,146.9,267z"
            />
            <path
              className="st10"
              d="M144.1,272.1h-23.2c-0.3,0-0.6,0.3-0.6,0.6v10.8c0,0.3,0.3,0.6,0.6,0.6h23.2c0.3,0,0.6-0.3,0.6-0.6v-10.8
				C144.6,272.4,144.4,272.1,144.1,272.1z M123.7,280c-0.9,0-1.7-0.8-1.7-1.7c0-0.7,0.5-1.4,1.1-1.6c0.2-0.1,0.4-0.1,0.6-0.1
				c0.9,0,1.7,0.8,1.7,1.7l0,0c0,0.2,0,0.4-0.1,0.6C125,279.6,124.4,280,123.7,280z M132.4,281.7c-1.7,0-3.2-1.2-3.6-2.8
				c-0.1-0.3-0.1-0.6-0.1-0.8c0-1.8,1.3-3.4,3.1-3.6c0.2,0,0.4,0,0.5,0c2,0,3.7,1.6,3.7,3.7l0,0c0,0.3,0,0.6-0.1,0.8
				C135.6,280.6,134.1,281.7,132.4,281.7z M141.2,279.8c-0.9,0-1.7-0.8-1.7-1.7c0-0.9,0.8-1.7,1.7-1.7s1.7,0.8,1.7,1.7
				c0,0.3-0.1,0.6-0.2,0.8C142.4,279.4,141.8,279.8,141.2,279.8z"
            />
          </g>
        </g>
      </g>
      <g id="Layer_13">
        <g>
          <circle
            filter={isHighlightingPillars ? "url(#glow)" : undefined}
            className="st5"
            cx="238.5"
            cy="352.7"
            r="37.6"
          />
          <g>
            <g>
              <g>
                <path
                  className="st10"
                  d="M220.7,372.3l-1-2h-0.8v2h-1.5v-6h3c1.3,0,2.1,0.9,2.1,2c0,1-0.6,1.6-1.2,1.8l1.2,2.2H220.7z
						 M220.9,368.3c0-0.4-0.3-0.6-0.7-0.6H219v1.3h1.2C220.5,368.9,220.9,368.7,220.9,368.3z"
                />
                <path
                  className="st10"
                  d="M223,370.1c0-1.3,0.9-2.3,2.3-2.3c1.3,0,2.2,0.9,2.2,2.4v0.3h-3.1c0.1,0.4,0.5,0.7,1.1,0.7
						c0.3,0,0.8-0.1,1.1-0.4l0.6,0.9c-0.4,0.4-1.2,0.6-1.8,0.6C224,372.4,223,371.5,223,370.1z M225.3,368.9c-0.6,0-0.8,0.4-0.9,0.7
						h1.8C226.2,369.3,226,368.9,225.3,368.9z"
                />
                <path
                  className="st10"
                  d="M228.2,373.4l0.6-1c0.3,0.4,0.8,0.5,1.3,0.5s1.1-0.2,1.1-1v-0.3c-0.4,0.4-0.8,0.6-1.3,0.6
						c-1.1,0-1.9-0.7-1.9-2.2c0-1.4,0.8-2.2,1.9-2.2c0.5,0,0.9,0.2,1.3,0.6v-0.5h1.4v4c0,1.8-1.4,2.1-2.5,2.1
						C229.4,374,228.7,373.8,228.2,373.4z M231.2,370.6v-1.2c-0.2-0.2-0.5-0.4-0.8-0.4c-0.5,0-1,0.3-1,1c0,0.6,0.4,1,1,1
						C230.7,371,231,370.8,231.2,370.6z"
                />
                <path
                  className="st10"
                  d="M236.6,372.3v-0.5c-0.3,0.3-0.8,0.6-1.5,0.6c-1,0-1.4-0.6-1.4-1.4v-3.1h1.4v2.5c0,0.5,0.3,0.7,0.7,0.7
						s0.7-0.2,0.8-0.4v-2.8h1.4v4.3L236.6,372.3L236.6,372.3z"
                />
                <path className="st10" d="M239,372.3v-6h1.4v6H239z" />
                <path
                  className="st10"
                  d="M244,372.3v-0.4c-0.3,0.3-0.8,0.5-1.4,0.5c-0.7,0-1.5-0.5-1.5-1.4c0-1.1,0.8-1.4,1.5-1.4
						c0.6,0,1.1,0.2,1.4,0.5v-0.4c0-0.4-0.3-0.6-0.9-0.6c-0.4,0-0.9,0.2-1.2,0.5l-0.5-1c0.6-0.5,1.3-0.7,2-0.7c1,0,2,0.4,2,1.7v2.7
						L244,372.3L244,372.3z M244,371.2v-0.4c-0.1-0.2-0.5-0.3-0.8-0.3c-0.4,0-0.7,0.2-0.7,0.5s0.3,0.5,0.7,0.5
						C243.6,371.5,243.9,371.4,244,371.2z"
                />
                <path
                  className="st10"
                  d="M246.8,371.1v-2h-0.7v-1.2h0.7v-1.2h1.4v1.2h0.9v1.2h-0.9v1.6c0,0.3,0.1,0.4,0.4,0.4
						c0.2,0,0.3-0.1,0.4-0.1l0.3,1c-0.2,0.2-0.5,0.3-1,0.3C247.3,372.4,246.8,371.9,246.8,371.1z"
                />
                <path
                  className="st10"
                  d="M249.7,366.7c0-0.4,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8s-0.4,0.8-0.8,0.8S249.7,367.2,249.7,366.7z
						 M249.8,372.3V368h1.4v4.3H249.8z"
                />
                <path
                  className="st10"
                  d="M252,370.1c0-1.2,0.9-2.3,2.4-2.3s2.4,1.1,2.4,2.3c0,1.2-0.9,2.3-2.4,2.3
						C252.8,372.4,252,371.3,252,370.1z M255.3,370.1c0-0.6-0.3-1.1-1-1.1c-0.6,0-0.9,0.5-0.9,1.1s0.3,1.1,0.9,1.1
						S255.3,370.7,255.3,370.1z"
                />
                <path
                  className="st10"
                  d="M260.4,372.3v-2.5c0-0.5-0.3-0.7-0.7-0.7c-0.4,0-0.7,0.2-0.8,0.4v2.8h-1.4V368h1.4v0.5
						c0.3-0.3,0.8-0.6,1.5-0.6c1,0,1.4,0.6,1.4,1.4v3.1L260.4,372.3L260.4,372.3z"
                />
              </g>
            </g>
          </g>
          <path
            className="st11"
            d="M238.4,335.7c0.3,0.3,0.3,0.7,0,1l-4.5,4.5c-0.3,0.3-0.7,0.3-1,0s-0.3-0.8,0-1l4.5-4.5
			C237.7,335.4,238.1,335.4,238.4,335.7z"
          />
          <path
            className="st11"
            d="M240.6,348.9c0.3,0.3,0.7,0.3,1,0l4.5-4.5c0.3-0.3,0.3-0.7,0-1s-0.7-0.3-1,0l-4.5,4.5
			C240.3,348.2,240.3,348.7,240.6,348.9z"
          />
          <path
            className="st12"
            d="M242,329.7h-12.7V350l-4.6,4.3l2.8,2.9l1.8-1.9v0.3h19.9v-18.3L242,329.7z M242.3,333l3.4,3.5h-3.4V333z
			 M247.1,353.4h-15.7V353l6.8-7.3l1.4,1.4l3.9-3.9l-4.9-4.9l-3.9,3.9l1.4,1.4l-4.7,4.4v-16.2h9.3v6.4h6.4V353.4z"
          />
        </g>
      </g>
      <g id="Layer_12">
        <circle
          filter={isHighlightingPillars ? "url(#glow)" : undefined}
          className="st6"
          cx="339.4"
          cy="276.9"
          r="37.6"
        />
        <g>
          <g>
            <path
              className="st10"
              d="M313.7,290.4c0-1.9,1.5-3.1,3.2-3.1c1.3,0,2.2,0.7,2.6,1.5l-1.3,0.7c-0.2-0.4-0.7-0.8-1.3-0.8
				c-1,0-1.7,0.7-1.7,1.7s0.7,1.7,1.7,1.7c0.4,0,0.9-0.2,1.1-0.4v-0.5h-1.4v-1.4h2.9v2.4c-0.6,0.7-1.5,1.2-2.7,1.2
				C315.1,293.5,313.7,292.3,313.7,290.4z"
            />
            <path
              className="st10"
              d="M320.2,291.2c0-1.2,0.9-2.3,2.4-2.3s2.4,1.1,2.4,2.3c0,1.2-0.9,2.3-2.4,2.3S320.2,292.4,320.2,291.2z
				 M323.5,291.2c0-0.6-0.3-1.1-1-1.1c-0.6,0-0.9,0.5-0.9,1.1s0.3,1.1,0.9,1.1C323.2,292.3,323.5,291.8,323.5,291.2z"
            />
            <path
              className="st10"
              d="M326.9,293.4l-1.7-4.3h1.5l1,2.8l1-2.8h1.5l-1.7,4.3H326.9z"
            />
            <path
              className="st10"
              d="M330.2,291.2c0-1.3,0.9-2.3,2.3-2.3c1.3,0,2.2,0.9,2.2,2.4v0.3h-3.1c0.1,0.4,0.5,0.7,1.1,0.7
				c0.3,0,0.8-0.1,1.1-0.4l0.6,0.9c-0.4,0.4-1.2,0.6-1.8,0.6C331.3,293.5,330.2,292.6,330.2,291.2z M332.5,290
				c-0.6,0-0.8,0.4-0.9,0.7h1.8C333.4,290.4,333.2,290,332.5,290z"
            />
            <path
              className="st10"
              d="M335.5,293.4V289h1.4v0.5c0.3-0.4,0.8-0.6,1.4-0.6v1.3c-0.1,0-0.2,0-0.3,0c-0.4,0-0.8,0.2-1,0.4v2.8
				L335.5,293.4L335.5,293.4z"
            />
            <path
              className="st10"
              d="M341.9,293.4v-2.5c0-0.5-0.3-0.7-0.7-0.7c-0.4,0-0.7,0.2-0.8,0.4v2.8H339V289h1.4v0.5
				c0.3-0.3,0.8-0.6,1.5-0.6c1,0,1.4,0.6,1.4,1.4v3.1H341.9z"
            />
            <path
              className="st10"
              d="M349.8,293.4v-2.6c0-0.3-0.2-0.6-0.6-0.6s-0.6,0.2-0.8,0.4v2.8H347v-2.6c0-0.3-0.2-0.6-0.6-0.6
				s-0.6,0.2-0.8,0.4v2.8h-1.4V289h1.4v0.5c0.2-0.3,0.7-0.6,1.4-0.6c0.6,0,1.1,0.3,1.2,0.8c0.3-0.4,0.8-0.8,1.5-0.8
				c0.8,0,1.3,0.4,1.3,1.3v3.2H349.8z"
            />
            <path
              className="st10"
              d="M352,291.2c0-1.3,0.9-2.3,2.3-2.3c1.3,0,2.2,0.9,2.2,2.4v0.3h-3.1c0.1,0.4,0.5,0.7,1.1,0.7
				c0.3,0,0.8-0.1,1.1-0.4l0.6,0.9c-0.4,0.4-1.2,0.6-1.8,0.6C353,293.5,352,292.6,352,291.2z M354.3,290c-0.6,0-0.8,0.4-0.9,0.7h1.8
				C355.1,290.4,354.9,290,354.3,290z"
            />
            <path
              className="st10"
              d="M360.2,293.4v-2.5c0-0.5-0.3-0.7-0.7-0.7c-0.4,0-0.7,0.2-0.8,0.4v2.8h-1.4V289h1.4v0.5
				c0.3-0.3,0.8-0.6,1.5-0.6c1,0,1.4,0.6,1.4,1.4v3.1H360.2z"
            />
            <path
              className="st10"
              d="M362.9,292.2v-2h-0.7V289h0.7v-1.2h1.4v1.2h0.9v1.2h-0.9v1.6c0,0.3,0.1,0.4,0.4,0.4c0.2,0,0.3-0.1,0.4-0.1
				l0.3,1c-0.2,0.2-0.5,0.3-1,0.3C363.4,293.5,362.9,293,362.9,292.2z"
            />
          </g>
        </g>
        <g>
          <path
            className="st10"
            d="M346.4,278.8h-5.7v-19h5.3l-2.7,6.1c-0.2,0.5,0.2,1.1,0.7,1.1c0.3,0,0.6-0.2,0.7-0.5l2.4-5.7l2.4,5.7
			c0.1,0.3,0.4,0.5,0.7,0.5c0.5,0,0.9-0.5,0.7-1.1l-3.1-7.2c-0.1-0.3-0.4-0.5-0.7-0.5h-6.4v-1c0-0.6-0.4-1-1-1s-1,0.5-1,1v1h-6.4
			c-0.3,0-0.6,0.2-0.7,0.5l-3.1,7.2c-0.2,0.5,0.2,1.1,0.7,1.1c0.3,0,0.6-0.2,0.7-0.5l2.4-5.7l2.4,5.7c0.1,0.3,0.4,0.5,0.7,0.5
			c0.5,0,0.9-0.5,0.7-1.1l-2.7-6.1h5.3v19H333c-0.6,0-1,0.5-1,1c0,0.6,0.5,1,1,1h13.4c0.6,0,1-0.5,1-1S347,278.8,346.4,278.8"
          />
          <path
            className="st10"
            d="M337.1,268.7c0-0.1,0-0.2-0.1-0.2h-9.5c-0.1,0-0.1,0.1-0.1,0.2c0.5,2.2,2.5,4,4.9,4
			C334.6,272.7,336.6,270.9,337.1,268.7"
          />
          <path
            className="st10"
            d="M352,268.7c0-0.1,0-0.2-0.1-0.2h-9.5c-0.1,0-0.1,0.1-0.1,0.2c0.5,2.2,2.5,4,4.9,4
			C349.5,272.7,351.5,270.9,352,268.7"
          />
        </g>
      </g>
      <g id="Layer_11">
        <circle
          filter={isHighlightingPillars ? "url(#glow)" : undefined}
          className="st7"
          cx="297.3"
          cy="160.1"
          r="37.6"
        />
        <g>
          <g>
            <path className="st10" d="M270,173v-6h1.5v6H270z" />
            <path
              className="st10"
              d="M275.6,173v-2.5c0-0.5-0.3-0.7-0.7-0.7c-0.4,0-0.7,0.2-0.8,0.4v2.8h-1.4v-4.3h1.4v0.5
				c0.3-0.3,0.8-0.6,1.5-0.6c1,0,1.4,0.6,1.4,1.4v3.1L275.6,173L275.6,173z"
            />
            <path
              className="st10"
              d="M278.3,173v-3.2h-0.7v-1.2h0.7v-0.1c0-1,0.6-1.6,1.6-1.6c0.5,0,1,0.1,1.2,0.4l-0.5,0.9
				c-0.1-0.1-0.3-0.2-0.5-0.2c-0.3,0-0.5,0.2-0.5,0.5v0.1h0.9v1.2h-0.9v3.2L278.3,173L278.3,173z"
            />
            <path
              className="st10"
              d="M281.2,173v-4.3h1.4v0.5c0.3-0.4,0.8-0.6,1.4-0.6v1.3c-0.1,0-0.2,0-0.3,0c-0.4,0-0.8,0.2-1,0.4v2.8
				L281.2,173L281.2,173z"
            />
            <path
              className="st10"
              d="M287.2,173v-0.4c-0.3,0.3-0.8,0.5-1.4,0.5c-0.7,0-1.5-0.5-1.5-1.4c0-1.1,0.8-1.4,1.5-1.4
				c0.6,0,1.1,0.2,1.4,0.5v-0.4c0-0.4-0.3-0.6-0.9-0.6c-0.4,0-0.9,0.2-1.2,0.5l-0.5-1c0.6-0.5,1.3-0.7,2-0.7c1,0,2,0.4,2,1.7v2.7
				L287.2,173L287.2,173z M287.2,171.8v-0.4c-0.1-0.2-0.5-0.3-0.8-0.3c-0.4,0-0.7,0.2-0.7,0.5s0.3,0.5,0.7,0.5
				C286.7,172.2,287.1,172,287.2,171.8z"
            />
            <path
              className="st10"
              d="M289.3,172.4l0.6-1c0.3,0.3,1,0.6,1.5,0.6c0.4,0,0.6-0.1,0.6-0.3c0-0.5-2.5,0-2.5-1.7
				c0-0.8,0.7-1.4,1.9-1.4c0.7,0,1.3,0.2,1.8,0.6l-0.5,1c-0.3-0.3-0.8-0.5-1.3-0.5c-0.3,0-0.5,0.1-0.5,0.3c0,0.5,2.5,0,2.5,1.8
				c0,0.8-0.7,1.4-2,1.4C290.5,173.1,289.7,172.8,289.3,172.4z"
            />
            <path
              className="st10"
              d="M294.3,171.8v-2h-0.7v-1.2h0.7v-1.2h1.4v1.2h0.9v1.2h-0.9v1.6c0,0.3,0.1,0.4,0.4,0.4c0.2,0,0.3-0.1,0.4-0.1
				l0.3,1c-0.2,0.2-0.5,0.3-1,0.3C294.8,173.1,294.3,172.6,294.3,171.8z"
            />
            <path
              className="st10"
              d="M297.3,173v-4.3h1.4v0.5c0.3-0.4,0.8-0.6,1.4-0.6v1.3c-0.1,0-0.2,0-0.3,0c-0.4,0-0.8,0.2-1,0.4v2.8
				L297.3,173L297.3,173z"
            />
            <path
              className="st10"
              d="M303.7,173v-0.5c-0.3,0.3-0.8,0.6-1.5,0.6c-1,0-1.4-0.6-1.4-1.4v-3.1h1.4v2.5c0,0.5,0.3,0.7,0.7,0.7
				c0.4,0,0.7-0.2,0.8-0.4v-2.8h1.4v4.3L303.7,173L303.7,173z"
            />
            <path
              className="st10"
              d="M305.9,170.8c0-1.4,1-2.3,2.4-2.3c0.9,0,1.5,0.4,1.8,0.8l-0.9,0.8c-0.2-0.3-0.5-0.4-0.8-0.4
				c-0.6,0-1,0.4-1,1.1s0.4,1.1,1,1.1c0.4,0,0.6-0.2,0.8-0.4l0.9,0.8c-0.3,0.4-0.8,0.8-1.8,0.8C306.9,173.1,305.9,172.1,305.9,170.8
				z"
            />
            <path
              className="st10"
              d="M311,171.8v-2h-0.7v-1.2h0.7v-1.2h1.4v1.2h0.9v1.2h-0.9v1.6c0,0.3,0.1,0.4,0.4,0.4c0.2,0,0.3-0.1,0.4-0.1
				l0.3,1c-0.2,0.2-0.5,0.3-1,0.3C311.5,173.1,311,172.6,311,171.8z"
            />
            <path
              className="st10"
              d="M316.9,173v-0.5c-0.3,0.3-0.8,0.6-1.5,0.6c-1,0-1.4-0.6-1.4-1.4v-3.1h1.4v2.5c0,0.5,0.3,0.7,0.7,0.7
				c0.4,0,0.7-0.2,0.8-0.4v-2.8h1.4v4.3L316.9,173L316.9,173z"
            />
            <path
              className="st10"
              d="M319.4,173v-4.3h1.4v0.5c0.3-0.4,0.8-0.6,1.4-0.6v1.3c-0.1,0-0.2,0-0.3,0c-0.4,0-0.8,0.2-1,0.4v2.8
				L319.4,173L319.4,173z"
            />
            <path
              className="st10"
              d="M322.5,170.8c0-1.3,0.9-2.3,2.3-2.3c1.3,0,2.2,0.9,2.2,2.4v0.3h-3c0.1,0.4,0.5,0.7,1.1,0.7
				c0.3,0,0.8-0.1,1.1-0.4l0.6,0.9c-0.4,0.4-1.2,0.6-1.8,0.6C323.6,173.1,322.5,172.2,322.5,170.8z M324.8,169.6
				c-0.6,0-0.8,0.4-0.9,0.7h1.8C325.7,170,325.5,169.6,324.8,169.6z"
            />
          </g>
        </g>
        <g>
          <path
            className="st10"
            d="M303.8,158.7h-2l-3.2-12.1c0.4-0.3,0.7-0.9,0.7-1.4c0-1-0.8-1.8-1.8-1.8s-1.8,0.8-1.8,1.8
			c0,0.6,0.3,1.1,0.7,1.4l-3.2,12.1h-2c-0.5,0-0.9,0.4-0.9,0.9s0.4,0.9,0.9,0.9h12.6c0.5,0,0.9-0.4,0.9-0.9
			C304.7,159.1,304.3,158.7,303.8,158.7 M296.2,152.4h2.4l0.7,2.7h-3.9L296.2,152.4z M296.6,151.1l0.9-3.2l0.9,3.2H296.6z
			 M295.1,156.5h4.6l0.6,2.3h-5.8L295.1,156.5z"
          />
          <path
            className="st10"
            d="M288,145c0-1.9,0.8-3.6,2.1-4.9c0.3-0.3,0.3-0.7,0-1s-0.7-0.3-1,0c-1.6,1.6-2.4,3.7-2.4,5.9s0.9,4.3,2.4,5.9
			c0.1,0.1,0.3,0.2,0.5,0.2s0.3-0.1,0.5-0.2c0.3-0.3,0.3-0.7,0-1C288.7,148.6,288,146.8,288,145"
          />
          <path
            className="st10"
            d="M292.1,147.7c0.1,0.2,0.3,0.2,0.5,0.2s0.3-0.1,0.5-0.2c0.3-0.3,0.3-0.7,0.1-1c-0.4-0.5-0.7-1.1-0.7-1.7
			c0-0.7,0.3-1.3,0.7-1.8c0.3-0.3,0.2-0.7,0-1c-0.3-0.3-0.7-0.3-1,0c-0.7,0.7-1.1,1.7-1.1,2.7C291.1,146,291.5,146.9,292.1,147.7"
          />
          <path
            className="st10"
            d="M290.4,149.1c0.1,0.1,0.3,0.2,0.5,0.2s0.3-0.1,0.4-0.2c0.3-0.3,0.3-0.7,0-0.9c-0.8-0.9-1.1-2-1.1-3.1
			c0-1.2,0.4-2.3,1.2-3.2c0.2-0.3,0.2-0.7,0-0.9c-0.3-0.3-0.7-0.2-0.9,0c-1,1.1-1.6,2.6-1.6,4.1
			C288.9,146.5,289.4,147.9,290.4,149.1"
          />
          <path
            className="st10"
            d="M305.9,139.1c-0.3-0.3-0.7-0.3-1,0s-0.3,0.7,0,1c1.3,1.3,2,3.1,2,4.9c0,1.8-0.8,3.6-2.1,4.9
			c-0.3,0.3-0.3,0.7,0,1c0.1,0.1,0.3,0.2,0.5,0.2s0.4-0.1,0.5-0.2c1.5-1.6,2.4-3.7,2.4-5.9C308.3,142.8,307.4,140.7,305.9,139.1"
          />
          <path
            className="st10"
            d="M302.4,145c0,0.6-0.3,1.2-0.7,1.7c-0.3,0.3-0.2,0.7,0.1,1c0.1,0.1,0.3,0.2,0.5,0.2s0.4-0.1,0.5-0.2
			c0.7-0.7,1-1.7,1-2.7s-0.3-2-1-2.7c-0.3-0.3-0.7-0.3-1,0s-0.3,0.7,0,1C302.2,143.7,302.4,144.3,302.4,145"
          />
          <path
            className="st10"
            d="M304.7,145c0,1.2-0.4,2.3-1.2,3.1c-0.3,0.3-0.2,0.7,0,0.9c0.1,0.1,0.3,0.2,0.5,0.2s0.4-0.1,0.5-0.2
			c1-1.1,1.6-2.5,1.6-4.1c0-1.5-0.5-3-1.6-4.1c-0.3-0.3-0.7-0.3-0.9,0c-0.3,0.3-0.3,0.7,0,0.9C304.3,142.7,304.7,143.8,304.7,145"
          />
        </g>
      </g>
      <g id="Layer_9">
        <circle className="st9" cx="237.4" cy="245.9" r="61.4" />
        <g>
          <path
            className="st1"
            d="M187.7,239.5l-5.8-1l0.7-3.8l0.6,0.1l-0.5,3.1l1.9,0.3l0.5-3l0.6,0.1l-0.5,3l2.6,0.5L187.7,239.5z"
          />
          <path
            className="st1"
            d="M185.6,234.5c-1.7-0.5-2.6-2-2.1-3.6c0.5-1.7,2.1-2.4,3.7-2c1.7,0.5,2.6,2,2.1,3.7S187.3,235,185.6,234.5z
			 M187.1,229.6c-1.3-0.4-2.5,0.2-2.9,1.4c-0.4,1.3,0.4,2.4,1.7,2.7c1.3,0.4,2.5-0.1,2.9-1.4C189.1,231.1,188.4,230,187.1,229.6z"
          />
          <path
            className="st1"
            d="M188.3,228.1l-3.3-1.4l0.3-0.7l3.3,1.4c1,0.4,1.8,0.2,2.3-0.8c0.4-1,0-1.8-1-2.2l-3.3-1.4l0.3-0.7l3.3,1.4
			c1.3,0.6,1.9,1.7,1.3,3.2C190.8,228.3,189.6,228.7,188.3,228.1z"
          />
          <path
            className="st1"
            d="M194.8,220.1l-5.8,0.6l4.1,2.3l-0.4,0.6l-5.1-2.9l0.4-0.6l5.7-0.6l-4-2.3l0.4-0.6l5.1,2.9L194.8,220.1z"
          />
          <path
            className="st1"
            d="M195.7,218.6l-4.7-3.5l1.2-1.6c1.1-1.5,2.8-1.7,4.2-0.7c1.3,1,1.6,2.7,0.6,4.2L195.7,218.6z M195.9,213.5
			c-1-0.8-2.3-0.7-3.2,0.4l-0.8,1l3.7,2.7l0.8-1C197.2,215.5,196.9,214.2,195.9,213.5z"
          />
          <path
            className="st1"
            d="M201.9,211.1l-1.3-0.5l-2,2.1l0.6,1.3l-0.6,0.6l-2.7-5.7l0.6-0.7l5.9,2.3L201.9,211.1z M196.8,209.1l1.5,3.1
			l1.7-1.8L196.8,209.1z"
          />
          <path
            className="st1"
            d="M203.5,209.7l-3.5-3.9l-1.4,1.2l-0.4-0.5l3.3-3l0.4,0.5l-1.4,1.3l3.5,3.9L203.5,209.7z"
          />
          <path
            className="st1"
            d="M205.9,207.6l-3.6-4.6l0.6-0.5l3.6,4.6L205.9,207.6z"
          />
          <path
            className="st1"
            d="M205.5,204.1c-1-1.4-0.7-3.2,0.7-4.1s3.2-0.5,4.1,0.9c1,1.4,0.7,3.2-0.7,4.2
			C208.2,206,206.5,205.5,205.5,204.1z M209.7,201.3c-0.8-1.1-2-1.5-3.1-0.8s-1.2,2-0.5,3.2c0.8,1.1,2,1.5,3.1,0.8
			C210.4,203.7,210.5,202.4,209.7,201.3z"
          />
          <path
            className="st1"
            d="M216.4,201.1l-5.2-2.6l2.1,4.2l-0.7,0.3l-2.6-5.2l0.7-0.3l5.1,2.6l-2.1-4.1l0.7-0.3l2.6,5.2L216.4,201.1z"
          />
          <path
            className="st1"
            d="M221.9,198.9l-0.9-1.1l-2.7,1v1.4l-0.8,0.3l0.2-6.3l0.9-0.3l4.2,4.7L221.9,198.9z M218.3,194.8l-0.1,3.4
			l2.3-0.9L218.3,194.8z"
          />
          <path
            className="st1"
            d="M223,198.6l-1.5-5.7l0.7-0.2l1.3,5l2.6-0.7l0.2,0.6L223,198.6z"
          />
          <path
            className="st1"
            d="M229,197.2l-0.7-5.8l2-0.2c1.8-0.2,3.1,0.9,3.3,2.6c0.2,1.7-0.8,3-2.6,3.3L229,197.2z M232.9,193.8
			c-0.1-1.3-1.1-2.2-2.5-2l-1.3,0.2l0.5,4.5l1.3-0.2C232.3,196.1,233,195,232.9,193.8z"
          />
          <path className="st1" d="M234.8,196.6l-0.2-5.9h0.7l0.2,5.9H234.8z" />
          <path
            className="st1"
            d="M236.5,193.5c0.1-1.8,1.5-3,3.1-2.9c1,0,1.8,0.5,2.2,1.2l-0.6,0.3c-0.4-0.5-1-0.8-1.7-0.9
			c-1.3,0-2.3,0.9-2.3,2.3c-0.1,1.4,0.9,2.4,2.2,2.5c0.7,0,1.3-0.3,1.6-0.6v-1.2l-2-0.1v-0.7l2.7,0.1l-0.1,2.1
			c-0.6,0.6-1.4,1-2.3,0.9C237.7,196.6,236.4,195.4,236.5,193.5z"
          />
          <path
            className="st1"
            d="M242.6,196.8l0.7-5.8l0.7,0.1l-0.7,5.8L242.6,196.8z"
          />
          <path
            className="st1"
            d="M245.8,197.3l0.9-5.1l-1.8-0.3l0.1-0.6l4.4,0.8l-0.1,0.6l-1.8-0.3l-0.9,5.1L245.8,197.3z"
          />
          <path
            className="st1"
            d="M252.5,198.9l-0.2-1.4l-2.8-0.8l-0.9,1.1l-0.8-0.2l3.8-5l0.9,0.2l0.7,6.3L252.5,198.9z M251.9,193.4l-2,2.7
			l2.4,0.7L251.9,193.4z"
          />
          <path
            className="st1"
            d="M253.6,199.2l2.1-5.5l0.7,0.3l-1.9,4.9l2.5,1l-0.2,0.6L253.6,199.2z"
          />
          <path
            className="st1"
            d="M260.5,198.9c0.9-1.6,2.6-2,4.1-1.2c0.9,0.5,1.3,1.3,1.4,2.1h-0.7c-0.1-0.6-0.4-1.2-1-1.5
			c-1.1-0.6-2.5-0.2-3.1,1c-0.7,1.2-0.3,2.6,0.8,3.2c0.6,0.3,1.3,0.3,1.8,0l0.4,0.6c-0.8,0.4-1.6,0.5-2.5,0
			C260.2,202.2,259.6,200.5,260.5,198.9z"
          />
          <path
            className="st1"
            d="M267.5,206.7l0.3-1.4l-2.4-1.7l-1.2,0.8l-0.7-0.5l5.3-3.4l0.7,0.5l-1.4,6.2L267.5,206.7z M268.9,201.4
			l-2.8,1.9l2,1.4L268.9,201.4z"
          />
          <path
            className="st1"
            d="M269.2,208.1l3.4-4l-1.4-1.2l0.4-0.5l3.4,2.9l-0.4,0.5l-1.4-1.2l-3.4,4L269.2,208.1z"
          />
          <path
            className="st1"
            d="M274.2,212.8l0.6-1.3l-2.1-2.1l-1.3,0.6l-0.6-0.6l5.8-2.4l0.6,0.6l-2.5,5.8L274.2,212.8z M276.4,207.8
			l-3.1,1.3l1.8,1.8L276.4,207.8z"
          />
          <path
            className="st1"
            d="M275,213.7l4.5-3.7l0.5,0.6l-4,3.3l1.7,2.1l-0.5,0.4L275,213.7z"
          />
          <path
            className="st1"
            d="M277.9,217.4l2-1.4l1.4-3.8l0.5,0.7l-1.2,3.1l3.3-0.1l0.5,0.7l-4.1,0.1l-2,1.4L277.9,217.4z"
          />
          <path
            className="st1"
            d="M280.3,219.4l0.7,0.1c-0.2,0.5-0.2,1.3,0.2,2c0.5,0.9,1.2,0.9,1.6,0.7c1.3-0.7-1.1-3.4,0.7-4.4
			c0.8-0.5,1.8-0.1,2.4,0.9c0.4,0.8,0.5,1.5,0.3,2.2l-0.7-0.1c0.2-0.6,0.1-1.3-0.2-1.8c-0.3-0.6-0.9-0.9-1.4-0.6
			c-1.1,0.7,1.2,3.3-0.7,4.4c-0.7,0.4-1.8,0.4-2.6-1C280.1,221,280.1,220.1,280.3,219.4z"
          />
          <path
            className="st1"
            d="M282.7,225.6l4.8-2.2l-0.8-1.7l0.6-0.3l1.8,4.1l-0.6,0.3l-0.8-1.7l-4.8,2.2L282.7,225.6z"
          />
          <path
            className="st1"
            d="M284.6,228l0.7,0.2c-0.3,0.5-0.5,1.2-0.2,2c0.3,1,1,1.1,1.4,1c1.4-0.5-0.5-3.5,1.5-4.2
			c0.9-0.3,1.8,0.3,2.2,1.4c0.3,0.8,0.2,1.6-0.1,2.2l-0.7-0.2c0.3-0.6,0.3-1.2,0.1-1.8c-0.2-0.7-0.7-1-1.3-0.8
			c-1.2,0.4,0.6,3.5-1.5,4.2c-0.8,0.3-1.8,0-2.3-1.5C284.1,229.5,284.3,228.6,284.6,228z"
          />
        </g>
        <g>
          <path
            className="st2"
            d="M181.2,248.3l4.5-0.4l0.1,1.5c0.1,1.4-0.8,2.4-2,2.5c-1.3,0.1-2.3-0.7-2.5-2.1L181.2,248.3z M183.8,251.4
			c1-0.1,1.7-0.8,1.6-1.9l-0.1-1l-3.5,0.3l0.1,1C182,250.9,182.8,251.5,183.8,251.4z"
          />
          <path
            className="st2"
            d="M182.1,255.1l0.4-0.1c-0.3-0.2-0.6-0.6-0.6-1c-0.1-0.5,0.2-1.2,0.9-1.3s1.2,0.4,1.3,0.9
			c0.1,0.4,0,0.8-0.3,1.1l0.6-0.1c0.4-0.1,0.6-0.5,0.5-0.9s-0.3-0.7-0.6-0.9l0.3-0.3c0.4,0.3,0.7,0.7,0.8,1.2
			c0.1,0.7-0.1,1.3-0.9,1.4l-2.2,0.4L182.1,255.1z M182.8,255l0.6-0.1c0.2-0.2,0.3-0.6,0.2-1c-0.1-0.5-0.4-0.8-0.8-0.7
			c-0.4,0.1-0.7,0.4-0.6,0.9C182.3,254.6,182.5,254.9,182.8,255z"
          />
          <path
            className="st2"
            d="M183.1,256.6l2.1-0.5l-0.1-0.5l0.4-0.1l0.1,0.5l0.9-0.2l0.1,0.5l-0.9,0.2l0.1,0.7l-0.4,0.1l-0.1-0.7l-2,0.4
			c-0.2,0.1-0.4,0.2-0.3,0.4c0,0.1,0.1,0.3,0.2,0.3l-0.3,0.2c-0.1-0.1-0.3-0.3-0.3-0.5C182.4,257,182.6,256.7,183.1,256.6z"
          />
          <path
            className="st2"
            d="M183.4,260.6l0.4-0.1c-0.4-0.2-0.6-0.5-0.7-0.9c-0.1-0.5,0.1-1.2,0.7-1.4c0.7-0.2,1.2,0.3,1.3,0.8
			c0.1,0.4,0.1,0.8-0.1,1.2l0.6-0.2c0.4-0.1,0.6-0.5,0.4-1c-0.1-0.4-0.3-0.7-0.7-0.9l0.3-0.3c0.4,0.2,0.7,0.6,0.9,1.1
			c0.2,0.7,0,1.3-0.7,1.5l-2.2,0.6L183.4,260.6z M184,260.4l0.6-0.2c0.2-0.3,0.2-0.6,0.1-1c-0.1-0.5-0.5-0.7-0.9-0.6s-0.6,0.5-0.5,1
			C183.5,260,183.7,260.3,184,260.4z"
          />
          <path
            className="st2"
            d="M185.8,263c0.9-0.3,1.8,0,2.2,0.9s-0.2,1.7-1.1,2.1h-0.1l-0.9-2.5c-0.6,0.3-0.9,0.8-0.6,1.5
			c0.1,0.4,0.4,0.7,0.8,0.8l-0.2,0.3c-0.4-0.2-0.8-0.5-0.9-1C184.5,264.2,184.9,263.3,185.8,263z M187.6,264
			c-0.2-0.7-0.9-0.8-1.4-0.6l0.8,2C187.4,265.2,187.9,264.7,187.6,264z"
          />
          <path
            className="st2"
            d="M186.7,269.3l0.8-1.5l-1.6-0.3l-0.2-0.5l2.1,0.4l1-1.7l0.2,0.5l-0.8,1.4l1.5,0.3l0.2,0.5L188,268l-1,1.9
			L186.7,269.3z"
          />
          <path
            className="st2"
            d="M188.5,269.2c0.9-0.5,1.8-0.2,2.3,0.6c0.3,0.5,0.2,1,0.1,1.3l-0.4-0.2c0.2-0.3,0.1-0.6,0-0.9
			c-0.3-0.6-1-0.8-1.6-0.4c-0.6,0.3-0.9,1-0.6,1.6c0.2,0.3,0.4,0.5,0.8,0.5l-0.1,0.4c-0.4-0.1-0.8-0.3-1.1-0.8
			C187.2,270.6,187.6,269.6,188.5,269.2z"
          />
          <path
            className="st2"
            d="M189.9,275l1.8-1.1c0.5-0.3,0.5-0.6,0.3-1c-0.2-0.3-0.6-0.5-0.9-0.6l-2,1.3l-0.3-0.4l3.9-2.4l0.3,0.4
			l-1.5,0.9c0.4,0,0.8,0.3,1.1,0.7c0.4,0.6,0.3,1.1-0.3,1.4l-2,1.2L189.9,275z"
          />
          <path
            className="st2"
            d="M191.9,278l0.3-0.2c-0.4,0-0.7-0.3-1-0.6c-0.3-0.4-0.4-1.1,0.2-1.6c0.6-0.4,1.2-0.1,1.5,0.3s0.4,0.8,0.3,1.1
			l0.5-0.3c0.4-0.3,0.4-0.7,0.1-1.1c-0.2-0.3-0.5-0.5-1-0.6l0.2-0.4c0.5,0.1,0.9,0.3,1.2,0.8c0.4,0.6,0.5,1.2-0.2,1.7l-1.8,1.3
			L191.9,278z M192.5,277.6l0.5-0.4c0.1-0.3,0-0.7-0.2-1c-0.3-0.4-0.7-0.5-1.1-0.3c-0.3,0.2-0.4,0.7-0.1,1.1
			C191.8,277.4,192.2,277.6,192.5,277.6z"
          />
          <path
            className="st2"
            d="M194.3,281l1.7-1.4c0.5-0.4,0.4-0.7,0.1-1.1c-0.3-0.3-0.7-0.4-1-0.4l-1.9,1.5l-0.3-0.4l2.5-2.1l0.3,0.4
			l-0.4,0.3c0.4,0,0.9,0.2,1.2,0.6c0.4,0.5,0.4,1-0.2,1.5l-1.8,1.5L194.3,281z"
          />
          <path
            className="st2"
            d="M194.7,282.8l0.4-0.1c0,0.4,0.1,0.7,0.4,1.1c0.4,0.4,0.9,0.6,1.4,0.1l0.4-0.3c-0.4,0-0.9-0.1-1.2-0.4
			c-0.6-0.6-0.5-1.5,0.2-2.2c0.8-0.7,1.7-0.7,2.2-0.1c0.3,0.3,0.4,0.8,0.3,1.2l0.4-0.3l0.3,0.4l-2.4,2.2c-0.8,0.7-1.5,0.4-2.1-0.2
			C194.9,283.7,194.7,283.4,194.7,282.8z M197.6,283.3l1.1-1c0.1-0.3,0-0.8-0.3-1.1c-0.5-0.5-1.1-0.4-1.6,0.1s-0.6,1.1-0.2,1.6
			C196.8,283.3,197.3,283.4,197.6,283.3z"
          />
          <path
            className="st2"
            d="M199,283.8c0.6-0.7,1.7-0.8,2.4-0.2c0.7,0.7,0.6,1.6,0,2.4l-0.1,0.1l-1.9-1.8c-0.4,0.5-0.4,1.2,0.1,1.6
			c0.3,0.3,0.7,0.4,1,0.4v0.4c-0.5,0-0.9-0.2-1.3-0.5C198.4,285.5,198.3,284.5,199,283.8z M201.1,283.9c-0.5-0.5-1.2-0.3-1.5,0.1
			l1.6,1.5C201.5,285.1,201.6,284.4,201.1,283.9z"
          />
          <path
            className="st2"
            d="M206.4,291.9l2.4-3.9l1.3,0.8c1.2,0.7,1.5,2.1,0.8,3.2s-2,1.5-3.2,0.7L206.4,291.9z M210.4,291.7
			c0.5-0.8,0.4-1.8-0.6-2.4l-0.8-0.5l-1.8,3l0.8,0.5C208.9,292.8,209.9,292.5,210.4,291.7z"
          />
          <path
            className="st2"
            d="M210.5,294.3l1.6-2.9l0.4,0.2l-1.6,2.9L210.5,294.3z M212.4,290.7c0.1-0.2,0.3-0.2,0.5-0.1s0.2,0.3,0.1,0.5
			s-0.3,0.2-0.5,0.1C212.3,291,212.3,290.8,212.4,290.7z"
          />
          <path
            className="st2"
            d="M211.5,295.8l0.4-0.2c0.1,0.4,0.3,0.7,0.8,0.9c0.5,0.2,1.1,0.2,1.4-0.4l0.2-0.4c-0.4,0.2-0.8,0.2-1.3,0
			c-0.8-0.4-1-1.2-0.6-2.2c0.5-1,1.3-1.3,2.1-0.9c0.4,0.2,0.7,0.6,0.8,1l0.2-0.4l0.5,0.2l-1.4,2.9c-0.4,0.9-1.3,0.9-2,0.6
			C212,296.6,211.7,296.3,211.5,295.8z M214.4,295.2l0.6-1.3c0-0.3-0.3-0.7-0.7-0.9c-0.6-0.3-1.2,0-1.5,0.7
			c-0.3,0.6-0.2,1.3,0.4,1.6C213.6,295.4,214.1,295.4,214.4,295.2z"
          />
          <path
            className="st2"
            d="M215.4,296.7l1.3-3l0.5,0.2l-1.3,3L215.4,296.7z M216.9,292.9c0.1-0.2,0.3-0.3,0.5-0.2
			c0.2,0.1,0.3,0.3,0.2,0.5s-0.3,0.3-0.4,0.2C216.9,293.2,216.8,293,216.9,292.9z"
          />
          <path
            className="st2"
            d="M217.1,296.6l0.8-2l-0.5-0.2l0.2-0.4l0.5,0.2l0.3-0.8l0.5,0.2l-0.3,0.8l0.6,0.2L219,295l-0.6-0.2l-0.7,1.9
			c-0.1,0.2,0,0.4,0.2,0.5c0.1,0.1,0.3,0,0.4,0v0.4c-0.2,0.1-0.4,0.1-0.6,0C217,297.4,216.9,297.1,217.1,296.6z"
          />
          <path
            className="st2"
            d="M220.5,298.6l0.1-0.4c-0.3,0.2-0.8,0.2-1.2,0.1c-0.5-0.2-1-0.7-0.7-1.4c0.2-0.7,0.9-0.8,1.4-0.7
			c0.4,0.1,0.7,0.4,0.9,0.8l0.2-0.6c0.1-0.4-0.1-0.8-0.6-0.9c-0.4-0.1-0.7-0.1-1.1,0.1l-0.1-0.4c0.5-0.2,0.9-0.3,1.4-0.1
			c0.7,0.2,1.1,0.7,0.9,1.4l-0.7,2.1H220.5z M220.8,297.9l0.2-0.6c-0.1-0.3-0.4-0.6-0.7-0.7c-0.5-0.2-0.9,0-1,0.4s0.1,0.8,0.5,0.9
			C220.1,298.1,220.5,298.1,220.8,297.9z"
          />
          <path
            className="st2"
            d="M222,299l1.2-4.4l0.5,0.1l-1.2,4.4L222,299z"
          />
          <path
            className="st2"
            d="M225.1,299.8l1-4.4l0.5,0.1l-1,4.4L225.1,299.8z"
          />
          <path
            className="st2"
            d="M226.7,298.5c0.2-0.9,1-1.6,1.9-1.4c1,0.2,1.4,1,1.3,2v0.1l-2.6-0.4c-0.1,0.6,0.3,1.2,1,1.3
			c0.4,0.1,0.8,0,1.1-0.2l0.2,0.4c-0.4,0.3-0.8,0.4-1.4,0.3C227.1,300.3,226.5,299.5,226.7,298.5z M228.5,297.5
			c-0.7-0.1-1.1,0.4-1.2,0.9l2.1,0.4C229.4,298.2,229.2,297.6,228.5,297.5z"
          />
          <path
            className="st2"
            d="M230.3,301.6l0.3-0.3c0.2,0.3,0.6,0.5,1,0.5c0.5,0.1,1.1-0.2,1.1-0.9v-0.5c-0.3,0.3-0.7,0.5-1.2,0.5
			c-0.9-0.1-1.4-0.8-1.3-1.8c0.1-1.1,0.8-1.6,1.6-1.6c0.4,0,0.8,0.3,1,0.7v-0.5h0.5l-0.3,3.2c-0.1,1-0.9,1.3-1.7,1.2
			C231.1,302.1,230.7,302,230.3,301.6z M232.9,300l0.1-1.4c-0.2-0.3-0.5-0.6-0.9-0.6c-0.7-0.1-1.1,0.4-1.2,1.1
			c-0.1,0.7,0.3,1.3,0.9,1.3C232.3,300.5,232.7,300.3,232.9,300z"
          />
          <path
            className="st2"
            d="M236.4,301.1v-0.4c-0.3,0.3-0.7,0.4-1.1,0.4c-0.6,0-1.1-0.4-1.1-1.1s0.6-1.1,1.2-1c0.4,0,0.8,0.2,1.1,0.5
			v-0.6c0-0.4-0.3-0.7-0.8-0.7c-0.4,0-0.7,0.1-1,0.4l-0.2-0.4c0.4-0.4,0.8-0.5,1.3-0.5c0.7,0,1.3,0.3,1.2,1.1l-0.1,2.3L236.4,301.1z
			 M236.5,300.4v-0.6c-0.2-0.3-0.5-0.4-0.9-0.4c-0.5,0-0.8,0.3-0.8,0.7c0,0.4,0.3,0.7,0.8,0.7C235.9,300.8,236.3,300.7,236.5,300.4z
			"
          />
          <path className="st2" d="M238,301.1l-0.1-4.5h0.5l0.1,4.5H238z" />
          <path
            className="st2"
            d="M240.7,296.9c0-0.2,0.1-0.4,0.3-0.4s0.4,0.1,0.4,0.3c0,0.2-0.1,0.3-0.3,0.4S240.7,297.1,240.7,296.9z
			 M241.1,301l-0.2-3.3h0.5l0.2,3.3H241.1z"
          />
          <path
            className="st2"
            d="M245,300.6l-0.1-0.5c-0.2,0.4-0.6,0.6-1,0.7c-0.9,0.1-1.5-0.5-1.7-1.5c-0.1-1,0.4-1.8,1.2-1.9
			c0.4-0.1,0.9,0.1,1.2,0.4l-0.2-1.7l0.5-0.1l0.5,4.5L245,300.6z M244.9,299.7l-0.2-1.5c-0.2-0.3-0.6-0.5-1-0.4
			c-0.7,0.1-1,0.7-0.9,1.4c0.1,0.7,0.5,1.2,1.2,1.1C244.4,300.3,244.8,300,244.9,299.7z"
          />
          <path
            className="st2"
            d="M246.1,298.8c-0.2-0.9,0.3-1.8,1.3-2s1.7,0.5,1.9,1.4v0.1l-2.6,0.5c0.2,0.6,0.7,1,1.4,0.9
			c0.4-0.1,0.7-0.3,0.9-0.6l0.3,0.3c-0.3,0.4-0.7,0.6-1.2,0.7C247.1,300.4,246.3,299.8,246.1,298.8z M247.4,297.2
			c-0.7,0.1-0.9,0.8-0.9,1.3l2.1-0.4C248.6,297.6,248.2,297.1,247.4,297.2z"
          />
          <path
            className="st2"
            d="M252.5,299.1L252,297c-0.1-0.6-0.5-0.7-0.9-0.5c-0.4,0.1-0.7,0.4-0.8,0.7l0.6,2.3l-0.5,0.1l-0.8-3.2l0.5-0.1
			l0.1,0.5c0.2-0.3,0.5-0.7,1-0.8c0.7-0.2,1.1,0.1,1.3,0.8l0.6,2.2L252.5,299.1z"
          />
          <path
            className="st2"
            d="M253.9,297.9l-0.7-2l-0.5,0.2l-0.1-0.4l0.5-0.2l-0.3-0.9l0.5-0.2l0.3,0.9l0.6-0.2l0.1,0.4l-0.6,0.2l0.6,1.9
			c0.1,0.2,0.2,0.4,0.4,0.3c0.1,0,0.2-0.1,0.3-0.2l0.3,0.3c-0.1,0.2-0.2,0.3-0.5,0.4C254.4,298.6,254,298.4,253.9,297.9z"
          />
          <path
            className="st2"
            d="M254.4,294.2c-0.1-0.2,0-0.4,0.2-0.4c0.2-0.1,0.4,0,0.4,0.2c0.1,0.2,0,0.4-0.2,0.4
			C254.7,294.5,254.5,294.4,254.4,294.2z M255.8,298l-1.1-3.1l0.5-0.2l1.1,3.1L255.8,298z"
          />
          <path
            className="st2"
            d="M257.1,296.8l-0.8-2l-0.5,0.2l-0.2-0.4l0.5-0.2l-0.3-0.8l0.5-0.2l0.3,0.8l0.6-0.2l0.2,0.4l-0.6,0.2l0.7,1.9
			c0.1,0.2,0.3,0.4,0.5,0.3c0.1-0.1,0.2-0.2,0.3-0.3l0.3,0.3c-0.1,0.2-0.2,0.3-0.5,0.4C257.6,297.5,257.3,297.3,257.1,296.8z"
          />
          <path
            className="st2"
            d="M259.3,297.6c0.1,0,0.2,0,0.3-0.1c0.2-0.1,0.3-0.2,0.3-0.5v-0.5l-2.6-2.5l0.5-0.2l2.1,2l-0.1-2.9l0.5-0.2
			l0.1,4.3c0,0.5-0.2,0.8-0.6,1c-0.1,0-0.3,0.1-0.4,0.1L259.3,297.6z"
          />
          <path
            className="st2"
            d="M269.5,291l-2.7-3.6l1.2-0.9c1.1-0.8,2.5-0.6,3.2,0.4c0.8,1,0.6,2.4-0.5,3.2L269.5,291z M270.8,287.3
			c-0.6-0.8-1.6-1-2.5-0.4l-0.8,0.6l2.1,2.8l0.8-0.6C271.4,289.1,271.4,288,270.8,287.3z"
          />
          <path
            className="st2"
            d="M270.6,285.1c-0.1-0.1-0.1-0.4,0-0.5s0.4-0.1,0.5,0s0.1,0.4,0,0.5C270.9,285.2,270.7,285.2,270.6,285.1z
			 M273.3,288.1l-2.1-2.5l0.4-0.3l2.1,2.5L273.3,288.1z"
          />
          <path
            className="st2"
            d="M275.1,287.7l-0.1-0.4c0.4,0,0.7-0.1,1.1-0.4c0.4-0.4,0.6-0.9,0.1-1.4l-0.3-0.4c0,0.4-0.1,0.9-0.4,1.2
			c-0.6,0.6-1.5,0.5-2.2-0.3s-0.7-1.7-0.1-2.2c0.3-0.3,0.8-0.4,1.2-0.3l-0.3-0.4l0.4-0.3l2.2,2.4c0.7,0.8,0.4,1.5-0.2,2.1
			C276,287.6,275.6,287.8,275.1,287.7z M275.6,284.8l-1-1.1c-0.3-0.1-0.8,0-1.1,0.3c-0.5,0.5-0.4,1.1,0.1,1.6s1.1,0.6,1.6,0.2
			C275.5,285.6,275.7,285.2,275.6,284.8z"
          />
          <path
            className="st2"
            d="M274.3,281.6c-0.1-0.1-0.1-0.4,0-0.5s0.3-0.1,0.5,0s0.1,0.3,0,0.5S274.5,281.8,274.3,281.6z M277.3,284.4
			l-2.3-2.3l0.4-0.4l2.3,2.3L277.3,284.4z"
          />
          <path
            className="st2"
            d="M277.9,282.8l-1.6-1.5l-0.4,0.4l-0.3-0.3l0.4-0.4l-0.7-0.6l0.4-0.4l0.7,0.6l0.5-0.5l0.3,0.3l-0.5,0.5l1.5,1.4
			c0.2,0.2,0.4,0.2,0.5,0c0.1-0.1,0.1-0.3,0.1-0.4l0.4,0.2c0,0.2-0.1,0.4-0.3,0.6C278.6,283.2,278.3,283.2,277.9,282.8z"
          />
          <path
            className="st2"
            d="M281,280.3l-0.3-0.2c0.1,0.4-0.1,0.8-0.3,1.1c-0.4,0.4-1,0.6-1.6,0.2c-0.6-0.5-0.5-1.1-0.1-1.6
			c0.3-0.3,0.6-0.5,1-0.6l-0.5-0.4c-0.3-0.3-0.8-0.2-1.1,0.2c-0.3,0.3-0.4,0.6-0.3,1.1h-0.4c-0.1-0.5,0.1-0.9,0.4-1.4
			c0.4-0.5,1.1-0.8,1.7-0.3l1.7,1.4L281,280.3z M280.5,279.9l-0.5-0.4c-0.3,0-0.7,0.2-0.9,0.4c-0.3,0.4-0.3,0.8,0,1.1
			c0.3,0.3,0.8,0.2,1.1-0.2C280.4,280.6,280.6,280.2,280.5,279.9z"
          />
          <path
            className="st2"
            d="M281.9,279.1l-3.6-2.7l0.3-0.4l3.6,2.7L281.9,279.1z"
          />
          <path
            className="st2"
            d="M283.7,275.8l1.5,0.9l-0.3,0.4l-3.8-2.5l0.3-0.4l0.4,0.3c-0.2-0.4-0.1-0.9,0.1-1.2c0.5-0.7,1.3-0.9,2.2-0.3
			c0.9,0.6,1.1,1.4,0.7,2.2C284.6,275.6,284.2,275.8,283.7,275.8z M283.8,273.5c-0.6-0.4-1.3-0.4-1.6,0.2c-0.2,0.3-0.2,0.8-0.1,1.1
			l1.2,0.8c0.3,0,0.8-0.2,1-0.5C284.7,274.5,284.5,273.9,283.8,273.5z"
          />
          <path
            className="st2"
            d="M287,271.4l-0.3-0.2c0.1,0.4,0.1,0.8-0.1,1.2c-0.3,0.5-0.9,0.8-1.5,0.5c-0.6-0.4-0.7-1-0.4-1.5
			c0.2-0.4,0.5-0.7,0.9-0.7l-0.5-0.3c-0.4-0.2-0.8,0-1,0.4c-0.2,0.3-0.2,0.7-0.1,1.1h-0.4c-0.2-0.5-0.1-0.9,0.2-1.4
			c0.3-0.6,0.9-1,1.6-0.6l2,1.1L287,271.4z M286.3,271l-0.5-0.3c-0.3,0-0.6,0.3-0.8,0.6c-0.2,0.4-0.1,0.9,0.2,1.1
			c0.4,0.2,0.8,0.1,1-0.4C286.4,271.7,286.5,271.4,286.3,271z"
          />
          <path
            className="st2"
            d="M288.4,270.4c0.1-0.1,0.1-0.2,0.2-0.2c0.1-0.2,0.1-0.4-0.1-0.6l-0.4-0.4l-3.6-0.2l0.2-0.5l2.9,0.2l-2-2.1
			l0.2-0.5l2.9,3.2c0.3,0.4,0.4,0.8,0.2,1.2c0,0.1-0.1,0.2-0.2,0.3L288.4,270.4z"
          />
          <path
            className="st2"
            d="M290.6,263.2l-2.1-0.8c-0.4-0.1-0.7-0.1-0.9,0.3c-0.1,0.3,0,0.7,0.2,1l2.3,0.9l-0.2,0.5l-2.1-0.8
			c-0.4-0.1-0.7-0.1-0.9,0.3c-0.1,0.3,0,0.7,0.2,1l2.2,0.9l-0.2,0.5l-3.1-1.2l0.2-0.5l0.4,0.2c-0.1-0.2-0.3-0.7-0.1-1.2
			c0.2-0.5,0.5-0.6,0.9-0.6c-0.2-0.3-0.4-0.8-0.2-1.2c0.2-0.6,0.6-0.7,1.3-0.5l2.2,0.8L290.6,263.2z"
          />
          <path
            className="st2"
            d="M289.4,261.4c-0.9-0.3-1.5-1.1-1.2-2c0.3-1,1.2-1.3,2.1-1h0.1l-0.7,2.6c0.6,0.1,1.2-0.1,1.4-0.8
			c0.1-0.4,0.1-0.8-0.1-1.1l0.4-0.1c0.2,0.4,0.3,0.9,0.1,1.4C291.3,261.2,290.4,261.6,289.4,261.4z M288.6,259.5
			c-0.2,0.7,0.3,1.2,0.8,1.3l0.6-2.1C289.5,258.6,288.8,258.7,288.6,259.5z"
          />
          <path
            className="st2"
            d="M292.5,255.7l-2.1-0.4c-0.6-0.1-0.8,0.1-0.9,0.6c-0.1,0.4,0.1,0.8,0.3,1.1l2.3,0.5L292,258l-3.2-0.7l0.1-0.5
			l0.5,0.1c-0.2-0.3-0.4-0.8-0.3-1.3c0.1-0.7,0.6-0.9,1.3-0.8l2.3,0.5L292.5,255.7z"
          />
          <path
            className="st2"
            d="M292.1,254l-2.1-0.3l-0.1,0.5l-0.4-0.1l0.1-0.5l-0.9-0.1l0.1-0.5l0.9,0.1l0.1-0.7l0.4,0.1l-0.1,0.7l2,0.3
			c0.2,0,0.4,0,0.5-0.3c0-0.1,0-0.3-0.1-0.4l0.4-0.1c0.1,0.1,0.2,0.3,0.1,0.6C292.9,253.9,292.6,254.1,292.1,254z"
          />
          <path
            className="st2"
            d="M292.6,252.4l-0.3-0.3c0.3-0.2,0.5-0.6,0.6-1c0.1-0.5-0.2-0.8-0.5-0.8c-0.8-0.1-0.5,2-1.7,1.9
			c-0.5-0.1-0.9-0.5-0.8-1.3c0.1-0.6,0.3-0.9,0.6-1.2l0.3,0.3c-0.3,0.2-0.5,0.5-0.5,0.9s0.1,0.7,0.4,0.8c0.7,0.1,0.5-2,1.7-1.9
			c0.5,0.1,0.9,0.5,0.8,1.4C293.2,251.7,293,252.1,292.6,252.4z"
          />
        </g>
      </g>
      <g id="Layer_8">
        <circle className="st1" cx="237.4" cy="246.5" r="36.6" />
        <g>
          <path className="st10" d="M223.2,234.7v-5.3h1.1v5.3H223.2z" />
          <path
            className="st10"
            d="M227.9,234.7v-2.3c0-0.5-0.3-0.7-0.7-0.7s-0.7,0.2-0.9,0.4v2.6h-1v-3.9h1v0.5c0.2-0.3,0.7-0.6,1.4-0.6
			c0.9,0,1.3,0.5,1.3,1.2v2.7h-1.1V234.7z"
          />
          <path
            className="st10"
            d="M229.6,232.7c0-1.2,0.9-2,2-2c0.8,0,1.3,0.3,1.5,0.7l-0.7,0.6c-0.2-0.3-0.5-0.4-0.8-0.4c-0.6,0-1,0.4-1,1.1
			c0,0.7,0.4,1.1,1,1.1c0.4,0,0.6-0.2,0.8-0.4l0.7,0.6c-0.3,0.4-0.7,0.7-1.5,0.7C230.5,234.8,229.6,233.9,229.6,232.7z"
          />
          <path className="st10" d="M233.8,234.7v-5.3h1v5.3H233.8z" />
          <path
            className="st10"
            d="M238.4,234.7v-0.5c-0.3,0.3-0.7,0.6-1.4,0.6c-0.8,0-1.2-0.5-1.2-1.2v-2.7h1v2.3c0,0.5,0.3,0.7,0.7,0.7
			s0.7-0.2,0.9-0.4v-2.6h1v3.9h-1V234.7z"
          />
          <path
            className="st10"
            d="M240.1,234.2l0.4-0.7c0.3,0.3,0.9,0.5,1.3,0.5c0.4,0,0.6-0.2,0.6-0.4c0-0.6-2.3-0.1-2.3-1.6
			c0-0.6,0.6-1.2,1.6-1.2c0.6,0,1.2,0.2,1.6,0.5l-0.4,0.7c-0.2-0.2-0.7-0.4-1.1-0.4c-0.4,0-0.6,0.2-0.6,0.4c0,0.6,2.3,0.1,2.3,1.6
			c0,0.7-0.6,1.2-1.7,1.2C241.1,234.8,240.5,234.5,240.1,234.2z"
          />
          <path
            className="st10"
            d="M244.1,229.8c0-0.3,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6s-0.3,0.6-0.6,0.6C244.3,230.4,244.1,230.1,244.1,229.8z
			 M244.2,234.7v-3.9h1v3.9H244.2z"
          />
          <path
            className="st10"
            d="M247.1,234.7l-1.6-3.9h1.1l1,2.7l1-2.7h1.1l-1.6,3.9H247.1z"
          />
          <path
            className="st10"
            d="M250,232.7c0-1.1,0.8-2,2-2s1.9,0.9,1.9,2.1v0.2H251c0.1,0.5,0.5,0.9,1.1,0.9c0.3,0,0.8-0.1,1-0.4l0.5,0.7
			c-0.4,0.4-1,0.5-1.6,0.5C250.8,234.8,250,234,250,232.7z M251.9,231.5c-0.6,0-0.9,0.4-0.9,0.8h1.9
			C252.9,232,252.6,231.5,251.9,231.5z"
          />
          <path
            className="st10"
            d="M212.9,243.7l-0.8-2.6l-0.8,2.6h-1.1l-1.2-3.9h1.1l0.7,2.6l0.8-2.6h0.9l0.8,2.6l0.7-2.6h1.1l-1.2,3.9H212.9z
			"
          />
          <path
            className="st10"
            d="M218.2,243.7v-2.4c0-0.5-0.3-0.7-0.7-0.7s-0.7,0.2-0.9,0.4v2.6h-1v-5.3h1v2c0.2-0.3,0.7-0.6,1.4-0.6
			c0.8,0,1.3,0.5,1.3,1.2v2.7h-1.1V243.7z"
          />
          <path
            className="st10"
            d="M219.9,241.7c0-1.1,0.8-2,2-2c1.3,0,2,0.9,2,2s-0.8,2-2,2C220.7,243.8,219.9,242.8,219.9,241.7z M223,241.7
			c0-0.6-0.4-1.1-1-1.1s-1,0.5-1,1.1s0.4,1.1,1,1.1C222.6,242.9,223,242.3,223,241.7z"
          />
          <path className="st10" d="M224.7,243.7v-5.3h1v5.3H224.7z" />
          <path
            className="st10"
            d="M226.5,241.7c0-1.1,0.8-2,2-2s1.9,0.9,1.9,2.1v0.2h-2.9c0.1,0.5,0.5,0.9,1.1,0.9c0.3,0,0.8-0.1,1-0.4
			l0.5,0.7c-0.4,0.4-1,0.5-1.6,0.5C227.4,243.8,226.5,243,226.5,241.7z M228.5,240.5c-0.6,0-0.9,0.4-0.9,0.8h1.9
			C229.4,241,229.1,240.5,228.5,240.5z"
          />
          <path className="st10" d="M230.8,242.2v-0.9h1.9v0.9H230.8z" />
          <path
            className="st10"
            d="M233.2,241.7c0-1.1,0.8-2,2-2c1.3,0,2,0.9,2,2s-0.8,2-2,2C234,243.8,233.2,242.8,233.2,241.7z M236.2,241.7
			c0-0.6-0.4-1.1-1-1.1s-1,0.5-1,1.1s0.4,1.1,1,1.1C235.9,242.9,236.2,242.3,236.2,241.7z"
          />
          <path
            className="st10"
            d="M238.2,243.7v-3h-0.6v-0.9h0.6v-0.2c0-0.9,0.5-1.4,1.3-1.4c0.4,0,0.8,0.1,1,0.4l-0.4,0.6
			c-0.1-0.1-0.2-0.2-0.4-0.2c-0.3,0-0.5,0.2-0.5,0.6v0.2h0.8v0.9h-0.8v3L238.2,243.7L238.2,243.7z"
          />
          <path className="st10" d="M240.3,242.2v-0.9h1.9v0.9H240.3z" />
          <path
            className="st10"
            d="M242.6,243.2l0.4-0.7c0.3,0.3,0.9,0.5,1.3,0.5c0.4,0,0.6-0.2,0.6-0.4c0-0.6-2.3-0.1-2.3-1.6
			c0-0.6,0.6-1.2,1.6-1.2c0.6,0,1.2,0.2,1.6,0.5l-0.4,0.7c-0.2-0.2-0.7-0.4-1.1-0.4c-0.4,0-0.6,0.2-0.6,0.4c0,0.6,2.3,0.1,2.3,1.6
			c0,0.7-0.6,1.2-1.7,1.2C243.6,243.8,243,243.5,242.6,243.2z"
          />
          <path
            className="st10"
            d="M246.4,241.7c0-1.1,0.8-2,2-2c1.3,0,2,0.9,2,2s-0.8,2-2,2C247.2,243.8,246.4,242.8,246.4,241.7z
			 M249.5,241.7c0-0.6-0.4-1.1-1-1.1s-1,0.5-1,1.1s0.4,1.1,1,1.1C249.1,242.9,249.5,242.3,249.5,241.7z"
          />
          <path
            className="st10"
            d="M251,241.7c0-1.2,0.9-2,2-2c0.8,0,1.3,0.3,1.5,0.7l-0.7,0.6c-0.2-0.3-0.5-0.4-0.8-0.4c-0.6,0-1,0.4-1,1.1
			c0,0.7,0.4,1.1,1,1.1c0.4,0,0.6-0.2,0.8-0.4l0.7,0.6c-0.3,0.4-0.7,0.7-1.5,0.7C251.9,243.8,251,242.9,251,241.7z"
          />
          <path
            className="st10"
            d="M255.1,238.8c0-0.3,0.3-0.6,0.6-0.6c0.3,0,0.6,0.3,0.6,0.6s-0.3,0.6-0.6,0.6
			C255.4,239.4,255.1,239.1,255.1,238.8z M255.2,243.7v-3.9h1v3.9H255.2z"
          />
          <path
            className="st10"
            d="M256.9,241.7c0-1.1,0.8-2,2-2s1.9,0.9,1.9,2.1v0.2H258c0.1,0.5,0.5,0.9,1.1,0.9c0.3,0,0.8-0.1,1-0.4l0.5,0.7
			c-0.4,0.4-1,0.5-1.6,0.5C257.8,243.8,256.9,243,256.9,241.7z M258.9,240.5c-0.6,0-0.9,0.4-0.9,0.8h1.9
			C259.8,241,259.6,240.5,258.9,240.5z"
          />
          <path
            className="st10"
            d="M261.7,242.7v-2h-0.6v-0.9h0.6v-1.1h1v1.1h0.8v0.9h-0.8v1.7c0,0.2,0.1,0.4,0.4,0.4c0.2,0,0.3-0.1,0.4-0.1
			l0.2,0.8c-0.2,0.1-0.4,0.2-0.8,0.2C262.1,243.8,261.7,243.4,261.7,242.7z"
          />
          <path
            className="st10"
            d="M264.2,244.3c0.1,0,0.2,0.1,0.3,0.1c0.3,0,0.4-0.1,0.5-0.3l0.1-0.3l-1.6-3.9h1.1l1,2.7l1-2.7h1.1l-1.8,4.5
			c-0.3,0.7-0.8,0.9-1.5,0.9c-0.1,0-0.4,0-0.5-0.1L264.2,244.3z"
          />
          <path
            className="st10"
            d="M229.4,252.7v-0.5c-0.3,0.4-0.7,0.6-1.2,0.6c-1,0-1.7-0.7-1.7-2s0.7-2,1.7-2c0.5,0,0.9,0.2,1.2,0.6v-2h1v5.3
			L229.4,252.7L229.4,252.7z M229.4,251.4V250c-0.2-0.3-0.5-0.4-0.9-0.4c-0.6,0-1,0.5-1,1.1c0,0.7,0.4,1.1,1,1.1
			C228.9,251.9,229.3,251.7,229.4,251.4z"
          />
          <path
            className="st10"
            d="M231.3,247.8c0-0.3,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6s-0.3,0.6-0.6,0.6C231.6,248.4,231.3,248.1,231.3,247.8z
			 M231.4,252.7v-3.9h1v3.9H231.4z"
          />
          <path
            className="st10"
            d="M233.3,253.7l0.5-0.7c0.3,0.3,0.7,0.5,1.2,0.5s1.1-0.2,1.1-1V252c-0.3,0.4-0.7,0.6-1.2,0.6
			c-1,0-1.7-0.7-1.7-2s0.7-2,1.7-2c0.5,0,0.9,0.2,1.2,0.6v-0.5h1v3.6c0,1.5-1.1,1.8-2.1,1.8C234.3,254.2,233.8,254.1,233.3,253.7z
			 M236.1,251.3V250c-0.2-0.2-0.5-0.4-0.9-0.4c-0.6,0-1,0.4-1,1.1s0.4,1.1,1,1.1C235.5,251.7,235.9,251.6,236.1,251.3z"
          />
          <path
            className="st10"
            d="M237.9,247.8c0-0.3,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6s-0.3,0.6-0.6,0.6C238.2,248.4,237.9,248.1,237.9,247.8z
			 M238,252.7v-3.9h1v3.9H238z"
          />
          <path
            className="st10"
            d="M240.2,251.7v-2h-0.6v-0.9h0.6v-1.1h1v1.1h0.8v0.9h-0.8v1.7c0,0.2,0.1,0.4,0.4,0.4c0.2,0,0.3-0.1,0.4-0.1
			l0.2,0.8c-0.2,0.1-0.4,0.2-0.8,0.2C240.6,252.8,240.2,252.4,240.2,251.7z"
          />
          <path
            className="st10"
            d="M245,252.7v-0.4c-0.3,0.3-0.7,0.5-1.2,0.5c-0.6,0-1.3-0.4-1.3-1.3c0-0.9,0.7-1.2,1.3-1.2
			c0.5,0,1,0.2,1.2,0.5v-0.5c0-0.4-0.3-0.6-0.8-0.6c-0.4,0-0.8,0.2-1.1,0.5l-0.4-0.7c0.5-0.4,1.1-0.6,1.7-0.6c0.9,0,1.7,0.4,1.7,1.5
			v2.5H245V252.7z M245,251.7v-0.5c-0.2-0.2-0.5-0.3-0.8-0.3c-0.4,0-0.7,0.2-0.7,0.6s0.3,0.6,0.7,0.6
			C244.5,252.1,244.8,252,245,251.7z"
          />
          <path className="st10" d="M247,252.7v-5.3h1v5.3H247z" />
          <path
            className="st10"
            d="M212.6,260.7v-2H212v-0.9h0.6v-1.1h1v1.1h0.8v0.9h-0.8v1.7c0,0.2,0.1,0.4,0.4,0.4c0.2,0,0.3-0.1,0.4-0.1
			l0.2,0.8c-0.2,0.1-0.4,0.2-0.8,0.2C213,261.8,212.6,261.4,212.6,260.7z"
          />
          <path
            className="st10"
            d="M215.1,261.7v-3.9h1v0.5c0.3-0.3,0.8-0.6,1.2-0.6v1c-0.1,0-0.2,0-0.3,0c-0.3,0-0.8,0.2-1,0.4v2.6H215.1z"
          />
          <path
            className="st10"
            d="M220.2,261.7v-0.4c-0.3,0.3-0.7,0.5-1.2,0.5c-0.6,0-1.3-0.4-1.3-1.3s0.7-1.2,1.3-1.2c0.5,0,1,0.2,1.2,0.5
			v-0.5c0-0.4-0.3-0.6-0.8-0.6c-0.4,0-0.8,0.2-1.1,0.5l-0.4-0.7c0.5-0.4,1.1-0.6,1.7-0.6c0.9,0,1.7,0.4,1.7,1.5v2.5h-1.1V261.7z
			 M220.2,260.7v-0.5c-0.2-0.2-0.5-0.3-0.8-0.3c-0.4,0-0.7,0.2-0.7,0.6s0.3,0.6,0.7,0.6C219.7,261.1,220,261,220.2,260.7z"
          />
          <path
            className="st10"
            d="M224.8,261.7v-2.3c0-0.5-0.3-0.7-0.7-0.7s-0.7,0.2-0.9,0.4v2.6h-1v-3.9h1v0.5c0.2-0.3,0.7-0.6,1.4-0.6
			c0.9,0,1.3,0.5,1.3,1.2v2.7L224.8,261.7L224.8,261.7z"
          />
          <path
            className="st10"
            d="M226.4,261.2l0.4-0.7c0.3,0.3,0.9,0.5,1.3,0.5c0.4,0,0.6-0.2,0.6-0.4c0-0.6-2.3-0.1-2.3-1.6
			c0-0.6,0.6-1.2,1.6-1.2c0.6,0,1.2,0.2,1.6,0.5l-0.4,0.7c-0.2-0.2-0.7-0.4-1.1-0.4c-0.4,0-0.6,0.2-0.6,0.4c0,0.6,2.3,0.1,2.3,1.6
			c0,0.7-0.6,1.2-1.7,1.2C227.5,261.8,226.8,261.5,226.4,261.2z"
          />
          <path
            className="st10"
            d="M230.8,261.7v-3h-0.6v-0.9h0.6v-0.2c0-0.9,0.5-1.4,1.3-1.4c0.4,0,0.8,0.1,1,0.4l-0.4,0.6
			c-0.1-0.1-0.2-0.2-0.4-0.2c-0.3,0-0.5,0.2-0.5,0.6v0.2h0.8v0.9h-0.8v3H230.8z"
          />
          <path
            className="st10"
            d="M232.9,259.7c0-1.1,0.8-2,2-2c1.3,0,2,0.9,2,2s-0.8,2-2,2C233.6,261.8,232.9,260.8,232.9,259.7z
			 M235.9,259.7c0-0.6-0.4-1.1-1-1.1s-1,0.5-1,1.1s0.4,1.1,1,1.1C235.5,260.9,235.9,260.3,235.9,259.7z"
          />
          <path
            className="st10"
            d="M237.7,261.7v-3.9h1v0.5c0.3-0.3,0.8-0.6,1.2-0.6v1c-0.1,0-0.2,0-0.3,0c-0.3,0-0.8,0.2-1,0.4v2.6H237.7z"
          />
          <path
            className="st10"
            d="M245.3,261.7v-2.4c0-0.4-0.2-0.6-0.6-0.6c-0.4,0-0.7,0.2-0.8,0.4v2.6h-1v-2.4c0-0.4-0.2-0.6-0.6-0.6
			c-0.4,0-0.6,0.2-0.8,0.4v2.6h-1v-3.9h1v0.5c0.2-0.2,0.7-0.6,1.3-0.6s0.9,0.3,1.1,0.7c0.2-0.3,0.7-0.7,1.3-0.7
			c0.7,0,1.1,0.4,1.1,1.2v2.8H245.3z"
          />
          <path
            className="st10"
            d="M249.6,261.7v-0.4c-0.3,0.3-0.7,0.5-1.2,0.5c-0.6,0-1.3-0.4-1.3-1.3s0.7-1.2,1.3-1.2c0.5,0,1,0.2,1.2,0.5
			v-0.5c0-0.4-0.3-0.6-0.8-0.6c-0.4,0-0.8,0.2-1.1,0.5l-0.4-0.7c0.5-0.4,1.1-0.6,1.7-0.6c0.9,0,1.7,0.4,1.7,1.5v2.5h-1.1V261.7z
			 M249.6,260.7v-0.5c-0.2-0.2-0.5-0.3-0.8-0.3c-0.4,0-0.7,0.2-0.7,0.6s0.3,0.6,0.7,0.6C249.1,261.1,249.4,261,249.6,260.7z"
          />
          <path
            className="st10"
            d="M251.8,260.7v-2h-0.6v-0.9h0.6v-1.1h1v1.1h0.8v0.9h-0.8v1.7c0,0.2,0.1,0.4,0.4,0.4c0.2,0,0.3-0.1,0.4-0.1
			l0.2,0.8c-0.2,0.1-0.4,0.2-0.8,0.2C252.2,261.8,251.8,261.4,251.8,260.7z"
          />
          <path
            className="st10"
            d="M254.1,256.8c0-0.3,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6s-0.3,0.6-0.6,0.6C254.4,257.4,254.1,257.1,254.1,256.8z
			 M254.2,261.7v-3.9h1v3.9H254.2z"
          />
          <path
            className="st10"
            d="M256,259.7c0-1.1,0.8-2,2-2c1.3,0,2,0.9,2,2s-0.8,2-2,2C256.7,261.8,256,260.8,256,259.7z M259,259.7
			c0-0.6-0.4-1.1-1-1.1s-1,0.5-1,1.1s0.4,1.1,1,1.1C258.6,260.9,259,260.3,259,259.7z"
          />
          <path
            className="st10"
            d="M263.4,261.7v-2.3c0-0.5-0.3-0.7-0.7-0.7c-0.4,0-0.7,0.2-0.9,0.4v2.6h-1v-3.9h1v0.5c0.2-0.3,0.7-0.6,1.4-0.6
			c0.9,0,1.3,0.5,1.3,1.2v2.7L263.4,261.7L263.4,261.7z"
          />
        </g>
      </g>
      <g id="Layer_5">
        <g>
          <path
            className="st0"
            d="M144.1,38.6l-0.9-0.9l-2.4,1.1l0.1,1.3l-0.7,0.3l-0.3-5.7l0.7-0.3l4.2,3.9L144.1,38.6z M140.5,35.1l0.2,3.1
			l2.1-0.9L140.5,35.1z"
          />
          <path
            className="st0"
            d="M149.6,36.2l-1-2.4c-0.2-0.4-0.5-0.7-1-0.5c-0.4,0.2-0.6,0.6-0.7,0.9l1.1,2.6l-0.6,0.2l-1-2.4
			c-0.2-0.4-0.5-0.7-1-0.5c-0.4,0.2-0.6,0.6-0.7,1l1.1,2.6l-0.6,0.2l-1.5-3.6l0.6-0.2l0.2,0.5c0.1-0.3,0.4-0.9,0.9-1.1
			c0.5-0.2,1-0.1,1.2,0.3c0.1-0.4,0.4-1,0.9-1.2c0.6-0.3,1.1-0.1,1.5,0.6l1.1,2.6L149.6,36.2z"
          />
          <path
            className="st0"
            d="M151.3,35.5l-2-4.9l0.6-0.2l0.8,1.9c0.1-0.5,0.5-0.9,1-1.1c0.9-0.4,1.9,0.1,2.4,1.2c0.5,1.2,0.1,2.1-0.8,2.5
			c-0.5,0.2-1,0.1-1.5-0.1l0.2,0.5L151.3,35.5z M152.7,34.4c0.7-0.3,0.9-1,0.6-1.8c-0.3-0.8-1-1.2-1.7-0.9c-0.4,0.2-0.8,0.6-0.8,1
			l0.7,1.6C151.8,34.5,152.3,34.6,152.7,34.4z"
          />
          <path
            className="st0"
            d="M153.7,29.4c-0.1-0.2,0-0.4,0.2-0.5s0.4,0,0.5,0.2s0,0.4-0.2,0.5S153.8,29.6,153.7,29.4z M155.5,33.8
			l-1.4-3.6l0.6-0.2l1.4,3.6L155.5,33.8z"
          />
          <path
            className="st0"
            d="M157,32.4l-0.9-2.4l-0.6,0.2l-0.2-0.5l0.6-0.2l-0.4-1l0.6-0.2l0.4,1l0.7-0.3l0.2,0.5l-0.7,0.3l0.8,2.2
			c0.1,0.3,0.3,0.4,0.5,0.3c0.2-0.1,0.3-0.2,0.3-0.3l0.3,0.4c-0.1,0.2-0.3,0.4-0.6,0.5C157.6,33.1,157.2,32.9,157,32.4z"
          />
          <path
            className="st0"
            d="M157.6,27.9c-0.1-0.2,0-0.4,0.2-0.5s0.4,0,0.5,0.2s0,0.4-0.2,0.5C157.9,28.2,157.7,28.1,157.6,27.9z
			 M159.4,32.4l-1.3-3.6l0.6-0.2l1.3,3.6L159.4,32.4z"
          />
          <path
            className="st0"
            d="M160.2,30c-0.4-1.1,0-2.2,1.1-2.5c1.1-0.4,2.1,0.2,2.5,1.3s0,2.2-1.1,2.6C161.6,31.7,160.6,31.1,160.2,30z
			 M163.2,29c-0.3-0.7-0.9-1.3-1.7-1s-1,1.1-0.7,1.8c0.3,0.7,0.9,1.3,1.7,1S163.5,29.7,163.2,29z"
          />
          <path
            className="st0"
            d="M167.8,29.5l-0.8-2.4c-0.2-0.7-0.6-0.7-1.1-0.6c-0.4,0.1-0.8,0.6-0.9,0.9l0.9,2.7l-0.6,0.2l-1.2-3.7l0.6-0.2
			l0.2,0.5c0.2-0.4,0.6-0.9,1.1-1.1c0.8-0.2,1.3,0,1.6,0.8l0.8,2.6L167.8,29.5z"
          />
          <path
            className="st1"
            d="M218.6,18.4l0.4-0.6c0.4,0.4,1.1,0.8,1.9,0.7c1.1-0.1,1.4-0.7,1.3-1.1c-0.1-1.5-3.6-0.4-3.8-2.6
			c-0.1-1,0.8-1.7,1.9-1.8c0.9-0.1,1.6,0.2,2.2,0.7l-0.4,0.6c-0.5-0.5-1.1-0.6-1.8-0.6c-0.7,0.1-1.2,0.5-1.2,1
			c0.1,1.3,3.6,0.3,3.8,2.5c0.1,0.9-0.5,1.8-2.1,1.9C219.9,19.3,219.1,19,218.6,18.4z"
          />
          <path
            className="st1"
            d="M225.6,18.8l-0.3-5.3l-1.9,0.1v-0.7l4.5-0.3v0.7l-1.9,0.1l0.3,5.3L225.6,18.8z"
          />
          <path
            className="st1"
            d="M232.7,18.5l-1.6-2.3h-1.2l0.1,2.4h-0.7l-0.2-6l2.4-0.1c1.1,0,1.9,0.7,1.9,1.8s-0.7,1.7-1.5,1.8l1.7,2.4
			H232.7z M232.7,14.3c0-0.7-0.5-1.1-1.2-1.1h-1.6l0.1,2.3h1.6C232.2,15.5,232.7,15,232.7,14.3z"
          />
          <path
            className="st1"
            d="M239,18.5l-0.5-1.3h-3l-0.5,1.3h-0.9l2.4-6h0.9l2.4,6H239z M236.9,13.2l-1.3,3.2h2.5L236.9,13.2z"
          />
          <path
            className="st1"
            d="M241.5,18.5l0.1-5.3h-1.9v-0.7l4.6,0.1v0.7h-1.9l-0.1,5.3L241.5,18.5z"
          />
          <path
            className="st1"
            d="M245.1,18.6l0.2-6l3.9,0.1v0.7l-3.2-0.1l-0.1,1.9l3.1,0.1V16l-3.1-0.1l-0.1,2.1h3.2v0.7L245.1,18.6z"
          />
          <path
            className="st1"
            d="M250.1,15.7c0.1-1.9,1.6-3,3.3-2.9c1.1,0.1,1.8,0.6,2.3,1.3l-0.6,0.3c-0.3-0.5-1-0.9-1.7-0.9
			c-1.3-0.1-2.4,0.9-2.5,2.3s0.8,2.5,2.2,2.6c0.7,0,1.3-0.3,1.7-0.5l0.1-1.2l-2.1-0.1v-0.7l2.8,0.2l-0.1,2.2c-0.6,0.6-1.4,1-2.4,0.9
			C251.3,18.9,250,17.6,250.1,15.7z"
          />
          <path
            className="st1"
            d="M258.2,19.3l0.2-2.5l-2.1-3.7l0.9,0.1l1.6,2.9l2.1-2.6l0.9,0.1l-2.7,3.2l-0.2,2.5L258.2,19.3z"
          />
          <path
            className="st0"
            d="M310.8,30.3l-0.1-1.3l-2.5-0.8l-0.8,1l-0.7-0.2l3.7-4.4l0.8,0.3l0.4,5.7L310.8,30.3z M310.5,25.3l-2,2.4
			l2.2,0.7L310.5,25.3z"
          />
          <path
            className="st0"
            d="M312.9,30.3l-0.7,1.9l-0.6-0.2l1.8-5l0.6,0.2l-0.2,0.5c0.4-0.3,0.9-0.4,1.5-0.2c1,0.3,1.4,1.3,1,2.5
			s-1.3,1.7-2.3,1.3C313.4,31.2,313,30.9,312.9,30.3z M315.6,29.9c0.3-0.8,0.1-1.6-0.7-1.8c-0.4-0.2-1,0-1.3,0.2l-0.6,1.6
			c0.1,0.4,0.4,0.8,0.9,1C314.6,31.1,315.3,30.7,315.6,29.9z"
          />
          <path
            className="st0"
            d="M317.2,31.9l-0.7,1.9l-0.6-0.2l1.9-5l0.6,0.2l-0.2,0.5c0.4-0.3,0.9-0.4,1.5-0.2c1,0.4,1.3,1.3,0.9,2.5
			s-1.4,1.7-2.3,1.3C317.7,32.8,317.3,32.4,317.2,31.9z M319.9,31.5c0.3-0.8,0.1-1.6-0.6-1.8c-0.4-0.2-1-0.1-1.3,0.2l-0.6,1.6
			c0.1,0.4,0.4,0.8,0.9,1C318.9,32.7,319.6,32.3,319.9,31.5z"
          />
          <path
            className="st0"
            d="M320.6,33.8l1.4-3.6l0.6,0.2l-0.2,0.6c0.4-0.3,1-0.4,1.5-0.2l-0.2,0.6c-0.1,0-0.1-0.1-0.2-0.1
			c-0.4-0.1-0.9,0-1.2,0.2l-1,2.5L320.6,33.8z"
          />
          <path
            className="st0"
            d="M323.6,32.9c0.4-1,1.4-1.6,2.5-1.1c1.1,0.4,1.4,1.6,1,2.6s-1.5,1.6-2.5,1.2C323.5,35.1,323.2,33.9,323.6,32.9
			z M326.6,34.1c0.3-0.7,0.1-1.5-0.6-1.9c-0.8-0.3-1.5,0.2-1.7,0.9c-0.3,0.7-0.1,1.6,0.6,1.9C325.6,35.3,326.3,34.8,326.6,34.1z"
          />
          <path
            className="st0"
            d="M329.5,37.5l0.2-0.4c-0.4,0.2-0.9,0.2-1.4,0c-0.6-0.3-1.1-0.9-0.7-1.7c0.3-0.8,1.1-0.9,1.7-0.6
			c0.5,0.2,0.8,0.5,1,1l0.3-0.6c0.2-0.5-0.1-0.9-0.6-1.1c-0.4-0.2-0.8-0.2-1.3,0l-0.1-0.5c0.6-0.2,1.1-0.2,1.7,0
			c0.8,0.3,1.2,0.9,0.9,1.8l-1.1,2.4L329.5,37.5z M329.8,36.7l0.3-0.7c-0.1-0.4-0.4-0.7-0.8-0.9c-0.5-0.2-1-0.1-1.2,0.4
			s0,0.9,0.5,1.2C329.1,36.9,329.5,36.9,329.8,36.7z"
          />
          <path
            className="st0"
            d="M331.7,36.3c0.5-1,1.5-1.5,2.6-1c0.6,0.3,0.9,0.7,1,1.2l-0.5,0.2c-0.1-0.4-0.3-0.7-0.7-0.9
			c-0.7-0.3-1.5,0-1.8,0.8c-0.4,0.8-0.1,1.6,0.6,1.9c0.4,0.2,0.7,0.2,1.1-0.1l0.2,0.5c-0.4,0.2-0.9,0.3-1.6,0
			C331.6,38.5,331.2,37.4,331.7,36.3z"
          />
          <path
            className="st0"
            d="M337.1,40.9l1.1-2.3c0.3-0.6,0.1-0.9-0.4-1.2c-0.4-0.2-0.9-0.1-1.3,0.1l-1.2,2.6l-0.5-0.3L337,35l0.5,0.3
			l-0.9,1.8c0.4-0.2,1-0.3,1.5,0c0.7,0.3,0.9,0.9,0.6,1.6l-1.2,2.5L337.1,40.9z"
          />
        </g>
        <path
          className="st13"
          d="M228.6,466.9c-117-5.1-210.2-101.5-210.2-219.7c0-118,92.9-214.3,209.6-219.7"
        />
        <path
          className="st13"
          d="M251.1,27.6C366.6,34.2,458.3,130,458.3,247.2c0,116.6-90.7,212-205.5,219.5"
        />
        <path className="st14" d="M238.4,27.2c4.3,0,8.5,0.1,12.7,0.4" />
        <path className="st14" d="M238.3,450.8c-3,0-6.1-0.1-9.1-0.2" />
      </g>
    </svg>
  );
};

export const getStaticProps = async () => {
  const countries = db.countries.filter(isMemberState).map((country) => {
    return {
      name: country["Country or Area"],
      alpha2: country["ISO-alpha2 Code"],
      alpha3: country["ISO-alpha3 Code"],
    };
  });
  const country = db.countries.find(
    (country) => country["Country or Area"] === "Ghana"
  );

  const groupedDefinitions = groupBy(db.definitions, "Pillar");

  // For some reason, one of the definition keys is an empty string.
  // Let's remove it.
  delete groupedDefinitions[""];

  const pillars = db.definitions;

  return {
    props: {
      definitions: groupedDefinitions,
      pillars,
      countries,
      country,
    },
  };
};

const numberWords = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
