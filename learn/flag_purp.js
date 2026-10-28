/* Flagship – why the author wrote it (ages 8–9): deal texts into Persuade / Inform / Entertain, tap the push words that
   give a persuading author away (even when the text also has facts), pin the author's view and your own view on a line
   to see that a reader may disagree, swap loaded words to watch the author's attitude move, then prove each purpose by
   tapping the sentence that shows it. */
(()=>{const mn=Math.min,mx=Math.max;
 const PIE=[['📢','Persuade'],['📘','Inform'],['🎭','Entertain']];
 const DEAL=[['Come to Funland! It is the best day out ever!',0,'"Come to" and "best ever" push you to go. The author wants to persuade you.'],
  ['Sharks have no bones. Their skeletons are made of cartilage.',1,'True facts that teach you: the author wants to inform.'],
  ['Pip the pig sneezed so hard his hat flew to the moon.',2,'A silly made-up tale is there for fun. The author wants to entertain.'],
  ['You should switch off lights to save energy.',0,'"You should" tells you what to do. That is persuading, even with a good reason.'],
  ['Bees visit flowers to collect nectar.',1,'It teaches a true fact about bees, so it informs.'],
  ['The dragon tiptoed in and ate all the jam.',2,'A made-up adventure, written to be enjoyed.']];
 // why[true][picked]: the slip a learner makes when they choose the wrong purpose
 const WHY=[[null,'Look for push words: should, best, must, come. This author wants you to act.','It may be fun to read, but it wants you to go or do something. That is persuading.'],
  ['Nobody tells you what to do here. It just teaches a fact.',null,'This is true and it teaches you. True facts mean inform.'],
  ['Nobody asks you to do or buy anything. It is a story for fun.','Is it true? It is made up and silly. Made-up and fun means entertain.',null]];
 const CLUE='Every family should get a dog. Dogs are the best pets in the world. You must visit Paws Rescue today. It opens at 9 am.'.split(' ');
 const PUSH=['should','best','must'];
 const SWAP=[['spent','wasted','invested'],[0,-2,1]],ADJ=[['new','pointless','brilliant'],[0,-2,2]];
 const PROVE=[['The Great Fire of London','In 1666 a fire began in a bakery. It burned for four days. About 13,000 houses were lost.',1,1,'"It burned for four days" gives a fact you can learn. The author informs.'],
  ['Plant a tree this spring','Trees give us clean air. Everyone should plant one this spring. Ask at your garden centre.',0,1,'"Everyone should plant one" pushes you to act. The author persuades.'],
  ['Bob and the bouncy bed','Bob jumped on his bed. He bounced past the roof. A surprised bird waved hello.',2,2,'"A surprised bird waved hello" is silly and made up. The author entertains.']];
VIS.reg('flagpurp',c=>{let A,pad,chal,read;c.fig.classList.add('young');
 const K={i:0,box:[[],[],[]],bad:-1,drag:null,got:[],miss:-1,au:.5,me:.5,meMoved:false,pin:null,w:[0,0],sawFor:false,sawAg:false,pi:0,pur:-1,pok:0,gen:0,want:()=>{}};
 const say=t=>{c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(read)read.textContent=t}};
 const view=()=>['deal','clue','pins','tone','prove','quiz'][A.step];
 const fz=z=>A.narrow?z:z+3;
 const txt=(x,t,X,Y,z,k,w,al)=>{x.font=`${w||800} ${fz(z)}px system-ui,sans-serif`;x.textAlign=al||'center';x.textBaseline='middle';x.fillStyle=k;x.fillText(t,X,Y,A.W-14)};
 const wrap=(x,t,X,Y,w,z,k,wt)=>{x.font=`${wt||700} ${fz(z)}px system-ui,sans-serif`;const L=[];let r='';t.split(' ').forEach(v=>{const q=r?r+' '+v:v;if(r&&x.measureText(q).width>w-14){L.push(r);r=v}else r=q});L.push(r);
  const g=fz(z)*1.2;L.forEach((l,i)=>txt(x,l,X,Y+(i-(L.length-1)/2)*g,z,k,wt))};
 const box=(x,R,k,thick,a)=>{x.fillStyle=A.alpha(k,a||.14);A.paint.rrect(R.x,R.y,R.w,R.h,12);x.fill();x.strokeStyle=k;x.lineWidth=thick?5:2;x.stroke()};
 const inR=(p,R)=>p.x>=R.x&&p.x<=R.x+R.w&&p.y>=R.y&&p.y<=R.y+R.h,oops=t=>{A.sound.miss();say(t);A.redraw()};
 const hue=i=>[A.col.pk,A.col.cy,A.col.vi][i];
 // ---- step 1: deal a text into one of three purpose trays ----
 const tray=i=>{const g=8,w=(A.W-4*g)/3;return{x:g+i*(w+g),y:A.H*.04,w,h:A.H*.5}};
 const card=()=>{const w=mn(A.W*.86,420),h=A.H*.2;return{x:(A.W-w)/2,y:A.H*.7,w,h}};
 function dealV(x){const C=A.col;PIE.forEach((p,i)=>{const R=tray(i);box(x,R,hue(i),K.bad===i);txt(x,p[0],R.x+R.w/2,R.y+A.H*.07,24,C.tx,400);txt(x,p[1],R.x+R.w/2,R.y+A.H*.15,12,C.tx);
   txt(x,K.box[i].length+' card'+(K.box[i].length===1?'':'s'),R.x+R.w/2,R.y+R.h-A.H*.05,11,C.tx,600)});
  if(K.i>=DEAL.length)return txt(x,'Every text has a reason it was written!',A.W/2,A.H*.78,14,C.gr);
  const R=card(),P=K.drag?{x:K.drag.x-R.w/2,y:K.drag.y-R.h/2,w:R.w,h:R.h}:R;box(x,P,C.am,1,.2);wrap(x,DEAL[K.i][0],P.x+P.w/2,P.y+P.h/2,P.w,12,C.tx);
  if(!K.drag)txt(x,'Drag the text up to a tray ↑',A.W/2,A.H*.64,11,C.tx,600)}
 function deal(j){if(K.i>=DEAL.length)return;const d=DEAL[K.i];K.drag=null;if(j!==d[1]){K.bad=j;return oops(WHY[d[1]][j])}
  K.bad=-1;K.box[j].push(K.i);K.i++;A.sound.pop();tell(d[2])}
 // ---- step 2: tap the push words ----
 let chips=[];
 function layChips(x){chips=[];x.font=`700 ${fz(16)}px system-ui,sans-serif`;const lh=fz(16)*2.3;let X=12,Y=A.H*.2;
  CLUE.forEach((w,i)=>{const cw=x.measureText(w).width+18;if(X+cw>A.W-12){X=12;Y+=lh}chips.push({x:X,y:Y-lh*.4,w:cw,h:lh*.8,i});X+=cw+6})}
 function clueV(x){const C=A.col;txt(x,`Push words found: ${K.got.length} of 3`,A.W/2,A.H*.07,13,C.tx);layChips(x);
  chips.forEach(r=>{const w=CLUE[r.i],on=K.got.includes(r.i),bad=K.miss===r.i;box(x,r,on?C.gr:bad?C.rd:C.ln,on||bad,on||bad?.2:.08);txt(x,w,r.x+r.w/2,r.y+r.h/2,16,C.tx,on?900:600)})}
 function clue(i){if(K.got.length>=3||K.got.includes(i))return;const w=CLUE[i].replace(/[^a-z0-9]/gi,'').toLowerCase();
  if(!PUSH.includes(w)){K.miss=i;return oops(w==='9'||w==='am'?'A time is a fact. Persuaders use facts too, but facts are not the push words.':`"${CLUE[i]}" does not push you. Look for words that tell you what to do or what is best.`)}
  K.miss=-1;K.got.push(i);A.sound.pop();tell(`Yes, "${w}" pushes the reader.`)}
 // ---- step 3: the view line ----
 const line=()=>({x0:A.W*.1,x1:A.W*.9,y:A.H*.62});
 function pinsV(x){const C=A.col,L=line();const R={x:10,y:A.H*.03,w:A.W-20,h:A.H*.3};box(x,R,C.am,0);
  wrap(x,'Homework should be banned for children under 11. Children need time to play after school.',A.W/2,R.y+R.h/2,R.w-10,12,C.tx);
  x.strokeStyle=C.tx;x.lineWidth=4;x.beginPath();x.moveTo(L.x0,L.y);x.lineTo(L.x1,L.y);x.stroke();
  txt(x,'Against a ban',L.x0,L.y+A.H*.24,11,C.tx,700,'left');txt(x,'For a ban',L.x1,L.y+A.H*.24,11,C.tx,700,'right');
  [['au','✍️','Author'],['me','🙂','Me']].forEach(([k,e,n],j)=>{const X=L.x0+(L.x1-L.x0)*K[k],Y=L.y+(j?1:-1)*A.H*.08;
   x.strokeStyle=j?C.cy:C.pk;x.lineWidth=3;x.beginPath();x.moveTo(X,L.y);x.lineTo(X,Y);x.stroke();
   x.fillStyle=A.alpha(j?C.cy:C.pk,.25);x.beginPath();x.arc(X,Y,A.H*.055,0,7);x.fill();x.stroke();
   txt(x,e,X,Y,18,C.tx,400);txt(x,n,X,Y+(j?1:-1)*A.H*.1,11,C.tx,800)});
  if(K.au>=.75&&K.meMoved)txt(x,Math.abs(K.au-K.me)<.2?'You agree with the author.':'You see it differently. That is fine!',A.W/2,A.H*.95,12,C.tx)}
 function setPin(k,v){K[k]=mx(0,mn(1,v));if(k==='me')K.meMoved=true;A.redraw();if(k==='au'&&K.au<.4)return oops('Read it again: "should be banned" means the author is FOR a ban.');tell()}
 // ---- step 4: swap loaded words ----
 const slot=i=>{const w=mn(A.W*.4,200);return{x:i?A.W-w-14:14,y:A.H*.36,w,h:A.H*.18}};
 const tone=()=>SWAP[1][K.w[0]]+ADJ[1][K.w[1]];
 function toneV(x){const C=A.col;wrap(x,`The town ${SWAP[0][K.w[0]]} £2,000 on a ${ADJ[0][K.w[1]]} skate park.`,A.W/2,A.H*.14,A.W-30,15,C.tx,800);
  [SWAP,ADJ].forEach((S,i)=>{const R=slot(i);box(x,R,C.vi,1);txt(x,S[0][K.w[i]],R.x+R.w/2,R.y+R.h*.42,16,C.tx);txt(x,'tap to swap',R.x+R.w/2,R.y+R.h*.8,10,C.tx,600)});
  const m=tone(),X0=A.W*.1,X1=A.W*.9,Y=A.H*.75,X=X0+(X1-X0)*(m+4)/8;x.fillStyle=A.mix(C.rd,C.gr,(m+4)/8);x.fillRect(X0,Y-6,X1-X0,12);
  x.fillStyle=C.tx;x.beginPath();x.moveTo(X,Y-12);x.lineTo(X-9,Y-28);x.lineTo(X+9,Y-28);x.closePath();x.fill();
  txt(x,'Against',X0,Y+A.H*.08,11,C.tx,700,'left');txt(x,'For',X1,Y+A.H*.08,11,C.tx,700,'right');
  txt(x,m>=2?'The author sounds FOR the park.':m<=-2?'The author sounds AGAINST the park.':'The author sounds neutral.',A.W/2,A.H*.93,12,C.tx,800)}
 function swap(i){K.w[i]=(K.w[i]+1)%3;A.sound.tick();const m=tone();if(m>=2)K.sawFor=true;if(m<=-2)K.sawAg=true;tell(`Same fact, new word: ${SWAP[0][K.w[0]]}, ${ADJ[0][K.w[1]]}.`)}
 // ---- step 5: prove the purpose ----
 const pb=i=>{const g=8,w=(A.W-4*g)/3;return{x:g+i*(w+g),y:A.H*.42,w,h:A.H*.13}};
 const sb=i=>({x:10,y:A.H*(.6+i*.13),w:A.W-20,h:A.H*.115});
 const sents=()=>PROVE[K.pi][1].split(/(?<=\.) /);
 function proveV(x){const C=A.col;if(K.pok>=3)return txt(x,'Purpose named, and proved with a sentence!',A.W/2,A.H*.45,14,C.gr);const t=PROVE[K.pi];
  const R={x:10,y:A.H*.03,w:A.W-20,h:A.H*.34};box(x,R,C.am,0);txt(x,t[0],A.W/2,R.y+A.H*.06,14,C.tx,900);wrap(x,t[1],A.W/2,R.y+R.h*.62,R.w-10,11,C.tx,600);
  PIE.forEach((p,i)=>{const Q=pb(i);box(x,Q,K.pur===i?C.gr:hue(i),K.pur===i);txt(x,p[0]+' '+p[1],Q.x+Q.w/2,Q.y+Q.h/2,11,C.tx)});
  if(K.pur<0)return txt(x,'1. Why did the author write it? Tap one.',A.W/2,A.H*.7,12,C.tx,700);
  sents().forEach((s,i)=>{const Q=sb(i);box(x,Q,K.bad===i?C.rd:C.cy,K.bad===i);wrap(x,s,Q.x+Q.w/2,Q.y+Q.h/2,Q.w,10,C.tx,700)})}
 function purpose(i){if(K.pok>=3||K.pur>=0)return;const t=PROVE[K.pi];if(i!==t[2])return oops(WHY[t[2]][i]);K.pur=i;A.sound.tick();tell(`Yes, ${PIE[i][1].toLowerCase()}. Now tap the sentence that proves it.`)}
 function proof(i){if(K.pok>=3||K.pur<0)return;const t=PROVE[K.pi];if(i!==t[3]){K.bad=i;return oops('That line is part of the text, but it is not the best proof. Find the line that gives the purpose away.')}
  K.bad=-1;K.pok++;K.pi=mn(2,K.pok);K.pur=-1;A.sound.pop();tell(t[4])}
 function draw(A){const{ctx:x,W,H,col:C}=A,v=view();x.fillStyle=A.mix(C.pn,'#fff7ed',C.dark?.05:.4);x.fillRect(0,0,W,H);
  const f={deal:dealV,clue:clueV,pins:pinsV,tone:toneV,prove:proveV}[v];if(f)f(x);else txt(x,K.Q||'✍️',W/2,H/2,60,C.tx,400);A.fx.draw(x)}
 function tell(msg){const v=view();let t;
  if(v==='deal')t=K.i>=DEAL.length?'All six texts sorted.':`Text: ${DEAL[K.i][0]} Persuade, inform or entertain?`;
  else if(v==='clue')t=`Push words found: ${K.got.length} of 3.`;
  else if(v==='pins')t=`Author pin ${Math.round(K.au*10)} of 10, your pin ${Math.round(K.me*10)} of 10, from against to for a ban.`;
  else if(v==='tone')t=`The town ${SWAP[0][K.w[0]]} £2,000 on a ${ADJ[0][K.w[1]]} skate park. Attitude ${tone()>0?'for':tone()<0?'against':'neutral'}.`;
  else if(v==='prove')t=K.pok>=3?'Three purposes proved.':`${PROVE[K.pi][0]}. `+(K.pur<0?'Pick a purpose.':'Tap the proof sentence.');else t='Challenge time.';
  say((msg?msg+' ':'')+t);refresh();K.want()}
 function refresh(){if(!A||!pad)return;pad.innerHTML='';const v=view();
  const B=(t,f,al)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':al||null},pad,t);e.onclick=f};
  if(v==='deal'&&K.i<DEAL.length)PIE.forEach((p,j)=>B(p[0]+' '+p[1],()=>deal(j),`Put in ${p[1]}`));
  if(v==='clue'&&K.got.length<3)CLUE.forEach((w,i)=>{if(!K.got.includes(i))B(w,()=>clue(i),`Word: ${w}`)});
  if(v==='pins'){B('✍️ ◀',()=>setPin('au',K.au-.25),'Move author pin towards against');B('✍️ ▶',()=>setPin('au',K.au+.25),'Move author pin towards for');
   B('🙂 ◀',()=>setPin('me',K.me-.25),'Move my pin towards against');B('🙂 ▶',()=>setPin('me',K.me+.25),'Move my pin towards for')}
  if(v==='tone'){B('🔁 '+SWAP[0][K.w[0]],()=>swap(0),'Swap the verb');B('🔁 '+ADJ[0][K.w[1]],()=>swap(1),'Swap the adjective')}
  if(v==='prove'&&K.pok<3){if(K.pur<0)PIE.forEach((p,i)=>B(p[0]+' '+p[1],()=>purpose(i),`Purpose: ${p[1]}`));else sents().forEach((s,i)=>B(s,()=>proof(i)))}A.redraw()}
 const fin=(n,cond,msg)=>()=>{if(A.step===n&&cond()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg()+A.reveal(n))};
 const play=(fs,gap)=>{const g=K.gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===K.gen)f()},j*gap))};
 const clear=()=>{K.gen++;K.want=()=>{};K.drag=null;K.pin=null;K.bad=-1;K.miss=-1};
 const steps=[
  {h:'Three reasons to write',p:'Authors write to persuade you, to inform you, or to entertain you. Drag each text to the reason it was written.',
   predict:{q:'"Come to Funland! It is the best day out ever!" Why was it written?',opts:['To inform','To persuade'],ans:1},task:'Sort all six texts',
   show:()=>{steps[0].go();play(DEAL.map(d=>()=>deal(d[1])),380)},go:()=>{clear();K.i=0;K.box=[[],[],[]];tell();K.want=fin(0,()=>K.i>=DEAL.length,()=>'Persuade pushes you, inform teaches you, entertain is for fun.')}},
  {h:'Push words',p:'Persuading authors use push words: should, must, best. Tap the push words in this advert.',
   predict:{q:'The advert also says "It opens at 9 am". Does a fact mean the author only wants to inform?',opts:['Yes, facts mean inform','No, facts can help persuade'],ans:1},task:'Find all 3 push words',
   show:()=>{steps[1].go();play(CLUE.map((w,i)=>PUSH.includes(w.toLowerCase())?i:-1).filter(i=>i>=0).map(i=>()=>clue(i)),400)},
   go:()=>{clear();K.got=[];tell();K.want=fin(1,()=>K.got.length>=3,()=>'A persuader can add facts, but push words show the real purpose.')}},
  {h:'Their view, my view',p:'The author\u2019s point of view is what the author thinks. Drag the ✍️ pin to where the author stands. Then drag the 🙂 pin to where YOU stand.',
   predict:{q:'If you disagree with the author, did you read it wrong?',opts:['Yes, the author is right','No, my view can be different'],ans:1},task:'Pin the author\u2019s view, then pin yours',
   show:()=>{steps[2].go();play([()=>setPin('au',1),()=>setPin('me',.25)],450)},go:()=>{clear();K.au=.5;K.me=.5;K.meMoved=false;tell();K.want=fin(2,()=>K.au>=.75&&K.meMoved,()=>'Say both: the author thinks homework should be banned, but I think…')}},
  {h:'Words show feelings',p:'Same fact, different words. Tap a word to swap it. Watch how the author seems to feel.',
   predict:{q:'Changing one word keeps the fact the same. Can it change how the author seems to feel?',opts:['No, a fact is a fact','Yes, words show the author\u2019s attitude'],ans:1},task:'Make the author sound FOR the park, then AGAINST it',
   show:()=>{steps[3].go();play([()=>swap(0),()=>swap(0),()=>swap(1),()=>swap(1),()=>swap(0),()=>swap(1)],400)},
   go:()=>{clear();K.w=[0,0];K.sawFor=false;K.sawAg=false;tell();K.want=fin(3,()=>K.sawFor&&K.sawAg,()=>'"Wasted" and "pointless" show the author is against it. "Brilliant" shows they are for it.')}},
  {h:'Prove it',p:'Good readers back up their answer. Tap why each text was written. Then tap the sentence that proves it.',task:'Prove the purpose of all three texts',
   show:()=>{steps[4].go();play(PROVE.flatMap(t=>[()=>purpose(t[2]),()=>proof(t[3])]),420)},go:()=>{clear();K.pi=0;K.pok=0;K.pur=-1;tell();K.want=fin(4,()=>K.pok>=3,()=>'Name the purpose, then point to the words that show it.')}},
  {h:'Challenge',p:'',go:()=>{clear();quiz()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>K.want()});
 const QZ=[['"Buy Crunchy Pops today! Kids love them!" Why was it written?','🥣',[['To persuade','ok'],['To inform','facts'],['To entertain','fun']]],
  ['"Owls hunt at night and can turn their heads a long way." Why was it written?','🦉',[['To inform','ok'],['To persuade','push'],['To entertain','story']]],
  ['Which word shows the author wants you to do something?','🔎',[['must','ok'],['owls','noun'],['Tuesday','fact']]],
  ['The author says parks should open later. You disagree. What is true?','🤔',[['You can have a different view','ok'],['You read it wrong','wrong'],['The author must change','change']]],
  ['"The council wasted money on a statue." How does the author feel about the statue?','🗿',[['Against it','ok'],['For it','for'],['We cannot tell','tell']]],
  ['How do you prove an author\u2019s purpose?','✅',[['Point to the words that show it','ok'],['Say how you feel','feel'],['Count the sentences','count']]]];
 let qn=-1,streak=0;
 function quiz(){qn++;const[q,pic,ops]=QZ[qn%QZ.length],r=qn%3;K.Q=pic;
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(tag)});say('Challenge: '+q);A.redraw()}
 function judge(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Yes! You read the author\u2019s purpose.';break;
   case 'facts':m='"Buy" and "today" push you to act. Kids loving them is there to persuade you.';break;
   case 'fun':m='It is short and fun, but it wants you to buy. That is persuading.';break;
   case 'push':m='Nothing tells you what to do. True facts that teach mean inform.';break;
   case 'story':m='Owls really do this. It is true, not a made-up story, so it informs.';break;
   case 'noun':m='"Owls" just names a thing. Push words tell you what to do, like must or should.';break;
   case 'fact':m='A day is a fact. Look for the word that tells you what to do.';break;
   case 'wrong':m='You can read it well and still disagree. The author\u2019s view and yours can differ.';break;
   case 'change':m='Authors keep their view. You give yours: the author thinks… but I think…';break;
   case 'for':m='"Wasted" is a cross word. It shows the author is against the statue.';break;
   case 'tell':m='We can tell from one word: "wasted" shows the author thinks it was a bad idea.';break;
   case 'feel':m='Your feelings matter, but proof comes from the text. Point to the words.';break;
   default:m='Counting does not show purpose. Find the words that give the reason away.'}
  const good=tag==='ok';if(good){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${good?'✓':'✗'} ${m}${good?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
 const L2V=p=>{const L=line();return(p.x-L.x0)/(L.x1-L.x0)};
 function down(p){const v=view();K.drag=null;K.pin=null;
  if(v==='deal'&&K.i<DEAL.length){if(inR(p,card())){K.drag={x:p.x,y:p.y};return true}const j=[0,1,2].find(j=>inR(p,tray(j)));if(j!=null)deal(j);return false}
  if(v==='clue'){const r=chips.find(r=>inR(p,r));if(r)clue(r.i);return false}
  if(v==='pins'){const L=line();if(Math.abs(p.y-L.y)<A.H*.18){const da=Math.abs(L2V(p)-K.au),dm=Math.abs(L2V(p)-K.me);K.pin=da<dm||(da===dm&&p.y<L.y)?'au':'me';return true}return false}
  if(v==='tone'){const i=[0,1].find(i=>inR(p,slot(i)));if(i!=null)swap(i);return false}
  if(v==='prove'&&K.pok<3){if(K.pur<0){const i=[0,1,2].find(i=>inR(p,pb(i)));if(i!=null)purpose(i)}else{const i=sents().findIndex((_,i)=>inR(p,sb(i)));if(i>=0)proof(i)}}return false}
 function move(p){if(K.drag){K.drag.x=p.x;K.drag.y=p.y;A.redraw()}else if(K.pin){K[K.pin]=mx(0,mn(1,L2V(p)));if(K.pin==='me')K.meMoved=true;A.redraw()}}
 function up(p){const v=view();if(v==='deal'&&K.drag){const j=[0,1,2].find(j=>inR(p,tray(j)));if(j!=null)deal(j);else{K.drag=null;A.redraw()}return}
  if(v==='pins'&&K.pin){const k=K.pin;K.pin=null;setPin(k,K[k])}}
 A=FK.shell(c,{steps,ratio:.64,tall:1.25,draw,onStep:A=>{chal.hidden=A.step!==5;read.hidden=A.step===5;pad.hidden=A.step===5;refresh()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
   A.gest({down,move,up});refresh()}});
 A.start()})})();
