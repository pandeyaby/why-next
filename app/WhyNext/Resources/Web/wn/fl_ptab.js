/* Flagship 30 – periodic table patterns from electrons. The first 20 elements sit on a live grid (Groups 1–7 and 0 across,
   Periods 1–4 down) next to an atom view. Tapping a cell draws that atom's shells with its outer electrons picked out, so
   the learner sees, column by column, that a group shares an outer-electron count and, row by row, that a period shares a
   shell count. A "mystery atom" step gives only an electron arrangement; the learner moves a cursor (or taps) to the cell
   where it must live, and wrong placements are diagnosed (group and period swapped, shells miscounted, outer electrons
   miscounted). A water trough then shows Group 1 metals reacting alike but more strongly down the group, against slow
   magnesium; the noble gases show full outer shells and no reaction. Predictions target "group = number of shells",
   "elements across a period behave alike", "group number = total electrons", "potassium reacts differently because it is a
   different element" and "full shells grab more electrons". Challenge: group/period to outer electrons and shells, an
   arrangement to a place, and an unfamiliar element to the element it behaves like; feedback names the slip. */
(()=>{const SY=['','H','He','Li','Be','B','C','N','O','F','Ne','Na','Mg','Al','Si','P','S','Cl','Ar','K','Ca'],
 NM=['','hydrogen','helium','lithium','beryllium','boron','carbon','nitrogen','oxygen','fluorine','neon','sodium','magnesium','aluminium','silicon','phosphorus','sulfur','chlorine','argon','potassium','calcium'];
 const conf=z=>{const o=[];let r=z;for(const cap of[2,8,8,2]){if(r<=0)break;const k=Math.min(cap,r);o.push(k);r-=k}return o};
 const per=z=>conf(z).length,outer=z=>conf(z).slice(-1)[0],full=z=>z===2||z===10||z===18,grp=z=>full(z)?0:outer(z);
 const col=z=>{const g=grp(z);return g===0?7:g-1},cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
 const at=(g,p)=>{for(let z=1;z<=20;z++)if(grp(z)===g&&per(z)===p&&z!==1)return z;return 0};
 const WATER={3:[1,'Lithium floats and fizzes steadily, giving off hydrogen.'],11:[2,'Sodium fizzes fast, melts into a ball and skims across the water.'],
  19:[3.4,'Potassium reacts violently: it fizzes hard and the hydrogen catches fire with a lilac flame.'],12:[.12,'Magnesium, in Group 2, barely reacts with cold water: a few slow bubbles.'],
  20:[1.1,'Calcium, below magnesium in Group 2, fizzes steadily: Group 2 also gets more reactive going down.']};
VIS.reg('flagptab',c=>{let A,pad,chal,read;const hot=[];
 const W={sel:0,seen:new Set(),myst:[],placed:[],cur:{g:1,p:1},react:0,rt:0,flash:0,mark:0,goal:()=>{},run:0,tank:false};
 const say=t=>{t=cap(t);c.say(t);if(read)read.textContent=t};
 function info(z){const e=conf(z),g=grp(z),p=per(z),n=NM[z];
  if(z===1)return`Hydrogen: 1. One shell, so Period 1. It has 1 outer electron, but it is a non-metal gas, so many tables set it apart from Group 1.`;
  if(g===0)return`${cap(n)}: ${e.join(', ')}. ${p} shell${p>1?'s':''}, so Period ${p}. Its outer shell is full${z===2?' with just 2 electrons':''}, so it sits in Group 0 and barely reacts.`;
  return`${cap(n)}: ${e.join(', ')}. ${p} occupied shell${p>1?'s':''}, so Period ${p}. ${g} outer electron${g>1?'s':''}, so Group ${g}.`}
 function pick(z){W.sel=z;W.seen.add(z);A.sound.tick();say(info(z));sync();W.goal()}
 function drop(z){if(!WATER[z])return say(`${cap(NM[z])} is not a Group 1 or Group 2 metal. Pick lithium, sodium, potassium, magnesium or calcium.`);
  W.sel=z;W.react=z;W.rt=0;W.tank=true;W.seen.add(z);A.sound.pop();say(WATER[z][1]+(grp(z)===1?' Every Group 1 metal makes hydrogen and an alkaline solution, because each has 1 outer electron to lose.':''));sync();W.goal();A.kick()}
 function place(g,p){const z=W.myst[0];if(!z)return;const tz=at(g,p);W.cur={g,p};
  if(g===grp(z)&&p===per(z)){W.myst.shift();W.placed.push(z);W.sel=z;W.seen.add(z);A.sound.pop();say(`Yes: ${conf(z).join(', ')} is ${NM[z]}. ${p} shells gives Period ${p}; ${g} outer electrons gives Group ${g}.${W.myst.length?' Next mystery atom.':' All placed.'}`)}
  else{A.sound.miss();W.flash=1;A.tween(W,{flash:0},700,'out');const e=conf(z).join(', ');
   say(g===per(z)&&p===grp(z)?`Group and period are swapped. ${e} has ${per(z)} shells (the period) and ${grp(z)} outer electrons (the group).`:
    g===grp(z)?`Right group, wrong row. Count the shells in ${e}: there are ${per(z)}, so it is in Period ${per(z)}.`:
    p===per(z)?`Right row, wrong column. Only the outer shell counts: the last number in ${e} is ${outer(z)}, so Group ${grp(z)}.`:
    `Not there${tz?` (that is ${NM[tz]})`:''}. ${e} has ${per(z)} shells and ${outer(z)} outer electrons.`)}
  sync();W.goal()}
 function moveCur(dg,dp){const gs=[1,2,3,4,5,6,7,0];let i=gs.indexOf(W.cur.g)+dg;i=Math.max(0,Math.min(7,i));W.cur={g:gs[i],p:Math.max(1,Math.min(4,W.cur.p+dp))};
  say(`Cursor on Group ${W.cur.g}, Period ${W.cur.p}.`);sync()}
 function play(list,ms=420){const tok=++W.run;let j=0;const go=()=>{if(tok!==W.run||j>=list.length)return;list[j++]();A.tween({u:0},{u:1},ms,'io',go)};go()}
 function describe(){const s=W.sel;let t=`Periodic table of the first 20 elements: Groups 1 to 7 and 0 across, Periods 1 to 4 down.`;
  if(W.myst.length)t+=` Mystery atom with electrons ${conf(W.myst[0]).join(', ')}. Cursor on Group ${W.cur.g}, Period ${W.cur.p}.`;
  if(W.tank&&W.react)t+=` Water trough: ${WATER[W.react][1]}`;else if(s)t+=` Atom view: ${info(s)}`;
  if(W.seen.size)t+=` Looked at: ${[...W.seen].map(z=>SY[z]).join(', ')}.`;return t}
 function sync(){if(!A)return;A.cv.setAttribute('aria-label',describe());if(!pad)return;pad.innerHTML='';const s=A.step,b=(t,aria,f,off)=>{const x=c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':aria},pad,t);x.disabled=!!off;x.onclick=f};
  if(s===6)return A.redraw();
  const list={0:[3,11,19],1:[11,12,13,14,15,16,17,18],4:[2,10,18]}[s];
  if(list)list.forEach(z=>b(SY[z],`Show the electrons of ${NM[z]}`,()=>pick(z)));
  if(s===2&&W.myst.length){b('◀ Group','Move the cursor one group left',()=>moveCur(-1,0));b('Group ▶','Move the cursor one group right',()=>moveCur(1,0));
   b('▲ Period','Move the cursor up one period',()=>moveCur(0,-1));b('Period ▼','Move the cursor down one period',()=>moveCur(0,1));b('Place here','Place the mystery atom at the cursor',()=>place(W.cur.g,W.cur.p))}
  if(s===3)[3,11,19,12].forEach(z=>b(`Drop ${SY[z]}`,`Drop ${NM[z]} into water`,()=>drop(z)));
  if(s===5){b('◀','Select the previous element',()=>pick(Math.max(1,(W.sel||2)-1)));b('▶','Select the next element',()=>pick(Math.min(20,(W.sel||0)+1)));
   b('Drop in water','Drop the selected element into water',()=>drop(W.sel),!WATER[W.sel]);if(W.tank)b('Atom view','Show the atom view again',()=>{W.tank=false;W.react=0;sync()})}
  A.redraw()}
 // ---- drawing ----
 function geo(A){const{W:Wd,H}=A,n=A.narrow,gw=n?Wd-12:Wd*.58,gh=n?H*.5:H-16,L=n?22:26,T=n?24:30,cw=(gw-L)/8,ch=(gh-T)/4;
  return{L,T,cw,ch,x0:6,y0:8,cx:g=>6+L+(g===0?7:g-1)*cw,cy:p=>8+T+(p-1)*ch,px:n?6:gw+14,py:n?gh+16:8,pw:n?Wd-12:Wd-gw-20,ph:n?H-gh-24:H-16}}
 function drawGrid(A,g){const{ctx,col:C,paint:P}=A,s=A.step,fs=A.narrow?13:15;
  ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`700 ${A.narrow?10:11}px system-ui`;ctx.fillStyle=C.mu;
  [1,2,3,4,5,6,7,0].forEach(k=>ctx.fillText(k,g.cx(k)+g.cw/2,g.y0+g.T/2));for(let p=1;p<=4;p++)ctx.fillText(`P${p}`,g.x0+g.L/2,g.cy(p)+g.ch/2);
  for(let z=1;z<=20;z++){const x=g.cx(grp(z)===0?0:z===1?1:grp(z))+2,y=g.cy(per(z))+2,w=g.cw-4,h=g.ch-4,hid=W.myst.includes(z);
   const lit=(s===0&&grp(z)===1&&z!==1)||(s===1&&per(z)===3)||(s===4&&grp(z)===0)||(s===3&&WATER[z]);
   ctx.fillStyle=hid?A.alpha(C.mu,.12):W.sel===z?A.mix(C.pn,C.am,.3):lit?A.mix(C.pn,C.cy,.18):C.pn;P.rrect(x,y,w,h,6);ctx.fill();
   if(z===1){ctx.setLineDash([3,3])}ctx.strokeStyle=W.sel===z?C.am:A.alpha(C.tx,.3);ctx.lineWidth=W.sel===z||W.mark===z?2.5:1;if(W.mark===z)ctx.strokeStyle=C.gr;P.rrect(x,y,w,h,6);ctx.stroke();ctx.setLineDash([]);
   ctx.fillStyle=C.tx;if(hid){ctx.font=`800 ${fs}px system-ui`;ctx.fillText('?',x+w/2,y+h/2)}
   else{ctx.font=`800 ${fs}px system-ui`;ctx.fillText(SY[z],x+w/2,y+h*.42);ctx.font=`600 ${A.narrow?8.5:10}px system-ui`;ctx.fillStyle=C.mu;
    ctx.fillText(W.seen.has(z)?conf(z).join(','):String(z),x+w/2,y+h*.78)}
   hot.push({k:'cell',z,x,y,w,h})}
  if(s===2&&W.myst.length){const x=g.cx(W.cur.g)+1,y=g.cy(W.cur.p)+1,a=W.flash;ctx.strokeStyle=a?C.rd:C.am;ctx.lineWidth=3;ctx.setLineDash([5,3]);P.rrect(x,y,g.cw-2,g.ch-2,7);ctx.stroke();ctx.setLineDash([])}
  if(s===2)for(let gg of[1,2,3,4,5,6,7,0])for(let p=1;p<=4;p++)hot.push({k:'slot',g:gg,p,x:g.cx(gg),y:g.cy(p),w:g.cw,h:g.ch})}
 function drawAtom(A,g,z,mystery){const{ctx,col:C,paint:P}=A,e=conf(z),cx=g.px+g.pw/2,cy=g.py+g.ph*.47,R=Math.min(g.pw,g.ph*.8)/2-6,r0=R*.24;
  P.ball(cx,cy,r0,mystery?C.mu:C.rd);ctx.fillStyle='#fff';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`800 ${Math.max(11,r0*.8)}px system-ui`;ctx.fillText(mystery?'?':SY[z],cx,cy+1);
  e.forEach((k,i)=>{const rr=r0+(R-r0)*(i+1)/e.length,last=i===e.length-1;ctx.strokeStyle=A.alpha(last?C.am:C.tx,last?.8:.3);ctx.lineWidth=last?2:1;ctx.beginPath();ctx.arc(cx,cy,rr,0,7);ctx.stroke();
   for(let j=0;j<k;j++){const t=-Math.PI/2+j*2*Math.PI/k+i*.3;P.ball(cx+rr*Math.cos(t),cy+rr*Math.sin(t),last?5.5:4,last?C.am:C.cy)}});
  const lab=mystery?`Electrons: ${e.join(', ')}. Where does it go?`:z===1?'1 shell · 1 outer electron':`${e.length} shell${e.length>1?'s':''} → Period ${e.length} · ${grp(z)===0?'full outer shell → Group 0':`${outer(z)} outer → Group ${grp(z)}`}`;
  P.label(lab,cx,g.py+g.ph-10,{font:`700 ${A.narrow?11:12}px system-ui`,bg:A.alpha(C.am,.95),col:'#111'})}
 function drawTank(A,g){const{ctx,col:C,paint:P}=A,x=g.px+6,w=g.pw-12,top=g.py+g.ph*.3,bot=g.py+g.ph-30,z=W.react;
  ctx.fillStyle=A.alpha(C.cy,.22);P.rrect(x,top,w,bot-top,10);ctx.fill();ctx.strokeStyle=A.alpha(C.tx,.4);ctx.lineWidth=1.5;P.rrect(x,g.py+g.ph*.18,w,bot-g.py-g.ph*.18,10);ctx.stroke();
  if(z){const k=WATER[z][0],mx=x+w/2+Math.sin(W.rt*k*1.6)*w*.3*Math.min(1,k/3),my=top+2;if(z===19){P.glow(C.vi,24);ctx.fillStyle=A.alpha(C.vi,.55);ctx.beginPath();ctx.ellipse(mx,my-18,12,22,0,0,7);ctx.fill();P.noShadow()}
   P.ball(mx,my,9,'#9ca3af');ctx.fillStyle='#111';ctx.font='800 10px system-ui';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(SY[z],mx,my+.5);W.mx=mx;W.my=my;
   P.label(`${NM[z]} + water`,x+w/2,bot+16,{font:`700 ${A.narrow?11:12}px system-ui`,bg:A.alpha(C.am,.95),col:'#111'})}
  ctx.save();P.rrect(x,g.py+g.ph*.18,w,bot-g.py-g.ph*.18,10);ctx.clip();W.bub.draw(ctx);ctx.restore();
  if(!z)P.label('drop a metal in',x+w/2,bot+16,{font:'700 12px system-ui',bg:A.alpha(C.am,.95),col:'#111'})}
 function draw(A){const{ctx,W:Wd,H,col:C,paint:P}=A;hot.length=0;ctx.fillStyle=P.lin(0,0,0,H,[[0,A.mix(C.pn,C.cy,.05)],[1,C.pn]]);ctx.fillRect(0,0,Wd,H);const g=geo(A);drawGrid(A,g);
  ctx.fillStyle=A.alpha(C.tx,.04);P.rrect(g.px,g.py,g.pw,g.ph,12);ctx.fill();
  if(W.tank)drawTank(A,g);else if(A.step===2&&W.myst.length)drawAtom(A,g,W.myst[0],true);else if(W.sel)drawAtom(A,g,W.sel,false);
  else{ctx.fillStyle=C.mu;ctx.font='600 13px system-ui';ctx.textAlign='center';ctx.fillText('Tap an element',g.px+g.pw/2,g.py+g.ph/2)}A.fx.draw(ctx)}
 // ---- steps ----
 const fresh=()=>{W.run++;if(W.bub)W.bub.P.length=0;A.fx.P.length=0;c.say('');W.sel=0;W.seen=new Set();W.myst=[];W.placed=[];W.cur={g:1,p:1};W.react=0;W.tank=false;W.mark=0;W.goal=()=>{};if(read)read.textContent=''};
 const fin=(i,ok,msg)=>()=>{if(A.extra.querySelector('.fl-task')&&ok())A.done(msg+A.reveal(i))};
 const all=l=>l.every(z=>W.seen.has(z));
 const steps=[
  {h:'Down a group',p:'The table is built from electrons. Each column is a group. Look at the first three metals in Group 1.',
   predict:{q:'Lithium, sodium and potassium are all in Group 1. How many outer-shell electrons does each have?',opts:['1, 2 and 3: one more each row','1 each','3, 11 and 19'],ans:1},
   task:'Tap Li, Na and K to see their electrons',show:()=>play([3,11,19].map(z=>()=>pick(z))),
   go:()=>{fresh();W.goal=fin(0,()=>all([3,11,19]),'Every Group 1 atom has 1 outer electron. The group number tells you the outer electrons.')}},
  {h:'Across a period',p:'Each row is a period. Walk along Period 3 from sodium to argon and watch the shells.',
   predict:{q:'What stays the same for every element across Period 3?',opts:['The number of outer electrons','The number of occupied shells','How they react'],ans:1},
   task:'Tap all eight elements in Period 3',show:()=>play([11,12,13,14,15,16,17,18].map(z=>()=>pick(z)),300),
   go:()=>{fresh();W.goal=fin(1,()=>all([11,12,13,14,15,16,17,18]),'All of Period 3 has 3 occupied shells. Across the row, one outer electron is added each time.')}},
  {h:'Mystery atoms',p:'Three cells have lost their names. You only get the electron arrangement. Put each atom where it belongs.',
   predict:{q:'A mystery atom is 2, 8, 6. Where does it go?',opts:['Group 3, Period 6','Group 6, Period 3','Group 16, Period 3'],ans:1},
   task:'Tap the right cell for each mystery atom (or move the cursor and press Place here)',
   show:()=>{const q=[...W.myst];play(q.flatMap(z=>[()=>{W.cur={g:grp(z),p:per(z)};sync()},()=>place(grp(z),per(z))]),360)},
   go:()=>{fresh();W.myst=[16,7,20];W.goal=fin(2,()=>!W.myst.length,'Shells give the period and outer electrons give the group, so an arrangement has only one possible place.')}},
  {h:'Same group, same reactions',p:'Reactions depend on outer electrons. Drop the Group 1 metals into water, then try magnesium from Group 2.',
   predict:{q:'Potassium is below sodium in Group 1. How will it react with water?',opts:['Not at all: it is a different element','Like sodium, but more strongly','Like magnesium, slowly'],ans:1},
   task:'Drop Li, Na and K into the water, one at a time',show:()=>play([3,11,19].map(z=>()=>drop(z)),1100),
   go:()=>{fresh();W.tank=true;W.goal=fin(3,()=>all([3,11,19]),'All three fizz and make hydrogen, because each has 1 outer electron to lose. Reactivity rises down Group 1.')}},
  {h:'Full outer shells',p:'Group 0 holds the noble gases. Look at their outer shells.',
   predict:{q:'Neon is 2, 8. Will it react easily, like fluorine next to it?',opts:['Yes: it is in the same period','No: its outer shell is already full','Yes: it has more electrons'],ans:1},
   task:'Tap He, Ne and Ar',show:()=>play([2,10,18].map(z=>()=>pick(z))),
   go:()=>{fresh();W.goal=fin(4,()=>all([2,10,18]),'Noble gases have full outer shells, so they barely react. Helium is full with only 2.')}},
  {h:'Sandbox',p:'Tap any element, step through them all, or drop a Group 1 or Group 2 metal into water.',go:()=>{fresh();pick(1)}},
  {h:'Challenge',p:'',go:()=>{fresh();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>W.goal()});
 // ---- challenge ----
 const QS=[{t:'gp',z:20},{t:'conf',z:17},{t:'like',z:19,ans:11},{t:'gp',z:7},{t:'conf',z:11},{t:'like',z:20,ans:12},{t:'gp',z:17},{t:'conf',z:8},{t:'like',z:16,ans:8}];let qi=-1,streak=0;
 function ask(){qi=(qi+1)%QS.length;const q=QS[qi],z=q.z,g=grp(z),p=per(z);W.mark=0;let html,opts;
  if(q.t==='gp'){html=`<p><b>An element is in Group ${g}, Period ${p}. How many outer electrons and occupied shells does it have?</b></p>`;
   opts=[{l:`${g} outer electrons, ${p} shells`,s:'ok'},{l:`${p} outer electrons, ${g} shells`,s:'swap'},{l:`${z} outer electrons, ${p} shells`,s:'total'}]}
  else if(q.t==='conf'){html=`<p><b>An atom has electrons arranged ${conf(z).join(', ')}. Where is it in the table?</b></p>`;
   opts=[{l:`Group ${g}, Period ${p}`,s:'ok'},{l:`Group ${p}, Period ${g}`,s:'swap'},{l:`Group ${g}, Period ${z}`,s:'total'}]}
  else{const nb=z+(grp(z+1)===0||z===20?-1:1),ng=[2,10,18,18][p-1];html=`<p><b>An unfamiliar element is in Group ${g}, Period ${p}. Which element will it react most like?</b></p>`;
   opts=[{l:cap(NM[q.ans]),s:'ok'},{l:cap(NM[nb]),s:'period',z:nb},{l:cap(NM[ng]),s:'noble',z:ng}]}
  const k=qi%opts.length;opts=opts.slice(k).concat(opts.slice(0,k));
  chal.innerHTML=html+'<div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>';
  const row=chal.querySelector('.fl-pick');opts.forEach(o=>{const b=c.el('button',{type:'button',class:'lbtn sm'},row,o.l);b.onclick=()=>judge(q,o)});sync()}
 function judge(q,o){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),z=q.z,g=grp(z),p=per(z);let m;W.mark=z;W.sel=z;W.seen.add(z);
  if(o.s==='ok')m=q.t==='like'?`Same group means the same number of outer electrons (${g}), so ${NM[q.ans]} is the best guide. It is ${NM[z]}.`:`It is ${NM[z]}, ${conf(z).join(', ')}: ${p} shells for Period ${p} and ${g} outer electrons for Group ${g}.`;
  else if(o.s==='swap')m=`Group and period are swapped. The group gives the outer electrons (${g}); the period gives the number of shells (${p}).`;
  else if(o.s==='total')m=`That uses the total number of electrons, ${z}. Only the outer shell sets the group, and the number of shells sets the period.`;
  else if(o.s==='period')m=`${cap(NM[o.z])} is in the same period, so it has the same number of shells, but a different number of outer electrons. Reactions follow the group.`;
  else m=`${cap(NM[o.z])} is a noble gas with a full outer shell, so it barely reacts. Look for the element with ${g} outer electron${g>1?'s':''}: same group.`;
  if(o.s==='ok'){streak++;A.win();fb.innerHTML=`✓ ${m} Streak: ${streak}. <button type="button" class="linkish">Another →</button>`}
  else{streak=0;A.sound.miss();fb.innerHTML=`✗ Not quite. ${m} <button type="button" class="linkish">Another →</button>`}
  fb.querySelector('button').onclick=ask;sync()}
 A=FK.shell(c,{steps,ratio:.62,tall:1.25,draw,onStep:A=>{chal.hidden=A.step!==6;sync()},
  init:A=>{const E=c.el,box=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},box);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Explore the table'},box);chal=E('div',{class:'fl-chal'},A.below);
   W.bub=A.particles();A.every(dt=>W.bub.step(dt));A.every(dt=>{if(!W.tank||!W.react)return false;W.rt+=dt;if(A.reduced())return false;const k=WATER[W.react][0];if(Math.random()<k*dt*14)W.bub.add(Math.ceil(k),()=>({x:(W.mx||0)+(Math.random()-.5)*14,y:(W.my||0)+6,vx:(Math.random()-.5)*30,vy:-30-Math.random()*25*k,life:.6,r:2+Math.random()*2,col:A.alpha(A.col.tx,.5)}));return W.rt<8});
   const inBox=(p,q)=>p.x>=q.x&&p.x<=q.x+q.w&&p.y>=q.y&&p.y<=q.y+q.h;
   A.gest({down:p=>{if(A.step===6)return false;if(A.step===2){const t=hot.find(q=>q.k==='slot'&&inBox(p,q));if(t&&W.myst.length)place(t.g,t.p);return false}
     const t=hot.find(q=>q.k==='cell'&&inBox(p,q));if(!t)return false;if(A.step===3)drop(t.z);else pick(t.z);return false}});sync()}});
 A.start()})})();
