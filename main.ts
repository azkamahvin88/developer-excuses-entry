// Make the AI Judge Laugh: Developer Excuses — make.fun entry.
//
// Writes one funny single-line excuse a developer gives when code
// breaks in production to /output/entry.txt. Deterministic, no network,
// no model calls.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EXCUSE =
  "The root cause is that the code did exactly what I wrote, and I wrote it at 2am.";

// Self-check against the sealed scorer gate: entry.txt must be UTF-8,
// 1-200 characters, not only whitespace. Fail loudly instead of
// writing an entry the judge would never see.
const lineChars = [...EXCUSE].length;
if (lineChars < 1 || lineChars > 200 || !/\S/.test(EXCUSE)) {
  throw new Error(`excuse is ${lineChars} chars, outside the 1-200 gate`);
}

// The grader mounts /output; OUTPUT_DIR only exists so the entry can be
// tested locally without root. It defaults to /output.
const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), EXCUSE + "\n", "utf8");
