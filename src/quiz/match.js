import { shuffle } from '../util/shuffle.js';

/** Build 6 EN–ZH match pairs from a word bank. */
export function dealMatchPairs(words, n = 6) {
  const pool = shuffle(words.filter((w) => w && w.word && (w.zh || w.enDef))).slice(0, n);
  const left = shuffle(pool.map((v) => ({ id: v.id, text: v.word, side: 'en' })));
  const right = shuffle(
    pool.map((v) => ({
      id: v.id,
      text: /[\u4e00-\u9fff]/.test(v.zh || '') ? v.zh.split(/[；;]/)[0] : v.enDef || v.zh,
      side: 'zh',
    }))
  );
  return { pool, left, right };
}
