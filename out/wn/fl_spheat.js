/* Flagship – specific heat capacity (ages 13–15): c is the energy needed to warm 1 kg of a substance by 1 °C
   (J/kg °C), and ΔE = m × c × Δθ. Give equal energy to 1 kg of water, oil and sand; find c for aluminium and copper
   by warming a 1 kg block by exactly 1 °C; see the energy double with the mass; pick answers whose wrong options are
   the usual slips; then drag a summer day on a beach to see why the sea stays mild at night. Drag on the canvas;
   buttons below mirror every control. Values: water 4200, oil about 2000, dry sand about 800, aluminium 900, copper 385. */
(()=>{
 const TRIO=[['water',4200],['cooking oil',2000],['dry sand',800]];
 const BLOCKS=[['aluminium',900],['copper',385]];
 const MASS_GOALS=[84000,21000];
 const SUMS=[['Warm 2 kg of water from 20 °C to 70 °C (c = 4200 J/kg °C).',[['420 000 J','ok'],['588 000 J','used 70 °C, the final temperature, not the 50 °C change'],['210 000 J','left out the 2 kg mass']]],
  ['Warm 0.5 kg of aluminium by 40 °C (c = 900 J/kg °C).',[['72 000 J','divided by the mass instead of multiplying'],['18 000 J','ok'],['36 000 J','left out the 0.5 kg mass']]],
  ['8400 J goes into 0.2 kg of water (c = 4200 J/kg °C). How much does it warm?',[['2 °C','left out the mass: divide by m × c, not just c'],['0.4 °C','multiplied by the mass instead of dividing'],['10 °C','ok']]]];
 const sand=t=>24+13*Math.sin(2*Math.PI*(t-9)/24),sea=t=>18+1.2*Math.sin(2*Math.PI*(t-11)/24);
 const clock=t=>{const h=Math.floor(t)%24;return String(h).padStart(2,'0')+':00'};
 const num=v=>Math.round(v).toLocaleString('en-GB').replace(/,/g,' ');
VIS.reg('flagspheat',c=>{let A,ctl,box;
 const H={run:0,E:0,b:0,rec:[],m:1,g:0,s:0,t:6,seen:{day:false,night:false},msg:'',bad:false,drag:false,watch:()=>{}};
 const part=()=>['trio','block','mass','sums','beach','chal'][A.step];
 const live=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
 const nope=t=>{H.bad=true;H.msg=t;A.sound.miss();live(t);A.redraw()};
 const good=t=>{H.bad=false;H.msg=t;A.sound.pop()};
 const z=n=>A.narrow?n:Math.round(n*1.15);
 function label(g,s,x,y,n,col,w,al){g.font=`${w||700} ${z(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col;g.fillText(s,x,y,A.W-16)}
 function wrapLabel(g,s,x,y,n,col,mw){g.font=`700 ${z(n)}px system-ui,sans-serif`;const L=[];let cur='';for(const w of s.split(' ')){const t=cur?cur+' '+w:w;if(cur&&g.measureText(t).width>mw){L.push(cur);cur=w}else cur=t}L.push(cur);const lh=z(n)+5;L.forEach((l,i)=>label(g,l,x,y+(i-(L.length-1)/2)*lh,n,col))}
 function card(g,r,col,f,th){g.fillStyle=A.alpha(col,f);A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=col;g.lineWidth=th?3:2;g.stroke()}
 const within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 const track=()=>({x:28,y:A.H*.13,w:A.W-56,h:30});
 function slider(g,C,frac,text){const r=track();g.strokeStyle=C.ln;g.lineWidth=8;g.lineCap='round';g.beginPath();g.moveTo(r.x,r.y+15);g.lineTo(r.x+r.w,r.y+15);g.stroke();
  g.strokeStyle=C.or;g.beginPath();g.moveTo(r.x,r.y+15);g.lineTo(r.x+r.w*frac,r.y+15);g.stroke();g.fillStyle=C.or;g.beginPath();g.arc(r.x+r.w*frac,r.y+15,13,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();
  label(g,text,A.W/2,A.H*.06,14,C.tx,800)}
 function thermo(g,C,x,top,bot,temp,lo,hi,col){const f=Math.max(0,Math.min(1,(temp-lo)/(hi-lo)));g.fillStyle=A.alpha(C.ln,.5);A.paint.rrect(x-7,top,14,bot-top,7);g.fill();
  g.fillStyle=col;A.paint.rrect(x-5,bot-(bot-top)*f,10,(bot-top)*f,5);g.fill();g.beginPath();g.arc(x,bot+6,10,0,7);g.fill()}
 function banner(g){if(!H.msg)return;const C=A.col;g.font=`700 ${z(13)}px system-ui,sans-serif`;const L=[];let cur='';for(const w of H.msg.split(' ')){const t=cur?cur+' '+w:w;if(cur&&g.measureText(t).width>A.W-46){L.push(cur);cur=w}else cur=t}L.push(cur);
  const lh=z(13)+5,h=L.length*lh+12,y=A.H-h-6;card(g,{x:12,y,w:A.W-24,h},H.bad?C.rd:C.gr,.13);L.forEach((l,i)=>label(g,(i?'':H.bad?'✗ ':'✓ ')+l,A.W/2,y+6+lh*(i+.5),13,C.tx))}
 const sumR=j=>({x:14,y:A.H*(.42+j*.13),w:A.W-28,h:A.H*.11});

 // ---------- scenes ----------
 const DRAW={
  trio(g,C){slider(g,C,H.E/42000,`Energy into each 1 kg: ${num(H.E)} J`);const top=A.H*.3,bot=A.H*.66;
   TRIO.forEach(([n,cc],i)=>{const x=A.W*(i+.5)/3,T=20+H.E/cc;thermo(g,C,x,top,bot,T,0,80,[C.cy,C.am,C.or][i]);label(g,n,x,top-14,13,C.tx,800);label(g,T.toFixed(1)+' °C',x,bot+30,15,C.tx,800);label(g,`c = ${cc}`,x,bot+50,11,C.mu,600)})},
  block(g,C){const done=H.b>=BLOCKS.length,[n,cc]=BLOCKS[Math.min(H.b,1)],dT=H.E/cc;slider(g,C,H.E/1000,done?'Both found':`Energy into 1 kg of ${n}: ${num(H.E)} J`);
   if(!done){const r={x:A.W*.12,y:A.H*.32,w:A.W*.4,h:A.H*.24};card(g,r,n==='copper'?C.or:C.cy,.25,true);label(g,'1 kg '+n,r.x+r.w/2,r.y+r.h/2,15,C.tx,800);
    thermo(g,C,A.W*.68,A.H*.28,A.H*.56,dT,0,2,C.rd);label(g,`rise ${dT.toFixed(2)} °C`,A.W*.68,A.H*.64,15,C.tx,800);label(g,'goal: 1.00 °C',A.W*.68,A.H*.69,11,C.mu,600)}
   H.rec.forEach((s,i)=>label(g,s,A.W/2,A.H*(done?.35:.75)+i*z(18),13,C.gr,800))},
  mass(g,C){const E=H.m*4200*10,r={x:A.W*.1,y:A.H*.3,w:A.W*.32,h:A.H*.34};g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(r.x,r.y,r.w,r.h);const lv=r.h*H.m/3;g.fillStyle=A.alpha(C.cy,.45);g.fillRect(r.x+2,r.y+r.h-lv,r.w-4,lv-2);
   label(g,`${H.m} kg water`,r.x+r.w/2,r.y+r.h+16,13,C.tx,800);slider(g,C,(H.m-.5)/2.5,`Mass: ${H.m} kg · warm it by 10 °C`);
   const bx=A.W*.55,bw=A.W*.38,full=r.h,bh=full*E/126000;g.fillStyle=A.alpha(C.or,.5);g.fillRect(bx,r.y+r.h-bh,bw,bh);g.strokeStyle=C.or;g.strokeRect(bx,r.y+r.h-bh,bw,bh);
   label(g,num(E)+' J',bx+bw/2,r.y+r.h-bh-12,14,C.tx,800);label(g,H.g<2?`find: ${num(MASS_GOALS[H.g])} J`:'both found',bx+bw/2,r.y+r.h+16,12,C.mu,700)},
  sums(g,C){if(H.s>=SUMS.length)return label(g,'ΔE = m × c × Δθ, with Δθ the change in temperature.',A.W/2,A.H*.2,14,C.gr);const r={x:14,y:A.H*.05,w:A.W-28,h:A.H*.3};card(g,r,C.vi,.12,true);
   wrapLabel(g,SUMS[H.s][0],A.W/2,r.y+r.h/2,15,C.tx,r.w-24);SUMS[H.s][1].forEach(([t],j)=>{const q=sumR(j);card(g,q,C.cy,.1);label(g,t,q.x+q.w/2,q.y+q.h/2,16,C.tx,800)})},
  beach(g,C){slider(g,C,(H.t-6)/24,`Time: ${clock(H.t)} ${H.t%24>=7&&H.t%24<19?'(sun up)':'(night)'}`);const gx=40,gy=A.H*.27,gw=A.W-60,gh=A.H*.36,X=t=>gx+gw*(t-6)/24,Y=v=>gy+gh*(1-(v-8)/32);
   g.strokeStyle=C.ln;g.lineWidth=1;g.strokeRect(gx,gy,gw,gh);[10,20,30,40].forEach(v=>label(g,v+'°',gx-16,Y(v),10,C.mu,600));[6,12,18,24,30].forEach(t=>label(g,clock(t),X(t),gy+gh+12,10,C.mu,600));
   [[sand,C.or,'sand'],[sea,C.cy,'sea']].forEach(([f,col,n])=>{g.strokeStyle=col;g.lineWidth=3;g.beginPath();for(let t=6;t<=H.t;t+=.25){const p=[X(t),Y(f(t))];t===6?g.moveTo(...p):g.lineTo(...p)}g.stroke();
    label(g,`${n} ${f(H.t).toFixed(1)} °C`,n==='sand'?A.W*.3:A.W*.72,gy+gh+32,14,C.tx,800);g.fillStyle=col;g.beginPath();g.arc(X(H.t),Y(f(H.t)),6,0,7);g.fill()})}};
 function draw(A){const{ctx:g,W,H:h,col:C}=A;g.fillStyle=A.mix(C.pn,'#ffedd5',C.dark?.06:.35);g.fillRect(0,0,W,h);const f=DRAW[part()];if(f)f(g,C);else label(g,'ΔE = m × c × Δθ',W/2,h/2,20,C.tx,800);banner(g);A.fx.draw(g)}

 // ---------- moves ----------
 function setE(v){const v0=part()==='trio'?Math.max(0,Math.min(42000,Math.round(v/2000)*2000)):Math.max(0,Math.min(1000,Math.round(v/5)*5));H.E=v0;
  if(part()==='trio'){H.msg=H.E>=42000?'42 000 J each: water +10 °C, oil +21 °C, sand +52.5 °C. Lower c, bigger rise.':'';H.bad=false}
  if(part()==='block'&&H.b<BLOCKS.length){const [n,cc]=BLOCKS[H.b];if(H.E===cc){H.rec.push(`${n}: c = ${cc} J/kg °C`);H.b++;good(`${cc} J warms 1 kg of ${n} by 1 °C, so c = ${cc} J/kg °C.`);H.E=0}else if(H.E>cc){H.bad=true;H.msg=`Too much: ${(H.E/cc).toFixed(2)} °C. Bring it back to exactly 1.00 °C.`}else H.msg=''}
  refresh()}
 function setM(v){H.m=Math.max(.5,Math.min(3,Math.round(v*2)/2));const E=H.m*42000;if(H.g<2&&E===MASS_GOALS[H.g]){good(`${H.m} kg × 4200 × 10 = ${num(E)} J. ${H.g?'Half a kilogram needs a quarter of 2 kg.':'Double the mass, double the energy.'}`);H.g++}else{H.msg='';H.bad=false}refresh()}
 function pickSum(j){const s=SUMS[H.s];if(!s)return;const [t,why]=s[1][j];if(why!=='ok')return nope(`${t} ${why}.`);H.s++;good(`${t}.`);refresh()}
 function setT(v){H.t=Math.max(6,Math.min(30,Math.round(v*2)/2));if(H.t>=14)H.seen.day=true;if(H.t>=26)H.seen.night=true;
  H.bad=false;H.msg=H.t>=26?`At ${clock(H.t)} the sand is ${sand(H.t).toFixed(0)} °C but the sea is ${sea(H.t).toFixed(0)} °C: water's high c makes it cool slowly.`:H.t>=14?`Afternoon: the sand is ${sand(H.t).toFixed(0)} °C, the sea only ${sea(H.t).toFixed(0)} °C. Same sun, very different rise.`:'';refresh()}

 function refresh(){const v=part();let s='';
  if(v==='trio')s=`Energy ${num(H.E)} J into each 1 kg. `+TRIO.map(([n,cc])=>`${n} ${(20+H.E/cc).toFixed(1)} °C`).join(', ')+'.';
  else if(v==='block')s=H.b<2?`Energy ${num(H.E)} J into 1 kg of ${BLOCKS[H.b][0]}: rise ${(H.E/BLOCKS[H.b][1]).toFixed(2)} °C.`:'Aluminium 900, copper 385 J/kg °C.';
  else if(v==='mass')s=`${H.m} kg of water needs ${num(H.m*42000)} J to warm by 10 °C.`;else if(v==='sums')s=H.s<SUMS.length?SUMS[H.s][0]:'All sums done.';
  else if(v==='beach')s=`${clock(H.t)}: sand ${sand(H.t).toFixed(1)} °C, sea ${sea(H.t).toFixed(1)} °C.`;else s='Challenge.';
  live((H.msg?H.msg+' ':'')+s);keys();H.watch()}
 function keys(){if(!ctl)return;ctl.innerHTML='';const v=part(),k=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);e.onclick=f};
  if(v==='trio'){k('− 6 000 J',()=>setE(H.E-6000),'Less energy');k('+ 6 000 J',()=>setE(H.E+6000),'More energy')}
  if(v==='block'&&H.b<2)[-100,-10,-5,5,10,100].forEach(d=>k((d>0?'+':'−')+Math.abs(d)+' J',()=>setE(H.E+d),`${d>0?'Add':'Remove'} ${Math.abs(d)} joules`));
  if(v==='mass'){k('− 0.5 kg',()=>setM(H.m-.5),'Less water');k('+ 0.5 kg',()=>setM(H.m+.5),'More water')}
  if(v==='sums'&&H.s<SUMS.length)SUMS[H.s][1].forEach(([t],j)=>k(t,()=>pickSum(j)));
  if(v==='beach'){k('− 2 hours',()=>setT(H.t-2),'Earlier');k('+ 2 hours',()=>setT(H.t+2),'Later')}A.redraw()}

 const fromX=p=>{const r=track();return Math.max(0,Math.min(1,(p.x-r.x)/r.w))};
 function slide(p){const v=part(),f=fromX(p);if(v==='trio')setE(f*42000);else if(v==='block'&&H.b<2)setE(f*1000);else if(v==='mass')setM(.5+f*2.5);else if(v==='beach')setT(6+f*24)}
 function down(p){const v=part();if(v==='sums'&&H.s<SUMS.length){const j=[0,1,2].find(j=>within(p,sumR(j)));if(j!=null)pickSum(j);return false}
  if(['trio','block','mass','beach'].includes(v)&&p.y<A.H*.24){H.drag=true;slide(p);return true}return false}

 // ---------- steps ----------
 const goal=(n,test,msg)=>()=>{if(A.step===n&&test()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
 const auto=fs=>{const id=++H.run,dt=A.reduced()?15:350;fs.forEach((f,i)=>setTimeout(()=>{if(id===H.run)f()},i*dt))};
 const wipe=()=>{H.run++;H.watch=()=>{};H.E=0;H.b=0;H.rec=[];H.m=1;H.g=0;H.s=0;H.t=6;H.seen={day:false,night:false};H.msg='';H.bad=false};
 const steps=[
  {h:'Same energy, different rise',p:'Specific heat capacity, c, is the energy needed to warm 1 kg of a substance by 1 °C. Drag the energy slider to give 42 000 J to 1 kg each of water, oil and sand.',
   predict:{q:'1 kg of water and 1 kg of sand get the same energy. Which gets hotter?',opts:['water','sand','they warm the same'],ans:1},task:'Give each 42 000 J',
   show:()=>{steps[0].go();auto([14000,28000,42000].map(e=>()=>setE(e)))},go:()=>{wipe();refresh();H.watch=goal(0,()=>H.E>=42000,'Sand rose 52.5 °C, water only 10 °C: a high c means a small rise.')}},
  {h:'Measure c',p:'To find c, warm exactly 1 kg by exactly 1 °C and read the energy. Drag the slider, or use the buttons, until the rise is 1.00 °C.',
   predict:{q:'Which needs more energy to warm 1 kg by 1 °C?',opts:['copper','aluminium'],ans:1},task:'Find c for 2 metals',
   show:()=>{steps[1].go();auto([()=>setE(900),()=>setE(385)])},go:()=>{wipe();refresh();H.watch=goal(1,()=>H.b>=2,'Aluminium 900 J/kg °C, copper 385 J/kg °C.')}},
  {h:'More mass, more energy',p:'Twice the mass needs twice the energy for the same rise: ΔE = m × c × Δθ. Drag the mass slider to find the water that needs each amount of energy to warm by 10 °C.',
   predict:{q:'Double the mass of water, same 10 °C rise. The energy needed is…',opts:['the same','double','half'],ans:1},task:'Find 2 masses',
   show:()=>{steps[2].go();auto([()=>setM(2),()=>setM(.5)])},go:()=>{wipe();refresh();H.watch=goal(2,()=>H.g>=2,'2 kg needs 84 000 J and 0.5 kg needs 21 000 J: energy is proportional to mass.')}},
  {h:'Use the equation',p:'ΔE = m × c × Δθ. Δθ is the change in temperature, not the final one. Tap the right answer; each wrong one is a common slip.',task:'Solve 3 problems',
   show:()=>{steps[3].go();auto(SUMS.map(s=>()=>pickSum(s[1].findIndex(o=>o[1]==='ok'))))},go:()=>{wipe();refresh();H.watch=goal(3,()=>H.s>=SUMS.length,'Use the change in temperature and keep the mass in.')}},
  {h:'Beach and sea',p:'The sun gives the sand and the sea about the same energy. This sketch shows a sunny day. Drag the time to the afternoon, then on into the night.',
   predict:{q:'At 2 am, which is warmer?',opts:['the sand: it was hotter all day','the sea: it cools slowly'],ans:1},task:'Drag to 14:00 and to 02:00',
   show:()=>{steps[4].go();auto([10,14,20,26].map(t=>()=>setT(t)))},go:()=>{wipe();refresh();H.watch=goal(4,()=>H.seen.day&&H.seen.night,'Water warms and cools slowly, so coasts have milder days and nights.')}},
  {h:'Challenge',p:'',go:()=>{wipe();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>H.watch()});

 // ---------- challenge: every wrong option names the slip ----------
 const Q=[['Each 1 kg gets the same energy. Which warms the most?','copper (c = 385)',[['water (c = 4200)','big'],['aluminium (c = 900)','big']]],
  ['Energy to warm 1 kg of water from 20 °C to 30 °C (c = 4200 J/kg °C)?','42 000 J',[['126 000 J','final'],['4 200 J','change']]],
  ['Energy to warm 3 kg of water by 10 °C (c = 4200 J/kg °C)?','126 000 J',[['42 000 J','mass'],['14 000 J','mass']]],
  ['Why is the sea still mild at night after a hot day?','water has a high c, so it cools slowly',[['the sea is deeper, so it gets more sun','temp'],['water has a low c','big']]],
  ['What are the units of specific heat capacity?','J/kg °C',[['°C','unit'],['J','unit']]],
  ['A 2 kg iron pan gets 9000 J (c = 450 J/kg °C). How much does it warm?','10 °C',[['20 °C','mass'],['0.1 °C','flip']]]];
 function slip(tag,w){let m='Check ΔE = m × c × Δθ again.';
  if(tag==='big')m=`${w}: a higher c means more energy per degree, so it warms less, not more.`;
  if(tag==='final')m=`${w} uses the final 30 °C. Use the change: 30 − 20 = 10 °C.`;
  if(tag==='change')m=`${w} is the energy for 1 °C. Multiply by the 10 °C change too.`;
  if(tag==='mass')m=`${w} does not multiply by the mass properly. Energy is proportional to mass.`;
  if(tag==='temp')m=`${w}: the sun warms sand and sea alike. The difference is water's high specific heat capacity.`;
  if(tag==='unit')m=`${w} is not enough: c is joules per kilogram per degree, J/kg °C.`;
  if(tag==='flip')m=`${w} divides the wrong way round. Δθ = ΔE ÷ (m × c) = 9000 ÷ 900.`;
  return m}
 let qi=-1,row=0;
 function ask(){qi++;const [q,ans,bad]=Q[qi%Q.length],all=[[ans,'ok']].concat(bad),r=qi%3,order=all.slice(r).concat(all.slice(0,r));
  box.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const pk=box.querySelector('.fl-pick');order.forEach(([w,tag])=>{const e=c.el('button',{type:'button',class:'lbtn'},pk,w);e.onclick=()=>reply(tag,w,ans)});live('Challenge: '+q);A.redraw()}
 function reply(tag,w,ans){box.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=box.querySelector('.fl-fb');
  if(ok){row++;A.win()}else{row=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Right: '+ans+'. Run: '+row+'.':'✗ '+slip(tag,w)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}

 A=FK.shell(c,{steps,ratio:.62,tall:1.08,draw,onStep:A=>{box.hidden=A.step!==5;ctl.hidden=A.step===5;keys()},
  init:A=>{const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Heat capacity controls'},w);box=c.el('div',{class:'fl-chal'},A.below);
   A.gest({down,move:p=>{if(H.drag)slide(p)},up:()=>{H.drag=false}})}});
 A.start()})})();
