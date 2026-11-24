import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = process.env.MAKEFUN_OUTPUT_PATH || "/output/entry.txt";

const PITCH =
  "Describe that app idea you keep sketching on napkins in plain English, let an AI agent build a working first draft on make.fun while we finish our coffee, and if you hate how it turns out, we just close the tab.";

export function renderPitch(): string {
  const line = PITCH.replace(/\r?\n/g, " ").trim();
  const chars = [...line].length;
  const bytes = Buffer.byteLength(line, "utf8");
  if (chars < 1 || chars > 240 || !/\S/.test(line) || bytes > 240) {
    throw new Error(`Gate check failed: chars=${chars} bytes=${bytes}`);
  }
  return line;
}

function main(): void {
  const text = renderPitch();
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, text, "utf8");
}

main();
