import { InferGetStaticPropsType } from "next";
import { db } from "database";
import dynamic from "next/dynamic";
import Link from "next/link";
import Layout from "components/Layout";
import ScoreRing from "components/score-ring";
import { groupBy } from "lodash";
import { isMemberState, stageNames } from "lib";
import Icons from "components/icons";
import { Definition } from "database/processed/db";
import { useEffect, useState } from "react";
import { interpolateHclLong, lab, scaleLinear } from "d3";
import { AnimatePresence, motion } from "framer-motion";
import { ancillary } from "database/ancillary";
import Image from "next/image";
import Script from "next/script";
import YouTube from "react-youtube";

import githubScreenshot from "../public/github.png";

const AboutScrollytelling = dynamic(
  () => import("components/about-scrollytelling"),
  { ssr: false }
);

interface Dictionary<T> {
  [Key: string]: T;
}
type Definitions = Dictionary<Definition[]>;

const NavBar = () => {
  return (
    <nav className="flex items-center justify-start p-4">
      <Link href="/">
        <a className="mr-4 text-gray-800 hover:text-red-500 uppercase">Home</a>
      </Link>
      <span className="text-red-500">/</span>
      <Link href="/about">
        <a className="ml-4 text-red-500">About</a>
      </Link>
    </nav>
  );
};

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
      <div className="py-4">
        <div className="px-5 pb-5">
          <div className="w-full bg-gray-200 md:px-20">
            <div className="md:mx-auto">
              <div className="container md:px-4 md:mx-auto">
                <NavBar />
                <div className="max-w-[40em] py-5 sm:py-10 text-lg text-start sm:text-center md:text-left md:pl-5">
                  <h2 className="heading-title-size font-bold mt-0 md:mt-6 uppercase mb-3 hero-content-text-color">
                    About
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container px-4 mx-auto">
          <div className="text-lg flex flex-col items-center">
            <div className="max-w-[40em] space-y-9 text-justify">
              <p>
                The Digital Development Compass provides an analysis of national
                digital development based on a comprehensive collection of
                publicly available data sets on digital.
              </p>

              <p>
                The Compass aggregates and synthesises digital development
                indicators from over 140 publicly available open-source datasets
                into interactive dashboards across the pillars of the United
                Nations Development Programme's (UNDP){" "}
                <a
                  href="https://www.undp.org/digital/transformations"
                  target="_blank"
                  className="text-blue-300"
                >
                  digital transformation framework
                </a>
                . Users can interact with the data to understand the digital
                state of any nation (based on publicly available data); it is
                not intended to be used as an evaluative statistical tool or an
                index.
              </p>
              <p>
                The Digital Development Compass aims to serve as a guide and
                starting point for policymakers, practitioners, and stakeholders
                in their efforts to promote digital development in their
                respective countries. Users are encouraged to exercise caution
                and critical thinking when interpreting the results and to
                consider the broader socio-cultural, political, and economic
                context of each country's digital development efforts.
              </p>
              <p>
                Developed through{" "}
                <a
                  href="https://github.blog/2022-10-17-github-at-the-77th-united-nations-general-assembly/"
                  target="_blank"
                  className="text-blue-300"
                >
                  an innovative partnership with GitHub
                </a>
                , it is UNDP’s latest tool supporting Member States with their
                inclusive digital transformation journeys.
              </p>
              <p>
                Feedback and constructive criticism are welcome to improve the
                accuracy and usefulness of the Compass. To raise your concerns
                or reflections regarding the data or results, please contact us
                via the chatbox.
              </p>
              <div className="aspect-video">
                <YouTube videoId="DsUgE5uEqvw" />
              </div>

              <div className="max-w-[40em] text-center py-10 text-lg">
                <h2 className="text-3xl md:hero-title-size font-bold mt:8 md:mt-20  mb-1 md:mb-6">
                  How the Compass Works
                </h2>
              </div>

              <p>
                The Compass provides a score that assesses the digital maturity
                of a nation. This is determined by the{" "}
                {numberWords[pillars.length]} pillars of UNDP’s digital
                transformation framework:
              </p>
            </div>
            <div className="flex flex-wrap mt-4">
              {pillars.map((pillar) => (
                <a
                  href={`#${pillar}`}
                  key={pillar}
                  className="inline-flex text-sm text-white font-medium uppercase tracking-widest py-[0.3em] px-[1.2em] m-1 rounded-full z-10"
                  style={{
                    backgroundColor: (ancillary.pillarColorMap as any)[pillar]
                      ?.base,
                  }}
                >
                  {pillar}
                </a>
              ))}
            </div>
            <p className="max-w-[40em] mt-9 text-justify">
              Each of these pillars is formed of various sub-pillars and their
              respective indicators, which can be mapped to a specific stage of
              digital transformation. Every stage is assigned a score, which
              represents the level of digital transformation maturity of a
              nation.
            </p>
          </div>
        </div>

        <Scrollytelling country={country} />

        <div className="mt-40 mb-60 flex flex-col items-center">
          <div className="max-w-[40em] pt-10 md:py-10 text-lg">
            <h2 className="text-3xl text-center md:hero-title-size font-bold mt-20 md:mb-6">
              Stages of Digital Readiness by Transformation Pillar
            </h2>
          </div>

          <TablePillars pillars={pillars} definitions={definitions} />
          <MobilePillars pillars={pillars} definitions={definitions} />

          <div className="max-w-[40em] text-center py-10 text-lg">
            <h2 className="text-3xl lg:hero-title-size  md:hero-title-size font-bold mt-20 mb-6">
              A Digital Public Good
            </h2>
          </div>

          <div className="max-w-[40em] py-10 text-lg px-4 text-justify">
            <p>
              The software and data that are used to put together the Compass
              are open source and in the process of becoming Digital Public
              Goods.
            </p>
            <p>
              Automations scrape publicly available spreadsheets, PDFs, and
              documents into a machine-readable format. Scripts normalize the
              data according to a UN-defined list of countries, regions,
              sub-regions, income groups, & territorial borders. Data is
              automatically updated as soon as international organizations
              release new reports. All code and data is transparent and
              available as a global resource on GitHub. Visit{" "}
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
            {/* <h2 className="text-3xl font-bold mt-20 mb-6">Methodology</h2>

            <ul className="space-y-4">
              <li>
                <strong>Inclusion of datasets</strong>
                <p>
                  Based on: Reliability of source, relevance of source, quality
                  of methodology, and both recency and breadth of data.
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
                  Overall Score and paired with a Reliability Score. The
                  Weighting of data and scores is under development.
                </p>
              </li>
              <li>
                <strong>Real Time</strong>
                <p>
                  The data that is aggregated and normalized is pulled in real
                  time. As such, the scores adjust to reflect the latest
                  available data.
                </p>
              </li>
              <li>
                <strong>Peer Review</strong>
                <p>
                While this tool has undergone a scientific peer review with Expert Advisors, 
                it does not intend or imply any form of statistical significance.
                </p>
              </li>
            </ul>

            <p className="mt-10">
              Through this effort, we pulled together as many reliable data
              points on digital development as possible. For more details on our
              methodology or to contribute to it, reach out to{" "}
              <a href="mailto:digital@undp.org" className="underline">
                digital@undp.org
              </a>
              .
            </p> */}
            <p>
              <Link href="/methodology">
                <a className="text-xl md:text-2xl text-blue-300 hover:underline font-medium tracking-wider text-justify">
                  READ THE METHODOLOGY
                </a>
              </Link>
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
  const pillarColors = (ancillary.pillarColorMap as any)[pillar];
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
        const pillarColor =
          (ancillary.pillarColorMap as any)[name]?.base || "black";
        // @ts-ignore
        let pillarIcon = Icons[name.toLowerCase()];

        return (
          <section id={name} className="py-6 first:pt-0 mt-0" key={name}>
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
  const focusedSubpillar = ["Connectivity", "Physical Infrastructure"];
  const countryFocusedSubpillar =
    country["scores"][focusedSubpillar[0]][focusedSubpillar[1]];

  const pillarColor =
    (ancillary.pillarColorMap as any)[focusedSubpillar[0]]?.base || "black";
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
    <div className="w-full text-left px-[2vw] mt-8 md:mt-60">
      <h2 className="text-center text-2xl md:text-3xl text-gray-800 font-bold">
        Let's walk through navigating an example in the Compass:
      </h2>

      <div className="relative w-full mb-[90vh] md:mb-[100vh]">
        <div className="sticky top-[10vh] w-full h-[80vh] mb-[-100vh] flex items-center justify-center">
          {currentStepIndex < 2 && (
            <div className="w-full h-full flex items-center justify-center">
              {stageNames.map((stageName, index) => (
                <div
                  className="text-[2.5vw] md:text-[2vw] relative"
                  key={index}
                >
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
            <div className="SolarSystem w-[min(70vh,100%)] pointer-events-[all]">
              <img src="/DTF.gif" alt="DTF Animation" />
            </div>
          )}

          {currentStepIndex > 4 && currentStepIndex < 7 && (
            <div className="h-full w-full flex items-center justify-center px-[5vw] mb-[5vw]">
              <ScoreRing
                defaultHoveredSubpillar={
                  currentStepIndex === 5 ? undefined : "Physical Infrastructure"
                }
                country={
                  currentStepIndex > 5
                    ? country
                    : {
                        score: {},
                      }
                }
                pillars={ancillary.pillars}
                type={"about"}
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
