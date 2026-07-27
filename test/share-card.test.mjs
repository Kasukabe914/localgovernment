import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const app = fs.readFileSync(path.join(repoRoot, "src", "App.jsx"), "utf8");

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

test("the population-balance panel follows the dark sharing panel", () => {
  const sharePanel = app.indexOf('<article className="simpleSharePanel">');
  const balancePanel = app.indexOf(
    '<p className="simpleEyebrow">Balance of the new council</p>'
  );

  assert.notEqual(sharePanel, -1);
  assert.notEqual(balancePanel, -1);
  assert.ok(
    sharePanel < balancePanel,
    "Balance of the new council should appear immediately after the share panel"
  );

  const shareThroughBalance = app.slice(sharePanel, balancePanel + 100);
  assert.match(
    shareThroughBalance,
    /<\/article>\s*<article className="simplePanel">\s*<p className="simpleEyebrow">Balance of the new council<\/p>/
  );
});
