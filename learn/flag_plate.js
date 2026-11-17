/* Flagship: tectonic plates (ages 9–11). Tap Earth's layers, turn a year dial to see how far plates creep, pull two
   plates apart, push plates together, strain a fault until it jolts, fit South America to Africa, sort five places by
   boundary, then a challenge. Text and data are in plate_art.js. */
(()=>{
const {STEPP,DONE,LAYERS,YEARS,GAP,PLACES,KINDS,SEAM,AFRICA,SAMER,FOSSIL,QZ,WHY}=PLART;
VIS.reg('flagplate',c=>{let A,X,ctl,chal,qi=-1,run=0,drag=null;const S={};
const C=()=>{const k=A.col;return{dark:k.dark,tx:k.tx,mu:k.mu,pn:k.pn,ink:'#111827',ok:'#166534',okBg:'#dcfce7',no:'#9f1239',hint:k.dark?'#312e81':'#ede9fe',
 sea:k.dark?'#1e3a8a':'#bfdbfe',ocean:'#334155',land:'#a16207',landTop:'#65a30d',mantle:'#ea580c',magma:'#dc2626',rock:'#78716c',grab:'#7c3aed'}};
const u=n=>Math.round(n*(A.narrow?1:1.15));
const kind=()=>['layers','speed','apart','together','slide','jigsaw','detect','chal'][A.step];
const announce=m=>{c.say(m);A.cv.setAttribute('aria-label',m)};
function T(s,x,y,n,col,w,al){X.font=`${w||700} ${u(n)}px system-ui,sans-serif`;X.fillStyle=col||C().tx;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y,A.W-12)}
function wrap(s,w,n){X.font=`700 ${u(n)}px system-ui,sans-serif`;const out=[];let cur='';for(const wd of String(s).split(' ')){const t=cur?cur+' '+wd:wd;if(cur&&X.measureText(t).width>w){out.push(cur);cur=wd}else cur=t}out.push(cur);return out}
function box(x,y,w,h,fill,stroke,r){A.paint.rrect(x,y,w,h,r||9);X.fillStyle=fill;X.fill();if(stroke){X.lineWidth=2;X.strokeStyle=stroke;X.stroke()}}
function head(s){const k=C(),L=wrap(s,A.W-40,13),lh=u(13)+4,h=L.length*lh+12;box(10,8,A.W-20,h,k.hint,null);L.forEach((r,i)=>T(r,A.W/2,8+6+lh*(i+.5),13,k.dark?'#f8fafc':k.ink));return 8+h}
function note(){if(!S.msg)return;const k=C(),L=wrap((S.bad?'✗ ':'✓ ')+S.msg,A.W-44,12),lh=u(12)+4,h=L.length*lh+10,y=A.H-h-8;box(10,y,A.W-20,h,'#ffffff',S.bad?k.no:k.ok);L.forEach((r,i)=>T(r,A.W/2,y+5+lh*(i+.5),12,S.bad?k.no:k.ink))}
const miss=m=>{S.bad=true;S.msg=m;A.sound.miss();announce(m);A.redraw()};
const good=m=>{S.bad=false;S.msg=m;A.sound.pop();announce(m);A.redraw();S.check()};
function poly(pts,dx,dy,fill,stroke){X.beginPath();pts.forEach(([x,y],i)=>i?X.lineTo(x+dx,y+dy):X.moveTo(x+dx,y+dy));X.closePath();X.fillStyle=fill;X.fill();X.lineWidth=2;X.strokeStyle=stroke;X.stroke()}
/* layers: a cross-section; the crust is drawn thicker than true scale so it can be tapped */
const ring=d=>d>1.08?-1:d>.88?0:d>.55?1:d>.19?2:3;
function drawLayers(t){const k=C(),cx=A.W/2,cy=t+(A.H-t)*.47,R=Math.min(A.W*.36,(A.H-t)*.4);S.geo={cx,cy,R};
 [[1,LAYERS[0][2]],[.88,LAYERS[1][2]],[.55,LAYERS[2][2]],[.19,LAYERS[3][2]]].forEach(([r,f],i)=>{X.beginPath();X.arc(cx,cy,R*r,0,7);X.fillStyle=f;X.fill();if(S.sel===i){X.lineWidth=4;X.strokeStyle=k.grab;X.stroke()}});
 X.strokeStyle=k.ink;X.lineWidth=2;for(let i=0;i<7;i++){const a=i*.9+.3;X.beginPath();X.moveTo(cx+Math.cos(a)*R*.88,cy+Math.sin(a)*R*.88);X.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R);X.stroke()}
 LAYERS.forEach(([n],i)=>{if(!S.found.has(i))return;const y=[cy-R*.94,cy-R*.72,cy-R*.37,cy][i];T(n,cx,y,12,k.ink,800)});
 T('crust drawn thicker than real',cx,cy+R+u(12),10,k.mu,600)}
function tapLayer(i){if(i<0)return;S.sel=i;const [n,,,d]=LAYERS[i],want=S.want[S.found.size<2?(S.found.has(0)?1:0):0];
 if(S.found.has(0)&&S.found.has(1)){S.found.add(i);good(`That is the ${n}: ${d}.`);return}
 if(i!==want){S.found.add(i);S.bad=true;S.msg=`That is the ${n}: ${d}. Now find the ${LAYERS[want][0]}.`;A.sound.miss();announce(S.msg);A.redraw();return}
 S.found.add(i);good(`Yes, the ${n}: ${d}.`+(i===0?' Now tap the mantle under it.':''))}
/* speed: the gap after a number of years at 2.5 cm a year */
function drawSpeed(t){const k=C(),y=t+(A.H-t)*.28,h=u(46),g=[6,20,56,A.W*.42][S.yi],mid=A.W/2;
 box(14,y,mid-g/2-14,h,k.land,k.ink,4);box(mid+g/2,y,A.W-14-mid-g/2,h,k.land,k.ink,4);X.fillStyle=k.rock;X.fillRect(mid-g/2,y+4,g,h-8);
 T('← plate',mid-g/2-u(40),y+h/2,12,'#ffffff',800);T('plate →',mid+g/2+u(40),y+h/2,12,'#ffffff',800);
 T(YEARS[S.yi].toLocaleString('en-GB')+(S.yi?' years':' year'),mid,y+h+u(18),15,k.tx,900);T(GAP[S.yi],mid,y+h+u(38),12,k.tx,700);
 const ty=y+h+u(70),x0=u(40),x1=A.W-u(40);S.track={x0,x1,ty};X.strokeStyle=k.mu;X.lineWidth=4;X.beginPath();X.moveTo(x0,ty);X.lineTo(x1,ty);X.stroke();
 YEARS.forEach((v,i)=>{const x=x0+(x1-x0)*i/3;X.beginPath();X.arc(x,ty,i===S.yi?u(14):u(6),0,7);X.fillStyle=i===S.yi?k.grab:k.mu;X.fill();T(['1','100','10 000','1 million'][i],x,ty+u(22),11,k.tx,700)});}
function setYears(i){S.yi=Math.max(0,Math.min(3,i));A.sound.tick();const m=`${YEARS[S.yi].toLocaleString('en-GB')} years at 2.5 cm a year: the gap is ${GAP[S.yi]}.`;
 if(S.yi===3)good(m+' Slow, but over millions of years oceans open.');else{S.bad=false;S.msg=m;announce(m);A.redraw()}}
/* a side view: surface line, plates as slabs over orange mantle */
function mantle(t){const k=C();X.fillStyle=k.mantle;X.fillRect(0,t+(A.H-t)*.5,A.W,A.H);T('mantle: solid rock that flows slowly',A.W/2,A.H-u(56),11,'#111827',700)}
function drawApart(t){const k=C(),y=t+(A.H-t)*.34,h=(A.H-t)*.16,g=S.gap,mid=A.W/2;X.fillStyle=k.sea;X.fillRect(0,t+4,A.W,y-t-4);mantle(t);
 X.fillStyle=k.magma;X.fillRect(mid-g/2,y,g,(A.H-t)*.2);const stripes=Math.floor(g/u(10));for(let i=0;i<stripes;i++){const w=u(5);X.fillStyle=i%2?'#57534e':'#a8a29e';X.fillRect(mid-g/2+i*u(10)/2,y,w,h);X.fillRect(mid+g/2-(i+1)*u(10)/2,y,w,h)}
 box(0,y,mid-g/2,h,k.ocean,k.ink,2);box(mid+g/2,y,A.W-mid-g/2,h,k.ocean,k.ink,2);
 if(g>u(30)){X.fillStyle='#57534e';X.beginPath();X.moveTo(mid-g/2,y);X.lineTo(mid,y-u(16));X.lineTo(mid+g/2,y);X.fill();T('new sea floor',mid,y-u(28),12,k.dark?'#f8fafc':k.ink,800)}
 T('⇦ grab',mid-g/2-u(36),y+h/2,12,'#ffffff',800);T('grab ⇨',mid+g/2+u(36),y+h/2,12,'#ffffff',800)}
function setGap(v){S.gap=Math.max(0,Math.min(A.W*.36,v));const share=S.gap/(A.W*.36);
 if(share>.75&&!S.made){S.made=1;good('Hot rock rises into the crack, cools and becomes new sea floor. No empty hole opens.')}else{announce(`The plates are ${Math.round(share*100)}% pulled apart. ${share>.2?'Magma rises into the gap.':''}`);A.redraw()}}
function drawTogether(t){const k=C(),y=t+(A.H-t)*.34,h=(A.H-t)*.14,bx=A.W*.55;X.fillStyle=k.sea;X.fillRect(0,t+4,A.W,y-t-4);mantle(t);
 if(S.phase===0){const p=S.p,len=A.W*.34*p,ang=.5;X.save();X.translate(bx,y);X.rotate(ang);box(-4,0,len+4,h*.8,k.ocean,k.ink,2);X.restore();if(p>.3)T('sinking',bx+A.W*.2,y+h+u(40),11,'#111827',800);
  box(0,y,bx,h*.8,k.ocean,k.ink,2);T('ocean plate (thin, heavy)',bx/2,y+h*.4,11,'#ffffff',800);
  box(bx,y-u(18),A.W-bx,h*.5+u(18),k.land,k.ink,2);X.fillStyle=k.landTop;X.fillRect(bx,y-u(18),A.W-bx,u(6));T('continent plate',bx+(A.W-bx)/2,y+h*.1,11,'#ffffff',800);
  if(p>.15){X.fillStyle=k.ink;X.fillRect(bx-u(10),y-u(2),u(14),u(6));T('trench',bx-u(4),y-u(30),11,k.dark?'#f8fafc':k.ink,800)}
  if(p>.6){const vx=bx+A.W*.18,vy=y-u(18);X.fillStyle='#57534e';X.beginPath();X.moveTo(vx-u(26),vy);X.lineTo(vx,vy-u(34)*p);X.lineTo(vx+u(26),vy);X.fill();X.fillStyle=k.magma;X.beginPath();X.arc(vx,vy-u(34)*p,u(6),0,7);X.fill();T('volcano',vx,vy-u(50),11,k.dark?'#f8fafc':k.ink,800)}}
 else{const q=S.q,mid=A.W/2,sh=A.W*.08*q;box(0,y-u(18),mid-sh*0,h+u(18),k.land,k.ink,2);box(mid,y-u(18),A.W-mid,h+u(18),'#92400e',k.ink,2);
  X.fillStyle='#57534e';X.beginPath();X.moveTo(mid-A.W*.2,y-u(18));X.lineTo(mid-A.W*.07,y-u(18)-(A.H-t)*.14*q);X.lineTo(mid,y-u(18)-(A.H-t)*.19*q);X.lineTo(mid+A.W*.09,y-u(18)-(A.H-t)*.13*q);X.lineTo(mid+A.W*.2,y-u(18));X.fill();
  T('India',mid/2,y+h*.5,12,'#ffffff',800);T('Asia',mid+(A.W-mid)/2,y+h*.5,12,'#ffffff',800);if(q>.5)T('Himalayas',mid+A.W*.24,y-u(30)-(A.H-t)*.1*q,12,k.dark?'#f8fafc':k.ink,800)}
 T(S.phase?'⇨ push India':'⇨ push the ocean plate',A.W*.22,y+h+u(26),12,'#111827',800)}
function push(v){if(S.phase===0){S.p=Math.max(0,Math.min(1,S.p+v));if(S.p>=1){S.phase=1;S.q=0;good('The heavier ocean plate sinks under the continent: a deep trench, then melting rock feeds volcanoes. Now push India into Asia.');return}announce(`Ocean plate ${Math.round(S.p*100)}% pushed under.`)}
 else{S.q=Math.max(0,Math.min(1,S.q+v));if(S.q>=1&&!S.made){S.made=1;good('Neither continent sinks, so the land crumples upward. That is how the Himalayas rose, and they still grow a few millimetres a year.');return}announce(`India is ${Math.round(S.q*100)}% pushed into Asia. The land crumples up.`)}A.redraw()}
/* sliding: the plates stick, strain builds, then a jolt shifts the road */
function drawSlide(t){const k=C(),mid=A.W/2,top=t+u(8),bot=A.H-u(70),ry=top+(bot-top)*.55,j=S.shake?Math.sin(S.shake*40)*u(5):0;
 X.fillStyle=k.landTop;X.fillRect(0,top,A.W,bot-top);X.strokeStyle=k.ink;X.lineWidth=3;X.setLineDash([8,6]);X.beginPath();X.moveTo(mid,top);X.lineTo(mid,bot);X.stroke();X.setLineDash([]);
 const off=S.off,d=S.s*u(18),road=()=>{X.beginPath();X.moveTo(0,ry+off-d+j);X.lineTo(mid-u(70),ry+off-d+j);X.quadraticCurveTo(mid-u(10),ry+off-d+j,mid,ry+off+j);X.moveTo(mid,ry);X.lineTo(A.W,ry);X.stroke()};
 X.strokeStyle='#374151';X.lineWidth=u(14);road();X.strokeStyle='#fde047';X.lineWidth=2;X.setLineDash([10,8]);road();X.setLineDash([]);
 T('⇧ drag this plate',mid/2,top+u(16),12,'#111827',800);T('fault',mid,top+u(16),11,'#111827',800);T('this plate stays',mid+mid/2,top+u(16),12,'#111827',800);
 const mw=A.W*.5,mx=A.W*.25,my=bot+u(14);box(mx,my,mw,u(14),'#e5e7eb',k.ink,6);box(mx,my,mw*S.s,u(14),k.no,null,6);T(`strain ${Math.round(S.s*100)}%   jolts: ${S.n}`,A.W/2,my+u(30),12,k.tx,800)}
function strain(v){if(S.shake)return;S.s=Math.min(1,S.s+v);if(S.s>=1){S.s=0;S.n++;S.off-=u(18);S.shake=1;A.sound.whoosh();A.tween(S,{shake:0},A.reduced()?1:700,'out');
  if(S.n>=2)good('Stuck, strain, jolt, again: each sudden slip is an earthquake. Plates sliding past move in jerks, not smoothly.');else{S.bad=false;S.msg='Jolt! The plates slipped at once and the ground shook: an earthquake. Keep pushing.';announce(S.msg)}}
 else announce(`The plates are stuck. Strain ${Math.round(S.s*100)}%. The road bends but the fault has not slipped yet.`);A.redraw()}
/* jigsaw: both shapes share one coast, so they fit only when South America is back against Africa */
function pts(list,t){const h=A.H-t-u(64),w=A.W;return list.map(([x,y])=>[x*w,t+u(6)+y*h])}
function drawJig(t){const k=C();X.fillStyle=k.sea;X.fillRect(0,t+2,A.W,A.H-t-u(58));const seam=pts(SEAM,t);
 poly(seam.concat(pts(AFRICA,t).reverse()),0,0,k.land,k.ink);poly(seam.concat(pts(SAMER,t)),S.dx,S.dy,'#15803d',k.ink);
 pts(FOSSIL,t).forEach(([x,y])=>{T('🦎',x+u(12),y,12);T('🦎',x-u(12)+S.dx,y+S.dy,12)});
 T('Africa',A.W*.68,t+(A.H-t)*.4,13,'#ffffff',900);T('South America',Math.max(u(52),A.W*.27+S.dx),t+(A.H-t)*.5+S.dy,12,'#ffffff',900);T('🦎 Mesosaurus fossils · shapes simplified',A.W/2,A.H-u(46),11,k.tx,700)}
function fit(){if(Math.hypot(S.dx,S.dy)<u(20)){S.dx=0;S.dy=0;if(!S.made){S.made=1;good('The coasts fit and the Mesosaurus fossils line up. These lands were joined about 200 million years ago, in Pangaea.')}}
 else{announce(`South America is ${Math.round(Math.hypot(S.dx,S.dy))} pixels from Africa. The coasts do not touch yet.`)}A.redraw()}
/* detect: sort real places by the kind of boundary */
function drawDetect(t){const k=C(),pl=PLACES[S.pi]||PLACES[PLACES.length-1],y=t+u(6),L=wrap(pl[0]+': '+pl[1],A.W-50,13),lh=u(13)+4;box(16,y,A.W-32,L.length*lh+14,'#fef9c3',k.ink);L.forEach((r,i)=>T(r,A.W/2,y+7+lh*(i+.5),13,'#111827'));
 const zy=y+L.length*lh+u(28),zh=A.H-zy-u(64),zw=(A.W-40)/3;S.zones={zy,zh,zw};
 KINDS.forEach((n,i)=>{const x=14+i*(zw+6);box(x,zy,zw,zh,i===S.pick?k.okBg:'#f1f5f9',k.ink);T(['⇦ ⇨','⇨ ⇦','⇧ ⇩'][i],x+zw/2,zy+zh*.4,18,'#111827',900);wrap(n,zw-8,11).forEach((r,j)=>T(r,x+zw/2,zy+zh*.7+j*u(14),11,'#111827',800))});
 T(`sorted ${S.pi} of ${PLACES.length}`,A.W/2,A.H-u(48),11,k.tx,700)}
function sortAs(i){if(S.pi>=PLACES.length)return;const [n,,a]=PLACES[S.pi];S.pick=i;
 if(i!==a){let m=`${n} is not ${KINDS[i].toLowerCase()}.`;
  if(i===0)m=`Not pulling apart: nothing new is being made at ${n}. Read the clue again: are the plates meeting or grinding sideways?`;
  if(i===1)m=`Not pushing together: at ${n} there is no crumpling or sinking plate. Look for a crack that widens or rocks sliding sideways.`;
  if(i===2)m=`Not sliding past: at ${n} the plates move towards or away from each other, not side by side.`;miss(m);return}
 S.pi++;S.pick=null;A.sound.tick();if(S.pi>=PLACES.length){good('All five sorted. Notice that every one is on a plate edge: that is where earthquakes and volcanoes cluster.');return}
 S.bad=false;S.msg=`${n}: ${KINDS[a].toLowerCase()}. Next place.`;announce(S.msg+' '+PLACES[S.pi][0]+': '+PLACES[S.pi][1]);A.redraw()}
function draw(a){X=a.ctx;const k=C(),kd=kind();X.fillStyle=k.pn;X.fillRect(0,0,A.W,A.H);if(kd==='chal'){T('Tectonic plates',A.W/2,A.H*.35,18,k.tx,900);T('apart · together · sliding past',A.W/2,A.H*.52,13,k.mu,700);A.fx.draw(X);return}
 const t=head(S.head||'');({layers:drawLayers,speed:drawSpeed,apart:drawApart,together:drawTogether,slide:drawSlide,jigsaw:drawJig,detect:drawDetect})[kd](t+u(6));note();A.fx.draw(X)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{msg:'',bad:false,check:()=>{},found:new Set(),want:[0,1],sel:-1,yi:0,gap:0,phase:0,p:0,q:0,s:0,n:0,off:0,shake:0,dx:0,dy:0,pi:0,pick:null,made:0},o||{})}
function auto(i,acts){const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run&&A.step===i)f()},A.reduced()?30*(j+1):(j+1)*260))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';const kd=kind();if(kd==='chal')return;const btn=(t,f)=>{c.el('button',{type:'button',class:'lbtn'},ctl,t).onclick=f};
 if(kd==='layers')LAYERS.forEach(([n],i)=>btn('Tap the '+n,()=>tapLayer(i)));
 if(kd==='speed'){btn('Fewer years',()=>setYears(S.yi-1));btn('More years',()=>setYears(S.yi+1))}
 if(kd==='apart'){btn('Pull the plates apart',()=>setGap(S.gap+A.W*.09));btn('Push them back',()=>setGap(S.gap-A.W*.09))}
 if(kd==='together')btn('Push the plate',()=>push(.25));
 if(kd==='slide')btn('Push the plate',()=>strain(.34));
 if(kd==='jigsaw')btn('Move South America closer',()=>{S.dx*=.5;S.dy*=.5;if(Math.hypot(S.dx,S.dy)<u(30)){S.dx=0;S.dy=0}fit()});
 if(kd==='detect')KINDS.forEach((n,i)=>btn(n,()=>sortAs(i)))}
