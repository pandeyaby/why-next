/* Flagship – protecting eyes from sunlight (ages 7–8; NC 2013 Year 3 light). Scenes: judge ways of looking at or near
   the Sun as safe or not; measure how bright four places are with a light meter; pick what protects a child's eyes;
   drag the screen of a pinhole viewer to size a picture of the Sun; check a robot. Data and card pictures in
   learn/sunsafe_art.js. Distinct from flagsun (sunlight warms things) and flageye (how the eye works). */
(()=>{const T=SNS;
VIS.reg('flagsunsafe',c=>{let A,row,quizBox,qq=-1,tick=0;const M={};c.fig.classList.add('young');
const PEN='#111827',PASS='#15803d',FAIL='#b91c1c',RIM='#94a3b8',BG='#fff7ed',GRASS='#bbf7d0',FF='px system-ui,sans-serif';
const now=()=>['ways','meter','gear','pin','robot','quiz'][A.step];
const px=n=>A.narrow?n:Math.round(n*1.2);
const within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function ground(){const g=A.ctx;g.fillStyle=BG;g.fillRect(0,0,A.W,A.H);g.fillStyle=GRASS;g.fillRect(0,A.H*.9,A.W,A.H*.1)}
/* a note: white rounded label with dark words, shrinking to fit */
function note(s,x,y,o){o=o||{};const g=A.ctx;let f=px(o.n||14);g.font=`800 ${f}${FF}`;while(f>9&&g.measureText(s).width+24>(o.max||A.W-8)){f--;g.font=`800 ${f}${FF}`}
 const w=g.measureText(s).width+24,h=f+16,l=Math.max(4,Math.min(A.W-w-4,x-w/2));g.fillStyle='#ffffff';A.paint.rrect(l,y-h/2,w,h,8);g.fill();
 g.lineWidth=o.ok||o.no?3:1.5;g.strokeStyle=o.ok?PASS:o.no?FAIL:RIM;g.stroke();g.fillStyle=PEN;g.textAlign='center';g.textBaseline='middle';g.fillText(s,l+w/2,y+1)}
/* a tile with words on one or two lines (at the bottom when it also holds a picture) */
function tile(b,s,o){o=o||{};const g=A.ctx;g.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':'#ffffff';A.paint.rrect(b.x,b.y,b.w,b.h,10);g.fill();g.lineWidth=o.no||o.ok?3.5:1.5;g.strokeStyle=o.no?FAIL:o.ok?PASS:RIM;g.stroke();if(!s)return;
 let f=px(o.n||12);g.font=`800 ${f}${FF}`;const ws=s.split(' ');let ln=[s];if(g.measureText(s).width>b.w-10&&ws.length>1){const h=Math.ceil(ws.length/2);ln=[ws.slice(0,h).join(' '),ws.slice(h).join(' ')]}
 while(f>9&&ln.some(t=>g.measureText(t).width>b.w-8)){f--;g.font=`800 ${f}${FF}`}g.fillStyle=PEN;g.textAlign='center';g.textBaseline='middle';
 const cy=o.low?b.y+b.h-(ln.length*(f+3))/2-6:b.y+b.h/2;ln.forEach((t,k)=>g.fillText(t,b.x+b.w/2,cy+(k-(ln.length-1)/2)*(f+3)))}
const icon=(k,x,y,u)=>T.paintIcon(A.ctx,k,x,y,u);
/* 1. safe or not? */
const wayCard=()=>({x:A.W*.1,y:A.H*.15,w:A.W*.8,h:A.H*.46});
const yesNo=()=>{const w=Math.min(180,(A.W-36)/2);return[0,1].map(k=>({i:k,t:k?'Not safe':'Safe',x:A.W/2+(k?6:-w-6),y:A.H*.69,w,h:Math.min(A.H*.17,64)}))};
function drawWays(){const s=M.ways;ground();if(s.i>=T.WAYS.length){note('All 6 cards judged',A.W/2,A.H*.18,{ok:1});note('Never look straight at the Sun',A.W/2,A.H*.42,{n:13});return}
 const W=T.WAYS[s.i],C=wayCard();note(`Card ${s.i+1} of ${T.WAYS.length}: safe or not safe?`,A.W/2,A.H*.07,{n:13});tile(C,W.t,{low:1,n:13});icon(W.icon,C.x+C.w/2,C.y+C.h*.4,Math.min(C.w*.3,C.h*.42));
 yesNo().forEach(b=>tile(b,b.t,{no:s.miss===b.i,n:16}))}
function wayPick(k){const s=M.ways;if(s.i>=T.WAYS.length)return;const W=T.WAYS[s.i],safe=k===0;
 if(safe!==W.safe){s.miss=k;A.sound.miss();return tell((W.safe?'Look again: this one is safe. ':'Not safe! ')+W.why)}
 s.miss=-1;s.i++;A.sound.pop();tell((W.safe?'Yes, safe. ':'Yes, not safe. ')+W.why+(s.i<T.WAYS.length?' Next card.':''))}
/* 2. light meter */
const spots=()=>{const n=4,cols=A.narrow?2:4,gap=8,w=(A.W-16-gap*(cols-1))/cols,h=A.narrow?A.H*.2:A.H*.3;return T.PLACES.map((P,i)=>({i,x:8+(i%cols)*(w+gap),y:A.H*.13+Math.floor(i/cols)*(h+gap),w,h}))};
function drawMeter(){const s=M.meter,g=A.ctx;ground();note(s.seen.length<4?`Tap each place to measure: ${s.seen.length} of 4`:'Full sun: about 250 classrooms of light',A.W/2,A.H*.06,{n:13,ok:s.seen.length>=4});
 spots().forEach(b=>{const P=T.PLACES[b.i];tile(b,P.t,{low:1,ok:s.seen.includes(b.i)});icon(P.icon,b.x+b.w/2,b.y+b.h*.38,Math.min(b.w*.42,b.h*.5))});
 const top=A.narrow?A.H*.6:A.H*.6,gap=A.H*.075,L=12,full=A.W-24;T.PLACES.forEach((P,i)=>{const y=top+i*gap,on=s.seen.includes(i);g.fillStyle='#e5e7eb';g.fillRect(L,y,full,gap*.5);
  if(on){const w=Math.max(3,full*P.lux/100000);g.fillStyle=i===3?'#fbbf24':'#93c5fd';g.fillRect(L,y,w,gap*.5)}
  g.fillStyle=PEN;g.font=`800 ${px(11)}${FF}`;g.textAlign='left';g.textBaseline='middle';g.fillText(on?`${P.t}: ${P.lux.toLocaleString('en-GB')} lux`:`${P.t}: ?`,L+6,y+gap*.25)})}
function measure(i){const s=M.meter;if(s.seen.includes(i))return tell(`${T.PLACES[i].t} is already measured.`);s.seen.push(i);const P=T.PLACES[i];A.sound.tick();
 const r=P.lux/400,x=r<10?String(Math.round(r*10)/10):String(Math.round(r));tell(`${P.t}: about ${P.lux.toLocaleString('en-GB')} lux.`+(i===0?' That is our classroom.':` That is about ${x} times as bright as the classroom.`)+(s.seen.length>=4?' The Sun is far brighter than any lamp.':''))}
/* 3. what protects the eyes */
const kid=()=>({x:8,y:A.H*.16,w:A.W*(A.narrow?.25:.32),h:A.H*.7});
const kit=()=>{const K=kid(),x0=K.x+K.w+8,cols=2,gap=8,w=(A.W-x0-8-gap)/cols,h=(K.h-2*gap)/3;return T.GEAR.map((G,i)=>({i,x:x0+(i%cols)*(w+gap),y:K.y+Math.floor(i/cols)*(h+gap),w,h}))};
function drawGear(){const s=M.gear,g=A.ctx,K=kid();ground();const got=s.on.length;note(got<3?`Tap what protects the eyes: ${got} of 3`:'Eyes protected',A.W/2,A.H*.07,{n:13,ok:got>=3});
 tile(K,'');const cx=K.x+K.w/2,hy=K.y+K.h*.42,r=Math.min(K.w*.22,K.h*.11);
 if(s.on.includes(4)){g.fillStyle='#16a34a';g.beginPath();g.arc(cx,K.y+K.h*.16,K.w*.42,0,7);g.fill()}
 g.fillStyle='#2563eb';A.paint.rrect(cx-r*1.1,hy+r*1.1,r*2.2,r*2.8,8);g.fill();g.fillStyle='#fcd34d';g.beginPath();g.arc(cx,hy,r,0,7);g.fill();g.strokeStyle=PEN;g.lineWidth=1.5;g.stroke();
 g.fillStyle=PEN;g.beginPath();g.arc(cx-r*.35,hy-r*.1,r*.1,0,7);g.arc(cx+r*.35,hy-r*.1,r*.1,0,7);g.fill();
 if(s.on.includes(2)){g.fillStyle=PEN;A.paint.rrect(cx-r*.75,hy-r*.3,r*.65,r*.4,4);g.fill();A.paint.rrect(cx+r*.1,hy-r*.3,r*.65,r*.4,4);g.fill();g.fillRect(cx-r*.1,hy-r*.2,r*.2,3)}
 if(s.on.includes(0)){g.fillStyle='#b45309';g.beginPath();g.ellipse(cx,hy-r*.75,r*1.7,r*.25,0,0,7);g.fill();g.beginPath();g.ellipse(cx,hy-r*.9,r*.85,r*.6,0,Math.PI,0);g.fill()}
 kit().forEach(b=>tile(b,T.GEAR[b.i].t,{ok:s.on.includes(b.i),no:s.miss===b.i,n:11}))}
function gearPick(i){const s=M.gear,G=T.GEAR[i];if(s.on.includes(i))return tell(`${G.t}: already chosen.`);
 if(!G.good){s.miss=i;A.sound.miss();return tell(`No: ${G.why}`)}
 s.miss=-1;s.on.push(i);A.sound.pop();const left=3-s.on.length;tell(`Yes: ${G.why}`+(left?` ${left} more.`:' The eyes are protected.'))}
/* 4. pinhole viewer: the picture of the Sun is about 1/107 of the distance from pinhole to screen */
const rail=()=>({x:A.W*.18,y:A.H*.5,w:A.W*.76,h:24});
const cmX=cm=>rail().x+rail().w*cm/T.MAXCM;
const widthMm=cm=>Math.round(cm*10*T.K*10)/10;
const checkKey=()=>({x:A.W/2-Math.min(110,A.W*.3),y:A.H*.76,w:Math.min(220,A.W*.6),h:Math.min(54,A.H*.13)});
function drawPin(){const s=M.pin,g=A.ctx,Rl=rail();ground();if(s.i>=T.PIN.length){note('All 3 pictures made',A.W/2,A.H*.18,{ok:1});note('Further away: a bigger picture of the Sun',A.W/2,A.H*.42,{n:13});return}
 const want=T.PIN[s.i],mm=widthMm(s.cm),sx=cmX(s.cm),hy=A.H*.3;note(`Picture ${s.i+1} of ${T.PIN.length}: make it ${want} mm wide`,A.W/2,A.H*.06,{n:13});
 icon('sun',A.W*.07,A.H*.17,Math.min(A.W*.08,40));g.fillStyle='#94a3b8';g.fillRect(Rl.x-6,hy-A.H*.12,8,A.H*.24);g.fillStyle=BG;g.fillRect(Rl.x-6,hy-2,8,4);
 g.strokeStyle='#f59e0b';g.lineWidth=1.5;g.setLineDash([5,4]);g.beginPath();g.moveTo(A.W*.07,A.H*.17);g.lineTo(Rl.x-2,hy);g.lineTo(sx,hy-mm*3);g.moveTo(Rl.x-2,hy);g.lineTo(sx,hy+mm*3);g.stroke();g.setLineDash([]);
 g.fillStyle='#ffffff';g.fillRect(sx-5,hy-A.H*.13,10,A.H*.26);g.strokeStyle=PEN;g.lineWidth=1.5;g.strokeRect(sx-5,hy-A.H*.13,10,A.H*.26);g.fillStyle='#d97706';g.beginPath();g.arc(sx,hy,Math.max(2,mm*3),0,7);g.fill();
 g.fillStyle='#ffffff';g.fillRect(Rl.x,Rl.y,Rl.w,Rl.h);g.strokeStyle=PEN;g.strokeRect(Rl.x,Rl.y,Rl.w,Rl.h);g.lineWidth=1;
 for(let cm=0;cm<=T.MAXCM;cm+=10){const x=cmX(cm);g.beginPath();g.moveTo(x,Rl.y);g.lineTo(x,Rl.y+(cm%50?7:13));g.stroke()}
 g.fillStyle='#1d4ed8';g.beginPath();g.moveTo(sx,Rl.y+Rl.h);g.lineTo(sx-11,Rl.y+Rl.h+18);g.lineTo(sx+11,Rl.y+Rl.h+18);g.closePath();g.fill();
 note(`Screen ${s.cm} cm away: picture ${mm.toFixed(1)} mm wide`,A.W/2,A.H*.67,{n:12,ok:s.good,no:s.bad});tile(checkKey(),'Check',{n:15})}
function setCm(v){const s=M.pin;if(s.i>=T.PIN.length)return;s.cm=Math.max(5,Math.min(T.MAXCM,Math.round(v)));s.good=s.bad=false;A.redraw()}
function checkPin(){const s=M.pin;if(s.i>=T.PIN.length)return;const want=T.PIN[s.i],mm=widthMm(s.cm),need=Math.round(want/T.K/10);
 if(Math.abs(mm-want)>.5){s.bad=true;A.sound.miss();return tell(`${mm.toFixed(1)} mm is too ${mm<want?'small: move the screen further away':'big: move the screen closer'}. About ${need} cm gives ${want} mm.`)}
 s.good=true;A.sound.pop();const msg=`Yes: at ${s.cm} cm the Sun's picture is ${mm.toFixed(1)} mm wide.`;s.i++;s.cm=15;s.good=false;tell(msg+(s.i<T.PIN.length?' Next picture.':''))}
/* 5. robot */
const rs=()=>{const w=Math.min(170,(A.W-36)/2);return[0,1].map(k=>({i:k,t:k?'✗ Slip':'✓ Right',x:A.W/2+(k?6:-w-6),y:A.H*.72,w,h:Math.min(A.H*.18,62)}))};
function drawRobot(){const s=M.robot,g=A.ctx;ground();if(s.i>=T.ROBOT.length){note('All 5 sayings checked',A.W/2,A.H*.16,{ok:1});note('Protect your eyes every sunny day',A.W/2,A.H*.4,{n:13});return}
 const Q=T.ROBOT[s.i],x=A.W/2,y=A.H*.2,u=Math.min(A.W*.06,26);g.fillStyle='#cbd5e1';A.paint.rrect(x-u,y-u*.9,u*2,u*1.8,u*.5);g.fill();g.strokeStyle=PEN;g.lineWidth=2;g.stroke();
 g.fillStyle=PEN;g.beginPath();g.arc(x-u*.4,y-u*.15,u*.15,0,7);g.arc(x+u*.4,y-u*.15,u*.15,0,7);g.fill();g.fillRect(x-u*.3,y+u*.4,u*.6,3);
 note(Q.say,A.W/2,A.H*.44,{n:12});note(`Saying ${s.i+1} of ${T.ROBOT.length}: right, or a slip?`,A.W/2,A.H*.58,{n:12});rs().forEach(b=>tile(b,b.t,{no:s.miss===b.i,n:16}))}
function robotSay(k){const s=M.robot;if(s.i>=T.ROBOT.length)return;const Q=T.ROBOT[s.i];
 if((k===0)!==Q.ok){s.miss=k;A.sound.miss();return tell(Q.ok?`Think again. ${Q.fix}`:`Careful, that is not safe. ${Q.fix}`)}
 s.miss=-1;s.i++;A.sound.pop();tell((Q.ok?'Yes, right. ':'Yes, a slip. ')+Q.fix)}
function draw(){const k=now();if(k==='quiz'){ground();note('Challenge',A.W/2,A.H*.2,{ok:1});note('Eye safety expert',A.W/2,A.H*.5,{n:13});return}
 ({ways:drawWays,meter:drawMeter,gear:drawGear,pin:drawPin,robot:drawRobot})[k]();A.fx.draw(A.ctx)}
function press(p){const k=now();
 if(k==='ways'){const b=yesNo().find(q=>within(p,q));if(b)wayPick(b.i)}
 else if(k==='meter'){const b=spots().find(q=>within(p,q));if(b)measure(b.i)}
 else if(k==='gear'){const b=kit().find(q=>within(p,q));if(b)gearPick(b.i)}
 else if(k==='pin'){if(within(p,checkKey())){checkPin();return false}const Rl=rail();if(p.y>A.H*.15&&p.y<Rl.y+Rl.h+24&&p.x>Rl.x-10){M.pin.drag=true;setCm((p.x-Rl.x)/Rl.w*T.MAXCM);return true}}
 else if(k==='robot'){const b=rs().find(q=>within(p,q));if(b)robotSay(b.i)}
 return false}
function slide(p){if(now()==='pin'&&M.pin.drag){const Rl=rail();setCm((p.x-Rl.x)/Rl.w*T.MAXCM)}}
function lift(){if(M.pin&&M.pin.drag){M.pin.drag=false;tell(`Screen ${M.pin.cm} cm away: the picture is ${widthMm(M.pin.cm).toFixed(1)} mm wide. Tap Check.`)}}
function fresh(){tick++;for(const k in M)delete M[k];Object.assign(M,{ways:{i:0,miss:-1},meter:{seen:[]},gear:{on:[],miss:-1},pin:{i:0,cm:15,good:false,bad:false,drag:false},robot:{i:0,miss:-1},hook:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();twins();M.hook()}
/* every canvas action also has a button under the canvas */
function twins(){if(!row)return;row.innerHTML='';const k=now(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},row,t).onclick=f};
 if(k==='ways'&&M.ways.i<T.WAYS.length){const W=T.WAYS[M.ways.i];add('Safe',()=>wayPick(0),`${W.t}: safe`);add('Not safe',()=>wayPick(1),`${W.t}: not safe`)}
 if(k==='meter')T.PLACES.forEach((P,i)=>add(P.t,()=>measure(i),`Measure the light: ${P.t}`));
 if(k==='gear'&&M.gear.on.length<3)T.GEAR.forEach((G,i)=>add(G.t,()=>gearPick(i),`Protects the eyes: ${G.t}`));
 if(k==='pin'&&M.pin.i<T.PIN.length){add('Closer',()=>{setCm(M.pin.cm-5);lift()},'Move the screen 5 cm closer');add('Further',()=>{setCm(M.pin.cm+5);lift()},'Move the screen 5 cm further away');add('Check',checkPin,'Check the picture size')}
 if(k==='robot'&&M.robot.i<T.ROBOT.length){add('✓ Right',()=>robotSay(0),'The robot is right');add('✗ Slip',()=>robotSay(1),'The robot made a slip')}}
const settle=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function arrive(i,ok){fresh();tell(T.DESC[i]);M.hook=settle(i,ok,T.DONE[i])}
function auto(i,acts,ms){steps[i].go();const t0=tick;acts.forEach((f,j)=>setTimeout(()=>{if(t0===tick)f()},ms*(j+1)))}
const steps=[
{h:'Safe or not safe?',p:'The Sun is the brightest light we see. Decide if each way of looking at or near the Sun is safe.',
 predict:{q:'Can you look straight at the Sun if you wear sunglasses?',opts:['Yes, sunglasses make it safe','No, never'],ans:1},task:'Judge all 6 cards',
 show:()=>auto(0,T.WAYS.map(W=>()=>wayPick(W.safe?0:1)),600),go:()=>arrive(0,()=>M.ways.i>=T.WAYS.length)},
{h:'How bright?',p:'A light meter measures how bright it is, in lux. Tap each place to measure it.',
 predict:{q:'How much brighter is full sun than a bright classroom?',opts:['About twice as bright','Hundreds of times brighter'],ans:1},task:'Measure all 4 places',
 show:()=>auto(1,T.PLACES.map((P,i)=>()=>measure(i)),600),go:()=>arrive(1,()=>M.meter.seen.length>=4)},
{h:'Protect your eyes',p:'It is a sunny day. Tap the three things that protect this child\'s eyes.',task:'Find the 3 things that protect eyes',
 show:()=>auto(2,T.GEAR.map((G,i)=>i).filter(i=>T.GEAR[i].good).map(i=>()=>gearPick(i)),650),go:()=>arrive(2,()=>M.gear.on.length>=3)},
{h:'Pinhole viewer',p:'Sunlight through a tiny hole makes a picture of the Sun on a screen. Your back is to the Sun. Drag the screen, then tap Check.',
 predict:{q:'To make the Sun\'s picture bigger, where should the screen go?',opts:['Closer to the hole','Further from the hole'],ans:1},task:'Make all 3 pictures',
 show:()=>auto(3,T.PIN.flatMap(w=>[()=>setCm(Math.round(w/T.K/10)),()=>checkPin()]),550),go:()=>arrive(3,()=>M.pin.i>=T.PIN.length)},
{h:'Check the robot',p:'The robot says things about sunlight and eyes. Is it right, or a slip?',task:'Check all 5 sayings',
 show:()=>auto(4,T.ROBOT.map(Q=>()=>robotSay(Q.ok?0:1)),600),go:()=>arrive(4,()=>M.robot.i>=T.ROBOT.length)},
{h:'Challenge',p:'',go:()=>{fresh();askQ()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>M.hook()});
function why(t){let m='Never look straight at the Sun. Use a hat, UV400 sunglasses and shade.';
 if(t==='glasses')m='Sunglasses are for bright days, not for looking at the Sun. Never look straight at it.';
 if(t==='quick')m='Even a quick look straight at the Sun can hurt your eyes for ever.';
 if(t==='dark')m='Dark is not enough. Look for UV400 or a CE mark: they block the harmful light.';
 if(t==='bright')m='Full sun is about 100,000 lux and a classroom about 400. That is about 250 times brighter.';
 if(t==='cloud')m='Clouds can move, and harmful light gets through them. Never stare at the Sun.';
 if(t==='bino')m='Binoculars gather more sunlight into your eyes. Never point them at the Sun.';
 return m}
function askQ(){qq++;const Q=T.QS[qq%T.QS.length],all=[[Q.a,'ok'],...Q.o],r=qq%3,ord=all.slice(r).concat(all.slice(0,r));
 quizBox.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=quizBox.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>reply(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function reply(t,a){quizBox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quizBox.querySelector('.fl-fb'),yes=t==='ok';if(yes)A.win();else A.sound.miss();
 fb.innerHTML=(yes?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="lbtn sm">Next one →</button>';fb.querySelector('button').onclick=askQ;c.say(yes?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.6,tall:1.1,draw,onStep:x=>{quizBox.hidden=x.step!==5;row.hidden=x.step===5;twins()},
 init:x=>{A=x;const w=c.el('div',{class:'fl-below'},A.below);row=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Eye safety lab buttons'},w);quizBox=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down:press,move:slide,up:lift});twins()}}).start()})})();
