/** In-page YouGlish clips for English flashcards. No navigation away. */

const SCRIPT_SRC = 'https://youglish.com/public/emb/widget.js';
const SLOT_ID = 'yg-clip-slot';
const LOAD_MS = 8000;
const PLAY_MS = 25000;
/** Caption only — player is always shown; hide search / accent / title. */
const COMPONENTS_PLAYER_CAPTION = 8;

let scriptPromise = null;
let widget = null;
let host = null;
let activeWord = '';
let playTimer = null;

/** Keep only a single English headword for the widget query. */
export function sanitizeClipWord(word) {
  const raw = String(word || '')
    .trim()
    .toLowerCase()
    .replace(/[’`]/g, "'");
  const m = raw.match(/[a-z][a-z'-]*[a-z]|[a-z]/);
  return m ? m[0].replace(/^'+|'+$/g, '') : '';
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

/** Start downloading the widget before the learner taps, so the tap can autoplay. */
export function prefetchYouGlish() {
  return loadYouGlish().catch(() => null);
}

function playerState(ev) {
  if (ev == null) return null;
  if (typeof ev === 'number') return ev;
  const n = ev.state ?? ev.data ?? ev.playerState;
  return n == null ? null : Number(n);
}

export function stopClipPlayback() {
  activeWord = '';
  clearPlayTimer();
  try {
    widget?.pause?.();
    widget?.close?.();
  } catch (_) {
    /* ignore */
  }
  widget = null;
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
  const slot = document.createElement('div');
  slot.id = SLOT_ID;
  container.replaceChildren(slot);

  let triedAll = false;
  let kicked = false;
  const fail = () => {
    if (activeWord !== q) return;
    clearPlayTimer();
    onUnavailable?.();
  };
  const armPlayTimer = () => {
    clearPlayTimer();
    playTimer = setTimeout(() => {
      playTimer = null;
      fail();
    }, PLAY_MS);
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
      fail();
      return;
    }
    triedAll = true;
    try {
      widget.fetch(q, 'english');
    } catch (_) {
      fail();
    }
  };

  const start = (YG) => {
    if (activeWord !== q || !YG?.Widget) {
      fail();
      return null;
    }
    const width = Math.max(280, Math.min(container.clientWidth || 640, 720));
    widget = new YG.Widget(SLOT_ID, {
      width,
      components: COMPONENTS_PLAYER_CAPTION,
      autoStart: 1,
      lang: 'english',
      accent: 'uk',
      events: {
        onFetchDone(ev) {
          if (activeWord !== q) return;
          const n = resultCount(ev);
          if (n === 0) fetchAll();
          else {
            armPlayTimer();
            kickPlay();
          }
        },
        onPlayerReady() {
          if (activeWord !== q) return;
          clearPlayTimer();
          kickPlay();
        },
        onPlayerStateChange(ev) {
          if (activeWord !== q) return;
          const st = playerState(ev);
          if (st === 1) {
            kicked = true;
            clearPlayTimer();
            return;
          }
          // -1 unstarted, 5 cued: start from the opening tap. Do not fight a real pause (2).
          if (!kicked && (st === 5 || st === -1)) kickPlay();
        },
        onError() {
          if (activeWord !== q) return;
          fetchAll();
        },
      },
    });
    armPlayTimer();
    widget.fetch(q, 'english', 'uk');
    kickPlay();
    return widget;
  };

  const ready = getYouGlishSync();
  if (ready) return start(ready);

  loadYouGlish()
    .then((YG) => {
      if (activeWord !== q) return;
      start(YG);
    })
    .catch(() => fail());
  return null;
}

export function replayClip() {
  try {
    widget?.replay?.();
    widget?.play?.();
  } catch (_) {
    /* ignore */
  }
}

export function nextClip() {
  try {
    widget?.next?.();
    widget?.play?.();
  } catch (_) {
    /* ignore */
  }
}
