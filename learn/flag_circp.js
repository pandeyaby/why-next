/* Flagship – parts of a circle (ages 10–11; NC 2013 Year 6 "illustrate and name parts of circles, including radius,
   diameter and circumference and know that the diameter is twice the radius"). Scenes: name the centre, radius,
   diameter and circumference (with a chord as a decoy); drag a radius round to see every radius is equal; drag a point
   until a line across is a diameter; open compasses to the radius to draw a circle; roll a wheel one turn to see the
   circumference is a bit more than 3 diameters; check a robot. Data in learn/circp_art.js. Distinct from flagchord
   (chords, arcs, sectors and tangents, ages 14+): this lab builds the first meaning of each part and d = 2r. */
(()=>{const K=CIRP;
VIS.reg('flagcircp',c=>{let A,pad,quiz,turn=-1,run=0,drag=null;const S={};
const INK='#0f172a',RING='#1e3a8a',OKC='#15803d',NOC='#b91c1c',GREY='#94a3b8',PAPER='#fefce8',LINES={A:'#b45309',B:'#7c3aed',C:'#0f766e'},F='px system-ui,sans-serif';
const sceneName=()=>['name','radius','diam','compass','roll','robot','quiz'][A.step];
const fs=n=>A.narrow?n:Math.round(n*1.15),rad=d=>d*Math.PI/180,snap=(v,s)=>Math.round(v/s)*s;
const norm=a=>((a%360)+540)%360-180;
function paper(){const g=A.ctx;g.fillStyle=PAPER;g.fillRect(0,0,A.W,A.H);g.strokeStyle='#fde68a';g.lineWidth=1;for(let y=A.H*.06;y<A.H;y+=A.H*.06){g.beginPath();g.moveTo(0,y);g.lineTo(A.W,y);g.stroke()}}
/* a white label with dark words; it shrinks until it fits the canvas width */
function tag(t,x,y,o){o=o||{};const g=A.ctx;let f=fs(o.n||14);g.font=`700 ${f}${F}`;while(g.measureText(t).width+22>A.W-8&&f>10){f--;g.font=`700 ${f}${F}`}
 const w=g.measureText(t).width+22,h=f+14,l=Math.max(4,Math.min(A.W-w-4,x-w/2));g.fillStyle='#ffffff';A.paint.rrect(l,y-h/2,w,h,8);g.fill();
 g.lineWidth=o.ok||o.no?3:1.4;g.strokeStyle=o.ok?OKC:o.no?NOC:GREY;g.stroke();g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,l+w/2,y+1)}
/* the circle used by the first three scenes */
const disc=()=>({x:A.W/2,y:A.H*.56,r:Math.min(A.W*.36,A.H*.33)});
const at=(C,deg,r)=>({x:C.x+(r==null?C.r:r)*Math.cos(rad(deg)),y:C.y+(r==null?C.r:r)*Math.sin(rad(deg))});
const far=(p,q)=>Math.hypot(p.x-q.x,p.y-q.y);
function segGap(p,a,b){const dx=b.x-a.x,dy=b.y-a.y,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.y-a.y)*dy)/(dx*dx+dy*dy)));return far(p,{x:a.x+t*dx,y:a.y+t*dy})}
function stroke(a,b,col,w,dash){const g=A.ctx;g.setLineDash(dash||[]);g.strokeStyle=col;g.lineWidth=w;g.beginPath();g.moveTo(a.x,a.y);g.lineTo(b.x,b.y);g.stroke();g.setLineDash([])}
function ring(C,col,w){const g=A.ctx;g.strokeStyle=col;g.lineWidth=w;g.beginPath();g.arc(C.x,C.y,C.r,0,Math.PI*2);g.stroke()}
function dot(p,r,col){const g=A.ctx;g.fillStyle=col;g.beginPath();g.arc(p.x,p.y,r,0,Math.PI*2);g.fill()}
function letter(t,p,col){const g=A.ctx;dot(p,fs(12),'#ffffff');g.strokeStyle=col;g.lineWidth=2.5;g.beginPath();g.arc(p.x,p.y,fs(12),0,Math.PI*2);g.stroke();g.fillStyle=INK;g.font=`800 ${fs(13)}${F}`;g.textAlign='center';g.textBaseline='middle';g.fillText(t,p.x,p.y+1)}
/* 1. name the part: three lines get letters A, B, C in an order that changes each round */
function lines(i){const R=K.NAME[i],C=disc(),kinds=['radius','diameter','chord'],turnBy=i%3,ord=kinds.slice(turnBy).concat(kinds.slice(0,turnBy));
 const seg={radius:[C,at(C,R.rad)],diameter:[at(C,R.dia),at(C,R.dia+180)],chord:[at(C,R.chord[0]),at(C,R.chord[1])]};
 return ord.map((k,j)=>({k,L:'ABC'[j],a:seg[k][0],b:seg[k][1]}))}
