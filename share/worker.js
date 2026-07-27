/**
 * The Amalgamator — share shim
 * ---------------------------------------------------------------------------
 * LinkedIn's share-offsite endpoint accepts only a `url` parameter. Everything
 * the feed card shows comes from the Open Graph tags on the page at that URL.
 * The Amalgamator is a static site, so it cannot render per-combination meta
 * tags; this tiny worker does it instead.
 *
 * Crawlers get server-rendered Open Graph tags carrying the finding.
 * Real browsers get a 302 straight to the result — no interstitial click.
 *
 * Deploy on Cloudflare Workers (free tier is far more than enough):
 *   npm create cloudflare@latest amalgamator-share -- --type hello-world
 *   # replace src/index.js with this file, then:
 *   npx wrangler deploy
 *   # add a custom domain in the Cloudflare dashboard, then point
 *   # SOCIAL_SHARE_URL in src/App.jsx at it.
 *
 * Runtime-agnostic apart from the export at the bottom: the same handler works
 * on Vercel Edge, Netlify Edge and Deno Deploy with a different wrapper.
 */

const APP_ORIGIN = "https://kasukabe914.github.io";
const APP_URL = "https://kasukabe914.github.io/localgovernment/";
const OG_IMAGE = "https://kasukabe914.github.io/localgovernment/og-image.jpg";

const DEFAULT_TITLE = "Build a bigger council.";
const DEFAULT_DESC =
  "Choose a region, pick the councils, and see who could pay more or less. About & method: https://kasukabe914.github.io/localgovernment/about/";

// Every crawler that needs server-rendered tags. Anything not on this list is
// treated as a human and redirected.
const CRAWLER =
  /linkedinbot|facebookexternalhit|facebot|twitterbot|slackbot|slack-imgproxy|whatsapp|telegrambot|discordbot|redditbot|embedly|quora link preview|pinterest|bitlybot|skypeuripreview|nuzzel|vkshare|w3c_validator|google-inspectiontool|bingbot|applebot|mastodon|blueskybot|signal/i;

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Collapse whitespace and cap length. LinkedIn truncates descriptions around
// 200 characters and titles well before that.
const clean = (value, max) => {
  const text = String(value ?? "").replace(/\s+/g, " ").trim();
  if (!text) return "";
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
};

/**
 * Only ever redirect to the app itself. Without this check the shim is an open
 * redirect: anyone could send `?result=https://example.invalid` through a URL
 * on this domain and borrow its reputation.
 */
function safeResult(raw) {
  if (!raw) return APP_URL;
  let target;
  try {
    target = new URL(raw, APP_URL);
  } catch (error) {
    return APP_URL;
  }
  if (target.origin !== APP_ORIGIN) return APP_URL;
  return target.toString();
}

function cleanScenario(value) {
  const state = String(value ?? "").trim();
  if (
    !/^1[pbhu][46]~/i.test(state) ||
    state.length > 800 ||
    /[\s&#]/.test(state)
  ) {
    return "";
  }
  try {
    const groups = state.split("~").slice(1);
    const valid = groups.length > 0 && groups.every((group) => {
      const match = group.match(/^(.+):([0-9a-z]):([0-9a-z]+)$/i);
      return (
        match &&
        match[3].length >= 4 &&
        match[3].length % 2 === 0 &&
        clean(decodeURIComponent(match[1]), 90)
      );
    });
    return valid ? state : "";
  } catch (error) {
    return "";
  }
}

function scenarioName(state) {
  if (!state) return "";
  const encodedName = state.split("~")[1]?.split(":")[0] || "";
  try {
    return clean(decodeURIComponent(encodedName), 90);
  } catch (error) {
    return "";
  }
}

function scenarioResult(state) {
  return state ? `${APP_URL}?m=${state}` : APP_URL;
}

function page({ title, description, heading, bodyDescription, canonical, result }) {
  const safeTitle = escapeHtml(title);
  const safeDesc = escapeHtml(description);
  const safeHeading = escapeHtml(heading);
  const safeBodyDescription = escapeHtml(bodyDescription);
  const safeCanonical = escapeHtml(canonical);
  const safeResultUrl = escapeHtml(result);

  return `<!doctype html>
<html lang="en-NZ">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${safeTitle} | The Amalgamator</title>
<meta name="description" content="${safeDesc}">

<meta property="og:site_name" content="The Amalgamator">
<meta property="og:type" content="website">
<meta property="og:title" content="${safeTitle}">
<meta property="og:description" content="${safeDesc}">
<meta property="og:url" content="${safeCanonical}">
<meta property="og:image" content="${OG_IMAGE}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="The Amalgamator — modelling New Zealand council amalgamations">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${safeTitle}">
<meta name="twitter:description" content="${safeDesc}">
<meta name="twitter:image" content="${OG_IMAGE}">

<link rel="canonical" href="${safeCanonical}">
<meta http-equiv="refresh" content="0; url=${safeResultUrl}">
<style>
  body { margin:0; background:#dfeff0; color:#193036;
         font:16px/1.6 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif; }
  main { max-width:640px; margin:0 auto; padding:80px 24px; }
  h1 { font-size:34px; line-height:1.15; margin:0 0 10px; }
  p { margin:0 0 22px; color:#4d6267; }
  a { display:inline-block; padding:12px 22px; background:#d94720; color:#fff;
      border-radius:999px; font-weight:800; text-decoration:none; }
</style>
</head>
<body>
<main>
  <p>Build a bigger council.</p>
  <h1>${safeHeading}</h1>
  <p>${safeBodyDescription}</p>
  <p><a href="${safeResultUrl}">Open this result</a></p>
</main>
<script>location.replace(${JSON.stringify(result)});</script>
</body>
</html>`;
}

export function handleShare(request) {
  const url = new URL(request.url);
  const params = url.searchParams;
  const agent = request.headers.get("user-agent") || "";
  const state = cleanScenario(params.get("m"));
  const compactName = scenarioName(state);
  const result = state
    ? scenarioResult(state)
    : safeResult(params.get("result"));

  // `title`/`desc` are the current fields. `name` is the legacy field, which
  // older links use to carry the whole finding in one string.
  const legacy = clean(params.get("name"), 200);
  const title = state
    ? DEFAULT_TITLE
    : clean(params.get("title"), 70) || (legacy ? legacy.split(":")[0] : "") || DEFAULT_TITLE;
  const description = state
    ? `${compactName}. ${DEFAULT_DESC}`
    : clean(params.get("desc"), 200) || legacy || DEFAULT_DESC;

  if (!CRAWLER.test(agent)) {
    return new Response(null, {
      status: 302,
      headers: {
        location: result,
        "cache-control": "no-store",
      },
    });
  }

  return new Response(
    page({
      title,
      description,
      heading: compactName || title,
      bodyDescription: state ? DEFAULT_DESC : description,
      canonical: url.toString(),
      result,
    }),
    {
      headers: {
        "content-type": "text/html; charset=utf-8",
        // Crawlers re-fetch per unique URL, and each combination is its own
        // URL, so a long cache is safe and keeps the worker cheap.
        "cache-control": "public, max-age=86400",
      },
    }
  );
}

export default {
  fetch(request) {
    return handleShare(request);
  },
};
