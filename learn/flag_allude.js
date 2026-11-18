/* Flagship – cultural allusions and word meaning (ages 9–10): an allusion is a short reference to a famous story, so a
   few words carry the story's meaning. Tap the allusion in a sentence, drag each one onto its myth, choose which part of
   the story is borrowed, trace everyday words back to gods (panic, cereal, volcano, January), then read meaning from
   context, including Scrooge and the Good Samaritan. Drag or tap on the canvas; buttons below mirror every move. */
(()=>{
 const SPOT=[[['Cleaning','out','the','garage','was','a','Herculean','task.'],6],[['Spelling','is','my','Achilles’ heel.'],3],
  [['One','question','opened','a','Pandora’s box','of','arguments.'],4],[['Uncle','Ray','never','shares:','he','is','a','real','Scrooge.'],8]];
 const TALES=[['Hercules','did 12 labours that seemed impossible'],['Achilles','could only be hurt on his heel'],['Pandora','opened a jar and let every trouble out'],['King Midas','turned all he touched to gold']];
 const NAMES=[['Pandora’s box',2],['Herculean task',0],['Midas touch',3],['Achilles’ heel',1]];
 const BORROW=[['Trojan horse','Soldiers hid inside a huge wooden horse. Troy pulled the “gift” into the city.',['a very big animal','a trick hidden inside a gift','a long war'],1],
  ['Midas touch','Everything King Midas touched turned to gold.',['golden hands','being a king','success at making money'],2],
  ['Herculean','Hercules did 12 huge labours, like beating a nine-headed monster.',['a very hard job','being a man','wearing a lion skin'],0],
  ['Pandora’s box','Once Pandora opened the jar, the troubles flew out and could not be put back.',['being curious','trouble that cannot be stopped once started','a useful box'],1]];
 const PART_WHY={'a very big animal':'The size is not the point. A Trojan horse is something that looks harmless but hides harm.','a long war':'The war is the background. The famous part is the trick.',
  'golden hands':'Nobody means real gold hands. It borrows the idea that everything turns to treasure.','being a king':'Lots of kings are not Midas. The famous part is the gold.',
  'being a man':'It is not about being a man. Herculean borrows how huge and hard his labours were.','wearing a lion skin':'The lion skin is a detail, not the meaning.',
  'a useful box':'It is not about boxes. It is about trouble that escapes and cannot be put back.','being curious':'Pandora was curious, but the saying is about the troubles let out.'};
 const GODS=[['Pan','god of the wild; his shout scared people'],['Ceres','Roman goddess of grain'],['Vulcan','Roman god of fire'],['Janus','god of doors, with two faces']];
 const WORDS=[['cereal',1],['January',3],['panic',0],['volcano',2]];
 const WORD_WHY=['Panic comes from Pan: a sudden fear like the one his shout caused.','Cereal comes from Ceres, the goddess of grain and crops.','Volcano comes from Vulcan, whose forge was said to be under a mountain.','January comes from Janus, who looks back and forward, like the start of a year.'];
 const READ=[['The free game was a Trojan horse: it secretly filled Dad’s phone with adverts.',['a toy horse','a trick that hides harm','a fun gift'],1],
  ['A Good Samaritan stopped to help the lost boy find his mum.',['a person from a town called Samaria','a police officer','a kind stranger who helps'],2],
  ['With her Midas touch, every shop Ana opened made money.',['great success at making money','gold-coloured hands','bad luck'],0],
  ['The coach found the team’s Achilles’ heel: they never defend corners.',['a foot injury','their one weak spot','their best player'],1]];
 const READ_WHY=['A toy horse reads it word for word, and a fun gift ignores the adverts. The context shows harm hidden inside.','The parable in the Bible tells of a stranger from Samaria who helps an injured man. It now means any kind helper.',
  'Nobody’s hands are gold. The shops made money, so it means success.','The clue is “never defend corners”: one weak spot, not a real heel.'];
VIS.reg('flagallude',c=>{let A,row,quiz;
 const T={run:0,k:0,hold:null,at:null,say:'',miss:false,watch:()=>{}};
 const stage=()=>['spot','tale','borrow','gods','read','quiz'][A.step];
 const live=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
 const no=t=>{T.miss=true;T.say=t;A.sound.miss();live(t);A.redraw()};
 const ok=t=>{T.miss=false;T.say=t;A.sound.pop()};
 const big=n=>A.narrow?n:Math.round(n*1.16);
 function put(g,s,x,y,n,col,w){g.font=`${w||700} ${big(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col;g.fillText(s,x,y,A.W-16)}
 function wrapPut(g,s,x,y,n,col,mw){g.font=`700 ${big(n)}px system-ui,sans-serif`;const L=[];let cur='';for(const w of s.split(' ')){const t=cur?cur+' '+w:w;if(cur&&g.measureText(t).width>mw){L.push(cur);cur=w}else cur=t}L.push(cur);const lh=big(n)+5;L.forEach((l,i)=>put(g,l,x,y+(i-(L.length-1)/2)*lh,n,col))}
 function panel(g,r,col,f,thick){g.fillStyle=A.alpha(col,f);A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=col;g.lineWidth=thick?4:2;g.stroke()}
 const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 const slot=(i,cols,top,h)=>{const gap=10,w=(A.W-gap*(cols+1))/cols;return{x:gap+(i%cols)*(w+gap),y:top+Math.floor(i/cols)*(h+gap),w,h}};
 function chips(words){const g=A.ctx;g.font=`700 ${big(17)}px system-ui,sans-serif`;const h=big(17)+18,out=[];let x=14,y=A.H*.2;
  words.forEach(w=>{const wd=g.measureText(w).width+20;if(x+wd>A.W-14){x=14;y+=h+10}out.push({x,y,w:wd,h});x+=wd+8});
  const lines={};out.forEach(r=>{(lines[r.y]=lines[r.y]||[]).push(r)});Object.values(lines).forEach(L=>{const end=L[L.length-1],shift=(A.W-14-(end.x+end.w)-14+14)/2;L.forEach(r=>r.x+=shift)});return out}
 const dragCard=()=>{let r={x:A.W/2-90,y:A.H*.05,w:180,h:A.H*.16};if(T.hold!=null&&T.at)r={...r,x:T.at.x-90,y:T.at.y-r.h/2};return r};
 const taleR=j=>slot(j,2,A.H*.26,A.H*.21);
  function line(g){if(!T.say)return;const C=A.col;g.font=`700 ${big(13)}px system-ui,sans-serif`;const L=[];let cur='';
  for(const w of T.say.split(' ')){const t=cur?cur+' '+w:w;if(cur&&g.measureText(t).width>A.W-46){L.push(cur);cur=w}else cur=t}L.push(cur);
  const lh=big(13)+5,h=L.length*lh+12,y=A.H-h-6;panel(g,{x:12,y,w:A.W-24,h},T.miss?C.rd:C.gr,.13);L.forEach((l,i)=>put(g,(i?'':T.miss?'✗ ':'✓ ')+l,A.W/2,y+6+lh*(i+.5),13,C.tx))}

 // ---------- scenes ----------
 const VIEW={
  spot(g,C){if(T.k>=SPOT.length)return put(g,'A famous name in an odd place is a clue: an allusion.',A.W/2,A.H*.25,14,C.gr);put(g,'Tap the words that point to a story',A.W/2,A.H*.09,14,C.mu);
   chips(SPOT[T.k][0]).forEach((r,i)=>{panel(g,r,C.cy,.1);put(g,SPOT[T.k][0][i],r.x+r.w/2,r.y+r.h/2,17,C.tx,700)})},
  tale(g,C){if(T.k<NAMES.length){const r=dragCard();panel(g,r,C.pk,.16,true);put(g,NAMES[T.k][0],r.x+r.w/2,r.y+r.h/2,18,C.tx,800)}else put(g,'Each allusion carries its own story.',A.W/2,A.H*.14,14,C.gr);
   TALES.forEach(([n,s],j)=>{const q=taleR(j);panel(g,q,[C.am,C.vi,C.or,C.gr][j],.12);put(g,n,q.x+q.w/2,q.y+18,14,C.tx,800);wrapPut(g,s,q.x+q.w/2,q.y+q.h*.62,12,C.tx,q.w-14)})},
  borrow(g,C){if(T.k>=BORROW.length)return put(g,'An allusion borrows what the story is famous for.',A.W/2,A.H*.25,14,C.gr);const [n,s,o]=BORROW[T.k],r={x:14,y:A.H*.04,w:A.W-28,h:A.H*.28};panel(g,r,C.vi,.12,true);
   put(g,n,A.W/2,r.y+18,16,C.tx,800);wrapPut(g,s,A.W/2,r.y+r.h*.62,13,C.tx,r.w-20);put(g,'What does the saying borrow?',A.W/2,A.H*.36,12,C.mu);o.forEach((t,j)=>{const q=slot(j,1,A.H*.4,A.H*.1);panel(g,q,C.cy,.1);put(g,t,q.x+q.w/2,q.y+q.h/2,14,C.tx,700)})},
  gods(g,C){if(T.k<WORDS.length){const r=dragCard();panel(g,r,C.cy,.16,true);put(g,WORDS[T.k][0],r.x+r.w/2,r.y+r.h/2,21,C.tx,800)}else put(g,'Myths hide inside everyday words.',A.W/2,A.H*.14,14,C.gr);
   GODS.forEach(([n,s],j)=>{const q=taleR(j);panel(g,q,[C.or,C.am,C.rd,C.vi][j],.12);put(g,n,q.x+q.w/2,q.y+18,15,C.tx,800);wrapPut(g,s,q.x+q.w/2,q.y+q.h*.62,12,C.tx,q.w-14)})},
  read(g,C){if(T.k>=READ.length)return put(g,'Story plus context gives the meaning.',A.W/2,A.H*.25,14,C.gr);const [s,o]=READ[T.k],r={x:14,y:A.H*.04,w:A.W-28,h:A.H*.27};panel(g,r,C.pk,.12,true);wrapPut(g,s,A.W/2,r.y+r.h/2,14,C.tx,r.w-20);
   put(g,'What does it mean here?',A.W/2,A.H*.36,12,C.mu);o.forEach((t,j)=>{const q=slot(j,1,A.H*.4,A.H*.1);panel(g,q,C.am,.1);put(g,t,q.x+q.w/2,q.y+q.h/2,14,C.tx,700)})}};
 function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.06:.35);g.fillRect(0,0,W,H);const f=VIEW[stage()];if(f)f(g,C);else put(g,'a few words, a whole story',W/2,H/2,18,C.tx);line(g);A.fx.draw(g)}

 // ---------- moves ----------
 function tapWord(i){const s=SPOT[T.k];if(!s)return;if(i!==s[1])return no(`“${s[0][i]}” is an ordinary word here. Look for a name from a story; it usually has a capital letter.`);T.k++;ok(`${s[0][i].replace(/[.:]$/,'')} points to a story.`);sync()}
 function toTale(j){const n=NAMES[T.k];if(!n)return;if(j!==n[1])return no(`${n[0]} is not about ${TALES[j][0]}. Which story has the same name in it?`);T.k++;ok(`${n[0]}: ${TALES[j][0]} ${TALES[j][1]}.`);sync()}
 function borrow(j){const b=BORROW[T.k];if(!b)return;if(j!==b[3])return no(PART_WHY[b[2][j]]);T.k++;ok(`${b[0]} borrows ${b[2][j]}.`);sync()}
 function toGod(j){const w=WORDS[T.k];if(!w)return;if(j!==w[1])return no(`${w[0]} is not from ${GODS[j][0]}. Think about what ${w[0]} means and which god matches it.`);T.k++;ok(WORD_WHY[j]);sync()}
 function readIt(j){const r=READ[T.k];if(!r)return;if(j!==r[2])return no(READ_WHY[T.k]);T.k++;ok(`${r[1][j]}. ${READ_WHY[T.k-1]}`);sync()}

 function sync(){const v=stage();let s='';
  if(v==='spot')s=T.k<SPOT.length?`Sentence: ${SPOT[T.k][0].join(' ')}`:'All allusions found.';else if(v==='tale')s=T.k<NAMES.length?`Card: ${NAMES[T.k][0]}. Which story?`:'All matched.';
  else if(v==='borrow')s=T.k<BORROW.length?`${BORROW[T.k][0]}: ${BORROW[T.k][1]} What does the saying borrow?`:'All done.';else if(v==='gods')s=T.k<WORDS.length?`Word: ${WORDS[T.k][0]}. Which god?`:'All words traced.';
  else if(v==='read')s=T.k<READ.length?`Sentence: ${READ[T.k][0]}`:'All read.';else s='Challenge.';
  live((T.say?T.say+' ':'')+s);controls();T.watch()}
 function controls(){if(!row)return;row.innerHTML='';const v=stage(),add=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},row,t);e.onclick=f};
  if(v==='spot'&&T.k<SPOT.length)SPOT[T.k][0].forEach((w,i)=>add(w,()=>tapWord(i),`Choose ${w}`));
  if(v==='tale'&&T.k<NAMES.length)TALES.forEach(([n],j)=>add(n,()=>toTale(j),`${NAMES[T.k][0]} is from ${n}`));
  if(v==='borrow'&&T.k<BORROW.length)BORROW[T.k][2].forEach((t,j)=>add(t,()=>borrow(j)));
  if(v==='gods'&&T.k<WORDS.length)GODS.forEach(([n],j)=>add(n,()=>toGod(j),`${WORDS[T.k][0]} comes from ${n}`));
  if(v==='read'&&T.k<READ.length)READ[T.k][1].forEach((t,j)=>add(t,()=>readIt(j)));A.redraw()}

 function press(p){const v=stage();T.hold=null;T.at=null;
  if(v==='spot'&&T.k<SPOT.length){const i=chips(SPOT[T.k][0]).findIndex(r=>hit(p,r));if(i>=0)tapWord(i);return false}
  if((v==='tale'&&T.k<NAMES.length)||(v==='gods'&&T.k<WORDS.length)){const j=[0,1,2,3].find(j=>hit(p,taleR(j)));if(j!=null){v==='tale'?toTale(j):toGod(j);return false}if(hit(p,dragCard())){T.hold=0;T.at=p;return true}return false}
  if(v==='borrow'&&T.k<BORROW.length){const j=[0,1,2].find(j=>hit(p,slot(j,1,A.H*.4,A.H*.1)));if(j!=null)borrow(j);return false}
  if(v==='read'&&T.k<READ.length){const j=[0,1,2].find(j=>hit(p,slot(j,1,A.H*.4,A.H*.1)));if(j!=null)readIt(j);return false}
  return false}
 function release(p){const v=stage(),h=T.hold;T.hold=null;T.at=null;if(h==null)return A.redraw();const j=[0,1,2,3].find(j=>hit(p,taleR(j)));
  if(j==null)return A.redraw();v==='tale'?toTale(j):toGod(j)}

 // ---------- steps ----------
 const finish=(n,test,msg)=>()=>{if(A.step===n&&test()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
 const auto=fs=>{const id=++T.run,dt=A.reduced()?15:320;fs.forEach((f,i)=>setTimeout(()=>{if(id===T.run)f()},i*dt))};
 const clear=()=>{T.run++;T.watch=()=>{};T.k=0;T.say='';T.miss=false;T.hold=null};
 const steps=[
  {h:'Spot the allusion',p:'An allusion is a short mention of a famous story or person. The writer expects you to know the story. Tap the words in each sentence that point to a story.',
   predict:{q:'“Spelling is my Achilles’ heel.” Is the writer talking about a foot?',opts:['Yes: a sore heel','No: a weak spot'],ans:1},task:'Find 4 allusions',
   show:()=>{steps[0].go();auto(SPOT.map(([,i])=>()=>tapWord(i)))},go:()=>{clear();sync();T.watch=finish(0,()=>T.k>=SPOT.length,'Herculean, Achilles’ heel, Pandora’s box and Scrooge all point to stories.')}},
  {h:'Match the story',p:'Each allusion comes from its own story. Many come from Greek myths. Drag the card onto the story it comes from, or tap the story.',task:'Match 4 allusions',
   show:()=>{steps[1].go();auto(NAMES.map(([,j])=>()=>toTale(j)))},go:()=>{clear();sync();T.watch=finish(1,()=>T.k>=NAMES.length,'Know the story and the saying makes sense.')}},
  {h:'Which part is borrowed?',p:'An allusion borrows the one thing its story is famous for, not every detail. Read the story and tap what the saying borrows.',
   predict:{q:'“He has the Midas touch.” Is that praise or a warning?',opts:['A warning: Midas was cursed','Praise: he makes money from everything'],ans:1},task:'Choose for 4 sayings',
   show:()=>{steps[2].go();auto(BORROW.map(b=>()=>borrow(b[3])))},go:()=>{clear();sync();T.watch=finish(2,()=>T.k>=BORROW.length,'A hidden trick, money-making success, a huge job, unstoppable trouble.')}},
  {h:'Gods hiding in words',p:'Some everyday words are named after gods from Greek and Roman myths. Drag each word onto the god it comes from, or tap the god.',
   predict:{q:'Is the word cereal named after someone in a myth?',opts:['No: it is just a food word','Yes: a goddess'],ans:1},task:'Trace 4 words',
   show:()=>{steps[3].go();auto(WORDS.map(([,j])=>()=>toGod(j)))},go:()=>{clear();sync();T.watch=finish(3,()=>T.k>=WORDS.length,'Panic, cereal, volcano and January all carry a myth inside them.')}},
  {h:'Use the context',p:'Allusions also come from the Bible and famous books, like Scrooge from A Christmas Carol. Use the story and the rest of the sentence to choose the meaning.',task:'Read 4 sentences',
   show:()=>{steps[4].go();auto(READ.map(r=>()=>readIt(r[2])))},go:()=>{clear();sync();T.watch=finish(4,()=>T.k>=READ.length,'The story gives the idea; the sentence tells you how it is used.')}},
  {h:'Challenge',p:'',go:()=>{clear();next()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>T.watch()});

 // ---------- challenge: each wrong pick names the slip ----------
 const Q=[['“Moving house was a Herculean task.” What does Herculean mean here?','very hard',[['done by a strong man','literal'],['very quick','part']]],
  ['“Don’t open that Pandora’s box!” means:','don’t start trouble you can’t stop',[['don’t open the box','literal'],['don’t get greedy for gold','source']]],
  ['Which allusion means a weak spot?','Achilles’ heel',[['Midas touch','source'],['Herculean task','source']]],
  ['“She is a real Scrooge at Christmas.” What is she like?','mean with money',[['very old','part'],['haunted by ghosts','literal']]],
  ['Where does the word panic come from?','Pan, a god of the wild',[['a pan for cooking','literal'],['Janus, the god of doors','source']]],
  ['A “Trojan horse” email is one that …','looks safe but hides harm',[['is about horses','literal'],['is very long','part']]]];
 function why(tag,w){let m='Think about the story behind the words.';
  if(tag==='literal')m=`“${w}” reads the words literally. An allusion borrows the story’s meaning, not the objects in it.`;
  if(tag==='part')m=`“${w}” takes the wrong part of the story. Ask what the story is famous for.`;
  if(tag==='source')m=`“${w}” comes from a different story. Match the name to its own story.`;
  return m}
 let qi=-1,streak=0;
 function next(){qi++;const [q,ans,bad]=Q[qi%Q.length],all=[[ans,'ok']].concat(bad),r=qi%3,order=all.slice(r).concat(all.slice(0,r));
  quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const pick=quiz.querySelector('.fl-pick');order.forEach(([w,tag])=>{const e=c.el('button',{type:'button',class:'lbtn'},pick,w);e.onclick=()=>answer(tag,w,ans)});live('Challenge: '+q);A.redraw()}
 function answer(tag,w,ans){quiz.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const good=tag==='ok',fb=quiz.querySelector('.fl-fb');
  if(good){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Yes: '+ans+'. Streak: '+streak+'.':'✗ '+why(tag,w)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=next}

 A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;row.hidden=A.step===5;controls()},
  init:A=>{const w=c.el('div',{class:'fl-below'},A.below);row=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Allusion controls'},w);quiz=c.el('div',{class:'fl-chal'},A.below);
   A.gest({down:press,move:p=>{T.at=p;A.redraw()},up:release})}});
 A.start()})})();
