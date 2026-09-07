/** In-page vocab clips. Multiple hidden routes; the learner only sees one player. */

const SCRIPT_SRC = 'https://youglish.com/public/emb/widget.js';
const SLOT_ID = 'yg-clip-slot';
const LOAD_MS = 8000;
const YG_GIVEUP_MS = 4500;
const YT_PROBE_MS = 1600;
const SEARCH_MS = 5500;
/** Caption only — player is always shown; hide search / accent / title. */
const COMPONENTS_PLAYER_CAPTION = 8;

const YT_SEARCH = [
  'https://api.piped.private.coffee/search?q=QUERY&filter=videos',
  'https://pipedapi.ducks.party/search?q=QUERY&filter=videos',
  'https://pipedapi.kavin.rocks/search?q=QUERY&filter=videos',
  'https://inv.nadeko.net/api/v1/search?q=QUERY&type=video',
  'https://invidious.flokinet.to/api/v1/search?q=QUERY&type=video',
];

const YT_EMBED = [
  'https://piped.private.coffee/embed/ID?autoplay=1',
  'https://piped.ducks.party/embed/ID?autoplay=1',
  'https://inv.nadeko.net/embed/ID?autoplay=1',
  'https://www.youtube-nocookie.com/embed/ID?autoplay=1&playsinline=1&rel=0',
  'https://www.youtube.com/embed/ID?autoplay=1&playsinline=1&rel=0',
];

const BILI_EMBED = [
  'https://player.bilibili.com/player.html?isOutside=true&bvid=ID&p=1&autoplay=1&high_quality=1&danmaku=0&as_wide=1',
  'https://www.bilibili.com/blackboard/html5mobileplayer.html?isOutside=true&bvid=ID&p=1&autoplay=1&danmaku=0&high_quality=1',
  'https://player.bilibili.com/player.html?bvid=ID&page=1&autoplay=1&high_quality=1&danmaku=0&as_wide=1',
];

let scriptPromise = null;
let widget = null;
let host = null;
let activeWord = '';
let playTimer = null;
let route = 'none';
let tracks = [];
let trackIndex = 0;
let embedIndex = 0;
let ytBlockedPromise = null;
let ytBlockedCached = null;
let localMap = {};
const searchCache = new Map();

/** Keep only a single English headword for the widget query. */
export function sanitizeClipWord(word) {
  const raw = String(word || '')
    .trim()
    .toLowerCase()
    .replace(/[’`]/g, "'");
  const m = raw.match(/[a-z][a-z'-]*[a-z]|[a-z]/);
  return m ? m[0].replace(/^'+|'+$/g, '') : '';
}

export function clipLookupKey(word) {
  return String(word || '')
    .trim()
    .toLowerCase()
    .replace(/[’`]/g, "'");
}

export function setClipMap(map) {
  localMap = map && typeof map === 'object' ? map : {};
}

export function parsePipedVideoId(item) {
  const u = String(item?.videoId || item?.url || item?.id || item || '');
  const m = u.match(/[?&]v=([\w-]{11})/) || u.match(/embed\/([\w-]{11})/) || u.match(/(?:^|\/)([\w-]{11})$/);
  return m ? m[1] : '';
}

export function parseBiliVideoIds(data) {
  const root = data?.data?.result ?? data?.result ?? data;
  const bags = Array.isArray(root) ? root : [];
  const items = [];
  for (const it of bags) {
    if (!it || typeof it !== 'object') continue;
    if (Array.isArray(it.data) && (it.result_type === 'video' || it.resultType === 'video')) {
      items.push(...it.data);
    } else {
      items.push(it);
    }
  }
  const ids = [];
  const seen = new Set();
  for (const it of items) {
    const id = String(it?.bvid || '').trim();
    if (!id || seen.has(id)) continue;
    seen.add(id);
    ids.push(id);
  }
  return ids;
}

export function parseJinaPayload(text) {
  const raw = String(text || '');
  const start = raw.indexOf('{');
  if (start < 0) return null;
  try {
    return JSON.parse(raw.slice(start));
  } catch {
    return null;
  }
}

export function biliPlayerUrl(bvid, which = 0) {
  const id = encodeURIComponent(String(bvid || '').trim());
  const tpl = BILI_EMBED[((which % BILI_EMBED.length) + BILI_EMBED.length) % BILI_EMBED.length];
  return tpl.replace('ID', id);
}

export function youtubeEmbedUrl(videoId, which = 0) {
  const tpl = YT_EMBED[((which % YT_EMBED.length) + YT_EMBED.length) % YT_EMBED.length];
  return tpl.replace('ID', videoId);
}

