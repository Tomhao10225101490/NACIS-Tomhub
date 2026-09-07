import { store, consecutiveStudyDays } from './store.js';
import { tb, langToggleHtml } from './i18n.js';
import { isSfxEnabled } from './audio.js';

export function topbar(extra = '') {
  const sfxLabel = isSfxEnabled() ? tb('soundOn') : tb('soundOff');
  return `
    <header class="topbar">
      <button type="button" class="brand brand-home" data-nav="home">
        <div class="brand-kicker">${tb('gradeKicker')}</div>
        <div class="brand-title">Tom's Ground</div>
      </button>
      <div class="topbar-right">
        ${langToggleHtml()}
        <button type="button" class="sfx-btn ${isSfxEnabled() ? 'on' : ''}" data-sfx-toggle title="${sfxLabel}">♪</button>
        <button type="button" class="chrome-link" data-nav="wrong">${tb('wrongBook')} <em>${store.wrong.length}</em></button>
        <button type="button" class="chrome-link" data-nav="progress">${tb('progress')}</button>
        <div class="stats-pill">
          <div class="stat">${tb('xp')} <em>${store.xp}</em></div>
          <div class="stat streak-fire">🔥 <em>${store.streak}</em></div>
          <div class="stat">${tb('days')} <em>${consecutiveStudyDays()}</em></div>
          ${extra}
        </div>
      </div>
    </header>`;
}

export function backBtn(target = 'home') {
  return `<button class="btn btn-ghost" data-nav="${target}">${tb('back')}</button>`;
}

export function modeCard(nav, icon, title, desc, tag) {
  return `<button class="mode-card" data-nav="${nav}">
    <div class="mode-icon">${icon}</div>
    <h3>${title}</h3>
    <p>${desc || ''}</p>
    <span class="mode-tag">${tag}</span>
  </button>`;
}

export function hubProgressBar(pct) {
  const n = Math.max(0, Math.min(100, Math.round(Number(pct) || 0)));
  return `<div class="hub-bar" aria-hidden="true"><span style="width:${n}%"></span></div>`;
}
