/* Flagship: metric and imperial units (ages 9–10; NC England Y5 measurement "understand and use approximate
   equivalences between metric units and common imperial units such as inches, pounds and pints"; Y6 converting units).
   Stretch a pencil along a ruler marked in cm and inches, balance a 5 kg bag with 1 lb weights, pour pints into a
   4-litre bucket, sort conversions into × or ÷, and drag an arrow to estimate on a number line. Drag, tap or use buttons. */
(()=>{
const H={ink:'#0f172a',grey:'#334155',white:'#ffffff',ok:'#166534',okBg:'#dcfce7',err:'#9f1239',errBg:'#ffe4e6',note:'#eef2ff',edge:'#1e293b',
 wood:'#fde68a',woodInk:'#713f12',cmInk:'#1e3a8a',inInk:'#7c2d12',water:'#7dd3fc',waterInk:'#075985',metal:'#cbd5e1',brass:'#facc15',hl:'#1d4ed8'};
const M=IMPART;
VIS.reg('flagimper',c=>{let A,X,bar,ch,ix=-1,seq=0;const Z={after:()=>{}};
const f=n=>Math.round(n*(A.narrow?1:1.12));
const dp=(v,n)=>String(Math.round(v*Math.pow(10,n))/Math.pow(10,n));
function write(s,x,y,n,col,al,wt){X.font=`${wt||700} ${f(n)}px system-ui,sans-serif`;X.fillStyle=col||H.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y)}
function brk(s,w,n){X.font=`700 ${f(n)}px system-ui,sans-serif`;const o=[];let line='';String(s).split(' ').forEach(wd=>{const t=line?line+' '+wd:wd;if(line&&X.measureText(t).width>w){o.push(line);line=wd}else line=t});o.push(line);return o}
function rr(x,y,w,h,fill,stroke,lw,rad){A.paint.rrect(x,y,w,h,rad==null?10:rad);X.fillStyle=fill;X.fill();if(stroke){X.lineWidth=lw||2;X.strokeStyle=stroke;X.stroke()}}
function inside_(s,b,n,col,wt){const L=brk(s,b.w-12,n),lh=f(n)+3;L.forEach((t,i)=>write(t,b.x+b.w/2,b.y+b.h/2+(i-(L.length-1)/2)*lh,n,col,'center',wt))}
function title(s,won){const L=brk(s,A.W-40,13),lh=f(13)+4,h=Math.max(f(32),L.length*lh+12);rr(10,8,A.W-20,h,won?H.okBg:H.note,won?H.ok:H.edge,2,8);
 L.forEach((t,i)=>write(t,A.W/2,8+h/2+(i-(L.length-1)/2)*lh,13,won?H.ok:H.ink));return 8+h}
function said(){if(!Z.msg)return;const L=brk((Z.bad?'✗ ':'✓ ')+Z.msg,A.W-44,12),lh=f(12)+5,h=L.length*lh+10,y=A.H-h-8;
 rr(10,y,A.W-20,h,H.white,Z.bad?H.err:H.ok,3,8);L.forEach((t,i)=>write(t,A.W/2,y+5+lh*(i+.5),12,Z.bad?H.err:H.ink))}
const voice=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const nope=s=>{Z.bad=true;Z.msg=s;A.sound.miss();upd()};
const nice=s=>{Z.bad=false;Z.msg=s;A.sound.pop();upd()};
const at=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const stage=t=>{const y=t+f(10);return{x:14,y,w:A.W-28,h:A.H-y-f(80)}};
/* step 0: the double ruler */
function setIn(v){if(Z.won)return;Z.inch=Math.max(0,Math.min(12,Math.round(v*4)/4));const goal=M.RULER[Z.ri][0];
 if(Z.inch===goal){A.sound.tick();Z.ri++;const cm=dp(goal*2.54,1);if(Z.ri>=M.RULER.length){Z.won=true;return nice(`12 inches = ${cm} cm, about 30 cm. Every inch is about 2.5 cm, so cm numbers are about 2.5 times bigger.`)}
  Z.bad=false;Z.msg=`${goal} inches = ${cm} cm. ${goal===4?'About 10 cm: 4 × 2.5.':'20 cm ÷ 2.5 = 8 inches.'} Next: ${M.RULER[Z.ri][1].toLowerCase()}.`}upd()}
function drawRuler(t){const r=stage(t),x0=r.x+f(14),x1=r.x+r.w-f(14),px=(x1-x0)/12,mid=r.y+r.h*.5;Z.rule={x:x0-f(10),y:r.y,w:x1-x0+f(20),h:r.h,x0,px};
 rr(r.x,r.y,r.w,r.h,H.white,H.edge,2,12);rr(x0-f(6),mid-f(46),x1-x0+f(12),f(92),H.wood,H.woodInk,2,6);
 for(let cm=0;cm<=30;cm++){const x=x0+cm/2.54*px,big=cm%5===0;X.strokeStyle=H.cmInk;X.lineWidth=big?2:1;X.beginPath();X.moveTo(x,mid-f(46));X.lineTo(x,mid-f(46)+(big?f(16):f(9)));X.stroke();if(big)write(cm,x,mid-f(22),10,H.cmInk,'center',800)}
 for(let q=0;q<=48;q++){const x=x0+q/4*px,whole=q%4===0;X.strokeStyle=H.inInk;X.lineWidth=whole?2:1;X.beginPath();X.moveTo(x,mid+f(46));X.lineTo(x,mid+f(46)-(whole?f(16):f(8)));X.stroke();if(whole&&(q/4)%(A.narrow?2:1)===0)write(q/4,x,mid+f(22),10,H.inInk,'center',800)}
 write('cm',x0-f(2),mid-f(56),11,H.cmInk,'left',800);write('inches',x0-f(2),mid+f(56),11,H.inInk,'left',800);
 const xe=x0+Z.inch*px;X.fillStyle='#f59e0b';X.fillRect(x0,mid-f(6),Math.max(0,xe-x0),f(12));X.fillStyle='#78350f';X.beginPath();X.moveTo(xe,mid-f(6));X.lineTo(xe+f(12),mid);X.lineTo(xe,mid+f(6));X.fill();
 X.fillStyle=H.hl;X.beginPath();X.arc(xe,mid,f(9),0,7);X.fill();
 write(`${Z.inch} in = ${dp(Z.inch*2.54,1)} cm`,r.x+r.w/2,r.y+f(16),13,H.ink,'center',800);if(!Z.won)write(M.RULER[Z.ri][1]+': drag the blue dot',r.x+r.w/2,r.y+r.h-f(16),11,H.grey,'center',700)}
/* step 1: the balance */
function weigh(d){if(Z.won)return;Z.lb=Math.max(0,Math.min(14,Z.lb+d));A.sound.tick();const kg=Z.lb*.45359;
 if(Z.lb===11){Z.won=true;return nice('Balanced! 11 pounds ≈ 5 kg (4.99 kg). So 1 kg ≈ 2.2 pounds: 5 × 2.2 = 11.')}
 Z.bad=Z.lb>11;Z.msg=Z.lb>11?`Too heavy: ${Z.lb} lb is ${dp(kg,1)} kg. Take a weight off.`:`${Z.lb} lb = ${dp(kg,1)} kg so far. The 5 kg bag is still heavier.`;upd()}
function drawScale(t){const r=stage(t);rr(r.x,r.y,r.w,r.h,H.white,H.edge,2,12);const cx=r.x+r.w/2,py=r.y+r.h*.42,arm=r.w*.34,tilt=Math.max(-.32,Math.min(.32,(5-Z.lb*.45359)*.07));
 X.fillStyle=H.grey;X.fillRect(cx-f(4),py,f(8),r.h*.48);X.fillRect(cx-f(40),r.y+r.h*.9,f(80),f(8));
 const lx=cx-Math.cos(tilt)*arm,ly=py+Math.sin(tilt)*arm,qx=cx+Math.cos(tilt)*arm,qy=py-Math.sin(tilt)*arm;X.strokeStyle=H.edge;X.lineWidth=f(5);X.beginPath();X.moveTo(lx,ly);X.lineTo(qx,qy);X.stroke();
 const pan=(x,y)=>{X.lineWidth=1.5;X.beginPath();X.moveTo(x,y);X.lineTo(x-f(40),y+f(40));X.moveTo(x,y);X.lineTo(x+f(40),y+f(40));X.stroke();X.fillStyle=H.metal;X.fillRect(x-f(46),y+f(40),f(92),f(6))};
 pan(lx,ly);pan(qx,qy);rr(lx-f(30),ly+f(4),f(60),f(36),'#fef3c7',H.woodInk,2,8);write('5 kg',lx,ly+f(22),13,H.woodInk,'center',800);
 Z.pan={x:qx-f(52),y:qy-f(10),w:f(104),h:f(70)};for(let i=0;i<Z.lb;i++){const col=i%6,rw=Math.floor(i/6);rr(qx-f(42)+col*f(14),qy+f(30)-rw*f(13),f(13),f(11),H.brass,H.woodInk,1,3)}
 write(`${Z.lb} × 1 lb = ${dp(Z.lb*.45359,2)} kg`,qx,qy+f(60),11,H.ink,'center',800);
 Z.pile={x:r.x+f(8),y:r.y+r.h-f(50),w:f(110),h:f(42)};rr(Z.pile.x,Z.pile.y,Z.pile.w,Z.pile.h,'#fefce8',H.woodInk,1.5,8);write('1 lb weights',Z.pile.x+Z.pile.w/2,Z.pile.y+f(12),10,H.woodInk,'center',800);
 for(let i=0;i<4;i++)rr(Z.pile.x+f(12)+i*f(22),Z.pile.y+f(22),f(18),f(13),H.brass,H.woodInk,1,3);
 if(Z.drag){rr(Z.drag.x-f(9),Z.drag.y-f(7),f(18),f(13),H.brass,H.woodInk,1.5,3)}
 write(Math.abs(tilt)<.01?'Balanced':tilt>0?'5 kg side is heavier':'Pound side is heavier',cx,r.y+f(16),12,H.ink,'center',800)}
/* step 2: pints into a bucket */
function pour(){if(Z.won)return;Z.pt++;A.sound.tick();const L=Z.pt*.568;
 if(Z.pt===7){Z.won=true;return nice('7 pints = 3.98 litres: the bucket is full. 4 litres ≈ 7 pints, so 1 litre ≈ 1.75 pints.')}
 Z.bad=false;Z.msg=`${Z.pt} pint${Z.pt>1?'s':''} = ${dp(L,2)} litres. ${Z.pt===2?'2 pints is already more than 1 litre.':''}`;upd()}
function drawBucket(t){const r=stage(t);rr(r.x,r.y,r.w,r.h,H.white,H.edge,2,12);const bw=Math.min(r.w*.42,f(170)),bx=r.x+r.w*.55-bw/2,by=r.y+f(34),bh=r.h-f(70);Z.bucket={x:bx-f(10),y:by,w:bw+f(20),h:bh};
 const lvl=Math.min(1,Z.pt*.568/4);X.fillStyle=H.water;X.fillRect(bx,by+bh*(1-lvl),bw,bh*lvl);X.strokeStyle=H.edge;X.lineWidth=3;X.strokeRect(bx,by,bw,bh);
 for(let l=1;l<=4;l++){const y=by+bh*(1-l/4);X.strokeStyle=H.waterInk;X.lineWidth=1.5;X.beginPath();X.moveTo(bx,y);X.lineTo(bx+f(14),y);X.stroke();write(`${l} L`,bx+f(18),y,11,H.waterInk,'left',800)}
 write(`${Z.pt} pints = ${dp(Z.pt*.568,2)} L`,bx+bw/2,r.y+f(16),12,H.ink,'center',800);
 const gx=r.x+f(14),gw=f(44),gh=f(64),jy=r.y+f(40),gy=jy+f(90);Z.glass={x:gx-f(6),y:gy-f(6),w:gw+f(12),h:gh+f(26)};X.fillStyle=H.water;X.fillRect(gx+3,gy+gh*.12,gw-6,gh*.88);X.strokeStyle=H.edge;X.lineWidth=2;X.strokeRect(gx,gy,gw,gh);
 write('1 pint',gx+gw/2,gy+gh+f(10),11,H.ink,'center',800);write('568 ml',gx+gw/2,gy+gh+f(22),10,H.grey,'center',700);
 X.fillStyle='#e0f2fe';X.fillRect(gx,jy,gw,f(56));X.strokeRect(gx,jy,gw,f(56));X.fillStyle=H.water;X.fillRect(gx+2,jy+f(8),gw-4,f(46));write('1 L jug',gx+gw/2,jy-f(9),10,H.ink,'center',800);
 if(!Z.won)write('Tap the pint or bucket to pour',r.x+r.w/2,r.y+r.h-f(14),11,H.grey,'center',700)}
/* step 3: × or ÷ */
function file_(i,b){if(Z.won||Z.sorted[i]!=null)return;Z.sel=null;const o=M.OPS[i];
 if(o[1]!==b){const dir=o[1]%2===0?'multiply':'divide',swap=(o[1]^1)===b;return nope(swap?`Check the size: ${o[0]} should give a ${dir==='multiply'?'bigger':'smaller'} number, so ${dir}.`:`That rule is for ${b<2?'length (cm and inches)':'weight (kg and pounds)'}. ${o[0]} needs the ${o[1]<2?'2.5':'2.2'} rule.`)}
 Z.sorted[i]=b;A.sound.pop();Z.bad=false;Z.msg=o[2];if(M.OPS.every((_,j)=>Z.sorted[j]!=null)){Z.won=true;Z.msg='To a smaller unit: multiply (more of them). To a bigger unit: divide (fewer of them).'}upd()}
function drawOps(t){const y0=t+f(8),g=f(6),w=(A.W-28-g)/2,h=f(34);Z.opHit=[];let n=0;
 M.OPS.forEach((o,i)=>{if(Z.sorted[i]!=null)return;const x=14+(n%2)*(w+g),y=y0+Math.floor(n/2)*(h+g);n++;const s=Z.sel===i,b=Z.drag&&Z.drag.o===i?{x:Z.drag.x-w/2,y:Z.drag.y-h/2,w,h}:{x,y,w,h};
  rr(b.x,b.y,w,h,s?'#dbeafe':H.white,s?H.hl:H.edge,s?3:1.5,8);inside_(o[0],b,12,H.ink,800);Z.opHit.push({x,y,w,h,i})});
 const by=y0+3*(h+g)+f(8),bh=Math.min(f(70),(A.H-by-f(84))/2-g);Z.ruleHit=M.RULES.map((s,i)=>{const x=14+(i%2)*(w+g),y=by+Math.floor(i/2)*(bh+g),got=M.OPS.filter((_,j)=>Z.sorted[j]===i);
  rr(x,y,w,bh,got.length?H.okBg:H.note,got.length?H.ok:H.edge,got.length?3:1.5,10);write(s,x+w/2,y+f(16),15,got.length?H.ok:H.ink,'center',800);
  got.forEach((o,k)=>write(o[0],x+w/2,y+f(34)+k*f(14),10,H.ok,'center',700));return{x,y,w,h:bh,i}})}
/* step 4: estimate on a number line */
function aim(v){if(Z.won)return;const e=M.EST[Z.ei];Z.v=Math.max(0,Math.min(e[2],Math.round(v/e[3])*e[3]));A.redraw()}
function check(){if(Z.won)return;const e=M.EST[Z.ei],ok=Math.abs(Z.v-e[4])<=e[3]*.75;
 if(!ok)return nope(`${Z.v} ${e[1]} is too ${Z.v>e[4]?'big':'small'}. ${e[5]}`);Z.ei++;A.sound.tick();
 if(Z.ei>=M.EST.length){Z.won=true;return nice(`Yes, about ${dp(e[4],1)} ${e[1]}. Rough rules are fine for estimates: 2.5 cm, 2.2 lb, 1.75 pints.`)}
 Z.bad=false;Z.msg=`Good estimate: the exact answer is ${dp(e[4],1)} ${e[1]}. Next one.`;Z.v=0;upd()}
function drawEst(t){const r=stage(t),e=M.EST[Math.min(Z.ei,M.EST.length-1)];rr(r.x,r.y,r.w,r.h,H.white,H.edge,2,12);
 const L=brk(e[0],r.w-24,13);L.forEach((s,i)=>write(s,r.x+r.w/2,r.y+f(20)+i*f(18),13,H.ink,'center',800));
 const x0=r.x+f(22),x1=r.x+r.w-f(22),y=r.y+r.h*.6,scale=(x1-x0)/e[2];Z.line={x:x0-f(12),y:y-f(50),w:x1-x0+f(24),h:f(90),x0,scale};
 X.strokeStyle=H.edge;X.lineWidth=3;X.beginPath();X.moveTo(x0,y);X.lineTo(x1,y);X.stroke();const step=e[2]<=10?1:5;
 for(let v=0;v<=e[2];v+=step){const x=x0+v*scale;X.lineWidth=2;X.beginPath();X.moveTo(x,y-f(8));X.lineTo(x,y+f(8));X.stroke();if(!A.narrow||v%(step*2)===0||e[2]<=6)write(v,x,y+f(20),11,H.grey,'center',700)}
 const ax=x0+Z.v*scale;X.fillStyle=H.hl;X.beginPath();X.moveTo(ax,y-f(4));X.lineTo(ax-f(11),y-f(26));X.lineTo(ax+f(11),y-f(26));X.closePath();X.fill();
 write(`${Z.v} ${e[1]}`,ax,y-f(38),13,H.hl,'center',800);if(!Z.won)write(`${Z.ei+1} of 3: drag the arrow, let go to check`,r.x+r.w/2,r.y+r.h-f(14),11,H.grey,'center',700)}
/* input */
const part=()=>['ruler','scale','bucket','ops','est','quiz'][A.step];
function down(p){const k=part(),g=L=>(L||[]).find(b=>at(p,b));
 if(k==='ruler'&&at(p,Z.rule)&&!Z.won){Z.drag={r:1};setIn((p.x-Z.rule.x0)/Z.rule.px);return true}
 if(k==='scale'){if(at(p,Z.pile)&&!Z.won){Z.drag={x:p.x,y:p.y};A.redraw();return true}if(at(p,Z.pan)){weigh(1);return true}}
 if(k==='bucket'&&(at(p,Z.glass)||at(p,Z.bucket))){pour();return true}
 if(k==='ops'){const o=g(Z.opHit);if(o){Z.sel=o.i;Z.drag={o:o.i,x:p.x,y:p.y};A.sound.tick();upd();return true}const b=g(Z.ruleHit);if(b&&Z.sel!=null){file_(Z.sel,b.i);return true}}
 if(k==='est'&&at(p,Z.line)&&!Z.won){Z.drag={e:1};aim((p.x-Z.line.x0)/Z.line.scale);return true}
 return false}
function move(p){if(!Z.drag)return;const k=part();if(k==='ruler')return setIn((p.x-Z.rule.x0)/Z.rule.px);if(k==='est')return aim((p.x-Z.line.x0)/Z.line.scale);Z.drag.x=p.x;Z.drag.y=p.y;A.redraw()}
function up(p){const d=Z.drag;Z.drag=null;if(!d){A.redraw();return}const k=part();
 if(k==='scale'){if(at(p,Z.pan))weigh(1);else A.redraw()}
 if(k==='ops'){const b=(Z.ruleHit||[]).find(q=>at(p,q));if(b)file_(d.o,b.i);else A.redraw()}
 if(k==='est')check();if(k==='ruler')A.redraw()}
function draw(){X.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);X.fillRect(0,0,A.W,A.H);if(A.col.dark){X.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);X.fill()}
 const k=part();let t;
 if(k==='ruler'){t=title(Z.won?'1 inch ≈ 2.5 cm. 12 inches (1 foot) ≈ 30 cm.':'Stretch the pencil. Read it in inches and in centimetres.',Z.won);drawRuler(t)}
 if(k==='scale'){t=title(Z.won?'1 kg ≈ 2.2 pounds.':'Drag 1 lb weights onto the right pan, or tap the pan. Balance the 5 kg bag.',Z.won);drawScale(t)}
 if(k==='bucket'){t=title(Z.won?'1 litre ≈ 1.75 pints.':'How many pints fill a 4-litre bucket? Pour one pint at a time.',Z.won);drawBucket(t)}
 if(k==='ops'){t=title(Z.won?'Smaller unit: multiply. Bigger unit: divide.':'Drag each conversion to its rule. Or tap a card, then a rule.',Z.won);drawOps(t)}
 if(k==='est'){t=title(Z.won?'Rough rules give quick, sensible estimates.':'Estimate. Think: will the number get bigger or smaller?',Z.won);drawEst(t)}
 if(k==='quiz'){t=title('About 2.5 cm in an inch, 2.2 pounds in a kilogram, 1.75 pints in a litre.');drawRuler(t)}
 said();A.fx.draw(X)}
function upd(){const k=part();let d='Challenge.';
 if(k==='ruler')d=`Pencil: ${Z.inch} inches, ${dp(Z.inch*2.54,1)} centimetres.`+(Z.won?'':` Goal: ${M.RULER[Z.ri][1]}.`);
 if(k==='scale')d=`Left pan 5 kilograms. Right pan ${Z.lb} pounds, ${dp(Z.lb*.45359,2)} kilograms.`;
 if(k==='bucket')d=`Bucket: ${Z.pt} pints, ${dp(Z.pt*.568,2)} litres of 4.`;
 if(k==='ops')d='Sorted: '+(M.OPS.filter((_,i)=>Z.sorted[i]!=null).map(o=>o[0]).join('; ')||'none')+(Z.sel!=null?`. Picked: ${M.OPS[Z.sel][0]}.`:'.');
 if(k==='est'){const e=M.EST[Math.min(Z.ei,M.EST.length-1)];d=`${e[0]} Arrow at ${Z.v} ${e[1]}.`}
 voice((Z.msg?Z.msg+' ':'')+d);btns();Z.after()}
function btns(){if(!bar)return;bar.innerHTML='';const k=part(),b=(t,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},bar,t).onclick=()=>{fn();upd()}};
 if(k==='ruler'&&!Z.won){b('Longer by 1 inch',()=>setIn(Z.inch+1));b('Shorter by 1 inch',()=>setIn(Z.inch-1));b('Longer by ¼ inch',()=>setIn(Z.inch+.25));b('Shorter by ¼ inch',()=>setIn(Z.inch-.25))}
 if(k==='scale'&&!Z.won){b('Add a 1 lb weight',()=>weigh(1));b('Take a weight off',()=>weigh(-1))}
 if(k==='bucket'&&!Z.won)b('Pour in 1 pint',pour);
 if(k==='ops'&&!Z.won){if(Z.sel==null)M.OPS.forEach((o,i)=>{if(Z.sorted[i]==null)b('Pick: '+o[0],()=>{Z.sel=i;A.sound.tick()})});
  else{M.RULES.forEach((s,i)=>b(`${M.OPS[Z.sel][0]}: ${s}`,()=>file_(Z.sel,i)));b('Pick another card',()=>{Z.sel=null})}}
 if(k==='est'&&!Z.won){const e=M.EST[Z.ei];b(`Arrow up ${e[3]}`,()=>aim(Z.v+e[3]));b(`Arrow down ${e[3]}`,()=>aim(Z.v-e[3]));b('Check my estimate',check)}
 A.redraw()}
