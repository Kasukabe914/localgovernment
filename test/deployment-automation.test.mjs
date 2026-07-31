import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  collectSchemaTypes,
  extractCanonical,
  extractSitemapUrls,
  extractStructuredData,
} from "../scripts/post-deploy-checks.mjs";
import {
  buildIndexNowPayload,
  selectChangedUrls,
} from "../scripts/notify-indexnow.mjs";

const read = (relativePath) =>
  readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");

const canonicalUrls = [
  "https://www.amalgamator.nz/",
  "https://www.amalgamator.nz/about/",
  "https://www.amalgamator.nz/council-data/",
];

test("deployment parsers find sitemap URLs, canonicals and graph schema types", () => {
  assert.deepEqual(
    extractSitemapUrls(read("public/sitemap.xml")),
    canonicalUrls
  );
  assert.equal(
    extractCanonical(read("index.html")),
    "https://www.amalgamator.nz/"
  );
  const documents = extractStructuredData(read("index.html"));
  assert.deepEqual(
    [...collectSchemaTypes(documents)],
    ["WebSite", "WebApplication", "FAQPage"]
  );
});

test("IndexNow selects only affected canonical pages", () => {
  assert.deepEqual(
    selectChangedUrls(["src/App.jsx"], canonicalUrls),
    ["https://www.amalgamator.nz/"]
  );
  assert.deepEqual(
    selectChangedUrls(["public/about/index.html"], canonicalUrls),
    ["https://www.amalgamator.nz/about/"]
  );
  assert.deepEqual(
    selectChangedUrls(
      ["public/the-amalgamator-data.csv"],
      canonicalUrls
    ),
    ["https://www.amalgamator.nz/council-data/"]
  );
  assert.deepEqual(
    selectChangedUrls(["public/sitemap.xml"], canonicalUrls),
    canonicalUrls
  );
});

test("IndexNow payload uses the public same-host key location", () => {
  const key = "b583a9fc76f0257dc9b89f70fffaac88";
  assert.equal(read(`public/${key}.txt`).trim(), key);
  assert.deepEqual(buildIndexNowPayload(key, canonicalUrls), {
    host: "www.amalgamator.nz",
    key,
    keyLocation: `https://www.amalgamator.nz/${key}.txt`,
    urlList: canonicalUrls,
  });
});

test("the deployment workflow checks production before notifying IndexNow", () => {
  const workflow = read(".github/workflows/deploy-pages.yml");
  const checkPosition = workflow.indexOf("node scripts/post-deploy-checks.mjs");
  const notifyPosition = workflow.indexOf("node scripts/notify-indexnow.mjs");
  assert.ok(checkPosition > 0);
  assert.ok(notifyPosition > checkPosition);
  assert.match(workflow, /HEALTHCHECK_RETRIES: 12/);
  assert.match(workflow, /if: failure\(\)/);
});

test("production search health is also monitored between deployments", () => {
  const workflow = read(".github/workflows/production-monitor.yml");
  assert.match(workflow, /schedule:/);
  assert.match(workflow, /cron: "17 \*\/6 \* \* \*"/);
  assert.match(workflow, /node scripts\/post-deploy-checks\.mjs/);
  assert.match(workflow, /if: failure\(\)/);
});
