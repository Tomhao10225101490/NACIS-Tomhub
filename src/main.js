import './style.css';
import { vocabulary, subjects } from './data/vocabulary.js';
import { questions, filterQuestions, shuffle } from './data/questions.js';
import { elements, coreElements, compounds, GROUP_LABELS, buildPeriodicGrid } from './data/elements.js';
import { days, getDay, dayVocab, dayQuestions, subjectLabel } from './data/days.js';
import { unlockAudio, sfxClick, sfxCorrect, sfxWrong, sfxFlip, sfxMatch } from './audio.js';

const app = document.getElementById('app');
const fx = document.getElementById('fx-layer');

document.addEventListener(
  'pointerdown',
  () => {
    unlockAudio();
  },
  { once: true }
);

const store = {
  xp: Number(localStorage.getItem('nacis_xp') || 0),
  streak: Number(localStorage.getItem('nacis_streak') || 0),
  bestStreak: Number(localStorage.getItem('nacis_best') || 0),
  wrong: JSON.parse(localStorage.getItem('nacis_wrong') || '[]'),
  dayProgress: JSON.parse(localStorage.getItem('alex_days') || '{}'),
};

function save() {
  localStorage.setItem('nacis_xp', String(store.xp));
  localStorage.setItem('nacis_streak', String(store.streak));
  localStorage.setItem('nacis_best', String(store.bestStreak));
  localStorage.setItem('nacis_wrong', JSON.stringify(store.wrong.slice(-80)));
  localStorage.setItem('alex_days', JSON.stringify(store.dayProgress));
}

function markDayDone(dayNum) {
  store.dayProgress[String(dayNum)] = {
    done: true,
    at: Date.now(),
  };
  save();
}

function isDayDone(dayNum) {
  return Boolean(store.dayProgress[String(dayNum)]?.done);
}

function doneDayCount() {
  return days.filter((d) => isDayDone(d.day)).length;
}

function addXp(n, correct) {
  store.xp += n;
  if (correct) {
    store.streak += 1;
    store.bestStreak = Math.max(store.bestStreak, store.streak);
  } else {
    store.streak = 0;
  }
  save();
}

function recordWrong(item) {
  store.wrong = store.wrong.filter((w) => w.id !== item.id);
  store.wrong.unshift({ ...item, at: Date.now() });
  save();
}

function clearWrong(id) {
  store.wrong = store.wrong.filter((w) => w.id !== id);
  save();
}

/* —— Background particles —— */
function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let w, h, particles;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    particles = Array.from({ length: Math.min(60, Math.floor(w / 24)) }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      a: Math.random() * 0.45 + 0.15,
    }));
  }

  function tick() {
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(62, 207, 207, ${p.a})`;
      ctx.fill();
    }
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d = Math.hypot(dx, dy);
        if (d < 120) {
          ctx.strokeStyle = `rgba(62, 207, 207, ${0.12 * (1 - d / 120)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(tick);
  }

  resize();
  window.addEventListener('resize', resize);
  tick();
}

/* —— FX —— */
const CONFETTI = ['#e21b3c', '#1368ce', '#d89e00', '#26890c', '#f9a8d4', '#fbbf24', '#fff'];

function burst(x, y, color = '#4ade80') {
  for (let i = 0; i < 22; i++) {
    const el = document.createElement('div');
    el.className = 'burst confetti';
    const angle = (Math.PI * 2 * i) / 22 + Math.random() * 0.2;
    const dist = 50 + Math.random() * 90;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.background = color || CONFETTI[i % CONFETTI.length];
    el.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
    el.style.setProperty('--dy', `${Math.sin(angle) * dist - 20}px`);
    fx.appendChild(el);
    setTimeout(() => el.remove(), 900);
  }
}

function screenFlash(ok) {
  const el = document.createElement('div');
  el.className = `wg-flash ${ok ? 'ok' : 'no'}`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 480);
}

function floatText(x, y, text, color = '#86efac') {
  const el = document.createElement('div');
  el.className = 'float-text';
  el.textContent = text;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.style.color = color;
  fx.appendChild(el);
  setTimeout(() => el.remove(), 950);
}

function celebrate(correct) {
  const x = window.innerWidth / 2;
  const y = window.innerHeight * 0.36;
  screenFlash(correct);
  if (correct) {
    try {
      sfxCorrect();
    } catch (_) {
      /* ignore */
    }
    for (let k = 0; k < 3; k++) {
      setTimeout(() => {
        burst(x + (Math.random() - 0.5) * 120, y + (Math.random() - 0.5) * 40, CONFETTI[k % CONFETTI.length]);
      }, k * 70);
    }
    floatText(x, y, store.streak >= 3 ? `${store.streak} Streak!` : 'Correct!', '#86efac');
  } else {
    try {
      sfxWrong();
    } catch (_) {
      /* ignore */
    }
    floatText(x, y, 'Try again', '#fca5a5');
  }
}

/** Split bilingual "中文 / English" prompts onto two lines for Wayground readability */
function bilingualHtml(text) {
  const raw = String(text || '');
  const parts = raw.split(/\s*\/\s*/);
  if (parts.length >= 2) {
    const zh = parts[0].trim();
    const en = parts.slice(1).join(' / ').trim();
    return `<span class="q-zh">${zh}</span>\n<span class="q-en">${en}</span>`;
  }
  return raw;
}

/* —— UI helpers —— */
function topbar(extra = '') {
  return `
    <header class="topbar">
      <div class="brand">
        <div class="brand-kicker">Grade 8 Science</div>
        <div class="brand-title">Alex Practice</div>
      </div>
      <div class="stats-pill">
        <div class="stat">XP <em>${store.xp}</em></div>
        <div class="stat streak-fire">🔥 <em>${store.streak}</em></div>
        <div class="stat">Days <em>${doneDayCount()}/${days.length}</em></div>
        ${extra}
      </div>
    </header>`;
}

function backBtn(target = 'home') {
  return `<button class="btn btn-ghost" data-nav="${target}">← 返回</button>`;
}

function subjectChips(active, prefix = 'sub') {
  return Object.values(subjects)
    .map(
      (s) =>
        `<button class="chip ${active === s.id ? 'active' : ''}" data-${prefix}="${s.id}">${s.name}</button>`
    )
    .join('');
}

function wgMcqHtml(options) {
  return `<div class="wg-options" id="opts">${options
    .map(
      (o, i) =>
        `<button class="wg-opt" data-i="${i}"><span class="shape">${'ABCD'[i]}</span><span>${o}</span></button>`
    )
    .join('')}</div>`;
}

function wgTfHtml() {
  return `<div class="wg-options tf-row" id="opts">
    <button class="wg-opt" data-i="true"><span class="shape">T</span><span>正确 True</span></button>
    <button class="wg-opt" data-i="false"><span class="shape">F</span><span>错误 False</span></button>
  </div>`;
}

