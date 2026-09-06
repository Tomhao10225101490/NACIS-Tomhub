/** Tom's Ground · i18n (zh / en / both) — keys compatible with main + hubs */
const LANG_KEY = 'toms_lang';

/** @typedef {'zh' | 'en' | 'both'} Lang */
/** @type {Lang} */
let lang = /** @type {Lang} */ (localStorage.getItem(LANG_KEY) || 'both');
if (!['zh', 'en', 'both'].includes(lang)) lang = 'both';

const dict = {
  gradeKicker: { zh: '上海诺达 · 八年级', en: 'NACIS · Grade 8' },
  brand: { zh: "Tom's Ground", en: "Tom's Ground" },
  xp: { zh: '经验', en: 'XP' },
  days: { zh: '天数', en: 'Days' },
  back: { zh: '← 返回', en: '← Back' },
  heroSub: {
    zh: '上海诺达 NACIS · 八年级全科拔尖 · 语数英 · 理化生',
    en: 'NACIS Shanghai · Grade 8 all-subject stretch',
  },
  portalKicker: { zh: "欢迎来到 Tom's Ground", en: "Welcome to Tom's Ground" },
  pickSubject: { zh: '选择学科', en: 'Choose a subject' },
  pickSubjectSub: {
    zh: '点进学科，开启专属练习与每日闯关',
    en: 'Open a subject hub for daily drills',
  },
  hubModes: { zh: '本学科练习', en: 'Subject modes' },
  todayLabel: { zh: '今日推荐', en: "Today's pick" },
  todayIelts: { zh: '今日雅思 · 25 词', en: "Today's IELTS · 25 words" },
  startDay: { zh: '开始 Day', en: 'Start Day' },
  allDays: { zh: '全部天数', en: 'All days' },
  moreModes: { zh: '更多练习', en: 'More modes' },
  dailyDays: { zh: '每日闯关', en: 'Daily Days' },
  dailyDaysDesc: {
    zh: 'Day 1→{n} 拔尖一条龙',
    en: 'Day 1→{n} pipeline',
  },
  daysIntro: {
    zh: '对齐上海诺达八年级课标',
    en: 'Aligned to NACIS Grade 8',
  },
  flashcards: { zh: '闪卡', en: 'Flashcards' },
  flashDesc: { zh: '专有名词英汉闪卡', en: 'Bilingual flashcards' },
  match: { zh: '配对', en: 'Match' },
  matchDesc: { zh: '英汉配对', en: 'EN–ZH matching' },
  mcq: { zh: '选择题', en: 'MCQ' },
  mcqDesc: { zh: '中英双语选择题', en: 'Bilingual MCQ' },
  tf: { zh: '判断题', en: 'True / False' },
  tfDesc: { zh: '中英双语判断题', en: 'Bilingual T/F' },
  periodic: { zh: '周期表', en: 'Periodic Table' },
  periodicDesc: { zh: '标准周期表 + 元素小测', en: 'Table + element quiz' },
  mass: { zh: '相对质量', en: 'Ar / Mr' },
  table: { zh: '周期表', en: 'Table' },
  drill: { zh: '专项练', en: 'Drill' },
  wordsStep: { zh: '单词', en: 'Words' },
  quizStep: { zh: '小测', en: 'Quiz' },
  questionsStep: { zh: '题目', en: 'Questions' },

  massDesc: { zh: '相对原子 / 分子质量', en: 'Relative mass drill' },
  wrongBook: { zh: '错题本', en: 'Wrong Book' },
  wrongDesc: { zh: '错题本本地复习', en: 'Review mistakes' },
  words: { zh: '词', en: 'words' },
  questions: { zh: '题', en: 'Qs' },
  done: { zh: '已完成', en: 'Done' },
  start: { zh: '开始 →', en: 'Start →' },
  pipeline: { zh: '开始一条龙 →', en: 'Start pipeline →' },
  prev: { zh: '上一张', en: 'Prev' },
  flip: { zh: '翻转', en: 'Flip' },
  next: { zh: '下一张', en: 'Next' },
  nextArrow: { zh: '下一题 →', en: 'Next →' },
  nextDay: { zh: '下一天 →', en: 'Next day →' },
  toSpot: { zh: '去抽查 →', en: 'Spot check →' },
  tapFlip: { zh: '空格翻转 · 回车下一张', en: 'Space flip · Enter next' },
  meaning: { zh: '释义', en: 'Meaning' },
  correctBanner: { zh: '正确！', en: 'Correct!' },
  incorrectBanner: { zh: '不正确', en: 'Incorrect' },
  answerLabel: { zh: '答案：', en: 'Answer: ' },
  trueOpt: { zh: '正确 True', en: 'True' },
  falseOpt: { zh: '错误 False', en: 'False' },
  home: { zh: '回首页', en: 'Home' },
  results: { zh: '结果', en: 'Results' },
  again: { zh: '再来一轮', en: 'Try again' },
  great: { zh: '太棒了！继续保持。', en: 'Great job!' },
  okish: { zh: '不错，错题再巩固。', en: 'Solid — review misses.' },
  keepGoing: { zh: '加油，打开错题本！', en: 'Keep going!' },
  lessonLoad: { zh: '本课约', en: 'This day ≈' },
  plus: { zh: '+', en: '+' },
  physics: { zh: '物理', en: 'Physics' },
  biology: { zh: '生物', en: 'Biology' },
  chemistry: { zh: '化学', en: 'Chemistry' },
  chinese: { zh: '语文', en: 'Chinese' },
  math: { zh: '数学', en: 'Math' },
  english: { zh: '英语', en: 'English' },
  all: { zh: '综合', en: 'All' },
  stretchTag: { zh: '拔高 · IGCSE', en: 'Stretch · IGCSE' },
  filterCore: { zh: '课标核心', en: 'Core only' },
  filterAll: { zh: '含拔高', en: 'Include stretch' },
  soundOn: { zh: '音效开', en: 'SFX on' },
  soundOff: { zh: '音效关', en: 'SFX off' },
  band7: { zh: '雅思 7 分 · 1500 词 / 60 天', en: 'IELTS Band 7 · 1500 words / 60 days' },
  words25: { zh: '每天 25 词', en: '25 words / day' },
  ieltsDays: { zh: '雅思 60 Days', en: 'IELTS 60 Days' },
  ieltsMemorize: { zh: '背诵闪卡', en: 'Memorize' },
  ieltsSpot: { zh: '抽查小测', en: 'Spot check' },
  startMemorize: { zh: '开始背诵 →', en: 'Start memorize →' },
  spotHint: { zh: '根据释义选出正确单词', en: 'Pick the word from the definition' },
  dayOf: { zh: '第 {n} 天', en: 'Day {n}' },
  chineseFlash: { zh: '语文闪卡', en: 'Chinese flashcards' },
  chineseQuiz: { zh: '语文小测', en: 'Chinese quiz' },
  mathFlash: { zh: '数学概念卡', en: 'Math concept cards' },
  mathQuiz: { zh: '数学小测', en: 'Math quiz' },
  scienceDays: { zh: '理科 Daily Days', en: 'Science Daily Days' },
  scienceFlash: { zh: '专有名词闪卡', en: 'Term flashcards' },
  scienceMatch: { zh: '英汉配对', en: 'EN–ZH match' },
  scienceMcq: { zh: '选择题', en: 'MCQ' },
  scienceTf: { zh: '判断题', en: 'True / False' },
  example: { zh: '例句', en: 'Example' },
  correctN: { zh: '正确', en: 'Correct' },
  spotDone: { zh: '抽查完成！', en: 'Spot check complete!' },
  memorizeDone: { zh: '背诵完成！', en: 'Memorize complete!' },
  emptyWrong: { zh: '暂无错题，继续保持！', en: 'No wrong answers yet!' },
};

