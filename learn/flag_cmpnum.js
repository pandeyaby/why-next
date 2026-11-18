/* Flagship: Two written numerals between 1 and 10 (ages 5–6; K.CC.C.7 / EYFS number).
   Compare two written numerals: which is greater, which is less, place on a 1–10 line,
   reject "taller digit looks bigger", then challenge. Distinct from matching numerals to groups (flagnumer). */
(()=>{
VIS.reg('flagcmpnum',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['pair','less','line','words','myth','build','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function digit(g,n,x,y,big){const{col:C,W,H}=A,u=big||Math.min(W,H)*.28;g.fillStyle=A.alpha(C.am,.45);g.beginPath();if(g.roundRect)g.roundRect(x-u/2,y-u/2,u,u,12);else g.rect(x-u/2,y-u/2,u,u);g.fill();g.strokeStyle=C.tx;g.lineWidth=3;g.stroke();T(String(n),x,y,A.narrow?28:36,{w:900})}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#dbeafe',C.dark?.08:.45);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Compare written numbers',W/2,H*.35,A.narrow?15:17,{w:900});T('Greater · less · 1 to 10',W/2,H*.58,A.narrow?12:14,{c:C.mu});A.fx.draw(g);return}
 if(k==='pair'){T('Which number is MORE?',W/2,H*.1,A.narrow?14:16,{w:800});digit(g,S.a||3,W*.28,H*.45);digit(g,S.b||7,W*.72,H*.45);T(S.msg||'Tap the bigger number',W/2,H*.88,A.narrow?12:14,{c:C.mu})}
 if(k==='less'){T('Which number is LESS?',W/2,H*.1,A.narrow?14:16,{w:800});digit(g,S.a||8,W*.28,H*.45);digit(g,S.b||2,W*.72,H*.45);T(S.msg||'Tap the smaller number',W/2,H*.88,A.narrow?12:14,{c:C.mu})}
 if(k==='line'){T(`Put ${S.n||5} on the line`,W/2,H*.08,A.narrow?14:16,{w:800});
  g.strokeStyle=C.tx;g.lineWidth=3;g.beginPath();g.moveTo(W*.08,H*.55);g.lineTo(W*.92,H*.55);g.stroke();
  for(let i=1;i<=10;i++){const x=W*(.08+(i-1)*(.84/9));g.beginPath();g.moveTo(x,H*.5);g.lineTo(x,H*.6);g.stroke();T(String(i),x,H*.72,A.narrow?10:12,{c:C.mu})}
  if(S.slot){const x=W*(.08+(S.slot-1)*(.84/9));g.fillStyle=A.alpha(C.ac,.55);g.beginPath();g.arc(x,H*.55,14,0,6.3);g.fill()}
  T(S.msg||'Tap where it belongs',W/2,H*.9,12,{c:C.mu})}
 if(k==='words'){T(`${S.a||4} is ___ than ${S.b||9}`,W/2,H*.12,A.narrow?14:16,{w:800});
  (S.opts||['greater','less','the same']).forEach((t,i)=>{const y=H*(.32+i*.18);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.1,y-H*.07,W*.8,H*.14);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.1,y-H*.07,W*.8,H*.14);T(t,W/2,y,A.narrow?14:16)})}
 if(k==='myth'){T('True or mix-up?',W/2,H*.1,A.narrow?14:16,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.28+i*.2);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.05,y-H*.08,W*.9,H*.16);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.05,y-H*.08,W*.9,H*.16);T(t,W/2,y,A.narrow?11:13,{max:W*.84})})}
 if(k==='build'){T('Make the left MORE',W/2,H*.1,A.narrow?14:16,{w:800});digit(g,S.a||1,W*.28,H*.42);digit(g,S.b||6,W*.72,H*.42);T(S.msg||`Left ${S.a||1} · Right ${S.b||6}`,W/2,H*.88,12,{c:C.mu})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{a:3,b:7,n:5,slot:null,picked:null,msg:'',opts:[],check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*240))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='pair'){btn(String(S.a),()=>{S.picked=0;const ok=S.a>S.b;S.msg=ok?'Yes — '+S.a+' is more':S.a+' is not more';ok?A.sound.tick():A.sound.miss();say(S.msg);A.redraw();S.check()},'Pick '+S.a);btn(String(S.b),()=>{S.picked=1;const ok=S.b>S.a;S.msg=ok?'Yes — '+S.b+' is more':S.b+' is not more';ok?A.sound.tick():A.sound.miss();say(S.msg);A.redraw();S.check()},'Pick '+S.b)}
 if(kind()==='less'){btn(String(S.a),()=>{S.picked=0;const ok=S.a<S.b;S.msg=ok?'Yes — '+S.a+' is less':'Not the smaller one';ok?A.sound.tick():A.sound.miss();say(S.msg);A.redraw();S.check()},'Pick '+S.a);btn(String(S.b),()=>{S.picked=1;const ok=S.b<S.a;S.msg=ok?'Yes — '+S.b+' is less':'Not the smaller one';ok?A.sound.tick():A.sound.miss();say(S.msg);A.redraw();S.check()},'Pick '+S.b)}
 if(kind()==='line')for(let i=1;i<=10;i++)btn(String(i),()=>{S.slot=i;S.msg=i===S.n?'Right spot!':'Try another place';i===S.n?A.sound.tick():A.sound.miss();say(S.msg);A.redraw();S.check()},'Place at '+i);
 if(kind()==='words')(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();say(t);A.redraw();S.check()},'Say '+t));
 if(kind()==='myth')(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();say(t);A.redraw();S.check()},'Pick: '+t));
 if(kind()==='build'){btn('Left +1',()=>{S.a=Math.min(10,(S.a||1)+1);S.msg='Left '+S.a;A.sound.tick();say(S.msg);A.redraw();S.check()},'Add one to left');btn('Left -1',()=>{S.a=Math.max(1,(S.a||1)-1);S.msg='Left '+S.a;A.sound.tick();say(S.msg);A.redraw()},'Subtract one from left')}}
