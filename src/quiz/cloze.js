import { shuffle } from '../util/shuffle.js';
import { escapeRegExp } from '../util/escape.js';
import { promptContainsAnswer } from './spot.js';

/** Turn an example sentence into a blank for the headword. */
export function makeClozeItem(w, bank = []) {
  const word = String(w.word || '').trim();
  const example = String(w.example || '').trim();
  if (!word || !example) return null;
  const re = new RegExp(`\\b${escapeRegExp(word)}\\b`, 'i');
  if (!re.test(example)) return null;
  const prompt = example.replace(re, '______');
  if (promptContainsAnswer(prompt, word)) return null;
  const distractors = shuffle((bank || []).filter((x) => x.id !== w.id && x.word && x.word !== word))
    .slice(0, 3)
    .map((x) => x.word);
  while (distractors.length < 3) distractors.push('—');
  return {
    id: w.id,
    prompt: `${prompt}${w.exampleZh ? `\n${w.exampleZh}` : ''}`,
    answer: word,
    options: shuffle([word, ...distractors.slice(0, 3)]),
    tip: `${w.word} ${w.phonetic || ''}\n${w.zh || ''} · ${w.enDef || ''}\n${w.example || ''}`.trim(),
    word: w,
  };
}

export function clozeItemsFromWords(words, bank) {
  return words.map((w) => makeClozeItem(w, bank)).filter(Boolean);
}
