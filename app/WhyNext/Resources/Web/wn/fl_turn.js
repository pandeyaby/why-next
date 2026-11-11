/* Flagship: turns and directions (topic "Turns & Directions"; ages 5-6; NC Y1 position and direction: "describe
   position, direction and movement, including whole, half, quarter and three-quarter turns"; Y2 adds clockwise and
   anticlockwise). Pip stands in the middle of a garden: tree ahead, house to the right, pond behind, ball to the left.
   Turn Pip with the buttons or by dragging round Pip; a shaded wedge shows how much of a whole turn has been made. */
(()=>{
VIS.reg('flagturn',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const THINGS=['tree','house','pond','ball'];// facing 0 = up, 1 = right, 2 = down, 3 = left
const NAMES=['a quarter turn','a half turn','a three-quarter turn','a whole turn'];
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const face=()=>((S.q%4)+4)%4;
const kind=()=>['quarter','half','three','whole','anti','goal','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function thing(i,x,y,u){const g=A.ctx,C=A.col;g.lineWidth=2;g.strokeStyle=C.tx;
 if(i===0){g.fillStyle='#8b5a2b';g.fillRect(x-u*.08,y,u*.16,u*.45);g.beginPath();g.arc(x,y-u*.05,u*.32,0,7);g.fillStyle=C.gr;g.fill();g.stroke()}
 if(i===1){g.fillStyle=A.alpha(C.or,.55);g.fillRect(x-u*.3,y-u*.1,u*.6,u*.45);g.strokeRect(x-u*.3,y-u*.1,u*.6,u*.45);g.beginPath();g.moveTo(x-u*.4,y-u*.1);g.lineTo(x,y-u*.45);g.lineTo(x+u*.4,y-u*.1);g.closePath();g.fillStyle=C.rd;g.fill();g.stroke()}
 if(i===2){g.beginPath();g.ellipse(x,y,u*.45,u*.22,0,0,7);g.fillStyle=A.alpha(C.cy,.6);g.fill();g.stroke()}
 if(i===3){g.beginPath();g.arc(x,y,u*.24,0,7);g.fillStyle=C.pk;g.fill();g.stroke()}
 T(THINGS[i],x,y+u*.6,A.narrow?13:15,{w:800})}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#dcfce7',C.dark?.05:.35);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Quarter, half, three-quarter, whole',W/2,H*.3,A.narrow?15:19,{w:900});T('Clockwise ↻ goes the way clock hands go.',W/2,H*.5,A.narrow?13:16);T('Anticlockwise ↺ goes the other way.',W/2,H*.64,A.narrow?13:16,{c:C.mu});A.fx.draw(g);return}
 const cx=W/2,cy=H*.5,R=Math.min(W*.3,H*.36),u=Math.min(W,H)*.2;
 const pos=[[cx,cy-R],[cx+R*1.15,cy],[cx,cy+R],[cx-R*1.15,cy]];
 // shaded wedge: how much of a whole turn Pip has made from the start (capped at one whole turn)
 const turned=Math.max(-4,Math.min(4,S.q)),a0=-Math.PI/2+S.start*Math.PI/2;
 if(turned){g.beginPath();g.moveTo(cx,cy);g.arc(cx,cy,R*.62,a0,a0+turned*Math.PI/2,turned<0);g.closePath();g.fillStyle=A.alpha(turned>0?C.vi:C.or,.22);g.fill();g.strokeStyle=turned>0?C.vi:C.or;g.lineWidth=2;g.stroke()}
 g.beginPath();g.arc(cx,cy,R*.62,0,7);g.strokeStyle=A.alpha(C.tx,.35);g.setLineDash([5,5]);g.lineWidth=1.5;g.stroke();g.setLineDash([]);
 pos.forEach((p,i)=>thing(i,p[0],p[1],u));
 // Pip: round body with a pointed nose showing the way Pip faces
 const ang=-Math.PI/2+S.shown*Math.PI/2;g.save();g.translate(cx,cy);g.rotate(ang);
 g.beginPath();g.moveTo(u*.62,0);g.lineTo(u*.18,-u*.2);g.lineTo(u*.18,u*.2);g.closePath();g.fillStyle=C.ac;g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();
 g.beginPath();g.arc(0,0,u*.28,0,7);g.fillStyle=A.mix(C.pn,C.ac,.25);g.fill();g.stroke();g.restore();T('Pip',cx,cy,A.narrow?12:14,{w:900});
 const q=Math.abs(S.q),word=q===0?'no turn yet':(q<=4?NAMES[q-1]:q+' quarter turns')+(q?(S.q>0?' clockwise':' anticlockwise'):'');
 T(S.goal!=null?`Make Pip face the ${THINGS[S.goals[S.gi]]||THINGS[face()]}`:`Turned: ${word}`,W/2,H*.06,A.narrow?13:16,{w:800});
 T(`Pip faces the ${THINGS[face()]}`,W/2,H*.95,A.narrow?13:15,{c:C.mu});A.fx.draw(g)}
// one quarter turn: +1 clockwise, -1 anticlockwise; the drawing eases round so the turn can be seen
function turn(d){if(S.lock)return;S.q+=d;A.sound.tick();const from=S.shown,to=S.start+S.q,r=run,t0=performance.now(),ms=A.reduced()?1:260;
 const tick=()=>{if(r!==run)return;const f=Math.min(1,(performance.now()-t0)/ms);S.shown=from+(to-from)*A.ease.io(f);A.redraw();if(f<1)requestAnimationFrame(tick)};tick();
 const q=Math.abs(S.q);say((d>0?'Quarter turn clockwise. ':'Quarter turn anticlockwise. ')+'Pip faces the '+THINGS[face()]+'. '+(q&&q<=4?'So far '+NAMES[q-1]+'.':''));
 S.check()}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{q:0,start:0,shown:0,goal:null,goals:[],gi:0,lock:0,check:()=>{}},o||{});S.shown=S.start}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*330))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function goalCheck(){if(S.goal==null||S.gi>=S.goals.length)return;if(face()===S.goals[S.gi]){A.sound.pop();say('Yes! Pip faces the '+THINGS[face()]+'.');S.gi++;
 if(S.gi<S.goals.length){const nx=THINGS[S.goals[S.gi]],g=S.gi;setTimeout(()=>{if(S.gi===g)say('Now turn Pip to face the '+nx+'.')},A.reduced()?5:600)}}}
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l},ctl,t).onclick=f};
 btn('↻ Quarter turn clockwise',()=>turn(1),'Turn Pip a quarter turn clockwise');btn('↺ Quarter turn anticlockwise',()=>turn(-1),'Turn Pip a quarter turn anticlockwise');
 btn('Start again',()=>steps[A.step].go(),'Put Pip back to the start')}
