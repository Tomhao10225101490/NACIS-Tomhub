import { describe, it, expect, beforeEach } from 'vitest';
import { promptContainsAnswer, makeEnWordSpotItem } from './spot.js';
import { parseHash, toHash } from '../router.js';
import { makeClozeItem } from './cloze.js';
import { reviewCard, dueEntries, applyReview } from './srs.js';
import { spellingOk } from './dictation.js';
import { normalizeState, migrateFromLegacy, STORE_VERSION, recordWrong, noteWrongResult, store } from '../store.js';

describe('promptContainsAnswer', () => {
  it('catches whole-word leaks', () => {
    expect(promptContainsAnswer('to exchange goods', 'exchange')).toBe(true);
    expect(promptContainsAnswer('verb meaning “交换”', 'exchange')).toBe(false);
  });
  it('is case-insensitive', () => {
    expect(promptContainsAnswer('Swiss people', 'Swiss')).toBe(true);
  });
});

describe('makeEnWordSpotItem', () => {
  const bank = [
    { id: '1', word: 'exchange', zh: '交换；交流', enDef: 'verb meaning “交换”', pos: 'vt.' },
    { id: '2', word: 'campus', zh: '校园', enDef: 'noun meaning “校园”', pos: 'n.' },
    { id: '3', word: 'formal', zh: '正式的', enDef: 'adjective meaning “正式的”', pos: 'adj.' },
    { id: '4', word: 'anxious', zh: '焦虑的', enDef: 'adjective meaning “焦虑的”', pos: 'adj.' },
  ];
  it('never puts the answer in the prompt', () => {
    const item = makeEnWordSpotItem(bank[0], bank, { preferEnDef: true });
    expect(promptContainsAnswer(item.prompt, item.answer)).toBe(false);
  });
});

describe('hash router', () => {
  it('parses hub and nested english routes', () => {
    expect(parseHash('#/hub/english')).toEqual({ name: 'hub-english', params: { hub: 'english' } });
    expect(parseHash('#/ielts/day/12')).toEqual({ name: 'ielts-day', params: { day: 12 } });
    expect(parseHash('#/hs/b1/u3')).toEqual({ name: 'hs-unit', params: { book: 'b1', unit: 'u3' } });
    expect(parseHash('#/wrong/quiz/english')).toEqual({ name: 'wrong-quiz', params: { subject: 'english' } });
    expect(parseHash('#/science/day/4')).toEqual({ name: 'science-day', params: { day: 4 } });
  });
  it('round-trips names', () => {
    expect(parseHash(toHash('home')).name).toBe('home');
    expect(parseHash(toHash('ielts-day', { day: 3 })).params.day).toBe(3);
    expect(parseHash(toHash('hs-book', { book: 'x2' })).params.book).toBe('x2');
  });
});

describe('cloze', () => {
  it('blanks the headword and does not leak it', () => {
    const item = makeClozeItem(
      { id: 'a', word: 'exchange', example: 'They exchange gifts at the party.', exampleZh: '他们在派对上交换礼物。', zh: '交换' },
      []
    );
    expect(item).toBeTruthy();
    expect(item.prompt.includes('______')).toBe(true);
    expect(promptContainsAnswer(item.prompt.split('\n')[0], 'exchange')).toBe(false);
  });
  it('returns null when the example lacks the word', () => {
    expect(makeClozeItem({ id: 'a', word: 'foo', example: 'No match here.' }, [])).toBeNull();
  });
});

describe('srs', () => {
  it('schedules a later due date after a correct answer', () => {
    const now = 1_700_000_000_000;
    const next = reviewCard({ ease: 2.5, interval: 0, due: 0, reps: 0, lapses: 0 }, true, now);
    expect(next.due).toBeGreaterThan(now);
    expect(next.interval).toBe(1);
  });
  it('puts a miss due about one day later', () => {
    const now = 1_700_000_000_000;
    const next = reviewCard({ ease: 2.5, interval: 10, due: 0, reps: 4, lapses: 0 }, false, now);
    expect(next.interval).toBe(1);
    expect(next.due).toBe(now + 86400000);
  });
  it('lists only due cards', () => {
    const now = 1000;
    const srs = applyReview({}, 'ielts:1', true, now);
    expect(dueEntries(srs, now).length).toBe(0);
    expect(dueEntries(srs, now + 2 * 86400000).length).toBe(1);
  });
});

describe('dictation', () => {
  it('ignores case and extra spaces', () => {
    expect(spellingOk('  Exchange ', 'exchange')).toBe(true);
    expect(spellingOk('exchage', 'exchange')).toBe(false);
  });
});

describe('wrong retest', () => {
  beforeEach(() => {
    localStorage.clear();
    store.wrong = [];
  });
  it('removes a card after two consecutive wins and resets on a miss', () => {
    recordWrong({ id: 'x', prompt: 'p', correctText: 'a', subject: 'english' });
    expect(noteWrongResult('x', true)).toBe(false);
    expect(store.wrong[0].winStreak).toBe(1);
    expect(noteWrongResult('x', false)).toBe(false);
    expect(store.wrong[0].winStreak).toBe(0);
    expect(noteWrongResult('x', true)).toBe(false);
    expect(noteWrongResult('x', true)).toBe(true);
    expect(store.wrong).toHaveLength(0);
  });
});

describe('store migrate', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it('normalizes a v1 payload', () => {
    const s = normalizeState({ version: 1, xp: 10, wrong: [{ id: 'a', correctText: 'x' }] });
    expect(s.version).toBe(STORE_VERSION);
    expect(s.wrong[0].answer).toBe('x');
  });
  it('reads legacy keys', () => {
    localStorage.setItem('nacis_xp', '42');
    localStorage.setItem('toms_ielts', JSON.stringify({ 1: { done: true } }));
    const s = migrateFromLegacy();
    expect(s.xp).toBe(42);
    expect(s.ieltsProgress['1'].done).toBe(true);
  });
});
