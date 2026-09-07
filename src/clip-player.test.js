import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  sanitizeClipWord,
  mountClipPlayer,
  unmountClipPlayer,
  replayClip,
  nextClip,
} from './clip-player.js';

describe('sanitizeClipWord', () => {
  it('keeps a simple headword', () => {
    expect(sanitizeClipWord('Headlong')).toBe('headlong');
  });
  it('strips surrounding punctuation and extra words', () => {
    expect(sanitizeClipWord('  “breadth,” of knowledge')).toBe('breadth');
  });
  it('allows hyphen and apostrophe inside a word', () => {
    expect(sanitizeClipWord('well-being')).toBe('well-being');
    expect(sanitizeClipWord("don't")).toBe("don't");
  });
  it('returns empty for non-English tokens', () => {
    expect(sanitizeClipWord('欢迎')).toBe('');
    expect(sanitizeClipWord('')).toBe('');
  });
});

function mockWidget({ onFetch } = {}) {
  window.YG = {
    Widget: class {
      constructor(id, opts) {
        this.id = id;
        this.opts = opts;
        this.fetches = [];
        this.paused = 0;
        this.replayed = 0;
        this.nexted = 0;
      }
      fetch(q, lang, accent) {
        this.fetches.push({ q, lang, accent });
        onFetch?.(this, { q, lang, accent });
      }
      pause() {
        this.paused += 1;
      }
      close() {}
      replay() {
        this.replayed += 1;
      }
      next() {
        this.nexted += 1;
      }
    },
  };
}

describe('mountClipPlayer', () => {
  afterEach(() => {
    unmountClipPlayer();
    delete window.YG;
    vi.useRealTimers();
  });

  it('reports unavailable for empty / non-English words', async () => {
    const el = document.createElement('div');
    const unavailable = vi.fn();
    await mountClipPlayer(el, '欢迎', { onUnavailable: unavailable });
    expect(unavailable).toHaveBeenCalledTimes(1);
  });

  it('falls back to all accents then fails when UK has no hits', async () => {
    mockWidget({
      onFetch(widget) {
        widget.opts.events.onFetchDone({ totalResult: 0 });
      },
    });
    const el = document.createElement('div');
    document.body.append(el);
    const unavailable = vi.fn();
    const w = await mountClipPlayer(el, 'headlong', { onUnavailable: unavailable });
    expect(w.fetches).toHaveLength(2);
    expect(w.fetches[0]).toEqual({ q: 'headlong', lang: 'english', accent: 'uk' });
    expect(w.fetches[1]).toEqual({ q: 'headlong', lang: 'english', accent: undefined });
    expect(unavailable).toHaveBeenCalledTimes(1);
    el.remove();
  });

  it('does not navigate away when the player never becomes ready', async () => {
    vi.useFakeTimers();
    mockWidget({
      onFetch(widget) {
        widget.opts.events.onFetchDone({ totalResult: 3 });
      },
    });
    const el = document.createElement('div');
    document.body.append(el);
    const unavailable = vi.fn();
    await mountClipPlayer(el, 'broad', { onUnavailable: unavailable });
    expect(unavailable).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(12000);
    expect(unavailable).toHaveBeenCalledTimes(1);
    expect(document.querySelector('a[href*="youglish"]')).toBeNull();
    el.remove();
  });

  it('replays and skips via the mounted widget', async () => {
    mockWidget({
      onFetch(widget) {
        widget.opts.events.onFetchDone({ totalResult: 2 });
        widget.opts.events.onPlayerReady();
      },
    });
    const el = document.createElement('div');
    document.body.append(el);
    const w = await mountClipPlayer(el, 'courage');
    replayClip();
    nextClip();
    expect(w.replayed).toBe(1);
    expect(w.nexted).toBe(1);
    unmountClipPlayer();
    expect(el.childNodes.length).toBe(0);
    el.remove();
  });
});
