import ancillaryData from "./processed/ancillary";

export const ancillary = ancillaryData;

export type Pillar = keyof typeof ancillary.pillars;