function drawName(){const s=S.name;paper();if(s.i>=K.NAME.length){tag('All 5 parts named',A.W/2,A.H*.14,{ok:1});tag('centre · radius · diameter · circumference',A.W/2,A.H*.3,{n:12});return}
 const C=disc(),want=K.NAME[s.i].want;tag(`${s.i+1} of ${K.NAME.length}: tap ${K.PART[want]}`,A.W/2,A.H*.08,{n:15});
 ring(C,s.miss==='circumference'?NOC:RING,s.miss==='circumference'?6:4);
 lines(s.i).forEach(l=>{stroke(l.a,l.b,s.miss===l.k?NOC:LINES[l.L],s.miss===l.k?6:4);const m={x:l.a.x+(l.b.x-l.a.x)*.62,y:l.a.y+(l.b.y-l.a.y)*.62};letter(l.L,{x:m.x+fs(14),y:m.y-fs(14)},LINES[l.L])});
 dot(C,fs(7),s.miss==='centre'?NOC:INK)}
function whichPart(p){const C=disc();if(far(p,C)<Math.max(16,C.r*.1))return'centre';
 let best=null,gap=15;lines(S.name.i).forEach(l=>{const d=segGap(p,l.a,l.b);if(d<gap){gap=d;best=l.k}});if(best)return best;
 return Math.abs(far(p,C)-C.r)<18?'circumference':null}
function nameTap(k){const s=S.name;if(s.i>=K.NAME.length||!k)return;const want=K.NAME[s.i].want;
 if(k!==want){s.miss=k;A.sound.miss();return say(`${K.WHY[k]} Find ${K.PART[want]}.`)}
 s.miss=null;s.i++;A.sound.pop();say(`Yes. ${K.WHY[k]}`+(s.i<K.NAME.length?' Next one.':''))}
const lineOf=L=>(lines(S.name.i).find(l=>l.L===L)||{}).k;
/* 2. drag the radius: the handle stays on the edge, so its distance from the centre never changes */
function drawRadius(){const s=S.radius,C=disc();paper();tag(`Drag the handle to each ring (${s.got.filter(Boolean).length} of 3)`,A.W/2,A.H*.08,{n:14});ring(C,RING,4);
 K.SPOTS.forEach((a,j)=>{const p=at(C,a);if(s.got[j]){stroke(C,p,'#64748b',3,[6,5])}A.ctx.strokeStyle=s.got[j]?OKC:'#ea580c';A.ctx.lineWidth=3;A.ctx.beginPath();A.ctx.arc(p.x,p.y,fs(15),0,Math.PI*2);A.ctx.stroke()});
 const P=at(C,s.a);stroke(C,P,'#b45309',5);dot(C,fs(6),INK);dot(P,fs(11),'#b45309');dot(P,fs(5),'#ffffff');
 tag(`radius = ${K.RAD_CM} cm`,A.W/2,A.H*.94,{n:13,ok:s.got.some(Boolean)})}
