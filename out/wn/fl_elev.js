/* Flagship: angles of elevation and depression (ages 14–16; GCSE Maths right-angled trigonometry in context, CCSS
   HSG-SRT.C.8 "use trigonometric ratios and the Pythagorean Theorem to solve right triangles in applied problems").
   Drag a sight line to a tree top from the horizontal, drag a boat until the depression from a cliff is 20° and see the
   elevation from the boat match it, label opposite/adjacent/hypotenuse and pick tan, add the eye height, and find a boat's
   distance from a lighthouse. Every drag and tap has a button twin. */
(()=>{
const K={ink:'#0f172a',dim:'#475569',card:'#ffffff',ok:'#166534',okBg:'#dcfce7',no:'#9f1239',tip:'#eef2ff',edge:'#1e293b',
 sky:'#e0f2fe',sea:'#bfdbfe',seaInk:'#1e3a8a',land:'#d9f99d',rock:'#a8a29e',rockInk:'#44403c',leaf:'#15803d',trunk:'#78350f',
 sight:'#b91c1c',flat:'#334155',arcE:'#7c2d12',arcD:'#1d4ed8',side:['#b91c1c','#1d4ed8','#6d28d9'],tile:'#fef3c7',tileInk:'#713f12'};
const M=ELEVART,dg=M.deg,rd=M.rad;
VIS.reg('flagelev',c=>{let A,X,pad,chal,qi=-1,tok=0;const G={after:()=>{}};
const z=n=>Math.round(n*(A.narrow?1:1.12));
const put=(s,x,y,n,col,al,wt)=>{X.font=`${wt||700} ${z(n)}px system-ui,sans-serif`;X.fillStyle=col||K.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y)};
function split(s,maxW,n){X.font=`700 ${z(n)}px system-ui,sans-serif`;const out=[];let cur='';
 for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(cur&&X.measureText(t).width>maxW){out.push(cur);cur=w}else cur=t}out.push(cur);return out}
function plate(x,y,w,h,bg,edge,lw,r){A.paint.rrect(x,y,w,h,r==null?8:r);X.fillStyle=bg;X.fill();if(edge){X.lineWidth=lw||2;X.strokeStyle=edge;X.stroke()}}
function strip(s,won){const L=split(s,A.W-40,13),lh=z(13)+4,h=Math.max(z(34),L.length*lh+12);plate(10,8,A.W-20,h,won?K.okBg:K.tip,won?K.ok:K.edge);
 L.forEach((r,i)=>put(r,A.W/2,8+h/2+(i-(L.length-1)/2)*lh,13,won?K.ok:K.ink));return 8+h}
function note(){if(!G.msg)return;const L=split((G.bad?'✗ ':'✓ ')+G.msg,A.W-44,12),lh=z(12)+5,h=L.length*lh+10,y=A.H-h-8;
 plate(10,y,A.W-20,h,K.card,G.bad?K.no:K.ok,3);L.forEach((r,i)=>put(r,A.W/2,y+5+lh*(i+.5),12,G.bad?K.no:K.ink))}
const live=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const bad=s=>{G.bad=true;G.msg=s;A.sound.miss();sync()};
const fine=s=>{G.bad=false;G.msg=s;A.sound.pop();sync()};
const inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const f1=v=>(Math.round(v*10)/10).toFixed(1);
/* ---- world to canvas ---- */
function frame(top,bottom,x0,x1,y1,left){const l=left||z(30),s=Math.min((A.W-l-z(24))/(x1-x0),(bottom-top)/y1);const P=(x,y)=>[l+(x-x0)*s,bottom-y*s];P.s=s;P.inv=(cx,cy)=>[(cx-l)/s+x0,(bottom-cy)/s];P.bottom=bottom;return P}
function seg(P,a,b,col,w,dash){X.strokeStyle=col;X.lineWidth=w||2;X.setLineDash(dash||[]);X.beginPath();X.moveTo(...P(...a));X.lineTo(...P(...b));X.stroke();X.setLineDash([])}
function arcAt(P,o,a0,a1,r,col,label,side){const [cx,cy]=P(...o);X.strokeStyle=col;X.lineWidth=2.5;X.beginPath();X.arc(cx,cy,r,-rd(Math.max(a0,a1)),-rd(Math.min(a0,a1)));X.stroke();
 const m=-rd((a0+a1)/2);put(label,cx+Math.cos(m)*(r+z(side||22)),cy+Math.sin(m)*(r+z(side||22)),12,col,'center',800)}
function person(P,x,eye){const [fx,fy]=P(x,0),[ex,ey]=P(x,eye);X.strokeStyle=K.edge;X.lineWidth=3;X.beginPath();X.moveTo(fx,fy);X.lineTo(ex,ey+8);X.stroke();X.beginPath();X.arc(ex,ey,6,0,7);X.fillStyle=K.card;X.fill();X.stroke()}
function tree(P,x,h){const [bx,by]=P(x,0),[tx,ty]=P(x,h),[,my]=P(x,h*.45);X.strokeStyle=K.trunk;X.lineWidth=6;X.beginPath();X.moveTo(bx,by);X.lineTo(bx,my);X.stroke();
 X.fillStyle=K.leaf;X.beginPath();X.moveTo(tx,ty);X.lineTo(tx-(by-ty)*.28,my+4);X.lineTo(tx+(by-ty)*.28,my+4);X.closePath();X.fill()}
function ground(P,x0,x1,col){const [a,b]=P(x0,0),[c2]=P(x1,0);X.fillStyle=col;X.fillRect(a-z(30),b,c2-a+z(60),Math.max(4,A.H-b))}
function knob(x,y,on){X.beginPath();X.arc(x,y,z(11),0,7);X.fillStyle=on?K.tile:K.card;X.fill();X.lineWidth=3;X.strokeStyle=K.edge;X.stroke()}
function tiles(list,y,cols,dim){const gap=z(6),w=(A.W-28-gap*(cols-1))/cols,h=z(34);return list.map((o,i)=>{const x=14+(i%cols)*(w+gap),yy=y+Math.floor(i/cols)*(h+gap);
 plate(x,yy,w,h,dim?'#f1f5f9':K.tile,dim?K.dim:K.tileInk,2,10);let n=12;X.font=`800 ${z(n)}px system-ui,sans-serif`;while(n>9&&X.measureText(o[0]).width>w-8){n--;X.font=`800 ${z(n)}px system-ui,sans-serif`}put(o[0],x+w/2,yy+h/2,n,dim?K.dim:K.tileInk,'center',800);return{x,y:yy,w,h,i}})}
/* ---- step 0: aim at the tree top ---- */
const T=M.TREE,elevT=()=>dg(Math.atan((G.aim-T.eye)/T.d));
function aim(m){if(G.won)return;G.aim=Math.max(0,Math.min(18,Math.round(m*2)/2));A.sound.tick();
 if(G.aim===T.top){G.won=true;return fine(`On the top: tan θ = ${T.top-T.eye} ÷ ${T.d}, so θ = ${f1(elevT())}°, measured up from the horizontal. From the vertical it would be ${f1(90-elevT())}°: a different angle.`)}
 G.bad=false;G.msg=`Sight line ${G.aim} m up the tree: ${f1(elevT())}° above the horizontal. ${G.aim<T.top?'Aim higher.':'Too high: that is above the top.'}`;sync()}
function drawTree(t){const P=frame(t+z(14),A.H-z(78),0,24,18);G.P=P;ground(P,0,24,K.land);tree(P,T.d,T.top);person(P,0,T.eye);
 seg(P,[0,T.eye],[T.d,T.eye],K.flat,2,[6,5]);seg(P,[0,T.eye],[T.d,G.aim],K.sight,3);const a=elevT();arcAt(P,[0,T.eye],0,a,z(34),K.arcE,f1(a)+'°');
 const [kx,ky]=P(T.d,G.aim);knob(kx,ky,G.grab);put('horizontal',P(T.d*.55,0)[0],P(0,T.eye)[1]+z(11),10,K.flat,'center',600);put(T.d+' m',P(T.d/2,0)[0],P(0,0)[1]+z(12),11,K.ink)}
/* ---- step 1: cliff and boat ---- */
const C=M.CLIFF,depC=()=>dg(Math.atan(C.h/G.bx));
function boatTo(m){if(G.won)return;G.bx=Math.max(20,Math.min(155,Math.round(m)));A.sound.tick();const a=depC();
 if(Math.abs(a-C.want)<.15){G.won=true;return fine(`Boat ${G.bx} m out: depression ${f1(a)}° from the cliff top, elevation ${f1(a)}° from the boat. The horizontals are parallel, so these alternate angles are equal.`)}
 G.bad=false;G.msg=`Boat ${G.bx} m out: depression ${f1(a)}°, elevation ${f1(a)}°. ${a>C.want?'Move it further out to make the angle smaller.':'Bring it closer to make the angle bigger.'}`;sync()}
function boat(P,x){const [bx,by]=P(x,0);X.fillStyle=K.edge;X.beginPath();X.moveTo(bx-z(14),by-z(8));X.lineTo(bx+z(14),by-z(8));X.lineTo(bx+z(9),by);X.lineTo(bx-z(9),by);X.closePath();X.fill();X.fillRect(bx-1,by-z(22),2,z(14))}
function drawCliff(t,H,xmax,bxKey){const P=frame(t+z(14),A.H-z(bxKey==='lh'?196:84),0,xmax,H*1.12,z(48));G.P=P;ground(P,0,xmax,K.sea);const [cx,cy]=P(0,H),[,gy]=P(0,0);
 X.fillStyle=bxKey==='lh'?'#e2e8f0':K.rock;X.fillRect(cx-z(30),cy,z(30),gy-cy);X.strokeStyle=K.rockInk;X.lineWidth=2;X.strokeRect(cx-z(30),cy,z(30),gy-cy);
 put(H+' m',cx-z(15),(cy+gy)/2,11,K.rockInk,'center',800);const bx=G.bx,a=dg(Math.atan(H/bx));
 seg(P,[0,H],[xmax*.97,H],K.flat,2,[6,5]);seg(P,[bx,0],[xmax*.97,0],K.flat,1,[2,4]);seg(P,[0,H],[bx,0],K.sight,3);boat(P,bx);
 arcAt(P,[0,H],-a,0,z(40),K.arcD,f1(a)+'°',20);if(bxKey!=='lh')arcAt(P,[bx,0],180-a,180,z(34),K.arcE,f1(a)+'°',18);
 const [kx,ky]=P(bx,0);knob(kx,ky+z(12),G.grab);put(bx+' m',kx,ky+z(30),11,K.seaInk,'center',800);return P}
/* ---- step 2: label sides, pick the ratio ---- */
const R=M.RATIO;
function tapSide(k){if(G.won||G.lab>2)return;if(k!==G.lab)return bad(`That is the ${M.SIDES[k][0]}. ${M.SIDES[G.lab][1]}`);G.lab++;A.sound.tick();
 G.bad=false;G.msg=G.lab>2?'All three sides named. You know the adjacent (20 m) and want the opposite. Which ratio links them?':`Yes, the ${M.SIDES[k][0]}. Now tap the ${M.SIDES[G.lab][0]}.`;sync()}
function pickRatio(i){if(G.won)return;if(G.lab<3)return bad('Name the three sides first, starting from the angle.');const r=M.RATIOS[i];if(!r[1])return bad(r[2]);
 G.won=true;fine(`tan ${R.ang}° = opp ÷ ${R.d}, so opp = ${R.d} × tan ${R.ang}° = ${f1(R.d*Math.tan(rd(R.ang)))} m above eye level.`)}
function drawRatio(t){const P=frame(t+z(18),A.H-z(150),-2,24,16);G.P=P;const h=R.d*Math.tan(rd(R.ang)),pts=[[[R.d,0],[R.d,h]],[[0,0],[R.d,0]],[[0,0],[R.d,h]]];
 G.sides=pts.map(([a,b],k)=>{const on=k<G.lab;seg(P,a,b,on?K.side[k]:K.edge,on?5:3);const [ax,ay]=P(...a),[bx,by]=P(...b);if(on)put(M.SIDES[k][0],(ax+bx)/2+(k===0?z(36):k===1?0:-z(30)),(ay+by)/2+(k===1?z(14):k===2?-z(10):0),11,K.side[k],'center',800);return{ax,ay,bx,by,k}});
 const [rx,ry]=P(R.d,0);X.strokeStyle=K.edge;X.lineWidth=1.5;X.strokeRect(rx-z(10),ry-z(10),z(10),z(10));arcAt(P,[0,0],0,R.ang,z(30),K.arcE,R.ang+'°',18);
 put(R.d+' m',P(R.d/2,0)[0],ry+z(28),11,K.ink);G.tileHit=tiles(M.RATIOS,A.H-z(140),3,G.lab<3)}
/* ---- step 3: add the eye height ---- */
function eyeTo(m){if(G.won)return;G.eye=Math.max(.5,Math.min(2,Math.round(m*10)/10));A.sound.tick();G.bad=false;G.msg=`Eye height ${f1(G.eye)} m.`+(Math.abs(G.eye-M.EYE.want)<.01?' Now pick the height of the tree.':' The clinometer is held at eye height: set it to 1.6 m.');sync()}
function pickTotal(i){if(G.won)return;if(Math.abs(G.eye-M.EYE.want)>.01)return bad('Set the eye height to 1.6 m first: drag the eye.');const o=M.TOTAL[i];if(!o[1])return bad(o[2]);
 G.won=true;fine('14.0 m above the eye + 1.6 m from the ground to the eye = 15.6 m.')}
function drawEye(t){const P=frame(t+z(14),A.H-z(124),0,24,17);G.P=P;ground(P,0,24,K.land);const top=G.eye+14;tree(P,R.d,15.6);person(P,0,G.eye);
 seg(P,[0,G.eye],[R.d,G.eye],K.flat,2,[6,5]);seg(P,[0,G.eye],[R.d,top],K.sight,3);arcAt(P,[0,G.eye],0,dg(Math.atan(14/R.d)),z(30),K.arcE,'35°',18);
 const [ex,ey]=P(0,G.eye),[,gy]=P(0,0);knob(ex+z(20),ey,G.grab);put(f1(G.eye)+' m',ex+z(48),(ey+gy)/2,11,K.ink,'center',800);
 const [tx,ty]=P(R.d,G.eye),[,yy]=P(R.d,top);put('14.0 m',tx-z(28),ty-(ty-yy)*.22,11,K.sight,'center',800);G.tileHit=tiles(M.TOTAL,A.H-z(114),3,Math.abs(G.eye-M.EYE.want)>.01)}
/* ---- step 4: lighthouse distance ---- */
const LH=M.LIGHT,depL=()=>dg(Math.atan(LH.h/G.bx));
function lhTo(m){if(G.won)return;G.bx=Math.max(50,Math.min(300,Math.round(m/5)*5));A.sound.tick();const a=depL();G.bad=false;
 G.msg=Math.abs(a-LH.want)<.1?`Depression ${f1(a)}° with the boat ${G.bx} m out. Which calculation gives that distance?`:`Boat ${G.bx} m out: depression ${f1(a)}°. ${a>LH.want?'Further out makes it smaller.':'Closer makes it bigger.'}`;sync()}
function pickDist(i){if(G.won)return;if(Math.abs(depL()-LH.want)>.1)return bad('Drag the boat until the angle of depression reads 12.0° first.');const o=M.DIST[i];if(!o[1])return bad(o[2]);
 G.won=true;fine('tan 12° = 50 ÷ distance, so distance = 50 ÷ tan 12° ≈ 235.2 m. The boat at 235 m matches.')}
/* ---- input and drawing ---- */
const kind=()=>['tree','cliff','ratio','eye','lh','quiz'][A.step];
const segD=(p,s)=>{const vx=s.bx-s.ax,vy=s.by-s.ay,u=Math.max(0,Math.min(1,((p.x-s.ax)*vx+(p.y-s.ay)*vy)/(vx*vx+vy*vy)));return Math.hypot(p.x-s.ax-u*vx,p.y-s.ay-u*vy)};
function down(p){const k=kind(),P=G.P,tl=(G.tileHit||[]).find(r=>inR(p,r));
 if(k==='tree'&&P){const [kx,ky]=P(T.d,G.aim);if(Math.hypot(p.x-kx,p.y-ky)<z(30)||Math.abs(p.x-kx)<z(26)){G.grab=1;aim(P.inv(p.x,p.y)[1]);return true}}
 if(k==='lh'&&tl){pickDist(tl.i);return true}
 if((k==='cliff'||k==='lh')&&P&&p.y>P(0,0)[1]-z(40)&&p.y<P(0,0)[1]+z(40)){G.grab=1;(k==='cliff'?boatTo:lhTo)(P.inv(p.x,p.y)[0]);return true}
 if(k==='ratio'){if(tl){pickRatio(tl.i);return true}const s=(G.sides||[]).map(s=>[segD(p,s),s]).sort((a,b)=>a[0]-b[0])[0];if(s&&s[0]<z(18)){tapSide(s[1].k);return true}}
 if(k==='eye'){if(tl){pickTotal(tl.i);return true}if(P&&p.x<P(3,0)[0]){G.grab=1;eyeTo(P.inv(p.x,p.y)[1]);return true}}
 return false}
function move(p){if(!G.grab||!G.P)return;const k=kind(),[mx,my]=G.P.inv(p.x,p.y);if(k==='tree')aim(my);if(k==='cliff')boatTo(mx);if(k==='lh')lhTo(mx);if(k==='eye')eyeTo(my)}
function up(){G.grab=0;A.redraw()}
function draw(){X.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);X.fillRect(0,0,A.W,A.H);if(A.col.dark){X.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);X.fill()}
 const k=kind();let t;G.tileHit=null;
 if(k==='tree'){t=strip(G.won?'Elevation: up from the horizontal to the sight line.':'Drag the white dot up the tree until the sight line hits the top.',G.won);drawTree(t)}
 if(k==='cliff'){t=strip(G.won?'Angle of depression = angle of elevation.':'Drag the boat until the angle of depression is 20°.',G.won);drawCliff(t,C.h,160,'cl')}
 if(k==='ratio'){t=strip(G.won?'Adjacent known, opposite wanted: tan.':G.lab<3?`Tap the ${M.SIDES[G.lab][0]} side, seen from the 35° angle.`:'Tap the ratio that links them.',G.won);drawRatio(t)}
 if(k==='eye'){t=strip(G.won?'Height = eye height + d × tan θ.':'Drag the white dot to set the eye height to 1.6 m, then pick the tree’s height.',G.won);drawEye(t)}
 if(k==='lh'){t=strip(G.won?'Distance = height ÷ tan(depression).':'Drag the boat until the depression is 12°, then pick the calculation.',G.won);drawCliff(t,LH.h,320,'lh');G.tileHit=tiles(M.DIST,A.H-z(184),2,Math.abs(depL()-LH.want)>.1)}
 if(k==='quiz'){t=strip('Measure from the horizontal. Label the sides from the angle. Add the eye height.');G.bx=110;drawCliff(t,C.h,160,'cl')}
 note();A.fx.draw(X)}
