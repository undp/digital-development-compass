// To parse this data:
//
//   import { Convert, DB } from "./file";
//
//   const dB = Convert.toDB(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface DB {
    definitions:   Definition[];
    boundingBoxes: { [key: string]: BoundingBox };
    countries:     Country[];
    geojson:       Geojson;
    indices:       Index[];
    sources:       Source[];
}

export interface BoundingBox {
    sw: Ne;
    ne: Ne;
}

export interface Ne {
    lat: number;
    lon: number;
}

export interface Country {
    "Country or Area":         string;
    "ISO-alpha3 Code":         string;
    "ISO-alpha2 Code":         string;
    "Region Name":             RegionName;
    "Sub-region Name":         string;
    "World Bank Income Level": WorldBankIncomeLevel;
    longitude:                 number | null;
    latitude:                  number | null;
    unMember:                  boolean;
    sids:                      boolean;
    lldc:                      boolean;
    ldc:                       boolean;
    scores:                    Scores;
}

export enum RegionName {
    Africa = "Africa",
    Americas = "Americas",
    Asia = "Asia",
    Empty = "",
    Europe = "Europe",
    Oceania = "Oceania",
}

export enum WorldBankIncomeLevel {
    Empty = "",
    HighIncome = "High Income",
    LowIncome = "Low Income",
    LowerMiddleIncome = "Lower Middle Income",
    UpperMiddleIncome = "Upper Middle Income",
    WorldBankIncomeLevelHighIncome = "High income",
    WorldBankIncomeLevelLowIncome = "Low income",
}

export interface Scores {
    Business:       Business;
    Foundations:    Foundations;
    Government:     Government;
    Infrastructure: Infrastructure;
    People:         People;
    Regulation:     Regulation;
    Strategy:       Strategy;
    Overall:        Overall;
}

export interface Business {
    rank:                   number;
    score:                  number | null;
    confidence:             number | null;
    stage:                  Stage | null;
    "Financing Incentives": Overall;
    "Impact commitments":   Overall;
    "Startup Environment":  Overall;
    "Technology Adoption":  Overall;
}

export interface Overall {
    rank:       number;
    score:      number | null;
    confidence: number | null;
    stage:      Stage | null;
}

export interface Stage {
    number:      number;
    name:        Name;
    description: string;
}

export enum Name {
    Basic = "Basic",
    Differentiating = "Differentiating",
    Opportunistic = "Opportunistic",
    Systematic = "Systematic",
    Transformational = "Transformational",
}

export interface Foundations {
    rank:                     number;
    score:                    number | null;
    confidence:               number | null;
    stage:                    Stage | null;
    "Data Exchange":          Overall;
    "Digital Legal Identity": Overall;
    "Digital Payments":       Overall;
}

export interface Government {
    rank:                          number;
    score:                         number | null;
    confidence:                    null;
    stage:                         Stage | null;
    Capabilities:                  Overall;
    "Digital Public Services":     Overall;
    "Funding and procurement":     Overall;
    "Leadership and coordination": Overall;
    Monitoring:                    Overall;
}

export interface Infrastructure {
    rank:                      number;
    score:                     number | null;
    confidence:                number | null;
    stage:                     Stage | null;
    "Connectivity Technology": Overall;
    "Innovation Ecosystem":    Overall;
}

export interface People {
    rank:                      number;
    score:                     number | null;
    confidence:                number | null;
    stage:                     Stage | null;
    Culture:                   Overall;
    "Digital Literacy Skills": Overall;
    "Digital Wellbeing":       Overall;
    "Usage and ownership":     Overall;
}

export interface Regulation {
    rank:                            number;
    score:                           number | null;
    confidence:                      number | null;
    stage:                           Stage | null;
    Cybersecurity:                   Overall;
    "Data standards and protection": Overall;
    "E-commerce":                    Overall;
    "Ethical Standards":             Overall;
    "Fair Market Competition":       Overall;
}

export interface Strategy {
    rank:       number;
    score:      number | null;
    confidence: number | null;
    stage:      Stage | null;
    Approach:   Overall;
    Ambition:   Overall;
}

export interface Definition {
    Pillar:           Pillar;
    "Sub-Pillar":     SubPillar;
    Definition:       string;
    Basic:            string;
    Opportunistic:    string;
    Systematic:       string;
    Differentiating:  string;
    Transformational: string;
}

export enum Pillar {
    Business = "Business",
    Empty = "",
    Foundations = "Foundations",
    Government = "Government",
    Infrastructure = "Infrastructure",
    People = "People",
    Regulation = "Regulation",
    Strategy = "Strategy",
}

