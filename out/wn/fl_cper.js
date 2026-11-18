/* Flagship: perimeter of compound (rectilinear) shapes (ages 9–10). Tap each side of an L-shape once to add it up, find
   missing sides by subtracting from the opposite side, drag a corner cut and see the perimeter stay the same, deepen a slot
   to hit a target perimeter, judge three children, then a challenge. Shapes and screen-reader text are in cper_art.js. */
(()=>{
const {LSH,MISS,KIDS,QZ,WHY,H,len,per,cornerShape,slotShape}=CPART;
const Q={ink:'#111827',sub:'#374151',bg:'#f8fafc',frame:'#1f2937',good:'#166534',goodBg:'#dcfce7',bad:'#9f1239',tip:'#ede9fe',fill:'#bfdbfe',edge:'#1e3a8a',hot:'#c2410c',dot:'#cbd5e1',cut:'#fee2e2'};
VIS.reg('flagcper',c=>{let A,X,pad,box,qn=-1,gen=0;const G={after:()=>{}};
const v=n=>Math.round(n*(A.narrow?1:1.12));
const tell=m=>{c.say(m);A.cv.setAttribute('aria-label',m)};
function put(s,x,y,n,col,w,al){X.font=`${w||700} ${v(n)}px system-ui,sans-serif`;X.fillStyle=col||Q.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y)}
function wrapT(s,w,n){X.font=`700 ${v(n)}px system-ui,sans-serif`;const o=[];let l='';for(const t of String(s).split(' ')){const nx=l?l+' '+t:t;if(l&&X.measureText(nx).width>w){o.push(l);l=t}else l=nx}o.push(l);return o}
function pill(x,y,w,h,f,s,lw){A.paint.rrect(x,y,w,h,10);X.fillStyle=f;X.fill();if(s){X.lineWidth=lw||2;X.strokeStyle=s;X.stroke()}}
const within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const mode=()=>['walk','miss','corner','slot','kids','quiz'][A.step];
function title(s,ok){const R=wrapT(s,A.W-44,14),lh=v(14)+4,h=Math.max(v(36),R.length*lh+14);pill(12,10,A.W-24,h,ok?Q.goodBg:Q.tip,ok?Q.good:Q.frame);R.forEach((r,i)=>put(r,A.W/2,10+h/2+(i-(R.length-1)/2)*lh,14,ok?Q.good:Q.ink));return 10+h}
function foot(){if(!G.msg)return;const R=wrapT((G.bad?'✗ ':'✓ ')+G.msg,A.W-48,13),lh=v(13)+5,h=R.length*lh+12,y=A.H-h-10;pill(12,y,A.W-24,h,'#ffffff',G.bad?Q.bad:Q.good,3);R.forEach((r,i)=>put(r,A.W/2,y+6+lh*(i+.5),13,G.bad?Q.bad:Q.ink))}
const miss=m=>{G.bad=true;G.msg=m;A.sound.miss();sync()};
const hit=m=>{G.bad=false;G.msg=m;A.sound.pop()};
/* place a shape (grid units) in the box t0..b0 and draw it on a dotted cm grid */
function frame(V,t0,b0,gw,gh){const s=Math.min((A.W-v(70))/gw,(b0-t0-v(62))/gh),ox=(A.W-s*gw)/2,oy=t0+v(46)+(b0-t0-v(62)-s*gh)/2;return {s,ox,oy,P:p=>({x:ox+p[0]*s,y:oy+p[1]*s})}}
function grid(F,gw,gh){X.fillStyle=Q.dot;for(let i=0;i<=gw;i++)for(let j=0;j<=gh;j++){X.beginPath();X.arc(F.ox+i*F.s,F.oy+j*F.s,1.6,0,7);X.fill()}}
function poly(F,V,fill){X.beginPath();V.forEach((p,i)=>{const q=F.P(p);i?X.lineTo(q.x,q.y):X.moveTo(q.x,q.y)});X.closePath();X.fillStyle=fill||Q.fill;X.fill();X.strokeStyle=Q.edge;X.lineWidth=2.5;X.stroke()}
function side(F,V,k,col,lw){const a=F.P(V[k]),b=F.P(V[(k+1)%V.length]);X.strokeStyle=col;X.lineWidth=lw;X.beginPath();X.moveTo(a.x,a.y);X.lineTo(b.x,b.y);X.stroke()}
function tag(F,V,k,txt,col){const a=V[k],b=V[(k+1)%V.length],dx=Math.sign(b[0]-a[0]),dy=Math.sign(b[1]-a[1]),m=F.P([(a[0]+b[0])/2,(a[1]+b[1])/2]),x=m.x+dy*v(18),y=m.y-dx*v(14);
 X.font=`900 ${v(13)}px system-ui,sans-serif`;const w=X.measureText(txt).width+v(10);pill(x-w/2,y-v(11),w,v(22),'#ffffff',col||Q.frame,1.5);put(txt,x,y,13,col||Q.ink,900)}
function near(F,V,p){let best=-1,bd=v(18);V.forEach((_,k)=>{const a=F.P(V[k]),b=F.P(V[(k+1)%V.length]),L2=(b.x-a.x)**2+(b.y-a.y)**2,t=Math.max(0,Math.min(1,((p.x-a.x)*(b.x-a.x)+(p.y-a.y)*(b.y-a.y))/L2)),d=Math.hypot(p.x-a.x-t*(b.x-a.x),p.y-a.y-t*(b.y-a.y));if(d<bd){bd=d;best=k}});return best}
/* step: walk round, counting each side once */
function drawWalk(t0,b0){const F=frame(LSH,t0,b0,10,8);G.F=F;grid(F,10,8);poly(F,LSH);G.got.forEach(k=>side(F,LSH,k,Q.good,6));LSH.forEach((_,k)=>tag(F,LSH,k,len(LSH,k)+' cm',G.got.includes(k)?Q.good:Q.ink));
 const tot=G.got.reduce((s,k)=>s+len(LSH,k),0);put(G.got.length?G.got.map(k=>len(LSH,k)).join(' + ')+' = '+tot+' cm':'Total: 0 cm',A.W/2,t0+v(12),14,Q.ink,900)}
function count(k){if(G.won||k<0)return;if(G.got.includes(k))return miss(`You already counted that ${len(LSH,k)} cm side. Counting a side twice makes the perimeter too big.`);
 G.got.push(k);A.sound.tick();hit(`+ ${len(LSH,k)} cm. ${6-G.got.length} side${G.got.length===5?'':'s'} left.`);if(G.got.length===6){G.won=true;G.msg='10 + 4 + 6 + 4 + 4 + 8 = 36 cm. An L-shape has 6 sides.'}sync()}
/* step: missing sides */
function drawMiss(t0,b0){const R=MISS[Math.min(G.k,1)],V=R[1],gw=Math.max(...V.map(p=>p[0])),gh=Math.max(...V.map(p=>p[1])),hasPick=G.sel!=null&&!G.won,F=frame(V,t0,b0-(hasPick?v(64):0),gw,gh);G.F=F;grid(F,gw,gh);poly(F,V);
 if(G.sel!=null){const lnk=G.sel===R[2][0]?V.map((p,i)=>i).filter(i=>i!==G.sel&&V[i][1]===V[(i+1)%V.length][1]):V.map((p,i)=>i).filter(i=>i!==G.sel&&V[i][0]===V[(i+1)%V.length][0]);lnk.forEach(i=>side(F,V,i,'#7c3aed',5));side(F,V,G.sel,Q.hot,6)}
 V.forEach((_,k)=>{const hid=R[2].includes(k)&&G.found[k]==null;tag(F,V,k,hid?'?':len(V,k)+' '+R[0],hid?Q.hot:R[2].includes(k)?Q.good:Q.ink)});
 G.tiles=[];if(hasPick){const ch=G.order(R[3][G.sel]),w=(A.W-v(48))/3;G.tiles=ch.map((n,i)=>{const r={x:v(12)+i*(w+v(12)),y:b0-v(56),w,h:v(50),n};pill(r.x,r.y,w,r.h,'#ffffff',Q.frame,2.5);put(n+' '+R[0],r.x+w/2,r.y+r.h/2,17,Q.ink,900);return r})}
 if(G.sel==null&&!G.won)put(`Shape ${G.k+1} of 2, in ${R[0]==='m'?'metres':'centimetres'}`,A.W/2,t0+v(12),13,Q.sub,800)}
function choose(k){const R=MISS[G.k];if(G.won||!R[2].includes(k)||G.found[k]!=null)return;G.sel=k;A.sound.tick();G.msg='';sync()}
function guess(n){const R=MISS[G.k],k=G.sel;if(G.won||k==null)return;const [ok,added,copied]=R[3][k],u=R[0];
 if(n===added)return miss(`${n} ${u} is too long: you added. The purple sides opposite add up to the whole side, so subtract.`);if(n===copied)return miss(`${n} ${u} copies another side, but the pieces are not equal. Subtract the known piece from the whole.`);
 G.found[k]=ok;G.sel=null;A.sound.tick();const left=R[2].filter(i=>G.found[i]==null);if(left.length){hit(`Yes, ${ok} ${u}.`);return sync()}
 const P=per(R[1]);if(G.k===0){G.k=1;G.found={};hit(`Both found. Perimeter = ${R[1].map((_,i)=>len(R[1],i)).join(' + ')} = ${P} ${u}. Now shape 2.`)}else{G.won=true;G.msg=`Both found. Perimeter = ${P} ${u}. Opposite sides balance, so subtract to find a gap.`}sync()}
/* step: cut a corner */
function drawCorner(t0,b0){const F=frame(null,t0,b0,10,8),V=cornerShape(G.cx,G.cy);G.F=F;grid(F,10,8);const c0=F.P([G.cx,0]),c1=F.P([10,G.cy]);X.fillStyle=Q.cut;X.fillRect(c0.x,c0.y,c1.x-c0.x,c1.y-c0.y);X.setLineDash([5,5]);X.strokeStyle=Q.bad;X.lineWidth=1.5;X.strokeRect(c0.x,c0.y,c1.x-c0.x,c1.y-c0.y);X.setLineDash([]);
 poly(F,V);side(F,V,1,'#7c3aed',5);side(F,V,2,'#7c3aed',5);V.forEach((_,k)=>tag(F,V,k,len(V,k)+' cm'));const h=F.P([G.cx,G.cy]);X.fillStyle=Q.hot;X.beginPath();X.arc(h.x,h.y,v(13),0,7);X.fill();X.strokeStyle='#ffffff';X.lineWidth=3;X.stroke();G.knob={x:h.x-v(28),y:h.y-v(28),w:v(56),h:v(56)};
 put(`Perimeter ${per(V)} cm   Area ${80-(10-G.cx)*G.cy} cm²`,A.W/2,t0+v(12),14,Q.ink,900);put(`cuts tried: ${G.tried.length} of 3`,A.W/2,t0+v(30),11,Q.sub,800)}
function cut(x,y,keep){if(G.won)return;G.cx=Math.max(2,Math.min(9,Math.round(x)));G.cy=Math.max(1,Math.min(6,Math.round(y)));if(!keep)tryIt();else A.redraw()}
function tryIt(){const key=G.cx+','+G.cy;if(!G.tried.includes(key)){G.tried.push(key);A.sound.tick()}const P=per(cornerShape(G.cx,G.cy)),a=80-(10-G.cx)*G.cy;
 hit(`Cut ${10-G.cx} by ${G.cy} cm: area ${a} cm², perimeter still ${P} cm. The purple sides replace the bits cut away.`);if(G.tried.length>=3){G.won=true;G.msg='Three different cuts, three different areas, the same 36 cm perimeter.'}sync()}
/* step: a slot in the middle of a side */
function drawSlot(t0,b0){const F=frame(null,t0,b0,10,8),V=slotShape(G.d);G.F=F;grid(F,10,8);poly(F,V);if(G.d){side(F,V,1,'#7c3aed',5);side(F,V,3,'#7c3aed',5)}V.forEach((_,k)=>tag(F,V,k,len(V,k)+' cm'));
 const h=F.P([5,G.d]);X.fillStyle=Q.hot;X.beginPath();X.arc(h.x,h.y+(G.d?0:-v(2)),v(13),0,7);X.fill();X.strokeStyle='#ffffff';X.lineWidth=3;X.stroke();G.knob={x:h.x-v(30),y:h.y-v(30),w:v(60),h:v(60)};
 put(`Perimeter ${per(V)} cm · target 44 cm`,A.W/2,t0+v(12),14,Q.ink,900)}
function deepen(d,check){if(G.won)return;G.d=Math.max(0,Math.min(6,Math.round(d)));if(check)judgeSlot();else A.redraw()}
function judgeSlot(){const P=per(slotShape(G.d));if(P===44){G.won=true;A.sound.tick();G.msg='A 4 cm deep slot adds 4 cm down and 4 cm back up: 36 + 8 = 44 cm.';return sync()}
 miss(P<44?`${P} cm is too short. Each 1 cm deeper adds 2 cm, one down each side of the slot.`:`${P} cm is too long. Each 1 cm shallower takes off 2 cm.`)}
/* who is right */
function drawKids(t0,b0){const [stem,opts]=KIDS[Math.min(G.k,2)],F=wrapT(stem,A.W-v(30),15);F.forEach((s,j)=>put(s,A.W/2,t0+v(16)+j*v(19),15,Q.ink,900));const y0=t0+v(12)+F.length*v(19),h=Math.min(v(70),(b0-y0)/3-v(6));
 G.opts=opts.map((o,i)=>{const r={x:v(16),y:y0+i*(h+v(6)),w:A.W-v(32),h,i};pill(r.x,r.y,r.w,h,'#ffffff',Q.frame,2);X.fillStyle=['#c7d2fe','#fed7aa','#a7f3d0'][i];X.fillRect(r.x+v(10),r.y+h/2-v(14),v(30),v(28));put(o[0],r.x+v(25),r.y+h/2,11,Q.ink,900);
  wrapT(o[1],r.w-v(70),14).forEach((ln,j,L)=>put(ln,r.x+v(52),r.y+h/2+(j-(L.length-1)/2)*v(17),14,Q.ink,700,'left'));return r})}
function judge(i){if(G.won)return;const o=KIDS[G.k][1][i];if(o[2])return miss(`${o[0]} is not right. ${o[2]}`);hit(`${o[0]} is right.`);G.k++;if(G.k>=3){G.won=true;G.msg='Count every side once, subtract for gaps, and remember a corner cut keeps the perimeter.'}sync()}
function draw(){X.fillStyle=A.col.dark?'#1f2937':Q.bg;X.fillRect(0,0,A.W,A.H);X.fillStyle=Q.bg;A.paint.rrect(5,5,A.W-10,A.H-10,16);X.fill();
 const g=mode(),y=title(G.won?H[g][1]:H[g][0],G.won),b=A.H-(G.msg?v(76):v(12));
 if(g==='walk')drawWalk(y,b);if(g==='miss')drawMiss(y,b);if(g==='corner')drawCorner(y,b);if(g==='slot')drawSlot(y,b);if(g==='kids')drawKids(y+v(4),b);
 if(g==='quiz'){const F=frame(null,y,Math.min(b,y+v(220)),10,8);grid(F,10,8);poly(F,LSH)}foot();A.fx.draw(X)}
const toGrid=p=>({x:(p.x-G.F.ox)/G.F.s,y:(p.y-G.F.oy)/G.F.s});
function down(p){const g=mode();if(G.won&&g!=='quiz')return false;
 if(g==='walk'){const k=near(G.F,LSH,p);if(k>=0){count(k);return true}}
 if(g==='miss'){const t=(G.tiles||[]).find(r=>within(p,r));if(t){guess(t.n);return true}const k=near(G.F,MISS[G.k][1],p);if(k>=0){choose(k);return true}}
 if((g==='corner'||g==='slot')&&within(p,G.knob)){G.drag=1;return true}
 if(g==='kids'){const r=(G.opts||[]).find(z=>within(p,z));if(r){judge(r.i);return true}}
 return false}
function move(p){if(!G.drag)return;const q=toGrid(p);if(mode()==='corner')cut(q.x,q.y,1);else deepen(q.y)}
function up(){if(!G.drag)return;G.drag=0;if(mode()==='corner')tryIt();else judgeSlot()}
function sync(){tell((G.msg?G.msg+' ':'')+CPART.say(mode(),G));controls();G.after()}
function controls(){if(!pad)return;pad.innerHTML='';const g=mode(),b=(s,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},pad,s).onclick=()=>{fn();sync()}};
 if(!G.won){if(g==='walk')LSH.forEach((_,k)=>{if(!G.got.includes(k))b(`Side ${k+1}: ${len(LSH,k)} cm`,()=>count(k))});
  if(g==='miss'){const R=MISS[G.k];if(G.sel==null)R[2].filter(k=>G.found[k]==null).forEach(k=>b(`Find the ? after ${len(R[1],k-1)} ${R[0]}`,()=>choose(k)));else G.order(R[3][G.sel]).forEach(n=>b(`${n} ${R[0]}`,()=>guess(n)))}
  if(g==='corner'){b('Cut wider',()=>cut(G.cx-1,G.cy));b('Cut narrower',()=>cut(G.cx+1,G.cy));b('Cut deeper',()=>cut(G.cx,G.cy+1));b('Cut shallower',()=>cut(G.cx,G.cy-1))}
  if(g==='slot'){b('Slot deeper',()=>deepen(G.d+1,1));b('Slot shallower',()=>deepen(G.d-1,1))}
  if(g==='kids')KIDS[G.k][1].forEach((o,i)=>b(o[0]+' is right',()=>judge(i)))}
 A.redraw()}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const id=++gen;fns.forEach((f,j)=>setTimeout(()=>{if(id===gen){f();sync()}},(j+1)*(A.reduced()?50:ms)))};
