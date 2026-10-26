/* Flagship – exam technique (14–16): command words, describe→explain upgrade, minutes by marks, weigh then judge,
   and marking answers against a mark scheme. */
(()=>{const mn=Math.min,mx=Math.max,rd=Math.round;
 const CW=[['Describe','say what it is or what happens'],['Explain','give reasons: because, so'],['Compare','both things: alike or different'],['Evaluate','weigh both sides, then judge']];
 const ANS=[['Electric car sales rose every year from 2019 to 2023, fastest in 2021.',0],['Sales rose because battery prices fell, so the cars cost less to buy.',1],
  ['Electric cars are usually cheaper to run than petrol cars, whereas petrol cars are cheaper to buy.',2],['They cut fumes in towns but batteries are costly to make; overall the gain for city air wins.',3]];
 const WHY=['Describe only asks what happens. No reasons or judgement needed.','Explain needs a reason: look for because or so.','Compare must talk about both things, often with whereas.','Evaluate weighs both sides and ends with a judgement.'];
 const CHIP=[['because batteries got cheaper',1],['from 2019 to 2023',0],['so the cars cost less to buy',1],['by a large amount',0],['and more chargers made charging easy',1],['as the graph shows',0]];
 const QM=[2,4,6,8,8,12],TOT=45,CHECK=5;
 const PTS=[['No exhaust fumes from the car itself',0],['Making batteries needs mining and energy',1],['They come in lots of colours',2],['Usually cheaper to run per mile',0],['Cost more to buy new',1]];
 const VERD=[['Electric cars are good.','bare'],['Overall they help, because cleaner town air matters most, though batteries must get cleaner to make.','ok'],['Petrol cars are cheaper to buy, whereas electric cars are cheaper to run.','cmp']];
 const MS=['Q: Explain one disadvantage of electric cars. [2 marks]','1 mark: names a disadvantage (price, range, charging time).','1 mark: develops it with a reason or effect.'];
 const SCRIPT=[['They take a long time to charge, so long trips need planned stops.',2,'Names a disadvantage and gives its effect: 2.'],['They are expensive.',1,'Names a disadvantage but never says why it matters: 1.'],['They are quiet and good for the planet.',0,'Those are advantages. The question asked for a disadvantage: 0.']];
VIS.reg('flagexam',c=>{let A,pad,chal,read;
 const S={ai:0,done:[],add:[],min:QM.map(()=>TOT/6),pan:[],vd:null,mk:[null,null,null],sel:null,drag:null,flash:null,run:0,want:()=>{},Q:null};
 const say=t=>{c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(read)read.textContent=t}};
 const mode=()=>['cmd','up','time','eval','mark','quiz'][A.step];
 const Z=z=>A.narrow?z:z+2;
 const font=(x,z,w)=>{x.font=`${w||700} ${Z(z)}px system-ui,sans-serif`};
 function T(x,t,X,Y,z,k,w,al){font(x,z,w);x.textAlign=al||'center';x.textBaseline='middle';x.fillStyle=k;x.fillText(t,X,Y)}
 function lines(x,t,w,z){font(x,z,700);const L=[];let s='';for(const v of t.split(' ')){const n=s?s+' '+v:v;if(s&&x.measureText(n).width>w){L.push(s);s=v}else s=n}L.push(s);return L}
 function para(x,t,R,z,k,al){const L=lines(x,t,R.w-16,z),g=Z(z)*1.3;L.forEach((l,i)=>T(x,l,al==='left'?R.x+8:R.x+R.w/2,R.y+R.h/2+(i-(L.length-1)/2)*g,z,k,700,al))}
 function card(x,R,k,strong,fill){x.fillStyle=A.mix(A.col.pn,k,fill==null?.14:fill);A.paint.rrect(R.x,R.y,R.w,R.h,10);x.fill();x.strokeStyle=k;x.lineWidth=strong?3.5:1.5;x.stroke()}
 const hit=(p,R)=>R&&p.x>=R.x&&p.x<=R.x+R.w&&p.y>=R.y&&p.y<=R.y+R.h;
 /* layout */
 const slotR=i=>{const g=8,w=(A.W-3*g)/2,h=A.H*.2;return{x:g+(i%2)*(w+g),y:A.H*.52+Math.floor(i/2)*(h+g),w,h}};
 const ansR=()=>({x:10,y:A.H*.1,w:A.W-20,h:A.H*.28});
 const chipR=i=>{const g=6,w=(A.W-3*g)/2,h=mn(54,A.H*.115);return{x:g+(i%2)*(w+g),y:A.H*.56+Math.floor(i/2)*(h+g),w,h}};
 const plot=()=>({x:34,y:A.H*.14,w:A.W-44,h:A.H*.56});
 const barR=i=>{const P=plot(),bw=P.w/6;return{x:P.x+i*bw+6,y:P.y,w:bw-12,h:P.h}};
 const panR=s=>{const w=A.W*.44;return{x:s?A.W-w-8:8,y:A.H*.3,w,h:A.H*.3}};
 const ptR=()=>({x:A.W*.08,y:A.H*.05,w:A.W*.84,h:mn(60,A.H*.14)});
 const verR=i=>{const h=A.H*.11;return{x:8,y:A.H*.63+i*(h+5),w:A.W-16,h}};
 const scR=i=>{const h=A.H*.13;return{x:8,y:A.H*.36+i*(h+8),w:A.W-16,h}};
 const Y=m=>{const P=plot();return P.y+P.h*(1-m/15)};
 const used=()=>S.min.reduce((a,b)=>a+b,0),fits=i=>Math.abs(S.min[i]-QM[i])<=1;
 /* drawing */
 function cmdV(x){const C=A.col;CW.forEach(([w,d],i)=>{const R=slotR(i),got=S.done.includes(i);card(x,R,got?C.gr:C.cy,got,got?.25:.1);T(x,w,R.x+R.w/2,R.y+R.h*.3,17,C.tx,900);para(x,(got?'✓ ':'')+d,{x:R.x,y:R.y+R.h*.45,w:R.w,h:R.h*.5},12,got?C.gr:C.mu)});
  if(S.ai>=4)return T(x,'All four answers matched',A.W/2,A.H*.24,16,C.gr,800);
  const R=S.drag?{...ansR(),x:S.drag.p.x-ansR().w/2,y:S.drag.p.y-ansR().h/2}:ansR();card(x,R,S.flash?C.rd:C.vi,S.sel!=null||!!S.flash,.18);para(x,ANS[S.ai][0],R,14,C.tx);
  T(x,`Answer ${S.ai+1} of 4: which command word did it obey?`,A.W/2,A.H*.44,12,C.mu,700)}
 function upV(x){const C=A.col,sc=S.add.filter(i=>CHIP[i][1]).length;para(x,'Explain why sales of electric cars rose. [3 marks]',{x:4,y:2,w:A.W-8,h:A.H*.1},14,C.tx);
  const R={x:8,y:A.H*.12,w:A.W-16,h:A.H*.3};card(x,R,C.vi,0,.08);para(x,'Sales went up '+S.add.map(i=>CHIP[i][0]).join(' ')+'.',R,13,C.tx,'left');
  const mw=A.W-16;x.fillStyle=A.alpha(C.mu,.2);A.paint.rrect(8,A.H*.45,mw,14,7);x.fill();x.fillStyle=C.gr;A.paint.rrect(8,A.H*.45,mw*sc/3||.01,14,7);x.fill();
  T(x,`Marks: ${sc} of 3   Words: ${('Sales went up '+S.add.map(i=>CHIP[i][0]).join(' ')).split(' ').length}`,A.W/2,A.H*.51,13,sc>=3?C.gr:C.tx,800);
  CHIP.forEach(([t,ok],i)=>{const R=chipR(i),on=S.add.includes(i);card(x,R,on?(ok?C.gr:C.am):C.cy,on,on?.25:.1);para(x,t,R,11,C.tx)})}
 function timeV(x){const C=A.col,P=plot(),u=used();T(x,`${TOT} min paper, 40 marks, ${CHECK} min to check`,A.W/2,A.H*.05,12,C.mu,700);
  [0,5,10,15].forEach(m=>{x.strokeStyle=A.alpha(C.mu,.3);x.lineWidth=1;x.beginPath();x.moveTo(P.x,Y(m));x.lineTo(P.x+P.w,Y(m));x.stroke();T(x,m+'m',P.x-16,Y(m),11,C.mu,700)});
  QM.forEach((m,i)=>{const R=barR(i),ok=fits(i);x.fillStyle=A.alpha(ok?C.gr:C.or,.75);A.paint.rrect(R.x,Y(S.min[i]),R.w,P.y+P.h-Y(S.min[i])||1,6);x.fill();
   x.setLineDash([4,4]);x.strokeStyle=C.tx;x.beginPath();x.moveTo(R.x-3,Y(m));x.lineTo(R.x+R.w+3,Y(m));x.stroke();x.setLineDash([]);
   T(x,rd(S.min[i]*2)/2+'',R.x+R.w/2,Y(S.min[i])-10,12,C.tx,800);T(x,'Q'+(i+1),R.x+R.w/2,P.y+P.h+12,12,C.tx,800);T(x,m+' mk',R.x+R.w/2,P.y+P.h+28,11,C.mu,700)});
  const left=TOT-u;T(x,`Used ${rd(u)} min, ${rd(left)} left for checking`,A.W/2,A.H*.9,14,left>=CHECK-.01&&QM.every((m,i)=>fits(i))?C.gr:left<0?C.rd:C.tx,800);T(x,'dashes = 1 minute per mark',A.W/2,A.H*.96,11,C.mu,700)}
 function evalV(x){const C=A.col;['For','Against'].forEach((w,s)=>{const R=panR(s);card(x,R,s?C.rd:C.gr,0,.08);T(x,w,R.x+R.w/2,R.y+14,15,C.tx,900);
   S.pan.filter(i=>PTS[i][1]===s).forEach((i,j)=>para(x,PTS[i][0],{x:R.x,y:R.y+28+j*(R.h-30)/2,w:R.w,h:(R.h-30)/2},11,C.tx))});
  const n=S.pan.length,tilt=(S.pan.filter(i=>!PTS[i][1]).length-S.pan.filter(i=>PTS[i][1]===1).length)*.04;x.save();x.translate(A.W/2,A.H*.27);x.rotate(-tilt);x.strokeStyle=C.mu;x.lineWidth=4;x.beginPath();x.moveTo(-A.W*.3,0);x.lineTo(A.W*.3,0);x.stroke();x.restore();
  x.fillStyle=C.mu;x.beginPath();x.moveTo(A.W/2,A.H*.27);x.lineTo(A.W/2-10,A.H*.3);x.lineTo(A.W/2+10,A.H*.3);x.fill();
  const left=[0,1,2,3,4].filter(i=>!S.pan.includes(i)&&i!==S.gone);if(left.length&&n<4){const R=S.drag?{...ptR(),x:S.drag.p.x-ptR().w/2,y:S.drag.p.y-ptR().h/2}:ptR();card(x,R,S.flash?C.rd:C.vi,S.sel!=null,.18);para(x,PTS[left[0]][0],R,13,C.tx)}
  else VERD.forEach(([t,tag],i)=>{const R=verR(i);card(x,R,S.vd===i?(tag==='ok'?C.gr:C.rd):C.cy,S.vd===i,.12);para(x,t,R,11,C.tx)})}
 function markV(x){const C=A.col;const B={x:8,y:A.H*.02,w:A.W-16,h:A.H*.3};card(x,B,C.am,0,.1);MS.forEach((t,i)=>para(x,t,{x:B.x,y:B.y+i*B.h/3,w:B.w,h:B.h/3},i?11:12,i?C.mu:C.tx));
  SCRIPT.forEach(([t,want],i)=>{const R=scR(i),m=S.mk[i],ok=m===want;card(x,R,m==null?C.cy:ok?C.gr:C.rd,m!=null,.12);para(x,t,{x:R.x,y:R.y,w:R.w-56,h:R.h},12,C.tx,'left');
   x.fillStyle=m==null?A.alpha(C.mu,.25):ok?C.gr:C.rd;x.beginPath();x.arc(R.x+R.w-26,R.y+R.h/2,19,0,7);x.fill();T(x,m==null?'?':m+'',R.x+R.w-26,R.y+R.h/2,16,'#fff',900)});
  T(x,'Tap a circle to change the mark',A.W/2,A.H*.97,11,C.mu,700)}
 function draw(A){const{ctx:x,W,H,col:C}=A;x.fillStyle=A.mix(C.pn,'#dbeafe',C.dark?.05:.3);x.fillRect(0,0,W,H);const f={cmd:cmdV,up:upV,time:timeV,eval:evalV,mark:markV}[mode()];
  if(f)f(x);else T(x,S.Q?S.Q.big:'📝',W/2,H/2,mn(W,H)*.22,'#000');A.fx.draw(x)}
 /* actions */
 const no=t=>{A.sound.miss();S.flash=1;setTimeout(()=>{S.flash=null;A.redraw()},500);report(t)};
 function match(i){if(S.ai>=4)return;S.sel=null;const want=ANS[S.ai][1];if(i!==want)return no(`Not ${CW[i][0]}. ${WHY[want]}`);S.done.push(i);S.ai++;A.sound.pop();report(`Yes: ${CW[i][0]}. ${WHY[i]}`)}
 function addChip(i){if(S.add.includes(i))return;S.add.push(i);if(!CHIP[i][1])return no(`"${CHIP[i][0]}" adds words but no reason, so no mark.`);A.sound.pop();report('A reason: one more mark.')}
 function setMin(i,m){S.min[i]=mx(0,mn(15,rd(m*2)/2));A.sound.tick();report()}
 function toPan(s){const left=[0,1,2,3,4].filter(i=>!S.pan.includes(i)&&i!==S.gone);if(!left.length)return;const i=left[0];S.sel=null;
  if(PTS[i][1]===2){S.gone=i;return no('Colour choice is beside the point: it is not for or against. Leave it out.')}
  if(PTS[i][1]!==s)return no(`"${PTS[i][0]}" is a point ${PTS[i][1]?'against':'for'} electric cars.`);S.pan.push(i);A.sound.pop();report()}
 function drop(){const left=[0,1,2,3,4].filter(i=>!S.pan.includes(i)&&i!==S.gone);if(PTS[left[0]][1]===2){S.gone=left[0];A.sound.pop();report('Good: an off-topic point earns nothing, so it stays out.')}else no('That point matters. Put it on For or Against.')}
 function verdict(i){S.vd=i;const tag=VERD[i][1];if(tag!=='ok')return no(tag==='bare'?'A judgement with no reason earns little. Say why.':'That compares but never judges. Evaluate must decide.');A.sound.pop();report('A judgement with a reason that weighs both sides.')}
 function award(i,m){S.mk[i]=m==null?((S.mk[i]==null?-1:S.mk[i])+1)%3:m;A.sound.tick();const w=SCRIPT[i];report(S.mk[i]===w[1]?'Agrees with the examiner. '+w[2]:'')}
 function report(msg){const v=mode();let t;
  if(v==='cmd')t=S.ai<4?`Answer ${S.ai+1}: ${ANS[S.ai][0]} Matched so far: ${S.done.map(i=>CW[i][0]).join(', ')||'none'}.`:'All four matched.';
  else if(v==='up')t=`Answer: Sales went up ${S.add.map(i=>CHIP[i][0]).join(' ')}. Marks ${S.add.filter(i=>CHIP[i][1]).length} of 3.`;
  else if(v==='time')t='Minutes: '+QM.map((m,i)=>`Q${i+1} ${m} marks ${S.min[i]} min`).join(', ')+`. ${rd(TOT-used())} minutes left to check.`;
  else if(v==='eval'){const f=S.pan.filter(i=>!PTS[i][1]).length,g=S.pan.filter(i=>PTS[i][1]===1).length;t=`For ${f}, against ${g}.`+(S.vd!=null?` Judgement: ${VERD[S.vd][0]}`:'')}
  else if(v==='mark')t='Your marks: '+S.mk.map((m,i)=>`answer ${i+1} ${m==null?'not marked':m}`).join(', ')+'.';else t='Challenge time.';
  say((msg?msg+' ':'')+t);sync();S.want()}
 function sync(){if(!A||!pad)return;pad.innerHTML='';const v=mode();
  const B=(t,f,lab,off)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':lab||null},pad,t);b.disabled=!!off;b.onclick=f};
  if(v==='cmd'&&S.ai<4)CW.forEach(([w],i)=>B(w,()=>match(i),'This answer obeys '+w));
  if(v==='up')CHIP.forEach(([t],i)=>B('+ '+t,()=>addChip(i),'Add: '+t,S.add.includes(i)));
  if(v==='time')QM.forEach((m,i)=>{B(`Q${i+1} −`,()=>setMin(i,S.min[i]-.5),`Less time for question ${i+1}`);B(`Q${i+1} +`,()=>setMin(i,S.min[i]+.5),`More time for question ${i+1}`)});
  if(v==='eval'){const left=[0,1,2,3,4].filter(i=>!S.pan.includes(i)&&i!==S.gone);if(left.length&&S.pan.length<4){B('→ For',()=>toPan(0),'Put this point on For');B('→ Against',()=>toPan(1),'Put this point on Against');B('Leave it out',drop,'Leave this point out')}
   else VERD.forEach(([t],i)=>B(t,()=>verdict(i),'Judgement: '+t))}
  if(v==='mark')SCRIPT.forEach((s,i)=>[0,1,2].forEach(m=>B(`Answer ${i+1}: ${m}`,()=>award(i,m),`Give answer ${i+1} ${m} marks`)));A.redraw()}
 const fin=(st,ok,msg)=>()=>{if(A.step===st&&ok()&&(!steps[st].predict||A.pred[st]!=null))A.done(msg()+A.reveal(st))};
 const later=(fs,gap)=>{const r=S.run;fs.forEach((f,j)=>setTimeout(()=>{if(r===S.run)f()},A.reduced()?j*25:j*gap))};
 const reset=()=>{S.run++;S.want=()=>{};S.Q=null;S.sel=null;S.drag=null;S.flash=null};
 const steps=[
  {h:'Read the command word',p:'The command word tells you what kind of answer earns marks. Drag each answer to the word it obeys.',
   predict:{q:'An evaluate question gets a long, detailed description. How does it score?',opts:['Well: it is detailed','Poorly: it never judges'],ans:1},task:'Match all four answers',
   show:()=>{steps[0].go();later([0,1,2,3].map(i=>()=>match(i)),500)},go:()=>{reset();S.ai=0;S.done=[];report();S.want=fin(0,()=>S.ai>=4,()=>'Same topic, four different jobs. Describe says what, explain says why, compare covers both, evaluate judges.')}},
  {h:'Upgrade to explain',p:'This answer only describes. Add pieces until it earns all 3 marks.',
   predict:{q:'Will more detail about the graph earn explain marks?',opts:['Yes: more words, more marks','No: explain marks need reasons'],ans:1},task:'Reach 3 marks out of 3',
   show:()=>{steps[1].go();later([0,2,4].map(i=>()=>addChip(i)),600)},go:()=>{reset();S.add=[];report();S.want=fin(1,()=>S.add.filter(i=>CHIP[i][1]).length>=3,()=>'Each reason earned a mark. Detail with no reason earned nothing, however long.')}},
  {h:'Time follows marks',p:'45 minutes, six questions, 40 marks. Drag each bar to set its minutes. Keep 5 minutes to check.',
   predict:{q:'Should each question get the same time?',opts:['Yes, about 7 minutes each','No, time should follow the marks'],ans:1},task:'Give every question about a minute a mark',
   show:()=>{steps[2].go();later(QM.map((m,i)=>()=>setMin(i,m)),300)},go:()=>{reset();S.min=QM.map(()=>7.5);report();S.want=fin(2,()=>QM.every((m,i)=>fits(i))&&TOT-used()>=CHECK-.01,()=>'About a minute a mark: 12 marks earn 12 minutes, 2 marks only 2. Stuck? Move on and come back.')}},
  {h:'Weigh, then judge',p:'An evaluate answer weighs points for and against, then decides. Sort each point, then pick the best judgement.',task:'Weigh both sides and choose a justified judgement',
   show:()=>{steps[3].go();later([()=>toPan(0),()=>toPan(1),drop,()=>toPan(0),()=>toPan(1),()=>verdict(1)],500)},
   go:()=>{reset();S.pan=[];S.gone=null;S.vd=null;report();S.want=fin(3,()=>S.pan.length===4&&S.vd===1,()=>'Both sides, then a decision with a reason. That is what evaluate rewards.')}},
  {h:'Mark like an examiner',p:'Use the mark scheme to give each answer 0, 1 or 2. Tap a circle to change its mark.',task:'Mark all three answers correctly',
   show:()=>{steps[4].go();later(SCRIPT.map((s,i)=>()=>award(i,s[1])),600)},go:()=>{reset();S.mk=[null,null,null];report();S.want=fin(4,()=>S.mk.every((m,i)=>m===SCRIPT[i][1]),()=>'Marks come from points on the scheme. Marking past papers this way shows what your own answers are missing.')}},
  {h:'Challenge',p:'',go:()=>{reset();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.want()});
 const QZ=[['Compare the two poems. Which start is on track?','⚖️',[['Poem A is angry, whereas Poem B is calm.','ok'],['Poem A is angry and uses short lines.','one'],['I prefer Poem B.','opin']]],
  ['A paper is 90 minutes for 80 marks. About how long for a 6-mark question?','⏱️',[['About 7 minutes','ok'],['About 15 minutes','even'],['About 1 minute','one6']]],
  ['Explain why the bulb is brighter. Which answer earns the marks?','💡',[['There is more current, because the voltage is higher.','ok'],['The bulb is brighter than before.','desc'],['Bulbs can be bright or dim.','desc']]],
  ['You are stuck on a 3-mark question after 6 minutes. Best move?','🚩',[['Flag it, move on, come back at the end','ok'],['Keep going until you get it','stuck'],['Leave it blank for good','blank']]],
  ['Evaluate the plan to ban phones in school. What must the answer end with?','📱',[['A judgement with a reason','ok'],['A list of facts about phones','desc'],['Only the points against','one']]]];
 let qn=-1,run=0;
 function ask(){qn++;const[q,big,ops]=QZ[qn%QZ.length],r=qn%3;S.Q={big};chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>mark(tag)});say('Challenge: '+q);A.redraw()}
 function mark(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Right.';break;
   case 'one':m='That deals with only one side. Compare and evaluate both need the other side too.';break;
   case 'opin':m='A preference is not a comparison. Say how they are alike or different.';break;
   case 'even':m='15 minutes is double the rate. 90 ÷ 80 is just over a minute a mark, so about 7.';break;
   case 'one6':m='That is the time for 1 mark. A 6-mark question needs about 6 or 7 minutes.';break;
   case 'desc':m='That only describes. The command word asks for more than what happens.';break;
   case 'stuck':m='Six minutes is already double the time for 3 marks. Every extra minute is stolen from other questions.';break;
   default:m='Leaving it for good throws marks away. Flag it and try again at the end.'}
  const ok=tag==='ok';if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 /* pointer */
 function down(p){const v=mode();
  if(v==='cmd'&&S.ai<4){if(hit(p,ansR())){S.drag={p,p0:p};return true}if(S.sel!=null){const i=CW.findIndex((w,i)=>hit(p,slotR(i)));if(i>=0)match(i)}return false}
  if(v==='up'){const i=CHIP.findIndex((q,i)=>hit(p,chipR(i)));if(i>=0)addChip(i);return false}
  if(v==='time'){const P=plot();if(p.y>P.y-20&&p.y<P.y+P.h+10){const i=Math.floor((p.x-P.x)/(P.w/6));if(i>=0&&i<6){S.bar=i;setMin(i,15*(1-(p.y-P.y)/P.h));return true}}return false}
  if(v==='eval'){if(S.pan.length<4&&hit(p,ptR())){S.drag={p,p0:p};return true}if(S.sel!=null){if(hit(p,panR(0)))toPan(0);else if(hit(p,panR(1)))toPan(1)}const i=VERD.findIndex((q,i)=>hit(p,verR(i)));if(S.pan.length>=4&&i>=0)verdict(i);return false}
  if(v==='mark'){const i=SCRIPT.findIndex((q,i)=>hit(p,scR(i)));if(i>=0)award(i);return false}return false}
 function move(p){if(mode()==='time'&&S.bar!=null){const P=plot();setMin(S.bar,15*(1-(p.y-P.y)/P.h));return}if(S.drag){S.drag.p=p;A.redraw()}}
 function up(p){S.bar=null;const d=S.drag;if(!d)return;S.drag=null;const far=p&&Math.hypot(p.x-d.p0.x,p.y-d.p0.y)>12,v=mode();
  if(far&&v==='cmd'){const i=CW.findIndex((w,i)=>hit(p,slotR(i)));if(i>=0)return match(i)}
  if(far&&v==='eval'){if(hit(p,panR(0)))return toPan(0);if(hit(p,panR(1)))return toPan(1)}
  S.sel=S.sel==null?0:null;if(S.sel!=null){A.sound.tick();say('Picked up. Now tap where it goes.')}A.redraw()}
 A=FK.shell(c,{steps,ratio:.66,tall:1.25,draw,onStep:A=>{chal.hidden=A.step!==5;read.hidden=A.step===5;pad.hidden=A.step===5;sync()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
   A.gest({down,move,up});sync()}});
 A.start()})})();
