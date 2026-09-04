/**
 * Wayground / Quizizz–style game SFX via Web Audio
 * Layered tones + soft noise + filters (no external files)
 */

let ctx = null;
let unlocked = false;
let master = null;
let sfxEnabled = localStorage.getItem('alex_sfx') !== '0';

function getCtx() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.85;
    master.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') ctx.resume();
  unlocked = true;
  return ctx;
}

export function unlockAudio() {
  getCtx();
}

export function isSfxEnabled() {
  return sfxEnabled;
}

export function setSfxEnabled(on) {
  sfxEnabled = Boolean(on);
  localStorage.setItem('alex_sfx', sfxEnabled ? '1' : '0');
  return sfxEnabled;
}

export function toggleSfx() {
  return setSfxEnabled(!sfxEnabled);
}

function envGain(g, t0, attack, hold, release, peak = 0.2) {
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(Math.max(peak, 0.0001), t0 + attack);
  g.gain.setValueAtTime(Math.max(peak, 0.0001), t0 + attack + hold);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + attack + hold + release);
}

function osc(freq, t0, dur, type = 'sine', peak = 0.12, detune = 0) {
  try {
    const c = getCtx();
    if (!c || !master || !sfxEnabled) return;
    const o = c.createOscillator();
    const g = c.createGain();
    const f = c.createBiquadFilter();
    o.type = type;
    o.frequency.setValueAtTime(freq, t0);
    if (detune) o.detune.setValueAtTime(detune, t0);
    f.type = 'lowpass';
    f.frequency.setValueAtTime(4200, t0);
    f.Q.value = 0.7;
    envGain(g, t0, 0.012, Math.max(0.01, dur * 0.35), Math.max(0.04, dur * 0.55), peak);
    o.connect(f);
    f.connect(g);
    g.connect(master);
    o.start(t0);
    o.stop(t0 + dur + 0.05);
  } catch (_) {
    /* ignore */
  }
}

function noiseBurst(t0, dur, peak = 0.04, type = 'bandpass', freq = 1800) {
  try {
    const c = getCtx();
    if (!c || !master || !sfxEnabled) return;
    const n = Math.max(1, Math.floor(c.sampleRate * dur));
    const buf = c.createBuffer(1, n, c.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < n; i++) data[i] = Math.random() * 2 - 1;
    const src = c.createBufferSource();
    src.buffer = buf;
    const f = c.createBiquadFilter();
    f.type = type;
    f.frequency.setValueAtTime(freq, t0);
    f.Q.value = 1.2;
    const g = c.createGain();
    envGain(g, t0, 0.004, 0.01, dur * 0.9, peak);
    src.connect(f);
    f.connect(g);
    g.connect(master);
    src.start(t0);
    src.stop(t0 + dur + 0.02);
  } catch (_) {
    /* ignore */
  }
}

/** Soft UI tap — Quizizz-like blip */
export function sfxClick() {
  try {
    const c = getCtx();
    if (!c || !sfxEnabled) return;
    const t0 = c.currentTime;
    osc(880, t0, 0.05, 'triangle', 0.05);
    osc(1320, t0 + 0.015, 0.04, 'sine', 0.03);
    noiseBurst(t0, 0.03, 0.015, 'highpass', 2400);
  } catch (_) {
    /* ignore */
  }
}

/** Rising major arpeggio + sparkle (correct) */
export function sfxCorrect() {
  try {
    const c = getCtx();
    if (!c || !sfxEnabled) return;
    const t0 = c.currentTime;
    // C major sparkle chord cascade
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((f, i) => {
      osc(f, t0 + i * 0.055, 0.18 + i * 0.02, i % 2 ? 'triangle' : 'sine', 0.09 - i * 0.01);
      osc(f * 2, t0 + i * 0.055 + 0.02, 0.1, 'sine', 0.025);
    });
    noiseBurst(t0 + 0.05, 0.12, 0.03, 'bandpass', 3200);
    noiseBurst(t0 + 0.18, 0.1, 0.02, 'highpass', 4500);
  } catch (_) {
    /* ignore */
  }
}

/** Soft descending buzz (wrong) — not harsh */
export function sfxWrong() {
  try {
    const c = getCtx();
    if (!c || !sfxEnabled) return;
    const t0 = c.currentTime;
    osc(311.13, t0, 0.14, 'triangle', 0.07);
    osc(233.08, t0 + 0.07, 0.18, 'sine', 0.06);
    osc(196.0, t0 + 0.14, 0.2, 'triangle', 0.045);
    noiseBurst(t0, 0.08, 0.025, 'lowpass', 600);
  } catch (_) {
    /* ignore */
  }
}

/** Card flip whoosh */
export function sfxFlip() {
  try {
    const c = getCtx();
    if (!c || !sfxEnabled) return;
    const t0 = c.currentTime;
    noiseBurst(t0, 0.09, 0.035, 'bandpass', 1400);
    osc(420, t0, 0.08, 'sine', 0.04);
    osc(640, t0 + 0.04, 0.07, 'triangle', 0.03);
  } catch (_) {
    /* ignore */
  }
}

/** Match success chime */
export function sfxMatch() {
  try {
    const c = getCtx();
    if (!c || !sfxEnabled) return;
    const t0 = c.currentTime;
    osc(659.25, t0, 0.1, 'sine', 0.07);
    osc(830.61, t0 + 0.06, 0.12, 'triangle', 0.07);
    osc(987.77, t0 + 0.12, 0.16, 'sine', 0.06);
    noiseBurst(t0 + 0.05, 0.08, 0.02, 'highpass', 3800);
  } catch (_) {
    /* ignore */
  }
}

/** Streak bonus fanfare */
export function sfxStreak(level = 3) {
  try {
    const c = getCtx();
    if (!c || !sfxEnabled) return;
    const t0 = c.currentTime;
    const base = 523.25;
    const hops = Math.min(6, 2 + level);
    for (let i = 0; i < hops; i++) {
      osc(base * (1 + i * 0.25), t0 + i * 0.045, 0.12, 'triangle', 0.07);
    }
    noiseBurst(t0 + 0.08, 0.15, 0.035, 'bandpass', 2800);
  } catch (_) {
    /* ignore */
  }
}

/** Countdown tick */
export function sfxTick() {
  try {
    const c = getCtx();
    if (!c || !sfxEnabled) return;
    const t0 = c.currentTime;
    osc(1000, t0, 0.03, 'square', 0.03);
  } catch (_) {
    /* ignore */
  }
}

export function isAudioUnlocked() {
  return unlocked;
}
