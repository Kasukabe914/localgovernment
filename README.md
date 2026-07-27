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

The result screen shows the same five sharing controls on mobile and desktop:
Facebook, X, LinkedIn, Reddit and Copy link. The four platform controls are
ordinary HTTPS anchors to each platform's composer, allowing iOS to hand a
user-tapped universal link to an installed app. They do not use `window.open()`
or the Web Share API. Every route uses the public GitHub Pages result URL with
its compact scenario token.

Facebook uses Meta's official Share Dialog when `VITE_FACEBOOK_APP_ID` is
configured. GitHub Pages maps the repository variable `FACEBOOK_APP_ID` into
that build setting. The Meta app should list `kasukabe914.github.io` as an app
domain and `https://kasukabe914.github.io/localgovernment/` as its website URL.
The Facebook Feed Dialog shares that same GitHub Pages domain, avoiding a
cross-domain link that Meta can reject as invalid. Without an App ID, local
development falls back to Facebook's legacy web sharer.

LinkedIn receives the public GitHub Pages result URL directly so the shared
link displays the application domain. This intentionally uses the site's
general Open Graph preview rather than the per-result preview service. The
general preview includes explicit image dimensions and media type for stricter
composers.

Copy link uses the existing clipboard helper and reports success in the share
panel. Download image and Copy write-up remain available as separate secondary
actions.

### Card colours

The interface uses green for "pays less" and red for "pays more". The card does
not: that pair fails deuteranopia separation at every step tested (best ΔE 6.2
against a floor of 8). The card keeps the brand red and uses a deep blue for the
other pole — ΔE 18.0 simulated, 26.4 normal vision, and passing chroma,
lightness and contrast against the paper surface. Direction is additionally
carried by side-of-zero position and a signed dollar label on every bar, so hue
is never the only channel.

The population-share bar uses discrete, high-contrast colours with matching
legend swatches rather than progressively lighter shades of one colour.

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
