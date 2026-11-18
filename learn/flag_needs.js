/* Flagship: what living things need (ages 5–7; NC Y2 animals including humans — find out about and describe the basic
   needs of animals for survival (water, food and air); plants need water, light and a suitable temperature; NGSS
   K-LS1-1). Sort needs from wants, keep a pet and a plant alive by giving each need, match a need to what it does,
   spot the missing need when something looks poorly, compare desert vs pond conditions, then a challenge on air,
   water, food and suitable conditions. */
(()=>{
VIS.reg('flagneeds',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['sort','pet','plant','match','poorly','place','chal'][A.step];
const ITEMS=[['water',0],['food',0],['air',0],['toy',1],['TV',1],['warmth',0],['sweets every hour',1],['light for plants',0]];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#dcfce7',C.dark?.08:.35);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Living things need water, food, air',W/2,H*.3,A.narrow?14:17,{w:900});T('and a suitable place to live.',W/2,H*.48,A.narrow?14:17,{w:900});A.fx.draw(g);return}
 if(k==='sort'){T('Need to stay alive, or just a want?',W/2,H*.08,A.narrow?13:16,{w:800});
  g.fillStyle=A.alpha(C.gr,.25);g.fillRect(W*.05,H*.2,W*.4,H*.55);g.fillStyle=A.alpha(C.or,.25);g.fillRect(W*.55,H*.2,W*.4,H*.55);
  T('Needs',W*.25,H*.28,14,{w:800});T('Wants',W*.75,H*.28,14,{w:800});
  const cur=ITEMS[S.ii||0];T(cur?cur[0]:'Done!',W/2,H*.55,A.narrow?16:20,{w:800});
  T(`Sorted ${(S.ok||0)} / ${ITEMS.length}`,W/2,H*.9,A.narrow?12:14,{c:C.mu})}
 if(k==='pet'){T('Keep the puppy alive',W/2,H*.08,A.narrow?15:18,{w:800});
  T('🐶',W/2,H*.35,48);const needs=['water','food','air','place'];
  needs.forEach((n,i)=>{const on=S.gave&&S.gave[n];const x=W*.15+i*W*.2,y=H*.7;g.fillStyle=on?A.alpha(C.gr,.4):A.alpha(C.tx,.08);g.fillRect(x-W*.08,y-H*.08,W*.16,H*.16);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(x-W*.08,y-H*.08,W*.16,H*.16);T(n,x,y,A.narrow?11:13,{w:700})});
  T(Object.keys(S.gave||{}).length>=4?'Puppy is OK!':'Tap each need',W/2,H*.92,A.narrow?13:15,{c:C.mu})}
 if(k==='plant'){T('Keep the seedling alive',W/2,H*.08,A.narrow?15:18,{w:800});
  const ok=S.water&&S.light&&S.air&&S.warm;g.fillStyle=ok?C.gr:C.mu;g.beginPath();g.moveTo(W/2,H*.55);g.lineTo(W*.45,H*.35);g.lineTo(W*.55,H*.35);g.closePath();g.fill();
  g.fillStyle='#8b5a2b';g.fillRect(W*.48,H*.55,W*.04,H*.15);
  [['water',S.water],['light',S.light],['air',S.air],['warmth',S.warm]].forEach((p,i)=>{T((p[1]?'✓ ':'○ ')+p[0],W*.2+i*W*.2,H*.85,A.narrow?11:13,{c:p[1]?C.gr:C.tx})})}
 if(k==='match'){T('What does this need help with?',W/2,H*.1,A.narrow?14:17,{w:800});
  T(S.need||'water',W/2,H*.35,A.narrow?22:28,{w:900});
  (S.opts||[]).forEach((t,i)=>{const y=H*.55+i*H*.12;g.fillStyle=S.picked===i?A.alpha(C.ac,.35):A.alpha(C.tx,.08);g.fillRect(W*.1,y-H*.05,W*.8,H*.1);g.strokeStyle=C.tx;g.lineWidth=1.5;g.strokeRect(W*.1,y-H*.05,W*.8,H*.1);T(t,W/2,y,A.narrow?12:14,{w:700})})}
 if(k==='poorly'){T('The plant looks poorly. What is missing?',W/2,H*.1,A.narrow?13:16,{w:800});
  T('🌱',W/2,H*.35,48);T('(dry soil, drooping)',W/2,H*.48,A.narrow?12:14,{c:C.mu});
  (S.opts||[]).forEach((t,i)=>{const x=W*.2+i*W*.3,y=H*.7;g.fillStyle=S.picked===i?A.alpha(C.ac,.35):A.alpha(C.tx,.08);g.fillRect(x-W*.12,y-H*.08,W*.24,H*.16);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(x-W*.12,y-H*.08,W*.24,H*.16);T(t,x,y,A.narrow?12:14,{w:700})})}
 if(k==='place'){T('Suitable place?',W/2,H*.08,A.narrow?15:18,{w:800});
  T(S.who==='fish'?'🐟 fish':'🌵 cactus',W/2,H*.3,40);
  [['pond',S.place==='pond'],['desert',S.place==='desert']].forEach((p,i)=>{const x=W*.25+i*W*.5,y=H*.65;g.fillStyle=p[1]?A.alpha(C.ac,.4):A.alpha(C.tx,.08);g.fillRect(x-W*.18,y-H*.1,W*.36,H*.2);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(x-W*.18,y-H*.1,W*.36,H*.2);T(p[0],x,y,A.narrow?14:16,{w:800})});
  T(S.place?`You chose the ${S.place}`:'Tap a place',W/2,H*.92,A.narrow?12:14,{c:C.mu})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{ii:0,ok:0,gave:{},water:0,light:0,air:0,warm:0,need:'water',opts:[],picked:null,who:'fish',place:null,lock:0,check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*280))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='sort'){btn('Need',()=>{const cur=ITEMS[S.ii];if(!cur)return;if(cur[1]===0){S.ok++;A.sound.pop();say(cur[0]+' is a need.')}else{A.sound.miss();say(cur[0]+' is a want, not needed to stay alive.')}S.ii++;A.redraw();S.check()},'Sort as need');
  btn('Want',()=>{const cur=ITEMS[S.ii];if(!cur)return;if(cur[1]===1){S.ok++;A.sound.pop();say(cur[0]+' is a want.')}else{A.sound.miss();say(cur[0]+' is a need to stay alive.')}S.ii++;A.redraw();S.check()},'Sort as want')}
 if(kind()==='pet'){['water','food','air','place'].forEach(n=>btn('Give '+n,()=>{S.gave=S.gave||{};S.gave[n]=1;A.sound.tick();say('Gave '+n);A.redraw();S.check()},'Give '+n))}
 if(kind()==='plant'){btn('Water',()=>{S.water=1;A.sound.tick();say('Watered');A.redraw();S.check()},'Give water');
  btn('Light',()=>{S.light=1;A.sound.tick();say('Light on');A.redraw();S.check()},'Give light');
  btn('Air',()=>{S.air=1;A.sound.tick();say('Fresh air');A.redraw();S.check()},'Give air');
  btn('Warmth',()=>{S.warm=1;A.sound.tick();say('Warm enough');A.redraw();S.check()},'Give warmth')}
 if(kind()==='match'){(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();A.redraw();S.check()},t))}
 if(kind()==='poorly'){(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();A.redraw();S.check()},t))}
 if(kind()==='place'){btn('Pond',()=>{S.place='pond';A.sound.tick();A.redraw();S.check()},'Choose pond');btn('Desert',()=>{S.place='desert';A.sound.tick();A.redraw();S.check()},'Choose desert')}
}
function down(p){if(kind()==='chal')return false;S.drag=1;S.px=p.x;S.py=p.y;return true}
function move(p){if(!S.drag)return;if(kind()==='sort'){/* drag toward bins */}
 if(kind()==='place'){S.place=p.x<A.W/2?'pond':'desert';A.redraw()}
 if(kind()==='poorly'||kind()==='match'){const opts=S.opts||[];if(kind()==='poorly'){const i=Math.floor((p.x-A.W*.05)/(A.W*.3));if(i>=0&&i<opts.length)S.picked=i}else{const i=Math.floor((p.y-A.H*.5)/(A.H*.12));if(i>=0&&i<opts.length)S.picked=i}A.redraw()}}
