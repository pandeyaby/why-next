/* Flagship – complex conjugates and division (ages 16–18; Edexcel 9FM0 Core Pure 2, AQA 7367 B). Scenes: drag z and
   watch z* mirror it in the real axis, use z + z* and z − z* to pin down z, hunt lattice points on the circle where
   zz* = 25, divide (5 + 5i) by (1 + 2i) by realising the denominator in four taps, then drag w until z ÷ w = i while
   the moduli divide and the arguments subtract. Points snap to the integer lattice; every drag has step buttons.
   Data in learn/cxdiv_art.js. */
(()=>{const {T0,T1,K25,STAGES,ZQ,WANT,DESC,DONE,QS}=CXD;
VIS.reg('flagcxdiv',c=>{let A,pad,quiz,qi=-1,run=0;const V={};
const INKD='#111827',YES='#15803d',NO='#b91c1c',RIM='#6b7280',SANS=' system-ui,sans-serif',R=6;let ZC='#1d4ed8',SC='#a21caf',WC='#c2410c',QC='#0f766e';
const part=()=>['mirror','sumdif','norm','realise','divide','quiz'][A.step];
const sz=n=>A.narrow?n:Math.round(n*1.1);
const within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const ink=()=>A.col.dark?'#e5e7eb':INKD;
function ground(){const g=A.ctx,dk=A.col.dark;ZC=dk?'#93c5fd':'#1d4ed8';SC=dk?'#f0abfc':'#a21caf';WC=dk?'#fdba74':'#c2410c';QC=dk?'#5eead4':'#0f766e';g.fillStyle=A.mix(A.col.pn,'#f1f5f9',A.col.dark?.05:.5);g.fillRect(0,0,A.W,A.H)}
function write(t,x,y,n,col,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${sz(n)}px${SANS}`;g.fillStyle=col||ink();g.textAlign=o.al||'center';g.textBaseline='middle';g.fillText(t,x,y)}
function pill(t,y,ok){const g=A.ctx;let n=sz(13);g.font=`800 ${n}px${SANS}`;let w=g.measureText(t).width+24;while(w>A.W-6&&n>10){n--;g.font=`800 ${n}px${SANS}`;w=g.measureText(t).width+24}
 const h=n+14;g.fillStyle='#ffffff';A.paint.rrect((A.W-w)/2,y-h/2,w,h,7);g.fill();g.lineWidth=ok?3:1.4;g.strokeStyle=ok?YES:RIM;g.stroke();g.fillStyle=INKD;g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y+1)}
/* ---- Argand plane ---- */
function plane(){const s=Math.min(A.W-16,A.H*.66),x0=(A.W-s)/2,y0=A.H*.11;return{x0,y0,s,u:s/(2*R),cx:x0+s/2,cy:y0+s/2}}
const toPx=(P,a,b)=>({x:P.cx+a*P.u,y:P.cy-b*P.u});
const fromPx=(P,p)=>({a:Math.max(-R,Math.min(R,Math.round((p.x-P.cx)/P.u))),b:Math.max(-R,Math.min(R,Math.round((P.cy-p.y)/P.u)))});
function axes(P){const g=A.ctx;g.fillStyle=A.col.dark?'#1f2937':'#ffffff';g.fillRect(P.x0,P.y0,P.s,P.s);g.strokeStyle=A.col.dark?'#374151':'#e5e7eb';g.lineWidth=1;
 for(let k=-R;k<=R;k++){const q=toPx(P,k,k);g.beginPath();g.moveTo(q.x,P.y0);g.lineTo(q.x,P.y0+P.s);g.moveTo(P.x0,q.y);g.lineTo(P.x0+P.s,q.y);g.stroke()}
 g.strokeStyle=ink();g.lineWidth=1.8;g.beginPath();g.moveTo(P.x0,P.cy);g.lineTo(P.x0+P.s,P.cy);g.moveTo(P.cx,P.y0);g.lineTo(P.cx,P.y0+P.s);g.stroke();
 write('Re',P.x0+P.s-12,P.cy+12,11);write('Im',P.cx+14,P.y0+10,11);[-5,5].forEach(k=>{write(k<0?'−'+(-k):String(k),toPx(P,k,0).x,P.cy+11,10);write(k<0?'−'+(-k)+'i':k+'i',P.cx-14,toPx(P,0,k).y,10)})}
function arrow(P,a,b,col,lab,o){o=o||{};const g=A.ctx,q=toPx(P,a,b);g.strokeStyle=col;g.lineWidth=o.thin?2:3;if(o.dash)g.setLineDash([6,5]);g.beginPath();g.moveTo(P.cx,P.cy);g.lineTo(q.x,q.y);g.stroke();g.setLineDash([]);
 g.fillStyle=col;g.beginPath();g.arc(q.x,q.y,o.handle?11:5,0,7);g.fill();if(o.handle){g.strokeStyle='#ffffff';g.lineWidth=2;g.stroke()}
 if(lab){const dx=a>=0?14:-14,al=a>=0?'left':'right';g.font=`800 ${sz(12)}px${SANS}`;const w=g.measureText(lab).width+8;const bx=al==='left'?q.x+dx-4:q.x+dx-w+4;
  g.fillStyle=A.col.dark?'#111827':'#ffffff';g.globalAlpha=.9;g.fillRect(Math.max(2,Math.min(A.W-w-2,bx)),q.y-18-9,w,18);g.globalAlpha=1;write(lab,Math.max(2,Math.min(A.W-w-2,bx))+w/2,q.y-18,12,col,{w:800})}}
const cstr=(a,b)=>{const f=v=>Number.isInteger(v)?String(Math.abs(v)):String(Math.abs(Math.round(v*100)/100));if(b===0)return (a<0?'−':'')+f(a);if(a===0)return (b<0?'−':'')+(Math.abs(b)===1?'':f(b))+'i';return (a<0?'−':'')+f(a)+(b<0?' − ':' + ')+(Math.abs(b)===1?'':f(b))+'i'};
/* ---- scenes on the plane ---- */
function drawMirror(){const P=plane(),z=V.z,g=A.ctx;ground();axes(P);const hit=z.a===T0.a&&-z.b===T0.b;
 g.strokeStyle=SC;g.setLineDash([3,4]);g.lineWidth=1.5;const q=toPx(P,z.a,z.b),q2=toPx(P,z.a,-z.b);g.beginPath();g.moveTo(q.x,q.y);g.lineTo(q2.x,q2.y);g.stroke();g.setLineDash([]);
 arrow(P,z.a,-z.b,SC,'z* = '+cstr(z.a,-z.b),{dash:1});arrow(P,z.a,z.b,ZC,'z = '+cstr(z.a,z.b),{handle:1});
 pill(hit?'z* = 2 − 3i: found it':'Drag z until z* = 2 − 3i',A.H*.05,hit);write(`z = ${cstr(z.a,z.b)}   z* = ${cstr(z.a,-z.b)}`,A.W/2,A.H*.83,14)}
function drawSumdif(){const P=plane(),z=V.z;ground();axes(P);const s=2*z.a,d=2*z.b,hit=s===T1.sum&&d===T1.dif;
 if(Math.abs(s)<=R)arrow(P,s,0,QC,'z + z* = '+cstr(s,0),{thin:1});else write('z + z* = '+cstr(s,0)+' (off the grid)',A.W/2,A.H*.9,12,QC);
 if(Math.abs(d)<=R)arrow(P,0,d,WC,'z − z* = '+cstr(0,d),{thin:1});else write('z − z* = '+cstr(0,d)+' (off the grid)',A.W/2,A.H*.94,12,WC);
 arrow(P,z.a,-z.b,SC,'z*',{dash:1});arrow(P,z.a,z.b,ZC,'z',{handle:1});
 pill(hit?'z = 3 + 2i':'Target: z + z* = 6 and z − z* = 4i',A.H*.05,hit);write(`z + z* = ${cstr(s,0)}    z − z* = ${cstr(0,d)}`,A.W/2,A.H*.83,14)}
function drawNorm(){const P=plane(),z=V.z,g=A.ctx,n=z.a*z.a+z.b*z.b;ground();axes(P);
 g.strokeStyle=A.col.dark?'#9ca3af':RIM;g.setLineDash([4,4]);g.lineWidth=1.5;g.beginPath();g.arc(P.cx,P.cy,5*P.u,0,7);g.stroke();g.setLineDash([]);write('|z| = 5',toPx(P,4.6,-5.4).x,toPx(P,4.6,-5.4).y,11);
 V.found.forEach(([a,b])=>{const q=toPx(P,a,b);g.fillStyle=YES;g.beginPath();g.arc(q.x,q.y,6,0,7);g.fill()});
 arrow(P,z.a,-z.b,SC,'',{dash:1,thin:1});arrow(P,z.a,z.b,ZC,'z',{handle:1});const k=V.found.length;
 pill(k>=3?'3 points with zz* = 25':`Find 3 points with zz* = 25 (${k} of 3)`,A.H*.05,k>=3);write(`zz* = ${z.a<0?'(−'+(-z.a)+')':z.a}² + ${z.b<0?'(−'+(-z.b)+')':z.b}² = ${n}`,A.W/2,A.H*.83,14,n===25?YES:ink(),{w:800})}
/* ---- realise the denominator ---- */
const optR=n=>{const cols=n>3?2:3,gap=8,w=Math.min(190,(A.W-16-gap*(cols-1))/cols),h=Math.min(A.H*.13,56),x0=(A.W-(w*cols+gap*(cols-1)))/2;return Array.from({length:n},(_,i)=>({i,x:x0+(i%cols)*(w+gap),y:A.H*.56+Math.floor(i/cols)*(h+gap),w,h}))};
function drawRealise(){const s=V.st,g=A.ctx;ground();const done=s.k>=STAGES.length;
 pill(done?'(5 + 5i) ÷ (1 + 2i) = 3 − i':`Step ${s.k+1} of 4`,A.H*.05,done);
 write('5 + 5i',A.W/2,A.H*.17,sz(17),ink(),{w:800});g.strokeStyle=ink();g.lineWidth=2;g.beginPath();g.moveTo(A.W/2-70,A.H*.22);g.lineTo(A.W/2+70,A.H*.22);g.stroke();write('1 + 2i',A.W/2,A.H*.27,sz(17),ink(),{w:800});
 s.log.forEach((t,j)=>write(t,A.W/2,A.H*(.35+j*.05),12,YES,{w:800}));
 if(done)return;const S=STAGES[s.k];write(S.q,A.W/2,A.H*.51,13,ink(),{w:800});
 optR(S.opts.length).forEach(r=>{g.fillStyle=s.bad===r.i?'#fee2e2':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();g.lineWidth=s.bad===r.i?3:1.4;g.strokeStyle=s.bad===r.i?NO:RIM;g.stroke();write(S.opts[r.i][0],r.x+r.w/2,r.y+r.h/2,15,INKD,{w:800})})}
function choose(j){const s=V.st;if(s.k>=STAGES.length)return;const O=STAGES[s.k].opts[j];
 if(!O[1]){s.bad=j;A.sound.miss();return speak(O[2])}s.bad=-1;s.log.push(STAGES[s.k].q.replace('…',' ').replace(/=$/,'= ')+O[0]);s.k++;A.sound.pop();speak('Yes. '+O[2])}
/* ---- divide on the plane ---- */
function quo(w){const m=w.a*w.a+w.b*w.b;if(!m)return null;return{a:(ZQ.a*w.a+ZQ.b*w.b)/m,b:(ZQ.b*w.a-ZQ.a*w.b)/m}}
const deg=(a,b)=>Math.round(Math.atan2(b,a)*180/Math.PI),dg=v=>(v<0?'−':'')+Math.abs(v)+'°';
function drawDivide(){const P=plane(),w=V.w,q=quo(w);ground();axes(P);arrow(P,ZQ.a,ZQ.b,ZC,'z = 2 + 4i');arrow(P,w.a,w.b,WC,'w = '+cstr(w.a,w.b),{handle:1});
 const hit=q&&Math.abs(q.a)<1e-9&&Math.abs(q.b-1)<1e-9;
 if(q&&Math.abs(q.a)<=R&&Math.abs(q.b)<=R){const g=A.ctx,t=toPx(P,q.a,q.b);g.strokeStyle=QC;g.lineWidth=3;g.beginPath();g.moveTo(P.cx,P.cy);g.lineTo(t.x,t.y);g.stroke();g.fillStyle=QC;g.beginPath();g.arc(t.x,t.y,6,0,7);g.fill()}
 pill(hit?'z ÷ w = i':'Drag w until z ÷ w = i',A.H*.05,hit);
 if(!q){write('w = 0: you cannot divide by 0',A.W/2,A.H*.83,13,NO);return}
 write(`z ÷ w = ${cstr(q.a,q.b)}`,A.W/2,A.H*.81,14,QC,{w:800});
 write(`|z| ÷ |w| = ${(Math.hypot(ZQ.a,ZQ.b)/Math.hypot(w.a,w.b)).toFixed(2)}   arg z − arg w = ${dg(deg(ZQ.a,ZQ.b))} − ${deg(w.a,w.b)<0?'('+dg(deg(w.a,w.b))+')':dg(deg(w.a,w.b))} = ${dg(deg(ZQ.a,ZQ.b)-deg(w.a,w.b))}`,A.W/2,A.H*.87,11)}
/* ---- frame and input ---- */
function draw(){const k=part();if(k==='quiz'){ground();pill('Challenge',A.H*.25,1);pill('Conjugates and division',A.H*.5);return}
 ({mirror:drawMirror,sumdif:drawSumdif,norm:drawNorm,realise:drawRealise,divide:drawDivide})[k]();A.fx.draw(A.ctx)}
const handleOf=k=>k==='divide'?'w':'z';
function setPt(k,pt){const key=handleOf(k),o=V[key];if(o.a===pt.a&&o.b===pt.b)return;V[key]=pt;moved(k)}
function moved(k){const z=V.z;if(k==='mirror')speak(z.a===T0.a&&-z.b===T0.b?'Yes: z = 2 + 3i, so z* = 2 − 3i. Only the sign of the imaginary part flips.':`z = ${cstr(z.a,z.b)}, z* = ${cstr(z.a,-z.b)}.`);
 if(k==='sumdif')speak(2*z.a===T1.sum&&2*z.b===T1.dif?'Yes: z + z* = 2a = 6 and z − z* = 2bi = 4i, so z = 3 + 2i.':`z + z* = ${cstr(2*z.a,0)}, z − z* = ${cstr(0,2*z.b)}.`);
 if(k==='norm'){const n=z.a*z.a+z.b*z.b;if(n===25&&!V.found.some(([a,b])=>a===z.a&&b===z.b)){V.found.push([z.a,z.b]);A.sound.pop();speak(`Yes: (${cstr(z.a,z.b)})(${cstr(z.a,-z.b)}) = ${z.a*z.a} + ${z.b*z.b} = 25. ${V.found.length} of 3.`)}else speak(`zz* = ${n}${n===25?', already found':''}.`)}
 if(k==='divide'){const q=quo(V.w);speak(!q?'w = 0. Division by 0 is undefined.':Math.abs(q.a)<1e-9&&Math.abs(q.b-1)<1e-9?'Yes: w = 4 − 2i gives z ÷ w = i. Same modulus, argument 90° less.':`w = ${cstr(V.w.a,V.w.b)}, z ÷ w = ${cstr(q.a,q.b)}.`)}}
function down(p){const k=part();if(k==='realise'){if(V.st.k<STAGES.length){const r=optR(STAGES[V.st.k].opts.length).find(r=>within(p,r));if(r)choose(r.i)}return false}
 if(k==='quiz')return false;const P=plane();if(!within(p,{x:P.x0,y:P.y0,w:P.s,h:P.s}))return false;V.drag=1;setPt(k,fromPx(P,p));return true}
function move(p){if(!V.drag)return;setPt(part(),fromPx(plane(),p))}
function lift(){V.drag=0;A.redraw()}
function clean(){run++;for(const k in V)delete V[k];Object.assign(V,{z:{a:1,b:1},w:{a:1,b:2},found:[],st:{k:0,bad:-1,log:[]},drag:0,check:()=>{}})}
function speak(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();V.check()}
const doneWhen=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function enterStep(i,ok){clean();speak(DESC[i]);V.check=doneWhen(i,ok,DONE[i])}
function demo(i,acts,ms){steps[i].go();const r0=run;acts.forEach((f,j)=>setTimeout(()=>{if(r0===run)f()},ms*(j+1)))}
function nudge(k,da,db){const key=handleOf(k),o=V[key];setPt(k,{a:Math.max(-R,Math.min(R,o.a+da)),b:Math.max(-R,Math.min(R,o.b+db))})}
function controls(){if(!pad)return;pad.innerHTML='';const k=part(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(['mirror','sumdif','norm','divide'].includes(k)){const h=handleOf(k);[['Re +1',1,0],['Re −1',-1,0],['Im +1',0,1],['Im −1',0,-1]].forEach(([t,da,db])=>B(`${h}: ${t}`,()=>nudge(k,da,db),`Move ${h}: ${t.replace('Re','real part').replace('Im','imaginary part')}`))}
 if(k==='realise'&&V.st.k<STAGES.length)STAGES[V.st.k].opts.forEach((o,j)=>B(o[0],()=>choose(j),`${STAGES[V.st.k].q} ${o[0]}`))}
const path=(k,to)=>{const acts=[],key=handleOf(k);let a=V[key].a,b=V[key].b;while(a!==to.a){a+=Math.sign(to.a-a);const s={a,b};acts.push(()=>setPt(k,s))}while(b!==to.b){b+=Math.sign(to.b-b);const s={a,b};acts.push(()=>setPt(k,s))}return acts};
const steps=[
{h:'Mirror in the real axis',p:'The conjugate of z = a + bi is z* = a − bi. Drag z and watch z* move.',
 predict:{q:'What is the conjugate of 3 + 4i?',opts:['−3 − 4i','3 − 4i'],ans:1},task:'Make z* = 2 − 3i',
 show:()=>{steps[0].go();const acts=path('mirror',{a:2,b:3}),r0=run;acts.forEach((f,j)=>setTimeout(()=>{if(r0===run)f()},350*(j+1)))},go:()=>enterStep(0,()=>V.z.a===T0.a&&-V.z.b===T0.b)},
{h:'Sum and difference',p:'Add z and z*: the imaginary parts cancel. Subtract: the real parts cancel. Use both to find z.',task:'Make z + z* = 6 and z − z* = 4i',
 show:()=>{steps[1].go();const acts=path('sumdif',{a:3,b:2}),r0=run;acts.forEach((f,j)=>setTimeout(()=>{if(r0===run)f()},350*(j+1)))},go:()=>enterStep(1,()=>2*V.z.a===T1.sum&&2*V.z.b===T1.dif)},
{h:'zz* = |z|²',p:'Multiply z by its conjugate. Drag z and watch the product. Points on the dashed circle have |z| = 5.',
 predict:{q:'(3 + 4i)(3 − 4i) = ?',opts:['9 − 16 = −7','9 + 16 = 25'],ans:1},task:'Find 3 points with zz* = 25',
 show:()=>demo(2,[()=>setPt('norm',{a:3,b:4}),()=>setPt('norm',{a:-4,b:3}),()=>setPt('norm',{a:0,b:-5})],600),go:()=>enterStep(2,()=>V.found.length>=3)},
{h:'Realise the denominator',p:'To divide, multiply top and bottom by the conjugate of the bottom. The bottom becomes real.',task:'Work out (5 + 5i) ÷ (1 + 2i)',
 show:()=>demo(3,STAGES.map(S=>()=>choose(S.opts.findIndex(o=>o[1]))),650),go:()=>enterStep(3,()=>V.st.k>=STAGES.length)},
{h:'Divide on the diagram',p:'z ÷ w divides the moduli and subtracts the arguments. Drag w until z ÷ w = i, a quarter turn.',
 predict:{q:'When you divide z by w, what happens to the arguments?',opts:['arg z + arg w','arg z − arg w'],ans:1},task:'Make z ÷ w = i',
 show:()=>{steps[4].go();const acts=path('divide',WANT),r0=run;acts.forEach((f,j)=>setTimeout(()=>{if(r0===run)f()},300*(j+1)))},go:()=>enterStep(4,()=>{const q=quo(V.w);return q&&Math.abs(q.a)<1e-9&&Math.abs(q.b-1)<1e-9})},
{h:'Challenge',p:'',go:()=>{clean();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>V.check()});
function why(t){let m='Use z* = a − bi and multiply by the conjugate of the denominator.';
 if(t==='neg')m='The conjugate keeps the real part and flips only the sign of the imaginary part: (a + bi)* = a − bi.';
 if(t==='sq')m='Watch i² = −1: (a + bi)(a − bi) = a² − b²i² = a² + b², which is real.';
 if(t==='num')m='Multiply by the conjugate of the denominator, so the bottom becomes c² + d², a real number.';
 if(t==='den')m='After multiplying out, divide both parts of the numerator by the new real denominator.';
 if(t==='arg')m='Dividing subtracts the arguments and divides the moduli; multiplying adds them.';
 return m}
function ask(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=quiz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>score(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function score(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.95,tall:1.35,draw,onStep:S=>{quiz.hidden=S.step!==5;pad.hidden=S.step===5;controls()},
 init:S=>{A=S;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Conjugate and division lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);clean();A.gest({down,move,up:lift});controls()}}).start()})})();
