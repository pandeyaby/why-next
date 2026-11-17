/* Flagship: using weather instruments (ages 7–9). Match tools to what they measure, turn a wind vane into the wind,
   match anemometer speeds to what the wind does, rain on a wide and a thin pot, read rain gauges, site the tools, judge
   three children, then a challenge. Data, drawings and descriptions live in wxinst_art.js. */
(()=>{
const {T,MATCH,DIRS,VANE,SPEED,GAUGE,SPOT,SITE,BADSPOT,KIDS,QZ,WHY}=WXART;
const K={ink:'#111827',soft:'#374151',paper:'#fbfaf5',rule:'#1f2937',yes:'#166534',yesBg:'#dcfce7',no:'#9f1239',hint:'#fff7ed',water:'#3b82f6',sky:'#e0f2fe',grass:'#bbf7d0',wind:'#0369a1'};
VIS.reg('flagwxinst',c=>{let A,X,pad,box,qi=-1,run=0;const W={after:()=>{}};
const u=n=>Math.round(n*(A.narrow?1:1.12));
const tell=m=>{c.say(m);A.cv.setAttribute('aria-label',m)};
function word(t,x,y,n,col,wt,al){X.font=`${wt||700} ${u(n)}px system-ui,sans-serif`;X.fillStyle=col||K.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(t),x,y)}
function lines(t,w,n){X.font=`700 ${u(n)}px system-ui,sans-serif`;const o=[];let cur='';for(const s of String(t).split(' ')){const nx=cur?cur+' '+s:s;if(cur&&X.measureText(nx).width>w){o.push(cur);cur=s}else cur=nx}o.push(cur);return o}
function tile(x,y,w,h,f,s,lw){A.paint.rrect(x,y,w,h,12);X.fillStyle=f;X.fill();if(s){X.lineWidth=lw||2;X.strokeStyle=s;X.stroke()}}
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function banner(t,ok){const R=lines(t,A.W-44,14),lh=u(14)+4,h=Math.max(u(36),R.length*lh+14);tile(12,10,A.W-24,h,ok?K.yesBg:K.hint,ok?K.yes:K.rule,2);R.forEach((r,i)=>word(r,A.W/2,10+h/2+(i-(R.length-1)/2)*lh,14,ok?K.yes:K.ink));return 10+h}
function note(){if(!W.msg)return;const R=lines((W.bad?'✗ ':'✓ ')+W.msg,A.W-48,13),lh=u(13)+5,h=R.length*lh+12,y=A.H-h-10;tile(12,y,A.W-24,h,'#ffffff',W.bad?K.no:K.yes,3);R.forEach((r,i)=>word(r,A.W/2,y+6+lh*(i+.5),13,W.bad?K.no:K.ink))}
const nope=m=>{W.bad=true;W.msg=m;A.sound.miss();sync()};
const okay=m=>{W.bad=false;W.msg=m;A.sound.pop()};
const part=()=>['match','vane','speed','wide','gauge','site','kids','quiz'][A.step];
function line(x1,y1,x2,y2,col,w){X.strokeStyle=col;X.lineWidth=w;X.beginPath();X.moveTo(x1,y1);X.lineTo(x2,y2);X.stroke()}
const icon=(i,x,y,s)=>WXART.icon(X,i,x,y,s),scene=(i,x,y,s)=>WXART.scene(X,i,x,y,s);
/* 1: match each instrument to what it measures */
function drawMatch(t0,b0){const left=MATCH.filter(i=>!W.got.has(i));W.cur=left.length?left[0]:-1;const cw=Math.min(u(230),A.W*.7),ch=u(78),d=W.drag;
 W.card={x:A.W/2-cw/2,y:t0+u(8),w:cw,h:ch};const bw=(A.W-u(36))/2,bh=Math.min(u(74),(b0-t0-ch-u(40))/2-u(8));
 W.bins=T.map((m,i)=>{const r={x:u(12)+(i%2)*(bw+u(12)),y:t0+ch+u(28)+Math.floor(i/2)*(bh+u(10)),w:bw,h:bh,i};const done=W.got.has(i);tile(r.x,r.y,bw,bh,done?K.yesBg:'#ffffff',done?K.yes:K.rule,2);word(m[1],r.x+bw/2,r.y+bh/2-(done?u(9):0),14,K.ink,900);if(done)word(m[0],r.x+bw/2,r.y+bh/2+u(12),12,K.yes,800);return r});
 if(W.cur<0)return;const x=d?d.x-cw/2:W.card.x,y=d?d.y-ch/2:W.card.y;tile(x,y,cw,ch,T[W.cur][2],d?'#1d4ed8':K.rule,d?3.5:2.5);icon(W.cur,x+u(40),y+ch/2,ch*.8);word(T[W.cur][0],x+u(80),y+ch/2,17,K.ink,900,'left')}
function pair(b){if(W.won||W.cur<0)return;const i=W.cur;if(b!==i)return nope(`The ${T[i][0].toLowerCase()} does not measure ${T[b][1].toLowerCase()}. ${T[b][1]} is measured with a ${T[b][0].toLowerCase()}.`);
 W.got.add(i);A.sound.tick();okay(`${T[i][0]}: ${T[i][1].toLowerCase()}.`);if(W.got.size===4){W.won=true;W.msg='One tool for each thing we measure.'}sync()}
/* 2: wind vane */
function drawVane(t0,b0){const from=VANE[Math.min(W.k,2)],cx=A.W/2,cy=(t0+b0)/2+u(6),R=Math.min(A.W/2-u(44),(b0-t0)/2-u(34));W.geo={cx,cy,R};
 X.fillStyle=K.sky;X.beginPath();X.arc(cx,cy,R+u(26),0,7);X.fill();
 const ang=[-Math.PI/2,0,Math.PI/2,Math.PI],a=ang[from],dx=-Math.cos(a),dy=-Math.sin(a);/* wind travels away from the source */
 if(!W.won)for(let k=-2;k<=2;k++){const ox=-dy*k*R*.38,oy=dx*k*R*.38,sx=cx+Math.cos(a)*R*.95+ox,sy=cy+Math.sin(a)*R*.95+oy,ex=sx+dx*R*.55,ey=sy+dy*R*.55;line(sx,sy,ex,ey,K.wind,2.5);X.fillStyle=K.wind;X.beginPath();X.moveTo(ex+dx*u(9),ey+dy*u(9));X.lineTo(ex-dy*u(6),ey+dx*u(6));X.lineTo(ex+dy*u(6),ey-dx*u(6));X.closePath();X.fill()}
 W.pts=DIRS.map((n,i)=>{const px=cx+Math.cos(ang[i])*(R+u(4)),py=cy+Math.sin(ang[i])*(R+u(4)),r={x:px-u(26),y:py-u(24),w:u(52),h:u(48),i};tile(r.x,r.y,r.w,r.h,W.aim===i?K.yesBg:'#ffffff',K.rule,2);word(n[0],px,py,20,K.ink,900);return r});
 const v=W.aim==null?-Math.PI/4:ang[W.aim],L=R*.55;X.save();X.translate(cx,cy);X.rotate(v);line(-L,0,L,0,K.rule,4);X.fillStyle=K.rule;X.beginPath();X.moveTo(L+u(14),0);X.lineTo(L-u(4),-u(11));X.lineTo(L-u(4),u(11));X.closePath();X.fill();X.fillStyle='#f59e0b';X.beginPath();X.moveTo(-L+u(18),0);X.lineTo(-L-u(4),-u(16));X.lineTo(-L-u(4),u(16));X.closePath();X.fill();X.restore();
 X.fillStyle=K.rule;X.beginPath();X.arc(cx,cy,u(5),0,7);X.fill();word(W.won?'Done':`Wind ${Math.min(W.k+1,3)} of 3`,cx,cy+R*.8,12,K.soft,800)}
function aim(i){if(W.won)return;W.aim=i;const from=VANE[W.k];if(i!==from){return nope(WXART.vaneMsg(i,from))}
 A.sound.tick();okay(`The vane points ${DIRS[i].toLowerCase()}: a ${DIRS[i].toLowerCase()} wind.`);W.k++;if(W.k>=VANE.length){W.won=true;W.msg='A wind vane points to where the wind comes from.'}else setTimeout(()=>{if(!W.won){W.aim=null;A.redraw()}},A.reduced()?10:400);sync()}
/* 3: anemometer readings and what the wind does */
const ORDER=[1,2,0];
function drawSpeed(t0,b0){const left=ORDER.filter(i=>!W.got.has(i));W.cur=left.length?left[0]:-1;const cw=Math.min(u(200),A.W*.6),ch=u(56),d=W.drag;W.card={x:A.W/2-cw/2,y:t0+u(6),w:cw,h:ch};
 const rh=Math.min(u(70),(b0-t0-ch-u(24))/3-u(8));W.rows=SPEED.map((s,i)=>{const r={x:u(12),y:t0+ch+u(20)+i*(rh+u(8)),w:A.W-u(24),h:rh,i};const done=W.got.has(i);tile(r.x,r.y,r.w,rh,done?K.yesBg:'#ffffff',done?K.yes:K.rule,2);
  scene(i,r.x+u(34),r.y+rh/2,rh*.8);word(s[1],r.x+u(70),r.y+rh/2-(done?u(9):0),13,K.ink,800,'left');if(done)word(`${s[0]} km/h`,r.x+u(70),r.y+rh/2+u(11),12,K.yes,900,'left');return r});
 if(W.cur<0)return;const x=d?d.x-cw/2:W.card.x,y=d?d.y-ch/2:W.card.y,sp=SPEED[W.cur][0];tile(x,y,cw,ch,'#dcfce7',d?'#1d4ed8':K.rule,d?3.5:2.5);icon(3,x+u(30),y+ch/2,ch*.8);
 for(let k=0;k<Math.min(4,1+Math.floor(sp/12));k++){X.strokeStyle=K.wind;X.lineWidth=2;X.beginPath();X.arc(x+u(30),y+ch/2-u(6),u(14)+k*u(4),-.6,.6);X.stroke()}word(`${sp} km/h`,x+u(62),y+ch/2,18,K.ink,900,'left')}
function speed(r){if(W.won||W.cur<0)return;const i=W.cur;if(r!==i){return nope(WXART.speedMsg(i))}
 W.got.add(i);A.sound.tick();okay(`${SPEED[i][0]} km/h: ${SPEED[i][1].toLowerCase()}.`);if(W.got.size===3){W.won=true;W.msg='The faster the cups spin, the stronger the wind.'}sync()}
/* 4: wide or narrow pot in the same rain */
function drawWide(t0,b0){const base=b0-u(80),mm=W.hours*4,px=u(5);const pots=[[A.W*.3,A.W*.34],[A.W*.74,A.W*.12]];
 X.fillStyle='#94a3b8';for(let k=0;k<14;k++){const x=u(20)+(k*53)%(A.W-u(40)),y=t0+u(40)+(k*37)%u(50);X.fillRect(x,y,2,u(10))}
 pots.forEach(([cx,w],i)=>{const h=u(110);X.fillStyle=K.water;X.fillRect(cx-w/2,base-mm*px,w,mm*px);X.strokeStyle=K.rule;X.lineWidth=3;X.beginPath();X.moveTo(cx-w/2,base-h);X.lineTo(cx-w/2,base);X.lineTo(cx+w/2,base);X.lineTo(cx+w/2,base-h);X.stroke();word(i?'Thin pot':'Wide pot',cx,base+u(14),13,K.ink,900);if(W.hours)word(`${mm} mm deep`,cx,base-h-u(10),12,K.ink,800)});
 if(W.hours)line(u(14),base-mm*px,A.W-u(14),base-mm*px,'#1e3a8a',1);word(`${W.hours} of 3 hours of rain`,A.W/2,t0+u(18),13,K.soft,800);
 const bw=(A.W-u(48))/3;W.ans=['Wide deeper','Same depth','Thin deeper'].map((n,i)=>{const r={x:u(12)+i*(bw+u(12)),y:b0-u(48),w:bw,h:u(46),i};tile(r.x,r.y,bw,r.h,'#ffffff',K.rule,2);word(n,r.x+bw/2,r.y+r.h/2,13,K.ink,900);return r});
 W.cloud={x:u(12),y:t0+u(30),w:A.W-u(24),h:u(70)}}
function rain(){if(W.won||W.hours>=3)return;W.hours++;A.sound.tick();okay(`Hour ${W.hours}: both pots are ${W.hours*4} mm deep.`);sync()}
function choose(i){if(W.won)return;if(W.hours<3)return nope('Let it rain for 3 hours first, then compare.');if(i!==1)return nope(`Both lines are at 12 mm. ${WHY.wide}`);
 W.won=true;okay('Same depth. That is why rain is measured in mm deep, whatever the size of the gauge.');sync()}
/* 5: read the rain gauge */
function drawGauge(t0,b0){const lv=GAUGE[Math.min(W.k,2)],top=t0+u(30),bot=b0-u(20),cx=A.W/2-u(10),w=u(70),px=(bot-top)/30;W.g={top,bot,px,cx,w};
 X.fillStyle=K.water;X.fillRect(cx-w/2,bot-lv*px,w,lv*px);X.strokeStyle=K.rule;X.lineWidth=3;X.strokeRect(cx-w/2,top,w,bot-top);
 for(let m=0;m<=30;m++){const y=bot-m*px,big=m%5===0;line(cx-w/2,y,cx-w/2+(big?u(18):u(9)),y,K.rule,big?2:1);if(big)word(m,cx-w/2-u(16),y,12,K.ink,800)}word('mm',cx-w/2-u(16),top-u(14),11,K.soft,800);
 const y=bot-W.ptr*px;X.fillStyle='#f59e0b';X.beginPath();X.moveTo(cx+w/2+u(4),y);X.lineTo(cx+w/2+u(26),y-u(13));X.lineTo(cx+w/2+u(26),y+u(13));X.closePath();X.fill();X.strokeStyle=K.rule;X.lineWidth=1.5;X.stroke();
 word(`${W.ptr} mm`,cx+w/2+u(32),y,15,K.ink,900,'left');W.grip={x:cx+w/2,y:y-u(26),w:u(110),h:u(52)};
 W.chk={x:A.W-u(100),y:top,w:u(88),h:u(46)};tile(W.chk.x,W.chk.y,W.chk.w,W.chk.h,'#ffffff',K.rule,2);word('Check',W.chk.x+u(44),W.chk.y+u(23),14,K.ink,900);word(`Gauge ${Math.min(W.k+1,3)} of 3`,W.chk.x+u(44),top+u(62),11,K.soft,800)}
function setPtr(v){W.ptr=Math.max(0,Math.min(30,Math.round(v)));W.msg='';sync()}
function check(){if(W.won)return;const lv=GAUGE[W.k],d=W.ptr-lv;if(d){return nope(Math.abs(d)>=5?`Count the marks again: each small mark is 1 mm and the numbers go up in 5s. The water is ${d>0?'lower':'higher'}.`:`Close. The water is ${d>0?'lower':'higher'} than ${W.ptr} mm. Look straight across at the top of the water.`)}
 A.sound.tick();okay(`${lv} mm of rain.`);W.k++;W.ptr=0;if(W.k>=GAUGE.length){W.won=true;W.msg='Read straight across, in millimetres.'}sync()}
/* 6: site each instrument in the garden */
function drawSite(t0,b0){const left=SITE.filter(i=>!W.got.has(i));W.cur=left.length?left[0]:-1;const cw=Math.min(u(210),A.W*.62),ch=u(60),d=W.drag;W.card={x:A.W/2-cw/2,y:t0+u(6),w:cw,h:ch};
 const top=t0+ch+u(18),rh=Math.min(u(58),(b0-top)/5-u(6));X.fillStyle=K.grass;X.fillRect(u(10),top-u(4),A.W-u(20),b0-top+u(4));
 W.spots=SPOT.map((s,i)=>{const r={x:u(18),y:top+i*(rh+u(6)),w:A.W-u(36),h:rh,i};const here=[...W.got].filter(k=>SPOT[i][1]===k);tile(r.x,r.y,r.w,rh,here.length?K.yesBg:'#ffffff',here.length?K.yes:K.rule,2);word(s[0],r.x+u(12),r.y+rh/2,14,K.ink,900,'left');here.forEach(k=>icon(k,r.x+r.w-u(30),r.y+rh/2,rh*.8));return r});
 if(W.cur<0)return;const x=d?d.x-cw/2:W.card.x,y=d?d.y-ch/2:W.card.y;tile(x,y,cw,ch,T[W.cur][2],d?'#1d4ed8':K.rule,d?3.5:2.5);icon(W.cur,x+u(32),y+ch/2,ch*.8);word(T[W.cur][0],x+u(64),y+ch/2,16,K.ink,900,'left')}
function site(s){if(W.won||W.cur<0)return;const i=W.cur;if(SPOT[s][1]!==i)return nope(BADSPOT[s+'-'+i]||`Not there. Think about what could spoil the ${T[i][0].toLowerCase()} reading.`);
 W.got.add(i);A.sound.tick();okay(`${T[i][0]}: ${SPOT[s][0].toLowerCase()}.`);if(W.got.size===3){W.won=true;W.msg='Rain gauge low in the open, thermometer in the shade, anemometer up high.'}sync()}
/* 7: children */
function drawKids(t0,b0){const [stem,kids]=KIDS[Math.min(W.k,2)],S=lines(stem,A.W-u(30),15);S.forEach((s,j)=>word(s,A.W/2,t0+u(16)+j*u(19),15,K.ink,900));const top=t0+u(12)+S.length*u(19),h=Math.min(u(74),(b0-top)/3-u(6));
 W.kid=kids.map((k,i)=>{const r={x:u(16),y:top+i*(h+u(6)),w:A.W-u(32),h,i};tile(r.x,r.y,r.w,h,'#ffffff',K.rule,2);X.fillStyle=['#fde68a','#bae6fd','#fbcfe8'][i];X.beginPath();X.arc(r.x+u(26),r.y+h/2,u(15),0,7);X.fill();
  word(k[0],r.x+u(26),r.y+h/2,11,K.ink,800);const L=lines(k[1],r.w-u(70),13);L.forEach((ln,j)=>word(ln,r.x+u(52),r.y+h/2+(j-(L.length-1)/2)*u(17),13,K.ink,700,'left'));return r})}
function judge(i){if(W.won)return;const k=KIDS[W.k][1][i];if(k[2])return nope(`${k[0]} is not right. ${k[2]}`);okay(`${k[0]} is right.`);W.k++;if(W.k>=KIDS.length){W.won=true;W.msg='Right tool, right place, read it carefully.'}sync()}
function draw(){X.fillStyle=A.col.dark?'#1f2937':K.paper;X.fillRect(0,0,A.W,A.H);X.fillStyle=K.paper;A.paint.rrect(5,5,A.W-10,A.H-10,16);X.fill();
 const p=part(),H=WXART.H;
 const t=banner(W.won?H[p][1]:H[p][0],W.won),bot=A.H-(W.msg?u(70):u(12));
 if(p==='match')drawMatch(t,bot);if(p==='vane')drawVane(t,bot);if(p==='speed')drawSpeed(t,bot);if(p==='wide')drawWide(t,bot);if(p==='gauge')drawGauge(t,bot);if(p==='site')drawSite(t,bot);if(p==='kids')drawKids(t+u(4),bot);
 if(p==='quiz'){const w=(A.W-u(30))/4;T.forEach((m,i)=>{tile(u(15)+i*w+3,t+u(24),w-6,u(110),m[2],K.rule,2);icon(i,u(15)+i*w+w/2,t+u(64),u(60));lines(m[1],w-u(10),11).forEach((ln,j)=>word(ln,u(15)+i*w+w/2,t+u(108)+j*u(14),11,K.ink,800))})}
 note();A.fx.draw(X)}
function down(p){const k=part();if(W.won&&k!=='quiz')return false;
 if((k==='match'||k==='speed'||k==='site')&&inside(p,W.card)&&W.cur>=0){W.drag={x:p.x,y:p.y};A.redraw();return true}
 if(k==='match'){const r=(W.bins||[]).find(b=>inside(p,b));if(r){pair(r.i);return true}}
 if(k==='speed'){const r=(W.rows||[]).find(b=>inside(p,b));if(r){speed(r.i);return true}}
 if(k==='site'){const r=(W.spots||[]).find(b=>inside(p,b));if(r){site(r.i);return true}}
 if(k==='vane'){const r=(W.pts||[]).find(b=>inside(p,b));if(r){aim(r.i);return true}if(W.geo&&Math.hypot(p.x-W.geo.cx,p.y-W.geo.cy)<W.geo.R){W.drag={x:p.x,y:p.y};return true}}
 if(k==='wide'){const r=(W.ans||[]).find(b=>inside(p,b));if(r){choose(r.i);return true}if(inside(p,W.cloud)){rain();return true}}
 if(k==='gauge'){if(inside(p,W.chk)){check();return true}if(inside(p,W.grip)||(W.g&&p.y>=W.g.top&&p.y<=W.g.bot&&Math.abs(p.x-W.g.cx)<W.g.w)){W.drag={x:p.x,y:p.y};move(p);return true}}
 if(k==='kids'){const r=(W.kid||[]).find(b=>inside(p,b));if(r){judge(r.i);return true}}
 return false}
function move(p){if(!W.drag)return;W.drag.x=p.x;W.drag.y=p.y;const k=part();if(k==='gauge'&&W.g){W.ptr=Math.max(0,Math.min(30,Math.round((W.g.bot-p.y)/W.g.px)));W.msg=''}A.redraw()}
function up(p){const d=W.drag;W.drag=null;if(!d)return;const k=part();
 if(k==='match'){const r=(W.bins||[]).find(b=>inside(p,b));if(r)return pair(r.i)}
 if(k==='speed'){const r=(W.rows||[]).find(b=>inside(p,b));if(r)return speed(r.i)}
 if(k==='site'){const r=(W.spots||[]).find(b=>inside(p,b));if(r)return site(r.i)}
 if(k==='vane'&&W.geo){const a=Math.atan2(p.y-W.geo.cy,p.x-W.geo.cx),i=[1,2,3,0][((Math.round(a/(Math.PI/2))%4)+4)%4];return aim(i)}
 if(k==='gauge')return sync();A.redraw()}
function sync(){const d=WXART.say(part(),W); tell((W.msg?W.msg+' ':'')+d);buttons();W.after()}
function buttons(){if(!pad)return;pad.innerHTML='';const k=part(),b=(t,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},pad,t).onclick=()=>{fn();sync()}};
 if(!W.won){if(k==='match')T.forEach((m,i)=>b(m[1],()=>pair(i)));
  if(k==='vane')DIRS.forEach((n,i)=>b('Point '+n,()=>aim(i)));
  if(k==='speed')SPEED.map((s,i)=>b(s[1],()=>speed(i)));
  if(k==='wide'){b('Rain for 1 hour',rain);['Wide deeper','Same depth','Thin deeper'].forEach((n,i)=>b(n,()=>choose(i)))}
  if(k==='gauge'){b('Arrow up 1 mm',()=>setPtr(W.ptr+1));b('Arrow down 1 mm',()=>setPtr(W.ptr-1));b('Up 5 mm',()=>setPtr(W.ptr+5));b('Check',check)}
  if(k==='site')SPOT.forEach((s,i)=>b(s[0],()=>site(i)));
  if(k==='kids')KIDS[W.k][1].forEach((x,i)=>b(x[0]+' is right',()=>judge(i)))}
 A.redraw()}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const seq=(fns,ms)=>{const id=++run;fns.forEach((f,j)=>setTimeout(()=>{if(id===run){f();sync()}},(j+1)*(A.reduced()?50:ms)))};
function fresh(){run++;Object.assign(W,{after:()=>{},won:false,msg:'',bad:false,drag:null,k:0,got:new Set(),cur:0,aim:null,hours:0,ptr:0})}
const steps=[
{h:'Which tool?',p:'Weather watchers use four tools. Each one measures one thing about the weather.',
predict:{q:'Which tool tells you how fast the wind blows?',opts:['Wind vane','Anemometer','Rain gauge'],ans:1},
task:'Match all 4 tools',show:()=>{steps[0].go();seq(MATCH.map(i=>()=>pair(i)),380)},go:()=>{fresh();sync();W.after=ready(0,()=>W.won,'Four tools, four jobs.')}},
{h:'Wind vane',p:'The wind pushes the big tail of the vane away. So the arrow turns to face the wind. Winds are named for where they come from.',
predict:{q:'Wind blows from the west towards the east. Where does the vane point?',opts:['East','West','North'],ans:1},
task:'Point the vane for 3 winds',show:()=>{steps[1].go();seq(VANE.map(i=>()=>aim(i)),600)},go:()=>{fresh();sync();W.after=ready(1,()=>W.won,'West, north, east.')}},
{h:'Anemometer',p:'An anemometer has cups that catch the wind. The stronger the wind, the faster they spin. It shows the speed in km/h.',
task:'Match 3 wind speeds',show:()=>{steps[2].go();seq(ORDER.map(i=>()=>speed(i)),450)},go:()=>{fresh();sync();W.after=ready(2,()=>W.won,'Calm, breeze, strong.')}},
{h:'Wide or thin?',p:'Rain falls on a wide pot and a thin pot for 3 hours. The wide pot catches more drops.',
predict:{q:'After 3 hours, which pot has deeper water?',opts:['The wide pot','Both the same','The thin pot'],ans:1},
task:'Rain for 3 hours, then compare',show:()=>{steps[3].go();seq([rain,rain,rain,()=>choose(1)],400)},go:()=>{fresh();sync();W.after=ready(3,()=>W.won,'Rain is a depth, not an amount of water.')}},
{h:'Rain gauge',p:'A rain gauge has a scale in millimetres (mm). Read it straight across at the top of the water. Empty it each day.',
task:'Read 3 rain gauges',show:()=>{steps[4].go();seq(GAUGE.flatMap(g=>[()=>setPtr(g),check]),330)},go:()=>{fresh();sync();W.after=ready(4,()=>W.won,'8 mm, 15 mm, 23 mm.')}},
{h:'Where to put it',p:'A good reading needs a good spot. Trees, walls and sunshine can all spoil a reading.',
predict:{q:'Where should a rain gauge go?',opts:['Under a tree, so it is safe','On open grass','Next to the house'],ans:1},
task:'Place 3 tools well',show:()=>{steps[5].go();seq(SITE.map(i=>()=>site(SPOT.findIndex(s=>s[1]===i))),450)},go:()=>{fresh();sync();W.after=ready(5,()=>W.won,'Open, shaded and high.')}},
{h:'Check the facts',p:'Three children talk about weather tools. Only one is right each time.',
task:'Find who is right 3 times',show:()=>{steps[6].go();seq(KIDS.map(()=>()=>judge(KIDS[W.k][1].findIndex(x=>!x[2]))),450)},go:()=>{fresh();sync();W.after=ready(6,()=>W.won,'Facts checked.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>W.after()});
let wins=0;
function ask(){qi++;const [qq,ok,bad]=QZ[qi%QZ.length],all=[[ok,'ok']].concat(bad),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 box.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=box.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},g,w).onclick=()=>score(tag,ok)});tell('Challenge: '+qq);A.redraw()}
function score(tag,ok){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),good=tag==='ok';let m=WHY[tag]||'Thermometer: temperature. Rain gauge: rain. Wind vane: direction. Anemometer: speed.';
 if(tag==='from')m='A wind vane points into the wind. A north wind blows from the north, and the vane points north.';
 if(tag==='wide')m='Same depth. A wide pot catches more drops, but it spreads them over a bigger floor.';
 if(tag==='site')m='Low, in the open, away from trees and walls. Trees drip or block the rain, and a pole lets rain blow past.';
 if(good){wins++;A.win()}else{wins=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Yes: '+ok+'. In a row: '+wins+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:B=>{box.hidden=B.step!==7;pad.hidden=B.step===7;buttons()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Weather instruments lab buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
