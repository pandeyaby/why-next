/* Flagship 67 – feelings change and differ (5–7): fill Pip's day with faces and watch the mood line go up and down;
   pick how two children feel about the same thing from their clue cards; drag helpers onto Pip until the cross cloud
   clears; choose a kind reply when a friend feels differently; then plot your own day. Challenge: change, differ, kind. */
(()=>{const mn=Math.min,mx=Math.max,hy=Math.hypot,PI=Math.PI,FE=['happy','sad','cross','scared','calm'];
 const FC={happy:'#facc15',sad:'#60a5fa',cross:'#f87171',scared:'#c084fc',calm:'#4ade80'},VAL={happy:.92,calm:.68,scared:.32,sad:.14,cross:.22};
 const DAY=[['Wake up','It snowed in the night! Pip runs to the window.',['happy']],['Breakfast','Pip spills juice all over a new drawing.',['sad','cross']],
  ['Play','A big dog runs at Pip and barks.',['scared']],['Lunch','Gran comes to visit. A big hug!',['happy','calm']],['Bed','A warm bath and a story in bed.',['calm','happy']]];
 const MINE=['Wake up','School','Play','Tea','Bed'];
 const TW=[['A big dog runs up.',['Mia','Mia has a dog. She loves dogs.',['happy','calm']],['Leo','A dog jumped on Leo once.',['scared']]],
  ['Fireworks go BANG!',['Mia','Mia loves the bright lights.',['happy']],['Leo',"Loud bangs hurt Leo's ears.",['scared','cross','sad']]],
  ['It rains all day.',['Mia','Mia has new boots to splash in.',['happy']],['Leo',"Leo's football game is off.",['sad','cross']]]];
 const HELP=[['Tell a grown-up',1],['Hit my brother',0],['Hug my teddy',1],['Throw my toy',0],['Take slow breaths',1],['Draw how I feel',1]];
 const KS=[[['Leo','scared'],['Mia','happy'],'A big dog runs up. What can Mia say?',[["It's OK to be scared. Let's stand back.",1],["Don't be a baby!",0,'That makes fun of Leo. His feeling is real.'],['Dogs are not scary. You are wrong.',0,'Leo is not wrong. A dog jumped on him once.']]],
  [['Ava','sad'],['Ben','happy'],'Rain stops the picnic. Ben loves rain. What can Ben say?',[['Ha ha, no picnic!',0,"That laughs at Ava's sad feeling."],['Rain is fun. Stop being sad!',0,"You can't switch off a feeling. Ava needs time."],['I like rain, but I see you are sad. Play inside?',1]]],
  [['Tia','sad'],['Zak','happy'],'Zak won the race. Tia lost. What can Zak say?',[['I won, you lost!',0,'That makes Tia feel worse.'],['Good race, Tia. Want to run again?',1],["Why are you sad? It's only a race.",0,'It matters to Tia. Her feeling is real.']]]];
VIS.reg('flagmood',c=>{let A,pad,chal,read;c.fig.classList.add('young');
 const S={dd:[],tw:0,tk:0,td:[[],[],[]],cloud:3,used:[],kk:0,kd:[],my:[],drag:null,dp:null,p0:null,want:()=>{},run:0,last:'',Q:null,bad:null,glow:0,shake:0};
 const say=t=>{S.last=t;c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(read)read.textContent=t}};
 const view=()=>['day','two','pass','kind','mine','quiz'][A.step];
 const al=(...a)=>A.alpha(...a),rr=(...a)=>A.paint.rrect(...a);
 const font=(x,w,z,a)=>{x.font=`${w} ${z}px system-ui,sans-serif`;x.textAlign=a||'center';x.textBaseline='middle'};
 const lines=(x,t,X,Y,w,lh)=>{const L=[];let cur='';t.split(' ').forEach(s=>{const k=cur?cur+' '+s:s;if(x.measureText(k).width>w&&cur){L.push(cur);cur=s}else cur=k});L.push(cur);L.forEach((l,j)=>x.fillText(l,X,Y+(j-(L.length-1)/2)*lh))};
 const chg=a=>a.filter((k,i)=>i&&k!==a[i-1]).length;
 const chip=i=>{const r=mn(32,(A.W-24)/10.5),g=(A.W-10*r)/6;return{x:g+r+i*(2*r+g),y:A.H-r-10,r}};
 const card=i=>{const w=(A.W-30)/2,h=mn(48,A.H*.11),y0=A.H-3*(h+8)-4;return{x:10+(i%2)*(w+10),y:y0+Math.floor(i/2)*(h+8),w,h}};
 const bub=i=>{const y0=A.H*.4,h=(A.H-y0-12)/3-8;return{x:12,y:y0+i*(h+8),w:A.W-24,h}};
 const pip=()=>({x:A.W/2,y:A.H*.36,r:mn(A.W,A.H)*.1});
 const kidX=j=>A.W*(j?.73:.27);
 // ---- drawing ----
 function face(x,X,Y,r,k){const C=A.col;if(!k){x.fillStyle=al(C.mu,.15);x.beginPath();x.arc(X,Y,r,0,7);x.fill();x.strokeStyle=C.mu;x.lineWidth=2;x.setLineDash([5,4]);x.stroke();x.setLineDash([]);font(x,800,r);x.fillStyle=C.mu;x.fillText('?',X,Y+1);return}
  x.fillStyle=FC[k];x.beginPath();x.arc(X,Y,r,0,7);x.fill();x.strokeStyle=x.fillStyle='#1f2937';x.lineWidth=mx(2,r*.08);x.lineCap='round';const e=r*.35,ey=Y-r*.15;
  if(k==='calm'){[-1,1].forEach(s=>{x.beginPath();x.arc(X+s*e,ey,r*.12,0,PI);x.stroke()})}else[-1,1].forEach(s=>{x.beginPath();x.arc(X+s*e,ey,r*(k==='scared'?.13:.09),0,7);x.fill()});
  x.beginPath();if(k==='happy')x.arc(X,Y+r*.05,r*.45,.2*PI,.8*PI);else if(k==='calm')x.arc(X,Y+r*.12,r*.3,.25*PI,.75*PI);else if(k==='scared')x.ellipse(X,Y+r*.42,r*.14,r*.2,0,0,7);else x.arc(X,Y+r*.7,r*.36,1.2*PI,1.8*PI);x.stroke();
  if(k==='cross'||k==='scared')[-1,1].forEach(s=>{x.beginPath();x.moveTo(X+s*e*1.6,ey-r*(k==='cross'?.34:.3));x.lineTo(X+s*e*.45,ey-r*(k==='cross'?.16:.46));x.stroke()});
  if(k==='sad'){x.fillStyle='#1d4ed8';x.beginPath();x.ellipse(X+e,ey+r*.3,r*.07,r*.12,0,0,7);x.fill()}x.lineCap='butt'}
 function chips(x){const C=A.col;FE.forEach((k,i)=>{const p=chip(i),q=S.drag==='f'+i&&S.dp?S.dp:p;font(x,700,A.narrow?10:12);x.fillStyle=C.tx;x.fillText(k,p.x,p.y-p.r-8);
  if(S.bad===k){x.strokeStyle=C.rd;x.lineWidth=3;x.beginPath();x.arc(p.x,p.y,p.r+4,0,7);x.stroke()}face(x,q.x,q.y,p.r,k)})}
 function graph(x,arr,labels){const C=A.col,top=A.H*.36,bot=A.H*.68,n=5,X=i=>A.W*(i+.5)/n,Y=k=>k?bot-(bot-top)*VAL[k]:(top+bot)/2,r=mn(17,A.W/22),cur=arr.length;
  font(x,600,10,'left');x.fillStyle=C.mu;x.fillText('nice feelings',8,top-10);x.fillText('hard feelings',8,bot+4);
  x.strokeStyle=C.vi;x.lineWidth=3;x.beginPath();arr.forEach((k,i)=>i?x.lineTo(X(i),Y(k)):x.moveTo(X(i),Y(k)));x.stroke();
  for(let i=0;i<n;i++){const k=arr[i];face(x,X(i),Y(k),r,k);if(i===cur){x.strokeStyle=C.am;x.lineWidth=3;x.beginPath();x.arc(X(i),Y(k),r+5,0,7);x.stroke()}
   font(x,700,A.narrow?10:12);x.fillStyle=i===cur?C.am:C.tx;x.fillText(labels[i],X(i),bot+20)}}
 function topCard(x,a,b){const C=A.col;x.fillStyle=al(C.vi,.12);rr(10,8,A.W-20,A.H*.24,14);x.fill();font(x,800,A.narrow?13:15);x.fillStyle=C.am;x.fillText(a,A.W/2,24);
  font(x,700,A.narrow?16:19);x.fillStyle=C.tx;lines(x,b,A.W/2,8+A.H*.14,A.W-40,22)}
 function twoView(x){const C=A.col,T=TW[S.tw],d=S.td[S.tw],r=mn(36,A.W*.1),Y=A.H*.25;font(x,800,A.narrow?16:19);x.fillStyle=C.tx;x.fillText(T[0],A.W/2,A.H*.07);
  [0,1].forEach(j=>{const K=T[j+1],X=kidX(j),bw=A.W*.44;face(x,X,Y,r,d[j]);if(S.tk===j&&!d[j]){x.strokeStyle=C.am;x.lineWidth=4;x.beginPath();x.arc(X,Y,r+6,0,7);x.stroke()}
   font(x,800,16);x.fillStyle=C.tx;x.fillText(K[0],X,Y+r+16);x.fillStyle=al(j?C.cy:C.vi,.15);rr(X-bw/2,Y+r+30,bw,A.H*.19,10);x.fill();font(x,600,A.narrow?12:14);x.fillStyle=C.tx;lines(x,K[1],X,Y+r+30+A.H*.095,bw-14,17)})}
 function passView(x){const C=A.col,P=pip(),s=S.cloud/3,cy=A.H*.13;
  if(S.cloud<=0){x.fillStyle='#facc15';x.beginPath();x.arc(P.x+P.r*1.8,cy,P.r*.55,0,7);x.fill()}
  else{x.fillStyle=A.mix('#cbd5e1','#475569',mn(1,s));[[-1,.1,.6],[0,-.3,.75],[1,.1,.6]].forEach(([a,b,k])=>{x.beginPath();x.arc(P.x+a*P.r*1.1*s,cy+b*P.r*s,k*P.r*(.45+.5*s),0,7);x.fill()});
   if(S.cloud>=3){x.strokeStyle='#60a5fa';x.lineWidth=2;for(let i=-2;i<=2;i++){x.beginPath();x.moveTo(P.x+i*P.r*.45,cy+P.r*.6);x.lineTo(P.x+i*P.r*.45-4,cy+P.r*.95);x.stroke()}}}
  face(x,P.x+(S.shake?Math.sin(S.shake*30)*6:0),P.y,P.r,S.cloud>=2?'cross':S.cloud===1?'calm':'happy');font(x,700,13);x.fillStyle=C.tx;x.fillText('Pip',P.x,P.y+P.r+14);
  HELP.forEach((h,i)=>{const b=card(i),R=S.drag===i&&S.dp?{...b,x:S.dp.x-b.w/2,y:S.dp.y-b.h/2}:b,u=S.used.includes(i);x.fillStyle=al(u?C.mu:C.vi,u?.1:.15);rr(R.x,R.y,R.w,R.h,12);x.fill();
   x.strokeStyle=u?al(C.mu,.4):C.vi;x.lineWidth=2;x.stroke();font(x,700,A.narrow?13:15);x.fillStyle=u?C.mu:C.tx;x.fillText((u?'✓ ':'')+h[0],R.x+R.w/2,R.y+R.h/2)})}
 function kindView(x){const C=A.col,K=KS[S.kk],r=mn(26,A.W*.075);
  if(S.kd.length>=3){font(x,800,A.narrow?18:22);x.fillStyle=C.tx;lines(x,'Kind words help when friends feel different things.',A.W/2,A.H/2,A.W-40,28);return}
  [K[0],K[1]].forEach((p,j)=>{const X=A.W*(j?.68:.32);face(x,X,A.H*.1,r,p[1]);font(x,700,14);x.fillStyle=C.tx;x.fillText(`${p[0]}: ${p[1]}`,X,A.H*.1+r+14)});
  font(x,700,A.narrow?14:16);x.fillStyle=C.tx;lines(x,K[2],A.W/2,A.H*.31,A.W-24,19);
  K[3].forEach((o,i)=>{const R=bub(i),b=S.bad===i;x.fillStyle=al(b?C.rd:C.cy,b?.18:.12);rr(R.x,R.y,R.w,R.h,14);x.fill();x.strokeStyle=b?C.rd:C.cy;x.lineWidth=2;x.stroke();
   font(x,600,A.narrow?14:16);x.fillStyle=C.tx;lines(x,`"${o[0]}"`,A.W/2,R.y+R.h/2,R.w-20,18)})}
 function draw(A){const{ctx:x,W,H,col:C}=A,v=view();x.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.04:.35);x.fillRect(0,0,W,H);
  if(v==='day'){const i=S.dd.length;i<5?topCard(x,DAY[i][0],DAY[i][1]):topCard(x,"Pip's day",'Up and down! Feelings change.');graph(x,S.dd,DAY.map(d=>d[0]));chips(x)}
  else if(v==='two'){twoView(x);chips(x)}else if(v==='pass')passView(x);else if(v==='kind')kindView(x);
  else if(v==='mine'){topCard(x,'Your day',S.my.length<5?`${MINE[S.my.length]}: how did you feel?`:`Your feelings changed ${chg(S.my)} times.`);graph(x,S.my,MINE);chips(x)}
  else{font(x,900,mn(W,H)*.14);x.fillStyle=al(C.vi,.5);x.fillText(S.Q?S.Q.big:'?',W/2,H/2)}
  if(S.glow>0){x.strokeStyle=al(C.gr,S.glow);x.lineWidth=6;x.strokeRect(3,3,W-6,H-6)}A.fx.draw(x)}
 // ---- actions ----
 function status(){const v=view();let t;
  if(v==='day')t=S.dd.length<5?`${DAY[S.dd.length][0]}: ${DAY[S.dd.length][1]} How does Pip feel? ${S.dd.length} of 5 done.`:`Pip's day: ${S.dd.join(', ')}. Pip's feelings changed ${chg(S.dd)} times.`;
  else if(v==='two'){const T=TW[S.tw];t=`${T[0]} ${T[1][1]} ${T[2][1]} How does each child feel?`}
  else if(v==='pass')t=S.cloud>0?`Pip feels cross. The cloud is size ${S.cloud}. Drag something that helps onto Pip.`:'The cloud has gone. The cross feeling passed, and Pip feels happy again.';
  else if(v==='kind'){const K=KS[S.kk];t=S.kd.length<3?`${K[0][0]} feels ${K[0][1]}. ${K[1][0]} feels ${K[1][1]}. ${K[2]}`:'Three kind replies. Different feelings are OK.'}
  else if(v==='mine')t=S.my.length<5?`Your day. ${MINE[S.my.length]}: how did you feel?`:`Your day: ${S.my.join(', ')}. Your feelings changed ${chg(S.my)} times. That is normal.`;
  else t='Challenge time.';say(t);sync();S.want()}
 const fresh=()=>{S.run++;S.want=()=>{};S.Q=null;S.drag=null;S.bad=null};
 const glow=()=>{S.glow=1;A.tween(S,{glow:0},900,'out')};
 function dayPick(k){const i=S.dd.length;if(i>=5)return;const D=DAY[i];
  if(!D[2].includes(k)){S.bad=k;A.sound.miss();say(`${D[1]} Would Pip feel ${k}? Look at what happened.`);A.redraw();return}
  S.bad=null;S.dd.push(k);A.sound.pop();const p=S.dd[i-1];if(i===4)glow();say(p&&p!==k?`${D[0]}: ${k}. Pip felt ${p} before. The feeling changed!`:`${D[0]}: Pip feels ${k}.`);sync();S.want()}
 function twoPick(k,j){const T=TW[S.tw],d=S.td[S.tw];if(j==null)j=S.tk;if(d[j])j=1-j;if(d[j])return;const K=T[j+1];
  if(!K[2].includes(k)){S.bad=k;A.sound.miss();say(`${K[1]} Would ${K[0]} feel ${k}? Read the clue.`);A.redraw();return}
  S.bad=null;d[j]=k;S.tk=d[0]?1:0;A.sound.pop();const both=d[0]&&d[1];if(both&&S.td.every(e=>e[0]&&e[1]))glow();
  say(both?`${T[0]} Mia feels ${d[0]}. Leo feels ${d[1]}. Same thing, different feelings!`:`${K[0]} feels ${k}. ${K[1]}`);sync();S.want()}
 function twoNext(){if(S.tw<2&&S.td[S.tw][0]&&S.td[S.tw][1]){S.tw++;S.tk=0;status()}}
 function help(i){S.drag=null;if(S.cloud<=0||S.used.includes(i))return A.redraw();const h=HELP[i];
  if(!h[1]){S.cloud=mn(4,S.cloud+1);S.shake=1;A.tween(S,{shake:0},500,'out');A.sound.miss();say(`"${h[0]}" hurts someone. The cross cloud gets bigger, not smaller. Try a kind way.`);return}
  S.used.push(i);S.cloud--;A.sound.pop();if(!S.cloud)glow();status()}
 function kind(i){if(S.kd.length>=3)return;const o=KS[S.kk][3][i];if(!o[1]){S.bad=i;A.sound.miss();say(o[2]+' Try another.');A.redraw();return}
  S.bad=null;S.kd.push(S.kk);S.kk=mn(2,S.kd.length);A.sound.pop();if(S.kd.length===3)glow();say(`Kind! "${o[0]}"`+(S.kd.length<3?' Now the next friend.':' Different feelings are OK.'));sync();S.want()}
 function mine(k){if(S.my.length>=5)return;S.my.push(k);A.sound.tick();if(S.my.length===5)glow();status()}
 const pickF=k=>{const v=view();v==='day'?dayPick(k):v==='two'?twoPick(k):mine(k)};
 function sync(){if(!A)return;if(A.step!==5)A.cv.setAttribute('aria-label',S.last);if(!pad)return A.redraw();pad.innerHTML='';const v=view();
  const B=(t,f,off,lab)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':lab||null},pad,t);e.disabled=!!off;e.onclick=f};
  if(v==='day'||v==='two'||v==='mine')FE.forEach(k=>B(k,()=>pickF(k),0,v==='two'?`${k} for ${TW[S.tw][S.tk+1][0]}`:`Pick ${k}`));
  if(v==='two')B('Next thing',twoNext,!(S.tw<2&&S.td[S.tw][0]&&S.td[S.tw][1]));
  if(v==='mine')B('Start again',()=>{S.my=[];status()});
  if(v==='pass')HELP.forEach((h,i)=>B(h[0],()=>help(i),S.used.includes(i)||S.cloud<=0,`Try: ${h[0]}`));
  if(v==='kind'&&S.kd.length<3)KS[S.kk][3].forEach((o,i)=>B(o[0],()=>kind(i),0,`Say: ${o[0]}`));A.redraw()}
 const fin=(st,ok,msg)=>()=>{if(A.step===st&&ok()&&(!steps[st].predict||A.pred[st]!=null))A.done(msg()+A.reveal(st))};
 const seq=(fs,gap)=>{const r=S.run;fs.forEach((f,j)=>setTimeout(()=>{if(r===S.run)f()},A.reduced()?j*20:j*gap))};
 const twoAll=()=>S.td.every(e=>e[0]&&e[1]);
 const steps=[
  {h:'A day of feelings',p:"Pick how Pip feels at each time of day. Drag a face up, or tap it.",
   predict:{q:'Pip feels happy when Pip wakes up. Will Pip feel happy all day?',opts:['Yes, all day','No, feelings change'],ans:1},task:"Fill in all five times of Pip's day",
   show:()=>{S.dd=[];status();seq(DAY.map(D=>()=>dayPick(D[2][0])),300)},go:()=>{fresh();S.dd=[];status();S.want=fin(0,()=>S.dd.length===5,()=>'Happy, then sad, then scared, then happy, then calm. Feelings change all day.')}},
  {h:'Same thing, two feelings',p:'Read each clue. Drag a face to Mia or Leo, or tap a face.',
   predict:{q:'Mia and Leo see the same big dog. Will they feel the same?',opts:['Yes: same thing, same feeling','Not always'],ans:1},task:'Find both feelings for all three things',
   show:()=>{S.td=[[],[],[]];S.tw=0;S.tk=0;status();seq(TW.flatMap(T=>[()=>twoPick(T[1][2][0],0),()=>twoPick(T[2][2][0],1),twoNext]),280)},
   go:()=>{fresh();S.td=[[],[],[]];S.tw=0;S.tk=0;status();S.want=fin(1,twoAll,()=>'The same thing made Mia and Leo feel different things, because of what they like and what happened before.')}},
  {h:'Feelings pass',p:'Pip is cross. Drag something that helps onto Pip, or press a button.',
   predict:{q:'Pip is very cross. How long will it last?',opts:['For ever','It will pass'],ans:1},task:'Help the cross cloud go away',
   show:()=>{S.cloud=3;S.used=[];status();seq([0,2,4].map(i=>()=>help(i)),400)},go:()=>{fresh();S.cloud=3;S.used=[];status();S.want=fin(2,()=>S.cloud<=0,()=>'The cross feeling passed. Kind ways help it pass. Hitting makes it bigger.')}},
  {h:'Kind words',p:'Two friends feel different things. Tap the kind thing to say.',
   predict:{q:'Mia likes the dog. Leo is scared. Who has the wrong feeling?',opts:['Leo','Mia','Nobody'],ans:2},task:'Choose a kind reply for three friends',
   show:()=>{S.kd=[];S.kk=0;status();seq([0,1,2].map(()=>()=>kind(KS[S.kk][3].findIndex(o=>o[1]))),400)},go:()=>{fresh();S.kd=[];S.kk=0;status();S.want=fin(3,()=>S.kd.length===3,()=>'Nobody has the wrong feeling. You can say what you see and be kind.')}},
  {h:'Your day',p:'How did you feel today? Pick a face for each time and see your line.',go:()=>{fresh();S.my=[];status()}},
  {h:'Challenge',p:'',go:()=>{fresh();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.want()});
 const QZ={change:['Pip is cross at breakfast. How will Pip feel after lunch?','change',[['It can change','ok'],['Cross all day','stuck'],['Pip must hide it','hide']]],
  differ:['Sam and Ana see a clown. Sam laughs. Ana hides. Why?','different',[['They feel different things','ok'],['Ana is wrong','wrong'],['Sam is pretending','fake']]],
  kind:['Your friend is sad about the rain. You are happy. What can you say?','kind',[['I see you are sad. Want to play?','ok'],['Stop being sad!','stopit'],['Ha ha!','laugh']]],
  pass:['What happens to big feelings?','pass',[['They pass, like clouds','ok'],['They stay for ever','stuck'],['Only babies have them','baby']]],
  help:['You feel very cross. What helps?','help',[['Breathe and tell a grown-up','ok'],['Hit something','hit'],['Keep it secret for ever','hide']]],
  why:['Leo is scared of dogs. What could be the reason?','why?',[['A dog jumped on him once','ok'],['He is silly','wrong'],['Everyone is scared of dogs','all']]],
  two:['You go down a big slide. Can you feel happy and scared at once?','two',[['Yes','ok'],['No, only one feeling','one'],['Only grown-ups can','baby']]]};
 let qi=-1,run=0;
 function ask(){qi++;const K=Object.keys(QZ),k=K[qi%K.length],rot=qi%3,[q,big,ops]=QZ[k];S.Q={k,big};
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(tag)});say('Challenge: '+q);A.redraw()}
 function judge(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Yes!';break;
   case 'stuck':m='Feelings do not stay for ever. They change as the day goes on.';break;
   case 'hide':m="You don't need to hide a feeling. You can tell someone you trust.";break;
   case 'wrong':m='Nobody is wrong. People feel different things because they are different.';break;
   case 'fake':m='Sam is not pretending. The same clown can be funny to one child and scary to another.';break;
   case 'stopit':m="You can't switch off someone's feeling. Say that you see it.";break;
   case 'laugh':m='Laughing at a feeling hurts. Kind words help.';break;
   case 'baby':m='Everyone has feelings, big and small, even grown-ups.';break;
   case 'hit':m='Hitting hurts someone and makes the cross feeling bigger.';break;
   case 'all':m='Not everyone is scared of dogs. Leo has his own reason.';break;
   default:m='You can feel two things at once, like happy and scared on a big slide.'}
  const ok=tag==='ok';if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Stars: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;read.hidden=A.step===5;pad.hidden=A.step===5;sync()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
   const inR=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
   A.gest({down:p=>{const v=view();S.dp=null;S.p0=p;
     if(v==='day'||v==='two'||v==='mine'){const i=FE.findIndex((k,i)=>{const q=chip(i);return hy(p.x-q.x,p.y-q.y)<q.r+6});if(i>=0){S.drag='f'+i;return true}
      if(v==='two'&&p.y<A.H*.6){const j=p.x<A.W/2?0:1;if(!S.td[S.tw][j]){S.tk=j;A.redraw()}}return false}
     if(v==='pass'){const i=HELP.findIndex((h,i)=>inR(p,card(i)));if(i>=0&&!S.used.includes(i)&&S.cloud>0){S.drag=i;return true}return false}
     if(v==='kind'&&S.kd.length<3){const i=[0,1,2].find(i=>inR(p,bub(i)));if(i!=null)kind(i)}return false},
    move:p=>{S.dp=p;A.redraw()},
    up:p=>{const d=S.drag;S.drag=null;S.dp=null;const tapd=S.p0&&hy(p.x-S.p0.x,p.y-S.p0.y)<10;
     if(typeof d==='string'){const k=FE[+d.slice(1)];if(tapd)pickF(k);else if(p.y<A.H*.72)view()==='two'?twoPick(k,p.x<A.W/2?0:1):pickF(k);else A.redraw()}
     else if(typeof d==='number'){const P=pip();if(tapd||hy(p.x-P.x,p.y-P.y)<P.r*2.2)help(d);else A.redraw()}}});
   sync()}});
 A.start()})})();
