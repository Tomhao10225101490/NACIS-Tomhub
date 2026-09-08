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
    id: 'home',
    zh: 'AMT 官方 AMC 主页',
    en: 'AMT AMC home',
    href: 'https://www.amt.edu.au/amc',
  },
  {
    id: 'register',
    zh: '学校报名入口',
    en: 'School registration',
    href: 'https://www.amt.edu.au/competitions',
  },
  {
    id: 'datesPdf',
    zh: '2026 关键日期表（PDF）',
    en: '2026 key dates (PDF)',
    href: 'https://amt.edu.au/wp-content/uploads/2025/2026-Competitions-and-Programs-Key-Dates-Calendar.pdf',
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
    id: 'twoYear',
    zh: '近两年真题 PDF 包',
    en: '2-year past-paper PDF pack',
    href: 'https://shop.amt.edu.au/products/amc-past-papers-2-year-pack',
  },
  {
    id: 'juniorSample',
    zh: '官方 Junior 样题 + 解答（PDF）',
    en: 'Official Junior sample + solutions (PDF)',
    href: 'https://www.amt.edu.au/wp-content/uploads/2019/05/AMC-practice-problems-solutions-Set1-JUN.pdf',
  },
];

export const AMC_DATES_2026 = [
  { zh: '比赛窗口', en: 'Competition window', valueZh: '2026 年 8 月 4–6 日（周二至周四）', valueEn: 'Tue 4 – Thu 6 August 2026' },
  { zh: '国际纸质报名截止', en: 'International paper entries close', valueZh: '2026 年 6 月 26 日', valueEn: 'Friday 26 June 2026' },
  { zh: '线上报名截止', en: 'Online entries close', valueZh: '2026 年 7 月 31 日', valueEn: 'Friday 31 July 2026' },
  { zh: '纸质答题卡提交', en: 'Paper answer sheets due', valueZh: '2026 年 8 月 7 日', valueEn: 'Friday 7 August 2026' },
];

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
