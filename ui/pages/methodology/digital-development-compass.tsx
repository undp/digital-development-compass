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
//import arrowBase from "../../public/arrow-base.svg";
import downloadHover from "../../public/download-hover.svg";

const NavBar = () => {
  return (
    <nav className="flex items-center justify-start p-4 text-[12px] [line-height:13.5px] font-semibold sm:text-sm md:text-[12px]">
      <Link href="/">
        <a className="mr-3 [color:#D12800] uppercase hover:[color:#ee402d]">
          Home
        </a>
      </Link>
      <span className="[color:#D12800] mr-3 ">/</span>
      <span className="[color:#D12800] mr-3 hover:[color:#ee402d]">
        METHODOLOGY
      </span>
      <span className="[color:#D12800]">/</span>
      <Link href="/methodology/digital-development-compass">
        <a className="ml-3 [color:#000000]">DIGITAL DEVELOPMENT COMPASS</a>
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
      <div className="px-3 sm:px-3 md:px-6 lg:px-6 mx-auto py-0 sm:py-0 md:py-6 lg:py-6">
        <div className="pt-[14px] sm:pt-3 md:pt-0 lg:pt-0">
          <div
            className="w-full h-[410px] sm:h-[410px] md:h-[532px] lg:h-[532px] md:px-9"
            style={{ backgroundColor: "#F7F7F7" }}
          >
            <div className="md:px-14 md:mx-auto">
              <div className="md:mx-auto pt-0 sm:pt-0 md:pt-[80px]">
                <NavBar />
                <div className="max-w-[400em] py-5 sm:py-10 text-start sm:text-left md:text-left pl-3 pt-[80px]">
                  <h2
                    className="heading-mobile-title-size sm:heading-mobile-title-size md:heading-title-size lg:heading-title-size font-bold mt-0 md:mt-6 uppercase mb-3 hero-content-text-color"
                    style={{
                      fontFamily: "SohneBreitFont, sans-serif",
                      wordWrap: "break-word",
                    }}
                  >
                    DIGITAL DEVELOPMENT
                    <br />
                    COMPASS
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[1050px]  mx-auto pt-[100px] sm:pt-[100px] md:pt-[61.12px] lg:pt-[61.12px]">
          <div className="flex-col items-center">
            {/* <div className="max-w-[40em] py-5 sm:py-10 text-lg text-center">
            <h2 className="text-3xl font-bold mt-0 md:mt-7 mb-3 text-brand-blue-dark">
              DIGITAL DEVELOPMENT COMPASS
            </h2>
          </div> */}
            <div className="text-[16px] sm:text-[16px] md:text-[20px] lg:text-[20px] leading-[1.4]">
              <h2 className="text-[40px] sm:text-[40px] md:text-[55px] lg:text-[55px] leading-[1.4] sm:leading-[48px] md:leading-[1.4] lg:leading-[1.4] font-bold text-left pb-[70px] sm:pb-[70px] md:pb-[50px] lg:pb-[50px]">
                What is the Digital Development Compass?
              </h2>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                The Digital Development Compass (the Compass) is a comprehensive
                visualisation of a country's digital indicators, based on
                publicly available datasets. By examining the Compass, each
                country can identify their strengths and weaknesses and assess
                their digital ‘maturity stage.’ The tool features various
                visualization options, displays the percentage of available
                data, and enables comparisons between regions, sub-regions and
                income groups. This user-friendly format allows users to obtain
                a snapshot of a country's digital readiness without the need to
                consult multiple sources.
              </p>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                Moreover, the tool serves as a catalyst for conversations
                between governments and UNDP. It opens the door for discussions
                about potential discrepancies in rankings or the potential
                impacts of digital technologies on specific sectors or
                development plans. Thus, the Compass acts as both a diagnostic
                framework and a starting point for deeper collaboration and
                engagement.
              </p>
              <p>
                Ultimately, the Compass represents a valuable tool for
                understanding governments’ current digital landscapes and
                identifying opportunities for progress and growth. It also
                encourages governments to share their advancements openly to
                ensure their digital progress is accurately represented in the
                Compass.
              </p>
              <h2 className="text-[30px] sm:text-[px] md:text-[24px] lg:text-[24px] leading-[1.4] text-left pb-[30px] sm:pb-[30px] md:pb-[35px] lg:pb-[35px] pt-[100px] sm:pt-[100px] md:pt-[28px] lg:pt-[28px] tracking-normal">
                How should the Compass be used?
              </h2>
              <p>
                The primary objective of the Digital Development Compass is to
                serve as a prominent entry point for countries to directly
                connect with UNDP’s Country Offices. Through this platform,
                Country Offices can promptly generate customized materials that
                showcase their digital initiatives, capabilities and needs. By
                providing this dedicated space, the Compass aims to strengthen
                engagement and collaboration while offering countries an
                expedient means to explore and leverage UNDP's digital
                capabilities.
              </p>
              <h2 className="text-[40px] sm:text-[40px] md:text-[55px] lg:text-[55px] leading-[1.4] sm:leading-[48px] md:leading-[1.4] lg:leading-[1.4] font-bold text-left pt-[100px] sm:pt-[100px] md:pt-[61.12px] lg:pt-[61.12px]">
                The Digital Transformation Framework
              </h2>
              <h2 className="text-[30px] sm:text-[px] md:text-[24px] lg:text-[24px] leading-[1.4] text-left pb-[30px] sm:pb-[30px] md:pb-[35px] lg:pb-[35px] pt-[100px] sm:pt-[100px] md:pt-[28px] lg:pt-[28px] tracking-normal">
                Defining digital development
              </h2>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                'Digital transformation' is not a destination, but a journey. It
                is about using digital and technology to improve the lives and
                livelihoods of individuals, communities and countries.
              </p>
              <p>
                UNDP advocates for inclusive, whole-of-society digital
                transformation. This demands a coordinated approach between
                government, civil society and the private sector to build
                ownership, support human-centred design, mitigate risks and
                establish accountability. To support this strategy, UNDP has
                developed the Digital Transformation Framework, which covers the
                most important areas for collaboration to achieve inclusive
                digital transformation.
              </p>
              <h2 className="text-[30px] sm:text-[px] md:text-[24px] lg:text-[24px] leading-[1.4] text-left pb-[30px] sm:pb-[30px] md:pb-[35px] lg:pb-[35px] pt-[100px] sm:pt-[100px] md:pt-[28px] lg:pt-[28px] tracking-normal">
                Overview of the Digital Transformation Framework
              </h2>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                The Compass is constructed based on the inclusive
                whole-of-society{" "}
                <a
                  href="https://digital-development-compass-git-staging-undp-digital.vercel.app/about"
                  className="url-styling"
                  target="_blank"
                >
                  Digital Transformation Framework
                </a>{" "}
                endorsed by UNDP. The Digital Transformation Framework guides
                countries towards inclusive digital transformation.
                Specifically, it enables stakeholders to identify, structure and
                prioritize their national digital transformation initiatives and
                agendas effectively.
              </p>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                The Digital Transformation Framework is the result of an
                extensive study that examined various frameworks, implementation
                strategies and methodologies employed by diverse organizations,
                including those in the private sector, public sector and
                international development agencies. The Framework (see Figure 1)
                is structured around five pillars, with each pillar being
                further subdivided into 20 sub-pillars such as cyber security
                and broadband speed. Additionally, the Compass reflects the
                state of Digital Public Infrastructure (DPI), with 3
                sub-dimensions: data exchange, identification and payments.
                Finally, to score the country’s digital transformation, the
                Compass evaluates each sub-pillar, using its specific set of
                indicators.
              </p>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                Through this framework, UNDP aims to provide countries with a
                valuable resource for assessing and advancing their digital
                development journey; while considering the unique challenges and
                opportunities they may encounter along the way.
              </p>
              <div className="max-w-[50em] mx-auto px-4">
                <Image
                  src={overviewofTDTF}
                  alt="The undp/digital-nation-dashboard GitHub repository"
                  className="w-full sm:w-64 h-auto"
                />
                <p className="text-center mt-2 mb-2">
                  <em>Figure 1. UNDP’s Digital Transformation Framework</em>
                </p>
              </div>
              <h2 className="text-[30px] sm:text-[px] md:text-[24px] lg:text-[24px] leading-[1.4] text-left pb-[30px] sm:pb-[30px] md:pb-[35px] lg:pb-[35px] pt-[100px] sm:pt-[100px] md:pt-[28px] lg:pt-[28px] tracking-normal">
                Pillars and sub-pillars
              </h2>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                Table 1 provides a list of the pillars and the underlying
                sub-pillars constituting UNDP’s inclusive whole-of-society
                Digital Transformation Framework, which form the basis of the
                Digital Development Compass:
              </p>
              <div className="max-w-[50em] mx-auto">
                <PillarsTable />
                <p className="text-center mt-2">
                  <em>
                    Table 1. UNDP’s inclusive whole-of-society Digital
                    Transformation Framework: pillars and sub-pillars
                  </em>
                </p>
              </div>
              <h2 className="text-[40px] sm:text-[40px] md:text-[55px] lg:text-[55px] leading-[1.4] sm:leading-[48px] md:leading-[1.4] lg:leading-[1.4] font-bold text-left pt-[100px] sm:pt-[100px] md:pt-[61.12px] lg:pt-[61.12px] pb-[70px] sm:pb-[70px] md:pb-[60px] lg:pb-[60px]">
                Measuring digital development
              </h2>
              <h2 className="text-[30px] sm:text-[px] md:text-[24px] lg:text-[24px] leading-[1.4] text-left pb-[30px] sm:pb-[30px] md:pb-[35px] lg:pb-[35px] tracking-normal">
                Stages of digital development
              </h2>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                Each country's digital readiness is assessed across five stages
                of digital development as indicated in Figure 2, which
                encompasses every pillar and sub-pillar.
              </p>
              <div className="max-w-[50em] mx-auto px-4">
                <Image
                  src={fiveStage}
                  alt="The undp/digital-nation-dashboard GitHub repository"
                  className="w-full sm:w-84 h-auto"
                />
                <p className="text-center mt-2  pb-[30px] sm:pb-[30px] md:pb-[35px] lg:pb-[35px]">
                  <em>Figure 2. UNDP's five stages of digital development</em>
                </p>
              </div>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
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
                  <em>Figure 3. Transformation framework</em>
                </p>
              </div>
            </div>
            <h2 className="text-[40px] sm:text-[40px] md:text-[55px] lg:text-[55px] leading-[1.4] sm:leading-[48px] md:leading-[1.4] lg:leading-[1.4] font-bold text-left pt-[100px] sm:pt-[100px] md:pt-[61.12px] lg:pt-[61.12px] pb-[70px] sm:pb-[70px] md:pb-[60px] lg:pb-[60px]">
              Digital development score methodology
            </h2>
            <div className="sm:mx-3 text-[16px] sm:text-[16px]  md:text-[20px] lg:text-[20px] leading-[1.4] text-left">
              <p>
                The software and data that are used to put together the Compass
                are open-source and in the process of becoming Digital Public
                Goods. The script and datasets can all be found on UNDP’s&nbsp;
                <a
                  href="https://github.com/undp/digital-development-compass"
                  className="url-styling"
                  target="_blank"
                >
                  GitHub
                </a>
                &nbsp;, developed in partnership with GitHub’s volunteer
                programme.
              </p>
              <h2 className="text-2xl pt-[100px] sm:pt-[35px] md:pt-[100px] lg:pt-[100px] pb-[30px] sm:pb-[30px] md:pb-[35px] lg:pb-[35px] tracking-normal">
                1. Indicator selection
              </h2>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                UNDP conducted a review of the 200+ indicators that formed the
                first version of the Digital Development Compass. This indicator
                evaluation was carried out in two phases:
              </p>
              <ul className="list-disc pl-10">
                <li className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                  Phase 1: Existing indicators were reviewed according to newly
                  established indicator criteria. A number of composite indexes
                  that were included earlier in the Compass were also exploded
                  to remove instances of double-counting and improve relevancy.
                  The term “exploded” is used, in the sense of ‘to break up into
                  pieces’, to refer to the process of surfacing all of the
                  individual indicators contained within a composite index.
                </li>
                <li className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                  Phase 2: New indicators were added after the research and
                  review process.
                </li>
              </ul>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                Currently, there are a 145 indicators included in the Compass.
                Indicators were identified by conducting online desk research
                into the public data available related to the sub-pillars and
                pillars of the Digital Development Framework mentioned above.
              </p>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                During this review process, an Expert Committee was appointed,
                comprising a globally representative group of experts with
                specialized experience in digital development. The Committee’s
                vision is to support the Digital Development Compass as it
                develops year on year. At its core, the Committee will remain
                flexible, evolving organically and in parallel with the Compass.
              </p>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                Based on a series of advisory consultations with the Expert
                Committee, questions for data evaluation have been created to
                assess data quality of all existing and newly selected
                indicators. In case the examined indicator does not meet the
                evaluation criteria, the indicator will be excluded from the
                Digital Development Compass.
              </p>

              <div className="max-w-[20em] sm:max-w-[50em] md:max-w-[813px] lg:max-w-[813px] mx-auto px-0">
                <DimensionsTable />
              </div>

              <p className="text-center mt-2 pb-[30px] sm:pb-[30px] md:pb-[35px] lg:pb-[35px]">
                <em>Table 2. Data evaluation questions</em>
              </p>
              <div className="p-0">
                <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                  As a result of this assessment, Digital Development Compass
                  includes 145 publicly available datasets and is available on{" "}
                  <a
                    href="https://www.undp.org/digital/transformations"
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
              <h2 className="text-2xl pt-[100px] sm:pt-[35px] md:pt-[100px] lg:pt-[100px] pb-[30px] sm:pb-[30px] md:pb-[35px] lg:pb-[35px] tracking-normal">
                2. Data collection
              </h2>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                The methodology used for data collection depends on the format
                the data are published in. Largely, data are retrieved from the
                data source automatically. Links to data sources are collected
                in a spreadsheet. Then, automation is used to scrape
                spreadsheets, PDFs and documents and convert them into a
                machine-readable format.
              </p>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                However, while automation can be applied to most websites from
                which data are collected, certain platforms require manual
                intervention. In these cases, files containing data in the
                correct format are uploaded manually.
              </p>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                99 percent of all indicators are automatically updated when
                organisations release new reports and datasets. The below
                diagram visualises how updates in the source data triggers a
                change in the Compass webpage.
              </p>
              <div className="max-w-[50em] mx-auto px-4">
                <Image
                  src={githubUNDPdiagram}
                  alt="The undp/digital-nation-dashboard GitHub repository"
                  className="w-full sm:w-84 h-auto"
                />
                <p className="text-center mt-2">
                  <em>Figure 4. Source</em>
                </p>
              </div>
              <p>
                When any of the links to source data expire, an automated email
                notification is sent to administrators, and new links are
                updated manually.
              </p>
              <h2 className="text-2xl pt-[100px] sm:pt-[35px] md:pt-[100px] lg:pt-[100px] pb-[30px] sm:pb-[30px] md:pb-[35px] lg:pb-[35px] tracking-normal">
                3. Score calculation methodology
              </h2>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                The Digital Development Compass aims to put countries into one
                of the five maturity levels for each of the sub-pillars. This
                section includes the approach to normalization, weighting
                indicators and imputation of missing scores.
              </p>
              <h2 className="text-xl md:tracking-normal">Normalisation</h2>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                The indicators used within the compass have been normalized
                using Min-Max rescaling.
              </p>
              <h2 className="text-lg md:tracking-normal">Min-Max rescaling</h2>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                The following formula creates a score between 0 and 1. It does
                so by creating a scale with a maximum possible score of 1 that
                corresponds to the highest scoring country’s score; and a
                minimum possible score of 0 that corresponds to the lowest
                scoring country’s score.
              </p>
              <p className="flex justify-center items-center pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                <Image
                  src={MinMaxScale}
                  alt="The undp/digital-nation-dashboard GitHub repository"
                  className="w-full sm:w-64 h-auto"
                />
              </p>
              <p>
                <u>Scaling and normalization of categorical data</u>
              </p>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
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
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                The original numerical values of the categories to the desired
                rescaled range are linearly mapped. The mapping maintains the
                relative order and spacing of the original values.
              </p>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                For each category, its rescaled value is calculated using the
                determined maximum possible value and the chosen scaling range.
                The rescaling formula is consistently applied across all
                categories.
              </p>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                The rescaled values are normalized to ensure they fall within a
                standard range, such as 0 to 1. Normalization helps mitigate the
                influence of outliers and enhances the interpretability of the
                data. Min-Max normalization is used for normalization of these
                data types as well.{" "}
              </p>
              <h2 className="text-xl md:tracking-normal">
                Indicator weightings
              </h2>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                In the Compass, equal weightings are assigned to all pillars and
                sub-pillars.{" "}
              </p>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                Weighting at the indicator level is made in the following way:
              </p>
              <ol className="list-decimal">
                <li>
                  <span className="font-bold">Indicator specificity:</span> Each
                  indicator is assigned a score of 1 or 0.5 based on its
                  relationship with digital development:
                  <ul className="list-disc pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                    <li className="list-disc pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                      The score 0.5 is assigned to indicators identified as more
                      weakly aligned and which only partially relate to digital
                      development.
                    </li>
                    <li className="list-disc pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                      The score 1 is assigned to indicators that have a clear,
                      direct connection to digital development.
                    </li>
                    <li className="list-disc pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                      A score of 0 is not included, as the data evaluation
                      process already removed indicators that do not clearly
                      relate to digital development (and which would have scored
                      0).
                    </li>
                  </ul>
                </li>
                <li className="list-disc pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                  <span className="font-bold">
                    Indicator uniqueness or overlap:
                  </span>{" "}
                  Although the Compass does not have any instances of the same
                  indicator appearing more than one time (explicit double
                  counting), in some cases, multiple indicators are measured
                  with overlapping factors. For instance, ‘average fixed
                  broadband download speeds’ and ‘average mobile broadband
                  upload speeds’ are highly likely to be correlated, being
                  dependent on the same infrastructure. These indicators needed
                  to be scored lower to avoid counting the same metric more than
                  once.
                  <ul className="list-disc">
                    <li className="list-disc pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                      To quantitatively capture overlapping, indicators are
                      scored by dividing 1 by the number of overlapping
                      indicators.
                    </li>
                    <li className="list-disc pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                      In this way, an indicator that does not overlap with
                      others scores 1; an indicator that overlaps with only one
                      other indicator scores 1/2 = 0.5; an indicator that
                      overlaps with two other indicators scores 1/3 = 0.33, and
                      so on.
                    </li>
                    <li className="list-disc pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
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
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                For indicators where there are gaps in country data, or there is
                no collected data from a particular country, imputing scores is
                an option. While imputed data is not included into the scoring
                in the Digital Development Compass, users can still visualise
                the data with or without imputed scores using a toggle switch.
              </p>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                The following imputation methods are selected depending on their
                suitability within a given context:{" "}
              </p>
              <ol className="list-decimal">
                <li>
                  <span className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                    Linear interpolation:
                  </span>{" "}
                  Historical information can be used before implementing a
                  modelling-based approach. If data are missing but there are
                  values in preceding and subsequent years, linear interpolation
                  is used.
                </li>
                <li>
                  <span className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                    Extrapolation:
                  </span>{" "}
                  If there is no data from preceding and subsequent years, data
                  are extrapolated as a constant value of the nearest reported
                  data, or as a value on a trend line/curve.
                </li>
                <li>
                  <span className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                    Neighbouring/similar countries’ data:
                  </span>{" "}
                  A mean average is taken based on a sample of regionally
                  neighbouring countries and/or GDP figures.
                </li>
                <li>
                  <span className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                    Expectation-maximisation with a bootstrapping (EMB):
                  </span>{" "}
                  The remaining missing data are imputed with an
                  expectation-maximisation with a bootstrapping (EMB) multiple
                  imputation algorithm.
                </li>
              </ol>
              <p>
                The EMB method generates imputed values through an iterative
                procedure that uses other variables to impute a value
                (expectation) and then asserts whether the value is most likely
                to fit the data (maximisation). To account for variation caused
                by missing data, the model is run 10 times. The average of these
                10 imputations is then used to impute the missing value.
              </p>
              <h2 className="text-[40px] sm:text-[40px] md:text-[55px] lg:text-[55px] leading-[1.4] sm:leading-[48px] md:leading-[1.4] lg:leading-[1.4] font-bold text-left pt-[100px] sm:pt-[100px] md:pt-[61.12px] lg:pt-[61.12px] pb-[70px] sm:pb-[70px] md:pb-[50px] lg:pb-[50px]">
                Definitions and scales
              </h2>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                Data that has been retrieved are then matched with a UN-defined
                list of countries, regions, sub-regions, income groups and
                territorial borders.
              </p>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                Raw data and data from other indexes are converted to values
                within the Compass’ 0 - 5 range. The method used to perform this
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
          <p className="text-center mt-2 ">
            <em>Table 3. DDC definitions and scales</em>
          </p>
        </div>
        {/* <div className="flex w-3/5 md:w-3/5 sm:w-4/5 mx-auto pb-4">
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
                {isDownloadHovered ? (
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
            <a
              className="text-sm sm:text-sm md:text-lg font-bold tracking-wider flex items-center"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              CLICK HERE TO ACCESS THE DISCLAIMER
              <div className="ml-2 mb-1 sm:mt-1  flex items-center space-x-0">
                {isHovered ? (
                  <Image src={arrowBase} alt="arrowBase" className="m-0 p-0" />
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
        </p> */}
        <div className="mx-[0px] sm:mx-0 md:mx-[265px] lg:mx-[265px]">
          <div className="flex md:w-[318px] sm:w-[285px] pt-12 pb-12 pl-0 sm:pl-0 md:pl-0 ">
            <div
              className="px-[22px] py-6 w-[336px]"
              style={{ backgroundColor: "#F7F7F7" }}
            >
              <p className="text-lg pb-2 text-[#000000]">Raw Data</p>
              <p className="text-sm pb-[16px] text-[#55606E]">PDF (800kb)</p>
              <div className="text-base font-bold flex items-center text-[#000000]">
                DOWNLOAD
                <a
                  href="https://raw.githubusercontent.com/undp/digital-development-compass/staging/ui/database/raw/scores.csv"
                  className="text-red-500 flex items-center ml-2"
                  id="downloadRawScoresFile"
                  onClick={handleDownloadClick}
                  onMouseEnter={() => setDownloadHovered(true)}
                  onMouseLeave={() => setDownloadHovered(false)}
                >
                  {isDownloadHovered ? (
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

          <p className="md:w-[400px] sm:w-5/5 pl-0 sm:pl-0 md:pl-0">
            <Link href="/disclaimer">
              <a
                className="text-base sm:text-sm md:text-base font-bold flex items-center"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                CLICK HERE TO ACCESS THE DISCLAIMER
                <div
                  className={`ml-3 mb-1 sm:mt-1 flex items-center space-x-0 duration-[150ms] ease-linear transform ${
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
          </p>
        </div>
        <div className="flex justify-center mt-[48px] pb-[44px]">
          <button
            onClick={handleScrollToTop}
            className="bg-brand-blue-dark border-2 border-brand-blue-dark hover:bg-brand-blue-dark/90 px-4 py-2 font-bold text-base uppercase tracking-wide text-white flex-shrink-0 flex items-center"
          >
            Scroll to the top
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
