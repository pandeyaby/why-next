/* Flagship – things I like and things I can do (ages 3–4, with a grown-up): sort foods into "I like" and "No thanks"
   (any answer is right, because likes belong to you), pick favourite toys and compare them with a friend's, sort jobs
   into "I can do it" and "Ask a grown-up", pour a drink by yourself up to a line, then make an "I like... but Pip
   likes... I can..." card. Every drag also works with buttons. */
(()=>{const lo=Math.min,hi=Math.max;
 const FOOD=[['🍎','apples'],['🥦','broccoli'],['🍌','bananas'],['🧀','cheese']];
 const TOY=[['🚗','cars'],['🧸','teddy'],['⚽','ball'],['🖍️','crayons'],['🧩','puzzles'],['🚂','trains']];
 const JOB=[['🧥','put on my coat',0,'You can push your arms in and pull it on.'],['🧼','wash my hands',0,'Soap, rub, rinse, dry. You can do that.'],
  ['💊','take medicine',1,'Medicine can make you ill if you take the wrong one. A grown-up gives it.'],['🧸','tidy my toys',0,'You can put toys back in the box.'],
  ['🛣️','cross the road',1,'Cars are fast and big. Hold a grown-up\'s hand.'],['🔥','use the oven',1,'The oven is very hot. A grown-up uses it.']];
 const LINE=.72;
VIS.reg('flaglike',c=>{let A,pad,chal,read;c.fig.classList.add('young');
 const S={food:{},toy:[],pip:null,job:{},ji:0,lvl:0,pour:0,spill:0,card:[null,null,null],slot:0,sel:null,drag:null,at:null,moved:0,gen:0,want:()=>{},note:''};
 const say=t=>{c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(read)read.textContent=t}};
 const view=()=>['food','toy','job','pour','card','quiz'][A.step];
 const fz=z=>A.narrow?z:z+3;
 const txt=(x,t,X,Y,z,k,w,al)=>{x.font=`${w||800} ${fz(z)}px system-ui,sans-serif`;x.textAlign=al||'center';x.textBaseline='middle';x.fillStyle=k;x.fillText(t,X,Y,A.W-16)};
 const emo=(x,e,X,Y,s)=>{x.font=`${s}px system-ui,"Apple Color Emoji","Segoe UI Emoji",sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillStyle=A.col.tx;x.fillText(e,X,Y)};
 const box=(x,X,Y,w,h,k,on)=>{const C=A.col;x.fillStyle=A.alpha(k,on?.28:.13);A.paint.rrect(X,Y,w,h,14);x.fill();x.strokeStyle=k;x.lineWidth=on?4:2;x.stroke()};
 const bins=()=>{const w=A.W*.44,y=A.H*.52;return[[A.W*.04,y,w,A.H*.44],[A.W*.52,y,w,A.H*.44]]};
 const binAt=p=>p.y>A.H*.48?(p.x>A.W/2?1:0):-1;
 // food
 const foodP=i=>[A.W*(i+1)/5,A.H*.22];
 function foodV(x){const C=A.col,B=bins(),s=lo(A.W*.12,A.H*.13);
  [['😋 I like',C.gr],['🙅 No thanks',C.am]].forEach(([t,k],b)=>{const[X,Y,w,h]=B[b];box(x,X,Y,w,h,k);txt(x,t,X+w/2,Y+A.H*.06,14,C.tx);
   const L=FOOD.filter(f=>S.food[f[1]]===b);L.forEach((f,j)=>emo(x,f[0],X+w*(j+1)/(L.length+1),Y+h*.62,s*.8))});
  FOOD.forEach((f,i)=>{if(S.food[f[1]]!=null)return;const[X,Y]=S.drag===i&&S.moved&&S.at?[S.at.x,S.at.y]:foodP(i);
   if(S.sel===i||S.drag===i){x.strokeStyle=C.tx;x.lineWidth=3;x.beginPath();x.arc(X,Y,s*.72,0,7);x.stroke()}emo(x,f[0],X,Y,s);txt(x,f[1],X,Y+s*.85,12,C.tx,700)});
  txt(x,S.note||'Do you like it? Drag it to a plate',A.W/2,A.H*.06,15,C.tx)}
 function putFood(i,b){const f=FOOD[i];if(!f||S.food[f[1]]!=null)return;S.sel=null;S.food[f[1]]=b;A.sound.pop();
  tell(b?`No thanks to ${f[1]}. That is OK to say.`:`You like ${f[1]}. Yum!`)}
 // toys
 const toyP=i=>[A.W*(.2+.3*(i%3)),A.H*(.3+.38*Math.floor(i/3))];
 function toyV(x){const C=A.col,s=lo(A.W*.13,A.H*.14),w=A.W*.27,h=A.H*.32;
  TOY.forEach((t,i)=>{const[X,Y]=toyP(i),me=S.toy.includes(i),pp=S.pip&&S.pip.includes(i);box(x,X-w/2,Y-h/2,w,h,me&&pp?C.gr:me?C.rd:pp?C.vi:C.mu,me||pp);
   emo(x,t[0],X,Y-h*.08,s);txt(x,t[1],X,Y+h*.3,12,C.tx,700);if(me)emo(x,'❤️',X-w*.34,Y-h*.36,fz(14));if(pp)txt(x,'Pip ★',X+w*.22,Y-h*.36,11,C.tx)});
  txt(x,S.note||(S.pip?'Same and different!':`Tap 3 toys you like (${S.toy.length}/3)`),A.W/2,A.H*.05,15,C.tx)}
 function tapToy(i){if(S.pip)return;const k=S.toy.indexOf(i);if(k>=0)S.toy.splice(k,1);else if(S.toy.length<3)S.toy.push(i);else return oops('You have 3 already. Tap one to take it off.');
  A.sound.tick();if(S.toy.length===3){const rest=TOY.map((t,j)=>j).filter(j=>!S.toy.includes(j));S.pip=[S.toy[0],rest[1],rest[2]];A.sound.pop();
   const both=TOY[S.pip[0]][1],o=S.pip.slice(1).map(j=>TOY[j][1]).join(' and ');return tell(`Pip likes ${TOY[S.pip[0]][1]}, ${o}. You both like ${both}! You like different things too.`)}
  tell(k>=0?`${TOY[i][1]} off.`:`You like ${TOY[i][1]}.`)}
 // jobs
 function jobV(x){const C=A.col,B=bins(),j=JOB[S.ji];
  [['💪 I can do it',C.gr],['🙋 Ask a grown-up',C.cy]].forEach(([t,k],b)=>{const[X,Y,w,h]=B[b];box(x,X,Y,w,h,k);txt(x,t,X+w/2,Y+A.H*.06,13,C.tx);
   const L=JOB.filter(q=>S.job[q[1]]===b);L.forEach((q,n)=>emo(x,q[0],X+w*(n%3+1)/4,Y+h*(.42+.3*Math.floor(n/3)),fz(24)))});
  if(j){const[X,Y]=S.drag!=null&&S.moved&&S.at?[S.at.x,S.at.y]:[A.W/2,A.H*.28],w=A.W*.5,h=A.H*.27;x.fillStyle=A.mix(C.pn,'#fff',C.dark?.08:.6);A.paint.shadow(8,3,.25);A.paint.rrect(X-w/2,Y-h/2,w,h,14);x.fill();A.paint.noShadow();
   x.strokeStyle=S.bad?C.rd:C.tx;x.lineWidth=S.drag!=null?4:2;x.stroke();emo(x,j[0],X,Y-h*.14,fz(34));txt(x,j[1],X,Y+h*.3,13,C.tx)}
  txt(x,S.note||(j?'Can you do it by yourself?':'All sorted! 🎉'),A.W/2,A.H*.05,15,C.tx)}
 function putJob(b){const j=JOB[S.ji];if(!j)return;if(b!==j[2]){S.bad=1;return oops(`Hmm. ${j[3]}`)}S.bad=0;S.job[j[1]]=b;S.ji++;A.sound.pop();
  tell(b?`Ask a grown-up to ${j[1]}. ${j[3]}`:`Yes! I can ${j[1]} by myself.`)}
 // pour
 const cupR=()=>({x:A.W*.66,y:A.H*.36,w:A.W*.22,h:A.H*.48});
 function pourV(x){const C=A.col,u=cupR(),tilt=S.pour?1:0,jx=A.W*.3,jy=A.H*.36;
  x.fillStyle=A.mix(C.pn,C.am,.25);x.fillRect(0,A.H*.86,A.W,A.H*.14);
  x.save();x.translate(jx,jy);x.rotate(tilt*.85);x.fillStyle=A.alpha(C.cy,.85);A.paint.rrect(-A.W*.1,-A.H*.13,A.W*.2,A.H*.3,10);x.fill();
  x.strokeStyle=C.tx;x.lineWidth=2.5;x.stroke();x.beginPath();x.arc(-A.W*.1,0,A.H*.07,Math.PI/2,Math.PI*1.5);x.stroke();x.restore();
  if(S.pour){x.strokeStyle=C.cy;x.lineWidth=6;x.beginPath();x.moveTo(jx+A.W*.13,jy+A.H*.05);x.quadraticCurveTo(u.x+u.w*.4,jy,u.x+u.w*.5,u.y+u.h*(1-S.lvl));x.stroke()}
  const fh=u.h*lo(S.lvl,1);x.fillStyle=A.alpha(C.cy,.7);x.fillRect(u.x,u.y+u.h-fh,u.w,fh);
  if(S.spill){x.fillStyle=A.alpha(C.cy,.6);x.beginPath();x.ellipse(u.x+u.w/2,A.H*.88,u.w*1.1,A.H*.03,0,0,7);x.fill()}
  x.strokeStyle=C.tx;x.lineWidth=3;x.beginPath();x.moveTo(u.x,u.y);x.lineTo(u.x,u.y+u.h);x.lineTo(u.x+u.w,u.y+u.h);x.lineTo(u.x+u.w,u.y);x.stroke();
  const ly=u.y+u.h*(1-LINE);x.setLineDash([6,4]);x.strokeStyle=C.rd;x.beginPath();x.moveTo(u.x-8,ly);x.lineTo(u.x+u.w+8,ly);x.stroke();x.setLineDash([]);
  txt(x,'line',u.x+u.w+12,ly,12,C.tx,700,'left');txt(x,S.note||'Hold the jug to pour. Stop at the line!',A.W/2,A.H*.06,15,C.tx)}
 function pourGo(){if(S.pour||S.spill)return;S.pour=1;A.sound.tick();const g=S.gen,t0=performance.now(),l0=S.lvl;
  const f=()=>{if(!S.pour||g!==S.gen)return;S.lvl=l0+(performance.now()-t0)/2600;if(S.lvl>LINE+.2){S.pour=0;return spill()}A.redraw();requestAnimationFrame(f)};requestAnimationFrame(f)}
 function pourStop(){if(!S.pour)return;S.pour=0;judge()}
 function judge(){const d=S.lvl-LINE;if(d>.07)return spill();A.redraw();
  if(d>=-.06){S.lvl=LINE;S.full=1;A.sound.pop();return tell('Stop! Right on the line. You poured it all by yourself.')}tell('Good start. Pour a bit more, up to the line.')}
 function spill(){S.spill=1;S.lvl=1;oops('Oops, too much! It spilled. Pour slowly and stop at the line.');const g=S.gen;setTimeout(()=>{if(g!==S.gen)return;S.spill=0;S.lvl=0;S.note='Try again. Slowly!';tell()},1600)}
 function pourStep(){if(S.spill||S.full)return;S.lvl+=.12;A.sound.tick();judge()}
 // card
 const likes=()=>{const L=FOOD.filter(f=>S.food[f[1]]===0).concat(S.toy.map(i=>TOY[i]));return(L.length?L:FOOD.slice(0,3)).slice(0,4)};
 const pips=()=>(S.pip||[5,2,4]).map(i=>TOY[i]);
 const cans=()=>JOB.filter(j=>!j[2]);
 const SLOT=[['I like',likes],['Pip likes',pips],['I can',cans]];
 function cardV(x){const C=A.col,X=A.W*.06,Y=A.H*.14,w=A.W*.88,h=A.H*.8;x.fillStyle=A.mix(C.pn,C.am,C.dark?.12:.18);A.paint.rrect(X,Y,w,h,18);x.fill();x.strokeStyle=C.am;x.lineWidth=3;x.stroke();
  SLOT.forEach(([lab],k)=>{const y=Y+h*(.2+.3*k),v=S.card[k];if(S.slot===k&&!full()){x.fillStyle=A.alpha(C.cy,.2);A.paint.rrect(X+8,y-h*.12,w-16,h*.24,10);x.fill()}
   txt(x,lab,X+18,y,16,C.tx,800,'left');if(v){emo(x,v[0],X+w*.62,y,fz(28));txt(x,v[1],X+w*.62,y+h*.1,12,C.tx,700)}else txt(x,'?',X+w*.62,y,20,C.mu)});
  txt(x,S.note||(full()?'Your card! 🎉':'Make your card'),A.W/2,A.H*.06,15,C.tx)}
 const full=()=>S.card.every(v=>v);
 function fill(k,v){S.card[k]=v;A.sound.pop();S.slot=S.card.findIndex(q=>!q);if(S.slot<0)S.slot=0;
  if(full()){const[a,b,cn]=S.card,same=a[1]===b[1];return tell(`${same?`We both like ${a[1]}`:`I like ${a[1]} but Pip likes ${b[1]}`}. I can ${cn[1]}.`)}tell(`${SLOT[k][0]} ${v[1]}.`)}
 function tell(msg){const v=view();let t;
  if(v==='food'){const L=FOOD.filter(f=>S.food[f[1]]===0).map(f=>f[1]),N=FOOD.filter(f=>S.food[f[1]]===1).map(f=>f[1]);t=`I like: ${L.join(', ')||'none yet'}. No thanks: ${N.join(', ')||'none yet'}.`}
  else if(v==='toy')t=`You picked: ${S.toy.map(i=>TOY[i][1]).join(', ')||'none yet'}.${S.pip?' Pip picked: '+S.pip.map(i=>TOY[i][1]).join(', ')+'.':''}`;
  else if(v==='job')t=JOB[S.ji]?`Next job: ${JOB[S.ji][1]}.`:'All jobs sorted.';
  else if(v==='pour')t=`The cup is ${S.full?'full to the line':S.lvl>0?'part full':'empty'}.`;
  else if(v==='card')t=`Card: ${SLOT.map(([l],k)=>l+' '+(S.card[k]?S.card[k][1]:'...')).join('. ')}.`;
  else t='Challenge time.';say((msg?msg+' ':'')+t);refresh();S.want()}
 const oops=t=>{A.sound.miss();S.note='';say(t);A.redraw()};
 function refresh(){if(!A||!pad)return;pad.innerHTML='';const v=view();
  const B=(t,f,al)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':al||null},pad,t);e.onclick=f};
  if(v==='food'){if(S.sel==null)FOOD.forEach((f,i)=>{if(S.food[f[1]]==null)B(f[0]+' '+f[1],()=>{S.sel=i;A.sound.tick();tell(`${f[1]} picked. Do you like it?`)},`Pick ${f[1]}`)});
   else{B('😋 I like it',()=>putFood(S.sel,0),'I like it');B('🙅 No thanks',()=>putFood(S.sel,1),'No thanks')}}
  if(v==='toy'&&!S.pip)TOY.forEach((t,i)=>B((S.toy.includes(i)?'❤️ ':'')+t[0]+' '+t[1],()=>tapToy(i),`${S.toy.includes(i)?'Take off':'I like'} ${t[1]}`));
  if(v==='job'&&JOB[S.ji]){B('💪 I can do it',()=>putJob(0),'I can do it myself');B('🙋 Ask a grown-up',()=>putJob(1),'Ask a grown-up')}
  if(v==='pour'&&!S.full)B('💧 Pour a little',pourStep,'Pour a little');
  if(v==='card'&&!full())SLOT[S.slot][1]().forEach(o=>B(o[0]+' '+o[1],()=>fill(S.slot,o),`${SLOT[S.slot][0]} ${o[1]}`));
  A.redraw()}
 function draw(A){const{ctx:x,W,H,col:C}=A,v=view();x.fillStyle=A.mix(C.pn,'#fde68a',C.dark?.05:.3);x.fillRect(0,0,W,H);
  if(v==='food')foodV(x);else if(v==='toy')toyV(x);else if(v==='job')jobV(x);else if(v==='pour')pourV(x);else if(v==='card')cardV(x);else emo(x,S.Q||'😊',W/2,H/2,H*.4);A.fx.draw(x)}
 const ok=(st,cond,msg)=>()=>{if(A.step===st&&cond()&&(!steps[st].predict||A.pred[st]!=null))A.done(msg()+A.reveal(st))};
 const seq=(fs,gap)=>{const g=S.gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===S.gen)f()},j*gap))};
 const clear=()=>{S.gen++;S.want=()=>{};S.drag=null;S.at=null;S.sel=null;S.note='';S.bad=0;S.pour=0};
 const steps=[
  {h:'Yum or no thanks?',p:'Look at each food. Do you like it? Put it on a plate. There is no wrong answer!',task:'Put all 4 foods on a plate',
   show:()=>{steps[0].go();seq(FOOD.map((f,i)=>()=>putFood(i,i===1?1:0)),500)},go:()=>{clear();S.food={};tell();S.want=ok(0,()=>FOOD.every(f=>S.food[f[1]]!=null),()=>'Your likes belong to you. Saying "No thanks" is OK too.')}},
  {h:'Me and Pip',p:'This is Pip. Tap 3 toys you like. Then see what Pip likes.',predict:{q:'Will Pip like all the same toys as you?',opts:['Yes, all the same','Some same, some different'],ans:1},
   task:'Pick 3 toys you like',show:()=>{steps[1].go();seq([0,3,4].map(i=>()=>tapToy(i)),500)},go:()=>{clear();S.toy=[];S.pip=null;tell();S.want=ok(1,()=>!!S.pip,()=>'Friends like some things the same and some things different. Both are fine.')}},
  {h:'I can do it!',p:'Some jobs you can do by yourself. Some need a grown-up to keep you safe.',predict:{q:'Crossing the road. Who helps?',opts:['I go on my own','I hold a grown-up\'s hand'],ans:1},
   task:'Sort all 6 jobs',show:()=>{steps[2].go();seq(JOB.map(j=>()=>putJob(j[2])),500)},go:()=>{clear();S.job={};S.ji=0;tell();S.want=ok(2,()=>S.ji>=JOB.length,()=>'You can do lots by yourself. Ask a grown-up when it is hot, fast or medicine.')}},
  {h:'Pour it myself',p:'Hold the jug to pour. Let go at the line. Or tap Pour a little.',predict:{q:'What happens if you keep pouring past the line?',opts:['It spills','It stops by itself'],ans:0},
   task:'Fill the cup to the line',show:()=>{steps[3].go();seq([0,1,2,3,4,5].map(()=>pourStep),450)},go:()=>{clear();S.lvl=0;S.full=0;S.spill=0;tell();S.want=ok(3,()=>!!S.full,()=>'Slow and steady, then stop. That is doing it by yourself.')}},
  {h:'My card',p:'Make a card about you. Pick a thing you like, a thing Pip likes, and a thing you can do.',task:'Fill in all 3 lines',
   show:()=>{steps[4].go();seq([0,1,2].map(k=>()=>fill(k,SLOT[k][1]()[k===1?1:0])),500)},go:()=>{clear();S.card=[null,null,null];S.slot=0;tell();S.want=ok(4,full,()=>'Now you can tell a friend what you like and what you can do.')}},
  {h:'Challenge',p:'',go:()=>{clear();quiz()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.want()});
 const QZ=[['Mia likes peas. Leo does not. Who is right?','🫛',[['They both are','ok'],['Only Mia','mia'],['Only Leo','leo']]],
  ['Which job can you do by yourself?','💪',[['Put on my shoes','ok'],['Cross a busy road','road'],['Use the oven','oven']]],
  ['You like dolls. Pip likes cars. What can you say?','🗣️',[['I like dolls but Pip likes cars.','ok'],['Pip is wrong.','wrong'],['I like cars.','copy']]],
  ['The cup is full to the line. What do you do?','🥛',[['Stop pouring','ok'],['Pour more','more'],['Shake the cup','shake']]],
  ['You cannot reach your coat. What can you do?','🧥',[['Ask a grown-up to help','ok'],['Climb the shelf','climb'],['Give up','give']]],
  ['Which one tells what you like?','❤️',[['I like trains.','ok'],['I am 4.','age'],['I can hop.','can']]]];
 let qn=-1,run=0;
 function quiz(){qn++;const[q,pic,ops]=QZ[qn%QZ.length],r=qn%3;S.Q=pic;
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>grade(tag)});say('Challenge: '+q);A.redraw()}
 function grade(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Yes!';break;
   case 'mia':m='Likes are not right or wrong. Mia likes peas and Leo does not. Both are OK.';break;
   case 'leo':m='Leo is not more right. People like different foods, and that is fine.';break;
   case 'road':m='Roads have fast cars. Hold a grown-up\'s hand to cross.';break;
   case 'oven':m='The oven is very hot. A grown-up uses it.';break;
   case 'wrong':m='Pip is not wrong. Pip just likes different things. Say "I like dolls but Pip likes cars."';break;
   case 'copy':m='That says what Pip likes, not you. You like dolls.';break;
   case 'more':m='Past the line it will spill. Stop at the line.';break;
   case 'shake':m='Shaking makes it spill. Stop pouring and pick it up slowly.';break;
   case 'climb':m='Climbing a shelf is not safe. Say "Can you help me, please?"';break;
   case 'give':m='Do not give up. Asking for help is a smart thing to do.';break;
   case 'age':m='That tells how old you are. "I like..." tells what you like.';break;
   default:m='That tells what you can do. "I like..." tells what you like.'}
  const good=tag==='ok';if(good){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${good?'✓':'✗'} ${m}${good?` Stars: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
 const near=(p,X,Y,d)=>Math.hypot(p.x-X,p.y-Y)<d;
 function down(p){const v=view();S.drag=null;S.at=null;S.moved=0;S.d0=p;
  if(v==='food'){const s=lo(A.W*.12,A.H*.13),i=FOOD.findIndex((f,i)=>S.food[f[1]]==null&&near(p,...foodP(i),s*.9));if(i>=0){S.drag=i;return true}
   if(S.sel!=null){const b=binAt(p);if(b>=0)putFood(S.sel,b)}return false}
  if(v==='toy'){const i=TOY.findIndex((t,i)=>{const[X,Y]=toyP(i);return Math.abs(p.x-X)<A.W*.14&&Math.abs(p.y-Y)<A.H*.17});if(i>=0)tapToy(i);return false}
  if(v==='job'){if(!JOB[S.ji])return false;if(Math.abs(p.x-A.W/2)<A.W*.27&&Math.abs(p.y-A.H*.28)<A.H*.16){S.drag=0;return true}const b=binAt(p);if(b>=0)putJob(b);return false}
  if(v==='pour'){if(S.full)return false;pourGo();return true}
  if(v==='card'){const k=[0,1,2].find(k=>Math.abs(p.y-A.H*(.14+.8*(.2+.3*k)))<A.H*.12);if(k!=null){S.slot=k;S.card[k]=null;A.sound.tick();tell(`Pick for: ${SLOT[k][0]}.`)}return false}return false}
 function move(p){if(S.drag==null)return;if(Math.hypot(p.x-S.d0.x,p.y-S.d0.y)>10)S.moved=1;S.at=p;A.redraw()}
 function up(p){const v=view();if(v==='pour')return pourStop();const i=S.drag;S.drag=null;if(i==null)return;const moved=S.moved;S.moved=0;S.at=null;
  if(v==='food'){if(!moved){S.sel=i;A.sound.tick();return tell(`${FOOD[i][1]} picked. Do you like it?`)}const b=binAt(p);if(b>=0)putFood(i,b);else A.redraw();return}
  if(v==='job'){const b=binAt(p);if(moved&&b>=0)putJob(b);else A.redraw()}}
 A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;read.hidden=A.step===5;pad.hidden=A.step===5;refresh()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
   A.gest({down,move,up});refresh()}});
 A.start()})})();
