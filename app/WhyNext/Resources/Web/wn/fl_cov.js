/* Flagship 18 – covalent bonding. Hook: atoms sit on the bench showing only their outer electrons. Tap one atom, then another, to
   share a pair of electrons between them (tap the same pair again for a double or triple bond; tap a bond to undo one pair).
   Each atom's ring shows its outer-shell count: amber while short, green when full (8, or 2 for hydrogen), red if over-full.
   Shared electrons are drawn in their owner's colour, dots for one atom and crosses for its partner, as in a dot-and-cross diagram.
   Predictions target "one atom gives an electron to the other" (that is ionic), "hydrogen needs 8" and "one bond is enough for O₂".
   Challenge: build a named molecule, with feedback for an over-full atom, hydrogen with two bonds, an atom still short (named),
   and atoms left unconnected. */
(()=>{const VAL={H:1,C:4,N:5,O:6,Cl:7,F:7},FULL=e=>e==='H'?2:8,COL={H:'#e2e8f0',C:'#64748b',N:'#60a5fa',O:'#f87171',Cl:'#4ade80',F:'#facc15'},
 NAME={H:'hydrogen',C:'carbon',N:'nitrogen',O:'oxygen',Cl:'chlorine',F:'fluorine'};
 /* Scenes: atoms with positions in 0..1 of the bench. */
 const SCENE={Cl2:[['Cl',.35,.5],['Cl',.65,.5]],H2O:[['O',.5,.45],['H',.28,.68],['H',.72,.68]],NH3:[['N',.5,.42],['H',.27,.66],['H',.5,.8],['H',.73,.66]],
  O2:[['O',.36,.5],['O',.64,.5]],CH4:[['C',.5,.5],['H',.5,.2],['H',.25,.55],['H',.75,.55],['H',.5,.82]],HCl:[['H',.35,.5],['Cl',.65,.5]],
  CO2:[['O',.22,.5],['C',.5,.5],['O',.78,.5]],N2:[['N',.36,.5],['N',.64,.5]],HF:[['F',.62,.5],['H',.34,.5]],CH3Cl:[['C',.5,.5],['Cl',.78,.5],['H',.5,.2],['H',.25,.6],['H',.5,.82]]};
 const LABEL={Cl2:'Cl₂',H2O:'H₂O',NH3:'NH₃',O2:'O₂',CH4:'CH₄',HCl:'HCl',CO2:'CO₂',N2:'N₂',HF:'HF',CH3Cl:'CH₃Cl'};
VIS.reg('flagcov',c=>{let A,chal,selA,selB,sand,onScreen=true;
 const st={atoms:[],bonds:{},pick:-1,name:'Cl2',t:0,chk:()=>{},q:null,won:false};
 const key=(i,j)=>i<j?i+'-'+j:j+'-'+i;
 const order=(i,j)=>st.bonds[key(i,j)]||0;
 const bondsOf=i=>Object.entries(st.bonds).reduce((n,[k,o])=>n+(k.split('-').map(Number).includes(i)?o:0),0);
 /* Outer-shell electrons an atom can count: its own valence electrons plus one from the partner for every shared pair. */
 const outer=i=>VAL[st.atoms[i].e]+bondsOf(i);
 const statusOf=i=>{const o=outer(i),f=FULL(st.atoms[i].e);return o===f?'full':o>f?'over':'short'};
 const connected=()=>{if(!st.atoms.length)return true;const seen=new Set([0]),stack=[0];while(stack.length){const i=stack.pop();st.atoms.forEach((_,j)=>{if(order(i,j)&&!seen.has(j)){seen.add(j);stack.push(j)}})}return seen.size===st.atoms.length};
 const solved=()=>connected()&&st.atoms.every((_,i)=>statusOf(i)==='full');
 const atomName=i=>{const a=st.atoms[i],same=st.atoms.filter(b=>b.e===a.e);return same.length>1?`${a.e}${same.indexOf(a)+1}`:a.e};
 const geo=A=>{const{W,H}=A,r=Math.min(W,H)*(A.narrow?.075:.07);return{r,pos:i=>({x:st.atoms[i].x*W,y:st.atoms[i].y*H*.86+H*.04})}};
 const describe=()=>{const parts=st.atoms.map((a,i)=>`${atomName(i)} ${outer(i)} of ${FULL(a.e)}`);const bl=Object.entries(st.bonds).filter(([,o])=>o).map(([k,o])=>{const[i,j]=k.split('-').map(Number);return `${atomName(i)}${['','–','=','≡'][o]}${atomName(j)}`});
  return `${LABEL[st.name]||'Molecule'}: ${bl.length?'bonds '+bl.join(', '):'no bonds yet'}. Outer electrons: ${parts.join('; ')}.${solved()?' Every atom has a full outer shell.':''}`};
 const say=()=>{const d=describe();c.say(d);A&&A.cv.setAttribute('aria-label','Covalent bonding bench. '+d);syncSelects()};
 function drawElectron(ctx,x,y,col,cross,s){ctx.strokeStyle=col;ctx.fillStyle=col;if(cross){ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x-s,y-s);ctx.lineTo(x+s,y+s);ctx.moveTo(x+s,y-s);ctx.lineTo(x-s,y+s);ctx.stroke()}else{ctx.beginPath();ctx.arc(x,y,s*.9,0,7);ctx.fill()}}
 function draw(A){const{ctx,W,H,paint:P,col:C}=A,G=geo(A),s=Math.max(3,G.r*.11);
  ctx.fillStyle=P.lin(0,0,0,H,[[0,A.mix(C.pn,C.gn||'#22c55e',.05)],[1,C.pn]]);ctx.fillRect(0,0,W,H);
  // bonds: shared pairs on the line between the atoms
  Object.entries(st.bonds).forEach(([k,o])=>{if(!o)return;const[i,j]=k.split('-').map(Number),a=G.pos(i),b=G.pos(j),dx=b.x-a.x,dy=b.y-a.y,L=Math.hypot(dx,dy),nx=-dy/L,ny=dx/L;
   ctx.strokeStyle=A.alpha(C.tx,.25);ctx.lineWidth=G.r*.9;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();ctx.lineCap='butt';
   for(let n=0;n<o;n++){const off=(n-(o-1)/2)*s*3.2,mx=(a.x+b.x)/2+nx*off,my=(a.y+b.y)/2+ny*off;
    drawElectron(ctx,mx-dx/L*s*1.6,my-dy/L*s*1.6,COL[st.atoms[i].e],i%2===1,s);drawElectron(ctx,mx+dx/L*s*1.6,my+dy/L*s*1.6,COL[st.atoms[j].e],j%2===1,s)}});
  // atoms with their unshared electrons as pairs around the outer ring
  st.atoms.forEach((a,i)=>{const p=G.pos(i),stt=statusOf(i),ring={full:C.gn||'#22c55e',short:C.am,over:C.rd}[stt];
   ctx.strokeStyle=A.alpha(ring,.85);ctx.lineWidth=st.pick===i?4:2.5;ctx.setLineDash(stt==='full'?[]:[5,4]);ctx.beginPath();ctx.arc(p.x,p.y,G.r*1.55,0,7);ctx.stroke();ctx.setLineDash([]);
   P.ball(p.x,p.y,G.r,COL[a.e]);ctx.fillStyle='#0b1220';ctx.font=`800 ${Math.round(G.r*.8)}px system-ui`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(a.e,p.x,p.y);ctx.textBaseline='alphabetic';
   const lone=Math.max(0,VAL[a.e]-bondsOf(i)),dirs=st.atoms.map((_,j)=>order(i,j)?Math.atan2(G.pos(j).y-p.y,G.pos(j).x-p.x):null).filter(v=>v!==null);
   const away=ang=>dirs.length?Math.min(...dirs.map(x=>Math.abs(Math.atan2(Math.sin(ang-x),Math.cos(ang-x))))):9;
   const slots=[...Array(8)].map((_,q)=>q*Math.PI/4-Math.PI/2).filter(g=>away(g)>.7).sort((u,v)=>away(v)-away(u));
   for(let e=0;e<lone;e++){const ang=slots[Math.floor(e/2)%Math.max(1,slots.length)]??(e*Math.PI/4),side=e%2?.22:-.22,rr=G.r*1.55;drawElectron(ctx,p.x+Math.cos(ang+side)*rr,p.y+Math.sin(ang+side)*rr,COL[a.e],i%2===1,s)}
   P.label(`${outer(i)}/${FULL(a.e)}`,p.x,p.y+G.r*1.55+14,{font:'700 11px system-ui',bg:A.alpha(ring,.9),col:'#111'})});
  if(st.pick>=0){const p=G.pos(st.pick);P.label('now tap a partner',p.x,p.y-G.r*1.55-14,{pill:1,bg:A.alpha(C.vi,.95)})}
  else if(!Object.keys(st.bonds).length&&!A.isDone){ctx.globalAlpha=.6+.4*Math.sin(performance.now()/260);P.label('👆 tap one atom, then another, to share a pair',W/2,H-16,{pill:1,bg:A.alpha(C.am,.95),col:'#111'});ctx.globalAlpha=1}
  P.label(LABEL[st.name]||'',W/2,16,{font:'800 13px system-ui',bg:A.alpha(C.vi,.9)})}
 // ---------- bonding ----------
 /* Share one more pair between atoms i and j (up to a triple bond). */
 function share(i,j){if(i===j)return;const k=key(i,j),o=st.bonds[k]||0;if(o>=3){A.sound.miss();c.say('Three shared pairs is the most two atoms share.');return}
  st.bonds[k]=o+1;A.sound.pop();say();A.redraw();st.chk();A.kick()}
 function unshare(i,j){const k=key(i,j);if(!st.bonds[k]){A.sound.miss();return}st.bonds[k]--;if(!st.bonds[k])delete st.bonds[k];A.sound.tick();say();A.redraw();st.chk()}
 function setScene(name,bonds){st.name=name;st.atoms=SCENE[name].map(([e,x,y])=>({e,x,y}));st.bonds={...(bonds||{})};st.pick=-1;fillSelects();say();A.redraw()}
 function fillSelects(){if(!selA)return;[selA,selB].forEach((s,n)=>{s.innerHTML=st.atoms.map((_,i)=>`<option value="${i}">${atomName(i)}</option>`).join('');s.value=String(Math.min(n,st.atoms.length-1))})}
 function syncSelects(){}
 const steps=[
  {h:'Two chlorines, one problem',p:'Each chlorine atom has 7 outer electrons and needs 8. Neither can win an electron from the other: they pull equally hard.',predict:{q:'How can both chlorine atoms end up with 8?',opts:['One gives an electron to the other','They share a pair of electrons','Each loses all 7'],ans:1},
   task:'Join the two chlorine atoms so both rings turn green',show:()=>{setScene('Cl2',{'0-1':1});st.chk()},
   go:()=>{setScene('Cl2');st.chk=()=>{if(solved())A.done('Each atom puts one electron into a shared pair. The pair counts for both, so both reach 8. A shared pair is a covalent bond. Giving an electron away would make ions, which is ionic bonding, between a metal and a non-metal.'+A.reveal(0))}}},
  {h:'Hydrogen is different',p:'Oxygen has 6 outer electrons. Hydrogen has 1, in the first shell.',predict:{q:'How many outer electrons does hydrogen need to be full?',opts:['8, like the others','2, because its only shell holds 2','1, it already is'],ans:1},
   task:'Make water, H₂O',show:()=>{setScene('H2O',{'0-1':1,'0-2':1});st.chk()},
   go:()=>{setScene('H2O');st.chk=()=>{if(solved())A.done('Oxygen shares one pair with each hydrogen: 6 + 2 = 8. Each hydrogen gets 1 + 1 = 2, a full first shell. Two bonds for oxygen, one for each hydrogen.'+A.reveal(1))}}},
  {h:'Count the bonds',p:'An atom makes enough bonds to reach 8: that is 8 minus its outer electrons.',predict:{q:'Nitrogen has 5 outer electrons. How many bonds does it make?',opts:['5','3','8'],ans:1},
   task:'Make ammonia, NH₃',show:()=>{setScene('NH3',{'0-1':1,'0-2':1,'0-3':1});st.chk()},
   go:()=>{setScene('NH3');st.chk=()=>{if(solved())A.done('8 − 5 = 3 bonds. Nitrogen keeps one pair of its own, a lone pair, which is not shared.'+A.reveal(2))}}},
  {h:'More than one pair',p:'Two oxygen atoms, 6 outer electrons each. Try one shared pair first and look at the rings.',predict:{q:'Is one shared pair enough for O₂?',opts:['Yes, each reaches 8','No, each reaches only 7, so they share two pairs'],ans:1},
   task:'Make O₂ so both rings are green',show:()=>{setScene('O2',{'0-1':2});st.chk()},
   go:()=>{setScene('O2');st.chk=()=>{if(solved())A.done('One pair gives each oxygen 7. Two pairs give 6 + 2 = 8. Two shared pairs is a double bond, O=O.'+A.reveal(3))}}},
  {h:'Sandbox',p:'Pick a molecule and build it. Tap a bond to take one pair back. Carbon has 4 outer electrons; how many bonds is that?',go:()=>{setScene('CH4');st.chk=()=>{}}},
  {h:'Challenge',p:'',go:()=>newChal()}];
 A=FK.shell(c,{steps,ratio:.6,tall:1.0,draw,onStep:A=>{chal.hidden=A.step!==5;sand.hidden=A.step!==4;say()},
  init:A=>{const ctl=c.el('div',{class:'fl-below'},A.below);chal=c.el('div',{class:'fl-chal'},A.below);
   const r=c.el('div',{class:'fl-ctl fl-wrap'},ctl);c.el('label',{for:'covA'},r,'Share between ');selA=c.el('select',{id:'covA','aria-label':'First atom'},r);c.el('span',{},r,' and ');selB=c.el('select',{id:'covB','aria-label':'Second atom'},r);
   const add=c.el('button',{type:'button',class:'lbtn sm ghost'},r,'+ share a pair');add.onclick=()=>share(+selA.value,+selB.value);
   const rem=c.el('button',{type:'button',class:'lbtn sm ghost'},r,'− take a pair back');rem.onclick=()=>unshare(+selA.value,+selB.value);
   sand=c.el('div',{class:'fl-ctl fl-wrap'},ctl);c.el('span',{},sand,'Molecule: ');['CH4','HCl','N2','CO2','HF'].forEach(n=>{const b=c.el('button',{type:'button',class:'lbtn sm ghost'},sand,LABEL[n]);b.onclick=()=>setScene(n)});
   if(typeof IntersectionObserver!=='undefined'){const io=new IntersectionObserver(e=>{onScreen=e[0].isIntersecting;if(onScreen)A.kick()});io.observe(A.cv);c.stops.push(()=>io.disconnect())}
   A.every(()=>{if(!onScreen||A.reduced()||st.pick<0)return false;return true});
   // tap an atom to pick it, then a partner to share a pair; tap a bond to take one pair back
   A.gest({down:p=>{const G=geo(A);const hit=st.atoms.findIndex((_,i)=>{const q=G.pos(i);return Math.hypot(p.x-q.x,p.y-q.y)<G.r*1.6});
     if(hit>=0){if(st.pick<0){st.pick=hit;A.sound.tick()}else if(st.pick===hit){st.pick=-1}else{const a=st.pick;st.pick=-1;share(a,hit)}A.redraw();return true}
     const bond=Object.keys(st.bonds).find(k=>{const[i,j]=k.split('-').map(Number),a=G.pos(i),b=G.pos(j),t=Math.max(0,Math.min(1,((p.x-a.x)*(b.x-a.x)+(p.y-a.y)*(b.y-a.y))/((b.x-a.x)**2+(b.y-a.y)**2)));return Math.hypot(p.x-(a.x+t*(b.x-a.x)),p.y-(a.y+t*(b.y-a.y)))<G.r*.5});
     if(bond){const[i,j]=bond.split('-').map(Number);unshare(i,j);return true}st.pick=-1;A.redraw();return false},move:()=>{},up:()=>{}});
   say()}});
 // ---------- challenge: build a named molecule ----------
 const TARGETS=['CH4','HCl','CO2','N2','HF','CH3Cl'];let qi=-1;
 function newChal(){qi=(qi+1)%TARGETS.length;const n=TARGETS[qi];st.q=n;st.won=false;setScene(n);st.chk=()=>{};
  chal.innerHTML=`<p><b>Build ${LABEL[n]}</b> so every atom has a full outer shell, then press Check.</p><p class="fl-fb" role="status" aria-live="polite"></p><button type="button" class="lbtn sm">Check</button>`;chal.querySelector('.lbtn').onclick=judge}
 function judge(){const fb=chal.querySelector('.fl-fb');if(!st.q||st.won)return;
  if(solved()){st.won=true;const bl=Object.entries(st.bonds).map(([k,o])=>{const[i,j]=k.split('-').map(Number);return `${atomName(i)}${['','–','=','≡'][o]}${atomName(j)}`}).join(', ');
   fb.innerHTML=`✓ ${LABEL[st.q]}: ${bl}. Every atom is full and every bond is a shared pair. <button type="button" class="linkish">Another →</button>`;A.win();fb.querySelector('button').onclick=newChal;return}
  A.sound.miss();let m;const over=st.atoms.findIndex((_,i)=>statusOf(i)==='over'),short=st.atoms.findIndex((_,i)=>statusOf(i)==='short');
  if(st.atoms.some((a,i)=>a.e==='H'&&bondsOf(i)>1))m='Hydrogen is full at 2, so it makes only one bond.';
  else if(over>=0)m=`${atomName(over)} has ${outer(over)} outer electrons, more than ${FULL(st.atoms[over].e)}. Take a pair back.`;
  else if(!connected())m='Some atoms are not joined to the rest. A molecule is held together by shared pairs.';
  else m=`${atomName(short)} has only ${outer(short)} of ${FULL(st.atoms[short].e)}. It needs ${FULL(st.atoms[short].e)-outer(short)} more shared pair${FULL(st.atoms[short].e)-outer(short)>1?'s':''}: a ${FULL(st.atoms[short].e)-outer(short)>1?'multiple bond or more partners':'bond'}.`;
  fb.textContent=m}
 A.start()})})();