export enum SubPillar {
    Ambition = "Ambition",
    Approach = "Approach",
    Capabilities = "Capabilities",
    ConnectivityTechnology = "Connectivity Technology",
    Culture = "Culture",
    Cybersecurity = "Cybersecurity",
    DataExchange = "Data Exchange",
    DataStandardsAndProtection = "Data standards and protection",
    DigitalLegalIdentity = "Digital Legal Identity",
    DigitalLiteracySkills = "Digital Literacy Skills",
    DigitalPayments = "Digital Payments",
    DigitalPublicServices = "Digital Public Services",
    DigitalWellbeing = "Digital Wellbeing",
    ECommerce = "E-commerce",
    Empty = "",
    EthicalStandards = "Ethical Standards",
    FairMarketCompetition = "Fair Market Competition",
    FinancingIncentives = "Financing Incentives",
    FundingAndProcurement = "Funding and procurement",
    ImpactCommitments = "Impact commitments",
    InnovationEcosystem = "Innovation Ecosystem",
    LeadershipAndCoordination = "Leadership and coordination",
    Monitoring = "Monitoring",
    StartupEnvironment = "Startup Environment",
    TechnologyAdoption = "Technology Adoption",
    UsageAndOwnership = "Usage and ownership",
}

export interface Geojson {
    type:     string;
    features: Feature[];
}

export interface Feature {
    type:       FeatureType;
    geometry:   Geometry | null;
    properties: Properties;
}

export interface Geometry {
    type:        GeometryType;
    coordinates: Array<Array<Array<number[] | number>>>;
}

export enum GeometryType {
    MultiPolygon = "MultiPolygon",
    Polygon = "Polygon",
}

export interface Properties {
    ISO3CD: string;
}

export enum FeatureType {
    Feature = "Feature",
}

export interface Index {
    "Country Name":   string;
    Year:             string;
    Pillar:           Pillar;
    "Sub-Pillar":     SubPillar;
    Indicator:        string;
    data_col:         string;
    new_rank_score:   string;
    higher_is_better: HigherIsBetter;
}

export enum HigherIsBetter {
    False = "False",
    True = "True",
}

export interface Source {
    "Country Name": string;
    Pillar:         Pillar;
    "Sub-Pillar":   SubPillar;
    Indicator:      string;
    "Data Source":  string;
    "Data Link":    string;
    Available:      string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toDB(json: string): DB {
        return cast(JSON.parse(json), r("DB"));
    }