function radiusTo(a){const s=S.radius;s.a=norm(snap(a,5));let hit=-1;K.SPOTS.forEach((t,j)=>{if(!s.got[j]&&Math.abs(norm(s.a-t))<=6){s.got[j]=true;hit=j}});
 if(hit<0)return A.redraw();A.sound.pop();const n=s.got.filter(Boolean).length;
 say(`Ring ${n} reached. The radius is still ${K.RAD_CM} cm.`+(n<3?' Try another ring.':' Every radius of this circle is 4 cm.'))}
/* 3. make a diameter: A is fixed on the left, B moves round the edge; AB is longest when it passes through the centre */
const chordCm=(r,b)=>2*r*Math.abs(Math.sin(rad(norm(b-180))/2));
function drawDiam(){const s=S.diam,C=disc();paper();if(s.i>=K.DIAM.length){tag('All 3 diameters made',A.W/2,A.H*.14,{ok:1});tag('diameter = 2 × radius',A.W/2,A.H*.3,{n:14});return}
 const r=K.DIAM[s.i],a=at(C,180),b=at(C,s.b),len=chordCm(r,s.b);tag(`Circle ${s.i+1} of ${K.DIAM.length}: radius ${r} cm. Drag B to make a diameter`,A.W/2,A.H*.08,{n:13});
 ring(C,RING,4);stroke(C,at(C,-90),'#64748b',3,[6,5]);tag(`radius ${r} cm`,C.x+fs(46),C.y-C.r*.55,{n:11});
 stroke(a,b,'#7c3aed',5);dot(C,fs(6),INK);letter('A',a,'#7c3aed');letter('B',b,'#7c3aed');tag(`A to B = ${len.toFixed(1)} cm`,A.W/2,A.H*.94,{n:13})}
function diamTo(deg){const s=S.diam;if(s.i>=K.DIAM.length)return;s.b=norm(snap(deg,5));if(Math.abs(norm(s.b-180))<1)s.b=norm(s.b+15);
 if(Math.abs(s.b)>2)return A.redraw();const r=K.DIAM[s.i];s.i++;s.b=[-60,60,-105][s.i]||-60;A.sound.pop();drag=null;
 say(`A to B now passes through the centre: a diameter. It is ${2*r} cm, twice the radius of ${r} cm.`+(s.i<K.DIAM.length?' Next circle.':''))}
const diamStep=dir=>diamTo(S.diam.b+dir*15);
const diamToward=()=>{const b=S.diam.b;diamStep(b>0?-1:1)};
/* 4. compasses: the opening between the point and the pencil is the radius of the circle they draw */
const ruler=()=>{const u=(A.W-40)/10;return{x0:20,y:A.H*.86,u}};
function drawCompass(){const s=S.comp,g=A.ctx,R=ruler();paper();if(s.i>=K.COMPASS.length){tag('All 3 circles drawn',A.W/2,A.H*.14,{ok:1});tag('Open the compasses to the radius',A.W/2,A.H*.3,{n:13});return}
 const Q=K.COMPASS[s.i];tag(`${s.i+1} of ${K.COMPASS.length}: draw ${Q.ask}`,A.W/2,A.H*.07,{n:13});
 const k=Math.min(A.H*.24,A.W*.4)/9,O={x:A.W/2,y:A.H*.34};g.setLineDash([7,6]);g.strokeStyle='#64748b';g.lineWidth=2;g.beginPath();g.arc(O.x,O.y,Q.r*k,0,Math.PI*2);g.stroke();g.setLineDash([]);
 if(s.drawn){ring({x:O.x,y:O.y,r:s.drawn*k},s.drawn===Q.r?OKC:NOC,3);stroke({x:O.x-s.drawn*k,y:O.y},{x:O.x+s.drawn*k,y:O.y},s.drawn===Q.r?OKC:NOC,2)}
 dot(O,4,INK);tag(s.drawn?`yours: ${2*s.drawn} cm across`:'dashes: the size you need (shown smaller)',A.W/2,A.H*.6,{n:11,ok:s.drawn===Q.r,no:s.drawn&&s.drawn!==Q.r});
 g.fillStyle='#fef3c7';g.fillRect(R.x0-8,R.y,10*R.u+16,A.H*.1);g.strokeStyle='#92400e';g.lineWidth=1.5;g.strokeRect(R.x0-8,R.y,10*R.u+16,A.H*.1);
 g.fillStyle=INK;g.font=`700 ${fs(10)}${F}`;g.textAlign='center';g.textBaseline='top';
 for(let cm=0;cm<=10;cm+=.5){const x=R.x0+cm*R.u;g.beginPath();g.moveTo(x,R.y);g.lineTo(x,R.y+(cm%1?6:12));g.stroke();if(cm%1===0)g.fillText(String(cm),x,R.y+13)}
 const p={x:R.x0,y:R.y},q={x:R.x0+s.o*R.u,y:R.y},h={x:(p.x+q.x)/2,y:R.y-A.H*.17};stroke(h,p,'#475569',5);stroke(h,q,'#475569',5);dot(h,7,'#334155');dot(q,5,'#ea580c');
 tag(`opening ${s.o} cm`,Math.min(A.W-60,q.x+50),R.y-A.H*.08,{n:12})}
