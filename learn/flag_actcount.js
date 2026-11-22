/* Flagship – counting claps, jumps and sounds (ages 4–5; Development Matters 2021 Reception "count objects, actions
   and sounds"). Booms, frog jumps, loud vs quiet, bell rings on fingers, a robot that slips. Data: learn/actcount_art.js. */
(()=>{const {BEATS,JUMPS,PAIRS,RINGS,ROBOT,DESC,DONE,QS,WHY,TXT}=ACTC;
VIS.reg('flagactcount',c=>{let A,bar,quiz,qn=-1,gen=0;const S={};c.fig.classList.add('young');
const INK='#0f172a',YES='#047857',NO='#b91c1c',EDGE='#64748b',HOT='#f59e0b',SKIN='#fcd9b6',POND='#0e7490',FONT='px system-ui,sans-serif';
const WORD=['zero','one','two','three','four','five','six','seven'];
const scene=()=>['boom','jump','same','bell','robot','quiz'][A.step];
const sz=n=>A.narrow?n:Math.round(n*1.18);
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* timers that die when the scene restarts */
function later(ms,f){const g=gen;setTimeout(()=>{if(g===gen)f()},ms)}
function ground(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#fef3c7',A.col.dark?.06:.45);g.fillRect(0,0,A.W,A.H)}
function word(t,x,y,n,col,wt){const g=A.ctx;g.font=`${wt||800} ${sz(n)}${FONT}`;g.fillStyle=col||A.col.tx;g.textAlign='center';g.textBaseline='middle';g.fillText(t,x,y)}
function banner(t,y,o){o=o||{};const g=A.ctx;let n=sz(o.n||14);g.font=`800 ${n}${FONT}`;let w=g.measureText(t).width+26;
 while(w>A.W-12&&n>10){n--;g.font=`800 ${n}${FONT}`;w=g.measureText(t).width+26}
 const h=n+16,x0=(A.W-w)/2;g.fillStyle='#ffffff';A.paint.rrect(x0,y-h/2,w,h,12);g.fill();
 g.lineWidth=o.ok||o.no?3:1.5;g.strokeStyle=o.ok?YES:o.no?NO:EDGE;g.stroke();g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y+1)}
function tile(r,label,o){o=o||{};const g=A.ctx;g.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();
 g.lineWidth=o.no||o.ok?3.5:1.6;g.strokeStyle=o.no?NO:o.ok?YES:EDGE;g.stroke();
 let n=sz(o.n||20);g.font=`900 ${n}${FONT}`;while(g.measureText(label).width>r.w-10&&n>10){n--;g.font=`900 ${n}${FONT}`}
 g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(label,r.x+r.w/2,r.y+r.h/2+1)}
/* a row of number tiles 1..6 along the bottom */
function keys(){const n=6,gap=6,w=Math.min(70,(A.W-16-gap*(n-1))/n),h=Math.min(A.H*.15,58),x0=(A.W-(w*n+gap*(n-1)))/2;
 return Array.from({length:n},(_,i)=>({v:i+1,x:x0+i*(w+gap),y:A.H-h-8,w,h}))}
function drum(x,y,r,lit,small){const g=A.ctx,k=small?.62:1,R=r*k;
 if(lit){g.fillStyle=A.alpha(HOT,.35);g.beginPath();g.arc(x,y,R*1.9,0,7);g.fill();
  for(let i=0;i<8;i++){const a=i*Math.PI/4;g.strokeStyle=HOT;g.lineWidth=4;g.beginPath();g.moveTo(x+Math.cos(a)*R*1.25,y+Math.sin(a)*R*1.05);g.lineTo(x+Math.cos(a)*R*1.7,y+Math.sin(a)*R*1.45);g.stroke()}}
 g.fillStyle='#dc2626';g.fillRect(x-R,y-R*.35,R*2,R*.9);g.strokeStyle=INK;g.lineWidth=2;g.strokeRect(x-R,y-R*.35,R*2,R*.9);
 g.fillStyle='#f8fafc';g.beginPath();g.ellipse(x,y-R*.35,R,R*.32,0,0,7);g.fill();g.stroke();
 g.strokeStyle='#fde68a';g.lineWidth=2;for(let i=-2;i<=2;i++){g.beginPath();g.moveTo(x+i*R*.4,y-R*.1);g.lineTo(x+i*R*.4+R*.2,y+R*.5);g.stroke()}}
/* ---------- 1. count the drum booms ---------- */
const drumR=()=>({x:A.W/2-A.W*.16,y:A.H*.2,w:A.W*.32,h:A.H*.42});
function drawBoom(){const s=S.a;ground();if(s.r>=BEATS.length){banner('Both drum rounds counted',A.H*.12,{ok:1});banner('3 booms, then 5 booms',A.H*.3,{n:15});drum(A.W/2,A.H*.55,Math.min(A.W*.12,54));return}
 banner(s.phase==='play'?'Listen… say a number for each boom':s.phase==='ask'?'How many booms? Tap the number':`Round ${s.r+1}: tap the drum to play it`,A.H*.08,{n:13,no:s.bad>0});
 drum(A.W/2,A.H*.42,Math.min(A.W*.12,54),s.flash);
 if(s.phase==='ask')keys().forEach(r=>tile(r,String(r.v),{no:s.bad===r.v}))}
function playBoom(gap){const s=S.a;if(s.r>=BEATS.length||s.phase==='play')return;const n=BEATS[s.r];s.phase='play';s.bad=-1;tell('Listen. Count each boom.');
 for(let k=1;k<=n;k++){later(k*gap,()=>{s.flash=1;A.sound.pop();c.say('Boom!');A.redraw()});later(k*gap+gap*.5,()=>{s.flash=0;A.redraw()})}
 later((n+1)*gap,()=>{s.phase='ask';tell('The drum stopped. How many booms did you count?')})}
function sayBoom(v){const s=S.a;if(s.r>=BEATS.length)return;if(s.phase!=='ask')return tell(s.phase==='play'?'Wait until the drum stops, then say how many.':'Tap the drum to play it first.');
 const n=BEATS[s.r];if(v!==n){s.bad=v;s.phase='idle';A.sound.miss();
  return tell(v>n?`More than the drum made. Start on the first boom, say one number for each, and stop when it stops. Play it again.`:`You missed one. Say a number every time the drum booms, even fast ones. Play it again.`)}
 s.r++;s.phase='idle';s.bad=-1;A.sound.pop();tell(`Yes: ${n} booms. You counted sounds you could not touch.`+(s.r<BEATS.length?' Next round.':''))}
/* ---------- 2. make the frog jump, stop on the number ---------- */
const frogR=()=>({x:A.W/2-A.W*.14,y:A.H*.36,w:A.W*.28,h:A.H*.34});
const stopR=()=>{const w=Math.min(220,A.W*.6),h=Math.min(A.H*.15,58);return{x:(A.W-w)/2,y:A.H-h-8,w,h}};
function drawJump(){const s=S.b,g=A.ctx;ground();
 if(s.r>=JUMPS.length){banner('4 jumps and 6 jumps',A.H*.12,{ok:1});banner('Count as you jump. Stop on the number.',A.H*.3,{n:13});return}
 const T=JUMPS[s.r];banner(`Make the frog jump ${T} times. Then tap Stop.`,A.H*.08,{n:13,no:s.bad});
 const cx=A.W/2,base=A.H*.66,u=Math.min(A.W*.08,34);
 g.fillStyle=A.mix(POND,'#ffffff',.25);g.beginPath();g.ellipse(cx,base+u*.6,u*3.2,u*.8,0,0,7);g.fill();
 g.fillStyle='#16a34a';g.beginPath();g.ellipse(cx,base+u*.45,u*1.8,u*.45,0,0,7);g.fill();
 const y=base-s.lift*u*2.6;g.fillStyle='#22c55e';g.beginPath();g.ellipse(cx,y,u,u*.75,0,0,7);g.fill();g.strokeStyle='#14532d';g.lineWidth=2;g.stroke();
 [-1,1].forEach(e=>{g.fillStyle='#ffffff';g.beginPath();g.arc(cx+e*u*.42,y-u*.62,u*.28,0,7);g.fill();g.stroke();g.fillStyle='#111827';g.beginPath();g.arc(cx+e*u*.42,y-u*.62,u*.12,0,7);g.fill()});
 if(s.trail){const n=s.trail,w=Math.min(46,(A.W-30)/n);for(let i=0;i<n;i++){const x=A.W/2+(i-(n-1)/2)*w;g.strokeStyle=s.trailOk?YES:NO;g.lineWidth=3;g.beginPath();g.arc(x,A.H*.27,w*.38,Math.PI,0);g.stroke();word(String(i+1),x,A.H*.27-w*.12,11,A.col.tx,800)}}
 tile(stopR(),'✋ Stop',{n:17})}
function jumpFrog(){const s=S.b;if(s.r>=JUMPS.length)return;s.n++;s.trail=0;s.bad=0;s.lift=1;A.sound.pop();c.say('Jump!');A.cv.setAttribute('aria-label','The frog jumped. Keep counting.');A.redraw();later(160,()=>{s.lift=0;A.redraw()})}
function stopFrog(){const s=S.b;if(s.r>=JUMPS.length)return;const T=JUMPS[s.r];
 if(!s.n){s.bad=1;A.sound.miss();return tell('Tap the frog to make it jump first.')}
 s.trail=s.n;s.trailOk=s.n===T;
 if(s.n>T){const n=s.n;s.n=0;s.bad=1;A.sound.miss();return tell(`The frog jumped ${n} times. That is too many. Count each jump and stop when you say ${WORD[T]}.`)}
 if(s.n<T){s.bad=1;A.sound.miss();return tell(`Only ${s.n} jumps so far. Keep jumping until you say ${WORD[T]}, then stop.`)}
 s.n=0;s.r++;s.bad=0;A.sound.pop();tell(`Yes: ${T} jumps. You stopped on ${WORD[T]}.`+(s.r<JUMPS.length?' Next one.':''))}
/* ---------- 3. loud or quiet, big or small: still one each ---------- */
const sideX=k=>A.W*(k?.75:.25);
const pickR=()=>{const lab=PAIRS[Math.min(S.c.r,PAIRS.length-1)],w=Math.min(190,(A.W-28)/3),h=Math.min(A.H*.17,62),y=A.H-h-8,x0=(A.W-(w*3+16))/2;
 return[{k:'a',t:lab.a.who+' more',x:x0,y,w,h},{k:'same',t:'Same',x:x0+w+8,y,w,h},{k:'b',t:lab.b.who+' more',x:x0+2*(w+8),y,w,h}]};
function drawSame(){const s=S.c;ground();if(s.r>=PAIRS.length){banner('Both checked',A.H*.12,{ok:1});banner('Loud, quiet, big or small: each one counts as one',A.H*.3,{n:12});return}
 const P=PAIRS[s.r];banner(s.phase==='play'?'Listen and count each side':s.phase==='ask'?'Which made more? Or the same?':'Tap a drum to play both',A.H*.08,{n:13,no:s.bad});
 [P.a,P.b].forEach((X,k)=>{const lit=s.side===k&&s.flash;drum(sideX(k),A.H*.42,Math.min(A.W*.11,50),lit,!X.big);word(X.who+': '+X.w,sideX(k),A.H*.66,11,A.col.tx,700)});
 if(s.phase==='ask')pickR().forEach(r=>tile(r,r.t,{no:s.bad===r.k,n:13}))}
function playPair(gap){const s=S.c;if(s.r>=PAIRS.length||s.phase==='play')return;const P=PAIRS[s.r];s.phase='play';s.bad=0;tell('Listen to the left drum, then the right drum. Count each side.');let t=gap;
 [P.a,P.b].forEach((X,k)=>{const step=X.big?gap*1.5:gap*.7;for(let i=0;i<X.n;i++){later(t,()=>{s.side=k;s.flash=1;X.big?A.sound.miss():A.sound.tick();c.say(X.big?'BANG!':'tap');A.redraw()});later(t+step*.5,()=>{s.flash=0;A.redraw()});t+=step}t+=gap});
 later(t,()=>{s.phase='ask';s.side=-1;tell('Which side made more, or the same number?')})}
function choosePair(k){const s=S.c;if(s.r>=PAIRS.length)return;if(s.phase!=='ask')return tell('Play both drums first, then choose.');const P=PAIRS[s.r];
 if(k!==P.ans){s.bad=k;s.phase='idle';A.sound.miss();return tell(P.bad[k]+' Play it again.')}
 s.r++;s.phase='idle';s.bad=0;A.sound.pop();tell(P.ans==='same'?`Yes: ${P.a.n} and ${P.b.n}, the same. Loud or quiet, each one counts as one.`:`Yes: the mouse made ${P.b.n}, the giant only ${P.a.n}. Small and quick still count.`)}
/* ---------- 4. keep track of the bell with fingers ---------- */
const bellR=()=>({x:A.W*.08,y:A.H*.2,w:A.W*.34,h:A.H*.46});
const handR=()=>({x:A.W*.52,y:A.H*.18,w:A.W*.42,h:A.H*.5});
function drawBell(){const s=S.d,g=A.ctx;ground();
 banner(s.phase==='done'?'Bell counted: 5 rings':s.phase==='ask'?'The bell stopped. How many rings?':s.phase==='wait'?'Ding! Put up one finger':s.phase==='off'?'Tap the bell to start it':'Listen for the bell…',A.H*.08,{n:13,no:s.bad,ok:s.phase==='done'});
 const b=bellR(),bx=b.x+b.w/2,by=b.y+b.h*.5,u=Math.min(b.w*.3,48);
 if(s.flash){g.fillStyle=A.alpha(HOT,.35);g.beginPath();g.arc(bx,by,u*1.7,0,7);g.fill()}
 g.fillStyle='#eab308';g.beginPath();g.moveTo(bx-u,by+u*.6);g.quadraticCurveTo(bx-u*.9,by-u*.9,bx,by-u);g.quadraticCurveTo(bx+u*.9,by-u*.9,bx+u,by+u*.6);g.closePath();g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke();
 g.fillStyle='#a16207';g.beginPath();g.arc(bx,by+u*.75,u*.2,0,7);g.fill();
 const h=handR(),hx=h.x+h.w/2,hy=h.y+h.h*.72,f=Math.min(h.w*.1,20);
 g.fillStyle=SKIN;A.paint.rrect(hx-f*2.7,hy-f*1.4,f*5.4,f*3,f);g.fill();g.strokeStyle='#9a3412';g.lineWidth=2;g.stroke();
 for(let i=0;i<5;i++){const up=i<s.fingers,x=hx-f*2.2+i*f*1.1,len=up?f*3.6:f*1.1;g.fillStyle=SKIN;A.paint.rrect(x-f*.45,hy-f*1.4-len,f*.9,len+f*.4,f*.45);g.fill();g.stroke()}
 word(s.fingers?`${s.fingers} finger${s.fingers>1?'s':''} up`:'No fingers up',hx,h.y+h.h+A.H*.03,12,A.col.tx,700);
 if(s.phase==='ask')keys().forEach(r=>tile(r,String(r.v),{no:s.bad===r.v}))}
function ring(){const s=S.d;s.phase='wait';s.flash=1;A.sound.step();c.say('Ding!');A.redraw();later(260,()=>{s.flash=0;A.redraw()})}
function startBell(){const s=S.d;if(s.phase!=='off')return;s.bad=0;ring();tell('Ding! Put up one finger.')}
function finger(){const s=S.d;
 if(s.phase==='off'){s.bad=1;A.sound.miss();return tell('Tap the bell first. A finger goes up only when it rings.')}
 if(s.phase!=='wait'){s.bad=1;A.sound.miss();return tell(s.phase==='ask'||s.phase==='done'?'The bell has stopped. Use your fingers to say how many.':'Wait for the bell. One finger for each ring, not more.')}
 s.fingers++;s.bad=0;s.phase='listen';A.sound.pop();
 if(s.fingers>=RINGS){later(500,()=>{s.phase='ask';tell('The bell stopped. The sound has gone. How many rings?')});return tell(`${s.fingers} fingers up.`)}
 tell(`${s.fingers} finger${s.fingers>1?'s':''} up. Listen…`);later(S.gap,()=>{if(s.phase==='listen'){ring();tell('Ding! Put up one finger.')}})}
function sayRings(v){const s=S.d;if(s.phase!=='ask')return;if(v!==RINGS){s.bad=v;A.sound.miss();return tell(`Look at your fingers: they kept track. Count them: there are ${RINGS}.`)}
 s.phase='done';s.bad=0;A.sound.pop();tell(`Yes: ${RINGS} rings. The sound had gone, but your fingers kept count.`)}
/* ---------- 5. check the robot ---------- */
const judgeR=()=>[0,1].map(k=>{const w=Math.min(170,(A.W-36)/2),h=Math.min(A.H*.16,60);return{k,x:A.W/2+(k?6:-w-6),y:A.H-h-8,w,h}});
function drawRobot(){const s=S.e,g=A.ctx;ground();if(s.i>=ROBOT.length){banner(`All ${ROBOT.length} robot counts checked`,A.H*.14,{ok:1});banner('Slips: kept going, counted big twice, missed a quick one',A.H*.36,{n:12});return}
 const R=ROBOT[s.i];banner(`Robot count ${s.i+1} of ${ROBOT.length}: right, or a slip?`,A.H*.08,{n:13,no:s.bad>=0});
 const slots=R.n+(R.said.length>R.n&&!R.big?1:0),w=Math.min(64,(A.W-24)/Math.max(slots,4)),y=A.H*.34;
 let k=0;for(let i=0;i<slots;i++){const x=A.W/2+(i-(slots-1)/2)*w,isClap=i<R.n,big=R.big&&i===1,fast=R.fast&&i>=2&&i<=3;
  if(isClap){const r=w*(big?.36:.24);g.fillStyle=SKIN;g.beginPath();g.ellipse(x-r*.35,y,r*.5,r,-.3,0,7);g.ellipse(x+r*.35,y,r*.5,r,.3,0,7);g.fill();g.strokeStyle='#9a3412';g.lineWidth=1.6;g.stroke();
   if(fast)word('quick',x,y+w*.5,9,A.col.tx,700);if(big)word('BIG',x,y+w*.5,9,A.col.tx,800)}
  else word('(no clap)',x,y,10,A.col.tx,600);
  let nums=[];if(R.fast){if(!(i===3))nums=[R.said[k++]]}else if(big){nums=[R.said[k++],R.said[k++]]}else nums=[R.said[k++]];
  nums=nums.filter(v=>v!=null);if(nums.length)word(nums.join(' '),x,A.H*.56,15,A.col.dark?'#c4b5fd':'#6d28d9',900)}
 word('🤖 says',A.W/2,A.H*.66,11,A.col.tx,700);
 judgeR().forEach(r=>tile(r,r.k?'✗ Slip':'✓ Right',{no:s.bad===r.k,n:17}))}
function judge(k){const s=S.e;if(s.i>=ROBOT.length)return;const R=ROBOT[s.i];
 if((k===0)!==R.ok){s.bad=k;A.sound.miss();return tell(R.ok?`Look again: ${R.fix}`:`Look again. ${R.fix}`)}
 s.bad=-1;s.i++;A.sound.pop();tell((R.ok?'Yes, right. ':'Yes, a slip. ')+R.fix)}
/* ---------- wiring ---------- */
function draw(){const k=scene();if(k==='quiz'){ground();banner('Challenge',A.H*.2,{ok:1});banner('One number for each clap, jump or sound',A.H*.5,{n:13});return}
 ({boom:drawBoom,jump:drawJump,same:drawSame,bell:drawBell,robot:drawRobot})[k]();A.fx.draw(A.ctx)}
function down(p){const k=scene(),key=keys().find(r=>hit(p,r));
 if(k==='boom'){if(S.a.phase==='ask'&&key)sayBoom(key.v);else if(hit(p,drumR()))playBoom(S.gap);return false}
 if(k==='jump'){if(hit(p,stopR()))stopFrog();else if(hit(p,frogR()))jumpFrog();return false}
 if(k==='same'){const r=S.c.phase==='ask'&&pickR().find(q=>hit(p,q));if(r)choosePair(r.k);else if(p.y<A.H*.72)playPair(S.gap);return false}
 if(k==='bell'){if(S.d.phase==='ask'&&key)sayRings(key.v);else if(hit(p,bellR()))startBell();else if(hit(p,handR()))finger();return false}
 if(k==='robot'){const v=judgeR().find(r=>hit(p,r));if(v)judge(v.k);return false}
 return false}
function fresh(){gen++;for(const k in S)delete S[k];Object.assign(S,{gap:750,a:{r:0,phase:'idle',flash:0,bad:-1},b:{r:0,n:0,lift:0,trail:0,trailOk:0,bad:0},
 c:{r:0,phase:'idle',side:-1,flash:0,bad:0},d:{phase:'off',fingers:0,flash:0,bad:0},e:{i:0,bad:-1},check:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.check()}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function enter(i,ok){fresh();tell(DESC[i]);S.check=finish(i,ok,DONE[i])}
/* Show me: run a script of [wait ms, action] pairs, quick, and stop if the scene restarts */
function demo(i,script){steps[i].go();S.gap=170;const g=gen;let t=0;script.forEach(([ms,f])=>{t+=ms;setTimeout(()=>{if(g===gen)f()},t)})}
function buttons(){if(!bar)return;bar.innerHTML='';const k=scene(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},bar,t).onclick=f};
 if(k==='boom'&&S.a.r<BEATS.length){if(S.a.phase==='ask')for(let v=1;v<=6;v++)B(String(v),()=>sayBoom(v),`${v} booms`);else B('🥁 Play the drum',()=>playBoom(S.gap))}
 if(k==='jump'&&S.b.r<JUMPS.length){B('🐸 Jump',jumpFrog,'Make the frog jump once');B('✋ Stop',stopFrog,'Stop jumping')}
 if(k==='same'&&S.c.r<PAIRS.length){if(S.c.phase==='ask')pickR().forEach(r=>B(r.t,()=>choosePair(r.k)));else B('🥁 Play both drums',()=>playPair(S.gap))}
 if(k==='bell'){if(S.d.phase==='off')B('🔔 Start the bell',startBell);if(S.d.phase!=='ask'&&S.d.phase!=='done')B('☝️ Put up a finger',finger);if(S.d.phase==='ask')for(let v=1;v<=6;v++)B(String(v),()=>sayRings(v),`${v} rings`)}
 if(k==='robot'&&S.e.i<ROBOT.length){B('✓ Right',()=>judge(0),'The robot is right');B('✗ Slip',()=>judge(1),'The robot made a slip')}}
const boomGap=n=>(n+1)*170+120,pairGap=P=>170*(1+P.a.n*(P.a.big?1.5:.7)+P.b.n*(P.b.big?1.5:.7)+2)+120;
const steps=[
{h:'Count the booms',p:TXT[0],
 predict:{q:'You cannot touch a drum boom. Can you still count booms?',opts:['No, only things I can touch','Yes, one number for each boom'],ans:1},task:'Count both drum rounds',
 show:()=>demo(0,[[60,()=>playBoom(170)],[boomGap(BEATS[0]),()=>sayBoom(BEATS[0])],[200,()=>playBoom(170)],[boomGap(BEATS[1]),()=>sayBoom(BEATS[1])]]),
 go:()=>enter(0,()=>S.a.r>=BEATS.length)},
{h:'Jump and stop',p:TXT[1],task:'Make 4 jumps, then 6 jumps',
 show:()=>demo(1,JUMPS.flatMap(T=>[...Array(T)].map(()=>[200,jumpFrog]).concat([[220,stopFrog]]))),
 go:()=>enter(1,()=>S.b.r>=JUMPS.length)},
{h:'Loud or quiet',p:TXT[2],
 predict:{q:'3 loud bangs, then 3 quiet taps. Which is more?',opts:['The loud bangs','The same: 3 and 3'],ans:1},task:'Compare both pairs',
 show:()=>demo(2,[[60,()=>playPair(170)],[pairGap(PAIRS[0]),()=>choosePair(PAIRS[0].ans)],[200,()=>playPair(170)],[pairGap(PAIRS[1]),()=>choosePair(PAIRS[1].ans)]]),
 go:()=>enter(2,()=>S.c.r>=PAIRS.length)},
{h:'Fingers keep track',p:TXT[3],
 predict:{q:'The bell rings 5 times, then stops. The sound has gone. Can you still say how many?',opts:['No, the sound has gone','Yes, my fingers kept track'],ans:1},task:'Count the bell on your fingers',
 show:()=>demo(3,[[60,startBell],...[...Array(RINGS)].map(()=>[260,finger]),[900,()=>sayRings(RINGS)]]),
 go:()=>enter(3,()=>S.d.phase==='done')},
{h:'Spot the slip',p:TXT[4],
 predict:{q:'One clap is BIG. Does a big clap count as 2?',opts:['Yes, big counts as 2','No, a big clap is still 1'],ans:1},task:'Check all 5 robot counts',
 show:()=>demo(4,ROBOT.map(R=>[420,()=>judge(R.ok?0:1)])),
 go:()=>enter(4,()=>S.e.i>=ROBOT.length)},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
function why(t){let m=WHY.def;
 if(t==='extra')m='That is one too many. Do not say a number before the first one, or after the last one.';
 if(t==='miss')m='One was missed. Say a number for every one, even the quick or quiet ones.';
 if(t==='touch')m='You can count things you cannot touch. Say one number for each clap as it happens.';
 if(t==='loud'||t==='quiet')m='Loud or quiet does not change the count. 3 bangs and 3 taps are both 3.';
 if(t==='big')m='A big stamp is still one stamp. Count them: 2 stamps and 4 taps, so 4 is more.';
 if(t==='same')m='Count each side: 2 and 4 are not the same number.';
 if(t==='stop')m='To make 3 jumps, count each jump and stop on the number: one, two, three, stop.';
 return m}
function ask(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=quiz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.6,tall:1.1,draw,onStep:X=>{quiz.hidden=X.step!==5;bar.hidden=X.step===5;buttons()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);bar=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Counting sounds lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down});buttons()}}).start()})})();
