// Hiding Comparision
// import { CountryComparisons } from "components/country-comparisons";
import Layout from "components/Layout";
import { Pillars } from "components/pillar";
import { RelatedCountryList } from "components/related-country-list";
import { ScoreRing } from "components/score-ring";
import { Toggle } from "components/toggle";
import { db } from "database";
import { ancillary } from "database/ancillary";
import { Country, Definition } from "database/processed/db";
import { isMemberState } from "lib";
import { GetStaticPaths, GetStaticProps } from "next";
import Error from "next/error";
import { useState } from "react";
import Link from "next/link";
//import { IndicatorList } from "components/indicator-list";

type Props = {
  layoutCountries: {
    name: string;
    alpha3: string;
    alpha2: string;
  }[];
  country: Country;
  statusCode?: number;
  definitions: Definition[];
  relatedCountries: Array<
    Pick<
      Country,
      "ISO-alpha3 Code" | "ISO-alpha2 Code" | "scores" | "Country or Area"
    >
  >;
};

const StaticPropsDetail = ({
  layoutCountries,
  country,
  statusCode,
  relatedCountries,
  definitions,
}: Props) => {
  const [showMissingIndicators, setShowMissingIndicators] = useState(false);
  const [showIndicators, setShowIndicators] = useState(true);
  const [showRawScores, setShowRawScores] = useState(false);
  const [showSources, setShowSources] = useState(false);

  if (statusCode) {
    return <Error statusCode={statusCode} />;
  }
  return (
    <Layout countries={layoutCountries} title={country["Country or Area"]}>
      <section className="pt-8 border-b pb-8" id="country-meta">
        <div className="container px-4 mx-auto text-center">
          <div className="mb-10 text-center">
            <div className="mb-2">
              <span
                className={`fp fp-lg ${country[
                  "ISO-alpha2 Code"
                ].toLowerCase()}`}
              ></span>
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-medium tracking-tight leading-0">
                {country["Country or Area"]}
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                {country["Region Name"]} | {country["Sub-region Name"]}
              </p>
            </div>
          </div>
          <ScoreRing pillars={ancillary.pillars} country={country} />
        </div>
      </section>
      <section id="pillars" className="my-16 relative">
        {/* Web */}
      <div className="hidden md:block lg:block mx-auto max-w-7xl px-8 sticky top-0 z-10">
          <div className="w-full bg-white flex items-center justify-between py-4">
            <h2 className="text-2xl leading-7 sm:leading-9 text-gray-900">
              Pillar scores
            </h2>
            <div className="flex items-center gap-4">
              <Toggle
                id="toggle-indicators"
                label="Indicators"
                enabled={showIndicators}
                onChange={setShowIndicators}
              />
              {<Toggle
                disabled={!showIndicators}
                id="toggle-missing-indicators"
                label="Missing indicators"
                enabled={showMissingIndicators}
                onChange={setShowMissingIndicators}
              /> }
              <Toggle
                id="toggle-raw-scores"
                disabled={!showIndicators}
                label="Source values"
                enabled={showRawScores}
                onChange={setShowRawScores}
              />
              <Toggle
                id="toggle-sources"
                disabled={!showIndicators}
                label="Sources"
                enabled={showSources}
                onChange={setShowSources}
              />
              <Link href="/disclaimer">
                  <a className="ml-1 select-none text-sm text-blue-300">
                  Disclaimer
                  </a>
              </Link>
            </div>
          </div>
        </div>
        {/* mobile responsive */}
        <div className="md:hidden lg:hidden mx-auto max-w-7xl px-7 sticky top-0 z-10">
          <div className="w-full bg-white space-x-5 flex items-center py-4 pl-2">
            <h2 className="md:hidden text-2xl leading-7 md:text-3xl md:leading-9 text-gray-900">
              Pillar scores
            </h2>
            <Link href="/disclaimer">
                  <a className="md:hidden ml-1 select-none text-sm text-blue-300">
                  Disclaimer
                  </a>
            </Link>
          </div>
          <div className="w-full bg-white sm:grid sm:grid-cols-2 sm:gap-x-auto md:flex lg:flex items-center gap-4 pb-2 pl-2 rounded-b-lg">
              <Toggle
                disabled={!showIndicators}
                id="toggle-missing-indicators"
                label="Missing indicators"
                enabled={showMissingIndicators}
                onChange={setShowMissingIndicators}
              />
              <Toggle
                id="toggle-indicators"
                label="Indicators"
                enabled={showIndicators}
                onChange={setShowIndicators}
              />
              <Toggle
                id="toggle-raw-scores"
                disabled={!showIndicators}
                label="Source values"
                enabled={showRawScores}
                onChange={setShowRawScores}
              />
              <Toggle 
                id="toggle-sources"
                disabled={!showIndicators}
                label="Sources"
                enabled={showSources}
                onChange={setShowSources}
              />          
          </div>         
        </div>


        <div className="mx-auto max-w-[90rem] px-6 mb-40">
          <div className="py-8">
            <Pillars
              country={country}
              isShowingRawScores={showRawScores}
              showIndicators={showIndicators}
              showMissingIndicators={showMissingIndicators}
              showSources={showSources}
            />
          </div>
        </div>
      </section>
{/* Hiding Comparision */}
      {/* <section className="mx-auto max-w-6xl px-8 my-16">
        <CountryComparisons
          pillars={ancillary.pillars}
          country={country}
          relatedCountries={relatedCountries}
        />
      </section> */}

      <section className="mx-auto max-w-6xl px-8 my-16">
        <RelatedCountryList
          currentCountryId={country["ISO-alpha3 Code"]}
          countries={relatedCountries}
          definitions={definitions}
        />
      </section>
    </Layout>
  );
};

