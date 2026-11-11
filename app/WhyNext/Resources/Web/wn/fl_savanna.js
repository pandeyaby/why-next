/* Flagship: Savanna and grassland animals (ages 7–9; NC Year 2/Year 4 living things and their
   habitats: habitat, herbivore, carnivore, predator, prey, producer, simple food chains).
   Grasslands are wide open with few trees. The learner sorts animals into the African savanna
   or the American prairie, grows a zebra herd and sees many eyes spot a creeping lion sooner,
   builds the chain grass → zebra → lion with the arrow pointing to the eater, hides a prairie
   dog in its burrow because there are no trees to climb, and removes the lions to see zebra
   numbers climb and the grass get eaten down.
   Distinct from flagmigrate (journeys), flaganwhere (habitats everywhere), flagfoodweb (webs)
   and flagchain (simple food chains in general): this lab is about life on open grassland. */
(()=>{
VIS.reg('flagsavanna',c=>{
let A,pad,qa,qn=-1;const S={};
const SCENES=['sort','herd','chain','burrow','balance','quiz'];
const ZOO=[['lion','sav'],['bison','pra'],['zebra','sav'],['prairie dog','pra'],['elephant','sav'],['wildebeest','sav'],['cheetah','sav'],['giraffe','sav']];
const SPOT={1:2,5:4,20:7};      // model: how many steps away the herd notices the lion
const LIONS={none:{z:40,g:1},some:{z:20,g:4},lots:{z:6,g:5}};
const voice=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const scene=()=>SCENES[A.step];
function ink(s,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.b||700} ${px}px system-ui,sans-serif`;g.textAlign=o.at||'center';g.textBaseline='middle';g.fillStyle=o.col||A.col.tx;g.fillText(String(s),x,y,o.max||A.W-14)}
function banner(g,t,y){const px=A.narrow?13:15,ls=[''];g.font=`600 ${px}px system-ui,sans-serif`;
 t.split(' ').forEach(w=>{const i=ls.length-1,s=(ls[i]+' '+w).trim();if(g.measureText(s).width>A.W-18&&ls[i])ls.push(w);else ls[i]=s});
 const n=Math.min(3,ls.length);ls.slice(0,3).forEach((s,j)=>ink(s,A.W/2,y+(j-(n-1)/2)*(px+3),px,{b:600}))}
const wash=(k,a)=>A.mix(A.col.pn,A.col[k],A.col.dark?a*.8:a);
function pill(t,x,y,on,k){const g=A.ctx;g.font=`700 ${A.narrow?14:16}px system-ui,sans-serif`;const w=Math.max(70,g.measureText(t).width+26),h=40;
 g.fillStyle=wash(k||'am',on?.55:.3);A.paint.rrect(x-w/2,y-h/2,w,h,20);g.fill();g.strokeStyle=A.col.tx;g.lineWidth=on?3:1.5;g.stroke();ink(t,x,y,A.narrow?14:16);return{x:x-w/2,y:y-h/2,w,h}}
function grass(y0,amount){const g=A.ctx;g.strokeStyle=wash('gr',.75);g.lineWidth=2;for(let x=8;x<A.W;x+=A.narrow?9:12){const h=4+amount*4+((x*7)%5);g.beginPath();g.moveTo(x,y0);g.lineTo(x+2,y0-h);g.stroke()}}
/* ---- sort: savanna or prairie ---- */
function halves(){return{sav:{x:8,y:A.H*.42,w:A.W/2-12,h:A.H*.4},pra:{x:A.W/2+4,y:A.H*.42,w:A.W/2-12,h:A.H*.4}}}
function cardHome(){return{x:A.W/2,y:A.H*.26}}
function paintSort(){const g=A.ctx,C=A.col,H2=halves();
 [['sav','African savanna','am'],['pra','American prairie','gr']].forEach(([k,nm,tk])=>{const b=H2[k];g.fillStyle=wash(tk,.22);A.paint.rrect(b.x,b.y,b.w,b.h,14);g.fill();g.strokeStyle=C.tx;g.lineWidth=1.5;g.stroke();
  ink(nm,b.x+b.w/2,b.y+18,A.narrow?13:15);grass(b.y+b.h-6,2);
  const here=S.placed.filter(p=>p[1]===k).map(p=>p[0]);here.forEach((n,j)=>ink(n,b.x+b.w/2,b.y+40+j*(A.narrow?15:17),A.narrow?12:14,{b:600}))});
 const H=halves().sav;g.fillStyle=wash('gr',.5);g.beginPath();g.arc(H.x+H.w*.86,H.y+H.h*.7,10,0,7);g.fill();g.fillStyle=C.mu;g.fillRect(H.x+H.w*.86-2,H.y+H.h*.7+8,4,12); // one lone tree
 ink('Wide open grass, very few trees',A.W/2,A.H*.08,A.narrow?14:16);
 if(S.k<ZOO.length){const p=S.hold||cardHome();S.box=pill(ZOO[S.k][0],p.x,p.y,!!S.hold,'cy')}else ink('All sorted!',A.W/2,A.H*.26,18,{col:C.gr})}
function place(where){if(S.k>=ZOO.length)return;const [nm,home]=ZOO[S.k];S.hold=null;
 if(where!==home)return say(home==='pra'?`The ${nm} lives on the American prairie, not the African savanna.`:`The ${nm} lives on the African savanna, not the American prairie.`,false);
 S.placed.push([nm,home]);S.k++;if(S.k>=ZOO.length){S.sorted=true;return say('All eight sorted. Both are grasslands: wide open grass with few trees.',true)}
 say(`Yes, the ${nm} lives on the ${home==='sav'?'savanna':'prairie'}. Next: ${ZOO[S.k][0]}.`,true)}
/* ---- herd: many eyes ---- */
function herdSpots(n){const out=[],cx=A.W*.68,cy=A.H*.55,r=Math.min(A.W*.3,140);for(let i=0;i<n;i++){const a=i*2.4,d=n===1?0:r*Math.sqrt((i+1)/n);out.push([cx+Math.cos(a)*d,cy+Math.sin(a)*d*.75])}return out}
function lionX(){return 20+S.creep*(A.W*.5-20)/8}
function paintHerd(){const g=A.ctx,C=A.col;ink(`Herd of ${S.herd} zebra${S.herd>1?'s':''}`,A.W/2,A.H*.08,A.narrow?15:17);grass(A.H*.86,2);
 herdSpots(S.herd).forEach(([x,y])=>{g.fillStyle=C.pn;g.beginPath();g.ellipse(x,y,14,9,0,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=1.5;g.stroke();
  g.beginPath();for(let s=-8;s<=8;s+=5){g.moveTo(x+s,y-8);g.lineTo(x+s,y+8)}g.lineWidth=2;g.stroke();if(S.alert){ink('!',x,y-18,13,{col:C.tx})}});
 const lx=lionX(),ly=A.H*.55;g.fillStyle=wash('am',.75);g.beginPath();g.arc(lx,ly,18,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();ink('lion',lx,ly+30,12,{b:600});
 const left=8-S.creep;ink(S.alert?`Spotted with ${left} steps to spare: the herd runs!`:`Lion is ${left} steps away. Drag it closer.`,A.W/2,A.H*.17,A.narrow?14:16,{col:S.alert?C.gr:C.tx})}
function creep(to){to=Math.max(0,Math.min(8,Math.round(to)));if(to===S.creep||S.alert)return;S.creep=to;const left=8-to;
 if(left<=SPOT[S.herd]){S.alert=true;if(S.herd===20){S.safe=true;return say(`Twenty zebras: one of them spots the lion ${left} steps away. Many eyes see danger sooner.`,true)}
  return say(S.herd===1?`One zebra spots the lion only ${left} steps away. That is very close.`:`Five zebras spot it ${left} steps away. More eyes help.`,S.herd===1?false:undefined)}
 say(`The lion creeps in: ${left} steps away.`)}
function setHerd(n){S.herd=n;S.creep=0;S.alert=false;say(`A herd of ${n}. Now creep the lion in.`)}
/* ---- food chain ---- */
const CHAIN=['grass','zebra','lion'];const POOL=['lion','grass','zebra'];
function chainBox(i){const w=A.narrow?92:120;return{x:A.W/2+(i-1)*(w+14)-w/2,y:A.H*.62,w,h:46}}
function paintChain(){const g=A.ctx,C=A.col;ink('Tap the cards in food chain order',A.W/2,A.H*.08,A.narrow?14:16);
 POOL.forEach((n,i)=>{const b=chainBox(i),used=S.chain.includes(n);g.fillStyle=wash(used?'gr':'cy',used?.4:.25);A.paint.rrect(b.x,b.y,b.w,b.h,12);g.fill();g.strokeStyle=C.tx;g.lineWidth=1.5;g.stroke();ink(n,b.x+b.w/2,b.y+b.h/2,16)});
 const y=A.H*.32,n=S.chain.length,step=A.narrow?110:150;S.chain.forEach((nm,i)=>{const x=A.W/2+(i-1)*step;pill(nm,x,y,true,'gr');if(i<n-1){g.strokeStyle=C.tx;g.lineWidth=3;g.beginPath();g.moveTo(x+38,y);g.lineTo(x+step-40,y);g.stroke();g.beginPath();g.moveTo(x+step-40,y);g.lineTo(x+step-50,y-7);g.lineTo(x+step-50,y+7);g.closePath();g.fillStyle=C.tx;g.fill()}});
 if(n===3)ink('Arrows point to the eater. Grass is the producer.',A.W/2,A.H*.45,A.narrow?12:14,{b:600,col:C.gr})}
function pickLink(nm){if(S.chain.length>=3)return;const want=CHAIN[S.chain.length];
 if(nm!==want)return say(S.chain.length===0?'Start with the plant: grass is the producer, so it comes first.':`Not yet. The ${want} comes next: the ${S.chain[S.chain.length-1]} is eaten by the ${want}.`,false);
 S.chain.push(nm);if(S.chain.length===3){S.built=true;return say('Grass → zebra → lion. The zebra is prey and a herbivore. The lion is a predator and a carnivore.',true)}
 say(`${nm} placed. The arrow will point from ${nm} to what eats it.`,true)}
/* ---- burrow ---- */
function holeAt(){return{x:A.W*.72,y:A.H*.7}}
function dogHome(){return{x:A.W*.3,y:A.H*.66}}
function paintBurrow(){const g=A.ctx,C=A.col,h=holeAt(),d=S.dog||dogHome();ink('No trees to climb on the prairie',A.W/2,A.H*.08,A.narrow?14:16);
 g.fillStyle=wash('am',.2);g.fillRect(0,A.H*.72,A.W,A.H*.28);grass(A.H*.72,2);
 g.fillStyle=A.mix(C.am,'#000000',.6);g.beginPath();g.ellipse(h.x,h.y+4,30,11,0,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=1.5;g.stroke();ink('burrow',h.x,h.y+26,12,{b:600});
 if(S.hawk){const hx=A.W*.5,hy=A.H*.24;g.strokeStyle=C.tx;g.lineWidth=4;g.beginPath();g.moveTo(hx-40,hy-10);g.quadraticCurveTo(hx-16,hy-26,hx,hy);g.quadraticCurveTo(hx+16,hy-26,hx+40,hy-10);g.stroke();ink('hawk!',hx,hy+16,13)}
 if(!S.hidden){g.fillStyle=wash('am',.6);g.beginPath();g.ellipse(d.x,d.y-12,12,18,0,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();ink('prairie dog',d.x,d.y+18,12,{b:600})}
 else ink('safe underground',h.x,h.y-18,13,{col:C.gr})}
function hide(){if(S.hidden)return;S.hidden=true;S.dog=null;say('Down the burrow! With so few trees, digging under the ground is the best place to hide.',true)}
function climb(){S.dog=null;say('There is no tree here to climb. On open grassland, prairie dogs hide under the ground.',false)}
/* ---- balance ---- */
function paintBalance(){const g=A.ctx,C=A.col,L=LIONS[S.lions];ink(`Lions: ${S.lions==='none'?'none':S.lions==='some'?'a few':'too many'}   ·   Zebras: ${L.z}`,A.W/2,A.H*.08,A.narrow?14:16);
 grass(A.H*.86,Math.max(0,L.g));const cols=10;for(let i=0;i<L.z;i++){const x=24+(i%cols)*(A.W-48)/(cols-1),y=A.H*.28+Math.floor(i/cols)*(A.H*.1);g.fillStyle=C.pn;g.beginPath();g.ellipse(x,y,10,6,0,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=1.2;g.stroke();g.beginPath();g.moveTo(x-3,y-5);g.lineTo(x-3,y+5);g.moveTo(x+3,y-5);g.lineTo(x+3,y+5);g.stroke()}
 ink('A simple model, not real counts',A.W/2,A.H*.17,12,{b:500,col:C.mu});ink(L.g<=1?'Grass eaten down to the soil':L.g>=5?'Plenty of grass':'Grass is fine',A.W/2,A.H*.75,A.narrow?14:16,{col:L.g<=1?C.tx:C.gr})}
function setLions(k){S.lions=k;S.tried=S.tried||{};S.tried[k]=true;
 if(k==='none')return say('No lions: zebra numbers climb, and they eat the grass down to bare soil. Predators keep prey numbers in check.',undefined);
 if(k==='lots')return say('Too many lions: zebra numbers crash. Soon the lions go hungry too.',undefined);
 if(S.tried.none){S.balanced=true;return say('A few lions again: zebra numbers settle and the grass grows back. Predator and prey keep each other in balance.',true)}
 say('A few lions and a steady herd. Now try removing the lions.')}
/* ---- frame ---- */
function paint(){const{ctx:g,W,H,col:C}=A,k=scene();g.fillStyle=A.mix(C.pn,C.am,C.dark?.06:.09);g.fillRect(0,0,W,H);
 if(k==='quiz'){ink('Life on the grassland',W/2,H*.42,A.narrow?17:20);ink('Answer below',W/2,H*.55,14,{col:C.mu,b:500});A.fx.draw(g);return}
 ({sort:paintSort,herd:paintHerd,chain:paintChain,burrow:paintBurrow,balance:paintBalance})[k]();if(S.msg)banner(g,S.msg,H*.91);A.fx.draw(g)}
function say(t,good){S.msg=t;if(good)A.sound.pop();else if(good===false)A.sound.miss();voice(t);pads();A.redraw();S.after&&S.after()}
function wipe(){for(const k in S)delete S[k];Object.assign(S,{k:0,placed:[],herd:1,creep:0,chain:[],hawk:true,lions:'some',msg:'',after:()=>{}});A.redraw()}
function pads(){if(!pad)return;pad.innerHTML='';const k=scene();if(k==='quiz')return;
 const btn=(t,f,lab)=>{c.el('button',{type:'button',class:'lbtn',style:'min-height:48px;padding:8px 12px','aria-label':lab||t},pad,t).onclick=f};
 if(k==='sort'&&S.k<ZOO.length){const nm=ZOO[S.k][0];btn('← African savanna',()=>place('sav'),`Put the ${nm} on the African savanna`);btn('American prairie →',()=>place('pra'),`Put the ${nm} on the American prairie`)}
 if(k==='herd'){[1,5,20].forEach(n=>btn(`Herd of ${n}`,()=>setHerd(n)));btn('Lion creeps closer',()=>creep(S.creep+1))}
 if(k==='chain')POOL.forEach(n=>btn(n,()=>pickLink(n),`Add ${n} to the food chain`));
 if(k==='burrow'){btn('Dive into the burrow',hide);btn('Climb a tree',climb)}
 if(k==='balance'){btn('No lions',()=>setLions('none'));btn('A few lions',()=>setLions('some'));btn('Too many lions',()=>setLions('lots'))}}
const near=(p,q,r)=>Math.hypot(p.x-q.x,p.y-q.y)<r;
const within=(p,b)=>p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
function grab(p){const k=scene();if(k==='quiz')return false;
 if(k==='sort'&&S.box&&S.k<ZOO.length&&within(p,S.box)){S.hold={x:p.x,y:p.y};return true}
 if(k==='sort'){const H2=halves();if(within(p,H2.sav)){place('sav');return true}if(within(p,H2.pra)){place('pra');return true}return false}
 if(k==='herd'){if(Math.abs(p.x-lionX())<34&&Math.abs(p.y-A.H*.55)<34){S.drag='lion';return true}return false}
 if(k==='chain'){for(let i=0;i<3;i++)if(within(p,chainBox(i))){pickLink(POOL[i]);return true}return false}
 if(k==='burrow'&&!S.hidden){const d=S.dog||dogHome();if(near(p,{x:d.x,y:d.y-10},40)){S.dog={x:d.x,y:d.y};S.drag='dog';return true}if(near(p,holeAt(),40)){hide();return true}}
 return false}
function slide(p){const k=scene();if(k==='sort'&&S.hold){S.hold={x:p.x,y:p.y};A.redraw()}
 if(S.drag==='lion')creep((p.x-20)/(A.W*.5-20)*8);if(S.drag==='dog'){S.dog={x:p.x,y:p.y};A.redraw()}}
function drop(p){const k=scene();
 if(k==='sort'&&S.hold){const H2=halves();S.hold=null;if(p&&within(p,H2.sav))place('sav');else if(p&&within(p,H2.pra))place('pra');else A.redraw()}
 if(S.drag==='dog'){if(p&&near(p,holeAt(),46))hide();else{S.dog=null;A.redraw()}}S.drag=null}
const settle=(i,ok,say2)=>()=>{if(A.step===i&&!A.isDone&&A.pred[i]!=null&&ok())A.done(say2()+A.reveal(i))};
function play(i,acts){steps[i].go();acts.forEach((f,j)=>setTimeout(()=>{if(A.step===i)f()},A.reduced()?20*(j+1):(j+1)*300))}
function setup(i,hint,ok,line){wipe();say(hint);S.after=settle(i,ok,line)}
const steps=[
{h:'Wide open grassland',p:'A grassland is a habitat of wide open grass with few trees. The African savanna and the American prairie are both grasslands.',
 predict:{q:'What does a savanna look like?',opts:['a thick forest full of trees','wide open grass with a few trees','a sandy desert with no plants'],ans:1},
 task:'Sort all eight animals into the right grassland',show:()=>play(0,ZOO.map(([,h])=>()=>place(h))),
 go:()=>setup(0,'Drag the card into a grassland, or use the buttons.',()=>S.sorted,()=>'Lions, zebras, wildebeest, elephants, cheetahs and giraffes on the savanna; bison and prairie dogs on the prairie.')},
{h:'Safety in numbers',p:'Zebras and wildebeest live in big herds. On open grass a lion can creep close. In a herd, many eyes and ears watch out, so danger is spotted sooner.',
 predict:{q:'Which zebra is safer from a lion?',opts:['one alone, because it is harder to see','one in a big herd, because many eyes watch out','it makes no difference'],ans:1},
 task:'Grow the herd to 20, then creep the lion in',show:()=>play(1,[()=>setHerd(20),()=>creep(1),()=>creep(2)]),
 go:()=>setup(1,'Pick a herd size, then drag the lion closer.',()=>S.safe,()=>'Twenty zebras spotted the lion far sooner than one zebra could.')},
{h:'Predator and prey',p:'Grass is the producer. A zebra eats grass, so it is a herbivore and prey. A lion eats zebras, so it is a carnivore and a predator. The arrow points to the eater.',
 predict:{q:'In the food chain zebra → lion, the arrow means…',opts:['the zebra eats the lion','the zebra is eaten by the lion','the zebra and the lion are friends'],ans:1},
 task:'Build the food chain in order',show:()=>play(2,[()=>pickLink('grass'),()=>pickLink('zebra'),()=>pickLink('lion')]),
 go:()=>setup(2,'Tap the cards in order, starting with the producer.',()=>S.built,()=>'Grass → zebra → lion.')},
{h:'Nowhere to climb',p:'Grassland has very few trees to hide in. Prairie dogs dig burrows and dive underground when a hawk flies over.',
 predict:{q:'A hawk flies over the prairie. Where does a prairie dog hide?',opts:['up a tall tree','down its burrow under the ground','it does not need to hide'],ans:1},
 task:'Get the prairie dog into its burrow',show:()=>play(3,[hide]),
 go:()=>setup(3,'Drag the prairie dog to the burrow, or use the buttons.',()=>S.hidden,()=>'Under the ground is safe when there are no trees.')},
{h:'Keeping the balance',p:'Predators and prey keep each other in check. Lions eat some zebras, so the zebras do not eat all the grass.',
 predict:{q:'If all the lions left, what would happen to the grass?',opts:['it would grow taller, with nobody around','more zebras would eat much more of it','nothing would change'],ans:1},
 task:'Remove the lions, then bring a few back',show:()=>play(4,[()=>setLions('none'),()=>setLions('some')]),
 go:()=>setup(4,'Try each button and watch the zebras and the grass.',()=>S.balanced,()=>'With a few lions, zebras and grass stay in balance.')},
{h:'Challenge',p:'',go:()=>{wipe();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.after()});
const QS=[
 ['What is a savanna?',[['wide open grassland with few trees','ok'],['a thick rainforest','forest'],['a frozen polar sea','place']]],
 ['Why do zebras live in big herds?',[['many eyes spot predators sooner','ok'],['so lions cannot see them at all','alone'],['because there is no grass for one zebra','alone']]],
 ['In grass → zebra → lion, which animal is the predator?',[['lion','ok'],['zebra','arrow'],['grass','arrow']]],
 ['Which animal lives on the American prairie, not the African savanna?',[['bison','ok'],['zebra','place'],['giraffe','place']]],
 ['On open grassland, how does a prairie dog stay safe from a hawk?',[['it dives into a burrow','ok'],['it climbs a tall tree','hide'],['it stands still in the open','hide']]],
 ['What does the arrow in zebra → lion mean?',[['the zebra is eaten by the lion','ok'],['the zebra eats the lion','arrow'],['the zebra runs to the lion','arrow']]],
 ['If all the lions left the savanna, what would happen?',[['zebra numbers would grow and eat more grass','ok'],['the grass would grow much taller','balance'],['the zebras would leave too','balance']]]];
function why(t){let m='Think about wide open grass, few trees, herds, and who eats whom.';
 if(t==='forest')m='A savanna has very few trees. It is wide open grass, not a forest.';
 if(t==='alone')m='Herds are safer: many eyes and ears spot a predator sooner, and it is harder to pick one zebra out.';
 if(t==='arrow')m='The arrow points to the eater. In zebra → lion, the lion eats the zebra, so the lion is the predator.';
 if(t==='place')m='Zebras and giraffes live on the African savanna. Bison and prairie dogs live on the American prairie.';
 if(t==='hide')m='Grassland has few trees, so prairie dogs hide under the ground in burrows.';
 if(t==='balance')m='Without lions, more zebras survive and eat more grass. Predators keep prey numbers in check.';
 return m}
function next(){qn++;const Q=QS[qn%QS.length],r=qn%3,opts=[...Q[1].slice(r),...Q[1].slice(0,r)];
 qa.innerHTML=`<p><b>${Q[0]}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qa.querySelector('.fl-pick');opts.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn',style:'min-height:48px'},row,v).onclick=()=>judge(t)});voice('Challenge: '+Q[0]);A.redraw()}
function judge(t){qa.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=qa.querySelector('.fl-fb'),ok=t==='ok';
 if(ok)A.win();else A.sound.miss();fb.innerHTML=(ok?'✓ Yes! ':'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.25,draw:paint,onStep:A=>{qa.hidden=A.step!==5;pad.hidden=A.step===5;pads()},
 init:A=>{wipe();const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Grassland buttons'},w);qa=c.el('div',{class:'fl-chal'},A.below);A.gest({down:grab,move:slide,up:drop});pads()}});
A.start()})})();
