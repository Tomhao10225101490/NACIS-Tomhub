import { describe, it, expect } from 'vitest';
import { parseHash, toHash } from '../../router.js';
import {
  amcQuestionPoints,
  amcMaxScore,
  scoreAmc,
  answersMatch,
  AMC_PAPERS_META,
  AMC_ARCHIVE,
  getAmcPaper,
} from './index.js';
import { paper as mock1 } from './mock1.js';
import { paper as mock2 } from './mock2.js';
import { paper as warmup } from './warmup.js';
import { paper as geo } from './geo.js';
import { paper as intPaper } from './int.js';
import { paper as mock3 } from './mock3.js';
import { paper as mock4 } from './mock4.js';
import { paper as mock5 } from './mock5.js';
import { paper as mock6 } from './mock6.js';
import { paper as mock7 } from './mock7.js';
import { paper as mock8 } from './mock8.js';
import { paper as mock9 } from './mock9.js';
import { paper as mock10 } from './mock10.js';

describe('AMC scoring', () => {
  it('matches official secondary marks', () => {
    const pts = (n) => amcQuestionPoints({ n }, { scoring: 'amc' });
    expect(pts(1)).toBe(3);
    expect(pts(10)).toBe(3);
    expect(pts(11)).toBe(4);
    expect(pts(20)).toBe(4);
    expect(pts(21)).toBe(5);
    expect(pts(25)).toBe(5);
    expect(pts(26)).toBe(6);
    expect(pts(30)).toBe(10);
    expect(amcMaxScore(mock1.questions, mock1)).toBe(135);
    expect(amcMaxScore(mock2.questions, mock2)).toBe(135);
  });

  it('scores a perfect mock paper at 135', () => {
    const answers = Object.fromEntries(
      mock1.questions.map((q) => [q.n, q.answer])
    );
    const r = scoreAmc(mock1.questions, answers, mock1);
    expect(r.points).toBe(135);
    expect(r.correct).toBe(30);
    expect(r.unanswered).toBe(0);
  });

  it('gives zero for blanks and wrong MCQ', () => {
    const r = scoreAmc(
      mock1.questions,
      { 1: 'A', 2: '' },
      mock1
    );
    expect(r.rows[0].ok).toBe(false);
    expect(r.rows[1].blank).toBe(true);
    expect(r.points).toBe(0);
  });
});

describe('AMC papers', () => {
  const all = [warmup, mock1, mock2, geo, intPaper];

  it('exposes thirteen practice sets (10 full mocks + 3 sprints)', () => {
    expect(AMC_PAPERS_META.map((p) => p.id)).toEqual([
      'warmup',
      'mock-1',
      'mock-2',
      'mock-3',
      'mock-4',
      'mock-5',
      'mock-6',
      'mock-7',
      'mock-8',
      'mock-9',
      'mock-10',
      'geo',
      'int',
    ]);
    expect(AMC_PAPERS_META.filter((p) => p.kind === 'full')).toHaveLength(10);
  });

  it('keeps a 2016–2025 C-paper archive', () => {
    expect(AMC_ARCHIVE.map((y) => y.year)).toEqual([
      2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016,
    ]);
    expect(AMC_ARCHIVE.every((y) => y.paper === 'C')).toBe(true);
  });

  it('gives every MCQ five options and a letter key', () => {
    const every = [warmup, mock1, mock2, mock3, mock4, mock5, mock6, mock7, mock8, mock9, mock10, geo, intPaper];
    for (const paper of every) {
      for (const q of paper.questions) {
        if (q.type === 'mcq') {
          expect(q.options).toHaveLength(5);
          expect('ABCDE').toContain(q.answer);
        } else {
          expect(q.type).toBe('int');
          expect(q.answer).toBeGreaterThanOrEqual(0);
          expect(q.answer).toBeLessThanOrEqual(999);
        }
        expect(q.stemEn.length).toBeGreaterThan(4);
        expect(q.explainEn.length).toBeGreaterThan(4);
      }
    }
  });

  it('numbers full mocks 1–30 with 25 MCQ then 5 integers', () => {
    const fulls = [mock1, mock2, mock3, mock4, mock5, mock6, mock7, mock8, mock9, mock10];
    for (const paper of fulls) {
      expect(paper.questions.map((q) => q.n)).toEqual([...Array(30)].map((_, i) => i + 1));
      expect(paper.questions.filter((q) => q.type === 'mcq')).toHaveLength(25);
      expect(paper.questions.filter((q) => q.type === 'int')).toHaveLength(5);
      expect(paper.questions.slice(25).every((q) => q.type === 'int')).toBe(true);
    }
  });

  it('every full mock scores to 135', () => {
    const fulls = [mock1, mock2, mock3, mock4, mock5, mock6, mock7, mock8, mock9, mock10];
    for (const paper of fulls) {
      expect(amcMaxScore(paper.questions, paper)).toBe(135);
      const perfect = Object.fromEntries(paper.questions.map((q) => [q.n, q.answer]));
      const r = scoreAmc(paper.questions, perfect, paper);
      expect(r.points).toBe(135);
    }
  });

  it('ships SVG figures that include a viewBox', () => {
    const figured = [
      ...mock1.questions,
      ...mock2.questions,
      ...mock3.questions,
      ...mock4.questions,
      ...mock5.questions,
      ...mock6.questions,
      ...mock7.questions,
      ...mock8.questions,
      ...mock9.questions,
      ...mock10.questions,
      ...geo.questions,
    ].filter((q) => q.figure);
    expect(figured.length).toBeGreaterThan(20);
    for (const q of figured) {
      expect(q.figure).toContain('<svg');
      expect(q.figure).toContain('viewBox');
    }
  });

  it('matches integer answers exactly', () => {
    const q = mock1.questions.find((x) => x.n === 26);
    expect(answersMatch(q, 12)).toBe(true);
    expect(answersMatch(q, '12')).toBe(true);
    expect(answersMatch(q, 13)).toBe(false);
  });

  it('lazy-loads papers by id', async () => {
    const p = await getAmcPaper('mock-1');
    expect(p.id).toBe('mock-1');
    expect(p.questions).toHaveLength(30);
  });
});

describe('AMC routes', () => {
  it('parses hub and paper hashes', () => {
    expect(parseHash('#/amc')).toEqual({ name: 'amc', params: {} });
    expect(parseHash('#/amc/paper/mock-1')).toEqual({
      name: 'amc-paper',
      params: { paper: 'mock-1', mode: 'contest' },
    });
    expect(parseHash('#/amc/paper/geo/practice')).toEqual({
      name: 'amc-paper',
      params: { paper: 'geo', mode: 'practice' },
    });
  });

  it('round-trips paper routes', () => {
    expect(toHash('amc')).toBe('#/amc');
    expect(toHash('amc-paper', { paper: 'mock-2', mode: 'practice' })).toBe(
      '#/amc/paper/mock-2/practice'
    );
    expect(parseHash(toHash('amc-paper', { paper: 'warmup' })).params.paper).toBe('warmup');
  });
});
