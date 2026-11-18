/* Flagship: classifying quadrilaterals by their properties (ages 10–11; NC England Y6 geometry "compare and classify
   geometric shapes based on their properties", CCSS 5.G.B.3 and 5.G.B.4). Drag corners on a grid while the sides are
   tested live for parallel pairs, right angles and equal lengths; build the family tree (parallelogram → rectangle and
   rhombus → square); judge always / sometimes / never; and name marked shapes, including a square turned on its corner. */
(()=>{
const K={ink:'#0f172a',dim:'#475569',grid:'#cbd5e1',edge:'#1e293b',card:'#ffffff',ok:'#166534',okBg:'#dcfce7',no:'#9f1239',tip:'#eef2ff',
 fill:'#dbeafe',line:'#1d4ed8',mark:'#b91c1c',gold:'#a16207',goldSoft:'#fef3c7',tag:'#7c2d12',sel:'#1d4ed8',hi:'#fde68a'};
const Q=QHART,CAP=s=>s[0].toUpperCase()+s.slice(1);
VIS.reg('flagqhier',c=>{let A,X,pad,chal,qi=-1,tok=0;const G={after:()=>{}};
const z=n=>Math.round(n*(A.narrow?1:1.12));
const tx=(s,x,y,n,col,al,wt)=>{X.font=`${wt||700} ${z(n)}px system-ui,sans-serif`;X.fillStyle=col||K.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y,A.W-16)};
function wrapText(s,maxW,n){X.font=`700 ${z(n)}px system-ui,sans-serif`;const out=[];let cur='';
 for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(cur&&X.measureText(t).width>maxW){out.push(cur);cur=w}else cur=t}out.push(cur);return out}
function panel(x,y,w,h,bg,edge,lw,r){A.paint.rrect(x,y,w,h,r==null?8:r);X.fillStyle=bg;X.fill();if(edge){X.lineWidth=lw||2;X.strokeStyle=edge;X.stroke()}}
function head(s,won){const L=wrapText(s,A.W-40,13),lh=z(13)+4,h=Math.max(z(38),L.length*lh+14);panel(10,8,A.W-20,h,won?K.okBg:K.tip,won?K.ok:K.edge);
 L.forEach((r,i)=>tx(r,A.W/2,8+h/2+(i-(L.length-1)/2)*lh,13,won?K.ok:K.ink));return 8+h}
function foot(){if(!G.msg)return;const L=wrapText((G.bad?'✗ ':'✓ ')+G.msg,A.W-44,13),lh=z(13)+5,h=L.length*lh+10,y=A.H-h-8;
 panel(10,y,A.W-20,h,K.card,G.bad?K.no:K.ok,3);L.forEach((r,i)=>tx(r,A.W/2,y+5+lh*(i+.5),13,G.bad?K.no:K.ink))}
const tell=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const miss=s=>{G.bad=true;G.msg=s;A.sound.miss()};
const yes=s=>{G.bad=false;G.msg=s;A.sound.pop()};
const hitIn=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* ---- the dot grid, 8 × 6 squares ---- */
function grid(t,room){const u=Math.min((A.W-36)/8,room/6),ox=(A.W-8*u)/2,oy=t+z(10);G.gr={u,ox,oy};
 X.fillStyle=K.dim;for(let i=0;i<=8;i++)for(let j=0;j<=6;j++){X.beginPath();X.arc(ox+i*u,oy+(6-j)*u,1.8,0,7);X.fill()}return oy+6*u}
const gx=p=>G.gr.ox+p[0]*G.gr.u,gy=p=>G.gr.oy+(6-p[1])*G.gr.u;
/* ---- a quadrilateral with the usual marks: ticks for equal sides, arrows for parallel sides, squares for right angles ---- */
function shape(P,lab){const q=Q.props(P);X.fillStyle=A.alpha(K.fill,.85);X.strokeStyle=K.line;X.lineWidth=3;X.beginPath();P.forEach((p,i)=>i?X.lineTo(gx(p),gy(p)):X.moveTo(gx(p),gy(p)));X.closePath();X.fill();X.stroke();
 if(!q.simple)return q;X.strokeStyle=K.mark;X.lineWidth=2;const u=G.gr.u;
 q.right.forEach((r,i)=>{if(!r)return;const a=P[i],b=P[(i+1)%4],d=P[(i+3)%4],k=.32,ux=(b[0]-a[0]),uy=(b[1]-a[1]),vx=(d[0]-a[0]),vy=(d[1]-a[1]),lu=Math.hypot(ux,uy),lv=Math.hypot(vx,vy);
  const e1=[ux/lu*k,uy/lu*k],e2=[vx/lv*k,vy/lv*k];X.beginPath();X.moveTo(gx([a[0]+e1[0],a[1]+e1[1]]),gy([a[0]+e1[0],a[1]+e1[1]]));X.lineTo(gx([a[0]+e1[0]+e2[0],a[1]+e1[1]+e2[1]]),gy([a[0]+e1[0]+e2[0],a[1]+e1[1]+e2[1]]));X.lineTo(gx([a[0]+e2[0],a[1]+e2[1]]),gy([a[0]+e2[0],a[1]+e2[1]]));X.stroke()});
 const groups=[...new Set(q.L)].filter(l=>q.L.filter(x=>x===l).length>1);
 q.S.forEach((s,i)=>{const a=P[i],m=[a[0]+s[0]/2,a[1]+s[1]/2],len=Math.hypot(s[0],s[1]),n=[-s[1]/len,s[0]/len],d=[s[0]/len,s[1]/len],g=groups.indexOf(q.L[i]);
  for(let k=0;k<=g&&g>=0;k++){const o=(k-g/2)*.14,c0=[m[0]+d[0]*o,m[1]+d[1]*o];X.beginPath();X.moveTo(gx([c0[0]-n[0]*.16,c0[1]-n[1]*.16]),gy([c0[0]-n[0]*.16,c0[1]-n[1]*.16]));X.lineTo(gx([c0[0]+n[0]*.16,c0[1]+n[1]*.16]),gy([c0[0]+n[0]*.16,c0[1]+n[1]*.16]));X.stroke()}
  const pi=i%2;if(q.par[pi]){const sgn=i<2?1:-1;for(let k=0;k<=pi;k++){const o=.28+k*.16,t0=[m[0]+d[0]*o*sgn,m[1]+d[1]*o*sgn],w=.13;
   X.beginPath();X.moveTo(gx([t0[0]-d[0]*w*sgn+n[0]*w,t0[1]-d[1]*w*sgn+n[1]*w]),gy([t0[0]-d[0]*w*sgn+n[0]*w,t0[1]-d[1]*w*sgn+n[1]*w]));X.lineTo(gx(t0),gy(t0));X.lineTo(gx([t0[0]-d[0]*w*sgn-n[0]*w,t0[1]-d[1]*w*sgn-n[1]*w]),gy([t0[0]-d[0]*w*sgn-n[0]*w,t0[1]-d[1]*w*sgn-n[1]*w]));X.stroke()}}});
 if(lab)P.forEach((p,i)=>{const on=G.pick===i;X.fillStyle=on?K.sel:K.card;X.strokeStyle=K.line;X.lineWidth=2.5;X.beginPath();X.arc(gx(p),gy(p),z(on?11:9),0,7);X.fill();X.stroke();tx('ABCD'[i],gx(p),gy(p)+1,11,on?K.card:K.line)});return q}
const facts=q=>!q.simple?'The sides cross: not a simple quadrilateral.':`Parallel pairs: ${q.nPar}. Right angles: ${q.nRight}. Equal sides: ${q.allEq?'all four':q.oppEq?'opposite pairs':'not all'}.`;
/* ---- step 0: drag corners ---- */
const BQ=()=>Q.BUILD[Math.min(G.si,Q.BUILD.length-1)];
function judge(){if(G.won)return;const nm=Q.name(G.P),W=BQ().want,also={parallelogram:['rhombus'],rectangle:['square']}[W]||[];if(nm!==W&&!also.includes(nm)){G.bad=false;G.msg=`Now it is ${/^[aeiou]/.test(nm)?'an':'a'} ${nm}. ${facts(Q.props(G.P))}`;
  if(W==='parallelogram'&&nm==='rectangle')miss('That is a rectangle: it has right angles. Lean it so no corner is square.');
  if(W==='rhombus'&&nm==='square')miss('Four equal sides and right angles make a square. Push one corner so the angles are not right angles.');return}
 const extra=nm===W?'':` A ${nm} is a ${W} too.`;G.done.push(nm);if(G.si===Q.BUILD.length-1){G.won=true;return yes(`A ${nm}.${extra} Each new shape kept the parallelogram's two pairs of parallel sides and added one more property.`)}
 yes(`A ${nm}.${extra} ${facts(Q.props(G.P))}`);G.si++}
function nudge(dx,dy){if(G.won)return;const p=G.P[G.pick],np=[Math.max(0,Math.min(8,p[0]+dx)),Math.max(0,Math.min(6,p[1]+dy))];G.P[G.pick]=np;A.sound.tick();judge()}
/* ---- step 1: tree ---- */
function treeBoxes(t){const small=A.step===2,bw=Math.min(z(150),(A.W-40)/2),bh=z(small?26:30),cx=A.W/2,rowH=z(small?38:50),Y=t+z(small?8:14);
 return{Qd:{x:cx-bw/2,y:Y,w:bw,h:bh},P:{x:cx-bw/2,y:Y+rowH,w:bw,h:bh},L:{x:cx-bw-z(8),y:Y+2*rowH,w:bw,h:bh},R:{x:cx+z(8),y:Y+2*rowH,w:bw,h:bh},S:{x:cx-bw/2,y:Y+3*rowH,w:bw,h:bh}}}
function drawTree(t,fill,hi){const B=treeBoxes(t),mid=r=>[r.x+r.w/2,r.y+r.h/2];X.strokeStyle=K.edge;X.lineWidth=2;
 [['Qd','P'],['P','L'],['P','R'],['L','S'],['R','S']].forEach(([a,b])=>{const p=mid(B[a]),q=mid(B[b]);X.beginPath();X.moveTo(p[0],B[a].y+B[a].h);X.lineTo(q[0],B[b].y);X.stroke()});
 Object.entries(B).forEach(([id,r])=>{const nm=id==='Qd'?'quadrilateral':fill[id],on=nm&&hi&&hi.includes(nm),sel=G.slotSel===id;
  panel(r.x,r.y,r.w,r.h,on?K.hi:nm?K.okBg:K.card,sel?K.sel:nm?K.ok:K.dim,sel?4:2,10);tx(nm?CAP(nm):'?',r.x+r.w/2,r.y+r.h/2,A.step===2?12:14,nm?K.ink:K.dim)});G.slots=B;return B.S.y+B.S.h}
const left=()=>['square','rhombus','parallelogram','rectangle'].filter(n=>!Object.values(G.fill).includes(n));
function place(id){if(G.won||!G.nm||G.fill[id])return;const nm=G.nm,slot=Q.TREE.find(s=>s.id===id),lv=Q.LEVEL[nm];
 if(slot.name.split('|').includes(nm)){G.fill[id]=nm;G.nm=null;if(!left().length){G.won=true;return yes('Each shape has every property of the shapes above it. A square is a rectangle and a rhombus.')}return yes(`${CAP(nm)} fits there.`)}
 G.nm=null;if(lv>slot.lv)return miss(nm==='square'?'A square is a special rectangle and a special rhombus, so it goes below both of them.':`A ${nm} is one kind of parallelogram, so it goes below the parallelogram box, not in it.`);
 miss(nm==='parallelogram'?'Parallelogram is the wider family: rectangles and rhombuses are kinds of parallelogram, so it goes above them.':`The bottom box sits under both rectangle and rhombus, so it needs right angles and equal sides. A ${nm} has only one of those.`)}
/* ---- steps 2 and 3: tiles ---- */
const AQ=()=>Q.ASN[G.si],CQ=()=>Q.CLUE[G.si];
const opts=()=>A.step===2?['Always','Sometimes','Never'].map(o=>[o,o===AQ().a?'ok':AQ().why[o]]):CQ().opts;
const tileOrder=()=>{const n=opts().length,r=(G.si+1)%n;return[...Array(n)].map((_,j)=>(j+r)%n)};
function choose(i){if(G.won)return;const [lab,tag]=opts()[i];if(tag!=='ok')return miss(Q.WHY[tag]);G.done.push(lab);
 if(G.si===(A.step===2?Q.ASN:Q.CLUE).length-1){G.won=true;return yes(A.step===2?`${lab}. If a shape is below another in the tree, it is always that shape too.`:`${lab}. Name a shape by its properties, not by how it sits.`)}
 yes(`${lab}. Next one.`);G.si++}
function tileRow(y){const O=opts(),n=O.length,stack=A.narrow&&n===3&&A.step===3,gap=8,w=stack?A.W-32:(A.W-28-gap*(n-1))/n,h=z(stack?32:38);
 G.tiles=tileOrder().map((i,j)=>{const x=stack?16:14+j*(w+gap),ty=stack?y+j*(h+6):y;panel(x,ty,w,h,K.goldSoft,K.gold,2,10);const L=wrapText(O[i][0],w-10,12);L.forEach((r,k)=>tx(r,x+w/2,ty+h/2+(k-(L.length-1)/2)*(z(12)+2),12,K.tag));return{x,y:ty,w,h,i}})}
/* ---- input and drawing ---- */
const kind=()=>['build','tree','asn','clue','quiz','chal'][A.step];
function down(p){const k=kind();
 if(k==='build'&&!G.won&&G.gr){let best=-1,bd=1e9;G.P.forEach((q,i)=>{const d=Math.hypot(gx(q)-p.x,gy(q)-p.y);if(d<bd){bd=d;best=i}});if(bd<z(30)){G.pick=best;G.drag=true;sync();return true}return false}
 if(k==='tree'){const id=Object.keys(G.slots||{}).find(id=>id!=='Qd'&&hitIn(p,G.slots[id]));if(id){place(id);sync();return true}const t=(G.cards||[]).find(r=>hitIn(p,r));if(t){G.nm=t.nm;A.sound.tick();G.msg='';sync();return true}return false}
 if(k==='asn'||k==='clue'){const t=(G.tiles||[]).find(r=>hitIn(p,r));if(t){choose(t.i);sync();return true}}return false}
function move(p){if(!G.drag||G.won)return;const u=G.gr.u,np=[Math.max(0,Math.min(8,Math.round((p.x-G.gr.ox)/u))),Math.max(0,Math.min(6,6-Math.round((p.y-G.gr.oy)/u)))],o=G.P[G.pick];
 if(np[0]!==o[0]||np[1]!==o[1]){G.P[G.pick]=np;G.bad=false;G.msg=facts(Q.props(G.P));A.sound.tick();A.redraw()}}
function up(){if(G.drag){G.drag=false;judge();sync()}}
function draw(){X.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);X.fillRect(0,0,A.W,A.H);if(A.col.dark){X.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);X.fill()}
 const k=kind();let t;
 if(k==='build'){t=head(G.won?'Parallelogram, then rectangle, then rhombus: each keeps two pairs of parallel sides.':BQ().ask,G.won);const b=grid(t,A.H-t-z(120));const q=shape(G.P,true);
  tx(facts(q),A.W/2,b+z(16),12,K.ink,'center',700);tx('Name: '+Q.name(G.P),A.W/2,b+z(34),13,K.line,'center',800)}
 if(k==='tree'){t=head(G.won?'Every square is a rectangle and a rhombus. Every rectangle and rhombus is a parallelogram.':'Tap a name, then tap the box where it belongs.',G.won);const b=drawTree(t,G.fill);
  const L=left(),cols=A.narrow&&L.length>2?2:L.length||1,gap=8,w=(A.W-28-gap*(cols-1))/cols,h=z(36);G.cards=L.map((nm,j)=>{const x=14+(j%cols)*(w+gap),y=b+z(16)+Math.floor(j/cols)*(h+8),on=G.nm===nm;panel(x,y,w,h,on?K.card:K.goldSoft,on?K.sel:K.gold,on?4:2,10);tx(CAP(nm),x+w/2,y+h/2,12,K.tag);return{x,y,w,h,nm}})}
 if(k==='asn'){const S=AQ();t=head(G.won?'Below in the tree means always. Above means only sometimes.':`${S.s} Always, sometimes or never?`,G.won);const full={P:'parallelogram',L:'rectangle',R:'rhombus',S:'square'};const b=drawTree(t,full,G.won?null:S.hi);if(!G.won)tileRow(b+z(14))}
 if(k==='clue'){const S=CQ();t=head(G.won?'Equal ticks, parallel arrows and right-angle squares decide the name.':'Read the marks. What is the most exact name?',G.won);const b=grid(t,A.H-t-z(150));shape(S.P,false);if(!G.won)tileRow(b+z(12))}
 if(k==='quiz'||k==='chal'){t=head('Square → rectangle and rhombus → parallelogram → quadrilateral. Properties decide, not position.');grid(t,A.H-t-z(70));shape([[2,3],[4,1],[6,3],[4,5]],false)}
 foot();A.fx.draw(X)}
