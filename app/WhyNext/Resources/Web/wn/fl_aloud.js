/* Flagship – listening to texts read aloud (ages 5–10): hear a story one line at a time, answer who, where and what
   went wrong, tap the line that holds a key detail, retell the events in order, and ask about a tricky word in a fact text. */
(()=>{const mn=Math.min,mx=Math.max,hy=Math.hypot;
 const STORY=[['Mia got a red kite for her birthday.','🎁'],['She took it to the park with Grandpa.','🏞️'],['The wind blew hard. The kite got stuck in a tall tree!','🌳'],
  ['Mia felt sad. Then Grandpa had an idea.','💡'],['He got a ladder and got the kite down.','🪜'],['Mia smiled and flew her kite all day.','😊']];
 const WWP=[['Who is the story about?',[['Mia','ok'],['A pirate','notin'],['My friend Sam','own']]],['Where did they go?',[['To the park','ok'],['To school','notin'],['To my house','own']]],
  ['What went wrong?',[['The kite got stuck in a tree','ok'],['The kite was red','detail'],['Mia had a birthday','detail']]]],ROT=[1,2,0];
 const WHY={notin:'That is not in the story. Answer from what you heard.',own:'That is about you, not the story. Use what the story said.',detail:'That is true, but nothing went wrong there. A problem is when something goes wrong.'};
 const FIND=[['What colour was the kite?',0,'Red!','Listen for a colour word.'],['Who went to the park with Mia?',1,'Grandpa!','Listen for who went with her.'],['How did the kite come down?',4,'With a ladder!','Listen for what Grandpa used.']];
 const EV=[['🪁','Mia gets a kite'],['🌳','The kite gets stuck'],['🪜','Grandpa gets it down']],SHOW=[1,2,0],SLOT=['First','Next','Last'];
 const OWL='Owls are nocturnal. Their big eyes help them find mice in the dark.',WORD='nocturnal';
 const ASKQ=[['What does nocturnal mean?','ok'],['Keep quiet and guess','quiet'],['Do owls like cake?','off']];
 const ASKWHY={quiet:'A guess can be wrong. Ask, and then you will know.',off:'That question is not about the word you did not get.'};
 const OWLQ=[['In the morning','no'],['At night','ok'],['At lunch time','no']];
VIS.reg('flagaloud',c=>{let A,pad,chal,read;c.fig.classList.add('young');
 const S={heard:0,wi:0,wok:0,fi:0,fok:0,hit:-1,ord:[],word:0,asked:0,owl:0,bad:null,hold:null,dp:null,p0:null,run:0,want:()=>{},Q:null,words:[]};
 const say=t=>{c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(read)read.textContent=t}};
 const mode=()=>['listen','wwp','find','order','word','quiz'][A.step];
 const fz=(z,w)=>`${w||700} ${A.narrow?z:z+2}px system-ui,sans-serif`;
 function write(x,t,X,Y,z,k,w,al){x.font=fz(z,w);x.textAlign=al||'center';x.textBaseline='middle';x.fillStyle=k;x.fillText(t,X,Y,A.W-16)}
 function panel(x,R,k,thick,a){x.fillStyle=A.alpha(k,a||.13);A.paint.rrect(R.x,R.y,R.w,R.h,12);x.fill();x.lineWidth=thick?4:2;x.strokeStyle=k;x.stroke()}
 const hit=(p,R)=>R&&p.x>=R.x&&p.x<=R.x+R.w&&p.y>=R.y&&p.y<=R.y+R.h;
 function split(x,t,w,z){x.font=fz(z,800);const out=[];let cur='';t.split(' ').forEach(s=>{const n=cur?cur+' '+s:s;if(x.measureText(n).width>w&&cur){out.push(cur);cur=s}else cur=n});out.push(cur);return out}
 function inBox(x,t,R,z,k){const L=split(x,t,R.w-14,z),lh=(A.narrow?z:z+2)*1.2;L.forEach((l,i)=>write(x,l,R.x+R.w/2,R.y+R.h/2+(i-(L.length-1)/2)*lh,z,k,800))}
 /* lay the sentences out word by word so a tap can find which sentence (or which word) is under the finger */
 function flow(x,lines,X,Y,w,z,gap){const lh=(A.narrow?z:z+2)*1.45,words=[];let y=Y+6;x.font=fz(z,600);const sp=x.measureText(' ').width;
  lines.forEach((t,i)=>{let cx=X;y+=lh+(i?gap||0:0);t.split(' ').forEach(s=>{const ww=x.measureText(s).width;if(cx+ww>X+w&&cx>X){cx=X;y+=lh}words.push({i,s,x:cx,y:y-lh*.5,w:ww,h:lh});cx+=ww+sp})});
  return{words,bottom:y+lh*.4}}
 const rowR=(i,top)=>{const h=mn(56,A.H*.13);return{x:A.W*.07,y:top+i*(h+8),w:A.W*.86,h}};
 const readBtn=()=>({x:A.W*.18,y:A.H-mn(64,A.H*.15)-10,w:A.W*.64,h:mn(64,A.H*.15)});
 const slotR=()=>({x:A.W*.07,y:A.H*.27,w:A.W*.86,h:mn(56,A.H*.13)});
 const col=(i,y,h)=>{const g=10,w=(A.W-4*g)/3;return{x:g+i*(w+g),y,w,h}};
 function storyCard(x,shown,mark){const C=A.col,R={x:8,y:6,w:A.W-16,h:0};
  const f=flow(x,STORY.map((s,i)=>i<shown?s[0]:'• • •'),R.x+34,R.y,R.w-44,14,7);R.h=f.bottom-R.y+6;panel(x,R,C.cy,0,.07);
  f.words.forEach((o,j)=>{if(!j||f.words[j-1].i!==o.i)write(x,String(o.i+1),R.x+17,o.y,13,C.mu,900)});
  f.words.forEach(o=>{const k=mark&&mark(o.i);if(k){x.fillStyle=A.alpha(k,.28);x.fillRect(o.x-3,o.y-o.h/2+2,o.w+6,o.h-4)}write(x,o.s,o.x,o.y,14,o.i<shown?C.tx:C.mu,600,'left')});
  S.words=f.words;return R.y+R.h}
 function listenV(x){const C=A.col,b=storyCard(x,S.heard,i=>i===S.heard-1?C.am:null);
  if(S.heard)write(x,STORY[S.heard-1][1],A.W/2,(b+readBtn().y)/2,mn(40,A.H*.1),C.tx);
  const R=readBtn();if(S.heard<STORY.length){panel(x,R,C.gr,1,.2);write(x,'🔊 Read the next line',R.x+R.w/2,R.y+R.h/2,16,C.tx,800)}
  else write(x,'You heard the whole story!',A.W/2,R.y+R.h/2,16,C.gr,800)}
 function wwpV(x){const C=A.col;write(x,STORY.map(s=>s[1]).join(' '),A.W/2,A.H*.07,mn(26,A.H*.065),C.tx);
  if(S.wok>=3)return write(x,'Who, where and what went wrong: all found!',A.W/2,A.H*.5,15,C.gr,800);
  const q=WWP[S.wi];write(x,q[0],A.W/2,A.H*.19,17,C.tx,900);const D=slotR();x.setLineDash([7,6]);panel(x,D,C.vi,0,.05);x.setLineDash([]);
  write(x,'Drag the answer here',D.x+D.w/2,D.y+D.h/2,13,C.mu,700);
  order3(S.wi).forEach((j,r)=>{const o=q[1][j],R=rowR(r,A.H*.47),d=S.hold===j&&S.dp,Q=d?{x:S.dp.x-R.w/2,y:S.dp.y-R.h/2,w:R.w,h:R.h}:R;panel(x,Q,S.bad===j?C.rd:C.or,d||S.bad===j,.16);inBox(x,o[0],Q,15,C.tx)})}
 const order3=i=>[0,1,2].map(k=>(k+ROT[i])%3);
 function findV(x){const C=A.col,f=FIND[S.fi],b=storyCard(x,STORY.length,i=>i===S.hit?(S.hit===f[1]?C.gr:C.rd):null);
  if(S.fok>=3)return write(x,'Every answer came from the story!',A.W/2,(b+A.H)/2,15,C.gr,800);
  write(x,f[0],A.W/2,b+(A.H-b)*.35,16,C.tx,900);write(x,S.hit===f[1]?f[2]:'Tap the line that tells you.',A.W/2,b+(A.H-b)*.7,14,S.hit===f[1]?C.gr:C.mu,800)}
 function orderV(x){const C=A.col,h=A.H*.3;SLOT.forEach((t,i)=>{const R=col(i,A.H*.1,h);x.setLineDash(S.ord[i]==null?[6,5]:[]);panel(x,R,S.ord[i]==null?C.mu:C.gr,0,.06);x.setLineDash([]);
   write(x,t,R.x+R.w/2,R.y-12,13,C.mu,800);if(S.ord[i]!=null)evCard(x,S.ord[i],R)});
  if(S.ord.length>=3)return write(x,'Mia’s story, in order!',A.W/2,A.H*.62,16,C.gr,800);
  write(x,'Drag what happened '+SLOT[S.ord.length].toLowerCase()+' up to its box.',A.W/2,A.H*.5,13,C.mu,700);
  SHOW.forEach((e,i)=>{if(S.ord.includes(e))return;const R=col(i,A.H*.57,h),d=S.hold===e&&S.dp,Q=d?{x:S.dp.x-R.w/2,y:S.dp.y-R.h/2,w:R.w,h:R.h}:R;panel(x,Q,S.bad===e?C.rd:C.cy,d||S.bad===e,.15);evCard(x,e,Q)})}
 function evCard(x,e,R){write(x,EV[e][0],R.x+R.w/2,R.y+R.h*.3,mn(30,R.h*.3),A.col.tx);inBox(x,EV[e][1],{x:R.x,y:R.y+R.h*.5,w:R.w,h:R.h*.45},12,A.col.tx)}
 function wordV(x){const C=A.col,R={x:8,y:6,w:A.W-16,h:0};write(x,'🦉',A.W-30,A.H*.06+18,26,C.tx);
  const f=flow(x,OWL.split('. ').map((s,i)=>i?s:s+'.'),R.x+12,R.y,R.w-60,15);R.h=f.bottom-R.y+6;panel(x,R,C.cy,0,.07);
  f.words.forEach(o=>{const isW=o.s.startsWith(WORD);if(isW){x.fillStyle=A.alpha(S.word?C.gr:C.am,.3);x.fillRect(o.x-4,o.y-o.h/2+2,o.w+8,o.h-4)}write(x,o.s,o.x,o.y,15,C.tx,isW?900:600,'left')});
  S.words=f.words;const top=S.wtop=R.y+R.h+12;
  if(!S.word)return write(x,'Which word was new to you? Tap it.',A.W/2,top+20,15,C.mu,800);
  if(!S.asked){write(x,'What could you ask?',A.W/2,top+16,15,C.tx,900);return ASKQ.forEach((o,j)=>{const B=rowR(j,top+36);panel(x,B,S.bad===j?C.rd:C.vi,S.bad===j);inBox(x,o[0],B,15,C.tx)})}
  write(x,'Reader: “Nocturnal means awake at night.”',A.W/2,top+16,14,C.gr,800);
  if(S.owl)return write(x,'Asking made the fact clear!',A.W/2,top+60,16,C.gr,800);
  write(x,'When does an owl hunt?',A.W/2,top+44,15,C.tx,900);OWLQ.forEach((o,j)=>{const B=rowR(j,top+64);panel(x,B,S.bad===j?C.rd:C.or,S.bad===j);inBox(x,o[0],B,15,C.tx)})}
 function draw(A){const{ctx:x,W,H,col:C}=A;x.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.04:.4);x.fillRect(0,0,W,H);
  const f={listen:listenV,wwp:wwpV,find:findV,order:orderV,word:wordV}[mode()];if(f)f(x);else write(x,S.Q?S.Q.big:'📖',W/2,H/2,mn(W,H)*.2,C.tx);A.fx.draw(x)}
 function speak(t,live){if(!live)return;try{const s=window.speechSynthesis;if(s&&window.SpeechSynthesisUtterance){s.cancel();const u=new SpeechSynthesisUtterance(t);u.rate=.85;s.speak(u)}}catch(e){}}
 function hear(live){if(S.heard>=STORY.length)return;const t=STORY[S.heard][0];S.heard++;speak(t,live);A.sound.tick();report('Read aloud: '+t)}
 function pickW(j){if(S.wok>=3)return;const o=WWP[S.wi][1][j];if(o[1]!=='ok'){S.bad=j;return oops(WHY[o[1]])}S.bad=null;S.wok++;S.wi=mn(2,S.wok);A.sound.pop();report(`"${o[0]}" — that came from the story.`)}
 function tapLine(i){if(S.fok>=3)return;const f=FIND[S.fi];S.hit=i;if(i!==f[1])return oops(`That line does not tell us. ${f[3]}`);A.sound.pop();report(`Yes, that line says it. ${f[2]}`);
  const r=S.run;setTimeout(()=>{if(r!==S.run)return;S.fok++;S.fi=mn(2,S.fok);S.hit=-1;report()},A.reduced()?10:800)}
 function place(e){if(S.ord.length>=3)return;const want=S.ord.length;if(e!==want){S.bad=e;return oops(e>want?`Not yet. "${EV[e][1]}" happened later. What happened before that?`:'That already happened.')}
  S.bad=null;S.ord.push(e);A.sound.pop();report(`${SLOT[want]}: ${EV[e][1]}.`)}
 function tapWord(){if(S.word)return;S.word=1;A.sound.tick();report('You found the new word: nocturnal.')}
 function ask(j){if(!S.word||S.asked)return;const o=ASKQ[j];if(o[1]!=='ok'){S.bad=j;return oops(ASKWHY[o[1]])}S.bad=null;S.asked=1;A.sound.pop();report('You asked. The reader says: nocturnal means awake at night.')}
 function owl(j){if(!S.asked||S.owl)return;if(OWLQ[j][1]!=='ok'){S.bad=j;return oops('Nocturnal means awake at night. So when does an owl hunt?')}S.bad=null;S.owl=1;A.sound.pop();report('At night. You worked it out from the word you asked about.')}
 function oops(t){A.sound.miss();say(t);sync()}
 function report(msg){const v=mode();let t;
  if(v==='listen')t=S.heard>=STORY.length?'All six lines heard.':`Lines heard: ${S.heard} of ${STORY.length}.`;
  else if(v==='wwp')t=S.wok>=3?'Who, where and the problem are found.':`Question: ${WWP[S.wi][0]} Answers: ${order3(S.wi).map(j=>WWP[S.wi][1][j][0]).join(', ')}.`;
  else if(v==='find')t=S.fok>=3?'All three found in the story.':`Question: ${FIND[S.fi][0]} Tap the story line that tells you.`;
  else if(v==='order')t=S.ord.length>=3?'The story is in order.':`Boxes filled: ${S.ord.length} of 3. What happened ${SLOT[S.ord.length].toLowerCase()}?`;
  else if(v==='word')t=S.owl?'Owls hunt at night.':S.asked?'When does an owl hunt?':S.word?'Pick a question to ask.':'Fact read aloud: '+OWL+' Which word is new?';
  else t='Challenge time.';say((msg?msg+' ':'')+t);sync();S.want()}
 function sync(){if(!A||!pad)return;pad.innerHTML='';const v=mode(),K=(t,f,off,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);e.disabled=!!off;e.onclick=f};
  if(v==='listen')K('🔊 Read the next line',()=>hear(1),S.heard>=STORY.length);
  if(v==='wwp'&&S.wok<3)order3(S.wi).forEach(j=>K(WWP[S.wi][1][j][0],()=>pickW(j),0,'Answer: '+WWP[S.wi][1][j][0]));
  if(v==='find'&&S.fok<3)STORY.forEach((s,i)=>K('Line '+(i+1),()=>tapLine(i),0,'Line '+(i+1)+': '+s[0]));
  if(v==='order'&&S.ord.length<3)SHOW.forEach(e=>{if(!S.ord.includes(e))K(EV[e][1],()=>place(e),0,`Put "${EV[e][1]}" ${SLOT[S.ord.length].toLowerCase()}`)});
  if(v==='word'){if(!S.word)K('Tap the new word: nocturnal',tapWord);else if(!S.asked)ASKQ.forEach((o,j)=>K(o[0],()=>ask(j)));else if(!S.owl)OWLQ.forEach((o,j)=>K(o[0],()=>owl(j)))}A.redraw()}
 const fin=(st,ok,msg)=>()=>{if(A.step===st&&ok()&&(!steps[st].predict||A.pred[st]!=null))A.done(msg()+A.reveal(st))};
 const later=(fs,gap)=>{const r=S.run;fs.forEach((f,j)=>setTimeout(()=>{if(r===S.run)f()},A.reduced()?j*20:j*gap))};
 const reset=()=>{S.run++;S.want=()=>{};S.Q=null;S.hold=null;S.dp=null;S.bad=null;S.hit=-1;try{window.speechSynthesis&&speechSynthesis.cancel()}catch(e){}};
 const steps=[
  {h:'Listen to the story',p:'A grown-up reads a story out loud. Tap to hear it, one line at a time. Look at the picture too.',task:'Hear all six lines',
   show:()=>{steps[0].go();later(STORY.map(()=>()=>hear(0)),350)},go:()=>{reset();S.heard=0;report();S.want=fin(0,()=>S.heard>=STORY.length,()=>'Listening to every line helps you know the whole story.')}},
  {h:'Who, where, what went wrong',p:'Good listeners can say who was in the story, where it was, and what went wrong.',
   predict:{q:'Mia’s kite was red. Is that what went wrong?',opts:['Yes','No, a problem is when something goes wrong'],ans:1},task:'Answer all three questions',
   show:()=>{steps[1].go();later([0,1,2].map(()=>()=>pickW(0)),500)},go:()=>{reset();S.wi=0;S.wok=0;report();S.want=fin(1,()=>S.wok>=3,()=>'Who: Mia. Where: the park. What went wrong: the kite got stuck.')}},
  {h:'Find it in the story',p:'Answers come from the story, not from your own life. Tap the line that tells you.',
   predict:{q:'What colour was Mia’s kite? Your kite is blue. What do you say?',opts:['Blue, like mine','What the story said'],ans:1},task:'Find three answers in the story',
   show:()=>{steps[2].go();later([0,1,4].map(i=>()=>tapLine(i)),1000)},go:()=>{reset();S.fi=0;S.fok=0;report();S.want=fin(2,()=>S.fok>=3,()=>'Each answer was in a line of the story.')}},
  {h:'Tell it in order',p:'Can you tell the story back? Put what happened first, next and last.',task:'Put the three parts in order',
   show:()=>{steps[3].go();later([0,1,2].map(e=>()=>place(e)),450)},go:()=>{reset();S.ord=[];report();S.want=fin(3,()=>S.ord.length>=3,()=>'First the kite, next it got stuck, last Grandpa got it down.')}},
  {h:'Ask about a new word',p:'Books with facts are read aloud too. If a word is new, ask what it means.',
   predict:{q:'You hear a word you do not know. What helps most?',opts:['Keep quiet and hope','Ask what it means'],ans:1},task:'Find the new word, ask, then answer',
   show:()=>{steps[4].go();later([tapWord,()=>ask(0),()=>owl(1)],500)},go:()=>{reset();S.word=0;S.asked=0;S.owl=0;report();S.want=fin(4,()=>S.owl,()=>'Asking turned a hard word into a clear fact.')}},
  {h:'Challenge',p:'',go:()=>{reset();quiz()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.want()});
 const QZ=[['Ben lost his hat at the beach. His dog found it in the sand.','Where was Ben?','🏖️',[['At the beach','ok'],['At school','notin'],['I go to the pool','own']]],
  ['Sam made a cake. It fell on the floor! So Sam made a new one.','What went wrong?','🎂',[['The cake fell on the floor','ok'],['Sam made a cake','detail'],['Cakes are yummy','own']]],
  ['Lin planted a seed. She gave it water. Then a flower grew.','What happened last?','🌷',[['A flower grew','ok'],['She planted a seed','order'],['She ate the flower','notin']]],
  ['Frogs lay eggs in ponds. The eggs turn into tadpoles.','Where do frogs lay eggs?','🐸',[['In ponds','ok'],['In trees','notin'],['My toy frog is green','own']]],
  ['The bear found a … (you did not hear the last word).','What do you do?','🐻',[['Ask: Can you read that again?','ok'],['Make up a word','guess'],['Say nothing','quiet']]],
  ['Ava’s balloon flew away. She cried.','How did Ava feel?','🎈',[['Sad','ok'],['Happy','notin'],['I like balloons','own']]]];
 let qn=-1,stars=0;
 function quiz(){qn++;const [txt,q,big,ops]=QZ[qn%QZ.length],rot=qn%3;S.Q={big};
  chal.innerHTML=`<p>📖 <i>${txt}</i></p><p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const r=chal.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},r,o);b.onclick=()=>mark(tag)});say('Challenge: '+txt+' '+q);A.redraw()}
 function mark(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Yes! That came from what you heard.';break;
   case 'notin':m='That was not in the text. Answer from what was read.';break;
   case 'own':m='That is about you. The question is about the text.';break;
   case 'detail':m='True, but nothing went wrong there. Look for the problem.';break;
   case 'order':m='That happened first, not last. Think about the order.';break;
   case 'guess':m='Making it up can be wrong. Ask to hear it again.';break;
   default:m='Saying nothing keeps you stuck. Ask the reader to say it again.'}
  const ok=tag==='ok';if(ok){stars++;A.win()}else{stars=0;A.sound.miss()}fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Stars: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
 const lineAt=p=>{const o=S.words.find(o=>p.x>=4&&p.x<=A.W-4&&Math.abs(p.y-o.y)<=o.h/2+3);return o?o.i:-1};
 function down(p){const v=mode();S.p0=p;S.dp=null;S.hold=null;
  if(v==='listen'){if(hit(p,readBtn()))hear(1);return false}
  if(v==='wwp'&&S.wok<3){const r=[0,1,2].find(r=>hit(p,rowR(r,A.H*.47)));if(r!=null){S.hold=order3(S.wi)[r];return true}return false}
  if(v==='find'){const i=lineAt(p);if(i>=0)tapLine(i);return false}
  if(v==='order'&&S.ord.length<3){const i=[0,1,2].find(i=>hit(p,col(i,A.H*.57,A.H*.3))&&!S.ord.includes(SHOW[i]));if(i!=null){S.hold=SHOW[i];return true}return false}
  if(v==='word'){if(!S.word){const o=S.words.find(o=>o.s.startsWith(WORD)&&hit(p,{x:o.x-8,y:o.y-o.h/2,w:o.w+16,h:o.h}));if(o)tapWord();return false}
   const top=S.wtop||0,j=[0,1,2].find(j=>hit(p,rowR(j,top+(S.asked?64:36))));if(j!=null)S.asked?owl(j):ask(j)}return false}
 function up(p){const v=mode(),k=S.hold,far=S.p0&&hy(p.x-S.p0.x,p.y-S.p0.y)>12;S.hold=null;S.dp=null;if(k==null)return A.redraw();
  if(v==='wwp'){const D=slotR();if(!far||p.y<D.y+D.h+10)pickW(k);else A.redraw()}
  else if(v==='order'){if(!far||p.y<A.H*.45)place(k);else A.redraw()}}
 A=FK.shell(c,{steps,ratio:.62,tall:1.25,draw,onStep:A=>{chal.hidden=A.step!==5;read.hidden=A.step===5;pad.hidden=A.step===5;sync()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
   A.gest({down,move:p=>{S.dp=p;A.redraw()},up});sync()}});
 A.start()})})();
