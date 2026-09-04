import { vocabulary } from './vocabulary.js';
import { questions } from './questions.js';

/**
 * 工作日一条龙：每天学一点新内容
 * 流程：背单词 → 单词小测 → 选择/判断
 */
export const days = [
  {
    day: 1,
    title: 'Sound I',
    titleZh: '声 · 基础',
    subject: 'physics',
    blurb: '声音如何产生与传播，音调/响度/音色',
    vocabIds: ['p-s1', 'p-s2', 'p-s3', 'p-s4', 'p-s5', 'p-s6', 'p-s7', 'p-s8'],
    questionIds: ['q-p1', 'q-p2', 'q-p3', 'q-p4', 'q-p25'],
  },
  {
    day: 2,
    title: 'Sound II',
    titleZh: '声 · 噪声与超声',
    subject: 'physics',
    blurb: '噪声控制、超声波、次声波、声速',
    vocabIds: ['p-s9', 'p-s10', 'p-s11', 'p-s12', 'p-s13', 'p-s14', 'p-s15', 'p-s18'],
    questionIds: ['q-p5', 'q-p6', 'q-p7', 'q-p26', 'q-p27', 'q-p28'],
  },
  {
    day: 3,
    title: 'Light I',
    titleZh: '光 · 直线与反射',
    subject: 'physics',
    blurb: '光的直线传播、反射定律、平面镜',
    vocabIds: ['p-l1', 'p-l2', 'p-l3', 'p-l4', 'p-l5', 'p-l6', 'p-l7', 'p-l8', 'p-l9'],
    questionIds: ['q-p8', 'q-p9', 'q-p10', 'q-p11', 'q-p32', 'q-p33'],
  },
  {
    day: 4,
    title: 'Light II',
    titleZh: '光 · 折射与透镜',
    subject: 'physics',
    blurb: '折射、凸凹透镜、近视远视',
    vocabIds: ['p-l12', 'p-l13', 'p-l14', 'p-l15', 'p-l16', 'p-l17', 'p-l18', 'p-l19', 'p-l24', 'p-l25'],
    questionIds: ['q-p12', 'q-p13', 'q-p14', 'q-p29', 'q-p30', 'q-p31'],
  },
  {
    day: 5,
    title: 'Light III',
    titleZh: '光 · 色散与不可见光',
    subject: 'physics',
    blurb: '色散、光谱、红外线、紫外线、三原色',
    vocabIds: ['p-l10', 'p-l11', 'p-l20', 'p-l21', 'p-l22', 'p-l23', 'p-l28', 'p-l29', 'p-l30'],
    questionIds: ['q-p15', 'q-p16'],
  },
  {
    day: 6,
    title: 'Motion',
    titleZh: '运动 · 速度与参照物',
    subject: 'physics',
    blurb: '机械运动、参照物、速度、匀速直线运动',
    vocabIds: ['p-f1', 'p-f2', 'p-f3', 'p-f4', 'p-f5', 'p-f18', 'p-f19'],
    questionIds: ['q-p17', 'q-p18'],
  },
  {
    day: 7,
    title: 'Force I',
    titleZh: '力 · 重力与平衡',
    subject: 'physics',
    blurb: '力、牛顿、重力、二力平衡、三要素',
    vocabIds: ['p-f6', 'p-f7', 'p-f8', 'p-f9', 'p-f10', 'p-f11', 'p-f17', 'p-f21', 'p-f22'],
    questionIds: ['q-p19', 'q-p20', 'q-p21', 'q-p24', 'q-p34', 'q-p35', 'q-p38'],
  },
  {
    day: 8,
    title: 'Force II',
    titleZh: '力 · 惯性与牛顿第一定律',
    subject: 'physics',
    blurb: '惯性、牛顿第一定律、摩擦力、质量与重量',
    vocabIds: ['p-f12', 'p-f13', 'p-f14', 'p-f15', 'p-f16', 'p-f20'],
    questionIds: ['q-p22', 'q-p23', 'q-p36', 'q-p37'],
  },
  {
    day: 9,
    title: 'Body I',
    titleZh: '人体 · 细胞到消化',
    subject: 'biology',
    blurb: '细胞组织器官系统、消化与吸收、酶、小肠',
    vocabIds: ['b-h1', 'b-h2', 'b-h3', 'b-h4', 'b-h5', 'b-h6', 'b-h7', 'b-h8', 'b-h9', 'b-h29'],
    questionIds: ['q-b1', 'q-b2', 'q-b7', 'q-b18', 'q-b19'],
  },
  {
    day: 10,
    title: 'Body II',
    titleZh: '人体 · 循环',
    subject: 'biology',
    blurb: '心脏、动静脉、毛细血管、血细胞、体肺循环',
    vocabIds: ['b-h10', 'b-h11', 'b-h12', 'b-h13', 'b-h14', 'b-h15', 'b-h16', 'b-h17', 'b-h18', 'b-h30', 'b-h31'],
    questionIds: ['q-b3', 'q-b4', 'q-b8', 'q-b15', 'q-b16', 'q-b17'],
  },
  {
    day: 11,
    title: 'Body III',
    titleZh: '人体 · 呼吸与泌尿',
    subject: 'biology',
    blurb: '肺泡、气体交换、肾脏、肾单位、排泄',
    vocabIds: ['b-h19', 'b-h20', 'b-h21', 'b-h22', 'b-h23', 'b-h24', 'b-h25', 'b-h26', 'b-h27'],
    questionIds: ['q-b5', 'q-b6', 'q-b20'],
  },
  {
    day: 12,
    title: 'Regulation',
    titleZh: '调节 · 神经与激素',
    subject: 'biology',
    blurb: '反射弧、激素、胰岛素、中枢与周围神经',
    vocabIds: ['b-r1', 'b-r2', 'b-r3', 'b-r4', 'b-r5', 'b-r6', 'b-r7', 'b-r8', 'b-r9', 'b-r10', 'b-r18'],
    questionIds: ['q-b9', 'q-b10', 'q-b11', 'q-b13', 'q-b21', 'q-b22', 'q-b23'],
  },
  {
    day: 13,
    title: 'Health',
    titleZh: '健康 · 免疫',
    subject: 'biology',
    blurb: '免疫、抗体抗原、疫苗、传染病、稳态',
    vocabIds: ['b-r11', 'b-r12', 'b-r13', 'b-r14', 'b-r15', 'b-r16', 'b-r17', 'b-r22'],
    questionIds: ['q-b12', 'q-b14', 'q-b24'],
  },
  {
    day: 14,
    title: 'Chem Matter',
    titleZh: '化学 · 身边物质',
    subject: 'chemistry',
    blurb: '空气组成、氧气二氧化碳、纯净物混合物、物理化学变化',
    vocabIds: ['c-m1', 'c-m2', 'c-m3', 'c-m4', 'c-m5', 'c-m9', 'c-m10', 'c-m11', 'c-m12', 'c-m13'],
    questionIds: ['q-c1', 'q-c2', 'q-c3', 'q-c4', 'q-c5', 'q-c22', 'q-c24'],
  },
  {
    day: 15,
    title: 'Chem Change',
    titleZh: '化学 · 燃烧与催化',
    subject: 'chemistry',
    blurb: '燃烧条件、氧化、催化剂、生锈',
    vocabIds: ['c-m6', 'c-m7', 'c-m8', 'c-m14', 'c-m15', 'c-m20'],
    questionIds: ['q-c6', 'q-c21', 'q-c23'],
  },
  {
    day: 16,
    title: 'Atoms',
    titleZh: '化学 · 原子分子',
    subject: 'chemistry',
    blurb: '原子、分子、离子、质子中子电子、元素',
    vocabIds: ['c-b1', 'c-b2', 'c-b3', 'c-b4', 'c-b5', 'c-b6', 'c-b7', 'c-b8', 'c-b9'],
    questionIds: ['q-c7', 'q-c11', 'q-c19'],
  },
  {
    day: 17,
    title: 'Periodic',
    titleZh: '化学 · 周期表与 Ar',
    subject: 'chemistry',
    blurb: '相对原子质量、周期族、主族副族、元素符号',
    vocabIds: ['c-b10', 'c-b11', 'c-b12', 'c-b13', 'c-b14', 'c-b18', 'c-b28', 'c-b29', 'c-b30'],
    questionIds: ['q-c8', 'q-c9', 'q-c10', 'q-c13', 'q-c17', 'q-c25', 'q-c26', 'q-c29', 'q-c30'],
  },
  {
    day: 18,
    title: 'Formulas',
    titleZh: '化学 · 化学式与守恒',
    subject: 'chemistry',
    blurb: '化学式、化合价、氧化物、质量守恒、相对分子质量',
    vocabIds: ['c-b19', 'c-b20', 'c-b21', 'c-b22', 'c-b23', 'c-b24', 'c-b25', 'c-b26', 'c-b27'],
    questionIds: ['q-c12', 'q-c14', 'q-c15', 'q-c16', 'q-c18', 'q-c20', 'q-c27', 'q-c28'],
  },
];

export function getDay(n) {
  return days.find((d) => d.day === Number(n)) || null;
}

export function dayVocab(dayPlan) {
  const set = new Set(dayPlan.vocabIds);
  return vocabulary.filter((v) => set.has(v.id));
}

export function dayQuestions(dayPlan) {
  const set = new Set(dayPlan.questionIds);
  return questions.filter((q) => set.has(q.id));
}

export function subjectLabel(id) {
  return { physics: '物理', biology: '生物', chemistry: '化学' }[id] || id;
}
