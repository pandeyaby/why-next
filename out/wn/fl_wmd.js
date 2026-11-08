/* Flagship: Written Multiplication & Division (ages 7–8; NC Y3 multiplication and division: write and calculate
   mathematical statements using known tables, including two-digit × one-digit, progressing to formal written
   methods). Cut a 23-by-4 array into tens and ones (partitioning), carry the ten in short multiplication, spot the
   classic slips in 47 × 3, then divide 96 ÷ 8 and 68 ÷ 4 by dragging chunks of known facts onto a bar and check with
   the inverse. Not flagttfam/flagttdbl/flagtt12 (fact recall), flagcommul (commutativity) or flagregroup (+/−). */
(()=>{
VIS.reg('flagwmd',c=>{let Z,bar,tray,qn=-1,ep=0;const s={};c.fig.classList.add('young');
const part=()=>['cut','carry','slip','chunk','chunk','check','quiz'][Z.step];
function tell(t){c.say(t);if(Z)Z.cv.setAttribute('aria-label',t)}
function word(t,x,y,px,o){o=o||{};const g=Z.ctx;g.font=`${o.b||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.ink||Z.col.tx;g.fillText(String(t),x,y,o.max||Z.W-8)}
function pill(r,fill,lw){const g=Z.ctx;g.fillStyle=fill;Z.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=Z.col.tx;g.lineWidth=lw||1.5;g.stroke()}
const hit=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* ---- partition: a rows-by-n array, a draggable cut ---- */
const grid=()=>{const x0=Z.W*.05,u=(Z.W*.9)/s.n;return{x0,u,y0:Z.H*.2,h:u*s.r}};
function drawCut(){const C=Z.col,G=grid(),g=Z.ctx,k=s.cut;word(`${s.n} × ${s.r}: drag the cut`,Z.W/2,Z.H*.07,Z.narrow?15:17,{b:800});
 for(let i=0;i<s.n;i++)for(let j=0;j<s.r;j++){g.fillStyle=i<k?Z.alpha(C.cy,.75):Z.alpha(C.am,.75);g.fillRect(G.x0+i*G.u+1,G.y0+j*G.u+1,G.u-2,G.u-2)}
 const cx=G.x0+k*G.u;g.strokeStyle=C.rd;g.lineWidth=4;g.beginPath();g.moveTo(cx,G.y0-14);g.lineTo(cx,G.y0+G.h+14);g.stroke();Z.paint.ball(cx,G.y0-16,10,C.rd);
 const y=G.y0+G.h+Z.H*.08;word(`${k} × ${s.r} = ${k*s.r}`,G.x0+k*G.u/2,y,Z.narrow?13:15,{b:800,max:Math.max(60,k*G.u)});word(`${s.n-k} × ${s.r} = ${(s.n-k)*s.r}`,cx+(s.n-k)*G.u/2,y+(k>14&&s.n-k<9?Z.H*.06:0),Z.narrow?13:15,{b:800});
 word(`${k*s.r} + ${(s.n-k)*s.r} = ${s.n*s.r}`,Z.W/2,Z.H*.66,Z.narrow?18:22,{b:900});word(k===20?'Tens part and ones part: easy facts!':'Cut where the tens end to use facts you know.',Z.W/2,Z.H*.78,Z.narrow?12:14,{ink:C.mu})}
/* ---- short multiplication column layout ---- */
const col=()=>{const w=Z.W*(Z.narrow?.2:.13),x0=Z.W/2-w*1.5;return{w,x0,y:i=>Z.H*(.14+i*.11)}};
const onesBox=()=>{const L=col();return{x:L.x0+2*L.w+4,y:L.y(3)-L.w*.42,w:L.w-8,h:L.w*.84}},tensSpot=()=>{const L=col();return{x:L.x0+L.w+L.w*.2,y:L.y(4)-Z.H*.045,w:L.w*.6,h:Z.H*.09}};
const tile1=()=>s.held?{x:s.hx-28,y:s.hy-24,w:56,h:48}:{x:Z.W*.78,y:Z.H*.74,w:56,h:48};
function drawCarry(){const C=Z.col,L=col(),g=Z.ctx;word('Short multiplication: 23 × 4',Z.W/2,Z.H*.05,Z.narrow?15:17,{b:800});
 ['H','T','O'].forEach((h,i)=>word(h,L.x0+(i+.5)*L.w,Z.H*.15,13,{ink:C.mu}));
 const cell=(d,i,row,ink)=>word(d,L.x0+(i+.5)*L.w,L.y(row),Z.narrow?28:32,{b:900,ink});cell(2,1,1);cell(3,2,1);cell('×',0,2);cell(4,2,2);
 g.strokeStyle=C.tx;g.lineWidth=3;g.beginPath();g.moveTo(L.x0,L.y(2)+Z.H*.06);g.lineTo(L.x0+3*L.w,L.y(2)+Z.H*.06);g.stroke();
 cell(2,2,3);if(s.carried)cell(9,1,3);const t=tensSpot();g.setLineDash(s.carried?[]:[5,4]);pill(t,s.carried?Z.alpha(C.gr,.35):Z.alpha(C.tx,.05));g.setLineDash([]);if(s.carried)word('1',t.x+t.w/2,t.y+t.h/2,18,{b:900});
 word('3 × 4 = 12 = 1 ten + 2 ones',Z.W/2,Z.H*.69,Z.narrow?12:14,{ink:C.mu,max:Z.W*.7,al:'center'});
 if(!s.carried){const r=tile1();pill(r,Z.alpha(C.vi,.45),3);word('1 ten',r.x+r.w/2,r.y+r.h/2,13,{b:900})}
 word(s.carried?'2 tens × 4 = 8 tens, + 1 carried = 9 tens → 92':'Drag the 1 ten to the tens column.',Z.W/2,Z.H*.93,Z.narrow?13:15,{b:700,max:Z.W*.94})}
/* ---- spot the slip: three worked answers ---- */
const card3=i=>({x:Z.W*.04+i*Z.W*.32,y:Z.H*.22,w:Z.W*.28,h:Z.H*.42});
function drawSlip(){const C=Z.col;word('Which working for 47 × 3 is right?',Z.W/2,Z.H*.08,Z.narrow?14:17,{b:800});
 s.cards.forEach((k,i)=>{const r=card3(i),on=s.pick===i;pill(r,on?Z.alpha(k[2]?C.gr:C.rd,.3):Z.alpha(C.tx,.05),on?3:1.5);
  word('47',r.x+r.w*.62,r.y+r.h*.18,Z.narrow?18:22,{b:900});word('× 3',r.x+r.w*.55,r.y+r.h*.36,Z.narrow?18:22,{b:900});
  word(k[0],r.x+r.w/2,r.y+r.h*.62,Z.narrow?20:24,{b:900,ink:C.tx});word(k[1],r.x+r.w/2,r.y+r.h*.85,Z.narrow?10:12,{ink:C.mu,max:r.w-6})});
 word(s.note||'Tap the right working.',Z.W/2,Z.H*.78,Z.narrow?12:14,{ink:C.mu,max:Z.W*.94})}
/* ---- division by chunks of a known fact ---- */
const barR=()=>({x:Z.W*.05,y:Z.H*.2,w:Z.W*.9,h:Z.H*.12});
const chip=i=>({x:Z.W*.05+i*Z.W*.31,y:Z.H*.56,w:Z.W*.28,h:Z.H*.13});
function drawChunk(){const C=Z.col,g=Z.ctx,B=barR();word(`${s.tot} ÷ ${s.d}: fill the bar with groups of ${s.d}`,Z.W/2,Z.H*.07,Z.narrow?14:16,{b:800});
 pill(B,Z.alpha(C.tx,.05),2);let x=B.x;s.got.forEach((k,i)=>{const w=B.w*k*s.d/s.tot;g.fillStyle=Z.alpha(i%2?C.cy:C.vi,.6);g.fillRect(x+1,B.y+2,w-2,B.h-4);word(`${k}×${s.d}`,x+w/2,B.y+B.h/2,Z.narrow?11:13,{b:800,max:w-2});x+=w});
 word(`${s.tot} total`,B.x+B.w,B.y+B.h+14,12,{al:'right',ink:C.mu});
 const used=s.got.reduce((a,k)=>a+k,0);word(`groups so far: ${s.got.join(' + ')||0} = ${used}   ·   left: ${s.tot-used*s.d}`,Z.W/2,Z.H*.44,Z.narrow?12:14,{b:700});
 s.chips.forEach((k,i)=>{let r=chip(i);if(s.drag===i)r={...r,x:s.hx-r.w/2,y:s.hy-r.h/2};pill(r,Z.alpha(C.am,.4),2);word(`${k} × ${s.d} = ${k*s.d}`,r.x+r.w/2,r.y+r.h/2,Z.narrow?13:15,{b:900,max:r.w-6})});
 word(s.note||'Drag a chunk onto the bar, or use the buttons.',Z.W/2,Z.H*.82,Z.narrow?12:14,{ink:C.mu,max:Z.W*.94})}
function drawCheck(){const C=Z.col,g=Z.ctx;word('96 ÷ 8 = 12: check it',Z.W/2,Z.H*.06,Z.narrow?15:17,{b:800});
 const u=Math.min(Z.W*.9/12,Z.H*.4/8),x0=Z.W/2-6*u,y0=Z.H*.12;for(let i=0;i<12;i++)for(let j=0;j<8;j++){g.fillStyle=Z.alpha(i<10?C.vi:C.cy,.7);g.beginPath();g.arc(x0+(i+.5)*u,y0+(j+.5)*u,u*.36,0,7);g.fill()}
 word('12 groups of 8',Z.W/2,y0+8*u+14,13,{ink:C.mu});s.facts.forEach((f,i)=>{const r={x:Z.W*.06,y:Z.H*(.6+i*.11),w:Z.W*.88,h:Z.H*.09};pill(r,s.pick===i?Z.alpha(i===0?C.gr:C.rd,.3):Z.alpha(C.tx,.05),s.pick===i?3:1.5);word(f,Z.W/2,r.y+r.h/2,Z.narrow?14:16,{b:800})})}
function draw(A){const C=A.col;A.ctx.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.06:.42);A.ctx.fillRect(0,0,A.W,A.H);const k=part();
 if(k==='cut')drawCut();else if(k==='carry')drawCarry();else if(k==='slip')drawSlip();else if(k==='chunk')drawChunk();else if(k==='check')drawCheck();
 else{word('× and ÷ with facts you know',A.W/2,A.H*.35,A.narrow?16:20,{b:900});word('split · carry · chunk · check',A.W/2,A.H*.55,A.narrow?13:15,{ink:C.mu})}A.fx.draw(A.ctx)}
function clean(o){ep++;for(const k in s)delete s[k];Object.assign(s,{n:23,r:4,cut:12,carried:false,held:false,cards:[],pick:null,note:'',tot:96,d:8,got:[],chips:[10,2,1],drag:null,facts:[],ok:()=>{}},o||{})}
const fin=(i,cond,msg)=>()=>{if(Z.step===i&&cond()&&(!steps[i].predict||Z.pred[i]!=null)&&!Z.isDone)Z.done(msg+Z.reveal(i))};
function play(i,acts){steps[i].go();const e=ep;acts.forEach((f,j)=>setTimeout(()=>{if(e===ep)f()},Z.reduced()?20*(j+1):260*(j+1)))}
function setCut(k){s.cut=Math.max(1,Math.min(s.n-1,k));tell(`Cut at ${s.cut}: ${s.cut} × ${s.r} = ${s.cut*s.r} and ${s.n-s.cut} × ${s.r} = ${(s.n-s.cut)*s.r}. Total ${s.n*s.r}.`);Z.redraw();s.ok()}
function carry(where){s.held=false;if(where==='tens'){s.carried=true;Z.sound.pop();tell('The 1 ten joins the tens: 8 tens + 1 ten = 9 tens. 23 × 4 = 92.')}
 else if(where==='ones'){Z.sound.miss();tell('Only one digit fits in the ones column. 12 ones is 1 ten and 2 ones, so the ten moves left.')}Z.redraw();s.ok()}
function pickCard(i){s.pick=i;const k=s.cards[i];k[2]?Z.sound.pop():Z.sound.miss();s.note=k[3];tell(k[3]);Z.redraw();s.ok()}
/* adding one chunk of k groups to the division bar */
function addChunk(k){const used=s.got.reduce((a,x)=>a+x,0),left=s.tot-used*s.d;
 if(k*s.d>left){Z.sound.miss();s.note=`${k} × ${s.d} = ${k*s.d} is more than the ${left} left. Pick a smaller chunk.`}
 else{s.got.push(k);Z.sound.pop();const u=used+k;s.note=u*s.d===s.tot?`Full! ${s.got.join(' + ')} = ${u} groups, so ${s.tot} ÷ ${s.d} = ${u}.`:`${k} more group${k>1?'s':''} of ${s.d}. ${s.tot-u*s.d} left.`}
 tell(s.note);Z.redraw();s.ok()}
function pickFact(i){s.pick=i;i===0?Z.sound.pop():Z.sound.miss();tell(['12 × 8 = 96 undoes the division, so 96 ÷ 8 = 12 is right.','96 × 8 makes a bigger number; it does not undo ÷ 8.','Adding 12 and 8 does not undo dividing.'][i]);Z.redraw();s.ok()}
function controls(){if(!bar)return;bar.innerHTML='';const b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},bar,t).onclick=f},k=part();
 if(k==='cut'){b('◀ Move cut',()=>setCut(s.cut-1),'Move the cut left');b('Move cut ▶',()=>setCut(s.cut+1),'Move the cut right')}
 if(k==='carry'){b('1 ten → tens',()=>carry('tens'),'Put the 1 ten in the tens column');b('Write 12 in ones',()=>carry('ones'))}
 if(k==='slip')s.cards.forEach((x,i)=>b(x[0],()=>pickCard(i),'Choose answer '+x[0]));
 if(k==='chunk')s.chips.forEach(x=>b(`+ ${x} × ${s.d}`,()=>addChunk(x),`Add ${x} groups of ${s.d}`));
 if(k==='check')s.facts.forEach((f,i)=>b(f,()=>pickFact(i),'Check with '+f))}
function down(p){const k=part();if(k==='quiz')return false;
 if(k==='cut'){const G=grid();if(p.y<G.y0-30||p.y>G.y0+G.h+30)return false;s.drag='cut';setCut(Math.round((p.x-G.x0)/G.u));return true}
 if(k==='carry'){if(!s.carried&&hit(p,tile1())){s.held=true;s.hx=p.x;s.hy=p.y;return true}return false}
 if(k==='slip'){const i=[0,1,2].find(j=>hit(p,card3(j)));if(i!=null)pickCard(i);return i!=null}
 if(k==='chunk'){const i=s.chips.findIndex((_,j)=>hit(p,chip(j)));if(i<0)return false;s.drag=i;s.hx=p.x;s.hy=p.y;Z.redraw();return true}
 if(k==='check'){const i=[0,1,2].find(j=>p.y>=Z.H*(.6+j*.11)&&p.y<=Z.H*(.69+j*.11));if(i!=null)pickFact(i);return i!=null}
 return false}
function move(p){if(s.drag==='cut'){const G=grid(),k=Math.round((p.x-G.x0)/G.u);if(k!==s.cut)setCut(k);return}if(s.held||s.drag!=null){s.hx=p.x;s.hy=p.y;Z.redraw()}}
function up(p){if(s.drag==='cut'){s.drag=null;return}
 if(s.held){const t=tensSpot(),o=onesBox();if(p&&hit(p,{x:t.x-12,y:t.y-12,w:t.w+24,h:t.h+24}))carry('tens');else if(p&&hit(p,o))carry('ones');else{s.held=false;Z.redraw()}return}
 if(s.drag!=null){const i=s.drag;s.drag=null;const B=barR();if(p&&p.y<B.y+B.h+30)addChunk(s.chips[i]);else Z.redraw()}}
const steps=[
{h:'Split into tens and ones',p:'Partitioning: 23 is 20 and 3. Multiply each part by 4 using facts you know, then add the two answers.',
 predict:{q:'What is 23 × 4?',opts:['83 (20 × 4, then add 3)','92','812'],ans:1},
 task:'Drag the cut so the left part is 20 columns',show:()=>play(0,[()=>setCut(16),()=>setCut(20)]),
 go:()=>{clean({cut:12});tell('A 23 by 4 array. Drag the red cut.');controls();s.ok=fin(0,()=>s.cut===20,'20 × 4 = 80 and 3 × 4 = 12. 80 + 12 = 92.')}},
{h:'Carry the ten',p:'In the written method, start with the ones. 3 × 4 = 12. That is 1 ten and 2 ones: write the 2, carry the 1 ten.',
 predict:{q:'3 × 4 = 12. Where does the 1 go?',opts:['Next to the 2 in the ones','To the tens column','Nowhere: drop it'],ans:1},
 task:'Drag the 1 ten to the tens column',show:()=>play(1,[()=>carry('tens')]),
 go:()=>{clean();tell('23 times 4. Ones first: 3 times 4 is 12.');controls();s.ok=fin(1,()=>s.carried,'2 × 4 = 8 tens, plus the 1 carried = 9 tens. 23 × 4 = 92.')}},
{h:'Spot the slip',p:'Two of these answers come from common slips. Check each: 7 × 3 = 21, so carry 2 tens. 4 × 3 = 12 tens, plus 2 = 14 tens.',
 task:'Tap the right working for 47 × 3',show:()=>play(2,[()=>pickCard(1)]),
 go:()=>{clean({cards:[['121','forgot the carry',0,'121 forgets the 2 carried tens: 12 tens + 2 tens is 14 tens.'],['141','carried 2 tens',1,'Right: 21 gives 1 one and 2 tens to carry; 12 tens + 2 tens = 14 tens. 47 × 3 = 141.'],['1221','wrote 12 and 21',0,'1221 writes both facts side by side. 21 is 2 tens and 1 one, so only the 1 goes in the ones.']]});tell('Three workings for 47 times 3.');controls();s.ok=fin(2,()=>s.pick===1,'47 × 3 = 141.')}},
{h:'Divide by chunks',p:'Division shares into equal groups. Use facts you know: 10 groups of 8 is 80. Then fill the rest.',
 predict:{q:'What is 96 ÷ 8?',opts:['11 (9 ÷ 8 and 6 ÷ 8)','12','10'],ans:1},
 task:'Fill the 96 bar with groups of 8',show:()=>play(3,[()=>addChunk(10),()=>addChunk(2)]),
 go:()=>{clean({tot:96,d:8,chips:[10,2,1]});tell('96 divided by 8. Drag chunks of 8 onto the bar.');controls();s.ok=fin(3,()=>s.got.reduce((a,x)=>a+x,0)*8===96,'10 + 2 = 12 groups. 96 ÷ 8 = 12.')}},
{h:'Count groups, not the leftovers',p:'68 ÷ 4: 10 groups of 4 is 40, leaving 28. 7 groups of 4 is 28. The answer is the number of groups.',
 predict:{q:'After 10 × 4 = 40, what is left from 68?',opts:['28','8','18'],ans:0},
 task:'Fill the 68 bar with groups of 4',show:()=>play(4,[()=>addChunk(10),()=>addChunk(5),()=>addChunk(2)]),
 go:()=>{clean({tot:68,d:4,chips:[10,5,2]});tell('68 divided by 4.');controls();s.ok=fin(4,()=>s.got.reduce((a,x)=>a+x,0)*4===68,'10 + 5 + 2 = 17 groups. 68 ÷ 4 = 17.')}},
{h:'Check with the inverse',p:'Multiplication undoes division. If 96 ÷ 8 = 12, then 12 × 8 must give 96 again.',
 task:'Tap the fact that checks 96 ÷ 8 = 12',show:()=>play(5,[()=>pickFact(0)]),
 go:()=>{clean({facts:['12 × 8 = 96','96 × 8 = 768','12 + 8 = 20']});tell('Check 96 divided by 8 equals 12.');controls();s.ok=fin(5,()=>s.pick===0,'12 × 8 = 96, so the division is right.')}},
{h:'Challenge',p:'',go:()=>{clean();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>s.ok()});
const QS=[['23 × 4',92,[[83,'ones'],[82,'carry'],[812,'join']]],['96 ÷ 8',12,[[10,'rem'],[88,'sub'],[768,'mult']]],['34 × 5',170,[[154,'ones'],[150,'carry'],[1520,'join']]],
 ['84 ÷ 4',21,[[20,'rem'],[80,'sub'],[336,'mult']]],['46 × 3',138,[[126,'ones'],[128,'carry'],[1218,'join']]],['75 ÷ 5',15,[[10,'rem'],[70,'sub'],[375,'mult']]]];
function hint(tag,q,a){let m=`Work it through again: ${q} = ${a}.`;
 if(tag==='ones')m=`You multiplied the tens but only added the ones. Multiply both parts: ${q} = ${a}.`;
 if(tag==='carry')m=`You lost the carried ten. Add it to the tens answer: ${q} = ${a}.`;
 if(tag==='join')m=`You wrote two answers side by side. Add the parts instead: ${q} = ${a}.`;
 if(tag==='rem')m=`You stopped after the first chunk. Keep filling until nothing is left: ${q} = ${a}.`;
 if(tag==='sub')m=`That subtracts once. Division counts how many groups fit: ${q} = ${a}.`;
 if(tag==='mult')m=`That multiplies. Dividing makes a smaller answer: ${q} = ${a}.`;
 return m}
function ask(){qn++;const [q,a,bad]=QS[qn%QS.length],opts=[[a,'ok'],...bad.slice(0,2)],r=qn%3;
 tray.innerHTML=`<p><b>What is ${q}?</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=tray.querySelector('.fl-pick');[...opts.slice(r),...opts.slice(0,r)].forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,String(v)).onclick=()=>mark(t,q,a)});tell('Challenge: '+q);Z.redraw()}
function mark(t,q,a){tray.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=tray.querySelector('.fl-fb'),ok=t==='ok';ok?Z.win():Z.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${q} = ${a}.`:'✗ '+hint(t,q,a))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
Z=FK.shell(c,{steps,ratio:.66,tall:1.15,draw,onStep:A=>{tray.hidden=A.step!==6;bar.hidden=A.step===6;controls()},
 init:A=>{const w=c.el('div',{class:'fl-below'},A.below);bar=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);tray=c.el('div',{class:'fl-chal'},A.below);clean();A.gest({down,move,up});controls()}});
Z.start()})})();
