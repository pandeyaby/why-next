/* Flagship: Earth is made of rock (ages 5–7; NC England Y2–Y3 rocks and everyday materials, NGSS 2-ESS1-1 and 4-ESS2-1 weathering
   Earth's materials). Dig down through soil to solid rock, find rock in a landscape, break a boulder down to sand,
   sort hard and soft rocks from things that are not rock, and drill under a city, the sea and a desert. Tap, drag or use the buttons. */
(()=>{
const C={ink:'#1c1917',soft:'#44403c',paper:'#fbf7ef',ok:'#166534',okFill:'#dcfce7',bad:'#9f1239',hint:'#fff7ed',rim:'#292524',pick:'#1d4ed8',
 grass:'#4d7c0f',soil:'#a16207',soil2:'#854d0e',stone:'#a8a29e',rock:'#78716c',rockE:'#44403c',sky:'#e0f2fe',sea:'#0369a1',sand:'#fcd34d',leaf:'#15803d',cloud:'#ffffff'};
const LAYERS=[['Grass and soil','Soft soil with roots. Keep digging!',C.soil],['More soil','Still soil. It is darker down here.',C.soil2],['Stones in the soil','Bits of broken rock are mixed in.',C.stone],['Solid rock','Hard, solid rock! This rock goes down a very long way.',C.rock]];
const PLACES=[['mount','Mountain',1,'A mountain is a huge pile of rock.'],['cliff','Cliff',1,'A cliff is a wall of rock by the sea.'],['beach','Beach sand',1,'Sand is made of tiny bits of rock.'],['river','River pebbles',1,'Pebbles are rock, made smooth by water.'],
 ['tree','Tree',0,'A tree is a living plant. It grows from a seed, so it is not rock.'],['cloud','Cloud',0,'A cloud is made of tiny water drops in the air. It is not rock.']];
const BITS=[['Big rock (a boulder)','One huge rock.'],['Stones','Rain, ice and roots crack it into stones.'],['Pebbles','Rivers roll the stones until they are small and smooth.'],['Sand','Waves grind pebbles into tiny grains of sand. This takes many, many years.']];
const CARDS=[['Chalk',1,'Chalk is soft, but it is still rock. Rocks can be soft or hard.'],['Leaf',0,'A leaf grew on a tree. Living things are not rock.'],['Sand',1,'Sand is tiny bits of rock.'],['Wool',0,'Wool comes from a sheep, so it is not rock.'],
 ['Pebble',1,'A pebble is a small, smooth piece of rock.'],['Plastic cup',0,'People make plastic in factories. It is not rock.'],['Mountain stone',1,'Mountains are made of rock.']];
const SPOTS=[['city','Under a city',1,'Under the houses and roads: rock!'],['sea','Under the sea',1,'Under the water and the sea floor: rock!'],['sky','Up in the sky',0,'The sky is air, not rock. Earth’s rock is under our feet.'],['desert','Under a desert',1,'Under the sand: solid rock!']];
const QS=[['What is under the soil if you dig down a long way?','Solid rock',[['Nothing, it is empty','empty'],['Only more soil, forever','soil']]],
 ['What is sand made of?','Tiny bits of rock',[['Sugar','sugar'],['Tiny seeds','seed']]],
 ['Chalk is soft. Is chalk a rock?','Yes, rocks can be soft',[['No, rocks are always hard','hard'],['No, it is a plant','plant']]],
 ['What is under the sea floor?','Rock',[['Air','air'],['Nothing at all','empty']]],
 ['Where do pebbles come from?','Bigger rocks that broke up',[['They grow from seeds','seed'],['People make them','made']]],
 ['Which of these is not rock?','A leaf',[['A pebble','pebble'],['A mountain','mount']]]];
const WHY={empty:'Earth is not hollow. Dig down and you always reach solid rock.',soil:'Soil is only a thin top layer. Under it is solid rock.',sugar:'Sand does not dissolve like sugar. It is tiny bits of rock.',seed:'Rocks never grow. Pebbles and sand are pieces of bigger rocks.',
 hard:'Some rocks are hard, some are soft. Chalk is a soft rock.',plant:'Chalk never grew. It is a rock from the ground.',air:'Air is above the sea. Under the sea floor is rock.',made:'People do not make pebbles. Water wears big rocks into pebbles.',pebble:'A pebble is a piece of rock.',mount:'A mountain is a huge pile of rock.'};
VIS.reg('flagrock',c=>{let A,X,pad,quiz,qn=-1,run=0;const S={after:()=>{}};
const u=n=>Math.round(n*(A.narrow?1:1.12));
function say(s){c.say(s);A.cv.setAttribute('aria-label',s)}
function font(n,w){X.font=`${w||700} ${u(n)}px system-ui,sans-serif`}
function label(s,x,y,n,col,w){font(n,w);X.fillStyle=col||C.ink;X.textAlign='center';X.textBaseline='middle';X.fillText(s,x,y)}
function lines(s,maxW,n){font(n);const out=[];let row='';String(s).split(' ').forEach(w=>{const t=row?row+' '+w:w;if(row&&X.measureText(t).width>maxW){out.push(row);row=w}else row=t});out.push(row);return out}
function block(s,x,y,w,h,n,col){const L=lines(s,w-14,n),lh=u(n)+4;L.forEach((r,i)=>label(r,x+w/2,y+h/2+(i-(L.length-1)/2)*lh,n,col))}
function card(x,y,w,h,fill,edge,lw){A.paint.rrect(x,y,w,h,12);X.fillStyle=fill;X.fill();if(edge){X.lineWidth=lw||2;X.strokeStyle=edge;X.stroke()}}
const hit=(p,r)=>r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function top(s,won){const L=lines(s,A.W-44,14),lh=u(14)+4,h=Math.max(u(36),L.length*lh+14);card(12,10,A.W-24,h,won?C.okFill:C.hint,won?C.ok:C.rim,2);L.forEach((r,i)=>label(r,A.W/2,10+h/2+(i-(L.length-1)/2)*lh,14,won?C.ok:C.ink));return 10+h}
function foot(){if(!S.msg)return;const L=lines((S.bad?'✗ ':'✓ ')+S.msg,A.W-48,13),lh=u(13)+5,h=L.length*lh+12,y=A.H-h-10;card(12,y,A.W-24,h,'#ffffff',S.bad?C.bad:C.ok,3);L.forEach((r,i)=>label(r,A.W/2,y+6+lh*(i+.5),13,S.bad?C.bad:C.ink))}
const oops=s=>{S.bad=true;S.msg=s;A.sound.miss();sync()};
const good=s=>{S.bad=false;S.msg=s;A.sound.pop()};
const mode=()=>['dig','find','break','sort','drill','quiz'][A.step];
/* ---------- step 0: dig a hole ---------- */
function dig(){if(S.won)return;if(S.depth<LAYERS.length){S.depth++;const L=LAYERS[S.depth-1];good(L[0]+': '+L[1]);if(S.depth===LAYERS.length){S.won=true;S.msg='Solid rock! Under the soil, the ground is rock.'}}sync()}
function drawDig(t0,b0){const x0=u(20),w=A.W-2*u(20),gy=t0+u(30),lh=(b0-gy)/4;X.fillStyle=C.sky;X.fillRect(x0,t0+u(4),w,gy-t0-u(4));
 for(let i=0;i<4;i++){const y=gy+i*lh;if(i>=S.depth){X.fillStyle=i?'#d6d3d1':'#c4a484';X.fillRect(x0,y,w,lh);X.strokeStyle='#a8a29e';X.lineWidth=1;X.strokeRect(x0,y,w,lh);continue}X.fillStyle=LAYERS[i][2];X.fillRect(x0,y,w,lh);if(i===2){X.fillStyle='#d6d3d1';for(let k=0;k<14;k++){X.beginPath();X.ellipse(x0+((k*53)%w),y+lh*(.25+(k%3)*.25),u(7),u(5),k,0,7);X.fill()}}
  if(i===3){X.strokeStyle=C.rockE;X.lineWidth=2;for(let k=1;k<5;k++){X.beginPath();X.moveTo(x0+k*w/5,y);X.lineTo(x0+k*w/5-u(10),y+lh);X.stroke()}}}
 X.fillStyle=C.grass;X.fillRect(x0,gy-u(6),w,u(8));
 const hx=A.W*.5,hw=u(60),dd=S.depth*lh;X.fillStyle='#1c1917';X.fillRect(hx-hw/2,gy,hw,dd);
 for(let i=0;i<4;i++){const y=gy+i*lh,seen=i<S.depth;card(x0+u(8),y+lh/2-u(13),Math.min(u(170),w*.38),u(26),seen?'#ffffff':'#f5f5f4',C.rim,1.5);label(seen?LAYERS[i][0]:'?',x0+u(8)+Math.min(u(170),w*.38)/2,y+lh/2,12,C.ink)}
 const sy=gy+dd-u(4);X.strokeStyle='#57534e';X.lineWidth=u(6);X.lineCap='round';X.beginPath();X.moveTo(hx+u(26),sy-u(54));X.lineTo(hx+u(10),sy-u(6));X.stroke();X.fillStyle='#9ca3af';X.beginPath();X.moveTo(hx+u(2),sy-u(14));X.lineTo(hx+u(22),sy-u(6));X.lineTo(hx+u(8),sy+u(10));X.closePath();X.fill();
 S.digZone={x:x0,y:gy-u(20),w,h:b0-gy+u(20)}}
/* ---------- step 1: find the rock ---------- */
function find(k){if(S.won||S.got.has(k))return;const p=PLACES.find(q=>q[0]===k);if(!p[2])return oops(p[3]+' Find the rock.');S.got.add(k);good(p[1]+': '+p[3]);if(S.got.size===4){S.won=true;S.msg='Mountains, cliffs, sand and pebbles are all rock.'}sync()}
function drawFind(t0,b0){const x0=u(16),w=A.W-2*x0,h=b0-t0-u(8),y0=t0+u(4),sea=y0+h*.62;X.fillStyle=C.sky;X.fillRect(x0,y0,w,h);X.fillStyle=C.sea;X.fillRect(x0,sea,w,y0+h-sea);
 const R={};const g=(k,x,y,ww,hh)=>{R[k]={x,y,w:ww,h:hh};return R[k]};
 const m=g('mount',x0+w*.04,y0+h*.12,w*.36,h*.5);X.fillStyle=C.rock;X.beginPath();X.moveTo(m.x,m.y+m.h);X.lineTo(m.x+m.w*.5,m.y);X.lineTo(m.x+m.w,m.y+m.h);X.closePath();X.fill();X.fillStyle='#f5f5f4';X.beginPath();X.moveTo(m.x+m.w*.4,m.y+m.h*.2);X.lineTo(m.x+m.w*.5,m.y);X.lineTo(m.x+m.w*.6,m.y+m.h*.2);X.closePath();X.fill();
 const cl=g('cliff',x0+w*.74,y0+h*.3,w*.24,h*.5);X.fillStyle='#a8a29e';X.fillRect(cl.x,cl.y,cl.w,cl.h);X.strokeStyle=C.rockE;X.lineWidth=2;X.strokeRect(cl.x,cl.y,cl.w,cl.h);
 const be=g('beach',x0+w*.42,sea-h*.1,w*.3,h*.16);X.fillStyle=C.sand;X.beginPath();X.ellipse(be.x+be.w/2,be.y+be.h*.7,be.w/2,be.h*.6,0,0,7);X.fill();
 const rv=g('river',x0+w*.08,sea+h*.08,w*.3,h*.24);X.fillStyle='#7dd3fc';card(rv.x,rv.y,rv.w,rv.h,'#7dd3fc',null);X.fillStyle='#d6d3d1';for(let k=0;k<6;k++){X.beginPath();X.ellipse(rv.x+rv.w*(.15+k*.14),rv.y+rv.h*(k%2?.4:.65),u(8),u(5),0,0,7);X.fill()}
 const tr=g('tree',x0+w*.46,y0+h*.14,w*.12,h*.36);X.fillStyle='#78350f';X.fillRect(tr.x+tr.w*.42,tr.y+tr.h*.5,tr.w*.16,tr.h*.5);X.fillStyle=C.leaf;X.beginPath();X.arc(tr.x+tr.w/2,tr.y+tr.h*.32,Math.min(tr.w,tr.h)*.45,0,7);X.fill();
 const cd=g('cloud',x0+w*.6,y0+h*.03,w*.2,h*.14);X.fillStyle=C.cloud;X.strokeStyle='#94a3b8';X.lineWidth=1.5;[[.3,.6,.3],[.55,.45,.38],[.8,.62,.26]].forEach(([a,b,r])=>{X.beginPath();X.arc(cd.x+cd.w*a,cd.y+cd.h*b,cd.h*r*1.3,0,7);X.fill();X.stroke()});
 PLACES.forEach(([k,n])=>{const r=R[k],on=S.got.has(k);font(11);const tw=X.measureText((on?'✓ ':'')+n).width+14;card(r.x+r.w/2-tw/2,r.y+r.h-u(22),tw,u(20),on?C.okFill:'#ffffff',on?C.ok:C.rim,on?2.5:1.5);label((on?'✓ ':'')+n,r.x+r.w/2,r.y+r.h-u(12),11,on?C.ok:C.ink)});
 S.places=R}
/* ---------- step 2: break a boulder ---------- */
function crack(){if(S.won)return;S.size++;const b=BITS[S.size];good(b[0]+'. '+b[1]);if(S.size===3){S.won=true;S.msg='Big rocks break into stones, pebbles and sand. Sand is still rock.'}sync()}
function drawBreak(t0,b0){const cx=A.W/2,cy=(t0+b0)/2,R=Math.min(A.W*.3,(b0-t0)*.38),n=[1,6,24,160][S.size],rr=[R,R*.36,R*.16,R*.045][S.size];
 card(u(16),t0+u(4),A.W-u(32),b0-t0-u(8),'#f5f5f4',null);
 for(let i=0;i<n;i++){const a=i*2.4,d=n===1?0:R*Math.sqrt((i+.5)/n),x=cx+Math.cos(a)*d,y=cy+Math.sin(a)*d*.7;X.fillStyle=S.size===3?'#e7c66b':i%2?C.rock:'#a8a29e';X.strokeStyle=C.rockE;X.lineWidth=S.size===3?.5:2;X.beginPath();X.ellipse(x,y,rr,rr*.78,a,0,7);X.fill();if(S.size<3)X.stroke()}
 card(cx-u(110),b0-u(40),u(220),u(30),'#ffffff',C.rim,1.5);label(BITS[S.size][0],cx,b0-u(25),13,C.ink);S.rockZone={x:cx-R,y:cy-R,w:2*R,h:2*R}}
/* ---------- step 3: sort ---------- */
function drop(bin){if(S.won)return;const cd=CARDS[S.card];S.drag=null;if(bin!==cd[1])return oops(cd[2]);S.done.push(S.card);S.card++;good(cd[0]+': '+(cd[1]?'rock. ':'not rock. ')+cd[2]);if(S.card===CARDS.length){S.won=true;S.msg='Soft chalk and tiny sand are rock too. Living and made things are not.'}sync()}
function drawSort(t0,b0){const w=(A.W-u(48))/2,bh=Math.min(u(120),(b0-t0)*.42),by=b0-bh-u(4);S.bins=[{x:u(16),y:by,w,h:bh},{x:u(32)+w,y:by,w,h:bh}];
 [['Not rock',0],['Rock',1]].forEach(([n,i])=>{const r=S.bins[i];card(r.x,r.y,r.w,r.h,i?'#e7e5e4':'#ecfccb',C.rim,2);label(n,r.x+r.w/2,r.y+u(16),15,C.ink,800);
  const mine=S.done.filter(j=>CARDS[j][1]===i).map(j=>CARDS[j][0]);block(mine.join(', '),r.x,r.y+u(26),r.w,r.h-u(30),12,C.soft)});
 if(!S.won){const cd=CARDS[S.card],cw=Math.min(u(200),A.W*.6),ch=u(56),d=S.drag,x=d?d.x-cw/2:A.W/2-cw/2,y=d?d.y-ch/2:t0+u(20);S.cardBox={x:A.W/2-cw/2,y:t0+u(20),w:cw,h:ch};card(x,y,cw,ch,'#ffffff',C.pick,3);label(cd[0],x+cw/2,y+ch/2,17,C.ink,800);
  label('Drag it to a box, or tap a box.',A.W/2,t0+u(20)+ch+u(18),12,C.soft,600)}}
/* ---------- step 4: drill ---------- */
function drill(k){if(S.won||S.got.has(k))return;const s=SPOTS.find(q=>q[0]===k);if(!s[2])return oops(s[3]);S.got.add(k);good(s[3]);if(S.got.size===3){S.won=true;S.msg='Under cities, seas and deserts, the outside of Earth is rock all the way round.'}sync()}
function drawDrill(t0,b0){const n=SPOTS.length,gap=u(8),w=(A.W-u(32)-gap*(n-1))/n,h=b0-t0-u(8),y0=t0+u(4);S.cols=[];
 SPOTS.forEach(([k,name,isRock],i)=>{const x=u(16)+i*(w+gap),r={x,y:y0,w,h};S.cols.push(r);const surf=y0+h*.38,done=S.got.has(k);
  X.fillStyle=C.sky;X.fillRect(x,y0,w,h*.38);
  if(k==='city'){X.fillStyle='#64748b';[.15,.45,.7].forEach((a,j)=>X.fillRect(x+w*a,surf-h*(.12+j*.05),w*.18,h*(.12+j*.05)))}
  if(k==='sea'){X.fillStyle=C.sea;X.fillRect(x,y0+h*.2,w,h*.18)}
  if(k==='desert'){X.fillStyle=C.sand;X.beginPath();X.ellipse(x+w/2,surf,w*.6,h*.06,0,Math.PI,0);X.fill()}
  if(k==='sky'){X.fillStyle=C.cloud;X.strokeStyle='#94a3b8';X.beginPath();X.arc(x+w*.5,y0+h*.14,w*.18,0,7);X.fill();X.stroke()}
  if(k==='sky'){X.fillStyle=C.sky;X.fillRect(x,surf,w,y0+h-surf);[[.3,.55],[.65,.75]].forEach(([a,b])=>{X.strokeStyle=C.soft;X.lineWidth=2;X.beginPath();X.moveTo(x+w*a-u(8),y0+h*b);X.quadraticCurveTo(x+w*a,y0+h*b-u(7),x+w*a+u(8),y0+h*b);X.stroke()});
   card(x+u(3),y0+h-u(44),w-u(6),u(40),'#ffffff',C.rim,1.5);block(name,x+u(3),y0+h-u(44),w-u(6),u(40),10,C.ink);X.strokeStyle=C.rim;X.lineWidth=1.5;X.strokeRect(x,y0,w,h);return}
  X.fillStyle=done?C.rock:'#a8a29e';X.fillRect(x,surf,w,y0+h-surf);X.fillStyle=k==='desert'?C.sand:k==='sea'?'#d6d3d1':'#a16207';X.fillRect(x,surf,w,h*.06);
  if(done){X.fillStyle='#1c1917';X.fillRect(x+w/2-u(5),surf,u(10),h*.4);label('ROCK',x+w/2,surf+h*.48,13,'#ffffff',900)}else{X.fillStyle='#d6d3d1';X.fillRect(x,surf+h*.06,w,y0+h-surf-h*.06);label('?',x+w/2,surf+h*.3,20,C.soft,900)}
  card(x+u(3),y0+h-u(44),w-u(6),u(40),'#ffffff',done?C.ok:C.rim,done?2.5:1.5);block((done?'✓ ':'')+name,x+u(3),y0+h-u(44),w-u(6),u(40),10,done?C.ok:C.ink);
  X.strokeStyle=C.rim;X.lineWidth=1.5;X.strokeRect(x,y0,w,h)})}
function draw(){X.fillStyle=A.col.dark?'#292524':C.paper;X.fillRect(0,0,A.W,A.H);X.fillStyle=C.paper;A.paint.rrect(5,5,A.W-10,A.H-10,16);X.fill();
 const k=mode(),H={dig:['Dig down. What is under the soil?','You found solid rock!'],find:['Tap every place made of rock.','Rock is all around us.'],break:['Tap the rock to break it into smaller bits.','From one big rock to sand.'],
  sort:['Rock or not rock? Sort the cards.','Hard or soft, rock is rock.'],drill:['Drill down. Is there rock here?','Rock under every place on Earth.'],quiz:['Earth is made of rock.','']};
 const t=top(H[k][S.won?1:0]||H[k][0],S.won),bot=A.H-(S.msg?u(60):u(12));
 if(k==='dig')drawDig(t+u(4),bot);if(k==='find')drawFind(t+u(4),bot);if(k==='break')drawBreak(t+u(4),bot);if(k==='sort')drawSort(t+u(4),bot);if(k==='drill')drawDrill(t+u(4),bot);
 if(k==='quiz')block('Soil on top, solid rock below. Mountains, pebbles and sand are all rock.',u(20),t+u(10),A.W-u(40),bot-t-u(20),15,C.soft);
 foot();A.fx.draw(X)}
let p0=null;
function down(p){const k=mode();p0=p;
 if(k==='dig'&&hit(p,S.digZone)){dig();return true}
 if(k==='find'){const key=Object.keys(S.places||{}).find(q=>hit(p,S.places[q]));if(key){find(key);return true}}
 if(k==='break'&&hit(p,S.rockZone)){crack();return true}
 if(k==='sort'&&!S.won){if(hit(p,S.cardBox)){S.drag={x:p.x,y:p.y};A.redraw();return true}const b=(S.bins||[]).findIndex(r=>hit(p,r));if(b>=0){drop(b);return true}}
 if(k==='drill'){const i=(S.cols||[]).findIndex(r=>hit(p,r));if(i>=0){drill(SPOTS[i][0]);return true}}
 return false}
function move(p){if(!S.drag)return;S.drag.x=p.x;S.drag.y=p.y;A.redraw()}
function up(p){if(!S.drag)return;const b=S.bins.findIndex(r=>hit(p,r));S.drag=null;if(b>=0)drop(b);else A.redraw()}
function sync(){const k=mode();let d='Challenge.';
 if(k==='dig')d=`Dug ${S.depth} of 4 layers. ${S.depth?'Now showing: '+LAYERS[S.depth-1][0]+'.':'Only grass is showing.'}`;
 if(k==='find')d=`Found ${S.got.size} of 4 rock places. Places: mountain, cliff, beach sand, river pebbles, tree, cloud.`;
 if(k==='break')d=`Now: ${BITS[S.size][0]}. ${S.size} of 3 breaks done.`;
 if(k==='sort')d=S.won?'All 7 cards sorted.':`Card: ${CARDS[S.card][0]}. ${S.card} of 7 sorted.`;
 if(k==='drill')d=`Drilled ${S.got.size} of 3 rock places: under a city, under the sea, up in the sky, under a desert.`;
 say((S.msg?S.msg+' ':'')+d);keys();S.after()}
function keys(){if(!pad)return;pad.innerHTML='';const k=mode(),b=(s,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},pad,s).onclick=()=>{fn();sync()}};
 if(k==='dig'&&!S.won)b('Dig deeper',dig);
 if(k==='find'&&!S.won)PLACES.forEach(([q,n])=>{if(!S.got.has(q))b('Is it rock? '+n,()=>find(q))});
 if(k==='break'&&!S.won)b('Break the rock',crack);
 if(k==='sort'&&!S.won){b('Put in: Rock',()=>drop(1));b('Put in: Not rock',()=>drop(0))}
 if(k==='drill'&&!S.won)SPOTS.forEach(([q,n])=>{if(!S.got.has(q))b('Drill: '+n,()=>drill(q))});
 A.redraw()}
const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const auto=(fns,ms)=>{const id=++run;fns.forEach((f,j)=>setTimeout(()=>{if(id===run){f();sync()}},(j+1)*(A.reduced()?40:ms)))};
function fresh(){run++;Object.assign(S,{after:()=>{},won:false,msg:'',bad:false,depth:0,got:new Set(),size:0,card:0,done:[],drag:null})}
const steps=[
{h:'Dig down',p:'Grass grows in soil. But what is under the soil? Dig and see.',
predict:{q:'If you dig down and down, what do you find?',opts:['Only soil, forever','Solid rock','An empty space'],ans:1},
task:'Dig down 4 times',show:()=>{steps[0].go();auto([dig,dig,dig,dig],550)},go:()=>{fresh();sync();S.after=finish(0,()=>S.won,'Under the soil is solid rock.')}},
{h:'Rock is all around',p:'Rock is not only deep down. You can see it in many places, if you know where to look.',
predict:{q:'Is beach sand made of rock?',opts:['No, sand is like sugar','Yes, tiny bits of rock','No, sand grows'],ans:1},
task:'Tap the 4 places made of rock',show:()=>{steps[1].go();auto(['tree','mount','cliff','beach','river'].map(q=>()=>find(q)),600)},go:()=>{fresh();sync();S.after=finish(1,()=>S.won,'Four rock places.')}},
{h:'Big rocks, small bits',p:'Rain, ice, rivers and waves wear rock away. Slowly, over many years, big rocks break into smaller and smaller bits.',
predict:{q:'Where do pebbles come from?',opts:['They grow from seeds','Big rocks break up','People make them'],ans:1},
task:'Break the big rock 3 times',show:()=>{steps[2].go();auto([crack,crack,crack],700)},go:()=>{fresh();sync();S.after=finish(2,()=>S.won,'Boulder, stones, pebbles, sand.')}},
{h:'Hard or soft, still rock',p:'Most rocks are hard. Some rocks are soft, like chalk. Living things and things made in factories are not rock.',
predict:{q:'Chalk is soft. Is chalk a rock?',opts:['Yes, it is a soft rock','No, rocks are always hard','No, it grew'],ans:0},
task:'Sort all 7 cards',show:()=>{steps[3].go();auto(CARDS.map(cd=>()=>drop(cd[1])),420)},go:()=>{fresh();sync();S.after=finish(3,()=>S.won,'Rock can be hard or soft.')}},
{h:'Rock all the way round',p:'Earth is a giant ball. Its outside is rock, under the land and under the sea. Deep inside, it is very hot.',
predict:{q:'What is under the sea water and the sea floor?',opts:['Rock','Nothing at all','More air'],ans:0},
task:'Drill the 3 places with rock under them',show:()=>{steps[4].go();auto(['sky','city','sea','desert'].map(q=>()=>drill(q)),650)},go:()=>{fresh();sync();S.after=finish(4,()=>S.won,'Rock under city, sea and desert.')}},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.after()});
function next(){qn++;const [q,right,wrong]=QS[qn%QS.length],opts=[[right,'ok']].concat(wrong),sh=qn%3,ord=opts.slice(sh).concat(opts.slice(0,sh));
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>judge(tag,right)});say('Challenge: '+q);A.redraw()}
let wins=0;
function judge(tag,right){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=tag==='ok';let m=WHY[tag]||'Think: soil on top, rock below.';
 if(tag==='hard')m='Rocks can be hard or soft. Chalk is soft, and it is still a rock.';
 if(tag==='empty')m='Earth is not empty inside. Dig down, or look under the sea, and you reach rock.';
 if(tag==='seed')m='Rocks never grow from seeds. Sand and pebbles are broken bits of bigger rocks.';
 if(ok){wins++;A.win()}else{wins=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+right+'. In a row: '+wins+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=next}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:B=>{quiz.hidden=B.step!==5;pad.hidden=B.step===5;keys()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Rock lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
