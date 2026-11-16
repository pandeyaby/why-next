/* Flagship: protecting the ocean (ages 9–11; NC England Y4 'environments can change' and Y6 living things and habitats,
   NGSS 5-ESS3-1 how communities protect Earth's resources, 4-ESS3-1). Set a fishing catch and watch a fish stock last or crash,
   add a no-fishing zone and compare catches, clear plastic from a beach, turn up the CO₂ dial to see sea water grow more acidic,
   and match each threat to the protection that fixes it. Drag, tap, or use the buttons. All numbers come from simple models. */
(()=>{
const INK='#0f172a',GREY='#334155',PAPER='#f8fafc',OK='#166534',OKBG='#dcfce7',NO='#9f1239',NOTE='#fff7ed',LINE='#1e293b',BLUE='#1d4ed8',
 WATER='#bae6fd',DEEP='#0c4a6e',FISH='#c2410c',SANDY='#fde68a',REEF='#86efac';
/* fishing model: the fish left after the catch grow back by a quarter each year, up to 100 (all the sea can feed) */
const stock=c=>{let n=100,got=0;const ys=[n];for(let y=0;y<10;y++){const take=Math.min(n,c);got+=take;n=Math.min(100,(n-take)*1.25);ys.push(n)}return{ys,got,left:n}};
/* zone model: 5 zones of up to 100 fish grow r = 0.6; a no-fishing zone sends a quarter of its fish to its neighbours; other zones lose half to fishing */
function zones(z){let N=[50,50,50,50,50],got=0;for(let y=0;y<8;y++){N=N.map(n=>n+.6*n*(1-n/100));if(z!=null){const s=N[z]*.25,nb=[z-1,z+1].filter(i=>i>=0&&i<5);N[z]-=s;nb.forEach(i=>N[i]+=s/nb.length)}
 N=N.map((n,i)=>{if(i===z)return n;got+=n*.5;return n*.5})}return{N,got:Math.round(got),left:Math.round(N.reduce((a,b)=>a+b,0))}}
const LITTER=[['bottle','Plastic bottle',1],['shell','Sea shell',0],['bag','Plastic bag',1],['straw','Straw',1],['crab','Crab',0],['net','Old fishing net',1],['weed','Seaweed',0],['cup','Plastic cup',1],['lid','Bottle lid',1]];
const KEEP={shell:'Leave the shell. It is part of the beach, not litter.',crab:'Leave the crab! It lives here.',weed:'Seaweed is a living plant from the sea. It is food and shelter, not litter.'};
const DIAL=[[280,'Year 1800',8.2,'thick','Sea snails build strong shells.'],[420,'Today',8.1,'thinner','About 30% more acidic than in 1800. Shells are harder to build.'],[900,'Year 2100, if CO₂ keeps rising fast',7.8,'thin','Much more acidic. Shells can get thin and weak.']];
const BINS=['Overfishing','Plastic','CO₂ and acid sea','Does not help'];
const HELP=[['No-fishing zone',0],['Beach clean-up',1],['Countries agree to cut CO₂',2],['Let go of balloons at the beach',3],['Catch only what grows back',0],['Use a refill bottle',1],['Walk or cycle, not drive',2],['Catch the young fish too',3]];
const HELPWHY=['Fishing rules and no-fishing zones stop us taking more fish than grow back.','Less plastic and clean beaches stop plastic reaching the sea.','Burning less fuel puts less CO₂ in the air, so less soaks into the sea.','This does not help. It harms the ocean.'];
const ASK=[['What is a marine protected area?','A part of the sea where fishing is limited or banned',[['A beach where people swim','swim'],['A zoo for fish','zoo']]],
 ['What does sustainable fishing mean?','Taking only as many fish as can grow back',[['Catching as many as you can','max'],['Never eating fish','never']]],
 ['Why is a plastic bag dangerous for a sea turtle?','It looks like a jellyfish, so turtles eat it',[['It makes the water hot','hot'],['Turtles play with it','play']]],
 ['What happens when the sea soaks up more CO₂?','The water becomes more acidic',[['The water gets saltier','salt'],['Nothing happens','nothing']]],
 ['A no-fishing zone is set up. What often happens to fish next to it?','There are more, because fish swim out',[['They all die','die'],['Nothing changes','nothing']]],
 ['Which action cuts the CO₂ that makes the sea more acidic?','Countries agree to burn less fuel',[['A beach clean-up','clean'],['Bigger fishing nets','net']]]];
const WRONG={swim:'Swimming beaches are not the point. A protected area limits fishing and pollution so sea life can recover.',zoo:'Fish stay wild in the sea. The area is protected by rules, not walls.',
 max:'Catching as many as you can is overfishing. The fish run out, as they did in the lab at 30 a year.',never:'Sustainable fishing still catches fish, but only as many as grow back.',hot:'Plastic does not heat the water. The danger is that turtles mistake bags for jellyfish.',play:'Turtles eat jellyfish, and a floating bag looks like one. It can block their gut.',
 salt:'CO₂ does not add salt. It makes a weak acid in the water.',nothing:'Something does change. Look again at the lab.',die:'Fish in the zone are safe, and some swim out into the fished water nearby.',clean:'A clean-up removes plastic, but it does not cut CO₂.',net:'Bigger nets catch more fish. They do nothing for CO₂.'};
VIS.reg('flagmpa',c=>{let A,X,ui,quiz,qi=-1,tok=0;const G={after:()=>{}};
const k=n=>Math.round(n*(A.narrow?1:1.1));
const F=(n,w)=>`${w||700} ${k(n)}px system-ui,sans-serif`;
function put(t,x,y,n,col,w,al){X.font=F(n,w);X.fillStyle=col||INK;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(t),x,y)}
function chop(t,maxW,n){X.font=F(n);const rows=[];let cur='';String(t).split(' ').forEach(w=>{const nx=cur?cur+' '+w:w;if(cur&&X.measureText(nx).width>maxW){rows.push(cur);cur=w}else cur=nx});rows.push(cur);return rows}
function pill(x,y,w,h,bg,ln,lw,r){A.paint.rrect(x,y,w,h,r==null?10:r);X.fillStyle=bg;X.fill();if(ln){X.lineWidth=lw||2;X.strokeStyle=ln;X.stroke()}}
function inBox(t,r,n,col){const rows=chop(t,r.w-12,n),lh=k(n)+3;rows.forEach((s,i)=>put(s,r.x+r.w/2,r.y+r.h/2+(i-(rows.length-1)/2)*lh,n,col))}
const over=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function title(t,won){const rows=chop(t,A.W-44,14),lh=k(14)+4,h=Math.max(k(34),rows.length*lh+12);pill(10,8,A.W-20,h,won?OKBG:NOTE,won?OK:LINE,2);rows.forEach((s,i)=>put(s,A.W/2,8+h/2+(i-(rows.length-1)/2)*lh,14,won?OK:INK));return 8+h+k(6)}
function msgBox(){if(!G.msg)return;const rows=chop((G.bad?'✗ ':'✓ ')+G.msg,A.W-44,13),lh=k(13)+5,h=rows.length*lh+10,y=A.H-h-8;pill(10,y,A.W-20,h,'#ffffff',G.bad?NO:OK,3);rows.forEach((s,i)=>put(s,A.W/2,y+5+lh*(i+.5),13,G.bad?NO:INK))}
const wrong=t=>{G.bad=true;G.msg=t;A.sound.miss();refresh()},right=t=>{G.bad=false;G.msg=t;A.sound.pop()};
const now=()=>['catch','zone','beach','co2','match','quiz'][A.step];
function fishAt(x,y,s){X.fillStyle=FISH;X.beginPath();X.ellipse(x,y,s,s*.55,0,0,7);X.fill();X.beginPath();X.moveTo(x-s*.8,y);X.lineTo(x-s*1.5,y-s*.5);X.lineTo(x-s*1.5,y+s*.5);X.closePath();X.fill()}
/* ---- 0: how many fish can we take? ---- */
const ST={catch:(top,bot)=>{const L=k(42),R=A.W-k(16),cT=top+k(8),cB=bot-k(90),bw=(R-L)/11;pill(k(10),cT-k(4),A.W-k(20),cB-cT+k(26),'#ffffff',LINE,1.5,8);
  put('Fish',k(26),cT+k(6),11,GREY,700);put('100',k(26),cT+k(22),11,GREY,600);put('0',k(26),cB,11,GREY,600);
  const run=G.result;for(let y=0;y<=10;y++){const v=run?run.ys[y]:y?0:100,h=(cB-cT-k(16))*v/100,x=L+y*bw+2;X.fillStyle=v<20&&run?'#fca5a5':'#38bdf8';X.fillRect(x,cB-h,bw-4,h);if(!A.narrow||y%2===0)put(y,x+bw/2-2,cB+k(12),10,GREY,600)}
  put('Years →',R-k(30),cT+k(6),10,GREY,700);
  const tl=k(30),tr=A.W-k(30),ty=bot-k(28),kx=tl+(tr-tl)*G.c/40;X.strokeStyle=GREY;X.lineWidth=k(6);X.lineCap='round';X.beginPath();X.moveTo(tl,ty);X.lineTo(tr,ty);X.stroke();
  for(let v=0;v<=40;v+=10)put(v,tl+(tr-tl)*v/40,ty+k(18),10,GREY,600);X.fillStyle=BLUE;X.beginPath();X.arc(kx,ty,k(13),0,7);X.fill();put('Catch: '+G.c+' a year',A.W/2,ty-k(22),13,INK,800);
  G.track={x:tl-k(14),y:ty-k(18),w:tr-tl+k(28),h:k(36),l:tl,r:tr}},
/* ---- 1: a no-fishing zone ---- */
zone:(top,bot)=>{const w=(A.W-k(24))/5,h=bot-top-k(76),R=G.zr;G.cols=[];for(let i=0;i<5;i++){const x=k(12)+i*w,r={x,y:top,w,h,i};G.cols.push(r);X.fillStyle=i===2?'#a7f3d0':WATER;X.fillRect(x,top,w,h);
  if(i===2){X.fillStyle=REEF;X.fillRect(x,top+h*.82,w,h*.18)}const n=R?R.N[i]:50,dots=Math.round(n/10);for(let d=0;d<dots;d++)fishAt(x+w*(.3+(d%2)*.42),top+k(24)+Math.floor(d/2)*k(18),k(6));
  if(G.z===i){X.setLineDash([6,4]);X.strokeStyle=OK;X.lineWidth=3;X.strokeRect(x+2,top+2,w-4,h-4);X.setLineDash([]);pill(x+3,top+h-k(46),w-6,k(22),'#ffffff',OK,2,6);put('No fishing',x+w/2,top+h-k(35),10,OK,800)}
  put(R?Math.round(n):50,x+w/2,top+h-k(12),12,INK,800)}
  X.strokeStyle=LINE;X.lineWidth=1.5;X.strokeRect(k(12),top,w*5,h);
  const y=top+h+k(8),cw=(A.W-k(32))/2;[['No zone',G.runs.none],['With a zone',G.runs.zone]].forEach(([n,r],j)=>{const b={x:k(12)+j*(cw+k(8)),y,w:cw,h:k(60)};pill(b.x,b.y,b.w,b.h,'#ffffff',LINE,1.5,8);
   put(n,b.x+b.w/2,b.y+k(12),12,INK,800);put(r?`Caught ${r.got}`:'not run yet',b.x+b.w/2,b.y+k(31),12,GREY,700);if(r)put(`Fish left ${r.left}`,b.x+b.w/2,b.y+k(48),12,GREY,700)})},
/* ---- 2: clear the beach ---- */
beach:(top,bot)=>{const h=bot-top-k(8),sea=top+h*.25;X.fillStyle=WATER;X.fillRect(k(12),top,A.W-k(24),sea-top);X.fillStyle=SANDY;X.fillRect(k(12),sea,A.W-k(24),top+h-sea);
  const bin={x:A.W-k(86),y:top+h-k(66),w:k(70),h:k(58)};G.bin=bin;pill(bin.x,bin.y,bin.w,bin.h,'#1e3a8a',null,0,8);put('Bin',bin.x+bin.w/2,bin.y+k(16),12,'#ffffff',800);put(G.got.size+' / 6',bin.x+bin.w/2,bin.y+k(38),13,'#ffffff',800);
  X.fillStyle='#15803d';X.beginPath();X.ellipse(k(50),top+k(30),k(22),k(10),0,0,7);X.fill();put('Turtle',k(50),top+k(30),9,'#ffffff',800);
  G.spots=[];const cols=3,cw=(A.W-k(120))/cols,rh=(h*.75-k(16))/3;LITTER.forEach(([key,name],i)=>{if(G.got.has(key))return;const d=G.drag&&G.drag.key===key,r={x:k(18)+(i%cols)*cw,y:sea+k(8)+Math.floor(i/cols)*rh,w:cw-k(8),h:rh-k(8),key};G.spots.push(r);
   const px=d?G.drag.x-r.w/2:r.x,py=d?G.drag.y-r.h/2:r.y;pill(px,py,r.w,r.h,'#ffffff',LINE,1.5,10);inBox(name,{x:px,y:py,w:r.w,h:r.h},11,INK)})},
/* ---- 3: the CO₂ dial ---- */
co2:(top,bot)=>{const d=DIAL[G.lvl],tank={x:k(14),y:top,w:A.W*.55,h:bot-top-k(70)};X.fillStyle=G.lvl===0?'#7dd3fc':G.lvl===1?'#67b7c9':'#6b9e9e';X.fillRect(tank.x,tank.y+k(26),tank.w,tank.h-k(26));X.strokeStyle=LINE;X.lineWidth=2;X.strokeRect(tank.x,tank.y,tank.w,tank.h);
  put('Air: '+d[0]+' ppm CO₂',tank.x+tank.w/2,tank.y+k(13),12,INK,800);for(let i=0;i<[3,6,12][G.lvl];i++){X.fillStyle='#ffffff';X.beginPath();X.arc(tank.x+k(14)+(i*37)%(tank.w-k(28)),tank.y+k(40)+(i*23)%(tank.h-k(70)),k(4),0,7);X.fill()}
  const sx=tank.x+tank.w/2,sy=tank.y+tank.h*.62,th=[k(9),k(5),k(2)][G.lvl];X.strokeStyle='#f5f5f4';X.lineWidth=th;X.beginPath();for(let a=0;a<12;a+=.2){const r=k(4)+a*k(2.4);a?X.lineTo(sx+Math.cos(a)*r,sy+Math.sin(a)*r):X.moveTo(sx+r,sy)}X.stroke();
  pill(sx-k(52),tank.y+tank.h-k(30),k(104),k(22),'#ffffff',LINE,1.5,6);put('Shell: '+d[3],sx,tank.y+tank.h-k(19),11,INK,800);
  const mx=tank.x+tank.w+k(10),mw=A.W-mx-k(14);pill(mx,top,mw,tank.h,'#ffffff',LINE,1.5,8);put('Sea pH',mx+mw/2,top+k(14),12,INK,800);put('about '+d[2],mx+mw/2,top+k(36),16,INK,900);
  const my=top+k(54),mh=tank.h-k(70);X.fillStyle='#e2e8f0';X.fillRect(mx+mw/2-k(8),my,k(16),mh);const f=(8.3-d[2])/.6;X.fillStyle='#b45309';X.fillRect(mx+mw/2-k(8),my+mh*(1-f),k(16),mh*f);put('more acidic',mx+mw/2,my+mh+k(10),9,GREY,700);
  const tl=k(30),tr=A.W-k(30),ty=bot-k(38);X.strokeStyle=GREY;X.lineWidth=k(6);X.lineCap='round';X.beginPath();X.moveTo(tl,ty);X.lineTo(tr,ty);X.stroke();G.marks=DIAL.map((q,i)=>{const x=tl+(tr-tl)*i/2;put(q[0],x,ty+k(18),11,GREY,700);return{x:x-k(30),y:ty-k(24),w:k(60),h:k(48),i}});
  X.fillStyle=BLUE;X.beginPath();X.arc(G.knob!=null?G.knob:tl+(tr-tl)*G.lvl/2,ty,k(13),0,7);X.fill();G.dial={l:tl,r:tr,y:ty}},
/* ---- 4: match threats and helps ---- */
match:(top,bot)=>{const bw=(A.W-k(32))/2,bh=Math.min(k(86),(bot-top-k(90))/2);G.bins=BINS.map((n,i)=>{const r={x:k(12)+(i%2)*(bw+k(8)),y:bot-2*bh-k(10)+Math.floor(i/2)*(bh+k(6)),w:bw,h:bh,i};pill(r.x,r.y,r.w,r.h,i===3?'#fee2e2':'#e0f2fe',LINE,2,10);
   put(n,r.x+r.w/2,r.y+k(14),12,INK,800);inBox(G.placed.filter(j=>HELP[j][1]===i).map(j=>HELP[j][0]).join(' · '),{x:r.x,y:r.y+k(24),w:r.w,h:r.h-k(26)},10,GREY);return r});
  if(G.won)return;const cw=Math.min(k(240),A.W-k(40)),ch=k(50),d=G.drag,home={x:A.W/2-cw/2,y:top+k(6),w:cw,h:ch};G.card=home;const px=d?d.x-cw/2:home.x,py=d?d.y-ch/2:home.y;pill(px,py,cw,ch,'#ffffff',BLUE,3,10);inBox(HELP[G.next][0],{x:px,y:py,w:cw,h:ch},14,INK);
  put('Drag the card to the threat it helps, or tap a box.',A.W/2,top+ch+k(20),11,GREY,600)}};
function setCatch(v){G.c=Math.max(0,Math.min(40,Math.round(v/5)*5));G.result=null;G.msg='';refresh()}
function runCatch(){if(G.won)return;const r=stock(G.c);G.result=r;G.tries.add(G.c);const out=r.ys.findIndex(v=>v<1);
 if(out>0){G.bad=true;G.msg=`At ${G.c} a year the fish ran out in year ${out}. Only ${Math.round(r.got)} caught in all.`;A.sound.miss()}
 else if(r.got<150){right(`Fish are safe, but only ${Math.round(r.got)} caught in 10 years. Can you catch more and still keep the fish?`)}
 else{right(`${G.c} a year: ${Math.round(r.got)} caught and ${Math.round(r.left)} fish still there. That is about what grows back.`);G.won=true}refresh()}
function pickZone(i){if(G.won)return;G.z=G.z===i?null:i;G.zr=null;G.msg=G.z==null?'Zone removed.':`Zone ${i+1} is now a no-fishing zone. Run 8 years.`;G.bad=false;A.sound.tick();refresh()}
function runZones(){if(G.won)return;const r=zones(G.z);G.zr=r;if(G.z==null){G.runs.none=r;right(`No zone: ${r.got} caught, only ${r.left} fish left in the sea.`)}else{G.runs.zone=r;right(`With a zone: ${r.got} caught and ${r.left} fish left. Fish swim out of the zone into the fished water.`)}
 if(G.runs.none&&G.runs.zone){G.won=true;G.msg=`A zone gave a bigger catch (${G.runs.zone.got} vs ${G.runs.none.got}) and more fish left (${G.runs.zone.left} vs ${G.runs.none.left}).`}refresh()}
function grab(key){if(G.won||G.got.has(key))return;const it=LITTER.find(q=>q[0]===key);G.drag=null;if(!it[2])return wrong(KEEP[key]);G.got.add(key);right(it[1]+' in the bin. '+(key==='bag'?'Turtles mistake bags for jellyfish.':key==='net'?'Lost nets trap seals and fish.':'One less piece of plastic in the sea.'));
 if(G.got.size===6){G.won=true;G.msg='Beach clear! The shells, the crab and the seaweed stay.'}refresh()}
function setLvl(i){G.lvl=i;G.knob=null;G.seen.add(i);right(`${DIAL[i][1]}: ${DIAL[i][0]} ppm CO₂, sea pH about ${DIAL[i][2]}. ${DIAL[i][4]}`);if(G.seen.size===3){G.won=true;G.msg='More CO₂ in the air means more in the sea, so the water grows more acidic and shells get harder to build.'}refresh()}
function file(b){if(G.won)return;const [n,want]=HELP[G.next];G.drag=null;if(b!==want)return wrong(b===3?`“${n}” does help: ${HELPWHY[want]}`:want===3?`“${n}” does not help the ocean. It harms it.`:`“${n}” is not for “${BINS[b]}”. ${HELPWHY[want]}`);
 G.placed.push(G.next);G.next++;right(`${n}: ${want===3?'does not help.':BINS[want]+'.'}`);if(G.next===HELP.length){G.won=true;G.msg='Every threat has a fix: fishing rules, less plastic, and less CO₂.'}refresh()}
function draw(){X.fillStyle=A.col.dark?'#0f172a':PAPER;X.fillRect(0,0,A.W,A.H);X.fillStyle=PAPER;A.paint.rrect(5,5,A.W-10,A.H-10,16);X.fill();const s=now(),
 heads={catch:['Set the catch. Will the fish last 10 years?','Take only what grows back.'],zone:['Run 8 years with no zone, then add a no-fishing zone.','No-fishing zones help nearby fishing too.'],beach:['Tap or drag the litter into the bin.','Beach clear!'],
  co2:['Drag the CO₂ dial. Watch the sea and the shell.','More CO₂, more acidic sea.'],match:['Which threat does it help?','People can protect the ocean.'],quiz:['Fish limits, no-fishing zones, less plastic, less CO₂.','']};
 const t=title(heads[s][G.won?1:0]||heads[s][0],G.won),bot=A.H-(G.msg?k(62):k(12));if(ST[s])ST[s](t,bot);
 if(s==='quiz')inBox('The ocean can recover when people protect it.',{x:k(20),y:t,w:A.W-k(40),h:bot-t},15,GREY);msgBox();A.fx.draw(X)}
let p0=null;
function down(p){const s=now();p0=p;
 if(s==='catch'&&!G.won&&over(p,G.track)){G.slide=true;setCatch(40*(p.x-G.track.l)/(G.track.r-G.track.l));return true}
 if(s==='zone'){const r=(G.cols||[]).find(q=>over(p,q));if(r){pickZone(r.i);return true}}
 if(s==='beach'&&!G.won){const r=(G.spots||[]).find(q=>over(p,q));if(r){G.drag={key:r.key,x:p.x,y:p.y};A.redraw();return true}}
 if(s==='co2'&&!G.won&&G.dial&&Math.abs(p.y-G.dial.y)<k(30)){G.slide=true;G.knob=Math.max(G.dial.l,Math.min(G.dial.r,p.x));A.redraw();return true}
 if(s==='match'&&!G.won){if(over(p,G.card)){G.drag={x:p.x,y:p.y};A.redraw();return true}const b=(G.bins||[]).find(q=>over(p,q));if(b){file(b.i);return true}}
 return false}
function move(p){const s=now();if(s==='catch'&&G.slide)return setCatch(40*(p.x-G.track.l)/(G.track.r-G.track.l));if(s==='co2'&&G.slide){G.knob=Math.max(G.dial.l,Math.min(G.dial.r,p.x));return A.redraw()}if(G.drag){G.drag.x=p.x;G.drag.y=p.y;A.redraw()}}
function up(p){const s=now();if(s==='co2'&&G.slide){G.slide=false;const f=(G.knob-G.dial.l)/(G.dial.r-G.dial.l);setLvl(Math.round(f*2));return}G.slide=false;const d=G.drag;if(!d)return;
 if(s==='beach'){const tap=p0&&Math.hypot(p.x-p0.x,p.y-p0.y)<10;if(tap||over(p,G.bin))grab(d.key);else{G.drag=null;A.redraw()}return}
 if(s==='match'){const b=G.bins.find(q=>over(p,q));if(b)file(b.i);else{G.drag=null;A.redraw()}}}
function refresh(){const s=now();let d='Challenge.';
 if(s==='catch')d=`Catch set to ${G.c} fish a year, out of 100. ${G.result?'Last run: '+Math.round(G.result.got)+' caught, '+Math.round(G.result.left)+' left.':'Not run yet.'}`;
 if(s==='zone')d=`No-fishing zone: ${G.z==null?'none':'zone '+(G.z+1)}. Runs done: ${['none','zone'].filter(q=>G.runs[q]).length} of 2.`;
 if(s==='beach')d=`${G.got.size} of 6 pieces of litter in the bin. Left on the beach: ${LITTER.filter(q=>!G.got.has(q[0])).map(q=>q[1]).join(', ')}.`;
 if(s==='co2')d=`CO₂ dial at ${DIAL[G.lvl][0]} ppm. Sea pH about ${DIAL[G.lvl][2]}. Levels seen: ${G.seen.size} of 3.`;
 if(s==='match')d=G.won?'All 8 cards matched.':`Card: ${HELP[G.next][0]}. ${G.next} of 8 matched.`;
 const m=(G.msg?G.msg+' ':'')+d;c.say(m);A.cv.setAttribute('aria-label',m);keys();G.after()}
function keys(){if(!ui)return;ui.innerHTML='';const s=now(),b=(t,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},ui,t).onclick=()=>{fn();refresh()}};if(G.won)return A.redraw();
 if(s==='catch'){b('Catch 5 fewer',()=>setCatch(G.c-5));b('Catch 5 more',()=>setCatch(G.c+5));b('Run 10 years',runCatch)}
 if(s==='zone'){for(let i=0;i<5;i++)b(G.z===i?`Remove zone ${i+1}`:`No fishing in zone ${i+1}`,()=>pickZone(i));b('Run 8 years',runZones)}
 if(s==='beach')LITTER.forEach(([q,n])=>{if(!G.got.has(q))b('Pick up: '+n,()=>grab(q))});
 if(s==='co2')DIAL.forEach((q,i)=>b(`CO₂ ${q[0]} ppm (${q[1].split(',')[0]})`,()=>setLvl(i)));
 if(s==='match')BINS.forEach((n,i)=>b('Put in: '+n,()=>file(i)));
 A.redraw()}
const check=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const replay=(fns,ms)=>{const id=++tok;fns.forEach((f,j)=>setTimeout(()=>{if(id===tok){f();refresh()}},(j+1)*(A.reduced()?40:ms)))};
function clear(){tok++;Object.assign(G,{after:()=>{},won:false,msg:'',bad:false,c:30,result:null,tries:new Set(),z:null,zr:null,runs:{},got:new Set(),drag:null,slide:false,lvl:0,knob:null,seen:new Set([0]),next:0,placed:[]})}
const steps=[
{h:'Take only what grows back',p:'Start with 100 fish. Each year, the fish left grow back by a quarter, up to 100. This is a simple model of a real fish stock.',
predict:{q:'Is catching 30 of the 100 fish every year safe?',opts:['Yes, there are lots of fish','No, the fish run out','Only for big fish'],ans:1},
task:'Find a catch that keeps the fish and lands at least 150',show:()=>{steps[0].go();replay([runCatch,()=>setCatch(20),runCatch],800)},go:()=>{clear();refresh();G.after=check(0,()=>G.won,'Catch about what grows back.')}},
{h:'A no-fishing zone',p:'A marine protected area is a part of the sea with strict rules. In a no-fishing zone, nobody may fish. Fish grow big there, and some swim out.',
predict:{q:'Fishing is banned in one zone. What happens to the catch next to it?',opts:['It drops to zero','It often goes up','Nothing changes'],ans:1},
task:'Run 8 years with no zone, then with a zone',show:()=>{steps[1].go();replay([runZones,()=>pickZone(2),runZones],800)},go:()=>{clear();refresh();G.after=check(1,()=>G.won,'More fish and a bigger catch.')}},
{h:'Plastic in the sea',p:'Most plastic in the sea washes in from land. Beach clean-ups and using less plastic stop it reaching animals.',
predict:{q:'Why is a floating plastic bag a danger to a sea turtle?',opts:['It looks like a jellyfish','Turtles collect plastic','It makes the water warm'],ans:0},
task:'Put all 6 pieces of litter in the bin',show:()=>{steps[2].go();replay(['shell','bottle','bag','straw','net','cup','lid'].map(q=>()=>grab(q)),500)},go:()=>{clear();refresh();G.after=check(2,()=>G.won,'Six pieces out.')}},
{h:'CO₂ makes the sea more acidic',p:'Burning coal, oil and gas puts CO₂ in the air. The sea soaks up about a quarter of it. CO₂ in water makes a weak acid.',
predict:{q:'The sea soaks up more CO₂. What happens to the water?',opts:['It gets more acidic','It gets saltier','It gets colder'],ans:0},
task:'Turn the dial to all 3 CO₂ levels',show:()=>{steps[3].go();replay([()=>setLvl(1),()=>setLvl(2)],900)},go:()=>{clear();refresh();G.after=check(3,()=>G.won,'More CO₂, more acidic.')}},
{h:'Who helps the ocean?',p:'Each threat needs its own fix. Match each action to the threat it helps, or say it does not help.',
predict:{q:'Will a beach clean-up stop the sea getting more acidic?',opts:['Yes, it fixes everything','No, that needs less CO₂','Only in summer'],ans:1},
task:'Match all 8 cards',show:()=>{steps[4].go();replay(HELP.map(h=>()=>file(h[1])),400)},go:()=>{clear();refresh();G.after=check(4,()=>G.won,'A fix for each threat.')}},
{h:'Challenge',p:'',go:()=>{clear();pose()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>G.after()});
function pose(){qi++;const [q,ans,bad]=ASK[qi%ASK.length],all=[[ans,'ok']].concat(bad),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>mark(tag,ans)});c.say('Challenge: '+q);A.cv.setAttribute('aria-label','Challenge: '+q);A.redraw()}
let streak=0;
function mark(tag,ans){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=tag==='ok';let m=WRONG[tag]||'Think back to the lab.';
 if(tag==='max')m='Catching as many as you can is overfishing. In the lab, 30 a year emptied the sea in 5 years.';
 if(tag==='nothing')m='Something does change. More CO₂ makes the sea more acidic, and a no-fishing zone fills up with fish.';
 if(tag==='clean')m='Clean-ups fight plastic. To slow the acid sea, people must burn less fuel and put out less CO₂.';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+streak+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}
FK.shell(c,{steps,ratio:.68,tall:1.4,draw,onStep:B=>{quiz.hidden=B.step!==5;ui.hidden=B.step===5;keys()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);ui=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Ocean lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
