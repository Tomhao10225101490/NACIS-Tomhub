/** Official AMC secondary scoring: 135 max, no penalty. */

export function amcQuestionPoints(q, paper = {}) {
  if (paper.scoring === 'flat3') return 3;
  const n = Number(q?.n);
  if (n <= 10) return 3;
  if (n <= 20) return 4;
  if (n <= 25) return 5;
  if (n <= 30) return n - 20;
  return 3;
}

export function amcMaxScore(questions, paper = {}) {
  return (questions || []).reduce((sum, q) => sum + amcQuestionPoints(q, paper), 0);
}

export function answersMatch(q, given) {
  if (given === undefined || given === null || given === '') return false;
  if (q.type === 'mcq') {
    return String(given).trim().toUpperCase() === String(q.answer).trim().toUpperCase();
  }
  const n = Number(given);
  if (!Number.isFinite(n)) return false;
  return n === Number(q.answer);
}

export function formatAmcAnswer(q) {
  if (!q) return '';
  if (q.type === 'mcq') return String(q.answer).toUpperCase();
  return String(q.answer);
}

export function scoreAmc(questions, answers = {}, paper = {}) {
  let points = 0;
  let correct = 0;
  let unanswered = 0;
  const rows = (questions || []).map((q) => {
    const given = answers[q.n];
    const blank = given === undefined || given === null || String(given).trim() === '';
    const ok = !blank && answersMatch(q, given);
    const max = amcQuestionPoints(q, paper);
    if (blank) unanswered += 1;
    else if (ok) {
      points += max;
      correct += 1;
    }
    return {
      n: q.n,
      ok,
      blank,
      pts: ok ? max : 0,
      max,
      given: blank ? '' : given,
      answer: formatAmcAnswer(q),
    };
  });
  return {
    points,
    max: amcMaxScore(questions, paper),
    correct,
    total: questions.length,
    unanswered,
    rows,
  };
}
