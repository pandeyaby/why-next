/* Flagship – the Arctic tundra (ages 7–9; NSIDC frozen-ground facts: permafrost stays at or below 0 °C for two or
   more years and only the active layer above it thaws in summer; National Geographic / NASA Earth Observatory tundra
   biome: treeless, short growing season, boggy summer ground; CAFF and US Fish & Wildlife species notes).
   Scenes: push a pole into the ground in summer (it stops at the permafrost) and in winter (it will not go in);
   melt snow heaps with the sun, see the meltwater stop and pond, then tap the layer it cannot pass; plant the
   tundra (a tall pine is refused with the reason); sort animals that live there from those that do not (penguin,
   camel, monkey); and give each tundra animal its winter trick. Every drag or tap has a labelled button twin.
   Data and drawings in learn/tundra_art.js. */
(()=>{const {box,inside,quill,THAW,DEEP,PLANTS,BEASTS,KEEPERS,TRICKS,SAYS,LEARNT,QUIZ,ground,sun,heap,sprout}=TUND;
VIS.reg('flagtundra',c=>{let A,Q,ctl,quiz,qn=-1,run=0;
const P={ink:'#0f172a',ok:'#047857',ko:'#b91c1c',rim:'#64748b',sel:'#1d4ed8',sky:'#e0f2fe',card:'#f8fafc',head:'#075985'};
const S={};const scene=()=>['pole','melt','plant','who','trick','quiz'][A.step];
const R=(x,y,w,h)=>box(A.W*x,A.H*y,A.W*w,A.H*h);
/* ---------- layout ---------- */
const seasonB=k=>Q.strip(2,R(.22,.09,.56,.09))[k],soil=()=>R(.24,.36,.7,.52),poleX=()=>soil().x+soil().w*.45;
const cmY=v=>soil().y+soil().h*v/DEEP,poleTop=()=>soil().y-A.H*.16;
const field=()=>R(.04,.46,.92,.42),heapX=k=>field().x+field().w*(.2+.3*k),sunHome=()=>({x:A.W*.12,y:A.H*.15});
const plantCard=i=>Q.grid(PLANTS.length,A.narrow?3:6,R(.03,.09,.94,A.narrow?.24:.14))[i],bed=()=>R(.03,.56,.94,.3),plotX=n=>bed().x+bed().w*(.1+.16*n);
const beastCard=i=>Q.grid(BEASTS.length,A.narrow?2:4,R(.03,.09,.94,.5))[i],pen=k=>Q.strip(2,R(.03,.65,.94,.22),12)[k];
const trickCard=i=>Q.grid(TRICKS.length,A.narrow?1:2,R(.03,.08,.94,A.narrow?.42:.34))[i],keeper=k=>Q.grid(4,A.narrow?2:4,R(.03,A.narrow?.55:.5,.94,A.narrow?.33:.36))[k];
const title=t=>Q.say(t,A.W/2,A.H*.045,12,{c:P.head,w:A.W-20});
const status=(t,ok)=>Q.say(t,A.W/2,A.H*.95,12,{b:700,c:ok?P.ok:P.ink,w:A.W-20});
const carried=(i,b)=>S.hold&&S.hold.i===i?box(S.hold.x-b.w/2,S.hold.y-b.h/2,b.w,b.h):b;
/* ---------- 1: push the pole ---------- */
function paintPole(){const g=A.ctx,b=soil(),win=S.season===1;title('Push a pole into the ground');
 ['Summer','Winter'].forEach((t,k)=>{const q=seasonB(k);Q.card(q,k?'#e2e8f0':'#fef9c3',S.season===k?'sel':'');Q.say((S.season===k?'● ':'')+t,q.x+q.w/2,q.y+q.h/2,12)});
 ground(g,b,THAW/DEEP,win);[0,50,100,150].forEach(v=>{g.fillStyle=P.ink;g.fillRect(b.x-10,cmY(v)-1,8,2);Q.say(v+' cm',b.x-14,cmY(v),10,{al:'right'})});
 Q.say(win?'Frozen in winter':'Thaws in summer',b.x+b.w*.78,cmY(THAW/2),10,{c:win?P.ink:'#ffffff',w:b.w*.4});Q.say('Permafrost: frozen all year',b.x+b.w*.76,cmY(110),10,{c:'#ffffff',w:b.w*.42});
 const x=poleX(),tip=cmY(S.tip);g.fillStyle='#475569';g.fillRect(x-4,poleTop(),8,tip-poleTop());g.fillStyle=S.stuck?P.ko:P.sel;g.beginPath();g.arc(x,poleTop(),13,0,7);g.fill();
 if(S.stuck){g.strokeStyle=P.ko;g.lineWidth=3;g.beginPath();g.arc(x,tip,12,0,7);g.stroke()}
 const n=[0,1].filter(k=>S.felt[k]!=null).length;status(n>=2?'✓ Summer: stops at 50 cm. Winter: will not go in':S.felt[S.season]!=null?'Now try the other season':'Drag the pole down until it stops',n>=2)}
function setSeason(k){S.season=k;S.tip=0;S.stuck=false;A.sound.tick();say(k?'Winter: snow on top, and all the ground is frozen. Push the pole down.':'Summer: the snow has gone. Push the pole down.')}
function pushTo(v){const stop=S.season?0:THAW;S.tip=Math.max(0,Math.min(stop,Math.round(v)));S.stuck=v>=stop;A.redraw()}
function letGo(){if(!S.stuck)return say(`The pole is ${S.tip} cm down. Keep pushing until it stops.`);const k=S.season;S.felt[k]=S.tip;A.sound.pop();
 say(k?'It will not go in at all! In winter every layer is frozen hard.':`It slid through soft, wet soil, then stopped at ${THAW} cm. Below that the ground is frozen hard: permafrost.`)}
/* ---------- 2: melt the snow ---------- */
function paintMelt(){const g=A.ctx,b=field();title('Where does the meltwater go?');ground(g,b,THAW/DEEP,false);
 const sub=b.y+b.h*THAW/DEEP,wet=S.gone.length;if(wet){g.fillStyle='rgba(37,99,235,.55)';g.fillRect(b.x,sub-wet*7,b.w,wet*7)}
 [0,1,2].forEach(k=>{const x=heapX(k);if(!S.gone.includes(k))return heap(g,x,b.y,b.w*.2,A.H*.1);g.fillStyle='rgba(37,99,235,.75)';g.beginPath();g.ellipse(x,b.y-2,b.w*.11,7,0,0,7);g.fill();
  g.strokeStyle='#1d4ed8';g.lineWidth=3;g.setLineDash([4,4]);g.beginPath();g.moveTo(x,b.y+4);g.lineTo(x,sub-4);g.stroke();g.setLineDash([])});
 if(S.wrong){g.strokeStyle=P.ko;g.lineWidth=3;g.strokeRect(b.x+2,b.y+2,b.w-4,sub-b.y-4)}if(S.found){g.strokeStyle=P.ok;g.lineWidth=4;g.strokeRect(b.x+2,sub+2,b.w-4,b.y+b.h-sub-4)}
 Q.say('Top layer',b.x+b.w*.65,(b.y+sub)/2,10,{c:'#ffffff'});Q.say('Permafrost',b.x+b.w*.65,(sub+b.y+b.h)/2,11,{c:'#ffffff'});
 const s=S.hold&&S.hold.sun?S.hold:sunHome();sun(g,s.x,s.y,A.H*.04);
 status(S.found?'✓ The water is stuck on top: ponds and bogs':wet>=3?'Tap the layer the water cannot get through':`Melted: ${wet} of 3`,S.found)}
function melt(k){if(S.gone.includes(k))return;S.gone.push(k);A.sound.pop();say(S.gone.length<3?'The snow melts. The water soaks down a little, then stops. Melt another heap.':'All melted. The water soaked down, then stopped and spread out. Now tap the layer it cannot get through.')}
function tapLayer(k){if(S.gone.length<3||S.found)return;if(!k){S.wrong=true;A.sound.miss();return say(slip('soak'))}
 S.wrong=false;S.found=true;A.sound.pop();say('Yes: the permafrost. Frozen ground is like a floor of ice, so the water cannot drain away. It makes ponds and bogs.')}
/* ---------- 3: what can grow ---------- */
function paintPlant(){const g=A.ctx,b=bed();title('What can grow on the tundra?');ground(g,b,.35,false);
 const sz=Math.min(A.W*.17,A.H*.15);S.grown.forEach((i,n)=>{sprout(g,i,plotX(n),b.y,sz);Q.say(PLANTS[i].t,plotX(n),b.y-sz*.75-(n%2)*14,9,{c:P.ink,w:A.W*.2})});
 if(S.tree){const x=b.x+b.w*.92,ice=b.y+b.h*.35;sprout(g,5,x,b.y,Math.min(A.W*.11,(ice-b.y)/.9));g.strokeStyle=P.ko;g.lineWidth=4;g.beginPath();g.arc(x,ice,11,0,7);g.stroke();Q.say('Roots hit ice',x-A.W*.02,ice+20,9,{c:'#ffffff',al:'right'})}
 PLANTS.forEach((o,i)=>{if(S.grown.includes(i)||(S.hold&&S.hold.i===i))return;const q=plantCard(i);Q.card(q,P.card,S.bad===i?'ko':S.pick===i?'sel':'');Q.say(o.t,q.x+q.w/2,q.y+q.h/2,11,{w:q.w-8})});
 if(S.hold&&S.hold.i>=0){const q=carried(S.hold.i,plantCard(S.hold.i));Q.card(q,P.card,'sel');Q.say(PLANTS[S.hold.i].t,q.x+q.w/2,q.y+q.h/2,11,{w:q.w-8})}
 status(S.grown.length>=5?'✓ Five low plants. No tall trees':`Growing: ${S.grown.length} of 5`,S.grown.length>=5)}
function plantIt(i){if(S.grown.includes(i))return;S.pick=-1;const o=PLANTS[i];if(o.no){S.bad=i;S.tree=true;A.sound.miss();return say(slip('tree'))}
 S.bad=-1;S.tree=false;S.grown.push(i);A.sound.pop();say(o.f)}
/* ---------- 4: who lives here ---------- */
function paintWho(){title('Who lives on the Arctic tundra?');
 ['Lives on the tundra','Lives somewhere else'].forEach((t,k)=>{const b=pen(k),got=BEASTS.filter((o,i)=>S.home[i]===k).map(o=>o.t);Q.card(b,k?'#fee2e2':'#dcfce7',S.over===k?'sel':'');
  Q.say(t,b.x+b.w/2,b.y+b.h*.25,12,{w:b.w-10});Q.say(got.join(', ')||'…',b.x+b.w/2,b.y+b.h*.66,10,{b:700,w:b.w-12})});
 BEASTS.forEach((o,i)=>{if(i in S.home)return;const q=carried(i,beastCard(i));Q.card(q,P.card,S.bad===i?'ko':S.pick===i||(S.hold&&S.hold.i===i)?'sel':'');Q.say(o.t,q.x+q.w/2,q.y+q.h/2,13,{w:q.w-8})});
 const n=Object.keys(S.home).length;status(n>=8?'✓ Five tundra animals; three that live elsewhere':`Sorted: ${n} of 8`,n>=8)}
function house(i,k){if(i in S.home)return;S.pick=-1;const o=BEASTS[i];if(o.k!==k){S.bad=i;A.sound.miss();return say(o.k?up1(slip(o.s)):`The ${o.t.toLowerCase()} does live on the tundra. It is built for the cold.`)}
 S.bad=-1;S.home[i]=k;A.sound.pop();say(k?`Right: ${slip(o.s)}`:`Yes: the ${o.t.toLowerCase()} lives on the tundra.`)}
/* ---------- 5: winter tricks ---------- */
function paintTrick(){title('How does each one get through winter?');
 KEEPERS.forEach((t,k)=>{const b=keeper(k),done=S.matched.includes(k);Q.card(b,done?'#dcfce7':'#e0f2fe',S.badK===k?'ko':S.over===k?'sel':'');Q.say(t,b.x+b.w/2,b.y+b.h*(done?.22:.5),13,{w:b.w-8});
  if(done)Q.say(TRICKS[k],b.x+b.w/2,b.y+b.h*.64,10,{b:700,c:P.ok,w:b.w-10})});
 TRICKS.forEach((t,i)=>{if(S.matched.includes(i))return;const q=carried(i,trickCard(i));Q.card(q,'#fefce8',S.pick===i||(S.hold&&S.hold.i===i)?'sel':'');Q.say(t,q.x+q.w/2,q.y+q.h/2,11,{w:q.w-12})});
 status(S.matched.length>=4?'✓ Every animal has a winter trick':`Matched: ${S.matched.length} of 4`,S.matched.length>=4)}
function give(i,k){if(S.matched.includes(i))return;S.pick=-1;if(i!==k){S.badK=k;A.sound.miss();return say(slip('who'+k))}
 S.badK=-1;S.matched.push(i);A.sound.pop();say(`${KEEPERS[k]}: ${TRICKS[i].toLowerCase()}.`)}
/* ---------- feedback that names the slip ---------- */
const up1=t=>t.charAt(0).toUpperCase()+t.slice(1);
function slip(t){let m='Look again, then try.';
 if(t==='soak')m='Water can soak into this top layer. Look further down: what stops it?';
 if(t==='tree')m='A tall tree needs deep roots. Here they hit frozen ground, and summers are too short and windy. So no trees grow.';
 if(t==='penguin')m='penguins live in the far south, around Antarctica. The Arctic tundra is in the far north.';
 if(t==='camel')m='camels live in hot, dry deserts, not on the cold tundra.';
 if(t==='monkey')m='monkeys live in warm forests with tall trees. The tundra has no trees.';
 if(t==='who0')m='Caribou are big walkers with wide hooves. Find the trick that needs hooves.';
 if(t==='who1')m='A lemming is small, like a hamster. Find the trick that hides a small animal from the wind.';
 if(t==='who2')m='Musk oxen stand out in the open all winter. Find the trick that keeps a big body warm.';
 if(t==='who3')m='A snowy owl is a bird that hunts. Find the trick about hunting.';
 if(t==='snowonly')m='Snow lies on top and melts in summer. Permafrost is the ground under it, frozen for years.';
 if(t==='seaice')m='Sea ice floats on the ocean. Permafrost is frozen ground on land.';
 if(t==='allthaw')m='Only the top layer thaws. Below it, the ground stays frozen all summer.';
 if(t==='none')m='In summer the top layer does thaw. That is when plants grow.';
 if(t==='rain')m='The tundra gets little rain. The wet comes from melted snow that cannot drain away.';
 if(t==='water')m='There is lots of water in summer. Trees fail because roots hit frozen ground, and summers are short and windy.';
 if(t==='eaten')m='Animals eat some plants, but that is not why trees are missing. Frozen ground stops deep roots.';
 if(t==='belongs')m='That animal does live on the tundra. Penguins live in the far south, around Antarctica.';
 if(t==='fly')m='Lemmings cannot fly. They stay all winter and live under the snow.';
 if(t==='dig')m='Nothing can dig into permafrost: it is frozen hard. Lemmings live in the snow, on top of the ground.';
 if(t==='iceyear')m='In summer the snow melts and the tundra turns green, wet and full of flowers.';
 return m}
/* ---------- drawing, pointer and buttons ---------- */
function draw(){const k=scene(),g=A.ctx;g.fillStyle=P.sky;g.fillRect(0,0,A.W,A.H);if(k==='quiz'){ground(g,R(.1,.4,.8,.3),.35,false);sprout(g,3,A.W*.4,A.H*.4,A.H*.12);sprout(g,4,A.W*.6,A.H*.4,A.H*.12);Q.say('Challenge',A.W/2,A.H*.8,20);return}
 ({pole:paintPole,melt:paintMelt,plant:paintPlant,who:paintWho,trick:paintTrick})[k]();A.fx.draw(A.ctx)}
function down(p){const k=scene(),take=(i,x)=>{S.hold=Object.assign({i,x:p.x,y:p.y,x0:p.x,y0:p.y},x||{});A.redraw();return true};
 if(k==='pole'){const s=[0,1].find(j=>inside(p,seasonB(j)));if(s!=null){setSeason(s);return true}if(Math.abs(p.x-poleX())<44&&p.y>poleTop()-24)return take(-1,{pole:true})}
 if(k==='melt'){const s=S.hold&&S.hold.sun?S.hold:sunHome();if(Math.hypot(p.x-s.x,p.y-s.y)<A.H*.08)return take(-1,{sun:true});
  const h=[0,1,2].find(j=>!S.gone.includes(j)&&Math.abs(p.x-heapX(j))<field().w*.12&&p.y<field().y+6&&p.y>field().y-A.H*.12);if(h!=null){melt(h);return true}
  const b=field(),sub=b.y+b.h*THAW/DEEP;if(inside(p,b)){tapLayer(p.y>sub?1:0);return true}}
 if(k==='plant'){const i=PLANTS.findIndex((_,j)=>!S.grown.includes(j)&&inside(p,plantCard(j)));if(i>=0)return take(i);if(inside(p,bed())&&S.pick>=0)plantIt(S.pick)}
 if(k==='who'){const i=BEASTS.findIndex((_,j)=>!(j in S.home)&&inside(p,beastCard(j)));if(i>=0)return take(i);const n=[0,1].find(j=>inside(p,pen(j)));if(n!=null&&S.pick>=0)house(S.pick,n)}
 if(k==='trick'){const i=TRICKS.findIndex((_,j)=>!S.matched.includes(j)&&inside(p,trickCard(j)));if(i>=0)return take(i);const n=[0,1,2,3].find(j=>inside(p,keeper(j)));if(n!=null&&S.pick>=0)give(S.pick,n)}
 return false}
function move(p){const h=S.hold;if(!h)return;h.x=p.x;h.y=p.y;const k=scene();if(h.pole)return pushTo((p.y-soil().y)/soil().h*DEEP);
 if(h.sun){const j=[0,1,2].find(q=>!S.gone.includes(q)&&Math.abs(p.x-heapX(q))<field().w*.12&&Math.abs(p.y-(field().y-A.H*.05))<A.H*.1);if(j!=null)melt(j);return A.redraw()}
 S.over=k==='who'?[0,1].find(j=>inside(p,pen(j))):k==='trick'?[0,1,2,3].find(j=>inside(p,keeper(j))):undefined;A.redraw()}
function up(p){const h=S.hold;if(!h)return;S.hold=null;S.over=undefined;const k=scene(),moved=Math.hypot(p.x-h.x0,p.y-h.y0)>12;
 if(h.pole)return letGo();if(h.sun)return A.redraw();
 if(k==='plant'){if(p.y>bed().y-A.H*.08)return plantIt(h.i);if(!moved){S.pick=h.i;return say(`${PLANTS[h.i].t} picked. Now tap the ground to plant it.`)}}
 if(k==='who'){const n=[0,1].find(j=>inside(p,pen(j)));if(n!=null)return house(h.i,n);if(!moved){S.pick=h.i;return say(`${BEASTS[h.i].t} picked. Now tap where it lives.`)}}
 if(k==='trick'){const n=[0,1,2,3].find(j=>inside(p,keeper(j)));if(n!=null)return give(h.i,n);if(!moved){S.pick=h.i;return say(`“${TRICKS[h.i]}” picked. Now tap the animal.`)}}
 A.redraw()}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.check()}
function buttons(){if(!ctl)return;ctl.innerHTML='';const k=scene(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(k==='pole'){b('Summer',()=>setSeason(0),'Choose summer');b('Winter',()=>setSeason(1),'Choose winter');b('Push the pole down',()=>{pushTo(DEEP);letGo()},`Push the pole down in ${S.season?'winter':'summer'}`)}
 if(k==='melt'){if(S.gone.length<3)[0,1,2].forEach(j=>{if(!S.gone.includes(j))b(`Melt snow heap ${j+1}`,()=>melt(j))});else if(!S.found){b('Top layer (thaws in summer)',()=>tapLayer(0),'Tap the top layer');b('Permafrost (frozen all year)',()=>tapLayer(1),'Tap the permafrost')}}
 if(k==='plant')PLANTS.forEach((o,i)=>{if(!S.grown.includes(i))b(`Plant: ${o.t}`,()=>plantIt(i))});
 if(k==='who')BEASTS.forEach((o,i)=>{if(!(i in S.home)){b(`${o.t} → tundra`,()=>house(i,0),`${o.t} lives on the tundra`);b(`${o.t} → elsewhere`,()=>house(i,1),`${o.t} lives somewhere else`)}});
 if(k==='trick'){const i=S.pick>=0&&!S.matched.includes(S.pick)?S.pick:TRICKS.findIndex((_,j)=>!S.matched.includes(j));if(i>=0)KEEPERS.forEach((t,j)=>b(`${t}: ${TRICKS[i]}`,()=>give(i,j),`Give “${TRICKS[i]}” to the ${t.toLowerCase()}`))}}
function reset(){run++;for(const x in S)delete S[x];Object.assign(S,{season:0,tip:0,stuck:false,felt:{},gone:[],wrong:false,found:false,grown:[],tree:false,bad:-1,pick:-1,home:{},matched:[],badK:-1,hold:null,check:()=>{}})}
const finished=(i,test)=>()=>{if(A.step===i&&test()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(LEARNT[i]+A.reveal(i))};
function open(i,test){reset();say(SAYS[i]);S.check=finished(i,test)}
function play(i,acts,ms){steps[i].go();const r0=run;acts.forEach((f,j)=>setTimeout(()=>{if(r0===run)f()},ms*(j+1)))}
const steps=[
{h:'Frozen ground',p:'Push a pole into the tundra ground in summer, then in winter. How far does it go?',
 predict:{q:'In summer, is the tundra ground soft all the way down?',opts:['Yes, it all thaws','No, only the top thaws'],ans:1},task:'Push the pole in summer and in winter',
 show:()=>play(0,[()=>setSeason(0),()=>{pushTo(DEEP);letGo()},()=>setSeason(1),()=>{pushTo(DEEP);letGo()}],600),go:()=>open(0,()=>S.felt[0]!=null&&S.felt[1]!=null)},
{h:'Melting snow',p:'Summer sun melts the snow. Drag the sun onto each heap of snow and watch where the water goes.',
 predict:{q:'When the snow melts, where does the water go?',opts:['It sinks deep down','It stays near the top, in ponds and bogs'],ans:1},task:'Melt 3 heaps, then find the layer that stops the water',
 show:()=>play(1,[()=>melt(0),()=>melt(1),()=>melt(2),()=>tapLayer(1)],550),go:()=>open(1,()=>S.found)},
{h:'What can grow?',p:'Summer is short and cool. Drag each plant onto the ground and see which ones can live here.',
 predict:{q:'Why are there no tall trees on the tundra?',opts:['There is no water','Frozen ground, cold wind and a short summer'],ans:1},task:'Plant the 5 that can grow',
 show:()=>play(2,[5,0,1,2,3,4].map(i=>()=>plantIt(i)),550),go:()=>open(2,()=>S.grown.length>=5)},
{h:'Who lives here?',p:'Lots of animals live on the tundra. Drag each animal to where it lives.',
 predict:{q:'Do penguins live on the Arctic tundra?',opts:['Yes','No, they live in the far south'],ans:1},task:'Sort all 8 animals',
 show:()=>play(3,BEASTS.map((o,i)=>()=>house(i,o.k)),400),go:()=>open(3,()=>Object.keys(S.home).length>=8)},
{h:'Winter tricks',p:'Winter is long, dark and freezing. Drag each trick onto the animal that uses it.',task:'Match all 4 tricks',
 show:()=>play(4,[0,1,2,3].map(i=>()=>give(i,i)),500),go:()=>open(4,()=>S.matched.length>=4)},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
function next(){qn++;const it=QUIZ[qn%QUIZ.length],opts=[[it.a,''],...it.o],r=qn%3,list=opts.slice(r).concat(opts.slice(0,r));
 quiz.innerHTML=`<p><b>${it.q}</b></p><div class="fl-pick" role="group" aria-label="Pick an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');list.forEach(([t,s])=>{c.el('button',{type:'button',class:'lbtn'},row,t).onclick=()=>judge(s,it)});c.say('Challenge: '+it.q);A.redraw()}
function judge(s,it){quiz.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=quiz.querySelector('.fl-fb'),why=s?slip(s):'';
 if(!s)A.win();else A.sound.miss();fb.innerHTML=(s?'✗ '+why:'✓ '+it.a+'.')+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next;c.say(s?why:'Yes.')}
FK.shell(c,{steps,ratio:.62,tall:1.3,draw,onStep:X=>{quiz.hidden=X.step!==5;ctl.hidden=X.step===5;buttons()},
 init:X=>{A=X;Q=quill(A,P);const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Tundra lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}}).start()})})();
