import './style.css';
import { registerSW } from 'virtual:pwa-register';
import { HUBS, getHub } from './data/hubs.js';
import {
  packs,
  ensureScience,
  ensureIelts,
  ensureChinese,
  ensureMath,
  ensureHsEnglish,
  prefetchInBackground,
} from './data/load.js';
import {
  ieltsDayMeta,
  IELTS_WORD_TOTAL,
  IELTS_DAY_TOTAL,
} from './data/ielts-meta.js';
import { HS_BOOKS, HS_WORD_TOTAL, getHsBook, getHsUnit } from './data/hs-english/meta.js';
import { shuffle } from './util/shuffle.js';
import { escapeHtml, escapeRegExp } from './util/escape.js';
import {
  store,
  save as writeStore,
  recordWrong,
  clearWrong,
  clearAllWrong,
  noteWrongResult,
  markStudyToday,
  recentStudyFlags,
  consecutiveStudyDays,
  exportProgress,
  importProgress,
  hsProgressKey,
} from './store.js';
import { startRouter } from './router.js';
import { makeEnWordSpotItem, promptContainsAnswer } from './quiz/spot.js';
import { applyReview, dueEntries, srsKey } from './quiz/srs.js';
import { makeDictationItem, spellingOk } from './quiz/dictation.js';
import { clozeItemsFromWords } from './quiz/cloze.js';
import { dealMatchPairs } from './quiz/match.js';
import {
  unlockAudio,
  sfxClick,
  sfxCorrect,
  sfxWrong,
  sfxFlip,
  sfxMatch,
  sfxStreak,
  toggleSfx,
  speakText,
  stopSpeak,
  canSpeak,
  isSpeaking,
  primeSpeech,
} from './audio.js';
import {
  tb,
  getLang,
  setLang,
  localizeText,
  localizeHtml,
  subjectName,
  hubTitle,
  hubBlurb,
} from './i18n.js';
import { topbar, backBtn, modeCard, hubProgressBar } from './ui.js';
import { SCIENCE_DAY_META } from './data/days-meta.js';

try {
  registerSW({ immediate: true });
} catch {
  /* vite-plugin-pwa injects this virtual module in build / PWA-enabled serve */
}

const app = document.getElementById('app');
const fx = document.getElementById('fx-layer');

/* —— Live data bindings (filled by ensure* loaders) —— */
let vocabulary = [];
let subjects = {};
let questions = [];
let filterQuestions = () => [];
let days = [];
let getDay = () => null;
let dayVocab = () => [];
let dayQuestions = () => [];
let subjectLabel = (id) => id;
let elements = [];
let coreElements = [];
let compounds = [];
let GROUP_LABELS = [];
let buildPeriodicGrid = () => [];
let ieltsWords = [];
let ieltsDays = [];
let getIeltsDay = () => null;
let ieltsDayWords = () => [];
let chineseWorks = [];
let chineseVocab = [];
let chineseQuestions = [];
let classicGloss = {};
let filterChineseWorks = () => [];
let filterChineseVocab = () => [];
let filterChineseQuestions = () => [];
let worksByGrade = () => [];
let gradeLabel = (g) => `${g}`;
/** @type {'all'|7|8|9} */
let chineseGrade = 'all';
let mathVocab = [];
let mathQuestions = [];
let hsActiveBook = '';
let hsActiveUnit = '';

function bindScience() {
  vocabulary = packs.vocabulary;
  subjects = packs.subjects;
  questions = packs.questions;
  filterQuestions = packs.filterQuestions;
  days = packs.days;
  getDay = packs.getDay;
  dayVocab = packs.dayVocab;
  dayQuestions = packs.dayQuestions;
  subjectLabel = packs.subjectLabel;
  elements = packs.elements;
  coreElements = packs.coreElements;
  compounds = packs.compounds;
  GROUP_LABELS = packs.GROUP_LABELS;
  buildPeriodicGrid = packs.buildPeriodicGrid;
}

function bindIelts() {
  ieltsWords = packs.ieltsWords;
  ieltsDays = packs.ieltsDays;
  getIeltsDay = packs.getIeltsDay;
  ieltsDayWords = packs.ieltsDayWords;
}

function bindChinese() {
  chineseWorks = packs.chineseWorks;
  chineseVocab = packs.chineseVocab;
  chineseQuestions = packs.chineseQuestions;
  classicGloss = packs.classicGloss || {};
  filterChineseWorks = packs.filterChineseWorks;
  filterChineseVocab = packs.filterChineseVocab;
  filterChineseQuestions = packs.filterChineseQuestions;
  worksByGrade = packs.worksByGrade;
  gradeLabel = packs.gradeLabel;
}

function bindMath() {
  mathVocab = packs.mathVocab;
  mathQuestions = packs.mathQuestions;
}

let _packLoadingEl = null;
function showPackLoading(msg) {
  hidePackLoading();
  if (!app) return;
  const el = document.createElement('div');
  el.className = 'pack-loading';
  el.innerHTML = `<div class="pack-loading-card"><div class="pack-spinner" aria-hidden="true"></div><p>${msg}</p></div>`;
  app.appendChild(el);
  _packLoadingEl = el;
}

function hidePackLoading() {
  if (_packLoadingEl) {
    _packLoadingEl.remove();
    _packLoadingEl = null;
  }
}

async function needScience() {
  showPackLoading('Loading science…');
  try {
    await ensureScience();
    bindScience();
  } finally {
    hidePackLoading();
  }
}

async function needIelts() {
  showPackLoading('Loading IELTS…');
  try {
    await ensureIelts();
    bindIelts();
  } finally {
    hidePackLoading();
  }
}

async function needChinese() {
  showPackLoading('Loading Chinese…');
  try {
    await ensureChinese();
    bindChinese();
  } finally {
    hidePackLoading();
  }
}

async function needMath() {
  showPackLoading('Loading Math…');
  try {
    await ensureMath();
    bindMath();
  } finally {
    hidePackLoading();
  }
}

async function needHsBook(bookId) {
  if (!bookId) return;
  showPackLoading(tb('hsOpenBook'));
  try {
    await ensureHsEnglish(bookId);
  } finally {
    hidePackLoading();
  }
}



document.addEventListener(
  'pointerdown',
  () => {
    unlockAudio();
  },
  { once: true }
);

let currentRoute = 'home';
let quizLevel = store.quizLevel === 'all' ? 'all' : 'core';
let router = null;
/** @type {null | (() => void)} */
let sessionRepaint = null;

function setSessionRepaint(fn) {
  sessionRepaint = typeof fn === 'function' ? fn : null;
}

function clearSessionRepaint() {
  sessionRepaint = null;
  clearFlashKeys();
}

/** Wayground-style: Space flips, Enter goes next. */
let flashKeysCleanup = null;

function clearFlashKeys() {
  if (flashKeysCleanup) {
    flashKeysCleanup();
    flashKeysCleanup = null;
  }
}

function bindFlashKeys({ onFlip, onNext }) {
  clearFlashKeys();
  const onKey = (e) => {
    if (e.repeat) return;
    const el = e.target;
    const tag = el && el.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el?.isContentEditable) return;
    if (e.code === 'Space' || e.key === ' ') {
      e.preventDefault();
      onFlip?.();
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      onNext?.();
    }
  };
  window.addEventListener('keydown', onKey);
  flashKeysCleanup = () => window.removeEventListener('keydown', onKey);
}

/** After answering a quiz item: keep the Next button, and let Enter advance too. */
function bindEnterNext(onNext) {
  clearFlashKeys();
  const onKey = (e) => {
    if (e.repeat) return;
    const el = e.target;
    const tag = el && el.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el?.isContentEditable) return;
    if (e.key === 'Enter') {
      e.preventDefault();
      onNext?.();
    }
  };
  window.addEventListener('keydown', onKey);
  flashKeysCleanup = () => window.removeEventListener('keydown', onKey);
}

function wireQuizNext(onNext) {
  const btn = document.getElementById('nx') || document.getElementById('gonext');
  if (!btn) return;
  const go = () => {
    clearFlashKeys();
    onNext();
  };
  btn.onclick = go;
  bindEnterNext(go);
}


function speakIconSvg() {
  return `<svg class="speak-svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>`;
}

function speakIconBtn(id, titleKey = 'speak') {
  if (!canSpeak()) return '';
  const idAttr = id ? `id="${id}"` : '';
  return `<button type="button" class="speak-fab" ${idAttr} aria-label="${tb(titleKey)}" title="${tb('speak')}">${speakIconSvg()}</button>`;
}

function flashSpeakHtml() {
  if (!canSpeak()) return '';
  return `<button type="button" class="speak-fab flash-speak" aria-label="${tb('speak')}" title="${tb('speak')}">${speakIconSvg()}</button>`;
}

function bindFlashSpeak({ getFlipped, frontText, backText, frontLang = 'en-US', backLang = 'zh-CN' }) {
  document.querySelectorAll('#flash .flash-speak').forEach((btn) => {
    btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      primeSpeech();
      if (isSpeaking() && btn.classList.contains('is-speaking')) {
        stopSpeak();
        return;
      }
      const flipped = !!getFlipped();
      speakText(flipped ? backText : frontText, flipped ? backLang : frontLang, btn);
    };
  });
}

function isGlossableChar(ch) {
  return /[\u4e00-\u9fff]/.test(ch);
}

function renderClassicMarkup(text) {
  return Array.from(String(text || ''))
    .map((ch, i) => {
      if (ch === '\n') return '<br>';
      if (!isGlossableChar(ch)) return `<span class="classic-punct">${escapeHtml(ch)}</span>`;
      return `<span class="classic-char" role="button" tabindex="0" data-i="${i}">${escapeHtml(ch)}</span>`;
    })
    .join('');
}

function findGlossAt(text, cpIndex, notes = []) {
  const chars = Array.from(String(text || ''));
  const strIndex = chars.slice(0, cpIndex).join('').length;
  let best = null;
  for (const n of notes || []) {
    const phrase = n?.from;
    if (!phrase) continue;
    let start = 0;
    while (true) {
      const at = text.indexOf(phrase, start);
      if (at < 0) break;
      if (strIndex >= at && strIndex < at + phrase.length) {
        if (!best || phrase.length > best.from.length) best = n;
      }
      start = at + 1;
    }
  }
  if (best) return { from: best.from, gloss: best.gloss };
  const ch = chars[cpIndex] || '';
  if (ch && classicGloss[ch]) return { from: ch, gloss: classicGloss[ch] };
  return { from: ch, gloss: tb('glossFallback') };
}

function bindClassicGloss(host, text, notes = []) {
  let pop = null;
  const clear = () => {
    pop?.remove();
    pop = null;
    host.querySelectorAll('.classic-char.is-active').forEach((el) => el.classList.remove('is-active'));
  };
  host.querySelectorAll('.classic-char').forEach((btn) => {
    const open = (e) => {
      e.stopPropagation();
      const i = Number(btn.dataset.i);
      const g = findGlossAt(text, i, notes);
      clear();
      btn.classList.add('is-active');
      pop = document.createElement('div');
      pop.className = 'gloss-pop';
      pop.innerHTML = `<div class="gloss-from">${escapeHtml(g.from)}</div><div class="gloss-to">${escapeHtml(g.gloss)}</div>`;
      host.appendChild(pop);
      const r = btn.getBoundingClientRect();
      const hr = host.getBoundingClientRect();
      let left = r.left - hr.left;
      let top = r.bottom - hr.top + 6;
      pop.style.left = `${Math.max(0, left)}px`;
      pop.style.top = `${top}px`;
      requestAnimationFrame(() => {
        if (!pop) return;
        const pr = pop.getBoundingClientRect();
        if (pr.right > hr.right - 4) {
          pop.style.left = `${Math.max(0, left - (pr.right - hr.right + 8))}px`;
        }
      });
    };
    btn.onclick = open;
    btn.onkeydown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(e);
      }
    };
  });
  host.addEventListener(
    'click',
    (e) => {
      if (!(e.target instanceof Element)) return;
      if (e.target.closest('.classic-char') || e.target.closest('.gloss-pop')) return;
      clear();
    },
    true
  );
}


function softChromeRefresh() {
  const bar = app.querySelector('.topbar');
  if (bar) {
    const tmp = document.createElement('div');
    tmp.innerHTML = topbar();
    bar.replaceWith(tmp.firstElementChild);
  }
}

function save() {
  store.quizLevel = quizLevel === 'all' ? 'all' : 'core';
  writeStore();
}

function markDayDone(dayNum) {
  store.dayProgress[String(dayNum)] = {
    done: true,
    at: Date.now(),
  };
  markStudyToday();
  save();
}

function isDayDone(dayNum) {
  return Boolean(store.dayProgress[String(dayNum)]?.done);
}

function doneDayCount() {
  return days.filter((d) => isDayDone(d.day)).length;
}

function addXp(n, correct, { countStreak = true } = {}) {
  store.xp += n;
  if (correct) {
    if (countStreak) {
      store.streak += 1;
      store.bestStreak = Math.max(store.bestStreak, store.streak);
    }
    markStudyToday();
  } else if (countStreak) {
    store.streak = 0;
  }
  save();
}

