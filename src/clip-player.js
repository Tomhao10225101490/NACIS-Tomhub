/** In-page vocab clips. Multiple hidden routes; the learner only sees one player. */

const SCRIPT_SRC = 'https://youglish.com/public/emb/widget.js';
const SLOT_ID = 'yg-clip-slot';
const LOAD_MS = 8000;
const YG_GIVEUP_MS = 4500;
const YT_PROBE_MS = 1600;
/** Caption only — player is always shown; hide search / accent / title. */
const COMPONENTS_PLAYER_CAPTION = 8;

const SEARCH_APIS = [
  'https://api.piped.private.coffee/search?q=QUERY&filter=videos',
  'https://pipedapi.ducks.party/search?q=QUERY&filter=videos',
];

const EMBED_TEMPLATES = [
  'https://piped.private.coffee/embed/ID?autoplay=1',
  'https://piped.ducks.party/embed/ID?autoplay=1',
  'https://www.youtube-nocookie.com/embed/ID?autoplay=1&playsinline=1&rel=0',
  'https://www.youtube.com/embed/ID?autoplay=1&playsinline=1&rel=0',
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

/** Keep only a single English headword for the widget query. */
export function sanitizeClipWord(word) {
  const raw = String(word || '')
    .trim()
    .toLowerCase()
    .replace(/[’`]/g, "'");
  const m = raw.match(/[a-z][a-z'-]*[a-z]|[a-z]/);
  return m ? m[0].replace(/^'+|'+$/g, '') : '';
}

export function parsePipedVideoId(item) {
  const u = String(item?.url || item?.videoId || item || '');
  const m = u.match(/[?&]v=([\w-]{11})/) || u.match(/embed\/([\w-]{11})/) || u.match(/^([\w-]{11})$/);
  return m ? m[1] : '';
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
      resolve(false);
      return;
    }
    const img = new Image();
    const done = (blocked) => {
      clearTimeout(timer);
      img.onload = img.onerror = null;
      resolve(blocked);
    };
    const timer = setTimeout(() => done(true), YT_PROBE_MS);
    img.onload = () => done(false);
    img.onerror = () => done(true);
    img.src = `https://i.ytimg.com/generate_204?_=${Date.now()}`;
  });
  return ytBlockedPromise;
}

/** Warm routes before the learner taps. */
export function prefetchYouGlish() {
  youtubeLikelyBlocked();
  return loadYouGlish().catch(() => null);
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

function resultCount(ev) {
  const n = ev?.totalResult ?? ev?.n ?? ev?.total ?? ev?.hits ?? ev?.count;
  if (n == null || n === '') return null;
  const num = Number(n);
  return Number.isFinite(num) ? num : null;
}

function embedUrl(videoId, which = embedIndex) {
  const tpl = EMBED_TEMPLATES[which % EMBED_TEMPLATES.length];
  return tpl.replace('ID', videoId);
}

function mountIframe(videoId) {
  if (!host || !videoId) return;
  stopWidget();
  blankIframes(host);
  host.replaceChildren();
  const frame = document.createElement('iframe');
  frame.setAttribute('allow', 'autoplay; encrypted-media; fullscreen; picture-in-picture');
  frame.setAttribute('allowfullscreen', 'true');
  frame.setAttribute('title', 'clip');
  frame.referrerPolicy = 'no-referrer';
  frame.src = embedUrl(videoId);
  host.append(frame);
  route = 'iframe';
}

async function fetchTracksFrom(apiUrl) {
  const res = await fetch(apiUrl, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error('search');
  const data = await res.json();
  const items = Array.isArray(data) ? data : data.items || data.results || [];
  const ids = [];
  const seen = new Set();
  for (const it of items) {
    if (it && it.type && it.type !== 'stream' && it.type !== 'video') continue;
    const id = parsePipedVideoId(it);
    if (!id || seen.has(id)) continue;
    seen.add(id);
    ids.push(id);
  }
  if (!ids.length) throw new Error('empty');
  return ids;
}

export function searchClipTracks(word) {
  const q = encodeURIComponent(`${word} english`);
  const urls = SEARCH_APIS.map((u) => u.replace('QUERY', q));
  return Promise.any(urls.map((u) => fetchTracksFrom(u)));
}

function playCurrentTrack() {
  const id = tracks[trackIndex];
  if (!id) return false;
  mountIframe(id);
  return true;
}

export function mountClipPlayer(container, word, { onUnavailable } = {}) {
  unmountClipPlayer();
  const q = sanitizeClipWord(word);
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
    searchClipTracks(q)
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

  const readyNow = getYouGlishSync();
  if (readyNow) return startYg(readyNow);

  youtubeLikelyBlocked().then((blocked) => {
    if (activeWord !== q) return;
    if (blocked) {
      useFallback();
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
      if (trackIndex === 0) embedIndex = (embedIndex + 1) % EMBED_TEMPLATES.length;
      playCurrentTrack();
      return;
    }
    widget?.next?.();
    widget?.play?.();
  } catch (_) {
    /* ignore */
  }
}
