/* Flagship: Estimating by rounding (ages 7–9; Y3/3.NBT.A.1 / 3.OA estimation).
   Round to nearest 10 on a number line; mark midpoint 5; estimate a sum by rounding addends;
   spot when estimate is high/low; reject “always round down” and “estimate must equal exact”; challenge.
   Distinct from inverse add/subtract checks (flaginvadd) and place-value tens (flagbundle). */
(()=>{
VIS.reg('flagestm',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['line','mid','sum','highlow','rule','idea','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function nline(g,W,H,mark){const y=H*.45,x0=W*.1,x1=W*.9;g.strokeStyle=A.col.tx;g.lineWidth=3;g.beginPath();g.moveTo(x0,y);g.lineTo(x1,y);g.stroke();
 [0,10,20,30,40].forEach((n,i)=>{const x=x0+(x1-x0)*(i/4);g.beginPath();g.moveTo(x,y-8);g.lineTo(x,y+8);g.stroke();T(String(n),x,y+22,12)});
 if(mark!=null){const x=x0+(x1-x0)*(mark/40);g.fillStyle=A.col.ac;g.beginPath();g.arc(x,y,8,0,Math.PI*2);g.fill();T(String(mark),x,y-22,14,{w:800})}}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#fce7f3',C.dark?.08:.4);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Round → estimate',W/2,H*.35,A.narrow?16:18,{w:900});T('Nearest 10 · check sense',W/2,H*.58,A.narrow?12:14,{c:C.mu});A.fx.draw(g);return}
 if(k==='line'){T(`Round ${S.n||27} to the nearest 10`,W/2,H*.1,A.narrow?13:15,{w:800});nline(g,W,H,S.n||27);T(S.msg||'Tap 20 or 30',W/2,H*.85,13,{c:C.mu})}
 if(k==='mid'){T('Midpoint rule: 5 rounds up',W/2,H*.1,A.narrow?13:15,{w:800});nline(g,W,H,25);T(S.msg||'25 → nearest 10?',W/2,H*.85,13,{c:C.mu})}
 if(k==='sum'){T('Estimate 28 + 34',W/2,H*.1,A.narrow?14:16,{w:800});
  T('28 ≈ 30',W/2,H*.32,A.narrow?16:18);T('34 ≈ 30',W/2,H*.5,A.narrow?16:18);T(S.done?'Estimate 60':'Add the rounded numbers',W/2,H*.7,A.narrow?14:16,{c:C.mu});T(S.msg||'',W/2,H*.88,12,{c:C.mu})}
 if(k==='highlow'){T('Exact 28+34=62. Estimate was 60.',W/2,H*.12,A.narrow?12:14,{w:800,max:W*.92});
  T(S.picked==null?'Is the estimate a bit low or high?':'Picked: '+['a bit low','a bit high','exact'][S.picked],W/2,H*.5,A.narrow?14:16,{c:C.mu})}
 if(k==='rule'){T('Tap the true rounding rule',W/2,H*.1,A.narrow?13:15,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.3+i*.18);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.06,y-H*.07,W*.88,H*.14);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.06,y-H*.07,W*.88,H*.14);T(t,W/2,y,A.narrow?11:13,{max:W*.84})})}
 if(k==='idea'){T('Tap the true sentence',W/2,H*.1,A.narrow?14:16,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.3+i*.18);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.06,y-H*.07,W*.88,H*.14);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.06,y-H*.07,W*.88,H*.14);T(t,W/2,y,A.narrow?11:13,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{n:27,msg:'',picked:null,done:0,opts:[],check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*260))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='line'){btn('20',()=>{S.picked=20;S.msg='27 is closer to 30';A.sound.miss();say(S.msg);A.redraw()},'Round to 20');btn('30',()=>{S.picked=30;S.msg='Yes — 27 rounds to 30';A.sound.tick();say(S.msg);A.redraw();S.check()},'Round to 30')}
 if(kind()==='mid'){btn('20',()=>{S.picked=20;A.sound.miss();S.msg='At 5 ones, round up';say(S.msg);A.redraw()},'20');btn('30',()=>{S.picked=30;S.msg='25 rounds up to 30';A.sound.tick();say(S.msg);A.redraw();S.check()},'30')}
 if(kind()==='sum'){btn('Estimate = 60',()=>{S.done=1;S.msg='30+30=60 — a quick estimate';A.sound.tick();say(S.msg);A.redraw();S.check()},'Sixty');btn('Estimate = 62',()=>{A.sound.miss();S.msg='62 is exact; estimate uses rounded numbers';say(S.msg);A.redraw()},'Sixty-two')}
 if(kind()==='highlow'){btn('A bit low',()=>{S.picked=0;A.sound.tick();say('60 is a little under 62');A.redraw();S.check()},'Low');btn('A bit high',()=>{S.picked=1;A.sound.miss();say('60 is under 62, so low');A.redraw()},'High');btn('Exact match',()=>{S.picked=2;A.sound.miss();say('Estimate need not equal exact');A.redraw()},'Exact')}
 if(kind()==='rule'||kind()==='idea')(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();say(t);A.redraw();S.check()},'Pick: '+t))}
