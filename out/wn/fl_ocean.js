/* Flagship: what is the ocean (ages 5–7; KS1 geography/science: ocean as vast salt-water body & habitat).
   Build shore→shallow→deep, sort ocean vs pond/puddle, place salt vs fresh, match sea animals to ocean,
   reject pool=ocean myths, then a challenge on those slips. Distinct from where-water-is-found (flagwater). */
(()=>{
VIS.reg('flagocean',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['zones','sort','salt','homes','waves','idea','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.08:.4);g.fillRect(0,0,W,H);
 if(k==='chal'){T('The ocean is huge salt water',W/2,H*.32,A.narrow?14:17,{w:900});T('It is not a puddle or a pool',W/2,H*.52,A.narrow?12:15,{c:C.mu});A.fx.draw(g);return}
 if(k==='zones'){T('Build shore, shallow, deep',W/2,H*.08,A.narrow?14:17,{w:800});
  const labs=['Shore','Shallow','Deep'],cols=[C.am,C.cy,C.vi];
  labs.forEach((lab,i)=>{const on=S.zones&&S.zones[i];g.fillStyle=on?A.alpha(cols[i],.45):A.alpha(C.tx,.08);g.fillRect(W*(.08+i*.3),H*.35,W*.28,H*.3);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*(.08+i*.3),H*.35,W*.28,H*.3);T(on?lab:'?',W*(.22+i*.3),H*.5,A.narrow?13:15)});
  T(`Zones set: ${(S.zones||[]).filter(Boolean).length}/3`,W/2,H*.88,13,{c:C.mu})}
 if(k==='sort'){T('Ocean or not?',W/2,H*.08,A.narrow?15:18,{w:800});
  const items=S.items||[],i=S.idx||0;if(i<items.length){T(items[i][0],W/2,H*.4,40);T(items[i][1],W/2,H*.58,A.narrow?14:16)}else T('All sorted!',W/2,H*.45,20,{c:C.gr});
  T(`Item ${Math.min(i+1,items.length)} of ${items.length}`,W/2,H*.9,12,{c:C.mu})}
 if(k==='salt'){T('Ocean water is salty',W/2,H*.1,A.narrow?15:18,{w:800});
  T('Ocean',W*.3,H*.35,16);T('Pond',W*.7,H*.35,16);
  g.fillStyle=S.oceanSalt?A.alpha(C.cy,.5):A.alpha(C.tx,.08);g.fillRect(W*.15,H*.45,W*.3,H*.25);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.15,H*.45,W*.3,H*.25);T(S.oceanSalt?'salty':'?',W*.3,H*.57,16);
  g.fillStyle=S.pondFresh?A.alpha(C.gr,.45):A.alpha(C.tx,.08);g.fillRect(W*.55,H*.45,W*.3,H*.25);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.55,H*.45,W*.3,H*.25);T(S.pondFresh?'fresh':'?',W*.7,H*.57,16);
  T('Mark ocean salty and pond fresh',W/2,H*.88,A.narrow?12:14,{c:C.mu})}
 if(k==='homes'){T('Who lives in the ocean?',W/2,H*.08,A.narrow?14:17,{w:800});
  T(S.clue||'',W/2,H*.28,A.narrow?16:20,{w:800});
  (S.opts||[]).forEach((t,i)=>{const x=W*.2+i*W*.3,y=H*.58;g.fillStyle=S.picked===i?A.alpha(C.ac,.35):A.alpha(C.tx,.08);g.fillRect(x-W*.12,y-H*.1,W*.24,H*.2);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(x-W*.12,y-H*.1,W*.24,H*.2);T(t,x,y,A.narrow?13:15)})}
 if(k==='waves'){T('Waves move on the ocean surface',W/2,H*.1,A.narrow?13:16,{w:800});
  g.fillStyle=A.alpha(C.cy,.35);g.fillRect(0,H*.45,W,H*.55);g.strokeStyle=C.tx;g.lineWidth=3;g.beginPath();
  for(let x=0;x<=W;x+=8){const y=H*.5+Math.sin((x/W)*Math.PI*4+(S.wave||0))*H*.06;x===0?g.moveTo(x,y):g.lineTo(x,y)}g.stroke();
  T(S.wave?'Waves rolling':'Tap to make waves',W/2,H*.25,A.narrow?13:15,{c:C.mu});T(S.wide?'Ocean is vast':'Also mark how huge it is',W/2,H*.85,A.narrow?12:14,{c:C.mu})}
 if(k==='idea'){T('Tap the true sentence',W/2,H*.1,A.narrow?15:18,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.3+i*.18);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.06,y-H*.07,W*.88,H*.14);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.06,y-H*.07,W*.88,H*.14);T(t,W/2,y,A.narrow?12:14,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{zones:[0,0,0],items:[],idx:0,oceanSalt:0,pondFresh:0,clue:'',opts:[],picked:null,wave:0,wide:0,check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*280))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function setZone(i){S.zones[i]=1;A.sound.tick();say(['Shore','Shallow water','Deep ocean'][i]+' set.');A.redraw();S.check()}
