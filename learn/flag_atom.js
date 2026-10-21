/* Flagship 11 – atoms, elements and compounds. Hook: keep cutting a gold coin in half; the learner predicts where it ends, then zooms in
   until single gold atoms appear. Then: sort particle pictures into element / compound / mixture (O2 and air are the traps),
   build water and carbon dioxide by dragging atoms together (bonds snap), a molecule sandbox, and a "build this formula" challenge with
   feedback for misread subscripts, extra loose atoms and "two of the same atom is still an element".
   SCIENCE CONTENT: self-checked only, pending science review (see learn/REVIEW-reels.md). Bonds are drawn as single lines. */
(()=>{const EL={H:['#f8fafc',1,.72,'hydrogen'],O:['#ef4444',2,1,'oxygen'],C:['#334155',4,1.05,'carbon'],N:['#3b82f6',3,1,'nitrogen']},
 NAMES={H2:'hydrogen gas (element)',O2:'oxygen gas (element)',N2:'nitrogen gas (element)',H2O:'water',CO2:'carbon dioxide',CO:'carbon monoxide',CH4:'methane',NH3:'ammonia',H2O2:'hydrogen peroxide',C2H6:'ethane',HCN:'hydrogen cyanide'};
VIS.reg('flagatom',c=>{let A,chal,sfb;const st={z:0,at:[],id:0,drag:null,cards:[],q:null,won:false};
 const R=A=>Math.min(A.W,A.H)*(A.narrow?.055:.045);
 const tray=A=>{const ks=Object.keys(EL),w=A.W/(ks.length+1);return ks.map((k,i)=>[k,w*(i+1),A.H*.1])};
 const formula=cnt=>{const f=(e)=>cnt[e]?e+(cnt[e]>1?cnt[e]:''):'';if(cnt.C)return f('C')+f('H')+f('N')+f('O');if(cnt.N&&cnt.H&&!cnt.O)return f('N')+f('H');if(cnt.H&&cnt.C===undefined&&cnt.N&&cnt.O)return f('H')+f('N')+f('O');return f('H')+f('N')+f('O')};
 const groups=()=>{const seen=new Set(),out=[];st.at.forEach(a=>{if(seen.has(a.id))return;const g=[],q=[a];seen.add(a.id);while(q.length){const x=q.pop();g.push(x);x.b.forEach(j=>{if(!seen.has(j)){seen.add(j);q.push(st.at.find(t=>t.id===j))}})}const cnt={};g.forEach(x=>cnt[x.e]=(cnt[x.e]||0)+1);out.push({g,cnt,f:formula(cnt)})});return out};
 const free=a=>EL[a.e][1]-a.b.length;
 const upd=()=>{const gs=groups();c.say(A.step===0?`Zoom ${Math.round(st.z*100)}%.`:A.step===1?'Drag each picture into Element, Compound or Mixture.':gs.length?'On the bench: '+gs.map(g=>g.f+(NAMES[g.f]?` (${NAMES[g.f]})`:'')).join(', ')+'.':'The bench is empty.');
  A.cv.setAttribute('aria-label',A.step===0?['A gold coin.','Gold seen under a microscope: tiny crystal grains.','Gold atoms packed in rows, all the same kind.'][Math.min(2,Math.floor(st.z*3))]:A.step===1?'Particle pictures to sort into element, compound and mixture.':'A tray of hydrogen, oxygen, carbon and nitrogen atoms above a bench for building molecules.');A.redraw()};
 let chk=()=>{};
 const atom=(A,x,y,e,r)=>{const P=A.paint,[col,,s]=EL[e]||['#facc15',0,1];P.shadow(8,3,.35);P.ball(x,y,r*s,col);P.noShadow();const ctx=A.ctx;ctx.fillStyle=e==='H'?'#0f172a':'#fff';ctx.font=`800 ${Math.round(r*s*.8)}px system-ui`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(e,x,y+1);ctx.textBaseline='alphabetic'};
 // ---------- hook ----------
 const zoom=A=>{const{ctx,W,H,paint:P,col:C}=A,z=st.z,cx=W/2,cy=H*.5;ctx.fillStyle=P.lin(0,0,0,H,[[0,'#0f172a'],[1,'#1e1b4b']]);ctx.fillRect(0,0,W,H);
  const a1=Math.max(0,1-Math.abs(z-0)*3),a2=Math.max(0,1-Math.abs(z-.5)*3),a3=Math.max(0,Math.min(1,(z-.6)*3));
  if(a1>0){ctx.globalAlpha=a1;const r=Math.min(W,H)*.28*(1+z*4);P.shadow(20,8,.5);ctx.fillStyle=P.rad(cx-r*.3,cy-r*.3,r*.1,r*1.1,[[0,'#fef08a'],[.6,'#eab308'],[1,'#a16207']]);ctx.beginPath();ctx.arc(cx,cy,r,0,7);ctx.fill();P.noShadow();ctx.strokeStyle='rgba(120,53,15,.5)';ctx.lineWidth=3;ctx.beginPath();ctx.arc(cx,cy,r*.85,0,7);ctx.stroke();ctx.fillStyle='rgba(120,53,15,.6)';ctx.font=`800 ${r*.4}px Georgia,serif`;ctx.textAlign='center';ctx.fillText('Au',cx,cy+r*.14)}
  if(a2>0){ctx.globalAlpha=a2;for(let i=0;i<40;i++){const x=((i*73)%100)/100*W,y=((i*41)%100)/100*H,s=30+((i*17)%40);ctx.fillStyle=A.mix('#ca8a04','#fde047',((i*29)%10)/10);ctx.beginPath();for(let k=0;k<6;k++){const a=k/6*Math.PI*2+i;ctx.lineTo(x+Math.cos(a)*s,y+Math.sin(a)*s*.8)}ctx.fill();ctx.strokeStyle='rgba(66,32,6,.6)';ctx.stroke()}}
  if(a3>0){ctx.globalAlpha=a3;const r=Math.min(W,H)*.06,dx=r*2.05,dy=r*1.78;for(let row=-1;row*dy<H+dy;row++)for(let col=-1;col*dx<W+dx;col++){const x=col*dx+(row%2?dx/2:0),y=row*dy;P.ball(x,y,r,'#eab308')}
   P.label('every one is a gold atom: Au',W/2,H*.5,{font:`800 ${A.narrow?14:16}px system-ui`,pill:1,bg:'rgba(15,23,42,.9)',col:'#fde047'})}
  ctx.globalAlpha=1;const sc=z<.33?'width shown: about 2 cm':z<.66?'width shown: about 0.1 mm':'width shown: about 1 nanometre';P.label(sc,W/2,H*.93,{font:'600 12px system-ui',pill:1,bg:'rgba(15,23,42,.85)',col:'#e2e8f0'});
  const bx=W-30,t=H*.15,b=H*.8;ctx.fillStyle='rgba(255,255,255,.15)';P.rrect(bx-5,t,10,b-t,5);ctx.fill();P.glow(A.alpha(C.am,.9),12);P.ball(bx,b-(b-t)*z,12,C.am);P.noShadow();P.label('zoom',bx,t-14,{font:'600 11px system-ui',col:'#e2e8f0'});
  if(A.pred[0]!=null&&!A.isDone){ctx.globalAlpha=.55+.45*Math.sin(performance.now()/230);P.label('👆 drag up to zoom in (or pinch)',W/2,H*.08,{pill:1,bg:A.alpha(C.am,.95),col:'#111'});ctx.globalAlpha=1}};
 // ---------- sort ----------
 const CARDS=[['gold',0,[['Au',0,0],['Au',1,0],['Au',0,1],['Au',1,1]]],['oxygen gas',0,[['O',0,0,1],['O',.9,0],['O',0,1.3,1],['O',.9,1.3]],'Two atoms are joined, but both are oxygen: only one type of atom, so it is an element.'],
  ['water',1,[['H',0,0],['O',.7,.4,0,1],['H',1.4,0]]],['carbon dioxide',1,[['O',0,0],['C',.9,0],['O',1.8,0]]],['helium and neon',2,[['He',0,0],['Ne',1,.4],['He',.3,1.2],['Ne',1.3,1.4]],'Two kinds of atom, but not joined to each other: just mixed, so it is a mixture.'],
  ['air',2,[['N',0,0],['N',.8,0],['O',.2,1.2],['O',1,1.2]],'Air is nitrogen and oxygen molecules mixed together, not joined: a mixture.']];
 const BIN=['Element','Compound','Mixture'],binR=(A,i)=>{const{W,H}=A,w=W/3;return A.narrow?{x:w*i+4,y:H*.5,w:w-8,h:H*.47}:{x:w*i+6,y:H*.58,w:w-12,h:H*.39}};
 const cardXY=(A,i)=>{const c_=st.cards[i];if(c_.bin!=null){const b=binR(A,c_.bin),k=st.cards.slice(0,i).filter(x=>x.bin===c_.bin).length;return[b.x+b.w/2,b.y+60+k*58]}const cols=3,w=A.W/cols;return[w*(i%cols)+w/2,A.H*.12+Math.floor(i/cols)*(A.narrow?80:70)]};
 const mini=(A,x,y,parts,label,state)=>{const{ctx,paint:P,col:C}=A,r=A.narrow?9:10;ctx.fillStyle=A.alpha(C.tx,.08);ctx.strokeStyle=state==null?A.alpha(C.am,.9):A.alpha(C.gr,.9);ctx.lineWidth=2;P.rrect(x-40,y-30,80,56,10);ctx.fill();ctx.stroke();
  const cols={Au:'#eab308',He:'#f0abfc',Ne:'#fb923c'},ox=x-14,oy=y-14;parts.forEach(([e,a,b])=>{const px=ox+a*r*2.1,py=oy+b*r*1.6;P.ball(px,py,r*(e==='H'?.7:1),cols[e]||EL[e][0])});ctx.strokeStyle='rgba(255,255,255,.8)';ctx.lineWidth=2;
  for(let i=0;i<parts.length-1;i++){const[e1,a1,b1,j1]=parts[i],[e2,a2,b2]=parts[i+1];if(j1||label==='water'&&i<2||label==='carbon dioxide'){ctx.beginPath();ctx.moveTo(ox+a1*r*2.1,oy+b1*r*1.6);ctx.lineTo(ox+a2*r*2.1,oy+b2*r*1.6);ctx.stroke()}}
  if(label==='oxygen gas'||label==='air'){[[0,0,.9,0],[0,1.3,.9,1.3],[0,0,.8,0],[.2,1.2,1,1.2]].slice(label==='air'?2:0,label==='air'?4:2).forEach(([a1,b1,a2,b2])=>{ctx.beginPath();ctx.moveTo(ox+a1*r*2.1,oy+b1*r*1.6);ctx.lineTo(ox+a2*r*2.1,oy+b2*r*1.6);ctx.stroke()})}
  ctx.fillStyle=C.tx;ctx.font='700 11px system-ui';ctx.textAlign='center';ctx.fillText(label,x,y+40)};
 const sorter=A=>{const{ctx,W,H,paint:P,col:C}=A;ctx.fillStyle=P.lin(0,0,0,H,[[0,A.mix(C.pn,C.vi,.06)],[1,C.pn]]);ctx.fillRect(0,0,W,H);
  BIN.forEach((n,i)=>{const b=binR(A,i),col=[C.cy,C.vi,C.pk][i];ctx.fillStyle=A.alpha(col,.14);P.rrect(b.x,b.y,b.w,b.h,14);ctx.fill();ctx.strokeStyle=A.alpha(col,.7);ctx.lineWidth=2;ctx.stroke();P.label(n,b.x+b.w/2,b.y+16,{font:'800 13px system-ui',col})});
  st.cards.forEach((c_,i)=>{if(c_.bin!=null)return;const[x,y]=st.drag&&st.drag.k==='card'&&st.drag.i===i?[st.drag.x,st.drag.y]:cardXY(A,i);mini(A,x,y,CARDS[i][2],CARDS[i][0],null)});
  BIN.forEach((n,b)=>{const r=binR(A,b),list=st.cards.map((c_,i)=>[c_,i]).filter(([c_])=>c_.bin===b);list.forEach(([c_,i],k)=>P.label('✓ '+CARDS[i][0],r.x+r.w/2,r.y+44+k*24,{font:`700 ${A.narrow?10:12}px system-ui`,pill:1,bg:A.alpha(C.gr,.95),col:'#04140a'}))})};
 // ---------- builder ----------
 const bench=A=>{const{ctx,W,H,paint:P,col:C}=A,r=R(A);ctx.fillStyle=P.lin(0,0,0,H,[[0,A.mix(C.pn,C.cy,.05)],[1,C.pn]]);ctx.fillRect(0,0,W,H);ctx.fillStyle=A.alpha(C.tx,.07);ctx.fillRect(0,H*.2,W,2);
  tray(A).forEach(([e,x,y])=>{atom(A,x,y,e,r);P.label(EL[e][3],x,y+r*1.5+6,{font:'600 10px system-ui',col:C.mu})});
  ctx.strokeStyle=A.alpha(C.tx,.85);ctx.lineWidth=4;st.at.forEach(a=>a.b.forEach(j=>{if(j>a.id){const q=st.at.find(t=>t.id===j);ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(q.x,q.y);ctx.stroke()}}));
  st.at.forEach(a=>atom(A,a.x,a.y,a.e,r));
  groups().forEach(g=>{const xs=g.g.map(a=>a.x),ys=g.g.map(a=>a.y),x=(Math.min(...xs)+Math.max(...xs))/2,y=Math.max(...ys)+r*1.6;const nm=NAMES[g.f];if(g.g.length>1||A.step>=2)P.label(g.f.replace(/(\d)/g,m=>'₀₁₂₃₄₅₆₇₈₉'[m])+(nm?' · '+nm:''),x,y+6,{font:'700 12px system-ui',pill:1,bg:A.alpha(nm?C.gr:C.panel||C.pn,.92),col:nm?'#04140a':C.tx})});
  if(st.drag&&st.drag.k==='atom'&&st.drag.e){atom(A,st.drag.x,st.drag.y,st.drag.e,r)}
  if(!A.isDone&&!st.drag&&st.at.length<2&&A.step<4){ctx.globalAlpha=.55+.45*Math.sin(performance.now()/230);P.label('👆 drag atoms down and touch them together',W/2,H*.27,{pill:1,bg:A.alpha(C.am,.95),col:'#111'});ctx.globalAlpha=1}};
 const draw=(A,dt)=>{A.am={st,groups,R:()=>R(A),tray:()=>tray(A),cardXY:i=>cardXY(A,i),binR:i=>binR(A,i)};if(A.step===0)zoom(A);else if(A.step===1)sorter(A);else bench(A)};
 const drop=(A,a)=>{const r=R(A);if(a.y<A.H*.2){st.at=st.at.filter(t=>t!==a);return}let best=null,bd=r*2.6;st.at.forEach(q=>{if(q===a||free(q)<=0||free(a)<=0||a.b.includes(q.id))return;const d=Math.hypot(q.x-a.x,q.y-a.y);if(d<bd){bd=d;best=q}});
  if(best){const d=Math.hypot(a.x-best.x,a.y-best.y)||1;let ux=(a.x-best.x)/d,uy=(a.y-best.y)/d;const L=r*(EL[a.e][2]+EL[best.e][2])*.95;a.x=best.x+ux*L;a.y=best.y+uy*L;a.b.push(best.id);best.b.push(a.id);A.sound.pop()}else A.sound.tick()};
 const make=(spec)=>{st.at=[];st.id=0;const g=geo0(A);spec.forEach(([e,x,y,bs])=>{st.at.push({id:st.id++,e,x:g.x+x*R(A)*1.9,y:g.y+y*R(A)*1.9,b:[]})});spec.forEach(([,,,bs],i)=>(bs||[]).forEach(j=>{st.at[i].b.push(j);st.at[j].b.push(i)}))};
 const geo0=A=>({x:A.W/2,y:A.H*.58});
 const has=f=>groups().some(g=>g.f===f);
 const steps=[
  {h:'Cut it again and again',p:'Take a gold coin. Cut it in half, then cut a half in half, and keep going. Could you go on for ever?',predict:{q:'If you keep cutting, you end up with…',opts:['smaller and smaller gold, for ever','a single gold atom, the smallest bit of gold','gold dust that is no longer gold'],ans:1},task:'Zoom all the way in',show:()=>{st.z=1;upd();chk()},go:()=>{st.z=0;chk=()=>{if(st.z>=.97)A.done('Atoms: the smallest pieces of gold that are still gold. Gold is an element, so every atom is the same kind.'+A.reveal(0))}}},
  {h:'Element, compound or mixture?',p:'Element: only one type of atom. Compound: different atoms joined together. Mixture: different particles, not joined.',task:'Drag every picture into the right box',show:()=>{st.cards.forEach((c_,i)=>c_.bin=CARDS[i][1]);upd();chk()},go:()=>{st.cards=CARDS.map(()=>({bin:null}));sfb.textContent='';chk=()=>{if(st.cards.every(c_=>c_.bin!=null))A.done('Oxygen gas is an element even though its atoms are in pairs. Air is a mixture even though it has molecules: they are not joined to each other.')}}},
  {h:'Build water',p:'Water is H₂O: two hydrogen atoms joined to one oxygen atom.',predict:{q:'Hydrogen and oxygen are gases. Water made from them is…',opts:['a mixture of the two gases','a new substance with new properties','still hydrogen and oxygen gas'],ans:1},task:'Drag atoms from the tray and touch them together to build H₂O',show:()=>{make([['O',0,0],['H',-.9,.6,[0]],['H',.9,.6,[0]]]);upd();chk()},go:()=>{st.at=[];chk=()=>{if(has('H2O'))A.done('H₂O. The atoms are joined, so it is a compound: a wet liquid, nothing like the two gases it is made of.'+A.reveal(2))}}},
  {h:'Build carbon dioxide',p:'CO₂: the small 2 belongs to the O in front of it.',predict:{q:'How many atoms are in one CO₂ molecule?',opts:['2','3','4'],ans:1},task:'Build CO₂',show:()=>{make([['C',0,0],['O',-1.1,0,[0]],['O',1.1,0,[0]]]);upd();chk()},go:()=>{st.at=[];chk=()=>{if(has('CO2'))A.done('1 carbon + 2 oxygen = 3 atoms. (Each C–O link is really a double bond; it is drawn as one line here.)'+A.reveal(3))}}},
  {h:'Sandbox',p:'Build anything. Try CH₄, NH₃ or H₂O₂. Drag an atom back to the tray to remove it; drag an atom away to break its bonds.',go:()=>{st.at=[];chk=()=>{}}},
  {h:'Challenge',p:'',go:()=>newChal()}];
 A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==5;sfb.hidden=A.step!==1;upd()},
  init:A=>{chal=c.el('div',{class:'fl-chal'},A.extra.parentNode);A.extra.parentNode.insertBefore(chal,A.extra.nextSibling);sfb=c.el('p',{class:'fl-fb',role:'status','aria-live':'polite'},A.extra.parentNode);A.extra.parentNode.insertBefore(sfb,chal);
   A.every(()=>A.step===0&&!A.isDone);
   A.gest({down:p=>{const s=A.step,r=R(A);
     if(s===0){if(A.pred[0]==null)return false;st.drag={k:'zoom',y0:p.y,z0:st.z};return true}
     if(s===1){for(let i=st.cards.length-1;i>=0;i--){if(st.cards[i].bin!=null)continue;const[x,y]=cardXY(A,i);if(Math.abs(p.x-x)<44&&Math.abs(p.y-y)<38){st.drag={k:'card',i,x:p.x,y:p.y};A.sound.pop();return true}}return false}
     if(s===5&&st.won)return false;
     for(const[e,x,y]of tray(A))if(Math.hypot(p.x-x,p.y-y)<r*1.3){st.drag={k:'atom',e,x:p.x,y:p.y};A.sound.pop();return true}
     for(let i=st.at.length-1;i>=0;i--){const a=st.at[i];if(Math.hypot(p.x-a.x,p.y-a.y)<r*1.2){a.b.forEach(j=>{const q=st.at.find(t=>t.id===j);q.b=q.b.filter(x=>x!==a.id)});a.b=[];st.drag={k:'atom',a,x:a.x,y:a.y};return true}}return false},
    move:p=>mv(p),pinch:k=>{if(A.step===0&&A.pred[0]!=null){st.z=Math.max(0,Math.min(1,st.z+(k-1)*.6));upd();chk()}},
    up:p=>{if(p&&st.drag)mv(p);const d=st.drag;st.drag=null;if(!d){A.redraw();return}
     if(d.k==='card'){const i=d.i,bi=[0,1,2].find(b=>{const r=binR(A,b);return d.x>r.x&&d.x<r.x+r.w&&d.y>r.y-20});if(bi!=null){if(bi===CARDS[i][1]){st.cards[i].bin=bi;A.sound.pop();sfb.textContent=`✓ ${CARDS[i][0]}: ${BIN[bi].toLowerCase()}.`+(CARDS[i][3]?' '+CARDS[i][3]:'')}else{A.sound.miss();sfb.textContent=CARDS[i][3]||(bi===2?'These particles are joined into one kind of molecule, not mixed.':bi===0?'More than one type of atom here: count the colours.':'Nothing is joined to a different atom here.')}}upd();chk();return}
     if(d.k==='atom'){let a=d.a;if(!a){if(d.y<A.H*.2){A.redraw();return}a={id:st.id++,e:d.e,x:d.x,y:d.y,b:[]};st.at.push(a)}else{a.x=d.x;a.y=d.y}drop(A,a);upd();chk()}A.redraw()}})}});
 const mv=p=>{const d=st.drag;if(!d)return;if(d.k==='zoom'){st.z=Math.max(0,Math.min(1,d.z0+(d.y0-p.y)/(A.H*.6)));upd();chk();return}d.x=p.x;d.y=p.y;if(d.a){d.a.x=p.x;d.a.y=p.y}A.redraw()};
 const Q=['H2O','CO2','CH4','NH3','O2','H2O2','CO','N2'];let qi=-1;
 const pretty=f=>f.replace(/(\d)/g,m=>'₀₁₂₃₄₅₆₇₈₉'[m]);
 const parse=f=>{const o={};f.replace(/([A-Z])(\d*)/g,(_,e,n)=>{o[e]=(o[e]||0)+(+n||1)});return o};
 const newChal=()=>{qi=(qi+1+Math.floor(Math.random()*3))%Q.length;st.q={f:Q[qi]};st.at=[];st.won=false;
  chal.innerHTML=`<p><b>Build one molecule of ${pretty(Q[qi])}</b> (${NAMES[Q[qi]]}), then press Check.</p><p class="fl-fb" role="status" aria-live="polite"></p><span class="fl-kb"><button type="button" class="lbtn sm" data-ok>Check</button> <button type="button" class="lbtn sm ghost" data-clr>Clear bench</button></span>`;
  chal.querySelector('[data-ok]').onclick=judge;chal.querySelector('[data-clr]').onclick=()=>{st.at=[];upd()};upd()};
 const judge=()=>{const q=st.q,fb=chal.querySelector('.fl-fb'),gs=groups();if(!q||st.won)return;const want=parse(q.f);
  if(gs.length===1&&gs[0].f===q.f){st.won=true;const n=Object.values(want).reduce((a,b)=>a+b,0);fb.innerHTML=`✓ ${pretty(q.f)}: ${Object.entries(want).map(([e,k])=>`${k} ${EL[e][3]}`).join(' + ')} = ${n} atoms. ${Object.keys(want).length>1?'Different atoms joined: a compound.':'Only one type of atom: an element, even though they are joined.'} <button type="button" class="linkish">Another →</button>`;A.win();fb.querySelector('button').onclick=newChal;return}
  A.sound.miss();if(!gs.length){fb.textContent='The bench is empty: drag atoms down from the tray.';return}
  const big=gs.slice().sort((a,b)=>b.g.length-a.g.length)[0],have=big.cnt;
  const swapped=Object.entries(want).some(([e,k])=>k>1&&Object.keys(want).some(o=>o!==e&&(have[o]||0)===k&&(have[e]||0)===want[o]));
  fb.textContent=gs.length>1&&gs.some(g=>g.f===q.f)?`You have ${pretty(q.f)}, plus extra loose pieces. Drag the extras back to the tray.`
   :gs.length>1?`Your atoms are not all joined: you have ${gs.map(g=>pretty(g.f)).join(' and ')}. Touch them together so they bond into one molecule.`
   :swapped?`Check which atom each small number belongs to: in ${pretty(q.f)} the number comes after the atom it counts.`
   :`You built ${pretty(big.f)}. ${pretty(q.f)} needs ${Object.entries(want).map(([e,k])=>`${k} ${EL[e][3]}`).join(' and ')}.`};
 A.start()})})();
