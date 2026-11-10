/* Flagship: Rainforest plants (ages 5-7; National Curriculum in England Year 1 plants: identify and name a variety of
   plants, and Year 2 living things and their habitats: plants are suited to where they live). Grow a kapok up past the
   treetops to the sunlight, climb a liana up a trunk, find an orchid a home on a branch with no soil, make a leaf with a
   drip tip that sheds rain, and match clues to five rainforest plants. Not flagrflayer (layers) or flagrfwhat. */
(()=>{
VIS.reg('flagrfplant',c=>{let A,pad,quizBox,qi=-1,epoch=0;const M={};c.fig.classList.add('young');
const INK='#0f172a',YES='#047857',NO='#b91c1c',SUN='#facc15',LEAF='#15803d',LEAF2='#166534',BARK='#78350f',SHADE='#14532d',FLOOR='#1c1917',SKYC='#bae6fd',RAIN='#38bdf8',PINK='#db2777',TAU=Math.PI*2;
const PL=['kapok tree','liana','orchid','giant water lily','Brazil nut tree'];
const CLUE=[['I am a giant tree. I poke out above all the other trees.',0],['I am a vine. I climb up a tree to get to the light.',1],['I grow on a branch, with no soil. My roots soak up the rain.',2],
 ['My big round leaf floats on the river. It can be wider than a bed is long.',3],['My nuts grow inside a hard, round shell, as big as a ball.',4]];
const now=()=>['grow','vine','orchid','drip','who','chal'][A.step];
const lim=(v,a,b)=>v<a?a:v>b?b:v;
function pill(t,x,y,o){o=o||{};const g=A.ctx;let f=o.f||(A.narrow?14:16);g.font=`800 ${f}px system-ui,sans-serif`;let w=g.measureText(t).width+18;
 while(w>A.W-8&&f>10){f--;g.font=`800 ${f}px system-ui,sans-serif`;w=g.measureText(t).width+18}const h=f+13,l=lim(x-w/2,4,A.W-w-4);
 g.fillStyle='#ffffff';A.paint.rrect(l,y-h/2,w,h,10);g.fill();g.lineWidth=o.ok||o.no?3:1.5;g.strokeStyle=o.ok?YES:o.no?NO:'#64748b';g.stroke();
 g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,l+w/2,y+1)}
const GY=()=>A.H*.9,CAN=()=>A.H*.42;
function blob(x,y,r,col){const g=A.ctx;g.fillStyle=col;g.beginPath();g.arc(x,y,r,0,TAU);g.arc(x-r*.8,y+r*.2,r*.7,0,TAU);g.arc(x+r*.8,y+r*.2,r*.7,0,TAU);g.fill()}
/* the forest: bright sky above the treetops, deep shade below them */
function forest(gap){const g=A.ctx,gy=GY(),cy=CAN();g.fillStyle=SKYC;g.fillRect(0,0,A.W,cy);g.fillStyle=SHADE;g.fillRect(0,cy,A.W,gy-cy);g.fillStyle=FLOOR;g.fillRect(0,gy,A.W,A.H-gy);
 g.fillStyle=SUN;g.beginPath();g.arc(A.W*.9,A.H*.08,A.narrow?16:20,0,TAU);g.fill();
 for(let i=0;i<7;i++){const x=A.W*(i+.5)/7;if(gap&&Math.abs(x-gap)<A.W*.09)continue;g.fillStyle=BARK;g.fillRect(x-4,cy,8,gy-cy);blob(x,cy,A.W*.07,i%2?LEAF:LEAF2)}}
function light(y){return y<CAN()-A.W*.05?'full sun':y<CAN()+A.H*.08?'some sun':'dark shade'}
/* step 0: a kapok grows up to the light */
function drawGrow(){const K=M.k,g=A.ctx,gy=GY(),x=A.W*.5;forest(x);const top=gy-K.h*(gy-A.H*.12);
 g.fillStyle=BARK;g.fillRect(x-7,top,14,gy-top);blob(x,top,A.W*.06,'#22c55e');const m=Math.round(K.h*60);
 pill(`Kapok: ${m} metres · ${light(top)}`,A.W/2,A.H*.06,{ok:K.done});pill('treetops',A.W*.12,CAN()+A.H*.1,{f:11})}
function grow(h,quiet){const K=M.k;K.h=lim(h,.1,1);const top=GY()-K.h*(GY()-A.H*.12);if(light(top)==='full sun')K.done=1;A.sound.tick();if(quiet)return A.redraw();growMsg()}
function growMsg(){const K=M.k,t=light(GY()-K.h*(GY()-A.H*.12)),m=Math.round(K.h*60);say(t==='full sun'?`${m} metres. The kapok pokes out above the other trees into full sun. It grew so tall to reach the light.`:
 t==='some sun'?`${m} metres. Its leaves are in the treetops. Other leaves still shade it.`:`${m} metres. Down here it is dark. The other trees take the light.`)}
/* step 1: a liana climbs */
function drawVine(){const V=M.v,g=A.ctx,gy=GY(),x=A.W*.36;forest(x);g.fillStyle=BARK;g.fillRect(x-9,A.H*.15,18,gy-A.H*.15);blob(x,A.H*.18,A.W*.08,LEAF);
 const top=gy-V.h*(gy-A.H*.14);g.strokeStyle='#4ade80';g.lineWidth=4;g.beginPath();
 if(V.alone){g.moveTo(A.W*.7,gy);for(let i=0;i<=20;i++)g.lineTo(A.W*.7+i*A.W*.012,gy-6-Math.sin(i*.9)*5);g.stroke();pill('No tree: it flops on the floor',A.W*.72,gy-A.H*.12,{f:11,no:1})}
 else{for(let i=0;i<=40;i++){const y=gy-(gy-top)*i/40;g.lineTo(x+Math.sin(i*.9)*14,y)}g.stroke();g.fillStyle='#4ade80';for(let i=4;i<=40;i+=6){const y=gy-(gy-top)*i/40;g.beginPath();g.ellipse(x+Math.sin(i*.9)*14+8,y,7,4,.5,0,TAU);g.fill()}}
 pill(V.alone?'Liana with no tree':`Liana · ${light(top)}`,A.W/2,A.H*.06,{ok:V.done})}
function climb(h,quiet){const V=M.v;V.alone=0;V.h=lim(h,.05,1);if(light(GY()-V.h*(GY()-A.H*.14))==='full sun')V.done=1;A.sound.tick();if(quiet)return A.redraw();vineMsg()}
function vineMsg(){const V=M.v,t=light(GY()-V.h*(GY()-A.H*.14));say(V.alone?'With nothing to hold on to, the thin liana stem cannot stand up. It lies on the dark floor.':
 t==='full sun'?'The liana has climbed the tree all the way to the sunlight. Its roots are still in the ground.':`The liana winds up the trunk. Its leaves are in ${t}. Keep climbing.`)}
function alone(){M.v.alone=1;A.sound.miss();vineMsg()}
/* step 2: an orchid finds a home */
const SPOT=[['forest floor',.18,.84,'Too dark down here, and the orchid gets lost in the rotting leaves.'],['high branch',.62,.3,'Yes. Up on a branch there is light and rain. Its roots hold the bark and soak up rain. It does not hurt the tree.'],['river',.82,.86,'Under the river its roots would drown. It needs air and light.']];
function drawOrchid(){const O=M.or,g=A.ctx,gy=GY();forest(0);g.fillStyle=BARK;g.fillRect(A.W*.42,A.H*.32,A.W*.32,10);g.fillStyle=RAIN;g.fillRect(A.W*.68,gy-4,A.W*.32,A.H-gy+4);
 SPOT.forEach(([n,fx,fy],i)=>{const x=A.W*fx,y=A.H*fy;g.strokeStyle=O.pick===i?(i===1?YES:NO):'#ffffff';g.setLineDash(O.pick===i?[]:[5,5]);g.lineWidth=3;g.beginPath();g.arc(x,y,A.narrow?26:30,0,TAU);g.stroke();g.setLineDash([]);pill(n,x,y+(A.narrow?38:44),{f:11})});
 const p=O.drag?O.p:O.pick>=0?{x:A.W*SPOT[O.pick][1],y:A.H*SPOT[O.pick][2]}:{x:A.W*.5,y:A.H*.62};flower(p.x,p.y);
 if(O.pick===1){g.strokeStyle=RAIN;g.lineWidth=2;for(let i=0;i<6;i++){const x=A.W*(.52+i*.04);g.beginPath();g.moveTo(x,A.H*.12);g.lineTo(x-3,A.H*.2);g.stroke()}}
 pill(O.pick===1?'Orchid on a branch':'Where can the orchid live?',A.W/2,A.H*.06,{ok:O.pick===1})}
function flower(x,y){const g=A.ctx;g.fillStyle=PINK;for(let i=0;i<5;i++){const a=i/5*TAU;g.beginPath();g.ellipse(x+Math.cos(a)*9,y+Math.sin(a)*9,9,6,a,0,TAU);g.fill()}g.fillStyle='#fde047';g.beginPath();g.arc(x,y,5,0,TAU);g.fill();
 g.strokeStyle='#e5e7eb';g.lineWidth=2;for(let i=-1;i<=1;i++){g.beginPath();g.moveTo(x+i*5,y+10);g.lineTo(x+i*9,y+22);g.stroke()}}
function place(i){const O=M.or;O.pick=i;O.drag=0;if(i===1){O.done=1;A.sound.pop()}else A.sound.miss();say(SPOT[i][3])}
/* step 3: a drip tip */
function drawDrip(){const D=M.d,g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#dcfce7',A.col.dark?.1:.7);g.fillRect(0,0,A.W,A.H);const cx=A.W*.42,cy=A.H*.5,rx=A.W*.22,ry=A.H*.18,tip=rx*(.05+D.t*1.1);
 g.fillStyle=LEAF;g.beginPath();g.moveTo(cx-rx,cy);g.quadraticCurveTo(cx,cy-ry*2,cx+rx,cy-ry*.1);g.lineTo(cx+rx+tip,cy+tip*.35);g.lineTo(cx+rx,cy+ry*.1);g.quadraticCurveTo(cx,cy+ry*2,cx-rx,cy);g.fill();
 g.strokeStyle='#bbf7d0';g.lineWidth=2;g.beginPath();g.moveTo(cx-rx,cy);g.lineTo(cx+rx+tip*.9,cy+tip*.3);g.stroke();
 const wet=D.rain?lim(1-D.t/.6,0,1):0;if(wet>0){g.fillStyle='rgba(56,189,248,.85)';g.beginPath();g.ellipse(cx,cy,rx*.6*wet+4,ry*.45*wet+3,0,0,TAU);g.fill()}
 if(D.rain){g.fillStyle=RAIN;for(let i=0;i<8;i++){g.beginPath();g.ellipse(cx-rx+i*rx*.28,A.H*.12+(i%3)*12,3,6,0,0,TAU);g.fill()}
  if(D.t>=.6)for(let i=0;i<3;i++){g.beginPath();g.ellipse(cx+rx+tip,cy+tip*.35+14+i*16,3.5,6,0,0,TAU);g.fill()}}
 g.fillStyle='#ffffff';g.strokeStyle=INK;g.lineWidth=2;g.beginPath();g.arc(cx+rx+tip,cy+tip*.35,A.narrow?10:12,0,TAU);g.fill();g.stroke();
 pill(D.rain?(wet>0?'Rain sits on the leaf':'Rain runs off the tip'):'Tap Rain',A.W/2,A.H*.06,{ok:D.done,no:D.rain&&wet>0});pill(D.t>=.6?'long drip tip':D.t>.25?'short tip':'round end',cx+rx*.2,A.H*.9,{f:12})}
function setTip(t,quiet){const D=M.d;D.t=lim(t,0,1);if(D.rain&&D.t>=.6)D.done=1;A.sound.tick();if(quiet)return A.redraw();dripMsg()}
function rain(){const D=M.d;D.rain=1;if(D.t>=.6)D.done=1;A.sound.whoosh&&A.sound.whoosh();dripMsg()}
function dripMsg(){const D=M.d;say(!D.rain?'A leaf with a round end. Tap Rain to see what the rain does.':D.t>=.6?'The long pointed tip lets the rain run off and drip away, so the leaf dries fast.':'The rain sits on the leaf in a puddle. Wet leaves can grow moss and mould. Drag the tip longer.')}
/* step 4: which plant am I? */
function cards(){const n=5,gap=6,w=Math.min(110,(A.W-gap*(n+1))/n),x0=(A.W-(w*n+gap*(n-1)))/2;return PL.map((t,k)=>({k,x:x0+k*(w+gap),y:A.H*.5,w,h:A.H*.4}))}
function icon(k,x,y,s){const g=A.ctx;if(k===0){g.fillStyle=BARK;g.fillRect(x-3,y-s*.6,6,s*1.2);blob(x,y-s*.65,s*.3,LEAF)}
 if(k===1){g.strokeStyle='#4ade80';g.lineWidth=3;g.beginPath();for(let i=0;i<=12;i++)g.lineTo(x+Math.sin(i)*s*.2,y+s*.6-i*s*.1);g.stroke()}
 if(k===2)flower(x,y-s*.1);if(k===3){g.fillStyle=RAIN;g.fillRect(x-s*.5,y+s*.1,s,s*.3);g.fillStyle=LEAF;g.beginPath();g.ellipse(x,y+s*.1,s*.42,s*.14,0,0,TAU);g.fill()}
 if(k===4){g.fillStyle=BARK;g.fillRect(x-3,y-s*.4,6,s);blob(x,y-s*.5,s*.26,LEAF2);g.fillStyle='#a16207';g.beginPath();g.arc(x+s*.25,y-s*.15,s*.12,0,TAU);g.fill()}}
function drawWho(){const W=M.w,g=A.ctx;g.fillStyle=SHADE;g.fillRect(0,0,A.W,A.H);if(W.k<CLUE.length)CLUE[W.k][0].split(/(?<=\.) /).forEach((t,j)=>pill(t,A.W/2,A.H*(.21+j*.13),{f:A.narrow?13:16}));
 cards().forEach(b=>{g.fillStyle=W.bad===b.k?'#7f1d1d':'#052e16';A.paint.rrect(b.x,b.y,b.w,b.h,10);g.fill();g.strokeStyle=W.got.has(b.k)?'#4ade80':'#ffffff';g.lineWidth=W.got.has(b.k)?4:1.5;g.stroke();icon(b.k,b.x+b.w/2,b.y+b.h*.4,Math.min(b.w,b.h)*.7)});
 pill(W.k>=CLUE.length?'All 5 matched':`Clue ${W.k+1} of ${CLUE.length}: which plant am I?`,A.W/2,A.H*.08,{ok:W.k>=CLUE.length})}
function guess(k){const W=M.w;if(W.k>=CLUE.length)return;const ok=CLUE[W.k][1];if(k!==ok){W.bad=k;A.sound.miss();return say(`Not the ${PL[k]}. Read the clue again: ${CLUE[W.k][0]}`)}W.got.add(k);W.bad=-1;W.k++;A.sound.pop();say(`Yes, the ${PL[k]}.`)}
function draw(){const k=now();if(k==='chal'){forest(0);pill('Challenge',A.W/2,A.H*.08,{ok:1});return}
 ({grow:drawGrow,vine:drawVine,orchid:drawOrchid,drip:drawDrip,who:drawWho})[k]();A.fx.draw(A.ctx)}
const hy=(p,top)=>lim((GY()-p.y)/(GY()-top),0,1);
function down(p){const k=now();M.drag=1;if(k==='grow'){grow(hy(p,A.H*.12),1);return true}if(k==='vine'){climb(hy(p,A.H*.14),1);return true}
 if(k==='orchid'){M.or.drag=1;M.or.p=p;A.redraw();return true}if(k==='drip'){setTip((p.x-A.W*.64)/(A.W*.26),1);return true}
 M.drag=0;if(k==='who'){const b=cards().find(b=>p.x>b.x&&p.x<b.x+b.w&&p.y>b.y&&p.y<b.y+b.h);if(b)guess(b.k)}return false}
function move(p){if(!M.drag)return;const k=now();if(k==='grow')grow(hy(p,A.H*.12),1);if(k==='vine')climb(hy(p,A.H*.14),1);if(k==='orchid'){M.or.p=p;A.redraw()}if(k==='drip')setTip((p.x-A.W*.64)/(A.W*.26),1)}
function up(){if(!M.drag)return;M.drag=0;const k=now();if(k==='grow')growMsg();if(k==='vine')vineMsg();if(k==='drip')dripMsg();
 if(k==='orchid'){const O=M.or,p=O.p;let b=-1,bd=1e9;SPOT.forEach(([,fx,fy],i)=>{const d=Math.hypot(p.x-A.W*fx,p.y-A.H*fy);if(d<bd){bd=d;b=i}});if(bd<A.W*.18)place(b);else{O.drag=0;A.redraw()}}}
function fresh(){epoch++;for(const k in M)delete M[k];Object.assign(M,{k:{h:.15,done:0},v:{h:.05,alone:0,done:0},or:{pick:-1,drag:0,done:0},d:{t:0,rain:0,done:0},w:{k:0,got:new Set(),bad:-1},drag:0,hit:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();M.hit()}
const goal=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function enter(i,desc,ok,msg){fresh();say(desc);M.hit=goal(i,ok,msg)}
function demo(i,acts,ms){steps[i].go();const e0=epoch;acts.forEach((f,j)=>setTimeout(()=>{if(e0===epoch)f()},ms*(j+1)))}
function keys(){if(!pad)return;pad.innerHTML='';const k=now(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='grow'){B('Grow',()=>grow(M.k.h+.15),'Make the kapok grow taller');B('Smaller',()=>grow(M.k.h-.15),'Make the kapok shorter')}
 if(k==='vine'){B('Climb',()=>climb(M.v.h+.15),'Make the liana climb higher');B('Take the tree away',alone,'Show the liana with no tree to climb')}
 if(k==='orchid')SPOT.forEach(([n],i)=>B(n[0].toUpperCase()+n.slice(1),()=>place(i),'Put the orchid on the '+n));
 if(k==='drip'){B('Rain',rain,'Make it rain on the leaf');B('Longer tip',()=>setTip(M.d.t+.2),'Make the leaf tip longer');B('Rounder',()=>setTip(M.d.t-.2),'Make the leaf end rounder')}
 if(k==='who')PL.forEach((t,j)=>B(t[0].toUpperCase()+t.slice(1),()=>guess(j),'Pick the '+t))}
const steps=[
{h:'Up to the light',p:'A young kapok tree is in the dark under the treetops. Drag up, or tap Grow, to make it grow.',
 predict:{q:'Why do rainforest trees grow so tall?',opts:['To get away from animals','To reach the sunlight','Because the rain pulls them up'],ans:1},task:'Grow the kapok into full sun',
 show:()=>demo(0,[.35,.55,.75,.9].map(h=>()=>grow(h)),600),
 go:()=>enter(0,'A rainforest. The treetops make a roof of leaves. Under them it is dark. A small kapok tree is on the floor.',()=>M.k.done,'Rainforest plants grow tall to reach the light. The kapok is one of the tallest trees of all.')},
{h:'A vine climbs up',p:'A liana is a climbing plant with a thin stem. Drag up the tree trunk, or tap Climb.',
 predict:{q:'A liana has a thin, bendy stem. How does it get up to the sunlight?',opts:['It climbs up a tree','It grows a thick trunk','It stays on the floor'],ans:0},task:'Climb the liana into full sun',
 show:()=>demo(1,[()=>alone(),()=>climb(.4),()=>climb(.7),()=>climb(.95)],650),
 go:()=>enter(1,'A tall tree and a liana with its roots in the ground.',()=>M.v.done,'A liana roots in the ground and climbs up trees to reach the light.')},
{h:'A plant up in a tree',p:'Drag the orchid to a home, or tap a place. Where can it get light and rain?',
 predict:{q:'Does every plant need to grow in soil?',opts:['Yes, every plant','No, some grow on branches'],ans:1},task:'Find the orchid a good home',
 show:()=>demo(2,[()=>place(0),()=>place(2),()=>place(1)],700),
 go:()=>enter(2,'An orchid flower and three places: the forest floor, a high branch and a river.',()=>M.or.done,'Many rainforest orchids grow on branches with no soil. Their roots soak up rain.')},
{h:'Leaves in the rain',p:'Tap Rain. Then drag the white dot to make the leaf tip longer, or tap Longer tip.',
 predict:{q:'Many rainforest leaves have a long pointy tip. What is it for?',opts:['It pokes animals','Rain runs off it','It catches flies'],ans:1},task:'Make a leaf that the rain runs off',
 show:()=>demo(3,[()=>rain(),()=>setTip(.3),()=>setTip(.7)],700),
 go:()=>enter(3,'A leaf with a round end, and a rain cloud.',()=>M.d.done,'A drip tip lets the rain run off, so the leaf dries fast.')},
{h:'Which plant am I?',p:'Read the clue. Tap the plant it is about.',task:'Match all 5 clues',
 show:()=>demo(4,CLUE.map(([,v])=>()=>guess(v)),550),
 go:()=>enter(4,'A clue and five plant cards: kapok tree, liana, orchid, giant water lily and Brazil nut tree.',()=>M.w.k>=CLUE.length,'Each rainforest plant is suited to life in a hot, wet, shady forest.')},
{h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>M.hit()});
const QS=[
 {q:'Why do rainforest trees grow so tall?',a:'To reach the sunlight',o:[['To get away from animals','escape'],['The rain pulls them up','rain']]},
 {q:'What is the rainforest floor like?',a:'Dark and shady',o:[['Bright and sunny','bright'],['Dry, like a desert','dry']]},
 {q:'How does a liana get up to the light?',a:'It climbs up a tree',o:[['It grows a thick trunk first','thick'],['It stays on the floor','floor']]},
 {q:'An orchid lives on a branch. Where does it get water?',a:'From the rain, with its roots',o:[['From soil far below','soil'],['It drinks from the tree','hurt']]},
 {q:'What does a long pointy leaf tip do?',a:'Lets the rain run off',o:[['It pokes animals','poke'],['It catches flies','poke']]},
 {q:'Which plant floats on the river?',a:'The giant water lily',o:[['The kapok tree','tall'],['The orchid','hurt']]}];
function why(t){let m='Think about what each plant needs: light and water.';
 if(t==='escape')m='Trees do not run from animals. They grow tall to get their leaves up into the sunlight.';
 if(t==='rain')m='Rain helps plants grow, but it does not pull them. They grow up towards the light.';
 if(t==='bright')m='The treetops make a thick roof of leaves, so very little light gets down to the floor.';
 if(t==='dry')m='A rainforest is wet. It rains almost every day, even on the floor.';
 if(t==='thick')m='A liana stem stays thin and bendy. It climbs a tree instead of growing a thick trunk.';
 if(t==='floor')m='On the dark floor a liana would get little light. It climbs up to the sunlight.';
 if(t==='soil')m='The orchid is high on a branch, far from the soil. Its roots soak up rain from the air.';
 if(t==='hurt')m='An orchid does not drink from the tree or hurt it. It lives on a branch and catches rain.';
 if(t==='poke')m='The pointy tip is a drip tip. Rain runs along the leaf and drips off the end.';
 if(t==='tall')m='The kapok is a giant tree on land. The giant water lily has a round leaf that floats.';
 return m}
function quiz(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 quizBox.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quizBox.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>judge(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function judge(t,a){quizBox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quizBox.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:B=>{quizBox.hidden=B.step!==5;pad.hidden=B.step===5;keys()},
 init:B=>{A=B;const wrap=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Plant controls'},wrap);quizBox=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});keys()}}).start()})})();
