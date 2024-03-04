import { db } from "database";
import { groupBy } from "lodash";
import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import Script from "next/script";
import { isMemberState} from "lib";
import githubUNDPdiagram from "../public/undp-diagram.png"
import overviewofTDTF from "../public/OverviewofTDTF.png"
import pillarSubpillar from  "../public/pillarSubpillar.jpg"
import fiveStage from "../public/fiveStage.png"
import transformation from "../public/transformation.png"
import dataProcess from "../public/DataProcess.jpg"
import Layout from "components/Layout";
import Link from "next/link";
import React from "react";

export default function Methodology(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const {countries } = props;

  const handleScrollToTop = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleDownloadClick = (event : React.MouseEvent<HTMLAnchorElement,MouseEvent>)=>{
    event.preventDefault();
    const url = event.currentTarget.getAttribute('href');
    if(url){
      fetch(url)
        .then(response => response.blob())
        .then(blob => {
          const anchor = document.createElement('a');
          anchor.href = URL.createObjectURL(blob);
          anchor.download = 'scores.csv';
          anchor.click();
          URL.revokeObjectURL(anchor.href);
        })
        .catch(error => {
          console.error('Error Downloading File',error);
        });
    }
  };
  return (
    <Layout title="Methodology" countries = {countries} >
      
      <div className="py-16">
        <div className="container px-4 mx-auto">
          <div className="text-lg flex flex-col items-center">
                <div className="max-w-[40em] py-10 text-lg text-center">
                  <h2 className="text-3xl font-bold mt-0 md:mt-7 mb-3 text-brand-blue-dark" >
                  Methodology
                  </h2>
                </div>
                <div className="max-w-[40em] space-y-9 text-justify ">
                  <h2 className="text-2xl md:text-3xl font-bold mt-3 mb-6 sm:text-center md:text-left">
                  Defining Digital Development
                  </h2>
                  <p>
                  'Digital transformation' is not a destination, but a journey. It is about using digital and technology
                   to improve the lives and livelihoods of individuals, communities, and countries. This ranges from improving public services, 
                   to tackling issues of marginalisation. 
                    
                  </p>
                  <p>
                    UNDP advocates for inclusive, whole-of-society digital transformation.
                    It is a coordinated approach between government, civil society and the private sector to build ownership,
                     support human-centred design, mitigate risks, and establish accountability. To support this strategy, UNDP has implemented
                      the Digital Transformation Framework to discover & compare progress across a range of key issues.
                  </p> 
                  
                  <h2 className="max-w-[40em] space-y-9 text-2xl md:tracking-normal">
                  Overview of the Digital Transformation framework
                  </h2>
                  <p>
                  The Digital Development Compass (DDC) is constructed based on the {" "}
                    <a href="https://www.undp.org/digital/transformations" className="text-blue-300">
                    Inclusive Whole-Of-Society Digital Transformation framework
                    </a>&nbsp;endorsed by UNDP. The Digital Transformation Framework serves as a guide for stakeholders to align their efforts regarding inclusive digital
                     transformation and supports countries in their transformation process. It enables stakeholders to identify, structure, and prioritise their 
                     national digital transformation initiatives and agendas effectively.
                     
                  </p>
                  <p>
                     The framework represents the encompassing structure for Digital Development within the UNDP. It is the result of an extensive study that 
                     examines various frameworks, implementation strategies, and methodologies employed by diverse organisations, including those in the private
                      sector, public sector, and international development agencies. Through this framework, UNDP aims to provide countries with a valuable resource for 
                      assessing and advancing their digital development journey, while considering the unique challenges and opportunities they may encounter along the way.<br></br> 
                  </p>

                  <p>
                      The Digital Transformation Framework is structured into seven pillars, with each pillar being further subdivided into 25 sub-pillars. Each sub-pillar corresponds to a 
                      specific element of digital transformation. The sub-pillars encompass various individual indicators, which are used to calculate a country's Digital Transformation Score. 
                      These scores are then aligned with corresponding stages of digital transformation.
                  </p>
                  <div className="max-w-[50em] mx-auto px-4">
                    <Image
                      src={overviewofTDTF}
                      alt="The undp/digital-nation-dashboard GitHub repository"
                      className="w-64 h-64"
                    />
                    <p className="text-center mt-2"><em>Overview of The Digital Transformation Framework</em></p>
                  </div>
                  <h2 className="max-w-[40em] space-y-9 text-2xl">
                  Pillars and sub-pillar
                  </h2>
                  <p>
                  The following section provides a list of the pillars and the underlying sub-pillars constituting UNDP’s Inclusive Whole-of-Society Digital 
                  Transformation Framework that form the basis of the Digital Development Compass.
                  </p>
                  <div className="max-w-[50em] mx-auto px-4">
                    <Image
                      src={pillarSubpillar}
                      alt="The undp/digital-nation-dashboard GitHub repository"
                      className="w-64 h-64"
                    />
                    <p className="text-center mt-2"><em>Table 1. UNDP’s Inclusive Whole-of-Society Digital Transformation Framework. Pillars and sub-pillars</em></p>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-6 sm:text-center md:text-left">
                  Measuring Digital Development
                  </h2>
                  <h2 className="max-w-[40em] space-y-9 text-2xl">
                  Stages of digital development 
                  </h2>
                  <p>
                  Each country's digital readiness is assessed across five stages of digital development, which encompass every pillar and sub-pillar.  
                  </p>
                  <div className="max-w-[50em] mx-auto px-4">
                    <Image
                      src={fiveStage}
                      alt="The undp/digital-nation-dashboard GitHub repository"
                      className="w-84 h-84"
                    />
                    <p className="text-center mt-2"><em>UNDP's five stages of digital development</em></p>
                  </div>
                  <p>
                  Further enhancement of countries' digital readiness can be achieved by providing individual support to each 
                  component of the transformation framework.
                  </p>
                  <div className="max-w-[50em] mx-auto px-4">
                    <Image
                      src={transformation}
                      alt="The undp/digital-nation-dashboard GitHub repository"
                      className="w-84 h-84"
                    />
                    <p className="text-center mt-2"><em>Transformation framework</em></p>
                  </div>
                </div>
                
                <div className="max-w-[40em] py-10 sm:text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold mt-10 mb-3 text-brand-blue-dark" >
                  Digital Development Score Methodology
                  </h2>
                  

                </div>

                <div className="max-w-[40em] space-y-9 text-justify">
                  <h2 className="text-2xl md:text-3xl sm:text-center md:text-left lg:text-3xl text-orange font-bold mt-3 mb-6">
                  Methodology
                  </h2>
                  <p>
                  The software and data that are used to put together the DDC are open source
                  and in the process of becoming Digital Public Goods. The script and datasets can all be found on UNDP’s&nbsp;
                  <a href="https://github.com/undp/digital-development-compass" className="text-blue-300">
                    GitHub.
                    </a>&nbsp;UNDP is partnered with GitHub’s volunteer programme and volunteers have helped to develop the novel scripts used in the process. 
                  </p>
                  

                  <h2 className="max-w-[40em] space-y-9">
                  1. Indicator Selection
                  </h2>

                  <p>
                  Indicators were identified by conducting desk research 
                  online into the public data available relating to the sub-pillars and pillars of the digital development framework. 
                  </p>
                  <p>
                  These indicators are compiled into an Open Digital Development Data Exchange that includes 189 publicly available datasets and is available on {" "}
                    <a href="https://github.com/undp/digital-development-compass" className="text-blue-300">
                    GitHub
                    </a>
                    . Sources of the data sets include:
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-7 gap-y-1 list-disc pl-4">
                    <li>
                      World Bank: World Development 
                      <p>
                      Indicators
                      </p>
                      
                    </li>
                    <li>
                      ITU: Digital Development Compass
                    </li>
                    <li>
                      GSMA: Mobile Connectivity Index
                    </li>
                    <li>
                      University of Oxford: Our World in Data
                    </li>
                    <li>
                      World Economic Forum: Global Competitiveness Index
                    </li>
                    <li>
                      Sustainable Development Report
                    </li>
                    <li>
                      UN: E-Government Survey
                    </li>
                    <li>
                      Packet Clearing House: Internet Exchange Directory
                    </li>
                    <li>
                      Ookla: Speedtest Intelligence
                    </li>
                    <li>
                      Universal Postal Union: Postal Statistics
                    </li>
                    <li>
                      World Bank: Logistics Performance Index
                    </li>
                    <li>
                      e-Governance Academy Foundation: National Cyber Security Index
                    </li>
                    <li>
                      ITU: Global Cybersecurity Index
                    </li>
                    <li>
                      The Global Entrepreneurship and Development Institute: Digital Platform Economy Index
                    </li>
                    <li>
                      World Bank/LinkedIn: Digital Data For Development
                    </li>
                  </ul> 
                  <p>
                  Of the identified datasets, those where the data could be accessed and processed using the below data 
                  collection methods are included in the DDC.
                  </p>
                  <h2 className="max-w-[40em] space-y-9">
                  2. Data Collection
                  </h2>
                  <p>
                  The methodology used for data collection depends on the format the data is published in. Links to data sources are collected in a 
                  spreadsheet and automation is used to scrape spreadsheets, PDFs, and documents and convert them into a machine-readable format. 
                  </p>
                  
                  <p>
                  The below diagram visualises how updates in the source data triggers a change in the DDC webpage.  
                  </p>
                  <div className="max-w-[50em] mx-auto px-4">
                    <Image
                      src={githubUNDPdiagram}
                      alt="The undp/digital-nation-dashboard GitHub repository"
                      className="w-84 h-84"
                    />
                    {/* <p className="text-center mt-2"><em>Source</em></p> */}
                  </div>
                  <p>
                  When any of the links to source data expire, an automated email notification is sent to administrators, and new links are updated manually.  
                  </p>

                  <h2 className="max-w-[40em] space-y-9">
                  3. Data Processing
                  </h2> 
                  <p>
                  Data that has been retrieved is then matched with a UN-defined list of countries, regions, sub-regions, income groups, 
                  and territorial borders.
                  </p>
                  <p>
                  Raw data and data from other indexes is converted to values within the DDC’s 1-5.99 range. The method used to perform this conversion depends on the type of indicator.
                  </p>

                  <div className="max-w-[50em] mx-auto px-4">
                    <Image
                      src={dataProcess}
                      alt="The undp/digital-nation-dashboard GitHub repository"
                      className="w-84 h-84"
                    />
                    {/* <p className="text-center mt-2"><em>Source</em></p> */}
                  </div>

                  {/* <table className="table-auto border">
                    <colgroup>
                      <col className="w-1/2" />
                      <col className="w-1/2" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th className="bg-blue-900 text-white px-4 py-2 border">Original type of Indicator</th>
                        <th className="bg-blue-900 text-white px-4 py-2 border">Conversion Method</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="bg-blue-200 text-black px-4 py-2 border">Pre-existing index, continuous. Indicators which are based on the calculations done by an external company, which assign an index score to a country. The information may be aggregated from several different indicators collected by the source organisation or aggregated from other sources. The range may be 0-100, or continuous 0-1.
                        </td>
                        <td className="bg-blue-200 text-black px-4 py-2 border">Min max normalisation is used, according to the following formula:<br/><br/>Normalised value = ((x - min value) * (5.99 - 1) / (max value - min value)) + 1<br/><br/>Min and max values are set to the min and max values of the actual data range.
                        </td>
                      </tr>
                      <tr>
                        <td className="bg-blue-200 text-black px-4 py-2 border">Percentage indicators, potentially in the range from 0 to 100.</td>
                        <td className="bg-blue-200 text-black px-4 py-2 border">Same as above.</td>
                      </tr>
                      <tr>
                        <td className="bg-blue-200 text-black px-4 py-2 border">Other numerical indicators without predefined range.</td>
                        <td className="bg-blue-200 text-black px-4 py-2 border">For indicators without predefined range, the conversion is done by first dividing the range of indicator values into quintiles.<br/><br/> Within each quintile, a min max normalisation is performed where the new minimum and new maximum values are set to the min and max values of the given quintile. For example, for the second quintile:<br/><br/>Normalised value = ((x - min value) * (2.99 - 2) / (max value - min value)) + 2</td>
                      </tr>
                      <tr>
                        <td className="bg-blue-200 text-black px-4 py-2 border">Interval indicators. Indicators with interval values which have a limited number of values, starting from 4 (eg between 1 and 4).</td>
                        <td className="bg-blue-200 text-black px-4 py-2 border">Straight conversion from min and max values to the DRA score.</td>
                      </tr>
                      <tr>
                        <td className="bg-blue-200 text-black px-4 py-2 border">Interval indicators, with only 2 or 3 values (eg 0 or 1).</td>
                        <td className="bg-blue-200 text-black px-4 py-2 border">No indicators of this type are included.</td>
                      </tr>
                    </tbody>
                  </table>         */}
                  
                  <h2 className="max-w-[40em] space-y-9">
                  4. Score Calculation
                  </h2>

                  <p>
                  Indicator level scores are weighted and averaged into sub-pillar scores. Presently, all indicators are weighted equally. Alongside the sub-pillar score, a data availability rate is calculated. This is the percentage of indicators in the sub-pillar for which there is data available for a country.<br/><br/> 
                  Sub-pillar level scores are then weighted and averaged into pillar scores. All sub-pillars are also weighted equally.<br/><br/>
                  Where data for a country is not available for an indicator, this indicator is omitted from the calculation of a sub-pillar score. Instead, an average of the indicator data that is available is used. Similarly, where no data is available for a sub-pillar, this sub-pillar is omitted from the calculation of the overall pillar score.<br/><br/>
                  
                  Download raw data file <a href="https://github.com/xeptagondev/undp-digital-development-compass/blob/xep_ddc_task175/ui/database/raw/scores.csv" className="text-blue-300" id='downloadRawScoresFile' onClick={handleDownloadClick}> here</a>
                  </p>
                  <p>
                    <Link href="/disclaimer">
                      <a className="text-xl md:text-2xl text-blue-300 hover:underline font-medium tracking-wider">
                        Disclaimer.
                      </a>
                    </Link>
                  </p>
                  <div className="flex justify-center mt-8">
                  <button
                    onClick={handleScrollToTop}
                    className="bg-brand-blue-dark border-2 font-semibold border-brand-blue-dark hover:bg-brand-blue-dark/90 px-4 py-2 text-xs uppercase tracking-wide text-white flex-shrink-0 flex items-center" >
                    Scroll To Top
                  </button>
                </div>
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