/* —— Background particles (premium soft orbs) —— */
function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, orbs, mouse = { x: 0.5, y: 0.4 }, reduce = false;

  try {
    reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (_) {
    /* ignore */
  }

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    const n = reduce ? 12 : Math.min(36, Math.floor(w / 40) + 14);
    orbs = Array.from({ length: n }, (_, i) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 40 + Math.random() * 110,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      hue: [320, 280, 200, 160, 40][i % 5],
      a: 0.04 + Math.random() * 0.07,
      phase: Math.random() * Math.PI * 2,
    }));
  }

  window.addEventListener(
    'pointermove',
    (e) => {
      mouse.x = e.clientX / Math.max(1, w);
      mouse.y = e.clientY / Math.max(1, h);
    },
    { passive: true }
  );

  function tick(t = 0) {
    ctx.clearRect(0, 0, w, h);
    const px = (mouse.x - 0.5) * 24;
    const py = (mouse.y - 0.5) * 18;
    for (const o of orbs) {
      if (!reduce) {
        o.x += o.vx;
        o.y += o.vy;
        o.phase += 0.008;
        if (o.x < -o.r) o.x = w + o.r;
        if (o.x > w + o.r) o.x = -o.r;
        if (o.y < -o.r) o.y = h + o.r;
        if (o.y > h + o.r) o.y = -o.r;
      }
      const pulse = 1 + Math.sin(o.phase) * 0.1;
      const depth = 0.55 + (o.r / 200);
      const ox = o.x + px * depth;
      const oy = o.y + py * depth;
      const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, o.r * pulse);
      g.addColorStop(0, `hsla(${o.hue + Math.sin(o.phase) * 6}, 88%, 70%, ${o.a * 1.15})`);
      g.addColorStop(0.45, `hsla(${o.hue}, 80%, 58%, ${o.a * 0.4})`);
      g.addColorStop(1, `hsla(${o.hue}, 70%, 50%, 0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(ox, oy, o.r * pulse, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(tick);
  }

  resize();
  window.addEventListener('resize', resize);
  requestAnimationFrame(tick);
}

/* —— FX —— */
const CONFETTI = ['#e21b3c', '#1368ce', '#d89e00', '#26890c', '#f9a8d4', '#fbbf24', '#a78bfa', '#34d399', '#fff'];

function prefersReducedMotion() {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (_) {
    return false;
  }
}

function burst(x, y, color = '#4ade80', count = 34) {
  if (prefersReducedMotion()) return;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    const kind = i % 4;
    el.className =
      kind === 0
        ? 'burst confetti rect'
        : kind === 1
          ? 'burst confetti dot'
          : kind === 2
            ? 'burst confetti shard'
            : 'burst confetti star';
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
    const dist = 70 + Math.random() * 150;
    const rot = (Math.random() * 720 - 360) | 0;
    const delay = Math.random() * 80;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.background = color || CONFETTI[i % CONFETTI.length];
    el.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
    el.style.setProperty('--dy', `${Math.sin(angle) * dist - 40 - Math.random() * 50}px`);
    el.style.setProperty('--rot', `${rot}deg`);
    el.style.setProperty('--s', `${0.65 + Math.random() * 1.15}`);
    el.style.animationDelay = `${delay}ms`;
    fx?.appendChild(el);
    setTimeout(() => el.remove(), 1200 + delay);
  }
}

function shockwave(x, y, ok = true) {
  if (!fx) return;
  const el = document.createElement('div');
  el.className = `shockwave ${ok ? 'ok' : 'no'}`;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  fx.appendChild(el);
  setTimeout(() => el.remove(), 700);
}

function streakBanner(n) {
  if (prefersReducedMotion()) return;
  const el = document.createElement('div');
  el.className = 'streak-banner';
  const label = getLang() === 'en' ? 'STREAK' : getLang() === 'zh' ? '连击' : 'STREAK 连击';
  el.innerHTML = `<span class="streak-flame">🔥</span><strong>×${n}</strong><em>${label}</em>`;
  fx?.appendChild(el);
  setTimeout(() => el.remove(), 1600);
}

function screenFlash(ok) {
  const el = document.createElement('div');
  el.className = `wg-flash ${ok ? 'ok' : 'no'}`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 520);
}

function floatText(x, y, text, color = '#86efac') {
  if (!fx) return;
  const el = document.createElement('div');
  el.className = 'float-text premium';
  el.textContent = text;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.style.color = color;
  fx.appendChild(el);
  setTimeout(() => el.remove(), 1100);
}

function celebrate(correct) {
  const x = window.innerWidth / 2;
  const y = window.innerHeight * 0.36;
  screenFlash(correct);
  shockwave(x, y, correct);
  document.body.classList.remove('hit-ok', 'hit-bad');
  void document.body.offsetWidth;
  document.body.classList.add(correct ? 'hit-ok' : 'hit-bad');
  setTimeout(() => document.body.classList.remove('hit-ok', 'hit-bad'), 480);
  if (correct) {
    try {
      sfxCorrect();
    } catch (_) {
      /* ignore */
    }
    const waves = store.streak >= 5 ? 6 : 4;
    for (let k = 0; k < waves; k++) {
      setTimeout(() => {
        burst(
          x + (Math.random() - 0.5) * 180,
          y + (Math.random() - 0.5) * 60,
          CONFETTI[k % CONFETTI.length],
          store.streak >= 5 ? 42 : 34
        );
      }, k * 48);
    }
    if (store.streak >= 2) {
      try {
        sfxStreak(store.streak);
      } catch (_) {
        /* ignore */
      }
      if (store.streak >= 3) streakBanner(store.streak);
    }
    floatText(
      x,
      y,
      store.streak >= 3
        ? getLang() === 'en'
          ? `${store.streak} Streak!`
          : getLang() === 'zh'
            ? `${store.streak} 连击！`
            : `${store.streak} 连击! Streak!`
        : tb('correctBanner'),
      '#86efac'
    );
  } else {
    try {
      sfxWrong();
    } catch (_) {
      /* ignore */
    }
    burst(x, y, '#ef4444', 16);
    floatText(
      x,
      y,
      getLang() === 'en' ? 'Try again' : getLang() === 'zh' ? '再想想' : '再想想 / Try again',
      '#fca5a5'
    );
  }
}

function fanfare(message) {
  const x = window.innerWidth / 2;
  const y = window.innerHeight * 0.36;
  screenFlash(true);
  shockwave(x, y, true);
  if (!prefersReducedMotion()) {
    for (let k = 0; k < 3; k++) {
      setTimeout(() => {
        burst(x + (Math.random() - 0.5) * 140, y + (Math.random() - 0.5) * 40, CONFETTI[k % CONFETTI.length], 22);
      }, k * 60);
    }
  }
  floatText(x, y, message || tb('great'), '#fde68a');
}

function bilingualHtml(text) {
  return localizeHtml(text);
}

/* —— UI helpers —— */
function subjectChips(active, prefix = 'sub') {
  return Object.values(subjects)
    .map(
      (s) =>
        `<button class="chip ${active === s.id ? 'active' : ''}" data-${prefix}="${s.id}">${subjectName(s.id)}</button>`
    )
    .join('');
}

function levelChips() {
  return `<div class="filters level-filters">
    <button class="chip ${quizLevel === 'core' ? 'active' : ''}" data-qlevel="core">${tb('filterCore')}</button>
    <button class="chip ${quizLevel === 'all' ? 'active' : ''}" data-qlevel="all">${tb('filterAll')}</button>
  </div>`;
}

function wgMcqHtml(options) {
  return `<div class="wg-options" id="opts">${options
    .map(
      (o, i) =>
        `<button class="wg-opt" data-i="${i}"><span class="shape">${'ABCD'[i]}</span><span>${localizeText(o)}</span></button>`
    )
    .join('')}</div>`;
}

function wgTfHtml() {
  return `<div class="wg-options tf-row" id="opts">
    <button class="wg-opt" data-i="true"><span class="shape">T</span><span>${tb('trueOpt')}</span></button>
    <button class="wg-opt" data-i="false"><span class="shape">F</span><span>${tb('falseOpt')}</span></button>
  </div>`;
}

function wgPlayShell({ title, meta, progressLabel, rightLabel, pct, questionHtml, optsHtml }) {
  return `
    ${topbar()}
    <div class="screen wg-play">
      <div class="screen-header">${backBtn()}<h2 class="screen-title">${title}</h2></div>
      <div class="wg-hud">
        <span class="pill">${progressLabel}</span>
        <span class="pill">🔥 ${store.streak}</span>
        <span class="pill">${rightLabel}</span>
      </div>
      <div class="progress-wrap">
        <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
      </div>
      <div class="wg-question">
        <div class="wg-q-meta">${meta}</div>
        <div class="wg-q-text">${bilingualHtml(questionHtml)}</div>
      </div>
      ${optsHtml}
      <div id="fb"></div>
      <div class="flash-actions" style="margin-top:14px;display:none" id="nextwrap">
        <button class="btn btn-primary" id="gonext">${tb('nextArrow')}</button>
      </div>
    </div>`;
}

function dayTitle(d) {
  if (getLang() === 'en') return d.title;
  if (getLang() === 'zh') return d.titleZh || d.title;
  if (d.titleZh && d.title && d.titleZh !== d.title) return `${d.titleZh} · ${d.title}`;
  return d.titleZh || d.title;
}

function feedbackOk(body) {
  return `<div class="wg-feedback ok"><strong>${tb('correctBanner')}</strong>${localizeHtml(body || '')}</div>`;
}

function feedbackNo(answer, body) {
  return `<div class="wg-feedback no"><strong>${tb('incorrectBanner')}</strong>${tb('answerLabel')}${localizeText(answer)}<br>${localizeHtml(body || '')}</div>`;
}

/* —— HOME · Tom's Ground subject portal —— */
function isIeltsDayDone(n) {
  return Boolean(store.ieltsProgress[String(n)]?.done);
}

function markIeltsDayDone(n) {
  store.ieltsProgress[String(n)] = { done: true, at: Date.now() };
  markStudyToday();
  save();
}

function ieltsDoneCount() {
  let n = 0;
  for (let d = 1; d <= IELTS_DAY_TOTAL; d++) {
    if (isIeltsDayDone(d)) n += 1;
  }
  return n;
}

function isHsUnitDone(bookId, unitId) {
  return Boolean(store.hsProgress[hsProgressKey(bookId, unitId)]?.done);
}

function markHsUnitDone(bookId, unitId) {
  store.hsProgress[hsProgressKey(bookId, unitId)] = { done: true, at: Date.now() };
  markStudyToday();
  save();
}

function hsBookDoneCount(book) {
  return (book?.units || []).filter((u) => isHsUnitDone(book.id, u.id)).length;
}

function rememberSrs(kind, id, correct) {
  if (!id) return;
  store.srs = applyReview(store.srs, srsKey(kind, id), !!correct);
  save();
}

function nextHsTarget() {
  for (const book of HS_BOOKS) {
    for (const unit of book.units || []) {
      if (!isHsUnitDone(book.id, unit.id)) return { book, unit };
    }
  }
  const book = HS_BOOKS[0];
  return { book, unit: book?.units?.[0] || null };
}

function dueSrsCount() {
  return dueEntries(store.srs).length;
}

function hsUnitsDoneTotal() {
  let u = 0;
  let t = 0;
  HS_BOOKS.forEach((b) => {
    t += (b.units || []).length;
    u += hsBookDoneCount(b);
  });
  return { u, t };
}

function hsBookCardHtml(book, { large = false } = {}) {
  const badge = `${book.series === 'compulsory' ? tb('hsCompulsory') : tb('hsSelective')} ${book.n}`;
  const done = hsBookDoneCount(book);
  return `<div class="hs-card ${large ? 'hs-card-lg' : ''}">
    <div class="hs-card-stripe" aria-hidden="true"></div>
    <div class="hs-card-body">
      <span class="hs-badge">${badge}</span>
      <div class="hs-card-zh">${escapeHtml(book.zh)}</div>
      <div class="hs-card-en">${escapeHtml(book.en)}</div>
      <div class="hs-card-meta">${book.wordCount} ${tb('words')} · ${tb('hsLearned', { n: done, t: book.units.length })}</div>
    </div>
  </div>`;
}

function hsWordSpeakBtn(word) {
  if (!canSpeak()) return '';
  return `<button type="button" class="speak-fab hs-word-speak" data-speak-word="${escapeHtml(word)}" aria-label="${tb('hsSpeakWord')}" title="${tb('hsSpeakWord')}">${speakIconSvg()}</button>`;
}

function bindHsWordSpeak() {
  document.querySelectorAll('.hs-word-speak').forEach((btn) => {
    btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      primeSpeech();
      if (isSpeaking() && btn.classList.contains('is-speaking')) {
        stopSpeak();
        return;
      }
      const word = btn.getAttribute('data-speak-word') || '';
      if (word) speakText(word, 'en-GB', btn);
    };
  });
}

function hsUsageNote(w) {
  const zh = String(w.zh || '')
    .split(/[；;]/)[0]
    .trim();
  const pos = String(w.pos || '');
  const pl = pos.toLowerCase();
  let zhTip;
  let enTip;
  if (pos.includes('短语')) {
    zhTip = `固定搭配，整组记：${w.word} ≈ ${zh}。`;
    enTip = `Set phrase: ${w.word}.`;
  } else if (pos.includes('专有')) {
    zhTip = `专有名词，本课指「${zh}」。`;
    enTip = `Proper name in this unit.`;
  } else if (pl.includes('adj')) {
    zhTip = `形容词，作定语或表语，表示「${zh}」。`;
    enTip = `Adjective before a noun or after be.`;
  } else if (pl.includes('adv')) {
    zhTip = `副词，修饰动词或句子，表示「${zh}」。`;
    enTip = `Adverb: modifies a verb or the whole clause.`;
  } else if (/\bvt|\bvi|\bv\.|\bv /.test(pl) || pl.startsWith('v')) {
    zhTip = `动词作谓语，核心意思「${zh}」。`;
    enTip = `Verb used as the predicate.`;
  } else if (pl.includes('prep')) {
    zhTip = `介词，后面常接名词/代词，表示「${zh}」。`;
    enTip = `Preposition: followed by a noun or pronoun.`;
  } else {
    zhTip = `${pos || 'n.'}，核心意思「${zh}」。`;
    enTip = `${pos || 'n.'}: “${zh}”.`;
  }
  const L = getLang();
  const body = L === 'en' ? enTip : L === 'zh' ? zhTip : `${zhTip} ${enTip}`;
  const ex =
    w.example && w.exampleZh
      ? L === 'en'
        ? w.example
        : L === 'zh'
          ? w.exampleZh
          : `${w.example} · ${w.exampleZh}`
      : w.example || w.exampleZh || '';
  return { body, ex };
}

function bindHsWordList() {
  bindHsWordSpeak();
  const list = document.querySelector('.hs-word-list');
  if (!list) return;
  list.querySelectorAll('.hs-word-row').forEach((row) => {
    const trigger = row.querySelector('.hs-word-copy');
    if (!trigger) return;
    trigger.onclick = () => {
      const open = row.classList.contains('is-open');
      list.querySelectorAll('.hs-word-row.is-open').forEach((r) => {
        r.classList.remove('is-open');
        r.querySelector('.hs-word-copy')?.setAttribute('aria-expanded', 'false');
      });
      if (!open) {
        row.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
      try {
        sfxClick();
      } catch (_) {}
    };
  });
}

function hsBookTitle(book) {
  if (!book) return '';
  const L = getLang();
  if (L === 'en') return book.en;
  if (L === 'zh') return book.zh;
  return `${book.zh} · ${book.en}`;
}

function hsUnitNumLabel(unit) {
  if (!unit) return '';
  if (unit.n === 0) return tb('welcomeUnit');
  return tb('unitOf', { n: unit.n });
}

function hsUnitHeading(unit) {
  if (!unit) return '';
  const num = hsUnitNumLabel(unit);
  const L = getLang();
  if (L === 'en') return `${num} · ${unit.en}`;
  if (L === 'zh') return `${num} · ${unit.zh}`;
  return `${num} · ${unit.en} · ${unit.zh}`;
}

function nextScienceDay() {
  return SCIENCE_DAY_META.find((d) => !isDayDone(d.day)) || SCIENCE_DAY_META[0] || null;
}

function hubCompletionPct(hubId) {
  if (hubId === 'english') {
    const hs = hsUnitsDoneTotal();
    const den = IELTS_DAY_TOTAL + hs.t;
    const num = ieltsDoneCount() + hs.u;
    return den ? (num / den) * 100 : 0;
  }
  if (hubId === 'physics' || hubId === 'chemistry' || hubId === 'biology') {
    const all = SCIENCE_DAY_META.filter((d) => d.subject === hubId);
    const done = all.filter((d) => isDayDone(d.day)).length;
    return all.length ? (done / all.length) * 100 : 0;
  }
  return 0;
}

function quizModeButtons() {
  return `<p class="section-hint">${tb('quizMode')}</p>
    <div class="flash-actions">
      <button type="button" class="btn" data-qmode="spot">${tb('ieltsSpot')}</button>
      <button type="button" class="btn" data-qmode="dictation">${tb('dictation')}</button>
      <button type="button" class="btn" data-qmode="cloze">${tb('cloze')}</button>
      <button type="button" class="btn" data-qmode="match">${tb('enMatch')}</button>
    </div>`;
}

function bindQuizModeButtons(words, bank, opts) {
  app.querySelectorAll('[data-qmode]').forEach((btn) => {
    btn.onclick = () => {
      sfxClick();
      startEnglishWordMode(btn.getAttribute('data-qmode'), words, bank, opts);
    };
  });
}

function paintModeResults(pct, correct, total, words, bank, opts) {
  clearSessionRepaint();
  const back = opts.back || 'home';
  app.innerHTML = `
    ${topbar()}
    <div class="screen">
      <div class="screen-header">${backBtn(back)}<h2 class="screen-title">${tb('results')}</h2></div>
      <div class="panel results" style="--pct:${pct}">
        <div class="score-ring">${pct}%</div>
        <h3>${correct}/${total}</h3>
        <div class="flash-actions">
          <button class="btn" data-nav="${back}">${tb('back')}</button>
          <button class="btn" data-nav="home">${tb('home')}</button>
        </div>
        ${quizModeButtons()}
      </div>
    </div>`;
  bindQuizModeButtons(words, bank, opts);
}

function startEnglishWordMode(mode, words, bank, { back = 'home', srsKind = 'ielts' } = {}) {
  const pool = (words || []).slice();
  const kind = srsKind === 'hs' ? 'hs' : 'ielts';
  if (mode === 'dictation') {
    return runDictationDrill({
      title: tb('dictation'),
      back,
      items: pool.map(makeDictationItem),
      srsKind: kind,
      words: pool,
      bank,
    });
  }
  if (mode === 'match') {
    return renderEnglishMatch(pool, back, kind);
  }
  const preferEnDef = kind !== 'hs';
  const items =
    mode === 'cloze'
      ? clozeItemsFromWords(pool, bank)
      : shuffle(pool.slice()).map((w) => makeEnWordSpotItem(w, bank, { preferEnDef: preferEnDef && Math.random() > 0.4 }));
  const fallback = pool.map((w) => makeEnWordSpotItem(w, bank, { preferEnDef: false }));
  return runMcqDrill({
    title: mode === 'cloze' ? tb('cloze') : tb('ieltsSpot'),
    back,
    items: items.length ? items : fallback,
    onAnswer(item, ok) {
      rememberSrs(kind, item.id, ok);
      if (!ok) {
        recordWrong({
          id: `${kind}-${item.id}`,
          kind: `${kind}-${mode === 'cloze' ? 'cloze' : 'spot'}`,
          prompt: item.prompt,
          correctText: item.answer,
          answer: item.answer,
          explain: item.tip,
          subject: 'english',
        });
      }
    },
    onDone({ correct, total, pct }) {
      paintModeResults(pct, correct, total, pool, bank, { back, srsKind: kind });
    },
  });
}

function renderHome() {
  currentRoute = 'home';
  const nextIelts = ieltsDayMeta.find((d) => !isIeltsDayDone(d.day)) || ieltsDayMeta[0];
  const hsNext = nextHsTarget();
  const nextSci = nextScienceDay();
  const dueN = dueSrsCount();
  const flags = recentStudyFlags(7);
  const hsTot = hsUnitsDoneTotal();
  app.innerHTML = `
    ${topbar()}
    <section class="hero hero-portal">
      <div class="hero-kicker">${tb('portalKicker')}</div>
      <h1>Tom's <span>Ground</span></h1>
      <p>${tb('heroSub')}</p>
      <p class="study-streak-line">${tb('studyStreak', { n: consecutiveStudyDays() })}</p>
      <div class="week-dots" aria-hidden="true">
        ${flags.map((f) => `<span class="week-dot ${f.done ? 'on' : ''}" title="${f.date}"></span>`).join('')}
      </div>
    </section>

    <h3 class="section-label">${tb('todayPlan')}</h3>
    <div class="today-grid">
      <div class="today-card panel ielts-spotlight">
        <div class="today-label">${tb('todayIelts')}</div>
        <div class="today-title">${tb('dayOf', { n: nextIelts.day })} · ${dayTitle({ title: nextIelts.title, titleZh: nextIelts.titleZh })}</div>
        <div class="today-sub">${tb('band7')} · ${nextIelts.topic || ''}</div>
        <button class="btn btn-primary" data-ielts-day="${nextIelts.day}">${tb('startMemorize')}</button>
        <button class="btn" data-nav="ielts-days">${tb('ieltsDays')}</button>
      </div>
      <div class="today-card panel">
        <div class="today-label">${tb('nextHs')}</div>
        <div class="today-title">${hsNext.book ? escapeHtml(hsBookTitle(hsNext.book)) : ''} · ${hsNext.unit ? escapeHtml(hsUnitHeading(hsNext.unit)) : ''}</div>
        <div class="today-sub">${tb('hsLearned', { n: hsTot.u, t: hsTot.t })}</div>
        ${
          hsNext.book && hsNext.unit
            ? `<button class="btn btn-primary" data-hs-unit="${hsNext.book.id}:${hsNext.unit.id}">${tb('start')}</button>`
            : ''
        }
        <button class="btn" data-nav="hs-shelf">${tb('hsShelf')}</button>
      </div>
      <div class="today-card panel">
        <div class="today-label">${tb('nextSci')}</div>
        <div class="today-title">${nextSci ? `${tb('dayOf', { n: nextSci.day })} · ${dayTitle(nextSci)}` : ''}</div>
        <div class="today-sub">${nextSci ? subjectName(nextSci.subject) : ''}</div>
        ${nextSci ? `<button class="btn btn-primary" data-start-day="${nextSci.day}">${tb('startDay')} ${nextSci.day}</button>` : ''}
        <button class="btn" data-nav="days">${tb('allDays')}</button>
      </div>
      <div class="today-card panel">
        <div class="today-label">${tb('todayReview')}</div>
        <div class="today-title">${dueN ? tb('dueWords', { n: dueN }) : tb('noDue')}</div>
        <div class="today-sub">${tb('wrongBook')} · ${store.wrong.length}</div>
        <button class="btn btn-primary" data-nav="srs" ${dueN ? '' : 'disabled'}>${tb('startReview')}</button>
        <button class="btn" data-nav="wrong">${tb('wrongBook')}</button>
      </div>
    </div>
    <div class="flash-actions home-io">
      <button class="btn" id="export-progress">${tb('exportProgress')}</button>
      <button class="btn" id="import-progress">${tb('importProgress')}</button>
      <button class="btn" data-nav="progress">${tb('progress')}</button>
      <input type="file" id="import-file" accept="application/json,.json" hidden />
    </div>
    <p class="import-msg" id="import-msg"></p>

    <h3 class="section-label">${tb('pickSubject')}</h3>
    <p class="section-hint">${tb('pickSubjectSub')}</p>
    <div class="hub-grid">
      ${HUBS.map((h) => {
        const pct = hubCompletionPct(h.id);
        let tag = `${Math.round(pct)}%`;
        if (h.id === 'english') tag = `${ieltsDoneCount()}/${IELTS_DAY_TOTAL}`;
        else if (h.id === 'physics' || h.id === 'chemistry' || h.id === 'biology') {
          const all = SCIENCE_DAY_META.filter((d) => d.subject === h.id);
          const done = all.filter((d) => isDayDone(d.day)).length;
          tag = `${done}/${all.length}`;
        } else tag = tb('start');
        return `<button class="hub-card" data-hub="${h.id}" style="--hub-accent:${h.accent};--hub-glow:${h.glow}">
          <div class="hub-orb"></div>
          <div class="hub-icon">${h.icon}</div>
          <div class="hub-name">${hubTitle(h)}</div>
          <div class="hub-blurb">${hubBlurb(h)}</div>
          ${hubProgressBar(pct)}
          <div class="hub-cta">${tb('hubDone')} · ${tag}</div>
        </button>`;
      }).join('')}
    </div>
  `;
  bindProgressIo();
  prefetchInBackground();
}

function renderProgress() {
  currentRoute = 'progress';
  const flags = recentStudyFlags(14);
  const hsTot = hsUnitsDoneTotal();
  app.innerHTML = `
    ${topbar()}
    <div class="screen">
      <div class="screen-header">${backBtn('home')}<h2 class="screen-title">${tb('progress')}</h2></div>
      <div class="panel progress-panel">
        <p>${tb('studyStreak', { n: consecutiveStudyDays() })} · XP ${store.xp}</p>
        <div class="week-dots week-dots-lg">
          ${flags.map((f) => `<span class="week-dot ${f.done ? 'on' : ''}" title="${f.date}"></span>`).join('')}
        </div>
        <ul class="progress-stats">
          <li>${tb('ieltsTrack')} · ${ieltsDoneCount()}/${IELTS_DAY_TOTAL}</li>
          <li>${tb('hsTrack')} · ${tb('hsLearned', { n: hsTot.u, t: hsTot.t })}</li>
          <li>${tb('wrongBook')} · ${store.wrong.length}</li>
          <li>${tb('todayReview')} · ${dueSrsCount()}</li>
        </ul>
        <div class="flash-actions">
          <button class="btn btn-primary" id="export-progress">${tb('exportProgress')}</button>
          <button class="btn" id="import-progress">${tb('importProgress')}</button>
          <input type="file" id="import-file" accept="application/json,.json" hidden />
        </div>
        <p class="import-msg" id="import-msg"></p>
      </div>
    </div>`;
  bindProgressIo();
}

function bindProgressIo() {
  const exp = document.getElementById('export-progress');
  const imp = document.getElementById('import-progress');
  const file = document.getElementById('import-file');
  const msg = document.getElementById('import-msg');
  if (exp) {
    exp.onclick = () => {
      const blob = new Blob([exportProgress()], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `toms-ground-progress-${todayStamp()}.json`;
      a.click();
      URL.revokeObjectURL(a.href);
    };
  }
  if (imp && file) {
    imp.onclick = () => file.click();
    file.onchange = async () => {
      const f = file.files && file.files[0];
      if (!f) return;
      try {
        const text = await f.text();
        importProgress(text);
        quizLevel = store.quizLevel === 'all' ? 'all' : 'core';
        if (msg) msg.textContent = tb('importOk');
        if (currentRoute === 'home') renderHome();
        else renderProgress();
      } catch (_) {
        if (msg) msg.textContent = tb('importFail');
      }
    };
  }
}

function todayStamp() {
  return new Date().toISOString().slice(0, 10);
}

async function renderHub(hubId) {
  const h = getHub(hubId);
  if (!h) return renderHome();
  currentRoute = 'hub-' + hubId;
  store.activeHub = hubId;
  save();
  if (hubId === 'chinese') await needChinese();
  else if (hubId === 'math') await needMath();
  else if (hubId !== 'english') await needScience();
  let modes = '';
  if (hubId === 'english') {
    modes = `
      <div class="en-dual">
        <div class="en-col">
          <button class="en-track en-track-ielts" data-nav="ielts-days" style="--hub-accent:#10b981">
            <div class="en-track-kicker">Track A</div>
            <h3>${tb('ieltsTrack')}</h3>
            <p>${tb('ieltsTrackBlurb')}</p>
            <span class="mode-tag">${ieltsDoneCount()}/${IELTS_DAY_TOTAL} ${tb('done')}</span>
          </button>
          <div class="mode-grid en-ielts-modes">
            ${modeCard('ielts-days', '📅', tb('ieltsDays'), tb('band7'), `${ieltsDoneCount()}/${IELTS_DAY_TOTAL}`)}
            ${modeCard('ielts-go', '🃏', tb('ieltsMemorize'), tb('words25'), `${IELTS_WORD_TOTAL} ${tb('words')}`)}
            ${modeCard('ielts-spot', '🎯', tb('ieltsSpot'), tb('spotHint'), tb('start'))}
            ${modeCard('ielts-dictation', '✍', tb('dictation'), tb('dictationHint'), tb('start'))}
            ${modeCard('ielts-cloze', '▢', tb('cloze'), tb('clozeHint'), tb('start'))}
            ${modeCard('ielts-match', '🔗', tb('enMatch'), tb('matchDesc'), tb('start'))}
          </div>
        </div>
        <div class="en-col">
          <button class="en-track en-track-hs" data-nav="hs-shelf" style="--hub-accent:#f59e0b">
            <div class="en-track-kicker">Track B</div>
            <h3>${tb('hsTrack')}</h3>
            <p>${tb('hsTrackBlurb')}</p>
            <div class="en-track-covers" aria-hidden="true">
              ${HS_BOOKS.map(
                (b) =>
                  `<span class="en-mini-spine" style="--book-accent:${b.accent};--book-spine:${b.spine}"></span>`
              ).join('')}
            </div>
            <span class="mode-tag">${tb('pep2019')} · ${HS_WORD_TOTAL} ${tb('words')}</span>
          </button>
        </div>
      </div>
      <div class="mode-grid" style="margin-top:16px">
        ${modeCard('wrong', '📘', tb('wrongBook'), '', String(store.wrong.length))}
      </div>`;
  } else if (hubId === 'chinese') {
    const pool = filterChineseWorks(chineseGrade);
    const qPool = filterChineseQuestions(chineseGrade);
    modes = [
      modeCard('cn-list', '📚', tb('chineseList'), tb('chineseListHint'), `${pool.length} ${tb('worksCount')}`),
      modeCard('cn-flash', '🃏', tb('chineseFlash'), tb('chineseFlashHint'), `${pool.length} ${tb('worksCount')}`),
      modeCard('cn-quiz', '✅', tb('chineseQuiz'), tb('chineseQuizHint'), `${qPool.length} ${tb('questions')}`),
      modeCard('wrong', '📘', tb('wrongBook'), '', String(store.wrong.length)),
    ].join('');
  } else if (hubId === 'math') {
    modes = [
      modeCard('math-flash', '🃏', tb('mathFlash'), '', `${mathVocab.length} ${tb('words')}`),
      modeCard('math-quiz', '✅', tb('mathQuiz'), '', `${mathQuestions.length} ${tb('questions')}`),
      modeCard('wrong', '📘', tb('wrongBook'), '', String(store.wrong.length)),
    ].join('');
  } else {
    const sciDays = days.filter((d) => d.subject === hubId);
    const sciV = vocabulary.filter((v) => v.subject === hubId);
    const sciQ = questions.filter((q) => q.subject === hubId);
    modes = [
      modeCard('days', '📅', tb('scienceDays'), '', `${sciDays.filter((d) => isDayDone(d.day)).length}/${sciDays.length}`),
      modeCard('flash', '🃏', tb('scienceFlash'), '', `${sciV.length}`),
      modeCard('match', '🔗', tb('scienceMatch'), '', tb('start')),
      modeCard('mcq', '✅', tb('scienceMcq'), '', String(sciQ.filter((q) => q.type === 'mcq').length)),
      modeCard('tf', '⚖️', tb('scienceTf'), '', String(sciQ.filter((q) => q.type === 'tf').length)),
      hubId === 'chemistry' ? modeCard('periodic', '⚗️', tb('periodic'), '', tb('table')) : '',
      hubId === 'chemistry' ? modeCard('mass', '🧮', tb('mass'), '', tb('drill')) : '',
      modeCard('wrong', '📘', tb('wrongBook'), '', String(store.wrong.length)),
    ].join('');
  }
  app.innerHTML = `
    ${topbar()}
    <div class="screen hub-screen">
      <div class="screen-header">${backBtn('home')}<h2 class="screen-title">${h.icon} ${hubTitle(h)}</h2></div>
      <p class="hub-lead">${hubBlurb(h)}</p>
      ${
        hubId === 'chinese'
          ? `<div class="chip-row grade-chips" id="cn-grade-chips">
              <button class="chip ${chineseGrade === 'all' ? 'active' : ''}" data-grade="all">${tb('gradeAll')}</button>
              <button class="chip ${chineseGrade === 7 ? 'active' : ''}" data-grade="7">${tb('grade7')}</button>
              <button class="chip ${chineseGrade === 8 ? 'active' : ''}" data-grade="8">${tb('grade8')}</button>
              <button class="chip ${chineseGrade === 9 ? 'active' : ''}" data-grade="9">${tb('grade9')}</button>
            </div>`
          : ''
      }
      ${
        hubId === 'english'
          ? modes
          : `<h3 class="section-label">${tb('hubModes')}</h3>
      <div class="mode-grid">${modes}</div>`
      }
    </div>`;
  if (hubId === 'chinese') {
    app.querySelectorAll('#cn-grade-chips [data-grade]').forEach((btn) => {
      btn.onclick = () => {
        sfxClick();
        const g = btn.dataset.grade;
        chineseGrade = g === 'all' ? 'all' : Number(g);
        renderHub('chinese');
      };
    });
  }
}

/* —— DAILY DAYS —— */
async function renderDays() {
  currentRoute = 'days';
  await needScience();
  const hubBack = ['physics','chemistry','biology'].includes(store.activeHub) ? ('hub-' + store.activeHub) : 'home';
  const list = ['physics','chemistry','biology'].includes(store.activeHub)
    ? days.filter((d) => d.subject === store.activeHub)
    : days;
  app.innerHTML = `
    ${topbar()}
    <div class="screen">
      <div class="screen-header">${backBtn(hubBack)}<h2 class="screen-title">${tb('dailyDays')}</h2></div>
      <p class="days-intro">${tb('daysIntro')}</p>
      <div class="day-grid">
        ${list
          .map((d) => {
            const done = isDayDone(d.day);
            return `<button class="day-card ${done ? 'done' : ''}" data-start-day="${d.day}">
              <div class="day-num">Day ${d.day}</div>
              <div class="day-name">${dayTitle(d)}</div>
              <div class="day-zh">${dayTitle(d)}</div>
              <div class="day-meta">${subjectName(d.subject)} · ${d.vocabIds.length} ${tb('words')} · ${d.questionIds.length} ${tb('questions')}</div>
              <div class="day-status">${done ? '✓ ' + tb('done') : tb('start')}</div>
            </button>`;
          })
          .join('')}
      </div>
    </div>`;
}

async function startDayPractice(dayNum) {
  await needScience();
  const plan = getDay(dayNum);
  if (!plan) {
    navigate('days');
    return;
  }
  currentRoute = 'days';
  const vocab = dayVocab(plan);
  const qs = shuffle(dayQuestions(plan).slice());
  let step = 0; // 0 intro, 1 words, 2 vocab quiz, 3 questions, 4 done
  let wordIndex = 0;
  let flipped = false;
  let vQuiz = [];
  let vIdx = 0;
  let vCorrect = 0;
  let qIdx = 0;
  let qCorrect = 0;
  let locked = false;

  function buildVocabQuiz() {
    vQuiz = shuffle(vocab.slice()).map((v) => {
      const wrong = shuffle(vocab.filter((x) => x.id !== v.id).map((x) => x.zh)).slice(0, 3);
      while (wrong.length < 3) {
        const pool = vocabulary.filter((x) => x.zh !== v.zh);
        wrong.push(pool[Math.floor(Math.random() * pool.length)].zh);
      }
      return {
        id: v.id,
        prompt: `${v.en}\n「${v.en}」的中文是？ / What is the Chinese for this term?`,
        answer: v.zh,
        options: shuffle([v.zh, ...wrong.slice(0, 3)]),
        tip: v.tip,
      };
    });
    vIdx = 0;
    vCorrect = 0;
  }

  function paint() {
    setSessionRepaint(paint);
    clearFlashKeys();
    if (step === 0) {
      app.innerHTML = `
        ${topbar()}
        <div class="screen">
          <div class="screen-header">${backBtn('days')}<h2 class="screen-title">Day ${plan.day}</h2></div>
          <div class="panel day-intro">
            <div class="flash-chapter">${subjectLabel(plan.subject)} · ${plan.titleZh}</div>
            <h2 style="font-family:var(--font-display);font-size:1.8rem;margin:8px 0">${plan.title}</h2>
            <p style="color:#dff2f6;margin-bottom:16px">${plan.blurb}</p>
            <div class="day-pipeline">
              <span>1 背单词 ×${vocab.length}</span>
              <span>2 单词小测</span>
              <span>3 选择/判断 ×${qs.length}</span>
            </div>
            <div class="flash-actions" style="justify-content:flex-start">
              <button class="btn btn-primary" id="go">${tb('pipeline')}</button>
            </div>
          </div>
        </div>`;
      document.getElementById('go').onclick = () => {
        sfxClick();
        step = 1;
        wordIndex = 0;
        flipped = false;
        paint();
      };
      return;
    }

    if (step === 1) {
      const v = vocab[wordIndex];
      app.innerHTML = `
        ${topbar()}
        <div class="screen">
          <div class="screen-header">${backBtn('days')}<h2 class="screen-title">Day ${plan.day} · Words</h2></div>
          <div class="step-pills"><span class="on">1 ${tb('words')}</span><span>2 Quiz</span><span>3 ${tb('questions')}</span></div>
          <div class="progress-wrap">
            <div class="progress-meta"><span>${wordIndex + 1} / ${vocab.length}</span><span>${v.zh}</span></div>
            <div class="progress-bar"><div class="progress-fill" style="width:${((wordIndex + 1) / vocab.length) * 100}%"></div></div>
          </div>
          <div class="flash-card ${flipped ? 'flipped' : ''}" id="flash">
            <div class="flash-inner">
              <div class="flash-face front">
                ${flashSpeakHtml()}
                <div class="flash-chapter">Day ${plan.day}</div>
                <div class="flash-main">${v.en}</div>
                <div class="flash-sub">${tb('tapFlip')}</div>
              </div>
              <div class="flash-face back">
                ${flashSpeakHtml()}
                <div class="flash-chapter">${tb('meaning')}</div>
                <div class="flash-main">${v.zh}</div>
                ${v.tip ? `<div class="flash-tip">${v.tip}</div>` : ''}
              </div>
            </div>
          </div>
          <div class="flash-actions">
            <button class="btn" id="prev" ${wordIndex === 0 ? 'disabled' : ''}>上一张</button>
            <button class="btn btn-primary" id="flip">翻转</button>
            <button class="btn" id="next">${wordIndex >= vocab.length - 1 ? '去小测 →' : '下一张'}</button>
          </div>
        </div>`;
      const flip = () => {
        stopSpeak();
        flipped = !flipped;
        sfxFlip();
        document.getElementById('flash')?.classList.toggle('flipped', flipped);
      };
      const goNext = () => {
        stopSpeak();
        sfxClick();
        if (wordIndex >= vocab.length - 1) {
          buildVocabQuiz();
          step = 2;
          paint();
        } else {
          wordIndex += 1;
          flipped = false;
          paint();
        }
      };
      document.getElementById('flash').onclick = flip;
      document.getElementById('flip').onclick = flip;
      document.getElementById('prev').onclick = () => {
        if (wordIndex > 0) {
          stopSpeak();
          wordIndex -= 1;
          flipped = false;
          paint();
        }
      };
      document.getElementById('next').onclick = goNext;
      bindFlashSpeak({
        getFlipped: () => flipped,
        frontText: v.en,
        backText: v.zh,
        frontLang: 'en-US',
        backLang: 'zh-CN',
      });
      bindFlashKeys({ onFlip: flip, onNext: goNext });
      return;
    }

    if (step === 2) {
      if (vIdx >= vQuiz.length) {
        step = 3;
        qIdx = 0;
        qCorrect = 0;
        locked = false;
        paint();
        return;
      }
      const item = vQuiz[vIdx];
      locked = false;
      app.innerHTML = `
        ${topbar()}
        <div class="screen">
          <div class="screen-header">${backBtn('days')}<h2 class="screen-title">Day ${plan.day} · Word Quiz</h2></div>
          <div class="step-pills"><span>✓ ${tb('words')}</span><span class="on">2 Quiz</span><span>3 ${tb('questions')}</span></div>
          <div class="progress-wrap">
            <div class="progress-meta"><span>${vIdx + 1} / ${vQuiz.length}</span><span>${tb('correctN')} ${vCorrect}</span></div>
            <div class="progress-bar"><div class="progress-fill" style="width:${(vIdx / vQuiz.length) * 100}%"></div></div>
          </div>
          <div class="wg-question">
            <div class="wg-q-meta">Day ${plan.day} · Word Quiz</div>
            <div class="wg-q-text">${bilingualHtml(item.prompt)}</div>
          </div>
          <div class="wg-options">
            ${item.options.map((o, i) => `<button class="wg-opt" data-v="${o}"><span class="shape">${'ABCD'[i]}</span><span>${localizeText(o)}</span></button>`).join('')}
          </div>
          <div id="fb"></div>
          <div class="flash-actions" style="display:none;margin-top:16px" id="nw">
            <button class="btn btn-primary" id="nx">${tb('nextArrow')}</button>
          </div>
        </div>`;
      app.querySelectorAll('.wg-opt').forEach((btn) => {
        btn.onclick = () => {
          if (locked) return;
          locked = true;
          const ok = btn.dataset.v === item.answer;
          app.querySelectorAll('.wg-opt').forEach((b) => {
            b.disabled = true;
            if (b.dataset.v === item.answer) b.classList.add('correct');
            else {
              b.classList.add('dim');
              if (b === btn && !ok) b.classList.add('wrong');
            }
          });
          if (ok) {
            vCorrect += 1;
            addXp(8, true);
            celebrate(true);
            document.getElementById('fb').innerHTML = feedbackOk(item.tip || '');
          } else {
            addXp(0, false);
            celebrate(false);
            document.getElementById('fb').innerHTML = feedbackNo(item.answer, item.tip || '');
            recordWrong({
              id: `day${plan.day}-${item.id}`,
              kind: 'vocab',
              prompt: item.prompt,
              correctText: item.answer,
              explain: item.tip || '',
              subject: plan.subject,
            });
          }
          document.getElementById('nw').style.display = 'flex';
          wireQuizNext(() => {
            vIdx += 1;
            paint();
          });
        };
      });
      return;
    }

    if (step === 3) {
      if (qIdx >= qs.length) {
        step = 4;
        paint();
        return;
      }
      const q = qs[qIdx];
      locked = false;
      app.innerHTML = `
        ${topbar()}
        <div class="screen wg-play">
          <div class="screen-header">${backBtn('days')}<h2 class="screen-title">Day ${plan.day} · Questions</h2></div>
          <div class="step-pills"><span>✓ ${tb('words')}</span><span>✓ Quiz</span><span class="on">3 ${tb('questions')}</span></div>
          <div class="wg-hud">
            <span class="pill">${qIdx + 1} / ${qs.length}</span>
            <span class="pill">🔥 ${store.streak}</span>
            <span class="pill">✓ ${qCorrect}</span>
          </div>
          <div class="progress-wrap">
            <div class="progress-bar"><div class="progress-fill" style="width:${(qIdx / qs.length) * 100}%"></div></div>
          </div>
          <div class="wg-question">
            <div class="wg-q-meta">${q.chapter} · ${q.type === 'mcq' ? 'MCQ' : 'T/F'}</div>
            <div class="wg-q-text">${bilingualHtml(q.prompt)}</div>
          </div>
          ${q.type === 'mcq' ? wgMcqHtml(q.options) : wgTfHtml()}
          <div id="fb"></div>
          <div class="flash-actions" style="display:none;margin-top:16px" id="nw">
            <button class="btn btn-primary" id="nx">${tb('nextArrow')}</button>
          </div>
        </div>`;

      function finish(ok, correctText) {
        const fb = document.getElementById('fb');
        if (ok) {
          qCorrect += 1;
          addXp(10, true);
          celebrate(true);
          fb.innerHTML = feedbackOk(q.explain);
        } else {
          addXp(0, false);
          celebrate(false);
          fb.innerHTML = feedbackNo(correctText, q.explain);
          recordWrong({
            id: q.id,
            kind: 'question',
            prompt: q.prompt,
            correctText,
            explain: q.explain,
            subject: q.subject,
          });
        }
        document.getElementById('nw').style.display = 'flex';
        wireQuizNext(() => {
          qIdx += 1;
          paint();
        });
      }

      app.querySelectorAll('#opts .wg-opt').forEach((btn) => {
        btn.onclick = () => {
          if (locked) return;
          locked = true;
          const opts = [...app.querySelectorAll('#opts .wg-opt')];
          opts.forEach((b) => (b.disabled = true));
          if (q.type === 'mcq') {
            const choice = Number(btn.dataset.i);
            const ok = choice === q.answer;
            opts[q.answer].classList.add('correct');
            opts.forEach((b, i) => {
              if (i !== q.answer) b.classList.add('dim');
            });
            if (!ok) btn.classList.add('wrong');
            finish(ok, q.options[q.answer]);
          } else {
            const choice = btn.dataset.i === 'true';
            const ok = choice === q.answer;
            opts.forEach((b) => {
              if ((b.dataset.i === 'true') === q.answer) b.classList.add('correct');
              else {
                b.classList.add('dim');
                if (b === btn) b.classList.add('wrong');
              }
            });
            finish(ok, q.answer ? 'True' : 'False');
          }
        };
      });
      return;
    }

    // step 4 done
    markDayDone(plan.day);
    const totalQ = vQuiz.length + qs.length;
    const totalOk = vCorrect + qCorrect;
    const pct = totalQ ? Math.round((totalOk / totalQ) * 100) : 100;
    const next = getDay(plan.day + 1);
    app.innerHTML = `
      ${topbar()}
      <div class="screen">
        <div class="screen-header">${backBtn()}<h2 class="screen-title">Day ${plan.day} Done</h2></div>
        <div class="panel results" style="--pct:${pct}">
          <div class="score-ring">${pct}%</div>
          <h3 style="font-family:var(--font-display);margin-bottom:8px">Day ${plan.day} · ${plan.title}</h3>
          <p style="color:#dff2f6;margin-bottom:8px">单词小测 ${vCorrect}/${vQuiz.length} · 题目 ${qCorrect}/${qs.length}</p>
          <p class="result-note ok">✓ ${tb('done')}</p>
          <div class="flash-actions">
            ${next ? `<button class="btn btn-primary" data-start-day="${next.day}">Day ${next.day} →</button>` : ''}
            <button class="btn" data-nav="days">${tb('allDays')}</button>
            <button class="btn" data-nav="home">${tb('home')}</button>
          </div>
        </div>
      </div>`;
    fanfare(tb('great'));
    clearSessionRepaint();
  }

  paint();
}

/* —— FLASHCARDS —— */
async function renderFlash() {
  currentRoute = 'flash';
  await needScience();
  let subject = 'all';
  let list = shuffle(vocabulary.slice());
  let i = 0;
  let flipped = false;

  function current() {
    return list[i % list.length];
  }

  function paint() {
    const v = current();
    const sub = subjects[v.subject];
    app.innerHTML = `
      ${topbar()}
      <div class="screen">
        <div class="screen-header">${backBtn()}<h2 class="screen-title">单词翻转卡</h2></div>
        <div class="filters">${subjectChips(subject)}</div>
        <div class="progress-wrap">
          <div class="progress-meta"><span>${i + 1} / ${list.length}</span><span style="color:${sub.accent}">${sub.name} · ${v.chapter}</span></div>
          <div class="progress-bar"><div class="progress-fill" style="width:${((i + 1) / list.length) * 100}%"></div></div>
        </div>
        <div class="flash-card ${flipped ? 'flipped' : ''}" id="flash">
          <div class="flash-inner">
            <div class="flash-face front">
              ${flashSpeakHtml()}
              <div class="flash-chapter">${v.chapter}</div>
              <div class="flash-main">${v.en}</div>
              <div class="flash-sub">${tb('tapFlip')}</div>
            </div>
            <div class="flash-face back">
              ${flashSpeakHtml()}
              <div class="flash-chapter">${tb('meaning')}</div>
              <div class="flash-main">${v.zh}</div>
              ${v.tip ? `<div class="flash-tip">${v.tip}</div>` : ''}
            </div>
          </div>
        </div>
        <div class="flash-actions">
          <button class="btn" id="prev">上一张</button>
          <button class="btn btn-primary" id="flip">翻转</button>
          <button class="btn" id="next">下一张</button>
          <button class="btn btn-good" id="know">会了 ✓</button>
        </div>
      </div>`;

    const flip = () => {
      stopSpeak();
      flipped = !flipped;
      sfxFlip();
      document.getElementById('flash')?.classList.toggle('flipped', flipped);
    };
    const goNext = () => {
      stopSpeak();
      i = (i + 1) % list.length;
      flipped = false;
      paint();
    };
    document.getElementById('flash').onclick = flip;
    document.getElementById('flip').onclick = flip;
    document.getElementById('next').onclick = goNext;
    document.getElementById('prev').onclick = () => {
      stopSpeak();
      i = (i - 1 + list.length) % list.length;
      flipped = false;
      paint();
    };
    document.getElementById('know').onclick = (e) => {
      stopSpeak();
      addXp(5, true, { countStreak: false });
      fanfare(tb('correctBanner'));
      burst(e.clientX, e.clientY);
      goNext();
    };

    app.querySelectorAll('[data-sub]').forEach((btn) => {
      btn.onclick = () => {
        stopSpeak();
        subject = btn.dataset.sub;
        list = shuffle(
          vocabulary.filter((v) => subject === 'all' || v.subject === subject)
        );
        i = 0;
        flipped = false;
        paint();
      };
    });
    bindFlashSpeak({
      getFlipped: () => flipped,
      frontText: v.en,
      backText: v.zh,
      frontLang: 'en-US',
      backLang: 'zh-CN',
    });
    bindFlashKeys({ onFlip: flip, onNext: goNext });
    bindNav();
  }

  paint();
}

/* —— MATCH —— */
async function renderMatch() {
  currentRoute = 'match';
  await needScience();
  let subject = 'all';

  function deal() {
    const pool = shuffle(
      vocabulary.filter((v) => subject === 'all' || v.subject === subject)
    ).slice(0, 6);
    const left = shuffle(pool.map((v) => ({ id: v.id, text: v.en, side: 'en' })));
    const right = shuffle(pool.map((v) => ({ id: v.id, text: v.zh, side: 'zh' })));
    let selected = null;
    let matched = 0;

    app.innerHTML = `
      ${topbar()}
      <div class="screen">
        <div class="screen-header">${backBtn()}<h2 class="screen-title">英汉配对</h2>
          <button class="btn" id="redeal">换一组</button>
        </div>
        <div class="filters">${subjectChips(subject)}</div>
        <div class="panel">
          <div class="progress-meta" style="margin-bottom:14px"><span>已配对 <strong id="mcount">0</strong> / 6</span><span>选中两侧相同含义</span></div>
          <div class="match-grid">
            <div class="match-col" id="left">${left.map((x) => `<button class="match-item" data-id="${x.id}" data-side="en">${x.text}</button>`).join('')}</div>
            <div class="match-col" id="right">${right.map((x) => `<button class="match-item" data-id="${x.id}" data-side="zh">${x.text}</button>`).join('')}</div>
          </div>
        </div>
      </div>`;

    function onPick(btn) {
      if (btn.classList.contains('matched')) return;
      if (!selected) {
        app.querySelectorAll('.match-item.selected').forEach((b) => b.classList.remove('selected'));
        btn.classList.add('selected');
        selected = btn;
        return;
      }
      if (selected === btn) {
        btn.classList.remove('selected');
        selected = null;
        return;
      }
      if (selected.dataset.side === btn.dataset.side) {
        selected.classList.remove('selected');
        btn.classList.add('selected');
        selected = btn;
        return;
      }
      const a = selected;
      const b = btn;
      if (a.dataset.id === b.dataset.id) {
        a.classList.add('matched');
        b.classList.add('matched');
        a.classList.remove('selected');
        matched += 1;
        document.getElementById('mcount').textContent = matched;
        addXp(8, true);
        celebrate(true);
        selected = null;
        if (matched === 6) {
          setTimeout(() => {
            sfxMatch();
            floatText(window.innerWidth / 2, window.innerHeight * 0.35, '全部配对!', '#ffb86b');
            setTimeout(deal, 700);
          }, 400);
        }
      } else {
        a.classList.add('bad');
        b.classList.add('bad');
        addXp(0, false);
        celebrate(false);
        setTimeout(() => {
          a.classList.remove('bad', 'selected');
          b.classList.remove('bad');
        }, 400);
        selected = null;
      }
    }

    app.querySelectorAll('.match-item').forEach((btn) => {
      btn.onclick = () => onPick(btn);
    });
    document.getElementById('redeal').onclick = deal;
    app.querySelectorAll('[data-sub]').forEach((btn) => {
      btn.onclick = () => {
        subject = btn.dataset.sub;
        deal();
      };
    });
    bindNav();
  }

  deal();
}

/* —— QUIZ (mcq / tf / mixed) —— */
async function renderQuiz(mode) {
  await needScience();
  currentRoute = mode === 'mcq' ? 'mcq' : mode === 'tf' ? 'tf' : 'mixed';
  let subject = ['physics', 'chemistry', 'biology'].includes(store.activeHub) ? store.activeHub : 'all';
  const type = mode === 'mcq' ? 'mcq' : mode === 'tf' ? 'tf' : 'all';
  const title =
    mode === 'mcq' ? tb('mcq') : mode === 'tf' ? tb('tf') : tb('moreModes');
  let queue = [];
  let idx = 0;
  let correctCount = 0;
  let answered = false;
  const wrongs = [];

  function rebuild() {
    queue = filterQuestions({
      subject,
      type,
      limit: mode === 'mixed' ? 30 : 28,
      level: quizLevel === 'core' ? 'core' : 'all',
    });
    idx = 0;
    correctCount = 0;
    wrongs.length = 0;
    answered = false;
    paint();
  }

  function paint() {
    setSessionRepaint(paint);
    if (idx >= queue.length) {
      const pct = Math.round((correctCount / queue.length) * 100);
      clearSessionRepaint();
      fanfare(pct >= 80 ? tb('great') : tb('results'));
      app.innerHTML = `
        ${topbar()}
        <div class="screen">
          <div class="screen-header">${backBtn(scienceBackTarget())}<h2 class="screen-title">${title} · ${tb('results')}</h2></div>
          <div class="panel results" style="--pct:${pct}">
            <div class="score-ring">${pct}%</div>
            <h3 class="result-title">${correctCount} / ${queue.length} ${tb('correctN')}</h3>
            <p class="section-hint" style="margin-bottom:18px">${pct >= 80 ? tb('great') : pct >= 60 ? tb('okish') : tb('keepGoing')}</p>
            <div class="flash-actions">
              <button class="btn btn-primary" id="again">${tb('again')}</button>
              <button class="btn" data-nav="wrong">${tb('wrongBook')}</button>
              <button class="btn" data-nav="home">${tb('home')}</button>
            </div>
            ${
              wrongs.length
                ? `<div class="wrong-list">${wrongs
                    .map(
                      (w) => `<div class="wrong-item"><div>${w.prompt}</div><div class="ans">✓ ${w.correctText}</div><div style="color:var(--muted);margin-top:4px;font-size:0.85rem">${w.explain}</div></div>`
                    )
                    .join('')}</div>`
                : ''
            }
          </div>
        </div>`;
      document.getElementById('again').onclick = rebuild;
      bindNav();
      if (pct >= 80) burst(window.innerWidth / 2, window.innerHeight * 0.3, '#f0a35e');
      return;
    }

    const q = queue[idx];
    answered = false;
    clearFlashKeys();

    app.innerHTML = wgPlayShell({
      title,
      meta: `${subjectName(q.subject)} · ${q.chapter}${q.level === 'stretch' ? ` · ${tb('stretchTag')}` : ''}`,
      progressLabel: `${idx + 1} / ${queue.length}`,
      rightLabel: `✓ ${correctCount}`,
      pct: (idx / queue.length) * 100,
      questionHtml: q.prompt,
      optsHtml: q.type === 'mcq' ? wgMcqHtml(q.options) : wgTfHtml(),
    });

    const screen = app.querySelector('.screen');
    if (screen) {
      const f = document.createElement('div');
      f.className = 'filters';
      f.innerHTML = subjectChips(subject) + levelChips();
      screen.insertBefore(f, screen.querySelector('.wg-hud'));
      f.querySelectorAll('[data-sub]').forEach((btn) => {
        btn.onclick = () => {
          subject = btn.dataset.sub;
          rebuild();
        };
      });
    }

    function finish(ok, correctText) {
      if (answered) return;
      answered = true;
      const fb = document.getElementById('fb');
      if (ok) {
        correctCount += 1;
        addXp(10, true);
        celebrate(true);
        fb.innerHTML = feedbackOk(q.explain);
        clearWrong(q.id);
      } else {
        addXp(0, false);
        celebrate(false);
        fb.innerHTML = feedbackNo(correctText, q.explain);
        wrongs.push({ prompt: q.prompt, correctText, explain: q.explain });
        recordWrong({
          id: q.id,
          kind: 'question',
          prompt: q.prompt,
          correctText,
          explain: q.explain,
          subject: q.subject,
        });
      }
      document.getElementById('nextwrap').style.display = 'flex';
      wireQuizNext(() => {
        idx += 1;
        paint();
      });
    }

    app.querySelectorAll('#opts .wg-opt').forEach((btn) => {
      btn.onclick = () => {
        if (answered) return;
        const opts = [...app.querySelectorAll('#opts .wg-opt')];
        opts.forEach((b) => (b.disabled = true));

        if (q.type === 'mcq') {
          const choice = Number(btn.dataset.i);
          const ok = choice === q.answer;
          opts[q.answer].classList.add('correct');
          opts.forEach((b, i) => {
            if (i !== q.answer) b.classList.add('dim');
          });
          if (!ok) btn.classList.add('wrong');
          finish(ok, q.options[q.answer]);
        } else {
          const choice = btn.dataset.i === 'true';
          const ok = choice === q.answer;
          opts.forEach((b) => {
            const val = b.dataset.i === 'true';
            if (val === q.answer) b.classList.add('correct');
            else {
              b.classList.add('dim');
              if (b === btn) b.classList.add('wrong');
            }
          });
          finish(ok, q.answer ? tb('trueOpt') : tb('falseOpt'));
        }
      };
    });
    bindNav();
  }

  rebuild();
}

/* —— PERIODIC —— */
async function renderPeriodic() {
  currentRoute = 'periodic';
  await needScience();
  let mode = 'browse'; // browse | quiz
  let quizIdx = 0;
  let quizList = [];
  let quizCorrect = 0;
  let quizAnswered = false;

  function startQuiz() {
    quizList = shuffle(coreElements.slice()).slice(0, 10);
    quizIdx = 0;
    quizCorrect = 0;
    quizAnswered = false;
    mode = 'quiz';
    paint();
  }

  function paint() {
    if (mode === 'browse') {
      const grid = buildPeriodicGrid();
      const cells = grid.cells || grid;
      const lanthanides = grid.lanthanides || [];
      const actinides = grid.actinides || [];
      const maxPeriod = grid.maxPeriod || 7;
      const cellHtml = (e) =>
        `<button class="el-cell ${e.category}" data-z="${e.z}" title="${e.en}">
            <div class="el-z">${e.z}</div>
            <div class="el-sym">${e.symbol}</div>
            <div class="el-name">${e.zh}</div>
            <div class="el-ar">${e.ar}</div>
          </button>`;
      const headers = GROUP_LABELS.map(
        (g, i) =>
          `<div class="pt-group-h" style="grid-column:${i + 2};grid-row:1"><span class="cn">${g.cn}</span>${g.iupac}<span class="note">${g.note}</span></div>`
      ).join('');
      const body = cells
        .map((c) => {
          const col = c.group + 1;
          const row = c.period + 1;
          if (!c.element) {
            return `<div class="el-cell empty" style="grid-column:${col};grid-row:${row}"></div>`;
          }
          const e = c.element;
          return `<button class="el-cell ${e.category}" data-z="${e.z}" style="grid-column:${col};grid-row:${row}" title="${e.en}">
            <div class="el-z">${e.z}</div>
            <div class="el-sym">${e.symbol}</div>
            <div class="el-name">${e.zh}</div>
            <div class="el-ar">${e.ar}</div>
          </button>`;
        })
        .join('');
      const periodHeads = Array.from({ length: maxPeriod }, (_, i) => i + 1)
        .map((p) => `<div class="pt-period-h" style="grid-column:1;grid-row:${p + 1}">${p}</div>`)
        .join('');
      const fBlock = `
            <div class="ptable-fblock">
              <div class="pt-f-label">镧系</div>
              <div class="pt-f-row">${lanthanides.map(cellHtml).join('')}</div>
              <div class="pt-f-label">锕系</div>
              <div class="pt-f-row">${actinides.map(cellHtml).join('')}</div>
            </div>`;

      app.innerHTML = `
        ${topbar()}
        <div class="screen">
          <div class="screen-header">${backBtn()}<h2 class="screen-title">元素周期表</h2>
            <button class="btn btn-primary" id="startq">开始${tb('periodic')}</button>
          </div>
          <p style="color:#dff2f6;margin-bottom:10px;font-size:0.92rem">标准 18 列长式周期表（Z=1–118）· 上方为中国中学常用主族/副族标注 · 点击元素查看详情</p>
          <div class="pt-legend">
            <span><i style="background:rgba(255,184,107,0.7)"></i>金属</span>
            <span><i style="background:rgba(255,160,120,0.7)"></i>过渡/副族</span>
            <span><i style="background:rgba(94,231,231,0.7)"></i>非金属</span>
            <span><i style="background:rgba(125,255,176,0.7)"></i>类金属</span>
            <span><i style="background:rgba(180,160,255,0.7)"></i>稀有气体</span>
            <span><i style="background:rgba(244,114,182,0.7)"></i>镧系</span>
            <span><i style="background:rgba(167,139,250,0.7)"></i>锕系</span>
          </div>
          <div class="panel">
            <div class="ptable-scroll">
              <div class="ptable-official">
                <div class="pt-corner"></div>
                ${headers}
                ${periodHeads}
                ${body}
              </div>
              ${fBlock}
            </div>
            <div class="el-detail" id="detail"></div>
          </div>
        </div>`;

      document.getElementById('startq').onclick = () => {
        sfxClick();
        startQuiz();
      };
      const showDetail = (btn) => {
        sfxClick();
        const e = elements.find((x) => x.z === Number(btn.dataset.z));
        if (!e) return;
        const d = document.getElementById('detail');
        d.classList.add('show');
        const catMap = {
          metal: '金属 metal',
          nonmetal: '非金属 non-metal',
          metalloid: '类金属 metalloid',
          noble: '稀有气体 noble gas',
          transition: '过渡元素 / 副族 transition',
          lanthanide: '镧系 lanthanide',
          actinide: '锕系 actinide',
        };
        const family =
          e.category === 'lanthanide' || e.category === 'actinide'
            ? e.category === 'lanthanide'
              ? '镧系'
              : '锕系'
            : e.group <= 2 || e.group >= 13
              ? '主族'
              : '副族';
        d.innerHTML = `
            <div style="font-family:var(--font-display);font-size:1.6rem;margin-bottom:6px;color:#fff">${e.symbol} · ${e.zh} · ${e.en}</div>
            <div style="color:#e4f4f8;line-height:1.7">
              原子序数 Z = <strong style="color:#fff">${e.z}</strong><br>
              相对原子质量 Ar ≈ <strong style="color:var(--accent-2)">${e.ar}</strong><br>
              周期 Period ${e.period} · IUPAC 族 Group ${e.group} · 中学标注 <strong style="color:var(--accent)">${e.groupCn}</strong>（${family}）<br>
              类别：${catMap[e.category] || e.category}
            </div>`;
      };
      app.querySelectorAll('.el-cell:not(.empty)').forEach((btn) => {
        btn.onclick = () => showDetail(btn);
      });
      bindNav();
      return;
    }

    // quiz modes rotate: symbol→zh, zh→symbol, ar
    if (quizIdx >= quizList.length) {
      const pct = Math.round((quizCorrect / quizList.length) * 100);
      app.innerHTML = `
        ${topbar()}
        <div class="screen">
          <div class="screen-header">${backBtn()}<h2 class="screen-title">${tb('periodic')} · ${tb('results')}</h2></div>
          <div class="panel results" style="--pct:${pct}">
            <div class="score-ring">${pct}%</div>
            <h3 style="font-family:var(--font-display);margin-bottom:12px">${quizCorrect}/${quizList.length}</h3>
            <div class="flash-actions">
              <button class="btn btn-primary" id="again">${tb('again')}</button>
              <button class="btn" id="browse">${tb('back')}</button>
            </div>
          </div>
        </div>`;
      document.getElementById('again').onclick = startQuiz;
      document.getElementById('browse').onclick = () => {
        mode = 'browse';
        paint();
      };
      bindNav();
      return;
    }

    const e = quizList[quizIdx];
    quizAnswered = false;
    clearFlashKeys();
    const kind = quizIdx % 3; // 0 symbol->zh, 1 zh->symbol, 2 ar
    let prompt, answer, options;

    if (kind === 0) {
      prompt = `元素符号 <span style="color:var(--accent)">${e.symbol}</span> 的中文名是？`;
      answer = e.zh;
      options = shuffle([
        e.zh,
        ...shuffle(coreElements.filter((x) => x.symbol !== e.symbol))
          .slice(0, 3)
          .map((x) => x.zh),
      ]);
    } else if (kind === 1) {
      prompt = `「${e.zh}」的元素符号是？ / Symbol for <em>${e.en}</em>?`;
      answer = e.symbol;
      options = shuffle([
        e.symbol,
        ...shuffle(coreElements.filter((x) => x.symbol !== e.symbol))
          .slice(0, 3)
          .map((x) => x.symbol),
      ]);
    } else {
      prompt = `<span style="color:var(--accent)">${e.symbol}</span>（${e.zh}）的相对原子质量 Ar 约为？`;
      answer = String(e.ar);
      const distractors = shuffle(
        coreElements.filter((x) => x.ar !== e.ar).map((x) => String(x.ar))
      ).slice(0, 3);
      options = shuffle([String(e.ar), ...distractors]);
    }

    app.innerHTML = `
      ${topbar()}
      <div class="screen">
        <div class="screen-header">${backBtn()}<h2 class="screen-title">${tb('periodic')}</h2></div>
        <div class="progress-wrap">
          <div class="progress-meta"><span>${quizIdx + 1} / ${quizList.length}</span><span>${tb('correctN')} ${quizCorrect}</span></div>
          <div class="progress-bar"><div class="progress-fill" style="width:${(quizIdx / quizList.length) * 100}%"></div></div>
        </div>
        <div class="panel">
          <div class="quiz-prompt">${prompt}</div>
          <div class="options" id="opts">
            ${options.map((o, i) => `<button class="option" data-v="${o}"><span class="key">${'ABCD'[i]}</span><span>${o}</span></button>`).join('')}
          </div>
          <div id="fb"></div>
          <div class="flash-actions" style="display:none;margin-top:16px" id="nw">
            <button class="btn btn-primary" id="nx">${tb('nextArrow')}</button>
          </div>
        </div>
      </div>`;

    quizAnswered = false;
    app.querySelectorAll('.option').forEach((btn) => {
      btn.onclick = () => {
        if (quizAnswered) return;
        quizAnswered = true;
        const ok = btn.dataset.v === answer;
        app.querySelectorAll('.option').forEach((b) => {
          b.disabled = true;
          if (b.dataset.v === answer) b.classList.add('correct');
          else if (b === btn && !ok) b.classList.add('wrong');
        });
        const fb = document.getElementById('fb');
        if (ok) {
          quizCorrect += 1;
          addXp(10, true);
          celebrate(true);
          fb.innerHTML = `<div class="feedback ok"><strong>${tb('correctBanner')}</strong>${e.symbol} = ${e.zh} (${e.en})，Ar ≈ ${e.ar}</div>`;
        } else {
          addXp(0, false);
          celebrate(false);
          fb.innerHTML = `<div class="feedback no"><strong>${tb('incorrectBanner')}</strong>${tb('answerLabel')}${answer}<br>${e.symbol} · ${e.zh} · ${e.en} · Ar ≈ ${e.ar}</div>`;
          recordWrong({
            id: `el-${e.symbol}-${kind}`,
            kind: 'element',
            prompt,
            correctText: `${e.symbol} / ${e.zh} / Ar≈${e.ar}`,
            explain: `${e.en}`,
            subject: 'chemistry',
          });
        }
        document.getElementById('nw').style.display = 'flex';
        wireQuizNext(() => {
          quizIdx += 1;
          paint();
        });
      };
    });
    bindNav();
  }

  paint();
}

/* —— MASS DRILL —— */
async function renderMass() {
  await needScience();
  let tab = 'ar'; // ar | mr

  function paint() {
    app.innerHTML = `
      ${topbar()}
      <div class="screen">
        <div class="screen-header">${backBtn()}<h2 class="screen-title">相对原子质量特训</h2></div>
        <div class="filters">
          <button class="chip ${tab === 'ar' ? 'active' : ''}" data-tab="ar">背 Ar</button>
          <button class="chip ${tab === 'mr' ? 'active' : ''}" data-tab="mr">算 Mr</button>
          <button class="chip" id="quiz">开始测验</button>
        </div>
        <div class="panel" id="body"></div>
      </div>`;

    const body = document.getElementById('body');
    if (tab === 'ar') {
      body.innerHTML = `
        <p style="color:var(--muted);margin-bottom:14px">中学常用相对原子质量（近似值），务必记牢核心元素。</p>
        <div class="ptable">
          ${coreElements
            .map(
              (e) => `<div class="el-cell ${e.category}">
                <div class="el-z">${e.symbol}</div>
                <div class="el-sym">${e.ar}</div>
                <div class="el-name">${e.zh}</div>
                <div class="el-ar">${e.en}</div>
              </div>`
            )
            .join('')}
        </div>
        <div class="el-detail show" style="margin-top:16px">
          <strong>记忆口诀提示</strong><br>
          H=1 · C=12 · N=14 · O=16 · Na=23 · Mg=24 · Al=27 · Si=28 · S=32 · Cl=35.5 · K=39 · Ca=40 · Fe=56 · Cu=64 · Zn=65 · Ag=108
        </div>`;
    } else {
      body.innerHTML = `
        <p style="color:var(--muted);margin-bottom:14px">相对分子质量 Mr = 各原子相对原子质量之和</p>
        <div class="options">
          ${compounds
            .map(
              (c) => `<div class="option" style="cursor:default">
                <span class="key" style="width:auto;padding:0 8px;font-family:var(--font-display)">${c.formula}</span>
                <span><strong>${c.zh}</strong> · ${c.en}<br><span style="color:var(--accent-2)">Mr = ${c.mr}</span></span>
              </div>`
            )
            .join('')}
        </div>`;
    }

    app.querySelectorAll('[data-tab]').forEach((b) => {
      b.onclick = () => {
        tab = b.dataset.tab;
        paint();
      };
    });
    document.getElementById('quiz').onclick = massQuiz;
    bindNav();
  }

  function massQuiz() {
    const list = shuffle([
      ...coreElements.slice(0, 12).map((e) => ({
        kind: 'ar',
        prompt: `${e.symbol}（${e.zh}）的相对原子质量 Ar ≈ ?`,
        answer: String(e.ar),
        options: shuffle([
          String(e.ar),
          ...shuffle(coreElements.filter((x) => x.ar !== e.ar))
            .slice(0, 3)
            .map((x) => String(x.ar)),
        ]),
        explain: `${e.symbol} = ${e.zh} = ${e.en}`,
        id: `ar-${e.symbol}`,
      })),
      ...shuffle(compounds)
        .slice(0, 6)
        .map((c) => ({
          kind: 'mr',
          prompt: `${c.formula}（${c.zh}）的相对分子质量 Mr = ?`,
          answer: String(c.mr),
          options: shuffle([
            String(c.mr),
            ...shuffle(compounds.filter((x) => x.mr !== c.mr))
              .slice(0, 3)
              .map((x) => String(x.mr)),
          ]),
          explain: `${c.formula} · ${c.en}`,
          id: `mr-${c.formula}`,
        })),
    ]).slice(0, 10);

    let i = 0;
    let okCount = 0;

    function show() {
      if (i >= list.length) {
        const pct = Math.round((okCount / list.length) * 100);
        app.innerHTML = `
          ${topbar()}
          <div class="screen">
            <div class="screen-header">${backBtn()}<h2 class="screen-title">Ar / Mr · ${tb('results')}</h2></div>
            <div class="panel results" style="--pct:${pct}">
              <div class="score-ring">${pct}%</div>
              <p style="margin-bottom:16px">${okCount}/${list.length} ${tb('correctN')}</p>
              <div class="flash-actions">
                <button class="btn btn-primary" id="again">${tb('again')}</button>
                <button class="btn" id="backm">${tb('back')}</button>
              </div>
            </div>
          </div>`;
        document.getElementById('again').onclick = massQuiz;
        document.getElementById('backm').onclick = paint;
        bindNav();
        return;
      }

      const q = list[i];
      let locked = false;
      clearFlashKeys();
      app.innerHTML = `
        ${topbar()}
        <div class="screen">
          <div class="screen-header">${backBtn()}<h2 class="screen-title">Ar / Mr 测验</h2></div>
          <div class="progress-wrap">
            <div class="progress-meta"><span>${i + 1}/${list.length}</span><span>${tb('correctN')} ${okCount}</span></div>
            <div class="progress-bar"><div class="progress-fill" style="width:${(i / list.length) * 100}%"></div></div>
          </div>
          <div class="panel">
            <div class="quiz-prompt">${q.prompt}</div>
            <div class="options">
              ${q.options.map((o, idx) => `<button class="option" data-v="${o}"><span class="key">${'ABCD'[idx]}</span><span>${o}</span></button>`).join('')}
            </div>
            <div id="fb"></div>
            <div class="flash-actions" style="display:none;margin-top:16px" id="nw">
              <button class="btn btn-primary" id="nx">${tb('nextArrow')}</button>
            </div>
          </div>
        </div>`;

      app.querySelectorAll('.option').forEach((btn) => {
        btn.onclick = () => {
          if (locked) return;
          locked = true;
          const good = btn.dataset.v === q.answer;
          app.querySelectorAll('.option').forEach((b) => {
            b.disabled = true;
            if (b.dataset.v === q.answer) b.classList.add('correct');
            else if (b === btn && !good) b.classList.add('wrong');
          });
          if (good) {
            okCount += 1;
            addXp(10, true);
            celebrate(true);
            document.getElementById('fb').innerHTML = `<div class="feedback ok"><strong>${tb('correctBanner')}</strong>${q.explain}</div>`;
          } else {
            addXp(0, false);
            celebrate(false);
            document.getElementById('fb').innerHTML = `<div class="feedback no"><strong>${tb('incorrectBanner')}</strong>${tb('answerLabel')}${q.answer}<br>${q.explain}</div>`;
            recordWrong({
              id: q.id,
              kind: 'mass',
              prompt: q.prompt,
              correctText: q.answer,
              explain: q.explain,
              subject: 'chemistry',
            });
          }
          document.getElementById('nw').style.display = 'flex';
          wireQuizNext(() => {
            i += 1;
            show();
          });
        };
      });
      bindNav();
    }

    show();
  }

  paint();
}

/* —— WRONG BOOK —— */
function renderWrong(filter = 'all') {
  currentRoute = 'wrong';
  const subjects = ['all', 'english', 'chinese', 'math', 'physics', 'chemistry', 'biology'];
  const list = store.wrong.filter((w) => filter === 'all' || w.subject === filter);
  app.innerHTML = `
    ${topbar()}
    <div class="screen">
      <div class="screen-header">${backBtn('home')}<h2 class="screen-title">${tb('wrongBook')}</h2>
        ${store.wrong.length ? `<button class="btn" id="clearall">${tb('clearWrong')}</button>` : ''}
      </div>
      <p class="days-intro">${tb('retestHint')}</p>
      <div class="chip-row" id="wrong-filters">
        ${subjects
          .map(
            (s) =>
              `<button class="chip ${filter === s ? 'active' : ''}" data-wrong-filter="${s}">${s === 'all' ? tb('all') : subjectName(s)}</button>`
          )
          .join('')}
      </div>
      ${
        list.length
          ? `<div class="flash-actions" style="margin-bottom:12px">
              <button class="btn btn-primary" data-nav="wrong-quiz" data-wrong-sub="${filter}">${tb('retest')}</button>
            </div>`
          : ''
      }
      <div class="panel">
        ${
          list.length === 0
            ? `<div class="empty">${tb('emptyWrong')}</div>`
            : `<div class="wrong-list">${list
                .map((w) => {
                  const need = Math.max(0, 2 - (Number(w.winStreak) || 0));
                  return `<div class="wrong-item">
                    <div style="font-size:0.75rem;color:var(--muted);margin-bottom:4px">${escapeHtml(w.subject || '')} · ${escapeHtml(w.kind || '')}</div>
                    <div>${escapeHtml(String(w.prompt || '').replace(/\n/g, ' '))}</div>
                    <div class="ans">✓ ${escapeHtml(w.correctText || w.answer || '')}</div>
                    <div style="color:var(--muted);margin-top:4px;font-size:0.85rem">${tb('winNeed', { n: need })}</div>
                    <button class="btn" style="margin-top:8px" data-rm="${escapeHtml(w.id)}">${tb('masteredRemove')}</button>
                  </div>`;
                })
                .join('')}</div>`
        }
      </div>
    </div>`;

  app.querySelectorAll('[data-wrong-filter]').forEach((btn) => {
    btn.onclick = () => {
      sfxClick();
      renderWrong(btn.getAttribute('data-wrong-filter') || 'all');
    };
  });
  app.querySelectorAll('[data-rm]').forEach((btn) => {
    btn.onclick = () => {
      clearWrong(btn.dataset.rm);
      renderWrong(filter);
    };
  });
  const clear = document.getElementById('clearall');
  if (clear) {
    clear.onclick = () => {
      clearAllWrong();
      renderWrong(filter);
    };
  }
}

function extraWrongDistractors(w, answer) {
  const out = [];
  const sub = w.subject || '';
  if (sub === 'english') {
    for (const x of ieltsWords) {
      if (x.word && x.word !== answer) out.push(x.word);
    }
    for (const bookWords of Object.values(packs.hsWords || {})) {
      for (const x of bookWords || []) {
        if (x.word && x.word !== answer) out.push(x.word);
      }
    }
  } else if (['physics', 'chemistry', 'biology'].includes(sub)) {
    for (const x of vocabulary) {
      if (x.subject === sub && x.en && x.en !== answer) out.push(x.en);
    }
  }
  return out;
}

function wrongQuizItems(filter = 'all') {
  const list = store.wrong.filter((w) => filter === 'all' || w.subject === filter);
  return shuffle(list).slice(0, 20).map((w) => {
    const answer = w.correctText || w.answer || '';
    const sameSubject = store.wrong
      .filter(
        (x) =>
          x.id !== w.id &&
          (!w.subject || x.subject === w.subject) &&
          (x.correctText || x.answer) &&
          (x.correctText || x.answer) !== answer
      )
      .map((x) => x.correctText || x.answer);
    const others = [...sameSubject, ...extraWrongDistractors(w, answer)];
    const distractors = shuffle([...new Set(others)]).slice(0, 3);
    while (distractors.length < 3) distractors.push('—');
    let prompt = String(w.prompt || '');
    if (promptContainsAnswer(prompt, answer)) {
      prompt = prompt.replace(new RegExp(escapeRegExp(answer), 'ig'), '____');
    }
    return {
      id: w.id,
      prompt: prompt || tb('spotHint'),
      answer,
      options: shuffle([answer, ...distractors]),
      tip: w.explain || '',
      wrongId: w.id,
    };
  });
}

function runMcqDrill({ title, back, items, onDone, onAnswer }) {
  let idx = 0;
  let correct = 0;
  let locked = false;

  function paint() {
    setSessionRepaint(paint);
    if (idx >= items.length) {
      const pct = Math.round((correct / Math.max(1, items.length)) * 100);
      onDone?.({ correct, total: items.length, pct });
      return;
    }
    const item = items[idx];
    locked = false;
    clearFlashKeys();
    app.innerHTML = `
      ${topbar()}
      <div class="screen wg-play">
        <div class="screen-header">${backBtn(back)}<h2 class="screen-title">${title}</h2></div>
        <div class="wg-hud">
          <span class="pill">${idx + 1}/${items.length}</span>
          <span class="pill">✓ ${correct}</span>
        </div>
        <div class="wg-question">
          <div class="wg-q-meta">${tb('spotHint')}</div>
          <div class="wg-q-text">${localizeHtml(item.prompt)}</div>
        </div>
        <div class="wg-options">
          ${(item.options || [])
            .map((o, i) => `<button class="wg-opt" data-v="${escapeHtml(o)}"><span class="shape">${'ABCD'[i]}</span><span>${escapeHtml(o)}</span></button>`)
            .join('')}
        </div>
        <div id="fb"></div>
        <div class="flash-actions" style="margin-top:14px;display:none" id="nw">
          <button class="btn btn-primary" id="nx">${tb('nextArrow')}</button>
        </div>
      </div>`;
    app.querySelectorAll('.wg-opt').forEach((btn) => {
      btn.onclick = () => {
        if (locked) return;
        locked = true;
        const ok = btn.dataset.v === item.answer;
        app.querySelectorAll('.wg-opt').forEach((b) => {
          b.disabled = true;
          if (b.dataset.v === item.answer) b.classList.add('correct');
          else {
            b.classList.add('dim');
            if (b === btn && !ok) b.classList.add('wrong');
          }
        });
        onAnswer?.(item, ok);
        if (ok) {
          correct += 1;
          addXp(8, true);
          celebrate(true);
          document.getElementById('fb').innerHTML = feedbackOk(item.tip || '');
        } else {
          addXp(0, false);
          celebrate(false);
          document.getElementById('fb').innerHTML = feedbackNo(item.answer, item.tip || '');
        }
        document.getElementById('nw').style.display = 'flex';
        wireQuizNext(() => {
          idx += 1;
          paint();
        });
      };
    });
  }

  paint();
}

function renderWrongQuiz(subject = 'all') {
  currentRoute = 'wrong-quiz';
  const items = wrongQuizItems(subject);
  if (!items.length) {
    renderWrong(subject);
    return;
  }
  runMcqDrill({
    title: tb('retest'),
    back: 'wrong',
    items,
    onAnswer(item, ok) {
      noteWrongResult(item.wrongId, ok);
    },
    onDone({ correct, total, pct }) {
      clearSessionRepaint();
      app.innerHTML = `
        ${topbar()}
        <div class="screen">
          <div class="screen-header">${backBtn('wrong')}<h2 class="screen-title">${tb('results')}</h2></div>
          <div class="panel results" style="--pct:${pct}">
            <div class="score-ring">${pct}%</div>
            <h3>${correct}/${total}</h3>
            <p>${tb('retestHint')}</p>
            <div class="flash-actions">
              <button class="btn btn-primary" data-nav="wrong">${tb('wrongBook')}</button>
              <button class="btn" data-nav="home">${tb('home')}</button>
            </div>
          </div>
        </div>`;
    },
  });
}

async function renderIeltsWordDrill(mode) {
  await needIelts();
  currentRoute = `ielts-${mode}`;
  const bank = ieltsWords;
  const sample = shuffle(bank.slice()).slice(0, 25);
  return startEnglishWordMode(mode, sample, bank, { back: 'hub-english', srsKind: 'ielts' });
}

async function renderSrsReview() {
  currentRoute = 'srs';
  const due = dueEntries(store.srs).slice(0, 25);
  if (!due.length) {
    renderHome();
    return;
  }
  const hsBookIds = new Set();
  let needIeltsPack = false;
  for (const [key] of due) {
    if (key.startsWith('ielts:')) needIeltsPack = true;
    if (key.startsWith('hs:')) {
      const id = key.slice(3);
      const bookId = String(id.split('-')[0] || '');
      if (bookId) hsBookIds.add(bookId);
    }
  }
  if (needIeltsPack) await needIelts();
  await Promise.all([...hsBookIds].map((id) => needHsBook(id)));
  const hsPool = [];
  for (const id of hsBookIds) hsPool.push(...(packs.hsWords[id] || []));
  const ieltsById = new Map(ieltsWords.map((w) => [w.id, w]));
  const hsById = new Map(hsPool.map((w) => [w.id, w]));
  const items = [];
  for (const [key] of due) {
    const [kind, ...rest] = key.split(':');
    const id = rest.join(':');
    if (kind === 'ielts') {
      const w = ieltsById.get(id);
      if (w) {
        const item = makeEnWordSpotItem(w, ieltsWords, { preferEnDef: false });
        item.srsKind = 'ielts';
        items.push(item);
      }
    } else if (kind === 'hs') {
      const w = hsById.get(id);
      if (w) {
        const item = makeEnWordSpotItem(w, hsPool.length ? hsPool : [w], { preferEnDef: false });
        item.srsKind = 'hs';
        items.push(item);
      }
    }
  }
  if (!items.length) {
    renderHome();
    return;
  }
  runMcqDrill({
    title: tb('todayReview'),
    back: 'home',
    items: items.slice(0, 25),
    onAnswer(item, ok) {
      rememberSrs(item.srsKind || 'ielts', item.id, ok);
    },
    onDone({ correct, total, pct }) {
      paintSimpleResults(pct, correct, total, 'srs', 'home');
    },
  });
}

function paintSimpleResults(pct, correct, total, againNav, backNav) {
  clearSessionRepaint();
  app.innerHTML = `
    ${topbar()}
    <div class="screen">
      <div class="screen-header">${backBtn(backNav)}<h2 class="screen-title">${tb('results')}</h2></div>
      <div class="panel results" style="--pct:${pct}">
        <div class="score-ring">${pct}%</div>
        <h3>${correct}/${total}</h3>
        <div class="flash-actions">
          <button class="btn btn-primary" data-nav="${againNav}">${tb('again')}</button>
          <button class="btn" data-nav="${backNav}">${tb('home')}</button>
        </div>
      </div>
    </div>`;
}

function runDictationDrill({ title, back, items, srsKind, words, bank }) {
  let idx = 0;
  let correct = 0;
  let locked = false;

  function paint() {
    setSessionRepaint(paint);
    if (idx >= items.length) {
      const pct = Math.round((correct / Math.max(1, items.length)) * 100);
      if (words && bank) paintModeResults(pct, correct, items.length, words, bank, { back, srsKind });
      else paintSimpleResults(pct, correct, items.length, currentRoute, back);
      return;
    }
    const item = items[idx];
    locked = false;
    clearFlashKeys();
    app.innerHTML = `
      ${topbar()}
      <div class="screen wg-play">
        <div class="screen-header">${backBtn(back)}<h2 class="screen-title">${title}</h2></div>
        <div class="wg-hud">
          <span class="pill">${idx + 1}/${items.length}</span>
          <span class="pill">✓ ${correct}</span>
        </div>
        <div class="wg-question">
          <div class="wg-q-meta">${tb('dictationHint')}</div>
          <div class="wg-q-text">${escapeHtml(item.hint || '')}${item.pos ? `<div class="q-en">${escapeHtml(item.pos)}</div>` : ''}</div>
        </div>
        <div class="dictation-row">
          <button type="button" class="btn" id="hear">${tb('hearAgain')}</button>
          <input class="dictation-input" id="spell" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${tb('typeAnswer')}" />
          <button type="button" class="btn btn-primary" id="check">${tb('check')}</button>
        </div>
        <div id="fb"></div>
        <div class="flash-actions" style="margin-top:14px;display:none" id="nw">
          <button class="btn btn-primary" id="nx">${tb('nextArrow')}</button>
        </div>
      </div>`;
    const hear = () => {
      primeSpeech();
      speakText(item.answer, 'en-GB');
    };
    document.getElementById('hear').onclick = hear;
    setTimeout(hear, 250);
    const input = document.getElementById('spell');
    input?.focus();
    const submit = () => {
      if (locked) return;
      locked = true;
      const ok = spellingOk(input.value, item.answer);
      rememberSrs(srsKind, item.id, ok);
      if (ok) {
        correct += 1;
        addXp(10, true);
        celebrate(true);
        document.getElementById('fb').innerHTML = feedbackOk(item.tip);
      } else {
        addXp(0, false);
        celebrate(false);
        document.getElementById('fb').innerHTML = feedbackNo(item.answer, item.tip);
        recordWrong({
          id: `${srsKind}-${item.id}`,
          kind: `${srsKind}-dictation`,
          prompt: item.hint,
          correctText: item.answer,
          answer: item.answer,
          explain: item.tip,
          subject: 'english',
        });
      }
      document.getElementById('nw').style.display = 'flex';
      wireQuizNext(() => {
        idx += 1;
        paint();
      });
    };
    document.getElementById('check').onclick = submit;
    input.onkeydown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        submit();
      }
    };
  }

  paint();
}

function renderEnglishMatch(words, back, srsKind = 'ielts') {
  function deal() {
    const { left, right, pool } = dealMatchPairs(words, Math.min(6, words.length));
    let selected = null;
    let matched = 0;
    const total = pool.length;
    app.innerHTML = `
      ${topbar()}
      <div class="screen">
        <div class="screen-header">${backBtn(back)}<h2 class="screen-title">${tb('enMatch')}</h2>
          <button class="btn" id="redeal">${tb('again')}</button>
        </div>
        <div class="panel">
          <div class="progress-meta" style="margin-bottom:14px"><span>${matched} / ${total}</span></div>
          <div class="match-grid">
            <div class="match-col">${left.map((x) => `<button class="match-item" data-id="${x.id}" data-side="en">${escapeHtml(x.text)}</button>`).join('')}</div>
            <div class="match-col">${right.map((x) => `<button class="match-item" data-id="${x.id}" data-side="zh">${escapeHtml(x.text)}</button>`).join('')}</div>
          </div>
        </div>
      </div>`;
    document.getElementById('redeal').onclick = deal;
    function onPick(btn) {
      if (btn.classList.contains('matched')) return;
      if (!selected) {
        app.querySelectorAll('.match-item.selected').forEach((b) => b.classList.remove('selected'));
        btn.classList.add('selected');
        selected = btn;
        return;
      }
      if (selected === btn) {
        btn.classList.remove('selected');
        selected = null;
        return;
      }
      if (selected.dataset.side === btn.dataset.side) {
        selected.classList.remove('selected');
        btn.classList.add('selected');
        selected = btn;
        return;
      }
      const a = selected;
      const b = btn;
      if (a.dataset.id === b.dataset.id) {
        a.classList.add('matched');
        b.classList.add('matched');
        a.classList.remove('selected');
        matched += 1;
        addXp(8, true);
        rememberSrs(srsKind, a.dataset.id, true);
        celebrate(true);
        selected = null;
        const meta = app.querySelector('.progress-meta span');
        if (meta) meta.textContent = `${matched} / ${total}`;
        if (matched === total) {
          fanfare(tb('great'));
          setTimeout(() => {
            paintModeResults(100, total, total, words, words, { back, srsKind });
          }, 500);
        }
      } else {
        a.classList.add('bad');
        b.classList.add('bad');
        addXp(0, false);
        celebrate(false);
        setTimeout(() => {
          a.classList.remove('bad', 'selected');
          b.classList.remove('bad');
        }, 400);
        selected = null;
      }
    }
    app.querySelectorAll('.match-item').forEach((btn) => {
      btn.onclick = () => onPick(btn);
    });
  }
  deal();
}

/* —— Tom's Ground · IELTS / Chinese / Math runners —— */

async function renderIeltsDays() {
  currentRoute = 'ielts-days';
  await needIelts();
  app.innerHTML = `
    ${topbar()}
    <div class="screen">
      <div class="screen-header">${backBtn('hub-english')}<h2 class="screen-title">${tb('ieltsDays')}</h2></div>
      <p class="days-intro">${tb('band7')} · ${tb('words25')} · ${tb('ieltsMemorize')} → ${tb('ieltsSpot')}</p>
      <div class="day-grid">
        ${ieltsDays
          .map((d) => {
            const done = isIeltsDayDone(d.day);
            return `<button class="day-card ${done ? 'done' : ''}" data-ielts-day="${d.day}">
              <div class="day-num">${tb('dayOf', { n: d.day })}</div>
              <div class="day-name">${dayTitle(d)}</div>
              <div class="day-zh">${d.topic || ''}</div>
              <div class="day-meta">25 ${tb('words')}</div>
              <div class="day-status">${done ? '✓ ' + tb('done') : tb('start')}</div>
            </button>`;
          })
          .join('')}
      </div>
    </div>`;
}

async function startIeltsDay(dayNum) {
  await needIelts();
  const plan = getIeltsDay(dayNum);
  if (!plan) return;
  const words = ieltsDayWords(plan);
  let step = 0;
  let idx = 0;
  let flipped = false;
  let spotIdx = 0;
  let spotCorrect = 0;
  let locked = false;
  let spotItems = [];

  function buildSpot() {
    spotItems = shuffle(words.slice()).map((w) =>
      makeEnWordSpotItem(w, ieltsWords, { preferEnDef: Math.random() > 0.4 })
    );
  }

  function paint() {
    setSessionRepaint(paint);
    clearFlashKeys();
    if (step === 0) {
      app.innerHTML = `
        ${topbar()}
        <div class="screen">
          <div class="screen-header">${backBtn('ielts-days')}<h2 class="screen-title">${tb('dayOf', { n: plan.day })}</h2></div>
          <div class="panel day-intro ielts-intro">
            <div class="flash-chapter">${tb('band7')} · ${plan.topic || ''}</div>
            <h3 class="result-title">${dayTitle(plan)}</h3>
            <p>${tb('words25')}</p>
            <div class="day-pipeline"><span>1 ${tb('ieltsMemorize')}</span><span>2 ${tb('ieltsSpot')}</span></div>
            <button class="btn btn-primary" id="go">${tb('startMemorize')}</button>
            ${quizModeButtons()}
          </div>
        </div>`;
      document.getElementById('go').onclick = () => {
        sfxClick();
        step = 1;
        idx = 0;
        flipped = false;
        paint();
      };
      bindQuizModeButtons(words, ieltsWords, { back: 'ielts-days', srsKind: 'ielts' });
      return;
    }

    if (step === 1) {
      const w = words[idx];
      app.innerHTML = `
        ${topbar()}
        <div class="screen">
          <div class="screen-header">${backBtn('ielts-days')}<h2 class="screen-title">${tb('ieltsMemorize')}</h2></div>
          <div class="step-pills"><span class="on">1 ${tb('ieltsMemorize')}</span><span>2 ${tb('ieltsSpot')}</span></div>
          <div class="progress-wrap">
            <div class="progress-meta"><span>${idx + 1} / ${words.length}</span><span>${w.topic || ''}</span></div>
            <div class="progress-bar"><div class="progress-fill" style="width:${((idx + 1) / words.length) * 100}%"></div></div>
          </div>
          <div class="flash-card ielts-card ${flipped ? 'flipped' : ''}" id="flash">
            <div class="flash-inner">
              <div class="flash-face front">
                ${flashSpeakHtml()}
                <div class="flash-chapter">${w.pos} · ${w.phonetic || ''}</div>
                <div class="flash-main">${w.word}</div>
                <div class="flash-sub">${tb('tapFlip')}</div>
              </div>
              <div class="flash-face back">
                ${flashSpeakHtml()}
                <div class="flash-chapter">${tb('meaning')}</div>
                <div class="flash-main">${w.zh}</div>
                ${(() => { const tip = [w.enDef, w.example ? `${tb('example')}: ${w.example}` : '', w.exampleZh || ''].filter(Boolean).join(' · '); return tip ? `<div class="flash-tip">${tip}</div>` : ''; })()}
              </div>
            </div>
          </div>
          <div class="flash-actions">
            <button class="btn" id="prev" ${idx === 0 ? 'disabled' : ''}>${tb('prev')}</button>
            <button class="btn" id="flip">${tb('flip')}</button>
            <button class="btn btn-primary" id="nx">${idx >= words.length - 1 ? tb('toSpot') : tb('next')}</button>
          </div>
        </div>`;
      const doFlip = () => {
        stopSpeak();
        flipped = !flipped;
        sfxFlip();
        document.getElementById('flash')?.classList.toggle('flipped', flipped);
      };
      const goNext = () => {
        stopSpeak();
        sfxClick();
        if (idx >= words.length - 1) {
          buildSpot();
          step = 2;
          spotIdx = 0;
          spotCorrect = 0;
          paint();
        } else {
          idx += 1;
          flipped = false;
          paint();
        }
      };
      document.getElementById('flash').onclick = doFlip;
      document.getElementById('flip').onclick = doFlip;
      document.getElementById('prev').onclick = () => {
        if (idx > 0) {
          stopSpeak();
          idx -= 1;
          flipped = false;
          sfxClick();
          paint();
        }
      };
      document.getElementById('nx').onclick = goNext;
      bindFlashSpeak({
        getFlipped: () => flipped,
        frontText: w.word,
        backText: w.zh,
        frontLang: 'en-GB',
        backLang: 'zh-CN',
      });
      bindFlashKeys({ onFlip: doFlip, onNext: goNext });
      return;
    }

    if (step === 2) {
      if (spotIdx >= spotItems.length) {
        step = 3;
        paint();
        return;
      }
      const item = spotItems[spotIdx];
      locked = false;
      app.innerHTML = `
        ${topbar()}
        <div class="screen wg-play">
          <div class="screen-header">${backBtn('ielts-days')}<h2 class="screen-title">${tb('ieltsSpot')}</h2></div>
          <div class="step-pills"><span>✓ ${tb('ieltsMemorize')}</span><span class="on">2 ${tb('ieltsSpot')}</span></div>
          <div class="wg-hud">
            <span class="pill">${spotIdx + 1} / ${spotItems.length}</span>
            <span class="pill">🔥 ${store.streak}</span>
            <span class="pill">✓ ${spotCorrect}</span>
          </div>
          <div class="progress-wrap">
            <div class="progress-bar"><div class="progress-fill" style="width:${(spotIdx / spotItems.length) * 100}%"></div></div>
          </div>
          <div class="wg-question">
            <div class="wg-q-meta">${tb('spotHint')}</div>
            <div class="wg-q-text">${localizeHtml(item.prompt)}</div>
          </div>
          <div class="wg-options" id="opts">
            ${item.options
              .map(
                (o, i) =>
                  `<button class="wg-opt" data-v="${o}"><span class="shape">${'ABCD'[i]}</span><span>${o}</span></button>`
              )
              .join('')}
          </div>
          <div id="fb"></div>
          <div class="flash-actions" style="display:none;margin-top:14px" id="nw">
            <button class="btn btn-primary" id="nx">${tb('nextArrow')}</button>
          </div>
        </div>`;
      app.querySelectorAll('.wg-opt').forEach((btn) => {
        btn.onclick = () => {
          if (locked) return;
          locked = true;
          const ok = btn.dataset.v === item.answer;
          app.querySelectorAll('.wg-opt').forEach((b) => {
            b.disabled = true;
            if (b.dataset.v === item.answer) b.classList.add('correct');
            else {
              b.classList.add('dim');
              if (b === btn && !ok) b.classList.add('wrong');
            }
          });
          if (ok) {
            spotCorrect += 1;
            addXp(10, true);
            rememberSrs('ielts', item.id, true);
            celebrate(true);
            document.getElementById('fb').innerHTML = feedbackOk(item.tip);
          } else {
            addXp(0, false);
            rememberSrs('ielts', item.id, false);
            celebrate(false);
            document.getElementById('fb').innerHTML = feedbackNo(item.answer, item.tip);
            recordWrong({
              id: `ielts-${item.id}`,
              kind: 'ielts',
              prompt: item.prompt,
              correctText: item.answer,
              answer: item.answer,
              explain: item.tip,
              subject: 'english',
            });
          }
          document.getElementById('nw').style.display = 'flex';
          wireQuizNext(() => {
            spotIdx += 1;
            paint();
          });
        };
      });
      return;
    }

    markIeltsDayDone(plan.day);
    const pct = Math.round((spotCorrect / Math.max(1, spotItems.length)) * 100);
    const next = getIeltsDay(plan.day + 1);
    fanfare(tb('spotDone'));
    clearSessionRepaint();
    app.innerHTML = `
      ${topbar()}
      <div class="screen">
        <div class="screen-header">${backBtn('hub-english')}<h2 class="screen-title">${tb('spotDone')}</h2></div>
        <div class="panel results" style="--pct:${pct}">
          <div class="score-ring">${pct}%</div>
          <h3 class="result-title">${spotCorrect} / ${spotItems.length} ${tb('correctN')}</h3>
          <p>${pct >= 80 ? tb('great') : pct >= 60 ? tb('okish') : tb('keepGoing')}</p>
          <div class="flash-actions">
            ${next ? `<button class="btn btn-primary" data-ielts-day="${next.day}">${tb('nextDay')}</button>` : ''}
            <button class="btn" data-nav="ielts-days">${tb('ieltsDays')}</button>
            <button class="btn" data-nav="home">${tb('home')}</button>
          </div>
          ${quizModeButtons()}
        </div>
      </div>`;
    bindQuizModeButtons(words, ieltsWords, { back: 'ielts-days', srsKind: 'ielts' });
  }

  paint();
}

async function renderIeltsFreeSpot() {
  currentRoute = 'ielts-spot';
  await needIelts();
  const words = shuffle(ieltsWords.slice()).slice(0, 25);
  let spotIdx = 0;
  let spotCorrect = 0;
  let locked = false;
  const spotItems = words.map((w) =>
    makeEnWordSpotItem(w, ieltsWords, { preferEnDef: Math.random() > 0.4 })
  );

  function paint() {
    if (spotIdx >= spotItems.length) {
      const pct = Math.round((spotCorrect / spotItems.length) * 100);
      app.innerHTML = `
        ${topbar()}
        <div class="screen">
          <div class="screen-header">${backBtn('hub-english')}<h2 class="screen-title">${tb('results')}</h2></div>
          <div class="panel results" style="--pct:${pct}">
            <div class="score-ring">${pct}%</div>
            <h3>${spotCorrect}/${spotItems.length}</h3>
            <div class="flash-actions">
              <button class="btn btn-primary" data-nav="ielts-spot">${tb('again')}</button>
              <button class="btn" data-nav="home">${tb('home')}</button>
            </div>
          </div>
        </div>`;
      return;
    }
    const item = spotItems[spotIdx];
    locked = false;
    clearFlashKeys();
    app.innerHTML = `
      ${topbar()}
      <div class="screen wg-play">
        <div class="screen-header">${backBtn('hub-english')}<h2 class="screen-title">${tb('ieltsSpot')}</h2></div>
        <div class="wg-hud">
          <span class="pill">${spotIdx + 1}/${spotItems.length}</span>
          <span class="pill">✓ ${spotCorrect}</span>
        </div>
        <div class="wg-question">
          <div class="wg-q-meta">${tb('spotHint')}</div>
          <div class="wg-q-text">${localizeHtml(item.prompt)}</div>
        </div>
        <div class="wg-options">
          ${item.options
            .map((o, i) => `<button class="wg-opt" data-v="${o}"><span class="shape">${'ABCD'[i]}</span><span>${o}</span></button>`)
            .join('')}
        </div>
        <div id="fb"></div>
        <div class="flash-actions" style="display:none;margin-top:14px" id="nw">
          <button class="btn btn-primary" id="nx">${tb('nextArrow')}</button>
        </div>
      </div>`;
    app.querySelectorAll('.wg-opt').forEach((btn) => {
      btn.onclick = () => {
        if (locked) return;
        locked = true;
        const ok = btn.dataset.v === item.answer;
        app.querySelectorAll('.wg-opt').forEach((b) => {
          b.disabled = true;
          if (b.dataset.v === item.answer) b.classList.add('correct');
          else b.classList.add('dim');
          if (b === btn && !ok) b.classList.add('wrong');
        });
        if (ok) {
          spotCorrect += 1;
          addXp(8, true);
          celebrate(true);
          document.getElementById('fb').innerHTML = feedbackOk(item.tip);
        } else {
          addXp(0, false);
          celebrate(false);
          recordWrong({
            id: `ielts-spot-${item.id}`,
            kind: 'ielts',
            prompt: item.prompt,
            correctText: item.answer,
            explain: item.tip || '',
            subject: 'english',
          });
          document.getElementById('fb').innerHTML = feedbackNo(item.answer, item.tip);
        }
        document.getElementById('nw').style.display = 'flex';
        wireQuizNext(() => {
          spotIdx += 1;
          paint();
        });
      };
    });
  }
  paint();
}

async function renderChineseList() {
  await needChinese();
  currentRoute = 'cn-list';
  const groups = chineseGrade === 'all'
    ? worksByGrade()
    : [{ grade: chineseGrade, label: gradeLabel(chineseGrade), works: filterChineseWorks(chineseGrade) }];

  app.innerHTML = `
    ${topbar()}
    <div class="screen">
      <div class="screen-header">${backBtn('hub-chinese')}<h2 class="screen-title">${tb('chineseList')}</h2></div>
      <p class="hub-lead">${tb('chineseListHint')}</p>
      <div class="chip-row grade-chips" id="cn-list-chips">
        <button class="chip ${chineseGrade === 'all' ? 'active' : ''}" data-grade="all">${tb('gradeAll')}</button>
        <button class="chip ${chineseGrade === 7 ? 'active' : ''}" data-grade="7">${tb('grade7')}</button>
        <button class="chip ${chineseGrade === 8 ? 'active' : ''}" data-grade="8">${tb('grade8')}</button>
        <button class="chip ${chineseGrade === 9 ? 'active' : ''}" data-grade="9">${tb('grade9')}</button>
      </div>
      <div class="work-catalog">
        ${groups
          .map(
            (g) => `
          <section class="work-grade-block">
            <h3 class="work-grade-title">${g.label}<span>${g.works.length} ${tb('worksCount')}</span></h3>
            <div class="work-grid">
              ${g.works
                .map(
                  (w) => `
                <article class="work-card" data-work="${w.id}">
                  <div class="work-card-top">
                    <span class="work-type">${({ poem: '诗', ci: '词', prose: '文' })[w.type] || ''}</span>
                    <span class="work-dynasty">${w.dynasty}</span>
                  </div>
                  <h4 class="work-title">${w.title}</h4>
                  <div class="work-author">${w.author}</div>
                  <p class="work-line">${w.keyLines[0] || ''}</p>
                </article>`
                )
                .join('')}
            </div>
          </section>`
          )
          .join('')}
      </div>
    </div>`;

  app.querySelectorAll('#cn-list-chips [data-grade]').forEach((btn) => {
    btn.onclick = () => {
      sfxClick();
      const g = btn.dataset.grade;
      chineseGrade = g === 'all' ? 'all' : Number(g);
      renderChineseList();
    };
  });

  app.querySelectorAll('.work-card').forEach((card) => {
    card.onclick = () => {
      sfxClick();
      const w = chineseWorks.find((x) => x.id === card.dataset.work);
      if (!w) return;
      const panel = document.createElement('div');
      panel.className = 'work-detail panel';
      const keysText = w.keyLines.join('\n');
      const fullText = w.text;
      panel.innerHTML = `
        <div class="work-detail-head">
          <div>
            <div class="flash-chapter">${gradeLabel(w.grade)} · ${({ poem: '古诗', ci: '词', prose: '古文' })[w.type]}</div>
            <h3>${w.title}</h3>
            <div class="work-author">${w.author} · ${w.dynasty}</div>
          </div>
          <button class="btn" id="wd-close">✕</button>
        </div>
        <p class="work-gloss-hint">${tb('glossHint')}</p>
        <h4 class="work-sec">${tb('keyLines')} ${speakIconBtn('wd-speak-keys', 'speakKeys')}</h4>
        <div class="work-keys">
          ${w.keyLines.map((line) => `<p class="work-key-line work-readable">${renderClassicMarkup(line)}</p>`).join('')}
        </div>
        <h4 class="work-sec">${tb('fullText')} ${speakIconBtn('wd-speak-full', 'speakFull')}</h4>
        <div class="work-text work-readable" data-kind="full">${renderClassicMarkup(fullText)}</div>
        <h4 class="work-sec">${tb('meaningLabel')}</h4>
        <p class="work-meaning">${w.meaning}</p>
        <p class="work-tip">${w.tip}</p>`;
      const host = app.querySelector('.work-catalog');
      const old = host.querySelector('.work-detail');
      if (old) old.remove();
      host.prepend(panel);
      panel.querySelector('#wd-close').onclick = (e) => {
        e.stopPropagation();
        stopSpeak();
        panel.remove();
      };
      panel.querySelector('#wd-speak-keys')?.addEventListener('click', (e) => {
        e.stopPropagation();
        const btn = e.currentTarget;
        primeSpeech();
        if (isSpeaking() && btn.classList.contains('is-speaking')) {
          stopSpeak();
          return;
        }
        speakText(keysText, 'zh-CN', btn);
      });
      panel.querySelector('#wd-speak-full')?.addEventListener('click', (e) => {
        e.stopPropagation();
        const btn = e.currentTarget;
        primeSpeech();
        if (isSpeaking() && btn.classList.contains('is-speaking')) {
          stopSpeak();
          return;
        }
        speakText(fullText, 'zh-CN', btn);
      });
      panel.querySelectorAll('.work-keys .work-readable').forEach((el, i) => {
        bindClassicGloss(el, w.keyLines[i] || '', w.notes || []);
      });
      const fullEl = panel.querySelector('.work-readable[data-kind="full"]');
      if (fullEl) bindClassicGloss(fullEl, fullText, w.notes || []);
      panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
  });
}

async function renderSubjectFlash(kind) {
  if (kind === 'chinese') await needChinese();
  else await needMath();
  currentRoute = kind === 'chinese' ? 'cn-flash' : 'math-flash';
  const source =
    kind === 'chinese' ? filterChineseVocab(chineseGrade) : mathVocab;
  const list = shuffle(source.slice()).slice(0, Math.min(30, source.length || 30));
  let idx = 0;
  let flipped = false;
  const back = kind === 'chinese' ? 'hub-chinese' : 'hub-math';

  function paint() {
    if (!list.length) {
      app.innerHTML = `
        ${topbar()}
        <div class="screen">
          <div class="screen-header">${backBtn(back)}<h2 class="screen-title">${tb('chineseFlash')}</h2></div>
          <div class="panel"><p>${tb('chineseListHint')}</p></div>
        </div>`;
      return;
    }
    const w = list[idx];
    const front = kind === 'chinese' ? w.term : w.zh;
    const frontSub = kind === 'chinese' ? w.en || tb('tapFlip') : tb('tapFlip');
    const backMain = kind === 'chinese' ? w.zh : w.en;
    const tipRaw =
      kind === 'chinese'
        ? w.tip || ''
        : [w.detail, w.tip].filter(Boolean).join(' · ');
    const chapter = kind === 'chinese' ? w.category : w.chapter;
    app.innerHTML = `
      ${topbar()}
      <div class="screen">
        <div class="screen-header">${backBtn(back)}<h2 class="screen-title">${kind === 'chinese' ? tb('chineseFlash') : tb('mathFlash')}</h2></div>
        <div class="progress-wrap">
          <div class="progress-meta"><span>${idx + 1}/${list.length}</span><span>${kind === 'chinese' ? (chineseGrade === 'all' ? tb('gradeAll') : gradeLabel(chineseGrade)) : ''}</span></div>
          <div class="progress-bar"><div class="progress-fill" style="width:${((idx + 1) / list.length) * 100}%"></div></div>
        </div>
        <div class="flash-card ${flipped ? 'flipped' : ''}" id="flash">
          <div class="flash-inner">
            <div class="flash-face front">
              ${flashSpeakHtml()}
              <div class="flash-chapter">${chapter || ''}</div>
              <div class="flash-main">${front}</div>
              <div class="flash-sub">${frontSub}</div>
            </div>
            <div class="flash-face back">
              ${flashSpeakHtml()}
              <div class="flash-chapter">${tb('keyLines')}</div>
              <div class="flash-main flash-lines">${backMain}</div>
              ${tipRaw ? `<div class="flash-tip">${tipRaw}</div>` : ''}
            </div>
          </div>
        </div>
        <div class="flash-actions">
          <button class="btn" id="prev" ${idx === 0 ? 'disabled' : ''}>${tb('prev')}</button>
          <button class="btn" id="flip">${tb('flip')}</button>
          <button class="btn btn-primary" id="nx">${idx >= list.length - 1 ? tb('home') : tb('next')}</button>
        </div>
      </div>`;
    const doFlip = () => {
      stopSpeak();
      flipped = !flipped;
      sfxFlip();
      document.getElementById('flash')?.classList.toggle('flipped', flipped);
    };
    const goNext = () => {
      stopSpeak();
      if (idx >= list.length - 1) {
        navigate(back);
        return;
      }
      idx += 1;
      flipped = false;
      sfxClick();
      paint();
    };
    document.getElementById('flash').onclick = doFlip;
    document.getElementById('flip').onclick = doFlip;
    document.getElementById('prev').onclick = () => {
      if (idx > 0) {
        stopSpeak();
        idx -= 1;
        flipped = false;
        paint();
      }
    };
    document.getElementById('nx').onclick = goNext;
    const frontLang = kind === 'chinese' ? 'zh-CN' : 'zh-CN';
    const backLang = kind === 'chinese' ? 'zh-CN' : 'en-US';
    bindFlashSpeak({
      getFlipped: () => flipped,
      frontText: front,
      backText: backMain,
      frontLang,
      backLang,
    });
    bindFlashKeys({ onFlip: doFlip, onNext: goNext });
  }
  paint();
}

async function renderSubjectQuiz(kind) {
  if (kind === 'chinese') await needChinese();
  else await needMath();
  currentRoute = kind === 'chinese' ? 'cn-quiz' : 'math-quiz';
  const source =
    kind === 'chinese' ? filterChineseQuestions(chineseGrade) : mathQuestions;
  const bank = shuffle(source.slice()).slice(0, Math.min(20, source.length || 20));
  let idx = 0;
  let correct = 0;
  let locked = false;
  const back = kind === 'chinese' ? 'hub-chinese' : 'hub-math';

  function paint() {
    if (!bank.length) {
      app.innerHTML = `
        ${topbar()}
        <div class="screen">
          <div class="screen-header">${backBtn(back)}<h2 class="screen-title">${kind === 'chinese' ? tb('chineseQuiz') : tb('mathQuiz')}</h2></div>
          <div class="panel"><p>${kind === 'chinese' ? tb('chineseListHint') : tb('mathQuiz')}</p>
            <div class="flash-actions"><button class="btn" data-nav="${back}">${tb('home')}</button></div>
          </div>
        </div>`;
      return;
    }
    if (idx >= bank.length) {
      const pct = Math.round((correct / bank.length) * 100);
      app.innerHTML = `
        ${topbar()}
        <div class="screen">
          <div class="screen-header">${backBtn(back)}<h2 class="screen-title">${tb('results')}</h2></div>
          <div class="panel results" style="--pct:${pct}">
            <div class="score-ring">${pct}%</div>
            <h3>${correct}/${bank.length}</h3>
            <div class="flash-actions">
              <button class="btn btn-primary" data-nav="${currentRoute}">${tb('again')}</button>
              <button class="btn" data-hub="${kind}">${tb('home')}</button>
            </div>
          </div>
        </div>`;
      return;
    }
    const q = bank[idx];
    locked = false;
    clearFlashKeys();
    const opts =
      q.type === 'tf'
        ? `<div class="wg-options tf-row" id="opts">
            <button class="wg-opt" data-i="true"><span class="shape">T</span><span>${tb('trueOpt')}</span></button>
            <button class="wg-opt" data-i="false"><span class="shape">F</span><span>${tb('falseOpt')}</span></button>
          </div>`
        : wgMcqHtml(q.options);

    app.innerHTML = `
      ${topbar()}
      <div class="screen wg-play">
        <div class="screen-header">${backBtn(back)}<h2 class="screen-title">${kind === 'chinese' ? tb('chineseQuiz') : tb('mathQuiz')}</h2></div>
        <div class="wg-hud">
          <span class="pill">${idx + 1}/${bank.length}</span>
          <span class="pill">✓ ${correct}</span>
        </div>
        <div class="wg-question">
          <div class="wg-q-meta">${q.category || q.chapter || ''}</div>
          <div class="wg-q-text">${localizeHtml(q.prompt)}</div>
        </div>
        ${opts}
        <div id="fb"></div>
        <div class="flash-actions" style="display:none;margin-top:14px" id="nw">
          <button class="btn btn-primary" id="nx">${tb('nextArrow')}</button>
        </div>
      </div>`;

    app.querySelectorAll('.wg-opt').forEach((btn) => {
      btn.onclick = () => {
        if (locked) return;
        locked = true;
        let ok = false;
        let correctText = '';
        if (q.type === 'tf') {
          const choice = btn.dataset.i === 'true';
          ok = choice === q.answer;
          correctText = q.answer ? tb('trueOpt') : tb('falseOpt');
        } else {
          const choice = Number(btn.dataset.i);
          ok = choice === q.answer;
          correctText = q.options[q.answer];
        }
        app.querySelectorAll('.wg-opt').forEach((b) => {
          b.disabled = true;
          if (q.type === 'mcq') {
            if (Number(b.dataset.i) === q.answer) b.classList.add('correct');
            else b.classList.add('dim');
          } else {
            const val = b.dataset.i === 'true';
            if (val === q.answer) b.classList.add('correct');
            else b.classList.add('dim');
          }
          if (b === btn && !ok) b.classList.add('wrong');
        });
        if (ok) {
          correct += 1;
          addXp(10, true);
          celebrate(true);
          document.getElementById('fb').innerHTML = feedbackOk(q.explain);
        } else {
          addXp(0, false);
          celebrate(false);
          document.getElementById('fb').innerHTML = feedbackNo(correctText, q.explain);
          recordWrong({
            id: q.id,
            kind,
            prompt: q.prompt,
            correctText,
            explain: q.explain,
            subject: kind,
          });
        }
        document.getElementById('nw').style.display = 'flex';
        wireQuizNext(() => {
          idx += 1;
          paint();
        });
      };
    });
  }
  paint();
}


/* —— High-school PEP 2019 bookshelf / units / flash+spot —— */

function renderHsShelf() {
  currentRoute = 'hs-shelf';
  setSessionRepaint(renderHsShelf);
  store.activeHub = 'english';
  save();
  app.innerHTML = `
    ${topbar()}
    <div class="screen hs-shelf-screen">
      <div class="screen-header">${backBtn('hub-english')}<h2 class="screen-title">${tb('hsShelf')}</h2></div>
      <p class="days-intro">${tb('hsShelfHint')}</p>
      <div class="hs-shelf">
        ${HS_BOOKS.map(
          (book) =>
            `<button class="hs-book" data-hs-book="${book.id}" style="--book-accent:${book.accent};--book-spine:${book.spine}">
            ${hsBookCardHtml(book)}
          </button>`
        ).join('')}
      </div>
    </div>`;
}

function renderHsBook(bookId) {
  const book = getHsBook(bookId || hsActiveBook);
  if (!book) return renderHsShelf();
  hsActiveBook = book.id;
  currentRoute = 'hs-book';
  setSessionRepaint(() => renderHsBook(hsActiveBook));
  store.activeHub = 'english';
  save();
  app.innerHTML = `
    ${topbar()}
    <div class="screen hs-book-screen">
      <div class="screen-header">${backBtn('hs-shelf')}<h2 class="screen-title">${escapeHtml(hsBookTitle(book))}</h2></div>
      <div class="hs-book-hero" style="--book-accent:${book.accent};--book-spine:${book.spine}">
        ${hsBookCardHtml(book, { large: true })}
        <p class="days-intro">${tb('pep2019')} · ${book.wordCount} ${tb('words')} · ${tb('hsLearned', { n: hsBookDoneCount(book), t: book.units.length })}</p>
      </div>
      <div class="hs-unit-list">
        ${book.units
          .map((unit) => {
            const done = isHsUnitDone(book.id, unit.id);
            return `<button class="hs-unit-row ${done ? 'done' : ''}" data-hs-unit="${book.id}:${unit.id}">
              <div class="hs-unit-num">${escapeHtml(hsUnitNumLabel(unit))}</div>
              <div class="hs-unit-titles">
                <div class="hs-unit-en">${escapeHtml(unit.en)}</div>
                <div class="hs-unit-zh">${escapeHtml(unit.zh)}</div>
              </div>
              <div class="hs-unit-side">
                <span>${unit.wordCount} ${tb('words')}</span>
                <span class="day-status">${done ? '✓ ' + tb('done') : tb('start')}</span>
              </div>
            </button>`;
          })
          .join('')}
      </div>
    </div>`;
}

async function startHsUnit(bookId, unitId) {
  const book = getHsBook(bookId);
  const unit = getHsUnit(book, unitId);
  if (!book || !unit) return renderHsShelf();
  hsActiveBook = book.id;
  hsActiveUnit = unit.id;
  currentRoute = 'hs-unit';
  await needHsBook(book.id);
  const bank = packs.hsWords[book.id] || [];
  const words = bank.filter((w) => w.unit === unit.id);
  if (!words.length) return renderHsBook(book.id);

  let step = 0;
  let idx = 0;
  let flipped = false;
  let spotIdx = 0;
  let spotCorrect = 0;
  let locked = false;
  let spotItems = [];

  function buildSpot() {
    // High-school spot: always Chinese gloss → pick English word (never leak the headword).
    spotItems = shuffle(words.slice()).map((w) => makeEnWordSpotItem(w, bank, { preferEnDef: false }));
  }

  function paint() {
    setSessionRepaint(paint);
    clearFlashKeys();
    if (step === 0) {
      app.innerHTML = `
        ${topbar()}
        <div class="screen">
          <div class="screen-header">${backBtn('hs-book')}<h2 class="screen-title">${tb('hsWordList')}</h2></div>
          <div class="hs-list-head">
            <div>
              <div class="flash-chapter">${escapeHtml(hsBookTitle(book))} · ${tb('pep2019')}</div>
              <h3 class="result-title">${escapeHtml(hsUnitHeading(unit))}</h3>
              <p>${words.length} ${tb('words')} · ${tb('hsUsageHint')}</p>
            </div>
            <button class="btn btn-primary" id="go">${tb('startMemorize')}</button>
            <button class="btn" id="hs-dictation">${tb('dictation')}</button>
            <button class="btn" id="hs-cloze">${tb('cloze')}</button>
            <button class="btn" id="hs-match">${tb('enMatch')}</button>
          </div>
          <input class="hs-search" id="hs-search" type="search" placeholder="${tb('hsSearch')}" />
          <div class="hs-word-list">
            ${words
              .map((w) => {
                const note = hsUsageNote(w);
                return `<div class="hs-word-row">
                  <div class="hs-word-main">
                    <button type="button" class="hs-word-copy" aria-expanded="false">
                      <div class="hs-word-enline">
                        <span class="hs-word-en">${escapeHtml(w.word)}</span>
                        ${w.phonetic ? `<span class="hs-word-ph">${escapeHtml(w.phonetic)}</span>` : ''}
                        ${w.pos ? `<span class="hs-word-pos">${escapeHtml(w.pos)}</span>` : ''}
                        <span class="hs-word-caret" aria-hidden="true"></span>
                      </div>
                      <div class="hs-word-zh">${escapeHtml(w.zh)}</div>
                    </button>
                    ${hsWordSpeakBtn(w.word)}
                  </div>
                  <div class="hs-word-usage">
                    <div class="hs-word-usage-inner">
                      <div class="hs-usage-kicker">${tb('hsUsage')}</div>
                      <p class="hs-usage-body">${escapeHtml(note.body)}</p>
                      ${note.ex ? `<p class="hs-usage-ex">${escapeHtml(note.ex)}</p>` : ''}
                    </div>
                  </div>
                </div>`;
              })
              .join('')}
          </div>
        </div>`;
      document.getElementById('go').onclick = () => {
        sfxClick();
        step = 1;
        idx = 0;
        flipped = false;
        paint();
      };
      document.getElementById('hs-dictation').onclick = () => {
        sfxClick();
        startEnglishWordMode('dictation', words, bank, { back: 'hs-book', srsKind: 'hs' });
      };
      document.getElementById('hs-cloze').onclick = () => {
        sfxClick();
        startEnglishWordMode('cloze', words, bank, { back: 'hs-book', srsKind: 'hs' });
      };
      const hsMatch = document.getElementById('hs-match');
      if (hsMatch) {
        hsMatch.onclick = () => {
          sfxClick();
          startEnglishWordMode('match', words, bank, { back: 'hs-book', srsKind: 'hs' });
        };
      }
      const search = document.getElementById('hs-search');
      if (search) {
        search.oninput = () => {
          const q = search.value.trim().toLowerCase();
          app.querySelectorAll('.hs-word-row').forEach((row) => {
            const hay = row.textContent.toLowerCase();
            row.style.display = !q || hay.includes(q) ? '' : 'none';
          });
        };
      }
      bindHsWordList();
      return;
    }

    if (step === 1) {
      const w = words[idx];
      app.innerHTML = `
        ${topbar()}
        <div class="screen">
          <div class="screen-header"><button class="btn btn-ghost" id="hs-back-list">${tb('back')}</button><h2 class="screen-title">${tb('ieltsMemorize')}</h2></div>
          <div class="step-pills"><span class="on">1 ${tb('ieltsMemorize')}</span><span>2 ${tb('ieltsSpot')}</span></div>
          <div class="progress-wrap">
            <div class="progress-meta"><span>${idx + 1} / ${words.length}</span><span>${escapeHtml(w.unitTitle || '')}</span></div>
            <div class="progress-bar"><div class="progress-fill" style="width:${((idx + 1) / words.length) * 100}%"></div></div>
          </div>
          <div class="flash-card ielts-card ${flipped ? 'flipped' : ''}" id="flash">
            <div class="flash-inner">
              <div class="flash-face front">
                ${flashSpeakHtml()}
                <div class="flash-chapter">${escapeHtml(w.pos)} · ${escapeHtml(w.phonetic || '')}</div>
                <div class="flash-main">${escapeHtml(w.word)}</div>
                <div class="flash-sub">${tb('tapFlip')}</div>
              </div>
              <div class="flash-face back">
                ${flashSpeakHtml()}
                <div class="flash-chapter">${tb('meaning')}</div>
                <div class="flash-main">${escapeHtml(w.zh)}</div>
                ${(() => { const tip = [w.enDef, w.example ? `${tb('example')}: ${w.example}` : '', w.exampleZh || ''].filter(Boolean).join(' · '); return tip ? `<div class="flash-tip">${escapeHtml(tip)}</div>` : ''; })()}
              </div>
            </div>
          </div>
          <div class="flash-actions">
            <button class="btn" id="prev" ${idx === 0 ? 'disabled' : ''}>${tb('prev')}</button>
            <button class="btn" id="flip">${tb('flip')}</button>
            <button class="btn btn-primary" id="nx">${idx >= words.length - 1 ? tb('toSpot') : tb('next')}</button>
          </div>
        </div>`;
      const doFlip = () => {
        stopSpeak();
        flipped = !flipped;
        sfxFlip();
        document.getElementById('flash')?.classList.toggle('flipped', flipped);
      };
      const goNext = () => {
        stopSpeak();
        sfxClick();
        if (idx >= words.length - 1) {
          buildSpot();
          step = 2;
          spotIdx = 0;
          spotCorrect = 0;
          paint();
        } else {
          idx += 1;
          flipped = false;
          paint();
        }
      };
      document.getElementById('flash').onclick = doFlip;
      document.getElementById('flip').onclick = doFlip;
      document.getElementById('prev').onclick = () => {
        if (idx > 0) {
          stopSpeak();
          idx -= 1;
          flipped = false;
          sfxClick();
          paint();
        }
      };
      document.getElementById('nx').onclick = goNext;
      const backList = document.getElementById('hs-back-list');
      if (backList) {
        backList.onclick = () => {
          stopSpeak();
          sfxClick();
          step = 0;
          paint();
        };
      }
      bindFlashSpeak({
        getFlipped: () => flipped,
        frontText: w.word,
        backText: w.zh,
        frontLang: 'en-GB',
        backLang: 'zh-CN',
      });
      bindFlashKeys({ onFlip: doFlip, onNext: goNext });
      return;
    }

    if (step === 2) {
      if (spotIdx >= spotItems.length) {
        step = 3;
        paint();
        return;
      }
      const item = spotItems[spotIdx];
      locked = false;
      app.innerHTML = `
        ${topbar()}
        <div class="screen wg-play">
          <div class="screen-header">${backBtn('hs-book')}<h2 class="screen-title">${tb('ieltsSpot')}</h2></div>
          <div class="step-pills"><span>✓ ${tb('ieltsMemorize')}</span><span class="on">2 ${tb('ieltsSpot')}</span></div>
          <div class="wg-hud">
            <span class="pill">${spotIdx + 1} / ${spotItems.length}</span>
            <span class="pill">🔥 ${store.streak}</span>
            <span class="pill">✓ ${spotCorrect}</span>
          </div>
          <div class="progress-wrap">
            <div class="progress-bar"><div class="progress-fill" style="width:${(spotIdx / spotItems.length) * 100}%"></div></div>
          </div>
          <div class="wg-question">
            <div class="wg-q-meta">${tb('spotHint')}</div>
            <div class="wg-q-text">${localizeHtml(item.prompt)}</div>
          </div>
          <div class="wg-options" id="opts">
            ${item.options
              .map(
                (o, i) =>
                  `<button class="wg-opt" data-v="${escapeHtml(o)}"><span class="shape">${'ABCD'[i]}</span><span>${escapeHtml(o)}</span></button>`
              )
              .join('')}
          </div>
          <div id="fb"></div>
          <div class="flash-actions" style="display:none;margin-top:14px" id="nw">
            <button class="btn btn-primary" id="nx">${tb('nextArrow')}</button>
          </div>
        </div>`;
      app.querySelectorAll('.wg-opt').forEach((btn) => {
        btn.onclick = () => {
          if (locked) return;
          locked = true;
          const ok = btn.dataset.v === item.answer;
          app.querySelectorAll('.wg-opt').forEach((b) => {
            b.disabled = true;
            if (b.dataset.v === item.answer) b.classList.add('correct');
            else {
              b.classList.add('dim');
              if (b === btn && !ok) b.classList.add('wrong');
            }
          });
          if (ok) {
            spotCorrect += 1;
            addXp(10, true);
            rememberSrs('hs', item.id, true);
            celebrate(true);
            document.getElementById('fb').innerHTML = feedbackOk(item.tip);
          } else {
            addXp(0, false);
            rememberSrs('hs', item.id, false);
            celebrate(false);
            document.getElementById('fb').innerHTML = feedbackNo(item.answer, item.tip);
            recordWrong({
              id: `hs-en-${item.id}`,
              kind: 'hs-en',
              prompt: item.prompt,
              correctText: item.answer,
              answer: item.answer,
              explain: item.tip,
              subject: 'english',
            });
          }
          document.getElementById('nw').style.display = 'flex';
          wireQuizNext(() => {
            spotIdx += 1;
            paint();
          });
        };
      });
      return;
    }

    markHsUnitDone(book.id, unit.id);
    const pct = Math.round((spotCorrect / Math.max(1, spotItems.length)) * 100);
    const uIdx = book.units.findIndex((u) => u.id === unit.id);
    const nextUnit = book.units[uIdx + 1];
    const nextBook = !nextUnit ? HS_BOOKS[HS_BOOKS.findIndex((b) => b.id === book.id) + 1] : null;
    fanfare(tb('spotDone'));
    clearSessionRepaint();
    app.innerHTML = `
      ${topbar()}
      <div class="screen">
        <div class="screen-header">${backBtn('hs-book')}<h2 class="screen-title">${tb('spotDone')}</h2></div>
        <div class="panel results" style="--pct:${pct}">
          <div class="score-ring">${pct}%</div>
          <h3 class="result-title">${spotCorrect} / ${spotItems.length} ${tb('correctN')}</h3>
          <p>${pct >= 80 ? tb('great') : pct >= 60 ? tb('okish') : tb('keepGoing')}</p>
          <div class="flash-actions">
            ${nextUnit ? `<button class="btn btn-primary" data-hs-unit="${book.id}:${nextUnit.id}">${tb('hsNextUnit')}</button>` : ''}
            ${nextBook ? `<button class="btn btn-primary" data-hs-book="${nextBook.id}">${tb('hsNextBook')}</button>` : ''}
            <button class="btn" data-hs-book="${book.id}">${escapeHtml(hsBookTitle(book))}</button>
            <button class="btn" data-nav="hs-shelf">${tb('hsToShelf')}</button>
          </div>
          ${quizModeButtons()}
        </div>
      </div>`;
    bindQuizModeButtons(words, bank, { back: 'hs-book', srsKind: 'hs' });
  }

  paint();
}

/* —— Router —— */
const routes = {
  home: renderHome,
  days: renderDays,
  flash: renderFlash,
  match: renderMatch,
  mcq: () => renderQuiz('mcq'),
  tf: () => renderQuiz('tf'),
  mixed: () => renderQuiz('mixed'),
  periodic: renderPeriodic,
  mass: renderMass,
  wrong: renderWrong,
  progress: renderProgress,
  srs: renderSrsReview,
  'wrong-quiz': () => renderWrongQuiz('all'),
  'ielts-days': renderIeltsDays,
  'ielts-go': async () => {
    await needIelts();
    const n = (ieltsDays.find((d) => !isIeltsDayDone(d.day)) || ieltsDays[0]).day;
    await startIeltsDay(n);
  },
  'ielts-day': async () => {},
  'ielts-spot': renderIeltsFreeSpot,
  'ielts-dictation': () => renderIeltsWordDrill('dictation'),
  'ielts-cloze': () => renderIeltsWordDrill('cloze'),
  'ielts-match': () => renderIeltsWordDrill('match'),
  'hs-shelf': renderHsShelf,
  'hs-book': () => renderHsBook(hsActiveBook),
  'hs-unit': () => startHsUnit(hsActiveBook, hsActiveUnit),
  'science-day': async () => {},
  'cn-list': renderChineseList,
  'cn-flash': () => renderSubjectFlash('chinese'),
  'cn-quiz': () => renderSubjectQuiz('chinese'),
  'math-flash': () => renderSubjectFlash('math'),
  'math-quiz': () => renderSubjectQuiz('math'),
  'hub-chinese': () => renderHub('chinese'),
  'hub-math': () => renderHub('math'),
  'hub-english': () => renderHub('english'),
  'hub-physics': () => renderHub('physics'),
  'hub-chemistry': () => renderHub('chemistry'),
  'hub-biology': () => renderHub('biology'),
};

async function dispatchRoute(route) {
  const { name, params } = route || { name: 'home', params: {} };
  currentRoute = name;
  if (name === 'ielts-day') {
    await startIeltsDay(Number(params.day) || 1);
    return;
  }
  if (name === 'science-day') {
    await startDayPractice(Number(params.day) || 1);
    return;
  }
  if (name === 'hs-book') {
    hsActiveBook = params.book || hsActiveBook;
    await renderHsBook(hsActiveBook);
    return;
  }
  if (name === 'hs-unit') {
    hsActiveBook = params.book || hsActiveBook;
    hsActiveUnit = params.unit || hsActiveUnit;
    await startHsUnit(hsActiveBook, hsActiveUnit);
    return;
  }
  if (name === 'wrong-quiz') {
    renderWrongQuiz(params.subject || 'all');
    return;
  }
  const fn = routes[name] || renderHome;
  await fn();
}

function bindNav() {
  // 事件委托已接管
}

app.addEventListener('click', (e) => {
  const langBtn = e.target.closest('[data-lang]');
  if (langBtn && app.contains(langBtn)) {
    e.preventDefault();
    setLang(langBtn.getAttribute('data-lang'));
    try {
      sfxClick();
    } catch (_) {}
    if (sessionRepaint) sessionRepaint();
    else softChromeRefresh();
    return;
  }
  const sfxBtn = e.target.closest('[data-sfx-toggle]');
  if (sfxBtn && app.contains(sfxBtn)) {
    e.preventDefault();
    toggleSfx();
    try {
      unlockAudio();
      sfxClick();
    } catch (_) {}
    if (sessionRepaint) sessionRepaint();
    else softChromeRefresh();
    return;
  }
  const qlevelBtn = e.target.closest('[data-qlevel]');
  if (qlevelBtn && app.contains(qlevelBtn)) {
    e.preventDefault();
    quizLevel = qlevelBtn.getAttribute('data-qlevel') === 'all' ? 'all' : 'core';
    save();
    try {
      sfxClick();
    } catch (_) {}
    if (sessionRepaint) sessionRepaint();
    else navigate(currentRoute);
    return;
  }
  const hubBtn = e.target.closest('[data-hub]');
  if (hubBtn && app.contains(hubBtn)) {
    e.preventDefault();
    e.stopPropagation();
    try {
      unlockAudio();
    } catch (_) {}
    try {
      sfxClick();
    } catch (_) {}
    navigate('hub-' + hubBtn.getAttribute('data-hub'));
    return;
  }
  const ieltsBtn = e.target.closest('[data-ielts-day]');
  if (ieltsBtn && app.contains(ieltsBtn)) {
    e.preventDefault();
    e.stopPropagation();
    try {
      unlockAudio();
    } catch (_) {}
    try {
      sfxClick();
    } catch (_) {}
    const n = Number(ieltsBtn.getAttribute('data-ielts-day'));
    navigate('ielts-day', { day: n });
    return;
  }
  const hsBookBtn = e.target.closest('[data-hs-book]');
  if (hsBookBtn && app.contains(hsBookBtn)) {
    e.preventDefault();
    e.stopPropagation();
    try {
      unlockAudio();
    } catch (_) {}
    try {
      sfxClick();
    } catch (_) {}
    hsActiveBook = hsBookBtn.getAttribute('data-hs-book') || '';
    navigate('hs-book', { book: hsActiveBook });
    return;
  }
  const hsUnitBtn = e.target.closest('[data-hs-unit]');
  if (hsUnitBtn && app.contains(hsUnitBtn)) {
    e.preventDefault();
    e.stopPropagation();
    try {
      unlockAudio();
    } catch (_) {}
    try {
      sfxClick();
    } catch (_) {}
    const raw = hsUnitBtn.getAttribute('data-hs-unit') || '';
    const [bookId, unitId] = raw.split(':');
    hsActiveBook = bookId || '';
    hsActiveUnit = unitId || '';
    navigate('hs-unit', { book: hsActiveBook, unit: hsActiveUnit });
    return;
  }
  const dayBtn = e.target.closest('[data-start-day]');
  if (dayBtn && app.contains(dayBtn)) {
    e.preventDefault();
    e.stopPropagation();
    const n = Number(dayBtn.getAttribute('data-start-day'));
    try {
      unlockAudio();
    } catch (_) {
      /* ignore */
    }
    try {
      sfxClick();
    } catch (_) {
      /* ignore */
    }
    navigate('science-day', { day: n });
    return;
  }
  const navEl = e.target.closest('[data-nav]');
  if (!navEl || !app.contains(navEl)) return;
  e.preventDefault();
  const extra = {};
  if (navEl.dataset.wrongSub) extra.subject = navEl.dataset.wrongSub;
  navigate(navEl.dataset.nav, extra);
});

async function go(fn) {
  if (!app) return;
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  app.classList.remove('page-enter');
  void app.offsetWidth;
  await fn();
  requestAnimationFrame(() => {
    app.classList.add('page-enter');
    bindMagneticCards();
  });
}

async function navigate(name, params = {}) {
  try {
    unlockAudio();
  } catch (_) {
    /* ignore */
  }
  try {
    sfxClick();
  } catch (_) {
    /* ignore */
  }
  clearSessionRepaint();
  if (router) {
    await router.go(name, params);
    return;
  }
  await go(() => dispatchRoute({ name, params }));
}

function scienceBackTarget() {
  const hub = store.activeHub;
  if (['physics', 'chemistry', 'biology'].includes(hub)) return 'hub-' + hub;
  return 'home';
}

function bindMagneticCards() {
  if (prefersReducedMotion()) return;
  if (window.matchMedia && window.matchMedia('(max-width: 720px)').matches) return;
  const cards = app.querySelectorAll('.hub-card, .mode-card, .day-card, .en-track, .hs-unit-row');
  cards.forEach((card) => {
    if (card.dataset.magnetic === '1') return;
    card.dataset.magnetic = '1';
    card.addEventListener(
      'pointermove',
      (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty('--mx', `${px * 10}deg`);
        card.style.setProperty('--my', `${-py * 8}deg`);
        card.style.setProperty('--gx', `${(px + 0.5) * 100}%`);
        card.style.setProperty('--gy', `${(py + 0.5) * 100}%`);
        card.classList.add('magnetic');
      },
      { passive: true }
    );
    card.addEventListener('pointerleave', () => {
      card.classList.remove('magnetic');
      card.style.removeProperty('--mx');
      card.style.removeProperty('--my');
      card.style.removeProperty('--gx');
      card.style.removeProperty('--gy');
    });
  });
}

app.addEventListener(
  'click',
  (e) => {
    const btn = e.target.closest('.wg-opt, .match-item, .choice-btn, [data-v], [data-i]');
    if (!btn || !app.contains(btn)) return;
    requestAnimationFrame(() => {
      if (btn.classList.contains('correct') || btn.classList.contains('wrong')) {
        btn.classList.add('answer-impact');
      }
    });
  },
  true
);

const _mo = new MutationObserver(() => {
  if (app.querySelector('.hub-card, .mode-card, .day-card')) bindMagneticCards();
});
_mo.observe(app, { childList: true, subtree: false });

initCanvas();
document.documentElement.classList.add('motion-ready');
router = startRouter(async (route) => {
  clearSessionRepaint();
  await go(() => dispatchRoute(route));
});
router.start();
