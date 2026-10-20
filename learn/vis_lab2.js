/* Why Next? labs (part 2): graph explorer with live function editing, geometry construction with draggable
   points and measured sides / angles / area, and a 2×2 matrix transformer. */
(()=>{const R=VIS.reg,nf=VIS.nf;
const OK=/^[abcx0-9+\-*/(). ^]+$/;
function compile(src,P){src=String(src).replace(/\s+/g,' ').replace(/×/g,'*').replace(/−/g,'-');if(!OK.test(src))return null;
 const js=src.replace(/(\d)\s*([a-cx(])/g,'$1*$2').replace(/\)\s*([a-cx(\d])/g,')*$1').replace(/\^/g,'**');try{const f=Function('x','a','b','c',`"use strict";return (${js});`);f(1,1,1,1);return x=>f(x,P.a,P.b,P.c)}catch(e){return null}}

/* graph explorer: type y = …, tune a, b, c, hit target points */
R('graphlab',c=>{const o=c.opts,P={a:o.a??1,b:o.b??0,c:o.c??0},K=VIS.plotKit,Pl=K.plot(c,{xr:o.xr||[-6,6],yr:o.yr||[-6,6],equal:o.equal!==false},'Graph explorer');
 let src=o.f||'a*x+b',f=compile(src,P);const cur=c.el('path',{class:'vis-curve'},Pl.lay),ro=c.el('text',{x:44,y:22,class:'vis-big'},Pl.s);
 const T=(o.targets||[]).map(([x,y])=>({x,y,el:c.el('circle',{cx:Pl.sx(x),cy:Pl.sy(y),r:8,class:'vis-target'},Pl.s)}));
 const wrap=c.el('label',{class:'vis-range'},c.ctl);c.el('span',{},wrap,'y = ');const inp=c.el('input',{class:'lab-in',type:'text',value:src,'aria-label':'Function, y equals',inputmode:'text',autocomplete:'off',spellcheck:'false'},wrap);
 const used=k=>new RegExp(k).test(src);const rs={};
 const hit=t=>f&&Math.abs(f(t.x)-t.y)<.051;
 const draw=()=>{f=compile(src,P);if(!f){ro.textContent='Use x, numbers, + − * / ^ ( ) and a, b, c';c.say('That formula cannot be drawn yet. Use x, numbers, + − * / ^, brackets and the letters a, b, c.');return}
  let d='',pen=false;for(let i=0;i<=300;i++){const x=Pl.x0+(Pl.x1-Pl.x0)*i/300,y=f(x);if(!isFinite(y)||Math.abs(y)>1e4){pen=false;continue}d+=(pen?'L':'M')+Pl.sx(x).toFixed(1)+' '+Pl.sy(y).toFixed(1);pen=true}cur.setAttribute('d',d);
  T.forEach(t=>t.el.classList.toggle('lab-hit',hit(t)));
  ro.textContent='y = '+src.replace(/\*\*/g,'^');const parts=['a','b','c'].filter(used).map(k=>`${k} = ${nf(P[k])}`).join(', ');
  c.say(`y = ${src}${parts?` with ${parts}`:''}. At x = 0, y = ${nf(f(0))}; at x = 1, y = ${nf(f(1))}; at x = 2, y = ${nf(f(2))}.${T.length?` Targets hit: ${T.filter(hit).length} of ${T.length}.`:''}`);Object.values(rs).forEach(([w,k])=>w.style.display=used(k)?'':'none');L.check()};
 inp.oninput=()=>{src=inp.value.trim()||'0';draw()};
 for(const k of['a','b','c']){const r=c.range(k,-5,5,.5,P[k],v=>{P[k]=v;draw()});rs[k]=[r.parentElement,k]}
 const chs=(o.challenges||[]).map(([goal,f2,tg])=>({goal,test:()=>T.length?T.every(hit):false,set:()=>{}}));
 const L=VIS.lab(c,chs.length?chs:[{goal:T.length?'Make the graph pass through every red target.':'Make the graph pass through (2, 3).',test:()=>T.length?T.every(hit):Math.abs(f(2)-3)<.051,win:'Changing a number in the formula moves or bends the whole graph.'},
  {goal:'Make a graph that crosses the y-axis at −2.',test:()=>Math.abs(f(0)+2)<.051},{goal:'Make a graph that goes DOWN from left to right.',test:()=>f(3)<f(-3)-.5}]);
 c.cueEl=[cur];draw()});

/* geometry construction: drag the corners; sides, angles, area and perimeter update live */
R('geolab',c=>{const o=c.opts,G=o.grid||10,pts=(o.pts||[[1,1],[8,1],[3,6]]).map(p=>p.slice());const W=400,H=330,u=(W-40)/G,X=x=>20+x*u,Y=y=>H-20-y*u,s=c.svg(W,H,'Shape on a grid');
 for(let i=0;i<=G;i++){c.el('line',{x1:X(i),x2:X(i),y1:Y(0),y2:Y(Math.floor((H-40)/u)),class:'vis-grid'},s);}for(let j=0;j*u<=H-40;j++)c.el('line',{x1:X(0),x2:X(G),y1:Y(j),y2:Y(j),class:'vis-grid'},s);
 const Gm=Math.floor((H-40)/u),poly=c.el('polygon',{class:'lab-shape'},s),labs=pts.map(()=>c.el('text',{class:'vis-lab b','text-anchor':'middle'},s)),sl=pts.map(()=>c.el('text',{class:'vis-lab','text-anchor':'middle'},s));
 const nm='ABCDEFG';const hs=pts.map((p,j)=>{const h=c.el('circle',{r:11,class:'vis-handle'},s);c.drag(h,s,(x,y)=>{p[0]=c.clamp(Math.round((x-20)/u),0,G);p[1]=c.clamp(Math.round((H-20-y)/u),0,Gm);draw()});
  h.addEventListener('keydown',e=>{const k={ArrowUp:1,ArrowDown:-1}[e.key];if(k){e.preventDefault();e.stopImmediatePropagation();p[1]=c.clamp(p[1]+k,0,Gm);draw()}});
  c.kslider(h,'Corner '+nm[j]+': left/right arrows move across, up/down arrows move up',()=>p[0],v=>{p[0]=v;draw()},0,G,1);return h});
 const geo=()=>{const n=pts.length;let A=0,per=0;const sides=[],ang=[];for(let j=0;j<n;j++){const p=pts[j],q=pts[(j+1)%n];A+=p[0]*q[1]-q[0]*p[1];const L=Math.hypot(q[0]-p[0],q[1]-p[1]);sides.push(L);per+=L}
  for(let j=0;j<n;j++){const p=pts[(j+n-1)%n],q=pts[j],r=pts[(j+1)%n],a1=[p[0]-q[0],p[1]-q[1]],a2=[r[0]-q[0],r[1]-q[1]],d=Math.hypot(...a1)*Math.hypot(...a2);ang.push(d?Math.acos(c.clamp((a1[0]*a2[0]+a1[1]*a2[1])/d,-1,1))*180/Math.PI:0)}
  return{A:Math.abs(A)/2,per,sides,ang}};
 const draw=()=>{const g=geo();poly.setAttribute('points',pts.map(p=>X(p[0])+','+Y(p[1])).join(' '));const cx=pts.reduce((a,p)=>a+p[0],0)/pts.length,cy=pts.reduce((a,p)=>a+p[1],0)/pts.length;
  pts.forEach((p,j)=>{hs[j].setAttribute('cx',X(p[0]));hs[j].setAttribute('cy',Y(p[1]));const dx=p[0]-cx,dy=p[1]-cy,dl=Math.hypot(dx,dy)||1;labs[j].setAttribute('x',X(p[0])+dx/dl*24);labs[j].setAttribute('y',Y(p[1])-dy/dl*24+4);labs[j].textContent=`${nm[j]} ${Math.round(g.ang[j])}°`;
   const q=pts[(j+1)%pts.length];sl[j].setAttribute('x',(X(p[0])+X(q[0]))/2);sl[j].setAttribute('y',(Y(p[1])+Y(q[1]))/2-6);sl[j].textContent=nf(g.sides[j],1)});
  const sum=g.ang.reduce((a,b)=>a+b,0);c.say(`Corners ${pts.map((p,j)=>`${nm[j]}(${p[0]}, ${p[1]})`).join(', ')}. Angles ${g.ang.map(a=>Math.round(a)+'°').join(', ')} add up to ${Math.round(sum)}°. Area ${nf(g.A)} squares, perimeter ${nf(g.per,1)}.`);L.check()};
 const near=(a,b)=>Math.abs(a-b)<.5;const ta=o.area||12;
 const L=VIS.lab(c,[{goal:'Make one angle exactly 90° (a right angle).',test:()=>geo().ang.some(a=>near(a,90)),win:'Right angles show up where sides meet like the corner of a page.'},{goal:`Make the area exactly ${ta} squares.`,test:()=>Math.abs(geo().A-ta)<1e-9,win:pts.length===3?'Triangle area = ½ × base × height.':'Count whole squares, then halves.'},
  {goal:pts.length===3?'Make two sides the same length (isosceles).':'Make all four angles 90° (a rectangle).',test:()=>{const g=geo();return pts.length===3?g.sides.some((a,i)=>g.sides.some((b,j)=>i<j&&Math.abs(a-b)<1e-9)):g.ang.every(a=>near(a,90))}}]);
 c.cueEl=[poly];draw()});

/* matrix lab: a 2×2 matrix moves the unit square; the determinant is the area scale */
R('matrixlab',c=>{const o=c.opts,m=(o.m||[1,0,0,1]).slice();const W=360,H=360,u=30,X=x=>W/2+x*u,Y=y=>H/2-y*u,s=c.svg(W,H,'Unit square and its image');
 for(let i=-6;i<=6;i++){c.el('line',{x1:X(i),x2:X(i),y1:0,y2:H,class:'vis-grid'},s);c.el('line',{x1:0,x2:W,y1:Y(i),y2:Y(i),class:'vis-grid'},s)}c.el('line',{x1:0,x2:W,y1:Y(0),y2:Y(0),class:'vis-axis'},s);c.el('line',{x1:X(0),x2:X(0),y1:0,y2:H,class:'vis-axis'},s);
 c.el('polygon',{points:[[0,0],[1,0],[1,1],[0,1]].map(p=>X(p[0])+','+Y(p[1])).join(' '),class:'lab-ghost'},s);const img=c.el('polygon',{class:'lab-shape'},s),ei=c.el('line',{class:'vis-curve',x1:X(0),y1:Y(0)},s),ej=c.el('line',{class:'vis-curve b',x1:X(0),y1:Y(0)},s);
 const box=c.el('div',{class:'lab-mat',role:'group','aria-label':'Matrix entries'},c.ctl);const ins=m.map((v,k)=>{const i=c.el('input',{type:'number',step:'0.5',value:v,class:'numin','aria-label':['top left','top right','bottom left','bottom right'][k]},box);i.oninput=()=>{const t=parseFloat(i.value);if(isFinite(t)){m[k]=t;draw()}};return i});
 const det=()=>m[0]*m[3]-m[1]*m[2];
 const draw=()=>{const T=([x,y])=>[m[0]*x+m[1]*y,m[2]*x+m[3]*y];img.setAttribute('points',[[0,0],[1,0],[1,1],[0,1]].map(T).map(p=>X(p[0])+','+Y(p[1])).join(' '));const a=T([1,0]),b=T([0,1]);
  ei.setAttribute('x2',X(a[0]));ei.setAttribute('y2',Y(a[1]));ej.setAttribute('x2',X(b[0]));ej.setAttribute('y2',Y(b[1]));const d=det();
  c.say(`Matrix [${nf(m[0])} ${nf(m[1])}; ${nf(m[2])} ${nf(m[3])}]. (1, 0) goes to (${nf(a[0])}, ${nf(a[1])}) (blue); (0, 1) goes to (${nf(b[0])}, ${nf(b[1])}) (green). Determinant ${nf(d)}: the area is multiplied by ${nf(Math.abs(d))}${d<0?' and the shape is flipped':''}${d===0?', so the square is squashed flat':''}.`);L.check()};
 const set=v=>{v.forEach((t,k)=>{m[k]=t;ins[k].value=t});draw()};
 const L=VIS.lab(c,[{goal:'Make the determinant exactly 6 (area × 6).',test:()=>Math.abs(det()-6)<1e-9},{goal:'Rotate the square 90° anticlockwise.',test:()=>m.join()==='0,-1,1,0',win:'Columns are where (1,0) and (0,1) land.'},{goal:'Reflect the square in the y-axis.',test:()=>m.join()==='-1,0,0,1'},{goal:'Squash the square flat (determinant 0) without using any zeros.',test:()=>Math.abs(det())<1e-9&&m.every(t=>t!==0)}]);
 c.btn('Identity',()=>set([1,0,0,1]),'ghost');c.btn('Rotate 90°',()=>set([0,-1,1,0]),'ghost');c.btn('Stretch ×2',()=>set([2,0,0,2]),'ghost');c.btn('Shear',()=>set([1,1,0,1]),'ghost');c.cueEl=[img];draw()});
})();
