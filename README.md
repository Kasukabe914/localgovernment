# The Amalgamator

A jigsaw-style sandbox for testing New Zealand local-government amalgamations.
Build your own councils out of the 67 territorial authorities, name them, see
who would hold the balance of power, and watch whose rates move.

Prompted by [Joel MacManus's reporting for The Spinoff](https://thespinoff.co.nz/politics/24-07-2026/council-amalgamation-whos-working-together-and-who-is-refusing-to-budge)
on which councils are teaming up and which are refusing to budge.

## Features

- Tap-to-build jigsaw of every territorial authority, grouped by region and island.
- Name your creations by hand, or let the generator suggest one — from tidy
  portmanteaus to local nicknames (Megatron, Wellingtron, The Fruit Bowl, …).
- **Power share:** a stacked bar showing which member district dominates the
  merged council, and whether anyone holds an outright majority.
- **Rates comparator:** each piece shows current rates per resident; each
  proposal gets a blended rate and a per-council breakdown of who pays more and
  who pays less. Toggle between 2023/24 actuals and 2025/26 forecasts, add an
  assumed efficiency saving, and switch to a per-household view.
- Three starting presets, including the article's current state of play and the
  Waikato "Megatron".
- Saves your map to the browser (localStorage).

## Run locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Deploy to GitHub Pages

This repo ships a GitHub Actions workflow that builds and publishes on every
push to `main`.

1. Create a repo on GitHub and push this code to the `main` branch.
2. On GitHub: **Settings → Pages → Build and deployment → Source → GitHub
   Actions**.
3. Push (or re-run the workflow). The site publishes to
   `https://kasukabe914.github.io/localgovernment/`.

### The one thing that trips people up

For a project site served from `username.github.io/REPO/`, Vite's `base` must be
`/REPO/`. This repo sets it **automatically** from the `GITHUB_REPOSITORY`
variable during the Actions build (see `vite.config.js`), so you don't normally
have to touch anything. If you build and deploy some other way and the page
loads blank with 404s on the JS/CSS, that's the cause — set `base` to your repo
name by hand.

For a user/org site (repo named `username.github.io`) or a custom domain, `base`
should be `/`; the config already handles the `.github.io` case.

## Data & licence

- **Application:** Creative Commons Attribution 4.0 (CC BY 4.0) — see
  [`LICENSE`](./LICENSE). Reuse it, adapt it, build on it commercially if you
  like; just credit it, link the licence, and say if you changed it.
- **Council data:** Crown copyright, CC BY 4.0 — see
  [`DATA-LICENCE.md`](./DATA-LICENCE.md). Sourced from the Department of Internal
  Affairs council profiles release (July 2025) and Stats NZ.

The blended rates, power shares, per-household figures and saving slider are the
app's own arithmetic, not official figures, and are not a prediction of anyone's
actual rates bill. Rates are levied on property value, not per head.

## Not affiliated

Independent project. Not endorsed by or affiliated with the Department of
Internal Affairs, Statistics New Zealand, or The Spinoff.
