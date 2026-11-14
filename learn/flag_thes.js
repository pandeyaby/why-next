/* Flagship – using a thesaurus to choose words (ages 10–11): a thesaurus lists words with similar, not identical,
   meanings. File sentences under the right sense of "bright", place synonyms of thin on a kind-to-unkind scale, tap
   synonyms from weakest to strongest, sort words for a formal letter or a chat, then choose the speech verb that the
   clues in each sentence ask for. Drag or tap on the canvas; a button row below mirrors every move. */
(()=>{
 const SENSES=['1 shining: gleaming, dazzling, vivid','2 clever: smart, sharp, quick-witted'];
 const BRIGHT=[['The sun was so bright that I had to squint.',0],['Priya is a bright pupil who learns fast.',1],['He wore a bright yellow raincoat.',0],['That was a bright idea!',1]];
 const WHY_SENSE=['Squinting at the sun is about light, so this is the shining sense: dazzling fits.','A pupil who learns fast is clever, not glowing. Dazzling would sound silly here.','A yellow coat is about colour, so the shining sense fits: vivid yellow.','An idea cannot give off light. A bright idea is a clever one: a smart idea.'];
 const SCALE=['kind','plain','unkind'];
 const THIN=[['slim',0],['skinny',2],['thin',1],['slender',0],['bony',2],['scrawny',2]];
 const FEEL=['Slim and slender sound kind: they suggest thin in a good way.','Thin just states the fact. It is neither kind nor unkind.','Skinny, bony and scrawny make thin sound bad, as if something is wrong.'];
 const LADDERS=[['warm','hot','scorching'],['annoyed','angry','furious']];
 const SHOW_ORDER=[[1,2,0],[2,0,1]];
 const ROOM=['letter to the head','chat with a friend'];
 const REG=[['children',0],['kids',1],['purchase',0],['grab',1],['assist',0],['give a hand',1]];
 const REG_WHY={children:'Children is the word a careful letter uses; kids is chatty.',kids:'Kids is fine with a friend, but too chatty for the head teacher.',purchase:'Purchase is formal: it belongs in a letter. With a friend you would say buy.',
  grab:'Grab is relaxed and chatty, so keep it for a friend.',assist:'Assist is formal. To a friend you would say help.','give a hand':'Give a hand is a chatty phrase. A letter would say assist.'};
 const VERBS=['shouted','whispered','mumbled','asked'];
 const LINES=[['“Watch out for that car!” Sam ___.','shouted','a warning and an exclamation mark: it is loud'],['“Shh, the baby is asleep,” Mum ___.','whispered','a sleeping baby: it must be quiet'],
  ['“Sorry,” Leo ___, staring at his shoes.','mumbled','staring at his shoes: he is shy and hard to hear'],['“Where is the library?” Ana ___.','asked','a question mark: it is a question']];
 const EFFECT={shouted:'is loud',whispered:'is very quiet',mumbled:'is low and unclear',asked:'goes with a question'};
VIS.reg('flagthes',c=>{let A,pad,chal;
 const S={run:0,i:0,seq:[],placed:[],hold:null,at:null,msg:'',bad:false,job:0,check:()=>{}};
 const mode=()=>['sense','feel','ladder','room','fit','chal'][A.step];
 const tell=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
 const oops=t=>{S.bad=true;S.msg=t;A.sound.miss();tell(t);A.redraw()};
 const yes=t=>{S.bad=false;S.msg=t;A.sound.pop()};
 const fs=n=>Math.round(n*(A.narrow?1:1.2));
 function word(g,s,x,y,n,col,w){g.font=`${w||700} ${fs(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col;g.fillText(s,x,y,A.W-20)}
 function lines(g,s,x,y,n,col,maxW){g.font=`700 ${fs(n)}px system-ui,sans-serif`;const out=[];let cur='';s.split(' ').forEach(w=>{const t=cur?cur+' '+w:w;if(cur&&g.measureText(t).width>maxW){out.push(cur);cur=w}else cur=t});out.push(cur);
  const lh=fs(n)+5;out.forEach((l,k)=>word(g,l,x,y+(k-(out.length-1)/2)*lh,n,col));return out.length*lh}
 function box(g,r,col,f,thick){g.fillStyle=A.alpha(col,f);A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=col;g.lineWidth=thick?4:2;g.stroke()}
 const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 const cells=(k,n,top,h)=>{const gap=10,w=(A.W-gap*(n+1))/n;return{x:gap+(k%n)*(w+gap),y:top+Math.floor(k/n)*(h+gap),w,h}};
 const card=()=>{const w=Math.min(A.W-30,520),h=A.H*.2;let r={x:A.W/2-w/2,y:A.H*.05,w,h};if(S.hold!=null&&S.at)r={...r,x:S.at.x-w/2,y:S.at.y-h/2};return r};
 const senseR=j=>cells(j,2,A.H*.36,A.H*.26);
 const scaleR=j=>cells(j,3,A.H*.4,A.H*.22);
 const roomR=j=>cells(j,2,A.H*.38,A.H*.24);
 const verbR=j=>cells(j,2,A.H*.36,A.H*.15);
 const rungR=(set,k)=>cells(k,3,A.H*(set?.56:.2),A.H*.15);
 function note(g){if(!S.msg)return;const C=A.col;g.font=`700 ${fs(13)}px system-ui,sans-serif`;const out=[];let cur='';
  S.msg.split(' ').forEach(w=>{const t=cur?cur+' '+w:w;if(cur&&g.measureText(t).width>A.W-46){out.push(cur);cur=w}else cur=t});out.push(cur);
  const lh=fs(13)+5,h=out.length*lh+12,y=A.H-h-6;box(g,{x:12,y,w:A.W-24,h},S.bad?C.rd:C.gr,.13);out.forEach((l,k)=>word(g,(k?'':S.bad?'✗ ':'✓ ')+l,A.W/2,y+6+lh*(k+.5),13,C.tx))}

 // ---------- scenes ----------
 const PAINT={
  sense(g,C){if(S.i>=BRIGHT.length)return word(g,'One headword, two senses: pick the sense first.',A.W/2,A.H*.2,14,C.gr);const r=card();box(g,r,C.cy,.15,true);lines(g,BRIGHT[S.i][0],r.x+r.w/2,r.y+r.h/2,15,C.tx,r.w-24);
   word(g,'bright (adjective)',A.W/2,A.H*.31,13,C.mu);SENSES.forEach((t,j)=>{const q=senseR(j);box(g,q,j?C.vi:C.am,.14);lines(g,t,q.x+q.w/2,q.y+q.h/2,13,C.tx,q.w-16)})},
  feel(g,C){word(g,'thin: synonyms with a feeling',A.W/2,A.H*.04+fs(6),13,C.mu);SCALE.forEach((t,j)=>{const q=scaleR(j);box(g,q,[C.gr,C.cy,C.rd][j],.13);word(g,t,q.x+q.w/2,q.y+16,14,C.tx,800);
    lines(g,S.placed.filter(([,b])=>b===j).map(([w])=>w).join(', '),q.x+q.w/2,q.y+q.h*.62,11,C.tx,q.w-10)});
   if(S.i>=THIN.length)return word(g,'Same meaning, different feeling.',A.W/2,A.H*.22,15,C.gr);let r={x:A.W/2-70,y:A.H*.12,w:140,h:A.H*.17};if(S.hold!=null&&S.at)r={...r,x:S.at.x-70,y:S.at.y-r.h/2};box(g,r,C.vi,.16,true);word(g,THIN[S.i][0],r.x+r.w/2,r.y+r.h/2,22,C.tx,800)},
  ladder(g,C){LADDERS.forEach((set,s)=>{word(g,s===S.job?'Tap from weakest to strongest':'',A.W/2,A.H*(s?.5:.14),13,C.mu);SHOW_ORDER[s].forEach((k,slot)=>{const w=set[k],q=rungR(s,slot),n=s<S.job?3:s===S.job?S.seq.indexOf(k):-1,got=s<S.job||n>=0;
    box(g,q,got?C.gr:C.am,got?.2:.12,got);word(g,w,q.x+q.w/2,q.y+q.h/2-(got?6:0),17,C.tx,800);if(got)word(g,s<S.job?'✓':'#'+(n+1),q.x+q.w/2,q.y+q.h-10,11,C.tx,700)})});
   const y=A.H*.42;g.strokeStyle=C.mu;g.lineWidth=2;g.beginPath();g.moveTo(30,y);g.lineTo(A.W-30,y);g.stroke();word(g,'weaker → stronger',A.W/2,y-10,11,C.mu)},
  room(g,C){if(S.i<REG.length){let r={x:A.W/2-85,y:A.H*.06,w:170,h:A.H*.2};if(S.hold!=null&&S.at)r={...r,x:S.at.x-85,y:S.at.y-r.h/2};box(g,r,C.pk,.15,true);word(g,REG[S.i][0],r.x+r.w/2,r.y+r.h/2,21,C.tx,800)}
   else word(g,'Formal writing and chat need different words.',A.W/2,A.H*.16,14,C.gr);
   ROOM.forEach((t,j)=>{const q=roomR(j);box(g,q,j?C.or:C.cy,.13);word(g,t,q.x+q.w/2,q.y+18,13,C.tx,800);lines(g,S.placed.filter(([,b])=>b===j).map(([w])=>w).join(', '),q.x+q.w/2,q.y+q.h*.62,11,C.tx,q.w-10)})},
  fit(g,C){if(S.i>=LINES.length)return word(g,'The clues in the sentence choose the word.',A.W/2,A.H*.2,14,C.gr);const r={x:14,y:A.H*.05,w:A.W-28,h:A.H*.24};box(g,r,C.cy,.13,true);lines(g,LINES[S.i][0],A.W/2,r.y+r.h/2,16,C.tx,r.w-24);
   VERBS.forEach((w,j)=>{let q=verbR(j);if(S.hold===j&&S.at)q={...q,x:S.at.x-q.w/2,y:S.at.y-q.h/2};box(g,q,C.vi,.13);word(g,w,q.x+q.w/2,q.y+q.h/2,17,C.tx,800)})}};
 function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.06:.35);g.fillRect(0,0,W,H);const f=PAINT[mode()];if(f)f(g,C);else word(g,'sense · feeling · strength · setting',W/2,H/2,17,C.tx);note(g);A.fx.draw(g)}

 // ---------- moves ----------
 function sense(j){const it=BRIGHT[S.i];if(!it)return;if(j!==it[1])return oops(WHY_SENSE[S.i]);S.i++;yes(`Sense ${j+1}. ${WHY_SENSE[S.i-1]}`);refresh()}
 function feel(j){const it=THIN[S.i];if(!it)return;if(j!==it[1])return oops(`${it[0]} is not ${SCALE[j]}. ${FEEL[it[1]]}`);S.placed.push([it[0],j]);S.i++;yes(`${it[0]}: ${SCALE[j]}.`);refresh()}
 function rung(k){const set=LADDERS[S.job];if(!set)return;if(S.seq.includes(k))return;const want=S.seq.length;if(k!==want)return oops(`${set[k]} is not next. ${want?set[want-1]+' is weaker than ':''}${set[want]} comes ${want?'next':'first'}: it is the weakest one left.`);
  S.seq.push(k);if(S.seq.length===3){yes(`${set.join(' < ')}. They are synonyms, but not the same strength.`);S.job++;S.seq=[]}else yes(`${set[k]} is #${S.seq.length}.`);refresh()}
 function room(j){const it=REG[S.i];if(!it)return;if(j!==it[1])return oops(REG_WHY[it[0]]);S.placed.push([it[0],j]);S.i++;yes(`${it[0]}: ${ROOM[j]}.`);refresh()}
 function say(w){const it=LINES[S.i];if(!it)return;if(w!==it[1])return oops(`${w} ${EFFECT[w]}, but the clue is ${it[2]}.`);S.i++;yes(`${w}. The clue: ${it[2]}.`);refresh()}

 function refresh(){const v=mode();let s='';
  if(v==='sense')s=S.i<BRIGHT.length?`Sentence: ${BRIGHT[S.i][0]} Which sense of bright?`:'All sentences filed.';
  else if(v==='feel')s=S.i<THIN.length?`Word: ${THIN[S.i][0]}. Kind, plain or unkind?`:'All words placed.';
  else if(v==='ladder')s=S.job<2?`Words: ${SHOW_ORDER[S.job].map(k=>LADDERS[S.job][k]).join(', ')}. ${S.seq.length} in order.`:'Both sets in order.';
  else if(v==='room')s=S.i<REG.length?`Word: ${REG[S.i][0]}. Letter or chat?`:'All words sorted.';
  else if(v==='fit')s=S.i<LINES.length?`Sentence: ${LINES[S.i][0].replace('___','blank')}`:'All gaps filled.';else s='Challenge.';
  tell((S.msg?S.msg+' ':'')+s);buttons();S.check()}
 function buttons(){if(!pad)return;pad.innerHTML='';const v=mode(),b=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);e.onclick=f};
  if(v==='sense'&&S.i<BRIGHT.length)SENSES.forEach((t,j)=>b('Sense '+(j+1)+': '+t.split(':')[0].slice(2),()=>sense(j)));
  if(v==='feel'&&S.i<THIN.length)SCALE.forEach((t,j)=>b(t,()=>feel(j),`${THIN[S.i][0]} is ${t}`));
  if(v==='ladder'&&S.job<2)SHOW_ORDER[S.job].forEach(k=>{const w=LADDERS[S.job][k];if(!S.seq.includes(k))b(w,()=>rung(k),`Next weakest: ${w}`)});
  if(v==='room'&&S.i<REG.length)ROOM.forEach((t,j)=>b(t,()=>room(j)));
  if(v==='fit'&&S.i<LINES.length)VERBS.forEach(w=>b(w,()=>say(w)));A.redraw()}

 function down(p){const v=mode();S.hold=null;S.at=null;
  if(v==='sense'&&S.i<BRIGHT.length){const j=[0,1].find(j=>inside(p,senseR(j)));if(j!=null){sense(j);return false}if(inside(p,card())){S.hold=0;S.at=p;return true}}
  if(v==='feel'&&S.i<THIN.length){const j=[0,1,2].find(j=>inside(p,scaleR(j)));if(j!=null){feel(j);return false}if(p.y<A.H*.34){S.hold=0;S.at=p;return true}}
  if(v==='ladder'&&S.job<2){const slot=[0,1,2].find(k=>inside(p,rungR(S.job,k)));if(slot!=null)rung(SHOW_ORDER[S.job][slot]);return false}
  if(v==='room'&&S.i<REG.length){const j=[0,1].find(j=>inside(p,roomR(j)));if(j!=null){room(j);return false}if(p.y<A.H*.32){S.hold=0;S.at=p;return true}}
  if(v==='fit'&&S.i<LINES.length){const j=VERBS.findIndex((w,j)=>inside(p,verbR(j)));if(j>=0){S.hold=j;S.at=p;return true}}
  return false}
 function up(p){const v=mode(),h=S.hold;S.hold=null;S.at=null;if(h==null)return A.redraw();
  if(v==='sense'){const j=[0,1].find(j=>inside(p,senseR(j)));j!=null?sense(j):A.redraw()}
  else if(v==='feel'){const j=[0,1,2].find(j=>inside(p,scaleR(j)));j!=null?feel(j):A.redraw()}
  else if(v==='room'){const j=[0,1].find(j=>inside(p,roomR(j)));j!=null?room(j):A.redraw()}
  else if(v==='fit'){if(p.y<A.H*.32||inside(p,verbR(h)))say(VERBS[h]);else A.redraw()}}

 // ---------- steps ----------
 const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
 const play=list=>{const run=++S.run,gap=A.reduced()?15:320;list.forEach((f,k)=>setTimeout(()=>{if(run===S.run)f()},k*gap))};
 const reset=()=>{S.run++;S.check=()=>{};S.i=0;S.seq=[];S.placed=[];S.job=0;S.msg='';S.bad=false;S.hold=null};
 const steps=[
  {h:'Pick the right sense',p:'A thesaurus lists synonyms: words with a similar meaning. Many headwords have more than one sense, so find the sense that matches your sentence first. Drag each sentence to a sense, or tap a sense.',
   predict:{q:'Priya is a bright pupil who learns fast. Could you swap bright for dazzling?',opts:['Yes: dazzling is listed as a synonym','No: dazzling belongs to the shining sense'],ans:1},task:'File 4 sentences by sense',
   show:()=>{steps[0].go();play(BRIGHT.map(([,j])=>()=>sense(j)))},go:()=>{reset();refresh();S.check=ready(0,()=>S.i>=BRIGHT.length,'Shining or clever: the sentence decides which list to use.')}},
  {h:'Same meaning, different feeling',p:'Synonyms can carry a feeling, called connotation. Slim and skinny both mean thin, but one sounds kind and one does not. Drag each word to kind, plain or unkind, or tap a box.',
   predict:{q:'You want to describe your gran kindly. Which word fits?',opts:['skinny','slender'],ans:1},task:'Place 6 words on the scale',
   show:()=>{steps[1].go();play(THIN.map(([,j])=>()=>feel(j)))},go:()=>{reset();refresh();S.check=ready(1,()=>S.i>=THIN.length,'Slim and slender are kind, thin is plain, and skinny, bony and scrawny are unkind.')}},
  {h:'How strong is the word?',p:'Synonyms often differ in strength. Furious is much stronger than annoyed. Tap each set from the weakest word to the strongest.',
   predict:{q:'A thesaurus lists warm, hot and scorching together. Do they mean exactly the same?',opts:['Yes: they are synonyms','No: they are different strengths'],ans:1},task:'Order 2 sets of 3 words',
   show:()=>{steps[2].go();play([0,1,2,0,1,2].map(k=>()=>rung(k)))},go:()=>{reset();refresh();S.check=ready(2,()=>S.job>=2,'Warm < hot < scorching, and annoyed < angry < furious. Choose the strength you mean.')}},
  {h:'Formal or chatty?',p:'Some synonyms are formal and some are chatty. A letter to your head teacher needs different words from a message to a friend. Drag each word to where it fits best, or tap a box.',
   task:'Sort 6 words',show:()=>{steps[3].go();play(REG.map(([,j])=>()=>room(j)))},go:()=>{reset();refresh();S.check=ready(3,()=>S.i>=REG.length,'Children, purchase and assist suit a letter; kids, grab and give a hand suit a chat.')}},
  {h:'Let the clues choose',p:'Writers often repeat said. A thesaurus offers shouted, whispered and more, but each one means something different. Read the clues in each sentence, then drag the best verb up to it, or tap it.',
   task:'Fill 4 gaps',show:()=>{steps[4].go();play(LINES.map(([,w])=>()=>say(w)))},go:()=>{reset();refresh();S.check=ready(4,()=>S.i>=LINES.length,'A warning is shouted, a secret is whispered, a shy sorry is mumbled and a question is asked.')}},
  {h:'Challenge',p:'',go:()=>{reset();quiz()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.check()});

 // ---------- challenge: every wrong pick names the slip ----------
 const Q=[['Which word can replace bright in: “Ali gave a bright answer”?','clever',[['dazzling','sense'],['vivid','sense']]],
  ['Which is a kind way to say your friend is thin?','slim',[['skinny','feel'],['scrawny','feel']]],
  ['A letter to the council: “We would like to ___ more bins.”','request',[['grab','reg'],['get loads of','reg']]],
  ['Mum is a little cross that you are late. Which word is the right strength?','annoyed',[['furious','strong'],['livid','strong']]],
  ['“Help! I’m stuck!” Kai ___ from the top of the tree.','yelled',[['whispered','fit'],['muttered','fit']]],
  ['Which word can replace cool in: “The lemonade was nicely cool”?','chilled',[['calm','sense'],['freezing','strong']]]];
 function slip(tag,w){let m='Read the sentence again and check the word fits it.';
  if(tag==='sense')m=`${w} belongs to a different sense of the headword. Find the sense that matches the sentence first.`;
  if(tag==='feel')m=`${w} has an unkind feeling. Synonyms can share a meaning but not a feeling.`;
  if(tag==='reg')m=`${w} is too chatty for a formal letter. Choose the formal synonym.`;
  if(tag==='strong')m=`${w} is too strong for what is meant. Pick the synonym with the right strength.`;
  if(tag==='fit')m=`${w} does not match the clues: someone stuck and shouting Help! is loud.`;
  return m}
 let qi=-1,run=0;
 function quiz(){qi++;const [q,ans,bad]=Q[qi%Q.length],all=[[ans,'ok']].concat(bad),k=qi%3,order=all.slice(k).concat(all.slice(0,k));
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');order.forEach(([w,tag])=>{const e=c.el('button',{type:'button',class:'lbtn'},row,w);e.onclick=()=>mark(tag,w,ans)});tell('Challenge: '+q);A.redraw()}
 function mark(tag,w,ans){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=chal.querySelector('.fl-fb');
  if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes, '+ans+'. In a row: '+run+'.':'✗ '+slip(tag,w)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}

 A=FK.shell(c,{steps,ratio:.62,tall:1.12,draw,onStep:A=>{chal.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
  init:A=>{const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Thesaurus controls'},w);chal=c.el('div',{class:'fl-chal'},A.below);
   A.gest({down,move:p=>{S.at=p;A.redraw()},up})}});
 A.start()})})();
