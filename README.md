# The Amalgamator

An independent modelling tool for exploring possible New Zealand local-government amalgamations.

The application guides users through one proposed council at a time:

- start from a dated snapshot of reported council talks or build a combination from scratch;
- select councils within one region, from neighbouring regions, or from further afield;
- distinguish nearby options from distant councils organised by region;
- compare indicative residential-rates redistribution;
- choose from curated council names; and
- share the selected combination through one clear LinkedIn action with a purpose-built link preview.

## Requirements

- Node.js 22 or later
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed by Vite.

## Build locally

```bash
npm run build
```

The production site is written to `dist/`.

## Deploy with GitHub Pages

The repository includes `.github/workflows/deploy-pages.yml`.

1. Commit and push the files to the `main` branch.
2. In GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Open **Actions** and wait for **Deploy to GitHub Pages** to complete.

`vite.config.js` derives the repository name during GitHub Actions, so project sites such as `https://USERNAME.github.io/REPOSITORY/` receive the correct asset paths.

## Repository structure

- `src/App.jsx` — application, council data, calculations, interactions, and component styles
- `src/main.jsx` — React entry point
- `src/index.css` — document-level styles
- `public/methodology.html` — methodology, formulas, sources, and caveats
- `public/the-amalgamator-data.csv` — downloadable dataset
- `public/og-image.jpg` — social preview image
- `vite.config.js` — local and GitHub Pages build configuration
- `.github/workflows/deploy-pages.yml` — automatic Pages deployment

## Suggested Git commands

```bash
git status
git add -A
git diff --staged
git commit -m "Deploy the simplified Amalgamator experience"
git push origin main
```

## Important modelling limitations

This is an independent modelling tool. It is not an official proposal or a prediction of any household’s rates.

The methodology page documents the sources, calculations, data vintages, and known limitations. The Current Talks shortcut is a dated snapshot and should be reviewed whenever reported negotiations change.

## Licence and attribution

Application code is licensed under CC BY 4.0. Crown data from DIA and Stats NZ is used under CC BY 4.0. Ratepayers’ Report data remains subject to the New Zealand Taxpayers’ Union’s terms.
