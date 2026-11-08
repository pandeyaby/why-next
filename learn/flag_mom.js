/* Flagship: Momentum (ages 14–16; AQA GCSE Physics 4.5.7.1: momentum = mass × velocity, p = m v, in kg m/s;
   NGSS HS-PS2-2). Drag a velocity arrow and watch the signed momentum bar respond: match a target, make a slow truck
   match a fast cyclist, send a cart backwards to see momentum as a vector, double the speed to see p double (not ×4),
   and convert grams before multiplying. Not flagkeq/flagkemv (kinetic energy ½mv²) or flagcoll (reaction rates). */
(()=>{
VIS.reg('flagmom',c=>{let M,keys,quiz,qi=-1,tok=0;const w={};
const stage=()=>['set','truck','vec','dbl','unit','quiz'][M.step];
function say(t){c.say(t);if(M)M.cv.setAttribute('aria-label',t)}
function lab(t,x,y,px,o){o=o||{};const g=M.ctx;g.font=`${o.b||600} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.ink||M.col.tx;g.fillText(String(t),x,y,o.max||M.W-8)}
const fmt=x=>{const r=Math.round(x*100)/100;return(Math.abs(r)>=1000?r.toLocaleString('en-GB'):String(r)).replace('-','−')};
const lane=i=>M.H*(.25+i*.35);
const mid=()=>M.W*(w.mx||.5),vsOf=b=>b.vs||w.vs;
/* one moving body per lane: cart, velocity arrow (drag the tip), and a signed momentum bar under it */
function drawBody(b,i){const C=M.col,g=M.ctx,y=lane(i),cx=mid(),bw=Math.min(M.W*.24,34+14*Math.log10(b.m*1000+1)),bh=M.H*.09;
 g.strokeStyle=M.alpha(C.tx,.3);g.lineWidth=1;g.beginPath();g.moveTo(8,y+bh/2+4);g.lineTo(M.W-8,y+bh/2+4);g.stroke();
 g.fillStyle=M.alpha(b.col(C),.55);M.paint.rrect(cx-bw/2,y-bh/2,bw,bh,8);g.fill();g.strokeStyle=C.tx;g.lineWidth=1.5;g.stroke();
 lab(b.name,cx,y,M.narrow?11:13,{b:800,max:bw-4});
 const ax=cx+b.v*vsOf(b),dir=Math.sign(b.v)||1;if(Math.abs(b.v)>1e-9){g.strokeStyle=C.rd;g.lineWidth=4;g.beginPath();g.moveTo(cx+dir*bw/2,y-bh*.9);g.lineTo(ax,y-bh*.9);g.stroke();
  g.beginPath();g.moveTo(ax,y-bh*.9);g.lineTo(ax-dir*10,y-bh*.9-7);g.lineTo(ax-dir*10,y-bh*.9+7);g.closePath();g.fillStyle=C.rd;g.fill()}
 if(!b.lock)M.paint.ball(ax,y-bh*.9,10,C.rd);
 lab(`v = ${fmt(b.v)} m/s`,ax,y-bh*.9-18,M.narrow?11:12,{b:700});
 const p=b.m*b.v,by=y+bh/2+M.H*.06,len=p*w.ps;g.fillStyle=M.alpha(p<0?C.vi:C.gr,.6);g.fillRect(Math.min(cx,cx+len),by-8,Math.abs(len),16);
 g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.moveTo(cx,by-12);g.lineTo(cx,by+12);g.stroke();
 lab(`p = ${fmt(b.m)} kg × ${fmt(b.v)} m/s = ${fmt(p)} kg m/s`,M.W/2,by+M.H*.055,M.narrow?12:14,{b:800})}
function drawUnit(){const C=M.col;lab('A 500 g ball moves at 4 m/s. Its momentum is…',M.W/2,M.H*.08,M.narrow?13:16,{b:800});
 w.opts.forEach((o,i)=>{const r=box(i);M.ctx.fillStyle=w.pick===i?M.alpha(i===w.ans?C.gr:C.rd,.32):M.alpha(C.tx,.06);M.paint.rrect(r.x,r.y,r.w,r.h,10);M.ctx.fill();M.ctx.strokeStyle=C.tx;M.ctx.lineWidth=w.pick===i?3:1.5;M.ctx.stroke();lab(o,M.W/2,r.y+r.h/2,M.narrow?15:17,{b:800})});
 lab(w.note||'500 g = 0.5 kg. Change to kilograms before you multiply.',M.W/2,M.H*.9,M.narrow?12:14,{ink:C.mu,max:M.W*.94})}
const box=i=>({x:M.W*.08,y:M.H*(.2+i*.2),w:M.W*.84,h:M.H*.15});
function draw(A){const C=A.col;A.ctx.fillStyle=A.mix(C.pn,'#dbeafe',C.dark?.06:.4);A.ctx.fillRect(0,0,A.W,A.H);const k=stage();
 if(k==='unit')drawUnit();else if(k==='quiz'){lab('p = m × v',A.W/2,A.H*.38,A.narrow?26:32,{b:900});lab('kg × m/s = kg m/s · direction gives the sign',A.W/2,A.H*.56,A.narrow?12:14,{ink:C.mu})}
 else{lab(w.head,A.W/2,A.H*.05,A.narrow?13:16,{b:800});w.bodies.forEach(drawBody);if(w.total){const t=w.bodies.reduce((s,b)=>s+b.m*b.v,0);lab(`total momentum = ${fmt(t)} kg m/s`,A.W/2,A.H*.93,A.narrow?14:16,{b:900})}}
 A.fx.draw(A.ctx)}
const green=C=>C.gr,blue=C=>C.cy,amber=C=>C.am;
function scene(o){tok++;for(const k in w)delete w[k];Object.assign(w,{bodies:[],vs:20,ps:10,head:'',total:false,opts:[],pick:null,ans:0,note:'',grab:null,ok:()=>{}},o||{})}
const pass=(i,cond,msg)=>()=>{if(M.step===i&&cond()&&(!steps[i].predict||M.pred[i]!=null)&&!M.isDone)M.done(msg+M.reveal(i))};
function demo(i,acts){steps[i].go();const t=tok;acts.forEach((f,j)=>setTimeout(()=>{if(t===tok)f()},M.reduced()?20*(j+1):240*(j+1)))}
/* set a body's velocity, snapped to its step and clamped to its range */
function setV(i,v){const b=w.bodies[i];if(!b||b.lock)return;b.v=Math.max(b.lo,Math.min(b.hi,Math.round(v/b.st)*b.st));b.v=Math.round(b.v*100)/100;
 say(`${b.name}: ${fmt(b.m)} kg at ${fmt(b.v)} m/s, momentum ${fmt(b.m*b.v)} kg m/s.`);M.redraw();w.ok()}
function pickUnit(i){w.pick=i;const ok=i===w.ans;ok?M.sound.pop():M.sound.miss();w.note=w.why[i];say(w.note);M.redraw();w.ok()}
function controls(){if(!keys)return;keys.innerHTML='';const k=stage(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn sm','aria-label':l||t},keys,t).onclick=f};
 if(k==='unit')w.opts.forEach((o,i)=>b(o,()=>pickUnit(i),'Answer '+o));
 else if(k!=='quiz')w.bodies.forEach((x,i)=>{if(x.lock)return;b(`◀ ${x.name}`,()=>setV(i,x.v-x.st),`${x.name}: less velocity to the right`);b(`${x.name} ▶`,()=>setV(i,x.v+x.st),`${x.name}: more velocity to the right`)})}
function down(p){const k=stage();if(k==='quiz')return false;
 if(k==='unit'){const i=[0,1,2].find(j=>{const r=box(j);return p.y>=r.y&&p.y<=r.y+r.h});if(i!=null)pickUnit(i);return i!=null}
 const i=w.bodies.findIndex((b,j)=>!b.lock&&Math.abs(p.y-lane(j))<M.H*.16);if(i<0)return false;w.grab=i;setV(i,(p.x-mid())/vsOf(w.bodies[i]));return true}
function move(p){if(w.grab!=null)setV(w.grab,(p.x-mid())/vsOf(w.bodies[w.grab]))}
function up(){w.grab=null}
const cart=(name,m,v,o)=>Object.assign({name,m,v,lo:-10,hi:10,st:.5,lock:false,col:green},o||{});
const steps=[
{h:'Momentum is mass × velocity',p:'Momentum p = m × v. Mass in kilograms times velocity in metres per second gives kilogram metres per second, kg m/s.',
 predict:{q:'Which has more momentum: 2 kg at 6 m/s or 4 kg at 3 m/s?',opts:['The 2 kg cart: it is faster','The 4 kg cart: it is heavier','They are the same'],ans:2},
 task:'Drag the arrow until the 2 kg cart has 12 kg m/s',show:()=>demo(0,[()=>setV(0,3),()=>setV(0,6)]),
 go:()=>{scene({head:'Drag the red arrow tip',vs:M.W*.045,ps:M.W*.016,bodies:[cart('2 kg cart',2,1.5,{lo:0,hi:9}),cart('4 kg cart',4,3,{lock:true,col:blue})]});say('Two carts. Drag the arrow of the 2 kilogram cart.');controls();
  w.ok=pass(0,()=>Math.abs(w.bodies[0].v-6)<1e-6,'2 × 6 = 12 kg m/s, the same as 4 × 3. Mass and velocity both count.')}},
{h:'Slow but heavy',p:'A 70 kg cyclist at 10 m/s has 700 kg m/s. A 2000 kg truck creeping at just 1 m/s already has 2000 kg m/s. At 5 m/s it would have 10\u00a0000.',
 predict:{q:'The truck creeps at 1 m/s; the cyclist rides at 10 m/s. Who has more momentum?',opts:['The cyclist: 10 times faster','The truck','The same'],ans:1},
 task:'Slow the truck until its momentum matches the cyclist',show:()=>demo(1,[()=>setV(1,.6),()=>setV(1,.35)]),
 go:()=>{scene({head:'Truck vs cyclist',mx:.15,vs:M.W*.06,ps:M.W*.00035,bodies:[cart('cyclist',70,10,{lock:true,col:amber}),cart('truck',2000,1,{lo:0,hi:1,st:.05,col:blue,vs:M.W*.6})]});say('The truck creeps at 1 metre per second. Slow it down until it matches the cyclist.');controls();
  w.ok=pass(1,()=>Math.abs(w.bodies[1].v-.35)<1e-6,'2000 × 0.35 = 700 kg m/s. A slow truck can carry as much momentum as a fast bike.')}},
{h:'Direction gives the sign',p:'Momentum is a vector: it has a direction. Pick right as positive. A cart moving left has negative velocity, so negative momentum.',
 predict:{q:'1 kg at +3 m/s and 1 kg at −3 m/s. Total momentum?',opts:['6 kg m/s','0 kg m/s','It can’t be added'],ans:1},
 task:'Send cart B left so the total momentum is zero',show:()=>demo(2,[()=>setV(1,0),()=>setV(1,-2)]),
 go:()=>{scene({head:'Right is positive',vs:M.W*.045,ps:M.W*.03,total:true,bodies:[cart('cart A 2 kg',2,2,{lock:true}),cart('cart B 2 kg',2,2,{lo:-6,hi:6})]});say('Cart B moves right. Drag its arrow to the left.');controls();
  w.ok=pass(2,()=>Math.abs(w.bodies[1].v+2)<1e-6,'+4 and −4 kg m/s add to 0. Opposite directions cancel.')}},
{h:'Double the speed',p:'p = m × v is a straight-line relation: double v and p doubles. Kinetic energy, ½mv², is the one that goes up four times.',
 predict:{q:'A 2 kg cart goes from 3 m/s to 6 m/s. Its momentum…',opts:['doubles','goes up 4 times','stays the same'],ans:0},
 task:'Double the cart’s speed from 3 m/s to 6 m/s',show:()=>demo(3,[()=>setV(0,4.5),()=>setV(0,6)]),
 go:()=>{scene({head:'Before (top) and after (bottom)',vs:M.W*.045,ps:M.W*.016,bodies:[cart('after',2,3,{lo:0,hi:9}),cart('before',2,3,{lock:true,col:blue})]});say('Drag the top cart to twice the speed.');controls();
  w.ok=pass(3,()=>Math.abs(w.bodies[0].v-6)<1e-6,'6 kg m/s became 12 kg m/s: twice as much, not four times.')}},
{h:'Kilograms first',p:'Mass must be in kilograms. 500 g = 0.5 kg, so p = 0.5 × 4 = 2 kg m/s. Using 500 gives an answer 1000 times too big.',
 task:'Tap the right momentum for the 500 g ball',show:()=>demo(4,[()=>pickUnit(0)]),
 go:()=>{scene({opts:['2 kg m/s','2000 kg m/s','8 J'],ans:0,why:['Right: 0.5 kg × 4 m/s = 2 kg m/s.','2000 comes from using 500 g as if it were 500 kg. Change grams to kilograms first.','J is the unit of energy, and ½ × 0.5 × 4² is 4 J anyway. Momentum is in kg m/s.']});say('A 500 gram ball at 4 metres per second.');controls();
  w.ok=pass(4,()=>w.pick===0,'0.5 × 4 = 2 kg m/s.')}},
{h:'Challenge',p:'',go:()=>{scene();next()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>w.ok()});
const BANK=[['a 2000 kg truck at 5 m/s',10000,[[2005,'add'],[25000,'ke']]],['a 500 g ball at 8 m/s',4,[[4000,'gram'],[16,'ke']]],
 ['a 3 kg cart at −4 m/s (moving left)',-12,[[12,'sign'],[24,'ke']]],['a 1200 kg car at 15 m/s',18000,[[80,'div'],[1215,'add']]],
 ['a 2 kg cart whose speed doubles from 3 to 6 m/s (new value)',12,[[24,'sq'],[6,'same']]],['a 60 kg runner at 7 m/s',420,[[67,'add'],[1470,'ke']]]];
function why(tag,q,a){let m=`p = m × v, so the answer is ${fmt(a)} kg m/s.`;
 if(tag==='add')m=`Momentum multiplies mass by velocity; it does not add them. ${fmt(a)} kg m/s.`;
 if(tag==='ke')m=`That is ½mv², the kinetic energy (in J). Momentum is m × v = ${fmt(a)} kg m/s.`;
 if(tag==='gram')m=`Change grams to kilograms first: 500 g = 0.5 kg, so ${fmt(a)} kg m/s.`;
 if(tag==='sign')m=`Direction matters: a velocity to the left is negative, so the momentum is ${fmt(a)} kg m/s.`;
 if(tag==='div')m=`Dividing mass by speed is not momentum. Multiply: ${fmt(a)} kg m/s.`;
 if(tag==='sq')m=`p is proportional to v, not v². Doubling v doubles p: ${fmt(a)} kg m/s.`;
 if(tag==='same')m=`Mass is the same but velocity doubled, so p doubles to ${fmt(a)} kg m/s.`;
 return m}
function next(){qi++;const [q,a,bad]=BANK[qi%BANK.length],opts=[[a,'ok'],...bad],r=qi%3;
 quiz.innerHTML=`<p><b>Momentum of ${q}?</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');[...opts.slice(r),...opts.slice(0,r)].forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,fmt(v)+(t==='ke'?' J':' kg m/s')).onclick=()=>judge(t,q,a)});say('Challenge: momentum of '+q);M.redraw()}
function judge(t,q,a){quiz.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';ok?M.win():M.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: p = ${fmt(a)} kg m/s.`:'✗ '+why(t,q,a))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
M=FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:A=>{quiz.hidden=A.step!==5;keys.hidden=A.step===5;controls()},
 init:A=>{const d=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Velocity controls'},d);quiz=c.el('div',{class:'fl-chal'},A.below);scene({bodies:[]});A.gest({down,move,up});controls()}});
M.start()})})();
