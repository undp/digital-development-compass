import { db } from "database";
import { groupBy } from "lodash";
import { InferGetStaticPropsType } from "next";
import Script from "next/script";
import { isMemberState} from "lib";

import Layout from "components/Layout";
export default function disclaimer(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const {countries } = props;

  return (
    <Layout title="Disclaimer" countries = {countries} >
      
      <div className="py-16">
        <div className="container px-4 mx-auto">
          <div className="text-lg flex flex-col items-center">
           <div className="max-w-[40em] text-center py-10 text-lg">
                <h2 className="text-3xl font-bold mt-7 mb-3 text-brand-blue-dark" >
                Disclaimer
                </h2>
             </div>
             <div className="max-w-[40em] space-y-9 text-justify"> 
              
              <p>
              The Digital Development Compass, maintained by the United Nations Development Programme (UNDP), 
              aggregates publicly available data on digital development. However, UNDP does not verify the accuracy or
               endorse the legitimacy of these data sources. Therefore, any information presented on the Digital Development 
               Compass should not be considered as verified or endorsed by UNDP.
              </p>
              <p>
              It is important to note that the Digital Development Compass should not be utilized as a statistical tool. 
              Due to the aforementioned lack of verification and endorsement, relying solely on the data presented on the 
              Digital Development Compass for statistical analysis or decision-making purposes is strongly discouraged.
              </p>
              <p>
              UNDP emphasizes that decisions should not be made solely based on the statistical accuracy of the data presented on 
              the Digital Development Compass. Any decisions made, actions taken, or consequences that arise from such decisions are the 
              sole responsibility of the individuals or entities involved. UNDP will not be held liable or responsible for any damages or losses 
              incurred as a result of decisions made based on the information provided on the Digital Development Compass. 
              </p>
              <p>
              Users of the Digital Development Compass are advised to exercise their own judgment, conduct independent research, and consult other 
              reliable sources to obtain accurate and verified information before making any decisions or taking any actions.
              By accessing and using the Digital Development Compass, you acknowledge and agree to the terms of this disclaimer. 
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