function down(p){const kd=kind();if(kd==='chal')return false;
 if(kd==='layers'){const g=S.geo;tapLayer(ring(Math.hypot(p.x-g.cx,p.y-g.cy)/g.R));return true}
 if(kd==='speed'){const tr=S.track;if(Math.abs(p.y-tr.ty)<u(36)){drag={k:'yr'};move(p)}return true}
 if(kd==='apart'){drag={k:'gap',x:p.x,g:S.gap,side:p.x<A.W/2?-1:1};return true}
 if(kd==='together'||kd==='slide'){drag={k:kd,x:p.x,y:p.y};return true}
 if(kd==='jigsaw'){if(p.x<A.W*.52+S.dx){drag={k:'jig',x:p.x-S.dx,y:p.y-S.dy}}return true}
 if(kd==='detect'){const z=S.zones;if(z&&p.y>z.zy&&p.y<z.zy+z.zh)sortAs(Math.max(0,Math.min(2,Math.floor((p.x-14)/(z.zw+6)))));return true}return true}
function move(p){if(!drag)return;const d=drag;
 if(d.k==='yr'){const tr=S.track,i=Math.round((p.x-tr.x0)/(tr.x1-tr.x0)*3);if(i!==S.yi&&i>=0&&i<=3)setYears(i)}
 if(d.k==='gap')setGap(d.g+(p.x-d.x)*2*d.side);
 if(d.k==='together'){const v=(p.x-d.x)/(A.W*.6);if(v>.02){d.x=p.x;push(v)}}
 if(d.k==='slide'){const v=(d.y-p.y)/(A.H*.5);if(v>.02){d.y=p.y;strain(v)}}
 if(d.k==='jig'){S.dx=Math.min(0,p.x-d.x);S.dy=p.y-d.y;A.redraw()}}
