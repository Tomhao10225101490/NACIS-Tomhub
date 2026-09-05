/* —— Tom's Ground · IELTS / Chinese / Math runners —— */

function isIeltsDayDone(n) {
  return Boolean(store.ieltsProgress[String(n)]?.done);
}

function markIeltsDayDone(n) {
  store.ieltsProgress[String(n)] = { done: true, at: Date.now() };
  save();
}

function ieltsDoneCount() {
  return ieltsDays.filter((d) => isIeltsDayDone(d.day)).length;
}

function renderIeltsDays() {
  currentRoute = 'ielts-days';
  app.innerHTML = `
    ${topbar()}
    <div class="screen">
      <div class="screen-header">${backBtn('hub-english')}<h2 class="screen-title">${tb('ieltsDays')}</h2></div>
      <p class="days-intro">${tb('band7')} · ${tb('words25')} · ${tb('ieltsMemorize')} → ${tb('ieltsSpot')}</p>
      <div class="day-grid">
        ${ieltsDays
          .map((d) => {
            const done = isIeltsDayDone(d.day);
            return `<button class="day-card ${done ? 'done' : ''}" data-ielts-day="${d.day}">
              <div class="day-num">${tb('dayOf', { n: d.day })}</div>
              <div class="day-name">${getLang() === 'en' ? d.title : d.titleZh}</div>
              <div class="day-zh">${d.topic || ''}</div>
              <div class="day-meta">25 ${tb('words')}</div>
              <div class="day-status">${done ? '✓ ' + tb('done') : tb('start')}</div>
            </button>`;
          })
          .join('')}
      </div>
    </div>`;
}

