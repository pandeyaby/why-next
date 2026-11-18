/* Flagship: Calculating kinetic energy (ages 14–16; KE = ½mv²; NGSS HS-PS3-1).
   Plug m (kg) and v (m/s) into KE = ½mv², rearrange for v or m, show doubling speed ×4 energy.
   Distinct from flagkemv (mass/speed dependence demo) and flagenergy (stores on a ramp). */
(()=>{
VIS.reg('flagkeq',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['eq','plug','double','solve','myth','order','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function cart(g,W,H,label){const C=A.col,y=H*.42,x=W*.18;g.fillStyle=A.alpha(C.ac,.35);g.fillRect(x,y,W*.28,H*.18);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(x,y,W*.28,H*.18);T(label||'m, v',x+W*.14,y+H*.09,13,{w:800});g.beginPath();g.arc(x+W*.06,y+H*.2,8,0,7);g.arc(x+W*.22,y+H*.2,8,0,7);g.fillStyle=C.tx;g.fill()}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#fef9c3',C.dark?.1:.4);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Kinetic energy',W/2,H*.3,A.narrow?14:17,{w:900});T('KE = ½ m v²   (J)',W/2,H*.52,A.narrow?12:14,{c:C.mu});A.fx.draw(g);return}
 if(k==='eq'){T(S.title||'KE formula',W/2,H*.1,A.narrow?13:15,{w:800});
  T(S.showEq?'KE = ½ m v²':'Tap to reveal KE = ½mv²',W/2,H*.4,A.narrow?16:20,{w:900});
  T(S.msg||'Mass in kg, speed in m/s → energy in joules (J).',W/2,H*.7,13,{c:C.mu,max:W*.9})}
 if(k==='plug'){T(S.title||'Plug in values',W/2,H*.08,A.narrow?13:15,{w:800});cart(g,W,H,'60 kg · 5 m/s');
  T(S.keOn?('KE = ½ × 60 × 5² = 750 J'):(S.msg||'m = 60 kg, v = 5 m/s → find KE'),W/2,H*.78,13,{c:C.mu,max:W*.92})}
 if(k==='double'){T(S.title||'Double the speed',W/2,H*.08,A.narrow?13:15,{w:800});
  T('Same mass, v → 2v',W/2,H*.28,14,{w:800});
  T(S.dOn?('KE becomes 4× (because of v²)'):(S.msg||'What happens to KE if speed doubles?'),W/2,H*.55,A.narrow?13:15,{c:C.mu,max:W*.9})}
 if(k==='solve'){T(S.title||'Find speed from KE',W/2,H*.08,A.narrow?13:15,{w:800});
  T('KE = 200 J, m = 4 kg',W/2,H*.28,14,{w:800});
  T(S.vOn?('v = √(2×KE÷m) = √100 = 10 m/s'):(S.msg||'Rearrange: v = √(2 KE / m)'),W/2,H*.55,A.narrow?12:14,{w:800})}
 if(k==='myth'||k==='order'){T(S.title||'Choose',W/2,H*.1,A.narrow?13:15,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.28+i*.2);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.05,y-H*.08,W*.9,H*.16);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.05,y-H*.08,W*.9,H*.16);T(String(t),W/2,y,A.narrow?12:14,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{showEq:0,keOn:0,dOn:0,vOn:0,picked:null,opts:[],title:'',msg:'',check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*160))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='eq'){btn('Show KE = ½mv²',()=>{S.showEq=1;S.msg='Kinetic energy equals half mass times speed squared.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Reveal formula');
  btn('Reset',()=>{S.showEq=0;A.redraw()},'Reset')}
 if(kind()==='plug'){btn('Calculate KE',()=>{S.keOn=1;S.msg='KE = ½ × 60 × 25 = 750 J';A.sound.tick();say(S.msg);A.redraw();S.check()},'Compute KE');
  btn('Reset',()=>{S.keOn=0;A.redraw()},'Reset KE')}
 if(kind()==='double'){btn('Show 4× energy',()=>{S.dOn=1;S.msg='Doubling speed multiplies KE by four.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Show four times');
  btn('Reset',()=>{S.dOn=0;A.redraw()},'Reset double')}
 if(kind()==='solve'){btn('Find v = √(2KE/m)',()=>{S.vOn=1;S.msg='v = √(2×200÷4) = 10 m/s';A.sound.tick();say(S.msg);A.redraw();S.check()},'Solve for speed');
  btn('Reset',()=>{S.vOn=0;A.redraw()},'Reset solve')}
 if(kind()==='myth'||kind()==='order')(S.opts||[]).forEach((t,i)=>btn(String(t),()=>{S.picked=i;A.sound.tick();say(String(t));A.redraw();S.check()},'Pick '+t))}
function down(p){if(kind()==='chal')return false;
 if(kind()==='eq'){S.showEq=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='plug'){S.keOn=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='double'){S.dOn=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='solve'){S.vOn=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='myth'||kind()==='order'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.2)/(A.H*.2))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 return true}
const steps=[
{h:'The KE formula',p:'Kinetic energy KE = ½ m v². Mass m is in kilograms, speed v in metres per second, and KE comes out in joules (J). The half and the square both matter.',
 predict:{q:'KE equals…',opts:['½ m v²','m × v','½ m + v²'],ans:0},
 task:'Reveal KE = ½mv²',show:()=>auto(0,[()=>{S.showEq=1;A.redraw();S.check()}]),
 go:()=>{reset({title:'KE formula',msg:'Show the formula linking mass and speed to energy.'});say('Reveal the kinetic energy formula.');controls();S.check=finish(0,()=>!!S.showEq,'KE = ½ m v².')}},
{h:'Calculate KE',p:'Substitute carefully: square the speed first, then multiply by mass, then by ½. Example: 60 kg at 5 m/s → ½ × 60 × 25 = 750 J.',
 predict:{q:'60 kg at 5 m/s. KE is…',opts:['750 J','300 J','150 J'],ans:0},
 task:'Calculate KE for 60 kg at 5 m/s',show:()=>auto(1,[()=>{S.keOn=1;A.redraw();S.check()}]),
 go:()=>{reset({title:'Plug in',msg:'Square speed, then multiply by ½m.'});say('Calculate kinetic energy.');controls();S.check=finish(1,()=>!!S.keOn,'KE = 750 J.')}},
{h:'Speed squared',p:'Because of v², doubling speed multiplies KE by four. Tripling speed multiplies KE by nine. Mass scales KE only linearly.',
 predict:{q:'If speed doubles and mass stays the same, KE…',opts:['becomes 4 times as big','doubles','stays the same'],ans:0},
 task:'Show that doubling speed gives 4× KE',show:()=>auto(2,[()=>{S.dOn=1;A.redraw();S.check()}]),
 go:()=>{reset({title:'v² effect',msg:'See what doubling speed does.'});say('Explore the square.');controls();S.check=finish(2,()=>!!S.dOn,'Doubling speed → 4× KE.')}},
{h:'Rearrange for speed',p:'From KE = ½mv²: multiply both sides by 2, divide by m, then take the positive square root. v = √(2 KE / m).',
 predict:{q:'To find speed from KE and mass use…',opts:['v = √(2 KE / m)','v = KE / m','v = ½ m KE'],ans:0},
 task:'Find v from KE = 200 J, m = 4 kg',show:()=>auto(3,[()=>{S.vOn=1;A.redraw();S.check()}]),
 go:()=>{reset({title:'Solve for v',msg:'Rearrange and take the square root.'});say('Find the speed.');controls();S.check=finish(3,()=>!!S.vOn,'v = 10 m/s.')}},
{h:'Catch a mix-up',p:'Slips: forgetting the ½; forgetting to square v; using KE = mv; mixing grams with m/s; thinking doubling speed only doubles KE.',
 predict:{q:'Which is the mix-up?',opts:['doubling speed only doubles KE','doubling speed multiplies KE by 4','KE = ½ m v²'],ans:0},
 task:'Tap the mix-up',show:()=>auto(4,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Which is the mix-up?',opts:['doubling speed only doubles KE','doubling speed multiplies KE by 4','KE = ½ m v²'],picked:null});say('Find the mix-up.');controls();S.check=finish(4,()=>S.picked===0,'The square means 2v → 4× KE.')}},
{h:'Order the method',p:'Order: check units (kg, m/s) → write KE = ½mv² → square v → multiply → rearrange with √ if needed → answer in J or m/s.',
 predict:{q:'Correct first step is…',opts:['check mass is in kg and speed in m/s','skip the half','add m and v'],ans:0},
 task:'Tap the correct first step',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Method order',opts:['check mass is in kg and speed in m/s','skip the half','add m and v'],picked:null});say('Pick the first step.');controls();S.check=finish(5,()=>S.picked===0,'Units first, then the formula.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['KE equals…',[['½ m v²','ok'],['m × v','lin'],['½ m + v²','add']]],
 ['2 kg at 4 m/s. KE?',[['16 J','ok'],['8 J','half'],['32 J','nosq']]],
 ['Double speed → KE…',[['×4','ok'],['×2','lin'],['unchanged','miss']]],
 ['v from KE and m?',[['√(2 KE / m)','ok'],['KE / m','lin'],['½ m KE','mix']]],
 ['Which is the mix-up?',[['doubling speed only doubles KE','ok'],['KE uses v²','true'],['mass in kg','true']]],
 ['First step?',[['check kg and m/s','ok'],['skip the half','half'],['add m and v','add']]],
 ['Units of KE?',[['joules (J)','ok'],['m/s only','unit'],['kg only','unit']]]];
function why(t){let m='Use KE = ½ m v² with kg and m/s; square the speed; rearrange with a square root when needed.';
 if(t==='lin')m='Mass scales KE linearly, but speed is squared — doubling v multiplies KE by four, not two.';
 if(t==='add')m='Do not add mass and speed. Kinetic energy is half mass times speed squared.';
 if(t==='half')m='Keep the factor of ½. Forgetting it doubles the energy wrongly.';
 if(t==='nosq')m='Square the speed before multiplying. 4² is 16, not 4.';
 if(t==='miss')m='The v² term means energy grows faster than speed.';
 if(t==='mix')m='Rearrange carefully: v = √(2 KE / m), not a product of m and KE.';
 if(t==='unit')m='With kg and m/s the energy unit is the joule (J).';
 if(t==='true')m='That statement is true — not the mix-up.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.12,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Kinetic energy controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:()=>{},up:()=>{}});controls()}});
A.start()})})();
