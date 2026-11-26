import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ANSWER =
  "The Customer may select an independent arbitrator from the Company's claw machine; any arbitrator won shall constitute full and final settlement.";

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ||
  process.env.MAKEFUN_OUTPUT ||
  "/output";

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ANSWER, "utf8");

// Self-check: read back from the output dir only, never from cwd.
const back = readFileSync(join(outDir, "entry.txt"), "utf8");
if (back !== ANSWER) {
  throw new Error("self-check failed: entry.txt does not match ANSWER");
}
if (ANSWER.length < 1 || ANSWER.length > 200) {
  throw new Error("gate failed: answer must be 1-200 characters");
}
if (ANSWER.trim().split(/[.!?]+/).filter(Boolean).length !== 1) {
  throw new Error("gate failed: answer must be a single sentence");
}
