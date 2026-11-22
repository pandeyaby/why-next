/* Flagship – making my own example of a new idea (ages 8–9; Watson and Mason 2005 on learner-generated examples;
   Rawson and Dunlosky 2016 and Zamary et al. 2016: generated examples need checking; EEF metacognition guidance).
   Scenes: sort copies of Miss Lee's noun example from new examples; test your own even numbers by pairing counters
   (odd numbers leave one over, her 6 is a copy); build your own squares on a dot grid (bigger or turned still count,
   rectangles and rhombuses are refused with the reason); fix three examples that do not fit; then choose the reason
   that checks an example against the rule rather than by looks. Every drag or tap has a labelled button twin.
   Data and drawings in learn/ownex_art.js. */
(()=>{const {box,inside,nib,IDEA,NOUN,NUMS,TAUGHT,PRESET,BROKE,TEST,ASK,GOT,QS,counter,teacher,rightMark}=OWNX;
VIS.reg('flagownex',c=>{let A,N,keys,quiz,qk=-1,era=0;
const T={ink:'#1f2937',ok:'#047857',ko:'#b91c1c',rim:'#64748b',sel:'#1d4ed8',bg:'#faf5ff',idea:'#ede9fe',copy:'#fef3c7',mine:'#dcfce7',tile:'#e0e7ff',head:'#5b21b6'};
const G={};const part=()=>['copy','even','square','fix','why','quiz'][A.step];
const at=(x,y,w,h)=>box(A.W*x,A.H*y,A.W*w,A.H*h);
/* ---------- layout ---------- */
const ideaCard=()=>at(.03,.06,.94,.16);
const nounCard=j=>N.lay(NOUN.length,A.narrow?2:3,at(.03,.26,.94,.34))[j],shelf=k=>at(.03+k*.485,.64,.455,.24);
const tester=()=>at(.03,.25,.94,.38),numTile=j=>N.lay(NUMS.length,A.narrow?4:7,at(.03,.67,.94,.2))[j];
const field=()=>at(.03,.25,.94,.62);
function dotAt(cl,rw){const a=field(),s=Math.min(a.w/6,a.h/5);return{x:a.x+(a.w-5*s)/2+cl*s,y:a.y+(a.h-4*s)/2+rw*s,s}}
const brokeCard=()=>at(.12,.26,.76,.24),option=j=>N.lay(3,A.narrow?1:3,at(.03,.55,.94,.33))[j];
const header=t=>N.write(t,A.W/2,A.H*.03,12,{c:T.head,w:A.W-20});
const state=(t,ok)=>N.write(t,A.W/2,A.H*.95,12,{b:700,c:ok?T.ok:T.ink,w:A.W-20});
const lift=(i,b)=>G.grip&&G.grip.i===i?box(G.grip.x-b.w/2,G.grip.y-b.h/2,b.w,b.h):b;
function idea(t,sq){const g=A.ctx,b=ideaCard();N.plate(b,T.idea,'');teacher(g,b.x+b.h*.45,b.y+b.h*.55,b.h*.8);N.write(t,b.x+b.w*(sq?.5:.55),b.y+b.h/2,11,{w:b.w*(sq?.56:.72)})}
/* ---------- 1: copy or new? ---------- */
function paintCopy(){const n=Object.keys(G.bin).length;header('Copy, or my own example?');idea(IDEA[0]);
 [0,1].forEach(k=>{const b=shelf(k);N.plate(b,k?T.mine:T.copy,G.hot===k?'sel':'');N.write(k?'A new example of my own':'Copy of Miss Lee’s',b.x+b.w/2,b.y+b.h*.25,11,{w:b.w-12});
  const got=NOUN.map((o,i)=>G.bin[i]===k?o.t:null).filter(Boolean);N.write(got.length?got.join(', '):'…',b.x+b.w/2,b.y+b.h*.68,12,{b:700,w:b.w-12})});
 NOUN.forEach((o,i)=>{if(i in G.bin)return;const q=lift(i,nounCard(i));N.plate(q,'#ffffff',G.bad===i?'ko':(G.pick===i||(G.grip&&G.grip.i===i))?'sel':'');N.write('“'+o.t+'”',q.x+q.w/2,q.y+q.h/2,14,{w:q.w-12})});
 state(n>=6?'✓ All 6 sorted':`Sorted: ${n} of 6`,n>=6)}
function sortNoun(i,k){if(i in G.bin)return;G.pick=-1;if(NOUN[i].k!==k){G.bad=i;A.sound.miss();return say(oops(k?'samecopy':'isnew',NOUN[i].t))}
 G.bad=-1;G.bin[i]=k;A.sound.pop();say(k?`“${NOUN[i].t}” is a noun Miss Lee did not say. That is a new example of your own.`:`“${NOUN[i].t}” is still Miss Lee’s dog. That is a copy.`)}
/* ---------- 2: test my even numbers ---------- */
function paintEven(){const g=A.ctx,n=G.evens.length;header('Make your own even numbers');idea(IDEA[1]);
 const b=tester(),v=G.shown;N.plate(b,'#ffffff',G.over?'sel':'');
 if(v==null)N.write('Tester: drop a number here',b.x+b.w/2,b.y+b.h/2,13,{c:T.rim});
 else{const cols=Math.ceil(v/2),r=Math.min(b.w/(cols*2.6+1),b.h*.11),gap=r*2.6,x0=b.x+b.w/2-(cols-1)*gap/2;N.write(String(v),b.x+b.w*.08,b.y+b.h*.14,16);
  for(let i=0;i<v;i++){const cl=Math.floor(i/2),rw=i%2,odd=v%2&&i===v-1;counter(g,x0+cl*gap,b.y+b.h*(.38+rw*.28),r,odd)}
  N.write(v%2?'1 left over: not even':`${v/2} pairs, none left over: even`,b.x+b.w/2,b.y+b.h*.88,12,{b:700,c:v%2?T.ko:T.ok,w:b.w-16})}
 NUMS.forEach((m,j)=>{const used=G.evens.includes(m),q=lift(j,numTile(j));N.plate(q,used?T.mine:T.tile,used?'ok':G.bad===j?'ko':G.grip&&G.grip.i===j?'sel':'');N.write(String(m),q.x+q.w/2,q.y+q.h/2,16)});
 state(n>=2?`✓ Your own even numbers: ${G.evens.join(' and ')}`:`Own even numbers: ${n} of 2`,n>=2)}
function testNum(j){const m=NUMS[j];if(G.evens.includes(m)||G.evens.length>=2)return;G.shown=m;
 if(m===6){G.bad=j;A.sound.miss();return say(oops('six'))}
 if(m%2){G.bad=j;A.sound.miss();return say(oops('odd',m))}
 G.bad=-1;G.evens.push(m);A.sound.pop();say(`${m} makes ${m/2} pairs with none left over. ${m} is even, and it is your own example.`+(G.evens.length<2?' Make one more.':''))}
/* ---------- 3: build my own squares ---------- */
function paintSquare(){const g=A.ctx,n=G.made.length;header('Build your own squares');idea(IDEA[2],1);
 const b=ideaCard(),u=b.h*.32;g.save();g.strokeStyle='#5b21b6';g.lineWidth=2;g.strokeRect(b.x+b.w-u*1.6,b.y+(b.h-u)/2,u,u);g.restore();
 const f=field();N.plate(f,'#ffffff','');const shape=(pts,col,fill,dash)=>{g.save();g.setLineDash(dash?[6,5]:[]);g.beginPath();pts.forEach(([cl,rw],i)=>{const d=dotAt(cl,rw);i?g.lineTo(d.x,d.y):g.moveTo(d.x,d.y)});if(pts.length===4)g.closePath();if(fill&&pts.length===4){g.fillStyle=fill;g.fill()}g.strokeStyle=col;g.lineWidth=3;g.stroke();g.restore()};
 G.made.forEach(s=>{shape(s,T.ok,'rgba(4,120,87,.12)');const d=s.map(([cl,rw])=>dotAt(cl,rw));d.forEach((p,i)=>rightMark(g,d[(i+3)%4],p,d[(i+1)%4],p.s*.18))});
 if(G.fail)shape(G.fail,T.ko,null,true);if(G.taps.length)shape(G.taps,T.sel);
 for(let rw=0;rw<5;rw++)for(let cl=0;cl<6;cl++){const d=dotAt(cl,rw),on=G.taps.some(([a,z])=>a===cl&&z===rw);g.fillStyle=on?T.sel:'#475569';g.beginPath();g.arc(d.x,d.y,on?7:4.5,0,7);g.fill()}
 state(n>=2?'✓ 2 squares of your own':`Your squares: ${n} of 2 · Dots tapped: ${G.taps.length} of 4`,n>=2)}
function tapDot(cl,rw){if(G.made.length>=2||G.taps.some(([a,z])=>a===cl&&z===rw))return;G.fail=null;G.taps.push([cl,rw]);A.sound.pop();
 if(G.taps.length<4){A.redraw();return say(`Dot ${G.taps.length} of 4.`)}const pts=G.taps;G.taps=[];shapeCheck(pts)}
function shapeCheck(pts){const v=pts.map((p,i)=>{const q=pts[(i+1)%4];return[q[0]-p[0],q[1]-p[1]]}),len=v.map(([x,y])=>x*x+y*y),dot=v.map((a,i)=>{const b=v[(i+1)%4];return a[0]*b[0]+a[1]*b[1]});
 const equal=len.every(l=>l===len[0]),right=dot.every(d=>d===0),key=pts.map(p=>p.join(',')).sort().join(' ');
 if(!(equal&&right)){G.fail=pts;A.sound.miss();return say(oops(equal?'rhombus':right?'rect':'order'))}
 if(len[0]===1&&v.every(([x,y])=>x===0||y===0)){G.fail=pts;A.sound.miss();return say(oops('tiny'))}
 if(G.made.some(s=>s.map(p=>p.join(',')).sort().join(' ')===key)){G.fail=pts;A.sound.miss();return say('You made that square already. Make a different one.')}
 G.made.push(pts);A.sound.pop();const turned=v.some(([x,y])=>x&&y);say((turned?'A turned square: ':'A bigger square: ')+'4 equal sides and 4 square corners. It is a square, and it is your own.'+(G.made.length<2?' Make one more that looks different.':''))}
function preset(j){if(G.made.length>=2)return;G.taps=[];shapeCheck(PRESET[j].p.map(p=>p.slice()))}
/* ---------- 4: fix it ---------- */
function paintFix(){const r=Math.min(G.fixed,2),o=BROKE[r],done=G.fixed>=3;header('Fix the example');idea(IDEA[3]);
 const b=brokeCard();N.plate(b,done?T.mine:'#fee2e2',G.over?'sel':done?'ok':'');
 if(done)N.write('Fixed: runner, 12, a square sticky note',b.x+b.w/2,b.y+b.h/2,13,{c:T.ok,w:b.w-16});
 else{N.write(`${o.who}’s example of ${o.rule.toLowerCase()}:`,b.x+b.w/2,b.y+b.h*.3,11,{w:b.w-16});N.write(`“${o.ex}” ✗`,b.x+b.w/2,b.y+b.h*.66,17,{c:T.ko})
  o.fix.forEach((f,j)=>{const q=lift(j,option(j));N.plate(q,T.tile,G.bad===j?'ko':G.grip&&G.grip.i===j?'sel':'');N.write(f.t,q.x+q.w/2,q.y+q.h/2,13,{w:q.w-12})})}
 state(done?'✓ All 3 examples fixed':`Fixed: ${G.fixed} of 3`,done)}
function mend(j){if(G.fixed>=3)return;const o=BROKE[G.fixed],f=o.fix[j];if(!f.ok){G.bad=j;A.sound.miss();return say(oops(f.s,o.rule))}
 G.bad=-1;G.fixed++;A.sound.pop();say(`“${f.t}”: ${f.why}`+(G.fixed<3?' Next example.':''))}
/* ---------- 5: check it with the rule ---------- */
function paintWhy(){const r=Math.min(G.checked,2),o=TEST[r],done=G.checked>=3;header('Check it with the rule');idea(IDEA[4]);
 const b=brokeCard();N.plate(b,done?T.mine:'#ffffff',G.over?'sel':done?'ok':'');
 if(done)N.write('Each one checked against its rule',b.x+b.w/2,b.y+b.h/2,13,{c:T.ok,w:b.w-16});
 else{N.write(o.q,b.x+b.w/2,b.y+b.h*.3,14,{w:b.w-16});N.write('because …',b.x+b.w/2,b.y+b.h*.7,12,{c:T.rim})
  o.r.forEach((f,j)=>{const q=lift(j,option(j));N.plate(q,T.tile,G.bad===j?'ko':G.grip&&G.grip.i===j?'sel':'');N.write(f.t,q.x+q.w/2,q.y+q.h/2,12,{w:q.w-12})})}
 state(done?'✓ All 3 checked with the rule':`Checked: ${G.checked} of 3`,done)}
function reason(j){if(G.checked>=3)return;const f=TEST[G.checked].r[j];if(!f.ok){G.bad=j;A.sound.miss();return say(oops(f.s))}
 G.bad=-1;G.checked++;A.sound.pop();say(`${f.t}. That checks it against the rule.`+(G.checked<3?' Next one.':''))}
/* ---------- the slip, named ---------- */
function oops(t,a){let m='Look at the rule again, then check the example against it.';
 if(t==='samecopy')m=`“${a}” is still Miss Lee’s word, dog. A capital letter or “the” does not make it new.`;
 if(t==='isnew')m=`“${a}” is a different noun. Miss Lee did not say it, so it is a new example of your own.`;
 if(t==='six')m='6 is Miss Lee’s example. It is even, but it is a copy. Make your own.';
 if(t==='odd')m=`${a} counters leave 1 over. ${a} is odd, so it does not fit the rule. Try another number.`;
 if(t==='rhombus')m='The 4 sides are equal, but the corners are not square. That is not a square.';
 if(t==='rect')m='The corners are square, but 2 sides are longer than the others. That is a rectangle, not a square.';
 if(t==='order')m='Those sides are not all equal and the corners are not all square. Tap the 4 corners in order, going round.';
 if(t==='tiny')m='That square is the same size and the same way up as Miss Lee’s. It is a copy. Make it bigger, or turn it.';
 if(t==='verb')m='“Jump” is a doing word, not a person, place or thing. It still does not fit.';
 if(t==='copy')m='That is the example you were given. A copy is not an example of your own.';
 if(t==='oddfix')m='13 is odd: it leaves 1 counter over. It still does not fit.';
 if(t==='thin')m='A ruler is long and thin, so its sides are not all equal. It is not a square.';
 if(t==='long')m='Long words are not always nouns. Check the rule: does it name a person, place or thing?';
 if(t==='copy2')m='Miss Lee’s example was dog. That does not tell you about castle. Check the rule.';
 if(t==='big')m='Big numbers can be odd too, like 15. Check the rule: make pairs and look for one left over.';
 if(t==='size')m='How long or big something is does not decide it. Test the example against the rule.';
 if(t==='looks')m='Looks can trick you. Check the rule itself.';
 if(t==='turn')m='Turning a shape does not change its sides or corners. It is still a square.';
 if(t==='notverb')m='“Table” is a thing, so it is a noun. Find a doing word that Miss Lee did not say.';
 if(t==='keep')m='An example that does not fit the rule is wrong, even if it is your own. Check it and fix it.';
 if(t==='quick')m='Making your own example is not about speed. It tests if you really understand.';
 if(t==='nocheck')m='You always check your own example against the rule. That is the point of it.';
 if(t==='small')m='Size does not matter. Any size of square has 4 equal sides and 4 square corners.';
 if(t==='rhyme')m='“Bee” and “bin” start the same, but they do not end with the same sound.';
 if(t==='giveup')m='A wrong example is useful. Fix it and check again, and you learn the idea better.';
 return m}
/* ---------- canvas, pointer, buttons ---------- */
function paint(){const k=part(),g=A.ctx;g.fillStyle=T.bg;g.fillRect(0,0,A.W,A.H);
 if(k==='quiz'){teacher(g,A.W*.5,A.H*.42,A.H*.32);N.write('Challenge',A.W/2,A.H*.75,20);return}
 ({copy:paintCopy,even:paintEven,square:paintSquare,fix:paintFix,why:paintWhy})[k]();A.fx.draw(g)}
function press(p){const k=part(),take=i=>{G.grip={i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true};
 if(k==='copy'){const i=NOUN.findIndex((_,j)=>!(j in G.bin)&&inside(p,nounCard(j)));if(i>=0)return take(i);const z=[0,1].find(j=>inside(p,shelf(j)));if(z!=null&&G.pick>=0)sortNoun(G.pick,z)}
 if(k==='even'&&G.evens.length<2){const j=NUMS.findIndex((m,x)=>!G.evens.includes(m)&&inside(p,numTile(x)));if(j>=0)return take(j)}
 if(k==='square'&&G.made.length<2){let best=null;for(let rw=0;rw<5;rw++)for(let cl=0;cl<6;cl++){const d=dotAt(cl,rw),e=Math.hypot(p.x-d.x,p.y-d.y);if(e<d.s*.45&&(!best||e<best.e))best={cl,rw,e}}if(best)tapDot(best.cl,best.rw)}
 if((k==='fix'&&G.fixed<3)||(k==='why'&&G.checked<3)){const j=[0,1,2].find(x=>inside(p,option(x)));if(j!=null)return take(j)}
 return false}
function slide(p){const d=G.grip;if(!d)return;d.x=p.x;d.y=p.y;const k=part();
 if(k==='copy')G.hot=[0,1].find(j=>inside(p,shelf(j)));if(k==='even')G.over=inside(p,tester());if(k==='fix'||k==='why')G.over=inside(p,brokeCard());A.redraw()}
function release(p){const d=G.grip;if(!d)return;G.grip=null;G.hot=undefined;G.over=false;const k=part(),tap=Math.hypot(p.x-d.x0,p.y-d.y0)<=12;
 if(k==='copy'){const z=[0,1].find(j=>inside(p,shelf(j)));if(z!=null)return sortNoun(d.i,z);if(tap){G.pick=d.i;return say(`“${NOUN[d.i].t}” picked. Now tap a box.`)}}
 if(k==='even'&&(tap||inside(p,tester())))return testNum(d.i);
 if(k==='fix'&&(tap||inside(p,brokeCard())))return mend(d.i);
 if(k==='why'&&(tap||inside(p,brokeCard())))return reason(d.i);
 A.redraw()}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();G.check()}
function buttons(){if(!keys)return;keys.innerHTML='';const k=part(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},keys,t).onclick=f};
 if(k==='copy')NOUN.forEach((o,i)=>{if(i in G.bin)return;add(`Copy: ${o.t}`,()=>sortNoun(i,0),`“${o.t}” is a copy of Miss Lee’s example`);add(`My own: ${o.t}`,()=>sortNoun(i,1),`“${o.t}” is a new example of my own`)});
 if(k==='even'&&G.evens.length<2)NUMS.forEach((m,j)=>{if(!G.evens.includes(m))add(`Test ${m}`,()=>testNum(j),`Put ${m} in the tester`)});
 if(k==='square'&&G.made.length<2){PRESET.forEach((o,j)=>add(o.t,()=>preset(j),`Build: ${o.t}`));if(G.taps.length)add('Clear my dots',()=>{G.taps=[];say('Dots cleared. Tap 4 dots, going round.')})}
 if(k==='fix'&&G.fixed<3)BROKE[G.fixed].fix.forEach((f,j)=>add(f.t,()=>mend(j),`Fix ${BROKE[G.fixed].who}’s example with: ${f.t}`));
 if(k==='why'&&G.checked<3)TEST[G.checked].r.forEach((f,j)=>add(f.t,()=>reason(j),`Because: ${f.t}`))}
function wipe(){era++;for(const x in G)delete G[x];Object.assign(G,{bin:{},pick:-1,bad:-1,shown:null,evens:[],taps:[],made:[],fail:null,fixed:0,checked:0,grip:null,over:false,check:()=>{}})}
const met=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(GOT[i]+A.reveal(i))};
function enter(i,ok){wipe();say(ASK[i]);G.check=met(i,ok)}
function auto(i,acts,ms){steps[i].go();const e=era;acts.forEach((f,j)=>setTimeout(()=>{if(e===era)f()},ms*(j+1)))}
const steps=[
{h:'Copy or new?',p:'Miss Lee teaches a new idea: a noun names a person, place or thing. Her example is dog. Which answers are copies, and which are new?',
 predict:{q:'Leo says “dog” back to Miss Lee. Does that show he understands what a noun is?',opts:['Yes, he got it right','Not yet: he only repeated it'],ans:1},task:'Sort all 6 answers',
 show:()=>auto(0,NOUN.map((o,i)=>()=>sortNoun(i,o.k)),450),go:()=>enter(0,()=>Object.keys(G.bin).length>=6)},
{h:'Test it',p:'An even number makes pairs with none left over. Make your own even numbers, and test each one in the tester.',
 predict:{q:'Mia’s own example of an even number is 9. Will 9 counters make pairs with none left over?',opts:['Yes, 9 is fine','No, 1 is left over'],ans:1},task:'Find 2 even numbers of your own',
 show:()=>auto(1,[()=>testNum(2),()=>testNum(6)],900),go:()=>enter(1,()=>G.evens.length>=2)},
{h:'Make it look different',p:'A square has 4 equal sides and 4 square corners. Miss Lee drew a small one. Make your own squares that look different.',
 predict:{q:'A square is turned so it stands on a corner. Is it still a square?',opts:['No, it is a diamond now','Yes, its sides and corners have not changed'],ans:1},task:'Build 2 squares of your own',
 show:()=>auto(2,[()=>preset(0),()=>preset(1)],1100),go:()=>enter(2,()=>G.made.length>=2)},
{h:'Fix it',p:'Zak, Ivy and Raj made examples, but they do not fit the rule. Fix each one so it fits, without copying Miss Lee.',task:'Fix all 3 examples',
 show:()=>auto(3,[()=>mend(0),()=>mend(1),()=>mend(2)],800),go:()=>enter(3,()=>G.fixed>=3)},
{h:'Check with the rule',p:'How do you know an example fits? Check it against the rule, not by how it looks.',task:'Check all 3 examples',
 show:()=>auto(4,[()=>reason(0),()=>reason(1),()=>reason(2)],800),go:()=>enter(4,()=>G.checked>=3)},
{h:'Challenge',p:'',go:()=>{wipe();pose()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>G.check()});
function pose(){qk++;const Q=QS[qk%QS.length],all=[[Q.a,''],...Q.o],r=qk%3,list=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Pick an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=quiz.querySelector('.fl-pick');list.forEach(([t,s])=>{c.el('button',{type:'button',class:'lbtn'},g,t).onclick=()=>score(s,Q)});c.say('Challenge: '+Q.q);A.redraw()}
function score(s,Q){quiz.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=quiz.querySelector('.fl-fb'),m=s?oops(s):'';
 if(s)A.sound.miss();else A.win();fb.innerHTML=(s?'✗ '+m:'✓ '+Q.a+(/[.”!?]$/.test(Q.a)?'':'.'))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=pose;c.say(s?m:'Yes.')}
FK.shell(c,{steps,ratio:.62,tall:1.3,draw:paint,onStep:X=>{quiz.hidden=X.step!==5;keys.hidden=X.step===5;buttons()},
 init:X=>{A=X;N=nib(A,T);const w=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Own example lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);wipe();A.gest({down:press,move:slide,up:release});buttons()}}).start()})})();
