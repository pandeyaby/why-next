/* Flagship – 3-D shapes (ages 4–6): count a cube's faces, flat faces vs curved surfaces, name solids, paint prints, solids at home. */
(()=>{const NM=['cube','cuboid','sphere','cylinder','cone','pyramid'],FLAT={square:1,circle:1,rectangle:1,triangle:1};
/* face: p points, g part, c curved */
function box(a,b,d){const s=[a,b,d],o=[];for(let ax=0;ax<3;ax++)for(const sg of[-1,1]){const u=(ax+1)%3,w=(ax+2)%3;
 o.push({p:[[-1,-1],[1,-1],[1,1],[-1,1]].map(([x,y])=>{const v=[0,0,0];v[ax]=sg*s[ax];v[u]=x*s[u];v[w]=y*s[w];return v}),g:o.length,c:0})}return o}
const ring=(n,r,y)=>[...Array(n)].map((_,i)=>[r*Math.cos(i*2*Math.PI/n),y,r*Math.sin(i*2*Math.PI/n)]);
function solid(k){const N=20;let F=[];
 if(k==='cube')F=box(1,1,1);if(k==='cuboid')F=box(1.55,.75,.75);
 if(k==='pyramid'){const b=[[-1,-.9,-1],[1,-.9,-1],[1,-.9,1],[-1,-.9,1]],t=[0,1.1,0];F=[{p:b,g:0,c:0}];for(let i=0;i<4;i++)F.push({p:[b[i],b[(i+1)%4],t],g:i+1,c:0})}
 if(k==='cylinder'){const T=ring(N,1,1),B=ring(N,1,-1);F=[{p:T,g:0,c:0},{p:B,g:1,c:0}];for(let i=0;i<N;i++){const j=(i+1)%N;F.push({p:[T[i],T[j],B[j],B[i]],g:2,c:1})}}
 if(k==='cone'){const B=ring(N,1,-.9),t=[0,1.2,0];F=[{p:B,g:0,c:0}];for(let i=0;i<N;i++)F.push({p:[B[i],B[(i+1)%N],t],g:1,c:1})}
 if(k==='sphere'){const L=8,M=14,pt=(a,b)=>{const t=Math.PI*a/L,f=2*Math.PI*b/M;return[Math.sin(t)*Math.cos(f),Math.cos(t),Math.sin(t)*Math.sin(f)]};
  for(let a=0;a<L;a++)for(let b=0;b<M;b++)F.push({p:[pt(a,b),pt(a,b+1),pt(a+1,b+1),pt(a+1,b)],g:0,c:1})}
 F.forEach(f=>{const c=[0,1,2].map(i=>f.p.reduce((s,v)=>s+v[i],0)/f.p.length),a=f.p[0],b=f.p[1],d=f.p[2],u=[b[0]-a[0],b[1]-a[1],b[2]-a[2]],v=[d[0]-a[0],d[1]-a[1],d[2]-a[2]];
  let n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];const L=Math.hypot(...n)||1;n=n.map(x=>x/L);if(n[0]*c[0]+n[1]*c[1]+n[2]*c[2]<0)n=n.map(x=>-x);f.n=n;f.m=c});
 return F}
const MESH={};NM.forEach(k=>MESH[k]=solid(k));
const parts=k=>new Set(MESH[k].map(f=>f.g)).size;
VIS.reg('flagsolid',c=>{let A,ctl,chal,qi=-1,streak=0;c.fig.classList.add('young');
const S={};
const view=()=>['count','part','name','print','home','quiz'][A.step];
const tell=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const px=n=>Math.round(n*(A.narrow?1.05:1.2));
/* text in the theme text colour over pale fills: readable in both themes */
function word(g,s,x,y,n,wt){g.font=`${wt||700} ${px(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=A.col.tx;g.fillText(s,x,y,A.W-10)}
function tile(g,r,col,a,warn){g.fillStyle=A.alpha(col,a);A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.lineWidth=warn?4:2;g.strokeStyle=warn?A.col.rd:A.col.tx;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.stroke()}
const ln=(g,w)=>{g.lineWidth=w;g.strokeStyle=A.col.tx;g.stroke()},R=()=>A.redraw();
const poly=(g,q)=>{g.beginPath();q.forEach((P,i)=>{const[x,y]=P.x==null?P:[P.x,P.y];i?g.lineTo(x,y):g.moveTo(x,y)});g.closePath()};
const hit=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function inPoly(p,q){let o=false;for(let i=0,j=q.length-1;i<q.length;j=i++){const a=q[i],b=q[j];if((a.y>p.y)!==(b.y>p.y)&&p.x<(b.x-a.x)*(p.y-a.y)/(b.y-a.y)+a.x)o=!o}return o}
/* draw solid k turned by yaw, tipped by pitch; returns visible faces, nearest first */
function render(g,k,cx,cy,s,yaw,pit,col,marks){const C=A.col,cy_=Math.cos(yaw),sy=Math.sin(yaw),cp=Math.cos(pit),sp=Math.sin(pit);
 const rot=v=>{const x=v[0]*cy_+v[2]*sy,z=-v[0]*sy+v[2]*cy_,y=v[1];return[x,y*cp-z*sp,y*sp+z*cp]};
 const vis=[],all=[];MESH[k].forEach(f=>{const n=rot(f.n);const q=f.p.map(v=>{const r=rot(v);const P={x:cx+r[0]*s,y:cy-r[1]*s};all.push(P);return P});if(n[2]>.02)vis.push({f,q,nz:n[2],z:rot(f.m)[2],lam:Math.max(0,n[0]*-.35+n[1]*.55+n[2]*.76)})});
 vis.sort((a,b)=>a.z-b.z);
 for(const v of vis){const on=marks&&marks.has(v.f.g),fc=A.mix(C.pn,on?C.gr:col,(on?.45:.2)+.45*v.lam);g.fillStyle=fc;poly(g,v.q);g.fill();
  if(v.f.c){g.strokeStyle=fc;g.lineWidth=1}else{g.strokeStyle=C.tx;g.lineWidth=2}g.stroke()}
 poly(g,hull(all));ln(g,2.5);
 if(marks){const B={};vis.forEach(v=>{const k=v.f.g;if(marks.has(k)&&v.nz>.3&&(!B[k]||v.nz>B[k].nz))B[k]=v});
  for(const k in B){const q=B[k].q,m={x:q.reduce((a,P)=>a+P.x,0)/q.length,y:q.reduce((a,P)=>a+P.y,0)/q.length};const t=String(marks.get(+k));g.font=`800 ${px(14)}px system-ui,sans-serif`;const w=Math.max(px(26),g.measureText(t).width+px(14));g.fillStyle=C.pn;A.paint.rrect(m.x-w/2,m.y-px(13),w,px(26),px(13));g.fill();ln(g,2);word(g,t,m.x,m.y+1,14,800)}}
 return vis.reverse()}
function hull(P){P=P.slice().sort((a,b)=>a.x-b.x||a.y-b.y);const cr=(o,a,b)=>(a.x-o.x)*(b.y-o.y)-(a.y-o.y)*(b.x-o.x),lo=[],up=[];
 for(const p of P){while(lo.length>1&&cr(lo[lo.length-2],lo[lo.length-1],p)<=0)lo.pop();lo.push(p)}for(const p of P.reverse()){while(up.length>1&&cr(up[up.length-2],up[up.length-1],p)<=0)up.pop();up.push(p)}
 return lo.slice(0,-1).concat(up.slice(0,-1))}
function face(k,g){let b=[0,0,-9];const f=MESH[k].filter(f=>f.g===g);const n=f[Math.floor(f.length/2)].n;
 for(let y=0;y<24;y++)for(let p=-13;p<=13;p++){const a=y*Math.PI/12,t=p/10,z1=-n[0]*Math.sin(a)+n[2]*Math.cos(a),z=n[1]*Math.sin(t)+z1*Math.cos(t);if(z>b[2]+1e-6)b=[a,t,z]}return b}
const big=()=>({cx:A.W/2,cy:A.H*.47,s:Math.min(A.W,A.H)*(A.narrow?.24:.22)});
const ansR=i=>{const w=(A.W-40)/3;return{x:10+i*(w+10),y:A.H*.7,w,h:A.H*.27}};
function draw(A){const{ctx:g,W,H,col:C}=A,v=view();g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.05:.4);g.fillRect(0,0,W,H);
 if(v==='quiz'){word(g,'Flat faces print shapes',W/2,H*.28,19,800);word(g,'Curved surfaces roll',W/2,H*.46,19,800);word(g,'A ball is a sphere, not a circle',W/2,H*.64,17,700);return}
 if(v==='count'||v==='part'||v==='name'){const k=S.k,b=big();S.vis=render(g,k,b.cx,b.cy,b.s,S.yaw,S.pitch,v==='part'?C.cy:C.or,v==='name'?null:S.marks);
  if(v==='count')word(g,S.marks.size<6?`Faces found: ${S.marks.size} of 6`:'All 6 faces found!',W/2,H*.08,15,800);
  if(v==='part')word(g,S.round<2?`${k}: ${S.marks.size} of ${parts(k)} parts found`:'Both solids done!',W/2,H*.08,15,800);
  if(v==='name'){word(g,S.round<NAME.length?'What is it called? Pick below.':'All 6 named!',W/2,H*.08,15,800)}
  word(g,'Drag to turn it',W/2,H*.15,11,600)}
 if(v==='print'){const k=Math.min(S.round,PRINT.length-1),[sh,,ops]=PRINT[k],m={x:W/2,y:H*.36};const pr={x:W*.2,y:H*.13,w:W*.6,h:H*.48};tile(g,pr,C.pn,1,false);
  g.fillStyle=A.alpha(C.vi,.55);stamp(g,sh,m.x,m.y,Math.min(W,H)*.15);g.fill();ln(g,2);
  word(g,S.round<PRINT.length?'Which solid made this paint print?':'All 3 prints matched!',W/2,H*.07,14,800);
  if(S.round<PRINT.length)ops.forEach((o,i)=>mini(g,o,ansR(i),S.oops===o))}
 if(v==='home'){const k=Math.min(S.round,HOME.length-1),[ob,,ops]=HOME[k];thing(g,ob,W/2,H*.37,Math.min(W,H)*.16);
  word(g,S.round<HOME.length?`A ${ob}. Which solid is it like?`:'All 5 found!',W/2,H*.07,14,800);
  if(S.round<HOME.length)ops.forEach((o,i)=>mini(g,o,ansR(i),S.oops===o))}
 A.fx.draw(g)}
function mini(g,k,r,warn){tile(g,r,A.col.cy,.1,warn);render(g,k,r.x+r.w/2,r.y+r.h*.42,Math.min(r.w,r.h)*.26,.6,.42,A.col.or);word(g,k,r.x+r.w/2,r.y+r.h*.86,12,800)}
function stamp(g,sh,x,y,s){g.beginPath();if(sh==='circle')g.arc(x,y,s,0,7);if(sh==='tri'){g.moveTo(x,y-s);g.lineTo(x+s*1.05,y+s*.8);g.lineTo(x-s*1.05,y+s*.8);g.closePath()}if(sh==='long')g.rect(x-s*1.5,y-s*.7,s*3,s*1.4)}
function thing(g,o,x,y,s){const C=A.col,f=(c,a)=>{g.fillStyle=A.mix(C.pn,c,a);g.fill();ln(g,2.5)};
 const ell=(cx,cy,rx,ry)=>{g.beginPath();g.ellipse(cx,cy,rx,ry,0,0,7)};
 const blk=(w,h,d,c)=>{const X=x-w/2-d/2,Y=y-h/2+d/2;g.beginPath();g.rect(X,Y,w,h);f(c,.35);poly(g,[[X,Y],[X+d,Y-d],[X+w+d,Y-d],[X+w,Y]]);f(c,.55);poly(g,[[X+w,Y],[X+w+d,Y-d],[X+w+d,Y+h-d],[X+w,Y+h]]);f(c,.2);return[X,Y]};
 if(o==='tin'){g.beginPath();g.rect(x-s*.7,y-s,s*1.4,s*2);f(C.cy,.3);ell(x,y+s,s*.7,s*.22);f(C.cy,.3);g.beginPath();g.rect(x-s*.7,y-s*.35,s*1.4,s*.7);f(C.or,.45);ell(x,y-s,s*.7,s*.22);f(C.cy,.55)}
 if(o==='ball'){ell(x,y,s,s);f(C.rd,.3);g.beginPath();g.moveTo(x-s,y);g.quadraticCurveTo(x,y+s*.5,x+s,y);g.moveTo(x,y-s);g.quadraticCurveTo(x+s*.45,y,x,y+s);ln(g,2)}
 if(o==='dice'){const[X,Y]=blk(s*1.5,s*1.5,s*.5,C.pn);g.fillStyle=C.tx;[[.25,.25],[.75,.25],[.5,.5],[.25,.75],[.75,.75]].forEach(([a,b])=>{g.beginPath();g.arc(X+a*s*1.5,Y+b*s*1.5,s*.1,0,7);g.fill()})}
 if(o==='cereal box')blk(s*1.2,s*2,s*.45,C.or)
 if(o==='party hat'){poly(g,[[x,y-s*1.1],[x+s*.8,y+s*.8],[x-s*.8,y+s*.8]]);f(C.vi,.35);ell(x,y+s*.8,s*.8,s*.2);f(C.vi,.5);g.beginPath();g.arc(x,y-s*1.1,s*.14,0,7);f(C.or,.6)}}
const NAME=[['cube',['cube','cuboid','square']],['sphere',['sphere','circle','cylinder']],['cylinder',['cylinder','cone','circle']],['cuboid',['cuboid','cube','rectangle']],['cone',['cone','pyramid','triangle']],['pyramid',['pyramid','cone','triangle']]];
const PRINT=[['tri','pyramid',['pyramid','cone','cylinder']],['circle','cylinder',['sphere','cylinder','cube']],['long','cuboid',['cube','cone','cuboid']]];
const HOME=[['tin','cylinder',['cylinder','cuboid','sphere']],['ball','sphere',['cylinder','sphere','cone']],['dice','cube',['cuboid','pyramid','cube']],['cereal box','cuboid',['cuboid','cube','cylinder']],['party hat','cone',['pyramid','cone','sphere']]];
const nameOpts=()=>{const o=NAME[S.round][1],r=S.round%3;return o.slice(r).concat(o.slice(0,r))};
function mixUp(pick,right){if(FLAT[pick])return`A ${pick} is flat, like a drawing. This is solid: you can hold it. It is a ${right}.`;
 const P=[pick,right].sort().join();
 if(P==='cube,cuboid')return right==='cube'?'All 6 faces are the same square, so it is a cube.':'It is long, with some faces that are not squares. A stretched cube is a cuboid.';
 if(P==='cone,pyramid')return right==='cone'?'It has a round flat face and a curved side. That is a cone.':'Its sides are flat triangles that meet at a point. That is a pyramid.';
 if(P==='cone,cylinder')return right==='cone'?'It comes to a point at the top. That is a cone.':'It has a circle at both ends and no point. That is a cylinder.';
 if(P==='cylinder,sphere')return right==='sphere'?'It is round all over, with no flat faces. That is a sphere.':'It has 2 flat circle faces, so it is a cylinder, not a sphere.';
 if(pick==='sphere')return'A sphere has no flat face at all, so it cannot print a shape.';
 if(right==='pyramid')return`A ${pick} has no triangle face. A pyramid has triangle faces.`;
 return`Look at the faces: this is a ${right}.`}
const bad=(t,mark)=>{S.oops=mark;A.sound.miss();tell(t);R()},good=t=>{S.oops=null;A.sound.pop();tell(t);pad();R();S.want()};
/* step 0 and 1: tap a part */
function tapPart(gk){const v=view(),k=S.k;if(v==='count'){if(S.marks.has(gk))return tell(`Face ${S.marks.get(gk)} is found. Turn to find a new one.`);S.marks.set(gk,S.marks.size+1);A.sound.tick();
  if(S.marks.size<6){tell(`Face ${S.marks.size}: a flat square. Turn to find more.`);return R()}return good('6 flat faces! You only see 3 at a time, so you have to turn it.')}
 if(v==='part'&&S.round<2){const f=MESH[k].find(f=>f.g===gk);if(!f)return;if(S.marks.has(gk))return tell('Found that one. Try another part.');S.marks.set(gk,f.c?'curved':'flat');A.sound.tick();
  const say=f.c?'A curved surface. It is round, so it can roll.':'A flat face. It is a circle.';if(S.marks.size<parts(k)){tell(say);return R()}
  S.round++;if(S.round<2){const q=S.tok;setTimeout(()=>{if(q!==S.tok)return;S.k='cone';S.marks=new Map();Object.assign(S,{yaw:.5,pitch:-.35});tell('Now a cone. Find its flat face and its curved surface.');pad();R()},A.reduced()?5:600)}
  good(S.round<2?`${say} The cylinder has 2 flat faces and 1 curved surface.`:`${say} The cone has 1 flat face and 1 curved surface.`)}}
function pickFront(){const v=S.vis&&S.vis.filter(v=>view()!=='count'||!S.marks.has(v.f.g)).sort((a,b)=>b.nz-a.nz)[0];if(v)tapPart(v.f.g)}
function turn(dy,dp){A.tween(S,{yaw:S.yaw+dy,pitch:Math.max(-1.4,Math.min(1.4,S.pitch+dp))},350)}
function bring(gk){let[a,t]=face(S.k,gk);t=t>1?t-.3:t<-1?t+.3:t+.35;let y=a+.5;while(y-S.yaw>Math.PI)y-=2*Math.PI;while(S.yaw-y>Math.PI)y+=2*Math.PI;const k=S.tok;A.tween(S,{yaw:y,pitch:t},500,'io',()=>{if(k===S.tok)tapPart(gk)})}
/* step 2, 3, 4: pick */
function pickName(o){if(S.round>=NAME.length)return;const r=NAME[S.round][0];if(o!==r)return bad(mixUp(o,r),o);S.round++;
 if(S.round<NAME.length){const n=NAME[S.round][0],q=S.tok;setTimeout(()=>{if(q!==S.tok)return;S.k=n;S.yaw=.6;S.pitch=.42;pad();R()},A.reduced()?5:500)}good(`Yes! It is a ${r}.`)}
function pickSolid(o){const v=view(),L=v==='print'?PRINT:HOME;if(S.round>=L.length)return;const[sh,r]=L[S.round];
 if(o!==r){if(v==='print'){const m={cone:'A cone looks like a triangle from the side, but its flat face is a circle.',cube:sh==='long'?'A cube only has squares. This print is long, so it came from a cuboid.':'A cube has square faces, so it prints a square.',cylinder:'A cylinder has circle faces, so it prints a circle.'}[o];return bad(m||mixUp(o,r),o)}return bad(mixUp(o,r),o)}
 S.round++;good(v==='print'?`Yes! The ${r} made it.`+(sh==='circle'?' A sphere has no flat face.':''):`Yes! A ${sh} is like a ${r}.`)}
function pad(){if(!ctl)return;ctl.innerHTML='';const v=view(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};
 if(v==='count'||v==='part'||v==='name'){B('Turn left',()=>turn(-.5,0));B('Turn right',()=>turn(.5,0));B('Tip up',()=>turn(0,.4));B('Tip down',()=>turn(0,-.4))}
 if((v==='count'&&S.marks.size<6)||(v==='part'&&S.round<2))B('Tap the front part',pickFront,'Tap the part of the solid facing you');
 if(v==='name'&&S.round<NAME.length)nameOpts().forEach(o=>B(o,()=>pickName(o)));
 if(v==='print'&&S.round<PRINT.length)PRINT[S.round][2].forEach(o=>B(o,()=>pickSolid(o)));
 if(v==='home'&&S.round<HOME.length)HOME[S.round][2].forEach(o=>B(o,()=>pickSolid(o)))}
function down(p){const v=view();S.p0=p;S.y0=S.yaw;S.t0=S.pitch;S.moved=0;
 if(v==='count'||v==='part'||v==='name')return true;
 if(v==='print'||v==='home'){const L=v==='print'?PRINT:HOME;if(S.round<L.length)L[S.round][2].forEach((o,i)=>{if(hit(p,ansR(i)))pickSolid(o)})}return false}
function move(p){const dx=p.x-S.p0.x,dy=p.y-S.p0.y;if(Math.hypot(dx,dy)>6)S.moved=1;if(!S.moved)return;S.yaw=S.y0+dx/90;S.pitch=Math.max(-1.4,Math.min(1.4,S.t0+dy/90));R()}
function up(p){if(S.moved){tell(`You turned the ${S.k}.`);return}const v=view();
 const f=(S.vis||[]).find(v=>inPoly(p,v.q));if(f)tapPart(f.f.g)}
const check=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const k=++S.tok;fns.forEach((fn,j)=>setTimeout(()=>{if(k===S.tok)fn()},A.reduced()?j*30+30:(j+1)*ms))};
const reset=k=>{const t=(S.tok||0)+1;Object.keys(S).forEach(k=>delete S[k]);Object.assign(S,{tok:t,want:()=>{},k:k||'cube',yaw:.6,pitch:.42,marks:new Map(),round:0,oops:null,vis:[]})};
const steps=[
{h:'Count the faces',p:'A cube is solid. You can hold it. Drag to turn it. Tap each flat face once.',predict:{q:'How many flat faces does a cube have?',opts:['6','3','4'],ans:0},task:'Find all 6 faces',
 show:()=>{steps[0].go();play([0,1,2,3,4,5].map(g=>()=>bring(g)),700)},
 go:()=>{reset('cube');tell('A cube. Tap a flat face. Drag to turn it.');pad();S.want=check(0,()=>S.marks.size>=6,'A cube has 6 flat square faces.')}},
{h:'Flat or curved?',p:'Some parts are flat. Some parts are curved. Tap each part of the solid.',predict:{q:'How many flat faces does a cylinder have?',opts:['2','0','1'],ans:0},task:'Find every part of 2 solids',
 show:()=>{steps[1].go();play([()=>bring(0),()=>bring(1),()=>bring(2),()=>{},()=>bring(0),()=>bring(1)],650)},
 go:()=>{reset('cylinder');S.pitch=.5;tell('A cylinder. Tap its top, its side and its bottom.');pad();S.want=check(1,()=>S.round>=2,'A cylinder has 2 flat circles. A cone has 1. Their curved surfaces roll.')}},
{h:'Name the solid',p:'Look at the faces. Drag to turn it if you need to. Then pick its name.',task:'Name 6 solids',
 show:()=>{steps[2].go();play(NAME.map(([n])=>()=>pickName(n)),750)},
 go:()=>{reset('cube');tell('What is this solid called?');pad();S.want=check(2,()=>S.round>=NAME.length,'Cube, sphere, cylinder, cuboid, cone, pyramid.')}},
{h:'Paint prints',p:'Dip a flat face in paint and press it on paper. The print is a flat shape.',predict:{q:'Which solid can print a triangle?',opts:['A pyramid','A cone','A cylinder'],ans:0},task:'Match 3 prints',
 show:()=>{steps[3].go();play(PRINT.map(([,r])=>()=>pickSolid(r)),800)},
 go:()=>{reset();tell('A triangle print. Which solid made it?');pad();S.want=check(3,()=>S.round>=PRINT.length,'Flat faces make prints. A sphere has none.')}},
{h:'Solids at home',p:'Things at home are solids too. Pick the solid each thing is like.',task:'Find 5 solids',
 show:()=>{steps[4].go();play(HOME.map(([,r])=>()=>pickSolid(r)),800)},
 go:()=>{reset();tell('A tin. Which solid is it like?');pad();S.want=check(4,()=>S.round>=HOME.length,'A tin is a cylinder and a ball is a sphere.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Which solid has 6 faces that are all the same square?',[['A cube','ok'],['A cuboid','cuboid'],['A square','flat']]],
 ['A ball is a…',[['sphere','ok'],['circle','flat'],['cylinder','ends']]],
 ['How many flat faces does a cylinder have?',[['2','ok'],['0','round'],['1','one']]],
 ['What shape is the flat face of a cone?',[['A circle','ok'],['A triangle','side'],['It has none','round']]],
 ['You can see 3 faces of a dice. How many faces does it have?',[['6','ok'],['3','seen'],['4','guess']]],
 ['Which solid has triangle faces that meet at a point?',[['A pyramid','ok'],['A cone','cone'],['A cube','cube']]]];
function hintFor(t){let m='Look at the faces: flat or curved?';
 if(t==='cuboid')m='A cuboid is a stretched cube. Some of its faces are long rectangles, not squares.';
 if(t==='flat')m='That is a flat shape, like a drawing. A solid you can hold has its own name.';
 if(t==='ends')m='A cylinder has 2 flat circle ends. A ball is round all over: a sphere.';
 if(t==='round')m='Round solids can still have flat faces. A cylinder has 2 flat circles and a cone has 1.';
 if(t==='one')m='Look at both ends. A cylinder has a flat circle at the top and at the bottom: 2.';
 if(t==='side')m='From the side a cone looks like a triangle, but its flat face is a circle.';
 if(t==='seen')m='3 faces are hiding at the back and the bottom. Turn it: a dice has 6.';
 if(t==='guess')m='Count them all: top, bottom, front, back and 2 sides. That is 6.';
 if(t==='cone')m='A cone has a curved surface, not triangle faces. A pyramid has flat triangles.';
 if(t==='cube')m='A cube has square faces and no point on top.';
 return m}
function ask(){qi++;const[q,ops]=QS[qi%QS.length],rot=qi%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);R()}
function mark(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?'Yes, that’s right. In a row: '+streak+'.':'Not this time. '+hintFor(t))+' <button type="button" class="linkish">Another question</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;pad()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});pad()}});
A.start()})})();
