/** Simplified SM-2 spaced repetition. */

export function srsKey(kind, id) {
  return `${kind}:${id}`;
}

export function emptyCard() {
  return { ease: 2.5, interval: 0, due: 0, reps: 0, lapses: 0 };
}

export function getCard(srs, key) {
  const c = srs && srs[key];
  if (!c || typeof c !== 'object') return emptyCard();
  return {
    ease: Number(c.ease) || 2.5,
    interval: Number(c.interval) || 0,
    due: Number(c.due) || 0,
    reps: Number(c.reps) || 0,
    lapses: Number(c.lapses) || 0,
  };
}

export function reviewCard(card, correct, now = Date.now()) {
  const c = { ...emptyCard(), ...card };
  if (correct) {
    c.reps += 1;
    if (c.interval <= 0) c.interval = 1;
    else if (c.interval === 1) c.interval = 3;
    else c.interval = Math.max(1, Math.round(c.interval * c.ease));
    c.ease = Math.min(2.8, (Number(c.ease) || 2.5) + 0.05);
  } else {
    c.lapses += 1;
    c.interval = 1;
    c.ease = Math.max(1.3, (Number(c.ease) || 2.5) - 0.2);
    c.reps = 0;
  }
  c.due = now + c.interval * 86400000;
  return c;
}

export function applyReview(srs, key, correct, now = Date.now()) {
  const next = { ...(srs || {}) };
  next[key] = reviewCard(getCard(next, key), correct, now);
  return next;
}

export function dueEntries(srs, now = Date.now()) {
  return Object.entries(srs || {}).filter(([, c]) => Number(c?.due) > 0 && Number(c.due) <= now);
}
