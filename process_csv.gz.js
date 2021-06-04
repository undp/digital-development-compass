import { gunzipFile } from "https://deno.land/x/compress@v0.3.8/mod.ts";

const inputFilename = Deno.args[0];
const inputFilenameRoot = inputFilename.split("/")[0].split(".")[0];
const outputFilename = `processed/${inputFilenameRoot}.csv`;

await gunzipFile(inputFilename, outputFilename);