function sync(){const k=kind();let d='Challenge.';
 if(k==='tree')d=`Tree ${T.d} m away, eye ${T.eye} m up. Sight line hits the tree ${G.aim} m up, angle of elevation ${f1(elevT())} degrees.`;
 if(k==='cliff')d=`Cliff ${C.h} m high. Boat ${G.bx} m out. Angle of depression ${f1(depC())} degrees, angle of elevation from the boat ${f1(depC())} degrees.`;
 if(k==='ratio')d=`Right triangle: 35 degree angle at the eye, 20 m along the ground. Sides named: ${M.SIDES.slice(0,G.lab).map(s=>s[0]).join(', ')||'none'}.`;
 if(k==='eye')d=`Eye height ${f1(G.eye)} m. Angle 35 degrees, 20 m from the tree, 14.0 m above the eye.`;
 if(k==='lh')d=`Lighthouse ${LH.h} m. Boat ${G.bx} m out. Angle of depression ${f1(depL())} degrees.`;
 live((G.msg?G.msg+' ':'')+d);btns();G.after()}
function btns(){if(!pad)return;pad.innerHTML='';const k=kind(),b=(label,fn,aria)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':aria||null},pad,label).onclick=()=>{fn();sync()}};
 if(k==='tree'&&!G.won){b('Aim up 0.5 m',()=>aim(G.aim+.5));b('Aim down 0.5 m',()=>aim(G.aim-.5))}
 if(k==='cliff'&&!G.won){b('◀ 10 m',()=>boatTo(G.bx-10),'Boat 10 m closer');b('◀ 1 m',()=>boatTo(G.bx-1),'Boat 1 m closer');b('1 m ▶',()=>boatTo(G.bx+1),'Boat 1 m further');b('10 m ▶',()=>boatTo(G.bx+10),'Boat 10 m further')}
 if(k==='ratio'&&!G.won){if(G.lab<3)M.SIDES.forEach((s,i)=>b(['Vertical side','Ground side','Sight line'][i],()=>tapSide(i),`Name the ${['vertical side','ground side','sight line'][i]} as the ${M.SIDES[G.lab][0]}`));else M.RATIOS.forEach((r,i)=>b(r[0],()=>pickRatio(i)))}
 if(k==='eye'&&!G.won){b('Eye up 0.1 m',()=>eyeTo(G.eye+.1));b('Eye down 0.1 m',()=>eyeTo(G.eye-.1));M.TOTAL.forEach((o,i)=>b('Tree: '+o[0],()=>pickTotal(i)))}
 if(k==='lh'&&!G.won){b('◀ 25 m',()=>lhTo(G.bx-25),'Boat 25 m closer');b('◀ 5 m',()=>lhTo(G.bx-5),'Boat 5 m closer');b('5 m ▶',()=>lhTo(G.bx+5),'Boat 5 m further');b('25 m ▶',()=>lhTo(G.bx+25),'Boat 25 m further');M.DIST.forEach((o,i)=>b(o[0],()=>pickDist(i)))}
 A.redraw()}
