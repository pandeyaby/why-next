/* Flagship: Rote counting to 100 (ages 5–6; CCSS K.CC.1–2 / NC Y1 NPV).
   Recite 1–20 then stretch toward 100 on a track, count backward from 20, start from a middle number (e.g. 47),
   catch skip/repeat slips, then challenge. Distinct from counting objects to five (flagcount) and skip-counting
   in 2s/5s/10s (flagskip). */
(()=>{
VIS.reg('flagrote',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['up','stretch','back','start','slip','myth','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function track(g,W,H,n,maxShow){const{col:C}=A;const lo=Math.max(0,n-4),hi=Math.min(maxShow,lo+9);
 g.fillStyle=A.alpha(C.tx,.08);g.fillRect(W*.05,H*.42,W*.9,H*.2);
 for(let i=lo;i<=hi;i++){const x=W*.08+((i-lo)/(hi-lo||1))*W*.84;g.fillStyle=i===n?A.alpha(C.ac,.45):A.alpha(C.pn,.9);g.beginPath();g.arc(x,H*.52,16,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();T(String(i),x,H*.52,A.narrow?11:13,{w:800})}}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#fce7f3',C.dark?.08:.4);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Count without skipping',W/2,H*.35,A.narrow?15:17,{w:900});T('Forwards · backwards · any start',W/2,H*.58,A.narrow?12:14,{c:C.mu});A.fx.draw(g);return}
 if(k==='up'||k==='stretch'||k==='back'||k==='start'){T(S.title||'Count',W/2,H*.1,A.narrow?14:16,{w:800});track(g,W,H,S.n||0,S.max||100);T(S.msg||`Say ${S.n||0}`,W/2,H*.88,A.narrow?13:15,{c:C.mu})}
 if(k==='slip'){T('Spot the counting slip',W/2,H*.1,A.narrow?13:15,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.28+i*.2);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.05,y-H*.08,W*.9,H*.16);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.05,y-H*.08,W*.9,H*.16);T(t,W/2,y,A.narrow?12:14,{max:W*.84})})}
 if(k==='myth'){T('Tap the true idea',W/2,H*.1,A.narrow?14:16,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.28+i*.2);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.05,y-H*.08,W*.9,H*.16);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.05,y-H*.08,W*.9,H*.16);T(t,W/2,y,A.narrow?11:13,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{n:0,max:20,dir:1,goal:20,title:'Count',msg:'',picked:null,opts:[],check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*160))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function stepCount(){S.n=(S.n||0)+(S.dir||1);if(S.dir>0)S.n=Math.min(S.goal||100,S.n);else S.n=Math.max(S.goal||0,S.n);S.msg=`${S.n}`;A.sound.tick();say(String(S.n));A.redraw();S.check()}
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='up'||kind()==='stretch'||kind()==='back'||kind()==='start')btn(S.dir<0?'Count back one':'Say next number',()=>stepCount(),'Say the next number');
 if(kind()==='slip'||kind()==='myth')(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();say(t);A.redraw();S.check()},'Pick: '+t))}
function down(p){if(kind()==='chal')return false;
 if(kind()==='up'||kind()==='stretch'||kind()==='back'||kind()==='start'){stepCount();return true}
 if(kind()==='slip'||kind()==='myth'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.2)/(A.H*.2))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 return true}
