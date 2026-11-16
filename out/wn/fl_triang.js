/* Flagship: angles in triangles, quadrilaterals and regular polygons (ages 10–11; NC England Y6 geometry, CCSS 8.G.A.5
   informal argument). Drag a corner while the three torn-off corners stay on a straight line, find missing angles, use
   isosceles and right-angle facts, split a quadrilateral by a diagonal and fan a regular polygon into triangles.
   Every drag or tap has a button twin. */
(()=>{
const K={ink:'#0f172a',dim:'#475569',rule:'#334155',card:'#ffffff',ok:'#166534',okBg:'#dcfce7',no:'#9f1239',tip:'#eef2ff',
 fill:'#1d4ed8',sky:'#dbeafe',gold:'#a16207',goldSoft:'#fef3c7',tag:'#7c2d12'};
const T=TRART,COL=T.COL;
VIS.reg('flagtriang',c=>{let A,X,pad,chal,qi=-1,tok=0;const G={after:()=>{}};
const fs=n=>Math.round(n*(A.narrow?1:1.12));
const txt=(s,x,y,n,col,al,wt)=>{X.font=`${wt||700} ${fs(n)}px system-ui,sans-serif`;X.fillStyle=col||K.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y,A.W-16)};
function wrapT(s,maxW,n){X.font=`700 ${fs(n)}px system-ui,sans-serif`;const out=[];let cur='';
 for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(cur&&X.measureText(t).width>maxW){out.push(cur);cur=w}else cur=t}out.push(cur);return out}
function box(x,y,w,h,bg,edge,lw,r){A.paint.rrect(x,y,w,h,r==null?8:r);X.fillStyle=bg;X.fill();if(edge){X.lineWidth=lw||2;X.strokeStyle=edge;X.stroke()}}
function banner(s,won){const L=wrapT(s,A.W-40,13),lh=fs(13)+4,h=Math.max(fs(40),L.length*lh+14);box(10,8,A.W-20,h,won?K.okBg:K.tip,won?K.ok:K.rule);
 L.forEach((r,i)=>txt(r,A.W/2,8+h/2+(i-(L.length-1)/2)*lh,13,won?K.ok:K.ink));return 8+h}
function note(){if(!G.msg)return;const L=wrapT((G.bad?'✗ ':'✓ ')+G.msg,A.W-44,13),lh=fs(13)+5,h=L.length*lh+10,y=A.H-h-8;
 box(10,y,A.W-20,h,K.card,G.bad?K.no:K.ok,3);L.forEach((r,i)=>txt(r,A.W/2,y+5+lh*(i+.5),13,G.bad?K.no:K.ink))}
const tell=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const wrong=s=>{G.bad=true;G.msg=s;A.sound.miss();sync()};
const right=s=>{G.bad=false;G.msg=s;A.sound.pop();sync()};
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* corner arc with a label on the bisector; a small square when the angle is 90° */
function corner(P,Q,R,col,lab,r){const a1=Math.atan2(Q.y-P.y,Q.x-P.x),a2=Math.atan2(R.y-P.y,R.x-P.x);let d=a2-a1;while(d>Math.PI)d-=2*Math.PI;while(d<-Math.PI)d+=2*Math.PI;
 const deg=Math.abs(d)*180/Math.PI,rad=r||fs(20);X.strokeStyle=col;X.lineWidth=3;X.fillStyle=A.alpha(col,.18);
 if(lab==='90°'){const u={x:Math.cos(a1),y:Math.sin(a1)},v={x:Math.cos(a2),y:Math.sin(a2)},s=fs(13);X.beginPath();X.moveTo(P.x+u.x*s,P.y+u.y*s);X.lineTo(P.x+(u.x+v.x)*s,P.y+(u.y+v.y)*s);X.lineTo(P.x+v.x*s,P.y+v.y*s);X.stroke()}
 else{X.beginPath();X.moveTo(P.x,P.y);X.arc(P.x,P.y,rad,a1,a2,d<0);X.closePath();X.fill();X.beginPath();X.arc(P.x,P.y,rad,a1,a2,d<0);X.stroke()}
 if(lab!=null){const m=a1+d/2,k=rad+fs(deg<40?24:16);txt(lab,P.x+Math.cos(m)*k,P.y+Math.sin(m)*k,12,col)}}
function poly(P,edge,fillc){X.beginPath();P.forEach((p,i)=>i?X.lineTo(p.x,p.y):X.moveTo(p.x,p.y));X.closePath();if(fillc){X.fillStyle=fillc;X.fill()}X.strokeStyle=edge||K.rule;X.lineWidth=2.5;X.stroke()}
/* ---- step 0: drag the top corner; the three corners line up on a straight line ---- */
function triNow(){return[G.L,G.R,G.top]}
function triAngles(){const P=triNow();return T.rnd([T.ang(P[0],P[1],P[2]),T.ang(P[1],P[2],P[0]),T.ang(P[2],P[0],P[1])],180)}
function kind(){const m=Math.max(...triAngles());return m===90?'right':m>90?'wide':'pointy'}
function place(x,y){const lo=G.L.y-fs(30),M={x:(G.L.x+G.R.x)/2,y:G.L.y},r=(G.R.x-G.L.x)/2;x=Math.max(14,Math.min(A.W-14,x));y=Math.max(G.y0+6,Math.min(lo,y));
 const d=Math.hypot(x-M.x,y-M.y);if(Math.abs(d-r)<fs(9)){x=M.x+(x-M.x)*r/d;y=M.y+(y-M.y)*r/d}G.top={x,y};G.kinds.add(kind());A.sound.tick()}
const PRESET={pointy:[.5,.18],right:[.5,0],wide:[.3,.62]};
function preset(k){const M=(G.L.x+G.R.x)/2,r=(G.R.x-G.L.x)/2;if(k==='right'){place(M+r*Math.cos(-2.2),G.L.y+r*Math.sin(-2.2))}
 else{const [fx,fy]=PRESET[k];place(G.L.x+(G.R.x-G.L.x)*fx,G.y0+(G.L.y-G.y0)*fy)}checkKinds()}
function checkKinds(){const n=G.kinds.size;if(n>=3&&!G.won){G.won=true;right('Pointy, right-angled and wide: the three corners always fill a straight line, 180°.')}else{G.bad=false;G.msg=`${kind()==='right'?'Right-angled':kind()==='wide'?'Wide (obtuse)':'Pointy (acute)'} triangle: ${triAngles().join('° + ')}° = 180°. Kinds made: ${n} of 3.`;sync()}}
function drawTear(){const top=banner(G.won?'Every triangle: the three angles add up to 180°, a straight line.':'Drag the top corner (or use the buttons). Make a pointy, a right-angled and a wide triangle.',G.won);
 G.y0=top+fs(10);const by=top+(A.H-top)*.45;if(!G.L||G.by!==by){G.by=by;G.L={x:A.W*.2,y:by};G.R={x:A.W*.8,y:by};if(!G.top)G.top={x:A.W*.55,y:top+fs(30)}}
 const P=triNow(),a=triAngles();poly(P,K.rule,A.alpha(K.fill,.06));corner(P[0],P[1],P[2],COL[0],a[0]+'°');corner(P[1],P[2],P[0],COL[1],a[1]+'°');corner(P[2],P[0],P[1],COL[2],a[2]+'°');
 X.fillStyle=K.fill;X.beginPath();X.arc(P[2].x,P[2].y,fs(11),0,7);X.fill();X.strokeStyle='#fff';X.lineWidth=2;X.stroke();
 const cy=A.H-fs(96),R=Math.min(fs(70),A.W*.2,cy-by-fs(24)),cx=A.W/2;X.strokeStyle=K.rule;X.lineWidth=3;X.beginPath();X.moveTo(cx-R-fs(30),cy);X.lineTo(cx+R+fs(30),cy);X.stroke();
 let s=Math.PI;a.forEach((v,i)=>{const e=s+v*Math.PI/180;X.fillStyle=A.alpha(COL[i],.3);X.beginPath();X.moveTo(cx,cy);X.arc(cx,cy,R,s,e);X.closePath();X.fill();X.strokeStyle=COL[i];X.lineWidth=2;X.stroke();
  const m=(s+e)/2;txt(v+'°',cx+Math.cos(m)*R*.62,cy+Math.sin(m)*R*.62,11,COL[i]);s=e});
 txt(`corners torn off and put together: ${a.join(' + ')} = 180`,A.W/2,cy+fs(14),11,K.dim)}
/* ---- steps 1, 2 and 4: tap the answer tile ---- */
const order=()=>{const n=round().opts.length,r=G.si%n;return[...Array(n)].map((_,j)=>(j+r)%n)};
function tiles(opts,y){const n=opts.length,gap=8,w=(A.W-28-gap*(n-1))/n,h=fs(40);G.tileHit=order().map((i,j)=>{const lab=opts[i][0],x=14+j*(w+gap);box(x,y,w,h,K.goldSoft,K.gold,2,12);txt(lab,x+w/2,y+h/2,15,K.tag);return{x,y,w,h,i}})}
const round=()=>G.list[G.si];
function choose(i){if(G.won)return;const Q=round(),[lab,tag]=Q.opts[i];
 if(tag!=='ok')return wrong(why(tag));G.done.push(G.mode==='poly'?`${Q.name}: ${lab}`:lab);
 if(G.si===G.list.length-1){G.won=true;return right(`${lab}. ${G.endMsg}`)}right(`${lab}. Next one.`);G.si++}
function drawFind(){const Q=round(),top=banner(G.won?'Missing angle = 180° − the two you know.':Q.q+' Tap the missing angle.',G.won);
 const P=T.tri(Q.a,Q.b,{x:A.W*.12,y:top+fs(26),w:A.W*.76,h:A.H*.36}),c3=180-Q.a-Q.b;
 poly(P,K.rule,A.alpha(K.fill,.06));corner(P[0],P[1],P[2],COL[0],Q.a+'°');corner(P[1],P[2],P[0],COL[1],Q.b+'°');corner(P[2],P[0],P[1],COL[2],G.won?c3+'°':'?');
 tiles(Q.opts,A.H*.62);if(G.done.length)txt('✓ '+G.done.join('  ✓ '),A.W/2,A.H*.62+fs(58),12,K.ok)}
function drawSpecial(){const Q=round(),top=banner(G.won?'Equal sides face equal angles, and a right angle uses up 90° of the 180°.':Q.q,G.won);
 const P=T.tri(Q.a,Q.b,{x:A.W*.14,y:top+fs(26),w:A.W*.72,h:A.H*.34}),labs=Q.show.map((s,i)=>i===Q.ask||(Q.a===Q.b&&Q.ask<2&&i<2)?'?':s);
 poly(P,K.rule,A.alpha(K.fill,.06));corner(P[0],P[1],P[2],COL[0],labs[0]);corner(P[1],P[2],P[0],COL[1],labs[1]);corner(P[2],P[0],P[1],COL[2],labs[2]);
 if(Q.a===Q.b){[[P[0],P[2]],[P[1],P[2]]].forEach(([u,v])=>{const m={x:(u.x+v.x)/2,y:(u.y+v.y)/2},dx=v.x-u.x,dy=v.y-u.y,l=Math.hypot(dx,dy),nx=-dy/l*7,ny=dx/l*7;X.strokeStyle=K.ink;X.lineWidth=2.5;X.beginPath();X.moveTo(m.x-nx,m.y-ny);X.lineTo(m.x+nx,m.y+ny);X.stroke()})}
 tiles(Q.opts,A.H*.62)}
function drawPoly(){const Q=round(),top=banner(G.won?'A shape with n sides splits into n − 2 triangles: angle sum = (n − 2) × 180°.':`Regular ${Q.name}: ${Q.n} equal sides and ${Q.n} equal angles. Split from one corner. What is each angle?`,G.won);
 const cx=A.W/2,r=Math.min(A.W*.28,A.H*.17),cy=top+r+fs(14),V=[...Array(Q.n)].map((_,i)=>{const t=-Math.PI/2+i*2*Math.PI/Q.n;return{x:cx+r*Math.cos(t),y:cy+r*Math.sin(t)}});
 for(let i=1;i<Q.n-1;i++){X.fillStyle=A.alpha(COL[i%4],.16);X.beginPath();X.moveTo(V[0].x,V[0].y);X.lineTo(V[i].x,V[i].y);X.lineTo(V[i+1].x,V[i+1].y);X.closePath();X.fill();X.strokeStyle=K.dim;X.lineWidth=1.5;X.stroke()}
 poly(V,K.rule);txt(`${Q.n} sides → ${Q.n-2} triangles`,cx,cy+r+fs(16),13,K.fill);tiles(Q.opts,A.H*.62);if(G.done.length)txt('✓ '+G.done.join('  ✓ '),A.W/2,A.H*.62+fs(58),12,K.ok)}
/* ---- step 3: quadrilateral with a draggable corner and a diagonal ---- */
function quadAngles(){const Q=G.quad;return T.rnd(Q.map((p,i)=>T.ang(p,Q[(i+3)%4],Q[(i+1)%4])),360)}
function convex(Q){let s=0;for(let i=0;i<4;i++){const a=Q[i],b=Q[(i+1)%4],d=Q[(i+2)%4],z=(b.x-a.x)*(d.y-b.y)-(b.y-a.y)*(d.x-b.x);if(Math.abs(z)<300)return false;s+=Math.sign(z)}return Math.abs(s)===4}
function moveQ(x,y){const Q=G.quad.slice();Q[2]={x:Math.max(14,Math.min(A.W-14,x)),y:Math.max(G.qy0,Math.min(A.H-fs(90),y))};if(!convex(Q))return false;G.quad=Q;G.qmoved++;A.sound.tick();return true}
function diag(){if(G.diag)return wrong('The diagonal is already drawn. Now drag the blue corner.');G.diag=true;A.sound.tick();qCheck()}
function qPreset(k){const W=A.W,y0=G.qy0,h=A.H-fs(90)-y0,pts={kite:[.66,.95],trap:[.86,.5]}[k];moveQ(W*pts[0],y0+h*pts[1]);G.qmoved+=40;qCheck()}
function qCheck(){const a=quadAngles();if(G.diag&&G.qmoved>=40&&!G.won){G.won=true;return right(`${a.join(' + ')} = 360°. Two triangles: 180° + 180°.`)}
 G.bad=false;G.msg=G.diag?`${a.join('° + ')}° = 360°. Drag the blue corner to change the shape.`:`${a.join('° + ')}° = ${a.reduce((s,v)=>s+v,0)}°. Draw a diagonal to see why.`;sync()}
function drawQuad(){const top=banner(G.won?'Any quadrilateral splits into 2 triangles, so its angles add up to 2 × 180° = 360°.':'Tap the shape to draw a diagonal, then drag the blue corner.',G.won);
 G.qy0=top+fs(30);if(!G.quad||G.qtop!==top){G.qtop=top;const y0=top+fs(44),y1=A.H-fs(100);G.quad=[{x:A.W*.14,y:y0+fs(20)},{x:A.W*.62,y:y0},{x:A.W*.84,y:y1},{x:A.W*.22,y:y1-fs(10)}]}
 const Q=G.quad,a=quadAngles();if(G.diag){poly([Q[0],Q[1],Q[2]],K.rule,A.alpha(COL[0],.12));poly([Q[0],Q[2],Q[3]],K.rule,A.alpha(COL[1],.12));
  X.setLineDash([7,5]);X.strokeStyle=K.ink;X.lineWidth=2.5;X.beginPath();X.moveTo(Q[0].x,Q[0].y);X.lineTo(Q[2].x,Q[2].y);X.stroke();X.setLineDash([])}else poly(Q,K.rule,A.alpha(K.fill,.06));
 X.fillStyle=K.fill;X.beginPath();X.arc(Q[2].x,Q[2].y,fs(11),0,7);X.fill();X.strokeStyle='#fff';X.lineWidth=2;X.stroke();Q.forEach((p,i)=>corner(p,Q[(i+3)%4],Q[(i+1)%4],COL[i],a[i]+'°',fs(18)));
 txt(`${a.join(' + ')} = ${a.reduce((s,v)=>s+v,0)}°`,A.W/2,top+fs(14),13,K.fill)}
/* ---- input, drawing, controls ---- */
const kindOf=()=>['tear','find','special','quad','poly','quiz'][A.step];
function down(p){const k=kindOf();
 if(k==='tear'&&!G.won&&Math.hypot(p.x-G.top.x,p.y-G.top.y)<fs(34)){G.drag='top';return true}
 if(k==='quad'){if(Math.hypot(p.x-G.quad[2].x,p.y-G.quad[2].y)<fs(34)){G.drag='q';return true}if(!G.diag){diag();return true}}
 if(['find','special','poly'].includes(k)){const r=(G.tileHit||[]).find(r=>hit(p,r));if(r){choose(r.i);sync();return true}}
 return false}
function move(p){if(G.drag==='top'){place(p.x,p.y);G.bad=false;G.msg=`${triAngles().join('° + ')}° = 180°`;sync()}if(G.drag==='q'&&moveQ(p.x,p.y))qCheck()}
function up(){if(G.drag==='top')checkKinds();G.drag=null}
function draw(){X.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);X.fillRect(0,0,A.W,A.H);if(A.col.dark){X.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);X.fill()}
 const k=kindOf();if(k==='tear')drawTear();if(k==='find')drawFind();if(k==='special')drawSpecial();if(k==='quad')drawQuad();if(k==='poly')drawPoly();
 if(k==='quiz'){banner('Triangle: 180°. Quadrilateral: 360°. n sides: (n − 2) × 180°.');['50° + 60° + 70° = 180°','90° + 90° + 110° + 70° = 360°','hexagon: 4 × 180° = 720°, 720° ÷ 6 = 120°'].forEach((r,i)=>txt(r,A.W/2,A.H*.42+i*fs(30),14,K.fill))}
 note();A.fx.draw(X)}
