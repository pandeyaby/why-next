/* Flagship 34 – functional groups. A "which part reacts?" bench. Molecules are drawn as displayed formulae; the learner
   circles atoms by tapping them and checks the circle, so -OH, -COOH and C=C are found, not told (a lone O, a lone C or
   a stray CH₃ gets feedback on what is missing or extra). Then a reagent shelf (bromine water, sodium, sodium carbonate)
   can be dragged onto the molecule or tapped: the tube shows the result and a results grid fills in. Changing the chain
   length of an alcohol never changes its result; changing the group always does. Ethanoic acid is joined to ethanol
   (drag one onto the other): the acid's OH and the alcohol's H leave as water and -COO- forms, and the new ester gives
   no fizz at all. A sorting step names the family from the group. Predictions target "the CH₃ end is the reactive bit",
   "a longer chain reacts differently", "same number of carbons means same reactions", "the ester still fizzes" and
   "-COOH has an OH so it is an alcohol". Challenge: the atoms of a group, the family from a structure, the group from a
   test result, a prediction for an untested member; feedback names the slip. */
(()=>{const STEM=['','meth','eth','prop','but'],GRP={ane:'none',ene:'C=C',ol:'–OH',acid:'–COOH',ester:'–COO–'},
 FAM={ane:'alkane',ene:'alkene',ol:'alcohol',acid:'carboxylic acid',ester:'ester'},RG=[['br','Bromine water'],['na','Sodium'],['co','Sodium carbonate']];
 const cond=(k,n,n2)=>{const ch=j=>'CH₂'.repeat(Math.max(0,j));
  if(k==='ane')return n===1?'CH₄':'CH₃'+ch(n-2)+'CH₃';if(k==='ene')return n===2?'CH₂=CH₂':'CH₂=CH'+ch(n-3)+'CH₃';
  if(k==='ol')return 'CH₃'+ch(n-1)+'OH';const a=n===1?'HCOO':'CH₃'+ch(n-2)+'COO';return k==='acid'?a+'H':a+(n2===1?'CH₃':ch(n2-1)+'CH₃')};
 const nm=(k,n,n2)=>k==='ane'?STEM[n]+'ane':k==='ene'?STEM[n]+'ene':k==='ol'?STEM[n]+'anol':k==='acid'?STEM[n]+'anoic acid':STEM[n2]+'yl '+STEM[n]+'anoate';
 function mol(kind,n,n2){const bb=[];let dbl=-1,co=-1;
  if(kind==='ester'){for(let i=0;i<n;i++)bb.push('C');co=n-1;bb.push('O');for(let i=0;i<n2;i++)bb.push('C')}
  else{for(let i=0;i<n;i++)bb.push('C');if(kind==='ol'||kind==='acid')bb.push('O');if(kind==='acid')co=n-1;if(kind==='ene')dbl=0}
  const at=bb.map((el,i)=>({id:'b'+i,el,i,dx:0,dy:0})),bonds=[];for(let i=0;i<bb.length-1;i++)bonds.push(['b'+i,'b'+(i+1),i===dbl?2:1]);
  if(co>=0){at.push({id:'q',el:'O',i:co,dx:0,dy:-1});bonds.push(['b'+co,'q',2])}
  bb.forEach((el,i)=>{let used=(i>0)+(i<bb.length-1)+(dbl>=0&&(i===dbl||i===dbl+1)?1:0)+(i===co?2:0);const v=el==='C'?4:2;
   for(const[dx,dy]of el==='O'?[[1,0],[-1,0]]:[[0,-1],[0,1],[-1,0],[1,0]]){if(used>=v)break;if((dx<0&&i>0)||(dx>0&&i<bb.length-1)||(dy<0&&i===co))continue;
    const id=`h${i}${dx}${dy}`;at.push({id,el:'H',i,dx,dy});bonds.push(['b'+i,id,1]);used++}});
  const L=bb.length-1,hO=(at.find(a=>a.el==='H'&&a.i===L&&bb[L]==='O')||{}).id;
  const g=kind==='ene'?['b0','b1']:kind==='ol'?['b'+L,hO]:kind==='acid'?['b'+co,'q','b'+L,hO]:kind==='ester'?['b'+co,'q','b'+(co+1)]:[];
  return{kind,n,n2,bb,at,bonds,g:new Set(g),name:nm(kind,n,n2),f:cond(kind,n,n2)}}
 const res=(k,r)=>r==='br'?(k==='ene'?'decol':'orange'):r==='na'?(k==='ol'||k==='acid'?'H2':'none'):(k==='acid'?'CO2':'none');
 const RTXT={decol:'orange → colourless',orange:'stays orange',H2:'fizzes: hydrogen',CO2:'fizzes: carbon dioxide',none:'no change'};
VIS.reg('flagfgroup',c=>{let A,pad,chal,read;const hot=[];
 const W={m:mol('ol',2),sel:new Set(),found:new Set(),grid:new Map(),done:new Set(),sorted:new Set(),tube:null,drag:null,est:0,fly:0,sortI:0,shake:0,goal:()=>{},run:0,hide:false};
 const say=t=>{t=t.charAt(0).toUpperCase()+t.slice(1);c.say(t);if(read)read.textContent=t};
 const key=m=>m.kind+m.n+(m.n2||'');
 function setM(k,n,n2){W.m=mol(k,n,n2);W.sel=new Set();W.tube=null;W.est=0;sync()}
 // ---- circling ----
 function tapAtom(id){if(A.step!==0&&A.step!==5)return;W.sel.has(id)?W.sel.delete(id):W.sel.add(id);A.sound.tick();
  const a=W.m.at.find(x=>x.id===id);say(`${W.sel.has(id)?'Circled':'Uncircled'} ${a.el} atom. ${W.sel.size} atom${W.sel.size===1?'':'s'} circled.`);sync()}
 function check(){const m=W.m,miss=[...m.g].filter(i=>!W.sel.has(i)),extra=[...W.sel].filter(i=>!m.g.has(i)),el=i=>m.at.find(a=>a.id===i).el;let t;
  if(!W.sel.size)t='Tap atoms to circle them first.';
  else if(!miss.length&&!extra.length){W.found.add(key(m));A.sound.pop();t=`Yes: ${GRP[m.kind]} is the functional group of ${m.name}, so it is ${m.kind==='acid'?'a':'an'} ${FAM[m.kind]}. The rest is a carbon chain like any alkane's.`}
  else if(extra.length&&!miss.length)t=`You circled ${extra.length} atom${extra.length>1?'s':''} of the chain too. ${extra.map(el).join(', ')} ${extra.length>1?'are':'is'} in every alkane as well, so ${extra.length>1?'they':'it'} cannot give ${m.name} its own reactions. Leave the chain out.`;
  else if(m.kind==='ol'&&miss.some(i=>el(i)==='H'))t='–OH is two atoms: the O and the H bonded to it. Circle the H as well.';
  else if(m.kind==='acid'&&miss.includes('q'))t='That O–H sits on a carbon that also has a C=O. The C, both O atoms and the H work together as –COOH: circle all four.';
  else if(m.kind==='ene')t='The group is the double bond itself, so both carbons joined by C=C belong in the circle.';
  else t=`Not yet: ${miss.length} atom${miss.length>1?'s':''} of the group still missing${extra.length?` and ${extra.length} chain atom${extra.length>1?'s':''} circled`:''}.`;
  if(t.startsWith('Yes'))W.sel=new Set(m.g);else{A.sound.miss();W.shake=1;A.tween(W,{shake:0},500,'out')}say(t);sync();W.goal()}
 // ---- tests ----
 function test(r){const m=W.m,k=m.kind,out=res(k,r);W.tube={r,out,col:r==='br'?1:0};W.grid.set(key(m)+':'+r,out);W.done.add(key(m)+':'+r);
  if(r==='br'&&out==='decol')A.tween(W.tube,{col:0},900,'out');if(out==='H2'||out==='CO2'){A.sound.pop();bubbles()}else A.sound.tick();
  const why=out==='decol'?'Bromine adds across the C=C.':out==='H2'?`The H on the ${k==='acid'?'–COOH':'–OH'} is replaced by sodium.`:out==='CO2'?'Only –COOH is acidic enough to react with a carbonate.':`${m.name} has no ${r==='br'?'C=C':r==='na'?'O–H':'–COOH'} group for it to react with.`;
  say(`${RG.find(x=>x[0]===r)[1]} + ${m.name}: ${RTXT[out]}. ${why}`);sync();W.goal()}
 function bubbles(){const b=W.tubeBox;if(!b||A.reduced())return;A.fx.add(22,i=>({x:b.x+8+Math.random()*(b.w-16),y:b.y+b.h-8,vx:(Math.random()-.5)*16,vy:-40-Math.random()*60,g:-30,life:1.1+Math.random()*.6,r:2+Math.random()*2.2,col:A.alpha(A.col.tx,.45)}));A.kick()}
 function join(){if(W.est)return;W.m=mol('ester',2,2);W.est=1;W.sel=new Set();W.tube=null;W.fly=1;A.sound.pop();A.tween(W,{fly:0},1400,'out');
  say('The OH from the acid and the H from the alcohol leave as water, H₂O. The acid carbon bonds to the alcohol O: ethyl ethanoate, CH₃COOCH₂CH₃, with a –COO– group.');sync();W.goal()}
 // ---- sorting ----
 const SORT=[['ol',3],['acid',1],['ene',4],['ester',2,1],['acid',2],['ester',1,2]],BINS=['ene','ol','acid','ester'];
 function bin(k){const s=SORT[W.sortI];if(!s)return;const m=W.m;
  if(k===m.kind){W.sorted.add(W.sortI);A.sound.pop();say(`Right: ${m.f} has ${GRP[k]}, so it is ${k==='ol'||k==='ene'||k==='ester'?'an':'a'} ${FAM[k]}, ${m.name}.`);W.sortI++;const n=SORT[W.sortI];if(n)W.m=mol(...n)}
  else{A.sound.miss();W.shake=1;A.tween(W,{shake:0},500,'out');
   say(m.kind==='acid'&&k==='ol'?'It does have an O–H, but that OH sits on a C=O carbon. Together they are –COOH, so the family is carboxylic acid.':
    m.kind==='ester'&&k==='acid'?'Look at the single-bonded O. In –COOH it carries an H; here it carries a carbon chain, so it is –COO–, an ester.':
    m.kind==='acid'&&k==='ester'?'The single-bonded O carries an H, not a carbon. That makes it –COOH, a carboxylic acid.':
    `${m.f} has no ${GRP[k]}. Find its group first: it is ${GRP[m.kind]}.`)}sync();W.goal()}
 function play(list,ms=300){const tok=++W.run;let j=0;const go=()=>{if(tok!==W.run||j>=list.length)return;list[j++]();A.tween({u:0},{u:1},ms,'io',go)};go()}
 function describe(){const m=W.m;if(!m)return 'Ethanoic acid, CH₃COOH, above ethanol, CH₃CH₂OH. Ringed in amber: the OH of the acid and the H of the alcohol OH, which can leave together as water.';const hid=A.step===4&&W.sortI<SORT.length;let t=`Displayed formula of ${hid?'a molecule to sort':m.name}, ${m.f}. Atoms in a row: ${m.bb.join('–')}`+(m.at.some(a=>a.id==='q')?', with a C=O on the carbonyl carbon':'')+'.';
  if(W.sel.size)t+=` Circled: ${[...W.sel].map(i=>m.at.find(a=>a.id===i).el).join(', ')}.`;if(W.found.has(key(m)))t+=` Functional group ${GRP[m.kind]} found.`;
  if(W.tube)t+=` Last test: ${RG.find(x=>x[0]===W.tube.r)[1]}, ${RTXT[W.tube.out]}.`;
  if(A.step===2)t+=' Results: '+G2.map(([k,n])=>nm(k,n)+' '+RG.map(([r,l])=>l+' '+(W.grid.has(k+n+':'+r)?RTXT[W.grid.get(k+n+':'+r)]:'not tested')).join(', ')).join('; ')+'.';
  if(A.step===4)t+=` ${W.sorted.size} of ${SORT.length} sorted.`;return t}
 const G2=[['ane',2],['ene',2],['ol',2],['acid',2]];
 function sync(){if(!A)return;A.cv.setAttribute('aria-label',describe());if(!pad)return;pad.innerHTML='';const s=A.step,b=(t,aria,f,off)=>{const x=c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':aria},pad,t);x.disabled=!!off;x.onclick=f};
  if(s===6)return A.redraw();const rg=()=>RG.forEach(([r,l])=>b(l,`Test ${W.m.name} with ${l.toLowerCase()}`,()=>test(r)));
  if(s===0){[['ol',2],['acid',2],['ene',2]].forEach(([k,n])=>b(nm(k,n),`Show ${nm(k,n)}`,()=>setM(k,n)));W.m.at.forEach(a=>b(`${W.sel.has(a.id)?'☑':'☐'} ${a.dx||a.dy?(a.el==='O'?'=O':'H')+' on '+W.m.bb[a.i]+(a.i+1):a.el+(a.i+1)}`,`${W.sel.has(a.id)?'Uncircle':'Circle'} ${a.el} atom ${atomWhere(a)}`,()=>tapAtom(a.id)));b('Check my circle','Check the circled atoms',check)}
  if(s===1){[1,2,3,4].forEach(n=>b(nm('ol',n),`Show ${nm('ol',n)}`,()=>setM('ol',n)));rg()}
  if(s===2){G2.forEach(([k,n])=>b(nm(k,n),`Show ${nm(k,n)}`,()=>setM(k,n)));rg()}
  if(s===3){if(!W.est)b('Join the acid and the alcohol','Join ethanoic acid and ethanol to make an ester',join);else rg()}
  if(s===4&&W.sortI<SORT.length)BINS.forEach(k=>b(`${FAM[k]} ${GRP[k]}`,`Put ${W.m.f} in ${FAM[k]}s`,()=>bin(k)));
  if(s===5){[['ane',2],['ene',3],['ol',3],['acid',3],['ester',2,1]].forEach(([k,n,n2])=>b(FAM[k],`Show an ${FAM[k]}`,()=>setM(k,W.m.kind===k?W.m.n:n,n2)));
   b('Chain −','Shorter chain',()=>setM(W.m.kind,W.m.n-1,W.m.n2),W.m.n<=(W.m.kind==='ene'?2:1));b('Chain +','Longer chain',()=>setM(W.m.kind,W.m.n+1,W.m.n2),W.m.n>=4);rg()}
  A.redraw()}
 const atomWhere=a=>a.dy<0?`above atom ${a.i+1}`:a.dy>0?`below atom ${a.i+1}`:a.dx?`at the ${a.dx<0?'left':'right'} end`:`number ${a.i+1} in the row`;
 // ---- drawing ----
 const COL={C:'#374151',O:'#dc2626',H:'#e5e7eb'};
 function pos(m,cx,cy,gap,L,mir){const s=mir?-1:1,P={},n=m.bb.length;m.at.forEach(a=>{const bx=cx+s*(a.i-(n-1)/2)*gap;P[a.id]=a.dx||a.dy?{x:bx+s*a.dx*L,y:cy+a.dy*L}:{x:bx,y:cy}});return P}
 function drawM(m,P,o={}){const{ctx,col:C,paint:Pt}=A,z=o.z||1,R=a=>(a.el==='H'?9:13)*z;ctx.lineCap='round';
  if(o.halo){const ps=[...m.g].map(i=>P[i]),x0=Math.min(...ps.map(p=>p.x))-18,x1=Math.max(...ps.map(p=>p.x))+18,y0=Math.min(...ps.map(p=>p.y))-18,y1=Math.max(...ps.map(p=>p.y))+18;
   ctx.fillStyle=A.alpha(C.gr,.18);Pt.rrect(x0,y0,x1-x0,y1-y0,14);ctx.fill();ctx.strokeStyle=C.gr;ctx.lineWidth=2;ctx.stroke();const yb=Math.max(...Object.values(P).map(p=>p.y))+R({})+16;Pt.label(`${GRP[m.kind]}: ${FAM[m.kind]}`,(x0+x1)/2,Math.max(y1+12,yb),{font:'700 12px system-ui',bg:C.gr})}
  m.bonds.forEach(([a,b,k])=>{const p=P[a],q=P[b],d=Math.hypot(q.x-p.x,q.y-p.y)||1,ux=(q.x-p.x)/d,uy=(q.y-p.y)/d;ctx.strokeStyle=k===2?C.ac:C.tx;ctx.lineWidth=2.6;
   for(const off of k===2?[-4,4]:[0]){ctx.beginPath();ctx.moveTo(p.x+ux*R(m.at.find(x=>x.id===a))-uy*off,p.y+uy*R(m.at.find(x=>x.id===a))+ux*off);ctx.lineTo(q.x-ux*R(m.at.find(x=>x.id===b))-uy*off,q.y-uy*R(m.at.find(x=>x.id===b))+ux*off);ctx.stroke()}});
  m.at.forEach(a=>{const p=P[a.id],r=R(a);if(o.leave&&o.leave.has(a.id)){ctx.setLineDash([3,3]);ctx.strokeStyle=C.am;ctx.lineWidth=2;ctx.beginPath();ctx.arc(p.x,p.y,r+6,0,7);ctx.stroke();ctx.setLineDash([])}
   if(W.sel.has(a.id)&&!o.nosel){ctx.strokeStyle=C.am;ctx.lineWidth=3.5;ctx.beginPath();ctx.arc(p.x,p.y,r+5,0,7);ctx.stroke()}
   Pt.ball(p.x,p.y,r,COL[a.el]);ctx.fillStyle=a.el==='H'?'#111':'#fff';ctx.font=`800 ${Math.round((a.el==='H'?11:13)*Math.min(z,1.25))}px system-ui`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(a.el,p.x,p.y+.5);
   if(o.hit)hot.push({k:'atom',id:a.id,x:p.x-r-5,y:p.y-r-5,w:2*r+10,h:2*r+10})})}
 function draw(A){const{ctx,W:Wd,H,col:C,paint:Pt}=A,s=A.step,nar=A.narrow;hot.length=0;ctx.fillStyle=Pt.lin(0,0,0,H,[[0,A.mix(C.pn,C.cy,.06)],[1,C.pn]]);ctx.fillRect(0,0,Wd,H);
  const mh=s===3&&!W.est?H-40:s===0?H-52:s===4?H-(nar?140:80):s===6?H-8:H-(nar?190:170),m=W.m,sh=W.shake*Math.sin(W.shake*28)*6;
  if(s===3&&!W.est){const L=34,gap=Math.min(nar?54:70,(Wd-40-2*L)/4),cx=Wd/2-gap,y1=mh*.3,y2=mh*.78,ac=mol('acid',2),al=mol('ol',2),Pa=pos(ac,cx,y1,gap,L),Pl=pos(al,cx+2*gap,y2,gap,L,true);
   drawM(ac,Pa,{leave:new Set(['b2',[...ac.g][3]]),nosel:1});drawM(al,Pl,{leave:new Set([[...al.g][1]]),nosel:1});
   Pt.label('ethanoic acid',cx-gap,y1+L+24,{font:'600 11px system-ui',bg:A.alpha(C.tx,.7),col:C.pn});Pt.label('ethanol',cx+3*gap,y2+L+24,{font:'600 11px system-ui',bg:A.alpha(C.tx,.7),col:C.pn});ctx.fillStyle=C.mu;ctx.font='600 12px system-ui';ctx.textAlign='center';ctx.textBaseline='alphabetic';ctx.fillText('Drag the acid down onto the ethanol',Wd/2,H-14);
   W.acBox={x:cx-2*gap,y:0,w:4*gap,h:(y1+y2)/2};W.alBox={x:cx,y:(y1+y2)/2,w:4*gap,h:mh-(y1+y2)/2};
   if(W.drag&&W.drag.k==='ac'){ctx.strokeStyle=C.am;ctx.lineWidth=3;ctx.setLineDash([6,5]);ctx.beginPath();ctx.moveTo(W.drag.x0,W.drag.y0);ctx.lineTo(W.drag.x,W.drag.y);ctx.stroke();ctx.setLineDash([])}}
  else if(m){const n=m.bb.length,z=Math.max(.7,Math.min(1.6,(Wd-40)/((n-1)*64+64),(mh-40)/130)),L=38*z,gap=64*z,P=pos(m,Wd/2+sh,mh*.5+6,gap,L);
   drawM(m,P,{z,halo:(s===0||s===5)&&W.found.has(key(m)),hit:s===0||s===5});W.molBox={x:0,y:0,w:Wd,h:mh};
   ctx.fillStyle=C.tx;ctx.textAlign='left';ctx.textBaseline='top';ctx.font=`800 ${nar?13:15}px system-ui`;ctx.fillText(W.hide?'?':s===4&&W.sortI<SORT.length?`${m.f}: which family?`:`${m.name}  ${m.f}`,10,8);
   if(W.fly>.02){Pt.label('+ H₂O',Wd/2+gap/2,mh*.52-L-10-40*(1-W.fly),{font:'800 13px system-ui',bg:A.alpha(C.cy,W.fly),col:'#fff'})}}
  let y=mh+6;
  if(s===0){const L3=[['ol',2],['acid',2],['ene',2]],cw=(Wd-20)/3;L3.forEach(([k,n],i)=>{const f=W.found.has(k+n),on=key(m)===k+n;ctx.fillStyle=f?A.mix(C.pn,C.gr,.25):C.pn;Pt.rrect(10+i*cw+3,y,cw-6,34,10);ctx.fill();ctx.strokeStyle=on?C.am:A.alpha(C.tx,.3);ctx.lineWidth=on?3:1;Pt.rrect(10+i*cw+3,y,cw-6,34,10);ctx.stroke();
   ctx.fillStyle=C.tx;ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`700 ${nar?11:12}px system-ui`;ctx.fillText((f?'✓ ':'')+nm(k,n),10+i*cw+cw/2,y+17);hot.push({k:'pick',kind:k,n,x:10+i*cw,y,w:cw,h:34})})}
  if(s>=1&&s<=5&&s!==4&&(s!==3||W.est)){const cw=Math.min(150,(Wd-20)/3);RG.forEach(([r,l],i)=>{const x=10+i*cw,d=W.drag&&W.drag.k==='rg'&&W.drag.r===r,bx=d?W.drag.x-cw/2:x,by=d?W.drag.y-15:y;
    Pt.shadow(5,2,.2);ctx.fillStyle=r==='br'?'#b45309':r==='na'?'#475569':'#0e7490';Pt.rrect(bx+3,by,cw-6,30,10);ctx.fill();Pt.noShadow();ctx.fillStyle='#fff';ctx.font=`700 ${nar?10.5:12}px system-ui`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(l,bx+cw/2,by+15);hot.push({k:'rg',r,x,y,w:cw,h:30})});
   y+=40;const tw=58,th=H-y-10;W.tubeBox={x:12,y,w:tw,h:th};const t=W.tube;ctx.fillStyle=t?(t.r==='br'?A.mix('#e5e7eb','#f59e0b',t.col):A.alpha(C.cy,.12)):A.alpha(C.tx,.06);Pt.rrect(12,y+th*.25,tw,th*.75,14);ctx.fill();
   ctx.strokeStyle=A.alpha(C.tx,.45);ctx.lineWidth=1.5;Pt.rrect(12,y,tw,th,14);ctx.stroke();ctx.save();Pt.rrect(12,y,tw,th,14);ctx.clip();A.fx.draw(ctx);ctx.restore();
   ctx.fillStyle=C.tx;ctx.textAlign='left';ctx.textBaseline='top';ctx.font='600 12px system-ui';ctx.fillText(t?RTXT[t.out]:'drag a reagent onto the molecule',tw+22,y);
   if(s===2){const gx=tw+22,gw=Wd-gx-8,c0=Math.min(98,gw*.31),cw2=(gw-c0)/3,rh=Math.min(22,(th-20)/5);ctx.font=`700 ${nar?9.5:11}px system-ui`;
    RG.forEach(([r,l],j)=>ctx.fillText(l.replace('Sodium carbonate','Na₂CO₃').replace('Bromine water','Br₂ water'),gx+c0+j*cw2,y+20));
    G2.forEach(([k,n],i)=>{const yy=y+20+rh*(i+1),on=key(m)===k+n;if(on){ctx.fillStyle=A.alpha(C.am,.2);ctx.fillRect(gx-2,yy-2,gw,rh)}ctx.fillStyle=C.tx;ctx.fillText(nm(k,n),gx,yy);hot.push({k:'row',kind:k,n,x:gx,y:yy-2,w:gw,h:rh});
     RG.forEach(([r],j)=>{const v=W.grid.get(k+n+':'+r);ctx.fillStyle=!v?C.mu:v==='none'||v==='orange'?C.tx:C.gr;ctx.fillText(!v?'?':v==='decol'?'colourless':v==='orange'?'orange':v==='none'?'–':v==='H2'?'H₂ fizz':'CO₂ fizz',gx+c0+j*cw2,yy)})})}
   else if(s===3&&W.est)ctx.fillText(`Ester tests: ${RG.filter(([r])=>W.done.has('ester22:'+r)).length} of 3`,tw+22,y+20)}
  if(s===4){const done=W.sortI>=SORT.length,cols=nar?2:4,cw=(Wd-20)/cols,bh=Math.min(48,(H-y-12)/(nar?2:1)-6);ctx.fillStyle=C.tx;ctx.textAlign='left';ctx.textBaseline='top';ctx.font='600 12px system-ui';
   if(done)ctx.fillText('All six sorted by their functional group.',12,y);
   BINS.forEach((k,i)=>{const x=10+(i%cols)*cw,yy=y+(done?20:0)+Math.floor(i/cols)*(bh+6);ctx.fillStyle=A.mix(C.pn,[C.ac,C.cy,C.am,C.vi][i],.16);Pt.rrect(x+3,yy,cw-6,bh,12);ctx.fill();ctx.strokeStyle=A.alpha(C.tx,.3);ctx.lineWidth=1;ctx.stroke();
    ctx.fillStyle=C.tx;ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`800 ${nar?12:13}px system-ui`;ctx.fillText(GRP[k],x+cw/2,yy+bh/2-8);ctx.font='600 11px system-ui';ctx.fillText(FAM[k]+' ('+SORT.filter((q,j)=>W.sorted.has(j)&&q[0]===k).length+')',x+cw/2,yy+bh/2+9);hot.push({k:'bin',kind:k,x,y:yy,w:cw,h:bh})})}}
 // ---- steps ----
 const fresh=()=>{W.run++;W.sel=new Set();W.found=new Set();W.grid=new Map();W.done=new Set();W.sorted=new Set();W.sortI=0;W.tube=null;W.est=0;W.fly=0;W.drag=null;W.hide=false;W.goal=()=>{};c.say('');if(read)read.textContent=''};
 const fin=(i,ok,msg)=>()=>{if(A.extra.querySelector('.fl-task')&&ok())A.done(msg+A.reveal(i))};
 const circ=(k,n)=>[()=>setM(k,n),()=>{W.sel=new Set(W.m.g);sync()},check];
 const steps=[
  {h:'Circle the group',p:'Most of an organic molecule is a plain carbon chain. The functional group is the small part that does the reacting. Tap atoms to circle it, then check.',
   predict:{q:'In ethanol, CH₃CH₂OH, which part is the functional group?',opts:['The CH₃ at the end','The –OH','The whole molecule'],ans:1},
   task:'Circle the group in ethanol, ethanoic acid and ethene',show:()=>play([['ol',2],['acid',2],['ene',2]].filter(([k,n])=>!W.found.has(k+n)).flatMap(([k,n])=>circ(k,n)),350),
   go:()=>{fresh();setM('ol',2);W.goal=fin(0,()=>['ol2','acid2','ene2'].every(x=>W.found.has(x)),'–OH, –COOH and C=C: each is a few atoms on an ordinary chain.')}},
  {h:'Same group, same reaction',p:'Drop a small piece of sodium into each alcohol. Only the chain length changes.',
   predict:{q:'Ethanol fizzes with sodium. Butanol has a chain twice as long. What will it do?',opts:['Nothing: a longer chain changes the reaction','Fizz too: it still has –OH','Turn bromine water colourless'],ans:1},
   task:'Test all four alcohols with sodium',show:()=>play([1,2,3,4].filter(n=>!W.done.has('ol'+n+':na')).flatMap(n=>[()=>setM('ol',n),()=>test('na')])),
   go:()=>{fresh();setM('ol',1);W.goal=fin(1,()=>[1,2,3,4].every(n=>W.done.has('ol'+n+':na')),'Every alcohol fizzes, giving hydrogen. The –OH reacts; the chain just comes along.')}},
  {h:'Change the group',p:'Now keep two carbons and change the group. Run all three tests on each molecule to fill the grid.',
   predict:{q:'Ethane and ethanol both have two carbons. Which one fizzes with sodium?',opts:['Both: same number of carbons','Only ethanol','Neither'],ans:1},
   task:'Fill the whole results grid',show:()=>play(G2.flatMap(([k,n])=>[()=>setM(k,n),...RG.map(([r])=>()=>test(r))]),220),
   go:()=>{fresh();setM('ane',2);W.goal=fin(2,()=>G2.every(([k,n])=>RG.every(([r])=>W.grid.has(k+n+':'+r))),'One group, one pattern of results. Only C=C clears bromine water; only –COOH fizzes with carbonate.')}},
  {h:'Make a new group',p:'An acid and an alcohol can join. Drag ethanoic acid onto ethanol, then test what you made.',
   predict:{q:'The new molecule has no O–H left. Will it still fizz with sodium?',opts:['Yes: both starting chemicals fizzed','No: both O–H groups were used up','Only half of it fizzes'],ans:1},
   task:'Make the ester, then test it with all three reagents',show:()=>play([join,...RG.map(([r])=>()=>test(r))],420),
   go:()=>{fresh();W.m=null;sync();W.goal=fin(3,()=>W.est&&RG.every(([r])=>W.done.has('ester22:'+r)),'Ethyl ethanoate has –COO–. With no C=C and no O–H, none of the tests react.')}},
  {h:'Name the family',p:'The group tells you the family. Look at each structure, find its group, then tap the right box.',
   predict:{q:'CH₃COOH contains an –OH. Which family is it in?',opts:['Alcohols, because of the OH','Carboxylic acids','Both families'],ans:1},
   task:'Sort all six molecules by their group',show:()=>play(SORT.slice(W.sortI).map(()=>()=>bin(W.m.kind)),350),
   go:()=>{fresh();W.m=mol(...SORT[0]);sync();W.goal=fin(4,()=>W.sorted.size===SORT.length,'Find the group, name the family: –OH alcohol, –COOH carboxylic acid, C=C alkene, –COO– ester.')}},
  {h:'Sandbox',p:'Pick any family and chain length. Circle its group and test it.',go:()=>{fresh();setM('acid',3)}},
  {h:'Challenge',p:'',go:()=>{fresh();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>W.goal()});
 // ---- challenge ----
 const QS=[{t:'atoms',k:'acid',n:3},{t:'fam',k:'ester',n:2,n2:1},{t:'test'},{t:'pred',n:4},{t:'fam',k:'acid',n:2},{t:'brom',n:3},{t:'atoms',k:'ol',n:3},{t:'fam',k:'ene',n:3}];let qi=-1,streak=0;
 function ask(){qi=(qi+1)%QS.length;const q=QS[qi];let html,opts;
  if(q.t==='atoms'){q.m=mol(q.k,q.n);html=`<p><b>Which atoms make up the functional group of ${q.m.name}?</b></p>`;
   opts=q.k==='acid'?[{l:'C, =O, O and H: –COOH',s:'ok'},{l:'Just the O and H: –OH',s:'ohonly'},{l:'The CH₃CH₂ chain',s:'chain'}]:[{l:'The O and its H: –OH',s:'ok'},{l:'Just the O',s:'oonly'},{l:'The CH₃ end',s:'chain'}]}
  else if(q.t==='fam'){q.m=mol(q.k,q.n,q.n2);html=`<p><b>Which family is ${q.m.f} in?</b></p>`;
   opts=q.k==='ester'?[{l:'Ester',s:'ok'},{l:'Carboxylic acid',s:'acidester'},{l:'Alcohol',s:'ohin'}]:q.k==='acid'?[{l:'Carboxylic acid',s:'ok'},{l:'Alcohol',s:'acidol'},{l:'Ester',s:'esteracid'}]:[{l:'Alkene',s:'ok'},{l:'Alkane',s:'count'},{l:'Alcohol',s:'nogroup'}]}
  else if(q.t==='test'){q.m=mol('acid',2);html='<p><b>A colourless liquid fizzes with sodium carbonate. Which group must it have?</b></p>';opts=[{l:'–COOH',s:'ok'},{l:'–OH',s:'ohcarb'},{l:'C=C',s:'brcarb'}]}
  else if(q.t==='pred'){q.m=mol('ol',4);html='<p><b>Ethanol fizzes with sodium. No one has tested butanol yet. What should you predict?</b></p>';opts=[{l:'It fizzes too',s:'ok'},{l:'No reaction: its chain is longer',s:'chainmatters'},{l:'It turns bromine water colourless',s:'mix'}]}
  else{q.m=mol('ene',3);html='<p><b>Which of these turns orange bromine water colourless?</b></p>';opts=[{l:'Propene',s:'ok'},{l:'Propanol',s:'olbr'},{l:'Propanoic acid',s:'acidbr'}]}
  W.m=q.m;W.sel=new Set();W.hide=q.t!=='atoms'&&q.t!=='fam';const k=qi%opts.length;opts=opts.slice(k).concat(opts.slice(0,k));
  chal.innerHTML=html+'<div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>';
  const row=chal.querySelector('.fl-pick');opts.forEach(o=>{const x=c.el('button',{type:'button',class:'lbtn sm'},row,o.l);x.onclick=()=>judge(q,o)});sync()}
 function judge(q,o){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb');let m;W.hide=false;W.found.add(key(q.m));
  if(o.s==='ok')m=`${q.m.name[0].toUpperCase()+q.m.name.slice(1)}: ${GRP[q.m.kind]} is the group that reacts, and it names the family, ${FAM[q.m.kind]}.`;
  else if(o.s==='ohonly')m=`That O–H is attached to a carbon with a C=O. The four atoms act together as –COOH, which is why acids fizz with carbonate and alcohols do not.`;
  else if(o.s==='oonly')m=`–OH is two atoms. The H on the O is the one sodium replaces, so it belongs in the group.`;
  else if(o.s==='chain')m=`The chain is the same as in an alkane, which does not react with these tests. The functional group is the part that is different: ${GRP[q.m.kind]}.`;
  else if(o.s==='acidester')m=`The single-bonded O has a carbon on its far side, not an H. That is –COO–, an ester; –COOH would need the H.`;
  else if(o.s==='esteracid')m=`The single-bonded O carries an H, so the group is –COOH, a carboxylic acid. An ester has a carbon there instead.`;
  else if(o.s==='ohin')m=`There is an O in it, but no –OH on its own. The O atoms belong to ${GRP[q.m.kind]}, so the family is ${FAM[q.m.kind]}.`;
  else if(o.s==='acidol')m=`It does have an O–H, but that OH is on a carbon with a C=O. Together they form –COOH, so it is a carboxylic acid, not an alcohol.`;
  else if(o.s==='count')m=`Count the H: an alkane would have 2n + 2. This one has a C=C, the alkene group.`;
  else if(o.s==='nogroup')m=`There is no oxygen at all, so it cannot have –OH. Its group is the C=C.`;
  else if(o.s==='ohcarb')m=`Alcohols fizz with sodium but not with carbonate. Only –COOH is acidic enough to release CO₂ from a carbonate.`;
  else if(o.s==='brcarb')m=`C=C is found with bromine water, not carbonate. The carbonate fizz is the test for –COOH.`;
  else if(o.s==='chainmatters')m=`Butanol has the same –OH group as ethanol, and the group decides the reaction. The longer chain only changes things like boiling point.`;
  else if(o.s==='mix')m=`That is the C=C test. Butanol has –OH, not C=C, so expect what ethanol does: fizz with sodium.`;
  else m=`It has three carbons like propene, but no C=C. Only the double bond can take up bromine, so only propene clears the colour.`;
  if(o.s==='ok'){streak++;A.win();fb.innerHTML=`✓ ${m} Streak: ${streak}. <button type="button" class="linkish">Another →</button>`}
  else{streak=0;A.sound.miss();fb.innerHTML=`✗ Not quite. ${m} <button type="button" class="linkish">Another →</button>`}
  fb.querySelector('button').onclick=ask;sync()}
 A=FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:A=>{chal.hidden=A.step!==6;sync()},
  init:A=>{const E=c.el,box=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},box);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Circle atoms, pick molecules and run tests'},box);chal=E('div',{class:'fl-chal'},A.below);
   const inB=(p,q)=>q&&p.x>=q.x&&p.x<=q.x+q.w&&p.y>=q.y&&p.y<=q.y+q.h;
   A.gest({down:p=>{if(A.step===6)return false;if(A.step===3&&!W.est&&inB(p,W.acBox)){W.drag={k:'ac',x0:p.x,y0:p.y,x:p.x,y:p.y};return true}
     const t=hot.find(q=>inB(p,q));if(!t)return false;if(t.k==='rg'){W.drag={k:'rg',r:t.r,x0:p.x,y0:p.y,x:p.x,y:p.y};return true}
     if(t.k==='atom')tapAtom(t.id);else if(t.k==='pick'||t.k==='row')setM(t.kind,t.n);else if(t.k==='bin')bin(t.kind);return false},
    move:p=>{if(W.drag){W.drag.x=p.x;W.drag.y=p.y;A.redraw()}},
    up:p=>{const d=W.drag;if(!d)return;W.drag=null;const tap=p&&Math.hypot(p.x-d.x0,p.y-d.y0)<8;
     if(d.k==='ac'){if(p&&inB(p,W.alBox))join();else{say('Drag the acid down onto the ethanol to join them.');sync()}return}
     if(tap||(p&&inB(p,W.molBox)))test(d.r);else{say('Drop the reagent on the molecule to test it.');sync()}}});sync()}});
 A.start()})})();