function sync(){const k=kind();let d='Challenge.';
 if(k==='build')d=`Grid 8 by 6. Corners ${G.P.map((p,i)=>'ABCD'[i]+' ('+p.join(', ')+')').join(', ')}. ${facts(Q.props(G.P))} Name: ${Q.name(G.P)}. Corner ${'ABCD'[G.pick]} is selected.`;
 if(k==='tree')d=`Family tree. Quadrilateral at the top; boxes filled: ${Object.entries(G.fill).map(([a,b])=>b).join(', ')||'none'}. Name held: ${G.nm||'none'}.`;
 if(k==='asn')d=`${AQ().s} Choose always, sometimes or never.`;
 if(k==='clue'){const q=Q.props(CQ().P);d=`A marked shape. ${facts(q)} Choices: ${CQ().opts.map(o=>o[0]).join('; ')}.`}
 if(k==='quiz')d='Summary picture: a square turned on its corner, marked with equal-side ticks, parallel arrows and right-angle squares.';
 tell((G.msg?G.msg+' ':'')+d);buttons();G.after()}
function buttons(){if(!pad)return;pad.innerHTML='';const k=kind(),b=(label,fn,aria)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':aria||null},pad,label).onclick=()=>{fn();sync()}};
 if(k==='build'&&!G.won){[0,1,2,3].forEach(i=>b('Corner '+'ABCD'[i],()=>{G.pick=i},`Select corner ${'ABCD'[i]}`));[['Left',-1,0],['Right',1,0],['Up',0,1],['Down',0,-1]].forEach(([l,dx,dy])=>b(l,()=>nudge(dx,dy),`Move corner ${'ABCD'[G.pick]} ${l.toLowerCase()} one square`))}
 if(k==='tree'&&!G.won){left().forEach(nm=>b(CAP(nm),()=>{G.nm=nm;G.msg=''},`Pick ${nm}`));[['P','Box under quadrilateral'],['L','Left box in the third row'],['R','Right box in the third row'],['S','Bottom box']].forEach(([id,l])=>{if(!G.fill[id])b(l,()=>place(id),`Put ${G.nm||'the picked name'} in the ${l.toLowerCase()}`)})}
 if((k==='asn'||k==='clue')&&!G.won)tileOrder().forEach(i=>{const l=opts()[i][0];b(l,()=>choose(i),`Answer: ${l}`)});
 A.redraw()}
