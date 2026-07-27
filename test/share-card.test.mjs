import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const app = fs.readFileSync(path.join(repoRoot, "src", "App.jsx"), "utf8");

test("visible app copy contains no common UTF-8 mojibake markers", () => {
  assert.doesNotMatch(app, /â|Ã|Â|�/);
});

test("the downloadable card includes the selected name and both result explanations", () => {
  assert.match(app, /ctx\.fillText\(finding\.councilName, 56, y\)/);
  assert.match(app, /drawShareCard\(canvas, finding, rates, netAssets, totalArea\)/);
  assert.match(app, /RESIDENTIAL RATES/i);
  assert.match(app, /NET ASSETS PER RESIDENT/i);
  assert.match(app, /WHAT THESE ESTIMATES MEAN/);
  assert.match(app, /published 2024\/25 average residential bills weighted by household count/);
  assert.match(app, /30 June 2024 council-only accounts divided by 2024 population/);
  assert.match(app, /labelFor: \(row\) =>[\s\S]*money\(row\.before\).*now/);
});

test("the downloadable card lists the selected councils", () => {
  assert.match(app, /councilNames: members\.map\(\(member\) => member\.name\)/);
  assert.match(app, /ctx\.fillText\("COUNCILS INCLUDED", 56, y\)/);
  assert.match(app, /const councilList = finding\.councilNames\.join\(" · "\)/);
  assert.match(app, /const cardHeight = CARD_H \+ extraCouncilLines \* 23/);
  assert.match(app, /councilLines\.forEach\(\(line, index\) =>/);
});

test("the population-balance panel follows the combined-summary strip", () => {
  const summaryStrip = app.indexOf(
    '<div className="simpleStats" aria-label="Combined council summary">'
  );
  const balancePanel = app.indexOf(
    '<p className="simpleEyebrow">Balance of the new council</p>'
  );
  const balanceArticle = app.lastIndexOf(
    '<article className="simplePanel">',
    balancePanel
  );
  const ratesPanel = app.indexOf(
    '<p className="simpleEyebrow">Residential rates</p>'
  );

  assert.notEqual(summaryStrip, -1);
  assert.notEqual(balancePanel, -1);
  assert.notEqual(balanceArticle, -1);
  assert.notEqual(ratesPanel, -1);
  assert.ok(
    summaryStrip < balancePanel,
    "Balance of the new council should follow the combined-summary strip"
  );
  assert.ok(balancePanel < ratesPanel, "The population balance should appear before rates");

  const summaryThroughBalance = app.slice(summaryStrip, balanceArticle);
  assert.doesNotMatch(
    summaryThroughBalance,
    /<article className=/,
    "No other result panel should sit between the summary strip and population balance"
  );
});
