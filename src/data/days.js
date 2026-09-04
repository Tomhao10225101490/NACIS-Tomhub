import { vocabulary } from './vocabulary.js';
import { questions } from './questions.js';

/**
 * 工作日一条龙：每天学一点新内容（拔尖量大）
 * 流程：背单词 → 单词小测 → 选择/判断
 */
export const days = [
  {
    day: 1,
    title: 'Sound I',
    titleZh: '声 · 产生与特性',
    subject: 'physics',
    blurb: '声音的产生、传播与三要素\nProduction, transmission, pitch/loudness/timbre',
    vocabIds: ['p-s1', 'p-s2', 'p-s3', 'p-s4', 'p-s5', 'p-s6', 'p-s7', 'p-s8', 'p-s9', 'p-s10', 'p-s11', 'p-s12', 'p-s13', 'p-s14', 'p-s15', 'p-s16', 'p-s17', 'p-s18', 'p-s19', 'p-s20'],
    questionIds: ['q-p1', 'q-p2', 'q-p3', 'q-p4', 'q-p5', 'q-p6', 'q-p7', 'q-p8', 'q-p9', 'q-p10', 'q-p11', 'q-p12', 'q-p13', 'q-p14', 'q-p15'],
  },
  {
    day: 2,
    title: 'Sound II',
    titleZh: '声 · 超声噪声与应用',
    subject: 'physics',
    blurb: '超声波、次声波、噪声控制与回声\nUltrasound, infrasound, noise control, echo',
    vocabIds: ['p-s19', 'p-s20', 'p-s21', 'p-s22', 'p-s23', 'p-s24', 'p-s25', 'p-s26', 'p-s27', 'p-s28', 'p-s29', 'p-s30', 'p-s31', 'p-s32', 'p-s33', 'p-s34', 'p-s35', 'p-s36', 'p-s37', 'p-s38'],
    questionIds: ['q-p15', 'q-p16', 'q-p17', 'q-p18', 'q-p19', 'q-p20', 'q-p21', 'q-p22', 'q-p23', 'q-p24', 'q-p25', 'q-p26', 'q-p27', 'q-p28', 'q-p29'],
  },
  {
    day: 3,
    title: 'Light I',
    titleZh: '光 · 直线与反射',
    subject: 'physics',
    blurb: '直线传播、反射定律、平面镜\nRectilinear propagation, reflection, plane mirrors',
    vocabIds: ['p-l1', 'p-l2', 'p-l3', 'p-l4', 'p-l5', 'p-l6', 'p-l7', 'p-l8', 'p-l9', 'p-l10', 'p-l11', 'p-l12', 'p-l13', 'p-l14', 'p-l15', 'p-l16', 'p-l17', 'p-l18', 'p-l19', 'p-l20'],
    questionIds: ['q-p31', 'q-p32', 'q-p33', 'q-p34', 'q-p35', 'q-p36', 'q-p37', 'q-p38', 'q-p39', 'q-p40', 'q-p41', 'q-p42', 'q-p43', 'q-p44', 'q-p45'],
  },
  {
    day: 4,
    title: 'Light II',
    titleZh: '光 · 折射与透镜',
    subject: 'physics',
    blurb: '折射、凸凹透镜与成像\nRefraction, lenses and imaging',
    vocabIds: ['p-l17', 'p-l18', 'p-l19', 'p-l20', 'p-l21', 'p-l22', 'p-l23', 'p-l24', 'p-l25', 'p-l26', 'p-l27', 'p-l28', 'p-l29', 'p-l30', 'p-l31', 'p-l32', 'p-l33', 'p-l34', 'p-l35', 'p-l36'],
    questionIds: ['q-p43', 'q-p44', 'q-p45', 'q-p46', 'q-p47', 'q-p48', 'q-p49', 'q-p50', 'q-p51', 'q-p52', 'q-p53', 'q-p54', 'q-p55', 'q-p56', 'q-p57'],
  },
  {
    day: 5,
    title: 'Light III',
    titleZh: '光 · 色散眼睛与不可见光',
    subject: 'physics',
    blurb: '色散、近视远视、红外紫外\nDispersion, eye defects, IR/UV',
    vocabIds: ['p-l31', 'p-l32', 'p-l33', 'p-l34', 'p-l35', 'p-l36', 'p-l37', 'p-l38', 'p-l39', 'p-l40', 'p-l41', 'p-l42', 'p-l43', 'p-l44', 'p-l45', 'p-l46', 'p-l47', 'p-l48', 'p-l49', 'p-l50'],
    questionIds: ['q-p51', 'q-p52', 'q-p53', 'q-p54', 'q-p55', 'q-p56', 'q-p57', 'q-p58', 'q-p59', 'q-p60', 'q-p31', 'q-p32'],
  },
  {
    day: 6,
    title: 'Motion',
    titleZh: '运动 · 参照物与速度',
    subject: 'physics',
    blurb: '机械运动、参照物、速度\nMotion, reference frames, speed',
    vocabIds: ['p-f1', 'p-f2', 'p-f3', 'p-f4', 'p-f5', 'p-f6', 'p-f7', 'p-f8', 'p-f9', 'p-f10', 'p-f11', 'p-f12', 'p-f13', 'p-f14', 'p-f15', 'p-f16', 'p-f17', 'p-f18', 'p-f19', 'p-f20'],
    questionIds: ['q-p61', 'q-p62', 'q-p63', 'q-p64', 'q-p65', 'q-p66', 'q-p67', 'q-p68', 'q-p69', 'q-p70', 'q-p71', 'q-p72', 'q-p73', 'q-p74'],
  },
  {
    day: 7,
    title: 'Force I',
    titleZh: '力 · 重力与平衡',
    subject: 'physics',
    blurb: '力的概念、重力、二力平衡\nForce, gravity, balanced forces',
    vocabIds: ['p-f17', 'p-f18', 'p-f19', 'p-f20', 'p-f21', 'p-f22', 'p-f23', 'p-f24', 'p-f25', 'p-f26', 'p-f27', 'p-f28', 'p-f29', 'p-f30', 'p-f31', 'p-f32', 'p-f33', 'p-f34', 'p-f35', 'p-f36'],
    questionIds: ['q-p73', 'q-p74', 'q-p75', 'q-p76', 'q-p77', 'q-p78', 'q-p79', 'q-p80', 'q-p81', 'q-p82', 'q-p83', 'q-p84', 'q-p85', 'q-p86'],
  },
  {
    day: 8,
    title: 'Force II',
    titleZh: '力 · 惯性与牛顿第一定律',
    subject: 'physics',
    blurb: '惯性、牛顿第一定律、摩擦\nInertia, Newton I, friction',
    vocabIds: ['p-f29', 'p-f30', 'p-f31', 'p-f32', 'p-f33', 'p-f34', 'p-f35', 'p-f36', 'p-f37', 'p-f38', 'p-f39', 'p-f40', 'p-f41', 'p-f42', 'p-f1', 'p-f2', 'p-f3', 'p-f4', 'p-f5', 'p-f6'],
    questionIds: ['q-p81', 'q-p82', 'q-p83', 'q-p84', 'q-p85', 'q-p86', 'q-p87', 'q-p88', 'q-p89', 'q-p90', 'q-p61', 'q-p62'],
  },
  {
    day: 9,
    title: 'Body I',
    titleZh: '人体 · 消化',
    subject: 'biology',
    blurb: '细胞到系统、消化吸收与酶\nCells to systems, digestion, enzymes',
    vocabIds: ['b-h1', 'b-h2', 'b-h3', 'b-h4', 'b-h5', 'b-h6', 'b-h7', 'b-h8', 'b-h9', 'b-h10', 'b-h11', 'b-h12', 'b-h13', 'b-h14', 'b-h15', 'b-h16', 'b-h17', 'b-h18', 'b-h19', 'b-h20'],
    questionIds: ['q-b1', 'q-b2', 'q-b3', 'q-b4', 'q-b5', 'q-b6', 'q-b7', 'q-b8', 'q-b9', 'q-b10', 'q-b11', 'q-b12', 'q-b13', 'q-b14'],
  },
  {
    day: 10,
    title: 'Body II',
    titleZh: '人体 · 循环',
    subject: 'biology',
    blurb: '心脏血管血液与体肺循环\nHeart, vessels, blood, circulations',
    vocabIds: ['b-h17', 'b-h18', 'b-h19', 'b-h20', 'b-h21', 'b-h22', 'b-h23', 'b-h24', 'b-h25', 'b-h26', 'b-h27', 'b-h28', 'b-h29', 'b-h30', 'b-h31', 'b-h32', 'b-h33', 'b-h34', 'b-h35', 'b-h36'],
    questionIds: ['q-b11', 'q-b12', 'q-b13', 'q-b14', 'q-b15', 'q-b16', 'q-b17', 'q-b18', 'q-b19', 'q-b20', 'q-b21', 'q-b22', 'q-b23', 'q-b24'],
  },
  {
    day: 11,
    title: 'Body III',
    titleZh: '人体 · 呼吸与泌尿',
    subject: 'biology',
    blurb: '肺泡气体交换、肾脏与排泄\nGas exchange, kidneys, excretion',
    vocabIds: ['b-h33', 'b-h34', 'b-h35', 'b-h36', 'b-h37', 'b-h38', 'b-h39', 'b-h40', 'b-h41', 'b-h42', 'b-h43', 'b-h44', 'b-h45', 'b-h46', 'b-h47', 'b-h48', 'b-h49', 'b-h50', 'b-h51', 'b-h52'],
    questionIds: ['q-b21', 'q-b22', 'q-b23', 'q-b24', 'q-b25', 'q-b26', 'q-b27', 'q-b28', 'q-b29', 'q-b30', 'q-b31', 'q-b32', 'q-b33', 'q-b34'],
  },
  {
    day: 12,
    title: 'Body IV',
    titleZh: '人体 · 综合拔尖',
    subject: 'biology',
    blurb: '营养终产物、瓣膜扩散等综合\nNutrients, valves, diffusion review',
    vocabIds: ['b-h45', 'b-h46', 'b-h47', 'b-h48', 'b-h49', 'b-h50', 'b-h51', 'b-h52', 'b-h53', 'b-h54', 'b-h55', 'b-h56', 'b-h57', 'b-h58', 'b-h59', 'b-h60', 'b-h61', 'b-h62', 'b-h63', 'b-h1'],
    questionIds: ['q-b25', 'q-b26', 'q-b27', 'q-b28', 'q-b29', 'q-b30', 'q-b31', 'q-b32', 'q-b33', 'q-b34', 'q-b35', 'q-b1'],
  },
  {
    day: 13,
    title: 'Regulation I',
    titleZh: '调节 · 神经反射',
    subject: 'biology',
    blurb: '反射弧、中枢周围神经\nReflex arc, CNS and PNS',
    vocabIds: ['b-r1', 'b-r2', 'b-r3', 'b-r4', 'b-r5', 'b-r6', 'b-r7', 'b-r8', 'b-r9', 'b-r10', 'b-r11', 'b-r12', 'b-r13', 'b-r14', 'b-r15', 'b-r16', 'b-r17', 'b-r18', 'b-r19', 'b-r20'],
    questionIds: ['q-b36', 'q-b37', 'q-b38', 'q-b39', 'q-b40', 'q-b41', 'q-b42', 'q-b43', 'q-b44', 'q-b45', 'q-b46', 'q-b47', 'q-b48', 'q-b49'],
  },
  {
    day: 14,
    title: 'Regulation II',
    titleZh: '调节 · 激素',
    subject: 'biology',
    blurb: '激素、胰岛素、甲状腺与肾上腺素\nHormones, insulin, thyroxine, adrenaline',
    vocabIds: ['b-r17', 'b-r18', 'b-r19', 'b-r20', 'b-r21', 'b-r22', 'b-r23', 'b-r24', 'b-r25', 'b-r26', 'b-r27', 'b-r28', 'b-r29', 'b-r30', 'b-r31', 'b-r32', 'b-r33', 'b-r34', 'b-r35', 'b-r36'],
    questionIds: ['q-b48', 'q-b49', 'q-b50', 'q-b51', 'q-b52', 'q-b53', 'q-b54', 'q-b55', 'q-b56', 'q-b57', 'q-b58', 'q-b59', 'q-b60', 'q-b61'],
  },
  {
    day: 15,
    title: 'Health',
    titleZh: '健康 · 免疫与传染病',
    subject: 'biology',
    blurb: '免疫、疫苗、传染病三环节\nImmunity, vaccines, infection links',
    vocabIds: ['b-r33', 'b-r34', 'b-r35', 'b-r36', 'b-r37', 'b-r38', 'b-r39', 'b-r40', 'b-r41', 'b-r42', 'b-r43', 'b-r44', 'b-r45', 'b-r46', 'b-r47', 'b-r48', 'b-r49', 'b-r50', 'b-r51', 'b-r52'],
    questionIds: ['q-b58', 'q-b59', 'q-b60', 'q-b61', 'q-b62', 'q-b63', 'q-b64', 'q-b65', 'q-b36', 'q-b37', 'q-b38', 'q-b39', 'q-b40', 'q-b41'],
  },
  {
    day: 16,
    title: 'Chem Matter I',
    titleZh: '化学 · 空气与变化',
    subject: 'chemistry',
    blurb: '空气组成、纯净物混合物、物理化学变化\nAir, pure/mixture, physical vs chemical',
    vocabIds: ['c-m1', 'c-m2', 'c-m3', 'c-m4', 'c-m5', 'c-m6', 'c-m7', 'c-m8', 'c-m9', 'c-m10', 'c-m11', 'c-m12', 'c-m13', 'c-m14', 'c-m15', 'c-m16', 'c-m17', 'c-m18', 'c-m19', 'c-m20'],
    questionIds: ['q-c1', 'q-c2', 'q-c3', 'q-c4', 'q-c5', 'q-c6', 'q-c7', 'q-c8', 'q-c9', 'q-c10', 'q-c11', 'q-c12', 'q-c13', 'q-c14'],
  },
  {
    day: 17,
    title: 'Chem Matter II',
    titleZh: '化学 · 燃烧催化与环境',
    subject: 'chemistry',
    blurb: '燃烧、催化剂、生锈、酸碱与环境\nCombustion, catalysts, rusting, acids & environment',
    vocabIds: ['c-m17', 'c-m18', 'c-m19', 'c-m20', 'c-m21', 'c-m22', 'c-m23', 'c-m24', 'c-m25', 'c-m26', 'c-m27', 'c-m28', 'c-m29', 'c-m30', 'c-m31', 'c-m32', 'c-m33', 'c-m34', 'c-m35', 'c-m36'],
    questionIds: ['q-c13', 'q-c14', 'q-c15', 'q-c16', 'q-c17', 'q-c18', 'q-c19', 'q-c20', 'q-c21', 'q-c22', 'q-c23', 'q-c24', 'q-c25', 'q-c26'],
  },
  {
    day: 18,
    title: 'Chem Matter III',
    titleZh: '化学 · 溶液分离与综合',
    subject: 'chemistry',
    blurb: '溶液、过滤蒸馏、中和与综合\nSolutions, separation, neutralisation',
    vocabIds: ['c-m33', 'c-m34', 'c-m35', 'c-m36', 'c-m37', 'c-m38', 'c-m39', 'c-m40', 'c-m41', 'c-m42', 'c-m43', 'c-m44', 'c-m45', 'c-m46', 'c-m47', 'c-m48', 'c-m49', 'c-m50', 'c-m1', 'c-m2'],
    questionIds: ['q-c23', 'q-c24', 'q-c25', 'q-c26', 'q-c27', 'q-c28', 'q-c29', 'q-c30', 'q-c31', 'q-c32', 'q-c33', 'q-c34', 'q-c35', 'q-c1'],
  },
  {
    day: 19,
    title: 'Atoms',
    titleZh: '化学 · 原子分子离子',
    subject: 'chemistry',
    blurb: '原子分子离子、质子中子电子\nAtoms, molecules, ions, subatomic particles',
    vocabIds: ['c-b1', 'c-b2', 'c-b3', 'c-b4', 'c-b5', 'c-b6', 'c-b7', 'c-b8', 'c-b9', 'c-b10', 'c-b11', 'c-b12', 'c-b13', 'c-b14', 'c-b15', 'c-b16', 'c-b17', 'c-b18', 'c-b19', 'c-b20', 'c-b21', 'c-b22'],
    questionIds: ['q-c36', 'q-c37', 'q-c38', 'q-c39', 'q-c40', 'q-c41', 'q-c42', 'q-c43', 'q-c44', 'q-c45', 'q-c46', 'q-c47', 'q-c48', 'q-c49', 'q-c50', 'q-c51'],
  },
  {
    day: 20,
    title: 'Periodic & Formulas',
    titleZh: '化学 · 周期表式与守恒',
    subject: 'chemistry',
    blurb: '周期表、Ar/Mr、化学式化合价与质量守恒\nPeriodic table, Ar/Mr, formulas, conservation',
    vocabIds: ['c-b21', 'c-b22', 'c-b23', 'c-b24', 'c-b25', 'c-b26', 'c-b27', 'c-b28', 'c-b29', 'c-b30', 'c-b31', 'c-b32', 'c-b33', 'c-b34', 'c-b35', 'c-b36', 'c-b37', 'c-b38', 'c-b39', 'c-b40', 'c-b41', 'c-b42', 'c-b43', 'c-b44', 'c-b45', 'c-b46', 'c-b47', 'c-b48', 'c-b49', 'c-b50'],
    questionIds: ['q-c52', 'q-c53', 'q-c54', 'q-c55', 'q-c56', 'q-c57', 'q-c58', 'q-c59', 'q-c60', 'q-c61', 'q-c62', 'q-c63', 'q-c64', 'q-c65', 'q-c66', 'q-c67', 'q-c68', 'q-c69', 'q-c70', 'q-c71'],
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
