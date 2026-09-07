/**
 * Unified local progress: toms_v1
 * Migrates nacis_* / alex_* / toms_ielts / toms_hs_en on first load.
 */

const KEY = 'toms_v1';
export const STORE_VERSION = 1;
export const WRONG_CAP = 200;

export function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw == null || raw === '') return fallback;
    return JSON.parse(raw);
  } catch (_) {
    return fallback;
  }
}

export function todayKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function emptyState() {
  return {
    version: STORE_VERSION,
    xp: 0,
    streak: 0,
    bestStreak: 0,
    wrong: [],
    dayProgress: {},
    ieltsProgress: {},
    hsProgress: {},
    srs: {},
    studyDays: [],
    activeHub: '',
    quizLevel: 'core',
  };
}

function asObject(v) {
  return v && typeof v === 'object' && !Array.isArray(v) ? v : {};
}

function asArray(v) {
  return Array.isArray(v) ? v : [];
}

function normalizeWrong(item) {
  if (!item || typeof item !== 'object') return null;
  const id = String(item.id || '').trim();
  if (!id) return null;
  return {
    id,
    kind: String(item.kind || ''),
    subject: String(item.subject || ''),
    prompt: String(item.prompt || ''),
    correctText: String(item.correctText || item.answer || ''),
    answer: String(item.answer || item.correctText || ''),
    explain: String(item.explain || ''),
    at: Number(item.at) || Date.now(),
    winStreak: Number(item.winStreak) || 0,
  };
}

export function normalizeState(raw) {
  const base = emptyState();
  if (!raw || typeof raw !== 'object') return base;
  const wrong = asArray(raw.wrong).map(normalizeWrong).filter(Boolean).slice(0, WRONG_CAP);
  const studyDays = asArray(raw.studyDays)
    .map((d) => String(d))
    .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d));
  return {
    ...base,
    version: STORE_VERSION,
    xp: Number(raw.xp) || 0,
    streak: Number(raw.streak) || 0,
    bestStreak: Number(raw.bestStreak) || 0,
    wrong,
    dayProgress: asObject(raw.dayProgress),
    ieltsProgress: asObject(raw.ieltsProgress),
    hsProgress: asObject(raw.hsProgress),
    srs: asObject(raw.srs),
    studyDays,
    activeHub: String(raw.activeHub || ''),
    quizLevel: raw.quizLevel === 'all' ? 'all' : 'core',
  };
}

export function migrateFromLegacy() {
  const existing = readJson(KEY, null);
  if (existing && typeof existing === 'object' && Number(existing.version) >= 1) {
    return normalizeState(existing);
  }
  const s = emptyState();
  s.xp = Number(localStorage.getItem('nacis_xp') || 0);
  s.streak = Number(localStorage.getItem('nacis_streak') || 0);
  s.bestStreak = Number(localStorage.getItem('nacis_best') || 0);
  s.wrong = asArray(readJson('nacis_wrong', [])).map(normalizeWrong).filter(Boolean);
  s.dayProgress = asObject(readJson('alex_days', {}));
  s.ieltsProgress = asObject(readJson('toms_ielts', {}));
  s.hsProgress = asObject(readJson('toms_hs_en', {}));
  s.activeHub = localStorage.getItem('toms_hub') || '';
  s.quizLevel = localStorage.getItem('alex_qlevel') === 'all' ? 'all' : 'core';
  return normalizeState(s);
}

/** Mutable singleton used by the app. */
export const store = migrateFromLegacy();

try {
  if (localStorage.getItem(KEY) == null) save();
} catch (_) {
  /* ignore */
}

export function save() {
  const payload = {
    version: STORE_VERSION,
    xp: store.xp,
    streak: store.streak,
    bestStreak: store.bestStreak,
    wrong: store.wrong.slice(0, WRONG_CAP),
    dayProgress: store.dayProgress,
    ieltsProgress: store.ieltsProgress,
    hsProgress: store.hsProgress,
    srs: store.srs,
    studyDays: store.studyDays,
    activeHub: store.activeHub || '',
    quizLevel: store.quizLevel === 'all' ? 'all' : 'core',
  };
  localStorage.setItem(KEY, JSON.stringify(payload));
}

export function markStudyToday(d = new Date()) {
  const k = todayKey(d);
  if (!store.studyDays.includes(k)) {
    store.studyDays.push(k);
    if (store.studyDays.length > 400) store.studyDays = store.studyDays.slice(-400);
    save();
  }
  return k;
}

export function recentStudyFlags(n = 7, d = new Date()) {
  const set = new Set(store.studyDays);
  const out = [];
  for (let i = n - 1; i >= 0; i--) {
    const dt = new Date(d.getFullYear(), d.getMonth(), d.getDate() - i);
    const k = todayKey(dt);
    out.push({ date: k, done: set.has(k) });
  }
  return out;
}

export function consecutiveStudyDays(d = new Date()) {
  const set = new Set(store.studyDays);
  let n = 0;
  const cursor = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  while (set.has(todayKey(cursor))) {
    n += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return n;
}

export function exportProgress() {
  save();
  return JSON.stringify(
    {
      app: "Tom's Ground",
      version: STORE_VERSION,
      exportedAt: new Date().toISOString(),
      data: {
        version: STORE_VERSION,
        xp: store.xp,
        streak: store.streak,
        bestStreak: store.bestStreak,
        wrong: store.wrong,
        dayProgress: store.dayProgress,
        ieltsProgress: store.ieltsProgress,
        hsProgress: store.hsProgress,
        srs: store.srs,
        studyDays: store.studyDays,
        activeHub: store.activeHub,
        quizLevel: store.quizLevel,
      },
    },
    null,
    2
  );
}

export function importProgress(json) {
  const parsed = typeof json === 'string' ? JSON.parse(json) : json;
  const raw = parsed?.data && parsed.data.version ? parsed.data : parsed;
  if (!raw || typeof raw !== 'object') throw new Error('invalid');
  const next = normalizeState(raw);
  Object.keys(store).forEach((k) => {
    delete store[k];
  });
  Object.assign(store, next);
  save();
  return store;
}

export function recordWrong(item) {
  const row = normalizeWrong({ ...item, at: Date.now() });
  if (!row) return;
  row.winStreak = 0;
  store.wrong = store.wrong.filter((w) => w.id !== row.id);
  store.wrong.unshift(row);
  if (store.wrong.length > WRONG_CAP) store.wrong = store.wrong.slice(0, WRONG_CAP);
  save();
}

export function clearWrong(id) {
  store.wrong = store.wrong.filter((w) => w.id !== id);
  save();
}

export function clearAllWrong() {
  store.wrong = [];
  save();
}

/** After a retest answer: 2 wins in a row removes the card. Returns whether it was removed. */
export function noteWrongResult(id, correct) {
  const row = store.wrong.find((w) => w.id === id);
  if (!row) return false;
  if (correct) {
    row.winStreak = (Number(row.winStreak) || 0) + 1;
    if (row.winStreak >= 2) {
      store.wrong = store.wrong.filter((w) => w.id !== id);
      save();
      return true;
    }
  } else {
    row.winStreak = 0;
  }
  save();
  return false;
}

export function hsProgressKey(bookId, unitId) {
  return `${bookId}:${unitId}`;
}
