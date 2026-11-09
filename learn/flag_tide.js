/* Flagship: Tides, Waves & Currents (ages 7–9; NOAA Ocean Service "What causes tides?", "What is a wave?" (waves move
   energy, not the water) and "What is a current?"; Met Office on the Gulf Stream carrying warm water to north-west Europe).
   Blow wind over the sea and watch waves grow; send waves under a floating duck that only bobs up and down; drag the Moon
   round the Earth and watch the sea bulge towards it; spin the Earth through one day and count two high tides; drop a
   bottle into an ocean current and follow it from warm water to cold and back.
   Not flagdepth (light and depth zones), flagcoast (coast and beach features) or flagseaneed (what sea animals need). */
(()=>{
VIS.reg('flagtide',c=>{let A,pad,quizBox,item=-1,run=0;const S={};c.fig.classList.add('young');
const part=()=>['wind','duck','moon','spin','flow','chal'][A.step];
function tell(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function txt(s,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';
 if(o.pill){const w=g.measureText(String(s)).width+16,x0=o.al==='left'?x-8:o.al==='right'?x-w+8:x-w/2;g.fillStyle=o.pill;A.paint.rrect(x0,y-px*.75,w,px*1.5,px*.6);g.fill()}
 g.fillStyle=o.ink||A.col.tx;g.fillText(String(s),x,y)}
const fs=()=>A.narrow?15:18,INK='#0f172a',PILL='#f8fafc';
/* ---------- side view: sky, sea, waves ---------- */
const seaY=()=>A.H*.5;
function sky(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#e0f2fe',A.col.dark?.1:.65);g.fillRect(0,0,A.W,seaY())}
function seaSide(h){const g=A.ctx,y0=seaY();g.fillStyle=A.paint.lin(0,y0,0,A.H,[[0,'#38bdf8'],[1,'#075985']]);g.beginPath();g.moveTo(0,A.H);
 for(let x=0;x<=A.W;x+=4)g.lineTo(x,y0-h(x));g.lineTo(A.W,A.H);g.closePath();g.fill();g.strokeStyle='#e0f2fe';g.lineWidth=2;g.beginPath();
 for(let x=0;x<=A.W;x+=4)x?g.lineTo(x,y0-h(x)):g.moveTo(x,y0-h(x));g.stroke()}
const WORD=w=>w>=2?'strong':w>=1?'gentle':'none',SIZE=a=>a>=A.H*.09?'big':a>=A.H*.03?'small':'flat';
function drawWind(){const t=S.t,k=(2*Math.PI)/(A.W*.35);seaSide(x=>S.amp*Math.sin(k*x-t*2.2));
 const g=A.ctx;for(let i=0;i<S.wind*3;i++){const y=A.H*(.12+i*.06),x=((t*160+i*130)%(A.W+120))-60;g.strokeStyle=A.col.dark?'#e2e8f0':'#334155';g.lineWidth=3;g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x+30,y-8,x+60,y);g.stroke()}
 txt(`Wind: ${WORD(S.wind)} · Waves: ${SIZE(S.amp)}`,A.W/2,A.H*.06,fs(),{ink:INK,pill:PILL,w:800});txt('Drag across the sky to blow',A.W/2,seaY()+A.H*.3,A.narrow?13:15,{ink:INK,pill:PILL})}
function blow(w){S.wind=Math.max(0,Math.min(2,w));A.sound.whoosh();const to=[0,A.H*.05,A.H*.11][S.wind];
 tell(S.wind?`The wind blows ${WORD(S.wind)}. It pushes the water into waves…`:'The wind stops. The waves slowly die down.');
 A.tween(S,{amp:to},A.reduced()?0:900,'out',()=>after(S.wind>=2?'Strong wind makes big waves. The harder and longer the wind blows, the bigger the waves.':S.wind?'A gentle wind makes small waves.':'No wind, so the sea goes calm and flat.'))}
/* duck on a wave pulse: the bump travels, the duck only goes up and down */
const duckX=()=>A.W*.55;
function bump(x){let y=0;for(const w of S.pulses){const d=(x-w.x)/(A.W*.09);y+=A.H*.1*Math.exp(-d*d)}return y}
function duck(x,y){const g=A.ctx,s=A.narrow?16:20;g.fillStyle='#facc15';g.strokeStyle=INK;g.lineWidth=2;g.beginPath();g.ellipse(x,y-s*.5,s*1.2,s*.7,0,0,7);g.fill();g.stroke();
 g.beginPath();g.arc(x+s*.8,y-s*1.4,s*.55,0,7);g.fill();g.stroke();g.fillStyle='#f97316';g.beginPath();g.moveTo(x+s*1.3,y-s*1.45);g.lineTo(x+s*1.9,y-s*1.3);g.lineTo(x+s*1.3,y-s*1.15);g.fill();
 g.fillStyle=INK;g.beginPath();g.arc(x+s*.95,y-s*1.55,s*.1,0,7);g.fill()}
function drawDuck(){seaSide(bump);const g=A.ctx,x=duckX(),y=seaY()-bump(x);g.setLineDash([5,5]);g.strokeStyle=A.col.dark?'#e2e8f0':'#334155';g.lineWidth=2;g.beginPath();g.moveTo(x,A.H*.18);g.lineTo(x,A.H*.95);g.stroke();g.setLineDash([]);
 duck(x,y);txt(`Waves passed: ${S.passed} · Duck moved along: 0 m`,A.W/2,A.H*.06,fs(),{ink:INK,pill:PILL,w:800});txt('Tap the sea on the left to make a wave',A.W/2,A.H*.9,A.narrow?13:15,{ink:INK,pill:PILL})}
function wave(){if(S.pulses.length>=3)return;const w={x:-A.W*.15};S.pulses.push(w);A.sound.pop();tell('A wave sets off towards the duck…');
 A.tween(w,{x:A.W*1.2},A.reduced()?0:1700,'io',()=>{S.pulses.splice(S.pulses.indexOf(w),1);S.passed++;
  after(S.passed>=3?'Three waves went by, and the duck is still in the same place. It just bobbed up and down. A wave carries energy across the sea, not the water.':'The duck went up, then down, then stayed put.')})}
/* ---------- top view: Earth, sea bulge, Moon ---------- */
const ctr=()=>({x:A.W/2,y:A.H*.52}),R=()=>Math.min(A.W,A.H)*.17,orb=()=>Math.min(A.W*.42,A.H*.4);
const deg=a=>a*Math.PI/180,norm=a=>((a%360)+360)%360;
const tideAt=(beach,moon)=>Math.cos(2*deg(beach-moon)),TIDE=v=>v>.7?'high tide':v<-.7?'low tide':'in between';
function earth(beach,moon){const g=A.ctx,{x,y}=ctr(),r=R(),m=deg(moon);g.save();g.translate(x,y);g.rotate(m);
 g.fillStyle='#38bdf8';g.beginPath();g.ellipse(0,0,r*1.42,r*1.12,0,0,7);g.fill();g.restore();
 g.fillStyle='#16a34a';g.beginPath();g.arc(x,y,r,0,7);g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke();
 const b=deg(beach),bx=x+Math.cos(b)*r,by=y+Math.sin(b)*r;g.fillStyle='#fde68a';g.beginPath();g.arc(bx,by,A.narrow?9:11,0,7);g.fill();g.stroke();
 txt('beach',x+Math.cos(b)*r*.6,y+Math.sin(b)*r*.6,A.narrow?13:14,{ink:INK,pill:PILL,w:800})}
function moonAt(a){const g=A.ctx,{x,y}=ctr(),o=orb(),mx=x+Math.cos(deg(a))*o,my=y+Math.sin(deg(a))*o;g.fillStyle='#e5e7eb';g.strokeStyle=INK;g.lineWidth=2;g.beginPath();g.arc(mx,my,A.narrow?15:19,0,7);g.fill();g.stroke();txt('Moon',mx,my+(A.narrow?26:30),A.narrow?13:14,{ink:INK,pill:PILL,w:800})}
function space(){const g=A.ctx;g.fillStyle=A.col.dark?'#020617':'#1e293b';g.fillRect(0,0,A.W,A.H);g.fillStyle='#cbd5e1';for(let i=0;i<30;i++){g.fillRect((i*97)%A.W,(i*57)%A.H,2,2)}
 const {x,y}=ctr();g.setLineDash([4,6]);g.strokeStyle='#94a3b8';g.lineWidth=1.5;g.beginPath();g.arc(x,y,orb(),0,7);g.stroke();g.setLineDash([])}
function drawMoon(){space();earth(-90,S.moon);moonAt(S.moon);txt(`Beach: ${TIDE(tideAt(-90,S.moon))}`,A.W/2,A.H*.95,fs(),{ink:INK,pill:PILL,w:800});txt('not to scale',A.W-8,A.H*.05,A.narrow?12:13,{al:'right',ink:'#e2e8f0',w:600})}
function setMoon(a){S.moon=norm(Math.round(a/15)*15);const v=tideAt(-90,S.moon);if(v>.7)S.hi=true;if(v<-.7)S.lo=true;
 after(v>.7?'The Moon is in line with the beach. Its pull piles the sea up there: high tide.':v<-.7?'The Moon is off to the side. The water has been pulled away from the beach: low tide.':'The sea is part way between high and low at the beach.')}
/* ---------- Earth spins through one day (anticlockwise, as seen from above the North Pole) ---------- */
const beachAt=h=>-90-15*h,highs=h=>(h>=6)+(h>=18);
function drawSpin(){space();earth(beachAt(S.h),0);moonAt(0);txt(`Time: ${Math.floor(S.h)} hours · High tides: ${highs(S.h)}`,A.W/2,A.H*.06,fs(),{ink:INK,pill:PILL,w:800});
 txt(`Beach: ${TIDE(tideAt(beachAt(S.h),0))}`,A.W/2,A.H*.94,fs(),{ink:INK,pill:PILL,w:800})}
function spinTo(h){const was=highs(S.h);S.h=Math.max(S.h,Math.min(24,h));if(highs(S.h)>was)A.sound.pop();
 after(S.h>=24?`One whole spin, one day: the beach passed through both bulges, so it had ${highs(S.h)} high tides and 2 low tides.`:`${Math.floor(S.h)} hours. Beach: ${TIDE(tideAt(beachAt(S.h),0))}. High tides so far: ${highs(S.h)}.`)}
/* ---------- ocean current loop ---------- */
/* clockwise loop, like a northern ocean gyre: warm water flows up the left (west) side, cooled water comes down the right */
function loopPt(t){const a=deg(90+360*t),cx=A.W*.5,cy=A.H*.55;return{x:cx+Math.cos(a)*A.W*.3,y:cy+Math.sin(a)*A.H*.3,warm:Math.cos(a)<0}}
function drawFlow(){const g=A.ctx;g.fillStyle=A.paint.lin(0,0,0,A.H,[[0,'#bfdbfe'],[1,'#fdba74']]);g.fillRect(0,0,A.W,A.H);
 g.fillStyle='#86efac';g.strokeStyle=INK;g.lineWidth=2;[[0,A.W*.12],[A.W*.88,A.W]].forEach(([a,b])=>{g.beginPath();g.rect(a,A.H*.12,b-a,A.H*.82);g.fill();g.stroke()});
 txt('cold (towards the pole)',A.W/2,A.H*.15,A.narrow?13:15,{ink:INK,pill:PILL});txt('warm (near the equator)',A.W/2,A.H*.9,A.narrow?13:15,{ink:INK,pill:PILL});
 for(let i=0;i<12;i++){const p=loopPt(i/12),q=loopPt(i/12+.03);g.strokeStyle=p.warm?'#b91c1c':'#1d4ed8';g.lineWidth=4;g.beginPath();g.moveTo(p.x,p.y);g.lineTo(q.x,q.y);g.stroke();
  const an=Math.atan2(q.y-p.y,q.x-p.x);g.fillStyle=g.strokeStyle;g.beginPath();g.moveTo(q.x,q.y);g.lineTo(q.x-10*Math.cos(an-.5),q.y-10*Math.sin(an-.5));g.lineTo(q.x-10*Math.cos(an+.5),q.y-10*Math.sin(an+.5));g.fill()}
 for(const b of S.bottles){const p=loopPt(b.t);g.fillStyle='#a7f3d0';g.strokeStyle=INK;g.lineWidth=2;A.paint.rrect(p.x-7,p.y-14,14,26,5);g.fill();g.stroke();g.fillStyle='#92400e';g.fillRect(p.x-4,p.y-19,8,6)}
 txt(`Bottles carried all the way round: ${S.round}`,A.W/2,A.H*.05,fs(),{ink:INK,pill:PILL,w:800});txt('Tap the sea to drop a bottle',A.W/2,A.H*.55,A.narrow?13:14,{ink:INK,pill:PILL})}
function nearestT(p){let best=0,d=1e9;for(let i=0;i<48;i++){const q=loopPt(i/48),e=Math.hypot(q.x-p.x,q.y-p.y);if(e<d){d=e;best=i/48}}return best}
function bottle(t0){if(S.bottles.length)return;const b={t:t0??0};S.bottles.push(b);A.sound.tick();tell(loopPt(b.t).warm?'The bottle is in warm water. The current picks it up…':'The bottle is in cold water. The current picks it up…');
 A.tween(b,{t:b.t+1},A.reduced()?0:3200,'io',()=>{S.bottles=[];S.round++;A.sound.pop();
  after('The current carried the bottle a very long way, from warm water up to cold water and back. Currents are like rivers in the sea. They move warm water to cold places, and carry food for sea life (nutrients) too.')})}
function draw(Q){const k=part();if(k==='wind')sky(),drawWind();if(k==='duck')sky(),drawDuck();if(k==='moon')drawMoon();if(k==='spin')drawSpin();if(k==='flow')drawFlow();
 if(k==='chal'){space();earth(-90,S.moon);moonAt(S.moon);txt('Challenge',Q.W/2,Q.H*.06,fs(),{ink:INK,pill:PILL,w:800})}}
function fresh(o){run++;for(const k in S)delete S[k];Object.assign(S,{t:0,wind:0,amp:0,pulses:[],passed:0,moon:0,hi:false,lo:false,h:0,bottles:[],round:0,ok:()=>{}},o||{})}
const finishIf=(i,cond,msg)=>()=>{if(A.step===i&&cond()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function auto(i,acts,gap){steps[i].go();const t=run;acts.forEach((f,j)=>setTimeout(()=>{if(t===run)f()},A.reduced()?25*(j+1):(gap||450)*(j+1)))}
function after(m){tell(m);A.redraw();keys();S.ok()}
function keys(){if(!pad)return;pad.innerHTML='';const k=part(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='wind'){b('Blow gently',()=>blow(1));b('Blow hard',()=>blow(2));b('Stop the wind',()=>blow(0))}
 if(k==='duck')b('Make a wave',wave);
 if(k==='moon'){b('↺ Move the Moon',()=>setMoon(S.moon-45),'Move the Moon anticlockwise');b('↻ Move the Moon',()=>setMoon(S.moon+45),'Move the Moon clockwise')}
 if(k==='spin'&&S.h<24)b('Spin 3 hours',()=>spinTo(Math.floor(S.h/3)*3+3),'Spin the Earth on by 3 hours');
 if(k==='flow')b('Drop a bottle',()=>bottle(0))}
function angleOf(p){const{x,y}=ctr();return norm(Math.atan2(p.y-y,p.x-x)*180/Math.PI)}
function down(p){const k=part();S.last=p;
 if(k==='wind'){if(p.y>seaY())return false;S.drag=0;return true}
 if(k==='duck'){if(p.y<seaY()-A.H*.05||p.x>A.W*.4)return false;wave();return true}
 if(k==='moon'){setMoon(angleOf(p));return true}
 if(k==='spin'){S.ang=angleOf(p);return true}
 if(k==='flow'){if(p.x<A.W*.12||p.x>A.W*.88)return false;bottle(nearestT(p));return true}return false}
function move(p){const k=part();
 if(k==='wind'){S.drag+=Math.abs(p.x-S.last.x);S.last=p;const w=S.drag>A.W*.9?2:S.drag>A.W*.25?1:0;if(w>S.wind)blow(w)}
 if(k==='moon')setMoon(angleOf(p));
 if(k==='spin'){const a=angleOf(p),d=((a-S.ang+540)%360)-180;S.ang=a;if(d<0)spinTo(S.h-d/15)}}
function up(){}
const steps=[
{h:'Wind makes waves',p:'Wind blowing over the sea pushes the water up into waves. Drag across the sky to blow, or use the buttons.',
 predict:{q:'What makes most of the waves on the sea?',opts:['The Moon','Wind blowing on the water','Fish swimming'],ans:1},
 task:'Make big waves',show:()=>auto(0,[()=>blow(1),()=>blow(2)],900),
 go:()=>{fresh();tell('A calm, flat sea with no wind.');keys();S.ok=finishIf(0,()=>S.amp>=A.H*.09,'Wind makes waves. Stronger wind, bigger waves.')}},
{h:'Does the water move along?',p:'A toy duck floats on the sea. Send waves past it and watch where it goes.',
 predict:{q:'A wave passes under the duck. What will the duck do?',opts:['Get carried along with the wave','Bob up and down in the same place','Sink'],ans:1},
 task:'Send 3 waves past the duck',show:()=>auto(1,[wave,wave,wave],650),
 go:()=>{fresh();tell('A duck floats on a calm sea.');keys();S.ok=finishIf(1,()=>S.passed>=3,'The wave moved on. The water and the duck stayed in the same place.')}},
{h:'The Moon pulls the sea',p:'This is the Earth seen from far above. The Moon’s gravity pulls on the sea. Drag the Moon round, or use the buttons, and watch the water.',
 predict:{q:'What pulls the sea to make the tides?',opts:['The wind','The Moon’s gravity','The heat of the Sun'],ans:1},
 task:'Give the beach a high tide and a low tide',show:()=>auto(2,[()=>setMoon(0),()=>setMoon(-45),()=>setMoon(-90)],700),
 go:()=>{fresh();tell('The Earth, with its sea, and the Moon. The beach is at the top.');keys();S.ok=finishIf(2,()=>S.hi&&S.lo,'The sea bulges where the Moon pulls it, and on the far side too. The beach under a bulge has high tide.')}},
{h:'Two tides a day',p:'The Moon stays still here. The Earth spins round once a day, carrying the beach with it. Spin the Earth through a whole day.',
 predict:{q:'How many high tides does the beach get in one day?',opts:['1','2','4'],ans:1},
 task:'Spin the Earth for 24 hours',show:()=>auto(3,Array.from({length:8},()=>()=>spinTo(Math.floor(S.h/3)*3+3)),350),
 go:()=>{fresh();tell('Midnight. The beach is at the top. Drag round the Earth, anticlockwise, to spin it.');keys();S.ok=finishIf(3,()=>S.h>=24,'Two bulges, one spin a day: about two high tides and two low tides every day.')}},
{h:'Rivers in the sea',p:'Currents are huge flows of water that move through the ocean. Drop a bottle into the current and follow it.',
 predict:{q:'You drop a bottle into an ocean current. What happens?',opts:['It stays where you dropped it','It is carried a long way','It sinks to the bottom'],ans:1},
 task:'Follow a bottle all the way round',show:()=>auto(4,[()=>bottle(0)]),
 go:()=>{fresh();tell('An ocean between two lands. Red arrows carry warm water, blue arrows cold water.');keys();S.ok=finishIf(4,()=>S.round>=1,'A current carried the bottle round the ocean and moved warm water to cold places.')}},
{h:'Challenge',p:'',go:()=>{fresh({moon:0});ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.ok()});
const QS=[['What makes most waves on the sea?','Wind',[['The Moon','moon'],['Fish swimming','fish']]],
 ['What causes the tides?','Mostly the Moon’s gravity',[['The wind','wind'],['The heat of the Sun','sun']]],
 ['About how many high tides does a beach get each day?','2',[['1','once'],['4','four']]],
 ['A wave passes a floating ball. What does the ball do?','Bobs up and down in the same place',[['Rides the wave to the beach','water'],['Sinks under the wave','water']]],
 ['What is an ocean current?','A huge flow of water through the sea',[['A big wave','wave'],['The sea going in and out at the beach','tidal']]],
 ['How can a current change the weather on land far away?','It carries warm water to cold places',[['It makes the Moon pull harder','moonc'],['It stops the wind','wave']]]];
function why(tag){let m='Think about what the lab showed for waves, tides and currents.';
 if(tag==='moon')m='The Moon makes tides, not waves. Waves come from the wind pushing on the water.';
 if(tag==='fish')m='Fish are far too small. Wind blowing over the sea pushes up the waves.';
 if(tag==='wind')m='Wind makes waves, but the slow rise and fall of the tide comes from the Moon pulling on the sea.';
 if(tag==='sun')m='The Sun’s heat does not make tides. Gravity does, mostly the Moon’s. The Sun’s pull adds a little.';
 if(tag==='once')m='There are two bulges of water, one facing the Moon and one on the far side. The Earth spins through both each day.';
 if(tag==='four')m='The beach passes two bulges each day, so about 2 high tides, with 2 low tides between them.';
 if(tag==='water')m='A wave carries energy, not water. The floating thing goes up and down as the wave passes, like the duck.';
 if(tag==='wave')m='A current is a steady flow of water, like a river in the sea. Waves only move the surface up and down.';
 if(tag==='tidal')m='That is the tide. A current is a flow of water that travels right across the ocean.';
 if(tag==='moonc')m='The Moon makes tides. Currents change the weather by carrying warm or cold water to new places.';
 return m}
function ask(){item++;const[q,ans,bad]=QS[item%QS.length],opts=[[ans,'ok'],...bad],r=item%3,order=opts.slice(r).concat(opts.slice(0,r));
 quizBox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quizBox.querySelector('.fl-pick');order.forEach(([v,tag])=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Answer: '+v},row,v).onclick=()=>mark(tag,ans)});tell('Challenge: '+q);A.redraw()}
function mark(tag,ans){quizBox.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=quizBox.querySelector('.fl-fb'),ok=tag==='ok';ok?A.win():A.sound.miss();tell(ok?'Yes. '+ans+'.':why(tag));
 fb.innerHTML=(ok?`✓ Yes: ${ans}.`:'✗ '+why(tag))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:Q=>{quizBox.hidden=Q.step!==5;pad.hidden=Q.step===5;keys()},
 init:Q=>{const w=c.el('div',{class:'fl-below'},Q.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Sea controls'},w);quizBox=c.el('div',{class:'fl-chal'},Q.below);fresh();A.gest({down,move,up});
  /* waves keep rolling only while they are on screen */
  A.every(dt=>{if(part()!=='wind'||A.reduced())return false;S.t+=dt;return S.amp>0.5||S.wind>0});keys()}});
A.start()})})();
