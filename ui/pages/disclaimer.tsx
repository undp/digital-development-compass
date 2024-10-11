import { db } from "database";
import { groupBy } from "lodash";
import { InferGetStaticPropsType } from "next";
import Script from "next/script";
import { isMemberState } from "lib";

import Layout from "components/Layout";
export default function disclaimer(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { countries } = props;

  return (
    <Layout title="Disclaimer" countries={countries}>
      <div className="pb-[70px] mx-0 sm:mx-3 md:mx-0 lg:mx-0 disclaimer-position">
        <div className="max-w-[1050px] mx-auto">
          <div className="text-left">
            <div>
              <h2 className="text-[40px] sm:text-[40px] md:text-[55px] lg:text-[55px] leading-[50px] font-bold pb-[70px] sm:pb-[70px] md:pb-[50px] lg:pb-[50px] pt-[100px] sm:pt-[100px] md:pt-[61.12px] lg:pt-[61.12px]  hero-content-text-color">
                Disclaimer
              </h2>
            </div>
          </div>
          <div className="flex flex-col items-center font-normal text-[16px] sm:text-[16px]  md:text-[20px] lg:text-[20px] leading-[1.4]">
            <div className="text-left">
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                The Digital Development Compass, maintained by the United
                Nations Development Programme (UNDP), aggregates publicly
                available data on digital development. However, UNDP does not
                verify the accuracy or endorse the legitimacy of these data
                sources. Therefore, any information presented on the Digital
                Development Compass should not be considered as verified or
                endorsed by UNDP.
              </p>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                It is important to note that the Digital Development Compass
                should not be utilized as a statistical tool. Due to the
                aforementioned lack of verification and endorsement, relying
                solely on the data presented on the Digital Development Compass
                for statistical analysis or decision-making purposes is strongly
                discouraged.
              </p>
              <p className="pb-[12px] sm:pb-[12px] md:pb-[35px] lg:pb-[35px]">
                UNDP emphasizes that decisions should not be made solely based
                on the statistical accuracy of the data presented on the Digital
                Development Compass. Any decisions made, actions taken, or
                consequences that arise from such decisions are the sole
                responsibility of the individuals or entities involved. UNDP
                will not be held liable or responsible for any damages or losses
                incurred as a result of decisions made based on the information
                provided on the Digital Development Compass.
              </p>
              <p>
                Users of the Digital Development Compass are advised to exercise
                their own judgment, conduct independent research, and consult
                other reliable sources to obtain accurate and verified
                information before making any decisions or taking any actions.
                By accessing and using the Digital Development Compass, you
                acknowledge and agree to the terms of this disclaimer.
              </p>
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
