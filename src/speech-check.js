/** In-page vocab speaking check. Engine names stay hidden. */

const PASS = 0.78;
const LISTEN_MS = 8000;

let rec = null;
let seq = 0;
let listenTimer = 0;

export function normalizeHeard(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[’`]/g, "'")
    .replace(/[^a-z'\s-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function levenshtein(a, b) {
  const s = String(a || '');
  const t = String(b || '');
  const n = s.length;
  const m = t.length;
  if (!n) return m;
  if (!m) return n;
  const prev = new Array(m + 1);
  const cur = new Array(m + 1);
  for (let j = 0; j <= m; j++) prev[j] = j;
  for (let i = 1; i <= n; i++) {
    cur[0] = i;
    for (let j = 1; j <= m; j++) {
      const cost = s[i - 1] === t[j - 1] ? 0 : 1;
      cur[j] = Math.min(cur[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
    }
    for (let j = 0; j <= m; j++) prev[j] = cur[j];
  }
  return prev[m];
}

export function similarity(a, b) {
  if (!a && !b) return 1;
  if (!a || !b) return 0;
  const d = levenshtein(a, b);
  return 1 - d / Math.max(a.length, b.length);
}

export function scoreHeard(heard, target) {
  const h = normalizeHeard(heard);
  const t = normalizeHeard(target);
  if (!t) return { ok: false, heard: h, score: 0 };
  if (!h) return { ok: false, heard: h, score: 0 };
  if (h === t) return { ok: true, heard: h, score: 1 };
  const tokens = h.split(' ').filter(Boolean);
  if (tokens.includes(t)) return { ok: true, heard: h, score: 1 };
  if (t.includes(' ') && h.includes(t)) return { ok: true, heard: h, score: 1 };
  let best = similarity(h, t);
  if (!t.includes(' ')) {
    for (const w of tokens) best = Math.max(best, similarity(w, t));
  }
  return { ok: best >= PASS, heard: h, score: best };
}

function getSpeechRecognition() {
  if (typeof window === 'undefined') return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

export function canListen() {
  return Boolean(getSpeechRecognition());
}

export function isListening() {
  return Boolean(rec);
}

function clearListenTimer() {
  if (listenTimer) {
    clearTimeout(listenTimer);
    listenTimer = 0;
  }
}

export function stopListening() {
  seq += 1;
  clearListenTimer();
  const r = rec;
  rec = null;
  if (!r) return;
  try {
    r.onresult = r.onerror = r.onend = null;
    r.abort();
  } catch (_) {
    try {
      r.stop();
    } catch (_) {
      /* ignore */
    }
  }
}

function transcriptsFromEvent(ev) {
  const out = [];
  const res = ev?.results?.[ev.results.length - 1];
  if (!res) return out;
  const n = res.length || 0;
  for (let i = 0; i < n; i++) {
    const text = res[i]?.transcript;
    if (text) out.push(text);
  }
  return out;
}

function pickBest(alts, target) {
  let best = { ok: false, heard: '', score: 0 };
  for (const a of alts) {
    const s = scoreHeard(a, target);
    if (s.score > best.score || (s.ok && !best.ok)) best = s;
    if (s.ok && s.score === 1) break;
  }
  return best;
}

export function listenForWord(word, { onResult, onError } = {}) {
  stopListening();
  const token = seq;
  const target = String(word || '').trim();
  const Ctor = getSpeechRecognition();
  if (!Ctor || !target) {
    onError?.('unavailable');
    return false;
  }

  let settled = false;
  const r = new Ctor();
  rec = r;
  r.lang = 'en-US';
  r.interimResults = false;
  r.maxAlternatives = 5;
  r.continuous = false;

  const finish = (fn) => {
    if (token !== seq || settled) return;
    settled = true;
    clearListenTimer();
    rec = null;
    try {
      r.onresult = r.onerror = r.onend = null;
      r.stop();
    } catch (_) {
      /* ignore */
    }
    fn();
  };

  r.onresult = (ev) => {
    finish(() => onResult?.(pickBest(transcriptsFromEvent(ev), target)));
  };
  r.onerror = (ev) => {
    const err = String(ev?.error || 'error');
    if (err === 'no-speech' || err === 'aborted') {
      finish(() => onResult?.({ ok: false, heard: '', score: 0 }));
      return;
    }
    finish(() => onError?.(err));
  };
  r.onend = () => {
    finish(() => onResult?.({ ok: false, heard: '', score: 0 }));
  };

  listenTimer = window.setTimeout(() => {
    finish(() => onResult?.({ ok: false, heard: '', score: 0 }));
  }, LISTEN_MS);

  try {
    r.start();
    return true;
  } catch (_) {
    finish(() => onError?.('unavailable'));
    return false;
  }
}
