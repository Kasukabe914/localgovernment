# Share shim

LinkedIn's `share-offsite` endpoint accepts only a `url` parameter — the old
`shareArticle` endpoint with `title`, `summary` and `source` was deprecated in
2018, and there is no supported way to prefill the composer. So everything the
feed card shows comes from the Open Graph tags on the page being shared.

The Amalgamator is a static site on GitHub Pages, which cannot render a
different `og:description` per council combination. This tiny shim does it: the
app links to the shim, the shim serves per-combination Open Graph tags to
crawlers and redirects everyone else straight to the result.

This folder is not part of the built site. It lives here so the shim's source is
version-controlled alongside the app that depends on it.

## Files

| File | Purpose |
|---|---|
| `worker.js` | Working implementation. Cloudflare Workers by default; the `handleShare` export is a plain `Request → Response` function and runs unchanged on Vercel Edge, Netlify Edge and Deno Deploy. |
| `template.html` | The exact output a crawler must receive, with placeholders. Use this if you are updating an existing host rather than deploying the worker. |
| `worker.test.mjs` | Contract checks: crawler tags, human redirect, legacy `name` fallback, open-redirect rejection, HTML-injection escaping, and the no-params default. Run with `node share/worker.test.mjs`. |

## Parameters

| Param | Meaning |
|---|---|
| `title` | Council name, e.g. `Megatron`. Becomes `og:title`. |
| `desc` | The finding, e.g. `Three published council averages are above the household-weighted comparison and two are below it. Waikato District is $507 below the comparison.` Becomes `og:description`. |
| `name` | Legacy field carrying the whole finding in one string. Read only when `title`/`desc` are absent, so links shared before this change keep working. |
| `result` | The app URL to redirect a human to. Validated against the app's origin. |

## Deploying on Cloudflare Workers

```bash
npm create cloudflare@latest amalgamator-share -- --type hello-world
cd amalgamator-share
# replace src/index.js with worker.js from this folder
npx wrangler deploy
```

Then add a custom domain in the Cloudflare dashboard and point
`SOCIAL_SHARE_URL` in `src/App.jsx` at it. The free tier covers this many
times over — the worker does no work beyond string building.

## What this fixes

The shim deployed at `local-government-amalgamator-share.brendenm.chatgpt.site`
serves:

- no `og:image` at all, so LinkedIn renders a small text-only strip rather than
  a large card;
- `twitter:card: summary` rather than `summary_large_image`;
- a static `og:title` of "Build a bigger council." for every share;
- an `og:description` of tool boilerplate rather than the user's result; and
- an interstitial page, so every click-through costs an extra page and a manual
  "Open this result".

This version fixes all five. If you would rather keep the existing host than
move to Cloudflare, `template.html` is the output to reproduce — the `og:image`
line alone is the single largest improvement.

## Security note

`safeResult()` rejects any `result` URL that is not on the app's own origin.
Without that check the shim is an open redirect: a URL on this domain could send
visitors anywhere, which is worth avoiding on a domain that carries an
independent public-interest tool's name.

## Verifying a change

Paste a share URL into LinkedIn's Post Inspector
(<https://www.linkedin.com/post-inspector/>) to see what the crawler receives
and to clear LinkedIn's cache for that URL. Each combination is its own URL, so
caching is per-combination and a stale card only affects the exact link that was
inspected.
