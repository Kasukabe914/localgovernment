import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const TRACKER_SRC = "https://cloud.umami.is/script.js";
const WEBSITE_ID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const TRACKED_DOMAINS = "www.amalgamator.nz,amalgamator.nz";

async function htmlFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const target = path.join(directory, entry.name);
      if (entry.isDirectory()) return htmlFiles(target);
      return entry.isFile() && entry.name.endsWith(".html") ? [target] : [];
    })
  );
  return files.flat();
}

const privacyFilter = `  <script>
    window.amalgamatorAnalyticsBeforeSend = function (type, payload) {
      if (!payload || typeof payload !== "object") return payload;
      var envelope = payload.payload && typeof payload.payload === "object"
        ? payload.payload
        : payload;
      if (typeof envelope.url === "string") {
        try {
          var parsed = new URL(envelope.url, window.location.origin);
          var retained = new URLSearchParams();
          var source = parsed.searchParams.get("utm_source");
          var medium = parsed.searchParams.get("utm_medium");
          var campaign = parsed.searchParams.get("utm_campaign");
          var content = parsed.searchParams.get("utm_content");
          if (["facebook", "linkedin", "x", "reddit"].indexOf(source) !== -1) {
            retained.set("utm_source", source);
          }
          if (medium === "social") retained.set("utm_medium", medium);
          if (campaign === "result_share") retained.set("utm_campaign", campaign);
          if (content === "share_icon") retained.set("utm_content", content);
          parsed.search = retained.toString();
          parsed.hash = "";
          envelope.url = parsed.pathname + parsed.search;
        } catch (error) {
          envelope.url = envelope.url.split("?")[0].split("#")[0];
        }
      }
      if (typeof envelope.referrer === "string" && envelope.referrer) {
        try {
          var referrer = new URL(envelope.referrer, window.location.origin);
          referrer.search = "";
          referrer.hash = "";
          envelope.referrer = referrer.origin + referrer.pathname;
        } catch (error) {
          envelope.referrer = envelope.referrer.split("?")[0].split("#")[0];
        }
      }
      return payload;
    };
  </script>
`;

export async function injectAnalytics({
  distDir = path.resolve("dist"),
  websiteId = process.env.UMAMI_WEBSITE_ID?.trim() || "",
} = {}) {
  if (!websiteId) {
    return { enabled: false, injected: [], skipped: [] };
  }
  if (!WEBSITE_ID_PATTERN.test(websiteId)) {
    throw new Error("UMAMI_WEBSITE_ID must be a valid UUID.");
  }

  const tracker =
    `  <script defer src="${TRACKER_SRC}" ` +
    `data-website-id="${websiteId}" ` +
    `data-domains="${TRACKED_DOMAINS}" ` +
    `data-do-not-track="true" ` +
    `data-exclude-hash="true" ` +
    `data-before-send="amalgamatorAnalyticsBeforeSend"></script>\n`;
  const snippet = privacyFilter + tracker;
  const injected = [];
  const skipped = [];

  for (const file of await htmlFiles(distDir)) {
    const html = await fs.readFile(file, "utf8");
    const relative = path.relative(distDir, file).replaceAll("\\", "/");
    const isRedirect =
      /<meta[^>]+http-equiv=["']refresh["']/i.test(html) ||
      /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html);

    if (isRedirect || html.includes("data-website-id=")) {
      skipped.push(relative);
      continue;
    }
    if (!/<\/body>/i.test(html)) {
      throw new Error(`Cannot inject analytics: ${relative} has no </body>.`);
    }

    await fs.writeFile(file, html.replace(/<\/body>/i, `${snippet}</body>`));
    injected.push(relative);
  }

  return { enabled: true, injected, skipped };
}

const isMain =
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (isMain) {
  const result = await injectAnalytics();
  if (!result.enabled) {
    console.log("Umami Analytics disabled: UMAMI_WEBSITE_ID is not set.");
  } else {
    console.log(
      `Umami Analytics injected into ${result.injected.length} HTML page(s); ` +
        `${result.skipped.length} redirect or existing-tracker page(s) skipped.`
    );
  }
}
