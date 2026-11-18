/* Flagship – learning from worked examples (ages 7–9; EEF Metacognition and Self-regulated Learning guidance 2018,
   recommendation 3, modelling with worked examples; Rosenshine 2012 'provide models'; the worked-example effect,
   Sweller and Cooper 1985; self-explanation, Chi et al. 1989; faded examples, Renkl and Atkinson 2003). The example is
   Year 3 column addition (47 + 28). Match each reason to its step, check three examples for slips, fill faded examples
   with fewer steps shown each time, pick the word problems that share the example's structure, then solve a new sum
   where copying the example's answer is the trap. Not flagcol (teaching column addition itself) or flagtalk. */
(()=>{const {EX,WHY,SLIP,FADE,STORY,MATCH,MINE,QS}=WKX;
VIS.reg('flagworked',c=>{let A,pad,cq,qi=-1,epoch=0;const W={};
const INK='#111827',GO='#047857',ERR='#b91c1c',GREY='#6b7280',HOT='#7c3aed',PAPER='#fffdf5',PX='px system-ui,sans-serif';
const phase=()=>['why','slip','fade','match','mine','quiz'][A.step];
const fz=n=>A.narrow?n:Math.round(n*1.12);
function ground(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#e0e7ff',A.col.dark?.06:.45);g.fillRect(0,0,A.W,A.H)}
function wrapT(t,max){const g=A.ctx,out=[''];t.split(' ').forEach(w=>{const s=out[out.length-1]?out[out.length-1]+' '+w:w;if(g.measureText(s).width>max&&out[out.length-1])out.push(w);else out[out.length-1]=s});return out}
function note(t,y,o){o=o||{};const g=A.ctx,n=fz(o.n||14);g.font=`${o.w||800} ${n}${PX}`;const max=Math.min(A.W-36,560),L=wrapT(t,max-20),h=L.length*(n+5)+14,w=Math.min(max,Math.max(...L.map(s=>g.measureText(s).width))+28),x=(A.W-w)/2;
 g.fillStyle=o.bg||'#ffffff';A.paint.rrect(x,y,w,h,12);g.fill();g.lineWidth=o.ok||o.on?3:1.5;g.strokeStyle=o.ok?GO:o.on?HOT:GREY;g.stroke();
 g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';L.forEach((s,j)=>g.fillText(s,A.W/2,y+7+(n+5)*(j+.5)));return{x,y,w,h}}
function rowsR(n,top,bot){const gap=8,h=Math.max(40,Math.min(62,(bot-top-gap*(n-1))/n)),w=Math.min(A.W-24,520);return Array.from({length:n},(_,j)=>({j,x:(A.W-w)/2,y:top+j*(h+gap),w,h}))}
function row(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.bad?'#fee2e2':o.good?'#dcfce7':PAPER;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();
 g.lineWidth=o.bad||o.good||o.on?3:1.5;g.strokeStyle=o.bad?ERR:o.good?GO:o.on?HOT:GREY;g.stroke();g.fillStyle=INK;g.textBaseline='middle';
 if(o.num!=null){g.font=`900 ${fz(13)}${PX}`;g.textAlign='center';g.fillText(String(o.num),r.x+18,r.y+r.h/2)}
 g.font=`${o.mid?800:700} ${fz(16)}${PX}`;g.textAlign=o.mid?'center':'left';g.fillText(t,o.mid?r.x+r.w/2:r.x+36,r.y+r.h/2+1,r.w-(o.tag?110:46));
 if(o.tag){g.font=`800 ${fz(12)}${PX}`;g.textAlign='right';g.fillStyle=GO;g.fillText(o.tag,r.x+r.w-10,r.y+r.h/2)}}
function chipsR(vals,y){const g=A.ctx,n=fz(18);g.font=`900 ${n}${PX}`;const ws=vals.map(v=>Math.max(64,g.measureText(v).width+34)),gap=14,tot=ws.reduce((a,b)=>a+b,0)+gap*(vals.length-1);let x=(A.W-tot)/2;
 return vals.map((v,j)=>{const r={j,v,x,y,w:ws[j],h:Math.max(48,n+26),n};x+=ws[j]+gap;return r})}
function chip(r,x,y,o){o=o||{};const g=A.ctx;g.fillStyle=o.bad?'#fee2e2':'#ffffff';A.paint.rrect(x,y,r.w,r.h,r.h/2);g.fill();g.lineWidth=o.bad||o.on?4:2;g.strokeStyle=o.bad?ERR:o.on?HOT:GREY;g.stroke();
 g.fillStyle=INK;g.font=`900 ${r.n}${PX}`;g.textAlign='center';g.textBaseline='middle';g.fillText(r.v,x+r.w/2,y+r.h/2+1)}
const on=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const spin=(a,k)=>a.slice(k%a.length).concat(a.slice(0,k%a.length));
/* 1. why is each step there? */
const whyRows=()=>rowsR(4,A.H*.44,A.H*.97);
function drawWhy(){const s=W.a;ground();
 if(s.k>=4)note('All 4 reasons matched. You can explain every step.',A.H*.05,{ok:1});else note(`Why? ${WHY[s.k][1]}`,A.H*.04,{on:1,n:14});
 note(`Worked example: ${EX.q}`,A.H*.3,{n:13,bg:'#e0e7ff'});
 whyRows().forEach(r=>row(r,EX.lines[r.j],{num:r.j+1,good:s.tied[r.j]!=null,bad:s.bad===r.j,tag:s.tied[r.j]!=null?'✓ why':''}))}
function tie(j){const s=W.a;if(s.k>=4)return;const [line,why]=WHY[s.k];
 if(j!==line){s.bad=j;A.sound.miss();return tell(`Step ${j+1} says "${EX.lines[j]}". The reason "${why}" explains a different step. Which step does it fit?`)}
 s.tied[j]=s.k;s.k++;s.bad=-1;A.sound.pop();tell(`Yes, that reason explains step ${j+1}: ${EX.lines[j]}.`+(s.k>=4?' Every step now has its reason.':` ${s.k} of 4 reasons matched.`))}
/* 2. spot the slip */
const slipRows=()=>rowsR(5,A.H*.17,A.H*.97);
function drawSlip(){const s=W.b;ground();
 if(s.r>=3){note('All 3 checked: two slips found, one example fully right',A.H*.06,{ok:1});['36 + 27 = 63, not 53','58 + 4 = 62, not 102','29 + 14 = 43 ✓'].forEach((t,j)=>note(t,A.H*(.3+j*.18),{n:16}));return}
 const E=SLIP[s.r];note(`Check example ${s.r+1} of 3: ${E.q}. Tap the wrong step.`,A.H*.03,{n:13});
 slipRows().forEach(r=>r.j<4?row(r,E.lines[r.j],{num:r.j+1,bad:s.bad===r.j}):row(r,'✓ All steps are right',{mid:1,bad:s.bad===4}))}
function check(j){const s=W.b;if(s.r>=3)return;const E=SLIP[s.r],pick=j===4?-1:j;
 if(pick!==E.bad){s.bad=j;A.sound.miss();return tell(pick===-1?'Not this time: one step has a slip. Redo each step with the numbers yourself.':E.bad===-1?`Step ${j+1} is right. Check it: ${E.lines[j]}. Look at every step before you decide.`:`Step ${j+1} is right: ${E.lines[j]}. Keep checking the other steps.`)}
 s.r++;s.bad=-1;A.sound.pop();tell(E.why+(s.r>=3?' All 3 checked.':''))}
/* 3. faded examples */
const fadeRows=()=>rowsR(4,A.H*.17,A.H*.7);
function fadeOpts(){const s=W.c,gp=FADE[s.r].gaps[s.g];return spin([gp[1],...gp[2].map(o=>o[0])],s.r+s.g)}
const fadeChips=()=>chipsR(fadeOpts(),A.H*.78);
function lineWith(r,j){const s=W.c,F=FADE[r];let t=F.lines[j];F.gaps.forEach((gp,k)=>{if(gp[0]===j&&k<s.g)t=t.replace('▢',gp[1])});return t}
function drawFade(){const s=W.c;ground();
 if(s.r>=3){note('All 3 faded examples finished',A.H*.06,{ok:1});note('1 gap, then 2 gaps, then 4: you did more of the work each time',A.H*.32,{n:15});note('56 + 37 = 93 · 45 + 38 = 83 · 67 + 25 = 92',A.H*.58,{n:15,ok:1});return}
 const F=FADE[s.r],cur=F.gaps[s.g][0];note(`Faded example ${s.r+1} of 3: ${F.q} (${F.gaps.length} ${F.gaps.length>1?'gaps':'gap'})`,A.H*.03,{n:13});
 fadeRows().forEach(r=>row(r,lineWith(s.r,r.j),{num:r.j+1,on:r.j===cur}));
 fadeChips().forEach(r=>{if(W.drag&&W.drag.j===r.j)return;chip(r,r.x,r.y,{bad:s.bad===r.v})});
 if(W.drag){const d=W.drag,r=fadeChips()[d.j];if(r)chip(r,d.x-r.w/2,d.y-r.h/2,{on:1})}}
function fill(v){const s=W.c;if(s.r>=3)return;const gp=FADE[s.r].gaps[s.g];
 if(v!==gp[1]){s.bad=v;A.sound.miss();const m=gp[2].find(o=>o[0]===v);return tell(m?m[1]:'Look at the step above for a clue.')}
 s.g++;s.bad=null;A.sound.pop();
 if(s.g<FADE[s.r].gaps.length)return tell(`${v} is right. Next gap.`);
 s.r++;s.g=0;tell(s.r>=3?'All 3 faded examples finished. Each one showed fewer steps.':`${v} is right. Example done. The next one shows fewer steps.`)}
/* 4. same steps or not? */
const matchCards=()=>{const gap=10,w=Math.min(260,(A.W-gap*3)/2),top=A.H*.33,h=(A.H*.98-top-gap)/2,x0=(A.W-(2*w+gap))/2;return MATCH.map((m,i)=>({i,x:x0+(i%2)*(w+gap),y:top+Math.floor(i/2)*(h+gap),w,h}))};
function drawMatch(){const s=W.d,g=A.ctx;ground();note(`Example: ${STORY} 47 + 28 = 75`,A.H*.02,{n:13,bg:'#e0e7ff'});
 note(s.got.length>=2?'Both matching problems found':`Which can the same steps solve? ${s.got.length} of 2`,A.H*.2,{n:12,ok:s.got.length>=2});
 matchCards().forEach(r=>{const [e,t]=MATCH[r.i],good=s.got.includes(r.i),bad=s.bad===r.i;g.fillStyle=bad?'#fee2e2':good?'#dcfce7':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();
  g.lineWidth=good||bad?3:1.5;g.strokeStyle=good?GO:bad?ERR:GREY;g.stroke();g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.font=`${Math.round(Math.min(r.h*.2,26))}${PX}`;g.fillText(e,r.x+r.w/2,r.y+r.h*.17);
  const n=Math.round(Math.max(11,Math.min(fz(14),r.h*.1)));g.font=`700 ${n}${PX}`;g.fillStyle=INK;const L=wrapT(t,r.w-14).slice(0,5);L.forEach((x,j)=>g.fillText(x,r.x+r.w/2,r.y+r.h*.36+j*(n+4)))})}
function choose(i){const s=W.d;if(s.got.includes(i)||s.got.length>=2)return;const m=MATCH[i];
 if(!m[2]){s.bad=i;A.sound.miss();return tell(m[3])}
 s.got.push(i);s.bad=-1;A.sound.pop();tell(m[3]+(s.got.length>=2?' Both found: the same kind of problem, not the same numbers.':''))}
/* 5. your turn */
const mineRows=()=>rowsR(4,A.H*.14,A.H*.68);
const mineOpts=()=>{const P=MINE.parts[Math.min(3,W.e.k)];return spin([P[1],...P[2].map(o=>o[0])],W.e.k+1)};
const mineChips=()=>chipsR(mineOpts(),A.H*.78);
function drawMine(){const s=W.e;ground();
 if(s.k>=4){note('38 + 45 = 83, solved with the example\'s steps',A.H*.06,{ok:1});MINE.parts.forEach((P,j)=>note(`${P[0]} ${P[1]}`,A.H*(.24+j*.17),{n:15}));return}
 note(`Your turn: ${MINE.q}. No steps shown.`,A.H*.03,{n:13});
 mineRows().forEach(r=>{const P=MINE.parts[r.j];row(r,`${P[0]} ${r.j<s.k?P[1]:'▢'}`,{num:r.j+1,on:r.j===s.k,good:r.j<s.k})});
 mineChips().forEach(r=>{if(W.drag&&W.drag.j===r.j)return;chip(r,r.x,r.y,{bad:s.bad===r.v})});
 if(W.drag){const d=W.drag,r=mineChips()[d.j];if(r)chip(r,d.x-r.w/2,d.y-r.h/2,{on:1})}}
function solve(v){const s=W.e;if(s.k>=4)return;const P=MINE.parts[s.k];
 if(v!==P[1]){s.bad=v;A.sound.miss();const m=P[2].find(o=>o[0]===v);return tell(m?m[1]:'Use the example\'s steps on these numbers.')}
 s.k++;s.bad=null;A.sound.pop();tell(s.k>=4?'83. Same steps as the example, new numbers, new answer.':`${v} is right. Step ${s.k+1} next.`)}
function draw(){const k=phase();if(k==='quiz'){ground();note('Challenge',A.H*.12,{ok:1});note('Study the steps, explain why, check, then try one yourself',A.H*.42,{n:14});return}
 ({why:drawWhy,slip:drawSlip,fade:drawFade,match:drawMatch,mine:drawMine})[k]();A.fx.draw(A.ctx)}
function down(p){const k=phase();
 if(k==='why'){const r=whyRows().find(r=>on(p,r));if(r)tie(r.j);return false}
 if(k==='slip'&&W.b.r<3){const r=slipRows().find(r=>on(p,r));if(r)check(r.j);return false}
 if(k==='match'){const r=matchCards().find(r=>on(p,r));if(r)choose(r.i);return false}
 if((k==='fade'&&W.c.r<3)||(k==='mine'&&W.e.k<4)){const r=(k==='fade'?fadeChips():mineChips()).find(r=>on(p,r));if(r){W.drag={j:r.j,v:r.v,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}}return false}
function move(p){if(!W.drag)return;W.drag.x=p.x;W.drag.y=p.y;A.redraw()}
function up(p){const d=W.drag;if(!d)return;W.drag=null;const tap=Math.hypot(p.x-d.x0,p.y-d.y0)<10,k=phase(),rs=k==='fade'?fadeRows():mineRows();
 if(tap||rs.some(r=>on(p,r)))return k==='fade'?fill(d.v):solve(d.v);A.redraw()}
function clear(){epoch++;for(const k in W)delete W[k];Object.assign(W,{a:{k:0,tied:{},bad:-1},b:{r:0,bad:-1},c:{r:0,g:0,bad:null},d:{got:[],bad:-1},e:{k:0,bad:null},drag:null,hook:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();W.hook()}
const watch=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function enter(i,desc,ok,msg){clear();tell(desc);W.hook=watch(i,ok,msg)}
function auto(i,acts,ms){steps[i].go();const e0=epoch;acts.forEach((f,j)=>setTimeout(()=>{if(e0===epoch)f()},ms*(j+1)))}
function keys(){if(!pad)return;pad.innerHTML='';const k=phase(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='why'&&W.a.k<4)EX.lines.forEach((t,j)=>{if(W.a.tied[j]==null)B(`Step ${j+1}: ${t}`,()=>tie(j),`The reason explains step ${j+1}: ${t}`)});
 if(k==='slip'&&W.b.r<3){SLIP[W.b.r].lines.forEach((t,j)=>B(`✗ Step ${j+1}: ${t}`,()=>check(j),`Step ${j+1} is wrong: ${t}`));B('✓ All steps are right',()=>check(4))}
 if(k==='fade'&&W.c.r<3)fadeOpts().forEach(v=>B(v,()=>fill(v),`Fill the gap with ${v}`));
 if(k==='match'&&W.d.got.length<2)MATCH.forEach((m,i)=>{if(!W.d.got.includes(i))B(`${m[0]} ${m[1]}`,()=>choose(i),`Same steps can solve: ${m[1]}`)});
 if(k==='mine'&&W.e.k<4)mineOpts().forEach(v=>B(v,()=>solve(v),`Answer ${v}`))}
const steps=[
{h:'Why is each step there?',p:'Here is a worked example: 47 + 28, done step by step. Read a reason at the top, then tap the step it explains. Explaining each step is how you learn from an example.',
 task:'Match all 4 reasons to their steps',show:()=>auto(0,WHY.map(w=>()=>tie(w[0])),650),
 go:()=>enter(0,'Worked example 47 + 28 with 4 steps. A reason is shown at the top.',()=>W.a.k>=4,'Ones first, 15 ones makes a ten to carry, add the carried ten, then check with rounding. You can now say why each step is there.')},
{h:'Spot the slip',p:'Examples can have mistakes. Check each step yourself. Tap the wrong step, or tap All steps are right.',
 predict:{q:'A worked example says 36 + 27 = 53. It looks neat. Is it right?',opts:['Yes, it is an example so it is right','No, check each step'],ans:1},task:'Check all 3 examples',
 show:()=>auto(1,[2,2,4].map(j=>()=>check(j)),700),
 go:()=>enter(1,'Example 36 + 27 with 4 steps, and an All steps are right button.',()=>W.b.r>=3,'36 + 27 dropped the carried ten and 58 + 4 used the 4 twice. 29 + 14 was right. Checking finds slips that copying misses.')},
{h:'Fill the gaps',p:'Each example shows fewer steps. Fill the gap with the right number: drag a number up, or tap it.',task:'Finish all 3 faded examples',
 show:()=>auto(2,FADE.flatMap(F=>F.gaps.map(gp=>()=>fill(gp[1]))),550),
 go:()=>enter(2,'Faded example 56 + 37. One gap: the answer.',()=>W.c.r>=3,'1 gap, then 2, then 4. Each time you did more of the steps yourself, with the example as a guide.')},
{h:'Same steps or not?',p:'The example is about stickers. Tap the problems that the same steps can solve. Look at what the question asks, not just the numbers.',
 predict:{q:'Tom\'s problem uses the same numbers, 47 and 28. Can the same steps solve it?',opts:['Yes, same numbers','No, it is take away'],ans:1},task:'Find both matching problems',
 show:()=>auto(3,[0,2].map(i=>()=>choose(i)),700),
 go:()=>enter(3,'Example: 47 + 28 stickers. Four new problems.',()=>W.d.got.length>=2,'Shells and the bus are adding with a new ten, like the example. Tom and Ali use the same numbers but are take away.')},
{h:'Your turn',p:'Now solve 38 + 45 with no steps shown. Use the example\'s steps. Drag or tap a number for each step.',
 predict:{q:'The example\'s answer was 75. Is 38 + 45 also 75?',opts:['Yes, copy the answer','No, use the steps on new numbers'],ans:1},task:'Solve 38 + 45 step by step',
 show:()=>auto(4,MINE.parts.map(P=>()=>solve(P[1])),650),
 go:()=>enter(4,'Your turn: 38 + 45. Four empty steps.',()=>W.e.k>=4,'8 + 5 = 13, write 3 and carry 1 ten, 3 + 4 + 1 = 8 tens, so 83. You copied the method, not the answer.')},
{h:'Challenge',p:'',go:()=>{clear();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>W.hook()});
function hint(t){let m='Study the steps, explain why each one is done, then try a similar one.';
 if(t==='copy')m='That copies the example\'s answer. Use the example\'s steps on your own numbers.';
 if(t==='surface')m='Same numbers or the same story is not the same problem. Check what it asks: more, or take away?';
 if(t==='skip')m='The answer alone does not teach the method. Study why each step happens.';
 if(t==='trust')m='Examples can have slips. Check each step as you read.';
 if(t==='carry')m='Remember the carried ten: 15 ones is 1 ten and 5 ones.';
 if(t==='passive')m='Reading again is not enough. Say why each step is done, then try one yourself.';
 return m}
function next(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 cq.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=cq.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},box,v).onclick=()=>score(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function score(t,a){cq.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=cq.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+hint(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next;c.say(ok?'Yes.':hint(t))}
FK.shell(c,{steps,ratio:.66,tall:1.25,draw,onStep:B=>{cq.hidden=B.step!==5;pad.hidden=B.step===5;keys()},
 init:B=>{A=B;const box=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Worked example buttons'},box);cq=c.el('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});keys()}}).start()})})();
