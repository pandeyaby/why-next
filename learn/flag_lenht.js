/* Flagship: measuring length and height (ages 5–6; Y1 measure: compare & non-standard units).
   Line up starts, compare longer/shorter and taller/shorter, measure with cubes, reject end-only and
   "taller means longer" mix-ups, then a challenge on those slips. */
(()=>{
VIS.reg('flaglenht',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['lineup','longer','taller','cubes','fair','idea','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function bar(g,x,y,w,h,col){g.fillStyle=col;g.fillRect(x,y,w,h);g.strokeStyle=A.col.tx;g.lineWidth=2;g.strokeRect(x,y,w,h)}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#f0fdf4',C.dark?.08:.35);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Measure length and height',W/2,H*.32,A.narrow?14:17,{w:900});T('Line up starts. Count units.',W/2,H*.52,A.narrow?12:15,{c:C.mu});A.fx.draw(g);return}
 if(k==='lineup'){T('Line up the starting ends',W/2,H*.08,A.narrow?14:17,{w:800});
  g.strokeStyle=C.mu;g.setLineDash([4,4]);g.beginPath();g.moveTo(W*.15,H*.25);g.lineTo(W*.15,H*.85);g.stroke();g.setLineDash([]);
  bar(g,S.aligned?W*.15:W*.28,H*.35,W*.45,H*.1,A.alpha(C.ac,.45));bar(g,W*.15,H*.55,W*.3,H*.1,A.alpha(C.or,.45));
  T(S.aligned?'Starts lined up':'Tap to slide the long bar to the line',W/2,H*.9,A.narrow?12:14,{c:C.mu})}
 if(k==='longer'){T('Which ribbon is longer?',W/2,H*.08,A.narrow?15:18,{w:800});
  bar(g,W*.1,H*.3,W*(S.a||.5),H*.12,A.alpha(C.ac,.5));bar(g,W*.1,H*.55,W*(S.b||.35),H*.12,A.alpha(C.or,.5));
  T('A',W*.05,H*.36,14);T('B',W*.05,H*.61,14);T(S.picked==null?'Pick A or B':('Picked '+S.picked),W/2,H*.88,14,{c:C.mu})}
 if(k==='taller'){T('Which tower is taller?',W/2,H*.08,A.narrow?15:18,{w:800});
  bar(g,W*.22,H*(1-(S.ha||.5)),W*.2,H*(S.ha||.5)-H*.15,A.alpha(C.vi,.45));bar(g,W*.58,H*(1-(S.hb||.35)),W*.2,H*(S.hb||.35)-H*.15,A.alpha(C.cy,.45));
  T('A',W*.32,H*.92,14);T('B',W*.68,H*.92,14);T(S.picked==null?'Pick A or B':('Picked '+S.picked),W/2,H*.12,12,{c:C.mu})}
 if(k==='cubes'){T('How many cubes long?',W/2,H*.08,A.narrow?15:18,{w:800});
  bar(g,W*.1,H*.35,W*.7,H*.12,A.alpha(C.ac,.35));
  for(let i=0;i<(S.n||0);i++){bar(g,W*.1+i*W*.12,H*.55,W*.11,H*.14,A.alpha(C.gr,.55));T(String(i+1),W*.155+i*W*.12,H*.62,12)}
  T(`${S.n||0} cubes — need ${S.want}`,W/2,H*.88,A.narrow?12:14,{c:C.mu})}
 if(k==='fair'){T('Fair measure: same start, same unit',W/2,H*.1,A.narrow?13:15,{w:800});
  bar(g,S.fair?W*.15:W*.3,H*.35,W*.4,H*.1,A.alpha(C.ac,.45));
  for(let i=0;i<3;i++)bar(g,W*.15+i*W*.12,H*.55,W*.11,H*.14,A.alpha(S.unit==='cube'?C.gr:C.rd,.5));
  T(S.fair&&S.unit==='cube'?'Fair: lined up with cubes':'Fix start and use cubes',W/2,H*.88,A.narrow?12:14,{c:C.mu})}
 if(k==='idea'){T('Tap the true idea',W/2,H*.1,A.narrow?15:18,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.3+i*.18);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.06,y-H*.07,W*.88,H*.14);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.06,y-H*.07,W*.88,H*.14);T(t,W/2,y,A.narrow?12:14,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{aligned:0,picked:null,a:.55,b:.35,ha:.55,hb:.35,n:0,want:5,fair:0,unit:'',opts:[],check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*280))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='lineup')btn('Line up starts',()=>{S.aligned=1;A.sound.tick();say('Starts lined up.');A.redraw();S.check()},'Line both bars to the start line');
 if(kind()==='longer'||kind()==='taller'){btn('Pick A',()=>{S.picked='A';A.sound.tick();say('Picked A');A.redraw();S.check()},'Pick A');btn('Pick B',()=>{S.picked='B';A.sound.tick();say('Picked B');A.redraw();S.check()},'Pick B')}
 if(kind()==='cubes'){btn('+ Add cube',()=>{if(S.n<8){S.n++;A.sound.tick();say(S.n+' cubes');A.redraw();S.check()}},'Add one cube');btn('− Remove cube',()=>{if(S.n>0){S.n--;A.sound.tick();say(S.n+' cubes');A.redraw();S.check()}},'Remove one cube')}
 if(kind()==='fair'){btn('Line up start',()=>{S.fair=1;A.sound.tick();say('Start lined up');A.redraw();S.check()},'Line up the start');btn('Use cubes',()=>{S.unit='cube';A.sound.tick();say('Using cubes');A.redraw();S.check()},'Choose cube units');btn('Use random gaps',()=>{S.unit='gap';A.sound.miss();say('Gaps must be equal cube lengths.');A.redraw()},'Unequal gaps — not fair')}
 if(kind()==='idea')(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();say(t);A.redraw();S.check()},'Pick: '+t))}
