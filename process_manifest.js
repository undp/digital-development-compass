import { readCSV } from "https://deno.land/x/flat@0.0.15/mod.ts";

const inputFilename = "data_manifest.csv";
const outputFilename = ".github/workflows/flat.yml";

const manifest = await readCSV(inputFilename);

const steps = manifest.map(
  ({ name, format, endpoint }) => `
      - name: Fetch data (${name})
        uses: githubocto/flat@v2
        if: always()
        with:
           http_url: ${endpoint}
           downloaded_filename: data/${name}.${format}
           postprocess: ./process_raw_data.js
      - name: Create issue (${name})
        if: failure()
        uses: JasonEtco/create-an-issue@v2
        env:
          URL: "${endpoint}"
          NAME: "${name}"
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}\
        with:
          filename: .github/flat-error-template.md
          update_existing: true
`
);

const top = `name: data
on:
  schedule:
    - cron: 0 0 13 * *
  workflow_dispatch: {}
  push:
    paths:
      - .github/workflows/flat.yml
      - ./process_xlsx.js
jobs:
  scheduled:
    runs-on: ubuntu-latest
    steps:
      - name: Setup deno
        uses: denoland/setup-deno@main
        with:
          deno-version: v1.x
      - name: Check out repo
        uses: actions/checkout@v2`;

const yamlString = top + steps.join("");

await Deno.writeTextFile(outputFilename, yamlString);
