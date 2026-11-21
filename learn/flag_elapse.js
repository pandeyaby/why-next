/* Flagship – comparing time durations (ages 7–8; NC 2013 Year 3 Measurement: compare durations, time taken by events).
   Scenes: hop along a time line to the o'clock and on, wind a clock on 5 minutes at a time and stop at the finish,
   measure two overlapping activities, judge a robot's time sums, and hop forward to an end time.
   Data in learn/elapse_art.js. */
(()=>{const {HOPS,CLOCKS,PAIRS,ROBOT,ENDS,DESC,DONE,QS}=ELP;
VIS.reg('flagelapse',c=>{let A,pad,quiz,n=-1,gen=0;const S={};c.fig.classList.add('young');
const INK='#0f172a',YES='#047857',NO='#b91c1c',RIM='#475569',HOUR='#1d4ed8',MIN='#c2410c',FONT='px system-ui,sans-serif';
const scene=()=>['hop','clock','pair','robot','end','quiz'][A.step];
const sz=v=>A.narrow?v:Math.round(v*1.15);
const hm=t=>`${Math.floor(t/60)}:${String(t%60).padStart(2,'0')}`;
const within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* ---- drawing helpers ---- */
function ground(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#fef3c7',A.col.dark?.06:.45);g.fillRect(0,0,A.W,A.H)}
function write(s,x,y,v,col,wt){const g=A.ctx;g.font=`${wt||800} ${sz(v)}${FONT}`;g.fillStyle=col||A.col.tx;g.textAlign='center';g.textBaseline='middle';g.fillText(s,x,y)}
function banner(s,y,o){o=o||{};const g=A.ctx;let v=sz(o.v||14);g.font=`800 ${v}${FONT}`;let w=g.measureText(s).width+22;
 while(w>A.W-8&&v>10){v--;g.font=`800 ${v}${FONT}`;w=g.measureText(s).width+22}
 const h=v+14,x0=Math.max(4,(A.W-w)/2);g.fillStyle='#ffffff';A.paint.rrect(x0,y-h/2,w,h,9);g.fill();
 g.lineWidth=o.ok?3:1.5;g.strokeStyle=o.ok?YES:RIM;g.stroke();g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(s,x0+w/2,y+1)}
function tile(r,o){o=o||{};const g=A.ctx;g.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':o.on?'#ede9fe':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();
 g.lineWidth=o.no||o.ok||o.on?3.5:1.5;g.strokeStyle=o.no?NO:o.ok?YES:o.on?'#6d28d9':RIM;g.stroke()}
/* a time line of 5-minute marks from t0 to t1: each mark is a tap target with the hour on top and the minutes below */
function marks(t0,t1){const k=(t1-t0)/5+1,gap=3,w=Math.min(60,(A.W-10-gap*(k-1))/k),x0=(A.W-(w*k+gap*(k-1)))/2,y=A.H*.46,h=Math.min(A.H*.2,70);
 return Array.from({length:k},(_,i)=>({t:t0+i*5,x:x0+i*(w+gap),y,w,h}))}
function line(t0,t1,o){const g=A.ctx,M=marks(t0,t1),mid=t=>{const r=M.find(q=>q.t===t);return r?r.x+r.w/2:0};
 M.forEach(r=>{tile(r,{on:r.t===o.from,ok:r.t===o.goal&&o.reached,no:r.t===o.bad});const top=r.t%60===0;
  write(String(Math.floor(r.t/60)),r.x+r.w/2,r.y+r.h*.3,11,top?HOUR:RIM,top?900:700);write(':'+String(r.t%60).padStart(2,'0'),r.x+r.w/2,r.y+r.h*.68,13,INK,900)});
 (o.hops||[]).forEach(([a,b])=>{const x1=mid(a),x2=mid(b),y=M[0].y-6;g.strokeStyle=MIN;g.lineWidth=3;g.beginPath();g.moveTo(x1,y);g.quadraticCurveTo((x1+x2)/2,y-A.H*.14,x2,y);g.stroke();
  write(`${b-a} min`,(x1+x2)/2,y-A.H*.09,11,A.col.tx,900)});return M}
function face(cx,cy,R,t){const g=A.ctx;g.fillStyle='#ffffff';g.beginPath();g.arc(cx,cy,R,0,7);g.fill();g.lineWidth=4;g.strokeStyle=INK;g.stroke();
 for(let i=1;i<=12;i++){const a=i*Math.PI/6;write(String(i),cx+Math.sin(a)*R*.8,cy-Math.cos(a)*R*.8,Math.max(10,R*.16),INK,900)}
 for(let i=0;i<60;i++){const a=i*Math.PI/30,r1=i%5?R*.93:R*.88;g.strokeStyle=RIM;g.lineWidth=i%5?1:2.5;g.beginPath();g.moveTo(cx+Math.sin(a)*r1,cy-Math.cos(a)*r1);g.lineTo(cx+Math.sin(a)*R*.98,cy-Math.cos(a)*R*.98);g.stroke()}
 const hand=(ang,len,w,col)=>{g.strokeStyle=col;g.lineWidth=w;g.lineCap='round';g.beginPath();g.moveTo(cx,cy);g.lineTo(cx+Math.sin(ang)*len,cy-Math.cos(ang)*len);g.stroke()};
 hand(((Math.floor(t/60)%12)+(t%60)/60)*Math.PI/6,R*.5,7,HOUR);hand((t%60)*Math.PI/30,R*.78,4,MIN);g.fillStyle=INK;g.beginPath();g.arc(cx,cy,5,0,7);g.fill()}
/* ---- scene 1: hop to the o'clock, then on ---- */
function drawHop(){const s=S.hop;ground();if(s.r>=HOPS.length){banner('Both done: 35 minutes each',A.H*.12,{ok:1});banner('Hop to the o\'clock, then add the hops',A.H*.28,{v:13});return}
 const H=HOPS[s.r],at=s.path[s.path.length-1];banner(`Start ${hm(H.a)}, finish ${hm(H.b)}. How long?`,A.H*.08,{v:13});
 banner(s.path.length===1?`Tap where the first hop lands`:at===H.b?'':`So far ${at-H.a} min. Hop on to ${hm(H.b)}.`,A.H*.2,{v:12});
 line(H.a,H.b,{from:H.a,goal:H.b,bad:s.bad,hops:s.path.slice(1).map((t,i)=>[s.path[i],t])})}
function hopTo(t){const s=S.hop;if(s.r>=HOPS.length)return;const H=HOPS[s.r],at=s.path[s.path.length-1],top=Math.ceil((H.a+1)/60)*60;
 if(t<=at){s.bad=t;A.sound.miss();return say('Time only goes forward. Hop to a later time.')}
 if(at===H.a&&t!==top){s.bad=t;A.sound.miss();return say(t===H.b?`That hop crosses the hour and is hard to count. Hop to ${hm(top)} first.`:`Hop to the o'clock first: ${hm(top)}. It is easy to count from there.`)}
 if(at===top&&t!==H.b){s.bad=t;A.sound.miss();return say(`Now hop all the way to the finish, ${hm(H.b)}.`)}
 s.bad=-1;s.path.push(t);A.sound.pop();
 if(t!==H.b)return say(`${hm(H.a)} to ${hm(t)} is ${t-H.a} minutes.`);
 const msg=`${top-H.a} + ${H.b-top} = ${H.b-H.a} minutes, not ${hm(H.b).replace(':','')-hm(H.a).replace(':','')}.`;s.r++;if(s.r<HOPS.length)s.path=[HOPS[s.r].a];say(msg+(s.r<HOPS.length?' Next one.':''))}
/* ---- scene 2: wind the clock ---- */
const dial=()=>{const R=Math.min(A.W*.24,A.H*.33);return{cx:A.W*.32,cy:A.H*.56,R}};
const pads=()=>{const w=Math.min(170,A.W*.36),h=Math.min(64,A.H*.16),x=A.W*.62;return[{k:'on',x,y:A.H*.3,w,h,t:'+5 minutes'},{k:'back',x,y:A.H*.3+h+10,w,h,t:'−5 minutes'},{k:'stop',x,y:A.H*.3+2*(h+10),w,h,t:'Stop here'}]};
function drawClock(){const s=S.clock;ground();if(s.r>=CLOCKS.length){banner('Swim 35 minutes, walk 30 minutes',A.H*.12,{ok:1});face(A.W/2,A.H*.6,Math.min(A.W*.22,A.H*.3),CLOCKS[1].b);return}
 const C=CLOCKS[s.r],d=dial();banner(`${C.what}: ${hm(C.a)} to ${hm(C.b)}`,A.H*.08,{v:13});banner(`Minutes passed: ${s.now-C.a}`,A.H*.19,{v:12});
 face(d.cx,d.cy,d.R,s.now);pads().forEach(r=>{tile(r,{no:s.bad===r.k});write(r.t,r.x+r.w/2,r.y+r.h/2+1,14,INK,900)})}
function wind(k){const s=S.clock;if(s.r>=CLOCKS.length)return;const C=CLOCKS[s.r];s.bad='';
 if(k==='on'){if(s.now>=C.b+30){A.sound.miss();return say('Too far. Wind back.')}s.now+=5;A.sound.tick();return say(`Minute hand on ${s.now%60===0?12:(s.now%60)/5}. ${s.now-C.a} minutes have passed.`)}
 if(k==='back'){if(s.now<=C.a){A.sound.miss();return say(`The clock already shows the start, ${hm(C.a)}.`)}s.now-=5;A.sound.tick();return say(`${s.now-C.a} minutes have passed.`)}
 if(s.now!==C.b){s.bad='stop';A.sound.miss();return say(s.now<C.b?`Not yet. The finish is ${hm(C.b)}: the minute hand points to ${(C.b%60)/5||12} and the hour hand is just past ${Math.floor(C.b/60)}.`:`Gone past. Wind back to ${hm(C.b)}.`)}
 const msg=`${C.what} took ${C.b-C.a} minutes: ${hm(C.a)} to ${hm(C.b)}.`;s.r++;if(s.r<CLOCKS.length)s.now=CLOCKS[s.r].a;A.sound.pop();say(msg+(s.r<CLOCKS.length?' Next one.':''))}
/* ---- scene 3: two activities on one time line ---- */
function barsOf(P){const x0=A.W*.08,w=A.W*.84,X=t=>x0+(t-P.lo)/(P.hi-P.lo)*w,h=Math.min(48,A.H*.13);
 return{X,rows:[['A',A.H*.34],['B',A.H*.34+h+14]].map(([k,y])=>({k,x:X(P[k].a),y,w:X(P[k].b)-X(P[k].a),h})),x0,w}}
const verdicts=()=>{const w=Math.min(170,(A.W-30)/2),h=Math.min(58,A.H*.14);return['A','B'].map((k,i)=>({k,x:A.W/2+(i?6:-w-6),y:A.H*.8,w,h}))};
function drawPair(){const s=S.pair,g=A.ctx;ground();if(s.r>=PAIRS.length){banner('Film A and Swim were longer',A.H*.12,{ok:1});banner('Ending later does not mean lasting longer',A.H*.3,{v:13});return}
 const P=PAIRS[s.r],B=barsOf(P);banner(s.seen.length<2?'Tap each bar to measure it':'Which lasts longer?',A.H*.08,{v:13});
 for(let t=P.lo;t<=P.hi;t+=t%60?60-t%60:30){const x=B.X(t);g.strokeStyle=RIM;g.lineWidth=1;g.beginPath();g.moveTo(x,A.H*.25);g.lineTo(x,A.H*.68);g.stroke();write(hm(t),x,A.H*.21,11,A.col.tx,800)}
 B.rows.forEach(r=>{const E=P[r.k],m=s.seen.includes(r.k);g.fillStyle=r.k==='A'?'#bfdbfe':'#fed7aa';A.paint.rrect(r.x,r.y,r.w,r.h,8);g.fill();g.lineWidth=2;g.strokeStyle=INK;g.stroke();
  write(m?`${E.n}: ${E.b-E.a} min`:E.n,r.x+r.w/2,r.y+r.h/2+1,12,INK,900)});
 if(s.seen.length===2)verdicts().forEach(r=>{tile(r,{no:s.bad===r.k});write(`${P[r.k].n} is longer`,r.x+r.w/2,r.y+r.h/2+1,13,INK,900)})}
function measure(k){const s=S.pair;if(s.r>=PAIRS.length||s.seen.includes(k))return;const E=PAIRS[s.r][k];s.seen.push(k);A.sound.pop();
 const top=Math.ceil((E.a+1)/60)*60;say(`${E.n}: ${hm(E.a)} to ${hm(E.b)}. `+(top<E.b?`${top-E.a} to ${hm(top)}, then ${E.b-top} more: `:'')+`${E.b-E.a} minutes.`)}
function judgePair(k){const s=S.pair;if(s.r>=PAIRS.length)return;const P=PAIRS[s.r];if(s.seen.length<2)return say('Measure both bars first.');
 if(k!==P.long){s.bad=k;A.sound.miss();return say(`${P[k].n} ends later, but it started later too. Compare the minutes: ${P.A.b-P.A.a} and ${P.B.b-P.B.a}.`)}
 const msg=`Yes: ${P[k].n} lasts ${P[k].b-P[k].a} minutes.`;s.r++;s.seen=[];s.bad='';A.sound.pop();say(msg+(s.r<PAIRS.length?' Next pair.':''))}
/* ---- scene 4: robot ---- */
const rights=()=>[0,1].map(k=>{const w=Math.min(170,(A.W-36)/2);return{k,x:A.W/2+(k?6:-w-6),y:A.H*.76,w,h:Math.min(A.H*.17,62)}});
function drawRobot(){const s=S.robot,g=A.ctx;ground();if(s.i>=ROBOT.length){banner('All 4 checked',A.H*.15,{ok:1});banner('Slips: 100 minutes in an hour, hours only',A.H*.35,{v:13});return}
 const R=ROBOT[s.i],u=Math.min(A.W*.08,34),cx=A.W*.13,cy=A.H*.36;g.fillStyle='#cbd5e1';A.paint.rrect(cx-u,cy-u,u*2,u*1.8,9);g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke();
 g.fillStyle='#0369a1';[-1,1].forEach(e=>{g.beginPath();g.arc(cx+e*u*.42,cy-u*.25,u*.2,0,7);g.fill()});g.fillStyle=INK;g.fillRect(cx-u*.35,cy+u*.3,u*.7,u*.1);
 banner(`${hm(R.a)} to ${hm(R.b)}`,A.H*.12,{v:14});banner(`"${R.said}"`,A.H*.3,{v:12});banner(`Sum ${s.i+1} of ${ROBOT.length}: right, or a slip?`,A.H*.5,{v:12});
 rights().forEach(r=>{tile(r,{no:s.bad===r.k});write(r.k?'✗ Slip':'✓ Right',r.x+r.w/2,r.y+r.h/2+1,16,INK,900)})}
function judgeRobot(k){const s=S.robot;if(s.i>=ROBOT.length)return;const R=ROBOT[s.i];
 if((k===0)!==R.ok){s.bad=k;A.sound.miss();return say(R.ok?`Check it: ${R.fix} The robot was right.`:`Look at how it worked. ${R.fix}`)}
 s.bad=-1;s.i++;A.sound.pop();say((R.ok?'Yes, right. ':'Yes, a slip. ')+R.fix)}
/* ---- scene 5: hop forward to the end time ---- */
function drawEnd(){const s=S.end;ground();if(s.r>=ENDS.length){banner('Ends at 4:25 and 7:15',A.H*.12,{ok:1});banner('Never 3:85: after :55 comes the o\'clock',A.H*.28,{v:13});return}
 const E=ENDS[s.r],at=s.path[s.path.length-1],used=at-E.a;banner(`${E.what} starts ${hm(E.a)} and lasts ${E.len} min`,A.H*.08,{v:13});
 banner(used?`${used} used, ${E.len-used} to go`:'Tap where the first hop lands',A.H*.2,{v:12});
 line(E.a,E.a+E.len+5,{from:E.a,bad:s.bad,hops:s.path.slice(1).map((t,i)=>[s.path[i],t])})}
function endTap(t){const s=S.end;if(s.r>=ENDS.length)return;const E=ENDS[s.r],at=s.path[s.path.length-1],top=Math.ceil((E.a+1)/60)*60,fin=E.a+E.len;
 if(t<=at){s.bad=t;A.sound.miss();return say('Hop forward: the show is still going.')}
 if(at===E.a&&t!==top){s.bad=t;A.sound.miss();return say(t===fin?`Right place, but hop to ${hm(top)} first so you can count it.`:`First hop to the o'clock, ${hm(top)}. That uses ${top-E.a} minutes.`)}
 if(at===top&&t!==fin){s.bad=t;A.sound.miss();return say(t>fin?`Too far. Only ${fin-top} minutes are left after ${hm(top)}.`:`Not far enough. ${fin-top} minutes are left after ${hm(top)}.`)}
 s.bad=-1;s.path.push(t);A.sound.pop();if(t!==fin)return say(`${hm(t)}. ${t-E.a} minutes used, ${fin-t} to go.`);
 const msg=`It ends at ${hm(fin)}.`;s.r++;if(s.r<ENDS.length)s.path=[ENDS[s.r].a];say(msg+(s.r<ENDS.length?' Next one.':''))}
function draw(){const k=scene();if(k==='quiz'){ground();banner('Challenge',A.H*.2,{ok:1});banner('Hop to the o\'clock. An hour is 60 minutes.',A.H*.5,{v:13});return}
 ({hop:drawHop,clock:drawClock,pair:drawPair,robot:drawRobot,end:drawEnd})[k]();A.fx.draw(A.ctx)}
function down(p){const k=scene();
 if(k==='hop'&&S.hop.r<HOPS.length){const H=HOPS[S.hop.r],r=marks(H.a,H.b).find(q=>within(p,q));if(r)hopTo(r.t)}
 if(k==='clock'){const d=dial(),pd=pads().find(r=>within(p,r));if(pd)wind(pd.k);else if(Math.hypot(p.x-d.cx,p.y-d.cy)<=d.R)wind('on')}
 if(k==='pair'&&S.pair.r<PAIRS.length){const v=S.pair.seen.length===2&&verdicts().find(r=>within(p,r));if(v)judgePair(v.k);else{const b=barsOf(PAIRS[S.pair.r]).rows.find(r=>within(p,r));if(b)measure(b.k)}}
 if(k==='robot'){const v=rights().find(r=>within(p,r));if(v)judgeRobot(v.k)}
 if(k==='end'&&S.end.r<ENDS.length){const E=ENDS[S.end.r],r=marks(E.a,E.a+E.len+5).find(q=>within(p,q));if(r)endTap(r.t)}
 return false}
function fresh(){gen++;for(const k in S)delete S[k];Object.assign(S,{hop:{r:0,path:[HOPS[0].a],bad:-1},clock:{r:0,now:CLOCKS[0].a,bad:''},pair:{r:0,seen:[],bad:''},robot:{i:0,bad:-1},end:{r:0,path:[ENDS[0].a],bad:-1},check:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.check()}
const ready=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function open(i,ok){fresh();say(DESC[i]);S.check=ready(i,ok,DONE[i])}
function auto(i,acts,ms){steps[i].go();const g0=gen;acts.forEach((f,j)=>setTimeout(()=>{if(g0===gen)f()},ms*(j+1)))}
function buttons(){if(!pad)return;pad.innerHTML='';const k=scene(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='hop'&&S.hop.r<HOPS.length){const H=HOPS[S.hop.r],top=Math.ceil((H.a+1)/60)*60;[top,H.b,top-5].forEach(t=>B(`Hop to ${hm(t)}`,()=>hopTo(t)))}
 if(k==='clock'&&S.clock.r<CLOCKS.length)pads().forEach(r=>B(r.t,()=>wind(r.k),r.k==='stop'?'Stop: the clock shows the finish time':r.t));
 if(k==='pair'&&S.pair.r<PAIRS.length){const P=PAIRS[S.pair.r];if(S.pair.seen.length<2)['A','B'].filter(x=>!S.pair.seen.includes(x)).forEach(x=>B(`Measure ${P[x].n}`,()=>measure(x)));else['A','B'].forEach(x=>B(`${P[x].n} is longer`,()=>judgePair(x)))}
 if(k==='robot'&&S.robot.i<ROBOT.length){B('✓ Right',()=>judgeRobot(0),'The robot is right');B('✗ Slip',()=>judgeRobot(1),'The robot made a slip')}
 if(k==='end'&&S.end.r<ENDS.length){const E=ENDS[S.end.r],at=S.end.path[S.end.path.length-1],top=Math.ceil((E.a+1)/60)*60,fin=E.a+E.len;(at===E.a?[top,fin]:[fin,fin+5]).forEach(t=>B(`Hop to ${hm(t)}`,()=>endTap(t)))}}
const steps=[
{h:'Hop to the hour',p:'Find how long it takes. Hop from the start to the o\'clock, then on to the finish. Tap the time line or use the buttons.',
 predict:{q:'10:40 to 11:15. Is that 75 minutes, because 1115 − 1040 = 75?',opts:['Yes, 75 minutes','No, an hour is only 60 minutes'],ans:1},task:'Time 10:40 to 11:15 and 2:50 to 3:25',
 show:()=>auto(0,HOPS.flatMap(H=>{const top=Math.ceil((H.a+1)/60)*60;return[()=>hopTo(top),()=>hopTo(H.b)]}),450),
 go:()=>open(0,()=>S.hop.r>=HOPS.length)},
{h:'Wind the clock',p:'Tap the clock to move the minute hand on 5 minutes. Stop when the clock shows the finish time.',task:'Wind both clocks to the finish',
 show:()=>auto(1,CLOCKS.flatMap(C=>[...Array((C.b-C.a)/5)].map(()=>()=>wind('on')).concat([()=>wind('stop')])),200),
 go:()=>open(1,()=>S.clock.r>=CLOCKS.length)},
{h:'Which lasts longer?',p:'Two things happen on the same afternoon. Tap each bar to measure it, then pick the longer one.',
 predict:{q:'Film B finishes after Film A. Is Film B longer?',opts:['Yes, it finishes later','Not always: measure them'],ans:1},task:'Compare both pairs',
 show:()=>auto(2,PAIRS.flatMap(P=>[()=>measure('A'),()=>measure('B'),()=>judgePair(P.long)]),480),
 go:()=>open(2,()=>S.pair.r>=PAIRS.length)},
{h:'Spot the slip',p:'The robot works out how long things take. Is each answer right, or a slip?',task:'Check all 4 robot answers',
 show:()=>auto(3,ROBOT.map(R=>()=>judgeRobot(R.ok?0:1)),600),
 go:()=>open(3,()=>S.robot.i>=ROBOT.length)},
{h:'Find the end',p:'You know when it starts and how long it lasts. Hop forward to find when it ends.',
 predict:{q:'A show starts at 3:45 and lasts 40 minutes. Does it end at 3:85?',opts:['Yes, 45 + 40 = 85','No, it ends at 4:25'],ans:1},task:'Find both end times',
 show:()=>auto(4,ENDS.flatMap(E=>{const top=Math.ceil((E.a+1)/60)*60;return[()=>endTap(top),()=>endTap(E.a+E.len)]}),450),
 go:()=>open(4,()=>S.end.r>=ENDS.length)},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
function why(t){let m='Hop to the o\'clock first, then add the minutes.';
 if(t==='hundred')m='An hour has 60 minutes, not 100. Do not subtract times like ordinary numbers. Hop to the o\'clock instead.';
 if(t==='hours')m='Look at the minutes as well as the hours. Count the minutes to the o\'clock and the minutes after it.';
 if(t==='ends')m='Finishing later does not mean lasting longer. Work out the minutes for each one and compare.';
 if(t==='same')m='Starting later does not tell you. Measure each one from its start to its finish.';
 return m}
function next(){n++;const Q=QS[n%QS.length],all=[[Q.a,'ok'],...Q.o],r=n%3,ord=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=quiz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.6,tall:1.1,draw,onStep:st=>{quiz.hidden=st.step!==5;pad.hidden=st.step===5;buttons()},
 init:st=>{A=st;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Time taken lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down});buttons()}}).start()})})();
