/* Flagship – rainforest insects (ages 5–7; KS1 science 'living things and their habitats'): count a rainforest's
   animals and find insects are the most, run a leaf-cutter ant fungus farm, hide a blue morpho from a bird, measure
   rainforest insects against a child's hand, and match insects to their jobs. Data and pictures: raininsect_art.js. */
(()=>{const R=RAININSECT;
VIS.reg('flagraininsect',c=>{let A,P,ctl,chal,qn=-1,epoch=0;const S={};c.fig.classList.add('young');
const part=()=>['count','farm','morpho','ruler','jobs','chal'][A.step];
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function bg(){const g=A.ctx;g.fillStyle=A.col.dark?'#0b1220':'#ecfdf5';g.fillRect(0,0,A.W,A.H)}
/* ---------- 1. who is there most of? (tap to count) ---------- */
let TILE=[];
const tally=()=>{const n=[0,0];S.ct.seen.forEach(i=>n[R.BEASTS[i].g]++);return n};
function countOne(i){const s=S.ct;if(s.seen.includes(i))return;s.seen.push(i);const B=R.BEASTS[i],n=tally();A.sound.pop();
 const left=R.BEASTS.length-s.seen.length;say((B.why||`${B.t}: ${B.g?'not an insect':'an insect, with 6 legs'}.`)+` Insects ${n[0]}, others ${n[1]}.`+(left?` ${left} to go.`:''),false)}
function nextUncounted(){return R.BEASTS.findIndex((_,i)=>!S.ct.seen.includes(i))}
function drawCount(){const s=S.ct,n=tally(),all=s.seen.length>=R.BEASTS.length,t=P.banner(all?R.DONE[0]:`Tap each animal to count it. ${s.seen.length} of ${R.BEASTS.length}.`,all?'ok':'',S.note,S.bad);
 const g=A.ctx,barH=Math.min(86,A.H*.17),cols=5,rows=3,gap=6,top=t,tw=(A.W-16-gap*(cols-1))/cols,th=(A.H-top-barH-14-gap*(rows-1))/rows;
 TILE=R.BEASTS.map((_,i)=>({i,x:8+(i%cols)*(tw+gap),y:top+Math.floor(i/cols)*(th+gap),w:tw,h:th}));
 TILE.forEach(r=>{const B=R.BEASTS[r.i],on=s.seen.includes(r.i);P.card(r,'',{dim:on,ok:on&&!B.g});P.beast(B.k,r.x+r.w/2,r.y+r.h/2,Math.min(r.h*.85,r.w*.6),true);
  if(on){g.font=`800 ${P.sz(12)}${P.F}`;g.fillStyle=B.g?'#334155':P.OK;g.textAlign='right';g.textBaseline='top';g.fillText(B.g?'other':'insect',r.x+r.w-5,r.y+4)}});
 const by=A.H-barH-4,lab=['Insects','Other animals'],bw=(A.W-16)*.62/R.BEASTS.length;g.font=`800 ${P.sz(13)}${P.F}`;g.textBaseline='middle';
 [0,1].forEach(k=>{const y=by+k*barH/2+4,h=barH/2-8;g.fillStyle=P.fg();g.textAlign='left';g.fillText(lab[k],8,y+h/2);const x0=8+A.W*.3;g.fillStyle=k?'#64748b':'#15803d';g.fillRect(x0,y,Math.max(2,n[k]*bw),h);
  g.fillStyle=P.fg();g.fillText(String(n[k]),x0+n[k]*bw+6,y+h/2)})}
/* ---------- 2. leaf-cutter ant farm (drag leaves home) ---------- */
let LEAF=null,NEST=null,FEED=[];
function deliver(){const s=S.fm;if(s.home>=3)return;s.home++;s.drag=null;A.sound.pop();
 say(s.home<3?`Leaf piece ${s.home} is home. The ants chew it up and the fungus grows on it.`:'Three leaf pieces are home and the fungus garden is big. Now: what do the baby ants eat?',false)}
function feed(k){const s=S.fm;if(s.home<3||s.fed)return;if(k==='leaf'){s.bad='leaf';A.sound.miss();return say('Leaf-cutter ants cannot eat the leaves. The leaves are food for the fungus. Try again.',true)}
 s.fed=true;s.bad='';A.sound.pop();say('Yes! The ants eat the fungus. The leaves feed the fungus, and the fungus feeds the ants.',false)}
function drawFarm(){const s=S.fm,fin=s.fed,t=P.banner(fin?R.DONE[1]:s.home<3?`Drag a leaf piece to the nest. ${s.home} of 3 home.`:'Feed the baby ants. Tap what they eat.',fin?'ok':s.bad?'no':'',S.note,S.bad);
 const g=A.ctx,fh=Math.min(56,A.H*.12),gy=A.H-fh-16,tx=A.W*.16;
 g.fillStyle=P.dk()?'#3f2a14':'#d6b88a';g.fillRect(0,gy-10,A.W,10);g.fillStyle='#57534e';g.fillRect(tx-8,t+20,16,gy-t-30);g.fillStyle='#15803d';g.beginPath();g.ellipse(tx,t+30,A.W*.14,Math.min(50,(gy-t)*.2),0,0,7);g.fill();
 g.strokeStyle=P.dk()?'#a8a29e':'#78350f';g.setLineDash([6,6]);g.lineWidth=2;g.beginPath();g.moveTo(tx,gy-14);g.lineTo(A.W*.72,gy-14);g.stroke();g.setLineDash([]);
 NEST={x:A.W*.62,y:gy-(gy-t)*.62,w:A.W*.36,h:(gy-t)*.62-12};g.fillStyle=P.dk()?'#44403c':'#a16207';A.paint.rrect(NEST.x,NEST.y,NEST.w,NEST.h,18);g.fill();
 g.fillStyle='#f5f5f4';const grow=s.home;for(let i=0;i<4+grow*5;i++){g.beginPath();g.arc(NEST.x+NEST.w*(.2+((i*37)%60)/100),NEST.y+NEST.h*(.45+((i*53)%40)/100),5+grow,0,7);g.fill()}
 g.font=`800 ${P.sz(13)}${P.F}`;g.fillStyle='#ffffff';g.textAlign='center';g.textBaseline='top';g.fillText('Ant nest',NEST.x+NEST.w/2,NEST.y+6);g.fillText(`fungus garden`,NEST.x+NEST.w/2,NEST.y+6+P.sz(16));
 for(let i=0;i<3;i++)P.beast('ant',tx+A.W*(.12+i*.13),gy-20,30,true);
 if(s.home<3){const d=s.drag,sz=Math.min(64,A.W*.16);LEAF={x:d?d.x-sz/2:tx+A.W*.05,y:d?d.y-sz/2:t+44,w:sz,h:sz};g.fillStyle='#22c55e';g.strokeStyle=d?'#1d4ed8':'#14532d';g.lineWidth=3;g.beginPath();
  g.moveTo(LEAF.x+sz*.1,LEAF.y+sz*.9);g.quadraticCurveTo(LEAF.x,LEAF.y,LEAF.x+sz*.9,LEAF.y+sz*.1);g.quadraticCurveTo(LEAF.x+sz,LEAF.y+sz*.9,LEAF.x+sz*.1,LEAF.y+sz*.9);g.fill();g.stroke()}else LEAF=null;
 FEED=s.home>=3?[{k:'leaf',l:'Leaves',x:8,y:A.H-fh-6,w:A.W/2-12,h:fh},{k:'fungus',l:'Fungus',x:A.W/2+4,y:A.H-fh-6,w:A.W/2-12,h:fh}]:[];
 FEED.forEach(r=>P.card(r,r.l,{n:15,no:s.bad===r.k,ok:fin&&r.k==='fungus'}))}
/* ---------- 3. blue morpho: flash and hide ---------- */
let BFLY=null;
function wings(open){const s=S.mo;if(s.round>=3)return;s.open=open;
 if(s.phase==='fly'){if(!open){s.bad=true;A.sound.miss();return say('With shut wings it cannot fly. Open them to fly to the flowers.',true)}
  s.phase='bird';s.bad=false;A.sound.pop();return say('Flash! The bright blue wings flap as it flies to a flower. Oh no, a hungry bird is coming!',false)}
 if(open){s.bad=true;A.sound.miss();return say('The bird can see that bright blue! Shut the wings to hide the blue.',true)}
 s.round++;s.phase='fly';s.bad=false;A.sound.pop();say(`Wings shut: brown with eye spots, like a dead leaf. The bird flies past. Safe ${s.round} of 3.`+(s.round<3?' Fly again.':''),false)}
function drawMorpho(){const s=S.mo,fin=s.round>=3,t=P.banner(fin?R.DONE[2]:s.phase==='fly'?'Open the wings to fly to the flowers.':'A bird is coming! Hide the morpho.',fin?'ok':s.bad?'no':'',S.note,S.bad);
 const g=A.ctx,bh=Math.min(56,A.H*.12),mid=t+(A.H-bh-14-t)/2,sz=Math.min(A.W*.5,(A.H-bh-14-t)*.75);
 g.strokeStyle='#78350f';g.lineWidth=10;g.beginPath();g.moveTo(0,mid+sz*.42);g.lineTo(A.W,mid+sz*.36);g.stroke();
 g.fillStyle='#ec4899';[.85,.92].forEach(f=>{g.beginPath();g.arc(A.W*f,mid+sz*.3,10,0,7);g.fill()});
 BFLY={x:A.W/2-sz/2,y:mid-sz/2,w:sz,h:sz};P.beast('morpho',A.W/2,mid,sz,s.open);
 if(s.phase==='bird'&&!fin){const bx=A.W*.12,by=t+20;g.fillStyle='#334155';g.beginPath();g.ellipse(bx,by+10,26,14,0,0,7);g.fill();g.beginPath();g.arc(bx+24,by+2,10,0,7);g.fill();g.fillStyle='#f59e0b';g.beginPath();g.moveTo(bx+33,by);g.lineTo(bx+46,by+4);g.lineTo(bx+33,by+8);g.fill()}
 g.font=`700 ${P.sz(13)}${P.F}`;g.fillStyle=P.fg();g.textAlign='center';g.textBaseline='bottom';g.fillText(s.open?'Wings open: bright blue on top':'Wings shut: brown underneath',A.W/2,A.H-bh-14)}
/* ---------- 4. how big? (measure on a ruler) ---------- */
let CARDS=[],RULER=null;
function measure(i){const s=S.ru;if(s.on.includes(i))return;s.on.push(i);s.drag=null;A.sound.pop();const Z=R.SIZES[i];
 say(Z.say+(s.on.length<4?' Next insect.':''),false)}
function drawRuler(){const s=S.ru,fin=s.on.length>=4,t=P.banner(fin?R.DONE[3]:`Put each insect on the ruler. ${s.on.length} of 4 measured.`,fin?'ok':'',S.note,S.bad);
 const g=A.ctx,ch=Math.min(70,A.H*.14),cw=(A.W-16-18)/4;CARDS=R.SIZES.map((Z,i)=>{const d=s.drag&&s.drag.i===i?s.drag:null;return{i,x:d?d.x-cw/2:8+i*(cw+6),y:d?d.y-ch/2:t,w:cw,h:ch}});
 const top=t+ch+12,cm=(A.W-40)/20;RULER={x:20,y:top,w:A.W-40,h:A.H-top-8};
 g.fillStyle=P.dk()?'#422006':'#fef3c7';A.paint.rrect(RULER.x-8,A.H-46,RULER.w+16,36,6);g.fill();g.strokeStyle='#92400e';g.lineWidth=1.5;g.stroke();g.fillStyle=P.dk()?'#fde68a':'#78350f';g.font=`700 ${P.sz(11)}${P.F}`;g.textAlign='center';g.textBaseline='bottom';
 for(let k=0;k<=20;k++){const x=RULER.x+k*cm;g.fillRect(x-.75,A.H-46,1.5,k%5?8:14);if(k%5===0)g.fillText(String(k),x,A.H-12)}g.textAlign='right';g.fillText('cm',RULER.x+RULER.w+6,A.H-28);
 const lane=(A.H-56-top)/5;
 const hy=top+lane*.5;g.fillStyle=P.dk()?'#fcd34d':'#fbbf24';g.strokeStyle='#92400e';g.lineWidth=2;A.paint.rrect(RULER.x,hy-lane*.3,R.HAND*cm*.8,lane*.6,lane*.3);g.fill();g.stroke();
 for(let f=0;f<4;f++){A.paint.rrect(RULER.x+R.HAND*cm*.72,hy-lane*.3+f*lane*.15,R.HAND*cm*.28,lane*.13,lane*.06);g.fill();g.stroke()}
 g.fillStyle=P.fg();g.font=`800 ${P.sz(12)}${P.F}`;g.textAlign='left';g.textBaseline='middle';g.fillText(`hand, ${R.HAND} cm`,RULER.x+R.HAND*cm+6,hy);
 g.strokeStyle=P.dk()?'#fcd34d':'#b45309';g.setLineDash([5,5]);g.beginPath();g.moveTo(RULER.x+R.HAND*cm,top);g.lineTo(RULER.x+R.HAND*cm,A.H-46);g.stroke();g.setLineDash([]);
 s.on.forEach((i,j)=>{const Z=R.SIZES[i],y=top+lane*(j+1.5),len=Z.cm*cm;g.fillStyle=Z.cm>R.HAND?'#15803d':'#0369a1';g.fillRect(RULER.x,y+lane*.18,len,6);
  P.beast(Z.k,RULER.x+len,y+lane*.2,lane*.6,true);const lb=`${Z.t}: ${Z.cm} cm`+(Z.cm>R.HAND?', past the hand':'');g.font=`800 ${P.sz(12)}${P.F}`;
  g.fillStyle=P.dk()?'#0b1220':'#ecfdf5';g.fillRect(RULER.x-2,y-lane*.18-P.sz(12)*.65,g.measureText(lb).width+4,P.sz(12)*1.3);g.fillStyle=P.fg();g.textAlign='left';g.textBaseline='middle';g.fillText(lb,RULER.x,y-lane*.18)});
 CARDS.forEach(r=>{if(s.on.includes(r.i))return;const Z=R.SIZES[r.i];P.card(r,Z.t,{n:11,top:1,sel:!!(s.drag&&s.drag.i===r.i)});P.beast(Z.k,r.x+r.w/2,r.y+r.h*.35,Math.min(r.h*.5,r.w*.5),true)})}
/* ---------- 5. insect jobs ---------- */
let WK=[];
function assign(w){const s=S.jb,J=R.JOBS[s.i];if(!J)return;if(w!==J.a){s.bad=w;A.sound.miss();return say(`Not this one. ${R.WWHY[w]}`,true)}
 s.i++;s.bad=-1;A.sound.pop();say(R.WWHY[w]+(s.i<3?' Next job.':''),false)}
function drawJobs(){const s=S.jb,J=R.JOBS[s.i],t=P.banner(J?`Job ${s.i+1} of 3: ${J.t}. Who does it?`:R.DONE[4],J?(s.bad>=0?'no':''):'ok',S.note,S.bad);
 const g=A.ctx,gap=8,w=(A.W-16-gap*2)/3,h=A.H-t-10;WK=R.WORKERS.map((_,i)=>({i,x:8+i*(w+gap),y:t,w,h}));
 WK.forEach(r=>{const W=R.WORKERS[r.i],done=R.JOBS.slice(0,s.i).some(x=>x.a===r.i);P.card(r,W.t,{n:13,top:1,ok:done,no:s.bad===r.i});
  if(W.k==='hercules'){g.fillStyle='#fef9c3';g.strokeStyle='#a16207';g.lineWidth=2;g.beginPath();g.arc(r.x+r.w/2,r.y+r.h*.38,Math.min(r.w,r.h)*.22,Math.PI*.2,Math.PI*1.8);g.lineWidth=Math.min(r.w,r.h)*.14;g.stroke();g.fillStyle='#92400e';g.beginPath();g.arc(r.x+r.w/2+Math.min(r.w,r.h)*.2,r.y+r.h*.3,Math.min(r.w,r.h)*.07,0,7);g.fill()}
  else P.beast(W.k,r.x+r.w/2,r.y+r.h*.38,Math.min(r.w*.8,r.h*.5),true)})}
/* ---------- wiring ---------- */
function draw(){bg();const m=part();if(m==='chal'){P.banner('Challenge: rainforest insects','ok');['ant','morpho','hercules','bee'].forEach((k,i)=>P.beast(k,A.W*(.2+i*.2),A.H*.55,Math.min(A.W*.16,90),true));return}
 ({count:drawCount,farm:drawFarm,morpho:drawMorpho,ruler:drawRuler,jobs:drawJobs})[m]();A.fx.draw(A.ctx)}
function down(p){const m=part();
 if(m==='count'){const r=TILE.find(r=>hit(p,r));if(r)countOne(r.i);return false}
 if(m==='farm'){if(LEAF&&hit(p,LEAF)){S.fm.drag={x:p.x,y:p.y};return true}const r=FEED.find(r=>hit(p,r));if(r)feed(r.k);return false}
 if(m==='morpho'){if(hit(p,BFLY))wings(!S.mo.open);return false}
 if(m==='ruler'){const r=CARDS.find(r=>!S.ru.on.includes(r.i)&&hit(p,r));if(r){S.ru.drag={i:r.i,x:p.x,y:p.y};return true}return false}
 if(m==='jobs'){const r=WK.find(r=>hit(p,r));if(r)assign(r.i);return false}return false}
function move(p){const d=part()==='farm'?S.fm.drag:part()==='ruler'?S.ru.drag:null;if(d){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const m=part();
 if(m==='farm'&&S.fm.drag){S.fm.drag=null;if(hit(p,NEST))deliver();else{A.redraw();say('Carry the leaf all the way to the ant nest.',false)}}
 if(m==='ruler'&&S.ru.drag){const i=S.ru.drag.i;S.ru.drag=null;if(p.y>RULER.y-10)measure(i);else{A.redraw();say('Drop the insect on the ruler.',false)}}}
function fresh(){epoch++;for(const k in S)delete S[k];Object.assign(S,{ct:{seen:[]},fm:{home:0,drag:null,fed:false,bad:''},mo:{round:0,phase:'fly',open:false,bad:false},
 ru:{on:[],drag:null},jb:{i:0,bad:-1},note:null,bad:false,check:()=>{}})}
function say(t,bad){S.note=t;S.bad=!!bad;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.check()}
const finish=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(R.DONE[i]+A.reveal(i))};
function enter(i,ok){fresh();c.say(R.DESC[i]);A.cv.setAttribute('aria-label',R.DESC[i]);S.check=finish(i,ok);buttons();A.redraw()}
function demo(i,list){steps[i].go();const e=epoch;let t=0;list.forEach(([ms,f])=>{t+=ms;setTimeout(()=>{if(e===epoch)f()},t)})}
function buttons(){if(!ctl)return;ctl.innerHTML='';const m=part(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(m==='count'){const n=nextUncounted();if(n>=0)B('Count the next animal',()=>countOne(n),`Count the next animal: ${R.BEASTS[n].t}`)}
 if(m==='farm'&&!S.fm.fed){if(S.fm.home<3)B('🍃 Carry a leaf home',deliver,'Carry a leaf piece to the ant nest');else{B('Feed them leaves',()=>feed('leaf'));B('Feed them fungus',()=>feed('fungus'))}}
 if(m==='morpho'&&S.mo.round<3){B('Open the wings',()=>wings(true));B('Shut the wings',()=>wings(false))}
 if(m==='ruler')R.SIZES.forEach((Z,i)=>{if(!S.ru.on.includes(i))B(`📏 ${Z.t}`,()=>measure(i),`Measure the ${Z.t} on the ruler`)});
 if(m==='jobs'&&R.JOBS[S.jb.i])R.WORKERS.forEach((W,i)=>B(W.t,()=>assign(i),`${W.t}: ${R.JOBS[S.jb.i].t}`))}
const steps=[
{h:'Who is there most of?',p:R.TXT[0],predict:{q:'Which animals are there most of in a rainforest?',opts:['Big ones, like jaguars and monkeys','Insects'],ans:1},task:'Count all 15 animals',
 show:()=>demo(0,R.BEASTS.map((_,i)=>[180,()=>countOne(i)])),go:()=>enter(0,()=>S.ct.seen.length>=R.BEASTS.length)},
{h:'Leaf-cutter ant farmers',p:R.TXT[1],predict:{q:'What do leaf-cutter ants eat?',opts:['The leaves they cut','A fungus they grow on the leaves'],ans:1},task:'Carry 3 leaves home, then feed the ants',
 show:()=>demo(1,[[400,deliver],[400,deliver],[400,deliver],[600,()=>feed('fungus')]]),go:()=>enter(1,()=>S.fm.fed)},
{h:'The blue morpho hides',p:R.TXT[2],predict:{q:'What colour is a blue morpho under its wings?',opts:['Bright blue all over','Brown, with eye spots'],ans:1},task:'Keep the morpho safe 3 times',
 show:()=>demo(2,[0,1,2].flatMap(()=>[[450,()=>wings(true)],[450,()=>wings(false)]])),go:()=>enter(2,()=>S.mo.round>=3)},
{h:'How big are they?',p:R.TXT[3],predict:{q:'Can a beetle be longer than your hand?',opts:['No, beetles are always tiny','Yes, some beetles can'],ans:1},task:'Measure all 4 insects',
 show:()=>demo(3,[0,1,2,3].map(i=>[400,()=>measure(i)])),go:()=>enter(3,()=>S.ru.on.length>=4)},
{h:'Insect jobs',p:R.TXT[4],task:'Match all 3 jobs',
 show:()=>demo(4,R.JOBS.map(J=>[450,()=>assign(J.a)])),go:()=>enter(4,()=>S.jb.i>=3)},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
function why(t){let m='Insects are the animals there are most of in a rainforest, and each kind has its own way of living.';
 if(t==='big')m='Big animals are easy to spot, but there are far fewer of them. Insects are tiny, and there are millions of them.';
 if(t==='leaf')m='Leaf-cutter ants do not eat the leaves. They chew them to feed a fungus, and then the ants eat the fungus.';
 if(t==='roof')m='The leaves are not for a roof. The ants chew them into mush, and their fungus garden grows on it.';
 if(t==='blue')m='Only the top of the wings is blue. Underneath they are brown with eye spots, so shut wings help it hide.';
 if(t==='tiny')m='Many beetles are small, but a Hercules beetle can be 17 cm long. That is longer than your hand.';
 if(t==='spider')m='A spider is a minibeast, but not an insect. It has 8 legs. Insects have 6 legs.';
 if(t==='add')m='Start at 4 and count on 3 more: 5, 6, 7. That makes 7 ants.';
 return m}
function ask(){qn++;const Q=R.QS[qn%R.QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function mark(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.25,draw,onStep:X=>{chal.hidden=X.step!==5;ctl.hidden=X.step===5;buttons()},
 init:X=>{A=X;P=R.SHAPES(A);const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Rainforest insects lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});buttons()}}).start()})})();
