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
    '{ name: "Wellington metro", ids: ["wellington", "hutt", "porirua", "upperhutt"] }',
    '{ name: "The Wairarapa Three", ids: ["masterton", "carterton", "swairarapa"] }',
    '{ name: "Wine & Whales", ids: ["marlborough", "kaikoura"] }',
    '{ name: "The Coast", ids: ["buller", "grey", "westland"] }',
    '{ name: "Aoraki Council", ids: ["timaru", "mackenzie", "waimate", "waitaki"] }',
    '{ name: "Rural Southland", ids: ["southlandd", "gore"] }',
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
});
