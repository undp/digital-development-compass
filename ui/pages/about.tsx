import { InferGetStaticPropsType } from "next";
import { db } from "database";
import Layout from "components/Layout";
import { groupBy } from "lodash";
import { pillarColorMap, stageNames } from "lib";
import Icons from "components/icons";
import { Definition } from "database/processed/db";
import { useState } from "react";
import { interpolateHclLong, scaleLinear } from "d3";
import { AnimatePresence, motion } from "framer-motion";

interface Dictionary<T> {
  [Key: string]: T;
}
type Definitions = Dictionary<Definition[]>

export default function About(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { definitions, countries } = props;
  const pillars = Object.keys(definitions);

  return (
    <Layout title="About" countries={countries}>
      <div className="py-16">
        <div className="container px-4 mx-auto">
          <div className="text-lg flex flex-col items-center text-center">
            <p className="max-w-[40em]">
              The Digital Transformation Framework helps stakeholders align on the key elements of inclusive digital transformation. The framework allows these actors to identify, structure, and prioritize efforts. The Framework can be adapted to fit many contexts, including country offices and HQ teams.
            </p>
            <p className="max-w-[40em] mt-5">
              The Digital Transformation Framework is split into {numberWords[pillars.length]} pillars:
            </p>
            <div className="flex flex-wrap">
              {pillars.map((pillar) => (
                <a
                  href={`#${pillar}`}
                  key={pillar}
                  className="inline-flex text-sm text-white font-medium uppercase tracking-widest py-[0.3em] px-[1.2em] m-1 rounded-full z-10"
                  style={{
                    backgroundColor: pillarColorMap[pillar]?.base
                  }}
                >
                  {pillar}
                </a>
              ))}
            </div>
            <p className="max-w-[40em] mt-5">
              On this site, you can see what stage each country is on for each pillar and their subpillars.
            </p>
          </div>
          <TablePillars
            pillars={pillars}
            definitions={definitions}
          />
          <MobilePillars
            pillars={pillars}
            definitions={definitions}
          />
        </div>
      </div>
    </Layout >
  );
}


const TablePillars = ({ pillars, definitions }: {
  pillars: string[],
  definitions: Definitions
}) => {
  return (
    <div className="container px-4 mx-auto mt-20 hidden lg:block">
      <div className={`${gridClassName} mt-8 sticky top-0 bg-white z-10 border-b pb-3`}>
        <div className="p-2 font-semibold text-lg mt-auto">
          Stages of Digital Readiness
        </div>
        {stageNames.map((stage, index) => (
          <div key={stage} className="p-5 pb-2 text-lg font-semibold flex flex-col justify-end">
            <div className="text-gray-500 flex-shrink-0 tracking-wider uppercase font-medium text-sm">
              Stage {index + 1}.
            </div>
            {stage}
          </div>
        ))}
      </div>

      {pillars.map((pillar) => {
        const defs = definitions[pillar];
        // @ts-ignore
        return (
          <TablePillar
            key={pillar}
            pillar={pillar}
            definitions={defs}
          />
        )
      })}
    </div>
  )
}

const gridClassName = "grid grid-cols-[1.3fr,1fr,1fr,1fr,1fr,1fr]"

