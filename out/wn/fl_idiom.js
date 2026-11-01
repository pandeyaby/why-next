/* Flagship – literal vs figurative language (ages 8–9). Sort sentences where the same words are literal in one context and
   figurative in another, match idioms to what they mean, build similes and metaphors from the joining word, tap the context
   clues that explain a figurative phrase, and swap a figurative phrase for a plain literal one. Buttons twin every drag/tap. */
(()=>{
/* [sentence, 0 literal | 1 figurative, why] — pairs share words so context decides */
const SORTS=[['The log was on fire.',0,'A real log really burns, so the words mean just what they say.'],
 ['In the match, Priya was on fire.',1,'Priya is not burning. "On fire" here means she was playing brilliantly.'],
 ['Dad broke the ice on the pond.',0,'There is real ice on a real pond, so it is literal.'],
 ['Ali told a joke to break the ice.',1,'No ice here. "Break the ice" means help people relax and start talking.'],
 ['The feather is light.',0,'A feather really does weigh very little: literal.'],
 ['My bag is as light as a feather.',1,'The bag is compared to a feather to say it is very light: a simile, so figurative.']];
const IDIOMS=[[['raining cats and dogs','raining very hard'],['a piece of cake','very easy'],['butterflies in my stomach','feeling nervous']],
 [['under the weather','feeling ill'],['spill the beans','tell a secret'],['hit the books','study hard']]];
/* comparisons: [left, picture, target kind, sentence for like, for is, for as…as] */
const BUILD=[['The classroom','a zoo','metaphor','The classroom was like a zoo.','The classroom was a zoo.','The classroom was as noisy as a zoo.'],
 ['He ran','the wind','simile','He ran like the wind.','He was the wind.','He ran as fast as the wind.'],
 ['The pillow','a cloud','simile','The pillow felt like a cloud.','The pillow was a cloud.','The pillow was as soft as a cloud.'],
 ['Her smile','sunshine','metaphor','Her smile was like sunshine.','Her smile was sunshine.','Her smile was as warm as sunshine.']];
const JOIN=['like','is / was','as … as'];
/* passages: chunks, index of the figurative chunk, indices of the clue chunks, meaning */
const CLUES=[[['Sam had','butterflies in his stomach.','His hands','shook','as he walked','on stage.'],1,[3,5],'nervous'],
 [['After the race,','Mo was','dead on his feet.','He','flopped on the sofa','and','fell asleep.'],2,[4,6],'very tired'],
 [['The test was','a piece of cake.','Jen','finished in five minutes','and','got every answer right.'],1,[3,5],'very easy']];
const PLAIN=[['Gran said it was raining cats and dogs.',[['Gran said it was raining very hard.','ok'],['Gran said cats and dogs fell from the sky.','word'],['Gran said the pets were out in the rain.','miss']]],
 ['Tia was over the moon with her prize.',[['Tia jumped over the moon with her prize.','word'],['Tia was very happy with her prize.','ok'],['Tia was tired after her prize.','miss']]],
 ['Leo let the cat out of the bag about the party.',[['Leo was sad about the party.','miss'],['Leo opened a bag and a cat ran out.','word'],['Leo told the secret about the party.','ok']]]];
VIS.reg('flagidiom',c=>{let A,ctl,qbox,qi=-1,gen=0,inRow=0;
const empty=()=>({cb:()=>{},hits:0,lap:0,flash:-1,glow:-1,hold:-1,drag:null,paired:[],tapped:[],built:''}),Z=empty();
const phase=()=>['sort','match','build','clue','plain','quiz'][A.step],instant=()=>A.reduced();
const need=()=>({sort:6,match:6,build:4,clue:3,plain:3}[phase()]||99);
function sayIt(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function ink(g,t,x,y,n,col,al,mw){g.font=`700 ${Math.round(n*(A.narrow?1:1.12))}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,mw||A.W-14)}
function para(g,t,x,y,w,n,col){g.font=`700 ${Math.round(n*(A.narrow?1:1.12))}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;const L=[];let cur='';
 t.split(' ').forEach(s=>{const z=cur?cur+' '+s:s;if(g.measureText(z).width>w&&cur){L.push(cur);cur=s}else cur=z});L.push(cur);const lh=n*1.35;L.forEach((s,i)=>g.fillText(s,x,y+(i-(L.length-1)/2)*lh))}
const paper=()=>A.col.dark?'#1e293b':'#ffffff',edge=()=>A.mix(A.col.tx,A.col.pn,.35);
function box(g,r,fill,stroke,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=lw||2;g.strokeStyle=stroke;g.stroke()}
const within=(p,r)=>r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* ---- layout ---- */
const bins=()=>{const w=(A.W-30)/2;return[{x:10,y:A.H*.58,w,h:A.H*.36},{x:20+w,y:A.H*.58,w,h:A.H*.36}]};
const card=()=>{const w=Math.min(A.W-40,440),r={x:A.W/2-w/2,y:A.H*.08,w,h:A.H*.3};return Z.drag&&Z.drag.x!=null?{...r,x:Z.drag.x-w/2,y:Z.drag.y-r.h/2}:r};
const leftCol=i=>({x:10,y:A.H*.06+i*A.H*.31,w:A.W*.46,h:A.H*.26}),rightCol=i=>({x:A.W*.52,y:A.H*.06+i*A.H*.31,w:A.W*.46,h:A.H*.26});
const joinBtn=i=>{const w=(A.W-40)/3;return{x:10+i*(w+10),y:A.H*.7,w,h:A.H*.22}};
/* clue chunks laid out like words in a paragraph */
function flow(){const g=A.ctx,P=CLUES[Z.lap%3][0],n=Math.round(15*(A.narrow?1:1.12)),gap=10,lh=n*2.6,out=[];g.font=`700 ${n}px system-ui,sans-serif`;let x=14,y=A.H*.12;
 P.forEach(t=>{const w=g.measureText(t).width+16;if(x+w>A.W-14){x=14;y+=lh}out.push({x,y,w,h:n*2});x+=w+gap});return out}
const plainBtn=i=>({x:12,y:A.H*.36+i*A.H*.21,w:A.W-24,h:A.H*.18});
/* order of meaning cards on the right, shuffled per lap */
const meanOrder=()=>Z.lap%2?[2,0,1]:[1,2,0];
/* ---- drawing ---- */
function drawSort(g){const C=A.col;if(Z.hits>=6){ink(g,'All 6 sorted ✓',A.W/2,A.H*.3,17);}else{const r=card();box(g,r,paper(),Z.hold>=0?C.vi:edge(),3);para(g,SORTS[Z.hits][0],r.x+r.w/2,r.y+r.h/2,r.w-24,16)}
 ink(g,`${Z.hits} of 6 sorted`,A.W/2,A.H*.48,12,C.tx);
 [['🔍 Literal','means just what it says'],['💭 Figurative','means something else']].forEach(([a,b],k)=>{const r=bins()[k];box(g,r,A.alpha(k?C.vi:C.cy,.12),Z.flash===k?C.rd:k?C.vi:C.cy,Z.flash===k?5:3);ink(g,a,r.x+r.w/2,r.y+r.h*.38,16);ink(g,b,r.x+r.w/2,r.y+r.h*.7,11,C.tx,'center',r.w-10)})}
function drawMatch(g){const C=A.col,set=IDIOMS[Z.lap%2],ord=meanOrder();
 set.forEach(([idi],i)=>{const r=leftCol(i),ok=Z.paired.includes(i);box(g,r,ok?A.alpha(C.gr,.18):paper(),Z.flash===i?C.rd:ok?C.gr:edge(),ok||Z.flash===i?4:2);para(g,`"${idi}"`,r.x+r.w/2,r.y+r.h*(ok?.4:.5),r.w-14,13);if(ok)para(g,'= '+set[i][1],r.x+r.w/2,r.y+r.h*.78,r.w-14,11,C.tx)});
 ord.forEach((m,j)=>{if(Z.paired.includes(m))return;let r=rightCol(j);if(Z.drag&&Z.drag.i===m&&Z.drag.x!=null)r={...r,x:Z.drag.x-r.w/2,y:Z.drag.y-r.h/2};box(g,r,A.alpha(C.am,.14),Z.hold===m?C.vi:C.am,Z.hold===m?5:2);para(g,set[m][1],r.x+r.w/2,r.y+r.h/2,r.w-14,14)})}
function drawBuild(g){const C=A.col,B=BUILD[Z.lap%4];ink(g,`Make a ${B[2].toUpperCase()}`,A.W/2,A.H*.08,16,B[2]==='simile'?C.cy:C.vi);
 const piece=(t,x)=>{const w=Math.min(A.W*.38,190),r={x:x-w/2,y:A.H*.18,w,h:A.H*.16};box(g,r,paper(),edge(),2);para(g,t,x,r.y+r.h/2,w-10,15)};piece(B[0],A.W*.24);ink(g,'+ ? +',A.W/2,A.H*.26,15,C.tx);piece(B[1],A.W*.76);
 if(Z.built){box(g,{x:12,y:A.H*.42,w:A.W-24,h:A.H*.2},A.alpha(C.gr,.12),C.gr,3);para(g,Z.built,A.W/2,A.H*.52,A.W-40,15)}
 else ink(g,'Pick the joining word',A.W/2,A.H*.52,13,C.tx);
 JOIN.forEach((t,i)=>{const r=joinBtn(i);box(g,r,A.alpha(C.cy,.1),Z.flash===i?C.rd:Z.glow===i?C.vi:C.cy,Z.flash===i?5:3);ink(g,t,r.x+r.w/2,r.y+r.h/2,16)})}
function drawClue(g){const C=A.col,[P,fig,clues,mean]=CLUES[Z.lap%3];flow().forEach((r,k)=>{const isFig=k===fig,got=Z.tapped.includes(k);
 box(g,r,got?A.alpha(C.gr,.22):isFig?A.alpha(C.vi,.16):paper(),Z.flash===k?C.rd:got?C.gr:isFig?C.vi:edge(),got||Z.flash===k?4:2);ink(g,P[k],r.x+r.w/2,r.y+r.h/2,15)});
 ink(g,`Clues found: ${Z.tapped.length} of 2`,A.W/2,A.H*.8,13,C.tx);if(Z.tapped.length>=2)ink(g,`So "${P[fig].replace(/\.$/,'')}" means ${mean}.`,A.W/2,A.H*.9,13,C.tx)}
function drawPlain(g){const C=A.col,[s,ops]=PLAIN[Math.min(Z.lap,2)];box(g,{x:12,y:A.H*.05,w:A.W-24,h:A.H*.25},A.alpha(C.vi,.1),C.vi,3);para(g,s,A.W/2,A.H*.175,A.W-48,15);
 ops.forEach(([t],i)=>{const r=plainBtn(i);box(g,r,paper(),Z.flash===i?C.rd:edge(),Z.flash===i?5:2);para(g,String.fromCharCode(65+i)+".  "+t,A.W/2,r.y+r.h/2,r.w-20,13)})}
function drawQuiz(g){const C=A.col;ink(g,'🔍 Literal: just what it says',A.W/2,A.H*.35,16,C.tx);ink(g,'💭 Figurative: means something else',A.W/2,A.H*.6,16,C.tx)}
function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.05:.3);g.fillRect(0,0,A.W,A.H);
 ({sort:drawSort,match:drawMatch,build:drawBuild,clue:drawClue,plain:drawPlain,quiz:drawQuiz}[phase()])(g);A.fx.draw(g)}
function miss(t,i){A.sound.miss();Z.flash=i==null?-1:i;sayIt(t);const v=gen;setTimeout(()=>{if(v===gen){Z.flash=-1;A.redraw()}},instant()?10:900);A.redraw()}
function hit(t){Z.hits++;A.sound.pop();sayIt(t);keys();A.redraw();Z.cb()}
const later=(f,ms)=>{const v=gen;setTimeout(()=>{if(v===gen){f();keys();A.redraw()}},instant()?20:(Z.demo?260:ms))};
function sortTo(k){if(Z.hits>=6)return;Z.hold=-1;const[s,ans,why]=SORTS[Z.hits];if(k!==ans)return miss(`Not quite. ${why}`,k);hit(`${k?'Figurative':'Literal'}. ${why}`)}
function pair(m,i){if(Z.paired.includes(m)||Z.hits>=6)return;Z.hold=-1;const set=IDIOMS[Z.lap%2];
 if(m!==i)return miss(`"${set[i][0]}" does not mean ${set[m][1]}. Think about when people say it.`,i);Z.paired.push(m);hit(`Yes: "${set[m][0]}" means ${set[m][1]}.`);
 if(Z.paired.length===3&&Z.hits<6)later(()=>{Z.lap++;Z.paired=[];sayIt('New idioms. Match each to its meaning.')},1300)}
function join(i){if(Z.hits>=4||Z.built)return;const B=BUILD[Z.lap%4],kind=i===1?'metaphor':'simile';Z.glow=i;
 if(kind!==B[2])return miss(i===1?`"${B[4]}" says it IS the thing, with no like or as. That is a metaphor, but you need a simile.`:`"${B[i===0?3:5]}" uses ${i===0?'like':'as … as'}, so it is a simile. A metaphor says it IS the thing.`,i);
 Z.built=B[i===0?3:i===1?4:5];hit(`${B[2]==='simile'?'Simile':'Metaphor'}: ${Z.built}`);if(Z.hits<4)later(()=>{Z.lap++;Z.built='';Z.glow=-1;sayIt(`Now make a ${BUILD[Z.lap%4][2]}.`)},1400)}
function clue(k){if(Z.hits>=3)return;const[P,fig,clues]=CLUES[Z.lap%3];if(Z.tapped.includes(k)||Z.tapped.length>=2)return;
 if(k===fig)return miss('That is the figurative phrase itself. Find the words nearby that tell you what it means.',k);
 if(!clues.includes(k))return miss(`"${P[k]}" does not tell you what the phrase means. Look for what the person does.`,k);
 Z.tapped.push(k);A.sound.tick();if(Z.tapped.length<2){sayIt(`Clue: "${P[k]}". Find one more.`);return A.redraw()}
 hit(`Both clues found. "${P[fig].replace(/\.$/,'')}" means ${CLUES[Z.lap%3][3]}.`);if(Z.hits<3)later(()=>{Z.lap++;Z.tapped=[];sayIt('New passage. Tap the clue words.')},1500)}
function plain(i){if(Z.hits>=3||Z.hits>Z.lap)return;const[s,ops]=PLAIN[Math.min(Z.lap,2)],t=ops[i][1];
 if(t==='word')return miss('That reads the words one by one, so it is still the literal picture. Say what the person really means.',i);
 if(t==='miss')return miss('That changes the meaning. Use the context: what is really being said?',i);
 hit(`Plain and literal: ${ops[i][0]}`);if(Z.hits<3)later(()=>{Z.lap++;sayIt(PLAIN[Math.min(Z.lap,2)][0]+' Say it literally.')},1300)}
function keys(){if(!ctl)return;ctl.innerHTML='';const m=phase();if(m==='quiz'||Z.hits>=need())return;
 const K=(t,l,f)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l},ctl,t);b.onclick=f};
 if(m==='sort'){K('🔍 Literal','Put the sentence in Literal',()=>sortTo(0));K('💭 Figurative','Put the sentence in Figurative',()=>sortTo(1))}
 if(m==='match'){const set=IDIOMS[Z.lap%2];meanOrder().forEach(j=>{if(!Z.paired.includes(j))K(`Pick: ${set[j][1]}`,`Pick the meaning ${set[j][1]}`,()=>{Z.hold=j;sayIt(`Holding "${set[j][1]}". Now pick an idiom.`);keys();A.redraw()})});
  if(Z.hold>=0)set.forEach(([idi],i)=>{if(!Z.paired.includes(i))K(`→ "${idi}"`,`Give it to the idiom ${idi}`,()=>pair(Z.hold,i))})}
 if(m==='build'&&!Z.built)JOIN.forEach((t,i)=>K(t,'Join with '+t,()=>join(i)));
 if(m==='clue'&&Z.tapped.length<2)CLUES[Z.lap%3][0].forEach((t,k)=>{if(!Z.tapped.includes(k))K(t,'Tap the words: '+t,()=>clue(k))});
 if(m==='plain'&&Z.hits<=Z.lap)PLAIN[Math.min(Z.lap,2)][1].forEach(([t],i)=>K(String.fromCharCode(65+i),t,()=>plain(i)))}
