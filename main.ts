import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "moist";

// The gate allows 1–77 characters, not only white space, and the entry
// must be exactly one correctly-spelled word.
if (!/^[A-Za-z]+$/.test(WORD) || WORD.length < 1 || WORD.length > 77) {
  throw new Error(`invalid entry word: ${JSON.stringify(WORD)}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, WORD, "utf8");

// Verify the file on disk holds exactly the decided word.
const written = readFileSync(outPath, "utf8");
if (written !== WORD) {
  throw new Error(`entry.txt mismatch: expected ${JSON.stringify(WORD)}, got ${JSON.stringify(written)}`);
}
