/* Flagship: how breathing works (ages 5–7). Air path nose/mouth → windpipe → lungs. Lungs take oxygen the body
   needs; we breathe out carbon dioxide waste. Chest rises on breathe-in and falls on breathe-out. Common slips:
   thinking we breathe out oxygen; thinking air stops at the mouth; mixing up windpipe and food tube. */
(()=>{
VIS.reg('flagbreath',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['path','in','out','chest','gas','fix','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
const PATH=['nose/mouth','windpipe','lungs'];
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#fce7f3',C.dark?.08:.35);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Breathe in oxygen.',W/2,H*.35,A.narrow?15:18,{w:900});T('Breathe out carbon dioxide.',W/2,H*.55,A.narrow?14:16,{w:800});A.fx.draw(g);return}
 if(k==='path'){T('Build the air path',W/2,H*.08,A.narrow?14:17,{w:800});
  PATH.forEach((name,i)=>{const on=S.step>i;const y=H*.28+i*H*.2;g.fillStyle=on?A.alpha(C.gr,.4):A.alpha(C.tx,.08);g.fillRect(W*.15,y-H*.07,W*.7,H*.14);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.15,y-H*.07,W*.7,H*.14);T((on?'✓ ':'○ ')+name,W/2,y,A.narrow?13:15,{w:700})});
  T(S.step>=3?'Path complete':'Tap the next stop',W/2,H*.92,A.narrow?12:14,{c:C.mu})}
 if(k==='in'){T('Breathe in — what do lungs take?',W/2,H*.1,A.narrow?13:16,{w:800});
  T('🫁 ← air',W/2,H*.35,36);
  (S.opts||[]).forEach((t,i)=>{const y=H*.52+i*H*.13;g.fillStyle=S.picked===i?A.alpha(C.ac,.35):A.alpha(C.tx,.08);g.fillRect(W*.1,y-H*.05,W*.8,H*.1);g.strokeStyle=C.tx;g.lineWidth=1.5;g.strokeRect(W*.1,y-H*.05,W*.8,H*.1);T(t,W/2,y,A.narrow?12:14,{w:700})})}
 if(k==='out'){T('Breathe out — what leaves?',W/2,H*.1,A.narrow?13:16,{w:800});
  T('🫁 → ',W/2,H*.35,36);
  (S.opts||[]).forEach((t,i)=>{const y=H*.52+i*H*.13;g.fillStyle=S.picked===i?A.alpha(C.ac,.35):A.alpha(C.tx,.08);g.fillRect(W*.1,y-H*.05,W*.8,H*.1);g.strokeStyle=C.tx;g.lineWidth=1.5;g.strokeRect(W*.1,y-H*.05,W*.8,H*.1);T(t,W/2,y,A.narrow?12:14,{w:700})})}
 if(k==='chest'){T('Watch the chest: in and out',W/2,H*.08,A.narrow?13:16,{w:800});
  const big=S.phase==='in';g.fillStyle=A.alpha(C.ac,.35);g.beginPath();g.ellipse(W/2,H*.45,W*(big?.28:.18),H*(big?.22:.14),0,0,Math.PI*2);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();
  T(big?'Breathe IN — chest rises':'Breathe OUT — chest falls',W/2,H*.78,A.narrow?13:15,{w:800});
  T(S.seenIn&&S.seenOut?'Both moves seen':'Tap In and Out',W/2,H*.92,A.narrow?12:14,{c:C.mu})}
 if(k==='gas'){T('Match each gas to its job',W/2,H*.1,A.narrow?13:16,{w:800});
  T(S.gas||'oxygen',W/2,H*.32,A.narrow?18:22,{w:900});
  (S.opts||[]).forEach((t,i)=>{const y=H*.52+i*H*.14;g.fillStyle=S.picked===i?A.alpha(C.ac,.35):A.alpha(C.tx,.08);g.fillRect(W*.1,y-H*.05,W*.8,H*.1);g.strokeStyle=C.tx;g.lineWidth=1.5;g.strokeRect(W*.1,y-H*.05,W*.8,H*.1);T(t,W/2,y,A.narrow?12:14,{w:700})})}
 if(k==='fix'){T('Fill the breath story',W/2,H*.08,A.narrow?14:17,{w:800});
  [['Air in via nose/mouth',S.a],['Down the windpipe',S.b],['Lungs take oxygen',S.c],['Breathe out CO₂',S.d]].forEach((p,i)=>{const y=H*.28+i*H*.15;g.fillStyle=p[1]?A.alpha(C.gr,.35):A.alpha(C.tx,.08);g.fillRect(W*.1,y-H*.05,W*.8,H*.12);g.strokeStyle=C.tx;g.lineWidth=1.5;g.strokeRect(W*.1,y-H*.05,W*.8,H*.12);T((p[1]?'✓ ':'○ ')+p[0],W/2,y,A.narrow?12:14,{w:700})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{step:0,picked:null,phase:'out',seenIn:0,seenOut:0,gas:'oxygen',opts:[],a:0,b:0,c:0,d:0,check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*280))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='path'){btn('Next stop',()=>{if(S.step<3){S.step++;A.sound.tick();say(PATH[S.step-1]);A.redraw();S.check()}},'Add next path stop')}
 if(kind()==='in'||kind()==='out'||kind()==='gas'){(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();A.redraw();S.check()},t))}
 if(kind()==='chest'){btn('Breathe in',()=>{S.phase='in';S.seenIn=1;A.sound.tick();say('Chest rises');A.redraw();S.check()},'Breathe in');btn('Breathe out',()=>{S.phase='out';S.seenOut=1;A.sound.tick();say('Chest falls');A.redraw();S.check()},'Breathe out')}
 if(kind()==='fill'){btn('Air in',()=>{S.a=1;A.sound.tick();A.redraw();S.check()},'Air in');btn('Windpipe',()=>{S.b=1;A.sound.tick();A.redraw();S.check()},'Windpipe');btn('Oxygen in lungs',()=>{S.c=1;A.sound.tick();A.redraw();S.check()},'Oxygen');btn('CO2 out',()=>{S.d=1;A.sound.tick();A.redraw();S.check()},'CO2 out')}
}
function down(p){if(kind()==='chal')return false;S.drag=1;return true}
function move(p){if(!S.drag)return;
 if(kind()==='path'){const i=Math.floor((p.y-A.H*.2)/(A.H*.2));if(i===S.step&&S.step<3){S.step++;A.redraw()}}
 if(kind()==='in'||kind()==='out'||kind()==='gas'){const i=Math.floor((p.y-A.H*.47)/(A.H*.13));if(i>=0&&i<(S.opts||[]).length){S.picked=i;A.redraw()}}
 if(kind()==='chest'){S.phase=p.y<A.H*.5?'in':'out';if(S.phase==='in')S.seenIn=1;else S.seenOut=1;A.redraw()}
 if(kind()==='fill'){const i=Math.floor((p.y-A.H*.2)/(A.H*.15));if(i===0)S.a=1;if(i===1)S.b=1;if(i===2)S.c=1;if(i===3)S.d=1;A.redraw()}
}
function up(){if(kind()!=='chal')S.check();S.drag=0}
const steps=[
{h:'Air path',p:'Air goes in through the nose or mouth, down the windpipe, into the lungs.',
 predict:{q:'After the nose or mouth, air travels down the…',opts:['windpipe','ear canal','ankle'],ans:0},
 task:'Build the three-stop air path',show:()=>auto(0,[()=>{S.step=3;A.redraw();S.check()}]),
 go:()=>{reset({step:0});say('Build nose/mouth → windpipe → lungs.');controls();S.check=finish(0,()=>S.step>=3,'Air path: nose or mouth, windpipe, lungs.')}},
{h:'Breathe in',p:'When you breathe in, lungs take oxygen from the air. Your body needs oxygen to stay alive.',
 predict:{q:'Lungs take in…',opts:['oxygen','only carbon dioxide','plastic'],ans:0},
 task:'Choose what lungs take from air',show:()=>auto(1,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['oxygen the body needs','only leftover smoke','nothing useful'],picked:null});say('What do lungs take in?');controls();S.check=finish(1,()=>S.picked===0,'Lungs take oxygen — the body needs it.')}},
{h:'Breathe out',p:'When you breathe out, you send out carbon dioxide. That is waste gas the body does not need.',
 task:'Choose what leaves when you breathe out',show:()=>auto(2,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['carbon dioxide waste','more oxygen to store','solid food bits'],picked:null});say('What leaves on the way out?');controls();S.check=finish(2,()=>S.picked===0,'Breathe out carbon dioxide waste.')}},
{h:'Chest moves',p:'Breathe in: chest rises as lungs fill. Breathe out: chest falls as air leaves.',
 predict:{q:'On a breathe-in the chest…',opts:['rises','falls flat forever','disappears'],ans:0},
 task:'Show breathe-in and breathe-out chest moves',show:()=>auto(3,[()=>{S.seenIn=S.seenOut=1;S.phase='in';A.redraw();S.check()}]),
 go:()=>{reset({phase:'out',seenIn:0,seenOut:0});say('Tap In and Out to move the chest.');controls();S.check=finish(3,()=>S.seenIn&&S.seenOut,'In: chest rises. Out: chest falls.')}},
{h:'Gas jobs',p:'Oxygen is the gas lungs take for the body. Carbon dioxide is the waste you breathe out.',
 task:'Match oxygen to its job',show:()=>auto(4,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({gas:'oxygen',opts:['needed by the body','the waste we breathe out','a solid rock'],picked:null});say('What is oxygen for?');controls();S.check=finish(4,()=>S.picked===0,'Oxygen is needed by the body.')}},
{h:'Breath story',p:'Put the whole story together: air in, windpipe, oxygen in lungs, carbon dioxide out.',
 task:'Tick all four story parts',show:()=>auto(5,[()=>{S.a=S.b=S.c=S.d=1;A.redraw();S.check()}]),
 go:()=>{reset();say('Fill every part of the breath story.');controls();S.check=finish(5,()=>S.a&&S.b&&S.c&&S.d,'Air in, windpipe, oxygen in, CO₂ out — that is breathing.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['Air enters through the…',[['nose or mouth','ok'],['ankles','ankle'],['fingertips','finger']]],
 ['The tube to the lungs is the…',[['windpipe','ok'],['food-only tube name for air','foodtube'],['ear canal','ear']]],
 ['Lungs take…',[['oxygen','ok'],['only carbon dioxide','co2'],['gravel','gravel']]],
 ['We breathe out…',[['carbon dioxide waste','ok'],['only fresh oxygen','o2'],['liquid metal','metal']]],
 ['On breathe-in the chest…',[['rises','ok'],['falls and stays empty','fall'],['locks shut','lock']]],
 ['Oxygen is…',[['needed by the body','ok'],['always the waste gas','waste'],['never in air','never']]],
 ['Carbon dioxide here is…',[['waste we breathe out','ok'],['the only gas lungs keep','keep'],['a type of food','food']]]];
function why(t){let m='Air path: nose/mouth → windpipe → lungs. In: oxygen. Out: carbon dioxide.';
 if(t==='ankle'||t==='finger')m='Air goes in through the nose or mouth, not the ankles or fingertips.';
 if(t==='foodtube')m='Air uses the windpipe to reach the lungs. Do not send air down as if it were food only.';
 if(t==='ear')m='The ear canal is for hearing, not for breathing to the lungs.';
 if(t==='co2')m='Lungs take oxygen in. Carbon dioxide is what we breathe out.';
 if(t==='gravel')m='Lungs take oxygen gas from air, not gravel.';
 if(t==='o2')m='We breathe out carbon dioxide waste, not a store of fresh oxygen.';
 if(t==='metal')m='Breath is gas, not liquid metal.';
 if(t==='fall')m='Breathe-in fills the lungs so the chest rises.';
 if(t==='lock')m='The chest moves with each breath; it does not lock shut.';
 if(t==='waste')m='Oxygen is useful to the body. Carbon dioxide is the waste out-breath.';
 if(t==='never')m='Air has oxygen. Lungs take it in.';
 if(t==='keep')m='Lungs do not keep carbon dioxide as the useful gas.';
 if(t==='food')m='Carbon dioxide is a waste gas, not food.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+2)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Breathing controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:p=>move(p),up:p=>up(p||{x:0,y:0})});controls()}});
A.start()})})();
