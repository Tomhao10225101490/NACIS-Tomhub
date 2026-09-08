import { AMC_ARCHIVE, AMC_LINKS, AMC_FORMAT, AMC_DATES_2026 } from './catalog.js';
import { amcQuestionPoints, amcMaxScore, answersMatch, formatAmcAnswer, scoreAmc } from './score.js';
import { optText } from './helpers.js';

export { AMC_ARCHIVE, AMC_LINKS, AMC_FORMAT, AMC_DATES_2026 };
export { amcQuestionPoints, amcMaxScore, answersMatch, formatAmcAnswer, scoreAmc, optText };

export const AMC_PAPERS_META = [
  {
    id: 'warmup',
    titleZh: 'C 卷试手 · 10 题',
    titleEn: 'C warmup · 10 Q',
    blurbZh: '算术与基础图形热身',
    blurbEn: 'Arithmetic and first diagrams',
    minutes: 20,
    count: 10,
    kind: 'warmup',
    scoring: 'flat3',
    icon: '🌱',
  },
  {
    id: 'mock-1',
    titleZh: 'AMC-C 模考卷一',
    titleEn: 'AMC-C Mock Paper 1',
    blurbZh: '完整 30 题 · 官方计分 135 分',
    blurbEn: 'Full 30 questions · 135 marks',
    minutes: 75,
    count: 30,
    kind: 'full',
    scoring: 'amc',
    icon: '①',
  },
  {
    id: 'mock-2',
    titleZh: 'AMC-C 模考卷二',
    titleEn: 'AMC-C Mock Paper 2',
    blurbZh: '第二套完整卷 · 前易后难',
    blurbEn: 'Second full paper · easy to hard',
    minutes: 75,
    count: 30,
    kind: 'full',
    scoring: 'amc',
    icon: '②',
  },
  {
    id: 'mock-3',
    titleZh: 'AMC-C 模考卷三',
    titleEn: 'AMC-C Mock Paper 3',
    blurbZh: '数论与计数',
    blurbEn: 'Number theory and counting',
    minutes: 75,
    count: 30,
    kind: 'full',
    scoring: 'amc',
    icon: '③',
  },
  {
    id: 'mock-4',
    titleZh: 'AMC-C 模考卷四',
    titleEn: 'AMC-C Mock Paper 4',
    blurbZh: '代数与几何',
    blurbEn: 'Algebra and geometry',
    minutes: 75,
    count: 30,
    kind: 'full',
    scoring: 'amc',
    icon: '④',
  },
  {
    id: 'mock-5',
    titleZh: 'AMC-C 模考卷五',
    titleEn: 'AMC-C Mock Paper 5',
    blurbZh: '几何与图形计数',
    blurbEn: 'Geometry and counting figures',
    minutes: 75,
    count: 30,
    kind: 'full',
    scoring: 'amc',
    icon: '⑤',
  },
  {
    id: 'mock-6',
    titleZh: 'AMC-C 模考卷六',
    titleEn: 'AMC-C Mock Paper 6',
    blurbZh: '分数、比与统计',
    blurbEn: 'Fractions, ratios and statistics',
    minutes: 75,
    count: 30,
    kind: 'full',
    scoring: 'amc',
    icon: '⑥',
  },
  {
    id: 'mock-7',
    titleZh: 'AMC-C 模考卷七',
    titleEn: 'AMC-C Mock Paper 7',
    blurbZh: '应用题与时间速率',
    blurbEn: 'Word problems and rates',
    minutes: 75,
    count: 30,
    kind: 'full',
    scoring: 'amc',
    icon: '⑦',
  },
  {
    id: 'mock-8',
    titleZh: 'AMC-C 模考卷八',
    titleEn: 'AMC-C Mock Paper 8',
    blurbZh: '组合与逻辑',
    blurbEn: 'Combinatorics and logic',
    minutes: 75,
    count: 30,
    kind: 'full',
    scoring: 'amc',
    icon: '⑧',
  },
  {
    id: 'mock-9',
    titleZh: 'AMC-C 模考卷九',
    titleEn: 'AMC-C Mock Paper 9',
    blurbZh: '数列与图形面积',
    blurbEn: 'Sequences and area',
    minutes: 75,
    count: 30,
    kind: 'full',
    scoring: 'amc',
    icon: '⑨',
  },
  {
    id: 'mock-10',
    titleZh: 'AMC-C 模考卷十',
    titleEn: 'AMC-C Mock Paper 10',
    blurbZh: '综合收官',
    blurbEn: 'A mixed finale',
    minutes: 75,
    count: 30,
    kind: 'full',
    scoring: 'amc',
    icon: '⑩',
  },
  {
    id: 'geo',
    titleZh: '几何图专题',
    titleEn: 'Geometry figures',
    blurbZh: '10 题全配清晰矢量图',
    blurbEn: '10 questions with vector diagrams',
    minutes: 25,
    count: 10,
    kind: 'sprint',
    scoring: 'flat3',
    icon: '△',
  },
  {
    id: 'int',
    titleZh: '整数题冲刺',
    titleEn: 'Integer sprint',
    blurbZh: '模拟最后五题 0–999',
    blurbEn: 'Last five questions, answers 0–999',
    minutes: 20,
    count: 5,
    kind: 'sprint',
    scoring: 'amc',
    icon: '🔢',
  },
];

const loaders = {
  warmup: () => import('./warmup.js').then((m) => m.paper),
  'mock-1': () => import('./mock1.js').then((m) => m.paper),
  'mock-2': () => import('./mock2.js').then((m) => m.paper),
  'mock-3': () => import('./mock3.js').then((m) => m.paper),
  'mock-4': () => import('./mock4.js').then((m) => m.paper),
  'mock-5': () => import('./mock5.js').then((m) => m.paper),
  'mock-6': () => import('./mock6.js').then((m) => m.paper),
  'mock-7': () => import('./mock7.js').then((m) => m.paper),
  'mock-8': () => import('./mock8.js').then((m) => m.paper),
  'mock-9': () => import('./mock9.js').then((m) => m.paper),
  'mock-10': () => import('./mock10.js').then((m) => m.paper),
  geo: () => import('./geo.js').then((m) => m.paper),
  int: () => import('./int.js').then((m) => m.paper),
};

const cache = {};

export function getAmcPaperMeta(id) {
  return AMC_PAPERS_META.find((p) => p.id === id) || null;
}

export async function getAmcPaper(id) {
  if (!loaders[id]) return null;
  if (!cache[id]) cache[id] = loaders[id]();
  return cache[id];
}

export function paperTitle(meta, lang) {
  if (!meta) return '';
  if (lang === 'en') return meta.titleEn;
  if (lang === 'zh') return meta.titleZh;
  if (meta.titleZh !== meta.titleEn) return `${meta.titleZh} · ${meta.titleEn}`;
  return meta.titleZh;
}

export function paperBlurb(meta, lang) {
  if (!meta) return '';
  if (lang === 'en') return meta.blurbEn;
  if (lang === 'zh') return meta.blurbZh;
  if (meta.blurbZh !== meta.blurbEn) return `${meta.blurbZh} · ${meta.blurbEn}`;
  return meta.blurbZh;
}
