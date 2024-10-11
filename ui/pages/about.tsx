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
import chevronRight from "../public/chevron-right.svg";
//import arrowBase from "../public/arrow-base.svg";
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
    <nav className="flex items-center justify-start p-4 text-[12px] [line-height:13.5px] font-semibold sm:text-sm md:text-[11.44px]">
      <Link href="/">
        <a className="mr-3 [color:#D12800] hover:[color:#ee402d] uppercase">
          Home
        </a>
      </Link>
      <span className="[color:#D12800]">/</span>
      <Link href="/about">
        <a className="ml-3 [color:#000000] uppercase">About</a>
      </Link>
    </nav>
  );
};

const handleScroll = (e: any) => {
  e.preventDefault(); // Prevent default anchor link behavior
  const targetId = e.currentTarget.getAttribute("href").slice(1); // Extract the target ID from the href attribute
  const targetElement = document.getElementById(targetId);

  if (targetElement) {
    targetElement.scrollIntoView({ behavior: "smooth" });
  }
};

const SideMenuBar = () => {
  return (
    <nav className="absolute left-0 sideLink">
      <ul className="">
        {" "}
        {/* Adjust space between items and padding */}
        <li>
          <a
            href="#how-it-works"
            onClick={handleScroll}
            className="border-b border-gray-300 text-[16px] font-bold [line-height:18px] py-6 uppercase block transition-colors duration-300"
          >
            How the Compass Works
          </a>
        </li>
        <li>
          <a
            href="#digital-readiness"
            onClick={handleScroll}
            className="border-b border-gray-300 text-[16px] font-bold [line-height:18px] py-6 uppercase block transition-colors duration-300"
          >
            Stages of Digital Readiness by Transformation Pillar
          </a>
        </li>
        <li>
          <a
            href="#public-good"
            onClick={handleScroll}
            className="border-b border-gray-300 text-[16px] font-bold [line-height:18px] py-6 uppercase block transition-colors duration-300"
          >
            A Digital Public Good
          </a>
        </li>
      </ul>
    </nav>
  );
};

const SideMenuBarMobile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="relative inline-block text-left w-full bottom-3 pt-[14px]">
      <button
        onClick={toggleDropdown}
        className={`inline-flex justify-between uppercase items-center w-full px-4 h-[50.39px] py-3 text-base font-semibold text-black bg-[#edeff0] border-b-2 ${
          isOpen ? "border-black" : ""
        } `}
      >
        Menu
        <svg
          className={`w-5 h-5  transition-transform ${
            isOpen ? "rotate-180 mb-2" : "rotate-0 mt-2"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 0.999969L10 11L1 0.999969"
            stroke="#EE402D"
            strokeWidth="2"
          />
        </svg>
      </button>
      <div
        className={`origin-top-right absolute right-0 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-700 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ overflow: "hidden" }}
      >
        <div
          className="py-0 flex flex-col  justify-center"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <a
            href="#how-it-works"
            onClick={handleScroll}
            className="flex items-center justify-start bg-[#edeff0] font-bold px-4 uppercase py-2 text-base text h-[67.39px] text-black hover:button-bg-color hover:text-white border-b border-gray-400"
            role="menuitem"
          >
            How the Compass Works
          </a>
          <a
            href="#digital-readiness"
            onClick={handleScroll}
            className="flex items-center justify-start bg-[#edeff0] px-4 uppercase py-2 text-base font-bold h-[67.39px] text-black hover:button-bg-color hover:text-white border-b border-gray-400"
            role="menuitem"
          >
            Stages of Digital Readiness by Transformation Pillar
          </a>
          <a
            href="#public-good"
            onClick={handleScroll}
            className="flex items-center justify-start bg-[#edeff0] px-4 uppercase py-2 text-base font-bold h-[67.39px] text-black hover:button-bg-color hover:text-white"
            role="menuitem"
          >
            A Digital Public Good
          </a>
        </div>
      </div>
    </div>
  );
};