const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const demo=(fns,ms)=>{const id=++seq;fns.forEach((fn,j)=>setTimeout(()=>{if(id===seq){fn();upd()}},(j+1)*(A.reduced()?30:ms)))};
function fresh(){seq++;Object.assign(Z,{after:()=>{},won:false,msg:'',bad:false,inch:0,ri:0,drag:null,lb:0,pt:0,sorted:{},sel:null,ei:0,v:0})}
const steps=[
{h:'Inches and centimetres',p:'Centimetres are metric units. Inches are imperial units, an older system still used in the UK and USA, for example for TV screens and pizzas.',
predict:{q:'Which is longer?',opts:['1 centimetre','1 inch','They are the same'],ans:1},
task:'Stretch the pencil to all 3 lengths',show:()=>{steps[0].go();demo([()=>setIn(4),()=>setIn(8),()=>setIn(12)],650)},go:()=>{fresh();upd();Z.after=fin(0,()=>Z.won,'1 inch ≈ 2.5 cm.')}},
{h:'Kilograms and pounds',p:'Kilograms (kg) are metric. Pounds (lb) are imperial. People in the UK often give a baby’s weight in pounds.',
predict:{q:'A 1 kg bag of sugar and a 1 lb block of butter. Which is heavier?',opts:['The 1 kg bag','The 1 lb block','They weigh the same'],ans:0},
task:'Balance the 5 kg bag with 1 lb weights',show:()=>{steps[1].go();demo(Array.from({length:11},()=>()=>weigh(1)),180)},go:()=>{fresh();upd();Z.after=fin(1,()=>Z.won,'1 kg ≈ 2.2 lb.')}},
{h:'Litres and pints',p:'Litres are metric. Pints are imperial: milk in the UK is often sold in pints. A UK pint is 568 millilitres.',
predict:{q:'About how many pints fill a 4-litre bucket?',opts:['4 pints','About 7 pints','About 2 pints'],ans:1},
task:'Fill the 4-litre bucket with pints',show:()=>{steps[2].go();demo(Array.from({length:7},()=>pour),300)},go:()=>{fresh();upd();Z.after=fin(2,()=>Z.won,'1 litre ≈ 1.75 pints.')}},
{h:'Multiply or divide?',p:'To convert, multiply or divide by the rough rule. Ask: is the new unit smaller or bigger? A smaller unit needs more of them.',
task:'Sort all 6 conversions to the right rule',show:()=>{steps[3].go();demo(M.OPS.map((o,i)=>()=>file_(i,o[1])),360)},go:()=>{fresh();upd();Z.after=fin(3,()=>Z.won,'Smaller unit ×, bigger unit ÷.')}},
{h:'Sensible estimates',p:'Rough rules are good enough to estimate. Always check that the answer makes sense.',
task:'Make all 3 estimates',show:()=>{steps[4].go();demo([()=>{aim(3);check()},()=>{aim(30);check()},()=>{aim(3.5);check()}],700)},go:()=>{fresh();upd();Z.after=fin(4,()=>Z.won,'Estimate, then sense-check.')}},
{h:'Challenge',p:'',go:()=>{fresh();Z.inch=12;Z.ri=3;Z.won=true;quiz()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>Z.after()});
function quiz(){ix++;const [q,ans,wr]=M.bank[ix%M.bank.length],all=[[ans,'ok']].concat(wr),r=ix%3,ord=all.slice(r).concat(all.slice(0,r));
 ch.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const rowq=ch.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},rowq,w).onclick=()=>mark(tag,ans)});voice('Challenge: '+q);A.redraw()}
let streak=0;
function mark(tag,ans){ch.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=ch.querySelector('.fl-fb'),ok=tag==='ok';let m=M.WHYM[tag]||'Use the rough rules: 2.5 cm, 2.2 pounds, 1.75 pints.';
 if(tag==='wrongway')m='Check the size: to a bigger unit the number gets smaller, so divide; to a smaller unit it gets bigger, so multiply.';
 if(tag==='add')m='Converting is multiplying or dividing by the rule, never adding it on.';
 if(tag==='same')m='Not the same: one inch is about 2.5 centimetres long.';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+streak+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:B=>{ch.hidden=B.step!==5;bar.hidden=B.step===5;btns()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);bar=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Metric and imperial lab buttons'},w);ch=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
