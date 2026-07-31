import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  COUNCILLOR_SEATS,
  ELECTION_STATISTICS_URL,
  REGIONAL_COUNCILS,
} from "../src/electedOfficials.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE_PATH = join(ROOT, "public", "the-amalgamator-data.csv");
const OUTPUT_PATH = join(ROOT, "public", "council-data", "index.html");
const ELECTED_OUTPUT_PATH = join(ROOT, "public", "elected-officials-data.csv");

const parseQuotedCsvLine = (line) =>
  [...line.matchAll(/"((?:[^"]|"")*)"/g)].map((match) =>
    match[1].replaceAll('""', '"')
  );

const csvLines = readFileSync(SOURCE_PATH, "utf8")
  .trim()
  .split(/\r?\n/);
const headers = parseQuotedCsvLine(csvLines[0]);
const councils = csvLines.slice(1).map((line) => {
  const values = parseQuotedCsvLine(line);
  return Object.fromEntries(headers.map((header, index) => [header, values[index]]));
});

if (councils.length !== 67) {
  throw new Error(`Expected 67 territorial authorities, found ${councils.length}.`);
}

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
const quoteCsv = (value) => `"${String(value).replaceAll('"', '""')}"`;

const electedCsv = [
  [
    "id",
    "name",
    "authority_type",
    "region",
    "councillors_current",
    "mayors_current",
    "governing_body_elected_total",
    "election_year",
    "source_url",
    "notes",
  ],
  ...councils.map((council) => {
    const councillors = COUNCILLOR_SEATS[council.id];
    if (!Number.isInteger(councillors)) {
      throw new Error(`Missing elected-official count for ${council.id}.`);
    }
    const tauranga = council.id === "tauranga";
    return [
      council.id,
      council.name,
      "territorial authority",
      council.region,
      councillors,
      1,
      councillors + 1,
      tauranga ? 2024 : 2025,
      ELECTION_STATISTICS_URL,
      tauranga ? "Tauranga 2024–28 representation arrangement; not included in the 2025 election statistics." : "",
    ];
  }),
  ...Object.entries(REGIONAL_COUNCILS).map(([region, council]) => [
    `regional-${region.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`,
    council.name,
    "regional council",
    region,
    council.seats,
    0,
    council.seats,
    2025,
    ELECTION_STATISTICS_URL,
    "Regional councils do not elect mayors; their chair is selected by council members.",
  ]),
]
  .map((row) => row.map(quoteCsv).join(","))
  .join("\n");

const formatNumber = new Intl.NumberFormat("en-NZ", {
  maximumFractionDigits: 0,
});
const slugify = (value) =>
  value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const regions = [...new Set(councils.map((council) => council.region))];
const firstCouncilByRegion = new Map(
  regions.map((region) => [
    region,
    councils.find((council) => council.region === region)?.id,
  ])
);
const missingRates = councils.filter(
  (council) => !council.avg_residential_bill_2024_25_nzd_incl_gst
).length;

const regionOptions = regions
  .map(
    (region) =>
      `<option value="${escapeHtml(region)}">${escapeHtml(region)}</option>`
  )
  .join("\n              ");

const regionLinks = regions
  .map(
    (region) =>
      `<a href="#region-${slugify(region)}">${escapeHtml(region)}</a>`
  )
  .join("\n          ");

const rows = councils
  .map((council) => {
    const population = Number(council.population_2024);
    const netAssets = Number(council.net_assets_2024_nzd);
    const netAssetsPerResident = Math.round(netAssets / population);
    const publishedRate = council.avg_residential_bill_2024_25_nzd_incl_gst;
    const rateCell = publishedRate
      ? `$${formatNumber.format(Number(publishedRate))}`
      : '<span class="notPublished">Not published</span>';
    const regionId =
      firstCouncilByRegion.get(council.region) === council.id
        ? ` id="region-${slugify(council.region)}"`
        : "";

    return `            <tr${regionId} data-council="${escapeHtml(
      council.name.toLowerCase()
    )}" data-region="${escapeHtml(council.region)}">
              <th scope="row">${escapeHtml(council.name)}</th>
              <td>${escapeHtml(council.region)}</td>
              <td class="number">${formatNumber.format(population)}</td>
              <td class="number">${formatNumber.format(Number(council.land_area_km2))} km²</td>
              <td class="number">${rateCell}</td>
              <td class="number">$${formatNumber.format(netAssetsPerResident)}</td>
              <td class="number">${formatNumber.format(COUNCILLOR_SEATS[council.id])}</td>
              <td class="number">1</td>
              <td class="number">${formatNumber.format(COUNCILLOR_SEATS[council.id] + 1)}</td>
            </tr>`;
  })
  .join("\n");

