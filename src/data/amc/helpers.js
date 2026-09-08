const LETTERS = ['A', 'B', 'C', 'D', 'E'];

function normalizeOpt(o) {
  if (typeof o === 'string' || typeof o === 'number') {
    const s = String(o);
    return { zh: s, en: s };
  }
  if (Array.isArray(o)) {
    return { zh: String(o[0]), en: String(o[1] ?? o[0]) };
  }
  return { zh: String(o.zh ?? o.en ?? ''), en: String(o.en ?? o.zh ?? '') };
}

export function mcq(n, topic, stemZh, stemEn, options, answer, explainZh, explainEn, figure = null) {
  if (!Array.isArray(options) || options.length !== 5) {
    throw new Error(`AMC Q${n} needs exactly 5 options`);
  }
  const letter = String(answer).toUpperCase();
  if (!LETTERS.includes(letter)) {
    throw new Error(`AMC Q${n} answer must be A–E`);
  }
  return {
    n,
    type: 'mcq',
    topic,
    stemZh,
    stemEn,
    options: options.map(normalizeOpt),
    answer: letter,
    explainZh,
    explainEn,
    figure,
  };
}

export function intq(n, topic, stemZh, stemEn, answer, explainZh, explainEn, figure = null) {
  const value = Number(answer);
  if (!Number.isInteger(value) || value < 0 || value > 999) {
    throw new Error(`AMC Q${n} integer answer must be 0–999`);
  }
  return {
    n,
    type: 'int',
    topic,
    stemZh,
    stemEn,
    options: [],
    answer: value,
    explainZh,
    explainEn,
    figure,
  };
}

export function optText(option, lang) {
  if (!option) return '';
  if (lang === 'zh') return option.zh || option.en || '';
  if (lang === 'en') return option.en || option.zh || '';
  if (option.zh && option.en && option.zh !== option.en) return `${option.zh}\n${option.en}`;
  return option.zh || option.en || '';
}
