/* Flagship – gravitational potential energy and height (ages 12–13): lift a crate up a 5 m scale and watch the
   gravitational store grow as E = m × g × h, swap masses at the same height, take three routes to the same shelf,
   repeat the lift on Earth, Mars and the Moon, then drag the crate up and let go so the store empties into the
   kinetic store. Drag the crate on the canvas, or use the buttons. */
(()=>{
const MASS=[1,2,4],WORLD=[['🌍','Earth',10],['🔴','Mars',3.7],['🌙','Moon',1.6]],TOP=5,EMAX=100;
const ROUTE=[['⬆️','Lift straight up','straight'],['🪜','Up the stairs','stairs'],['📐','Push up the ramp','ramp']];
const J=v=>(Math.round(v*10)/10).toString().replace(/\.0$/,'');
VIS.reg('flaglift',c=>{let A,keys,chal,ask=-1,ticket=0,best=0;
const zero=()=>({after:()=>{},h:0,m:2,w:0,tried:[],grab:null,path:null,t:0,h0:0,fall:false,v:0,blink:-1});let S=zero();
const job=()=>['lift','mass','route','world','fall','quiz'][A.step],still=()=>A.reduced();
const need=()=>({lift:2,mass:3,route:3,world:3,fall:3}[job()]||9);
const fs=n=>Math.round(n*(A.narrow?1:1.12));
const g=()=>WORLD[S.w][2],Ep=()=>S.m*g()*S.h,Ek=()=>S.fall||S.v?S.m*g()*(S.h0-S.h):0;
function note(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function put(x,t,X,Y,n,col,al,mw){x.font=`700 ${fs(n)}px system-ui,sans-serif`;x.textAlign=al||'center';x.textBaseline='middle';x.fillStyle=col||A.col.tx;x.fillText(t,X,Y,mw||A.W)}
/* geometry: the scene on the left, the energy bars on the right */
const ground=()=>A.H*.86,top=()=>A.H*.14,yAt=h=>ground()-h*(ground()-top())/TOP,hAt=y=>Math.max(0,Math.min(TOP,Math.round((ground()-y)/(ground()-top())*TOP*2)/2));
const sceneW=()=>A.W*(A.narrow?.6:.64),crateX=()=>S.path?S.path.x:sceneW()*.62,crateS=()=>Math.min(A.W*.09,46)*(.8+.15*S.m);
function crate(x,X,Y,s){x.fillStyle='#b45309';A.paint.rrect(X-s/2,Y-s,s,s,5);x.fill();x.strokeStyle='#78350f';x.lineWidth=2;x.stroke();x.beginPath();x.moveTo(X-s/2,Y-s);x.lineTo(X+s/2,Y);x.moveTo(X+s/2,Y-s);x.lineTo(X-s/2,Y);x.stroke();put(x,S.m+' kg',X,Y-s/2,12,'#fff')}
function routes(x){const sx=crateX(),y3=yAt(3),gy=ground(),C=A.col;x.lineWidth=3;
 x.strokeStyle=A.alpha(C.cy,.7);x.beginPath();x.moveTo(sceneW()*.08,gy);x.lineTo(sx-30,y3);x.stroke();
 x.strokeStyle=A.alpha(C.vi,.75);x.beginPath();let px=sceneW()*.3,py=gy;x.moveTo(px,py);for(let i=0;i<6;i++){py-=(gy-y3)/6;x.lineTo(px,py);px+=(sx-30-sceneW()*.3)/6;x.lineTo(px,py)}x.stroke();
 x.fillStyle=A.mix(C.tx,C.pn,.3);x.fillRect(sx-34,y3,68,6)}
function pathOf(k){const sx=crateX(),y3=yAt(3),gy=ground();if(k===0)return[[sx,gy],[sx,y3]];if(k===2)return[[sceneW()*.08,gy],[sx-30,y3],[sx,y3]];
 const pts=[[sceneW()*.3,gy]];let px=sceneW()*.3,py=gy;for(let i=0;i<6;i++){py-=(gy-y3)/6;pts.push([px,py]);px+=(sx-30-sceneW()*.3)/6;pts.push([px,py])}pts.push([sx,y3]);return pts}
function along(pts,t){const seg=[];let L=0;for(let i=1;i<pts.length;i++){const d=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);seg.push(d);L+=d}let s=t*L;
 for(let i=0;i<seg.length;i++){if(s<=seg[i]||i===seg.length-1){const u=seg[i]?Math.min(1,s/seg[i]):1;return{x:pts[i][0]+(pts[i+1][0]-pts[i][0])*u,y:pts[i][1]+(pts[i+1][1]-pts[i][1])*u}}s-=seg[i]}}
const worldChips=()=>WORLD.map((_,i)=>({x:8+i*58,y:8,w:52,h:40}));
const massChips=()=>MASS.map((_,i)=>({x:8+i*58,y:8,w:52,h:40}));
const routeChips=()=>ROUTE.map((_,i)=>({x:8+i*58,y:8,w:52,h:40}));
const chips=()=>({mass:massChips(),route:routeChips(),world:worldChips()}[job()]||[]);
const inR=(p,r)=>p.x>r.x-4&&p.x<r.x+r.w+4&&p.y>r.y-4&&p.y<r.y+r.h+4;
function bar(x,X,w,val,col,label){const C=A.col,b=ground(),t=top(),hh=(b-t)*Math.min(1,val/EMAX);x.fillStyle=A.alpha(C.tx,.08);x.fillRect(X,t,w,b-t);
 x.fillStyle=col;x.fillRect(X,b-hh,w,hh);x.strokeStyle=A.mix(C.tx,C.pn,.4);x.lineWidth=1.5;x.strokeRect(X,t,w,b-t);put(x,J(val)+' J',X+w/2,Math.max(t+12,b-hh-12),13,C.tx,'center',w+20);put(x,label,X+w/2,b+16,11,C.tx,'center',w+24)}
function draw(A){const x=A.ctx,C=A.col,W=A.W,H=A.H,m=job();x.fillStyle=S.w===2?A.mix(C.pn,'#cbd5e1',C.dark?.08:.5):S.w===1?A.mix(C.pn,'#fed7aa',C.dark?.08:.5):A.mix(C.pn,'#e0f2fe',C.dark?.05:.5);x.fillRect(0,0,W,H);
 x.fillStyle=S.w===2?'#94a3b8':S.w===1?'#c2410c':(C.dark?'#14532d':'#86efac');x.fillRect(0,ground(),sceneW(),H-ground());
 for(let h=1;h<=TOP;h++){const y=yAt(h);x.setLineDash([4,6]);x.strokeStyle=A.alpha(C.tx,.35);x.lineWidth=1;x.beginPath();x.moveTo(30,y);x.lineTo(sceneW(),y);x.stroke();x.setLineDash([]);put(x,h+' m',16,y,11,C.tx)}
 if(m==='route')routes(x);
 const cx=crateX(),cy=S.path?S.path.y:yAt(S.h);crate(x,cx,cy,crateS());
 chips().forEach((r,i)=>{const lab=m==='mass'?MASS[i]+' kg':m==='world'?WORLD[i][0]:ROUTE[i][0],on=m==='mass'?S.m===MASS[i]:m==='world'?S.w===i:S.tried.includes(i);
  x.fillStyle=on?A.alpha(C.vi,.22):C.pn;A.paint.rrect(r.x,r.y,r.w,r.h,10);x.fill();x.strokeStyle=i===S.blink?C.vi:A.mix(C.tx,C.pn,.45);x.lineWidth=i===S.blink||on?3:1.5;x.stroke();put(x,lab,r.x+r.w/2,r.y+r.h/2,m==='mass'?13:20,C.tx)});
 const bx=sceneW()+12,bw=(W-bx-16)/(m==='fall'?2:1)-6;bar(x,bx,bw,Ep(),C.dark?'#4ade80':'#15803d','Gravitational');if(m==='fall')bar(x,bx+bw+12,bw,Ek(),C.dark?'#fb923c':'#c2410c','Kinetic');
 put(x,`E = m × g × h = ${S.m} × ${g()} × ${S.h} = ${J(Ep())} J`,W/2,H*.95,13,C.tx,'center',W-8);
 if(m==='fall'&&!S.fall&&S.v)put(x,`Speed at the ground ≈ ${J(S.v)} m/s`,sceneW()/2+15,top()-14,12,C.tx,'center',sceneW()-60);A.fx.draw(x)}
function flash(i){S.blink=i;const k=ticket;setTimeout(()=>{if(k===ticket){S.blink=-1;A.redraw()}},420)}
const has=v=>S.tried.includes(v),mark=v=>{if(!has(v))S.tried.push(v)};
function check(){const m=job();if(m==='lift'&&has(2)&&has(4)){S.after();return}if(S.tried.length>=need())S.after()}
/* set the crate height (drag or buttons) */
function setH(h){if(job()==='route'||S.fall)return;S.h=Math.max(0,Math.min(TOP,h));const m=job();if(m==='lift'&&(S.h===2||S.h===4)&&!has(S.h)){mark(S.h);A.sound.pop()}
 note(m==='lift'?`${S.h} m up: ${S.m} × ${g()} × ${S.h} = ${J(Ep())} J in the gravitational store.${S.h===4&&has(2)?' Twice the height, twice the energy.':''}`:`${S.h} m up: ${J(Ep())} J stored.`);keyPad();A.redraw();check()}
function setM(i){if(job()!=='mass')return;flash(i);S.m=MASS[i];mark(i);A.sound.pop();note(`${S.m} kg at 2 m: ${S.m} × 10 × 2 = ${J(Ep())} J.${S.m===4?' Four times the mass of 1 kg, four times the energy.':''}`);keyPad();A.redraw();check()}
function setW(i){if(job()!=='world')return;flash(i);S.w=i;mark(i);A.sound.pop();note(`${WORLD[i][1]}: g = ${WORLD[i][2]} N/kg, so 2 kg lifted 3 m stores ${J(Ep())} J.${i===2?' Weaker gravity, less energy for the same lift.':''}`);keyPad();A.redraw();check()}
/* send the crate along route k to the 3 m shelf */
function go(k){if(job()!=='route'||S.path&&S.path.busy)return;flash(k);const pts=pathOf(k),me=ticket;S.path={x:pts[0][0],y:pts[0][1],busy:1};S.h=0;let t=0;
 const step=()=>{if(me!==ticket)return;t+=still()?1:.04;const p=along(pts,Math.min(1,t));S.path.x=p.x;S.path.y=p.y;S.h=hAt(p.y);A.redraw();if(t<1)return requestAnimationFrame(step);
  S.h=3;S.path.busy=0;mark(k);A.sound.pop();note(`${ROUTE[k][1]}: ${J(Ep())} J at 3 m. Only the height gained counts, not the route.`);keyPad();check()};step()}
/* let the crate fall from its height: the gravitational store empties into the kinetic store */
function drop(cb){if(job()!=='fall'||S.fall||S.h<=0)return;S.h0=S.h;S.fall=true;S.v=0;keyPad();const me=ticket,g0=g();let t=0;const T=Math.sqrt(2*S.h0/g0);
 let last=performance.now();const step=()=>{if(me!==ticket)return;const now=performance.now();t+=still()?T:Math.min(.1,(now-last)/1000)*1.2;last=now;S.h=Math.max(0,S.h0-.5*g0*t*t);A.redraw();if(S.h>0&&t<T)return requestAnimationFrame(step);
  S.h=0;S.fall=false;S.v=Math.sqrt(2*g0*S.h0);mark(S.h0);A.sound.whoosh();note(`From ${S.h0} m: all ${J(S.m*g0*S.h0)} J moved to the kinetic store. It hits the ground at about ${J(S.v)} m/s.`);keyPad();A.redraw();check();if(typeof cb==='function')cb()};step()}
function keyPad(){if(!keys)return;keys.innerHTML='';const m=job();if(m==='quiz')return;const B=(t,l,f,dis)=>{const b=c.el('button',{type:'button',class:'lbtn ghost sm','aria-label':l},keys,t);b.disabled=!!dis;b.onclick=f};
 if(m==='lift'||m==='fall'){B('▲ Up 1 m','Lift the crate 1 metre',()=>{S.v=0;setH(S.h+1)},S.fall||S.h>=TOP);B('▼ Down 1 m','Lower the crate 1 metre',()=>setH(S.h-1),S.fall||S.h<=0)}
 if(m==='fall')B('🫳 Let go','Let go of the crate',drop,S.fall||S.h<=0);
 if(m==='mass')MASS.forEach((v,i)=>B(v+' kg',`Use a ${v} kilogram crate`,()=>setM(i)));
 if(m==='route')ROUTE.forEach(([e,n],k)=>B(e+' '+n,n,()=>go(k),S.path&&S.path.busy));
 if(m==='world')WORLD.forEach(([e,n,v],i)=>B(e+' '+n,`Lift on ${n}, g ${v} newtons per kilogram`,()=>setW(i)))}
function down(p){const m=job();if(m==='quiz')return false;const i=chips().findIndex(r=>inR(p,r));if(i>=0){(m==='mass'?setM:m==='world'?setW:go)(i);return false}
 if((m==='lift'||m==='fall')&&!S.fall){const s=crateS(),cx=crateX(),cy=yAt(S.h);if(Math.abs(p.x-cx)<s&&p.y>cy-s*1.6&&p.y<cy+s*.6){S.grab=1;S.v=0;return true}}return false}
function move(p){if(S.grab){const h=hAt(p.y+crateS()/2);if(h!==S.h)setH(h)}}
function up(){if(!S.grab)return;S.grab=null;if(job()==='fall'&&S.h>0)drop()}
const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function auto(list,gap){const k=++ticket;list.forEach((f,j)=>setTimeout(()=>{if(k===ticket)f()},still()?j*40+30:(j+1)*(gap||600)))}
const begin=(o)=>{ticket++;S=Object.assign(zero(),o||{})};
const steps=[
{h:'Lift the crate',p:'Drag the 2 kg crate up. The green bar is the energy in the gravitational store. Use g = 10 N/kg.',predict:{q:'Lift it twice as high. The energy stored…',opts:['goes up a bit','doubles'],ans:1},task:'Lift it to 2 m, then 4 m',
 show:()=>{steps[0].go();auto([()=>setH(2),()=>setH(4)],900)},go:()=>{begin();note('The crate is on the ground: 0 J. Drag it up.');keyPad();S.after=finish(0,()=>has(2)&&has(4),'40 J at 2 m, 80 J at 4 m. Energy is proportional to height.')}},
{h:'Heavier crates',p:'Same 2 m shelf, different masses. Tap a mass chip and compare the bar.',predict:{q:'A 4 kg crate and a 1 kg crate on the same shelf. The 4 kg crate stores…',opts:['the same energy','4 times the energy'],ans:1},task:'Try all 3 masses',
 show:()=>{steps[1].go();auto([0,1,2].map(i=>()=>setM(i)),700)},go:()=>{begin({h:2});note('A 2 kg crate at 2 m: 40 J. Try another mass.');keyPad();S.after=finish(1,()=>S.tried.length>=3,'20 J, 40 J, 80 J. Energy is proportional to mass too.')}},
{h:'Does the route matter?',p:'Get the crate to the 3 m shelf three ways. Watch the bar at the top each time.',predict:{q:'The long ramp or a straight lift to the same shelf. Which stores more?',opts:['The ramp: it took longer','Both the same'],ans:1},task:'Try all 3 routes',
 show:()=>{steps[2].go();auto([0,1,2].map(k=>()=>go(k)),900)},go:()=>{begin();note('Pick a route to the 3 metre shelf.');keyPad();S.after=finish(2,()=>S.tried.length>=3,'60 J every time. Only the change in height counts.')}},
{h:'On the Moon',p:'g is the gravitational field strength. Lift the same 2 kg crate 3 m on Earth, Mars and the Moon.',predict:{q:'The same lift on the Moon stores…',opts:['the same energy','less energy'],ans:1},task:'Try all 3 worlds',
 show:()=>{steps[3].go();auto([1,2,0].map(i=>()=>setW(i)),700)},go:()=>{begin({h:3});note('Earth: 2 × 10 × 3 = 60 J. Try Mars and the Moon.');mark(0);keyPad();S.after=finish(3,()=>S.tried.length>=3,'Earth 60 J, Mars 22.2 J, Moon 9.6 J. Weaker gravity, smaller store.')}},
{h:'Let it fall',p:'Drag the crate up and let go. Watch energy move from the gravitational store to the kinetic store.',predict:{q:'As the crate falls, the energy in the gravitational store…',opts:['is used up and gone','moves to the kinetic store'],ans:1},task:'Drop it from 3 heights',
 show:()=>{steps[4].go();const k=++ticket,seq=[1,3,5],nx=j=>{if(k!==ticket||j>=seq.length)return;setH(seq[j]);setTimeout(()=>{if(k===ticket)drop(()=>setTimeout(()=>nx(j+1),still()?30:350))},still()?30:400)};nx(0)},go:()=>{begin();note('Drag the crate up, then let go.');keyPad();S.after=finish(4,()=>S.tried.length>=3,'The store empties into the kinetic store. Higher drop, more energy, faster at the ground.')}},
{h:'Challenge',p:'',go:()=>{begin({h:0});quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.after()});
const QS=[['A 3 kg bag is lifted 2 m (g = 10 N/kg). How much energy goes into its gravitational store?',[['60 J','ok'],['6 J','nog'],['30 J','noh']]],
 ['A box is lifted from a 1 m shelf to a 3 m shelf. Which height goes in E = mgh?',[['2 m, the change in height','ok'],['3 m','top'],['4 m','add']]],
 ['The same box goes up a long ramp or a lift to the same shelf. Which stores more energy?',[['They store the same','ok'],['The ramp','path'],['The lift','fast']]],
 ['The same lift on the Moon (g = 1.6 N/kg) instead of Earth. The energy stored is…',[['less','ok'],['the same, mass does not change','sameg'],['more, because it feels light','light']]],
 ['A ball falls (ignore air). The energy in its gravitational store…',[['moves to the kinetic store','ok'],['is used up','gone'],['stays the same all the way down','stay']]],
 ['A 500 g book is lifted 2 m (g = 10 N/kg). Energy stored?',[['10 J','ok'],['10 000 J','grams'],['1000 J','grams']]]];
function slip(t){let m='Use E = m × g × h, with mass in kg and height in m.';
 if(t==='nog')m='You did 3 × 2 and left out g. Multiply by 10 N/kg as well: 3 × 10 × 2 = 60 J.';
 if(t==='noh')m='3 × 10 = 30 is the weight in newtons. Times the 2 m height: 60 J.';
 if(t==='top')m='The store changes by the height gained. From 1 m to 3 m is a 2 m change.';
 if(t==='add')m='Do not add the heights. The change is 3 m − 1 m = 2 m.';
 if(t==='path'||t==='fast')m='The route does not matter. The same mass at the same height stores the same energy.';
 if(t==='sameg')m='Mass is the same, but g is smaller on the Moon, so m × g × h is smaller.';
 if(t==='light')m='It feels light because g is small. Smaller g means less energy stored, not more.';
 if(t==='gone')m='Energy is never used up. As the ball falls it moves to the kinetic store, so the ball speeds up.';
 if(t==='stay')m='The ball gets lower, so the gravitational store gets smaller as the kinetic store grows.';
 if(t==='grams')m='Change grams to kilograms first: 500 g = 0.5 kg. 0.5 × 10 × 2 = 10 J.';return m}
function quiz(){ask++;const[q,ops]=QS[ask%QS.length],r=ask%3;
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});note('Challenge: '+q);A.redraw()}
function judge(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){best++;A.win()}else{best=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Correct.':'✗ '+slip(t)}${ok?` Streak: ${best}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.6,tall:1,draw,onStep:A=>{chal.hidden=A.step!==5;keys.hidden=A.step===5;keyPad()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);keys=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});keyPad()}});
A.start()})})();
