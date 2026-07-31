import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import test from "node:test";

const read = (relativePath) =>
  readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");

const about = read("public/about/index.html");
const app = read("src/App.jsx");
const index = read("index.html");
const redirect = read("public/methodology.html");
const privacy = read("public/privacy-policy/index.html");
const codeLicence = read("LICENSE");
const outputLicence = read("OUTPUT-LICENCE.md");
const dataLicence = read("DATA-LICENCE.md");
const shareWorker = read("share/worker.js");
const robots = read("public/robots.txt");
const sitemap = read("public/sitemap.xml");
const councilData = read("public/council-data/index.html");
const councilCsv = read("public/the-amalgamator-data.csv");

const parseQuotedCsvLine = (line) =>
  [...line.matchAll(/"((?:[^"]|"")*)"/g)].map((match) =>
    match[1].replaceAll('""', '"')
  );

test("the About page has authoritative, indexable metadata and valid JSON-LD", () => {
  assert.match(
    about,
    /<title>About &amp; method — Local Government Amalgamator<\/title>/
  );
  assert.match(
    about,
    /<meta name="description" content="Who built this tool, where the data comes from, and what the indicative rate figures do and do not show\.">/
  );
  assert.match(
    about,
    /<link rel="canonical" href="https:\/\/www\.amalgamator\.nz\/about\/">/
  );
  assert.doesNotMatch(about, /<meta[^>]+name="robots"[^>]+noindex/i);

  const match = about.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/
  );
  assert.ok(match, "JSON-LD block is present");
  const structuredData = JSON.parse(match[1]);
  assert.equal(structuredData["@type"], "WebPage");
  assert.equal(structuredData.author.name, "Brenden Mischewski");
  assert.equal(structuredData.dateModified, "2026-07-28");
});

test("the About page remains useful with JavaScript disabled", () => {
  const executableScripts = [
    ...about.matchAll(
      /<script(?![^>]*type="application\/ld\+json")[^>]*>/gi
    ),
  ];
  assert.equal(executableScripts.length, 0);
  assert.match(about, /<main id="content">/);
  assert.match(about, /id="limitations"/);
  assert.match(about, /id="corrections"/);
});

test("the homepage is descriptive and useful before React loads", () => {
  assert.match(
    index,
    /<title>New Zealand Council Amalgamation Calculator \| The Amalgamator<\/title>/
  );
  assert.match(
    index,
    /<meta name="google-site-verification" content="wsnsUIEg_zeQFEvR-QUSMpu5lSDun5ePL2bVyq35FMA" \/>/
  );
  assert.match(index, /<div class="staticHome">/);
  assert.match(index, /<h1>Build a bigger council\.<\/h1>/);
  assert.match(index, /<h2 id="static-comparisons">What this tool compares<\/h2>/);
  assert.match(index, /<h2 id="static-how">How the calculator works<\/h2>/);
  assert.match(index, /<h2 id="static-questions">Common questions<\/h2>/);
  assert.match(index, /<h2 id="static-coverage">Data coverage<\/h2>/);
  assert.match(index, /What do net assets per resident mean\?/);
  assert.match(index, /href="\/about\/">About, method and limitations<\/a>/);
  assert.match(index, /href="\/council-data\/">Browse the council data<\/a>/);
  assert.match(index, /href="\/the-amalgamator-data\.csv" download/);

  const match = index.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/
  );
  assert.ok(match, "homepage JSON-LD block is present");
  const structuredData = JSON.parse(match[1]);
  const types = structuredData["@graph"].map((entry) => entry["@type"]);
  assert.deepEqual(types, ["WebSite", "WebApplication", "FAQPage"]);
  assert.equal(structuredData["@graph"][1].creator.name, "Brenden Mischewski");
  assert.equal(
    structuredData["@graph"][1].creator.url,
    "https://www.amalgamator.nz/about/"
  );
  assert.equal(structuredData["@graph"][1].offers.price, "0");
  assert.equal(structuredData["@graph"][1].dateModified, "2026-07-31");
  assert.equal(structuredData["@graph"][1].featureList.length, 5);
  assert.equal(structuredData["@graph"][2].mainEntity.length, 4);
});

