# The Amalgamator

An independent modelling tool for exploring possible New Zealand local-government amalgamations.

The application guides users through one proposed council at a time:

- start from a dated snapshot of reported council talks or build a combination from scratch;
- select councils within one region, from neighbouring regions, or from further afield;
- distinguish nearby options from distant councils organised by region;
- compare published average residential rates bills using a separate published
  household count as an approximate weight;
- compare the pooled net-asset position per resident for each selected TLA;
- choose from curated council names; and
- share the finding as a generated card image or as a link.

## Sharing

The result screen generates a 1200×630 share card in the browser — the council
name, a diverging chart comparing published average residential rates bills,
the household-weighted comparison, and a note naming any council with no
published bill. No server and no new dependencies: it is drawn on a `<canvas>`
and offered as a PNG download.

The result screen shows the same five sharing controls on mobile and desktop:
Facebook, X, LinkedIn, Reddit and Copy link. The four platform controls are
ordinary HTTPS anchors to each platform's composer, allowing iOS to hand a
user-tapped universal link to an installed app. They do not use `window.open()`
or the Web Share API. Every route uses the public GitHub Pages result URL with
its compact scenario token.

Facebook uses Meta's official Share Dialog when `VITE_FACEBOOK_APP_ID` is
configured. GitHub Pages maps the repository variable `FACEBOOK_APP_ID` into
that build setting. The Meta app should list `amalgamator.nz` as an app domain
and `https://www.amalgamator.nz/` as its website URL.
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

The interface and card use red for an average above the comparison and deep blue
for an average below it. This pair provides stronger deuteranopia separation
than red and green (ΔE 18.0 simulated and 26.4 in normal vision). Direction is
also carried by side-of-zero position and a signed dollar label on every bar,
so hue is never the only channel.

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

## Aggregate analytics

Production builds support Umami Cloud analytics. The build injects the tracker
into the app, About page, and privacy policy only when `UMAMI_WEBSITE_ID` is
set. Redirect-only HTML files are skipped.

To enable collection:

1. Add `www.amalgamator.nz` as a website in Umami Cloud.
2. Copy its website ID from the tracking code.
3. In the GitHub repository, create the Actions variable
   `UMAMI_WEBSITE_ID` with that UUID.
4. Run the Pages workflow again.

The website ID is a public tracker identifier rather than a secret credential.
Local builds omit the tracker unless the environment variable is deliberately
set.

The production tracker is restricted to the public domain, respects browser Do
Not Track, and strips the encoded `m` council scenario, fragments, arbitrary
query parameters, and referrer queries before transmission. Fixed UTM labels on
the Facebook, LinkedIn, X, and Reddit links are retained for platform
attribution. The result screen also records fixed, non-identifying events for
social-link clicks, successful Copy link and Copy write-up actions, and share
image downloads. Event data includes the app-generated council name selected
for the share, but no underlying council selection or scenario code.

The application also records fixed journey milestones for starting the tool,
making the first council selection, adding another council, viewing a result,
completing or revising a scenario, opening explanatory material, sharing, and
copying or downloading result material. Journey milestones contain no event
properties: council identities, scenario data, calculations, and changed values
remain in the browser. The site does not add a cross-day return identifier.

## Deploy with GitHub Pages

The repository includes `.github/workflows/deploy-pages.yml`.

1. Commit and push the files to the `main` branch.
2. In GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Open **Actions** and wait for **Deploy to GitHub Pages** to complete.

`vite.config.js` derives the repository name during GitHub Actions, so project sites such as `https://USERNAME.github.io/REPOSITORY/` receive the correct asset paths.

## Repository structure

- `src/App.jsx` — application, council data, calculations, interactions, and component styles
- `src/netAssets.js` — 2024 council-only assets and liabilities plus the pooled per-capita calculation
- `src/main.jsx` — React entry point
- `src/index.css` — document-level styles
- `public/about/index.html` — authoritative authorship, independence, sources, method, limitations, corrections, licensing, and change log
- `public/methodology.html` — compatibility redirect to `/about/`
- `public/source-register.csv` — source-level publisher, vintage, retrieval-date, scope, and link register
- `public/the-amalgamator-data.csv` — downloadable dataset
- `public/og-image-2.jpg` — current 1200 × 627 social preview image
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

The rates result is a household-weighted comparison of councils' published
average residential rates bills. The household count is a separate Stats NZ
measure published in the Ratepayers' Report; it is not necessarily the
residential rating-unit denominator used to calculate those average bills.
Because the public report does not publish that denominator or the underlying
residential rates pool, the app does not reconstruct either one. The result
shows a possible direction for comparison, not a final rate or property-level
forecast.

The financial comparisons use a historical water-continuity basis. Water
services retain the treatment in each published source at its stated date.
Later transfers of water services, assets, liabilities, debt and customer
billing to separate water organisations are not modelled or substituted.
Where water was already separately owned, billed or excluded, that source-date
treatment remains. The net-assets result is therefore a 30 June 2024 historical
accounting comparison, not a post-reform legal balance sheet.

The About & method page documents authorship, independence, sources,
calculations, data vintages, corrections and known limitations. The Current
Talks shortcut is a dated snapshot and should be reviewed whenever reported
negotiations change.

## Licence and attribution

Application code is licensed under the MIT License. Original text, charts,
figures, screenshots and other visual outputs are licensed under CC BY 4.0.
Crown data from DIA and Stats NZ is used under CC BY 4.0. Ratepayers’ Report
data remains subject to the New Zealand Taxpayers’ Union’s terms.
