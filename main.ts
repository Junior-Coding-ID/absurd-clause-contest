// The Absurd Clause Contest v2 — entry writer (Node-only, CommonJS).
// Writes the final one-sentence clause to entry.txt in the grader output dir.
const fs = require("fs");
const path = require("path");

const answer = "Notice of any fee increase shall be deemed received when the Company inserts it into the song stuck in your head; humming the chorus constitutes acceptance.";

// Grader output dir: env first, /output fallback. Never write to cwd.
const outDir = process.env.MAKEFUN_OUTPUT_DIR || process.env.MAKEFUN_OUTPUT || "/output";

fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, "entry.txt");
fs.writeFileSync(outPath, answer, "utf8");

// Self-check: read back byte-for-byte and verify content, length, gate, sentences.
const back = fs.readFileSync(outPath, "utf8");
if (back !== answer) {
  throw new Error("Self-check failed: entry.txt does not match the answer byte-for-byte.");
}
if (answer.length !== 156) {
  throw new Error("Self-check failed: answer length is " + answer.length + ", expected 156.");
}
if (answer.length < 1 || answer.length > 200) {
  throw new Error("Self-check failed: answer outside the 1-200 character gate.");
}
const sentenceCount = answer.split(".").filter(function (part) { return part.trim().length > 0; }).length;
if (sentenceCount !== 1) {
  throw new Error("Self-check failed: expected exactly 1 sentence, found " + sentenceCount + ".");
}
console.log("OK: entry.txt written to " + outPath + " (" + answer.length + " chars, 1 sentence).");
