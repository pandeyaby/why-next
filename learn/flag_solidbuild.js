/* Flagship – Building with 3-D shapes (ages 6–7; CCSS 1.G.A.2 compose 3-D shapes into a composite shape; NC 2013 Year 1
   and Year 2 recognise and name cubes, cuboids, cylinders and cones). Scenes: copy a plan card by stacking solids from
   the bottom up; name each part of a model with its 3-D name (the flat names circle and triangle are traps); fill dashed
   spaces with small cubes and see 2 cubes make a cuboid and 8 make a bigger cube; check a robot built from solids; free
   build. Data in learn/solidbuild_art.js. Distinct from flagsolid (faces of one solid), flagtower (balance and bridges)
   and flagcompose (flat pattern blocks): here the child composes solids into a new solid and names its parts. */
(()=>{const B=SBLD;
VIS.reg('flagsolidbuild',c=>{let A,keys,chal,qi=-1,gen=0;const S={};c.fig.classList.add('young');
const MAT='#fef9c3',MAT2='#fde68a',INK='#1f2937',RIM='#334155',YES='#15803d',NO='#b91c1c',SOFT='#ffffff';
const scene=()=>['plan','name','cubes','robot','free','chal'][A.step];
const px=n=>Math.round(A.narrow?n:n*1.15);
const within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const dark=(col,t)=>A.mix(col,'#000000',t);
function mat(){const g=A.ctx;g.fillStyle=MAT;g.fillRect(0,0,A.W,A.H);g.fillStyle=MAT2;g.fillRect(0,A.H*.72,A.W,A.H*.28)}
/* a white label with dark words; shrinks until it fits */
function tag(t,x,y,o){o=o||{};const g=A.ctx;let f=px(o.f||15);g.font=`800 ${f}px system-ui,sans-serif`;while(g.measureText(t).width+24>A.W-8&&f>10){f--;g.font=`800 ${f}px system-ui,sans-serif`}
 const w=g.measureText(t).width+24,h=f+16,l=Math.max(4,Math.min(A.W-w-4,x-w/2));g.fillStyle=SOFT;A.paint.rrect(l,y-h/2,w,h,10);g.fill();
 g.lineWidth=o.ok||o.no?3:1.5;g.strokeStyle=o.ok?YES:o.no?NO:RIM;g.stroke();g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,l+w/2,y+1)}
function box(b,o){o=o||{};const g=A.ctx;g.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':'#fffdf5';A.paint.rrect(b.x,b.y,b.w,b.h,14);g.fill();g.lineWidth=o.no||o.ok?3.5:1.5;g.strokeStyle=o.no?NO:o.ok?YES:RIM;g.stroke()}
/* --- drawing solids. (cx,by) is the middle of the bottom face; returns the middle of the top face --- */
function poly(pts,fill){const g=A.ctx;g.beginPath();pts.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.closePath();g.fillStyle=fill;g.fill();g.strokeStyle=RIM;g.lineWidth=2;g.stroke()}
function cuboidAt(cx,by,w,h,u,col){const dx=u*.3,dy=-u*.24,yb=by-dy/2,fx=cx-w/2-dx/2;
 poly([[fx,yb-h],[fx+dx,yb-h+dy],[fx+w+dx,yb-h+dy],[fx+w,yb-h]],A.mix(col,'#ffffff',.35));
 poly([[fx+w,yb-h],[fx+w+dx,yb-h+dy],[fx+w+dx,yb+dy],[fx+w,yb]],dark(col,.18));poly([[fx,yb-h],[fx+w,yb-h],[fx+w,yb],[fx,yb]],col)}
function cylAt(cx,by,r,h,col){const g=A.ctx,ry=r*.32;g.beginPath();g.moveTo(cx-r,by-h);g.lineTo(cx-r,by);g.ellipse(cx,by,r,ry,0,Math.PI,0,true);g.lineTo(cx+r,by-h);g.closePath();
 g.fillStyle=col;g.fill();g.strokeStyle=RIM;g.lineWidth=2;g.stroke();g.beginPath();g.ellipse(cx,by-h,r,ry,0,0,Math.PI*2);g.fillStyle=A.mix(col,'#ffffff',.35);g.fill();g.stroke()}
function coneAt(cx,by,r,h,col){const g=A.ctx,ry=r*.32;g.beginPath();g.moveTo(cx-r,by);g.lineTo(cx,by-h);g.lineTo(cx+r,by);g.ellipse(cx,by,r,ry,0,0,Math.PI);g.closePath();
 g.fillStyle=col;g.fill();g.strokeStyle=RIM;g.lineWidth=2;g.stroke()}
function solid(k,cx,by,u){const s=B.SH[k],w=s.w*u,h=s.h*u;
 if(k==='cyl')cylAt(cx,by,w/2,h,s.col);else if(k==='cone')coneAt(cx,by,w/2,h,s.col);else cuboidAt(cx,by,w,h,u,s.col);return by-h}
function flatAt(k,cx,cy,u){const s=B.SH[k],g=A.ctx;g.fillStyle=s.col;g.strokeStyle=RIM;g.lineWidth=2;g.beginPath();
 if(k==='circle')g.arc(cx,cy,u*.42,0,Math.PI*2);else{g.moveTo(cx-u*.45,cy+u*.36);g.lineTo(cx,cy-u*.42);g.lineTo(cx+u*.45,cy+u*.36);g.closePath()}g.fill();g.stroke()}
function icon(k,cx,cy,u){if(B.SH[k].flat)return flatAt(k,cx,cy,u);solid(k,cx,cy+B.SH[k].h*u/2,u)}
/* a stack of parts, bottom first; returns where each part sits so it can be outlined */
function stack(parts,cx,by,u){let y=by;return parts.map(k=>{const top=solid(k,cx,y,u),r={k,cx,by:y,top};y=top;return r})}
const tall=parts=>parts.reduce((a,k)=>a+B.SH[k].h,0)+.4;
/* the 4 (or 6) shape tiles along the bottom */
function tiles(list,top,rows){const n=list.length,cols=Math.ceil(n/rows),gap=8,w=(A.W-16-gap*(cols-1))/cols,h=(A.H-top-8-gap*(rows-1))/rows;
 return list.map((k,i)=>({k,i,x:8+(i%cols)*(w+gap),y:top+Math.floor(i/cols)*(h+gap),w,h}))}
function drawTiles(T,miss){const g=A.ctx;T.forEach(t=>{box(t,{no:miss===t.i});const u=Math.min(t.w*.42,(t.h-22)*.62);icon(t.k,t.x+t.w/2,t.y+(t.h-20)/2+2,u);
 g.fillStyle=INK;g.font=`800 ${px(13)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(B.SH[t.k].n,t.x+t.w/2,t.y+t.h-12)})}
const trayT=()=>tiles(B.TRAY,A.H*.75,1);
/* 1. copy the plan card */
const card=()=>({x:8,y:A.H*.13,w:A.W*.36,h:A.H*.58}),yard=()=>({x:A.W*.36+16,y:A.H*.13,w:A.W*.64-24,h:A.H*.58});
function drawPlan(){const s=S.plan;mat();if(s.i>=B.PLANS.length){tag('All 3 models built',A.W/2,A.H*.2,{ok:1});tag('Big models are made of smaller shapes',A.W/2,A.H*.42,{f:13});drawTiles(trayT());return}
 const P=B.PLANS[s.i],C=card(),Y=yard(),uC=Math.min(C.h/tall(P.parts),C.w/2.3),uY=Math.min(Y.h/tall(P.parts),Y.w/2.6);
 tag(`Model ${s.i+1} of ${B.PLANS.length}: build the ${P.name}`,A.W/2,A.H*.06,{f:14});box(C);stack(P.parts,C.x+C.w/2,C.y+C.h-uC*.3,uC);tag('plan',C.x+C.w/2,C.y+14,{f:11});
 box(Y,{ok:s.held,no:s.miss>=0});stack(s.got,Y.x+Y.w/2,Y.y+Y.h-uY*.3,uY);if(!s.got.length)tag('build here',Y.x+Y.w/2,Y.y+Y.h/2,{f:12});drawTiles(trayT(),s.miss);drag()}
function planPut(k){const s=S.plan;if(s.held||s.i>=B.PLANS.length)return;const P=B.PLANS[s.i],want=P.parts[s.got.length],j=B.TRAY.indexOf(k);
 if(s.got[s.got.length-1]==='cone'){s.miss=j;A.sound.miss();return say('Nothing can sit on the point of a cone. A cone goes on top.')}
 if(k!==want){s.miss=j;A.sound.miss();return say(k==='cone'?`Not yet. The point of a cone cannot hold the next part. Look at the plan: this part is a ${B.SH[want].n}. ${B.SH[want].spot}`:`That is a ${B.SH[k].n}. Look at the plan: this part is a ${B.SH[want].n}. ${B.SH[want].spot}`)}
 s.miss=-1;s.got.push(k);A.sound.tick();
 if(s.got.length<P.parts.length)return say(`A ${B.SH[k].n} goes on. ${P.parts.length-s.got.length} more to go.`);
 hold(s,()=>{s.i++;s.got=[]},`You built the ${P.name} from ${P.parts.length} shapes: ${P.parts.map(x=>B.SH[x].n).join(', ')}.`+(s.i+1<B.PLANS.length?' Next model.':''))}
/* hold a finished model on screen for a moment, then move on */
function hold(s,next,msg){A.sound.pop();if(s.i+1>=(s.max||3)){next();say(msg);return}s.held=true;say(msg);const g0=gen;setTimeout(()=>{if(g0!==gen)return;s.held=false;next();A.redraw();buttons()},A.reduced()?50:750)}
/* 2. name each part */
const show=()=>({x:8,y:A.H*.12,w:A.W-16,h:A.H*.46}),nameT=()=>tiles(B.NAMES,A.H*.61,2);
function drawName(){const s=S.name,g=A.ctx;mat();if(s.i>=B.MODELS.length){tag('All 3 models named',A.W/2,A.H*.2,{ok:1});tag('Solids have 3-D names: not circle or triangle',A.W/2,A.H*.4,{f:13});drawTiles(nameT());return}
 const M=B.MODELS[s.i],R=show(),u=Math.min(R.h/tall(M.parts),R.w/3.2);tag(`${M.name}: part ${Math.min(s.k+1,M.parts.length)} of ${M.parts.length}. What shape is it?`,A.W/2,A.H*.05,{f:13});box(R,{ok:s.held});
 const at=stack(M.parts,R.x+R.w*.42,R.y+R.h-u*.3,u);const q=at[Math.min(s.k,at.length-1)];
 if(!s.held){const sh=B.SH[q.k],w=sh.w*u+u*.4;g.setLineDash([7,5]);g.lineWidth=3.5;g.strokeStyle=NO;g.strokeRect(q.cx-w/2-4,q.top-u*.25,w+u*.3,q.by-q.top+u*.4);g.setLineDash([]);tag('?',q.cx+w/2+u*.45,(q.top+q.by)/2,{f:16})}
 at.slice(0,s.k).forEach(a=>tag(B.SH[a.k].n,R.x+R.w*.82,(a.top+a.by)/2,{f:11,ok:1}));drawTiles(nameT(),s.miss)}
function namePick(k){const s=S.name;if(s.held||s.i>=B.MODELS.length)return;const M=B.MODELS[s.i],want=M.parts[s.k],j=B.NAMES.indexOf(k);
 if(k!==want){s.miss=j;A.sound.miss();const flat=B.SH[k].flat;return say(flat?`${B.SH[k].spot} This part is solid: it is a ${B.SH[want].n}. ${B.SH[want].spot}`:`Not a ${B.SH[k].n}. ${B.SH[want].spot}`)}
 s.miss=-1;s.k++;A.sound.tick();if(s.k<M.parts.length)return say(`Yes, a ${B.SH[k].n}. Now the next part up.`);
 hold(s,()=>{s.i++;s.k=0},`The ${M.name} is made of: ${M.parts.map(x=>B.SH[x].n).join(', ')}.`)}
/* 3. small cubes make a new shape */
const pile=()=>({x:8,y:A.H*.76,w:A.W-16,h:A.H*.21});
function cubeGeo(T){const s=Math.min(A.W*.62/3.4,A.H*.5/2.6),dx=s*.45,dy=-s*.38,ox=A.W/2-(Math.max(...T.cells.map(c=>c[0]))+1)*s/2-dx/2,oy=A.H*.68;
 return{s,at:([x,y,z])=>({x:ox+x*s+z*dx,y:oy-y*s+z*dy}),dx,dy}}
function cubeAt(p,s,dx,dy,ghost){const g=A.ctx,col=B.SH.cube.col;if(ghost){g.setLineDash([6,5]);g.strokeStyle='#78716c';g.lineWidth=1.6;g.strokeRect(p.x,p.y-s,s,s);
  g.beginPath();g.moveTo(p.x,p.y-s);g.lineTo(p.x+dx,p.y-s+dy);g.lineTo(p.x+s+dx,p.y-s+dy);g.lineTo(p.x+s,p.y-s);g.moveTo(p.x+s+dx,p.y-s+dy);g.lineTo(p.x+s+dx,p.y+dy);g.lineTo(p.x+s,p.y);g.stroke();g.setLineDash([]);return}
 poly([[p.x,p.y-s],[p.x+dx,p.y-s+dy],[p.x+s+dx,p.y-s+dy],[p.x+s,p.y-s]],A.mix(col,'#ffffff',.35));poly([[p.x+s,p.y-s],[p.x+s+dx,p.y-s+dy],[p.x+s+dx,p.y+dy],[p.x+s,p.y]],dark(col,.18));poly([[p.x,p.y-s],[p.x+s,p.y-s],[p.x+s,p.y],[p.x,p.y]],col)}
const order=(a,b)=>b[2]-a[2]||a[1]-b[1]||a[0]-b[0];
function drawCubes(){const s=S.cubes,g=A.ctx;mat();if(s.i>=B.CUBES.length){tag('All 3 shapes made',A.W/2,A.H*.2,{ok:1});tag('2 cubes: a cuboid. 8 cubes: a bigger cube.',A.W/2,A.H*.42,{f:13});return}
 const T=B.CUBES[s.i],G=cubeGeo(T),have=T.cells.slice(0,s.n);tag(`Shape ${s.i+1} of ${B.CUBES.length}: fill ${T.cells.length} spaces. Cubes: ${s.n}`,A.W/2,A.H*.06,{f:13,ok:s.held});
 [...T.cells].sort(order).forEach(cl=>{const inn=have.some(h=>h.join()===cl.join());if(!inn)cubeAt(G.at(cl),G.s,G.dx,G.dy,true)});
 [...have].sort(order).forEach(cl=>cubeAt(G.at(cl),G.s,G.dx,G.dy,false));if(s.held)tag(`You made a ${T.make}!`,A.W/2,A.H*.15,{ok:1});
 const P=pile();box(P);const u=Math.min(P.h*.45,30);for(let k=0;k<3;k++)cubeAt({x:P.x+14+k*u*.5,y:P.y+P.h/2+u/2-k*3},u,u*.45,-u*.38,false);
 g.fillStyle=INK;g.font=`800 ${px(15)}px system-ui,sans-serif`;g.textAlign='left';g.textBaseline='middle';g.fillText('Tap or drag a cube in',P.x+30+u*2.6,P.y+P.h/2);drag()}
function cubeAdd(){const s=S.cubes;if(s.held||s.i>=B.CUBES.length)return;const T=B.CUBES[s.i];s.n++;A.sound.tick();
 if(s.n<T.cells.length)return say(`${s.n} ${s.n>1?'cubes':'cube'} in. ${T.cells.length-s.n} more ${T.cells.length-s.n>1?'spaces':'space'} to fill.`+(s.n===4&&T.cells.length===8?' Now start the top layer.':''));
 hold(s,()=>{s.i++;s.n=0},T.say)}
/* 4. robot made of solids */
const rs=()=>{const w=Math.min(180,(A.W-36)/2);return[0,1].map(k=>({i:k,t:k?'✗ Slip':'✓ Right',x:A.W/2+(k?8:-w-8),y:A.H*.76,w,h:Math.min(A.H*.2,72)}))};
function drawRobot(){const s=S.robot,g=A.ctx;mat();const u=Math.min(A.H*.11,A.W*.09);stack(['cuboid','cube','cone'],A.W/2,A.H*.4,u);
 if(s.i>=B.ROBOT.length){tag('All 5 sayings checked',A.W/2,A.H*.55,{ok:1});return}const R=B.ROBOT[s.i];
 tag(`Robot says: "${R.say}"`,A.W/2,A.H*.52,{f:13});tag(`Saying ${s.i+1} of ${B.ROBOT.length}: right, or a slip?`,A.W/2,A.H*.65,{f:12});
 rs().forEach(b=>{box(b,{no:s.miss===b.i});g.fillStyle=INK;g.font=`800 ${px(17)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(b.t,b.x+b.w/2,b.y+b.h/2)})}
function robotPick(k){const s=S.robot;if(s.i>=B.ROBOT.length)return;const R=B.ROBOT[s.i];
 if((k===0)!==R.ok){s.miss=k;A.sound.miss();return say((R.ok?'Look again: this one is right. ':'Look again: this one is a slip. ')+R.fix)}
 s.miss=-1;s.i++;A.sound.pop();say((R.ok?'Yes, right. ':'Yes, a slip. ')+R.fix)}
/* 5. free build */
const fyard=()=>({x:8,y:A.H*.13,w:A.W-16,h:A.H*.58});
function count(parts){const m={};parts.forEach(k=>m[k]=(m[k]||0)+1);return Object.keys(m).map(k=>`${m[k]} ${B.SH[k].n}${m[k]>1?'s':''}`).join(', ')}
function drawFree(){const s=S.free;mat();const Y=fyard(),u=Math.min(Y.h/Math.max(3.2,tall(s.got)),Y.w/3);box(Y,{ok:s.got.length>=4});
 stack(s.got,Y.x+Y.w/2,Y.y+Y.h-u*.3,u);tag(s.got.length?`Your model: ${count(s.got)}`:'Build anything you like',A.W/2,A.H*.06,{f:13});drawTiles(trayT(),s.miss);drag()}
function freePut(k){const s=S.free,j=B.TRAY.indexOf(k);if(s.got[s.got.length-1]==='cone'){s.miss=j;A.sound.miss();return say('Nothing can sit on the point of a cone. Take the cone off first.')}
 if(s.got.length>=6){s.miss=j;A.sound.miss();return say('That is tall enough. Take the top part off to change it.')}
 s.miss=-1;s.got.push(k);A.sound.tick();say(`Added a ${B.SH[k].n}. Your model is ${s.got.length} ${s.got.length>1?'shapes':'shape'}: ${count(s.got)}.`)}
function freeOff(){const s=S.free;if(!s.got.length)return;const k=s.got.pop();s.miss=-1;A.sound.tick();say(`Took off the ${B.SH[k].n}. ${s.got.length} left.`)}
/* dragging a tile: a shape follows the finger and drops when let go above the tray */
let held=null;
function drag(){if(!held||!held.moved)return;const u=Math.min(A.H*.1,48);A.ctx.globalAlpha=.8;if(held.k==='pile')cubeAt({x:held.x-u/2,y:held.y+u/2},u,u*.45,-u*.38,false);else icon(held.k,held.x,held.y,u);A.ctx.globalAlpha=1}
function put(k){const sc=scene();if(sc==='plan')planPut(k);else if(sc==='free')freePut(k);else if(sc==='cubes')cubeAdd()}
function down(p){const sc=scene();
 if(sc==='plan'||sc==='free'){const t=trayT().find(q=>within(p,q));if(t){held={k:t.k,x:p.x,y:p.y,x0:p.x,y0:p.y,moved:false};return true}if(sc==='free'&&within(p,fyard())&&S.free.got.length)freeOff()}
 else if(sc==='cubes'){if(within(p,pile())){held={k:'pile',x:p.x,y:p.y,x0:p.x,y0:p.y,moved:false};return true}}
 else if(sc==='name'){const t=nameT().find(q=>within(p,q));if(t)namePick(t.k)}
 else if(sc==='robot'){const b=rs().find(q=>within(p,q));if(b)robotPick(b.i)}
 return false}
function move(p){if(!held)return;held.x=p.x;held.y=p.y;if(Math.hypot(p.x-held.x0,p.y-held.y0)>8)held.moved=true;A.redraw()}
function up(p){if(!held)return;const h=held;held=null;const top=scene()==='cubes'?pile().y:A.H*.74;if(!h.moved||(p&&p.y<top))put(h.k);else A.redraw()}
function reset(){gen++;held=null;for(const k in S)delete S[k];Object.assign(S,{plan:{i:0,got:[],miss:-1},name:{i:0,k:0,miss:-1},cubes:{i:0,n:0},robot:{i:0,miss:-1},free:{got:[],miss:-1},hook:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.hook()}
function draw(){const sc=scene();if(sc==='chal'){mat();tag('Challenge',A.W/2,A.H*.2,{ok:1});stack(['cuboid','cyl','cone'],A.W/2,A.H*.68,Math.min(A.H*.12,A.W*.1));return}
 ({plan:drawPlan,name:drawName,cubes:drawCubes,robot:drawRobot,free:drawFree})[sc]();A.fx.draw(A.ctx)}
/* every canvas action has a button twin under the canvas */
function buttons(){if(!keys)return;keys.innerHTML='';const sc=scene(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},keys,t).onclick=f};
 if(sc==='plan'&&S.plan.i<B.PLANS.length||sc==='free')B.TRAY.forEach(k=>add(B.SH[k].n,()=>put(k),`Put a ${B.SH[k].n} on top`));
 if(sc==='free')add('Take off the top',freeOff,'Take the top part off your model');
 if(sc==='name'&&S.name.i<B.MODELS.length)B.NAMES.forEach(k=>add(B.SH[k].n,()=>namePick(k),`This part is a ${B.SH[k].n}`));
 if(sc==='cubes'&&S.cubes.i<B.CUBES.length)add('Add a cube',cubeAdd,'Add one small cube to the model');
 if(sc==='robot'&&S.robot.i<B.ROBOT.length){add('✓ Right',()=>robotPick(0),'The robot is right');add('✗ Slip',()=>robotPick(1),'The robot made a slip')}}
const fin=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,ok){reset();say(B.DESC[i]);S.hook=fin(i,ok,B.DONE[i])}
/* Show me: run the moves one by one, waiting while a finished model is held on screen */
function demo(i,moves){steps[i].go();const g0=gen,sc=scene();let n=0;const tick=()=>{if(g0!==gen)return;if(!(S[sc]&&S[sc].held)){if(n>=moves.length)return;moves[n++]()}setTimeout(tick,A.reduced()?40:240)};setTimeout(tick,240)}
const steps=[
{h:'Build from a plan',p:'Big models are made of smaller 3-D shapes. Look at the plan. Build it from the bottom up.',
 predict:{q:'A rocket has a cone on top. Could the cone go at the bottom, under a cylinder?',opts:['Yes','No, a point cannot hold a block'],ans:1},task:'Build all 3 models',
 show:()=>demo(0,B.PLANS.flatMap(P=>P.parts.map(k=>()=>planPut(k)))),go:()=>{begin(0,()=>S.plan.i>=B.PLANS.length);S.plan.max=B.PLANS.length}},
{h:'Name the parts',p:'Each part of a model is a solid. Give it a 3-D name: cube, cuboid, cylinder or cone.',
 predict:{q:'What shape is the sharp end of a pencil?',opts:['A triangle','A cone'],ans:1},task:'Name every part',
 show:()=>demo(1,B.MODELS.flatMap(M=>M.parts.map(k=>()=>namePick(k)))),go:()=>{begin(1,()=>S.name.i>=B.MODELS.length);S.name.max=B.MODELS.length}},
{h:'Cubes make new shapes',p:'Fill the dashed spaces with small cubes. What new shape do they make?',
 predict:{q:'Push 2 cubes together, end to end. What new shape do you get?',opts:['A bigger cube','A cuboid'],ans:1},task:'Make all 3 shapes',
 show:()=>demo(2,B.CUBES.flatMap(T=>T.cells.map(()=>cubeAdd))),go:()=>{begin(2,()=>S.cubes.i>=B.CUBES.length);S.cubes.max=B.CUBES.length}},
{h:'Check the robot',p:'This robot is a cuboid, a cube and a cone. Is what it says right, or a slip?',task:'Check all 5 sayings',
 show:()=>demo(3,B.ROBOT.map(R=>()=>robotPick(R.ok?0:1))),go:()=>begin(3,()=>S.robot.i>=B.ROBOT.length)},
{h:'Free build',p:'Make your own model. Tap the model to take the top part off. Can you say what it is made of?',task:'Build a model with 4 parts',
 show:()=>demo(4,['cuboid','cube','cyl','cone'].map(k=>()=>freePut(k))),go:()=>begin(4,()=>S.free.got.length>=4)},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.hook()});
function why(t){let m='Look at the faces: flat or curved, and how many.';
 if(t==='flat')m='Circles and triangles are flat shapes. A solid you can hold has a 3-D name, like cone or cylinder.';
 if(t==='two')m='2 cubes end to end are 2 long but only 1 tall, so they make a cuboid, not a cube.';
 if(t==='point')m='Nothing can sit on the point of a cone. The cone goes on top.';
 if(t==='roll')m='A ball is round all over and rolls. A flat face, like a cube has, is best at the bottom.';
 if(t==='hidden')m='Count the hidden cubes too: 4 on the bottom layer and 4 on top make 8.';
 if(t==='one')m='Count each part: every part of the model is its own 3-D shape.';
 return m}
function next(){qi++;const Q=B.QS[qi%B.QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,opts=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');opts.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>check(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function check(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="lbtn sm">Next one →</button>';fb.querySelector('button').onclick=next;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:x=>{chal.hidden=x.step!==5;keys.hidden=x.step===5;buttons()},
 init:x=>{A=x;const w=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Building with 3-D shapes lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}}).start()})})();