function sync(){const k=kindOf();let d='Challenge.';
 if(k==='tear'&&G.top)d=`Triangle with angles ${triAngles().join(', ')} degrees, a ${kind()} triangle. Total 180. Kinds made: ${G.kinds.size} of 3.`;
 if(['find','special','poly'].includes(k)){const Q=round();d=`${Q.q||'Regular '+Q.name+', '+Q.n+' sides, '+(Q.n-2)+' triangles.'} Choices: ${Q.opts.map(o=>o[0]).join(', ')}. Done: ${G.done.join('; ')||'none'}.`}
 if(k==='quad'&&G.quad)d=`Quadrilateral with angles ${quadAngles().join(', ')} degrees, total 360. Diagonal ${G.diag?'drawn':'not drawn'}.`;
 tell((G.msg?G.msg+' ':'')+d);controls();G.after()}
function controls(){if(!pad)return;pad.innerHTML='';const k=kindOf(),b=(label,fn,aria)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':aria||null},pad,label).onclick=fn};
 if(k==='tear'&&!G.won){b('Pointy triangle',()=>preset('pointy'),'Make a pointy, acute triangle');b('Right-angled',()=>preset('right'),'Make a right-angled triangle');b('Wide triangle',()=>preset('wide'),'Make a wide, obtuse triangle')}
 if(['find','special','poly'].includes(k)&&!G.won)order().forEach(i=>{const lab=round().opts[i][0];b(lab,()=>{choose(i);sync()},`Answer ${lab}`)});
 if(k==='quad'&&!G.won){if(!G.diag)b('Draw a diagonal',diag,'Draw a diagonal from corner to corner');b('Make a kite',()=>qPreset('kite'),'Move the blue corner to make a kite shape');b('Make a trapezium',()=>qPreset('trap'),'Move the blue corner to make a trapezium shape')}
 A.redraw()}
