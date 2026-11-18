/* Flagship: Domain and range (ages 14–16; CCSS F-IF.1 and F-IF.5; GCSE/A-level functions). Domain = the inputs a
   function accepts; range = the outputs it actually produces. Feed √x a negative and watch it jam; squash a graph onto
   the x-axis for its domain and onto the y-axis for its range (the vertex, not the endpoints, sets the minimum); cut a
   projectile model to 0 ≤ t ≤ 4 where the ball lands; find the hole at x = 2 in 1/(x − 2); keep ticket costs as dots.
   Not flagoddev (symmetry), flagexpg (exponential graphs) or flagdomain (subject vocabulary). */
(()=>{
VIS.reg('flagdomrng',c=>{let A,ui,ch,qi=-1,gen=0;const S={};
const part=()=>['machine','dom','rng','ball','hole','dots','chal'][A.step];
function note(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function put(s,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.b||600} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.ink||A.col.tx;g.fillText(String(s),x,y,o.max||A.W-10)}
function wrap(s,x,y,px,o){o=o||{};const g=A.ctx,mw=o.max||A.W*.92;g.font=`${o.b||600} ${px}px system-ui,sans-serif`;const L=[];let cur='';
 for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(g.measureText(t).width>mw&&cur){L.push(cur);cur=w}else cur=t}L.push(cur);const lh=px*1.3;L.forEach((l,i)=>put(l,x,y-(L.length-1)*lh/2+i*lh,px,{...o,max:mw}))}
const sz=()=>A.narrow?13:15;
/* a plotting window: world box -> canvas box */
let V={x0:-4,x1:6,y0:-3,y1:10};const P={l:.1,r:.95,t:.1,b:.72};
const X=x=>A.W*(P.l+(P.r-P.l)*(x-V.x0)/(V.x1-V.x0)),Y=y=>A.H*(P.b-(P.b-P.t)*(y-V.y0)/(V.y1-V.y0));
function axes(stepX,stepY){const g=A.ctx,C=A.col;g.strokeStyle=A.alpha(C.tx,.12);g.lineWidth=1;
 for(let x=Math.ceil(V.x0/stepX)*stepX;x<=V.x1;x+=stepX){g.beginPath();g.moveTo(X(x),Y(V.y0));g.lineTo(X(x),Y(V.y1));g.stroke()}
 for(let y=Math.ceil(V.y0/stepY)*stepY;y<=V.y1;y+=stepY){g.beginPath();g.moveTo(X(V.x0),Y(y));g.lineTo(X(V.x1),Y(y));g.stroke()}
 g.strokeStyle=C.tx;g.lineWidth=1.6;g.beginPath();g.moveTo(X(V.x0),Y(0));g.lineTo(X(V.x1),Y(0));g.moveTo(X(0),Y(V.y0));g.lineTo(X(0),Y(V.y1));g.stroke();
 for(let x=Math.ceil(V.x0/stepX)*stepX;x<=V.x1;x+=stepX)if(x)put(x,X(x),Y(0)+12,A.narrow?10:12,{ink:C.mu});
 for(let y=Math.ceil(V.y0/stepY)*stepY;y<=V.y1;y+=stepY)if(y)put(y,X(0)-12,Y(y),A.narrow?10:12,{ink:C.mu})}
function curve(f,a,b,col,w){const g=A.ctx;g.save();g.beginPath();g.rect(X(V.x0),Y(V.y1),X(V.x1)-X(V.x0),Y(V.y0)-Y(V.y1));g.clip();g.strokeStyle=col;g.lineWidth=w||3;g.beginPath();let on=false;for(let i=0;i<=240;i++){const x=a+(b-a)*i/240,y=f(x);if(!isFinite(y)||y<V.y0-5||y>V.y1+5){on=false;continue}on?g.lineTo(X(x),Y(y)):g.moveTo(X(x),Y(y));on=true}g.stroke();g.restore()}
function dot(x,y,col,open){const g=A.ctx;g.beginPath();g.arc(X(x),Y(y),5,0,7);g.fillStyle=open?A.col.pn:col;g.fill();g.strokeStyle=col;g.lineWidth=2;g.stroke()}
function band(axis,a,b,col){const g=A.ctx;g.fillStyle=A.alpha(col,.35);if(axis==='x')g.fillRect(X(a),Y(0)-6,X(b)-X(a),12);else g.fillRect(X(0)-6,Y(b),12,Y(a)-Y(b))}
/* step 0: a √x machine */
const INS=[9,4,0,-4],inBox=i=>({x:A.W*(.06+i*.23),y:A.H*.08,w:A.W*.19,h:A.H*.14});
function drawMachine(){const g=A.ctx,C=A.col;INS.forEach((v,i)=>{const r=inBox(i),used=S.fed.includes(v);g.fillStyle=used?A.alpha(v<0?C.rd:C.gr,.25):A.alpha(C.ac,.15);A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=C.tx;g.stroke();put('x = '+v,r.x+r.w/2,r.y+r.h/2,A.narrow?15:18,{b:800})});
 const m={x:A.W*.3,y:A.H*.34,w:A.W*.4,h:A.H*.2};g.fillStyle=A.alpha(S.jam?C.rd:C.vi,.25);A.paint.rrect(m.x,m.y,m.w,m.h,14);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();put('f(x) = √x',m.x+m.w/2,m.y+m.h/2,A.narrow?18:22,{b:800});
 put('outputs: '+(S.outs.length?S.outs.join(', '):'—'),A.W/2,A.H*.64,A.narrow?15:18,{b:700});wrap(S.msg||'Tap an input to feed it in',A.W/2,A.H*.82,sz(),{ink:C.mu})}
/* steps 1–2: g(x) = x² − 1 on −2 ≤ x ≤ 3 */
const q=x=>x*x-1;
function drawGraph(){const C=A.col;V={x0:-4,x1:5,y0:-3,y1:10};axes(1,2);curve(q,-2,3,C.ac);dot(-2,3,C.ac);dot(3,8,C.ac);
 if(S.dom)band('x',-2,3,C.gr);if(S.rng){band('y',-1,8,C.am);dot(0,-1,C.am)}
 put('g(x) = x² − 1,  −2 ≤ x ≤ 3',A.W/2,A.H*.05,A.narrow?14:17,{b:800});wrap(S.msg||(part()==='dom'?'Squash the graph onto the x-axis':'Squash the graph onto the y-axis'),A.W/2,A.H*.86,sz(),{ink:C.mu})}
/* step 3: h(t) = 20t − 5t² metres */
const h=t=>20*t-5*t*t;
function drawBall(){const C=A.col;V={x0:-.5,x1:6,y0:-30,y1:25};axes(1,10);curve(h,0,6,A.alpha(C.tx,.25),2);curve(h,0,S.tEnd,C.ac,3.5);dot(0,0,C.ac);dot(S.tEnd,h(S.tEnd),S.tEnd===4?C.gr:C.rd);
 put('h(t) = 20t − 5t²',A.W/2,A.H*.05,A.narrow?14:17,{b:800});put(`t = ${S.tEnd.toFixed(1)} s, h = ${h(S.tEnd).toFixed(1)} m`,A.W/2,A.H*.78,A.narrow?14:16,{b:700,ink:h(S.tEnd)<0?C.rd:C.tx});
 wrap(S.msg||'Drag the end of the path to where the ball lands',A.W/2,A.H*.9,sz(),{ink:C.mu})}
/* step 4: 1/(x − 2) */
const r=x=>1/(x-2);
function drawHole(){const C=A.col,g=A.ctx;V={x0:-3,x1:7,y0:-8,y1:8};axes(1,2);curve(r,-3,1.98,C.ac);curve(r,2.02,7,C.ac);g.setLineDash([6,5]);g.strokeStyle=C.rd;g.beginPath();g.moveTo(X(2),Y(-8));g.lineTo(X(2),Y(8));g.stroke();g.setLineDash([]);
 const y=r(S.x);put('f(x) = 1 / (x − 2)',A.W/2,A.H*.05,A.narrow?14:17,{b:800});if(isFinite(y)&&Math.abs(y)<=8)dot(S.x,y,C.vi);
 put(S.x===2?'x = 2: 1 ÷ 0 has no value':`x = ${S.x.toFixed(2)}, f(x) = ${y.toFixed(2)}`,A.W/2,A.H*.78,A.narrow?14:16,{b:700,ink:S.x===2?C.rd:C.tx});wrap(S.msg||'Slide x towards 2',A.W/2,A.H*.9,sz(),{ink:C.mu})}
/* step 5: C(n) = 12n for whole n from 0 to 8 */
function drawDots(){const C=A.col,g=A.ctx;V={x0:-.5,x1:9,y0:-10,y1:110};axes(1,20);if(S.joined){g.strokeStyle=A.alpha(C.rd,.7);g.lineWidth=2;g.beginPath();g.moveTo(X(0),Y(0));g.lineTo(X(8),Y(96));g.stroke()}
 for(let n=0;n<=8;n++)dot(n,12*n,C.ac);put('C(n) = 12n pounds for n tickets',A.W/2,A.H*.05,A.narrow?14:17,{b:800});wrap(S.msg||'Should the dots be joined?',A.W/2,A.H*.86,sz(),{ink:C.mu})}
function draw(Q){const C=Q.col;Q.ctx.fillStyle=Q.mix(C.pn,'#ede9fe',C.dark?.05:.35);Q.ctx.fillRect(0,0,Q.W,Q.H);
 ({machine:drawMachine,dom:drawGraph,rng:drawGraph,ball:drawBall,hole:drawHole,dots:drawDots}[part()]||(()=>wrap(S.q||'Allowed inputs, possible outputs',Q.W/2,Q.H*.42,Q.narrow?18:22,{b:800})))()}
function init(o){gen++;for(const k in S)delete S[k];Object.assign(S,{fed:[],outs:[],jam:false,dom:false,rng:false,pick:null,tEnd:5,x:0,hit2:false,joined:false,msg:'',q:'',ok:()=>{}},o||{})}
const doneIf=(i,cond,msg)=>()=>{if(A.step===i&&cond()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function auto(i,acts){steps[i].go();const t=gen;acts.forEach((f,j)=>setTimeout(()=>{if(t===gen)f()},A.reduced()?25*(j+1):450*(j+1)))}
const say=(m,good)=>{good?A.sound.pop():A.sound.miss();S.msg=m;note(m);A.redraw();buttons();S.ok()};
function feed(v){if(S.fed.includes(v))return;S.fed.push(v);if(v<0){S.jam=true;say('√(−4) has no real value. Negative inputs are not in the domain.',false);S.ok()}else{S.jam=false;S.outs.push(Math.sqrt(v));say(`√${v} = ${Math.sqrt(v)}. Allowed.`,true)}}
function squash(axis){if(axis==='x'){S.dom=true;say('The shadow on the x-axis runs from −2 to 3.',true)}else{S.rng=true;say('The shadow on the y-axis runs from −1 (the vertex) to 8.',true)}}
function pick(v,good,m){S.pick=v;say(m,good)}
function setT(t){S.tEnd=Math.max(.5,Math.min(6,Math.round(t*10)/10));S.msg=h(S.tEnd)<0?'Negative height: the ball would be underground. Too far.':S.tEnd<4?'The ball is still in the air here.':'';if(S.tEnd===4)S.msg='h(4) = 0: the ball lands. Domain 0 ≤ t ≤ 4.';note(S.msg||`t = ${S.tEnd}`);A.redraw();buttons();S.ok()}
function setX(x){S.x=Math.round(x*100)/100;if(Math.abs(S.x-2)<.005){S.x=2;S.hit2=true;S.msg='Division by zero. x = 2 is not in the domain.'}else S.msg=Math.abs(S.x-2)<.3?'Close to 2 the output shoots off. It never reaches a value at 2.':'';note(S.msg||`x = ${S.x}`);A.redraw();buttons();S.ok()}
function join(){S.joined=true;say('A line would mean 2.5 tickets cost £30. You cannot buy half a ticket.',false)}
function buttons(){if(!ui)return;ui.innerHTML='';const k=part(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ui,t).onclick=f};
 if(k==='machine')INS.forEach(v=>{if(!S.fed.includes(v))b('Feed x = '+v,()=>feed(v))});
 if(k==='dom'){if(!S.dom)b('Squash onto x-axis',()=>squash('x'));else if(S.pick!=='a')[['−2 ≤ x ≤ 3','a'],['−1 ≤ x ≤ 8','b'],['all real x','c']].forEach(([t,v])=>b(t,()=>pick(v,v==='a',v==='a'?'Domain: −2 ≤ x ≤ 3.':v==='b'?'Those are y-values. The domain is about x.':'The graph stops at −2 and 3.')))}
 if(k==='rng'){if(!S.rng)b('Squash onto y-axis',()=>squash('y'));else if(S.pick!=='a')[['3 ≤ y ≤ 8','e'],['−1 ≤ y ≤ 8','a'],['−2 ≤ y ≤ 3','x']].forEach(([t,v])=>b(t,()=>pick(v,v==='a',v==='a'?'Range: −1 ≤ y ≤ 8. The lowest point is the vertex.':v==='e'?'3 and 8 are the endpoint outputs, but the graph dips to −1 at x = 0.':'Those are the x-limits. The range is about y.')))}
 if(k==='ball'){b('t − 0.5',()=>setT(S.tEnd-.5),'Move the end earlier by 0.5 s');b('t + 0.5',()=>setT(S.tEnd+.5),'Move the end later by 0.5 s')}
 if(k==='hole'){b('x − 0.5',()=>setX(S.x-.5));b('x + 0.5',()=>setX(S.x+.5));if(S.hit2&&S.pick!=='a')[['x ≠ 2','a'],['x ≠ 0','b'],['x > 2','c']].forEach(([t,v])=>b('Domain: '+t,()=>pick(v,v==='a',v==='a'?'Domain: all real x except 2.':v==='b'?'x = 0 gives 1/(−2) = −0.5, which is fine.':'Values below 2 work too, e.g. f(1) = −1.')))}
 if(k==='dots'){if(!S.joined)b('Join the dots',join);if(S.pick!=='a')[['n = 0, 1, 2, …, 8','a'],['0 ≤ n ≤ 8, any value','b']].forEach(([t,v])=>b('Domain: '+t,()=>pick(v,v==='a',v==='a'?'Whole numbers only, so the graph is dots. Range: 0, 12, 24, …, 96.':'n = 2.5 is not possible: tickets come whole.')))}}
let held=false;
function down(p){const k=part();if(k==='machine'){const i=INS.findIndex((v,j)=>p.x>=inBox(j).x&&p.x<=inBox(j).x+inBox(j).w&&p.y>=inBox(j).y&&p.y<=inBox(j).y+inBox(j).h);if(i>=0){feed(INS[i]);return true}return false}
 if(k==='dom'&&!S.dom&&p.y<A.H*.75){squash('x');return true}if(k==='rng'&&!S.rng&&p.y<A.H*.75){squash('y');return true}
 if((k==='ball'||k==='hole')&&p.y<A.H*.75){held=true;move(p);return true}return false}
function move(p){if(!held)return;const w=V.x0+(p.x/A.W-P.l)/(P.r-P.l)*(V.x1-V.x0);part()==='ball'?setT(w):setX(Math.abs(w-2)<.08?2:w)}
function up(){held=false}
const steps=[
{h:'Allowed inputs',p:'The domain is the set of inputs a function accepts. Feed each input into f(x) = √x.',
 predict:{q:'Which input has no real output for f(x) = √x?',opts:['0','−4','9'],ans:1},
 task:'Feed all four inputs',show:()=>auto(0,[()=>feed(9),()=>feed(4),()=>feed(0),()=>feed(-4)]),
 go:()=>{init();note('A square-root machine and four inputs.');buttons();S.ok=doneIf(0,()=>S.fed.length===4,'Domain of √x: x ≥ 0. Outputs are never negative either, so the range is y ≥ 0.')}},
{h:'Domain from a graph',p:'Squash the graph flat onto the x-axis. The shadow it leaves is the domain.',
 task:'Squash onto the x-axis and pick the domain',show:()=>auto(1,[()=>squash('x'),()=>pick('a',true,'Domain: −2 ≤ x ≤ 3.')]),
 go:()=>{init();note('A parabola drawn from x = −2 to x = 3.');buttons();S.ok=doneIf(1,()=>S.pick==='a','The domain is every x the graph covers: −2 ≤ x ≤ 3.')}},
{h:'Range from a graph',p:'Squash it onto the y-axis. The range is every output the graph reaches, not just the ends.',
 predict:{q:'x runs from −2 to 3, and g(−2) = 3, g(3) = 8. What is the range?',opts:['3 ≤ y ≤ 8','−1 ≤ y ≤ 8','All real y'],ans:1},
 task:'Squash onto the y-axis and pick the range',show:()=>auto(2,[()=>squash('y'),()=>pick('a',true,'Range: −1 ≤ y ≤ 8. The lowest point is the vertex.')]),
 go:()=>{init();note('The same parabola. Find its outputs.');buttons();S.ok=doneIf(2,()=>S.pick==='a','The vertex (0, −1) sets the minimum, so the range is −1 ≤ y ≤ 8.')}},
{h:'The context decides',p:'A ball is thrown up: h(t) = 20t − 5t² metres after t seconds. The formula works for any t. The ball does not.',
 predict:{q:'Is t = 5 in a sensible domain for this model?',opts:['Yes, any t works in the formula','No, the ball lands at t = 4','No, t must be under 1'],ans:1},
 task:'Set the end of the path to the landing time',show:()=>auto(3,[()=>setT(4.5),()=>setT(4)]),
 go:()=>{init();note('The ball path drawn to t = 5. It goes below the ground.');buttons();S.ok=doneIf(3,()=>S.tEnd===4,'Domain 0 ≤ t ≤ 4. The top is h(2) = 20, so the range is 0 ≤ h ≤ 20.')}},
{h:'A value that breaks it',p:'Dividing by zero has no answer. Slide x towards 2 in f(x) = 1/(x − 2).',
 predict:{q:'Which x is not allowed in f(x) = 1/(x − 2)?',opts:['0','2','−2'],ans:1},
 task:'Reach x = 2, then pick the domain',show:()=>auto(4,[()=>setX(1),()=>setX(1.5),()=>setX(2),()=>pick('a',true,'Domain: all real x except 2.')]),
 go:()=>{init();note('A graph with a dashed line at x = 2.');buttons();S.ok=doneIf(4,()=>S.hit2&&S.pick==='a','Domain: x ≠ 2. The output is never 0 either, so the range is y ≠ 0.')}},
{h:'Whole numbers only',p:'Tickets cost £12 each. You can buy 0 to 8 of them. Can you buy 2.5?',
 task:'Pick the domain for the tickets',show:()=>auto(5,[join,()=>pick('a',true,'Whole numbers only.')]),
 go:()=>{init();note('Nine dots for 0 to 8 tickets.');buttons();S.ok=doneIf(5,()=>S.pick==='a','Domain: n = 0, 1, …, 8. Range: 0, 12, 24, …, 96 pounds. A discrete domain gives dots.')}},
{h:'Challenge',p:'',go:()=>{init();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.ok()});
const BANK=[['Domain of f(x) = √(x − 3)?','x ≥ 3',[['x ≥ 0','neg'],['x ≠ 3','zero']]],['g(x) = x² on −1 ≤ x ≤ 2. Range?','0 ≤ y ≤ 4',[['1 ≤ y ≤ 4','end'],['−1 ≤ y ≤ 2','swap']]],
 ['Domain of f(x) = 5/(x + 1)?','x ≠ −1',[['x ≠ 1','zero'],['x ≥ −1','neg']]],['A car slows: v = 30 − 6t m/s. Sensible domain?','0 ≤ t ≤ 5',[['all real t','ctx'],['0 ≤ t ≤ 30','swap']]],
 ['Range of f(x) = x² + 2 for all real x?','y ≥ 2',[['all real y','end'],['x ≥ 2','swap']]],['Number of people n in a lift that holds 8. Domain?','0, 1, 2, …, 8',[['0 ≤ n ≤ 8, any value','disc'],['n ≥ 0','ctx']]]];
function why(tag){let m='Ask which x-values work, then which y-values come out.';
 if(tag==='neg')m='A square root needs what is inside to be 0 or more. Solve that inequality.';
 if(tag==='zero')m='The denominator cannot be 0. Find the x that makes it 0.';
 if(tag==='end')m='The endpoints are not always the extremes. Check for a turning point in between.';
 if(tag==='swap')m='Domain is about inputs (x); range is about outputs (y). Those are swapped.';
 if(tag==='ctx')m='The formula may accept more values than the situation allows. Use the context.';
 if(tag==='disc')m='You cannot have part of a person. Counted things give a discrete domain.';
 return m}
function ask(){qi++;const[q,ans,bad]=BANK[qi%BANK.length],opts=[[ans,'ok'],...bad],rot=qi%3,order=opts.slice(rot).concat(opts.slice(0,rot));S.q=q;
 ch.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=ch.querySelector('.fl-pick');order.forEach(([v,tag])=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Answer '+v},row,v).onclick=()=>judge(tag,ans)});note('Challenge: '+q);A.redraw()}
function judge(tag,ans){ch.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=ch.querySelector('.fl-fb'),ok=tag==='ok';ok?A.win():A.sound.miss();note(ok?'Yes, '+ans+'.':why(tag));
 fb.innerHTML=(ok?`✓ Yes: ${ans}.`:'✗ '+why(tag))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.0,draw,onStep:Q=>{ch.hidden=Q.step!==6;ui.hidden=Q.step===6;buttons()},
 init:Q=>{const w=c.el('div',{class:'fl-below'},Q.below);ui=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Graph controls'},w);ch=c.el('div',{class:'fl-chal'},Q.below);init();A.gest({down,move,up});buttons()}});
A.start()})})();
