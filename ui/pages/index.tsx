import { CountryCard } from "components/country-card";
import { GlobeLoader } from "components/globe-loader";
import Layout from "components/Layout";
import { PillarRadioGroup } from "components/pillar-radio-group";
import { db } from "database";
import { Pillar } from "database/ancillary";
import { AnimatePresence, motion } from "framer-motion";
import { isMemberState } from "lib";
import { InferGetStaticPropsType } from "next";
import dynamic from "next/dynamic";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import PopupMessage from "./popupmessage";

const GlobeViz = dynamic(() => import("components/globe-viz"), {
  ssr: false,
  loading: GlobeLoader,
});

function Hero() {
  return (
    <div>
      <h1 className="text-[40px] sm:text-[40px] md:text-[35px] lg:text-[35px] leading-[1.1] font-bold">
        Is your nation ready to navigate digital transformation?
      </h1>
      <p className="text-[16px] sm:text-[16px]  md:text-[20px] lg:text-[20px] leading-7 mt-4 text-left" style={{color: '#333333'}}>
      Explore your nation's digital progress using the world's largest database of digital development data. Leveraging the pillars of UNDP’s Digital Transformation Framework, the Digital Development Compass lets you discover and compare progress across a range of key issues.
      </p>
    </div>
  );
}

const globeVariants = {
  shifted: {
    x: "-20%",
  },
  normal: {
    x: 0,
  },
};

const IndexPage = ({
  countries,
  globeData,
  definitions,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [activeCountryId, setActiveCountryId] = useState<string | null>(null);
  const [pillarFilter, setPillarFilter] = useState<Pillar>("Overall");

  const activeCountry = activeCountryId
    ? globeData.find((c) => c.alpha3 === activeCountryId)
    : null;

  return (
    <Layout countries={countries}>
      <section className="h-full flex flex-col">
      <div className="w-full lg:divide-x grid lg:grid-cols-12 h-full">
      <PopupMessage/>
      <div className="items-center justify-center px-6 py-6 lg:px-12 xl:px-16 col-span-full lg:col-span-5">
            <div className="max-w-2xl flex flex-col justify-center h-full md:mx-auto pt-14">
              <Hero />
              <div className="mt-8 mb-4">
                <PillarRadioGroup
                  value={pillarFilter}
                  onChange={setPillarFilter}
                />
              </div>
            </div>
          </div>
          <div className="col-span-full lg:col-span-7 pb-20 lg:pb-0 overflow-hidden relative bg-gradient-to-r from-blue-50 ">
            <AnimatePresence>
              {activeCountry && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="lg:hidden absolute inset-0 w-full h-full bg-white/40 z-10 backdrop-blur-sm pointer-events-none"
                ></motion.div>
              )}
            </AnimatePresence>
            <motion.div
              className="h-full"
              variants={globeVariants}
              initial={false}
              animate={Boolean(activeCountryId) ? "shifted" : "normal"}
              transition={{
                type: "tween",
                duration: 0.5,
                ease: "easeInOut",
              }}
            >
              <GlobeViz
                pillar={pillarFilter}
                activeCountryId={activeCountryId}
                onChange={(id) => setActiveCountryId(id)}
                data={globeData}
              />
            </motion.div>
            <AnimatePresence>
              {activeCountry && (
                <motion.div
                  key={`${activeCountryId}-${pillarFilter}`}
                  className="absolute lg:bottom-4 lg:max-w-[340px] max-w-[400px] mx-auto lg:mx-[initial] z-20 left-4 lg:left-[initial] right-4 top-4 lg:top-[initial]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex justify-end mb-2">
                    <button
                      onClick={() => setActiveCountryId(null)}
                      className="text-brand-blue flex items-center p-2"
                      aria-label="Close"
                    >
                      <IoClose />
                      <span className="ml-1 uppercase text-xs tracking-widest font-medium">
                        Close
                      </span>
                    </button>
                  </div>

                  <CountryCard
                    pillar={pillarFilter}
                    definitions={definitions}
                    country={activeCountry}
                    showFooterLink
                  ></CountryCard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default IndexPage;

export const getStaticProps = async () => {
  const countries = db.countries.filter(isMemberState).map((country) => {
    return {
      name: country["Country or Area"],
      alpha2: country["ISO-alpha2 Code"],
      alpha3: country["ISO-alpha3 Code"],
    };
  });

  const globeData = db.countries
    // Filter out any countries for which we don't have geojson
    .filter((country) => {
      const geojson = db.geojson.features.find(
        (f) => f.properties.ISO3CD === country["ISO-alpha3 Code"]
      );
      if (!geojson?.geometry?.type) return null;
      return geojson;
    })
    .map((country) => {
      let geojson = db.geojson.features.find(
        (f) => f.properties.ISO3CD === country["ISO-alpha3 Code"]
      );
      return {
        name: country["Country or Area"],
        alpha2: country["ISO-alpha2 Code"],
        alpha3: country["ISO-alpha3 Code"],
        unMember: country["unMember"],
        geojson,
        scores: country.scores,
        latitude: country.latitude,
        longitude: country.longitude,
      };
    });

  return {
    props: {
      countries,
      globeData,
      definitions: db.definitions,
    },
  };
};
