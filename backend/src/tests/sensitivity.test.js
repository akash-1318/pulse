import test from "node:test";
import assert from "node:assert/strict";
import { classifySensitivity } from "../utils/sensitivity.js";

test("classifySensitivity returns safe when there are no flagged terms", () => {
  const result = classifySensitivity({
    title: "Company all hands",
    description: "Quarterly review",
    filename: "meeting.mp4"
  });
  assert.equal(result.status, "safe");
  assert.equal(result.matchedKeywords.length, 0);
});

test("classifySensitivity returns flagged when matched keywords are found", () => {
  const result = classifySensitivity({
    title: "fight scene",
    description: "contains violence and blood",
    filename: "clip.mp4"
  });
  assert.equal(result.status, "flagged");
  assert.ok(result.matchedKeywords.includes("violence"));
});
