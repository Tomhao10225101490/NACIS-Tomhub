import { mcq } from './helpers.js';
import { figures } from './figures.js';

export const paper = {
  id: 'geo',
  titleZh: '几何图专题 · 10 题',
  titleEn: 'Geometry figures · 10 Q',
  blurbZh: '每题都有清晰矢量图：数图形、求角度、面积、展开图。',
  blurbEn: 'Every question has a crisp vector diagram: counting, angles, area, nets.',
  minutes: 25,
  kind: 'sprint',
  scoring: 'flat3',
  questions: [
    mcq(
      1,
      'Geometry',
      '如图，大三角形三边中点两两连接。图中一共有多少个三角形？',
      'The midpoints of a large triangle are joined. How many triangles are in the figure?',
      ['3', '4', '5', '6', '8'],
      'C',
      '四个小三角形（三角各一，中间倒立一个）再加上外面的大三角形，共 5 个。',
      'Four small triangles (three corners and the inverted middle) plus the large one make 5.',
      figures.midpoints
    ),
    mcq(
      2,
      'Geometry',
      '如图 AB ∥ CD，58° 与 x 是同位角。x 等于？',
      'AB ∥ CD as shown; 58° and x are corresponding. What is x?',
      ['32°', '58°', '122°', '148°', '180°'],
      'B',
      '平行线同位角相等，x = 58°。',
      'Corresponding angles are equal, so x = 58°.',
      figures.parallels
    ),
    mcq(
      3,
      'Geometry',
      '如图梯形两底 6 与 10，高 4。面积是多少？',
      'The trapezoid has parallel sides 6 and 10 and height 4. What is its area?',
      ['24', '32', '40', '48', '64'],
      'B',
      '面积 = (上底 + 下底) × 高 ÷ 2 = (6+10)×4÷2 = 32。',
      'Area = (6+10)×4÷2 = 32.',
      figures.trapezoid
    ),
    mcq(
      4,
      'Geometry',
      '如图直角三角形两直角边为 5 和 12。斜边是多少？',
      'A right triangle has legs 5 and 12. What is the hypotenuse?',
      ['7', '13', '15', '17', '60'],
      'B',
      '5² + 12² = 25 + 144 = 169 = 13²。',
      '5² + 12² = 169 = 13².',
      figures.pythag512
    ),
    mcq(
      5,
      'Geometry',
      '如图 L 形由 8 × 6 的长方形切去一角 3 × 3 得到。L 形的周长是多少？',
      'An 8 × 6 rectangle has a 3 × 3 square cut from a corner. Perimeter of the L?',
      ['22', '28', '31', '34', '40'],
      'B',
      '从角落切去一块，去掉的两条边与新露出的两条边一样长，周长仍是 2×(8+6)=28。',
      'Cutting a corner replaces two outer edges with two equal inner edges, so the perimeter stays 2×(8+6)=28.',
      figures.lPerim
    ),
    mcq(
      6,
      'Geometry',
      '如图立方体展开图。与标有 3 的面相对的数字是？',
      'This net folds to a cube. Which number is opposite the face marked 3?',
      ['1', '2', '4', '5', '6'],
      'E',
      '折起来后，3 的上下左右是 5、1、2、4，剩下的 6 与 3 相对。',
      'Folding the cross puts 5, 1, 2 and 4 beside 3, so 6 is opposite 3.',
      figures.cubeNet
    ),
    mcq(
      7,
      'Geometry',
      '如图两个相似直角三角形。小的高 3，大的高 6。若小三角形面积是 6，大三角形面积是多少？',
      'Similar right triangles have heights 3 and 6. If the small area is 6, what is the large area?',
      ['12', '18', '24', '30', '36'],
      'C',
      '相似比 2，面积比 4，所以 6 × 4 = 24。',
      'Scale factor 2 means area factor 4, so 6 × 4 = 24.',
      figures.similarTri
    ),
    mcq(
      8,
      'Geometry',
      '如图，直角三角形两直角边在坐标轴上，长 6 和 8。面积是多少？',
      'A right triangle has legs 6 and 8 along the axes. What is its area?',
      ['14', '24', '28', '48', '64'],
      'B',
      '面积 = (1/2) × 6 × 8 = 24。',
      'Area = (1/2) × 6 × 8 = 24.',
      figures.coordArea
    ),
    mcq(
      9,
      'Geometry',
      '如图正六边形被分成 6 个全等的等边三角形。若涂色的一块面积是 5，整个六边形面积是多少？',
      'A regular hexagon is 6 equilateral triangles. If the shaded one has area 5, what is the hexagon’s area?',
      ['20', '25', '30', '35', '36'],
      'C',
      '6 × 5 = 30。',
      '6 × 5 = 30.',
      figures.hexagon
    ),
    mcq(
      10,
      'Geometry',
      '如图 3 × 3 方格中，一共有多少个正方形？',
      'How many squares of any size are in this 3 × 3 grid?',
      ['9', '10', '13', '14', '16'],
      'D',
      '9 个 1×1，4 个 2×2，1 个 3×3，共 14。',
      'Nine 1×1, four 2×2, one 3×3 → 14.',
      figures.grid3x3
    ),
  ],
};