function wgPlayShell({ title, meta, progressLabel, rightLabel, pct, questionHtml, optsHtml }) {
  return `
    ${topbar()}
    <div class="screen wg-play">
      <div class="screen-header">${backBtn()}<h2 class="screen-title">${title}</h2></div>
      <div class="wg-hud">
        <span class="pill">${progressLabel}</span>
        <span class="pill">🔥 ${store.streak}</span>
        <span class="pill">${rightLabel}</span>
      </div>
      <div class="progress-wrap">
        <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
      </div>
      <div class="wg-question">
        <div class="wg-q-meta">${meta}</div>
        <div class="wg-q-text">${bilingualHtml(questionHtml)}</div>
      </div>
      ${optsHtml}
      <div id="fb"></div>
      <div class="flash-actions" style="margin-top:14px;display:none" id="nextwrap">
        <button class="btn btn-primary" id="gonext">Next →</button>
      </div>
    </div>`;
}

/* —— HOME —— */
function renderHome() {
  const next = days.find((d) => !isDayDone(d.day)) || days[0];
  const nextV = next.vocabIds?.length || 0;
  const nextQ = next.questionIds?.length || 0;
  app.innerHTML = `
    ${topbar()}
    <section class="hero">
      <h1>Alex<span>Practice</span></h1>
      <p>上海诺达 NACIS · 八年级理科拔尖 · 中英双语 · Wayground 风格刷题</p>
    </section>

    <div class="today-card panel">
      <div class="today-label">今日推荐 Today</div>
      <div class="today-title">Day ${next.day} · ${next.title}</div>
      <div class="today-sub">${next.titleZh} · ${subjectLabel(next.subject)} · ${next.blurb}<br>本课约 <strong>${nextV}</strong> 词 + <strong>${nextQ}</strong> 题（单词→小测→选择/判断）</div>
      <button class="btn btn-primary" data-start-day="${next.day}">开始 Day ${next.day}</button>
      <button class="btn" data-nav="days" style="margin-left:8px">全部天数</button>
    </div>

    <h3 class="section-label">更多练习 More Modes</h3>
    <div class="mode-grid">
      <button class="mode-card" data-nav="days">
        <div class="mode-icon">📅</div>
        <h3>Daily Days</h3>
        <p>Day 1→${days.length} 拔尖一条龙：每天 ≈36 词 + ≈28 题。</p>
        <span class="mode-tag">${doneDayCount()} / ${days.length} done</span>
      </button>
      <button class="mode-card" data-nav="flash">
        <div class="mode-icon">🃏</div>
        <h3>Flashcards</h3>
        <p>专有名词英汉闪卡。</p>
        <span class="mode-tag">${vocabulary.length} words</span>
      </button>
      <button class="mode-card" data-nav="match">
        <div class="mode-icon">🔗</div>
        <h3>Match</h3>
        <p>英汉配对对战风。</p>
        <span class="mode-tag">Matching</span>
      </button>
      <button class="mode-card" data-nav="mcq">
        <div class="mode-icon">✅</div>
        <h3>MCQ</h3>
        <p>中英双语选择题。</p>
        <span class="mode-tag">${questions.filter((q) => q.type === 'mcq').length} Qs</span>
      </button>
      <button class="mode-card" data-nav="tf">
        <div class="mode-icon">⚖️</div>
        <h3>True / False</h3>
        <p>中英双语判断题。</p>
        <span class="mode-tag">${questions.filter((q) => q.type === 'tf').length} Qs</span>
      </button>
      <button class="mode-card" data-nav="periodic" style="--card-glow: rgba(240,163,94,0.3)">
        <div class="mode-icon">⚗️</div>
        <h3>Periodic</h3>
        <p>元素周期表。</p>
        <span class="mode-tag">Table</span>
      </button>
      <button class="mode-card" data-nav="mass" style="--card-glow: rgba(62,207,207,0.22)">
        <div class="mode-icon">🧮</div>
        <h3>Ar / Mr</h3>
        <p>相对原子 / 分子质量。</p>
        <span class="mode-tag">Drill</span>
      </button>
      <button class="mode-card" data-nav="wrong" style="--card-glow: rgba(255,107,122,0.28)">
        <div class="mode-icon">📘</div>
        <h3>Wrong Book</h3>
        <p>错题本。</p>
        <span class="mode-tag">${store.wrong.length}</span>
      </button>
    </div>
  `;
}

/* —— DAILY DAYS —— */
function renderDays() {
  app.innerHTML = `
    ${topbar()}
    <div class="screen">
      <div class="screen-header">${backBtn()}<h2 class="screen-title">Daily Days</h2></div>
      <p class="days-intro">拔尖强化 · 每天 ≈36 词 + ≈28 题 · Words → Word Quiz → MCQ/TF（中英双语）</p>
      <div class="day-grid">
        ${days
          .map((d) => {
            const done = isDayDone(d.day);
            return `<button class="day-card ${done ? 'done' : ''}" data-start-day="${d.day}">
              <div class="day-num">Day ${d.day}</div>
              <div class="day-name">${d.title}</div>
              <div class="day-zh">${d.titleZh}</div>
              <div class="day-meta">${subjectLabel(d.subject)} · ${d.vocabIds.length} words · ${d.questionIds.length} Qs</div>
              <div class="day-status">${done ? '✓ Done' : 'Start →'}</div>
            </button>`;
          })
          .join('')}
      </div>
    </div>`;
}

