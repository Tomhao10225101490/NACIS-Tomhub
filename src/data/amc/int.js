import { intq } from './helpers.js';

export const paper = {
  id: 'int',
  titleZh: '整数题冲刺 · Q26–30',
  titleEn: 'Integer sprint · Q26–30',
  blurbZh: '专门练最后五题：答案是 0–999 的整数，分值 6–10 分。',
  blurbEn: 'The last five AMC questions: integer answers 0–999, worth 6–10 marks.',
  minutes: 20,
  kind: 'sprint',
  scoring: 'amc',
  questions: [
    intq(
      26,
      'Number',
      '2⁸ 等于多少？',
      'What is 2⁸?',
      256,
      '2⁸ = 256。',
      '2⁸ = 256.'
    ),
    intq(
      27,
      'Number',
      '1 + 2 + … + 15 等于多少？',
      'What is 1 + 2 + … + 15?',
      120,
      'n(n+1)/2 = 15×16/2 = 120。',
      'n(n+1)/2 = 15×16/2 = 120.'
    ),
    intq(
      28,
      'Geometry',
      '周角是多少度？',
      'How many degrees are in a full turn?',
      360,
      '绕一点一圈是 360°。',
      'A full turn around a point is 360°.'
    ),
    intq(
      29,
      'Number',
      '9 和 12 的最小公倍数是多少？',
      'What is the lowest common multiple of 9 and 12?',
      36,
      '9=3²，12=2²×3，LCM=2²×3²=36。',
      '9=3² and 12=2²×3, so the LCM is 36.'
    ),
    intq(
      30,
      'Number',
      '11² + 2² 等于多少？',
      'What is 11² + 2²?',
      125,
      '121 + 4 = 125。',
      '121 + 4 = 125.'
    ),
  ],
};