test("robots and sitemap expose only the intended canonical search pages", () => {
  assert.match(robots, /User-agent: \*\s+Allow: \//);
  assert.match(robots, /User-agent: OAI-SearchBot\s+Allow: \//);
  assert.match(robots, /User-agent: GPTBot\s+Disallow: \//);
  assert.match(
    robots,
    /Sitemap: https:\/\/www\.amalgamator\.nz\/sitemap\.xml/
  );

  assert.match(
    sitemap,
    /<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/
  );
  const sitemapLocations = [
    ...sitemap.matchAll(/<loc>(.*?)<\/loc>/g),
  ].map((match) => match[1]);
  assert.deepEqual(sitemapLocations, [
    "https://www.amalgamator.nz/",
    "https://www.amalgamator.nz/about/",
    "https://www.amalgamator.nz/council-data/",
  ]);
});

test("the council data directory is canonical, crawlable and reconciles to the CSV", () => {
  assert.match(
    councilData,
    /<title>New Zealand Council Data: Population, Rates and Net Assets \| The Amalgamator<\/title>/
  );
  assert.match(
    councilData,
    /<link rel="canonical" href="https:\/\/www\.amalgamator\.nz\/council-data\/" \/>/
  );
  assert.match(councilData, /<h1>Council data for all 67 territorial authorities<\/h1>/);
  assert.match(councilData, /fixed-vintage comparison dataset,\s+not live council data/);
  assert.match(councilData, /id="dataTable"/);
  assert.match(councilData, /id="councilSearch"/);
  assert.match(councilData, /id="regionFilter"/);
  assert.match(councilData, /href="\/about\/#licence">Data terms and attribution<\/a>/);

  const sourceLines = councilCsv.trim().split(/\r?\n/);
  const sourceHeaders = parseQuotedCsvLine(sourceLines[0]);
  const nameIndex = sourceHeaders.indexOf("name");
  const sourceNames = sourceLines
    .slice(1)
    .map((line) => parseQuotedCsvLine(line)[nameIndex].toLowerCase());
  const tableNames = [
    ...councilData.matchAll(/<tr(?: id="[^"]+")? data-council="([^"]+)"/g),
  ].map((match) =>
    match[1]
      .replaceAll("&amp;", "&")
      .replaceAll("&#39;", "'")
      .replaceAll("&quot;", '"')
  );
  assert.equal(tableNames.length, 67);
  assert.deepEqual(tableNames, sourceNames);

  const match = councilData.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/
  );
  assert.ok(match, "Dataset JSON-LD block is present");
  const structuredData = JSON.parse(match[1]);
  assert.equal(structuredData["@type"], "Dataset");
  assert.equal(structuredData.spatialCoverage.name, "New Zealand");
  assert.equal(structuredData.distribution["@type"], "DataDownload");
  assert.equal(
    structuredData.distribution.contentUrl,
    "https://www.amalgamator.nz/the-amalgamator-data.csv"
  );
});

test("the interactive homepage repeats the static comparison summary", () => {
  assert.match(
    app,
    /Explore possible New Zealand council amalgamations\. Choose territorial/
  );
  assert.match(app, /<h2 id="simpleHomeSummaryHeading">What this tool compares<\/h2>/);
  assert.match(app, /covers all 67 New Zealand territorial authorities/);
  assert.match(app, /id="simpleHomeHowHeading">How the calculator works/);
  assert.match(app, /id="simpleHomeQuestionsHeading">Common questions/);
  assert.match(app, /id="simpleHomeCoverageHeading">Data coverage/);
  assert.match(app, /does not forecast a merged council’s balance/);
  assert.match(app, /Read the methodology and limitations/);
  assert.match(app, /href="council-data\/">Browse the council data/);
  assert.match(app, /Download the underlying dataset/);
});

test("the public trust statements cover authorship, funding, interests and position", () => {
  for (const statement of [
    "This tool was built by Brenden Mischewski",
    "Nobody commissioned it",
    "nobody paid for it",
    "represents no client, council, government agency, political party or campaign",
    "built entirely from published public data",
    "no information obtained through any professional engagement",
    "not connected to any submission being made under the Head Start process",
    "This tool takes no position on amalgamation",
    "Use by any group does not imply that I endorse that group’s position",
  ]) {
    assert.ok(about.includes(statement), statement);
  }
  assert.match(
    about,
    /href="mailto:brenden@mischewski\.co\.nz">brenden@mischewski\.co\.nz<\/a>/
  );
  assert.match(
    about,
    /This tool was built by Brenden Mischewski, based in Porirua\./
  );
  assert.match(
    about,
    /I work at Mischewski Consulting Limited, with a background in research and policy analysis in New Zealand\./
  );
  assert.doesNotMatch(about, /Whitby/);
  assert.doesNotMatch(about, /public sector policy and advisory through/);
});

test("the limitations are explicit and linked from both rates experiences", () => {
  for (const limitation of [
    "transition and implementation costs",
    "debt harmonisation or ring-fencing",
    "service-level changes",
    "differential rating, targeted rates, uniform charges or remission policy",
    "efficiency gains or losses",
    "any decision an amalgamated council would actually make",
    "These are not forecasts",
  ]) {
    assert.ok(about.includes(limitation), limitation);
  }

  assert.equal(
    [...app.matchAll(/href="about\/#limitations"/g)].length,
    2,
    "both the current and legacy rates results link to limitations"
  );
  assert.equal(
    [...app.matchAll(/>What these numbers mean<\/a>/g)].length,
    2
  );
  assert.match(
    about,
    /class="result-return" href="\.\.\/"[^>]*>← Back to your result<\/a>/
  );
  assert.match(about, /history\.back\(\)/);
});

test("the public method accurately distinguishes households from residential rating units", () => {
  assert.match(
    about,
    /two figures published for each council in the New Zealand Taxpayers’ Union’s <cite>Ratepayers’ Report 2026<\/cite>/
  );
  assert.match(
    about,
    /published 2024\/25 average residential rates bill and the report’s separately published household count/
  );
  assert.match(
    about,
    /Population figures elsewhere in the tool are separate 2024 Stats NZ estimates/
  );
  assert.match(
    about,
    /does not reproduce the Taxpayers’ Union’s residential-rates calculation/
  );
  assert.match(
    about,
    /separate household count used by this tool is therefore not necessarily the denominator/
  );
  assert.match(about, /does not reconstruct the residential rates pool/);
  assert.match(
    app,
    /separately\s+published household count\. That count is not necessarily the residential\s+rating-unit count/
  );
  assert.doesNotMatch(about, /combined residential rating base/);
  assert.match(about, /Tool’s implied amount = Σ\(Aᵢ × Hᵢ\)/);
  assert.match(
    about,
    /Actual residential rates and applicable charges = Σ\(Aᵢ × Zᵢ\)/
  );
  assert.match(about, /Difference = Σ\[Aᵢ × \(Hᵢ − Zᵢ\)\]/);
  assert.match(
    about,
    /exact dollar difference cannot be calculated from the published dataset/
  );
  assert.match(
    about,
    /Total council rates revenue is available, but it includes non-residential rates/
  );
});

test("rates and assets use an explicit historical water-continuity basis", () => {
  for (const phrase of [
    "Historical water-continuity basis",
    "Later transfers of water services, assets, liabilities, debt and customer billing",
    "Where water was already separately owned, billed or excluded",
    "post-reform legal balance sheet",
  ]) {
    assert.ok(about.includes(phrase), phrase);
  }

  assert.match(app, /Water follows a historical continuity basis/);
  assert.match(app, /Historic net assets per resident · 30 June 2024/);
  assert.match(
    app,
    /later transfers to separate water organisations\s+are ignored/
  );
  assert.match(
    about,
    /Wellington\/Wairarapa financial analysis[\s\S]*different, post-transfer financial perimeter/
  );
});

test("About & method is persistent and the old methodology URL is a canonical compatibility redirect", () => {
  assert.equal(
    [...app.matchAll(/href="about\/">About &amp; method<\/a>/g)].length,
    3,
    "opening disclosure and both app footers link to About & method"
  );
  assert.doesNotMatch(app, /href="methodology\.html"/);
  assert.match(privacy, /href="\.\.\/about\/">About &amp; method<\/a>/);

  assert.match(redirect, /name="robots" content="noindex,follow"/);
  assert.match(
    redirect,
    /rel="canonical" href="https:\/\/www\.amalgamator\.nz\/about\/"/
  );
  assert.match(redirect, /http-equiv="refresh" content="0; url=\.\/about\/"/);
  assert.match(redirect, /href="\.\/about\/">Continue to About &amp; method<\/a>/);
});

test("the source register is complete at source-family level and exposes its historical gap", () => {
  const lines = read("public/source-register.csv").trim().split(/\r?\n/);
  const headers = parseQuotedCsvLine(lines.shift());
  const rows = lines.map((line) => {
    const values = parseQuotedCsvLine(line);
    return Object.fromEntries(
      headers.map((header, indexValue) => [header, values[indexValue]])
    );
  });

  assert.ok(rows.length >= 11);
  for (const row of rows) {
    for (const field of [
      "source_id",
      "publisher",
      "dataset_or_document",
      "vintage_or_release",
      "retrieval_date",
      "url",
    ]) {
      assert.ok(row[field], `${row.source_id || "source"} has ${field}`);
    }
    assert.match(row.retrieval_date, /^\d{4}-\d{2}-\d{2}$/);
    assert.match(row.url, /^https:\/\//);
  }

  const ratingUnits = rows.find(
    (row) => row.source_id === "rating_units_compilation"
  );
  assert.ok(ratingUnits);
  assert.match(ratingUnits.notes, /retrieval dates and URLs were not retained/);
  const ratepayersReport = rows.find(
    (row) => row.source_id === "ratepayers_report_2026"
  );
  assert.ok(ratepayersReport);
  assert.match(ratepayersReport.fields_or_use, /households_published_2026/);
  assert.match(ratepayersReport.notes, /not the council-defined residential rating-unit count/);
  assert.match(about, /href="\.\.\/source-register\.csv"/);
});

test("the briefing report is discoverable outside the change log", () => {
  const briefingSection = about.match(
    /<section class="panel" id="briefing"[\s\S]*?<\/section>/
  )?.[0] || "";
  assert.match(briefingSection, /<h2 id="briefing-heading">Briefing report<\/h2>/);
  assert.match(briefingSection, /Build a bigger council<\/cite>, Version 1\.0/);
  assert.match(briefingSection, /six-slide briefing/);
  assert.match(
    briefingSection,
    /href="\.\.\/reports\/amalgamator-build-a-bigger-council-v1\.0\.pptx" download/
  );
});

test("privacy requests use a private email channel rather than public GitHub issues", () => {
  assert.match(
    privacy,
    /mailto:brenden@mischewski\.co\.nz\?subject=Amalgamator%20privacy%20request/
  );
  assert.doesNotMatch(
    privacy,
    /github\.com\/Kasukabe914\/localgovernment\/issues/
  );
  assert.match(privacy, /Do not send passwords, identity documents, financial information/);
});

test("code, outputs and source data have distinct licence statements", () => {
  assert.match(codeLicence, /^MIT License/);
  assert.match(codeLicence, /Mischewski Consulting Limited/);
  assert.match(outputLicence, /Creative Commons Attribution 4\.0/);
  assert.match(outputLicence, /Local Government Amalgamator by Brenden Mischewski/);
  assert.match(dataLicence, /source code.*MIT License/is);
  assert.match(dataLicence, /Original text and visual outputs.*CC BY 4\.0/is);
  assert.match(about, /Suggested citation:/);
  assert.match(about, /<h2 id="changes-heading">Change log<\/h2>/);
  const changeLogSection = about.match(
    /<section class="panel" aria-labelledby="changes-heading">([\s\S]*?)<\/section>/
  )?.[1] || "";
  assert.match(changeLogSection, /<time datetime="2026-07-28">28 July 2026<\/time>/);
  assert.match(changeLogSection, /Build a bigger council<\/cite>, Version 1\.0/);
  assert.match(changeLogSection, /authoritative live tool/i);
  assert.match(changeLogSection, /any combination not shown/i);
  assert.match(
    changeLogSection,
    /href="\.\.\/reports\/amalgamator-build-a-bigger-council-v1\.0\.pptx" download/
  );
  assert.ok(
    statSync(
      new URL(
        "../public/reports/amalgamator-build-a-bigger-council-v1.0.pptx",
        import.meta.url
      )
    ).size > 0
  );
});

test("social descriptions explain the tool and the method remains discoverable", () => {
  const aboutUrl = "https://www.amalgamator.nz/about/";
  const description =
    "Combine New Zealand councils and compare population, land area, published 2024/25 average residential rates and historic net assets per resident.";
  assert.equal(
    index.match(/property="og:description"\s+content="([^"]+)"/)?.[1],
    description
  );
  assert.equal(
    index.match(/name="twitter:description"\s+content="([^"]+)"/)?.[1],
    description
  );
  assert.match(index, /href="\/about\/">About, method and limitations<\/a>/);
  assert.ok(shareWorker.includes(aboutUrl));
  assert.match(app, /About, method and limitations: \$\{ABOUT_URL\}/);
});
