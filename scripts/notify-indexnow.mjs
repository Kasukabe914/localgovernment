import { appendFileSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { extractSitemapUrls } from "./post-deploy-checks.mjs";

const CANONICAL_ORIGIN = "https://www.amalgamator.nz";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/IndexNow";

const unique = (values) => [...new Set(values)];

export const selectChangedUrls = (
  changedFiles,
  currentUrls,
  previousUrls = []
) => {
  const allKnownUrls = unique([...currentUrls, ...previousUrls]);
  const byPath = new Map(
    allKnownUrls.map((url) => [new URL(url).pathname, url])
  );
  const selected = new Set();

  const selectAll = changedFiles.some(
    (file) =>
      file === "public/sitemap.xml" ||
      file === ".github/workflows/deploy-pages.yml" ||
      file === "scripts/notify-indexnow.mjs"
  );
  if (selectAll) return allKnownUrls;

  for (const file of changedFiles) {
    if (file === "index.html" || file.startsWith("src/")) {
      if (byPath.has("/")) selected.add(byPath.get("/"));
    }
    if (file.startsWith("public/about/")) {
      if (byPath.has("/about/")) selected.add(byPath.get("/about/"));
    }
    if (
      file.startsWith("public/council-data/") ||
      file === "public/the-amalgamator-data.csv" ||
      file === "scripts/generate-council-data.mjs"
    ) {
      if (byPath.has("/council-data/")) selected.add(byPath.get("/council-data/"));
    }
  }

  return [...selected];
};

export const buildIndexNowPayload = (key, urlList) => ({
  host: new URL(CANONICAL_ORIGIN).host,
  key,
  keyLocation: `${CANONICAL_ORIGIN}/${key}.txt`,
  urlList,
});

const writeSummary = (lines) => {
  if (!process.env.GITHUB_STEP_SUMMARY) return;
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${lines.join("\n")}\n`, "utf8");
};

const readPushContext = () => {
  if (process.env.GITHUB_EVENT_NAME !== "push" || !process.env.GITHUB_EVENT_PATH) {
    return null;
  }
  return JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, "utf8"));
};

const gitOutput = (args) =>
  execFileSync("git", args, { encoding: "utf8" }).trim();

const previousSitemapUrls = (beforeSha) => {
  if (!beforeSha || /^0+$/.test(beforeSha)) return [];
  try {
    const xml = gitOutput(["show", `${beforeSha}:public/sitemap.xml`]);
    return extractSitemapUrls(xml);
  } catch {
    return [];
  }
};

const changedFiles = (event) => {
  if (!event?.before || !event?.after) return [];
  try {
    return gitOutput(["diff", "--name-only", event.before, event.after])
      .split(/\r?\n/)
      .filter(Boolean);
  } catch {
    return [];
  }
};

const fetchCurrentSitemap = async () => {
  const fetchBase = process.env.FETCH_BASE_URL || CANONICAL_ORIGIN;
  const sitemapUrl = new URL("/sitemap.xml", fetchBase);
  sitemapUrl.searchParams.set("indexnow", process.env.GITHUB_SHA || Date.now().toString());
  const response = await fetch(sitemapUrl, {
    headers: {
      "cache-control": "no-cache",
      "user-agent": "The-Amalgamator-IndexNow/1.0",
    },
  });
  if (!response.ok) throw new Error(`sitemap.xml returned HTTP ${response.status}`);
  return extractSitemapUrls(await response.text());
};

const submit = async (payload) => {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(INDEXNOW_ENDPOINT, {
        method: "POST",
        headers: { "content-type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
      });
      if (response.status === 200 || response.status === 202) return response.status;
      const body = await response.text();
      throw new Error(`IndexNow returned HTTP ${response.status}${body ? `: ${body}` : ""}`);
    } catch (error) {
      lastError = error;
      if (attempt < 3) {
        await new Promise((resolvePromise) =>
          setTimeout(resolvePromise, attempt * 2000)
        );
      }
    }
  }
  throw lastError;
};

export async function notifyIndexNow() {
  const key = process.env.INDEXNOW_KEY;
  if (!key || !/^[A-Za-z0-9_-]{8,128}$/.test(key)) {
    throw new Error("INDEXNOW_KEY is missing or invalid");
  }

  const currentUrls = await fetchCurrentSitemap();
  const event = readPushContext();
  const files = event ? changedFiles(event) : [];
  const previousUrls = event ? previousSitemapUrls(event.before) : [];
  const urlList =
    process.env.INDEXNOW_FORCE_ALL === "1" || !event
      ? currentUrls
      : selectChangedUrls(files, currentUrls, previousUrls);

  if (urlList.length === 0) {
    console.log("No canonical page changes detected; IndexNow submission skipped.");
    writeSummary([
      "## IndexNow",
      "",
      "- No canonical page changes detected; submission skipped.",
    ]);
    return { skipped: true, urlList: [] };
  }

  const payload = buildIndexNowPayload(key, urlList);
  if (process.env.INDEXNOW_DRY_RUN === "1") {
    console.log(JSON.stringify(payload, null, 2));
    return { dryRun: true, payload, urlList };
  }

  const status = await submit(payload);
  console.log(`IndexNow accepted ${urlList.length} URL(s) with HTTP ${status}.`);
  writeSummary([
    "## IndexNow",
    "",
    `- Submitted ${urlList.length} changed canonical URL(s).`,
    ...urlList.map((url) => `  - ${url}`),
  ]);
  return { status, payload, urlList };
}

async function main() {
  try {
    await notifyIndexNow();
  } catch (error) {
    console.error(`::error title=IndexNow submission failed::${error.message}`);
    writeSummary(["## IndexNow", "", `- FAILED: ${error.message}`]);
    process.exitCode = 1;
  }
}

const isMain =
  process.argv[1] &&
  pathToFileURL(resolve(process.argv[1])).href === import.meta.url;
if (isMain) await main();
