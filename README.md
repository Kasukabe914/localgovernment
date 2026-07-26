# The Amalgamator

An independent modelling tool for exploring possible New Zealand local-government amalgamations.

Users can:

- start from a dated snapshot of reported council talks;
- select councils within or across regions;
- distinguish nearby options from councils further afield;
- compare indicative residential-rates redistribution;
- choose from curated council names; and
- share a link that restores the selected combination.

The interface is intentionally limited to one proposed council at a time.

## Requirements

- Node.js 22 or later
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Build locally

```bash
npm run build
```

The production site is written to `dist/`.

## Deploy with GitHub Pages

This package includes `.github/workflows/deploy-pages.yml`.

1. Copy every file in this package into the root of your GitHub repository.
2. Commit and push the files to the `main` branch.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to **GitHub Actions**.
5. Open the repository’s **Actions** tab and wait for **Deploy to GitHub Pages** to complete.

The Vite configuration derives the repository name automatically during GitHub Actions, so project sites such as `https://USERNAME.github.io/REPOSITORY/` receive the correct asset paths.

## Suggested Git commands

From the root of an existing checkout:

```bash
git add .
git commit -m "Simplify the Amalgamator user experience"
git push origin main
```

Review the staged files with `git status` and `git diff --staged` before committing.

## Important files

- `council-jigsaw-simple.jsx` — application, data, calculations, and styles
- `main.jsx` — React entry point
- `public/methodology.html` — methodology and caveats
- `public/the-amalgamator-data.csv` — downloadable dataset
- `vite.config.js` — local and GitHub Pages build configuration
- `.github/workflows/deploy-pages.yml` — automatic Pages deployment

## Modelling limitations

This is an independent modelling tool. It is not an official proposal or a prediction of any household’s rates.

The methodology page documents the sources, calculations, data vintages, and known limitations. The current-talks shortcut is a dated snapshot and should be reviewed whenever reported negotiations change.

## Licence and attribution

Application code is licensed under CC BY 4.0. Crown data from DIA and Stats NZ is used under CC BY 4.0. Ratepayers’ Report data remains subject to the New Zealand Taxpayers’ Union’s terms.
