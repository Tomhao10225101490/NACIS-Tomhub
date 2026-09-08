import { mcq } from './helpers.js';

export const paper = {
  id: 'warmup',
  titleZh: 'C 卷试手 · 10 题',
  titleEn: 'C warmup · 10 questions',
  blurbZh: '先热身：算术、时间、面积。全部选择题，对完立刻看解析。',
  blurbEn: 'Warm-up arithmetic, time, and area. All multiple-choice with instant solutions.',
  minutes: 20,
  kind: 'warmup',
  scoring: 'flat3',
  questions: [
    mcq(
      1,
      'Number',
      '12 + 19 等于多少？',
      'What is 12 + 19?',
      ['29', '30', '31', '32', '33'],
      'C',
      '12 + 19 = 31。',
      '12 + 19 = 31.'
    ),
    mcq(
      2,
      'Number',
      '50 的一半是多少？',
      'What is half of 50?',
      ['20', '25', '30', '40', '100'],
      'B',
      '50 ÷ 2 = 25。',
      '50 ÷ 2 = 25.'
    ),
    mcq(
      3,
      'Number',
      '9 的平方是多少？',
      'What is the square of 9?',
      ['18', '27', '72', '81', '99'],
      'D',
      '9 × 9 = 81。',
      '9 × 9 = 81.'
    ),
    mcq(
      4,
      'Measurement',
      '1 小时 20 分钟等于多少分钟？',
      'How many minutes are in 1 hour 20 minutes?',
      ['80', '90', '100', '120', '140'],
      'A',
      '60 + 20 = 80 分钟。',
      '60 + 20 = 80 minutes.'
    ),
    mcq(
      5,
      'Geometry',
      '长 5、宽 3 的长方形面积是多少？',
      'What is the area of a 5 by 3 rectangle?',
      ['8', '15', '16', '30', '53'],
      'B',
      '面积 = 长 × 宽 = 15。',
      'Area = 5 × 3 = 15.'
    ),
    mcq(
      6,
      'Number',
      '90 的 10% 是多少？',
      'What is 10% of 90?',
      ['9', '10', '19', '80', '900'],
      'A',
      '10% 就是十分之一：90 ÷ 10 = 9。',
      '10% is one tenth: 90 ÷ 10 = 9.'
    ),
    mcq(
      7,
      'Number',
      '数列 10, 20, 30, 40, … 的下一项是？',
      'What is the next term in 10, 20, 30, 40, …?',
      ['45', '50', '55', '60', '70'],
      'B',
      '每次加 10，下一项是 50。',
      'The sequence increases by 10, so the next term is 50.'
    ),
    mcq(
      8,
      'Number',
      '下面哪一个是质数？',
      'Which of the following is a prime number?',
      ['9', '15', '21', '23', '25'],
      'D',
      '23 只能被 1 和 23 整除。其余都能因数分解。',
      '23 has no factors other than 1 and 23. The others are composite.'
    ),
    mcq(
      9,
      'Geometry',
      '边长为 3、4、5 的三角形周长是多少？',
      'What is the perimeter of a triangle with sides 3, 4 and 5?',
      ['6', '12', '15', '20', '60'],
      'B',
      '3 + 4 + 5 = 12。',
      '3 + 4 + 5 = 12.'
    ),
    mcq(
      10,
      'Number',
      '100 − 37 等于多少？',
      'What is 100 − 37?',
      ['63', '67', '73', '77', '137'],
      'A',
      '100 − 37 = 63。',
      '100 − 37 = 63.'
    ),
  ],
};
