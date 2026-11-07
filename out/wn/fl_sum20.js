/* Flagship: fluent adding and subtracting within 20 (ages 7–8; CCSS 2.OA.2 fluently add and subtract within 20
   using mental strategies; know from memory all sums of two one-digit numbers). Doubles wall, near-doubles,
   snap recall of one-digit+one-digit, related take-aways within 20, catch "always recount" myth. Distinct from
   flagw20 (teach make-ten / break-to-ten strategies), flagsum10 (facts ≤10), flagnb20 (exact partner bonds). */
(()=>{
VIS.reg('flagsum20',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['doubles','near','snap','related','bank','myth','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function dots(g,n,x,y,col){const C=A.col,r=10,cols=Math.min(n,5);for(let i=0;i<n;i++){const cx=x+(i%5)*r*2.4,cy=y+Math.floor(i/5)*r*2.4;g.beginPath();g.arc(cx,cy,r,0,7);g.fillStyle=col;g.fill();g.strokeStyle=C.tx;g.lineWidth=1.5;g.stroke()}}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#fce7f3',C.dark?.08:.4);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Fluent within 20',W/2,H*.32,A.narrow?15:18,{w:900});T('Doubles · near-doubles · snap facts',W/2,H*.55,A.narrow?12:14,{c:C.mu});A.fx.draw(g);return}
 if(k==='doubles'){T(S.title||'Doubles wall',W/2,H*.08,A.narrow?14:16,{w:800});
  dots(g,S.n||6,W*.18,H*.28,C.ac);dots(g,S.n||6,W*.58,H*.28,C.am);
  T(`${S.n||6} + ${S.n||6} = ${S.shown?(2*(S.n||6)):'?'}`,W/2,H*.7,22,{w:900});T(S.msg||'Build a double, then snap the total.',W/2,H*.9,12,{c:C.mu})}
 if(k==='near'){T(S.title||'Near-double',W/2,H*.08,A.narrow?14:16,{w:800});
  T(`${S.a} + ${S.b}`,W/2,H*.28,24,{w:900});
  T(S.open?`Double ${S.a} is ${2*S.a}, then +1 → ${S.a+S.b}`:(S.msg||'Use the double, then add one.'),W/2,H*.5,A.narrow?13:15,{c:C.mu,max:W*.9});
  dots(g,S.a,W*.2,H*.68,C.ac);dots(g,S.b,W*.58,H*.68,C.am)}
 if(k==='snap'||k==='related'||k==='bank'||k==='myth'){T(S.title||'Choose',W/2,H*.1,A.narrow?13:15,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.28+i*.2);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.05,y-H*.08,W*.9,H*.16);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.05,y-H*.08,W*.9,H*.16);T(String(t),W/2,y,A.narrow?13:15,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{n:6,shown:0,a:7,b:8,open:0,picked:null,opts:[],title:'',msg:'',check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*160))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='doubles'){btn('Show 6+6',()=>{S.n=6;S.shown=1;S.msg='6 + 6 = 12. A known double.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Reveal six plus six');
  btn('Show 8+8',()=>{S.n=8;S.shown=1;S.msg='8 + 8 = 16.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Reveal eight plus eight');
  btn('Show 9+9',()=>{S.n=9;S.shown=1;S.msg='9 + 9 = 18.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Reveal nine plus nine')}
 if(kind()==='near'){btn('Open near-double',()=>{S.open=1;S.msg=`Double ${S.a} is ${2*S.a}, plus 1 is ${S.a+S.b}.`;A.sound.tick();say(S.msg);A.redraw();S.check()},'Reveal near-double steps');
  btn('Done',()=>S.check(),'Mark near-double done')}
 if(kind()==='snap'||kind()==='related'||kind()==='bank'||kind()==='myth')(S.opts||[]).forEach((t,i)=>btn(String(t),()=>{S.picked=i;A.sound.tick();say(String(t));A.redraw();S.check()},'Pick '+t))}
function down(p){const k=kind();if(k==='chal')return false;
 if(k==='doubles'){S.shown=1;A.sound.tick();A.redraw();S.check();return true}
 if(k==='near'){S.open=1;A.sound.tick();A.redraw();S.check();return true}
 if(k==='snap'||k==='related'||k==='bank'||k==='myth'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.2)/(A.H*.2))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 return true}
const steps=[
{h:'Doubles wall',p:'A double is a number added to itself: 6+6, 7+7, 8+8, 9+9. Fluent within 20 means you know these doubles from memory.',
 predict:{q:'8 + 8 equals…',opts:['16','88','0'],ans:0},
 task:'Show the double 8 + 8',show:()=>auto(0,[()=>{S.n=8;S.shown=1;A.redraw();S.check()}]),
 go:()=>{reset({n:8,shown:0,title:'Double: 8 + 8',msg:'Reveal the double.'});say('Show eight plus eight.');controls();S.check=finish(0,()=>S.n===8&&S.shown,'8 + 8 = 16. Doubles are anchor facts within 20.')}},
{h:'Near-doubles',p:'A near-double is one more than a double: 7 + 8 is double 7, then plus 1. Knowing doubles unlocks near-doubles.',
 predict:{q:'7 + 8 using double 7 is…',opts:['15','78','1'],ans:0},
 task:'Open the near-double for 7 + 8',show:()=>auto(1,[()=>{S.open=1;A.redraw();S.check()}]),
 go:()=>{reset({a:7,b:8,open:0,title:'Near-double: 7 + 8',msg:'Use double 7, then +1.'});say('Open the near-double.');controls();S.check=finish(1,()=>!!S.open,'Double 7 is 14, plus 1 is 15.')}},
{h:'Snap a fact',p:'Fluent means you snap the answer: hear 9 + 6 and say 15 without counting every finger.',
 predict:{q:'9 + 6 equals…',opts:['15','96','3'],ans:0},
 task:'Tap the snap total',show:()=>auto(2,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Snap: 9 + 6 = ?',opts:['15','96','3'],picked:null});say('Snap the total.');controls();S.check=finish(2,()=>S.picked===0,'Quick recall: 9 + 6 = 15.')}},
{h:'Related take-away',p:'If 9 + 7 = 16, then 16 − 7 = 9. Related facts share the same three numbers within 20.',
 predict:{q:'16 − 7 using 9 + 7 is…',opts:['9','7','23'],ans:0},
 task:'Tap the related answer',show:()=>auto(3,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'16 − 7 = ?',opts:['9','7','23'],picked:null});say('Use the related addition.');controls();S.check=finish(3,()=>S.picked===0,'Related fact: 16 − 7 = 9.')}},
{h:'Fact bank within 20',p:'Every sum of two one-digit numbers is within 20 (biggest is 9+9=18). Fluency means knowing them, not inventing new strategies each time.',
 predict:{q:'Which is a within-20 one-digit sum?',opts:['9 + 8 = 17','9 + 12 = 21','15 + 6 = 21'],ans:0},
 task:'Tap the within-20 fact',show:()=>auto(4,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Which is a one-digit sum within 20?',opts:['9 + 8 = 17','9 + 12 = 21','15 + 6 = 21'],picked:null});say('Pick the within-20 fact.');controls();S.check=finish(4,()=>S.picked===0,'9 and 8 are one-digit; their sum 17 is within 20.')}},
{h:'Catch a mix-up',p:'A common slip is always recounting every counter, or sticking digits together (9+6 as 96), instead of using known doubles and related facts.',
 predict:{q:'Which is the mix-up?',opts:['Fluent means always recount every counter','Use double 8 to get 8+8','Use 9+7 to get 16−7'],ans:0},
 task:'Tap the mix-up',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Which is the mix-up?',opts:['Fluent means always recount every counter','Use double 8 to get 8+8','Use 9+7 to get 16−7'],picked:null});say('Find the mix-up.');controls();S.check=finish(5,()=>S.picked===0,'Counting helps when learning; fluent means you know the fact without recounting every time.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[
 ['8 + 8 =',[['16','ok'],['88','stick'],['0','zero']]],
 ['7 + 8 =',[['15','ok'],['78','stick'],['1','diff']]],
 ['9 + 6 =',[['15','ok'],['96','stick'],['3','diff']]],
 ['16 − 7 =',[['9','ok'],['23','add'],['7','echo']]],
 ['Fluent within 20 means…',[['knowing one-digit sums from memory','ok'],['always counting every counter','count'],['only doubles, never near-doubles','only']]],
 ['9 + 9 =',[['18','ok'],['99','stick'],['0','zero']]],
 ['15 − 8 using 7+8…',[['7','ok'],['8','echo'],['23','add']]]
];
function why(t){let m='Use doubles, near-doubles and related facts. Stay within one-digit sums.';
 if(t==='stick')m='Do not stick digits together. 9 + 6 is fifteen, not ninety-six.';
 if(t==='diff')m='That looks like a difference or leftover. For an add, join the parts.';
 if(t==='add')m='You added instead of taking away. Start at the total and remove.';
 if(t==='echo')m='You repeated a number you saw. Use the related addition for the missing part.';
 if(t==='count')m='Counting helps when learning; fluent means you know the fact without recounting every time.';
 if(t==='only')m='Doubles help, and near-doubles and other one-digit sums count too.';
 if(t==='zero')m='A double is not zero. Same number plus itself makes twice as many.';
 return m}
function ask(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>mark(t)});say('Challenge: '+q);A.redraw()}
function mark(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok)A.win();else A.sound.miss();fb.innerHTML=(ok?'✓ Yes. Known fact within 20.':'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.12,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Within-20 fluency controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move:()=>{},up:()=>{}});controls()}});
A.start()})})();
