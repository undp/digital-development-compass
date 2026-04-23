import { db } from "database";
import { groupBy } from "lodash";
import { InferGetStaticPropsType } from "next";
import { isMemberState } from "lib";
// import githubUNDPdiagram from "../../public/undp-diagram.png";
// import overviewofTDTF from "../../public/OverviewofTDTF.png";
// import fiveStage from "../../public/fiveStage.png";
// import transformation from "../../public/transformation.png";
// import MinMaxScale from "../../public/MinMaxScale.png";
import Layout from "components/Layout";
import Link from "next/link";
import React from "react";
import { StageDescriptionText } from "components/stage-list";
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
    <Layout title="Methodology | UNDP Digital Rights Dashboard" countries={countries} description="Learn how the Digital Rights Dashboard measures and assesses nations' capabilities in safeguarding human rights online—freedom of speech, assembly, privacy, and equality—using evidence-based scoring and a cross-cutting supportive indicators methodology">
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
                What is the Digital Rights Dashboard?
              </h2>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                Building on the foundation of the Digital Development Compass (DDC), the Digital Rights Dashboard (DRD) offers a more targeted perspective on how countries are progressing in protecting human rights online. While the DDC provides a broad overview of digital development, the DRD focuses specifically on how well countries safeguard four fundamental digital rights: freedom of opinion and expression, freedom of assembly and association, the right to equality and non-discrimination, and the right to privacy. In addition, the DRD also includes a set of cross-cutting indicators which measure foundational elements and form part of the enabling environment for digital rights overall. The DDC and the DRD are closely linked, sharing several indicators and a consistent methodological framework.
              </p>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                The DRD is not a scoring or evaluative tool but an overview—a starting point for examining how national contexts support or challenge human rights online. Developed through an extensive review of international law, UN documents and resolutions and literature from international organizations, civil society, governments, academia, and the private sector, the DRD aims to initiate informed dialogue on rights-based digital transformation. Its purpose is to support policymakers, practitioners, and other stakeholders in understanding and advancing digital rights. 
              </p>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                The objective is not to create a comprehensive statistical index but to offer an evidence-based overview that situates digital rights within broader national circumstances. Users are encouraged to interpret findings carefully, considering each country’s unique social, cultural, political, and economic context.
              </p>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                The DRD can be used to identify strengths and weaknesses in a country’s digital rights environment; facilitate progress dialogue among stakeholders, including government, civil society and the private sector, by grounding discussions in shared evidence. Moreover, the DRD can be used to support policy development by linking digital rights considerations to national strategies on digital transformation. In some cases, the DRD may reflect a different perspective from the lived experiences and realities because of issues around the actual implementation of specific laws and their application to human rights in the digital space. It is therefore encouraged to use the data in the DRD, in combination with the guidance contained in this report based on Country Insights to make informed policy recommendations.
              </p>
              
              <h2 className="text-[40px] sm:text-[40px] md:text-[55px] lg:text-[55px] leading-[1.4] sm:leading-[48px] md:leading-[1.4] lg:leading-[1.4] font-bold text-left pb-[70px] sm:pb-[70px] md:pb-[50px] lg:pb-[50px] pt-[100px] sm:pt-[100px] md:pt-[61.12px] lg:pt-[61.12px] ">
                Four Rights: Why focus on these four rights?
              </h2>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                Almost all rights in International Human Rights Law (IHRL) are important in their application to the digital space such as the right to freedom of religion, and the right to freedom of employment.  In selecting the four rights to focus on for the DRD in this first phase, two considerations were primary.  These four rights are vital as tenets of inclusive and effective governance and have a direct impact on the exercise of other rights. Furthermore, their selection also reflected key practical considerations, namely, the availability and sustainability of relevant data and the capacity to maintain the DRD over time. Therefore, UNDP chose to focus on the four rights as a starting point —recognizing that the DRD is a tool for countries to further their own understanding of digital rights in their country. UNDP chose to focus on the four rights as a starting point —recognizing that the DRD is a tool for countries to further their own understanding of digital rights in their country.
              </p>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                The four rights chosen are all parts of core international human rights treaties. Additionally, they  have also  been  recognized in United Nations resolutions, General Comments by Treaty Bodies, and UN reports as being specifically integral to digital spaces.i For example, the right to equality and non-discrimination has been recognized as a cross-cutting right across multiple human rights instruments including the  Convention on the Elimination of All Forms of 
                Discrimination Against Women, the {" "}
                <a
                  href="https://www.ohchr.org/sites/default/files/cerd.pdf"
                  className="url-styling"
                  target="_blank"
                >
                  International Convention on the Elimination of Racial Discrimination
                </a>{" "}
                , the {" "}
                 <a
                  href="https://www.un.org/development/desa/indigenouspeoples/wp-content/uploads/sites/19/2018/11/UNDRIP_E_web.pdf"
                  className="url-styling"
                  target="_blank"
                >
                  United Nations Declaration on the Rights of Indigenous Peoples
                </a>{" "}
                 and the  {" "}
                <a
                  href="https://www.un.org/womenwatch/daw/cedaw/cedaw.htm#:~:text=French%2C%20Russian%20%2C%20Spanish-,The%20Convention%20on%20the%20Elimination%20of%20All%20Forms%20of%20Discrimination,bill%20of%20rights%20for%20women."
                  className="url-styling"
                  target="_blank"
                >
                  Convention on the Rights of Persons with Disabilities.
                </a>{" "}
                The {" "} 
                <a
                  href="https://www.un.org/development/desa/indigenouspeoples/wp-content/uploads/sites/19/2018/11/UNDRIP_E_web.pdf"
                  className="url-styling"
                  target="_blank"
                >
                  United Nations Declaration on the Rights of Indigenous Peoples
                </a>{" "}
                 and the {" "}
                <a
                  href="https://www.ohchr.org/en/instruments-mechanisms/instruments/convention-rights-persons-disabilities"
                  className="url-styling"
                  target="_blank"
                >Convention on the Rights of Persons with Disabilities.</a>
              </p>

              <h2 className="text-[40px] sm:text-[40px] md:text-[55px] lg:text-[55px] leading-[1.4] sm:leading-[48px] md:leading-[1.4] lg:leading-[1.4] font-bold text-left pb-[70px] sm:pb-[70px] md:pb-[50px] lg:pb-[50px] pt-[100px] sm:pt-[100px] md:pt-[61.12px] lg:pt-[61.12px] ">
                The Four Rights Explained
              </h2>

              <h2 className="text-[30px] sm:text-[px] md:text-[24px] lg:text-[24px] leading-[1.4] text-left pb-[30px] sm:pb-[30px] md:pb-[35px] lg:pb-[35px] tracking-normal">Right to Freedom of Speech and Expression</h2>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                According to ICCPR article 19 (2) “the right to freedom of speech and expression, shall include freedom to seek, receive and impart information and ideas of all kinds, regardless of frontiers, either orally, in writing or in print, in the form of art, or through any other media of his choice.”.
              </p>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                Applying this right to the digital realm, a General Assembly Resolution calls upon states to refrain from “practices such as the use of Internet shutdowns and online censorship to intentionally prevent or disrupt access to or the dissemination of information.”
              </p>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                Other UN reports and resolutions also: 
              </p>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                Re-iterated that the access to the internet as an enabler of digital rights, including the right to freedom of speech and expressioniii and condemned disruption of internet access to or dissemination of information online.
              </p>
              <UnorderedListItems listData={[
                <span>Urged states to refrain from arbitrary blocking or filtering of online content and,</span>,
                <span>Called upon states to “ensure easy, prompt, effective and practical access to government information of public interest, including online"</span>
              ]}/>

              <h2 className="text-[30px] sm:text-[px] md:text-[24px] lg:text-[24px] leading-[1.4] text-left pb-[30px] sm:pb-[30px] md:pb-[35px] lg:pb-[35px] tracking-normal">Right to Freedom of Assembly and Association</h2>
              
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                Articles 21 and 22 of the ICCPR recognizes the rights to freedom of assembly and association respectively. The right of peaceful assembly includes the right to hold meetings, sit-ins, strikes, rallies, events or protests, both offline and online.
              </p>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                Other UN reports and resolutions also: 
              </p>
              <UnorderedListItems listData={
                [
                  <span>Re-iterated the importance of internet access as an element of assembly and association, being concerned with: ‘undue restrictions preventing Internet users from having access to or disseminating information at key political moments, with an impact on the ability to organize and conduct assemblies’</span>,
                  <span>The need for states to “create and maintain a safe and enabling environment, online and offline, in which civil society can operate independently and free from hindrance, insecurity and reprisals, including by putting in place relevant legislation, policies and practices and ensuring that existing or proposed legislation, policies and practices do not undermine the capacity of civil society to operate independently and free from hindrance”</span>
                ]
              } />
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                As discussed in the methodology section, for the purposes of the DRD, we have merged the pillars on the right to freedom of expression and the right to  freedom of assembly as the indicators for both the rights were the same.  
              </p>

              <h2 className="text-[30px] sm:text-[px] md:text-[24px] lg:text-[24px] leading-[1.4] text-left pb-[30px] sm:pb-[30px] md:pb-[35px] lg:pb-[35px] tracking-normal">Right to Equality and Non-Discrimination</h2>

              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                According to article 26 of the ICCPR, “all persons are equal before the law and are entitled without any discrimination to the equal protection of the law. In this respect, the law shall prohibit any discrimination and guarantee to all persons equal and effective protection against discrimination on any ground such as race, colour, sex, language, religion, political or other opinion, national or social origin, property, birth or other status.” 
              </p>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                In the online space, the right to equality and non-discrimination encourages the "inclusiveness of innovation, especially with regard to local communities, women, persons with disabilities, older persons and youth, and to ensure that the scaling and diffusion of new technologies are inclusive and do not create further divides."
              </p>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                Other UN reports and resolutions also: 
              </p>
              <UnorderedListItems listData={
                [
                  <span>Call upon states to "adopt specific measures to close the gender digital divide and to ensure that particular attention is paid to access, affordability, digital literacy, privacy and online safety, to enhance the use of digital technologies and to mainstream a disability, gender and racial equality perspective in policy decisions and the frameworks that guide them."</span>,
                  <span>Call upon Member States to "adopt specific measures to close the gender digital divide and to ensure that particular attention is paid to access, affordability, digital literacy, privacy and online safety, to enhance the use of digital technologies and to mainstream a disability, gender and racial equality perspective in policy decisions and the frameworks that guide them"</span>
                ]
              } />

              <h2 className="text-[30px] sm:text-[px] md:text-[24px] lg:text-[24px] leading-[1.4] text-left pb-[30px] sm:pb-[30px] md:pb-[35px] lg:pb-[35px] tracking-normal">Right to Privacy</h2>

              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                The right to privacy is a fundamental human right, recognized in article 12 of the Universal Declaration of Human Rights, article 17 of the International Covenant on Civil and Political Rights and in many other international and regional human rights instruments. 
              </p>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                Other UN reports and resolutions also emphasized that:
              </p>
              <UnorderedListItems listData={
                [
                  <span>Online, anonymity "provide[s] individuals and groups with a zone of privacy online to hold opinions and exercise freedom of expression without arbitrary and unlawful interference or attacks."</span>,
                  <span>Accordingly, "technical solutions to secure and protect the confidentiality of digital communications, including [anonymity] measures…, can be important to ensure the enjoyment of human rights."</span>,
                  <span>Furthermore, interference with online communications can take place only on the basis of a law that is well-defined and specifies the precise circumstances under which surveillance may be permitted.</span>
                ]
              } />

              <h2 className="text-[30px] sm:text-[px] md:text-[24px] lg:text-[24px] leading-[1.4] text-left pb-[30px] sm:pb-[30px] md:pb-[35px] lg:pb-[35px] tracking-normal">Cross-Cutting Indicators</h2>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                In addition to measuring the four rights the DRD also considers six cross-cutting indicators. These indicators measure foundational elements which enable the fulfilment of all the four rights online. They are indicators relevant for understanding all four rights and form a part of the enabling environment for digital rights more generally. 
              </p>

              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                These indicators include  
              </p>
               <UnorderedListItems listData={
                [
                  <span><b>Levels of connectivity to the internet </b>needed to “ensure the accessibility, affordability and availability of the Internet in order to bridge digital divides, to achieve the Sustainable Development Goals and to ensure the full enjoyment of human rights”</span>,
                  <span><b>Digital literacy and digital skills,</b> ensuring that the benefits of new and emerging digital technologies are available to all.</span>,
                  <span><b>Ratification of the ICCPR and ICESCR.</b></span>,
                  <span><b>Rule of law</b></span>,
                  <span><b>Voice and Accountability</b> that ensures effective measures to prevent, mitigate and remedy potential and actual adverse human rights impacts in the offline realm and in the case of digital technologies.</span>,
                  <span><b>Accreditation and effectiveness</b> of a National Human Rights Institution (NHRI).</span>
                ]
              } />
             
              <h2 className="text-[40px] sm:text-[40px] md:text-[55px] lg:text-[55px] leading-[1.4] sm:leading-[48px] md:leading-[1.4] lg:leading-[1.4] font-bold text-left pb-[70px] sm:pb-[70px] md:pb-[50px] lg:pb-[50px] sm:pt-[100px] md:pt-[61.12px] lg:pt-[61.12px]">
                Methodology – Approaches and Limitations
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
                To address these gaps, UNDP compiled the 
                {" "}<a
                  href="https://data.undp.org/insights/drdfoundations"
                  className="url-styling"
                  target="_blank"
                >
                 Digital Foundations Database
                </a>{" "} to supplement the existing framework.
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
                    <span>In UNDP’s Internal Digital Rights Database, which spans all 147 UNDP programme countries, some data gaps remain. UNDP welcomes inputs from experts in academia, civil society, industry, and government to help improve data accuracy and coverage. Any corrections or clarifications can be shared at <a href="mailto:digital.support@undp.org">digital.support@undp.org</a>.</span>
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
              
              <p className="pt-[12px] sm:pt-[12px] md:pt-[35px] lg:pt-[35px]">
                For further references and information on the piloting please see the 
                {" "}<a
                  href="https://www.undp.org/publications/undp-digital-rights-dashboard-pilot-country-insights"
                  className="url-styling"
                  target="_blank"
                >
                 DRD Pilot Country Insights.</a>
              </p> 
              
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
              <div className="flex pt-12 pb-12  w-full ">
                <div
                  className="px-[22px] py-6 text-[12px]  max-w-full"
                  style={{ backgroundColor: "#F7F7F7" }}
                >
                <ul className="list-decimal word-wrap break-all">
                  <li>
                    See relevant resolutions of the Commission on Human Rights and the Human Rights Council on the right to
                    freedom of opinion and expression, in particular Council resolutions 20/8 of 5 July 2012, 26/13 of 26 June 2014
                    and 32/13 of 1 July 2016, A/HRC/38/L.10 of on the promotion, protection and enjoyment of human rights on the
                    Internet, and Council resolutions 12/16 of 2 October 2009 on freedom of opinion and expression, 28/16 of 26
                    March 2015 and 34/7 of 23 March 2017 on the right to privacy in the digital age, 23/2 of 13 June 2013 on the role
                    of freedom of opinion and expression in women’s empowerment, and 31/7 of 23 March 2016 on the rights of the
                    child: information and communications technologies and child sexual exploitation, and recalling also General
                    Assembly resolutions 68/167 of 18 December 2013, 69/166 of 18 December 2014 and 71/199 of 19 December
                    2016 on the right to privacy in the digital age, 70/184 of 22 December 2015 on information and communications
                    technologies for development, and 70/125 of 16 December 2015 containing the outcome document of the highlevel meeting of the General Assembly on the overall review of the implementation of the outcomes of the World
                    Summit on the Information Society ; ”Civil society space,” 7 July 2025,A/HRC/RES/59/10;General Comment No
                    25 (2021) on the rights of the child
                  </li>
                  <li>
                    Promotion and protection of human rights: human rights questions, including alternative approaches for
                    improving the effective enjoyment of human rights and fundamental freedoms, A/RES/78/213, 9 December
                    2023,Clause 18
                  </li>
                  <li>
                    The promotion, protection and enjoyment of human rights on the Internet
                    ,13 July 2021, HRC resolution 47/16,Clause 1; and Promotion and protection of the right to freedom of opinion
                    and expression Note by the Secretary-General ,10 August 2011,A/66/290, para. 12
                  </li>
                  <li>
                    The promotion, protection and enjoyment of human rights on the Internet ,18 July 2016,A/HRC/RES/32/13,
                    clause 10
                  </li>
                  <li >
                    Report of the Special Rapporteur on the promotion and protection of the right to freedom of opinion and
                    expression,16 May 2011(HYPERLINK
                    "https://www2.ohchr.org/english/bodies/hrcouncil/docs/17session/A.HRC.17.27_en.pdf"A/HRC/17/27)), Pages
                    29-32
                  </li>
                  <li>
                    Promotion and protection of all human rights, civil, political, economic, social and cultural rights, including
                    the right to development , 14 Jut 2020 (A/HRC/44/L.18/Rev.1),Clause 8(b) (i)
                  </li>
                  <li>
                    General comment No. 37 (2020) on the right of peaceful assembly (article 21) ,17 September
                    2020,CCPR/C/GC/37, Paras 6,10,13,34 
                  </li>
                  <li>
                    The promotion and protection of human rights in the context of peaceful protests, July 6 2018,
                    <a
                      href="https://digitallibrary.un.org/record/1640460?ln=en&v=pdf"
                      className="underline  word-wrap"
                      target="_blank"
                      >
                      A/HRC/RES/38/11.</a>, Preambular clauses, Page 2
                  </li>
                  <li>
                    Civil Society Space,10 July 2025,A/HRC/RES/59/10, Clause 6
                  </li>
                  <li>
                    Promotion and protection of human rights in the context of digital technologies , 22 December
                    2023,A/RES/78/213, Clause 10
                  </li>
                  <li>
                    Ibid
                  </li>
                  <li>
                    Follow-up to paragraph 143 on human security of the 2005 World Summit Outcome ,25 October
                    2012,A/66/290, Clause 11
                  </li>
                  <li>
                    See UNODC Module on Privacy here <a
                      href="https://sherloc.unodc.org/cld/en/education/tertiary/cybercrime/module10/key-issues/privacy-and-security.html"
                      className="underline  word-wrap"
                      target="_blank"
                      >
                      https://sherloc.unodc.org/cld/en/education/tertiary/cybercrime/module10/key-issues/privacy-and-security.html</a>
                  </li>
                  <li>
                    Report of the Special Rapporteur on the promotion and protection of the right to freedom of opinion and
                    expression, 25 October 2012, "https://undocs.org/A/HRC/29/32"A/HRC/29/32, para. 16., para. 16.
                  </li>
                  <li>
                    Promotion and protection of all human rights, civil, political, economic, social and cultural rights, including
                    the right to development, 7 July 2021, A/HRC/47/L.22, page 2 preambulatory clauses
                  </li>
                  <li>
                    The Right to Privacy in the Digital AgemA/HRC/27/37 June 30, 2014, para 24; Bignami, Francesca, Human
                    Rights Extraterritoriality: The Right to Privacy and National Security Surveillance (2018). Francesca Bignami &
                    Giorgio Resta, Human Rights Extraterritoriality:The Right to Privacy and National Security Surveillance in
                    Community Interests Across International Law (Eyal Benvenisti & Georg Nolte,eds., Oxford University Press)
                  </li>
                  <li>
                    Promotion and protection of human rights: human rights questions, including alternative approaches for
                    improving the effective enjoyment of human rights and fundamental freedoms,22 December 2023,
                    A/RES/78/213, Clause 9
                  </li>
                  <li>
                    Ibid, clause 8
                  </li>
                  <li>
                    Ibid,Preambular clauses, page 3
                  </li>
                  <li>
                    See generally, Promotion and protection of human rights: human rights questions, including alternative
                    approaches for improving the effective enjoyment of human rights and fundamental freedoms:National Human
                    RIghts Institutions, 22 December 2023,<a
                      href="https://docs.un.org/A/RES/78/204"
                      className="underline  word-wrap"
                      target="_blank"
                      >
                      A/RES/78/204</a>
                  </li>
                </ul>
                </div>
              </div>
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
      {/* <div
        data-tf-popover="BYPpMpFy"
        data-tf-custom-icon="https://images.typeform.com/images/H59S4N5KfwQY"
        data-tf-button-color="#0445AF"
        data-tf-tooltip="Hi 👋&nbsp;&nbsp;have feedback for us?"
        data-tf-chat
        data-tf-medium="snippet"
        data-tf-hidden="utm_source=xxxxx,utm_medium=xxxxx,utm_campaign=xxxxx,utm_term=xxxxx,utm_content=xxxxx"
        style={{ all: "unset" }}
      ></div>
      <Script src="//embed.typeform.com/next/embed.js"></Script> */}
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
                <StageDescriptionText text={item.definition} />
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
