import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const BEACON_SRC = "https://static.cloudflareinsights.com/beacon.min.js";
const TOKEN_PATTERN = /^[A-Za-z0-9_-]{16,128}$/;

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

export async function injectAnalytics({
  distDir = path.resolve("dist"),
  token = process.env.CLOUDFLARE_WEB_ANALYTICS_TOKEN?.trim() || "",
} = {}) {
  if (!token) {
    return { enabled: false, injected: [], skipped: [] };
  }
  if (!TOKEN_PATTERN.test(token)) {
    throw new Error(
      "CLOUDFLARE_WEB_ANALYTICS_TOKEN must be 16–128 URL-safe characters."
    );
  }

  const beaconConfig = JSON.stringify({ token }).replace(/'/g, "&#39;");
  const snippet =
    `  <script type="module" src="${BEACON_SRC}" ` +
    `data-cf-beacon='${beaconConfig}'></script>\n`;
  const injected = [];
  const skipped = [];

  for (const file of await htmlFiles(distDir)) {
    const html = await fs.readFile(file, "utf8");
    const relative = path.relative(distDir, file).replaceAll("\\", "/");
    const isRedirect =
      /<meta[^>]+http-equiv=["']refresh["']/i.test(html) ||
      /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html);

    if (isRedirect || html.includes("data-cf-beacon=")) {
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
    console.log(
      "Cloudflare Web Analytics disabled: CLOUDFLARE_WEB_ANALYTICS_TOKEN is not set."
    );
  } else {
    console.log(
      `Cloudflare Web Analytics injected into ${result.injected.length} HTML page(s); ` +
        `${result.skipped.length} redirect or existing-beacon page(s) skipped.`
    );
  }
}
