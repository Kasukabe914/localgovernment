const SOCIAL_PLATFORMS = new Set(["facebook", "linkedin", "x", "reddit"]);

export function addShareAttribution(url, platform) {
  if (!SOCIAL_PLATFORMS.has(platform)) {
    throw new Error(`Unsupported social platform: ${platform}`);
  }

  const attributed = new URL(url);
  attributed.searchParams.set("utm_source", platform);
  attributed.searchParams.set("utm_medium", "social");
  attributed.searchParams.set("utm_campaign", "result_share");
  attributed.searchParams.set("utm_content", "share_icon");
  return attributed.toString();
}

export function trackAnalytics(name, data) {
  if (
    typeof window === "undefined" ||
    typeof window.umami?.track !== "function"
  ) {
    return false;
  }

  window.umami.track(name, data);
  return true;
}