    public static dBToJson(value: DB): string {
        return JSON.stringify(uncast(value, r("DB")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "DB": o([
        { json: "definitions", js: "definitions", typ: a(r("Definition")) },
        { json: "boundingBoxes", js: "boundingBoxes", typ: m(r("BoundingBox")) },
        { json: "countries", js: "countries", typ: a(r("Country")) },
        { json: "geojson", js: "geojson", typ: r("Geojson") },
        { json: "indices", js: "indices", typ: a(r("Index")) },
        { json: "sources", js: "sources", typ: a(r("Source")) },
    ], false),
    "BoundingBox": o([
        { json: "sw", js: "sw", typ: r("Ne") },
        { json: "ne", js: "ne", typ: r("Ne") },
    ], false),
    "Ne": o([
        { json: "lat", js: "lat", typ: 3.14 },
        { json: "lon", js: "lon", typ: 3.14 },
    ], false),
    "Country": o([
        { json: "Country or Area", js: "Country or Area", typ: "" },
        { json: "ISO-alpha3 Code", js: "ISO-alpha3 Code", typ: "" },
        { json: "ISO-alpha2 Code", js: "ISO-alpha2 Code", typ: "" },
        { json: "Region Name", js: "Region Name", typ: r("RegionName") },
        { json: "Sub-region Name", js: "Sub-region Name", typ: "" },
        { json: "World Bank Income Level", js: "World Bank Income Level", typ: r("WorldBankIncomeLevel") },
        { json: "longitude", js: "longitude", typ: u(3.14, null) },
        { json: "latitude", js: "latitude", typ: u(3.14, null) },
        { json: "unMember", js: "unMember", typ: true },
        { json: "sids", js: "sids", typ: true },
        { json: "lldc", js: "lldc", typ: true },
        { json: "ldc", js: "ldc", typ: true },
        { json: "scores", js: "scores", typ: r("Scores") },
    ], false),
    "Scores": o([
        { json: "Business", js: "Business", typ: r("Business") },
        { json: "Foundations", js: "Foundations", typ: r("Foundations") },
        { json: "Government", js: "Government", typ: r("Government") },
        { json: "Infrastructure", js: "Infrastructure", typ: r("Infrastructure") },
        { json: "People", js: "People", typ: r("People") },
        { json: "Regulation", js: "Regulation", typ: r("Regulation") },
        { json: "Strategy", js: "Strategy", typ: r("Strategy") },
        { json: "Overall", js: "Overall", typ: r("Overall") },
    ], false),
    "Business": o([
        { json: "rank", js: "rank", typ: 0 },
        { json: "score", js: "score", typ: u(3.14, null) },
        { json: "confidence", js: "confidence", typ: u(3.14, null) },
        { json: "stage", js: "stage", typ: u(r("Stage"), null) },
        { json: "Financing Incentives", js: "Financing Incentives", typ: r("Overall") },
        { json: "Impact commitments", js: "Impact commitments", typ: r("Overall") },
        { json: "Startup Environment", js: "Startup Environment", typ: r("Overall") },
        { json: "Technology Adoption", js: "Technology Adoption", typ: r("Overall") },
    ], false),
    "Overall": o([
        { json: "rank", js: "rank", typ: 0 },
        { json: "score", js: "score", typ: u(3.14, null) },
        { json: "confidence", js: "confidence", typ: u(3.14, null) },
        { json: "stage", js: "stage", typ: u(r("Stage"), null) },
    ], false),
    "Stage": o([
        { json: "number", js: "number", typ: 0 },
        { json: "name", js: "name", typ: r("Name") },
        { json: "description", js: "description", typ: "" },
    ], false),
    "Foundations": o([
        { json: "rank", js: "rank", typ: 0 },
        { json: "score", js: "score", typ: u(3.14, null) },
        { json: "confidence", js: "confidence", typ: u(3.14, null) },
        { json: "stage", js: "stage", typ: u(r("Stage"), null) },
        { json: "Data Exchange", js: "Data Exchange", typ: r("Overall") },
        { json: "Digital Legal Identity", js: "Digital Legal Identity", typ: r("Overall") },
        { json: "Digital Payments", js: "Digital Payments", typ: r("Overall") },
    ], false),
    "Government": o([
        { json: "rank", js: "rank", typ: 0 },
        { json: "score", js: "score", typ: u(3.14, null) },
        { json: "confidence", js: "confidence", typ: null },
        { json: "stage", js: "stage", typ: u(r("Stage"), null) },
        { json: "Capabilities", js: "Capabilities", typ: r("Overall") },
        { json: "Digital Public Services", js: "Digital Public Services", typ: r("Overall") },
        { json: "Funding and procurement", js: "Funding and procurement", typ: r("Overall") },
        { json: "Leadership and coordination", js: "Leadership and coordination", typ: r("Overall") },
        { json: "Monitoring", js: "Monitoring", typ: r("Overall") },
    ], false),
    "Infrastructure": o([
        { json: "rank", js: "rank", typ: 0 },
        { json: "score", js: "score", typ: u(3.14, null) },
        { json: "confidence", js: "confidence", typ: u(3.14, null) },
        { json: "stage", js: "stage", typ: u(r("Stage"), null) },
        { json: "Connectivity Technology", js: "Connectivity Technology", typ: r("Overall") },
        { json: "Innovation Ecosystem", js: "Innovation Ecosystem", typ: r("Overall") },
    ], false),
    "People": o([
        { json: "rank", js: "rank", typ: 0 },
        { json: "score", js: "score", typ: u(3.14, null) },
        { json: "confidence", js: "confidence", typ: u(3.14, null) },
        { json: "stage", js: "stage", typ: u(r("Stage"), null) },
        { json: "Culture", js: "Culture", typ: r("Overall") },
        { json: "Digital Literacy Skills", js: "Digital Literacy Skills", typ: r("Overall") },
        { json: "Digital Wellbeing", js: "Digital Wellbeing", typ: r("Overall") },
        { json: "Usage and ownership", js: "Usage and ownership", typ: r("Overall") },
    ], false),
    "Regulation": o([
        { json: "rank", js: "rank", typ: 0 },
        { json: "score", js: "score", typ: u(3.14, null) },
        { json: "confidence", js: "confidence", typ: u(0, null) },
        { json: "stage", js: "stage", typ: u(r("Stage"), null) },
        { json: "Cybersecurity", js: "Cybersecurity", typ: r("Overall") },
        { json: "Data standards and protection", js: "Data standards and protection", typ: r("Overall") },
        { json: "E-commerce", js: "E-commerce", typ: r("Overall") },
        { json: "Ethical Standards", js: "Ethical Standards", typ: r("Overall") },
        { json: "Fair Market Competition", js: "Fair Market Competition", typ: r("Overall") },
    ], false),
    "Strategy": o([
        { json: "rank", js: "rank", typ: 0 },
        { json: "score", js: "score", typ: u(3.14, null) },
        { json: "confidence", js: "confidence", typ: u(0, null) },
        { json: "stage", js: "stage", typ: u(r("Stage"), null) },
        { json: "Approach", js: "Approach", typ: r("Overall") },
        { json: "Ambition", js: "Ambition", typ: r("Overall") },
    ], false),
    "Definition": o([
        { json: "Pillar", js: "Pillar", typ: r("Pillar") },
        { json: "Sub-Pillar", js: "Sub-Pillar", typ: r("SubPillar") },
        { json: "Definition", js: "Definition", typ: "" },
        { json: "Basic", js: "Basic", typ: "" },
        { json: "Opportunistic", js: "Opportunistic", typ: "" },
        { json: "Systematic", js: "Systematic", typ: "" },
        { json: "Differentiating", js: "Differentiating", typ: "" },
        { json: "Transformational", js: "Transformational", typ: "" },
    ], false),
    "Geojson": o([
        { json: "type", js: "type", typ: "" },
        { json: "features", js: "features", typ: a(r("Feature")) },
    ], false),
    "Feature": o([
        { json: "type", js: "type", typ: r("FeatureType") },
        { json: "geometry", js: "geometry", typ: u(r("Geometry"), null) },
        { json: "properties", js: "properties", typ: r("Properties") },
    ], false),
    "Geometry": o([
        { json: "type", js: "type", typ: r("GeometryType") },
        { json: "coordinates", js: "coordinates", typ: a(a(a(u(a(3.14), 3.14)))) },
    ], false),
    "Properties": o([
        { json: "ISO3CD", js: "ISO3CD", typ: "" },
    ], false),
    "Index": o([
        { json: "Country Name", js: "Country Name", typ: "" },
        { json: "Year", js: "Year", typ: "" },
        { json: "Pillar", js: "Pillar", typ: r("Pillar") },
        { json: "Sub-Pillar", js: "Sub-Pillar", typ: r("SubPillar") },
        { json: "Indicator", js: "Indicator", typ: "" },
        { json: "data_col", js: "data_col", typ: "" },
        { json: "new_rank_score", js: "new_rank_score", typ: "" },
        { json: "higher_is_better", js: "higher_is_better", typ: r("HigherIsBetter") },
    ], false),
    "Source": o([
        { json: "Country Name", js: "Country Name", typ: "" },
        { json: "Pillar", js: "Pillar", typ: r("Pillar") },
        { json: "Sub-Pillar", js: "Sub-Pillar", typ: r("SubPillar") },
        { json: "Indicator", js: "Indicator", typ: "" },
        { json: "Data Source", js: "Data Source", typ: "" },
        { json: "Data Link", js: "Data Link", typ: "" },
        { json: "Available", js: "Available", typ: "" },
    ], false),
    "RegionName": [
        "Africa",
        "Americas",
        "Asia",
        "",
        "Europe",
        "Oceania",
    ],
    "WorldBankIncomeLevel": [
        "",
        "High Income",
        "Low Income",
        "Lower Middle Income",
        "Upper Middle Income",
        "High income",
        "Low income",
    ],
    "Name": [
        "Basic",
        "Differentiating",
        "Opportunistic",
        "Systematic",
        "Transformational",
    ],
    "Pillar": [
        "Business",
        "",
        "Foundations",
        "Government",
        "Infrastructure",
        "People",
        "Regulation",
        "Strategy",
    ],
    "SubPillar": [
        "Ambition",
        "Approach",
        "Capabilities",
        "Connectivity Technology",
        "Culture",
        "Cybersecurity",
        "Data Exchange",
        "Data standards and protection",
        "Digital Legal Identity",
        "Digital Literacy Skills",
        "Digital Payments",
        "Digital Public Services",
        "Digital Wellbeing",
        "E-commerce",
        "",
        "Ethical Standards",
        "Fair Market Competition",
        "Financing Incentives",
        "Funding and procurement",
        "Impact commitments",
        "Innovation Ecosystem",
        "Leadership and coordination",
        "Monitoring",
        "Startup Environment",
        "Technology Adoption",
        "Usage and ownership",
    ],
    "GeometryType": [
        "MultiPolygon",
        "Polygon",
    ],
    "FeatureType": [
        "Feature",
    ],
    "HigherIsBetter": [
        "False",
        "True",
    ],
};
