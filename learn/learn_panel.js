/* Why Next? Learn panel: explanation, practice with instant feedback and hints, mastery check. */
const LEARN_PANEL=(()=>{
let CUR={p:[],m:[]};
const parseNum=s=>{s=String(s).trim().replace(/\s+/g,'').replace('−','-').replace(',','.');const f=s.match(/^(-?\d+)\/(\d+)$/);
 if(f)return +f[2]?+f[1]/+f[2]:NaN;return s===''?NaN:Number(s)};
/* deterministic shuffle that never shows an order item already solved */
function scramble(a){const h=s=>[...s].reduce((x,c)=>(x*31+c.charCodeAt(0))>>>0,7);let b=a.slice().sort((x,y)=>h(x)-h(y));
 if(b.every((x,i)=>x===a[i]))b=a.slice().reverse();return b}
function itemHtml(it,pre,i){const id=`${pre}-${it.id}`,lab=`${id}-q`;let body='';
 if(it.type==='mc')body=`<div class="choices" role="group" aria-labelledby="${lab}">${it.choices.map((c,k)=>`<button type="button" class="lbtn choice" data-k="${k}">${esc(c)}</button>`).join('')}</div>`;
 else if(it.type==='numeric')body=`<div class="numrow"><label class="sr" for="${id}-in">Your answer</label><input id="${id}-in" class="numin" inputmode="decimal" autocomplete="off" placeholder="Your answer"><button type="button" class="lbtn" data-act="check">Check</button></div>`;
 else body=`<p class="muted small">Drag to reorder, or use the ↑ ↓ buttons.</p><ol class="ord" aria-labelledby="${lab}">${scramble(it.items).map(x=>`<li draggable="true" data-v="${esc(x)}"><span class="grip" aria-hidden="true">⠿</span><span class="ov">${esc(x)}</span><button type="button" class="mv" data-mv="-1" aria-label="Move ${esc(x)} up">↑</button><button type="button" class="mv" data-mv="1" aria-label="Move ${esc(x)} down">↓</button></li>`).join('')}</ol><button type="button" class="lbtn" data-act="check">Check order</button>`;
 return `<div class="qi" id="${id}" data-pre="${pre}" data-i="${i}"><p class="qp" id="${lab}"><b>${i+1}.</b> ${esc(it.prompt)}</p>${body}
 <div class="qfoot">${pre==='p'?'<button type="button" class="linkish" data-act="hint">Show a hint</button>':''}</div><p class="fb" role="status" aria-live="polite"></p></div>`}
function panel(id){const n=N.get(id),les=LEARN.L[id];
 if(!les){const r=LEARN.resource(id),k=LEARN.known(id);
  return `<section class="card learn" id="learn" tabindex="-1" aria-labelledby="learnH"><h2 id="learnH" class="lh">Learn: ${esc(n.n)}</h2>
  <p><b>Lessons coming.</b> Interactive lessons are written so far for a counting → fractions → algebra path. Until this one is ready:</p>
  <ul><li>Read the description and prerequisite chain below; the reasons say what each step reuses.</li>${r?`<li>Free resource: <a href="${r.url}" target="_blank" rel="noopener">${esc(r.label)}</a> <span class="muted">(link checked ${LEARN_DATA.resourcesVerified})</span></li>`:''}</ul>
  ${LEARN.isNext(id)?`<p class="why">★ Recommended next. ${esc(LEARN.why(id))}</p>`:''}
  <button type="button" class="lbtn ghost" data-act="known">${k?'✓ Marked as known (undo)':'I already know this'}</button></section>`}
 const lv=LEARN.level(),pr=LEARN.prog(id),st=pr.status;CUR={p:les.practice.map(LEARN_GEN.make),m:LEARN_GEN.drawSet(les.mastery)};
 return `<section class="card learn" id="learn" tabindex="-1" aria-labelledby="learnH">
 <div class="lhead"><h2 id="learnH" class="lh">Learn: ${esc(les.title)}</h2>${st==='mastered'?'<span class="lb lb-m">✓ Mastered</span>':LEARN.isNext(id)?'<span class="lb lb-n">★ Learn next</span>':''}
 <div class="lvl" role="group" aria-label="Reading level"><button type="button" class="lbtn sm${lv==='kid'?' on':''}" aria-pressed="${lv==='kid'}" data-lv="kid">Kid</button><button type="button" class="lbtn sm${lv==='adult'?' on':''}" aria-pressed="${lv==='adult'}" data-lv="adult">Grown-up</button></div></div>
 ${LEARN.isNext(id)?`<p class="why">${esc(LEARN.why(id))}</p>`:''}${st!=='mastered'&&LEARN.known(id)?`<p class="why">✓ ${LEARN.assumed(id)?'You probably know this already (from your age band)':'You marked this as known'}. Use it as a refresher, or <button type="button" class="linkish" data-act="known">mark it as not known</button>.</p>`:''}
 <h3 class="lsub">1 · Understand it</h3><p class="key">💡 ${esc(les.keyIdea)}</p>${les.explain[lv].map(p=>`<p>${esc(p)}</p>`).join('')}
 ${les.familyTip?`<p class="tip"><b>${les.audience==='learner'?'Try this':'Try it at home'}:</b> ${esc(les.familyTip)}</p>`:''}
 <h3 class="lsub">2 · Practise <span class="muted small" id="pScore"></span></h3>${CUR.p.map((it,i)=>itemHtml(it,'p',i)).join('')}
 <h3 class="lsub">3 · Mastery check</h3><p class="muted small">${les.mastery.draw} questions drawn from a pool of ${les.mastery.pool.length}, with fresh numbers each try. One try each; get ${les.mastery.passMark} right to master this topic.${pr.best!=null?` Your best: ${pr.best}/${les.mastery.draw}.`:''}</p>
 <div id="mbox">${CUR.m.map((it,i)=>itemHtml(it,'m',i)).join('')}</div><p id="mres" class="mres" role="status" aria-live="polite"></p>
 <p class="muted small">Content status: ${esc(les.status)} (not yet reviewed by a teacher). <button type="button" class="linkish" data-act="reset">Reset this topic</button></p></section>`}
function mount(id){const root=document.getElementById('learn');if(!root)return;const les=LEARN.L[id];
 root.onclick=e=>{const b=e.target.closest('button');if(!b)return;
  if(b.dataset.lv){LEARN.setLevel(b.dataset.lv);select(id);document.getElementById('learn').focus();return}
  if(b.dataset.act==='known'){LEARN.setProg(id,{status:LEARN.known(id)?'unknown':'known'});LEARN.update();select(id);return}
  if(b.dataset.act==='reset'){LEARN.clear(id);LEARN.update();select(id);return}
  const q=b.closest('.qi');if(!q)return;const it=CUR[q.dataset.pre][+q.dataset.i];
  if(b.dataset.act==='hint'){fb(q,'💡 '+it.hint,'');return}
  if(b.dataset.mv){const li=b.closest('li'),d=+b.dataset.mv,sib=d<0?li.previousElementSibling:li.nextElementSibling;if(sib){d<0?sib.before(li):sib.after(li);b.focus()}return}
  if(q.dataset.done)return;
  let ans;if(it.type==='mc'){ans=+b.dataset.k;if(isNaN(ans))return;q.querySelectorAll('.choice').forEach(c=>c.classList.toggle('picked',c===b))}
  else if(b.dataset.act==='check'){ans=it.type==='numeric'?q.querySelector('input').value:[...q.querySelectorAll('.ord li')].map(l=>l.dataset.v)}else return;
  grade(q,it,ans,id)};
 root.querySelectorAll('.numin').forEach(inp=>inp.onkeydown=e=>{if(e.key==='Enter')inp.nextElementSibling.click()});
 let drag=null;root.querySelectorAll('.ord li').forEach(li=>{li.ondragstart=e=>{drag=li;e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain','')};
  li.ondragover=e=>{e.preventDefault();if(drag&&drag!==li&&drag.parentElement===li.parentElement){const r=li.getBoundingClientRect();(e.clientY<r.top+r.height/2)?li.before(drag):li.after(drag)}};li.ondragend=()=>drag=null})}
function fb(q,msg,kind){const p=q.querySelector('.fb');p.textContent=msg;p.className='fb '+kind}
function grade(q,it,ans,id){const les=LEARN.L[id],pre=q.dataset.pre;let ok;
 if(it.type==='mc')ok=ans===it.answer;else if(it.type==='numeric'){const v=parseNum(ans);if(isNaN(v)){fb(q,'Please type a number (for example 7 or 3/4).','');return}ok=Math.abs(v-it.answer)<=(it.tolerance||1e-9)}
 else ok=ans.every((x,i)=>x===it.items[i]);
 const tries=(+q.dataset.tries||0)+1;q.dataset.tries=tries;
 if(pre==='p'){if(ok){q.dataset.done=1;q.classList.add('ok');fb(q,'✓ Correct! '+it.explain,'good');
   const pr=LEARN.prog(id),pd=Object.assign({},pr.practice,{[it.id]:true});LEARN.setProg(id,{practice:pd,status:pr.status||'practising'});}
  else if(tries<2)fb(q,'Not quite. 💡 Hint: '+it.hint+' Have another go.','bad');
  else{fb(q,'Not quite. Here is how it works: '+it.explain+(it.type==='mc'?` (Answer: ${it.choices[it.answer]})`:it.type==='numeric'?` (Answer: ${it.answer})`:''),'bad');q.dataset.done=1}
  const pd=LEARN.prog(id).practice||{};const s=document.getElementById('pScore');if(s)s.textContent=`(${Object.keys(pd).length}/${les.practice.length} correct)`;return}
 q.dataset.done=1;q.dataset.ok=ok?1:'';q.classList.add(ok?'ok':'no');q.querySelectorAll('button,input').forEach(x=>{if(!x.classList.contains('mv'))x.disabled=true});
 fb(q,(ok?'✓ Correct. ':'✗ Not this time. ')+it.explain,ok?'good':'bad');
 const all=[...document.querySelectorAll('#mbox .qi')];if(!all.every(x=>x.dataset.done))return;
 const score=all.filter(x=>x.dataset.ok).length,pass=score>=les.mastery.passMark,pr=LEARN.prog(id),res=document.getElementById('mres');
 LEARN.setProg(id,{best:Math.max(score,pr.best||0),status:pass?'mastered':(pr.status==='mastered'?'mastered':'practising')});LEARN.update();
 res.innerHTML=pass?`🎉 <b>${score}/${all.length}: mastered!</b> It's ticked on the map. <button type="button" class="lbtn" id="goNext">What's next?</button>`
  :`<b>${score}/${all.length}.</b> Nearly there. Look back at the practice questions, then <button type="button" class="lbtn" id="retry">try the check again</button>`;
 const g=document.getElementById('goNext');if(g)g.onclick=()=>{const nx=LEARN.nextList(1)[0];if(nx){select(nx.id);document.getElementById('learn').focus()}};
 const r=document.getElementById('retry');if(r)r.onclick=()=>{select(id);const m=document.getElementById('mbox');if(m)m.scrollIntoView()}}
return{panel,mount,parseNum,scramble,cur:()=>CUR}})();