function startIeltsDay(dayNum) {
  const plan = getIeltsDay(dayNum);
  if (!plan) return;
  const words = ieltsDayWords(plan);
  let step = 0;
  let idx = 0;
  let flipped = false;
  let spotIdx = 0;
  let spotCorrect = 0;
  let locked = false;
  let spotItems = [];

  function buildSpot() {
    spotItems = shuffle(words.slice()).map((w) => {
      const askZh = Math.random() > 0.4;
      const distractors = shuffle(ieltsWords.filter((x) => x.id !== w.id))
        .slice(0, 3)
        .map((x) => x.word);
      return {
        id: w.id,
        prompt: askZh ? `${w.zh}\n(${w.pos})` : `${w.enDef}\n(${w.pos})`,
        answer: w.word,
        tip: `${w.word} ${w.phonetic || ''}\n${w.zh} · ${w.enDef}\n${w.example || ''}\n${w.exampleZh || ''}`,
        options: shuffle([w.word, ...distractors]),
      };
    });
  }

  function paint() {
    if (step === 0) {
      app.innerHTML = `
        ${topbar()}
        <div class="screen">
          <div class="screen-header">${backBtn('ielts-days')}<h2 class="screen-title">${tb('dayOf', { n: plan.day })}</h2></div>
          <div class="panel day-intro ielts-intro">
            <div class="flash-chapter">${tb('band7')} · ${plan.topic || ''}</div>
            <h3>${getLang() === 'en' ? plan.title : plan.titleZh}</h3>
            <p>${tb('words25')}</p>
            <div class="day-pipeline"><span>1 ${tb('ieltsMemorize')}</span><span>2 ${tb('ieltsSpot')}</span></div>
            <button class="btn btn-primary" id="go">${tb('startMemorize')}</button>
          </div>
        </div>`;
      document.getElementById('go').onclick = () => {
        sfxClick();
        step = 1;
        idx = 0;
        flipped = false;
        paint();
      };
      return;
    }

    if (step === 1) {
      const w = words[idx];
      app.innerHTML = `
        ${topbar()}
        <div class="screen">
          <div class="screen-header">${backBtn('ielts-days')}<h2 class="screen-title">${tb('ieltsMemorize')}</h2></div>
          <div class="step-pills"><span class="on">1 ${tb('ieltsMemorize')}</span><span>2 ${tb('ieltsSpot')}</span></div>
          <div class="progress-wrap">
            <div class="progress-meta"><span>${idx + 1} / ${words.length}</span><span>${w.topic || ''}</span></div>
            <div class="progress-bar"><div class="progress-fill" style="width:${((idx + 1) / words.length) * 100}%"></div></div>
          </div>
          <div class="flash-card ielts-card ${flipped ? 'flipped' : ''}" id="flash">
            <div class="flash-inner">
              <div class="flash-face front">
                <div class="flash-chapter">${w.pos} · ${w.phonetic || ''}</div>
                <div class="flash-main">${w.word}</div>
                <div class="flash-sub">${tb('tapFlip')}</div>
              </div>
              <div class="flash-face back">
                <div class="flash-chapter">${w.word}</div>
                <div class="flash-main">${w.zh}</div>
                <div class="flash-tip">${w.enDef}</div>
                <div class="flash-example"><strong>${tb('example')}</strong> ${w.example || ''}<br>${w.exampleZh || ''}</div>
              </div>
            </div>
          </div>
          <div class="flash-actions">
            <button class="btn" id="prev" ${idx === 0 ? 'disabled' : ''}>${tb('prev')}</button>
            <button class="btn" id="flip">${tb('flip')}</button>
            <button class="btn btn-primary" id="nx">${idx >= words.length - 1 ? tb('toSpot') : tb('next')}</button>
          </div>
        </div>`;
      const doFlip = () => {
        flipped = !flipped;
        sfxFlip();
        paint();
      };
      document.getElementById('flash').onclick = doFlip;
      document.getElementById('flip').onclick = doFlip;
      document.getElementById('prev').onclick = () => {
        if (idx > 0) {
          idx -= 1;
          flipped = false;
          sfxClick();
          paint();
        }
      };
      document.getElementById('nx').onclick = () => {
        sfxClick();
        if (idx >= words.length - 1) {
          buildSpot();
          step = 2;
          spotIdx = 0;
          spotCorrect = 0;
          paint();
        } else {
          idx += 1;
          flipped = false;
          paint();
        }
      };
      return;
    }

    if (step === 2) {
      if (spotIdx >= spotItems.length) {
        step = 3;
        paint();
        return;
      }
      const item = spotItems[spotIdx];
      locked = false;
      app.innerHTML = `
        ${topbar()}
        <div class="screen wg-play">
          <div class="screen-header">${backBtn('ielts-days')}<h2 class="screen-title">${tb('ieltsSpot')}</h2></div>
          <div class="step-pills"><span>✓ ${tb('ieltsMemorize')}</span><span class="on">2 ${tb('ieltsSpot')}</span></div>
          <div class="wg-hud">
            <span class="pill">${spotIdx + 1} / ${spotItems.length}</span>
            <span class="pill">🔥 ${store.streak}</span>
            <span class="pill">✓ ${spotCorrect}</span>
          </div>
          <div class="progress-wrap">
            <div class="progress-bar"><div class="progress-fill" style="width:${(spotIdx / spotItems.length) * 100}%"></div></div>
          </div>
          <div class="wg-question">
            <div class="wg-q-meta">${tb('spotHint')}</div>
            <div class="wg-q-text">${localizeHtml(item.prompt)}</div>
          </div>
          <div class="wg-options" id="opts">
            ${item.options
              .map(
                (o, i) =>
                  `<button class="wg-opt" data-v="${o}"><span class="shape">${'ABCD'[i]}</span><span>${o}</span></button>`
              )
              .join('')}
          </div>
          <div id="fb"></div>
          <div class="flash-actions" style="display:none;margin-top:14px" id="nw">
            <button class="btn btn-primary" id="nx">${tb('nextArrow')}</button>
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
            spotCorrect += 1;
            addXp(10, true);
            celebrate(true);
            document.getElementById('fb').innerHTML = feedbackOk(item.tip);
          } else {
            addXp(0, false);
            celebrate(false);
            document.getElementById('fb').innerHTML = feedbackNo(item.answer, item.tip);
            recordWrong({
              id: `ielts-${item.id}-${Date.now()}`,
              kind: 'ielts',
              prompt: item.prompt,
              correctText: item.answer,
              explain: item.tip,
              subject: 'english',
            });
          }
          document.getElementById('nw').style.display = 'flex';
          document.getElementById('nx').onclick = () => {
            spotIdx += 1;
            paint();
          };
        };
      });
      return;
    }

    markIeltsDayDone(plan.day);
    const pct = Math.round((spotCorrect / Math.max(1, spotItems.length)) * 100);
    const next = getIeltsDay(plan.day + 1);
    celebrate(true);
    app.innerHTML = `
      ${topbar()}
      <div class="screen">
        <div class="screen-header">${backBtn('home')}<h2 class="screen-title">${tb('spotDone')}</h2></div>
        <div class="panel results" style="--pct:${pct}">
          <div class="score-ring">${pct}%</div>
          <h3>${spotCorrect} / ${spotItems.length} ${tb('correctN')}</h3>
          <p>${pct >= 80 ? tb('great') : pct >= 60 ? tb('okish') : tb('keepGoing')}</p>
          <div class="flash-actions">
            ${next ? `<button class="btn btn-primary" data-ielts-day="${next.day}">${tb('nextDay')}</button>` : ''}
            <button class="btn" data-hub="english">${tb('ieltsDays')}</button>
            <button class="btn" data-nav="home">${tb('home')}</button>
          </div>
        </div>
      </div>`;
  }

  paint();
}

function renderIeltsFreeSpot() {
  currentRoute = 'ielts-spot';
  const words = shuffle(ieltsWords.slice()).slice(0, 25);
  let spotIdx = 0;
  let spotCorrect = 0;
  let locked = false;
  const spotItems = words.map((w) => {
    const askZh = Math.random() > 0.4;
    const distractors = shuffle(ieltsWords.filter((x) => x.id !== w.id))
      .slice(0, 3)
      .map((x) => x.word);
    return {
      id: w.id,
      prompt: askZh ? `${w.zh}\n(${w.pos})` : `${w.enDef}\n(${w.pos})`,
      answer: w.word,
      tip: `${w.word} · ${w.zh} · ${w.enDef}`,
      options: shuffle([w.word, ...distractors]),
    };
  });

  function paint() {
    if (spotIdx >= spotItems.length) {
      const pct = Math.round((spotCorrect / spotItems.length) * 100);
      app.innerHTML = `
        ${topbar()}
        <div class="screen">
          <div class="screen-header">${backBtn('hub-english')}<h2 class="screen-title">${tb('results')}</h2></div>
          <div class="panel results" style="--pct:${pct}">
            <div class="score-ring">${pct}%</div>
            <h3>${spotCorrect}/${spotItems.length}</h3>
            <div class="flash-actions">
              <button class="btn btn-primary" data-nav="ielts-spot">${tb('again')}</button>
              <button class="btn" data-hub="english">${tb('home')}</button>
            </div>
          </div>
        </div>`;
      return;
    }
    const item = spotItems[spotIdx];
    locked = false;
    app.innerHTML = `
      ${topbar()}
      <div class="screen wg-play">
        <div class="screen-header">${backBtn('hub-english')}<h2 class="screen-title">${tb('ieltsSpot')}</h2></div>
        <div class="wg-hud">
          <span class="pill">${spotIdx + 1}/${spotItems.length}</span>
          <span class="pill">✓ ${spotCorrect}</span>
        </div>
        <div class="wg-question">
          <div class="wg-q-meta">${tb('spotHint')}</div>
          <div class="wg-q-text">${localizeHtml(item.prompt)}</div>
        </div>
        <div class="wg-options">
          ${item.options
            .map((o, i) => `<button class="wg-opt" data-v="${o}"><span class="shape">${'ABCD'[i]}</span><span>${o}</span></button>`)
            .join('')}
        </div>
        <div id="fb"></div>
        <div class="flash-actions" style="display:none;margin-top:14px" id="nw">
          <button class="btn btn-primary" id="nx">${tb('nextArrow')}</button>
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
          else b.classList.add('dim');
          if (b === btn && !ok) b.classList.add('wrong');
        });
        if (ok) {
          spotCorrect += 1;
          addXp(8, true);
          celebrate(true);
          document.getElementById('fb').innerHTML = feedbackOk(item.tip);
        } else {
          addXp(0, false);
          celebrate(false);
          document.getElementById('fb').innerHTML = feedbackNo(item.answer, item.tip);
        }
        document.getElementById('nw').style.display = 'flex';
        document.getElementById('nx').onclick = () => {
          spotIdx += 1;
          paint();
        };
      };
    });
  }
  paint();
}

