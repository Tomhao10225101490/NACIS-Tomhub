#!/usr/bin/env node
/**
 * Expand Tom's Ground IELTS bank to 1500 words / 60 days.
 * Keeps existing ie-001…ie-500, appends ie-501…, rewrites src/data/ielts.js
 */
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outPath = join(root, 'src/data/ielts.js');

const TOPICS = [
  'Academic', 'Education', 'Environment', 'Technology', 'Health',
  'Society', 'Economy', 'Culture', 'Science', 'Work',
  'Media', 'Urban', 'Crime', 'Travel', 'Psychology',
  'Law', 'Energy', 'Politics', 'Food', 'Sport',
];

const TARGET_WORDS = 1500;
const DAYS = 60;
const WORDS_PER_DAY = 25;

// Build vocab pool if needed, then import
await import('./build-vocab-pool.mjs');
const { RAW_NEW_IELTS } = await import('./ielts-new-vocab.mjs');
const { ieltsWords: existingWords } = await import(join(root, 'src/data/ielts.js'));

function assignIds(existing, rawTuples) {
  const kept = existing.slice(0, 500).map((w, i) => ({
    ...w,
    id: `ie-${String(i + 1).padStart(3, '0')}`,
  }));

  const seen = new Set(kept.map((w) => w.word.toLowerCase()));
  const combined = [...kept];

  for (const [word, pos, zh, enDef, topic, phonetic, example, exampleZh] of rawTuples) {
    if (combined.length >= TARGET_WORDS) break;
    const key = word.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    combined.push({
      id: `ie-${String(combined.length + 1).padStart(3, '0')}`,
      word, phonetic, pos, zh, enDef, example, exampleZh, topic,
    });
  }

  return combined;
}

function buildDays(words) {
  const days = [];
  for (let d = 1; d <= DAYS; d++) {
    const start = (d - 1) * WORDS_PER_DAY;
    days.push({
      day: d,
      title: `IELTS Band 7 · Day ${d}`,
      titleZh: `雅思 Band 7 · 第 ${d} 天`,
      topic: TOPICS[(d - 1) % TOPICS.length],
      vocabIds: words.slice(start, start + WORDS_PER_DAY).map((w) => w.id),
    });
  }
  return days;
}

function jsExport(obj) {
  return JSON.stringify(obj, null, 2);
}

function writeIelts(words, days) {
  const body = `/** Tom's Ground · NACIS Grade 8 · IELTS Band 7 vocabulary */
export const ieltsWords = ${jsExport(words)};

export const ieltsDays = ${jsExport(days)};

export function getIeltsDay(n) {
  return ieltsDays.find((d) => d.day === Number(n)) || null;
}

export function ieltsDayWords(dayPlan) {
  if (!dayPlan?.vocabIds) return [];
  const map = new Map(ieltsWords.map((w) => [w.id, w]));
  return dayPlan.vocabIds.map((id) => map.get(id)).filter(Boolean);
}

export function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
`;
  writeFileSync(outPath, body);
}

function verify(words, days) {
  const errors = [];
  if (words.length < TARGET_WORDS) errors.push(`words=${words.length} (need ≥${TARGET_WORDS})`);
  if (days.length !== DAYS) errors.push(`days=${days.length} (need ${DAYS})`);

  const wordSet = new Set(words.map((w) => w.word.toLowerCase()));
  if (wordSet.size !== words.length) errors.push('duplicate words detected');

  const allIds = new Set(words.map((w) => w.id));
  const assignedIds = new Set();
  let totalAssigned = 0;

  for (const day of days) {
    if (day.vocabIds.length !== WORDS_PER_DAY) {
      errors.push(`day ${day.day} has ${day.vocabIds.length} words (need ${WORDS_PER_DAY})`);
    }
    for (const id of day.vocabIds) {
      totalAssigned++;
      if (assignedIds.has(id)) errors.push(`id ${id} assigned to multiple days`);
      assignedIds.add(id);
      if (!allIds.has(id)) errors.push(`day ${day.day}: unresolved id ${id}`);
    }
  }

  if (totalAssigned !== words.length) {
    errors.push(`coverage mismatch: ${totalAssigned} assigned vs ${words.length} words`);
  }

  for (const w of words) {
    for (const key of ['id', 'word', 'phonetic', 'pos', 'zh', 'enDef', 'example', 'exampleZh', 'topic']) {
      if (w[key] == null || w[key] === '') errors.push(`word ${w.id} missing ${key}`);
    }
  }

  return errors;
}

const words = assignIds(existingWords, RAW_NEW_IELTS);
const days = buildDays(words);
const errors = verify(words, days);

if (errors.length) {
  console.error('VERIFICATION FAILED:');
  errors.forEach((e) => console.error('  -', e));
  process.exit(1);
}

writeIelts(words, days);

console.log(JSON.stringify({
  words: words.length,
  uniqueWords: new Set(words.map((w) => w.word.toLowerCase())).size,
  days: days.length,
  wordsPerDay: days.map((d) => d.vocabIds.length),
  keptExisting: Math.min(existingWords.length, 500),
  newAdded: words.length - Math.min(existingWords.length, 500),
  rawPool: RAW_NEW_IELTS.length,
}, null, 2));
