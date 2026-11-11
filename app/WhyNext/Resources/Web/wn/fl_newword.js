/* Flagship – discussing and questioning new words (ages 5–7): stop and ask, find picture and word clues, test a guess
   in the gap, link new words to known ones, and see a known word (bat, bill) with a new meaning. */
(()=>{
 const ELE={s:'The enormous elephant could not fit through the door.'.split(' ')};
 const SAM={s:'Sam was famished. He ate three bowls of soup!'.split(' '),clue:[4,5,6,8]};
 const MEAN=[['very hungry','ok'],['famous','looks'],['very sleepy','nofit']];
 const SWAP=[{s:'The ___ elephant could not fit through the door.',was:'enormous',cards:[['tiny','small'],['happy','feel'],['huge','ok']]},
  {s:'The ___ kitten curled up and fell asleep.',was:'drowsy',cards:[['hungry','food'],['sleepy','ok'],['angry','hiss']]}];
 const NEW=['enormous','famished','drowsy','furious'],OLD=['angry','big','sleepy','hungry'],PAIRS={enormous:'big',famished:'hungry',drowsy:'sleepy',furious:'angry'};
 const LINKWHY={enormous:'really, really big',famished:'really, really hungry',drowsy:'very sleepy',furious:'really, really angry'};
 const MULTI=[['The bat flew out of the cave at night.',[['🦇','an animal'],['🏏','a cricket bat']],0],
  ['Mia hit the ball with her bat.',[['🦇','an animal'],['🏏','a cricket bat']],1],
  ['The duck dips its bill in the pond.',[['🦆','a beak'],['🧾','money to pay']],0],
  ['Dad has to pay the bill for the pizza.',[['🦆','a beak'],['🧾','money to pay']],1]];
VIS.reg('flagnewword',c=>{let A,pad,quiz;c.fig.classList.add('young');
 const G={asked:0,clue:0,picks:[],meant:0,miss:'',r:0,put:[null,null],fits:[0,0],lk:{},held:null,at:null,from:null,mi:0,mdone:[],tok:0,boxes:[],onChange:()=>{}};
 const mode=()=>['ask','clue','swap','link','multi','quiz'][A.step];
 function speak(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
 const big=n=>A.narrow?n:Math.round(n*1.15),F=(w,n)=>`${w} ${big(n)}px system-ui,sans-serif`;
 const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;

 // ---------- layout ----------
 const pageR=()=>({x:10,y:10,w:A.W-20,h:A.H*(A.narrow?.27:.33)});
 const picR=()=>{const p=pageR();return{x:10,y:p.y+p.h+10,w:A.W-20,h:A.H-p.h-30}};
 function words(g,ws,r,fs){g.font=F(800,fs);const sp=g.measureText(' ').width+14,lh=big(fs)*1.9,out=[];let x=r.x+14,y=r.y+big(fs)*1.6;
  ws.forEach((w,i)=>{const tw=g.measureText(w).width;if(x>r.x+14&&x+tw>r.x+r.w-14){x=r.x+14;y+=lh}out.push({x:x-5,y:y-big(fs)*1.05,w:tw+10,h:big(fs)*1.55,i,w0:w,tx:x,ty:y});x+=tw+sp});return out}
 function tile(g,r,col,a,thick){g.fillStyle=A.alpha(col,a||.14);A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.strokeStyle=col;g.lineWidth=thick?4:2;g.stroke()}
 function say(g,t,x,y,n,col,w){g.font=F(w||800,n);g.textAlign='center';g.textBaseline='middle';g.fillStyle=col;g.fillText(t,x,y,A.W-20)}
 function emo(g,e,x,y,n){g.font=`${Math.round(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText(e,x,y)}
 const pill=(t,x,y,bg)=>A.paint.label(t,x,y,{font:F(800,12),bg});
 function cardsR(n,y,h){const gap=10,w=(A.W-20-gap*(n-1))/n;return[...Array(n)].map((_,i)=>({x:10+i*(w+gap),y,w,h}))}

 // ---------- drawing ----------
 function drawPage(g,ws,nw,hiClues){const C=A.col,r=pageR();tile(g,r,C.mu,.07);G.boxes=words(g,ws,r,17);
  G.boxes.forEach(b=>{const isNew=b.i===nw,isClue=hiClues&&G.picks.includes(b.i);
   if(isNew){tile(g,b,G.asked||mode()!=='ask'?C.vi:C.or,.22,true);if(mode()==='ask'&&!G.asked)pill('?',b.x+b.w-4,b.y-6,'#b45309')}
   if(isClue)tile(g,b,C.gr,.25,true);ink(g,b)})}
 const ink=(g,b)=>{g.font=F(800,17);g.textAlign='left';g.textBaseline='alphabetic';g.fillStyle=A.col.tx;g.fillText(b.w0,b.tx,b.ty)};
 function door(g,x,y,w,h){g.fillStyle='#92400e';g.fillRect(x,y,w,h);g.fillStyle='#fbbf24';g.beginPath();g.arc(x+w*.8,y+h*.55,4,0,7);g.fill()}
 function drawAsk(g){const C=A.col,r=picR();drawPage(g,ELE.s,1);const dh=r.h*.62,dw=dh*.45,dx=r.x+r.w*.62,dy=r.y+r.h-dh-8;
  door(g,dx,dy,dw,dh);G.ele={x:r.x+r.w*.12,y:r.y+r.h*.12,w:r.w*.48,h:r.h*.84};emo(g,'🐘',G.ele.x+G.ele.w*.55,G.ele.y+G.ele.h*.52,Math.min(G.ele.w,G.ele.h)*.95);
  G.sun={x:r.x+r.w*.82,y:r.y+4,w:r.w*.17,h:r.h*.3};emo(g,'☀️',G.sun.x+G.sun.w/2,G.sun.y+G.sun.h/2,Math.min(52,r.h*.24));
  if(G.clue){g.strokeStyle=C.gr;g.lineWidth=4;g.strokeRect(G.ele.x,G.ele.y,G.ele.w,G.ele.h);pill('too big for the door!',G.ele.x+G.ele.w/2,G.ele.y+G.ele.h-12,'#047857')}
  if(G.asked)pill('What does enormous mean?',A.W*.4,r.y+12,'#6d28d9')}
 function drawClue(g){const C=A.col,r=picR();drawPage(g,SAM.s,2,1);say(g,`Clue words found: ${G.picks.length} of 2`,A.W/2,r.y+18,14,C.tx);
  if(G.picks.length>=2){G.cards=cardsR(3,r.y+40,Math.min(110,r.h-56));G.cards.forEach((q,i)=>{const [t,tag]=MEAN[i],bad=G.miss===tag;tile(g,q,G.meant&&tag==='ok'?C.gr:bad?C.rd:C.cy,.14,G.meant&&tag==='ok');say(g,t,q.x+q.w/2,q.y+q.h/2,14,C.tx)})}
  else{G.cards=null;emo(g,'🔎',A.W/2,r.y+r.h*.58,Math.min(70,r.h*.45))}}
 function drawSwap(g){const C=A.col,R=SWAP[G.r],p=pageR(),r=picR(),put=G.put[G.r];tile(g,p,C.mu,.07);
  const ws=R.s.split(' ').map(w=>w==='___'?(put!=null?R.cards[put][0]:'_____'):w);G.boxes=words(g,ws,p,17);
  G.boxes.forEach(b=>{if(R.s.split(' ')[b.i]==='___'){tile(g,b,put==null?C.or:R.cards[put][1]==='ok'?C.gr:C.rd,.22,true);G.gap=b}ink(g,b)});
  say(g,`The book said: ${R.was}`,A.W/2,p.y+p.h-14,12,C.mu,700);
  const tag=put==null?'':R.cards[put][1];
  const sh=r.h-74;if(G.r===0){const dh=sh*.62,dw=dh*.45,dx=r.x+r.w*.55,dy=r.y+sh-dh;door(g,dx,dy,dw,dh);const sz=tag==='small'?dh*.35:tag?sh*.8:sh*.62,ex=tag==='small'?dx+dw*1.5:r.x+r.w*.3;emo(g,'🐘',ex,dy+dh-sz*.5,sz);if(tag==='feel')emo(g,'😊',ex,dy+dh-sz*1.05,30)}
  else{const sc=r.y+sh*.6;emo(g,'🐱',r.x+r.w*.35,sc,Math.min(70,sh*.45));if(tag==='ok')emo(g,'💤',r.x+r.w*.5,sc-40,34);if(tag==='food')emo(g,'🐟',r.x+r.w*.55,sc,34);if(tag==='hiss')emo(g,'💢',r.x+r.w*.5,sc-40,34)}
  if(tag)pill(tag==='ok'?'it still makes sense!':'that does not fit',r.x+r.w*.35,r.y+14,tag==='ok'?'#047857':'#b91c1c');
  G.cards=cardsR(3,r.y+r.h-60,52).map((q,i)=>({...q,i}));G.cards.forEach((q,i)=>{if(put===i)return;let b=q;if(G.held===i&&G.at)b={...q,x:G.at.x-q.w/2,y:G.at.y-q.h/2};tile(g,b,C.cy,.16,G.held===i);say(g,R.cards[i][0],b.x+b.w/2,b.y+b.h/2,15,C.tx)})}
 function linkR(){const r={x:10,y:10,w:A.W-20,h:A.H-20},h=Math.min(64,(r.h-30)/4-10),w=r.w*.36;return{L:NEW.map((_,i)=>({x:r.x,y:r.y+24+i*(h+10),w,h})),R:OLD.map((_,i)=>({x:r.x+r.w-w,y:r.y+24+i*(h+10),w,h}))}}
 function drawLink(g){const C=A.col,{L,R}=linkR();say(g,'New word',L[0].x+L[0].w/2,14,12,C.mu,700);say(g,'Word I know',R[0].x+R[0].w/2,14,12,C.mu,700);
  NEW.forEach((w,i)=>{const o=G.lk[w];if(o){const j=OLD.indexOf(o);g.strokeStyle=C.gr;g.lineWidth=4;g.beginPath();g.moveTo(L[i].x+L[i].w,L[i].y+L[i].h/2);g.lineTo(R[j].x,R[j].y+R[j].h/2);g.stroke()}});
  if(G.held!=null&&G.at){const L0=L[G.held];g.strokeStyle=C.or;g.lineWidth=3;g.setLineDash([6,5]);g.beginPath();g.moveTo(L0.x+L0.w,L0.y+L0.h/2);g.lineTo(G.at.x,G.at.y);g.stroke();g.setLineDash([])}
  NEW.forEach((w,i)=>{tile(g,L[i],G.lk[w]?C.gr:G.held===i?C.or:C.vi,.15,G.held===i);say(g,w,L[i].x+L[i].w/2,L[i].y+L[i].h/2,15,C.tx)});
  OLD.forEach((w,j)=>{const bad=G.miss===w;tile(g,R[j],bad?C.rd:C.cy,.15,bad);say(g,w,R[j].x+R[j].w/2,R[j].y+R[j].h/2,15,C.tx)})}
 function drawMulti(g){const C=A.col,M=MULTI[Math.min(G.mi,3)],p=pageR(),r=picR();tile(g,p,C.mu,.07);const ws=M[0].split(' ');G.boxes=words(g,ws,p,17);
  G.boxes.forEach(b=>{const k=/^(bat|bill)\.?$/.test(b.w0);if(k)tile(g,b,C.vi,.2,true);ink(g,b)});
  say(g,`Sentence ${Math.min(G.mi+1,4)} of 4`,A.W/2,p.y+p.h-14,12,C.mu,700);
  G.cards=cardsR(2,r.y+8,r.h-16);G.cards.forEach((q,i)=>{const ok=G.mdone.includes(G.mi)&&i===M[2],bad=G.miss==='m'+i;tile(g,q,ok?C.gr:bad?C.rd:C.cy,.12,ok||bad);emo(g,M[1][i][0],q.x+q.w/2,q.y+q.h*.42,Math.min(q.w*.45,q.h*.5));say(g,M[1][i][1],q.x+q.w/2,q.y+q.h*.84,14,C.tx)})}
 function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.04:.3);g.fillRect(0,0,W,H);const m=mode();
  if(m==='ask')drawAsk(g);if(m==='clue')drawClue(g);if(m==='swap')drawSwap(g);if(m==='link')drawLink(g);if(m==='multi')drawMulti(g);if(m==='quiz')emo(g,'📖',W/2,H/2,72);A.fx.draw(g)}

 // ---------- actions ----------
 function ask(){if(G.asked)return;G.asked=1;A.sound.pop();report('Good stopping! Pip asks: what does enormous mean? Now look for a clue in the picture.')}
 function look(what){if(what==='sun'){G.miss='sun';A.sound.miss();return report('The sun does not tell us about the elephant. Look at the elephant and the door.')}
  if(!G.asked)return report('First stop and ask about the new word. Tap enormous.');G.clue=1;A.sound.pop();report('Clue! The elephant is much too big for the door. Enormous means really, really big.')}
 function tapWord(i){const m=mode();
  if(m==='ask'){if(i===1)return ask();return report(`You know the word ${ELE.s[i].replace('.','')}. Find the new word with the question mark.`)}
  if(m==='clue'){if(i===2)return report('Famished is the new word. Now find words around it that give a clue.');if(G.picks.includes(i))return;
   if(SAM.clue.includes(i)){G.picks.push(i);A.sound.pop();return report(`Clue: ${SAM.s[i].replace('!','')}. ${G.picks.length>=2?'Now pick what famished means.':'Find one more clue.'}`)}
   A.sound.miss();return report(`${SAM.s[i].replace('.','')} does not help much. Look for what Sam did.`)}}
 function mean(i){if(G.meant||G.picks.length<2)return;const tag=MEAN[i][1];
  if(tag==='ok'){G.meant=1;G.miss='';A.sound.pop();return report('Yes! He ate three bowls of soup, so famished means very hungry.')}
  G.miss=tag;A.sound.miss();report(tag==='looks'?'Famished looks a bit like famous, but the clue is food. Three bowls of soup means very hungry.':'Sleepy people go to bed. Sam ate and ate. Look at the clue words again.')}
 function swap(i){const R=SWAP[G.r];if(G.fits[G.r])return;G.put[G.r]=i;const tag=R.cards[i][1];let m;
  if(tag==='ok'){G.fits[G.r]=1;A.sound.pop();m=G.r===0?'Huge fits! It still could not fit through the door. So enormous means huge.':'Sleepy fits! A sleepy kitten curls up and sleeps. So drowsy means sleepy.'}
  else{A.sound.miss();m={small:'A tiny elephant walks right through! But the book says it could not fit. Try again.',feel:'Happy does not tell us why it could not fit. Try again.',food:'A hungry kitten looks for food. It does not fall asleep. Try again.',hiss:'An angry kitten hisses. It does not curl up and sleep. Try again.'}[tag]}
  report(m);if(G.fits[G.r]&&G.r===0)later([()=>{G.r=1;report('Next sentence.')}],1400)}
 function link(w,o){if(G.lk[w])return;if(PAIRS[w]===o){G.lk[w]=o;G.miss='';G.held=null;A.sound.pop();return report(`${w} is like ${o}. ${w[0].toUpperCase()+w.slice(1)} means ${LINKWHY[w]}.`)}
  G.miss=o;A.sound.miss();report(`${w} is not like ${o}. ${w[0].toUpperCase()+w.slice(1)} means ${LINKWHY[w]}. Try another word.`)}
 function pick(i){const M=MULTI[G.mi];if(!M||G.mdone.includes(G.mi))return;
  if(i===M[2]){G.mdone.push(G.mi);G.miss='';A.sound.pop();const k=G.mi;report(`Yes: here ${/bat/.test(M[0])?'bat':'bill'} means ${M[1][i][1]}. ${k===0?'The cave is the clue.':k===1?'Hitting a ball is the clue.':k===2?'The duck is the clue.':'Paying is the clue.'}`);if(k<3)later([()=>{if(G.mi===k){G.mi++;report('Next sentence.')}}],1100);return}
  G.miss='m'+i;A.sound.miss();report(`Not here. The word is the same, but the clue words show a different meaning. ${G.mi===0?'Bats that fly live in caves.':G.mi===1?'You hit a ball with a cricket bat.':G.mi===2?'A duck has a beak.':'You pay a bill with money.'}`)}

 function report(msg){const m=mode();let t='';
  if(m==='ask')t=!G.asked?'Tap the new word.':!G.clue?'Tap a clue in the picture.':'';
  if(m==='clue')t=G.picks.length<2?`Clue words found: ${G.picks.length} of 2.`:G.meant?'':'What does famished mean?';
  if(m==='swap')t=`Sentence ${G.r+1} of 2: ${SWAP[G.r].s.replace('___','blank')}`;
  if(m==='link')t=`Linked ${Object.keys(G.lk).length} of 4.`+(G.held!=null?` Holding ${NEW[G.held]}.`:'');
  if(m==='multi'&&G.mi<4)t=MULTI[G.mi][0];
  speak((msg?msg+' ':'')+t);buttons();G.onChange()}
 function buttons(){if(!A||!pad)return;pad.innerHTML='';const m=mode(),b=(t,f,label)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':label||null},pad,t);e.onclick=f;return e};
  if(m==='ask'){if(!G.asked)b('❓ Ask: what does enormous mean?',ask);if(!G.clue){b('🐘 Look at the elephant',()=>look('ele'));b('☀️ Look at the sun',()=>look('sun'))}}
  if(m==='clue'&&!G.meant){if(G.picks.length<2)SAM.clue.filter(i=>!G.picks.includes(i)).slice(0,2).concat([0]).forEach(i=>b(`🔎 ${SAM.s[i].replace('!','')}`,()=>tapWord(i),`Is ${SAM.s[i].replace('!','')} a clue?`));else MEAN.forEach((x,i)=>b(x[0],()=>mean(i),`Famished means ${x[0]}`))}
  if(m==='swap'&&!G.fits[G.r])SWAP[G.r].cards.forEach((x,i)=>b(`Try ${x[0]}`,()=>swap(i)));
  if(m==='link'){const w=NEW.find(w=>!G.lk[w]);if(w)OLD.forEach(o=>b(`${w} → ${o}`,()=>link(w,o),`${w} is like ${o}`))}
  if(m==='multi'&&G.mi<4&&!G.mdone.includes(G.mi))MULTI[G.mi][1].forEach((x,i)=>b(`${x[0]} ${x[1]}`,()=>pick(i)));A.redraw()}

 // ---------- canvas input ----------
 const wordAt=p=>(G.boxes||[]).find(b=>inside(p,b));
 function down(p){const m=mode();G.at=p;G.from=p;
  if(m==='ask'){const w=wordAt(p);if(w)tapWord(w.i);else if(inside(p,G.sun))look('sun');else if(inside(p,G.ele))look('ele');return false}
  if(m==='clue'){const w=wordAt(p);if(w)tapWord(w.i);else if(G.cards){const k=G.cards.findIndex(q=>inside(p,q));if(k>=0)mean(k)}return false}
  if(m==='swap'){const k=(G.cards||[]).findIndex((q,i)=>inside(p,q)&&G.put[G.r]!==i);if(k>=0&&!G.fits[G.r]){G.held=k;A.redraw();return true}return false}
  if(m==='link'){const{L,R}=linkR(),i=L.findIndex(r=>inside(p,r)),j=R.findIndex(r=>inside(p,r));
   if(i>=0&&!G.lk[NEW[i]]){G.held=i;report(`Holding ${NEW[i]}. Drag to a word you know, or tap it.`);return true}
   if(j>=0&&G.held!=null)link(NEW[G.held],OLD[j]);return false}
  if(m==='multi'){const k=(G.cards||[]).findIndex(q=>inside(p,q));if(k>=0)pick(k)}return false}
 function up(p){const m=mode(),moved=G.from&&Math.hypot(p.x-G.from.x,p.y-G.from.y)>12;G.at=null;
  if(m==='swap'&&G.held!=null){const k=G.held;G.held=null;if(!moved||(G.gap&&inside(p,{x:G.gap.x-20,y:G.gap.y-20,w:G.gap.w+40,h:G.gap.h+40})))swap(k);else report('Drop the word in the gap.');return}
  if(m==='link'&&G.held!=null&&moved){const{R}=linkR(),j=R.findIndex(r=>inside(p,r));if(j>=0)link(NEW[G.held],OLD[j]);else A.redraw()}}

 // ---------- steps ----------
 const whenDone=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
 const later=(fns,ms)=>{const k=G.tok;fns.forEach((f,j)=>setTimeout(()=>{if(k===G.tok)f()},A.reduced()?j*20+20:(j+1)*ms))};
 const fresh=()=>{G.tok++;G.onChange=()=>{};Object.assign(G,{asked:0,clue:0,picks:[],meant:0,miss:'',r:0,put:[null,null],fits:[0,0],lk:{},held:null,at:null,mi:0,mdone:[],cards:null})};
 const steps=[
  {h:'Stop and ask',p:'Pip reads a new word. Tap it to ask what it means. Then find a clue in the picture.',
   predict:{q:'Pip does not know the word enormous. What should Pip do?',opts:['Skip it and read on','Stop and ask what it means'],ans:1},task:'Ask, then find a clue',
   show:()=>{steps[0].go();later([ask,()=>look('ele')],600)},go:()=>{fresh();report();G.onChange=whenDone(0,()=>G.asked&&G.clue,'Enormous means really, really big.')}},
  {h:'Word clues',p:'No picture this time. The words around a new word give clues. Tap 2 clue words.',
   predict:{q:'Famished looks a bit like famous. Does it mean famous?',opts:['Yes, it looks the same','No, check the clue words'],ans:1},task:'Find 2 clues, then pick the meaning',
   show:()=>{steps[1].go();later([()=>tapWord(5),()=>tapWord(8),()=>mean(0)],650)},go:()=>{fresh();report();G.onChange=whenDone(1,()=>G.meant,'Famished means very hungry.')}},
  {h:'Try it in the gap',p:'Test a guess. Put a word in the gap. Does the sentence still make sense?',task:'Make 2 sentences make sense',
   show:()=>{steps[2].go();later([()=>swap(2),()=>{G.r=1;swap(1)}],900)},go:()=>{fresh();report();G.onChange=whenDone(2,()=>G.fits[0]&&G.fits[1],'Your guess works if the sentence still makes sense.')}},
  {h:'Link to a word you know',p:'Join each new word to a word you know. Drag a line, or tap one then the other.',task:'Link all 4 words',
   show:()=>{steps[3].go();later(NEW.map(w=>()=>link(w,PAIRS[w])),550)},go:()=>{fresh();report();G.onChange=whenDone(3,()=>Object.keys(G.lk).length===4,'Enormous is like big, only more.')}},
  {h:'Same word, new meaning',p:'A word you know can mean something new. Read the sentence. Pick the picture.',
   predict:{q:'You know bat from cricket. "The bat flew out of the cave." Which bat?',opts:['A cricket bat','An animal bat'],ans:1},task:'Pick a picture for 4 sentences',
   show:()=>{steps[4].go();later([0,1,2,3].map(k=>()=>{G.mi=k;pick(MULTI[k][2])}),700)},go:()=>{fresh();report();G.onChange=whenDone(4,()=>G.mdone.length===4,'The clue words tell you which meaning.')}},
  {h:'Challenge',p:'',go:()=>{fresh();pose()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>G.onChange()});

 // ---------- challenge ----------
 const QS=[['Tom blew on his soup and waited. "It is scalding!" he said. What does scalding mean?','🍲',[['Very hot','ok'],['Very cold','nofit'],['Telling off','looks']]],
  ['You meet a new word in a book. What is a good thing to do?','📖',[['Stop and ask what it means','ok'],['Skip it and read on','skip'],['Shut the book','skip']]],
  ['The giant was colossal. His head touched the clouds. Colossal means…','🧌',[['Really, really big','ok'],['Really, really small','nofit'],['A kind of colour','looks']]],
  ['"The duck has an orange bill." What is the bill?','🦆',[["The duck's beak",'ok'],['Money you pay','one'],['A man called Bill','one']]],
  ['Ben was weary after the long walk. He sat down and shut his eyes. Weary means…','🥾',[['Very tired','ok'],['Very excited','nofit'],['Wearing a coat','looks']]],
  ['Tiny means really, really small. Which word you know is it like?','🐜',[['Small','ok'],['Big','nofit'],['Tidy','looks']]]];
 function slip(tag){let m='Look for the clue words around it.';
  if(tag==='nofit')m='Try your word in the gap. It does not fit the clues in the sentence.';
  if(tag==='looks')m='It looks or sounds a bit alike, but that is a trap. Use the clue words instead.';
  if(tag==='skip')m='Skipping means you miss what the story says. Stop and ask: what does it mean?';
  if(tag==='one')m='The word is one you know, but the clue words show a different meaning here.';
  return m}
 let qk=-1,stars=0;
 function pose(){qk++;const[q,e,ops]=QS[qk%QS.length],turn=qk%3;
  quiz.innerHTML=`<p><b>${e} ${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=quiz.querySelector('.fl-pick');ops.slice(turn).concat(ops.slice(0,turn)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(tag)});speak('Challenge: '+q);A.redraw()}
 function mark(tag){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),good=tag==='ok';
  if(good){stars++;A.win()}else{stars=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Yes!':'✗ '+slip(tag)}${good?` Stars: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}

 A=FK.shell(c,{steps,ratio:.66,tall:1.2,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
  init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Actions'},w);quiz=E('div',{class:'fl-chal'},A.below);
   fresh();A.gest({down,move:p=>{G.at=p;A.redraw()},up});buttons()}});
 A.start()})})();