function startDayPractice(dayNum) {
  const plan = getDay(dayNum);
  if (!plan) {
    navigate('days');
    return;
  }
  const vocab = dayVocab(plan);
  const qs = shuffle(dayQuestions(plan).slice());
  let step = 0; // 0 intro, 1 words, 2 vocab quiz, 3 questions, 4 done
  let wordIndex = 0;
  let flipped = false;
  let vQuiz = [];
  let vIdx = 0;
  let vCorrect = 0;
  let qIdx = 0;
  let qCorrect = 0;
  let locked = false;

  function buildVocabQuiz() {
    vQuiz = shuffle(vocab.slice()).map((v) => {
      const wrong = shuffle(vocab.filter((x) => x.id !== v.id).map((x) => x.zh)).slice(0, 3);
      while (wrong.length < 3) {
        const pool = vocabulary.filter((x) => x.zh !== v.zh);
        wrong.push(pool[Math.floor(Math.random() * pool.length)].zh);
      }
      return {
        id: v.id,
        prompt: `${v.en}\n「${v.en}」的中文是？ / What is the Chinese for this term?`,
        answer: v.zh,
        options: shuffle([v.zh, ...wrong.slice(0, 3)]),
        tip: v.tip,
      };
    });
    vIdx = 0;
    vCorrect = 0;
  }

  function paint() {
    if (step === 0) {
      app.innerHTML = `
        ${topbar()}
        <div class="screen">
          <div class="screen-header">${backBtn('days')}<h2 class="screen-title">Day ${plan.day}</h2></div>
          <div class="panel day-intro">
            <div class="flash-chapter">${subjectLabel(plan.subject)} · ${plan.titleZh}</div>
            <h2 style="font-family:var(--font-display);font-size:1.8rem;margin:8px 0">${plan.title}</h2>
            <p style="color:#dff2f6;margin-bottom:16px">${plan.blurb}</p>
            <div class="day-pipeline">
              <span>1 背单词 ×${vocab.length}</span>
              <span>2 单词小测</span>
              <span>3 选择/判断 ×${qs.length}</span>
            </div>
            <div class="flash-actions" style="justify-content:flex-start">
              <button class="btn btn-primary" id="go">开始一条龙 →</button>
            </div>
          </div>
        </div>`;
      document.getElementById('go').onclick = () => {
        sfxClick();
        step = 1;
        wordIndex = 0;
        flipped = false;
        paint();
      };
      return;
    }

    if (step === 1) {
      const v = vocab[wordIndex];
      app.innerHTML = `
        ${topbar()}
        <div class="screen">
          <div class="screen-header">${backBtn('days')}<h2 class="screen-title">Day ${plan.day} · Words</h2></div>
          <div class="step-pills"><span class="on">1 Words</span><span>2 Quiz</span><span>3 Questions</span></div>
          <div class="progress-wrap">
            <div class="progress-meta"><span>${wordIndex + 1} / ${vocab.length}</span><span>${v.zh}</span></div>
            <div class="progress-bar"><div class="progress-fill" style="width:${((wordIndex + 1) / vocab.length) * 100}%"></div></div>
          </div>
          <div class="flash-card ${flipped ? 'flipped' : ''}" id="flash">
            <div class="flash-inner">
              <div class="flash-face front">
                <div class="flash-chapter">Day ${plan.day}</div>
                <div class="flash-main">${v.en}</div>
                <div class="flash-sub">Tap to flip</div>
              </div>
              <div class="flash-face back">
                <div class="flash-chapter">${v.en}</div>
                <div class="flash-main">${v.zh}</div>
                <div class="flash-tip">${v.tip}</div>
              </div>
            </div>
          </div>
          <div class="flash-actions">
            <button class="btn" id="prev" ${wordIndex === 0 ? 'disabled' : ''}>上一张</button>
            <button class="btn btn-primary" id="flip">翻转</button>
            <button class="btn" id="next">${wordIndex >= vocab.length - 1 ? '去小测 →' : '下一张'}</button>
          </div>
        </div>`;
      const flip = () => {
        flipped = !flipped;
        sfxFlip();
        document.getElementById('flash').classList.toggle('flipped', flipped);
      };
      document.getElementById('flash').onclick = flip;
      document.getElementById('flip').onclick = flip;
      document.getElementById('prev').onclick = () => {
        if (wordIndex > 0) {
          wordIndex -= 1;
          flipped = false;
          paint();
        }
      };
      document.getElementById('next').onclick = () => {
        sfxClick();
        if (wordIndex >= vocab.length - 1) {
          buildVocabQuiz();
          step = 2;
          paint();
        } else {
          wordIndex += 1;
          flipped = false;
          paint();
        }
      };
      return;
    }

    if (step === 2) {
      if (vIdx >= vQuiz.length) {
        step = 3;
        qIdx = 0;
        qCorrect = 0;
        locked = false;
        paint();
        return;
      }
      const item = vQuiz[vIdx];
      locked = false;
      app.innerHTML = `
        ${topbar()}
        <div class="screen">
          <div class="screen-header">${backBtn('days')}<h2 class="screen-title">Day ${plan.day} · Word Quiz</h2></div>
          <div class="step-pills"><span>✓ Words</span><span class="on">2 Quiz</span><span>3 Questions</span></div>
          <div class="progress-wrap">
            <div class="progress-meta"><span>${vIdx + 1} / ${vQuiz.length}</span><span>正确 ${vCorrect}</span></div>
            <div class="progress-bar"><div class="progress-fill" style="width:${(vIdx / vQuiz.length) * 100}%"></div></div>
          </div>
          <div class="wg-question">
            <div class="wg-q-meta">Day ${plan.day} · Word Quiz</div>
            <div class="wg-q-text">${bilingualHtml(item.prompt)}</div>
          </div>
          <div class="wg-options">
            ${item.options.map((o, i) => `<button class="wg-opt" data-v="${o}"><span class="shape">${'ABCD'[i]}</span><span>${o}</span></button>`).join('')}
          </div>
          <div id="fb"></div>
          <div class="flash-actions" style="display:none;margin-top:16px" id="nw">
            <button class="btn btn-primary" id="nx">Next →</button>
          </div>
        </div>`;
      app.querySelectorAll('.wg-opt').forEach((btn) => {
        btn.onclick = () => {
          if (locked) return;
          locked = true;
          const ok = btn.dataset.v === item.answer;
          app.querySelectorAll('.wg-opt').forEach((b) => {
            b.disabled = true;
            if (b.dataset.v === item.answer) b.classList.add('correct');
            else {
              b.classList.add('dim');
              if (b === btn && !ok) b.classList.add('wrong');
            }
          });
          if (ok) {
            vCorrect += 1;
            addXp(8, true);
            celebrate(true);
            document.getElementById('fb').innerHTML = `<div class="wg-feedback ok"><strong>Correct! 正确</strong>${item.tip || ''}</div>`;
          } else {
            addXp(0, false);
            celebrate(false);
            document.getElementById('fb').innerHTML = `<div class="wg-feedback no"><strong>Incorrect 不正确</strong>Answer 答案：${item.answer}<br>${item.tip || ''}</div>`;
            recordWrong({
              id: `day${plan.day}-${item.id}`,
              kind: 'vocab',
              prompt: item.prompt,
              correctText: item.answer,
              explain: item.tip || '',
              subject: plan.subject,
            });
          }
          document.getElementById('nw').style.display = 'flex';
          document.getElementById('nx').onclick = () => {
            vIdx += 1;
            paint();
          };
        };
      });
      return;
    }

    if (step === 3) {
      if (qIdx >= qs.length) {
        step = 4;
        paint();
        return;
      }
      const q = qs[qIdx];
      locked = false;
      app.innerHTML = `
        ${topbar()}
        <div class="screen wg-play">
          <div class="screen-header">${backBtn('days')}<h2 class="screen-title">Day ${plan.day} · Questions</h2></div>
          <div class="step-pills"><span>✓ Words</span><span>✓ Quiz</span><span class="on">3 Questions</span></div>
          <div class="wg-hud">
            <span class="pill">${qIdx + 1} / ${qs.length}</span>
            <span class="pill">🔥 ${store.streak}</span>
            <span class="pill">✓ ${qCorrect}</span>
          </div>
          <div class="progress-wrap">
            <div class="progress-bar"><div class="progress-fill" style="width:${(qIdx / qs.length) * 100}%"></div></div>
          </div>
          <div class="wg-question">
            <div class="wg-q-meta">${q.chapter} · ${q.type === 'mcq' ? 'MCQ' : 'T/F'}</div>
            <div class="wg-q-text">${bilingualHtml(q.prompt)}</div>
          </div>
          ${q.type === 'mcq' ? wgMcqHtml(q.options) : wgTfHtml()}
          <div id="fb"></div>
          <div class="flash-actions" style="display:none;margin-top:16px" id="nw">
            <button class="btn btn-primary" id="nx">Next →</button>
          </div>
        </div>`;

      function finish(ok, correctText) {
        const fb = document.getElementById('fb');
        if (ok) {
          qCorrect += 1;
          addXp(10, true);
          celebrate(true);
          fb.innerHTML = `<div class="wg-feedback ok"><strong>Correct! 正确</strong>${q.explain}</div>`;
        } else {
          addXp(0, false);
          celebrate(false);
          fb.innerHTML = `<div class="wg-feedback no"><strong>Incorrect 不正确</strong>Answer 答案：${correctText}<br>${q.explain}</div>`;
          recordWrong({
            id: q.id,
            kind: 'question',
            prompt: q.prompt,
            correctText,
            explain: q.explain,
            subject: q.subject,
          });
        }
        document.getElementById('nw').style.display = 'flex';
        document.getElementById('nx').onclick = () => {
          qIdx += 1;
          paint();
        };
      }

      app.querySelectorAll('#opts .wg-opt').forEach((btn) => {
        btn.onclick = () => {
          if (locked) return;
          locked = true;
          const opts = [...app.querySelectorAll('#opts .wg-opt')];
          opts.forEach((b) => (b.disabled = true));
          if (q.type === 'mcq') {
            const choice = Number(btn.dataset.i);
            const ok = choice === q.answer;
            opts[q.answer].classList.add('correct');
            opts.forEach((b, i) => {
              if (i !== q.answer) b.classList.add('dim');
            });
            if (!ok) btn.classList.add('wrong');
            finish(ok, q.options[q.answer]);
          } else {
            const choice = btn.dataset.i === 'true';
            const ok = choice === q.answer;
            opts.forEach((b) => {
              if ((b.dataset.i === 'true') === q.answer) b.classList.add('correct');
              else {
                b.classList.add('dim');
                if (b === btn) b.classList.add('wrong');
              }
            });
            finish(ok, q.answer ? 'True' : 'False');
          }
        };
      });
      return;
    }

    // step 4 done
    markDayDone(plan.day);
    const totalQ = vQuiz.length + qs.length;
    const totalOk = vCorrect + qCorrect;
    const pct = totalQ ? Math.round((totalOk / totalQ) * 100) : 100;
    const next = getDay(plan.day + 1);
    app.innerHTML = `
      ${topbar()}
      <div class="screen">
        <div class="screen-header">${backBtn()}<h2 class="screen-title">Day ${plan.day} Done</h2></div>
        <div class="panel results" style="--pct:${pct}">
          <div class="score-ring">${pct}%</div>
          <h3 style="font-family:var(--font-display);margin-bottom:8px">Day ${plan.day} · ${plan.title}</h3>
          <p style="color:#dff2f6;margin-bottom:8px">单词小测 ${vCorrect}/${vQuiz.length} · 题目 ${qCorrect}/${qs.length}</p>
          <p style="color:var(--good);margin-bottom:18px">✓ 已记为完成</p>
          <div class="flash-actions">
            ${next ? `<button class="btn btn-primary" data-start-day="${next.day}">Day ${next.day} →</button>` : ''}
            <button class="btn" data-nav="days">全部天数</button>
            <button class="btn" data-nav="home">Home</button>
          </div>
        </div>
      </div>`;
    celebrate(true);
  }

  paint();
}

