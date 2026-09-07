#!/usr/bin/env node
/** Fill IELTS entries whose zh has no Chinese, using scripts/ielts-zh-glossary.json. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ieltsPath = path.join(root, 'src/data/ielts.js');
const glossPath = path.join(root, 'scripts/ielts-zh-glossary.json');

const gloss = JSON.parse(fs.readFileSync(glossPath, 'utf8'));
let text = fs.readFileSync(ieltsPath, 'utf8');
function extractFirstArray(src) {
  const i = src.indexOf('[');
  let depth = 0;
  for (let j = i; j < src.length; j++) {
    const ch = src[j];
    if (ch === '[') depth++;
    else if (ch === ']') {
      depth--;
      if (depth === 0) return { json: src.slice(i, j + 1), start: i, end: j + 1 };
    }
  }
  throw new Error('array not found');
}

const { json, start: a0, end: a1 } = extractFirstArray(text);
const words = JSON.parse(json);
let filled = 0;
for (const w of words) {
  const hasZh = /[\u4e00-\u9fff]/.test(w.zh || '');
  if (hasZh) continue;
  const g = gloss[w.word];
  if (!g) continue;
  if (g.toLowerCase().includes(String(w.word).toLowerCase())) continue;
  w.zh = g;
  filled++;
}
const next = `${text.slice(0, a0)}${JSON.stringify(words, null, 2)}${text.slice(a1)}`;
fs.writeFileSync(ieltsPath, next);
console.log('filled', filled, 'of', words.length);
