/* Flagship: Edges, vertices and faces (ages 6–7; NC Y2 geometry "identify and describe the properties of 3-D shapes,
   including the number of edges, vertices and faces"; a cube has 6 faces, 12 edges and 8 vertices, a square-based pyramid
   5, 8 and 5, a triangular prism 5, 9 and 6, a sphere has no edges or vertices).
   Put a sticker on every vertex of a cube (the hidden one too); trace all 12 edges; paint all 6 faces, turning the cube to
   reach the hidden ones; count a pyramid's vertices; trace a triangular prism's edges.
   Not flagsolid (naming solids, flat and curved faces), flagnets (nets that fold) or flagshape (2-D shapes). */
(()=>{
VIS.reg('flagevf',c=>{let A,pad,quiz,qn=-1,gen=0;const S={};c.fig.classList.add('young');
const part=()=>['verts','edges','faces','pyr','prism','chal'][A.step];
const INK='#0f172a',PILL='#f8fafc',STICK='#f59e0b',TRACE='#dc2626',PAINTS=['#60a5fa','#f472b6','#4ade80','#facc15','#c084fc','#fb923c'];
function voice(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
const fbig=()=>A.narrow?16:19,fsm=()=>A.narrow?14:15;
function label(s,x,y,px,edge){const g=A.ctx;g.font=`800 ${px}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';const w=g.measureText(s).width+18;
 x=Math.max(w/2+4,Math.min(A.W-w/2-4,x));g.fillStyle=PILL;A.paint.rrect(x-w/2,y-px*.8,w,px*1.6,px*.7);g.fill();if(edge){g.strokeStyle=edge;g.lineWidth=3;g.stroke()}g.fillStyle=INK;g.fillText(s,x,y)}
/* ---------- solids: corners, and faces as corner lists; edges come from the faces ---------- */
const P=[-1,1];
const SOLID={cube:{v:P.flatMap(x=>P.flatMap(y=>P.map(z=>[x,y,z]))),f:[[0,1,3,2],[4,5,7,6],[0,1,5,4],[2,3,7,6],[0,2,6,4],[1,3,7,5]]},
 pyr:{v:[[-1,-1,-1],[1,-1,-1],[1,-1,1],[-1,-1,1],[0,1.1,0]],f:[[0,1,2,3],[0,1,4],[1,2,4],[2,3,4],[3,0,4]]},
 prism:{v:[[-1.1,-1,-1],[-1.1,-1,1],[-1.1,1,0],[1.1,-1,-1],[1.1,-1,1],[1.1,1,0]],f:[[0,1,2],[3,4,5],[0,1,4,3],[1,2,5,4],[2,0,3,5]]}};
for(const k in SOLID){const s=SOLID[k],seen={};s.e=[];s.f.forEach(f=>f.forEach((a,i)=>{const b=f[(i+1)%f.length],key=Math.min(a,b)+'-'+Math.max(a,b);if(!seen[key]){seen[key]=1;s.e.push([a,b])}}))}
/* turns: 0 = as drawn, 1 = half a turn round the up-down line, 2 = rolled over onto its top */
const TURN=[v=>v,([x,y,z])=>[-x,y,-z],([x,y,z])=>[x,-y,-z]];
const VIEW=[-.5,-.35,1];  /* the direction we look in for this slanted drawing */
function proj([x,y,z]){const s=Math.min(A.W*.24,A.H*.3),cx=A.W/2-s*.25,cy=A.H*.56;return[cx+s*(x+z*.5),cy-s*(y+z*.35)]}
function geo(k){const s=SOLID[k],V=s.v.map(TURN[S.turn||0]),pts=V.map(proj),mid=[0,1,2].map(i=>V.reduce((a,v)=>a+v[i],0)/V.length);
 const vis=s.f.map(f=>{const a=V[f[0]],b=V[f[1]],cc=V[f[2]],u=b.map((q,i)=>q-a[i]),w=cc.map((q,i)=>q-a[i]),n=[u[1]*w[2]-u[2]*w[1],u[2]*w[0]-u[0]*w[2],u[0]*w[1]-u[1]*w[0]];
  const fc=[0,1,2].map(i=>f.reduce((t,j)=>t+V[j][i],0)/f.length),out=n.reduce((t,q,i)=>t+q*(fc[i]-mid[i]),0)>0?1:-1;return n.reduce((t,q,i)=>t+q*out*VIEW[i],0)<0});
 const eVis=s.e.map(([a,b])=>s.f.some((f,i)=>vis[i]&&f.includes(a)&&f.includes(b)));return{s,pts,vis,eVis}}
function drawSolid(k){const g=A.ctx,{s,pts,vis,eVis}=geo(k);
 s.f.forEach((f,i)=>{if(!vis[i])return;g.beginPath();f.forEach((j,n)=>n?g.lineTo(...pts[j]):g.moveTo(...pts[j]));g.closePath();g.fillStyle=S.paint[i]!=null?PAINTS[S.paint[i]%6]:A.mix(A.col.pn,'#cbd5e1',A.col.dark?.25:.55);g.fill()});
 s.e.forEach(([a,b],i)=>{g.setLineDash(eVis[i]?[]:[7,6]);g.strokeStyle=S.traced[i]?TRACE:(A.col.dark?'#e2e8f0':INK);g.lineWidth=S.traced[i]?7:eVis[i]?3.5:2.5;g.beginPath();g.moveTo(...pts[a]);g.lineTo(...pts[b]);g.stroke()});g.setLineDash([]);
 pts.forEach((p,i)=>{if(!S.stuck[i])return;g.fillStyle=STICK;g.strokeStyle=INK;g.lineWidth=2.5;g.beginPath();g.arc(p[0],p[1],A.narrow?11:13,0,7);g.fill();g.stroke()})}
function segDist(p,a,b){const dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((p.x-a[0])*dx+(p.y-a[1])*dy)/(dx*dx+dy*dy)));return Math.hypot(p.x-a[0]-t*dx,p.y-a[1]-t*dy)}
const NAME={cube:'cube',pyr:'square-based pyramid',prism:'triangular prism'},count=o=>Object.values(o).filter(Boolean).length;
const shapeOf=()=>({verts:'cube',edges:'cube',faces:'cube',pyr:'pyr',prism:'prism'})[part()];
/* ---------- actions ---------- */
function stick(i){const k=shapeOf(),n=SOLID[k].v.length;if(i<0||S.stuck[i])return;S.stuck[i]=1;A.sound.pop();const got=count(S.stuck);
 after(got===n?`${n} stickers: the ${NAME[k]} has ${n} vertices. A vertex is a corner where edges meet.`+(k==='cube'?' One of them was hiding at the back!':' 4 round the bottom and 1 at the top.'):`${got} vertices so far. Look for corners at the back too.`)}
function trace(i){const k=shapeOf(),n=SOLID[k].e.length;if(i<0||S.traced[i])return;S.traced[i]=1;A.sound.tick();const got=count(S.traced);
 after(got===n?`All ${n} edges traced. An edge is a straight line where two faces meet.`+(k==='prism'?' 3 on each triangle end and 3 joining them.':' 4 round the top, 4 round the bottom and 4 going up.'):`${got} edges traced. The dashed lines are edges at the back.`)}
function paintFace(i){if(i<0||S.paint[i]!=null)return;S.paint[i]=Object.keys(S.paint).length;A.sound.pop();const got=Object.keys(S.paint).length;
 after(got===6?'All 6 faces painted. A face is a flat side. You can only ever see 3 at once, so turn the shape to count them all.':`${got} faces painted.`+(geo('cube').vis.every((v,j)=>!v||S.paint[j]!=null)?' Every face you can see is painted. Turn the cube!':''))}
function turn(){S.turn=((S.turn||0)+1)%3;A.sound.whoosh();after(['The cube is back the first way round.','Half a turn: now you can see the back and the other side.','Rolled over: now you can see the bottom.'][S.turn])}
function draw(){const k=part(),g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#fef3c7',A.col.dark?.08:.45);g.fillRect(0,0,A.W,A.H);
 if(k==='chal'){const q=QS[qn%QS.length];if(q&&q[3]==='sphere'){g.fillStyle=A.paint.rad(A.W*.45,A.H*.45,4,A.H*.3,[[0,'#bfdbfe'],[1,'#2563eb']]);g.beginPath();g.arc(A.W/2,A.H*.55,A.H*.3,0,7);g.fill()}else if(q)drawSolid(q[3]);label('Challenge',A.W/2,A.H*.08,fbig());return}
 const s=shapeOf();drawSolid(s);const sol=SOLID[s];
 if(k==='verts'||k==='pyr')label(count(S.stuck)===sol.v.length?`${sol.v.length} vertices!`:`Vertices found: ${count(S.stuck)}`,A.W/2,A.H*.08,fbig(),STICK);
 if(k==='edges'||k==='prism')label(count(S.traced)===sol.e.length?`${sol.e.length} edges!`:`Edges traced: ${count(S.traced)}`,A.W/2,A.H*.08,fbig(),TRACE);
 if(k==='faces')label(Object.keys(S.paint).length===6?'6 faces!':`Faces painted: ${Object.keys(S.paint).length}`,A.W/2,A.H*.08,fbig(),PAINTS[0])}
function fresh(){gen++;for(const k in S)delete S[k];Object.assign(S,{turn:0,stuck:{},traced:{},paint:{},ok:()=>{}})}
const doneIf=(i,cond,msg)=>()=>{if(A.step===i&&cond()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function auto(i,acts,gap){steps[i].go();const t=gen;acts.forEach((f,j)=>setTimeout(()=>{if(t===gen)f()},A.reduced()?25*(j+1):(gap||300)*(j+1)))}
function after(m){voice(m);A.redraw();keys();S.ok()}
const nextV=()=>{const n=SOLID[shapeOf()].v.length;for(let i=0;i<n;i++)if(!S.stuck[i])return i;return-1};
const nextE=()=>{const n=SOLID[shapeOf()].e.length;for(let i=0;i<n;i++)if(!S.traced[i])return i;return-1};
function nextFace(){const{vis}=geo('cube');for(let i=0;i<6;i++)if(vis[i]&&S.paint[i]==null)return i;return-1}
function keys(){if(!pad)return;pad.innerHTML='';const k=part(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='verts'||k==='pyr')b('Stick on the next one',()=>stick(nextV()),'Put a sticker on the next vertex');
 if(k==='edges'||k==='prism')b('Trace the next edge',()=>trace(nextE()));
 if(k==='faces'){b('Paint a face',()=>paintFace(nextFace()),'Paint the next face you can see');b('Turn it ↻',turn,'Turn the cube to see other faces')}}
function down(p){const k=part();if(k==='chal')return false;const{s,pts,vis}=geo(shapeOf()),r=A.narrow?30:26;
 if(k==='verts'||k==='pyr'){let best=-1,bd=r;pts.forEach((q,i)=>{const d=Math.hypot(p.x-q[0],p.y-q[1]);if(d<bd&&!S.stuck[i]){bd=d;best=i}});stick(best);return false}
 if(k==='edges'||k==='prism'){let best=-1,bd=r*.8;s.e.forEach(([a,b2],i)=>{const d=segDist(p,pts[a],pts[b2]);if(d<bd&&!S.traced[i]){bd=d;best=i}});trace(best);return false}
 if(k==='faces'){const g=A.ctx;let hit=-1;s.f.forEach((f,i)=>{if(!vis[i])return;g.beginPath();f.forEach((j,n)=>n?g.lineTo(...pts[j]):g.moveTo(...pts[j]));g.closePath();if(g.isPointInPath(p.x*A.dpr,p.y*A.dpr))hit=i});hit<0?0:paintFace(hit);return false}return false}
const steps=[
{h:'Count the corners',p:'This is a cube. A corner is called a vertex. Tap every vertex to put a sticker on it, or use the button.',
 predict:{q:'How many vertices does a cube have?',opts:['4','6','8'],ans:2},
 task:'Put a sticker on every vertex',show:()=>auto(0,Array.from({length:8},(_,i)=>()=>stick(i))),
 go:()=>{fresh();voice('A cube. Dashed lines are at the back.');keys();S.ok=doneIf(0,()=>count(S.stuck)===8,'A cube has 8 vertices.')}},
{h:'Trace the edges',p:'An edge is a straight line where two faces meet. Tap each edge to trace it in red.',
 predict:{q:'How many edges does a cube have?',opts:['6','8','12'],ans:2},
 task:'Trace every edge',show:()=>auto(1,Array.from({length:12},(_,i)=>()=>trace(i)),220),
 go:()=>{fresh();voice('A cube. Tap its edges.');keys();S.ok=doneIf(1,()=>count(S.traced)===12,'A cube has 12 edges.')}},
{h:'Paint the faces',p:'A face is a flat side. Tap a face to paint it. Press Turn to see the faces at the back.',
 predict:{q:'You can see 3 faces. How many faces does a cube have in all?',opts:['3','6','8'],ans:1},
 task:'Paint all the faces',show:()=>auto(2,[()=>paintFace(nextFace()),()=>paintFace(nextFace()),()=>paintFace(nextFace()),turn,()=>paintFace(nextFace()),()=>paintFace(nextFace()),turn,()=>paintFace(nextFace())],330),
 go:()=>{fresh();voice('A cube showing 3 of its faces.');keys();S.ok=doneIf(2,()=>Object.keys(S.paint).length===6,'A cube has 6 faces.')}},
{h:'A pyramid',p:'This pyramid has a square at the bottom and a point at the top. Put a sticker on each vertex.',
 predict:{q:'How many vertices does this pyramid have?',opts:['4','5','8'],ans:1},
 task:'Put a sticker on every vertex',show:()=>auto(3,Array.from({length:5},(_,i)=>()=>stick(i))),
 go:()=>{fresh();voice('A square-based pyramid.');keys();S.ok=doneIf(3,()=>count(S.stuck)===5,'A square-based pyramid has 5 vertices, 8 edges and 5 faces.')}},
{h:'A triangular prism',p:'A prism has the same shape at both ends. This one has triangle ends. Trace every edge.',
 predict:{q:'How many edges does a triangular prism have?',opts:['6','9','12'],ans:1},
 task:'Trace every edge',show:()=>auto(4,Array.from({length:9},(_,i)=>()=>trace(i)),250),
 go:()=>{fresh();voice('A triangular prism.');keys();S.ok=doneIf(4,()=>count(S.traced)===9,'A triangular prism has 9 edges, 6 vertices and 5 faces.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.ok()});
const QS=[['How many vertices does a cube have?','8',[['4','oneface'],['6','faces']],'cube'],
 ['How many edges does a cube have?','12',[['8','verts'],['6','faces']],'cube'],
 ['How many faces does a square-based pyramid have?','5',[['4','nobase'],['8','edges']],'pyr'],
 ['How many edges does a triangular prism have?','9',[['6','ends'],['5','faces']],'prism'],
 ['What is a vertex?','A corner where edges meet',[['A flat side','face'],['A straight line','edge']],'cube'],
 ['How many vertices does a ball (a sphere) have?','0',[['1','top'],['Too many to count','curved']],'sphere']];
function why(tag){let m='Count one at a time and mark each one as you go.';
 if(tag==='oneface')m='That is only the corners of one face. A cube has 4 corners on top and 4 underneath: 8.';
 if(tag==='faces')m='That is the number of faces, the flat sides. This question is about a different part.';
 if(tag==='verts')m='8 is the number of vertices (corners). A cube has 4 edges on top, 4 at the bottom and 4 going up: 12.';
 if(tag==='nobase')m='Don’t forget the square on the bottom: 4 triangle faces plus 1 square face makes 5.';
 if(tag==='edges')m='8 is the number of edges of the pyramid. Faces are the flat sides: 4 triangles and 1 square.';
 if(tag==='ends')m='6 counts only the two triangle ends. 3 more edges join the ends: 9.';
 if(tag==='face')m='A flat side is a face. A vertex is a corner, where edges meet.';
 if(tag==='edge')m='A straight line where two faces meet is an edge. A vertex is a corner.';
 if(tag==='top')m='A ball has no corners at all, not even on top. It is curved all over, so it has 0 vertices.';
 if(tag==='curved')m='A sphere is curved all over. There are no corners to count, so the answer is 0.';
 return m}
function ask(){qn++;const[q,ans,bad]=QS[qn%QS.length],opts=[[ans,'ok'],...bad],r=qn%3,order=opts.slice(r).concat(opts.slice(0,r));
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');order.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Answer: '+v},row,v).onclick=()=>mark(t,ans)});voice('Challenge: '+q);A.redraw()}
function mark(t,ans){quiz.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';ok?A.win():A.sound.miss();voice(ok?'Yes. '+ans+'.':why(t));
 fb.innerHTML=(ok?`✓ Yes: ${ans}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1,draw,onStep:Q=>{quiz.hidden=Q.step!==5;pad.hidden=Q.step===5;keys()},
 init:Q=>{const w=c.el('div',{class:'fl-below'},Q.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Shape controls'},w);quiz=c.el('div',{class:'fl-chal'},Q.below);fresh();A.gest({down});keys()}});
A.start()})})();
