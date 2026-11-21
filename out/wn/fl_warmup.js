/* Flagship – a quick look back at yesterday (ages 6–8; Rosenshine's daily review; retrieval practice). Scenes: drag the
   moon across the night and watch yesterday's memory bars sink but not vanish; drag blocks into today's session so the
   look back comes first; bring each memory bar back to strong by trying from memory (peeking barely helps); drag a
   slider to choose how many look-back questions fit a 15-minute practice; answer today's 17 + 3 using yesterday's
   7 + 3 and pick why the look back helped. Data in learn/warmup_art.js. */
(()=>{const {FACTS,STRONG,GAIN,BLOCKS,ORDER,SESSION,MAXQ,sizeSays,TODAY,WHY,DESC,DONE,QS}=WUP;
VIS.reg('flagwarmup',c=>{let A,pad,quizBox,round=-1,epoch=0;const M={};
const NAVY='#0f172a',YES='#047857',NOPE='#b91c1c',LINE='#64748b',LIT='#6d28d9',FAM='px system-ui,sans-serif';
const PARTS=['night','order','recall','length','build','quiz'],part=()=>PARTS[A.step];
const big=n=>Math.round(A.narrow?n:n*1.1);
const over=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* text that shrinks until it fits */
function label(s,x,y,n,o={}){const g=A.ctx;let k=big(n);const f=()=>g.font=`${o.wt||700} ${k}${FAM}`;f();while(o.room&&k>9&&g.measureText(s).width>o.room){k--;f()}
 g.fillStyle=o.ink||NAVY;g.textAlign=o.align||'center';g.textBaseline='middle';g.fillText(s,x,y)}
/* a card; mood picks its fill and edge, and ✓ / ✗ go in the text so colour is not the only signal */
function plate(r,mood){const g=A.ctx,T={yes:['#d1fae5',YES],no:['#fee2e2',NOPE],lit:['#ede9fe',LIT]}[mood]||['#ffffff',LINE];
 g.fillStyle=T[0];A.paint.rrect(r.x,r.y,r.w,r.h,Math.min(12,r.h/3));g.fill();g.lineWidth=mood?3.5:1.8;g.strokeStyle=T[1];g.stroke()}
function title(s,good){const g=A.ctx;let k=big(15);g.font=`800 ${k}${FAM}`;while(g.measureText(s).width>A.W-36&&k>10){k--;g.font=`800 ${k}${FAM}`}
 const w=g.measureText(s).width+24,r={x:(A.W-w)/2,y:6,w,h:k+15};plate(r,good?'yes':'');label(s,A.W/2,r.y+r.h/2+1,k/(A.narrow?1:1.1),{wt:800})}
function backdrop(tint,t){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,tint,A.col.dark?.12:t);g.fillRect(0,0,A.W,A.H)}
/* a memory bar: how easy the fact is to bring back */
function meter(x,y,w,h,v){const g=A.ctx;g.fillStyle='#e2e8f0';A.paint.rrect(x,y,w,h,h/2);g.fill();const f=Math.max(0,Math.min(100,v))/100;
 g.fillStyle=v>=STRONG?YES:v>=55?'#b45309':NOPE;if(f>0){A.paint.rrect(x,y,Math.max(h,w*f),h,h/2);g.fill()}g.lineWidth=1.5;g.strokeStyle=LINE;A.paint.rrect(x,y,w,h,h/2);g.stroke();
 label(Math.round(v)+'%',x+w+6,y+h/2,11,{align:'left'})}
/* ---------- 1. the night ---------- */
const skyY=()=>A.H*.24,moonX=t=>A.W*(.1+.8*t);
const factRow=i=>({x:A.W*.05,y:A.H*(.44+i*.18),w:A.W*.9,h:A.H*.15});
function drawNight(){const s=M.n,g=A.ctx,t=s.t;backdrop(t>=1?'#fde68a':'#1e3a8a',t>=1?.4:.25+.25*t);
 const mx=moonX(t);g.fillStyle=t>=1?'#facc15':'#f8fafc';g.beginPath();g.arc(mx,skyY(),Math.max(22,A.W*.045),0,7);g.fill();g.lineWidth=3;g.strokeStyle=LIT;g.stroke();label(t>=1?'☀️':'🌙',mx,skyY(),18);
 g.setLineDash([4,6]);g.strokeStyle=LINE;g.beginPath();g.moveTo(moonX(0),skyY()+34);g.lineTo(moonX(1),skyY()+34);g.stroke();g.setLineDash([]);
 label('bedtime',moonX(0),skyY()+48,11,{ink:A.col.tx});label('morning',moonX(1),skyY()+48,11,{ink:A.col.tx});
 FACTS.forEach((F,i)=>{const r=factRow(i);plate(r,'');label(F.e+' '+F.y,r.x+10,r.y+r.h*.3,12,{align:'left',room:r.w-20});meter(r.x+10,r.y+r.h*.58,r.w*.72,r.h*.26,s.v[i])});
 title(t>=1?'Morning: fainter, not gone':'Drag the moon to morning',t>=1)}
function nightTo(t){const s=M.n;if(s.t>=1)return;s.t=Math.max(s.t,Math.min(1,t));s.v=FACTS.map(F=>100-(100-F.fade)*s.t);
 if(s.t>=.97){s.t=1;s.v=FACTS.map(F=>F.fade);A.sound.pop();return tell('Morning. The bars dropped overnight, to '+FACTS.map(F=>F.fade+'%').join(', ')+', but none went to zero.')}A.redraw()}
function sleepAll(){const g0=epoch;[.25,.5,.75,1].forEach((t,j)=>setTimeout(()=>{if(g0===epoch)nightTo(t)},A.reduced()?0:200*(j+1)))}
/* ---------- 2. the order of the session ---------- */
const slotR=j=>{const w=(A.W-40)/3;return{x:10+j*(w+10),y:A.H*.24,w,h:A.H*.3}};
const blockR=i=>{const w=(A.W-40)/3;return{x:10+i*(w+10),y:A.H*.68,w,h:A.H*.24}};
function drawOrder(){const s=M.o,g=A.ctx;backdrop('#c7d2fe',.4);
 [0,1,2].forEach(j=>{const r=slotR(j),k=s.slot[j];g.setLineDash(k?[]:[6,5]);plate(r,k?'yes':s.bad===j?'no':s.hover===j?'lit':'');g.setLineDash([]);
  label(`${j+1}`,r.x+16,r.y+16,13,{ink:LINE});if(k){const B=BLOCKS.find(b=>b.k===k),w=('✓ '+B.t).split(' '),h=Math.ceil(w.length/2);label(B.e,r.x+r.w/2,r.y+r.h*.36,24);
  label(w.slice(0,h).join(' '),r.x+r.w/2,r.y+r.h*.66,12,{room:r.w-8});label(w.slice(h).join(' '),r.x+r.w/2,r.y+r.h*.84,12,{room:r.w-8})}});
 label('first  →  then  →  last',A.W/2,A.H*.6,11,{ink:A.col.tx});
 BLOCKS.forEach((B,i)=>{if(s.slot.includes(B.k))return;const r0=blockR(i),r=s.drag&&s.drag.i===i?{x:s.drag.x-r0.w/2,y:s.drag.y-r0.h/2,w:r0.w,h:r0.h}:r0;plate(r,s.pick===i?'lit':'');
  label(B.e,r.x+r.w/2,r.y+r.h*.32,20);const w=B.t.split(' '),h=Math.ceil(w.length/2);label(w.slice(0,h).join(' '),r.x+r.w/2,r.y+r.h*.62,11,{room:r.w-8});label(w.slice(h).join(' '),r.x+r.w/2,r.y+r.h*.82,11,{room:r.w-8})});
 title(s.slot.every(Boolean)?'Look back, new work, finish':'Build today’s practice',s.slot.every(Boolean))}
function place(i,j){const s=M.o,B=BLOCKS[i];s.drag=null;s.hover=-1;s.pick=null;if(s.slot.includes(B.k)||s.slot[j])return A.redraw();
 if(ORDER[j]!==B.k){s.bad=j;A.sound.miss();return tell(j===0&&B.k==='new'?slip('newfirst'):B.k==='back'?'The look back goes first, before the new work, so it can wake up yesterday.':B.k==='end'?'Finish and tidy up comes last.':'New work comes after the look back, not last.')}
 s.slot[j]=B.k;s.bad=-1;A.sound.pop();tell(`${B.t}: slot ${j+1}.`)}
/* ---------- 3. from memory first ---------- */
const rowR=i=>({x:A.W*.03,y:A.H*(.15+i*.28),w:A.W*.94,h:A.H*.25});
const actR=(i,a)=>{const r=rowR(i),w=(r.w*.5-14)/2;return{x:r.x+r.w*.5-4+a*(w+6),y:r.y+r.h*.38,w,h:r.h*.54}};
const optR=(i,a)=>{const r=rowR(i),w=(r.w*.5-20)/3;return{x:r.x+r.w*.5-4+a*(w+6),y:r.y+r.h*.38,w,h:r.h*.54}};
function drawRecall(){const s=M.r,g=A.ctx;backdrop('#bbf7d0',.4);
 FACTS.forEach((F,i)=>{const r=rowR(i),v=s.v[i],ok=v>=STRONG;plate(r,ok?'yes':s.bad===i?'no':'');label((ok?'✓ ':'')+F.e+' '+F.q,r.x+10,r.y+r.h*.2,12,{align:'left',room:r.w-20});
  meter(r.x+10,r.y+r.h*.56,r.w*.28,r.h*.2,v);
  if(ok)return label('warmed up',r.x+r.w*.72,r.y+r.h*.67,12,{ink:YES});
  if(s.open===i)F.opts.forEach((o,a)=>{const b=optR(i,a);plate(b,'lit');label(o,b.x+b.w/2,b.y+b.h/2,15,{room:b.w-6})});
  else [['🧠','from memory','lit'],['👀','peek','']].forEach(([e,t,m],a)=>{const b=actR(i,a);plate(b,m);label(e,b.x+b.w/2,b.y+b.h*.32,16);label(t,b.x+b.w/2,b.y+b.h*.72,12,{room:b.w-6})})});
 const all=s.v.every(v=>v>=STRONG);title(all?'All three warmed up':'Make every bar strong',all)}
function tryMemory(i){const s=M.r;if(s.v[i]>=STRONG)return;s.open=i;A.sound.tick();tell(`From memory first: ${FACTS[i].q} Pick your answer.`)}
function peek(i){const s=M.r;if(s.v[i]>=STRONG)return;s.open=-1;s.v[i]=Math.min(100,s.v[i]+GAIN.peek);s.bad=i;A.sound.miss();tell(`Peek: ${FACTS[i].a}. The bar only went up ${GAIN.peek}. `+slip('peek'))}
function pickAns(i,a){const s=M.r,F=FACTS[i];if(s.open!==i)return;s.open=-1;const got=F.opts[a]===F.a;s.v[i]=Math.min(100,s.v[i]+(got?GAIN.memory:GAIN.fixed));s.bad=-1;
 if(got){A.sound.pop();return tell(`Yes, ${F.a}! Pulling it from memory made the bar jump ${GAIN.memory}.`)}A.sound.miss();tell(`Not quite: it is ${F.a}. You tried, checked and fixed it, so the bar still went up ${GAIN.fixed}.`)}
/* ---------- 4. how long ---------- */
const track=()=>({x:A.W*.1,y:A.H*.56,w:A.W*.8});
const knobX=n=>{const t=track();return t.x+t.w*n/MAXQ};
function drawLength(){const s=M.l,g=A.ctx,t=track(),say=sizeSays(s.n);backdrop('#fbcfe8',.35);
 const bx=A.W*.06,bw=A.W*.88,by=A.H*.22,bh=A.H*.12,lw=bw*s.n/SESSION;g.fillStyle='#ede9fe';g.fillRect(bx,by,lw,bh);g.fillStyle='#d1fae5';g.fillRect(bx+lw,by,bw-lw,bh);g.lineWidth=2;g.strokeStyle=LINE;g.strokeRect(bx,by,bw,bh);
 if(lw>40)label('🔙 '+s.n+' min',bx+lw/2,by+bh/2,11,{room:lw-6});if(bw-lw>40)label('✨ new work '+(SESSION-s.n)+' min',bx+lw+(bw-lw)/2,by+bh/2,11,{room:bw-lw-6});
 label(`${SESSION}-minute practice`,A.W/2,by-12,11,{ink:A.col.tx});
 g.strokeStyle=LINE;g.lineWidth=6;g.lineCap='round';g.beginPath();g.moveTo(t.x,t.y);g.lineTo(t.x+t.w,t.y);g.stroke();g.lineCap='butt';
 for(let n=0;n<=MAXQ;n++){label(String(n),knobX(n),t.y+26,10,{ink:A.col.tx})}
 const kx=knobX(s.n);g.fillStyle=say.ok?'#d1fae5':'#ffffff';g.beginPath();g.arc(kx,t.y,22,0,7);g.fill();g.lineWidth=3;g.strokeStyle=say.ok?YES:LIT;g.stroke();label(String(s.n),kx,t.y,14);
 label('look-back questions',A.W/2,t.y+46,11,{ink:A.col.tx});
 const r={x:A.W*.05,y:A.H*.8,w:A.W*.9,h:A.H*.15};plate(r,s.held?'':say.ok?'yes':'no');const w=say.t.split(' '),h=Math.ceil(w.length/2);
 label((say.ok?'✓ ':'✗ ')+w.slice(0,h).join(' '),A.W/2,r.y+r.h*.32,12,{room:r.w-12});label(w.slice(h).join(' '),A.W/2,r.y+r.h*.7,12,{room:r.w-12});
 title(say.ok&&!s.held?'Just right':'How many look-back questions?',say.ok&&!s.held)}
function setN(n,quiet){const s=M.l;s.n=Math.max(0,Math.min(MAXQ,n));if(quiet)return A.redraw();const say=sizeSays(s.n);say.ok?A.sound.pop():A.sound.tick();tell(say.t)}
/* ---------- 5. today builds on yesterday ---------- */
const todayR=a=>{const w=(A.W*.84-12)/3;return{x:A.W*.08+a*(w+6),y:A.H*.38,w,h:A.H*.14}};
const whyR=i=>({x:A.W*.05,y:A.H*(.6+i*.13),w:A.W*.9,h:A.H*.11});
function drawBuild(){const s=M.b,g=A.ctx;backdrop('#fde68a',.4);
 const y={x:A.W*.15,y:A.H*.13,w:A.W*.7,h:A.H*.1};plate(y,'lit');label('🔙 Yesterday: 7 + 3 = 10 (warmed up)',A.W/2,y.y+y.h/2,12,{room:y.w-10});
 label('✨ Today: '+TODAY.q,A.W/2,A.H*.3,15,{ink:A.col.tx,room:A.W-20});
 TODAY.opts.forEach((o,a)=>{const b=todayR(a),right=o===TODAY.a;plate(b,s.ans&&right?'yes':s.badAns===o?'no':'');label((s.badAns===o?'✗ ':s.ans&&right?'✓ ':'')+o,b.x+b.w/2,b.y+b.h/2,16,{room:b.w-6})});
 if(s.ans)WHY.forEach((W,i)=>{const r=whyR(i);plate(r,s.why&&W.good?'yes':s.badWhy===W.k?'no':'');label((s.badWhy===W.k?'✗ ':s.why&&W.good?'✓ ':'')+W.t,A.W/2,r.y+r.h/2,12,{room:r.w-12})});
 title(s.why?'Yesterday helped today':s.ans?'Why did the look back help?':'Answer today’s question',!!s.why)}
function answerToday(o){const s=M.b;if(s.ans)return;if(o!==TODAY.a){s.badAns=o;A.sound.miss();return tell(o==='110'?'110 puts 1, 7 and 3 side by side. Think of yesterday: 7 + 3 = 10, so 17 + 3 = 20.':'Count on 3 from 17: 18, 19, 20. Or use yesterday: 7 + 3 = 10.')}
 s.ans=1;s.badAns='';A.sound.pop();tell(TODAY.link+' Now pick why the look back helped.')}
function pickWhy(k){const s=M.b,W=WHY.find(w=>w.k===k);if(!s.ans||s.why)return;if(!W.good){s.badWhy=k;A.sound.miss();return tell(W.why)}s.why=1;s.badWhy='';A.sound.pop();tell('Yes: '+W.t+'.')}
/* ---------- input ---------- */
function draw(){const k=part();if(k==='quiz'){backdrop('#c7d2fe',.35);title('Challenge',1);label('Look back · From memory · Short · Then new',A.W/2,A.H*.5,14,{ink:A.col.tx,room:A.W-20});return}
 ({night:drawNight,order:drawOrder,recall:drawRecall,length:drawLength,build:drawBuild})[k]();A.fx.draw(A.ctx)}
function down(p){const k=part();
 if(k==='night'){if(M.n.t<1&&Math.hypot(p.x-moonX(M.n.t),p.y-skyY())<44){M.n.drag=1;return true}return false}
 if(k==='order'){const i=BLOCKS.findIndex((B,j)=>!M.o.slot.includes(B.k)&&over(p,blockR(j)));if(i>=0){M.o.drag={i,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}
  const j=[0,1,2].findIndex(j=>over(p,slotR(j)));if(j>=0&&M.o.pick!=null)place(M.o.pick,j);return false}
 if(k==='recall'){for(let i=0;i<FACTS.length;i++){if(M.r.v[i]>=STRONG)continue;if(M.r.open===i){const a=[0,1,2].findIndex(a=>over(p,optR(i,a)));if(a>=0){pickAns(i,a);return false}}
   else{if(over(p,actR(i,0))){tryMemory(i);return false}if(over(p,actR(i,1))){peek(i);return false}}}return false}
 if(k==='length'){if(Math.abs(p.y-track().y)<40){M.l.held=1;setN(Math.round((p.x-track().x)/track().w*MAXQ),1);return true}return false}
 if(k==='build'){if(!M.b.ans){const a=[0,1,2].findIndex(a=>over(p,todayR(a)));if(a>=0)answerToday(TODAY.opts[a])}else{const i=WHY.findIndex((_,i)=>over(p,whyR(i)));if(i>=0)pickWhy(WHY[i].k)}return false}return false}
function move(p){const k=part();if(k==='night'&&M.n.drag)return nightTo((p.x-moonX(0))/(moonX(1)-moonX(0)));
 if(k==='order'&&M.o.drag){Object.assign(M.o.drag,{x:p.x,y:p.y});M.o.hover=[0,1,2].findIndex(j=>over(p,slotR(j)));A.redraw()}
 if(k==='length'&&M.l.held)setN(Math.round((p.x-track().x)/track().w*MAXQ),1)}
function up(p){const k=part();if(k==='night'){M.n.drag=0;return}
 if(k==='order'&&M.o.drag){const d=M.o.drag,j=[0,1,2].findIndex(j=>over(p,slotR(j)));if(j>=0)return place(d.i,j);M.o.drag=null;M.o.hover=-1;
  if(Math.hypot(p.x-d.x0,p.y-d.y0)<10){M.o.pick=d.i;return tell(`${BLOCKS[d.i].t} picked. Now tap a slot.`)}A.redraw()}
 if(k==='length'&&M.l.held){M.l.held=0;setN(M.l.n)}}
function reset(){epoch++;for(const k in M)delete M[k];Object.assign(M,{n:{t:0,v:FACTS.map(()=>100),drag:0},o:{slot:[null,null,null],bad:-1,hover:-1,pick:null,drag:null},
 r:{v:FACTS.map(F=>F.fade),open:-1,bad:-1},l:{n:0,held:0},b:{ans:0,why:0,badAns:'',badWhy:''},check:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttonRow();M.check()}
const settle=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(DONE[i]+A.reveal(i))};
function open(i,ok){reset();tell(DESC[i]);if(ok)M.check=settle(i,ok)}
function auto(i,acts,ms){steps[i].go();const g0=epoch;acts.forEach((f,j)=>setTimeout(()=>{if(g0===epoch)f()},ms*(j+1)))}
/* every canvas action has a labelled button twin */
function buttonRow(){if(!pad)return;pad.innerHTML='';const k=part(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='night'&&M.n.t<1)add('🌙 Pass the night',sleepAll);
 if(k==='order'){if(M.o.pick==null)BLOCKS.forEach((B,i)=>{if(!M.o.slot.includes(B.k))add(`${B.e} ${B.t}`,()=>{M.o.pick=i;tell(`${B.t} picked. Now choose a slot.`)})});
  else [0,1,2].forEach(j=>{if(!M.o.slot[j])add(`Slot ${j+1}`,()=>place(M.o.pick,j),`Put ${BLOCKS[M.o.pick].t} in slot ${j+1}`)})}
 if(k==='recall')FACTS.forEach((F,i)=>{if(M.r.v[i]>=STRONG)return;if(M.r.open===i)F.opts.forEach((o,a)=>add(`${F.e} ${o}`,()=>pickAns(i,a),`Answer ${F.q} with ${o}`));
  else{add(`🧠 ${F.e} from memory`,()=>tryMemory(i),`Try ${F.q} from memory`);add(`👀 ${F.e} peek`,()=>peek(i),`Peek at the answer to ${F.q}`)}});
 if(k==='length'){add('➖ One fewer',()=>setN(M.l.n-1));add('➕ One more',()=>setN(M.l.n+1))}
 if(k==='build'){if(!M.b.ans)TODAY.opts.forEach(o=>add(o,()=>answerToday(o),`17 + 3 = ${o}`));else if(!M.b.why)WHY.forEach(W=>add(W.t,()=>pickWhy(W.k)))}}
const steps=[
{h:'Overnight',p:'These are three things you learned yesterday. Drag the moon across the sky to sleep until morning. Watch the memory bars.',
 predict:{q:'After a night’s sleep, is yesterday’s work still just as easy to remember?',opts:['Yes, just as easy','No: some has faded, but it is still there'],ans:1},task:'Drag the moon to morning',
 show:()=>auto(0,[sleepAll],300),go:()=>open(0,()=>M.n.t>=1)},
{h:'Look back first',p:'Build today’s practice. Drag each block into a slot: what comes first?',task:'Fill the 3 slots',
 show:()=>auto(1,ORDER.map((k,j)=>()=>place(BLOCKS.findIndex(B=>B.k===k),j)),450),go:()=>open(1,()=>M.o.slot.every(Boolean))},
{h:'From memory first',p:'Three look-back questions. Try each one from memory, or peek. Get every bar to 80% or more.',
 predict:{q:'Which makes yesterday’s work stick better?',opts:['Peeking at the answer','Trying to remember it first'],ans:1},task:'Warm up all 3 bars',
 show:()=>auto(2,FACTS.flatMap((F,i)=>[()=>tryMemory(i),()=>pickAns(i,F.opts.indexOf(F.a))]),380),go:()=>open(2,()=>M.r.v.every(v=>v>=STRONG))},
{h:'Keep it short',p:'Practice time is 15 minutes. Drag the slider: how many look-back questions?',
 predict:{q:'Is a longer look back always better?',opts:['Yes, look back at everything','No, 2 or 3 questions is enough'],ans:1},task:'Set a just-right look back',
 show:()=>auto(3,[()=>setN(1),()=>setN(2),()=>setN(3)],420),go:()=>open(3,()=>sizeSays(M.l.n).ok&&!M.l.held)},
{h:'Today builds on it',p:'Here is today’s new question. Yesterday’s fact is warmed up. Answer it, then say why the look back helped.',task:'Answer and pick why',
 show:()=>auto(4,[()=>answerToday(TODAY.a),()=>pickWhy('wake')],480),go:()=>open(4,()=>!!M.b.why)},
{h:'Challenge',p:'',go:()=>{reset();nextQ()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>M.check()});
/* the feedback names the slip, so the learner knows what to change */
function slip(t){let m='Start with a short look back from memory, check it, then go on to new work.';
 if(t==='newfirst')m='New work first leaves yesterday cold. Start with 2 or 3 look-back questions, then the new work.';
 if(t==='peek')m='Peeking feels easy, but it hardly makes the memory stronger. Try from memory first, then check.';
 if(t==='reread')m='Reading it again feels easy but helps less. Shut the page and try to remember, then check.';
 if(t==='forgot')m='Forgetting overnight is normal for everyone. It is still in there, and a look back brings it back.';
 if(t==='wrongstop')m='A wrong answer is useful: check the right answer and fix it. That still makes the memory stronger.';
 if(t==='long')m='Keep it short: 2 or 3 questions, so most of the time is for new work.';
 if(t==='none')m='Skipping the look back leaves yesterday behind. Today’s work builds on it.';
 return m}
function nextQ(){round++;const Q=QS[round%QS.length],opts=[[Q.a,'ok'],...Q.o],r=round%3,list=opts.slice(r).concat(opts.slice(0,r));
 quizBox.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quizBox.querySelector('.fl-pick');list.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>judge(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function judge(t,a){quizBox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quizBox.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=nextQ;c.say(ok?'Yes.':slip(t))}
FK.shell(c,{steps,ratio:.62,tall:1.25,draw,onStep:X=>{quizBox.hidden=X.step!==5;pad.hidden=X.step===5;buttonRow()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Look back lab buttons'},w);quizBox=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttonRow()}}).start()})})();
