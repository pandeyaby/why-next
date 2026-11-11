/* Flagship – good and bad stress (11–12). */
(()=>{const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 const PARTS=[['👁️','Eyes','Pupils widen to let in more light.',.5,.06],['🫁','Lungs','You breathe faster to take in more oxygen.',.36,.38],
  ['❤️','Heart','It beats faster to pump blood to your muscles.',.62,.38],['💪','Muscles','They tense up, ready to run or fight.',.2,.56],
  ['🍽️','Stomach','Digestion slows down, so energy goes to muscles. That is the butterflies feeling.',.5,.6]];
 const DIAL=[['How big, compared with what I can handle?',['Too easy','A stretch','Hard but doable','Too much','Impossible']],
  ['How long does it last?',['Minutes','Hours','A few days','Weeks','Months']],['How much control or help do I have?',['None','A little','Some','Lots','Full']]];
 const REC=[['😴','Sleep 9 hours',1],['⚽','Walk or play sport',1],['🗣️','Talk to a friend',1],['📱','Scroll till 1 am',0],['🥤','Energy drink',0]];
 const RECWHY=['Sleep lets the stress hormones fall back and resets your mood.','Moving your body uses up the stress hormones.','Sharing it makes the load lighter and helps you think.',
  'Late screens cut sleep, so the alarm stays on.','Caffeine pushes the alarm up, not down.'];
 const TOOLS=[['Exercise','Uses up stress hormones and helps you sleep'],['Slow breathing','A long out-breath tells your heart to slow down'],
  ['Talking to someone','Shares the load and helps you see it another way'],['Writing worries down','Gets them out of your head so you can sort them']];
VIS.reg('flagstress',c=>{let A,pad,chal,read;
 const S={alarm:0,seen:[],d:[4,1,1],good:0,gaps:[null,null,null],gi:0,chip:null,ti:null,pairs:[],rorder:[2,0,3,1],br:0,hold:0,t0:0,calm:0,miss:null,em:null,gen:0,check:()=>{},drag:null};
 const mode=()=>['body','dial','time','match','breath','quiz'][A.step];
 function put(x,s,X,Y,n,k,w,al){x.font=`${w||700} ${A.narrow?n:n+2}px system-ui,sans-serif`;x.textAlign=al||'center';x.textBaseline='middle';x.fillStyle=k;x.fillText(s,X,Y)}
 function para(x,s,R,n,k){x.font=`700 ${A.narrow?n:n+2}px system-ui,sans-serif`;const L=[];let row='';for(const v of s.split(' ')){const t=row?row+' '+v:v;if(row&&x.measureText(t).width>R.w-14){L.push(row);row=v}else row=t}L.push(row);
  const g=(A.narrow?n:n+2)*1.25;L.forEach((l,i)=>put(x,l,R.x+R.w/2,R.y+R.h/2+(i-(L.length-1)/2)*g,n,k))}
 function card(x,R,k,on,t){x.fillStyle=A.mix(A.col.pn,k,t==null?.14:t);A.paint.rrect(R.x,R.y,R.w,R.h,10);x.fill();x.lineWidth=on?3.5:1.4;x.strokeStyle=k;x.stroke()}
 const hit=(p,R)=>!!R&&p.x>R.x&&p.x<R.x+R.w&&p.y>R.y&&p.y<R.y+R.h;
 // ---- geometry ----
 const partP=i=>({x:A.W*(.5+(PARTS[i][3]-.5)*(A.narrow?1:.6)),y:A.H*(.14+PARTS[i][4]*.95)});
 const dialR=i=>({x:16,y:A.H*(.12+i*.24),w:A.W-32,h:A.H*.2});
 const knobX=(i,v)=>{const R=dialR(i);return R.x+20+(R.w-40)*v/4};
 const gapR=i=>{const w=A.W/7;return{x:w*(1.8+i*2),y:A.H*.1,w,h:A.H*.46}};
 const chipR=i=>{const N=A.narrow,per=N?3:5,g=6,w=(A.W-g*(per+1))/per,h=A.H*(N?.12:.15);return{x:g+(i%per)*(w+g),y:A.H*.64+Math.floor(i/per)*(h+g),w,h}};
 const toolR=(i,side)=>{const g=8,w=(A.W-g*2-40)/2,h=A.H*.19;return{x:g+side*(w+40),y:A.H*.1+i*(h+6),w,h}};
 // ---- verdict for the dials ----
 function judge(){const[b,l,k]=S.d;if(b===0)return['😐','Bored: no challenge, so no boost.',0];if(b>=3)return['😰','Bad stress: far more than you can handle.',0];
  if(l>=3)return['😩','Bad stress: it goes on too long to recover.',0];if(k<=1)return['😟','Bad stress: you feel stuck with no control or help.',0];return['💪','Good stress: a stretch you can handle, with an end in sight.',1]}
 // ---- the stress-hormone line across the week ----
 function level(){const pts=[],peak=[1.5,3.5,5.5];let lv=.15;for(let t=0;t<=70;t++){const d=t/10;
   for(let k=0;k<3;k++){if(Math.abs(d-peak[k])<.3)lv=Math.min(1,lv+.08)}
   for(let k=0;k<3;k++){if(d>peak[k]+.3&&d<peak[k]+1.3){const r=S.gaps[k];if(r!=null&&REC[r][2])lv=Math.max(.15,lv-.08);else if(r!=null)lv=Math.min(1,lv+.01)}}
   pts.push(lv)}return pts}
 function bodyD(x){const C=A.col,cx=A.W/2,u=Math.min(A.W,A.H)/400;
  x.fillStyle=A.mix(C.pn,C.cy,.25);x.beginPath();x.arc(cx,A.H*.2,44*u,0,7);x.fill();A.paint.rrect(cx-62*u,A.H*.2+50*u,124*u,A.H*.55,40*u);x.fill();const m=partP(3);x.lineWidth=26*u;x.lineCap='round';x.strokeStyle=x.fillStyle;x.beginPath();x.moveTo(cx-50*u,A.H*.2+70*u);x.lineTo(m.x,m.y);x.moveTo(cx+50*u,A.H*.2+70*u);x.lineTo(2*cx-m.x,m.y);x.stroke();
  put(x,S.alarm?'🚨 Alarm on: adrenaline and cortisol released':'Calm. Press “Set off the alarm”',cx,A.H*.04+8,12,S.alarm?C.rd:C.mu,800);
  PARTS.forEach((p,i)=>{const q=partP(i),on=S.seen.includes(i),r=26;x.fillStyle=on?A.alpha(C.rd,.25):A.alpha(C.tx,.08);x.beginPath();x.arc(q.x,q.y,r,0,7);x.fill();
   x.strokeStyle=on?C.rd:A.alpha(C.tx,.4);x.lineWidth=on?3:1.5;x.stroke();put(x,p[0],q.x,q.y+1,18,'#000');if(on)put(x,p[1],q.x,q.y+r+11,11,C.tx,800)})}
 function dialD(x){const C=A.col,[em,t,ok]=judge();put(x,'Football final',A.W/2,A.H*.05,13,C.tx,800);
  DIAL.forEach(([q,L],i)=>{const R=dialR(i),v=S.d[i],X=knobX(i,v);put(x,q,R.x+R.w/2,R.y+12,11,C.mu,700);x.strokeStyle=A.alpha(C.tx,.25);x.lineWidth=8;x.lineCap='round';
   x.beginPath();x.moveTo(R.x+20,R.y+R.h*.55);x.lineTo(R.x+R.w-20,R.y+R.h*.55);x.stroke();A.paint.ball(X,R.y+R.h*.55,15,ok?C.gr:C.rd);put(x,L[v],clamp(X,44,A.W-44),R.y+R.h*.55+26,12,C.tx,800)});
  card(x,{x:16,y:A.H*.84,w:A.W-32,h:A.H*.13},ok?C.gr:C.rd,1,.2);para(x,em+' '+t,{x:16,y:A.H*.84,w:A.W-32,h:A.H*.13},12,C.tx)}
 function timeD(x){const C=A.col,pts=level(),top=A.H*.1,h=A.H*.46,X=t=>A.W*t/70,Y=v=>top+h*(1-v);
  x.fillStyle=A.alpha(C.rd,.08);x.fillRect(0,Y(1),A.W,h*.35);put(x,'Alarm stuck on',8,Y(1)+h*.3,10,C.rd,800,'left');
  ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].forEach((d,i)=>put(x,d,A.W*(i+.5)/7,top+h+12,10,C.mu,700));
  [1.5,3.5,5.5].forEach((d,k)=>{const R=gapR(k),r=S.gaps[k];x.setLineDash(r==null?[5,4]:[]);x.strokeStyle=k===S.gi&&r==null?C.am:A.alpha(C.tx,.3);x.lineWidth=k===S.gi?3:1.5;A.paint.rrect(R.x,R.y,R.w,R.h,8);x.stroke();x.setLineDash([]);
   put(x,['Test','Row with a friend','Match'][k],A.W*d/7,top-10,10,C.tx,800);if(r!=null)put(x,REC[r][0],R.x+R.w/2,R.y+R.h-16,22,'#000')});
  x.strokeStyle=C.vi;x.lineWidth=3.5;x.beginPath();pts.forEach((v,t)=>t?x.lineTo(X(t),Y(v)):x.moveTo(X(t),Y(v)));x.stroke();
  REC.forEach((r,i)=>{const R=chipR(i),bad=S.miss===i;card(x,R,bad?C.rd:r[2]?C.gr:C.or,S.chip===i||bad,.16);para(x,r[0]+' '+r[1],R,11,C.tx)})}
 function matchD(x){const C=A.col;TOOLS.forEach((t,i)=>{const R=toolR(i,0),done=S.pairs.includes(i);card(x,R,done?C.gr:C.cy,S.ti===i,done?.26:.12);para(x,t[0],R,13,C.tx)});
  S.rorder.forEach((j,i)=>{const R=toolR(i,1),done=S.pairs.includes(j),bad=S.miss===j;card(x,R,done?C.gr:bad?C.rd:C.vi,bad,done?.26:.1);para(x,TOOLS[j][1],R,11,C.tx)});
  S.pairs.forEach(j=>{const a=toolR(j,0),b=toolR(S.rorder.indexOf(j),1);x.strokeStyle=C.gr;x.lineWidth=3;x.beginPath();x.moveTo(a.x+a.w,a.y+a.h/2);x.lineTo(b.x,b.y+b.h/2);x.stroke()})}
 function breathD(x,now){const C=A.col,cx=A.W/2,cy=A.H*.45,R0=Math.min(A.W,A.H)*.12,ph=S.hold?Math.min(1,(now-S.t0)/4000):S.out;
  const r=R0*(1+ph*1.2);x.fillStyle=A.alpha(C.cy,.25);x.beginPath();x.arc(cx,cy,r,0,7);x.fill();x.strokeStyle=C.cy;x.lineWidth=3;x.stroke();
  put(x,S.hold?'Breathe in… (4 s)':S.out>0?'Breathe out slowly…':S.br>2?'Calm now':'Press and hold to breathe in',cx,A.H*.78,13,C.tx,800);
  const hr=['Racing','Fast','Easing','Calm'][Math.min(3,S.br)],beat=1+.08*Math.sin(now/(S.br>=3?260:120));put(x,'❤️',A.W*.15,A.H*.12,22*beat,'#000');put(x,'Heart: '+hr,A.W*.15+18,A.H*.12,12,C.tx,800,'left');
  put(x,`Slow breaths: ${S.br} of 3`,cx,A.H*.88,13,S.br>=3?C.gr:C.mu,800)}
 function draw(A,dt){const{ctx:x,W,H,col:C}=A;x.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.35);x.fillRect(0,0,W,H);
  const f={body:bodyD,dial:dialD,time:timeD,match:matchD,breath:breathD}[mode()];if(f)f(x,performance.now());else put(x,S.em||'🧠',W/2,H/2,Math.min(W,H)*.2,'#000');A.fx.draw(x)}
 // ---- actions ----
 function flash(i,s){A.sound.miss();S.miss=i;setTimeout(()=>{S.miss=null;A.redraw()},800);note(s)}
 function alarm(){if(S.alarm)return;S.alarm=1;A.sound.whoosh();note('A dog barks behind you! Now tap each body part.')}
 function part(i){if(!S.alarm)return note('Set off the alarm first.');if(S.seen.includes(i))return;S.seen.push(i);A.sound.pop();note(PARTS[i][1]+': '+PARTS[i][2])}
 function dial(i,v){S.d[i]=clamp(v,0,4);A.sound.tick();note(judge()[1])}
 function place(k,r){if(S.gaps[k]!=null&&REC[S.gaps[k]][2])return;S.gaps[k]=r;S.chip=null;if(!REC[r][2]){flash(r,RECWHY[r]);return}A.sound.pop();
  S.gi=S.gaps.findIndex(g=>g==null||!REC[g][2]);note(RECWHY[r])}
 function tool(i){S.ti=i;A.sound.tick();note('Now pick the reason '+TOOLS[i][0].toLowerCase()+' works.')}
 function reason(j){if(S.ti==null)return note('Pick a tool on the left first.');if(S.pairs.includes(j))return;if(j!==S.ti){const t=S.ti;S.ti=null;return flash(j,`Not quite: that is why ${TOOLS[j][0].toLowerCase()} works, not ${TOOLS[t][0].toLowerCase()}.`)}
  S.pairs.push(j);S.ti=null;A.sound.pop();note(TOOLS[j][0]+' works because it '+TOOLS[j][1].toLowerCase()+'.')}
 function inhale(){if(S.br>=3||S.hold)return;S.hold=1;S.t0=performance.now();S.out=0;A.kick()}
 function exhale(fast){if(!S.hold)return;const held=performance.now()-S.t0;S.hold=0;
  if(held<2500&&!fast){A.sound.miss();S.out=0;return note('Too quick. Breathe in for about 4, then out for longer.')}
  S.out=1;A.tween(S,{out:0},fast?500:6000,'io');S.br++;A.sound.pop();note(S.br>=3?'Three slow breaths. Your heart has slowed.':'Good: out for longer than in. Again.')}
 function note(m){const k=mode();let s;
  if(k==='body')s=`Alarm ${S.alarm?'on':'off'}. Body parts checked: ${S.seen.map(i=>PARTS[i][1]).join(', ')||'none'}.`;
  else if(k==='dial')s='Dials: '+DIAL.map((d,i)=>d[1][S.d[i]]).join(', ')+'. '+judge()[1];
  else if(k==='time')s='Recovery in each gap: '+S.gaps.map((g,i)=>`gap ${i+1} ${g==null?'empty':REC[g][1]}`).join(', ')+'.';
  else if(k==='match')s=`Matched ${S.pairs.length} of 4: `+(S.pairs.map(j=>TOOLS[j][0]).join(', ')||'none')+'.';
  else if(k==='breath')s=`Slow breaths: ${S.br} of 3.`;else s='Challenge time.';
  s=(m?m+' ':'')+s;c.say(s);A.cv.setAttribute('aria-label',s);if(read)read.textContent=m||'';controls();A.redraw();S.check()}
 function controls(){if(!A||!pad)return;pad.innerHTML='';const k=mode(),b=(t,f,lb,off)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':lb||null},pad,t);e.disabled=!!off;e.onclick=f;return e};
  if(k==='body'){b('🚨 Set off the alarm',alarm,null,S.alarm);PARTS.forEach((p,i)=>b(p[0]+' '+p[1],()=>part(i),'Check the '+p[1],S.seen.includes(i)))}
  if(k==='dial')DIAL.forEach((d,i)=>{const n=['Size','Length','Control'][i];b('− '+n,()=>dial(i,S.d[i]-1),'Lower: '+d[0],S.d[i]===0);b('+ '+n,()=>dial(i,S.d[i]+1),'Raise: '+d[0],S.d[i]===4)});
  if(k==='time')REC.forEach((r,i)=>b(r[0]+' '+r[1],()=>place(S.gi,i),`Put ${r[1]} in gap ${S.gi+1}`,S.gi<0));
  if(k==='match'){TOOLS.forEach((t,i)=>b(t[0],()=>tool(i),'Tool: '+t[0],S.pairs.includes(i)));S.rorder.forEach(j=>b(TOOLS[j][1],()=>reason(j),'Reason: '+TOOLS[j][1],S.pairs.includes(j)))}
  if(k==='breath'){const e=b('Hold to breathe in, let go to breathe out',()=>{},null,S.br>=3);e.onpointerdown=inhale;e.onpointerup=e.onpointerleave=()=>exhale();
   e.onkeydown=ev=>{if((ev.key===' '||ev.key==='Enter')&&!ev.repeat){ev.preventDefault();inhale()}};e.onkeyup=ev=>{if(ev.key===' '||ev.key==='Enter')exhale()}}}
 const when=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg()+A.reveal(n))};
 const play=(fs,ms)=>{const g=S.gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===S.gen)f()},j*ms))};
 const reset=()=>{S.gen++;S.check=()=>{};S.em=null;S.miss=null;S.drag=null;S.chip=null;S.ti=null;S.hold=0;S.out=0};
 const steps=[
  {h:'Your body’s alarm',p:'When something stresses you, your brain sets off an alarm. Adrenaline and cortisol flood your body to get you ready to fight, run or freeze. Set it off, then tap each body part.',
   predict:{q:'When the alarm goes off, what happens to digestion in your stomach?',opts:['It speeds up','It slows down','Nothing changes'],ans:1},task:'Set off the alarm and check all five body parts',
   show:()=>{steps[0].go();play([alarm,...PARTS.map((p,i)=>()=>part(i))],400)},go:()=>{reset();S.alarm=0;S.seen=[];note();S.check=when(0,()=>S.seen.length>=5,()=>'Faster heart and breathing, tense muscles, wide pupils and slow digestion: your body is ready for action.')}},
  {h:'Good or bad stress?',p:'The same event can help or harm. Drag the dials, or use − and +. Change what you can to turn it into good stress.',
   predict:{q:'Is stress always bad for you?',opts:['Yes: all stress harms you','No: short stress you can handle helps you perform'],ans:1},task:'Turn the final into good stress',
   show:()=>{steps[1].go();play([()=>dial(0,3),()=>dial(0,2),()=>dial(2,2),()=>dial(2,3)],450)},go:()=>{reset();S.d=[4,1,1];note();S.check=when(1,()=>judge()[2]===1,()=>'Practice made it doable and a plan gave you control: a stretch with an end in sight is good stress.')}},
  {h:'Let the alarm switch off',p:'This week has three stressful days. The purple line is your stress hormones. Drag a chip into each dashed gap, or tap a chip.',
   predict:{q:'Which is worse for your body?',opts:['One very stressful day','Medium stress that never lets up for weeks'],ans:1},task:'Bring the line back down after all three days',
   show:()=>{steps[2].go();play([()=>place(0,0),()=>place(1,1),()=>place(2,2)],500)},go:()=>{reset();S.gaps=[null,null,null];S.gi=0;note();S.check=when(2,()=>S.gaps.every(g=>g!=null&&REC[g][2]),()=>'Each spike came back down. Stress with no recovery wears down sleep, mood and health.')}},
  {h:'Why it works',p:'Knowing why a tool works helps you pick the right one. Tap a tool, then the reason it works.',task:'Match all four tools to their reasons',
   show:()=>{steps[3].go();play([0,1,2,3].flatMap(i=>[()=>tool(i),()=>reason(i)]),280)},go:()=>{reset();S.pairs=[];note();S.check=when(3,()=>S.pairs.length>=4,()=>'Now you can explain why each one helps.')}},
  {h:'Breathe it down',p:'Slow breathing with a longer out-breath calms the alarm. Press and hold the canvas or the button to breathe in for about 4 seconds, then let go and breathe out slowly.',
   predict:{q:'Which kind of breathing calms you most?',opts:['Fast, deep breaths','Slow breaths, out for longer than in','Holding your breath'],ans:1},task:'Take three slow breaths',
   show:()=>{steps[4].go();play([0,1,2].flatMap(()=>[inhale,()=>exhale(1)]),450)},go:()=>{reset();S.br=0;note();S.check=when(4,()=>S.br>=3,()=>'A long out-breath slows your heart. You can do it anywhere, even in an exam.')}},
  {h:'Challenge',p:'',go:()=>{reset();ask()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
 const QS=[['Mia has a test in ten minutes. Her heart is racing and she has butterflies. What is going on?','📝',[['Her alarm is getting her ready; short stress like this can help her focus','ok'],['She must be ill and should go home','ill'],['All stress is harmful, so the test will go badly','allbad']]],
  ['Which is most likely to harm someone’s health?','⏳',[['Worry about home that has gone on for months','ok'],['A scary moment on a rollercoaster','short'],['Nerves before a race','short']]],
  ['Why does going for a run help with stress?','🏃',[['It uses up stress hormones and helps you sleep','ok'],['It only makes you too tired to think','tired'],['It does not help; it just hides the problem','nohelp']]],
  ['Leo has felt too stressed to sleep or enjoy anything for three weeks. What should he do?','🆘',[['Tell a trusted adult and get help','ok'],['Keep it to himself and push on','alone'],['Use energy drinks to keep going','drink']]],
  ['Sam has three homework deadlines and feels swamped. Which step gives back some control?','📋',[['Write a list and start the first small task','ok'],['Leave it all until the night before','avoid'],['Scroll on the phone to forget about it','scroll']]],
  ['A breath that calms you down is…','🌬️',[['Slow, with the out-breath longer than the in-breath','ok'],['Fast and deep','fast'],['Held in for as long as you can','hold']]]];
 let qi=-1,run=0;
 function ask(){qi++;const[q,em,ops]=QS[qi%QS.length],r=qi%3;S.em=em;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>mark(t)});c.say('Challenge: '+q);A.cv.setAttribute('aria-label','Challenge: '+q);A.redraw()}
 function mark(t){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';let m='Right.';
  if(t==='ill')m='Butterflies and a fast heart are the normal alarm, not illness. A little stress sharpens focus.';if(t==='allbad')m='Short stress you can handle often helps you perform. It is long or overwhelming stress that harms.';if(t==='short')m='A short scare passes and the alarm switches off. Stress that lasts for months, with no recovery, is what harms health.';if(t==='tired')m='It is not just tiredness: exercise uses up stress hormones and improves sleep.';if(t==='nohelp')m='Exercise really lowers stress hormones and helps sleep. It is a tool, not just a distraction.';if(t==='alone')m='Three weeks of no sleep or enjoyment is a sign to get help. Tell a parent, teacher or GP.';if(t==='drink')m='Energy drinks push the alarm up and spoil sleep. He needs a trusted adult.';if(t==='avoid')m='Putting it off makes the pressure build. Breaking it into small steps gives back control.';if(t==='scroll')m='Scrolling hides the worry for a while, but the deadlines stay and sleep suffers.';if(t==='fast')m='Fast breathing is what the alarm does. Slow it down, with a longer out-breath.';if(t==='hold')m='Holding your breath tenses you up. Breathe out slowly instead.';
  if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 function down(p){const k=mode();
  if(k==='body'){if(!S.alarm){alarm();return false}const i=PARTS.findIndex((q,i)=>{const P=partP(i);return Math.hypot(p.x-P.x,p.y-P.y)<34});if(i>=0)part(i);return false}
  if(k==='dial'){const i=[0,1,2].findIndex(i=>hit(p,dialR(i)));if(i>=0){S.drag={i};move(p);return true}return false}
  if(k==='time'){const g=[0,1,2].findIndex(i=>hit(p,gapR(i)));if(g>=0){S.gi=g;note();return false}const i=REC.findIndex((r,i)=>hit(p,chipR(i)));if(i>=0){S.chip=i;S.drag={chip:i,p};A.redraw();return true}return false}
  if(k==='match'){const i=[0,1,2,3].findIndex(i=>hit(p,toolR(i,0)));if(i>=0){tool(i);return false}const j=[0,1,2,3].findIndex(i=>hit(p,toolR(i,1)));if(j>=0)reason(S.rorder[j]);return false}
  if(k==='breath'){inhale();S.drag={br:1};return true}return false}
 function move(p){const d=S.drag;if(!d)return;if(d.i!=null){const R=dialR(d.i),v=Math.round(clamp((p.x-R.x-20)/(R.w-40),0,1)*4);if(v!==S.d[d.i])dial(d.i,v)}else if(d.chip!=null){d.p=p;A.redraw()}}
 function up(){const d=S.drag;S.drag=null;if(!d)return;if(d.br)return exhale();if(d.chip!=null){const g=[0,1,2].findIndex(i=>hit(d.p,gapR(i)));if(g>=0)place(g,d.chip);else if(S.gi>=0&&hit(d.p,chipR(d.chip)))place(S.gi,d.chip);A.redraw()}}
 A=FK.shell(c,{steps,ratio:.66,tall:1.25,draw,onStep:A=>{const q=A.step===5;chal.hidden=!q;read.hidden=q;pad.hidden=q;controls()},
  init:A=>{const E=c.el,box=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},box);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},box);chal=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});
   A.every(()=>mode()==='breath');controls()}});
 A.start()})})();
