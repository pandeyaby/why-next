/* Flagship: Animal Nutrition (ages 7–8; NC Y3 Animals including humans — identify that animals, including humans,
   need the right types and amount of nutrition and that they cannot make their own food; they get nutrition from
   what they eat). Build a balanced plate, sort food groups, contrast plant makers vs animal eaters, catch “animals
   photosynthesise” myth. Distinct from flagneeds (basic living needs), flagdiet (herbivore/carnivore/omnivore labels),
   flagchain (food-chain links). */
(()=>{
VIS.reg('flagnutri',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['plate','groups','maker','amounts','myth','order','chal'][A.step];
const GROUPS=['fruit/veg','protein','grains','dairy'];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function plate(g,W,H,parts){const C=A.col,cx=W/2,cy=H*.48,r=Math.min(W,H)*.28;
 g.beginPath();g.arc(cx,cy,r,0,7);g.fillStyle=A.alpha(C.tx,.06);g.fill();g.strokeStyle=C.tx;g.lineWidth=2.5;g.stroke();
 const cols=[C.ac,C.am,C.ok||C.ac,C.mu];
 (parts||[]).forEach((on,i)=>{if(!on)return;const a0=-Math.PI/2+i*Math.PI/2,a1=a0+Math.PI/2;
  g.beginPath();g.moveTo(cx,cy);g.arc(cx,cy,r*.9,a0,a1);g.closePath();g.fillStyle=A.alpha(cols[i%4],.55);g.fill();
  const mid=(a0+a1)/2;T(GROUPS[i],cx+Math.cos(mid)*r*.45,cy+Math.sin(mid)*r*.45,11,{c:C.tx,w:700})});
 T('balanced plate',cx,cy+r+18,12,{c:C.mu})}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#ffedd5',C.dark?.1:.4);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Animal nutrition',W/2,H*.3,A.narrow?15:18,{w:900});T('Right types · right amounts · cannot make food',W/2,H*.52,A.narrow?11:13,{c:C.mu});A.fx.draw(g);return}
 if(k==='plate'){T(S.title||'Build a balanced plate',W/2,H*.08,A.narrow?13:15,{w:800});plate(g,W,H*.85,S.parts||[0,0,0,0]);T(S.msg||'Tap groups to fill all four quarters.',W/2,H*.92,12,{c:C.mu,max:W*.92})}
 if(k==='groups'){T(S.title||'Sort the food',W/2,H*.08,A.narrow?13:15,{w:800});
  const bins=['protein','fruit/veg','grains'];bins.forEach((b,i)=>{const x=W*(.12+i*.3);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(x-W*.12,H*.22,W*.24,H*.28);T(b,x,H*.25,11,{c:C.mu});
   if(S.placed===i){g.fillStyle=A.alpha(C.ac,.35);g.fillRect(x-W*.1,H*.32,W*.2,H*.14);T(S.food||'',x,H*.39,13,{w:800})}});
  T(S.msg||`Where does ${S.food||'this food'} belong?`,W/2,H*.7,13,{c:C.mu});T(S.hint||'',W/2,H*.85,12,{c:C.mu})}
 if(k==='maker'){T(S.title||'Who makes food?',W/2,H*.1,A.narrow?13:15,{w:800});
  [['plant (maker)','Makes food with light + water',0],['animal (eater)','Must eat — cannot make food',1]].forEach((row,i)=>{
   const y=H*(.32+i*.28);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.06,y-H*.1,W*.88,H*.22);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.06,y-H*.1,W*.88,H*.22);
   T(row[0],W/2,y-H*.02,14,{w:800});T(row[1],W/2,y+H*.06,12,{c:C.mu})})}
 if(k==='amounts'||k==='myth'||k==='order'){T(S.title||'Choose',W/2,H*.1,A.narrow?13:15,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.28+i*.2);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.05,y-H*.08,W*.9,H*.16);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.05,y-H*.08,W*.9,H*.16);T(String(t),W/2,y,A.narrow?12:14,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{parts:[0,0,0,0],food:'',placed:null,picked:null,opts:[],title:'',msg:'',hint:'',check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*160))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='plate'){GROUPS.forEach((g,i)=>btn('Add '+g,()=>{S.parts=[...S.parts];S.parts[i]=1;S.msg=GROUPS.filter((_,j)=>S.parts[j]).join(', ')||'Empty plate';A.sound.tick();say(S.msg);A.redraw();S.check()},'Add '+g+' to the plate'));
  btn('Fill all four',()=>{S.parts=[1,1,1,1];S.msg='All four groups on the plate.';A.redraw();S.check()},'Fill every quarter')}
 if(kind()==='groups'){['protein','fruit/veg','grains'].forEach((b,i)=>btn(b,()=>{S.placed=i;A.sound.tick();say(b);A.redraw();S.check()},'Put food in '+b))}
 if(kind()==='maker'){btn('Plant makes food',()=>{S.picked=0;A.sound.tick();A.redraw();S.check()},'Choose plant maker');
  btn('Animal must eat',()=>{S.picked=1;A.sound.tick();A.redraw();S.check()},'Choose animal eater')}
 if(kind()==='amounts'||kind()==='myth'||kind()==='order')(S.opts||[]).forEach((t,i)=>btn(String(t),()=>{S.picked=i;A.sound.tick();say(String(t));A.redraw();S.check()},'Pick '+t))}
function down(p){if(kind()==='chal')return false;
 if(kind()==='plate'){const i=Math.max(0,Math.min(3,Math.floor((p.x/A.W)*4)));S.parts=[...S.parts];S.parts[i]=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='groups'){const i=Math.max(0,Math.min(2,Math.floor((p.x-A.W*.0)/(A.W/3))));S.placed=i;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='maker'){S.picked=p.y>A.H*.5?1:0;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='amounts'||kind()==='myth'||kind()==='order'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.2)/(A.H*.2))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 return true}
