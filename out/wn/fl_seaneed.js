/* Flagship: What Ocean Animals Need (ages 5–7; NC Year 2 living things and their habitats:
   how habitats provide for the basic needs of animals). Sea animals need food, shelter, oxygen
   and the right conditions; each part of the ocean suits different animals.
   Feed three animals, hide a clownfish and a crab, tap gills and lift a dolphin to breathe,
   place four animals in reef / polar / deep / shore water, sort land and sea needs.
   Distinct from flagneeds (needs vs wants), flaghome (land homes), flagocean and flagoce5. */
(()=>{
VIS.reg('flagseaneed',c=>{
let A,pad,quiz,qn=-1;const S={};c.fig.classList.add('young');
const KIND=['food','hide','air','place','same','quiz'];
const EATERS=[['clownfish','🐠','plank','Clownfish eat tiny plankton that floats in the water.'],['seal','🦭','fish','Seals catch and eat fish.'],['sea turtle','🐢','grass','Green sea turtles munch seagrass, a plant on the sea floor.']];
const FOODS={plank:['🦐','tiny plankton'],fish:['🐟','small fish'],grass:['🌿','seagrass'],salt:['💧','just sea water']};
const ZONES=[['reef','🪸','warm, sunny reef','warm and bright'],['ice','🧊','icy polar sea','freezing cold'],['deep','🌑','deep, dark sea','dark and cold'],['shore','🪨','rocky shore pool','shallow, with rocks']];
const DWELL=[['clownfish','🐠','reef','warm water and an anemone to hide in'],['emperor penguin','🐧','ice','icy water full of fish to catch'],['anglerfish','🐟','deep','the dark deep sea, where it makes its own light'],['starfish','⭐','shore','rocks to cling to in shallow water']];
const CARDS=[['a bird eats seeds','food','land'],['a seal eats fish','food','sea'],['a rabbit hides in a burrow','safe','land'],['a clownfish hides in an anemone','safe','sea'],['a dog breathes air','air','land'],['a fish gets oxygen from water','air','sea']];
const BINS={food:'Food',safe:'A safe place',air:'Air (oxygen)'};
const tell=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const page=()=>KIND[A.step];
function T(s,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,"Noto Color Emoji",sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.col||A.col.tx;g.fillText(String(s),x,y,o.max||A.W-14)}
function caption(t){const g=A.ctx,px=A.narrow?15:16,rows=[''];g.font=`600 ${px}px system-ui,sans-serif`;
 for(const w of t.split(' ')){const last=rows.length-1,tryIt=(rows[last]+' '+w).trim();if(g.measureText(tryIt).width>A.W-22&&rows[last])rows.push(w);else rows[last]=tryIt}
 const n=Math.min(4,rows.length),lh=px+5,top=A.H-n*lh-12;g.fillStyle=A.alpha(A.col.pn,.94);g.fillRect(0,top,A.W,A.H-top);rows.slice(0,4).forEach((r,j)=>T(r,A.W/2,top+6+lh*j+lh/2,px,{w:600}))}
const tint=(k,a)=>A.mix(A.col.pn,A.col[k],A.col.dark?a*.75:a);
function card(b,k,a,r){const g=A.ctx;g.fillStyle=tint(k,a);A.paint.rrect(b.x,b.y,b.w,b.h,r||14);g.fill();g.strokeStyle=A.col.tx;g.lineWidth=1.5;g.stroke()}
const inside=(p,b)=>!!b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
const near=(p,q,r)=>!!q&&Math.hypot(p.x-q.x,p.y-q.y)<r;
function grid(i,n,cols,y0,h){const gap=10,w=(A.W-24-gap*(cols-1))/cols;return{x:12+(i%cols)*(w+gap),y:y0+Math.floor(i/cols)*(h+gap),w,h}}
function sea(top){const g=A.ctx;g.fillStyle=tint('cy',.22);g.fillRect(0,top,A.W,A.H-top);g.strokeStyle=A.col.cy;g.lineWidth=2;g.beginPath();for(let x=0;x<=A.W;x+=8)g.lineTo(x,top+Math.sin(x/18)*3);g.stroke()}
/* ---- food: feed three animals ---- */
const foodKeys=Object.keys(FOODS);
const foodCard=i=>grid(i,4,2,A.H*(A.narrow?.5:.52),A.narrow?60:54);
function drawFood(){const who=EATERS[S.fi];sea(A.H*.1);
 if(!who){T('Everyone has eaten!',A.W/2,A.H*.3,A.narrow?20:22,{col:A.col.gr});}
 else{S.mouth={x:A.W/2,y:A.H*.3};T(who[1],A.W/2,A.H*.3,A.narrow?58:64);T(`Feed the ${who[0]}`,A.W/2,A.H*.17,A.narrow?18:20);T('hungry',A.W/2,A.H*.42,14,{col:A.col.mu,w:600})}
 foodKeys.forEach((k,i)=>{if(S.drag&&S.drag.k===k)return;const b=foodCard(i);card(b,k==='salt'?'ln':'gr',.18);T(FOODS[k][0]+' '+FOODS[k][1],b.x+b.w/2,b.y+b.h/2,A.narrow?16:17,{max:b.w-8})});
 if(S.drag){const d=S.drag;card({x:d.x-70,y:d.y-26,w:140,h:52},'gr',.4);T(FOODS[d.k][0]+' '+FOODS[d.k][1],d.x,d.y,16)}}
function feed(k){const who=EATERS[S.fi];if(!who)return;
 if(k==='salt')return talk('Sea water is not food. Like you, every sea animal needs food to grow and move.',false);
 if(k!==who[2]){const eater=EATERS.find(e=>e[2]===k);return talk(`A ${who[0]} does not eat ${FOODS[k][1]}. That is food for the ${eater[0]}.`,false)}
 S.fi++;if(S.fi>=EATERS.length){S.fed=true;return talk('All three fed. Sea animals need food, just like land animals.',true)}talk('Yes! '+who[3],true)}
/* ---- hide: anemone and rock ---- */
const anem=()=>({x:A.W*(A.narrow?.56:.62),y:A.H*.56,w:A.W*(A.narrow?.4:.3),h:A.H*.24});
const rock=()=>({x:A.W*(A.narrow?.04:.08),y:A.H*.62,w:A.W*(A.narrow?.42:.3),h:A.H*.18});
function drawHide(){const g=A.ctx,C=A.col,an=anem(),rk=rock();sea(A.H*.08);
 T('🐟',A.W*.18,A.H*.2,A.narrow?44:54);T('big fish',A.W*.18,A.H*.3,13,{w:600});
 g.strokeStyle=C.pk;g.lineWidth=5;g.lineCap='round';for(let i=0;i<9;i++){const x=an.x+an.w*(i+.5)/9;g.beginPath();g.moveTo(x,an.y+an.h);g.quadraticCurveTo(x+(i%2?10:-10),an.y+an.h*.5,x,an.y+8);g.stroke()}g.lineCap='butt';
 T('anemone',an.x+an.w/2,an.y-12,14,{w:700});
 g.fillStyle=tint('ln',.6);g.beginPath();g.ellipse(rk.x+rk.w/2,rk.y+rk.h*.6,rk.w/2,rk.h*.55,0,Math.PI,0);g.fill();g.strokeStyle=C.tx;g.lineWidth=1.5;g.stroke();T('rock',rk.x+rk.w/2,rk.y-6,14);
 [['clown','🐠'],['crab','🦀']].forEach(([k,e])=>{const p=S.pos[k];T(e,p.x,p.y,A.narrow?36:40)});
 T(S.safe.clown&&S.safe.crab?'Both are hidden and safe':'Drag each animal to its hiding place',A.W/2,A.H*.05+8,A.narrow?15:17,{col:S.safe.clown&&S.safe.crab?C.gr:C.tx})}
function home(k){const b=k==='clown'?anem():rock();return{x:b.x+b.w/2,y:b.y+b.h*.55}}
function hide(k,where){if(S.safe[k])return;const name=k==='clown'?'clownfish':'crab';
 if(where==='open'){S.pos[k]=start(k);return talk(`Out in open water, the big fish can see the ${name}. Find it a hiding place.`,false)}
 if((k==='clown')!==(where==='anem')){S.pos[k]=start(k);return talk(k==='clown'?'That gap is the crab’s. A clownfish hides in the anemone.':'The crab tucks itself under the rock. Try the rock.',false)}
 S.safe[k]=true;S.pos[k]=home(k);
 if(S.safe.clown&&S.safe.crab){S.hid=true;return talk('Both safe! A safe place to hide is shelter. The sea has shelters too.',true)}
 talk(k==='clown'?'Safe! Anemone stings scare off big fish, but a clownfish has slime that keeps it from being stung.':'Safe! The big fish cannot reach the crab under the rock.',true)}
const start=k=>({x:A.W*(k==='clown'?.45:.62),y:A.H*(k==='clown'?.32:.42)});
/* ---- air: gills and blowhole ---- */
const surf=()=>A.H*.2;
function drawAir(){const g=A.ctx,C=A.col,top=surf();g.fillStyle=tint('am',.12);g.fillRect(0,0,A.W,top);T('air',A.W-30,top/2,14,{w:600});sea(top);
 const fx=A.W*.27,fy=A.H*.62;T('🐟',fx,fy,A.narrow?48:56);S.fish={x:fx,y:fy};T(S.gill?'gills: oxygen in':'tap the fish',fx,fy+40,14,{col:S.gill?C.gr:C.mu});
 if(S.gill)for(let i=0;i<5;i++){g.strokeStyle=C.cy;g.lineWidth=2;g.beginPath();g.arc(fx-40-i*6,fy-10-i*14,4+i,0,7);g.stroke()}
 const dx=A.W*.72,dy=top+S.dd*(A.H*.66-top);T('🐬',dx,dy,A.narrow?48:56);S.dol={x:dx,y:dy};
 const bx=A.W*.6,bw=A.W*.3,by=A.H*.79;card({x:bx,y:by-9,w:bw,h:16},'ln',.12,6);g.fillStyle=S.breath>=1?C.gr:C.rd;g.fillRect(bx+2,by-7,(bw-4)*S.breath,12);T('dolphin’s breath',bx+bw/2,by-20,13,{w:600})}
function gills(){if(S.gill)return;S.gill=true;done2('A fish’s gills take oxygen out of the water. It never needs to go up for air.')}
function fishUp(){talk('No need! A fish breathes under water. Its gills take oxygen from the water.',false)}
function setDol(v){S.dd=Math.max(0,Math.min(1,v));if(S.blow){A.redraw();return}
 if(S.dd<=.05){S.blow=true;S.breath=1;return done2('Whoosh! A dolphin breathes air through the blowhole on top of its head.')}
 tell(S.dd<.5?'Nearly at the top. Keep going up.':'The dolphin is low on air. Bring it up to the surface.');A.redraw()}
function done2(t){if(S.gill&&S.blow){S.air=true;return talk(t+' Both need oxygen.',true)}talk(t,true)}
/* ---- place: four parts of the ocean ---- */
const zone=i=>grid(i,4,2,A.H*(A.narrow?.3:.32),A.narrow?A.H*.235:A.H*.21);
function drawPlace(){const cur=DWELL[S.pi];
 if(cur){S.who=A.narrow?{x:A.W/2-80,y:A.H*.13,w:160,h:58}:{x:A.W/2-90,y:A.H*.1,w:180,h:58};const p=S.hold,b=S.who;card(p?{x:p.x-b.w/2,y:p.y-b.h/2,w:b.w,h:b.h}:b,'vi',.25);T(cur[1]+' '+cur[0],p?p.x:b.x+b.w/2,p?p.y:b.y+b.h/2,A.narrow?16:18,{max:b.w-8});T('Where does it belong?',A.W/2,A.H*.05,A.narrow?16:18)}
 else T('Every animal is in a place that suits it',A.W/2,A.H*.15,A.narrow?16:18,{col:A.col.gr});
 ZONES.forEach(([k,e,nm],i)=>{const b=zone(i),got=DWELL.find((d,j)=>j<S.pi&&d[2]===k);card(b,k==='reef'?'pk':k==='ice'?'cy':k==='deep'?'vi':'am',got?.32:.14);T(e,b.x+b.w/2,b.y+b.h*.3,A.narrow?26:28);T(nm,b.x+b.w/2,b.y+b.h*.62,A.narrow?14:15,{max:b.w-6});if(got)T('✓ '+got[0],b.x+b.w/2,b.y+b.h*.85,13,{col:A.col.gr,max:b.w-6})})}
function settle(k){const cur=DWELL[S.pi];S.hold=null;if(!cur)return;
 if(k!==cur[2]){const z=ZONES.find(x=>x[0]===k);return talk(`The ${z[2]} is ${z[3]}. A ${cur[0]} needs ${cur[3]}.`,false)}
 S.pi++;if(S.pi>=DWELL.length){S.placed=true;return talk('Each part of the ocean gives different animals what they need.',true)}talk(`Yes: a ${cur[0]} needs ${cur[3]}.`,true)}
/* ---- same: land and sea, same needs ---- */
const bin=i=>grid(i,3,3,A.H*.5,A.narrow?A.H*.2:A.H*.24);
const binKeys=Object.keys(BINS);
function drawSame(){const cur=CARDS[S.ci];
 if(cur){S.top=A.narrow?{x:16,y:A.H*.2,w:A.W-32,h:64}:{x:A.W*.2,y:A.H*.2,w:A.W*.6,h:62};const p=S.hold,b=S.top;card(p?{x:p.x-b.w/2,y:p.y-b.h/2,w:b.w,h:b.h}:b,cur[2]==='sea'?'cy':'am',.25);T(cur[0],p?p.x:b.x+b.w/2,p?p.y:b.y+b.h/2,A.narrow?16:18,{max:b.w-10});T(cur[2]==='sea'?'sea animal':'land animal',A.W/2,A.H*.12,14,{col:A.col.mu,w:600})}
 else T('Land or sea: the same needs',A.W/2,A.H*.3,A.narrow?18:20,{col:A.col.gr});
 binKeys.forEach((k,i)=>{const b=bin(i);card(b,'gr',.12);T(BINS[k],b.x+b.w/2,b.y+20,A.narrow?14:16,{max:b.w-6});T(String(S.sorted.filter(x=>x===k).length)+' / 2',b.x+b.w/2,b.y+b.h*.62,A.narrow?18:20,{w:700})})}
function sortTo(k){const cur=CARDS[S.ci];S.hold=null;if(!cur)return;
 if(k!==cur[1])return talk(`“${cur[0]}” is not about ${BINS[k].toLowerCase()}. Think: is it eating, hiding or breathing?`,false);
 S.sorted.push(k);S.ci++;if(S.ci>=CARDS.length){S.alike=true;return talk('Land animals and sea animals need the same things: food, a safe place and air. They just get them in different ways.',true)}talk('Yes: '+BINS[k].toLowerCase()+'.',true)}
/* ---- frame ---- */
function draw(){const{ctx:g,W:w,H:h,col:C}=A,k=page();g.fillStyle=A.mix(C.pn,C.cy,C.dark?.04:.05);g.fillRect(0,0,w,h);
 if(k==='quiz'){T('🐠 Ocean needs check',w/2,h*.42,A.narrow?19:22);T('Answer below',w/2,h*.55,15,{col:C.mu,w:500});A.fx.draw(g);return}
 ({food:drawFood,hide:drawHide,air:drawAir,place:drawPlace,same:drawSame})[k]();if(S.msg)caption(S.msg);A.fx.draw(g)}
function talk(t,good){S.msg=t;if(good)A.sound.pop();else if(good===false)A.sound.miss();tell(t);keys();A.redraw();S.check&&S.check()}
function reset(){for(const k in S)delete S[k];Object.assign(S,{fi:0,pos:{clown:start('clown'),crab:start('crab')},safe:{},dd:1,breath:.2,pi:0,ci:0,sorted:[],msg:'',check:()=>{}});A.redraw()}
function keys(){if(!pad)return;pad.innerHTML='';const k=page();if(k==='quiz')return;
 const b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='food'&&EATERS[S.fi])foodKeys.forEach(f=>b(`Give ${FOODS[f][1]}`,()=>feed(f),`Give the ${EATERS[S.fi][0]} ${FOODS[f][1]}`));
 if(k==='hide'){if(!S.safe.clown){b('Clownfish into the anemone',()=>hide('clown','anem'));b('Leave clownfish in open water',()=>hide('clown','open'))}if(!S.safe.crab){b('Crab under the rock',()=>hide('crab','rock'));b('Crab into the anemone',()=>hide('crab','anem'))}}
 if(k==='air'){if(!S.gill){b('Fish: use its gills',gills);b('Fish: swim up for air',fishUp)}if(!S.blow)b('Dolphin: swim up',()=>setDol(S.dd-.5))}
 if(k==='place'&&DWELL[S.pi])ZONES.forEach(z=>b(z[1]+' '+z[2],()=>settle(z[0]),`Put the ${DWELL[S.pi][0]} in the ${z[2]}`));
 if(k==='same'&&CARDS[S.ci])binKeys.forEach(x=>b(BINS[x],()=>sortTo(x),`${CARDS[S.ci][0]}: ${BINS[x]}`))}
function press(p){const k=page();if(k==='quiz')return false;
 if(k==='food'){if(!EATERS[S.fi])return false;for(let i=0;i<foodKeys.length;i++)if(inside(p,foodCard(i))){S.drag={k:foodKeys[i],x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}return false}
 if(k==='hide'){for(const a of['clown','crab'])if(!S.safe[a]&&near(p,S.pos[a],34)){S.grab=a;return true}return false}
 if(k==='air'){if(near(p,S.fish,40)){gills();return true}if(!S.blow&&near(p,S.dol,44)){S.grab='dol';return true}return false}
 if(k==='place'&&DWELL[S.pi]){if(inside(p,S.who)){S.hold={x:p.x,y:p.y};return true}for(let i=0;i<ZONES.length;i++)if(inside(p,zone(i))){settle(ZONES[i][0]);return true}return false}
 if(k==='same'&&CARDS[S.ci]){if(inside(p,S.top)){S.hold={x:p.x,y:p.y};return true}for(let i=0;i<binKeys.length;i++)if(inside(p,bin(i))){sortTo(binKeys[i]);return true}}
 return false}
function slide(p){if(S.drag){S.drag.x=p.x;S.drag.y=p.y;A.redraw();return}
 if(S.grab==='dol'){const top=surf();setDol((p.y-top)/(A.H*.66-top));return}
 if(S.grab){S.pos[S.grab]={x:p.x,y:p.y};A.redraw();return}if(S.hold){S.hold={x:p.x,y:p.y};A.redraw()}}
function lift(p){const k=page();
 if(S.drag){const d=S.drag;S.drag=null;if(Math.hypot(d.x-d.x0,d.y-d.y0)<10||near(d,S.mouth,70))feed(d.k);else A.redraw();return}
 if(S.grab&&S.grab!=='dol'){const a=S.grab,q=S.pos[a];S.grab=null;hide(a,inside(q,anem())?'anem':inside(q,rock())?'rock':'open');return}
 S.grab=null;
 if(S.hold){const h=S.hold;if(k==='place'){const i=ZONES.findIndex((z,j)=>inside(h,zone(j)));if(i>=0)return settle(ZONES[i][0])}
  if(k==='same'){const i=binKeys.findIndex((x,j)=>inside(h,bin(j)));if(i>=0)return sortTo(binKeys[i])}S.hold=null;A.redraw()}}
const when=(i,ok,line)=>()=>{if(A.step===i&&!A.isDone&&A.pred[i]!=null&&ok())A.done(line()+A.reveal(i))};
function play(i,moves){steps[i].go();moves.forEach((f,j)=>setTimeout(()=>{if(A.step===i)f()},A.reduced()?25*(j+1):(j+1)*340))}
function open(i,hint,ok,line){reset();talk(hint);S.check=when(i,ok,line)}
const steps=[
{h:'Food in the sea',p:'Sea animals need food, just like you. Each one eats its own kind of food.',
 predict:{q:'Do sea animals need food?',opts:['no, they just drink sea water','yes, every animal needs food'],ans:1},
 task:'Feed all three sea animals',show:()=>play(0,EATERS.map(e=>()=>feed(e[2]))),
 go:()=>open(0,'Drag a food card onto the animal, or tap a card.',()=>S.fed,()=>'Everyone is fed.')},
{h:'A safe place',p:'Animals need a safe place to hide. We call it shelter. In the sea, it can be an anemone, a rock or a shell.',
 predict:{q:'A big fish swims by. Where is a clownfish safest?',opts:['out in the open water','in a stinging anemone'],ans:1},
 task:'Hide the clownfish and the crab',show:()=>play(1,[()=>hide('clown','anem'),()=>hide('crab','rock')]),
 go:()=>open(1,'Drag the clownfish and the crab to hiding places.',()=>S.hid,()=>'Both are safe.')},
{h:'Air under water',p:'Every animal needs oxygen, a gas in air and in water. Fish get it from the water with gills. Dolphins and whales come up to breathe air.',
 predict:{q:'How does a fish get its oxygen?',opts:['it swims up to breathe air','its gills take it from the water','fish need no oxygen'],ans:1},
 task:'Let the fish breathe and bring the dolphin up',show:()=>play(2,[gills,()=>setDol(.5),()=>setDol(0)]),
 go:()=>open(2,'Tap the fish. Then drag the dolphin up to the top.',()=>S.air,()=>'Gills and a blowhole.')},
{h:'The right place',p:'The ocean is not the same everywhere. Some parts are warm, some are icy, some are dark and deep. Each animal lives where the water suits it.',
 predict:{q:'Could a clownfish live in an icy polar sea?',opts:['yes, all sea water is the same','no, it needs warm water'],ans:1},
 task:'Put all four animals where they belong',show:()=>play(3,DWELL.map(d=>()=>settle(d[2]))),
 go:()=>open(3,'Drag the animal card to a part of the ocean, or tap a part.',()=>S.placed,()=>'All four are at home.')},
{h:'Same needs as land animals',p:'A rabbit hides in a burrow. A crab hides under a rock. Land and sea animals need the same things.',
 predict:{q:'Do sea animals need the same things as land animals?',opts:['no, sea animals need different things','yes: food, a safe place and air'],ans:1},
 task:'Sort all six cards',show:()=>play(4,CARDS.map(x=>()=>sortTo(x[1]))),
 go:()=>open(4,'Drag the card to a box, or tap a box.',()=>S.alike,()=>'Same needs, land or sea.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[
 ['What do ocean animals need?',[['food, a safe place, air and the right water','ok'],['only sea water','drink'],['nothing at all','drink']]],
 ['Why does a clownfish live in an anemone?',[['to hide from big fish','ok'],['to eat the anemone','hide'],['to keep warm','hide']]],
 ['How does a fish get oxygen?',[['its gills take it from the water','ok'],['it swims up to breathe air','gills'],['fish need no oxygen','gills']]],
 ['How does a dolphin breathe?',[['it comes up and breathes air','ok'],['with gills, like a fish','blow'],['it never breathes','blow']]],
 ['Could a clownfish live in an icy polar sea?',[['no, it needs warm reef water','ok'],['yes, all sea water is the same','place'],['yes, if it has food','place']]],
 ['A crab hides under a rock. Which need is that?',[['a safe place','ok'],['food','sort'],['air','sort']]],
 ['How are a seal and a fox alike?',[['both need food, a safe place and air','ok'],['they need different things','land'],['only the fox needs food','land']]]];
function why(t){let m='Think: food, a safe place, air and the right water.';
 if(t==='drink')m='Sea water is not enough. Sea animals need food, a safe place, oxygen and the right water.';
 if(t==='hide')m='The anemone is a hiding place. Its stings keep big fish away, and slime keeps the clownfish safe.';
 if(t==='gills')m='Fish do need oxygen. Their gills take it out of the water, so they stay under.';
 if(t==='blow')m='A dolphin has no gills. It swims up and breathes air through its blowhole.';
 if(t==='place')m='The ocean is not the same everywhere. A clownfish needs a warm, sunny reef.';
 if(t==='sort')m='Hiding is about a safe place, or shelter. Eating is food. Breathing is air.';
 if(t==='land')m='Land and sea animals need the same things. They just get them in different ways.';
 return m}
function ask(){qn++;const Q=QS[qn%QS.length],r=qn%3,opts=[...Q[1].slice(r),...Q[1].slice(0,r)];
 quiz.innerHTML=`<p><b>${Q[0]}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');opts.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>mark(t)});tell('Challenge: '+Q[0]);A.redraw()}
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok)A.win();else A.sound.miss();fb.innerHTML=(ok?'✓ Yes! ':'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.72,tall:1.35,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
 init:A=>{reset();const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Ocean needs buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);A.gest({down:press,move:slide,up:lift});keys()}});
A.start()})})();
