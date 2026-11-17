/* Flagship: how telescopes work (ages 7–9). Widen a lens until a faint galaxy shows, drag a screen to the focus of a
   thin and a fat lens, slot the right mirror into a reflecting telescope, lift a telescope above the twinkling air,
   judge three children, then a challenge. Stars, mirrors, heights and screen-reader text are in scope_art.js. */
(()=>{
const {STARS,GAL,LENS,MIRRORS,MIRW,LEVELS,LEVW,KIDS,QZ,WHY,H}=SCART;
const Q={ink:'#111827',sub:'#374151',bg:'#f0f9ff',frame:'#1f2937',good:'#166534',goodBg:'#dcfce7',bad:'#9f1239',tip:'#e0f2fe',sky:'#0b1026',star:'#fef9c3',hot:'#c2410c',glass:'#bae6fd',glassEdge:'#0369a1',ray:'#d97706',tube:'#475569',gal:'#c4b5fd'};
VIS.reg('flagscope',c=>{let A,X,pad,box,qn=-1,gen=0;const G={after:()=>{}};
const v=n=>Math.round(n*(A.narrow?1:1.12));
const tell=m=>{c.say(m);A.cv.setAttribute('aria-label',m)};
function txt(s,x,y,n,col,w,al){X.font=`${w||700} ${v(n)}px system-ui,sans-serif`;X.fillStyle=col||Q.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y)}
function wrapW(s,w,n){X.font=`700 ${v(n)}px system-ui,sans-serif`;const o=[];let l='';for(const t of String(s).split(' ')){const nx=l?l+' '+t:t;if(l&&X.measureText(nx).width>w){o.push(l);l=t}else l=nx}o.push(l);return o}
function card(x,y,w,h,f,s,lw,r){A.paint.rrect(x,y,w,h,r||10);X.fillStyle=f;X.fill();if(s){X.lineWidth=lw||2;X.strokeStyle=s;X.stroke()}}
const hitR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const mode=()=>['wide','lens','mirror','space','kids','quiz'][A.step];
function banner(s,ok){const R=wrapW(s,A.W-44,14),lh=v(14)+4,h=Math.max(v(36),R.length*lh+14);card(12,10,A.W-24,h,ok?Q.goodBg:Q.tip,ok?Q.good:Q.frame);R.forEach((r,i)=>txt(r,A.W/2,10+h/2+(i-(R.length-1)/2)*lh,14,ok?Q.good:Q.ink));return 10+h}
function footer(){if(!G.msg)return;const R=wrapW((G.bad?'✗ ':'✓ ')+G.msg,A.W-48,13),lh=v(13)+5,h=R.length*lh+12,y=A.H-h-10;card(12,y,A.W-24,h,'#ffffff',G.bad?Q.bad:Q.good,3);R.forEach((r,i)=>txt(r,A.W/2,y+6+lh*(i+.5),13,G.bad?Q.bad:Q.ink))}
const wrong=m=>{G.bad=true;G.msg=m;A.sound.miss();sync()};
const right=m=>{G.bad=false;G.msg=m;A.sound.pop()};
function knob(x,y){X.fillStyle=Q.hot;X.beginPath();X.arc(x,y,v(13),0,7);X.fill();X.strokeStyle='#ffffff';X.lineWidth=3;X.stroke();return {x:x-v(28),y:y-v(28),w:v(56),h:v(56)}}
function dot(x,y,r,col){X.fillStyle=col;X.beginPath();X.arc(x,y,r,0,7);X.fill()}
function ray(pts){X.strokeStyle=Q.ray;X.lineWidth=2.5;X.beginPath();pts.forEach((p,i)=>i?X.lineTo(p[0],p[1]):X.moveTo(p[0],p[1]));X.stroke()}
function skyDisc(x,y,R){dot(x,y,R,Q.sky);X.strokeStyle=Q.frame;X.lineWidth=3;X.beginPath();X.arc(x,y,R,0,7);X.stroke()}
/* step: a wider lens catches more light */
function drawWide(t0,b0){const R=Math.max(v(50),Math.min(A.W*.3,(b0-t0-v(96))/2)),cx=A.W/2,cy=t0+v(6)+R,L=G.d*G.d;skyDisc(cx,cy,R);
 STARS.forEach(s=>{if(L>=s[2])dot(cx+s[0]*R*.88,cy+s[1]*R*.88,Math.max(1.8,v(4.4)-s[2]/11),Q.star)});
 if(L>=GAL.need){X.save();X.translate(cx+GAL.x*R,cy+GAL.y*R);X.rotate(-.5);X.globalAlpha=.85;X.fillStyle=Q.gal;X.beginPath();X.ellipse(0,0,v(15),v(6),0,0,7);X.fill();X.globalAlpha=1;dot(0,0,v(2.5),'#ffffff');X.restore();txt('galaxy',cx+GAL.x*R,cy+GAL.y*R+v(16),11,'#f8fafc',800)}
 const ty=cy+R+v(22),x0=v(40),x1=A.W-v(40);txt(`Lens ${G.d} cm wide · light caught ${G.d} × ${G.d} = ${L}`,A.W/2,ty,13,Q.ink,900);
 const ky=ty+v(30);X.strokeStyle=Q.tube;X.lineWidth=v(6);X.lineCap='round';X.beginPath();X.moveTo(x0,ky);X.lineTo(x1,ky);X.stroke();X.lineCap='butt';
 for(let d=1;d<=8;d++)txt(d,x0+(d-1)/7*(x1-x0),ky+v(22),11,Q.sub,800);G.trk={x0,x1};G.knob=knob(x0+(G.d-1)/7*(x1-x0),ky)}
function setD(d,check){if(G.won)return;const was=G.d;G.d=Math.max(1,Math.min(8,Math.round(d)));if(!check)return A.redraw();const L=G.d*G.d,n=STARS.filter(s=>L>=s[2]).length;
 if(L>=GAL.need){G.won=true;A.sound.tick();G.msg=`A ${G.d} cm lens catches ${G.d} × ${G.d} = ${L} times the light of a 1 cm lens. Now the faint galaxy shows.`;return sync()}
 right(G.d<was?`Narrower lens, less light: only ${n} stars show.`:`${L} times the light: ${n} stars show. Keep going for the galaxy.`);sync()}
/* step: a lens bends light to a focus */
function drawLens(t0,b0){const [f,nm]=LENS[Math.min(G.k,1)],cy=(t0+b0)/2+v(14),lx=A.W*.24,xr=A.W-v(20),span=xr-lx,fx=lx+f*span,sx=lx+G.s*span,lh=Math.min((b0-t0)*.55,v(150)),th=v(8)+(.62-f)*v(44);
 txt(`${nm[0].toUpperCase()+nm.slice(1)}`+(G.won?'':` · round ${G.k+1} of 2`),A.W/2+v(20),t0+v(14),14,Q.ink,900);
 X.fillStyle=Q.glass;X.strokeStyle=Q.glassEdge;X.lineWidth=2;X.beginPath();X.moveTo(lx,cy-lh/2);X.quadraticCurveTo(lx+th*2,cy,lx,cy+lh/2);X.quadraticCurveTo(lx-th*2,cy,lx,cy-lh/2);X.fill();X.stroke();
 let spot=0;[-.8,-.4,0,.4,.8].forEach(q=>{const yi=cy+q*lh/2*.85,ys=yi+(cy-yi)*(sx-lx)/(f*span);spot=Math.max(spot,Math.abs(ys-cy));ray([[v(10),yi],[lx,yi],[sx,ys]])});
 X.fillStyle='#ffffff';X.strokeStyle=Q.frame;X.lineWidth=2;X.fillRect(sx-v(4),cy-lh*.6,v(8),lh*1.2);X.strokeRect(sx-v(4),cy-lh*.6,v(8),lh*1.2);dot(sx,cy,Math.max(2,Math.min(spot,lh*.55)),'rgba(217,119,6,.45)');
 txt('lens',lx,cy+lh/2+v(16),12,Q.sub,800);txt('screen',sx,cy+lh*.6+v(14),12,Q.sub,800);if(G.done)txt('focus',fx,cy-v(14),12,Q.good,900);G.knob=knob(sx,cy-lh*.6-v(8));
 const ix=v(46),iy=t0+v(42),IR=v(30);skyDisc(ix,iy,IR);const r=Math.max(2,Math.min(IR-4,spot*.35));X.globalAlpha=Math.max(.25,Math.min(1,6/r));dot(ix,iy,r,Q.star);X.globalAlpha=1;txt('what you see',ix,iy+IR+v(12),10,Q.sub,800);G.geo={lx,span}}
function setS(s,check){if(G.won)return;G.s=Math.max(.08,Math.min(1,s));G.done=false;G.gap=G.s-LENS[G.k][0];if(!check)return A.redraw();
 if(Math.abs(G.gap)<=.03){A.sound.tick();G.k++;G.done=true;if(G.k>=2){G.won=true;G.k=1;G.msg='The fat lens bends light more, so its focus is nearer. Each lens brings starlight to one sharp point, the focus.';return sync()}
  right('Sharp! The light meets at one point, the focus. Now try a fat lens.');G.s=.95;G.gap=G.s-LENS[1][0];return sync()}
 wrong(G.gap<0?'Too close: the light has not met yet, so the star is a blurry blob. Move the screen away from the lens.':'Too far: the light met, then spread out again. Move the screen nearer the lens.')}
/* step: a curved mirror */
function drawMirror(t0,b0){const th=Math.min(v(120),(b0-t0-v(100))*.8),cy=t0+v(10)+th/2+v(16),sx=A.W*.8,h2=th/2,bend=v(16),x0=v(20),fm=(sx-x0)*.5;
 X.strokeStyle=Q.tube;X.lineWidth=v(6);[cy-h2-v(6),cy+h2+v(6)].forEach(y=>{X.beginPath();X.moveTo(x0+v(40),y);X.lineTo(sx+v(10),y);X.stroke()});X.beginPath();X.moveTo(sx+v(10),cy-h2-v(9));X.lineTo(sx+v(10),cy+h2+v(9));X.stroke();
 G.slot={x:sx-v(36),y:cy-h2-v(12),w:v(60),h:th+v(24)};const m=G.m;
 if(m==null){X.setLineDash([5,5]);X.strokeStyle=Q.hot;X.lineWidth=2;X.strokeRect(G.slot.x+v(10),cy-h2,v(26),th);X.setLineDash([]);txt('slot',sx-v(6),cy,11,Q.hot,900)}
 const mx=y=>{const q=(y-cy)/h2;return m===1?sx-bend*q*q:m===2?sx-bend*(1-q*q):sx};
 [-.75,-.25,.25,.75].forEach(q=>{const y=cy+q*h2*.9;if(m==null)return ray([[x0,y],[sx-v(4),y]]);const hx=mx(y);
  if(m===0)ray([[x0,y],[hx,y],[x0+v(40),y]]);if(m===1){const ex=sx-fm*1.3,ey=y+(cy-y)*(hx-ex)/(hx-(sx-fm));ray([[x0,y],[hx,y],[ex,ey]])}
  if(m===2){const vx=sx+fm,dx=hx-vx,dy=y-cy,L=Math.hypot(dx,dy),k=(sx-x0)*.6/L;ray([[x0,y],[hx,y],[hx+dx*k,y+dy*k]])}});
 if(m!=null){X.strokeStyle='#e2e8f0';X.lineWidth=v(7);X.beginPath();for(let i=0;i<=20;i++){const y=cy-h2+th*i/20;i?X.lineTo(mx(y),y):X.moveTo(mx(y),y)}X.stroke();X.strokeStyle=Q.frame;X.lineWidth=2;X.stroke()}
 if(m===1){dot(sx-fm,cy,v(7),Q.star);X.strokeStyle=Q.ray;X.lineWidth=2;X.beginPath();X.arc(sx-fm,cy,v(7),0,7);X.stroke();txt('light meets here',sx-fm,cy+v(20),12,Q.good,900)}
 const w=(A.W-v(48))/3,ty=b0-v(66);G.tiles=MIRRORS.map((nm,i)=>{const r={x:v(12)+i*(w+v(12)),y:ty,w,h:v(62),i};if(G.drag===2&&G.from===i&&G.dp&&G.moved){r.x=G.dp.x-w/2;r.y=G.dp.y-r.h/2}
  card(r.x,r.y,w,r.h,'#ffffff',G.m===i?(i===1?Q.good:Q.bad):Q.frame,G.m===i?4:2);const ix=r.x+v(18),iy=r.y+r.h/2,q=v(16);X.strokeStyle=Q.frame;X.lineWidth=3;X.beginPath();
  if(i===0){X.moveTo(ix,iy-q);X.lineTo(ix,iy+q)}else{X.moveTo(ix-(i===1?v(6):-v(6)),iy-q);X.quadraticCurveTo(ix+(i===1?v(6):-v(10)),iy,ix-(i===1?v(6):-v(6)),iy+q)}X.stroke();
  wrapW(nm,w-v(42),12).forEach((ln,j,Ls)=>txt(ln,r.x+v(34),iy+(j-(Ls.length-1)/2)*v(15),12,Q.ink,900,'left'));return r})}
function setM(i){if(G.won)return;G.m=i;if(i!==1)return wrong(MIRW[i]);A.sound.tick();G.won=true;G.msg='A mirror curved in, like a bowl, bounces all the light to one point. Big telescopes use mirrors like this: Webb’s is 6.5 m wide.';sync()}
/* step: lift the telescope above the air */
function drawSpace(t0,b0,now){const gy=b0-v(16),top=t0+v(106),ys=LEVELS.map((_,i)=>gy-v(14)-i/3*(gy-v(14)-top)),airTop=(ys[2]+ys[3])/2;
 X.fillStyle=Q.sky;X.fillRect(10,t0+v(4),A.W-20,airTop-t0-v(4));for(let i=0;i<6;i++){X.fillStyle=`rgba(147,197,253,${.18+i*.09})`;X.fillRect(10,airTop+(gy-airTop)*i/6,A.W-20,(gy-airTop)/6+1)}
 for(let i=0;i<14;i++)dot(20+((i*97)%(A.W-40)),t0+v(10)+((i*53)%Math.max(10,airTop-t0-v(16))),1.6,'#e2e8f0');
 X.fillStyle='#65a30d';X.fillRect(10,gy,A.W-20,v(12));X.fillStyle='#a8a29e';X.beginPath();X.moveTo(A.W*.04,gy);X.lineTo(A.W*.17,ys[1]+v(10));X.lineTo(A.W*.3,gy);X.fill();
 LEVELS.forEach((l,i)=>{X.font=`800 ${v(12)}px system-ui,sans-serif`;const w=X.measureText(l[0]).width+v(12),x=A.W*.4;card(x,ys[i]-v(11),w,v(22),i===G.lv?'#fef3c7':'#ffffff',i===G.lv?Q.hot:Q.frame,1.5);txt(l[0],x+v(6),ys[i],12,Q.ink,800,'left')});
 const tx=A.W*.27,ty=ys[G.lv];X.save();X.translate(tx,ty);X.rotate(-.6);card(-v(18),-v(7),v(36),v(14),'#e2e8f0',Q.frame,2,4);X.restore();G.knob=knob(tx-v(22),ty+v(4));
 const ix=A.W-v(46),iy=t0+v(44),IR=v(30),blur=LEVELS[G.lv][1];skyDisc(ix,iy,IR);
 if(!blur)dot(ix,iy,v(3.2),Q.star);else if(A.reduced())dot(ix,iy,v(3)+blur*v(9),'rgba(254,249,195,.55)');else{const t=Math.floor((now||0)/110);for(let j=0;j<5;j++){const a=Math.sin(t*12.9898+j*78.233)*43758.5453,r=(a-Math.floor(a))*blur*IR*.55,an=(t+j)*2.4;X.globalAlpha=.4;dot(ix+Math.cos(an)*r,iy+Math.sin(an)*r,v(3),Q.star)}X.globalAlpha=1}
 txt('the star',ix,iy+IR+v(12),11,'#f8fafc',800);G.ys=ys}
function setLv(l,check){if(G.won)return;G.lv=Math.max(0,Math.min(3,Math.round(l)));if(!check)return A.redraw();
 if(G.lv===3){A.sound.tick();G.won=true;G.msg='Above the air the star is a steady, sharp dot. Hubble orbits about 500 km up. James Webb is much farther: about 1.5 million km away, past the Moon.';return sync()}
 right(LEVW[G.lv]);sync()}
/* who is right */
function drawKids(t0,b0){const [stem,opts]=KIDS[Math.min(G.k,2)],S=wrapW(stem,A.W-v(30),15);S.forEach((s,j)=>txt(s,A.W/2,t0+v(16)+j*v(19),15,Q.ink,900));const y0=t0+v(12)+S.length*v(19),h=Math.min(v(70),(b0-y0)/3-v(6));
 G.opts=opts.map((o,i)=>{const r={x:v(16),y:y0+i*(h+v(6)),w:A.W-v(32),h,i};card(r.x,r.y,r.w,h,'#ffffff',Q.frame,2);X.fillStyle=['#c7d2fe','#fed7aa','#a7f3d0'][i];X.fillRect(r.x+v(10),r.y+h/2-v(14),v(30),v(28));txt(o[0],r.x+v(25),r.y+h/2,11,Q.ink,900);
  wrapW(o[1],r.w-v(70),14).forEach((ln,j,L)=>txt(ln,r.x+v(52),r.y+h/2+(j-(L.length-1)/2)*v(17),14,Q.ink,700,'left'));return r})}
function judge(i){if(G.won)return;const o=KIDS[G.k][1][i];if(o[2])return wrong(`${o[0]} is not right. ${o[2]}`);right(`${o[0]} is right.`);G.k++;if(G.k>=3){G.won=true;G.msg='Wide to catch light, curved to focus it, high above the air to see clearly.'}sync()}
function draw(api,dt){X.fillStyle=A.col.dark?'#1f2937':Q.bg;X.fillRect(0,0,A.W,A.H);X.fillStyle=Q.bg;A.paint.rrect(5,5,A.W-10,A.H-10,16);X.fill();
 const g=mode(),y=banner(G.won?H[g][1]:H[g][0],G.won),b=A.H-(G.msg?wrapW('✓ '+G.msg,A.W-48,13).length*(v(13)+5)+v(26):v(12));
 if(g==='wide')drawWide(y,b);if(g==='lens')drawLens(y,b);if(g==='mirror')drawMirror(y,b);if(g==='space')drawSpace(y,b,performance.now());if(g==='kids')drawKids(y+v(4),b);
 if(g==='quiz'){const R=Math.min(v(80),(b-y)/2-v(10));skyDisc(A.W/2,y+v(10)+R,R);STARS.forEach(s=>dot(A.W/2+s[0]*R*.88,y+v(10)+R+s[1]*R*.88,Math.max(1.8,v(4)-s[2]/12),Q.star))}footer();A.fx.draw(X)}
const find=(L,p)=>(L||[]).find(r=>r&&hitR(p,r));
function down(p){const g=mode();if(G.won&&g!=='quiz')return false;
 if(g==='wide'&&hitR(p,G.knob)){G.drag=1;return true}
 if(g==='lens'&&hitR(p,G.knob)){G.drag=1;return true}
 if(g==='mirror'){const t=find(G.tiles,p);if(t){G.drag=2;G.from=t.i;G.dp=p;G.p0=p;G.moved=false;return true}}
 if(g==='space'&&hitR(p,G.knob)){G.drag=1;return true}
 if(g==='kids'){const r=find(G.opts,p);if(r){judge(r.i);return true}}
 return false}
function move(p){if(!G.drag)return;const g=mode();
 if(G.drag===2){G.dp=p;if(Math.hypot(p.x-G.p0.x,p.y-G.p0.y)>v(8))G.moved=true;return A.redraw()}
 if(g==='wide')setD(1+(p.x-G.trk.x0)/(G.trk.x1-G.trk.x0)*7);if(g==='lens')setS((p.x-G.geo.lx)/G.geo.span);
 if(g==='space'){let best=0;G.ys.forEach((y,i)=>{if(Math.abs(p.y-y)<Math.abs(p.y-G.ys[best]))best=i});setLv(best)}}
function up(p){const d=G.drag;if(!d)return;G.drag=0;const g=mode();
 if(d===2){const i=G.from,mv=G.moved;G.moved=false;G.dp=null;if(!mv||(p&&hitR(p,G.slot)))return setM(i);return sync()}
 if(g==='wide')setD(G.d,1);if(g==='lens')setS(G.s,1);if(g==='space')setLv(G.lv,1)}
function sync(){tell((G.msg?G.msg+' ':'')+SCART.say(mode(),G));controls();G.after()}
function controls(){if(!pad)return;pad.innerHTML='';const g=mode(),b=(s,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},pad,s).onclick=()=>{fn();sync()}};
 if(!G.won){if(g==='wide'){b('Wider lens',()=>setD(G.d+1,1));b('Narrower lens',()=>setD(G.d-1,1))}
  if(g==='lens'){b('Screen nearer the lens',()=>setS(G.s-.025,1));b('Screen farther away',()=>setS(G.s+.025,1))}
  if(g==='mirror')MIRRORS.forEach((nm,i)=>b(`Put in the ${nm.toLowerCase()} mirror`,()=>setM(i)));
  if(g==='space'){b('Go higher',()=>setLv(G.lv+1,1));b('Go lower',()=>setLv(G.lv-1,1))}
  if(g==='kids')KIDS[G.k][1].forEach((o,i)=>b(o[0]+' is right',()=>judge(i)))}
 A.redraw()}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const id=++gen;fns.forEach((f,j)=>setTimeout(()=>{if(id===gen){f();sync()}},(j+1)*(A.reduced()?50:ms)))};