function up(){if(drag&&drag.k==='jig')fit();drag=null}
const steps=[
{h:'Earth\u2019s cracked shell',p:STEPP[0],
 predict:{q:'What is right under the plates?',opts:['a sea of runny lava','hot solid rock that flows very slowly','empty space'],ans:1},
 task:'Tap the crust, then the mantle',show:()=>auto(0,[()=>tapLayer(0),()=>tapLayer(1)]),
 go:()=>{reset({head:'Tap the crust, then the mantle under it'});announce('A cut-away Earth with four layers: crust, mantle, outer core and inner core. Tap the crust.');controls();S.check=finish(0,()=>S.found.has(0)&&S.found.has(1),DONE[0])}},
{h:'How fast do plates move?',p:STEPP[1],
 predict:{q:'How fast do plates move?',opts:['about as fast as a car','about as fast as your fingernails grow','they never move'],ans:1},
 task:'Drag the dot to 1 million years',show:()=>auto(1,[()=>setYears(1),()=>setYears(2),()=>setYears(3)]),
 go:()=>{reset({head:'Drag the dot along the years line'});announce('Two plates with a 2.5 cm gap after 1 year. Drag the years dot.');controls();S.check=finish(1,()=>S.yi===3,DONE[1])}},
{h:'Pulling apart',p:STEPP[2],
 task:'Drag the plates apart',show:()=>auto(2,[()=>setGap(A.W*.12),()=>setGap(A.W*.24),()=>setGap(A.W*.36)]),
 go:()=>{reset({head:'Grab a plate and drag it away from the middle'});announce('Two ocean plates side by side over the mantle. Drag them apart.');controls();S.check=finish(2,()=>S.made,DONE[2])}},
{h:'Pushing together',p:STEPP[3],
 predict:{q:'An ocean plate meets a continent plate. Which goes under?',opts:['the continent plate','the ocean plate','neither: they bounce apart'],ans:1},
 task:'Push both pairs together',show:()=>auto(3,[()=>push(.5),()=>push(.5),()=>push(.5),()=>push(.5)]),
 go:()=>{reset({head:'Drag right to push the plates together'});announce('An ocean plate on the left meets a continent plate on the right. Push it.');controls();S.check=finish(3,()=>S.made,DONE[3])}},
{h:'Sliding past',p:STEPP[4],
 predict:{q:'How do plates that slide past each other move?',opts:['smoothly, a little each day','they stick, then jolt suddenly','they pull apart'],ans:1},
 task:'Push until the fault jolts twice',show:()=>auto(4,[()=>strain(.5),()=>strain(.5),()=>strain(.5),()=>strain(.5),()=>strain(.5),()=>strain(.5)]),
 go:()=>{reset({head:'Drag the left plate upwards, along the fault'});announce('A road crosses a fault. The left plate can be pushed up along it. Strain 0%.');controls();S.check=finish(4,()=>S.n>=2,DONE[4])}},
{h:'The jigsaw clue',p:STEPP[5],
 task:'Fit South America against Africa',show:()=>auto(5,[()=>{S.dx/=2;S.dy/=2;fit()},()=>{S.dx=0;S.dy=0;fit()}]),
 go:()=>{reset({head:'Drag South America across the Atlantic',dx:-A.W*.12,dy:u(22)});announce('South America sits left of Africa with the Atlantic between. Drag it to Africa.');controls();S.check=finish(5,()=>S.made,DONE[5])}},
{h:'Boundary detective',p:STEPP[6],
 task:'Sort all five places',show:()=>auto(6,PLACES.map(pl=>()=>sortAs(pl[2]))),
 go:()=>{reset({head:'Tap the kind of boundary for this place'});announce('Place 1: '+PLACES[0][0]+'. '+PLACES[0][1]);controls();S.check=finish(6,()=>S.pi>=PLACES.length,DONE[6])}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
function next(){qi++;const[q,ops]=QZ[qi%QZ.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});announce('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+(WHY[t]||'Look back at the lab step for this one.'))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.12,draw,onStep:A=>{chal.hidden=A.step!==7;ctl.hidden=A.step===7;controls()},
 init:A=>{X=A.ctx;const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Plate controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:p=>move(p),up:()=>up()});controls()}});
A.start()})})();
