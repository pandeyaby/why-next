/* Flagship: addition and subtraction within 20 (ages 6–7; CCSS 1.OA.6 make ten / decompose leading to a ten /
   count on; NC Y1–Y2 related facts). Dual ten-frames (ones + teens), split chips for make-ten, break-to-ten bar
   for take-away, count-on number path. Distinct from flagsum10 (single-frame fluent facts ≤10), flagnb20 (exact
   partner bonds ≤20), flagnbonds (exact make-10 partners only). */
(()=>{
VIS.reg('flagw20',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['split','bridge','break','related','path','myth','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function chipRow(g,x,y,w,n,col,maxN){const C=A.col,m=maxN||10,gap=w/m;
 for(let i=0;i<m;i++){const cx=x+gap*(i+.5);g.beginPath();g.arc(cx,y,Math.min(gap*.32,14),0,7);
  if(i<n){g.fillStyle=col;g.fill()}g.strokeStyle=C.tx;g.lineWidth=1.5;g.stroke()}}
function dualFrames(g,W,H,ones,teens){const C=A.col;
 T('ones to 10',W*.28,H*.18,11,{c:C.mu});chipRow(g,W*.06,H*.34,W*.44,ones,C.ac,10);
 T('past 10',W*.72,H*.18,11,{c:C.mu});chipRow(g,W*.5,H*.34,W*.44,teens,C.am,10);
 g.strokeStyle=A.alpha(C.tx,.4);g.lineWidth=2;g.strokeRect(W*.04,H*.22,W*.48,H*.28);g.strokeRect(W*.5,H*.22,W*.46,H*.28)}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#ecfccb',C.dark?.1:.42);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Within 20 strategies',W/2,H*.3,A.narrow?15:18,{w:900});T('Make ten · break to ten · count on',W/2,H*.52,A.narrow?12:14,{c:C.mu});A.fx.draw(g);return}
 if(k==='split'){T(S.title||'Split to make ten',W/2,H*.08,A.narrow?13:15,{w:800});
  dualFrames(g,W,H,S.ones||0,S.teens||0);T(S.msg||'Move chips: fill ones to 10, spill rest past 10.',W/2,H*.78,12,{c:C.mu,max:W*.92});
  T(`need ${S.need||0} more for ten · spill ${S.spill||0}`,W/2,H*.9,12,{c:C.mu})}
 if(k==='bridge'){T(S.title||'Make-ten bridge',W/2,H*.08,A.narrow?13:15,{w:800});
  T(`${S.a} + ${S.b}`,W/2,H*.22,22,{w:900});
  const mid=S.open?`+${10-S.a} → 10  then  +${S.b-(10-S.a)} → ${S.a+S.b}`:(S.msg||'Open the bridge through 10.');
  T(mid,W/2,H*.42,A.narrow?12:14,{c:C.mu,max:W*.92});
  dualFrames(g,W,H*.55+H*.2,S.open?10:S.a,S.open?(S.a+S.b-10):0);T('',0,0,1)}
 if(k==='break'){T(S.title||'Break take-away to a ten',W/2,H*.08,A.narrow?13:15,{w:800});
  T(`${S.a} − ${S.b}`,W/2,H*.22,22,{w:900});
  // progress bar from a down toward a-b, with a mark at 10
  const x0=W*.1,x1=W*.9,y=H*.48,bw=x1-x0;g.strokeStyle=C.tx;g.lineWidth=3;g.beginPath();g.moveTo(x0,y);g.lineTo(x1,y);g.stroke();
  const t10=(10-0)/20,tNow=((S.cur??S.a)-0)/20;g.fillStyle=C.ac;g.beginPath();g.arc(x0+bw*tNow,y,10,0,7);g.fill();
  g.fillStyle=C.am;g.fillRect(x0+bw*t10-2,y-14,4,28);T('10',x0+bw*t10,y+28,11,{c:C.mu});
  T(S.open?`take ${S.a-10} to 10, then − ${S.b-(S.a-10)} → ${S.a-S.b}`:(S.msg||'Slide down; hit 10 first.'),W/2,H*.78,12,{c:C.mu,max:W*.92})}
 if(k==='related'||k==='path'||k==='myth'){T(S.title||'Choose',W/2,H*.1,A.narrow?13:15,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.28+i*.2);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.05,y-H*.08,W*.9,H*.16);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.05,y-H*.08,W*.9,H*.16);T(String(t),W/2,y,A.narrow?12:14,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{ones:0,teens:0,need:0,spill:0,a:0,b:0,open:0,cur:0,picked:null,opts:[],title:'',msg:'',check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*160))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='split'){btn('Fill ones to 10',()=>{const n=S.need||0;S.ones=10;S.teens=S.spill||0;S.msg='Ones full; spill past 10.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Move chips to fill ten');
  btn('Spill rest',()=>{S.ones=10;S.teens=S.spill||0;A.redraw();S.check()},'Show chips past ten');
  btn('Reset split',()=>{S.ones=S.a||0;S.teens=0;S.msg='Split the second addend.';A.redraw()},'Reset chips')}
 if(kind()==='bridge'){btn('Open make-ten bridge',()=>{S.open=1;S.msg=`${S.a}+${S.b}=${S.a+S.b}`;A.sound.tick();say(S.msg);A.redraw();S.check()},'Reveal make-ten steps');
  btn('Done',()=>S.check(),'Mark bridge done')}
 if(kind()==='break'){btn('Hit 10 first',()=>{S.cur=10;S.open=0;A.sound.tick();A.redraw()},'Slide down to ten');
  btn('Finish take-away',()=>{S.cur=S.a-S.b;S.open=1;S.msg=`${S.a}−${S.b}=${S.a-S.b}`;A.sound.tick();say(S.msg);A.redraw();S.check()},'Complete break-to-ten');
  btn('Done',()=>S.check(),'Mark break done')}
 if(kind()==='related'||kind()==='path'||kind()==='myth')(S.opts||[]).forEach((t,i)=>btn(String(t),()=>{S.picked=i;A.sound.tick();say(String(t));A.redraw();S.check()},'Pick '+t))}
function down(p){if(kind()==='chal')return false;
 if(kind()==='split'){S.ones=10;S.teens=S.spill||0;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='bridge'){S.open=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='break'){if(!S.open){S.cur=10;S.open=0;A.redraw()}else{S.cur=S.a-S.b}S.open=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='related'||kind()==='path'||kind()==='myth'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.2)/(A.H*.2))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 return true}