function down(p){if(kind()==='chal')return false;
 if(kind()==='pair'||kind()==='less'){const pick=p.x<A.W/2?0:1;S.picked=pick;const wantLeft=kind()==='pair'?S.a>S.b:S.a<S.b;const ok=(pick===0&&wantLeft)||(pick===1&&!wantLeft);ok?A.sound.tick():A.sound.miss();S.msg=ok?'Good compare!':'Compare the written numbers';A.redraw();if(ok)S.check();return true}
 if(kind()==='line'){const i=Math.max(1,Math.min(10,Math.round(1+(p.x-A.W*.08)/(A.W*.84/9))));S.slot=i;i===S.n?A.sound.tick():A.sound.miss();A.redraw();S.check();return true}
 if(kind()==='words'||kind()==='myth'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.2)/(A.H*.2))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='build'){if(p.x<A.W/2)S.a=Math.min(10,(S.a||1)+1);A.sound.tick();A.redraw();S.check();return true}
 return true}
const steps=[
{h:'More on the card',p:'When two numbers are written down, the greater one stands for more. Tap the numeral that means more.',
 predict:{q:'Which written number is greater: 3 or 7?',opts:['7','3','They are the same'],ans:0},
 task:'Tap the bigger numeral',show:()=>auto(0,[()=>{S.picked=1;A.redraw();S.check()}]),
 go:()=>{reset({a:3,b:7,picked:null});say('Tap which number is more.');controls();S.check=finish(0,()=>S.picked===1,'7 is greater than 3.')}},
{h:'Less on the card',p:'The lesser numeral stands for fewer. Tap the number that means less.',
 predict:{q:'Which is less: 8 or 2?',opts:['2','8','They match'],ans:0},
 task:'Tap the smaller numeral',show:()=>auto(1,[()=>{S.picked=1;A.redraw();S.check()}]),
 go:()=>{reset({a:8,b:2,picked:null});say('Tap which number is less.');controls();S.check=finish(1,()=>S.picked===1,'2 is less than 8.')}},
{h:'Spot on the line',p:'Numbers 1 to 10 sit in order on a line. Greater numbers sit further to the right.',
 predict:{q:'On a 1-10 line, 9 is…',opts:['near the right end','near the left end','in the middle with 1'],ans:0},
 task:'Put 9 on the line',show:()=>auto(2,[()=>{S.n=9;S.slot=9;A.redraw();S.check()}]),
 go:()=>{reset({n:9,slot:null});say('Tap where 9 belongs.');controls();S.check=finish(2,()=>S.slot===9,'9 sits near the right — it is greater.')}},
{h:'Greater or less words',p:'Say "greater than" when the first number is more. Say "less than" when it is smaller.',
 predict:{q:'4 is ___ than 9',opts:['less','greater','the same'],ans:0},
 task:'Choose less',show:()=>auto(3,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({a:4,b:9,opts:['less','greater','the same'],picked:null});say('Fill the blank.');controls();S.check=finish(3,()=>S.picked===0,'4 is less than 9.')}},
{h:'Look is not size',p:'A tall thin 1 is still less than a short fat 9. Compare the value, not how big the drawing looks.',
 predict:{q:'A huge drawn 1 vs a tiny drawn 9 — which is greater?',opts:['9','1','Whichever looks taller'],ans:0},
 task:'Tap the true idea',show:()=>auto(4,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['Compare the value, not how tall it looks','Taller digit is always greater','Fat digits beat thin ones'],picked:null});say('Tap the true idea.');controls();S.check=finish(4,()=>S.picked===0,'Value wins — not how the digit is drawn.')}},
{h:'Build a greater left',p:'Change the left numeral until it is greater than the right one.',
 predict:{q:'To make 1 greater than 6 you must…',opts:['raise the left past 6','erase the right forever','make the left look fatter'],ans:0},
 task:'Make left greater than 6',show:()=>auto(5,[()=>{S.a=7;A.redraw();S.check()}]),
 go:()=>{reset({a:1,b:6});say('Raise the left number past 6.');controls();S.check=finish(5,()=>(S.a||0)>(S.b||0),'Left is now greater — good compare.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['Which is greater: 3 or 7?',[['7','ok'],['3','swap'],['same','eq']]],
 ['Which is less: 8 or 2?',[['2','ok'],['8','swap'],['same','eq']]],
 ['Where does 9 sit on a 1-10 line?',[['Near the right','ok'],['Near the left','left'],['With 1 in the middle','mid']]],
 ['4 is ___ than 9',[['less','ok'],['greater','swap'],['the same','eq']]],
 ['Huge 1 vs tiny 9 — greater is…',[['9','ok'],['1','look'],['the taller drawing','look']]],
 ['Make left greater than 6 from 1 — do what?',[['Raise left past 6','ok'],['Only fatten the 1','look'],['Delete 6','del']]],
 ['5 compared with 5 is…',[['the same','ok'],['greater','swap'],['less','swap']]]];
function why(t){let m='Compare the written values from 1 to 10.';
 if(t==='swap'||t==='eq')m='Look at which numeral stands for more (or less) — not which side you like.';
 if(t==='left'||t==='mid')m='Greater numbers sit further right on the 1-10 line.';
 if(t==='look'||t==='del')m='Value matters: 9 beats 1 even if 1 is drawn huge. Change the number, not only the look.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Compare numerals controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:()=>{},up:()=>{}});controls()}});
A.start()})})();
