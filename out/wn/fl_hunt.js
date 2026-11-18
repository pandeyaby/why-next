/* Flagship – predator hunting strategies and prey defences (ages 7–9). Match hunters to tricks, time a crocodile ambush,
   place a wolf pack to cut off escape, sort prey defences, and run a cheetah–gazelle arms race over generations. */
(()=>{
 const HUNTERS=[['wolf',0,'Wolves do not trap or hide. They hunt together in a pack to catch big animals.'],['chameleon',1,'A chameleon sits still and shoots out a long sticky tongue to grab insects.'],
  ['spider',2,'Many spiders build a sticky web and wait for insects to fly into it.'],['crocodile',3,'A crocodile hides in the water and waits for prey to come close.']];
 const TRICKS=['hunt in a pack','sticky tongue','web trap','hide and ambush'];
 const BINS=['spines or armour','smell or poison','a trick'];
 const PREY=[['porcupine',0,'Its sharp quills (spines) hurt a predator that bites it.'],['skunk',1,'A skunk sprays a horrible smell. Predators learn to stay away.'],['opossum',2,'An opossum plays dead. Many predators lose interest in prey that does not move.'],
  ['poison dart frog',1,'Its skin is poisonous, and its bright colours warn predators.'],['armadillo',0,'Its hard bony plates are armour.'],['stick insect',2,'It looks like a twig, so predators do not see it.']];
 const GENS=[[3,5,6,7,8,9],[5,6,7,8,9,9],[6,7,8,9,9,10]];  // gazelle speeds; the slowest is caught each round
 VIS.reg('flaghunt',c=>{let A,ctl,qz;c.fig.classList.add('young');
 const H={then:()=>{}};
 const part=()=>['match','ambush','pack','defend','race','chal'][A.step];
 const INK='#1c1917',GREY='#57534e',EDGE='#78716c',WH='#fff',GOOD='#047857',BAD='#b91c1c',SAND='#fef3c7',GRASS='#d9f99d',RIVER='#93c5fd',TICK='#dcfce7';
 const sz=n=>Math.round(n*(A.narrow?1.05:1.2)),F=n=>`700 ${sz(n)}px system-ui,sans-serif`;
 function write(g,s,x,y,n,col,al){g.font=F(n);g.fillStyle=col||INK;g.textAlign=al||'center';g.textBaseline='middle';g.fillText(String(s),x,y)}
 function wrapT(g,s,w,n){g.font=F(n);const o=[];let l='';s.split(' ').forEach(t=>{const u=l?l+' '+t:t;if(l&&g.measureText(u).width>w){o.push(l);l=t}else l=u});o.push(l);return o}
 function block(g,s,r,n,col){const L=wrapT(g,s,r.w-14,n);L.forEach((l,i)=>write(g,l,r.x+r.w/2,r.y+r.h/2+(i-(L.length-1)/2)*(sz(n)+4),n,col))}
 function tile(g,r,f,e,w){g.fillStyle=f;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=e;g.lineWidth=w||2;g.stroke()}
 const isIn=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 function title(g,s,col){const r={x:10,y:8,w:A.W-20,h:A.H*.12};tile(g,r,SAND,'#b45309',2);block(g,s,r,14,col)}
 function note(g){if(!H.msg)return;const L=wrapT(g,(H.bad?'✗ ':'✓ ')+H.msg,A.W-40,13),lh=sz(13)+5,h=L.length*lh+10,y=A.H-h-6;tile(g,{x:10,y,w:A.W-20,h},WH,H.bad?BAD:GOOD,3);L.forEach((l,i)=>write(g,l,A.W/2,y+5+lh*(i+.5),13))}
 const live=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
 const oops=s=>{H.bad=true;H.msg=s;A.sound.miss();live(s);A.redraw()};
 const nice=s=>{H.bad=false;H.msg=s;A.sound.pop()};
 function oval(g,x,y,rx,ry,col){g.fillStyle=col;g.beginPath();g.ellipse(x,y,rx,ry,0,0,7);g.fill()}
 // simple animal drawings: body, head, legs
 function beast(g,kind,x,y,s){const col={wolf:'#6b7280',moose:'#7c2d12',gnu:'#78350f',gazelle:'#d97706',cheetah:'#ca8a04'}[kind];g.strokeStyle=col;g.lineWidth=Math.max(2,s*.12);
 [-.5,-.2,.25,.55].forEach(f=>{g.beginPath();g.moveTo(x+s*f,y);g.lineTo(x+s*f,y+s*.7);g.stroke()});oval(g,x,y,s*.85,s*.38,col);oval(g,x+s*.95,y-s*.3,s*.3,s*.22,col);
 if(kind==='moose'){g.beginPath();g.moveTo(x+s*.9,y-s*.5);g.lineTo(x+s*.7,y-s*.95);g.moveTo(x+s*1.05,y-s*.5);g.lineTo(x+s*1.3,y-s*.95);g.stroke()}
 if(kind==='wolf'){g.fillStyle=col;g.beginPath();g.moveTo(x+s*.85,y-s*.45);g.lineTo(x+s*.9,y-s*.75);g.lineTo(x+s*1.05,y-s*.45);g.fill()}
 if(kind==='cheetah')[-.4,0,.4].forEach(f=>oval(g,x+s*f,y-s*.05,s*.06,s*.06,INK))}
 // ---- 1. match each hunter to its trick
 const trickR=i=>{const w=(A.W-30)/2,h=A.H*.12;return{x:10+(i%2)*(w+10),y:A.H*.58+Math.floor(i/2)*(h+8),w,h}};
 function drawMatch(g){const q=HUNTERS[H.i];title(g,q?`How does the ${q[0]} catch its food?`:'Each hunter has its own trick.',q?INK:GOOD);
 if(q){const r={x:A.W*.2,y:A.H*.2,w:A.W*.6,h:A.H*.3};tile(g,r,GRASS,EDGE,2);write(g,q[0],r.x+r.w/2,r.y+r.h/2,22)}
 else HUNTERS.forEach((h,i)=>write(g,`${h[0]}: ${TRICKS[h[1]]}`,A.W/2,A.H*.22+i*sz(20),13,GOOD));
 TRICKS.forEach((t,i)=>{const r=trickR(i);tile(g,r,WH,EDGE,2.5);block(g,t,r,13)})}
 function pickTrick(i){const q=HUNTERS[H.i];if(!q)return;if(i!==q[1])return oops(q[2]);nice(`Yes: the ${q[0]} uses a ${TRICKS[i]==='hunt in a pack'?'pack':TRICKS[i]}.`);H.i++;step()}
 // ---- 2. crocodile ambush: strike only when the gnu is close
 const shore=()=>A.W*.62,near=()=>A.W*.16;
 function drawAmbush(g){const left=2-H.hits;title(g,left?(H.go?'Wait… strike when it is close!':'Press Watch, then Strike when the gnu is close.'):'2 catches. Wait, then strike!',left?INK:GOOD);
 const y=A.H*.55;g.fillStyle=GRASS;g.fillRect(10,A.H*.2,shore()-10,A.H*.6);g.fillStyle=RIVER;g.fillRect(shore(),A.H*.2,A.W-10-shore(),A.H*.6);
 const gx=H.gx;beast(g,'gnu',gx,y,sz(22));const cx=shore()+A.W*.1;oval(g,cx+sz(20),y+sz(10),sz(46),sz(10),'#166534');oval(g,cx-sz(12),y+sz(2),sz(5),sz(5),'#14532d');oval(g,cx,y+sz(2),sz(5),sz(5),'#14532d');
 const d=Math.max(0,cx-gx-sz(30));g.strokeStyle=d<near()?GOOD:EDGE;g.setLineDash([5,5]);g.beginPath();g.moveTo(gx+sz(30),y-sz(30));g.lineTo(cx,y-sz(30));g.stroke();g.setLineDash([]);
 write(g,d<near()?'close: strike now!':'too far',(gx+cx)/2,y-sz(44),12,d<near()?GOOD:GREY)}
 function watch(){if(H.go||H.hits>=2)return;H.go=true;H.msg='';const id=++H.run,o={x:A.W*.08};H.gx=o.x;
 A.tween(o,{x:shore()-sz(20)},A.reduced()?1:1500,'out',()=>{});(function tick(){if(id!==H.run||!H.go)return;H.gx=o.x;if(H.auto&&shore()+A.W*.1-H.gx-sz(30)<near())return strike();
 if(o.x>=shore()-sz(21)&&!H.wait)H.wait=setTimeout(()=>{if(id===H.run&&H.go){H.go=false;H.wait=0;H.gx=A.W*.08;oops('Too late: it drank and walked away. Strike while it is close.');step()}},2500);A.redraw();requestAnimationFrame(tick)})();step()}
 function strike(){if(!H.go)return oops('First press Watch and let the gnu walk to the water.');const d=shore()+A.W*.1-H.gx-sz(30);clearTimeout(H.wait);H.wait=0;H.go=false;H.run++;
 if(d>=near()){H.gx=A.W*.08;return oops('Too soon! The gnu saw you and ran. An ambush hunter waits until prey is very close.')}H.hits++;H.gx=A.W*.08;nice('Got it! Waiting hidden saves energy and gives the prey no time to run.');step()}
 // ---- 3. wolf pack: block every way out
 const ring=()=>({x:A.W*.42,y:A.H*.5,r:Math.min(A.W*.28,A.H*.24)});
 const gapXY=i=>{const R=ring(),a=[-Math.PI/2,Math.PI,Math.PI/2][i];return{x:R.x+Math.cos(a)*R.r,y:R.y+Math.sin(a)*R.r}};
 function drawPack(g){const R=ring(),n=H.gaps.filter(Boolean).length;title(g,H.won?'Cornered! The pack works as a team.':`Drag wolves into the 3 gaps (${n} placed), then press Hunt.`,H.won?GOOD:INK);
 g.fillStyle=GRASS;g.fillRect(10,A.H*.18,A.W-20,A.H*.66);g.fillStyle=RIVER;g.fillRect(R.x+R.r*.9,A.H*.18,A.W-10-R.x-R.r*.9,A.H*.66);write(g,'deep river',R.x+R.r*1.3,A.H*.22,10,'#1e3a8a','left');
 g.strokeStyle='#a8a29e';g.lineWidth=sz(10);[[-2.6,-2.1],[-1.05,-.55],[2.1,2.6],[.55,1.05]].forEach(([a,b])=>{g.beginPath();g.arc(R.x,R.y,R.r,a,b);g.stroke()});
 beast(g,'moose',H.mx||R.x-sz(14),H.my||R.y,sz(20));[0,1,2].forEach(i=>{const P=gapXY(i);if(H.gaps[i])beast(g,'wolf',P.x-sz(8),P.y,sz(13));else{g.strokeStyle=BAD;g.lineWidth=2;g.setLineDash([4,4]);g.beginPath();g.arc(P.x,P.y,sz(16),0,7);g.stroke();g.setLineDash([])}});
 const den={x:14,y:A.H*.72,w:A.W*.3,h:A.H*.1},left=3-n;if(left&&!H.won){tile(g,den,WH,EDGE,2);beast(g,'wolf',den.x+sz(22),den.y+den.h*.45,sz(11));write(g,`× ${left}`,den.x+den.w*.7,den.y+den.h/2,13)}
 if(H.drag)beast(g,'wolf',H.drag.x,H.drag.y,sz(13))}
 function putWolf(i){if(H.won||H.gaps[i])return;H.gaps[i]=1;H.msg='';A.sound.tick();step()}
 function hunt(){if(H.won)return;const open=[0,1,2].find(i=>!H.gaps[i]);if(open!=null){const P=gapXY(open),n=H.gaps.filter(Boolean).length;H.mx=P.x;H.my=P.y;A.redraw();
 setTimeout(()=>{H.mx=H.my=0;A.redraw()},700);return oops(n?`The moose ran out of the open gap. ${n} wolf${n>1?'ves':''} cannot block every way out.`:'One wolf alone cannot stop a moose. It just runs away.')}
 H.won=true;nice('Every way out is blocked. Big prey needs a pack.');step()}
 // ---- 4. prey defences
 const binR=i=>{const w=(A.W-36)/3;return{x:10+i*(w+8),y:A.H*.6,w,h:A.H*.17}},cardR=()=>({x:A.W*.18,y:A.H*.2,w:A.W*.64,h:A.H*.14});
 function drawDefend(g){const q=PREY[H.i];title(g,q?`How does the ${q[0]} stay safe?`:'Spines, poison, smells and tricks keep prey safe.',q?INK:GOOD);
 BINS.forEach((b,i)=>{const r=binR(i);tile(g,r,H.drag&&isIn(H.drag,r)?TICK:WH,EDGE,2.5);block(g,b,{...r,h:sz(34)},11);PREY.slice(0,H.i).filter(p=>p[1]===i).forEach((p,k)=>write(g,p[0],r.x+r.w/2,r.y+sz(40)+k*sz(14),9,GOOD))});
 if(q){const h=cardR(),r=H.drag?{...h,x:H.drag.x-h.w/2,y:H.drag.y-h.h/2}:h;tile(g,r,'#ede9fe','#6d28d9',3);block(g,q[0],r,15)}}
 function sortPrey(b){const q=PREY[H.i];if(!q)return;if(b!==q[1])return oops(q[2]);nice(q[2]);H.i++;step()}
 // ---- 5. arms race: the slowest gazelle is caught, the rest have young like them
 const barR=k=>({x:A.W*.3,y:A.H*.2+k*A.H*.066,w:A.W*.6,h:A.H*.05});
 function drawRace(g){const s=GENS[H.i]||GENS[2].map(v=>v+1),avg=s.reduce((a,b)=>a+b,0)/6;title(g,GENS[H.i]?`Generation ${H.i+1}: which gazelle does the cheetah catch?`:'Over the generations the gazelles got faster.',GENS[H.i]?INK:GOOD);
 s.forEach((v,k)=>{const r=barR(k);beast(g,'gazelle',A.W*.14,r.y+r.h*.3,sz(10));g.fillStyle=TICK;A.paint.rrect(r.x,r.y,r.w,r.h,6);g.fill();g.fillStyle=GOOD;A.paint.rrect(r.x,r.y,r.w*v/11,r.h,6);g.fill();write(g,'speed '+v,r.x+6,r.y+r.h/2,10,WH,'left')});
 write(g,`average speed ${avg.toFixed(1)}`,A.W/2,A.H*.62,13,INK);H.hist.forEach((a,i)=>write(g,`gen ${i+1}: ${a.toFixed(1)}`,A.W*(.2+i*.3),A.H*.67,10,GREY))}
 function catchOne(k){const s=GENS[H.i];if(!s)return;const slow=s.indexOf(Math.min(...s));if(k!==slow)return oops(s[k]>=Math.max(...s)?'That is the fastest one. It is the most likely to escape.':'Look at the bars. The cheetah catches the slowest gazelle; the faster ones get away.');
 H.hist.push(s.reduce((a,b)=>a+b,0)/6);nice(H.i<2?'Caught. The faster ones live and have young that are fast like them.':'Each generation the slow are caught, so the gazelles get faster. Then only fast cheetahs catch enough food.');H.i++;step()}
 function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#f8fafc',C.dark?.05:.5);g.fillRect(0,0,A.W,A.H);if(C.dark){g.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);g.fill()}
 const v=part();if(v==='match')drawMatch(g);if(v==='ambush')drawAmbush(g);if(v==='pack')drawPack(g);if(v==='defend')drawDefend(g);if(v==='race')drawRace(g);
 if(v==='chal'){title(g,'Hunters use tricks. Prey fight back.');beast(g,'cheetah',A.W*.3,A.H*.45,sz(24));beast(g,'gazelle',A.W*.68,A.H*.45,sz(18))}note(g);A.fx.draw(g)}
 function step(){const v=part();let s='Challenge.';
 if(v==='match')s=HUNTERS[H.i]?`A ${HUNTERS[H.i][0]}. Pick its trick.`:'All 4 matched.';
 if(v==='ambush')s=`Catches: ${H.hits} of 2.${H.go?' The gnu is walking to the water.':''}`;
 if(v==='pack')s=H.won?'The moose is cornered.':`Wolves in gaps: ${H.gaps.filter(Boolean).length} of 3.`;
 if(v==='defend')s=PREY[H.i]?`Card: ${PREY[H.i][0]}.`:'All 6 sorted.';
 if(v==='race')s=GENS[H.i]?`Generation ${H.i+1}. Speeds ${GENS[H.i].join(', ')}.`:'Average speed went up each generation.';
 live((H.msg?H.msg+' ':'')+s);knobs();H.then()}
 function knobs(){if(!ctl)return;ctl.innerHTML='';const v=part(),b=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);e.onclick=f};
 if(v==='match'&&HUNTERS[H.i])TRICKS.forEach((t,i)=>b(t,()=>pickTrick(i)));
 if(v==='ambush'&&H.hits<2){b('Watch',watch,'Watch the gnu walk to the water');b('Strike!',strike,'Crocodile strikes')}
 if(v==='pack'&&!H.won){['top','left','bottom'].forEach((t,i)=>{if(!H.gaps[i])b(`Wolf to ${t} gap`,()=>putWolf(i))});b('Hunt',hunt,'Start the hunt')}
 if(v==='defend'&&PREY[H.i])BINS.forEach((t,i)=>b(t,()=>sortPrey(i)));
 if(v==='race'&&GENS[H.i])GENS[H.i].forEach((sp,k)=>b(`Gazelle ${k+1}`,()=>catchOne(k),`Gazelle ${k+1}, speed ${sp}`));A.redraw()}
 function down(p){const v=part();
 if(v==='match'){const i=[0,1,2,3].find(i=>isIn(p,trickR(i)));if(i!=null){pickTrick(i);return true}return false}
 if(v==='ambush'){if(H.hits>=2)return false;H.go?strike():watch();return true}
 if(v==='pack'){if(H.won)return false;if(p.y>A.H*.7&&p.x<A.W*.36){H.drag={x:p.x,y:p.y};return true}const i=[0,1,2].find(i=>{const P=gapXY(i);return Math.hypot(p.x-P.x,p.y-P.y)<sz(26)});if(i!=null){putWolf(i);return true}return false}
 if(v==='defend'){if(!PREY[H.i])return false;if(isIn(p,cardR())){H.drag={x:p.x,y:p.y};return true}const i=[0,1,2].find(i=>isIn(p,binR(i)));if(i!=null){sortPrey(i);return true}return false}
 if(v==='race'){if(!GENS[H.i])return false;const k=[0,1,2,3,4,5].find(k=>{const r=barR(k);return p.y>=r.y-4&&p.y<=r.y+r.h+4});if(k!=null){catchOne(k);return true}return false}return false}
 function move(p){if(H.drag){H.drag={x:p.x,y:p.y};A.redraw()}}
 function up(p){if(!H.drag)return;const q=p||H.drag,v=part();H.drag=null;
 if(v==='pack'){const i=[0,1,2].find(i=>{const P=gapXY(i);return Math.hypot(q.x-P.x,q.y-P.y)<sz(34)});if(i!=null)putWolf(i);else A.redraw()}
 if(v==='defend'){const i=[0,1,2].find(i=>isIn(q,binR(i)));if(i!=null)sortPrey(i);else A.redraw()}}
 const close=(n,done,msg)=>()=>{if(A.step===n&&done()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
 const auto=(fs,gap)=>{const id=++H.run;fs.forEach((f,k)=>setTimeout(()=>{if(id===H.run||f.keep)f()},k*(A.reduced()?30:gap)))};
 const fresh=()=>{H.run=(H.run||0)+1;clearTimeout(H.wait);Object.assign(H,{then:()=>{},i:0,hits:0,go:false,gx:A.W*.08,wait:0,auto:false,gaps:[0,0,0],won:false,mx:0,my:0,drag:null,hist:[],msg:'',bad:false})};
 const steps=[
 {h:'Hunting tricks',p:'Predators hunt in different ways. Pick the trick each hunter uses.',
 predict:{q:'How does a chameleon catch a fly?',opts:['It shoots out a long sticky tongue','It chases the fly','It builds a web'],ans:0},
 task:'Match 4 hunters',show:()=>{steps[0].go();auto(HUNTERS.map(h=>()=>pickTrick(h[1])),350)},go:()=>{fresh();step();H.then=close(0,()=>H.i>=HUNTERS.length,'Pack, tongue, web and ambush: four ways to hunt.')}},
 {h:'Ambush!',p:'A crocodile hides in the river. Press Watch, then press Strike (or tap) when the gnu is close.',
 predict:{q:'Why does a crocodile lie still in the water?',opts:['To stay hidden until prey is close','It is asleep','It is too slow to move'],ans:0},
 task:'Catch 2 times',show:()=>{steps[1].go();H.auto=true;watch();const t=setInterval(()=>{if(A.step!==1||H.hits>=2){clearInterval(t);return}if(!H.go)watch()},300)},go:()=>{fresh();step();H.then=close(1,()=>H.hits>=2,'An ambush hunter stays hidden and still, then strikes when prey is close.')}},
 {h:'Pack hunt',p:'A moose is much bigger than a wolf. Drag wolves into every gap, then press Hunt.',
 predict:{q:'Can one wolf catch a big moose on its own?',opts:['Hardly ever: wolves hunt big prey as a pack','Yes, easily','Wolves only eat plants'],ans:0},
 task:'Corner the moose',show:()=>{steps[2].go();auto([()=>putWolf(0),()=>putWolf(1),()=>putWolf(2),hunt],350)},go:()=>{fresh();step();H.then=close(2,()=>H.won,'Working as a team, wolves can catch prey much bigger than one wolf.')}},
 {h:'Prey fight back',p:'Prey animals have defences too. Drag each animal to the box for its defence.',
 predict:{q:'A poison dart frog is bright red and blue. Why?',opts:['The colours warn: I am poisonous','So it can hide','No reason at all'],ans:0},
 task:'Sort 6 animals',show:()=>{steps[3].go();auto(PREY.map(p=>()=>sortPrey(p[1])),350)},go:()=>{fresh();step();H.then=close(3,()=>H.i>=PREY.length,'Spines and armour, smells and poison, and tricks all keep prey safe.')}},
 {h:'Arms race',p:'A cheetah chases a herd. Tap the gazelle it catches. The others grow up and have young like them.',
 predict:{q:'Cheetahs hunt gazelles for many, many years. What happens?',opts:['Gazelles get faster, because fast ones survive','Each gazelle decides to grow faster legs','Nothing changes'],ans:0},
 task:'Run 3 generations',show:()=>{steps[4].go();auto(GENS.map(s=>()=>catchOne(s.indexOf(Math.min(...s)))),450)},go:()=>{fresh();step();H.then=close(4,()=>H.i>=GENS.length,'Fast prey survive, so prey get faster, and so do the predators that catch them: an arms race.')}},
 {h:'Challenge',p:'',go:()=>{fresh();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>H.then()});
 const Q=[['How does a crocodile catch its prey?','It hides and waits, then strikes',[['It chases it across the grass','chase'],['It builds a trap','trap']]],
 ['Why do wolves hunt in a pack?','To catch prey bigger than one wolf',[['Because one wolf is lazy','lazy'],['To share a web','web']]],
 ['How does a skunk stay safe?','It sprays a horrible smell',[['It plays dead','dead'],['It has hard armour','armour']]],
 ['Why are poison dart frogs so brightly coloured?','To warn predators that they are poisonous',[['To hide in the leaves','hide'],['To look pretty','pretty']]],
 ['Which gazelle is most likely to be caught by a cheetah?','The slowest one',[['The fastest one','fast'],['Any one, it is just luck','luck']]],
 ['Why have gazelles got faster over many years?','Fast ones survived and had fast young',[['Each gazelle chose to run faster','chose'],['They practised every day and passed it on','practice']]]];
 function why(tag){let m='Think about how the animal hunts or stays safe.';
 if(tag==='chase')m='A crocodile is an ambush hunter: it hides in the water and waits.';
 if(tag==='trap')m='Spiders build traps. A crocodile hides and waits.';
 if(tag==='lazy')m='Teamwork lets wolves catch big animals like moose that one wolf could not.';
 if(tag==='web')m='Webs are a spider trick. Wolves work as a team.';
 if(tag==='dead')m='Opossums play dead. A skunk sprays a horrible smell.';
 if(tag==='armour')m='Armadillos have armour. A skunk sprays a smell.';
 if(tag==='hide')m='Bright colours stand out. They are a warning, not a hiding trick.';
 if(tag==='pretty')m='The colours have a job: they warn that the frog is poisonous.';
 if(tag==='fast')m='The fastest gazelle is the most likely to escape.';
 if(tag==='luck')m='Luck plays a part, but slow gazelles are caught more often.';
 if(tag==='chose')m='Animals cannot choose to change their bodies. Fast ones survived more often.';
 if(tag==='practice')m='Practice is not passed on to babies. Fast gazelles had fast young.';
 return m}
 let qn=-1,best=0;
 function ask(){qn++;const [q,ans,bad]=Q[qn%Q.length],all=[[ans,'ok']].concat(bad),k=qn%3,order=all.slice(k).concat(all.slice(0,k));
 qz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qz.querySelector('.fl-pick');order.forEach(([w,tag])=>{const e=c.el('button',{type:'button',class:'lbtn'},row,w);e.onclick=()=>mark(tag,ans)});live('Challenge: '+q);A.redraw()}
 function mark(tag,ans){qz.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=qz.querySelector('.fl-fb');
 if(ok){best++;A.win()}else{best=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+best+'.':'✗ '+why(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{qz.hidden=A.step!==5;ctl.hidden=A.step===5;knobs()},
 init:A=>{const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab buttons'},w);qz=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}});
 A.start()})})();
