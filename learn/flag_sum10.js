/* Flagship: fluent adding and subtracting within 10 (ages 6–7; CCSS 1.OA.6 "fluently add and subtract within 10";
   NC Y1/Y2 related facts within 10). Ten-frame fill, make-10 bridge, related subtraction, snap recall of facts to 10.
   Distinct from flagsum5 (facts within 5), flagnbonds (partners that make exactly 10), flagnb20 (bonds within 20). */
(()=>{
VIS.reg('flagsum10',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['frame','bridge','related','snap','pairs','myth','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function tenFrame(g,x,y,w,h,filled){const C=A.col;g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(x,y,w,h);const cw=w/5,ch=h/2;
 for(let r=0;r<2;r++)for(let c=0;c<5;c++){const i=r*5+c,cx=x+cw*(c+.5),cy=y+ch*(r+.5);
  g.strokeStyle=A.alpha(C.tx,.35);g.strokeRect(x+c*cw,y+r*ch,cw,ch);
  if(i<filled){g.beginPath();g.arc(cx,cy,Math.min(cw,ch)*.28,0,7);g.fillStyle=i<5?C.ac:C.am;g.fill();g.strokeStyle=C.tx;g.lineWidth=1.4;g.stroke()}}}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#dbeafe',C.dark?.08:.38);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Facts within 10 — answer straight away',W/2,H*.32,A.narrow?14:17,{w:900});T('Ten-frame · make 10 · related take-away',W/2,H*.55,A.narrow?12:14,{c:C.mu});A.fx.draw(g);return}
 if(k==='frame'){T(S.title||'Ten-frame',W/2,H*.08,A.narrow?14:16,{w:800});tenFrame(g,W*.12,H*.22,W*.76,H*.42,S.filled||0);T(S.msg||'Tap + / − or drag along the frame.',W/2,H*.88,12,{c:C.mu})}
 if(k==='bridge'){T(S.title||'Make 10, then add',W/2,H*.08,A.narrow?13:15,{w:800});
  T(`${S.a} + ${S.b}`,W/2,H*.28,A.narrow?20:24,{w:900});
  T(S.bridge?`Make 10: ${S.a} + ${10-S.a} = 10, then + ${S.b-(10-S.a)} → ${S.a+S.b}`:(S.msg||'Bridge through 10.'),W/2,H*.52,A.narrow?12:14,{c:C.mu,max:W*.9});
  tenFrame(g,W*.18,H*.62,W*.64,H*.28,S.bridge?10:S.a)}
 if(k==='related'||k==='snap'||k==='myth'||k==='pairs'){T(S.title||'Choose',W/2,H*.1,A.narrow?13:15,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.28+i*.2);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.05,y-H*.08,W*.9,H*.16);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.05,y-H*.08,W*.9,H*.16);T(String(t),W/2,y,A.narrow?13:15,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{filled:0,a:0,b:0,bridge:0,picked:null,opts:[],title:'',msg:'',check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*160))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='frame'){btn('+ one',()=>{if(S.filled<10){S.filled++;S.msg=S.filled+' on the ten-frame.';A.sound.tick();say(S.msg);A.redraw();S.check()}},'Add one counter');
  btn('− one',()=>{if(S.filled>0){S.filled--;S.msg=S.filled+' on the ten-frame.';A.sound.tick();say(S.msg);A.redraw();S.check()}},'Take one counter');
  btn('Fill to 8',()=>{S.filled=8;S.msg='8 on the ten-frame.';A.redraw();S.check()},'Set eight counters')}
 if(kind()==='bridge'){btn('Show make-10 bridge',()=>{S.bridge=1;S.msg=`${S.a}+${S.b}=${S.a+S.b} via 10`;A.sound.tick();say(S.msg);A.redraw();S.check()},'Reveal the bridge through 10');
  btn('Done',()=>S.check(),'Mark bridge done')}
 if(kind()==='related'||kind()==='snap'||kind()==='myth'||kind()==='pairs')(S.opts||[]).forEach((t,i)=>btn(String(t),()=>{S.picked=i;A.sound.tick();say(String(t));A.redraw();S.check()},'Pick '+t))}
function down(p){if(kind()==='chal')return false;
 if(kind()==='frame'){const nw=Math.max(0,Math.min(10,Math.round((p.x-A.W*.12)/(A.W*.76)*10)));S.filled=nw;S.msg=S.filled+' on the ten-frame.';A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='bridge'){S.bridge=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='related'||kind()==='snap'||kind()==='myth'||kind()==='pairs'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.2)/(A.H*.2))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 return true}