function clear(){gen++;Object.assign(G,{after:()=>{},won:false,msg:'',bad:false,drag:0,k:0,d:1,s:.95,gap:.33,done:false,m:null,lv:0,from:null,dp:null,moved:false})}
const steps=[
{h:'Catch more light',p:'Your eye lets in only a little light, so faint stars stay hidden. A telescope has a much wider lens or mirror to catch more light.',
predict:{q:'Make the lens wider. What will you see?',opts:['The same stars','More stars, even faint ones','Fewer stars'],ans:1},
task:'Find the faint galaxy',show:()=>{steps[0].go();play([3,5,7].map(d=>()=>setD(d,1)),400)},go:()=>{clear();sync();G.after=ready(0,()=>G.won,'Galaxy found.')}},
{h:'Bend the light',p:'Light from a far star comes in straight. A curved glass lens bends it, so it meets at one point: the focus.',
predict:{q:'Starlight goes through a curved glass lens. What does the light do?',opts:['Goes straight on','Bends and meets at one point','Bounces back'],ans:1},
task:'Focus 2 lenses',show:()=>{steps[1].go();play([()=>setS(LENS[0][0],1),()=>setS(LENS[1][0],1)],600)},go:()=>{clear();sync();G.after=ready(1,()=>G.won,'Both in focus.')}},
{h:'Or use a mirror',p:'Big telescopes use a curved mirror instead of a lens. It bounces the light back to one point. Which shape works?',
task:'Find the mirror that focuses light',show:()=>{steps[2].go();play([()=>setM(1)],400)},go:()=>{clear();sync();G.after=ready(2,()=>G.won,'Curved in.')}},
{h:'Above the air',p:'The air around Earth is always moving. It bends starlight about, so stars twinkle and pictures blur.',
predict:{q:'Why do stars twinkle?',opts:['They switch on and off','Moving air bends their light','Clouds in space'],ans:1},
task:'Lift the telescope above the air',show:()=>{steps[3].go();play([1,2,3].map(l=>()=>setLv(l,1)),400)},go:()=>{clear();sync();G.after=ready(3,()=>G.won,'Sharp star.')}},
{h:'Check the facts',p:'Three children explain telescopes. Only one is right each time.',
task:'Find who is right 3 times',show:()=>{steps[4].go();play(KIDS.map(()=>()=>judge(KIDS[G.k][1].findIndex(o=>!o[2]))),450)},go:()=>{clear();sync();G.after=ready(4,()=>G.won,'Facts checked.')}},
{h:'Challenge',p:'',go:()=>{clear();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>G.after()});
let row=0;
function ask(){qn++;const [qq,ok,bad]=QZ[qn%QZ.length],all=[[ok,'ok']].concat(bad),r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 box.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=box.querySelector('.fl-pick');ord.forEach(([w,tg])=>{c.el('button',{type:'button',class:'lbtn'},g,w).onclick=()=>grade(tg,ok)});tell('Challenge: '+qq);A.redraw()}
function grade(tg,ok){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),win=tg==='ok';let m=WHY[tg]||'Think: wide to catch light, curved to focus, high to see clearly.';
 if(tg==='small')m='A smaller lens or mirror catches less light, so faint stars fade away. Wider is better.';
 if(tg==='flash')m='Stars shine all the time. Moving air in our sky bends their light about, so they seem to flicker.';
 if(tg==='hubble')m='Hubble is a telescope that went up in 1990. Galileo saw Jupiter’s moons in 1610.';
 if(win){row++;A.win()}else{row=0;A.sound.miss()}fb.innerHTML=`${win?'✓ Yes: '+ok+'. In a row: '+row+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.66,tall:1.25,draw,onStep:B=>{box.hidden=B.step!==5;pad.hidden=B.step===5;controls()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Telescope lab buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up});
  A.every(()=>{if(A.step===3&&!G.won&&LEVELS[G.lv][1]&&!A.reduced()){const t=Math.floor(performance.now()/110);if(t!==G.tw){G.tw=t;A.redraw()}return true}return false})}}).start()})})();
