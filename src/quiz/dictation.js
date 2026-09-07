/** Spelling / dictation helpers. */

export function normalizeSpelling(s) {
  return String(s || '')
    .trim()
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/\s+/g, ' ');
}

export function spellingOk(input, answer) {
  return normalizeSpelling(input) === normalizeSpelling(answer);
}

export function makeDictationItem(w) {
  const zh = String(w.zh || '');
  const hint = /[\u4e00-\u9fff]/.test(zh) ? zh : String(w.enDef || '');
  return {
    id: w.id,
    word: w.word,
    answer: w.word,
    hint,
    phonetic: w.phonetic || '',
    pos: w.pos || '',
    tip: `${w.word} ${w.phonetic || ''}\n${w.zh || ''} · ${w.enDef || ''}`.trim(),
  };
}