const steps=[
{h:'Count up to 20',p:'Say number names in order: one, two, three… Keep going without skipping or repeating.',
 predict:{q:'After 7 comes…',opts:['8','9','6'],ans:0},
 task:'Count from 0 to 20',show:()=>auto(0,[()=>{S.n=20;A.redraw();S.check()}]),
 go:()=>{reset({n:0,max:20,goal:20,dir:1,title:'Count up to 20'});say('Tap to say the next number.');controls();S.check=finish(0,()=>(S.n||0)>=20,'You counted to 20 in order.')}},
{h:'Stretch toward 100',p:'The same order keeps going: 21, 22, … all the way to 100. Keep the pattern of ones inside each ten.',
 predict:{q:'After 29 comes…',opts:['30','20','39'],ans:0},
 task:'Count on to 40',show:()=>auto(1,[()=>{S.n=40;A.redraw();S.check()}]),
 go:()=>{reset({n:20,max:100,goal:40,dir:1,title:'Keep counting toward 100'});say('Keep counting on.');controls();S.check=finish(1,()=>(S.n||0)>=40,'The sequence continues past 20 toward 100.')}},
{h:'Count backward',p:'Counting backward says the names in reverse: 20, 19, 18… down to 0.',
 predict:{q:'Before 15 comes…',opts:['14','16','15 again'],ans:0},
 task:'Count back from 20 to 10',show:()=>auto(2,[()=>{S.n=10;A.redraw();S.check()}]),
 go:()=>{reset({n:20,max:20,goal:10,dir:-1,title:'Count backward'});say('Count back one each tap.');controls();S.check=finish(2,()=>(S.n||0)<=10,'Backward counting uses the same order in reverse.')}},
{h:'Start in the middle',p:'You can start from any number and keep going. From 47 say 48, 49, 50… — no need to restart at 1.',
 predict:{q:'Start at 47. Next is…',opts:['48','1','47 again'],ans:0},
 task:'Count from 47 to 55',show:()=>auto(3,[()=>{S.n=55;A.redraw();S.check()}]),
 go:()=>{reset({n:47,max:100,goal:55,dir:1,title:'Start at 47'});say('Start at 47 and keep going.');controls();S.check=finish(3,()=>(S.n||0)>=55,'Start anywhere; continue the sequence.')}},
{h:'Catch a slip',p:'A slip is skipping a number (15, 17) or saying one twice (15, 15). Good counting says each name once in order.',
 predict:{q:'Which count has a slip?',opts:['15, 17 (skipped 16)','15, 16, 17','10, 11, 12'],ans:0},
 task:'Tap the slip',show:()=>auto(4,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['15, 17 — skipped 16','15, 16, 17 — in order','20, 19, 18 — backward OK'],picked:null});say('Which list has a slip?');controls();S.check=finish(4,()=>S.picked===0,'Skipping or repeating breaks the count.')}},
{h:'True counting idea',p:'Rote counting is saying the number list in order — forwards, backwards, or from a middle start.',
 predict:{q:'Rote counting means…',opts:['saying numbers in order','only matching objects','only skip-counting in 2s'],ans:0},
 task:'Tap the true idea',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['Say number names in order to 100','Only count things you can touch','Always restart at 1'],picked:null});say('Tap the true idea.');controls();S.check=finish(5,()=>S.picked===0,'Rote counting = ordered number names.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['After 7 comes…',[['8','ok'],['9','nine'],['6','six']]],
 ['After 29 comes…',[['30','ok'],['20','twenty'],['39','thirtynine']]],
 ['Before 15 comes…',[['14','ok'],['16','sixteen'],['15 again','repeat']]],
 ['Start at 47. Next?',[['48','ok'],['1','one'],['47 again','repeat']]],
 ['Which has a slip?',[['15, 17 (skip 16)','ok'],['15, 16, 17','fine'],['10, 11, 12','fine2']]],
 ['Rote counting is…',[['Numbers in order','ok'],['Only touching objects','touch'],['Only counting in 2s','twos']]],
 ['From 99 next is…',[['100','ok'],['90','ninety'],['199','big']]]];
function why(t){let m='Rote counting says number names in order without skipping or repeating.';
 if(t==='nine'||t==='six'||t==='twenty'||t==='thirtynine')m='Say the very next name: after 7 is 8; after 29 is 30.';
 if(t==='sixteen'||t==='repeat'||t==='one')m='Backward: before 15 is 14. From 47 go to 48 — do not restart at 1 or repeat.';
 if(t==='fine'||t==='fine2')m='15, 16, 17 and 10, 11, 12 are fine; a slip skips or repeats.';
 if(t==='touch'||t==='twos')m='Rote counting is the spoken list; object counting and skip-counting are related skills.';
 if(t==='ninety'||t==='big')m='After 99 comes 100 — the end of this counting sequence.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Rote counting controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:()=>{},up:()=>{}});controls()}});
A.start()})})();
