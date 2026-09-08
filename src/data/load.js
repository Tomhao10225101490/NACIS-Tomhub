/**
 * Cached dynamic loaders — first paint stays light; packs load on demand.
 * Features are unchanged; data arrives when you enter that subject.
 */

const ready = {
  science: null,
  ielts: null,
  chinese: null,
  math: null,
  amc: null,
  hs: {},
};

/** @type {Record<string, any>} */
export const packs = {
  vocabulary: [],
  subjects: {},
  questions: [],
  filterQuestions: () => [],
  days: [],
  getDay: () => null,
  dayVocab: () => [],
  dayQuestions: () => [],
  subjectLabel: (id) => id,
  elements: [],
  coreElements: [],
  compounds: [],
  GROUP_LABELS: [],
  buildPeriodicGrid: () => [],
  ieltsWords: [],
  ieltsDays: [],
  getIeltsDay: () => null,
  ieltsDayWords: () => [],
  hsWords: {},
  chineseWorks: [],
  chineseVocab: [],
  chineseQuestions: [],
  classicGloss: {},
  filterChineseWorks: () => [],
  filterChineseVocab: () => [],
  filterChineseQuestions: () => [],
  worksByGrade: () => [],
  gradeLabel: (g) => `${g}`,
  mathVocab: [],
  mathQuestions: [],
  amc: null,
};

export function ensureScience() {
  if (!ready.science) {
    ready.science = Promise.all([
      import('./vocabulary.js'),
      import('./questions.js'),
      import('./days.js'),
      import('./elements.js'),
    ]).then(([v, q, d, e]) => {
      packs.vocabulary = v.vocabulary;
      packs.subjects = v.subjects;
      packs.questions = q.questions;
      packs.filterQuestions = q.filterQuestions;
      packs.days = d.days;
      packs.getDay = d.getDay;
      packs.dayVocab = d.dayVocab;
      packs.dayQuestions = d.dayQuestions;
      packs.subjectLabel = d.subjectLabel;
      packs.elements = e.elements;
      packs.coreElements = e.coreElements;
      packs.compounds = e.compounds;
      packs.GROUP_LABELS = e.GROUP_LABELS;
      packs.buildPeriodicGrid = e.buildPeriodicGrid;
    });
  }
  return ready.science;
}

export function ensureIelts() {
  if (!ready.ielts) {
    ready.ielts = import('./ielts.js').then((m) => {
      packs.ieltsWords = m.ieltsWords;
      packs.ieltsDays = m.ieltsDays;
      packs.getIeltsDay = m.getIeltsDay;
      packs.ieltsDayWords = m.ieltsDayWords;
    });
  }
  return ready.ielts;
}

export function ensureChinese() {
  if (!ready.chinese) {
    ready.chinese = import('./chinese.js').then((m) => {
      packs.chineseWorks = m.chineseWorks;
      packs.chineseVocab = m.chineseVocab;
      packs.chineseQuestions = m.chineseQuestions;
      packs.classicGloss = m.classicGloss;
      packs.filterChineseWorks = m.filterChineseWorks;
      packs.filterChineseVocab = m.filterChineseVocab;
      packs.filterChineseQuestions = m.filterChineseQuestions;
      packs.worksByGrade = m.worksByGrade;
      packs.gradeLabel = m.gradeLabel;
    });
  }
  return ready.chinese;
}

const HS_LOADERS = {
  b1: () => import('./hs-english/b1.js'),
  b2: () => import('./hs-english/b2.js'),
  b3: () => import('./hs-english/b3.js'),
  x1: () => import('./hs-english/x1.js'),
  x2: () => import('./hs-english/x2.js'),
  x3: () => import('./hs-english/x3.js'),
  x4: () => import('./hs-english/x4.js'),
};

export function ensureHsEnglish(bookId) {
  if (!bookId || !HS_LOADERS[bookId]) return Promise.resolve();
  if (!ready.hs[bookId]) {
    ready.hs[bookId] = HS_LOADERS[bookId]().then((m) => {
      packs.hsWords[bookId] = m.words || [];
    });
  }
  return ready.hs[bookId];
}

export function ensureMath() {
  if (!ready.math) {
    ready.math = import('./math.js').then((m) => {
      packs.mathVocab = m.mathVocab;
      packs.mathQuestions = m.mathQuestions;
    });
  }
  return ready.math;
}

export function ensureAmc() {
  if (!ready.amc) {
    ready.amc = import('./amc/index.js').then((m) => {
      packs.amc = m;
    });
  }
  return ready.amc;
}

/** Prefetch packs after home paints (idle) so later navigations feel instant */
export function prefetchInBackground() {
  const run = () => {
    ensureScience().catch(() => {});
    setTimeout(() => ensureIelts().catch(() => {}), 900);
    setTimeout(() => ensureChinese().catch(() => {}), 1600);
    setTimeout(() => ensureMath().catch(() => {}), 2200);
    setTimeout(() => ensureAmc().catch(() => {}), 2800);
  };
  if (typeof requestIdleCallback === 'function') {
    requestIdleCallback(run, { timeout: 2800 });
  } else {
    setTimeout(run, 500);
  }
}
