import { mcq, intq } from './helpers.js';
import { figures } from './figures.js';

export const paper = {
  id: 'mock-1',
  titleZh: 'AMC-C 模考卷一',
  titleEn: 'AMC-C Mock Paper 1',
  blurbZh: '完整 30 题：前 25 题 A–E，后 5 题填 0–999。计分与官方 C/Junior 卷相同。',
  blurbEn: 'Full 30-question paper: 25 MCQ then 5 integers. Official C/Junior scoring.',
  minutes: 75,
  kind: 'full',
  scoring: 'amc',
  questions: [
    mcq(
      1,
      'Number',
      '8 × 7 + 6 等于多少？',
      'What is 8 × 7 + 6?',
      ['56', '62', '64', '70', '112'],
      'B',
      '先乘后加：8 × 7 = 56，再加 6 得 62。',
      'Multiply first: 8 × 7 = 56, then add 6 to get 62.'
    ),
    mcq(
      2,
      'Number',
      '哪一个分数等于 0.25？',
      'Which fraction is equal to 0.25?',
      ['1/5', '1/4', '1/3', '2/5', '3/8'],
      'B',
      '1/4 = 0.25。1/5 = 0.2，1/3 ≈ 0.333。',
      '1/4 = 0.25. 1/5 = 0.2 and 1/3 ≈ 0.333.'
    ),
    mcq(
      3,
      'Measurement',
      '从 14:20 到 15:05 经过多少分钟？',
      'How many minutes are there from 14:20 to 15:05?',
      ['35', '40', '45', '50', '55'],
      'C',
      '14:20 到 15:20 是 60 分钟，再往回 15 分钟，共 45 分钟。',
      'From 14:20 to 15:20 is 60 minutes; 15:05 is 15 minutes earlier, so 45 minutes.'
    ),
    mcq(
      4,
      'Geometry',
      '一个正方形的周长是 28 cm。它的边长是多少？',
      'A square has perimeter 28 cm. What is the side length?',
      ['4 cm', '5 cm', '6 cm', '7 cm', '14 cm'],
      'D',
      '边长 = 周长 ÷ 4 = 7 cm。',
      'Side length = perimeter ÷ 4 = 7 cm.'
    ),
    mcq(
      5,
      'Number',
      '2³ × 5 等于多少？',
      'What is 2³ × 5?',
      ['11', '16', '30', '40', '80'],
      'D',
      '2³ = 8，8 × 5 = 40。',
      '2³ = 8 and 8 × 5 = 40.'
    ),
    mcq(
      6,
      'Statistics',
      '6、10、14 的平均数是多少？',
      'What is the mean of 6, 10 and 14?',
      ['8', '10', '12', '14', '30'],
      'B',
      '(6 + 10 + 14) ÷ 3 = 30 ÷ 3 = 10。',
      '(6 + 10 + 14) ÷ 3 = 10.'
    ),
    mcq(
      7,
      'Measurement',
      '3.2 km 等于多少米？',
      '3.2 km is how many metres?',
      ['32', '320', '3200', '32000', '3020'],
      'C',
      '1 km = 1000 m，所以 3.2 km = 3200 m。',
      '1 km = 1000 m, so 3.2 km = 3200 m.'
    ),
    mcq(
      8,
      'Number',
      '数列 4, 9, 16, 25, … 的下一项是？',
      'What is the next term in 4, 9, 16, 25, …?',
      ['30', '32', '35', '36', '49'],
      'D',
      '这是平方数：2², 3², 4², 5²，下一项 6² = 36。',
      'These are squares: 2², 3², 4², 5², so next is 6² = 36.'
    ),
    mcq(
      9,
      'Probability',
      '袋中有 2 个绿球、3 个黄球、5 个蓝球。随机抽一个，抽到黄球的概率是？',
      'A bag has 2 green, 3 yellow and 5 blue balls. Probability of yellow?',
      ['1/5', '3/10', '1/3', '2/5', '1/2'],
      'B',
      '一共 10 个球，黄球 3 个，概率 3/10。',
      'There are 10 balls and 3 yellow, so the probability is 3/10.'
    ),
    mcq(
      10,
      'Number',
      '240 的 15% 是多少？',
      'What is 15% of 240?',
      ['24', '30', '36', '40', '48'],
      'C',
      '10% 是 24，5% 是 12，合起来 36。',
      '10% of 240 is 24 and 5% is 12, so 15% is 36.'
    ),
    mcq(
      11,
      'Algebra',
      '若 5x + 3 = 28，则 x 等于？',
      'If 5x + 3 = 28, what is x?',
      ['4', '5', '6', '7', '25'],
      'B',
      '5x = 25，所以 x = 5。',
      '5x = 25, so x = 5.'
    ),
    mcq(
      12,
      'Geometry',
      '三角形内角为 40°、75° 和 x。x 等于多少？',
      'A triangle has angles 40°, 75° and x. What is x?',
      ['55°', '60°', '65°', '70°', '75°'],
      'C',
      '内角和 180°，所以 x = 180 − 40 − 75 = 65。',
      'Angles in a triangle sum to 180°, so x = 180 − 40 − 75 = 65.'
    ),
    mcq(
      13,
      'Number',
      '8 和 12 的最小公倍数是？',
      'What is the lowest common multiple of 8 and 12?',
      ['4', '16', '20', '24', '96'],
      'D',
      '8 = 2³，12 = 2² × 3，LCM = 2³ × 3 = 24。',
      '8 = 2³ and 12 = 2² × 3, so the LCM is 2³ × 3 = 24.'
    ),
    mcq(
      14,
      'Geometry',
      '如图，从 9 × 4 的长方形一角切去 3 × 2 的小长方形。剩余面积是多少？',
      'As shown, a 3 × 2 rectangle is cut from a corner of a 9 × 4 rectangle. Remaining area?',
      ['24', '28', '30', '32', '36'],
      'C',
      '原面积 36，切去 6，剩余 30。',
      'Original area 36 minus the 6 that was cut leaves 30.',
      figures.rectCutout
    ),
    mcq(
      15,
      'Number',
      '10 和 20 之间有多少个质数？（不含 10 和 20）',
      'How many primes are strictly between 10 and 20?',
      ['3', '4', '5', '6', '7'],
      'B',
      '11、13、17、19，共 4 个。',
      'The primes are 11, 13, 17 and 19 — four of them.'
    ),
    mcq(
      16,
      'Number',
      '把 56 按 3 : 5 分成两部分。较小的一部分是多少？',
      '56 is split in the ratio 3 : 5. What is the smaller part?',
      ['15', '18', '21', '24', '35'],
      'C',
      '一共 8 份，每份 7，较小部分 3 × 7 = 21。',
      '8 parts in total, each worth 7, so the smaller part is 3 × 7 = 21.'
    ),
    mcq(
      17,
      'Number',
      '48 的 3/4 是多少？',
      'What is three-quarters of 48?',
      ['12', '24', '32', '36', '64'],
      'D',
      '48 ÷ 4 × 3 = 36。',
      '48 ÷ 4 × 3 = 36.'
    ),
    mcq(
      18,
      'Geometry',
      '如图，点 P(3, 4) 到原点 O 的距离是多少？',
      'As shown, what is the distance from P(3, 4) to the origin O?',
      ['3', '4', '5', '7', '12'],
      'C',
      '距离 = √(3² + 4²) = √25 = 5。',
      'Distance = √(3² + 4²) = √25 = 5.',
      figures.coord34
    ),
    mcq(
      19,
      'Algebra',
      '若 2ⁿ = 32，则 n 等于？',
      'If 2ⁿ = 32, what is n?',
      ['4', '5', '6', '8', '16'],
      'B',
      '2⁵ = 32，所以 n = 5。',
      '2⁵ = 32, so n = 5.'
    ),
    mcq(
      20,
      'Geometry',
      '棱长为 5 的立方体体积是多少？',
      'What is the volume of a cube with side length 5?',
      ['15', '25', '75', '125', '150'],
      'D',
      '体积 = 5³ = 125。',
      'Volume = 5³ = 125.'
    ),
    mcq(
      21,
      'Counting',
      '用 {1, 2, 3, 4} 中互不相同的数字能组成多少个三位数？',
      'How many 3-digit numbers can be made with distinct digits from {1, 2, 3, 4}?',
      ['12', '18', '20', '24', '64'],
      'D',
      '第一位 4 种，第二位 3 种，第三位 2 种：4 × 3 × 2 = 24。',
      '4 choices, then 3, then 2: 4 × 3 × 2 = 24.'
    ),
    mcq(
      22,
      'Geometry',
      '如图，AB ∥ CD。标出的 58° 与 x 是同位角。x 等于多少？',
      'In the diagram, AB ∥ CD. The 58° angle and x are corresponding. What is x?',
      ['32°', '58°', '122°', '148°', '180°'],
      'B',
      '两平行线被第三条线所截，同位角相等，所以 x = 58。',
      'Corresponding angles on parallel lines are equal, so x = 58.',
      figures.parallels
    ),
    mcq(
      23,
      'Geometry',
      '如图，边长 8 的正方形四角各有一个边长 2 的小正方形被涂色。涂色部分占大正方形的几分之几？',
      'A square of side 8 has a side-2 square shaded in each corner. What fraction is shaded?',
      ['1/8', '1/4', '3/8', '1/2', '3/4'],
      'B',
      '涂色面积 4 × 4 = 16，总面积 64，16/64 = 1/4。',
      'Shaded area is 4 × 4 = 16 out of 64, which is 1/4.',
      figures.cornerSquares
    ),
    mcq(
      24,
      'Measurement',
      '时钟指向 3:20。时针与分针的夹角是多少度？',
      'A clock shows 3:20. What is the angle between the hour and minute hands?',
      ['10°', '15°', '20°', '22°', '30°'],
      'C',
      '分针在 20 分钟处，为 120°。时针在 3 点后再走 20/60 × 30° = 10°，位于 100°。夹角 20°。',
      'The minute hand is at 120°. The hour hand is at 90° + (20/60)×30° = 100°. The difference is 20°.'
    ),
    mcq(
      25,
      'Counting',
      '如图 2 × 3 的方格中，一共能数出多少个矩形？（含正方形）',
      'How many rectangles (including squares) are in this 2 × 3 grid of squares?',
      ['12', '15', '18', '20', '24'],
      'C',
      '选两条水平线 C(3,2)=3，两条竖直线 C(4,2)=6，3 × 6 = 18。',
      'Choose 2 of the 3 horizontal lines and 2 of the 4 vertical lines: C(3,2)×C(4,2)=18.',
      figures.grid2x3
    ),
    intq(
      26,
      'Number',
      '若 1 + 2 + … + n = 78，求 n。',
      'If 1 + 2 + … + n = 78, what is n?',
      12,
      'n(n+1)/2 = 78，即 n(n+1)=156。12 × 13 = 156，所以 n = 12。',
      'n(n+1)/2 = 78 ⇒ n(n+1) = 156. Since 12 × 13 = 156, n = 12.'
    ),
    intq(
      27,
      'Number',
      '大于 100 且同时能被 6 和 8 整除的最小整数是多少？',
      'What is the smallest integer greater than 100 that is divisible by both 6 and 8?',
      120,
      '6 与 8 的最小公倍数是 24。大于 100 的最小 24 的倍数是 120。',
      'LCM(6, 8) = 24. The least multiple of 24 that is greater than 100 is 120.'
    ),
    intq(
      28,
      'Geometry',
      '正八边形有多少条对角线？',
      'How many diagonals does a regular octagon have?',
      20,
      'n 边形对角线数 = n(n−3)/2。这里 8 × 5 / 2 = 20。',
      'An n-gon has n(n−3)/2 diagonals. For n = 8 that is 20.'
    ),
    intq(
      29,
      'Number',
      '最小的能被 9 整除的三位数回文数是多少？（形如 aba）',
      'What is the smallest 3-digit palindrome (aba) that is divisible by 9?',
      171,
      '能被 9 整除则数字和是 9 的倍数。aba 的数字和是 2a+b。a 从 1 起，2a+b=9 得 a=1, b=7，即 171。',
      'A number is divisible by 9 if its digits sum to a multiple of 9. For aba the sum is 2a+b. Smallest is a=1, b=7 → 171.'
    ),
    intq(
      30,
      'Counting',
      '上 10 级台阶，每次只能走 1 级或 2 级。有多少种走法？',
      'A staircase has 10 steps. You climb 1 or 2 steps at a time. How many ways?',
      89,
      '设 aₙ 为 n 级的走法，则 aₙ = aₙ₋₁ + aₙ₋₂。a₁=1，a₂=2，一直算到 a₁₀=89。',
      'Let aₙ be the number of ways for n steps: aₙ = aₙ₋₁ + aₙ₋₂ with a₁=1, a₂=2. Then a₁₀ = 89.'
    ),
  ],
};
