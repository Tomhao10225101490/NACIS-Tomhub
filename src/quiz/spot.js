import { shuffle } from '../util/shuffle.js';
import { escapeRegExp } from '../util/escape.js';

/** True if the quiz prompt already contains the answer word/phrase. */
export function promptContainsAnswer(prompt, answer) {
  const a = String(answer || '').trim();
  if (!a) return false;
  const p = String(prompt || '');
  if (/\s/.test(a) || /[^a-zA-Z0-9']/.test(a)) {
    return p.toLowerCase().includes(a.toLowerCase());
  }
  return new RegExp(`\\b${escapeRegExp(a)}\\b`, 'i').test(p);
}

/** Strip Latin leftovers from Chinese glosses so prompts don't echo the answer. */
export function scrubGlossForSpot(text, answer) {
  let t = String(text || '');
  const a = String(answer || '').trim();
  if (a) {
    t = t.replace(new RegExp(escapeRegExp(a), 'ig'), '____');
  }
  t = t.replace(/[A-Za-z][A-Za-z'.\/-]*/g, '').replace(/[()（）]+/g, ' ').replace(/\s+/g, ' ').trim();
  t = t.replace(/^[；;，,\s]+|[；;，,\s]+$/g, '').replace(/\s*[；;]\s*/g, '；');
  return t;
}

/**
 * Spot check: pick the English word from a safe gloss.
 * Never put the target English word into the prompt (no giveaways).
 */
export function makeEnWordSpotItem(w, bank, { preferEnDef = false } = {}) {
  const zhRaw = String(w.zh || '');
  const zhHasChinese = /[\u4e00-\u9fff]/.test(zhRaw);
  const enSafe = w.enDef && !promptContainsAnswer(w.enDef, w.word) ? String(w.enDef) : '';
  let prompt = '';

  if (preferEnDef && enSafe) {
    prompt = `${enSafe}\n(${w.pos || ''})`.trim();
  } else if (zhHasChinese) {
    prompt = scrubGlossForSpot(zhRaw, w.word);
    if (w.pos) prompt = `${prompt}\n(${w.pos})`.trim();
  } else if (enSafe) {
    prompt = `${enSafe}\n(${w.pos || ''})`.trim();
  }

  if (!prompt || promptContainsAnswer(prompt, w.word)) {
    prompt = zhHasChinese ? scrubGlossForSpot(zhRaw, w.word) : '';
    if ((!prompt || promptContainsAnswer(prompt, w.word)) && enSafe) prompt = enSafe;
    if (!prompt || promptContainsAnswer(prompt, w.word)) {
      prompt = '（根据释义选择正确单词）';
    }
    if (w.pos) prompt = `${prompt}\n(${w.pos})`;
  }

  const distractors = shuffle(bank.filter((x) => x.id !== w.id && x.word !== w.word))
    .slice(0, 3)
    .map((x) => x.word);
  while (distractors.length < 3) distractors.push('—');
  return {
    id: w.id,
    prompt,
    answer: w.word,
    tip: `${w.word} ${w.phonetic || ''}\n${w.zh || ''} · ${w.enDef || ''}\n${w.example || ''}\n${w.exampleZh || ''}`.trim(),
    options: shuffle([w.word, ...distractors.slice(0, 3)]),
    word: w,
  };
}
