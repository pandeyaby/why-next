/* Flagship – linear equations with one, no or infinitely many solutions (ages 13–15). Each side of an equation is a line;
   a solution is where the lines meet. Simplify both sides: different x-coefficients give exactly one solution, the same
   coefficient with different constants gives a false statement (1 = 5, no solution), and identical sides give an identity
   (6 = 6, every x works). Classify, build each kind by moving a line, test values, then sort harder equations. */
(()=>{
const KIND=['One solution','No solution','Infinitely many'];
const EASY=[{e:'2(x + 3) = 2x + 6',s:'2x + 6 = 2x + 6  →  6 = 6, always true',k:2,L:[2,6],R:[2,6],w:['Subtract 2x from both sides: 6 = 6. No x is left to find, and it is true for every x.','6 = 6 is true, not false. Every x works.']},
 {e:'3x + 1 = 3x + 5',s:'subtract 3x  →  1 = 5, never true',k:1,L:[3,1],R:[3,5],w:['Subtract 3x: 1 = 5. That is false whatever x is, so no x works.','','The x terms cancel, but 1 = 5 is false. Never true means no solution.']},
 {e:'4x − 2 = 2x + 6',s:'2x = 8  →  x = 4',k:0,L:[4,-2],R:[2,6],w:['','4x and 2x are different, so the x terms do not cancel: 2x = 8 gives x = 4.','The sides are different lines with different slopes. They cross once, at x = 4.']}];
const HARD=[{e:'3(x − 2) = 3x − 6',s:'3x − 6 = 3x − 6: identity',k:2,w:['Expand fully: 3 × −2 = −6, so both sides are 3x − 6.','Careful: 3(x − 2) is 3x − 6, not 3x − 2. The sides match.']},
 {e:'4x + 2(x + 1) = 6x + 5',s:'6x + 2 = 6x + 5  →  2 = 5',k:1,w:['Collect like terms: 4x + 2x = 6x. Then 6x cancels and 2 = 5 is false.','','The left is 6x + 2, not 6x + 5. Same slope, different constants: never equal.']},
 {e:'5x − 3 = 2(x + 3)',s:'3x = 9  →  x = 3',k:0,w:['','The right is 2x + 6. 5x and 2x differ, so x does not cancel: x = 3.','5x − 3 and 2x + 6 are different, so they agree at only one x.']},
 {e:'2(2x + 1) = 4x + 1',s:'4x + 2 = 4x + 1  →  2 = 1',k:1,w:['The 4x terms cancel, leaving 2 = 1, which is false.','','Expand: 2 × 1 = 2, so the left is 4x + 2, not 4x + 1. 2 = 1 is false.']},
 {e:'7 − x = −(x − 7)',s:'7 − x = −x + 7: identity',k:2,w:['A minus outside the bracket flips both signs: −(x − 7) = −x + 7, the same as 7 − x.','Watch the sign: −(x − 7) is −x + 7, not −x − 7. The sides match.']}];
const TESTX=[-2,0,3,10];
VIS.reg('flagnsol',c=>{let A,pad,quiz,qn=-1,run=0,row=0;
const fresh=()=>({at:0,got:0,need:3,bad:-1,ok:0,hold:null,a:1,b:0,goal:0,tried:[],after:()=>{},fast:0}),S=fresh();
const mode=()=>['hi','sort1','build','test','sort2','quiz'][A.step];
const q=v=>Math.round(v*(A.narrow?1:1.1)),zip=()=>A.reduced()||S.fast;
const speak=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
function put(g,s,x,y,w,px,col,wt,al){g.font=`${wt||700} ${q(px)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;
 const R=[''];String(s).split(' ').forEach(p=>{const n=R.length-1,t=R[n]?R[n]+' '+p:p;if(R[n]&&g.measureText(t).width>w)R.push(p);else R[n]=t});R.forEach((l,i)=>g.fillText(l,x,y+(i-(R.length-1)/2)*q(px)*1.25))}
function panel(g,r,tone,dash){const C=A.col,h={ok:C.gr,no:C.rd,am:C.am,cy:C.cy,vi:C.vi}[tone];g.save();if(!dash){A.paint.shadow(4,2,.1);g.fillStyle=h?A.mix(C.pn,h,.14):C.pn;A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();A.paint.noShadow()}
 if(dash)g.setLineDash([6,5]);g.lineWidth=h?2.5:1.5;g.strokeStyle=h||C.ln;A.paint.rrect(r.x,r.y,r.w,r.h,9);g.stroke();g.restore()}
const sgn=(a,b)=>`${a===1?'':a===-1?'−':a<0?'−'+(-a):a}${a?'x':''}${b?(a?(b<0?' − ':' + ')+Math.abs(b):(b<0?'−'+(-b):b)):(a?'':'0')}`;
const kindOf=(L,R)=>L[0]!==R[0]?0:L[1]!==R[1]?1:2;
/* a small coordinate grid; each side of the equation drawn as a line y = ax + b */
function plot(g,r,L,R,X0){const C=A.col,xm=6,ym=14,px=x=>r.x+(x+xm)/(2*xm)*r.w,py=y=>r.y+r.h/2-y/ym*r.h/2;g.save();g.beginPath();g.rect(r.x,r.y,r.w,r.h);g.clip();
 g.strokeStyle=A.mix(C.pn,C.ln,.6);g.lineWidth=1;for(let x=-xm;x<=xm;x+=2){g.beginPath();g.moveTo(px(x),r.y);g.lineTo(px(x),r.y+r.h);g.stroke()}
 g.strokeStyle=C.mu;g.beginPath();g.moveTo(r.x,py(0));g.lineTo(r.x+r.w,py(0));g.moveTo(px(0),r.y);g.lineTo(px(0),r.y+r.h);g.stroke();
 const line=([a,b],col,w,d)=>{g.strokeStyle=col;g.lineWidth=w;g.setLineDash(d||[]);g.beginPath();g.moveTo(px(-xm),py(a*-xm+b));g.lineTo(px(xm),py(a*xm+b));g.stroke();g.setLineDash([])};
 const k=kindOf(L,R);line(L,C.cy,4);line(R,k===2?C.am:C.vi,k===2?3:4,k===2?[10,8]:null);
 if(k===0){const x=(R[1]-L[1])/(L[0]-R[0]),y=L[0]*x+L[1];g.fillStyle=C.gr;g.beginPath();g.arc(px(x),py(y),7,0,7);g.fill()}g.restore();panel(g,r,null,1);
 put(g,k===0?`They cross once: x = ${String(+((R[1]-L[1])/(L[0]-R[0])).toFixed(2)).replace('-','−')}`:k===1?'Parallel: they never meet':'Same line: they meet everywhere',r.x+r.w/2,r.y+r.h+q(14),r.w,13,k===0?C.gr:k===1?C.rd:C.am,800)}
const bins=()=>{const g=6,w=(A.W-16-g*2)/3;return KIND.map((t,i)=>({x:8+i*(w+g),y:A.H*.8,w,h:A.H*.17,v:i}))};
const card=()=>{const w=A.W-24,h=q(48),d=S.hold;return d&&d.x!=null?{x:d.x-w/2,y:d.y-h/2,w,h}:{x:12,y:A.H*.04,w,h}};
const set=()=>mode()==='sort1'?EASY:HARD;
const GR=()=>({x:A.W*.08,y:A.H*.2,w:A.W*.84,h:A.H*.46});
const knobs=()=>{const w=(A.W-24-18)/4,y=A.H*.84,h=A.H*.12;return['x −1','x +1','const −1','const +1'].map((t,i)=>({x:12+i*(w+6),y,w,h,t,i}))};
function draw(A){const g=A.ctx,C=A.col,W=A.W,H=A.H,m=mode();
 if(m==='quiz'){put(g,'Simplify both sides. Different x terms: one solution. Same x terms: compare the constants.',W/2,H*.45,W-40,17,C.tx,800);return}
 if(m==='hi'){put(g,'2x + 1 = −x + 7',W/2,H*.07,W,20,C.tx,800);plot(g,{x:W*.1,y:H*.15,w:W*.8,h:H*.58},[2,1],[-1,7]);
  put(g,'Each side is a line. The solution is where the two lines meet.',W/2,H*.9,W-30,15,C.tx,800);return}
 if(m==='sort1'||m==='sort2'){const L=set(),it=L[S.at],done=S.got>=S.need;
  bins().forEach((r,i)=>{panel(g,r,S.bad===i?'no':['cy','vi','am'][i]);put(g,KIND[i],r.x+r.w/2,r.y+r.h/2,r.w-8,13,C.tx,800)});
  if(it&&!S.ok&&!done){const r=card();panel(g,r,'am');put(g,it.e,r.x+r.w/2,r.y+r.h/2,r.w-12,19,C.tx,800);put(g,'Simplify both sides, then drag the equation to a box, or tap a box.',W/2,H*.42,W-24,14,C.mu)}
  else{const p=L[Math.min(S.at,L.length-1)];put(g,p.e,W/2,H*.07,W-24,18,C.tx,800);put(g,'✓ '+p.s,W/2,H*.16,W-24,15,C.gr,800);
   if(m==='sort1')plot(g,{x:W*.1,y:H*.23,w:W*.8,h:H*.44},p.L,p.R);else put(g,KIND[p.k]+'.',W/2,H*.3,W,16,C.tx,800)}}
 if(m==='build'){const L=[2,3],R=[S.a,S.b],done=S.got>=S.need;put(g,`2x + 3 = ${sgn(S.a,S.b)}`,W/2,H*.05,W,20,C.tx,800);
  put(g,done?'✓ You built all three kinds.':`Make: ${KIND[S.goal]}`,W/2,H*.13,W,15,done?C.gr:C.am,800);plot(g,GR(),L,R);
  put(g,'Drag the purple line up or down. Tap to change the x term.',W/2,H*.78,W-20,12,C.mu);
  knobs().forEach(r=>{panel(g,r,'vi');put(g,r.t,r.x+r.w/2,r.y+r.h/2,r.w-6,13,C.tx,800)})}
 if(m==='test'){const E1=[[3,1],[3,5]],E2=[[2,6],[2,6]];put(g,'A:  3x + 1 = 3x + 5',W/2,H*.05,W,17,C.vi,800);put(g,'B:  2(x + 3) = 2x + 6',W/2,H*.12,W,17,C.cy,800);
  const top=H*.2,rh=H*.1;put(g,'x',W*.12,top,40,14,C.mu,800);put(g,'A: left, right',W*.42,top,W*.4,13,C.mu,800);put(g,'B: left, right',W*.78,top,W*.4,13,C.mu,800);
  S.tried.forEach((x,i)=>{const y=top+rh*(i+1),a=[3*x+1,3*x+5],b=[2*(x+3),2*x+6];put(g,String(x).replace('-','−'),W*.12,y,50,15,C.tx,800);
   put(g,`${a[0]}, ${a[1]} ✗`.replace(/-/g,'−'),W*.42,y,W*.4,15,C.rd,800);put(g,`${b[0]}, ${b[1]} ✓`.replace(/-/g,'−'),W*.78,y,W*.4,15,C.gr,800)});
  put(g,S.got>=S.need?'A is always 4 apart: no solution. B always matches: infinitely many.':'Tap an x value to test it in both equations.',W/2,H*.64,W-24,14,S.got>=S.need?C.gr:C.tx,800);
  const T=xs();T.forEach(r=>{panel(g,r,S.tried.includes(r.v)?'ok':'vi');put(g,'x = '+String(r.v).replace('-','−'),r.x+r.w/2,r.y+r.h/2,r.w-6,15,C.tx,800)})}
 A.fx.draw(g)}
const xs=()=>{const w=(A.W-24-18)/4;return TESTX.map((v,i)=>({x:12+i*(w+6),y:A.H*.76,w,h:A.H*.14,v}))};
function nope(t,j){A.sound.miss();S.bad=j;speak(t);setTimeout(()=>{S.bad=-1;A.redraw()},zip()?10:1500);A.redraw()}
function win1(t){S.got++;A.sound.pop();speak(t);keys();A.redraw();S.after()}
function later(f,ms){const r=run,at=S.at;setTimeout(()=>{if(r!==run||S.at!==at||S.got>=S.need)return;f()},zip()?5:ms)}
function nextEq(){S.at++;S.ok=0;speak('Next equation: '+set()[S.at].e);keys();A.redraw()}
function classify(i){const m=mode();if((m!=='sort1'&&m!=='sort2')||S.got>=S.need||S.ok)return;const it=set()[S.at];
 if(i!==it.k){let m=it.w[i]||'Simplify both sides first, then compare the x terms and the constants.';return nope(m,i)}
 S.ok=1;win1(`${it.e}: ${it.s}. ${KIND[i]}.`);later(nextEq,1800)}
function tune(i){if(mode()!=='build'||S.got>=S.need)return;if(i===0)S.a=Math.max(-3,S.a-1);if(i===1)S.a=Math.min(4,S.a+1);if(i===2)S.b=Math.max(-8,S.b-1);if(i===3)S.b=Math.min(10,S.b+1);A.sound.tick();check()}
function check(){const k=kindOf([2,3],[S.a,S.b]);A.redraw();if(k!==S.goal){speak(`2x + 3 = ${sgn(S.a,S.b)}: ${KIND[k].toLowerCase()}. Target: ${KIND[S.goal].toLowerCase()}.`);return}
 const msg=['Different x terms, so the lines cross once.','Same x term, different constant: parallel lines, no solution.','Same x term and same constant: the same line, every x works.'][k];
 S.goal=[1,2,0][S.goal];win1(`${KIND[k]}! ${msg}`+(S.got<S.need?` Now make: ${KIND[S.goal]}.`:''));keys()}
function test(v){if(mode()!=='test'||S.got>=S.need||S.tried.includes(v))return;S.tried.push(v);
 win1(`x = ${v}: A gives ${3*v+1} and ${3*v+5}, never equal. B gives ${2*v+6} on both sides.`)}
function keys(){if(!pad)return;pad.innerHTML='';const m=mode(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=f};
 if(m==='quiz'||m==='hi'||S.got>=S.need)return;
 if((m==='sort1'||m==='sort2')&&!S.ok){const it=set()[S.at];KIND.forEach((t,i)=>B(t,()=>classify(i),`${it.e} has ${t.toLowerCase()}`))}
 if(m==='build')['x term −1','x term +1','constant −1','constant +1'].forEach((t,i)=>B(t,()=>tune(i)));
 if(m==='test')TESTX.filter(v=>!S.tried.includes(v)).forEach(v=>B('Test x = '+String(v).replace('-','−'),()=>test(v)))}
const inR=(p,r,e)=>(e=e||0,p.x>r.x-e&&p.x<r.x+r.w+e&&p.y>r.y-e&&p.y<r.y+r.h+e);
function down(p){const m=mode();if(m==='quiz'||m==='hi'||S.got>=S.need)return false;
 if(m==='build'){const k=knobs().find(r=>inR(p,r));if(k){tune(k.i);return false}if(inR(p,GR())){S.hold={y0:p.y,b0:S.b};return true}return false}
 if(m==='test'){const t=xs().find(r=>inR(p,r));if(t)test(t.v);return false}
 if(S.ok)return false;const b=bins().find(r=>inR(p,r));if(b){classify(b.v);return false}if(inR(p,card(),4)){S.hold={x:null,x0:p.x,y0:p.y};return true}return false}
function move(p){const d=S.hold;if(!d)return;if(mode()==='build'){const nb=Math.max(-8,Math.min(10,d.b0+Math.round((d.y0-p.y)/(GR().h/28))));if(nb!==S.b){S.b=nb;A.sound.tick();A.redraw()}return}
 if(d.x!=null||Math.hypot(p.x-d.x0,p.y-d.y0)>8){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=S.hold;S.hold=null;if(!d)return;if(mode()==='build')return check();const b=bins().find(r=>inR(p,r,8));if(b)return classify(b.v);speak('Drop the equation on a box.');A.redraw()}
const fin=(i,msg)=>()=>{if(A.step===i&&S.got>=S.need&&(!steps[i].predict||A.pred[i]!=null))A.done(msg+A.reveal(i))};
function auto(f){const r=++run,go=()=>{if(r!==run||S.got>=S.need)return;f();setTimeout(go,60)};setTimeout(go,30)}
const reset=()=>{run++;Object.assign(S,fresh())};
function solve(){const m=mode();if((m==='sort1'||m==='sort2')&&!S.ok)return classify(set()[S.at].k);if(m==='test')return test(TESTX.find(v=>!S.tried.includes(v)));
 if(m==='build'){if(S.goal===0)return tune(S.a===2?1:S.a<2?1:0);if(S.a!==2)return tune(S.a<2?1:0);if(S.goal===2)return tune(S.b<3?3:2);if(S.goal===1)return tune(3)}}
const demo=i=>()=>{steps[i].go();S.fast=1;auto(solve)};
const steps=[
{h:'Two sides, two lines',p:'Think of each side of an equation as a line, y = left side and y = right side. A solution is an x where both sides are equal: where the lines meet.',go:()=>{reset();speak('2x + 1 = −x + 7. The lines meet at x = 2.')}},
{h:'Simplify, then look',p:'Expand brackets and collect like terms on each side. Then subtract the x terms. What is left tells you how many solutions there are.',predict:{q:'2(x + 3) = 2x + 6 simplifies to 6 = 6. What does that tell you?',opts:['x = 6','every value of x works'],ans:1},task:'Classify 3 equations',show:demo(1),
 go:()=>{reset();speak('Classify: '+EASY[0].e);keys();S.after=fin(1,'x left over: one solution. A false statement like 1 = 5: none. A true one like 6 = 6: every x.')}},
{h:'Build each kind',p:'The left side is fixed: 2x + 3. Change the right side to make each kind of equation and watch the lines.',predict:{q:'To make no solution, the right side needs…',opts:['a different x term','the same x term, 2x, with a different constant'],ans:1},task:'Build all 3 kinds',show:demo(2),
 go:()=>{reset();S.goal=1;speak('Make an equation with no solution. Drag the purple line or tap the buttons.');keys();S.after=fin(2,'Same slope and different constant: parallel, no solution. Same line: infinitely many. Different slope: they cross once.')}},
{h:'What does 1 = 5 mean?',p:'When the x terms cancel, the statement left over is about every x at once. Test some values to see what it means.',predict:{q:'Solving 3x + 1 = 3x + 5 gives 1 = 5. So…',opts:['x = 0, because x vanished','no value of x works'],ans:1},task:'Test 3 values of x',show:demo(3),
 go:()=>{reset();speak('Tap an x value to test it in both equations.');keys();S.after=fin(3,'A false statement means no x works. A true one, an identity, means every x works.')}},
{h:'Harder ones',p:'Now brackets and negatives. Expand carefully, collect like terms, then decide. A slip in a sign changes the answer.',task:'Sort 5 equations',show:demo(4),
 go:()=>{reset();S.need=5;speak('Classify: '+HARD[0].e);keys();S.after=fin(4,'Expand fully, watch the signs, then compare the x terms and the constants.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.after()});
const QS=[['5x + 2 = 5x − 4 simplifies to 2 = −4. How many solutions?',[['None','ok'],['One: x = −4','xval'],['Infinitely many','same']]],
 ['4(x − 1) = 4x − 4. How many solutions?',[['Infinitely many','ok'],['None, the x terms cancelled','cancel'],['One: x = 0','zero']]],
 ['3x + 7 = x + 1. How many solutions?',[['One','ok'],['None','slope'],['Infinitely many','slope2']]],
 ['Which makes 6x + 1 = 6x + □ have no solution?',[['Any number except 1','ok'],['1','ident'],['0 only','only']]],
 ['On a graph, the two sides are parallel lines. How many solutions?',[['None','ok'],['One','cross'],['Infinitely many','para']]],
 ['After simplifying you get 0 = 0. What is the solution?',[['Every x','ok'],['x = 0','zero2'],['No solution','nosol']]]];
function why(t){let m='Simplify both sides, then compare the x terms and the constants.';
 if(t==='xval')m='The x terms cancelled, so −4 is not a value of x. 2 = −4 is false: no solution.';if(t==='same')m='2 = −4 is false, not true. A false statement means no solution.';
 if(t==='cancel')m='Cancelling x is fine; look at what is left: −4 = −4 is true, so every x works.';if(t==='zero')m='x = 0 works, but so does every other x. Both sides are identical.';
 if(t==='slope')m='3x and x are different, so x does not cancel: 2x = −6 gives x = −3.';if(t==='slope2')m='The sides are different lines. They cross once, at x = −3.';
 if(t==='ident')m='With 1 the sides are identical, which gives infinitely many solutions.';if(t==='only')m='Any constant other than 1 gives parallel lines, not just 0.';
 if(t==='cross')m='Parallel lines never cross, so no x makes the sides equal.';if(t==='para')m='Infinitely many needs the same line. Parallel lines are apart everywhere.';
 if(t==='zero2')m='0 = 0 is true for every x, not only x = 0. It is an identity.';if(t==='nosol')m='0 = 0 is true. A false statement like 0 = 3 would mean no solution.';return m}
function ask(){qn++;const [qq,ops]=QS[qn%QS.length],r=qn%3;quiz.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},box,o);b.onclick=()=>mark(t)});speak('Challenge: '+qq);A.redraw()}
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok){row++;A.win()}else{row=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Yes!':'✗ '+why(t)}${ok?` Right in a row: ${row}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.7,tall:1.25,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});keys()}});
A.start()})})();
