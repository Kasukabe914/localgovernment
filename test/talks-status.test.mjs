import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (relativePath) =>
  readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");

const app = read("src/App.jsx");
const about = read("public/about/index.html");
const sourceRegister = read("public/source-register.csv");

test("homepage variants use stable assignment and exclude review overrides", () => {
  assert.match(app, /new URLSearchParams\(window\.location\.search\)\.get\("variant"\)/);
  assert.match(app, /HOMEPAGE_VARIANT_KEY = "amalgamator-homepage-variant-v1"/);
  assert.match(app, /window\.localStorage\.getItem\(HOMEPAGE_VARIANT_KEY\)/);
  assert.match(app, /window\.localStorage\.setItem\(HOMEPAGE_VARIANT_KEY, assigned\)/);
  assert.match(app, /Math\.random\(\) < 0\.5 \? "a" : "b"/);
  assert.match(app, /homepageExperiment\.isOverride/);
  assert.match(app, /JOURNEY_EVENTS\.viewedHomepageVariantA/);
  assert.match(app, /JOURNEY_EVENTS\.viewedHomepageVariantB/);
  assert.match(app, /screen === "start" && homepageVariant === "a"/);
  assert.match(app, /screen === "talks" \|\| \(screen === "start" && homepageVariant === "b"\)/);
});

test("the main current-talks combinations reflect the 3 August snapshot", () => {
  const articlePreset = app.match(
    /article:\s*\{\s*label: "Where talks stand, 3 August",\s*groups: \[([\s\S]*?)\],\s*\},\s*wgtnOne:/
  )?.[1];
  assert.ok(articlePreset, "current-talks preset is present");
  for (const expected of [
    "Far North unitary option",
    "Whangārei–Kaipara option",
    "The Fruit Bowl",
    "South Waikato option",
    "Rotorua unitary option",
    "Stratford–South Taranaki",
    "Metropolitan Wellington proposal in development",
    "Kaikōura–Marlborough option",
    "West Coast option",
    "Aoraki option",
    "Inland Otago",
    "Dunedin preference",
    "Selwyn unitary option",
  ]) assert.ok(articlePreset.includes(`name: "${expected}"`), expected);
  assert.match(articlePreset, /ids: \["wellington", "hutt", "porirua", "upperhutt"\]/);
  assert.match(articlePreset, /Upper Hutt's inclusion is permitted[\s\S]*does not imply its agreement/);
  assert.doesNotMatch(articlePreset, /Inland Otago \+ Gore|The Deep South|The Sunrise Coast/);
});

test("the status model distinguishes the map's resolution categories", () => {
  assert.match(app, /const POSITION = \{[\s\S]*PREFERRED:[\s\S]*NOT_SUBMITTING:[\s\S]*NON_CONFORMING:[\s\S]*NO_RESOLUTION:/);
  assert.match(app, /rangitikei: \{ category: POSITION\.NON_CONFORMING/);
  for (const id of ["kaipara", "taupo", "ruapehu", "manawatu", "wairoa", "buller", "tararua"]) {
    assert.match(app, new RegExp(`${id}: \\{ category: POSITION\\.NOT_SUBMITTING`), id);
  }
  assert.match(app, /Snapshot as at 3 August 2026/);
  assert.match(app, /A council named in another council's preferred[\s\S]*not treated as having agreed/);
});

test("Wellington is included without misrepresenting Upper Hutt support", () => {
  assert.match(app, /wellington: \{ category: POSITION\.NO_RESOLUTION[\s\S]*includes Upper Hutt/);
  assert.match(app, /upperhutt: \{ category: POSITION\.NO_RESOLUTION[\s\S]*does not indicate Upper Hutt's agreement/);
  assert.match(app, /Metropolitan Wellington proposal in development/);
});

test("a status council opens the chooser preselected", () => {
  assert.match(app, /const chooseStatusCouncil = \(id\) =>/);
  assert.match(app, /setSelectedIds\(\[id\]\)/);
  assert.match(app, /setRegion\(council\.region\)/);
  assert.match(app, /setScreen\("build"\)/);
  assert.match(app, /className="simpleExploringCouncil"[\s\S]*onClick=\{\(\) => chooseStatusCouncil\(council\.id\)\}/);
});

test("every simple-app screen transition resets the page to the top", () => {
  assert.match(app, /const resetAppScroll = \(\) => \{[\s\S]*window\.scrollTo\(\{ top: 0, left: 0, behavior: "auto" \}\);/);
  assert.match(app, /window\.requestAnimationFrame\?\.\(resetAppScroll\)/);
});

test("where things stand retains complete authority coverage", () => {
  assert.match(app, /const CURRENT_TALKS_COUNCIL_IDS = new Set\([\s\S]*PRESETS\.article\.groups\.flatMap/);
  assert.match(app, /const OTHER_HEAD_START_COUNCILS = COUNCILS\.filter/);
  assert.match(app, /const OUTSIDE_HEAD_START_COUNCILS = COUNCILS\.filter\(\(council\) => council\.locked\)/);
  assert.match(app, /<summary>Other eligible councils<\/summary>/);
  assert.match(app, /<summary>Outside Head Start<\/summary>/);
  const councilBlock = app.match(/const COUNCILS = \[([\s\S]*?)\];/)?.[1] || "";
  assert.equal([...councilBlock.matchAll(/\{ id: "([^"]+)"/g)].length, 67);
});

test("the council-status list shows regional groups and category labels", () => {
  assert.match(app, /const EXPLORING_BY_REGION = \[\.\.\.REGIONS_N, \.\.\.REGIONS_S\]/);
  assert.match(app, /<section className="simpleStatusRegion" key=\{region\}>/);
  assert.match(app, /POSITION_LABEL\[category\]/);
  assert.doesNotMatch(app, /<details className="simpleStatusRegion"/);
});

test("qualified Kāpiti-Horowhenua and Nelson-Tasman notes remain", () => {
  assert.match(app, /kapiti: "No decision has been made\.[\s\S]*43%[\s\S]*36\.2%/);
  assert.match(app, /horowhenua: "In discussions with Kāpiti/);
  assert.match(app, /nelson: "Supports amalgamation with Tasman District Council/);
  assert.match(app, /tasman: "Remains opposed to amalgamating with Nelson/);
});

test("the 3 August MartinJenkins update is cited", () => {
  assert.match(sourceRegister, /"head_start_map_update_2026_08_03","MartinJenkins; Tessa McGregor \(Irving\)"/);
  assert.match(sourceRegister, /https:\/\/nz\.linkedin\.com\/company\/martinjenkins/);
  assert.match(about, /Head Start – map update/);
  assert.match(about, /3 August 2026/);
});

test("the updated Otago options are qualified and sourced", () => {
  assert.match(app, /Matching preferred-option resolutions across Central Otago, Clutha and Queenstown Lakes/);
  assert.match(app, /Dunedin resolved on an option with Clutha and potentially Waitaki/);
  assert.match(sourceRegister, /"otago_unitary_options","RNZ; Local Democracy Reporting"/);
});
