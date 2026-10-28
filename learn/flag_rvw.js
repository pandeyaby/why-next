/* Flagship – reviewing your own writing (ages 8–10): sort review questions into "is it correct?" and "does it work?",
   read a draft as the reader and tap the line that breaks the effect, swap told feelings for shown ones, reorder a
   paragraph so the surprise lands last, and check a letter against its success criteria. Buttons for every move. */
(()=>{const mn=Math.min,mx=Math.max;
 const QS=[['Are the capital letters right?',0],['Will my reader feel scared here?',1],['Is "their" spelt right?',0],['Does my first line make you want to read on?',1],['Is there a full stop at the end?',0],['Is the best bit saved for the end?',1]];
 const SIDE=[['🔍','Is it correct?'],['🧑‍🤝‍🧑','Does it work?']];
 // DRAFTS: goal, lines [text, reader score 0-10]; the line with a low score breaks the effect
 const DRAFTS=[['😱 Goal: scare the reader',[['The door creaked open on its own.',6],['Something cold brushed my neck.',8],['I had a cheese sandwich, which was nice.',1],['In the dark, a voice whispered my name.',10]],2,'A nice sandwich makes the reader relax. It breaks the scary feeling, so cut it or change it.'],
  ['😂 Goal: make the reader laugh',[['Grandpa wore his pants on his head to the wedding.',8],['The wedding was on a Saturday at two.',1],['The bride laughed so hard she sneezed on the cake.',10]],1,'The day and time are just facts. They do not help the joke, so the laughs stop there.']];
 const TOLD=[['I was scared.',[['I was very, very scared.','Still telling. Adding very does not let the reader feel it. Show what your body did.'],['My knees shook and I could not breathe.',''],['I was scared, but it was fine.','This tells the feeling and then takes it away. Show what happened to you instead.']]],
  ['Mum was cross.',[['Mum was really cross.','Still telling. Show what Mum did, so the reader works it out.'],['Mum was cross and sad and angry.','More feeling words is still telling. Show her face or her voice.'],['Mum slammed the pan down and glared.','']]]];
 const PARA=['Tom heard a scratch at the window.','He pulled the blanket over his head.','The scratch came again, louder.','He peeped out. It was only Biscuit, his cat!'];
 const START=[3,1,0,2];
 const LETTER=['Dear Mrs Khan,','I think our class should have a pet rabbit.','Please can we have one?','Thank you for reading my letter. From Ava'];
 const CRIT=[['Says clearly what I want',1,'Look again: "our class should have a pet rabbit" says just what Ava wants.'],['Gives reasons',0,'Find the reasons: does Ava say why a rabbit would be good? She only asks.'],['Polite to my reader',1,'Look again: Dear, please and thank you are all polite.'],['Ends in a good way',1,'It ends with thanks and her name. That is a good way to end a letter.']];
 const FIX=[['Looking after a rabbit would teach us to be responsible.',''],['I really, really, really want one.','Wanting it more is not a reason. Say why it would be good for the class.'],['rabbits r cool lol','That is not a reason, and it is too chatty for a letter to the head.']];
VIS.reg('flagrvw',c=>{let A,ctl,qb;c.fig.classList.add('young');
 const Z={gen:0,ok:()=>{},Q:'📝'};
 const where=()=>['ask','reader','show','order','crit','quiz'][A.step];
 const speak=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
 const sz=n=>A.narrow?n:n+3;
 function T(g,t,X,Y,n,col,w,al){g.font=`${w||700} ${sz(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col;g.fillText(t,X,Y,A.W-10)}
 function para(g,t,X,Y,w,n,col,wt){g.font=`${wt||700} ${sz(n)}px system-ui,sans-serif`;const rows=[];let r='';t.split(' ').forEach(v=>{const q=r?r+' '+v:v;if(r&&g.measureText(q).width>w-14){rows.push(r);r=v}else r=q});rows.push(r);
  const step=sz(n)*1.25;rows.forEach((l,i)=>T(g,l,X,Y+(i-(rows.length-1)/2)*step,n,col,wt))}
 function panel(g,R,col,bold,a){g.fillStyle=A.alpha(col,a||.13);A.paint.rrect(R.x,R.y,R.w,R.h,12);g.fill();g.strokeStyle=col;g.lineWidth=bold?4.5:2;g.stroke()}
 const over=(p,R)=>!!R&&p.x>=R.x&&p.x<=R.x+R.w&&p.y>=R.y&&p.y<=R.y+R.h;
 const nope=t=>{A.sound.miss();speak(t);A.redraw()};
 // ---- 1: two kinds of review question ----
 const sideR=k=>{const w=(A.W-24)/2;return{x:8+k*(w+8),y:A.H*.04,w,h:A.H*.56}};
 const qR=()=>{const w=mn(A.W*.86,420),h=A.H*.18;return{x:(A.W-w)/2,y:A.H*.72,w,h}};
 function askV(g){const C=A.col;SIDE.forEach((s,k)=>{const R=sideR(k);panel(g,R,k?C.vi:C.cy,Z.bad===k);T(g,s[0],R.x+R.w/2,R.y+A.H*.06,22,C.tx,400);T(g,s[1],R.x+R.w/2,R.y+A.H*.14,12,C.tx,800);
   Z.sorted[k].forEach((j,n)=>para(g,QS[j][0],R.x+R.w/2,R.y+A.H*(.23+n*.11),R.w-6,9,C.tx,600))});
  if(Z.i>=QS.length)return T(g,'Correct is not enough. Ask: does it work?',A.W/2,A.H*.8,13,C.gr,800);
  const b=qR(),R=Z.drag?{x:Z.drag.x-b.w/2,y:Z.drag.y-b.h/2,w:b.w,h:b.h}:b;panel(g,R,C.am,1,.22);para(g,QS[Z.i][0],R.x+R.w/2,R.y+R.h/2,R.w,13,C.tx,800);if(!Z.drag)T(g,'Drag the question to a side ↑',A.W/2,A.H*.665,11,C.tx,600)}
 function file(k){if(Z.i>=QS.length)return;const q=QS[Z.i];Z.drag=null;if(k!==q[1]){Z.bad=k;return nope(q[1]?'This asks how the reader feels, not whether it is correct. It checks if your writing works.':'This checks a rule of spelling or punctuation. That is about being correct.')}
  Z.bad=-1;Z.sorted[k].push(Z.i);Z.i++;A.sound.pop();say()}
 // ---- 2: read as the reader ----
 const lineR=j=>{const n=DRAFTS[Z.d][1].length,h=A.H*.5/n;return{x:8,y:A.H*.13+j*h,w:A.W*.62,h:h-6}};
 function readerV(g){const C=A.col,[goal,L]=DRAFTS[Z.d];T(g,goal,A.W/2,A.H*.06,13,C.tx,800);
  L.forEach(([t,s],j)=>{const R=lineR(j),cut=Z.cut.includes(Z.d*10+j);panel(g,R,cut?C.gr:Z.bad===j?C.rd:C.ln,cut||Z.bad===j,.08);para(g,(cut?'✂️ ':'')+t,R.x+R.w/2,R.y+R.h/2,R.w,10,C.tx,cut?500:700)});
  const G={x:A.W*.67,y:A.H*.13,w:A.W*.31,h:A.H*.5};panel(g,G,C.am,0,.06);T(g,'Reader',G.x+G.w/2,G.y-A.H*.025,10,C.tx,800);
  L.forEach(([t,s],j)=>{const R=lineR(j),bw=(G.w-12)*s/10,y=R.y+R.h/2;g.fillStyle=A.alpha(s<3?C.rd:C.gr,.55);g.fillRect(G.x+6,y-8,bw,16);T(g,s<3?'😐':s<9?'😮':'🤩',mn(G.x+12+bw,G.x+G.w-22),y,13,C.tx,400,'left')});
  T(g,Z.found>=2?'Both broken lines found!':'Tap the line where the reader\u2019s feeling drops.',A.W/2,A.H*.72,12,Z.found>=2?C.gr:C.tx,800);
  T(g,'The bars show how strongly the reader feels the goal.',A.W/2,A.H*.82,10,C.tx,600)}
 function tapLine(j){if(Z.found>=2)return;const[,L,bad,why]=DRAFTS[Z.d];if(j!==bad){Z.bad=j;return nope(`"${L[j][0]}" builds the goal. Look at the bars: find the line where they drop.`)}
  Z.bad=-1;Z.cut.push(Z.d*10+j);Z.found++;A.sound.pop();const g=Z.gen;if(Z.d<1)setTimeout(()=>{if(g!==Z.gen)return;Z.d=1;say()},700);say(why)}
 // ---- 3: show, don't tell ----
 const optR=k=>{const h=A.H*.15;return{x:10,y:A.H*.38+k*(h+6),w:A.W-20,h}};
 function showV(g){const C=A.col;if(Z.t>=TOLD.length){TOLD.forEach(([t,o],k)=>{const Q={x:10,y:A.H*(.04+k*.3),w:A.W-20,h:A.H*.26};panel(g,Q,C.gr,0,.1);para(g,'Told: '+t,A.W/2,Q.y+Q.h*.27,Q.w,11,C.tx,500);para(g,'Shown: '+o.find(x=>!x[1])[0],A.W/2,Q.y+Q.h*.68,Q.w,12,C.tx,800)});return T(g,'Shown, not told: the reader feels it too.',A.W/2,A.H*.68,13,C.gr,800)}const[told,ops]=TOLD[Z.t];
  const R={x:10,y:A.H*.05,w:A.W-20,h:A.H*.24};panel(g,R,C.pk,1,.15);T(g,'Told:',R.x+12,R.y+A.H*.05,11,C.tx,800,'left');para(g,told,A.W/2,R.y+R.h*.6,R.w,16,C.tx,800);
  ops.forEach(([o],k)=>{const Q=optR(k);panel(g,Q,Z.bad===k?C.rd:C.cy,Z.bad===k);para(g,o,Q.x+Q.w/2,Q.y+Q.h/2,Q.w,12,C.tx,700)})}
 function pickShow(k){if(Z.t>=TOLD.length)return;const o=TOLD[Z.t][1][k];if(o[1]){Z.bad=k;return nope(o[1])}Z.bad=-1;Z.t++;A.sound.pop();say(`Yes: "${o[0]}" lets the reader see it.`)}
 // ---- 4: order for effect ----
 const slotR=i=>{const h=A.H*.15;return{x:A.W*.14,y:A.H*.06+i*(h+7),w:A.W*.84-10,h}};
 const tension=()=>Z.ord.map((s,i)=>s===3?(i===3?10:2):[3,5,7][s]);
 function orderV(g){const C=A.col;Z.ord.forEach((s,i)=>{const R=slotR(i),sel=Z.sel===i;panel(g,R,sel?C.vi:s===3?C.am:C.cy,sel);T(g,String(i+1),A.W*.07,R.y+R.h/2,16,C.tx,900);para(g,PARA[s],R.x+R.w/2,R.y+R.h/2,R.w,11,C.tx,700)});
  const tv=tension(),X=i=>A.W*.2+i*A.W*.2,Y=v=>A.H*.97-v*A.H*.025;g.strokeStyle=C.gr;g.lineWidth=3;g.beginPath();tv.forEach((v,i)=>i?g.lineTo(X(i),Y(v)):g.moveTo(X(i),Y(v)));g.stroke();
  T(g,'Suspense',A.W*.08,A.H*.9,10,C.tx,800);tv.forEach((v,i)=>A.paint.ball(X(i),Y(v),6,C.am))}
 const ordered=()=>Z.ord.every((s,i)=>s===i);
 function tapSlot(i){if(ordered())return;if(Z.sel<0){Z.sel=i;A.sound.tick();return say(`Picked line ${i+1}. Tap where it should go.`)}
  const a=Z.sel;Z.sel=-1;[Z.ord[a],Z.ord[i]]=[Z.ord[i],Z.ord[a]];A.sound.tick();
  if(Z.ord[0]===3)return nope('Now the surprise comes first, so there is nothing left to wonder about. Save it for the end.');say(ordered()?'The surprise lands last.':'')}
 // ---- 5: success criteria ----
 const critR=k=>{const w=(A.W-30)/2,h=A.H*.12;return{x:10+(k%2)*(w+10),y:A.H*.47+Math.floor(k/2)*(h+6),w,h}};
 function critV(g){const C=A.col,R={x:10,y:A.H*.03,w:A.W-20,h:A.H*.4};panel(g,R,C.am,0,.1);
  LETTER.concat(Z.fixed?[FIX[0][0]]:[]).forEach((l,i)=>para(g,l,A.W/2,R.y+A.H*(.05+i*.07),R.w-8,10,i===4?C.gr:C.tx,i===4?800:600));
  if(Z.k>=4&&!Z.fixed){T(g,'Gives reasons is missing. Tap the best line to add.',A.W/2,A.H*.48,12,C.tx,800);return FIX.forEach(([f],k)=>{const Q=fixR(k);panel(g,Q,C.cy,0);para(g,'➕ '+f,Q.x+Q.w/2,Q.y+Q.h/2,Q.w,11,C.tx,700)})}
  CRIT.forEach(([t,met],k)=>{const Q=critR(k),done=Z.judged[k]!=null;panel(g,Q,done?(met?C.gr:C.rd):k===Z.k?C.vi:C.ln,done||k===Z.k,done?.2:.07);para(g,(done?(met?'✅ ':'❌ '):'')+t,Q.x+Q.w/2,Q.y+Q.h/2,Q.w,10,C.tx,800)});
  if(Z.k<4)[['✅ Met',C.gr],['❌ Missing',C.rd]].forEach(([t,col],k)=>{const Q=padR(k);panel(g,Q,col,0,.18);T(g,t,Q.x+Q.w/2,Q.y+Q.h/2,13,C.tx,800)});else T(g,'Every success criterion is met now.',A.W/2,A.H*.84,12,C.gr,800)}
 const padR=k=>{const w=(A.W-30)/2;return{x:10+k*(w+10),y:A.H*.8,w,h:A.H*.15}},fixR=k=>{const h=A.H*.13;return{x:10,y:A.H*.55+k*(h+6),w:A.W-20,h}};
 function judge(met){if(Z.k>=4)return;const[t,real]=CRIT[Z.k];if(met!==!!real)return nope(CRIT[Z.k][2]);
  Z.judged[Z.k]=real;Z.k++;A.sound.pop();say()}
 function addFix(k){if(Z.k<4||Z.fixed)return;const f=FIX[k];if(f[1])return nope(f[1]);Z.fixed=true;A.sound.pop();say('A real reason makes the letter work for Mrs Khan.')}
 function draw(A){const{ctx:g,W,H,col:C}=A,v=where();g.fillStyle=A.mix(C.pn,'#f5f3ff',C.dark?.04:.35);g.fillRect(0,0,W,H);
  const f={ask:askV,reader:readerV,show:showV,order:orderV,crit:critV}[v];if(f)f(g);else T(g,Z.Q,W/2,H/2,60,C.tx,400);A.fx.draw(g)}
 function say(pre){const v=where();let t;
  if(v==='ask')t=Z.i>=QS.length?'All six questions sorted.':`Question: ${QS[Z.i][0]} Correct, or does it work?`;
  else if(v==='reader')t=`${DRAFTS[Z.d][0]}. `+DRAFTS[Z.d][1].map(([l,s])=>`${l} reader ${s} of 10.`).join(' ');
  else if(v==='show')t=Z.t>=TOLD.length?'Both fixed.':`Told: ${TOLD[Z.t][0]} Pick a line that shows it.`;
  else if(v==='order')t='Order: '+Z.ord.map((s,i)=>`${i+1}. ${PARA[s]}`).join(' ');
  else if(v==='crit')t=Z.k<4?`Letter check: ${CRIT[Z.k][0]}?`:Z.fixed?'All criteria met.':'Gives reasons is missing. Pick a line to add.';else t='Challenge time.';
  speak((pre?pre+' ':'')+t);keys();Z.ok()}
 function keys(){if(!A||!ctl)return;ctl.innerHTML='';const v=where(),B=(t,f,al)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':al||null},ctl,t);e.onclick=f};
  if(v==='ask'&&Z.i<QS.length)SIDE.forEach((s,k)=>B(s[0]+' '+s[1],()=>file(k)));
  if(v==='reader'&&Z.found<2)DRAFTS[Z.d][1].forEach(([l],j)=>B('✂️ '+l,()=>tapLine(j),'This line breaks it: '+l));
  if(v==='show'&&Z.t<TOLD.length)TOLD[Z.t][1].forEach(([o],k)=>B(o,()=>pickShow(k)));
  if(v==='order'&&!ordered())Z.ord.forEach((s,i)=>B(`${Z.sel===i?'✋ ':''}Line ${i+1}`,()=>tapSlot(i),`Line ${i+1}: ${PARA[s]}`));
  if(v==='crit'){if(Z.k<4){B('✅ Met',()=>judge(true));B('❌ Missing',()=>judge(false))}else if(!Z.fixed)FIX.forEach(([f],k)=>B('➕ '+f,()=>addFix(k)))}A.redraw()}
 const end=(n,cond,msg)=>()=>{if(A.step===n&&cond()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg()+A.reveal(n))};
 const run=(fs,gap)=>{const g=Z.gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===Z.gen)f()},A.reduced()?j*20:j*gap))};
 const fresh=()=>{Z.gen++;Z.ok=()=>{};Z.drag=null;Z.bad=-1;Z.sel=-1};
 const steps=[
  {h:'Correct, or does it work?',p:'Good writers ask two kinds of question. Is it correct? And does it work on my reader? Drag each question to its side.',
   predict:{q:'A story has perfect spelling. Is it finished?',opts:['Yes, no mistakes means done','No, it must work on the reader too'],ans:1},task:'Sort all 6 questions',
   show:()=>{steps[0].go();run(QS.map(q=>()=>file(q[1])),360)},go:()=>{fresh();Z.i=0;Z.sorted=[[],[]];say();Z.ok=end(0,()=>Z.i>=QS.length,()=>'Check it is correct, then check it works.')}},
  {h:'Read as the reader',p:'Every piece has a goal: the effect you want on the reader. Read each line as the reader. Tap the line that breaks the effect.',
   predict:{q:'Can one boring line spoil a scary story?',opts:['No, the rest is scary','Yes, the reader relaxes'],ans:1},task:'Find the broken line in both drafts',
   show:()=>{steps[1].go();run([()=>tapLine(2),()=>{},()=>tapLine(1)],520)},go:()=>{fresh();Z.d=0;Z.found=0;Z.cut=[];say();Z.ok=end(1,()=>Z.found>=2,()=>'Cut or change any line that does not help your goal.')}},
  {h:'Show, don\u2019t tell',p:'"I was scared" tells the reader. Showing what your body did lets the reader feel it. Pick the line that shows.',
   predict:{q:'Does "very, very scared" make the reader more scared than "scared"?',opts:['Yes, it is stronger','No, it is still telling'],ans:1},task:'Fix both told lines',
   show:()=>{steps[2].go();run([()=>pickShow(1),()=>pickShow(2)],450)},go:()=>{fresh();Z.t=0;say();Z.ok=end(2,()=>Z.t>=TOLD.length,()=>'Show actions, faces and voices; let the reader work out the feeling.')}},
  {h:'Save the surprise',p:'The order of your sentences changes the effect. Tap a line, then tap where it should go. Watch the suspense line.',
   predict:{q:'Where should the big surprise go?',opts:['First, to grab the reader','Last, so the reader wonders'],ans:1},task:'Put the story in order with the surprise last',
   show:()=>{steps[3].go();run([()=>tapSlot(2),()=>tapSlot(0),()=>tapSlot(2),()=>tapSlot(3)],380)},go:()=>{fresh();Z.ord=START.slice();say();Z.ok=end(3,ordered,()=>'Build up the worry, then let the surprise land at the end.')}},
  {h:'Check the success criteria',p:'Ava wrote to her head teacher. Check her letter against each success criterion. Then add the line it needs.',task:'Check all 4 and fix the gap',
   show:()=>{steps[4].go();run([()=>judge(true),()=>judge(false),()=>judge(true),()=>judge(true),()=>addFix(0)],300)},go:()=>{fresh();Z.k=0;Z.judged=[];Z.fixed=false;say();Z.ok=end(4,()=>Z.fixed,()=>'Success criteria tell you what working looks like for this reader.')}},
  {h:'Challenge',p:'',go:()=>{fresh();ask()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.ok()});
 const QZ=[['Your story has no spelling mistakes. What should you ask next?','🤔',[['Does it make my reader feel what I want?','ok'],['Nothing, it is finished','done'],['Are my letters neat?','neat']]],
  ['Which line shows, not tells, that Sam was nervous?','😬',[['Sam chewed his nails and tapped his foot','ok'],['Sam was very nervous','very'],['Sam felt nervous and worried','more']]],
  ['In a scary story, which line breaks the effect?','👻',[['We stopped for a lovely ice cream','ok'],['The lights went out with a click','builds'],['Footsteps came up the stairs','builds']]],
  ['A joke story ends with the funny bit at the start. What is the fix?','🔀',[['Move the funny bit to the end','ok'],['Add more full stops','punct'],['Make the words longer','long']]],
  ['You are writing to ask the head for a pet. What would make it work?','🐇',[['Give a reason it helps the class','ok'],['Say you want it very much','want'],['Use lots of jokes and lol','chatty']]],
  ['Which is a "does it work?" question?','🧑‍🤝‍🧑',[['Will my reader want to read on?','ok'],['Is "said" spelt right?','spell'],['Did I use capital letters?','spell']]]];
 let qi=-1,str=0;
 function ask(){qi++;const[q,pic,ops]=QZ[qi%QZ.length],r=qi%3;Z.Q=pic;
  qb.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=qb.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>grade(tag)});speak('Challenge: '+q);A.redraw()}
 function grade(tag){qb.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=qb.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Yes! You reviewed it like a reader.';break;
   case 'done':m='Correct is only half. Read it as your reader: does it have the effect you wanted?';break;
   case 'neat':m='Neat letters are nice, but they do not tell you if the writing works on the reader.';break;
   case 'very':m='"Very nervous" still tells. Show what Sam did, so the reader can see it.';break;
   case 'more':m='Two feeling words are still telling. Show his hands, face or voice.';break;
   case 'builds':m='That line builds the fear. The ice cream line makes the reader relax.';break;
   case 'punct':m='Full stops make it correct, not funny. The order is what spoils the joke.';break;
   case 'long':m='Long words do not fix the order. Save the funny bit for the end.';break;
   case 'want':m='Wanting it a lot is not a reason. Say why it would be good for the class.';break;
   case 'chatty':m='Jokes and lol do not suit a letter to the head. Think about who your reader is.';break;
   default:m='That checks spelling or capitals, so it asks if it is correct, not if it works.'}
  const good=tag==='ok';if(good){str++;A.win()}else{str=0;A.sound.miss()}fb.innerHTML=`${good?'✓':'✗'} ${m}${good?` Streak: ${str}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 function down(p){const v=where();Z.drag=null;
  if(v==='ask'&&Z.i<QS.length){if(over(p,qR())){Z.drag={x:p.x,y:p.y};return true}const k=[0,1].find(k=>over(p,sideR(k)));if(k!=null)file(k);return false}
  if(v==='reader'){const j=DRAFTS[Z.d][1].findIndex((_,j)=>over(p,lineR(j)));if(j>=0)tapLine(j);return false}
  if(v==='show'){const k=[0,1,2].find(k=>over(p,optR(k)));if(k!=null)pickShow(k);return false}
  if(v==='order'){const i=[0,1,2,3].find(i=>over(p,slotR(i)));if(i!=null){if(Z.sel<0){tapSlot(i);Z.drag={x:p.x,y:p.y};return true}tapSlot(i)}return false}
  if(v==='crit'){if(Z.k<4){const k=[0,1].find(k=>over(p,padR(k)));if(k!=null)judge(!k)}else if(!Z.fixed){const k=[0,1,2].find(k=>over(p,fixR(k)));if(k!=null)addFix(k)}}return false}
 function move(p){if(Z.drag){Z.drag.x=p.x;Z.drag.y=p.y;A.redraw()}}
 function up(p){const v=where(),d=Z.drag;Z.drag=null;if(!d)return;
  if(v==='ask'){const k=[0,1].find(k=>over(p,sideR(k)));if(k!=null)file(k);else A.redraw()}
  if(v==='order'&&Z.sel>=0){const i=[0,1,2,3].find(i=>over(p,slotR(i)));if(i!=null&&i!==Z.sel)tapSlot(i)}}
 A=FK.shell(c,{steps,ratio:.64,tall:1.3,draw,onStep:A=>{const q=A.step===5;qb.hidden=!q;ctl.hidden=q;keys()},
  init:A=>{const bx=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);qb=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up});keys()}});
 A.start()})})();
