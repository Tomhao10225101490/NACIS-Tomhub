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