/* —— FLASHCARDS —— */
function renderFlash() {
  let subject = 'all';
  let list = shuffle(vocabulary.slice());
  let i = 0;
  let flipped = false;

  function current() {
    return list[i % list.length];
  }

  function paint() {
    const v = current();
    const sub = subjects[v.subject];
    app.innerHTML = `
      ${topbar()}
      <div class="screen">
        <div class="screen-header">${backBtn()}<h2 class="screen-title">单词翻转卡</h2></div>
        <div class="filters">${subjectChips(subject)}</div>
        <div class="progress-wrap">
          <div class="progress-meta"><span>${i + 1} / ${list.length}</span><span style="color:${sub.accent}">${sub.name} · ${v.chapter}</span></div>
          <div class="progress-bar"><div class="progress-fill" style="width:${((i + 1) / list.length) * 100}%"></div></div>
        </div>
        <div class="flash-card ${flipped ? 'flipped' : ''}" id="flash">
          <div class="flash-inner">
            <div class="flash-face front">
              <div class="flash-chapter">${v.chapter}</div>
              <div class="flash-main">${v.en}</div>
              <div class="flash-sub">点击卡片翻转 · Tap to flip</div>
            </div>
            <div class="flash-face back">
              <div class="flash-chapter">${v.en}</div>
              <div class="flash-main">${v.zh}</div>
              <div class="flash-tip">${v.tip}</div>
            </div>
          </div>
        </div>
        <div class="flash-actions">
          <button class="btn" id="prev">上一张</button>
          <button class="btn btn-primary" id="flip">翻转</button>
          <button class="btn" id="next">下一张</button>
          <button class="btn btn-good" id="know">会了 ✓</button>
        </div>
      </div>`;

    document.getElementById('flash').onclick = () => {
      flipped = !flipped;
      sfxFlip();
      document.getElementById('flash').classList.toggle('flipped', flipped);
    };
    document.getElementById('flip').onclick = () => {
      flipped = !flipped;
      sfxFlip();
      document.getElementById('flash').classList.toggle('flipped', flipped);
    };
    document.getElementById('next').onclick = () => {
      i = (i + 1) % list.length;
      flipped = false;
      paint();
    };
    document.getElementById('prev').onclick = () => {
      i = (i - 1 + list.length) % list.length;
      flipped = false;
      paint();
    };
    document.getElementById('know').onclick = (e) => {
      addXp(5, true);
      celebrate(true);
      burst(e.clientX, e.clientY);
      i = (i + 1) % list.length;
      flipped = false;
      paint();
      // refresh top xp without full remount of listeners - paint already remounts
    };

    app.querySelectorAll('[data-sub]').forEach((btn) => {
      btn.onclick = () => {
        subject = btn.dataset.sub;
        list = shuffle(
          vocabulary.filter((v) => subject === 'all' || v.subject === subject)
        );
        i = 0;
        flipped = false;
        paint();
      };
    });
    bindNav();
  }

  paint();
}

