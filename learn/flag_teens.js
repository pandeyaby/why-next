/* Flagship: the teen numbers (ages 5-7; CCSS K.NBT.1 / 1.NBT.2.b — 11-19 as one group of ten ones and some further
   ones). Fill a ten-frame, add leftover ones, read teens as 10+n, split a teen into ten and ones, then build a target
   teen. Every tap has a button twin. */
(()=>{
VIS.reg('flagteens',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['ten','add','read','split','build','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function frame(x,y,u,filled){const g=A.ctx,C=A.col;g.strokeStyle=C.tx;g.lineWidth=3;g.strokeRect(x,y,u*5,u*2);
 for(let i=0;i<10;i++){const cx=x+(i%5)*u+u*.5,cy=y+Math.floor(i/5)*u+u*.5;g.beginPath();g.arc(cx,cy,u*.32,0,7);
  if(i<filled){g.fillStyle=C.ac;g.fill()}g.strokeStyle=C.tx;g.lineWidth=2;g.stroke()}}
function ones(x,y,u,n){const g=A.ctx,C=A.col;for(let i=0;i<n;i++){const cx=x+(i%5)*u*1.1,cy=y+Math.floor(i/5)*u*1.1;
 g.fillStyle=C.or;g.beginPath();g.arc(cx,cy,u*.28,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke()}}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind(),u=Math.min(W/12,H*.12);
 g.fillStyle=A.mix(C.pn,'#fce7f3',C.dark?.05:.35);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Teen numbers are ten and some more',W/2,H*.28,A.narrow?14:17);T('14 = 10 + 4   ·   17 = 10 + 7',W/2,H*.48,A.narrow?14:18);T('A full ten-frame, then the leftover ones',W/2,H*.68,A.narrow?13:15,{c:C.mu});A.fx.draw(g);return}
 const fx=(W-5*u)/2,fy=H*.22;
 if(k==='ten'||k==='add'||k==='build'){frame(fx,fy,u,S.ten);ones(fx,fy+u*2.4,u,S.extra);
  T(k==='ten'?(S.ten<10?`Tap to fill the ten-frame (${S.ten}/10)`:'One full ten!'):k==='add'?`Ten + ${S.extra} = ${10+S.extra}`:`Make ${S.target}: ten + ${S.extra}`,W/2,H*.08,A.narrow?13:15,{w:800});
  if(k!=='ten')T(`Total: ${10+S.extra}`,W/2,H*.88,18,{w:900})}
 if(k==='read'){const[t,e]=S.reads[Math.min(S.round,S.reads.length-1)]||[1,4];frame(fx,fy,u,10);ones(fx,fy+u*2.4,u,e);
  T(S.round<S.reads.length?'How many altogether? Ten and some more.':'All 3 teens read!',W/2,H*.08,A.narrow?13:15,{w:800});
  if(S.round<S.reads.length)S.opts.forEach((o,i)=>{const r={x:10+i*((W-40)/3+10),y:H*.78,w:(W-40)/3,h:H*.14};
   g.fillStyle=A.alpha(C.vi,.14);A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=C.tx;g.stroke();T(String(o),r.x+r.w/2,r.y+r.h/2,20,{w:800})})}
 if(k==='split'){const n=S.splitN;frame(fx,fy,u,S.splitTen?10:0);ones(fx,fy+u*2.4,u,S.splitOnes);
  T(S.splitDone?`${n} = 10 + ${n-10}`:`Split ${n}: make a ten, then count the leftovers`,W/2,H*.08,A.narrow?13:15,{w:800})}
 A.fx.draw(g)}
function fillTen(){if(S.ten>=10)return;S.ten++;A.sound.tick();say(S.ten<10?S.ten+' in the ten-frame.':`One full ten!`);A.redraw();S.check()}
function addOne(){if(S.extra>=S.wantExtra)return;S.extra++;A.sound.tick();say('Ten and '+S.extra+' is '+(10+S.extra)+'.');A.redraw();S.check()}
function pickRead(o){if(S.round>=S.reads.length)return;const[t,e]=S.reads[S.round],a=10+e;
 if(o===e){A.sound.miss();say('That counts only the leftovers. Add the full ten: 10 + '+e+' = '+a+'.');return}
 if(o!==a){A.sound.miss();say('Ten and '+e+' ones make '+a+', not '+o+'.');return}
 S.round++;A.sound.pop();say('Yes! 10 + '+e+' = '+a+'.');if(S.round<S.reads.length){const[,e2]=S.reads[S.round];S.opts=shuffle([10+e2,e2,10+e2+1])}
 A.redraw();S.check()}
function doSplit(){if(S.splitDone)return;if(!S.splitTen){S.splitTen=1;A.sound.tick();say('One ten pulled out of '+S.splitN+'.');A.redraw();return}
 S.splitOnes=S.splitN-10;S.splitDone=1;A.sound.pop();say(S.splitN+' is 10 + '+S.splitOnes+'.');A.redraw();S.check()}
function buildOne(){if(10+S.extra>=S.target)return;if(S.ten<10){S.ten++;A.sound.tick();say(S.ten<10?S.ten+' in the frame.':'Ten ready. Now add ones.');A.redraw();S.check();return}
 S.extra++;A.sound.tick();say('Ten and '+S.extra+(10+S.extra===S.target?' — that is '+S.target+'!':' .'));A.redraw();S.check()}
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=(S.round+i)%(i+1),[x,y]=[a[i],a[j]];a[i]=y;a[j]=x}return a}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{ten:0,extra:0,wantExtra:4,round:0,reads:[[1,4],[1,7],[1,2]],opts:[14,4,15],splitN:14,splitTen:0,splitOnes:0,splitDone:0,target:16,check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*260))}
function controls(){if(!ctl)return;ctl.innerHTML='';const k=kind(),btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||null},ctl,t).onclick=f};if(k==='chal')return;
 if(k==='ten'&&S.ten<10)btn('Add one to the ten-frame',fillTen,'Put one more counter in the ten-frame');
 if(k==='add'&&S.extra<S.wantExtra)btn('Add one more',addOne,'Add one leftover one beside the ten');
 if(k==='read'&&S.round<S.reads.length)S.opts.forEach(o=>btn(String(o),()=>pickRead(o),'There are '+o));
 if(k==='split'&&!S.splitDone)btn(S.splitTen?'Count the leftover ones':'Pull out a ten',doSplit,S.splitTen?'Count how many ones are left':'Make a group of ten');
 if(k==='build'&&10+S.extra<S.target)btn(S.ten<10?'Fill the ten-frame':'Add a leftover one',buildOne,S.ten<10?'Add one to the ten-frame':'Add one more one')}