export function t(key, vars = {}) {
  const row = dict[key];
  if (!row) return String(key);
  let s = lang === 'en' ? row.en : row.zh;
  return String(s).replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}

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

export function setLang(next) {
  if (!['zh', 'en', 'both'].includes(next)) return lang;
  lang = next;
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';
  return lang;
}

export function splitBilingual(text) {
  const raw = String(text || '').trim();
  if (!raw) return { zh: '', en: '' };
  const parts = raw.split(/\s*\/\s*/);
  if (parts.length >= 2) return { zh: parts[0].trim(), en: parts.slice(1).join(' / ').trim() };
  const m = raw.match(/^([\u4e00-\u9fff\u3000-\u303f\uff00-\uffef0-9+\-≈°%（）()，、。；：\s]+?)\s+([A-Za-z].*)$/);
  if (m) return { zh: m[1].trim(), en: m[2].trim() };
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
  const esc = (s) =>
    String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  if (lang === 'zh') return esc(zh || en);
  if (lang === 'en') return esc(en || zh);
  if (zh && en && zh !== en) return `<span class="q-zh">${esc(zh)}</span>\n<span class="q-en">${esc(en)}</span>`;
  return esc(zh || en);
}

export function subjectName(id) {
  const map = {
    physics: 'physics',
    biology: 'biology',
    chemistry: 'chemistry',
    chinese: 'chinese',
    math: 'math',
    english: 'english',
    all: 'all',
  };
  return t(map[id] || 'all');
}

export function hubTitle(hub) {
  if (!hub) return '';
  if (lang === 'en') return hub.en;
  if (lang === 'zh') return hub.zh;
  if (hub.zh && hub.en && hub.zh !== hub.en) return `${hub.zh} · ${hub.en}`;
  return hub.zh || hub.en || '';
}

export function hubBlurb(hub) {
  if (!hub) return '';
  if (lang === 'en') return hub.blurbEn || hub.en || '';
  if (lang === 'zh') return hub.blurbZh || hub.zh || '';
  const zh = hub.blurbZh || hub.zh || '';
  const en = hub.blurbEn || hub.en || '';
  if (zh && en && zh !== en) return `${zh} · ${en}`;
  return zh || en;
}

export function langToggleHtml() {
  const L = getLang();
  return `<div class="lang-toggle" role="group" aria-label="Language">
    <button type="button" class="lang-btn ${L === 'zh' ? 'on' : ''}" data-lang="zh">中</button>
    <button type="button" class="lang-btn ${L === 'both' ? 'on' : ''}" data-lang="both">双语</button>
    <button type="button" class="lang-btn ${L === 'en' ? 'on' : ''}" data-lang="en">EN</button>
  </div>`;
}
