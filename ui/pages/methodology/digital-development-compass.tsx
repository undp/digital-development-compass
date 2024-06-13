import { db } from "database";
import { groupBy } from "lodash";
import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import Script from "next/script";
import { isMemberState } from "lib";
import githubUNDPdiagram from "../../public/undp-diagram.png";
import overviewofTDTF from "../../public/OverviewofTDTF.png";
import fiveStage from "../../public/fiveStage.png";
import transformation from "../../public/transformation.png";
import MinMaxScale from "../../public/MinMaxScale.png";
import Layout from "components/Layout";
import Link from "next/link";
import React, { useState } from "react";
import {
  tableData,
  pillarsTableData,
  dimensionsTable,
} from "database/methodologyTableData";
import { ancillary } from "database/ancillary";
import chevronRight from "../../public/chevron-right.svg";
import downloadDefault from "../../public/download-default.svg";
import arrowBase from "../../public/arrow-base.svg";
import downloadHover from "../../public/download-hover.svg";


const NavBar = () => {
  return (
    <nav className="flex items-center justify-start p-4 pb-0 text-base sm:text-sm md:text-base">
      <Link href="/">
        <a className="mr-4 text-gray-800 hover:text-red-500 uppercase">Home</a>
      </Link>
      <span className="text-red-500 mr-4">/</span>
      <span className="text-red-500 mr-4">METHODOLOGY</span>
      <span className="text-red-500">/</span>
      <Link href="/methodology/digital-development-compass">
        <a className="ml-4 text-red-500">DIGITAL DEVELOPMENT COMPASS</a>
      </Link>
    </nav>
  );
};

