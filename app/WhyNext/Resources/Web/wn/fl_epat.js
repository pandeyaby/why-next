/* Flagship – emotional patterns over time (ages 9–11): spot repeats in a feelings diary, build trigger → feeling →
   response chains, flag the first early warning sign, match then-and-now responses, sort useful goals. */
(()=>{const lo=Math.min,hi=Math.max;
 const DIARY=[['Mon','📝','Spelling test','😟','worried'],['Tue','⚽','Football','😀','happy'],['Wed','📝','Maths quiz','😟','worried'],['Thu','🎨','Art club','😌','calm'],['Fri','🍕','Pizza night','😀','happy'],
  ['Mon','📝','Spelling test','😟','worried'],['Tue','👫','Fell out with Sam','😠','cross'],['Wed','📝','Times-table test','😟','worried'],['Thu','🎨','Art club','😌','calm'],['Fri','🎬','Film night','😀','happy']];
 const REPEAT=[0,2,5,7];
 const LINKS=['Trigger','Feeling','Response'],LE=['⚡','💭','🏃'];
 const PIECES=[['📝 A test is coming',0],['😟 Worried',1],['🙈 Say I feel sick to stay home',2],['🎮 My brother grabs my game',0],['😠 Angry',1],['📣 Shout at him',2]];
 const ORD=[1,5,3,0,4,2];
 // MIXUP[real][dropped]: the slip a learner makes when a piece goes in the wrong link of the chain
 const MIXUP=[[null,'That is what happens first. It sets the feeling off, so it is the trigger.','That happens before you feel anything, so it is the trigger.'],
  ['That is the feeling inside you. The trigger is the thing that happens first.',null,'That is a feeling, not an action. A response is what you say or do.'],
  ['That is what you do after the feeling, so it is the response.','Others can see you do this, so it is a response.',null]];
 const RISE=[['Sun 6 pm','Tummy feels tight',2],['Sun 8 pm','Keep thinking about it',4],['Sun 10 pm','Cannot get to sleep',6],['Mon 8 am','Snappy at breakfast',8],['Mon 9 am','Tears at the door',10]];
 const CALMED=[2,3,3,4,4];
 const THEN=['Cried and threw the board when I lost a game','Hid under the table before a test','Hit my brother when he took my toy'];
 const NOW=['Know tests make me nervous, so I practise and breathe','Feel the anger rise, walk away, then talk','Feel let down, say good game, ask for a rematch'];
 const NF=[1,2,0];
 const GOALS=[['When my tummy goes tight before a test, I will take five slow breaths.',0,''],['Never feel worried again.',1,'Worry is a normal feeling. A good goal is about noticing it and coping, not never feeling it.'],
  ['When I start to feel cross with my brother, I will go to my room and count to ten.',0,''],['Be better at feelings.',1,'Too vague: it has no when and no I will. Say what you will notice and what you will do.']];
 const GOAL_OK='This one says when (the sign you notice) and what you will do. That makes it a useful goal.';
VIS.reg('flagepat',c=>{let A,keys,quizBox;
 const S={gen:0,check:()=>{},hit:[],placed:[],paired:[],gbox:[[],[]],pic:'📈'};
 const phase=()=>['diary','chain','early','grow','goal','quiz'][A.step];
 const voice=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
 const px=n=>(A.narrow?n:n+3);
 function write(g,t,X,Y,n,col,wt,al){g.font=`${wt||700} ${px(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col;g.fillText(t,X,Y,A.W-12)}
 function lines(g,t,X,Y,w,n,col,wt){g.font=`${wt||700} ${px(n)}px system-ui,sans-serif`;const out=[];let cur='';for(const word of t.split(' ')){const tryit=cur?cur+' '+word:word;if(cur&&g.measureText(tryit).width>w-12){out.push(cur);cur=word}else cur=tryit}out.push(cur);
  const lh=px(n)*1.22;out.forEach((l,i)=>write(g,l,X,Y+(i-(out.length-1)/2)*lh,n,col,wt))}
 function tile(g,r,col,strong,fill){g.fillStyle=A.alpha(col,fill||.13);A.paint.rrect(r.x,r.y,r.w,r.h,11);g.fill();g.strokeStyle=col;g.lineWidth=strong?4.5:1.8;g.stroke()}
 const hitR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 const slip=t=>{A.sound.miss();voice(t);A.redraw()};
 // ---- step 1: two weeks of diary, tap the repeats ----
 function dayR(i){const cols=A.narrow?2:5,rows=10/cols,gap=6,w=(A.W-gap*(cols+1))/cols,h=(A.H*.86-gap*(rows+1))/rows,col=A.narrow?i%2:i%5,row=A.narrow?Math.floor(i/2):Math.floor(i/5);
  return{x:gap+col*(w+gap),y:A.H*.12+gap+row*(h+gap),w,h}}
 function diaryV(g){const C=A.col;write(g,`Tests that came with worry: ${S.hit.length} of 4`,A.W/2,A.H*.06,13,C.tx,800);
  DIARY.forEach((d,i)=>{const r=dayR(i),on=S.hit.includes(i),bad=S.wd===i;tile(g,r,on?C.gr:bad?C.rd:C.ln,on||bad,on||bad?.22:.07);
   write(g,`${d[0]} wk ${i<5?1:2}`,r.x+r.w/2,r.y+r.h*.18,10,C.tx,700);write(g,d[1]+' '+d[3],r.x+r.w/2,r.y+r.h*.47,17,C.tx,400);write(g,d[2],r.x+r.w/2,r.y+r.h*.8,10,C.tx,700)})}
 function markDay(i){if(S.hit.length>=4||S.hit.includes(i))return;const d=DIARY[i];
  if(!REPEAT.includes(i)){S.wd=i;return slip(i===6?'Falling out with Sam happened once. A one-off is not a pattern; a pattern repeats.':`${d[2]} made you feel ${d[4]}, not worried. Look for the trigger that keeps coming back.`)}
  S.wd=-1;S.hit.push(i);A.sound.pop();say(`Yes: ${d[2]}, worried again.`)}
 // ---- step 2: trigger -> feeling -> response chains ----
 const linkR=k=>{const gap=8,w=(A.W-gap*4)/3;return{x:gap+k*(w+gap),y:A.H*.05,w,h:A.H*.55}};
 const handR=()=>{const w=lo(A.W*.8,380),h=A.H*.17;return{x:(A.W-w)/2,y:A.H*.72,w,h}};
 function chainV(g){const C=A.col,hue=[C.am,C.vi,C.cy];
  LINKS.forEach((t,k)=>{const r=linkR(k);tile(g,r,hue[k],S.bad===k);write(g,LE[k]+' '+t,r.x+r.w/2,r.y+A.H*.05,12,C.tx,800);
   S.placed.filter(j=>PIECES[j][1]===k).forEach((j,n)=>{const y=r.y+A.H*(.15+n*.18),q={x:r.x+5,y,w:r.w-10,h:A.H*.15};tile(g,q,hue[k],0,.24);lines(g,PIECES[j][0],q.x+q.w/2,q.y+q.h/2,q.w,10,C.tx)})});
  if(S.next<6){const base=handR(),r=S.hold&&S.at?{x:S.at.x-base.w/2,y:S.at.y-base.h/2,w:base.w,h:base.h}:base;tile(g,r,C.pk,1,.2);lines(g,PIECES[ORD[S.next]][0],r.x+r.w/2,r.y+r.h/2,r.w,13,C.tx,800);
   if(!S.hold)write(g,'Drag it up to its link ↑',A.W/2,A.H*.66,11,C.tx,600)}
  else write(g,'Same trigger, same chain: that is a pattern.',A.W/2,A.H*.8,12,C.gr,800)}
 function drop(k){if(S.next>=6)return;const j=ORD[S.next],real=PIECES[j][1];S.hold=null;
  if(k!==real){S.bad=k;return slip(MIXUP[real][k])}S.bad=-1;S.placed.push(j);S.next++;A.sound.pop();say(`${PIECES[j][0]} is the ${LINKS[real].toLowerCase()}.`)}
 // ---- step 3: catch the worry early ----
 const plot=()=>({x0:A.W*.1,x1:A.W*.92,y0:A.H*.78,y1:A.H*.16});
 const ptX=i=>{const P=plot();return P.x0+(P.x1-P.x0)*i/4},lvY=v=>{const P=plot();return P.y0+(P.y1-P.y0)*v/10};
 function earlyV(g){const C=A.col,P=plot();g.strokeStyle=A.alpha(C.tx,.55);g.lineWidth=1.5;g.beginPath();g.moveTo(P.x0,P.y1);g.lineTo(P.x0,P.y0);g.lineTo(P.x1,P.y0);g.stroke();
  write(g,'Worry 0 to 10',P.x0,P.y1-A.H*.05,10,C.tx,700,'left');
  const path=(vals,col,dash)=>{g.strokeStyle=col;g.lineWidth=4;g.setLineDash(dash||[]);g.beginPath();vals.forEach((v,i)=>i?g.lineTo(ptX(i),lvY(v)):g.moveTo(ptX(i),lvY(v)));g.stroke();g.setLineDash([])};
  path(RISE.map(r=>r[2]),C.rd);if(S.calm)path(CALMED,C.gr,[8,6]);
  RISE.forEach((r,i)=>{const al=i?i>3?'right':'center':'left',lx=ptX(i)+(i?i>3?12:0:-12);A.paint.ball(ptX(i),lvY(r[2]),9,i===S.flag?C.gr:C.am);write(g,r[0],lx,P.y0+A.H*.05,A.narrow?8:10,C.tx,700,al);if(!A.narrow||i%2===0)write(g,r[1],i>3?ptX(i)-16:lx,lvY(r[2])+(i>3?0:A.H*.07),A.narrow?9:10,C.tx,700,i>3?'right':al)});
  const fx=S.flagX!=null?S.flagX:S.flag>=0?ptX(S.flag):A.W*.5,fy=A.H*.9;g.strokeStyle=C.tx;g.lineWidth=3;g.beginPath();g.moveTo(fx,fy+A.H*.06);g.lineTo(fx,fy-A.H*.06);g.stroke();
  g.fillStyle=C.gr;g.beginPath();g.moveTo(fx,fy-A.H*.06);g.lineTo(fx+22,fy-A.H*.035);g.lineTo(fx,fy-A.H*.01);g.fill();write(g,'🛟 plan',fx+(fx>A.W*.8?-38:40),fy,10,C.tx,800);
  if(S.calm)write(g,'Caught early, the worry stays small.',A.W/2,A.H*.035,12,C.gr,800)}
 function plant(i){if(S.calm)return;S.flag=i;S.flagX=null;const r=RISE[i];
  if(i>0)return slip(i===1?'Good noticing, but there was an earlier sign: a tight tummy at 6 pm.':i===4?'At 10 of 10 it is very hard to calm down. Catch it when the signs are small.':`By ${r[0]} the worry is at ${r[2]} of 10. Small signs come first: look earlier.`);
  S.calm=true;A.sound.pop();say('A tight tummy on Sunday evening is the early warning sign.')}
 // ---- step 4: then and now ----
 const sideR=(s,i)=>{const w=A.W*.46,h=A.H*.25,gap=A.H*.04;return{x:s?A.W-w-8:8,y:A.H*.13+i*(h+gap),w,h}};
 function growV(g){const C=A.col;write(g,'👧 Age 5',A.W*.25,A.H*.06,13,C.tx,800);write(g,'🧒 Age 10',A.W*.75,A.H*.06,13,C.tx,800);
  THEN.forEach((t,i)=>{const r=sideR(0,i),done=S.paired.includes(i);tile(g,r,done?C.gr:S.pick===i?C.vi:C.am,done||S.pick===i);lines(g,t,r.x+r.w/2,r.y+r.h/2,r.w,10,C.tx)});
  NOW.forEach((t,i)=>{const r=sideR(1,i),done=S.paired.includes(NF[i]);tile(g,r,done?C.gr:S.badR===i?C.rd:C.cy,done||S.badR===i);lines(g,t,r.x+r.w/2,r.y+r.h/2,r.w,10,C.tx)});
  S.paired.forEach(i=>{const a=sideR(0,i),b=sideR(1,NF.indexOf(i));g.strokeStyle=C.gr;g.lineWidth=3;g.beginPath();g.moveTo(a.x+a.w,a.y+a.h/2);g.lineTo(b.x,b.y+b.h/2);g.stroke()})}
 function tapThen(i){if(S.paired.includes(i))return;S.pick=i;S.badR=-1;A.sound.tick();say(`Age 5: ${THEN[i]}. Now tap what the 10-year-old does.`)}
 function tapNow(k){if(S.pick<0)return slip('Tap an age 5 card first, then the age 10 card for the same situation.');const i=S.pick;
  if(NF[k]!==i){S.badR=k;return slip('Those are different situations. Match the same trigger: a game, a test or a brother.')}
  S.paired.push(i);S.pick=-1;S.badR=-1;A.sound.pop();say(`Same trigger, new response: ${NOW[k]}.`)}
 // ---- step 5: useful goals ----
 const binR=k=>{const w=A.W*.46;return{x:k?A.W-w-8:8,y:A.H*.04,w,h:A.H*.5}};
 const goalR=()=>{const w=lo(A.W*.9,460),h=A.H*.22;return{x:(A.W-w)/2,y:A.H*.68,w,h}};
 function goalV(g){const C=A.col;[['✅ Useful goal',C.gr],['🔧 Needs work',C.am]].forEach(([t,col],k)=>{const r=binR(k);tile(g,r,col,S.gbad===k);write(g,t,r.x+r.w/2,r.y+A.H*.05,12,C.tx,800);
   S.gbox[k].forEach((j,n)=>lines(g,'• '+GOALS[j][0],r.x+r.w/2,r.y+A.H*(.15+n*.17),r.w-8,9,C.tx,600))});
  if(S.gi>=GOALS.length)return write(g,'A useful goal says when, and what I will do.',A.W/2,A.H*.78,12,C.gr,800);
  const base=goalR(),r=S.hold&&S.at?{x:S.at.x-base.w/2,y:S.at.y-base.h/2,w:base.w,h:base.h}:base;tile(g,r,C.pk,1,.2);lines(g,GOALS[S.gi][0],r.x+r.w/2,r.y+r.h/2,r.w,12,C.tx,800)}
 function sortG(k){if(S.gi>=GOALS.length)return;const gl=GOALS[S.gi];S.hold=null;if(k!==gl[1]){S.gbad=k;return slip(gl[1]?gl[2]:GOAL_OK)}
  S.gbad=-1;S.gbox[k].push(S.gi);S.gi++;A.sound.pop();say(k?'Right, that one needs work.':'Yes, a when and an I will.')}
 function draw(A){const{ctx:g,W,H,col:C}=A,v=phase();g.fillStyle=A.mix(C.pn,'#ecfeff',C.dark?.04:.35);g.fillRect(0,0,W,H);
  const f={diary:diaryV,chain:chainV,early:earlyV,grow:growV,goal:goalV}[v];if(f)f(g);else write(g,S.pic,W/2,H/2,60,C.tx,400);A.fx.draw(g)}
 function say(msg){const v=phase();let t;
  if(v==='diary')t=`Repeats found: ${S.hit.length} of 4.`;
  else if(v==='chain')t=S.next>=6?'Both chains built.':`Card: ${PIECES[ORD[S.next]][0]}. Trigger, feeling or response?`;
  else if(v==='early')t=S.flag<0?'Worry rises from 2 on Sunday at 6 pm to 10 on Monday at 9 am. Place the plan flag.':`Flag at ${RISE[S.flag][0]}, worry ${RISE[S.flag][2]} of 10.`;
  else if(v==='grow')t=`Matched ${S.paired.length} of 3.`;
  else if(v==='goal')t=S.gi>=GOALS.length?'All goals sorted.':`Goal: ${GOALS[S.gi][0]} Useful, or needs work?`;else t='Challenge time.';
  voice((msg?msg+' ':'')+t);buttons();S.check()}
 function buttons(){if(!A||!keys)return;keys.innerHTML='';const v=phase(),B=(t,f,al)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':al||null},keys,t);e.onclick=f};
  if(v==='diary'&&S.hit.length<4)DIARY.forEach((d,i)=>{if(!S.hit.includes(i))B(`${d[0]} ${i<5?1:2}: ${d[2]}`,()=>markDay(i),`${d[0]} week ${i<5?1:2}: ${d[2]}, ${d[4]}`)});
  if(v==='chain'&&S.next<6)LINKS.forEach((t,k)=>B(LE[k]+' '+t,()=>drop(k),`Put in ${t}`));
  if(v==='early'&&!S.calm)RISE.forEach((r,i)=>B('🛟 '+r[0],()=>plant(i),`Plan flag at ${r[0]}: ${r[1]}, worry ${r[2]}`));
  if(v==='grow'){THEN.forEach((t,i)=>{if(!S.paired.includes(i))B('👧 '+t,()=>tapThen(i),'Age 5: '+t)});NOW.forEach((t,k)=>{if(!S.paired.includes(NF[k]))B('🧒 '+t,()=>tapNow(k),'Age 10: '+t)})}
  if(v==='goal'&&S.gi<GOALS.length){B('✅ Useful goal',()=>sortG(0));B('🔧 Needs work',()=>sortG(1))}A.redraw()}
 const finish=(n,cond,msg)=>()=>{if(A.step===n&&cond()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg()+A.reveal(n))};
 const replay=(fs,gap)=>{const g=S.gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===S.gen)f()},A.reduced()?j*20:j*gap))};
 const reset=()=>{S.gen++;S.check=()=>{};S.hold=S.at=null;S.bad=-1};
 const steps=[
  {h:'Spot the repeat',p:'Two weeks of Maya\u2019s feelings diary. A pattern is when the same trigger brings the same feeling again and again. Tap each test day with worry.',
   predict:{q:'Maya fell out with Sam once and felt cross. Is that a pattern?',opts:['Yes, it is a pattern','No, a pattern repeats'],ans:1},task:'Find all 4 test days with worry',
   show:()=>{steps[0].go();replay(REPEAT.map(i=>()=>markDay(i)),380)},go:()=>{reset();S.hit=[];S.wd=-1;say();S.check=finish(0,()=>S.hit.length>=4,()=>'Tests keep bringing worry: that is Maya\u2019s pattern.')}},
  {h:'Trigger, feeling, response',p:'A trigger is what happens. The feeling is inside you. The response is what you say or do. Drag each card to its link in the chain.',
   predict:{q:'Is shouting a feeling?',opts:['Yes, shouting is a feeling','No, it is what I do'],ans:1},task:'Build both chains',
   show:()=>{steps[1].go();replay(ORD.map(j=>()=>drop(PIECES[j][1])),360)},go:()=>{reset();S.placed=[];S.next=0;say();S.check=finish(1,()=>S.next>=6,()=>'Knowing your chain lets you change the response next time.')}},
  {h:'Catch it early',p:'Worry often builds slowly, and your body gives early warning signs. Drag the plan flag to when Maya should use her calming plan.',
   predict:{q:'When does a calming plan work best?',opts:['When I am about to explode','When I first notice the signs'],ans:1},task:'Flag the first warning sign',
   show:()=>{steps[2].go();replay([()=>plant(0)],300)},go:()=>{reset();S.flag=-1;S.flagX=null;S.calm=false;say();S.check=finish(2,()=>S.calm,()=>'Noticing the small sign early keeps the worry from reaching 10.')}},
  {h:'Then and now',p:'Your feelings stay, but how you handle them grows. Tap an age 5 card, then the age 10 card for the same situation.',
   predict:{q:'Do feelings like nerves go away when you get older?',opts:['Yes, they go away','No, but you handle them better'],ans:1},task:'Match all 3 situations',
   show:()=>{steps[3].go();replay([0,1,2].flatMap(i=>[()=>tapThen(i),()=>tapNow(NF.indexOf(i))]),330)},go:()=>{reset();S.paired=[];S.pick=-1;S.badR=-1;say();S.check=finish(3,()=>S.paired.length>=3,()=>'Same triggers, wiser responses: that is emotional growth.')}},
  {h:'Set a goal',p:'A useful goal names the sign you will notice and what you will do: When I…, I will… Drag each goal to a box.',task:'Sort all 4 goals',
   show:()=>{steps[4].go();replay(GOALS.map(gl=>()=>sortG(gl[1])),380)},go:()=>{reset();S.gi=0;S.gbox=[[],[]];S.gbad=-1;say();S.check=finish(4,()=>S.gi>=GOALS.length,()=>'Write your own: When I notice…, I will…')}},
  {h:'Challenge',p:'',go:()=>{reset();ask()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
 const QZ=[['Jo feels grumpy every Monday morning after a late Sunday. What is this?','😴',[['A pattern: same trigger, same feeling','ok'],['A one-off bad day','once'],['Just how Jo is, it cannot change','fixed']]],
  ['"I stamp my feet and slam the door." Which link is this?','🚪',[['The response','ok'],['The feeling','feel'],['The trigger','trig']]],
  ['Your worry is at 2 of 10 and your tummy feels tight. What now?','🛟',[['Use my calming plan now','ok'],['Wait until it gets big','wait'],['Ignore it, it means nothing','ignore']]],
  ['Which goal is most useful?','🎯',[['When I feel cross, I will count to ten','ok'],['Never get cross again','never'],['Be nicer','vague']]],
  ['What shows emotional awareness has grown?','🌱',[['I know tests make me nervous and I plan for it','ok'],['I never feel nervous now','never'],['I hide when I feel nervous','hide']]],
  ['Ali feels nervous before swimming, but Bea feels excited. What is true?','🏊',[['People can have different patterns','ok'],['Ali is feeling it wrong','wrongfeel'],['One of them is lying','lie']]]];
 let qn=-1,run=0;
 function ask(){qn++;const[q,pic,ops]=QZ[qn%QZ.length],r=qn%3;S.pic=pic;
  quizBox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=quizBox.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(tag)});voice('Challenge: '+q);A.redraw()}
 function mark(tag){quizBox.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=quizBox.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Yes! You read the pattern.';break;
   case 'once':m='It happens every Monday after the same trigger. A repeat is a pattern, not a one-off.';break;
   case 'fixed':m='Patterns can change. Spotting the trigger (late nights) is the first step.';break;
   case 'feel':m='Others can see you stamp and slam. That is a response. The feeling (angry) is inside.';break;
   case 'trig':m='The trigger happens first. Stamping comes after the feeling: a response.';break;
   case 'wait':m='Big worry is harder to calm. Use the plan while the sign is still small.';break;
   case 'ignore':m='A tight tummy is an early warning sign. It is your body telling you to use your plan.';break;
   case 'never':m='Feelings like anger and nerves are normal. Growth is noticing them and coping, not never having them.';break;
   case 'vague':m=GOALS[3][2];break;
   case 'hide':m='Hiding is the younger response. Growth is knowing the pattern and planning.';break;
   case 'wrongfeel':m='No feeling is wrong. Different people have different triggers and patterns.';break;
   default:m='Nobody is lying. The same event can bring different feelings in different people.'}
  const good=tag==='ok';if(good){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${good?'✓':'✗'} ${m}${good?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 const nearPt=x=>{let b=0;for(let i=1;i<5;i++)if(Math.abs(ptX(i)-x)<Math.abs(ptX(b)-x))b=i;return b};
 function down(p){const v=phase();S.hold=null;
  if(v==='diary'){const i=DIARY.findIndex((_,i)=>hitR(p,dayR(i)));if(i>=0)markDay(i);return false}
  if(v==='chain'&&S.next<6){if(hitR(p,handR())){S.hold='piece';S.at=p;return true}const k=[0,1,2].find(k=>hitR(p,linkR(k)));if(k!=null)drop(k);return false}
  if(v==='early'&&!S.calm){if(p.y>A.H*.8){S.hold='flag';S.flagX=p.x;A.redraw();return true}const i=nearPt(p.x);if(Math.abs(ptX(i)-p.x)<A.W*.06)plant(i);return false}
  if(v==='grow'){for(let i=0;i<3;i++){if(hitR(p,sideR(0,i)))tapThen(i);else if(hitR(p,sideR(1,i)))tapNow(i)}return false}
  if(v==='goal'&&S.gi<GOALS.length){if(hitR(p,goalR())){S.hold='goal';S.at=p;return true}const k=[0,1].find(k=>hitR(p,binR(k)));if(k!=null)sortG(k)}return false}
 function move(p){if(S.hold==='flag')S.flagX=hi(A.W*.06,lo(A.W*.96,p.x));else if(S.hold)S.at=p;A.redraw()}
 function up(p){const v=phase(),h=S.hold;S.hold=null;if(!h)return;
  if(h==='flag')return plant(nearPt(S.flagX));
  if(v==='chain'){const k=[0,1,2].find(k=>hitR(p,linkR(k)));if(k!=null)drop(k);else A.redraw()}
  if(v==='goal'){const k=[0,1].find(k=>hitR(p,binR(k)));if(k!=null)sortG(k);else A.redraw()}}
 A=FK.shell(c,{steps,ratio:.62,tall:1.3,draw,onStep:A=>{const q=A.step===5;quizBox.hidden=!q;keys.hidden=q;buttons()},
  init:A=>{const bx=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);quizBox=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up});buttons()}});
 A.start()})})();
