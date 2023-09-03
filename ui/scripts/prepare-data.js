const fs = require("fs");
const path = require("path");
const csvtojson = require("csvtojson");
const _ = require("lodash");
const { getStage, roundNumber, stageNames } = require("./utils");

const RAW_DATABASE_DIR = path.join(__dirname, "..", "database", "raw");

const DEFINITIONS_FILE = path.join(RAW_DATABASE_DIR, "definitions.csv");
const BOUNDING_BOXES_FILE = path.join(RAW_DATABASE_DIR, "bounding-boxes.json");
const GEOJSON_FILE = path.join(RAW_DATABASE_DIR, "country-geojson.json");
const COUNTRIES_FILE = path.join(RAW_DATABASE_DIR, "countries-manifest.csv");
const SCORES_FILE = path.join(RAW_DATABASE_DIR, "scores.csv");
const LATLON_FILE = path.join(RAW_DATABASE_DIR, "latlon.json");
 
// Used to trim down what we pass down to the client
const COUNTRY_PROPERTIES = [
  "Country or Area",
  "ISO-alpha3 Code",
  "ISO-alpha2 Code",
  "Region Name",
  "Sub-region Name",
  "World Bank Income Level",
];

async function main() {
  const boundingBoxes = require(BOUNDING_BOXES_FILE);
  const geojson = require(GEOJSON_FILE);
  const definitions = await csvtojson().fromFile(DEFINITIONS_FILE);
  const countries = await csvtojson().fromFile(COUNTRIES_FILE);
  const scores = await csvtojson({
    colParser: {
      data_availability: (d) => (Number.isFinite(+d) ? +d : null),
    },
  }).fromFile(SCORES_FILE);

  const latlon = require(LATLON_FILE);

  const pillarNames = [
    "Overall",
    "Foundations",
    "Infrastructure",
    "Government",
    "Regulation",
    "Business",
    "People",
    "Strategy",
  ];

  // A map of pillar name to subpillar name.
  // {
  //   "Business": ["name-of-supillar"]
  // }
  const pillarMap = pillarNames.reduce((acc, pillar) => {
    acc[pillar] = _.uniq(
      definitions
        .filter((definition) => definition["Pillar"] === pillar)
        .map((d) => d["Sub-Pillar"])
        .filter(Boolean)
    );
    return acc;
  }, {});

  function getStageInfo(value = 0, pillar, subpillar) {
    if (value === null) return;
    const stage = getStage(value);
    const stageName = stageNames[stage - 1];
    const definition =
      definitions.find(
        (d) =>
          d["Pillar"] === pillar &&
          (!subpillar || d["Sub-Pillar"] === subpillar)
      ) || "";
    const stageInfo = definition[stageName];
    if (!stageInfo) return null;
    return {
      number: stage,
      name: stageName,
      description: stageInfo,
    };
  }

  function getPillarRank(name, pillar) {
    let match = scores.find((score) => {
      return (
        score["Country Name"] === name &&
        score["Pillar"] === pillar &&
        !score["Sub-Pillar"]
      );
    });

    return match && match["rank"] ? match["rank"] : null;
  }

  function getSubpillarRank(name, pillar, subpillar) {
    let match = scores.find((score) => {
      return (
        score["Country Name"] === name &&
        score["Pillar"] === pillar &&
        score["Sub-Pillar"] === subpillar
      );
    });

    return match && match["rank"] ? match["rank"] : null;
  }

  function getPillarScore(country, pillar) {
    let match = scores.find((score) => {
      return (
        score["Country Name"] === country &&
        score["Pillar"] === pillar &&
        !score["Sub-Pillar"]
      );
    });

    return match && match["new_rank_score"] ? match["new_rank_score"] : null;
  }

  function getSubpillarScore(country, pillar, subpillar) {
    let match = scores.find((score) => {
      return (
        score["Country Name"] === country &&
        score["Pillar"] === pillar &&
        score["Sub-Pillar"] === subpillar &&
        // Probably unnecessary, but helps clarify where the score is coming from
        !Boolean(score["Indicator"])
      );
    });

    return match && match["new_rank_score"] ? match["new_rank_score"] : null;
  }

  function getPillarConfidence(country, pillar) {
    let match = scores.find((score) => {
      return score["Country Name"] === country && score["Pillar"] === pillar;
    });

    return match ? match["data_availability"] : null;
  }

  function getSubpillarConfidence(country, subpillar) {
    let match = scores.find((score) => {
      return (
        score["Country Name"] === country && score["Sub-Pillar"] === subpillar
      );
    });

    return match ? match["data_availability"] : null;
  }

  function getOverallScore(country) {
    let match = scores.find((score) => {
      return (
        score["Country Name"] === country &&
        !Boolean(score["Sub-Pillar"]) &&
        !Boolean(score["Pillar"])
      );
    });

    return match ? match["new_rank_score"] : null;
  }

  function getOverallRank(name) {
    const allPillarScores = scores
      .filter((score) => !score["Pillar"] && score["Sub-Pillar"])
      .sort((a, b) => parseFloat(b["Score"]) - parseFloat(a["Score"]));

    return (
      allPillarScores.findIndex((score) => score["Country or Area"] === name) +
      1
    );
  }

  function getOverallStage(value) {
    if (value === null) return;
    const stage = getStage(value);
    const stageName = stageNames[stage - 1];
    const definition =
      definitions.find((d) => !d["Pillar"] && !d["Sub-Pillar"]) || "";
    const stageInfo = definition[stageName];
    if (!stageInfo) return null;
    return {
      number: stage,
      name: stageName,
      description: stageInfo,
    };
  }

  const getOverallConfidence = (country) => {
    let match = scores.find((score) => {
      return (
        score["Country Name"] === country &&
        !Boolean(score["Sub-Pillar"]) &&
        !Boolean(score["Pillar"])
      );
    });

    return match ? match["data_availability"] : null;
  };

  const countriesWithScoresStagesAndRanks = countries.map((country) => {
    let countryName = country["Country or Area"];
    let baseScores = pillarNames
      .filter((p) => p !== "Overall")
      .reduce((acc, next) => {
        let score = getPillarScore(countryName, next);
        let confidence = getPillarConfidence(countryName, next);
        let rank = getPillarRank(countryName, next);
        //let multivariable = getUniqueSubpillarCount(countryName, next); 
        //let divisionVariable = countUniqueSubpillars(next);
        //let dividedRank = score * multivariable;        
        //let final_score = dividedRank / divisionVariable ;
        acc[next] = {
          rank,
          score: roundNumber(parseFloat(score), 2),
          confidence: roundNumber(parseFloat(confidence), 2),
          stage: getStageInfo(score, next) || null,
          ...pillarMap[next].reduce((subAcc, sp) => {
            let score = getSubpillarScore(countryName, next, sp);
            let confidence = getSubpillarConfidence(countryName, sp);
            let stage = getStageInfo(score, next, sp);

            subAcc[sp] = {
              rank: getSubpillarRank(country["Country or Area"], next, sp),
              score: roundNumber(parseFloat(score), 2),
              confidence: roundNumber(parseFloat(confidence), 2),
              stage: stage || null,
            };

            return subAcc;
          }, {}),
        };
        return acc;
      }, {});

    const overallScore = roundNumber(getOverallScore(countryName) || null);

    let latlonMatch = latlon.find((datum) => {
      return datum.alpha2 === country["ISO-alpha2 Code"];
    });

    return {
      ..._.pick(country, COUNTRY_PROPERTIES),
      longitude: latlonMatch ? latlonMatch.longitude : null,
      latitude: latlonMatch ? latlonMatch.latitude : null,
      unMember: country["UN Member States"] == "x",
      sids: country["Small Island Developing States (SIDS)"] === "x",
      lldc: country["Land Locked Developing Countries (LLDC)"] === "x",
      ldc: country["Least Developed Countries (LDC)"] === "x",
      scores: {
        ...baseScores,
        Overall: {
          score: overallScore,
          confidence: getOverallConfidence(countryName) || null,
          stage: getOverallStage(overallScore) || null,
          rank: getOverallRank(countryName),
        },
      },
    };
  });

  const db = {
    definitions,
    boundingBoxes,
    countries: countriesWithScoresStagesAndRanks,
    geojson,
    scores,
  }; 
  // Used to more easily access the pillar data in the frontend.
  const ancillary = `export default {
    pillars: ${JSON.stringify(pillarMap)},
    pillarNames: ${JSON.stringify(Object.keys(pillarMap))},
  } as const`;

  let processedDir = path.join(__dirname, "..", "database", "processed");
  fs.mkdirSync(processedDir, { recursive: true });
  fs.writeFileSync(path.join(processedDir, "db.json"), JSON.stringify(db));
  fs.writeFileSync(path.join(processedDir, "ancillary.ts"), ancillary);
}

main();
