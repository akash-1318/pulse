const FLAGGED_KEYWORDS = [
  "violence", "blood", "weapon", "abuse", "nsfw", "adult", "harm", "fight"
];

export function classifySensitivity({ title = "", description = "", filename = "" }) {
  const joined = `${title} ${description} ${filename}`.toLowerCase();
  const matchedKeywords = FLAGGED_KEYWORDS.filter((keyword) => joined.includes(keyword));
  const score = Math.min(100, matchedKeywords.length * 25 + (filename.toLowerCase().includes("flag") ? 15 : 0));

  return {
    status: matchedKeywords.length > 0 ? "flagged" : "safe",
    score,
    matchedKeywords
  };
}