const settle=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const id=++tok;fns.forEach((f,j)=>setTimeout(()=>{if(id===tok){f();sync()}},(j+1)*(A.reduced()?30:ms)))};
function reset(){tok++;Object.assign(G,{after:()=>{},won:false,msg:'',bad:false,si:0,done:[],P:Q.START.map(p=>p.slice()),pick:2,drag:false,fill:{},nm:null,slots:null})}
function morph(){const f=[];Q.BUILD.forEach(B=>f.push(()=>{G.P=B.P.map(p=>p.slice());judge()}));return f}
const okIndex=()=>opts().findIndex(o=>o[1]==='ok');
const steps=[
{h:'Build by properties',p:'Drag the corners. The marks show what is true: arrows for parallel sides, ticks for equal sides, small squares for right angles.',
predict:{q:'Give a parallelogram four right angles. What is it now?',opts:['Not a parallelogram any more','A rectangle, and still a parallelogram','Always a square'],ans:1},
task:'Make a parallelogram, a rectangle and a rhombus',show:()=>{steps[0].go();play(morph(),900)},go:()=>{reset();sync();G.after=settle(0,()=>G.won,'Parallelogram, rectangle, rhombus.')}},
{h:'The family tree',p:'A shape belongs to every family above it in the tree, because it has all of their properties, plus at least one more.',
predict:{q:'Is a square a rectangle?',opts:['No: it is a square','Yes: it has every rectangle property','Only when it is not turned'],ans:1},
task:'Fill the family tree',show:()=>{steps[1].go();const f=[];[['parallelogram','P'],['rectangle','L'],['rhombus','R'],['square','S']].forEach(([n,id])=>{f.push(()=>{G.nm=n});f.push(()=>place(id))});play(f,500)},go:()=>{reset();sync();G.after=settle(1,()=>G.won,'Parallelogram, rectangle and rhombus, square.')}},
{h:'Always, sometimes, never',p:'Use the tree. Going down the tree is always true. Going up is only sometimes true.',
predict:{q:'A parallelogram is a rectangle. True how often?',opts:['Always','Sometimes','Never'],ans:1},
task:'Judge all four sentences',show:()=>{steps[2].go();play(Q.ASN.map(()=>()=>choose(okIndex())),700)},go:()=>{reset();sync();G.after=settle(2,()=>G.won,'Always, sometimes, always, sometimes.')}},
{h:'Name it from the marks',p:'The marks on a shape tell you its properties. Turning a shape round does not change them.',
task:'Name all three shapes',show:()=>{steps[3].go();play(Q.CLUE.map(()=>()=>choose(okIndex())),800)},go:()=>{reset();sync();G.after=settle(3,()=>G.won,'Square, rectangle, rhombus.')}},
{h:'What you found',p:'A square is a rectangle and a rhombus. Rectangles and rhombuses are parallelograms. Properties decide a shape’s name, not how it sits.',go:()=>{reset();sync()}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>G.after()});
function why(tag){let m=Q.WHY[tag]||'Check the properties: parallel pairs, right angles and equal sides.';
 if(tag==='turned')m='Turning a shape does not change it. Its sides and angles stay the same, so a square on its corner is still a square.';
 if(tag==='extraProp')m='An extra property makes a special case, not a different family. A square is a rectangle with all four sides equal.';
 if(tag==='sameFamily')m='Sharing a family is not enough. Check the property in the name: a rectangle needs four right angles; a rhombus needs four equal sides.';
 return m}
function ask(){qi++;const [q,ans,wrongs]=Q.bank[qi%Q.bank.length],all=[[ans,'ok']].concat(wrongs),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>mark(tag,ans)});tell('Challenge: '+q);A.redraw()}
let run=0;
function mark(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=tag==='ok';
 if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+run+'.':'✗ '+why(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.72,tall:1.55,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step>=4;buttons()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Quadrilateral lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
