/** Alex Practice · i18n (zh / en / both) */
const LANG_KEY = 'alex_lang';

/** @typedef {'zh' | 'en' | 'both'} Lang */

/** @type {Lang} */
let lang = /** @type {Lang} */ (localStorage.getItem(LANG_KEY) || 'both');
if (!['zh', 'en', 'both'].includes(lang)) lang = 'both';

const dict = {
  gradeKicker: { zh: '八年级理科', en: 'Grade 8 Science' },
  brand: { zh: 'Alex 练习', en: 'Alex Practice' },
  xp: { zh: '经验', en: 'XP' },
  days: { zh: '天数', en: 'Days' },
  back: { zh: '← 返回', en: '← Back' },
  heroSub: {
    zh: '上海诺达 NACIS · 八年级理科拔尖 · 中英双语 · Wayground 风格刷题',
    en: 'NACIS Shanghai · Grade 8 science stretch · bilingual · Wayground-style drills',
  },
  todayLabel: { zh: '今日推荐', en: "Today's pick" },
  startDay: { zh: '开始 Day', en: 'Start Day' },
  allDays: { zh: '全部天数', en: 'All days' },
  moreModes: { zh: '更多练习', en: 'More modes' },
  dailyDays: { zh: '每日闯关', en: 'Daily Days' },
  dailyDaysDesc: {
    zh: 'Day 1→{n} 拔尖一条龙：每天 ≈36 词 + ≈28 题。',
    en: 'Day 1→{n} pipeline: ≈36 words + ≈28 questions each day.',
  },
  flashcards: { zh: '闪卡', en: 'Flashcards' },
  flashDesc: { zh: '专有名词英汉闪卡。', en: 'Bilingual science flashcards.' },
  match: { zh: '配对', en: 'Match' },
  matchDesc: { zh: '英汉配对对战风。', en: 'EN–ZH matching challenge.' },
  mcq: { zh: '选择题', en: 'MCQ' },
  mcqDesc: { zh: '中英双语选择题。', en: 'Bilingual multiple choice.' },
  tf: { zh: '判断题', en: 'True / False' },
  tfDesc: { zh: '中英双语判断题。', en: 'Bilingual true or false.' },
  periodic: { zh: '周期表', en: 'Periodic Table' },
  periodicDesc: { zh: '标准周期表 + 元素小测。', en: 'Full table + element quiz.' },
  mass: { zh: '相对质量', en: 'Ar / Mr' },
  massDesc: { zh: '相对原子 / 分子质量。', en: 'Relative atomic / molecular mass.' },
  wrongBook: { zh: '错题本', en: 'Wrong Book' },
  wrongDesc: { zh: '错题本本地复习。', en: 'Review saved mistakes locally.' },
  words: { zh: '词', en: 'words' },
  questions: { zh: '题', en: 'Qs' },
  done: { zh: '已完成', en: 'Done' },
  start: { zh: '开始 →', en: 'Start →' },
  daysIntro: {
    zh: '对齐上海诺达八年级课标 · 每天 ≈36 词 + ≈28 题 · 单词 → 小测 → 选择/判断',
    en: 'Aligned to NACIS Grade 8 · ≈36 words + ≈28 Qs/day · Words → Quiz → MCQ/TF',
  },
  pipeline: { zh: '开始一条龙 →', en: 'Start pipeline →' },
  stepWords: { zh: '1 单词', en: '1 Words' },
  stepQuiz: { zh: '2 小测', en: '2 Quiz' },
  stepQs: { zh: '3 题目', en: '3 Questions' },
  prev: { zh: '上一张', en: 'Prev' },
  flip: { zh: '翻转', en: 'Flip' },
  next: { zh: '下一张', en: 'Next' },
  toQuiz: { zh: '去小测 →', en: 'To quiz →' },
  tapFlip: { zh: '点击翻转', en: 'Tap to flip' },
  correctN: { zh: '正确', en: 'Correct' },
  nextArrow: { zh: '下一题 →', en: 'Next →' },
  correctBanner: { zh: '正确！', en: 'Correct!' },
  incorrectBanner: { zh: '不正确', en: 'Incorrect' },
  answerLabel: { zh: '答案：', en: 'Answer: ' },
  trueOpt: { zh: '正确', en: 'True' },
  falseOpt: { zh: '错误', en: 'False' },
  dayDone: { zh: '本关完成', en: 'Day complete' },
  nextDay: { zh: '下一天 →', en: 'Next day →' },
  home: { zh: '回首页', en: 'Home' },
  results: { zh: '结果', en: 'Results' },
  again: { zh: '再来一轮', en: 'Try again' },
  goWrong: { zh: '去错题本', en: 'Wrong book' },
  great: { zh: '太棒了！继续保持。', en: 'Great job — keep it up!' },
  okish: { zh: '不错，错题再巩固一下。', en: 'Solid — review misses once more.' },
  keepGoing: { zh: '加油，打开错题本复习！', en: 'Keep going — review the wrong book!' },
  physics: { zh: '物理', en: 'Physics' },
  biology: { zh: '生物', en: 'Biology' },
  chemistry: { zh: '化学', en: 'Chemistry' },
  all: { zh: '综合', en: 'All' },
  stretchTag: { zh: '拔高 · IGCSE', en: 'Stretch · IGCSE' },
  coreTag: { zh: '课标核心', en: 'Core' },
  filterCore: { zh: '课标核心', en: 'Core only' },
  filterAll: { zh: '含拔高', en: 'Include stretch' },
  langZh: { zh: '中', en: '中' },
  langEn: { zh: 'EN', en: 'EN' },
  langBoth: { zh: '双语', en: 'Both' },
  soundOn: { zh: '音效开', en: 'SFX on' },
  soundOff: { zh: '音效关', en: 'SFX off' },
  lessonLoad: { zh: '本课约', en: 'This day ≈' },
  plus: { zh: '+', en: '+' },
  emptyWrong: { zh: '暂无错题，继续保持！', en: 'No wrong answers yet — nice!' },
  clearWrong: { zh: '移出', en: 'Remove' },
};

