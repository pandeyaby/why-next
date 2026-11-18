/* Flagship: mass vs weight (ages 11–12; NC England KS3 physics, motion and forces: weight = mass × gravitational field
   strength, g = 10 N/kg on Earth and different on other planets and stars; NGSS MS-PS2-4 gravitational interactions
   depend on mass). Hang masses on a newtonmeter and plot weight against mass, take one bag to the Moon, Mars and
   Jupiter with a balance beside the newtonmeter, calculate W = m × g, work back from a reading to the mass, and sort
   statements into mass or weight. Every drag also has a button. */
(()=>{
const WORLD={earth:['Earth',10],moon:['Moon',1.6],mars:['Mars',3.7],jup:['Jupiter',25]};
const BLOCKS=[0.5,1,2,4];
const CALC=[[5,'earth','a 5 kg bag of potatoes'],[60,'moon','a 60 kg astronaut'],[2,'jup','a 2 kg rock']];
const BACK=[[37,'mars'],[80,'moon'],[250,'jup']];
const CARDS=[['60 kg',0],['600 N',1],['Measured with a newtonmeter',1],['Measured with a balance',0],['The same on the Moon',0],['A force',1],['The amount of matter',0],['Bigger on Jupiter',1]];
const nf=v=>(Math.round(v*100)/100).toString();
VIS.reg('flagmvw',c=>{let A,Z,pad,chal,qi=-1,streak=0;const S={then:()=>{}};
const INK='#0f172a',SOFT='#475569',RIM='#94a3b8',CARD='#ffffff',OK='#047857',NO='#b91c1c',GOLD='#b45309',BLUE='#1d4ed8',VIO='#6d28d9',PALE='#ede9fe',HOT='#dcfce7',METAL='#cbd5e1';
const MODE=['hang','worlds','calc','back','sort','chal'],mode=()=>MODE[A.step];
const q=n=>Math.round(n*(A.narrow?1:1.12)),fo=(n,w)=>`${w||700} ${q(n)}px system-ui,sans-serif`;
const within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function put(s,x,y,n,col,al,w){Z.font=fo(n,w);Z.fillStyle=col||INK;Z.textAlign=al||'center';Z.textBaseline='middle';Z.fillText(String(s),x,y,A.W-16)}
function fold(s,max,n){Z.font=fo(n);const out=[];let cur='';for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(cur&&Z.measureText(t).width>max){out.push(cur);cur=w}else cur=t}out.push(cur);return out}
function plate(r,fill,edge,lw){Z.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,10);Z.fill();if(edge){Z.strokeStyle=edge;Z.lineWidth=lw||2;Z.stroke()}}
function plateText(r,s,n,col){const L=fold(s,r.w-14,n),lh=q(n)+4;L.forEach((l,i)=>put(l,r.x+r.w/2,r.y+r.h/2+(i-(L.length-1)/2)*lh,n,col||INK,'center',700))}
function title(s,done){const r={x:10,y:8,w:A.W-20,h:A.H*.11};plate(r,done?HOT:PALE,done?OK:VIO,2);plateText(r,s,13,done?OK:INK)}
function msgBox(){if(!S.msg)return;const L=fold((S.bad?'✗ ':'✓ ')+S.msg,A.W-40,13),lh=q(13)+5,h=L.length*lh+10,y=A.H-h-6;plate({x:10,y,w:A.W-20,h},CARD,S.bad?NO:OK,3);L.forEach((l,i)=>put(l,A.W/2,y+5+lh*(i+.5),13))}
const announce=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const nope=s=>{S.bad=true;S.msg=s;A.sound.miss();announce(s);A.redraw()};
const good=s=>{S.bad=false;S.msg=s;A.sound.pop()};
/* ---- newtonmeter ---- */
const MAXN=60;
let MTOP=0;
const meterR=()=>({x:A.W*(A.narrow?.05:.06),y:A.H*.17+MTOP,w:A.W*(A.narrow?.2:.13),h:A.H*(A.narrow?.44:.52)-MTOP});
function meter(newtons,kg){const r=meterR(),tube={x:r.x+r.w*.3,y:r.y,w:r.w*.4,h:r.h*.8};plate({x:tube.x,y:tube.y,w:tube.w,h:tube.h},'#f1f5f9',INK,2);
 for(let v=0;v<=MAXN;v+=10){const y=tube.y+8+(tube.h-16)*v/MAXN;Z.strokeStyle=INK;Z.lineWidth=1.5;Z.beginPath();Z.moveTo(tube.x,y);Z.lineTo(tube.x+tube.w*.35,y);Z.stroke();put(v,tube.x-4,y,10,SOFT,'right',700)}
 put('N',tube.x-4,tube.y-8,10,SOFT,'right',800);
 const yv=tube.y+8+(tube.h-16)*Math.min(newtons,MAXN)/MAXN;Z.strokeStyle=NO;Z.lineWidth=3;Z.beginPath();Z.moveTo(tube.x,yv);Z.lineTo(tube.x+tube.w,yv);Z.stroke();
 const hy=tube.y+tube.h+(r.h-tube.h)*.2;Z.strokeStyle=INK;Z.lineWidth=2;Z.beginPath();Z.moveTo(tube.x+tube.w/2,yv);Z.lineTo(tube.x+tube.w/2,hy);Z.stroke();Z.beginPath();Z.arc(tube.x+tube.w/2,hy+5,5,-Math.PI/2,Math.PI*1.2);Z.stroke();
 if(kg!=null){const b={x:tube.x+tube.w/2-r.w*.32,y:hy+12,w:r.w*.64,h:Math.max(q(26),r.h*.12)};plate(b,'#64748b',INK,2);put(`${nf(kg)} kg`,b.x+b.w/2,b.y+b.h/2,11,'#ffffff','center',800)}
 put(`${nf(newtons)} N`,r.x+r.w/2,r.y+r.h+q(26),15,NO,'center',800)}
const hookR=()=>{const r=meterR();return{x:r.x-6,y:r.y+r.h*.6,w:r.w+12,h:r.h*.5}};
/* step 1: hang masses */
const shelf=i=>{const x0=A.W*(A.narrow?.3:.24),w=(A.W-x0-12)/4;return{x:x0+i*w+4,y:A.H*.17,w:w-8,h:q(36)}};
const graphR=()=>{const x0=A.W*(A.narrow?.36:.28);return{x:x0,y:A.H*.3,w:A.W-x0-20,h:A.H*(A.narrow?.36:.44)}};
function graph(pts,showLine){const g=graphR();Z.strokeStyle=INK;Z.lineWidth=2;Z.beginPath();Z.moveTo(g.x,g.y);Z.lineTo(g.x,g.y+g.h);Z.lineTo(g.x+g.w,g.y+g.h);Z.stroke();
 const X=m=>g.x+m/4*g.w,Y=w=>g.y+g.h-w/40*g.h;for(let m=0;m<=4;m++){put(m,X(m),g.y+g.h+q(10),10,SOFT)}for(let w=0;w<=40;w+=10)put(w,g.x-4,Y(w),10,SOFT,'right');
 put('mass (kg)',g.x+g.w/2,g.y+g.h+q(24),11,SOFT);put('weight (N)',g.x+4,g.y-q(8),11,SOFT,'left');
 if(showLine){Z.strokeStyle=BLUE;Z.setLineDash([5,4]);Z.lineWidth=2;Z.beginPath();Z.moveTo(X(0),Y(0));Z.lineTo(X(4),Y(40));Z.stroke();Z.setLineDash([]);put('10 N per kg',X(2.6),Y(30),12,BLUE,'center',800)}
 pts.forEach(m=>{Z.fillStyle=OK;Z.beginPath();Z.arc(X(m),Y(m*10),5,0,7);Z.fill()})}
function drawHang(){const done=S.hung.length>=3;title(done?'Each kilogram weighs 10 N on Earth: W = m × 10.':'Drag a mass to the hook, or tap it. Read the weight in newtons.',done);
 BLOCKS.forEach((m,i)=>{const b0=shelf(i),b=S.drag&&S.drag.i===i?{...b0,x:S.drag.x-b0.w/2,y:S.drag.y-b0.h/2}:b0,used=S.hung.includes(m);plate(b,used?'#e2e8f0':'#64748b',INK,2);put(`${nf(m)} kg`,b.x+b.w/2,b.y+b.h/2,12,used?INK:'#ffffff','center',800)});
 meter(S.on!=null?S.on*10:0,S.on);graph(S.hung,done)}
function hang(m){S.on=m;A.sound.tick();if(S.hung.includes(m)){good(`${nf(m)} kg reads ${nf(m*10)} N again. Try a mass you have not hung.`);return refresh()}S.hung.push(m);
 const n=S.hung.length;good(n<3?`${nf(m)} kg pulls the spring to ${nf(m*10)} N.`:`${S.hung.map(x=>`${nf(x)} kg → ${nf(x*10)} N`).join(', ')}. The points make a straight line through 0.`);refresh()}
/* step 2: other worlds */
const tileR=i=>{const w=(A.W-20-3*6)/4;return{x:10+i*(w+6),y:A.H*.15,w,h:q(30)}};
const KEYS=['earth','moon','mars','jup'];
const balR=()=>{const x0=A.W*(A.narrow?.32:.3);return{x:x0,y:A.H*.32,w:A.W-x0-14,h:A.H*.3}};
const STD=[1,2,3];
function balance(std){const r=balR(),cx=r.x+r.w/2,py=r.y+r.h*.35,tip=std===2?0:std<2?.18:-.18,arm=r.w*.38;Z.strokeStyle=INK;Z.lineWidth=3;
 Z.beginPath();Z.moveTo(cx,py);Z.lineTo(cx,r.y+r.h*.95);Z.stroke();Z.beginPath();Z.moveTo(cx-r.w*.18,r.y+r.h*.95);Z.lineTo(cx+r.w*.18,r.y+r.h*.95);Z.stroke();
 const lx=cx-arm*Math.cos(tip),ly=py+arm*Math.sin(tip),rx=cx+arm*Math.cos(tip),ry=py-arm*Math.sin(tip);Z.beginPath();Z.moveTo(lx,ly);Z.lineTo(rx,ry);Z.stroke();
 [[lx,ly,'bag 2 kg','#64748b'],[rx,ry,`${std} kg`,GOLD]].forEach(([x,y,t,col])=>{Z.strokeStyle=INK;Z.lineWidth=1.5;Z.beginPath();Z.moveTo(x,y);Z.lineTo(x,y+q(16));Z.stroke();Z.beginPath();Z.moveTo(x-r.w*.16,y+q(16));Z.lineTo(x+r.w*.16,y+q(16));Z.stroke();const b={x:x-r.w*.13,y:y+q(16)-q(22),w:r.w*.26,h:q(20)};plate(b,col,INK,1.5);put(t,x,b.y+b.h/2,10,'#ffffff','center',800)});
 put(std===2?'Level: mass 2 kg':std<2?'Bag side down: needs more':'Bag side up: too much',cx,r.y+r.h+q(14),12,std===2?OK:NO,'center',800)}
function drawWorlds(){const done=['moon','mars','jup'].every(k=>S.seen.has(k)),g=WORLD[S.world][1];title(done?'Mass stayed 2 kg everywhere. Weight changed with g.':`On ${WORLD[S.world][0]}, g = ${g} N/kg. Visit the Moon, Mars and Jupiter.`,done);
 KEYS.forEach((k,i)=>{const t=tileR(i);plate(t,S.world===k?HOT:CARD,S.world===k?OK:RIM,S.world===k?3:2);put(WORLD[k][0],t.x+t.w/2,t.y+t.h/2,A.narrow?11:13,INK,'center',800)});
 MTOP=Math.max(0,tileR(0).y+tileR(0).h+q(18)-A.H*.17);meter(2*g,2);MTOP=0;balance(S.std);const r=balR();put(`Weight = 2 kg × ${g} N/kg = ${nf(2*g)} N`,r.x+r.w/2,r.y-q(12),12,INK,'center',800)}
function visit(k){S.world=k;S.std=2;S.seen.add(k);A.sound.whoosh();const g=WORLD[k][1];good(`${WORLD[k][0]}: the newtonmeter reads ${nf(2*g)} N, but the balance still levels with 2 kg. ${k==='earth'?'':g<10?'Weaker gravity, smaller weight.':'Stronger gravity, bigger weight.'}`);refresh()}
function setStd(m){S.std=m;A.sound.tick();if(m===2){good(`Level again. Gravity pulls both pans by the same factor on ${WORLD[S.world][0]}, so a balance always shows the bag is 2 kg.`);return refresh()}
 nope(`The balance tips: ${m} kg is ${m<2?'less':'more'} than the bag's 2 kg. Even on ${WORLD[S.world][0]} the balance needs 2 kg, because gravity pulls both sides the same way.`);refresh()}
/* steps 3 and 4: calculate */
const optR=j=>{const h=q(42),g=8;return{x:20,y:A.H*.5+j*(h+g),w:A.W-40,h}};
function calcOpts(){const C=CALC[S.i];if(!C)return[];const [m,k]=C,g=WORLD[k][1],o=[[`${nf(m*g)} N`,'ok'],[`${nf(m+g)} N`,'add'],[`${nf(m*g)} kg`,'unit']],r=S.i%3;return o.slice(r).concat(o.slice(0,r))}
function backOpts(){const B=BACK[S.i];if(!B)return[];const [w,k]=B,g=WORLD[k][1],o=[[`${nf(w/g)} kg`,'ok'],[`${nf(w*g)} kg`,'times'],[`${nf(w)} kg`,'same']],r=S.i%3;return o.slice(r).concat(o.slice(0,r))}
function drawCalc(back){const C=back?BACK[S.i]:CALC[S.i],L=back?BACK:CALC;title(C?(back?'The newtonmeter gives the weight. Work back to the mass: m = W ÷ g.':'Use W = m × g. Pick the weight, with its unit.'):(back?'Mass = weight ÷ g, and it is the same on every world.':'Weight in newtons = mass in kg × g in N/kg.'),!C);
 const box={x:A.W*.08,y:A.H*.16,w:A.W*.84,h:A.H*.27};plate(box,'#fffbeb',GOLD,3);
 if(C){const k=C[1],g=WORLD[k][1];plateText({x:box.x,y:box.y,w:box.w,h:box.h*.6},back?`On ${WORLD[k][0]} (g = ${g} N/kg) a newtonmeter reads ${C[0]} N.`:`${C[2][0].toUpperCase()+C[2].slice(1)} on ${WORLD[k][0]} (g = ${g} N/kg).`,15);
  put(back?'mass = ?':'weight = ?',box.x+box.w/2,box.y+box.h*.8,15,VIO,'center',800);(back?backOpts():calcOpts()).forEach(([t,tag],j)=>{const b=optR(j);plate(b,CARD,S.miss===tag?NO:RIM,S.miss===tag?3.5:2);put(t,b.x+b.w/2,b.y+b.h/2,16,INK,'center',800)})}
 else plateText(box,L.map(x=>back?`${x[0]} N ÷ ${WORLD[x[1]][1]} = ${nf(x[0]/WORLD[x[1]][1])} kg`:`${x[0]} kg × ${WORLD[x[1]][1]} = ${nf(x[0]*WORLD[x[1]][1])} N`).join('   '),14,OK)}
function calcPick(tag){const C=CALC[S.i];if(!C)return;const [m,k]=C,g=WORLD[k][1],w=nf(m*g);
 if(tag==='ok'){S.i++;S.miss=null;good(`Yes: ${m} kg × ${g} N/kg = ${w} N.`);return refresh()}S.miss=tag;
 if(tag==='add')return nope(`You added. Weight is mass times g: ${m} × ${g} = ${w} N, not ${m} + ${g}.`);
 nope(`The number is right but the unit is not. Weight is a force, so it is in newtons: ${w} N. Kilograms are for mass.`)}
function backPick(tag){const B=BACK[S.i];if(!B)return;const [w,k]=B,g=WORLD[k][1],m=nf(w/g);
 if(tag==='ok'){S.i++;S.miss=null;good(`Yes: ${w} N ÷ ${g} N/kg = ${m} kg. On Earth it would weigh ${nf(w/g*10)} N, but its mass is still ${m} kg.`);return refresh()}S.miss=tag;
 if(tag==='times')return nope(`You multiplied by g again. To go from weight back to mass, divide: ${w} ÷ ${g} = ${m} kg.`);
 nope(`A reading in newtons is a weight, not a mass. Divide by g: ${w} ÷ ${g} = ${m} kg.`)}
/* step 5: sort */
const binR=j=>{const g=10,w=(A.W-20-g)/2;return{x:10+j*(w+g),y:A.H*.46,w,h:A.H*.3}};
const sCard=()=>({x:A.W*.15,y:A.H*.17,w:A.W*.7,h:A.H*.18});
const BIN=['Mass','Weight'];
function drawSort(){const v=CARDS[S.i];title(v?'Is this about mass or weight? Drag the card to a box, or tap a box.':'Mass: kg, same everywhere. Weight: N, a force.',!v);
 [0,1].forEach(j=>{const b=binR(j);plate(b,S.drag&&within(S.drag,b)?HOT:CARD,S.miss===j?NO:RIM,S.miss===j?3.5:2);put(BIN[j],b.x+b.w/2,b.y+q(16),15,INK,'center',800);
  const n=S.sorted.filter(s=>s===j).length;put(j===0?'kg, balance':'N, newtonmeter',b.x+b.w/2,b.y+q(36),11,SOFT,'center',600);if(n)put(n===1?'1 card':n+' cards',b.x+b.w/2,b.y+b.h-q(14),12,SOFT,'center',600)});
 if(v){const r0=sCard(),r=S.drag&&S.drag.card?{...r0,x:S.drag.x-r0.w/2,y:S.drag.y-r0.h/2}:r0;plate(r,'#fffbeb',GOLD,3);plateText(r,v[0],16)}}
const WHY=['60 kg is in kilograms, the unit of mass.','600 N is in newtons, the unit of force, so it is a weight.','A newtonmeter measures a force: the pull of gravity.','A balance compares masses; it gives the same answer on any world.','Mass is the same everywhere; only weight changes with g.','Weight is the force of gravity on a mass.','Mass is how much matter, or stuff, is in an object.','Jupiter has a bigger g, so the same mass weighs more.'];
function sortPick(j){const v=CARDS[S.i];if(!v)return;if(j===v[1]){S.sorted.push(j);S.i++;S.miss=null;good(WHY[S.i-1]);return refresh()}S.miss=j;nope(`Not ${BIN[j].toLowerCase()}. ${WHY[S.i]}`)}
/* ---- pointer ---- */
function down(p){const m=mode();
 if(m==='hang'){const i=BLOCKS.findIndex((_,i)=>within(p,shelf(i)));if(i>=0){S.drag={i,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}return false}
 if(m==='worlds'){const i=KEYS.findIndex((_,i)=>within(p,tileR(i)));if(i>=0){visit(KEYS[i]);return true}return false}
 if(m==='calc'||m==='back'){const o=m==='calc'?calcOpts():backOpts();if(!o.length)return false;const j=[0,1,2].find(j=>within(p,optR(j)));if(j!=null){(m==='calc'?calcPick:backPick)(o[j][1]);return true}return false}
 if(m==='sort'){if(!CARDS[S.i])return false;if(within(p,sCard())){S.drag={card:1,x:p.x,y:p.y};return true}const j=[0,1].find(j=>within(p,binR(j)));if(j!=null){sortPick(j);return true}}return false}
function move(p){if(S.drag){S.drag={...S.drag,x:p.x,y:p.y};A.redraw()}}
function up(p){if(!S.drag)return;const d=S.drag,at=p||d;S.drag=null;
 if(mode()==='hang'){const tap=Math.hypot(at.x-d.x0,at.y-d.y0)<8;if(tap||within(at,hookR())||within(at,meterR()))return hang(BLOCKS[d.i]);return nope('Drop the mass on the hook under the newtonmeter.')}
 if(mode()==='sort'){const j=[0,1].find(j=>within(at,binR(j)));if(j!=null)return sortPick(j)}A.redraw()}
function draw(){Z.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);Z.fillRect(0,0,A.W,A.H);if(A.col.dark){Z.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);Z.fill()}
 const m=mode();if(m==='hang')drawHang();if(m==='worlds')drawWorlds();if(m==='calc')drawCalc(false);if(m==='back')drawCalc(true);if(m==='sort')drawSort();
 if(m==='chal'){title('Mass in kg stays the same. Weight in N = mass × g.');meter(20,2);graph([0.5,1,2,4],true)}
 msgBox();A.fx.draw(Z)}
function refresh(){const m=mode();let s='Challenge.';
 if(m==='hang')s=`Newtonmeter reads ${S.on!=null?nf(S.on*10):0} N${S.on!=null?` with ${nf(S.on)} kg on the hook`:''}. Plotted: ${S.hung.map(x=>`${nf(x)} kg ${nf(x*10)} N`).join(', ')||'none'}.`;
 if(m==='worlds'){const g=WORLD[S.world][1];s=`${WORLD[S.world][0]}, g = ${g} N/kg. 2 kg bag reads ${nf(2*g)} N. Balance with ${S.std} kg: ${S.std===2?'level':'tipped'}. Visited: ${[...S.seen].map(k=>WORLD[k][0]).join(', ')}.`}
 if(m==='calc'){const C=CALC[S.i];s=C?`${C[2]} on ${WORLD[C[1]][0]}, g = ${WORLD[C[1]][1]} N/kg. Weight? Options ${calcOpts().map(o=>o[0]).join(', ')}.`:'All three weights found.'}
 if(m==='back'){const B=BACK[S.i];s=B?`Reading ${B[0]} N on ${WORLD[B[1]][0]}, g = ${WORLD[B[1]][1]} N/kg. Mass? Options ${backOpts().map(o=>o[0]).join(', ')}.`:'All three masses found.'}
 if(m==='sort'){const v=CARDS[S.i];s=v?`Card: ${v[0]}. Mass or weight? Sorted ${S.sorted.length} of ${CARDS.length}.`:'All eight cards sorted.'}
 announce((S.msg?S.msg+' ':'')+s);btns();S.then()}
function btns(){if(!pad)return;pad.innerHTML='';const m=mode(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t).onclick=f};
 if(m==='hang')BLOCKS.forEach(x=>b(`Hang ${nf(x)} kg`,()=>hang(x),`Hang ${nf(x)} kilograms on the newtonmeter`));
 if(m==='worlds'){KEYS.forEach(k=>b(WORLD[k][0],()=>visit(k),`Go to ${WORLD[k][0]}`));STD.forEach(x=>b(`Balance with ${x} kg`,()=>setStd(x),`Put ${x} kilograms on the other pan`))}
 if(m==='calc'&&CALC[S.i])calcOpts().forEach(([t,tag])=>b(t,()=>calcPick(tag),`Weight ${t}`));
 if(m==='back'&&BACK[S.i])backOpts().forEach(([t,tag])=>b(t,()=>backPick(tag),`Mass ${t}`));
 if(m==='sort'&&CARDS[S.i])BIN.forEach((t,j)=>b(t,()=>sortPick(j),`${CARDS[S.i][0]}: ${t}`));
 A.redraw()}
