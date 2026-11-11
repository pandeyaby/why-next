/* Flagship – habits and motivation (ages 12–13): habit loops, friction, the automaticity curve, inside vs outside reasons, procrastination as mood repair, and three needs. */
(()=>{
 const LOOPS=[[['Phone buzzes','cue'],['Open the app and scroll','routine'],['A new message: a quick buzz of interest','reward']],
  [['Get home from school, hungry','cue'],['Grab crisps from the cupboard','routine'],['Feel full and relaxed','reward']]];
 const PART=['cue','routine','reward'],PN=['Cue','Routine','Reward'];
 const ENERGY=[3,1,2,1,3,2,2],DAYN=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
 const TAU=22,auto=(d,miss)=>1-Math.exp(-(miss&&d>30?d-1:d)/TAU);
 const WHY=[['Draws because she loves it',1],['Practises to win a gold star',0],['Reads to find out what happens next',1],['Revises to avoid a detention',0],['Plays football for the fun of it',1],['Tidies up for pocket money',0]];
 const NEEDS=['Autonomy','Competence','Relatedness'];
 const CHG=[['She picks the pieces she plays',0,1],['Short pieces she can master in a week',1,1],['Duets with her friend Leo',2,1],['£1 for every practice',-1,0],['A strict hour a day, set by others',0,-1]];
 const shuf=[2,0,1];
VIS.reg('flaghabit',c=>{let A,pad,quiz,reader;
 const st={lp:0,got:0,bad:-1,gtr:0,ph:0,days:0,miss:0,k:0,sorted:[],sbad:-1,run:[0,0],t:[0,0],on:[0,0,0,0,0],tok:0,onChange:()=>{}};
 const mode=()=>['loop','room','curve','why','mood','needs','quiz'][A.step];
 function say(t){c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(reader)reader.textContent=t}}
 const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 function txt(g,t,x,y,n,col,w,al){g.font=`${w||700} ${n}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col;g.fillText(t,x,y,A.W-16)}
 function tile(g,r,col,a,bold){g.fillStyle=A.alpha(col,a||.12);A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=col;g.lineWidth=bold?3:1.5;g.stroke()}
 const cost=()=>1+(st.gtr?0:2)+(st.ph?0:2);
 const prac=()=>ENERGY.slice(0,st.days).filter(e=>e>=cost()).length;
 const needMet=i=>CHG.some((x,j)=>st.on[j]&&x[1]===i&&x[2]>0)&&!(i===0&&st.on[4]);
 // ---------- geometry ----------
 const slotR=i=>{const w=(A.W-40)/3;return{x:10+i*(w+10),y:A.H*.12,w,h:A.H*.3}};
 const cardR=i=>({x:16,y:A.H*(.5+i*.16),w:A.W-32,h:A.H*.13});
 const itemR=i=>i?{x:A.W*.56,y:A.H*.14,w:A.W*.4,h:A.H*.3}:{x:A.W*.04,y:A.H*.14,w:A.W*.4,h:A.H*.3};
 const plotR=()=>({x:A.W*.12,y:A.H*.16,w:A.W*.82,h:A.H*.62});
 const binR=i=>({x:i?A.W/2+5:10,y:A.H*.4,w:A.W/2-15,h:A.H*.56});
 const chgR=i=>({x:12,y:A.H*(.36+i*.125),w:A.W-24,h:A.H*.105});
 // ---------- drawing ----------
 function drawLoop(g){const C=A.col,L=LOOPS[st.lp]||LOOPS[1];txt(g,`Loop ${Math.min(st.lp+1,2)} of 2`,A.W/2,A.H*.05,13,C.mu,600);
  PART.forEach((p,i)=>{const r=slotR(i),f=i<st.got||st.lp>1;tile(g,r,[C.cy,C.vi,C.gr][i],f?.25:.06,st.bad===i);txt(g,PN[i],r.x+r.w/2,r.y+16,13,C.tx,800);
   if(f)wrap(g,L[i][0],r.x+r.w/2,r.y+r.h*.55,r.w-10,A.narrow?11:12,C.tx);if(i<2)txt(g,'→',r.x+r.w+5,r.y+r.h/2,16,C.mu)});
  if(st.lp<2)shuf.forEach((j,i)=>{if(j<st.got)return;const r=cardR(i);tile(g,r,C.or,.1);txt(g,L[j][0],r.x+r.w/2,r.y+r.h/2,A.narrow?12:14,C.tx,600)});
  else wrap(g,'Both loops built. The reward teaches your brain to repeat the routine when the cue comes.',A.W/2,A.H*.7,A.W-40,14,C.gr)}
 function wrap(g,t,x,y,w,n,col){g.font=`600 ${n}px system-ui,sans-serif`;const ws=t.split(' '),ls=[];let l='';ws.forEach(v=>{const s=l?l+' '+v:v;if(g.measureText(s).width>w&&l){ls.push(l);l=v}else l=s});ls.push(l);
  ls.forEach((s,i)=>txt(g,s,x,y+(i-(ls.length-1)/2)*(n+3),n,col,600))}
 function drawRoom(g){const C=A.col;[['🎸 Guitar',st.gtr?'Out on a stand by the desk':'Zipped in its case under the bed',st.gtr],['📱 Phone',st.ph?'Charging in the kitchen':'On the desk, face up',st.ph]].forEach(([n,s,on],i)=>{const r=itemR(i);tile(g,r,on?C.gr:C.or,on?.2:.08,on);
   txt(g,n,r.x+r.w/2,r.y+22,14,C.tx,800);wrap(g,s,r.x+r.w/2,r.y+r.h*.62,r.w-12,12,C.tx)});
  txt(g,`Effort to start practising: ${cost()} (tired nights have energy 1 or 2)`,A.W/2,A.H*.52,12,C.mu,600);
  const w=(A.W-20)/7;for(let d=0;d<7;d++){const x=10+d*w,y=A.H*.6,ran=d<st.days,ok=ran&&ENERGY[d]>=cost();
   tile(g,{x:x+2,y,w:w-4,h:A.H*.24},ran?(ok?C.gr:C.rd):C.mu,ran?.25:.05);txt(g,DAYN[d],x+w/2,y+14,11,C.tx,700);txt(g,'⚡'.repeat(ENERGY[d]),x+w/2,y+A.H*.1,10,C.tx,500);
   if(ran)txt(g,ok?'🎸':'📱',x+w/2,y+A.H*.18,18,C.tx)}
  if(st.days)txt(g,`Practised ${prac()} of ${st.days} evenings`,A.W/2,A.H*.92,14,prac()>=5?C.gr:C.or,800)}
 function drawCurve(g){const C=A.col,r=plotR(),X=d=>r.x+r.w*d/120,Y=v=>r.y+r.h*(1-v);g.strokeStyle=C.ln;g.lineWidth=1;g.strokeRect(r.x,r.y,r.w,r.h);
  [0,30,66,90,120].forEach(d=>txt(g,String(d),X(d),r.y+r.h+12,10,d===66?C.gr:C.mu,600));txt(g,'days',r.x+r.w,r.y+r.h+26,10,C.mu,600,'right');
  txt(g,'how automatic ↑',r.x,r.y-10,10,C.mu,600,'left');g.strokeStyle=A.alpha(C.gr,.5);g.setLineDash([4,4]);g.beginPath();g.moveTo(r.x,Y(.95));g.lineTo(r.x+r.w,Y(.95));g.stroke();g.setLineDash([]);
  [[0,C.cy],[1,C.or]].forEach(([m,col])=>{if(m&&!st.miss)return;g.strokeStyle=col;g.lineWidth=m?2:3;g.beginPath();for(let d=0;d<=st.days;d++){const v=auto(d,m);d?g.lineTo(X(d),Y(v)):g.moveTo(X(d),Y(v))}g.stroke()});
  if(st.miss){g.fillStyle=C.or;g.beginPath();g.arc(X(30),Y(auto(30)),5,0,7);g.fill();txt(g,'missed day 30',X(30)+8,Y(auto(30))+14,10,C.or,700,'left')}
  const v=auto(st.days,st.miss);txt(g,`Day ${st.days}: ${Math.round(v*100)}% automatic`,A.W/2,A.H*.07,14,v>=.95?C.gr:C.tx,800);
  g.fillStyle=C.vi;g.beginPath();g.arc(X(st.days),Y(v),7,0,7);g.fill()}
 function drawWhy(g){const C=A.col;['Inside reason (intrinsic)','Outside reason (extrinsic)'].forEach((n,i)=>{const r=binR(i),inn=st.sorted.filter(j=>WHY[j][1]===1-i);tile(g,r,i?C.or:C.gr,st.sbad===i?.3:.08,st.sbad===i);
   wrap(g,n,r.x+r.w/2,r.y+18,r.w-8,12,C.tx);inn.forEach((j,k)=>wrap(g,WHY[j][0],r.x+r.w/2,r.y+52+k*36,r.w-10,11,C.mu))});
  const it=WHY[st.k];if(!it)return txt(g,'All six sorted.',A.W/2,A.H*.2,15,C.gr,800);tile(g,{x:20,y:A.H*.1,w:A.W-40,h:A.H*.2},C.vi,.2,true);wrap(g,it[0],A.W/2,A.H*.2,A.W-60,15,C.tx)}
 const moodAt=(w,t)=>w?(t<2?.5+.12*t:Math.max(.15,.74-.12*(t-2))):(t<1?.5-.3*t:Math.min(.98,.2+.11*(t-1)));
 function drawMood(g){const C=A.col,r=plotR(),X=t=>r.x+r.w*t/7,Y=v=>r.y+r.h*(1-v);g.strokeStyle=C.ln;g.lineWidth=1;g.strokeRect(r.x,r.y,r.w,r.h);
  txt(g,'bad feeling ↑',r.x+4,r.y+10,10,C.mu,600,'left');txt(g,'now',X(0),r.y+r.h+12,10,C.mu,600);txt(g,'deadline',X(7),r.y+r.h+12,10,C.mu,600,'right');
  [[0,C.rd,'Put it off'],[1,C.gr,'Start for 2 min']].forEach(([w,col,n])=>{const T=st.t[w];if(!T)return;g.strokeStyle=col;g.lineWidth=3;g.beginPath();for(let k=0;k<=T*4;k++){const t=k/4;k?g.lineTo(X(t),Y(moodAt(w,t))):g.moveTo(X(t),Y(moodAt(w,t)))}g.stroke();
   txt(g,n,X(T)+(T>5?-6:6),Y(moodAt(w,T))+(w&&T>5?18:-12),11,col,800,T>5?'right':'left')});
  txt(g,'An essay due in a week',A.W/2,A.H*.07,14,C.tx,800)}
 function drawNeeds(g){const C=A.col;txt(g,'Ana, 12, wants to quit piano. Pick changes:',A.W/2,A.H*.05,13,C.tx,700);
  NEEDS.forEach((n,i)=>{const w=(A.W-40)/3,r={x:10+i*(w+10),y:A.H*.1,w,h:A.H*.2},ok=needMet(i);tile(g,r,ok?C.gr:C.mu,ok?.28:.06,ok);txt(g,n,r.x+r.w/2,r.y+r.h*.35,A.narrow?11:13,C.tx,800);txt(g,ok?'✓ met':'not met',r.x+r.w/2,r.y+r.h*.72,11,ok?C.gr:C.mu,700)});
  CHG.forEach((x,j)=>{const r=chgR(j),on=st.on[j];tile(g,r,on?(x[2]>0?C.gr:C.or):C.vi,on?.25:.06,on);txt(g,(on?'☑ ':'☐ ')+x[0],r.x+12,r.y+r.h/2,A.narrow?12:13,C.tx,600,'left')})}
 function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.04:.3);g.fillRect(0,0,W,H);
  ({loop:drawLoop,room:drawRoom,curve:drawCurve,why:drawWhy,mood:drawMood,needs:drawNeeds,quiz:()=>txt(g,'🔁',W/2,H/2,60,C.tx)})[mode()](g);A.fx.draw(g)}
 // ---------- actions ----------
 function place(j){if(st.lp>1)return;const L=LOOPS[st.lp];if(j<st.got)return;
  if(j===st.got){st.got++;st.bad=-1;A.sound.pop();let m=`${PN[j]}: ${L[j][0]}.`;if(st.got===3){st.lp++;st.got=st.lp>1?3:0;m+=st.lp>1?' Both loops done.':' Loop 1 done. Now loop 2.'}return note(m)}
  st.bad=st.got;A.sound.miss();let m='';
  if(st.got===0)m='Start with the cue: the trigger that comes first and starts the habit.';
  else if(st.got===1)m='Next is the routine: the thing you actually do after the cue.';
  else m='Last is the reward: the good feeling that makes your brain want to repeat it.';note(m)}
 function setDays(d){st.days=Math.max(0,Math.min(120,d));A.sound.tick();note()}
 function runWeek(){st.days=0;const k=++st.tok;for(let d=1;d<=7;d++)setTimeout(()=>{if(k!==st.tok)return;st.days=d;A.sound.tick();note(d===7?`${prac()} of 7 evenings practised with effort ${cost()}.`:'')},A.reduced()?d*10:d*180)}
 function sortWhy(i){const it=WHY[st.k];if(!it)return;if(it[1]===1-i){st.sorted.push(st.k);st.k++;st.sbad=-1;A.sound.pop();return note(`"${it[0]}": ${i?'the reason is outside: a reward or a punishment.':'the reason is inside: the activity itself is the reward.'}`)}
  st.sbad=i;A.sound.miss();note(i?'Here the activity itself is the pay-off. That is an inside reason.':'Here something outside the task (a prize, money or avoiding trouble) is the reason.')}
 function runMood(w){const k=++st.tok;st.t[w]=0;for(let s=1;s<=7;s++)setTimeout(()=>{if(k!==st.tok)return;st.t[w]=s;A.redraw();if(s===7){st.run[w]=1;note(w?'Starting felt a bit worse for a moment, then the dread shrank as the essay got going.':'Putting it off brought instant relief, then the bad feeling grew as the deadline came closer.')}},A.reduced()?s*10:s*160)}
 function tog(j){st.on[j]=1-st.on[j];A.sound.tick();const x=CHG[j];note(st.on[j]?(x[1]<0?'Money is an outside reason. It may get practice done but can make piano feel like a job.':x[2]<0?'Rules set by others take away choice: autonomy drops.':`That feeds ${NEEDS[x[1]].toLowerCase()}.`):'')}
 function note(msg){const v=mode();let t='';
  if(v==='loop')t=st.lp>1?'Both loops complete.':`Loop ${st.lp+1}: ${st.got} of 3 placed. Next slot: ${PN[st.got]}. Cards: `+shuf.filter(j=>j>=st.got).map(j=>LOOPS[st.lp][j][0]).join('; ')+'.';
  else if(v==='room')t=`Guitar ${st.gtr?'out on a stand':'in its case'}. Phone ${st.ph?'in the kitchen':'on the desk'}. Effort ${cost()}. `+(st.days?`Practised ${prac()} of ${st.days} evenings.`:'');
  else if(v==='curve')t=`Day ${st.days}: ${Math.round(auto(st.days,st.miss)*100)}% automatic${st.miss?', with a missed day at day 30':''}.`;
  else if(v==='why')t=WHY[st.k]?`Card: ${WHY[st.k][0]}. Inside or outside reason?`:'All sorted.';
  else if(v==='mood')t=`Put it off: ${st.run[0]?'run':'not run'}. Start for 2 minutes: ${st.run[1]?'run':'not run'}.`;
  else if(v==='needs')t='Needs met: '+NEEDS.filter((n,i)=>needMet(i)).join(', ')+(NEEDS.some((n,i)=>!needMet(i))?'. Not yet: '+NEEDS.filter((n,i)=>!needMet(i)).join(', '):'')+'.';else t='Challenge time.';
  say((msg?msg+' ':'')+t);keys();st.onChange()}
 function keys(){if(!A||!pad)return;pad.innerHTML='';const v=mode(),b=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost sm','aria-label':l||null},pad,t);e.onclick=f};
  if(v==='loop'&&st.lp<2)shuf.forEach(j=>{if(j>=st.got)b(LOOPS[st.lp][j][0],()=>place(j),`Place: ${LOOPS[st.lp][j][0]}`)});
  if(v==='room'){b(st.gtr?'Put guitar away':'Guitar on a stand',()=>{st.gtr=1-st.gtr;st.days=0;note()});b(st.ph?'Phone back to desk':'Phone to kitchen',()=>{st.ph=1-st.ph;st.days=0;note()});b('Run 7 evenings',runWeek)}
  if(v==='curve'){b('+7 days',()=>setDays(st.days+7));b('+30 days',()=>setDays(st.days+30));b('−7 days',()=>setDays(st.days-7));b(st.miss?'No missed day':'Miss day 30',()=>{st.miss=1-st.miss;note(st.miss?'One missed day barely moves the curve.':'')})}
  if(v==='why'&&WHY[st.k]){b('Inside reason',()=>sortWhy(0));b('Outside reason',()=>sortWhy(1))}
  if(v==='mood'){b('Put it off',()=>runMood(0));b('Start for 2 minutes',()=>runMood(1))}
  if(v==='needs')CHG.forEach((x,j)=>b((st.on[j]?'Undo: ':'')+x[0],()=>tog(j)));A.redraw()}
 // ---------- canvas input ----------
 function down(p){const v=mode();
  if(v==='loop'){const i=[0,1,2].find(i=>hit(p,cardR(i)));if(i!=null)place(shuf[i]);return false}
  if(v==='room'){const i=[0,1].find(i=>hit(p,itemR(i)));if(i===0){st.gtr=1-st.gtr;st.days=0;note()}if(i===1){st.ph=1-st.ph;st.days=0;note()}return false}
  if(v==='curve'){const r=plotR();if(p.x>=r.x-10){setDays(Math.round((p.x-r.x)/r.w*120));return true}return false}
  if(v==='why'){const i=[0,1].find(i=>hit(p,binR(i)));if(i!=null)sortWhy(i);return false}
  if(v==='needs'){const j=CHG.findIndex((x,j)=>hit(p,chgR(j)));if(j>=0)tog(j);return false}return false}
 function move(p){if(mode()==='curve'){const r=plotR(),d=Math.max(0,Math.min(120,Math.round((p.x-r.x)/r.w*120)));if(d!==st.days)setDays(d)}}
 // ---------- steps ----------
 const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
 const seq=(fns,ms)=>{const k=st.tok;fns.forEach((f,j)=>setTimeout(()=>{if(k===st.tok)f()},A.reduced()?j*20:j*ms))};
 const reset=()=>{st.tok++;st.onChange=()=>{};Object.assign(st,{lp:0,got:0,bad:-1,gtr:0,ph:0,days:0,miss:0,k:0,sorted:[],sbad:-1,run:[0,0],t:[0,0],on:[0,0,0,0,0]})};
 const steps=[
  {h:'The habit loop',p:'Every habit runs on a loop: a cue, a routine, then a reward. Tap the cards in loop order, or use the buttons.',task:'Build both loops',
   show:()=>{steps[0].go();seq([0,1,2,0,1,2].map(j=>()=>place(j)),260)},go:()=>{reset();note();st.onChange=finish(0,()=>st.lp>1,'Cue, routine, reward. Spot the cue and you can change what follows it.')}},
  {h:'Make it easy',p:'Ravi wants to practise guitar each evening, but he is often tired. Change his room, then run a week. Tired nights have little energy.',
   predict:{q:'What will get Ravi practising most evenings?',opts:['Trying harder each night','Changing his room'],ans:1},task:'Practise on all 7 evenings',
   show:()=>{steps[1].go();seq([()=>{st.gtr=1;note()},()=>{st.ph=1;note()},runWeek],400)},go:()=>{reset();note();st.onChange=finish(1,()=>st.days===7&&prac()===7,'Effort 1 beat every tired night. Make the good habit easy to start and the bad one awkward.')}},
  {h:'How long does it take?',p:'In a 2010 study, people repeated one daily habit, such as a walk after breakfast. Drag along the chart. The green line is 95% automatic.',
   predict:{q:'How long until a new daily habit feels automatic?',opts:['21 days','About 66 days, often more'],ans:1},task:'Reach day 66, then miss a day',
   show:()=>{steps[2].go();seq([()=>setDays(30),()=>setDays(66),()=>{st.miss=1;note()}],400)},go:()=>{reset();note();st.onChange=finish(2,()=>st.days>=66&&st.miss,'The middle person took 66 days, and the range was 18 to 254. One missed day hardly mattered: keep going.')}},
  {h:'Inside and outside reasons',p:'An inside (intrinsic) reason means the activity is its own reward. An outside (extrinsic) reason is a prize, money or avoiding trouble. Sort each card.',
   predict:{q:'Children who loved drawing were promised a prize for drawing. Later, with no prize on offer, they chose to draw…',opts:['More than before','Less than children who never got a prize'],ans:1},task:'Sort all six',
   show:()=>{steps[3].go();seq(WHY.map(x=>()=>sortWhy(1-x[1])),260)},go:()=>{reset();note();st.onChange=finish(3,()=>st.k>=WHY.length,'In that 1973 study the prize turned play into work. Outside rewards help with dull tasks but can crowd out real interest.')}},
  {h:'Why we put things off',p:'Watch how bad you feel about an essay as the deadline gets closer. Run both choices.',task:'Run both choices',
   show:()=>{steps[4].go();runMood(0);setTimeout(()=>runMood(1),A.reduced()?100:1300)},go:()=>{reset();note();st.onChange=finish(4,()=>st.run[0]&&st.run[1],'Putting off is mood repair: it swaps a bad feeling now for a worse one later. Two minutes of starting shrinks it.')}},
  {h:'Three needs',p:'People keep going when they feel choice (autonomy), skill (competence) and connection (relatedness). Pick changes that meet all three needs for Ana.',task:'Meet all three needs',
   show:()=>{steps[5].go();seq([0,1,2].map(j=>()=>tog(j)),350)},go:()=>{reset();note();st.onChange=finish(5,()=>[0,1,2].every(needMet),'Choice, skill and people: Ana now plays because she wants to, not because she must.')}},
  {h:'Challenge',p:'',go:()=>{reset();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>st.onChange()});
 // ---------- challenge ----------
 const QS=[['At 10 pm Sam’s phone lights up and he scrolls until midnight. Which part is the cue?',[['The phone lighting up','ok'],['Scrolling','routine'],['Feeling entertained','reward']]],
  ['Best way to start running before school?',[['Put your trainers by the bed the night before','ok'],['Rely on willpower every morning','will'],['Promise yourself a big prize in a year','ext']]],
  ['Roughly how long do daily habits take to feel automatic?',[['About two months, often more','ok'],['Exactly 21 days','days'],['One week','days']]],
  ['You missed one day of a new habit. Best move?',[['Carry on tomorrow; one miss barely matters','ok'],['Start counting from day 1 again','miss'],['Give up, the streak is broken','miss']]],
  ['Mia loves coding. Her parents start paying her for each hour. A risk is that…',[['She codes for the money and enjoys it less','ok'],['Nothing: rewards always help','ext'],['She will code far more for ever','ext']]],
  ['Why do people put off homework they care about?',[['To escape an uncomfortable feeling now','ok'],['They are lazy','lazy'],['They have too little time','lazy']]],
  ['A coach lets players pick drills, sets skills they can just reach and builds team spirit. Which needs are met?',[['Autonomy, competence and relatedness','ok'],['Only competence','sdt'],['None: no prizes are given','ext']]]];
 function why(tag){let m='Try again.';
  if(tag==='routine')m='The routine is what you do. The cue is the trigger that comes first.';
  if(tag==='reward')m='The reward is the good feeling at the end. The cue is the trigger that starts it.';
  if(tag==='will')m='Willpower runs low when you are tired. Change your surroundings so the habit is easy to start.';
  if(tag==='ext')m='Outside rewards can push out inside interest. Feeling choice, skill and connection lasts longer.';
  if(tag==='days')m='21 days is a myth. In the study the middle time was 66 days, from 18 to 254.';
  if(tag==='miss')m='One missed day hardly changes how automatic a habit gets. Just restart tomorrow.';
  if(tag==='lazy')m='Putting off is mostly about dodging a bad feeling, not laziness or time. Start small to shrink the feeling.';
  if(tag==='sdt')m='Picking drills is choice (autonomy) and team spirit is connection (relatedness), as well as skill.';
  return m}
 let qn=-1,run=0;
 function ask(){qn++;const[q,ops]=QS[qn%QS.length],turn=qn%3;
  quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=quiz.querySelector('.fl-pick');ops.slice(turn).concat(ops.slice(0,turn)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(tag)});say('Challenge: '+q);A.redraw()}
 function judge(tag){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),good=tag==='ok';
  if(good){run++;A.win()}else{run=0;A.sound.miss()}const m=good?'✓ Yes. Streak: '+run+'.':'✗ '+why(tag);fb.innerHTML=`${m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 A=FK.shell(c,{steps,ratio:.7,tall:1.25,draw,onStep:A=>{quiz.hidden=A.step!==6;pad.hidden=A.step===6;keys()},
  init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);reader=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up:()=>{}});keys()}});
 A.start()})})();