const steps=[
{h:'Fill a ten-frame',p:'A ten-frame holds ten counters: two rows of five. Fluent within 10 means you know how many are filled and how many are empty without recounting every space.',
 predict:{q:'8 counters on a ten-frame. Empty spaces?',opts:['2','8','10'],ans:0},
 task:'Put exactly 8 counters on the ten-frame',show:()=>auto(0,[()=>{S.filled=8;S.msg='8 on the ten-frame.';A.redraw();S.check()}]),
 go:()=>{reset({title:'Make 8 on the ten-frame',filled:3,msg:'Grow to 8.'});say('Put eight counters on the ten-frame.');controls();S.check=finish(0,()=>S.filled===8,'8 filled and 2 empty: 8 + 2 = 10.')}},
{h:'Bridge through 10',p:'A make-10 bridge: 8 needs 2 more to fill the ten-frame. So 8 + 2 makes 10. Bridging through 10 is a fluency strategy for facts within 10.',
 predict:{q:'8 + 2 via make-10 is…',opts:['10','82','6'],ans:0},
 task:'Show the make-10 bridge for 8 + 2',show:()=>auto(1,[()=>{S.bridge=1;A.redraw();S.check()}]),
 go:()=>{reset({title:'Bridge: 8 + 2',a:8,b:2,bridge:0,msg:'Tap to bridge through 10.'});say('Show the make-10 bridge.');controls();S.check=finish(1,()=>!!S.bridge,'8 + 2 makes 10. Bridging through 10 is a fluency strategy.')}},
{h:'Related take-away',p:'If 6 + 4 = 10, then 10 − 4 = 6. Related facts share the same three numbers.',
 predict:{q:'10 − 4 using 6 + 4 is…',opts:['6','4','10'],ans:0},
 task:'Tap the related fact answer',show:()=>auto(2,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'10 − 4 = ?',opts:[6,4,10],picked:null});say('Use the related addition fact.');controls();S.check=finish(2,()=>S.picked===0,'Related fact: 10 − 4 = 6.')}},
{h:'Snap recall',p:'Fluent means you snap the answer: hear 7 + 3 and say 10 without counting every counter.',
 predict:{q:'7 + 3 equals…',opts:['10','73','4'],ans:0},
 task:'Tap the quick total',show:()=>auto(3,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Snap: 7 + 3 = ?',opts:['10','73','4'],picked:null});say('Snap the total.');controls();S.check=finish(3,()=>S.picked===0,'Quick recall: 7 + 3 = 10.')}},
{h:'Near-10 facts',p:'Facts within 10 are not only pairs that make 10. 5 + 3 = 8 and 9 − 2 = 7 are within-10 facts too.',
 predict:{q:'Which is a within-10 fact?',opts:['5 + 3 = 8','5 + 6 = 11','12 − 1 = 11'],ans:0},
 task:'Tap the within-10 fact',show:()=>auto(4,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Which stays within 10?',opts:['5 + 3 = 8','5 + 6 = 11','12 − 1 = 11'],picked:null});say('Pick the within-10 fact.');controls();S.check=finish(4,()=>S.picked===0,'5 + 3 = 8 stays inside 0 to 10.')}},
{h:'Catch a mix-up',p:'A common slip is sticking digits together (7 + 3 as 73) or treating “within 10” as only make-10 pairs.',
 predict:{q:'Which is the mix-up?',opts:['Fluent within 10 means only make-10 pairs','Use 6+4 to get 10−4','Snap 7+3 as 10'],ans:0},
 task:'Tap the mix-up',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Which is the mix-up?',opts:['Only make-10 pairs count as within 10','Use 6+4 to get 10−4','Snap 7+3 as 10'],picked:null});say('Find the mix-up.');controls();S.check=finish(5,()=>S.picked===0,'Within 10 includes every sum and take-away with numbers 0–10, not only make-10.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['8 + 2 =',[['10','ok'],['82','stick'],['6','sub']]],
 ['10 − 4 =',[['6','ok'],['4','echo'],['14','add']]],
 ['7 + 3 =',[['10','ok'],['73','stick'],['4','sub']]],
 ['5 + 3 =',[['8','ok'],['53','stick'],['2','sub']]],
 ['Fluent within 10 means…',[['knowing facts 0–10 straight away','ok'],['only partners that make 10','only10'],['always counting every counter','count']]],
 ['9 − 2 =',[['7','ok'],['11','add'],['92','stick']]],
 ['6 + 4 related take-away…',[['10 − 4 = 6','ok'],['6 − 4 = 10','swap'],['4 + 10 = 6','jumble']]]];
function why(t){let m='Stay inside 0 to 10, check the sign, and use related facts.';
 if(t==='stick')m='Do not stick digits together. 7 + 3 is ten, not seventy-three.';
 if(t==='sub')m='That looks like a take-away or a difference. For an add, join the parts.';
 if(t==='echo')m='You repeated a number you saw. Use the related addition fact for the missing part.';
 if(t==='add')m='You added instead of taking away. 10 − 4 starts at 10 and removes 4.';
 if(t==='only10')m='Make-10 pairs matter, but within 10 also includes facts like 5 + 3 and 9 − 2.';
 if(t==='count')m='Counting helps when learning; fluent means you know the fact without recounting every time.';
 if(t==='swap'||t==='jumble')m='If a + b = c, then c − b = a. Keep the same three numbers in the related fact.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.12,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Within-10 fluency controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:()=>{},up:()=>{}});controls()}});
A.start()})})();
