/** Public AMC-C / Junior facts, official links, and year-by-year archive index.
 *  Official papers stay off this site (AMT copyright). */

export const AMC_FORMAT = {
  questions: 30,
  mcq: 25,
  integer: 5,
  minutes: 75,
  maxScore: 135,
  calculator: false,
  penalty: false,
};

export const AMC_LINKS = [
  {
    id: 'schoolReg',
    zh: '本校报名资料合集（海报 / 真题 / 考纲 / 学生用书）',
    en: 'School registration pack (poster / past papers / scope / student book)',
    href: 'https://qr61.cn/oZsFH7/qT8TIMr',
  },
  {
    id: 'home',
    zh: 'AMT 官方 AMC 主页',
    en: 'AMT AMC home',
    href: 'https://www.amt.edu.au/amc',
  },
  {
    id: 'register',
    zh: 'AMT 学校报名入口',
    en: 'AMT school registration',
    href: 'https://www.amt.edu.au/competitions',
  },
  {
    id: 'handbook',
    zh: '2026 竞赛手册（赛制）',
    en: '2026 competitions handbook',
    href: 'https://amt.edu.au/wp-content/uploads/2026/2026-Competitions-Handbook.pdf',
  },
  {
    id: 'shop',
    zh: '官方商店 · 真题与解答',
    en: 'AMT shop · papers & solutions',
    href: 'https://shop.amt.edu.au/collections/amc-resources',
  },
  {
    id: 'juniorSample',
    zh: '官方 Junior 样题 + 解答（PDF）',
    en: 'Official Junior sample + solutions (PDF)',
    href: 'https://www.amt.edu.au/wp-content/uploads/2019/05/AMC-practice-problems-solutions-Set1-JUN.pdf',
  },
];

/** School (China / HK region) sitting for 2026 — the registration the user joins. */
export const AMC_DATES_2026 = [
  { zh: '报名截止', en: 'Registration closes', valueZh: '2026 年 9 月 28 日', valueEn: '28 September 2026' },
  { zh: '考试日期', en: 'Competition date', valueZh: '2026 年 10 月 11 日（周日）', valueEn: 'Sunday 11 October 2026' },
  { zh: 'C / D / E 等级时间', en: 'Levels C / D / E time', valueZh: '14:00 – 15:15（75 分钟）', valueEn: '14:00 – 15:15 (75 min)' },
  { zh: 'A / B 等级时间', en: 'Levels A / B time', valueZh: '10:00 – 11:00（60 分钟）', valueEn: '10:00 – 11:00 (60 min)' },
  { zh: 'Pre-A 等级时间', en: 'Level Pre-A time', valueZh: '10:00 – 10:50（50 分钟）', valueEn: '10:00 – 10:50 (50 min)' },
  { zh: '地点', en: 'Location', valueZh: '学校考试 / 居家在线', valueEn: 'School exam / online at home' },
  { zh: '费用', en: 'Fee', valueZh: '每人 322 港币 / 280 元人民币', valueEn: '322 HKD / 280 RMB per student' },
  { zh: '资格', en: 'Eligibility', valueZh: '1–12 年级，分 6 个难度等级', valueEn: 'Grades 1–12, 6 difficulty levels' },
  { zh: '形式', en: 'Format', valueZh: '个人 · 选择题 + 填空题', valueEn: 'Individual · MCQ + fill-in' },
];

/** AMT official Australian sitting window — for reference only. */
export const AMC_AMT_WINDOW = [
  { zh: 'AMT 官方比赛窗口（澳洲）', en: 'AMT official window (Australia)', valueZh: '2026 年 8 月 4–6 日', valueEn: 'Tue 4 – Thu 6 August 2026' },
];

export const AMC_PROMO = {
  historyYears: 49,
  studentsMillions: 16,
  countries: 32,
};

/** School-pack archive: C paper = Junior (AU Y7–8). Metadata only. */
export const AMC_ARCHIVE = [
  { year: 2025, paper: 'C', file: '2025 AMC Paper-C', solutions: '2025 AMC Solution-C', solutionsKind: 'C' },
  { year: 2024, paper: 'C', file: '2024 AMC Paper-C', solutions: '2024 AMC Solution-C', solutionsKind: 'C' },
  { year: 2023, paper: 'C', file: '2023 AMC Paper-C', solutions: '2023 AMC Solutions（所有等级）', solutionsKind: 'all' },
  { year: 2022, paper: 'C', file: '2022 AMC paper-C', solutions: '2022 AMC Solutions（所有等级）', solutionsKind: 'all' },
  { year: 2021, paper: 'C', file: '2021 AMC paper-C', solutions: '2021 AMC answers', solutionsKind: 'key' },
  { year: 2020, paper: 'C', file: '2020C 试卷', solutions: '2020 AMC answers', solutionsKind: 'key' },
  { year: 2019, paper: 'C', file: '2019C 试卷', solutions: '2019 AMC answers', solutionsKind: 'key' },
  { year: 2018, paper: 'C', file: '2018C 试卷', solutions: null, solutionsKind: 'none' },
  { year: 2017, paper: 'C', file: '2017C 试卷', solutions: null, solutionsKind: 'none' },
  { year: 2016, paper: 'C', file: '2016C 试卷', solutions: null, solutionsKind: 'none' },
];
