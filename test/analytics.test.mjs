import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { injectAnalytics } from "../scripts/inject-analytics.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const websiteId = "5fe87066-597c-45b4-be73-644b861eba20";
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

    const disabled = await injectAnalytics({ distDir, websiteId: "" });
    assert.equal(disabled.enabled, false);
    assert.doesNotMatch(
      await fs.readFile(path.join(distDir, "index.html"), "utf8"),
      /data-website-id/
    );

    const enabled = await injectAnalytics({ distDir, websiteId });
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
        /<script defer src="https:\/\/cloud\.umami\.is\/script\.js"/
      );
      assert.match(html, new RegExp(`data-website-id="${websiteId}"`));
      assert.match(
        html,
        /data-domains="www\.amalgamator\.nz,amalgamator\.nz"/
      );
      assert.match(html, /data-do-not-track="true"/);
      assert.match(html, /data-exclude-hash="true"/);
      assert.match(
        html,
        /data-before-send="amalgamatorAnalyticsBeforeSend"/
      );
      assert.equal((html.match(/data-website-id=/g) || []).length, 1);
    }

    const redirect = await fs.readFile(
      path.join(distDir, "methodology.html"),
      "utf8"
    );
    assert.doesNotMatch(redirect, /data-website-id/);

    const repeated = await injectAnalytics({ distDir, websiteId });
    assert.equal(repeated.injected.length, 0);
  } finally {
    await fs.rm(distDir, { recursive: true, force: true });
  }
});

test("the injected privacy filter removes scenario data and keeps fixed attribution", async () => {
  const distDir = await fs.mkdtemp(path.join(os.tmpdir(), "amalgamator-privacy-"));
  try {
    await fs.writeFile(path.join(distDir, "index.html"), page());
    await injectAnalytics({ distDir, websiteId });
    const html = await fs.readFile(path.join(distDir, "index.html"), "utf8");
    const inline = html.match(
      /<script>\s*(window\.amalgamatorAnalyticsBeforeSend[\s\S]*?)<\/script>/
    );
    assert.ok(inline, "privacy filter should be injected");

    const context = {
      window: { location: { origin: "https://www.amalgamator.nz" } },
      URL,
      URLSearchParams,
    };
    vm.runInNewContext(inline[1], context);

    const payload = {
      url:
        "/?m=SECRET&utm_source=linkedin&utm_medium=social&utm_campaign=result_share" +
        "&utm_content=share_icon&fbclid=TRACKER&email=person%40example.nz#scenario",
      referrer:
        "https://www.amalgamator.nz/?m=SECRET&utm_source=linkedin#scenario",
    };
    const filtered = context.window.amalgamatorAnalyticsBeforeSend(
      "event",
      payload
    );
    assert.equal(
      filtered.url,
      "/?utm_source=linkedin&utm_medium=social&utm_campaign=result_share&utm_content=share_icon"
    );
    assert.equal(filtered.referrer, "https://www.amalgamator.nz/");
    assert.doesNotMatch(JSON.stringify(filtered), /SECRET|TRACKER|person/);

    const nested = {
      payload: {
        url:
          "/?m=SECRET&utm_source=arbitrary&utm_medium=email" +
          "&utm_campaign=other&utm_content=private#fragment",
        referrer: "https://www.linkedin.com/feed/?tracking=private#fragment",
      },
    };
    const filteredNested = context.window.amalgamatorAnalyticsBeforeSend(
      "event",
      nested
    );
    assert.equal(filteredNested.payload.url, "/");
    assert.equal(
      filteredNested.payload.referrer,
      "https://www.linkedin.com/feed/"
    );
  } finally {
    await fs.rm(distDir, { recursive: true, force: true });
  }
});

test("Umami configuration, event schema, and privacy disclosure are wired into production", async () => {
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
  const app = await fs.readFile(path.join(repoRoot, "src", "App.jsx"), "utf8");

  assert.match(
    workflow,
    /UMAMI_WEBSITE_ID: \$\{\{ vars\.UMAMI_WEBSITE_ID \}\}/
  );
  assert.doesNotMatch(workflow, /CLOUDFLARE_WEB_ANALYTICS_TOKEN/);
  assert.match(packageJson.scripts.build, /scripts\/inject-analytics\.mjs/);
  assert.match(privacy, /Umami Cloud/);
  assert.match(privacy, /respect the browser's Do Not Track setting/);
  assert.match(privacy, /removes the\s+encoded council scenario/);
  assert.match(privacy, /app-generated council name selected for that share/);
  assert.match(privacy, /not\s+a free-text field/);
  assert.match(privacy, /fixed stages in the tool journey/);
  assert.match(privacy, /do not include the councils selected/);
  assert.match(privacy, /rotating pseudonymous session identifier/);
  assert.match(privacy, /does not assign a distinct ID or other permanent identifier/);
  assert.match(privacy, /Session replay and heatmaps are not enabled/);

  for (const platform of ["facebook", "x", "linkedin", "reddit"]) {
    assert.match(
      app,
      new RegExp(`onClick=\\{\\(\\) => trackShareClick\\("${platform}"\\)\\}`)
    );
  }
  assert.match(app, /trackAnalytics\("share-image-download"/);
  assert.match(app, /trackAnalytics\("share-writeup-copy"/);
  assert.match(app, /platform: "copy-link"/);
  assert.equal((app.match(/chosen_name: councilName/g) || []).length, 4);

  for (const event of [
    "viewedHomepageVariantA",
    "viewedHomepageVariantB",
    "startedAmalgamation",
    "selectedFirstCouncil",
    "addedAnotherCouncil",
    "viewedCalculatedResult",
    "completedScenario",
    "changedAssumptions",
    "sharedResult",
    "copiedOrDownloadedResult",
    "openedExplanatoryMaterial",
  ]) {
    assert.match(app, new RegExp(`JOURNEY_EVENTS\\.${event}`));
  }
  assert.doesNotMatch(app, /returnedAnotherDay|returned-another-day/);
});

test("invalid Umami website IDs fail the production build clearly", async () => {
  await assert.rejects(
    injectAnalytics({ websiteId: "not-valid", distDir: "unused" }),
    /must be a valid UUID/
  );
});
