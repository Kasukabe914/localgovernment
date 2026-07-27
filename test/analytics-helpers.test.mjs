import test from "node:test";
import assert from "node:assert/strict";
import {
  addShareAttribution,
  trackAnalytics,
} from "../src/analytics.js";

test("social share attribution retains the scenario and adds fixed campaign labels", () => {
  const original = "https://www.amalgamator.nz/?m=SCENARIO";

  for (const platform of ["facebook", "linkedin", "x", "reddit"]) {
    const attributed = new URL(addShareAttribution(original, platform));
    assert.equal(attributed.searchParams.get("m"), "SCENARIO");
    assert.equal(attributed.searchParams.get("utm_source"), platform);
    assert.equal(attributed.searchParams.get("utm_medium"), "social");
    assert.equal(attributed.searchParams.get("utm_campaign"), "result_share");
    assert.equal(attributed.searchParams.get("utm_content"), "share_icon");
  }

  assert.equal(original, "https://www.amalgamator.nz/?m=SCENARIO");
  assert.throws(
    () => addShareAttribution(original, "email"),
    /Unsupported social platform/
  );
});

test("analytics events are silent without Umami and contain only supplied fixed data", () => {
  const previousWindow = globalThis.window;
  try {
    globalThis.window = {};
    assert.equal(trackAnalytics("share-click", { platform: "copy-link" }), false);

    const calls = [];
    globalThis.window.umami = {
      track: (...args) => calls.push(args),
    };
    assert.equal(
      trackAnalytics("share-click", {
        platform: "copy-link",
        surface: "result",
        chosen_name: "The Winterless Council",
      }),
      true
    );
    assert.deepEqual(calls, [
      [
        "share-click",
        {
          platform: "copy-link",
          surface: "result",
          chosen_name: "The Winterless Council",
        },
      ],
    ]);
  } finally {
    if (previousWindow === undefined) {
      delete globalThis.window;
    } else {
      globalThis.window = previousWindow;
    }
  }
});
