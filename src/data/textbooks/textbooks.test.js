import { describe, it, expect } from 'vitest';
import { TEXTBOOK_SHELVES, getShelf, getBook, getUnit, textbookTotalWords } from './meta.js';
import { parseHash, toHash } from '../../router.js';

describe('textbook shelves', () => {
  it('exposes four shelves with the expected book counts', () => {
    const byId = Object.fromEntries(TEXTBOOK_SHELVES.map((s) => [s.id, s.books.length]));
    expect(byId['pri-g1']).toBe(12);
    expect(byId['pri-g3']).toBe(8);
    expect(byId['mid']).toBe(5);
    expect(byId['hs']).toBe(7);
  });

  it('every book has units with stable ids', () => {
    for (const shelf of TEXTBOOK_SHELVES) {
      for (const book of shelf.books) {
        expect(book.units.length).toBeGreaterThan(0);
        const ids = new Set(book.units.map((u) => u.id));
        expect(ids.size).toBe(book.units.length);
        for (const u of book.units) {
          expect(typeof u.en).toBe('string');
          expect(typeof u.zh).toBe('string');
        }
      }
    }
  });

  it('looks up shelves, books and units', () => {
    expect(getShelf('pri-g3').id).toBe('pri-g3');
    expect(getBook('pri-g3', 'g3-3a').id).toBe('g3-3a');
    expect(getUnit('pri-g3', 'g3-3a', 'u1').id).toBe('u1');
    expect(getBook('pri-g3', 'nope')).toBeNull();
    expect(getUnit('mid', 'mid-9', 'u14').id).toBe('u14');
  });

  it('reports a positive total word count per shelf', () => {
    for (const shelf of TEXTBOOK_SHELVES) {
      expect(textbookTotalWords(shelf.id)).toBeGreaterThan(0);
    }
  });
});

describe('textbook hash routes', () => {
  it('round-trips shelf, book and unit hashes', () => {
    expect(toHash('tb-shelf', { shelf: 'mid' })).toBe('#/books/mid');
    expect(toHash('tb-book', { shelf: 'mid', book: 'mid-7a' })).toBe('#/books/mid/mid-7a');
    expect(toHash('tb-unit', { shelf: 'mid', book: 'mid-7a', unit: 'u1' })).toBe('#/books/mid/mid-7a/u1');
    expect(toHash('tb-unit', { shelf: 'pri-g1', book: 'g1-1a', unit: 'u2' })).toBe('#/books/pri-g1/g1-1a/u2');
    expect(toHash('tb-book', { shelf: 'hs', book: 'b1' })).toBe('#/books/hs/b1');
    expect(parseHash('#/books/mid/mid-7a')).toEqual({
      name: 'tb-book',
      params: { shelf: 'mid', book: 'mid-7a' },
    });
    expect(parseHash('#/books/hs/b1/welcome')).toEqual({
      name: 'tb-unit',
      params: { shelf: 'hs', book: 'b1', unit: 'welcome' },
    });
    expect(parseHash(toHash('tb-unit', { shelf: 'pri-g3', book: 'g3-3a', unit: 'u1' }))).toEqual({
      name: 'tb-unit',
      params: { shelf: 'pri-g3', book: 'g3-3a', unit: 'u1' },
    });
  });

  it('does not send unit clicks to the home hash', () => {
    expect(toHash('tb-unit', { shelf: 'mid', book: 'mid-7a', unit: 'u3' })).not.toBe('#/');
  });
});
