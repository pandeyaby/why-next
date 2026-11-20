/* Flagship – what astronauts do (ages 5–7; KS1 science context, NASA "What Is an Astronaut?"). Scenes: dress an
   astronaut in the parts of a spacesuit that carry air; drag a rocket up a ladder of heights (planes, edge of space,
   space station); choose how astronauts drink, sleep, eat and keep fit where things float; jump on Earth and on the
   Moon; check a robot. Data and pictures in learn/astro_art.js. Distinct from flagsolscale (planet sizes and distances)
   and flagfreefall (free fall and orbits for older learners). */
(()=>{const T=AST;
VIS.reg('flagastro',c=>{let A,row,quizBox,qq=-1,tick=0;const M={};c.fig.classList.add('young');
const PEN='#111827',PASS='#15803d',FAIL='#b91c1c',RIM='#94a3b8',SKY='#eef2ff',SPACE='#1e1b4b',FF='px system-ui,sans-serif';
const now=()=>['suit','fly','life','jump','robot','quiz'][A.step];
const px=n=>A.narrow?n:Math.round(n*1.2);
const within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function back(){const g=A.ctx;g.fillStyle=SKY;g.fillRect(0,0,A.W,A.H)}
/* a label: white rounded box with dark words, shrinking to fit */
function note(s,x,y,o){o=o||{};const g=A.ctx;let f=px(o.n||14);g.font=`800 ${f}${FF}`;while(f>9&&g.measureText(s).width+24>(o.max||A.W-8)){f--;g.font=`800 ${f}${FF}`}
 const w=g.measureText(s).width+24,h=f+16,l=Math.max(4,Math.min(A.W-w-4,x-w/2));g.fillStyle='#ffffff';A.paint.rrect(l,y-h/2,w,h,8);g.fill();
 g.lineWidth=o.ok||o.no?3:1.5;g.strokeStyle=o.ok?PASS:o.no?FAIL:RIM;g.stroke();g.fillStyle=PEN;g.textAlign='center';g.textBaseline='middle';g.fillText(s,l+w/2,y+1)}
/* a big tap target with words on one or two lines */
function key(b,s,o){o=o||{};const g=A.ctx;g.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':'#ffffff';A.paint.rrect(b.x,b.y,b.w,b.h,12);g.fill();g.lineWidth=o.no||o.ok?3.5:1.5;g.strokeStyle=o.no?FAIL:o.ok?PASS:RIM;g.stroke();
 let f=px(o.n||13);g.font=`800 ${f}${FF}`;const ws=s.split(' ');let ln=[s];if(g.measureText(s).width>b.w-10&&ws.length>1){const h=Math.ceil(ws.length/2);ln=[ws.slice(0,h).join(' '),ws.slice(h).join(' ')]}
 while(f>9&&ln.some(t=>g.measureText(t).width>b.w-8)){f--;g.font=`800 ${f}${FF}`}g.fillStyle=PEN;g.textAlign='center';g.textBaseline='middle';ln.forEach((t,k)=>g.fillText(t,b.x+b.w/2,b.y+b.h/2+(k-(ln.length-1)/2)*(f+3)))}
/* 1. suit up */
const body=()=>({x:8,y:A.H*.14,w:A.W*(A.narrow?.3:.34),h:A.H*.8});
const parts=()=>{const B=body(),x0=B.x+B.w+8,gap=8,w=(A.W-x0-8-gap)/2,h=(B.h-2*gap)/3;return T.SUIT.map((S,i)=>({i,x:x0+(i%2)*(w+gap),y:B.y+Math.floor(i/2)*(h+gap),w,h}))};
function drawSuit(){const s=M.suit,g=A.ctx,B=body();back();const n=s.on.length;note(n<4?`Tap what keeps the astronaut safe: ${n} of 4`:'Ready for space',A.W/2,A.H*.06,{n:13,ok:n>=4});
 g.fillStyle=SPACE;A.paint.rrect(B.x,B.y,B.w,B.h,12);g.fill();T.paintAstro(g,B.x+B.w/2,B.y+B.h*.42,Math.min(B.w*.42,B.h*.3),s.on);
 parts().forEach(b=>key(b,T.SUIT[b.i].t,{ok:s.on.includes(b.i),no:s.miss===b.i,n:13}))}
function wear(i){const s=M.suit,S=T.SUIT[i];if(s.on.includes(i))return tell(`${S.t}: already on.`);if(s.on.length>=4)return;
 if(!S.good){s.miss=i;A.sound.miss();return tell(`Not that one. ${S.why}`)}
 s.miss=-1;s.on.push(i);A.sound.pop();const left=4-s.on.length;tell(`Yes: ${S.why}`+(left?` ${left} more.`:' The suit is ready.'))}
/* 2. fly the rocket up the ladder of heights (stops are evenly spaced: the ladder is not to scale) */
const lad=()=>({x:A.W*.5,top:A.H*.18,bot:A.H*.86});
const stopY=k=>{const L=lad();return L.bot-(L.bot-L.top)*k/(T.STOPS.length-1)};
const goKey=()=>({x:8,y:A.H*.74,w:Math.min(150,A.W*.36),h:Math.min(58,A.H*.14)});
function drawFly(){const s=M.fly,g=A.ctx,L=lad();const k=Math.round(s.at);
 g.fillStyle=SKY;g.fillRect(0,0,A.W,A.H);g.fillStyle=SPACE;g.fillRect(0,0,A.W,(stopY(2)+stopY(1))/2);g.fillStyle='#bbf7d0';g.fillRect(0,L.bot+10,A.W,A.H-L.bot-10);
 if(s.i>=T.TRIPS.length){note('All 3 trips done',A.W/2,A.H*.08,{ok:1})}else note(`Trip ${s.i+1} of 3: ${T.TRIPS[s.i].ask}`,A.W/2,A.H*.08,{n:13,ok:s.good,no:s.bad});
 T.STOPS.forEach((S,j)=>{const y=stopY(j);g.strokeStyle=j>=2?'#c7d2fe':'#64748b';g.lineWidth=2;g.setLineDash([6,5]);g.beginPath();g.moveTo(A.W*.08,y);g.lineTo(A.W*.92,y);g.stroke();g.setLineDash([]);
  note(`${S.t}: ${S.km} km`,A.W*.76,y-px(12),{n:11,max:A.W*.46})});
 T.paintIcon(g,'plane',A.W*.18,stopY(1)-8,Math.min(60,A.W*.12));T.paintIcon(g,'station',A.W*.2,stopY(3)-6,Math.min(70,A.W*.14));
 const ry=L.bot-(L.bot-L.top)*s.at/(T.STOPS.length-1),u=Math.min(34,A.H*.07);T.paintIcon(g,'rocket',L.x-A.W*.1,ry-u*.3,u);if(s.drag)T.paintIcon(g,'flame',L.x-A.W*.1,ry+u*.2,u);
 if(s.i<T.TRIPS.length)key(goKey(),'Stop here',{n:14})}
function setAt(v){const s=M.fly;if(s.i>=T.TRIPS.length)return;s.at=Math.max(0,Math.min(T.STOPS.length-1,v));s.good=s.bad=false;A.redraw()}
function landAt(){const s=M.fly;s.at=Math.round(s.at);s.drag=false;tell(`The rocket is at: ${T.STOPS[s.at].t}, ${T.STOPS[s.at].km} km up. Tap Stop here.`)}
function stopHere(){const s=M.fly;if(s.i>=T.TRIPS.length)return;s.at=Math.round(s.at);const want=T.TRIPS[s.i].to,S=T.STOPS[s.at],W=T.STOPS[want];
 if(s.at!==want){s.bad=true;A.sound.miss();return tell(s.at===1&&want===2?'Planes fly about 10 km up. That is still in the air. Space starts higher, at about 100 km.':s.at===2&&want===3?'Space starts at about 100 km, but the space station is higher, about 400 km up.':`That is ${S.t}, ${S.km} km up. ${W.t} is ${W.km} km up: fly ${s.at<want?'higher':'lower'}.`)}
 s.good=true;A.sound.pop();s.i++;const msg=`Yes: ${W.t} is about ${W.km} km up.`+(want===3?' That is about 40 times as high as planes fly.':'');tell(msg+(s.i<T.TRIPS.length?' Next trip.':''))}
/* 3. life on the space station */
const lifeKeys=()=>{const w=Math.min(200,(A.W-30)/2);return[0,1].map(k=>({i:k,x:A.W/2+(k?6:-w-6),y:A.H*.6,w,h:Math.min(A.H*.24,90)}))};
function drawLife(){const s=M.life,g=A.ctx;back();if(s.i>=T.LIFE.length){note('All 4 jobs done the space way',A.W/2,A.H*.18,{ok:1});note('In space, things float',A.W/2,A.H*.42,{n:13});return}
 const L=T.LIFE[s.i];note(`Job ${s.i+1} of 4: ${L.need}. How do astronauts do it?`,A.W/2,A.H*.07,{n:13});
 g.fillStyle='#ffffff';A.paint.rrect(A.W*.3,A.H*.16,A.W*.4,A.H*.36,14);g.fill();g.strokeStyle=RIM;g.lineWidth=1.5;g.stroke();T.paintIcon(g,L.icon,A.W/2,A.H*.32,Math.min(A.W*.16,A.H*.2));
 [[.2,.2],[.8,.3],[.15,.45]].forEach(([a,b],j)=>{g.fillStyle='rgba(59,130,246,.85)';g.beginPath();g.ellipse(A.W*a,A.H*b,9+j*2,7+j,j,0,7);g.fill()});
 lifeKeys().forEach(b=>key(b,L.opts[b.i],{no:s.miss===b.i,n:13}))}
function choose(k){const s=M.life;if(s.i>=T.LIFE.length)return;const L=T.LIFE[s.i];
 if(k!==L.ans){s.miss=k;A.sound.miss();return tell(`Not in space. ${L.why}`)}
 s.miss=-1;s.i++;A.sound.pop();tell(`Yes: ${L.opts[k]}. ${L.why}`+(s.i<T.LIFE.length?' Next job.':''))}
/* 4. jump on Earth and on the Moon */
const jumpKeys=()=>{const w=(A.W-24)/2;return[{i:0,t:'Jump on Earth',x:8,y:A.H*.66,w,h:Math.min(56,A.H*.13)},{i:1,t:'Jump on the Moon',x:16+w,y:A.H*.66,w,h:Math.min(56,A.H*.13)}]};
const timesKeys=()=>{const w=(A.W-32)/3;return T.TIMES.map((n,i)=>({i,n,x:8+i*(w+8),y:A.H*.83,w,h:Math.min(52,A.H*.13)}))};
function drawJump(){const s=M.jump,g=A.ctx;back();const half=A.W/2,base=A.H*.58,scale=(A.H*.3)/T.JUMP.moon;
 g.fillStyle='#bbf7d0';g.fillRect(0,base,half-2,A.H*.05);g.fillStyle=SPACE;g.fillRect(half+2,0,half,base);g.fillStyle='#d1d5db';g.fillRect(half+2,base,half,A.H*.05);
 const ask=s.earth&&s.moon&&!s.picked;if(ask)note('How many times as high on the Moon?',A.W/2,A.H*.06,{n:13});else{note('Earth',half/2,A.H*.06,{n:12});note('Moon',half*1.5,A.H*.06,{n:12})}
 [['earth',0],['moon',1]].forEach(([w,j])=>{const h=s[w]?T.JUMP[w]:0,x=half*(j+.5),u=Math.min(24,A.W*.05);g.strokeStyle=j?'#fde68a':'#f59e0b';g.lineWidth=2;g.setLineDash([4,4]);g.beginPath();g.moveTo(x+u*2,base);g.lineTo(x+u*2,base-h*scale);g.stroke();g.setLineDash([]);
  T.paintAstro(g,x,base-u*1.75-h*scale,u,[0,1,3,5]);if(s[w])note(`${T.JUMP[w]} cm`,x+u*4,base-h*scale-8,{n:11,max:half*.6})});
 jumpKeys().forEach(b=>key(b,b.t,{ok:!!s[b.i?'moon':'earth'],n:13}));
 if(s.earth&&s.moon){timesKeys().forEach(b=>key(b,b.n+' times',{ok:s.picked&&b.n===6,no:s.miss===b.i,n:14}))}}
function jump(w){const s=M.jump;s[w]=true;A.sound.tick();tell(w==='earth'?`On Earth the astronaut jumps about ${T.JUMP.earth} cm.`:`On the Moon the same jump goes about ${T.JUMP.moon} cm high.`+(s.earth&&s.moon?' Now choose how many times as high.':''))}
function times(i){const s=M.jump;if(!(s.earth&&s.moon))return tell('Jump on Earth and on the Moon first.');const n=T.TIMES[i];
 if(n!==6){s.miss=i;A.sound.miss();return tell(n<6?`${T.JUMP.earth} cm two times is only ${2*T.JUMP.earth} cm. Count how many ${T.JUMP.earth}s make ${T.JUMP.moon}.`:'That is far too many. The Moon still pulls a little.')}
 s.miss=-1;s.picked=true;A.sound.pop();tell(`Yes: ${T.JUMP.moon} cm is 6 lots of ${T.JUMP.earth} cm. The Moon pulls you about 6 times less than the Earth.`)}
/* 5. robot */
const rs=()=>{const w=Math.min(170,(A.W-36)/2);return[0,1].map(k=>({i:k,t:k?'✗ Slip':'✓ Right',x:A.W/2+(k?6:-w-6),y:A.H*.72,w,h:Math.min(A.H*.18,62)}))};
function drawRobot(){const s=M.robot,g=A.ctx;back();if(s.i>=T.ROBOT.length){note('All 5 sayings checked',A.W/2,A.H*.16,{ok:1});note('You know what astronauts do',A.W/2,A.H*.4,{n:13});return}
 const Q=T.ROBOT[s.i],x=A.W/2,y=A.H*.2,u=Math.min(A.W*.06,26);g.fillStyle='#cbd5e1';A.paint.rrect(x-u,y-u*.9,u*2,u*1.8,u*.5);g.fill();g.strokeStyle=PEN;g.lineWidth=2;g.stroke();
 g.fillStyle=PEN;g.beginPath();g.arc(x-u*.4,y-u*.15,u*.15,0,7);g.arc(x+u*.4,y-u*.15,u*.15,0,7);g.fill();g.fillRect(x-u*.3,y+u*.4,u*.6,3);
 note(Q.say,A.W/2,A.H*.44,{n:12});note(`Saying ${s.i+1} of ${T.ROBOT.length}: right, or a slip?`,A.W/2,A.H*.58,{n:12});rs().forEach(b=>key(b,b.t,{no:s.miss===b.i,n:16}))}
function robotSay(k){const s=M.robot;if(s.i>=T.ROBOT.length)return;const Q=T.ROBOT[s.i];
 if((k===0)!==Q.ok){s.miss=k;A.sound.miss();return tell(Q.ok?`Think again. ${Q.fix}`:`Careful, that is a slip. ${Q.fix}`)}
 s.miss=-1;s.i++;A.sound.pop();tell((Q.ok?'Yes, right. ':'Yes, a slip. ')+Q.fix)}
function draw(){const k=now();if(k==='quiz'){back();note('Challenge',A.W/2,A.H*.2,{ok:1});note('Astronaut expert',A.W/2,A.H*.5,{n:13});return}
 ({suit:drawSuit,fly:drawFly,life:drawLife,jump:drawJump,robot:drawRobot})[k]();A.fx.draw(A.ctx)}
function press(p){const k=now();
 if(k==='suit'){const b=parts().find(q=>within(p,q));if(b)wear(b.i)}
 else if(k==='fly'){if(within(p,goKey())){stopHere();return false}const L=lad();if(M.fly.i<T.TRIPS.length&&p.x>A.W*.25&&p.x<A.W*.75&&p.y>L.top-30&&p.y<L.bot+30){M.fly.drag=true;setAt((L.bot-p.y)/(L.bot-L.top)*(T.STOPS.length-1));return true}}
 else if(k==='life'){const b=lifeKeys().find(q=>within(p,q));if(b)choose(b.i)}
 else if(k==='jump'){const b=jumpKeys().find(q=>within(p,q));if(b){jump(b.i?'moon':'earth');return false}const t=timesKeys().find(q=>within(p,q));if(t&&M.jump.earth&&M.jump.moon)times(t.i)}
 else if(k==='robot'){const b=rs().find(q=>within(p,q));if(b)robotSay(b.i)}
 return false}
function slide(p){if(now()==='fly'&&M.fly.drag){const L=lad();setAt((L.bot-p.y)/(L.bot-L.top)*(T.STOPS.length-1))}}
function lift(){if(M.fly&&M.fly.drag)landAt()}
function fresh(){tick++;for(const k in M)delete M[k];Object.assign(M,{suit:{on:[],miss:-1},fly:{i:0,at:0,good:false,bad:false,drag:false},life:{i:0,miss:-1},jump:{earth:false,moon:false,picked:false,miss:-1},robot:{i:0,miss:-1},hook:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();twins();M.hook()}
/* every canvas action also has a button under the canvas */
function twins(){if(!row)return;row.innerHTML='';const k=now(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},row,t).onclick=f};
 if(k==='suit'&&M.suit.on.length<4)T.SUIT.forEach((S,i)=>add(S.t,()=>wear(i),`Put on: ${S.t}`));
 if(k==='fly'&&M.fly.i<T.TRIPS.length){add('Up',()=>{setAt(Math.round(M.fly.at)+1);landAt()},'Fly the rocket one level higher');add('Down',()=>{setAt(Math.round(M.fly.at)-1);landAt()},'Fly the rocket one level lower');add('Stop here',stopHere,'Stop the rocket here')}
 if(k==='life'&&M.life.i<T.LIFE.length){const L=T.LIFE[M.life.i];L.opts.forEach((o,i)=>add(o,()=>choose(i),`${L.need}: ${o}`))}
 if(k==='jump'){add('Jump on Earth',()=>jump('earth'));add('Jump on the Moon',()=>jump('moon'));if(M.jump.earth&&M.jump.moon&&!M.jump.picked)T.TIMES.forEach((n,i)=>add(n+' times',()=>times(i),`The Moon jump is ${n} times as high`))}
 if(k==='robot'&&M.robot.i<T.ROBOT.length){add('✓ Right',()=>robotSay(0),'The robot is right');add('✗ Slip',()=>robotSay(1),'The robot made a slip')}}
const settle=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function arrive(i,ok){fresh();tell(T.DESC[i]);M.hook=settle(i,ok,T.DONE[i])}
function auto(i,acts,ms){steps[i].go();const t0=tick;acts.forEach((f,j)=>setTimeout(()=>{if(t0===tick)f()},ms*(j+1)))}
const steps=[
{h:'Suit up',p:'Out in space there is no air to breathe. Tap the 4 things that keep the astronaut safe.',
 predict:{q:'Could an astronaut breathe in space without a helmet?',opts:['Yes, there is air up there','No, there is no air in space'],ans:1},task:'Put on the 4 safe things',
 show:()=>auto(0,T.SUIT.map((S,i)=>i).filter(i=>T.SUIT[i].good).map(i=>()=>wear(i)),600),go:()=>arrive(0,()=>M.suit.on.length>=4)},
{h:'Up to space',p:'Rockets carry astronauts up to space. Drag the rocket up the ladder, then tap Stop here.',
 predict:{q:'Which is higher: where planes fly, or the space station?',opts:['About the same height','The space station, far higher'],ans:1},task:'Make all 3 trips',
 show:()=>auto(1,T.TRIPS.flatMap(t=>[()=>{setAt(t.to);landAt()},()=>stopHere()]),500),go:()=>arrive(1,()=>M.fly.i>=T.TRIPS.length)},
{h:'Living in space',p:'Astronauts live on the space station for months. Everything floats there. How do they do each job?',
 predict:{q:'An astronaut lets go of some water on the space station. What happens?',opts:['It falls to the floor','It floats in wobbly balls'],ans:1},task:'Do all 4 jobs the space way',
 show:()=>auto(2,T.LIFE.map(L=>()=>choose(L.ans)),650),go:()=>arrive(2,()=>M.life.i>=T.LIFE.length)},
{h:'Jump on the Moon',p:'Astronauts walked on the Moon. Jump on Earth, then jump on the Moon, and compare.',
 predict:{q:'Where can the astronaut jump higher?',opts:['On Earth','On the Moon'],ans:1},task:'Jump in both places and choose how many times as high',
 show:()=>auto(3,[()=>jump('earth'),()=>jump('moon'),()=>times(1)],700),go:()=>arrive(3,()=>M.jump.picked)},
{h:'Check the robot',p:'The robot says things about astronauts. Is it right, or a slip?',task:'Check all 5 sayings',
 show:()=>auto(4,T.ROBOT.map(Q=>()=>robotSay(Q.ok?0:1)),600),go:()=>arrive(4,()=>M.robot.i>=T.ROBOT.length)},
{h:'Challenge',p:'',go:()=>{fresh();askQ()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>M.hook()});
/* feedback for each wrong challenge answer, by the slip it shows */
function why(t){let m='Astronauts travel in rockets and live on the space station, where things float.';
 if(t==='air')m='There is no air in space. The helmet and backpack carry air for the astronaut to breathe.';
 if(t==='moon')m='No one lives on the Moon or the Sun. Astronauts today live on the space station, going round the Earth.';
 if(t==='never')m='People did walk on the Moon. Neil Armstrong was first, in 1969, and 12 people walked there by 1972.';
 if(t==='cup')m='Water floats out of a cup in space. Astronauts drink from a pouch with a straw.';
 if(t==='high')m='Planes fly about 10 km up. The space station is about 400 km up, about 40 times as high.';
 if(t==='fit')m='Floating makes bones and muscles weak, so astronauts exercise about 2 hours a day to keep them strong.';
 if(t==='grav')m='The Moon does pull you, just about 6 times less than the Earth, so you jump about 6 times as high.';
 return m}
function askQ(){qq++;const Q=T.QS[qq%T.QS.length],all=[[Q.a,'ok'],...Q.o],r=qq%3,ord=all.slice(r).concat(all.slice(0,r));
 quizBox.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=quizBox.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>reply(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function reply(t,a){quizBox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quizBox.querySelector('.fl-fb'),yes=t==='ok';if(yes)A.win();else A.sound.miss();
 fb.innerHTML=(yes?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="lbtn sm">Next one →</button>';fb.querySelector('button').onclick=askQ;c.say(yes?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:x=>{quizBox.hidden=x.step!==5;row.hidden=x.step===5;twins()},
 init:x=>{A=x;const w=c.el('div',{class:'fl-below'},A.below);row=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Astronaut lab buttons'},w);quizBox=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down:press,move:slide,up:lift});twins()}}).start()})})();
