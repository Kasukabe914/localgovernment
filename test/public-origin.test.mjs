import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicFacingFiles = [
  "index.html",
  "OUTPUT-LICENCE.md",
  "README.md",
  "src/App.jsx",
  "public/about/index.html",
  "public/privacy.html",
  "public/privacy-policy/index.html",
  "public/methodology.html",
  "share/template.html",
  "share/worker.js",
];

test("public metadata and sharing code use the custom domain exclusively", () => {
  const contents = publicFacingFiles
    .map((file) => `${file}\n${fs.readFileSync(path.join(repoRoot, file), "utf8")}`)
    .join("\n");

  assert.doesNotMatch(contents, /kasukabe914\.github\.io\/localgovernment/i);
  assert.match(contents, /https:\/\/www\.amalgamator\.nz\//);
});

test("root metadata declares the custom canonical and social image", () => {
  const index = fs.readFileSync(path.join(repoRoot, "index.html"), "utf8");

  assert.match(
    index,
    /<link rel="canonical" href="https:\/\/www\.amalgamator\.nz\/" \/>/
  );
  assert.match(
    index,
    /<meta property="og:url" content="https:\/\/www\.amalgamator\.nz\/" \/>/
  );
  assert.match(
    index,
    /<meta property="og:image" content="https:\/\/www\.amalgamator\.nz\/og-image-2\.jpg" \/>/
  );
  assert.match(
    index,
    /<meta property="og:image:secure_url" content="https:\/\/www\.amalgamator\.nz\/og-image-2\.jpg" \/>/
  );
  assert.match(
    index,
    /<meta name="twitter:image" content="https:\/\/www\.amalgamator\.nz\/og-image-2\.jpg" \/>/
  );
  assert.match(index, /<meta property="og:image:width" content="1200" \/>/);
  assert.match(index, /<meta property="og:image:height" content="627" \/>/);
  assert.ok(fs.existsSync(path.join(repoRoot, "public", "og-image-2.jpg")));
});
