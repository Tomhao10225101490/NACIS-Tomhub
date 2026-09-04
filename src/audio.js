/** 轻量 Web Audio 音效：点击 / 正确 / 错误（无需外部音频文件） */
let ctx = null;
let unlocked = false;

function getCtx() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === 'suspended') ctx.resume();
  unlocked = true;
  return ctx;
}

/** 首次用户手势后解锁音频（浏览器策略） */
export function unlockAudio() {
  getCtx();
}

function tone(freq, start, dur, type = 'sine', gain = 0.08) {
  const c = getCtx();
  if (!c) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, c.currentTime + start);
  g.gain.setValueAtTime(0.0001, c.currentTime + start);
  g.gain.exponentialRampToValueAtTime(gain, c.currentTime + start + 0.015);
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + start + dur);
  o.connect(g);
  g.connect(c.destination);
  o.start(c.currentTime + start);
  o.stop(c.currentTime + start + dur + 0.02);
}

export function sfxClick() {
  tone(520, 0, 0.045, 'triangle', 0.045);
  tone(780, 0.02, 0.03, 'sine', 0.025);
}

export function sfxCorrect() {
  tone(523.25, 0, 0.1, 'sine', 0.07); // C5
  tone(659.25, 0.08, 0.12, 'sine', 0.08); // E5
  tone(783.99, 0.16, 0.18, 'triangle', 0.07); // G5
}

export function sfxWrong() {
  tone(220, 0, 0.12, 'sawtooth', 0.05);
  tone(165, 0.08, 0.16, 'triangle', 0.055);
}

export function sfxFlip() {
  tone(360, 0, 0.05, 'sine', 0.04);
  tone(480, 0.04, 0.06, 'triangle', 0.035);
}

export function sfxMatch() {
  tone(600, 0, 0.06, 'sine', 0.05);
  tone(900, 0.05, 0.1, 'triangle', 0.05);
}

export function isAudioUnlocked() {
  return unlocked;
}
