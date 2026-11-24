/* Flagship – Seismic waves and Earth's interior (ages 11–13; KS3 structure of the Earth, GCSE Physics seismic waves,
   NGSS HS-ESS2-3). Sort P and S wave facts; test which wave crosses a solid and a liquid; drag a seismometer until the
   S minus P gap gives its distance; place stations round a cut-through Earth to find the S and P shadow zones; match
   each seismic clue to the layer it reveals. Data and drawings: seis_art.js. Every drag or tap has a button twin. */
(()=>{const S=SEIS;
VIS.reg('flagseiswave',c=>{let A,P,pad,qz,qk=-1,run=0;const K={};
const part=()=>['sort','pass','lag','shadow','clue','quiz'][A.step];
const on=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function bg(){const g=A.ctx;g.fillStyle=A.col.dark?'#111827':'#f8fafc';g.fillRect(0,0,A.W,A.H)}
/* ---------- 1. P or S? ---------- */
let BIN=[],HOLD=null;
function file(w){const s=K.so,it=S.CARDS[s.i];if(!it)return;s.drag=null;if(w!==it.w){s.bad=w;A.sound.miss();return say(S.CARD_NO[s.i],true)}
 s.n[w]++;s.i++;s.bad=-1;A.sound.pop();say(`Yes, ${w?'S':'P'} wave.`+(s.i<S.CARDS.length?' Next card.':''),false)}
function drawSort(){const s=K.so,it=S.CARDS[s.i],y0=P.strip(it?`Card ${s.i+1} of ${S.CARDS.length}: P wave or S wave?`:S.DONE[0],it?(s.bad>=0?'no':''):'ok',K.note,K.bad),g=A.ctx;
 const gp=10,bw=(A.W-16-gp)/2,bh=Math.min(A.H*.42,220),by=A.H-bh-8;
 BIN=[0,1].map(w=>{const r={w,x:8+w*(bw+gp),y:by,w:bw,h:bh};P.card(r,`${w?'S wave (secondary)':'P wave (primary)'}: ${s.n[w]}`,{n:15,no:s.bad===w,top:1});S.spring(g,r.x+8,r.y+bh*.32,bw-16,bh*.6,w);return r});
 if(it){const w=Math.min(A.W*.8,380),h=Math.min(by-y0-14,86),d=s.drag;HOLD={x:d?d.x-w/2:(A.W-w)/2,y:d?d.y-h/2:y0+2,w,h};P.card(HOLD,it.t,{n:16,sel:!!d})}else HOLD=null}
/* ---------- 2. through solid and liquid ---------- */
let ANS=[];
function answer(v){const s=K.pa,t=S.TESTS[s.i];if(!t)return;if(v!==t.ok){s.bad=v;A.sound.miss();return say(S.WHY[s.i],true)}
 s.res.push(v);s.i++;s.bad=-1;A.sound.pop();say((v?'Gets through. ':'Stopped. ')+S.WHY[s.i-1],false)}
function drawPass(){const s=K.pa,t=S.TESTS[s.i],y0=P.strip(t?`Test ${s.i+1} of 4: does a${t.w==='S'?'n':''} ${t.w} wave get through ${t.m}?`:S.DONE[1],t?(s.bad>=0?'no':''):'ok',K.note,K.bad),g=A.ctx;
 const bh=Math.min(A.H*.26,140),bx=A.W*.38,bw=A.W*.3,by=y0+6;
 if(t){S.spring(g,8,by+bh*.2,bx-16,bh*.6,t.w==='S'?1:0);g.fillStyle=t.m==='liquid'?'#38bdf8':'#78716c';g.fillRect(bx,by,bw,bh);g.strokeStyle=P.fg();g.lineWidth=2;g.strokeRect(bx,by,bw,bh);
  g.font=`800 ${P.sz(15)}${P.F}`;g.fillStyle=INKON(t.m);g.textAlign='center';g.textBaseline='middle';g.fillText(t.m==='liquid'?'Liquid':'Solid rock',bx+bw/2,by+bh/2)}
 const ly=by+bh+10;g.font=`700 ${P.sz(14)}${P.F}`;g.fillStyle=P.fg();g.textAlign='left';g.textBaseline='top';
 s.res.forEach((v,i)=>g.fillText(`${S.TESTS[i].w} through ${S.TESTS[i].m}: ${v?'gets through ✓':'stopped ✗'}`,12,ly+i*P.sz(14)*1.35));
 const gp=10,kw=(A.W-16-gp)/2,kh=Math.min(A.H*.2,100),ky=A.H-kh-8;ANS=t?[1,0].map((v,j)=>{const r={v,x:8+j*(kw+gp),y:ky,w:kw,h:kh};P.card(r,v?'Gets through':'Stopped',{n:18,no:s.bad===v});return r}):[]}
const INKON=m=>m==='liquid'?'#0f172a':'#ffffff';
/* ---------- 3. S minus P gap gives distance ---------- */
let TRACK=null;
const dx=d=>TRACK.x+d/S.DMAX*TRACK.w;
function move(by){const s=K.la;s.d=Math.max(0,Math.min(S.DMAX,s.d+by));A.sound.tick();say(`Station at ${s.d} km: the S wave comes ${S.lag(s.d)} s after the P wave.`,false)}
function test(){const s=K.la,T=S.TARGET[s.k];if(T==null)return;const L=S.lag(s.d);
 if(L!==T){s.bad=true;A.sound.miss();return say(`Here the gap is ${L} s, but the target is ${T} s. Move ${L<T?'further from':'closer to'} the quake: the gap grows with distance.`,true)}
 s.hits.push(s.d);s.k++;s.bad=false;A.sound.pop();say(`Match: a ${T} s gap means ${s.d} km away.`+(s.k<S.TARGET.length?' Next target.':''),false)}
function drawLag(){const s=K.la,T=S.TARGET[s.k],y0=P.strip(T!=null?`Target ${s.k+1} of 3: find where the S wave arrives ${T} s after P.`:S.DONE[2],T!=null?(s.bad?'no':''):'ok',K.note,K.bad),g=A.ctx;
 const th=Math.min(A.H*.3,150);S.trace(g,8,y0+4,A.W-16,th,s.d);
 const ty=y0+th+Math.min(A.H*.16,70);TRACK={x:40,y:ty-26,w:A.W-80,h:52};g.strokeStyle=P.fg();g.lineWidth=3;g.beginPath();g.moveTo(TRACK.x,ty);g.lineTo(TRACK.x+TRACK.w,ty);g.stroke();
 g.font=`700 ${P.sz(12)}${P.F}`;g.fillStyle=P.fg();g.textAlign='center';g.textBaseline='top';for(let d=0;d<=S.DMAX;d+=100){g.fillRect(dx(d)-1,ty-6,2,12);g.fillText(`${d} km`,dx(d),ty+10)}
 g.fillStyle='#dc2626';g.beginPath();g.arc(TRACK.x,ty,9,0,7);g.fill();s.hits.forEach(d=>{g.fillStyle='#047857';g.beginPath();g.arc(dx(d),ty,7,0,7);g.fill()});
 const x=dx(s.d);g.fillStyle=s.drag?'#1d4ed8':'#334155';g.beginPath();g.moveTo(x,ty-6);g.lineTo(x-13,ty-30);g.lineTo(x+13,ty-30);g.closePath();g.fill();
 g.font=`800 ${P.sz(15)}${P.F}`;g.fillStyle=P.fg();g.textBaseline='bottom';g.fillText(`${s.d} km · gap ${S.lag(s.d)} s`,Math.max(70,Math.min(A.W-70,x)),ty-34);
 g.textAlign='left';g.textBaseline='top';g.font=`700 ${P.sz(14)}${P.F}`;P.wrap('Found: '+(s.hits.length?s.hits.map((d,i)=>`${S.TARGET[i]} s = ${d} km`).join(', '):'none yet'),A.W-24,g.font).forEach((t,i)=>g.fillText(t,12,ty+34+i*P.sz(14)*1.3))}
/* ---------- 4. shadow zones ---------- */
let GLOBE=null;
function place(a){const s=K.sh;a=Math.max(5,Math.min(180,Math.round(a/5)*5));const z=S.zone(a);s.st.push(a);const fresh=!s.found[z];s.found[z]=true;A.sound[fresh?'pop':'tick']();
 say(`Station at ${a}°: ${S.ZONE[z]}.`+(fresh?' New zone found!':'')+(s.found.every(Boolean)?'':` Zones found: ${s.found.filter(Boolean).length} of 3.`),false)}
function drawShadow(){const s=K.sh,all=s.found.every(Boolean),y0=P.strip(all?S.DONE[3]:'Tap the surface to place a seismometer. Which waves reach it?',all?'ok':'',K.note,K.bad),g=A.ctx;
 const r=Math.min(A.W*.34,(A.H-y0)*.28,180),cx=A.W/2,cy=y0+r+18;GLOBE={cx,cy,r};S.earth(g,cx,cy,r,A.col.dark,s.found);
 s.st.forEach(a=>{const z=S.zone(a);if(z===0){S.ray(g,cx,cy,r,a,S.SC,8);S.ray(g,cx,cy,r,a,S.PC)}else if(z===2)S.ray(g,cx,cy,r,a,S.PC);
  const t=a*Math.PI/180,x=cx+r*Math.sin(t),y=cy-r*Math.cos(t);g.fillStyle=['#047857','#dc2626','#1d4ed8'][z];g.beginPath();g.arc(x,y,7,0,7);g.fill();g.strokeStyle='#ffffff';g.lineWidth=2;g.stroke()});
 const ky=cy+r+14;g.font=`700 ${P.sz(13)}${P.F}`;g.textAlign='left';g.textBaseline='top';const lh=P.sz(13)*1.4;[['P wave path',S.PC,0,0],['S wave path',S.SC,.5,0],['Red rim: shadow zone, no direct waves','#dc2626',0,1],['Blue rim: P only, no S','#2563eb',0,2]].forEach(([t,col,cx2,row])=>{const x=12+cx2*(A.W-24);g.fillStyle=col;g.fillRect(x,ky+row*lh+4,14,6);g.fillStyle=P.fg();g.fillText(t,x+20,ky+row*lh)});
 P.wrap('Layers: mantle (brown), liquid outer core (orange), solid inner core (yellow)',A.W-24,g.font).forEach((t,i)=>g.fillText(t,12,ky+(3+i)*lh))}
/* ---------- 5. clues ---------- */
let BOXES=[];
function match(z){const s=K.cl,it=S.CLUES[s.i];if(!it)return;if(z!==it.c){s.bad=z;A.sound.miss();return say(S.CLUE_NO[s.i],true)}
 s.i++;s.bad=-1;A.sound.pop();say(`Yes: ${S.CONC[z].toLowerCase()}.`,false)}
function drawClue(){const s=K.cl,it=S.CLUES[s.i],y0=P.strip(it?`Clue ${s.i+1} of 4: ${it.t}. What does it tell us?`:S.DONE[4],it?(s.bad>=0?'no':''):'ok',K.note,K.bad);
 const cols=A.narrow?1:2,rows=4/cols,gp=8,w=(A.W-16-gp*(cols-1))/cols,h=Math.min((A.H-y0-10-gp*(rows-1))/rows,90);
 BOXES=S.CONC.map((t,z)=>{const done=S.CLUES.slice(0,s.i).some(q=>q.c===z),r={z,x:8+(z%cols)*(w+gp),y:y0+4+Math.floor(z/cols)*(h+gp),w,h};P.card(r,t+(done?' ✓':''),{n:16,ok:done,no:s.bad===z});return r})}
/* ---------- wiring ---------- */
function draw(){bg();const m=part();if(m==='quiz'){P.strip('Challenge: seismic waves','ok');const r=Math.min(A.W,A.H)*.28;S.earth(A.ctx,A.W/2,A.H*.58,r,A.col.dark,[0,1,1]);return}
 ({sort:drawSort,pass:drawPass,lag:drawLag,shadow:drawShadow,clue:drawClue})[m]();A.fx.draw(A.ctx)}
function down(p){const m=part();
 if(m==='sort'){if(HOLD&&on(p,HOLD)){K.so.drag={x:p.x,y:p.y};return true}const r=BIN.find(r=>on(p,r));if(r)file(r.w);return false}
 if(m==='pass'){const r=ANS.find(r=>on(p,r));if(r)answer(r.v);return false}
 if(m==='lag'&&on(p,{x:TRACK.x-20,y:TRACK.y-20,w:TRACK.w+40,h:TRACK.h+20})){K.la.drag=true;slide(p);return true}
 if(m==='shadow'&&GLOBE){const dx=p.x-GLOBE.cx,dy=p.y-GLOBE.cy,d=Math.hypot(dx,dy);if(Math.abs(d-GLOBE.r)<GLOBE.r*.25)place(Math.abs(Math.atan2(dx,-dy))*180/Math.PI);return false}
 if(m==='clue'){const r=BOXES.find(r=>on(p,r));if(r)match(r.z);return false}return false}
function slide(p){const m=part();if(m==='sort'&&K.so.drag){K.so.drag.x=p.x;K.so.drag.y=p.y;A.redraw()}
 if(m==='lag'&&K.la.drag){K.la.d=Math.max(0,Math.min(S.DMAX,Math.round((p.x-TRACK.x)/TRACK.w*S.DMAX/50)*50));A.redraw()}}
function up(p){const m=part();
 if(m==='sort'&&K.so.drag){K.so.drag=null;const r=BIN.find(r=>on(p,r));if(r)file(r.w);else{A.redraw();say('Drop the card on P wave or S wave.',false)}}
 if(m==='lag'&&K.la.drag){K.la.drag=false;test()}}
function fresh(){run++;for(const k in K)delete K[k];Object.assign(K,{so:{i:0,n:[0,0],bad:-1,drag:null},pa:{i:0,res:[],bad:-1},la:{d:0,k:0,hits:[],bad:false,drag:false},
 sh:{st:[],found:[false,false,false]},cl:{i:0,bad:-1},note:null,bad:false,test:()=>{}})}
function say(t,bad){K.note=t;K.bad=!!bad;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();K.test()}
const check=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(S.DONE[i]+A.reveal(i))};
function begin(i,ok){fresh();c.say(S.DESC[i]);A.cv.setAttribute('aria-label',S.DESC[i]);K.test=check(i,ok);controls();A.redraw()}
function demo(i,list){steps[i].go();const e=run;let t=0;list.forEach(([ms,f])=>{t+=ms;setTimeout(()=>{if(e===run)f()},t)})}
function controls(){if(!pad)return;pad.innerHTML='';const m=part(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(m==='sort'&&S.CARDS[K.so.i])['P wave','S wave'].forEach((t,w)=>B(t,()=>file(w),`${S.CARDS[K.so.i].t}: ${t}`));
 if(m==='pass'&&S.TESTS[K.pa.i])[['Gets through',1],['Stopped',0]].forEach(([t,v])=>B(t,()=>answer(v),`${S.TESTS[K.pa.i].w} wave in ${S.TESTS[K.pa.i].m}: ${t.toLowerCase()}`));
 if(m==='lag'&&K.la.k<S.TARGET.length){B('Closer (−50 km)',()=>move(-50),'Move the station 50 km closer to the quake');B('Further (+50 km)',()=>move(50),'Move the station 50 km further from the quake');B('Check this spot',test,'Check the S minus P gap here')}
 if(m==='shadow')S.SPOTS.forEach(a=>B(`${a}°`,()=>place(a),`Place a station ${a} degrees round from the quake`));
 if(m==='clue'&&S.CLUES[K.cl.i])S.CONC.forEach((t,z)=>B(t,()=>match(z),`${S.CLUES[K.cl.i].t}: ${t}`))}
const steps=[
{h:'P waves and S waves',p:S.TXT[0],predict:{q:'In a P wave, which way does the rock move?',opts:['Up and down, across the path of the wave','Back and forth, along the path of the wave'],ans:1},task:'Sort all 6 cards',
 show:()=>demo(0,S.CARDS.map(it=>[380,()=>file(it.w)])),go:()=>begin(0,()=>K.so.i>=S.CARDS.length)},
{h:'Solid or liquid?',p:S.TXT[1],predict:{q:'Can an S wave travel through a liquid?',opts:['Yes, just like a P wave','No, a liquid cannot pass on a sideways shake'],ans:1},task:'Run all 4 tests',
 show:()=>demo(1,S.TESTS.map(t=>[500,()=>answer(t.ok)])),go:()=>begin(1,()=>K.pa.i>=S.TESTS.length)},
{h:'How far away?',p:S.TXT[2],predict:{q:'Further from the quake, the gap between the P and S arrivals...',opts:['stays the same','gets bigger'],ans:1},task:'Match all 3 gaps',
 show:()=>demo(2,[[300,()=>move(50)],[300,()=>move(50)],[300,test],[300,()=>move(100)],[300,()=>{K.la.d=200;test()}],[300,()=>{K.la.d=400;test()}]]),go:()=>begin(2,()=>K.la.k>=S.TARGET.length)},
{h:'Find the shadow zones',p:S.TXT[3],task:'Find all 3 zones',
 show:()=>demo(3,[[400,()=>place(60)],[400,()=>place(120)],[400,()=>place(160)]]),go:()=>begin(3,()=>K.sh.found.every(Boolean))},
{h:'What the waves tell us',p:S.TXT[4],predict:{q:'Nobody has drilled to the core. How do we know the outer core is liquid?',opts:['From rock brought up from the core','S waves cannot pass through it'],ans:1},task:'Match all 4 clues',
 show:()=>demo(4,S.CLUES.map(q=>[450,()=>match(q.c)])),go:()=>begin(4,()=>K.cl.i>=S.CLUES.length)},
{h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>K.test()});
function slip(t){let m='Earthquake waves are how we map the inside of Earth: P waves push, S waves shear, and liquids stop S.';
 if(t==='dir')m='That is the S wave. In a P wave the rock is pushed and pulled along the path, like a squeezed spring.';
 if(t==='solid')m='The outer core is liquid, so it stops S waves. Only the inner core is solid, which faint P waves in the shadow zone reveal.';
 if(t==='lag')m='S travels slower than P, so the further the station, the more S falls behind: about 12 s more for every 100 km.';
 if(t==='drill')m='The deepest hole ever drilled is about 12 km. Everything we know about the core comes from how waves cross it.';
 if(t==='order')m='P waves are faster, about 6 km/s against 3.5 km/s near the surface, so P always arrives first.';
 return m}
function quiz(){qk++;const Q=S.QS[qk%S.QS.length],all=[[Q.a,'ok'],...Q.o],r=qk%3,ord=all.slice(r).concat(all.slice(0,r));
 qz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>grade(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function grade(t,a){qz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':slip(t))}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:X=>{qz.hidden=X.step!==5;pad.hidden=X.step===5;controls()},
 init:X=>{A=X;P=S.PEN(A);const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Seismic waves lab buttons'},w);qz=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move:slide,up});controls()}}).start()})})();
