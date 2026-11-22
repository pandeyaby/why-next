/* Flagship – things I am good at and things I am practising (ages 6–7; PSHE Association KS1 health and wellbeing,
   EYFS ELG Self-Regulation: set and work towards simple goals). Scenes: sort Sam's six cards by the evidence into
   Good at it now or Still practising; find the thing each of four people (two of them grown-ups) is still
   practising; swap Sam's put-downs for practising words; pick the two small, clear goals for his goal board; then
   build your own board (2 good at, 1 practising) and choose kind words about it. Every drag or tap has a labelled
   button twin. Data and drawings in learn/strength_art.js. */
(()=>{const {box,inside,pen,SAM,FOLK,DOWN,KIND,GOALS,SKILLS,DESC,DONE,QS,star,sprout,kid}=STRN;
VIS.reg('flagstrength',c=>{let A,P,ctl,quiz,n=-1,epoch=0;
const K={ink:'#1f2937',ok:'#047857',ko:'#b91c1c',rim:'#64748b',sel:'#1d4ed8',bg:'#f0fdf4',good:'#fef3c7',prac:'#dcfce7',chip:'#e0e7ff',head:'#166534'};
const S={};const scene=()=>['sort','folk','talk','goal','me','quiz'][A.step];
/* ---------- where things are ---------- */
const area=(x,y,w,h)=>box(A.W*x,A.H*y,A.W*w,A.H*h);
const samCards=()=>P.cells(SAM.length,A.narrow?2:3,area(.03,.1,.94,.5));
const bin=k=>area(.03+k*.485,.64,.455,.25);
const panel=k=>P.cells(4,A.narrow?2:4,area(.03,.1,.94,.78),10)[k];
const chip=(k,j)=>{const b=panel(k),top=b.y+b.h*.34,h=(b.h*.64-8)/3;return box(b.x+6,top+j*(h+4),b.w-12,h)};
const bubble=()=>area(.32,.08,.65,.2);
const kindCard=j=>P.cells(KIND.length,A.narrow?2:3,area(.03,.4,.94,.48))[j];
const slot=j=>area(.36+j*.31,.1,.28,.22);
const goalCard=j=>P.cells(GOALS.length,A.narrow?2:3,area(.03,.4,.94,.48))[j];
const zone=k=>area(.03+k*.485,.08,.455,.3);
const skill=j=>P.cells(SKILLS.length,A.narrow?3:4,area(.03,.42,.94,.46),6)[j];
const words=j=>P.cells(3,A.narrow?1:3,area(.03,.42,.94,.46),8)[j];
const head=t=>P.text(t,A.W/2,A.H*.045,12,{c:K.head,w:A.W-20});
const status=(t,ok)=>P.text(t,A.W/2,A.H*.945,12,{b:700,c:ok?K.ok:K.ink,w:A.W-20});
const follow=(i,b)=>S.drag&&S.drag.i===i?box(S.drag.x-b.w/2,S.drag.y-b.h/2,b.w,b.h):b;
const lower=t=>t.toLowerCase();
/* ---------- scene 1: Sam's cards ---------- */
function paintSort(){const g=A.ctx,cs=samCards(),done=Object.keys(S.put).length;head('Good at it now, or still practising?');
 [0,1].forEach(k=>{const b=bin(k);P.card(b,k?K.prac:K.good,S.hot===k?'sel':'');(k?sprout:star)(g,b.x+b.w*.13,b.y+b.h*.32,Math.min(b.w*.1,b.h*.2));
  P.text(k?'Still practising':'Good at it now',b.x+b.w*.6,b.y+b.h*.3,12,{w:b.w*.66});
  const got=SAM.map((o,i)=>S.put[i]===k?o.sh:null).filter(Boolean);P.text(got.length?got.join(', '):'…',b.x+b.w/2,b.y+b.h*.72,10,{b:700,w:b.w-14})});
 SAM.forEach((o,i)=>{if(i in S.put)return;const b=follow(i,cs[i]);P.card(b,'#ffffff',S.wrong===i?'ko':(S.pick===i||(S.drag&&S.drag.i===i))?'sel':'');P.text(o.t,b.x+b.w/2,b.y+b.h/2,11,{w:b.w-12})});
 status(done>=6?'✓ All 6 cards sorted':`Sorted: ${done} of 6`,done>=6)}
function file(i,k){if(i in S.put)return;S.pick=-1;if(SAM[i].k!==k){S.wrong=i;A.sound.miss();return tell(why(k?'already':'notyet'))}
 S.wrong=-1;S.put[i]=k;A.sound.pop();tell(k?`${SAM[i].sh}: Sam can do it some of the time. He is still practising.`:`${SAM[i].sh}: Sam does it well. He is good at it, and it is fine to say so.`)}
/* ---------- scene 2: everyone has both ---------- */
function paintFolk(){const g=A.ctx;head('What is each person still practising?');
 FOLK.forEach((f,k)=>{const b=panel(k),got=S.found.includes(k);P.card(b,'#ffffff',got?'ok':'');kid(g,b.x+b.w*.22,b.y+b.h*.17,Math.min(b.h*.26,b.w*.35),f.c,got);
  P.text(f.n,b.x+b.w*.64,b.y+b.h*.17,12,{w:b.w*.6});
  f.s.forEach((t,j)=>{const q=chip(k,j),isP=j===f.p;P.card(q,got?(isP?K.prac:K.good):K.chip,S.miss&&S.miss[0]===k&&S.miss[1]===j?'ko':'');P.text((got?(isP?'🌱 ':'⭐ '):'')+t,q.x+q.w/2,q.y+q.h/2,10,{w:q.w-8})})});
 const m=S.found.length;status(m>=4?'✓ All 4 are practising something, even the grown-ups':`Found: ${m} of 4`,m>=4)}
function spot(k,j){if(S.found.includes(k))return;const f=FOLK[k];if(j!==f.p){S.miss=[k,j];A.sound.miss();return tell(why('goodat',f.n,f.s[j]))}
 S.miss=null;S.found.push(k);A.sound.pop();tell(`${f.n} is still practising: ${lower(f.s[j])}. ${f.n} is good at the other two.`+(S.found.length<4?' Next person.':' Nobody is good at everything.'))}
/* ---------- scene 3: kind words ---------- */
function paintTalk(){const g=A.ctx,i=S.fixed;head('Swap the put-down for kind words');kid(g,A.W*.16,A.H*.2,Math.min(A.W*.22,A.H*.26),'#c2410c',i>=3);P.text('Sam',A.W*.16,A.H*.35,11);
 const b=bubble();P.card(b,i>=3?K.prac:'#fee2e2',S.over?'sel':'');P.text(i>=3?'“I’m practising. I am getting better.”':DOWN[i].t,b.x+b.w/2,b.y+b.h/2,13,{w:b.w-14});
 if(i)P.text('Fixed: '+DOWN.slice(0,i).map(d=>d.sh).join(', '),A.W/2,A.H*.34,10,{b:700,c:K.ok,w:A.W-20});
 KIND.forEach((o,j)=>{if(o.f!=null&&o.f<i)return;const q=follow(j,kindCard(j));P.card(q,'#ffffff',S.oops===j?'ko':S.drag&&S.drag.i===j?'sel':'');P.text(o.t,q.x+q.w/2,q.y+q.h/2,11,{w:q.w-12})});
 status(i>=3?'✓ All 3 put-downs swapped':`Put-down ${i+1} of 3`,i>=3)}
function swap(j){const i=S.fixed;if(i>=3)return;const o=KIND[j];if(o.f==null){S.oops=j;A.sound.miss();return tell(why(o.s))}
 if(o.f!==i){S.oops=j;A.sound.miss();return tell(why('match',DOWN[o.f].sh,DOWN[i].sh))}
 S.oops=-1;S.fixed++;A.sound.pop();tell(`“${o.t}” Sam smiles and keeps going.`+(S.fixed<3?' Next put-down.':' Practising words help him try again.'))}
/* ---------- scene 4: goal board ---------- */
function paintGoal(){const g=A.ctx;head('Pick 2 good goals for Sam');kid(g,A.W*.17,A.H*.21,Math.min(A.W*.22,A.H*.26),'#c2410c',S.goals.length>=2);P.text('Sam’s goal board',A.W*.17,A.H*.36,10,{w:A.W*.3});
 [0,1].forEach(j=>{const b=slot(j),k=S.goals[j];P.card(b,k!=null?K.prac:'#ffffff',S.over&&k==null?'sel':k!=null?'ok':'');P.text(k!=null?'🎯 '+GOALS[k].t:'Goal '+(j+1),b.x+b.w/2,b.y+b.h/2,11,{w:b.w-10})});
 GOALS.forEach((o,j)=>{if(S.goals.includes(j))return;const q=follow(j,goalCard(j));P.card(q,'#ffffff',S.oops===j?'ko':S.drag&&S.drag.i===j?'sel':'');P.text(o.t,q.x+q.w/2,q.y+q.h/2,11,{w:q.w-12})});
 status(S.goals.length>=2?'✓ 2 small, clear goals':`Goals chosen: ${S.goals.length} of 2`,S.goals.length>=2)}
function aim(j){if(S.goals.includes(j)||S.goals.length>=2)return;const o=GOALS[j];if(!o.ok){S.oops=j;A.sound.miss();return tell(why(o.s))}
 S.oops=-1;S.goals.push(j);A.sound.pop();tell(`“${o.t}”: small, clear and up to Sam.`+(S.goals.length<2?' Find one more.':' Sam can practise this a little every day.'))}
/* ---------- scene 5: my board ---------- */
function paintMe(){const g=A.ctx,ready=S.good.length>=2&&S.prac.length>=1;head(ready&&!S.said?'Pick your words':'My board');
 [0,1].forEach(k=>{const b=zone(k),list=k?S.prac:S.good,cap=k?2:3;P.card(b,k?K.prac:K.good,S.hot===k?'sel':'');(k?sprout:star)(g,b.x+b.w*.14,b.y+b.h*.2,Math.min(b.w*.09,b.h*.14));
  P.text(k?'I’m practising':'I’m good at',b.x+b.w*.6,b.y+b.h*.2,12,{w:b.w*.66});
  for(let s=0;s<cap;s++){const r=box(b.x+8,b.y+b.h*(.38+s*.205),b.w-16,b.h*.18);P.card(r,'#ffffff','');P.text(list[s]!=null?SKILLS[list[s]]:'…',r.x+r.w/2,r.y+r.h/2,10,{b:700,w:r.w-8})}});
 if(ready&&!S.said){const X=lower(SKILLS[S.prac[0]]);mine(X).forEach((t,j)=>{const q=words(j);P.card(q,'#ffffff',S.oops===j?'ko':'');P.text(t,q.x+q.w/2,q.y+q.h/2,12,{w:q.w-12})})}
 else if(!S.said)SKILLS.forEach((t,j)=>{if(S.good.includes(j)||S.prac.includes(j))return;const q=follow(j,skill(j));P.card(q,K.chip,S.pick===j||(S.drag&&S.drag.i===j)?'sel':'');P.text(t,q.x+q.w/2,q.y+q.h/2,10,{w:q.w-6})});
 else P.text(`“I’m practising ${lower(SKILLS[S.prac[0]])}.”`,A.W/2,A.H*.62,15,{c:K.ok,w:A.W-30});
 status(S.said?'✓ Your board is done':ready?'Which words are kind and true?':`Good at: ${S.good.length} of 2 · Practising: ${S.prac.length} of 1`,S.said)}
const mine=X=>[`I’m practising ${X}.`,`I’m bad at ${X}.`,'I’m not good at anything.'];
function board(j,k){if(S.said||S.good.includes(j)||S.prac.includes(j))return;const list=k?S.prac:S.good;S.pick=-1;
 if(list.length>=(k?2:3)){A.sound.miss();return tell(k?'That box is full. You only need 1 thing you are practising.':'That box is full. Move on to I’m practising.')}
 list.push(j);A.sound.pop();const ready=S.good.length>=2&&S.prac.length>=1;tell(`${SKILLS[j]}: ${k?'a thing you are practising.':'a thing you are good at.'}`+(ready?' Now pick your words.':''))}
function speak(j){if(S.said)return;if(j){S.oops=j;A.sound.miss();return tell(why(j===1?'bad':'nothing'))}S.oops=-1;S.said=true;A.sound.pop();tell(`“I’m practising ${lower(SKILLS[S.prac[0]])}.” Kind and true.`)}
/* ---------- the slip, named ---------- */
function why(t,a,b){let m='Look again: can they do it well every time, or only some of the time?';
 if(t==='notyet')m='Sam can’t do this every time yet. That makes it a thing he is still practising, not a thing he is bad at.';
 if(t==='already')m='Sam can already do this well. That is a thing he is good at. Saying so is not showing off.';
 if(t==='goodat')m=`${a} can already do “${b}” well. Find the thing ${a} is still practising.`;
 if(t==='match')m=`Those kind words are about ${a}. Sam is talking about ${b} now.`;
 if(t==='giveup')m='“I give up” stops Sam practising. Pick words that help him keep going.';
 if(t==='compare')m='Other people are practising other things. Look at your own steps, not at everyone else.';
 if(t==='boast')m='Nobody is the best at everything, so that is not true. Say what you are practising.';
 if(t==='best')m='Being the best in the class is about beating others, and it is not up to Sam. Pick a goal about his own practice.';
 if(t==='never')m='Everyone drops a ball sometimes, even the best players. A goal of never is too hard to reach.';
 if(t==='vague')m='Get better at what, and how much? A good goal is clear, like “catch 5 in a row”.';
 if(t==='everything')m='That is far too big and too fast. Pick one small thing to practise.';
 if(t==='bad')m='Still practising is not the same as bad at it. Say “I’m practising”, so you keep trying.';
 if(t==='nothing')m='That is not true: you just put 2 things in I’m good at. Everyone is good at some things.';
 if(t==='showoff')m='Saying a true thing you are good at is not showing off. It is OK to know your strengths.';
 if(t==='grownup')m='Grown-ups are practising things too, like Dad with the guitar. Everyone is still learning something.';
 if(t==='nobody')m='Nobody is good at everything, and everybody is good at something.';
 if(t==='onlygrown')m='Children can know their strengths too. If it is true, it is OK to say it.';
 if(t==='kit')m='That is not true for anyone. Kit can name things Kit does well, like running or building.';
 if(t==='hide')m='Practising where others can see is fine. Everyone is learning something, so keep going.';
 if(t==='never2')m='Never is a big word. With practice, a thing you can’t do yet can get easier.';
 return m}
/* ---------- canvas, pointer, buttons ---------- */
function paint(){const k=scene(),g=A.ctx;g.fillStyle=K.bg;g.fillRect(0,0,A.W,A.H);
 if(k==='quiz'){star(g,A.W*.36,A.H*.4,A.H*.12);sprout(g,A.W*.64,A.H*.4,A.H*.12);P.text('Challenge',A.W/2,A.H*.7,20);return}
 ({sort:paintSort,folk:paintFolk,talk:paintTalk,goal:paintGoal,me:paintMe})[k]();A.fx.draw(g)}
function press(p){const k=scene(),hold=i=>{S.drag={i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true};
 if(k==='sort'){const i=samCards().findIndex((b,j)=>!(j in S.put)&&inside(p,b));if(i>=0)return hold(i);const z=[0,1].find(j=>inside(p,bin(j)));if(z!=null&&S.pick>=0)file(S.pick,z)}
 if(k==='folk')FOLK.forEach((f,q)=>f.s.forEach((_,j)=>{if(inside(p,chip(q,j)))spot(q,j)}));
 if(k==='talk'&&S.fixed<3){const j=KIND.findIndex((o,x)=>!(o.f!=null&&o.f<S.fixed)&&inside(p,kindCard(x)));if(j>=0)return hold(j)}
 if(k==='goal'&&S.goals.length<2){const j=GOALS.findIndex((_,x)=>!S.goals.includes(x)&&inside(p,goalCard(x)));if(j>=0)return hold(j)}
 if(k==='me'&&!S.said){if(S.good.length>=2&&S.prac.length>=1){const j=[0,1,2].find(x=>inside(p,words(x)));if(j!=null)speak(j);return false}
  const j=SKILLS.findIndex((_,x)=>!S.good.includes(x)&&!S.prac.includes(x)&&inside(p,skill(x)));if(j>=0)return hold(j);const z=[0,1].find(x=>inside(p,zone(x)));if(z!=null&&S.pick>=0)board(S.pick,z)}
 return false}
function drag(p){const d=S.drag;if(!d)return;d.x=p.x;d.y=p.y;const k=scene();
 if(k==='sort')S.hot=[0,1].find(j=>inside(p,bin(j)));if(k==='me')S.hot=[0,1].find(j=>inside(p,zone(j)));
 if(k==='talk')S.over=inside(p,bubble());if(k==='goal')S.over=inside(p,area(.34,.08,.64,.26));A.redraw()}
function drop(p){const d=S.drag;if(!d)return;S.drag=null;S.hot=undefined;S.over=false;const k=scene(),tap=Math.hypot(p.x-d.x0,p.y-d.y0)<=12;
 if(k==='sort'){const z=[0,1].find(j=>inside(p,bin(j)));if(z!=null)return file(d.i,z);if(tap){S.pick=d.i;return tell(`“${SAM[d.i].sh}” picked. Now tap Good at it now or Still practising.`)}}
 if(k==='talk'&&(tap||inside(p,bubble())))return swap(d.i);
 if(k==='goal'&&(tap||inside(p,area(.34,.08,.64,.26))))return aim(d.i);
 if(k==='me'){const z=[0,1].find(j=>inside(p,zone(j)));if(z!=null)return board(d.i,z);if(tap){S.pick=d.i;return tell(`${SKILLS[d.i]} picked. Now tap I’m good at or I’m practising.`)}}
 A.redraw()}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();twins();S.check()}
function twins(){if(!ctl)return;ctl.innerHTML='';const k=scene(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(k==='sort')SAM.forEach((o,i)=>{if(i in S.put)return;add(`Good at: ${o.sh}`,()=>file(i,0),`Put “${o.t}” in Good at it now`);add(`Practising: ${o.sh}`,()=>file(i,1),`Put “${o.t}” in Still practising`)});
 if(k==='folk')FOLK.forEach((f,q)=>{if(!S.found.includes(q))f.s.forEach((t,j)=>add(`${f.n}: ${t}`,()=>spot(q,j),`Is ${f.n} still practising ${lower(t)}?`))});
 if(k==='talk'&&S.fixed<3)KIND.forEach((o,j)=>{if(!(o.f!=null&&o.f<S.fixed))add(o.t,()=>swap(j),`Say instead: ${o.t}`)});
 if(k==='goal'&&S.goals.length<2)GOALS.forEach((o,j)=>{if(!S.goals.includes(j))add(o.t,()=>aim(j),`Goal for Sam: ${o.t}`)});
 if(k==='me'&&!S.said){if(S.good.length>=2&&S.prac.length>=1)mine(lower(SKILLS[S.prac[0]])).forEach((t,j)=>add(t,()=>speak(j),`Say: ${t}`));
  else SKILLS.forEach((t,j)=>{if(S.good.includes(j)||S.prac.includes(j))return;add(`Good at: ${t}`,()=>board(j,0),`I’m good at ${lower(t)}`);add(`Practising: ${t}`,()=>board(j,1),`I’m practising ${lower(t)}`)})}}
function fresh(){epoch++;for(const x in S)delete S[x];Object.assign(S,{put:{},wrong:-1,pick:-1,found:[],miss:null,fixed:0,oops:-1,goals:[],good:[],prac:[],said:false,drag:null,over:false,check:()=>{}})}
const finish=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(DONE[i]+A.reveal(i))};
function open(i,ok){fresh();tell(DESC[i]);S.check=finish(i,ok)}
function play(i,acts,ms){steps[i].go();const e=epoch;acts.forEach((f,j)=>setTimeout(()=>{if(e===epoch)f()},ms*(j+1)))}
const steps=[
{h:'Good at, or practising?',p:'Sam can do some things well every time. Some things he can do only some of the time. Drag each card to the right box.',
 predict:{q:'Sam is still practising swimming. Does that mean he is bad at swimming?',opts:['Yes, he is bad at it','No, he is still learning it'],ans:1},task:'Sort all 6 cards',
 show:()=>play(0,SAM.map((o,i)=>()=>file(i,o.k)),420),go:()=>open(0,()=>Object.keys(S.put).length>=6)},
{h:'Everyone has both',p:'Ava, Leo, Dad and Miss Khan are each good at two things. Tap the thing each one is still practising.',
 predict:{q:'Do grown-ups still practise things?',opts:['No, grown-ups are good at everything','Yes, everyone is practising something'],ans:1},task:'Find what all 4 are practising',
 show:()=>play(1,FOLK.map((f,q)=>()=>spot(q,f.p)),550),go:()=>open(1,()=>S.found.length>=4)},
{h:'Kind words',p:'When Sam finds something hard, he says mean things to himself. Drag the kind words that fix each put-down.',
 predict:{q:'Sam says, “I’m bad at catching.” Does saying that help him get better?',opts:['Yes, it is just being honest','No, it makes him want to stop'],ans:1},task:'Swap all 3 put-downs',
 show:()=>play(2,[0,2,4].map(j=>()=>swap(j)),700),go:()=>open(2,()=>S.fixed>=3)},
{h:'A good goal',p:'Sam wants to practise. A good goal is small and clear, and it is about his own practice. Drag 2 goals onto his board.',
 predict:{q:'Which goal helps Sam more?',opts:['Be the best in the class','Catch the ball 5 times in a row'],ans:1},task:'Put 2 good goals on the board',
 show:()=>play(3,[1,3].map(j=>()=>aim(j)),700),go:()=>open(3,()=>S.goals.length>=2)},
{h:'My board',p:'Your turn. What are you good at? What are you still practising? There are no wrong things here, only kind words.',task:'Make your board and pick your words',
 show:()=>play(4,[()=>board(0,0),()=>board(3,0),()=>board(10,1),()=>speak(0)],650),go:()=>open(4,()=>S.said)},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
function next(){n++;const Q=QS[n%QS.length],all=[[Q.a,''],...Q.o],r=n%3,order=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Pick an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=quiz.querySelector('.fl-pick');order.forEach(([t,s])=>{c.el('button',{type:'button',class:'lbtn'},g,t).onclick=()=>judge(s,Q)});c.say('Challenge: '+Q.q);A.redraw()}
function judge(s,Q){quiz.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=quiz.querySelector('.fl-fb'),m=s?why(s):'';
 if(s)A.sound.miss();else A.win();fb.innerHTML=(s?'✗ '+m:'✓ '+Q.a+(/[.”!?]$/.test(Q.a)?'':'.'))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next;c.say(s?m:'Yes.')}
FK.shell(c,{steps,ratio:.62,tall:1.3,draw:paint,onStep:X=>{quiz.hidden=X.step!==5;ctl.hidden=X.step===5;twins()},
 init:X=>{A=X;P=pen(A,K);const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Strengths lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down:press,move:drag,up:drop});twins()}}).start()})})();
