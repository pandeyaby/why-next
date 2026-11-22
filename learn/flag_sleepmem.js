/* Flagship – sleep helps learning (ages 8–9; Diekelmann and Born 2010, Wilhelm et al. 2013, Sadeh et al. 2003,
   AASM 2016 sleep hours, NHS screens advice). Scenes: drag the moon across the night and watch the day's practice move
   from the desk to the memory shelf; run Ava's and Ben's nights side by side (Ben did the same page again until 10:30);
   count back from waking to set a bedtime that gives 9 to 12 hours; sort habits that help learning stick; plan an evening
   with practice done and screens off before lights out. Every drag or tap has a labelled button twin.
   The shelf is a picture of the idea (sleep helps memories last), not a measurement. Data in learn/sleepmem_art.js. */
(()=>{const {box,inside,pen,clock,hrs,TODAY,WORDS,KIDS,WAKE,HAB,SLOT,JOBS,INTRO,WELL,QS,moon,sky,bed,shelf}=SLM;
VIS.reg('flagsleepmem',c=>{let A,Q,keys,pop,qn=-1,era=0;
const T={ink:'#1f2937',ok:'#047857',ko:'#b91c1c',rim:'#64748b',sel:'#1d4ed8',bg:'#eef2ff',head:'#312e81',help:'#dcfce7',way:'#ffe4e6'};
const N={};const room=()=>['night','pair','bedtime','habit','plan','quiz'][A.step];
const at=(x,y,w,h)=>box(A.W*x,A.H*y,A.W*w,A.H*h);
const top=t=>Q.say(t,A.W/2,A.H*.035,12,{c:T.head,w:A.W-20});
const foot=(t,ok)=>Q.say(t,A.W/2,A.H*.95,12,{b:700,c:ok?T.ok:T.ink,w:A.W-20});
const lifted=(i,b)=>N.drag&&N.drag.i===i?box(N.drag.x-b.w/2,N.drag.y-b.h/2,b.w,b.h):b;
/* ---------- the moon track (scenes 1 and 2): 8:30 pm to 7:00 am ---------- */
const track=()=>at(.05,.08,.9,.16),moonAt=()=>{const b=track(),r=Math.min(b.h*.32,A.W*.05);return{x:b.x+r+(b.w-2*r)*N.t,y:b.y+b.h*.5}};
const tOf=x=>{const b=track(),r=Math.min(b.h*.32,A.W*.05),t=(x-b.x-r)/(b.w-2*r);return t>.96?1:t},BED0=8.5,WAKE0=19,NIGHT=WAKE0-BED0,now=()=>BED0+N.t*NIGHT;
const stored=from=>Math.max(0,Math.floor((now()-from)/2+1e-9));
function drawTrack(){const g=A.ctx,b=track();sky(g,b,N.t);const m=moonAt();moon(g,m.x,m.y,Math.min(b.h*.32,A.W*.05));
 Q.say(clock(BED0),b.x+30,b.y+b.h+10,10,{c:T.ink});Q.say(clock(WAKE0),b.x+b.w-30,b.y+b.h+10,10,{c:T.ink});if(N.t>.18&&N.t<.82)Q.say(clock(Math.round(now()*2)/2),m.x,b.y+b.h+10,10,{c:T.head})}
/* ---------- 1: the night shift ---------- */
const desk=()=>at(.03,.52,.45,.36),store=()=>at(.52,.52,.45,.36);
function drawNight(){const g=A.ctx,k=Math.min(TODAY.length,stored(BED0));top(N.t>=1?'Morning!':'What does your brain do at night?');drawTrack();
 bed(g,A.W*.5,A.H*.42,Math.min(A.W*.32,A.H*.2),'#be185d',N.t>=1);
 const d=desk(),s=store();Q.card(d,'#ffffff','');Q.say('Today’s desk',d.x+d.w/2,d.y+14,11,{c:T.head});shelf(g,s);Q.say('Memory shelf',s.x+s.w/2,s.y+14,11,{c:'#92400e'});
 TODAY.forEach((t,i)=>{const inS=i<k,b=inS?s:d,q=box(b.x+8,b.y+30+i*(b.h-40)/4,b.w-16,(b.h-40)/4-5);Q.card(q,inS?'#fde68a':'#e0e7ff','');Q.say(t,q.x+q.w/2,q.y+q.h/2,10,{w:q.w-8})});
 foot(N.t>=1?`✓ ${k} of 4 stored while you slept`:`Stored so far: ${k} of 4`,N.t>=1)}
/* ---------- 2: Ava and Ben ---------- */
const lane=k=>at(.03,.3+k*.31,.94,.28);
function drawPair(){const g=A.ctx;top('Ava and Ben: whose shelf fills up?');drawTrack();
 KIDS.forEach((o,k)=>{const L=lane(k),n=Math.min(WORDS.length,stored(o.bed)),up=now()<o.bed;Q.card(L,'#ffffff','');
  bed(g,L.x+L.w*.13,L.y+L.h*.62,Math.min(L.w*.2,L.h*.6),o.c,now()<o.bed);Q.say(o.n,L.x+L.w*.13,L.y+L.h*.15,12,{c:o.c});Q.say(o.say,L.x+L.w*.62,L.y+L.h*.15,10,{b:600,w:L.w*.7});
  const sh=box(L.x+L.w*.28,L.y+L.h*.32,L.w*.69,L.h*.6);shelf(g,sh);Q.cells(WORDS.length,WORDS.length,box(sh.x+4,sh.y+4,sh.w-8,sh.h-14),4).forEach((q,i)=>{if(i<n){Q.card(q,'#fde68a','');Q.say(WORDS[i],q.x+q.w/2,q.y+q.h/2,9,{w:q.w-4})}});
  if(up&&N.t>0)Q.say('awake',L.x+L.w*.13,L.y+L.h*.92,9,{c:T.ko});if(N.t>=1)Q.say(`${hrs(WAKE0-o.bed)} hours asleep · ${n} of 5 stored`+(k?' · tired':' · fresh'),L.x+L.w*.62,L.y+L.h*.97,9,{b:700,c:k?T.ko:T.ok,w:L.w*.7})});
 foot(N.t>=1?'✓ Morning: Ava stored more, and Ben is tired':'Drag the moon to the morning',N.t>=1)}
function slide(t){const was=N.t;N.t=Math.max(N.t,Math.min(1,t));if(N.t===was)return;let msg='';
 if(room()==='night'){const k=Math.min(4,stored(BED0));if(k>N.k){N.k=k;A.sound.pop();msg=`${clock(Math.round(now()*2)/2)}: asleep, your brain stores “${TODAY[k-1]}” on the shelf.`+(k<4?'':' All 4 stored.')}}
 if(N.t>=1&&!N.end){N.end=1;msg=room()==='night'?'7:00 am. Everything you practised is on the shelf. Your brain worked all night.':'7:00 am. Ava slept 10½ hours and stored all 5 spellings. Ben did the same page again and slept 8½ hours: less time to store, and he feels tired.'}
 if(!msg&&room()==='pair'){const a=Math.min(5,stored(KIDS[0].bed)),z=Math.min(5,stored(KIDS[1].bed));if(a+z*10!==N.k){N.k=a+z*10;msg=`${clock(Math.round(now()*2)/2)}: Ava has stored ${a}, Ben has stored ${z}`+(now()<KIDS[1].bed?' (Ben is still awake).':'.')}}
 if(msg)return say(msg);
 A.redraw()}
/* ---------- 3: count back to a bedtime ---------- */
const BMIN=6,BMAX=12,rail=()=>at(.06,.5,.88,.1),bx=h=>{const r=rail();return r.x+r.w*(h-BMIN)/(BMAX-BMIN)};
function drawBed(){const g=A.ctx,r=rail(),i=Math.min(N.r,WAKE.length-1),w=WAKE[i],h=w-N.bed;top(N.r>=3?'3 good bedtimes':`Morning ${i+1} of 3: wake at ${clock(w)}`);
 Q.card(at(.06,.1,.88,.26),'#ffffff','');Q.say(`Wake up at ${clock(w)}`,A.W/2,A.H*.16,15,{c:T.head});Q.say(N.r>=3?'You counted back every time.':`Bedtime ${clock(N.bed)} → ${hrs(h)} hours of sleep`,A.W/2,A.H*.27,13,{c:h>=9&&h<=12?T.ok:T.ink,w:A.W*.8});
 g.fillStyle='#cbd5e1';g.fillRect(r.x,r.y+r.h*.4,r.w,r.h*.2);for(let t=BMIN;t<=BMAX;t+=.5){const x=bx(t);g.fillStyle=T.rim;g.fillRect(x-1,r.y+r.h*.25,2,r.h*(t%1?.25:.5));if(t%1===0)Q.say(clock(t).replace(':00',''),x,r.y+r.h*1.15,9,{b:600})}
 if(N.r<3){const x=N.drag?N.drag.x:bx(N.bed);g.save();g.fillStyle=N.bad===1?'#fee2e2':'#e0e7ff';g.strokeStyle=N.bad===1?T.ko:T.sel;g.lineWidth=2;A.paint.rrect(x-24,r.y-30,48,30,8);g.fill();g.stroke();g.restore();Q.say('Bed',x,r.y-15,11,{c:T.head})}
 Q.say(N.made.map((b,j)=>`✓ ${clock(b)} for ${clock(WAKE[j])}`).join('   '),A.W/2,A.H*.8,10,{b:700,c:T.ok,w:A.W-20});
 foot(N.r>=3?'✓ 3 of 3 mornings':`Mornings done: ${N.r} of 3`,N.r>=3)}
function nudge(d){if(N.r>=3)return;N.bed=Math.max(BMIN,Math.min(BMAX,N.bed+d));N.bad=0;say(`Bedtime ${clock(N.bed)}: ${hrs(WAKE[N.r]-N.bed)} hours of sleep. Tap Set when it looks right.`)}
function setBed(){if(N.r>=3)return;const h=WAKE[N.r]-N.bed;if(h<9){N.bad=1;A.sound.miss();return say(slip('short')+` ${clock(N.bed)} to ${clock(WAKE[N.r])} is only ${hrs(h)} hours.`)}
 if(h>12){N.bad=1;A.sound.miss();return say(slip('long'))}N.bad=0;N.made.push(N.bed);N.r++;A.sound.pop();say(`${hrs(h)} hours: that fits.`+(N.r<3?` Next morning: wake at ${clock(WAKE[N.r])}.`:''));N.bed=11}
/* ---------- 4: helps or gets in the way ---------- */
const habCard=j=>Q.cells(HAB.length,A.narrow?2:4,at(.03,.08,.94,.5))[j],tray=k=>at(.03+k*.485,.63,.455,.26);
function drawHabit(){const n=Object.keys(N.sorted).length;top('Helps learning stick, or gets in the way?');
 [0,1].forEach(k=>{const b=tray(k);Q.card(b,k?T.way:T.help,N.hot===k?'sel':'');Q.say(k?'Gets in the way':'Helps learning stick',b.x+b.w/2,b.y+b.h*.2,11,{w:b.w-10});
  Q.say(HAB.map((o,i)=>N.sorted[i]===k?'✓':null).filter(Boolean).join(' ')||'…',b.x+b.w/2,b.y+b.h*.62,12,{c:k?T.ko:T.ok})});
 HAB.forEach((o,i)=>{if(i in N.sorted)return;const q=lifted(i,habCard(i));Q.card(q,'#ffffff',N.bad===i?'ko':(N.aim===i||(N.drag&&N.drag.i===i))?'sel':'');Q.say(o.t,q.x+q.w/2,q.y+q.h/2,10,{w:q.w-10})});
 foot(n>=8?'✓ All 8 sorted':`Sorted: ${n} of 8`,n>=8)}
function judge(i,k){if(i in N.sorted)return;N.aim=-1;const o=HAB[i];if(o.k!==k){N.bad=i;A.sound.miss();return say(slip(o.s))}
 N.bad=-1;N.sorted[i]=k;A.sound.pop();say(`“${o.t}”: ${k?'gets in the way':'helps learning stick'}.`)}
/* ---------- 5: plan tonight ---------- */
const row=j=>at(.03,.08+j*.075,.6,.065),jobCard=j=>at(.67,.1+j*.15,.3,.12);
function drawPlan(){const n=Object.keys(N.when).length;top('Plan tonight');
 SLOT.forEach((s,j)=>{const b=row(j),who=Object.keys(N.when).find(x=>N.when[x]===j);Q.card(b,s.fix?'#e2e8f0':s.late?'#ffe4e6':'#ffffff',N.hot===j?'sel':N.bad===j+100?'ko':who!=null?'ok':'');
  Q.say(`${s.t}  ${s.fix||(who!=null?JOBS[who].t:s.late?'(after lights out)':'free')}`,b.x+b.w/2,b.y+b.h/2,10,{b:s.fix?600:800,w:b.w-10})});
 JOBS.forEach((o,i)=>{if(i in N.when)return;const q=lifted(i,jobCard(i));Q.card(q,o.screen?'#fef3c7':'#e0e7ff',N.bad===i?'ko':(N.aim===i||(N.drag&&N.drag.i===i))?'sel':'');Q.say(o.t,q.x+q.w/2,q.y+q.h/2,10,{w:q.w-8})});
 foot(n>=4?'✓ A plan that leaves time to sleep':`Placed: ${n} of 4`,n>=4)}
function put(i,j){if(i in N.when)return;N.aim=-1;const s=SLOT[j],o=JOBS[i];if(j==null){j=SLOT.findIndex((x,y)=>!x.fix&&!x.late&&!Object.values(N.when).includes(y)&&!(o.screen&&y===5));if(j<0){A.sound.miss();return say('No free time is left before lights out.')}return put(i,j)}
 if(s.fix){A.sound.miss();return say(`${s.t} is ${s.fix}. Pick a free time.`)}
 if(Object.values(N.when).includes(j)){A.sound.miss();return say(`${s.t} is taken. Pick another free time.`)}
 if(s.late){N.bad=j+100;A.sound.miss();return say(slip(o.screen?'screen':'afterlights'))}
 if(o.screen&&j===5){N.bad=j+100;A.sound.miss();return say(slip('screen'))}
 N.bad=-1;N.when[i]=j;A.sound.pop();say(`${o.t} at ${s.t}.`+(Object.keys(N.when).length>=4?' Everything is done before lights out.':''))}
/* ---------- each slip, named ---------- */
function slip(t){let m='Think about what sleep does: it stores what you practised.';
 if(t==='off')m='Your brain is busy at night. It stores what you practised in the day.';
 if(t==='school')m='Your brain stores your learning every night, school night or not.';
 if(t==='late')m='Doing the same page again late at night cuts your sleep, and sleep is when the brain stores it.';
 if(t==='screen')m='Screens and games keep your brain busy. Stop them an hour before lights out.';
 if(t==='skip')m='Skipping sleep leaves less time to store what you learned, and you wake up tired.';
 if(t==='waste')m='Sleep is not wasted. It is when your brain keeps what you learned.';
 if(t==='helps')m='Practise, then sleep is the best order. Sleep stores the practice.';
 if(t==='same')m='The same bedtime most nights helps you get enough sleep. That helps learning stick.';
 if(t==='check')m='A quick check in the morning shows what you kept. It helps learning stick.';
 if(t==='little')m='A little practice each day, with sleep in between, helps learning stick.';
 if(t==='short')m='Too late: that is under 9 hours. Count back from the time you wake up.';
 if(t==='long')m='That is over 12 hours. Most children your age need 9 to 12. Try a bit later.';
 if(t==='count')m='Count back 10 hours from 7:00 am: 10:00 pm gives only 9 hours. Bed at 9:00 pm gives 10.';
 if(t==='count2')m='11:00 pm to 7:00 am is only 8 hours. Count back 10 hours from 7:00 am: 9:00 pm.';
 if(t==='nopractise')m='Sleep stores practice. It does not replace it. You need both.';
 if(t==='afterlights')m='9:00 pm is after lights out. Finish practice in time for bed.';
 return m}
/* ---------- canvas, pointer, buttons ---------- */
function draw(){const k=room(),g=A.ctx;g.fillStyle=T.bg;g.fillRect(0,0,A.W,A.H);
 if(k==='quiz'){moon(g,A.W*.5,A.H*.36,A.H*.12);Q.say('Challenge',A.W/2,A.H*.72,20);return}
 ({night:drawNight,pair:drawPair,bedtime:drawBed,habit:drawHabit,plan:drawPlan})[k]();A.fx.draw(g)}
function down(p){const k=room(),hold=i=>{N.drag={i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true};
 if((k==='night'||k==='pair')&&N.t<1){const m=moonAt(),b=track();if(Math.hypot(p.x-m.x,p.y-m.y)<b.h*.6)return hold(-1);if(inside(p,b)){slide(tOf(p.x));return false}}
 if(k==='bedtime'&&N.r<3){const r=rail();if(inside(p,box(r.x-24,r.y-34,r.w+48,r.h+40)))return hold(-1)}
 if(k==='habit'){const i=HAB.findIndex((_,x)=>!(x in N.sorted)&&inside(p,habCard(x)));if(i>=0)return hold(i);const z=[0,1].find(x=>inside(p,tray(x)));if(z!=null&&N.aim>=0)judge(N.aim,z)}
 if(k==='plan'){const i=JOBS.findIndex((_,x)=>!(x in N.when)&&inside(p,jobCard(x)));if(i>=0)return hold(i);const z=SLOT.findIndex((_,x)=>inside(p,row(x)));if(z>=0&&N.aim>=0)put(N.aim,z)}
 return false}
function move(p){const h=N.drag;if(!h)return;h.x=p.x;h.y=p.y;const k=room();
 if(k==='night'||k==='pair')return slide(tOf(p.x))
 if(k==='bedtime'){const r=rail();h.x=Math.max(r.x,Math.min(r.x+r.w,p.x))}
 if(k==='habit')N.hot=[0,1].find(j=>inside(p,tray(j)));if(k==='plan'){const z=SLOT.findIndex((_,j)=>inside(p,row(j)));N.hot=z>=0?z:undefined}A.redraw()}
function up(p){const h=N.drag;if(!h)return;N.drag=null;N.hot=undefined;const k=room(),tap=Math.hypot(p.x-h.x0,p.y-h.y0)<=12;
 if(k==='night'||k==='pair')return A.redraw();
 if(k==='bedtime'){const r=rail();N.bed=Math.max(BMIN,Math.min(BMAX,Math.round((BMIN+(Math.max(r.x,Math.min(r.x+r.w,p.x))-r.x)/r.w*(BMAX-BMIN))*2)/2));return setBed()}
 if(k==='habit'){const z=[0,1].find(j=>inside(p,tray(j)));if(z!=null)return judge(h.i,z);if(tap){N.aim=h.i;return say(`“${HAB[h.i].t}” picked. Now tap a tray.`)}}
 if(k==='plan'){const z=SLOT.findIndex((_,j)=>inside(p,row(j)));if(z>=0)return put(h.i,z);if(tap){N.aim=h.i;return say(`“${JOBS[h.i].t}” picked. Now tap a time.`)}}
 A.redraw()}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();pads();N.check()}
function pads(){if(!keys)return;keys.innerHTML='';const k=room(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},keys,t).onclick=f};
 if((k==='night'||k==='pair')&&N.t<1){b('Moon on 2 hours',()=>slide(N.t+2/NIGHT),'Move the night on 2 hours');b('To morning',()=>slide(1),'Move the moon to 7:00 am')}
 if(k==='bedtime'&&N.r<3){b('Earlier',()=>nudge(-.5),'Bedtime 30 minutes earlier');b('Later',()=>nudge(.5),'Bedtime 30 minutes later');b('Set bedtime',setBed,'Set this bedtime')}
 if(k==='habit')HAB.forEach((o,i)=>{if(i in N.sorted)return;b(`Helps: ${o.t}`,()=>judge(i,0),`“${o.t}” helps learning stick`);b(`Gets in the way: ${o.t}`,()=>judge(i,1),`“${o.t}” gets in the way`)});
 if(k==='plan')JOBS.forEach((o,i)=>{if(i in N.when)return;SLOT.forEach((s,j)=>{if(!s.fix&&!Object.values(N.when).includes(j))b(`${o.sh} at ${s.t}`,()=>put(i,j),`${o.t} at ${s.t}`)})})}
function wipe(){era++;for(const x in N)delete N[x];Object.assign(N,{t:0,k:0,end:0,bed:11,r:0,made:[],sorted:{},when:{},bad:-1,aim:-1,drag:null,check:()=>{}})}
const passed=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(WELL[i]+A.reveal(i))};
function enter(i,ok){wipe();say(INTRO[i]);N.check=passed(i,ok)}
function auto(i,acts,ms){steps[i].go();const e=era;acts.forEach((f,j)=>setTimeout(()=>{if(e===era)f()},ms*(j+1)))}
const night=[1,2,3,4,5,6].map(j=>()=>slide(j*2/NIGHT>1?1:j*2/NIGHT));
const steps=[
{h:'The night shift',p:'You practised 4 things today. Now it is bedtime. What happens to them while you sleep?',
 predict:{q:'When you are asleep, is your brain switched off?',opts:['Yes, it rests and does nothing','No: it keeps working on what you practised'],ans:1},task:'Drag the moon to 7:00 am',
 show:()=>auto(0,night,450),go:()=>enter(0,()=>N.t>=1)},
{h:'Ava or Ben?',p:'Ava practised her 5 spellings, then went to bed at 8:30 pm. Ben practised the same 5, then did the same page again until 10:30 pm. Both wake at 7:00 am.',
 predict:{q:'Who will remember more spellings tomorrow?',opts:['Ben: he practised for longer','Ava: she slept for longer'],ans:1},task:'Drag the moon to the morning',
 show:()=>auto(1,night,450),go:()=>enter(1,()=>N.t>=1)},
{h:'Count back to bedtime',p:'Start at the time you wake up and count back. Most children aged 6 to 12 need 9 to 12 hours of sleep a night.',
 predict:{q:'You wake at 7:00 am. Is going to bed at 11:00 pm enough sleep?',opts:['Yes, that is plenty','No: that is only 8 hours'],ans:1},task:'Set a good bedtime for 3 mornings',
 show:()=>auto(2,[()=>{N.bed=8.5;setBed()},()=>{N.bed=8.5;setBed()},()=>{N.bed=8;setBed()}],800),go:()=>enter(2,()=>N.r>=3)},
{h:'What helps?',p:'Some habits help learning stick. Others get in the way. Sort them.',task:'Sort all 8 cards',
 show:()=>auto(3,HAB.map((o,i)=>()=>judge(i,o.k)),450),go:()=>enter(3,()=>Object.keys(N.sorted).length>=8)},
{h:'Plan tonight',p:'Fit practice, play, a tablet game and a story into tonight. Lights out is 8:30 pm.',
 predict:{q:'A tablet game ends right at lights out. Will you fall asleep just as fast?',opts:['Yes, games make you sleepy','No: screens can keep you awake'],ans:1},task:'Place all 4 things',
 show:()=>auto(4,[()=>put(1,0),()=>put(0,2),()=>put(2,3),()=>put(3,5)],700),go:()=>enter(4,()=>Object.keys(N.when).length>=4)},
{h:'Challenge',p:'',go:()=>{wipe();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>N.check()});
function ask(){qn++;const X=QS[qn%QS.length],all=[[X.a,''],...X.o],r=qn%3,order=all.slice(r).concat(all.slice(0,r));
 pop.innerHTML=`<p><b>${X.q}</b></p><div class="fl-pick" role="group" aria-label="Pick an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=pop.querySelector('.fl-pick');order.forEach(([t,s])=>{c.el('button',{type:'button',class:'lbtn'},g,t).onclick=()=>grade(s,X)});c.say('Challenge: '+X.q);A.cv.setAttribute('aria-label','Challenge: '+X.q);A.redraw()}
function grade(s,X){pop.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=pop.querySelector('.fl-fb'),m=s?slip(s):'';
 if(s)A.sound.miss();else A.win();fb.innerHTML=(s?'✗ '+m:'✓ '+X.a+'.')+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(s?m:'Yes.')}
FK.shell(c,{steps,ratio:.62,tall:1.3,draw,onStep:X=>{pop.hidden=X.step!==5;keys.hidden=X.step===5;pads()},
 init:X=>{A=X;Q=pen(A,T);const w=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Sleep lab buttons'},w);pop=c.el('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});pads()}}).start()})})();