const TablePillar = ({
  pillar,
  definitions
}: {
  pillar: string,
  definitions: Definition[]
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const pillarColors = pillarColorMap[pillar];
  const pillarColor = pillarColors?.base || 'black';
  const pillarColorScale = scaleLinear<string>()
    .domain([0, 6])
    .range([pillarColors.triple[1], pillarColors.triple[2]])
    .interpolate(interpolateHclLong)
    .clamp(true);
  let pillarIcon = Icons[pillar.toLowerCase() as keyof typeof Icons];
  const overall = definitions[0]

  return (
    <div className={gridClassName} key={pillar}>
      <div className="p-5">
        <div className={`flex items-center self-start font-semibold text-xl mt-10`} style={{
          color: pillarColor
        }}>
          <div className="text-2xl w-[1.5em]">
            {pillarIcon}
          </div>
          {pillar}
        </div>
        <button onClick={() => setIsExpanded(d => !d)} className="mt-0 p-2 ml-8 underline text-slate-500 text-sm">
          {isExpanded ? "Hide" : "Show"} {definitions.length - 1} subpillars
        </button>
      </div>
      {
        stageNames.map((stageName, stageIndex) => (
          <div
            className={`group p-4 text-gray-700 relative group-hover:bg-slate-5000  ${!0 ? " mt-10" : ""}`}
            style={{
              "--color": pillarColorScale(stageIndex)
            } as React.CSSProperties}
            key={`${stageName}-${0}`}
          >
            <div className="absolute inset-0 bottom-auto right-auto w-0 left-4 h-1 group-hover:w-20 transition-all" style={{
              background: pillarColorScale(stageIndex)
            }} />
            {/* @ts-ignore */}
            {overall[stageName] || ""}
          </div>
        ))
      }
      <AnimatePresence>
        {definitions.length === 1 ? null :
          definitions.map((d, definitionIndex) => {
            if (!isExpanded && d["Sub-Pillar"]) return null
            if (!d["Sub-Pillar"]) return null
            return (
              <motion.div className={`${gridClassName} col-span-6`} key={definitionIndex}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.6, delay: definitionIndex * 0.2 }}>
                <div
                  className={`p-2 col-start-1 pl-14 font-semibold ${!definitionIndex ? "mt-10" : ""}`}
                  style={{
                    color: pillarColor
                  }}
                  key={`name-${definitionIndex}`}
                >
                  {d["Sub-Pillar"] || "Overall"}
                </div>
                {
                  stageNames.map((stageName, stageIndex) => (
                    <div
                      className={`group p-4 text-gray-700 relative group-hover:bg-slate-5000  ${!definitionIndex ? " mt-10" : ""}`}
                      style={{
                        "--color": pillarColorScale(stageIndex)
                      } as React.CSSProperties}
                      key={`${stageName}-${definitionIndex}`}
                    >
                      <div className="absolute inset-0 bottom-auto right-auto w-0 left-4 h-1 group-hover:w-20 transition-all" style={{
                        background: pillarColorScale(stageIndex)
                      }} />
                      {/* @ts-ignore */}
                      {d[stageName] || ""}
                    </div>
                  ))
                }
              </motion.div>
            )

          })
        }
      </AnimatePresence>

    </div>
  )
}


const MobilePillars = ({ pillars, definitions }: {
  pillars: string[],
  definitions: Dictionary<Definition[]>
}) => {

  return (
    <div className="max-w-3xl mx-auto mt-20 lg:hidden">
      {pillars.map((name) => {
        const defs = definitions[name];
        const pillarColor = pillarColorMap[name]?.base || "black";
        // @ts-ignore
        let pillarIcon = Icons[name.toLowerCase()];

        return (
          <section id={name} className="py-6 first:pt-0 mt-20" key={name}>
            <div className="text-center">
              <div
                className="text-4xl inline-block mx-auto -mb-3"
                style={{ color: pillarColor }}
              >
                {pillarIcon}
              </div>
            </div>
            <div className="text-center mt-1 sticky top-0 pt-3 mb-3 pb-3 z-10 bg-white">
              <h2
                style={{ background: pillarColor }}
                className="inline-flex text-md text-white font-medium uppercase tracking-widest py-[0.3em] px-[1.2em] rounded-full"
              >
                {name}
              </h2>
              <div
                aria-hidden="true"
                className="w-full absolute flex items-center inset-0"
              >
                <div
                  style={{ background: pillarColor }}
                  className="h-px w-full -z-10"
                ></div>
              </div>
            </div>
            {defs.length === 1 ? null : (
              <div className="space-y-6">
                {defs.map((d, i) => {
                  return (
                    <div key={i} className="flex md:flex-row flex-col">
                      <div className="sticky top-10 flex-none self-start w-full md:w-80">
                        <h3 className="text-xl text-gray-700 mt-2 bg-white pb-2 pt-1 w-full md:w-auto">
                          {d["Sub-Pillar"] || "Overall"}
                        </h3>
                      </div>
                      <dl className="mt-4 space-y-3">
                        {stageNames.map((stageName, index) => (
                          <div className="">
                            <dt className="text-gray-500 flex-shrink-0 tracking-wider uppercase font-medium text-sm mb-3">
                              Stage {index + 1}. {stageName}
                            </dt>
                            <dd className="text-gray-700">
                              {/* @ts-ignore */}
                              {d[stageName] || ""}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        );
      })}
    </div>
  )
}

export const getStaticProps = async () => {
  const countries = db.countries.map((country) => {
    return {
      name: country["Country or Area"],
      alpha2: country["ISO-alpha2 Code"],
      alpha3: country["ISO-alpha3 Code"],
    };
  });

  const groupedDefinitions = groupBy(db.definitions, "Pillar");

  // For some reason, one of the definition keys is an empty string.
  // Let's remove it.
  delete groupedDefinitions[""];

  const pillars = db.definitions

  return {
    props: {
      definitions: groupedDefinitions,
      countries,
      pillars,
    },
  };
};

const numberWords = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];