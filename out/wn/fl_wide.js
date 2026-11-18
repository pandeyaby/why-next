/* Flagship: Wide Independent Reading Across Genres (ages 11–14; KS3 English: read widely across genres, periods, forms
   and authors; choose for challenge). Not flagrecbk, flagbkcmp or flaggenre. */
(()=>{
VIS.reg('flagwide',c=>{
let R,keys,chal,qq=-1;const S={};
const MODE=['genre','log','stretch','time','stamina','chal'];
const mode=()=>MODE[R.step];
const GEN=[['mystery','Mystery'],['scifi','Science fiction'],['hist','Historical'],['fantasy','Fantasy'],['memoir','Memoir'],['play','Play script']];
const OPEN=[['The study door was locked from the inside, and the key was still in Lord Ashby’s pocket.','mystery','A locked room and a puzzle: mystery.'],
 ['By 2190 the colony on Europa had grown its own oxygen for eleven years. Then the gardens began to die.','scifi','A future date and a colony on a moon: science fiction.'],
 ['London, 1666. Will woke to shouting and the smell of smoke drifting up from Pudding Lane.','hist','A real place and year in the past: historical fiction.'],
 ['Only those born under a red moon could hear the river speak, and Mira had been born under two.','fantasy','Magic: fantasy.'],
 ['This is the true story of the summer I learned to swim, and nearly lost my brother.','memoir','The writer’s own true life: memoir, which is non-fiction.'],
 ['MAYA: (slamming the door) You promised! DAD: I said I would try.','play','Speaker names and stage directions: a play script.']];
const KINDS=[['fantasy','fantasy'],['mystery','mystery'],['scifi','sci-fi'],['hist','history'],['poetry','poetry'],['drama','drama'],['nonfic','non-fic']];
const SHELF=[['The Dragon’s Third Egg','fantasy'],['The Locked Greenhouse','mystery'],['Signals from Europa','scifi'],['Ration Book Summer','hist'],['Salt and Starlight: poems','poetry'],['The Last Bus: a play','drama'],['How Bridges Stand Up','nonfic']];
const PAGES=[['A','comfort',1],['B','stretch',3],['C','notyet',9]];
const BINS=[['comfort','Comfort read'],['stretch','Stretch read'],['notyet','Not yet']];
const TEXTS=[['Romeo and Juliet','Shakespeare, play',0,'about 1595'],['Frankenstein','Mary Shelley, novel',1,'1818'],['The Diary of a Young Girl','Anne Frank, diary',2,'1942–44'],['Noughts & Crosses','Malorie Blackman, novel',3,'2001']];
const ERAS=['1500s','1800s','1900s','2000s'];
function speak(t){c.say(t);if(R)R.cv.setAttribute('aria-label',t)}
function tx(t,x,y,px,o){o=o||{};const g=R.ctx;g.font=`${o.b||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.ink||R.col.tx;g.fillText(String(t),x,y,o.max||R.W-10)}
function lines(t,px,maxW){const g=R.ctx;g.font=`600 ${px}px system-ui,sans-serif`;const L=[''];t.split(' ').forEach(w=>{const j=L.length-1,s=(L[j]+' '+w).trim();if(g.measureText(s).width>maxW&&L[j])L.push(w);else L[j]=s});return L}
function wrap(t,x,y,px,maxW,n){const L=lines(t,px,maxW),k=Math.min(n||4,L.length),lh=px+4;L.slice(0,k).forEach((l,j)=>tx(l,x,y-(k-1)*lh/2+j*lh,px,{b:600,max:maxW}))}
const Q=()=>R.col,tint=k=>R.mix(Q().pn,k,Q().dark?.24:.16);
const within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function slab(r,f,dash){const g=R.ctx;g.fillStyle=f;R.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.setLineDash(dash?[6,5]:[]);g.strokeStyle=Q().tx;g.lineWidth=1.5;g.stroke();g.setLineDash([])}
function footer(t){const g=R.ctx,px=R.narrow?14:16,lh=px+4,L=lines(t,px,R.W-26);
 const k=Math.min(4,L.length),top=R.H-k*lh-12;g.fillStyle=R.alpha(Q().pn,.95);g.fillRect(0,top,R.W,R.H-top);L.slice(0,4).forEach((l,j)=>tx(l,R.W/2,top+6+lh*j+lh/2,px,{b:600}))}
const top=()=>({x:12,y:R.H*.03,w:R.W-24,h:R.narrow?R.H*.17:R.H*.18});
function dragCard(draw){const b=S.card=top(),h=S.grab,r=h?{x:h.x-b.w/2,y:h.y-b.h/2,w:b.w,h:b.h}:b;slab(r,tint(Q().am));draw(r)}
/* ---- 1 genre from the opening ---- */
const gBox=i=>{const cols=R.narrow?2:3,gp=8,w=(R.W-24-gp*(cols-1))/cols,h=R.H*(R.narrow?.13:.18);return{x:12+(i%cols)*(w+gp),y:R.H*(R.narrow?.24:.26)+Math.floor(i/cols)*(h+gp),w,h}};
function drawGenre(){GEN.forEach(([k,nm],i)=>{const r=gBox(i),got=S.gdone.includes(k);slab(r,got?tint(Q().gr):Q().pn,!got);tx(nm,r.x+r.w/2,r.y+r.h/2,R.narrow?14:16,{b:got?800:600,max:r.w-6})});
 const cur=OPEN[S.oi];if(cur)dragCard(r=>wrap('“'+cur[0]+'”',r.x+r.w/2,r.y+r.h/2,R.narrow?13:15,r.w-16,4));else tx('Six openings, six kinds',R.W/2,R.H*.1,R.narrow?16:18,{ink:Q().gr})}
function genreTo(k){const cur=OPEN[S.oi];S.grab=null;if(!cur)return R.redraw();
 if(k!==cur[1]){const hint={mystery:'Look for a crime or a puzzle.',scifi:'Look for future science or space.',hist:'Look for a real date and place in the past.',fantasy:'Look for magic.',memoir:'Look for “true story” and “I”.',play:'Look for speaker names and brackets.'}[cur[1]];return say('Not that one. '+hint,false)}
 S.gdone.push(k);S.oi++;if(S.oi>=OPEN.length){S.genreOk=true;return say('Each genre signals itself in the first line.',true)}
 say(cur[2],true)}
/* ---- 2 widen a lopsided log ---- */
const shelfBox=i=>{const cols=2,gp=8,w=(R.W-24-gp)/2,h=R.H*(R.narrow?.075:.09);return{x:12+(i%cols)*(w+gp),y:R.H*.415+Math.floor(i/cols)*(h+gp),w,h}};
const chartY=()=>R.H*.04,chartH=()=>R.H*.26;
function drawLog(){const g=R.ctx,n=KINDS.length,bw=(R.W-24)/n,cover=new Set(S.log);
 KINDS.forEach(([k,nm],i)=>{const cnt=S.log.filter(x=>x===k).length,x=12+i*bw,base=chartY()+chartH(),h=Math.min(chartH()-24,cnt*(chartH()-24)/10);
  g.fillStyle=cnt?R.mix(Q().pn,Q().vi,Q().dark?.5:.45):Q().pn;g.fillRect(x+3,base-h,bw-6,h);g.strokeStyle=Q().tx;g.lineWidth=1;g.strokeRect(x+3,base-h,bw-6,h);
  tx(cnt,x+bw/2,base-h-9,R.narrow?12:14);tx(nm,x+bw/2,base+12,R.narrow?11:13,{b:600,max:bw-2})});
 tx(`kinds covered: ${cover.size} of 7   books: ${S.log.length}`,R.W/2,R.H*.375,R.narrow?14:16,{ink:cover.size>=5?Q().gr:Q().tx});
 SHELF.forEach((b,i)=>{const r=shelfBox(i),used=S.added.includes(i),h=S.grab&&S.grab.i===i?S.grab:null,q=h?{x:h.x-r.w/2,y:h.y-r.h/2,w:r.w,h:r.h}:r;if(used)return slab(r,Q().pn,true);slab(q,tint(Q().cy));tx(b[0],q.x+q.w/2,q.y+q.h/2,R.narrow?12:14,{b:600,max:q.w-8})})}
function addBook(i){if(S.logOk||S.added.includes(i))return;const b=SHELF[i],before=new Set(S.log).size;S.grab=null;S.added.push(i);S.log.push(b[1]);const after=new Set(S.log).size;
 if(after===before)return say(`More of the same: another ${b[1]} book. More books, still ${after} kind${after>1?'s':''}.`,false);
 if(after>=5){S.logOk=true;return say(`${after} kinds now. Wide reading means many kinds of book, not just many books.`,true)}
 say(`New kind: ${KINDS.find(k=>k[0]===b[1])[1]}. ${after} kinds covered.`,true)}
/* ---- 3 comfort, stretch, not yet ---- */
const pageR=i=>{const gp=8,w=(R.W-24-gp*2)/3;return{x:12+i*(w+gp),y:R.H*.04,w,h:R.H*.3}};
const binR=i=>{const gp=8,w=(R.W-24-gp*2)/3;return{x:12+i*(w+gp),y:R.H*.42,w,h:R.H*.3}};
function drawStretch(){const g=R.ctx;PAGES.forEach(([id,k,n],i)=>{if(S.placed[id])return;const r=pageR(i),h=S.grab&&S.grab.id===id?S.grab:null,q=h?{x:h.x-r.w/2,y:h.y-r.h/2,w:r.w,h:r.h}:r;slab(q,Q().pn);
  for(let l=0;l<7;l++){const y=q.y+22+l*(q.h-34)/7;g.fillStyle=R.alpha(Q().mu,.5);g.fillRect(q.x+8,y,q.w-16,3)}
  if(S.seen[id]){g.fillStyle=R.mix(Q().pn,Q().rd,.5);for(let t=0;t<n;t++)g.fillRect(q.x+10+(t*37)%(q.w-40),q.y+19+(t%7)*(q.h-34)/7,20,9)}
  tx('Page '+id,q.x+q.w/2,q.y+11,R.narrow?13:15,{b:800});tx(S.seen[id]?`${n} tricky word${n>1?'s':''} in 50`:'tap to check',q.x+q.w/2,q.y+q.h-10,R.narrow?11:13,{b:700,max:q.w-4})});
 BINS.forEach(([k,nm],i)=>{const r=binR(i);slab(r,tint(i===0?Q().gr:i===1?Q().am:Q().rd));tx(nm,r.x+r.w/2,r.y+18,R.narrow?13:15,{b:800,max:r.w-4});
  PAGES.filter(p=>S.placed[p[0]]===k).forEach(p=>tx('Page '+p[0],r.x+r.w/2,r.y+r.h/2,R.narrow?15:17))})}
function check(id){S.seen[id]=true;const p=PAGES.find(x=>x[0]===id);say(`Page ${id}: ${p[2]} tricky word${p[2]>1?'s':''} in 50.`,null)}
function binIt(id,k){const p=PAGES.find(x=>x[0]===id);S.grab=null;if(S.placed[id])return R.redraw();if(!S.seen[id])S.seen[id]=true;
 if(k!==p[1]){const m={comfort:'Almost every word is easy: a comfort read. Fun, but it will not stretch you.',stretch:'A few tricky words you can work out: a stretch read, where you grow.',notyet:'Nearly one word in five is tricky: you would lose the thread. Not yet, or read it with help.'}[p[1]];return say(m,false)}
 S.placed[id]=k;if(Object.keys(S.placed).length===3){S.stretchOk=true;return say('Mix comfort reads with stretch reads. Save “not yet” books for later, or read them with support.',true)}
 say({comfort:'Comfort read: 1 tricky word in 50.',stretch:'Stretch read: 3 in 50, hard but you can follow it.',notyet:'Not yet: 9 in 50 is too many to follow alone.'}[k],true)}
/* ---- 4 across time ---- */
const eraR=i=>{const gp=6,w=(R.W-24-gp*3)/4;return{x:12+i*(w+gp),y:R.H*.32,w,h:R.H*.4}};
function drawTime(){const g=R.ctx;ERAS.forEach((e,i)=>{const r=eraR(i);slab(r,tint(Q().cy));tx(e,r.x+r.w/2,r.y+16,R.narrow?14:16,{b:800});
  TEXTS.filter(t=>S.era[t[0]]===i).forEach(t=>{wrap(t[0],r.x+r.w/2,r.y+r.h*.45,R.narrow?12:14,r.w-6,4);tx(t[3],r.x+r.w/2,r.y+r.h*.84,R.narrow?11:12,{b:600,max:r.w-4,ink:Q().mu})})});
 const cur=TEXTS[S.ti];if(cur)dragCard(r=>{tx(cur[0],r.x+r.w/2,r.y+r.h*.38,R.narrow?16:18,{b:800,max:r.w-10});tx(cur[1],r.x+r.w/2,r.y+r.h*.7,R.narrow?13:15,{b:600,max:r.w-10})});else tx('Four centuries of reading',R.W/2,R.H*.12,R.narrow?16:18,{ink:Q().gr})}
function eraTo(i){const cur=TEXTS[S.ti];S.grab=null;if(!cur)return R.redraw();
 if(i!==cur[2])return say(`Not that century. ${cur[0]} is from ${cur[3]}.`,false);
 S.era[cur[0]]=i;S.ti++;if(S.ti>=TEXTS.length){S.timeOk=true;return say('Four texts from four centuries. Older books show how people lived and thought, and later books borrow from them.',true)}
 say(`${cur[0]}: ${cur[3]}.`,true)}
/* ---- 5 stamina planner ---- */
const PAGES_N=240,trackX0=()=>30,trackX1=()=>R.W-30,trackY=()=>R.H*.2;
const ppdX=v=>trackX0()+(v-5)/(40-5)*(trackX1()-trackX0());
function drawStamina(){const g=R.ctx,v=S.ppd,days=Math.ceil(PAGES_N/v);tx(`A ${PAGES_N}-page novel. Pages a day: ${v}`,R.W/2,R.H*.07,R.narrow?15:17);
 g.strokeStyle=Q().mu;g.lineWidth=6;g.lineCap='round';g.beginPath();g.moveTo(trackX0(),trackY());g.lineTo(trackX1(),trackY());g.stroke();g.lineCap='butt';
 R.paint.ball(ppdX(v),trackY(),14,Q().vi);S.knob={x:ppdX(v),y:trackY()};
 const cols=7,gp=4,cw=(R.W-24-gp*(cols-1))/cols,ch=Math.min(cw*.62,R.H*.07);for(let d=0;d<28;d++){const x=12+(d%cols)*(cw+gp),y=R.H*.3+Math.floor(d/cols)*(ch+gp),on=d<days;
  g.fillStyle=on?(d<14?R.mix(Q().pn,Q().gr,Q().dark?.5:.45):R.mix(Q().pn,Q().rd,Q().dark?.5:.45)):Q().pn;g.fillRect(x,y,cw,ch);g.strokeStyle=d===13?Q().tx:R.alpha(Q().mu,.6);g.lineWidth=d===13?2.5:1;g.strokeRect(x,y,cw,ch)}
 tx(`${days} days to finish`,R.W/2,R.H*.3+4*(ch+gp)+14,R.narrow?15:17,{ink:days<=14?Q().gr:Q().tx})}
function setPPD(v){S.ppd=Math.max(5,Math.min(40,Math.round(v)));const days=Math.ceil(PAGES_N/S.ppd);
 if(days<=14&&!S.stamOk){S.stamOk=true;return say(`${S.ppd} pages a day: done in ${days} days. A little every day builds stamina for whole books.`,true)}
 if(!S.stamOk)speak(`${S.ppd} pages a day: ${days} days.`);R.redraw()}
/* ---- frame ---- */
function draw(){const g=R.ctx,k=mode();g.fillStyle=R.mix(Q().pn,Q().vi,Q().dark?.04:.04);g.fillRect(0,0,R.W,R.H);
 if(k==='chal'){tx('📚 Reader check',R.W/2,R.H*.42,R.narrow?20:24);tx('Answer below',R.W/2,R.H*.56,15,{ink:Q().mu,b:500});R.fx.draw(g);return}
 ({genre:drawGenre,log:drawLog,stretch:drawStretch,time:drawTime,stamina:drawStamina})[k]();if(S.msg)footer(S.msg);R.fx.draw(g)}
function say(t,good){S.msg=t;if(good)R.sound.pop();else if(good===false)R.sound.miss();speak(t);buttons();R.redraw();S.gate&&S.gate()}
function fresh(){for(const k in S)delete S[k];Object.assign(S,{oi:0,gdone:[],log:Array(8).fill('fantasy'),added:[],seen:{},placed:{},era:{},ti:0,ppd:8,msg:'',gate:null});if(R)R.redraw()}
function buttons(){if(!keys)return;keys.innerHTML='';const k=mode();if(k==='chal')return;
 const B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},keys,t).onclick=f};
 if(k==='genre'&&OPEN[S.oi])GEN.forEach(([g,nm])=>{if(!S.gdone.includes(g))B(nm,()=>genreTo(g))});
 if(k==='log'&&!S.logOk)SHELF.forEach((b,i)=>{if(!S.added.includes(i))B('+ '+b[0],()=>addBook(i))});
 if(k==='stretch'&&!S.stretchOk)PAGES.forEach(([id])=>{if(S.placed[id])return;if(!S.seen[id])B(`Check page ${id}`,()=>check(id));else BINS.forEach(([bk,nm])=>B(`Page ${id}: ${nm}`,()=>binIt(id,bk)))});
 if(k==='time'&&TEXTS[S.ti])ERAS.forEach((e,i)=>B(e,()=>eraTo(i),`${TEXTS[S.ti][0]}: the ${e}`));
 if(k==='stamina'&&!S.stamOk){B('− 1 page a day',()=>setPPD(S.ppd-1));B('+ 1 page a day',()=>setPPD(S.ppd+1))}}
function down(p){const k=mode();if(k==='chal')return false;
 if(k==='stamina'){if(S.stamOk)return false;if(Math.abs(p.y-trackY())<34){S.slide=true;setPPD(5+(p.x-trackX0())/(trackX1()-trackX0())*35);return true}return false}
 if(k==='log'){if(S.logOk)return false;const i=SHELF.findIndex((b,j)=>!S.added.includes(j)&&within(p,shelfBox(j)));if(i>=0){S.grab={i,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}return false}
 if(k==='stretch'){if(S.stretchOk)return false;const i=PAGES.findIndex((q,j)=>!S.placed[q[0]]&&within(p,pageR(j)));if(i>=0){S.grab={id:PAGES[i][0],x:p.x,y:p.y,x0:p.x,y0:p.y};return true}return false}
 const cur=k==='genre'?OPEN[S.oi]:TEXTS[S.ti];if(!cur)return false;
 if(within(p,S.card)){S.grab={x:p.x,y:p.y};return true}
 if(k==='genre'){const i=GEN.findIndex((g,j)=>within(p,gBox(j)));if(i>=0){genreTo(GEN[i][0]);return true}}
 if(k==='time'){const i=ERAS.findIndex((e,j)=>within(p,eraR(j)));if(i>=0){eraTo(i);return true}}return false}
function move(p){if(S.slide){setPPD(5+(p.x-trackX0())/(trackX1()-trackX0())*35);return}if(S.grab){S.grab.x=p.x;S.grab.y=p.y;R.redraw()}}
function up(){const k=mode();if(S.slide){S.slide=false;return}const h=S.grab;if(!h)return;
 const tap=h.x0!=null&&Math.hypot(h.x-h.x0,h.y-h.y0)<12;
 if(k==='log'){if(tap||h.y<R.H*.4)return addBook(h.i);S.grab=null;return R.redraw()}
 if(k==='stretch'){if(tap){S.grab=null;return check(h.id)}const i=BINS.findIndex((b,j)=>within(h,binR(j)));if(i>=0)return binIt(h.id,BINS[i][0]);S.grab=null;return R.redraw()}
 if(k==='genre'){const i=GEN.findIndex((g,j)=>within(h,gBox(j)));if(i>=0)return genreTo(GEN[i][0])}
 if(k==='time'){const i=ERAS.findIndex((e,j)=>within(h,eraR(j)));if(i>=0)return eraTo(i)}
 S.grab=null;R.redraw()}
const ready=(i,ok,line)=>()=>{if(R.step===i&&!R.isDone&&(R.pred[i]!=null||!steps[i].predict)&&ok())R.done(line()+R.reveal(i))};
function run(i,fs){steps[i].go();fs.forEach((f,j)=>setTimeout(()=>{if(R.step===i)f()},R.reduced()?30*(j+1):(j+1)*330))}
function into(i,hint,ok,line){fresh();S.gate=ready(i,ok,line);say(hint)}
const steps=[
{h:'Name the genre',p:'A genre is a kind of story or text. The first line usually gives it away.',
 task:'Sort all six opening lines',show:()=>run(0,OPEN.map(o=>()=>genreTo(o[1]))),
 go:()=>into(0,'Drag the opening line onto its genre, or press a button.',()=>S.genreOk,()=>'Six genres from six first lines.')},
{h:'Wide, not just many',p:'This reading log has eight books, all fantasy. Add books from the shelf to make it wider.',
 predict:{q:'Someone reads 30 fantasy books in a year and nothing else. Are they reading widely?',opts:['yes, 30 books is a lot','no, wide means many kinds of book'],ans:1},
 task:'Cover at least 5 kinds of book',show:()=>run(1,[1,2,3,4].map(i=>()=>addBook(i))),
 go:()=>into(1,'Drag a book up to the log, or press its button.',()=>S.logOk,()=>'Five kinds, not one.')},
{h:'Comfort or stretch?',p:'A stretch read has a few words you have to work at. Check each page, then sort it.',
 predict:{q:'Should every book you choose feel easy?',opts:['yes, reading should never feel hard','no, mix easy books with some stretch'],ans:1},
 task:'Sort all three pages',show:()=>run(2,PAGES.map(q=>()=>binIt(q[0],q[1]))),
 go:()=>into(2,'Tap each page to count its tricky words, then drag it to a box.',()=>S.stretchOk,()=>'Comfort, stretch and not yet.')},
{h:'Across time',p:'Wide reading also means books from different centuries.',
 predict:{q:'When was Frankenstein first written?',opts:['in the last 100 years, as a film story','over 200 years ago, as a novel'],ans:1},
 task:'Put all four texts in their century',show:()=>run(3,TEXTS.map(t=>()=>eraTo(t[2]))),
 go:()=>into(3,'Drag each text to its century, or press a button.',()=>S.timeOk,()=>'Four texts, four centuries.')},
{h:'Stamina',p:'Whole books take stamina. How many pages a day finish a novel in two weeks?',
 task:'Finish the 240-page novel in 14 days or fewer',show:()=>run(4,[()=>setPPD(12),()=>setPPD(16),()=>setPPD(20)]),
 go:()=>into(4,'Drag the dot, or press the buttons. Green days are inside two weeks.',()=>S.stamOk,()=>'A daily habit finishes the book.')},
{h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.gate&&S.gate()});
const QS=[
 ['Mo reads only mysteries: 12 this term. What would make his reading wider?',[['add poetry, a play and some non-fiction','ok'],['read 12 more mysteries','many'],['read the same mysteries again faster','many']]],
 ['“By 2350, the last forest grew under a glass dome on Mars.” Which genre is this?',[['science fiction','ok'],['historical fiction','genre'],['memoir','genre']]],
 ['A page has about 3 tricky words in 50 that you can work out. What is it for you?',[['a stretch read','ok'],['too hard, give up','hard'],['far too easy','hard']]],
 ['Which text is the oldest?',[['Romeo and Juliet','ok'],['Frankenstein','time'],['Noughts & Crosses','time']]],
 ['A 300-page book, 15 pages a day. How many days to finish?',[['20 days','ok'],['15 days','math'],['45 days','math']]],
 ['Is a memoir fiction or non-fiction?',[['non-fiction: a true story of the writer’s own life','ok'],['fiction, because it tells a story','memo'],['fiction, because it uses “I”','memo']]],
 ['Why read a novel written 200 years ago?',[['it shows other times, and later books build on it','ok'],['it has nothing to say to readers now','old'],['only because a teacher says so','old']]]];
function slip(t){let m='Think about kinds of book, difficulty, period and planning.';
 if(t==='many')m='More of the same adds books, not breadth. Wide means new genres, forms and periods.';
 if(t==='genre')m='A future date and life on another planet signal science fiction.';
 if(t==='hard')m='A few tricky words you can work out make a stretch read: hard enough to grow, not too hard to follow.';
 if(t==='time')m='Romeo and Juliet is from about 1595; Frankenstein is 1818 and Noughts & Crosses is 2001.';
 if(t==='math')m='Divide the pages by pages a day: 300 ÷ 15 = 20 days.';
 if(t==='memo')m='Many novels use “I” too. A memoir is the writer’s own true life, so it is non-fiction.';
 if(t==='old')m='Older books show other times and ideas, and newer books borrow their plots and themes.';
 return m}
function quiz(){qq++;const q=QS[qq%QS.length],r=qq%3,opts=[...q[1].slice(r),...q[1].slice(0,r)];
 chal.innerHTML=`<p><b>${q[0]}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');opts.forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>judge(t)});speak('Challenge: '+q[0]);R.redraw()}
function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const out=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok)R.win();else R.sound.miss();out.innerHTML=(ok?'✓ Yes! ':'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';out.querySelector('button').onclick=quiz}
R=FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:A=>{chal.hidden=A.step!==5;keys.hidden=A.step===5;buttons()},
 init:A=>{R=A;fresh();const w=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Reading buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up});buttons()}});
R.start()})})();
