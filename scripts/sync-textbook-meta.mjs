/** Syncs wordCount in src/data/textbooks/meta.js to the actual generated word files.
 *  Run: node scripts/sync-textbook-meta.mjs */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const metaPath = join(root, 'src/data/textbooks/meta.js');
const tbRoot = join(root, 'src/data/textbooks');

const shelves = ['pri-g1', 'pri-g3', 'mid'];
const counts = {}; // shelfId -> bookId -> { unit -> count, total }

for (const shelf of shelves) {
  for (const bookId of ['dummy']) {} // noop
}

// Read each generated file by regex-counting '"unit":"' occurrences per unit.
import { readdirSync } from 'node:fs';
for (const shelf of shelves) {
  const dir = join(tbRoot, shelf);
  let files;
  try { files = readdirSync(dir); } catch { continue; }
  for (const f of files) {
    if (!f.endsWith('.js')) continue;
    const bookId = f.slice(0, -3);
    const text = readFileSync(join(dir, f), 'utf8');
    // count per unit: find "unit":"<id>" occurrences
    const unitSet = {};
    const re = /"unit":"([^"]+)"/g;
    let m;
    while ((m = re.exec(text))) {
      unitSet[m[1]] = (unitSet[m[1]] || 0) + 1;
    }
    const total = Object.values(unitSet).reduce((a, b) => a + b, 0);
    if (!counts[shelf]) counts[shelf] = {};
    counts[shelf][bookId] = { units: unitSet, total };
  }
}

// Patch meta.js wordCount values.
let meta = readFileSync(metaPath, 'utf8');
let patched = 0;
for (const [shelf, books] of Object.entries(counts)) {
  for (const [bookId, info] of Object.entries(books)) {
    // Replace book wordCount: find the book block by id and update its "wordCount": N
    const bookRe = new RegExp(`("(?:id|n|zh|en|accent|spine)":\\s*"[^"]*",\\s*)*"id":\\s*"${bookId}"([^}]*?)"wordCount":\\s*\\d+`);
    // Simpler: target the book object containing this id and rewrite wordCount + each unit wordCount.
  }
}

// Simpler robust approach: rebuild wordCount by locating each book object and unit by id.
// We'll do targeted replacements: for each book, replace its "wordCount":N; for each unit, replace unit "wordCount":N.
function patchBookWordCount(shelf, bookId, total) {
  // Match the book object: { "id": "<bookId>", ... "wordCount": <n>, "units": [ ... ] }
  const idRe = `"id":\\s*"${bookId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`;
  const re = new RegExp(idRe + '([\\s\\S]*?)"wordCount":\\s*\\d+');
  meta = meta.replace(re, (mm, inner) => {
    patched++;
    return `"id": "${bookId}"${inner}"wordCount": ${total}`;
  });
}
function patchUnitWordCount(shelf, bookId, unitId, count) {
  // Find unit object with "id": "<unitId>" and rewrite its wordCount.
  const idRe = `"id":\\s*"${unitId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`;
  const re = new RegExp(idRe + '([\\s\\S]*?)"wordCount":\\s*\\d+');
  meta = meta.replace(re, (mm, inner) => `"id": "${unitId}"${inner}"wordCount": ${count}`);
}

for (const [shelf, books] of Object.entries(counts)) {
  for (const [bookId, info] of Object.entries(books)) {
    patchBookWordCount(shelf, bookId, info.total);
    for (const [unitId, c] of Object.entries(info.units)) {
      patchUnitWordCount(shelf, bookId, unitId, c);
    }
  }
}

writeFileSync(metaPath, meta);
console.log('patched', patched, 'books; shelves:', Object.keys(counts).join(','));
