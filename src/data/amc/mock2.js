import { mcq, intq } from './helpers.js';
import { figures } from './figures.js';

export const paper = {
  id: 'mock-2',
  titleZh: 'AMC-C 模考卷二',
  titleEn: 'AMC-C Mock Paper 2',
  blurbZh: '第二套完整 30 题，难度曲线贴近 Junior / C 卷：前易后难。',
  blurbEn: 'A second full paper with the Junior / C difficulty curve: easy start, hard finish.',
  minutes: 75,
  kind: 'full',
  scoring: 'amc',
  questions: [
    mcq(
      1,
      'Number',
      '9 × 6 − 8 等于多少？',
      'What is 9 × 6 − 8?',
      ['38', '46', '54', '62', '72'],
      'B',
      '9 × 6 = 54，再减 8 得 46。',
      '9 × 6 = 54, then subtract 8 to get 46.'
    ),
    mcq(
      2,
      'Number',
      '3/5 写成百分数是？',
      '3/5 as a percentage is?',
      ['35%', '40%', '53%', '60%', '65%'],
      'D',
      '3/5 = 0.6 = 60%。',
      '3/5 = 0.6 = 60%.'
    ),
    mcq(
      3,
      'Measurement',
      '2 小时 15 分钟等于多少分钟？',
      '2 hours 15 minutes is how many minutes?',
      ['115', '125', '135', '150', '215'],
      'C',
      '2 × 60 + 15 = 135。',
      '2 × 60 + 15 = 135.'
    ),
    mcq(
      4,
      'Geometry',
      '等边三角形周长 27 cm。边长是多少？',
      'An equilateral triangle has perimeter 27 cm. What is the side length?',
      ['6 cm', '8 cm', '9 cm', '12 cm', '18 cm'],
      'C',
      '边长 = 27 ÷ 3 = 9 cm。',
      'Side length = 27 ÷ 3 = 9 cm.'
    ),
    mcq(
      5,
      'Number',
      '7² − 5² 等于多少？',
      'What is 7² − 5²?',
      ['2', '4', '12', '24', '74'],
      'D',
      '49 − 25 = 24。也可以用平方差：(7−5)(7+5)=2×12=24。',
      '49 − 25 = 24, or (7−5)(7+5) = 24.'
    ),
    mcq(
      6,
      'Statistics',
      '3, 9, 4, 7, 11 的中位数是？',
      'What is the median of 3, 9, 4, 7, 11?',
      ['4', '7', '8', '9', '11'],
      'B',
      '排序后为 3, 4, 7, 9, 11，中间的数是 7。',
      'In order: 3, 4, 7, 9, 11. The middle value is 7.'
    ),
    mcq(
      7,
      'Measurement',
      '2500 m 等于多少千米？',
      '2500 m is how many kilometres?',
      ['0.25', '2.5', '25', '250', '0.025'],
      'B',
      '2500 ÷ 1000 = 2.5 km。',
      '2500 ÷ 1000 = 2.5 km.'
    ),
    mcq(
      8,
      'Number',
      '数列 1, 1, 2, 3, 5, 8, … 的下一项是？',
      'What is the next term in 1, 1, 2, 3, 5, 8, …?',
      ['10', '11', '12', '13', '16'],
      'D',
      '斐波那契：每一项等于前两项之和，8 + 5 = 13。',
      'Fibonacci: each term is the sum of the previous two, so 8 + 5 = 13.'
    ),
    mcq(
      9,
      'Probability',
      '一枚公平硬币抛两次，两次都是正面的概率是？',
      'A fair coin is tossed twice. Probability of two heads?',
      ['1/8', '1/4', '1/3', '1/2', '3/4'],
      'B',
      '四种等可能结果 HH, HT, TH, TT，只有 HH，概率 1/4。',
      'The four equally likely outcomes are HH, HT, TH, TT, so P(HH) = 1/4.'
    ),
    mcq(
      10,
      'Number',
      '80 的 12.5% 是多少？',
      'What is 12.5% of 80?',
      ['8', '10', '12.5', '16', '20'],
      'B',
      '12.5% = 1/8，80 ÷ 8 = 10。',
      '12.5% = 1/8, so 80 ÷ 8 = 10.'
    ),
    mcq(
      11,
      'Algebra',
      '若 2(x − 3) = 10，则 x 等于？',
      'If 2(x − 3) = 10, what is x?',
      ['5', '6', '7', '8', '13'],
      'D',
      'x − 3 = 5，所以 x = 8。',
      'x − 3 = 5, so x = 8.'
    ),
    mcq(
      12,
      'Geometry',
      '等腰三角形顶角 40°。一个底角是多少？',
      'An isosceles triangle has vertex angle 40°. What is one base angle?',
      ['40°', '50°', '70°', '80°', '140°'],
      'C',
      '底角相等： (180 − 40) / 2 = 70。',
      'The base angles are equal: (180 − 40) / 2 = 70.'
    ),
    mcq(
      13,
      'Number',
      '18 和 24 的最大公因数是？',
      'What is the greatest common divisor of 18 and 24?',
      ['2', '3', '6', '8', '12'],
      'C',
      '18 = 2 × 3²，24 = 2³ × 3，GCD = 2 × 3 = 6。',
      '18 = 2 × 3² and 24 = 2³ × 3, so the GCD is 6.'
    ),
    mcq(
      14,
      'Geometry',
      '如图，边长 6 的正方形切去一角 2 × 2 的小正方形。剩余面积是多少？',
      'As shown, a 2 × 2 square is cut from a 6 × 6 square. Remaining area?',
      ['24', '28', '32', '34', '36'],
      'C',
      '36 − 4 = 32。',
      '36 − 4 = 32.',
      figures.lShape
    ),
    mcq(
      15,
      'Number',
      '小于 100 的偶质数有多少个？',
      'How many even primes are there less than 100?',
      ['0', '1', '2', '25', '49'],
      'B',
      '唯一的偶质数是 2。',
      'The only even prime is 2.'
    ),
    mcq(
      16,
      'Number',
      '把 40 按 2 : 3 : 5 分成三部分。中间那一份是多少？',
      '40 is split in the ratio 2 : 3 : 5. What is the middle part?',
      ['8', '10', '12', '15', '20'],
      'C',
      '一共 10 份，每份 4，中间一份 3 × 4 = 12。',
      '10 parts in total, each worth 4, so the middle part is 3 × 4 = 12.'
    ),
    mcq(
      17,
      'Number',
      '96 的 3/4 再取 2/3，结果是多少？',
      'What is two-thirds of three-quarters of 96?',
      ['24', '36', '48', '64', '72'],
      'C',
      '先 3/4 × 96 = 72，再 2/3 × 72 = 48。',
      'Three-quarters of 96 is 72, and two-thirds of 72 is 48.'
    ),
    mcq(
      18,
      'Geometry',
      '点 (2, 4) 与 (8, 10) 的中点坐标是？',
      'What is the midpoint of (2, 4) and (8, 10)?',
      ['(5, 7)', '(6, 7)', '(5, 6)', '(10, 14)', '(4, 5)'],
      'A',
      '中点 = ((2+8)/2, (4+10)/2) = (5, 7)。',
      'Midpoint = ((2+8)/2, (4+10)/2) = (5, 7).'
    ),
    mcq(
      19,
      'Number',
      '3⁴ 等于多少？',
      'What is 3⁴?',
      ['12', '27', '64', '81', '243'],
      'D',
      '3² = 9，3⁴ = 81。',
      '3² = 9, so 3⁴ = 81.'
    ),
    mcq(
      20,
      'Geometry',
      '棱长 4 的立方体表面积是多少？',
      'What is the surface area of a cube with side 4?',
      ['16', '24', '64', '96', '256'],
      'D',
      '6 个面，每面 16，表面积 96。',
      'Six faces of area 16 give 96.'
    ),
    mcq(
      21,
      'Counting',
      '从 6 人中选 2 人当代表，有多少种选法？',
      'How many ways can 2 people be chosen from 6?',
      ['12', '15', '18', '30', '36'],
      'B',
      'C(6,2) = 6×5/2 = 15。',
      'C(6,2) = 15.'
    ),
    mcq(
      22,
      'Geometry',
      '如图两条直线相交。标出的 47° 与 x 是对顶角。x 等于多少？',
      'Two lines intersect as shown. The 47° angle and x are vertically opposite. What is x?',
      ['43°', '47°', '90°', '133°', '180°'],
      'B',
      '对顶角相等，所以 x = 47。',
      'Vertically opposite angles are equal, so x = 47.',
      figures.twoLines
    ),
    mcq(
      23,
      'Geometry',
      '如图 10 × 6 的长方形中，涂色三角形以长和宽为直角边。涂色面积是多少？',
      'In a 10 × 6 rectangle, a right triangle uses the length and width as legs. Shaded area?',
      ['16', '24', '30', '36', '60'],
      'C',
      '三角形面积 = (1/2) × 10 × 6 = 30。',
      'Area = (1/2) × 10 × 6 = 30.',
      figures.rectTriangle
    ),
    mcq(
      24,
      'Measurement',
      '时钟指向 4:00。时针与分针的夹角是多少度？',
      'A clock shows 4:00. What is the angle between the hour and minute hands?',
      ['90°', '100°', '120°', '150°', '180°'],
      'C',
      '每个小时刻度 30°，4 点时针在 120°，分针在 0°，夹角 120°。',
      'Each hour mark is 30°, so at 4:00 the hour hand is at 120° and the minute hand at 0°.'
    ),
    mcq(
      25,
      'Counting',
      '如图 3 × 3 的方格中，一共有多少个正方形？（含 2×2 与 3×3）',
      'How many squares of any size are in this 3 × 3 grid of unit squares?',
      ['9', '10', '13', '14', '16'],
      'D',
      '1×1 有 9 个，2×2 有 4 个，3×3 有 1 个，共 14。',
      'Nine 1×1, four 2×2, and one 3×3, totalling 14.',
      figures.grid3x3
    ),
    intq(
      26,
      'Number',
      '前 20 个正奇数的和是多少？',
      'What is the sum of the first 20 positive odd numbers?',
      400,
      '前 n 个正奇数的和等于 n²，所以 20² = 400。',
      'The first n odd numbers sum to n², so 20² = 400.'
    ),
    intq(
      27,
      'Number',
      '各位数字互不相同、数字之和为 9 的最小三位数是多少？',
      'What is the smallest 3-digit number with distinct digits that sum to 9?',
      108,
      '从 100 起找：108 的数字 1、0、8 互不相同且和为 9。',
      'The smallest is 108: digits 1, 0, 8 are distinct and add to 9.'
    ),
    intq(
      28,
      'Geometry',
      '正五边形一个内角是多少度？',
      'How many degrees is one interior angle of a regular pentagon?',
      108,
      '内角和 (5−2)×180 = 540，每个内角 540 ÷ 5 = 108。',
      'Interior sum is (5−2)×180 = 540, so each angle is 108.'
    ),
    intq(
      29,
      'Number',
      '25! 的末尾有多少个 0？',
      'How many trailing zeros does 25! have?',
      6,
      '末尾 0 的个数由因子 5 决定：⌊25/5⌋ + ⌊25/25⌋ = 5 + 1 = 6。',
      'Trailing zeros come from factors of 5: ⌊25/5⌋ + ⌊25/25⌋ = 6.'
    ),
    intq(
      30,
      'Algebra',
      '若 a + b = 17 且 ab = 52，则 a² + b² 等于多少？',
      'If a + b = 17 and ab = 52, what is a² + b²?',
      185,
      'a² + b² = (a+b)² − 2ab = 17² − 104 = 289 − 104 = 185。',
      'a² + b² = (a+b)² − 2ab = 289 − 104 = 185.'
    ),
  ],
};