function openTo(cm){const s=S.comp;s.o=Math.max(.5,Math.min(9,snap(cm,.5)));s.drawn=0;A.redraw();A.cv.setAttribute('aria-label',`Compasses open ${s.o} cm.`)}
function drawCircle(){const s=S.comp;if(s.i>=K.COMPASS.length)return;const Q=K.COMPASS[s.i];s.drawn=s.o;
 if(s.o===Q.r){s.i++;s.drawn=0;A.sound.pop();return say(`Right: compasses open ${Q.r} cm draw a circle ${Q.d} cm across, because the diameter is twice the radius.`+(s.i<K.COMPASS.length?' Next circle.':''))}
 A.sound.miss();let m=`Your circle is ${2*s.o} cm across, but you need ${Q.d} cm. Open the compasses to half of that.`;
 if(s.o===Q.d)m=`Your circle is ${2*s.o} cm across: you opened the compasses to the diameter. The opening makes the radius, so use half: ${Q.r} cm.`;
 else if(s.o*2===Q.r)m=`Your circle is only ${2*s.o} cm across. The opening is the radius, which is half the diameter: ${Q.r} cm.`;say(m)}
const compToward=()=>{const s=S.comp;if(s.i>=K.COMPASS.length)return;const r=K.COMPASS[s.i].r;if(s.o<r)openTo(s.o+.5);else if(s.o>r)openTo(s.o-.5);else drawCircle()};
/* 5. roll a wheel one full turn; diameter rods laid under the track show about 3.14 diameters */
const track=()=>{const u=(A.W-20)/16.6;return{u,y:A.H*.6}};
function drawRoll(){const s=S.roll,g=A.ctx,T=track();paper();const d=K.ROLL[s.i],rp=d/2*T.u,x0=10+2*T.u,C={x:x0+s.s*T.u,y:T.y-rp,r:rp},full=Math.PI*d;
 tag(s.done>=K.ROLL.length?'All 3 wheels rolled':`Wheel ${s.i+1} of ${K.ROLL.length}: diameter ${d} cm. Roll it one full turn`,A.W/2,A.H*.08,{n:13,ok:s.done>=K.ROLL.length});
 g.fillStyle='#a8a29e';g.fillRect(0,T.y,A.W,6);stroke({x:x0,y:T.y-4},{x:x0,y:T.y+16},INK,2);stroke({x:x0,y:T.y+3},{x:C.x,y:T.y+3},'#dc2626',5);
 g.fillStyle='#e2e8f0';g.beginPath();g.arc(C.x,C.y,rp,0,Math.PI*2);g.fill();ring(C,'#334155',4);const turnA=Math.PI/2+s.s/(d/2);
 stroke(C,{x:C.x+rp*Math.cos(turnA),y:C.y+rp*Math.sin(turnA)},'#64748b',2);dot({x:C.x+rp*Math.cos(turnA),y:C.y+rp*Math.sin(turnA)},fs(6),'#dc2626');
 if(s.fin){const cols=['#2563eb','#0891b2','#2563eb'];for(let k=0;k<4;k++){const a=x0+k*d*T.u,b=Math.min(x0+full*T.u,a+d*T.u);g.fillStyle=k<3?cols[k]:'#f59e0b';g.fillRect(a,T.y+22,b-a-2,10)}
  tag(`1 turn = ${full.toFixed(1)} cm: 3 diameters and a bit`,A.W/2,A.H*.78,{n:12,ok:1});tag('Tap Next wheel',A.W/2,A.H*.92,{n:11})}
 else tag(`rolled ${s.s.toFixed(1)} cm`,A.W/2,A.H*.8,{n:13})}
