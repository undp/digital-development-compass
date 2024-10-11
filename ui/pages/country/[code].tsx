import { useState } from "react";
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
import Link from "next/link";
import DigitalRightScoreRing from "components/digital-right-score-ring";
import { DigitalRightsPillars } from "components/digitalRightPillar";
import { RiArrowRightDownLine } from "react-icons/ri";

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

const NavBar = ({ country }: any) => {
  const countryUrl = `/country/${country["ISO-alpha3 Code"]}`;
  return (
    <nav className="flex items-center justify-start p-4 text-[11.44px] [line-height:12.87px] font-bold sm:text-sm md:text-[11.44px]">
      <Link href="/">
        <a className="mr-4 [color:#000000] hover:text-red-500 uppercase">Home</a>
      </Link>
      <span className="[color:#D12800]">/</span>
      <Link href={countryUrl}>
        <a className="ml-4 w-44 [color:#D12800] text-left uppercase">
          {country["Country or Area"]}
        </a>
      </Link>
    </nav>
  );
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
  const handleScroll = (e: any) => {
    e.preventDefault(); // Prevent default anchor link behavior
    const targetId = e.currentTarget.getAttribute("href").slice(1); // Extract the target ID from the href attribute
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <Layout countries={layoutCountries} title={country["Country or Area"]}>
      <section className="pt-8 border-b pb-3" id="country-meta">
        <div className=" sm:px-4 sm:mx-auto sm:text-center md:pl-[115px]">
        <NavBar country={country} />
        </div>
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
              <h1 className="text-4xl lg:text-5xl font-medium tracking-tight leading-0"
              style={{ fontFamily: "SohneBreitFont, sans-serif" }}
              >
                {country["Country or Area"]}
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                {country["Region Name"]} | {country["Sub-region Name"]}
              </p>
            </div>
          </div>
          <ScoreRing pillars={ancillary.pillars} country={country} type={'data'} />
        </div>
        <div className="hidden md:block lg:block relative">
          {country.digitalRightDataAvailable && process.env.SITE_CONFIG === "dev" ? (
            <div className="absolute bottom-0 right-20 ">
              <a
                href="#country-meta-dr"
                onClick={handleScroll}
                style={{ textDecoration: "none" }}
                className="bg-white border-2 font-semibold border-brand-blue-dark hover:bg-brand-blue-dark hover:text-white px-2 py-1 text-xs uppercase tracking-wide text-brand-blue-dark flex-shrink-0 flex items-center md:px-4 md:py-2 md:text-sm lg:px-6 lg:py-3 lg:text-base"
              >
                <span>JUMP TO DIGITAL RIGHTS DASHBOARD</span>
                <RiArrowRightDownLine className="text-base ml-2 md:text-lg lg:text-xl" />
              </a>
            </div>
          ) : (
            ""
          )}
        </div>
      </section>
      <div className="relative flex items-center justify-center md:hidden lg:hidden">
        {(country.digitalRightDataAvailable && process.env.SITE_CONFIG === "dev" ) && (
          <div className="text-center">
            <a
              href="#country-meta-dr"
              onClick={handleScroll}
              className="bg-white border-2 border-brand-blue-dark hover:bg-brand-blue-dark hover:text-white px-4 py-2 text-sm uppercase tracking-wide text-brand-blue-dark flex items-center justify-center md:px-6 md:py-3 md:text-base lg:px-8 lg:py-4 lg:text-lg font-semibold no-underline"
            >
              <span>JUMP TO DIGITAL RIGHTS DASHBOARD</span>
              <RiArrowRightDownLine className="text-lg ml-2 md:text-xl lg:text-2xl" />
            </a>
          </div>
        )}
      </div>
      <section id="pillars-dr" className="my-16 relative">
        {/* Web */}
        <div className="hidden md:block lg:block mx-auto max-w-[90rem] px-6 sticky top-0 z-10">
          <div className="w-full bg-white flex items-center justify-between py-4 pr-24">
            <h2 className="text-2xl font-bold leading-5 sm:leading-9 text-gray-900 pl-20">
              Pillar scores
            </h2>
            <div className="flex items-center gap-4">
              <Toggle
                id="toggle-indicators"
                label="Indicators"
                enabled={showIndicators}
                onChange={setShowIndicators}
              />
              {
                <Toggle
                  disabled={!showIndicators}
                  id="toggle-missing-indicators"
                  label="Imputed data"
                  enabled={showMissingIndicators}
                  onChange={setShowMissingIndicators}
                />
              }
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
                <a className="ml-1 select-none text-sm url-styling">
                  Disclaimer
                </a>
              </Link>
            </div>
          </div>
        </div>
        {/* mobile responsive */}
        <div className="md:hidden lg:hidden mx-auto max-w-[90rem] px-7 sticky top-0 z-10">
          <div className="w-full bg-white space-x-5 flex items-center py-4 pl-2">
            <h2 className="md:hidden text-2xl font-bold leading-7 md:text-3xl md:leading-9 text-gray-900">
              Pillar scores
            </h2>
            <Link href="/disclaimer">
              <a className="md:hidden ml-1 select-none text-sm url-styling">
                Disclaimer
              </a>
            </Link>
          </div>
          <div className="w-full bg-white sm:grid sm:grid-cols-2 sm:gap-x-auto md:flex lg:flex items-center gap-4 pb-2 pl-2 rounded-b-lg">
            <Toggle
              disabled={!showIndicators}
              id="toggle-missing-indicators"
              label="Imputed data"
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
        {/* digital right dashboard section */}
        {(country.digitalRightDataAvailable && process.env.SITE_CONFIG === "dev" ) ? (
          <section
            className="pt-20 border-b pb-8"
            style={{ backgroundColor: "#EDEFF0" }}
            id="country-meta-dr"
          >
            <div className="container px-4 mx-auto text-center">
              <div className="mb-10 text-center">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold mt-3 mb-6 sm:text-center md:text-center">
                    Digital Rights Dashboard
                  </h1>
                </div>
              </div>
              <DigitalRightScoreRing
                pillars={ancillary.digitalRightPillarName}
                country={country}
              />
            </div>
            <div className="mx-auto max-w-[90rem] px-6 mb-40">
              <div className="py-8">
                <DigitalRightsPillars
                  country={country}
                  isShowingRawScores={showRawScores}
                  showIndicators={showIndicators}
                  showMissingIndicators={showMissingIndicators}
                  showSources={showSources}
                />
              </div>
            </div>
          </section>
        ) : (
          ""
        )}
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