const settle=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const id=++tok;fns.forEach((f,j)=>setTimeout(()=>{if(id===tok){f();sync()}},(j+1)*(A.reduced()?30:ms)))};
function reset(list,mode,endMsg){tok++;Object.assign(G,{after:()=>{},won:false,msg:'',bad:false,list:list||[],si:0,done:[],mode,endMsg:endMsg||'',kinds:new Set(),drag:null,diag:false,qmoved:0,quad:null,top:null,L:null})}
const steps=[
{h:'Tear off the corners',p:'Cut out any triangle, tear off its three corners and put them side by side. They always make a straight line: 180°.',
predict:{q:'A huge triangle and a tiny triangle. Whose angles add up to more?',opts:['The huge one','Both add up to 180°','The tiny one'],ans:1},
task:'Make a pointy, a right-angled and a wide triangle',show:()=>{steps[0].go();play([()=>preset('pointy'),()=>preset('right'),()=>preset('wide')],800)},go:()=>{reset(null,'tear');sync();G.after=settle(0,()=>G.won,'All three kinds add up to 180°.')}},
{h:'Find the missing angle',p:'Know two angles of a triangle? Add them, then take the total away from 180°.',
predict:{q:'Two angles of a triangle are 50° and 60°. What is the third?',opts:['110°','250°','70°'],ans:2},
task:'Find all three missing angles',show:()=>{steps[1].go();play(T.FIND.map(()=>()=>choose(0)),800)},go:()=>{reset(T.FIND,'find','180 − 24 − 121 = 35.');sync();G.after=settle(1,()=>G.won,'70°, 45° and 35°.')}},
{h:'Special triangles',p:'In an isosceles triangle the two angles at the ends of the equal sides are equal. In a right-angled triangle one angle is 90°, so the other two make 90°.',
predict:{q:'An isosceles triangle has a top angle of 40°. What is each base angle?',opts:['70°','140°','40°'],ans:0},
task:'Solve all three special triangles',show:()=>{steps[2].go();play(T.SPECIAL.map(()=>()=>choose(0)),800)},go:()=>{reset(T.SPECIAL,'special','180 − 65 − 65 = 50.');sync();G.after=settle(2,()=>G.won,'70°, 55° and 50°.')}},
{h:'Four-sided shapes',p:'A diagonal cuts any quadrilateral into two triangles. Each triangle gives 180°.',
predict:{q:'What do the four angles of any quadrilateral add up to?',opts:['180°','360°','It depends on the shape'],ans:1},
task:'Draw a diagonal and change the shape',show:()=>{steps[3].go();play([diag,()=>qPreset('kite'),()=>qPreset('trap')],800)},go:()=>{reset(null,'quad');sync();G.after=settle(3,()=>G.won,'Always 360°.')}},
{h:'Regular polygons',p:'Split a polygon into triangles from one corner. A shape with n sides makes n − 2 triangles. Share the total between the n equal angles.',
predict:{q:'A regular hexagon has 6 equal angles. How big is each one?',opts:['60°','180°','120°'],ans:2},
task:'Find each angle of three regular polygons',show:()=>{steps[4].go();play(T.POLY.map(()=>()=>choose(0)),800)},go:()=>{reset(T.POLY,'poly','Octagon: 6 × 180 = 1080, and 1080 ÷ 8 = 135.');sync();G.after=settle(4,()=>G.won,'108°, 120° and 135°.')}},
{h:'Challenge',p:'',go:()=>{reset(null,'quiz');ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>G.after()});
function why(tag){let m=T.WHY[tag]||'Add the angles you know and take them away from the total: 180° for a triangle, 360° for a quadrilateral.';
 if(tag==='added')m='That is the two angles added together. The three angles make 180°, so take that total away from 180°.';
 if(tag==='used360')m='360° is a full turn, the total for a quadrilateral. A triangle\u2019s angles make 180°, a straight line.';
 if(tag==='nTri')m='From one corner a shape with n sides splits into n − 2 triangles, not n. A hexagon makes 4 triangles: 720°.';
 return m}
function ask(){qi++;const [q,ans,wrongs]=T.bank[qi%T.bank.length],all=[[ans,'ok']].concat(wrongs),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>grade(tag,ans)});tell('Challenge: '+q);A.redraw()}
let streak=0;
function grade(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=tag==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+streak+'.':'✗ '+why(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;controls()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Triangle angle lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
