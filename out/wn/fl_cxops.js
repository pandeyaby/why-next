/* Flagship – adding, subtracting and multiplying complex numbers (ages 16–18; Edexcel 9FM0 Core Pure 2.1 and 2.3, AQA
   7367 B2). Scenes: drag w on an Argand diagram until z + w hits a target (tip-to-tail vectors), drag w until z − w hits
   a target (the vector from w to z), multiply by i and watch a quarter turn, fill the four-cell grid for (2 + 3i)(4 − i)
   and use i² = −1, then drag w until (1 + i)w lands on 4i while the moduli multiply and the arguments add. Lattice
   points snap; every drag has step buttons. Data in learn/cxops_art.js. */
(()=>{const {ADD,SUB,ROT,FOIL,MUL,QS}=CXO;
VIS.reg('flagcxops',c=>{let A,keys,qbox,qq=-1,era=0;const P={};
const TXT='#0f172a',OK='#047857',ERR='#b91c1c',GRID='#94a3b8',FNT='px system-ui,sans-serif',R=6;
const ZC0=()=>A.col.dark?'#60a5fa':'#1d4ed8',WC0=()=>A.col.dark?'#fb923c':'#c2410c',RC0=()=>A.col.dark?'#34d399':'#047857';
const scene=()=>['add','sub','rot','foil','mul','quiz'][A.step];
const fs=n=>A.narrow?n:Math.round(n*1.08);
const fmt=(a,b)=>{const r=Math.round(a*100)/100,m=Math.round(b*100)/100;if(!m)return String(r).replace('-','−');const im=(Math.abs(m)===1?'':String(Math.abs(m)))+'i';if(!r)return(m<0?'−':'')+im;return`${String(r).replace('-','−')} ${m<0?'−':'+'} ${im}`};
const plus=(u,v)=>[u[0]+v[0],u[1]+v[1]],minus=(u,v)=>[u[0]-v[0],u[1]-v[1]],times=(u,v)=>[u[0]*v[0]-u[1]*v[1],u[0]*v[1]+u[1]*v[0]];
const same=(u,v)=>Math.abs(u[0]-v[0])<1e-9&&Math.abs(u[1]-v[1])<1e-9,mod=u=>Math.hypot(u[0],u[1]),deg=u=>Math.round(Math.atan2(u[1],u[0])*180/Math.PI);
function bg(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#e0f2fe',A.col.dark?.05:.35);g.fillRect(0,0,A.W,A.H)}
function chip(t,x,y,o){o=o||{};const g=A.ctx;let n=fs(o.n||13);g.font=`700 ${n}${FNT}`;let w=g.measureText(t).width+20;
 while(w>(o.max||A.W-8)&&n>10){n--;g.font=`700 ${n}${FNT}`;w=g.measureText(t).width+20}
 const h=n+12,l=Math.max(4,Math.min(A.W-w-4,o.left?x:x-w/2));g.fillStyle=o.bg||'#ffffff';A.paint.rrect(l,y-h/2,w,h,6);g.fill();g.lineWidth=o.ok||o.no?2.5:1.2;g.strokeStyle=o.ok?OK:o.no?ERR:GRID;g.stroke();
 g.fillStyle=o.ink||TXT;g.textAlign='center';g.textBaseline='middle';g.fillText(t,l+w/2,y+1);return{x:l,y:y-h/2,w,h}}
/* Argand plane, ±R on both axes */
function plane(){const top=A.H*.15,side=Math.min(A.W-16,A.H-top-A.H*.1),u=side/(2*R);return{x0:(A.W-side)/2,y0:top,side,u,ox:A.W/2,oy:top+side/2}}
const toPx=(q,v)=>({x:q.ox+v[0]*q.u,y:q.oy-v[1]*q.u}),toZ=(q,p)=>[Math.max(-R,Math.min(R,Math.round((p.x-q.ox)/q.u))),Math.max(-R,Math.min(R,Math.round((q.oy-p.y)/q.u)))];
function axes(q){const g=A.ctx;g.fillStyle=A.col.dark?'#0b1220':'#ffffff';g.fillRect(q.x0,q.y0,q.side,q.side);g.lineWidth=1;g.strokeStyle=A.col.dark?'#334155':'#e2e8f0';
 for(let k=-R;k<=R;k++){g.beginPath();g.moveTo(q.ox+k*q.u,q.y0);g.lineTo(q.ox+k*q.u,q.y0+q.side);g.moveTo(q.x0,q.oy-k*q.u);g.lineTo(q.x0+q.side,q.oy-k*q.u);g.stroke()}
 g.strokeStyle=A.col.dark?'#cbd5e1':'#334155';g.lineWidth=1.6;g.beginPath();g.moveTo(q.x0,q.oy);g.lineTo(q.x0+q.side,q.oy);g.moveTo(q.ox,q.y0);g.lineTo(q.ox,q.y0+q.side);g.stroke();
 g.fillStyle=A.col.dark?'#e2e8f0':'#334155';g.font=`700 ${fs(11)}${FNT}`;g.textAlign='right';g.textBaseline='bottom';g.fillText('Re',q.x0+q.side-3,q.oy-3);g.textAlign='left';g.textBaseline='top';g.fillText('Im',q.ox+4,q.y0+3)}
function arrow(q,from,to,col,dash){const g=A.ctx,a=toPx(q,from),b=toPx(q,to),ang=Math.atan2(b.y-a.y,b.x-a.x);if(Math.hypot(b.x-a.x,b.y-a.y)<2)return;g.strokeStyle=col;g.fillStyle=col;g.lineWidth=3;if(dash)g.setLineDash([7,5]);
 g.beginPath();g.moveTo(a.x,a.y);g.lineTo(b.x-8*Math.cos(ang),b.y-8*Math.sin(ang));g.stroke();g.setLineDash([]);g.beginPath();g.moveTo(b.x,b.y);g.lineTo(b.x-12*Math.cos(ang-.4),b.y-12*Math.sin(ang-.4));g.lineTo(b.x-12*Math.cos(ang+.4),b.y-12*Math.sin(ang+.4));g.closePath();g.fill()}
function dot(q,v,col,name,o){o=o||{};const g=A.ctx,p=toPx(q,v);g.fillStyle=col;g.beginPath();g.arc(p.x,p.y,o.big?10:7,0,7);g.fill();if(o.ring){g.strokeStyle=col;g.lineWidth=2;g.beginPath();g.arc(p.x,p.y,15,0,7);g.stroke()}
 if(name){g.font=`800 ${fs(12)}${FNT}`;const t=`${name} = ${fmt(v[0],v[1])}`,w=g.measureText(t).width+10,lx=Math.max(q.x0+2,Math.min(q.x0+q.side-w-2,p.x+12)),ly=Math.max(q.y0+12,Math.min(q.y0+q.side-12,p.y-14+(o.dy||0)));
  g.fillStyle=A.col.dark?'rgba(15,23,42,.92)':'rgba(255,255,255,.92)';A.paint.rrect(lx,ly-10,w,20,5);g.fill();g.fillStyle=A.col.dark?'#f8fafc':TXT;g.textAlign='left';g.textBaseline='middle';g.fillText(t,lx+5,ly+1)}}
function target(q,v){const g=A.ctx,p=toPx(q,v);g.strokeStyle=A.col.dark?'#fbbf24':'#b45309';g.lineWidth=2.5;g.setLineDash([4,3]);g.beginPath();g.arc(p.x,p.y,13,0,7);g.stroke();g.setLineDash([]);g.beginPath();g.moveTo(p.x-6,p.y);g.lineTo(p.x+6,p.y);g.moveTo(p.x,p.y-6);g.lineTo(p.x,p.y+6);g.stroke()}
const near=(q,p,v)=>{const s=toPx(q,v);return Math.hypot(p.x-s.x,p.y-s.y)<Math.max(22,q.u*.9)};
/* 1. add: tip to tail */
function drawAdd(){const s=P.a,q=plane(),sum=plus(ADD.z,s.w),hit=same(sum,ADD.goal);bg();axes(q);target(q,ADD.goal);
 arrow(q,[0,0],ADD.z,ZC0());arrow(q,ADD.z,sum,WC0(),1);arrow(q,[0,0],s.w,WC0());arrow(q,[0,0],sum,RC0());dot(q,ADD.z,ZC0(),'z');dot(q,s.w,WC0(),'w',{big:1,ring:1,dy:22});dot(q,sum,RC0(),'z + w');
 chip(`(${fmt(...ADD.z)}) + (${fmt(...s.w)}) = ${fmt(...sum)}`,A.W/2,A.H*.05,{ok:hit});chip(hit?'Real parts add, imaginary parts add':`Target z + w = ${fmt(...ADD.goal)}: drag w`,A.W/2,A.H*.95,{n:12,ok:hit})}
/* 2. subtract: from w to z */
function drawSub(){const s=P.b,q=plane(),dif=minus(SUB.z,s.w),hit=same(dif,SUB.goal);bg();axes(q);target(q,SUB.goal);
 arrow(q,[0,0],SUB.z,ZC0());arrow(q,[0,0],s.w,WC0());arrow(q,s.w,SUB.z,RC0(),1);arrow(q,[0,0],dif,RC0());dot(q,SUB.z,ZC0(),'z');dot(q,s.w,WC0(),'w',{big:1,ring:1,dy:22});dot(q,dif,RC0(),'z − w');
 chip(`(${fmt(...SUB.z)}) − (${fmt(...s.w)}) = ${fmt(...dif)}`,A.W/2,A.H*.05,{ok:hit});chip(hit?'z − w is the arrow from w to z, moved to O':`Target z − w = ${fmt(...SUB.goal)}: drag w`,A.W/2,A.H*.95,{n:12,ok:hit})}
/* 3. multiply by i */
function drawRot(){const s=P.c,q=plane(),g=A.ctx,cur=s.v;bg();axes(q);target(q,ROT.goal);
 s.trail.forEach((v,j)=>{if(j)arrow(q,s.trail[j-1],v,A.col.dark?'#a78bfa':'#6d28d9',1)});
 const th=s.ang,p0=ROT.z,r=[p0[0]*Math.cos(th)-p0[1]*Math.sin(th),p0[0]*Math.sin(th)+p0[1]*Math.cos(th)];
 if(s.n){A.ctx.globalAlpha=.45;dot(q,ROT.z,ZC0(),'');A.ctx.globalAlpha=1}
 dot(q,s.anim?r:cur,ZC0(),s.anim?'':(s.n?'i'+(['','','²','³','⁴'][s.n]||'^'+s.n):'')+'z',{big:1,dy:30});arrow(q,[0,0],r,ZC0());
 const hit=same(cur,ROT.goal);chip(`${'i × '.repeat(s.n)}(${fmt(...ROT.z)}) = ${fmt(...cur)}`,A.W/2,A.H*.05,{ok:hit,n:12});
 chip(hit?'Two quarter turns: i² = −1 flips z through O':`Tap the plane or × i. Target: ${fmt(...ROT.goal)}`,A.W/2,A.H*.95,{n:12,ok:hit})}
/* 4. the four-cell grid */
function foilR(){const top=A.H*.2,cw=Math.min(150,(A.W-30)/2.6),ch=Math.min(A.H*.16,70),x0=(A.W-(cw*2+cw*.6))/2+cw*.6;return Array.from({length:4},(_,k)=>({k,x:x0+(k%2)*cw,y:top+Math.floor(k/2)*ch,w:cw,h:ch}))}
const optR=()=>{const n=3,gap=8,w=Math.min(150,(A.W-gap*4)/3);const x0=(A.W-(w*n+gap*(n-1)))/2;return Array.from({length:n},(_,j)=>({j,x:x0+j*(w+gap),y:A.H*.7,w,h:Math.min(A.H*.16,64)}))};
function drawFoil(){const s=P.d,g=A.ctx,cells=foilR();bg();
 chip(`(${fmt(...FOIL.a)})(${fmt(...FOIL.b)})`,A.W/2,A.H*.06,{n:15,ok:s.done});
 const c0=cells[0],cw=c0.w,ch=c0.h;g.font=`800 ${fs(14)}${FNT}`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=A.col.tx;
 ['4','−i'].forEach((t,j)=>g.fillText(t,c0.x+j*cw+cw/2,c0.y-14));['2','3i'].forEach((t,j)=>g.fillText(t,c0.x-cw*.3,c0.y+j*ch+ch/2));
 cells.forEach(r=>{const got=s.fill[r.k];g.fillStyle=got!=null?'#ecfdf5':r.k===s.at&&!s.done?'#fef9c3':'#ffffff';g.fillRect(r.x,r.y,r.w,r.h);g.strokeStyle=r.k===s.at&&s.at<4?'#7c3aed':GRID;g.lineWidth=r.k===s.at?3:1.5;g.strokeRect(r.x,r.y,r.w,r.h);
  g.fillStyle=TXT;g.font=`800 ${fs(got!=null?17:12)}${FNT}`;g.fillText(got!=null?(r.k===3&&s.swap?'+3':FOIL.cells[r.k].opts[0][0]):FOIL.cells[r.k].q,r.x+r.w/2,r.y+r.h/2)});
 const yy=cells[3].y+ch+18;
 if(s.at<4){chip(`Cell ${s.at+1} of 4: ${FOIL.cells[s.at].q} = ?`,A.W/2,yy,{n:12});optR().forEach(r=>{const o=FOIL.cells[s.at].opts[s.ord[r.j]];g.fillStyle='#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=s.bad===s.ord[r.j]?ERR:GRID;g.lineWidth=s.bad===s.ord[r.j]?3:1.5;g.stroke();g.fillStyle=TXT;g.font=`800 ${fs(17)}${FNT}`;g.fillText(o[0],r.x+r.w/2,r.y+r.h/2)});return}
 if(!s.swap){chip('Now use i² = −1 on −3i²: tap the cell',A.W/2,yy,{n:12,no:s.bad==='wait'});return}
 if(!s.done){chip('8 − 2i + 12i + 3. Collect the terms:',A.W/2,yy,{n:12});optR().forEach(r=>{const o=FOIL.final[s.fo[r.j]];g.fillStyle='#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=s.bad===s.fo[r.j]?ERR:GRID;g.lineWidth=s.bad===s.fo[r.j]?3:1.5;g.stroke();g.fillStyle=TXT;g.font=`800 ${fs(16)}${FNT}`;g.fillText(o[0],r.x+r.w/2,r.y+r.h/2)});return}
 chip('= 8 + 3 + (−2 + 12)i = 11 + 10i',A.W/2,yy,{ok:1,n:13})}
function pickCell(j){const s=P.d;if(s.at>=4)return;const o=FOIL.cells[s.at].opts[s.ord[j]];
 if(o[1]!=='ok'){s.bad=s.ord[j];A.sound.miss();return say(o[1]==='add'?`Each cell is a product, not a sum: ${FOIL.cells[s.at].q} is ${FOIL.cells[s.at].opts[0][0]}.`:o[1]==='sign'?'Watch the sign: a positive times a negative is negative.':'Keep the i: a real number times an imaginary number is still imaginary, and i × i is i².')}
 s.fill[s.at]=1;s.at++;s.bad=null;A.sound.pop();say(s.at<4?`Cell ${s.at} done. Next: ${FOIL.cells[s.at].q}.`:'All four products: 8, −2i, 12i and −3i². Now deal with i².')}
function useI2(){const s=P.d;if(s.at<4||s.swap)return;s.swap=1;A.sound.pop();say('−3i² = −3 × (−1) = +3. The i² term is real.')}
function pickFinal(j){const s=P.d;if(!s.swap||s.done)return;const o=FOIL.final[s.fo[j]];
 if(o[1]!=='ok'){s.bad=s.fo[j];A.sound.miss();return say(o[1]==='plus1'?'5 + 10i treats i² as +1, giving 8 − 3. But i² = −1, so −3i² = +3 and 8 + 3 = 11.':'8 − 3i multiplies real by real and imaginary by imaginary only (ac + bdi), dropping the cross terms −2i and 12i.')}
 s.done=1;s.bad=null;A.sound.pop();say('(2 + 3i)(4 − i) = 11 + 10i. Four products, then i² = −1, then collect real and imaginary parts.')}
/* 5. multiply on the plane */
function drawMul(){const s=P.e,q=plane(),pr=times(MUL.z,s.w),hit=same(pr,MUL.goal);bg();axes(q);target(q,MUL.goal);
 arrow(q,[0,0],MUL.z,ZC0());arrow(q,[0,0],s.w,WC0());arrow(q,[0,0],pr,RC0());dot(q,MUL.z,ZC0(),'z');dot(q,s.w,WC0(),'w',{big:1,ring:1,dy:22});dot(q,pr,RC0(),'zw');
 chip(`|z||w| = ${(mod(MUL.z)*mod(s.w)).toFixed(2)} = |zw|,  ${deg(MUL.z)}° + ${deg(s.w)}° = arg zw${Math.abs(deg(MUL.z)+deg(s.w))>180?' − 360°':''}`,A.W/2,A.H*.05,{n:11,ok:hit});
 chip(hit?`(1 + i)(${fmt(...s.w)}) = ${fmt(...pr)}`:`zw = ${fmt(...pr)}. Target ${fmt(...MUL.goal)}: drag w`,A.W/2,A.H*.95,{n:12,ok:hit})}
function draw(){const k=scene();if(k==='quiz'){bg();chip('Challenge',A.W/2,A.H*.2,{ok:1,n:15});chip('i² = −1 · add parts · multiply moduli',A.W/2,A.H*.5,{n:14});return}
 ({add:drawAdd,sub:drawSub,rot:drawRot,foil:drawFoil,mul:drawMul})[k]();A.fx.draw(A.ctx)}
function setW(key,v,goal,op,name){const s=P[key];s.w=v;s.moves++;const r=op(name==='z + w'?ADD.z:name==='z − w'?SUB.z:MUL.z,v);
 say(`w = ${fmt(...v)}, ${name} = ${fmt(...r)}`+(same(r,goal)?'. On target.':''))}
const SC={a:[ADD.goal,plus,'z + w'],b:[SUB.goal,minus,'z − w'],e:[MUL.goal,times,'zw']};
const keyOf=()=>({add:'a',sub:'b',mul:'e'})[scene()];
function nudge(dx,dy){const k=keyOf();if(!k)return;const s=P[k],v=[Math.max(-R,Math.min(R,s.w[0]+dx)),Math.max(-R,Math.min(R,s.w[1]+dy))];setW(k,v,...SC[k])}
function turn(){const s=P.c;if(s.anim)return;s.anim=1;const nx=times(s.v,[0,1]),a0=s.ang;A.sound.pop();
 const fin=()=>{s.anim=0;s.v=nx;s.n++;s.trail.push(nx);s.ang=a0+Math.PI/2;say(`× i: ${fmt(...s.trail[s.trail.length-2])} becomes ${fmt(...nx)}. A quarter turn anticlockwise about O, same distance from O.`+(same(nx,ROT.goal)?' Two turns make −z, because i² = −1.':''))};
 if(A.reduced()){fin();return}A.tween(s,{ang:a0+Math.PI/2},450,'io',fin)}
function down(p){const k=scene();
 if(k==='add'||k==='sub'||k==='mul'){const q=plane(),key=keyOf();if(near(q,p,P[key].w)||(p.y>q.y0&&p.y<q.y0+q.side)){P.drag=1;move(p);return true}return false}
 if(k==='rot'){const q=plane();if(p.y>q.y0&&p.y<q.y0+q.side)turn();return false}
 if(k==='foil'){const s=P.d;if(s.at<4||(s.swap&&!s.done)){const r=optR().find(r=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h);if(r)return s.at<4?pickCell(r.j):pickFinal(r.j),false}
  if(s.at>=4&&!s.swap){const c3=foilR()[3];if(p.x>=c3.x&&p.x<=c3.x+c3.w&&p.y>=c3.y&&p.y<=c3.y+c3.h)useI2();else{s.bad='wait';say('Tap the −3i² cell to replace i² with −1.')}}return false}return false}
function move(p){if(!P.drag)return;const key=keyOf();if(!key)return;const v=toZ(plane(),p);if(!same(v,P[key].w))setW(key,v,...SC[key]);else A.redraw()}
function lift(){P.drag=0;A.redraw()}
function reset(){era++;for(const k in P)delete P[k];Object.assign(P,{a:{w:ADD.start.slice(),moves:0},b:{w:SUB.start.slice(),moves:0},c:{v:ROT.z.slice(),n:0,ang:0,anim:0,trail:[ROT.z.slice()]},
 d:{at:0,fill:[null,null,null,null],ord:[1,0,2],fo:[2,1,0],swap:0,done:0,bad:null},e:{w:MUL.start.slice(),moves:0},drag:0,hook:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();pads();P.hook()}
const when=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function setup(i,desc,ok,msg){reset();say(desc);P.hook=when(i,ok,msg)}
function run(i,acts,ms){steps[i].go();const e0=era;acts.forEach((f,j)=>setTimeout(()=>{if(e0===era)f()},ms*(j+1)))}
function path(from,to){const out=[];let [x,y]=from;while(x!==to[0]){x+=Math.sign(to[0]-x);out.push([Math.sign(to[0]-from[0]),0])}while(y!==to[1]){y+=Math.sign(to[1]-y);out.push([0,Math.sign(to[1]-from[1])])}return out.map(([dx,dy])=>()=>nudge(dx,dy))}
function pads(){if(!keys)return;keys.innerHTML='';const k=scene(),Bn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},keys,t).onclick=f};
 if(keyOf()){Bn('Re −1',()=>nudge(-1,0),'Move w left: real part minus 1');Bn('Re +1',()=>nudge(1,0),'Move w right: real part plus 1');Bn('Im −1',()=>nudge(0,-1),'Move w down: imaginary part minus 1');Bn('Im +1',()=>nudge(0,1),'Move w up: imaginary part plus 1')}
 if(k==='rot')Bn('× i',turn,'Multiply by i');
 if(k==='foil'){const s=P.d;if(s.at<4)s.ord.forEach((q,j)=>Bn(FOIL.cells[s.at].opts[q][0],()=>pickCell(j),`${FOIL.cells[s.at].q} equals ${FOIL.cells[s.at].opts[q][0]}`));else if(!s.swap)Bn('Use i² = −1',useI2);else if(!s.done)s.fo.forEach((q,j)=>Bn(FOIL.final[q][0],()=>pickFinal(j)))}}
const steps=[
{h:'Add: tip to tail',p:'z = 2 + i is fixed. Drag w (or use the buttons) until z + w lands on the target 5 + 3i. Watch w’s arrow start where z’s ends.',
 predict:{q:'(2 + i) + w = 5 + 3i. What must w be?',opts:['3 + 2i','7 + 4i'],ans:0},task:'Make z + w = 5 + 3i',
 show:()=>run(0,path(ADD.start,[3,2]),450),
 go:()=>setup(0,'Argand diagram. z = 2 + i in blue. w = 1 − i in orange. z + w = 3 in green.',()=>same(plus(ADD.z,P.a.w),ADD.goal),'w = 3 + 2i: real parts add (2 + 3 = 5), imaginary parts add (1 + 2 = 3). On the diagram, that is w’s arrow placed on the tip of z.')},
{h:'Subtract: from w to z',p:'z = 4 + 3i. Drag w until z − w = 1 − 2i. The dashed arrow from w to z is z − w.',
 predict:{q:'(4 + 3i) − (1 − 2i) = ?',opts:['3 + i','3 + 5i'],ans:1},task:'Make z − w = 1 − 2i',
 show:()=>run(1,path(SUB.start,[3,5]),380),
 go:()=>setup(1,'z = 4 + 3i in blue, w = 0 in orange, z − w = 4 + 3i in green.',()=>same(minus(SUB.z,P.b.w),SUB.goal),'w = 3 + 5i, because 4 − 3 = 1 and 3 − 5 = −2. The minus applies to both parts of w.')},
{h:'Multiply by i',p:'Tap the plane or press × i. Each time z is multiplied by i. Reach the target −3 − i.',
 task:'Multiply by i until you reach −3 − i',show:()=>run(2,[()=>turn(),()=>turn()],700),
 go:()=>setup(2,'z = 3 + i. Target −3 − i.',()=>same(P.c.v,ROT.goal),'i(3 + i) = 3i + i² = −1 + 3i, then i(−1 + 3i) = −i + 3i² = −3 − i. Each × i is a 90° turn about O; two turns make −z.')},
{h:'Multiply out the brackets',p:'Fill the grid for (2 + 3i)(4 − i): each cell is one product. Then replace i² with −1 and collect.',
 task:'Finish (2 + 3i)(4 − i)',show:()=>run(3,[()=>pickCell(1),()=>pickCell(1),()=>pickCell(1),()=>pickCell(1),()=>useI2(),()=>pickFinal(2)],420),
 go:()=>setup(3,'A 2 by 2 grid: rows 2 and 3i, columns 4 and −i.',()=>P.d.done,'Four products, then i² = −1 turns −3i² into +3, then collect: 11 + 10i.')},
{h:'Multiply on the plane',p:'z = 1 + i. Drag w until zw = 4i. Watch |zw| and arg zw in the top line.',
 predict:{q:'When you multiply z by w, the moduli…',opts:['add: |zw| = |z| + |w|','multiply: |zw| = |z| × |w|'],ans:1},task:'Make zw = 4i',
 show:()=>run(4,path(MUL.start,[2,2]),550),
 go:()=>setup(4,'z = 1 + i in blue, w = 1 in orange, zw = 1 + i in green. Target 4i.',()=>same(times(MUL.z,P.e.w),MUL.goal),'w = 2 + 2i: |z||w| = √2 × 2√2 = 4 and 45° + 45° = 90°, so zw = 4i. Moduli multiply, arguments add.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>P.hook()});
function why(t){let m='Work it through: real parts, imaginary parts, and i² = −1.';
 if(t==='sign')m='Sign slip: add each part with its own sign, 2 + (−5) = −3.';
 if(t==='keepi')m='Simplify: i² is −1, so it must not be left in the answer.';
 if(t==='minus')m='The minus applies to both parts: −(2 − 3i) = −2 + 3i.';
 if(t==='plus1')m='That treats i² as +1. Use i² = −1.';
 if(t==='cross')m='You dropped the cross terms. A product of two brackets has four terms.';
 if(t==='modadd')m='Moduli multiply, not add: |zw| = |z| × |w|.';
 return m}
function ask(){qq++;const Q=QS[qq%QS.length],all=[[Q.a,'ok'],...Q.o],r=qq%3,ord=all.slice(r).concat(all.slice(0,r));
 qbox.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qbox.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>grade(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function grade(t,a){qbox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qbox.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Right: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Right.':why(t))}
FK.shell(c,{steps,ratio:.66,tall:1.12,draw,onStep:S=>{qbox.hidden=S.step!==5;keys.hidden=S.step===5;pads()},
 init:S=>{A=S;const w=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Complex number controls'},w);qbox=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up:lift});pads()}}).start()})})();
