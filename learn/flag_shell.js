/* Flagship 17 – electron shells and configurations. Hook: drop electrons into shells around a nucleus one at a time (tap a ring,
   or use the "Add to shell" buttons). Nothing stops the learner putting an electron in an outer shell early: the atom shows an
   "unstable: shell 1 has room" warning instead, so the fill order (2, then 8, then 8 for the first 20 elements) is discovered, not
   told. A mini periodic table lights up the element and links the configuration to its place: the number of occupied shells is
   the period; the outer-shell electrons give the group (helium is the exception: full first shell, group 0).
   Predictions target "the 3rd electron joins shell 1", "shell 3 takes up to 18 before shell 4" (true later, but potassium's
   19th electron goes to shell 4 in this model) and "group = number of shells". Challenge: build a named atom's configuration,
   with feedback for too many / too few electrons, an outer shell started before an inner one is full, and over-filled shells. */
(()=>{const SYM=['','H','He','Li','Be','B','C','N','O','F','Ne','Na','Mg','Al','Si','P','S','Cl','Ar','K','Ca'],
 NAME=['','hydrogen','helium','lithium','beryllium','boron','carbon','nitrogen','oxygen','fluorine','neon','sodium','magnesium','aluminium','silicon','phosphorus','sulfur','chlorine','argon','potassium','calcium'],
 CAP=[2,8,8,2],EC='#38bdf8';
 /* The ground-state configuration for Z ≤ 20 in the 2, 8, 8, 2 shell model. */
 const ground=z=>{const out=[];let left=z;for(const c of CAP){if(left<=0)break;out.push(Math.min(c,left));left-=c}return out};
 const configText=sh=>{const s=sh.slice();while(s.length&&!s[s.length-1])s.pop();return s.join(',')||'0'};
 const total=sh=>sh.reduce((a,b)=>a+b,0);
 /* The lowest shell that still has room while some higher shell already holds electrons, or -1 if the fill order is right. */
 const gapShell=sh=>{for(let k=0;k<sh.length;k++)if(sh[k]<CAP[k]&&sh.slice(k+1).some(n=>n>0))return k;return -1};
 /* Group and period of element z on the GCSE-style table (groups 1–7 and 0). */
 const place=z=>{const g=ground(z),period=g.length,outer=g[g.length-1];return{period,group:z===2?0:outer===8?0:outer}};
VIS.reg('flagshell',c=>{let A,btns=[],chal,zOut,cfgOut,onScreen=true;
 const st={z:3,sh:[0,0,0,0],spin:0,pulse:[0,0,0,0],chk:()=>{},q:null,won:false};
 const geo=A=>{const{W,H}=A,narrow=A.narrow,tw=narrow?Math.min(W-24,260):Math.min(W*.34,300),cell=tw/8,tableH=cell*4;
  const tx=narrow?(W-tw)/2:W-tw-16,ty=narrow?H-tableH-12:H*.5-cell*2,top=26,bottom=narrow?ty-28:H-26;
  const cx=narrow?W*.5:Math.min(W*.36,(tx-16)/2+8),cy=(top+bottom)/2,R=Math.min(narrow?W*.46:tx*.42,(bottom-top)/2/(.3+.22*3)*.98);
  return{cx,cy,R:R/1.0,ring:k=>R*(.3+.22*k),tx,ty,cell}};
 const describe=()=>{const sh=st.sh,n=total(sh),gs=gapShell(sh),cfg=configText(sh);
  let d=`${NAME[st.z][0].toUpperCase()+NAME[st.z].slice(1)}: ${st.z} protons. Electrons placed ${n} of ${st.z}, configuration ${cfg}.`;
  if(gs>=0)d+=` Unstable: shell ${gs+1} still has room.`;else if(n===st.z){const p=place(st.z);d+=` Complete. ${p.period} occupied shell${p.period>1?'s':''}, so period ${p.period}; ${st.z===2?'a full first shell, so group 0':(sh[p.period-1]===8?'a full outer shell of 8, so group 0':`${sh[p.period-1]} outer electron${sh[p.period-1]>1?'s':''}, so group ${p.group}`)}.`}
  return d};
 const say=()=>{const d=describe();c.say(d);A&&A.cv.setAttribute('aria-label','Electron shell builder. '+d);if(zOut)zOut.textContent=`${SYM[st.z]} (Z = ${st.z})`;if(cfgOut)cfgOut.textContent=configText(st.sh)};
 function draw(A){const{ctx,W,H,paint:P,col:C}=A,G=geo(A),sh=st.sh,gs=gapShell(sh);
  ctx.fillStyle=P.lin(0,0,0,H,[[0,A.mix(C.pn,C.cy,.06)],[1,C.pn]]);ctx.fillRect(0,0,W,H);
  for(let k=0;k<4;k++){const full=sh[k]>=CAP[k],warn=k===gs;ctx.strokeStyle=warn?A.alpha(C.am,.9):full?A.alpha(C.gn||'#22c55e',.75):A.alpha(C.cy,.35);ctx.lineWidth=warn?3:2+st.pulse[k]*4;ctx.setLineDash(full||warn?[]:[4,6]);
   ctx.beginPath();ctx.arc(G.cx,G.cy,G.ring(k),0,7);ctx.stroke();ctx.setLineDash([]);
   ctx.fillStyle=C.mu;ctx.font='600 11px system-ui';ctx.textAlign='left';ctx.fillText(`${k+1}: ${sh[k]}/${CAP[k]}`,G.cx+G.ring(k)*.71+4,G.cy-G.ring(k)*.71-2);
   for(let i=0;i<sh[k];i++){const pair=Math.floor(i/2),side=i%2,slots=Math.max(1,Math.ceil(CAP[k]/2)),a=pair/slots*Math.PI*2-Math.PI/2+st.spin*(1-k*.18)+(side?.16:-.16);
    P.glow(A.alpha(EC,.8),6);P.ball(G.cx+Math.cos(a)*G.ring(k),G.cy+Math.sin(a)*G.ring(k),Math.max(4,Math.min(7,G.R*.045)),EC);P.noShadow()}}
  P.ball(G.cx,G.cy,Math.max(12,G.R*.13),'#ef4444');ctx.fillStyle='#fff';ctx.font=`800 ${A.narrow?12:14}px system-ui`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(`${st.z}+`,G.cx,G.cy);ctx.textBaseline='alphabetic';
  P.label(`${NAME[st.z]} · ${configText(sh)}`,G.cx,G.cy-G.ring(3)-14,{font:'800 13px system-ui',bg:A.alpha(C.vi,.9)});
  if(gs>=0)P.label(`⚠ unstable: shell ${gs+1} has room`,G.cx,G.cy+G.ring(3)+16,{pill:1,bg:A.alpha(C.am,.95),col:'#111'});
  // mini periodic table: periods 1–4, groups 1–7 and 0
  const done=total(sh)===st.z&&gs<0;ctx.font=`700 ${A.narrow?10:12}px system-ui`;ctx.textAlign='center';ctx.textBaseline='middle';
  for(let z=1;z<=20;z++){const p=place(z),col=p.group===0?7:p.group-1,x=G.tx+col*G.cell,y=G.ty+(p.period-1)*G.cell,me=z===st.z;
   ctx.fillStyle=me?A.alpha(done?(C.gn||'#22c55e'):C.vi,.85):A.alpha(C.tx,.07);P.rrect(x+1,y+1,G.cell-2,G.cell-2,5);ctx.fill();ctx.fillStyle=me?'#fff':C.mu;ctx.fillText(SYM[z],x+G.cell/2,y+G.cell/2)}
  ctx.textBaseline='alphabetic';ctx.fillStyle=C.mu;ctx.font='11px system-ui';ctx.textAlign='left';ctx.fillText('groups 1 → 7, then 0',G.tx,G.ty-6);
  if(done){const p=place(st.z),x=G.tx+(p.group===0?7:p.group-1)*G.cell+G.cell/2,y=G.ty+(p.period-1)*G.cell+G.cell/2;ctx.strokeStyle=C.am;ctx.lineWidth=2;ctx.beginPath();ctx.arc(x,y,G.cell*.62,0,7);ctx.stroke()}
  if(!total(sh)&&!A.isDone){ctx.globalAlpha=.6+.4*Math.sin(performance.now()/260);P.label('👆 tap a ring to add an electron',G.cx,G.cy+G.ring(1)+4,{pill:1,bg:A.alpha(C.am,.95),col:'#111'});ctx.globalAlpha=1}}
 // ---------- changing the atom ----------
 /* Put one electron in shell k (0-based). Full shells and extra electrons are refused with a reason; early outer shells are allowed. */
 function addTo(k){const sh=st.sh;if(total(sh)>=st.z&&!(A.step===5&&total(sh)<st.z+2)){A.sound.miss();c.say(`${NAME[st.z]} has only ${st.z} protons, so a neutral atom has ${st.z} electrons.`);return}
  if(sh[k]>=CAP[k]){A.sound.miss();c.say(k===2?'Shell 3 holds 8 in this model before shell 4 starts.':`Shell ${k+1} is full: it holds ${CAP[k]}.`);st.pulse[k]=1;A.tween(st.pulse,{[k]:0},500);A.redraw();return}
  sh[k]++;st.pulse[k]=1;A.tween(st.pulse,{[k]:0},400);A.sound.pop();say();A.redraw();st.chk();A.kick()}
 function removeFrom(k){if(!st.sh[k]){A.sound.miss();return}st.sh[k]--;A.sound.tick();say();A.redraw();st.chk()}
 function setAtom(z,sh){st.z=z;st.sh=(sh||[]).concat([0,0,0,0]).slice(0,4);syncButtons();say();A.redraw()}
 function syncButtons(){btns.forEach((b,k)=>b.disabled=false)}
 const isGround=()=>configText(st.sh)===configText(ground(st.z));
 const steps=[
  {h:'Where do electrons go?',p:'Electrons sit in shells around the nucleus. Lithium has 3 protons, so a neutral lithium atom has 3 electrons. Tap a ring to place each one.',predict:{q:'Shell 1 already has 2 electrons. Where does the 3rd go?',opts:['Shell 1 again, it is closest','Shell 2, because shell 1 is full','Anywhere, it does not matter'],ans:1},
   task:'Place lithium’s 3 electrons with no warning showing',show:()=>{setAtom(3,[2,1]);st.chk()},
   go:()=>{setAtom(3,[]);st.chk=()=>{if(st.z===3&&isGround())A.done('Shell 1 holds only 2, so the 3rd electron starts shell 2: lithium is 2,1. Inner shells fill first.'+A.reveal(0))}}},
  {h:'Fill in order',p:'Try putting an electron in an outer shell too early and watch the warning. Sodium has 11 electrons.',task:'Build sodium, 11 electrons, filling inner shells first',show:()=>{setAtom(11,[2,8,1]);st.chk()},
   go:()=>{setAtom(11,[]);st.chk=()=>{if(st.z===11&&isGround())A.done('2 + 8 + 1 = 11. Sodium is 2,8,1: one lonely electron in shell 3.')}}},
  {h:'Outer electrons and groups',p:'Look at the table as you finish each atom. The ring around the symbol shows its place.',predict:{q:'Chlorine is in group 7. What decides that?',opts:['It has 7 shells','It has 7 electrons in its outer shell','It has 7 neutrons'],ans:1},
   task:'Build chlorine (Z = 17)',show:()=>{setAtom(17,[2,8,7]);st.chk()},
   go:()=>{setAtom(17,[]);st.chk=()=>{if(st.z===17&&isGround())A.done('Chlorine is 2,8,7: 7 outer electrons, group 7. It has 3 shells, so it is in period 3. Group comes from the outer shell, period from the number of shells.'+A.reveal(2))}}},
  {h:'When shell 3 has 8',p:'Potassium has 19 electrons. Argon (2,8,8) has just filled shell 3.',predict:{q:'Where does potassium’s 19th electron go?',opts:['Shell 3: it can take up to 18','Shell 4','Shell 1'],ans:1},
   task:'Build potassium',show:()=>{setAtom(19,[2,8,8,1]);st.chk()},
   go:()=>{setAtom(19,[2,8,8]);st.chk=()=>{if(st.z===19&&isGround())A.done('Potassium is 2,8,8,1. For the first 20 elements the 19th and 20th electrons start shell 4. That is why potassium starts period 4, under sodium in group 1.'+A.reveal(3))}}},
  {h:'Sandbox',p:'Change the element with the Z buttons and build any of the first 20. Elements in one group have the same number of outer electrons, which is why they react alike. Spot the exceptions: helium (2) and the full shells of group 0.',go:()=>{setAtom(6,[]);st.chk=()=>{}}},
  {h:'Challenge',p:'',go:()=>newChal()}];
 A=FK.shell(c,{steps,ratio:.62,tall:1.45,draw,onStep:A=>{chal.hidden=A.step!==5;say()},
  init:A=>{const ctl=c.el('div',{class:'fl-below'},A.below);chal=c.el('div',{class:'fl-chal'},A.below);
   const zr=c.el('div',{class:'fl-ctl'},ctl);c.el('span',{},zr,'Element: ');zOut=c.el('output',{},zr,'');
   const zm=c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':'Previous element'},zr,'Z −');zm.onclick=()=>{if(st.z>1){setAtom(st.z-1,[]);A.sound.tick()}};
   const zp=c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':'Next element'},zr,'Z +');zp.onclick=()=>{if(st.z<20){setAtom(st.z+1,[]);A.sound.tick()}};
   const cr=c.el('div',{class:'fl-ctl'},ctl);c.el('span',{},cr,'Configuration: ');cfgOut=c.el('output',{},cr,'0');
   const sr=c.el('div',{class:'fl-ctl fl-wrap'},ctl);
   for(let k=0;k<4;k++){const b=c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':`Add an electron to shell ${k+1}`},sr,`+ shell ${k+1}`);b.onclick=()=>addTo(k);btns.push(b)}
   const rr=c.el('div',{class:'fl-ctl fl-wrap'},ctl);for(let k=0;k<4;k++){const b=c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':`Remove an electron from shell ${k+1}`},rr,`− shell ${k+1}`);b.onclick=()=>removeFrom(k)}
   if(typeof IntersectionObserver!=='undefined'){const io=new IntersectionObserver(e=>{onScreen=e[0].isIntersecting;if(onScreen)A.kick()});io.observe(A.cv);c.stops.push(()=>io.disconnect())}
   A.every(dt=>{if(!onScreen||A.reduced()||!total(st.sh))return false;st.spin+=dt*.35;return true});
   // tap a ring to add an electron there; press and drag an electron off the atom to remove it
   let press=null;
   const ringAt=p=>{const G=geo(A),d=Math.hypot(p.x-G.cx,p.y-G.cy);let best=-1,bd=1e9;for(let k=0;k<4;k++){const e=Math.abs(d-G.ring(k));if(e<bd){bd=e;best=k}}return bd<Math.max(16,G.R*.1)?best:-1};
   A.gest({down:p=>{const k=ringAt(p);if(k<0)return false;press={k,x:p.x,y:p.y};return true},
    move:p=>{},
    up:p=>{if(!press)return;const G=geo(A),out=Math.hypot(p.x-G.cx,p.y-G.cy)>G.ring(3)+24,moved=Math.hypot(p.x-press.x,p.y-press.y)>14;
     if(moved&&out)removeFrom(press.k);else if(!moved)addTo(press.k);press=null}});
   say()}});
 // ---------- challenge: build the configuration of a named element ----------
 const TARGETS=[9,13,16,20,12,18,5,19];let qi=-1;
 function newChal(){qi=(qi+1)%TARGETS.length;const z=TARGETS[qi];st.q=z;st.won=false;setAtom(z,[]);st.chk=()=>{};
  chal.innerHTML=`<p><b>Build ${NAME[z]}</b> (atomic number ${z}). Place every electron, then press Check. Then say its group and period.</p><p class="fl-fb" role="status" aria-live="polite"></p><button type="button" class="lbtn sm">Check</button>`;
  chal.querySelector('.lbtn').onclick=judge}
 function judge(){const z=st.q,fb=chal.querySelector('.fl-fb'),sh=st.sh,n=total(sh);if(!z||st.won)return;
  if(n===z&&isGround()){const p=place(z);st.won=true;fb.innerHTML=`✓ ${NAME[z]} is ${configText(sh)}: period ${p.period} (${p.period} shells), group ${p.group}${p.group===0?' (full outer shell)':` (${p.group} outer electron${p.group>1?'s':''})`}. <button type="button" class="linkish">Another →</button>`;A.win();fb.querySelector('button').onclick=newChal;return}
  A.sound.miss();let m;const gs=gapShell(sh);
  if(n<z)m=`Not finished: ${n} electrons placed, but ${z} protons need ${z} electrons in a neutral atom.`;
  else if(n>z)m=`${n} electrons but only ${z} protons: that is a negative ion, not a neutral ${NAME[z]} atom. Take ${n-z} away.`;
  else if(gs>=0)m=`Right number of electrons, wrong order: shell ${gs+1} still has room but a shell further out is in use. Inner shells fill first.`;
  else m=`Shell 3 holds 8 here before shell 4 starts: fill 2, then 8, then 8.`;
  fb.textContent=m}
 A.start()})})();
