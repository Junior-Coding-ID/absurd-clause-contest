"use strict";

const fs = require("node:fs");
const path = require("node:path");

// The Absurd Clause Contest — one absurd ToS clause, one sentence.
// Final answer, exactly as specified (156 characters, 1 sentence).
const ENTRY =
  "Notice of any fee increase shall be deemed received when the Company inserts it into the song stuck in your head; humming the chorus constitutes acceptance.";

const EXPECTED_LENGTH = 156;

function writeEntry(targetPath) {
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, ENTRY, "utf8");
  return targetPath;
}

function sentenceCount(text) {
  const matches = text.match(/[.!?]+/g);
  return matches === null ? 0 : matches.length;
}

function main() {
  const localPath = path.join(process.cwd(), "entry.txt");
  writeEntry(localPath);

  // The grader reads /output/entry.txt, so write there too when possible.
  try {
    writeEntry(path.join("/output", "entry.txt"));
  } catch (err) {
    console.log("Note: could not write /output/entry.txt:", err.message);
  }

  // Self-check: read entry.txt back byte-per-byte and verify the gates.
  const readBack = fs.readFileSync(localPath, "utf8");
  const readBackBytes = fs.readFileSync(localPath);
  const expectedBytes = Buffer.from(ENTRY, "utf8");
  if (!readBackBytes.equals(expectedBytes)) {
    throw new Error("Self-check failed: entry.txt bytes differ from ENTRY");
  }
  if (readBack !== ENTRY) {
    throw new Error("Self-check failed: entry.txt text differs from ENTRY");
  }
  if (readBack.length !== EXPECTED_LENGTH) {
    throw new Error(
      "Self-check failed: expected " + EXPECTED_LENGTH + " characters, got " + readBack.length
    );
  }
  if (readBack.length < 1 || readBack.length > 200) {
    throw new Error("Self-check failed: entry must be 1-200 characters");
  }
  if (readBack.trim().length === 0) {
    throw new Error("Self-check failed: entry must not be only whitespace");
  }
  if (sentenceCount(readBack) !== 1) {
    throw new Error(
      "Self-check failed: expected 1 sentence, got " + sentenceCount(readBack)
    );
  }

  console.log("OK: entry.txt written to " + localPath);
  console.log("Characters: " + readBack.length);
  console.log("Sentences: " + sentenceCount(readBack));
  console.log("Entry: " + readBack);
}

main();
