import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// IMPORTANT for GitHub Pages project sites (username.github.io/REPO/):
// `base` must be "/REPO/" — the repository name, with both slashes.
// Get it wrong and the built page loads blank with 404s on every asset.
//
// This reads the repo name from the GITHUB_REPOSITORY env var that GitHub
// Actions sets automatically (e.g. "you/the-amalgamator" -> "/the-amalgamator/"),
// so the deploy workflow just works. For a user/org site (REPO is
// username.github.io) or a custom domain, set base to "/" instead.
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];
const base = repo && !repo.endsWith(".github.io") ? `/${repo}/` : "/";

export default defineConfig({
  base,
  plugins: [react()],
});
