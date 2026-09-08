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
  nextArrow: { zh: '下一题 → · 回车', en: 'Next → · Enter' },
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
  chineseFlash: { zh: '古诗文背诵', en: 'Recite classics' },
  chineseQuiz: { zh: '古诗文小测', en: 'Classics quiz' },
  chineseList: { zh: '篇目一览', en: 'Works list' },
  chineseListHint: { zh: '按年级浏览必备古诗古文', en: 'Browse required classics by grade' },
  chineseFlashHint: { zh: '看篇名，想名句与大意', en: 'See title — recall lines & meaning' },
  chineseQuizHint: { zh: '默写 · 理解 · 常识', en: 'Dictation · meaning · facts' },
  gradeAll: { zh: '全部年级', en: 'All grades' },
  grade7: { zh: '七年级', en: 'Grade 7' },
  grade8: { zh: '八年级', en: 'Grade 8' },
  grade9: { zh: '九年级', en: 'Grade 9' },
  worksCount: { zh: '篇', en: 'works' },
  keyLines: { zh: '名句', en: 'Key lines' },
  fullText: { zh: '全文 / 节选', en: 'Text' },
  meaningLabel: { zh: '大意', en: 'Meaning' },
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
  speak: { zh: '朗读', en: 'Speak' },
  speakEn: { zh: '读英文', en: 'EN' },
  speakZh: { zh: '读中文', en: 'ZH' },
  speakKeys: { zh: '朗读名句', en: 'Speak keys' },
  speakFull: { zh: '朗读全文', en: 'Speak text' },
  speakCurrent: { zh: '朗读本面', en: 'Speak face' },
  speakOther: { zh: '读另一面', en: 'Other side' },
  glossFallback: { zh: '结合上下文理解', en: 'Read in context' },
  glossHint: { zh: '点字看释义', en: 'Tap a character for gloss' },
  ieltsTrack: { zh: '雅思 Band 7', en: 'IELTS Band 7' },
  ieltsTrackBlurb: {
    zh: '1500 词 · 60 天闪卡与抽查，路径不变',
    en: '1500 words · 60-day flashcards & spot check',
  },
  ieltsTrackModes: { zh: '雅思练习', en: 'IELTS practice' },
  hsTrack: { zh: '高中教材', en: 'High school books' },
  hsTrackBlurb: {
    zh: '人教版 2019 · 7 册选书 · 单词表 + 闪卡背词',
    en: 'PEP 2019 · 7 books · word list + flashcards',
  },
  hsShelf: { zh: '高中英语书架', en: 'High-school bookshelf' },
  hsShelfHint: {
    zh: '点书卡选书，按课本 Unit 看单词表再背诵',
    en: 'Pick a book, open the unit list, then memorize',
  },
  pep2019: { zh: '人教版 2019', en: 'PEP 2019' },
  hsCompulsory: { zh: '必修', en: 'Compulsory' },
  hsSelective: { zh: '选必', en: 'Selective' },
  hsUnits: { zh: '单元', en: 'units' },
  hsLearned: { zh: '已学 {n}/{t} 单元', en: '{n}/{t} units done' },
  unitOf: { zh: 'Unit {n}', en: 'Unit {n}' },
  welcomeUnit: { zh: 'Welcome Unit', en: 'Welcome Unit' },
  hsOpenBook: { zh: '打开这本书', en: 'Open this book' },
  hsToShelf: { zh: '回书架', en: 'Bookshelf' },
  hsNextUnit: { zh: '下一单元 →', en: 'Next unit →' },
  hsNextBook: { zh: '下一册 →', en: 'Next book →' },
  hsWordList: { zh: '单词表', en: 'Word list' },
  hsSpeakWord: { zh: '读单词', en: 'Speak word' },
  hsUsage: { zh: '用法要点', en: 'Usage' },
  hsUsageHint: { zh: '点单词看用法，再点收回', en: 'Tap a word for usage · tap again to close' },
  hsSearch: { zh: '搜索本单元单词', en: 'Search this unit' },
  progress: { zh: '进度', en: 'Progress' },
  exportProgress: { zh: '导出进度', en: 'Export progress' },
  importProgress: { zh: '导入进度', en: 'Import progress' },
  importOk: { zh: '进度已导入', en: 'Progress imported' },
  importFail: { zh: '导入失败，请检查文件', en: 'Import failed — check the file' },
  todayPlan: { zh: '今日学习', en: "Today's plan" },
  todayReview: { zh: '今日复习', en: "Today's review" },
  dueWords: { zh: '{n} 个到期词', en: '{n} due words' },
  noDue: { zh: '暂无到期词，去学新词吧', en: 'Nothing due — learn something new' },
  studyStreak: { zh: '连续学习 {n} 天', en: '{n}-day study streak' },
  nextHs: { zh: '高中下一单元', en: 'Next HS unit' },
  nextSci: { zh: '理科下一关', en: 'Next science day' },
  startReview: { zh: '开始复习 →', en: 'Review →' },
  dictation: { zh: '听写', en: 'Dictation' },
  dictationHint: { zh: '听发音，写出英文单词', en: 'Listen, then spell the word' },
  cloze: { zh: '挖空', en: 'Cloze' },
  clozeHint: { zh: '根据例句选出缺的单词', en: 'Pick the missing word' },
  enMatch: { zh: '英汉配对', en: 'Match' },
  typeAnswer: { zh: '在此输入拼写', en: 'Type the spelling' },
  check: { zh: '核对', en: 'Check' },
  hearAgain: { zh: '再听一遍', en: 'Hear again' },
  retest: { zh: '再测一轮', en: 'Retest' },
  retestHint: { zh: '连对两次才移出错题本', en: 'Two correct in a row to remove' },
  filterSubject: { zh: '学科', en: 'Subject' },
  masteredRemove: { zh: '已掌握，移除', en: 'Mastered, remove' },
  clearWrong: { zh: '清空', en: 'Clear all' },
  winNeed: { zh: '再对 {n} 次可移除', en: '{n} more correct to remove' },
  quizMode: { zh: '练习方式', en: 'Mode' },
  hubDone: { zh: '完成度', en: 'Progress' },
  clipVideo: { zh: '看例句视频', en: 'Example clip' },
  clipVideoFor: { zh: '看「{word}」的例句视频', en: 'See “{word}” in video' },
  clipHint: { zh: '点开后自动播放真人例句，不用再按播放', en: 'Tap once — it plays here, no extra Play tap' },
  clipMemorizeHint: { zh: '点「开始背词」后，每张卡都能看这个词的例句视频', en: 'After Start, each card has a clip for that word' },
  clipListHint: { zh: '点开任意单词，可看这个词的真人例句视频', en: 'Open any word to watch its real-speech clip' },
  clipReplay: { zh: '重播', en: 'Replay' },
  clipNext: { zh: '下一条', en: 'Next clip' },
  clipUnavailable: { zh: '当前网络无法加载视频，已为你朗读这个词', en: 'Video isn’t available; the word was spoken instead' },
  speakCheckFor: { zh: '读「{word}」', en: 'Say “{word}”' },
  speakCheckHint: { zh: '对着麦克风读这个词，看能不能听清', en: 'Say the word into the mic to check your pronunciation' },
  speakCheckListening: { zh: '正在听…', en: 'Listening…' },
  speakCheckPass: { zh: '读对了', en: 'That’s it' },
  speakCheckRetry: { zh: '听到的是「{heard}」，再试一次', en: 'Heard “{heard}”. Try again' },
  speakCheckMiss: { zh: '没听清，再试一次', en: 'Didn’t catch that. Try again' },
  speakCheckUnavailable: { zh: '这次没法听写，先听正确发音', en: 'Listening isn’t available; here’s the model pronunciation' },
  speakCheckMemorizeHint: { zh: '点「开始背词」后，每张卡都能跟读这个词', en: 'After Start, each card lets you say the word aloud' },
  speakCheckListHint: { zh: '点开任意单词，可跟读检查发音', en: 'Open any word to check your pronunciation' },
  amcTrack: { zh: 'AMC-C 澳洲数学竞赛', en: 'AMC-C Australian Maths' },
  amcTrackBlurb: {
    zh: '八年级 C 卷 · 赛制 · 历年卷目 · 整卷模考与解析',
    en: 'Grade 8 Paper C · format · archive · full mocks with solutions',
  },
  amcClassTrack: { zh: '课内数学', en: 'Classroom math' },
  amcClassBlurb: {
    zh: '一次函数 · 方程 · 三角形 · 概念卡与小测',
    en: 'Linear · equations · triangles · cards and quiz',
  },
  amcTitle: { zh: 'AMC-C 专题', en: 'AMC-C track' },
  amcLead: {
    zh: '澳大利亚数学竞赛 Australian Mathematics Competition。国内八年级对应 C 卷（澳洲 Junior，7–8 年级）。九年级也可练 C，并逐步接触 Intermediate。',
    en: 'Australian Mathematics Competition. Grade 8 maps to Paper C / Junior (AU Years 7–8). Year 9 can still train on C, then Intermediate.',
  },
  amcOfficial: { zh: '官方入口', en: 'Official links' },
  amcDates: { zh: '本校报名信息（2026）', en: 'School registration (2026)' },
  amcDatesNote: {
    zh: '以上为本校所在赛区（中国 / 香港）的 2026 年 10 月场报名信息。AMT 官方澳洲场为 8 月，仅供参考。',
    en: 'These are the 2026 October sitting details for this school’s region (China / HK). The AMT official Australian August window is for reference only.',
  },
  amcDeadline: { zh: '报名截止', en: 'Closes' },
  amcExamDate: { zh: '考试日期', en: 'Exam' },
  amcPromo: {
    zh: 'AMC 已举办 49 年，覆盖 32 个国家和地区、超 1600 万名学生，是全球规模最大的校际数学测评之一。',
    en: '49 years running, across 32 countries and regions, with over 16 million students — one of the world’s largest inter-school maths competitions.',
  },
  amcFormat: { zh: 'C 卷赛制', en: 'Paper C format' },
  amcFormatBody: {
    zh: '中学卷 75 分钟 · 30 题（25 道 A–E 选择题 + 5 道 0–999 整数题）· 禁止计算器 · 答错不扣分。分值：1–10 题各 3 分，11–20 各 4 分，21–25 各 5 分，26–30 依次 6、7、8、9、10 分，满分 135。',
    en: 'Secondary paper: 75 minutes · 30 questions (25 A–E multiple-choice + 5 integers 0–999) · no calculator · no penalty. Marks: Q1–10 worth 3, Q11–20 worth 4, Q21–25 worth 5, Q26–30 worth 6–10. Total 135.',
  },
  amcArchive: { zh: '历年 C 卷目录', en: 'Past Paper C index' },
  amcArchiveHint: {
    zh: '真题受澳大利亚数学信托基金会版权保护，本站不托管试卷 PDF。请用学校发放的纸质/加密包，或从 AMT 商店购买。下面按年份列出你手头这套资料对应的卷名。',
    en: 'Past papers are copyright AMT — this site does not host the PDFs. Use your school pack or buy from the AMT shop. Years below match the C-paper set you already have.',
  },
  amcHasKey: { zh: '有答案', en: 'Answer key' },
  amcHasSol: { zh: '有详解', en: 'Worked solutions' },
  amcAllDivSol: { zh: '全等级解答', en: 'All-division solutions' },
  amcNoSol: { zh: '本包仅试卷', en: 'Paper only in pack' },
  amcQs: { zh: '30 题', en: '30 Qs' },
  amcMins: { zh: '75 分钟', en: '75 min' },
  amcPractice: { zh: '原创整卷模考', en: 'Original mock papers' },
  amcPracticeHint: {
    zh: '题目为 Tom’s Ground 原创，风格对齐 C/Junior：有图用矢量图，交卷后每题都有英文解析与中文提示。共 10 套完整 30 题卷 + 几何 / 整数冲刺，题量与历年真题相当。',
    en: 'Original Tom’s Ground items in C/Junior style. Diagrams are vector-sharp. Every question has an English solution plus a Chinese hint. 10 full 30-question papers plus geometry / integer sprints — on par with the past papers.',
  },
  amcContest: { zh: '整卷模考', en: 'Exam mode' },
  amcPracticeMode: { zh: '逐题讲评', en: 'Practice mode' },
  amcSubmit: { zh: '交卷', en: 'Submit' },
  amcSubmitHint: { zh: '还有 {n} 题没答，确定交卷？', en: '{n} blank — submit anyway?' },
  amcSubmitEmpty: { zh: '确定交卷并查看解析？', en: 'Submit and see solutions?' },
  amcYes: { zh: '交卷看解析', en: 'Submit' },
  amcNo: { zh: '再检查', en: 'Keep going' },
  amcIntHint: { zh: '填 0–999 的整数', en: 'Integer from 0–999' },
  amcSave: { zh: '记下答案', en: 'Save answer' },
  amcTimer: { zh: '剩余', en: 'Time' },
  amcScore: { zh: '得分', en: 'Score' },
  amcOf: { zh: '分', en: 'marks' },
  amcReview: { zh: '逐题解析', en: 'Worked solutions' },
  amcYour: { zh: '你的答案', en: 'Yours' },
  amcBlank: { zh: '未作答', en: 'Blank' },
  amcJump: { zh: '跳题', en: 'Jump' },
  amcPrevQ: { zh: '上一题', en: 'Previous' },
  amcNextQ: { zh: '下一题', en: 'Next' },
  amcOpenOfficial: { zh: '打开官方链接', en: 'Open official link' },
  amcAward: {
    zh: '奖项按年段与地区划线：参与、熟练、及格（约前 55%）、优秀（约前 20%）、高优（约前 3%）等。详见 AMT 主页。',
    en: 'Awards are cut by year and region: Participation, Proficiency, Credit (~top 55%), Distinction (~top 20%), High Distinction (~top 3%). See AMT.',
  },
}

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
