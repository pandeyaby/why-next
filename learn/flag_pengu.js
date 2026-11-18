/* Flagship: penguins (ages 5-7; NC Y1 animals "identify and name a variety of common animals including birds",
   Y2 living things in their habitats). Flap on the ice and then dive to find that penguin wings are flippers for
   swimming; stand four species in height order next to a 6-year-old; pass an emperor egg from mum's feet to dad's
   feet and wait out about two months of winter; rotate cold penguins into the middle of a huddle so everyone gets a
   turn; sort five species into icy and warm homes, all in the south half of the world. Not flagpolaran (poles,
   blubber, fox coats, building a polar body). */
(()=>{
VIS.reg('flagpengu',c=>{let P,ctlEl,qEl,qi=-1,ver=0;const W8={};c.fig.classList.add('young');
const BLACK='#111827',WHITE='#ffffff',BEAK='#f59e0b',SEA='#1d4ed8',ICE='#e0f2fe',SNOWC='#f1f5f9',TXT='#0f172a',GOODC='#047857';
const SP=[{n:'Little penguin',cm:30},{n:'Adélie penguin',cm:70},{n:'King penguin',cm:95},{n:'Emperor penguin',cm:115}];
const MIX=[2,0,3,1];
const HOMES=[['Emperor penguin','Antarctica',0,.55,.9],['Adélie penguin','Antarctica',0,.42,.9],['African penguin','beaches of South Africa',1,.55,.68],
 ['Little penguin','beaches of Australia',1,.85,.7],['Galápagos penguin','islands on the equator',1,.22,.5]];
const now=()=>['swim','size','egg','huddle','home','quiz'][P.step];
const bound=(v,a,b)=>v<a?a:v>b?b:v;
function pill(t,x,y,o){o=o||{};const g=P.ctx;let s=o.s||(P.narrow?14:16);g.font=`800 ${s}px system-ui`;let w=g.measureText(t).width+20;
 while(w>P.W-8&&s>10){s--;g.font=`800 ${s}px system-ui`;w=g.measureText(t).width+20}const h=s+14,l=bound(x-w/2,4,P.W-w-4);
 g.fillStyle=WHITE;P.paint.rrect(l,y-h/2,w,h,8);g.fill();g.lineWidth=o.hi?3:1.5;g.strokeStyle=o.hi||'#64748b';g.stroke();g.fillStyle=TXT;g.textAlign='center';g.textBaseline='middle';g.fillText(t,l+w/2,y+1)}
function bird(x,y,h,o){o=o||{};const g=P.ctx,w=h*.55;g.save();g.translate(x,y);if(o.tilt)g.rotate(o.tilt);
 g.fillStyle=BLACK;g.beginPath();g.ellipse(0,-h*.45,w/2,h*.45,0,0,7);g.fill();g.fillStyle=o.cold?'#bfdbfe':WHITE;g.beginPath();g.ellipse(0,-h*.4,w*.34,h*.36,0,0,7);g.fill();
 g.fillStyle=BLACK;g.beginPath();g.arc(0,-h*.86,w*.32,0,7);g.fill();if(o.gold){g.fillStyle='#fbbf24';g.beginPath();g.arc(-w*.2,-h*.8,w*.1,0,7);g.fill()}
 g.fillStyle=WHITE;g.beginPath();g.arc(w*.1,-h*.9,Math.max(1.5,w*.07),0,7);g.fill();g.fillStyle=BEAK;g.beginPath();g.moveTo(w*.28,-h*.88);g.lineTo(w*.5,-h*.84);g.lineTo(w*.28,-h*.8);g.fill();
 g.fillStyle=BLACK;const fl=o.flap||0;[-1,1].forEach(d=>{g.save();g.translate(d*w*.45,-h*.6);g.rotate(d*(.25+fl));g.beginPath();g.ellipse(0,h*.18,w*.1,h*.22,0,0,7);g.fill();g.restore()});
 g.fillStyle=BEAK;g.fillRect(-w*.3,-h*.03,w*.22,h*.04);g.fillRect(w*.08,-h*.03,w*.22,h*.04);g.restore()}
function ground(sea){const g=P.ctx,C=P.col;g.fillStyle=P.mix(C.pn,'#e0f2fe',C.dark?.08:.55);g.fillRect(0,0,P.W,P.H);if(sea!=null){g.fillStyle=SEA;g.fillRect(0,P.H*sea,P.W,P.H*(1-sea))}}
/* 0: flap on ice, then swim */
function drawSwim(){ground(.55);const g=P.ctx;g.fillStyle=ICE;g.fillRect(0,P.H*.45,P.W*.45,P.H*.1);g.strokeStyle='#0369a1';g.lineWidth=2;g.strokeRect(0,P.H*.45,P.W*.45,P.H*.1);
 const S=W8.sw;if(S.inWater){const t=S.t,x=P.W*(.5+.4*Math.sin(t*Math.PI*2)),y=P.H*(.75+.12*Math.sin(t*Math.PI*4));bird(x,y,P.H*.2,{tilt:Math.PI/2*(Math.cos(t*Math.PI*2)>0?1:-1),flap:.8});
  for(let k=1;k<6;k++){g.fillStyle='rgba(255,255,255,.5)';g.beginPath();g.arc(x-k*14*Math.cos(t*Math.PI*2),y-k*3,3,0,7);g.fill()}}
 else bird(S.x,P.H*.45-S.hop,P.H*.24,{flap:S.hop?.9:0});
 pill(S.inWater?'Zoom! Wings work as flippers':S.flaps?`Flapped ${S.flaps} times: still on the ice`:'Flap, or drag the penguin into the sea',P.W/2,P.H*.08,{hi:S.inWater?GOODC:0});pill('sea',P.W*.85,P.H*.6,{s:11})}
function flap(){const S=W8.sw;if(S.inWater)return say('The penguin is swimming now. Its wings are flippers.');S.flaps++;P.sound.tick();S.hop=0;P.tween(S,{hop:P.H*.05},160,'out',()=>P.tween(S,{hop:0},220,'io'));
 say(S.flaps<2?'Flap! The penguin jumps a tiny bit and lands. Penguins cannot fly.':'Still no take-off. Penguin wings are short and stiff, and the body is heavy.')}
function dive(){const S=W8.sw;if(S.inWater)return;S.inWater=1;S.t=0;P.sound.whoosh();P.tween(S,{t:1},1800,'io',()=>{S.swum=1;say('Underwater, the stiff wings push like flippers. Some penguins swim faster than you can run.')});P.redraw()}
/* 1: line up by height */
function drawSize(){ground();const g=P.ctx,b=P.H*.88,sc=P.H*.55/120;g.strokeStyle=P.col.tx;g.lineWidth=2;g.beginPath();g.moveTo(P.W*.04,b);g.lineTo(P.W*.96,b);g.stroke();
 const left=MIX.filter(i=>!W8.row.includes(i));left.forEach((i,k)=>{const x=P.W*(.12+k*.2);bird(x,P.H*.42,SP[i].cm*sc*.55,{gold:i>1});pill(SP[i].n.split(' ')[0],x,P.H*.47,{s:11})});
 W8.row.forEach((i,k)=>{const x=P.W*(.1+k*.17);bird(x,b,SP[i].cm*sc,{gold:i>1});pill(SP[i].cm+' cm',x,b+16,{s:11})});
 const kx=P.W*.88,kh=115*sc;g.fillStyle=P.col.dark?'#94a3b8':'#64748b';g.beginPath();g.arc(kx,b-kh+kh*.09,kh*.09,0,7);g.fill();P.paint.rrect(kx-kh*.11,b-kh*.8,kh*.22,kh*.8,8);g.fill();pill('you, age 6',kx,b+16,{s:11});
 pill(W8.row.length===4?'The emperor is as tall as you!':'Tap the smallest penguin left',P.W/2,P.H*.08,{hi:W8.row.length===4?GOODC:0})}
function stand(i){if(W8.row.includes(i))return;const left=MIX.filter(k=>!W8.row.includes(k)),small=Math.min(...left);
 if(i!==small){P.sound.miss();return say(`The ${SP[i].n} is taller than the ${SP[small].n}. Find the smallest one left.`)}W8.row.push(i);P.sound.pop();
 say(W8.row.length<4?`${SP[i].n}: about ${SP[i].cm} centimetres tall.`:'The emperor penguin is the biggest penguin, about as tall as a 6-year-old child.')}
/* 2: the egg on dad's feet */
function drawEgg(){ground();const g=P.ctx,E=W8.egg,b=P.H*.72;g.fillStyle=SNOWC;g.fillRect(0,b,P.W,P.H-b);g.fillStyle=SEA;g.fillRect(P.W*.9,b,P.W*.1,P.H-b);
 if(!E.gone){bird(P.W*.2+E.mx,b,P.H*.42,{gold:1});pill('mum',P.W*.2+E.mx,b+18,{s:11})}bird(P.W*.62,b,P.H*.46,{gold:1});pill('dad',P.W*.62,b+18,{s:11});
 g.fillStyle=E.cold?'#93c5fd':'#fefce8';g.strokeStyle=BLACK;g.lineWidth=2;g.beginPath();g.ellipse(E.x,E.y,P.H*.035,P.H*.045,0,0,7);g.fill();g.stroke();
 if(E.hatched){bird(P.W*.62+P.H*.07,b,P.H*.14,{});}
 pill(E.hatched?'Hatched! Mum is back with food':E.days?`Day ${Math.round(E.days)} of about 65, no food for dad`:E.onDad?'Egg safe on dad\'s feet':E.cold?'Too cold on the ice!':'Drag the egg to dad\'s feet',P.W/2,P.H*.08,{hi:E.hatched?GOODC:E.cold?'#b91c1c':0})}
function eggHome(){const E=W8.egg;E.x=P.W*.24;E.y=P.H*.7}
function eggDrop(x,y,quiet){const E=W8.egg;E.x=x;E.y=y;if(quiet)return P.redraw();if(Math.abs(x-P.W*.62)<P.W*.1&&Math.abs(y-P.H*.7)<P.H*.12){E.onDad=1;E.cold=0;E.x=P.W*.65;E.y=P.H*.7;P.sound.pop();
  return say('The egg is on dad\'s feet, under a warm fold of skin. It must never touch the ice.')}E.cold=1;P.sound.miss();eggHome();say('The egg touched the ice and got too cold. Back to mum. Put it on dad\'s feet.')}
function seaTrip(){const E=W8.egg;if(!E.onDad){P.sound.miss();return say('First pass the egg to dad.')}if(E.days)return;P.sound.whoosh();E.days=1;
 P.tween(E,{mx:P.W*.7},900,'io',()=>{E.gone=1;P.tween(E,{days:65},1500,'io',()=>{E.gone=0;E.mx=P.W*.3;E.hatched=1;P.sound.pop();
  say('About 65 days later the chick hatches. Mum comes back with food, and now the parents take turns.')})});say('Mum goes to the sea to eat. Dad stands with the egg on his feet all winter.')}
/* 3: huddle turns */
function spots(){const o={x:P.W/2,y:P.H*.55},r1=P.H*.12,r2=P.H*.3;return[...[0,1,2,3].map(k=>({x:o.x+r1*Math.cos(k*Math.PI/2+.8),y:o.y+r1*.8*Math.sin(k*Math.PI/2+.8),mid:1})),
 ...[0,1,2,3,4,5].map(k=>({x:o.x+r2*1.3*Math.cos(k*Math.PI/3),y:o.y+r2*.75*Math.sin(k*Math.PI/3),mid:0}))]}
function drawHuddle(){ground();const g=P.ctx,sp=spots(),H=W8.hd;g.fillStyle='rgba(251,191,36,.25)';g.beginPath();g.ellipse(P.W/2,P.H*.55,P.H*.2,P.H*.16,0,0,7);g.fill();
 g.strokeStyle=P.col.tx;g.lineWidth=2;for(let k=0;k<4;k++){const y=P.H*(.2+k*.14);g.beginPath();g.moveTo(P.W*.02,y);g.lineTo(P.W*.1,y+6);g.stroke()}pill('wind',P.W*.07,P.H*.12,{s:11});
 H.at.forEach((who,s)=>{const p=sp[s],w=H.warm[who];bird(p.x,p.y+P.H*.08,P.H*.17,{gold:1,cold:w<.35});if(!H.turn[who]){g.fillStyle='#2563eb';g.beginPath();g.arc(p.x,p.y-P.H*.12,6,0,7);g.fill()}});
 pill(`Had a turn in the middle: ${H.turn.filter(Boolean).length} of 10`,P.W/2,P.H*.08,{hi:H.turn.every(Boolean)?GOODC:0})}
function swapIn(s){const H=W8.hd,sp=spots();if(s<4||s>9)return;const out=H.at[s];let best=0;for(let k=1;k<4;k++)if(H.warm[H.at[k]]>H.warm[H.at[best]])best=k;
 H.at[s]=H.at[best];H.at[best]=out;H.turn[out]=1;H.at.forEach((who,k)=>{H.warm[who]=bound(H.warm[who]+(k<4?.25:-.15),0,1)});P.sound.pop();
 say(H.turn.every(Boolean)?'Every penguin had a turn in the warm middle. Taking turns keeps the whole group alive.':'A cold penguin shuffles in. A warm one moves out to the windy edge.')}
function nextCold(){const H=W8.hd;for(let s=4;s<10;s++)if(!H.turn[H.at[s]])return swapIn(s);swapIn(4)}
/* 4: icy or warm homes */
function drawHome(){ground();const g=P.ctx,h=W8.hm,y0=P.H*.46;g.fillStyle=P.alpha('#22c55e',.25);g.fillRect(P.W*.05,P.H*.14,P.W*.9,y0-P.H*.14);g.fillStyle=P.alpha('#38bdf8',.3);g.fillRect(P.W*.05,y0,P.W*.9,P.H*.5);
 g.strokeStyle=P.col.tx;g.setLineDash([6,5]);g.lineWidth=2;g.beginPath();g.moveTo(P.W*.05,y0);g.lineTo(P.W*.95,y0);g.stroke();g.setLineDash([]);pill('equator',P.W*.85,y0,{s:11});pill('north half',P.W*.25,P.H*.2,{s:11});pill('south half',P.W*.25,P.H*.9,{s:11});
 HOMES.forEach((m,i)=>{if(i<h.k){g.fillStyle=m[2]?'#f97316':'#1e3a8a';g.beginPath();g.arc(P.W*m[3],P.H*m[4],9,0,7);g.fill();g.strokeStyle=WHITE;g.stroke()}});
 if(h.k<5){bird(P.W*.5,P.H*.4,P.H*.18,{gold:h.k<1});pill(HOMES[h.k][0],P.W/2,P.H*.46,{})}
 pill(h.k>4?'All live in the south half; some on warm beaches':`Sorted ${h.k} of 5: icy or warm home?`,P.W/2,P.H*.08,{hi:h.k>4?GOODC:0})}
function sortHome(warm){const h=W8.hm;if(h.k>4)return;const m=HOMES[h.k];if(!!m[2]!==warm){P.sound.miss();return say(`Not this one. The ${m[0]} lives ${m[2]?'in a warm place':'on the ice'}: ${m[1]}.`)}
 h.k++;P.sound.pop();say(`${m[0]}: ${m[1]}. `+(h.k>4?'Not all penguins live on ice, but almost all live in the south half of the world.':'Next penguin.'))}
function draw(){const k=now();if(k==='quiz'){ground(.6);bird(P.W/2,P.H*.6,P.H*.3,{gold:1});pill('Challenge',P.W/2,P.H*.12,{hi:GOODC});return}
 ({swim:drawSwim,size:drawSize,egg:drawEgg,huddle:drawHuddle,home:drawHome})[k]();P.fx.draw(P.ctx)}
function down(p){const k=now();if(k==='swim'){const S=W8.sw;if(!S.inWater&&Math.abs(p.x-S.x)<P.W*.12&&p.y<P.H*.5){W8.hold='bird';return true}return false}
 if(k==='size'&&p.y<P.H*.55){const left=MIX.filter(i=>!W8.row.includes(i)),j=bound(Math.floor((p.x/P.W-.02)/.2),0,left.length-1);if(left.length)stand(left[j]);return false}
 if(k==='egg'){const E=W8.egg;if(!E.onDad&&Math.hypot(p.x-E.x,p.y-E.y)<P.H*.12){W8.hold='egg';return true}if(E.onDad&&!E.days)seaTrip();return false}
 if(k==='huddle'){const sp=spots();let b=-1,d=1e9;sp.forEach((q,s)=>{const e=Math.hypot(q.x-p.x,q.y-p.y);if(e<d){d=e;b=s}});if(d<P.H*.15)swapIn(b);return false}
 if(k==='home'){sortHome(p.y>P.H*.46);return false}return false}
function move(p){if(W8.hold==='bird'){W8.sw.x=bound(p.x,P.W*.06,P.W*.94);P.redraw()}if(W8.hold==='egg')eggDrop(p.x,p.y,true)}
function up(){const h=W8.hold;W8.hold=null;if(h==='bird'){if(W8.sw.x>P.W*.45)dive();else say('Drag the penguin off the ice, into the sea.')}if(h==='egg')eggDrop(W8.egg.x,W8.egg.y)}
function fresh(){ver++;for(const k in W8)delete W8[k];Object.assign(W8,{sw:{x:P.W*.22,hop:0,flaps:0,inWater:0,t:0,swum:0},row:[],egg:{x:0,y:0,onDad:0,cold:0,days:0,mx:0,gone:0,hatched:0},
 hd:{at:[0,1,2,3,4,5,6,7,8,9],warm:[.9,.9,.9,.9,.3,.25,.3,.2,.3,.25],turn:[1,1,1,1,0,0,0,0,0,0]},hm:{k:0},hold:null,check:()=>{}});eggHome()}
function say(t){c.say(t);P.cv.setAttribute('aria-label',t);P.redraw();buttons();W8.check()}
const reached=(i,f,msg)=>()=>{if(P.step===i&&f()&&(!steps[i].predict||P.pred[i]!=null)&&!P.isDone)P.done(msg+P.reveal(i))};
function arrive(i,intro,f,msg){fresh();c.say(intro);P.cv.setAttribute('aria-label',intro);buttons();W8.check=reached(i,f,msg)}
function runAll(i,acts,gap){steps[i].go();const v=ver;acts.forEach((f,j)=>setTimeout(()=>{if(v===ver)f()},gap*(j+1)))}
function buttons(){if(!ctlEl)return;ctlEl.innerHTML='';const k=now(),Bt=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctlEl,t).onclick=f};
 if(k==='swim'){Bt('Flap',flap,'Flap the wings on the ice');Bt('Dive in',dive,'Dive into the sea')}
 if(k==='size')MIX.forEach(i=>{if(!W8.row.includes(i))Bt(SP[i].n.split(' ')[0],()=>stand(i),'Stand the '+SP[i].n+' on the line')});
 if(k==='egg'){Bt('Pass egg to dad',()=>eggDrop(P.W*.62,P.H*.7));Bt('Mum goes to sea',seaTrip)}
 if(k==='huddle')Bt('Let a cold one in',nextCold,'Move a cold penguin into the middle');
 if(k==='home'){Bt('Icy home',()=>sortHome(false));Bt('Warm home',()=>sortHome(true))}}
const steps=[
{h:'Fly or swim?',p:'Penguins are birds with wings. Tap Flap, then drag the penguin into the sea, or tap Dive in.',
 predict:{q:'Penguins have wings. Can they fly?',opts:['Yes, all birds fly','No, but they swim very well','Only baby penguins fly'],ans:1},task:'Flap, then swim',
 show:()=>runAll(0,[flap,dive],500),
 go:()=>arrive(0,'A penguin on the ice next to the sea.',()=>W8.sw.flaps>0&&W8.sw.swum,'Penguins cannot fly. Their wings are flippers.')},
{h:'Big and small',p:'Stand the penguins on the line, smallest first. Compare them with a 6-year-old.',
 predict:{q:'The biggest penguin is about as tall as…',opts:['a cat','a 6-year-old child','a giraffe'],ans:1},task:'Line up the penguins, smallest first',
 show:()=>runAll(1,[0,1,2,3].map(i=>()=>stand(i)),450),
 go:()=>arrive(1,'Four penguins of different sizes in a jumble, and a child, age 6.',()=>W8.row.length===4,'The emperor is the biggest penguin.')},
{h:'Keep the egg warm',p:'Emperor penguins make no nest. Drag the egg from mum\'s feet to dad\'s feet. Then mum goes to the sea to eat.',
 predict:{q:'Who keeps the emperor egg warm all winter?',opts:['mum','dad, on his feet','nobody: it sits on the ice'],ans:1},task:'Pass the egg, then send mum to sea',
 show:()=>runAll(2,[()=>eggDrop(P.W*.62,P.H*.7),seaTrip],600),
 go:()=>arrive(2,'Mum and dad emperor penguin on the ice. Mum has the egg on her feet.',()=>W8.egg.hatched,'Dad kept the egg on his feet for about 2 months.')},
{h:'The huddle',p:'A winter storm. The middle of the huddle is warm, the edge is cold. Tap a cold penguin with a blue dot to let it in.',
 predict:{q:'In a huddle, who keeps warm?',opts:['only the biggest ones','they take turns in the warm middle','nobody'],ans:1},task:'Give every penguin a turn in the middle',
 show:()=>runAll(3,Array(6).fill(nextCold),400),
 go:()=>arrive(3,'Ten emperor penguins in a huddle. Four in the warm middle, six on the cold edge.',()=>W8.hd.turn.every(Boolean),'Taking turns keeps every penguin warm enough.')},
{h:'Where penguins live',p:'Do all penguins live on ice? Sort each one: icy home or warm home.',
 predict:{q:'Do all penguins live on ice and snow?',opts:['yes, all of them','no, some live on warm beaches','they live at the North Pole'],ans:1},task:'Sort all 5 penguins',
 show:()=>runAll(4,HOMES.map(m=>()=>sortHome(!!m[2])),450),
 go:()=>arrive(4,'A map with the equator. North half on top, south half below.',()=>W8.hm.k>4,'Some penguins live on warm beaches, but almost all in the south.')},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>W8.check()});
const QS=[
 {q:'Can penguins fly?',a:'No, but they swim very well',o:[['Yes, like other birds','fly'],['Only short hops in the sky','fly']]},
 {q:'Which is the biggest penguin?',a:'The emperor penguin',o:[['The little penguin','small'],['They are all the same size','small']]},
 {q:'Who keeps the emperor egg warm in winter?',a:'Dad, on his feet',o:[['Mum, in a nest','nest'],['Nobody: it lies on the ice','ice']]},
 {q:'Why do emperor penguins huddle?',a:'To share warmth in winter storms',o:[['To play a game','game'],['Only the biggest ones get warm','big']]},
 {q:'Where do almost all penguins live?',a:'The south half of the world',o:[['The North Pole','north'],['Only in Antarctica','ice2']]},
 {q:'What are penguin wings good for?',a:'Swimming, like flippers',o:[['Flying high','fly'],['Nothing at all','useless']]},
 {q:'Do all penguins live on ice?',a:'No, some live on warm beaches',o:[['Yes, every one','ice2'],['They all live in zoos','north']]}];
function why(t){let m='Think about what penguins are built for: the sea and the cold south.';
 if(t==='fly')m='Penguins cannot fly. Their stiff wings work as flippers to swim.';
 if(t==='small')m='The little penguin is about 30 cm. The emperor is about 115 cm, as tall as a 6-year-old.';
 if(t==='nest')m='Emperor penguins make no nest. Dad holds the egg on his feet.';
 if(t==='ice')m='On the ice the egg would freeze. It stays on dad\'s feet.';
 if(t==='game')m='It is not a game. Huddling shares warmth in the freezing storm.';
 if(t==='big')m='Every penguin takes a turn in the warm middle, big or small.';
 if(t==='north')m='No penguins live wild near the North Pole. They live in the south half of the world.';
 if(t==='ice2')m='Some live on ice, but others live on warm beaches in Africa, Australia and South America.';
 if(t==='useless')m='Penguin wings are very useful. They push the penguin fast through the water.';
 return m}
function ask(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 qEl.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qEl.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>score(t,Q.a)});c.say('Challenge: '+Q.q);P.redraw()}
function score(t,a){qEl.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qEl.querySelector('.fl-fb'),ok=t==='ok';if(ok)P.win();else P.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{qEl.hidden=A.step!==5;ctlEl.hidden=A.step===5;buttons()},
 init:A=>{P=A;const box=c.el('div',{class:'fl-below'},A.below);ctlEl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Penguin controls'},box);qEl=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});buttons()}}).start()})})();
