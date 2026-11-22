/* Flagship – good surprises and worry secrets (ages 6–7; PSHE Association KS1 keeping safe, DfE Relationships
   Education 2019, NSPCC PANTS "Speak up, someone can help"). Scenes: sort six cards into Good surprise or Worry
   secret; put each secret on the day everyone finds out (a worry secret only fits Never); tap the feelings that warn
   Mia it is a worry secret; tap the warning words people use (special secret, you'll be in trouble, nobody will
   believe you, sweets to keep quiet); and take the worry to a trusted grown-up, then tell even though Mia promised.
   Every drag or tap has a labelled button twin. Data and drawings in learn/secret_art.js. */
(()=>{const {box,inside,ink,CARDS,DAYS,WEEK,CLUES,SAYS,PEOPLE,DESC,DONE,QS,gift,warn,person}=SECR;
VIS.reg('flagsecret',c=>{let A,T,pad,chal,qi=-1,gen=0;
const K={ink:'#1f2937',ok:'#047857',ko:'#b91c1c',rim:'#64748b',sel:'#1d4ed8',bg:'#fdf4ff',sur:'#fef3c7',wor:'#ffe4e6',chip:'#e0e7ff',head:'#86198f'};
const FULL=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday','Never'];
const st={};const sc=()=>['sort','when','feel','words','tell','quiz'][A.step];
/* ---------- layout ---------- */
const topA=()=>box(A.W*.03,A.H*.1,A.W*.94,A.H*.5),binB=k=>box(A.W*(.03+k*.485),A.H*.64,A.W*.455,A.H*.25);
const cardBoxes=()=>T.grid(CARDS.length,A.narrow?2:3,topA());
const weekCard=()=>box(A.W*.2,A.H*.1,A.W*.6,A.H*.16),dayB=k=>T.grid(8,4,box(A.W*.03,A.H*.32,A.W*.94,A.H*.54))[k];
const chipB=k=>T.grid(6,2,box(A.W*.36,A.H*.1,A.W*.61,A.H*.76))[k],sayB=k=>T.grid(6,A.narrow?2:3,box(A.W*.03,A.H*.1,A.W*.94,A.H*.76),10)[k];
const secretB=()=>box(A.W*.15,A.H*.09,A.W*.7,A.H*.17),manB=k=>T.grid(6,3,box(A.W*.03,A.H*.32,A.W*.94,A.H*.54))[k];
const choiceB=k=>box(A.W*(.06+k*.47),A.H*.62,A.W*.41,A.H*.2);
function title(t){T.say(t,A.W/2,A.H*.05,12,{c:K.head,w:A.W-20})}
function foot(t,ok){T.say(t,A.W/2,A.H*.94,12,{b:700,c:ok?K.ok:K.ink,w:A.W-20})}
function dragged(i,b){const d=st.drag;return d&&d.i===i?box(d.x-b.w/2,d.y-b.h/2,b.w,b.h):b}
/* ---------- 1: sort ---------- */
function drawSort(){const g=A.ctx;title('Good surprise or worry secret?');const bs=cardBoxes();
 [0,1].forEach(k=>{const b=binB(k);T.tile(b,k?K.wor:K.sur,st.hot===k?'sel':'');(k?warn:gift)(g,b.x+b.w*.13,b.y+b.h*.3,Math.min(b.w*.19,b.h*.34));
  T.say(k?'Worry secret':'Good surprise',b.x+b.w*.6,b.y+b.h*.3,12,{w:b.w*.66});const n=st.sorted.filter(i=>CARDS[i].k===k);
  T.say(n.length?n.map(i=>CARDS[i].sh).join(', '):'…',b.x+b.w/2,b.y+b.h*.72,10,{b:700,w:b.w-14})});
 CARDS.forEach((o,i)=>{if(st.sorted.includes(i)||(st.drag&&st.drag.i===i))return;T.tile(bs[i],'#ffffff',st.bad===i?'ko':st.sel===i?'sel':'');T.say(o.t,bs[i].x+bs[i].w/2,bs[i].y+bs[i].h/2,11,{w:bs[i].w-12})});
 if(st.drag){const b=dragged(st.drag.i,bs[st.drag.i]);T.tile(b,'#ffffff','sel');T.say(CARDS[st.drag.i].t,b.x+b.w/2,b.y+b.h/2,11,{w:b.w-12})}
 foot(st.sorted.length>=6?'✓ All 6 sorted':`Sorted: ${st.sorted.length} of 6`,st.sorted.length>=6)}
function sortTo(i,k){if(st.sorted.includes(i))return;const o=CARDS[i];st.sel=-1;if(o.k!==k){st.bad=i;A.sound.miss();return say(slip(o.k?o.s:'soon'))}
 st.bad=-1;st.sorted.push(i);A.sound.pop();say(`${o.sh}: ${k?'a worry secret. Tell a trusted grown-up.':'a good surprise. Everyone will find out soon.'}`)}
/* ---------- 2: when ---------- */
function drawWhen(){const g=A.ctx;title('When will everyone find out?');const i=st.week.length;
 DAYS.forEach((d,k)=>{const b=dayB(k),put=WEEK.findIndex((w,j)=>st.week.includes(j)&&w.d===k);T.tile(b,k===7?K.wor:'#ffffff',st.badD===k?'ko':put>=0?'ok':'');
  T.say(d,b.x+b.w/2,b.y+b.h*.25,12);if(put>=0)T.say(WEEK[put].sh,b.x+b.w/2,b.y+b.h*.65,10,{b:700,w:b.w-8,c:k===7?K.ko:K.ok})});
 if(i<WEEK.length){const b=dragged(i,weekCard());T.tile(b,WEEK[i].d===7?K.wor:K.sur,st.drag?'sel':'');T.say(WEEK[i].t,b.x+b.w/2,b.y+b.h/2,12,{w:b.w-16})}
 foot(i>=4?'✓ Surprises have a day. The worry secret has none.':`Card ${i+1} of 4`,i>=4)}
function putDay(k){const i=st.week.length;if(i>=WEEK.length)return;const w=WEEK[i];
 if(w.d!==k){st.badD=k;A.sound.miss();return say(w.d===7?slip('never'):k===7?slip('soon'):slip('day',w.sh,FULL[w.d]))}
 st.badD=-1;st.week.push(i);A.sound.pop();say(k===7?'“Not ever” goes in Never. No day to find out: that is a worry secret.':`${w.sh}: everyone finds out on ${FULL[k]}. That is a good surprise.`)}
/* ---------- 3: feelings ---------- */
function drawFeel(){const g=A.ctx;title('Which feelings warn Mia?');const n=st.felt.length;
 person(g,A.W*.18,A.H*.42,Math.min(A.W*.3,A.H*.45),'#86198f',n>0);T.say('Mia',A.W*.18,A.H*.68,12);
 if(n)T.say(`Worry signs: ${n} of 3`,A.W*.18,A.H*.76,11,{b:700,c:K.ko,w:A.W*.3});
 CLUES.forEach((o,k)=>{const b=chipB(k),on=st.felt.includes(k);T.tile(b,on?'#ffe4e6':K.chip,st.badC===k?'ko':on?'ok':'');T.say((on?'✓ ':'')+o.t,b.x+b.w/2,b.y+b.h/2,11,{w:b.w-12})});
 foot(n>=3?'✓ Mia found the 3 worry feelings':'Tap the worried, scared or sick feelings',n>=3)}
function feel(k){if(st.felt.includes(k)||st.felt.length>=3)return;if(!CLUES[k].w){st.badC=k;A.sound.miss();return say(slip('excited'))}
 st.badC=-1;st.felt.push(k);A.sound.pop();say(`“${CLUES[k].t}”: a worry feeling.`+(st.felt.length<3?' Find another one.':' Feelings like these mean: tell.'))}
/* ---------- 4: warning words ---------- */
function drawWords(){title('Tap the warning words');const n=st.warned.length;
 SAYS.forEach((o,k)=>{const b=sayB(k),on=st.warned.includes(k);T.tile(b,on?K.wor:'#ffffff',st.badS===k?'ko':on?'ok':'');T.say((on?'⚠ ':'')+o.t,b.x+b.w/2,b.y+b.h/2,12,{w:b.w-14})});
 foot(n>=4?'✓ All 4 warning signs found':`Warning signs found: ${n} of 4`,n>=4)}
function warnTap(k){if(st.warned.includes(k)||st.warned.length>=4)return;if(!SAYS[k].w){st.badS=k;A.sound.miss();return say(slip('fine'))}
 st.badS=-1;st.warned.push(k);A.sound.pop();say(`${SAYS[k].t} is a warning sign.`+(st.warned.length<4?' Look for more.':' When you hear these, tell a trusted grown-up.'))}
/* ---------- 5: tell ---------- */
function drawTell(){const g=A.ctx;const b0=secretB();
 if(!st.told){title('Who can help?');const b=dragged(0,b0);T.tile(b,K.wor,st.drag?'sel':'');T.say('Someone hurt me and said: “Keep quiet.”',b.x+b.w/2,b.y+b.h/2,12,{w:b.w-16});
  PEOPLE.forEach((o,k)=>{const m=manB(k);T.tile(m,'#ffffff',st.badP===k?'ko':'');person(g,m.x+m.w/2,m.y+m.h*.36,m.h*.5,o.c);T.say(o.t,m.x+m.w/2,m.y+m.h*.8,10,{w:m.w-8})});
  return foot('Drag the card to a person',false)}
 const who=PEOPLE[st.told-1];title(`Mia goes to ${who.t.toLowerCase().replace('my ','her ')}.`);person(g,A.W*.3,A.H*.36,A.H*.34,'#86198f',!st.anyway);person(g,A.W*.7,A.H*.36,A.H*.34,who.c);
 T.say(st.anyway?'“Thank you for telling me. You did the right thing.”':'Mia: “But I promised to keep quiet!”',A.W/2,A.H*.12,12,{w:A.W-30,c:st.anyway?K.ok:K.ink});
 if(!st.anyway)[0,1].forEach(k=>{const b=choiceB(k);T.tile(b,k?'#ffffff':'#dcfce7',st.badK===k?'ko':'');T.say(k?'Keep the promise':'Tell anyway',b.x+b.w/2,b.y+b.h/2,13,{w:b.w-12})});
 foot(st.anyway?'✓ Mia told a trusted grown-up':'What should Mia do?',st.anyway)}
function tellTo(k){if(st.told)return;const o=PEOPLE[k];if(!o.ok){st.badP=k;A.sound.miss();return say(slip(o.s))}st.badP=-1;st.told=k+1;A.sound.tick();say(`${o.t} is a trusted grown-up who can help. But Mia promised to keep quiet. Tell anyway, or keep the promise?`)}
function choose(k){if(!st.told||st.anyway)return;if(k){st.badK=1;A.sound.miss();return say(slip('promise'))}st.badK=-1;st.anyway=true;A.sound.pop();say('Mia told. You can break a promise to keep a worry secret. She is not in trouble.')}
/* ---------- feedback that names the slip ---------- */
function slip(t,a,b){let m='Ask: will everyone find out soon, and does it feel happy? Then try again.';
 if(t==='soon')m='This one will be told soon, and it makes someone happy. That is a good surprise, not a worry secret.';
 if(t==='threat')m='“Tell, and I will hit you” is a threat. A secret kept by being scared is a worry secret.';
 if(t==='special')m='Calling it “special” does not make it good. A grown-up should not ask you to keep a secret from Mum.';
 if(t==='hurt')m='When someone hurts you and says “keep quiet”, that is a worry secret. Tell a trusted grown-up.';
 if(t==='ever')m='A good surprise does not stay hidden for ever. It has a day when everyone finds out.';
 if(t==='never')m='Nobody plans to tell this one, ever. It has no day, so it goes in Never: a worry secret.';
 if(t==='day')m=`Read the card: ${a} is on ${b}. Everyone finds out that day.`;
 if(t==='excited')m='Happy, excited feelings come with a good surprise. Look for worried, scared or sick feelings.';
 if(t==='fine')m='That is a surprise with a day when everyone finds out. It is not a warning sign.';
 if(t==='asker')m='The person who said “keep quiet” will not help you tell. Go to a different trusted grown-up.';
 if(t==='teddy')m='A teddy can give you a cuddle, but it cannot help. Tell a trusted grown-up.';
 if(t==='online')m='Someone online you do not know is not a trusted grown-up. Tell someone you know well, like a teacher.';
 if(t==='promise')m='You can break a promise to keep a worry secret. Telling a trusted grown-up is the right thing.';
 if(t==='sweets')m='Sweets or presents to keep quiet are a warning sign. That makes it a worry secret, so tell.';
 if(t==='feel')m='If a secret makes you feel bad, do not keep it. Tell a trusted grown-up.';
 return m}
/* ---------- drawing, pointer and buttons ---------- */
function draw(){const k=sc(),g=A.ctx;g.fillStyle=K.bg;g.fillRect(0,0,A.W,A.H);if(k==='quiz'){gift(g,A.W*.35,A.H*.4,A.H*.2);warn(g,A.W*.65,A.H*.4,A.H*.2);T.say('Challenge',A.W/2,A.H*.7,20);return}
 ({sort:drawSort,when:drawWhen,feel:drawFeel,words:drawWords,tell:drawTell})[k]();A.fx.draw(A.ctx)}
function down(p){const k=sc(),grab=i=>{st.drag={i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true};
 if(k==='sort'){const i=cardBoxes().findIndex((b,j)=>!st.sorted.includes(j)&&inside(p,b));if(i>=0)return grab(i);const n=[0,1].find(j=>inside(p,binB(j)));if(n!=null&&st.sel>=0){sortTo(st.sel,n);return false}}
 if(k==='when'&&st.week.length<4){if(inside(p,weekCard()))return grab(st.week.length);const d=DAYS.findIndex((_,j)=>inside(p,dayB(j)));if(d>=0)putDay(d)}
 if(k==='feel'){const j=CLUES.findIndex((_,n)=>inside(p,chipB(n)));if(j>=0)feel(j)}
 if(k==='words'){const j=SAYS.findIndex((_,n)=>inside(p,sayB(n)));if(j>=0)warnTap(j)}
 if(k==='tell'){if(!st.told){if(inside(p,secretB()))return grab(0);const j=PEOPLE.findIndex((_,n)=>inside(p,manB(n)));if(j>=0)tellTo(j)}else{const j=[0,1].find(n=>inside(p,choiceB(n)));if(j!=null)choose(j)}}
 return false}
function move(p){const d=st.drag;if(!d)return;d.x=p.x;d.y=p.y;const k=sc();if(k==='sort')st.hot=[0,1].find(j=>inside(p,binB(j)));A.redraw()}
function up(p){const d=st.drag;if(!d)return;st.drag=null;st.hot=undefined;const k=sc(),moved=Math.hypot(p.x-d.x0,p.y-d.y0)>12;
 if(k==='sort'){const n=[0,1].find(j=>inside(p,binB(j)));if(n!=null)return sortTo(d.i,n);if(!moved){st.sel=d.i;return say(`“${CARDS[d.i].sh}” picked. Now tap Good surprise or Worry secret.`)}}
 if(k==='when'){const n=DAYS.findIndex((_,j)=>inside(p,dayB(j)));if(n>=0)return putDay(n);if(!moved)return say('Now tap the day everyone finds out, or Never.')}
 if(k==='tell'){const n=PEOPLE.findIndex((_,j)=>inside(p,manB(j)));if(n>=0)return tellTo(n);if(!moved)return say('Now tap a person who can help.')}
 A.redraw()}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();st.hook()}
function buttons(){if(!pad)return;pad.innerHTML='';const k=sc(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='sort')CARDS.forEach((o,i)=>{if(!st.sorted.includes(i)){b(`Surprise: ${o.sh}`,()=>sortTo(i,0),`Put “${o.t}” in Good surprise`);b(`Worry: ${o.sh}`,()=>sortTo(i,1),`Put “${o.t}” in Worry secret`)}});
 if(k==='when'&&st.week.length<4){const w=WEEK[st.week.length];DAYS.forEach((d,j)=>b(d,()=>putDay(j),`Put “${w.t}” on ${FULL[j]}`))}
 if(k==='feel'&&st.felt.length<3)CLUES.forEach((o,j)=>{if(!st.felt.includes(j))b(o.t,()=>feel(j),`Worry feeling? ${o.t}`)});
 if(k==='words'&&st.warned.length<4)SAYS.forEach((o,j)=>{if(!st.warned.includes(j))b(o.t,()=>warnTap(j),`Warning sign? ${o.t}`)});
 if(k==='tell'){if(!st.told)PEOPLE.forEach((o,j)=>b(`Tell ${o.t.replace(/^(My|The|Someone)/,w=>w.toLowerCase())}`,()=>tellTo(j)));else if(!st.anyway){b('Tell anyway',()=>choose(0));b('Keep the promise',()=>choose(1))}}}
function reset(){gen++;for(const x in st)delete st[x];Object.assign(st,{sorted:[],bad:-1,sel:-1,week:[],badD:-1,felt:[],badC:-1,warned:[],badS:-1,told:0,anyway:false,badP:-1,badK:-1,drag:null,hook:()=>{}})}
const met=(i,test)=>()=>{if(A.step===i&&test()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(DONE[i]+A.reveal(i))};
function begin(i,test){reset();say(DESC[i]);st.hook=met(i,test)}
function demo(i,acts,ms){steps[i].go();const g0=gen;acts.forEach((f,j)=>setTimeout(()=>{if(g0===gen)f()},ms*(j+1)))}
const steps=[
{h:'Surprise or secret?',p:'Some secrets are fun to keep. Some are not. Drag each card to Good surprise or Worry secret.',
 predict:{q:'A grown-up says, “It’s our special secret.” Is it a good one?',opts:['Yes, it is special','No, it is a worry secret'],ans:1},task:'Sort all 6 cards',
 show:()=>demo(0,CARDS.map((o,i)=>()=>sortTo(i,o.k)),420),go:()=>begin(0,()=>st.sorted.length>=6)},
{h:'When will they know?',p:'A surprise has a day when everyone finds out. Drag each card onto its day.',
 predict:{q:'Does a good surprise stay hidden for ever?',opts:['Yes, for ever','No, everyone finds out soon'],ans:1},task:'Put all 4 cards on a day',
 show:()=>demo(1,WEEK.map(w=>()=>putDay(w.d)),600),go:()=>begin(1,()=>st.week.length>=4)},
{h:'How does it feel?',p:'Your body can tell you. Tap the feelings that mean Mia has a worry secret.',task:'Find the 3 worry feelings',
 show:()=>demo(2,[0,2,4].map(j=>()=>feel(j)),600),go:()=>begin(2,()=>st.felt.length>=3)},
{h:'Warning words',p:'Some words are a warning. Tap each thing a person says that means: tell.',
 predict:{q:'Someone gives you sweets to keep a secret. Does that make it a good secret?',opts:['Yes, I got a present','No, it is a warning sign'],ans:1},task:'Find all 4 warning signs',
 show:()=>demo(3,[0,2,3,5].map(j=>()=>warnTap(j)),500),go:()=>begin(3,()=>st.warned.length>=4)},
{h:'Tell a grown-up',p:'Mia has a worry secret. Drag her card to a person who can help. Then decide what she does about her promise.',task:'Help Mia tell',
 show:()=>demo(4,[()=>tellTo(0),()=>choose(0)],900),go:()=>begin(4,()=>st.anyway)},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>st.hook()});
function ask(){qi++;const Q=QS[qi%QS.length],opts=[[Q.a,''],...Q.o],r=qi%3,list=opts.slice(r).concat(opts.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Pick an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=chal.querySelector('.fl-pick');list.forEach(([t,s])=>{c.el('button',{type:'button',class:'lbtn'},g,t).onclick=()=>mark(s,Q)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(s,Q){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),why=s?slip(s):'';
 if(!s)A.win();else A.sound.miss();fb.innerHTML=(s?'✗ '+why:'✓ '+Q.a+'.')+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(s?why:'Yes.')}
FK.shell(c,{steps,ratio:.62,tall:1.3,draw,onStep:X=>{chal.hidden=X.step!==5;pad.hidden=X.step===5;buttons()},
 init:X=>{A=X;T=ink(A,K);const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Secrets lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}}).start()})})();