function down(p){if(kind()==='chal')return false;
 if(kind()==='line'){S.picked=p.x<A.W/2?20:30;if(S.picked===30){A.sound.tick();S.check()}else A.sound.miss();A.redraw();return true}
 if(kind()==='mid'){S.picked=p.x<A.W/2?20:30;if(S.picked===30){A.sound.tick();S.check()}else A.sound.miss();A.redraw();return true}
 if(kind()==='sum'){S.done=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='highlow'){S.picked=0;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='rule'||kind()==='idea'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.22)/(A.H*.18))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 return true}
const steps=[
{h:'Nearest ten',p:'Find which multiple of 10 is closer. 27 is closer to 30 than to 20.',
 predict:{q:'27 rounded to the nearest 10 is…',opts:['30','20','27'],ans:0},
 task:'Choose 30',show:()=>auto(0,[()=>{S.picked=30;A.redraw();S.check()}]),
 go:()=>{reset({n:27,picked:null});say('Round 27.');controls();S.check=finish(0,()=>S.picked===30,'27 rounds to 30.')}},
{h:'Midpoint rounds up',p:'When the ones digit is 5, round up to the next ten. 25 → 30.',
 predict:{q:'25 to the nearest 10 is…',opts:['30','20','25'],ans:0},
 task:'Choose 30 for 25',show:()=>auto(1,[()=>{S.picked=30;A.redraw();S.check()}]),
 go:()=>{reset({n:25,picked:null});say('Round 25.');controls();S.check=finish(1,()=>S.picked===30,'5 ones → round up.')}},
{h:'Estimate a sum',p:'Round each addend, then add. 28≈30 and 34≈30, so estimate 60. That is faster than the exact sum.',
 predict:{q:'Estimate 28 + 34 by rounding each to 10s…',opts:['60','62','50'],ans:0},
 task:'Show estimate 60',show:()=>auto(2,[()=>{S.done=1;A.redraw();S.check()}]),
 go:()=>{reset({done:0});say('Estimate the sum.');controls();S.check=finish(2,()=>S.done,'Rounded addends give a quick estimate.')}},
{h:'Low or high?',p:'Exact 28+34=62. Estimate 60 is a bit low. Estimates are close, not always exact.',
 predict:{q:'Estimate 60 vs exact 62 means the estimate is…',opts:['a bit low','a bit high','wrong to use'],ans:0},
 task:'Pick a bit low',show:()=>auto(3,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({picked:null});say('Compare estimate to exact.');controls();S.check=finish(3,()=>S.picked===0,'Know if your estimate sits low or high.')}},
{h:'Rounding rule',p:'Ones 0–4 → round down; ones 5–9 → round up. Do not always round down.',
 predict:{q:'Ones digit 5 means…',opts:['round up','always round down','leave it'],ans:0},
 task:'Tap the true rule',show:()=>auto(4,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['Ones 5–9 round up; 0–4 round down','Always round down to be safe','Never round fives'],picked:null});say('Pick the true rule.');controls();S.check=finish(4,()=>S.picked===0,'Use the 5-up rule for nearest ten.')}},
{h:'True idea',p:'An estimate is a sensible near answer. It does not have to equal the exact calculation.',
 predict:{q:'An estimate…',opts:['is close, not always exact','must equal the exact answer','is only for guessing feelings'],ans:0},
 task:'Tap the true sentence',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['An estimate is close, not always exact','An estimate must equal the exact answer','Rounding always makes numbers smaller'],picked:null});say('Tap the true idea.');controls();S.check=finish(5,()=>S.picked===0,'Estimate ≈ sensible near answer.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['27 to nearest 10 is…',[['30','ok'],['20','down'],['27','same']]],
 ['25 to nearest 10 is…',[['30','ok'],['20','down'],['15','fifteen']]],
 ['Estimate 28+34 by rounding…',[['60','ok'],['62','exact'],['50','fifty']]],
 ['Estimate 60 vs exact 62 is…',[['a bit low','ok'],['a bit high','high'],['useless','useless']]],
 ['Ones digit 5 means…',[['round up','ok'],['always round down','down'],['leave it','leave']]],
 ['An estimate…',[['is close, not always exact','ok'],['must equal exact','must'],['always smaller','smaller']]],
 ['Why estimate?',[['for a quick sensible check','ok'],['to avoid all maths','avoid'],['because exact is wrong','wrong']]]];
function why(t){let m='Round to the nearest 10, then use that for a quick estimate.';
 if(t==='down'||t==='same'||t==='fifteen')m='27 is closer to 30; 25 has ones=5 so round up to 30.';
 if(t==='exact'||t==='fifty')m='Round each addend first: 28≈30, 34≈30, estimate 60 — not the exact 62.';
 if(t==='high'||t==='useless'||t==='must'||t==='smaller')m='Estimates can sit a little low or high; they need not match exact.';
 if(t==='leave'||t==='avoid'||t==='wrong')m='Ones 5–9 round up. Estimates give a fast sense-check.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Estimating by rounding controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:()=>{},up:()=>{}});controls()}});
A.start()})})();
