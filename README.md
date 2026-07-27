# The Amalgamator

An independent modelling tool for exploring possible New Zealand local-government amalgamations.

The application guides users through one proposed council at a time:

- start from a dated snapshot of reported council talks or build a combination from scratch;
- select councils within one region, from neighbouring regions, or from further afield;
- distinguish nearby options from distant councils organised by region;
- compare indicative residential-rates redistribution;
- choose from curated council names; and
- share the finding as a generated card image or as a link.

## Sharing

The result screen generates a 1200×630 share card in the browser — the council
name, the rates redistribution as a diverging bar chart, the blended bill, and a
note naming any council with no published bill. No server and no new
dependencies: it is drawn on a `<canvas>` and offered as a PNG download.

Two routes are offered:

- **Post the card.** On devices with file sharing, opens the system share sheet
  with the PNG and write-up already attached. The user can choose LinkedIn
  directly. On desktop, it opens LinkedIn immediately, copies the write-up,
  downloads the PNG, and leaves a visible “Open LinkedIn again” fallback.
- **Share as a link.** Opens `share-offsite` immediately and leaves the same
  visible fallback in case the browser blocks the new tab. LinkedIn accepts only a
  `url` parameter — `shareArticle`'s `title`/`summary`/`source` were deprecated
  in 2018 — so everything in the feed card comes from the Open Graph tags on
  the share shim. The app passes the finding through the shim's `name`
  parameter so the card description carries real figures instead of generic
  instructional copy.

Both routes put the suggested write-up on the clipboard first, since there is no
supported way to prefill the LinkedIn composer.

### Card colours

The interface uses green for "pays less" and red for "pays more". The card does
not: that pair fails deuteranopia separation at every step tested (best ΔE 6.2
against a floor of 8). The card keeps the brand red and uses a deep blue for the
other pole — ΔE 18.0 simulated, 26.4 normal vision, and passing chroma,
lightness and contrast against the paper surface. Direction is additionally
carried by side-of-zero position and a signed dollar label on every bar, so hue
is never the only channel.

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
- `share/` — source for the LinkedIn share shim (deployed separately, not part
  of the built site)

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
