/* Flagship: asteroids, comets and dwarf planets (ages 7–9). Drop asteroids where most of them live, drag a comet round
   its long path and watch where its tail points, name a meteoroid, a meteor and a meteorite, run the planet test on six
   bodies, judge three children, then a challenge. Bodies, rules and screen-reader text are in comet_art.js. */
(()=>{
const {ORB,BELT,KUIPER,ZONE,STOPS,ROCKS,ROCKW,BODIES,BINS,RULES,KIDS,QZ,WHY,H}=CMART;
const C={ink:'#111827',sub:'#374151',paper:'#f8fafc',edge:'#1f2937',ok:'#166534',okBg:'#dcfce7',no:'#9f1239',hint:'#ede9fe',space:'#0f172a',rock:'#78716c',rockEdge:'#44403c',ice:'#e0f2fe',tail:'#7dd3fc',grab:'#7c3aed',air:'#bfdbfe',ground:'#4d7c0f',sun:'#f59e0b'};
VIS.reg('flagcomet',c=>{let A,X,pad,box,qn=-1,gen=0;const S={after:()=>{}};
const u=n=>Math.round(n*(A.narrow?1:1.15));
const announce=m=>{c.say(m);A.cv.setAttribute('aria-label',m)};
function write(s,x,y,n,col,w,al){X.font=`${w||700} ${u(n)}px system-ui,sans-serif`;X.fillStyle=col||C.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y)}
function lines(s,w,n){X.font=`700 ${u(n)}px system-ui,sans-serif`;const out=[];let cur='';for(const word of String(s).split(' ')){const t=cur?cur+' '+word:word;if(cur&&X.measureText(t).width>w){out.push(cur);cur=word}else cur=t}out.push(cur);return out}
function tile(x,y,w,h,fill,stroke,lw,r){A.paint.rrect(x,y,w,h,r||9);X.fillStyle=fill;X.fill();if(stroke){X.lineWidth=lw||2;X.strokeStyle=stroke;X.stroke()}}
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const stage=()=>['belt','comet','meteor','dwarf','kids','quiz'][A.step];
function head(s,ok){const L=lines(s,A.W-44,14),lh=u(14)+4,h=Math.max(u(36),L.length*lh+14);tile(12,10,A.W-24,h,ok?C.okBg:C.hint,ok?C.ok:C.edge);L.forEach((r,i)=>write(r,A.W/2,10+h/2+(i-(L.length-1)/2)*lh,14,ok?C.ok:C.ink));return 10+h}
function note(){if(!S.msg)return;const L=lines((S.bad?'✗ ':'✓ ')+S.msg,A.W-48,13),lh=u(13)+5,h=L.length*lh+12,y=A.H-h-10;tile(12,y,A.W-24,h,'#ffffff',S.bad?C.no:C.ok,3);L.forEach((r,i)=>write(r,A.W/2,y+6+lh*(i+.5),13,S.bad?C.no:C.ink))}
const miss=m=>{S.bad=true;S.msg=m;A.sound.miss();sync()};
const good=m=>{S.bad=false;S.msg=m;A.sound.pop()};
function disc(x,y,r,col){X.fillStyle=col;X.beginPath();X.arc(x,y,r,0,7);X.fill()}
/* a lumpy rock: radius wobbles with a fixed pattern so each rock keeps its shape */
function lump(x,y,r,seed,fill){X.fillStyle=fill||C.rock;X.strokeStyle=C.rockEdge;X.lineWidth=2;X.beginPath();for(let i=0;i<9;i++){const a=i/9*6.283,k=.72+.28*Math.abs(Math.sin(seed*3.1+i*1.7)),px=x+Math.cos(a)*r*k,py=y+Math.sin(a)*r*k;i?X.lineTo(px,py):X.moveTo(px,py)}X.closePath();X.fill();X.stroke()}
/* step: where asteroids live */
function drawBelt(t0,b0){const x0=u(30),x1=A.W-u(14),sy=t0+(b0-t0)*.36,px=f=>x0+f*(x1-x0);S.strip={x0,x1,sy};
 X.fillStyle=C.space;A.paint.rrect(10,t0+u(4),A.W-20,(b0-t0)*.62,12);X.fill();
 const bx=px(BELT[0]),bw=px(BELT[1])-bx;X.setLineDash([5,4]);X.strokeStyle='#fbbf24';X.lineWidth=2;X.strokeRect(bx,sy-u(30),bw,u(60));X.setLineDash([]);write('belt',bx+bw/2,sy-u(40),11,'#fde68a',800);
 for(let i=0;i<9;i++)disc(px(KUIPER)+((i*37)%u(22))-u(4),sy-u(22)+((i*23)%u(44)),2.2,C.ice);
 const placed=[{x:bx,y:sy-u(30),w:bw,h:u(60)},{x:bx,y:sy-u(48),w:bw,h:u(16)}];X.font=`800 ${u(A.narrow?9:11)}px system-ui,sans-serif`;
 const kw=X.measureText('Kuiper Belt').width;placed.push({x:x1-u(4)-kw,y:sy-u(50),w:kw,h:u(14)});write('Kuiper Belt',x1-u(4),sy-u(43),A.narrow?9:11,'#e0f2fe',800,'right');
 ORB.forEach(([nm,col,f],i)=>{const x=px(f),r=i===0?u(18):[0,4,5,6,5,12,10,8,8][i]*(A.narrow?.8:1)+2;disc(i===0?x-u(8):x,sy,r,col);if(!i)return;
  X.font=`800 ${u(A.narrow?9:11)}px system-ui,sans-serif`;const w=X.measureText(nm).width+4,lx=Math.min(x1-w,Math.max(14,x-w/2));
  const dy=[-1,1,-1.6,1.6,-2.2,2.2].map(k=>k*(r+u(10))).find(d=>{const R={x:lx,y:sy+d-u(7),w,h:u(14)};return !placed.some(o=>R.x<o.x+o.w+u(5)&&R.x+R.w+u(5)>o.x&&R.y<o.y+o.h&&R.y+R.h>o.y)})||-(r+u(10));
  placed.push({x:lx,y:sy+dy-u(7),w,h:u(14)});write(nm,lx+w/2,sy+dy,A.narrow?9:11,'#f8fafc',800)});
 for(let k=0;k<S.n;k++)lump(bx+bw*(.2+.3*k),sy+(k%2?u(12):-u(10)),u(6),k+1);
 const ty=b0-u(40);S.tray=[0,1,2].map(i=>{if(i<S.n)return null;const r={x:A.W/2+(i-1)*u(70)-u(24),y:ty-u(22),w:u(48),h:u(44),i};let x=r.x+r.w/2,y=r.y+r.h/2;if(S.drag==='rock'&&S.from===i&&S.dp){x=S.dp.x;y=S.dp.y}lump(x,y,u(15),i+4);return r});
 write('asteroids to place',A.W/2,ty+u(30),11,C.sub,800)}
function dropRock(f){if(S.won)return;if(f>=BELT[0]&&f<=BELT[1]){S.n++;A.sound.tick();if(S.n>=3){S.won=true;S.msg='Most asteroids are in the main belt, between Mars and Jupiter. Ceres, the biggest, is about 940 km across.';return sync()}good(`In the belt! ${3-S.n} more to place.`);return sync()}
 miss(f>KUIPER-.06?ZONE.outer:f>BELT[1]?ZONE.gas:ZONE.inner)}
/* step: a comet's tail */
function orbit(t0,b0){const hb=Math.min((b0-t0)/2-u(30),A.W*.2),a=Math.min(A.W*.33,hb/.55),b=a*.55,cx=A.W*.57,cy=(t0+b0)/2+u(6),f=Math.sqrt(a*a-b*b);return {a,b,cx,cy,sx:cx-f,sy:cy}}
const at=(O,th)=>({x:O.cx+O.a*Math.cos(th),y:O.cy+O.b*Math.sin(th)});
function tailOf(O,p){const dx=p.x-O.sx,dy=p.y-O.sy,d=Math.hypot(dx,dy),rn=d/O.a,len=rn<1.1?Math.min(O.a*.55,O.a*.5*(1/rn-1/1.1)):0;return {dx:dx/d,dy:dy/d,len,rn}}
function drawComet(t0,b0){const O=orbit(t0,b0);S.O=O;X.fillStyle=C.space;A.paint.rrect(10,t0+u(4),A.W-20,b0-t0-u(8),12);X.fill();
 X.setLineDash([4,5]);X.strokeStyle='#94a3b8';X.lineWidth=1.5;X.beginPath();X.ellipse(O.cx,O.cy,O.a,O.b,0,0,7);X.stroke();X.setLineDash([]);
 [.5,2.2,3.7,5.3].forEach(th=>{const p=at(O,th),q=at(O,th+.08),ang=Math.atan2(q.y-p.y,q.x-p.x);X.save();X.translate(q.x,q.y);X.rotate(ang);X.fillStyle='#cbd5e1';X.beginPath();X.moveTo(u(6),0);X.lineTo(-u(4),-u(4));X.lineTo(-u(4),u(4));X.fill();X.restore()});
 disc(O.sx,O.sy,u(13),C.sun);write('Sun',O.sx+u(4),O.sy-u(24),11,'#fde68a',800);
 STOPS.forEach(([th,lab],i)=>{const p=at(O,th),seen=S.seen.includes(i);X.strokeStyle=seen?'#86efac':'#fbbf24';X.lineWidth=2.5;X.beginPath();X.arc(p.x,p.y,u(17),0,7);X.stroke();write(seen?'✓ '+lab:lab,p.x,p.y+(i===2?-u(27):u(27)),11,seen?'#bbf7d0':'#fde68a',800)});
 const p=at(O,S.th),T=tailOf(O,p);S.tail=T.len;S.r=T.rn;S.knob={x:p.x-u(26),y:p.y-u(26),w:u(52),h:u(52)};
 if(T.len>0){X.fillStyle='rgba(125,211,252,.55)';X.beginPath();X.moveTo(p.x-T.dy*u(7),p.y+T.dx*u(7));X.lineTo(p.x+T.dx*T.len-T.dy*u(16),p.y+T.dy*T.len+T.dx*u(16));X.lineTo(p.x+T.dx*T.len+T.dy*u(16),p.y+T.dy*T.len-T.dx*u(16));X.lineTo(p.x+T.dy*u(7),p.y-T.dx*u(7));X.fill();disc(p.x,p.y,u(11),'rgba(224,242,254,.45)')}
 disc(p.x,p.y,u(7),'#e2e8f0');X.strokeStyle=C.grab;X.lineWidth=3;X.beginPath();X.arc(p.x,p.y,u(9),0,7);X.stroke()}
function setTh(th,check){if(S.won)return;S.th=((th%6.283)+6.283)%6.283;if(!check)return A.redraw();
 const i=STOPS.findIndex(([t])=>{const d=Math.abs(((S.th-t)%6.283+9.425)%6.283-3.1416);return d<.24});
 if(i<0||S.seen.includes(i))return sync();S.seen.push(i);A.sound.tick();
 if(S.seen.length>=3){S.won=true;S.msg='A comet’s tail grows near the Sun and always points away from it, pushed by sunlight and the solar wind. Even when the comet is leaving, the tail goes first.';return sync()}
 good(STOPS[i][2]);sync()}
function nearestTh(p){let best=S.th,bd=1e9;for(let k=0;k<120;k++){const th=k/120*6.283,q=at(S.O,th),d=Math.hypot(q.x-p.x,q.y-p.y);if(d<bd){bd=d;best=th}}return best}
/* step: meteoroid, meteor, meteorite */
function drawMeteor(t0,b0){const top=t0+u(4),bot=b0-u(64),spaceH=(bot-top)*.36,gy=bot-u(26);
 X.fillStyle=C.space;X.fillRect(10,top,A.W-20,spaceH);for(let i=0;i<4;i++){X.fillStyle=['#dbeafe','#bfdbfe','#93c5fd','#bae6fd'][i];X.fillRect(10,top+spaceH+(gy-top-spaceH)*i/4,A.W-20,(gy-top-spaceH)/4+1)}
 X.fillStyle=C.ground;X.fillRect(10,gy,A.W-20,bot-gy);write('space',u(36),top+u(12),11,'#e2e8f0',800);write('air',u(28),top+spaceH+u(12),11,C.ink,800);write('ground',u(40),gy+u(13),11,'#ffffff',800);
 const spots=[[A.W*.18,top+spaceH*.55,u(15)],[A.W*.45,top+spaceH+(gy-top-spaceH)*.5,u(10)],[A.W*.8,gy-u(6),u(6)]];
 X.strokeStyle='#ea580c';X.lineWidth=u(6);X.lineCap='round';X.beginPath();X.moveTo(spots[1][0]-u(40),spots[1][1]-u(46));X.lineTo(spots[1][0],spots[1][1]);X.stroke();X.lineCap='butt';disc(spots[1][0],spots[1][1],u(15),'rgba(251,146,60,.6)');
 S.spots=spots.map(([x,y,r],i)=>{lump(x,y,r,i+2,i===1?'#fb923c':C.rock);const bw=u(86),by=i===0?y-u(13):i===2?y-u(52):y+r+u(8),bx=Math.max(14,Math.min(A.W-14-bw,i===0?x+r+u(10):i===1?x-bw*.7:x-bw/2)),bb={x:bx,y:by,w:bw,h:u(26),i};
  if(S.lab[i]==null){X.setLineDash([4,4]);tile(bx,by,bw,bb.h,'rgba(255,255,255,.92)',C.edge,1.5);X.setLineDash([]);write('?',bx+bw/2,by+bb.h/2,13,C.ink,900)}else{tile(bx,by,bw,bb.h,C.okBg,C.ok,2);write(ROCKS[S.lab[i]][0],bx+bw/2,by+bb.h/2,12,C.ok,900)}
  return {x:Math.min(bx,x-r-u(10)),y:Math.min(by,y-r-u(10)),w:Math.max(bw,2*r+u(20)),h:Math.abs(by-y)+r+bb.h+u(20),i}});
 const free=[0,1,2].filter(v=>!S.lab.includes(v)),tw=(A.W-u(40))/3;S.tags=free.map((v,j)=>{const r={x:u(14)+j*(tw+u(6)),y:b0-u(52),w:tw,h:u(40),v};let x=r.x,y=r.y;if(S.drag==='tag'&&S.from===v&&S.dp){x=S.dp.x-tw/2;y=S.dp.y-r.h/2}tile(x,y,tw,r.h,'#ffffff',C.grab,2.5);write(ROCKS[v][0],x+tw/2,y+r.h/2,A.narrow?12:13,C.ink,900);return r})}
function name(spot,v){if(S.won||S.lab[spot]!=null)return;if(spot!==v)return miss(ROCKW[`${spot}-${v}`]);S.lab[spot]=v;A.sound.tick();
 if(S.lab.every(x=>x!=null)){S.won=true;S.msg='Meteoroid in space, meteor while it burns in the air, meteorite once it lands. Most meteoroids burn up long before they reach the ground.';return sync()}
 good(`Yes: ${ROCKS[v][1]} is a ${ROCKS[v][0].toLowerCase()}.`);sync()}
/* step: the planet test */
function drawDwarf(t0,b0){const sel=BODIES[S.sel],ph=u(58);tile(12,t0+u(4),A.W-24,ph,'#ffffff',C.edge,2);
 if(sel){write(sel[0],A.W/2,t0+u(17),13,C.ink,900);const w=(A.W-u(40))/3;RULES.forEach((r,i)=>{const ok=sel[i+1],x=u(18)+i*(w+u(2));tile(x,t0+u(28),w-u(2),u(28),ok?C.okBg:'#ffe4e6',ok?C.ok:C.no,1.5,7);lines((ok?'✓ ':'✗ ')+r,w-u(8),10).forEach((ln,j,L)=>write(ln,x+(w-u(2))/2,t0+u(42)+(j-(L.length-1)/2)*u(12),10,ok?C.ok:C.no,800))})}
 else write('Tap a body to run the 3 planet tests',A.W/2,t0+u(33),12,C.sub,800);
 const cw=(A.W-u(48))/3,ch=u(40),y0=t0+ph+u(14),left=BODIES.map((b,i)=>i).filter(i=>!S.sorted.includes(i));
 S.cards=left.map((i,j)=>{const r={x:u(14)+(j%3)*(cw+u(10)),y:y0+Math.floor(j/3)*(ch+u(8)),w:cw,h:ch,i};let x=r.x,y=r.y;if(S.drag==='body'&&S.from===i&&S.dp&&S.moved){x=S.dp.x-cw/2;y=S.dp.y-ch/2}
  tile(x,y,cw,ch,S.sel===i?'#ede9fe':'#ffffff',S.sel===i?C.grab:C.edge,S.sel===i?3:2);lines(BODIES[i][0],cw-u(8),12).forEach((ln,k,L)=>write(ln,x+cw/2,y+ch/2+(k-(L.length-1)/2)*u(14),12,C.ink,900));return r});
 const bh=Math.min(u(74),b0-(y0+2*(ch+u(8)))-u(8)),bw=(A.W-u(48))/3,by=b0-bh-u(4);S.bins=BINS.map((nm,k)=>{const r={x:u(14)+k*(bw+u(10)),y:by,w:bw,h:bh,k};tile(r.x,r.y,bw,bh,'#f1f5f9',C.edge,2);write(nm,r.x+bw/2,by+u(13),12,C.ink,900);
  S.sorted.filter(i=>BODIES[i][4]===k).forEach((i,j)=>write(BODIES[i][0],r.x+bw/2,by+u(31)+j*u(14),10,C.ok,800));return r})}
function place(i,k){if(S.won||S.sorted.includes(i))return;S.sel=i;const b=BODIES[i];if(b[4]!==k)return miss(`Not ${BINS[k].toLowerCase()}. ${b[5]}`);S.sorted.push(i);A.sound.tick();
 if(S.sorted.length>=BODIES.length){S.won=true;S.msg='A planet passes all 3 tests. A dwarf planet, like Pluto or Ceres, is round and goes round the Sun but shares its path.';return sync()}
 good(b[5]);sync()}
/* who is right */
function drawKids(t0,b0){const [q,opts]=KIDS[Math.min(S.k,2)],L=lines(q,A.W-u(30),15);L.forEach((s,j)=>write(s,A.W/2,t0+u(16)+j*u(19),15,C.ink,900));const y0=t0+u(12)+L.length*u(19),h=Math.min(u(70),(b0-y0)/3-u(6));
 S.opts=opts.map((o,i)=>{const r={x:u(16),y:y0+i*(h+u(6)),w:A.W-u(32),h,i};tile(r.x,r.y,r.w,h,'#ffffff',C.edge,2);disc(r.x+u(26),r.y+h/2,u(15),['#ddd6fe','#fde68a','#bbf7d0'][i]);write(o[0].slice(0,4),r.x+u(26),r.y+h/2,10,C.ink,900);
  lines(o[1],r.w-u(70),14).forEach((ln,j,LL)=>write(ln,r.x+u(52),r.y+h/2+(j-(LL.length-1)/2)*u(17),14,C.ink,700,'left'));return r})}
function judge(i){if(S.won)return;const o=KIDS[S.k][1][i];if(o[2])return miss(`${o[0]} is not right. ${o[2]}`);good(`${o[0]} is right.`);S.k++;if(S.k>=3){S.won=true;S.msg='Comets are ice, dust and rock; Pluto shares its path; a shooting star is a burning space rock.'}sync()}
function draw(api,dt){X.fillStyle=A.col.dark?'#1f2937':C.paper;X.fillRect(0,0,A.W,A.H);X.fillStyle=C.paper;A.paint.rrect(5,5,A.W-10,A.H-10,16);X.fill();
 const g=stage(),y=head(S.won?H[g][1]:H[g][0],S.won),b=A.H-(S.msg?lines('✓ '+S.msg,A.W-48,13).length*(u(13)+5)+u(26):u(12));
 if(g==='belt')drawBelt(y,b);if(g==='comet')drawComet(y,b);if(g==='meteor')drawMeteor(y,b);if(g==='dwarf')drawDwarf(y,b);if(g==='kids')drawKids(y+u(4),b);
 if(g==='quiz'){const O=orbit(y,b);disc(O.sx,O.sy,u(14),C.sun);const p=at(O,4.2),T=tailOf(O,p);X.fillStyle='rgba(125,211,252,.7)';X.beginPath();X.moveTo(p.x,p.y);X.lineTo(p.x+T.dx*T.len-T.dy*u(14),p.y+T.dy*T.len+T.dx*u(14));X.lineTo(p.x+T.dx*T.len+T.dy*u(14),p.y+T.dy*T.len-T.dx*u(14));X.fill();disc(p.x,p.y,u(7),'#94a3b8');lump(A.W*.8,y+u(50),u(14),3)}
 note();A.fx.draw(X)}
const hit=(L,p)=>(L||[]).find(r=>r&&inside(p,r));
function down(p){const g=stage();if(S.won&&g!=='quiz')return false;
 if(g==='belt'){const r=hit(S.tray,p);if(r){S.drag='rock';S.from=r.i;S.dp=p;return true}}
 if(g==='comet'&&inside(p,S.knob)){S.drag='comet';return true}
 if(g==='meteor'){const r=hit(S.tags,p);if(r){S.drag='tag';S.from=r.v;S.dp=p;return true}}
 if(g==='dwarf'){const r=hit(S.cards,p);if(r){S.drag='body';S.from=r.i;S.sel=r.i;S.dp=p;S.p0=p;S.moved=false;sync();return true}}
 if(g==='kids'){const r=hit(S.opts,p);if(r){judge(r.i);return true}}
 return false}
function move(p){if(!S.drag)return;S.dp=p;if(S.drag==='comet')return setTh(nearestTh(p),1);if(S.drag==='body'&&Math.hypot(p.x-S.p0.x,p.y-S.p0.y)>u(8))S.moved=true;A.redraw()}
function up(p){const d=S.drag;if(!d)return;S.drag=null;const q=p||S.dp;S.dp=null;
 if(d==='rock'){const st=S.strip;if(q&&Math.abs(q.y-st.sy)<u(60)&&q.x>st.x0)return dropRock((q.x-st.x0)/(st.x1-st.x0));return sync()}
 if(d==='tag'){const r=q&&hit(S.spots,q);if(r)return name(r.i,S.from);return sync()}
 if(d==='body'){const mv=S.moved;S.moved=false;const r=mv&&q&&hit(S.bins,q);if(r)return place(S.from,r.k);return sync()}
 sync()}
function sync(){announce((S.msg?S.msg+' ':'')+CMART.say(stage(),S));buttons();S.after()}
function buttons(){if(!pad)return;pad.innerHTML='';const g=stage(),b=(s,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},pad,s).onclick=()=>{fn();sync()}};
 if(!S.won){if(g==='belt'){b('Put an asteroid near Earth',()=>dropRock(.24));b('Put an asteroid between Mars and Jupiter',()=>dropRock(.38));b('Put an asteroid past Neptune',()=>dropRock(.94))}
  if(g==='comet'){b('Move the comet on',()=>setTh(S.th+Math.PI/12,1));b('Move the comet back',()=>setTh(S.th-Math.PI/12,1))}
  if(g==='meteor'){const spot=S.lab.findIndex(x=>x==null),where=['space rock','glowing rock','landed rock'][spot];ROCKS.forEach((r,v)=>{if(!S.lab.includes(v))b(`Call the ${where} a ${r[0].toLowerCase()}`,()=>name(spot,v))})}
  if(g==='dwarf'){const i=S.sel!=null&&!S.sorted.includes(S.sel)?S.sel:BODIES.findIndex((x,j)=>!S.sorted.includes(j));BINS.forEach((nm,k)=>b(`Put ${BODIES[i][0]} in ${nm}`,()=>place(i,k)))}
  if(g==='kids')KIDS[S.k][1].forEach((o,i)=>b(o[0]+' is right',()=>judge(i)))}
 A.redraw()}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const id=++gen;fns.forEach((f,j)=>setTimeout(()=>{if(id===gen){f();sync()}},(j+1)*(A.reduced()?50:ms)))};
