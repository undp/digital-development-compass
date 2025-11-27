import { db } from "database";
import { groupBy } from "lodash";
import { InferGetStaticPropsType } from "next";
import Script from "next/script";
import { isMemberState } from "lib";
// import githubUNDPdiagram from "../../public/undp-diagram.png";
// import overviewofTDTF from "../../public/OverviewofTDTF.png";
// import fiveStage from "../../public/fiveStage.png";
// import transformation from "../../public/transformation.png";
// import MinMaxScale from "../../public/MinMaxScale.png";
import Layout from "components/Layout";
import Link from "next/link";
import React from "react";
import {
  pillarsTableData,
  feTableData,
  rendTableData,
  rpTableData,
  overallStagesTableData,
} from "database/DRDmethodologyTableData";
//import { ancillary } from "database/ancillary";

export default function DIGITAL_RIGHTS_DASHBOARD(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { countries } = props;

  const NavBar = () => {
    return (
      <nav className="flex items-center justify-start p-4 text-[12px] [line-height:13.5px] font-semibold sm:text-sm md:text-[12px]">
        <Link href="/">
          <a className="mr-3 [color:#D12800] hover:[color:#ee402d] uppercase">
            Home
          </a>
        </Link>
        <span className="[color:#D12800] mr-3">/</span>
        <span className="[color:#D12800] hover:[color:#ee402d] mr-3">METHODOLOGY</span>
        <span className="[color:#D12800] mr-3">/</span>
        <Link href="/methodology/digital-rights-dashboard">
          <a className="ml-0 [color:#000000]">DIGITAL RIGHTS DASHBOARD</a>
        </Link>
      </nav>
    );
  };

  const handleScrollToTop = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout title="Methodology" countries={countries}>
      <div className="px-3 sm:px-3 md:px-6 lg:px-6 mx-auto py-0 sm:py-0 md:py-6 lg:py-6">
      <div className="pt-[14px] sm:pt-3 md:pt-0 lg:pt-0">
          <div className="w-full h-[410px] sm:h-[410px] md:h-[532px] lg:h-[532px] md:px-9" style={{ backgroundColor: "#F7F7F7" }}>
            <div className="md:px-14 md:mx-auto">
              <div className="md:mx-auto pt-0 sm:pt-0 md:pt-[80px]">
                <NavBar />
                <div className="max-w-[400em] py-5 sm:py-10 text-start sm:text-left md:text-left pl-3 pt-[80px]">
                  <h2
                    className="heading-mobile-title-size sm:heading-mobile-title-size md:heading-title-size lg:heading-title-size font-bold mt-0 md:mt-6 uppercase mb-3 hero-content-text-color"
                    style={{
                      fontFamily: "SohneBreitFont, sans-serif",
                      wordWrap: "break-word",
                      letterSpacing : '3px'
                    }}
                  >
                    DIGITAL RIGHTS
                    <br />
                    DASHBOARD
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[1050px]  mx-auto pt-[100px] sm:pt-[100px] md:pt-[61.12px] lg:pt-[61.12px]">
          <div className="text-lg flex flex-col">
            {/* <div className="max-w-[40em] py-5 sm:py-10 text-lg text-center">
              <h2 className="text-3xl font-bold mt-0 md:mt-7 mb-3 text-brand-blue-dark">
              DIGITAL RIGHTS DASHBOARD
              </h2>
            </div> */}
            <div className="text-[16px] sm:text-[16px] md:text-[20px] lg:text-[20px] leading-[1.4] ">
              <h2 className="text-[40px] sm:text-[40px] md:text-[55px] lg:text-[55px] leading-[1.4] sm:leading-[48px] md:leading-[1.4] lg:leading-[1.4] font-bold text-left pb-[70px] sm:pb-[70px] md:pb-[50px] lg:pb-[50px] pt-[100px] sm:pt-[100px] md:pt-[61.12px] lg:pt-[61.12px] ">
                The role of digital rights in digital transformation
              </h2>
              <p>
                UNDP advocates for rights based, inclusive, whole-of-society
                digital transformation. It is a coordinated approach between
                government, civil society and the private sector to support
                human-centred design, mitigate risks, and establish
                accountability. However, digital transformation in the absence
                of a clearly defined framework of rights comes with several
                potential harms to individuals and consumers and undermines the
                trust that people repose in digital ecosystems.
              </p>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                This is why across the United Nations System, human rights have
                been recognized as integral to digital uptake and
                transformation. The Secretary-General's 2020{" "}
                <a
                  href="https://www.un.org/en/content/action-for-human-rights/index.shtml"
                  className="url-styling"
                  target="_blank"
                >
                  Call to Action on Human Rights: Our Common Agenda
                </a>{" "}
                includes consideration of the application of human rights
                frameworks and standards in the digital space. As per the{" "}
                <a
                  href="https://www.un.org/en/content/digital-cooperation-roadmap/"
                  className="url-styling"
                  target="_blank"
                >
                  United Nations Secretary General's Roadmap for Digital
                  Cooperation,
                </a>{" "}
                Human rights apply online just as they do offline. Digital
                technologies provide new means to exercise human rights, but
                they are too often also used to violate them. Data protection
                and privacy issues, the throttling of free speech online, the
                use of surveillance technologies, and online violence and
                harassment, are of particular concern. This view reflects
                several United Nations resolutions.
              </p>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                Consequently, the Digital Development Compass does not
                conceptualise "digital human rights" as new rights unique to the
                digital space but instead as the online application of rights
                that exist offline.
              </p>
              <p>
                <a
                  href="https://digitalstrategy.undp.org/"
                  className="url-styling"
                  target="_blank"
                >
                  UNDP's Digital Strategy
                </a>{" "}
                aims to apply this approach to the digital realm by
                collaborating with other entities in the UN system to promote
                inclusive and gender-sensitive approaches that address the needs
                of the most vulnerable. Further, UNDP will contribute to and
                propagate shared global standards that protect human rights in
                the digital realm by drawing from existing international law
                instruments such as the United Nations Charter and the Universal
                Declaration of Human Rights.
              </p>
              <h2 className="text-[40px] sm:text-[40px] md:text-[55px] lg:text-[55px] leading-[1.4] sm:leading-[48px] md:leading-[1.4] lg:leading-[1.4] font-bold text-left pb-[70px] sm:pb-[70px] md:pb-[50px] lg:pb-[50px] pt-[100px] sm:pt-[100px] md:pt-[61.12px] lg:pt-[61.12px]">
                Overview of the Digital Rights Dashboard
              </h2>
              <h2 className="text-[30px] sm:text-[px] md:text-[24px] lg:text-[24px] leading-[1.4] text-left pb-[30px] sm:pb-[30px] md:pb-[35px] lg:pb-[35px] tracking-normal">Objectives</h2>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                The Digital Development Compass (DDC) is constructed based on
                the{" "}
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
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                The <b>Digital Rights Dashboard (DRD)</b> attempts to share
                insights and measure the performance of countries on the extent
                to which they have been able to incorporate digital rights
                effectively into their overall digital strategy. It is an
                additional component of the Digital Development Compass and uses
                the same methodology.
              </p>
              <p className="">
                The framework represented in the Digital Rights Dashboard is the
                result of an extensive review of international law and relevant
                literature published by international organizations, civil
                society, governments, academia and the private sector. Like the
                Digital Development Compass, it relies on publicly available
                data to assess the performance of countries on specific digital
                rights. The Digital Rights Dashboard is designed as an entry
                point or a conversation starter and should not be interpreted as
                an authoritative final judgment regarding the performance of any
                country either on a specific right or on digital rights as a
                whole.
              </p>
              <h2 className="text-[30px] sm:text-[px] md:text-[24px] lg:text-[24px] leading-[1.4] text-left pb-[30px] sm:pb-[30px] md:pb-[35px] lg:pb-[35px] pt-[100px] sm:pt-[100px] md:pt-[28px] lg:pt-[28px] tracking-normal">Four Rights</h2>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                For the purpose of the Digital Rights Dashboard, we are
                measuring four rights:
              </p>
              <h2 className="text-[30px] sm:text-[px] md:text-[24px] lg:text-[24px] leading-[1.4] text-left pb-[30px] sm:pb-[30px] md:pb-[35px] lg:pb-[35px] pt-[100px] sm:pt-[100px] md:pt-[28px] lg:pt-[28px] tracking-normal">
                <b>1. Right to Freedom of Speech and Expression </b>
              </h2>
              <p>
                Definition from <b>ICCPR Art. 19 (2):</b> This right shall
                include freedom to seek, receive and impart information and
                ideas of all kinds, regardless of frontiers, either orally, in
                writing or in print, in the form of art, or through any other
                media of his choice.
              </p>
              <h2 className="text-[30px] sm:text-[px] md:text-[24px] lg:text-[24px] leading-[1.4] text-left pb-[30px] sm:pb-[30px] md:pb-[35px] lg:pb-[35px] pt-[100px] sm:pt-[100px] md:pt-[28px] lg:pt-[28px] tracking-normal">
                <b>2. Right to Freedom of Assembly and Association </b>
              </h2>
              <p>
                Everyone shall have the right to freedom of expression; this
                right shall include freedom to seek, receive and impart
                information and ideas of all kinds, regardless of frontiers,
                either orally, in writing or in print, in the form of art, or
                through any other media of his choice <b>(Art. 19 ICCPR) </b>
                This right also covers the "rights to freedom of peaceful
                assembly and association", which are essential components of
                democracy. The right of peaceful assembly includes the right to
                hold meetings, sit-ins, strikes, rallies, events or protests,
                both offline and online.
              </p>
              <p>
                <b>
                  NB: Given the overlap in the indicators measuring these
                  rights, the two rights above will be integrated as the Right
                  to Freedom of Expression, Assembly and Association.
                </b>
              </p>
              <h2 className="text-[30px] sm:text-[px] md:text-[24px] lg:text-[24px] leading-[1.4] text-left pb-[30px] sm:pb-[30px] md:pb-[35px] lg:pb-[35px] pt-[100px] sm:pt-[100px] md:pt-[28px] lg:pt-[28px] tracking-normal">
                <b>3. Right to Equality and Non-Discrimination </b>
              </h2>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">Definition derived from Art. 26 ICCPR</p>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                <i>
                  All persons are equal before the law and are entitled without
                  any discrimination to the equal protection of the law [both
                  online and offline]. In this respect, the law shall prohibit
                  any discrimination and guarantee to all persons equal and
                  effective protection against discrimination on any ground such
                  as race, colour, sex, language, religion, political or other
                  opinion, national or social origin, property, birth or other
                  status.
                </i>
              </p>
              <h2 className="text-[30px] sm:text-[px] md:text-[24px] lg:text-[24px] leading-[1.4] text-left pb-[30px] sm:pb-[30px] md:pb-[35px] lg:pb-[35px] pt-[100px] sm:pt-[100px] md:pt-[28px] lg:pt-[28px] tracking-normal">
                <b>4. Right to Privacy </b>
              </h2>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                <i>
                  Protection of all individuals against arbitrary or unlawful
                  interference with his or her privacy, family, home or
                  correspondence, or unlawful attacks on their honour and
                  reputation.
                </i>
              </p>
              <h2 className="text-[30px] sm:text-[px] md:text-[24px] lg:text-[24px] leading-[1.4] text-left pb-[30px] sm:pb-[30px] md:pb-[35px] lg:pb-[35px] pt-[100px] sm:pt-[100px] md:pt-[28px] lg:pt-[28px] tracking-normal">
                Why did UNDP choose four rights?
              </h2>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                UNDP recognizes that there are other important digital rights in
                International Human Rights Law (IHRL) such as the right to
                freedom of religion, right to work, and right to housing. After
                considering factors such as data availability and the bandwidth
                to meaningfully create and update the Digital Rights Dashboard
                we decided nevertheless to narrow down to the four
                aforementioned rights bearing in mind that the Digital
                Development Compass is designed as an entry-point or
                conversation starter for countries to conduct their own
                evaluations.
              </p>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                The four rights we chose have been recognized across United
                Nations resolutions, General Comments, and reports as being
                integral to the protection and empowerment of individuals online
                and can cumulatively provide an assessment of each country's
                performance on digital rights as a whole. For example, the
                assessment of the right to equality and non-discrimination has
                been recognized as{" "}
                <a
                  href="https://global.oup.com/academic/product/an-international-bill-of-the-rights-of-man-9780199667826"
                  className="url-styling"
                  target="_blank"
                >
                  "the most fundamental of the rights"
                </a>{" "}
                speaks to the range of international human rights instruments
                that deal with specific forms of discrimination such as{" "}
                <a
                  href="https://www.un.org/womenwatch/daw/cedaw/cedaw.htm#:~:text=French%2C%20Russian%20%2C%20Spanish-,The%20Convention%20on%20the%20Elimination%20of%20All%20Forms%20of%20Discrimination,bill%20of%20rights%20for%20women."
                  className="url-styling"
                  target="_blank"
                >
                  Convention on the Elimination of All Forms of Discrimination
                  Against Women,
                </a>{" "}
                <a
                  href="https://www.ohchr.org/sites/default/files/cerd.pdf"
                  className="url-styling"
                  target="_blank"
                >
                  International Convention on the Elimination of Racial
                  Discrimination,
                </a>{" "}
                <a
                  href="https://www.un.org/development/desa/indigenouspeoples/wp-content/uploads/sites/19/2018/11/UNDRIP_E_web.pdf"
                  className="url-styling"
                  target="_blank"
                >
                  United Nations Declaration on the Rights of Indigenous Peoples
                </a>{" "}
                and{" "}
                <a
                  href="https://www.un.org/womenwatch/daw/cedaw/cedaw.htm#:~:text=French%2C%20Russian%20%2C%20Spanish-,The%20Convention%20on%20the%20Elimination%20of%20All%20Forms%20of%20Discrimination,bill%20of%20rights%20for%20women."
                  className="url-styling"
                  target="_blank"
                >
                  Convention on the Rights of Persons with Disabilities.
                </a>{" "}
              </p>
              <h2 className="text-[40px] sm:text-[40px] md:text-[55px] lg:text-[55px] leading-[1.4] sm:leading-[48px] md:leading-[1.4] lg:leading-[1.4] font-bold text-left pb-[70px] sm:pb-[70px] md:pb-[50px] lg:pb-[50px] pt-[100px] sm:pt-[100px] md:pt-[61.12px] lg:pt-[61.12px]">
                Measuring Digital Development
              </h2>
              <h2 className="text-[30px] sm:text-[px] md:text-[24px] lg:text-[24px] leading-[1.4] text-left pb-[30px] sm:pb-[30px] md:pb-[35px] lg:pb-[35px] tracking-normal">
                Stages of Rights Fulfilment
              </h2>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                In the Digital Development Compass, each country's digital
                readiness is assessed across five stages of digital development,
                which encompass every pillar and sub-pillar. Each of the five
                stages corresponds to a score from 0 to 5. The Digital
                Development Dashboard applies the same process to construct
                stages of Rights Fulfilment. The corresponding stages and scores
                are shown in the table below:
              </p>
              <h2 className="text-[30px] sm:text-[px] md:text-[24px] lg:text-[24px] leading-[1.4] text-left pb-[30px] sm:pb-[30px] md:pb-[35px] lg:pb-[35px] pt-[100px] sm:pt-[100px] md:pt-[28px] lg:pt-[28px] tracking-normal">Overall stages</h2>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                The five stages correspond to the five stages of the Digital
                Development Compass. Each stage has a definition that broadly
                corresponds to the performance on digital rights by member
                countries. Essentially, the stage gives a "bird's eye-view" of
                the state's overall performance. Specific indicators provide a
                more concrete assessment. To precisely see how a country can
                move from one stage to the next, scores on specific indicators
                should be evaluated and improved upon.
              </p>

              <PillarsTable />
              <p className="text-[30px] sm:text-[px] md:text-[24px] lg:text-[24px] leading-[1.4] text-left pb-[30px] sm:pb-[30px] md:pb-[35px] lg:pb-[35px] pt-[100px] sm:pt-[100px] md:pt-[28px] lg:pt-[28px] tracking-normal">
                <b>Freedom of Expression</b>
              </p>
              <FeTable />
              <p className="text-[30px] sm:text-[px] md:text-[24px] lg:text-[24px] leading-[1.4] text-left pb-[30px] sm:pb-[30px] md:pb-[35px] lg:pb-[35px] pt-[100px] sm:pt-[100px] md:pt-[28px] lg:pt-[28px] tracking-normal">
                <b>Right to equality and non-discrimination online</b>
              </p>
              <RendTable />
              <p className="text-[30px] sm:text-[px] md:text-[24px] lg:text-[24px] leading-[1.4] text-left lg:pb-[35px] pt-[100px] sm:pt-[100px] md:pt-[28px] lg:pt-[28px] pb-[30px] sm:pb-[30px] md:pb-[35px] lg:pb-[35px] tracking-normal">
                <b>Right to privacy online</b>
              </p>
              <ReTable />
              <h2 className="text-[40px] sm:text-[40px] md:text-[55px] lg:text-[55px] leading-[1.4] sm:leading-[48px] md:leading-[1.4] lg:leading-[1.4] font-bold text-left pb-[70px] sm:pb-[70px] md:pb-[50px] lg:pb-[50px] sm:pt-[100px] md:pt-[61.12px] lg:pt-[61.12px]">
                Digital Rights Score Methodology
              </h2>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                Given that the Digital Rights Dashboard is a subset of the Digital Development Compass, it follows the same overarching 
                {" "}<a
                  href="https://digitaldevelopmentcompass.undp.org/methodology"
                  className="url-styling"
                  target="_blank"
                >
                 methodology{" "}
                </a>.The DDC currently includes 145 indicators, identified through extensive desk research into publicly available 
                data across the sub-pillars and pillars of the Digital Development Framework.
              </p>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                An Expert Committee, a globally representative group of specialists in digital development, 
                was established to guide this process. The Expert Committee's role is to support the continuous 
                evolution of the Digital Development Compass, ensuring that the methodology remains relevant and 
                adaptive over time. Through a series of advisory consultations, the Expert Committee helped 
                develop data evaluation criteria to assess the quality and reliability of all indicators, both 
                existing and newly proposed. Indicators that do not meet these standards are excluded from the Compass.
              </p>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                While the DRD draws on the DDC's foundation, not all 145 indicators were relevant or necessary to 
                incorporate into the DRD. In some cases, key indicators specific to digital rights were missing. 
                To address these gaps, UNDP compiled an additional public database to supplement the existing framework.
                While the DRD draws on the DDC's foundation, not all 145 indicators were relevant or necessary to 
                incorporate into the DRD. In some cases, key indicators specific to digital rights were missing. 
                To address these gaps, UNDP compiled an 
                {" "}<a
                  href="https://data.undp.org/insights/drdfoundations"
                  className="url-styling"
                  target="_blank"
                >
                 additional public database{" "}
                </a>to supplement the existing framework.
              </p>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                Using shortlisted indicators, the DRD produces a composite view of a country's digital 
                rights landscape. During the research phase, it was observed that the Right to Freedom of Expression 
                and the Right to Freedom of Assembly and Association often share overlapping indicators. 
                These were therefore merged into a single pillar. The resulting structure of the DRD is organized 
                around four main pillars:  
              </p>
              <ol className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                <li className="pb-[8px] sm:pb-[8px] md:pb-[16px] lg:pb-[16px]">1.{" "}Right to Freedom of Expression and Right to Assembly and Association</li>
                <li className="pb-[8px] sm:pb-[8px] md:pb-[16px] lg:pb-[16px]">2.Right to Equality and Non-Discrimination </li>
                <li className="pb-[8px] sm:pb-[8px] md:pb-[16px] lg:pb-[16px]">3.Right to Privacy  </li>
                <li className="pb-[8px] sm:pb-[8px] md:pb-[16px] lg:pb-[16px]">4.Cross-Cutting Indicators - foundational elements such as digital infrastructure 
                  and literacy that enable the fulfillment of all rights online. These are indicators 
                  that are  common to all rights being measured and serve as indicators of the enabling 
                  environment for digital rights more generally. 
                </li>
              </ol>
              <h2 className="text-[30px] sm:text-[px] md:text-[24px] lg:text-[24px] leading-[1.4] text-left pb-[30px] sm:pb-[30px] md:pb-[35px] lg:pb-[35px] tracking-normal">
                Indicator Selection
              </h2>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                Based on the relevant
                {" "}<a
                  href="https://www.ohchr.org/sites/default/files/Documents/Publications/Human_rights_indicators_en.pdf"
                  className="url-styling"
                  target="_blank"
                >
                guidance
                </a>
                , the DRD uses two types of indicators
              </p>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                1.{" "}
                <i>
                  Structural Indicators:
                </i>{" "}
                Structural indicators help capturing the acceptance, intent and commitment of the 
                State to undertake measures in keeping with its human rights obligations, 
                including whether the country is a state party to human rights treaties and 
                conventions and has put in place legislation to protect digital rights.
              </p>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                2.{" "}
                <i>
                  Process Indicators:
                </i>{" "}
                Process indicators measure duty bearers’ ongoing efforts to transform their human rights 
                commitments into the desired results. Unlike structural indicators, this involves 
                indicators that continuously assess the policies and specific measures taken by the 
                duty bearer to implement its commitments on the ground.
              </p>  
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                While several indicators in the DRD are specific to digital rights, many reflect the broader 
                protection of human rights in general terms, without distinguishing whether those rights are 
                safeguarded online or offline. In this sense, the protection of a right offline is a necessary 
                but not sufficient condition for its protection in the digital sphere. 
              </p>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                For example, a country may constitutionally guarantee the right to privacy, suggesting that 
                privacy is legally protected. However, without complementary legislation or policies—such as 
                data protection laws or safeguards against government surveillance—this protection may not 
                extend effectively to the online environment. Conversely, it is rare for a country to have 
                detailed regulations on online privacy, such as restrictions on surveillance, without first 
                recognizing the general right to privacy in its legal framework. 
              </p>

              <h2 className="text-[30px] sm:text-[px] md:text-[24px] lg:text-[24px] leading-[1.4] text-left pb-[30px] sm:pb-[30px] md:pb-[35px] lg:pb-[35px] tracking-normal">
                Sources
              </h2>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                Sources used to score these indicators fall into two categories (please see Appendix for a full list of all indicators): 
              </p>
              
              <p className="pb-[8px] sm:pb-[8px] md:pb-[16px] lg:pb-[16px]">
                 1.{" "}<i>External quantitative sources used for other Digital Development Compass indicators:</i> These DRD indicators drawn directly from the DDC databases
              </p>
              <p className="pb-[8px] sm:pb-[8px] md:pb-[16px] lg:pb-[16px]">
                2.{" "}
                <i>
                  <a
                  href="https://data.undp.org/insights/drdfoundations?check_logged_in=1"
                  className="url-styling"
                  target="_blank"
                >
                 Internal database:{" "}</a></i>{" "}
                   The Digital Rights Foundations Database was compiled through a two-step process, 
                   combining Artificial-Intelligence assisted structured data extraction using large 
                   language models (Chat GPT, Gemini and DeepSeek) and reconfirmed with expert human verification.
                
              </p> 

              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                For more information on this process, please see 
                {" "}<a
                  href="https://data.undp.org/insights/drdfoundations"
                  className="url-styling"
                  target="_blank"
                >
                 here.</a>
              </p>
              <h2 className="text-[30px] sm:text-[px] md:text-[24px] lg:text-[24px] leading-[1.4] text-left pb-[30px] sm:pb-[30px] md:pb-[35px] lg:pb-[35px] tracking-normal">
                Scoring
              </h2>
               <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                To ensure comparability across indicators and countries, all data was standardized through a 
                consistent scoring process. Structural and process indicators are expressed through different 
                data types — some as quantitative measures and others as categorical values — 
                and are scored accordingly using the normalization methods described below. 
              </p>
              <h2 className="text-[30px] sm:text-[px] md:text-[24px] lg:text-[24px] leading-[1.4] text-left pb-[30px] sm:pb-[30px] md:pb-[35px] lg:pb-[35px] tracking-normal">
                Quantitative Indicators
              </h2>
               <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                Quantitative indicators use numerical data — for example, internet penetration rate (% of population online). 
                They are normalized using Min–Max rescaling to a standardized 0–1 range, where 1 represents the highest 
                country score and 0 the lowest. 
              </p>
              <h2 className="text-[30px] sm:text-[px] md:text-[24px] lg:text-[24px] leading-[1.4] text-left pb-[30px] sm:pb-[30px] md:pb-[35px] lg:pb-[35px] tracking-normal">
                Categorical Indicators
              </h2>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                Categorical indicators convert qualitative data into numerical values — for example, data protection 
                law status (0 = no law, 0.5 = draft law, 1 = enacted law). These values are linearly rescaled and then 
                normalized using Min–Max normalization to a 0–1 range, ensuring consistency and comparability across indicators.  
              </p>
              <h2 className="text-[30px] sm:text-[px] md:text-[24px] lg:text-[24px] leading-[1.4] text-left pb-[30px] sm:pb-[30px] md:pb-[35px] lg:pb-[35px] tracking-normal">
                Weighting
              </h2>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                All indicators in the DRD are weighted equally. This approach reflects the principle, grounded in 
                international human rights law and jurisprudence, that no single human right is more important 
                than another, and that all rights—and the different types of indicators used to measure them—should be accorded equal importance.  
              </p>
              <h2 className="text-[30px] sm:text-[px] md:text-[24px] lg:text-[24px] leading-[1.4] text-left pb-[30px] sm:pb-[30px] md:pb-[35px] lg:pb-[35px] tracking-normal">
                Limitations
              </h2>     
              
                <UnorderedListItems listData={[
                    <span>Some indicator selection criteria—particularly the requirement that data be available for more than 70% (approximately 135) of the 193 UN Member States—limited the inclusion of certain high-quality regional datasets39. As a result, some valuable regional databases could not be incorporated into the overall DRD. Nonetheless, users are encouraged to undertake their own research to contextualize DRD findings with more localized or region-specific data sources.</span>,
                    <span>Most indicators in the DRD (20 out of 27) are structural indicators, reflecting the availability and feasibility of data collection. Consequently, the DRD provides more insight into countries’ acceptance, intent, and commitment to fulfilling digital rights obligations, rather than the extent to which these commitments are being translated into tangible results. The mere existence of a law or policy is therefore a necessary but not sufficient condition for the respect and protection of digital rights.</span>,
                    <span>As with the Digital Development Compass, the DRD verifies the methodology of any external source before incorporating its data. However, inclusion of a source in the DRD does not imply endorsement of the data it contains. Any identified discrepancies should be reported directly to the entity hosting the original database.</span>,
                    <span>The indicators included in the DRD are technology-neutral—they do not assess specific technologies (e.g., Artificial Intelligence) or use cases (e.g., technology deployment in policing). Instead, the DRD serves as an entry point for understanding how national systems enable or constrain the protection and fulfillment of digital rights regardless of the kind of technology being deployed (AI, quantum computing) or application (social media, digital ID, government services  and so on).</span>,
                    <span>It is important to note that, unless a suitable data source explicitly evaluates it, the DRD does not assess the quality of legislation - whether a law is drafted precisely or comprehensively enough to meet international human rights standards. Nor does it capture the frequency or severity of violations of such legislation in practice.</span>,
                    <span>in UNDP’s Internal Digital Rights Database, which spans all 147 UNDP programme countries, some data gaps remain. UNDP welcomes inputs from experts in academia, civil society, industry, and government to help improve data accuracy and coverage. Any corrections or clarifications can be shared at <a href="mailto:digital.support@undp.org">digital.support@undp.org</a>.</span>
                ]} />
              <h2 className="text-[30px] sm:text-[px] md:text-[24px] lg:text-[24px] leading-[1.4] text-left pb-[30px] sm:pb-[30px] md:pb-[35px] lg:pb-[35px] tracking-normal">
                Stages
              </h2>  
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                The DRD generates a composite score that reflects a country’s overall status in protecting and fulfilling digital rights. Each of the four pillars comprises a set of 
                indicators that correspond to specific stages of digital rights protection and fulfilment.The DRD follows the same progressive, five-stage maturity scale as the DDC 
                and DRA, which has been piloted in multiple contexts and reviewed by experts, confirming its usefulness as a practical 
                framework for providing an overview of countries’ progress. The overall stage of a country in the DRD has been calculated 
                by simply adding up the scores for all four pillars and then dividing by 4. The stages, as defined for each of the four 
                rights, are as follows:   
              </p> 
              <h2 className="text-[30px] sm:text-[px] md:text-[24px] lg:text-[24px] leading-[1.4] text-left pb-[30px] sm:pb-[30px] md:pb-[35px] lg:pb-[35px] pt-[100px] sm:pt-[100px] md:pt-[28px] lg:pt-[28px] tracking-normal">
                Overall Stages of the DRD
              </h2>

              <OverallStageTable/>
              
              
              <h2 className="sm:pt-[100px] md:pt-[61.12px] lg:pt-[61.12px] text-[40px] sm:text-[40px] md:text-[55px] lg:text-[55px] leading-[1.4] sm:leading-[48px] md:leading-[1.4] lg:leading-[1.4] font-bold text-left pb-[70px] sm:pb-[70px] md:pb-[50px] lg:pb-[50px] sm:text-left md:text-left">
                Disclaimer
              </h2>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                The Digital Rights Dashboard, maintained by the United Nations
                Development Programme (UNDP), aggregates publicly available data
                on digital development. However, UNDP does not verify the
                accuracy or endorse the legitimacy of these data sources.
                Therefore, any information presented on the Digital Rights
                Dashboard should not be considered as verified or endorsed by
                UNDP.
              </p>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                We recognize that the application and compliance with rights is
                context-specific and complex. Any numerical score is not bound
                to account for the entire picture within any given jurisdiction.
                Further, there is always the possibility of bias on part of the
                entity/individual compiling or aggregating a certain dataset.
                While we have endeavoured to provide reliable information, we
                emphasize that decisions or judgments should not be made solely
                on the basis of a score on the Digital Rights Dashboard.
              </p>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                It is important to note that the Digital Rights Dashboard should
                not be utilized as a statistical tool. Relying solely on the
                data presented on the Digital Rights Dashboard for statistical
                analysis or decision-making purposes is strongly discouraged.
                Any decisions made, actions taken, or consequences that arise
                from such decisions are the sole responsibility of the
                individuals or entities involved. UNDP will not be held liable
                or responsible for any damages or losses incurred as a result of
                decisions made based on the information provided on the Digital
                Rights Dashboard.
              </p>
              <p>
                Users of the Digital Rights Dashboard are advised to exercise
                their own judgment, conduct independent research, and consult
                other reliable sources to obtain accurate and verified
                information before making any decisions or taking any actions.
                By accessing and using the Digital Development Compass, you
                acknowledge and agree to the terms of this disclaimer.
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-[48px] pb-[46px]">
          <button
            onClick={handleScrollToTop}
            className="bg-brand-blue-dark border-2 border-brand-blue-dark hover:bg-brand-blue-dark/90 px-4 py-2 text-md font-bold uppercase tracking-wide text-white flex-shrink-0 flex items-center"
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
        <tbody style={{ backgroundColor: "#f3f4f6" }}>
          {pillarsTableData.map((item, index) => (
            <tr key={index}>
              <td
                className="px-4 py-2 border border-gray-300 align-top text-left font-bold"
                width={80}
              >
                {item.number}
              </td>
              <td className="px-4 py-2 border border-gray-300 align-top text-left font-bold">
                {item.stage}
              </td>
              <td className="px-4 py-2 border border-gray-300 align-top text-left">
                {item.definition}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export function FeTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <tbody style={{ backgroundColor: "#f3f4f6" }}>
          {feTableData.map((item, index) => (
            <tr key={index}>
              <td
                className="px-4 py-2 border border-gray-300 align-top text-left font-bold"
                width={80}
              >
                {item.number}
              </td>
              <td className="px-4 py-2 border border-gray-300 align-top text-left font-bold">
                {item.stage}
              </td>
              <td className="px-4 py-2 border border-gray-300 align-top text-left">
                {item.definition}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export function RendTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <tbody style={{ backgroundColor: "#f3f4f6" }}>
          {rendTableData.map((item, index) => (
            <tr key={index}>
              <td
                className="px-4 py-2 border border-gray-300 align-top text-left font-bold"
                width={80}
              >
                {item.number}
              </td>
              <td className="px-4 py-2 border border-gray-300 align-top text-left font-bold">
                {item.stage}
              </td>
              <td className="px-4 py-2 border border-gray-300 align-top text-left">
                {item.definition}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export function ReTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <tbody style={{ backgroundColor: "#f3f4f6" }}>
          {rpTableData.map((item, index) => (
            <tr key={index}>
              <td
                className="px-4 py-2 border border-gray-300 align-top text-left font-bold"
                width={80}
              >
                {item.number}
              </td>
              <td className="px-4 py-2 border border-gray-300 align-top text-left font-bold">
                {item.stage}
              </td>
              <td className="px-4 py-2 border border-gray-300 align-top text-left">
                {item.definition}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function OverallStageTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <tbody style={{ backgroundColor: "#f3f4f6" }}>
          {overallStagesTableData.map((item, index) => (
            <tr key={index}>
              <td
                className="px-4 py-2 border border-gray-300 align-top text-left font-bold"
                width={80}
              >
                {item.number}
              </td>
              <td className="px-4 py-2 border border-gray-300 align-top text-left font-bold">
                {item.stage}
              </td>
              <td className="px-4 py-2 border border-gray-300 align-top text-left">
                {item.definition}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function UnorderedListItems({listData = []}:{listData:React.ReactNode[]}) {
  return (
      <ul className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px] list-disc ml-5">
          {listData.map((item,index) => (
            <li key={index} className="pb-[8px] sm:pb-[8px] md:pb-[16px] lg:pb-[16px]">
              {item} 
            </li>
          ))}
      </ul>)
}

export function OrderedListItems({listData = []}:{listData:React.ReactNode[]}) {
  return (
      <ol className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px] list-decimal">
          {listData.map((item,index) => (
            <li key={index} className="pb-[8px] sm:pb-[8px] md:pb-[16px] lg:pb-[16px]">
              {item} 
            </li>
          ))}
      </ol>)
}