/* —— MATCH —— */
function renderMatch() {
  let subject = 'all';

  function deal() {
    const pool = shuffle(
      vocabulary.filter((v) => subject === 'all' || v.subject === subject)
    ).slice(0, 6);
    const left = shuffle(pool.map((v) => ({ id: v.id, text: v.en, side: 'en' })));
    const right = shuffle(pool.map((v) => ({ id: v.id, text: v.zh, side: 'zh' })));
    let selected = null;
    let matched = 0;

    app.innerHTML = `
      ${topbar()}
      <div class="screen">
        <div class="screen-header">${backBtn()}<h2 class="screen-title">英汉配对</h2>
          <button class="btn" id="redeal">换一组</button>
        </div>
        <div class="filters">${subjectChips(subject)}</div>
        <div class="panel">
          <div class="progress-meta" style="margin-bottom:14px"><span>已配对 <strong id="mcount">0</strong> / 6</span><span>选中两侧相同含义</span></div>
          <div class="match-grid">
            <div class="match-col" id="left">${left.map((x) => `<button class="match-item" data-id="${x.id}" data-side="en">${x.text}</button>`).join('')}</div>
            <div class="match-col" id="right">${right.map((x) => `<button class="match-item" data-id="${x.id}" data-side="zh">${x.text}</button>`).join('')}</div>
          </div>
        </div>
      </div>`;

    function onPick(btn) {
      if (btn.classList.contains('matched')) return;
      if (!selected) {
        app.querySelectorAll('.match-item.selected').forEach((b) => b.classList.remove('selected'));
        btn.classList.add('selected');
        selected = btn;
        return;
      }
      if (selected === btn) {
        btn.classList.remove('selected');
        selected = null;
        return;
      }
      if (selected.dataset.side === btn.dataset.side) {
        selected.classList.remove('selected');
        btn.classList.add('selected');
        selected = btn;
        return;
      }
      const a = selected;
      const b = btn;
      if (a.dataset.id === b.dataset.id) {
        a.classList.add('matched');
        b.classList.add('matched');
        a.classList.remove('selected');
        matched += 1;
        document.getElementById('mcount').textContent = matched;
        addXp(8, true);
        celebrate(true);
        selected = null;
        if (matched === 6) {
          setTimeout(() => {
            sfxMatch();
            floatText(window.innerWidth / 2, window.innerHeight * 0.35, '全部配对!', '#ffb86b');
            setTimeout(deal, 700);
          }, 400);
        }
      } else {
        a.classList.add('bad');
        b.classList.add('bad');
        addXp(0, false);
        celebrate(false);
        setTimeout(() => {
          a.classList.remove('bad', 'selected');
          b.classList.remove('bad');
        }, 400);
        selected = null;
      }
    }

    app.querySelectorAll('.match-item').forEach((btn) => {
      btn.onclick = () => onPick(btn);
    });
    document.getElementById('redeal').onclick = deal;
    app.querySelectorAll('[data-sub]').forEach((btn) => {
      btn.onclick = () => {
        subject = btn.dataset.sub;
        deal();
      };
    });
    bindNav();
  }

  deal();
}

/* —— QUIZ (mcq / tf / mixed) —— */
function renderQuiz(mode) {
  let subject = 'all';
  const type = mode === 'mcq' ? 'mcq' : mode === 'tf' ? 'tf' : 'all';
  const title = mode === 'mcq' ? '选择题挑战' : mode === 'tf' ? '判断题冲刺' : '综合随机测';
  let queue = [];
  let idx = 0;
  let correctCount = 0;
  let answered = false;
  const wrongs = [];

  function rebuild() {
    queue = filterQuestions({
      subject,
      type,
      limit: mode === 'mixed' ? 30 : 28,
    });
    idx = 0;
    correctCount = 0;
    wrongs.length = 0;
    answered = false;
    paint();
  }

  function paint() {
    if (idx >= queue.length) {
      const pct = Math.round((correctCount / queue.length) * 100);
      app.innerHTML = `
        ${topbar()}
        <div class="screen">
          <div class="screen-header">${backBtn()}<h2 class="screen-title">${title} · 结果</h2></div>
          <div class="panel results" style="--pct:${pct}">
            <div class="score-ring">${pct}%</div>
            <h3 style="font-family:var(--font-display);font-size:1.5rem;margin-bottom:8px">${correctCount} / ${queue.length} 正确</h3>
            <p style="color:var(--muted);margin-bottom:18px">${pct >= 80 ? '太棒了！继续保持。' : pct >= 60 ? '不错，错题再巩固一下。' : '加油，打开错题本复习！'}</p>
            <div class="flash-actions">
              <button class="btn btn-primary" id="again">再来一轮</button>
              <button class="btn" data-nav="wrong">去错题本</button>
              <button class="btn" data-nav="home">回首页</button>
            </div>
            ${
              wrongs.length
                ? `<div class="wrong-list">${wrongs
                    .map(
                      (w) => `<div class="wrong-item"><div>${w.prompt}</div><div class="ans">✓ ${w.correctText}</div><div style="color:var(--muted);margin-top:4px;font-size:0.85rem">${w.explain}</div></div>`
                    )
                    .join('')}</div>`
                : ''
            }
          </div>
        </div>`;
      document.getElementById('again').onclick = rebuild;
      bindNav();
      if (pct >= 80) burst(window.innerWidth / 2, window.innerHeight * 0.3, '#f0a35e');
      return;
    }

    const q = queue[idx];
    answered = false;

    app.innerHTML = wgPlayShell({
      title,
      meta: `${subjects[q.subject]?.name || ''} · ${q.chapter}`,
      progressLabel: `${idx + 1} / ${queue.length}`,
      rightLabel: `✓ ${correctCount}`,
      pct: (idx / queue.length) * 100,
      questionHtml: q.prompt,
      optsHtml: q.type === 'mcq' ? wgMcqHtml(q.options) : wgTfHtml(),
    });

    const screen = app.querySelector('.screen');
    if (screen) {
      const f = document.createElement('div');
      f.className = 'filters';
      f.innerHTML = subjectChips(subject);
      screen.insertBefore(f, screen.querySelector('.wg-hud'));
      f.querySelectorAll('[data-sub]').forEach((btn) => {
        btn.onclick = () => {
          subject = btn.dataset.sub;
          rebuild();
        };
      });
    }

    function finish(ok, correctText) {
      if (answered) return;
      answered = true;
      const fb = document.getElementById('fb');
      if (ok) {
        correctCount += 1;
        addXp(10, true);
        celebrate(true);
        fb.innerHTML = `<div class="wg-feedback ok"><strong>Correct! 正确</strong>${q.explain}</div>`;
        clearWrong(q.id);
      } else {
        addXp(0, false);
        celebrate(false);
        fb.innerHTML = `<div class="wg-feedback no"><strong>Incorrect 不正确</strong>Answer 答案：${correctText}<br>${q.explain}</div>`;
        wrongs.push({ prompt: q.prompt, correctText, explain: q.explain });
        recordWrong({
          id: q.id,
          kind: 'question',
          prompt: q.prompt,
          correctText,
          explain: q.explain,
          subject: q.subject,
        });
      }
      document.getElementById('nextwrap').style.display = 'flex';
      document.getElementById('gonext').onclick = () => {
        idx += 1;
        paint();
      };
    }

    app.querySelectorAll('#opts .wg-opt').forEach((btn) => {
      btn.onclick = () => {
        if (answered) return;
        const opts = [...app.querySelectorAll('#opts .wg-opt')];
        opts.forEach((b) => (b.disabled = true));

        if (q.type === 'mcq') {
          const choice = Number(btn.dataset.i);
          const ok = choice === q.answer;
          opts[q.answer].classList.add('correct');
          opts.forEach((b, i) => {
            if (i !== q.answer) b.classList.add('dim');
          });
          if (!ok) btn.classList.add('wrong');
          finish(ok, q.options[q.answer]);
        } else {
          const choice = btn.dataset.i === 'true';
          const ok = choice === q.answer;
          opts.forEach((b) => {
            const val = b.dataset.i === 'true';
            if (val === q.answer) b.classList.add('correct');
            else {
              b.classList.add('dim');
              if (b === btn) b.classList.add('wrong');
            }
          });
          finish(ok, q.answer ? '正确 True' : '错误 False');
        }
      };
    });
    bindNav();
  }

  rebuild();
}