function down(p){const m=phase();if(m==='quiz'||Z.hits>=need())return false;
 if(m==='sort'&&within(p,card())){Z.drag={x:null,x0:p.x,y0:p.y};return true}
 if(m==='sort'){const k=[0,1].find(j=>within(p,bins()[j]));if(k!=null)sortTo(k)}
 if(m==='match'){const ord=meanOrder(),j=[0,1,2].find(j=>!Z.paired.includes(ord[j])&&within(p,rightCol(j)));if(j!=null){Z.drag={i:ord[j],x:null,x0:p.x,y0:p.y};return true}
  const i=[0,1,2].find(i=>within(p,leftCol(i)));if(i!=null&&Z.hold>=0)pair(Z.hold,i)}
 if(m==='build'){const i=[0,1,2].find(i=>within(p,joinBtn(i)));if(i!=null)join(i)}
 if(m==='clue'){const k=flow().findIndex(r=>within(p,r));if(k>=0)clue(k)}
 if(m==='plain'){const i=[0,1,2].find(i=>within(p,plainBtn(i)));if(i!=null)plain(i)}return false}
function move(p){if(!Z.drag)return;if(Z.drag.x!=null||Math.hypot(p.x-Z.drag.x0,p.y-Z.drag.y0)>8){Z.drag.x=p.x;Z.drag.y=p.y;A.redraw()}}
function up(p){const d=Z.drag;Z.drag=null;if(!d)return;const m=phase();
 if(m==='sort'){if(d.x==null){Z.hold=0;sayIt('Now tap Literal or Figurative.');return A.redraw()}const k=[0,1].find(j=>within(p,bins()[j]));if(k!=null)sortTo(k);return A.redraw()}
 if(d.x==null){Z.hold=d.i;keys();sayIt(`Holding "${IDIOMS[Z.lap%2][d.i][1]}". Now tap an idiom.`);return A.redraw()}const i=[0,1,2].find(i=>within(p,leftCol(i)));if(i!=null)pair(d.i,i);A.redraw()}
