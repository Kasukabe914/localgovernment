import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { injectAnalytics } from "../scripts/inject-analytics.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const beaconToken = "0123456789abcdef0123456789abcdef";
const page = (head = "") =>
  `<!doctype html><html><head>${head}</head><body><main>Page</main></body></html>`;

test("analytics injection is opt-in, complete, and skips redirect pages", async () => {
  const distDir = await fs.mkdtemp(path.join(os.tmpdir(), "amalgamator-analytics-"));
  try {
    await fs.mkdir(path.join(distDir, "about"), { recursive: true });
    await fs.mkdir(path.join(distDir, "privacy-policy"), { recursive: true });
    await fs.writeFile(path.join(distDir, "index.html"), page());
    await fs.writeFile(path.join(distDir, "about", "index.html"), page());
    await fs.writeFile(path.join(distDir, "privacy-policy", "index.html"), page());
    await fs.writeFile(
      path.join(distDir, "methodology.html"),
      page('<meta http-equiv="refresh" content="0; url=./about/">')
    );

    const disabled = await injectAnalytics({ distDir, token: "" });
    assert.equal(disabled.enabled, false);
    assert.doesNotMatch(
      await fs.readFile(path.join(distDir, "index.html"), "utf8"),
      /data-cf-beacon/
    );

    const enabled = await injectAnalytics({ distDir, token: beaconToken });
    assert.equal(enabled.enabled, true);
    assert.deepEqual(enabled.injected.sort(), [
      "about/index.html",
      "index.html",
      "privacy-policy/index.html",
    ]);
    assert.deepEqual(enabled.skipped, ["methodology.html"]);

    for (const relative of enabled.injected) {
      const html = await fs.readFile(path.join(distDir, relative), "utf8");
      assert.match(
        html,
        /<script type="module" src="https:\/\/static\.cloudflareinsights\.com\/beacon\.min\.js"/
      );
      assert.match(html, new RegExp(`"token":"${beaconToken}"`));
      assert.equal((html.match(/data-cf-beacon=/g) || []).length, 1);
    }

    const redirect = await fs.readFile(
      path.join(distDir, "methodology.html"),
      "utf8"
    );
    assert.doesNotMatch(redirect, /data-cf-beacon/);

    const repeated = await injectAnalytics({ distDir, token: beaconToken });
    assert.equal(repeated.injected.length, 0);
  } finally {
    await fs.rm(distDir, { recursive: true, force: true });
  }
});

test("analytics token and privacy disclosure are wired into production", async () => {
  const workflow = await fs.readFile(
    path.join(repoRoot, ".github", "workflows", "deploy-pages.yml"),
    "utf8"
  );
  const packageJson = JSON.parse(
    await fs.readFile(path.join(repoRoot, "package.json"), "utf8")
  );
  const privacy = await fs.readFile(
    path.join(repoRoot, "public", "privacy-policy", "index.html"),
    "utf8"
  );

  assert.match(
    workflow,
    /CLOUDFLARE_WEB_ANALYTICS_TOKEN: \$\{\{ vars\.CLOUDFLARE_WEB_ANALYTICS_TOKEN \}\}/
  );
  assert.match(packageJson.scripts.build, /scripts\/inject-analytics\.mjs/);
  assert.match(privacy, /Cloudflare Web Analytics/);
  assert.match(privacy, /does not use cookies or local storage/);
  assert.match(privacy, /does not log URL query strings/);
});

test("invalid analytics tokens fail the production build clearly", async () => {
  await assert.rejects(
    injectAnalytics({ token: "not valid", distDir: "unused" }),
    /must be 16–128 URL-safe characters/
  );
});