/* —— PERIODIC —— */
function renderPeriodic() {
  let mode = 'browse'; // browse | quiz
  let quizIdx = 0;
  let quizList = [];
  let quizCorrect = 0;
  let quizAnswered = false;

  function startQuiz() {
    quizList = shuffle(coreElements.slice()).slice(0, 10);
    quizIdx = 0;
    quizCorrect = 0;
    quizAnswered = false;
    mode = 'quiz';
    paint();
  }

  function paint() {
    if (mode === 'browse') {
      const cells = buildPeriodicGrid();
      const headers = GROUP_LABELS.map(
        (g, i) =>
          `<div class="pt-group-h" style="grid-column:${i + 2};grid-row:1"><span class="cn">${g.cn}</span>${g.iupac}<span class="note">${g.note}</span></div>`
      ).join('');
      const body = cells
        .map((c) => {
          const col = c.group + 1;
          const row = c.period + 1;
          if (!c.element) {
            return `<div class="el-cell empty" style="grid-column:${col};grid-row:${row}"></div>`;
          }
          const e = c.element;
          return `<button class="el-cell ${e.category}" data-z="${e.z}" style="grid-column:${col};grid-row:${row}" title="${e.en}">
            <div class="el-z">${e.z}</div>
            <div class="el-sym">${e.symbol}</div>
            <div class="el-name">${e.zh}</div>
            <div class="el-ar">${e.ar}</div>
          </button>`;
        })
        .join('');
      const periodHeads = [1, 2, 3, 4, 5, 6]
        .map((p) => `<div class="pt-period-h" style="grid-column:1;grid-row:${p + 1}">${p}</div>`)
        .join('');

      app.innerHTML = `
        ${topbar()}
        <div class="screen">
          <div class="screen-header">${backBtn()}<h2 class="screen-title">元素周期表</h2>
            <button class="btn btn-primary" id="startq">开始元素测验</button>
          </div>
          <p style="color:#dff2f6;margin-bottom:10px;font-size:0.92rem">标准 18 列长式周期表 · 上方为中国中学常用主族/副族标注 · 点击元素查看详情</p>
          <div class="pt-legend">
            <span><i style="background:rgba(255,184,107,0.7)"></i>金属</span>
            <span><i style="background:rgba(255,160,120,0.7)"></i>过渡/副族</span>
            <span><i style="background:rgba(94,231,231,0.7)"></i>非金属</span>
            <span><i style="background:rgba(125,255,176,0.7)"></i>类金属</span>
            <span><i style="background:rgba(180,160,255,0.7)"></i>稀有气体</span>
          </div>
          <div class="panel">
            <div class="ptable-scroll">
              <div class="ptable-official">
                <div class="pt-corner"></div>
                ${headers}
                ${periodHeads}
                ${body}
              </div>
            </div>
            <div class="el-detail" id="detail"></div>
          </div>
        </div>`;

      document.getElementById('startq').onclick = () => {
        sfxClick();
        startQuiz();
      };
      app.querySelectorAll('.el-cell:not(.empty)').forEach((btn) => {
        btn.onclick = () => {
          sfxClick();
          const e = elements.find((x) => x.z === Number(btn.dataset.z));
          const d = document.getElementById('detail');
          d.classList.add('show');
          const catMap = {
            metal: '金属 metal',
            nonmetal: '非金属 non-metal',
            metalloid: '类金属 metalloid',
            noble: '稀有气体 noble gas',
            transition: '过渡元素 / 副族 transition',
          };
          d.innerHTML = `
            <div style="font-family:var(--font-display);font-size:1.6rem;margin-bottom:6px;color:#fff">${e.symbol} · ${e.zh} · ${e.en}</div>
            <div style="color:#e4f4f8;line-height:1.7">
              原子序数 Z = <strong style="color:#fff">${e.z}</strong><br>
              相对原子质量 Ar ≈ <strong style="color:var(--accent-2)">${e.ar}</strong><br>
              周期 Period ${e.period} · IUPAC 族 Group ${e.group} · 中学标注 <strong style="color:var(--accent)">${e.groupCn}</strong>（${e.group <= 2 || e.group >= 13 ? '主族' : '副族'}）<br>
              类别：${catMap[e.category] || e.category}
            </div>`;
        };
      });
      bindNav();
      return;
    }

    // quiz modes rotate: symbol→zh, zh→symbol, ar
    if (quizIdx >= quizList.length) {
      const pct = Math.round((quizCorrect / quizList.length) * 100);
      app.innerHTML = `
        ${topbar()}
        <div class="screen">
          <div class="screen-header">${backBtn()}<h2 class="screen-title">元素测验结果</h2></div>
          <div class="panel results" style="--pct:${pct}">
            <div class="score-ring">${pct}%</div>
            <h3 style="font-family:var(--font-display);margin-bottom:12px">${quizCorrect}/${quizList.length}</h3>
            <div class="flash-actions">
              <button class="btn btn-primary" id="again">再测</button>
              <button class="btn" id="browse">返回浏览</button>
            </div>
          </div>
        </div>`;
      document.getElementById('again').onclick = startQuiz;
      document.getElementById('browse').onclick = () => {
        mode = 'browse';
        paint();
      };
      bindNav();
      return;
    }

    const e = quizList[quizIdx];
    const kind = quizIdx % 3; // 0 symbol->zh, 1 zh->symbol, 2 ar
    let prompt, answer, options;

    if (kind === 0) {
      prompt = `元素符号 <span style="color:var(--accent)">${e.symbol}</span> 的中文名是？`;
      answer = e.zh;
      options = shuffle([
        e.zh,
        ...shuffle(coreElements.filter((x) => x.symbol !== e.symbol))
          .slice(0, 3)
          .map((x) => x.zh),
      ]);
    } else if (kind === 1) {
      prompt = `「${e.zh}」的元素符号是？ / Symbol for <em>${e.en}</em>?`;
      answer = e.symbol;
      options = shuffle([
        e.symbol,
        ...shuffle(coreElements.filter((x) => x.symbol !== e.symbol))
          .slice(0, 3)
          .map((x) => x.symbol),
      ]);
    } else {
      prompt = `<span style="color:var(--accent)">${e.symbol}</span>（${e.zh}）的相对原子质量 Ar 约为？`;
      answer = String(e.ar);
      const distractors = shuffle(
        coreElements.filter((x) => x.ar !== e.ar).map((x) => String(x.ar))
      ).slice(0, 3);
      options = shuffle([String(e.ar), ...distractors]);
    }

    app.innerHTML = `
      ${topbar()}
      <div class="screen">
        <div class="screen-header">${backBtn()}<h2 class="screen-title">元素测验</h2></div>
        <div class="progress-wrap">
          <div class="progress-meta"><span>${quizIdx + 1} / ${quizList.length}</span><span>正确 ${quizCorrect}</span></div>
          <div class="progress-bar"><div class="progress-fill" style="width:${(quizIdx / quizList.length) * 100}%"></div></div>
        </div>
        <div class="panel">
          <div class="quiz-prompt">${prompt}</div>
          <div class="options" id="opts">
            ${options.map((o, i) => `<button class="option" data-v="${o}"><span class="key">${'ABCD'[i]}</span><span>${o}</span></button>`).join('')}
          </div>
          <div id="fb"></div>
          <div class="flash-actions" style="display:none;margin-top:16px" id="nw">
            <button class="btn btn-primary" id="nx">下一题 →</button>
          </div>
        </div>
      </div>`;

    quizAnswered = false;
    app.querySelectorAll('.option').forEach((btn) => {
      btn.onclick = () => {
        if (quizAnswered) return;
        quizAnswered = true;
        const ok = btn.dataset.v === answer;
        app.querySelectorAll('.option').forEach((b) => {
          b.disabled = true;
          if (b.dataset.v === answer) b.classList.add('correct');
          else if (b === btn && !ok) b.classList.add('wrong');
        });
        const fb = document.getElementById('fb');
        if (ok) {
          quizCorrect += 1;
          addXp(10, true);
          celebrate(true);
          fb.innerHTML = `<div class="feedback ok"><strong>正确！</strong>${e.symbol} = ${e.zh} (${e.en})，Ar ≈ ${e.ar}</div>`;
        } else {
          addXp(0, false);
          celebrate(false);
          fb.innerHTML = `<div class="feedback no"><strong>不正确</strong>答案：${answer}<br>${e.symbol} · ${e.zh} · ${e.en} · Ar ≈ ${e.ar}</div>`;
          recordWrong({
            id: `el-${e.symbol}-${kind}`,
            kind: 'element',
            prompt,
            correctText: `${e.symbol} / ${e.zh} / Ar≈${e.ar}`,
            explain: `${e.en}`,
            subject: 'chemistry',
          });
        }
        document.getElementById('nw').style.display = 'flex';
        document.getElementById('nx').onclick = () => {
          quizIdx += 1;
          paint();
        };
      };
    });
    bindNav();
  }

  paint();
}

