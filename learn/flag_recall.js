/* Flagship – retrieval practice (11–12): card fronts, cover+recall, Leitner boxes, brain dump check, session plan. */
(()=>{const lo=Math.min;
 const FRONT=[['Which planet is closest to the Sun?',1,'A clear question you must answer from memory.'],
  ['Mercury is the closest planet to the Sun.',0,'That is the answer written out. Nothing to recall, so turn it into a question.'],
  ['Planets',0,'Too vague. What exactly should you remember? Ask one clear question.'],
  ['Name the 4 stages of the water cycle.',1,'Good: one task, and you can check it against your notes.'],
  ['(a whole page of notes copied out)',0,'Copying notes is re-reading in disguise. One question per card.']];
 const NOTE=['Mercury is closest to the Sun.','Venus is the hottest planet.','Jupiter is the biggest planet.','Mars has 2 moons.'];
 const CARD=[['Which planet is the hottest?',['Venus','Mercury','Mars'],0],['How many moons does Mars have?',['1','2','0'],1],['Which planet is the biggest?',['Saturn','Earth','Jupiter'],2],['Which planet is closest to the Sun?',['Venus','Mercury','Earth'],1]];
 const SAM=[['Hottest planet?','✓'],['Moons of Mars?','✗'],['Biggest planet?','✓'],['Closest to Sun?','peeked'],['Stages of water cycle?','✗']];
 const DUMP=[['Water evaporates from the sea.',1],['Clouds are made of smoke.',0],['Rain falls back down.',1]];
 const MISS=[['Water vapour cools and condenses into clouds.',1],['Water collects in rivers and seas.',1],['Snow is a kind of rock.',0]];
 const BLK=[['📖','Re-read notes',0,'re'],['🖍️','Highlight',0,'hl'],['🃏','Flashcards from memory',1,'fc'],['🧠','Brain dump',1,'bd'],['✏️','Practice questions',1,'pq'],['🔍','Check and fix gaps',0,'ck']];
VIS.reg('flagrecall',c=>{let A,pad,chal,read;
 const S={fi:0,fok:0,cov:0,ci:0,peek:{},got:{},left:[0,1,2,3,4],box:{},drag:null,at:null,bad:null,mk:{},add:[],plan:[],gen:0,want:()=>{}};
 const nG=()=>Object.keys(S.got).length,say=t=>{c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(read)read.textContent=t}};
 const view=()=>['front','cover','leit','dump','plan','quiz'][A.step];
 const fz=z=>A.narrow?z:z+2;
 const txt=(x,t,X,Y,z,k,w)=>{x.font=`${w||700} ${fz(z)}px system-ui,sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillStyle=k;x.fillText(t,X,Y,A.W-12)};
 const wrap=(x,t,X,Y,w,z,k,b)=>{x.font=`${b||700} ${fz(z)}px system-ui,sans-serif`;const L=[];let r='';t.split(' ').forEach(v=>{const q=r?r+' '+v:v;if(r&&x.measureText(q).width>w-10){L.push(r);r=v}else r=q});L.push(r);
  const g=fz(z)*1.2;L.forEach((l,i)=>txt(x,l,X,Y+(i-(L.length-1)/2)*g,z,k,b))};
 const box=(x,R,k,on,f)=>{x.fillStyle=A.alpha(k,f||.13);A.paint.rrect(R.x,R.y,R.w,R.h,12);x.fill();x.strokeStyle=k;x.lineWidth=on?4:1.6;x.stroke()};
 const inR=(p,R)=>p.x>=R.x&&p.x<=R.x+R.w&&p.y>=R.y&&p.y<=R.y+R.h,oops=t=>{A.sound.miss();say(t);A.redraw()};
 // ---- 1: card fronts ----
 const bigCard=()=>({x:A.W*.12,y:A.H*.1,w:A.W*.76,h:A.H*.44}),half=i=>({x:8+i*(A.W/2),y:A.H*.62,w:A.W/2-16,h:A.H*.3});
 function frontV(x){const C=A.col;if(S.fok>=5)return wrap(x,'Front = one clear question. Back = the answer.',A.W/2,A.H*.4,A.W*.8,15,C.gr);
  const R=bigCard();box(x,R,C.vi,0,.08);txt(x,'FRONT OF CARD',R.x+R.w/2,R.y+16,10,C.mu,800);wrap(x,FRONT[S.fi][0],R.x+R.w/2,R.y+R.h*.55,R.w,15,C.tx,800);
  [['✓ Good question',C.gr],['✗ Needs fixing',C.rd]].forEach(([t,k],i)=>{const H=half(i);box(x,H,k,S.bad===i);txt(x,t,H.x+H.w/2,H.y+H.h/2,14,C.tx,800)});txt(x,`Card ${S.fi+1} of 5`,A.W/2,A.H*.05,11,C.mu)}
 function judge(g){if(S.fok>=5)return;const f=FRONT[S.fi];if(g!==!!f[1]){S.bad=g?0:1;return oops(g?`Not quite. ${f[2]}`:`This one is fine. ${f[2]}`)}
  S.bad=null;S.fok++;S.fi=lo(4,S.fok);A.sound.pop();tell(f[2])}
 // ---- 2: cover and recall ----
 const optR=i=>{const g=8,w=(A.W-4*g)/3;return{x:g+i*(w+g),y:A.H*.7,w,h:A.H*.22}};
 function coverV(x){const C=A.col,R={x:10,y:A.H*.04,w:A.W-20,h:A.H*.42},done=nG()>=4;
  if(!S.cov||S.peeking){box(x,R,C.am,0,.1);NOTE.forEach((n,i)=>txt(x,n,R.x+R.w/2,R.y+R.h*(.3+i*.18),13,C.tx))}
  else{x.fillStyle=A.mix(C.mu,C.pn,.55);A.paint.rrect(R.x,R.y,R.w,R.h,12);x.fill();txt(x,'🙈 Notes covered',R.x+R.w/2,R.y+R.h/2,15,C.tx,800)}
  if(done)return txt(x,`From memory: ${Object.values(S.got).filter(v=>v==='✓').length} of 4. Peeked: ${Object.keys(S.peek).length}.`,A.W/2,A.H*.62,14,C.gr);
  const k=CARD[S.ci];wrap(x,k[0],A.W/2,A.H*.56,A.W*.9,14,C.tx,800);k[1].forEach((o,i)=>{const Q=optR(i);box(x,Q,C.cy,0);txt(x,o,Q.x+Q.w/2,Q.y+Q.h/2,14,C.tx)})}
 function cover(){if(S.cov)return;S.cov=1;A.sound.tick();tell('Notes covered. Now answer from memory.')}
 function peek(){if(!S.cov)return oops('The notes are already showing.');S.peek[S.ci]=1;S.peeking=1;A.sound.miss();tell('You peeked. That card counts as a miss: it goes back for more practice. Try first next time.');
  const g=S.gen;setTimeout(()=>{if(g===S.gen){S.peeking=0;A.redraw()}},900)}
 function answer(i){if(nG()>=4)return;if(!S.cov)return oops('The notes are showing, so that is copying, not recalling. Cover them first.');
  const k=CARD[S.ci],r=i===k[2],pk=S.peek[S.ci];S.got[S.ci]=pk?'peeked':r?'✓':'✗';A.sound[r?'pop':'miss']();
  S.ci=lo(3,S.ci+1);tell(r?(pk?'Right, but you peeked.':'Right, from memory!'):`No: it is ${k[1][k[2]]}. Checking shows the gap, so this card gets extra practice.`)}
 // ---- 3: Leitner boxes ----
 const BX=[['Box 1: again tomorrow',t=>t!=='✓'],['Box 2: again in a few days',t=>t==='✓'],['Bin: never again']];
 const bxR=i=>{const g=8,w=(A.W-4*g)/3;return{x:g+i*(w+g),y:A.H*.55,w,h:A.H*.4}};
 const deckR=()=>({x:A.W*.2,y:A.H*.08,w:A.W*.6,h:A.H*.36});
 function leitV(x){const C=A.col;BX.forEach(([t],i)=>{const R=bxR(i);box(x,R,i===2?C.rd:i?C.gr:C.am,S.bad===i);wrap(x,t,R.x+R.w/2,R.y+18,R.w,11,C.tx,800);
   Object.entries(S.box).filter(([,b])=>b===i).forEach(([k],j)=>txt(x,'🃏 '+SAM[k][1],R.x+R.w/2,R.y+R.h*(.42+j*.16),12,C.tx))});
  if(!S.left.length)return txt(x,'Every card is in a box.',A.W/2,A.H*.25,15,C.gr);const k=S.left[0],D=S.drag!=null&&S.at?{...deckR(),x:S.at.x-deckR().w/2,y:S.at.y-deckR().h/2}:deckR();
  box(x,D,C.vi,1,.16);wrap(x,SAM[k][0],D.x+D.w/2,D.y+D.h*.38,D.w,14,C.tx,800);txt(x,`Sam: ${SAM[k][1]==='peeked'?'peeked 👀':SAM[k][1]==='✓'?'right ✓':'wrong ✗'}`,D.x+D.w/2,D.y+D.h*.75,13,C.tx)}
 function file(b){if(!S.left.length)return;const k=S.left[0],t=SAM[k][1];
  if(b===2){S.bad=2;return oops(t==='✓'?'Right cards still come back later. Without a few more recalls, they fade.':'This one was missed. Throwing it away hides the gap instead of fixing it.')}
  if(!BX[b][1](t)){S.bad=b;return oops(t==='✓'?'Sam got this right, so it can wait a few days. Spend tomorrow on the misses.':t==='peeked'?'A peek is not a recall. Treat it as a miss: Box 1.':'Sam got this wrong. It needs practice soon: Box 1.')}
  S.bad=null;S.box[k]=b;S.left.shift();A.sound.pop();tell(b?'Box 2: Sam knows it, so it waits longer.':'Box 1: practise it again tomorrow.')}
 // ---- 4: brain dump, then check ----
 const lineR=(i,col)=>{const w=A.W/2-12,h=A.H*.17;return{x:col?A.W/2+4:8,y:A.H*.16+i*(h+6),w,h}};
 function dumpV(x){const C=A.col;txt(x,'Sam\u2019s brain dump',A.W*.25,A.H*.07,12,C.tx,800);txt(x,'Notes: what is missing?',A.W*.75,A.H*.07,12,C.tx,800);
  DUMP.forEach(([t,ok],i)=>{const R=lineR(i,0),m=S.mk[i];box(x,R,m==null?C.cy:m?C.gr:C.rd,m!=null);wrap(x,(m==null?'':m?'✓ ':'✗ ')+t,R.x+R.w/2,R.y+R.h/2,R.w,11,C.tx)});
  MISS.forEach(([t],j)=>{const R=lineR(j,1),on=S.add.includes(j);box(x,R,on?C.gr:S.bad===10+j?C.rd:C.vi,on||S.bad===10+j);wrap(x,(on?'+ added: ':'')+t,R.x+R.w/2,R.y+R.h/2,R.w,11,C.tx)});
  txt(x,dumpDone()?'Checked: 1 wrong idea fixed, 2 gaps filled.':'Tap Sam\u2019s wrong line. Then add the missing ideas.',A.W/2,A.H*.92,12,dumpDone()?C.gr:C.tx)}
 const dumpDone=()=>S.mk[1]===0&&S.add.length>=2;
 function mark(i){if(S.mk[i]!=null)return;const ok=DUMP[i][1];if(ok){S.mk[i]=1;A.sound.tick();return tell('That line matches the notes: tick.')}S.mk[i]=0;A.sound.pop();tell('Wrong: clouds are tiny drops of water, not smoke. Fix it now, or the mistake gets learned.')}
 function addMiss(j){if(S.add.includes(j))return;if(!MISS[j][1]){S.bad=10+j;return oops('That is not in the notes, and it is not true. Only add what the notes say.')}S.bad=null;S.add.push(j);A.sound.pop();tell('Gap filled. Next time, try to recall this one first.')}
 // ---- 5: plan a session ----
 const blkR=i=>{const g=6,per=A.narrow?2:3,w=(A.W-g*(per+1))/per,h=A.H*(A.narrow?.12:.16);return{x:g+(i%per)*(w+g),y:A.H*.5+Math.floor(i/per)*(h+g),w,h}};
 const slotR=i=>{const g=8,w=(A.W-4*g)/3;return{x:g+i*(w+g),y:A.H*.08,w,h:A.H*.24}};
 function score(){let s=0,test=0;S.plan.forEach(b=>{const B=BLK[b];if(B[2]){s+=25;test=1}else if(B[3]==='ck')s+=test?30:4;else s+=8});return lo(100,s)}
 function planV(x){const C=A.col;for(let i=0;i<3;i++){const R=slotR(i),b=S.plan[i];box(x,R,b==null?C.mu:BLK[b][2]?C.gr:BLK[b][3]==='ck'?C.cy:C.am,0);
   if(b!=null){txt(x,BLK[b][0],R.x+R.w/2,R.y+R.h*.32,18,C.tx,400);wrap(x,BLK[b][1],R.x+R.w/2,R.y+R.h*.72,R.w,10,C.tx)}else txt(x,`${i*10}–${i*10+10} min`,R.x+R.w/2,R.y+R.h/2,11,C.mu)}
  const sc=score();x.fillStyle=A.mix(C.mu,C.pn,.6);A.paint.rrect(10,A.H*.37,A.W-20,A.H*.07,8);x.fill();if(sc){x.fillStyle=sc>=80?C.gr:C.am;A.paint.rrect(10,A.H*.37,(A.W-20)*sc/100,A.H*.07,8);x.fill()}
  txt(x,`Test-ready: ${sc}%`,A.W/2,A.H*.405,12,C.tx,800);
  BLK.forEach((b,i)=>{const R=blkR(i);box(x,R,C.vi,0);wrap(x,b[0]+' '+b[1],R.x+R.w/2,R.y+R.h/2,R.w,11,C.tx)})}
 function addBlk(i){if(S.plan.length>=3)return oops('All 30 minutes are planned. Tap a slot to clear it.');const B=BLK[i];S.plan.push(i);A.sound.tick();
  const msg={re:'Re-reading feels easy, but you never practise pulling facts out. Small gain.',hl:'Highlighting picks out facts but you never recall them. Small gain.',
   fc:'Recall from memory: big gain.',bd:'Writing all you remember: big gain, and it shows your gaps.',pq:'Answering questions from memory: big gain.',
   ck:S.plan.slice(0,-1).some(b=>BLK[b][2])?'Checking after a test fixes the gaps it found: good gain.':'Checking with nothing to check barely helps. Test yourself first, then check.'}[B[3]];
  if(B[2]||(B[3]==='ck'&&S.plan.slice(0,-1).some(b=>BLK[b][2])))A.sound.pop();else A.sound.miss();tell(msg)}
 function clearSlot(i){if(S.plan[i]==null)return;S.plan.splice(i,1);A.sound.tick();tell('Slot cleared.')}
 function draw(A){const{ctx:x,W,H,col:C}=A,v=view();x.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.05:.35);x.fillRect(0,0,W,H);
  const f={front:frontV,cover:coverV,leit:leitV,dump:dumpV,plan:planV}[v];if(f)f(x);else txt(x,S.Q||'🃏',W/2,H/2,56,C.tx,400);A.fx.draw(x)}
 function tell(msg){const v=view();let t;
  if(v==='front')t=S.fok>=5?'All five fronts judged.':`Card front: ${FRONT[S.fi][0]} Good question or needs fixing?`;
  else if(v==='cover')t=nG()>=4?`Done: ${Object.values(S.got).join(', ')}.`:`Notes ${S.cov?'covered':'showing'}. Card: ${CARD[S.ci][0]}`;
  else if(v==='leit')t=S.left.length?`Card: ${SAM[S.left[0]][0]} Sam: ${SAM[S.left[0]][1]}.`:'All cards filed.';
  else if(v==='dump')t=`Lines marked: ${Object.keys(S.mk).length}. Gaps added: ${S.add.length} of 2.`;
  else if(v==='plan')t=`Plan: ${S.plan.map(b=>BLK[b][1]).join(', ')||'empty'}. Test-ready ${score()}%.`+(S.plan.length>2&&score()<80?' Not ready yet. Did you check and fix?':'');else t='Challenge time.';
  say((msg?msg+' ':'')+t);refresh();S.want()}
 function refresh(){if(!A||!pad)return;pad.innerHTML='';const v=view();
  const B=(t,f,al)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':al||null},pad,t);e.onclick=f};
  if(v==='front'&&S.fok<5){B('✓ Good question',()=>judge(true));B('✗ Needs fixing',()=>judge(false))}
  if(v==='cover'&&nG()<4){if(!S.cov)B('🙈 Cover the notes',cover);else B('👀 Peek',peek,'Peek at the notes');CARD[S.ci][1].forEach((o,i)=>B(o,()=>answer(i),`Answer: ${o}`))}
  if(v==='leit'&&S.left.length)BX.forEach(([t],i)=>B(t,()=>file(i),`File in ${t}`));
  if(v==='dump'&&!dumpDone()){DUMP.forEach(([t],i)=>{if(S.mk[i]==null)B('Check: '+t.split(' ').slice(0,3).join(' ')+'…',()=>mark(i),'Check line: '+t)});MISS.forEach(([t],j)=>{if(!S.add.includes(j))B('Add: '+t.split(' ').slice(0,3).join(' ')+'…',()=>addMiss(j),'Add: '+t)})}
  if(v==='plan'){BLK.forEach((b,i)=>B(b[0]+' '+b[1],()=>addBlk(i),'Add 10 minutes of '+b[1]));if(S.plan.length)B('↺ Clear plan',()=>{S.plan=[];tell('Plan cleared.')})}A.redraw()}
 const ok=(st,cond,msg)=>()=>{if(A.step===st&&cond()&&(!steps[st].predict||A.pred[st]!=null))A.done(msg()+A.reveal(st))};
 const seq=(fs,gap)=>{const g=S.gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===S.gen)f()},j*gap))};
 const clear=()=>{S.gen++;S.want=()=>{};S.drag=null;S.at=null;S.bad=null;S.peeking=0};
 const steps=[
  {h:'Make a good card',p:'A flashcard has a question on the front and the answer on the back. Judge each front.',
   predict:{q:'Is copying a page of notes onto a card a good flashcard?',opts:['Yes, it has everything','No, the front should be one question'],ans:1},task:'Judge all five card fronts',
   show:()=>{steps[0].go();seq(FRONT.map(f=>()=>judge(!!f[1])),380)},go:()=>{clear();S.fi=0;S.fok=0;tell();S.want=ok(0,()=>S.fok>=5,()=>'One clear question per card, so you have to pull the answer out of memory.')}},
  {h:'Cover, recall, check',p:'Read the notes. Cover them. Then answer each card from memory. Peeking counts as a miss.',
   predict:{q:'You are stuck on a card. What should you do first?',opts:['Flip it straight away','Try hard to recall, then check'],ans:1},task:'Answer four cards with the notes covered',
   show:()=>{steps[1].go();seq([cover,...CARD.map(k=>()=>answer(k[2]))],380)},go:()=>{clear();S.cov=0;S.ci=0;S.peek={};S.got={};tell();S.want=ok(1,()=>nG()>=4,()=>'The effort of recalling is what makes it stick. Checking shows the gaps.')}},
  {h:'Sort the cards',p:'Sam checked a quiz. Drag each card to a box. Box 1 comes back tomorrow, Box 2 in a few days.',
   predict:{q:'Sam got a card right. What should happen to it?',opts:['Bin it, it is learned','Test it again later'],ans:1},task:'File all five of Sam\u2019s cards',
   show:()=>{steps[2].go();seq(SAM.map(s=>()=>file(s[1]==='✓'?1:0)),380)},go:()=>{clear();S.left=[0,1,2,3,4];S.box={};tell();S.want=ok(2,()=>!S.left.length,()=>'Misses come back soon. Right cards come back later. None are thrown away.')}},
  {h:'Brain dump, then check',p:'Sam wrote all he remembers about the water cycle. Check it against the notes. Fix the wrong line and fill the gaps.',task:'Mark the wrong line and add two missing ideas',
   show:()=>{steps[3].go();seq([()=>mark(0),()=>mark(1),()=>mark(2),()=>addMiss(0),()=>addMiss(1)],360)},go:()=>{clear();S.mk={};S.add=[];tell();S.want=ok(3,dumpDone,()=>'A brain dump only helps if you check it. The red bits are what to practise next.')}},
  {h:'Plan 30 minutes',p:'You have 30 minutes before a test. Pick three 10-minute blocks. Watch the test-ready bar.',
   predict:{q:'Which plan gets you more test-ready?',opts:['Re-read the notes three times','Test yourself, check, test again'],ans:1},task:'Make a plan that reaches 80% test-ready',
   show:()=>{steps[4].go();seq([()=>{S.plan=[];tell()},()=>addBlk(2),()=>addBlk(5),()=>addBlk(4)],380)},go:()=>{clear();S.plan=[];tell();S.want=ok(4,()=>score()>=80,()=>'Testing yourself, checking, then testing again beats re-reading, even though re-reading feels easier.')}},
  {h:'Challenge',p:'',go:()=>{clear();quiz()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.want()});
 const QZ=[['Which is the best way to revise for a quiz?','🃏',[['Test yourself, then check','ok'],['Re-read your notes','reread'],['Highlight the key words','hl']]],
  ['You get a flashcard wrong. What next?','❌',[['Check the answer, practise it again soon','ok'],['Throw the card away','bin'],['Skip it, do the easy ones','easy']]],
  ['Which card front is best?','📝',[['What do plants need to make food?','ok'],['Plants need light, water and air.','answer'],['Plants','vague']]],
  ['You did a brain dump. What should you do now?','🧠',[['Check it against your notes','ok'],['Count how much you wrote','count'],['Nothing, you are done','done']]],
  ['Why does testing yourself beat re-reading?','💡',[['Pulling facts from memory makes them easier to recall later','ok'],['It takes less effort','effort'],['Re-reading never works','never']]],
  ['You are stuck on a card. What is best?','🤔',[['Try to recall, then flip and check','ok'],['Flip it straight away','flip'],['Guess and never check','guess']]]];
 let qn=-1,run=0;
 function quiz(){qn++;const[q,pic,ops]=QZ[qn%QZ.length],r=qn%3;S.Q=pic;
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>grade(tag)});say('Challenge: '+q);A.redraw()}
 function grade(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Yes!';break;
   case 'reread':m='Re-reading feels familiar but gives your memory no practice at recalling. Test yourself.';break;
   case 'hl':m='Highlighting marks facts but you never have to recall them. Turn them into questions.';break;
   case 'bin':m='Binning it hides the gap. Missed cards need practice soon.';break;
   case 'easy':m='Practising only easy cards feels good but leaves the gaps. Do the misses first.';break;
   case 'answer':m='That front gives the answer away. Ask a question instead.';break;
   case 'vague':m='One word is too vague to test. Ask one clear question.';break;
   case 'count':m='Length is not the point. Checking finds what is wrong or missing.';break;
   case 'done':m='Without checking, mistakes stay hidden. Mark it against your notes.';break;
   case 'effort':m='It takes more effort, not less. That effort is what makes memories last.';break;
   case 'never':m='Re-reading is not useless, just weaker. Read first, then test yourself.';break;
   case 'flip':m='Flipping at once turns it into re-reading. Try first, even if you are not sure.';break;
   default:m='Guessing is fine, but you must check, or a wrong answer gets learned.'}
  const good=tag==='ok';if(good){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${good?'✓':'✗'} ${m}${good?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
 function down(p){const v=view();S.drag=null;S.at=null;
  if(v==='front'&&S.fok<5){const i=[0,1].find(i=>inR(p,half(i)));if(i!=null)judge(i===0);return false}
  if(v==='cover'&&nG()<4){if(p.y<A.H*.46){S.cov?peek():cover();return false}const i=[0,1,2].find(i=>inR(p,optR(i)));if(i!=null)answer(i);return false}
  if(v==='leit'&&S.left.length){if(inR(p,deckR())){S.drag=S.left[0];S.at=p;return true}const i=[0,1,2].find(i=>inR(p,bxR(i)));if(i!=null)file(i);return false}
  if(v==='dump'){for(let i=0;i<3;i++){if(inR(p,lineR(i,0)))return mark(i),false;if(inR(p,lineR(i,1)))return addMiss(i),false}return false}
  if(v==='plan'){const s=[0,1,2].find(i=>inR(p,slotR(i)));if(s!=null){clearSlot(s);return false}const i=BLK.findIndex((_,i)=>inR(p,blkR(i)));if(i>=0)addBlk(i);return false}return false}
 function move(p){if(S.drag==null)return;S.at=p;A.redraw()}
 function up(p){const d=S.drag;S.drag=null;S.at=null;if(d==null)return A.redraw();const i=[0,1,2].find(i=>inR(p,bxR(i)));if(i!=null)file(i);else A.redraw()}
 A=FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:A=>{chal.hidden=A.step!==5;read.hidden=A.step===5;pad.hidden=A.step===5;refresh()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
   A.gest({down,move,up});refresh()}});
 A.start()})})();
