import { describe, it, expect } from 'vitest';
import { TEXTBOOK_SHELVES, getShelf, getBook, getUnit, textbookTotalWords } from './meta.js';

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