/* —— MASS DRILL —— */
function renderMass() {
  let tab = 'ar'; // ar | mr

  function paint() {
    app.innerHTML = `
      ${topbar()}
      <div class="screen">
        <div class="screen-header">${backBtn()}<h2 class="screen-title">相对原子质量特训</h2></div>
        <div class="filters">
          <button class="chip ${tab === 'ar' ? 'active' : ''}" data-tab="ar">背 Ar</button>
          <button class="chip ${tab === 'mr' ? 'active' : ''}" data-tab="mr">算 Mr</button>
          <button class="chip" id="quiz">开始测验</button>
        </div>
        <div class="panel" id="body"></div>
      </div>`;

    const body = document.getElementById('body');
    if (tab === 'ar') {
      body.innerHTML = `
        <p style="color:var(--muted);margin-bottom:14px">中学常用相对原子质量（近似值），务必记牢核心元素。</p>
        <div class="ptable">
          ${coreElements
            .map(
              (e) => `<div class="el-cell ${e.category}">
                <div class="el-z">${e.symbol}</div>
                <div class="el-sym">${e.ar}</div>
                <div class="el-name">${e.zh}</div>
                <div class="el-ar">${e.en}</div>
              </div>`
            )
            .join('')}
        </div>
        <div class="el-detail show" style="margin-top:16px">
          <strong>记忆口诀提示</strong><br>
          H=1 · C=12 · N=14 · O=16 · Na=23 · Mg=24 · Al=27 · Si=28 · S=32 · Cl=35.5 · K=39 · Ca=40 · Fe=56 · Cu=64 · Zn=65 · Ag=108
        </div>`;
    } else {
      body.innerHTML = `
        <p style="color:var(--muted);margin-bottom:14px">相对分子质量 Mr = 各原子相对原子质量之和</p>
        <div class="options">
          ${compounds
            .map(
              (c) => `<div class="option" style="cursor:default">
                <span class="key" style="width:auto;padding:0 8px;font-family:var(--font-display)">${c.formula}</span>
                <span><strong>${c.zh}</strong> · ${c.en}<br><span style="color:var(--accent-2)">Mr = ${c.mr}</span></span>
              </div>`
            )
            .join('')}
        </div>`;
    }

    app.querySelectorAll('[data-tab]').forEach((b) => {
      b.onclick = () => {
        tab = b.dataset.tab;
        paint();
      };
    });
    document.getElementById('quiz').onclick = massQuiz;
    bindNav();
  }

  function massQuiz() {
    const list = shuffle([
      ...coreElements.slice(0, 12).map((e) => ({
        kind: 'ar',
        prompt: `${e.symbol}（${e.zh}）的相对原子质量 Ar ≈ ?`,
        answer: String(e.ar),
        options: shuffle([
          String(e.ar),
          ...shuffle(coreElements.filter((x) => x.ar !== e.ar))
            .slice(0, 3)
            .map((x) => String(x.ar)),
        ]),
        explain: `${e.symbol} = ${e.zh} = ${e.en}`,
        id: `ar-${e.symbol}`,
      })),
      ...shuffle(compounds)
        .slice(0, 6)
        .map((c) => ({
          kind: 'mr',
          prompt: `${c.formula}（${c.zh}）的相对分子质量 Mr = ?`,
          answer: String(c.mr),
          options: shuffle([
            String(c.mr),
            ...shuffle(compounds.filter((x) => x.mr !== c.mr))
              .slice(0, 3)
              .map((x) => String(x.mr)),
          ]),
          explain: `${c.formula} · ${c.en}`,
          id: `mr-${c.formula}`,
        })),
    ]).slice(0, 10);

    let i = 0;
    let okCount = 0;

    function show() {
      if (i >= list.length) {
        const pct = Math.round((okCount / list.length) * 100);
        app.innerHTML = `
          ${topbar()}
          <div class="screen">
            <div class="screen-header">${backBtn()}<h2 class="screen-title">Ar / Mr 测验结果</h2></div>
            <div class="panel results" style="--pct:${pct}">
              <div class="score-ring">${pct}%</div>
              <p style="margin-bottom:16px">${okCount}/${list.length} 正确</p>
              <div class="flash-actions">
                <button class="btn btn-primary" id="again">再测</button>
                <button class="btn" id="backm">返回</button>
              </div>
            </div>
          </div>`;
        document.getElementById('again').onclick = massQuiz;
        document.getElementById('backm').onclick = paint;
        bindNav();
        return;
      }

      const q = list[i];
      let locked = false;
      app.innerHTML = `
        ${topbar()}
        <div class="screen">
          <div class="screen-header">${backBtn()}<h2 class="screen-title">Ar / Mr 测验</h2></div>
          <div class="progress-wrap">
            <div class="progress-meta"><span>${i + 1}/${list.length}</span><span>正确 ${okCount}</span></div>
            <div class="progress-bar"><div class="progress-fill" style="width:${(i / list.length) * 100}%"></div></div>
          </div>
          <div class="panel">
            <div class="quiz-prompt">${q.prompt}</div>
            <div class="options">
              ${q.options.map((o, idx) => `<button class="option" data-v="${o}"><span class="key">${'ABCD'[idx]}</span><span>${o}</span></button>`).join('')}
            </div>
            <div id="fb"></div>
            <div class="flash-actions" style="display:none;margin-top:16px" id="nw">
              <button class="btn btn-primary" id="nx">下一题 →</button>
            </div>
          </div>
        </div>`;

      app.querySelectorAll('.option').forEach((btn) => {
        btn.onclick = () => {
          if (locked) return;
          locked = true;
          const good = btn.dataset.v === q.answer;
          app.querySelectorAll('.option').forEach((b) => {
            b.disabled = true;
            if (b.dataset.v === q.answer) b.classList.add('correct');
            else if (b === btn && !good) b.classList.add('wrong');
          });
          if (good) {
            okCount += 1;
            addXp(10, true);
            celebrate(true);
            document.getElementById('fb').innerHTML = `<div class="feedback ok"><strong>正确！</strong>${q.explain}</div>`;
          } else {
            addXp(0, false);
            celebrate(false);
            document.getElementById('fb').innerHTML = `<div class="feedback no"><strong>不正确</strong>答案：${q.answer}<br>${q.explain}</div>`;
            recordWrong({
              id: q.id,
              kind: 'mass',
              prompt: q.prompt,
              correctText: q.answer,
              explain: q.explain,
              subject: 'chemistry',
            });
          }
          document.getElementById('nw').style.display = 'flex';
          document.getElementById('nx').onclick = () => {
            i += 1;
            show();
          };
        };
      });
      bindNav();
    }

    show();
  }

  paint();
}