function sortPick(yes){if(S.idx>=S.items.length)return;const want=S.items[S.idx][2];
 if(yes!==want){A.sound.miss();say(want?'That belongs to the ocean.':'Not the ocean — too small or fresh or man-made.');return}
 S.idx++;A.sound.tick();say(S.idx>=S.items.length?'All sorted.':'Yes. Next.');A.redraw();S.check()}
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='zones'){btn('Shore',()=>setZone(0),'Set shore');btn('Shallow',()=>setZone(1),'Set shallow');btn('Deep',()=>setZone(2),'Set deep')}
 if(kind()==='sort'&&S.idx<S.items.length){btn('Ocean',()=>sortPick(1),'This is ocean');btn('Not ocean',()=>sortPick(0),'This is not ocean')}
 if(kind()==='salt'){btn('Ocean = salty',()=>{S.oceanSalt=1;A.sound.tick();say('Ocean water is salty');A.redraw();S.check()},'Mark ocean salty');btn('Pond = fresh',()=>{S.pondFresh=1;A.sound.tick();say('Pond water is usually fresh');A.redraw();S.check()},'Mark pond fresh')}
 if(kind()==='homes')(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();say(t);A.redraw();S.check()},'Pick '+t));
 if(kind()==='waves'){btn('Make waves',()=>{S.wave=1;A.sound.tick();say('Waves on the surface');A.redraw();S.check()},'Make waves');btn('Mark huge ocean',()=>{S.wide=1;A.sound.tick();say('The ocean is vast');A.redraw();S.check()},'Mark that the ocean is huge')}
 if(kind()==='idea')(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();say(t);A.redraw();S.check()},'Pick: '+t))}
function down(p){if(kind()==='chal')return false;S.drag=1;
 if(kind()==='zones'){setZone(Math.min(2,Math.max(0,Math.floor((p.x/A.W)*3))));return true}
 if(kind()==='sort'){sortPick(p.x<A.W/2?1:0);return true}
 if(kind()==='salt'){if(p.x<A.W/2)S.oceanSalt=1;else S.pondFresh=1;A.redraw();S.check();return true}
 if(kind()==='waves'){if(p.y<A.H/2)S.wave=1;else S.wide=1;A.redraw();S.check();return true}
 return true}
