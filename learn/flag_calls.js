/* Flagship – animal communication (ages 7–9). Scenes: sort six animal messages by how they are sent (sound, light,
   movement, smell), match messages to their job, decode firefly flash patterns to find a male's kind, choose the vervet
   monkey escape that fits each alarm call, and check a robot's facts. Data in learn/calls_art.js. Distinct from
   flagcolony (jobs inside an ant or bee colony) and flagsignal (people sending light and sound messages). */
(()=>{const {WAYS,SENDERS,JOBS,WHY,KINDS,FLASH,PLACES,ALARM,ROBOT,DESC,DONE,QS}=ACM;
VIS.reg('flagcalls',c=>{let A,row,chal,qi=-1,epoch=0;const M={};c.fig.classList.add('young');
const DARK='#1e293b',YES='#047857',NOPE='#b91c1c',EDGE='#64748b',NIGHT='#0f172a',GLOW='#fde047',LEAF='#15803d',BARK='#78350f',FNT='px system-ui,sans-serif';
const now=()=>['ways','jobs','flash','alarm','robot','quiz'][A.step];
const fs=n=>A.narrow?n:Math.round(n*1.2);
const hits=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function ground(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#ecfccb',A.col.dark?.05:.45);g.fillRect(0,0,A.W,A.H)}
function write(t,x,y,n,col,wt){const g=A.ctx;g.font=`${wt||800} ${fs(n)}${FNT}`;g.fillStyle=col||DARK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,x,y)}
/* a rounded note that shrinks its text to fit the width */
function note(t,x,y,o){o=o||{};const g=A.ctx;let n=fs(o.n||14);g.font=`800 ${n}${FNT}`;let w=g.measureText(t).width+24;
 while(w>A.W-8&&n>10){n--;g.font=`800 ${n}${FNT}`;w=g.measureText(t).width+24}
 const h=n+16,x0=Math.max(4,Math.min(A.W-w-4,x-w/2));g.fillStyle='#ffffff';A.paint.rrect(x0,y-h/2,w,h,10);g.fill();
 g.lineWidth=o.ok||o.no?3:1.5;g.strokeStyle=o.ok?YES:o.no?NOPE:EDGE;g.stroke();g.fillStyle=DARK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,x0+w/2,y+1)}
function box(r,o){o=o||{};const g=A.ctx;g.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':o.on?'#ede9fe':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();
 g.lineWidth=o.no||o.ok||o.on?3.5:1.5;g.strokeStyle=o.no?NOPE:o.ok?YES:o.on?'#7c3aed':EDGE;g.stroke();if(r.t)fitText(r.t,r,o.n||14)}
/* write a label inside a box: one line if it fits, else two lines split at the middle space, shrinking if needed */
function fitText(t,r,n0){const g=A.ctx,room=r.w-14;let n=fs(n0),lines=[t];g.font=`800 ${n}${FNT}`;
 if(g.measureText(t).width>room&&t.includes(' ')){const w=t.split(' ');let best=1,diff=1e9;for(let k=1;k<w.length;k++){const d=Math.abs(w.slice(0,k).join(' ').length-w.slice(k).join(' ').length);if(d<diff){diff=d;best=k}}lines=[w.slice(0,best).join(' '),w.slice(best).join(' ')]}
 while(n>9&&Math.max(...lines.map(l=>g.measureText(l).width))>room){n--;g.font=`800 ${n}${FNT}`}
 g.fillStyle=DARK;g.textAlign='center';g.textBaseline='middle';lines.forEach((l,k)=>g.fillText(l,r.x+r.w/2,r.y+r.h/2+1+(k-(lines.length-1)/2)*(n+3)))}
function grid(labels,cols,y0,h0){const gap=8,w=(A.W-16-gap*(cols-1))/cols,h=Math.min(h0,58);return labels.map((t,i)=>({i,t,x:8+(i%cols)*(w+gap),y:y0+Math.floor(i/cols)*(h+gap),w,h}))}
/* 1. how is the message sent? one card at a time, dragged or tapped into a box */
const wayBins=()=>grid(WAYS,A.narrow?2:4,A.H*(A.narrow?.56:.66),A.H*.17);
const cardHome=()=>{const w=Math.min(250,A.W-40),h=Math.min(58,A.H*.17);return{x:(A.W-w)/2,y:A.H*.2,w,h}};
function drawWays(){const s=M.ways;ground();if(s.i>=SENDERS.length){note('All 6 messages sorted',A.W/2,A.H*.14,{ok:1});note('Sound, light, movement and smell',A.W/2,A.H*.36,{n:14});return}
 const S=SENDERS[s.i];note(`Card ${s.i+1} of ${SENDERS.length}. How is the message sent?`,A.W/2,A.H*.08,{n:12});
 wayBins().forEach(r=>{box(r,{no:s.bad===r.i});const n=s.count[r.i];if(n)write('●'.repeat(n),r.x+r.w/2,r.y+r.h-9,8,YES,900)});
 let c0=cardHome();if(s.drag)c0={...c0,x:s.drag.x-c0.w/2,y:s.drag.y-c0.h/2};box({...c0,t:S.who},{on:!!s.drag,n:15})}
function wayDrop(k){const s=M.ways;if(s.i>=SENDERS.length)return;const S=SENDERS[s.i];
 if(k!==S.way){s.bad=k;A.sound.miss();return tell((S.why&&S.why[k])||`${S.who}: think about what the other animal sees, hears or smells.`)}
 s.bad=-1;s.count[k]++;A.sound.pop();s.i++;tell(`Yes: ${S.who.toLowerCase()}. That message is sent by ${WAYS[k].toLowerCase()}.`+(s.i<SENDERS.length?' Next card.':''))}
/* 2. what job does the message do? */
const jobTiles=()=>grid(JOBS,2,A.H*.42,A.H*.2);
function drawJobs(){const s=M.jobs;ground();if(s.i>=WHY.length){note('All 4 jobs found',A.W/2,A.H*.14,{ok:1});note('Mate, danger, food, group',A.W/2,A.H*.36,{n:15});return}
 const W=WHY[s.i];note(`Message ${s.i+1} of ${WHY.length}. What job does it do?`,A.W/2,A.H*.08,{n:12});note(W.msg,A.W/2,A.H*.25,{n:15});
 jobTiles().forEach(r=>box(r,{no:s.bad===r.i,n:13}))}
const JOBSLIP={0:'That is how animals find a partner of their own kind.',1:'That job is a warning: it tells others a hunter is near.',2:'That job tells others where to find something to eat.',3:'That job helps animals that are apart find each other.'};
function jobTap(k){const s=M.jobs;if(s.i>=WHY.length)return;const W=WHY[s.i];
 if(k!==W.job){s.bad=k;A.sound.miss();return tell(`Not quite. "${JOBS[k]}": ${JOBSLIP[k]} Look again at: ${W.msg.toLowerCase()}.`)}
 s.bad=-1;A.sound.pop();s.i++;tell(`Yes: ${JOBS[k].toLowerCase()}. ${W.slip}`+(s.i<WHY.length?' Next message.':''))}
/* 3. firefly codes: count and time the flashes */
function flashes(code,x,y,u){const g=A.ctx;let cx=x;code.forEach(f=>{const w=f===2?u*2.6:u;g.fillStyle=GLOW;A.paint.rrect(cx,y-u/2,w,u,u/2);g.fill();cx+=w+u*.7});return cx}
const kindRows=()=>{const h=Math.min(54,A.H*.16),gap=7;return KINDS.map((K,i)=>({i,x:10,y:A.H*.42+i*(h+gap),w:A.W-20,h}))};
function drawFlash(){const s=M.flash,g=A.ctx;g.fillStyle=NIGHT;g.fillRect(0,0,A.W,A.H);
 if(s.i>=FLASH.length){note('All 3 fireflies matched',A.W/2,A.H*.14,{ok:1});note('Each kind has its own code',A.W/2,A.H*.36,{n:15});return}
 const K=KINDS[FLASH[s.i]],u=Math.min(16,A.W/24);note(`Firefly ${s.i+1} of ${FLASH.length}. Which kind is he?`,A.W/2,A.H*.08,{n:12});
 write('He flashes:',A.W*.28,A.H*.25,13,'#f8fafc',800);flashes(K.code,A.W*.5,A.H*.25,u);
 kindRows().forEach(r=>{g.fillStyle=s.bad===r.i?'#7f1d1d':s.good===r.i?'#14532d':'#1e293b';A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=2;g.strokeStyle=s.bad===r.i?'#fca5a5':'#94a3b8';g.stroke();
  write(KINDS[r.i].name,r.x+A.W*.16,r.y+r.h/2+1,14,'#f8fafc',800);flashes(KINDS[r.i].code,r.x+A.W*.36,r.y+r.h/2,u*.8)})}
function count(code){const n=code.length,longs=code.filter(f=>f===2).length;return n===1&&longs?'one long flash':`${n} short flash${n>1?'es':''}`}
function flashTap(k){const s=M.flash;if(s.i>=FLASH.length)return;const want=FLASH[s.i];
 if(k!==want){s.bad=k;A.sound.miss();return tell(`${KINDS[k].name} flashes ${count(KINDS[k].code)}. He flashed ${count(KINDS[want].code)}. Count the flashes and look at how long each one is.`)}
 s.bad=-1;s.good=k;A.sound.pop();s.i++;const m=`Yes: ${count(KINDS[k].code)} is the ${KINDS[k].name} code. A ${KINDS[k].name} female flashes back to him.`;
 setTimeout(()=>{s.good=-1;A.redraw()},800);tell(m+(s.i<FLASH.length?' Next firefly.':''))}
/* 4. vervet alarm calls: tap the tree, the bush or the open ground */
const zones=()=>{const top=A.H*.24,h=A.H*.62;return[{i:0,x:A.W*.02,y:top,w:A.W*.3,h},{i:1,x:A.W*.68,y:top,w:A.W*.3,h},{i:2,x:A.W*.35,y:top,w:A.W*.3,h}]};
function monkey(x,y,up){const g=A.ctx,r=Math.min(16,A.W/22),hy=y-r*(up?2.9:1.9);g.fillStyle='#92400e';A.paint.rrect(x-r*.8,y-r*(up?2.1:1.1),r*1.6,r*(up?2.1:1.1),r*.6);g.fill();
 g.beginPath();g.arc(x,hy,r*.85,0,7);g.fill();g.fillStyle='#fde68a';g.beginPath();g.ellipse(x,hy+r*.15,r*.55,r*.45,0,0,7);g.fill();
 g.fillStyle=DARK;[-1,1].forEach(e=>{g.beginPath();g.arc(x+e*r*.25,hy+r*.05,r*.12,0,7);g.fill()})}
function drawAlarm(){const s=M.alarm,g=A.ctx;ground();if(s.i>=ALARM.length){note('All 3 calls answered',A.W/2,A.H*.14,{ok:1});note('A different escape for each hunter',A.W/2,A.H*.36,{n:14});return}
 const C=ALARM[s.i],Z=zones(),gy=A.H*.82;note(`${C.call}. Where should it go?`,A.W/2,A.H*.08,{n:12});
 g.fillStyle=A.mix('#a3e635','#3f6212',A.col.dark?.6:.2);g.fillRect(0,gy,A.W,A.H-gy);
 const T=Z[0],tx=T.x+T.w/2,B0=Z[1];if(s.where===1)monkey(B0.x+B0.w/2,gy-B0.w*.24,false);g.fillStyle=BARK;g.fillRect(tx-6,T.y+T.h*.3,12,gy-T.y-T.h*.3);g.fillStyle=LEAF;g.beginPath();g.arc(tx,T.y+T.h*.25,T.w*.42,0,7);g.fill();
 if(s.where===0)monkey(tx+T.w*.12,T.y+T.h*.42,false);const B=Z[1];g.fillStyle=LEAF;[-.25,0,.25].forEach(d=>{g.beginPath();g.arc(B.x+B.w*(.5+d),gy-B.w*.16,B.w*.24,0,7);g.fill()});
 Z.forEach(r=>{if(s.bad===r.i){g.lineWidth=3.5;g.strokeStyle=NOPE;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke()}});
 note('tree',tx,gy+A.H*.09,{n:11});note('bush',B.x+B.w/2,gy+A.H*.09,{n:11});note('ground',A.W/2,gy+A.H*.09,{n:11});
 if(s.where!==0&&s.where!==1)monkey(A.W/2,gy,s.where===2)}
function alarmTap(k){const s=M.alarm;if(s.i>=ALARM.length)return;const C=ALARM[s.i];
 if(k!==C.go){s.bad=k;A.sound.miss();return tell((C.why&&C.why[k])||'Think about where this hunter attacks from.')}
 s.bad=-1;s.where=k;A.sound.pop();s.i++;const m=`Yes: ${C.call.split(':')[0].toLowerCase()}, so ${PLACES[k].toLowerCase()}.`;
 setTimeout(()=>{s.where=-1;A.redraw()},800);tell(m+(s.i<ALARM.length?' Next call.':''))}
/* 5. the robot's facts */
const vote=()=>[0,1].map(k=>{const w=Math.min(170,(A.W-36)/2);return{i:k,t:k?'✗ Slip':'✓ Right',x:A.W/2+(k?6:-w-6),y:A.H*.74,w,h:Math.min(A.H*.17,60)}});
function drawRobot(){const s=M.robot,g=A.ctx;ground();if(s.i>=ROBOT.length){note('All 4 robot facts checked',A.W/2,A.H*.15,{ok:1});note('Bees dance; many messages need no voice',A.W/2,A.H*.38,{n:13});return}
 const R=ROBOT[s.i],cx=A.W/2,cy=A.H*.24,u=Math.min(A.W*.07,30);g.fillStyle='#94a3b8';A.paint.rrect(cx-u,cy-u*.8,u*2,u*1.6,8);g.fill();g.strokeStyle=DARK;g.lineWidth=2;g.stroke();
 g.fillStyle='#0ea5e9';[-1,1].forEach(e=>{g.beginPath();g.arc(cx+e*u*.45,cy-u*.15,u*.2,0,7);g.fill()});
 note(R.say,A.W/2,A.H*.46,{n:12});note(`Fact ${s.i+1} of ${ROBOT.length}. Right, or a slip?`,A.W/2,A.H*.6,{n:12});vote().forEach(r=>box(r,{no:s.bad===r.i,n:16}))}
function judge(k){const s=M.robot;if(s.i>=ROBOT.length)return;const R=ROBOT[s.i];
 if((k===0)!==R.ok){s.bad=k;A.sound.miss();return tell(R.ok?`Look again: ${R.fix}`:`Think about how that animal really sends it. ${R.fix}`)}
 s.bad=-1;A.sound.pop();s.i++;tell((R.ok?'Yes, right. ':'Yes, a slip. ')+R.fix)}
function draw(){const k=now();if(k==='quiz'){ground();note('Challenge',A.W/2,A.H*.2,{ok:1});note('How is it sent, and what is its job?',A.W/2,A.H*.5,{n:13});return}
 ({ways:drawWays,jobs:drawJobs,flash:drawFlash,alarm:drawAlarm,robot:drawRobot})[k]();A.fx.draw(A.ctx)}
function down(p){const k=now();
 if(k==='ways'){const s=M.ways;if(s.i<SENDERS.length&&hits(p,cardHome())){s.drag={x:p.x,y:p.y,x0:p.x,y0:p.y};A.sound.tick();A.redraw();return true}
  const b=wayBins().find(r=>hits(p,r));if(b)wayDrop(b.i);return false}
 if(k==='jobs'){const r=jobTiles().find(q=>hits(p,q));if(r)jobTap(r.i);return false}
 if(k==='flash'){const r=kindRows().find(q=>hits(p,q));if(r)flashTap(r.i);return false}
 if(k==='alarm'){const r=zones().find(q=>hits(p,q));if(r)alarmTap(r.i);return false}
 if(k==='robot'){const r=vote().find(q=>hits(p,q));if(r)judge(r.i);return false}
 return false}
function move(p){const s=M.ways;if(s&&s.drag){s.drag.x=p.x;s.drag.y=p.y;A.redraw()}}
function up(p){const s=M.ways;if(!s||!s.drag)return;s.drag=null;const b=wayBins().find(r=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y-16&&p.y<=r.y+r.h+16);if(b)wayDrop(b.i);else A.redraw()}
function reset(){epoch++;for(const k in M)delete M[k];Object.assign(M,{ways:{i:0,bad:-1,count:WAYS.map(()=>0),drag:null},jobs:{i:0,bad:-1},flash:{i:0,bad:-1,good:-1},alarm:{i:0,bad:-1,where:-1},robot:{i:0,bad:-1},check:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();pads();M.check()}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,ok){reset();tell(DESC[i]);M.check=finish(i,ok,DONE[i])}
function demo(i,acts,ms){steps[i].go();const e0=epoch;acts.forEach((f,j)=>setTimeout(()=>{if(e0===epoch)f()},ms*(j+1)))}
const steps=[
{h:'How is it sent?',p:'Animals send messages in different ways. Drag each card to the box for how its message travels.',
 predict:{q:'How does a honeybee tell other bees where the flowers are?',opts:['By buzzing','By dancing'],ans:1},task:'Sort all 6 cards',
 show:()=>demo(0,SENDERS.map(S=>()=>wayDrop(S.way)),550),go:()=>begin(0,()=>M.ways.i>=SENDERS.length)},
{h:'What is it for?',p:'Every message has a job. Tap the job each message does.',task:'Find all 4 jobs',
 show:()=>demo(1,WHY.map(W=>()=>jobTap(W.job)),650),go:()=>begin(1,()=>M.jobs.i>=WHY.length)},
{h:'Firefly codes',p:'Many kinds of firefly fly in the same field. Each kind has its own flash code. Count the flashes and tap his kind.',
 predict:{q:'Will a female firefly answer any flash she sees?',opts:['Yes, any flash','No, only her own kind\'s code'],ans:1},task:'Match all 3 fireflies',
 show:()=>demo(2,FLASH.map(k=>()=>flashTap(k)),700),go:()=>begin(2,()=>M.flash.i>=FLASH.length)},
{h:'Alarm calls',p:'Vervet monkeys have a different alarm call for each hunter. Tap where the monkey should go.',task:'Answer all 3 calls',
 show:()=>demo(3,ALARM.map(C=>()=>alarmTap(C.go)),700),go:()=>begin(3,()=>M.alarm.i>=ALARM.length)},
{h:'Check the robot',p:'The robot says some facts about animal messages. Right, or a slip?',task:'Check all 4 robot facts',
 show:()=>demo(4,ROBOT.map(R=>()=>judge(R.ok?0:1)),700),go:()=>begin(4,()=>M.robot.i>=ROBOT.length)},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(st=>{if(st.task)st.onPredict=()=>M.check()});
function why(t){let m='Ask two things: how is the message sent, and what job does it do?';
 if(t==='buzz')m='The buzz is just a bee\'s wings. Bees show the way to food with a waggle dance.';
 if(t==='voice')m='Many messages need no voice: fireflies use light, bees dance and ants leave a smell.';
 if(t==='any')m='Each kind of firefly has its own flash code. A female answers only her own kind.';
 if(t==='one')m='Vervets have a different call for each hunter: up a tree for a leopard, into a bush for an eagle.';
 if(t==='random')m='Animal signals are not random noise. Each one is a message with a job, like a warning or a way to food.';
 return m}
function ask(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="lbtn sm">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
function pads(){if(!row)return;row.innerHTML='';const k=now(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},row,t).onclick=f};
 if(k==='ways'&&M.ways.i<SENDERS.length)WAYS.forEach((w,i)=>B(w,()=>wayDrop(i),`${SENDERS[M.ways.i].who}: sent by ${w.toLowerCase()}`));
 if(k==='jobs'&&M.jobs.i<WHY.length)JOBS.forEach((j,i)=>B(j,()=>jobTap(i),`Job: ${j}`));
 if(k==='flash'&&M.flash.i<FLASH.length)KINDS.forEach((K,i)=>B(`${K.name}: ${count(K.code)}`,()=>flashTap(i),`He is ${K.name}, ${count(K.code)}`));
 if(k==='alarm'&&M.alarm.i<ALARM.length)PLACES.forEach((pl,i)=>B(pl,()=>alarmTap(i),`${pl}`));
 if(k==='robot'&&M.robot.i<ROBOT.length){B('✓ Right',()=>judge(0),'The robot is right');B('✗ Slip',()=>judge(1),'The robot made a slip')}}
FK.shell(c,{steps,ratio:.6,tall:1.1,draw,onStep:st=>{chal.hidden=st.step!==5;row.hidden=st.step===5;pads()},
 init:st=>{A=st;const w=c.el('div',{class:'fl-below'},A.below);row=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Animal messages lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});pads()}}).start()})})();
