/** Unified PEP English textbook shelves.
 *  Levels: pri-g1 (小学一年级起点), pri-g3 (小学三年级起点), mid (初中新目标), hs (高中). */
import { HS_BOOKS } from '../hs-english/meta.js';

export { HS_BOOKS };

function u(id, n, en, zh, wordCount) {
  return { id, n, en, zh, wordCount };
}
function book(id, n, zh, en, accent, spine, units) {
  const wordCount = units.reduce((s, x) => s + (x.wordCount || 0), 0);
  return { id, series: 'pep', seriesZh: '人教版', seriesEn: 'PEP', n, zh, en, accent, spine, wordCount, units };
}
function genUnits(count, per) {
  return Array.from({ length: count }, (_, i) =>
    u(`u${i + 1}`, i + 1, `Unit ${i + 1}`, `第 ${i + 1} 单元`, per)
  );
}

const PRI_G3 = {
  'g3-3a': [['Hello', '你好'], ['My family', '我的家庭'], ['At school', '在学校'], ['My home', '我的家'], ['My body', '我的身体'], ['My classroom', '我的教室']],
  'g3-3b': [['My day', '我的一天'], ['My week', '我的一周'], ['My food', '我的食物'], ['My clothes', '我的衣服'], ['My toys', '我的玩具'], ['My holidays', '我的假期']],
  'g3-4a': [['My classroom', '我的教室'], ['My schoolbag', '我的书包'], ['My friends', '我的朋友'], ['My home', '我的家'], ['Dinner is ready', '晚饭好了'], ['My family', '我的家庭']],
  'g3-4b': [['My school', '我的学校'], ['What time is it?', '几点了'], ['Weather', '天气'], ['At the farm', '在农场'], ['My clothes', '我的衣服'], ['Shopping', '购物']],
  'g3-5a': [['My day', '我的一天'], ['My week', '我的一周'], ['My food', '我的食物'], ['What can you do?', '你会做什么'], ['My room', '我的房间'], ['In a nature park', '在自然公园']],
  'g3-5b': [['My day', '我的一天'], ['My favourite season', '我最喜欢的季节'], ['My school calendar', '我的校历'], ['When is the art show?', '艺术展在何时'], ['Whose dog is it?', '这是谁的狗'], ['Work quietly', '安静工作']],
  'g3-6a': [['How do you go there?', '你怎么去那里'], ['Ways to go to school', '上学的方式'], ['My weekend plan', '我的周末计划'], ['I have a pen pal', '我有一个笔友'], ['What does he do?', '他做什么工作'], ['How do you feel?', '你感觉如何']],
  'g3-6b': [['How tall are you?', '你多高'], ['Last weekend', '上周末'], ['Where did you go?', '你去哪儿了'], ['Then and now', '过去与现在'], ['Changes in me', '我的变化'], ['Farewell', '告别']],
};
const G3_META = [
  ['g3-3a', 1, '三年级上册', 'Grade 3A', '#f472b6', '#be185d', 12],
  ['g3-3b', 2, '三年级下册', 'Grade 3B', '#fb923c', '#c2410c', 12],
  ['g3-4a', 3, '四年级上册', 'Grade 4A', '#facc15', '#a16207', 14],
  ['g3-4b', 4, '四年级下册', 'Grade 4B', '#4ade80', '#15803d', 14],
  ['g3-5a', 5, '五年级上册', 'Grade 5A', '#22d3ee', '#0e7490', 15],
  ['g3-5b', 6, '五年级下册', 'Grade 5B', '#60a5fa', '#1d4ed8', 15],
  ['g3-6a', 7, '六年级上册', 'Grade 6A', '#a78bfa', '#6d28d9', 16],
  ['g3-6b', 8, '六年级下册', 'Grade 6B', '#f472b6', '#9d174d', 16],
];
const PRI_G3_BOOKS = G3_META.map(([id, n, zh, en, accent, spine, per]) =>
  book(id, n, zh, en, accent, spine, PRI_G3[id].map(([e, z], i) => u(`u${i + 1}`, i + 1, e, z, per)))
);

