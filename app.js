/* Spin — Spin the Bottle
   App logic. Expects PROMPTS and TAG_META to already be defined (see content.js). */

(function(){
  "use strict";

  // ---------------- State ----------------
  let state = {
    count: 4,
    categories: new Set(["icebreaker", "dare", "wildcard"]),
    round: 0,
    rotationAcc: 0,
    lastPickedIndex: -1,
    spinning: false
  };

  // ---------------- Setup screen elements ----------------
  const playerCountEl = document.getElementById('player-count');
  const categoryChips = document.getElementById('category-chips');

  function updatePlayerCountLabel(){
    playerCountEl.childNodes[0].nodeValue = state.count;
  }

  document.getElementById('minus-btn').addEventListener('click', ()=>{
    if(state.count > 3){ state.count--; updatePlayerCountLabel(); }
  });
  document.getElementById('plus-btn').addEventListener('click', ()=>{
    if(state.count < 8){ state.count++; updatePlayerCountLabel(); }
  });

  function renderCategoryChips(){
    categoryChips.innerHTML = "";
    Object.keys(TAG_META).forEach(key=>{
      const chip = document.createElement('div');
      chip.className = 'chip' + (state.categories.has(key) ? ' active' : '');
      chip.textContent = TAG_META[key].label;
      chip.addEventListener('click', ()=>{
        if(state.categories.has(key)){
          if(state.categories.size > 1) state.categories.delete(key);
        } else {
          state.categories.add(key);
        }
        renderCategoryChips();
      });
      categoryChips.appendChild(chip);
    });
  }

  updatePlayerCountLabel();
  renderCategoryChips();

  // ---------------- Screen switching ----------------
  const screenSetup = document.getElementById('screen-setup');
  const screenTable = document.getElementById('screen-table');

  function showScreen(el){
    [screenSetup, screenTable].forEach(s=>s.classList.remove('active'));
    el.classList.add('active');
  }

  let playerCount = 0;

  document.getElementById('start-btn').addEventListener('click', ()=>{
    playerCount = state.count;
    state.round = 1;
    state.rotationAcc = 0;
    state.lastPickedIndex = -1;
    document.getElementById('round-label').textContent = `Round ${state.round}`;
    document.getElementById('bottle-wrap').style.transform = 'rotate(0deg)';
    document.getElementById('spin-hint').style.opacity = '1';
    renderTable();
    showScreen(screenTable);
  });

  document.getElementById('back-btn').addEventListener('click', ()=> showScreen(screenSetup));
  document.getElementById('restart-btn').addEventListener('click', ()=>{
    if(confirm('Start a new game? This will reset the round.')){
      state.round = 1;
      state.rotationAcc = 0;
      state.lastPickedIndex = -1;
      document.getElementById('round-label').textContent = `Round ${state.round}`;
      document.getElementById('bottle-wrap').style.transform = 'rotate(0deg)';
      document.getElementById('spin-hint').style.opacity = '1';
      renderTable();
    }
  });

  // ---------------- Table rendering ----------------
  const tableCircle = document.getElementById('table-circle');

  function renderTable(){
    // remove old chips
    tableCircle.querySelectorAll('.player-chip').forEach(el=>el.remove());
    const n = playerCount;
    const radiusPct = 38; // percent of container radius
    for(let i=0;i<n;i++){
      const angleDeg = i * (360 / n); // 0 = top, clockwise
      const chip = document.createElement('div');
      chip.className = 'player-chip';
      chip.dataset.index = i;
      chip.style.transform = `translate(-50%,-50%) rotate(${angleDeg}deg) translateY(-${radiusPct}%) rotate(${-angleDeg}deg)`;
      chip.innerHTML = `<div class="player-dot"></div>`;
      tableCircle.appendChild(chip);
    }
  }

  // ---------------- Spin logic ----------------
  const bottleStage = document.getElementById('bottle-stage');
  const bottleWrap = document.getElementById('bottle-wrap');
  const spinHint = document.getElementById('spin-hint');

  function pickPlayerIndex(){
    const n = playerCount;
    if(n <= 1) return 0;
    let idx;
    do { idx = Math.floor(Math.random() * n); } while(idx === state.lastPickedIndex && n > 2);
    return idx;
  }

  function spin(){
    if(state.spinning) return;
    state.spinning = true;
    spinHint.style.opacity = '0';

    const n = playerCount;
    const targetIndex = pickPlayerIndex();
    state.lastPickedIndex = targetIndex;
    const sliceAngle = 360 / n;
    const targetAngle = targetIndex * sliceAngle + (Math.random() * (sliceAngle*0.5) - sliceAngle*0.25);

    const fullSpins = 5 + Math.floor(Math.random() * 3); // 5-7 full spins
    const currentMod = ((state.rotationAcc % 360) + 360) % 360;
    let delta = (targetAngle - currentMod + 360) % 360;
    const startRotation = state.rotationAcc;
    const endRotation = startRotation + fullSpins * 360 + delta;
    state.rotationAcc = endRotation;

    // Two phases: a long, strongly-decelerating spin, then a short elastic
    // "wobble" over the last few degrees so it doesn't just stop dead —
    // closer to how a real bottle loses momentum and rocks to a stop.
    const settleGap = 9; // degrees reserved for the wobble
    const spinTarget = endRotation - settleGap;
    const spinDuration = 2900;
    const settleDuration = 520;

    const easeOutQuint = t => 1 - Math.pow(1 - t, 5);
    const easeOutBack = t => {
      const c1 = 1.70158, c3 = c1 + 1;
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    };

    let phaseStart = null;

    function runSpinPhase(now){
      if(phaseStart === null) phaseStart = now;
      const t = Math.min((now - phaseStart) / spinDuration, 1);
      const angle = startRotation + (spinTarget - startRotation) * easeOutQuint(t);
      bottleWrap.style.transform = `rotate(${angle}deg)`;
      if(t < 1){
        requestAnimationFrame(runSpinPhase);
      } else {
        phaseStart = null;
        requestAnimationFrame(runSettlePhase);
      }
    }

    function runSettlePhase(now){
      if(phaseStart === null) phaseStart = now;
      const t = Math.min((now - phaseStart) / settleDuration, 1);
      const angle = spinTarget + (endRotation - spinTarget) * easeOutBack(t);
      bottleWrap.style.transform = `rotate(${angle}deg)`;
      if(t < 1){
        requestAnimationFrame(runSettlePhase);
      } else {
        bottleWrap.style.transform = `rotate(${endRotation}deg)`;
        state.spinning = false;
        highlightPlayer(targetIndex);
        showPrompt(targetIndex);
      }
    }

    requestAnimationFrame(runSpinPhase);
  }

  bottleStage.addEventListener('click', spin);
  bottleStage.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); spin(); }
  });

  function highlightPlayer(idx){
    tableCircle.querySelectorAll('.player-chip').forEach(chip=>{
      chip.classList.toggle('picked', Number(chip.dataset.index) === idx);
    });
  }

  // ---------------- Prompt modal ----------------
  const modalOverlay = document.getElementById('modal-overlay');
  const modalTag = document.getElementById('modal-tag');
  const modalPrompt = document.getElementById('modal-prompt');

  let currentCategory = null;

  function randomCategory(){
    const active = Array.from(state.categories);
    return active[Math.floor(Math.random() * active.length)];
  }

  function fillPrompt(){
    currentCategory = randomCategory();
    const list = PROMPTS[currentCategory];
    const text = list[Math.floor(Math.random() * list.length)];
    const meta = TAG_META[currentCategory];
    modalTag.textContent = meta.label;
    modalTag.className = 'modal-tag ' + meta.cls;
    modalPrompt.textContent = text;
  }

  function showPrompt(idx){
    fillPrompt();
    modalOverlay.classList.add('show');
  }

  document.getElementById('shuffle-btn').addEventListener('click', fillPrompt);

  document.getElementById('next-round-btn').addEventListener('click', ()=>{
    modalOverlay.classList.remove('show');
    state.round++;
    document.getElementById('round-label').textContent = `Round ${state.round}`;
    setTimeout(()=>{ spinHint.style.opacity = '1'; }, 300);
  });

})();
