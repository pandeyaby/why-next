/* Flagship 24 – equivalent expressions. Two expression cards, A and B, sit above a number line. The learner drags the x
   marker (or taps a value, or uses the buttons) and presses Test: both cards show the substitution and the value, and a
   chip for that x drops into the record strip, green if A and B agree and red if they differ. Matching once is not
   proof: 2x + 4 and x + 6 agree at x = 2 and nowhere else, and 2x + 3 agrees with 5x only at x = 1. Proof comes from
   tapping a card to simplify it one line at a time until both cards reach the same form. Predictions target "they
   matched once, so they are equivalent", "2x + 3 is 5x" and "testing values proves it". Challenge: decide whether a
   pair is equivalent and, if not, give a counter-example; feedback names the slip. */
(()=>{
 // a linear expression: its written form, the lines of its simplification, and its simplest form a·x + b
 const X=(s,a,b,chain)=>({s,a,b,chain:chain||[]});
 const val=(e,v)=>e.a*v+e.b;
 const neg=n=>String(n).replace('-','−');
 function form(a,b){const xs=a===0?'':(a===1?'x':a===-1?'−x':neg(a)+'x');if(!xs)return neg(b);return b===0?xs:xs+(b<0?' − ':' + ')+Math.abs(b)}
 // put a value in for x: 3x → 3×(−2), x + 2 → (−2) + 2
 function subIn(s,v){const vv=v<0?'('+neg(v)+')':String(v);return s.replace(/(\d)x/g,'$1×'+vv).replace(/x/g,vv)}
 const same=P=>P.A.a===P.B.a&&P.A.b===P.B.b;
 function matchAt(P){if(P.A.a===P.B.a)return null;const k=(P.B.b-P.A.b)/(P.A.a-P.B.a);return Number.isInteger(k)?k:null}
 const pair=(A,B)=>({A,B});
VIS.reg('flagequiv',c=>{let A,ctl,read,sand,chal;const zones=[];
 const st={P:null,x:1,rec:[],sA:0,sB:0,simp:false,lock:false,showing:false,chk:()=>{},won:false,run:0,drag:false,pulse:0};
 const tell=t=>{c.say(t);if(read)read.textContent=t};
 const lo=-5,hi=5;
 function load(P,simp){st.P=P;st.rec=[];st.sA=0;st.sB=0;st.simp=!!simp;st.won=false;st.run++;st.drag=false;st.x=1;sync()}
 // test the current x on both cards and record the result
 function test(v){if(v==null)v=st.x;v=Math.max(lo,Math.min(hi,Math.round(v)));st.x=v;const P=st.P,a=val(P.A,v),b=val(P.B,v),ok=a===b;
  st.rec=st.rec.filter(r=>r.x!==v).concat({x:v,ok});if(st.rec.length>7)st.rec.shift();st.pulse=1;A.tween(st,{pulse:0},700,'out');
  ok?A.sound.pop():A.sound.miss();
  tell(`x = ${neg(v)}: A = ${subIn(P.A.s,v)} = ${neg(a)}, B = ${subIn(P.B.s,v)} = ${neg(b)}. ${ok?'Same value.':'Different values, so A and B are not equivalent.'}`);sync();st.chk()}
 // one more line of simplification on card A or B
 function simplify(w){if(!st.simp||(st.lock&&!st.showing))return;const e=st.P[w],k=w==='A'?'sA':'sB';if(st[k]>=e.chain.length){tell(`${w} is already as simple as it gets: ${form(e.a,e.b)}.`);return}
  st[k]++;A.sound.tick();const line=e.chain[st[k]-1];let m=`${w}: ${e.s} = ${line}.`;
  if(fullySimple())m+=same(st.P)?` Both cards now read ${form(st.P.A.a,st.P.A.b)}, so A and B are equal for every x.`:` The simplest forms differ, so A and B are not equivalent.`;
  tell(m);sync();st.chk()}
 const fullySimple=()=>st.sA>=st.P.A.chain.length&&st.sB>=st.P.B.chain.length;
 const misses=()=>st.rec.filter(r=>!r.ok).length;
 function play(list,fin){st.showing=true;const id=++st.run;let j=0;const step=()=>{if(id!==st.run)return;if(j>=list.length){st.showing=false;st.chk();fin&&fin();return}
   const o=list[j++];if(o==='A'||o==='B')simplify(o);else{st.x=o;test(o)}A.tween({k:0},{k:1},650,'io',step)};step()}
 function describe(){const P=st.P;if(!P)return'';const r=st.rec.map(q=>`x = ${neg(q.x)} ${q.ok?'same':'different'}`).join(', ');
  return `Card A: ${P.A.s}${st.sA?' = '+P.A.chain[st.sA-1]:''}. Card B: ${P.B.s}${st.sB?' = '+P.B.chain[st.sB-1]:''}. The x marker is at ${neg(st.x)}. Tested: ${r||'nothing yet'}.`}
 function sync(){if(!A)return;A.cv.setAttribute('aria-label',describe());if(ctl){ctl.innerHTML='';const b=(t,aria,f,off)=>{const z=c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':aria},ctl,t);z.disabled=!!off;z.onclick=f};
   b('x − 1','Move x down by one',()=>{st.x=Math.max(lo,st.x-1);sync()},st.x<=lo);b('x + 1','Move x up by one',()=>{st.x=Math.min(hi,st.x+1);sync()},st.x>=hi);
   b('Test x = '+neg(st.x),'Put x = '+neg(st.x)+' into both expressions',()=>test());
   if(st.simp){const off=st.lock&&!st.showing;b('Simplify A','Simplify card A by one line',()=>simplify('A'),off||st.sA>=st.P.A.chain.length);b('Simplify B','Simplify card B by one line',()=>simplify('B'),off||st.sB>=st.P.B.chain.length)}}
  A.redraw()}
 // ---------- drawing: two cards, the number line with its marker, the record strip ----------
 function fit(ctx,s,px,w,weight){let f=px;ctx.font=`${weight} ${f}px system-ui`;while(f>11&&ctx.measureText(s).width>w){f--;ctx.font=`${weight} ${f}px system-ui`}return f}
 function card(A,e,w,x0,y0,cw,chh,col,sIdx){const{ctx,col:C,paint:P}=A;P.shadow(8,2,.18);ctx.fillStyle=A.mix(C.pn,col,.1);P.rrect(x0,y0,cw,chh,12);ctx.fill();P.noShadow();
  ctx.strokeStyle=A.alpha(col,.7);ctx.lineWidth=2;P.rrect(x0,y0,cw,chh,12);ctx.stroke();zones.push({x:x0,y:y0,w:cw,h:chh,card:w});
  ctx.textAlign='left';ctx.textBaseline='alphabetic';ctx.fillStyle=col;ctx.font='800 13px system-ui';ctx.fillText(w,x0+10,y0+18);
  const big=A.narrow?19:27;let y=y0+20+big;fit(ctx,e.s,big,cw-24,'700');ctx.fillStyle=C.tx;ctx.fillText(e.s,x0+12,y);
  for(let i=0;i<sIdx;i++){const line='= '+e.chain[i];y+=A.narrow?19:24;fit(ctx,line,A.narrow?15:19,cw-24,'600');ctx.fillStyle=i===e.chain.length-1?C.gr:A.alpha(C.tx,.8);ctx.fillText(line,x0+12,y)}
  if(st.simp&&sIdx<e.chain.length&&!(st.lock&&!st.showing)){ctx.font='600 11px system-ui';ctx.fillStyle=C.mu;ctx.fillText('tap to simplify',x0+12,y0+chh-34)}
  const last=st.rec.length?st.rec[st.rec.length-1]:null;
  if(last&&last.x===st.x){const s=`${subIn(e.s,st.x)} = ${neg(val(e,st.x))}`;fit(ctx,s,A.narrow?14:17,cw-24,'600');ctx.fillStyle=last.ok?C.gr:C.rd;ctx.fillText(s,x0+12,y0+chh-12)}}
 function draw(A){const{ctx,W,H,col:C,paint:P}=A;zones.length=0;ctx.fillStyle=P.lin(0,0,0,H,[[0,A.mix(C.pn,C.vi,.05)],[1,C.pn]]);ctx.fillRect(0,0,W,H);if(!st.P)return;
  const gap=12,cw=(W-gap*3)/2,chh=Math.round(H*.44);card(A,st.P.A,'A',gap,10,cw,chh,C.vi,st.sA);card(A,st.P.B,'B',gap*2+cw,10,cw,chh,C.cy,st.sB);
  // verdict between the cards and the line
  const last=st.rec.length?st.rec[st.rec.length-1]:null,vy=chh+30;ctx.textAlign='center';
  if(st.simp&&fullySimple()&&(st.sA+st.sB>0)){ctx.font=`700 ${A.narrow?13:15}px system-ui`;ctx.fillStyle=same(st.P)?C.gr:C.rd;ctx.fillText(same(st.P)?'Same simplest form: equivalent for every x ✓':'Different simplest forms: not equivalent',W/2,vy)}
  else if(last){ctx.font='700 15px system-ui';ctx.fillStyle=last.ok?C.gr:C.rd;ctx.fillText(last.ok?`x = ${neg(last.x)}: both ${neg(val(st.P.A,last.x))}`:`x = ${neg(last.x)}: ${neg(val(st.P.A,last.x))} ≠ ${neg(val(st.P.B,last.x))}`,W/2,vy)}
  // number line
  const ly=Math.round(H*.7),x0=28,x1=W-28,px=v=>x0+(v-lo)/(hi-lo)*(x1-x0);ctx.strokeStyle=C.tx;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x0-8,ly);ctx.lineTo(x1+8,ly);ctx.stroke();
  ctx.font='600 12px system-ui';for(let v=lo;v<=hi;v++){const r=st.rec.find(q=>q.x===v);ctx.strokeStyle=C.tx;ctx.beginPath();ctx.moveTo(px(v),ly-5);ctx.lineTo(px(v),ly+5);ctx.stroke();
   ctx.fillStyle=r?(r.ok?C.gr:C.rd):C.mu;ctx.fillText(neg(v),px(v),ly+20);if(r){ctx.beginPath();ctx.arc(px(v),ly,4,0,7);ctx.fill()}}
  zones.push({x:0,y:ly-26,w:W,h:52,line:true,px,inv:p=>lo+(p-x0)/(x1-x0)*(hi-lo)});
  const mx=st.drag?Math.max(x0,Math.min(x1,st.dragX)):px(st.x);P.shadow(8,2,.25);ctx.fillStyle=C.am;ctx.beginPath();ctx.moveTo(mx,ly-6);ctx.lineTo(mx-11,ly-24);ctx.lineTo(mx+11,ly-24);ctx.closePath();ctx.fill();P.noShadow();
  ctx.fillStyle='#111';ctx.font='800 11px system-ui';ctx.fillText('x',mx,ly-13);
  if(!st.rec.length&&!st.lock)P.label('drag the marker, then Test',W/2,ly-38,{font:'600 12px system-ui',bg:A.alpha(C.am,.92),col:'#111'});
  // record strip
  const ry=Math.round(H*.9);let rx=14;ctx.textAlign='left';ctx.font='700 12px system-ui';ctx.fillStyle=C.mu;ctx.fillText('Tested:',rx,ry+4);rx+=ctx.measureText('Tested: ').width;
  st.rec.forEach(r=>{const s=`${neg(r.x)} ${r.ok?'✓':'✗'}`,w=ctx.measureText(s).width+14;if(rx+w>W-6)return;ctx.fillStyle=A.alpha(r.ok?C.gr:C.rd,.18);P.rrect(rx,ry-11,w,22,10);ctx.fill();ctx.fillStyle=r.ok?C.gr:C.rd;ctx.fillText(s,rx+7,ry+4);rx+=w+6});
  ctx.textAlign='left'}
 // ---------- steps ----------
 const fresh=(P,simp)=>{st.chk=()=>{};st.lock=false;st.showing=false;load(P,simp);if(read)read.textContent=''};
 const goal=(i,ok,msg)=>()=>{if(A.extra.querySelector('.fl-task')&&ok())A.done(msg+A.reveal(i))};
 const P0=pair(X('3(x + 2)',3,6,['3x + 6']),X('3x + 6',3,6)),P1=pair(X('2(x + 3)',2,6,['2x + 6']),X('2x + 3',2,3)),P2=pair(X('2x + 4',2,4),X('x + 6',1,6));
 const P3=pair(X('2x + 3',2,3),X('5x',5,0)),P4=pair(X('4x + 2 − x + 1',3,3,['4x − x + 2 + 1','3x + 3']),X('3(x + 1)',3,3,['3x + 3']));
 const steps=[
  {h:'Same value, every time',p:'Two expressions are equivalent when they give the same value for every x. Put the same x into both cards and compare.',
   predict:{q:'Will 3(x + 2) and 3x + 6 ever give different values?',opts:['Yes, for big values of x','No, never','Yes, for negative x'],ans:1},
   task:'Test three different values of x',show:()=>play([1,4,-2].filter(v=>!st.rec.some(r=>r.x===v))),
   go:()=>{fresh(P0);st.chk=goal(0,()=>st.rec.length>=3&&!misses(),'Every test matched. 3(x + 2) multiplies out to 3x + 6, so they match for every x, negative values too.')}},
  {h:'One difference is enough',p:'If A and B differ for even one value of x, they are not equivalent. That one value is called a counter-example.',
   predict:{q:'Are 2(x + 3) and 2x + 3 equivalent?',opts:['Yes, they use the same numbers','No, they never match','Only when x is 0'],ans:1},
   task:'Find a value of x where A and B differ',show:()=>play([0]),
   go:()=>{fresh(P1);st.chk=goal(1,()=>misses()>0,'2(x + 3) is 2x + 6, so it is always 3 more than 2x + 3. Any x is a counter-example.')}},
  {h:'One match is not proof',p:'2x + 4 and x + 6 both give 8 when x = 2. Test more values before you decide.',
   predict:{q:'They agree at x = 2. Are 2x + 4 and x + 6 equivalent?',opts:['Yes, they matched','No, test another x','Only for even x'],ans:1},
   task:'Test x = 2, then find a value where they differ',show:()=>play([2,5].filter(v=>!st.rec.some(r=>r.x===v))),
   go:()=>{fresh(P2);st.chk=goal(2,()=>misses()>0&&st.rec.some(r=>r.ok),'They match only at x = 2. At x = 5, 2x + 4 = 14 but x + 6 = 11. One match proves nothing.')}},
  {h:'Unlike terms stay apart',p:'2x + 3 has an x term and a number term. They cannot be added together into one term.',
   predict:{q:'Is 2x + 3 the same as 5x?',opts:['Yes, 2 + 3 = 5','No, they match only at x = 1','Yes, for every x'],ans:1},
   task:'Test x = 1, then try another value',show:()=>play([1,3].filter(v=>!st.rec.some(r=>r.x===v))),
   go:()=>{fresh(P3);st.chk=goal(3,()=>misses()>0&&st.rec.some(r=>r.ok),'At x = 1 both give 5, by luck. At x = 3, 2x + 3 = 9 but 5x = 15. 2x + 3 stays as it is.')}},
  {h:'Prove it by simplifying',p:'Testing can show two expressions are different, but it cannot check every x. To prove they are the same, simplify both.',
   predict:{q:'How can you be sure 4x + 2 − x + 1 always equals 3(x + 1)?',opts:['Test x = 1 and x = 2','Simplify both to the same form','Test x = 100'],ans:1},
   task:'Tap each card to simplify it until both are as simple as they go',show:()=>play(['A','A','B']),
   go:()=>{fresh(P4,true);st.chk=goal(4,()=>fullySimple(),'Both become 3x + 3. The same simplest form means the same value for every x, with no testing needed.')}},
  {h:'Sandbox',p:'Pick a pair. Hunt for a counter-example by testing, or simplify both cards to prove they are equivalent.',go:()=>fresh(SAND[si],true)},
  {h:'Challenge',p:'',go:()=>newChal()}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>st.chk()});
 const SAND=[P4,pair(X('x + x + x',3,0,['3x']),X('3x',3,0)),pair(X('5(x − 1)',5,-5,['5x − 5']),X('5x − 1',5,-1)),pair(X('x + 7 − 2x',-1,7,['x − 2x + 7','−x + 7']),X('7 − x',-1,7,['−x + 7'])),
  pair(X('2(x + 1) + 3',2,5,['2x + 2 + 3','2x + 5']),X('2x + 5',2,5)),pair(X('4x − 3',4,-3),X('x + 3',1,3))];let si=0;
 A=FK.shell(c,{steps,ratio:.56,tall:.98,draw,onStep:A=>{chal.hidden=A.step!==6;sand.hidden=A.step!==5;sync()},
  init:A=>{const E=c.el,box=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},box);
   ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Choose and test a value of x'},box);
   sand=E('div',{class:'fl-ctl',role:'group','aria-label':'Choose the pair'},box);
   const nb=E('button',{type:'button',class:'lbtn sm ghost'},sand,'Next pair');nb.onclick=()=>{si=(si+1)%SAND.length;load(SAND[si],true);tell(`New pair: A is ${st.P.A.s}, B is ${st.P.B.s}.`)};
   chal=E('div',{class:'fl-chal'},A.below);
   const inZ=(p,z)=>p.x>=z.x&&p.x<=z.x+z.w&&p.y>=z.y&&p.y<=z.y+z.h;
   A.gest({down:p=>{const z=zones.find(q=>inZ(p,q));if(!z)return false;if(z.card){simplify(z.card);return false}
     st.lineZ=z;st.drag=true;st.dragX=p.x;A.redraw();return true},
    move:p=>{st.dragX=p.x;st.x=Math.max(lo,Math.min(hi,Math.round(st.lineZ.inv(p.x))));A.redraw()},
    up:p=>{st.drag=false;if(p&&st.lineZ)st.x=Math.max(lo,Math.min(hi,Math.round(st.lineZ.inv(p.x))));test(st.x)}});
   sync()}});
 // ---------- challenge: equivalent or not, with a counter-example ----------
 const CH=[pair(X('4(x + 1)',4,4),X('4x + 4',4,4)),pair(X('3x + 5',3,5),X('8x',8,0)),pair(X('2(x − 1)',2,-2),X('2x − 1',2,-1)),pair(X('x + 9',1,9),X('3x + 1',3,1)),
  pair(X('6x − 2x + 1',4,1),X('4x + 1',4,1)),pair(X('5(x + 2) − 3',5,7),X('5x + 7',5,7)),pair(X('3(x + 4)',3,12),X('3x + 4',3,4)),pair(X('x + x',2,0),X('2x',2,0))];let qi=-1;
 function newChal(){qi=(qi+1)%CH.length;st.chk=()=>{};st.lock=true;st.showing=false;load(CH[qi],false);if(read)read.textContent='';
  chal.innerHTML=`<p><b>Is A = ${st.P.A.s} equivalent to B = ${st.P.B.s}?</b> Test values above if you like. If they are not, give a counter-example.</p><div class="fl-ctl"><button type="button" class="lbtn sm" data-v="eq">Equivalent</button> <label>Counter-example x = <input type="text" inputmode="numeric" class="fl-in" autocomplete="off" aria-label="counter-example value of x"></label> <button type="button" class="lbtn sm" data-v="not">Not equivalent</button></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  chal.querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>judge(b.dataset.v));sync()}
 // "4(x + 1) = 4x + 4, and B is already 4x + 4" – only rewrite a card that is not already in its simplest form
 function simplest(P){const one=(w,e)=>e.s===form(e.a,e.b)?`${w} is already ${e.s}`:`${w}: ${e.s} = ${form(e.a,e.b)}`;return one('A',P.A)+'; '+one('B',P.B)}
 function judge(pick){const fb=chal.querySelector('.fl-fb'),P=st.P;if(st.won)return;const raw=chal.querySelector('.fl-in').value.replace(/[−–]/g,'-').trim(),v=raw===''?null:Number(raw);
  const eq=same(P),simple=simplest(P);let m;
  if(pick==='not'&&(v==null||!Number.isFinite(v))){fb.textContent='Type a value of x where A and B give different answers, then press Not equivalent.';return}
  const right=pick==='eq'?eq:!eq&&val(P.A,v)!==val(P.B,v);
  if(right){st.won=true;fb.innerHTML=(eq?`✓ ${simple}: the same simplest form, so equal for every x.`:`✓ At x = ${neg(v)}, A = ${neg(val(P.A,v))} but B = ${neg(val(P.B,v))}. One counter-example is enough.`)+' <button type="button" class="linkish">Another →</button>';
   A.win();fb.querySelector('button').onclick=newChal;if(!eq&&Number.isInteger(v)&&v>=lo&&v<=hi)test(v);return}
  A.sound.miss();const k=matchAt(P);
  if(pick==='eq'&&P.B.b===0&&P.A.a+P.A.b===P.B.a)m=`${P.A.s} is not ${P.B.s}: the x term and the number term are unlike terms, so they do not combine. They agree only at x = 1; try x = 2.`;
  else if(pick==='eq'&&k!=null)m=`They do agree at x = ${neg(k)}, but one match proves nothing. Try x = ${neg(k+1)}: A = ${neg(val(P.A,k+1))}, B = ${neg(val(P.B,k+1))}.`;
  else if(pick==='eq')m=`Test any x. At x = 0, A = ${neg(val(P.A,0))} but B = ${neg(val(P.B,0))}. Simplify both: ${simple}.`;
  else if(eq)m=`At x = ${neg(v)} both give ${neg(val(P.A,v))}, and they always will: ${simple}. No counter-example exists.`;
  else m=`At x = ${neg(v)} both give ${neg(val(P.A,v))}. That is the one value where they happen to agree, so it is not a counter-example. Try another x.`;
  fb.textContent=m}
 A.start()})})();
