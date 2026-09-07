/** In-page YouGlish clips for English flashcards. No navigation away. */

const SCRIPT_SRC = 'https://youglish.com/public/emb/widget.js';
const SLOT_ID = 'yg-clip-slot';
const LOAD_MS = 8000;
const PLAY_MS = 12000;
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

function loadYouGlish() {
  if (typeof window !== 'undefined' && window.YG?.Widget) return Promise.resolve(window.YG);
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
    s.src = SCRIPT_SRC;
    s.dataset.ygWidget = '1';
    s.onerror = () => done(false, new Error('script'));
    document.head.appendChild(s);
    if (window.YG?.Widget) done(true);
  });
  return scriptPromise;
}

export function unmountClipPlayer() {
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
    host = null;
  }
}

function resultCount(ev) {
  const n = ev?.totalResult ?? ev?.n ?? ev?.total ?? ev?.hits ?? ev?.count;
  if (n == null || n === '') return null;
  const num = Number(n);
  return Number.isFinite(num) ? num : null;
}

export async function mountClipPlayer(container, word, { onUnavailable } = {}) {
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

  try {
    const YG = await loadYouGlish();
    if (activeWord !== q || !YG?.Widget) {
      fail();
      return null;
    }
    const width = Math.max(280, Math.min(container.clientWidth || 640, 720));
    widget = new YG.Widget(SLOT_ID, {
      width,
      components: COMPONENTS_PLAYER_CAPTION,
      autoStart: 0,
      lang: 'english',
      accent: 'uk',
      events: {
        onFetchDone(ev) {
          if (activeWord !== q) return;
          const n = resultCount(ev);
          if (n === 0) fetchAll();
          else armPlayTimer();
        },
        onPlayerReady() {
          if (activeWord !== q) return;
          clearPlayTimer();
        },
        onError() {
          if (activeWord !== q) return;
          fetchAll();
        },
      },
    });
    const created = widget;
    armPlayTimer();
    created.fetch(q, 'english', 'uk');
    return created;
  } catch (_) {
    fail();
    return null;
  }
}

export function replayClip() {
  try {
    widget?.replay?.();
  } catch (_) {
    /* ignore */
  }
}

export function nextClip() {
  try {
    widget?.next?.();
  } catch (_) {
    /* ignore */
  }
}