const steps=[
{h:'Split to make ten',p:'Make-ten starts by splitting the second addend: for 8 + 6, peel off 2 to fill the ones frame to 10, and spill the leftover 4 into the past-10 row.',
 predict:{q:'8 + 6: how many chips spill past 10?',opts:['4','6','2'],ans:0},
 task:'Fill ones to 10 and spill the rest for 8 + 6',show:()=>auto(0,[()=>{S.ones=10;S.teens=4;S.msg='Spill 4 past 10.';A.redraw();S.check()}]),
 go:()=>{reset({title:'Split 6 beside 8',a:8,b:6,ones:8,teens:0,need:2,spill:4,msg:'Fill ones; spill 4.'});say('Fill to ten and spill the rest.');controls();S.check=finish(0,()=>S.ones===10&&S.teens===4,'2 fill to ten; 4 spill past → 14.')}},
{h:'Make-ten bridge',p:'Say the bridge aloud: 8 + 2 = 10, then + 4 → 14. Make-ten builds facts past 10, not only partners that stop at 10.',
 predict:{q:'8 + 6 via make-ten equals…',opts:['14','86','10'],ans:0},
 task:'Open the make-ten bridge for 8 + 6',show:()=>auto(1,[()=>{S.open=1;A.redraw();S.check()}]),
 go:()=>{reset({title:'Bridge 8 + 6',a:8,b:6,open:0,msg:'Open the bridge through 10.'});say('Open the make-ten bridge.');controls();S.check=finish(1,()=>!!S.open,'8 + 2 = 10, then + 4 → 14.')}},
{h:'Break to a ten',p:'Decompose a take-away so you hit ten first: 13 − 5 → take 3 to reach 10, then take 2 more → 8.',
 predict:{q:'13 − 5 via a ten equals…',opts:['8','15','3'],ans:0},
 task:'Break 13 − 5 by hitting 10 first',show:()=>auto(2,[()=>{S.cur=8;S.open=1;A.redraw();S.check()}]),
 go:()=>{reset({title:'Break 13 − 5',a:13,b:5,cur:13,open:0,msg:'Hit 10, then finish.'});say('Break the take-away to a ten.');controls();S.check=finish(2,()=>!!S.open&&S.cur===8,'13 − 3 = 10, then − 2 → 8.')}},
{h:'Related take-away',p:'If 9 + 7 = 16, then 16 − 7 = 9. Related facts keep the same three numbers within 20.',
 predict:{q:'16 − 7 using 9 + 7 is…',opts:['9','7','16'],ans:0},
 task:'Tap the related part',show:()=>auto(3,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'16 − 7 = ?',opts:[9,7,16],picked:null});say('Use the related addition fact.');controls();S.check=finish(3,()=>S.picked===0,'Related fact: 16 − 7 = 9.')}},
{h:'Count-on path',p:'Count on from the larger addend: for 9 + 4 say 10, 11, 12, 13. Do not restart and recount every object from 1.',
 predict:{q:'Best path for 9 + 4?',opts:['Start at 9; count 4 more','Recount all from 1','Stick digits as 94'],ans:0},
 task:'Tap the count-on path',show:()=>auto(4,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Path for 9 + 4',opts:['Start at 9; count 4 more','Recount all from 1','Stick digits as 94'],picked:null});say('Pick the count-on path.');controls();S.check=finish(4,()=>S.picked===0,'Count on: 10, 11, 12, 13.')}},
{h:'Catch a mix-up',p:'Slips: sticking digits (8 + 6 as 86), stopping the bridge at 10 and ignoring the leftover, or recounting from 1 every time.',
 predict:{q:'Which is the mix-up?',opts:['8 + 6 via make-ten is written 86','Make-ten can build facts past 10','Count on from the larger addend'],ans:0},
 task:'Tap the mix-up',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Which is the mix-up?',opts:['8 + 6 via make-ten is written 86','Make-ten can build facts past 10','Count on from the larger addend'],picked:null});say('Find the mix-up.');controls();S.check=finish(5,()=>S.picked===0,'Make-ten gives 14, not stuck digits 86.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['8 + 6 via make-ten =',[['14','ok'],['86','stick'],['10','stop10']]],
 ['13 − 5 via a ten =',[['8','ok'],['15','add'],['3','echo']]],
 ['9 + 7 =',[['16','ok'],['97','stick'],['2','sub']]],
 ['16 − 7 related…',[['9','ok'],['7','echo'],['16','whole']]],
 ['Best for 9 + 4?',[['count on from 9','ok'],['recount every object from 1','recount'],['write 94','stick']]],
 ['12 − 4 via a ten =',[['8','ok'],['16','add'],['2','echo']]],
 ['Make-ten for 8 + 5 starts by…',[['taking 2 from 5 to make 10','ok'],['sticking 8 and 5 as 85','stick'],['stopping at 10 only','stop10']]]];
function why(t){let m='Use make-ten, break to a ten, or count on — stay within 20.';
 if(t==='stick')m='Do not stick digits together. 8 + 6 is fourteen, not eighty-six.';
 if(t==='stop10')m='Make-ten is a bridge: fill to 10, then add what is left. The answer can be past 10.';
 if(t==='add')m='You added instead of taking away. Start high and remove.';
 if(t==='echo')m='You repeated a number you saw. Find the missing part with the related fact.';
 if(t==='sub')m='That looks like a take-away. For an add, join the parts.';
 if(t==='whole')m='You named the whole. The related take-away asks for the other part.';
 if(t==='recount')m='Recounting from 1 every time is slow. Count on from the larger addend.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.12,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Within-20 strategy controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:()=>{},up:()=>{}});controls()}});
A.start()})})();
