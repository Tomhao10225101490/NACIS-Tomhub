import { mcq } from './helpers.js';

export const paper = {
  id: 'warmup',
  titleZh: 'C 卷试手 · 10 题',
  titleEn: 'C warmup · 10 questions',
  blurbZh: '真题 Q1–10 难度的热身：每题都要读题想一想，不是心算。',
  blurbEn: 'Warm-up at real Q1–10 difficulty: each item needs a moment of thought, not mental arithmetic.',
  minutes: 20,
  kind: 'warmup',
  scoring: 'flat3',
  questions: [
    mcq(
      1,
      'Number',
      '一杯混合果汁中，橙汁占 3/8，其余是苹果汁。苹果汁占多少？',
      'In a juice blend, 3/8 is orange juice and the rest is apple. What fraction is apple?',
      ['3/8', '5/8', '1/2', '8/8', '3/5'],
      'B',
      '苹果汁 = 1 − 3/8 = 5/8。',
      'Apple = 1 − 3/8 = 5/8.'
    ),
    mcq(
      2,
      'Measurement',
      '烤箱温度盘上 150 与 200 之间有 5 个刻度。指针指在 150 上方第 3.5 个刻度。温度是多少？',
      'On a dial, 5 marks lie between 150 and 200. The pointer is 3.5 marks above 150. What temperature?',
      ['165', '170', '175', '185', '195'],
      'D',
      '每刻度 10°，3.5 刻度 = 35°，150 + 35 = 185。',
      'Each mark is 10°; 3.5 marks = 35°, so 150 + 35 = 185.'
    ),
    mcq(
      3,
      'Number',
      '如果前天是星期五，那么后天是星期几？',
      'If the day before yesterday was Friday, what day is the day after tomorrow?',
      ['星期一', '星期二', '星期三', '星期四', '星期五'],
      'B',
      '前天周五 ⇒ 昨天周六 ⇒ 今天周日 ⇒ 明天周一 ⇒ 后天周二。',
      'Day before yesterday Friday ⇒ today Sunday ⇒ day after tomorrow Tuesday.'
    ),
    mcq(
      4,
      'Number',
      '2024 ÷ (2 + 0 + 2 + 4) 等于多少？',
      'What is 2024 ÷ (2 + 0 + 2 + 4)?',
      ['1', '126.5', '253', '506', '1012'],
      'C',
      '2+0+2+4=8，2024 ÷ 8 = 253。',
      '2+0+2+4=8, and 2024 ÷ 8 = 253.'
    ),
    mcq(
      5,
      'Geometry',
      '四边形三个角为 90°、80°、120°，第四个角 x 是多少？',
      'A quadrilateral has angles 90°, 80°, 120° and x. What is x?',
      ['40', '50', '60', '70', '80'],
      'D',
      '四边形内角和 360°，x = 360 − 90 − 80 − 120 = 70。',
      'Angles sum to 360°, so x = 70.'
    ),
    mcq(
      6,
      'Number',
      '一个数除以 100 等于 0.4。这个数是多少？',
      'A number divided by 100 equals 0.4. What is the number?',
      ['0.004', '0.04', '0.4', '4', '40'],
      'E',
      'x ÷ 100 = 0.4 ⇒ x = 100 × 0.4 = 40。',
      'x = 100 × 0.4 = 40.'
    ),
    mcq(
      7,
      'Statistics',
      '2024 与一个未知数的平均数是 2.5。未知数是多少？',
      'The average of 2024 and an unknown number is 2.5. What is the unknown number?',
      ['2019', '−2019', '2029', '−2029', '−2024'],
      'B',
      '两数之和 = 2 × 2.5 = 5，未知数 = 5 − 2024 = −2019。',
      'Sum = 2 × 2.5 = 5, so the unknown is 5 − 2024 = −2019.'
    ),
    mcq(
      8,
      'Number',
      '一棵草树每年长高 1–2 cm。长到约 4 m 大约需要多少年？',
      'A grass tree grows 1–2 cm taller each year. About how long to reach roughly 4 m?',
      ['10 年', '30 年', '60 年', '300 年', '1000 年'],
      'D',
      '每百年长 1–2 m，4 m 需 2–4 世纪，最接近 300 年。',
      '1–2 m per century; 4 m takes 2–4 centuries — closest to 300 years.'
    ),
    mcq(
      9,
      'Number',
      '3 × (5 + 2) 与 (3 × 5) + 2 相差多少？',
      'What is the difference between 3 × (5 + 2) and (3 × 5) + 2?',
      ['0', '2', '4', '6', '8'],
      'C',
      '3 × 7 = 21，15 + 2 = 17，差 4。',
      '21 − 17 = 4.'
    ),
    mcq(
      10,
      'Geometry',
      '三角形面积 36 m²，底 9 m。高 h 是多少？',
      'A triangle has area 36 m² and base 9 m. What is the height h?',
      ['2 m', '4 m', '4.5 m', '8 m', '16 m'],
      'D',
      '(1/2) × 9 × h = 36 ⇒ h = 8。',
      '(1/2) × 9 × h = 36 ⇒ h = 8.'
    ),
  ],
};
