/* Flagship: matter cycling in ecosystems (ages 10–11; NGSS 5-LS2-1 "develop a model to describe the movement of matter
   among plants, animals, decomposers, and the environment"). Carry matter round air/soil → grass → rabbit → decomposers,
   rot a 100 g leaf pile while the total stays 100 g, run two sealed gardens with and without decomposers, sort a compost
   bin, and name each process on one carbon atom's trip. Every canvas tap has a button twin. */
(()=>{
const Q={ink:'#0f172a',dim:'#475569',edge:'#334155',card:'#ffffff',ok:'#166534',okBg:'#dcfce7',no:'#9f1239',hint:'#f0f9ff',
 air:'#0369a1',airBg:'#e0f2fe',leaf:'#15803d',leafBg:'#dcfce7',fur:'#92400e',furBg:'#ffedd5',rot:'#6d28d9',rotBg:'#ede9fe',soil:'#78350f',soilBg:'#fef3c7'};
const ST=[{n:'Air and soil',s:'CO₂, water, minerals',c:Q.air,b:Q.airBg},{n:'Grass',s:'plant',c:Q.leaf,b:Q.leafBg},{n:'Rabbit',s:'animal',c:Q.fur,b:Q.furBg},{n:'Decomposers',s:'fungi, bacteria, worms',c:Q.rot,b:Q.rotBg}];
const HOP=['taken in by roots and leaves','eaten','droppings and dead body','broken down, given back'];
const BIN=[['banana peel',1],['autumn leaves',1],['plastic bag',0],['apple core',1],['glass jar',0],['newspaper',1],['drinks can',0],['wooden lolly stick',1]];
const TRIP=['air','grass','rabbit','air','oak leaf','fungus','air'],HOW=['photosynthesis','eating','breathing out','photosynthesis','decomposing','breathing out'];
const PROC=['photosynthesis','eating','breathing out','decomposing'];
VIS.reg('flagmatcyc',c=>{let A,X,keys,quiz,qk=-1,gen=0;const M={after:()=>{}};
const z=v=>Math.round(v*(A.narrow?1:1.1));
const put=(s,x,y,n,col,al,wt)=>{X.font=`${wt||700} ${z(n)}px system-ui,sans-serif`;X.fillStyle=col||Q.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y,A.W-14)};
function rows(s,w,n){X.font=`700 ${z(n)}px system-ui,sans-serif`;const r=[];let cur='';
 String(s).split(' ').forEach(t=>{const nx=cur?cur+' '+t:t;if(cur&&X.measureText(nx).width>w){r.push(cur);cur=t}else cur=nx});r.push(cur);return r}
function rr(x,y,w,h,bg,ln,lw,rad){A.paint.rrect(x,y,w,h,rad==null?9:rad);X.fillStyle=bg;X.fill();if(ln){X.lineWidth=lw||2;X.strokeStyle=ln;X.stroke()}}
function title(s,won){const R=rows(s,A.W-38,13),g=z(13)+4,h=Math.max(z(40),R.length*g+14);rr(10,8,A.W-20,h,won?Q.okBg:Q.hint,won?Q.ok:Q.edge);
 R.forEach((t,i)=>put(t,A.W/2,8+h/2+(i-(R.length-1)/2)*g,13,won?Q.ok:Q.ink));return 8+h}
const noteH=()=>M.say?rows('✓ '+M.say,A.W-42,13).length*(z(13)+5)+24:z(10);
function noteBox(){if(!M.say)return;const R=rows((M.bad?'✗ ':'✓ ')+M.say,A.W-42,13),g=z(13)+5,h=R.length*g+10,y=A.H-h-8;
 rr(10,y,A.W-20,h,Q.card,M.bad?Q.no:Q.ok,3);R.forEach((t,i)=>put(t,A.W/2,y+5+g*(i+.5),13,M.bad?Q.no:Q.ink))}
const tell=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const nope=s=>{M.bad=true;M.say=s;A.sound.miss();upd()};
const good=s=>{M.bad=false;M.say=s;A.sound.pop();upd()};
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* ---- step 0: carry matter round the cycle ---- */
function hop(to){if(M.won)return;const from=M.at;if(to===from)return;
 if(to!==(from+1)%4)return nope(WRONG[from+'-'+to]||'Not that way. Follow where the matter really goes next.');
 M.path.push(from);M.at=to;A.sound.tick();
 if(to===0&&M.path.length===4){M.won=true;return good('Back where it started. The same matter can go round again and again: it is never used up.')}
 good(`${ST[from].n} → ${ST[to].n}: ${HOP[from]}.`)}
function geo(){const top=z(60),cx=A.W/2,cy=top+(A.H-top-noteH())/2-z(6),rx=A.W/2-z(70),ry=Math.min((A.H-top-noteH())/2-z(34),A.W*.42);
 return [[cx,cy-ry],[cx+rx,cy],[cx,cy+ry],[cx-rx,cy]]}
function drawCycle(){title(M.won?'Matter cycles: air and soil → plant → animal → decomposers → air and soil.':'The dot is some matter. Tap where it goes next, all the way round.',M.won);
 const P=geo(),bw=z(118),bh=z(48);M.boxHit=[];
 for(let i=0;i<4;i++){const [x0,y0]=P[i],[x1,y1]=P[(i+1)%4],done=M.path.includes(i)&&(M.path.indexOf(i)<M.path.length);
  X.strokeStyle=done?ST[i].c:'#cbd5e1';X.lineWidth=done?4:2;X.setLineDash(done?[]:[6,6]);X.beginPath();X.moveTo(x0,y0);X.quadraticCurveTo((x0+x1)/2+(y1-y0)*.18,(y0+y1)/2-(x1-x0)*.18,x1,y1);X.stroke();X.setLineDash([]);
  if(done){const mx=(x0+x1)/2+(y1-y0)*.12,my=(y0+y1)/2-(x1-x0)*.12;X.fillStyle=ST[i].c;X.beginPath();X.arc(mx,my,z(9),0,7);X.fill();put(i+1,mx,my,11,'#fff')}}
 P.forEach(([x,y],i)=>{rr(x-bw/2,y-bh/2,bw,bh,ST[i].b,ST[i].c,M.at===i?4:2);put(ST[i].n,x,y-z(8),13,ST[i].c);put(ST[i].s,x,y+z(10),10,Q.dim,'center',600);M.boxHit.push({x:x-bw/2,y:y-bh/2,w:bw,h:bh})});
 const [dx,dy]=P[M.at];X.fillStyle=Q.ink;X.beginPath();X.arc(dx+bw/2-z(6),dy-bh/2+z(6),z(9),0,7);X.fill();X.strokeStyle='#fff';X.lineWidth=2;X.stroke()}
/* ---- step 1: rot a leaf pile ---- */
const KIND=['fungi','bacteria','worms'];
function addDec(i){if(M.won||M.kinds.includes(i))return;M.kinds.push(i);A.sound.tick();M.bad=false;M.say=`${KIND[i]} added. ${M.kinds.length} kind${M.kinds.length>1?'s':''} of decomposer at work.`;upd()}
function month(){if(M.won)return;if(!M.kinds.length)return nope('No decomposers, no rotting: dead leaves stay as they are. Add fungi, bacteria or worms.');
 const lost=M.leaf*.15*M.kinds.length;M.leaf-=lost;M.air+=lost*.7;M.soil+=lost*.3;M.m++;A.sound.tick();
 if(M.leaf<5){M.won=true;return good(`After ${M.m} months: ${M.leaf.toFixed(0)} g of leaves, ${M.soil.toFixed(0)} g in the soil, ${M.air.toFixed(0)} g to the air. Total still 100 g.`)}
 M.bad=false;M.say=`Month ${M.m}: leaves ${M.leaf.toFixed(0)} g + soil ${M.soil.toFixed(0)} g + air ${M.air.toFixed(0)} g = 100 g.`;upd()}
function drawRot(){const top=title(M.won?'Rotting does not destroy matter. It moves into the soil as nutrients and into the air as carbon dioxide and water.':'100 g of dead leaves. Add decomposers, then tap a month at a time until the leaves are nearly gone.',M.won);
 const base=A.H-noteH()-z(56),hmax=base-top-z(46),bw=(A.W-60)/3;M.monthHit={x:0,y:top,w:A.W,h:base-top};
 [['leaves',M.leaf,Q.leaf,Q.leafBg],['soil',M.soil,Q.soil,Q.soilBg],['air',M.air,Q.air,Q.airBg]].forEach(([n,v,col,bg],i)=>{const x=20+i*(bw+10),h=hmax*v/100;
  rr(x,base-hmax,bw,hmax,'#f8fafc','#cbd5e1',1,6);if(h>1)rr(x,base-h,bw,h,bg,col,2,6);put(`${v.toFixed(0)} g`,x+bw/2,base-Math.max(h,0)-z(12),14,col);put(n,x+bw/2,base+z(14),13,col)});
 put(`total ${(M.leaf+M.soil+M.air).toFixed(0)} g · month ${M.m}`,A.W/2,base+z(34),13,Q.ink);
 put(M.kinds.length?'at work: '+M.kinds.map(k=>KIND[k]).join(', '):'no decomposers yet',A.W/2,top+z(16),12,Q.rot)}
/* ---- step 2: two sealed gardens ---- */
function season(){if(M.won)return;M.s++;A.sound.tick();
 M.g.forEach((g,i)=>{const use=Math.min(3,g.n);g.n-=use;g.h+=use;g.dead+=use;g.last=use;if(i===0){g.n+=g.dead;g.dead=0}});
 const B=M.g[1];if(M.s>=6){M.won=true;return good(`Season 6. With decomposers the soil still has ${M.g[0].n} nutrient units. Without them it has ${B.n}, and ${B.dead} units are locked in dead leaves.`)}
 M.bad=false;M.say=`Season ${M.s}: garden A grew ${M.g[0].last}, garden B grew ${B.last}.`;upd()}
function drawGardens(){const top=title(M.won?'Without decomposers, nutrients get stuck in dead matter and the plants stop growing. Decomposers keep matter moving.':'Garden A has decomposers. Garden B has none. Both are sealed. Tap to run 6 seasons.',M.won);
 const base=A.H-noteH()-z(40),jw=(A.W-48)/2,jh=base-top-z(30);M.monthHit={x:0,y:top,w:A.W,h:base-top};
 M.g.forEach((g,i)=>{const x=16+i*(jw+16),y=base-jh;rr(x,y,jw,jh,'#f8fafc',Q.edge,2,14);const sh=jh*.22;rr(x+4,base-sh,jw-8,sh-4,Q.soilBg,Q.soil,1,8);
  put(`soil nutrients ${g.n}`,x+jw/2,base-sh/2,12,Q.soil);const ph=Math.min(jh*.55,z(16)+g.h*z(5));X.strokeStyle=Q.leaf;X.lineWidth=5;X.beginPath();X.moveTo(x+jw/2,base-sh);X.lineTo(x+jw/2,base-sh-ph);X.stroke();
  X.fillStyle=Q.leaf;for(let k=0;k<Math.min(8,Math.ceil(g.h/2));k++){X.beginPath();X.ellipse(x+jw/2+(k%2?9:-9),base-sh-ph*(k+1)/9,8,4,k%2?.5:-.5,0,7);X.fill()}
  for(let k=0;k<Math.min(12,g.dead);k++){X.fillStyle='#a16207';X.beginPath();X.ellipse(x+12+(k%6)*(jw-24)/6+6,base-sh-5-Math.floor(k/6)*7,7,3,0,0,7);X.fill()}
  put(i?'B: no decomposers':'A: decomposers',x+jw/2,y+z(14),12,i?Q.no:Q.ok);put(`dead leaves ${g.dead}`,x+jw/2,y+z(32),11,Q.dim,'center',600)});
 put(`season ${M.s} of 6`,A.W/2,base+z(16),13,Q.ink)}
/* ---- step 3: compost bin ---- */
function chooseItem(i){if(M.won||M.sorted[i]!=null)return;M.sel=i;A.sound.tick();M.bad=false;M.say=`${BIN[i][0]}: will decomposers break it down? Tap a bin.`;upd()}
function bin(b){if(M.won)return;if(M.sel==null)return nope('Tap an item first, then a bin.');const [n,r]=BIN[M.sel];
 if(r!==b)return nope(r?`${n} was once part of a living thing${n==='newspaper'||n==='wooden lolly stick'?' (a tree)':''}, so fungi and bacteria can feed on it.`:`${n==='plastic bag'?'Soft is not the same as rotting. Plastic is made from oil, and decomposers cannot feed on it':n+' was never alive, so decomposers cannot feed on it'}. It stays for hundreds of years or must be recycled.`);
 M.sorted[M.sel]=b;M.sel=null;if(M.sorted.every(v=>v!=null)){M.won=true;return good('Sorted. Things that were alive rot back into soil. Plastic, glass and metal do not.')}good('Yes. Next item.')}
function drawBin(){const top=title(M.won?'Decomposers only feed on things that were once alive. That is why compost works and plastic litter lasts.':'Will it rot in a compost bin? Tap an item, then a bin.',M.won);
 const bh=z(50),by=A.H-noteH()-bh-z(4);let y=top+z(8);const cw=(A.W-38)/2;M.itemHit=[];
 BIN.forEach(([n],i)=>{const col=i%2,x=14+col*(cw+10),s=M.sorted[i];rr(x,y,cw,z(30),s==null?(M.sel===i?Q.rotBg:Q.card):s?Q.soilBg:'#e2e8f0',M.sel===i?Q.rot:Q.edge,M.sel===i?3:1.5,7);
  put(n,x+cw/2,y+z(15),12,Q.ink,'center',600);M.itemHit.push({x,y,w:cw,h:z(30)});if(col)y+=z(36)});
 M.binHit=[1,0].map((b,k)=>{const x=14+k*(cw+10);rr(x,by,cw,bh,b?Q.soilBg:'#e2e8f0',b?Q.soil:Q.edge,2);put(b?'Rots':'Will not rot',x+cw/2,by+bh*.38,13,b?Q.soil:Q.ink);
  put(`${M.sorted.filter(v=>v===b).length} in here`,x+cw/2,by+bh*.72,11,Q.dim,'center',600);return{x,y:by,w:cw,h:bh,b}})}
/* ---- step 4: one carbon atom's trip ---- */
function proc(k){if(M.won)return;const want=HOW[M.t];
 if(PROC[k]!==want){const m={photosynthesis:'Photosynthesis takes carbon dioxide from the air into a leaf. This atom is not going from air into a plant.',eating:'Eating moves matter from food into an animal. Is anything being eaten here?',
  'breathing out':'Breathing out sends carbon dioxide back to the air. That is not this move.',decomposing:'Decomposing is a decomposer feeding on something dead.'}[PROC[k]];return nope(m)}
 M.t++;A.sound.tick();if(M.t===HOW.length){M.won=true;return good('Six moves, the same atom every time: matter is reused, not made or destroyed.')}good(`${TRIP[M.t-1]} → ${TRIP[M.t]}: ${want}.`)}
function drawTrip(){const top=title(M.won?'One carbon atom went through grass, a rabbit, an oak and a fungus, and was back in the air each time.':'Follow one carbon atom. Tap the process that moves it to the next place.',M.won);
 const n=TRIP.length,y0=top+z(18),gap=(A.H-noteH()-z(70)-y0)/(n-1);M.procHit=[];
 TRIP.forEach((t,i)=>{const y=y0+i*gap,x=A.W*.32,on=i<=M.t;rr(x-z(52),y-z(12),z(104),z(24),on?(t==='air'?Q.airBg:Q.leafBg):'#f1f5f9',on?Q.edge:'#cbd5e1',1.5,12);put(t,x,y,12,on?Q.ink:'#64748b');
  if(i<n-1){X.strokeStyle=i<M.t?Q.ok:'#cbd5e1';X.lineWidth=2;X.beginPath();X.moveTo(x,y+z(12));X.lineTo(x,y+gap-z(12));X.stroke();put(i<M.t?HOW[i]:'?',x+z(62),y+gap/2,11,i<M.t?Q.ok:Q.dim,'left')}
  if(i===M.t&&!M.won){X.fillStyle=Q.ink;X.beginPath();X.arc(x-z(64),y,z(7),0,7);X.fill()}});
 const py=A.H-noteH()-z(46),pw=(A.W-28-12)/4;PROC.forEach((p,k)=>{const x=14+k*(pw+4),R=rows(p==='photosynthesis'?'photo- synthesis':p,pw-6,10);rr(x,py,pw,z(40),Q.rotBg,Q.rot,2);R.forEach((t,j)=>put(t,x+pw/2,py+z(20)+(j-(R.length-1)/2)*z(12),10,Q.rot));M.procHit.push({x,y:py,w:pw,h:z(40),k})})}
/* ---- frame ---- */
const now=()=>['cycle','rot','garden','bin','trip','quiz'][A.step];
function down(p){const k=now();
 if(k==='cycle'){const i=(M.boxHit||[]).findIndex(r=>hit(p,r));if(i>=0){hop(i);return true}}
 if(k==='rot'&&hit(p,M.monthHit)){month();return true}
 if(k==='garden'&&hit(p,M.monthHit)){season();return true}
 if(k==='bin'){const i=(M.itemHit||[]).findIndex(r=>hit(p,r));if(i>=0){chooseItem(i);return true}const b=(M.binHit||[]).find(r=>hit(p,r));if(b){bin(b.b);return true}}
 if(k==='trip'){const r=(M.procHit||[]).find(r=>hit(p,r));if(r){proc(r.k);return true}}return false}
function draw(){X.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);X.fillRect(0,0,A.W,A.H);if(A.col.dark){X.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);X.fill()}
 const k=now();if(k==='cycle')drawCycle();if(k==='rot')drawRot();if(k==='garden')drawGardens();if(k==='bin')drawBin();if(k==='trip')drawTrip();
 if(k==='quiz'){title('Matter moves round: environment → plants → animals → decomposers → environment. It is reused, never used up.');put('air · soil · plants · animals · decomposers',A.W/2,A.H*.5,13,Q.leaf)}
 noteBox();A.fx.draw(X)}
function upd(){const k=now();let d='Challenge.';
 if(k==='cycle')d=`Matter is at ${ST[M.at].n}. ${M.path.length} of 4 moves made.`;
 if(k==='rot')d=`Month ${M.m}. Leaves ${M.leaf.toFixed(0)} g, soil ${M.soil.toFixed(0)} g, air ${M.air.toFixed(0)} g. Decomposers: ${M.kinds.map(i=>KIND[i]).join(', ')||'none'}.`;
 if(k==='garden')d=`Season ${M.s}. Garden A soil ${M.g[0].n}, dead ${M.g[0].dead}. Garden B soil ${M.g[1].n}, dead ${M.g[1].dead}.`;
 if(k==='bin')d=BIN.map(([n],i)=>`${n}: ${M.sorted[i]==null?(M.sel===i?'selected':'not sorted'):M.sorted[i]?'rots':'will not rot'}`).join('; ')+'.';
 if(k==='trip')d=`Carbon atom at ${TRIP[M.t]}, move ${M.t+1} of 6.`;
 tell((M.say?M.say+' ':'')+d);pads();M.after()}
function pads(){if(!keys)return;keys.innerHTML='';const k=now(),add=(l,f,a)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':a||null},keys,l).onclick=f};
 if(k==='cycle'&&!M.won)ST.forEach((s,i)=>{if(i!==M.at)add(s.n,()=>hop(i),'Move the matter to '+s.n)});
 if(k==='rot'&&!M.won){KIND.forEach((n,i)=>{if(!M.kinds.includes(i))add('Add '+n,()=>addDec(i))});add('One month',month,'Let one month pass')}
 if(k==='garden'&&!M.won)add('Next season',season);
 if(k==='bin'&&!M.won){BIN.forEach(([n],i)=>{if(M.sorted[i]==null)add(n,()=>chooseItem(i),'Pick '+n)});add('Rots',()=>bin(1),'Put it in the rots bin');add('Will not rot',()=>bin(0),'Put it in the will not rot bin')}
 if(k==='trip'&&!M.won)PROC.forEach((p,i)=>add(p,()=>proc(i),'The atom moves by '+p));A.redraw()}
const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const auto=(fns,ms)=>{const id=++gen;fns.forEach((f,j)=>setTimeout(()=>{if(id===gen)f()},(j+1)*(A.reduced()?30:ms)))};
function clean(){gen++;Object.assign(M,{after:()=>{},won:false,say:'',bad:false,at:0,path:[],leaf:100,soil:0,air:0,m:0,kinds:[],s:0,g:[{n:10,h:0,dead:0,last:0},{n:10,h:0,dead:0,last:0}],sorted:BIN.map(()=>null),sel:null,t:0})}
const rep=(f,n)=>Array.from({length:n},()=>f);
const steps=[
{h:'Round and round',p:'Plants, animals and decomposers pass matter between them and the air, water and soil.',
predict:{q:'When a rabbit dies, what happens to the matter in its body?',opts:['Decomposers break it down and it goes back to soil and air','It is used up and vanishes','It turns into energy and is gone'],ans:0},
task:'Carry the matter all the way round',show:()=>{steps[0].go();auto([()=>hop(1),()=>hop(2),()=>hop(3),()=>hop(0)],600)},go:()=>{clean();upd();M.after=fin(0,()=>M.won,'Full cycle.')}},
{h:'Rotting leaves',p:'Decomposers feed on dead leaves. Watch where the mass of the leaves goes.',
predict:{q:'As the leaves rot away, what happens to the total amount of matter?',opts:['It stays the same: it moves into soil and air','It goes down: rotting destroys it','It goes up: decomposers make new matter'],ans:0},
task:'Rot the leaf pile until it is nearly gone',show:()=>{steps[1].go();auto([()=>addDec(0),()=>addDec(1),()=>addDec(2)].concat(rep(month,6)),420)},go:()=>{clean();upd();M.after=fin(1,()=>M.won,'Still 100 g in total.')}},
{h:'Two gardens',p:'A sealed bottle garden gets no new matter from outside. It can only reuse what it has.',
predict:{q:'Garden B has no decomposers. What happens after a few seasons?',opts:['Dead leaves pile up and the plants run out of nutrients','Nothing changes','The plants grow better with no rotting'],ans:0},
task:'Run both gardens for 6 seasons',show:()=>{steps[2].go();auto(rep(season,6),560)},go:()=>{clean();upd();M.after=fin(2,()=>M.won,'Garden B stopped growing.')}},
{h:'Compost bin',p:'Decomposers can only feed on things that were once alive.',
task:'Sort all 8 things into the bins',show:()=>{steps[3].go();auto(BIN.flatMap(([,r],i)=>[()=>chooseItem(i),()=>bin(r)]),300)},go:()=>{clean();upd();M.after=fin(3,()=>M.won,'Sorted.')}},
{h:'One atom’s trip',p:'The same atoms get used again and again. Name the process at each move.',
task:'Take the carbon atom on all six moves',show:()=>{steps[4].go();auto(HOW.map(w=>()=>proc(PROC.indexOf(w))),600)},go:()=>{clean();upd();M.after=fin(4,()=>M.won,'Six moves.')}},
{h:'Challenge',p:'',go:()=>{clean();askQ()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>M.after()});
const BANK=MCDATA.bank,WRONG=MCDATA.wrong;
function why(tag){let m='Matter moves between living things and the environment and is reused. Follow where the atoms go.';
 if(tag==='vanish')m='Matter is not destroyed. When things rot, decomposers turn them into carbon dioxide, water and nutrients in the soil.';
 if(tag==='energyNotMatter')m='Energy and matter are different. Sunlight gives energy, but it adds no matter; rotting things turn into gases and soil, not into energy.';
 if(tag==='plantRole')m='That is what plants do. Decomposers feed on dead things and waste and return nutrients to the soil.';
 if(tag==='decomposersBad')m='Some microbes cause disease, but decomposers are vital: without them dead matter piles up and plants run out of nutrients.';
 if(tag==='plantsFromSoil')m='Soil gives a plant water and a little bit of minerals, but most of its mass comes from carbon dioxide in the air.';
 if(tag==='plasticRots')m='Decomposers only feed on things that were once alive. Plastic and metal were never alive, so they do not rot.';
 if(tag==='noCycle')m='Animals return matter too: they breathe out carbon dioxide, and their waste and dead bodies are broken down by decomposers.';
 return m}
function askQ(){qk++;const [q,right,wr]=BANK[qk%BANK.length],all=[[right,'ok']].concat(wr),r=qk%3,ord=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>score(tag,right)});tell('Challenge: '+q);A.redraw()}
let chain=0;
function score(tag,right){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=tag==='ok';
 if(ok){chain++;A.win()}else{chain=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+right+'. Streak: '+chain+'.':'✗ '+why(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=askQ}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:B=>{quiz.hidden=B.step!==5;keys.hidden=B.step===5;pads()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Matter cycle lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);A.gest({down})}}).start()})})();