function rollTo(cm){const s=S.roll;if(s.fin||s.done>=K.ROLL.length)return;const d=K.ROLL[s.i],full=Math.PI*d;s.s=Math.max(0,Math.min(full,cm));
 if(s.s<full-.02)return A.redraw();s.fin=true;s.done++;drag=null;A.sound.pop();
 say(`One full turn: the red mark is back at the bottom. The wheel rolled ${full.toFixed(1)} cm, a bit more than 3 times its ${d} cm diameter.`+(s.done<K.ROLL.length?' Tap Next wheel.':''))}
const rollBit=()=>{const s=S.roll;if(!s.fin)rollTo(s.s+Math.PI*K.ROLL[s.i]/8)};
function nextWheel(){const s=S.roll;if(!s.fin||s.i>=K.ROLL.length-1)return;s.i++;s.s=0;s.fin=false;say(`Wheel ${s.i+1}: diameter ${K.ROLL[s.i]} cm. Roll it one full turn.`)}
/* 6. robot: right or slip */
const pair=()=>{const w=Math.min(170,(A.W-36)/2);return[0,1].map(k=>({i:k,t:k?'✗ Slip':'✓ Right',x:A.W/2+(k?6:-w-6),y:A.H*.7,w,h:Math.min(A.H*.17,60)}))};
function drawRobot(){const s=S.robot,g=A.ctx;paper();if(s.i>=K.ROBOT.length){tag('All 6 claims checked',A.W/2,A.H*.16,{ok:1});return}
 const R=K.ROBOT[s.i],u=Math.min(A.W*.055,24),x=A.W/2,y=A.H*.17;g.fillStyle='#cbd5e1';A.paint.rrect(x-u,y-u,u*2,u*2,7);g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke();dot({x:x-u*.4,y:y-u*.2},u*.15,INK);dot({x:x+u*.4,y:y-u*.2},u*.15,INK);
 tag(R.say,A.W/2,A.H*.4,{n:12});tag(`Claim ${s.i+1} of ${K.ROBOT.length}: right, or a slip?`,A.W/2,A.H*.55,{n:12});
 pair().forEach(b=>{g.fillStyle=s.miss===b.i?'#fee2e2':'#ffffff';A.paint.rrect(b.x,b.y,b.w,b.h,10);g.fill();g.lineWidth=s.miss===b.i?3:1.5;g.strokeStyle=s.miss===b.i?NOC:GREY;g.stroke();g.fillStyle=INK;g.font=`800 ${fs(16)}${F}`;g.textAlign='center';g.textBaseline='middle';g.fillText(b.t,b.x+b.w/2,b.y+b.h/2)})}