const ready=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function auto(list,ms){const k=++gen;list.forEach((f,j)=>setTimeout(()=>{if(k===gen)f()},instant()?j*40+30:(j+1)*(ms||600)))}
const begin=x=>{gen++;Object.assign(Z,empty(),x||{});keys()};
const steps=[
{h:'Literal or figurative?',p:'Literal words mean just what they say. Figurative words mean something else. Drag each sentence to a box, or tap a button.',predict:{q:'Can the same words be literal in one sentence and figurative in another?',opts:['No, a phrase is always one or the other','Yes, the rest of the sentence decides'],ans:1},task:'Sort 6 sentences',
 show:()=>{steps[0].go();Z.demo=1;auto(SORTS.map(s=>()=>sortTo(s[1])),450)},go:()=>{begin();sayIt('Literal or figurative? '+SORTS[0][0]);Z.cb=ready(0,()=>Z.hits>=6,'Context decides: "on fire" is literal for a log and figurative for Priya.')}},
{h:'Idioms',p:'An idiom is a saying whose meaning is not the meaning of its words. Drag each meaning to its idiom, or pick a meaning, then an idiom.',task:'Match 6 idioms',
 show:()=>{steps[1].go();Z.demo=1;auto([0,1,2,'w','w',0,1,2].map(i=>i==='w'?()=>{}:()=>pair(i,i)),500)},go:()=>{begin();sayIt('Match each idiom to what it means.');Z.cb=ready(1,()=>Z.hits>=6,'You learn idioms by meeting them, not by picturing the words.')}},
{h:'Simile or metaphor',p:'Both compare two things. A simile uses like or as. A metaphor says one thing IS the other. Pick the joining word.',predict:{q:'"Her smile was sunshine." Is that a simile?',opts:['Yes, it compares two things','No, there is no like or as, so it is a metaphor'],ans:1},task:'Build 4 comparisons',
 show:()=>{steps[2].go();Z.demo=1;auto(BUILD.map(b=>()=>join(b[2]==='metaphor'?1:0)).flatMap(f=>[f,()=>{},()=>{}]),520)},go:()=>{begin();sayIt('Make a metaphor: the classroom and a zoo.');Z.cb=ready(2,()=>Z.hits>=4,'Like or as makes a simile; is or was makes a metaphor.')}},
{h:'Context clues',p:'The purple words are figurative. Tap the 2 nearby clues that show what they mean.',task:'Solve 3 passages',
 show:()=>{steps[3].go();Z.demo=1;auto([0,1,2].flatMap(()=>[()=>clue(CLUES[Z.lap%3][2][0]),()=>clue(CLUES[Z.lap%3][2][1]),()=>{},()=>{}]),420)},go:()=>{begin();sayIt('Sam had butterflies in his stomach. Tap the clues.');Z.cb=ready(3,()=>Z.hits>=3,'The words around a phrase tell you what it really means.')}},
{h:'Say it literally',p:'Swap the figurative phrase for plain words that keep the meaning. Tap A, B or C.',task:'Rewrite 3 sentences',
 show:()=>{steps[4].go();Z.demo=1;auto([0,1,2].flatMap(()=>[()=>plain(PLAIN[Math.min(Z.lap,2)][1].findIndex(o=>o[1]==='ok')),()=>{},()=>{}]),500)},go:()=>{begin();sayIt(PLAIN[0][0]+' Say it literally.');Z.cb=ready(4,()=>Z.hits>=3,'A literal rewrite keeps the meaning and drops the picture.')}},
{h:'Challenge',p:'',go:()=>{begin();pose()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.cb()});
const BANK=[['"Jo has a heart of gold." What does it mean?',[['Jo is very kind','ok'],['Jo\'s heart is made of gold','word'],['Jo is rich','miss']]],
 ['Which sentence is literal?',[['The cat sat on the mat.','ok'],['The test was a breeze.','fig'],['He has ants in his pants.','fig']]],
 ['"The baby slept like a log." Simile or metaphor?',[['Simile: it uses like','ok'],['Metaphor','swap'],['Literal: babies are logs','word']]],
 ['"Time is a thief." What kind of figurative language?',[['Metaphor: time IS a thief','ok'],['Simile','swap2'],['Literal','word']]],
 ['"I\'m so hungry I could eat a horse." What does the speaker mean?',[['They are very hungry','ok'],['They want horse for tea','word'],['They are full','miss']]],
 ['"Ella\'s room was a pigsty. Clothes covered the floor." What do the clues tell you?',[['Her room was very messy','ok'],['Pigs lived in her room','word'],['Her room was clean and tidy','miss']]]];
function why(t){let m='Ask: could this really happen, word for word? If not, it is figurative.';
 if(t==='word')m='That takes the words one by one. Figurative language means something else.';
 if(t==='miss')m='That changes the meaning. Use the context to find what is really meant.';
 if(t==='fig')m='That one cannot be true word for word, so it is figurative.';
 if(t==='swap')m='It uses like, so it is a simile, not a metaphor.';
 if(t==='swap2')m='There is no like or as. Saying time IS a thief makes it a metaphor.';
return m}
function pose(){qi++;const item=BANK[qi%BANK.length];let[q,ops]=item;const r=qi%3;
 qbox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qbox.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>grade(t)});sayIt('Challenge: '+q);A.redraw()}
function grade(t){qbox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qbox.querySelector('.fl-fb'),right=t==='ok';
 if(right){inRow++;A.win()}else{inRow=0;A.sound.miss()}
 fb.innerHTML=`${right?`✓ Correct. Streak: ${inRow}.`:'✗ '+why(t)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}
A=FK.shell(c,{steps,ratio:.64,tall:1.25,draw,onStep:A=>{qbox.hidden=A.step!==5;ctl.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);qbox=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});keys()}});
A.start()})})();
