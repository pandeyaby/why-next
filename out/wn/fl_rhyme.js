/* Flagship – rhyming words (ages 4–6; CCSS RF.K.2.a; NC England Y1 reading; EYFS "spot and suggest rhymes").
   Cat train (same end sound), odd one out, close-but-not-a-rhyme (bed, bell), rhymes at line ends (bear, chair: sound not
   spelling), two-beat rhymes (honey, money). Not flagrime (onset + rime building) or flagbyheart (reciting by heart). */
(()=>{
const P={cat:'🐱',hat:'🎩',car:'🚗',bat:'🦇',cup:'☕',rat:'🐀',dog:'🐶',bee:'🐝',tree:'🌳',bus:'🚌',frog:'🐸',log:'🪵',fish:'🐟',cake:'🎂',snake:'🐍',kite:'🪁',
 fox:'🦊',box:'📦',duck:'🦆',bed:'🛏️',bread:'🍞',bell:'🔔',sled:'🛷',web:'🕸️',red:'🟥',honey:'🍯',money:'💰',kitten:'🐈',mitten:'🧤',flower:'🌸',tower:'🗼',hammer:'🔨'};
const cap=w=>w[0].toUpperCase()+w.slice(1);
const TRAIN=['hat','car','bat','cup','rat','dog'],RIDE=['hat','bat','rat'];
const TMISS={car:'Car starts like cat, but listen to the ends: c-ar, c-at. Different ends, so no rhyme.',
 cup:'Cup starts like cat too, but ends in up, not at. Same start is not a rhyme.',dog:'Dog ends in og. Cat ends in at. Say them: d-og, c-at. No rhyme.'};
const ODD=[[['bee','tree','bus'],2,'Bee and tree both end in ee.'],[['frog','log','fish'],2,'Frog and log both end in og.'],[['cake','kite','snake'],1,'Cake and snake both end in ake.'],[['fox','duck','box'],1,'Fox and box both end in ox.']];
const NEAR=['bread','bell','sled','web','red'],NRHY=['bread','sled','red'];
const NMISS={bell:'Bell starts with b, like bed, and has the same e in the middle. But it ends in ll, not d: b-ell, b-ed. Close is not a rhyme.',
 web:'Web has an e in the middle too, but ends in b, not d. The whole end must match.'};
const POEM=[[['A','big','brown','bear'],['sat','on','a','chair']],[['A','little','red','fox'],['hid','in','a','box']],[['A','shaggy','old','goat'],['rowed','a','blue','boat']]];
const SPELL=['Bear and chair: different letters at the end, but the same end sound, air. Rhyme is about sound.','Fox and box both end in ox.','Goat and boat both end in oat.'];
const LEFT=['honey','kitten','flower'],RIGHT=['mitten','hammer','tower','money'],MATE={honey:'money',kitten:'mitten',flower:'tower'};
const TAIL={honey:'oney',money:'oney',kitten:'itten',mitten:'itten',flower:'ower',tower:'ower',hammer:'ammer'};
VIS.reg('flagrhyme',c=>{let A,pad,quiz,qi=-1,run=0;const S={};c.fig.classList.add('young');
const INK='#0f172a',OK='#047857',NO='#b91c1c',LINE='#64748b',PICK='#6d28d9',TAU=Math.PI*2,FT='px system-ui,sans-serif';
const part=()=>['train','odd','near','poem','long','quiz'][A.step];
const fz=n=>A.narrow?n:Math.round(n*1.2);
function speak(w,live){if(!live)return;try{const s=window.speechSynthesis;if(s&&window.SpeechSynthesisUtterance){s.cancel();const u=new SpeechSynthesisUtterance(w);u.rate=.8;s.speak(u)}}catch(e){}}
function bg(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#fef3c7',A.col.dark?.06:.55);g.fillRect(0,0,A.W,A.H)}
function label(t,x,y,o){o=o||{};const g=A.ctx;let n=fz(o.n||15);g.font=`800 ${n}${FT}`;let w=g.measureText(t).width+22;
 while(w>A.W-10&&n>10){n--;g.font=`800 ${n}${FT}`;w=g.measureText(t).width+22}
 const h=n+16,l=Math.max(5,Math.min(A.W-w-5,x-w/2));g.fillStyle='#ffffff';A.paint.rrect(l,y-h/2,w,h,12);g.fill();g.lineWidth=o.ok||o.bad?3:1.5;g.strokeStyle=o.ok?OK:o.bad?NO:LINE;g.stroke();
 g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,l+w/2,y+1)}
function card(r,w,o){o=o||{};const g=A.ctx;g.fillStyle=o.dim?'#e2e8f0':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.lineWidth=o.ok||o.bad||o.sel?4:2;g.strokeStyle=o.ok?OK:o.bad?NO:o.sel?PICK:LINE;g.stroke();
 const e=Math.min(r.h*.46,r.w*.5);g.font=`${Math.round(e)}${FT}`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText(P[w],r.x+r.w/2,r.y+r.h*.4);
 g.font=`800 ${Math.round(Math.max(12,Math.min(fz(17),r.h*.2)))}${FT}`;g.fillStyle=o.dim?'#334155':INK;g.fillText(w,r.x+r.w/2,r.y+r.h*.83,r.w-6);
 if(o.ok||o.bad){g.fillStyle=o.ok?OK:NO;g.beginPath();g.arc(r.x+r.w-13,r.y+13,11,0,TAU);g.fill();g.fillStyle='#ffffff';g.font='900 13px system-ui,sans-serif';g.fillText(o.ok?'✓':'✗',r.x+r.w-13,r.y+14)}}
function grid(n,cols,y0,y1){const gap=10,rows=Math.ceil(n/cols),w=Math.min(150,(A.W-gap*(cols+1))/cols),h=Math.min(w*1.05,(y1-y0-gap*(rows-1))/rows),x0=(A.W-(w*cols+gap*(cols-1)))/2;
 return [...Array(n)].map((_,i)=>({i,x:x0+(i%cols)*(w+gap),y:y0+Math.floor(i/cols)*(h+gap),w,h}))}
const inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* 1. the cat train */
const trainR=()=>({x:8,y:A.H*.13,w:A.W-16,h:A.H*.3});
function seatR(k){const T=trainR(),w=(T.w-16)/4;return{x:T.x+8+k*w+3,y:T.y+T.h*.1,w:w-6,h:T.h*.78}}
const trainCards=()=>grid(6,3,A.H*.52,A.H*.98);
function drawTrain(){const g=A.ctx,T=trainR(),s=S.t;bg();label(s.on.length>=3?'All aboard: hat, bat and rat':'Only words that rhyme with cat can ride',A.W/2,A.H*.06,{n:13,ok:s.on.length>=3});
 g.fillStyle=A.col.dark?'#334155':'#fde68a';A.paint.rrect(T.x,T.y,T.w,T.h,16);g.fill();g.fillStyle='#1e293b';
 for(let k=0;k<4;k++){const r=seatR(k);[.25,.75].forEach(f=>{g.beginPath();g.arc(r.x+r.w*f,T.y+T.h,A.narrow?7:10,0,TAU);g.fill()})}
 card(seatR(0),'cat',{sel:1});for(let k=1;k<4;k++){const w=s.on[k-1],r=seatR(k);if(w)card(r,w,{ok:1});else{g.setLineDash([6,5]);g.strokeStyle=A.col.dark?'#e2e8f0':'#475569';g.lineWidth=2;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke();g.setLineDash([])}}
 trainCards().forEach(r=>{const w=TRAIN[r.i];if(s.on.includes(w)||(S.drag&&S.drag.i===r.i))return;card(r,w,{bad:s.bad===w})});
 if(S.drag){const d=S.drag,r=trainCards()[d.i];card({x:d.x-r.w/2,y:d.y-r.h/2,w:r.w,h:r.h},TRAIN[d.i],{sel:1})}}
function board(i,live){const s=S.t,w=TRAIN[i];if(s.on.includes(w))return;speak(w,live);
 if(!RIDE.includes(w)){s.bad=w;A.sound.miss();return say(TMISS[w])}
 s.on.push(w);s.bad=null;A.sound.pop();say(`${cap(w)} and cat end the same: ${w[0]}-at, c-at. ${cap(w)} can ride.`+(s.on.length>=3?' Three rhymes on board. Rhyming words have the same end sound.':` ${s.on.length} of 3 on board.`))}
/* 2. odd one out */
const oddCards=()=>grid(3,3,A.H*.24,A.H*.78);
function drawOdd(){const s=S.o,g=A.ctx;bg();const set=ODD[Math.min(s.k,3)];label(s.k>=4?'All 4 found':`Set ${s.k+1} of 4: which one does not rhyme?`,A.W/2,A.H*.08,{n:14,ok:s.k>=4});
 if(s.k<4)oddCards().forEach(r=>card(r,set[0][r.i],{bad:s.bad===r.i}));
 else{g.font=`800 ${fz(16)}${FT}`;g.fillStyle=A.col.tx;g.textAlign='center';g.textBaseline='middle';['bee tree · frog log','cake snake · fox box'].forEach((t,j)=>g.fillText(t,A.W/2,A.H*(.42+j*.14)))}
 label(s.k<4?'Say all three. Listen to the ends':'Two in each set rhymed. One did not',A.W/2,A.H*.9,{n:12,ok:s.k>=4})}
function pickOdd(i,live){const s=S.o;if(s.k>=4)return;const [ws,odd,why]=ODD[s.k];speak(ws[i],live);
 if(i!==odd){s.bad=i;A.sound.miss();return say(`${cap(ws[i])} rhymes with one of the others. ${why} Which one has a different end sound?`)}
 s.k++;s.bad=-1;A.sound.pop();say(`Yes, ${ws[odd]} is the odd one out. ${why} ${cap(ws[odd])} does not.`+(s.k>=4?' All 4 found.':''))}
/* 3. close is not a rhyme */
const nearCards=()=>grid(5,A.narrow?3:5,A.H*.42,A.H*.97);
const bedR=()=>{const h=A.H*.28,w=h*.95;return{x:A.W/2-w/2,y:A.H*.1,w,h}};
function drawNear(){const s=S.n;bg();label(`Rhymes with bed: ${s.got.length} of 3`,A.W/2,A.H*.05,{n:13,ok:s.got.length>=3});card(bedR(),'bed',{sel:1});
 nearCards().forEach(r=>{const w=NEAR[r.i];card(r,w,{ok:s.got.includes(w),bad:s.bad===w})})}
function pickNear(i,live){const s=S.n,w=NEAR[i];if(s.got.includes(w)||s.got.length>=3)return;speak(w,live);
 if(!NRHY.includes(w)){s.bad=w;A.sound.miss();return say(NMISS[w])}
 s.got.push(w);s.bad=null;A.sound.pop();say(`${cap(w)}, bed: both end in ed. That is a rhyme.`+(s.got.length>=3?' Bread, sled and red all rhyme with bed. Bell and web were close, but their ends are different.':''))}
/* 4. rhymes in a poem */
function poemRects(){const g=A.ctx,n=fz(A.narrow?17:20),out=[];g.font=`800 ${n}${FT}`;
 POEM[Math.min(S.p.k,2)].forEach((line,l)=>{const ws=line.map(w=>g.measureText(w).width+20),tot=ws.reduce((a,b)=>a+b,0)+8*(line.length-1);let x=(A.W-tot)/2;const y=A.H*(.36+l*.22);
  line.forEach((w,j)=>{out.push({l,j,w,x,y:y-(n+16)/2,ww:ws[j],h:n+16,n});x+=ws[j]+8})});return out}
function drawPoem(){const s=S.p,g=A.ctx;bg();label(s.k>=3?'3 rhymes found':`Rhyme ${s.k+1} of 3: tap the two words that rhyme`,A.W/2,A.H*.08,{n:13,ok:s.k>=3});
 if(s.k>=3){label('bear, chair · fox, box · goat, boat',A.W/2,A.H*.45,{n:15,ok:1});label('Rhymes often sit at the ends of lines',A.W/2,A.H*.62,{n:13});return}
 poemRects().forEach(r=>{const sel=s.sel===r.l&&r.j===3,bad=s.bad&&s.bad[0]===r.l&&s.bad[1]===r.j;g.fillStyle=sel?'#ede9fe':'#ffffff';A.paint.rrect(r.x,r.y,r.ww,r.h,10);g.fill();
  g.lineWidth=sel||bad?3:1.5;g.strokeStyle=sel?PICK:bad?NO:LINE;g.stroke();g.fillStyle=INK;g.font=`800 ${r.n}${FT}`;g.textAlign='center';g.textBaseline='middle';g.fillText(r.w,r.x+r.ww/2,r.y+r.h/2+1)});
 g.font=`${fz(30)}${FT}`;g.textAlign='center';g.fillStyle='#000';const pc=POEM[s.k];g.fillText({bear:'🐻',fox:'🦊',goat:'🐐'}[pc[0][3]]+' '+({chair:'🪑',box:'📦',boat:'⛵'}[pc[1][3]]),A.W/2,A.H*.82)}
function pickWord(l,j,live){const s=S.p;if(s.k>=3)return;const pc=POEM[s.k],w=pc[l][j];speak(w,live);
 if(j!==3){s.bad=[l,j];A.sound.miss();const twin=pc.flat().find(v=>v!==w&&v.length>1&&v[0]===w[0]);
  return say(twin?`${cap(w)} starts like ${twin}, but that is not a rhyme. Rhyming words end the same. Try the last word of each line.`:`${cap(w)} does not rhyme with another word here. Try the last word of each line.`)}
 s.bad=null;if(s.sel==null||s.sel===l){s.sel=l;A.sound.tick();return say(`${cap(w)}. Now find the word that rhymes with ${w}.`)}
 s.sel=null;s.k++;A.sound.pop();say(`Yes: ${pc[0][3]} and ${pc[1][3]}. ${SPELL[s.k-1]}`+(s.k>=3?' All 3 found.':''))}
/* 5. long words rhyme too */
function longRects(){const h=Math.min(A.H*.21,(A.H*.84-30)/4),w=Math.min(150,A.W*.36);return{L:LEFT.map((v,i)=>({i,x:A.W*.06,y:A.H*.14+i*(h*1.33),w,h})),R:RIGHT.map((v,i)=>({i,x:A.W*.94-w,y:A.H*.14+i*(h+8),w,h}))}}
function drawLong(){const s=S.l,g=A.ctx,{L,R}=longRects();bg();label(`Match the rhymes: ${Object.keys(s.pair).length} of 3`,A.W/2,A.H*.06,{n:13,ok:s.done});
 L.forEach(r=>{const w=LEFT[r.i],m=s.pair[w];if(m){const t=R[RIGHT.indexOf(m)];g.strokeStyle=OK;g.lineWidth=4;g.beginPath();g.moveTo(r.x+r.w,r.y+r.h/2);g.lineTo(t.x,t.y+t.h/2);g.stroke()}});
 L.forEach(r=>{const w=LEFT[r.i];if(S.drag&&S.drag.i===r.i)return;card(r,w,{ok:!!s.pair[w],sel:s.sel===r.i})});
 R.forEach(r=>{const w=RIGHT[r.i];card(r,w,{ok:Object.values(s.pair).includes(w),bad:s.bad===w})});
 if(S.drag){const d=S.drag,r=L[d.i];card({x:d.x-r.w/2,y:d.y-r.h/2,w:r.w,h:r.h},LEFT[d.i],{sel:1})}}
function pickLeft(i,live){const s=S.l;if(s.pair[LEFT[i]])return;s.sel=i;speak(LEFT[i],live);A.sound.tick();say(`${cap(LEFT[i])} picked. Now pick the word that rhymes.`)}
function join(i,j,live){const s=S.l;if(i==null)i=s.sel;if(i==null||i<0)return say('Tap a word on the left first.');const a=LEFT[i],b=RIGHT[j];if(s.pair[a]||Object.values(s.pair).includes(b))return;speak(b,live);
 if(MATE[a]!==b){s.bad=b;s.sel=-1;A.sound.miss();return say(b==='hammer'&&a==='honey'?'Honey and hammer both start with h, but the ends are different: hon-ey, ham-mer. In long words, listen to the last part.':`${cap(a)} ends in ${TAIL[a]}, but ${b} ends in ${TAIL[b]}. Find the word with the same end.`)}
 s.pair[a]=b;s.sel=-1;s.bad=null;A.sound.pop();if(Object.keys(s.pair).length>=3)s.done=1;
 say(`${cap(a)} and ${b} rhyme: both end in ${TAIL[a]}. The starts are different, but the ends are the same.`+(s.done?' Hammer was left over: it starts like honey but does not rhyme with any of them.':''))}
function draw(){const k=part();if(k==='quiz'){bg();label('Challenge',A.W/2,A.H*.16,{ok:1});label('Rhyming words end with the same sound',A.W/2,A.H*.5,{n:15});return}
 ({train:drawTrain,odd:drawOdd,near:drawNear,poem:drawPoem,long:drawLong})[k]();A.fx.draw(A.ctx)}
function down(p){const k=part();
 if(k==='train'){const r=trainCards().find(r=>inR(p,r)&&!S.t.on.includes(TRAIN[r.i]));if(r){S.drag={i:r.i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}return false}
 if(k==='long'){const {L,R}=longRects(),l=L.find(r=>inR(p,r));if(l&&!S.l.pair[LEFT[l.i]]){S.drag={i:l.i,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}const r=R.find(r=>inR(p,r));if(r)join(null,r.i,1);return false}
 if(k==='odd'){const r=oddCards().find(r=>inR(p,r));if(r)pickOdd(r.i,1);return false}
 if(k==='near'){const r=nearCards().find(r=>inR(p,r));if(r)pickNear(r.i,1);return false}
 if(k==='poem'&&S.p.k<3){const r=poemRects().find(r=>p.x>=r.x&&p.x<=r.x+r.ww&&p.y>=r.y-6&&p.y<=r.y+r.h+6);if(r)pickWord(r.l,r.j,1)}return false}
function move(p){if(!S.drag)return;S.drag.x=p.x;S.drag.y=p.y;A.redraw()}
function up(p){const d=S.drag;if(!d)return;S.drag=null;const tap=Math.hypot(p.x-d.x0,p.y-d.y0)<10,k=part();
 if(k==='train'){if(tap||inR(p,trainR()))board(d.i,1);else A.redraw();return}
 if(k==='long'){if(tap)return pickLeft(d.i,1);const r=longRects().R.find(r=>inR(p,r));if(r){S.l.sel=d.i;join(d.i,r.i,1)}else A.redraw()}}
function fresh(){run++;for(const k in S)delete S[k];Object.assign(S,{t:{on:[],bad:null},o:{k:0,bad:-1},n:{got:[],bad:null},p:{k:0,sel:null,bad:null},l:{pair:{},sel:-1,bad:null,done:0},drag:null,hook:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.hook()}
const watch=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function open(i,desc,ok,msg){fresh();say(desc);S.hook=watch(i,ok,msg)}
function auto(i,acts,ms){steps[i].go();const r0=run;acts.forEach((f,j)=>setTimeout(()=>{if(r0===run)f()},ms*(j+1)))}
function buttons(){if(!pad)return;pad.innerHTML='';const k=part(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='train')TRAIN.forEach((w,i)=>{if(!S.t.on.includes(w)&&S.t.on.length<3)B(`${P[w]} ${w}`,()=>board(i,1),`Put ${w} on the cat train`)});
 if(k==='odd'&&S.o.k<4)ODD[S.o.k][0].forEach((w,i)=>B(`${P[w]} ${w}`,()=>pickOdd(i,1),`${w} is the odd one out`));
 if(k==='near'&&S.n.got.length<3)NEAR.forEach((w,i)=>{if(!S.n.got.includes(w))B(`${P[w]} ${w}`,()=>pickNear(i,1),`Does ${w} rhyme with bed?`)});
 if(k==='poem'&&S.p.k<3)POEM[S.p.k].forEach((line,l)=>line.forEach((w,j)=>B(w,()=>pickWord(l,j,1),`Line ${l+1}, word ${j+1}: ${w}`)));
 const L=S.l;if(k==='long'&&!L.done){if(L.sel<0)LEFT.forEach((a,i)=>{if(!L.pair[a])B(`${P[a]} ${a}`,()=>pickLeft(i,1),`Pick ${a}`)});else RIGHT.forEach((b,j)=>{if(!Object.values(L.pair).includes(b))B(`${LEFT[L.sel]} + ${b}`,()=>join(L.sel,j,1),`Does ${LEFT[L.sel]} rhyme with ${b}?`)})}}
const steps=[
{h:'The cat train',p:'Only words that rhyme with cat can ride. Drag a picture onto the train, or tap it. Say each word out loud.',
 predict:{q:'Cat and cup both start with c. Do they rhyme?',opts:['Yes, they start the same','No, their ends sound different'],ans:1},task:'Put 3 rhyming words on the train',
 show:()=>auto(0,[1,0,2,4].map(i=>()=>board(i)),700),
 go:()=>open(0,'A train with cat at the front and three empty seats. Six pictures: hat, car, bat, cup, rat, dog.',()=>S.t.on.length>=3,'Hat, bat and rat end in at, like cat. Car and cup start like cat, but that is not a rhyme.')},
{h:'Odd one out',p:'Two words rhyme. One does not. Say all three, then tap the one that does not rhyme.',task:'Find the odd one in all 4 sets',
 show:()=>auto(1,ODD.map(o=>()=>pickOdd(o[1])),650),
 go:()=>open(1,'Three pictures: bee, tree and bus. Two of them rhyme.',()=>S.o.k>=4,'Bus, fish, kite and duck were the odd ones out. The other words in each set shared an end sound.')},
{h:'Close is not a rhyme',p:'Which words rhyme with bed? Tap them. Watch out: some words sound close, but are not rhymes.',
 predict:{q:'Bell starts like bed and has the same middle sound. Does it rhyme with bed?',opts:['Yes, it sounds very close','No, the end is different'],ans:1},task:'Find all 3 words that rhyme with bed',
 show:()=>auto(2,[1,0,2,4].map(i=>()=>pickNear(i)),700),
 go:()=>open(2,'Bed at the top. Five pictures below: bread, bell, sled, web and red.',()=>S.n.got.length>=3,'Bread, sled and red end in ed, like bed. Bell has the same start and middle, but a rhyme needs the same end.')},
{h:'Rhymes in a poem',p:'Here is a little poem, two lines at a time. A grown-up reads it. Tap the two words that rhyme.',
 predict:{q:'Bear and chair end with different letters. Can they rhyme?',opts:['No, the letters are different','Yes, if the end sound is the same'],ans:1},task:'Find the rhyme in all 3 parts',
 show:()=>auto(3,[0,1,2].flatMap(()=>[()=>pickWord(0,3),()=>pickWord(1,3)]),550),
 go:()=>open(3,'A poem: A big brown bear sat on a chair.',()=>S.p.k>=3,'The rhymes were at the ends of the lines. Bear and chair are spelt differently, but they sound the same at the end.')},
{h:'Long words rhyme too',p:'Drag each word on the left to the word that rhymes with it, or tap one, then the other.',task:'Match all 3 rhyming pairs',
 show:()=>auto(4,[()=>join(0,3),()=>join(1,0),()=>join(2,2)],700),
 go:()=>open(4,'Honey, kitten and flower on the left. Mitten, hammer, tower and money on the right.',()=>S.l.done,'Honey and money, kitten and mitten, flower and tower. In long words, the last part must sound the same.')},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.hook()});
const QS=[
 {q:'Which word rhymes with cat?',a:'hat',o:[['cup','start'],['kitten','mean']]},
 {q:'Do sun and sock rhyme?',a:'No, only the start is the same',o:[['Yes, both start with s','start'],['Yes, they are both short words','any']]},
 {q:'Which word rhymes with bed?',a:'red',o:[['bell','near'],['bad','near']]},
 {q:'Bear and chair have different letters. Do they rhyme?',a:'Yes, they end with the same sound',o:[['No, the letters are different','spell'],['No, a bear is not a chair','mean']]},
 {q:'Which word rhymes with kitten?',a:'mitten',o:[['kettle','start'],['cat','mean']]},
 {q:'Frog, log, fish. Which one does not rhyme?',a:'fish',o:[['frog','start'],['log','any']]}];
function why(t){let m='Rhyming words have the same end sound. Say both words and listen to the end.';
 if(t==='start')m='Those two start the same. That is not a rhyme. Rhyming words end the same: c-at, h-at.';
 if(t==='near')m='Close, but listen to the very end. Bed and bell share a start and a middle, but not an end.';
 if(t==='spell')m='Rhyme is about sound, not letters. Say them: bear, chair. Both end in air.';
 if(t==='mean')m='Those words are about the same thing, but rhyme is about sound, not meaning. Cat and kitten do not end the same.';
 if(t==='any')m='Being short, or being in the same list, does not make a rhyme. Listen for the same end sound.';
 return m}
function ask(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:B=>{quiz.hidden=B.step!==5;pad.hidden=B.step===5;buttons()},
 init:B=>{A=B;const wrap=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Rhyming word buttons'},wrap);quiz=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});buttons()}}).start()})})();