function renderSubjectFlash(kind) {
  currentRoute = kind === 'chinese' ? 'cn-flash' : 'math-flash';
  const list = shuffle((kind === 'chinese' ? chineseVocab : mathVocab).slice()).slice(0, 30);
  let idx = 0;
  let flipped = false;
  const back = kind === 'chinese' ? 'hub-chinese' : 'hub-math';

  function paint() {
    const w = list[idx];
    const front = kind === 'chinese' ? w.term : w.zh;
    const backMain = kind === 'chinese' ? w.zh : w.en;
    const tip = kind === 'chinese' ? `${w.en || ''}\n${w.tip || ''}` : `${w.detail || ''}\n${w.tip || ''}`;
    const chapter = kind === 'chinese' ? w.category : w.chapter;
    app.innerHTML = `
      ${topbar()}
      <div class="screen">
        <div class="screen-header">${backBtn(back)}<h2 class="screen-title">${kind === 'chinese' ? tb('chineseFlash') : tb('mathFlash')}</h2></div>
        <div class="progress-wrap">
          <div class="progress-meta"><span>${idx + 1}/${list.length}</span></div>
          <div class="progress-bar"><div class="progress-fill" style="width:${((idx + 1) / list.length) * 100}%"></div></div>
        </div>
        <div class="flash-card ${flipped ? 'flipped' : ''}" id="flash">
          <div class="flash-inner">
            <div class="flash-face front">
              <div class="flash-chapter">${chapter || ''}</div>
              <div class="flash-main">${front}</div>
              <div class="flash-sub">${tb('tapFlip')}</div>
            </div>
            <div class="flash-face back">
              <div class="flash-main">${backMain}</div>
              <div class="flash-tip">${tip}</div>
            </div>
          </div>
        </div>
        <div class="flash-actions">
          <button class="btn" id="prev" ${idx === 0 ? 'disabled' : ''}>${tb('prev')}</button>
          <button class="btn" id="flip">${tb('flip')}</button>
          <button class="btn btn-primary" id="nx">${idx >= list.length - 1 ? tb('home') : tb('next')}</button>
        </div>
      </div>`;
    const doFlip = () => {
      flipped = !flipped;
      sfxFlip();
      paint();
    };
    document.getElementById('flash').onclick = doFlip;
    document.getElementById('flip').onclick = doFlip;
    document.getElementById('prev').onclick = () => {
      if (idx > 0) {
        idx -= 1;
        flipped = false;
        paint();
      }
    };
    document.getElementById('nx').onclick = () => {
      if (idx >= list.length - 1) {
        navigate(back);
        return;
      }
      idx += 1;
      flipped = false;
      sfxClick();
      paint();
    };
  }
  paint();
}

