/* Flagship – news and pictures that worry me (ages 10–11; Childline and BBC Newsround advice on upsetting news;
   Holman, Garfin and Silver 2014 and Pfefferbaum et al. 2001 on repeated coverage and stress; AAP/APA family advice;
   Full Fact on old pictures reshared as new). Scenes: tap the signs of worry on Rami after a flood video; swipe an
   autoplay feed and watch the worry meter climb, then drag the phone to the table to stop it; build what Rami says to
   his dad (what I saw, how I feel, what I want to know) without pretending; match each "what if?" question to the fact
   a grown-up checks with him; sort what helps from what makes worry bigger. Every drag or tap has a button twin.
   The worry meter is a picture of the idea, not a measurement. Data and drawings in learn/newsw_art.js. */
(()=>{const {R,on,brush,SIGNS,FEED,TOP,GAP,BITS,QN,FACT,MOVES,START,LEARNT,QUIZ,kid,phone,gauge}=NWS;
VIS.reg('flagnewsworry',c=>{let A,B,ctl,chal,round=-1,epoch=0;
const C={ink:'#1f2937',ok:'#047857',ko:'#b91c1c',rim:'#64748b',sel:'#1d4ed8',warm:'#c2410c',bg:'#f0f9ff',hd:'#0c4a6e',help:'#dcfce7',big:'#ffe4e6'};
const W={};const part=()=>['signs','feed','say','facts','sort','quiz'][A.step];
const Z=(x,y,w,h)=>R(A.W*x,A.H*y,A.W*w,A.H*h);
const title=t=>B.line(t,A.W/2,A.H*.035,12,{c:C.hd,w:A.W-20});
const tally=(t,good)=>B.line(t,A.W/2,A.H*.955,12,{b:700,c:good?C.ok:C.ink,w:A.W-20});
const follow=(i,r)=>W.grip&&W.grip.i===i?R(W.grip.x-r.w/2,W.grip.y-r.h/2,r.w,r.h):r;
const chosen=i=>W.pick===i||(W.grip&&W.grip.i===i);
/* ---------- 1: signs of worry ---------- */
const sign=i=>B.lay(SIGNS.length,2,Z(.04,.4,.92,.46))[i];
function paintSigns(){const g=A.ctx,n=W.seen.length;title(n>=4?'That feeling is called worry':'How does Rami feel?');
 kid(g,A.W*.42,A.H*.33,Math.min(A.W*.36,A.H*.28),n);B.line(n?`Worry signs: ${n}`:'Just watched: flood news',A.W*.17,A.H*.2,10,{c:C.hd,w:A.W*.3});
 SIGNS.forEach((o,i)=>{const r=sign(i),got=W.seen.includes(i);B.chip(r,got?'#ffedd5':'#ffffff',W.bad===i?'ko':got?'hot':'');B.line((got?'Worry: ':'')+o.t,r.x+r.w/2,r.y+r.h/2,10,{w:r.w-10})});
 tally(n>=4?'✓ 4 signs of worry found':`Signs found: ${n} of 4`,n>=4)}
function notice(i){if(W.seen.includes(i)||W.seen.length>=4)return;const o=SIGNS[i];
 if(!o.w){W.bad=i;A.sound.miss();return speak(`“${o.t}” is not a sign of worry. Look for how the body and thoughts change after the video.`)}
 W.bad=-1;W.seen.push(i);A.sound.pop();speak(`“${o.t}”: a sign of worry.`+(W.seen.length>=4?' Rami can name it: “I feel worried.”':''))}
/* ---------- 2: the feed ---------- */
const handset=()=>Z(.1,.1,.46,.66),table=()=>Z(.08,.8,.56,.1),meter=()=>Z(.72,.14,.12,.62);
function paintFeed(){const g=A.ctx,ph=handset(),tb=table();title(W.down?'Phone down':'The videos keep coming');
 g.fillStyle='#d6b48a';g.fillRect(tb.x,tb.y,tb.w,tb.h);B.line(W.down?'':'Table: put the phone here',tb.x+tb.w/2,tb.y+tb.h/2,10,{c:'#451a03'});
 if(W.down)phone(g,tb,1);else{const r=W.grip&&!on(W.grip,ph)?R(W.grip.x-ph.w/2,W.grip.y-ph.h/2,ph.w,ph.h):ph;phone(g,r,0);const clip=FEED[Math.min(W.clip,FEED.length-1)];
  B.line(`Video ${W.clip+1}`,r.x+r.w/2,r.y+r.h*.15,10,{c:C.rim});B.line(clip.t,r.x+r.w/2,r.y+r.h*.45,12,{w:r.w-24});B.line('▲ swipe up for more',r.x+r.w/2,r.y+r.h*.82,9,{b:600,c:C.rim})}
 const m=meter();gauge(g,m,W.worry,TOP);B.line('Worry',m.x+m.w/2,m.y-10,10,{c:C.hd});B.line(W.down?'stopped growing':'growing',m.x+m.w/2,m.y+m.h+12,9,{b:700,c:W.down?C.ok:C.warm});
 tally(W.down?`✓ Stopped after ${W.clip+1} video${W.clip?'s':''}`:`Videos watched: ${W.clip+1}`,W.down)}
function swipe(){if(W.down)return;if(W.clip>=FEED.length-1){A.sound.miss();return speak(slip('more')+' Put the phone down.')}
 W.clip++;W.worry=Math.min(TOP,W.worry+FEED[W.clip].up);A.sound.tick();speak(`Video ${W.clip+1}: ${FEED[W.clip].t} → the worry meter goes up to ${W.worry}.`)}
function putDown(){if(W.down)return;W.down=1;A.sound.pop();
 speak(W.clip<1?'Phone down after 1 video: a good choice. Each extra video would have pushed the worry meter up. Talking to someone helps it shrink.':`Phone down after ${W.clip+1} videos. The worry stopped growing, but it is still there. Talking to someone helps it shrink.`)}
/* ---------- 3: say it ---------- */
const gapBox=j=>Z(.06,.1+j*.12,.88,.1),bit=i=>B.lay(BITS.length,2,Z(.04,.5,.92,.36))[i];
function paintSay(){const g=A.ctx,n=Object.keys(W.said).length;title(n>=3?'Dad: “Thank you for telling me.”':'Rami tells his dad');
 GAP.forEach((t,j)=>{const r=gapBox(j),who=Object.keys(W.said).find(i=>W.said[i]===j);B.chip(r,'#ffffff',who!=null?'ok':W.hot===j?'sel':'');
  B.line(t+' '+(who!=null?BITS[who].t:'_____'),r.x+r.w/2,r.y+r.h/2,11,{w:r.w-12,b:who!=null?800:600})});
 BITS.forEach((o,i)=>{if(i in W.said)return;const r=follow(i,bit(i));B.chip(r,'#e0f2fe',W.bad===i?'ko':chosen(i)?'sel':'');B.line(o.t,r.x+r.w/2,r.y+r.h/2,10,{w:r.w-10})});
 tally(n>=3?'✓ Said honestly: what, how, and a question':`Gaps filled: ${n} of 3`,n>=3)}
function fill(i,j){if(i in W.said)return;W.pick=-1;const o=BITS[i];if(o.s){W.bad=i;A.sound.miss();return speak(slip(o.s))}
 if(j==null)j=o.slot;if(Object.values(W.said).includes(j)){A.sound.miss();return speak('That gap is filled. Pick another gap.')}
 if(o.slot!==j){W.bad=i;A.sound.miss();return speak(`“${o.t}” fits a different gap. Read how each line starts.`)}
 W.bad=-1;W.said[i]=j;A.sound.pop();speak(`${GAP[j]} ${o.t}.`+(Object.keys(W.said).length>=3?' Dad says: “Thank you for telling me. Let’s look at it together.”':''))}
/* ---------- 4: check the facts ---------- */
const qBox=i=>Z(.04,.1+i*.2,.4,.16),fBox=k=>Z(.5,.1+k*.2,.46,.16);
function paintFacts(){const g=A.ctx,n=Object.keys(W.match).length;title('Checking facts with Dad');
 QN.forEach((q,i)=>{const r=i in W.match?qBox(i):follow(i,qBox(i));B.chip(r,'#fef3c7',i in W.match?'ok':W.bad===i?'ko':chosen(i)?'sel':'');B.line(q,r.x+r.w/2,r.y+r.h/2,11,{w:r.w-10})});
 FACT.forEach((f,k)=>{const r=fBox(k),done=W.match[f.q]===k;B.chip(r,'#ffffff',done?'ok':W.hot===k?'sel':'');B.line(f.t,r.x+r.w/2,r.y+r.h/2,10,{w:r.w-10,b:done?800:600})});
 g.strokeStyle=C.ok;g.lineWidth=2;Object.entries(W.match).forEach(([i,k])=>{const a=qBox(+i),b=fBox(k);g.beginPath();g.moveTo(a.x+a.w,a.y+a.h/2);g.lineTo(b.x,b.y+b.h/2);g.stroke()});
 tally(n>=4?'✓ Every “what if?” checked':`Questions answered: ${n} of 4`,n>=4)}
function link(i,k){if(i in W.match)return;W.pick=-1;const f=FACT[k];if(f.q!==i){W.bad=i;A.sound.miss();return speak(`That fact does not answer “${QN[i]}”. `+slip(['near','help','old','home'][i]))}
 W.bad=-1;W.match[i]=k;A.sound.pop();speak(`“${QN[i]}” ${f.t}.`)}
/* ---------- 5: sort ---------- */
const move=j=>B.lay(MOVES.length,A.narrow?2:4,Z(.03,.08,.94,.54))[j],tray=k=>Z(.03+k*.485,.66,.455,.24);
function paintSort(){const n=Object.keys(W.sorted).length;title('Helps, or makes the worry bigger?');
 [0,1].forEach(k=>{const b=tray(k);B.chip(b,k?C.big:C.help,W.hot===k?'sel':'');B.line(k?'Makes the worry bigger':'Helps',b.x+b.w/2,b.y+b.h*.22,11,{w:b.w-10});
  const got=MOVES.filter((o,i)=>W.sorted[i]===k).length;B.line(got?'✓'.repeat(got):'…',b.x+b.w/2,b.y+b.h*.62,12,{c:k?C.ko:C.ok})});
 MOVES.forEach((o,i)=>{if(i in W.sorted)return;const r=follow(i,move(i));B.chip(r,'#ffffff',W.bad===i?'ko':chosen(i)?'sel':'');B.line(o.t,r.x+r.w/2,r.y+r.h/2,10,{w:r.w-8})});
 tally(n>=8?'✓ All 8 sorted':`Sorted: ${n} of 8`,n>=8)}
function drop(i,k){if(i in W.sorted)return;W.pick=-1;const o=MOVES[i];if(o.k!==k){W.bad=i;A.sound.miss();return speak(slip(o.s))}
 W.bad=-1;W.sorted[i]=k;A.sound.pop();speak(`“${o.t}”: ${k?'makes the worry bigger':'helps'}.`)}
/* ---------- what went wrong, in words ---------- */
function slip(t){let m='Stop, tell a grown-up, check the facts, then do something calm.';
 if(t==='wrongfeel')m='Feeling worried after scary news is normal. It does not mean something is wrong with you.';
 if(t==='more')m='Watching more usually makes worry bigger, not smaller. Stop and talk to someone.';
 if(t==='pretend')m='You do not have to pretend you are fine. Saying “I feel worried” lets a grown-up help.';
 if(t==='secret')m='Worries are not secrets. Telling a grown-up you trust is the right thing to do.';
 if(t==='rumour')m='Comments and rumours are not facts. Check with a grown-up and a trusted news source.';
 if(t==='old')m='Old photos and videos are often shared again as if they are new. A grown-up can check the date.';
 if(t==='share')m='Sending a scary clip spreads the worry to someone younger. Tell a grown-up instead.';
 if(t==='bed')m='Looking for more pictures at bedtime keeps the worry going. Tell a grown-up and do something calm.';
 if(t==='close'||t==='tell'||t==='check'||t==='calm')m='This one helps: it stops the worry growing or helps it shrink.';
 if(t==='near')m='A map answers where it is.';if(t==='help')m='Look for the helpers: who is there to help?';if(t==='home')m='Think about what your family would do here.';
 return m}
/* ---------- canvas, pointer, buttons ---------- */
function draw(){const k=part(),g=A.ctx;g.fillStyle=C.bg;g.fillRect(0,0,A.W,A.H);
 if(k==='quiz'){kid(g,A.W*.5,A.H*.5,A.H*.32,0);B.line('Challenge',A.W/2,A.H*.78,20);return}
 ({signs:paintSigns,feed:paintFeed,say:paintSay,facts:paintFacts,sort:paintSort})[k]();A.fx.draw(g)}
function down(p){const k=part(),lift=i=>{W.grip={i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true};
 if(k==='signs'){const i=SIGNS.findIndex((_,j)=>on(p,sign(j)));if(i>=0)notice(i);return false}
 if(k==='feed'&&!W.down&&on(p,handset()))return lift(-1);
 if(k==='say'){const i=BITS.findIndex((_,j)=>!(j in W.said)&&on(p,bit(j)));if(i>=0)return lift(i);const j=GAP.findIndex((_,x)=>on(p,gapBox(x)));if(j>=0&&W.pick>=0)fill(W.pick,j)}
 if(k==='facts'){const i=QN.findIndex((_,j)=>!(j in W.match)&&on(p,qBox(j)));if(i>=0)return lift(i);const f=FACT.findIndex((_,x)=>on(p,fBox(x)));if(f>=0&&W.pick>=0)link(W.pick,f)}
 if(k==='sort'){const i=MOVES.findIndex((_,j)=>!(j in W.sorted)&&on(p,move(j)));if(i>=0)return lift(i);const z=[0,1].find(x=>on(p,tray(x)));if(z!=null&&W.pick>=0)drop(W.pick,z)}
 return false}
function drag(p){const h=W.grip;if(!h)return;h.x=p.x;h.y=p.y;const k=part();
 if(k==='say'){const j=GAP.findIndex((_,x)=>on(p,gapBox(x)));W.hot=j>=0?j:undefined}
 if(k==='facts'){const f=FACT.findIndex((_,x)=>on(p,fBox(x)));W.hot=f>=0?f:undefined}
 if(k==='sort')W.hot=[0,1].find(x=>on(p,tray(x)));A.redraw()}
function lift_end(p){const h=W.grip;if(!h)return;W.grip=null;W.hot=undefined;const k=part(),tap=Math.hypot(p.x-h.x0,p.y-h.y0)<=12;
 if(k==='feed'){if(on(p,table()))return putDown();if(h.y0-p.y>25||tap)return swipe();return A.redraw()}
 if(k==='say'){const j=GAP.findIndex((_,x)=>on(p,gapBox(x)));if(j>=0)return fill(h.i,j);if(tap){W.pick=h.i;return speak(`“${BITS[h.i].t}” picked. Now tap a gap.`)}}
 if(k==='facts'){const f=FACT.findIndex((_,x)=>on(p,fBox(x)));if(f>=0)return link(h.i,f);if(tap){W.pick=h.i;return speak(`“${QN[h.i]}” picked. Now tap the fact that answers it.`)}}
 if(k==='sort'){const z=[0,1].find(x=>on(p,tray(x)));if(z!=null)return drop(h.i,z);if(tap){W.pick=h.i;return speak(`“${MOVES[h.i].t}” picked. Now tap a box.`)}}
 A.redraw()}
function speak(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();W.test()}
function keys(){if(!ctl)return;ctl.innerHTML='';const k=part(),btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(k==='signs'&&W.seen.length<4)SIGNS.forEach((o,i)=>{if(!W.seen.includes(i))btn(`Worry sign? ${o.t}`,()=>notice(i),`Mark “${o.t}” as a sign of worry`)});
 if(k==='feed'&&!W.down){btn('Swipe to the next video',swipe,'Swipe up to watch the next video');btn('Put the phone down',putDown,'Put the phone down on the table')}
 if(k==='say')BITS.forEach((o,i)=>{if(i in W.said)return;GAP.forEach((t,j)=>{if(!Object.values(W.said).includes(j))btn(`${t} ${o.t}`,()=>fill(i,j),`Put “${o.t}” after “${t}”`)})});
 if(k==='facts')QN.forEach((q,i)=>{if(i in W.match)return;FACT.forEach((f,j)=>{if(!Object.values(W.match).includes(j))btn(`${q} → ${f.t}`,()=>link(i,j),`Answer “${q}” with: ${f.t}`)})});
 if(k==='sort')MOVES.forEach((o,i)=>{if(i in W.sorted)return;btn(`Helps: ${o.t}`,()=>drop(i,0),`“${o.t}” helps`);btn(`Bigger: ${o.t}`,()=>drop(i,1),`“${o.t}” makes the worry bigger`)})}
function clear(){epoch++;for(const x in W)delete W[x];Object.assign(W,{seen:[],clip:0,worry:2,down:0,said:{},match:{},sorted:{},bad:-1,pick:-1,grip:null,test:()=>{}})}
const doneWhen=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(LEARNT[i]+A.reveal(i))};
function begin(i,ok){clear();speak(START[i]);W.test=doneWhen(i,ok)}
function demo(i,acts,ms){steps[i].go();const e=epoch;acts.forEach((f,j)=>setTimeout(()=>{if(e===epoch)f()},ms*(j+1)))}
const fx=FACT.map(f=>f.q);
const steps=[
{h:'Notice the feeling',p:'Rami, 10, has just watched a news video about a big flood in another country. Something feels different.',
 predict:{q:'Rami feels uneasy after the video. Does that mean something is wrong with him?',opts:['Yes, he should not feel like that','No: lots of people feel worried after scary news'],ans:1},task:'Find the 4 signs of worry',
 show:()=>demo(0,[()=>notice(0),()=>notice(2),()=>notice(3),()=>notice(5)],600),go:()=>begin(0,()=>W.seen.length>=4)},
{h:'More videos?',p:'The phone plays the next flood video by itself. Rami wants to know more.',
 predict:{q:'Rami watches 5 more videos about the flood. Will he feel calmer?',opts:['Yes: knowing more will calm him down','No: watching more usually makes worry bigger'],ans:1},task:'Watch the meter, then put the phone down',
 show:()=>demo(1,[swipe,swipe,putDown],700),go:()=>begin(1,()=>W.down)},
{h:'Say it',p:'Dad asks, “Are you OK?” Rami could say “I am fine”. Help him say what really happened.',task:'Fill all 3 gaps',
 show:()=>demo(2,[()=>fill(0,0),()=>fill(2,1),()=>fill(4,2)],700),go:()=>begin(2,()=>Object.keys(W.said).length>=3)},
{h:'Check the facts',p:'Dad and Rami look at a trusted news site and a map together. Match each question to its fact.',
 predict:{q:'A scary flood photo is being shared a lot today. Was it taken today?',opts:['Yes: people only share new photos','Not always: old photos get shared again'],ans:1},task:'Answer all 4 questions',
 show:()=>demo(3,[0,1,2,3].map(i=>()=>link(i,fx.indexOf(i))),650),go:()=>begin(3,()=>Object.keys(W.match).length>=4)},
{h:'What helps?',p:'After a worrying story, some things help and some make the worry bigger. Sort them.',task:'Sort all 8 cards',
 show:()=>demo(4,MOVES.map((o,i)=>()=>drop(i,o.k)),420),go:()=>begin(4,()=>Object.keys(W.sorted).length>=8)},
{h:'Challenge',p:'',go:()=>{clear();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>W.test()});
function next(){round++;const X=QUIZ[round%QUIZ.length],all=[[X.a,''],...X.o],r=round%3,order=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${X.q}</b></p><div class="fl-pick" role="group" aria-label="Pick an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=chal.querySelector('.fl-pick');order.forEach(([t,s])=>{c.el('button',{type:'button',class:'lbtn'},g,t).onclick=()=>judge(s,X)});c.say('Challenge: '+X.q);A.cv.setAttribute('aria-label','Challenge: '+X.q);A.redraw()}
function judge(s,X){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),m=s?slip(s):'';
 if(s)A.sound.miss();else A.win();fb.innerHTML=(s?'✗ '+m:'✓ '+X.a+'.')+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next;c.say(s?m:'Yes.')}
FK.shell(c,{steps,ratio:.62,tall:1.3,draw,onStep:X=>{chal.hidden=X.step!==5;ctl.hidden=X.step===5;keys()},
 init:X=>{A=X;B=brush(A,C);const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Worrying news lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);clear();A.gest({down,move:drag,up:lift_end});keys()}}).start()})})();