const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const play=(fs,gap)=>{const id=++S.run;fs.forEach((f,j)=>setTimeout(()=>{if(id===S.run)f()},(j+1)*(A.reduced()?30:gap)))};
const wipe=()=>{S.run=(S.run||0)+1;Object.assign(S,{then:()=>{},i:0,hung:[],on:null,world:'earth',std:2,seen:new Set(['earth']),drag:null,miss:null,sorted:[],msg:'',bad:false})};
const steps=[
{h:'Hang it on a newtonmeter',p:'A newtonmeter is a spring that measures force in newtons (N). Hang masses on it here on Earth and plot weight against mass.',
predict:{q:'A 2 kg bag hangs on a newtonmeter on Earth. What does it read?',opts:['20 N','2 N','2 kg'],ans:0},
task:'Hang 3 masses',show:()=>{steps[0].go();play([()=>hang(0.5),()=>hang(1),()=>hang(2)],450)},go:()=>{wipe();refresh();S.then=finish(0,()=>S.hung.length>=3,'On Earth, g = 10 N/kg.')}},
{h:'Other worlds',p:'Take the same 2 kg bag to other worlds. The newtonmeter measures weight; the balance compares the bag with standard masses.',
predict:{q:'Take the 2 kg bag to the Moon. What happens to its mass?',opts:['It stays 2 kg','It drops to about 0.3 kg','It becomes 0 kg'],ans:0},
task:'Visit the Moon, Mars and Jupiter',show:()=>{steps[1].go();play([()=>visit('moon'),()=>visit('mars'),()=>visit('jup')],600)},go:()=>{wipe();refresh();S.then=finish(1,()=>['moon','mars','jup'].every(k=>S.seen.has(k)),'Weight depends on g. Mass does not.')}},
{h:'Work out the weight',p:'Weight (N) = mass (kg) × gravitational field strength g (N/kg). Multiply, and give the answer in newtons.',
task:'Find 3 weights',show:()=>{steps[2].go();play(CALC.map(()=>()=>calcPick('ok')),450)},go:()=>{wipe();refresh();S.then=finish(2,()=>S.i>=CALC.length,'W = m × g, in newtons.')}},
{h:'Work back to the mass',p:'If you know the weight and g, divide to find the mass: m = W ÷ g. The mass is the same on every world.',
predict:{q:'An astronaut weighs 800 N on Earth. What is her mass?',opts:['80 kg','800 kg','8,000 kg'],ans:0},
task:'Find 3 masses',show:()=>{steps[3].go();play(BACK.map(()=>()=>backPick('ok')),450)},go:()=>{wipe();refresh();S.then=finish(3,()=>S.i>=BACK.length,'m = W ÷ g.')}},
{h:'Mass or weight?',p:'People mix the two words up. Sort each card.',
task:'Sort 8 cards',show:()=>{steps[4].go();play(CARDS.map(v=>()=>sortPick(v[1])),350)},go:()=>{wipe();refresh();S.then=finish(4,()=>S.i>=CARDS.length,'Kilograms for mass, newtons for weight.')}},
{h:'Challenge',p:'',go:()=>{wipe();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.then()});
const Q=[['What is the weight of a 3 kg bag on Earth (g = 10 N/kg)?','30 N',[['3 N','nog'],['30 kg','unit']]],
['A 70 kg astronaut goes to the Moon. What is her mass there?','70 kg',[['11.2 kg','massdrop'],['0 kg','zero']]],
['What does a newtonmeter measure?','Weight, a force in N',[['Mass in kg','meter'],['How much matter','matter']]],
['On Mars g = 3.7 N/kg. What does a 10 kg box weigh there?','37 N',[['13.7 N','add'],['2.7 N','div']]],
['A rock weighs 50 N on Jupiter (g = 25 N/kg). What is its mass?','2 kg',[['1,250 kg','times'],['50 kg','same']]],
['Why does the same bag weigh less on the Moon?','The Moon has a weaker gravitational field',[['The bag has less matter','matter2'],['There is no air on the Moon','air']]]];
function why(tag){let m='Mass is in kg and stays the same; weight = mass × g, in newtons.';
 if(tag==='nog')m='3 N forgets g. Multiply by 10 N/kg: 3 × 10 = 30 N.';
 if(tag==='unit')m='Weight is a force, so it is in newtons: 30 N, not 30 kg.';
 if(tag==='massdrop')m='11.2 kg mixes up mass and weight. Her mass stays 70 kg; her weight drops to 70 × 1.6 = 112 N.';
 if(tag==='zero')m='The Moon still has gravity. Her mass stays 70 kg wherever she goes.';
 if(tag==='meter')m='A newtonmeter is a spring pulled by gravity. It measures weight, a force, in newtons.';
 if(tag==='matter')m='How much matter is mass, which a balance compares. A newtonmeter measures the pull of gravity.';
 if(tag==='add')m='You added. Weight is mass times g: 10 × 3.7 = 37 N.';
 if(tag==='div')m='You divided. Weight is mass times g: 10 × 3.7 = 37 N.';
 if(tag==='times')m='To go from weight to mass, divide by g: 50 ÷ 25 = 2 kg.';
 if(tag==='same')m='50 is the weight in newtons. Divide by g to get the mass: 50 ÷ 25 = 2 kg.';
 if(tag==='matter2')m='The bag has the same matter, so the same mass. The Moon pulls on it less: g = 1.6 N/kg.';
 if(tag==='air')m='Air does not change weight much. The Moon has less mass than Earth, so its pull, g, is weaker.';
 return m}
function ask(){qi++;const [qq,ans,bad]=Q[qi%Q.length],all=[[ans,'ok']].concat(bad),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>mark(tag,ans)});announce('Challenge: '+qq);A.redraw()}
function mark(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=chal.querySelector('.fl-fb');
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+streak+'.':'✗ '+why(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.62,tall:1.25,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;btns()},
 init:B=>{A=B;Z=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Mass and weight lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