function reset(){gen++;Object.assign(S,{after:()=>{},won:false,msg:'',bad:false,drag:null,n:0,th:Math.PI/3,seen:[],tail:0,r:1,lab:[null,null,null],sel:null,sorted:[],k:0,from:null,dp:null,moved:false})}
const steps=[
{h:'Rocky asteroids',p:'Asteroids are lumps of rock and metal left over from when the planets formed. Most of them go round the Sun together in a belt.',
predict:{q:'Where do most asteroids go round the Sun?',opts:['Between Earth and the Moon','Between Mars and Jupiter','Past Neptune'],ans:1},
task:'Put 3 asteroids where most of them live',show:()=>{steps[0].go();play([0,1,2].map(()=>()=>dropRock(.38)),420)},go:()=>{reset();sync();S.after=ready(0,()=>S.won,'All 3 in the belt.')}},
{h:'Icy comets',p:'A comet is a ball of ice, dust and rock on a long, stretched path. Near the Sun its ice turns to gas and it grows a glowing tail.',
predict:{q:'Which way does a comet’s tail point?',opts:['Behind it, the way it came','Away from the Sun','Towards the Sun'],ans:1},
task:'Visit all 3 rings on the comet’s path',show:()=>{steps[1].go();play(STOPS.map(([th])=>()=>setTh(th,1)),550)},go:()=>{reset();sync();S.after=ready(1,()=>S.won,'Tail checked.')}},
{h:'Shooting stars',p:'Small space rocks can fall into our air. They rub against it, get very hot and glow. We give them a different name at each stage.',
predict:{q:'What is a shooting star?',opts:['A star falling to Earth','A space rock burning up in the air','A comet passing by'],ans:1},
task:'Name all 3 rocks',show:()=>{steps[2].go();play([0,1,2].map(i=>()=>name(i,i)),450)},go:()=>{reset();sync();S.after=ready(2,()=>S.won,'All named.')}},
{h:'Planet or dwarf planet?',p:'A planet must go round the Sun, be round, and have cleared its path of other big objects. A dwarf planet passes only the first two tests.',
predict:{q:'Pluto was called a planet until 2006. Why was it changed to a dwarf planet?',opts:['It got smaller','It shares its path with many icy objects','It stopped going round the Sun'],ans:1},
task:'Sort all 6 bodies',show:()=>{steps[3].go();play(BODIES.map((x,i)=>()=>place(i,x[4])),380)},go:()=>{reset();sync();S.after=ready(3,()=>S.won,'All sorted.')}},
{h:'Check the facts',p:'Three children talk about space objects. Only one is right each time.',
task:'Find who is right 3 times',show:()=>{steps[4].go();play(KIDS.map(()=>()=>judge(KIDS[S.k][1].findIndex(o=>!o[2]))),450)},go:()=>{reset();sync();S.after=ready(4,()=>S.won,'Facts checked.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.after()});
let streak=0;
function ask(){qn++;const [qq,ok,bad]=QZ[qn%QZ.length],all=[[ok,'ok']].concat(bad),r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 box.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=box.querySelector('.fl-pick');ord.forEach(([w,tg])=>{c.el('button',{type:'button',class:'lbtn'},g,w).onclick=()=>mark(tg,ok)});announce('Challenge: '+qq);A.redraw()}
function mark(tg,ok){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),win=tg==='ok';let m=WHY[tg]||'Think: rocky asteroids, icy comets, burning meteors, round dwarf planets.';
 if(tg==='meteor')m='Close, but a meteor is the glowing streak in the air. The rock that lands is a meteorite.';
 if(tg==='behind')m='It can look that way, but the tail is pushed by sunlight, so it always points away from the Sun, even when the comet is leaving.';
 if(tg==='kuiper')m='Past Neptune is the Kuiper Belt, which is mostly icy. The rocky asteroid belt is between Mars and Jupiter.';
 if(win){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${win?'✓ Yes: '+ok+'. In a row: '+streak+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:B=>{box.hidden=B.step!==5;pad.hidden=B.step===5;buttons()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Space objects lab buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
