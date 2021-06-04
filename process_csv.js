import { readCSV, writeCSV } from "https://deno.land/x/flat@0.0.10/mod.ts";

const inputFilename = Deno.args[0];
const inputFilenameRoot = inputFilename.split("/")[0].split(".")[0];
const outputFilename = `processed/${inputFilenameRoot}.csv`;

const fileContents = await readCSV(inputFilename);

await writeCSV(outputFilename, fileContents);
