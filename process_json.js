import { readJSON, writeCSV } from "https://deno.land/x/flat@0.0.10/mod.ts";

const inputFilename = Deno.args[0];
const inputFilenameRoot = inputFilename.split("/")[0].split(".")[0];
const outputFilename = `processed/${inputFilenameRoot}.csv`;

const manifest = await readCSV("data_manifest.csv");
const config = manifest.find((d) => d.name === inputFilenameRoot);

if (!config) Deno.exit();

const fileContents = await readJSON(inputFilename);

await writeCSV(outputFilename, fileContents);