const settle=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const id=++tok;fns.forEach((f,j)=>setTimeout(()=>{if(id===tok){f();sync()}},(j+1)*(A.reduced()?30:ms)))};
function reset(){tok++;Object.assign(G,{after:()=>{},won:false,msg:'',bad:false,aim:6,bx:60,grab:0,lab:0,eye:1})}
const steps=[
{h:'Look up from the horizontal',p:'An angle of elevation is how far you look up. It is measured from the horizontal at your eye, up to the line of sight. Never from the vertical.',
predict:{q:'Where is an angle of elevation measured from?',opts:['The horizontal, up to the line of sight','The vertical tree, down to the line of sight','The foot of the tree'],ans:0},
task:'Aim the sight line at the top of the tree',show:()=>{steps[0].go();play([10,12,13,14].map(m=>()=>aim(m)),400)},go:()=>{reset();sync();G.after=settle(0,()=>G.won,`${f1(dg(Math.atan(12.5/20)))}° above the horizontal.`)}},
{h:'Look down from the horizontal',p:'An angle of depression is how far you look down, measured from the horizontal at your eye. From a cliff top to a boat, it equals the boat’s angle of elevation to the top.',
predict:{q:'From a 40 m cliff, the angle of depression to a boat is 20°. What is the angle of elevation from the boat to the top?',opts:['20°','70°','160°'],ans:0},
task:'Drag the boat until the depression is 20°',show:()=>{steps[1].go();play([90,100,105,108,110].map(m=>()=>boatTo(m)),400)},go:()=>{reset();sync();G.after=settle(1,()=>G.won,'20° down from the top, 20° up from the boat.')}},
{h:'Choose the ratio',p:'Draw the right triangle and name the sides from the angle: opposite, adjacent, hypotenuse. Then pick the ratio that uses the side you know and the side you want.',
task:'Name the sides, then pick the ratio',show:()=>{steps[2].go();play([()=>tapSide(0),()=>tapSide(1),()=>tapSide(2),()=>pickRatio(2)],500)},go:()=>{reset();sync();G.after=settle(2,()=>G.won,'opp = 20 × tan 35° ≈ 14.0 m.')}},
{h:'Add the eye height',p:'The sight line starts at your eye, not the ground. The triangle gives the height above your eye, so add your eye height to get the full height.',
predict:{q:'The triangle gives 14.0 m above the eye. Your eye is 1.6 m up. How tall is the tree?',opts:['14.0 m','15.6 m','12.4 m'],ans:1},
task:'Set the eye height and pick the tree’s height',show:()=>{steps[3].go();play([()=>eyeTo(1.2),()=>eyeTo(1.4),()=>eyeTo(1.6),()=>pickTotal(1)],450)},go:()=>{reset();sync();G.after=settle(3,()=>G.won,'14.0 + 1.6 = 15.6 m.')}},
{h:'Find a distance',p:'Now the height is known and the distance is not. The height is opposite the angle and the distance is adjacent, so the distance is the height ÷ tan of the angle.',
predict:{q:'A boat moves further from a lighthouse. What happens to the angle of depression?',opts:['It gets smaller','It gets bigger','It stays the same'],ans:0},
task:'Drag the boat to 12°, then pick the calculation',show:()=>{steps[4].go();play([()=>lhTo(150),()=>lhTo(200),()=>lhTo(230),()=>lhTo(235),()=>pickDist(2)],450)},go:()=>{reset();G.bx=100;sync();G.after=settle(4,()=>G.won,'50 ÷ tan 12° ≈ 235.2 m.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>G.after()});
function ask(){qi++;const [q,ans,wrongs]=M.bank[qi%M.bank.length],all=[[ans,'ok']].concat(wrongs),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>mark(tag,ans)});live('Challenge: '+q);A.redraw()}
let streak=0;
function mark(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=tag==='ok';let m=M.WHY[tag]||'Measure from the horizontal and label the sides from the angle.';
 if(tag==='eye')m='The tan part only reaches from your eye to the top. Add the eye height: 1.5 + 14.4 ≈ 15.9 m.';
 if(tag==='hyp')m='Dividing by sin gives the sloping sight line. The ground distance is the adjacent side: 80 ÷ tan 15°.';
 if(tag==='vertical')m='That angle is measured from the vertical. Elevation and depression are both measured from the horizontal, so they are equal.';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+streak+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.64,tall:1.2,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;btns()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Elevation and depression lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
