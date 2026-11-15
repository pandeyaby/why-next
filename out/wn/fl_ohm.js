/* Flagship – Ohm's law (ages 12–13; KS3 physics: current, potential difference and resistance, R = V ÷ I; GCSE V = IR).
   Swap resistors on a 6 V cell and watch the current, plot I against V for one resistor, rearrange V = IR with a formula
   triangle, slide a clip along a resistance wire to hit a target current, and read resistance from the slope of I–V lines. */
(()=>{
 const RS=[2,3,6,12], VS=[2,4,6,8], RFIX=4;
 const CALC=[['I = 0.5 A, R = 12 Ω. Find V.','V',[['6 V','ok'],['24 V','div'],['12.5 V','add']]],['V = 9 V, R = 3 Ω. Find I.','I',[['3 A','ok'],['27 A','mul'],['0.33 A','flip']]],['V = 12 V, I = 2 A. Find R.','R',[['6 Ω','ok'],['24 Ω','mul'],['10 Ω','sub']]]];
 const WIRE={ohmPerCm:.1,V:3}, TARG=[.5,1.5];
 const LINES=[['20 Ω resistor',.05,0],['5 Ω resistor',.2,0],['filament lamp',0,1]];   // [name, slope I/V, curved]
 const ASK=[[0,'Tap the line for the 20 Ω resistor.'],[1,'Tap the line for the 5 Ω resistor.'],[2,'Tap the part whose resistance changes as it heats up.']];
 const fmt=x=>String(Math.round(x*100)/100);
 VIS.reg('flagohm',c=>{let A,pad,chal;
 const S={then:()=>{}};
 const part=()=>['swap','iv','tri','wire','slope','chal'][A.step];
 const INK='#1e293b',MUTE='#475569',GRID='#cbd5e1',BACK='#ffffff',OK='#047857',NO='#b91c1c',TOP='#ede9fe',HIT='#dcfce7',CU='#b45309',WIREC='#334155',DOT='#2563eb',PURP='#6d28d9';
 const q=n=>Math.round(n*(A.narrow?1.05:1.2));
 function word(g,s,x,y,n,col,al){g.font=`700 ${q(n)}px system-ui,sans-serif`;g.fillStyle=col||INK;g.textAlign=al||'center';g.textBaseline='middle';g.fillText(String(s),x,y)}
 function cut(g,s,max,n){g.font=`700 ${q(n)}px system-ui,sans-serif`;const out=[];let cur='';for(const w of s.split(' ')){const t=cur?cur+' '+w:w;if(cur&&g.measureText(t).width>max){out.push(cur);cur=w}else cur=t}out.push(cur);return out}
 function frame(g,r,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();g.strokeStyle=edge;g.lineWidth=lw||2;g.stroke()}
 const hitR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 function cap(g,s,col){const r={x:10,y:8,w:A.W-20,h:A.H*.12};frame(g,r,TOP,PURP,2);const L=cut(g,s,r.w-16,14);L.forEach((l,i)=>word(g,l,A.W/2,r.y+r.h/2+(i-(L.length-1)/2)*q(18),14,col))}
 function foot(g){if(!S.msg)return;const L=cut(g,(S.bad?'✗ ':'✓ ')+S.msg,A.W-40,13),lh=q(13)+5,h=L.length*lh+10,y=A.H-h-6;frame(g,{x:10,y,w:A.W-20,h},BACK,S.bad?NO:OK,3);L.forEach((l,i)=>word(g,l,A.W/2,y+5+lh*(i+.5),13))}
 const announce=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
 const no=s=>{S.bad=true;S.msg=s;A.sound.miss();announce(s);A.redraw()};
 const yes=s=>{S.bad=false;S.msg=s;A.sound.pop()};
 const loop=()=>({x:A.W*.14,y:A.H*.2,w:A.W*.72,h:A.H*.3});
 function circuit(g,label,I,wire){const L=loop();g.strokeStyle=WIREC;g.lineWidth=3;g.strokeRect(L.x,L.y,L.w,L.h);
  if(!A.reduced()&&I>0){const per=2*(L.w+L.h),n=16;g.fillStyle=DOT;for(let k=0;k<n;k++){let d=(S.t*I*60+k*per/n)%per,x,y;if(d<L.w){x=L.x+d;y=L.y}else if((d-=L.w)<L.h){x=L.x+L.w;y=L.y+d}else if((d-=L.h)<L.w){x=L.x+L.w-d;y=L.y+L.h}else{d-=L.w;x=L.x;y=L.y+L.h-d}g.beginPath();g.arc(x,y,3.5,0,7);g.fill()}}
  const bx=L.x,by=L.y+L.h/2;g.fillStyle=BACK;g.fillRect(bx-10,by-16,20,32);g.strokeStyle=INK;g.lineWidth=4;g.beginPath();g.moveTo(bx-10,by-6);g.lineTo(bx+10,by-6);g.stroke();g.lineWidth=2;g.beginPath();g.moveTo(bx-16,by+6);g.lineTo(bx+16,by+6);g.stroke();word(g,label,bx+q(30),by,12,MUTE,'left');
  if(!wire){const rx=L.x+L.w/2;g.fillStyle='#fde68a';g.fillRect(rx-q(30),L.y-q(11),q(60),q(22));g.strokeStyle=INK;g.lineWidth=2;g.strokeRect(rx-q(30),L.y-q(11),q(60),q(22));word(g,`${S.R} Ω`,rx,L.y,12)}
  const ax=L.x+L.w,ay=L.y+L.h/2;g.fillStyle=BACK;g.beginPath();g.arc(ax,ay,q(22),0,7);g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke();word(g,'A',ax,ay-q(8),11,MUTE);word(g,`${fmt(I)} A`,ax,ay+q(7),10,OK)}
 const rBtn=i=>{const gap=8,w=(A.W-20-3*gap)/4;return{x:10+i*(w+gap),y:A.H*.58,w,h:q(38)}};
 function drawSwap(g){const all=S.tried.length>=4;cap(g,all?'Bigger resistance, smaller current: I = 6 V ÷ R.':'6 V cell. Tap a resistor to put it in the circuit.',all?OK:INK);circuit(g,'6 V',6/S.R);
  RS.forEach((r,i)=>{const b=rBtn(i),on=S.R===r;frame(g,b,on?HIT:BACK,on?OK:GRID,2.5);word(g,`${r} Ω`,b.x+b.w/2,b.y+b.h/2,14)});
  word(g,S.tried.map(r=>`${r} Ω → ${fmt(6/r)} A`).join('   '),A.W/2,rBtn(0).y+rBtn(0).h+q(18),A.narrow?10:12,OK)}
 function pickR(r){S.R=r;if(!S.tried.includes(r))S.tried.push(r);S.tried.sort((a,b)=>a-b);A.sound.tick();S.msg='';if(S.tried.length>=4)yes('Double the resistance and the current halves: 3 Ω gives 2 A, 6 Ω gives 1 A.');update()}
 const P=()=>{const x0=q(46),y1=A.H*.21,w=A.W-x0-20,h=A.H*.40;return{x0,y0:y1+h,w,h}};
 const XY=(v,i,vmax,imax)=>{const p=P();return{x:p.x0+v/vmax*p.w,y:p.y0-i/imax*p.h}};
 function axes(g,vmax,imax,vs,is){const p=P();g.lineWidth=1;for(const v of vs){const a=XY(v,0,vmax,imax),b=XY(v,imax,vmax,imax);g.strokeStyle=GRID;g.beginPath();g.moveTo(a.x,a.y);g.lineTo(b.x,b.y);g.stroke();word(g,v,a.x,a.y+q(12),11,MUTE)}
  for(const i of is){const a=XY(0,i,vmax,imax),b=XY(vmax,i,vmax,imax);g.strokeStyle=GRID;g.beginPath();g.moveTo(a.x,a.y);g.lineTo(b.x,b.y);g.stroke();word(g,fmt(i),a.x-q(16),a.y,11,MUTE)}
  word(g,'V (volts) →',p.x0+p.w,p.y0+q(28),11,MUTE,'right');word(g,'I (amps)',p.x0-q(4),p.y0-p.h-q(10),11,MUTE,'left')}
 const vBtn=i=>{const gap=8,w=(A.W-20-3*gap)/4;return{x:10+i*(w+gap),y:A.H*.73,w,h:q(32)}};
 function drawIV(g){const all=S.vs.length>=4;cap(g,all?'A straight line through 0: I is proportional to V.':`${RFIX} Ω resistor. Pick a voltage and plot the current.`,all?OK:INK);axes(g,8,2,[0,2,4,6,8],[0,.5,1,1.5,2]);
  if(all){const a=XY(0,0,8,2),b=XY(8,2,8,2);g.strokeStyle=OK;g.lineWidth=3;g.beginPath();g.moveTo(a.x,a.y);g.lineTo(b.x,b.y);g.stroke()}
  S.vs.forEach(v=>{const p=XY(v,v/RFIX,8,2);g.fillStyle=PURP;g.beginPath();g.arc(p.x,p.y,q(6),0,7);g.fill()});
  if(!all)VS.forEach((v,i)=>{const b=vBtn(i),on=S.vs.includes(v);frame(g,b,on?HIT:BACK,on?OK:GRID,2);word(g,`${v} V`,b.x+b.w/2,b.y+b.h/2,13)})}
 function setV(v){if(S.vs.includes(v))return no(`You already measured ${v} V: ${fmt(v/RFIX)} A. Try another voltage.`);S.vs.push(v);A.sound.tick();S.msg=`${v} V ÷ ${RFIX} Ω = ${fmt(v/RFIX)} A.`;S.bad=false;if(S.vs.length>=4)yes('Twice the voltage, twice the current: a straight line through (0, 0).');update()}
 const tri=()=>{const cx=A.W/2,top=A.H*.18,h=A.H*.3,w=h*1.25;return{cx,top,h,w}};
 const triZone=p=>{const T=tri();if(p.y<T.top||p.y>T.top+T.h)return null;if(p.y<T.top+T.h/2)return'V';return p.x<T.cx?'I':'R'};
 const ansR=i=>{const gap=8,w=(A.W-20-2*gap)/3;return{x:10+i*(w+gap),y:A.H*.7,w,h:q(38)}};
 function drawTri(g){const k=CALC[S.ci];cap(g,k?k[0]:'V = I × R,  I = V ÷ R,  R = V ÷ I',k?INK:OK);const T=tri();
  g.fillStyle='#f5f3ff';g.strokeStyle=PURP;g.lineWidth=3;g.beginPath();g.moveTo(T.cx,T.top);g.lineTo(T.cx+T.w/2,T.top+T.h);g.lineTo(T.cx-T.w/2,T.top+T.h);g.closePath();g.fill();g.stroke();
  g.beginPath();g.moveTo(T.cx-T.w/4,T.top+T.h/2);g.lineTo(T.cx+T.w/4,T.top+T.h/2);g.moveTo(T.cx,T.top+T.h/2);g.lineTo(T.cx,T.top+T.h);g.stroke();
  const at={V:[T.cx,T.top+T.h*.32],I:[T.cx-T.w*.17,T.top+T.h*.77],R:[T.cx+T.w*.17,T.top+T.h*.77]};
  for(const n of ['V','I','R']){const [x,y]=at[n];if(S.cover===n){g.fillStyle='#fde68a';g.beginPath();g.arc(x,y,q(15),0,7);g.fill()}word(g,n,x,y,18,S.cover===n?CU:INK)}
  if(S.cover)word(g,{V:'V = I × R',I:'I = V ÷ R',R:'R = V ÷ I'}[S.cover],A.W/2,T.top+T.h+q(18),15,PURP);
  if(k)k[2].forEach(([t],i)=>{const b=ansR(i);frame(g,b,S.wrong===i?'#fee2e2':BACK,S.wrong===i?NO:GRID,2.5);word(g,t,b.x+b.w/2,b.y+b.h/2,14)})}
 function answer(i){const k=CALC[S.ci];if(!k)return;const tag=k[2][i][1];
  if(tag==='ok'){S.wrong=null;yes(`${k[2][i][0]}: cover ${k[1]} and the triangle gives ${({V:'V = I × R',I:'I = V ÷ R',R:'R = V ÷ I'})[k[1]]}.`);S.ci++;S.cover=null;return update()}
  S.wrong=i;no({div:'You divided R by I. V is on top of the triangle, so multiply: 0.5 × 12 = 6 V.',add:'Do not add amps and ohms. V = I × R = 0.5 × 12 = 6 V.',mul:'Multiplying gives 27, far too big. I = V ÷ R = 9 ÷ 3 = 3 A.',flip:'That is R ÷ V. Current is V ÷ R: 9 ÷ 3 = 3 A.',sub:'Subtracting is not the rule. R = V ÷ I = 12 ÷ 2 = 6 Ω.'}[tag]||'Cover the letter you want in the triangle.')}
 const wireR=()=>({x:A.W*.1,y:A.H*.62,w:A.W*.8});
 function drawWire(g){const t=TARG[S.wi],R=S.cm*WIRE.ohmPerCm,I=R>0?WIRE.V/R:0;cap(g,t!=null?`Slide the clip to make the current ${t} A.`:'Longer wire, more resistance, less current.',t!=null?INK:OK);circuit(g,'3 V',Math.min(I,3),true);
  const W=wireR();g.strokeStyle='#94a3b8';g.lineWidth=5;g.beginPath();g.moveTo(W.x,W.y);g.lineTo(W.x+W.w,W.y);g.stroke();g.strokeStyle=CU;g.lineWidth=5;g.beginPath();g.moveTo(W.x,W.y);g.lineTo(W.x+W.w*S.cm/100,W.y);g.stroke();
  for(let cm=0;cm<=100;cm+=10){const x=W.x+W.w*cm/100;g.strokeStyle=MUTE;g.lineWidth=1;g.beginPath();g.moveTo(x,W.y+6);g.lineTo(x,W.y+12);g.stroke();if(cm%20===0)word(g,cm,x,W.y+q(20),10,MUTE)}
  const cx=W.x+W.w*S.cm/100;g.fillStyle=NO;A.paint.rrect(cx-q(9),W.y-q(22),q(18),q(18),4);g.fill();word(g,'cm',W.x+W.w+q(8),W.y+q(20),10,MUTE,'left');
  word(g,`Length ${S.cm} cm   R = ${fmt(R)} Ω   I = ${R>0?fmt(I):'–'} A`,A.W/2,W.y+q(44),13,INK)}
 function clip(cm){S.cm=Math.max(10,Math.min(100,cm));S.msg='';A.sound.tick();update()}
 function check(){const t=TARG[S.wi];if(t==null)return;const R=S.cm*WIRE.ohmPerCm,I=WIRE.V/R;
  if(Math.abs(I-t)<1e-6){yes(`${S.cm} cm is ${fmt(R)} Ω, and 3 V ÷ ${fmt(R)} Ω = ${t} A.`);S.wi++;return update()}
  no(I>t?`${fmt(I)} A is too much current. Make the wire longer to add resistance.`:`${fmt(I)} A is too little. A shorter wire has less resistance, so more current flows.`)}
 const pick=(p)=>{const vmax=10,imax=2;let best=-1,bd=1e9;LINES.forEach((L,i)=>{for(let v=0;v<=vmax;v+=.25){const I=L[2]?Math.min(imax,.45*Math.sqrt(v)):L[1]*v,pt=XY(v,I,vmax,imax),d=Math.hypot(pt.x-p.x,pt.y-p.y);if(d<bd){bd=d;best=i}}});return bd<q(26)?best:-1};
 function drawSlope(g){const a=ASK[S.si];cap(g,a?a[1]:'On an I–V graph, steeper means LESS resistance.',a?INK:OK);axes(g,10,2,[0,2,4,6,8,10],[0,.5,1,1.5,2]);
  LINES.forEach(([n,k,curved],i)=>{g.strokeStyle=S.found.includes(i)?OK:S.miss===i?NO:['#1d4ed8','#be185d','#b45309'][i];g.lineWidth=S.found.includes(i)?4:3;g.setLineDash(curved?[7,4]:[]);g.beginPath();
   for(let v=0;v<=10;v+=.25){const I=curved?Math.min(2,.45*Math.sqrt(v)):k*v,p=XY(v,I,10,2);v?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y)}g.stroke();g.setLineDash([]);
   if(S.found.includes(i)){const v=curved?9:k>.1?9.5:9.5,I=curved?.45*Math.sqrt(9):k*v,p=XY(v,Math.min(I,1.9),10,2);A.paint.label(n,p.x,p.y-q(12),{bg:'#14532d',col:'#ffffff',align:'right',font:`700 ${q(11)}px system-ui,sans-serif`})}})}
 function tapLine(i){const a=ASK[S.si];if(!a||i<0)return;
  if(i===a[0]){S.miss=null;S.found.push(i);yes(i===0?'Gentle slope: 10 V gives only 0.5 A, so R = 10 ÷ 0.5 = 20 Ω.':i===1?'Steep line: 10 V gives 2 A, so R = 10 ÷ 2 = 5 Ω.':'The curve bends over: as the filament heats up its resistance rises, so it is not ohmic.');S.si++;return update()}
  S.miss=i;no(a[0]===0&&i===1?'That is the steeper line. Steep means lots of current per volt, which is LOW resistance.':a[0]===1&&i===0?'That line is gentle: little current per volt, which is HIGH resistance.':i===2?'The dashed curve is the lamp. Resistors at a steady temperature give straight lines.':'A straight line through 0 has a fixed resistance. Look for the line that bends.')}
 function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#f8fafc',C.dark?.05:.5);g.fillRect(0,0,A.W,A.H);if(C.dark){g.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);g.fill()}
  const v=part();if(v==='swap')drawSwap(g);if(v==='iv')drawIV(g);if(v==='tri')drawTri(g);if(v==='wire')drawWire(g);if(v==='slope')drawSlope(g);
  if(v==='chal'){cap(g,'V = I × R. More resistance, less current.');S.R=6;circuit(g,'6 V',1)}
  foot(g);A.fx.draw(g)}
 function update(){const v=part();let s='Challenge.';
  if(v==='swap')s=`6 volt cell with a ${S.R} ohm resistor: current ${fmt(6/S.R)} amps. Tried ${S.tried.length} of 4 resistors.`;
  if(v==='iv')s=`4 ohm resistor. Measured: ${S.vs.map(x=>`${x} volts gives ${fmt(x/RFIX)} amps`).join(', ')||'nothing yet'}.`;
  if(v==='tri')s=CALC[S.ci]?`${CALC[S.ci][0]} ${S.cover?'Covered '+S.cover+'.':''}`:'All three solved.';
  if(v==='wire')s=TARG[S.wi]!=null?`Target ${TARG[S.wi]} amps. Clip at ${S.cm} cm: ${fmt(S.cm*WIRE.ohmPerCm)} ohms, ${fmt(WIRE.V/(S.cm*WIRE.ohmPerCm))} amps.`:'Both targets hit.';
  if(v==='slope')s=ASK[S.si]?`Graph of current against voltage with three lines. ${ASK[S.si][1]}`:'All three lines found.';
  announce((S.msg?S.msg+' ':'')+s);buttons();S.then()}
 function buttons(){if(!pad)return;pad.innerHTML='';const v=part(),b=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);e.onclick=f};
  if(v==='swap')RS.forEach(r=>b(`${r} Ω`,()=>pickR(r),`Use the ${r} ohm resistor`));
  if(v==='iv'&&S.vs.length<4)VS.forEach(x=>b(`${x} V`,()=>setV(x),`Set ${x} volts and measure`));
  if(v==='tri'&&CALC[S.ci]){['V','I','R'].forEach(n=>b(`Cover ${n}`,()=>{S.cover=n;S.msg='';update()},`Cover ${n} in the triangle`));CALC[S.ci][2].forEach(([t],i)=>b(t,()=>answer(i),`Answer ${t}`))}
  if(v==='wire'&&TARG[S.wi]!=null){b('◀ 10 cm',()=>clip(S.cm-10),'Shorten the wire by 10 centimetres');b('10 cm ▶',()=>clip(S.cm+10),'Lengthen the wire by 10 centimetres');b('Check current',check,'Check if the current hits the target')}
  if(v==='slope'&&ASK[S.si])LINES.forEach(([n],i)=>b(n,()=>tapLine(i),`Choose the ${n} line`));A.redraw()}
 function down(p){const v=part();
  if(v==='swap'){const i=RS.findIndex((_,i)=>hitR(p,rBtn(i)));if(i>=0){pickR(RS[i]);return true}return false}
  if(v==='iv'){const i=VS.findIndex((_,i)=>hitR(p,vBtn(i)));if(i>=0&&S.vs.length<4){setV(VS[i]);return true}return false}
  if(v==='tri'){const z=triZone(p);if(z&&CALC[S.ci]){S.cover=z;S.msg='';update();return true}const i=[0,1,2].find(i=>hitR(p,ansR(i)));if(i!=null&&CALC[S.ci]){answer(i);return true}return false}
  if(v==='wire'){const W=wireR();if(TARG[S.wi]!=null&&Math.abs(p.y-W.y)<q(34)&&p.x>W.x-20&&p.x<W.x+W.w+20){S.drag=true;clip(Math.round((p.x-W.x)/W.w*10)*10);return true}return false}
  if(v==='slope'){const i=pick(p);if(i>=0&&ASK[S.si]){tapLine(i);return true}return false}return false}
 function move(p){if(S.drag){const W=wireR(),cm=Math.max(10,Math.min(100,Math.round((p.x-W.x)/W.w*10)*10));if(cm!==S.cm)clip(cm)}}
 function up(){if(S.drag){S.drag=false;check()}}
 const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
 const run=(fs,gap)=>{const id=++S.run;fs.forEach((f,j)=>setTimeout(()=>{if(id===S.run)f()},j*(A.reduced()?30:gap)))};
 const reset=()=>{S.run=(S.run||0)+1;Object.assign(S,{then:()=>{},R:3,tried:[],vs:[],ci:0,cover:null,wrong:null,cm:30,wi:0,si:0,found:[],miss:null,drag:false,msg:'',bad:false})};
 const steps=[
 {h:'Resistance holds current back',p:'The cell gives 6 V. Tap each resistor and read the ammeter.',
 predict:{q:'Swap a 3 Ω resistor for a 6 Ω one on the same cell. The current…',opts:['halves','doubles','stays the same'],ans:0},
 task:'Try all 4 resistors',show:()=>{steps[0].go();run(RS.map(r=>()=>pickR(r)),400)},go:()=>{reset();update();S.then=finish(0,()=>S.tried.length>=4,'More resistance, less current.')}},
 {h:'Push harder',p:'Keep the 4 Ω resistor. Pick each voltage to plot its current.',
 predict:{q:'Double the voltage across the same resistor. The current…',opts:['doubles','halves','stays the same'],ans:0},
 task:'Plot 4 points',show:()=>{steps[1].go();run(VS.map(x=>()=>setV(x)),400)},go:()=>{reset();update();S.then=finish(1,()=>S.vs.length>=4,'For a resistor, current is proportional to voltage.')}},
 {h:'V = I × R',p:'Tap a letter in the triangle to cover it and see the formula. Then pick the answer.',
 task:'Solve 3',show:()=>{steps[2].go();run(CALC.flatMap(k=>[()=>{S.cover=k[1];update()},()=>answer(k[2].findIndex(x=>x[1]==='ok'))]),450)},go:()=>{reset();update();S.then=finish(2,()=>S.ci>=CALC.length,'Cover what you want: V = IR, I = V/R, R = V/I.')}},
 {h:'Longer wire, more resistance',p:'This wire has 0.1 Ω per cm and a 3 V cell. Drag the red clip, or use the buttons.',
 predict:{q:'Move the clip to use a longer piece of wire. Its resistance…',opts:['goes up','goes down','stays the same'],ans:0},
 task:'Hit 2 target currents',show:()=>{steps[3].go();run([()=>clip(60),check,()=>clip(20),check],450)},go:()=>{reset();update();S.then=finish(3,()=>S.wi>=TARG.length,'Resistance grows with length: 60 cm is 6 Ω, 20 cm is 2 Ω.')}},
 {h:'Read the slope',p:'Each line shows current against voltage. Tap a line, or use the buttons.',
 predict:{q:'On a graph of current against voltage, the steeper line has…',opts:['less resistance','more resistance','the same resistance'],ans:0},
 task:'Find 3 lines',show:()=>{steps[4].go();run(ASK.map(a=>()=>tapLine(a[0])),450)},go:()=>{reset();update();S.then=finish(4,()=>S.si>=ASK.length,'Steep means low resistance; a curve means it changes.')}},
 {h:'Challenge',p:'',go:()=>{reset();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.then()});
 const Q=[['A 9 V cell drives current through an 18 Ω resistor. What is the current?','0.5 A',[['2 A','flip'],['162 A','times']]],
 ['A resistor carries 0.2 A with 4 V across it. What is its resistance?','20 Ω',[['0.8 Ω','times'],['0.05 Ω','flipR']]],
 ['Which unit is resistance measured in?','ohms (Ω)',[['amps (A)','unitI'],['volts (V)','unitV']]],
 ['You double the length of a resistance wire on the same cell. The current…','halves',[['doubles','length'],['stays the same','same']]],
 ['On an I–V graph, line X is steeper than line Y. Which has more resistance?','Y',[['X','steep'],['They are the same','same']]]];
 function tip(tag){let m='Write V = I × R, cover the letter you want, then put the numbers in.';
  if(tag==='flip')m='That is R ÷ V. Current is V ÷ R: 9 ÷ 18 = 0.5 A.';
  if(tag==='times')m='Multiplying the two values is only right when you want V. Use the triangle.';
  if(tag==='flipR')m='That is I ÷ V. Resistance is V ÷ I: 4 ÷ 0.2 = 20 Ω.';
  if(tag==='unitI')m='Amps measure current. Resistance is in ohms, Ω.';
  if(tag==='unitV')m='Volts measure potential difference. Resistance is in ohms, Ω.';
  if(tag==='length')m='A longer wire has more resistance, so less current flows, not more.';
  if(tag==='same')m='Resistance changed, so the current changes too: I = V ÷ R.';
  if(tag==='steep')m='Steep means more current for each volt, so LESS resistance. Y has more.';
  return m}
 let qn=-1,row=0;
 function ask(){qn++;const [qq,ans,bad]=Q[qn%Q.length],all=[[ans,'ok']].concat(bad),r=qn%3,order=all.slice(r).concat(all.slice(0,r));
  chal.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const rw=chal.querySelector('.fl-pick');order.forEach(([w,tag])=>{const e=c.el('button',{type:'button',class:'lbtn'},rw,w);e.onclick=()=>mark(tag,ans)});announce('Challenge: '+qq);A.redraw()}
 function mark(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=chal.querySelector('.fl-fb');
  if(ok){row++;A.win()}else{row=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+row+'.':'✗ '+tip(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
  init:A=>{S.t=0;A.every(dt=>{const v=part();if(A.reduced()||(v!=='swap'&&v!=='wire'))return false;S.t+=dt;return true});const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}});
 A.start()})})();