export function clipsFromMap(word) {
  const keys = [clipLookupKey(word), sanitizeClipWord(word)].filter(Boolean);
  for (const key of keys) {
    const ids = localMap[key];
    if (Array.isArray(ids) && ids.length) {
      return ids.filter(Boolean).map((id) => ({ kind: 'bili', id: String(id) }));
    }
  }
  return [];
}

function clipKey(clip) {
  return `${clip.kind}:${clip.id}`;
}

function mergeClips(...lists) {
  const out = [];
  const seen = new Set();
  for (const list of lists) {
    for (const clip of list || []) {
      if (!clip?.kind || !clip?.id) continue;
      const k = clipKey(clip);
      if (seen.has(k)) continue;
      seen.add(k);
      out.push(clip);
    }
  }
  return out;
}

function rankClips(list, preferDomestic) {
  if (!preferDomestic) return list;
  return [...list].sort((a, b) => Number(b.kind === 'bili') - Number(a.kind === 'bili'));
}

function clearPlayTimer() {
  if (playTimer) {
    clearTimeout(playTimer);
    playTimer = null;
  }
}

function blankIframes(root) {
  if (!root) return;
  root.querySelectorAll('iframe').forEach((frame) => {
    try {
      frame.src = 'about:blank';
    } catch (_) {
      /* ignore */
    }
  });
}

function getYouGlishSync() {
  return typeof window !== 'undefined' && window.YG?.Widget ? window.YG : null;
}

function loadYouGlish() {
  const ready = getYouGlishSync();
  if (ready) return Promise.resolve(ready);
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    const done = (ok, err) => {
      clearTimeout(timer);
      if (ok) resolve(window.YG);
      else {
        scriptPromise = null;
        reject(err || new Error('youglish'));
      }
    };
    const timer = setTimeout(() => done(false, new Error('timeout')), LOAD_MS);
    const prev = window.onYouglishAPIReady;
    window.onYouglishAPIReady = () => {
      if (typeof prev === 'function') prev();
      if (window.YG?.Widget) done(true);
      else done(false, new Error('api'));
    };
    const s = document.createElement('script');
    s.async = true;
    s.charset = 'utf-8';
    s.src = SCRIPT_SRC;
    s.dataset.ygWidget = '1';
    s.onerror = () => done(false, new Error('script'));
    document.head.appendChild(s);
    if (window.YG?.Widget) done(true);
  });
  return scriptPromise;
}

function youtubeLikelyBlocked() {
  if (ytBlockedPromise) return ytBlockedPromise;
  ytBlockedPromise = new Promise((resolve) => {
    if (typeof Image === 'undefined') {
      ytBlockedCached = false;
      resolve(false);
      return;
    }
    const img = new Image();
    const done = (blocked) => {
      clearTimeout(timer);
      img.onload = img.onerror = null;
      ytBlockedCached = blocked;
      resolve(blocked);
    };
    const timer = setTimeout(() => done(true), YT_PROBE_MS);
    img.onload = () => done(false);
    img.onerror = () => done(true);
    img.src = `https://i.ytimg.com/generate_204?_=${Date.now()}`;
  });
  return ytBlockedPromise;
}

