/* Flagship – author's word choices (ages 7–9): swap one verb and watch the dog move in a new way, pick three words that
   turn a sunny night spooky, choose kind or unkind words for the same girl, feel how short and long sentences change the
   pace, and say why an author picked a word. */
(()=>{const mn=Math.min;
 const VERB=[['walked',3000,'calm and steady'],['raced',800,'fast and excited'],['crept',5200,'slow, quiet and sneaky'],['limped',4200,'hurt and tired']];
 const SLOT=[['sunny','dark'],['sang','howled'],['skipped','crept']];
 const SLOTWHY=['A “sunny” night sounds bright and safe. Which word makes it scary?','“Sang” sounds happy. Which sound is scary?','“Skipped” sounds playful. Which word sounds sneaky?'];
 const KIND=[['curious','nosy'],['brave','reckless'],['careful','fussy']];
 const KINDWHY=['“Nosy” means the same kind of thing, but it makes Sam sound annoying.','“Reckless” makes Sam sound silly, not brave. Same act, different feeling.','“Fussy” makes Sam sound hard to please. “Careful” sounds like a good thing.'];
 const PACE=[{q:'A chase! Which one feels faster?',o:['Tom ran down the hill and over the bridge and into the woods, and the dog kept on running after him.','Tom ran. The dog chased. Faster. Faster!'],a:1,bad:'Long sentences full of “and” slow you down. Short ones feel quick, like a fast heart.'},
  {q:'Bedtime. Which one feels calm and slow?',o:['Hush. Lights off. Sleep now. Go.','The moon rose slowly over the quiet hills, and the little town drifted off to sleep.'],a:1,bad:'Short, sharp bits feel quick and jumpy. A long, smooth sentence feels slow and calm.'}];
 const WHY=[{s:'The wind howled round the house.',w:'howled',o:[['It makes the wind sound like a wild animal.',''],['It tells you the wind was soft.','A howl is loud and wild, not soft. The word makes the wind sound like a wolf.'],['Authors pick words at random.','Authors choose words on purpose, to make you see or feel something.']]},
  {s:'Mia stomped up the stairs.',w:'stomped',o:[['It tells you how many stairs there were.','It tells you nothing about the stairs. Think about how Mia feels.'],['It shows Mia was cross.',''],['It shows Mia was sleepy.','Sleepy feet shuffle. Stomping is loud and heavy, like when you are cross.']]},
  {s:'The cake was a mountain of cream.',w:'mountain',o:[['The cake was really a mountain.','It is not a real mountain. The author compares the cake to one to show it was huge.'],['The cake was tiny.','A mountain is huge, so the cake is big, not tiny.'],['It shows the cake was huge.','']]}];
VIS.reg('flagauth',c=>{let A,pad,chal,read;c.fig.classList.add('young');
 const K={v:-1,x:0,tried:[],slot:[-1,-1,-1],kr:0,kok:0,kpick:-1,pr:0,pok:0,ppick:-1,wr:0,wok:0,miss:-1,gen:0,want:()=>{},Q:null};
 const say=t=>{c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(read)read.textContent=t}};
 const mode=()=>['verb','spook','kind','pace','why','quiz'][A.step];
 const sz=n=>A.narrow?n:n+3,ft=(n,w)=>`${w||700} ${sz(n)}px system-ui,sans-serif`;
 function lines(g,t,w,n,wt){g.font=ft(n,wt);const L=[];let cur='';for(const word of t.split(' ')){const tr=cur?cur+' '+word:word;if(g.measureText(tr).width>w&&cur){L.push(cur);cur=word}else cur=tr}L.push(cur);return L}
 function block(g,t,R,n,col,wt){const L=lines(g,t,R.w-20,n,wt),lh=sz(n)*1.3;let y=R.y+R.h/2-L.length*lh/2+lh/2;g.fillStyle=col;g.textAlign='center';g.textBaseline='middle';L.forEach(l=>{g.fillText(l,R.x+R.w/2,y);y+=lh})}
 const text=(g,t,x,y,n,col,wt)=>{g.font=ft(n,wt||800);g.textAlign='center';g.textBaseline='middle';g.fillStyle=col;g.fillText(t,x,y,A.W-16)};
 const box=(g,R,col,strong,fill)=>{g.fillStyle=A.alpha(col,fill||.13);A.paint.rrect(R.x,R.y,R.w,R.h,14);g.fill();g.strokeStyle=col;g.lineWidth=strong?4:2;g.stroke()};
 const inside=(p,R)=>p.x>=R.x&&p.x<=R.x+R.w&&p.y>=R.y&&p.y<=R.y+R.h;
 const nope=t=>{A.sound.miss();say(t);A.redraw()};
 const cell=(i,n,rows,r)=>{const g=8,w=(A.W-(n+1)*g)/n,h=mn(64,A.H*.12);return{x:g+i*(w+g),y:A.H-(rows-r)*(h+g)-4,w,h}};
 const emo=(g,e,x,y,n,flip)=>{g.save();g.translate(x,y);if(flip)g.scale(-1,1);g.font=`${n}px serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(e,0,0);g.restore()};
 function verbV(g){const C=A.col,w=K.v>=0?VERB[K.v][0]:'____';text(g,`The dog ${w} across the park.`,A.W/2,24,15,C.tx);
  const gy=A.H*.52;g.fillStyle=A.alpha(C.gr,.25);g.fillRect(0,gy+28,A.W,18);const x=30+K.x*(A.W-60);
  if(K.v===1)for(let i=1;i<4;i++){g.strokeStyle=A.alpha(C.mu,.7);g.lineWidth=3;g.beginPath();g.moveTo(x-30-i*12,gy-12+i*8);g.lineTo(x-60-i*12,gy-12+i*8);g.stroke()}
  emo(g,'🐕',x,gy+(K.v===3?Math.sin(K.x*40)*4:0),sz(46),1);if(K.v===2)emo(g,'🤫',x+34,gy-30,sz(22));if(K.v===3)emo(g,'🩹',x+6,gy+20,sz(18));
  if(K.v>=0)text(g,`Picture: ${VERB[K.v][2]}`,A.W/2,A.H*.3,14,C.tx,700);text(g,`Words tried: ${K.tried.length} of 4`,A.W/2,A.H*.3+sz(22),12,C.mu,600);
  VERB.forEach((v,i)=>{const R=cell(i,4,1,0);box(g,R,K.v===i?C.vi:C.cy,K.v===i);text(g,v[0],R.x+R.w/2,R.y+R.h/2,16,C.tx)})}
 function spookV(g){const C=A.col,n=K.slot.filter(s=>s===1).length,W=A.W,top=A.H*.42;
  g.fillStyle=A.mix('#bae6fd','#1e1b4b',n/3);A.paint.rrect(8,40,W-16,top-40,12);g.fill();
  emo(g,n>=1?'🌕':'☀️',W-50,74,sz(30));if(n>=3)emo(g,'🦉',60,top-30,sz(26));emo(g,K.slot[2]===1?'🐈‍⬛':'🐈',W/2,top-26,sz(30));
  if(K.slot[1]===1)for(let i=0;i<3;i++){g.strokeStyle='rgba(255,255,255,.8)';g.lineWidth=2;g.beginPath();g.moveTo(40+i*30,70+i*14);g.quadraticCurveTo(120+i*30,50+i*14,190+i*30,74+i*14);g.stroke()}
  const w=i=>K.slot[i]>=0?SLOT[i][K.slot[i]]:'____';text(g,`On a ${w(0)} night, the wind ${w(1)}, and a cat ${w(2)} past.`,W/2,20,13,C.tx);
  text(g,['Mood: happy and safe','Mood: a little odd','Mood: getting creepy','Mood: really spooky!'][n],W/2,top+16,14,n>=3?C.vi:C.tx);
  SLOT.forEach((p,r)=>p.forEach((t,i)=>{const R=cell(i,2,3,r);box(g,R,K.slot[r]===i?(i?C.vi:C.am):K.miss===r*2+i?C.rd:C.cy,K.slot[r]===i);text(g,t,R.x+R.w/2,R.y+R.h/2,15,C.tx)}))}
 function kindV(g){const C=A.col;if(K.kok>=3)return text(g,'Same girl, same acts: the words chose how you feel.',A.W/2,A.H*.4,14,C.gr);
  const p=KIND[K.kr],w=K.kpick>=0?p[K.kpick]:'____';text(g,`Pick the word that makes you like Sam (${K.kr+1} of 3)`,A.W/2,20,12,C.mu,700);
  text(g,`Sam is ${w}.`,A.W/2,56,18,C.tx);emo(g,K.kpick<0?'🙂':K.kpick?'😒':'😊',A.W/2,A.H*.38,sz(60));
  text(g,'💗'.repeat(K.kok)+'🤍'.repeat(3-K.kok),A.W/2,A.H*.56,18,C.tx);
  p.forEach((t,i)=>{const R=cell(i,2,1,0);box(g,R,K.kpick===i&&i?C.rd:C.cy,K.kpick===i);text(g,t,R.x+R.w/2,R.y+R.h/2,17,C.tx)})}
 const paceR=i=>{const h=(A.H-70)/2;return{x:10,y:40+i*(h+10),w:A.W-20,h}};
 function paceV(g){const C=A.col;if(K.pok>=2)return text(g,'Short = quick and tense. Long and smooth = slow and calm.',A.W/2,A.H*.4,13,C.gr);
  const P=PACE[K.pr];text(g,P.q,A.W/2,20,14,C.tx);P.o.forEach((t,i)=>{const R=paceR(i),on=K.ppick===i;box(g,R,on?(i===P.a?C.gr:C.rd):C.cy,on);
   block(g,t,{x:R.x,y:R.y,w:R.w,h:R.h-(on?24:0)},14,C.tx,600);if(on){const sh=t.split('.').length>3,y=R.y+R.h-14;g.strokeStyle=sh?C.rd:C.gr;g.lineWidth=2;g.beginPath();
    for(let k=0;k<=60;k++){const xx=R.x+20+k*(R.w-40)/60;g.lineTo(xx,y+Math.sin(k*(sh?1.6:.35))*7)}g.stroke()}})}
 const whyR=i=>{const h=mn(62,A.H*.15);return{x:10,y:A.H-(3-i)*(h+8)-4,w:A.W-20,h}};
 function whyV(g){const C=A.col;if(K.wok>=3)return text(g,'Every strong word was picked on purpose.',A.W/2,A.H*.4,15,C.gr);const Q=WHY[K.wr];
  text(g,`Why did the author pick “${Q.w}”?  (${K.wr+1} of 3)`,A.W/2,20,12,C.mu,700);const R0={x:10,y:40,w:A.W-20,h:A.H*.24};box(g,R0,C.am,0,.18);block(g,Q.s,R0,18,C.tx,800);
  Q.o.forEach((o,i)=>{const R=whyR(i);box(g,R,K.miss===i?C.rd:C.cy,K.miss===i);block(g,o[0],R,13,C.tx,700)})}
 function draw(A){const{ctx:g,W,H,col:C}=A,m=mode();g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.05:.35);g.fillRect(0,0,W,H);
  const f={verb:verbV,spook:spookV,kind:kindV,pace:paceV,why:whyV}[m];if(f)f(g);else text(g,K.Q||'✍️',W/2,H/2,54,C.tx);A.fx.draw(g)}
 function verb(i){K.v=i;if(!K.tried.includes(i))K.tried.push(i);A.sound.pop();K.x=0;A.tween(K,{x:1},VERB[i][1],'io');
  tell(`“${VERB[i][0]}”: the dog moves in a ${VERB[i][2]} way.`+(K.tried.length>=4?' One word, four pictures.':''))}
 function spook(r,i){if(K.slot.every(s=>s===1))return;if(i!==1){K.slot[r]=0;K.miss=r*2;return nope(SLOTWHY[r])}K.miss=-1;K.slot[r]=1;A.sound.pop();
  tell(K.slot.every(s=>s===1)?'Dark, howled, crept: three words made it spooky.':`“${SLOT[r][1]}” makes it creepier.`)}
 function kind(i){if(K.kok>=3)return;K.kpick=i;if(i){return nope(KINDWHY[K.kr])}K.kok++;A.sound.pop();const was=K.kr;
  tell(`“${KIND[was][0]}” makes Sam sound good.`);const g=K.gen;setTimeout(()=>{if(g===K.gen&&K.kr===was&&K.kok<3){K.kr=K.kok;K.kpick=-1;tell()}},A.reduced()?10:700)}
 function pace(i){if(K.pok>=2)return;const P=PACE[K.pr];K.ppick=i;if(i!==P.a)return nope(P.bad);K.pok++;A.sound.pop();const was=K.pr;
  tell(was?'Yes: the long, smooth sentence feels slow and sleepy.':'Yes: short sentences feel fast, like running.');const g=K.gen;setTimeout(()=>{if(g===K.gen&&K.pr===was&&K.pok<2){K.pr=1;K.ppick=-1;tell()}},A.reduced()?10:800)}
 function why(i){if(K.wok>=3)return;const o=WHY[K.wr].o[i];if(o[1]){K.miss=i;return nope(o[1])}K.miss=-1;K.wok++;K.wr=mn(2,K.wok);A.sound.pop();tell('Yes! '+o[0])}
 function tell(msg){const m=mode();let t;
  if(m==='verb')t=`The dog ${K.v>=0?VERB[K.v][0]:'blank'} across the park. Tried ${K.tried.length} of 4 words.`;
  else if(m==='spook'){const w=i=>K.slot[i]>=0?SLOT[i][K.slot[i]]:'blank';t=`On a ${w(0)} night, the wind ${w(1)}, and a cat ${w(2)} past. Spooky words: ${K.slot.filter(s=>s===1).length} of 3.`}
  else if(m==='kind')t=K.kok>=3?'All three done.':`Sam is ${KIND[K.kr].join(' or ')}.`;
  else if(m==='pace')t=K.pok>=2?'Both done.':`${PACE[K.pr].q} A: ${PACE[K.pr].o[0]} B: ${PACE[K.pr].o[1]}`;
  else if(m==='why')t=K.wok>=3?'All three done.':`${WHY[K.wr].s} Why “${WHY[K.wr].w}”?`;else t='Challenge time.';
  say((msg?msg+' ':'')+t);ctl();K.want()}
 function ctl(){if(!A||!pad)return;pad.innerHTML='';const m=mode();const B=(t,f,al)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':al||null},pad,t);e.onclick=f};
  if(m==='verb')VERB.forEach((v,i)=>B(v[0],()=>verb(i)));
  if(m==='spook'&&!K.slot.every(s=>s===1))SLOT.forEach((p,r)=>p.forEach((t,i)=>B(t,()=>spook(r,i))));
  if(m==='kind'&&K.kok<3)KIND[K.kr].forEach((t,i)=>B(t,()=>kind(i),`Sam is ${t}`));
  if(m==='pace'&&K.pok<2)PACE[K.pr].o.forEach((t,i)=>B('Version '+'AB'[i],()=>pace(i),t));
  if(m==='why'&&K.wok<3)WHY[K.wr].o.forEach((o,i)=>B(String.fromCharCode(65+i),()=>why(i),o[0]));A.redraw()}
 const ok=(st,cond,msg)=>()=>{if(A.step===st&&cond()&&(!steps[st].predict||A.pred[st]!=null))A.done(msg()+A.reveal(st))};
 const seq=(fs,gap)=>{const g=K.gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===K.gen)f()},A.reduced()?j*20:j*gap))};
 const reset=()=>{K.gen++;K.want=()=>{};K.Q=null;K.miss=-1};
 const steps=[
  {h:'One word, a new picture',p:'Tap a word to put it in the gap. Watch how the dog moves.',
   predict:{q:'“Walked” and “raced” both say the dog moved. Do they make the same picture?',opts:['Yes, moving is moving','No, each word shows a different way'],ans:1},task:'Try all four words',
   show:()=>{steps[0].go();seq([0,1,2,3].map(i=>()=>verb(i)),300)},go:()=>{reset();K.v=-1;K.x=0;K.tried=[];tell();K.want=ok(0,()=>K.tried.length>=4,()=>'Authors pick the verb that shows exactly how something moves.')}},
  {h:'Make it spooky',p:'Pick one word in each row. Make the night as spooky as you can.',
   predict:{q:'Can just three words turn a happy night into a spooky one?',opts:['No, you need a new story','Yes, words set the mood'],ans:1},task:'Pick a spooky word in all three rows',
   show:()=>{steps[1].go();seq([0,1,2].map(r=>()=>spook(r,1)),400)},go:()=>{reset();K.slot=[-1,-1,-1];tell();K.want=ok(1,()=>K.slot.every(s=>s===1),()=>'The mood comes from the words the author chose.')}},
  {h:'Kind words, unkind words',p:'Both words in each pair say much the same thing. Tap the one that makes you like Sam.',
   predict:{q:'“Nosy” and “curious” both mean wanting to know things. Do they make you feel the same about Sam?',opts:['Yes, they mean the same','No, one sounds kinder'],ans:1},task:'Pick the kind word three times',
   show:()=>{steps[2].go();seq([0,1,2].map(()=>()=>kind(0)),800)},go:()=>{reset();K.kr=0;K.kok=0;K.kpick=-1;tell();K.want=ok(2,()=>K.kok>=3,()=>'Authors choose words to make you like, or not like, a character.')}},
  {h:'Fast or slow?',p:'How long the sentences are changes how fast a story feels. Tap the version that fits.',task:'Match the pace twice',
   show:()=>{steps[3].go();seq([()=>pace(1),()=>pace(1)],900)},go:()=>{reset();K.pr=0;K.pok=0;K.ppick=-1;tell();K.want=ok(3,()=>K.pok>=2,()=>'Short sentences speed a story up; long, smooth ones slow it down.')}},
  {h:'Why that word?',p:'Read the line. Why did the author choose the word in quotes?',task:'Explain three word choices',
   show:()=>{steps[4].go();seq([()=>why(0),()=>why(1),()=>why(2)],500)},go:()=>{reset();K.wr=0;K.wok=0;tell();K.want=ok(4,()=>K.wok>=3,()=>'Ask: what does this word make me see or feel?')}},
  {h:'Challenge',p:'',go:()=>{reset();quiz()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>K.want()});
 const QZ=[['Which word makes the giant sound scary?','👹',[['The giant thundered in.','ok'],['The giant came in.','plain'],['The giant tiptoed in.','opp']]],
  ['“Lily giggled.” What does “giggled” show?','😄',[['Lily was happy','ok'],['Lily was cross','opp'],['Nothing, it is just a word','random']]],
  ['Which makes you like Ben more?','🧒',[['Ben is chatty.','ok'],['Ben is a chatterbox who never stops.','unkind'],['Ben is.','plain']]],
  ['A scary scene. Which fits best?','🚪',[['Creak. A step. Silence.','ok'],['The door opened and then someone came in and sat down for a chat.','slow'],['The door was nice.','plain']]],
  ['“The sea roared.” Why “roared”?','🌊',[['It makes the sea sound loud and wild','ok'],['It means the sea was calm','opp'],['The author did not choose it','random']]],
  ['Which word shows the snail is slow?','🐌',[['The snail crawled.','ok'],['The snail zoomed.','opp'],['The snail went.','plain']]]];
 let qn=-1,run=0;
 function quiz(){qn++;const[q,pic,ops]=QZ[qn%QZ.length],r=qn%3;K.Q=pic;
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,tg])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(tg)});say('Challenge: '+q);A.redraw()}
 function mark(tg){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tg){case 'ok':m='Yes!';break;
   case 'plain':m='That word is plain. It does not paint a strong picture or feeling.';break;
   case 'opp':m='That word gives the opposite feeling. Think about what you see in your head.';break;
   case 'random':m='Authors choose each word on purpose, to make you see or feel something.';break;
   case 'unkind':m='That says the same thing in an unkind way, so you like Ben less.';break;
   default:m='Long, smooth sentences slow things down. Scary scenes use short, sharp bits.'}
  const good=tg==='ok';if(good){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${good?'✓':'✗'} ${m}${good?` Stars: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
 function down(p){const m=mode();
  if(m==='verb'){const i=[0,1,2,3].find(i=>inside(p,cell(i,4,1,0)));if(i!=null)verb(i)}
  else if(m==='spook'){for(let r=0;r<3;r++)for(let i=0;i<2;i++)if(inside(p,cell(i,2,3,r)))return spook(r,i),false}
  else if(m==='kind'){const i=[0,1].find(i=>inside(p,cell(i,2,1,0)));if(i!=null)kind(i)}
  else if(m==='pace'){const i=[0,1].find(i=>inside(p,paceR(i)));if(i!=null)pace(i)}
  else if(m==='why'){const i=[0,1,2].find(i=>inside(p,whyR(i)));if(i!=null)why(i)}return false}
 A=FK.shell(c,{steps,ratio:.66,tall:1.25,draw,onStep:A=>{chal.hidden=A.step!==5;read.hidden=A.step===5;pad.hidden=A.step===5;ctl()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);A.gest({down});ctl()}});
 A.start()})})();
