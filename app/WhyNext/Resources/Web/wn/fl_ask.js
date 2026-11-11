/* Flagship 74 – asking questions (ages 4–6): ask instead of guessing which box, ask good questions to open a mystery box,
   give answers that fit, ask again kindly when you did not get it, and pick the question that gets you help. */
(()=>{const mn=Math.min,hy=Math.hypot;
 const BOX=[['red','#ef4444'],['blue','#3b82f6'],['yellow','#eab308']],GOAL=1;
 const MYS=[['Is it an animal?','Yes, it is an animal!',1],['What sound does it make?','It says quack!',1],['Do you like hats?','That does not help us find out.',0],['What colour is it?','It is yellow.',1]];
 const ANS=[['Where is the ball?','⚽',[['Under the bed','ok'],['I like balls','off'],['Somewhere','vague']]],
  ['What do you want to eat?','🍽️',[['An apple, please','ok'],['Yes','yes'],['My dog is big','off']]],
  ['How many cats do you have?','🐱',[['Two cats','ok'],['Some','vague'],['Cats are soft','off']]]];
 const WHY={off:'That is true, but it is about something else. Answer what they asked.',vague:'That is too fuzzy. Say just where, or just how many.',yes:'Yes does not tell what you want. Name the food.'};
 const AGAIN=[['Gtyrcoatnlnupbythdoor!','Get your coat. Line up by the door.'],['Bring me the huge red book.','Huge means very, very big.']];
 const POL=[[['Can you say that again, please?','ok'],['WHAT?','rude'],['Say nothing and guess','quiet']],
  [['What does huge mean, please?','ok'],['That word is silly','silly'],['Say nothing and guess','quiet']]];
 const POLWHY={rude:'Shouting What? sounds cross. Ask kindly, with please.',quiet:'If you guess, you may get it wrong. Asking is better.',silly:'The word is not silly. You just do not know it yet. Ask what it means.'};
 const HELP=[['Pip can not find a shoe.','👟'],['The cup is up too high.','🥤'],['Pip does not know the game.','🎲']];
 const HQ=['Have you seen my shoe?','Can you help me reach it, please?','How do we play?'],HQ_X=[2,0,1];
VIS.reg('flagask',c=>{let A,pad,chal,read;c.fig.classList.add('young');
 const S={asked:0,put:-1,guess:-1,got:[],open:0,ai:0,aok:0,gi:0,gok:0,clear:0,hi:0,hok:0,bad:null,hold:null,dp:null,p0:null,want:()=>{},run:0,Q:null};
 const say=t=>{c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(read)read.textContent=t}};
 const mode=()=>['box','mystery','answer','again','help','quiz'][A.step];
 const Z=z=>A.narrow?z:z+2,tint=(k,a)=>A.alpha(k,a);
 const txt=(x,t,X,Y,z,k,w)=>{x.font=`${w||700} ${Z(z)}px system-ui,sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillStyle=k;x.fillText(t,X,Y,A.W-20)};
 const card=(x,R,k,strong,a)=>{x.fillStyle=tint(k,a||.14);A.paint.rrect(R.x,R.y,R.w,R.h,14);x.fill();x.strokeStyle=k;x.lineWidth=strong?4:2;x.stroke()};
 const inR=(p,R)=>p.x>R.x&&p.x<R.x+R.w&&p.y>R.y&&p.y<R.y+R.h,oops=t=>{A.sound.miss();say(t);A.redraw()};
 const lab=(x,t,R,z,k)=>{x.font=`800 ${Z(z)}px system-ui,sans-serif`;const w=R.w-16;if(x.measureText(t).width<=w)return txt(x,t,R.x+R.w/2,R.y+R.h/2,z,k,800);
  const ws=t.split(' ');let a=ws.length-1;while(a>1&&x.measureText(ws.slice(0,a).join(' ')).width>w)a--;const l1=ws.slice(0,a).join(' '),l2=ws.slice(a).join(' '),d=Z(z)*.62;
  txt(x,l1,R.x+R.w/2,R.y+R.h/2-d,z,k,800);txt(x,l2,R.x+R.w/2,R.y+R.h/2+d,z,k,800)};
 const bubble=(x,t,X,Y,w,k)=>{const h=Z(40);card(x,{x:X-w/2,y:Y-h/2,w,h},k||A.col.cy,0,.1);x.beginPath();x.moveTo(X-10,Y+h/2);x.lineTo(X-2,Y+h/2+12);x.lineTo(X+6,Y+h/2);x.fillStyle=tint(k||A.col.cy,.3);x.fill();txt(x,t,X,Y,15,A.col.tx,800)};
 const boxR=i=>{const g=12,w=(A.W-4*g)/3,h=mn(90,A.H*.22);return{x:g+i*(w+g),y:A.H-h-14,w,h}};
 const block=()=>({x:A.W/2,y:A.H*.5,r:mn(30,A.W*.07)});
 const twoBtn=i=>{const g=10,w=(A.W-3*g)/2,h=mn(62,A.H*.15);return{x:g+i*(w+g),y:A.H*.3,w,h}};
 const qR=i=>{const g=10,w=(A.W-3*g)/2,h=mn(64,A.H*.15);return{x:g+(i%2)*(w+g),y:A.H-2*(h+g)+Math.floor(i/2)*(h+g),w,h}};
 const row=i=>{const h=mn(58,A.H*.135);return{x:A.W*.08,y:A.H*.42+i*(h+8),w:A.W*.84,h}};
 const mouth=()=>({x:A.W*.1,y:A.H*.1,w:A.W*.8,h:mn(70,A.H*.17)});
 function boxV(x){const C=A.col;bubble(x,S.asked?'The blue box!':'Put the block on the… mmm… box.',A.W/2,A.H*.1,A.W*.86);
  BOX.forEach((b,i)=>{const R=boxR(i);card(x,R,b[1],S.put===i||S.guess===i,.35);lab(x,b[0],R,16,C.tx)});
  if(S.put!==GOAL){const B=S.hold===0&&S.dp?S.dp:block();A.paint.ball(B.x,B.y,block().r,'#22c55e');txt(x,'block',B.x,B.y,12,'#052e16',900)}
  if(!S.asked){const R=twoBtn(0),Q=twoBtn(1);[R,Q].forEach((r,i)=>{r.y=A.H*.24;card(x,r,i?C.gr:C.mu,0,.12);lab(x,i?'Ask: Which box?':'Just guess',r,15,C.tx)})}
  else txt(x,S.put===GOAL?'Asking told Pip the answer!':'Now drag the block to the blue box.',A.W/2,A.H*.3,15,S.put===GOAL?C.gr:C.mu,800)}
 function mysV(x){const C=A.col,n=S.got.filter(i=>MYS[i][2]).length;card(x,{x:A.W/2-A.W*.16,y:A.H*.06,w:A.W*.32,h:A.H*.26},C.or,1,.25);
  txt(x,S.open?'🦆':'?',A.W/2,A.H*.19,S.open?40:44,C.tx,900);txt(x,S.open?'A yellow duck!':`Good clues: ${n} of 3`,A.W/2,A.H*.4,15,S.open?C.gr:C.mu,800);
  const last=S.got[S.got.length-1];if(last!=null)txt(x,MYS[last][1],A.W/2,A.H*.48,15,MYS[last][2]?C.tx:C.rd,800);
  MYS.forEach((m,i)=>{const R=qR(i),on=S.got.includes(i);card(x,R,on?(m[2]?C.gr:C.rd):C.vi,on);lab(x,m[0],R,13,C.tx)})}
 function ansV(x){const C=A.col;if(S.aok>=3)return txt(x,'Every answer fit the question!',A.W/2,A.H/2,16,C.gr,800);
  const q=ANS[S.ai],M=mouth();txt(x,q[1],A.W*.1,M.y+M.h/2,26,C.tx);bubble(x,q[0],A.W*.56,M.y+M.h/2,A.W*.74,C.cy);txt(x,'Drag the best answer up to your friend.',A.W/2,A.H*.36,13,C.mu,700);
  q[2].forEach((o,j)=>{const R=row(j),drag=S.hold===j&&S.dp,Q=drag?{x:S.dp.x-R.w/2,y:S.dp.y-R.h/2,w:R.w,h:R.h}:R;card(x,Q,S.bad===j?C.rd:C.vi,drag||S.bad===j);lab(x,o[0],Q,16,C.tx)});
  txt(x,`Question ${S.ai+1} of 3`,A.W/2,A.H-12,12,C.mu)}
 function againV(x){const C=A.col;if(S.gok>=2)return txt(x,'You asked kindly and found out both times!',A.W/2,A.H/2,15,C.gr,800);
  const g=AGAIN[S.gi];txt(x,'👩‍🏫',A.W*.1,A.H*.12,26,C.tx);bubble(x,S.clear?g[1]:g[0],A.W*.56,A.H*.12,A.W*.76,S.clear?C.gr:C.or);
  txt(x,S.gi?'Pip does not know the word huge.':'Too fast! Pip did not get it.',A.W/2,A.H*.3,14,C.mu,800);
  POL[S.gi].forEach((o,j)=>{const R=row(j);card(x,R,S.bad===j?C.rd:C.vi,S.bad===j);lab(x,o[0],R,15,C.tx)})}
 function helpV(x){const C=A.col;if(S.hok>=3)return txt(x,'Pip asked and got help every time!',A.W/2,A.H/2,15,C.gr,800);
  const h=HELP[S.hi],B=mouth();txt(x,h[1],A.W/2,A.H*.1,30,C.tx);txt(x,h[0],A.W/2,A.H*.2,16,C.tx,900);
  B.y=A.H*.27;card(x,B,C.cy,S.hold!=null,.08);txt(x,'Pip says: drop a question here',B.x+B.w/2,B.y+B.h/2,13,C.mu,700);
  HQ_X.forEach((k,j)=>{if(S.used&&S.used.includes(k))return;const R=row(j),drag=S.hold===k&&S.dp,Q=drag?{x:S.dp.x-R.w/2,y:S.dp.y-R.h/2,w:R.w,h:R.h}:R;R.y+=A.H*.06;if(!drag)Q.y=R.y;
   card(x,Q,S.bad===k?C.rd:C.vi,drag||S.bad===k);lab(x,HQ[k],Q,15,C.tx)})}
 function draw(A){const{ctx:x,W,H,col:C}=A,v=mode();x.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.04:.45);x.fillRect(0,0,W,H);
  const f={box:boxV,mystery:mysV,answer:ansV,again:againV,help:helpV}[v];if(f)f(x);else{x.textAlign='center';x.textBaseline='middle';x.fillStyle=tint(C.cy,.5);x.font=`900 ${mn(W,H)*.18}px system-ui`;x.fillText(S.Q?S.Q.big:'?',W/2,H/2)}A.fx.draw(x)}
 function guess(){if(S.asked)return;S.guess=0;oops('Pip guessed red. Oh no, wrong box! Guessing can be wrong. Ask!')}
 function askBox(){if(S.asked)return;S.asked=1;S.guess=-1;A.sound.pop();report('Pip asked "Which box?" The answer: the blue box.')}
 function drop(i){if(S.put===GOAL)return;if(!S.asked){S.guess=i;return oops(`Pip does not know yet. Guessing ${BOX[i][0]} might be wrong. Ask first!`)}
  if(i!==GOAL){S.guess=i;return oops(`That is the ${BOX[i][0]} box. The answer was blue.`)}S.put=GOAL;S.guess=-1;A.sound.pop();report()}
 function askM(i){if(S.open||S.got.includes(i))return;S.got.push(i);const m=MYS[i];if(!m[2]){A.sound.miss();return report('Do you like hats? That question does not help find what is in the box.')}
  A.sound.tick();if(S.got.filter(j=>MYS[j][2]).length>=3){S.open=1;A.sound.pop()}report(m[1])}
 function answer(j){if(S.aok>=3)return;const o=ANS[S.ai][2][j];if(o[1]!=='ok'){S.bad=j;return oops(WHY[o[1]])}S.bad=null;S.aok++;S.ai=mn(2,S.aok);A.sound.pop();report(`"${o[0]}" fits the question.`)}
 function polite(j){if(S.gok>=2)return;const o=POL[S.gi][j];if(o[1]!=='ok'){S.bad=j;return oops(POLWHY[o[1]])}S.bad=null;S.clear=1;A.sound.pop();const g=AGAIN[S.gi];report('Pip asked kindly. Now it is clear: '+g[1]);
  const r=S.run;setTimeout(()=>{if(r!==S.run)return;S.gok++;if(S.gok<2){S.gi=1;S.clear=0}report()},A.reduced()?10:900)}
 function give(k){if(S.hok>=3)return;if(k!==S.hi){S.bad=k;return oops(`"${HQ[k]}" does not fit. ${HELP[S.hi][0]} Which question asks about that?`)}
  S.bad=null;S.used.push(k);S.hok++;S.hi=mn(2,S.hok);A.sound.pop();report(`Pip asked: "${HQ[k]}" Someone helped!`)}
 function report(msg){const v=mode();let t;
  if(v==='box')t=S.put===GOAL?'The block is on the blue box.':S.asked?'Drag the block to the blue box.':'Pip did not hear which box. Guess or ask?';
  else if(v==='mystery')t=S.open?'The box is open. It is a yellow duck.':`Questions asked: ${S.got.length}. Good clues: ${S.got.filter(i=>MYS[i][2]).length} of 3.`;
  else if(v==='answer')t=S.aok>=3?'All three answers fit.':`Your friend asks: ${ANS[S.ai][0]} Answers: ${ANS[S.ai][2].map(o=>o[0]).join(', ')}.`;
  else if(v==='again')t=S.gok>=2?'Both asked kindly.':S.clear?'Clear now.':`The teacher says: ${AGAIN[S.gi][0]} How will Pip ask?`;
  else if(v==='help')t=S.hok>=3?'Pip got help three times.':`${HELP[S.hi][0]} Pick the question Pip should ask.`;
  else t='Challenge time.';say((msg?msg+' ':'')+t);sync();S.want()}
 function sync(){if(!A||!pad)return;pad.innerHTML='';const v=mode();
  const K=(t,f,off,lab)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':lab||null},pad,t);e.disabled=!!off;e.onclick=f};
  if(v==='box'){K('Just guess',guess,S.asked);K('Ask: Which box?',askBox,S.asked);BOX.forEach((b,i)=>K('Put on '+b[0],()=>drop(i),S.put===GOAL,'Put the block on the '+b[0]+' box'))}
  if(v==='mystery')MYS.forEach((m,i)=>K(m[0],()=>askM(i),S.open||S.got.includes(i)));
  if(v==='answer'&&S.aok<3)ANS[S.ai][2].forEach((o,j)=>K(o[0],()=>answer(j),0,'Answer: '+o[0]));
  if(v==='again'&&S.gok<2&&!S.clear)POL[S.gi].forEach((o,j)=>K(o[0],()=>polite(j)));
  if(v==='help'&&S.hok<3)HQ_X.forEach(k=>K(HQ[k],()=>give(k),S.used.includes(k),'Ask: '+HQ[k]));A.redraw()}
 const fin=(st,ok,msg)=>()=>{if(A.step===st&&ok()&&(!steps[st].predict||A.pred[st]!=null))A.done(msg()+A.reveal(st))};
 const later=(fs,gap)=>{const r=S.run;fs.forEach((f,j)=>setTimeout(()=>{if(r===S.run)f()},A.reduced()?j*20:j*gap))};
 const reset=()=>{S.run++;S.want=()=>{};S.Q=null;S.hold=null;S.dp=null;S.bad=null};
 const steps=[
  {h:'Ask, do not guess',p:'The teacher says where the block goes, but Pip did not hear it all. Help Pip.',
   predict:{q:'Pip did not hear which box. What is best?',opts:['Guess a box','Ask "Which box?"'],ans:1},task:'Ask, then put the block on the right box',
   show:()=>{steps[0].go();later([askBox,()=>drop(GOAL)],600)},go:()=>{reset();S.asked=0;S.put=-1;S.guess=-1;report();S.want=fin(0,()=>S.put===GOAL,()=>'A guess can be wrong. A question gets the real answer.')}},
  {h:'Find out more',p:'What is in the box? Tap a question to ask it. Good questions give good clues.',
   predict:{q:'Which question helps find out what is in the box?',opts:['Do you like hats?','What sound does it make?'],ans:1},task:'Ask three good questions to open the box',
   show:()=>{steps[1].go();later([0,1,3].map(i=>()=>askM(i)),500)},go:()=>{reset();S.got=[];S.open=0;report();S.want=fin(1,()=>S.open,()=>'Each good question gave a clue. The hat question gave none.')}},
  {h:'Answer what they ask',p:'Your friend asks you something. Give an answer that fits. Drag it up, or tap it.',task:'Give three answers that fit',
   show:()=>{steps[2].go();later([0,0,0].map(j=>()=>answer(j)),500)},go:()=>{reset();S.ai=0;S.aok=0;report();S.want=fin(2,()=>S.aok>=3,()=>'A good answer says just what they asked: where, what, or how many.')}},
  {h:'Ask again, kindly',p:'Sometimes you do not get it. That is OK! Ask kindly, and you will find out.',
   predict:{q:'The teacher spoke too fast. What is kind?',opts:['Shout "WHAT?"','"Can you say that again, please?"'],ans:1},task:'Ask kindly two times',
   show:()=>{steps[3].go();later([()=>polite(0),()=>{},()=>{},()=>polite(0)],450)},go:()=>{reset();S.gi=0;S.gok=0;S.clear=0;report();S.want=fin(3,()=>S.gok>=2,()=>'Please and again turned a muddle into clear words.')}},
  {h:'Ask for help',p:'Pip needs help. Drag the question that fits up to Pip, or tap it.',task:'Help Pip ask three times',
   show:()=>{steps[4].go();later([0,1,2].map(k=>()=>give(k)),450)},go:()=>{reset();S.hi=0;S.hok=0;S.used=[];report();S.want=fin(4,()=>S.hok>=3,()=>'When you are stuck, a question can get you help.')}},
  {h:'Challenge',p:'',go:()=>{reset();ask()}}];
 S.used=[];steps.forEach(x=>{if(x.task)x.onPredict=()=>S.want()});
 const QZ={stuck:['You do not know how to play. What do you do?','🎲',[['Ask "How do we play?"','ok'],['Guess and hope','guess'],['Walk away','quit']]],
  kind:['You did not hear. How do you ask kindly?','🙂',[['"Can you say it again, please?"','ok'],['"WHAT?"','rude'],['Say nothing','quiet']]],
  fit:['"Where is your hat?" Which answer fits?','🧢',[['On the peg','ok'],['I like red','off'],['Somewhere','vague']]],
  lots:['Mia asks lots of questions. Is that OK?','🙋',[['Yes, asking helps her learn','ok'],['No, it is silly','silly'],['No, she should know it all','know']]],
  clue:['What is in the bag? Which question helps?','👜',[['Is it soft?','ok'],['Is it my birthday?','off'],['No question, just guess','guess']]],
  helpq:['The lid is stuck. Which question gets help?','🫙',[['Can you help me open it, please?','ok'],['Open it now!','rude'],['I like jam','off']]]};
 let qn=-1,stars=0;
 function ask(){qn++;const K=Object.keys(QZ),k=K[qn%K.length],rot=qn%3,[q,big,ops]=QZ[k];S.Q={big};
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const r=chal.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},r,o);b.onclick=()=>mark(tag)});say('Challenge: '+q);A.redraw()}
 function mark(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Yes!';break;
   case 'guess':m='A guess can be wrong. A question finds out for sure.';break;
   case 'quit':m='No need to walk away. Ask, and you can join in.';break;
   case 'rude':m='That sounds cross. Use kind words, like please.';break;
   case 'quiet':m='Saying nothing keeps you stuck. Ask to hear it again.';break;
   case 'off':m='That is about something else. Stick to what was asked.';break;
   case 'vague':m='Somewhere is too fuzzy. Say just where.';break;
   case 'silly':m='Questions are not silly. They help you learn.';break;
   default:m='Nobody knows it all. Asking is how we learn more.'}
  const ok=tag==='ok';if(ok){stars++;A.win()}else{stars=0;A.sound.miss()}fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Stars: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 function down(p){const v=mode();S.p0=p;S.dp=null;S.hold=null;
  if(v==='box'){if(!S.asked){const r0=twoBtn(0),r1=twoBtn(1);r0.y=r1.y=A.H*.24;if(inR(p,r0))return guess(),false;if(inR(p,r1))return askBox(),false}
   const B=block();if(S.put!==GOAL&&hy(p.x-B.x,p.y-B.y)<B.r*1.6){S.hold=0;return true}const i=BOX.findIndex((b,i)=>inR(p,boxR(i)));if(i>=0)drop(i);return false}
  if(v==='mystery'){const i=MYS.findIndex((m,i)=>inR(p,qR(i)));if(i>=0)askM(i);return false}
  if(v==='answer'&&S.aok<3){const j=[0,1,2].find(j=>inR(p,row(j)));if(j!=null){S.hold=j;return true}return false}
  if(v==='again'&&S.gok<2&&!S.clear){const j=[0,1,2].find(j=>inR(p,row(j)));if(j!=null)polite(j);return false}
  if(v==='help'&&S.hok<3){const j=HQ_X.findIndex((k,j)=>{if(S.used.includes(k))return false;const R=row(j);R.y+=A.H*.06;return inR(p,R)});if(j>=0){S.hold=HQ_X[j];return true}}return false}
 function up(p){const v=mode(),k=S.hold,far=S.p0&&hy(p.x-S.p0.x,p.y-S.p0.y)>12;S.hold=null;S.dp=null;if(k==null)return A.redraw();
  if(v==='box'){const i=BOX.findIndex((b,i)=>inR(p,boxR(i)));if(i>=0)drop(i);else A.redraw()}
  else if(v==='answer'){if(!far||p.y<A.H*.36)answer(k);else A.redraw()}
  else if(v==='help'){if(!far||p.y<A.H*.27+mouth().h+16)give(k);else A.redraw()}}
 A=FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:A=>{chal.hidden=A.step!==5;read.hidden=A.step===5;pad.hidden=A.step===5;sync()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
   A.gest({down,move:p=>{S.dp=p;A.redraw()},up});sync()}});
 A.start()})})();
