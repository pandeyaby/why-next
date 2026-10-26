/* Flagship – words for big feelings (ages 5–8): put a precise word on a big feeling, tell angry from disappointed,
   feel "overwhelmed" build up and settle, calm the body with slow breaths, and fill a toolbox with safe strategies. */
(()=>{const mn=Math.min,mx=Math.max,hy=Math.hypot;
 const DEF={frustrated:'trying and trying, but it keeps going wrong',disappointed:'something you hoped for did not happen',anxious:'worried about what might happen',overwhelmed:'too much, all at once',excited:'happy and fizzy about something good',sleepy:'tired and ready for bed'};
 const SCN=[['🧱','Your tower fell down again. You tried five times!','frustrated',['excited','frustrated','disappointed']],
  ['🦁','The zoo trip is off. You were looking forward to it all week.','disappointed',['disappointed','sleepy','frustrated']],
  ['🏫','A new school tomorrow. Your tummy feels funny.','anxious',['excited','overwhelmed','anxious']],
  ['📢','Noise, mess and three jobs to do at once!','overwhelmed',['overwhelmed','disappointed','sleepy']]];
 const JAR=[['😠','Angry','It feels unfair'],['😞','Disappointed','A hope did not come true']];
 const CASE=[['Ali grabs your toy on purpose.',0],['Rain stops the picnic.',1],['Someone pushes in front of you.',0],['Your friend is ill and can not come to play.',1]];
 const JOBS=[['📚','Homework'],['🧸','Tidy up'],['🐶','Feed the dog'],['🎻','Practise'],['👟','Find shoes']],FACE=['🙂','🙂','😐','😟','😫','😫'];
 const BOX=[['🌬️','Take slow breaths',1],['👊','Hit something',0],['🔢','Count to ten',1],['📣','Shout at a friend',0],['🚶','Walk away for a bit',1],['🧸','Throw your toys',0],['🙋','Ask a grown-up',1],['🚪','Slam the door',0]];
VIS.reg('flagbig',c=>{let A,pad,chal,read;c.fig.classList.add('young');
 const S={si:0,sok:0,ci:0,cok:0,pack:[],did:[],peak:0,breaths:0,inT:0,bal:0,tool:[],bad:null,hold:null,dp:null,p0:null,run:0,want:()=>{},Q:null,msg:''};
 const say=t=>{c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(read)read.textContent=t}};
 const mode=()=>['name','jar','pack','breathe','tool','quiz'][A.step];
 const px=z=>A.narrow?z:z+2;
 function tx(x,t,X,Y,z,k,w){x.font=`${w||700} ${px(z)}px system-ui,sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillStyle=k;x.fillText(t,X,Y,A.W-14)}
 function tile(x,R,k,on,a){x.fillStyle=A.alpha(k,a||.15);A.paint.rrect(R.x,R.y,R.w,R.h,16);x.fill();x.lineWidth=on?4:2;x.strokeStyle=k;x.stroke()}
 function lines(x,t,w,z){x.font=`800 ${px(z)}px system-ui,sans-serif`;const L=[];let s='';for(const v of t.split(' ')){const n=s?s+' '+v:v;if(s&&x.measureText(n).width>w){L.push(s);s=v}else s=n}L.push(s);return L}
 function para(x,t,R,z,k){const L=lines(x,t,R.w-16,z),g=px(z)*1.25;L.forEach((l,i)=>tx(x,l,R.x+R.w/2,R.y+R.h/2+(i-(L.length-1)/2)*g,z,k,800))}
 const inside=(p,R)=>R&&p.x>R.x&&p.x<R.x+R.w&&p.y>R.y&&p.y<R.y+R.h;
 const moved=R=>S.dp?{x:S.dp.x-R.w/2,y:S.dp.y-R.h/2,w:R.w,h:R.h}:R;
 const wordR=i=>{const h=mn(56,A.H*.13);return{x:A.W*.1,y:A.H*.5+i*(h+8),w:A.W*.8,h}};
 const bubR=()=>({x:A.W*.3,y:A.H*.33,w:A.W*.62,h:mn(52,A.H*.12)});
 const jarR=i=>{const g=10,w=(A.W-3*g)/2;return{x:g+i*(w+g),y:A.H*.5,w,h:A.H*.46}};
 const caseR=()=>({x:A.W*.12,y:A.H*.1,w:A.W*.76,h:A.H*.25});
 const jobR=i=>{const h=mn(44,A.H*.09);return{x:8,y:A.H*.17+i*(h+5),w:A.W*.46,h}};
 const bagR=()=>({x:A.W*.52,y:A.H*.2,w:A.W*.46,h:A.H*.58});
 const oneR=()=>({x:A.W*.15,y:A.H*.87,w:A.W*.7,h:mn(48,A.H*.11)});
 const balR=()=>({x:A.W/2,y:A.H*.55,r:mn(A.W,A.H)*(.1+.14*S.bal)});
 const toolR=i=>{const g=8,w=(A.W-3*g)/2,h=mn(50,A.H*.115);return{x:g+(i%2)*(w+g),y:A.H*.05+Math.floor(i/2)*(h+g),w,h}};
 const chestR=()=>({x:10,y:A.H*.66,w:A.W-20,h:A.H*.31});
 function meter(x,lvl,top){const C=A.col,R={x:A.W*.1,y:top,w:A.W*.8,h:16};x.fillStyle=A.alpha(C.mu,.2);A.paint.rrect(R.x,R.y,R.w,R.h,8);x.fill();
  const f=mx(.06,mn(1,lvl/4));x.fillStyle=A.mix(C.gr,C.rd,f);A.paint.rrect(R.x,R.y,R.w*f,R.h,8);x.fill();
  tx(x,'calm',R.x+18,R.y+R.h+12,12,C.mu,700);tx(x,'big feeling',R.x+R.w-38,R.y+R.h+12,12,C.mu,700)}
 function nameV(x){const C=A.col;if(S.sok>=4)return tx(x,'Four big feelings, four exact words!',A.W/2,A.H/2,16,C.gr,800);
  const s=SCN[S.si];tx(x,s[0],A.W/2,A.H*.08,mn(34,A.H*.08),C.tx);para(x,s[1],{x:8,y:A.H*.13,w:A.W-16,h:A.H*.16},15,C.tx);
  tx(x,S.msg?'😊':'😣',A.W*.15,A.H*.39,mn(38,A.H*.09),C.tx);const B=bubR();x.setLineDash([7,6]);tile(x,B,C.vi,0,.06);x.setLineDash([]);
  tx(x,S.msg||'I feel …',B.x+B.w/2,B.y+B.h/2,S.msg?16:14,S.msg?C.gr:C.mu,800);
  s[3].forEach((w,i)=>{const R=wordR(i),Q=S.hold===i?moved(R):R;tile(x,Q,S.bad===i?C.rd:C.or,S.hold===i||S.bad===i);tx(x,w,Q.x+Q.w/2,Q.y+Q.h/2,17,C.tx,800)})}
 function jarV(x){const C=A.col;JAR.forEach((j,i)=>{const R=jarR(i);tile(x,R,i?C.cy:C.rd,0,.1);tx(x,j[0],R.x+R.w/2,R.y+R.h*.25,mn(36,R.h*.2),C.tx);
   tx(x,j[1],R.x+R.w/2,R.y+R.h*.5,16,C.tx,900);para(x,j[2],{x:R.x,y:R.y+R.h*.58,w:R.w,h:R.h*.3},12,C.mu)});
  if(S.cok>=4)return tx(x,'Unfair: angry. Hope gone: disappointed.',A.W/2,A.H*.25,15,C.gr,800);
  const R=caseR(),Q=S.hold===0?moved(R):R;tile(x,Q,S.bad!=null?C.rd:C.or,S.hold===0||S.bad!=null,.18);para(x,CASE[S.ci][0],Q,15,C.tx);tx(x,'Drag it to a jar',A.W/2,A.H*.42,12,C.mu,700)}
 function packV(x){const C=A.col,lvl=S.pack.length;meter(x,lvl,A.H*.03);tx(x,FACE[lvl],A.W/2,A.H*.14,mn(30,A.H*.07),C.tx);
  JOBS.forEach((j,i)=>{if(S.pack.includes(i)||S.did.includes(i))return;const R=jobR(i),Q=S.hold===i?moved(R):R;tile(x,Q,C.cy,S.hold===i);tx(x,j[0]+' '+j[1],Q.x+Q.w/2,Q.y+Q.h/2,14,C.tx,800)});
  const B=bagR();tile(x,B,lvl>=4?C.rd:C.vi,lvl>=4,.08);tx(x,'🎒 To do now',B.x+B.w/2,B.y+16,13,C.mu,800);
  S.pack.forEach((k,n)=>tx(x,JOBS[k][0]+' '+JOBS[k][1],B.x+B.w/2,B.y+40+n*px(22),13,C.tx,700));
  S.did.forEach((k,n)=>tx(x,'✓ '+JOBS[k][1],A.W*.25,A.H*.2+n*px(20)+12,13,C.gr,700));
  const t=lvl>=4?'“I feel overwhelmed!” Too much at once.':S.peak>=4&&!lvl?'Settled. One job at a time did it.':S.peak>=4?'Doing one job at a time…':'Drag jobs into the bag.';tx(x,t,A.W/2,A.H*.83,14,lvl>=4?C.rd:S.peak>=4?C.gr:C.mu,800);
  if(S.peak>=4&&lvl){const O=oneR();tile(x,O,C.gr,1,.2);tx(x,'✔ Do one job',O.x+O.w/2,O.y+O.h/2,16,C.tx,800)}}
 function breatheV(x){const C=A.col,lvl=mx(0,3-S.breaths);meter(x,lvl+1,A.H*.03);const B=balR();
  x.save();x.globalAlpha=.9;A.paint.ball(B.x,B.y,B.r,C.pk);x.restore();x.strokeStyle=C.mu;x.lineWidth=2;x.beginPath();x.moveTo(B.x,B.y+B.r);x.lineTo(B.x,A.H-8);x.stroke();
  const n=S.inT?mn(4,1+Math.floor((performance.now()-S.inT)/500)):0;
  tx(x,S.inT?`Breathe in… ${n}`:S.breaths>=3?'Calm. Your body settled.':'Hold the balloon to breathe in. Let go to breathe out.',A.W/2,A.H*.17,14,S.breaths>=3?C.gr:C.tx,800);
  tx(x,`Slow breaths: ${S.breaths} of 3`,A.W/2,A.H*.24,13,C.mu,700);if(S.msg)tx(x,S.msg,A.W/2,A.H*.3,13,C.rd,800)}
 function toolV(x){const C=A.col;BOX.forEach((b,i)=>{if(S.tool.includes(i))return;const R=toolR(i),Q=S.hold===i?moved(R):R;tile(x,Q,S.bad===i?C.rd:C.or,S.hold===i||S.bad===i);
   para(x,b[0]+' '+b[1],Q,12,C.tx)});const T=chestR();tile(x,T,S.tool.length>=4?C.gr:C.vi,0,.08);
  tx(x,`🧰 My calm-down strategies: ${S.tool.length} of 4`,T.x+T.w/2,T.y+18,13,C.tx,800);S.tool.forEach((k,n)=>tx(x,BOX[k][0]+' '+BOX[k][1],T.x+T.w*(n%2?.73:.27),T.y+44+Math.floor(n/2)*px(26),12,C.tx,700))}
 function draw(A){const{ctx:x,W,H,col:C}=A;x.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.05:.4);x.fillRect(0,0,W,H);
  const f={name:nameV,jar:jarV,pack:packV,breathe:breatheV,tool:toolV}[mode()];if(f)f(x);else tx(x,S.Q?S.Q.big:'💬',W/2,H/2,mn(W,H)*.2,C.tx);A.fx.draw(x)}
 function name(i){if(S.sok>=4)return;const s=SCN[S.si],w=s[3][i];if(w!==s[2]){S.bad=i;return oops(`${w[0].toUpperCase()+w.slice(1)} means ${DEF[w]}. Which word fits this?`)}
  S.bad=null;S.msg='I feel '+w+'.';A.sound.pop();report(`Yes: ${w} means ${DEF[w]}.`);const r=S.run;setTimeout(()=>{if(r!==S.run)return;S.sok++;S.si=mn(3,S.sok);S.msg='';report()},A.reduced()?10:900)}
 function jar(j){if(S.cok>=4)return;const k=CASE[S.ci];if(j!==k[1]){S.bad=j;return oops(k[1]?'Nobody did this on purpose. You hoped for it and it did not happen. That is disappointed.':'Someone did this to you, and it is not fair. That feels angry.')}
  S.bad=null;S.cok++;S.ci=mn(3,S.cok);A.sound.pop();report(`${JAR[j][1]}. ${JAR[j][2]}.`)}
 function addJob(i){if(S.peak>=4||S.pack.includes(i))return;S.pack.push(i);S.peak=mx(S.peak,S.pack.length);A.sound.tick();report(S.pack.length>=4?'Too much at once. That feeling is called overwhelmed.':'')}
 function doOne(){if(S.peak<4||!S.pack.length)return;const k=S.pack.shift();S.did.push(k);A.sound.pop();report(`Done: ${JOBS[k][1]}.`+(S.pack.length?'':' The feeling settled.'))}
 function inhale(){if(S.inT||S.breaths>=3)return;S.inT=performance.now();S.msg='';sync()}
 function exhale(){if(!S.inT)return;breathe(performance.now()-S.inT)}
 function breathe(ms){S.inT=0;if(ms<1500){A.tween(S,{bal:0},300);return oops('Too fast! Quick breaths keep you wound up. Breathe in slowly, to 3 or 4.')}
  S.msg='';S.breaths=mn(3,S.breaths+1);A.tween(S,{bal:0},900,'out');A.sound.pop();report('A slow breath. The feeling got smaller.')}
 function tool(i){if(S.tool.length>=4||S.tool.includes(i))return;const b=BOX[i];if(!b[2]){S.bad=i;return oops(`"${b[1]}" could hurt someone or make things worse. A strategy helps you cope safely.`)}
  S.bad=null;S.tool.push(i);A.sound.pop();report(`"${b[1]}" is a strategy. It helps you cope.`)}
 function oops(t){A.sound.miss();say(t);sync()}
 function report(msg){const v=mode();let t;
  if(v==='name')t=S.sok>=4?'All four named.':`${SCN[S.si][1]} Words: ${SCN[S.si][3].join(', ')}.`;
  else if(v==='jar')t=S.cok>=4?'All four sorted.':`${CASE[S.ci][0]} Angry or disappointed?`;
  else if(v==='pack')t=`Jobs in the bag: ${S.pack.length}.`+(S.peak>=4&&S.pack.length?' Do one job at a time.':'');
  else if(v==='breathe')t=S.breaths>=3?'Three slow breaths. Calm.':`Slow breaths: ${S.breaths} of 3.`;
  else if(v==='tool')t=`Strategies in the toolbox: ${S.tool.length} of 4.`;else t='Challenge time.';say((msg?msg+' ':'')+t);sync();S.want()}
 function sync(){if(!A||!pad)return;pad.innerHTML='';const v=mode(),K=(t,f,off,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);e.disabled=!!off;e.onclick=f};
  if(v==='name'&&S.sok<4&&!S.msg)SCN[S.si][3].forEach((w,i)=>K(w,()=>name(i),0,'I feel '+w));
  if(v==='jar'&&S.cok<4)JAR.forEach((j,i)=>K(j[0]+' '+j[1],()=>jar(i)));
  if(v==='pack'){JOBS.forEach((j,i)=>{if(!S.pack.includes(i)&&!S.did.includes(i)&&S.peak<4)K(j[0]+' '+j[1],()=>addJob(i),0,'Add job: '+j[1])});if(S.peak>=4&&S.pack.length)K('✔ Do one job',doOne)}
  if(v==='breathe'&&S.breaths<3)S.inT?K('Breathe out',exhale):K('Breathe in',inhale);
  if(v==='tool'&&S.tool.length<4)BOX.forEach((b,i)=>{if(!S.tool.includes(i))K(b[0]+' '+b[1],()=>tool(i),0,'Add to toolbox: '+b[1])});A.redraw()}
 const fin=(st,ok,msg)=>()=>{if(A.step===st&&ok()&&(!steps[st].predict||A.pred[st]!=null))A.done(msg()+A.reveal(st))};
 const later=(fs,gap)=>{const r=S.run;fs.forEach((f,j)=>setTimeout(()=>{if(r===S.run)f()},A.reduced()?j*20:j*gap))};
 const reset=()=>{S.run++;S.want=()=>{};S.Q=null;S.hold=null;S.dp=null;S.bad=null;S.msg='';S.inT=0;S.bal=0};
 const steps=[
  {h:'Name the big feeling',p:'Big feelings have their own words. The exact word helps you, and others, know what to do.',task:'Find the word for all four',
   show:()=>{steps[0].go();later([1,0,2,0].map(i=>()=>name(i)),1050)},go:()=>{reset();S.si=0;S.sok=0;report();S.want=fin(0,()=>S.sok>=4,()=>'Frustrated, disappointed, anxious, overwhelmed: each one fits a different moment.')}},
  {h:'Angry or disappointed?',p:'These two can feel alike. Ask: did someone do something unfair? Or did a hope just not come true?',
   predict:{q:'Rain stops the picnic. Nobody did it on purpose. Which word fits best?',opts:['Angry','Disappointed'],ans:1},task:'Put all four in the right jar',
   show:()=>{steps[1].go();later([0,1,0,1].map(j=>()=>jar(j)),450)},go:()=>{reset();S.ci=0;S.cok=0;report();S.want=fin(1,()=>S.cok>=4,()=>'Unfair makes us angry. A lost hope makes us disappointed.')}},
  {h:'Too much at once',p:'Pile jobs into the bag and watch the meter. Then find a way to settle.',
   predict:{q:'Your bag is too full. What helps you settle?',opts:['Do them all at once, fast','Do one job at a time'],ans:1},task:'Fill the bag, then settle it',
   show:()=>{steps[2].go();later([0,1,2,3].map(i=>()=>addJob(i)).concat([doOne,doOne,doOne,doOne]),260)},go:()=>{reset();S.pack=[];S.did=[];S.peak=0;report();S.want=fin(2,()=>S.peak>=4&&!S.pack.length,()=>'Overwhelmed means too much at once. One thing at a time helps you settle.')}},
  {h:'Breathe to calm',p:'Your breath can calm your body. Breathe in slowly while you count to four, then let it out.',
   predict:{q:'Which breaths help you calm down?',opts:['Fast, quick breaths','Slow, deep breaths'],ans:1},task:'Take three slow breaths',
   show:()=>{steps[3].go();later([0,1,2].map(()=>()=>breathe(2000)),500)},go:()=>{reset();S.breaths=0;report();S.want=fin(3,()=>S.breaths>=3,()=>'Slow breaths made the meter fall. Quick ones did not.')}},
  {h:'Pick your strategies',p:'A strategy is a plan you can use. It helps you cope, which means getting through a hard feeling safely.',task:'Put four safe strategies in the toolbox',
   show:()=>{steps[4].go();later([0,2,4,6].map(i=>()=>tool(i)),400)},go:()=>{reset();S.tool=[];report();S.want=fin(4,()=>S.tool.length>=4,()=>'Breathe, count, walk away, ask for help: four ways to cope.')}},
  {h:'Challenge',p:'',go:()=>{reset();quiz()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.want()});
 const QZ=[['Your friend is ill and can not come to your party. Which word fits best?','🎉',[['Disappointed','ok'],['Angry','blame'],['Calm','off']]],
  ['You have to wait a long time for the swing. What do you need?','⏳',[['Patience','ok'],['To push in','hurt'],['To shout','hurt']]],
  ['Lots of people talk to you at once. You feel…','🗣️',[['Overwhelmed','ok'],['Disappointed','dis'],['Sleepy','off']]],
  ['Which breathing helps you calm down?','🌬️',[['Slow, deep breaths','ok'],['Fast, quick breaths','fast'],['Hold your breath for ages','hold']]],
  ['What is a strategy?','🧰',[['A plan you can use to cope','ok'],['A kind of feeling','word'],['A kind of snack','word']]],
  ['Your puzzle piece will not fit, again and again. You feel…','🧩',[['Frustrated','ok'],['Disappointed','dis'],['Calm','off']]]];
 let qn=-1,stars=0;
 function quiz(){qn++;const [q,big,ops]=QZ[qn%QZ.length],rot=qn%3;S.Q={big};
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const r=chal.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},r,o);b.onclick=()=>mark(tag)});say('Challenge: '+q);A.redraw()}
 function mark(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Yes! The exact word helps you know what to do.';break;
   case 'blame':m='Angry fits when something is unfair. Nobody did this on purpose: it is a hope that did not happen.';break;
   case 'dis':m='Disappointed is a hope that did not come true. This one is a different big feeling.';break;
   case 'off':m='That is a small, quiet feeling. This moment brings a big one.';break;
   case 'hurt':m='That could hurt someone or make it worse. Pick the calm way.';break;
   case 'fast':m='Fast breaths keep you wound up. Slow breaths settle your body.';break;
   case 'hold':m='Holding your breath does not help. Breathe in slowly, then out slowly.';break;
   default:m='A strategy is not a feeling or a thing. It is a plan to help you cope.'}
  const ok=tag==='ok';if(ok){stars++;A.win()}else{stars=0;A.sound.miss()}fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Stars: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
 function down(p){const v=mode();S.p0=p;S.dp=null;S.hold=null;
  if(v==='name'&&S.sok<4&&!S.msg){const i=[0,1,2].find(i=>inside(p,wordR(i)));if(i!=null){S.hold=i;return true}}
  if(v==='jar'&&S.cok<4){if(inside(p,caseR())){S.hold=0;return true}const j=[0,1].find(j=>inside(p,jarR(j)));if(j!=null)jar(j)}
  if(v==='pack'){if(S.peak>=4){if(inside(p,oneR()))doOne();return false}const i=JOBS.findIndex((j,i)=>!S.pack.includes(i)&&inside(p,jobR(i)));if(i>=0){S.hold=i;return true}}
  if(v==='breathe'){const B=balR();if(S.breaths<3&&hy(p.x-B.x,p.y-B.y)<mx(B.r,50)*1.3){inhale();return true}}
  if(v==='tool'&&S.tool.length<4){const i=BOX.findIndex((b,i)=>!S.tool.includes(i)&&inside(p,toolR(i)));if(i>=0){S.hold=i;return true}}return false}
 function up(p){const v=mode(),k=S.hold,far=S.p0&&hy(p.x-S.p0.x,p.y-S.p0.y)>12;S.hold=null;S.dp=null;
  if(v==='breathe')return exhale();if(k==null)return A.redraw();
  if(v==='name'){const B=bubR();if(!far||p.y<B.y+B.h+12)name(k);else A.redraw()}
  else if(v==='jar'){const j=[0,1].find(j=>inside(p,jarR(j)));if(j!=null)jar(j);else A.redraw()}
  else if(v==='pack'){if(!far||inside(p,bagR()))addJob(k);else A.redraw()}
  else if(v==='tool'){if(!far||inside(p,chestR()))tool(k);else A.redraw()}}
 A=FK.shell(c,{steps,ratio:.62,tall:1.25,draw,onStep:A=>{chal.hidden=A.step!==5;read.hidden=A.step===5;pad.hidden=A.step===5;sync()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
   /* while a breath is held the balloon grows each frame; the rAF loop only runs when this returns true */
   A.every(dt=>{if(!S.inT)return false;S.bal=mn(1,S.bal+dt/2);return true});
   A.gest({down,move:p=>{if(S.hold!=null){S.dp=p;A.redraw()}},up});sync()}});
 A.start()})})();