/**
 * @param {keyof typeof dict} key
 * @param {Record<string, string|number>} [vars]
 */
export function t(key, vars = {}) {
  const row = dict[key];
  if (!row) return String(key);
  let s = lang === 'en' ? row.en : lang === 'zh' ? row.zh : `${row.zh} · ${row.en}`;
  // For both mode on short labels, prefer zh with en only when useful — keep compact for UI chrome
  if (lang === 'both') {
    // Prefer Chinese for chrome when both; show EN for bilingual learning surfaces separately
    s = row.zh === row.en ? row.zh : `${row.zh}`;
  }
  return String(s).replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}

/** Compact bilingual chrome when needed */
export function tb(key, vars = {}) {
  const row = dict[key];
  if (!row) return String(key);
  let s;
  if (lang === 'en') s = row.en;
  else if (lang === 'zh') s = row.zh;
  else s = row.zh === row.en ? row.zh : `${row.zh} / ${row.en}`;
  return String(s).replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}

export function getLang() {
  return lang;
}

/** @param {Lang} next */
export function setLang(next) {
  if (!['zh', 'en', 'both'].includes(next)) return lang;
  lang = next;
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';
  return lang;
}

export function cycleLang() {
  const order = /** @type {Lang[]} */ (['both', 'zh', 'en']);
  const i = order.indexOf(lang);
  return setLang(order[(i + 1) % order.length]);
}

/** Split "中文 / English" style bilingual text */
export function splitBilingual(text) {
  const raw = String(text || '').trim();
  if (!raw) return { zh: '', en: '' };
  const parts = raw.split(/\s*\/\s*/);
  if (parts.length >= 2) {
    return { zh: parts[0].trim(), en: parts.slice(1).join(' / ').trim() };
  }
  // Heuristic: CJK vs latin mixed option like "振动 vibration"
  const m = raw.match(/^([\u4e00-\u9fff\u3000-\u303f\uff00-\uffef0-9+\-≈°%（）()，、。；：\s]+?)\s+([A-Za-z].*)$/);
  if (m) return { zh: m[1].trim(), en: m[2].trim() };
  const hasCjk = /[\u4e00-\u9fff]/.test(raw);
  const hasLat = /[A-Za-z]/.test(raw);
  if (hasCjk && !hasLat) return { zh: raw, en: raw };
  if (!hasCjk && hasLat) return { zh: raw, en: raw };
  return { zh: raw, en: raw };
}

export function localizeText(text) {
  const { zh, en } = splitBilingual(text);
  if (lang === 'zh') return zh || en;
  if (lang === 'en') return en || zh;
  if (zh && en && zh !== en) return `${zh}\n${en}`;
  return zh || en;
}

export function localizeHtml(text) {
  const { zh, en } = splitBilingual(text);
  if (lang === 'zh') return escapeHtml(zh || en);
  if (lang === 'en') return escapeHtml(en || zh);
  if (zh && en && zh !== en) {
    return `<span class="q-zh">${escapeHtml(zh)}</span>\n<span class="q-en">${escapeHtml(en)}</span>`;
  }
  return escapeHtml(zh || en);
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function subjectName(id) {
  const map = { physics: 'physics', biology: 'biology', chemistry: 'chemistry', all: 'all' };
  return t(map[id] || 'all');
}

export function langToggleHtml() {
  const L = getLang();
  return `<div class="lang-toggle" role="group" aria-label="Language">
    <button type="button" class="lang-btn ${L === 'zh' ? 'on' : ''}" data-lang="zh" title="中文">中</button>
    <button type="button" class="lang-btn ${L === 'both' ? 'on' : ''}" data-lang="both" title="Bilingual / 双语">双语</button>
    <button type="button" class="lang-btn ${L === 'en' ? 'on' : ''}" data-lang="en" title="English">EN</button>
  </div>`;
}
