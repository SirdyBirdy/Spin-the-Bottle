/* Botal Ghumao — Spin the Bottle (Desi Edition)
   App logic. Expects PROMPTS and TAG_META to already be defined (see content.js). */

(function(){
  "use strict";

  // ---------------- State ----------------
  let state = {
    count: 4,
    names: ["", "", "", ""],
    categories: new Set(["icebreaker", "dare", "bollywood"]),
    round: 0,
    rotationAcc: 0,
    lastPickedIndex: -1,
    spinning: false
  };

  // ---------------- Setup screen elements ----------------
  const namesList = document.getElementById('names-list');
  const playerCountEl = document.getElementById('player-count');
  const categoryChips = document.getElementById('category-chips');

  function renderNameInputs(){
    namesList.innerHTML = "";
    for(let i=0;i<state.count;i++){
      const input = document.createElement('input');
      input.className = 'name-input';
      input.placeholder = `Player ${i+1}`;
      input.maxLength = 14;
      input.value = state.names[i] || "";
      input.addEventListener('input', (e)=>{ state.names[i] = e.target.value; });
      namesList.appendChild(input);
    }
    playerCountEl.childNodes[0].nodeValue = state.count;
  }

  document.getElementById('minus-btn').addEventListener('click', ()=>{
    if(state.count > 3){ state.count--; state.names.length = state.count; renderNameInputs(); }
  });
  document.getElementById('plus-btn').addEventListener('click', ()=>{
    if(state.count < 8){ state.count++; state.names.push(""); renderNameInputs(); }
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

  renderNameInputs();
  renderCategoryChips();

  // ---------------- Screen switching ----------------
  const screenSetup = document.getElementById('screen-setup');
  const screenTable = document.getElementById('screen-table');

  function showScreen(el){
    [screenSetup, screenTable].forEach(s=>s.classList.remove('active'));
    el.classList.add('active');
  }

  let players = [];

  document.getElementById('start-btn').addEventListener('click', ()=>{
    players = [];
    for(let i=0;i<state.count;i++){
      const n = (state.names[i] || "").trim();
      players.push(n || `Player ${i+1}`);
    }
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
    if(confirm('Naya khel shuru karein? Round reset ho jayega.')){
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
    const n = players.length;
    const radiusPct = 38; // percent of container radius
    players.forEach((name, i)=>{
      const angleDeg = i * (360 / n); // 0 = top, clockwise
      const chip = document.createElement('div');
      chip.className = 'player-chip';
      chip.dataset.index = i;
      chip.style.transform = `translate(-50%,-50%) rotate(${angleDeg}deg) translateY(-${radiusPct}%) rotate(${-angleDeg}deg)`;
      chip.innerHTML = `<div class="player-avatar">${initials(name)}</div><div class="player-name">${escapeHtml(name)}</div>`;
      tableCircle.appendChild(chip);
    });
  }

  function initials(name){
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if(parts.length === 0) return "?";
    if(parts.length === 1) return parts[0].slice(0,2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  function escapeHtml(str){
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  // ---------------- Spin logic ----------------
  const bottleStage = document.getElementById('bottle-stage');
  const bottleWrap = document.getElementById('bottle-wrap');
  const spinHint = document.getElementById('spin-hint');

  function pickPlayerIndex(){
    const n = players.length;
    if(n <= 1) return 0;
    let idx;
    do { idx = Math.floor(Math.random() * n); } while(idx === state.lastPickedIndex && n > 2);
    return idx;
  }

  function spin(){
    if(state.spinning) return;
    state.spinning = true;
    spinHint.style.opacity = '0';

    const n = players.length;
    const targetIndex = pickPlayerIndex();
    state.lastPickedIndex = targetIndex;
    const sliceAngle = 360 / n;
    const targetAngle = targetIndex * sliceAngle + (Math.random() * (sliceAngle*0.5) - sliceAngle*0.25);

    const fullSpins = 5 + Math.floor(Math.random() * 3); // 5-7 full spins
    const currentMod = ((state.rotationAcc % 360) + 360) % 360;
    let delta = (targetAngle - currentMod + 360) % 360;
    const newRotation = state.rotationAcc + fullSpins * 360 + delta;
    state.rotationAcc = newRotation;

    bottleWrap.style.transition = 'transform 3.4s cubic-bezier(0.15, 0.85, 0.2, 1)';
    bottleWrap.style.transform = `rotate(${newRotation}deg)`;

    setTimeout(()=>{
      state.spinning = false;
      highlightPlayer(targetIndex);
      burstConfetti();
      showPrompt(targetIndex);
    }, 3500);
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

  // ---------------- Confetti (gulal burst) ----------------
  const gulalColors = ['#FF8A3D','#FF4D8D','#3E8E62','#D4A93B','#8B5CF6'];
  function burstConfetti(){
    const rect = bottleStage.getBoundingClientRect();
    const cx = rect.left + rect.width/2;
    for(let i=0;i<28;i++){
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = (cx + (Math.random()*160 - 80)) + 'px';
      piece.style.background = gulalColors[Math.floor(Math.random()*gulalColors.length)];
      piece.style.animationDuration = (1.8 + Math.random()*1.2) + 's';
      piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      document.body.appendChild(piece);
      setTimeout(()=>piece.remove(), 3200);
    }
  }

  // ---------------- Prompt modal ----------------
  const modalOverlay = document.getElementById('modal-overlay');
  const modalTag = document.getElementById('modal-tag');
  const modalName = document.getElementById('modal-name');
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
    modalName.textContent = players[idx];
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