function renderSubjectQuiz(kind) {
  currentRoute = kind === 'chinese' ? 'cn-quiz' : 'math-quiz';
  const bank = shuffle((kind === 'chinese' ? chineseQuestions : mathQuestions).slice()).slice(0, 20);
  let idx = 0;
  let correct = 0;
  let locked = false;
  const back = kind === 'chinese' ? 'hub-chinese' : 'hub-math';

  function paint() {
    if (idx >= bank.length) {
      const pct = Math.round((correct / bank.length) * 100);
      app.innerHTML = `
        ${topbar()}
        <div class="screen">
          <div class="screen-header">${backBtn(back)}<h2 class="screen-title">${tb('results')}</h2></div>
          <div class="panel results" style="--pct:${pct}">
            <div class="score-ring">${pct}%</div>
            <h3>${correct}/${bank.length}</h3>
            <div class="flash-actions">
              <button class="btn btn-primary" data-nav="${currentRoute}">${tb('again')}</button>
              <button class="btn" data-hub="${kind}">${tb('home')}</button>
            </div>
          </div>
        </div>`;
      return;
    }
    const q = bank[idx];
    locked = false;
    const opts =
      q.type === 'tf'
        ? `<div class="wg-options tf-row" id="opts">
            <button class="wg-opt" data-i="true"><span class="shape">T</span><span>${tb('trueOpt')}</span></button>
            <button class="wg-opt" data-i="false"><span class="shape">F</span><span>${tb('falseOpt')}</span></button>
          </div>`
        : wgMcqHtml(q.options);

    app.innerHTML = `
      ${topbar()}
      <div class="screen wg-play">
        <div class="screen-header">${backBtn(back)}<h2 class="screen-title">${kind === 'chinese' ? tb('chineseQuiz') : tb('mathQuiz')}</h2></div>
        <div class="wg-hud">
          <span class="pill">${idx + 1}/${bank.length}</span>
          <span class="pill">✓ ${correct}</span>
        </div>
        <div class="wg-question">
          <div class="wg-q-meta">${q.category || q.chapter || ''}</div>
          <div class="wg-q-text">${localizeHtml(q.prompt)}</div>
        </div>
        ${opts}
        <div id="fb"></div>
        <div class="flash-actions" style="display:none;margin-top:14px" id="nw">
          <button class="btn btn-primary" id="nx">${tb('nextArrow')}</button>
        </div>
      </div>`;

    app.querySelectorAll('.wg-opt').forEach((btn) => {
      btn.onclick = () => {
        if (locked) return;
        locked = true;
        let ok = false;
        let correctText = '';
        if (q.type === 'tf') {
          const choice = btn.dataset.i === 'true';
          ok = choice === q.answer;
          correctText = q.answer ? tb('trueOpt') : tb('falseOpt');
        } else {
          const choice = Number(btn.dataset.i);
          ok = choice === q.answer;
          correctText = q.options[q.answer];
        }
        app.querySelectorAll('.wg-opt').forEach((b) => {
          b.disabled = true;
          if (q.type === 'mcq') {
            if (Number(b.dataset.i) === q.answer) b.classList.add('correct');
            else b.classList.add('dim');
          } else {
            const val = b.dataset.i === 'true';
            if (val === q.answer) b.classList.add('correct');
            else b.classList.add('dim');
          }
          if (b === btn && !ok) b.classList.add('wrong');
        });
        if (ok) {
          correct += 1;
          addXp(10, true);
          celebrate(true);
          document.getElementById('fb').innerHTML = feedbackOk(q.explain);
        } else {
          addXp(0, false);
          celebrate(false);
          document.getElementById('fb').innerHTML = feedbackNo(correctText, q.explain);
          recordWrong({
            id: q.id,
            kind,
            prompt: q.prompt,
            correctText,
            explain: q.explain,
            subject: kind,
          });
        }
        document.getElementById('nw').style.display = 'flex';
        document.getElementById('nx').onclick = () => {
          idx += 1;
          paint();
        };
      };
    });
  }
  paint();
}
