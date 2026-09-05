#!/usr/bin/env node
/** Completes ielts-vocab-large.mjs with 750 words (Media + 9 topics × 75) */
import { writeFileSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = dirname(fileURLToPath(import.meta.url));
const mediaRaw = readFileSync(join(dir, 'gen-large-vocab.mjs'), 'utf8');
const mediaMatch = mediaRaw.match(/t\('Media', \[([\s\S]*?)\]\),/);
if (!mediaMatch) throw new Error('Could not parse Media words');

function t(topic, rows) {
  return rows.map((r) => [...r, topic]);
}

// Parse is complex; reuse Media from running gen-large-vocab first
await import('./gen-large-vocab.mjs');
const { LARGE_WORDS: mediaOnly } = await import('./ielts-vocab-large.mjs');

const REST = JSON.parse(readFileSync(join(dir, 'ielts-vocab-rest.json'), 'utf8'));
const LARGE = [...mediaOnly, ...REST.flatMap(({ topic, words }) => t(topic, words))];

writeFileSync(join(dir, 'ielts-vocab-large.mjs'), `export const LARGE_WORDS = ${JSON.stringify(LARGE, null, 2)};\n`);
console.log('Large vocab total:', LARGE.length);