function clear(){gen++;Object.assign(G,{after:()=>{},won:false,msg:'',bad:false,drag:0,k:0,got:[],found:{},sel:null,cx:7,cy:3,tried:[],d:1,order:L=>{const r=(G.k+(G.sel||0))%3;return L.slice(r).concat(L.slice(0,r))}})}
const steps=[
{h:'Walk round the shape',p:'The perimeter is the distance all the way round. Add every side, once each.',
predict:{q:'How many sides does an L-shape have?',opts:['4','6','8'],ans:1},
task:'Count all 6 sides',show:()=>{steps[0].go();play([0,1,2,3,4,5].map(k=>()=>count(k)),300)},go:()=>{clear();sync();G.after=ready(0,()=>G.won,'36 cm.')}},
{h:'Find the missing sides',p:'Some sides have no length marked. Opposite sides balance: the pieces on one side add up to the whole side opposite.',
predict:{q:'The bottom is 12 cm. The top pieces are 7 cm and ?. What is the ? side?',opts:['19 cm','5 cm','7 cm'],ans:1},
task:'Find all 4 missing sides',show:()=>{steps[1].go();play([0,1].flatMap(r=>MISS[r][2].flatMap(k=>[()=>choose(k),()=>guess(MISS[r][3][k][0])])),300)},go:()=>{clear();sync();G.after=ready(1,()=>G.won,'42 cm and 38 m.')}},
{h:'Cut a corner',p:'Cut a rectangle out of one corner of a 10 cm by 8 cm rectangle. Watch the area and the perimeter.',
predict:{q:'A piece is cut from the corner. What happens to the perimeter?',opts:['It gets smaller','It stays the same','It gets bigger'],ans:1},
task:'Try 3 different cuts',show:()=>{steps[2].go();play([[5,2],[8,5],[3,6]].map(([x,y])=>()=>cut(x,y)),400)},go:()=>{clear();sync();G.after=ready(2,()=>G.won,'Still 36 cm.')}},
{h:'Cut a slot',p:'Now cut a 2 cm wide slot into the middle of the top side.',
predict:{q:'The slot goes 1 cm deeper. How much does the perimeter grow?',opts:['1 cm','2 cm','It does not change'],ans:1},
task:'Make the perimeter 44 cm',show:()=>{steps[3].go();play([()=>deepen(4,1)],400)},go:()=>{clear();sync();G.after=ready(3,()=>G.won,'A 4 cm slot.')}},
{h:'Check the facts',p:'Three children work out perimeters. Only one is right each time.',
task:'Find who is right 3 times',show:()=>{steps[4].go();play(KIDS.map(()=>()=>judge(KIDS[G.k][1].findIndex(o=>!o[2]))),450)},go:()=>{clear();sync();G.after=ready(4,()=>G.won,'Facts checked.')}},
{h:'Challenge',p:'',go:()=>{clear();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>G.after()});
let row=0;
function ask(){qn++;const [qq,ok,bad]=QZ[qn%QZ.length],all=[[ok,'ok']].concat(bad),r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 box.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=box.querySelector('.fl-pick');ord.forEach(([w,tg])=>{c.el('button',{type:'button',class:'lbtn'},g,w).onclick=()=>grade(tg,ok)});tell('Challenge: '+qq);A.redraw()}
function grade(tg,ok){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),win=tg==='ok';let m=WHY[tg]||'Add every side once.';
 if(tg==='add')m='You added. The two pieces make the whole opposite side, so the missing piece is whole − known piece.';
 if(tg==='copy')m='The two pieces are not equal. Subtract the known piece from the whole side.';
 if(tg==='area')m='That number is the area (length × width) in square units. Perimeter adds the lengths of the sides.';
 if(win){row++;A.win()}else{row=0;A.sound.miss()}fb.innerHTML=`${win?'✓ Yes: '+ok+'. In a row: '+row+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.66,tall:1.2,draw,onStep:B=>{box.hidden=B.step!==5;pad.hidden=B.step===5;controls()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Perimeter lab buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