function down(p){const k=kind();if(k==='chal')return false;
 if(k==='ten'){fillTen();return true}if(k==='add'){addOne();return true}
 if(k==='read'&&S.round<S.reads.length){const w=(A.W-40)/3;S.opts.forEach((o,i)=>{if(p.x>=10+i*(w+10)&&p.x<=10+i*(w+10)+w&&p.y>=A.H*.78)pickRead(o)});return true}
 if(k==='split'){doSplit();return true}if(k==='build'){buildOne();return true}return false}
const steps=[
{h:'Fill a ten',p:'A ten-frame holds ten. Fill every space. That group of ten is the start of every teen number.',
 predict:{q:'How many counters fill a ten-frame?',opts:['10','5','20'],ans:0},
 task:'Fill all 10 spaces',show:()=>auto(0,Array(10).fill(fillTen)),
 go:()=>{reset();say('Tap to put counters in the ten-frame.');controls();S.check=finish(0,()=>S.ten>=10,'One full ten. Teens start with this ten.')}},
{h:'Add some more',p:'Keep the ten. Add leftover ones beside it. Ten and four is fourteen.',
 predict:{q:'One full ten and 4 ones make…',opts:['14','4','104'],ans:0},
 task:'Add 4 ones beside the ten',show:()=>auto(1,Array(4).fill(addOne)),
 go:()=>{reset({ten:10,extra:0,wantExtra:4});say('Add four ones beside the ten.');controls();S.check=finish(1,()=>S.extra>=4,'10 + 4 = 14. That is a teen number.')}},
{h:'Read the teens',p:'See a full ten-frame and some ones. Say the teen: ten and seven is seventeen.',
 predict:{q:'Ten and 2 ones make…',opts:['12','2','20'],ans:0},
 task:'Read 3 teen numbers',show:()=>auto(2,[()=>pickRead(14),()=>pickRead(17),()=>pickRead(12)]),
 go:()=>{reset({round:0,opts:[14,4,15]});say('How many altogether?');controls();S.check=finish(2,()=>S.round>=3,'Teens are ten and some more: 14, 17, 12.')}},
{h:'Split a teen',p:'Start with 14 loose ones. Pull out a ten. Count what is left. 14 = 10 + 4.',
 task:'Split 14 into ten and ones',show:()=>auto(3,[doSplit,doSplit]),
 go:()=>{reset({splitN:14,splitTen:0,splitOnes:0,splitDone:0});say('Split 14 into a ten and leftovers.');controls();S.check=finish(3,()=>S.splitDone,'14 = 10 + 4.')}},
{h:'Build a teen',p:'Make 16: fill the ten-frame, then add 6 ones.',
 predict:{q:'To make 16 you need…',opts:['1 ten and 6 ones','6 tens','16 tens'],ans:0},
 task:'Build 16',show:()=>auto(4,Array(16).fill(buildOne)),
 go:()=>{reset({ten:0,extra:0,target:16});say('Build 16 as ten and six.');controls();S.check=finish(4,()=>S.ten>=10&&S.extra>=6,'16 = 10 + 6.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['14 is the same as…',[['10 + 4','ok'],['1 + 4','ones'],['40 + 1','swap']]],
 ['A teen number always has…',[['one full ten and some ones','ok'],['two full tens','two'],['no tens','none']]],
 ['10 + 7 =',[['17','ok'],['7','left'],['70','swap']]],
 ['Which is a teen number?',[['13','ok'],['30','thirty'],['3','three']]],
 ['19 = 10 + ?',[['9','ok'],['19','all'],['1','one']]],
 ['Why is 11 a teen number?',[['it is 10 + 1','ok'],['it looks like two 1s','look'],['it is bigger than 20','big']]],
 ['10 + 0 is…',[['10, not a teen','ok'],['10, a teen','teen'],['0','zero']]]];
function why(t){let m='Teen numbers 11 to 19 are one ten and some more ones.';
 if(t==='ones')m='Keep the full ten. 14 is 10 + 4, not 1 + 4.';
 if(t==='swap')m='The ten comes first. 10 + 4 is 14, not forty-something.';
 if(t==='two')m='Teens have exactly one ten. Two tens would be twenty or more.';
 if(t==='none')m='Every teen has one ten. That is what the \"teen\" part means.';
 if(t==='left')m='You forgot the ten. 10 + 7 is 17, not 7.';
 if(t==='thirty')m='30 is three tens. A teen is only one ten and some ones.';
 if(t==='three')m='3 is just three ones. Teens start at 11.';
 if(t==='all')m='19 already includes the ten. The leftover ones are 9, so 19 = 10 + 9.';
 if(t==='one')m='The leftover after the ten is 9, not 1.';
 if(t==='look')m='The digits look like 1 and 1, but the value is one ten and one one.';
 if(t==='big')m='11 is less than 20. Teens are 11 to 19.';
 if(t==='teen')m='10 is one ten and zero ones. Teens need some leftover ones (11-19).';
 if(t==='zero')m='10 + 0 is 10. That is a ten, not a teen.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.6,tall:1.12,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Teen number controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:()=>{},up:()=>{}});controls()}});
A.start()})})();
