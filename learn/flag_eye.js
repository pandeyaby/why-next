/* Flagship – how the eye works (ages 7–9): light path, eye parts, pupil size, lens focus, steps to the brain. Data in learn/eye_art.js. */
(()=>{const {ROUNDS,PIECES,PARTS,ROOMS,SIZES,FOCUS,CHAIN,MIX,QS,DESC,DONE,T}=EYE;
VIS.reg('flageye',c=>{let A,ctl,chal,qi=-1,run=0;const S={};
const INK='#0f172a',OK='#166534',BAD='#9f1239',RIM='#475569',SEL='#1d4ed8',IRIS='#2563eb',RET='#be185d',NRV='#a16207',F='px system-ui,sans-serif';
const view=()=>'light parts pupil focus chain quiz'.split(' ')[A.step];
const fs=n=>A.narrow?n:Math.round(n*1.15);
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function ground(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#e0f2fe',A.col.dark?.07:.5);g.fillRect(0,0,A.W,A.H)}
function write(s,x,y,n,col,wt,al){const g=A.ctx;g.font=`${wt||700} ${fs(n)}${F}`;g.fillStyle=col||INK;g.textAlign=al||'center';g.textBaseline='middle';g.fillText(s,x,y)}
function pill(s,x,y,o){o=o||{};const g=A.ctx;let n=fs(o.n||13);g.font=`700 ${n}${F}`;let w=g.measureText(s).width+24;
 while(w>A.W-12&&n>10){n--;g.font=`700 ${n}${F}`;w=g.measureText(s).width+24}
 const h=n+14,x0=Math.max(6,Math.min(A.W-w-6,x-w/2));g.fillStyle=o.ok?'#dcfce7':o.no?'#ffe4e6':'#ffffff';A.paint.rrect(x0,y-h/2,w,h,h/2);g.fill();
 g.lineWidth=o.ok||o.no?3:1.5;g.strokeStyle=o.ok?OK:o.no?BAD:RIM;g.stroke();g.fillStyle=o.ok?OK:o.no?BAD:INK;g.textAlign='center';g.textBaseline='middle';g.fillText(s,x0+w/2,y+1)}
function card(r,o){o=o||{};const g=A.ctx;g.fillStyle=o.no?'#ffe4e6':o.ok?'#dcfce7':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.lineWidth=o.no||o.ok||o.on?3:1.5;g.strokeStyle=o.no?BAD:o.ok?OK:o.on?SEL:RIM;g.stroke()}
function arrow(x0,y0,x1,y1,col){const g=A.ctx,a=Math.atan2(y1-y0,x1-x0),h=12;g.strokeStyle=col;g.fillStyle=col;g.lineWidth=4;g.beginPath();g.moveTo(x0,y0);g.lineTo(x1-Math.cos(a)*h*.6,y1-Math.sin(a)*h*.6);g.stroke();
 g.beginPath();g.moveTo(x1,y1);g.lineTo(x1-h*Math.cos(a-.45),y1-h*Math.sin(a-.45));g.lineTo(x1-h*Math.cos(a+.45),y1-h*Math.sin(a+.45));g.closePath();g.fill()}
/* side view of an eye: light comes in from the left */
function sideEye(cx,cy,R,o){o=o||{};const g=A.ctx,pup=(o.pupil==null?.2:o.pupil)*R,th=o.lens||2;
 g.fillStyle=A.col.dark?'#f1f5f9':'#ffffff';g.beginPath();g.arc(cx,cy,R,0,7);g.fill();g.lineWidth=3;g.strokeStyle=RIM;g.stroke();
 g.beginPath();g.arc(cx-R*.55,cy,R*.62,Math.PI*.72,Math.PI*1.28);g.strokeStyle='#64748b';g.lineWidth=2;g.stroke();
 g.fillStyle=o.hi==='retina'?'#fbcfe8':'#fce7f3';g.beginPath();g.arc(cx,cy,R*.97,-1.05,1.05);g.arc(cx,cy,R*.86,1.05,-1.05,true);g.closePath();g.fill();
 g.strokeStyle=RET;g.lineWidth=4;g.beginPath();g.arc(cx,cy,R*.92,-1.05,1.05);g.stroke();
 g.fillStyle=NRV;g.fillRect(cx+R*.9,cy+R*.06,R*.6,R*.26);
 g.fillStyle=IRIS;[-1,1].forEach(s=>{const y0=cy+s*pup,y1=cy+s*R*.6;g.fillRect(cx-R*.9,Math.min(y0,y1),R*.1,Math.abs(y1-y0))});
 g.fillStyle='#bae6fd';g.strokeStyle='#0369a1';g.lineWidth=2;g.beginPath();g.ellipse(cx-R*.58,cy,R*(.05+.035*th),R*.34,0,0,7);g.fill();g.stroke()}
const anchor=(cx,cy,R)=>({iris:[cx-R*.85,cy-R*.42],pupil:[cx-R*.95,cy],lens:[cx-R*.58,cy+R*.22],retina:[cx+R*.92*Math.cos(-.7),cy+R*.92*Math.sin(-.7)],nerve:[cx+R*1.25,cy+R*.19]});
/* 1. lamp, ball, eye */
function spots(){return{lamp:{x:A.W*.15,y:A.H*.3},ball:{x:A.W*.5,y:A.H*.66},eye:{x:A.W*.85,y:A.H*.3}}}
function drawLight(){const s=S.a,g=A.ctx,P=spots(),r=Math.min(A.W*.09,46);ground();
 if(s.r>=ROUNDS.length){pill('You saw the ball and the lamp',A.W/2,A.H*.08,{ok:1})}else pill(ROUNDS[s.r].goal==='ball'?'See the BALL: tap where the light goes, in order':'Now see the LAMP: tap where its light goes',A.W/2,A.H*.08,{ok:s.ok});
 const L=P.lamp;g.fillStyle='#64748b';g.fillRect(L.x-4,L.y+r*.6,8,r*1.2);g.fillRect(L.x-r*.7,L.y+r*1.8,r*1.4,8);g.fillStyle='#facc15';g.beginPath();g.arc(L.x,L.y,r*.62,0,7);g.fill();g.lineWidth=2;g.strokeStyle='#a16207';g.stroke();
 g.strokeStyle='#ca8a04';g.lineWidth=3;for(let k=0;k<8;k++){const a=k*Math.PI/4;g.beginPath();g.moveTo(L.x+Math.cos(a)*r*.8,L.y+Math.sin(a)*r*.8);g.lineTo(L.x+Math.cos(a)*r*1.05,L.y+Math.sin(a)*r*1.05);g.stroke()}
 const B=P.ball;g.fillStyle='#dc2626';g.beginPath();g.arc(B.x,B.y,r*.7,0,7);g.fill();g.fillStyle='#fecaca';g.beginPath();g.arc(B.x-r*.22,B.y-r*.22,r*.16,0,7);g.fill();
 const E=P.eye;g.fillStyle='#ffffff';g.beginPath();g.ellipse(E.x,E.y,r*.95,r*.55,0,0,7);g.fill();g.lineWidth=3;g.strokeStyle=RIM;g.stroke();g.fillStyle=IRIS;g.beginPath();g.arc(E.x,E.y,r*.42,0,7);g.fill();g.fillStyle='#020617';g.beginPath();g.arc(E.x,E.y,r*.18,0,7);g.fill();
 PIECES.forEach(p=>write(p.t,P[p.k].x,P[p.k].y+r*(p.k==='lamp'?2.35:1.15),14,A.col.tx,800));
 const path=s.r<ROUNDS.length?s.path:ROUNDS[1].path;for(let i=1;i<path.length;i++){const a=P[path[i-1]],b=P[path[i]],d=Math.hypot(b.x-a.x,b.y-a.y),u=(b.x-a.x)/d,v=(b.y-a.y)/d;arrow(a.x+u*r,a.y+v*r,b.x-u*r,b.y-v*r,'#d97706')}
 if(s.bad)write('✗',P[s.bad].x,P[s.bad].y-r*1.1,22,BAD,900)}
function shine(k){const s=S.a;if(s.r>=ROUNDS.length)return;const R=ROUNDS[s.r],want=R.path[s.path.length];s.bad=null;
 if(k!==want){s.bad=k;A.sound.miss();
  if(!s.path.length)return tell(k==='eye'?T.eyeFirst:T.ballFirst);
  if(s.path.includes(k))return tell(T.again);
  return tell(R.goal==='ball'?T.skipBall:T.viaBall)}
 s.path.push(k);A.sound.pop();if(s.path.length<R.path.length)return tell(`Light goes to the ${k}. Where next?`);
 s.r++;s.path=[];tell(R.goal==='ball'?T.gotBall:T.gotLamp)}
/* 2. label the eye */
function eyeGeo(){const R=Math.min(A.W*.2,A.H*.2);return{cx:A.W*.53,cy:A.H*.36,R}}
function slotR(k){const {cx,cy,R}=eyeGeo(),w=Math.min(130,A.W*.27),h=fs(30),L=8,Rx=A.W-8-w;
 return{iris:{x:L,y:cy-R*1.15,w,h},pupil:{x:L,y:cy-h/2,w,h},lens:{x:L,y:cy+R*.8,w,h},retina:{x:Rx,y:cy-R*1.15,w,h},nerve:{x:Rx,y:cy+R*.8,w,h}}[k]}
function tagR(){const w=Math.min(130,(A.W-32)/3),h=fs(34),gap=8;return PARTS.map((p,i)=>{const row=i<3?0:1,n=row?2:3,col=row?i-3:i,x0=(A.W-(n*w+(n-1)*gap))/2;return{i,x:x0+col*(w+gap),y:A.H*.7+row*(h+10),w,h}})}
function drawParts(){const s=S.b,g=A.ctx,G=eyeGeo(),an=anchor(G.cx,G.cy,G.R);ground();sideEye(G.cx,G.cy,G.R);
 write('← light comes in',A.W/2,G.cy+G.R*1.28,12,A.col.tx,700);
 PARTS.forEach(p=>{const r=slotR(p.k),done=s.got.includes(p.k),[ax,ay]=an[p.k];g.strokeStyle=done?OK:'#64748b';g.lineWidth=2;g.setLineDash(done?[]:[4,4]);g.beginPath();g.moveTo(r.x+(r.x<A.W/2?r.w:0),r.y+r.h/2);g.lineTo(ax,ay);g.stroke();g.setLineDash([]);
  g.fillStyle=done?OK:'#0f172a';g.beginPath();g.arc(ax,ay,4,0,7);g.fill();card(r,{ok:done,on:s.hot===p.k});write(done?p.t:'?',r.x+r.w/2,r.y+r.h/2+1,13,done?OK:'#475569',800)});
 tagR().forEach(r=>{const p=PARTS[r.i];if(s.got.includes(p.k)||(S.drag&&S.drag.i===r.i))return;card(r,{no:s.bad===r.i,on:s.pick===r.i});write(p.t,r.x+r.w/2,r.y+r.h/2+1,13,INK,800)});
 if(S.drag){const d=S.drag,r=tagR()[d.i];card({x:d.x-r.w/2,y:d.y-r.h/2,w:r.w,h:r.h},{on:1});write(PARTS[d.i].t,d.x,d.y+1,13,INK,800)}
 pill(s.got.length>=PARTS.length?'All 5 parts labelled':'Drag each name to its label',A.W/2,A.H*.05,{ok:s.got.length>=PARTS.length})}
function name(i,k){const s=S.b,p=PARTS[i];s.pick=null;if(s.got.includes(p.k))return;
 if(p.k!==k){s.bad=i;A.sound.miss();const m=T.part[p.k];return tell(typeof m==='string'?m:m[k]||m._)}
 s.got.push(p.k);s.bad=-1;A.sound.pop();tell(`${p.t}: ${p.job}.`+(s.got.length>=PARTS.length?' All 5 done.':''))}
/* 3. pupil size */
const eyeFronts=()=>{const w=Math.min(150,(A.W-40)/3),h=w*.95,gap=10,x0=(A.W-(3*w+2*gap))/2;return SIZES.map((_,i)=>({i,x:x0+i*(w+gap),y:A.H*.55,w,h}))};
function drawPupil(){const s=S.c,g=A.ctx;ground();const room=ROOMS[Math.min(s.r,ROOMS.length-1)],lvl=room.lvl,pan={x:12,y:A.H*.13,w:A.W-24,h:A.H*.34};
 g.fillStyle=['#1e1b4b','#cbd5e1','#fef08a'][lvl];A.paint.rrect(pan.x,pan.y,pan.w,pan.h,16);g.fill();g.lineWidth=2;g.strokeStyle=RIM;g.stroke();
 const ix=pan.x+pan.w*.2,iy=pan.y+pan.h*.45,ir=Math.min(pan.h*.26,40);
 if(lvl===2){g.fillStyle='#f59e0b';g.beginPath();g.arc(ix,iy,ir,0,7);g.fill();g.strokeStyle='#b45309';g.lineWidth=3;for(let k=0;k<10;k++){const a=k*Math.PI/5;g.beginPath();g.moveTo(ix+Math.cos(a)*ir*1.2,iy+Math.sin(a)*ir*1.2);g.lineTo(ix+Math.cos(a)*ir*1.55,iy+Math.sin(a)*ir*1.55);g.stroke()}}
 else if(lvl===1){g.fillStyle='#f8fafc';g.fillRect(ix-ir,iy-ir*.3,ir*2,ir*.6);g.strokeStyle='#475569';g.strokeRect(ix-ir,iy-ir*.3,ir*2,ir*.6)}
 else{g.fillStyle='#e2e8f0';g.beginPath();g.arc(ix,iy,ir*.8,0,7);g.fill();g.fillStyle='#1e1b4b';g.beginPath();g.arc(ix+ir*.35,iy-ir*.15,ir*.75,0,7);g.fill()}
 write(s.r>=ROOMS.length?'All 3 places done':room.t,pan.x+pan.w*.62,iy,17,lvl?INK:'#f8fafc',900);
 write(T.amt[lvl],pan.x+pan.w*.62,iy+fs(26),13,lvl?INK:'#e2e8f0',700);
 eyeFronts().forEach(r=>{card(r,{no:s.bad===r.i});const cx=r.x+r.w/2,cy=r.y+r.h*.42,ro=Math.min(r.w,r.h)*.3;
  g.fillStyle=IRIS;g.beginPath();g.arc(cx,cy,ro,0,7);g.fill();g.fillStyle='#020617';g.beginPath();g.arc(cx,cy,ro*[.78,.5,.22][r.i],0,7);g.fill();
  write(SIZES[r.i],cx,r.y+r.h*.86,12,INK,800)});
 pill(s.r>=ROOMS.length?'Small in the sun, big in the dark':'Tap the pupil size for this place',A.W/2,A.H*.06,{ok:s.r>=ROOMS.length})}
function size(i){const s=S.c;if(s.r>=ROOMS.length)return;const lvl=ROOMS[s.r].lvl;
 if(i!==lvl){s.bad=i;A.sound.miss();return tell(T.size[lvl][i])}
 s.bad=-1;s.r++;A.sound.pop();tell(T.sizeOk[lvl]+(s.r>=ROOMS.length?' All 3 done.':''))}
/* 4. focus the lens */
function focusGeo(){const R=Math.min(A.W*.27,A.H*.27);return{cx:A.W*.6,cy:A.H*.44,R}}
const lensBtns=()=>{const w=Math.min(120,(A.W-40)/3),h=fs(40),y=A.H*.82,gap=10,x0=(A.W-(3*w+2*gap))/2;return['Thinner','Fatter','It is sharp'].map((t,i)=>({i,t,x:x0+i*(w+gap),y,w,h}))};
function drawFocus(){const s=S.d,g=A.ctx;ground();const G=focusGeo(),{cx,cy,R}=G,lx=cx-R*.58,rx=cx+R*.92,done=s.r>=FOCUS.length,o=FOCUS[Math.min(s.r,FOCUS.length-1)];
 sideEye(cx,cy,R,{lens:s.k,pupil:.34});const ox=o.far?A.W*.05:A.W*.16,oh=o.far?R*.35:R*.25,ty=cy-oh;
 if(o.far){g.fillStyle='#15803d';g.beginPath();g.arc(ox+8,ty+6,10,0,7);g.fill();g.fillStyle='#92400e';g.fillRect(ox+6,ty+14,4,oh-14)}else{g.fillStyle='#7c3aed';g.fillRect(ox,ty,14,oh);g.fillStyle='#ffffff';g.fillRect(ox+3,ty+4,8,3)}
 const d=R*(1.5+((o.want-s.k)*.34)),px=lx+d,py=cy+oh*.55,sharp=s.k===o.want;
 g.strokeStyle='#d97706';g.lineWidth=2;[-.3,0,.3].forEach(t=>{const yL=cy+t*R;g.beginPath();g.moveTo(ox+8,ty);g.lineTo(lx,yL);g.lineTo(rx,yL+(py-yL)*(rx-lx)/(px-lx));g.stroke()});
 const spread=Math.abs(px-rx)/(px-lx)*R*.6;if(sharp){g.fillStyle=o.far?'#92400e':'#7c3aed';g.fillRect(rx-8,cy,4,py-cy);if(o.far){g.fillStyle='#15803d';g.beginPath();g.arc(rx-6,py,6,0,7);g.fill()}}
 else{g.fillStyle='rgba(217,119,6,.35)';g.beginPath();g.ellipse(rx-3,py,5,Math.max(6,spread),0,0,7);g.fill()}
 write(sharp?'sharp, upside down':'blurry',cx,cy+R*1.15,12,sharp?(A.col.dark?'#86efac':OK):(A.col.dark?'#fda4af':BAD),800);
 write('lens',lx,cy-R*.5,12,INK,700);write('retina',rx,cy-R*.75,12,A.col.tx,700);
 lensBtns().forEach(b=>{card(b,{ok:b.i===2&&sharp&&!done});write(b.t,b.x+b.w/2,b.y+b.h/2+1,13,INK,800)});
 pill(done?'Far and near both sharp':`Make ${o.t} sharp on the retina`,A.W/2,A.H*.06,{ok:done})}
function lens(dk){const s=S.d;if(s.r>=FOCUS.length)return;s.k=Math.max(1,Math.min(5,s.k+dk));A.sound.tick();tell(`Lens ${dk>0?'fatter':'thinner'}: ${s.k===FOCUS[s.r].want?'the light now meets on the retina.':'look where the light meets.'}`)}
function lock(){const s=S.d;if(s.r>=FOCUS.length)return;const o=FOCUS[s.r];
 if(s.k!==o.want){A.sound.miss();return tell(s.k<o.want?T.fatter:T.thinner)}
 s.r++;A.sound.pop();if(s.r<FOCUS.length)s.k=FOCUS[s.r].start;tell(o.far?T.farOk:T.nearOk)}
/* 5. order the steps */
const rowH=()=>Math.min(fs(30),(A.H*.9-70)/10),slots=()=>{const h=rowH();return CHAIN.map((_,i)=>({i,x:12,y:A.H*.1+i*(h+6),w:A.W-24,h}))};
const piles=()=>{const h=rowH(),y0=A.H*.1+5*(h+6)+10;return MIX.map((ci,j)=>({i:ci,x:12,y:y0+j*(h+6),w:A.W-24,h}))};
function drawChain(){const s=S.e;ground();
 slots().forEach(r=>{const got=s.seq[r.i];card(r,{ok:got!=null});write(`${r.i+1}.  ${got!=null?CHAIN[got]:'…'}`,r.x+12,r.y+r.h/2+1,13,got!=null?OK:'#475569',800,'left')});
 piles().forEach(r=>{if(s.seq.includes(r.i))return;card(r,{no:s.bad===r.i});write(CHAIN[r.i],r.x+r.w/2,r.y+r.h/2+1,13,INK,800)});
 pill(s.seq.length>=CHAIN.length?'Seeing, step by step':'Tap the cards in the order they happen',A.W/2,A.H*.05,{ok:s.seq.length>=CHAIN.length})}
function order(i){const s=S.e;if(s.seq.includes(i))return;const n=s.seq.length;
 if(i!==n){s.bad=i;A.sound.miss();return tell(n===0?T.chain[0]:T.chain[i]||T.chain[1])}
 s.seq.push(i);s.bad=-1;A.sound.pop();tell(`Step ${n+1}: ${CHAIN[i]}.`+(s.seq.length>=CHAIN.length?' All 5 in order.':''))}
function draw(){const k=view();if(k==='quiz'){ground();pill('Challenge',A.W/2,A.H*.2,{ok:1});pill('Light in, lens, retina, nerve, brain',A.W/2,A.H*.5,{n:14});return}
 ({light:drawLight,parts:drawParts,pupil:drawPupil,focus:drawFocus,chain:drawChain})[k]();A.fx.draw(A.ctx)}
function down(p){const k=view();
 if(k==='light'){const P=spots(),r=Math.min(A.W*.09,46)*1.3;const f=PIECES.find(q=>Math.hypot(p.x-P[q.k].x,p.y-P[q.k].y)<=r);if(f)shine(f.k);return false}
 if(k==='parts'){const t=tagR().find(r=>hit(p,r)&&!S.b.got.includes(PARTS[r.i].k));if(t){S.drag={i:t.i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}
  const sl=PARTS.find(q=>hit(p,slotR(q.k)));if(sl&&S.b.pick!=null)name(S.b.pick,sl.k);return false}
 if(k==='pupil'){const r=eyeFronts().find(r=>hit(p,r));if(r)size(r.i);return false}
 if(k==='focus'){const b=lensBtns().find(r=>hit(p,r));if(b){b.i===2?lock():lens(b.i?1:-1);return false}const G=focusGeo();if(Math.abs(p.x-(G.cx-G.R*.58))<G.R*.3&&Math.abs(p.y-G.cy)<G.R*.5){S.lensY=p.y;return true}return false}
 if(k==='chain'){const r=piles().find(r=>hit(p,r)&&!S.e.seq.includes(r.i));if(r)order(r.i);return false}
 return false}
function move(p){if(view()==='focus'&&S.lensY!=null){const dy=S.lensY-p.y;if(Math.abs(dy)>24){lens(dy>0?1:-1);S.lensY=p.y}return}
 const d=S.drag;if(!d)return;d.x=p.x;d.y=p.y;const q=PARTS.find(q=>hit(p,slotR(q.k)));S.b.hot=q?q.k:null;A.redraw()}
function up(p){if(view()==='focus'){S.lensY=null;return}const d=S.drag;if(!d)return;S.drag=null;S.b.hot=null;const sl=PARTS.find(q=>hit(p,slotR(q.k)));
 if(sl)return name(d.i,sl.k);if(Math.hypot(p.x-d.x0,p.y-d.y0)<10){S.b.pick=d.i;return tell(`${PARTS[d.i].t} picked. Now tap the label where it goes.`)}A.redraw()}
function reset(){run++;for(const k in S)delete S[k];Object.assign(S,{a:{r:0,path:[],bad:null},b:{got:[],bad:-1,pick:null,hot:null},c:{r:0,bad:-1},d:{r:0,k:FOCUS[0].start},e:{seq:[],bad:-1},drag:null,lensY:null,check:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();pad();S.check()}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function open(i,ok){reset();tell(DESC[i]);S.check=finish(i,ok,DONE[i])}
function play(i,acts,ms){steps[i].go();const r0=run;acts.forEach((f,j)=>setTimeout(()=>{if(r0===run)f()},ms*(j+1)))}
function pad(){if(!ctl)return;ctl.innerHTML='';const k=view(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(k==='light'&&S.a.r<ROUNDS.length)PIECES.forEach(p=>B(`Light goes to the ${p.t.toLowerCase()}`,()=>shine(p.k)));
 if(k==='parts'){PARTS.forEach((p,i)=>{if(!S.b.got.includes(p.k))B(`Pick ${p.t}`,()=>{S.b.pick=i;tell(`${p.t} picked. Now choose a label.`)})});
  if(S.b.pick!=null)PARTS.forEach(q=>{if(!S.b.got.includes(q.k))B(`Put it on the label at the ${T.at[q.k]}`,()=>name(S.b.pick,q.k))})}
 if(k==='pupil'&&S.c.r<ROOMS.length)SIZES.forEach((t,i)=>B(t,()=>size(i),`${t} for the ${ROOMS[S.c.r].t.toLowerCase()}`));
 if(k==='focus'&&S.d.r<FOCUS.length){B('Make the lens thinner',()=>lens(-1));B('Make the lens fatter',()=>lens(1));B('It is sharp',lock,'Check: the picture is sharp')}
 if(k==='chain')CHAIN.forEach((t,i)=>{if(!S.e.seq.includes(i))B(t,()=>order(i),`Next step: ${t}`)})}
const steps=[
{h:'How we see',p:'Tap the lamp, the ball or the eye to show where the light goes, one by one.',
 predict:{q:'To see a ball, which way does the light go?',opts:['From my eye out to the ball','From the lamp, off the ball, into my eye'],ans:1},task:'See the ball, then the lamp',
 show:()=>play(0,ROUNDS.flatMap(R=>R.path.map(k=>()=>shine(k))),420),go:()=>open(0,()=>S.a.r>=ROUNDS.length)},
{h:'Parts of the eye',p:'This eye is cut in half and seen from the side. Drag each name to its label, or tap a name and then a label.',
 predict:{q:'What is the pupil?',opts:['A black dot painted on the eye','A hole that lets light in'],ans:1},task:'Label all 5 parts',
 show:()=>play(1,PARTS.map((p,i)=>()=>name(i,p.k)),520),go:()=>open(1,()=>S.b.got.length>=PARTS.length)},
{h:'Bright and dark',p:'Look at how much light there is. Tap the pupil size that lets in the right amount.',
 predict:{q:'In a dark room, what does your pupil do?',opts:['It gets smaller','It gets bigger'],ans:1},task:'Pick the pupil for all 3 places',
 show:()=>play(2,ROOMS.map(r=>()=>size(r.lvl)),600),go:()=>open(2,()=>S.c.r>=ROOMS.length)},
{h:'Focus on the retina',p:'Make the lens thinner or fatter (tap, or drag it up and down) until the light meets on the retina. Then tap It is sharp.',
 predict:{q:'When the picture lands on the retina, which way up is it?',opts:['The right way up','Upside down'],ans:1},task:'Make the far tree and the near book sharp',
 show:()=>play(3,[()=>lens(-1),()=>lens(-1),()=>lock(),()=>lens(1),()=>lens(1),()=>lock()],450),go:()=>open(3,()=>S.d.r>=FOCUS.length)},
{h:'Message to the brain',p:'Tap the five cards in the order they happen when you look at something.',
 predict:{q:'Which part works out what you are looking at?',opts:['The eye','The brain'],ans:1},task:'Put the 5 steps in order',
 show:()=>play(4,CHAIN.map((_,i)=>()=>order(i)),500),go:()=>open(4,()=>S.e.seq.length>=CHAIN.length)},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
function slip(t){let m='Light comes in, the lens bends it onto the retina, and the brain works out the picture.';
 if(t==='out')m='Eyes do not send light out. Light bounces off things into our eyes.';
 if(t==='source')m='A book makes no light of its own. A lamp or the Sun lights it, and that light bounces off it.';
 if(t==='dot')m='The pupil is a hole, not a dot. It looks black because the light goes in and does not come back out.';
 if(t==='size')m='In the dark the pupil gets bigger, to let more light in.';
 if(t==='lens')m='The lens only bends the light. The picture lands on the retina at the back.';
 if(t==='brain')m='The eye catches the light, but the brain works out what you are seeing.';
 if(t==='iris')m='The iris is the coloured ring. It changes the size of the pupil.';
 return m}
function ask(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':slip(t))}
FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:X=>{chal.hidden=X.step!==5;ctl.hidden=X.step===5;pad()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Eye lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});pad()}}).start()})})();
