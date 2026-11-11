/* Flagship: Measuring angles with a protractor (ages 9-10; NC Y5 Geometry "draw given angles, and measure them in
   degrees (°)"; "estimate and compare acute, obtuse and reflex angles"). Put the centre mark on the vertex, pick the
   scale that starts at 0 on your arm (read 47°, not 133°), estimate before measuring, draw 135° and 70°, and measure a
   reflex angle as 360° minus the inside angle. Not flagangle (naming acute, obtuse and reflex) or flagturn (turns). */
(()=>{
VIS.reg('flagprot',c=>{let A,bar,qa,qn=-1,run=0;const D={};
const INK='#0f172a',CARD='#fefce8',IN='#1d4ed8',OUT='#b91c1c',GOOD='#047857',ARM='#7c2d12';
const now=()=>['place','read','guess','draw','reflex','chal'][A.step];
const lim=(v,a,b)=>v<a?a:v>b?b:v,rad=d=>d*Math.PI/180;
function speak(t){c.say(t);A.cv.setAttribute('aria-label',t)}
function note(t,x,y,o){o=o||{};const g=A.ctx;let fs=o.f||(A.narrow?12:15);g.font=`700 ${fs}px system-ui`;while(fs>10&&g.measureText(t).width>(o.w||A.W)-16){fs--;g.font=`700 ${fs}px system-ui`}
 const w=Math.max(o.w||0,g.measureText(t).width+18),h=fs*1.8,x0=lim(x-w/2,3,A.W-w-3);g.fillStyle=CARD;A.paint.rrect(x0,y-h/2,w,h,9);g.fill();g.lineWidth=o.rim?2.5:1.2;g.strokeStyle=o.rim||'#78716c';g.stroke();
 g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,x0+w/2,y+1)}
const V=()=>({x:A.W*.5,y:A.H*.7}),Rr=()=>Math.min(A.W*.42,A.H*.48),pt=(o,r,d)=>({x:o.x+r*Math.cos(rad(d)),y:o.y-r*Math.sin(rad(d))});
function arm(d,col,w){const g=A.ctx,v=V(),e=pt(v,Rr()*1.12,d);g.strokeStyle=col||(A.col.dark?'#fb923c':ARM);g.lineWidth=w||4;g.lineCap='round';g.beginPath();g.moveTo(v.x,v.y);g.lineTo(e.x,e.y);g.stroke();g.lineCap='butt'}
/* the protractor: inner scale counts 0 to 180 anticlockwise from the right; outer scale counts 0 to 180 from the left */
function prot(o){const g=A.ctx,R=Rr(),step=A.narrow?20:10;g.fillStyle='rgba(240,249,255,.88)';g.beginPath();g.arc(o.x,o.y,R,Math.PI,0);g.closePath();g.fill();g.strokeStyle=INK;g.lineWidth=1.5;g.stroke();
 for(let d=0;d<=180;d++){const L=d%10?(d%5?R*.04:R*.07):R*.11,a=pt(o,R,d),b=pt(o,R-L,d);g.lineWidth=d%10?1:1.5;g.beginPath();g.moveTo(a.x,a.y);g.lineTo(b.x,b.y);g.stroke()}
 g.font=`700 ${A.narrow?10:12}px system-ui`;g.textAlign='center';g.textBaseline='middle';for(let d=0;d<=180;d+=step){let q=pt(o,R*.8,d);g.fillStyle=OUT;g.fillText(180-d,q.x,q.y);q=pt(o,R*.64,d);g.fillStyle=IN;g.fillText(d,q.x,q.y)}
 g.strokeStyle=INK;g.beginPath();g.moveTo(o.x-8,o.y);g.lineTo(o.x+8,o.y);g.moveTo(o.x,o.y-8);g.lineTo(o.x,o.y);g.stroke()}
/* a zoomed strip of both scales around the arm, so single degrees can be counted */
function lens(d){const g=A.ctx,w=A.W*.9,x0=A.W*.05,y0=A.H*.03,h=A.H*.16,k=w/14,mx=x0+w/2;g.fillStyle='#f8fafc';A.paint.rrect(x0,y0,w,h,8);g.fill();g.strokeStyle=INK;g.lineWidth=1.2;g.stroke();
 g.save();g.beginPath();g.rect(x0,y0,w,h);g.clip();g.font=`700 ${A.narrow?11:13}px system-ui`;g.textAlign='center';g.textBaseline='middle';
 for(let e=Math.ceil(d-7);e<=d+7;e++){if(e<0||e>180)continue;const x=mx-(e-d)*k,L=e%5?h*.12:h*.22;g.strokeStyle=INK;g.lineWidth=1;g.beginPath();g.moveTo(x,y0+h/2-L);g.lineTo(x,y0+h/2+L);g.stroke();
  if(e%5===0){g.fillStyle=OUT;g.fillText(180-e,x,y0+h*.17);g.fillStyle=IN;g.fillText(e,x,y0+h*.83)}}
 g.strokeStyle=ARM;g.lineWidth=3;g.beginPath();g.moveTo(mx,y0);g.lineTo(mx,y0+h);g.stroke();g.restore()}
/* ---- 1: line it up ---- */
const onV=()=>Math.hypot(D.px-V().x,D.py-V().y)<1;
function drawPlace(){const v=V();prot({x:D.px,y:D.py});arm(0);arm(47);const g=A.ctx;g.fillStyle=A.col.tx;g.beginPath();g.arc(v.x,v.y,5,0,7);g.fill();
 note(onV()?'Centre on the vertex, 0 line along the arm':'Not lined up yet',A.W/2,A.H*.08,{rim:onV()?GOOD:OUT});note(onV()?'Now the reading is fair: 47°':'Drag the protractor onto the vertex',A.W/2,A.H*.93,{rim:onV()?GOOD:'#78716c'})}
function slide(x,y,quiet){const v=V();D.px=x;D.py=y;if(Math.hypot(x-v.x,y-v.y)<16){D.px=v.x;D.py=v.y}if(quiet)return A.redraw();A.sound.tick();
 if(onV())D.set=1;say(onV()?'Lined up: the centre mark sits on the vertex and the 0 line lies along one arm. The other arm crosses 47 on the scale that starts at 0 on that arm.':'The centre mark is not on the vertex, so any reading would be wrong.')}
/* ---- 2: which scale ---- */
const RD=[{b:0,a:47},{b:0,a:132},{b:180,a:65}];
const cur=()=>RD[D.k%3],armD=q=>q.b?180-q.a:q.a;
function drawRead(){const q=cur(),d=armD(q);prot(V());arm(q.b);arm(d);lens(d);note(`Read ${D.ok} of 3 · base arm on the ${q.b?'left':'right'}`,A.W/2,A.H*.93,{rim:D.ok>2?GOOD:'#78716c'})}
function pick(v){const q=cur(),d=armD(q);if(v===q.a){D.ok++;D.k++;A.sound.pop();return say(`Yes, ${q.a}°. Its arm starts at 0 on the ${q.b?'outer, red':'inner, blue'} scale. `+(D.ok<3?'Next angle.':'All 3 read.'))}
 A.sound.miss();say(`${v}° is on the scale that starts at 180 on this arm. This angle is ${q.a<90?'acute, so less than 90°':'obtuse, so more than 90°'}. Count up from 0 on the arm.`)}
function choices(){const q=cur(),d=armD(q);return[d,180-d].sort((x,y)=>x-y)}
/* ---- 3: estimate first ---- */
const GS=[110,35,160];
function drawGuess(){const t=GS[D.g%3];arm(0);arm(t);const g=A.ctx,y=A.H*.86,x0=A.W*.1,x1=A.W*.9,gx=x0+(x1-x0)*D.est/180;
 g.strokeStyle=A.col.tx;g.lineWidth=3;g.beginPath();g.moveTo(x0,y);g.lineTo(x1,y);g.stroke();g.font=`700 ${A.narrow?11:13}px system-ui`;g.fillStyle=A.col.tx;g.textAlign='center';[0,90,180].forEach(n=>{const x=x0+(x1-x0)*n/180;g.fillText(n+'°',x,y+16);g.fillRect(x-1,y-6,2,12)});
 g.fillStyle=IN;g.beginPath();g.arc(gx,y,11,0,7);g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke();
 if(D.shown){prot(V());arm(0);arm(t);note(`Measured ${t}° · your guess ${D.est}°`,A.W/2,A.H*.08,{rim:Math.abs(D.est-t)<=15?GOOD:OUT})}else note(`My estimate: ${D.est}°`,A.W/2,A.H*.08,{rim:IN});note(`Close guesses: ${D.near} of 2`,A.W*.5,A.H*.97,{f:11})}
function guess(v,quiet){D.shown=0;D.est=lim(Math.round(v/5)*5,0,180);if(quiet)return A.redraw();A.sound.tick();say(`Estimate ${D.est}°.`)}
function check(){const t=GS[D.g%3];if(D.shown){D.g++;D.shown=0;D.est=90;return say('A new angle. Is it more or less than a right angle? Estimate, then check.')}D.shown=1;const off=Math.abs(D.est-t);if(off<=15){D.near++;A.sound.pop()}else A.sound.miss();
 say(`Measured: ${t}°. You were ${off}° away. `+(off<=15?'A good estimate.':t>90?'It is wider than a right angle, so it must be more than 90°.':'It is narrower than a right angle, so less than 90°.')+' Press Check again for a new angle.')}
/* ---- 4: draw an angle ---- */
const TG=[135,70];
function drawDraw(){const g=A.ctx,v=V(),t=TG[D.t%2],dot=pt(v,Rr(),D.phi);prot(v);arm(0);D.made.forEach(d=>arm(d,GOOD,3));g.fillStyle=OUT;g.beginPath();g.arc(dot.x,dot.y,9,0,7);g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke();
 note(D.drawn>1?'Both angles drawn':`Draw ${t}° · dot at ${D.phi} on the blue scale`,A.W/2,A.H*.08,{w:A.W*.8,rim:D.drawn>1?GOOD:IN});note(`Drawn: ${D.drawn} of 2`,A.W/2,A.H*.93,{rim:D.drawn>1?GOOD:'#78716c'})}
function dot(d,quiet){D.phi=lim(Math.round(d),0,180);if(quiet)return A.redraw();A.sound.tick();say(`The dot is at ${D.phi} on the blue scale, which starts at 0 on your arm.`)}
function join(){const t=TG[D.t%2];if(D.drawn>1)return say('Both angles are drawn.');if(D.phi===t){D.made.push(t);D.drawn++;D.t++;A.sound.pop();return say(`Joined with a ruler: a ${t}° angle. `+(D.drawn<2?'Now draw 70°.':'Both done.'))}
 A.sound.miss();say(D.phi===180-t?`That would make ${D.phi}°. You used the scale that starts at 180 on your arm. Find ${t} on the scale that starts at 0.`:`That would make ${D.phi}°, not ${t}°. Move the dot to ${t}.`)}
/* ---- 5: reflex ---- */
const RX=[110,60];
function drawReflex(){const g=A.ctx,v=V(),d=RX[D.r%2];prot(v);arm(0);arm(d);g.strokeStyle=A.col.dark?'#f87171':OUT;g.lineWidth=3;g.beginPath();g.arc(v.x,v.y,Rr()*.3,-rad(d),0,true);g.stroke();
 note(`Find the reflex angle (red arc) · ${D.rx} of 2`,A.W/2,A.H*.08,{w:A.W*.9,rim:D.rx>1?GOOD:OUT})}
function rOpts(){const d=RX[D.r%2];return[d,360-d,180+d]}
function rPick(v){const d=RX[D.r%2];if(v===360-d){D.rx++;D.r++;A.sound.pop();return say(`Yes: the inside angle is ${d}°, so the reflex angle is 360 − ${d} = ${v}°.`+(D.rx<2?' Next one.':''))}A.sound.miss();
 say(v===d?`${d}° is the inside angle. The red arc goes the long way round: 360 − ${d}.`:`${v}° is 360 minus ${360-v}, the reading on the wrong scale. The inside angle is ${d}°.`)}
function draw(){const g=A.ctx,k=now();g.fillStyle=A.mix(A.col.pn,'#fef9c3',A.col.dark?.05:.3);g.fillRect(0,0,A.W,A.H);
 if(k==='chal'){note('Challenge',A.W/2,A.H*.15,{rim:IN});note('Measure it right',A.W/2,A.H*.5,{f:A.narrow?16:20});return}
 ({place:drawPlace,read:drawRead,guess:drawGuess,draw:drawDraw,reflex:drawReflex})[k]()}
function fresh(){run++;for(const k in D)delete D[k];Object.assign(D,{px:A.W*.3,py:A.H*.45,set:0,k:0,ok:0,g:0,est:90,shown:0,near:0,t:0,phi:90,made:[],drawn:0,r:0,rx:0,hold:null,test:()=>{}})}
function say(t){speak(t);A.redraw();ctrls();D.test()}
const ready=(i,f,msg)=>()=>{if(A.step===i&&f()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function enter(i,intro,f,msg){fresh();speak(intro);ctrls();D.test=ready(i,f,msg)}
function demo(i,acts,ms){steps[i].go();const v=run;acts.forEach((f,j)=>setTimeout(()=>{if(v===run)f()},(ms||500)*(j+1)))}
function ctrls(){if(!bar)return;bar.innerHTML='';const k=now(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},bar,t).onclick=f};
 if(k==='place')B('Put the centre on the vertex',()=>slide(V().x,V().y));
 if(k==='read')choices().forEach(n=>B(n+'°',()=>pick(n),'The angle is '+n+' degrees'));
 if(k==='guess'){B('−10°',()=>guess(D.est-10),'Make my estimate 10 degrees smaller');B('+10°',()=>guess(D.est+10),'Make my estimate 10 degrees bigger');B(D.shown?'Next angle':'Check',check)}
 if(k==='draw'){[[-10,'−10'],[-1,'−1'],[1,'+1'],[10,'+10']].forEach(([s,n])=>B(n,()=>dot(D.phi+s),`Move the dot ${Math.abs(s)} degree${Math.abs(s)>1?'s':''} ${s>0?'up':'down'} the blue scale`));B('Join to the vertex',join)}
 if(k==='reflex')rOpts().sort((a,b)=>a-b).forEach(n=>B(n+'°',()=>rPick(n),'The reflex angle is '+n+' degrees'))}
function down(p){const k=now(),v=V(),R=Rr(),r=Math.hypot(p.x-v.x,p.y-v.y),ang=Math.round(Math.atan2(v.y-p.y,p.x-v.x)*180/Math.PI);
 if(k==='place'){if(Math.hypot(p.x-D.px,p.y-D.py)<R&&p.y<D.py+20){D.hold={dx:p.x-D.px,dy:p.y-D.py};return true}return false}
 if(k==='read'){if(p.y<v.y&&r<R&&r>R*.5){const d=armD(cur());pick(r>R*.72?180-d:d)}return false}
 if(k==='guess'){if(p.y>A.H*.78){D.hold={g:1};move(p);return true}return false}
 if(k==='draw'){if(p.y<v.y+10&&r>R*.5&&r<R*1.25){D.hold={d:1};dot(lim(ang,0,180),true);return true}return false}return false}
function move(p){const h=D.hold;if(!h)return;const v=V();if(h.dx!=null)slide(p.x-h.dx,p.y-h.dy,true);else if(h.g)guess((p.x-A.W*.1)/(A.W*.8)*180,true);else if(h.d)dot(lim(Math.atan2(v.y-p.y,p.x-v.x)*180/Math.PI,0,180),true)}
function up(){const h=D.hold;D.hold=null;if(!h)return;if(h.dx!=null)slide(D.px,D.py);else if(h.g)guess(D.est);else dot(D.phi)}
const steps=[
{h:'Line it up',p:'A protractor measures angles in degrees (°). Drag it so its centre mark sits on the vertex, the point where the arms meet.',
 predict:{q:'Where must the centre mark go?',opts:['at the end of an arm','on the vertex','anywhere on an arm'],ans:1},task:'Line the protractor up with the angle',
 show:()=>demo(0,[()=>slide(A.W*.42,A.H*.6),()=>slide(V().x,V().y)],500),
 go:()=>enter(0,'An angle with one arm along the bottom, and a protractor off to one side.',()=>D.set,'Centre mark on the vertex, 0 line on one arm: now the protractor can measure.')},
{h:'Which scale?',p:'A protractor has two scales. The arm crosses both. Use the scale that starts at 0 on your bottom arm. The strip at the top zooms in.',
 predict:{q:'This angle is acute. The arm crosses 47 and 133. How big is it?',opts:['133°, the bigger number','47°','180°'],ans:1},task:'Read 3 angles correctly',
 show:()=>demo(1,[()=>pick(47),()=>pick(132),()=>pick(65)],500),
 go:()=>enter(1,'A protractor lined up on an angle. Its arm crosses the blue inner scale and the red outer scale.',()=>D.ok>2,'Start from the 0 on your arm, and check: acute is under 90°, obtuse is over.')},
{h:'Estimate first',p:'Before measuring, guess. Drag the blue dot along the line, or use the buttons, then press Check. Compare with a right angle (90°).',task:'Make 2 estimates within 15°',
 show:()=>demo(2,[()=>guess(105),check,check,()=>guess(40),check],450),
 go:()=>enter(2,'An angle with no protractor. A line from 0° to 180° for your estimate.',()=>D.near>1,'An estimate catches a reading from the wrong scale.')},
{h:'Draw an angle',p:'Draw 135°, then 70°. Your arm points right, so use the blue scale. Drag the red dot round the edge, or use the buttons, then join it to the vertex.',
 predict:{q:'To draw 135°, which mark do you use?',opts:['135 counting up from 0 on my arm','135 on the other scale','either one'],ans:0},task:'Draw 135° and 70°',
 show:()=>demo(3,[()=>dot(135),join,()=>dot(70),join],450),
 go:()=>enter(3,'A protractor on a single arm pointing right, with a red dot at 90.',()=>D.drawn>1,'Mark the size on the scale that starts at 0 on your arm, then join the dot to the vertex.')},
{h:'Bigger than a straight line',p:'The red arc shows a reflex angle, more than 180°. Measure the inside angle, then take it away from 360°.',task:'Find 2 reflex angles',
 show:()=>demo(4,[()=>rPick(250),()=>rPick(300)],500),
 go:()=>enter(4,'An angle with a red arc going the long way round, and a protractor on the inside angle.',()=>D.rx>1,'Reflex angle = 360° − the inside angle.')},
{h:'Challenge',p:'',go:()=>{fresh();askQ()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>D.test()});
const QS=[
 {q:'An acute angle. Its arm crosses 35 and 145. How big is it?',ans:'35°',bad:[['145°','scale'],['180°','line']]},
 {q:'Where does the protractor\'s centre mark go?',ans:'On the vertex',bad:[['At the end of an arm','end'],['On the middle of an arm','mid']]},
 {q:'Angle A has longer arms than angle B. Both read 50°. Which is bigger?',ans:'Neither: both are 50°',bad:[['A, its arms are longer','long'],['B, it looks sharper','long']]},
 {q:'Your arm points left. You draw 120°. Which scale do you use?',ans:'The one with 0 on the left arm',bad:[['The inner one, always','always'],['Whichever 120 is closest','closest']]},
 {q:'A reflex angle\'s inside angle is 140°. How big is the reflex angle?',ans:'220°',bad:[['140°','inside'],['40°','minus']]},
 {q:'Which is a sensible reading for an obtuse angle?',ans:'125°',bad:[['55°','scale'],['215°','reflex']]}];
function slip(t){let m='Line up the centre and 0 line, then count up from the 0 on your arm.';
 if(t==='scale')m='That is the other scale. Check the type: acute is under 90°, obtuse is over 90°.';
 if(t==='line')m='180° is a straight line. Read where the arm crosses the scale.';
 if(t==='end')m='Not the end of an arm. The centre mark goes on the vertex, where the arms meet.';
 if(t==='mid')m='On an arm, the reading is off. The centre mark goes on the vertex.';
 if(t==='long')m='Arm length does not change an angle. The size is the amount of turn between the arms.';
 if(t==='always')m='No scale is always right. Use the one that starts at 0 on your arm.';
 if(t==='closest')m='Both scales have a 120. Count from the 0 on your arm, or you draw 60°.';
 if(t==='inside')m='140° is the inside angle. The reflex angle goes the long way round: 360 − 140.';
 if(t==='minus')m='Take it from 360°, a full turn, not from 180°.';
 if(t==='reflex')m='Over 180° is reflex. Obtuse angles are between 90° and 180°.';
 return m}
function askQ(){qn++;const Q=QS[qn%QS.length],l=[[Q.ans,'ok'],...Q.bad],r=qn%3,ord=l.slice(r).concat(l.slice(0,r));
 qa.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const pk=qa.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Answer: '+v},pk,v).onclick=()=>grade(t,Q.ans)});speak('Challenge: '+Q.q);A.redraw()}
function grade(t,ans){qa.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qa.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();speak(ok?'Yes: '+ans+'.':slip(t));
 fb.innerHTML=(ok?`✓ Yes: ${ans}.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=askQ}
FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:Q=>{qa.hidden=Q.step!==5;bar.hidden=Q.step===5;ctrls()},
 init:Q=>{A=Q;const w=c.el('div',{class:'fl-below'},Q.below);bar=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Protractor controls'},w);qa=c.el('div',{class:'fl-chal'},Q.below);fresh();A.gest({down,move,up});ctrls()}}).start()})})();
