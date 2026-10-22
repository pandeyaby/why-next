/* Flagship 16 – atomic number and mass number. Hook: build an atom from protons, neutrons and electrons (tap the bins or drag a
   particle into the atom). The learner predicts which particle decides the element (misconception: electrons or mass), then sees that
   neutrons only change the mass (isotopes), reads the nuclear symbol (mass number on top, atomic number below), and makes an ion by
   removing an electron. Challenge: build the atom or ion shown by a nuclear symbol, with feedback for "neutrons = mass number",
   swapped top / bottom numbers and the wrong sign on an ion's charge. Electrons fill shells 2, 8, 8, 2 (first 20 elements). */
(()=>{const SYM=['','H','He','Li','Be','B','C','N','O','F','Ne','Na','Mg','Al','Si','P','S','Cl','Ar','K','Ca'],
 NAME=['','hydrogen','helium','lithium','beryllium','boron','carbon','nitrogen','oxygen','fluorine','neon','sodium','magnesium','aluminium','silicon','phosphorus','sulfur','chlorine','argon','potassium','calcium'],
 MAXP=20,MAXN=24,MAXE=20,CAP=[2,8,8,2],COL={p:'#ef4444',n:'#94a3b8',e:'#38bdf8'},WORD={p:'proton',n:'neutron',e:'electron'};
 const charge=s=>s.p-s.e,mass=s=>s.p+s.n;
 const chargeText=q=>q===0?'neutral':(Math.abs(q)>1?Math.abs(q):'')+(q>0?'+':'−');
 /* Electrons per shell for the first 20 elements: 2, 8, 8, then 2. */
 const shells=e=>{const out=[];let left=e;for(const c of CAP){if(left<=0)break;out.push(Math.min(c,left));left-=c}return out};
VIS.reg('flagnuc',c=>{let A,ctl,chal,onScreen=true,outs={};
 const st={p:0,n:0,e:0,carry:null,spin:0,q:null,won:false,flash:0};
 const geo=A=>{const{W,H}=A,cx=A.narrow?W*.5:W*.38,cy=H*(A.narrow?.4:.47),R=Math.min(A.narrow?W*.42:W*.3,H*.38),bw=Math.min(110,(W-40)/3),by=H-(A.narrow?58:62);
  return{cx,cy,R,shellR:k=>R*(.42+.19*k),nucR:Math.max(14,7*Math.sqrt(Math.max(1,st.p+st.n))),bins:['p','n','e'].map((k,i)=>({k,x:W/2+(i-1)*(bw+12),y:by,w:bw,h:46}))}};
 const sym=()=>SYM[st.p]||(st.p?'?':'–');
 const describe=()=>{if(!st.p)return st.n||st.e?'No protons yet, so this is not an atom of any element.':'An empty space. Add a proton to start an atom.';
  const q=charge(st);return `${st.p} proton${st.p>1?'s':''} makes it ${NAME[st.p]} (atomic number ${st.p}). ${st.n} neutron${st.n===1?'':'s'}, so the mass number is ${st.p} + ${st.n} = ${mass(st)}: ${NAME[st.p]}-${mass(st)}. ${st.e} electron${st.e===1?'':'s'}, so it is ${q===0?'a neutral atom':'an ion with charge '+chargeText(q)}.`};
 const say=()=>{const d=describe();c.say(d);A&&A.cv.setAttribute('aria-label','Atom builder. '+d);syncOut()};
 function draw(A){const{ctx,W,H,paint:P,col:C}=A,G=geo(A),t=st.spin;
  ctx.fillStyle=P.lin(0,0,0,H,[[0,A.mix(C.pn,C.vi,.08)],[1,C.pn]]);ctx.fillRect(0,0,W,H);
  // shells and electrons
  const sh=shells(st.e);for(let k=0;k<Math.max(sh.length,st.p?1:0);k++){ctx.strokeStyle=A.alpha(C.cy,.28);ctx.lineWidth=1.5;ctx.setLineDash([3,5]);ctx.beginPath();ctx.arc(G.cx,G.cy,G.shellR(k),0,7);ctx.stroke();ctx.setLineDash([])}
  sh.forEach((n,k)=>{for(let i=0;i<n;i++){const a=i/n*Math.PI*2+t*(1-k*.2)+k*.4;P.glow(A.alpha(COL.e,.8),8);P.ball(G.cx+Math.cos(a)*G.shellR(k),G.cy+Math.sin(a)*G.shellR(k),A.narrow?5:6,COL.e);P.noShadow()}});
  // nucleus: protons and neutrons packed on a sunflower spiral, mixed so neither kind clumps
  const N=st.p+st.n;for(let i=0;i<N;i++){const r=6.2*Math.sqrt(i+.5)*(N>1?1:0),a=i*2.39996,isP=Math.floor((i+1)*st.p/N)>Math.floor(i*st.p/N);P.ball(G.cx+Math.cos(a)*r,G.cy+Math.sin(a)*r,7,isP?COL.p:COL.n)}
  if(st.p){ctx.globalAlpha=Math.min(1,.4+st.flash);P.label(`${NAME[st.p]}`,G.cx,G.cy-G.shellR(Math.max(0,sh.length-1))-22,{font:'800 13px system-ui',bg:A.alpha(C.vi,.9)});ctx.globalAlpha=1}
  // nuclear symbol card
  const cw=A.narrow?124:156,cx=W-cw-10,cy=A.narrow?8:H*.16,ch=A.narrow?84:108;ctx.fillStyle=A.alpha('#0b1220',.75);P.rrect(cx,cy,cw,ch,14);ctx.fill();ctx.strokeStyle=A.alpha(C.vi,.7);ctx.lineWidth=2;ctx.stroke();
  const big=A.narrow?40:52;ctx.fillStyle=C.tx;ctx.textBaseline='alphabetic';ctx.textAlign='left';ctx.font=`800 ${big}px system-ui`;const sx=cx+cw*.3;ctx.fillText(sym(),sx,cy+ch*.72);const symW=ctx.measureText(sym()).width;
  ctx.font=`700 ${A.narrow?14:17}px system-ui`;ctx.textAlign='right';ctx.fillStyle=C.am;ctx.fillText(String(mass(st)),sx-3,cy+ch*.36);ctx.fillStyle=COL.p;ctx.fillText(String(st.p),sx-3,cy+ch*.86);
  const q=charge(st);if(q&&st.p){ctx.textAlign='left';ctx.fillStyle=q>0?C.rd:C.cy;ctx.fillText(chargeText(q),sx+symW+2,cy+ch*.36)}
  ctx.textAlign='right';ctx.font='11px system-ui';ctx.fillStyle=C.mu;ctx.fillText('top: mass no. · bottom: atomic no.',cx+cw,cy+ch+14);
  // bins
  G.bins.forEach(b=>{ctx.fillStyle=A.alpha(COL[b.k],.16);P.rrect(b.x-b.w/2,b.y,b.w,b.h,12);ctx.fill();ctx.strokeStyle=A.alpha(COL[b.k],.7);ctx.lineWidth=1.5;ctx.stroke();P.ball(b.x-b.w/2+18,b.y+b.h/2,8,COL[b.k]);ctx.fillStyle=C.tx;ctx.font='700 12px system-ui';ctx.textAlign='left';ctx.fillText(WORD[b.k]+'s '+st[b.k],b.x-b.w/2+32,b.y+b.h/2+4)});
  if(st.carry){P.glow(A.alpha(COL[st.carry.k],.9),14);P.ball(st.carry.x,st.carry.y,9,COL[st.carry.k]);P.noShadow()}
  if(!st.p&&!st.n&&!st.e&&!A.isDone){ctx.globalAlpha=.6+.4*Math.sin(performance.now()/260);P.label('👆 tap a bin or drag a particle into the atom',W/2,G.bins[0].y-16,{pill:1,bg:A.alpha(C.am,.95),col:'#111'});ctx.globalAlpha=1}}
 // ---------- changing the atom ----------
 const LIM={p:MAXP,n:MAXN,e:MAXE};
 /* Add or remove one particle of kind k, within the limits of this lab (the first 20 elements). */
 function change(k,d){const v=st[k]+d;if(v<0||v>LIM[k]){A.sound.miss();return}st[k]=v;if(k==='p'){st.flash=1;A.tween(st,{flash:0},700)}d>0?A.sound.pop():A.sound.tick();say();A.redraw();chk();A.kick()}
 function setAtom(o){Object.assign(st,{p:0,n:0,e:0},o);say();A.redraw()}
 let chk=()=>{};
 function syncOut(){for(const k in outs)outs[k].textContent=st[k]}
 const steps=[
  {h:'What makes an atom gold?',p:'Every atom is built from three particles: protons and neutrons in the middle (the nucleus) and electrons around it.',predict:{q:'Which number decides what element an atom is?',opts:['The number of electrons','The number of protons','The number of neutrons','How heavy it is'],ans:1},task:'Build a carbon atom: try adding particles until the name says carbon',show:()=>{setAtom({p:6,n:6,e:6});chk()},
   go:()=>{setAtom({});chk=()=>{if(st.p===6)A.done('Six protons makes carbon, whatever else you add. Change the protons and it becomes a different element. That count is the atomic number.'+A.reveal(1))}}},
  {h:'Neutrons: same element, more mass',p:'Here is carbon-12: 6 protons and 6 neutrons. The mass number counts the protons and neutrons together.',predict:{q:'Add 2 neutrons. What do you get?',opts:['A different element','Still carbon, just heavier','A charged carbon ion'],ans:1},task:'Make carbon-14',show:()=>{setAtom({p:6,n:8,e:6});chk()},
   go:()=>{setAtom({p:6,n:6,e:6});chk=()=>{if(st.p===6&&st.n===8)A.done('Still carbon: 6 protons. Mass number 6 + 8 = 14. Atoms of one element with different numbers of neutrons are isotopes.'+A.reveal(1))}}},
  {h:'Read the symbol',p:'A nuclear symbol packs it all in: the mass number on top, the atomic number at the bottom. Neutrons = top − bottom.',task:'Build ²³₁₁Na, a neutral sodium atom',show:()=>{setAtom({p:11,n:12,e:11});chk()},
   go:()=>{setAtom({});chk=()=>{if(st.p===11&&st.n===12&&st.e===11)A.done('11 protons (bottom number), 23 − 11 = 12 neutrons, and 11 electrons to balance the 11 protons, so the atom has no overall charge.')}}},
  {h:'Electrons and charge',p:'A proton has charge +1 and an electron −1. A neutron has none. Electrons are easy to add or remove; that makes an ion.',predict:{q:'Take one electron away from a sodium atom. Its charge becomes…',opts:['−1','+1','0, because electrons have no charge'],ans:1},task:'Make a sodium ion, Na⁺',show:()=>{setAtom({p:11,n:12,e:10});chk()},
   go:()=>{setAtom({p:11,n:12,e:11});chk=()=>{if(st.p===11&&st.e===10)A.done('11 protons (+11) and 10 electrons (−10) leave +1. Losing electrons makes a positive ion; gaining them makes a negative one. The element is still sodium.'+A.reveal(3))}}},
  {h:'Sandbox',p:'Build anything up to calcium (20 protons). Watch the electron shells fill: 2, then 8, then 8. Which particle changes the name, the mass, the charge?',go:()=>{setAtom({p:3,n:4,e:3});chk=()=>{}}},
  {h:'Challenge',p:'',go:()=>newChal()}];
 A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==5;say()},
  init:A=>{ctl=c.el('div',{class:'fl-below'},A.below);chal=c.el('div',{class:'fl-chal'},A.below);
   ['p','n','e'].forEach(k=>{const r=c.el('div',{class:'fl-ctl'},ctl);c.el('span',{style:`color:${COL[k]};font-weight:800`},r,'● ');c.el('span',{},r,WORD[k][0].toUpperCase()+WORD[k].slice(1)+'s: ');outs[k]=c.el('output',{},r,'0');
    const m=c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':'Remove a '+WORD[k]},r,'−');m.onclick=()=>change(k,-1);const p=c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':'Add a '+WORD[k]},r,'+');p.onclick=()=>change(k,1)});
   if(typeof IntersectionObserver!=='undefined'){const io=new IntersectionObserver(e=>{onScreen=e[0].isIntersecting;if(onScreen)A.kick()});io.observe(A.cv);c.stops.push(()=>io.disconnect())}
   A.every(dt=>{if(!onScreen||A.reduced()||!st.e)return false;st.spin+=dt*.5;return true});
   // gestures: press a bin and drag into the atom to add; press inside the atom and drag out to remove (nucleus → neutron, else proton; shells → electron)
   A.gest({down:p=>{const G=geo(A),b=G.bins.find(b=>Math.abs(p.x-b.x)<b.w/2&&p.y>b.y&&p.y<b.y+b.h);if(b){st.carry={k:b.k,x:p.x,y:p.y,add:1};A.redraw();return true}
     const d=Math.hypot(p.x-G.cx,p.y-G.cy);if(d<G.nucR+6&&(st.p||st.n)){const k=st.n?'n':'p';st.carry={k,x:p.x,y:p.y,add:0};return true}
     if(d<G.shellR(3)+10&&st.e){st.carry={k:'e',x:p.x,y:p.y,add:0};return true}return false},
    move:p=>{if(!st.carry)return;st.carry.x=p.x;st.carry.y=p.y;A.redraw()},
    up:p=>{const G=geo(A),cr=st.carry;st.carry=null;if(!cr){return}const inside=Math.hypot(cr.x-G.cx,cr.y-G.cy)<G.shellR(Math.max(1,shells(st.e).length))+14;
     const tap=cr.add&&G.bins.some(b=>Math.abs(cr.x-b.x)<b.w/2&&cr.y>b.y&&cr.y<b.y+b.h);
     if(cr.add&&(inside||tap))change(cr.k,1);else if(!cr.add&&!inside)change(cr.k,-1);else A.redraw()}});
   say()}});
 // ---------- challenge: build what a nuclear symbol describes ----------
 const TARGETS=[[7,3,0],[19,9,0],[24,12,2],[35,17,-1],[40,20,2],[16,8,-2],[27,13,0],[39,19,1]];let qi=-1;
 const symText=([a,z,q])=>`${a}/${z} ${SYM[z]}${q?chargeText(q):''}`;
 function newChal(){qi=(qi+1)%TARGETS.length;const [a,z,q]=TARGETS[qi];st.q={a,z,q,n:a-z,e:z-q};st.won=false;setAtom({});
  chal.innerHTML=`<p><b>Build this:</b> <span class="fl-nsym" aria-label="mass number ${a}, atomic number ${z}, ${NAME[z]}${q?', charge '+chargeText(q):''}"><sup>${a}</sup><sub>${z}</sub>${SYM[z]}<sup>${q?chargeText(q):''}</sup></span> <span class="muted small">(${NAME[z]}${q?' ion':''})</span>. Then press Check.</p><p class="fl-fb" role="status" aria-live="polite"></p><button type="button" class="lbtn sm">Check</button>`;
  chal.querySelector('.lbtn').onclick=judge;chk=()=>{}}
 function judge(){const T=st.q,fb=chal.querySelector('.fl-fb');if(!T||st.won)return;
  if(st.p===T.z&&st.n===T.n&&st.e===T.e){st.won=true;fb.innerHTML=`✓ ${T.z} protons, ${T.a} − ${T.z} = ${T.n} neutrons, ${T.e} electrons${T.q?` (${T.z} − ${T.e} = ${chargeText(T.q)})`:''}. <button type="button" class="linkish">Another →</button>`;A.win();fb.querySelector('button').onclick=newChal;return}
  A.sound.miss();let m;
  if(st.p===T.a&&st.n===T.z)m='You swapped the numbers. The bottom (smaller) number is the atomic number: that many protons.';
  else if(st.p!==T.z)m=`Protons decide the element: ${NAME[T.z]} needs ${T.z}, the bottom number. You have ${st.p}.`;
  else if(st.n===T.a)m=`The top number counts protons and neutrons together, so neutrons = ${T.a} − ${T.z}.`;
  else if(st.n!==T.n)m=`Right element. Check the neutrons: mass number ${T.a} − atomic number ${T.z}.`;
  else if(T.q&&st.e===T.z+T.q)m=`Wrong way round: a ${T.q>0?'+':'−'} charge means ${T.q>0?'fewer':'more'} electrons than protons.`;
  else m=T.q?`Charge ${chargeText(T.q)} means electrons = ${T.z} ${T.q>0?'−':'+'} ${Math.abs(T.q)}.`:'A neutral atom has as many electrons as protons.';
  fb.textContent=m}
 A.start()})})();