// drag round Pip: each time the pointer moves into the next quarter, Pip makes one quarter turn that way
function quadAt(p){const a=Math.atan2(p.y-A.H*.5,p.x-A.W/2);return((Math.round((a+Math.PI/2)/(Math.PI/2))%4)+4)%4}
function down(p){if(kind()==='chal')return false;S.drag=quadAt(p);return true}
function move(p){if(S.drag==null)return;const qd=quadAt(p),d=((qd-S.drag)%4+4)%4;if(d===1){turn(1);S.drag=qd}else if(d===3){turn(-1);S.drag=qd}}
const steps=[
{h:'Quarter turn',p:'Pip faces the tree. A quarter turn is one small turn, like a clock hand going from 12 to 3. Clockwise means the same way as clock hands.',
 predict:{q:'Pip faces the tree. After a quarter turn clockwise, Pip faces the…',opts:['house','pond','tree'],ans:0},
 task:'Make one quarter turn clockwise',show:()=>auto(0,[()=>turn(1)]),
 go:()=>{reset();say('Pip faces the tree. Make a quarter turn clockwise.');controls();S.check=finish(0,()=>S.q===1,'One quarter turn clockwise: tree to house.')}},
{h:'Half turn',p:'Now make a half turn. Watch the shaded part. Does it fill half the circle?',
 predict:{q:'A half turn is the same as how many quarter turns?',opts:['2','1','4'],ans:0},
 task:'Make a half turn clockwise',show:()=>auto(1,[()=>turn(1),()=>turn(1)]),
 go:()=>{reset();say('Make a half turn.');controls();S.check=finish(1,()=>S.q===2,'Two quarter turns make a half turn. Pip now faces the pond, behind where Pip started.')}},
{h:'Three-quarter turn',p:'Keep going clockwise for three quarter turns. Three quarters of the circle is shaded.',
 predict:{q:'Pip faces the tree and makes a three-quarter turn clockwise. Pip faces the…',opts:['ball','house','pond'],ans:0},
 task:'Make a three-quarter turn clockwise',show:()=>auto(2,[()=>turn(1),()=>turn(1),()=>turn(1)]),
 go:()=>{reset();say('Make a three-quarter turn clockwise.');controls();S.check=finish(2,()=>S.q===3,'Three quarter turns clockwise: house, pond, then ball.')}},
{h:'Whole turn',p:'Turn all the way round. A whole turn is four quarter turns.',
 predict:{q:'After a whole turn, Pip faces…',opts:['the same way as at the start','the other way, behind','sideways'],ans:0},
 task:'Make a whole turn',show:()=>auto(3,[()=>turn(1),()=>turn(1),()=>turn(1),()=>turn(1)]),
 go:()=>{reset();say('Make a whole turn.');controls();S.check=finish(3,()=>Math.abs(S.q)===4,'A whole turn brings Pip back to face the tree. The circle is full.')}},
{h:'Anticlockwise',p:'Anticlockwise means the other way from clock hands. Turn Pip a quarter turn anticlockwise.',
 task:'Make one quarter turn anticlockwise',show:()=>auto(4,[()=>turn(-1)]),
 go:()=>{reset();say('Make a quarter turn anticlockwise.');controls();S.check=finish(4,()=>S.q===-1,'A quarter turn anticlockwise takes Pip from the tree to the ball. That is where three quarter turns clockwise ended too.')}},
{h:'Follow the way',p:'Turn Pip to face each thing in turn. Use the turn that gets there first.',
 task:'Turn Pip to face the house, then the ball, then the pond',show:()=>auto(5,[()=>turn(1),()=>turn(-1),()=>turn(-1),()=>turn(-1)]),
 go:()=>{reset({goal:1,goals:[1,3,2],gi:0});say('Turn Pip to face the house.');controls();
  S.check=()=>{goalCheck();finish(5,()=>S.gi>=3,'House, ball, pond: you chose each turn.')()}}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['Pip faces the house and makes a half turn. Pip faces the…',[['ball','ok'],['pond','quarter'],['house','whole']]],
 ['How many quarter turns make a whole turn?',[['4','ok'],['2','half'],['3','three']]],
 ['Pip faces the tree and makes a three-quarter turn clockwise. Pip faces the…',[['ball','ok'],['house','wayquarter'],['pond','half']]],
 ['Pip faces the tree and makes a quarter turn anticlockwise. Pip faces the…',[['ball','ok'],['house','way'],['pond','half']]],
 ['Which turn leaves you facing the same way as before?',[['a whole turn','ok'],['a half turn','behind'],['a quarter turn','side']]],
 ['Clockwise means turning…',[['the same way as clock hands','ok'],['the other way from clock hands','swap'],['any way you like','any']]],
 ['You make a half turn. Does clockwise or anticlockwise change where you end up?',[['no, both end the same','ok'],['yes, they end in different places','halfdir'],['only if you turn fast','fast']]]];
function why(t){let m='Count the quarter turns one at a time.';
 if(t==='quarter')m='House to pond is only a quarter turn. A half turn is two quarter turns: house, pond, ball.';
 if(t==='whole')m='Ending where you began is a whole turn. A half turn leaves you facing the other way.';
 if(t==='half')m='Two quarter turns make a half turn. Count four for a whole turn.';
 if(t==='three')m='Three quarter turns is a three-quarter turn. One more makes a whole turn: 4.';
 if(t==='wayquarter')m='The house is only one quarter turn clockwise. Three quarter turns go house, pond, ball.';
 if(t==='way')m='The house is clockwise. Anticlockwise goes the other way, to the ball.';
 if(t==='behind')m='A half turn leaves you facing behind you. Only a whole turn brings you back.';
 if(t==='side')m='A quarter turn leaves you facing sideways. Only a whole turn brings you back.';
 if(t==='swap')m='That is anticlockwise. Clockwise is the way the hands on a clock go.';
 if(t==='any')m='The word tells you which way: clockwise is the way clock hands go.';
 if(t==='halfdir')m='Half way round is the same place from either side, so both end facing behind you.';
 if(t==='fast')m='Speed does not change a turn. A half turn always ends facing behind you.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+2)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Turn controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:p=>move(p),up:()=>{S.drag=null}});controls()}});
A.start()})})();
