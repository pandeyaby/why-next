/* Flagship – points, lines, line segments and rays (ages 9-10; CCSS 4.G.A.1, 4.MD.C.5a). Drag two points and join them
   three ways; try to measure six figures and find that only segments have a length; build named rays on P, Q, R by
   tapping the endpoint first; open an angle between two rays from one vertex and see longer arms change nothing; then
   find every segment in a house without counting the shared side twice. Data and drawings: geoline_art.js. */
(()=>{const G=GLN;
VIS.reg('flaglineray',c=>{let A,P,pad,cq,qn=-1,run=0,drag=null;const K={};
const MODES=['make','measure','name','angle','house','quiz'],mode=()=>MODES[A.step];
const COL=()=>A.col.dark?['#60a5fa','#fbbf24','#f472b6']:['#1d4ed8','#b45309','#be185d'];
let B=null;
function frame(t,tone){const y0=P.banner(t,tone,K.note,K.bad);B=G.board(A,8,y0,A.W-16,A.H-y0-8);return B}
/* ---------- 1. join two points ---------- */
function setKind(k){const m=K.mk;m.k=k;if(!m.made.includes(k))m.made.push(k);A.sound.tick();say(G.KINDS.find(o=>o.k===k).say,false)}
function moveTo(w,q){const m=K.mk,o=w==='a'?m.b:m.a,x=Math.max(0,Math.min(G.BW,Math.round(q[0]))),y=Math.max(0,Math.min(G.BH,Math.round(q[1])));if(x===o[0]&&y===o[1])return;m[w]=[x,y];A.redraw()}
function moveB(){const m=K.mk,b=m.b;moveTo('b',[b[0]>=9?2:b[0]+3,b[1]<=1?6:b[1]-2]);say(`Point B moved. ${m.k?'The '+G.KINDS.find(o=>o.k===m.k).t.toLowerCase()+' still joins A and B.':'Now choose how to join A and B.'}`,false)}
function drawMake(){const m=K.mk,ok=m.made.length>=3;frame(ok?G.DONE[0]:`Made ${m.made.length} of 3: ${m.made.map(k=>G.KINDS.find(o=>o.k===k).t.toLowerCase()).join(', ')||'none yet'}`,ok?'ok':K.bad?'no':'');
 const g=A.ctx,cl=COL()[0];if(m.k)G.figure(A,B,m.k,m.a,m.b,cl,5);
 ['a','b'].forEach(w=>{const p=B.px(m[w]);G.dot(g,p,Math.max(9,B.s*.28),A.col.dark?'#e2e8f0':'#0f172a',cl);P.tag(w.toUpperCase(),p.x,p.y-Math.max(20,B.s*.75),14)})}
/* ---------- 2. which can be measured? ---------- */
function measure(i){const s=K.ms,f=G.FIGS[i];if(s.got.length>=3)return;
 if(f.k!=='seg'){A.sound.miss();return say(`Figure ${f.n} is a ${f.k}. ${f.k==='ray'?'It has one endpoint and the arrow means it goes on for ever':'It has no endpoints at all and goes on for ever both ways'}, so there is no end to measure to.`,true)}
 if(s.got.includes(i))return say(`Figure ${f.n} is already measured.`,false);
 s.got.push(i);A.sound.pop();const L=Math.round(Math.hypot(f.b[0]-f.a[0],f.b[1]-f.a[1])*10)/10;say(`Figure ${f.n} is a line segment. From endpoint to endpoint it is ${L} cm long.`,false)}
function drawMeasure(){const s=K.ms,ok=s.got.length>=3;frame(ok?G.DONE[1]:`Measured: ${s.got.length} of 3. Tap the figures you can measure.`,ok?'ok':K.bad?'no':'');
 G.FIGS.forEach((f,i)=>{const cl=COL()[i%3];G.figure(A,B,f.k,f.a,f.b,cl,4);const m=B.px([(f.a[0]+f.b[0])/2,(f.a[1]+f.b[1])/2]);
  P.tag(s.got.includes(i)?`${f.n}: ${Math.round(Math.hypot(f.b[0]-f.a[0],f.b[1]-f.a[1])*10)/10} cm`:f.n,m.x,m.y-14,13,cl)})}
/* ---------- 3. naming rays ---------- */
function pick(n){const r=K.nm;if(r.g>=G.GOALS.length)return;const goal=G.GOALS[r.g];
 if(!r.first){r.first=n;A.sound.tick();return say(`Endpoint ${n}. Now tap a point the ray passes through.`,false)}
 if(n===r.first)return say('Pick a different point for the ray to pass through.',true);
 const st=r.first;r.first=null;const dir=Math.sign(G.PTS[n][0]-G.PTS[st][0]),want=Math.sign(G.PTS[goal[1]][0]-G.PTS[goal[0]][0]);
 if(st!==goal[0]){r.bad=[st,n];A.sound.miss();return say(`That is ray ${st}${n}: it starts at ${st}. Ray ${goal} must start at ${goal[0]}, the letter written first.`,true)}
 if(dir!==want){r.bad=[st,n];A.sound.miss();return say(`That ray starts at ${st} but goes towards ${n}. Ray ${goal} has to pass through ${goal[1]}, the other way.`,true)}
 r.bad=null;r.made.push([st,n]);r.g++;A.sound.pop();say(`Ray ${goal} is made.${n!==goal[1]?` Ray ${st}${n} is the same ray: same endpoint, same direction.`:''}`,false)}
function drawName(){const r=K.nm,goal=G.GOALS[r.g];frame(goal?`Build ray ${goal}. Ray ${r.g+1} of 3.`:G.DONE[2],goal?(K.bad?'no':''):'ok');const g=A.ctx;
 r.made.forEach(([s,n],i)=>{const dy=(i-1)*.9-1.4,a=[G.PTS[s][0],G.PTS[s][1]+dy],b=[G.PTS[n][0],G.PTS[n][1]+dy];G.figure(A,B,'ray',a,b,COL()[i%3],4);const q=B.px(a);P.tag(`ray ${s}${n}`,q.x+(n<s?-30:30),q.y-12,12,COL()[i%3])});if(r.bad)G.figure(A,B,'ray',G.PTS[r.bad[0]],G.PTS[r.bad[1]],G.RIM,2.5);
 Object.entries(G.PTS).forEach(([n,q])=>{const p=B.px(q);G.dot(g,p,Math.max(10,B.s*.3),r.first===n?'#16a34a':(A.col.dark?'#e2e8f0':'#0f172a'));P.tag(n,p.x,p.y+Math.max(22,B.s*.8),15)})}
/* ---------- 4. two rays make an angle ---------- */
function setDeg(d,rec){const a=K.an;a.deg=Math.max(15,Math.min(180,Math.round(d/15)*15));if(rec)record();else A.redraw()}
function record(){const a=K.an,k=G.KIND(a.deg);if(k!=='straight'&&!a.got.includes(k))a.got.push(k);A.sound.tick();
 say(`${a.deg}°: ${k==='straight'?'a straight angle, a half turn. The two rays make a line.':(k==='right'?'a right angle, a square corner.':k==='acute'?'an acute angle, less than a right angle.':'an obtuse angle, more than a right angle but less than a straight line.')} Both rays start at the vertex.`,false)}
function arms(){const a=K.an;a.arm=a.arm===G.ARM?3:G.ARM;A.sound.tick();say(`The arms are ${a.arm===G.ARM?'longer':'shorter'} now, but the turn between them is still ${a.deg}°. Arm length does not change an angle.`,false)}
function drawAngle(){const a=K.an,ok=a.got.length>=3;frame(ok?G.DONE[3]:`Angles made: ${a.got.join(', ')||'none yet'}. Make acute, right and obtuse.`,ok?'ok':K.bad?'no':'');
 const g=A.ctx,v=B.px(G.VX),r=a.deg*Math.PI/180,e1=[G.VX[0]+a.arm,G.VX[1]],e2=[G.VX[0]+a.arm*Math.cos(r),G.VX[1]-a.arm*Math.sin(r)],cl=COL();
 G.figure(A,B,'ray',G.VX,e1,cl[0],4);G.figure(A,B,'ray',G.VX,e2,cl[1],4);
 g.strokeStyle=cl[2];g.lineWidth=3;g.beginPath();if(a.deg===90){const q=B.s*.8;g.rect(v.x,v.y-q,q,q)}else g.arc(v.x,v.y,B.s*1.1,0,-r,true);g.stroke();
 G.dot(g,v,Math.max(7,B.s*.22),A.col.dark?'#e2e8f0':'#0f172a');const h=B.px(e2);G.dot(g,h,Math.max(11,B.s*.34),cl[1],A.col.dark?'#e2e8f0':'#0f172a');
 P.tag('vertex',v.x,v.y+Math.max(20,B.s*.7),13);P.tag(`${a.deg}° ${G.KIND(a.deg)}`,v.x+B.s*2.4,v.y-B.s*2.6,15,cl[2])}
/* ---------- 5. segments in a house ---------- */
const NM=['BC','BD','CE','DE','AB','AC'],VT={A:[6,1],B:[3,4],C:[9,4],D:[3,7.5],E:[9,7.5]};
function count(i){const h=K.hs;if(h.got.length>=6)return;if(h.got.includes(i)){A.sound.miss();return say(`You already counted ${NM[i]}.${i===0?' The top of the walls is also the bottom of the roof: one segment, so it counts once.':' Each side counts once.'}`,true)}
 h.got.push(i);A.sound.pop();say(`Segment ${NM[i]}: endpoints ${NM[i][0]} and ${NM[i][1]}. ${h.got.length} found.`,false)}
function drawHouse(){const h=K.hs,ok=h.got.length>=6;frame(ok?G.DONE[4]:`Segments found: ${h.got.length}. Tap each side once.`,ok?'ok':K.bad?'no':'');const g=A.ctx;
 G.HOUSE.forEach((s,i)=>G.figure(A,B,'seg',s[0],s[1],h.got.includes(i)?COL()[i%3]:G.RIM,h.got.includes(i)?5:3));
 Object.entries(VT).forEach(([n,q])=>{const p=B.px(q);P.tag(n,p.x+(q[0]<6?-18:q[0]>6?18:0),p.y+(n==='A'?-4:0)-(n==='A'?14:0),14)})}
/* ---------- wiring ---------- */
function draw(){const g=A.ctx;g.fillStyle=A.col.dark?'#1e293b':'#f8fafc';g.fillRect(0,0,A.W,A.H);const m=mode();
 if(m==='quiz'){frame('Challenge: points, lines, segments and rays','ok');G.figure(A,B,'line',[2,6],[10,2],COL()[0],4);G.figure(A,B,'ray',[3,2],[6,3],COL()[1],4);G.figure(A,B,'seg',[7,6.5],[11,6.5],COL()[2],4);return}
 ({make:drawMake,measure:drawMeasure,name:drawName,angle:drawAngle,house:drawHouse})[m]();A.fx.draw(g)}
function down(p){if(!B)return false;const q=B.un(p),m=mode();
 if(m==='make'){const w=['a','b'].find(w=>Math.hypot(q[0]-K.mk[w][0],q[1]-K.mk[w][1])<.9);if(w){drag=w;return true}return false}
 if(m==='measure'){let best=-1,bd=.6;G.FIGS.forEach((f,i)=>{const d=G.gap(f.k,f.a,f.b,q);if(d<bd){bd=d;best=i}});if(best>=0)measure(best);return false}
 if(m==='name'){const n=Object.keys(G.PTS).find(n=>Math.hypot(q[0]-G.PTS[n][0],q[1]-G.PTS[n][1])<.9);if(n)pick(n);return false}
 if(m==='angle'){drag='ang';move(p);return true}
 if(m==='house'){let best=-1,bd=.5;G.HOUSE.forEach((s,i)=>{const d=G.gap('seg',s[0],s[1],q);if(d<bd){bd=d;best=i}});if(best>=0)count(best);return false}return false}
function move(p){if(!drag||!B)return;const q=B.un(p);if(drag==='ang'){const d=Math.atan2(G.VX[1]-q[1],q[0]-G.VX[0])*180/Math.PI;setDeg(d<0&&d<-90?180:d,false)}else moveTo(drag,q)}
function up(){if(drag==='ang')record();else if(drag)say(`Point ${drag.toUpperCase()} moved. ${K.mk.k?'The '+G.KINDS.find(o=>o.k===K.mk.k).t.toLowerCase()+' follows it.':'Now choose how to join A and B.'}`,false);drag=null}
function fresh(){run++;drag=null;for(const k in K)delete K[k];Object.assign(K,{mk:{a:[3,5],b:[8,3],k:null,made:[]},ms:{got:[]},nm:{g:0,first:null,made:[],bad:null},an:{deg:30,arm:G.ARM,got:[]},hs:{got:[]},note:null,bad:false,test:()=>{}})}
function say(t,bad){K.note=t;K.bad=!!bad;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();K.test()}
const check=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(G.DONE[i]+A.reveal(i))};
function begin(i,ok){fresh();c.say(G.DESC[i]);A.cv.setAttribute('aria-label',G.DESC[i]);K.test=check(i,ok);controls();A.redraw()}
function demo(i,list){steps[i].go();const e=run;let t=0;list.forEach(([ms,f])=>{t+=ms;setTimeout(()=>{if(e===run)f()},t)})}
function controls(){if(!pad)return;pad.innerHTML='';const m=mode(),Bt=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn sm','aria-label':l||t},pad,t).onclick=f};
 if(m==='make'){G.KINDS.forEach(o=>Bt(o.t,()=>setKind(o.k),`Join A and B with a ${o.t.toLowerCase()}`));Bt('Move B',moveB,'Move point B to a new place')}
 if(m==='measure'&&K.ms.got.length<3)G.FIGS.forEach((f,i)=>Bt(`Measure ${f.n}`,()=>measure(i),`Measure figure ${f.n}`));
 if(m==='name'&&K.nm.g<G.GOALS.length)Object.keys(G.PTS).forEach(n=>Bt(`Point ${n}`,()=>pick(n),`Tap point ${n}`));
 if(m==='angle'){Bt('Open 15°',()=>setDeg(K.an.deg+15,true),'Open the angle by 15 degrees');Bt('Close 15°',()=>setDeg(K.an.deg-15,true),'Close the angle by 15 degrees');Bt(K.an.arm===G.ARM?'Shorter arms':'Longer arms',arms)}
 if(m==='house'&&K.hs.got.length<6)NM.forEach((n,i)=>Bt(`Side ${n}`,()=>count(i),`Count segment ${n}`))}
const steps=[
{h:'Segment, ray or line?',p:G.TXT[0],task:'Join A and B as a line segment, a ray and a line',
 show:()=>demo(0,[[450,()=>setKind('seg')],[600,()=>setKind('ray')],[600,()=>setKind('line')]]),go:()=>begin(0,()=>K.mk.made.length>=3)},
{h:'What can a ruler measure?',p:G.TXT[1],predict:{q:'Can you measure how long a ray is?',opts:['Yes, from the endpoint to the arrow','No, a ray never ends'],ans:1},task:'Measure every figure that has a length',
 show:()=>demo(1,[[450,()=>measure(0)],[450,()=>measure(1)],[450,()=>measure(2)]]),go:()=>begin(1,()=>K.ms.got.length>=3)},
{h:'Naming a ray',p:G.TXT[2],predict:{q:'Is ray QR the same ray as ray QP?',opts:['Yes, both start at Q','No, they point opposite ways'],ans:1},task:'Build ray QR, ray QP and ray RP',
 show:()=>demo(2,G.GOALS.flatMap(g=>[[350,()=>pick(g[0])],[350,()=>pick(g[1])]])),go:()=>begin(2,()=>K.nm.g>=G.GOALS.length)},
{h:'Two rays make an angle',p:G.TXT[3],task:'Make an acute, a right and an obtuse angle',
 show:()=>demo(3,[[450,()=>setDeg(45,true)],[450,()=>setDeg(90,true)],[450,()=>setDeg(135,true)]]),go:()=>begin(3,()=>K.an.got.length>=3)},
{h:'Segments in a shape',p:G.TXT[4],task:'Find all the line segments in the house',
 show:()=>demo(4,NM.map((_,i)=>[300,()=>count(i)])),go:()=>begin(4,()=>K.hs.got.length>=6)},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>K.test()});
function slip(t){let m='A segment has two endpoints, a ray has one, a line has none.';
 if(t==='ends')m='Count the endpoints: a line segment has 2, a ray has 1 and a line has 0.';
 if(t==='length')m='A ray has only one endpoint and goes on for ever, so it has no length. Only a line segment can be measured.';
 if(t==='order')m='The first letter is the endpoint. Ray AB starts at A and ray BA starts at B, so they point opposite ways.';
 if(t==='arrow')m='An arrow means the figure keeps going for ever in that direction. It does not stop there.';
 if(t==='vertex')m='Two rays with the same endpoint make an angle. The shared endpoint is the vertex.';
 if(t==='arms')m='The size of an angle is the turn between the arms. Longer arms do not change it.';
 if(t==='twice')m='Each side is one line segment, counted once. A triangle has 3 sides, so 3 segments.';
 return m}
function ask(){qn++;const Q=G.QS[qn%G.QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 cq.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=cq.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>reply(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function reply(t,a){cq.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=cq.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':slip(t))}
FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:X=>{cq.hidden=X.step!==5;pad.hidden=X.step===5;controls()},
 init:X=>{A=X;P=G.PEN(A);const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lines and rays lab buttons'},w);cq=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});controls()}}).start()})})();