function move(){}
function up(){S.drag=0}
const steps=[
{h:'Ocean zones',p:'The ocean meets land at the shore, then shallow water, then deep water farther out.',
 predict:{q:'Deep ocean water is…',opts:['farther from the shore','the same as a puddle','only in a bathtub'],ans:0},
 task:'Set shore, shallow and deep zones',show:()=>auto(0,[()=>{S.zones=[1,1,1];A.redraw();S.check()}]),
 go:()=>{reset({zones:[0,0,0]});say('Build shore, shallow and deep.');controls();S.check=finish(0,()=>S.zones.every(Boolean),'Shore, shallow and deep make the ocean picture.')}},
{h:'Ocean or not?',p:'The ocean is a huge body of salt water. Puddles, baths and many ponds are not oceans.',
 predict:{q:'Which is the ocean?',opts:['vast salt water on Earth','a garden puddle','a bathtub'],ans:0},
 task:'Sort 4 places as ocean or not',show:()=>auto(1,[()=>sortPick(1),()=>sortPick(0),()=>sortPick(1),()=>sortPick(0)]),
 go:()=>{reset({items:[['🌊','Wide salt sea',1],['🛁','Bathtub',0],['🐋','Open ocean with whales',1],['💧','Garden puddle',0]],idx:0});say('Sort each place.');controls();S.check=finish(1,()=>S.idx>=4,'Only the vast salt sea counts as the ocean.')}},
{h:'Salty water',p:'Ocean water tastes salty. Most ponds and puddles are fresh water.',
 predict:{q:'Ocean water is…',opts:['salty','always fresh like a tap','made of juice'],ans:0},
 task:'Mark ocean salty and pond fresh',show:()=>auto(2,[()=>{S.oceanSalt=1;S.pondFresh=1;A.redraw();S.check()}]),
 go:()=>{reset({oceanSalt:0,pondFresh:0});say('Mark salt vs fresh.');controls();S.check=finish(2,()=>S.oceanSalt&&S.pondFresh,'Ocean = salty; typical ponds = fresh.')}},
{h:'Ocean homes',p:'Many animals live in the ocean habitat — fish, whales, crabs. A sheep lives on land.',
 predict:{q:'A whale’s home is…',opts:['the ocean','a sheep field','a bathtub'],ans:0},
 task:'Pick ocean for the whale',show:()=>auto(3,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({clue:'Whale home?',opts:['ocean','sheep field','bathtub'],picked:null});say('Where does a whale live?');controls();S.check=finish(3,()=>S.picked===0,'Whales live in the ocean habitat.')}},
{h:'Waves and size',p:'Waves move on the ocean surface. The ocean is vast — it covers most of Earth.',
 predict:{q:'The ocean is…',opts:['huge salt water with waves','always smaller than a pond','only a swimming pool'],ans:0},
 task:'Make waves and mark that the ocean is huge',show:()=>auto(4,[()=>{S.wave=1;S.wide=1;A.redraw();S.check()}]),
 go:()=>{reset({wave:0,wide:0});say('Show waves and size.');controls();S.check=finish(4,()=>S.wave&&S.wide,'Waves roll on a vast salt ocean.')}},
{h:'True sentence',p:'Pick the sentence that matches what the ocean is.',
 predict:{q:'Which is true?',opts:['the ocean is huge salt water','every puddle is an ocean','pools and oceans are the same'],ans:0},
 task:'Tap the true sentence',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['The ocean is huge salt water on Earth','A bathtub is an ocean','Ponds and oceans are always the same'],picked:null});say('Tap the true sentence.');controls();S.check=finish(5,()=>S.picked===0,'Ocean = vast salt water — not baths or every pond.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['The ocean is…',[['huge salt water on Earth','ok'],['a garden puddle','puddle'],['always a bathtub','bath']]],
 ['Ocean water is…',[['salty','ok'],['always fresh like a tap','fresh'],['made of juice','juice']]],
 ['Deep water is…',[['farther from the shore','ok'],['the same as shore sand','sand'],['only in cups','cup']]],
 ['A whale lives in…',[['the ocean','ok'],['a sheep field','field'],['a toy box','toy']]],
 ['A swimming pool is…',[['not the ocean','ok'],['the same as the ocean','same'],['saltier than every sea','saltier']]],
 ['Waves move…',[['on the ocean surface','ok'],['only underground always','under'],['inside dry rocks','rock']]],
 ['Why isn’t a puddle an ocean?',[['it is tiny and usually fresh','ok'],['it has more whales','whales'],['it is made of metal','metal']]]];
function why(t){let m='The ocean is vast salt water — not every wet place.';
 if(t==='puddle'||t==='bath'||t==='same'||t==='cup')m='Puddles, baths and cups are small and usually fresh. The ocean is huge and salty.';
 if(t==='fresh'||t==='juice')m='Ocean water is salty. Tap water and juice are not ocean water.';
 if(t==='sand'||t==='field'||t==='toy')m='Shore sand and land homes are not the deep ocean habitat.';
 if(t==='saltier')m='A pool is not the ocean. Seas and oceans are the huge natural salt bodies.';
 if(t==='under'||t==='rock')m='Waves move on the surface of the water.';
 if(t==='whales'||t==='metal')m='Puddles are tiny and fresh; they are not oceans and do not hold whales.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Ocean controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:p=>move(p),up:up});controls()}});
A.start()})})();
