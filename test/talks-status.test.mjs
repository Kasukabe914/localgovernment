import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (relativePath) =>
  readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");

const app = read("src/App.jsx");
const about = read("public/about/index.html");
const sourceRegister = read("public/source-register.csv");

test("the main current-talks starter combinations remain unchanged", () => {
  const articlePreset = app.match(
    /article:\s*\{\s*label: "Where talks stand, mid-July",\s*groups: \[([\s\S]*?)\],\s*\},\s*wgtnOne:/
  )?.[1];

  assert.ok(articlePreset, "current-talks preset is present");
  const expectedGroups = [
    '{ name: "The Winterless Council", ids: ["farnorth", "whangarei"] }',
    '{ name: "The Fruit Bowl", ids: ["hastings", "napier", "chb"] }',
    '{ name: "The Sunrise Coast", ids: ["whakatane", "kawerau", "opotiki"] }',
    '{ name: "Megatron", ids: ["waikatod", "hamilton", "waipa", "swaikato", "taupo"] }',
    '{ name: "Kiwiana Country", ids: ["otorohanga", "waitomo"] }',
    '{ name: "Stratford–South Taranaki", ids: ["stratford", "staranaki"] }',
    '{ name: "The Big Windy", ids: ["wellington", "hutt", "porirua", "upperhutt"] }',
    '{ name: "The Wairarapa Three", ids: ["masterton", "carterton", "swairarapa"] }',
    '{ name: "Wine & Whales", ids: ["marlborough", "kaikoura"] }',
    '{ name: "The Coast", ids: ["buller", "grey", "westland"] }',
    '{ name: "Aoraki Council", ids: ["timaru", "mackenzie", "waimate", "waitaki"] }',
    '{ name: "The Deep South", ids: ["southlandd", "gore"] }',
  ];

  assert.equal(
    [...articlePreset.matchAll(/\{ name: /g)].length,
    expectedGroups.length
  );
  for (const group of expectedGroups) {
    assert.ok(articlePreset.includes(group), group);
  }
});

test("the exploring section includes the 28 July council status updates", () => {
  for (const statement of [
    "Resolved not to submit a Head Start proposal and does not support Whangārei District Council's preferred pairing with Kaipara.",
    "Resolved not to participate in the Head Start process.",
    "Intends to put an alternative, non-common Pathfinder proposal to the Minister.",
    "Resolved not to submit a Head Start proposal under the present circumstances.",
    "Prefers a unitary authority with Marlborough, but this is not yet a shared, mutually resolved grouping.",
    "Prefers an Aoraki grouping with Waitaki, Mackenzie and Timaru, but this is not yet a shared, mutually resolved grouping.",
    "Prefers an Aoraki grouping with Waimate, Mackenzie and Timaru, but this is not yet a shared, mutually resolved grouping.",
  ]) {
    assert.ok(app.includes(statement), statement);
  }
  assert.match(app, /Status notes updated 28 July 2026/);
  assert.match(app, /The starter\s+combinations above are unchanged/);

  const additionalStatusIds = [
    "thames",
    "hauraki",
    "matamata",
    "tauranga",
    "wbop",
    "rotorua",
    "ashburton",
    "hurunui",
    "waimakariri",
    "christchurch",
    "selwyn",
    "centralotago",
    "clutha",
    "kapiti",
    "horowhenua",
    "nelson",
    "tasman",
  ];
  const exploringBlock = app.match(/const EXPLORING = \{([\s\S]*?)\};/)?.[1] || "";
  for (const id of additionalStatusIds) {
    assert.match(exploringBlock, new RegExp(`^\\s*${id}:`, "m"), id);
  }
});

test("a status council opens the chooser preselected", () => {
  assert.match(app, /const chooseStatusCouncil = \(id\) =>/);
  assert.match(app, /setSelectedIds\(\[id\]\)/);
  assert.match(app, /setRegion\(council\.region\)/);
  assert.match(app, /setScreen\("build"\)/);
  assert.match(
    app,
    /className="simpleExploringCouncil"[\s\S]*onClick=\{\(\) => chooseStatusCouncil\(council\.id\)\}/
  );
  assert.match(
    app,
    /\$\{members\[0\]\.name\} is selected\. Choose at least one more council\./
  );
});

test("where things stand accounts for all territorial authorities", () => {
  assert.match(
    app,
    /const CURRENT_TALKS_COUNCIL_IDS = new Set\([\s\S]*PRESETS\.article\.groups\.flatMap/
  );
  assert.match(
    app,
    /const OTHER_HEAD_START_COUNCILS = COUNCILS\.filter\([\s\S]*!council\.locked[\s\S]*!CURRENT_TALKS_COUNCIL_IDS\.has\(council\.id\)[\s\S]*!EXPLORING\[council\.id\]/
  );
  assert.match(
    app,
    /const OUTSIDE_HEAD_START_COUNCILS = COUNCILS\.filter\(\(council\) => council\.locked\)/
  );
  assert.match(app, /<summary>Other eligible councils<\/summary>/);
  assert.match(app, /<summary>Outside Head Start<\/summary>/);
  assert.match(
    app,
    /Auckland is the only territorial authority expressly excluded/
  );
  assert.match(app, /Hypothetical only: Auckland is outside Head Start/);

  const councilBlock = app.match(/const COUNCILS = \[([\s\S]*?)\];/)?.[1] || "";
  const allCouncilIds = [
    ...councilBlock.matchAll(/\{ id: "([^"]+)"/g),
  ].map((match) => match[1]);
  const lockedCouncilIds = [
    ...councilBlock.matchAll(/\{ id: "([^"]+)"[^\n]+locked: true/g),
  ].map((match) => match[1]);
  const currentTalksBlock = app.match(
    /article:\s*\{\s*label: "Where talks stand, mid-July",\s*groups: \[([\s\S]*?)\],\s*\},\s*wgtnOne:/
  )?.[1] || "";
  const currentTalksIds = [
    ...currentTalksBlock.matchAll(/"([a-z0-9]+)"/g),
  ]
    .map((match) => match[1])
    .filter((id) => allCouncilIds.includes(id));
  const exploringBlock = app.match(/const EXPLORING = \{([\s\S]*?)\};/)?.[1] || "";
  const exploringIds = [
    ...exploringBlock.matchAll(/^\s*([a-z0-9]+):/gm),
  ].map((match) => match[1]);
  const otherEligibleIds = allCouncilIds.filter(
    (id) =>
      !lockedCouncilIds.includes(id) &&
      !currentTalksIds.includes(id) &&
      !exploringIds.includes(id)
  );
  const represented = new Set([
    ...currentTalksIds,
    ...exploringIds,
    ...otherEligibleIds,
    ...lockedCouncilIds,
  ]);

  assert.equal(allCouncilIds.length, 67);
  assert.deepEqual(lockedCouncilIds, ["auckland"]);
  assert.equal(otherEligibleIds.length, 5);
  assert.equal(represented.size, allCouncilIds.length);
});

test("the council-status list shows every regional group without nested disclosures", () => {
  assert.match(app, /const EXPLORING_BY_REGION = \[\.\.\.REGIONS_N, \.\.\.REGIONS_S\]/);
  assert.match(app, /<section className="simpleStatusRegion" key=\{region\}>/);
  assert.match(app, /className="simpleStatusRegions"/);
  assert.match(app, /\{councils\.length\} \{councils\.length === 1 \? "council" : "councils"\}/);
  assert.doesNotMatch(app, /<details className="simpleStatusRegion"/);
  assert.match(app, /grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/);
});

test("Kāpiti-Horowhenua and Nelson-Tasman positions are qualified", () => {
  assert.match(
    app,
    /kapiti: "No decision has been made\.[\s\S]*standalone Kāpiti authority was the first preference \(43%\)[\s\S]*Kāpiti with Horowhenua was the second preference \(36\.2%\)/
  );
  assert.match(app, /horowhenua: "In discussions with Kāpiti/);
  assert.match(app, /nelson: "Supports amalgamation with Tasman District Council/);
  assert.match(app, /tasman: "Remains opposed to amalgamating with Nelson/);
});

test("the MartinJenkins Head Start update is cited in About and the source register", () => {
  const citation =
    "Carlaw, N. (2026). <cite>Head Start map update</cite>. MartinJenkins. LinkedIn. 28 July 2026.";
  assert.ok(about.includes(citation));
  assert.match(about, /<section class="panel" id="sources"/);
  assert.match(sourceRegister, /"head_start_map_update","MartinJenkins; Nick Carlaw"/);
  assert.match(
    sourceRegister,
    /Used only for the status notes below the starter combinations; the main options remain unchanged/
  );
  assert.doesNotMatch(app, /Source: Carlaw/);
  assert.doesNotMatch(app, /Head Start map update<\/cite>/);
  assert.match(
    app,
    /<a href="about\/#sources">Sources and status notes<\/a>/
  );
});

test("Amalgamation.nz is included as a supplementary source", () => {
  assert.match(
    about,
    /<a href="https:\/\/amalgamation\.nz\/">Council amalgamation and merger news<\/a>/
  );
  assert.match(
    sourceRegister,
    /"amalgamation_nz","Amalgamation\.nz","Council amalgamation and merger news"/
  );
  assert.match(sourceRegister, /not as a numerical model input/);
  assert.match(sourceRegister, /A tag or mention alone is not treated as a council decision/);
});
