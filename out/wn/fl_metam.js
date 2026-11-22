/* Flagship – types of metamorphosis (ages 9–11; Monarch Joint Venture growth and development notes; University of
   Maryland Extension FS-1144; Kaleka et al. 2019 on gradual metamorphosis in grasshoppers; Royal Entomological
   Society and NHM guides). Scenes: feed a grasshopper nymph and pull it out of its old skin five times until it has
   full wings (moulting before it has grown, or feeding twice, is refused with the reason); build a butterfly life
   cycle and a grasshopper life cycle (a pupa in the grasshopper's is refused); sort seven animals into complete,
   incomplete or not an insect from clues about their young; drag through ten days inside a chrysalis; and feed a
   monarch caterpillar, a monarch butterfly, a nymph and an adult grasshopper. Every drag or tap has a labelled
   button twin. Data and drawings in learn/metam_art.js. */
(()=>{const {box,inside,brush,MOULTS,STAGES,BUGS,KINDS,DAYS,PHASE,EATERS,FOODS,EAT,BRIEF,GOT,QZ,hopper,crawler,chrysalis,flyer}=MET;
VIS.reg('flagmetam',c=>{let A,B,keys,quizBox,qq=-1,epoch=0;
const C={ink:'#111827',ok:'#047857',ko:'#b91c1c',rim:'#6b7280',sel:'#1d4ed8',bg:'#f0fdf4',card:'#ffffff',leaf:'#bbf7d0',head:'#166534'};
const M={};const room=()=>['moult','cycle','sort','pupa','food','quiz'][A.step];
const Z=(x,y,w,h)=>box(A.W*x,A.H*y,A.W*w,A.H*h);
/* ---------- layout ---------- */
const nymphAt=()=>({x:A.W*.47,y:A.H*.47}),leafHome=()=>({x:A.W*.14,y:A.H*.78}),bodyS=()=>Math.min(A.W*(.2+.045*M.molts),A.W*.43);
const stageCard=i=>B.table(STAGES.length,A.narrow?3:5,Z(.03,.09,.94,A.narrow?.24:.14))[i];
const slot=(l,k)=>l?B.lane(3,Z(.03,.72,.71,.13))[k]:B.lane(4,Z(.03,.46,.94,.13))[k],laneBox=l=>l?Z(.03,.66,.94,.22):Z(.03,.4,.94,.22);
const bugCard=i=>B.table(BUGS.length,A.narrow?2:4,Z(.03,.09,.94,.52))[i],kindBin=k=>B.lane(3,Z(.03,.65,.94,.23))[k];
const track=()=>Z(.08,.8,.84,.05),dayX=d=>track().x+track().w*d/DAYS;
const foodCard=j=>B.table(4,A.narrow?2:4,Z(.03,.09,.94,A.narrow?.2:.11))[j],eater=i=>B.table(4,A.narrow?2:4,Z(.03,A.narrow?.4:.32,.94,A.narrow?.48:.5))[i];
const banner=t=>B.word(t,A.W/2,A.H*.045,12,{c:C.head,w:A.W-20});
const tally=(t,ok)=>B.word(t,A.W/2,A.H*.95,12,{b:700,c:ok?C.ok:C.ink,w:A.W-20});
const dragged=(i,b)=>M.grab&&M.grab.i===i?box(M.grab.x-b.w/2,M.grab.y-b.h/2,b.w,b.h):b;
/* ---------- 1: moult to grow ---------- */
function paintMoult(){const g=A.ctx,n=nymphAt(),s=bodyS(),adult=M.molts>=MOULTS;banner('Help the nymph grow');
 M.skins.forEach((k,j)=>{g.save();g.globalAlpha=.45;hopper(g,A.W*(.12+.17*j),A.H*(.22+(j%2)*.06),A.W*(.08+.015*k),0,'#d6d3d1');g.restore()});if(M.skins.length)B.word('Old skins',A.W/2,A.H*.13,10,{c:C.rim});
 const pos=M.grab&&M.grab.bug?M.grab:n;hopper(g,pos.x,pos.y,s,adult?1:M.molts*.12);
 if(M.fed&&!adult){g.strokeStyle=M.tight?C.ko:'#a16207';g.lineWidth=3;g.setLineDash([5,4]);g.beginPath();g.ellipse(n.x,n.y,s*.58,s*.24,0,0,7);g.stroke();g.setLineDash([]);B.word('Skin too tight',n.x,n.y+s*.38,11,{c:C.ko})}
 if(!adult){const l=M.grab&&M.grab.leaf?M.grab:leafHome();g.fillStyle='#16a34a';g.beginPath();g.ellipse(l.x,l.y,22,12,-.5,0,7);g.fill();g.strokeStyle='#14532d';g.lineWidth=1.5;g.stroke();B.word('Leaf',l.x,l.y+22,10)}
 tally(adult?'✓ 5 moults: now an adult with full wings':`Moults: ${M.molts} of ${MOULTS}`+(M.fed?'. Drag it out of its old skin':'. Feed it a leaf'),adult)}
function feed(){if(M.molts>=MOULTS)return;if(M.fed){M.tight=true;A.sound.miss();return say(slip('stretch'))}M.fed=true;M.tight=false;A.sound.pop();say('It eats and grows inside its hard skin. Now the skin is too tight. Drag the nymph out of it.')}
function moult(){if(M.molts>=MOULTS)return;if(!M.fed){A.sound.miss();return say(slip('notyet'))}M.skins.push(M.molts);M.molts++;M.fed=false;M.tight=false;A.sound.pop();
 say(M.molts<MOULTS?`Moult ${M.molts}: it splits its old skin and climbs out bigger, with a soft new skin that hardens. Its wing buds are bigger too.`:'Moult 5: full wings! It is an adult now, and adults do not moult again. It always looked like a grasshopper: no pupa.')}
/* ---------- 2: two life cycles ---------- */
function paintCycle(){const g=A.ctx;banner('Build both life cycles');
 [0,1].forEach(l=>{const n=l?3:4,lb=laneBox(l);B.word(l?'Grasshopper':'Butterfly',lb.x+6,lb.y+10,12,{al:'left',c:C.head});
  for(let k=0;k<n;k++){const b=slot(l,k),i=k?M.built[l][k-1]:-2;B.tile(b,M.hot===l?'#eff6ff':'#f9fafb',i!=null?'ok':'');B.word(k?(i!=null?STAGES[i].t:String(k+1)):'Egg',b.x+b.w/2,b.y+b.h/2,10,{w:b.w-6,c:i!=null?C.ok:C.rim});
   if(k<n-1){g.fillStyle=C.rim;g.beginPath();const x=b.x+b.w+1,y=b.y+b.h/2;g.moveTo(x-4,y-5);g.lineTo(x+4,y);g.lineTo(x-4,y+5);g.fill()}}
  if(M.built[l].length>=n-1)B.word(l?'Incomplete metamorphosis: 3 stages, no pupa':'Complete metamorphosis: 4 stages',lb.x+lb.w/2,slot(l,0).y+slot(l,0).h+14,10,{b:700,c:C.ok,w:lb.w})});
 STAGES.forEach((o,i)=>{if(M.built[o.l].includes(i))return;const b=dragged(i,stageCard(i));B.tile(b,C.leaf,M.bad===i?'ko':M.pick===i||(M.grab&&M.grab.i===i)?'sel':'');B.word(o.t,b.x+b.w/2,b.y+b.h/2,11,{w:b.w-8})});
 const n=M.built[0].length+M.built[1].length;tally(n>=5?'✓ Butterfly: 4 stages. Grasshopper: 3 stages':`Placed: ${n} of 5`,n>=5)}
function put(i,l){const o=STAGES[i];if(M.built[o.l].includes(i))return;M.pick=-1;
 if(o.l!==l){M.bad=i;A.sound.miss();return say(slip(l?o.d+'lane':o.d==='hop'?'hoplane':'nymphbf'))}
 const want=M.built[l].length+1;if(o.o!==want){M.bad=i;A.sound.miss();return say(slip('order',STAGES.find(s=>s.l===l&&s.o===want).t))}
 M.bad=-1;M.built[l].push(i);A.sound.pop();say(`${o.t}: stage ${want+1} of the ${l?'grasshopper':'butterfly'}.`+(o.d==='nymph'?' A nymph looks like a small adult with no full wings.':o.d==='pupa'?' Inside, the body is rebuilt.':''))}
/* ---------- 3: sort by clue ---------- */
function paintSort(){banner('Complete, incomplete, or not an insect?');
 KINDS.forEach((t,k)=>{const b=kindBin(k),got=BUGS.filter((o,i)=>M.kind[i]===k).map(o=>o.t);B.tile(b,['#dcfce7','#fef9c3','#f3f4f6'][k],M.hot===k?'sel':'');B.word(t,b.x+b.w/2,b.y+b.h*.26,10,{w:b.w-8});B.word(got.join(', ')||'…',b.x+b.w/2,b.y+b.h*.7,10,{b:700,w:b.w-8})});
 BUGS.forEach((o,i)=>{if(i in M.kind)return;const b=dragged(i,bugCard(i));B.tile(b,C.card,M.bad===i?'ko':M.pick===i||(M.grab&&M.grab.i===i)?'sel':'');B.word(o.t,b.x+b.w/2,b.y+b.h*.3,12,{w:b.w-8});B.word(o.c,b.x+b.w/2,b.y+b.h*.68,9,{b:600,w:b.w-10})});
 const n=Object.keys(M.kind).length;tally(n>=7?'✓ Pupa = complete. Nymph = incomplete':`Sorted: ${n} of 7`,n>=7)}
function file(i,k){if(i in M.kind)return;M.pick=-1;const o=BUGS[i];if(o.k!==k){M.bad=i;A.sound.miss();return say(slip(o.k===2?'spider':k===2?'isinsect':o.k?'hasnymph':'haspupa'))}
 M.bad=-1;M.kind[i]=k;A.sound.pop();say(`${o.t}: ${['it has a pupa stage, so complete','its young is a nymph and there is no pupa, so incomplete','a spider has 8 legs, so it is not an insect'][k]}.`)}
/* ---------- 4: inside the chrysalis ---------- */
function paintPupa(){const g=A.ctx,t=track(),d=M.day,s=Math.min(A.W*.5,A.H*.4);banner('Inside a chrysalis');
 const ph=PHASE.filter(p=>p[0]<=d).pop();B.word(ph[1],A.W/2,A.H*.11,11,{w:A.W-30,c:C.ink});
 if(d<DAYS)chrysalis(g,A.W/2,A.H*.44,s,d);else{g.save();g.globalAlpha=.5;chrysalis(g,A.W*.3,A.H*.44,s*.8,DAYS);g.restore();flyer(g,A.W*.64,A.H*.42,s*.75)}
 g.fillStyle='#d1d5db';g.fillRect(t.x,t.y+t.h*.35,t.w,t.h*.3);for(let k=0;k<=DAYS;k++){g.fillStyle=C.ink;g.fillRect(dayX(k)-1,t.y+t.h*.2,2,t.h*.6);if(k%2===0)B.word(String(k),dayX(k),t.y+t.h+12,10)}
 B.word('days',t.x+t.w,t.y-10,10,{al:'right',c:C.rim});const x=dayX(d);g.fillStyle=d>=DAYS?C.ok:C.sel;g.beginPath();g.arc(x,t.y+t.h/2,13,0,7);g.fill();
 tally(d>=DAYS?'✓ About 10 days of rebuilding, then a butterfly':`Day ${d} of ${DAYS}: keep going`,d>=DAYS)}
function setDay(v){const d=Math.max(0,Math.min(DAYS,Math.round(v)));if(d===M.day)return;M.day=d;M.seen=Math.max(M.seen,d);A.sound.tick();const ph=PHASE.find(p=>p[0]===d);if(ph)return say(ph[1]+(/[.!]$/.test(ph[1])?'':'.'));A.redraw();buttons()}
/* ---------- 5: who eats what ---------- */
function paintFood(){const g=A.ctx;banner('Who eats what?');
 EATERS.forEach((t,i)=>{const b=eater(i),done=M.fed2.includes(i),s=Math.min(b.w,b.h)*.6;B.tile(b,done?'#dcfce7':'#f9fafb',M.badE===i?'ko':M.hot===i?'sel':'');B.word(t,b.x+b.w/2,b.y+14,10,{w:b.w-8});
  const cx=b.x+b.w/2,cy=b.y+b.h*.55;if(i===0)crawler(g,cx,cy,s);if(i===1)flyer(g,cx,cy,s*.8);if(i>1)hopper(g,cx-s*.1,cy,s*(i===2?.6:.9),i===2?.15:1);
  if(done)B.word('Eats: '+FOODS[EAT[i]],cx,b.y+b.h-12,10,{b:700,c:C.ok,w:b.w-8})});
 FOODS.forEach((t,j)=>{if(M.used.includes(j))return;const b=dragged(j,foodCard(j));B.tile(b,'#fefce8',M.pick===j||(M.grab&&M.grab.i===j)?'sel':'');B.word(t,b.x+b.w/2,b.y+b.h/2,11,{w:b.w-8})});
 tally(M.fed2.length>=4?'✓ Different food for caterpillar and butterfly; the same for nymph and adult':`Fed: ${M.fed2.length} of 4`,M.fed2.length>=4)}
function serve(j,i){if(M.used.includes(j)||M.fed2.includes(i))return;M.pick=-1;if(FOODS[j]!==FOODS[EAT[i]]){M.badE=i;A.sound.miss();return say(slip(i===0?'milkweed':i===1?'tube':'hopfood'))}
 M.badE=-1;M.used.push(j);M.fed2.push(i);A.sound.pop();say(`${EATERS[i]}: ${FOODS[j].toLowerCase()}.`+(i===1?' It sips through a long tube. A caterpillar chews with jaws.':''))}
/* ---------- feedback that names the slip ---------- */
function slip(t,a){let m='Look again, then try.';
 if(t==='stretch')m='It has already eaten and grown. Its hard outer skin cannot stretch any more, so it must moult before it can grow again.';
 if(t==='notyet')m='Not yet. It moults when it has grown too big for its skin. Feed it first.';
 if(t==='pupalane')m='Grasshoppers have no pupa stage. The nymph just moults into an adult.';
 if(t==='catlane')m='A caterpillar grows into a butterfly, not a grasshopper.';
 if(t==='flylane')m='That is the adult butterfly. It goes at the end of the butterfly life cycle.';
 if(t==='nymphbf')m='A butterfly’s young is a caterpillar, a larva. It looks nothing like the adult. Nymphs belong to the grasshopper.';
 if(t==='hoplane')m='The adult grasshopper ends the grasshopper life cycle, not the butterfly’s.';
 if(t==='order')m=`Not yet. Next comes: ${a}.`;
 if(t==='haspupa')m='Its young becomes a pupa, so it has all 4 stages: complete metamorphosis.';
 if(t==='hasnymph')m='Its young is a nymph, and there is no pupa: incomplete metamorphosis.';
 if(t==='spider')m='A spider has 8 legs, so it is not an insect. Its babies look like tiny spiders and moult as they grow.';
 if(t==='isinsect')m='It has 6 legs: it is an insect. Look for the clue: a pupa, or a nymph?';
 if(t==='milkweed')m='This caterpillar chews leaves with its jaws. It has no tube for sipping nectar.';
 if(t==='tube')m='A butterfly has no jaws. It sips nectar through a long tube.';
 if(t==='hopfood')m='Grasshoppers, young and old, chew grass. A nymph eats the same food as its adult.';
 if(t==='nopupa')m='Incomplete metamorphosis has no pupa: egg, nymph, adult.';
 if(t==='allpupa')m='Only complete metamorphosis has a pupa. Grasshoppers never make one.';
 if(t==='colour')m='It moults because its hard skin cannot stretch. A new, bigger skin lets it grow.';
 if(t==='nymphlook')m='A nymph looks like a small adult, with legs and wing buds. A worm-like young is a larva.';
 if(t==='asleep')m='A pupa does not eat or move much, but inside it is busy: the body is taken apart and rebuilt.';
 if(t==='grow')m='Adult butterflies do not grow or moult. A small one is just a small adult.';
 if(t==='samefood')m='A caterpillar chews leaves. A butterfly sips nectar. Different food means they do not compete.';
 return m}
/* ---------- drawing, pointer and buttons ---------- */
function draw(){const k=room(),g=A.ctx;g.fillStyle=C.bg;g.fillRect(0,0,A.W,A.H);if(k==='quiz'){crawler(g,A.W*.25,A.H*.35,A.W*.25);flyer(g,A.W*.7,A.H*.33,A.W*.25);B.word('Challenge',A.W/2,A.H*.65,20);return}
 ({moult:paintMoult,cycle:paintCycle,sort:paintSort,pupa:paintPupa,food:paintFood})[k]();A.fx.draw(A.ctx)}
function down(p){const k=room(),hold=(i,x)=>{M.grab=Object.assign({i,x:p.x,y:p.y,x0:p.x,y0:p.y},x||{});A.redraw();return true};
 if(k==='moult'){const l=leafHome(),n=nymphAt();if(M.molts<MOULTS&&Math.hypot(p.x-l.x,p.y-l.y)<36)return hold(-1,{leaf:true});if(Math.hypot(p.x-n.x,p.y-n.y)<bodyS()*.6)return hold(-1,{bug:true})}
 if(k==='cycle'){const i=STAGES.findIndex((o,j)=>!M.built[o.l].includes(j)&&inside(p,stageCard(j)));if(i>=0)return hold(i);const l=[0,1].find(j=>inside(p,laneBox(j)));if(l!=null&&M.pick>=0)put(M.pick,l)}
 if(k==='sort'){const i=BUGS.findIndex((_,j)=>!(j in M.kind)&&inside(p,bugCard(j)));if(i>=0)return hold(i);const n=[0,1,2].find(j=>inside(p,kindBin(j)));if(n!=null&&M.pick>=0)file(M.pick,n)}
 if(k==='pupa'){const t=track();if(p.y>t.y-30&&p.y<t.y+t.h+30){setDay((p.x-t.x)/t.w*DAYS);return hold(-1,{day:true})}}
 if(k==='food'){const j=FOODS.findIndex((_,q)=>!M.used.includes(q)&&inside(p,foodCard(q)));if(j>=0)return hold(j);const i=[0,1,2,3].find(q=>inside(p,eater(q)));if(i!=null&&M.pick>=0)serve(M.pick,i)}
 return false}
function move(p){const h=M.grab;if(!h)return;h.x=p.x;h.y=p.y;const k=room();if(h.day)return setDay((p.x-track().x)/track().w*DAYS);
 M.hot=k==='cycle'?[0,1].find(j=>inside(p,laneBox(j))):k==='sort'?[0,1,2].find(j=>inside(p,kindBin(j))):k==='food'?[0,1,2,3].find(j=>inside(p,eater(j))):undefined;A.redraw()}
function up(p){const h=M.grab;if(!h)return;M.grab=null;M.hot=undefined;const k=room(),moved=Math.hypot(p.x-h.x0,p.y-h.y0)>12;
 if(h.day)return A.redraw();
 if(h.leaf){const n=nymphAt();if(Math.hypot(p.x-n.x,p.y-n.y)<bodyS()*.7)return feed();return say(moved?'Drop the leaf on the nymph to feed it.':'Drag the leaf onto the nymph.')}
 if(h.bug){if(Math.hypot(p.x-h.x0,p.y-h.y0)>A.W*.15)return moult();return say('Drag the nymph well away to pull it out of its old skin.')}
 if(k==='cycle'){const l=[0,1].find(j=>inside(p,laneBox(j)));if(l!=null&&moved)return put(h.i,l);if(!moved){M.pick=h.i;return say(`${STAGES[h.i].t} picked. Now tap a life cycle.`)}}
 if(k==='sort'){const n=[0,1,2].find(j=>inside(p,kindBin(j)));if(n!=null)return file(h.i,n);if(!moved){M.pick=h.i;return say(`${BUGS[h.i].t} picked. Now tap a group.`)}}
 if(k==='food'){const i=[0,1,2,3].find(j=>inside(p,eater(j)));if(i!=null)return serve(h.i,i);if(!moved){M.pick=h.i;return say(`${FOODS[h.i]} picked. Now tap who eats it.`)}}
 A.redraw()}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();M.test()}
function buttons(){if(!keys)return;keys.innerHTML='';const k=room(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},keys,t).onclick=f};
 if(k==='moult'&&M.molts<MOULTS){b('Feed it a leaf',feed);b('Moult: climb out of the old skin',moult)}
 if(k==='cycle')STAGES.forEach((o,i)=>{if(!M.built[o.l].includes(i)){b(`${o.t} → butterfly`,()=>put(i,0),`Put ${o.t} in the butterfly life cycle`);b(`${o.t} → grasshopper`,()=>put(i,1),`Put ${o.t} in the grasshopper life cycle`)}});
 if(k==='sort')BUGS.forEach((o,i)=>{if(!(i in M.kind))['Complete','Incomplete','Not an insect'].forEach((t,j)=>b(`${o.t}: ${t}`,()=>file(i,j),`${o.t}, ${o.c}: ${t}`))});
 if(k==='pupa'&&M.day<DAYS){b('+1 day',()=>setDay(M.day+1),`Next day, now day ${M.day}`);b('+3 days',()=>setDay(M.day+3))}
 if(k==='food'){const j=M.pick>=0&&!M.used.includes(M.pick)?M.pick:FOODS.findIndex((_,q)=>!M.used.includes(q));if(j>=0)EATERS.forEach((t,i)=>{if(!M.fed2.includes(i))b(`${FOODS[j]} → ${t}`,()=>serve(j,i),`Give ${FOODS[j]} to the ${t.toLowerCase()}`)})}}
function reset(){epoch++;for(const x in M)delete M[x];Object.assign(M,{molts:0,fed:false,tight:false,skins:[],built:[[],[]],bad:-1,pick:-1,kind:{},day:0,seen:0,fed2:[],used:[],badE:-1,grab:null,test:()=>{}})}
const passed=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(GOT[i]+A.reveal(i))};
function enter(i,ok){reset();say(BRIEF[i]);M.test=passed(i,ok)}
function demo(i,acts,ms){steps[i].go();const e0=epoch;acts.forEach((f,j)=>setTimeout(()=>{if(e0===epoch)f()},ms*(j+1)))}
const steps=[
{h:'Grow by moulting',p:'An insect has a hard outer skin. Feed the young grasshopper, then help it out of its old skin. Do it 5 times.',
 predict:{q:'A young grasshopper eats and grows. What happens to its hard outer skin?',opts:['It stretches as it grows','It splits, and a new, bigger skin takes over'],ans:1},task:'Feed it and moult it 5 times',
 show:()=>demo(0,Array.from({length:10},(_,j)=>j%2?moult:feed),320),go:()=>enter(0,()=>M.molts>=MOULTS)},
{h:'Two life cycles',p:'A butterfly and a grasshopper both start as eggs. Drag each stage into the next box of its own life cycle.',
 predict:{q:'Does every insect have a pupa stage?',opts:['Yes, all insects do','No, some go from nymph straight to adult'],ans:1},task:'Build both life cycles',
 show:()=>demo(1,[0,1,2,3,4].map(i=>()=>put(i,STAGES[i].l)),500),go:()=>enter(1,()=>M.built[0].length+M.built[1].length>=5)},
{h:'Which kind?',p:'Read the clue about each animal’s young. A pupa means complete. A nymph means incomplete.',task:'Sort all 7',
 show:()=>demo(2,BUGS.map((o,i)=>()=>file(i,o.k)),380),go:()=>enter(2,()=>Object.keys(M.kind).length>=7)},
{h:'Inside the pupa',p:'A chrysalis hangs still for about 10 days. Drag the marker along the days to see inside.',
 predict:{q:'Is a pupa resting, doing nothing?',opts:['Yes, it is asleep','No, its body is being rebuilt'],ans:1},task:'Go to day 10',
 show:()=>demo(3,[1,4,8,10].map(d=>()=>setDay(d)),600),go:()=>enter(3,()=>M.day>=DAYS)},
{h:'Who eats what?',p:'Why change so completely? Drag each food to the animal that eats it.',
 predict:{q:'Do a caterpillar and a butterfly eat the same food?',opts:['Yes, the same','No, different food'],ans:1},task:'Feed all 4',
 show:()=>demo(4,[0,1,2,3].map(i=>()=>serve(i,i)),500),go:()=>enter(4,()=>M.fed2.length>=4)},
{h:'Challenge',p:'',go:()=>{reset();pose()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>M.test()});
function pose(){qq++;const Q=QZ[qq%QZ.length],opts=[[Q.a,''],...Q.o],r=qq%3,list=opts.slice(r).concat(opts.slice(0,r));
 quizBox.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Pick an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quizBox.querySelector('.fl-pick');list.forEach(([t,s])=>{c.el('button',{type:'button',class:'lbtn'},row,t).onclick=()=>score(s,Q)});c.say('Challenge: '+Q.q);A.redraw()}
function score(s,Q){quizBox.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=quizBox.querySelector('.fl-fb'),why=s?slip(s):'';
 if(!s)A.win();else A.sound.miss();fb.innerHTML=(s?'✗ '+why:'✓ '+Q.a+'.')+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=pose;c.say(s?why:'Yes.')}
FK.shell(c,{steps,ratio:.62,tall:1.3,draw,onStep:X=>{quizBox.hidden=X.step!==5;keys.hidden=X.step===5;buttons()},
 init:X=>{A=X;B=brush(A,C);const w=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Metamorphosis lab buttons'},w);quizBox=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}}).start()})})();
