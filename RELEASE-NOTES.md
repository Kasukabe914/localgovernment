# Sharing release

## Draft: net assets per resident

- Adds a TLA-by-TLA net-assets comparison directly below the residential-rates
  calculation.
- Pools each selected council's 30 June 2024 council-only assets and
  liabilities, then divides the net balance by the combined 2024 population.
- Shows every TLA's current net assets per resident and its signed difference
  from the merged benchmark.
- Adds the Stats NZ Local Authority Financial Statistics source to the public
  data download and methodology, with council-controlled organisations
  excluded and unitary-authority comparability called out.
- Adds calculation, reconciliation, missing-data, and downloadable-data tests.

Changes `src/App.jsx` and `README.md` only. No new dependencies, no build
changes, no server.

## Why

The previous share action sent LinkedIn a link whose Open Graph card had no
image, a static title, and a description made of instructional copy about the
tool. Every share looked identical apart from the council name, so nothing in
the feed carried what the user had actually found.

## Application changes

- Generates a 1200×630 share card in the browser on the result screen: council
  name, councils/population/area, the rates redistribution as a diverging bar
  chart, the blended average bill, and a legend.
- Shows the card on screen before posting, so the share reads as publishing a
  finding rather than pasting a link.
- Names any council excluded from the blend for want of a published average
  bill, on the card and in the write-up. Previously those councils simply
  vanished from a card that still counted them in its header.
- Generates suggested post copy from the finding — biggest riser, biggest
  faller, the split, the blended bill, the caveat, and the result link.
- Adds the native-image-post route: copies the write-up, downloads the card, and
  opens the LinkedIn composer. LinkedIn deprioritises posts carrying an outbound
  link, so this route reaches further than a link share.
- Keeps the one-click link route, and passes the finding through the share
  shim's `name` parameter so the Open Graph description carries real figures.
  This needs no change to the shim.
- Copies the write-up to the clipboard on both routes, with an `execCommand`
  fallback for embedded and insecure contexts. LinkedIn has no supported
  composer prefill: `shareArticle`'s `title`/`summary`/`source` were deprecated
  in 2018 and `share-offsite` accepts only `url`.
- Wires up copy-link and download-image as standalone actions, using icons that
  were already drawn in `ShareIcon` but never rendered.
- Removes the `share=2` query parameter, which was appended to every shared URL
  and read nowhere.

## Accessibility

The card's diverging pair is red ↔ deep blue, not the interface's red ↔ green:
red/green failed deuteranopia separation at every step tested (best ΔE 6.2
against a floor of 8). The chosen pair measures ΔE 18.0 simulated and 26.4 for
normal vision, and passes chroma, lightness band and contrast against the paper
surface. Every bar also carries a signed dollar label and sits on its own side
of the zero line, so direction never depends on hue. The legend is always
present and the preview image carries a full alt text stating the finding.

## New: `share/`

The share shim's source, previously deployed with no copy in version control.

- `share/worker.js` — serves per-combination Open Graph tags to crawlers and
  302s real browsers straight to the result. Adds the `og:image` the deployed
  shim has never had, switches `twitter:card` to `summary_large_image`, and puts
  the council name in `og:title` and the finding in `og:description`.
- `share/template.html` — the same output as a placeholder template, for
  updating the existing host instead of deploying the worker.
- `share/worker.test.mjs` — contract checks, including open-redirect rejection
  and HTML-injection escaping. `node share/worker.test.mjs`.
- `share/README.md` — parameters, deployment, and what it fixes.

The folder is outside `public/`, so it is not copied into the built site. The
app keeps sending the legacy `name` parameter alongside the new `title`/`desc`,
so the currently deployed shim keeps working until it is replaced.

## Known limitations

- Until the shim is redeployed, the link route's card still has no image. The
  app change alone puts real figures in the description, which the deployed
  shim does render.
- The card image is per-combination, but the link route's `og:image` is the
  static site image: generating a per-combination image server-side would need
  rasterisation in the worker, which is not worth the complexity given the
  native-image-post route already produces exactly that picture.
- The card uses Bricolage Grotesque when the webfont has loaded, and the system
  sans otherwise.

## Follow-up: simpler LinkedIn sharing

- Replaces the two LinkedIn routes with one **Share** heading and direct
  LinkedIn and Facebook icon actions.
- Uses Meta's official Share Dialog when a `FACEBOOK_APP_ID` repository
  variable is configured, with the native share sheet and legacy web sharer
  retained only as unconfigured-development fallbacks.
- Uses Meta's supported full-page display mode for URL-redirection shares so
  the Facebook dialog also opens correctly on mobile devices.
- Adds a public privacy policy and data-deletion statement for Meta app
  configuration, linked from the application footer.
- Publishes the policy at a fresh canonical `/privacy-policy/` path to avoid
  stale third-party validation, while preserving the original URL.
- Removes the native card-posting route, automatic clipboard write, download
  side effect, opening-status message and fallback link.
- Keeps image download, write-up copy and result-link copy as explicit
  secondary actions.
- Adds a version marker to the LinkedIn preview URL so previously shared
  combinations are fetched again instead of reusing LinkedIn's cached card.
- Replaces the long mobile LinkedIn URL—with duplicated title, description,
  finding and result parameters—with a single compact scenario token. The
  share service derives the group name and exact result URL server-side.
- Sends LinkedIn the public GitHub Pages result URL directly, removing the
  separate preview-service domain from the link shown in LinkedIn posts.
- Uses Meta's mobile-web `touch` dialog on iOS and Android while retaining the
  desktop full-page Facebook dialog.
- Adds explicit Open Graph image type, dimensions, secure URL and locale so
  mobile LinkedIn composers can render the site's general preview reliably.

## Files to commit

```bash
git status
git diff -- src/App.jsx
git add -A
git commit -m "Share the finding, not just the link"
git push origin main
```

The existing GitHub Pages workflow will build and deploy the update.
