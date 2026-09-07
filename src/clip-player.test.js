import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  sanitizeClipWord,
  parsePipedVideoId,
  parseBiliVideoIds,
  parseJinaPayload,
  clipsFromMap,
  setClipMap,
  biliPlayerUrl,
  mountClipPlayer,
  unmountClipPlayer,
  stopClipPlayback,
  replayClip,
  nextClip,
  resetClipCaches,
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

describe('parsePipedVideoId', () => {
  it('reads a watch URL', () => {
    expect(parsePipedVideoId({ url: '/watch?v=txnw22dayGU' })).toBe('txnw22dayGU');
  });
  it('reads a raw id', () => {
    expect(parsePipedVideoId('dQw4w9wgGcQ')).toBe('dQw4w9wgGcQ');
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
        this.played = 0;
      }
      fetch(q, lang, accent) {
        this.fetches.push({ q, lang, accent });
        onFetch?.(this, { q, lang, accent });
      }
      pause() {
        this.paused += 1;
      }
      play() {
        this.played += 1;
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

function stubFetchReject() {
  vi.stubGlobal(
    'fetch',
    vi.fn(() => Promise.reject(new Error('offline')))
  );
}

function stubYoutubeOk() {
  vi.stubGlobal(
    'Image',
    class {
      set src(_v) {
        this.onload?.();
      }
    }
  );
}

function stubYoutubeBlocked() {
  vi.stubGlobal(
    'Image',
    class {
      set src(_v) {
        this.onerror?.();
      }
    }
  );
}

describe('parseBiliVideoIds', () => {
  it('reads bvid fields from a type-search payload', () => {
    expect(
      parseBiliVideoIds({
        data: {
          result: [{ bvid: 'BV1xx411c7mD', type: 'video' }, { bvid: 'BV1xx411c7mD' }, { bvid: 'BV1yy411c7mE' }],
        },
      })
    ).toEqual(['BV1xx411c7mD', 'BV1yy411c7mE']);
  });
});

describe('parseJinaPayload', () => {
  it('extracts JSON after the markdown wrapper', () => {
    const payload = parseJinaPayload('Title:\n\nMarkdown Content:\n{"code":0,"data":{"result":[{"bvid":"BV1aa411c7mD"}]}}');
    expect(parseBiliVideoIds(payload)).toEqual(['BV1aa411c7mD']);
  });
});

describe('clipsFromMap', () => {
  afterEach(() => setClipMap({}));

  it('returns hidden Bilibili tracks for a headword', () => {
    setClipMap({ hello: ['BV1xx411c7mD', 'BV1yy411c7mE'] });
    expect(clipsFromMap('Hello')).toEqual([
      { kind: 'bili', id: 'BV1xx411c7mD' },
      { kind: 'bili', id: 'BV1yy411c7mE' },
    ]);
    expect(biliPlayerUrl('BV1xx411c7mD')).toContain('player.bilibili.com');
    expect(biliPlayerUrl('BV1xx411c7mD')).toContain('isOutside=true');
    expect(biliPlayerUrl('BV1xx411c7mD')).toContain('bvid=BV1xx411c7mD');
  });
});

describe('mountClipPlayer', () => {
  afterEach(() => {
    unmountClipPlayer();
    resetClipCaches();
    setClipMap({});
    delete window.YG;
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it('reports unavailable for empty / non-English words', async () => {
    const el = document.createElement('div');
    const unavailable = vi.fn();
    await mountClipPlayer(el, '欢迎', { onUnavailable: unavailable });
    expect(unavailable).toHaveBeenCalledTimes(1);
  });

  it('starts the widget in the same turn when the API is already loaded', () => {
    stubYoutubeOk();
    stubFetchReject();
    mockWidget();
    const el = document.createElement('div');
    document.body.append(el);
    const w = mountClipPlayer(el, 'fast');
    expect(w).not.toBeNull();
    expect(w.opts.autoStart).toBe(1);
    expect(w.fetches[0]).toEqual({ q: 'fast', lang: 'english', accent: 'uk' });
    el.remove();
  });

  it('falls back to all accents then another route when UK has no hits', async () => {
    stubYoutubeOk();
    stubFetchReject();
    mockWidget({
      onFetch(widget) {
        widget.opts.events.onFetchDone({ totalResult: 0 });
      },
    });
    const el = document.createElement('div');
    document.body.append(el);
    const unavailable = vi.fn();
    const w = mountClipPlayer(el, 'headlong', { onUnavailable: unavailable });
    expect(w.fetches).toHaveLength(2);
    await vi.waitFor(() => expect(unavailable).toHaveBeenCalledTimes(1));
    el.remove();
  });

  it('does not navigate away when the player never becomes ready', async () => {
    vi.useFakeTimers();
    stubYoutubeOk();
    stubFetchReject();
    mockWidget({
      onFetch(widget) {
        widget.opts.events.onFetchDone({ totalResult: 3 });
      },
    });
    const el = document.createElement('div');
    document.body.append(el);
    const unavailable = vi.fn();
    mountClipPlayer(el, 'broad', { onUnavailable: unavailable });
    expect(unavailable).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(4500);
    expect(unavailable).toHaveBeenCalledTimes(1);
    expect(document.querySelector('a[href*="youglish"]')).toBeNull();
    el.remove();
  });

  it('replays and skips via the mounted widget', async () => {
    stubYoutubeOk();
    stubFetchReject();
    mockWidget({
      onFetch(widget) {
        widget.opts.events.onFetchDone({ totalResult: 2 });
        widget.opts.events.onPlayerReady();
      },
    });
    const el = document.createElement('div');
    document.body.append(el);
    const w = mountClipPlayer(el, 'courage');
    expect(w.opts.autoStart).toBe(1);
    expect(w.played).toBeGreaterThan(0);
    replayClip();
    nextClip();
    expect(w.replayed).toBe(1);
    expect(w.nexted).toBe(1);
    unmountClipPlayer();
    expect(el.childNodes.length).toBe(0);
    el.remove();
  });

  it('stopClipPlayback clears the stage but keeps sibling fail copy', async () => {
    stubYoutubeOk();
    stubFetchReject();
    mockWidget({
      onFetch(widget) {
        widget.opts.events.onFetchDone({ totalResult: 2 });
        widget.opts.events.onPlayerReady();
      },
    });
    const wrap = document.createElement('div');
    const stage = document.createElement('div');
    const fail = document.createElement('p');
    fail.textContent = '当前网络无法加载视频';
    wrap.append(stage, fail);
    document.body.append(wrap);
    mountClipPlayer(stage, 'courage');
    stopClipPlayback();
    expect(fail.isConnected).toBe(true);
    expect(fail.textContent).toBe('当前网络无法加载视频');
    expect(wrap.contains(fail)).toBe(true);
    wrap.remove();
  });

  it('uses a hidden domestic embed from the local map when YouTube cannot play', async () => {
    setClipMap({ hello: ['BV1xx411c7mD'] });
    stubYoutubeBlocked();
    stubFetchReject();
    const el = document.createElement('div');
    document.body.append(el);
    mountClipPlayer(el, 'hello');
    await vi.waitFor(() => {
      const src = el.querySelector('iframe')?.getAttribute('src') || '';
      expect(src).toContain('isOutside=true');
      expect(src).toContain('bvid=BV1xx411c7mD');
    });
    nextClip();
    replayClip();
    expect(el.querySelector('iframe')?.getAttribute('src') || '').toContain('bilibili.com');
    el.remove();
  });

  it('uses a hidden in-page embed when YouTube cannot play', async () => {
    stubYoutubeBlocked();
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({
        ok: true,
        json: async () => ({
          items: [{ type: 'stream', url: '/watch?v=dQw4w9wgGcQ', title: 'hello' }],
        }),
      }))
    );
    const el = document.createElement('div');
    document.body.append(el);
    mountClipPlayer(el, 'hello');
    await vi.waitFor(() => {
      const src = el.querySelector('iframe')?.getAttribute('src') || '';
      expect(src).toContain('embed/dQw4w9wgGcQ');
      expect(src).toContain('autoplay=1');
    });
    nextClip();
    replayClip();
    expect(el.querySelector('iframe')).toBeTruthy();
    el.remove();
  });
});