function biliSearchUrls(word) {
  const q = encodeURIComponent(`${word} 英语`);
  const inner = `https://api.bilibili.com/x/web-interface/search/type?search_type=video&keyword=${q}&page=1&order=totalrank`;
  return [
    `https://r.jina.ai/${inner}`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(inner)}`,
  ];
}

async function fetchJson(url, timeout = SEARCH_MS) {
  const ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timer = setTimeout(() => ctrl?.abort(), timeout);
  try {
    const res = await fetch(url, {
      headers: { Accept: 'application/json, text/plain;q=0.9,*/*;q=0.8' },
      signal: ctrl?.signal,
      referrerPolicy: 'no-referrer',
    });
    if (!res.ok) throw new Error('search');
    const ct = res.headers?.get?.('content-type') || '';
    if (typeof res.json === 'function' && (!ct || ct.includes('json'))) {
      try {
        return await res.json();
      } catch (_) {
        /* not JSON — try text */
      }
    }
    const text = typeof res.text === 'function' ? await res.text() : '';
    const parsed = parseJinaPayload(text);
    if (parsed) return parsed;
    return JSON.parse(text);
  } finally {
    clearTimeout(timer);
  }
}

function youtubeClipsFromPayload(data) {
  const items = Array.isArray(data) ? data : data.items || data.results || data.videos || [];
  const clips = [];
  const seen = new Set();
  for (const it of items) {
    if (it && it.type && it.type !== 'stream' && it.type !== 'video') continue;
    const id = parsePipedVideoId(it);
    if (!id || seen.has(id)) continue;
    seen.add(id);
    clips.push({ kind: 'yt', id });
  }
  return clips;
}

async function fetchYoutubeClips(apiUrl) {
  const clips = youtubeClipsFromPayload(await fetchJson(apiUrl));
  if (!clips.length) throw new Error('empty');
  return clips;
}

async function fetchBiliClips(apiUrl) {
  const ids = parseBiliVideoIds(await fetchJson(apiUrl));
  if (!ids.length) throw new Error('empty');
  return ids.map((id) => ({ kind: 'bili', id }));
}

export function searchClipTracks(word, { preferDomestic = false } = {}) {
  const q = clipLookupKey(word) || sanitizeClipWord(word);
  if (!q) return Promise.reject(new Error('empty'));
  const cacheKey = `${preferDomestic ? 'd' : 'a'}:${q}`;
  if (searchCache.has(cacheKey)) return searchCache.get(cacheKey);

  const ytQuery = encodeURIComponent(`${sanitizeClipWord(q) || q} english`);
  const tasks = [
    ...YT_SEARCH.map((u) => fetchYoutubeClips(u.replace('QUERY', ytQuery))),
    ...biliSearchUrls(q).map((u) => fetchBiliClips(u)),
  ];

  const pending = new Promise((resolve, reject) => {
    let left = tasks.length;
    let merged = [];
    let done = false;
    if (!left) {
      reject(new Error('empty'));
      return;
    }
    for (const task of tasks) {
      task
        .then((clips) => {
          merged = rankClips(mergeClips(merged, clips), preferDomestic);
          if (!done && merged.length) {
            done = true;
            resolve(merged);
          }
        })
        .catch(() => {})
        .finally(() => {
          left -= 1;
          if (!done && left === 0) {
            done = true;
            if (merged.length) resolve(merged);
            else reject(new Error('empty'));
          }
        });
    }
  });
  searchCache.set(cacheKey, pending);
  pending.catch(() => {
    searchCache.delete(cacheKey);
  });
  return pending;
}

/** Warm routes before the learner taps. Do not load YouTube-backed widgets in China. */
export function prefetchYouGlish() {
  return youtubeLikelyBlocked().then((blocked) => {
    if (blocked) return null;
    return loadYouGlish().catch(() => null);
  });
}

export function prefetchClipTracks(word) {
  youtubeLikelyBlocked();
  const q = clipLookupKey(word) || sanitizeClipWord(word);
  if (!q) return;
  if (clipsFromMap(q).length) return;
  searchClipTracks(q, { preferDomestic: ytBlockedCached !== false }).catch(() => []);
}

function playerState(ev) {
  if (ev == null) return null;
  if (typeof ev === 'number') return ev;
  const n = ev.state ?? ev.data ?? ev.playerState;
  return n == null ? null : Number(n);
}

function stopWidget() {
  try {
    widget?.pause?.();
    widget?.close?.();
  } catch (_) {
    /* ignore */
  }
  widget = null;
}

export function stopClipPlayback() {
  activeWord = '';
  clearPlayTimer();
  stopWidget();
  route = 'none';
  tracks = [];
  trackIndex = 0;
  embedIndex = 0;
  if (host) {
    blankIframes(host);
    host.replaceChildren();
  }
}

export function unmountClipPlayer() {
  stopClipPlayback();
  host = null;
}

/** Test hook — production never needs this. */
export function resetClipCaches() {
  ytBlockedPromise = null;
  ytBlockedCached = null;
  searchCache.clear();
  scriptPromise = null;
}

function resultCount(ev) {
  const n = ev?.totalResult ?? ev?.n ?? ev?.total ?? ev?.hits ?? ev?.count;
  if (n == null || n === '') return null;
  const num = Number(n);
  return Number.isFinite(num) ? num : null;
}

function embedSrc(clip, which = embedIndex) {
  if (!clip) return '';
  if (clip.kind === 'bili') return biliPlayerUrl(clip.id, which);
  return youtubeEmbedUrl(clip.id, which);
}

function mountIframe(src, clip) {
  if (!host || !src) return;
  stopWidget();
  blankIframes(host);
  host.replaceChildren();
  const frame = document.createElement('iframe');
  frame.setAttribute('allow', 'autoplay; encrypted-media; fullscreen; picture-in-picture');
  frame.setAttribute('allowfullscreen', 'true');
  frame.setAttribute('scrolling', 'no');
  frame.setAttribute('border', '0');
  frame.setAttribute('framespacing', '0');
  frame.setAttribute('title', 'clip');
  frame.referrerPolicy = clip?.kind === 'bili' ? 'strict-origin-when-cross-origin' : 'no-referrer';
  frame.src = src;
  host.append(frame);
  route = 'iframe';
}

function playCurrentTrack() {
  const clip = tracks[trackIndex];
  if (!clip) return false;
  const src = embedSrc(clip);
  if (!src) return false;
  mountIframe(src, clip);
  return true;
}

function enrichTracks(word, preferDomestic) {
  searchClipTracks(word, { preferDomestic })
    .then((extra) => {
      if (activeWord !== word) return;
      tracks = rankClips(mergeClips(tracks, extra), preferDomestic);
    })
    .catch(() => {});
}

export function mountClipPlayer(container, word, { onUnavailable } = {}) {
  unmountClipPlayer();
  const q = sanitizeClipWord(word);
  const full = clipLookupKey(word);
  if (!container) {
    onUnavailable?.();
    return null;
  }
  host = container;
  if (!q) {
    onUnavailable?.();
    return null;
  }
  activeWord = q;
  route = 'none';
  youtubeLikelyBlocked();
  const slot = document.createElement('div');
  slot.id = SLOT_ID;
  container.replaceChildren(slot);

  let triedAll = false;
  let kicked = false;
  let handedOff = false;

  const fail = () => {
    if (activeWord !== q) return;
    clearPlayTimer();
    onUnavailable?.();
  };

  const useFallback = () => {
    if (activeWord !== q || handedOff) return;
    handedOff = true;
    clearPlayTimer();
    stopWidget();
    const preferDomestic = ytBlockedCached !== false;
    const local = clipsFromMap(full || q);
    if (local.length) {
      tracks = rankClips(local, true);
      trackIndex = 0;
      embedIndex = 0;
      if (!playCurrentTrack()) fail();
      else enrichTracks(full || q, preferDomestic);
      return;
    }
    searchClipTracks(full || q, { preferDomestic })
      .then((ids) => {
        if (activeWord !== q) return;
        tracks = ids;
        trackIndex = 0;
        embedIndex = 0;
        if (!playCurrentTrack()) fail();
      })
      .catch(() => {
        if (activeWord !== q) return;
        fail();
      });
  };

  const kickPlay = () => {
    if (activeWord !== q || !widget) return;
    try {
      widget.play?.();
    } catch (_) {
      /* ignore */
    }
  };

  const fetchAll = () => {
    if (triedAll) {
      useFallback();
      return;
    }
    triedAll = true;
    try {
      widget.fetch(q, 'english');
    } catch (_) {
      useFallback();
    }
  };

  const startYg = (YG) => {
    if (activeWord !== q || !YG?.Widget) {
      useFallback();
      return null;
    }
    route = 'yg';
    const width = Math.max(280, Math.min(container.clientWidth || 640, 720));
    widget = new YG.Widget(SLOT_ID, {
      width,
      components: COMPONENTS_PLAYER_CAPTION,
      autoStart: 1,
      lang: 'english',
      accent: 'uk',
      events: {
        onFetchDone(ev) {
          if (activeWord !== q || handedOff) return;
          const n = resultCount(ev);
          if (n === 0) fetchAll();
          else kickPlay();
        },
        onPlayerReady() {
          if (activeWord !== q || handedOff) return;
          clearPlayTimer();
          kickPlay();
        },
        onPlayerStateChange(ev) {
          if (activeWord !== q || handedOff) return;
          const st = playerState(ev);
          if (st === 1) {
            kicked = true;
            clearPlayTimer();
            return;
          }
          if (!kicked && (st === 5 || st === -1)) kickPlay();
        },
        onError() {
          if (activeWord !== q || handedOff) return;
          fetchAll();
        },
      },
    });
    const created = widget;
    created.fetch(q, 'english', 'uk');
    kickPlay();
    playTimer = setTimeout(() => {
      playTimer = null;
      if (!kicked) useFallback();
    }, YG_GIVEUP_MS);
    return created;
  };

  if (ytBlockedCached === true) {
    useFallback();
    return null;
  }

  const readyNow = getYouGlishSync();
  if (ytBlockedCached === false && readyNow) return startYg(readyNow);

  youtubeLikelyBlocked().then((blocked) => {
    if (activeWord !== q || handedOff) return;
    if (blocked) {
      useFallback();
      return;
    }
    const yg = getYouGlishSync();
    if (yg) {
      startYg(yg);
      return;
    }
    loadYouGlish()
      .then((YG) => {
        if (activeWord !== q || handedOff) return;
        startYg(YG);
      })
      .catch(() => useFallback());
  });

  return null;
}

export function replayClip() {
  try {
    if (route === 'iframe') {
      playCurrentTrack();
      return;
    }
    widget?.replay?.();
    widget?.play?.();
  } catch (_) {
    /* ignore */
  }
}

export function nextClip() {
  try {
    if (route === 'iframe') {
      if (!tracks.length) return;
      trackIndex = (trackIndex + 1) % tracks.length;
      if (trackIndex === 0) embedIndex += 1;
      playCurrentTrack();
      return;
    }
    widget?.next?.();
    widget?.play?.();
  } catch (_) {
    /* ignore */
  }
}
