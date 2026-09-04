import './style.css';
import { vocabulary, subjects } from './data/vocabulary.js';
import { questions, filterQuestions, shuffle } from './data/questions.js';
import { elements, coreElements, compounds } from './data/elements.js';

const app = document.getElementById('app');
const fx = document.getElementById('fx-layer');

const store = {
  xp: Number(localStorage.getItem('nacis_xp') || 0),
  streak: Number(localStorage.getItem('nacis_streak') || 0),
  bestStreak: Number(localStorage.getItem('nacis_best') || 0),
  wrong: JSON.parse(localStorage.getItem('nacis_wrong') || '[]'),
};

function save() {
  localStorage.setItem('nacis_xp', String(store.xp));
  localStorage.setItem('nacis_streak', String(store.streak));
  localStorage.setItem('nacis_best', String(store.bestStreak));
  localStorage.setItem('nacis_wrong', JSON.stringify(store.wrong.slice(-80)));
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
function burst(x, y, color = '#3ecfcf') {
  for (let i = 0; i < 18; i++) {
    const el = document.createElement('div');
    el.className = 'burst';
    const angle = (Math.PI * 2 * i) / 18;
    const dist = 40 + Math.random() * 70;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.background = color;
    el.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
    el.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
    fx.appendChild(el);
    setTimeout(() => el.remove(), 850);
  }
}

function floatText(x, y, text, color = '#5fd48a') {
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
  const y = window.innerHeight * 0.38;
  if (correct) {
    burst(x, y, store.streak >= 5 ? '#f0a35e' : '#5fd48a');
    floatText(x, y, store.streak >= 3 ? `${store.streak} 连击!` : '+XP', '#5fd48a');
  } else {
    floatText(x, y, '再想想', '#ff6b7a');
  }
}

/* —— UI helpers —— */
function topbar(extra = '') {
  return `
    <header class="topbar">
      <div class="brand">
        <div class="brand-kicker">NACIS Shanghai · Grade 8</div>
        <div class="brand-title">理科实验室 Science Lab</div>
      </div>
      <div class="stats-pill">
        <div class="stat">XP <em>${store.xp}</em></div>
        <div class="stat streak-fire">🔥 <em>${store.streak}</em></div>
        <div class="stat">最佳 <em>${store.bestStreak}</em></div>
        ${extra}
      </div>
    </header>`;
}

function backBtn() {
  return `<button class="btn btn-ghost" data-nav="home">← 返回</button>`;
}

function subjectChips(active, prefix = 'sub') {
  return Object.values(subjects)
    .map(
      (s) =>
        `<button class="chip ${active === s.id ? 'active' : ''}" data-${prefix}="${s.id}">${s.name}</button>`
    )
    .join('');
}

/* —— HOME —— */
function renderHome() {
  app.innerHTML = `
    ${topbar()}
    <section class="hero">
      <h1>上海诺达 · 八年级理科<span>动态学习站</span></h1>
      <p>专有名词英汉对照 · 选择/判断测验 · 元素周期表 · 相对原子质量</p>
      <p class="hero-note">沪教/上海课标基础 + 双语 IGCSE 衔接 · 本地运行 · 错题自动收录</p>
    </section>
    <div class="mode-grid">
      <button class="mode-card" data-nav="flash" style="--card-glow: rgba(62,207,207,0.28)">
        <div class="mode-icon">🃏</div>
        <h3>单词翻转卡</h3>
        <p>英汉专有名词闪卡，点击翻转看中文释义与记忆提示。</p>
        <span class="mode-tag">Vocabulary · ${vocabulary.length} 词</span>
      </button>
      <button class="mode-card" data-nav="match" style="--card-glow: rgba(95,212,138,0.25)">
        <div class="mode-icon">🔗</div>
        <h3>英汉配对</h3>
        <p>把英文术语和中文快速配对，练反应速度。</p>
        <span class="mode-tag">Matching Game</span>
      </button>
      <button class="mode-card" data-nav="mcq" style="--card-glow: rgba(240,163,94,0.28)">
        <div class="mode-icon">✅</div>
        <h3>选择题挑战</h3>
        <p>知识点选择题，错了立刻看正确答案与解析。</p>
        <span class="mode-tag">Multiple Choice · ${questions.filter((q) => q.type === 'mcq').length} 题</span>
      </button>
      <button class="mode-card" data-nav="tf" style="--card-glow: rgba(255,107,122,0.22)">
        <div class="mode-icon">⚖️</div>
        <h3>判断题冲刺</h3>
        <p>对或错？快速检验易混淆概念。</p>
        <span class="mode-tag">True / False · ${questions.filter((q) => q.type === 'tf').length} 题</span>
      </button>
      <button class="mode-card" data-nav="periodic" style="--card-glow: rgba(240,163,94,0.3)">
        <div class="mode-icon">⚗️</div>
        <h3>元素周期表</h3>
        <p>浏览常见元素，再挑战符号 / 中文名 / 相对原子质量。</p>
        <span class="mode-tag">Periodic Table</span>
      </button>
      <button class="mode-card" data-nav="mass" style="--card-glow: rgba(62,207,207,0.22)">
        <div class="mode-icon">🧮</div>
        <h3>相对原子质量</h3>
        <p>背 Ar、算 Mr，化合物相对分子质量速练。</p>
        <span class="mode-tag">Ar & Mr Drill</span>
      </button>
      <button class="mode-card" data-nav="mixed" style="--card-glow: rgba(232,213,163,0.25)">
        <div class="mode-icon">🎲</div>
        <h3>综合随机测</h3>
        <p>三科混合抽题，模拟课堂小测节奏。</p>
        <span class="mode-tag">Mixed Quiz</span>
      </button>
      <button class="mode-card" data-nav="wrong" style="--card-glow: rgba(255,107,122,0.28)">
        <div class="mode-icon">📘</div>
        <h3>错题本</h3>
        <p>复习错过的题与词，巩固薄弱点。</p>
        <span class="mode-tag">Wrong Book · ${store.wrong.length}</span>
      </button>
    </div>
  `;
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
      document.getElementById('flash').classList.toggle('flipped', flipped);
    };
    document.getElementById('flip').onclick = () => {
      flipped = !flipped;
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
            floatText(window.innerWidth / 2, window.innerHeight * 0.35, '全部配对!', '#f0a35e');
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
      limit: mode === 'mixed' ? 12 : 10,
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
    const letters = ['A', 'B', 'C', 'D'];

    app.innerHTML = `
      ${topbar()}
      <div class="screen">
        <div class="screen-header">${backBtn()}<h2 class="screen-title">${title}</h2></div>
        <div class="filters">${subjectChips(subject)}</div>
        <div class="progress-wrap">
          <div class="progress-meta"><span>第 ${idx + 1} / ${queue.length} 题</span><span>正确 ${correctCount} · 连击 ${store.streak}</span></div>
          <div class="progress-bar"><div class="progress-fill" style="width:${(idx / queue.length) * 100}%"></div></div>
        </div>
        <div class="panel">
          <div class="flash-chapter" style="margin-bottom:10px">${subjects[q.subject]?.name || ''} · ${q.chapter}</div>
          <div class="quiz-prompt">${q.prompt}</div>
          ${
            q.type === 'mcq'
              ? `<div class="options" id="opts">${q.options
                  .map((o, i) => `<button class="option" data-i="${i}"><span class="key">${letters[i]}</span><span>${o}</span></button>`)
                  .join('')}</div>`
              : `<div class="tf-row" id="opts">
                  <button class="option" data-i="true"><span class="key">T</span><span>正确 True</span></button>
                  <button class="option" data-i="false"><span class="key">F</span><span>错误 False</span></button>
                </div>`
          }
          <div id="fb"></div>
          <div class="flash-actions" style="margin-top:18px;display:none" id="nextwrap">
            <button class="btn btn-primary" id="gonext">下一题 →</button>
          </div>
        </div>
      </div>`;

    answered = false;

    function finish(ok, correctText) {
      if (answered) return;
      answered = true;
      const fb = document.getElementById('fb');
      if (ok) {
        correctCount += 1;
        addXp(10, true);
        celebrate(true);
        fb.innerHTML = `<div class="feedback ok"><strong>正确！</strong>${q.explain}</div>`;
        clearWrong(q.id);
      } else {
        addXp(0, false);
        celebrate(false);
        fb.innerHTML = `<div class="feedback no"><strong>不正确</strong>正确答案：${correctText}<br>${q.explain}</div>`;
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

    app.querySelectorAll('#opts .option').forEach((btn) => {
      btn.onclick = () => {
        if (answered) return;
        const opts = [...app.querySelectorAll('#opts .option')];
        opts.forEach((b) => (b.disabled = true));

        if (q.type === 'mcq') {
          const choice = Number(btn.dataset.i);
          const ok = choice === q.answer;
          opts[q.answer].classList.add('correct');
          if (!ok) btn.classList.add('wrong');
          finish(ok, q.options[q.answer]);
        } else {
          const choice = btn.dataset.i === 'true';
          const ok = choice === q.answer;
          opts.forEach((b) => {
            const val = b.dataset.i === 'true';
            if (val === q.answer) b.classList.add('correct');
            else if (b === btn) b.classList.add('wrong');
          });
          finish(ok, q.answer ? '正确 True' : '错误 False');
        }
      };
    });

    app.querySelectorAll('[data-sub]').forEach((btn) => {
      btn.onclick = () => {
        subject = btn.dataset.sub;
        rebuild();
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
      app.innerHTML = `
        ${topbar()}
        <div class="screen">
          <div class="screen-header">${backBtn()}<h2 class="screen-title">元素周期表</h2>
            <button class="btn btn-primary" id="startq">开始元素测验</button>
          </div>
          <p style="color:var(--muted);margin-bottom:14px;font-size:0.92rem">点击元素查看详情 · 颜色：金属 / 非金属 / 类金属 / 稀有气体</p>
          <div class="panel">
            <div class="ptable">
              ${elements
                .map(
                  (e) => `<button class="el-cell ${e.category}" data-z="${e.z}">
                    <div class="el-z">${e.z}</div>
                    <div class="el-sym">${e.symbol}</div>
                    <div class="el-name">${e.zh}</div>
                    <div class="el-ar">${e.ar}</div>
                  </button>`
                )
                .join('')}
            </div>
            <div class="el-detail" id="detail"></div>
          </div>
        </div>`;

      document.getElementById('startq').onclick = startQuiz;
      app.querySelectorAll('.el-cell').forEach((btn) => {
        btn.onclick = () => {
          const e = elements.find((x) => x.z === Number(btn.dataset.z));
          const d = document.getElementById('detail');
          d.classList.add('show');
          d.innerHTML = `
            <div style="font-family:var(--font-display);font-size:1.6rem;margin-bottom:6px">${e.symbol} · ${e.zh} · ${e.en}</div>
            <div style="color:var(--muted);line-height:1.6">
              原子序数 Z = <strong style="color:var(--text)">${e.z}</strong><br>
              相对原子质量 Ar ≈ <strong style="color:var(--accent-2)">${e.ar}</strong><br>
              周期 Period ${e.period} · 族 Group ${e.group}<br>
              类别：${{ metal: '金属 metal', nonmetal: '非金属 non-metal', metalloid: '类金属 metalloid', noble: '稀有气体 noble gas' }[e.category]}
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
  app.querySelectorAll('[data-nav]').forEach((el) => {
    el.onclick = () => navigate(el.dataset.nav);
  });
}

function navigate(name) {
  const fn = routes[name] || renderHome;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  fn();
}

initCanvas();
navigate('home');
bindNav();
