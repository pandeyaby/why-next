/* Flagship: combining simple shapes (ages 5-6; CCSS K.G.6 "compose simple shapes to form larger shapes", e.g. two
   triangles with full sides touching make a rectangle). Turn two triangles to fill a rectangle, join pieces and name the
   new shape, fill a hexagon with pattern blocks two ways, build a house picture, and see that only full sides touching
   make one new shape. Not flagshape (sides and corners), flagfit (shape sorter) or flagtiles (area). */
(()=>{const mn=Math.min,mx=Math.max,PI=Math.PI,SF='system-ui,sans-serif';
const COL={tri:'#16a34a',rho:'#2563eb',trap:'#dc2626',sq:'#ea580c',hex:'#facc15',rect:'#7c3aed',circ:'#eab308'};
const JOIN=[{say:'two squares',ps:[[[0,0],[1,0],[1,1],[0,1]],[[1,0],[2,0],[2,1],[1,1]]],off:[[-.4,0],[.4,0]],c:'sq',o:[['A rectangle','ok'],['A bigger square','bigsq'],['A triangle','tri']]},
{say:'two triangles',ps:[[[0,0],[0,1],[-1,1]],[[0,0],[1,1],[0,1]]],off:[[-.4,0],[.4,0]],c:'tri',o:[['A bigger triangle','ok'],['A square','sqr'],['A rectangle','sqr']]},
{say:'four squares',ps:[[[0,0],[1,0],[1,1],[0,1]],[[1,0],[2,0],[2,1],[1,1]],[[0,1],[1,1],[1,2],[0,2]],[[1,1],[2,1],[2,2],[1,2]]],off:[[-.3,-.3],[.3,-.3],[-.3,.3],[.3,.3]],c:'rho',o:[['A bigger square','ok'],['A long rectangle','rect4'],['Four shapes, not one','four']]}];
const BLK=[['triangle','tri',1],['rhombus','rho',2],['trapezoid','trap',3],['square','sq',0]];
const HOUSE=[['wall','square'],['roof','triangle'],['door','rectangle'],['sun','circle']];
const HAS={square:'4 equal sides',triangle:'3 sides',rectangle:'2 long and 2 short sides',circle:'no corners at all'};
const TCH=[{a:[[0,0],[1,0],[1,1],[0,1]],b:[[0,0],[1,0],[1,1],[0,1]],side:[1,0],gap:[1.5,0],corner:[1,1],c:'sq',name:'a rectangle'},
{a:[[0,0],[0,1],[1,1]],b:[[0,0],[1,0],[1,1]],side:[0,0],gap:[.55,-.55],corner:[1,1],c:'tri',name:'a square'}];
VIS.reg('flagcompose',c=>{let A,pad,quiz,qn=-1,run=0;const S={};c.fig.classList.add('young');
const INK='#0f172a',YES='#047857',NOPE='#b91c1c',RIM='#475569',PICK='#6d28d9';
const ft=(n,w)=>`${w||800} ${n}px ${SF}`,big=n=>A.narrow?n:Math.round(n*1.2),no=()=>A.sound.miss(),yes=()=>A.sound.pop();
const kind=()=>['turn','join','hex','pic','touch','chal'][A.step];
const ctr=g=>{g.textAlign='center';g.textBaseline='middle'};
const inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function bg(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#ecfccb',A.col.dark?.06:.4);g.fillRect(0,0,A.W,A.H)}
function chip(t,x,y,o){o=o||{};const g=A.ctx;let n=big(o.n||14);g.font=ft(n);let w=g.measureText(t).width+22;while(w>A.W-10&&n>10){n--;g.font=ft(n);w=g.measureText(t).width+22}
const h=n+14,l=mx(5,mn(A.W-w-5,x-w/2));g.fillStyle='#fff';A.paint.rrect(l,y-h/2,w,h,12);g.fill();g.lineWidth=o.ok||o.bad?3:1.5;g.strokeStyle=o.ok?YES:o.bad?NOPE:RIM;g.stroke();ctr(g);g.fillStyle=INK;g.fillText(t,l+w/2,y+1)}
function poly(P,fill,o){o=o||{};const g=A.ctx;g.beginPath();P.forEach((q,i)=>i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1]));g.closePath();if(fill){g.fillStyle=fill;g.fill()}
g.setLineDash(o.dash?[7,6]:[]);g.lineWidth=o.lw||2.5;g.strokeStyle=o.edge||(A.col.dark&&!fill?'#cbd5e1':INK);g.stroke();g.setLineDash([])}
const at=(P,x,y,u)=>P.map(q=>[x+q[0]*u,y+q[1]*u]);
/* 1. turn two triangles to fill a rectangle */
const box=()=>{const w=mn(A.W*.36,250),h=w*.6;return{x:A.W/2-w/2,y:A.H*.1,w,h}};
const slot=(B,i)=>i?[[B.x,B.y],[B.x+B.w,B.y],[B.x+B.w,B.y+B.h]]:[[B.x,B.y],[B.x,B.y+B.h],[B.x+B.w,B.y+B.h]];
const home=i=>({x:A.W*(i?.7:.3),y:A.H*.66});
function tri(cx,cy,k){const B=box(),P=[[0,0],[0,B.h],[B.w,B.h]].map(q=>[q[0]-B.w/3,q[1]-B.h*2/3]),a=k*PI/2;return P.map(q=>[cx+q[0]*Math.cos(a)-q[1]*Math.sin(a),cy+q[0]*Math.sin(a)+q[1]*Math.cos(a)])}
function drawTurn(){const s=S.t,B=box();bg();poly(slot(B,0),null,{dash:1});poly(slot(B,1),null,{dash:1});s.in.forEach((v,j)=>{if(v!=null)poly(slot(B,j),[COL.tri,COL.rect][v])});
if(s.in.every(v=>v!=null))chip('A rectangle!',A.W/2,B.y+B.h+22,{ok:1});else chip('Fill the rectangle',A.W/2,B.y+B.h+22,{n:13});
[0,1].forEach(i=>{if(s.in.includes(i))return;const d=S.drag&&S.drag.i===i?S.drag:home(i);poly(tri(d.x,d.y,s.rot[i]),[COL.tri,COL.rect][i],{edge:s.bad===i?NOPE:S.drag&&S.drag.i===i?PICK:INK,lw:s.bad===i?4:2.5});
if(!S.drag)chip('Tap to turn',home(i).x,A.H*.95,{n:11})})}
function turn(i){const s=S.t;if(s.in.includes(i))return;s.rot[i]=(s.rot[i]+1)%4;s.bad=null;A.sound.tick();say(`Triangle ${i+1} turned. `+(s.rot[i]%2?'Its long side now stands up.':'Its long side lies flat now.'))}
function putIn(i){const s=S.t;if(s.in.includes(i))return;const r=s.rot[i]%4,j=r===0?0:r===2?1:-1;
if(j<0||s.in[j]!=null){s.bad=i;no();return say(j<0?'It is on its side, so it does not fit. Tap it to turn it, then try again.':'That half is full. Turn this triangle round to fit the other half.')}
s.in[j]=i;s.bad=null;yes();say(s.in.every(v=>v!=null)?'Two triangles, with their long sides touching, make a rectangle.':'It fits! Now the other triangle.')}
/* 2. join and name */
const unit=()=>mn(A.W*.17,A.H*.2);
function drawJoin(){const s=S.j,g=A.ctx;bg();if(s.k>=3){chip('Rectangle, bigger triangle, bigger square',A.W/2,A.H*.4,{ok:1,n:13});return}
const R=JOIN[s.k],u=unit()*(s.j>=1&&A.narrow?.8:1),xs=R.ps.flat().map(q=>q[0]),ys=R.ps.flat().map(q=>q[1]),x0=A.W/2-(mn(...xs)+mx(...xs))/2*u,y0=A.H*(s.j>=1&&A.narrow?.34:.4)-(mn(...ys)+mx(...ys))/2*u;
R.ps.forEach((P,i)=>poly(at(P,x0+R.off[i][0]*u*(1-s.j),y0+R.off[i][1]*u*(1-s.j),u),COL[R.c],{edge:'#fff',lw:2}));
if(s.j>=1){poly(at(hull(R.ps),x0,y0,u),null,{lw:4,edge:A.col.dark?'#fff':INK});chip('What shape is it now?',A.W/2,A.H*.08,{n:13});names().forEach(r=>chip(R.o[r.i][0],r.x,r.y,{bad:s.bad===r.i,n:12}))}
else chip(`${s.k+1} of 3: tap or drag to join ${R.say}`,A.W/2,A.H*.08,{n:13})}
function hull(ps){const pts=ps.flat(),xs=pts.map(q=>q[0]),ys=pts.map(q=>q[1]),a=mn(...xs),b=mx(...xs),t=mn(...ys),d=mx(...ys);
return pts.some(q=>q[0]<0)?[[0,t],[b,d],[a,d]]:[[a,t],[b,t],[b,d],[a,d]]}
const names=()=>[0,1,2].map(i=>A.narrow?{i,x:A.W/2,y:A.H*(.68+.1*i),hw:A.W*.3}:{i,x:A.W*(.2+.3*i),y:A.H*.86,hw:A.W*.14});
function join(){const s=S.j;if(s.k>=3||s.j>0)return;A.sound.whoosh();A.tween(s,{j:1},600,'out',()=>say('Joined, with full sides touching. What shape is it now?'))}
function nameIt(i){const s=S.j;if(s.k>=3||s.j<1)return;const t=JOIN[s.k].o[i][1];if(t!=='ok'){s.bad=i;no();return say(why(t))}
s.k++;s.j=0;s.bad=null;yes();say(['Yes: two squares side by side make a rectangle, not a bigger square.','Yes: two triangles make a bigger triangle.','Yes: four squares make one bigger square.'][s.k-1])}
/* 3. fill the hexagon */
const hexC=()=>({x:A.W/2,y:A.H*.38,r:mn(A.W*.28,A.H*.3)});
const vtx=(H,i)=>[H.x+H.r*Math.cos(i*PI/3),H.y+H.r*Math.sin(i*PI/3)];
const tiles=()=>{const w=(A.W-50)/4,h=mn(78,A.H*.16);return BLK.map((b,i)=>({i,x:10+i*(w+10),y:A.H-h-8,w,h}))};
function drawHex(){const s=S.h,H=hexC(),g=A.ctx;bg();poly([0,1,2,3,4,5].map(i=>vtx(H,i)),A.col.dark?'#422006':'#fef9c3',{dash:1});
let w=0;s.cur.forEach(n=>{const P=[[H.x,H.y]];for(let i=0;i<=n;i++)P.push(vtx(H,w+i));poly(P,COL[BLK[n-1][1]],{edge:'#fff',lw:3});w+=n});
chip(`Ways found: ${s.ways.size} of 2`,A.W/2,A.H*.05,{n:12,ok:s.ways.size>=2});
tiles().forEach(r=>{g.fillStyle='#fff';A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=s.bad===r.i?4:2;g.strokeStyle=s.bad===r.i?NOPE:RIM;g.stroke();
const b=BLK[r.i],m={x:r.x+r.w/2,y:r.y+r.h*.42,r:mn(r.w,r.h)*.3};const Q=b[2]?[[m.x,m.y+m.r*.4]].concat([...Array(b[2]+1)].map((_,i)=>[m.x+m.r*Math.cos(PI+i*PI/3),m.y+m.r*.4+m.r*Math.sin(PI+i*PI/3)])):[[m.x-m.r*.6,m.y-m.r*.6],[m.x+m.r*.6,m.y-m.r*.6],[m.x+m.r*.6,m.y+m.r*.6],[m.x-m.r*.6,m.y+m.r*.6]];
poly(Q,COL[b[1]],{lw:1.5});g.font=ft(mn(big(12),r.w/7));ctr(g);g.fillStyle=INK;g.fillText(b[0],r.x+r.w/2,r.y+r.h*.84)})}
function add(i){const s=S.h,[nm,,n]=BLK[i];let used=s.cur.reduce((a,b)=>a+b,0);if(used>=6){s.cur=[];used=0}
if(!n){s.bad=i;no();return say('A square has square corners. They do not fit the corners of the hexagon, so a square leaves gaps.')}
if(used+n>6){s.bad=i;no();return say(`Only ${6-used} small triangle${6-used>1?'s':''} of space left. A ${nm} needs ${n}. Try a smaller block.`)}
s.cur.push(n);s.bad=null;yes();used+=n;if(used<6)return say(`A ${nm} in. ${6-used} small triangle${6-used>1?'s':''} of space left.`);
const key=s.cur.slice().sort().join('');const fresh=!s.ways.has(key);s.ways.add(key);
say((fresh?'The hexagon is full: no gaps, no overlaps. ':'Full, but you filled it this way before. ')+(s.ways.size>=2?'Two different ways make the same hexagon.':'Tap a block to start again and try a new way.'))}
/* 4. build a picture */
const pic=()=>{const q=mn(A.W*.3,A.H*.34),x=A.W*(A.narrow?.3:.32)-q/2,y=A.H*.42;return{q,wall:{x,y,w:q,h:q},roof:{x:x-q*.1,y:y-q*.6,w:q*1.2,h:q*.6},door:{x:x+q*.35,y:y+q*.45,w:q*.3,h:q*.55},sun:{x:x+q*1.2,y:A.H*.06,w:q*.44,h:q*.44}}};
const cardR=()=>{const w=mn(150,A.W*.3);return{x:A.W-w-10,y:A.H*.55,w,h:w*.9}};
function shapeIn(k,r,fill,o){const g=A.ctx;if(k==='triangle')poly([[r.x,r.y+r.h],[r.x+r.w/2,r.y],[r.x+r.w,r.y+r.h]],fill,o);else if(k==='circle'){g.beginPath();g.arc(r.x+r.w/2,r.y+r.h/2,mn(r.w,r.h)/2,0,7);if(fill){g.fillStyle=fill;g.fill()}g.setLineDash(o&&o.dash?[7,6]:[]);g.lineWidth=2.5;g.strokeStyle=fill?INK:A.col.dark?'#cbd5e1':INK;g.stroke();g.setLineDash([])}
else poly([[r.x,r.y],[r.x+r.w,r.y],[r.x+r.w,r.y+r.h],[r.x,r.y+r.h]],fill,o)}
const PF={wall:COL.sq,roof:COL.trap,door:COL.rect,sun:COL.circ};
function drawPic(){const s=S.p,P=pic();bg();HOUSE.forEach(([k,sh],j)=>shapeIn(sh,P[k],j<s.k?PF[k]:null,{dash:j>=s.k}));
if(s.k<4){const r=cardR(),d=S.drag,sh=HOUSE[s.k][1],q={x:r.x+r.w*.2,y:r.y+r.h*.12,w:r.w*.6,h:sh==='rectangle'?r.h*.6:r.w*.5};if(sh==='rectangle'){q.x=r.x+r.w*.35;q.w=r.w*.3}
const dx=d?d.x-r.x-r.w/2:0,dy=d?d.y-r.y-r.h/2:0;chip(`Shape ${s.k+1} of 4: a ${sh}`,r.x+r.w/2,r.y-16,{n:11,bad:s.bad});shapeIn(sh,{...q,x:q.x+dx,y:q.y+dy},PF[HOUSE[s.k][0]])}else chip('Picture made from 4 shapes',A.W/2,A.H*.95,{ok:1})}
function hitPic(p){const P=pic();return['door','sun','roof','wall'].find(k=>inR(p,P[k]))}
function placePic(k){const s=S.p;if(s.k>=4||!k)return;const [want,sh]=HOUSE[s.k];if(k!==want){const need=HOUSE.find(h=>h[0]===k)[1];s.bad=1;no();return say(`The ${k} space is a ${need}. A ${sh} has ${HAS[sh]}, so it does not fit there.`)}
s.k++;s.bad=0;yes();say(`Yes: the ${sh} makes the ${k}.`+(s.k>=4?' Four simple shapes make one picture.':''))}
/* 5. full sides touching */
function drawTouch(){const s=S.c,g=A.ctx;bg();if(s.k>=2){chip('Full sides touching: one new shape',A.W/2,A.H*.4,{ok:1,n:13});return}
const R=TCH[s.k],u=mn(A.W*.2,A.H*.26),x0=A.W*.3,y0=A.H*.3,d=S.drag,o=d?[(d.x-x0)/u-.5,(d.y-y0)/u-.5]:R[s.spot];
poly(at(R.a,x0,y0,u),COL[R.c],{edge:'#fff',lw:3});poly(at(R.b,x0+o[0]*u,y0+o[1]*u,u),COL.rho,{edge:s.bad?NOPE:'#fff',lw:3});
chip(s.ok?`One new shape: ${R.name}!`:`${s.k+1} of 2: drag the blue piece to make one new shape`,A.W/2,A.H*.07,{n:13,ok:s.ok})}
function touch(spot){const s=S.c;if(s.k>=2)return;s.spot=spot;
if(spot!=='side'){s.bad=1;no();return say(spot==='gap'?'There is a gap between them. They are not joined, so they are still two shapes.':'They only touch at one corner. Slide them so a whole side touches.')}
s.bad=0;s.ok=1;yes();const nm=TCH[s.k].name;say(`A full side touches, so they make ${nm}.`);const r0=run;setTimeout(()=>{if(r0!==run)return;s.k++;s.ok=0;s.spot='gap';say(s.k>=2?'Shapes join when full sides touch.':'Now try two triangles.')},A.reduced()?50:900)}
function draw(){const k=kind();if(k==='chal'){bg();const u=mn(A.W*.14,A.H*.2);JOIN[0].ps.forEach(P=>poly(at(P,A.W/2-u,A.H*.4,u),COL.sq,{edge:'#fff'}));chip('Challenge',A.W/2,A.H*.2,{n:18});return}
({turn:drawTurn,join:drawJoin,hex:drawHex,pic:drawPic,touch:drawTouch})[k]();A.fx.draw(A.ctx)}
function down(p){const k=kind(),B=box();
if(k==='turn'){const i=[0,1].find(i=>!S.t.in.includes(i)&&Math.hypot(p.x-home(i).x,p.y-home(i).y)<B.w*.5);if(i!=null){S.drag={i,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}return false}
if(k==='join'){if(S.j.j>=1){const r=names().find(r=>Math.abs(p.x-r.x)<r.hw&&Math.abs(p.y-r.y)<20);if(r)nameIt(r.i)}else join();return false}
if(k==='hex'){const r=tiles().find(r=>inR(p,r));if(r)add(r.i);return false}
if(k==='pic'&&S.p.k<4){if(inR(p,cardR())){S.drag={x:p.x,y:p.y};return true}placePic(hitPic(p));return false}
if(k==='touch'&&S.c.k<2&&!S.c.ok){S.drag={x:p.x,y:p.y};A.redraw();return true}return false}
function move(p){if(!S.drag)return;S.drag.x=p.x;S.drag.y=p.y;A.redraw()}
function up(p){const d=S.drag;if(!d)return;S.drag=null;const k=kind();
if(k==='turn'){const B=box();if(Math.hypot(p.x-d.x0,p.y-d.y0)<10)turn(d.i);else if(p.x>B.x-30&&p.x<B.x+B.w+30&&p.y>B.y-30&&p.y<B.y+B.h+30)putIn(d.i);else A.redraw()}
if(k==='pic'){const h=hitPic(p);if(h)placePic(h);else A.redraw()}
if(k==='touch'){const R=TCH[S.c.k],u=mn(A.W*.2,A.H*.26),q=[(p.x-A.W*.3)/u-.5,(p.y-A.H*.3)/u-.5];let best='gap',bd=1e9;['side','gap','corner'].forEach(t=>{const e=Math.hypot(q[0]-R[t][0],q[1]-R[t][1]);if(e<bd){bd=e;best=t}});touch(best)}}
function reset(){run++;for(const k in S)delete S[k];Object.assign(S,{t:{rot:[1,3],in:[null,null],bad:null},j:{k:0,j:0,bad:null},h:{cur:[],ways:new Set(),bad:null},p:{k:0,bad:0},c:{k:0,spot:'gap',bad:0,ok:0},drag:null,hook:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();pads();S.hook()}
const when=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,desc,ok,msg){reset();say(desc);S.hook=when(i,ok,msg)}
function auto(i,acts,ms){steps[i].go();const r0=run;acts.forEach((f,j)=>setTimeout(()=>{if(r0===run)f()},ms*(j+1)))}
function pads(){if(!pad)return;pad.innerHTML='';const k=kind(),B=(t,f)=>{c.el('button',{type:'button',class:'lbtn'},pad,t).onclick=f};
if(k==='turn')[0,1].forEach(i=>{if(!S.t.in.includes(i)){B(`↻ Turn triangle ${i+1}`,()=>turn(i));B(`Put triangle ${i+1} in`,()=>putIn(i))}});
if(k==='join'&&S.j.k<3){if(S.j.j<1)B(`Join the ${JOIN[S.j.k].say}`,join);else JOIN[S.j.k].o.forEach((o,i)=>B(o[0],()=>nameIt(i)))}
if(k==='hex')BLK.forEach((b,i)=>B(`Add a ${b[0]}`,()=>add(i)));
if(k==='pic'&&S.p.k<4)HOUSE.forEach(h=>B(`${HOUSE[S.p.k][1]}: the ${h[0]}`,()=>placePic(h[0])));
if(k==='touch'&&S.c.k<2&&!S.c.ok)[['gap','Leave a gap'],['corner','Touch at a corner'],['side','Touch along a full side']].forEach(([v,t])=>B(t,()=>touch(v)))}
const steps=[
{h:'Turn to fit',p:'Two triangles are the same. Tap a triangle to turn it. Drag it into the rectangle when it fits.',
predict:{q:'Can two triangles make a rectangle?',opts:['No, a rectangle is not made of triangles','Yes, if they fit side to side'],ans:1},task:'Fill the rectangle with both triangles',
show:()=>auto(0,[()=>turn(0),()=>putIn(0),()=>turn(1),()=>putIn(1)],600),
go:()=>begin(0,'An empty rectangle and two triangles lying on their sides.',()=>S.t.in.every(v=>v!=null),'Two triangles, turned the right way, fill a rectangle.')},
{h:'Join and name',p:'Tap the pieces to push them together. Then say what new shape they make.',
predict:{q:'Two squares side by side. What do they make?',opts:['A bigger square','A rectangle'],ans:1},task:'Join and name all 3',
show:()=>auto(1,[join,()=>nameIt(0),join,()=>nameIt(0),join,()=>nameIt(0)],800),
go:()=>begin(1,'Two squares, a little apart.',()=>S.j.k>=3,'Small shapes join to make bigger shapes.')},
{h:'Fill the hexagon',p:'Tap a block to put it in the hexagon. Fill it with no gaps. Then find another way.',
predict:{q:'Can different blocks fill the same hexagon?',opts:['No, only one way works','Yes, there are many ways'],ans:1},task:'Fill the hexagon 2 different ways',
show:()=>auto(2,[()=>add(2),()=>add(2),()=>add(1),()=>add(1),()=>add(1)],600),
go:()=>begin(2,'An empty hexagon. Blocks: triangle, rhombus, trapezoid and square.',()=>S.h.ways.size>=2,'The same hexagon can be made from different shapes.')},
{h:'Make a picture',p:'Shapes can build a picture. Drag each shape to the space it fits.',task:'Build the house and the sun',
show:()=>auto(3,HOUSE.map(h=>()=>placePic(h[0])),600),
go:()=>begin(3,'Dotted spaces for a wall, a roof, a door and a sun. First shape: a square.',()=>S.p.k>=4,'A square, a triangle, a rectangle and a circle made the picture.')},
{h:'Sides must touch',p:'Drag the blue piece. Where must it go to make one new shape?',task:'Make 2 new shapes',
show:()=>auto(4,[()=>touch('side'),()=>touch('side')],1100),
go:()=>begin(4,'An orange square and a blue square with a gap between them.',()=>S.c.k>=2,'Shapes make one new shape when a full side touches.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.hook()});
const QS=[
{q:'Two squares side by side make…',a:'A rectangle',o:[['A bigger square','bigsq'],['A triangle','tri']]},
{q:'What can two same triangles make?',a:'A rectangle',o:[['A circle','circ'],['Nothing, triangles cannot join','cant']]},
{q:'How many small triangles fill a hexagon?',a:'6',o:[['3','three'],['4','four6']]},
{q:'Two shapes touch only at a corner. Is that one new shape?',a:'No, a full side must touch',o:[['Yes','corner'],['Yes, if they are close','gap']]},
{q:'Can a hexagon be filled in more than one way?',a:'Yes, with different blocks',o:[['No, only one way','oneway'],['Only with squares','squares']]},
{q:'You turn a triangle round. Is it still a triangle?',a:'Yes, it still has 3 sides',o:[['No, it is a new shape','turned'],['Only if it points up','pointup']]}];
function why(t){let m='Small shapes join, with full sides touching, to make bigger shapes.';
if(t==='bigsq')m='Look at the sides: two are long and two are short. That is a rectangle, not a square.';
if(t==='tri')m='It has 4 sides and 4 square corners. A triangle has only 3.';
if(t==='sqr')m='Count the sides: 3 sides and 3 corners. It is a bigger triangle.';
if(t==='rect4')m='All 4 sides are the same length, so it is a square.';
if(t==='four')m='Joined with full sides touching, they make one new shape.';
if(t==='circ')m='A circle is round, with no straight sides. Triangles have straight sides, so they cannot make one.';
if(t==='cant')m='Triangles can join! Two of them, long side to long side, make a rectangle.';
if(t==='three'||t==='four6')m='A hexagon has 6 sides. It takes 6 small triangles, one at each side, to fill it.';
if(t==='corner')m='Touching at one corner is not joined. A whole side must touch.';
if(t==='gap')m='Close is not joined. With a gap they are still two shapes.';
if(t==='oneway')m='There are many ways: 6 triangles, 3 rhombuses, 2 trapezoids, or a mix.';
if(t==='squares')m='Squares have square corners that leave gaps in a hexagon.';
if(t==='turned')m='Turning a shape does not change it. It still has 3 sides and 3 corners.';
if(t==='pointup')m='A triangle can point any way. It is still a triangle.';
return m}
function ask(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,list=all.slice(r).concat(all.slice(0,r));
quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
const row=quiz.querySelector('.fl-pick');list.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else no();
fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:B=>{quiz.hidden=B.step!==5;pad.hidden=B.step===5;pads()},
init:B=>{A=B;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Shape lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});pads()}}).start()})})();
