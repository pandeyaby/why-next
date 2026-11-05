/* Flagship: whales & dolphins are mammals (ages 5–7). Living in water does not make an animal a fish. Whales and
   dolphins breathe air at the surface, are warm-blooded, and feed babies milk — mammal traits. Fish take oxygen from
   water with gills and usually lay eggs. Sort mammal vs fish clues, trace a blowhole breath, match baby feeding, and
   reject the 'lives in water = fish' slip. */
(()=>{
VIS.reg('flagwhale',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['sort','breath','milk','warm','notfish','check','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
const CLUES=[['breathes air at surface',0],['has gills in water',1],['feeds baby milk',0],['usually lays eggs in water',1],['warm-blooded',0],['lives in the ocean',2]];
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#cffafe',C.dark?.08:.4);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Whales and dolphins are mammals',W/2,H*.32,A.narrow?13:16,{w:900});T('even though they live in the ocean.',W/2,H*.5,A.narrow?13:15,{w:800});A.fx.draw(g);return}
 if(k==='sort'){T('Mammal clue or fish clue?',W/2,H*.08,A.narrow?13:16,{w:800});
  g.fillStyle=A.alpha(C.gr,.25);g.fillRect(W*.04,H*.18,W*.42,H*.5);g.fillStyle=A.alpha(C.bl,.25);g.fillRect(W*.54,H*.18,W*.42,H*.5);
  T('Mammal',W*.25,H*.26,14,{w:800});T('Fish',W*.75,H*.26,14,{w:800});
  const cur=CLUES[S.ii||0];T(cur?cur[0]:'Done!',W/2,H*.55,A.narrow?13:16,{w:800,max:W*.9});
  T(`Sorted ${(S.ok||0)} / ${CLUES.length}`,W/2,H*.9,A.narrow?12:14,{c:C.mu})}
 if(k==='breath'){T('Whale needs air — tap up to breathe',W/2,H*.08,A.narrow?12:15,{w:800});
  const y=H*.35+(S.up?0:H*.25);T('🐋',W/2,y,48);T(S.up?'Blowhole open — air in!':'Under water — hold breath',W/2,H*.75,A.narrow?12:14,{c:C.mu});
  g.fillStyle=A.alpha(C.bl,.3);g.fillRect(0,H*.55,W,H*.45)}
 if(k==='milk'){T('How does a baby dolphin feed?',W/2,H*.1,A.narrow?13:16,{w:800});
  T('🐬 + baby',W/2,H*.32,36);
  (S.opts||[]).forEach((t,i)=>{const y=H*.5+i*H*.14;g.fillStyle=S.picked===i?A.alpha(C.ac,.35):A.alpha(C.tx,.08);g.fillRect(W*.08,y-H*.05,W*.84,H*.11);g.strokeStyle=C.tx;g.lineWidth=1.5;g.strokeRect(W*.08,y-H*.05,W*.84,H*.11);T(t,W/2,y,A.narrow?12:14,{w:700})})}
 if(k==='warm'){T('Warm-blooded or cold like the sea?',W/2,H*.1,A.narrow?12:15,{w:800});
  T('A whale in cold water stays…',W/2,H*.32,A.narrow?13:16,{w:800});
  [['Warm inside',S.ans==='warm'],['As cold as the sea',S.ans==='cold']].forEach((p,i)=>{const x=W*.25+i*W*.5,y=H*.65;g.fillStyle=p[1]?A.alpha(C.ac,.4):A.alpha(C.tx,.08);g.fillRect(x-W*.2,y-H*.1,W*.4,H*.2);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(x-W*.2,y-H*.1,W*.4,H*.2);T(p[0],x,y,A.narrow?13:15,{w:800})})}
 if(k==='notfish'){T('Does living in water make it a fish?',W/2,H*.1,A.narrow?12:15,{w:800});
  T('Whale in the ocean',W/2,H*.32,A.narrow?14:17,{w:800});
  [['Still a mammal',S.ans==='mammal'],['Must be a fish',S.ans==='fish']].forEach((p,i)=>{const x=W*.25+i*W*.5,y=H*.65;g.fillStyle=p[1]?A.alpha(C.ac,.4):A.alpha(C.tx,.08);g.fillRect(x-W*.2,y-H*.1,W*.4,H*.2);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(x-W*.2,y-H*.1,W*.4,H*.2);T(p[0],x,y,A.narrow?13:15,{w:800})})}
 if(k==='check'){T('Tick every mammal trait the whale has',W/2,H*.08,A.narrow?12:15,{w:800});
  [['Air breath',S.air],['Milk for baby',S.milk],['Warm-blooded',S.warm],['Gills',S.gills]].forEach((p,i)=>{const x=W*.2+(i%2)*W*.4,y=H*.4+Math.floor(i/2)*H*.25;g.fillStyle=p[1]?A.alpha(C.gr,.4):A.alpha(C.tx,.08);g.fillRect(x-W*.16,y-H*.08,W*.32,H*.16);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(x-W*.16,y-H*.08,W*.32,H*.16);T(p[0],x,y,A.narrow?12:14,{w:700})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{ii:0,ok:0,up:0,picked:null,ans:null,air:0,milk:0,warm:0,gills:0,opts:[],check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*280))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='sort'){btn('Mammal',()=>{const cur=CLUES[S.ii];if(!cur)return;if(cur[1]===0||cur[1]===2){/* ocean is both habitats — count as neither exclusive; treat 2 as soft ok if they pick either? teach: habitat alone does not decide */ if(cur[1]===2){A.sound.tick();say('Ocean home alone does not decide mammal or fish.');} else {S.ok++;A.sound.pop();say(cur[0]+' is a mammal clue.')} } else {A.sound.miss();say(cur[0]+' is a fish clue.')}S.ii++;A.redraw();S.check()},'Sort as mammal');
  btn('Fish',()=>{const cur=CLUES[S.ii];if(!cur)return;if(cur[1]===1){S.ok++;A.sound.pop();say(cur[0]+' is a fish clue.')}else if(cur[1]===2){A.sound.tick();say('Ocean home alone does not decide mammal or fish.');}else{A.sound.miss();say(cur[0]+' is a mammal clue.')}S.ii++;A.redraw();S.check()},'Sort as fish')}
 if(kind()==='breath'){btn('Swim up to breathe',()=>{S.up=1;A.sound.tick();say('Whale breathes air at the surface.');A.redraw();S.check()},'Surface to breathe')}
 if(kind()==='milk'){(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();A.redraw();S.check()},t))}
 if(kind()==='warm'){btn('Warm inside',()=>{S.ans='warm';A.sound.tick();A.redraw();S.check()},'Warm-blooded');btn('As cold as sea',()=>{S.ans='cold';A.sound.tick();A.redraw();S.check()},'Cold as sea')}
 if(kind()==='notfish'){btn('Still a mammal',()=>{S.ans='mammal';A.sound.tick();A.redraw();S.check()},'Still a mammal');btn('Must be a fish',()=>{S.ans='fish';A.sound.tick();A.redraw();S.check()},'Must be a fish')}
 if(kind()==='check'){btn('Air breath',()=>{S.air=1;A.sound.tick();A.redraw();S.check()},'Has air breath');btn('Milk for baby',()=>{S.milk=1;A.sound.tick();A.redraw();S.check()},'Feeds milk');btn('Warm-blooded',()=>{S.warm=1;A.sound.tick();A.redraw();S.check()},'Warm-blooded');btn('Gills',()=>{S.gills=1;A.sound.miss();say('Whales do not have gills. That is a fish trait.');A.redraw()},'Gills')}
}
function down(p){if(kind()==='chal')return false;S.drag=1;return true}
function move(p){if(!S.drag)return;
 if(kind()==='sort'){/* drag toward bins */}
 if(kind()==='breath'){S.up=p.y<A.H*.5?1:0;A.redraw()}
 if(kind()==='milk'){const i=Math.floor((p.y-A.H*.45)/(A.H*.14));if(i>=0&&i<(S.opts||[]).length){S.picked=i;A.redraw()}}
 if(kind()==='warm'){S.ans=p.x<A.W/2?'warm':'cold';A.redraw()}
 if(kind()==='notfish'){S.ans=p.x<A.W/2?'mammal':'fish';A.redraw()}
 if(kind()==='check'){const col=p.x<A.W/2?0:1,row=p.y<A.H*.52?0:1,idx=row*2+col;const keys=['air','milk','warm','gills'];if(idx>=0&&idx<3){S[keys[idx]]=1;A.redraw()}}
}
function up(p){if(kind()==='sort'&&S.drag&&CLUES[S.ii]){const cur=CLUES[S.ii],left=p.x<A.W/2;let correct=false;if(cur[1]===2){correct=true;say('Ocean home alone does not decide.');A.sound.tick()}else if(left&&cur[1]===0){correct=true;S.ok++;A.sound.pop()}else if(!left&&cur[1]===1){correct=true;S.ok++;A.sound.pop()}else A.sound.miss();S.ii++;A.redraw();S.check()}
 else if(kind()!=='chal')S.check();S.drag=0}
const steps=[
{h:'Mammal or fish clue?',p:'Mammals breathe air, feed babies milk and are warm-blooded. Fish often have gills and lay eggs. Living in the ocean alone does not decide.',
 predict:{q:'Feeding a baby milk is a…',opts:['mammal clue','fish clue','weather clue'],ans:0},
 task:'Sort all six cards into mammal or fish clues',show:()=>auto(0,[()=>{S.ii=CLUES.length;S.ok=5;A.redraw();S.check()}]),
 go:()=>{reset({ii:0,ok:0});say('Sort each clue: mammal or fish?');controls();S.check=finish(0,()=>S.ii>=CLUES.length&&S.ok>=4,'Air, milk and warm blood point to mammals. Gills and eggs point to fish.')}},
{h:'Breathe at the surface',p:'Whales and dolphins have lungs. They swim up and breathe air through a blowhole. Fish take oxygen from water with gills.',
 predict:{q:'A whale under water for a long time must…',opts:['come up for air','use gills forever','turn into a fish'],ans:0},
 task:'Bring the whale up to breathe air',show:()=>auto(1,[()=>{S.up=1;A.redraw();S.check()}]),
 go:()=>{reset({up:0});say('Tap up so the whale can breathe air.');controls();S.check=finish(1,()=>S.up===1,'The whale breathes air at the surface — a mammal trait.')}},
{h:'Baby feeds on milk',p:'Mammal babies drink milk from their mother. Fish do not feed babies milk.',
 task:'Choose how a baby dolphin feeds',show:()=>auto(2,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['Milk from its mother','Only plankton like a filter sponge','Rainwater from clouds'],picked:null});say('How does the baby feed?');controls();S.check=finish(2,()=>S.picked===0,'Milk from mother is a mammal trait.')}},
{h:'Warm inside',p:'Whales are warm-blooded. Their body stays warm even in cold seas. Many fish are cold-blooded and match the water temperature.',
 predict:{q:'In icy water a whale stays…',opts:['warm inside','as cold as the ice','unable to live there'],ans:0},
 task:'Choose how a whale feels inside in cold water',show:()=>auto(3,[()=>{S.ans='warm';A.redraw();S.check()}]),
 go:()=>{reset({ans:null});say('Warm inside or as cold as the sea?');controls();S.check=finish(3,()=>S.ans==='warm','Warm-blooded: the whale stays warm inside.')}},
{h:'Water ≠ fish',p:'Living in water does not make an animal a fish. Whales live in the ocean and are still mammals.',
 task:'Decide: mammal or fish?',show:()=>auto(4,[()=>{S.ans='mammal';A.redraw();S.check()}]),
 go:()=>{reset({ans:null});say('Does the ocean home make it a fish?');controls();S.check=finish(4,()=>S.ans==='mammal','Still a mammal. Habitat alone does not decide.')}},
{h:'Mammal checklist',p:'Tick the mammal traits. Leave out gills — that is for fish.',
 task:'Tick air breath, milk and warm-blooded',show:()=>auto(5,[()=>{S.air=S.milk=S.warm=1;A.redraw();S.check()}]),
 go:()=>{reset();say('Tick every mammal trait.');controls();S.check=finish(5,()=>S.air&&S.milk&&S.warm&&!S.gills,'Air, milk and warm blood: whale traits. No gills.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['Whales and dolphins are…',[['mammals','ok'],['fish','fish'],['insects','bug']]],
 ['A whale breathes…',[['air at the surface','ok'],['only through gills','gills'],['soil nutrients','soil']]],
 ['Mammal babies are fed…',[['milk','ok'],['only seaweed','weed'],['lightning','zap']]],
 ['Living in the ocean…',[['does not make an animal a fish','ok'],['always means it is a fish','always'],['means it cannot be a mammal','cant']]],
 ['Warm-blooded means…',[['the body stays warm inside','ok'],['the animal matches icy water','match'],['the animal has no blood','noblood']]],
 ['Fish often take oxygen using…',[['gills','ok'],['blowholes only','blow'],['milk','milk']]],
 ['A dolphin under water must…',[['come up for air later','ok'],['grow gills in one minute','grow'],['stop being a mammal','stop']]]];
function why(t){let m='Whales and dolphins are mammals: air breath, milk for babies, warm-blooded.';
 if(t==='fish')m='They live in water, but traits (air, milk, warm blood) make them mammals, not fish.';
 if(t==='bug')m='Insects are a different group. Whales are mammals.';
 if(t==='gills')m='Whales have lungs and a blowhole. Gills are a fish trait.';
 if(t==='soil')m='Whales breathe air, not soil.';
 if(t==='weed')m='Mammal babies drink milk from their mother.';
 if(t==='zap')m='Milk, not lightning, feeds mammal babies.';
 if(t==='always')m='Habitat alone does not decide. Check breath, milk and blood warmth.';
 if(t==='cant')m='Many mammals live in water and stay mammals.';
 if(t==='match')m='Warm-blooded animals keep a warm inside even in cold seas.';
 if(t==='noblood')m='Warm-blooded means warm blood and body, not no blood.';
 if(t==='blow')m='Fish use gills. Blowholes belong to whales and dolphins.';
 if(t==='milk')m='Milk feeding is a mammal trait, not how fish get oxygen.';
 if(t==='grow')m='Dolphins do not grow gills. They return to the surface for air.';
 if(t==='stop')m='Going under water does not change a dolphin into a non-mammal.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+2)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Whale mammal controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:p=>move(p),up:p=>up(p||{x:0,y:0})});controls()}});
A.start()})})();
