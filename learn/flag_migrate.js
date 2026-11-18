/* Flagship: Animal Migration (ages 7–9). Many animals make long seasonal trips called
   migrations and then return: Arctic terns fly pole to pole, monarch butterflies travel
   to Mexico for winter, wildebeest follow rain around the Serengeti for fresh grass,
   and humpback whales feed in cold seas then swim to warm seas to have calves. Distinct
   from flaganwhere (where animals live) and flaghome (animal homes): the new idea is the
   round trip linked to food, breeding and seasons, not a one-way move or hibernation. */
(()=>{
VIS.reg('flagmigrate',c=>{
let A,pad,qa,turn=-1;const S={};
const tell=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const mode=()=>['trip','routes','why','whale','sort','quiz'][A.step];
const ROUTES=[
 {id:'tern',e:'🐦',n:'Arctic tern',place:'pole to pole',why:'follow summer food'},
 {id:'monarch',e:'🦋',n:'monarch',place:'Mexico for winter',why:'escape the cold'},
 {id:'wilde',e:'🐃',n:'wildebeest',place:'around the Serengeti',why:'follow rain for grass'},
 {id:'whale',e:'🐋',n:'humpback whale',place:'cold sea to warm sea',why:'have calves'}];
const WHY=[
 {id:'wilde',e:'🐃',n:'wildebeest',ok:'food',opts:[['fresh grass after rain','ok'],['to have calves in snow','breed'],['to fly pole to pole','mix']]},
 {id:'whale',e:'🐋',n:'humpback whale',ok:'breed',opts:[['to have calves in warm water','ok'],['to feed on krill in the tropics','food'],['to roost in trees','mix']]},
 {id:'monarch',e:'🦋',n:'monarch',ok:'season',opts:[['to spend winter in Mexico','ok'],['to swim to warm seas','mix'],['to hunt wildebeest','food']]},
 {id:'tern',e:'🐦',n:'Arctic tern',ok:'food',opts:[['to follow summer and food, pole to pole','ok'],['to sleep in a nest all winter','stay'],['to feed in Mexico only','mix']]}];
const SORT=[
 {e:'🐦',n:'Arctic tern',ok:'go'},{e:'🐌',n:'garden snail',ok:'stay'},
 {e:'🦋',n:'monarch',ok:'go'},{e:'🦔',n:'hedgehog',ok:'stay'},
 {e:'🐃',n:'wildebeest',ok:'go'},{e:'🐋',n:'humpback whale',ok:'go'}];
function txt(s,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.a||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(String(s),x,y,o.max||A.W-12)}
function earth(){const g=A.ctx,C=A.col,cx=A.W/2,cy=A.H*.46,rx=Math.min(A.W*.42,170),ry=A.H*.34;
 g.fillStyle=A.mix(C.pn,C.cy,C.dark?.35:.4);g.beginPath();g.ellipse(cx,cy,rx,ry,0,0,7);g.fill();
 g.fillStyle=A.mix(C.pn,C.gr,C.dark?.3:.45);g.beginPath();g.ellipse(cx-rx*.25,cy-ry*.15,rx*.32,ry*.28, -.4,0,7);g.fill(); // NA-ish
 g.beginPath();g.ellipse(cx+rx*.12,cy+ry*.08,rx*.22,ry*.3,.2,0,7);g.fill(); // Africa-ish
 g.fillStyle=A.mix(C.pn,'#e2e8f0',C.dark?.35:.55);g.beginPath();g.ellipse(cx,cy-ry*.82,rx*.55,ry*.22,0,0,7);g.fill();
 g.beginPath();g.ellipse(cx,cy+ry*.82,rx*.55,ry*.22,0,0,7);g.fill();
 g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.ellipse(cx,cy,rx,ry,0,0,7);g.stroke();
 txt('N',cx,cy-ry+16,13,{w:800});txt('S',cx,cy+ry-16,13,{w:800});
 return {cx,cy,rx,ry}}
function pos(which,E){const{cx,cy,rx,ry}=E||earth();
 const map={north:[cx,cy-ry*.72],south:[cx,cy+ry*.72],mexico:[cx-rx*.22,cy+ry*.02],serengeti:[cx+rx*.14,cy+ry*.18],cold:[cx+rx*.62,cy-ry*.35],warm:[cx+rx*.55,cy+ry*.45]};
 return map[which]}
function line(g,t,y){const px=A.narrow?13:15,rows=[''];g.font=`600 ${px}px system-ui,sans-serif`;
 t.split(' ').forEach(w=>{const n=rows.length-1,s=(rows[n]+' '+w).trim();if(g.measureText(s).width>A.W-16&&rows[n])rows.push(w);else rows[n]=s});
 rows.slice(0,2).forEach((s,j)=>txt(s,A.W/2,y+(j-(Math.min(2,rows.length)-1)/2)*(px+3),px,{w:600}))}
function bin(k){const w=(A.W-28)/2;return{x:10+(k==='stay'?w+8:0),y:A.H*.58,w,h:A.H*.34}}
function paint(){const{ctx:g,W,H,col:C}=A,k=mode();g.fillStyle=A.mix(C.pn,C.cy,C.dark?.08:.12);g.fillRect(0,0,W,H);
 if(k==='quiz'){txt('Who travels, where, and why?',W/2,H*.42,A.narrow?16:18);txt('Answer below',W/2,H*.56,15,{c:C.mu,w:500});A.fx.draw(g);return}
 if(k==='trip'){const E=earth();const dest=S.at==='south'?'south':'north';const [x,y]=pos(dest,E);
  txt('Arctic tern: a round trip, pole to pole',W/2,H*.08,A.narrow?15:17);
  g.fillStyle=C.tx;g.beginPath();g.arc(x,y,8,0,7);g.fill();txt('🐦',x,y-26,28);
  txt(S.at==='south'?'Far south — now fly back north':'Far north — fly south for the other summer',W/2,H*.9,A.narrow?13:14,{c:C.mu,w:600,max:W-16})}
 if(k==='routes'){earth();txt('Match each animal to its route',W/2,H*.08,A.narrow?15:17);
  const spots=[['north','pole to pole'],['mexico','to Mexico'],['serengeti','Serengeti'],['cold','cold → warm sea']];
  const E={cx:A.W/2,cy:A.H*.46,rx:Math.min(A.W*.42,170),ry:A.H*.34};
  spots.forEach(([id,lab])=>{const [x,y]=pos(id==='cold'?'cold':id==='north'?'north':id,E);const got=(S.laid||[]).find(p=>p.place===id);
   g.fillStyle=got?A.mix(C.pn,C.gr,C.dark?.3:.25):A.mix(C.pn,C.ac,C.dark?.2:.16);g.beginPath();g.arc(x,y,18,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=1.5;g.stroke();
   if(got)txt(got.e,x,y,16);txt(lab,x,y+28,11,{w:600,max:90})});
  const it=ROUTES[S.i];if(it)txt(it.e+'  '+it.n,W/2,H*.88,A.narrow?18:20);else txt('All matched ✓',W/2,H*.88,18,{c:C.gr})}
 if(k==='why'||k==='whale'){const it=k==='whale'?{e:'🐋',n:'humpback whale'}:WHY[S.i];
  if(it){txt(k==='whale'?'Why swim to the warm sea?':`Why does the ${it.n} travel?`,W/2,H*.12,A.narrow?16:18);
   txt(it.e,W/2,H*.42,72);if(k==='whale'){txt('Cold sea: food (krill)',W/2,H*.64,15,{c:C.cy,w:600});txt('Warm sea: calves',W/2,H*.74,15,{c:C.am,w:600})}}
  else txt('All reasons found ✓',W/2,H*.45,20,{c:C.gr})}
 if(k==='sort'){[['go','migrates'],['stay','stays nearby']].forEach(([id,lab])=>{const z=bin(id);g.fillStyle=A.mix(C.pn,id==='go'?C.cy:C.am,C.dark?.22:.16);A.paint.rrect(z.x,z.y,z.w,z.h,16);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();
  txt(lab,z.x+z.w/2,z.y+18,A.narrow?14:16,{max:z.w-8});(S.laid||[]).filter(p=>p.k===id).forEach((p,n)=>txt(p.e+' '+p.n,z.x+z.w/2,z.y+44+n*20,A.narrow?12:13,{max:z.w-10,w:600}))});
  const it=SORT[S.i];if(it&&!S.drag)txt(it.e+'  '+it.n,W/2,H*.28,A.narrow?22:26);else if(!it)txt('All sorted ✓',W/2,H*.28,20,{c:C.gr});
  if(S.drag)txt(S.drag.e+' '+S.drag.n,S.drag.x,S.drag.y,18)}
 if(S.msg)line(g,S.msg,k==='sort'?H*.5:H*.82);A.fx.draw(g)}
function feedback(t,good){S.msg=t;if(good)A.sound.pop();else if(good===false)A.sound.miss();tell(t);buttons();A.redraw();S.after&&S.after()}
function reset(o){for(const k in S)delete S[k];Object.assign(S,{i:0,at:'north',laid:[],drag:null,msg:'',after:()=>{}},o||{});A.redraw()}
function fly(dest){if(mode()!=='trip')return;
 if(S.at==='north'&&dest==='south'){S.at='south';return feedback('The tern is in the far south. Migration is not over: it will fly back.',true)}
 if(S.at==='south'&&dest==='north'){S.at='north';S.back=true;return feedback('Back to the far north. A migration is a round trip, not a one-way move.',true)}
 if(S.at==='north'&&dest==='north')return feedback('It is already in the north. Fly south first, then back.',false);
 feedback('Fly south first. Then fly back north to finish the round trip.',false)}
const RPLACE={tern:'north',monarch:'mexico',wilde:'serengeti',whale:'cold'};
function dropRoute(place){const it=ROUTES[S.i];if(!it)return;
 if(RPLACE[it.id]!==place){const m=place==='north'?'Pole to pole is the Arctic tern, the longest migration.':place==='mexico'?'Mexico for winter is the monarch butterfly.':place==='serengeti'?'The Serengeti loop is the wildebeest, following the rain.':'Cold sea to warm sea is the humpback whale.';
  return feedback(m,false)}
 S.laid.push({e:it.e,place});S.i++;feedback(`Yes. The ${it.n} travels ${it.place}.`,true)}
function pickWhy(tag){const it=WHY[S.i];if(!it)return;
 if(tag!=='ok'){const m=tag==='food'?'Humpbacks feed in cold seas, on krill and small fish. They swim to warm seas to have calves, and they eat little there.'
  :tag==='breed'?'Wildebeest follow the rain so they can graze fresh grass. That trip is about food, not about giving birth in snow.'
  :tag==='stay'?'Arctic terns do not sleep through winter in a nest. They fly to the other pole, where it is summer.'
  :'Each animal has its own route. Do not mix the tern, the monarch, the whale and the wildebeest.';
  return feedback(m,false)}
 S.i++;feedback(`Yes. The ${it.n}: ${it.opts[0][0]}.`,true)}
function pickWhale(tag){if(tag!=='ok'){const m=tag==='food'?'Not to feed. The food (krill) is in the cold sea. Warm water is safer for a newborn calf.'
  :'They are not going there to roost in trees. Whales swim. Warm seas are for breeding.';
  return feedback(m,false)}
 S.ok=true;feedback('Yes. Feed in the cold sea. Have calves in the warm sea.',true)}
function drop(k){const it=SORT[S.i];if(!it)return;
 if(k!==it.ok){const m=it.ok==='go'?`A ${it.n} makes a long trip and returns. That is migration.`
  :it.n==='hedgehog'?'A hedgehog sleeps through winter in its nest. That is hibernation: it stays put, so it is not migration.':'A garden snail stays near home. Migration is a long trip, then a return.';
  return feedback(m,false)}
 S.laid.push({e:it.e,n:it.n,k});S.i++;feedback(it.ok==='go'?`Yes. The ${it.n} migrates.`:`Yes. The ${it.n} stays. That is not migration.`,true)}
function buttons(){if(!pad)return;pad.innerHTML='';const k=mode();if(k==='quiz')return;
 const add=(t,f,lab)=>{c.el('button',{type:'button',class:'lbtn',style:'min-height:48px;padding:8px 12px','aria-label':lab||t},pad,t).onclick=f};
 if(k==='trip'){add('Fly south',()=>fly('south'));add('Fly back north',()=>fly('north'))}
 if(k==='routes'&&ROUTES[S.i]){[['north','Pole to pole'],['mexico','To Mexico'],['serengeti','Serengeti loop'],['cold','Cold sea → warm sea']].forEach(([id,lab])=>add(lab,()=>dropRoute(id),`Match ${ROUTES[S.i].n} to ${lab}`))}
 if(k==='why'&&WHY[S.i])WHY[S.i].opts.forEach(([lab,tag])=>add(lab,()=>pickWhy(tag)));
 if(k==='whale'){[['to have calves','ok'],['to feed on krill there','food'],['to roost in trees','mix']].forEach(([lab,tag])=>add(lab,()=>pickWhale(tag)))}
 if(k==='sort'&&SORT[S.i]){add('Migrates',()=>drop('go'),`${SORT[S.i].n} migrates`);add('Stays nearby',()=>drop('stay'),`${SORT[S.i].n} stays nearby`)}}
function down(p){const k=mode();if(k==='quiz')return false;
 if(k==='trip'){const E={cx:A.W/2,cy:A.H*.46,rx:Math.min(A.W*.42,170),ry:A.H*.34};const s=pos('south',E),n=pos('north',E);
  if(Math.hypot(p.x-s[0],p.y-s[1])<36){fly('south');return true}if(Math.hypot(p.x-n[0],p.y-n[1])<36){fly('north');return true}}
 if(k==='routes'){const E={cx:A.W/2,cy:A.H*.46,rx:Math.min(A.W*.42,170),ry:A.H*.34};
  for(const id of ['north','mexico','serengeti','cold']){const [x,y]=pos(id,E);if(Math.hypot(p.x-x,p.y-y)<28){dropRoute(id);return true}}}
 if(k==='sort'&&SORT[S.i]){if(p.y<A.H*.5){S.drag={x:p.x,y:p.y,e:SORT[S.i].e,n:SORT[S.i].n};return true}
  for(const id of ['go','stay']){const z=bin(id);if(p.x>z.x&&p.x<z.x+z.w&&p.y>z.y){drop(id);return true}}}
 return false}
function move(p){if(S.drag){S.drag.x=p.x;S.drag.y=p.y;A.redraw()}}
function up(p){if(!S.drag)return;S.drag=null;A.redraw();if(!p)return;if(mode()==='sort'){for(const id of ['go','stay']){const z=bin(id);if(p.x>z.x&&p.x<z.x+z.w&&p.y>z.y){drop(id);return}}}}
const finish=(i,ok,say)=>()=>{if(A.step===i&&!A.isDone&&A.pred[i]!=null&&ok())A.done(say()+A.reveal(i))};
function auto(i,acts){steps[i].go();acts.forEach((f,j)=>setTimeout(()=>{if(A.step===i)f()},A.reduced()?25*(j+1):(j+1)*350))}
function open(i,hint,ok,say){reset();feedback(hint);S.after=finish(i,ok,say)}
const steps=[
{h:'A round trip',p:'Migration is a long trip an animal makes, and then it comes back. It is not wandering, and it is not a one-way move to a new home.',
 predict:{q:'An Arctic tern flies south for winter. Does it stay there for good?',opts:['Yes, it finds a new home','No, it comes back again','It gets lost on the way'],ans:1},
 task:'Fly the tern south, then back north',show:()=>auto(0,[()=>fly('south'),()=>fly('north')]),
 go:()=>open(0,'Tap the south of the map, or use the buttons.',()=>S.back,()=>'The tern flies pole to pole and back. That round trip is migration.')},
{h:'Who goes where?',p:'Different animals take different routes. The Arctic tern flies farthest: pole to pole.',
 predict:{q:'Which animal flies from the far north to the far south and back?',opts:['monarch butterfly','Arctic tern','wildebeest'],ans:1},
 task:'Match each animal to its route',show:()=>auto(1,ROUTES.map(it=>()=>dropRoute(RPLACE[it.id]))),
 go:()=>open(1,'Tap a spot on the map, or use the buttons.',()=>S.i>=ROUTES.length,()=>'Tern: pole to pole. Monarch: Mexico. Wildebeest: Serengeti. Whale: cold sea to warm sea.')},
{h:'Why they travel',p:'Animals migrate for food, to have babies, or to follow the seasons. Each one has a reason.',
 predict:{q:'Wildebeest walk around the Serengeti mainly to…',opts:['follow the rain and eat fresh grass','fly to Mexico','sleep in a nest all winter'],ans:0},
 task:'Pick why each animal travels',show:()=>auto(2,WHY.map(()=>()=>pickWhy('ok'))),
 go:()=>open(2,'Read the animal, then pick its reason.',()=>S.i>=WHY.length,()=>'Grass after rain, calves in warm water, winter in Mexico, and summer food pole to pole.')},
{h:'Cold sea, warm sea',p:'Humpback whales feed in cold seas, where krill is plentiful. They swim to warm seas to have their calves, and they eat little there.',
 predict:{q:'Humpback whales swim to warm seas to…',opts:['feed on more krill','have their calves','roost in trees'],ans:1},
 task:'Choose why the whale swims south',show:()=>auto(3,[()=>pickWhale('ok')]),
 go:()=>open(3,'Feed in the cold. Have calves in the warm.',()=>S.ok,()=>'Warm water is for calves, not for a bigger meal.')},
{h:'Not every animal',p:'Some animals stay nearby all year. A hedgehog sleeping in its nest all winter is hibernating, not migrating.',
 predict:{q:'A hedgehog sleeps through winter in its nest. Is that migration?',opts:['Yes, it is away for the season','No, it stays put: that is hibernation','Yes, any winter change is migration'],ans:1},
 task:'Sort who migrates and who stays',show:()=>auto(4,SORT.map(it=>()=>drop(it.ok))),
 go:()=>open(4,'Drag each animal into a box, or use the buttons.',()=>S.i>=SORT.length,()=>'Tern, monarch, wildebeest and whale migrate. The snail stays. The hedgehog hibernates.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.after()});
const QS=[
 ['What is migration?',[['a long trip, then a return, for food, babies or seasons','ok'],['any time an animal moves to a new home for good','oneway'],['sleeping through winter in a nest','hibernate']]],
 ['Which animal makes the longest migration, pole to pole?',[['Arctic tern','ok'],['monarch butterfly','mix'],['wildebeest','mix']]],
 ['Why do humpback whales swim to warm seas?',[['to have their calves','ok'],['to feed on krill there','food'],['to walk the Serengeti','mix']]],
 ['Wildebeest follow the rain around the Serengeti to…',[['eat fresh grass','ok'],['have calves in Mexico','mix'],['fly pole to pole','mix']]],
 ['A hedgehog sleeps in its nest all winter. That is…',[['hibernation, not migration','ok'],['migration to a warmer land','hibernate'],['a round trip pole to pole','mix']]],
 ['Monarch butterflies fly thousands of miles in autumn to…',[['spend winter in Mexico','ok'],['swim to Antarctica','mix'],['feed on krill','food']]],
 ['A garden snail stays near home all year. Does it migrate?',[['No. Migration is a long trip and a return','ok'],['Yes, because it moves a little each day','oneway'],['Yes, it hibernates, and that counts','hibernate']]]];
function why(t){let m='Migration is a long trip an animal makes and then returns from, for food, breeding or the seasons.';
 if(t==='oneway')m='Moving to a new home for good is not migration. In a migration the animal, or its offspring, is part of a return.';
 if(t==='hibernate')m='Hibernation means staying put and sleeping through winter, like a hedgehog in its nest. That is not a long trip.';
 if(t==='food')m='Humpbacks feed in cold seas. Warm seas are for having calves, not for a bigger meal of krill.';
 if(t==='mix')m='Do not mix the animals up. Terns go pole to pole, monarchs to Mexico, wildebeest around the Serengeti, whales from cold seas to warm seas.';
 return m}
function ask(){turn++;const Q=QS[turn%QS.length],r=turn%3,opts=[...Q[1].slice(r),...Q[1].slice(0,r)];
 qa.innerHTML=`<p><b>${Q[0]}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qa.querySelector('.fl-pick');opts.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn',style:'min-height:48px'},row,v).onclick=()=>mark(t)});tell('Challenge: '+Q[0]);A.redraw()}
function mark(t){qa.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=qa.querySelector('.fl-fb'),ok=t==='ok';
 if(ok)A.win();else A.sound.miss();fb.innerHTML=(ok?'✓ Yes! ':'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.28,draw:paint,onStep:A=>{qa.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{reset();const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Migration buttons'},w);qa=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up});buttons()}});
A.start()})})();
