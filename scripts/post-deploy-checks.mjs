import { appendFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const CANONICAL_ORIGIN = "https://www.amalgamator.nz";

export const extractSitemapUrls = (xml) =>
  [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) =>
    match[1].replaceAll("&amp;", "&").trim()
  );

export const extractCanonical = (html) => {
  const linkTags = html.match(/<link\b[^>]*>/gi) || [];
  const canonicalTag = linkTags.find((tag) =>
    /\brel=["'][^"']*\bcanonical\b[^"']*["']/i.test(tag)
  );
  return canonicalTag?.match(/\bhref=["']([^"']+)["']/i)?.[1] || null;
};

export const extractStructuredData = (html) =>
  [...html.matchAll(
    /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  )].map((match) => JSON.parse(match[1]));

export const collectSchemaTypes = (documents) => {
  const types = new Set();
  const visit = (value) => {
    if (!value || typeof value !== "object") return;
    const type = value["@type"];
    if (Array.isArray(type)) type.forEach((item) => types.add(item));
    else if (type) types.add(type);
    if (Array.isArray(value["@graph"])) value["@graph"].forEach(visit);
  };
  documents.forEach(visit);
  return types;
};

const sleep = (milliseconds) =>
  new Promise((resolvePromise) => setTimeout(resolvePromise, milliseconds));

const writeSummary = (lines) => {
  if (!process.env.GITHUB_STEP_SUMMARY) return;
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${lines.join("\n")}\n`, "utf8");
};

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const fetchText = async (pathOrUrl, label) => {
  const fetchBaseUrl = process.env.FETCH_BASE_URL || CANONICAL_ORIGIN;
  const canonicalUrl = new URL(pathOrUrl, CANONICAL_ORIGIN);
  const requestUrl = new URL(canonicalUrl.pathname, fetchBaseUrl);
  requestUrl.searchParams.set(
    "deployment-check",
    process.env.GITHUB_SHA || Date.now().toString()
  );

  const retries = Number(process.env.HEALTHCHECK_RETRIES || 1);
  const delay = Number(process.env.HEALTHCHECK_RETRY_DELAY_MS || 1000);
  let lastError;

  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      const response = await fetch(requestUrl, {
        headers: {
          "cache-control": "no-cache",
          "user-agent": "The-Amalgamator-Deployment-Guard/1.0",
        },
      });
      if (!response.ok) {
        throw new Error(`${label} returned HTTP ${response.status}`);
      }
      return await response.text();
    } catch (error) {
      lastError = error;
      if (attempt < retries) await sleep(delay);
    }
  }

  throw lastError;
};

export async function runProductionChecks() {
  const passed = [];
  const indexNowKey = process.env.INDEXNOW_KEY;

  const robots = await fetchText("/robots.txt", "robots.txt");
  assert(/User-agent:\s*\*\s+Allow:\s*\//i.test(robots), "robots.txt does not allow general crawling");
  assert(
    robots.includes(`Sitemap: ${CANONICAL_ORIGIN}/sitemap.xml`),
    "robots.txt does not reference the canonical sitemap"
  );
  passed.push("robots.txt is accessible and references the canonical sitemap");

  const sitemap = await fetchText("/sitemap.xml", "sitemap.xml");
  const sitemapUrls = extractSitemapUrls(sitemap);
  assert(sitemapUrls.length > 0, "sitemap.xml contains no canonical URLs");
  assert(
    new Set(sitemapUrls).size === sitemapUrls.length,
    "sitemap.xml contains duplicate URLs"
  );
  for (const url of sitemapUrls) {
    assert(
      new URL(url).origin === CANONICAL_ORIGIN,
      `Sitemap URL is outside ${CANONICAL_ORIGIN}: ${url}`
    );
  }
  passed.push(`sitemap.xml is valid and lists ${sitemapUrls.length} canonical pages`);

  const requiredTypes = new Map([
    ["/", ["WebSite", "WebApplication", "FAQPage"]],
    ["/about/", ["WebPage"]],
    ["/council-data/", ["Dataset"]],
  ]);

  for (const canonicalUrl of sitemapUrls) {
    const page = await fetchText(canonicalUrl, canonicalUrl);
    const canonical = extractCanonical(page);
    assert(canonical, `${canonicalUrl} has no canonical link`);
    assert(
      new URL(canonical, CANONICAL_ORIGIN).href === new URL(canonicalUrl).href,
      `${canonicalUrl} declares the wrong canonical URL: ${canonical}`
    );

    const structuredData = extractStructuredData(page);
    assert(structuredData.length > 0, `${canonicalUrl} has no JSON-LD structured data`);
    const types = collectSchemaTypes(structuredData);
    for (const requiredType of requiredTypes.get(new URL(canonicalUrl).pathname) || []) {
      assert(
        types.has(requiredType),
        `${canonicalUrl} is missing ${requiredType} structured data`
      );
    }

    if (new URL(canonicalUrl).pathname === "/council-data/") {
      const rowCount = [
        ...page.matchAll(/<tr(?: id="[^"]+")? data-council="[^"]+"/g),
      ].length;
      assert(rowCount === 67, `Council data page has ${rowCount} rows instead of 67`);
    }

    passed.push(`${canonicalUrl} returned valid canonical and structured data`);
  }

  if (indexNowKey) {
    const keyFile = await fetchText(`/${indexNowKey}.txt`, "IndexNow key file");
    assert(keyFile.trim() === indexNowKey, "IndexNow key file content does not match its key");
    passed.push("IndexNow ownership key is publicly accessible");
  }

  console.log(passed.map((item) => `PASS: ${item}`).join("\n"));
  writeSummary([
    "## Production deployment guard",
    "",
    ...passed.map((item) => `- PASS: ${item}`),
  ]);
  return { passed, sitemapUrls };
}

async function main() {
  try {
    await runProductionChecks();
  } catch (error) {
    console.error(`::error title=Production deployment guard failed::${error.message}`);
    writeSummary([
      "## Production deployment guard",
      "",
      `- FAILED: ${error.message}`,
    ]);
    process.exitCode = 1;
  }
}

const isMain =
  process.argv[1] &&
  pathToFileURL(resolve(process.argv[1])).href === import.meta.url;
if (isMain) await main();
