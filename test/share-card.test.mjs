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
  assert.match(app, /HISTORIC NET ASSETS PER RESIDENT/i);
  assert.match(app, /WHAT THESE ESTIMATES MEAN/);
  assert.match(app, /Rates compare published 2024\/25 council averages weighted by the report's Stats NZ household count—not individual property forecasts/);
  assert.match(app, /Net assets use 30 June 2024 council-only accounts and 2024 population—not post-reform balance sheets/);
  assert.match(app, /Water follows each source date; later transfers and charges are ignored/);
  assert.equal(
    [...app.matchAll(/Water follows each source date/g)].length,
    1,
    "the common water caveat should appear only once on the card"
  );
  assert.match(app, /"Historic net assets per resident · 30 June 2024"/);
  assert.match(app, /labelFor: \(row\) => `\$\{row\.council\.name\} · \$\{money\(row\.before\)\}`/);
  assert.doesNotMatch(app, /money\(row\.before\)\} at 30 Jun 2024/);
  assert.match(app, /fitText\(ctx, label, width - 190, 17, 650, 11\)/);
  assert.match(app, /ctx\.fillText\("CURRENT STATE", x, y\)/);
  assert.match(app, /ctx\.fillText\("AFTER AMALGAMATION", x \+ width, y\)/);
  assert.equal(
    [...app.matchAll(/drawCardColumnHeaders\(ctx, (?:ratesX|assetsX)[^)]+\)/g)].length,
    2,
    "both sharing-card panels should label their columns"
  );
});

test("both result explanations frame the estimates as direction rather than final results", () => {
  const heading =
    /<summary>These figures show a possible direction rather than a final result<\/summary>/g;
  assert.equal([...app.matchAll(heading)].length, 2);
  assert.doesNotMatch(app, /<summary>How to read this estimate<\/summary>/);
  assert.match(app, /does not reconstruct the residential rates pool or forecast an\s+individual property/);
  assert.match(app, /alter the size, timing\s+and direction of a property-level change/);
});

test("the downloadable card lists the selected councils", () => {
  assert.match(app, /councilNames: members\.map\(\(member\) => member\.name\)/);
  assert.match(app, /ctx\.fillText\("COUNCILS INCLUDED", 56, y\)/);
  assert.match(app, /const councilList = finding\.councilNames\.join\(" · "\)/);
  assert.match(
    app,
    /const cardHeight = CARD_H \+ extraCouncilLines \* 23 \+ outsideHeadStartHeight/
  );
  assert.match(app, /councilLines\.forEach\(\(line, index\) =>/);
});

test("Auckland scenarios carry the Head Start warning into shared outputs", () => {
  assert.match(app, /outsideHeadStart: members\.some\(\(member\) => member\.locked\)/);
  assert.match(app, /Hypothetical only: Auckland is expressly excluded from Head Start/);
  assert.match(app, /HYPOTHETICAL ONLY · AUCKLAND IS OUTSIDE HEAD START/);
  assert.match(app, /Hypothetical only: Auckland is outside Head Start/);
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
