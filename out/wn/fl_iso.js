/* Flagship 52 – structural isomers on a peg board. Atoms sit on grid points and only bond to a direct neighbour, so the
   board cannot cheat: move an end atom to a new free point (drag it, tap then tap, or the buttons) and the lab re-reads
   the molecule from its bonds alone, recounting the formula, naming it by IUPAC rules (longest chain, lowest locants)
   and giving its boiling point. Bending butane stays butane; a branch makes 2-methylpropane; C5H12 gives three isomers;
   –OH moves along propane; the end carbon hops onto the O to make an ether. Challenge: same compound, isomers, or not? */
(()=>{const ST=['','meth','eth','prop','but','pent','hex'],MU=['','','di','tri','tetra'],SUB='₀₁₂₃₄₅₆₇₈₉',sb=n=>String(n).replace(/\d/g,d=>SUB[d]);
 const BP={butane:-1,'2-methylpropane':-12,pentane:36,'2-methylbutane':28,'2,2-dimethylpropane':10,hexane:69,'2-methylpentane':60,'3-methylpentane':63,'2,2-dimethylbutane':50,'2,3-dimethylbutane':58,
  ethanol:78,methoxymethane:-24,'propan-1-ol':97,'propan-2-ol':82,methoxyethane:7,'butan-1-ol':118,'butan-2-ol':100,'2-methylpropan-1-ol':108,'2-methylpropan-2-ol':82,ethoxyethane:35};
 // a molecule: atoms [x,y,type] in grid units; each atom after the first names the atom it bonds to
 const mk=s=>{const a=[],b=[];s.split(' ').forEach((t,i)=>{const[x,y,p]=t.split(','),O=x[0]==='O';a.push({x:+(O?x.slice(1):x),y:+y,t:O?'O':'C'});if(p!=null)b.push([+p,i])});return{a,b}};
 const nb=(M,i)=>M.b.filter(e=>e.includes(i)).map(e=>e[0]===i?e[1]:e[0]),isC=(M,i)=>M.a[i].t==='C',cn=(M,i)=>nb(M,i).filter(j=>isC(M,j));
 function path(M,u,v){const pr={[u]:-1},q=[u];while(q.length){const i=q.shift();for(const j of cn(M,i))if(!(j in pr)){pr[j]=i;q.push(j)}}if(!(v in pr))return null;const p=[];for(let i=v;i!==-1;i=pr[i])p.push(i);return p}
 function grow(M,i,ban){let n=1;for(const j of cn(M,i))if(!ban.has(j)){ban.add(j);n+=grow(M,j,ban)}return n}
 function best(M,cs,need){let top=null;const cmp=(a,b)=>{for(let i=0;i<Math.max(a.length,b.length);i++){const d=(a[i]??99)-(b[i]??99);if(d)return d}return 0};
  for(let u of cs)for(let v of cs){const p=path(M,u,v);if(!p||(need!=null&&!p.includes(need)))continue;const set=new Set(p),subs=[];
   p.forEach((c,k)=>cn(M,c).forEach(j=>{if(!set.has(j)){const ban=new Set([...set,j]);subs.push([k+1,grow(M,j,ban)])}}));
   const key=[-p.length,-subs.length,need!=null?p.indexOf(need)+1:0,...subs.map(s=>s[0]).sort((a,b)=>a-b)];if(!top||cmp(key,top.key)<0)top={key,p,subs}}return top}
 function pre(subs){const g={};subs.forEach(([l,n])=>{const k=['','methyl','ethyl','propyl'][n]||'alkyl';(g[k]=g[k]||[]).push(l)});
  return Object.keys(g).sort().map(k=>g[k].sort((a,b)=>a-b).join(',')+'-'+MU[g[k].length]+k).join('-')}
 function name(M){const cs=M.a.map((_,i)=>i).filter(i=>isC(M,i)),o=M.a.findIndex(a=>a.t==='O');
  if(o<0){const r=best(M,cs);return pre(r.subs)+ST[r.p.length]+'ane'}
  const on=nb(M,o);if(on.length===1){const r=best(M,cs,on[0]),n=r.p.length,l=r.key[2],s=pre(r.subs);return s+ST[n]+(n<3&&!s?'anol':`an-${l}-ol`)}
  const side=c=>{const ban=new Set([c]);grow(M,c,ban);return[...ban]},A=side(on[0]),B=side(on[1]),[sm,lg,lc]=A.length<=B.length?[A,B,on[1]]:[B,A,on[0]];
  const r=best(M,lg,lc),n=r.p.length,l=r.key[2];return(n>2?l+'-':'')+ST[sm.length]+'oxy'+pre(r.subs)+ST[n]+'ane'}
 const hOf=(M,i)=>(isC(M,i)?4:2)-nb(M,i).length,form=M=>{let c=0,h=0,o=0;M.a.forEach((a,i)=>{h+=hOf(M,i);a.t==='C'?c++:o++});return`C${sb(c)}H${sb(h)}${o?'O':''}`};
 const lbl=(M,i)=>{const h=hOf(M,i);return isC(M,i)?'C'+(h?'H':'')+(h>1?sb(h):''):h?'OH':'O'};
VIS.reg('flagiso',c=>{let A,pad,chal,read;
 const G={M:mk('1,2 2,2,0 3,2,1 4,2,2'),sel:null,si:0,found:new Set(),goal:0,want:()=>{},tok:0,drag:null,Q:null,said:'',flash:0};
 const tell=t=>{G.said=t;c.say(t);if(read)read.textContent=t};
 const at=(x,y,skip)=>G.M.a.findIndex((a,i)=>i!==skip&&a.x===x&&a.y===y),leaf=i=>nb(G.M,i).length===1;
 function spots(i){const r=[];if(i==null||!leaf(i))return r;for(let y=0;y<5;y++)for(let x=0;x<7;x++){if(at(x,y,i)>=0)continue;
  const n=[[1,0],[-1,0],[0,1],[0,-1]].map(([dx,dy])=>at(x+dx,y+dy,i)).filter(j=>j>=0);if(n.length===1&&nb(G.M,n[0]).filter(k=>k!==i).length<(isC(G.M,n[0])?4:2))r.push([x,y,n[0]])}return r}
 function move(i,x,y){const s=spots(i).find(p=>p[0]===x&&p[1]===y);if(!s)return false;const M=G.M;M.b=M.b.filter(e=>!e.includes(i));M.b.push([s[2],i]);M.a[i].x=x;M.a[i].y=y;G.sel=null;A.sound.tick();read0();return true}
 function read0(){const n=name(G.M),bp=BP[n];G.found.add(n);tell(`${n}, ${form(G.M)}${bp!=null?`, boils at ${bp} °C`:''}.${G.goal?` Found ${[...G.found].length} of ${G.goal}: ${[...G.found].join(', ')}.`:''}`);sync();G.want()}
 function load(s,goal){G.M=mk(s);G.sel=null;G.found=new Set();G.goal=goal||0;read0()}
 function pick(i){if(i==null)return;if(!leaf(i)){G.sel=null;tell(`That ${lbl(G.M,i)} has ${nb(G.M,i).length} bonds. Only an end atom can move without breaking the molecule.`);sync();return}G.sel=i;G.si=0;
  tell(`${lbl(G.M,i)} picked. ${spots(i).length} free points it can bond at.`);sync()}
 // ---- layout ----
 function geo(){const N=A.narrow,top=N?70:64,u=Math.min((A.W-20)/7.2,(A.H-top-14)/5.2);return{u,ox:(A.W-u*7)/2+u/2,oy:top+u/2}}
 function mol(ctx,M,F,hl){const{u,ox,oy}=F,C=A.col,P=A.paint,X=a=>[ox+a.x*u,oy+a.y*u],r=u*.36;ctx.lineWidth=Math.max(3,u*.08);ctx.strokeStyle=A.alpha(C.tx,.6);
  M.b.forEach(([i,j])=>{const p=X(M.a[i]),q=X(M.a[j]);ctx.beginPath();ctx.moveTo(p[0],p[1]);ctx.lineTo(q[0],q[1]);ctx.stroke()});
  M.a.forEach((a,i)=>{const[x,y]=X(a),col=a.t==='O'?'#b91c1c':A.col.dark?'#64748b':'#334155';P.ball(x,y,r,col);if(A.col.dark){ctx.strokeStyle='#cbd5e1';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.stroke()}if(hl&&hl===i+1){ctx.strokeStyle=C.am;ctx.lineWidth=4;ctx.beginPath();ctx.arc(x,y,r+5,0,7);ctx.stroke()}
   ctx.fillStyle='#fff';ctx.font=`700 ${Math.max(10,Math.min(14,u*.27))}px system-ui`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(lbl(M,i),x,y+1)})}
 function draw(A){const{ctx,W,H,col:C,paint:P}=A,F=geo(),{u,ox,oy}=F;G.F=F;ctx.fillStyle=A.mix(C.pn,C.cy,.05);ctx.fillRect(0,0,W,H);
  ctx.textAlign='left';ctx.textBaseline='alphabetic';
  if(A.step===8&&G.Q){const q=G.Q,h=W/2;[q.a,q.b].forEach((M,k)=>{const xs=M.a.map(a=>a.x),ys=M.a.map(a=>a.y),w=Math.max(...xs)-Math.min(...xs)+1,hh=Math.max(...ys)-Math.min(...ys)+1,uu=Math.min(h/(w+.8),(H-60)/(hh+.8),u);
   mol(ctx,M,{u:uu,ox:k*h+(h-uu*w)/2+uu/2-Math.min(...xs)*uu,oy:40+(H-60-uu*hh)/2+uu/2-Math.min(...ys)*uu});ctx.fillStyle=C.tx;ctx.font='800 15px system-ui';ctx.fillText(k?'B':'A',k*h+12,26)});
   ctx.strokeStyle=A.alpha(C.tx,.2);ctx.beginPath();ctx.moveTo(h,30);ctx.lineTo(h,H-10);ctx.stroke();return}
  const n=name(G.M),bp=BP[n];ctx.font=`700 ${A.narrow?16:19}px system-ui`;ctx.fillStyle=C.tx;ctx.fillText(n,14,26);ctx.font='600 14px system-ui';ctx.fillStyle=C.mu;
  ctx.fillText(`${form(G.M)}${bp!=null?` · boils at ${bp} °C`:''}${G.goal?` · found ${G.found.size} of ${G.goal}`:''}`,14,A.narrow?50:48);
  ctx.fillStyle=A.alpha(C.tx,.18);for(let y=0;y<5;y++)for(let x=0;x<7;x++){ctx.beginPath();ctx.arc(ox+x*u,oy+y*u,2.5,0,7);ctx.fill()}
  const sp=spots(G.sel);sp.forEach((p,k)=>{ctx.setLineDash([5,4]);ctx.strokeStyle=k===G.si?C.am:A.alpha(C.gr,.8);ctx.lineWidth=k===G.si?3.5:2;ctx.beginPath();ctx.arc(ox+p[0]*u,oy+p[1]*u,u*.3,0,7);ctx.stroke();ctx.setLineDash([])});
  mol(ctx,G.M,F,G.sel==null?0:G.sel+1);if(G.drag!=null&&G.dp){P.ball(G.dp.x,G.dp.y,u*.3,A.alpha('#334155',.7))}
  if(G.flash>0){ctx.strokeStyle=A.alpha(C.gr,G.flash);ctx.lineWidth=5;ctx.strokeRect(4,4,W-8,H-8)}A.fx.draw(ctx)}
 const describe=()=>A.step===8?G.cq||'Challenge.':`Peg board molecule: ${G.M.a.map((a,i)=>lbl(G.M,i)).join(', ')}. `+G.said;
 function sync(){if(!A)return;A.cv.setAttribute('aria-label',describe());if(!pad)return A.redraw();pad.innerHTML='';if(A.step===8)return A.redraw();
  const ends=G.M.a.map((_,i)=>i).filter(leaf),sp=spots(G.sel),B=(t,f,dis)=>{const e=c.el('button',{type:'button',class:'lbtn sm ghost'},pad,t);e.disabled=!!dis;e.onclick=()=>{f();A.sound.tick()}};
  const cyc=d=>{const k=ends.indexOf(G.sel);pick(ends[(k+d+ends.length)%ends.length])};B('◀ End atom',()=>cyc(-1));B('End atom ▶',()=>cyc(1));
  B('◀ Point',()=>{G.si=(G.si-1+sp.length)%sp.length;sync()},!sp.length);B('Point ▶',()=>{G.si=(G.si+1)%sp.length;sync()},!sp.length);B('Move here',()=>{const p=sp[G.si];move(G.sel,p[0],p[1])},!sp.length);
  if(A.step===7)[['C₄H₁₀','1,2 2,2,0 3,2,1 4,2,2',2],['C₅H₁₂','1,2 2,2,0 3,2,1 4,2,2 5,2,3',3],['C₆H₁₄','0,2 1,2,0 2,2,1 3,2,2 4,2,3 5,2,4',5],['C₄H₁₀O','1,2 2,2,0 3,2,1 4,2,2 O5,2,3',7]].forEach(([t,s,g])=>B('New '+t,()=>load(s,g)));A.redraw()}
 // ---- steps ----
 const fin=(st,test,msg)=>()=>{if(A.step===st&&test()&&A.pred[st]!=null){G.flash=1;A.tween(G,{flash:0},1100,'out');A.done(msg()+A.reveal(st))}};
 const fresh=()=>{G.tok++;G.want=()=>{}},nm=()=>name(G.M);
 const play=list=>{const k=++G.tok;let i=0;const nx=()=>{if(k!==G.tok||i>=list.length)return;const[a,x,y]=list[i++];pick(a);A.tween({z:0},{z:1},450,'io',()=>{if(k!==G.tok)return;move(a,x,y);A.tween({z:0},{z:1},450,'io',nx)})};nx()};
 const BUT='1,2 2,2,0 3,2,1 4,2,2',PROP='1,2 2,2,0 3,2,1 O4,2,2';
 const steps=[
  {h:'Same atoms, new shape',p:'Butane: four carbons in a row. Each atom bonds only to a neighbour on the board. Drag the right-hand end carbon, or tap it and then tap a ringed point.',
   predict:{q:'Move one end carbon onto the second carbon. The formula becomes…',opts:['C₄H₈','C₄H₁₀','C₃H₁₀'],ans:1},task:'Make a branched molecule: bond the end carbon to the second carbon',show:()=>play([[3,2,1]]),
   go:()=>{fresh();load(BUT);G.want=fin(0,()=>nm()==='2-methylpropane',()=>'Still C₄H₁₀, but now the longest chain is three carbons with a methyl on carbon 2: 2-methylpropane. Same formula, different structure: structural isomers.')}},
  {h:'Bending is not new',p:'Chains are drawn straight, but real ones zigzag and twist. The name only depends on which atom bonds to which.',
   predict:{q:'Bend butane into an L. Is that a new isomer?',opts:['Yes, the shape changed','No, it is still butane','Yes, it is 1-methylpropane'],ans:1},task:'Bend the chain without making a branch',show:()=>play([[3,3,1]]),
   go:()=>{fresh();load(BUT);G.want=fin(1,()=>nm()==='butane'&&new Set(G.M.a.map(a=>a.y)).size>1,()=>'The longest chain is still four carbons in a row, so it is butane. A methyl on carbon 1 just makes the chain longer: there is no 1-methylpropane.')}},
  {h:'How many C₅H₁₂?',p:'Pentane has five carbons. Find every different skeleton. Number from the end nearer a branch, so a methyl one in from either end is on carbon 2.',
   predict:{q:'How many different C₅H₁₂ isomers are there?',opts:['5','3','2'],ans:1},task:'Find all three C₅H₁₂ isomers',show:()=>play([[4,2,1],[3,2,3]]),
   go:()=>{fresh();load('1,2 2,2,0 3,2,1 4,2,2 5,2,3',3);G.want=fin(2,()=>G.found.size===3,()=>'Pentane, 2-methylbutane and 2,2-dimethylpropane. Any other drawing is one of these bent or flipped; "3-methylbutane" is 2-methylbutane numbered from the wrong end. More branching, lower boiling point: 36, 28, 10 °C.')}},
  {h:'Flip the alcohol',p:'Propan-1-ol: the –OH is on an end carbon. Move the OH to the other end.',
   predict:{q:'With the –OH on the other end you get…',opts:['propan-3-ol, a new isomer','propan-1-ol again','propan-2-ol'],ans:1},task:'Move the OH to the other end carbon',show:()=>play([[3,0,2]]),
   go:()=>{fresh();load(PROP);G.want=fin(3,()=>nm()==='propan-1-ol'&&G.M.a[3].x<1,()=>'Numbering starts from the end nearer the –OH, so it is carbon 1 again: propan-1-ol, the same compound turned round.')}},
  {h:'Move the –OH along',p:'Now put the OH on the middle carbon.',
   predict:{q:'Propan-2-ol boils at 82 °C. Propan-1-ol boils at…',opts:['82 °C, same formula so same boiling point','97 °C','60 °C'],ans:1},task:'Make propan-2-ol',show:()=>play([[3,2,1]]),
   go:()=>{fresh();load(PROP);G.want=fin(4,()=>nm()==='propan-2-ol',()=>'Both are C₃H₈O, but the –OH sits on a different carbon: position isomers. Propan-1-ol boils at 97 °C, propan-2-ol at 82 °C. Shape changes how closely molecules pack and attract.')}},
  {h:'A different group',p:'Ethanol, C₂H₆O. Move the left-hand carbon so it bonds to the oxygen instead.',
   predict:{q:'With the O between the two carbons you get…',opts:['ethanol, drawn another way','methoxymethane, an ether','an impossible molecule'],ans:1},task:'Put the oxygen between the two carbons',show:()=>play([[0,5,2]]),
   go:()=>{fresh();load('2,2 3,2,0 O4,2,1');G.want=fin(5,()=>nm()==='methoxymethane',()=>'C–O–C is an ether, methoxymethane, still C₂H₆O. It has no O–H, so no hydrogen bonds between its molecules: it boils at −24 °C, ethanol at 78 °C. Functional group isomers.')}},
  {h:'All of C₃H₈O',p:'Start from propan-1-ol. Find every isomer: move the OH, or hop a carbon onto the oxygen.',
   predict:{q:'How many C₃H₈O isomers are there?',opts:['2','3','4'],ans:1},task:'Find all three C₃H₈O isomers',show:()=>play([[3,2,1],[0,2,0]]),
   go:()=>{fresh();load(PROP,3);G.want=fin(6,()=>G.found.size===3,()=>'Propan-1-ol, propan-2-ol and methoxyethane: two position isomers and one functional group isomer.')}},
  {h:'Sandbox',p:'Pick a formula and hunt for every isomer. C₆H₁₄ has 5, and C₄H₁₀O has 7: four alcohols and three ethers.',go:()=>{fresh();load('0,2 1,2,0 2,2,1 3,2,2 4,2,3 5,2,4',5)}},
  {h:'Challenge',p:'',go:()=>{fresh();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>G.want()});
 // ---- challenge: compare two drawings ----
 const PAIRS=[[BUT,'0,0 0,1,0 1,1,1 1,2,2','same'],[BUT,'0,1 1,1,0 2,1,1 1,0,1','chain'],[PROP,'1,1 2,1,0 3,1,1 O2,0,1','pos'],[BUT,'0,0 1,0,0 2,0,1 3,0,2 4,0,3','diff'],
  ['0,1 1,1,0 O2,1,1','0,0 O1,0,0 2,0,1','fg'],['0,1 1,1,0 2,1,1 3,1,2 1,0,1','1,1 2,1,0 3,1,1 4,1,2 3,2,2','same'],['0,1 1,1,0 2,1,1 3,1,2 4,1,3','1,1 2,1,0 3,1,1 2,0,1 2,2,1','chain'],
  ['0,1 1,1,0 O2,1,1','0,1 1,1,0 2,1,1 O3,1,2','diff'],[PROP,'O0,1 1,1,0 2,1,1 3,1,2','same'],['0,1 1,1,0 2,1,1 3,1,2 O4,1,3','0,1 1,1,0 2,1,1 3,1,2 O2,0,2','pos'],[PROP,'0,1 O1,1,0 2,1,1 3,1,2','fg']];
 let qn=-1,run=0;const REL=['The same compound','Structural isomers','Not isomers: different formulas'],TY=['Chain isomers','Position isomers','Functional group isomers'];
 function ask(){qn++;const[s1,s2,tr]=PAIRS[qn%PAIRS.length],flip=qn%2,a=mk(flip?s2:s1),b=mk(flip?s1:s2),iso=!['same','diff'].includes(tr),kind=iso&&qn%3===2?'ty':'rel';
  G.Q={a,b,tr,kind,na:name(a),nbb:name(b),fa:form(a),fb:form(b)};const q=kind==='ty'?'A and B are isomers. Which kind?':'How are A and B related?',ops=kind==='ty'?TY:REL,j=qn%3;
  chal.innerHTML=`<p><b>${q}</b> Count the atoms and follow the bonds.</p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');ops.map((t,i)=>[t,i]).slice(j).concat(ops.map((t,i)=>[t,i]).slice(0,j)).forEach(([t,i])=>{const e=c.el('button',{type:'button',class:'lbtn sm'},row,t);e.onclick=()=>judge(i)});
  G.cq=`Challenge: ${q} A: ${G.Q.fa}, ${a.a.map((_,i)=>lbl(a,i)).join('–')}. B: ${G.Q.fb}, ${b.a.map((_,i)=>lbl(b,i)).join('–')}.`;A.cv.setAttribute('aria-label',G.cq);c.say(G.cq);A.redraw()}
 function judge(i){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb'),{tr,kind,na,nbb,fa,fb:fB}=G.Q,want=kind==='ty'?{chain:0,pos:1,fg:2}[tr]:tr==='same'?0:tr==='diff'?2:1;let m;
  const why=`A is ${na} (${fa}); B is ${nbb} (${fB}).`;
  if(i===want)m='Right.';
  else if(kind==='rel'&&tr==='same'&&i===1)m='Bending, flipping or turning a drawing does not make a new compound: follow the bonds and both give the same name.';
  else if(kind==='rel'&&tr==='same')m='Count again: both have the same formula, and the atoms join in the same order, so they are one compound.';
  else if(kind==='rel'&&tr==='diff')m='Isomers need the same molecular formula. These differ by CH₂: neighbours in a homologous series, not isomers.';
  else if(kind==='rel'&&i===0)m='Same formula, but the atoms join in a different order, so the names differ: they are different compounds, structural isomers.';
  else if(kind==='rel')m='Count again: both have the same formula. Same formula, different structure is exactly what isomers are.';
  else if(tr==='chain')m='No functional group moved: the carbon skeleton itself changed. That is chain isomerism.';
  else if(tr==='pos')m='The carbon chain is the same; only the –OH moved to another carbon. That is position isomerism.';
  else m='An –OH became a C–O–C link: alcohol versus ether, a different functional group.';
  m+=' '+why;if(i===want){run++;A.win();fb.innerHTML=`✓ ${m} Streak: ${run}. <button type="button" class="linkish">Another →</button>`}
  else{run=0;A.sound.miss();fb.innerHTML=`✗ ${m} <button type="button" class="linkish">Another →</button>`}fb.querySelector('button').onclick=ask}
 A=FK.shell(c,{steps,ratio:.6,tall:1,draw,onStep:A=>{chal.hidden=A.step!==8;read.hidden=A.step===8;sync()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},bx);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Move an end atom'},bx);chal=E('div',{class:'fl-chal'},A.below);
   const cell=p=>{const{u,ox,oy}=G.F;return[Math.round((p.x-ox)/u),Math.round((p.y-oy)/u)]};
   A.gest({down:p=>{if(A.step===8||!G.F)return false;const[x,y]=cell(p),i=at(x,y);if(i>=0){pick(i);if(G.sel===i){G.drag=i;G.dp=p;return true}return false}
     if(G.sel!=null)move(G.sel,x,y);return false},
    move:p=>{if(G.drag==null)return;G.dp=p;A.redraw()},
    up:p=>{const i=G.drag;G.drag=null;if(i==null)return;const[x,y]=cell(G.dp);if(!(x===G.M.a[i].x&&y===G.M.a[i].y))move(i,x,y);A.redraw()}});sync()}});
 A.start()})})();
