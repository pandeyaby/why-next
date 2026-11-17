/* Flagship: social insects, ants and bees (ages 7–9). Sort hive jobs between queen, workers and drones, follow one worker
   through her life, read three waggle dances on a field map, drag a scout ant home to lay a scent trail, sort colony
   insects from loners, judge three children, then a challenge. Data, drawings and screen-reader text are in colony_art.js. */
(()=>{
const {JOBS,WHO,LIFE,FLW,DANCE,TEAM,KIDS,QZ,WHY,H,bee,ant}=COLART;
const C={ink:'#111827',soft:'#374151',paper:'#fffbeb',line:'#1f2937',yes:'#166534',yesBg:'#dcfce7',no:'#9f1239',note:'#fef3c7',comb:'#fcd34d',grass:'#bbf7d0',soil:'#e7c9a0'};
VIS.reg('flagcolony',c=>{let A,X,ctl,quiz,qi=-1,run=0;const S={after:()=>{}};
const z=n=>Math.round(n*(A.narrow?1:1.12));
const speak=m=>{c.say(m);A.cv.setAttribute('aria-label',m)};
function wr(s,x,y,n,col,wt,al){X.font=`${wt||700} ${z(n)}px system-ui,sans-serif`;X.fillStyle=col||C.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y)}
function lines(s,w,n){X.font=`700 ${z(n)}px system-ui,sans-serif`;const out=[];let cur='';for(const word of String(s).split(' ')){const nx=cur?cur+' '+word:word;if(cur&&X.measureText(nx).width>w){out.push(cur);cur=word}else cur=nx}out.push(cur);return out}
function tile(x,y,w,h,fill,edge,lw){A.paint.rrect(x,y,w,h,10);X.fillStyle=fill;X.fill();if(edge){X.lineWidth=lw||2;X.strokeStyle=edge;X.stroke()}}
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const phase=()=>['jobs','age','dance','trail','team','kids','quiz'][A.step];
function banner(s,ok){const L=lines(s,A.W-44,14),lh=z(14)+4,h=Math.max(z(36),L.length*lh+14);tile(12,10,A.W-24,h,ok?C.yesBg:C.note,ok?C.yes:C.line);L.forEach((r,i)=>wr(r,A.W/2,10+h/2+(i-(L.length-1)/2)*lh,14,ok?C.yes:C.ink));return 10+h}
function verdict(){if(!S.msg)return;const L=lines((S.bad?'✗ ':'✓ ')+S.msg,A.W-48,13),lh=z(13)+5,h=L.length*lh+12,y=A.H-h-10;tile(12,y,A.W-24,h,'#ffffff',S.bad?C.no:C.yes,3);L.forEach((r,i)=>wr(r,A.W/2,y+6+lh*(i+.5),13,S.bad?C.no:C.ink))}
const oops=m=>{S.bad=true;S.msg=m;A.sound.miss();sync()};
const yes=m=>{S.bad=false;S.msg=m;A.sound.pop()};
/* sorting: jobs into queen / worker / drone, insects into colony / alone */
const deck=()=>phase()==='jobs'?JOBS:TEAM,BOX={jobs:WHO,team:['Lives in a colony','Lives alone']};
function drawDeck(t0,b0){const L=deck(),n=BOX[phase()].length,cw=Math.min(z(250),A.W*.78),ch=z(58),d=S.drag;S.card={x:A.W/2-cw/2,y:t0+z(8),w:cw,h:ch};
 const gap=z(10),bw=(A.W-z(24)-gap*(n-1))/n,bh=Math.min(z(170),b0-t0-ch-z(36)),by=b0-bh;
 S.bins=BOX[phase()].map((name,i)=>{const r={x:z(12)+i*(bw+gap),y:by,w:bw,h:bh,i};tile(r.x,by,bw,bh,['#fef9c3','#e0f2fe','#f3e8ff'][i],C.line,2);
  if(phase()==='jobs')bee(X,r.x+bw/2,by+z(26),z(i===0?11:9),i);lines(name,bw-z(12),13).forEach((ln,j)=>wr(ln,r.x+bw/2,by+z(phase()==='jobs'?52:18)+j*z(16),13,C.ink,900));
  const got=L.slice(0,S.k).filter(x=>(phase()==='jobs'?x[1]:x[1]?0:1)===i);got.forEach((x,j)=>lines(x[0],bw-z(10),10).forEach((ln,m,F)=>wr(ln,r.x+bw/2,by+z(phase()==='jobs'?70:46)+j*z(23)+(m-(F.length-1)/2)*z(12),10,C.yes,800)));return r});
 if(S.k>=L.length)return;const x=d?d.x-cw/2:S.card.x,y=d?d.y-ch/2:S.card.y;tile(x,y,cw,ch,'#ffffff',d?'#1d4ed8':C.line,d?3.5:2.5);const F=lines(L[S.k][0],cw-z(20),16);F.forEach((ln,j)=>wr(ln,x+cw/2,y+ch/2+(j-(F.length-1)/2)*z(19),16,C.ink,900))}
function drop(b){if(S.won)return;const L=deck(),it=L[S.k],want=phase()==='jobs'?it[1]:it[1]?0:1;
 if(b!==want)return oops(phase()==='jobs'?`Not the ${WHO[b].toLowerCase()}. ${it[2]}`:it[2]);
 S.k++;A.sound.tick();yes(`${it[0]}: ${BOX[phase()][b].toLowerCase()}.`);if(S.k>=L.length){S.won=true;S.msg=phase()==='jobs'?'One queen lays eggs, thousands of workers do the jobs, drones are the males.':'Ants, honeybees and bumblebees live in colonies. Most bees live alone.'}sync()}
/* a worker's life: drag her along the days, tap the jobs in order */
function drawLife(t0,b0){const x0=z(30),x1=A.W-z(30),ly=t0+z(40),day=S.day,dx=d=>x0+(x1-x0)*(d-1)/37,cur=LIFE.find(j=>day>=j[1]&&day<=j[2]);S.line={x0,x1,y:ly};
 LIFE.forEach((j,i)=>{X.fillStyle=['#fde68a','#fbcfe8','#fed7aa','#bfdbfe','#bbf7d0'][i];X.fillRect(dx(j[1]),ly-z(8),Math.min(x1,dx(j[2]+1))-dx(j[1]),z(16))});X.strokeStyle=C.line;X.lineWidth=2;X.strokeRect(x0,ly-z(8),x1-x0,z(16));
 [1,10,20,30,38].forEach(d=>wr('day '+d,dx(d),ly+z(20),10,C.soft,700));bee(X,dx(day),ly-z(22),z(10),1);S.knob={x:dx(day)-z(24),y:ly-z(44),w:z(48),h:z(56)};
 const hy=ly+z(48),hh=Math.max(z(80),(b0-hy)*.48),zones=[['Inside the hive',.5],['At the door',.2],['Out in the flowers',.3]];let zx=z(12);
 zones.forEach(([n,f],i)=>{const w=(A.W-z(24))*f,on=cur&&((i===0&&cur[3]==='inside')||(i===1&&cur[3]==='door')||(i===2&&cur[3]==='outside'));tile(zx,hy,w-z(6),hh,on?(i===2?C.grass:C.comb):'#f5f5f4',on?C.yes:C.line,on?3:1.5);
  lines(n,w-z(16),12).forEach((ln,j)=>wr(ln,zx+(w-z(6))/2,hy+z(16)+j*z(15),12,C.ink,900));if(on){wr(cur[0],zx+(w-z(6))/2,hy+hh/2+z(8),15,C.ink,900);bee(X,zx+(w-z(6))/2,hy+hh-z(18),z(9),1)}zx+=w});
 const cy=hy+hh+z(12),cw=(A.W-z(24))/LIFE.length;S.chips=LIFE.map((j,i)=>{const r={x:z(12)+i*cw+z(2),y:cy,w:cw-z(4),h:Math.min(z(54),b0-cy),i},got=S.seq.includes(i);tile(r.x,r.y,r.w,r.h,got?C.yesBg:'#ffffff',got?C.yes:C.line,2);
  lines(got?(S.seq.indexOf(i)+1)+'. '+j[0]:j[0],r.w-z(8),11).forEach((ln,m,F)=>wr(ln,r.x+r.w/2,r.y+r.h/2+(m-(F.length-1)/2)*z(13),11,C.ink,800));return r})}
function setDay(d){S.day=Math.max(1,Math.min(38,Math.round(d)));A.redraw();speak(COLART.say('age',S))}
function job(i){if(S.won||S.seq.includes(i))return;const want=[0,1,2,3,4].find(k=>!S.seq.includes(k));S.day=LIFE[i][1];
 if(i!==want)return oops(`Not yet. ${LIFE[i][0]} starts at day ${LIFE[i][1]}. Before that she must ${LIFE[want][0].toLowerCase()} (day ${LIFE[want][1]}).`);
 S.seq.push(i);A.sound.tick();yes(`Days ${LIFE[i][1]}–${LIFE[i][2]}: ${LIFE[i][0].toLowerCase()}.`);if(S.seq.length===5){S.won=true;S.msg='She works inside first and flies out for food last, at about 3 weeks old.'}sync()}
/* the waggle dance and the field */
function drawDance(t0,b0){const [ang,len]=DANCE[Math.min(S.k,2)],fx0=z(12),fw=A.W-z(24),hx=fx0+fw/2,hy=b0-z(26);tile(fx0,t0+z(4),fw,b0-t0-z(4),C.grass,C.line,1.5);
 const r=Math.min(z(54),A.W*.15),cx=fx0+z(10)+r,cy=t0+z(14)+r;X.fillStyle=C.comb;X.beginPath();X.arc(cx,cy,r,0,7);X.fill();X.strokeStyle=C.line;X.lineWidth=2;X.stroke();wr('↑ up',cx,cy-r+z(10),10,C.ink,900);wr('the comb',cx,cy+r+z(10),10,C.ink,800);
 const a=ang*Math.PI/180,L=r*.25+r*.62*len,ux=Math.sin(a),uy=-Math.cos(a);X.strokeStyle='#9a3412';X.lineWidth=2;X.setLineDash([4,4]);[-1,1].forEach(sd=>{X.beginPath();X.ellipse(cx-uy*sd*r*.18,cy+ux*sd*r*.18,L/2,r*.2,a-Math.PI/2,0,7);X.stroke()});X.setLineDash([]);
 X.strokeStyle='#7c2d12';X.lineWidth=4;X.beginPath();X.moveTo(cx-ux*L/2,cy-uy*L/2);for(let k=0;k<=10;k++){const f=k/10-.5,w=(k%2?1:-1)*z(4);X.lineTo(cx+ux*L*f-uy*w,cy+uy*L*f+ux*w)}X.stroke();bee(X,cx+ux*L/2,cy+uy*L/2,z(6),1);
 X.fillStyle='#facc15';X.beginPath();X.arc(hx,t0+z(24),z(13),0,7);X.fill();X.strokeStyle='#a16207';X.stroke();wr('sun',hx+z(26),t0+z(24),11,C.ink,900,'left');
 tile(hx-z(16),hy-z(12),z(32),z(24),C.comb,C.line,2);wr('hive',hx,hy+z(20),10,C.ink,900);const R=Math.min(fw*.8,hy-t0-z(66));X.strokeStyle='#a16207';X.lineWidth=1.5;X.setLineDash([6,6]);X.beginPath();X.moveTo(hx,hy-z(12));X.lineTo(hx,t0+z(38));X.stroke();X.setLineDash([]);
 S.flw=FLW.map((f,i)=>{const fa=f[1]*Math.PI/180,x=hx+Math.sin(fa)*R*f[3],y=hy-Math.cos(fa)*R*f[3]-z(14),got=S.read.includes(i);X.fillStyle=got?C.yes:['#db2777','#7c3aed','#ea580c'][i];
  for(let p=0;p<5;p++){X.beginPath();X.arc(x+Math.cos(p*1.26)*z(8),y+Math.sin(p*1.26)*z(8),z(6),0,7);X.fill()}X.fillStyle='#fde047';X.beginPath();X.arc(x,y,z(5),0,7);X.fill();
  i===1?wr(f[0],x+z(18),y,12,C.ink,900,'left'):f[1]?wr(f[0],x+z(12),y-z(22),12,C.ink,900,'right'):wr(f[0],x-z(18),y,12,C.ink,900,'right');return {x:x-z(28),y:y-z(26),w:z(56),h:z(52),i}})}
function readDance(i){if(S.won)return;const [ang,len,want]=DANCE[S.k],f=FLW[i];if(i!==want){
  if(f[1]!==ang)return oops(`The waggle run points ${ang?ang+'° right of straight up, so fly '+ang+'° right of the sun':'straight up, so fly towards the sun'}. ${f[0]} is the wrong way.`);
  return oops(`Right way, wrong distance. This waggle is ${len>.8?'long, so the food is far':'short, so the food is near'}. ${f[0]} is ${f[2]}.`)}
 S.read.push(i);S.k++;A.sound.tick();yes(`${f[0]}: ${f[1]?f[1]+'° right of the sun':'towards the sun'}, ${f[2]}.`);if(S.k>=3){S.won=true;S.msg='Angle from straight up = angle from the sun. Longer waggle = farther.'}sync()}
/* the scout ant lays a scent trail home */
const geoTrail=()=>({nx:z(50),ny:A.H*.72,fx:A.W-z(60),fy:A.H*.32});
function drawTrail(t0,b0){const g=geoTrail(),ny=Math.min(g.ny,b0-z(40)),fy=Math.max(g.fy,t0+z(40));tile(z(12),t0+z(4),A.W-z(24),b0-t0-z(4),C.soil,C.line,1.5);
 X.fillStyle='#78350f';X.beginPath();X.arc(g.nx,ny,z(26),Math.PI,0);X.fill();wr('nest',g.nx,ny+z(14),12,C.ink,900);X.fillStyle='#ef4444';X.beginPath();X.arc(g.fx,fy,z(16),0,7);X.fill();wr('food',g.fx,fy+z(28),12,C.ink,900);
 if(S.path.length>1){X.strokeStyle='rgba(126,34,206,'+(.25+.6*S.scent)+')';X.lineWidth=z(7);X.lineCap='round';X.beginPath();S.path.forEach((p,j)=>j?X.lineTo(p.x,p.y):X.moveTo(p.x,p.y));X.stroke();X.lineCap='butt'}
 S.marchers.forEach(f=>{const n=S.path.length;if(n<2)return;const at=Math.min(n-1,Math.floor(f*(n-1))),p=S.path[at],q2=S.path[Math.max(0,at-1)];ant(X,p.x,p.y,z(7),Math.atan2(p.y-q2.y,p.x-q2.x)+Math.PI)});
 const s=S.scout||{x:g.fx-z(22),y:fy};S.scoutBox={x:s.x-z(32),y:s.y-z(32),w:z(64)+(S.path.length?0:z(36)),h:z(64)};ant(X,s.x,s.y,z(10),0);if(!S.won&&!S.path.length)wr('scout',s.x,s.y-z(20),11,C.ink,900);
 S.nest={x:g.nx,y:ny};S.food={x:g.fx,y:fy}}
function stepScout(p){if(S.won||S.home)return;S.scout={x:p.x,y:p.y};S.path.push({x:p.x,y:p.y});const d0=Math.hypot(S.food.x-S.nest.x,S.food.y-S.nest.y),d=Math.hypot(p.x-S.nest.x,p.y-S.nest.y);S.walk=Math.max(S.walk,Math.min(1,1-d/d0));
 if(d<z(30)){S.home=true;S.walk=1;S.path.push({x:S.nest.x,y:S.nest.y});S.path.reverse();yes('Home! She left a scent trail all the way. Now watch the nest.');march()}A.redraw()}
function march(){const id=run;S.scent=1;let k=0;const tick=()=>{if(id!==run)return;k++;S.marchers=[0,1,2,3,4,5,6,7].map(j=>Math.max(0,Math.min(1,k/16-j*.12))).filter(f=>f>0);
  if(k<26){A.redraw();setTimeout(tick,A.reduced()?10:90)}else{S.won=true;S.msg='Each ant follows the scent and adds more, so the trail gets stronger.';sync()}};tick()}
function autoWalk(){if(S.home||S.won)return;const g=S.food,n=S.nest;for(let k=1;k<=12;k++){const f=k/12;stepScout({x:g.x+(n.x-g.x)*f,y:g.y+(n.y-g.y)*f-Math.sin(f*Math.PI)*z(40)})}}
/* who is right */
function drawPick(t0,b0){const [stem,opts]=KIDS[Math.min(S.k,2)],F=lines(stem,A.W-z(30),15);F.forEach((s,j)=>wr(s,A.W/2,t0+z(16)+j*z(19),15,C.ink,900));const y0=t0+z(10)+F.length*z(19),h=Math.min(z(70),(b0-y0)/3-z(6));
 S.opts=opts.map((o,i)=>{const r={x:z(16),y:y0+i*(h+z(6)),w:A.W-z(32),h,i};tile(r.x,r.y,r.w,h,'#ffffff',C.line,2);bee(X,r.x+z(24),r.y+h/2+z(4),z(8),1,['#fbbf24','#fb923c','#facc15'][i]);
  wr(o[0],r.x+z(46),r.y+z(14),12,C.ink,900,'left');lines(o[1],r.w-z(70),14).forEach((ln,j,L)=>wr(ln,r.x+z(46),r.y+h/2+z(6)+(j-(L.length-1)/2)*z(17),14,C.ink,700,'left'));return r})}
function judge(i){if(S.won)return;const o=KIDS[S.k][1][i];if(o[2])return oops(`${o[0]} is not right. ${o[2]}`);yes(`${o[0]} is right.`);S.k++;if(S.k>=3){S.won=true;S.msg='Queen lays, workers work, drones are male, and most bees live alone.'}sync()}
function draw(){X.fillStyle=A.col.dark?'#1f2937':C.paper;X.fillRect(0,0,A.W,A.H);X.fillStyle=C.paper;A.paint.rrect(5,5,A.W-10,A.H-10,16);X.fill();
 const g=phase(),y=banner(S.won?H[g][1]:H[g][0],S.won),b=A.H-(S.msg?z(70):z(12));
 if(g==='jobs'||g==='team')drawDeck(y,b);if(g==='age')drawLife(y,b);if(g==='dance')drawDance(y,b);if(g==='trail')drawTrail(y,b);if(g==='kids')drawPick(y+z(4),b);
 if(g==='quiz'){[0,1,2].forEach(i=>bee(X,A.W*(.3+i*.2),y+z(60),z(14),i));[0,1,2,3].forEach(i=>ant(X,A.W*(.25+i*.17),y+z(130),z(12),0))}verdict();A.fx.draw(X)}
function down(p){const g=phase();if(S.won&&g!=='quiz')return false;
 if(g==='jobs'||g==='team'){if(hit(p,S.card)){S.drag={x:p.x,y:p.y};A.redraw();return true}const r=(S.bins||[]).find(q=>hit(p,q));if(r){drop(r.i);return true}}
 if(g==='age'){if(hit(p,S.knob)||Math.abs(p.y-S.line.y)<z(26)){S.drag={day:1};setDay(1+37*(p.x-S.line.x0)/(S.line.x1-S.line.x0));return true}const r=(S.chips||[]).find(q=>hit(p,q));if(r){job(r.i);return true}}
 if(g==='dance'){const r=(S.flw||[]).find(q=>hit(p,q));if(r){readDance(r.i);return true}}
 if(g==='trail'&&hit(p,S.scoutBox)&&!S.home){S.drag={ant:1};S.path=[];return true}
 if(g==='kids'){const r=(S.opts||[]).find(q=>hit(p,q));if(r){judge(r.i);return true}}
 return false}
function move(p){const d=S.drag;if(!d)return;if(d.day)return setDay(1+37*(p.x-S.line.x0)/(S.line.x1-S.line.x0));if(d.ant)return stepScout(p);d.x=p.x;d.y=p.y;A.redraw()}
function up(p){const d=S.drag;S.drag=null;if(!d)return;if(d.ant&&!S.home){S.scout=null;S.path=[];S.walk=0;return oops('She got lost! Drag her all the way to the nest without letting go.')}
 if(!d.day&&!d.ant){const r=(S.bins||[]).find(q=>hit(p,q));if(r)return drop(r.i)}sync()}
function sync(){speak((S.msg?S.msg+' ':'')+COLART.say(phase(),S));buttons();S.after()}
function buttons(){if(!ctl)return;ctl.innerHTML='';const g=phase(),b=(s,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},ctl,s).onclick=()=>{fn();sync()}};
 if(!S.won){if(g==='jobs'||g==='team')BOX[g].forEach((n,i)=>b(n,()=>drop(i)));
  if(g==='age'){b('◀ Younger',()=>setDay(S.day-4));b('Older ▶',()=>setDay(S.day+4));LIFE.forEach((j,i)=>{if(!S.seq.includes(i))b(j[0],()=>job(i))})}
  if(g==='dance')FLW.forEach((f,i)=>{if(!S.read.includes(i))b(f[0],()=>readDance(i))});
  if(g==='trail'&&!S.home)b('Walk the scout home',autoWalk);
  if(g==='kids')KIDS[S.k][1].forEach((o,i)=>b(o[0]+' is right',()=>judge(i)))}
 A.redraw()}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const later=(fns,ms)=>{const id=++run;fns.forEach((f,j)=>setTimeout(()=>{if(id===run){f();sync()}},(j+1)*(A.reduced()?50:ms)))};
function reset(){run++;Object.assign(S,{after:()=>{},won:false,msg:'',bad:false,drag:null,k:0,day:1,seq:[],read:[],path:[],scout:null,home:false,walk:0,scent:0,marchers:[]})}
const auto=L=>L.map(x=>()=>drop(phase()==='jobs'?x[1]:x[1]?0:1));
const steps=[
{h:'Queen, workers and drones',p:'A honeybee hive is one big family. Each bee has a kind of job. Sort the jobs.',
predict:{q:'Which bees do most of the jobs in a hive?',opts:['The queen','The workers','The drones'],ans:1},
task:'Sort all 7 job cards',show:()=>{steps[0].go();later(auto(JOBS),380)},go:()=>{reset();sync();S.after=ready(0,()=>S.won,'Workers do almost everything.')}},
{h:'A worker grows up',p:'A worker bee lives about 5 or 6 weeks in summer. Her job changes as she gets older.',
predict:{q:'What is a brand-new worker bee’s first job?',opts:['Flying out for nectar','Cleaning cells inside','Laying eggs'],ans:1},
task:'Tap her 5 jobs in order',show:()=>{steps[1].go();later([0,1,2,3,4].map(i=>()=>job(i)),420)},go:()=>{reset();sync();S.after=ready(1,()=>S.won,'Inside first, out last.')}},
{h:'The waggle dance',p:'A bee who finds flowers comes home and dances on the comb. The dance tells the others where to fly.',
predict:{q:'How does the dance show how far away the flowers are?',opts:['By the colour of the bee','By how long the waggle is','It cannot show that'],ans:1},
task:'Read all 3 dances',show:()=>{steps[2].go();later(DANCE.map(d=>()=>readDance(d[2])),450)},go:()=>{reset();sync();S.after=ready(2,()=>S.won,'Way and distance read.')}},
{h:'Ants follow a scent trail',p:'A scout ant finds food. On her way home she leaves a smell on the ground. It is called a scent trail.',
task:'Bring the scout home to the nest',show:()=>{steps[3].go();later([autoWalk],300)},go:()=>{reset();sync();S.after=ready(3,()=>S.won,'The team found the food.')}},
{h:'Colony or alone?',p:'All ants live in colonies. Some bees do too. Many other insects, and most kinds of bee, live alone.',
task:'Sort all 6 insects',show:()=>{steps[4].go();later(auto(TEAM),380)},go:()=>{reset();sync();S.after=ready(4,()=>S.won,'Not every bee lives in a hive.')}},
{h:'Check the facts',p:'Three children talk about bees. Only one is right each time.',
task:'Find who is right 3 times',show:()=>{steps[5].go();later(KIDS.map(()=>()=>judge(KIDS[S.k][1].findIndex(o=>!o[2]))),450)},go:()=>{reset();sync();S.after=ready(5,()=>S.won,'Facts checked.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.after()});
let streak=0;
function ask(){qi++;const [qq,ok,bad]=QZ[qi%QZ.length],all=[[ok,'ok']].concat(bad),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=quiz.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},g,w).onclick=()=>mark(tag,ok)});speak('Challenge: '+qq);A.redraw()}
function mark(tag,ok){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),win=tag==='ok';let m=WHY[tag]||'One queen, many workers, a few drones.';
 if(tag==='eggs')m='Only the queen lays eggs. Workers fetch food, build, clean and guard; drones are the males.';
 if(tag==='age')m='A new worker starts with cleaning cells. She flies out for food last, at about 3 weeks old.';
 if(tag==='len')m='The length of the waggle shows the distance: the longer it is, the farther the flowers.';
 if(win){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${win?'✓ Yes: '+ok+'. In a row: '+streak+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:B=>{quiz.hidden=B.step!==6;ctl.hidden=B.step===6;buttons()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Ant and bee lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
