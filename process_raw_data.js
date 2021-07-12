import {
  xlsx,
  readXLSX,
  writeCSV,
  readCSV
} from "https://deno.land/x/flat@0.0.11/mod.ts";
import { parse as parseYaml } from "https://deno.land/std@0.63.0/encoding/yaml.ts";
import { parse } from "https://deno.land/std@0.92.0/encoding/csv.ts";

const inputFilename = Deno.args[0];
const inputFilenameRoot = inputFilename.split("/")[1].split(".")[0];
const outputFilename = `processed/${inputFilenameRoot}.csv`;

const manifest = await readCSV("data_manifest.csv");
const config = manifest.find((d) => d.name === inputFilenameRoot);
if (!config) Deno.exit();
console.log("config", config);

const fileType = config.format

let fileContents

if (fileType === "csv") {
  fileContents = await readCSV(inputFilename);
} else if (fileType === "tsv") {
  fileContents = await readCSV(inputFilename, {
    separator: "\t",
  });
} else if (fileType === "csv.gz") {
  await gunzipFile(inputFilename, outputFilename);
  Deno.exit()
} else if (fileType === "json") {
  fileContents = await readJSON(inputFilename);
} else if (fileType === "yaml") {
  const yaml = await Deno.readFile(inputFilename);
  const decoder = new TextDecoder("utf-8");
  fileContents = await parseYaml(decoder.decode(yaml));
} else if (fileType === "xlsx") {
  const workbook = await readXLSX(inputFilename);

  const sheetData =
    workbook.Sheets[workbook.SheetNames[config["Excel sheet #"] - 1]];
  const csvString = await xlsx.utils.sheet_to_csv(sheetData); // can use to_json, to_txt, to_html, to_formulae
  const rows = csvString.split("\n");
  const filteredRows = rows.slice((config["Excel sheet top row #"] || 1) - 1);
  const data = await parse(filteredRows.join("\n"), { skipFirstRow: true });
  const columns = filteredRows[0].split(",");
  const countryKey = config["Country Column #"]
    ? columns[config["Country Column #"] - 1]
    : "";
  const yearKey = config["Year Column #"]
    ? columns[config["Year Column #"] - 1]
    : "";
  fileContents = data.map((d) => ({
    ...d,
    data_country: d[countryKey],
    data_year: d[yearKey],
  }));
}

await writeCSV(outputFilename, fileContents);
