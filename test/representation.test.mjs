import assert from "node:assert/strict";
import test from "node:test";

import {
  buildCommunityCouncilModel,
  suggestedCommunityCouncilMembers,
} from "../src/representation.js";

test("the MartinJenkins Wellington illustration is reproduced", () => {
  const model = buildCommunityCouncilModel([
    { member: { id: "wellington", pop: 210800 }, seats: 7 },
    { member: { id: "hutt", pop: 114200 }, seats: 4 },
    { member: { id: "porirua", pop: 61500 }, seats: 2 },
    { member: { id: "kapiti", pop: 58000 }, seats: 2 },
    { member: { id: "upperhutt", pop: 47400 }, seats: 2 },
    { member: { id: "wairarapa", pop: 51400 }, seats: 2 },
  ]);

  assert.deepEqual(model.map((row) => row.totalMembers), [14, 7, 4, 4, 4, 4]);
  assert.equal(model.reduce((sum, row) => sum + row.totalMembers, 0), 37);
  assert.equal(model.reduce((sum, row) => sum + row.communityOnlySeats, 0), 18);
});

test("small councils retain four local representatives", () => {
  assert.equal(suggestedCommunityCouncilMembers(610, 1), 4);
  assert.equal(suggestedCommunityCouncilMembers(12250, 1), 4);
});

test("the local tier expands when a small area receives more unitary seats", () => {
  assert.equal(suggestedCommunityCouncilMembers(5500, 5), 5);
});

test("invalid negative inputs cannot reduce the minimum", () => {
  assert.equal(suggestedCommunityCouncilMembers(-1, -2), 4);
});