const steps=[
{h:'Build a balanced plate',p:'Animals, including humans, need the right types of nutrition. A balanced plate mixes fruit/veg, protein, grains and dairy — not only one food group.',
 predict:{q:'A balanced plate needs…',opts:['several food groups','only sweets','only water'],ans:0},
 task:'Fill all four plate quarters',show:()=>auto(0,[()=>{S.parts=[1,1,1,1];S.msg='All four groups.';A.redraw();S.check()}]),
 go:()=>{reset({title:'Fill fruit/veg · protein · grains · dairy',parts:[0,0,0,0],msg:'Tap each group.'});say('Fill all four quarters.');controls();S.check=finish(0,()=>S.parts.every(Boolean),'Right types means more than one food group.')}},
{h:'Sort a food into its group',p:'Nutrition words name groups: beans are protein, apple is fruit/veg, bread is grains. Sorting foods shows you know the types.',
 predict:{q:'Chicken belongs with…',opts:['protein','grains','only water'],ans:0},
 task:'Put chicken in the protein bin',show:()=>auto(1,[()=>{S.placed=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Sort: chicken',food:'chicken',placed:null,msg:'Which group?',hint:'Protein helps build muscles.'});say('Sort chicken into its food group.');controls();S.check=finish(1,()=>S.placed===0,'Chicken is a protein food.')}},
{h:'Animals cannot make food',p:'Green plants can make their own food using light and water. Animals cannot — they get nutrition from what they eat.',
 predict:{q:'Who must eat to get nutrition?',opts:['animals (including humans)','green plants only','rocks'],ans:0},
 task:'Tap who must eat',show:()=>auto(2,[()=>{S.picked=1;A.redraw();S.check()}]),
 go:()=>{reset({title:'Maker or eater?',picked:null});say('Who cannot make their own food?');controls();S.check=finish(2,()=>S.picked===1,'Animals must eat; they cannot make food like plants.')}},
{h:'Right amounts',p:'Right amounts matter too: too little protein or almost only sweets is not balanced nutrition, even if you eat something.',
 predict:{q:'Which plate shows right amounts?',opts:['mix of groups each day','only sweets every meal','skipping food for days'],ans:0},
 task:'Tap the balanced-amounts idea',show:()=>auto(3,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Right amounts?',opts:['mix of groups each day','only sweets every meal','skipping food for days'],picked:null});say('Pick right amounts.');controls();S.check=finish(3,()=>S.picked===0,'Right amounts means a sensible mix over the day, not one food only.')}},
{h:'Catch a myth',p:'A common mix-up is thinking animals can make food from sunlight like plants, or that any one food alone is complete nutrition.',
 predict:{q:'Which is the myth?',opts:['Animals make food from sunlight like plants','Animals get nutrition by eating','Plants can make their own food'],ans:0},
 task:'Tap the myth',show:()=>auto(4,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Which is the myth?',opts:['Animals make food from sunlight like plants','Animals get nutrition by eating','Plants can make their own food'],picked:null});say('Find the myth.');controls();S.check=finish(4,()=>S.picked===0,'Animals cannot photosynthesise; they must eat.')}},
{h:'Put the ideas in order',p:'First: animals cannot make food. Second: they need the right types. Third: they need the right amounts.',
 predict:{q:'First key idea?',opts:['animals cannot make their own food','only eat sweets','skip amounts'],ans:0},
 task:'Tap the first key idea',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'What comes first?',opts:['animals cannot make their own food','only eat sweets','skip amounts'],picked:null});say('Pick the first key idea.');controls();S.check=finish(5,()=>S.picked===0,'Start from: animals must get nutrition by eating.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['Animals get nutrition by…',[['eating food','ok'],['making food from sunlight','photo'],['never needing food','none']]],
 ['A balanced plate needs…',[['several food groups','ok'],['only sweets','sweet'],['only water','water']]],
 ['Chicken is mainly…',[['protein','ok'],['grains','grain'],['a plant maker','plant']]],
 ['Right amounts means…',[['a sensible mix of groups','ok'],['only one food forever','one'],['skipping meals for days','skip']]],
 ['Who can make their own food?',[['green plants','ok'],['all animals','animal'],['only humans','human']]],
 ['Which is the myth?',[['animals photosynthesise like plants','ok'],['animals must eat','eat'],['plants make food with light','plant']]],
 ['Nutrition for animals comes from…',[['what they eat','ok'],['sunlight alone','photo'],['rocks alone','rock']]]];
function why(t){let m='Animals need the right types and amounts of nutrition from food they eat.';
 if(t==='photo')m='Animals cannot make food from sunlight. That is what green plants do.';
 if(t==='none'||t==='skip')m='Living animals need food. Skipping for days is not right amounts.';
 if(t==='sweet'||t==='one')m='One food group — especially only sweets — is not balanced nutrition.';
 if(t==='water')m='Water matters, but nutrition also needs food groups like protein and fruit/veg.';
 if(t==='grain')m='Chicken is a protein food, not a grain.';
 if(t==='plant')m='Animals are eaters, not plant-style food makers.';
 if(t==='animal'||t==='human')m='Green plants make food; animals (including humans) must eat.';
 if(t==='eat')m='That one is true — pick the myth instead.';
 if(t==='rock')m='Rocks are not a food group for animal nutrition.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.12,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Animal nutrition controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:()=>{},up:()=>{}});controls()}});
A.start()})})();