function judge(k){const s=S.robot;if(s.i>=K.ROBOT.length)return;const R=K.ROBOT[s.i];
 if((k===0)!==R.ok){s.miss=k;A.sound.miss();return say((R.ok?'Look again: it is right. ':'Look again: it is a slip. ')+R.fix)}
 s.miss=-1;s.i++;A.sound.pop();say((R.ok?'Yes, right. ':'Yes, a slip. ')+R.fix)}
function draw(){const k=sceneName();if(k==='quiz'){paper();tag('Challenge',A.W/2,A.H*.25,{ok:1});tag('Name the parts and use d = 2 × r',A.W/2,A.H*.5,{n:13});return}
 ({name:drawName,radius:drawRadius,diam:drawDiam,compass:drawCompass,roll:drawRoll,robot:drawRobot})[k]();A.fx.draw(A.ctx)}
/* pointer input: taps for naming and judging, drags for the radius, point B, the compasses and the wheel */
const angleOf=p=>{const C=disc();return Math.atan2(p.y-C.y,p.x-C.x)*180/Math.PI};
function onDown(p){const k=sceneName();drag=null;
 if(k==='name'){nameTap(whichPart(p));return false}
 if(k==='robot'){const b=pair().find(q=>p.x>=q.x&&p.x<=q.x+q.w&&p.y>=q.y&&p.y<=q.y+q.h);if(b)judge(b.i);return false}
 if(k==='radius'){drag='radius';radiusTo(angleOf(p));return true}
 if(k==='diam'){drag='diam';return true}
 if(k==='compass'&&p.y>A.H*.62){drag='comp';openTo((p.x-ruler().x0)/ruler().u);return true}
 if(k==='roll'){if(S.roll.fin){nextWheel();return false}drag='roll';S.roll.grab=p.x/track().u-S.roll.s;return true}
 return false}
