import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
const lines = readFileSync('MANIFEST.sha256', 'utf8').trim().split('\n'); let failed = 0;
for (const line of lines) {
  const expected = line.slice(0, 64), path = line.slice(66).trim();
  try { const actual = createHash('sha256').update(readFileSync(path)).digest('hex'); if (actual !== expected) { console.error(`DIFERENTE: ${path}`); failed++; } }
  catch { console.error(`AUSENTE: ${path}`); failed++; }
}
console.log(`${lines.length} arquivos conferidos; ${failed} divergências.`); process.exitCode = failed ? 1 : 0;