const schema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  "@id": "https://www.amalgamator.nz/council-data/#dataset",
  name: "The Amalgamator council data",
  description:
    "Population, land area, published 2024/25 average residential rates and 2024 net assets for all 67 New Zealand territorial authorities.",
  url: "https://www.amalgamator.nz/council-data/",
  dateModified: "2026-07-31",
  temporalCoverage: "2024/2025",
  spatialCoverage: {
    "@type": "Place",
    name: "New Zealand",
  },
  creator: {
    "@type": "Person",
    name: "Brenden Mischewski",
    url: "https://www.amalgamator.nz/about/",
  },
  variableMeasured: [
    "Usually resident population, 2024",
    "Land area, 2025",
    "Published average residential rates bill, 2024/25",
    "Net assets at 30 June 2024",
    "Net assets per resident",
    "Current councillor positions",
    "Current mayoral positions",
    "Current elected governing-body positions",
  ],
  citation: "https://www.amalgamator.nz/about/#sources",
  license: "https://www.amalgamator.nz/about/#licence",
  distribution: {
    "@type": "DataDownload",
    encodingFormat: "text/csv",
    contentUrl: "https://www.amalgamator.nz/the-amalgamator-data.csv",
  },
};

const html = `<!doctype html>
<html lang="en-NZ">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Zealand Council Data: Population, Rates and Net Assets | The Amalgamator</title>
    <meta
      name="description"
      content="Browse population, land area, published 2024/25 average residential rates and 2024 net assets for all 67 New Zealand territorial authorities."
    />
    <link rel="canonical" href="https://www.amalgamator.nz/council-data/" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="The Amalgamator" />
    <meta property="og:title" content="New Zealand council data | The Amalgamator" />
    <meta
      property="og:description"
      content="Browse the published figures used by The Amalgamator for all 67 New Zealand territorial authorities."
    />
    <meta property="og:url" content="https://www.amalgamator.nz/council-data/" />
    <meta property="og:image" content="https://www.amalgamator.nz/og-image-2.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="New Zealand council data | The Amalgamator" />
    <meta
      name="twitter:description"
      content="Browse the published figures used by The Amalgamator for all 67 New Zealand territorial authorities."
    />
    <meta name="twitter:image" content="https://www.amalgamator.nz/og-image-2.jpg" />
    <meta name="theme-color" content="#1A2E33" />
    <script type="application/ld+json">
${JSON.stringify(schema, null, 2)
  .split("\n")
  .map((line) => `      ${line}`)
  .join("\n")}
    </script>
    <style>
      :root {
        color-scheme: light;
        --ink: #193036;
        --ink-soft: #4d6267;
        --wash: #ddebec;
        --paper: #f7f2e6;
        --line: #b8c9ca;
        --accent: #006d5b;
      }
      * { box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body {
        margin: 0;
        background: var(--wash);
        color: var(--ink);
        font: 16px/1.55 Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      a { color: inherit; text-underline-offset: 3px; }
      a:focus-visible,
      input:focus-visible,
      select:focus-visible {
        outline: 3px solid #ffb703;
        outline-offset: 3px;
      }
      .skip {
        position: absolute;
        left: 12px;
        top: -80px;
        padding: 10px 14px;
        background: var(--ink);
        color: white;
        z-index: 10;
      }
      .skip:focus { top: 12px; }
      header {
        min-height: 68px;
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        border-bottom: 1px solid var(--line);
      }
      header > a {
        font-size: 18px;
        font-weight: 850;
        text-decoration: none;
      }
      header nav { display: flex; gap: 18px; }
      header nav a { font-size: 14px; font-weight: 700; }
      main {
        width: min(100% - 32px, 1180px);
        margin: 0 auto;
        padding: 54px 0 64px;
      }
      .eyebrow {
        margin: 0 0 8px;
        color: var(--accent);
        font-size: 12px;
        font-weight: 850;
        letter-spacing: .12em;
        text-transform: uppercase;
      }
      h1 {
        max-width: 900px;
        margin: 0 0 18px;
        font-size: clamp(38px, 7vw, 68px);
        line-height: .98;
        letter-spacing: -.045em;
      }
      .lead {
        max-width: 780px;
        margin: 0 0 28px;
        color: var(--ink-soft);
        font-size: clamp(18px, 2.5vw, 22px);
      }
      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 10px 22px;
        margin-bottom: 36px;
      }
      .actions a { font-weight: 800; }
      .panel {
        padding: 22px;
        background: var(--paper);
        border: 1.5px solid var(--ink);
        border-radius: 16px;
      }
      .filters {
        display: grid;
        grid-template-columns: minmax(220px, 1fr) minmax(200px, 300px);
        gap: 14px;
        align-items: end;
      }
      label {
        display: grid;
        gap: 6px;
        font-size: 13px;
        font-weight: 800;
      }
      input,
      select {
        width: 100%;
        min-height: 46px;
        padding: 9px 12px;
        background: white;
        border: 1.5px solid var(--line);
        border-radius: 10px;
        color: var(--ink);
        font: inherit;
      }
      #resultCount {
        margin: 14px 0 0;
        color: var(--ink-soft);
        font-size: 14px;
      }
      .regions {
        display: flex;
        flex-wrap: wrap;
        gap: 7px 14px;
        margin: 24px 0;
      }
      .regions strong { width: 100%; }
      .regions a { font-size: 14px; }
      .tableWrap {
        overflow-x: auto;
        background: white;
        border: 1px solid var(--line);
        border-radius: 14px;
      }
      table {
        width: 100%;
        min-width: 940px;
        border-collapse: collapse;
      }
      th,
      td {
        padding: 12px 14px;
        border-bottom: 1px solid #dce4e5;
        text-align: left;
        vertical-align: top;
      }
      thead th {
        position: sticky;
        top: 0;
        background: var(--ink);
        color: white;
        font-size: 13px;
        line-height: 1.35;
      }
      tbody th { font-weight: 800; }
      tbody tr:last-child th,
      tbody tr:last-child td { border-bottom: 0; }
      tbody tr:hover { background: #f2f8f7; }
      .number { text-align: right; white-space: nowrap; }
      .notPublished { color: var(--ink-soft); font-style: italic; }
      .notes {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 18px;
        margin-top: 24px;
      }
      .notes h2 { margin: 0 0 8px; font-size: 21px; }
      .notes p { margin: 0; color: var(--ink-soft); }
      footer {
        padding: 24px 20px;
        background: var(--ink);
        color: white;
        font-size: 13px;
        text-align: center;
      }
      [hidden] { display: none !important; }
      .visuallyHidden {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
      @media (max-width: 720px) {
        header { align-items: flex-start; padding-top: 18px; padding-bottom: 18px; }
        header nav { flex-direction: column; gap: 4px; text-align: right; }
        main { padding-top: 38px; }
        .filters,
        .notes { grid-template-columns: 1fr; }
        .panel { padding: 16px; }
      }
    </style>
  </head>
  <body>
    <a class="skip" href="#dataTable">Skip to the council data</a>
    <header>
      <a href="/">The Amalgamator</a>
      <nav aria-label="Site">
        <a href="/">Build a council</a>
        <a href="/about/">About and method</a>
      </nav>
    </header>
    <main>
      <p class="eyebrow">The published source figures</p>
      <h1>Council data for all 67 territorial authorities</h1>
      <p class="lead">
        This table contains the source values used by The Amalgamator. It is a
        fixed-vintage comparison dataset, not live council data. Search for a
        council or browse the figures by region.
      </p>
      <div class="actions">
        <a href="/the-amalgamator-data.csv" download>Download the financial and demographic CSV</a>
        <a href="/elected-officials-data.csv" download>Download elected officials (CSV)</a>
        <a href="/about/#sources">Read the sources and methodology</a>
      </div>

      <section class="panel" aria-labelledby="find-heading">
        <h2 id="find-heading" class="visuallyHidden">Find council data</h2>
        <div class="filters">
          <label for="councilSearch">
            Search by council name
            <input id="councilSearch" type="search" autocomplete="off" placeholder="For example, Whangārei" />
          </label>
          <label for="regionFilter">
            Filter by region
            <select id="regionFilter">
              <option value="">All regions</option>
              ${regionOptions}
            </select>
          </label>
        </div>
        <p id="resultCount" aria-live="polite">67 councils shown</p>
      </section>

      <nav class="regions" aria-label="Jump to a region">
        <strong>Jump to a region</strong>
        ${regionLinks}
      </nav>

      <div class="tableWrap" role="region" aria-label="Council data table" tabindex="0">
        <table id="dataTable">
          <caption class="visuallyHidden">
            Population, land area, average residential rates and net assets per resident for New Zealand territorial authorities
          </caption>
          <thead>
            <tr>
              <th scope="col">Council</th>
              <th scope="col">Region</th>
              <th scope="col" class="number">Population<br />2024</th>
              <th scope="col" class="number">Land area<br />2025</th>
              <th scope="col" class="number">Average residential rates<br />2024/25</th>
              <th scope="col" class="number">Net assets per resident<br />30 June 2024</th>
              <th scope="col" class="number">Councillors<br />current term</th>
              <th scope="col" class="number">Mayors<br />current term</th>
              <th scope="col" class="number">Governing-body elected total</th>
            </tr>
          </thead>
          <tbody>
${rows}
          </tbody>
        </table>
      </div>

      <section class="notes" aria-label="How to interpret the data">
        <div class="panel">
          <h2>Data coverage</h2>
          <p>
            Population figures are 2024 estimates and land areas are the 2025 values
            republished in the Department of Internal Affairs council-profile release.
            Average residential rates are published 2024/25 figures. Net assets are
            council assets less liabilities at 30 June 2024.
          </p>
        </div>
        <div class="panel">
          <h2>Important limitations</h2>
          <p>
            The figures come from different published sources and reference dates.
            They should not be interpreted as a current financial ranking or a forecast
            of amalgamation outcomes. ${missingRates} councils have no published average
            residential rates figure in the source used here.
          </p>
        </div>
      </section>
    </main>
    <footer>
      Independent modelling by Brenden Mischewski ·
      <a href="/about/#licence">Data terms and attribution</a>
    </footer>
    <script>
      (() => {
        const search = document.getElementById("councilSearch");
        const region = document.getElementById("regionFilter");
        const rows = [...document.querySelectorAll("#dataTable tbody tr")];
        const resultCount = document.getElementById("resultCount");
        const normalize = (value) =>
          value
            .normalize("NFKD")
            .replace(/[\\u0300-\\u036f]/g, "")
            .toLocaleLowerCase("en-NZ");

        const applyFilters = () => {
          const query = normalize(search.value.trim());
          const selectedRegion = region.value;
          let shown = 0;

          rows.forEach((row) => {
            const matchesName = !query || normalize(row.dataset.council).includes(query);
            const matchesRegion = !selectedRegion || row.dataset.region === selectedRegion;
            const visible = matchesName && matchesRegion;
            row.hidden = !visible;
            if (visible) shown += 1;
          });

          resultCount.textContent = shown === 1 ? "1 council shown" : \`\${shown} councils shown\`;
        };

        search.addEventListener("input", applyFilters);
        region.addEventListener("change", applyFilters);
      })();
    </script>
  </body>
</html>
`;

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, html, "utf8");
writeFileSync(ELECTED_OUTPUT_PATH, `${electedCsv}\n`, "utf8");
console.log(`Generated council data page with ${councils.length} rows.`);
console.log(`Generated elected-officials CSV with ${councils.length + Object.keys(REGIONAL_COUNCILS).length} rows.`);
