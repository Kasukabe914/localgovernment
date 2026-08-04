import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  NET_ASSETS_2024,
  calculateNetAssetsPerCapita,
} from "../src/netAssets.js";

const council = (id, pop) => ({
  id,
  pop,
  assets24: NET_ASSETS_2024[id].assets,
  liabilities24: NET_ASSETS_2024[id].liabilities,
});

test("the source table covers all 67 territorial authorities", () => {
  assert.equal(Object.keys(NET_ASSETS_2024).length, 67);
  for (const [id, row] of Object.entries(NET_ASSETS_2024)) {
    assert.ok(Number.isFinite(row.assets) && row.assets > 0, `${id} assets`);
    assert.ok(
      Number.isFinite(row.liabilities) && row.liabilities >= 0,
      `${id} liabilities`
    );
    assert.ok(row.assets > row.liabilities, `${id} positive net assets`);
  }
});

test("the public download reconciles to the source table", () => {
  const lines = readFileSync(
    new URL("../public/the-amalgamator-data.csv", import.meta.url),
    "utf8"
  )
    .trim()
    .split(/\r?\n/);
  const parse = (line) =>
    [...line.matchAll(/"((?:[^"]|"")*)"/g)].map((match) =>
      match[1].replaceAll('""', '"')
    );
  const headers = parse(lines.shift());
  const rows = lines.map((line) =>
    Object.fromEntries(headers.map((header, index) => [header, parse(line)[index]]))
  );

  assert.equal(rows.length, 67);
  assert.deepEqual(
    new Set(rows.map((row) => row.id)),
    new Set(Object.keys(NET_ASSETS_2024))
  );
  for (const row of rows) {
    const source = NET_ASSETS_2024[row.id];
    assert.ok(source, `${row.id} has a source record`);
    assert.equal(Number(row.total_assets_2024_nzd), source.assets);
    assert.equal(Number(row.total_liabilities_2024_nzd), source.liabilities);
    assert.equal(
      Number(row.net_assets_2024_nzd),
      source.assets - source.liabilities
    );
  }
});

test("the merged result pools dollars and population before dividing", () => {
  const members = [
    council("hamilton", 189700),
    council("waikatod", 90600),
    council("waipa", 61400),
  ];
  const result = calculateNetAssetsPerCapita(members);
  const expectedAssets = members.reduce((sum, row) => sum + row.assets24, 0);
  const expectedLiabilities = members.reduce(
    (sum, row) => sum + row.liabilities24,
    0
  );
  const expectedPopulation = members.reduce((sum, row) => sum + row.pop, 0);
  const expectedMerged =
    (expectedAssets - expectedLiabilities) / expectedPopulation;

  assert.equal(result.totalAssets, expectedAssets);
  assert.equal(result.totalLiabilities, expectedLiabilities);
  assert.equal(
    result.mergedLiabilitiesPerResident,
    expectedLiabilities / expectedPopulation
  );
  assert.equal(result.totalNetAssets, expectedAssets - expectedLiabilities);
  assert.equal(result.mergedPerResident, expectedMerged);
  assert.equal(result.rows.length, members.length);
  assert.ok(
    result.rows.every((row) => row.after === result.mergedPerResident),
    "every TLA is compared with the same merged benchmark"
  );
  assert.ok(
    result.rows.every(
      (row) =>
        row.liabilitiesPerResident === row.council.liabilities24 / row.council.pop
    ),
    "every TLA exposes its liabilities per resident"
  );
  assert.equal(result.liabilityRows.length, members.length);
  assert.ok(
    result.liabilityRows.every(
      (row) => row.after === result.mergedLiabilitiesPerResident
    ),
    "every TLA is compared with the same merged liabilities benchmark"
  );
});

test("TLA changes reconcile to zero when weighted by population", () => {
  const members = [
    council("hamilton", 189700),
    council("waikatod", 90600),
    council("waipa", 61400),
    council("taupo", 42200),
    council("swaikato", 25900),
  ];
  const result = calculateNetAssetsPerCapita(members);
  const weightedChange = result.rows.reduce(
    (sum, row) => sum + row.change * row.council.pop,
    0
  );

  assert.ok(Math.abs(weightedChange) < 0.01);
  assert.deepEqual(
    result.rows.map((row) => row.change),
    [...result.rows.map((row) => row.change)].sort((a, b) => b - a)
  );
});

test("the calculation fails closed when any selected TLA lacks data", () => {
  const members = [
    council("hamilton", 189700),
    { id: "missing", pop: 1000, assets24: null, liabilities24: null },
  ];
  const result = calculateNetAssetsPerCapita(members);

  assert.equal(result.mergedPerResident, null);
  assert.equal(result.mergedLiabilitiesPerResident, null);
  assert.equal(result.rows.length, 0);
  assert.equal(result.liabilityRows.length, 0);
  assert.deepEqual(result.missing.map((row) => row.id), ["missing"]);
});
