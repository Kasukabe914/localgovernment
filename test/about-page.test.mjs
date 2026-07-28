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

test("social descriptions point readers to the method page", () => {
  const aboutUrl = "https://www.amalgamator.nz/about/";
  assert.match(index, /property="og:description"[\s\S]*About &amp; method:/);
  assert.match(index, /name="twitter:description"[\s\S]*About &amp; method:/);
  assert.ok(index.includes(aboutUrl));
  assert.ok(shareWorker.includes(aboutUrl));
  assert.match(app, /About, method and limitations: \$\{ABOUT_URL\}/);
});
