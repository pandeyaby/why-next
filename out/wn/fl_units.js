/* Flagship: Choosing measurement units (ages 6–7; NC Y2 Measurement — choose and use appropriate standard units
   to estimate and measure length/height (m/cm); mass (kg/g); temperature (°C); capacity (litres/ml) to the nearest
   appropriate unit). Match object→unit, spot absurd units, estimate then pick, catch “always use cm” myth.
   Distinct from flaglenht (how to measure length/height), flagmass (mass/weight comparing), flagtherm (reading a
   thermometer), flagcups (capacity play). */
(()=>{
VIS.reg('flagunits',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['match','absurd','estimate','temp','myth','sort','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#fef9c3',C.dark?.1:.42);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Choose the unit',W/2,H*.3,A.narrow?15:18,{w:900});T('m/cm · kg/g · °C · litres/ml',W/2,H*.52,A.narrow?12:14,{c:C.mu});A.fx.draw(g);return}
 if(k==='match'){T(S.title||'Match object to unit',W/2,H*.08,A.narrow?13:15,{w:800});
  T(S.obj||'',W/2,H*.28,A.narrow?16:18,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.42+i*.16);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.08,y-H*.06,W*.84,H*.12);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.08,y-H*.06,W*.84,H*.12);T(String(t),W/2,y,A.narrow?13:15)})}
 if(k==='absurd'){T(S.title||'Spot the silly unit',W/2,H*.08,A.narrow?13:15,{w:800});
  T(S.obj||'',W/2,H*.22,15,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.38+i*.18);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.06,y-H*.07,W*.88,H*.14);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.06,y-H*.07,W*.88,H*.14);T(String(t),W/2,y,A.narrow?12:14,{max:W*.82})})}
 if(k==='estimate'){T(S.title||'Estimate, then pick',W/2,H*.08,A.narrow?13:15,{w:800});
  T(S.obj||'',W/2,H*.24,15,{w:800});T(S.hint||'About how big?',W/2,H*.38,12,{c:C.mu});
  (S.opts||[]).forEach((t,i)=>{const x=W*(.2+i*.3);g.fillStyle=S.picked===i?A.alpha(C.ac,.35):A.alpha(C.tx,.08);g.beginPath();g.arc(x,H*.62,Math.min(W,H)*.1,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();T(String(t),x,H*.62,14,{w:800})})}
 if(k==='temp'||k==='myth'||k==='sort'){T(S.title||'Choose',W/2,H*.1,A.narrow?13:15,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.28+i*.2);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.05,y-H*.08,W*.9,H*.16);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.05,y-H*.08,W*.9,H*.16);T(String(t),W/2,y,A.narrow?12:14,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{obj:'',hint:'',picked:null,opts:[],title:'',msg:'',check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*160))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 (S.opts||[]).forEach((t,i)=>btn(String(t),()=>{S.picked=i;A.sound.tick();say(String(t));A.redraw();S.check()},'Pick '+t))}