const G1_META = [
  ['g1-1a', 1, '一年级上册', 'Grade 1A', '#fca5a5', '#b91c1c'],
  ['g1-1b', 2, '一年级下册', 'Grade 1B', '#fdba74', '#9a3412'],
  ['g1-2a', 3, '二年级上册', 'Grade 2A', '#fde68a', '#92400e'],
  ['g1-2b', 4, '二年级下册', 'Grade 2B', '#bbf7d0', '#166534'],
  ['g1-3a', 5, '三年级上册', 'Grade 3A', '#bae6fd', '#075985'],
  ['g1-3b', 6, '三年级下册', 'Grade 3B', '#bfdbfe', '#1e40af'],
  ['g1-4a', 7, '四年级上册', 'Grade 4A', '#ddd6fe', '#5b21b6'],
  ['g1-4b', 8, '四年级下册', 'Grade 4B', '#fbcfe8', '#9d174d'],
  ['g1-5a', 9, '五年级上册', 'Grade 5A', '#fed7aa', '#9a3412'],
  ['g1-5b', 10, '五年级下册', 'Grade 5B', '#a7f3d0', '#047857'],
  ['g1-6a', 11, '六年级上册', 'Grade 6A', '#bfdbfe', '#1e3a8a'],
  ['g1-6b', 12, '六年级下册', 'Grade 6B', '#fda4af', '#9f1239'],
];
const PRI_G1_BOOKS = G1_META.map(([id, n, zh, en, accent, spine]) =>
  book(id, n, zh, en, accent, spine, genUnits(6, 8))
);

const MID_META = [
  ['mid-7a', 1, '七年级上册', 'Grade 7A', '#60a5fa', '#1d4ed8', 12, 18],
  ['mid-7b', 2, '七年级下册', 'Grade 7B', '#34d399', '#047857', 12, 18],
  ['mid-8a', 3, '八年级上册', 'Grade 8A', '#fbbf24', '#b45309', 10, 18],
  ['mid-8b', 4, '八年级下册', 'Grade 8B', '#f472b6', '#be185d', 10, 18],
  ['mid-9', 5, '九年级全一册', 'Grade 9', '#a78bfa', '#6d28d9', 14, 18],
];
const MID_BOOKS = MID_META.map(([id, n, zh, en, accent, spine, cnt, per]) =>
  book(id, n, zh, en, accent, spine, genUnits(cnt, per))
);

export const TEXTBOOK_SHELVES = [
  { id: 'pri-g1', level: '小学', titleZh: '小学一年级起点', titleEn: 'Primary (Grade 1 start)', accent: '#fca5a5', books: PRI_G1_BOOKS },
  { id: 'pri-g3', level: '小学', titleZh: '小学三年级起点', titleEn: 'Primary (Grade 3 start)', accent: '#f472b6', books: PRI_G3_BOOKS },
  { id: 'mid', level: '初中', titleZh: '初中新目标', titleEn: 'Junior (Go for it!)', accent: '#60a5fa', books: MID_BOOKS },
  { id: 'hs', level: '高中', titleZh: '高中人教版 2019', titleEn: 'Senior (PEP 2019)', accent: '#f59e0b', books: HS_BOOKS },
];

export function getShelf(id) {
  return TEXTBOOK_SHELVES.find((s) => s.id === id) || null;
}
export function getBook(shelfId, bookId) {
  const s = getShelf(shelfId);
  if (!s) return null;
  return s.books.find((b) => b.id === bookId) || null;
}
export function getUnit(shelfId, bookId, unitId) {
  const b = getBook(shelfId, bookId);
  if (!b) return null;
  return (b.units || []).find((x) => x.id === unitId) || null;
}
export function textbookTotalWords(shelfId) {
  const s = getShelf(shelfId);
  if (!s) return 0;
  return s.books.reduce((sum, b) => sum + (b.wordCount || 0), 0);
}