export default function DIGITAL_DEVELOPMENT_COMPASS(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { countries } = props;
  const [isHovered, setIsHovered] = useState(false);
  const [isDownloadHovered, setDownloadHovered] = useState(false);

  const handleScrollToTop = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDownloadClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    const url = event.currentTarget.getAttribute("href");
    if (url) {
      fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
          const anchor = document.createElement("a");
          anchor.href = URL.createObjectURL(blob);
          anchor.download = "scores.csv";
          anchor.click();
          URL.revokeObjectURL(anchor.href);
        })
        .catch((error) => {
          console.error("Error Downloading File", error);
        });
    }
  };

  return (
    <Layout title="Methodology" countries={countries}>
      <div className="py-8 sm:py-16">
        <div className="px-5 pb-5">
          <div className="w-full bg-gray-200 md:px-20">
            <div className="md:mx-auto">
              <div className="container md:px-4 md:mx-auto">
                <NavBar />
                <div className="max-w-[80em] py-0 sm:py-10 text-lg text-start sm:text-center md:text-left md:pl-5">
                  <h2
                    className="heading-mobile-title-size sm:heading-mobile-title-size md:heading-title-size lg:heading-title-size font-bold mt-0 md:mt-6 uppercase mb-3 hero-content-text-color"
                    style={{ fontFamily: "SohneBreitFont, sans-serif" }}
                  >
                    DIGITAL DEVELOPMENT COMPASS
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container px-4 mx-auto">
          <div className="text-lg flex flex-col items-center">
            {/* <div className="max-w-[40em] py-5 sm:py-10 text-lg text-center">
              <h2 className="text-3xl font-bold mt-0 md:mt-7 mb-3 text-brand-blue-dark">
                DIGITAL DEVELOPMENT COMPASS
              </h2>
            </div> */}
            <div className="max-w-[40em] space-y-6 sm:space-y-9 text-justify">
              <h2 className="text-2xl md:text-3xl font-bold mt-3 mb-6 sm:text-center md:text-left">
                What is the Digital Development Compass?
              </h2>
              <p>
                The Digital Development Compass (DDC) is a comprehensive
                visualisation of a country's digital indicators. These
                indicators are sourced from publicly available datasets,
                gathered and made available by UNDP to offer guidance and
                clarity into a country's progress in digital development. Thus,
                the DDC provides a diagnostic framework and serves as a starting
                point for deeper collaboration and engagement. The DDC allows
                users to obtain a snapshot of a country's digital readiness
                without the need to consult multiple sources.
              </p>
              <p>
                Within the DDC, each country can examine individual pillars and
                sub-pillars to identify strengths and weaknesses, aligning them
                with specific ‘maturity stages.’ Each sub-pillar comprises
                multiple indicators. Additionally, the percentage of available
                data is displayed. The DDC also allows for comparisons between
                regions, sub-regions, and income groups, and offers various
                visualisation options.
              </p>
              <p>
                Moreover, the tool serves as a catalyst for conversations
                between governments and UNDP, providing an opportunity to
                initiate discussions, address potential discrepancies in
                rankings, or explore the potential impacts of digital
                technologies in their specific sectors or development plans. The
                DDC represents a valuable tool for understanding governments’
                current digital landscape and identifying opportunities for
                progress and growth. Furthermore, it encourages governments to
                share their advancements openly to ensure accurate
                representation in the DDC.
              </p>
              <h2 className="text-2xl md:tracking-normal">
                How should the DCC be used?
              </h2>
              <p>
                The primary objective of the digital compass is to serve as a
                prominent entry point, allowing countries to establish immediate
                connections with UNDP’s country offices. Through this platform,
                country offices can promptly generate customised materials that
                showcase their digital initiatives, capabilities, and comprehend
                the specific requirements. By providing this dedicated space,
                the DDC aims to strengthen engagement and collaboration while
                offering countries an expedient means to explore and leverage
                UNDP's digital capabilities.
              </p>
              <h2 className="text-2xl md:text-3xl font-bold mt-3 mb-6 sm:text-center md:text-left">
                The Digital Transformation Framework
              </h2>
              <h2 className="text-2xl md:tracking-normal">
                Defining Digital Development
              </h2>
              <p>
                'Digital transformation' is not a destination, but a journey. It
                is about using digital and technology to improve the lives and
                livelihoods of individuals, communities, and countries. This
                ranges from improving public services, to tackling issues of
                marginalisation.
              </p>
              <p>
                UNDP advocates for inclusive, whole-of-society digital
                transformation. It is a coordinated approach between government,
                civil society and the private sector to build ownership, support
                human-centred design, mitigate risks, and establish
                accountability. To support this strategy, UNDP has implemented
                the Digital Transformation Framework to discover & compare
                progress across a range of key issues.
              </p>
              <h2 className="text-xl md:tracking-normal">
                Overview of the Digital Transformation framework
              </h2>
              <p>
                The DDC is constructed based on the{" "}
                <a
                  href="https://www.undp.org/digital/transformations"
                  className="url-styling"
                  target="_blank"
                >
                  Inclusive Whole-Of-Society Digital Transformation framework
                </a>{" "}
                endorsed by UNDP. The Digital Transformation Framework serves as
                a guide for stakeholders to align their efforts regarding
                inclusive digital transformation and supports countries in their
                transformation process. It enables stakeholders to identify,
                structure, and prioritise their national digital transformation
                initiatives and agendas effectively.
              </p>
              <p>
                The framework represents the encompassing structure for Digital
                Development within the UNDP. It is the result of an extensive
                study that examines various frameworks, implementation
                strategies, and methodologies employed by diverse organisations,
                including those in the private sector, public sector, and
                international development agencies. Through this framework, UNDP
                aims to provide countries with a valuable resource for assessing
                and advancing their digital development journey, while
                considering the unique challenges and opportunities they may
                encounter along the way.
              </p>
              <p>
                The Digital Transformation Framework (see Figure 1) is
                structured into seven pillars, with each pillar being further
                subdivided into 25 sub-pillars. Each sub-pillar corresponds to a
                specific element of digital transformation. The sub-pillars
                encompass various individual indicators, which are used to
                calculate a country's Digital Transformation Score. These scores
                are then aligned with corresponding stages of digital
                transformation.
              </p>
              <div className="max-w-[50em] mx-auto px-4">
                <Image
                  src={overviewofTDTF}
                  alt="The undp/digital-nation-dashboard GitHub repository"
                  className="w-full sm:w-64 h-auto"
                />
                <p className="text-center mt-2">
                  <em>Figure 1. UNDP’s The Digital Transformation Framework</em>
                </p>
              </div>
              <h2 className="text-xl">Pillars and sub-pillar</h2>
              <p>
                Table 1 provides a list of the pillars and the underlying
                sub-pillars constituting UNDP’s Inclusive Whole-of-Society
                Digital Transformation Framework that form the basis of the
                Digital Development Compass:
              </p>
              <div className="max-w-[50em] mx-auto px-4">
                <PillarsTable />
                <p className="text-center mt-2">
                  <em>
                    Table 1. UNDP’s Inclusive Whole-Of-Society Digital
                    Transformation Framework: Pillars and sub-pillars
                  </em>
                </p>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-6 sm:text-center md:text-left">
                Measuring Digital Development
              </h2>
              <h2 className="text-2xl">Stages of digital development</h2>
              <p>
                Each country's digital readiness is assessed across five stages
                of digital development as indicated Figure 2, which encompass
                every pillar and sub-pillar.
              </p>
              <div className="max-w-[50em] mx-auto px-4">
                <Image
                  src={fiveStage}
                  alt="The undp/digital-nation-dashboard GitHub repository"
                  className="w-full sm:w-84 h-auto"
                />
                <p className="text-center mt-2">
                  <em>
                    Figure 2.{" "}
                    <a
                      target="_blank"
                      href="https://mail-attachment.googleusercontent.com/attachment/u/0/?ui=2&ik=64c52d6e75&attid=0.1&permmsgid=msg-f:1764868617392429293&th=187e12a826e918ed&view=att&disp=inline&saddbat=ANGjdJ_J6ABUb_6VX6F6g30jWvJsce85NyutxtJ9_irPPQmXAXG1GMfRf8Z06lAEQSUseD1JGn_t-6vO8snwM7AaMp2W-yk0SOUapva-x5TVm1fY7r49nERKGYXCGEDRLfrQjsHfTNtYgaHKK0bsATMi4AOG6BFLQBqrr1frZZykB3EhQKP_smCCch7cOXIJUMFBRxEgpos_vG9s5o5CVQfo9YSdhXalSdvjEdm0IVSs9B8lthNecdOo6wvrRri476tPTYaMoE5Y8PKZw5eFKXAVCvLkeBFNkApdy61ihMaP6ijj7Rd4FanYD0F21uMNwQryQWCj_SpXITvkD-kMQlMSfUNk0dRf3sImCmef_LqpxOEXrDpmbNZ6Y4HgPOIOGKo4o9YYRJkZydyBTXZY629NQCE9Do0X_oMCwH6TulqasDXAhjSErY96BQ11PA8hNzZCOKf2LivBGsYWknTGr0Z9OGcRxO3mJzFSUsdYrpjBhWBd1nFXcaiAq_WzYv7ianWJQMcxntzo9qinox6Xl3w33XybZAQCb8Bx8pyPOVcbSz3uzKsK1jR97g65NqeNmpJWAw7AqoaW_645goUcIubnPo_sIpuy6oJG0TqIeduVhpObJc1NhooEZXh0fqnZO3oUp4rmaPMEMrsGSfU57lKDOEjML5pvg9yuuZjsM-yqTUeZN4zfJqmN0ZiEorCiKgwn8ml4qN1pwwJ4XjD9N4nJDMWz5zvE8BTcF0YVnTVDSJPq9OxxUGqs6HBr3OLbF1tj2msmV94y0bc2UmKhubxxF9Q0RoZZ7B3I5UmuSTipcUflWlqDpV8G1xzv_69nqCYcWtiV7I_Zalo78FGa6Rvax5XTS3QH7L5qtE6pfI7-ZrM1_dJ2JLtNyYYXq7yV9bfdFkGf1P9sohjfxWvEi_LGjZrdbQX4l5Jv-LNAfHNuB9h7IbNkHrmMtmiUmYfxUwlPhe7yMGBouW1HZETIGWD1a8AJpQAllfqLn5QrXi4AzzV4SAGqKyZcNNCxVuIQ99cVJmWFV4kdBZFm7maX"
                      className="text-blue-300"
                    >
                      UNDP's five stages of digital development
                    </a>{" "}
                  </em>
                </p>
              </div>
              <p>
                Further enhancement of countries' digital readiness can be
                achieved by providing individual support to each component of
                the transformation framework.
              </p>
              <div className="max-w-[50em] mx-auto px-4">
                <Image
                  src={transformation}
                  alt="The undp/digital-nation-dashboard GitHub repository"
                  className="w-full sm:w-84 h-auto"
                />
                <p className="text-center mt-2">
                  <em>
                    Figure 3.{" "}
                    <a
                      href="https://mail-attachment.googleusercontent.com/attachment/u/0/?ui=2&ik=64c52d6e75&attid=0.1&permmsgid=msg-f:1764868617392429293&th=187e12a826e918ed&view=att&disp=inline&saddbat=ANGjdJ_J6ABUb_6VX6F6g30jWvJsce85NyutxtJ9_irPPQmXAXG1GMfRf8Z06lAEQSUseD1JGn_t-6vO8snwM7AaMp2W-yk0SOUapva-x5TVm1fY7r49nERKGYXCGEDRLfrQjsHfTNtYgaHKK0bsATMi4AOG6BFLQBqrr1frZZykB3EhQKP_smCCch7cOXIJUMFBRxEgpos_vG9s5o5CVQfo9YSdhXalSdvjEdm0IVSs9B8lthNecdOo6wvrRri476tPTYaMoE5Y8PKZw5eFKXAVCvLkeBFNkApdy61ihMaP6ijj7Rd4FanYD0F21uMNwQryQWCj_SpXITvkD-kMQlMSfUNk0dRf3sImCmef_LqpxOEXrDpmbNZ6Y4HgPOIOGKo4o9YYRJkZydyBTXZY629NQCE9Do0X_oMCwH6TulqasDXAhjSErY96BQ11PA8hNzZCOKf2LivBGsYWknTGr0Z9OGcRxO3mJzFSUsdYrpjBhWBd1nFXcaiAq_WzYv7ianWJQMcxntzo9qinox6Xl3w33XybZAQCb8Bx8pyPOVcbSz3uzKsK1jR97g65NqeNmpJWAw7AqoaW_645goUcIubnPo_sIpuy6oJG0TqIeduVhpObJc1NhooEZXh0fqnZO3oUp4rmaPMEMrsGSfU57lKDOEjML5pvg9yuuZjsM-yqTUeZN4zfJqmN0ZiEorCiKgwn8ml4qN1pwwJ4XjD9N4nJDMWz5zvE8BTcF0YVnTVDSJPq9OxxUGqs6HBr3OLbF1tj2msmV94y0bc2UmKhubxxF9Q0RoZZ7B3I5UmuSTipcUflWlqDpV8G1xzv_69nqCYcWtiV7I_Zalo78FGa6Rvax5XTS3QH7L5qtE6pfI7-ZrM1_dJ2JLtNyYYXq7yV9bfdFkGf1P9sohjfxWvEi_LGjZrdbQX4l5Jv-LNAfHNuB9h7IbNkHrmMtmiUmYfxUwlPhe7yMGBouW1HZETIGWD1a8AJpQAllfqLn5QrXi4AzzV4SAGqKyZcNNCxVuIQ99cVJmWFV4kdBZFm7maX"
                      className="text-blue-300"
                      target="_blank"
                    >
                      Transformation framework
                    </a>{" "}
                  </em>
                </p>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mt-5 mb-6 sm:text-center md:text-left">
              Digital Development Score Methodology
            </h2>
            <div className="max-w-[40em] space-y-6 sm:space-y-9 text-justify">
              <p>
                The software and data that are used to put together the DDC are
                open source and in the process of becoming Digital Public Goods.
                The script and datasets can all be found on UNDP’s&nbsp;
                <a
                  href="https://github.com/undp/digital-development-compass"
                  className="url-styling"
                  target="_blank"
                >
                  GitHub.
                </a>
                &nbsp;UNDP is partnered with GitHub’s volunteer programme and
                volunteers have helped to develop the novel scripts used in the
                process.
              </p>
              <h2 className="text-2xl md:tracking-normal">
                1. Indicator Selection
              </h2>
              <p>
                UNDP conducted a review of the 200+ indicators that formed the
                first version of the Compass. This indicator evaluation had two
                phases:
              </p>
              <ul className="list-disc pl-10">
                <li className="pb-5">
                  Phase 1: Existing indicators were reviewed according to newly
                  established indicator criteria. A number of composite indexes
                  were also exploded (the term “exploded” is used, in the sense
                  of ‘to break up into pieces’, to refer to the process of
                  surfacing all of the individual indicators contained within a
                  composite index) earlier included in the Compass to identify
                  and remove instances of double-counting and to improve
                  relevancy.
                </li>
                <li>
                  Phase 2: New indicators were added after a research and review
                  process.
                </li>
              </ul>
              <p>
                Currently, there are a total of 145 indicators included in the
                DDC. Indicators were identified by conducting desk research
                online into the public data available relating to the
                sub-pillars and pillars of the digital development framework as
                mentioned above.
              </p>
              <p>
                During this review process, an Expert Committee was appointed,
                with a globally representative group of experts with specialisms
                and experience in digital development. The Committee’s vision is
                to support the DDC as it develops year on year. At its core, the
                Committee will be flexible with this as its primary aim,
                evolving organically, in parallel with the Digital Development
                Compass.
              </p>
              <p>
                Based on a series of consultations and advisory from the Expert
                Committee, questions for data evaluation have been created to
                perform a data quality assessment for all existing and newly
                selected indicators. In case the examined indicator does not
                meet the evaluation criteria, the indicator will not be included
                in the Digital Development Compass.
              </p>

              <div className="max-w-[20em] sm:max-w-[20em] md:max-w-[40em] lg:max-w-[40em] mx-auto px-4">
                <DimensionsTable />
              </div>

              <p className="text-center mt-2">
                <em>Table 2. Data evaluation questions</em>
              </p>
              <div className="p-0">
                <p>
                  As a result of this assessment, Digital Development Compass
                  includes 145 publicly available datasets and is available on{" "}
                  <a
                    href="https://github.com/undp/digital-development-compass"
                    className="url-styling"
                    target="_blank"
                  >
                    GitHub
                  </a>
                  . Sources of the data sets include among others:
                </p>
                <div className="pl-5">
                  <ul className="list-disc mt-2">
                    <li>World Bank: World Development Indicators</li>
                    <li>GSMA: Mobile Connectivity Index</li>
                    <li>University of Oxford: Our World in Data</li>
                    <li>World Economic Forum: Global Competitiveness Index</li>
                    <li>Sustainable Development Report</li>
                    <li>ITU: Global Cybersecurity Index</li>
                    <li>Oxford Insights: AI Readiness Index</li>
                  </ul>
                </div>
              </div>
              {/* 2. Data Collection */}
              <h2 className="text-2xl md:tracking-normal">
                2. Data Collection
              </h2>
              <p>
                The methodology used for data collection depends on the format
                the data is published in. Largely, data is retrieved from the
                data source automatically. Links to data sources are collected
                in a spreadsheet and automation is used to scrape spreadsheets,
                PDFs, and documents and convert them into a machine-readable
                format.
              </p>
              <p>
                However, while automation can be applied to most websites from
                which data is collected, certain platforms require manual
                intervention. In these cases, files containing data in the
                correct format are uploaded manually.
              </p>
              <p>
                99% of all indicators are automatically updated when
                organisations release new reports and datasets. The below
                diagram visualises how updates in the source data triggers a
                change in the DDC webpage.
              </p>
              <div className="max-w-[50em] mx-auto px-4">
                <Image
                  src={githubUNDPdiagram}
                  alt="The undp/digital-nation-dashboard GitHub repository"
                  className="w-full sm:w-84 h-auto"
                />
                <p className="text-center mt-2">
                  {" "}
                  <a
                    target="_blank"
                    href="https://mail-attachment.googleusercontent.com/attachment/u/0/?ui=2&ik=64c52d6e75&attid=0.1&permmsgid=msg-f:1764868617392429293&th=187e12a826e918ed&view=att&disp=inline&saddbat=ANGjdJ_J6ABUb_6VX6F6g30jWvJsce85NyutxtJ9_irPPQmXAXG1GMfRf8Z06lAEQSUseD1JGn_t-6vO8snwM7AaMp2W-yk0SOUapva-x5TVm1fY7r49nERKGYXCGEDRLfrQjsHfTNtYgaHKK0bsATMi4AOG6BFLQBqrr1frZZykB3EhQKP_smCCch7cOXIJUMFBRxEgpos_vG9s5o5CVQfo9YSdhXalSdvjEdm0IVSs9B8lthNecdOo6wvrRri476tPTYaMoE5Y8PKZw5eFKXAVCvLkeBFNkApdy61ihMaP6ijj7Rd4FanYD0F21uMNwQryQWCj_SpXITvkD-kMQlMSfUNk0dRf3sImCmef_LqpxOEXrDpmbNZ6Y4HgPOIOGKo4o9YYRJkZydyBTXZY629NQCE9Do0X_oMCwH6TulqasDXAhjSErY96BQ11PA8hNzZCOKf2LivBGsYWknTGr0Z9OGcRxO3mJzFSUsdYrpjBhWBd1nFXcaiAq_WzYv7ianWJQMcxntzo9qinox6Xl3w33XybZAQCb8Bx8pyPOVcbSz3uzKsK1jR97g65NqeNmpJWAw7AqoaW_645goUcIubnPo_sIpuy6oJG0TqIeduVhpObJc1NhooEZXh0fqnZO3oUp4rmaPMEMrsGSfU57lKDOEjML5pvg9yuuZjsM-yqTUeZN4zfJqmN0ZiEorCiKgwn8ml4qN1pwwJ4XjD9N4nJDMWz5zvE8BTcF0YVnTVDSJPq9OxxUGqs6HBr3OLbF1tj2msmV94y0bc2UmKhubxxF9Q0RoZZ7B3I5UmuSTipcUflWlqDpV8G1xzv_69nqCYcWtiV7I_Zalo78FGa6Rvax5XTS3QH7L5qtE6pfI7-ZrM1_dJ2JLtNyYYXq7yV9bfdFkGf1P9sohjfxWvEi_LGjZrdbQX4l5Jv-LNAfHNuB9h7IbNkHrmMtmiUmYfxUwlPhe7yMGBouW1HZETIGWD1a8AJpQAllfqLn5QrXi4AzzV4SAGqKyZcNNCxVuIQ99cVJmWFV4kdBZFm7maX"
                    className="text-blue-300"
                  >
                    <em>Source</em>
                  </a>{" "}
                </p>
              </div>
              <p>
                When any of the links to source data expire, an automated email
                notification is sent to administrators, and new links are
                updated manually.
              </p>
              <h2 className="text-2xl md:tracking-normal">
                3. Score Calculation Methodology
              </h2>
              <p>
                The Digital Development Compass aims to put countries into one
                of the five maturity levels for each of the sub-pillars. This
                section includes the approach to normalization, weighting
                indicators and imputation of missing scores.
              </p>
              <h2 className="text-xl md:tracking-normal">Normalisation</h2>
              <p>
                The indicators used within the compass have been normalized
                using Min-Max rescaling.
              </p>
              <h2 className="text-lg md:tracking-normal">Min-Max rescaling</h2>
              <p>
                The following formula creates a score between 0 and 1. It does
                so by creating a scale with a maximum possible score of 1 that
                corresponds to the highest scoring country’s score; and a
                minimum possible score of 0 that corresponds to the lowest
                scoring country’s score.
              </p>
              <p className="flex justify-center items-center">
                <Image
                  src={MinMaxScale}
                  alt="The undp/digital-nation-dashboard GitHub repository"
                  className="w-full sm:w-64 h-auto"
                />
              </p>
              <p>
                <u>Scaling and normalization of categorical data</u>
              </p>
              <p>
                The categories are identified in the dataset and numerical
                values are assigned to each category. Each category has a unique
                numerical representation. The maximum possible value that a
                category can attain within the dataset is determined to
                establish the scaling range. The maximum value provides a
                reference point for rescaling all other values. Once the maximum
                possible value is determined, the numerical values of the
                categories are rescaled to a predefined range, typically
                spanning from 0 to a chosen maximum value. This rescaling
                process ensures uniformity and facilitates comparison across
                different indicators.
              </p>
              <p>
                The original numerical values of the categories to the desired
                rescaled range are linearly mapped. The mapping maintains the
                relative order and spacing of the original values.
              </p>
              <p>
                For each category, its rescaled value is calculated using the
                determined maximum possible value and the chosen scaling range.
                The rescaling formula is consistently applied across all
                categories.
              </p>
              <p>
                The rescaled values are normalized to ensure they fall within a
                standard range, such as 0 to 1. Normalization helps mitigate the
                influence of outliers and enhances the interpretability of the
                data. Min-Max normalization is used for normalization of these
                data types as well.{" "}
              </p>
              <h2 className="text-xl md:tracking-normal">
                Indicator weightings
              </h2>
              <p>
                In the Compass, equal weightings are assigned to all pillars and
                sub-pillars.{" "}
              </p>
              <p>
                Weighting at the indicator level is made in the following way:
              </p>
              <ol className="list-decimal ml-6 space-y-4">
                <li>
                  <span className="font-bold">Indicator specificity:</span> Each
                  indicator is assigned a score of 1 or 0.5 based on its
                  relationship with digital development:
                  <ul className="list-disc ml-8 mt-2 space-y-2">
                    <li>
                      0.5 to indicators identified as more weakly aligned and
                      which only partially relate to digital development.
                    </li>
                    <li>
                      1 to all those indicators that have a clear, direct
                      connection to digital development;
                    </li>
                    <li>
                      A score of 0 is not included, as the data evaluation
                      process already removed indicators that do not clearly
                      relate to digital development (and which would have scored
                      0),
                    </li>
                  </ul>
                </li>
                <li>
                  <span className="font-bold">
                    Indicator uniqueness or overlap:
                  </span>{" "}
                  Although the Compass does not have any instances of the same
                  indicator appearing more than one time (explicit double
                  counting), in some cases, multiple indicators are measured
                  overlapping factors. For instance, ‘average fixed broadband
                  download speeds’ and ‘average mobile broadband upload speeds’
                  are highly likely to be correlated, being dependent on the
                  same infrastructure. These indicators needed to be scored
                  lower to avoid counting the same metric more than once.
                  <ul className="list-disc ml-8 mt-2 space-y-2">
                    <li>
                      To quantitatively capture overlapping, indicators are
                      scored by dividing 1 by the number of overlapping
                      indicators.
                    </li>
                    <li>
                      In this way, an indicator that does not overlap with
                      others scores 1, one that overlaps with only 1 other
                      indicator scores 1/2 = 0.5, one overlapping with two more
                      indicators scores 1/3 = 0.33, and so on.
                    </li>
                    <li>
                      This process allows us to assign a lower score to those
                      indicators that measure similar aspects of digital
                      development.
                    </li>
                  </ul>
                </li>
                <li>
                  <span className="font-bold">Indicator number:</span> Indicator
                  scores are divided by the total number of indicator scores
                  within a sub-pillar.
                </li>
              </ol>
              <h2 className="text-xl md:tracking-normal">Imputing scores</h2>
              <p className="mb-4">
                For indicators where there are gaps in country data, or where an
                indicator has not collected data from particular countries,
                imputing scores is an option. However, imputed data is{" "}
                <b>not</b> included into the scoring in the Digital Development
                Compass, while visualization is enabled with a toggle switch
                giving the user the option to visualise data with or without
                imputed scores. The following methods for imputation to use it
                in only the data visualisation are used depending on their
                suitability within a given context:
              </p>
              <ol className="list-decimal ml-6 space-y-4">
                <li>
                  <span className="">Linear interpolation:</span> Historical
                  information can be used before implementing a modelling-based
                  approach. If data is missing but there are values in preceding
                  and subsequent years, linear interpolation is used.
                </li>
                <li>
                  <span className="">Extrapolation:</span> If there is no data
                  from preceding and subsequent years, data is extrapolated as a
                  constant value of the nearest reported data, or as a value on
                  a trend line/curve.
                </li>
                <li>
                  <span className="">
                    Neighbouring/similar countries’ data:
                  </span>{" "}
                  A mean average is taken based on a sample of regionally
                  neighbouring countries and/or GDP figures.
                </li>
                <li>
                  <span className="">
                    Expectation-maximisation with a bootstrapping (EMB):
                  </span>{" "}
                  The remaining missing data is imputed with an
                  expectation-maximisation with a bootstrapping (EMB) multiple
                  imputation algorithm.
                </li>
              </ol>
              <p className="mt-4">
                The EMB method generates imputed values through an iterative
                procedure that uses other variables to impute a value
                (expectation) and then asserts whether the value is most likely
                to fit the data (maximisation). To account for variation caused
                by missing data, the model is run 10 times – the average of
                these 10 imputations is then used to impute the missing value.
              </p>
              <h2 className="text-2xl md:text-3xl font-bold mt-3 mb-6 sm:text-center md:text-left">
                Definitions and scales
              </h2>
              <p className="mb-4">
                Data that has been retrieved is then matched with a UN-defined
                list of countries, regions, sub-regions, income groups, and
                territorial borders.
              </p>
              <p>
                Raw data and data from other indexes are converted to values
                within the DDC’s 0-5 range. The method used to perform this
                conversion depends on the type of indicator. Through rescaling
                all scores between 0 and 5 (no zero scores), the countries are
                clearly within one of the five maturity stages of digital
                development.
              </p>
            </div>
          </div>
        </div>
        <div className="pt-10 overflow-x-auto">
          <table className="w-full sm:w-3/5 mx-auto bg-white border border-gray-300">
            {/* people */}
            <thead
              style={{
                backgroundColor: (ancillary.pillarColorMap as any)[
                  tableData[0].pillar
                ]?.base,
                color: "white",
              }}
            >
              <tr>
                <th className="py-2 px-4 border-b border-gray-300 ">Pillar</th>
                {/* <th className="py-2 px-4 border-b border-gray-300 bg-green-200">Sub-pillar</th> */}
                <th className="py-2 px-4 border-b border-gray-300 ">Basic</th>
                <th className="py-2 px-4 border-b border-gray-300 ">
                  Opportunistic
                </th>
                <th className="py-2 px-4 border-b border-gray-300 ">
                  Systematic
                </th>
                <th className="py-2 px-4 border-b border-gray-300 ">
                  Differentiating
                </th>
                <th className="py-2 px-4 border-b border-gray-300 ">
                  Transformational
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {tableData.length > 0 && (
                  <React.Fragment>
                    <td className="py-2 px-4 border-b border-gray-300 font-bold">
                      {tableData[0].pillar}
                    </td>
                    {tableData[0].levels.map((level, levelIndex) => (
                      <td
                        key={levelIndex}
                        className="py-2 px-4 border-b text-start border-gray-300"
                      >
                        {level}
                      </td>
                    ))}
                  </React.Fragment>
                )}
              </tr>
            </tbody>
            <thead
              style={{
                backgroundColor: (ancillary.pillarColorMap as any)[
                  tableData[0].pillar
                ]?.base,
                color: "white",
              }}
            >
              <tr>
                <th className="py-2 px-4 border-b border-gray-300">
                  Sub-pillar
                </th>
                {/* <th className="py-2 px-4 border-b border-gray-300 bg-green-200">Sub-pillar</th> */}
                <th className="py-2 px-4 border-b border-gray-300">Basic</th>
                <th className="py-2 px-4 border-b border-gray-300">
                  Opportunistic
                </th>
                <th className="py-2 px-4 border-b border-gray-300">
                  Systematic
                </th>
                <th className="py-2 px-4 border-b border-gray-300">
                  Differentiating
                </th>
                <th className="py-2 px-4 border-b border-gray-300">
                  Transformational
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.length > 0 && (
                <React.Fragment>
                  {tableData[0].subPillars.map((subPillar, subIndex) => (
                    <tr key={`0-${subIndex}`}>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {subPillar.subPillar}
                      </td>
                      {subPillar.levels.map((subLevel, subLevelIndex) => (
                        <td
                          key={subLevelIndex}
                          className="py-2 px-4 border-b text-start border-gray-300"
                        >
                          {subLevel}
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              )}
            </tbody>
            {/* Connectivity */}
            <thead
              style={{
                backgroundColor: (ancillary.pillarColorMap as any)[
                  tableData[1].pillar
                ]?.base,
                color: "white",
              }}
            >
              <tr>
                <th className="py-2 px-4 border-b border-gray-300 ">Pillar</th>
                {/* <th className="py-2 px-4 border-b border-gray-300 bg-green-200">Sub-pillar</th> */}
                <th className="py-2 px-4 border-b border-gray-300 ">Basic</th>
                <th className="py-2 px-4 border-b border-gray-300 ">
                  Opportunistic
                </th>
                <th className="py-2 px-4 border-b border-gray-300 ">
                  Systematic
                </th>
                <th className="py-2 px-4 border-b border-gray-300 ">
                  Differentiating
                </th>
                <th className="py-2 px-4 border-b border-gray-300 ">
                  Transformational
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {tableData.length > 0 && (
                  <React.Fragment>
                    <td className="py-2 px-4 border-b border-gray-300 font-bold">
                      {tableData[1].pillar}
                    </td>
                    {tableData[1].levels.map((level, levelIndex) => (
                      <td
                        key={levelIndex}
                        className="py-2 px-4 border-b text-start border-gray-300"
                      >
                        {level}
                      </td>
                    ))}
                  </React.Fragment>
                )}
              </tr>
            </tbody>
            <thead
              style={{
                backgroundColor: (ancillary.pillarColorMap as any)[
                  tableData[1].pillar
                ]?.base,
                color: "white",
              }}
            >
              <tr>
                <th className="py-2 px-4 border-b border-gray-300">
                  Sub-pillar
                </th>
                {/* <th className="py-2 px-4 border-b border-gray-300 bg-green-200">Sub-pillar</th> */}
                <th className="py-2 px-4 border-b border-gray-300">Basic</th>
                <th className="py-2 px-4 border-b border-gray-300">
                  Opportunistic
                </th>
                <th className="py-2 px-4 border-b border-gray-300">
                  Systematic
                </th>
                <th className="py-2 px-4 border-b border-gray-300">
                  Differentiating
                </th>
                <th className="py-2 px-4 border-b border-gray-300">
                  Transformational
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.length > 0 && (
                <React.Fragment>
                  {tableData[1].subPillars.map((subPillar, subIndex) => (
                    <tr key={`0-${subIndex}`}>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {subPillar.subPillar}
                      </td>
                      {subPillar.levels.map((subLevel, subLevelIndex) => (
                        <td
                          key={subLevelIndex}
                          className="py-2 px-4 border-b text-start border-gray-300"
                        >
                          {subLevel}
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              )}
            </tbody>
            {/* Government */}
            <thead
              style={{
                backgroundColor: (ancillary.pillarColorMap as any)[
                  tableData[2].pillar
                ]?.base,
                color: "white",
              }}
            >
              <tr>
                <th className="py-2 px-4 border-b border-gray-300 ">Pillar</th>
                {/* <th className="py-2 px-4 border-b border-gray-300 bg-green-200">Sub-pillar</th> */}
                <th className="py-2 px-4 border-b border-gray-300 ">Basic</th>
                <th className="py-2 px-4 border-b border-gray-300 ">
                  Opportunistic
                </th>
                <th className="py-2 px-4 border-b border-gray-300 ">
                  Systematic
                </th>
                <th className="py-2 px-4 border-b border-gray-300 ">
                  Differentiating
                </th>
                <th className="py-2 px-4 border-b border-gray-300 ">
                  Transformational
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {tableData.length > 0 && (
                  <React.Fragment>
                    <td className="py-2 px-4 border-b border-gray-300 font-bold">
                      {tableData[2].pillar}
                    </td>
                    {tableData[2].levels.map((level, levelIndex) => (
                      <td
                        key={levelIndex}
                        className="py-2 px-4 border-b text-start border-gray-300"
                      >
                        {level}
                      </td>
                    ))}
                  </React.Fragment>
                )}
              </tr>
            </tbody>
            <thead
              style={{
                backgroundColor: (ancillary.pillarColorMap as any)[
                  tableData[2].pillar
                ]?.base,
                color: "white",
              }}
            >
              <tr>
                <th className="py-2 px-4 border-b border-gray-300">
                  Sub-pillar
                </th>
                {/* <th className="py-2 px-4 border-b border-gray-300 bg-green-200">Sub-pillar</th> */}
                <th className="py-2 px-4 border-b border-gray-300">Basic</th>
                <th className="py-2 px-4 border-b border-gray-300">
                  Opportunistic
                </th>
                <th className="py-2 px-4 border-b border-gray-300">
                  Systematic
                </th>
                <th className="py-2 px-4 border-b border-gray-300">
                  Differentiating
                </th>
                <th className="py-2 px-4 border-b border-gray-300">
                  Transformational
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.length > 0 && (
                <React.Fragment>
                  {tableData[2].subPillars.map((subPillar, subIndex) => (
                    <tr key={`0-${subIndex}`}>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {subPillar.subPillar}
                      </td>
                      {subPillar.levels.map((subLevel, subLevelIndex) => (
                        <td
                          key={subLevelIndex}
                          className="py-2 px-4 border-b text-start border-gray-300"
                        >
                          {subLevel}
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              )}
            </tbody>
            {/* Regulations */}
            <thead
              style={{
                backgroundColor: (ancillary.pillarColorMap as any)[
                  tableData[3].pillar
                ]?.base,
                color: "white",
              }}
            >
              <tr>
                <th className="py-2 px-4 border-b border-gray-300 ">Pillar</th>
                {/* <th className="py-2 px-4 border-b border-gray-300 bg-green-200">Sub-pillar</th> */}
                <th className="py-2 px-4 border-b border-gray-300 ">Basic</th>
                <th className="py-2 px-4 border-b border-gray-300 ">
                  Opportunistic
                </th>
                <th className="py-2 px-4 border-b border-gray-300 ">
                  Systematic
                </th>
                <th className="py-2 px-4 border-b border-gray-300 ">
                  Differentiating
                </th>
                <th className="py-2 px-4 border-b border-gray-300 ">
                  Transformational
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {tableData.length > 0 && (
                  <React.Fragment>
                    <td className="py-2 px-4 border-b border-gray-300 font-bold">
                      {tableData[3].pillar}
                    </td>
                    {tableData[3].levels.map((level, levelIndex) => (
                      <td
                        key={levelIndex}
                        className="py-2 px-4 border-b text-start border-gray-300"
                      >
                        {level}
                      </td>
                    ))}
                  </React.Fragment>
                )}
              </tr>
            </tbody>
            <thead
              style={{
                backgroundColor: (ancillary.pillarColorMap as any)[
                  tableData[3].pillar
                ]?.base,
                color: "white",
              }}
            >
              <tr>
                <th className="py-2 px-4 border-b border-gray-300">
                  Sub-pillar
                </th>
                {/* <th className="py-2 px-4 border-b border-gray-300 bg-green-200">Sub-pillar</th> */}
                <th className="py-2 px-4 border-b border-gray-300">Basic</th>
                <th className="py-2 px-4 border-b border-gray-300">
                  Opportunistic
                </th>
                <th className="py-2 px-4 border-b border-gray-300">
                  Systematic
                </th>
                <th className="py-2 px-4 border-b border-gray-300">
                  Differentiating
                </th>
                <th className="py-2 px-4 border-b border-gray-300">
                  Transformational
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.length > 0 && (
                <React.Fragment>
                  {tableData[3].subPillars.map((subPillar, subIndex) => (
                    <tr key={`0-${subIndex}`}>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {subPillar.subPillar}
                      </td>
                      {subPillar.levels.map((subLevel, subLevelIndex) => (
                        <td
                          key={subLevelIndex}
                          className="py-2 px-4 border-b text-start border-gray-300"
                        >
                          {subLevel}
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              )}
            </tbody>
            {/* Economy */}
            <thead
              style={{
                backgroundColor: (ancillary.pillarColorMap as any)[
                  tableData[4].pillar
                ]?.base,
                color: "white",
              }}
            >
              <tr>
                <th className="py-2 px-4 border-b border-gray-300 ">Pillar</th>
                {/* <th className="py-2 px-4 border-b border-gray-300 bg-green-200">Sub-pillar</th> */}
                <th className="py-2 px-4 border-b border-gray-300 ">Basic</th>
                <th className="py-2 px-4 border-b border-gray-300 ">
                  Opportunistic
                </th>
                <th className="py-2 px-4 border-b border-gray-300 ">
                  Systematic
                </th>
                <th className="py-2 px-4 border-b border-gray-300 ">
                  Differentiating
                </th>
                <th className="py-2 px-4 border-b border-gray-300 ">
                  Transformational
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {tableData.length > 0 && (
                  <React.Fragment>
                    <td className="py-2 px-4 border-b border-gray-300 font-bold">
                      {tableData[4].pillar}
                    </td>
                    {tableData[4].levels.map((level, levelIndex) => (
                      <td
                        key={levelIndex}
                        className="py-2 px-4 border-b text-start border-gray-300"
                      >
                        {level}
                      </td>
                    ))}
                  </React.Fragment>
                )}
              </tr>
            </tbody>
            <thead
              style={{
                backgroundColor: (ancillary.pillarColorMap as any)[
                  tableData[4].pillar
                ]?.base,
                color: "white",
              }}
            >
              <tr>
                <th className="py-2 px-4 border-b border-gray-300">
                  Sub-pillar
                </th>
                {/* <th className="py-2 px-4 border-b border-gray-300 bg-green-200">Sub-pillar</th> */}
                <th className="py-2 px-4 border-b border-gray-300">Basic</th>
                <th className="py-2 px-4 border-b border-gray-300">
                  Opportunistic
                </th>
                <th className="py-2 px-4 border-b border-gray-300">
                  Systematic
                </th>
                <th className="py-2 px-4 border-b border-gray-300">
                  Differentiating
                </th>
                <th className="py-2 px-4 border-b border-gray-300">
                  Transformational
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.length > 0 && (
                <React.Fragment>
                  {tableData[4].subPillars.map((subPillar, subIndex) => (
                    <tr key={`0-${subIndex}`}>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {subPillar.subPillar}
                      </td>
                      {subPillar.levels.map((subLevel, subLevelIndex) => (
                        <td
                          key={subLevelIndex}
                          className="py-2 px-4 border-b text-start border-gray-300"
                        >
                          {subLevel}
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              )}
            </tbody>
            {/* Digital Public Infrastructure  */}
            <thead
              style={{
                backgroundColor: (ancillary.pillarColorMap as any)[
                  tableData[5].pillar
                ]?.base,
                color: "white",
              }}
            >
              <tr>
                <th className="py-2 px-4 border-b border-gray-300 ">Pillar</th>
                {/* <th className="py-2 px-4 border-b border-gray-300 bg-green-200">Sub-pillar</th> */}
                <th className="py-2 px-4 border-b border-gray-300 ">Basic</th>
                <th className="py-2 px-4 border-b border-gray-300 ">
                  Opportunistic
                </th>
                <th className="py-2 px-4 border-b border-gray-300 ">
                  Systematic
                </th>
                <th className="py-2 px-4 border-b border-gray-300 ">
                  Differentiating
                </th>
                <th className="py-2 px-4 border-b border-gray-300 ">
                  Transformational
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {tableData.length > 0 && (
                  <React.Fragment>
                    <td className="py-2 px-4 border-b border-gray-300 font-bold">
                      {tableData[5].pillar}
                    </td>
                    {tableData[5].levels.map((level, levelIndex) => (
                      <td
                        key={levelIndex}
                        className="py-2 px-4 border-b text-start border-gray-300"
                      >
                        {level}
                      </td>
                    ))}
                  </React.Fragment>
                )}
              </tr>
            </tbody>
            <thead
              style={{
                backgroundColor: (ancillary.pillarColorMap as any)[
                  tableData[5].pillar
                ]?.base,
                color: "white",
              }}
            >
              <tr>
                <th className="py-2 px-4 border-b border-gray-300">
                  Sub-pillar
                </th>
                {/* <th className="py-2 px-4 border-b border-gray-300 bg-green-200">Sub-pillar</th> */}
                <th className="py-2 px-4 border-b border-gray-300">Basic</th>
                <th className="py-2 px-4 border-b border-gray-300">
                  Opportunistic
                </th>
                <th className="py-2 px-4 border-b border-gray-300">
                  Systematic
                </th>
                <th className="py-2 px-4 border-b border-gray-300">
                  Differentiating
                </th>
                <th className="py-2 px-4 border-b border-gray-300">
                  Transformational
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.length > 0 && (
                <React.Fragment>
                  {tableData[5].subPillars.map((subPillar, subIndex) => (
                    <tr key={`0-${subIndex}`}>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {subPillar.subPillar}
                      </td>
                      {subPillar.levels.map((subLevel, subLevelIndex) => (
                        <td
                          key={subLevelIndex}
                          className="py-2 px-4 border-b text-start border-gray-300"
                        >
                          {subLevel}
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              )}
            </tbody>
          </table>
          <p className="text-center mt-2">
            <em>Table 3. DDC definitions and scales</em>
          </p>
        </div>
        <div className="flex w-3/5 md:w-3/5 sm:w-4/5 mx-auto pb-4">
          <div className="bg-gray-200 px-4 py-2 max-w-xs">
            <p className="text-lg mb-1">
              Raw Data
              <br />
              <span className="text-sm text-gray-600">PDF (800kb)</span>
            </p>
            <div className="text-lg font-bold flex items-center mt-2">
              DOWNLOAD
              <a
                href="https://raw.githubusercontent.com/undp/digital-development-compass/staging/ui/database/raw/scores.csv"
                className="text-red-500 flex items-center ml-2"
                id="downloadRawScoresFile"
                onClick={handleDownloadClick}
                onMouseEnter={() => setDownloadHovered(true)}
                onMouseLeave={() => setDownloadHovered(false)}
              > 
               { isDownloadHovered ? (               
                 <Image
                  src={downloadHover}
                  alt="downloadHover"
                  width={16}
                  height={16}
                />
              ) : (
                <Image
                src={downloadDefault}
                alt="download"
                width={16}
                height={16}
              />
                )}
              </a>
            </div>
          </div>
        </div>

        <p className="w-3/5 md:w-3/5 sm:w-4/5 mx-auto">
        <Link href="/disclaimer">
            <a className="text-sm sm:text-sm md:text-2xl font-medium tracking-wider flex items-center"
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}
            >
              CLICK HERE TO ACCESS THE DISCLAIMER
              <div className="ml-2 mb-1 sm:mt-1  flex items-center space-x-0">
                    {isHovered ? (
                      <Image
                        src={arrowBase}
                        alt="arrowBase"
                        className="m-0 p-0"
                      />
                    ) : (
                      <Image
                        src={chevronRight}
                        alt="chevronRight"
                        className="m-0 p-0"
                      />
                    )}
                  </div>
            </a>
          </Link>
        </p>
        <div></div>
        <div className="flex justify-center mt-8">
          <button
            onClick={handleScrollToTop}
            className="bg-brand-blue-dark border-2 font-semibold border-brand-blue-dark hover:bg-brand-blue-dark/90 px-4 py-2 text-xs uppercase tracking-wide text-white flex-shrink-0 flex items-center"
          >
            Scroll To Top
          </button>
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

//Original Layout Design Need Country Input Otherwise this not need.
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

export function PillarsTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-brand-blue" style={{ color: "#ffffff" }}>
          <tr>
            <th className="px-4 py-2 border text-left">Pillars</th>
            <th className="px-4 py-2 border text-left">Sub-pillars</th>
          </tr>
        </thead>
        <tbody style={{ backgroundColor: "#f3f4f6" }}>
          {pillarsTableData.map((item, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border border-gray-300 align-top text-left font-bold">
                {item.pillar}
              </td>
              <td className="px-4 py-2 border border-gray-300 text-left">
                <ul>
                  {item.subPillars.map((subPillar, subIndex) => (
                    <li key={subIndex}>{subPillar}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export function DimensionsTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full sm:4 bg-white border border-gray-300">
        <thead className="bg-brand-blue text-white">
          <tr>
            <th className="px-1 py-2 border border-gray-300 text-left">
              Dimension
            </th>
            <th className="px-1 py-2 border border-gray-300 text-left">
              Question
            </th>
            <th className="px-1 py-2 border border-gray-300 text-left">Type</th>
          </tr>
        </thead>
        <tbody className="bg-gray-100">
          {dimensionsTable.map((item, index) => (
            <React.Fragment key={index}>
              <tr>
                <td
                  className="px-1 py-2 border border-gray-300 align-top text-left font-bold"
                  rowSpan={item.questions.length}
                >
                  {item.dimension}
                </td>
                <td className="px-1 py-2 border border-gray-300 text-left">
                  {item.questions[0].question}
                  {item.questions[0].subQuestions &&
                    item.questions[0].subQuestions.map(
                      (subQuestion, subIndex) => (
                        <div key={subIndex} className="ml-4">
                          - {subQuestion}
                        </div>
                      )
                    )}
                </td>
                <td className="px-1 py-2 border border-gray-300 text-left">
                  {item.questions[0].type}
                </td>
              </tr>
              {item.questions.slice(1).map((question, qIndex) => (
                <tr key={qIndex}>
                  <td className="px-1 py-2 border border-gray-300 text-left">
                    {question.question}
                    {question.subQuestions &&
                      question.subQuestions.map((subQuestion, subIndex) => (
                        <div key={subIndex} className="ml-4">
                          - {subQuestion}
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-2 border border-gray-300 text-left">
                    {question.type}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
