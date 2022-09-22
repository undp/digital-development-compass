import { interpolateLab, scaleLinear } from "d3";
import { Pillar } from "database/ancillary";
import ancillary from "database/processed/ancillary";
import type { BoundingBox, Country } from "database/processed/db";
import flattenDeep from "lodash/flattenDeep";

interface PillarColorMap {
  [key: string]: {
    base: string;
    triple: string[];
  };
}

export const pillarColorMap: PillarColorMap = {
  Overall: {
    base: "#6366f1",
    triple: ["#FFF", "#a2e0f5", "#6366f1"],
  },
  Foundations: {
    base: "#DE1568",
    triple: ["#FFF", "#ffab8a", "#DE1568"],
  },
  Infrastructure: {
    base: "#517Ce8",
    triple: ["#FFF", "#a2e0f5", "#517Ce8"],
  },
  Government: {
    base: "#57C22B",
    triple: ["#FFF", "#e7ff87", "#02965d"],
  },
  Regulation: {
    base: "#FE6825",
    triple: ["#FFF", "#ffd796", "#ed4b00"],
  },
  Business: {
    base: "#dD9700",
    triple: ["#FFF", "#fff566", "#eDa700"],
  },
  People: {
    base: "#16aDd3",
    triple: ["#FFF", "#9ebcf7", "#0d88e0"],
  },
  Strategy: {
    base: "#14b8a6",
    triple: ["#FFF", "#a2e0f5", "#14b8a6"],
  },
};

export function convertBboxToLatLng(bbox: BoundingBox) {
  return [
    (bbox.ne.lon + bbox.sw.lon) / 2,
    bbox.ne.lat + (bbox.sw.lat - bbox.ne.lat) * 0.3,
  ];
}

export function getBoundingBoxFromGeometry(geometry: any) {
  const coordinates = flattenDeep(geometry.geometry.coordinates);
  const xs = coordinates.filter((_, i) => i % 2) as number[];
  const ys = coordinates.filter((_, i) => i % 2 === 0) as number[];
  return {
    ne: { lat: Math.max(...xs), lon: Math.max(...ys) },
    sw: { lat: Math.min(...xs), lon: Math.min(...ys) },
  };
}

type PillarsScale = Record<Pillar, any>;
export function makePillarsScale(pillars: typeof ancillary.pillarNames) {
  return pillars.reduce<PillarsScale>((acc, next) => {
    acc[next] = scaleLinear<string>()
      .domain([0, 2.5, 5])
      .range(pillarColorMap[next].triple || [])
      .interpolate(interpolateLab);
    return acc;
    // @ts-ignore
  }, {});
}

export const stageNames = [
  "Basic",
  "Opportunistic",
  "Systematic",
  "Differentiating",
  "Transformational",
];

export function roundNumber(num: number | null, decimals: number = 2) {
  if (!num) return null;
  return Math.round(num * 10 ** decimals) / 10 ** decimals;
}

export function getOrdinal(n: number) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

export function isMemberState<T extends Country>(country: T) {
  return country["unMember"] || country["ISO-alpha3 Code"] === "XKK";
}