export default function About(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { definitions, countries, country } = props;
  const pillars = Object.keys(definitions);
  const [isHovered, setIsHovered] = useState(false);

  const handleScrollToTop = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout title="About" countries={countries}>
      <div className="sideMenuBarMobile flex items-center pt-3 sm:pt-3 md:py-3 justify-center">
        <SideMenuBarMobile />
      </div>
      <div className="px-3 sm:px-3 md:px-6 lg:px-6 mx-auto py-0 sm:py-0 md:py-6 lg:py-6 ">
        <div className="pb-5 pt-[14px] sm:pt-0 md:pt-0 lg:pt-0">
          <div
            className="w-full h-[410px] sm:h-[410px] md:h-[410px] lg:h-[410px] md:px-20"
            style={{ backgroundColor: "#F7F7F7" }}
          >
            <div className="md:mx-auto">
              <div className="md:px-4 md:mx-auto pt-0 sm:pt-0 md:pt-[80px]">
                <NavBar />
                {/* pt-[125px] sm:pt-[125px] md:pt-[80px] lg:pt-[80px] */}
                <div className="max-w-[40em] py-5 sm:py-0 text-start sm:text-left sm:px-4 md:text-left md:pl-3 pt-[125px] sm:pt-[125px] md:pt-[40px] lg:pt-[40px]">
                  <h2
                    className=" items-center heading-mobile-title-size sm:heading-mobile-title-size md:heading-title-size lg:heading-title-size font-bold mt-0 md:mt-6 uppercase mb-3 hero-content-text-color"
                    style={{
                      fontFamily: "SohneBreitFont, sans-serif",
                      letterSpacing: "3px",
                    }}
                  >
                    About
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sideMenuBar pr-12">
          <SideMenuBar />
        </div>
        <div className="pl-10 sm:pl-0 md:pl-0 lg:pl-10 Screen1450Size">
          <div className="container mx-auto flex pt-[100px] sm:pt-[100px] md:pt-[61.12px] lg:pt-[61.12px]">
            <div className="text-[16px] sm:text-[16px]  md:text-[20px] lg:text-[20px] leading-[1.4] flex flex-col items-center font-normal text-left">
              <div className="max-w-[40em]">
                <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                  Developed through{" "}
                  <a
                    href="https://github.blog/2022-10-17-github-at-the-77th-united-nations-general-assembly/"
                    target="_blank"
                    className="url-styling about-under-line"
                  >
                    an innovative partnership with GitHub
                  </a>
                  , the Digital Development Compass is UNDP’s latest tool
                  supporting Member States with their inclusive digital
                  transformation journeys. The Compass provides an analysis of a
                  nation’s digital development based on a comprehensive
                  collection of publicly available data sets.
                </p>

                <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                  The Digital Development Compass aggregates and synthesizes
                  digital development indicators from over 140 open-source
                  datasets into interactive dashboards. These dashboards cover
                  the six pillars of the United Nations Development Programme's
                  (UNDP)
                  <a
                    href="https://www.undp.org/digital/transformations"
                    target="_blank"
                    className="url-styling about-under-line"
                  >
                    {" "}
                    Digital Transformation Framework
                  </a>
                  , allowing users to quickly understand the digital state of
                  any nation.
                </p>
                <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                  Ultimately, the Digital Development Compass aims to serve as a
                  guide and starting point for policymakers, practitioners and
                  stakeholders in their efforts to promote digital development
                  in their respective countries. The tool is not intended to be
                  used as an evaluative statistical tool or an index. Users are
                  encouraged to exercise caution and critical thinking when
                  interpreting the results and to consider the broader
                  socio-cultural, political and economic context of each
                  country's digital development efforts.
                </p>
                {/* <p>
                Developed through{" "}
                <a
                  href="https://github.blog/2022-10-17-github-at-the-77th-united-nations-general-assembly/"
                  target="_blank"
                  className="url-styling"
                >
                  an innovative partnership with GitHub
                </a>
                , it is UNDP’s latest tool supporting Member States with their
                inclusive digital transformation journeys.
              </p> */}
                <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                  Feedback and constructive criticism are welcome to improve the
                  accuracy and usefulness of the Compass. To raise your concerns
                  or reflections regarding the data or results, please contact
                  us via the chatbox.
                </p>
                <div className="aspect-video">
                  <YouTube videoId="DsUgE5uEqvw" />
                </div>

                <div className="max-w-[40em] text-left">
                  <h2
                    id="how-it-works"
                    className="text-[40px] sm:text-[40px] md:text-[55px] lg:text-[55px] leading-[1.4] sm:leading-[48px] md:leading-[1.4] lg:leading-[1.4] font-bold text-left pb-[70px] sm:pb-[70px] md:pb-[50px] lg:pb-[50px] pt-[100px] sm:pt-[100px] md:pt-[60px] lg:pt-[60px]"
                  >
                    How the Compass works
                  </h2>
                </div>

                <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                  The Compass provides a score that assesses a nation’s digital
                  maturity. This is determined by the pillars of UNDP’s Digital
                  Transformation Framework:
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
              <p className="max-w-[40em] mt-9 text-left text-[16px] sm:text-[16px]  md:text-[20px] lg:text-[20px] leading-[1.4] font-normal pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                Each of these pillars consists of multiple sub-pillars and
                indicators, which can be mapped to a specific stage of digital
                transformation. Every stage is then assigned a score, which
                represents the level of a nation’s digital transformation
                maturity.
              </p>
            </div>
          </div>

          <Scrollytelling country={country} />

          <div className="container mx-auto flex flex-col ">
            <div className="max-w-[100em] ">
              <h2
                id="digital-readiness"
                className="text-[40px] sm:text-[40px] md:text-[55px] lg:text-[55px] leading-[1.4] sm:leading-[48px] md:leading-[1.4] lg:leading-[1.4] font-bold text-left pt-[100px] sm:pt-[100px] md:pt-[60px] lg:pt-[60px] mx-0 sm:mx-0 md:mx-[130px] lg:mx-[130px]"
              >
                Stages of digital readiness by transformation pillar
              </h2>
            </div>

            <TablePillars pillars={pillars} definitions={definitions} />
            <MobilePillars pillars={pillars} definitions={definitions} />

            <div className="max-w-[100em]">
              <h2
                id="public-good"
                className="pt-[100px] sm:pt-[100px] md:pt-[61.12px] lg:pt-[61.12px] text-[40px] sm:text-[40px] md:text-[55px] lg:text-[55px] leading-[1.4] sm:leading-[48px] md:leading-[1.4] lg:leading-[1.4] font-bold text-left pb-[70px] sm:pb-[70px] md:pb-[50px] lg:pb-[50px] mx-0 sm:mx-0 md:mx-[130px] lg:mx-[130px]"
              >
                A Digital Public Good
              </h2>
            </div>

            <div className="max-w-[120em] py-10 text-[16px] sm:text-[16px]  md:text-[20px] lg:text-[20px] leading-[1.4] text-left mx-0 sm:mx-0 md:mx-[130px] lg:mx-[130px]">
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                The software and data that are used to put together the Compass
                are open-source and in the process of becoming Digital Public
                Goods.
              </p>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                Automations scrape publicly available spreadsheets, PDFs, and
                documents, converting them into machine-readable formats.
                Scripts then normalize the data according to a UN-defined list
                of countries, regions, sub-regions, income groups and
                territorial borders. Data are also automatically updated as soon
                as international organizations release new reports. All code and
                data are transparent and available as a global resource on
                GitHub. Visit{" "}
                <a
                  className="url-styling"
                  href="https://github.com/undp/digital-development-compass"
                >
                  https://github.com/undp/digital-development-compass
                </a>{" "}
                to see the latest.
              </p>
            </div>

            <div className="container mx-auto">
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
            </div>
            <p>
              <div className="flex justify-center items-center">
                <Link href="/methodology">
                  <a
                    className="text-[16px] sm:text-[16px] md:text-[18px] md:leading-[18px] pl-8 font-bold tracking-wider flex items-center duration-700 uppercase"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    read the methodology
                    <div
                      className={`ml-4 flex transform duration-[150ms] ease-linear ${
                        isHovered ? "translate-x-0" : "-translate-x-2"
                      }`}
                    >
                      <Image
                        src={chevronRight}
                        alt="chevronRight"
                        className="m-0 p-0"
                      />
                    </div>
                  </a>
                </Link>
              </div>
            </p>
            <div className="justify-center mt-[48px] pb-[46px] flex items-center">
              <button
                onClick={handleScrollToTop}
                className="bg-brand-blue-dark border-2 border-brand-blue-dark hover:bg-brand-blue-dark/90 px-4 py-2 font-bold text-base uppercase tracking-wide text-white flex-shrink-0 "
              >
                Scroll to the top
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

  // const pillarColor =
  //   (ancillary.pillarColorMap as any)[focusedSubpillar[0]]?.base || "black";

  let pillarColorLighter = "#B8ECB6";
  let pillarColorDarker = "#3632a8";

  let darkerColor = lab(pillarColorDarker);
  // darkerColor.b += 90;
  // darkerColor.a += 10;
  // darkerColor.l += 40;
  let lighterColor = lab(pillarColorLighter);
  // lighterColor.b -= 9;
  // lighterColor.a += 10;
  // lighterColor.l -= 10;
  const stepColors = scaleLinear<string>()
    .domain([0, 6])
    .range([lighterColor.formatHex(), darkerColor.formatHex()])
    .interpolate(interpolateHclLong)
    .clamp(true);

  return (
    <div className="w-full text-left px-[2vw] mt-8 md:mt-60">
      <h4 className="text-left text-[30px] sm:text-[30px] md:text-[35px] lg:text-[35px] leading-[1.142] text-gray-800 font-normal">
        Let's walk through how to navigate the Compass:
      </h4>

      <div className="relative w-full mb-[90vh] md:mb-[100vh]">
        <div className="sticky top-[10vh] w-full h-[80vh] mb-[-100vh] flex items-center justify-center -z-50">
          {currentStepIndex < 2 && (
            <div className="w-full h-full flex items-center justify-center">
              {stageNames.map((stageName, index) => (
                <div
                  className="text-[2.5vw] md:text-[2vw] relative"
                  key={index}
                >
                  {index + 1 == stageNames.length && (
                    <motion.div
                      className="absolute bottom-[-2em] text-black  right-0 transform -translate-x-1/2 font-mono text-[0.5em]"
                      animate={{
                        y: currentStepIndex > 0 ? 0 : 10,
                        opacity: currentStepIndex > 0 ? 1 : 0,
                      }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      {index + 1}
                    </motion.div>
                  )}
                  <div
                    className="py-[0.6em] px-[1em] font-semibold text-white"
                    style={{
                      background: stepColors(index),
                    }}
                  >
                    {stageName}
                  </div>

                  <motion.div
                    className="absolute bottom-[-2em] text-black  left-0 transform -translate-x-1/2 font-mono text-[0.5em]"
                    animate={{
                      y: currentStepIndex > 0 ? 0 : 10,
                      opacity: currentStepIndex > 0 ? 1 : 0,
                    }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    {index}
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

// const numberWords = [
//   "zero",
//   "one",
//   "two",
//   "three",
//   "four",
//   "five",
//   "six",
//   "seven",
//   "eight",
//   "nine",
// ];
