/** Tom's Ground · subject hubs (NACIS Grade 8) */
export const HUBS = [
  {
    id: 'chinese',
    icon: '📖',
    zh: '语文',
    en: 'Chinese',
    blurbZh: '初中古诗古文 · 分年级背诵 · 小测',
    blurbEn: 'Classical poetry & prose by grade · drills',
    accent: '#f43f5e',
    glow: 'rgba(244, 63, 94, 0.35)',
  },
  {
    id: 'math',
    icon: '∑',
    zh: '数学',
    en: 'Math',
    blurbZh: '课内概念 · AMC-C 澳洲数学竞赛',
    blurbEn: 'Classroom concepts · AMC-C contest track',
    accent: '#3b82f6',
    glow: 'rgba(59, 130, 246, 0.35)',
  },
  {
    id: 'english',
    icon: '🎙',
    zh: '英语',
    en: 'English',
    blurbZh: '雅思 Band 7 + 人教版 2019 高中选书背词',
    blurbEn: 'IELTS Band 7 + PEP 2019 high-school books',
    accent: '#10b981',
    glow: 'rgba(16, 185, 129, 0.35)',
  },
  {
    id: 'physics',
    icon: '⚡',
    zh: '物理',
    en: 'Physics',
    blurbZh: '声 · 光 · 运动和力',
    blurbEn: 'Sound · light · motion & force',
    accent: '#a78bfa',
    glow: 'rgba(167, 139, 250, 0.35)',
  },
  {
    id: 'chemistry',
    icon: '🧪',
    zh: '化学',
    en: 'Chemistry',
    blurbZh: '空气水 · 物质构成 · 周期表',
    blurbEn: 'Air & water · matter · periodic table',
    accent: '#f59e0b',
    glow: 'rgba(245, 158, 11, 0.35)',
  },
  {
    id: 'biology',
    icon: '🧬',
    zh: '生物',
    en: 'Biology',
    blurbZh: '人体 · 调节与健康',
    blurbEn: 'Human body · regulation & health',
    accent: '#34d399',
    glow: 'rgba(52, 211, 153, 0.35)',
  },
];

export function getHub(id) {
  return HUBS.find((h) => h.id === id) || null;
}
