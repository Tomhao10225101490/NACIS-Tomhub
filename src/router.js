/**
 * Hash router for GitHub Pages (no server routes).
 * Examples: #/  #/hub/english  #/ielts/day/12  #/hs/b1/u3  #/amc  #/amc/paper/mock-1
 */

const SIMPLE = new Set([
  'home',
  'days',
  'flash',
  'match',
  'mcq',
  'tf',
  'mixed',
  'periodic',
  'mass',
  'wrong',
  'progress',
  'srs',
]);

export function parseHash(hash) {
  const raw = String(hash || '')
    .replace(/^#/, '')
    .trim();
  const parts = raw.split('/').filter(Boolean);
  if (!parts.length) return { name: 'home', params: {} };

  if (parts[0] === 'hub' && parts[1]) {
    return { name: `hub-${parts[1]}`, params: { hub: parts[1] } };
  }
  if (parts[0] === 'ielts') {
    if (parts[1] === 'days') return { name: 'ielts-days', params: {} };
    if (parts[1] === 'go') return { name: 'ielts-go', params: {} };
    if (parts[1] === 'spot') return { name: 'ielts-spot', params: {} };
    if (parts[1] === 'dictation') return { name: 'ielts-dictation', params: {} };
    if (parts[1] === 'cloze') return { name: 'ielts-cloze', params: {} };
    if (parts[1] === 'match') return { name: 'ielts-match', params: {} };
    if (parts[1] === 'day' && parts[2]) {
      const day = Number(parts[2]);
      return { name: 'ielts-day', params: { day: Number.isFinite(day) ? day : 1 } };
    }
  }
  if (parts[0] === 'hs') {
    if (!parts[1]) return { name: 'hs-shelf', params: {} };
    if (parts[1] && !parts[2]) return { name: 'hs-book', params: { book: parts[1] } };
    return { name: 'hs-unit', params: { book: parts[1], unit: parts[2] } };
  }
  if (parts[0] === 'books') {
    if (!parts[1]) return { name: 'tb-shelf', params: { shelf: 'hs' } };
    if (parts[1] && !parts[2]) return { name: 'tb-shelf', params: { shelf: parts[1] } };
    if (parts[2] && !parts[3]) return { name: 'tb-book', params: { shelf: parts[1], book: parts[2] } };
    return { name: 'tb-unit', params: { shelf: parts[1], book: parts[2], unit: parts[3] } };
  }
  if (parts[0] === 'wrong') {
    if (parts[1] === 'quiz') {
      return { name: 'wrong-quiz', params: { subject: parts[2] || 'all' } };
    }
    return { name: 'wrong', params: {} };
  }
  if (parts[0] === 'science' && parts[1] === 'day' && parts[2]) {
    const day = Number(parts[2]);
    return { name: 'science-day', params: { day: Number.isFinite(day) ? day : 1 } };
  }
  if (parts[0] === 'cn') {
    if (parts[1] === 'list') return { name: 'cn-list', params: {} };
    if (parts[1] === 'flash') return { name: 'cn-flash', params: {} };
    if (parts[1] === 'quiz') return { name: 'cn-quiz', params: {} };
  }
  if (parts[0] === 'math') {
    if (parts[1] === 'flash') return { name: 'math-flash', params: {} };
    if (parts[1] === 'quiz') return { name: 'math-quiz', params: {} };
  }
  if (parts[0] === 'amc') {
    if (!parts[1]) return { name: 'amc', params: {} };
    if (parts[1] === 'paper' && parts[2]) {
      const mode = parts[3] === 'practice' ? 'practice' : 'contest';
      return { name: 'amc-paper', params: { paper: parts[2], mode } };
    }
    return { name: 'amc', params: {} };
  }
  if (parts[0] === 'srs') return { name: 'srs', params: {} };
  if (parts[0] === 'progress') return { name: 'progress', params: {} };

  if (SIMPLE.has(parts[0]) && parts.length === 1) {
    return { name: parts[0], params: {} };
  }
  return { name: 'home', params: {} };
}

export function toHash(name, params = {}) {
  if (!name || name === 'home') return '#/';
  if (name.startsWith('hub-')) return `#/hub/${name.slice(4)}`;
  const table = {
    'ielts-days': '#/ielts/days',
    'ielts-go': '#/ielts/go',
    'ielts-spot': '#/ielts/spot',
    'ielts-dictation': '#/ielts/dictation',
    'ielts-cloze': '#/ielts/cloze',
    'ielts-match': '#/ielts/match',
    'hs-shelf': '#/hs',
    wrong: '#/wrong',
    srs: '#/srs',
    progress: '#/progress',
    'cn-list': '#/cn/list',
    'cn-flash': '#/cn/flash',
    'cn-quiz': '#/cn/quiz',
    'math-flash': '#/math/flash',
    'math-quiz': '#/math/quiz',
    amc: '#/amc',
    days: '#/days',
    flash: '#/flash',
    match: '#/match',
    mcq: '#/mcq',
    tf: '#/tf',
    mixed: '#/mixed',
    periodic: '#/periodic',
    mass: '#/mass',
  };
  if (table[name]) return table[name];
  if (name === 'ielts-day') return `#/ielts/day/${params.day || 1}`;
  if (name === 'hs-book') return `#/hs/${params.book || ''}`;
  if (name === 'hs-unit') return `#/hs/${params.book || ''}/${params.unit || ''}`;
  if (name === 'tb-shelf') return `#/books/${params.shelf || 'hs'}`;
  if (name === 'tb-book') return `#/books/${params.shelf || 'hs'}/${params.book || ''}`;
  if (name === 'tb-unit') {
    return `#/books/${params.shelf || 'hs'}/${params.book || ''}/${params.unit || ''}`;
  }
  if (name === 'wrong-quiz') {
    const sub = params.subject && params.subject !== 'all' ? `/${params.subject}` : '';
    return `#/wrong/quiz${sub}`;
  }
  if (name === 'science-day') return `#/science/day/${params.day || 1}`;
  if (name === 'amc-paper') {
    const mode = params.mode === 'practice' ? '/practice' : '';
    return `#/amc/paper/${params.paper || 'mock-1'}${mode}`;
  }
  return '#/';
}

export function hashesEqual(a, b) {
  const n = (h) => {
    const s = String(h || '').replace(/^#/, '');
    return s ? `#/${s.replace(/^\/+/, '')}` : '#/';
  };
  return n(a) === n(b);
}

/**
 * @param {(route: {name: string, params: object}) => void | Promise<void>} handler
 */
export function startRouter(handler) {
  async function apply(hash) {
    await handler(parseHash(hash || '#/'));
  }

  window.addEventListener('hashchange', () => {
    apply(location.hash);
  });

  function writeHash(next, replace) {
    const hash = next.startsWith('#') ? next : `#${next}`;
    if (hashesEqual(location.hash, hash)) {
      return apply(hash);
    }
    if (replace) {
      history.replaceState(null, '', `${location.pathname}${location.search}${hash}`);
      return apply(hash);
    }
    location.hash = hash;
    return Promise.resolve();
  }

  return {
    go(name, params = {}) {
      return writeHash(toHash(name, params), false);
    },
    replace(name, params = {}) {
      return writeHash(toHash(name, params), true);
    },
    start() {
      if (!location.hash) {
        history.replaceState(null, '', `${location.pathname}${location.search}#/`);
      }
      return apply(location.hash || '#/');
    },
  };
}