function onMove(p){if(drag==='radius')radiusTo(angleOf(p));else if(drag==='diam')diamTo(angleOf(p));else if(drag==='comp')openTo((p.x-ruler().x0)/ruler().u);else if(drag==='roll')rollTo(p.x/track().u-S.roll.grab)}
function reset(){run++;drag=null;for(const k in S)delete S[k];Object.assign(S,{name:{i:0,miss:null},radius:{a:0,got:[false,false,false]},diam:{i:0,b:-60},comp:{i:0,o:1,drawn:0},roll:{i:0,s:0,fin:false,done:0,grab:0},robot:{i:0,miss:-1},hook:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.hook()}
/* buttons under the canvas do everything the canvas does */
function buttons(){if(!pad)return;pad.innerHTML='';const k=sceneName(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='name'&&S.name.i<K.NAME.length){['A','B','C'].forEach(L=>add(`Line ${L}`,()=>nameTap(lineOf(L))));add('The dot',()=>nameTap('centre'),'The dot in the middle');add('The curved edge',()=>nameTap('circumference'))}
 if(k==='radius'){add('⟲ Turn back',()=>radiusTo(S.radius.a-15),'Turn the radius 15 degrees anticlockwise');add('Turn on ⟳',()=>radiusTo(S.radius.a+15),'Turn the radius 15 degrees clockwise')}
 if(k==='diam'&&S.diam.i<K.DIAM.length){add('⟲ Move B back',()=>diamStep(-1),'Move B 15 degrees anticlockwise');add('Move B on ⟳',()=>diamStep(1),'Move B 15 degrees clockwise')}
 if(k==='compass'&&S.comp.i<K.COMPASS.length){add('Close 0.5 cm',()=>openTo(S.comp.o-.5));add('Open 0.5 cm',()=>openTo(S.comp.o+.5));add('Draw the circle',drawCircle)}
 if(k==='roll'&&S.roll.done<K.ROLL.length){add('Roll a bit',rollBit,'Roll the wheel one eighth of a turn');if(S.roll.fin)add('Next wheel',nextWheel)}
 if(k==='robot'&&S.robot.i<K.ROBOT.length){add('✓ Right',()=>judge(0),'The robot is right');add('✗ Slip',()=>judge(1),'The robot made a slip')}}
const ready=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,ok){reset();say(K.DESC[i]);S.hook=ready(i,ok,K.DONE[i])}
function auto(i,acts,ms){steps[i].go();const mine=run;acts.forEach((f,j)=>setTimeout(()=>{if(mine===run)f()},ms*(j+1)))}
const rep=(n,f)=>[...Array(n)].map(()=>f);
const steps=[
{h:'Name the parts',p:'The centre is the middle point. A radius goes from the centre to the edge. A diameter goes right across through the centre. The circumference is the curved edge. Tap the part asked for.',task:'Name all 5 parts',
 show:()=>auto(0,K.NAME.map((R,i)=>()=>nameTap(R.want)),550),go:()=>begin(0,()=>S.name.i>=K.NAME.length)},
{h:'Turn a radius',p:'Drag the handle round the edge, or use the turn buttons. Watch the length of the radius as it turns.',
 predict:{q:'Is a radius pointing up the same length as one pointing sideways?',opts:['Yes, every radius is the same','No, it depends on the way it points'],ans:0},task:'Reach all 3 rings',
 show:()=>auto(1,[...rep(6,()=>radiusTo(S.radius.a-15)),...rep(9,()=>radiusTo(S.radius.a+15)),...rep(8,()=>radiusTo(S.radius.a+15))],120),go:()=>begin(1,()=>S.radius.got.every(Boolean))},
{h:'Make a diameter',p:'Drag point B round the edge. The line from A to B gets longer until it goes through the centre. That longest line is a diameter.',
 predict:{q:'A circle has a radius of 3 cm. How long is its diameter?',opts:['1.5 cm','3 cm','6 cm'],ans:2},task:'Make all 3 diameters',
 show:()=>auto(2,rep(16,diamToward),180),go:()=>begin(2,()=>S.diam.i>=K.DIAM.length)},
{h:'Set the compasses',p:'Compasses draw a circle. The point sits on the centre and the pencil traces the edge, so the opening is the radius. Drag on the ruler to open them, then draw.',task:'Draw all 3 circles',
 show:()=>auto(3,rep(13,compToward),220),go:()=>begin(3,()=>S.comp.i>=K.COMPASS.length)},
{h:'Roll a wheel',p:'The circumference is the distance all the way round. Roll the wheel one full turn and the red line shows that distance on the track.',
 predict:{q:'One turn of a wheel covers about how many of its diameters?',opts:['Exactly 2','A bit more than 3','Exactly 4'],ans:1},task:'Roll all 3 wheels',
 show:()=>auto(4,[...rep(8,rollBit),nextWheel,...rep(8,rollBit),nextWheel,...rep(8,rollBit)],110),go:()=>begin(4,()=>S.roll.done>=K.ROLL.length)},
{h:'Check the robot',p:'The robot makes claims about circles. Is each one right, or a slip?',task:'Check all 6 claims',
 show:()=>auto(5,K.ROBOT.map(R=>()=>judge(R.ok?0:1)),500),go:()=>begin(5,()=>S.robot.i>=K.ROBOT.length)},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.hook()});
const why=t=>K.SLIP[t]||K.SLIP.other;
function ask(){turn++;const Q=K.QS[turn%K.QS.length],all=[[Q.a,'ok'],...Q.o],r=turn%3,ord=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=quiz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},box,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),yes=t==='ok';if(yes)A.win();else A.sound.miss();
 fb.innerHTML=(yes?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="lbtn sm">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(yes?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:x=>{quiz.hidden=x.step!==6;pad.hidden=x.step===6;buttons()},
 init:x=>{A=x;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Parts of a circle lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down:onDown,move:onMove,up:()=>{drag=null}});buttons()}}).start()})})();
