/* Flagship – Patterns with powers of ten (ages 10–11; CCSS 5.NBT.A.2, NC 2013 Year 5 multiply and divide by 10, 100 and
   1000). Scenes: build 10², 10⁴ and 10⁶ by multiplying 1 by ten again and again; drag a number's digits left across a
   place-value chart to multiply by 10ⁿ; drag them right to divide; find the power that links two numbers by counting
   places moved; check a robot's facts. The decimal point is fixed and the digits move. Data in learn/pow10_art.js.
   Distinct from flagpv-style labs for × 10 and ÷ 10: this lab is about exponent notation and shifts of n places. */
(()=>{const P=PTN;
VIS.reg('flagpow10',c=>{let A,row,quizBox,qn=-1,ticket=0;const S={};
const K={paper:'#fefce8',grid:'#78716c',ink:'#1c1917',yes:'#15803d',no:'#b91c1c',chip:'#e0e7ff',chipRim:'#3730a3',hold:'#f5f5f4',dot:'#b91c1c'};
const part=()=>['stack','times','div','which','robot','chal'][A.step];
const fs=n=>A.narrow?n:Math.round(n*1.15);
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function paper(){const g=A.ctx;g.fillStyle=K.paper;g.fillRect(0,0,A.W,A.H)}
function note(t,x,y,o){o=o||{};const g=A.ctx;let n=fs(o.n||14);g.font=`700 ${n}px system-ui,sans-serif`;while(g.measureText(t).width+20>A.W-8&&n>10){n--;g.font=`700 ${n}px system-ui,sans-serif`}
 const w=g.measureText(t).width+20,h=n+14,l=Math.max(4,Math.min(A.W-w-4,x-w/2));g.fillStyle='#ffffff';A.paint.rrect(l,y-h/2,w,h,7);g.fill();
 g.lineWidth=o.ok||o.no?3:1.2;g.strokeStyle=o.ok?K.yes:o.no?K.no:K.grid;g.stroke();g.fillStyle=K.ink;g.textAlign='center';g.textBaseline='middle';g.fillText(t,l+w/2,y+1)}
function key(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.lineWidth=o.no||o.ok?3:1.4;g.strokeStyle=o.no?K.no:o.ok?K.yes:K.grid;g.stroke();
 let n=fs(o.n||18);g.font=`800 ${n}px system-ui,sans-serif`;while(g.measureText(t).width>r.w-10&&n>9){n--;g.font=`800 ${n}px system-ui,sans-serif`}g.fillStyle=K.ink;g.textAlign='center';g.textBaseline='middle';g.fillText(t,r.x+r.w/2,r.y+r.h/2+1)}
/* ---- the place-value chart: digits d at power k; the decimal point never moves ---- */
const chart=()=>{const n=P.COLS.length,w=Math.min(64,(A.W-16)/n),x0=(A.W-w*n)/2;return{w,x0,y:A.H*.3,h:Math.min(A.H*.26,w*1.7)}};
const colX=(ch,pw)=>ch.x0+P.COLS.findIndex(c=>c[0]===pw)*ch.w;
function drawChart(num,o){o=o||{};const g=A.ctx,ch=chart();
 P.COLS.forEach(([pw,lab],i)=>{const x=ch.x0+i*ch.w;g.fillStyle=pw===0?'#fef3c7':'#ffffff';g.fillRect(x,ch.y,ch.w,ch.h);g.strokeStyle=K.grid;g.lineWidth=1;g.strokeRect(x,ch.y,ch.w,ch.h);
  g.font=`700 ${fs(11)}px system-ui,sans-serif`;g.fillStyle=K.ink;g.textAlign='center';g.textBaseline='middle';g.fillText(lab,x+ch.w/2,ch.y+12)});
 const px=colX(ch,0)+ch.w;g.fillStyle=K.dot;g.beginPath();g.arc(px,ch.y+ch.h*.62,fs(5),0,7);g.fill();
 if(!num)return;const L=num.d.length,top=num.k+L-1,cy=ch.y+ch.h*.62,dx=o.dx||0;
 /* placeholder zeros between the digits and the ones column, and a 0 in the ones column for numbers under 1 */
 for(let pw=0;pw<num.k;pw++)ghost(colX(ch,pw),cy,ch);if(top<0)for(let pw=top+1;pw<=0;pw++)ghost(colX(ch,pw),cy,ch);
 [...num.d].forEach((dg,j)=>{const pw=top-j,x=colX(ch,pw);if(x<ch.x0-1)return;g.fillStyle=K.chip;A.paint.rrect(x+3+dx,cy-ch.w*.42,ch.w-6,ch.w*.84,7);g.fill();g.strokeStyle=K.chipRim;g.lineWidth=2;g.stroke();
  g.font=`800 ${fs(Math.min(26,ch.w*.6))}px system-ui,sans-serif`;g.fillStyle=K.ink;g.textAlign='center';g.textBaseline='middle';g.fillText(dg,x+ch.w/2+dx,cy+1)})}
function ghost(x,cy,ch){const g=A.ctx;g.setLineDash([3,3]);g.strokeStyle=K.grid;g.lineWidth=1.2;g.strokeRect(x+5,cy-ch.w*.36,ch.w-10,ch.w*.72);g.setLineDash([]);
 g.font=`700 ${fs(Math.min(22,ch.w*.5))}px system-ui,sans-serif`;g.fillStyle='#44403c';g.textAlign='center';g.textBaseline='middle';g.fillText('0',x+ch.w/2,cy+1)}
const shifted=(n,e)=>({d:n.d,k:n.k+e});
/* ---- 1. stack tens ---- */
const tenKeys=()=>{const w=Math.min(150,(A.W-36)/2),h=Math.min(A.H*.15,60);return['×','÷'].map((s,i)=>({s,x:A.W/2+(i?6:-w-6),y:A.H*.74,w,h}))};
function drawStack(){const s=S.stack;paper();if(s.i>=P.STACK.length){note('10², 10⁴ and 10⁶ made',A.W/2,A.H*.12,{ok:1});drawChart({d:'1',k:6});note('10⁶ = 1,000,000: six tens multiplied, six zeros',A.W/2,A.H*.68,{n:13});return}
 const goal=P.STACK[s.i];note(`${s.i+1} of 3: make ${P.pow(goal)}`,A.W/2,A.H*.08,{n:16});drawChart({d:'1',k:s.e});
 note(s.e?`${Array(s.e).fill('10').join(' × ')} = ${P.pow(s.e)} = ${P.show({d:'1',k:s.e})}`:'1 (no tens yet)',A.W/2,A.H*.64,{n:13,no:s.bad});
 tenKeys().forEach(b=>key(b,b.s==='×'?'× 10':'÷ 10'))}
function ten(up){const s=S.stack;if(s.i>=P.STACK.length)return;const goal=P.STACK[s.i];
 if(!up&&s.e===0)return say('You are back at 1. Tap × 10 to make powers of ten.');s.e+=up?1:-1;A.sound.tick();
 if(s.e>goal){s.bad=1;A.sound.miss();return say(`That is ${P.pow(s.e)} = ${P.show({d:'1',k:s.e})}: ${s.e} tens multiplied. ${P.pow(goal)} needs only ${goal}. Tap ÷ 10.`)}
 s.bad=0;if(s.e===goal){s.i++;A.sound.pop();return say(`Yes: ${P.pow(goal)} = ${P.show({d:'1',k:goal})}. The small ${goal} counts ${goal} tens, so the 1 moved ${goal} places and ${goal} zeros fill in behind it.`+(s.i<P.STACK.length?' Next power.':''))}
 say(`${P.pow(s.e)} = ${P.show({d:'1',k:s.e})}. The 1 moved one place left.`)}
/* ---- 2 and 3. slide the digits ---- */
const moveKeys=()=>{const w=Math.min(150,(A.W-36)/2),h=Math.min(A.H*.15,60);return[1,-1].map((d,i)=>({d,x:A.W/2+(i?6:-w-6),y:A.H*.76,w,h}))};
function drawSlide(list,sign){const s=S[part()];paper();if(s.i>=list.length){note(`All ${list.length} done`,A.W/2,A.H*.12,{ok:1});note(sign>0?'× 10ⁿ: digits move n places left':'÷ 10ⁿ: digits move n places right',A.W/2,A.H*.24,{n:13});return}
 const T=list[s.i],n0=P.parse(T.n),now=shifted(n0,s.m);note(`${s.i+1} of ${list.length}: ${P.show(n0)} ${sign>0?'×':'÷'} ${P.pow(T.e)}`,A.W/2,A.H*.08,{n:17});
 drawChart(now,{dx:s.dx});note(`Moved ${Math.abs(s.m)} place${Math.abs(s.m)===1?'':'s'} ${s.m>0?'left':s.m<0?'right':''} · now ${P.show(now)}`,A.W/2,A.H*.66,{n:13,no:s.bad});
 moveKeys().forEach(b=>key(b,b.d>0?'◀ 1 place':'1 place ▶',{n:16}))}
function nudge(dir){const v=part(),list=v==='times'?P.TIMES:P.DIV,sign=v==='times'?1:-1,s=S[v];if(s.i>=list.length)return;const T=list[s.i],n0=P.parse(T.n);
 if(dir!==sign){s.bad=1;A.sound.miss();return say(sign>0?`Multiplying by ${P.pow(T.e)} makes the number bigger, so the digits move left, towards the bigger places.`:`Dividing by ${P.pow(T.e)} makes the number smaller, so the digits move right, towards the smaller places.`)}
 const m=s.m+dir,pl=Math.abs(m),top=n0.k+n0.d.length-1+m;if(top>6||n0.k+m<-3)return say('That would run off the chart.');
 if(pl>T.e){s.bad=1;A.sound.miss();return say(`${P.pow(T.e)} means ${T.e} tens, so move ${T.e} place${T.e>1?'s':''}, not ${pl}.`)}
 s.m=m;s.bad=0;A.sound.tick();const now=shifted(n0,m);
 if(pl===T.e){s.i++;s.m=0;A.sound.pop();return say(`Yes: ${P.show(n0)} ${sign>0?'×':'÷'} ${P.pow(T.e)} = ${P.show(now)}. Every digit moved ${T.e} place${T.e>1?'s':''} and the point stayed put.`+(s.i<list.length?' Next one.':''))}
 say(`Now ${P.show(now)}. ${T.e-pl} more place${T.e-pl>1?'s':''} to go.`)}
/* ---- 4. which power? ---- */
const powKeys=()=>{const w=(A.W-30)/4,h=Math.min(A.H*.17,66);return[1,2,3,4].map((e,i)=>({e,x:12+i*(w+2),y:A.H*.7,w:w-4,h}))};
function drawWhich(){const s=S.which;paper();if(s.i>=P.WHICH.length){note('All 4 powers found',A.W/2,A.H*.14,{ok:1});note('Count places moved, not zeros in the answer',A.W/2,A.H*.3,{n:13});return}
 const W=P.WHICH[s.i],a=P.parse(W.a),b=P.parse(W.b);note(`${s.i+1} of 4: ${P.show(a)} ${W.op} 10ⁿ = ${P.show(b)}`,A.W/2,A.H*.08,{n:17});
 drawChart(s.miss>0?shifted(a,W.op==='×'?s.miss:-s.miss):a);note(s.miss>0?`${W.op} ${P.pow(s.miss)} gives ${P.show(shifted(a,W.op==='×'?s.miss:-s.miss))}, not ${P.show(b)}`:'Which power of ten?',A.W/2,A.H*.62,{n:13,no:s.miss>0});
 powKeys().forEach(k=>key(k,P.pow(k.e),{no:s.miss===k.e,n:20}))}
function pick(e){const s=S.which;if(s.i>=P.WHICH.length)return;const W=P.WHICH[s.i],a=P.parse(W.a),b=P.parse(W.b);
 if(e!==W.e){s.miss=e;A.sound.miss();const z=(P.show(b).match(/0/g)||[]).length;return say(e===z&&z!==W.e?`${P.show(b)} has ${z} zero${z>1?'s':''}, but that is not the power. Count the places each digit moved: ${W.e}.`:`${W.op} ${P.pow(e)} would give ${P.show(shifted(a,W.op==='×'?e:-e))}. Count the places each digit moves to reach ${P.show(b)}.`)}
 s.miss=-1;s.i++;A.sound.pop();say(`Yes: ${P.show(a)} ${W.op} ${P.pow(W.e)} = ${P.show(b)}. The digits moved ${W.e} places.`+(s.i<P.WHICH.length?' Next one.':''))}
/* ---- 5. robot ---- */
const rightSlip=()=>{const w=Math.min(170,(A.W-36)/2);return[0,1].map(i=>({i,x:A.W/2+(i?6:-w-6),y:A.H*.7,w,h:Math.min(A.H*.17,62)}))};
function drawRobot(){const s=S.robot,g=A.ctx;paper();if(s.i>=P.ROBOT.length){note('All 6 facts checked',A.W/2,A.H*.16,{ok:1});note('10⁴ = 10,000 · 4.6 × 10 = 46 · 8 ÷ 10² = 0.08',A.W/2,A.H*.34,{n:13});return}
 const R=P.ROBOT[s.i],x=A.W/2,y=A.H*.16,u=Math.min(A.W*.055,22);g.fillStyle='#d6d3d1';A.paint.rrect(x-u,y-u,u*2,u*2,5);g.fill();g.strokeStyle=K.ink;g.lineWidth=2;g.stroke();
 g.fillStyle=K.ink;g.fillRect(x-u*.55,y-u*.3,u*.35,u*.25);g.fillRect(x+u*.2,y-u*.3,u*.35,u*.25);g.fillRect(x-u*.4,y+u*.4,u*.8,3);g.beginPath();g.moveTo(x,y-u);g.lineTo(x,y-u-9);g.stroke();
 note(`“${R.s}”`,A.W/2,A.H*.42,{n:20});note(`${s.i+1} of 6: right, or a slip?`,A.W/2,A.H*.56,{n:12});rightSlip().forEach(b=>key(b,b.i?'✗ Slip':'✓ Right',{no:s.miss===b.i,n:17}))}
function rule(j){const s=S.robot;if(s.i>=P.ROBOT.length)return;const R=P.ROBOT[s.i];
 if((j===0)!==R.ok){s.miss=j;A.sound.miss();return say(R.ok?`Check again: it is right. ${R.fix}`:`Check again: it is a slip. ${R.fix}`)}
 s.miss=-1;s.i++;A.sound.pop();say((R.ok?'Yes, right. ':'Yes, a slip. ')+R.fix)}
function draw(){const v=part();if(v==='chal'){paper();note('Challenge',A.W/2,A.H*.24,{ok:1});note('10¹ · 10² · 10³ · 10⁴ · 10⁵ · 10⁶',A.W/2,A.H*.5,{n:15});return}
 if(v==='stack')drawStack();if(v==='times')drawSlide(P.TIMES,1);if(v==='div')drawSlide(P.DIV,-1);if(v==='which')drawWhich();if(v==='robot')drawRobot();A.fx.draw(A.ctx)}
/* canvas: tap keys, or drag the digits along the chart */
let grab=null;
function down(p){const v=part();
 if(v==='stack'){const b=tenKeys().find(q=>hit(p,q));if(b)ten(b.s==='×')}
 if(v==='times'||v==='div'){const b=moveKeys().find(q=>hit(p,q));if(b){nudge(b.d);return false}const ch=chart();if(p.y>ch.y-20&&p.y<ch.y+ch.h+20){grab={x:p.x};return true}}
 if(v==='which'){const b=powKeys().find(q=>hit(p,q));if(b)pick(b.e)}
 if(v==='robot'){const b=rightSlip().find(q=>hit(p,q));if(b)rule(b.i)}
 return false}
function move(p){if(!grab)return;const v=part(),s=S[v];if(!s)return;const w=chart().w,d=p.x-grab.x;s.dx=Math.max(-w*.45,Math.min(w*.45,d));
 if(Math.abs(d)>w*.55){const dir=d<0?1:-1;grab.x+=d<0?-w:w;s.dx=0;nudge(dir)}else A.redraw()}
function up(){if(grab){const s=S[part()];if(s)s.dx=0;grab=null;A.redraw()}}
function wipe(){ticket++;grab=null;for(const x in S)delete S[x];Object.assign(S,{stack:{i:0,e:0,bad:0},times:{i:0,m:0,dx:0,bad:0},div:{i:0,m:0,dx:0,bad:0},which:{i:0,miss:-1},robot:{i:0,miss:-1},then:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.then()}
/* buttons that do every canvas action */
function buttons(){if(!row)return;row.innerHTML='';const v=part(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},row,t).onclick=f};
 if(v==='stack'&&S.stack.i<P.STACK.length){b('× 10',()=>ten(true),'Multiply by 10');b('÷ 10',()=>ten(false),'Divide by 10')}
 if((v==='times'||v==='div')&&S[v].i<(v==='times'?P.TIMES:P.DIV).length){b('◀ 1 place',()=>nudge(1),'Move every digit one place left');b('1 place ▶',()=>nudge(-1),'Move every digit one place right')}
 if(v==='which'&&S.which.i<P.WHICH.length)[1,2,3,4].forEach(e=>b(P.pow(e),()=>pick(e),`10 to the power ${e}`));
 if(v==='robot'&&S.robot.i<P.ROBOT.length){b('✓ Right',()=>rule(0),'The robot is right');b('✗ Slip',()=>rule(1),'The robot made a slip')}}
const close=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function enter(i,ok){wipe();say(P.DESC[i]);S.then=close(i,ok,P.DONE[i])}
function auto(i,acts,ms){steps[i].go();const t0=ticket;acts.forEach((f,j)=>setTimeout(()=>{if(t0===ticket)f()},ms*(j+1)))}
const steps=[
{h:'Tens times tens',p:'10³ means 10 × 10 × 10. The small number, the exponent, counts how many tens are multiplied. Start at 1 and multiply by 10.',
 predict:{q:'What is 10³?',opts:['30','1000'],ans:1},task:'Make 10², 10⁴ and 10⁶',
 show:()=>auto(0,[...Array(6)].map(()=>()=>ten(true)),300),go:()=>enter(0,()=>S.stack.i>=P.STACK.length)},
{h:'Multiply: digits move left',p:'The decimal point stays still. Multiplying by 10ⁿ moves every digit n places left. Drag the digits or use the buttons.',
 predict:{q:'What is 3.4 × 10²?',opts:['3.400','340'],ans:1},task:'Do all 4',
 show:()=>auto(1,P.TIMES.flatMap(T=>[...Array(T.e)].map(()=>()=>nudge(1))),260),go:()=>enter(1,()=>S.times.i>=P.TIMES.length)},
{h:'Divide: digits move right',p:'Dividing by 10ⁿ moves every digit n places right. Zeros hold the empty places before the digits.',
 predict:{q:'What is 56 ÷ 10²?',opts:['5600','0.56'],ans:1},task:'Do all 4',
 show:()=>auto(2,P.DIV.flatMap(T=>[...Array(T.e)].map(()=>()=>nudge(-1))),260),go:()=>enter(2,()=>S.div.i>=P.DIV.length)},
{h:'Which power?',p:'Find the power of ten that links the two numbers. Count how many places the digits move.',task:'Find all 4',
 show:()=>auto(3,P.WHICH.map(W=>()=>pick(W.e)),450),go:()=>enter(3,()=>S.which.i>=P.WHICH.length)},
{h:'Check the robot',p:'A robot says six facts about powers of ten. Is each one right, or a slip?',task:'Check all 6',
 show:()=>auto(4,P.ROBOT.map(R=>()=>rule(R.ok?0:1)),450),go:()=>enter(4,()=>S.robot.i>=P.ROBOT.length)},
{h:'Challenge',p:'',go:()=>{wipe();next()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.then()});
function slipMsg(t){let m='Count the places: 10ⁿ moves every digit n places.';
 if(t==='times')m='10³ is not 10 × 3. It is 10 × 10 × 10 = 1000. The exponent counts the tens.';
 if(t==='join')m='The small 3 is not a digit to write next to 10. 10³ = 10 × 10 × 10 = 1000.';
 if(t==='zeros')m='Zeros on the end of a decimal change nothing: 3.400 is still 3.4. Move the digits 2 places left: 340.';
 if(t==='fewer')m='Move the digits as many places as the exponent says, no fewer.';
 if(t==='way')m='Dividing makes the number smaller, so the digits move right, not left.';
 if(t==='count')m='Do not count zeros in the answer. Count how far each digit moved: 2.56 to 2560 is 3 places.';
 if(t==='extra')m='10⁶ is a 1 followed by exactly 6 zeros: 1,000,000.';
 return m}
function next(){qn++;const Q=P.QS[qn%P.QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 quizBox.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=quizBox.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},box,v).onclick=()=>grade(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function grade(t,a){quizBox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quizBox.querySelector('.fl-fb'),good=t==='ok';if(good)A.win();else A.sound.miss();
 fb.innerHTML=(good?`✓ Yes: ${a}.`:'✗ '+slipMsg(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=next;c.say(good?'Yes.':slipMsg(t))}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:x=>{quizBox.hidden=x.step!==5;row.hidden=x.step===5;buttons()},
 init:x=>{A=x;const w=c.el('div',{class:'fl-below'},A.below);row=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Powers of ten lab buttons'},w);quizBox=c.el('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});buttons()}}).start()})})();
