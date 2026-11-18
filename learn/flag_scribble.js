/* Flagship – giving meaning to marks (ages 3–4; Development Matters 2021 Literacy: birth–3 "add some marks to their
   drawings, which they give meaning to, for example 'That says mummy'"; 3–4 "use some of their print and letter
   knowledge in their early writing", "write some or all of their name", and the concepts about print: print has
   meaning, print has different purposes, we read English left to right and top to bottom). Five scenes: draw marks
   with a finger and say what they mean, sort pictures from writing, give each kind of paper to the place that needs it,
   write Sam's name from its letters in order, and read a list top to bottom and a card left to right, then check that
   the list still says the same. Not flagmarks. Data in learn/scribble_art.js. */
(()=>{const {MEAN,SQUIG,CARDS,BINS,JOBS,PAPER,NAME,LETTERS,LIST,CARD,NEXT,QS}=SCRB;
VIS.reg('flagscribble',c=>{let A,bar,ask,qn=-1,run=0;const M={};c.fig.classList.add('young');
const PEN='#1e1b4b',OKC='#047857',BADC='#b91c1c',LINE='#6b7280',PICK='#7c3aed',CRAY=['#2563eb','#db2777','#059669'],TYPE='px system-ui,sans-serif';
const where=()=>['draw','sort','jobs','name','read','quiz'][A.step];
const fit=n=>A.narrow?n:Math.round(n*1.15);
function desk(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#e0e7ff',A.col.dark?.07:.5);g.fillRect(0,0,A.W,A.H)}
function note(t,x,y,o){o=o||{};const g=A.ctx;let n=fit(o.n||14);g.font=`800 ${n}${TYPE}`;let w=g.measureText(t).width+26;
 while(w>A.W-10&&n>10){n--;g.font=`800 ${n}${TYPE}`;w=g.measureText(t).width+26}
 const h=n+16,l=Math.max(5,Math.min(A.W-w-5,x-w/2));g.fillStyle=o.bg||'#ffffff';A.paint.rrect(l,y-h/2,w,h,10);g.fill();
 g.lineWidth=o.ok||o.no?3:1.5;g.strokeStyle=o.ok?OKC:o.no?BADC:LINE;g.stroke();g.fillStyle=PEN;g.textAlign='center';g.textBaseline='middle';g.fillText(t,l+w/2,y+1)}
function sheet(r,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.lineWidth=o.ok||o.no||o.on?4:2;g.strokeStyle=o.no?BADC:o.ok?OKC:o.on?PICK:LINE;g.stroke()}
function words(t,x,y,n,col,hand,mw){const g=A.ctx;g.fillStyle=col||PEN;g.font=`${hand?'italic 700':'900'} ${Math.round(n)}${hand?'px "Comic Sans MS","Comic Neue",cursive,sans-serif':TYPE}`;g.textAlign='center';g.textBaseline='middle';g.fillText(t,x,y,mw||A.W)}
function grid(n,top,h,per){per=per||n;const gap=10,w=Math.min(160,(A.W-gap*(per+1))/per),x0=(A.W-(w*per+gap*(per-1)))/2;return Array.from({length:n},(_,i)=>({i,x:x0+(i%per)*(w+gap),y:top+Math.floor(i/per)*(h+gap),w,h}))}
const cap=t=>t[0].toUpperCase()+t.slice(1),on=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* 1. draw, then say what it means */
const padR=()=>({x:A.W*.06,y:A.H*.14,w:A.W*.88,h:A.H*.46}),meanR=()=>grid(3,A.H*.68,A.H*.26);
function drawDraw(){const s=M.a,g=A.ctx,r=padR();desk();
 if(s.r>=2){note('2 papers, 2 meanings',A.W/2,A.H*.1,{ok:1});s.said.forEach((m,j)=>note(`Your marks say: ${MEAN[m][0]} ${MEAN[m][1]}`,A.W/2,A.H*(.36+j*.2),{n:14}));return}
 note(s.mean!=null?`Your marks say: ${MEAN[s.mean][1]}`:s.ink.length?'What do your marks say? Tap one':`Paper ${s.r+1} of 2: drag your finger to make marks`,A.W/2,A.H*.06,{n:13,ok:s.mean!=null});
 sheet(r,{no:s.bad});g.lineCap='round';g.lineJoin='round';
 s.ink.forEach((st,k)=>{g.strokeStyle=CRAY[k%3];g.lineWidth=Math.max(4,A.W*.012);g.beginPath();st.forEach(([u,v],j)=>{const x=r.x+u*r.w,y=r.y+v*r.h;j?g.lineTo(x,y):g.moveTo(x,y)});g.stroke()});
 meanR().forEach((b,j)=>{sheet(b,{ok:s.mean===j,on:false});words(MEAN[j][0],b.x+b.w/2,b.y+b.h*.32,Math.min(b.h*.34,34));const g2=A.ctx;g2.font=`800 ${Math.round(Math.max(13,Math.min(fit(16),b.w*.16)))}${TYPE}`;g2.fillStyle=PEN;g2.fillText(MEAN[j][2],b.x+b.w/2,b.y+b.h*.76,b.w-8)})}
const inkLen=s=>s.ink.reduce((t,st)=>t+st.length,0);
function scribble(){const s=M.a;if(s.r>=2||s.mean!=null)return;const off=s.ink.length*.12;s.ink.push(SQUIG.map(([u,v])=>[u,Math.min(.9,Math.max(.1,v+off-.1))]));A.sound.pop();s.bad=0;tell('You made some marks. Now say what they mean: tap a picture.')}
function mean(j){const s=M.a;if(s.r>=2)return;if(s.mean!=null)return nextPaper();
 if(inkLen(s)<6){s.bad=1;A.sound.miss();return tell('Make some marks first. Drag your finger on the paper, or tap Make marks.')}
 s.mean=j;s.said.push(j);s.bad=0;A.sound.pop();tell(`Your marks say: ${MEAN[j][1]}. Marks can mean something. Tap Next paper.`)}
function nextPaper(){const s=M.a;s.r++;s.ink=[];s.mean=null;tell(s.r>=2?'Two papers, and each one means something. That is the start of writing.':'A new paper. Make marks for something different.')}
/* 2. picture or writing? */
const binR=()=>grid(2,A.H*.1,A.H*.3),cardR=()=>grid(6,A.H*.48,A.narrow?A.H*.2:A.H*.22,3);
function face(r,k,o){const [e,t]=CARDS[k];sheet(r,o);if(e)words(e,r.x+r.w/2,r.y+r.h/2,Math.min(r.h*.55,40));else words(t,r.x+r.w/2,r.y+r.h/2,Math.min(r.h*.38,r.w*.3,fit(22)),PEN,1,r.w-8)}
function drawSort(){const s=M.b,g=A.ctx;desk();
 binR().forEach((r,k)=>{sheet(r,{on:s.hot===k,bg:k?'#fef3c7':'#dbeafe'});words(BINS[k][0]+' '+BINS[k][1],r.x+r.w/2,r.y+r.h*.18,fit(15));
  s.in.filter(i=>CARDS[i][2]===k).forEach((i,j)=>{const w=r.w/3.4;face({x:r.x+8+j*(w+6),y:r.y+r.h*.38,w,h:r.h*.5},i,{})})});
 cardR().forEach(r=>{if(s.in.includes(r.i)||(M.drag&&M.drag.i===r.i))return;face(r,r.i,{no:s.bad===r.i,on:s.pick===r.i})});
 if(M.drag){const d=M.drag,r=cardR()[d.i];face({x:d.x-r.w/2,y:d.y-r.h/2,w:r.w,h:r.h},d.i,{on:1})}
 note(s.in.length>=6?'All 6 sorted: writing is small marks in a line':'Picture or writing? Drag each card',A.W/2,A.H*.04,{n:12,ok:s.in.length>=6})}
function file(i,k){const s=M.b;if(s.in.includes(i))return;s.pick=null;
 if(CARDS[i][2]!==k){s.bad=i;A.sound.miss();return tell(CARDS[i][2]?`${CARDS[i][1]} is writing: small marks in a line, like letters. It goes in Writing.`:'That is a picture of a thing. Writing is small marks in a line.')}
 s.in.push(i);s.bad=-1;A.sound.pop();tell((CARDS[i][2]?`${CARDS[i][1]}: writing.`:'A picture.')+(s.in.length>=6?' All 6 sorted.':''))}
/* 3. every paper has a job */
const placeR=()=>grid(4,A.H*.08,A.narrow?A.H*.18:A.H*.3,A.narrow?2:4),docR=()=>grid(4,A.narrow?A.H*.56:A.H*.56,A.narrow?A.H*.18:A.H*.34,A.narrow?2:4).map((r,j)=>({...r,i:[2,0,3,1][j]}));
function doc(r,i,o){sheet(r,o);const L=PAPER[JOBS[i][2]],n=Math.min(r.h/(L.length+1.6),fit(18));L.forEach((t,j)=>words(t,r.x+r.w/2,r.y+r.h*.3+j*n*1.25,n,PEN,1));const g=A.ctx;g.font=`700 ${Math.round(Math.max(10,n*.6))}${TYPE}`;g.fillStyle=LINE;g.fillText(JOBS[i][2],r.x+r.w/2,r.y+r.h-9)}
function drawJobs(){const s=M.c;desk();note(s.got.length>=4?'Every paper has a job':'Drag each paper to who needs it',A.W/2,A.H*.03,{n:12,ok:s.got.length>=4});
 placeR().forEach(r=>{sheet(r,{ok:s.got.includes(r.i),on:s.hot===r.i});words(JOBS[r.i][0],r.x+r.w/2,r.y+r.h*.36,Math.min(r.h*.4,34));const g=A.ctx;g.font=`800 ${Math.round(Math.max(11,Math.min(fit(13),r.w*.11)))}${TYPE}`;g.fillStyle=PEN;g.fillText((s.got.includes(r.i)?'✓ ':'')+JOBS[r.i][1],r.x+r.w/2,r.y+r.h*.78,r.w-8)});
 docR().forEach(r=>{if(s.got.includes(r.i)||(M.drag&&M.drag.i===r.i))return;doc(r,r.i,{no:s.bad===r.i,on:s.pick===r.i,bg:'#fefce8'})});
 if(M.drag){const d=M.drag,r=docR().find(q=>q.i===d.i);doc({x:d.x-r.w/2,y:d.y-r.h/2,w:r.w,h:r.h},d.i,{on:1,bg:'#fefce8'})}}
function give(i,k){const s=M.c;if(s.got.includes(i))return;s.pick=null;
 if(i!==k){s.bad=i;A.sound.miss();return tell(`${cap(JOBS[k][1])} does not need a ${JOBS[i][2]}. A ${JOBS[i][2]} is for ${JOBS[i][1]}.`)}
 s.got.push(i);s.bad=-1;A.sound.pop();tell(`The ${JOBS[i][2]} goes to ${JOBS[i][1]}.`+(s.got.length>=4?' Each kind of writing has its own job.':''))}
/* 4. Sam's name */
const letR=()=>grid(6,A.H*.56,A.H*.17,A.narrow?3:6).map(r=>A.narrow?r:{...r,y:A.H*.62});
function drawName(){const s=M.d,g=A.ctx;desk();note(s.got.length>=3?'Sam wrote his name':'Write Sam\'s name: tap his letters in order',A.W/2,A.H*.06,{n:13,ok:s.got.length>=3});
 const bw=Math.min(A.W*.8,360),bx=(A.W-bw)/2;sheet({x:bx,y:A.H*.14,w:bw,h:A.H*.34});words('🐶',bx+bw*.2,A.H*.31,Math.min(A.H*.2,60));
 for(let j=0;j<3;j++){const x=bx+bw*(.5+j*.15),y=A.H*.36;g.strokeStyle=LINE;g.lineWidth=2;g.beginPath();g.moveTo(x-bw*.06,y+A.H*.06);g.lineTo(x+bw*.06,y+A.H*.06);g.stroke();if(j<s.got.length)words(NAME[j],x,y,Math.min(A.H*.14,fit(34)),CRAY[j],1)}
 letR().forEach(r=>{const L=LETTERS[r.i],used=s.used.includes(r.i);sheet(r,{no:s.bad===r.i,ok:used});words(L,r.x+r.w/2,r.y+r.h/2,Math.min(r.h*.6,fit(30)),used?OKC:PEN,1)})}
function letter(i){const s=M.d;if(s.got.length>=3||s.used.includes(i))return;const L=LETTERS[i],want=NAME[s.got.length];
 if(L!==want){s.bad=i;A.sound.miss();return tell(NAME.includes(L)?`${L} is in Sam, but not yet. Sam starts S, then A, then M. Next is ${want}.`:`${L} is a letter, but it is not in Sam. Sam is S, A, M. Find ${want}.`)}
 s.got.push(L);s.used.push(i);s.bad=-1;A.sound.pop();tell(s.got.length>=3?'S, A, M: Sam. His marks say his name.':`${L}. Next letter.`)}
/* 5. read it: top to bottom, left to right, the same each time */
const rowR=()=>{const w=Math.min(A.W*.7,300),h=A.H*.17;return LIST.map((_,i)=>({i,x:(A.W-w)/2,y:A.H*.16+i*(h+8),w,h}))};
const wordR=()=>grid(3,A.H*.36,A.H*.24),nextR=()=>{const w=Math.min(A.W-24,420),h=A.H*.17;return NEXT.map((_,i)=>({i,x:(A.W-w)/2,y:A.H*.3+i*(h+8),w,h}))};
const nxOrder=()=>[1,0,2];
function drawRead(){const s=M.e,g=A.ctx;desk();
 if(s.part>=3){note('Top to bottom, left to right, the same each time',A.W/2,A.H*.12,{ok:1});note('🛒 milk, eggs, bread',A.W/2,A.H*.4,{n:15});note('💌 To Nana, love Mia',A.W/2,A.H*.62,{n:15});return}
 if(s.part===0){note('Read Mia\'s list: tap from the top',A.W/2,A.H*.06,{n:13});rowR().forEach(r=>{const read=r.i<s.k;sheet(r,{ok:read,no:s.bad===r.i});words('— — —',r.x+r.w*(read?.22:.5),r.y+r.h/2,Math.min(r.h*.4,fit(20)),PEN,1,r.w*.36);if(read){words(LIST[r.i][0],r.x+r.w*.86,r.y+r.h/2,r.h*.5);words(LIST[r.i][1],r.x+r.w*.58,r.y+r.h/2,Math.min(r.h*.36,fit(18)),OKC)}});return}
 if(s.part===1){note('Read Mia\'s card: tap from the left',A.W/2,A.H*.12,{n:13});wordR().forEach(r=>{const read=r.i<s.k;sheet(r,{ok:read,no:s.bad===r.i});words(['~~','~~~','♥ ~~'][r.i],r.x+r.w/2,r.y+r.h*.38,Math.min(r.h*.4,fit(30)),PEN,1,r.w-8);if(read)words(CARD[r.i][1],r.x+r.w/2,r.y+r.h*.75,Math.min(r.h*.18,fit(15)),OKC)});
  g.fillStyle=A.col.tx;g.font=`800 ${fit(13)}${TYPE}`;g.textAlign='center';g.fillText('→ → →',A.W/2,A.H*.72);return}
 note('Next day: Mia reads her list again. What does it say?',A.W/2,A.H*.12,{n:13});nextR().forEach((r,j)=>{const o=NEXT[nxOrder()[j]];sheet(r,{no:s.bad===o[1]});words(o[0],r.x+r.w/2,r.y+r.h/2,Math.min(r.h*.36,fit(17)))})}
function readRow(i){const s=M.e;if(s.part>1)return;const n=s.part?3:LIST.length;
 if(i!==s.k){s.bad=i;A.sound.miss();return tell(s.part?'We read from left to right. Start on the left, then go along.':'Start at the top. A list goes from the top to the bottom.')}
 s.k++;s.bad=-1;A.sound.pop();const w=s.part?CARD[i][1]:LIST[i][1];if(s.k<n)return tell(w+'.');
 s.part++;s.k=0;tell(s.part===1?`${w}. The list says milk, eggs, bread. Now read Mia's card.`:`${w}. The card says To Nana, love Mia. One more question.`)}
function again(tag){const s=M.e;if(s.part!==2)return;
 if(tag!=='ok'){s.bad=tag;A.sound.miss();return tell(tag==='same'?'Her marks keep their meaning. The list says the same as yesterday.':'That is bottom to top. Read from the top: milk first.')}
 s.part=3;s.bad=null;A.sound.pop();tell('Milk, eggs, bread: the same as yesterday. Marks keep their meaning.')}
function draw(){const k=where();if(k==='quiz'){desk();note('Challenge',A.W/2,A.H*.16,{ok:1});note('✍️ Marks mean something',A.W/2,A.H*.5,{n:14});return}
 ({draw:drawDraw,sort:drawSort,jobs:drawJobs,name:drawName,read:drawRead})[k]();A.fx.draw(A.ctx)}
function down(p){const k=where();
 if(k==='draw'){const s=M.a;if(s.r>=2)return false;const r=padR();if(on(p,r)&&s.mean==null){s.ink.push([[(p.x-r.x)/r.w,(p.y-r.y)/r.h]]);M.pen=1;A.redraw();return true}const b=meanR().find(b=>on(p,b));if(b)mean(b.i);return false}
 if(k==='sort'){const r=cardR().find(r=>on(p,r)&&!M.b.in.includes(r.i));if(r){M.drag={i:r.i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}const b=binR().find(r=>on(p,r));if(b&&M.b.pick!=null)file(M.b.pick,b.i);return false}
 if(k==='jobs'){const r=docR().find(r=>on(p,r)&&!M.c.got.includes(r.i));if(r){M.drag={i:r.i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}const t=placeR().find(r=>on(p,r));if(t&&M.c.pick!=null)give(M.c.pick,t.i);return false}
 if(k==='name'){const r=letR().find(r=>on(p,r));if(r)letter(r.i);return false}
 if(k==='read'){const s=M.e;if(s.part===0){const r=rowR().find(r=>on(p,r));if(r)readRow(r.i)}else if(s.part===1){const r=wordR().find(r=>on(p,r));if(r)readRow(r.i)}else if(s.part===2){const r=nextR().find(r=>on(p,r));if(r)again(NEXT[nxOrder()[r.i]][1])}return false}return false}
function move(p){const k=where();if(M.pen&&k==='draw'){const r=padR(),st=M.a.ink[M.a.ink.length-1];st.push([Math.max(0,Math.min(1,(p.x-r.x)/r.w)),Math.max(0,Math.min(1,(p.y-r.y)/r.h))]);A.redraw();return}
 const d=M.drag;if(!d)return;d.x=p.x;d.y=p.y;const t=(k==='sort'?binR():placeR()).find(r=>on(p,r));(k==='sort'?M.b:M.c).hot=t?t.i:-1;A.redraw()}
function lift(p){const k=where();if(M.pen){M.pen=0;const s=M.a;if(inkLen(s)>=6){s.bad=0;tell('You made marks. What do they say? Tap a picture.')}else A.redraw();return}
 const d=M.drag;if(!d)return;M.drag=null;const tap=Math.hypot(p.x-d.x0,p.y-d.y0)<10,st=k==='sort'?M.b:M.c;st.hot=-1;
 const t=(k==='sort'?binR():placeR()).find(r=>on(p,r));if(t)return k==='sort'?file(d.i,t.i):give(d.i,t.i);if(tap){st.pick=d.i;return tell(k==='sort'?'Card picked. Now tap Picture or Writing.':'Paper picked. Now tap who needs it.')}A.redraw()}
function reset(){run++;for(const k in M)delete M[k];Object.assign(M,{a:{r:0,ink:[],mean:null,said:[],bad:0},b:{in:[],bad:-1,hot:-1,pick:null},c:{got:[],bad:-1,hot:-1,pick:null},d:{got:[],used:[],bad:-1},e:{part:0,k:0,bad:-1},drag:null,pen:0,hook:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();tools();M.hook()}
const ready=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function enter(i,desc,ok,msg){reset();tell(desc);M.hook=ready(i,ok,msg)}
function play(i,acts,ms){steps[i].go();const r0=run;acts.forEach((f,j)=>setTimeout(()=>{if(r0===run)f()},ms*(j+1)))}
function tools(){if(!bar)return;bar.innerHTML='';const k=where(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},bar,t).onclick=f};
 if(k==='draw'&&M.a.r<2){if(M.a.mean!=null)B('Next paper →',nextPaper);else{B('✏️ Make marks',scribble,'Make some marks on the paper');MEAN.forEach((m,j)=>B(`${m[0]} It says: ${m[1]}`,()=>mean(j)))}}
 if(k==='sort')CARDS.forEach((cd,i)=>{if(!M.b.in.includes(i)){const nm=cd[0]?['sun','','house','','cat',''][i]+' picture':cd[1];BINS.forEach((b,k2)=>B(`${nm} → ${b[1]}`,()=>file(i,k2)))}});
 if(k==='jobs')JOBS.forEach((j,i)=>{if(!M.c.got.includes(i))JOBS.forEach((t,k2)=>B(`${j[2]} → ${t[1]}`,()=>give(i,k2),`Give the ${j[2]} to ${t[1]}`))});
 if(k==='name'&&M.d.got.length<3)LETTERS.forEach((L,i)=>{if(!M.d.used.includes(i))B(L,()=>letter(i),`Letter ${L}`)});
 if(k==='read'){const s=M.e;if(s.part===0)LIST.forEach((l,i)=>B(`Read line ${i+1}`,()=>readRow(i),`Read line ${i+1} of the list`));if(s.part===1)CARD.forEach((w,i)=>B(`Read mark ${i+1}`,()=>readRow(i),`Read mark ${i+1} from the left`));if(s.part===2)NEXT.forEach(o=>B(o[0],()=>again(o[1])))}}
const steps=[
{h:'Marks that mean',p:'Drag your finger on the paper to make marks, or tap Make marks. Then tap what your marks say.',
 task:'Make marks and give them a meaning, twice',show:()=>play(0,[()=>scribble(),()=>mean(0),()=>nextPaper(),()=>scribble(),()=>mean(1),()=>nextPaper()],450),
 go:()=>enter(0,'A blank paper and three things your marks could say.',()=>M.a.r>=2,'Scribbles can be writing when you say what they mean. Grown-ups do the same with letters.')},
{h:'Picture or writing?',p:'Drag each card to Picture or Writing, or tap a card and then a box.',
 predict:{q:'Which one is writing?',opts:['A big round sun','Little marks in a line'],ans:1},task:'Sort all 6 cards',
 show:()=>play(1,CARDS.map((cd,i)=>()=>file(i,cd[2])),500),
 go:()=>enter(1,'Six cards: three pictures and three bits of writing.',()=>M.b.in.length>=6,'A picture shows a thing. Writing is small marks in a line, like letters, that say words.')},
{h:'Every paper has a job',p:'A list, a card, a name label and a sign. Drag each paper to who needs it, or tap a paper and then a place.',
 task:'Give all 4 papers out',show:()=>play(2,[0,1,2,3].map(i=>()=>give(i,i)),550),
 go:()=>enter(2,'Four papers and four places: the shop, Nana, Sam\'s bag and the bedroom door.',()=>M.c.got.length>=4,'A list helps at the shop, a card says hello, a label says whose it is, and a sign tells people what to do.')},
{h:'Sam\'s name',p:'Sam wants to write his name on his picture. Tap his letters in order.',
 predict:{q:'Sam puts an S on his picture. What could it say?',opts:['Sam','Nothing, it is just a line'],ans:0},task:'Write S, A, M',
 show:()=>play(3,['S','A','M'].map(L=>()=>letter(LETTERS.indexOf(L))),550),
 go:()=>enter(3,'Sam\'s dog picture with three spaces for his name.',()=>M.d.got.length>=3,'S, A, M says Sam. Letters from your own name are often the first ones you write.')},
{h:'Read it back',p:'Read Mia\'s list from the top, and her card from the left. Then say what the list says the next day.',
 predict:{q:'Mia reads her list again the next day. Does it say the same?',opts:['No, marks change each time','Yes, it says the same'],ans:1},task:'Read the list and the card',
 show:()=>play(4,[0,1,2].map(i=>()=>readRow(i)).concat([0,1,2].map(i=>()=>readRow(i)),[()=>again('ok')]),400),
 go:()=>enter(4,'Mia\'s shopping list with three lines.',()=>M.e.part>=3,'Lists go from the top down, cards from left to right, and the marks say the same every time you read them.')},
{h:'Challenge',p:'',go:()=>{reset();question()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>M.hook()});
function why(t){let m='Marks mean something when you say what they say.';
 if(t==='blank')m='Marks can mean something, even scribbles. Ask what they say.';
 if(t==='pic')m='That is a picture of a thing. Writing is small marks in a line.';
 if(t==='job')m='Each paper has its own job. A list says what to buy.';
 if(t==='dir')m='Start at the top of a list, and on the left of a line.';
 if(t==='same')m='Marks keep their meaning. They say the same each time you read them.';
 if(t==='name')m='S is the first letter of Sam. It stands for his name.';
 return m}
function question(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 ask.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=ask.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},box,v).onclick=()=>judge(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function judge(t,a){ask.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=ask.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=question;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.12,draw,onStep:S=>{ask.hidden=S.step!==5;bar.hidden=S.step===5;tools()},
 init:S=>{A=S;const w=c.el('div',{class:'fl-below'},A.below);bar=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Mark making buttons'},w);ask=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up:lift});tools()}}).start()})})();
