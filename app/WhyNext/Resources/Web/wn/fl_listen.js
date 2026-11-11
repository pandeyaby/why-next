/* Flagship 68 – listening and responding (ages 4–6): wait, then pass the talking ball; fix Pip's listening body; match
   every word to a picture; pick a reply that fits; hand up and wait. */
(()=>{const mn=Math.min,mx=Math.max,hy=Math.hypot,PI=Math.PI;
 const KIDS=[['Mia','#f472b6'],['Leo','#60a5fa'],['Ava','#facc15'],['Pip','#4ade80']];
 const TALK=[[0,'I saw a big red bus today!',2],[2,'My cat likes to sleep in a box.',1],[1,'We made a sandcastle at the beach.',3]];
 const PARTS=[['Look','Look at Gran','Looks away'],['Quiet','Quiet mouth','Talking'],['Still','Still hands','Plays with a car'],['Face','Face Gran','Back to Gran']];
 const GRAN='I hid a sweet in the blue box.';
 const HEAR=[['Get the red cup.',[['cup','#ef4444'],['cup','#3b82f6','That cup is blue. Gran said red.'],['hat','#ef4444','That is a hat. Gran said cup.']]],
  ['The cat is under the bed.',[['cat','under'],['cat','on','The cat is on the bed. Gran said under.'],['dog','under','That is a dog. Gran said cat.']]],
  ['Find two big balls.',[['ball',2,'big'],['ball',1,'big','That is one ball. Gran said two.'],['ball',2,'small','Those balls are small. Gran said big.']]]];
 const REP=[['Ava','I got a new puppy!',[['What is its name?',1],['I like cake.',0,'Cake is not about the puppy. Talk about what Ava said.'],['Look at me!',0,'That is about you. Ava was telling you her news.']]],
  ['Leo','I fell over and hurt my knee.',[['Ha ha!',0,'Laughing hurts. Leo is sad.'],['Oh no! Are you OK?',1],['I have a bike.',0,'A bike is not about Leo\'s knee.']]],
  ['Mia','Do you want to play ball?',[['My shoes are red.',0,'Mia asked a question. Answer it.'],['(Walk away)',0,'Mia asked you. Give an answer.'],['Yes please!',1]]]];
 const O=[[1,0,2],[2,1,0],[0,2,1]],ASK=[['Who can name an animal?','A dog!'],['What colour is the sky?','Blue!']];
VIS.reg('flaglisten',c=>{let A,pad,chal,read;c.fig.classList.add('young');
 const S={ball:0,turn:0,talk:0,talking:false,good:[0,0,0,0],hq:0,hok:0,rq:0,rok:0,aq:0,hand:0,asked:false,aok:0,
  bad:null,drag:false,dp:null,p0:null,want:()=>{},run:0,last:'',Q:null,glow:0,wob:0};
 const say=t=>{S.last=t;c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(read)read.textContent=t}};
 const view=()=>['turn','body','hear','reply','hand','quiz'][A.step];
 const al=(...a)=>A.alpha(...a),rr=(...a)=>A.paint.rrect(...a);
 const font=(x,w,z,a)=>{x.font=`${w} ${z}px system-ui,sans-serif`;x.textAlign=a||'center';x.textBaseline='middle'};
 const wrap=(x,t,X,Y,w,lh)=>{const L=[];let cur='';t.split(' ').forEach(s=>{const k=cur?cur+' '+s:s;if(x.measureText(k).width>w&&cur){L.push(cur);cur=s}else cur=k});L.push(cur);L.forEach((l,j)=>x.fillText(l,X,Y+(j-(L.length-1)/2)*lh))};
 const seat=i=>{const r=mn(A.W,A.H)*.09,cx=A.W/2,cy=A.H*.58,dx=A.W*.3,dy=A.H*.24;return{x:cx+[-1,1,1,-1][i]*dx,y:cy+[-1,-1,1,1][i]*dy,r}};
 const tile=i=>{const g=10,w=(A.W-4*g)/3,h=mn(w*1.05,A.H*.55);return{x:g+i*(w+g),y:A.H-h-12,w,h}};
 const bub=i=>{const y0=A.H*.36,h=(A.H-y0-12)/3-8;return{x:12,y:y0+i*(h+8),w:A.W-24,h}};
 const partBox=i=>{const w=(A.W-30)/2,h=mn(52,A.H*.12);return{x:10+(i%2)*(w+10),y:A.H-2*(h+8)-4+Math.floor(i/2)*(h+8),w,h}};
 const box=(x,R,c,a,lw)=>{x.fillStyle=al(c,a);rr(R.x,R.y,R.w,R.h,13);x.fill();x.strokeStyle=c;x.lineWidth=lw;x.stroke()},miss=t=>{A.sound.miss();say(t);A.redraw()},dot=(x,X,Y,r)=>{x.beginPath();x.arc(X,Y,r,0,7);x.fill()},N=z=>A.narrow?z:z+2,fin2=(x,t)=>{font(x,800,A.narrow?18:22);x.fillStyle=A.col.gr;wrap(x,t,A.W/2,A.H/2,A.W-40,28)},who=p=>KIDS.findIndex((k,i)=>{const s=seat(i);return hy(p.x-s.x,p.y-s.y-s.r*.4)<s.r*1.35}),inR=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
 // ---- drawing ----
 function kid(x,X,Y,r,col,o={}){const C=A.col;x.fillStyle=col;x.beginPath();x.arc(X,Y+r*1.25,r*.85,PI,0);x.fill();
  x.fillStyle=o.back?'#92400e':'#fde68a';dot(x,X,Y,r*.62);if(o.back)return;x.fillStyle='#1f2937';const lx=o.away?-r*.18:0;
  [-1,1].forEach(s=>{dot(x,X+s*r*.22+lx,Y-r*.08,r*.07)});x.strokeStyle='#1f2937';x.lineWidth=2;x.beginPath();
  if(o.talk)x.ellipse(X,Y+r*.25,r*.14,r*.1+r*.06*Math.abs(Math.sin(o.talk*20)),0,0,7);else x.arc(X,Y+r*.18,r*.2,.2*PI,.8*PI);x.stroke();
  if(o.hand){x.strokeStyle=col;x.lineWidth=r*.22;x.lineCap='round';x.beginPath();x.moveTo(X+r*.6,Y+r*.8);x.lineTo(X+r*.95,Y-r*.7);x.stroke();x.lineCap='butt';
   x.fillStyle='#fde68a';dot(x,X+r*.98,Y-r*.82,r*.16)}
  if(o.name){font(x,800,N(13));x.fillStyle=C.tx;x.fillText(o.name,X,Y+r*1.55)}}
 function speech(x,X,Y,w,t,shown){const C=A.col;font(x,700,N(14));const h=46;x.fillStyle=C.dark?'#1e293b':'#fff';x.strokeStyle=C.vi;x.lineWidth=2;
  const bx=mx(6,mn(A.W-w-6,X-w/2));rr(bx,Y-h,w,h,14);x.fill();x.stroke();x.fillStyle=C.tx;const words=t.split(' '),n=Math.ceil(words.length*shown);
  wrap(x,words.slice(0,n).join(' ')+(n<words.length?' …':''),bx+w/2,Y-h/2,w-16,17)}
 function ball(x,X,Y,r){x.fillStyle='#f59e0b';dot(x,X,Y,r);x.strokeStyle='#92400e';x.lineWidth=2;x.stroke();font(x,900,r*1.1);x.fillStyle='#fff';x.fillText('★',X,Y+1)}
 function turnView(x){const C=A.col,t=TALK[S.turn];x.fillStyle=al(C.am,.2);x.beginPath();x.ellipse(A.W/2,A.H*.58,A.W*.38,A.H*.32,0,0,7);x.fill();
  KIDS.forEach((k,i)=>{const s=seat(i),done=S.turn>=3;kid(x,s.x,s.y,s.r,k[1],{name:k[0],talk:!done&&i===t[0]&&S.talking?S.wob+.1:0,hand:!done&&!S.talking&&i===t[2]});
   if(S.bad===i){x.strokeStyle=C.rd;x.lineWidth=4;x.beginPath();x.arc(s.x,s.y+s.r*.4,s.r*1.3,0,7);x.stroke()}});
  if(S.turn<3){speech(x,A.W/2,A.H*.2,mn(A.W-20,380),`${KIDS[t[0]][0]}: ${t[1]}`,S.talk);font(x,800,13);x.fillStyle=S.talking?C.am:C.gr;x.fillText(S.talking?'Still talking…':'Finished!',A.W/2,A.H*.24)}
  else{font(x,800,A.narrow?17:20);x.fillStyle=C.gr;x.fillText('Everyone had a turn!',A.W/2,A.H*.12)}
  const h=seat(S.ball),b=S.drag&&S.dp?S.dp:{x:h.x+h.r*.9,y:h.y+h.r*.9};ball(x,b.x,b.y,mn(22,h.r*.45))}
 function bodyView(x){const C=A.col,g=S.good,n=g.reduce((a,b)=>a+b,0),r=mn(A.W,A.H)*.13,X=A.W*.3,Y=A.H*.3,GX=A.W*.75;
  kid(x,GX,Y,r*.9,'#a78bfa',{name:'Gran',talk:.3});x.globalAlpha=.3+.7*n/4;speech(x,GX-20,Y-r*.85,mn(A.W*.5,240),GRAN.split(' ').map((s,i)=>i%4<n||n>3?s:'…').join(' '),1);x.globalAlpha=1;
  kid(x,X,Y,r,'#4ade80',{back:!g[3],away:!g[0],talk:g[1]?0:.2});font(x,800,N(13));x.fillStyle=C.tx;x.fillText('Pip',X,Y+r*1.55);
  if(!g[2]){x.fillStyle='#ef4444';rr(X-r*1.3+Math.sin(S.wob*12)*4,Y+r*1.05,r*.6,r*.3,6);x.fill()}
  if(!g[1]){font(x,700,13);x.fillStyle=C.rd;x.fillText('blah blah',X-r*.2,Y-r*.95)}
  font(x,800,N(13));x.fillStyle=n===4?C.gr:C.mu;x.fillText(`Pip hears ${n===4?'every word!':n+' of 4 parts'}`,A.W/2,A.H*.62);
  PARTS.forEach((p,i)=>{const b=partBox(i),ok=g[i];box(x,b,ok?C.gr:C.rd,.15,2);
   font(x,700,N(13));x.fillStyle=C.tx;x.fillText((ok?'✓ ':'✗ ')+(ok?p[1]:p[2]),b.x+b.w/2,b.y+b.h/2)})}
 function pic(x,R,P){const C=A.col,cx=R.x+R.w/2,cy=R.y+R.h*.5,s=mn(R.w,R.h)*.22;
  if(P[0]==='cup'){x.fillStyle=P[1];x.beginPath();x.moveTo(cx-s,cy-s);x.lineTo(cx+s,cy-s);x.lineTo(cx+s*.7,cy+s);x.lineTo(cx-s*.7,cy+s);x.closePath();x.fill();x.strokeStyle=P[1];x.lineWidth=s*.22;x.beginPath();x.arc(cx+s*1.05,cy-s*.1,s*.4,-PI/2,PI/2);x.stroke()}
  else if(P[0]==='hat'){x.fillStyle=P[1];x.beginPath();x.arc(cx,cy+s*.3,s*.85,PI,0);x.fill();rr(cx-s*1.4,cy+s*.25,s*2.8,s*.35,4);x.fill()}
  else if(P[0]==='ball'){const big=P[2]==='big',r=s*(big?.62:.32);for(let k=0;k<P[1];k++){const bx=cx+(P[1]>1?(k?1:-1)*s*.7:0);x.fillStyle=k?'#3b82f6':'#f97316';dot(x,bx,cy+s-r,r)}}
  else{const bedY=cy+s*.2;x.fillStyle=C.dark?'#94a3b8':'#a16207';rr(cx-s*1.6,bedY,s*3.2,s*.45,5);x.fill();x.fillRect(cx-s*1.55,bedY,s*.2,s*1.1);x.fillRect(cx+s*1.35,bedY,s*.2,s*1.1);x.fillRect(cx-s*1.55,bedY-s*.6,s*.2,s*.7);
   const ay=P[1]==='on'?bedY-s*.45:bedY+s*.8,dog=P[0]==='dog';x.fillStyle=dog?'#92400e':'#64748b';dot(x,cx,ay,s*.42);
   if(dog){x.beginPath();x.ellipse(cx-s*.42,ay+s*.1,s*.14,s*.3,0,0,7);x.ellipse(cx+s*.42,ay+s*.1,s*.14,s*.3,0,0,7);x.fill()}
   else{x.beginPath();x.moveTo(cx-s*.38,ay-s*.15);x.lineTo(cx-s*.3,ay-s*.6);x.lineTo(cx-s*.08,ay-s*.38);x.moveTo(cx+s*.38,ay-s*.15);x.lineTo(cx+s*.3,ay-s*.6);x.lineTo(cx+s*.08,ay-s*.38);x.fill()}
   x.fillStyle='#fff';[-1,1].forEach(k=>{dot(x,cx+k*s*.15,ay-s*.05,s*.07)})}}
 function hearView(x){const C=A.col;if(S.hok>=3)return fin2(x,'You listened to every word!');
  const H=HEAR[S.hq],r=mn(A.W,A.H)*.08;kid(x,A.W*.15,A.H*.14,r,'#a78bfa',{talk:.3});speech(x,A.W*.6,A.H*.2,mn(A.W*.66,320),'Gran: '+H[0],1);
  H[1].forEach((P,i)=>{const R=tile(O[S.hq].indexOf(i)),b=S.bad===i;box(x,R,b?C.rd:C.cy,.12,b?4:2);pic(x,R,P)})}
 function replyView(x){const C=A.col;if(S.rok>=3)return fin2(x,'Your answers fit what your friends said!');
  const R=REP[S.rq],k=KIDS.find(k=>k[0]===R[0]),r=mn(A.W,A.H)*.08;kid(x,A.W*.15,A.H*.15,r,k[1],{talk:.3});speech(x,A.W*.6,A.H*.22,mn(A.W*.66,320),`${R[0]}: ${R[1]}`,1);
  R[2].forEach((o,i)=>{const B=bub(i),b=S.bad===i;box(x,B,b?C.rd:C.vi,.14,2);font(x,700,N(15));x.fillStyle=C.tx;x.fillText(o[0],A.W/2,B.y+B.h/2)})}
 function handView(x){const C=A.col,r=mn(A.W,A.H)*.12,Q=ASK[mn(S.aq,1)];if(S.aok>=2)return fin2(x,'Hand up, wait, then talk. Well done!');
  kid(x,A.W*.75,A.H*.3,r,'#a78bfa',{name:'Teacher',talk:.3});speech(x,A.W*.55,A.H*.12,mn(A.W*.7,320),Q[0],1);
  kid(x,A.W*.28,A.H*.55,r,'#4ade80',{name:'Pip',hand:S.hand});
  font(x,800,N(14));x.fillStyle=S.asked?C.gr:C.mu;x.fillText(S.asked?'Teacher: "Yes, Pip?"':S.hand?'Waiting…':'Hand down',A.W*.28,A.H*.88)}
 function draw(A){const{ctx:x,W,H,col:C}=A,v=view();x.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.04:.35);x.fillRect(0,0,W,H);
  const f={turn:turnView,body:bodyView,hear:hearView,reply:replyView,hand:handView}[v];if(f)f(x);else{font(x,900,mn(W,H)*.14);x.fillStyle=al(C.vi,.5);x.fillText(S.Q?S.Q.big:'👂',W/2,H/2)}
  if(S.glow>0){x.strokeStyle=al(C.gr,S.glow);x.lineWidth=6;x.strokeRect(3,3,W-6,H-6)}A.fx.draw(x)}
 // ---- actions ----
 const fresh=()=>{S.run++;S.want=()=>{};S.Q=null;S.drag=false;S.bad=null};
 const glow=()=>{S.glow=1;A.tween(S,{glow:0},900,'out')};
 function startTalk(){if(S.turn>=3)return;const r=S.run,t=TALK[S.turn];S.ball=t[0];S.talking=true;S.talk=.15;S.wob=0;A.tween(S,{wob:1},1400,'io');
  A.tween(S,{talk:1},1400,'io',()=>{if(r!==S.run)return;S.talking=false;status()});status()}
 const finishTalk=()=>{S.talking=false;S.talk=1;status()};
 function pass(i){if(S.turn>=3)return;const t=TALK[S.turn];
  if(S.talking){S.bad=t[0];return miss(`Wait! ${KIDS[t[0]][0]} is still talking. Let ${KIDS[t[0]][0]} finish.`)}
  if(i===t[0])return A.redraw();
  if(i!==t[2]){S.bad=i;return miss(`${KIDS[i][0]}'s hand is down. Give the ball to the hand that is up.`)}
  S.bad=null;S.ball=i;S.turn++;A.sound.pop();if(S.turn===3){glow();status();S.want()}else{say(`Good waiting! ${KIDS[i][0]} has the ball now.`);sync();startTalk()}}
 function part(i){if(S.good[i])return;S.good[i]=1;A.sound.pop();const n=S.good.reduce((a,b)=>a+b,0);if(n===4)glow();status()}
 function hear(i){if(S.hok>=3)return;const P=HEAR[S.hq][1][i];if(i){S.bad=i;return miss(P[P.length-1]+' Listen to every word.')}
  S.bad=null;S.hok++;S.hq=mn(2,S.hok);A.sound.pop();if(S.hok===3)glow();status()}
 function reply(i){if(S.rok>=3)return;const o=REP[S.rq][2][i];if(!o[1]){S.bad=i;return miss(o[2]+' Try another.')}
  S.bad=null;S.rok++;S.rq=mn(2,S.rok);A.sound.pop();if(S.rok===3)glow();status()}
 function handUp(){if(S.aok>=2||S.hand)return;S.hand=1;A.sound.tick();const r=S.run;status();setTimeout(()=>{if(r===S.run&&S.hand){S.asked=true;A.sound.step();status()}},A.reduced()?20:700)}
 function answer(){if(S.aok>=2)return;if(!S.asked){return miss(S.hand?'Wait until the teacher says your name.':'You called out! Hand up first, then wait.')}
  S.aok++;S.aq=S.aok;S.hand=0;S.asked=false;A.sound.pop();if(S.aok===2)glow();status()}
 function status(){const v=view();let t;
  if(v==='turn')t=S.turn>=3?'Everyone had a turn.':S.talking?`${KIDS[TALK[S.turn][0]][0]} is talking: "${TALK[S.turn][1]}" Wait.`:`${KIDS[TALK[S.turn][0]][0]} has finished. ${KIDS[TALK[S.turn][2]][0]}'s hand is up. Pass the ball.`;
  else if(v==='body'){const bad=PARTS.filter((p,i)=>!S.good[i]).map(p=>p[2]);t=bad.length?`Gran talks. Pip is: ${bad.join(', ')}. Tap to fix.`:`Pip is a good listener and hears it all: "${GRAN}"`}
  else if(v==='hear')t=S.hok<3?`Gran says: "${HEAR[S.hq][0]}" Tap the picture that matches.`:'All three match.';
  else if(v==='reply')t=S.rok<3?`${REP[S.rq][0]} says: "${REP[S.rq][1]}" Pick the answer that fits.`:'Three answers that fit.';
  else if(v==='hand')t=S.aok>=2?'Hand up and wait: done twice.':`Teacher asks: "${ASK[S.aq][0]}" `+(S.asked?'The teacher asked you. Answer now.':S.hand?'Hand up. Wait for your name.':'Put your hand up first.');
  else t='Challenge time.';say(t);sync();S.want()}
 function sync(){if(!A)return;if(A.step!==5)A.cv.setAttribute('aria-label',S.last);if(!pad)return A.redraw();pad.innerHTML='';const v=view();
  const B=(t,f,off,lab)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':lab||null},pad,t);e.disabled=!!off;e.onclick=f};
  if(v==='turn'&&S.turn<3)KIDS.forEach((k,i)=>{if(i!==S.ball)B('Ball to '+k[0],()=>pass(i))});
  if(v==='body')PARTS.forEach((p,i)=>B(p[1],()=>part(i),S.good[i]));
  if(v==='hear'&&S.hok<3)O[S.hq].forEach((i,j)=>B('Picture '+(j+1),()=>hear(i),0,`Picture ${j+1}: ${desc(HEAR[S.hq][1][i])}`));
  if(v==='reply'&&S.rok<3)REP[S.rq][2].forEach((o,i)=>B(o[0],()=>reply(i),0,'Say: '+o[0]));
  if(v==='hand'&&S.aok<2){B('✋ Hand up',handUp,S.hand);B('Say "'+ASK[S.aq][1]+'"',answer)}A.redraw()}
 const desc=P=>P[0]==='ball'?`${P[1]===2?'two':'one'} ${P[2]} ball${P[1]===2?'s':''}`:P[0]==='cup'||P[0]==='hat'?`${P[1]==='#ef4444'?'red':'blue'} ${P[0]}`:`${P[0]} ${P[1]} the bed`;
 const fin=(st,ok,msg)=>()=>{if(A.step===st&&ok()&&(!steps[st].predict||A.pred[st]!=null))A.done(msg()+A.reveal(st))};
 const seq=(fs,gap)=>{const r=S.run;fs.forEach((f,j)=>setTimeout(()=>{if(r===S.run)f()},A.reduced()?j*20:j*gap))};
 const resetTurn=()=>{S.turn=0;S.ball=0;startTalk()};
 const steps=[
  {h:'Wait for your turn',p:'Mia has the talking ball. Wait until she finishes. Then drag the ball to the friend with a hand up, or tap a button.',
   predict:{q:'Mia is talking. When can Leo talk?',opts:['Now, any time','When Mia stops'],ans:1},task:'Pass the ball three times, the right way',
   show:()=>{steps[0].go();seq(TALK.flatMap(t=>[finishTalk,()=>pass(t[2])]),350)},
   go:()=>{fresh();resetTurn();S.want=fin(0,()=>S.turn>=3,()=>'You waited for each friend to finish, then gave the turn to a raised hand.')}},
  {h:'A listening body',p:'Gran is talking. Tap each part of Pip to fix it. Watch Gran\'s words.',
   predict:{q:'Pip plays with a car and looks away. Will Pip hear all Gran says?',opts:['Yes, all of it','No, Pip misses some'],ans:1},task:'Make Pip a good listener',
   show:()=>{steps[1].go();seq([0,1,2,3].map(i=>()=>part(i)),300)},go:()=>{fresh();S.good=[0,0,0,0];status();S.want=fin(1,()=>S.good.every(Boolean),()=>'Look, quiet mouth, still hands, face Gran: now Pip hears every word.')}},
  {h:'Every word counts',p:'Read what Gran says. Tap the picture that matches every word.',
   task:'Match three things Gran says',show:()=>{steps[2].go();seq([0,1,2].map(()=>()=>hear(0)),350)},
   go:()=>{fresh();S.hok=0;S.hq=0;status();S.want=fin(2,()=>S.hok>=3,()=>'Red, under, two big: little words change the picture.')}},
  {h:'An answer that fits',p:'A friend tells you something. Tap the answer that fits what they said.',
   predict:{q:'Ava says "I got a puppy!" Leo says "I like cake." Did Leo listen?',opts:['Yes','No, it does not fit'],ans:1},task:'Pick three answers that fit',
   show:()=>{steps[3].go();seq([0,1,2].map(()=>()=>reply(REP[S.rq][2].findIndex(o=>o[1]))),350)},
   go:()=>{fresh();S.rok=0;S.rq=0;status();S.want=fin(3,()=>S.rok>=3,()=>'A good answer is about what your friend just said.')}},
  {h:'Hand up and wait',p:'The teacher asks the group. Put your hand up, wait to hear your name, then answer.',task:'Answer two questions the right way',
   show:()=>{steps[4].go();seq([handUp,answer,handUp,answer],800)},
   go:()=>{fresh();S.aok=0;S.aq=0;S.hand=0;S.asked=false;status();S.want=fin(4,()=>S.aok>=2,()=>'Hand up, wait, then talk. Now everyone gets a turn.')}},
  {h:'Challenge',p:'',go:()=>{fresh();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.want()});
 const QZ={wait:['Mia is talking. What do you do?','🤫',[['Listen and wait','ok'],['Talk too','over'],['Walk away','leave']]],
  show:['How do you show you are listening?','👀',[['Look at them','ok'],['Play with a toy','toy'],['Turn away','leave']]],
  fits:['Leo says "My dog is ill." What fits?','🐶',[['Oh no! Is he OK?','ok'],['I like trains.','off'],['Ha ha!','laugh']]],
  hand:['You know the answer at circle time. What do you do?','✋',[['Hand up and wait','ok'],['Shout it out','call'],['Grab the talking ball','grab']]],
  word:['Gran says "Get your blue coat." Which coat?','🧥',[['The blue coat','ok'],['The red coat','miss'],['Any coat','miss']]],
  again:['You did not hear what Gran said. What can you say?','❓',[['"Can you say it again?"','ok'],['Nod and guess','guess'],['Say nothing','leave']]]};
 let qi=-1,run=0;
 function ask(){qi++;const K=Object.keys(QZ),k=K[qi%K.length],rot=qi%3,[q,big,ops]=QZ[k];S.Q={big};
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(tag)});say('Challenge: '+q);A.redraw()}
 function judge(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Yes!';break;
   case 'over':m='If two talk at once, nobody hears. Wait until they stop.';break;
   case 'leave':m='Turning away says you are not listening.';break;
   case 'toy':m='A toy pulls your eyes and ears away. Keep hands still.';break;
   case 'off':m='Trains are not about the dog. Answer what Leo said.';break;
   case 'laugh':m='Laughing at sad news hurts. Say something kind.';break;
   case 'call':m='Shouting out takes a turn from others. Hand up and wait.';break;
   case 'grab':m='Wait for the ball to come to you.';break;
   case 'miss':m='Gran said blue. Listen to every word.';break;
   default:m='Guessing can go wrong. It is fine to ask again.'}
  const ok=tag==='ok';if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Stars: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;read.hidden=A.step===5;pad.hidden=A.step===5;sync()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
   A.gest({down:p=>{const v=view();S.dp=null;S.p0=p;
     if(v==='turn'&&S.turn<3){const h=seat(S.ball),bp={x:h.x+h.r*.9,y:h.y+h.r*.9};if(hy(p.x-bp.x,p.y-bp.y)<h.r*.8){S.drag=true;return true}
      const i=who(p);if(i>=0&&i!==S.ball)pass(i);return false}
     if(v==='body'){const i=[0,1,2,3].find(i=>inR(p,partBox(i)));if(i!=null)part(i);else if(p.y<A.H*.6&&p.x<A.W/2){const j=S.good.indexOf(0);if(j>=0)part(j)}return false}
     if(v==='hear'&&S.hok<3){const j=[0,1,2].find(i=>inR(p,tile(i)));if(j!=null)hear(O[S.hq][j]);return false}
     if(v==='reply'&&S.rok<3){const i=[0,1,2].find(i=>inR(p,bub(i)));if(i!=null)reply(i);return false}
     if(v==='hand'&&S.aok<2){if(p.x<A.W/2)handUp();else answer()}return false},
    move:p=>{S.dp=p;A.redraw()},
    up:p=>{const was=S.drag;S.drag=false;S.dp=null;if(!was)return;const i=who(p);if(i>=0&&i!==S.ball)pass(i);else A.redraw()}});
   sync()}});
 A.start()})})();