function down(p){if(kind()==='chal')return false;
 if(kind()==='estimate'){const i=Math.max(0,Math.min(2,Math.floor((p.x-A.W*.05)/(A.W/3))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='match'||kind()==='absurd'||kind()==='temp'||kind()==='myth'||kind()==='sort'){const i=Math.max(0,Math.min((S.opts||[]).length-1,Math.floor((p.y-A.H*.2)/(A.H*.18))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 return true}
const steps=[
{h:'Match object to unit',p:'Choose the unit that fits the job: a pencil’s length in centimetres (cm), a playground in metres (m). Matching object→unit is the first skill.',
 predict:{q:'Best unit for a pencil’s length?',opts:['cm','m','kg'],ans:0},
 task:'Pick cm for the pencil',show:()=>auto(0,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Pencil length → unit?',obj:'✏️ pencil length',opts:['cm','m','kg'],picked:null});say('Pick the unit for a pencil.');controls();S.check=finish(0,()=>S.picked===0,'A pencil is short — measure in cm, not metres or kilograms.')}},
{h:'Spot the silly unit',p:'Some units are absurd for the object: a swimming pool is not measured in millilitres, and a grape is not measured in metres.',
 predict:{q:'Silly unit for a swimming pool?',opts:['millilitres (ml)','metres (m)','litres'],ans:0},
 task:'Tap the silly unit for a pool',show:()=>auto(1,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Swimming pool capacity',obj:'🏊 swimming pool',opts:['millilitres (ml)','metres (m) for length','litres or m³ ideas'],picked:null});say('Which unit is silly for a pool?');controls();S.check=finish(1,()=>S.picked===0,'Millilitres are tiny — a pool needs much larger capacity units.')}},
{h:'Estimate, then pick',p:'Estimate first: is a school bag closer to grams or kilograms? Then pick kg for a full bag, g for a rubber.',
 predict:{q:'Best unit for a full school bag’s mass?',opts:['kg','g','°C'],ans:0},
 task:'Pick kg for the school bag',show:()=>auto(2,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'School bag mass',obj:'🎒 full school bag',hint:'Heavy to lift — grams or kilograms?',opts:['kg','g','°C'],picked:null});say('Estimate, then pick the mass unit.');controls();S.check=finish(2,()=>S.picked===0,'A full bag is about kilograms, not grams or degrees.')}},
{h:'Temperature unit',p:'Temperature uses degrees Celsius (°C), not metres or litres. A warm day and a fridge both need °C.',
 predict:{q:'Unit for how hot the day is?',opts:['°C','cm','litres'],ans:0},
 task:'Pick °C for the day’s heat',show:()=>auto(3,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'How hot is the day?',opts:['°C','cm','litres'],picked:null});say('Pick the temperature unit.');controls();S.check=finish(3,()=>S.picked===0,'Heat and cold use °C, not length or capacity units.')}},
{h:'Catch a myth',p:'A common mix-up is “always use centimetres” for every length, or using kg for how hot something is. Match the unit to the attribute.',
 predict:{q:'Which is the mix-up?',opts:['Always use cm for every length','Use m for a playground','Use ml for a medicine spoon'],ans:0},
 task:'Tap the mix-up',show:()=>auto(4,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Which is the mix-up?',opts:['Always use cm for every length','Use m for a playground','Use ml for a medicine spoon'],picked:null});say('Find the mix-up.');controls();S.check=finish(4,()=>S.picked===0,'Long distances need metres (or more) — not always centimetres.')}},
{h:'Sort by attribute',p:'Length→m/cm, mass→kg/g, temperature→°C, capacity→litres/ml. Sorting jobs by attribute locks the matching habit.',
 predict:{q:'Capacity of a juice carton uses…',opts:['ml or litres','°C','kg only'],ans:0},
 task:'Tap the capacity units',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Juice carton — which attribute units?',opts:['ml or litres','°C','kg only'],picked:null});say('Pick capacity units.');controls();S.check=finish(5,()=>S.picked===0,'Cartons hold liquid — capacity in ml or litres.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['Pencil length unit?',[['cm','ok'],['m','big'],['kg','mass']]],
 ['Silly unit for a pool?',[['millilitres','ok'],['metres for length','len'],['large capacity units','cap']]],
 ['Full school bag mass?',[['kg','ok'],['g','tiny'],['°C','temp']]],
 ['How hot is the day?',[['°C','ok'],['cm','len'],['litres','cap']]],
 ['Which is the mix-up?',[['always use cm for every length','ok'],['use m for a playground','true'],['use ml for a medicine spoon','true2']]],
 ['Juice carton capacity?',[['ml or litres','ok'],['°C','temp'],['kg only','mass']]],
 ['Paper width best unit?',[['cm','ok'],['km','huge'],['°C','temp']]]];
function why(t){let m='Match the unit to what you measure: length, mass, temperature, or capacity.';
 if(t==='big'||t==='huge')m='That unit is far too big for this object. Pick a smaller length unit.';
 if(t==='mass')m='Kilograms and grams measure mass, not length, heat, or how much liquid fits.';
 if(t==='tiny')m='Grams are for light objects. A full school bag is closer to kilograms.';
 if(t==='temp')m='Degrees Celsius measure how hot or cold — not length, mass, or capacity.';
 if(t==='cap'||t==='len')m='That option can be sensible — tap the silly or wrong one instead.';
 if(t==='true'||t==='true2')m='That choice is sensible. The mix-up is “always use cm for every length”.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.12,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Measurement unit controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:()=>{},up:()=>{}});controls()}});
A.start()})})();
