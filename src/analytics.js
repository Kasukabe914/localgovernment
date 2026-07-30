const SOCIAL_PLATFORMS = new Set(["facebook", "linkedin", "x", "reddit"]);

export const JOURNEY_EVENTS = Object.freeze({
  startedAmalgamation: "journey-started-amalgamation",
  selectedFirstCouncil: "journey-selected-first-council",
  addedAnotherCouncil: "journey-added-another-council",
  viewedCalculatedResult: "journey-viewed-calculated-result",
  completedScenario: "journey-completed-scenario",
  changedAssumptions: "journey-changed-assumptions",
  sharedResult: "journey-shared-result",
  copiedOrDownloadedResult: "journey-copied-or-downloaded-result",
  openedExplanatoryMaterial: "journey-opened-explanatory-material",
});

const ALLOWED_JOURNEY_EVENTS = new Set(Object.values(JOURNEY_EVENTS));

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

  if (data === undefined) {
    window.umami.track(name);
  } else {
    window.umami.track(name, data);
  }
  return true;
}

export function trackJourney(name) {
  if (!ALLOWED_JOURNEY_EVENTS.has(name)) {
    throw new Error(`Unsupported journey event: ${name}`);
  }

  return trackAnalytics(name);
}
