/* Flagship – counting back to subtract (ages 4–5; NC 2013 Year 1 subtraction within 20; Development Matters 2021
   Reception "one less than"; NCETM Mastering Number). Scenes: a frog hops back along a 1-10 track, story sums where you
   pick the whole to start on, cakes leave a shut box, a robot that slips, and checking by counting on.
   Data in learn/countback_art.js. */
(()=>{const {HOPS,STORIES,BOX,ROBOT,CHECKS,DESC,DONE,QS}=CBK;
VIS.reg('flagcountback',c=>{let A,ctl,chal,qi=-1,run=0;const K={};c.fig.classList.add('young');
const DARK='#0f172a',GOOD='#047857',BAD='#b91c1c',LINE='#64748b',PICK='#7c3aed',FROG='#16a34a',F='px system-ui,sans-serif';
const part=()=>['hop','story','box','robot','check','quiz'][A.step];
const fs=n=>A.narrow?n:Math.round(n*1.2);
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function paper(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#e0f2fe',A.col.dark?.07:.5);g.fillRect(0,0,A.W,A.H)}
function txt(t,x,y,n,col,w){const g=A.ctx;g.font=`${w||800} ${fs(n)}${F}`;g.fillStyle=col||A.col.tx;g.textAlign='center';g.textBaseline='middle';g.fillText(t,x,y)}
function pill(t,x,y,o){o=o||{};const g=A.ctx;let n=fs(o.n||14);g.font=`800 ${n}${F}`;let w=g.measureText(t).width+24;
 while(w>A.W-10&&n>10){n--;g.font=`800 ${n}${F}`;w=g.measureText(t).width+24}
 const h=n+15,x0=Math.max(5,Math.min(A.W-w-5,x-w/2));g.fillStyle='#ffffff';A.paint.rrect(x0,y-h/2,w,h,10);g.fill();
 g.lineWidth=o.ok||o.no?3:1.5;g.strokeStyle=o.ok?GOOD:o.no?BAD:LINE;g.stroke();g.fillStyle=DARK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,x0+w/2,y+1)}
function box(r,o){o=o||{};const g=A.ctx;g.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':o.dim?'#e2e8f0':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();
 g.lineWidth=o.no||o.ok||o.on?3.5:1.5;g.strokeStyle=o.no?BAD:o.ok?GOOD:o.on?PICK:LINE;g.stroke()}
/* the number track: cells lo..hi in one row */
function cells(lo,hi,y,h){const n=hi-lo+1,gap=3,w=Math.min(64,(A.W-12-gap*(n-1))/n),x0=(A.W-(w*n+gap*(n-1)))/2;
 return Array.from({length:n},(_,i)=>({v:lo+i,x:x0+i*(w+gap),y,w,h}))}
const trackY=()=>A.H*.5,trackH=()=>Math.min(A.H*.17,64);
function track(lo,hi,o){const g=A.ctx,list=cells(lo,hi,trackY(),trackH());
 list.forEach(r=>{box(r,{on:o.start===r.v,ok:o.land===r.v,no:o.bad===r.v,dim:o.dim&&o.dim(r.v)});txt(String(r.v),r.x+r.w/2,r.y+r.h/2+1,17,DARK,900)});
 const mid=v=>{const r=list.find(q=>q.v===v);return r?r.x+r.w/2:0};
 (o.arcs||[]).forEach(([a,b],k)=>{const x1=mid(a),x2=mid(b),top=trackY()-8;g.strokeStyle=o.fwd?'#2563eb':PICK;g.lineWidth=3;g.beginPath();g.moveTo(x1,top);g.quadraticCurveTo((x1+x2)/2,top-A.H*.12,x2,top);g.stroke();
  txt(String(k+1),(x1+x2)/2,top-A.H*.08,11,A.col.tx,800)});
 if(o.frog!=null){const r=list.find(q=>q.v===o.frog);if(r){const cx=r.x+r.w/2,cy=r.y+r.h+Math.min(22,A.H*.07),s=Math.min(r.w*.42,20);
  g.fillStyle=FROG;g.beginPath();g.ellipse(cx,cy,s,s*.75,0,0,7);g.fill();g.strokeStyle='#14532d';g.lineWidth=2;g.stroke();
  [-1,1].forEach(e=>{g.fillStyle='#ffffff';g.beginPath();g.arc(cx+e*s*.4,cy-s*.6,s*.28,0,7);g.fill();g.stroke();g.fillStyle='#111827';g.beginPath();g.arc(cx+e*s*.4,cy-s*.6,s*.12,0,7);g.fill()})}}
 return list}
function hopCell(p,lo,hi){return cells(lo,hi,trackY(),trackH()).find(r=>inside(p,r))}
/* 1. hop back on the track */
function drawHop(){const s=K.a;paper();if(s.r>=HOPS.length){pill('Both sums done',A.W/2,A.H*.12,{ok:1});pill('7 − 3 = 4 and 9 − 2 = 7',A.W/2,A.H*.3,{n:15});track(1,10,{arcs:[]});return}
 const [w,t]=HOPS[s.r];pill(`${w} take away ${t}: hop back ${t} times`,A.W/2,A.H*.08,{n:13});
 pill(s.said.length?`You said: ${w} … ${s.said.join(', ')}`:`Start on ${w}. Tap where the first hop lands.`,A.W/2,A.H*.2,{n:12});
 track(1,10,{start:w,frog:s.at,bad:s.bad,arcs:s.said.map((v,i)=>[i?s.said[i-1]:w,v])})}
function hopTo(v){const s=K.a;if(s.r>=HOPS.length)return;const [w,t]=HOPS[s.r];
 if(v===s.at){s.bad=v;A.sound.miss();return tell(s.said.length?`You are on ${v} already. Hop to the next number back.`:`You are on ${w} already. Saying ${w} is not a hop: the first hop lands on ${w-1}.`)}
 if(v>s.at){s.bad=v;A.sound.miss();return tell('That way is counting on, to bigger numbers. Take away hops back, to smaller numbers.')}
 if(v!==s.at-1){s.bad=v;A.sound.miss();return tell(`Hop one step at a time. One back from ${s.at} is ${s.at-1}.`)}
 s.at=v;s.bad=-1;s.said.push(v);A.sound.pop();
 if(s.said.length<t)return tell(`Hop ${s.said.length}: ${v}. ${t-s.said.length} more to go.`);
 const msg=`${t} hops: ${w} … ${s.said.join(', ')}. ${w} − ${t} = ${v}.`;s.r++;if(s.r<HOPS.length){s.at=HOPS[s.r][0];s.said=[]}
 tell(msg+(s.r<HOPS.length?' Next sum.':''))}
/* 2. story: pick the whole, then hop */
function drawStory(){const s=K.b;paper();if(s.r>=STORIES.length){pill('Both stories done',A.W/2,A.H*.12,{ok:1});pill('10 − 2 = 8 and 6 − 3 = 3',A.W/2,A.H*.3,{n:15});track(1,10,{});return}
 const S=STORIES[s.r];pill(S.t,A.W/2,A.H*.08,{n:13});
 pill(s.at==null?'Tap the number to start on':s.said.length<S.take?`Start ${S.whole}. Hop back ${S.take}: ${s.said.join(', ')||'…'}`:'',A.W/2,A.H*.2,{n:12});
 dots(S);track(1,10,{start:s.at,frog:s.at==null?null:s.said.length?s.said[s.said.length-1]:s.at,bad:s.bad,arcs:s.said.map((v,i)=>[i?s.said[i-1]:S.whole,v])})}
function dots(S){const g=A.ctx,gone=K.b.said.length,y=A.H*.86,r=Math.min(9,A.W/(S.whole*3.2));for(let i=0;i<S.whole;i++){const x=A.W/2+(i-(S.whole-1)/2)*r*2.8,left=i>=S.whole-gone;
 g.fillStyle=left?'#cbd5e1':(S.who==='bees'?'#ca8a04':'#1d4ed8');g.beginPath();g.arc(x,y-(left?r*1.6:0),r,0,7);g.fill();g.strokeStyle=DARK;g.lineWidth=1;g.stroke()}}
function storyTap(v){const s=K.b;if(s.r>=STORIES.length)return;const S=STORIES[s.r];
 if(s.at==null){if(v===S.whole){s.at=v;s.bad=-1;A.sound.pop();return tell(`Yes: start on ${v}, all the ${S.who} at first. Now hop back ${S.take}.`)}
  s.bad=v;A.sound.miss();return tell(v===S.take?`${S.take} is how many go away. That is how many hops. Start on how many there were at first: ${S.whole}.`:`Count the ${S.who} at the start of the story: there were ${S.whole}.`)}
 const at=s.said.length?s.said[s.said.length-1]:s.at;
 if(v!==at-1){s.bad=v;A.sound.miss();return tell(v===at?`You are on ${at}. The first hop back lands on ${at-1}.`:v>at?'Take away hops back, to smaller numbers.':`One step at a time: one back from ${at} is ${at-1}.`)}
 s.said.push(v);s.bad=-1;A.sound.pop();if(s.said.length<S.take)return tell(`${v}. ${S.take-s.said.length} more.`);
 const msg=`${S.whole} … ${s.said.join(', ')}. ${v} ${S.who} are left.`;s.r++;s.at=null;s.said=[];tell(msg+(s.r<STORIES.length?' Next story.':''))}
/* 3. cakes leave a shut box */
const keyR=()=>{const n=5,gap=8,w=Math.min(84,(A.W-24-gap*(n-1))/n),x0=(A.W-(w*n+gap*(n-1)))/2;return Array.from({length:n},(_,i)=>({v:BOX.whole-4+i,x:x0+i*(w+gap),y:A.H*.8,w,h:Math.min(A.H*.15,60)}))};
const boxR=()=>({x:A.W*.18,y:A.H*.2,w:Math.min(A.W*.36,230),h:A.H*.42});
function drawBox(){const s=K.c,g=A.ctx,b=boxR();paper();
 g.fillStyle='#fbbf24';A.paint.rrect(b.x,b.y,b.w,b.h,12);g.fill();g.strokeStyle='#92400e';g.lineWidth=3;g.stroke();
 g.fillStyle='#f59e0b';A.paint.rrect(b.x-6,b.y-10,b.w+12,22,8);g.fill();g.stroke();
 pill(`${BOX.whole} cakes inside`,b.x+b.w/2,b.y+b.h*.55,{n:13});
 for(let i=0;i<s.out;i++){const x=b.x+b.w+30+i*Math.min(46,(A.W-b.x-b.w-40)/3),y=b.y+b.h*.6;g.fillStyle='#f472b6';g.beginPath();g.arc(x,y-8,13,Math.PI,0);g.fill();g.fillStyle='#d97706';g.fillRect(x-13,y-8,26,16);g.strokeStyle=DARK;g.lineWidth=1;g.strokeRect(x-13,y-8,26,16)}
 pill(s.out>=BOX.take&&!s.need?`${BOX.whole} … ${s.said.join(', ')}: ${BOX.whole-BOX.take} left in the box`:s.need?'How many cakes are still in the box?':'Tap the box to take a cake out',A.W/2,A.H*.08,{n:13,ok:s.out>=BOX.take&&!s.need});
 keyR().forEach(r=>{box(r,{no:s.bad===r.v});txt(String(r.v),r.x+r.w/2,r.y+r.h/2+1,22,DARK,900)})}
function takeCake(){const s=K.c;if(s.need)return tell('First tap how many cakes are still in the box.');if(s.out>=BOX.take)return tell('3 cakes are out. That is the whole take-away.');
 s.out++;s.need=true;s.bad=-1;A.sound.pop();tell('A cake came out. The lid is shut. How many are still inside?')}
function cakeKey(v){const s=K.c,left=BOX.whole-s.out;if(!s.need)return tell(s.out>=BOX.take?'All 3 cakes are out.':'Take a cake out first.');
 if(v!==left){s.bad=v;A.sound.miss();return tell(v===left+1?`${v} is how many were in before. One came out, so count back one: ${left}.`:`One less than ${left+1} is ${left}. Count back one for each cake.`)}
 s.need=false;s.bad=-1;s.said.push(v);A.sound.pop();tell(s.out<BOX.take?`Yes, ${v} inside.`:`Yes: ${BOX.whole} … ${s.said.join(', ')}. ${v} cakes left, and the lid never opened.`)}
/* 4. spot the robot's slip */
const verdictR=()=>[0,1].map(k=>{const w=Math.min(170,(A.W-36)/2);return{k,x:A.W/2+(k?6:-w-6),y:A.H*.78,w,h:Math.min(A.H*.17,64)}});
function drawRobot(){const s=K.d,g=A.ctx;paper();if(s.i>=ROBOT.length){pill('All 4 robot sums checked',A.W/2,A.H*.15,{ok:1});pill('Slips: saying the start number, counting on',A.W/2,A.H*.4,{n:13});return}
 const R=ROBOT[s.i],cx=A.W*.16,cy=A.H*.3,u=Math.min(A.W*.09,40);
 g.fillStyle='#94a3b8';A.paint.rrect(cx-u,cy-u,u*2,u*1.7,10);g.fill();g.strokeStyle=DARK;g.lineWidth=2;g.stroke();
 g.fillStyle='#0ea5e9';[-1,1].forEach(e=>{g.beginPath();g.arc(cx+e*u*.45,cy-u*.3,u*.22,0,7);g.fill()});g.fillStyle=DARK;g.fillRect(cx-u*.4,cy+u*.25,u*.8,u*.12);
 g.strokeStyle=DARK;g.beginPath();g.moveTo(cx,cy-u);g.lineTo(cx,cy-u*1.4);g.stroke();g.fillStyle='#ef4444';g.beginPath();g.arc(cx,cy-u*1.5,u*.15,0,7);g.fill();
 const ans=R.said[R.said.length-1],start=+R.s.split(' ')[0];
 pill(`${R.s}: "${start} … ${R.said.join(', ')}. So ${ans}!"`,A.W*.6,A.H*.18,{n:13});
 pill(`Robot sum ${s.i+1} of ${ROBOT.length}. Right, or a slip?`,A.W*.6,A.H*.38,{n:12});
 verdictR().forEach(r=>{box(r,{no:s.bad===r.k,on:false});txt(r.k?'✗ Slip':'✓ Right',r.x+r.w/2,r.y+r.h/2+1,17,DARK,900)})}
function judgeRobot(k){const s=K.d;if(s.i>=ROBOT.length)return;const R=ROBOT[s.i],sayOk=k===0;
 if(sayOk!==R.ok){s.bad=k;A.sound.miss();return tell(R.ok?`Check it: ${R.fix} The robot was right.`:`Look again at the first number it said. ${R.fix}`)}
 s.bad=-1;A.sound.pop();s.i++;tell((R.ok?'Yes, right. ':'Yes, a slip. ')+R.fix)}
/* 5. check by counting on */
function drawCheck(){const s=K.e;paper();if(s.i>=CHECKS.length){pill('All 3 answers checked',A.W/2,A.H*.12,{ok:1});pill('9 − 3 = 6 checks. 7 − 2 is 5, 10 − 3 is 7.',A.W/2,A.H*.3,{n:13});track(1,12,{});return}
 const C=CHECKS[s.i];pill(`Check ${C.whole} − ${C.take} = ${C.claim}? Count on ${C.take} from ${C.claim}.`,A.W/2,A.H*.08,{n:13});
 pill(s.said.length?`${C.claim} … ${s.said.join(', ')}`:`Start on ${C.claim}. Tap where the first hop forward lands.`,A.W/2,A.H*.2,{n:12});
 track(1,12,{start:C.claim,fwd:1,bad:s.bad,land:C.whole,frog:s.said.length?s.said[s.said.length-1]:C.claim,arcs:s.said.map((v,i)=>[i?s.said[i-1]:C.claim,v])})}
function checkTap(v){const s=K.e;if(s.i>=CHECKS.length)return;const C=CHECKS[s.i],at=s.said.length?s.said[s.said.length-1]:C.claim;
 if(v!==at+1){s.bad=v;A.sound.miss();return tell(v<at?'To check a take-away, count on: hop forward to bigger numbers.':v===at?`You are on ${at}. The first hop forward lands on ${at+1}.`:`One step at a time: one on from ${at} is ${at+1}.`)}
 s.said.push(v);s.bad=-1;A.sound.pop();if(s.said.length<C.take)return tell(`${v}. ${C.take-s.said.length} more.`);
 const ok=v===C.whole,msg=ok?`Landed on ${v}, the start number. ${C.whole} − ${C.take} = ${C.claim} checks.`:`Landed on ${v}, not ${C.whole}. ${C.claim} is wrong: ${C.whole} − ${C.take} = ${C.whole-C.take}. Someone said the start number as a hop.`;
 s.i++;s.said=[];tell(msg)}
function draw(){const k=part();if(k==='quiz'){paper();pill('Challenge',A.W/2,A.H*.2,{ok:1});pill('Start on the whole. Hop back once for each one taken.',A.W/2,A.H*.5,{n:13});return}
 ({hop:drawHop,story:drawStory,box:drawBox,robot:drawRobot,check:drawCheck})[k]();A.fx.draw(A.ctx)}
function down(p){const k=part();
 if(k==='hop'){const r=hopCell(p,1,10);if(r)hopTo(r.v);return false}
 if(k==='story'){const r=hopCell(p,1,10);if(r)storyTap(r.v);return false}
 if(k==='box'){const key=keyR().find(r=>inside(p,r));if(key)return cakeKey(key.v),false;if(inside(p,boxR()))takeCake();return false}
 if(k==='robot'){const v=verdictR().find(r=>inside(p,r));if(v)judgeRobot(v.k);return false}
 if(k==='check'){const r=hopCell(p,1,12);if(r)checkTap(r.v);return false}
 return false}
function reset(){run++;for(const k in K)delete K[k];Object.assign(K,{a:{r:0,at:HOPS[0][0],said:[],bad:-1},b:{r:0,at:null,said:[],bad:-1},c:{out:0,need:false,said:[],bad:-1},d:{i:0,bad:-1},e:{i:0,said:[],bad:-1},check:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();K.check()}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,ok){reset();tell(DESC[i]);K.check=finish(i,ok,DONE[i])}
function play(i,acts,ms){steps[i].go();const r0=run;acts.forEach((f,j)=>setTimeout(()=>{if(r0===run)f()},ms*(j+1)))}
function controls(){if(!ctl)return;ctl.innerHTML='';const k=part(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(k==='hop'&&K.a.r<HOPS.length){B('🐸 Hop back one',()=>hopTo(K.a.at-1),`Hop back one, to ${K.a.at-1}`);B(`Stay on ${K.a.at}`,()=>hopTo(K.a.at),`Say ${K.a.at} again`);B('Hop forward',()=>hopTo(K.a.at+1),'Hop forward one')}
 if(k==='story'&&K.b.r<STORIES.length){const S=STORIES[K.b.r];if(K.b.at==null){B(`Start on ${S.whole}`,()=>storyTap(S.whole));B(`Start on ${S.take}`,()=>storyTap(S.take))}
  else{const at=K.b.said.length?K.b.said[K.b.said.length-1]:K.b.at;B('Hop back one',()=>storyTap(at-1),`Hop back one, to ${at-1}`)}}
 if(k==='box'){if(K.c.out<BOX.take&&!K.c.need)B('🧁 Take a cake out',takeCake);if(K.c.need)for(let v=BOX.whole-4;v<=BOX.whole;v++)B(String(v),()=>cakeKey(v),`${v} cakes left`)}
 if(k==='robot'&&K.d.i<ROBOT.length){B('✓ Right',()=>judgeRobot(0),'The robot is right');B('✗ Slip',()=>judgeRobot(1),'The robot made a slip')}
 if(k==='check'&&K.e.i<CHECKS.length){const C=CHECKS[K.e.i],at=K.e.said.length?K.e.said[K.e.said.length-1]:C.claim;B('Hop forward one',()=>checkTap(at+1),`Hop forward one, to ${at+1}`);B('Hop back one',()=>checkTap(at-1))}}
const steps=[
{h:'Hop back',p:'Take away by hopping back along the track. Tap where each hop lands, or use the buttons.',
 predict:{q:'7 take away 3. Is 7 your first count?',opts:['Yes: 7, 6, 5','No: the first hop lands on 6'],ans:1},task:'Hop back for 7 − 3 and 9 − 2',
 show:()=>play(0,HOPS.flatMap(([w,t])=>[...Array(t)].map((_,j)=>()=>hopTo(w-j-1))),520),
 go:()=>begin(0,()=>K.a.r>=HOPS.length)},
{h:'Start on the whole',p:'Read the story. Tap the number to start on, then hop back once for each one that goes away.',
 predict:{q:'10 birds, 2 fly away. Where do you start?',opts:['On 2, the birds that fly','On 10, all the birds at first'],ans:1},task:'Solve both stories',
 show:()=>play(1,STORIES.flatMap(S=>[()=>storyTap(S.whole),...[...Array(S.take)].map((_,j)=>()=>storyTap(S.whole-j-1))]),420),
 go:()=>begin(1,()=>K.b.r>=STORIES.length)},
{h:'Lid on the box',p:'Tap the box to take a cake out. The lid stays shut. Then tap how many cakes are still inside.',
 predict:{q:'The lid is shut. Do you need to count all the cakes from 1?',opts:['Yes, open it and count from 1','No, start at 8 and count back'],ans:1},task:'Take 3 cakes out',
 show:()=>play(2,[...Array(BOX.take)].flatMap((_,j)=>[()=>takeCake(),()=>cakeKey(BOX.whole-j-1)]),500),
 go:()=>begin(2,()=>K.c.out>=BOX.take&&!K.c.need)},
{h:'Spot the slip',p:'The robot counts back out loud. Is each answer right, or did it slip?',task:'Check all 4 robot sums',
 show:()=>play(3,ROBOT.map(R=>()=>judgeRobot(R.ok?0:1)),700),
 go:()=>begin(3,()=>K.d.i>=ROBOT.length)},
{h:'Check by counting on',p:'Counting on undoes counting back. Hop forward from the answer. If you land on the start number, it checks.',
 predict:{q:'Sam says 7 − 2 = 6. Count on 2 from 6. Where do you land?',opts:['On 7, so Sam is right','On 8, so Sam is wrong'],ans:1},task:'Check all 3 answers',
 show:()=>play(4,CHECKS.flatMap(C=>[...Array(C.take)].map((_,j)=>()=>checkTap(C.claim+j+1))),420),
 go:()=>begin(4,()=>K.e.i>=CHECKS.length)},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>K.check()});
function why(t){let m='Start on the whole and hop back once for each one taken away.';
 if(t==='start')m='Do not say the start number as a count. The first hop back lands on 1 less.';
 if(t==='on')m='Take away makes the number smaller. Count back, not on.';
 if(t==='part')m='Start on the whole, how many there were at first, not on the number taken away.';
 if(t==='one')m='No need to count from 1. Start on the big number and count back.';
 if(t==='checkback')m='To check a take-away, count on from the answer. You should land on the start number.';
 return m}
function ask(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.6,tall:1.1,draw,onStep:S=>{chal.hidden=S.step!==5;ctl.hidden=S.step===5;controls()},
 init:S=>{A=S;const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Counting back lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down});controls()}}).start()})})();
