import { interpolateLab, scaleLinear } from "d3";
import { Pillar } from "database/ancillary";
import ancillary from "database/processed/ancillary";
import type { BoundingBox, Country } from "database/processed/db";
import flattenDeep from "lodash/flattenDeep";

export interface PillarColorMap {
  [key: string]: {
    base: string;
    triple: string[];
  };
}

// export const pillarColorMap: PillarColorMap = {
//   Overall: {
//     base: "#6366f1",
//     triple: ["#FFF", "#a2e0f5", "#6366f1"],
//   },
//   // "Digital Public Infrastructure": {
//   //   base: "#FD6925",
//   //   triple: ["#FFF", "#ffc1a4", "#FD6925"],
//   // },
//   // Connectivity: {
//   //   base: "#517Ce8",
//   //   triple: ["#FFF", "#a2e0f5", "#517Ce8"],
//   // },
//   // Government: {
//   //   base: "#19486A",
//   //   triple: ["#FFF", "#5c8eb2", "#19486A"],
//   // },
//   // Regulation: {
//   //   base: "#00689D",
//   //   triple: ["#FFF", "#5595b6", "#00689D"],
//   // },
//   // Economy: {
//   //   base: "#dD9700",
//   //   triple: ["#FFF", "#fff566", "#eDa700"],
//   // },
//   // People: {
//   //   base: "#FD9D24",
//   //   triple: ["#fff", "#f8c584", "#f49f34"],
//   // },
// };

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
      .range(ancillary.pillarColorMap[next].triple || [])
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