export default StaticPropsDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = db.countries
    .filter((c) => Boolean(c["ISO-alpha3 Code"]))
    .filter(isMemberState)
    .map((datum) => ({
      params: { code: datum["ISO-alpha3 Code"] },
    }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const code = params?.code;

  if (!code) {
    return {
      props: {
        statusCode: 404,
      },
    };
  }

  const match = db.countries.find((datum) => datum["ISO-alpha3 Code"] === code);

  if (!match) {
    return {
      props: {
        statusCode: 404,
      },
    };
  } else {
    const layoutCountries = db.countries
      .filter((c) => c.unMember)
      .map((country) => {
        return {
          name: country["Country or Area"],
          alpha2: country["ISO-alpha2 Code"],
          alpha3: country["ISO-alpha3 Code"],
        };
      });

    const getCenter = (countryCode: string) => {
      // @ts-ignore
      const bbox = db.boundingBoxes[countryCode];
      if (!bbox) return null;
      return [(bbox.ne.lon + bbox.sw.lon) / 2, (bbox.ne.lat + bbox.sw.lat) / 2];
    };

    const getDistance = (countryCode: string, countryCode2: string) => {
      const center1 = getCenter(countryCode);
      const center2 = getCenter(countryCode2);
      if (!center1 || !center2) return 10000;
      return Math.sqrt(
        Math.pow(center1[0] - center2[0], 2) +
          Math.pow(center1[1] - center2[1], 2)
      );
    };

    const getRelatedCountries = (countryCode: string) => {
      const country = db.countries.find(
        (d) => d["ISO-alpha3 Code"] === countryCode
      );
      if (!country) return [];
      let related = db.countries
        .filter((c) => c.unMember)
        .filter(
          (d) =>
            d["Sub-region Name"] === country["Sub-region Name"] &&
            d["ISO-alpha3 Code"] !== countryCode
        );
      if (related.length < 5) {
        related = db.countries
          .filter((c) => c.unMember)
          .filter(
            (d) =>
              d["Region Name"] === country["Region Name"] &&
              d["ISO-alpha3 Code"] !== countryCode
          );
      }
      return related.sort(
        (a, b) =>
          getDistance(countryCode, a["ISO-alpha3 Code"]) -
          getDistance(countryCode, b["ISO-alpha3 Code"])
      );
    };

    const relatedCountries = getRelatedCountries(code as string);
    return {
      props: {
        layoutCountries,
        // Include the detail country itself for related data.
        relatedCountries: [match, ...relatedCountries],
        country: match,
        definitions: db.definitions,
      },
    };
  }
};
