/* Flagship – looking after your mental health (16–18): drag along two mood diaries to tell an everyday dip from a low
   mood that lasts two weeks, sort signs of anxiety and low mood, set sleep and activity into their healthy ranges,
   empty a stress bucket with coping that works (and watch quick fixes refill it), and match each situation to the
   right route to help (GP, 111, Samaritans, 999, school counsellor). */
(()=>{const lim=(v,a,b)=>v<a?a:v>b?b:v,DAYS=21,LOW=4;
 const DIARY=[{who:'Ali',mood:[7,6,7,7,6,7,7,3,2,3,5,6,7,6,7,7,6,7,7,6,7],ans:0,why:'Ali dipped for three days after a break-up, then bounced back. That is an everyday low.'},
  {who:'Bea',mood:[7,6,7,6,3,3,2,3,2,2,3,3,2,2,3,2,3,2,2,3,2],ans:1,why:'Bea has been low for 17 days in a row. Two weeks or more is the point to get support.'}];
 const SIGNS=[['Racing heart, feeling on edge',0],['Worrying about what might go wrong, and it is hard to stop',0],['Nothing feels enjoyable any more',1],
  ['Feeling hopeless about the future',1],['Trouble sleeping',2],['Hard to concentrate',2]];
 const BINS=['Anxiety','Low mood','Both'];
 const BINWHY=['Worry that is hard to control, with a body on high alert, points to anxiety.','Losing enjoyment and hope points to low mood or depression.','Poor sleep and focus show up in both anxiety and low mood.'];
 const TAPS=[['Talk it through with someone',1,-20],['Go for a walk or a run',1,-15],['Break the task into small steps',1,-15],['Drink alcohol to relax',0,'Alcohol eases it for an evening, then low mood and worry come back stronger.'],
  ['Avoid everything that worries you',0,'Avoiding feels better now, but the fear grows. Small steps towards it shrink it.'],['Scroll in bed till 2 am',0,'Lost sleep makes stress harder to cope with tomorrow.']];
 const ROUTE=['GP','NHS 111, mental health option','Samaritans 116 123','999 or A&E','School or college counsellor'];
 const CASE=[['Low for three weeks, and the things you try are not helping',0],['You need urgent help today, but nobody is in danger',1],['You want to talk to someone at 3 am, any worry at all',2],
  ['You do not feel you can keep yourself safe right now',3],['Exams are getting on top of you and you want support at school',4]];
VIS.reg('flagwell',c=>{let A,keys,quiz,read;
 const W0={who:0,cur:0,judged:[],slip:null,sorted:[],now:0,sleep:6,act:20,grab:null,lvl:85,used:[],cases:0,ver:0,fin:()=>{},icon:null};
 const st=()=>['diary','signs','habits','bucket','route','quiz'][A.step];
 const px=n=>A.narrow?n:n+2;
 function say(x,s,X,Y,n,k,b,al){x.font=`${b||700} ${px(n)}px system-ui,sans-serif`;x.textAlign=al||'center';x.textBaseline='middle';x.fillStyle=k;x.fillText(s,X,Y)}
 function fit(x,s,R,n,k){x.font=`700 ${px(n)}px system-ui,sans-serif`;const out=[];let ln='';s.split(' ').forEach(w=>{const t=ln?ln+' '+w:w;if(ln&&x.measureText(t).width>R.w-16){out.push(ln);ln=w}else ln=t});out.push(ln);
  const h=px(n)*1.24;out.forEach((l,i)=>say(x,l,R.x+R.w/2,R.y+R.h/2+(i-(out.length-1)/2)*h,n,k))}
 function tile(x,R,k,thick,a){x.fillStyle=A.mix(A.col.pn,k,a==null?.12:a);A.paint.rrect(R.x,R.y,R.w,R.h,11);x.fill();x.lineWidth=thick?3.5:1.4;x.strokeStyle=k;x.stroke()}
 const isIn=(p,R)=>!!R&&p.x>=R.x&&p.x<=R.x+R.w&&p.y>=R.y&&p.y<=R.y+R.h;
 const plot=()=>({x:34,y:A.H*.12,w:A.W-50,h:A.H*.46});
 const dayX=d=>{const P=plot();return P.x+P.w*d/(DAYS-1)};
 const run=(m,d)=>{let k=0;for(let i=d;i>=0&&m[i]<LOW;i--)k++;return k};
 const binR=b=>{const g=6,w=(A.W-4*g)/3;return{x:g+b*(w+g),y:A.H*.5,w,h:A.H*.46}};
 const bar=i=>({x:24,y:A.H*(.2+i*.36),w:A.W-48,h:A.H*.07});
 const tapR=i=>{const g=8,w=(A.W-3*g)/2,h=A.H*.11;return{x:g+(i%2)*(w+g),y:A.H*.58+Math.floor(i/2)*(h+g),w,h}};
 const routeR=i=>{const h=A.H*.1;return{x:12,y:A.H*.38+i*(h+6),w:A.W-24,h}};
 function diaryD(x){const C=A.col,P=plot(),D=DIARY[W0.who],m=D.mood,d=W0.cur;
  say(x,`${D.who}’s mood diary, 3 weeks`,A.W/2,A.H*.05,14,C.tx,800);
  x.fillStyle=A.alpha(C.rd,.1);const yL=P.y+P.h*(1-LOW/10);x.fillRect(P.x,yL,P.w,P.y+P.h-yL);say(x,'low',P.x+4,yL+12,10,C.rd,700,'left');
  x.strokeStyle=A.alpha(C.mu,.5);x.lineWidth=1;x.strokeRect(P.x,P.y,P.w,P.h);
  x.beginPath();m.forEach((v,i)=>{const X=dayX(i),Y=P.y+P.h*(1-v/10);i?x.lineTo(X,Y):x.moveTo(X,Y)});x.strokeStyle=C.vi;x.lineWidth=3;x.stroke();
  m.forEach((v,i)=>{A.paint.ball(dayX(i),P.y+P.h*(1-v/10),i===d?7:4,v<LOW?C.rd:C.cy)});
  const X=dayX(d);x.strokeStyle=C.am;x.lineWidth=2;x.setLineDash([5,4]);x.beginPath();x.moveTo(X,P.y-6);x.lineTo(X,P.y+P.h+6);x.stroke();x.setLineDash([]);
  say(x,'◆ drag',lim(X,30,A.W-30),P.y+P.h+18,11,C.am,800);
  const k=run(m,d);say(x,`Day ${d+1}: mood ${m[d]}/10. Low days in a row: ${k}`,A.W/2,A.H*.7,13,k>=14?C.rd:C.tx,800);
  const j=W0.judged[W0.who];if(j!=null)say(x,j?'✓ Time to get support':'✓ Everyday dip',A.W/2,A.H*.8,14,C.gr,800);
  say(x,`Diaries judged: ${W0.judged.filter(v=>v!=null).length} of 2`,A.W/2,A.H*.9,12,C.mu,700)}
 function signsD(x){const C=A.col;const R={x:16,y:A.H*.08,w:A.W-32,h:A.H*.3};
  if(W0.now<SIGNS.length){tile(x,R,W0.slip!=null?C.rd:C.vi,1,.2);fit(x,'“'+SIGNS[W0.now][0]+'”',R,14,C.tx);say(x,`Sign ${W0.now+1} of 6: which does it point to?`,A.W/2,A.H*.43,12,C.mu,700)}
  else say(x,'All six sorted',A.W/2,A.H*.23,16,C.gr,800);
  BINS.forEach((b,i)=>{const B=binR(i);tile(x,B,[C.am,C.cy,C.vi][i],0,.08);say(x,b,B.x+B.w/2,B.y+16,13,C.tx,900);
   W0.sorted.filter(s=>SIGNS[s][1]===i).forEach((s,j)=>fit(x,'✓ '+SIGNS[s][0],{x:B.x,y:B.y+30+j*(B.h-34)/2,w:B.w,h:(B.h-34)/2},10,C.mu))})}
 function slider(x,i,lab,v,lo,hi,a,b,unit){const C=A.col,R=bar(i),f=t=>R.x+R.w*(t-lo)/(hi-lo),ok=v>=a&&v<=b;
  say(x,`${lab}: ${v} ${unit}`,A.W/2,R.y-A.H*.07,14,ok?C.gr:C.tx,800);
  x.fillStyle=A.alpha(C.mu,.2);A.paint.rrect(R.x,R.y,R.w,R.h,R.h/2);x.fill();x.fillStyle=A.alpha(C.gr,.35);x.fillRect(f(a),R.y,f(b)-f(a),R.h);
  say(x,'healthy',(f(a)+f(b))/2,R.y+R.h+12,10,C.gr,700);say(x,String(lo),R.x,R.y+R.h+12,10,C.mu,700);say(x,String(hi),R.x+R.w,R.y+R.h+12,10,C.mu,700);
  A.paint.ball(f(v),R.y+R.h/2,R.h*.75,ok?C.gr:C.am)}
 function habitsD(x){slider(x,0,'Sleep each night',W0.sleep,4,12,8,10,'hours');slider(x,1,'Active each day',W0.act,0,120,60,120,'minutes');
  say(x,'Drag each knob, or use the buttons',A.W/2,A.H*.93,11,A.col.mu,700)}
 function bucketD(x){const C=A.col,bw=A.W*.42,bx=(A.W-bw)/2,by=A.H*.05,bh=A.H*.42,f=W0.lvl/100,line=by+bh*.3;
  x.fillStyle=A.alpha(W0.lvl>70?C.rd:W0.lvl>40?C.am:C.gr,.55);x.fillRect(bx+4,by+bh*(1-f),bw-8,bh*f);
  x.strokeStyle=C.tx;x.lineWidth=3;x.beginPath();x.moveTo(bx,by);x.lineTo(bx+6,by+bh);x.lineTo(bx+bw-6,by+bh);x.lineTo(bx+bw,by);x.stroke();
  x.setLineDash([6,4]);x.strokeStyle=C.rd;x.beginPath();x.moveTo(bx-8,line);x.lineTo(bx+bw+8,line);x.stroke();x.setLineDash([]);say(x,'overflow',bx+bw+10,line-10,10,C.rd,700,'left');
  say(x,`Stress: ${Math.round(W0.lvl)}%`,A.W/2,by+bh+16,13,C.tx,800);
  TAPS.forEach(([s],i)=>{const R=tapR(i),on=W0.used.includes(i),bad=W0.slip===i;tile(x,R,on?C.gr:bad?C.rd:C.cy,on||bad,on?.26:.1);fit(x,(on?'✓ ':bad?'✗ ':'')+s,R,11,C.tx)})}
 function routeD(x){const C=A.col,R={x:12,y:A.H*.04,w:A.W-24,h:A.H*.27};
  if(W0.cases<CASE.length){tile(x,R,W0.slip!=null?C.rd:C.vi,1,.2);fit(x,CASE[W0.cases][0],R,13,C.tx);say(x,`Situation ${W0.cases+1} of 5: where should you go?`,A.W/2,A.H*.34,12,C.mu,700)}
  else say(x,'All five matched',A.W/2,A.H*.17,16,C.gr,800);
  ROUTE.forEach((r,i)=>{const B=routeR(i),done=CASE.slice(0,W0.cases).some(c=>c[1]===i);tile(x,B,done?C.gr:C.cy,done,done?.24:.1);fit(x,(done?'✓ ':'')+r,B,12,C.tx)})}
 function draw(A){const{ctx:x,W,H,col:C}=A;x.fillStyle=A.mix(C.pn,'#dcfce7',C.dark?.05:.3);x.fillRect(0,0,W,H);
  const f={diary:diaryD,signs:signsD,habits:habitsD,bucket:bucketD,route:routeD}[st()];if(f)f(x);else say(x,W0.icon||'🌱',W/2,H/2,Math.min(W,H)*.22,'#000');A.fx.draw(x)}
 function oops(i,s){A.sound.miss();W0.slip=i;setTimeout(()=>{W0.slip=null;A.redraw()},750);tell(s)}
 function scrub(d){W0.cur=lim(Math.round(d),0,DAYS-1);A.redraw();tell()}
 function judge(v){const D=DIARY[W0.who];if(v!==D.ans){A.sound.miss();return tell(v?'Not yet: look how quickly the line climbs back. '+D.why:'Look again: the line stays in the low zone. '+D.why)}
  W0.judged[W0.who]=v;A.sound.pop();tell(D.why)}
 function pick(w){W0.who=w;W0.cur=0;tell()}
 function bin(b){if(W0.now>=SIGNS.length)return;const want=SIGNS[W0.now][1];if(b!==want)return oops(1,'Not quite. '+BINWHY[want]);W0.sorted.push(W0.now);W0.now++;A.sound.pop();tell(BINWHY[b])}
 function setS(v){W0.sleep=lim(Math.round(v*2)/2,4,12);tell()}
 function setA(v){W0.act=lim(Math.round(v/5)*5,0,120);tell()}
 function tap(i){if(W0.used.includes(i))return;const[s,good,d]=TAPS[i];const v=W0.ver;if(good){W0.used.push(i);A.sound.pop();A.tween(W0,{lvl:lim(W0.lvl+d,0,100)},500,'out');setTimeout(()=>{if(v===W0.ver)tell(s+' drains the bucket for real.')},560);return tell(s+' drains the bucket for real.')}
  A.tween(W0,{lvl:lim(W0.lvl-8,0,100)},300,'out');setTimeout(()=>{if(v===W0.ver){A.tween(W0,{lvl:lim(W0.lvl+20,0,100)},600,'out');setTimeout(()=>{if(v===W0.ver)tell(d)},660)}},700);oops(i,d)}
 function go2(r){if(W0.cases>=CASE.length)return;const want=CASE[W0.cases][1];if(r!==want)return oops(1,`Not the best fit. This one is for ${ROUTE[want]}.`);W0.cases++;A.sound.pop();tell(`Yes: ${ROUTE[r]}.`)}
 function tell(m){const k=st();let s;
  if(k==='diary'){const D=DIARY[W0.who];s=`${D.who}, day ${W0.cur+1}: mood ${D.mood[W0.cur]} of 10, ${run(D.mood,W0.cur)} low days in a row. Judged ${W0.judged.filter(v=>v!=null).length} of 2.`}
  else if(k==='signs')s=W0.now<6?`Sign: ${SIGNS[W0.now][0]}. ${W0.now} of 6 sorted.`:'All six signs sorted.';
  else if(k==='habits')s=`Sleep ${W0.sleep} hours, healthy is 8 to 10. Activity ${W0.act} minutes a day, healthy is 60 or more.`;
  else if(k==='bucket')s=`Stress bucket ${Math.round(W0.lvl)}% full. Helpful coping used: ${W0.used.length} of 3.`;
  else if(k==='route')s=W0.cases<5?`Situation: ${CASE[W0.cases][0]}. ${W0.cases} of 5 matched.`:'All five situations matched.';else s='Challenge time.';
  s=(m?m+' ':'')+s;c.say(s);A.cv.setAttribute('aria-label',s);if(read)read.textContent=s;pads();W0.fin()}
 function pads(){if(!A||!keys)return;keys.innerHTML='';const k=st();
  const add=(s,f,lab,off)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':lab||null},keys,s);e.disabled=!!off;e.onclick=f};
  if(k==='diary'){DIARY.forEach((D,w)=>add(D.who+'’s diary',()=>pick(w),'Show '+D.who+'’s diary',W0.who===w));add('◀ Day',()=>scrub(W0.cur-1),'Previous day');add('Day ▶',()=>scrub(W0.cur+1),'Next day');
   add('Everyday dip',()=>judge(0),'Judge: everyday dip');add('Time to get support',()=>judge(1),'Judge: time to get support')}
  if(k==='signs'&&W0.now<6)BINS.forEach((b,i)=>add(b,()=>bin(i),'Points to '+b));
  if(k==='habits'){add('Sleep −',()=>setS(W0.sleep-.5),'Less sleep');add('Sleep +',()=>setS(W0.sleep+.5),'More sleep');add('Active −',()=>setA(W0.act-10),'Less activity');add('Active +',()=>setA(W0.act+10),'More activity')}
  if(k==='bucket')TAPS.forEach(([s],i)=>add(s,()=>tap(i),'Try: '+s,W0.used.includes(i)||W0.lvl<40));
  if(k==='route'&&W0.cases<5)ROUTE.forEach((r,i)=>add(r,()=>go2(i),'Go to '+r));A.redraw()}
 const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg()+A.reveal(n))};
 const chain=(fs,ms)=>{const v=W0.ver;fs.forEach((f,j)=>setTimeout(()=>{if(v===W0.ver)f()},A.reduced()?j*25:j*ms))};
 const wipe=()=>{W0.ver++;W0.fin=()=>{};W0.icon=null;W0.slip=null;W0.grab=null};
 const steps=[
  {h:'A dip or something more?',p:'Everyone has low days. Drag along each mood diary and count the low days in a row. Then judge each one.',
   predict:{q:'Ali felt very low for three days after a break-up, then picked up. Is that a sign of depression?',opts:['Yes: very low is very low','No: it lifted within days'],ans:1},task:'Judge both diaries',
   show:()=>{steps[0].go();chain([()=>scrub(9),()=>judge(0),()=>pick(1),()=>scrub(20),()=>judge(1)],600)},go:()=>{wipe();W0.who=0;W0.cur=0;W0.judged=[];tell();W0.fin=fin(0,()=>W0.judged[0]===0&&W0.judged[1]===1,()=>'A low mood that lifts in days is normal. Low for two weeks or more, or getting in the way of life, is the time to get support.')}},
  {h:'Name the signs',p:'Anxiety and low mood are the most common mental-health difficulties. Sort each sign by what it points to.',
   predict:{q:'Can anxiety and low mood happen at the same time?',opts:['No: it is one or the other','Yes: they often go together'],ans:1},task:'Sort all six signs',
   show:()=>{steps[1].go();chain(SIGNS.map(s=>()=>bin(s[1])),450)},go:()=>{wipe();W0.now=0;W0.sorted=[];tell();W0.fin=fin(1,()=>W0.now>=6,()=>'Hard-to-stop worry and a racing body point to anxiety; no enjoyment and no hope point to low mood. Sleep and focus suffer in both, and many people have both.')}},
  {h:'Habits that hold you up',p:'Sleep and moving your body protect your mood. Drag each knob into its healthy range for someone aged 16 to 18.',
   predict:{q:'How much sleep does a 16 to 18 year old need each night?',opts:['About 6 hours','8 to 10 hours'],ans:1},task:'Set sleep and activity into the healthy ranges',
   show:()=>{steps[2].go();chain([()=>setS(7),()=>setS(8.5),()=>setA(40),()=>setA(60)],400)},go:()=>{wipe();W0.sleep=6;W0.act=20;tell();W0.fin=fin(2,()=>W0.sleep>=8&&W0.sleep<=10&&W0.act>=60,()=>'Teens need 8 to 10 hours of sleep and about 60 minutes of activity a day on average. Both lift mood and help you cope.')}},
  {h:'Empty the stress bucket',p:'Stress fills your bucket. Good coping lets it drain. Some quick fixes seem to help, then fill it up again. Try them.',
   predict:{q:'You avoid everything that makes you anxious. Over time, what happens to the anxiety?',opts:['It goes away','It grows'],ans:1},task:'Get the bucket below 40% with three helpful habits',
   show:()=>{steps[3].go();chain([0,1,2].map(i=>()=>tap(i)),600)},go:()=>{wipe();W0.lvl=85;W0.used=[];tell();W0.fin=fin(3,()=>W0.used.length>=3&&W0.lvl<=40,()=>'Talking, moving and breaking tasks down really drain stress. Alcohol, avoiding and late-night scrolling feel good briefly, then refill it.')}},
  {h:'Know where to go',p:'Getting help early works best. Match each situation to the right place.',task:'Match all five situations',
   show:()=>{steps[4].go();chain(CASE.map(cs=>()=>go2(cs[1])),450)},go:()=>{wipe();W0.cases=0;tell();W0.fin=fin(4,()=>W0.cases>=5,()=>'GP for low mood that lasts, 111 for urgent help, Samaritans to talk any time, 999 if life is at risk, and your school or college counsellor for support there.')}},
  {h:'Challenge',p:'',go:()=>{wipe();pose()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>W0.fin()});
 const QS=[['You have felt flat for four days since a bad exam result, but you are still enjoying football. What is this most likely to be?','📉',[['An everyday dip that should lift: keep an eye on it','ok'],['Depression: see a GP today','panic'],['Nothing you should ever think about','ignore']]],
  ['You have had no enjoyment in anything for over two weeks and sleep badly. What should you do?','🩺',[['Book a GP appointment, and tell someone you trust','ok'],['Wait a few more months','months'],['Drink to help you sleep','drink']]],
  ['Before a party you feel sick with worry, so you plan to skip all parties from now on. Good plan?','🎉',[['No: avoiding feeds anxiety; go for a short time and build up','ok'],['Yes: avoiding keeps you safe','avoid'],['Yes, and stay home from school too','school']]],
  ['It is 2 am and you need to talk to someone right now, but nobody is in danger. Who can you call?','📞',[['Samaritans on 116 123, free and any time','ok'],['999 straight away','nine'],['Nobody: wait until morning','nobody']]],
  ['Which week is best for your mood?','🛌',[['8 to 10 hours of sleep, and about an hour a day of activity','ok'],['5 hours of sleep, made up with a weekend lie-in','liein'],['No exercise so you have more time to revise','revise']]]];
 let qi=-1,streak=0;
 function pose(){qi++;const[q,ic,ops]=QS[qi%QS.length],r=qi%3;W0.icon=ic;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>grade(t)});c.say('Challenge: '+q);A.redraw()}
 function grade(t){quiz.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';let m='Right.';
  if(t==='panic')m='A few low days after a setback, while you still enjoy things, is normal. Two weeks or more is the line.';
  if(t==='ignore')m='Do notice it. If it lasts two weeks or starts to get in the way, get support.';
  if(t==='months')m='Waiting lets it settle in. Over two weeks with no enjoyment is the time to see a GP.';
  if(t==='drink')m='Alcohol worsens sleep and low mood. Talk to a GP instead.';
  if(t==='avoid')m='Avoiding makes the fear bigger over time. Small steps towards it shrink it.';
  if(t==='school')m='Avoiding more of life grows anxiety. Take small steps, and talk to someone.';
  if(t==='nine')m='999 is for when a life is at risk. To talk any time, Samaritans are there on 116 123.';
  if(t==='nobody')m='You do not have to wait. Samaritans answer 24 hours a day.';
  if(t==='liein')m='A weekend lie-in does not undo a week of 5-hour nights. Teens need 8 to 10 hours each night.';
  if(t==='revise')m='Activity helps mood and focus, so it supports revision rather than stealing from it.';
  if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}
 function down(p){const k=st();
  if(k==='diary'){const P=plot();if(isIn(p,{x:P.x-14,y:P.y-14,w:P.w+28,h:P.h+40})){W0.grab='day';scrub((p.x-P.x)/P.w*(DAYS-1));return true}return false}
  if(k==='signs'){const b=[0,1,2].find(i=>isIn(p,binR(i)));if(b!=null)bin(b);return false}
  if(k==='habits'){for(const i of[0,1]){const R=bar(i);if(isIn(p,{x:R.x-14,y:R.y-20,w:R.w+28,h:R.h+40})){W0.grab=i;move(p);return true}}return false}
  if(k==='bucket'){const i=TAPS.findIndex((t,i)=>isIn(p,tapR(i)));if(i>=0&&W0.lvl>40)tap(i);return false}
  if(k==='route'){const i=ROUTE.findIndex((r,i)=>isIn(p,routeR(i)));if(i>=0)go2(i);return false}return false}
 function move(p){if(W0.grab==null)return;if(W0.grab==='day'){const P=plot();return scrub((p.x-P.x)/P.w*(DAYS-1))}
  const R=bar(W0.grab),t=lim((p.x-R.x)/R.w,0,1);if(W0.grab===0)setS(4+t*8);else setA(t*120)}
 function up(){W0.grab=null}
 A=FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:A=>{const q=A.step===5;quiz.hidden=!q;read.hidden=q;keys.hidden=q;pads()},
  init:A=>{const E=c.el,hold=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
   keys=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},hold);quiz=E('div',{class:'fl-chal'},A.below);
   A.gest({down,move,up});pads()}});
 A.start()})})();