function down(p){if(kind()==='chal')return false;S.drag=1;
 if(kind()==='lineup'){S.aligned=1;A.redraw();S.check();return true}
 if(kind()==='longer'||kind()==='taller'){S.picked=p.x<A.W/2?'A':'B';A.redraw();S.check();return true}
 if(kind()==='cubes'){if(p.x>A.W/2){if(S.n<8)S.n++}else if(S.n>0)S.n--;A.redraw();S.check();return true}
 if(kind()==='fair'){if(p.y<A.H/2)S.fair=1;else S.unit='cube';A.redraw();S.check();return true}
 return true}
function move(){}
function up(){S.drag=0}
const steps=[
{h:'Line up starts',p:'To compare length, line up the starting ends. Comparing only the far ends is unfair.',
 predict:{q:'Before comparing, you should…',opts:['line up the starts','only look at the far ends','close your eyes'],ans:0},
 task:'Line both bars to the start line',show:()=>auto(0,[()=>{S.aligned=1;A.redraw();S.check()}]),
 go:()=>{reset({aligned:0});say('Slide so both starts meet the line.');controls();S.check=finish(0,()=>!!S.aligned,'Starts lined up — now length compares fairly.')}},
{h:'Longer ribbon',p:'Length is how long something is from end to end along a line. Pick the longer ribbon.',
 predict:{q:'The longer ribbon…',opts:['covers more along the line','is always the taller one','is the one on top'],ans:0},
 task:'Pick the longer ribbon (A)',show:()=>auto(1,[()=>{S.picked='A';A.redraw();S.check()}]),
 go:()=>{reset({a:.62,b:.38,picked:null});say('Which ribbon is longer?');controls();S.check=finish(1,()=>S.picked==='A','Ribbon A is longer along the line.')}},
{h:'Taller tower',p:'Height is how tall something stands. Taller is not the same word as longer — both compare size, but height is up.',
 predict:{q:'Taller means…',opts:['stands higher up','is always longer flat on the table','weighs more'],ans:0},
 task:'Pick the taller tower (A)',show:()=>auto(2,[()=>{S.picked='A';A.redraw();S.check()}]),
 go:()=>{reset({ha:.62,hb:.38,picked:null});say('Which tower is taller?');controls();S.check=finish(2,()=>S.picked==='A','Tower A stands higher — it is taller.')}},
{h:'Cube measure',p:'Measure length with the same unit end to end with no gaps or overlaps. Count the cubes.',
 predict:{q:'A fair cube measure needs…',opts:['cubes touching end to end','big gaps between cubes','cubes stacked in a tower for length'],ans:0},
 task:'Place 5 cubes along the bar',show:()=>auto(3,[()=>{S.n=5;A.redraw();S.check()}]),
 go:()=>{reset({n:0,want:5});say('Add cubes until you have 5 along the bar.');controls();S.check=finish(3,()=>S.n===5,'5 cubes long — same unit, no gaps.')}},
{h:'Fair measure',p:'Line up the start and use equal cube units. Random gaps make the measure unfair.',
 predict:{q:'Unfair measuring looks like…',opts:['unequal gaps or a shifted start','cubes end to end from one start','the same unit each time'],ans:0},
 task:'Line up the start and choose cubes',show:()=>auto(4,[()=>{S.fair=1;S.unit='cube';A.redraw();S.check()}]),
 go:()=>{reset({fair:0,unit:''});say('Fix the start and pick cube units.');controls();S.check=finish(4,()=>S.fair&&S.unit==='cube','Fair: same start and equal cube units.')}},
{h:'True idea',p:'Pick the sentence that matches fair measuring.',
 predict:{q:'Length and height…',opts:['need lined-up starts to compare','are the same word always','never use units'],ans:0},
 task:'Tap the true sentence',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['Line up starts, then compare or count units','Only look at the far ends','Taller always means longer on the table'],picked:null});say('Tap the true idea.');controls();S.check=finish(5,()=>S.picked===0,'Fair compares need lined-up starts and clear units.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['Before comparing lengths…',[['line up the starts','ok'],['only check far ends','ends'],['flip one object over','flip']]],
 ['Longer means…',[['covers more along the line','ok'],['stands higher up always','tall'],['is heavier','heavy']]],
 ['Taller means…',[['stands higher up','ok'],['is always longer flat','flat'],['has more colour','colour']]],
 ['Fair cube measure…',[['cubes end to end, no gaps','ok'],['big random gaps','gaps'],['different sized units mixed','mix']]],
 ['Height is about…',[['how tall something stands','ok'],['only how wide it is','wide'],['how loud it is','loud']]],
 ['A shifted start makes…',[['an unfair compare','ok'],['a better measure','better'],['the object heavier','mass']]],
 ['Why use the same unit?',[['so the count means the same each time','ok'],['so it looks pretty','pretty'],['so you can skip lining up','skip']]]];
function why(t){let m='Line up starts and use equal units.';
 if(t==='ends'||t==='flip')m='Comparing only far ends (or flipping) is unfair. Line up the starts first.';
 if(t==='tall'||t==='flat')m='Longer is along a line; taller is how high something stands. Do not swap the words.';
 if(t==='heavy'||t==='mass'||t==='colour'||t==='loud'||t==='wide')m='Length and height are about size in space — not weight, colour or sound.';
 if(t==='gaps'||t==='mix')m='Cubes must be the same size, touching end to end with no gaps or overlaps.';
 if(t==='better'||t==='pretty'||t==='skip')m='A shifted start or skipped line-up makes the measure unfair.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Length and height controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:p=>move(p),up:up});controls()}});
A.start()})})();