/* —— WRONG BOOK —— */
function renderWrong() {
  app.innerHTML = `
    ${topbar()}
    <div class="screen">
      <div class="screen-header">${backBtn()}<h2 class="screen-title">错题本</h2>
        ${store.wrong.length ? `<button class="btn" id="clearall">清空</button>` : ''}
      </div>
      <div class="panel">
        ${
          store.wrong.length === 0
            ? `<div class="empty">暂无错题，去挑战几轮测验吧！🎉</div>`
            : `<div class="wrong-list">${store.wrong
                .map(
                  (w) => `<div class="wrong-item">
                    <div style="font-size:0.75rem;color:var(--muted);margin-bottom:4px">${w.subject || ''} · ${w.kind || ''}</div>
                    <div>${w.prompt}</div>
                    <div class="ans">✓ ${w.correctText}</div>
                    ${w.explain ? `<div style="color:var(--muted);margin-top:4px;font-size:0.85rem">${w.explain}</div>` : ''}
                    <button class="btn" style="margin-top:8px" data-rm="${w.id}">已掌握，移除</button>
                  </div>`
                )
                .join('')}</div>`
        }
      </div>
    </div>`;

  app.querySelectorAll('[data-rm]').forEach((btn) => {
    btn.onclick = () => {
      clearWrong(btn.dataset.rm);
      renderWrong();
    };
  });
  const clear = document.getElementById('clearall');
  if (clear) {
    clear.onclick = () => {
      store.wrong = [];
      save();
      renderWrong();
    };
  }
  bindNav();
}

/* —— Router —— */
const routes = {
  home: renderHome,
  days: renderDays,
  flash: renderFlash,
  match: renderMatch,
  mcq: () => renderQuiz('mcq'),
  tf: () => renderQuiz('tf'),
  mixed: () => renderQuiz('mixed'),
  periodic: renderPeriodic,
  mass: renderMass,
  wrong: renderWrong,
};

function bindNav() {
  // 事件委托已接管
}

app.addEventListener('click', (e) => {
  const dayBtn = e.target.closest('[data-start-day]');
  if (dayBtn && app.contains(dayBtn)) {
    e.preventDefault();
    e.stopPropagation();
    const n = Number(dayBtn.getAttribute('data-start-day'));
    try {
      unlockAudio();
    } catch (_) {
      /* ignore */
    }
    try {
      sfxClick();
    } catch (_) {
      /* ignore */
    }
    startDayPractice(n);
    return;
  }
  const navEl = e.target.closest('[data-nav]');
  if (!navEl || !app.contains(navEl)) return;
  e.preventDefault();
  navigate(navEl.dataset.nav);
});

function navigate(name) {
  try {
    unlockAudio();
  } catch (_) {
    /* ignore */
  }
  try {
    sfxClick();
  } catch (_) {
    /* ignore */
  }
  const fn = routes[name] || renderHome;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  fn();
}

initCanvas();
navigate('home');
