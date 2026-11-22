/* Flagship – one new thing at a time (ages 9–11; cognitive load theory, Sweller 1988 and Sweller, van Merriënboer and
   Paas 2019; isolated then combined elements, Pollock, Chandler and Sweller 2002; small steps, Rosenshine 2012; fluency,
   LaBerge and Samuels 1974). Scenes: tap the parts of Kai's page that are new and watch his thinking space fill; turn
   dials back to "known" until only the method he is learning is new, then try 5 sums; drag a flag to the first day he
   (then Zara) is ready to add the next new thing (right AND easy, not right but slow); build Mo's piano stairs so each
   stair adds one new thing; sort tasks into one new thing or too much new at once. Every drag or tap has a button twin.
   The thinking-space slots and the Try 5 scores are a picture of the idea, not measurements. Data in learn/onenew_art.js. */
(()=>{const {rect,hit,ink,PAGE,DIAL,TRY,LOGS,STAIR,CARDS,SORT,HELLO,GOT,ASK,head,flag,keys}=ONW;
VIS.reg('flagonenew',c=>{let A,P,bar,quiz,qi=-1,gen=0;
const K={ink:'#1f2937',ok:'#047857',ko:'#b91c1c',rim:'#64748b',sel:'#1d4ed8',nw:'#7c3aed',bg:'#f5f3ff',title:'#4c1d95',one:'#dcfce7',many:'#ffe4e6'};
const S={};const scene=()=>['spot','dial','ready','stairs','sort','quiz'][A.step];
const R=(x,y,w,h)=>rect(A.W*x,A.H*y,A.W*w,A.H*h);
const heading=t=>P.txt(t,A.W/2,A.H*.035,12,{c:K.title,w:A.W-20});
const status=(t,good)=>P.txt(t,A.W/2,A.H*.955,12,{b:700,c:good?K.ok:K.ink,w:A.W-20});
const carried=(i,r)=>S.hold&&S.hold.i===i?rect(S.hold.x-r.w/2,S.hold.y-r.h/2,r.w,r.h):r;
const newCount=()=>DIAL.filter((d,j)=>S.dial[j]).length;
/* ---------- 1: spot the new parts ---------- */
const pageTile=i=>P.grid(PAGE.length,2,R(.04,.38,.92,.48))[i];
function drawSpot(){const g=A.ctx,n=S.found.length;heading(n>=3?'Kai’s thinking space is full':'What is new for Kai?');
 head(g,A.W*.5,A.H*.2,Math.min(A.W*.13,A.H*.12),n,3);P.txt(n>=3?'Full: no room left to think':`Thinking space: ${n} of 3 used`,A.W/2,A.H*.335,10,{c:n>=3?K.ko:K.title});
 PAGE.forEach((o,i)=>{const r=pageTile(i),on=S.found.includes(i);P.tile(r,on?'#ede9fe':'#ffffff',S.miss===i?'ko':on?'new':'');P.txt((on?'NEW: ':'')+o.t,r.x+r.w/2,r.y+r.h/2,10,{w:r.w-10})});
 status(n>=3?'✓ 3 new things at once: too much':`New parts found: ${n} of 3`,n>=3)}
function spot(i){if(S.found.includes(i)||S.found.length>=3)return;const o=PAGE[i];if(!o.n){S.miss=i;A.sound.miss();return tell(slip('known')+` (“${o.t}”)`)}
 S.miss=-1;S.found.push(i);A.sound.pop();const n=S.found.length;
 tell(`“${o.t}” is new for Kai. `+(n<3?`${n} of his 3 thinking slots ${n===1?'is':'are'} busy.`:'All 3 slots are busy. There is no room left to think about exchanging.'))}
/* ---------- 2: turn the dials ---------- */
const dialRow=j=>R(.04,.09+j*.135,.92,.115),tryBtn=()=>R(.3,.66,.4,.085);
function drawDial(){const g=A.ctx,n=newCount();heading('Only one new thing');
 DIAL.forEach((d,j)=>{const r=dialRow(j),isNew=S.dial[j];P.tile(r,'#ffffff',S.miss===j?'ko':'');P.txt(d.k,r.x+r.w*.13,r.y+r.h/2,11,{c:K.title});
  const L=rect(r.x+r.w*.27,r.y+5,r.w*.34,r.h-10),Rr=rect(r.x+r.w*.63,r.y+5,r.w*.34,r.h-10);
  P.tile(L,isNew?'#ede9fe':'#f8fafc',isNew?'new':'');P.txt('New: '+d.nw,L.x+L.w/2,L.y+L.h/2,9,{w:L.w-6,c:isNew?K.nw:K.rim,b:isNew?800:600});
  P.tile(Rr,!isNew?'#dcfce7':'#f8fafc',!isNew?'ok':'');P.txt(d.goal?'(this is the goal)':'Known: '+d.old,Rr.x+Rr.w/2,Rr.y+Rr.h/2,9,{w:Rr.w-6,c:!isNew?K.ok:K.rim,b:!isNew?800:600})});
 const t=tryBtn();P.tile(t,'#e0e7ff','sel');P.txt(`Try 5 sums (${n} new)`,t.x+t.w/2,t.y+t.h/2,11,{c:K.sel,w:t.w-6});
 if(S.score!=null){const w=Math.min(A.W*.11,40);for(let k=0;k<5;k++){const x=A.W/2+(k-2)*w*1.15,y=A.H*.83;P.tile(rect(x-w/2,y-w/2,w,w),k<S.score?'#d1fae5':'#fee2e2',k<S.score?'ok':'ko');P.txt(k<S.score?'✓':'✗',x,y,13,{c:k<S.score?K.ok:K.ko})}}
 status(S.won?'✓ One new thing: 5 of 5':S.score!=null?`${S.score} of 5 right with ${S.tried} new things`:`New things on the page: ${n}`,S.won)}
function turn(j){if(S.won)return;const d=DIAL[j];if(d.goal){S.miss=j;A.sound.miss();return tell(slip('goal'))}
 S.miss=-1;S.dial[j]=S.dial[j]?0:1;S.score=null;A.sound.tick();tell(`${d.k}: ${S.dial[j]?'new ('+d.nw+')':'known ('+d.old+')'}. New things on the page: ${newCount()}.`)}
function trial(){if(S.won)return;const n=newCount();S.score=TRY[n];S.tried=n;
 if(n>1){A.sound.miss();return tell(`${TRY[n]} of 5 right. `+slip('many'))}
 S.won=1;A.sound.pop();tell('5 of 5 right. Only exchanging is new, so Kai can give it all his thinking.')}
/* ---------- 3: when is he ready? ---------- */
const dayCol=d=>R(.04+d*.188,.3,.165,.4),post=()=>({x:A.W*.12,y:A.H*.86});
function drawReady(){const g=A.ctx,L=LOGS[Math.min(S.who,1)];heading(S.who>=2?'Both flags placed':`${L.who} is learning: ${L.goal}`);
 if(S.who<2)P.txt(`When is ${L.who} ready to “${L.add.toLowerCase()}”?`,A.W/2,A.H*.15,11,{b:700,w:A.W-30});
 L.days.forEach(([sc,easy],d)=>{const r=dayCol(d),full=sc===L.of;P.tile(r,'#ffffff',S.who<2&&S.miss===d?'ko':S.who<2&&S.hot===d?'sel':'');
  P.txt('Day '+(d+1),r.x+r.w/2,r.y+r.h*.14,10,{c:K.title});P.txt(`${sc}/${L.of}`,r.x+r.w/2,r.y+r.h*.4,14,{c:full?K.ok:K.ko});
  P.txt(full?'all right':'some wrong',r.x+r.w/2,r.y+r.h*.6,9,{b:600,w:r.w-4});P.txt(easy?'easy':'slow',r.x+r.w/2,r.y+r.h*.8,10,{c:easy?K.ok:'#b45309'})});
 S.placed.forEach((d,w)=>{if(w===Math.min(S.who,1)||S.who>=2&&w===1){const r=dayCol(d);flag(g,r.x+r.w/2,r.y-2,Math.min(A.H*.08,34),'#16a34a')}});
 if(S.who<2){const p=S.hold?S.hold:post();flag(g,p.x,p.y+14,Math.min(A.H*.09,38),'#7c3aed');P.txt('Drag me',p.x+A.W*.16,p.y,10,{b:700,c:K.nw})}
 status(S.who>=2?'✓ Ready = all right AND easy':`Flags placed: ${S.who} of 2`,S.who>=2)}
function plant(d){if(S.who>=2)return;const L=LOGS[S.who],[sc,easy]=L.days[d];
 if(sc<L.of){S.miss=d;A.sound.miss();return tell(`Day ${d+1}: ${sc} of ${L.of}. `+slip('wrong'))}
 if(!easy){S.miss=d;A.sound.miss();return tell(`Day ${d+1}: all right, but slow. `+slip('slow'))}
 S.miss=-1;S.flag=0;S.placed[S.who]=d;A.sound.pop();const was=L.who;S.who++;
 tell(`Day ${d+1}: all right and easy. ${was} is ready to ${L.add.toLowerCase()}.`+(S.who<2?' Now Zara: she is learning the 7 times table.':''))}
/* ---------- 4: Mo's piano stairs ---------- */
const step=i=>{const h=A.H*.09;return rect(A.W*(.04+i*.13),A.H*.88-(i+1)*h,A.W*.5,h-3)},pool=i=>P.grid(CARDS.length,A.narrow?2:3,R(.04,.08,.92,.3))[i];
function drawStairs(){const g=A.ctx,n=S.stair.length;heading('Mo’s new piano tune');keys(g,R(.55,.42,.4,.07));
 STAIR.forEach((_,i)=>{const r=step(i),who=S.stair[i];P.tile(r,who!=null?'#ede9fe':i===n&&S.hot?'#e0e7ff':'#f1f5f9',who!=null?'new':i===n?'sel':'');
  P.txt(who!=null?CARDS[who].t:`Stair ${i+1}`,r.x+r.w/2,r.y+r.h/2,10,{w:r.w-6,b:who!=null?800:600,c:who!=null?K.ink:K.rim})});
 CARDS.forEach((o,i)=>{if(S.stair.includes(i))return;const r=carried(i,pool(i));P.tile(r,'#ffffff',S.miss===i?'ko':(S.aim===i||(S.hold&&S.hold.i===i))?'sel':'');P.txt(o.t,r.x+r.w/2,r.y+r.h/2,10,{w:r.w-8})});
 status(n>=4?'✓ 4 stairs, one new thing each':`Stairs built: ${n} of 4`,n>=4)}
function climb(i){const n=S.stair.length;if(n>=4||S.stair.includes(i))return;S.aim=-1;const o=CARDS[i];
 if(o.r!==STAIR[n]){S.miss=i;A.sound.miss();return tell(slip(o.s))}
 S.miss=-1;S.stair.push(i);A.sound.pop();tell(`Stair ${n+1}: ${o.t}.`+(n===0?' Start with one new thing.':n+1<4?' One new thing more than the stair below.':' Mo reached full speed one new thing at a time.'))}
/* ---------- 5: sort ---------- */
const sortCard=j=>P.grid(SORT.length,A.narrow?2:4,R(.03,.08,.94,.54))[j],box=k=>R(.03+k*.485,.66,.455,.24);
function drawSort(){const n=Object.keys(S.sorted).length;heading('One new thing, or too much at once?');
 [0,1].forEach(k=>{const b=box(k);P.tile(b,k?K.many:K.one,S.hot===k?'sel':'');P.txt(k?'Too much new at once':'One new thing',b.x+b.w/2,b.y+b.h*.22,11,{w:b.w-10});
  const got=SORT.filter((o,i)=>S.sorted[i]===k).length;P.txt(got?'✓'.repeat(got):'…',b.x+b.w/2,b.y+b.h*.62,12,{c:k?K.ko:K.ok})});
 SORT.forEach((o,i)=>{if(i in S.sorted)return;const r=carried(i,sortCard(i));P.tile(r,'#ffffff',S.miss===i?'ko':(S.aim===i||(S.hold&&S.hold.i===i))?'sel':'');P.txt(o.t,r.x+r.w/2,r.y+r.h/2,9,{w:r.w-8})});
 status(n>=8?'✓ All 8 sorted':`Sorted: ${n} of 8`,n>=8)}
function file(i,k){if(i in S.sorted)return;S.aim=-1;const o=SORT[i];if(o.k!==k){S.miss=i;A.sound.miss();return tell(slip(o.s))}
 S.miss=-1;S.sorted[i]=k;A.sound.pop();tell(`“${o.t}”: ${k?'too much new at once':'one new thing'}.`)}
/* ---------- the slip, named ---------- */
function slip(t){let m='Count the new things. Keep one new and the rest easy.';
 if(t==='known')m='Kai already knows that, so it takes almost no thinking space. Look for things he has never done.';
 if(t==='goal')m='Exchanging is what Kai is learning, so it must stay new. Make the other parts easy instead.';
 if(t==='many')m='More than one thing is new, so his thinking space overflows and mistakes creep in. Turn more dials to known.';
 if(t==='wrong')m='Some are still wrong, so the new skill is not secure yet. Keep practising this one thing.';
 if(t==='slow')m='Right but slow means it still takes all the thinking space. Wait until it is right AND easy.';
 if(t==='both')m='Both hands together is two new parts at once. Learn each hand on its own first.';
 if(t==='speed')m='Full speed adds a new thing on top of both hands. Get both hands right slowly first.';
 if(t==='jump')m='That changes 3 things at once: both hands, speed and a new ending. One stair adds one new thing.';
 if(t==='s1'||t==='s5'||t==='s7')m='Only one part is new and the rest is known. That is one new thing.';
 if(t==='s3')m='The stroke is new, but the shallow end keeps everything else safe and easy. One new thing.';
 if(t==='s2'||t==='s6')m='Count them: more than one new thing on the same day. That is too much at once.';
 if(t==='s4')m='The game is new AND the language is new. Two new things at once is too much.';
 if(t==='s8')m='Cooking alone is new and the recipe is new. Try the new recipe with a grown-up first.';
 if(t==='more')m='More new things at once crowd your thinking space. You learn faster one at a time.';
 if(t==='effort')m='Trying hard does not make the thinking space bigger. Cut what is new instead.';
 if(t==='stuck')m='Easy means ready for the next step, not done for ever. Add the next new thing.';
 if(t==='avoid')m='Too much is a reason to cut it down, not to give up. Start with one rule.';
 if(t==='babyish')m='Easy numbers are not babyish. They leave room to learn the new method.';
 return m}
/* ---------- canvas, pointer, buttons ---------- */
function draw(){const k=scene(),g=A.ctx;g.fillStyle=K.bg;g.fillRect(0,0,A.W,A.H);
 if(k==='quiz'){head(g,A.W*.5,A.H*.36,A.H*.14,1,3);P.txt('Challenge',A.W/2,A.H*.72,20);return}
 ({spot:drawSpot,dial:drawDial,ready:drawReady,stairs:drawStairs,sort:drawSort})[k]();A.fx.draw(g)}
function down(p){const k=scene(),grab=i=>{S.hold={i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true};
 if(k==='spot'){const i=PAGE.findIndex((_,j)=>hit(p,pageTile(j)));if(i>=0)spot(i);return false}
 if(k==='dial'){const j=DIAL.findIndex((_,x)=>hit(p,dialRow(x)));if(j>=0)turn(j);else if(hit(p,tryBtn()))trial();return false}
 if(k==='ready'&&S.who<2){const q=post();if(Math.hypot(p.x-q.x,p.y-q.y)<A.H*.09)return grab(-1);const d=[0,1,2,3,4].find(x=>hit(p,dayCol(x)));if(d!=null&&S.flag)plant(d);return false}
 if(k==='stairs'){const i=CARDS.findIndex((_,x)=>!S.stair.includes(x)&&hit(p,pool(x)));if(i>=0)return grab(i);if(S.aim>=0&&STAIR.some((_,x)=>hit(p,step(x))))climb(S.aim)}
 if(k==='sort'){const i=SORT.findIndex((_,x)=>!(x in S.sorted)&&hit(p,sortCard(x)));if(i>=0)return grab(i);const z=[0,1].find(x=>hit(p,box(x)));if(z!=null&&S.aim>=0)file(S.aim,z)}
 return false}
function move(p){const h=S.hold;if(!h)return;h.x=p.x;h.y=p.y;const k=scene();
 if(k==='ready'){const d=[0,1,2,3,4].find(x=>hit(p,dayCol(x)));S.hot=d}
 if(k==='stairs')S.hot=STAIR.some((_,x)=>hit(p,step(x)));if(k==='sort')S.hot=[0,1].find(x=>hit(p,box(x)));A.redraw()}
function up(p){const h=S.hold;if(!h)return;S.hold=null;const k=scene(),hot=S.hot;S.hot=undefined;const tap=Math.hypot(p.x-h.x0,p.y-h.y0)<=12;
 if(k==='ready'){const d=[0,1,2,3,4].find(x=>hit(p,dayCol(x)));if(d!=null)return plant(d);if(tap){S.flag=1;return tell('Flag picked up. Now tap a day.')}}
 if(k==='stairs'){if(STAIR.some((_,x)=>hit(p,step(x))))return climb(h.i);if(tap){S.aim=h.i;return tell(`“${CARDS[h.i].t}” picked. Now tap the stairs.`)}}
 if(k==='sort'){const z=[0,1].find(x=>hit(p,box(x)));if(z!=null)return file(h.i,z);if(tap){S.aim=h.i;return tell(`“${SORT[h.i].t}” picked. Now tap a box.`)}}
 A.redraw()}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.check()}
function buttons(){if(!bar)return;bar.innerHTML='';const k=scene(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},bar,t).onclick=f};
 if(k==='spot'&&S.found.length<3)PAGE.forEach((o,i)=>{if(!S.found.includes(i))b(`New? ${o.t}`,()=>spot(i),`Mark “${o.t}” as new for Kai`)});
 if(k==='dial'&&!S.won){DIAL.forEach((d,j)=>b(`${d.k}: make ${S.dial[j]?'known':'new'}`,()=>turn(j),`Switch ${d.k} to ${S.dial[j]?'known':'new'}`));b('Try 5 sums',trial,'Try 5 sums with this page')}
 if(k==='ready'&&S.who<2)LOGS[S.who].days.forEach((_,d)=>b(`Flag day ${d+1}`,()=>plant(d),`Put the ready flag on day ${d+1} for ${LOGS[S.who].who}`));
 if(k==='stairs'&&S.stair.length<4)CARDS.forEach((o,i)=>{if(!S.stair.includes(i))b(`Next stair: ${o.t}`,()=>climb(i),`Put “${o.t}” on stair ${S.stair.length+1}`)});
 if(k==='sort')SORT.forEach((o,i)=>{if(i in S.sorted)return;b(`One new: ${o.t}`,()=>file(i,0),`“${o.t}” is one new thing`);b(`Too much: ${o.t}`,()=>file(i,1),`“${o.t}” is too much new at once`)})}
function reset(){gen++;for(const x in S)delete S[x];Object.assign(S,{found:[],dial:[1,1,1,1],score:null,tried:0,won:0,who:0,placed:[],stair:[],sorted:{},miss:-1,aim:-1,flag:0,hold:null,check:()=>{}})}
const finished=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(GOT[i]+A.reveal(i))};
function open(i,ok){reset();tell(HELLO[i]);S.check=finished(i,ok)}
function play(i,acts,ms){steps[i].go();const e=gen;acts.forEach((f,j)=>setTimeout(()=>{if(e===gen)f()},ms*(j+1)))}
const steps=[
{h:'Spot what is new',p:'Kai can take away 2-digit numbers. His teacher gives him a page to learn exchanging. Some parts he knows. Some are new.',
 predict:{q:'Kai’s page has 3 new things at once. Will he learn exchanging faster?',opts:['Yes: more new things, more learning','No: too much new at once crowds his thinking'],ans:1},task:'Find the 3 new things',
 show:()=>play(0,[()=>spot(0),()=>spot(2),()=>spot(4)],600),go:()=>open(0,()=>S.found.length>=3)},
{h:'Strip it back',p:'Exchanging is what Kai is learning. Make everything else on the page something he already knows.',task:'Leave one new thing, then try 5',
 show:()=>play(1,[()=>turn(1),()=>turn(2),()=>turn(3),trial],600),go:()=>open(1,()=>S.won)},
{h:'Ready for the next new thing?',p:'Kai practised exchanging for 5 days. Each day shows his score and how it felt. Then Zara’s 7 times table.',
 predict:{q:'Day 3: Kai got 5 out of 5, but slowly. Is he ready to add 4-digit numbers?',opts:['Yes: all right means ready','Not yet: wait until it is right and easy'],ans:1},task:'Flag the ready day for Kai and Zara',
 show:()=>play(2,[()=>plant(3),()=>plant(4)],800),go:()=>open(2,()=>S.who>=2)},
{h:'One stair at a time',p:'Mo is learning a new piano tune. Each stair should add just one new thing to the stair below.',
 predict:{q:'What should Mo practise first?',opts:['Both hands at full speed, to get used to it','One hand alone, slowly'],ans:1},task:'Build all 4 stairs',
 show:()=>play(3,[()=>climb(0),()=>climb(2),()=>climb(3),()=>climb(1)],650),go:()=>open(3,()=>S.stair.length>=4)},
{h:'Sort the plans',p:'Each card is a way to learn something new. Is it one new thing, or too much new at once?',task:'Sort all 8 cards',
 show:()=>play(4,SORT.map((o,i)=>()=>file(i,o.k)),420),go:()=>open(4,()=>Object.keys(S.sorted).length>=8)},
{h:'Challenge',p:'',go:()=>{reset();pose()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
function pose(){qi++;const X=ASK[qi%ASK.length],all=[[X.a,''],...X.o],r=qi%3,order=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${X.q}</b></p><div class="fl-pick" role="group" aria-label="Pick an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=quiz.querySelector('.fl-pick');order.forEach(([t,s])=>{c.el('button',{type:'button',class:'lbtn'},g,t).onclick=()=>mark(s,X)});c.say('Challenge: '+X.q);A.cv.setAttribute('aria-label','Challenge: '+X.q);A.redraw()}
function mark(s,X){quiz.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=quiz.querySelector('.fl-fb'),m=s?slip(s):'';
 if(s)A.sound.miss();else A.win();fb.innerHTML=(s?'✗ '+m:'✓ '+X.a+'.')+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=pose;c.say(s?m:'Yes.')}
FK.shell(c,{steps,ratio:.62,tall:1.3,draw,onStep:X=>{quiz.hidden=X.step!==5;bar.hidden=X.step===5;buttons()},
 init:X=>{A=X;P=ink(A,K);const w=c.el('div',{class:'fl-below'},A.below);bar=c.el('div',{class:'fl-ctl',role:'group','aria-label':'One new thing lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}}).start()})})();