function up(p){if(kind()==='sort'&&S.drag&&ITEMS[S.ii]){const cur=ITEMS[S.ii],needSide=p.x<A.W/2;const correct=(needSide&&cur[1]===0)||(!needSide&&cur[1]===1);if(correct){S.ok++;A.sound.pop()}else A.sound.miss();S.ii++;A.redraw();S.check()}
 if(kind()==='place'||kind()==='poorly'||kind()==='match')S.check();S.drag=0}
const steps=[
{h:'Need or want?',p:'A need keeps a living thing alive: water, food, air, a suitable place. A want is nice but you can live without it.',
 predict:{q:'Which is a need?',opts:['water','a toy car','watching TV'],ans:0},
 task:'Sort all 8 cards into needs and wants',show:()=>auto(0,[()=>{S.ii=ITEMS.length;S.ok=ITEMS.length;A.redraw();S.check()}]),
 go:()=>{reset({ii:0,ok:0});say('Sort each card: need or want?');controls();S.check=finish(0,()=>S.ii>=ITEMS.length&&S.ok>=6,'Needs keep you alive. Wants are extras.')}},
{h:'Care for a pet',p:'A puppy needs water, food, air and a safe place. Tap each need to give it.',
 predict:{q:'A puppy can live without…',opts:['a toy bone','water','air'],ans:0},
 task:'Give the puppy all four needs',show:()=>auto(1,[()=>{S.gave={water:1,food:1,air:1,place:1};A.redraw();S.check()}]),
 go:()=>{reset({gave:{}});say('Give every need the puppy must have.');controls();S.check=finish(1,()=>['water','food','air','place'].every(k=>S.gave[k]),'Water, food, air and a place: the puppy can survive.')}},
{h:'Care for a plant',p:'Plants need water, light, air and a suitable temperature. Animals eat food; plants make food using light.',
 task:'Give the seedling water, light, air and warmth',show:()=>auto(2,[()=>{S.water=S.light=S.air=S.warm=1;A.redraw();S.check()}]),
 go:()=>{reset();say('Give the plant each thing it needs.');controls();S.check=finish(2,()=>S.water&&S.light&&S.air&&S.warm,'With water, light, air and warmth the seedling can live.')}},
{h:'What is water for?',p:'Match each need to what it helps with.',
 predict:{q:'Air is mainly so living things can…',opts:['breathe','watch TV','float toys'],ans:0},
 task:'Match water to the right job',show:()=>auto(3,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({need:'water',opts:['drinking and staying hydrated','making loud sounds','charging a phone'],picked:null});say('What does water help with?');controls();S.check=finish(3,()=>S.picked===0,'Water is for drinking and staying hydrated — a survival need.')}},
{h:'Something is missing',p:'A drooping plant in dry soil is missing water. Spot the missing need.',
 predict:{q:'Dry soil and a drooping plant: what is missing?',opts:['water','a TV','a football'],ans:0},
 task:'Choose what the poorly plant is missing',show:()=>auto(4,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['water','a toy','headphones'],picked:null});say('What is missing?');controls();S.check=finish(4,()=>S.picked===0,'Dry soil means water is the missing need.')}},
{h:'Suitable place',p:'A fish needs water all around it. A cactus needs a dry, sunny place. Suitable conditions matter.',
 task:'Put the fish in the pond',show:()=>auto(5,[()=>{S.place='pond';A.redraw();S.check()}]),
 go:()=>{reset({who:'fish',place:null});say('Where should the fish live?');controls();S.check=finish(5,()=>S.place==='pond','A fish needs a watery place. The desert is not suitable.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['Which does every animal need?',[['air','ok'],['a scooter','want'],['headphones','want2']]],
 ['Plants make food using…',[['light','ok'],['toys','want'],['TV','want2']]],
 ['A want is…',[['nice but not needed to stay alive','ok'],['the same as a need','same'],['only for plants','plants']]],
 ['A fish in a dry desert…',[['does not have a suitable place','ok'],['is fine without water','fine'],['only needs toys','toys']]],
 ['Food for animals is a…',[['need','ok'],['want','want'],['decoration','deco']]],
 ['Warmth for a seedling is part of…',[['suitable conditions','ok'],['watching screens','screen'],['buying sweets','sweet']]],
 ['Without air, living things…',[['cannot breathe and stay alive','ok'],['only get bored','bored'],['grow faster','fast']]]];
function why(t){let m='Needs keep living things alive: water, food, air, suitable conditions.';
 if(t==='want'||t==='want2')m='That is a want. You can live without it. Needs are water, food, air and a suitable place.';
 if(t==='same')m='A need is required to stay alive. A want is optional.';
 if(t==='plants')m='Wants and needs language applies to animals and plants.';
 if(t==='fine')m='Fish need water around them. A dry desert is not suitable.';
 if(t==='toys')m='Toys are wants. Survival needs come first.';
 if(t==='deco')m='Food is a survival need for animals, not a decoration.';
 if(t==='screen'||t==='sweet')m='Screens and sweets are wants. Warmth is a suitable-condition need for many plants.';
 if(t==='bored')m='Without air, animals cannot breathe. That is about staying alive, not boredom.';
 if(t==='fast')m='Lack of air harms living things; it does not help them grow.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+2)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Needs controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:p=>move(p),up:p=>up(p||{x:0,y:0})});controls()}});
A.start()})})();
