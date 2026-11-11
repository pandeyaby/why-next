/* Flagship: Gravity & Falling Objects (ages 9–11; NC Y5 Forces; NGSS 5-PS2-1). Balanced forces on held-up objects,
   remove the supports, drop races (heavy/light, feather with and without air), balls dropped round a globe, and a
   forcemeter. Distinct from flaggapforce (sorting forces) and flagfdiag (drawing arrows). */
(()=>{
const OBJ=[{k:'book',sup:'table',push:'the table pushes up'},{k:'lamp',sup:'string',push:'the string pulls up'},{k:'ball',sup:'hand',push:'the hand pushes up'}];
const MASS=[[100,'100 g'],[500,'500 g'],[1000,'1 kg'],[2000,'2 kg']];
const PEOPLE=[['top',-Math.PI/2],['right',0],['bottom',Math.PI/2],['left',Math.PI]];
const RACES=[['balls','heavy ball vs light ball'],['air','feather vs ball, with air'],['vacuum','feather vs ball, air pumped out']];
VIS.reg('flagdrop',c=>{let A,keys,qa,turn=-1;const S={};
const voice=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const part=()=>['forces','release','race','globe','weigh','quiz'][A.step];
function ink(s,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(s,x,y,o.max||A.W-12)}
function fresh(o){for(const k in S)delete S[k];Object.assign(S,{shown:{},gone:{},fall:{},race:null,raced:{},dropped:{},balls:[],ang:PEOPLE.map(p=>p[1]),hung:null,tried:{},stretch:0,drag:null,msg:'',hook:()=>{}},o||{});A.redraw()}
function arrow(x,y,len,col,label,side){const g=A.ctx,dir=Math.sign(len),ey=y+len;g.strokeStyle=col;g.fillStyle=col;g.lineWidth=4;g.beginPath();g.moveTo(x,y);g.lineTo(x,ey-dir*10);g.stroke();
 g.beginPath();g.moveTo(x,ey);g.lineTo(x-8,ey-dir*12);g.lineTo(x+8,ey-dir*12);g.closePath();g.fill();if(label){const px=A.narrow?10:12,lx=x+(side||1)*9,ly=y+len/2;g.font=`700 ${px}px system-ui,sans-serif`;const w=g.measureText(label).width+6;g.fillStyle=A.alpha(A.col.pn,.9);g.fillRect((side||1)>0?lx-3:lx-w+3,ly-px*.7,w,px*1.4);ink(label,lx,ly,px,{al:(side||1)>0?'left':'right',c:col,w:700})}}
// ---------- scene 1 and 2: three supported objects ----------
const REST=[.52,.42,.5],floorY=()=>A.H*.86,stX=i=>A.W*(.18+.32*i);
function objY(i){return REST[i]*A.H+(S.fall[i]||0)}
function scene(g){const C=A.col,H=A.H,fy=floorY();g.fillStyle=A.mix(C.pn,'#a16207',C.dark?.25:.2);g.fillRect(0,fy,A.W,H-fy);
 g.fillStyle=C.mu;g.fillRect(0,H*.1,A.W,3);
 OBJ.forEach((o,i)=>{const x=stX(i),y=objY(i),gone=S.gone[i],r=A.narrow?16:20;
  if(i===0&&!gone){g.fillStyle=A.mix(C.tx,'#8b5a2b',.6);g.fillRect(x-r*2.4,H*.56,r*4.8,7);g.fillRect(x-r*2.1,H*.56,6,fy-H*.56);g.fillRect(x+r*2.1-6,H*.56,6,fy-H*.56)}
  if(i===1){g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.moveTo(x,H*.1);g.lineTo(x,gone?H*.2:y-r);g.stroke();if(gone){g.beginPath();g.moveTo(x,y-r);g.lineTo(x,y-r-14);g.stroke()}}
  if(i===2&&!gone){g.fillStyle=A.mix('#f2c29b',C.pn,.1);A.paint.rrect(x-r*1.4,y+r,r*2.8,10,5);g.fill();g.fillRect(x-r*1.1-10,y+r,10,fy-y-r)}
  if(i===0){g.fillStyle=C.rd;g.fillRect(x-r*1.3,y-r*.2,r*2.6,r*.9);ink('book',x,y+r*.25,A.narrow?10:11,{c:'#fff'})}
  if(i===1){g.fillStyle='#facc15';g.beginPath();g.arc(x,y,r*.75,0,7);g.fill();g.fillStyle=A.mix(C.tx,C.pn,.3);g.beginPath();g.moveTo(x-r,y);g.lineTo(x+r,y);g.lineTo(x+r*.5,y-r);g.lineTo(x-r*.5,y-r);g.closePath();g.fill()}
  if(i===2)A.paint.ball(x,y,r*.85,C.ac);
  const landed=gone&&S.fall[i]>=fy-REST[i]*H-r-2;
  if(!landed&&(S.shown[i]||part()==='release')){const top=i===0?y-r*.2:y-r,bot=i===0?y+r*.7:y+r;arrow(x,bot,H*.13,C.rd,'gravity',2);if(!gone&&!(S.fall[i]>0))arrow(x,top,-H*.13,C.gr,o.sup,-1)}
  if(landed)ink('landed',x,y-r-28,A.narrow?11:12,{c:C.tx,w:600})})}
// falling animation: every released object speeds up until it lands
function tickFall(dt){let more=false;OBJ.forEach((o,i)=>{if(!S.gone||!S.gone[i])return;const r=A.narrow?16:20,max=floorY()-REST[i]*A.H-r;S.v=S.v||{};
 if((S.fall[i]||0)<max){S.v[i]=(S.v[i]||0)+A.H*2.6*dt;S.fall[i]=Math.min(max,(S.fall[i]||0)+S.v[i]*dt);more=true}});
 if(S.race&&!S.race.done){S.race.t+=dt;more=true;const L=lanes();S.race.y=S.race.kinds.map(k=>raceY(k,S.race.t,L));if(S.race.y.every((y,j)=>y>=L.bot)||S.race.t>2.4)finishRace()}
 S.balls.forEach(b=>{if(b.t<1){b.t=Math.min(1,b.t+dt*1.4);more=true}});return more}
function support(i){if(S.gone[i])return;S.gone[i]=true;S.fall[i]=0;A.sound.whoosh();
 say(`No ${OBJ[i].sup} now. Nothing holds the ${OBJ[i].k} up, so gravity pulls it down, faster and faster.`,true)}
function showForces(i){if(S.shown[i])return say(`Already shown: two equal forces on the ${OBJ[i].k}.`);S.shown[i]=true;
 say(`${OBJ[i].k}: gravity pulls it down and ${OBJ[i].push} just as hard. Balanced, so it stays still.`,true)}
// ---------- scene 3: drop races ----------
function lanes(){return{x:[A.W*.36,A.W*.64],top:A.H*.2,bot:A.H*.84}}
function raceY(kind,t,L){const fall=Math.min(L.bot,L.top+A.H*1.25*t*t);if(kind!=='feather-air')return fall;const vt=A.H*.12;return Math.min(L.bot,L.top+vt*t)}
function startRace(k){if(S.race&&!S.race.done)finishRace();const kinds={balls:['heavy','light'],air:['feather-air','ball'],vacuum:['feather','ball']}[k];S.race={k,kinds,t:0,y:[lanes().top,lanes().top],done:false};say(`Drop! ${RACES.find(r=>r[0]===k)[1]}.`);A.kick()}
function finishRace(){const R=S.race;R.done=true;S.raced[R.k]=true;
 say({balls:'Both balls land together. The heavy one is not faster.',air:'The ball lands first. Air pushes up on the wide, light feather much more.',vacuum:'With no air, the feather and the ball land together, as on the Moon in 1971.'}[R.k],true)}
function drawRace(g){const C=A.col,L=lanes(),k=S.race?S.race.k:'balls',vac=k==='vacuum';
 if(vac){g.strokeStyle=C.ac;g.lineWidth=2;g.setLineDash([6,5]);A.paint.rrect(A.W*.24,L.top-24,A.W*.52,L.bot-L.top+40,14);g.stroke();g.setLineDash([]);ink('no air inside',A.W/2,L.bot+26,12,{c:C.ac})}
 g.fillStyle=A.mix(C.pn,'#a16207',C.dark?.25:.2);g.fillRect(0,L.bot+10,A.W,6);
 const kinds=S.race?S.race.kinds:['heavy','light'],lab={heavy:'heavy ball 5 kg',light:'light ball 0.5 kg','feather-air':'feather',feather:'feather',ball:'ball'};
 kinds.forEach((kd,j)=>{const x=L.x[j],y=S.race?S.race.y[j]:L.top,r=A.narrow?13:16;ink(lab[kd],x,L.top-34,A.narrow?11:13,{max:A.W*.3});
  if(/feather/.test(kd))ink('🪶',x,y,r*2);else A.paint.ball(x,y,r,kd==='heavy'?A.mix(C.tx,C.pn,.25):kd==='light'?'#d6a86a':C.ac)});
}
// ---------- scene 4: the globe ----------
function globe(){const r=Math.min(A.W,A.H)*(A.narrow?.27:.25);return{x:A.W/2,y:A.H*.52,r}}
function drawGlobe(g){const C=A.col,G=globe();g.fillStyle=A.mix('#0ea5e9',C.pn,.2);g.beginPath();g.arc(G.x,G.y,G.r,0,7);g.fill();
 g.fillStyle=A.mix('#16a34a',C.pn,.15);[[-.3,-.2,.35],[.35,.25,.3],[-.1,.5,.2]].forEach(([dx,dy,s])=>{g.beginPath();g.ellipse(G.x+dx*G.r,G.y+dy*G.r,s*G.r,s*G.r*.6,dx,0,7);g.fill()});
 g.fillStyle=C.tx;g.beginPath();g.arc(G.x,G.y,4,0,7);g.fill();ink('centre',G.x,G.y+14,11,{c:C.tx});
 S.ang.forEach((a,i)=>{const px=G.x+Math.cos(a)*(G.r+14),py=G.y+Math.sin(a)*(G.r+14);g.save();g.translate(px,py);g.rotate(a+Math.PI/2);ink('🧍',0,0,A.narrow?22:26);g.restore();
  const b=S.balls.find(b=>b.i===i);if(b){const d=G.r+60-(54*b.t),bx=G.x+Math.cos(a)*d,by=G.y+Math.sin(a)*d;A.paint.ball(bx,by,7,C.am);
   if(b.t>=1){g.strokeStyle=C.rd;g.setLineDash([4,4]);g.lineWidth=2;g.beginPath();g.moveTo(bx,by);g.lineTo(G.x,G.y);g.stroke();g.setLineDash([])}}
  ink(PEOPLE[i][0],G.x+Math.cos(a)*(G.r+(A.narrow?52:62)),G.y+Math.sin(a)*(G.r+(A.narrow?52:62)),A.narrow?11:12,{c:C.mu,w:600})})}
function dropAt(i){if(S.dropped[i])return say('That ball has already fallen.');S.dropped[i]=true;S.balls.push({i,t:0});A.kick();
 say(`The ${PEOPLE[i][0]} person lets go. The ball falls to their feet, towards the centre of the Earth.`,true)}
// ---------- scene 5: forcemeter ----------
function meter(){return{x:A.W*.62,top:A.H*.12,len:A.H*.18}}
function drawMeter(g){const C=A.col,M=meter(),ext=S.stretch*A.H*.012,hookY=M.top+M.len+ext;
 g.fillStyle=C.mu;g.fillRect(M.x-40,M.top-8,80,6);g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();for(let k=0;k<=14;k++){const y=M.top+(M.len+ext)*k/14;g.lineTo(M.x+(k%2?10:-10),y)}g.stroke();
 g.beginPath();g.arc(M.x,hookY+8,8,0,Math.PI);g.stroke();
 ink(S.hung==null?'0 N':`≈ ${MASS[S.hung][0]/100} N`,M.x+60,M.top+M.len/2,A.narrow?16:20,{c:C.tx,al:'left'});ink('forcemeter',M.x+60,M.top+M.len/2+22,11,{c:C.mu,al:'left'});
 if(S.hung!=null){const s=box(M.x,hookY+14+side(S.hung)/2,S.hung);arrow(M.x-s/2-14,hookY+14+s/2,A.H*(.04+.012*S.stretch/5),C.rd,'',1)}
 MASS.forEach((m,j)=>{if(j!==S.hung){const p=massPos(j);box(p.x,p.y,j)}});
 if(S.drag&&S.drag.mass!=null)box(S.drag.x,S.drag.y,S.drag.mass)
 ink(`Masses tried: ${Object.keys(S.tried).length} of 3`,A.W*.25,A.H*.1,A.narrow?12:14,{c:C.mu,w:600})}
// a mass block centred on (x, y); bigger masses draw bigger
const side=j=>24+Math.sqrt(MASS[j][0])*.5;
function box(x,y,j){const g=A.ctx,s=side(j);g.fillStyle=A.mix(A.col.tx,A.col.pn,.35);A.paint.rrect(x-s/2,y-s/2,s,s,5);g.fill();ink(MASS[j][1],x,y,11,{c:A.col.pn});return s}
const massPos=j=>{const sx=A.narrow?.12:.1;return S.drag&&S.drag.mass===j?{x:-99,y:-99}:{x:A.W*(sx+.17*(j%2)),y:A.H*(.42+.2*Math.floor(j/2))}};
function hang(j){S.hung=j;S.tried[j]=true;S.stretch=MASS[j][0]/100;A.sound.pop();const n=MASS[j][0]/100;
 say(`${MASS[j][1]} weighs about ${n} N. Earth pulls about 10 N on each kilogram: more mass, bigger pull.`,true)}
// ---------- drawing ----------
function draw(A){const{ctx:g,W,H,col:C}=A,k=part();g.fillStyle=A.mix(C.pn,'#38bdf8',C.dark?.04:.08);g.fillRect(0,0,W,H);
 if(k==='quiz'){ink('Gravity and falling',W/2,H*.42,A.narrow?17:20);ink('Answer below',W/2,H*.56,13,{c:C.mu,w:500});A.fx.draw(g);return}
 if(k==='forces'||k==='release')scene(g);if(k==='race')drawRace(g);if(k==='globe')drawGlobe(g);if(k==='weigh')drawMeter(g);
 const head={forces:`Tap each object to show its forces (${Object.keys(S.shown).length} of 3)`,release:`Take the supports away (${Object.keys(S.gone).length} of 3)`,race:`Drop them together (${Object.keys(S.raced).length} of 3 races)`,globe:`Drop a ball from each person (${Object.keys(S.dropped).length} of 4)`,weigh:'Drag a mass onto the hook'}[k];
 ink(head,W/2,H*.04,A.narrow?13:16);if(S.msg)note(g,S.msg);A.fx.draw(g)}
// feedback at the foot of the canvas, wrapped onto at most two lines on a pill so it reads over any scene
function note(g,t){const px=A.narrow?11:13,C=A.col;g.font=`600 ${px}px system-ui,sans-serif`;const lines=[''];
 t.split(' ').forEach(w=>{const n=lines.length-1,l=(lines[n]+' '+w).trim();if(g.measureText(l).width>A.W-24&&lines[n])lines.push(w);else lines[n]=l});
 const L=lines.slice(0,2),h=L.length*(px+4)+8;g.fillStyle=A.alpha(C.pn,.92);A.paint.rrect(6,A.H-h-4,A.W-12,h,8);g.fill();L.forEach((l,j)=>ink(l,A.W/2,A.H-h+4+(px+4)*(j+.5),px,{w:600,max:A.W-16}))}
// ---------- actions ----------
function say(m,good){S.msg=m;if(good)A.sound.pop();else if(good===false)A.sound.miss();voice(m);controls();A.redraw();S.hook()}
function controls(){if(!keys)return;keys.innerHTML='';const k=part();if(k==='quiz')return;const b=(t,f,lab)=>{c.el('button',{type:'button',class:'lbtn sm','aria-label':lab||t},keys,t).onclick=f};
 if(k==='forces')OBJ.forEach((o,i)=>b(`Forces on the ${o.k}`,()=>showForces(i)));
 if(k==='release')OBJ.forEach((o,i)=>{if(!S.gone[i])b(`Take away the ${o.sup}`,()=>support(i),`Take away the ${o.sup} under the ${o.k}`)});
 if(k==='race')RACES.forEach(([r,lab])=>b(`Race: ${lab}`,()=>startRace(r)));
 if(k==='globe')PEOPLE.forEach(([n],i)=>{if(!S.dropped[i])b(`Drop the ${n} ball`,()=>dropAt(i),`The person at the ${n} drops a ball`)});
 if(k==='weigh')MASS.forEach((m,j)=>b(`Hang ${m[1]}`,()=>hang(j),`Hang the ${m[1]} mass on the forcemeter`));
}
// ---------- canvas gestures ----------
function down(p){const k=part();if(k==='quiz')return false;
 if(k==='forces'||k==='release'){const i=OBJ.findIndex((o,j)=>Math.abs(p.x-stX(j))<A.W*.13&&p.y>A.H*.25&&p.y<floorY());if(i<0)return false;k==='forces'?showForces(i):support(i);return true}
 if(k==='globe'){const G=globe(),d=Math.hypot(p.x-G.x,p.y-G.y);if(d<G.r-6||d>G.r+70)return false;const a=Math.atan2(p.y-G.y,p.x-G.x);
  const i=S.ang.map((x,j)=>[Math.abs(Math.atan2(Math.sin(a-x),Math.cos(a-x))),j]).sort((x,y)=>x[0]-y[0])[0][1];S.drag={person:i,a0:a,moved:false};return true}
 if(k==='weigh'){const j=MASS.findIndex((m,jj)=>{const q=massPos(jj);return jj!==S.hung&&Math.hypot(p.x-q.x,p.y-q.y)<30});if(j<0)return false;S.drag={mass:j,x:p.x,y:p.y};A.redraw();return true}
return false}
function move(p){const d=S.drag;if(!d)return;if(d.mass!=null){d.x=p.x;d.y=p.y;A.redraw();return}
 if(d.person!=null&&!S.dropped[d.person]){const G=globe(),a=Math.atan2(p.y-G.y,p.x-G.x);if(Math.abs(a-d.a0)>.05)d.moved=true;S.ang[d.person]=a;A.redraw()}}
function up(p){const d=S.drag;S.drag=null;if(!d)return;
 if(d.mass!=null){const M=meter();if(p&&Math.abs(p.x-M.x)<60&&p.y>M.top)hang(d.mass);else say('Drop the mass on the hook under the forcemeter.',false);A.redraw();return}
 if(d.person!=null)dropAt(d.person)}
const when=(i,ok,line)=>()=>{if(A.step===i&&!A.isDone&&A.pred[i]!=null&&ok())A.done(line()+A.reveal(i))};
function run(i,list,gap){steps[i].go();list.forEach((f,j)=>setTimeout(()=>{if(A.step===i)f()},A.reduced()?30*(j+1):(j+1)*(gap||400)))}
function begin(o,hint,i,ok,line){fresh(o);voice(hint);controls();S.hook=when(i,ok,line)}
const steps=[
{h:'Held up',p:'Gravity is a pull between the Earth and every object. It pulls things towards the Earth all the time, even when they are not moving.',
 predict:{q:'A book sits still on a table. Is gravity pulling it?',opts:['no, because it is not moving','yes, and the table pushes up just as hard','only if the book is heavy'],ans:1},
 task:'Tap each object to show the forces on it',show:()=>run(0,[0,1,2].map(i=>()=>showForces(i))),
 go:()=>begin({},'A book on a table, a lamp on a string and a ball on a hand. Tap each one.',0,()=>Object.keys(S.shown).length>=3,()=>'Gravity never switches off. A support pushes or pulls back just as hard, so the forces balance.')},
{h:'Let go',p:'Take a support away and nothing balances gravity. The object is unsupported, so it falls towards the Earth.',
 predict:{q:'You cut the lamp’s string. The lamp…',opts:['stays in the air','falls straight down','swings up to the ceiling'],ans:1},
 task:'Take away all three supports',show:()=>run(1,[0,1,2].map(i=>()=>support(i))),
 go:()=>begin({},'Tap an object or its support to take the support away.',1,()=>Object.keys(S.gone).length>=3,()=>'Every unsupported object fell straight down, faster and faster.')},
{h:'Heavy or light?',p:'Drop a heavy ball and a light ball of the same size together. Then race a feather against a ball, with air and with no air.',
 predict:{q:'A 5 kg ball and a 0.5 kg ball, the same size, are dropped together. Which lands first?',opts:['the heavy one, by a lot','both at almost the same time','the light one'],ans:1},
 task:'Run all three races',show:()=>run(2,[()=>startRace('balls'),()=>startRace('air'),()=>startRace('vacuum')],1000),
 go:()=>begin({},'Choose a race with the buttons.',2,()=>Object.keys(S.raced).length>=3,()=>'Gravity makes heavy and light things fall together; only air slows the feather.')},
{h:'Which way is down?',p:'The Earth is a ball. Gravity pulls everything towards its centre, so “down” is towards the middle of the Earth wherever you stand.',
 predict:{q:'A person at the bottom of the globe drops a ball. Where does it go?',opts:['down the page, off into space','to their feet, towards the centre of the Earth','it floats beside them'],ans:1},
 task:'Drop a ball from all four people',show:()=>run(3,[0,1,2,3].map(i=>()=>dropAt(i))),
 go:()=>begin({},'Tap a person to drop their ball. You can drag a person round the globe first.',3,()=>Object.keys(S.dropped).length>=4,()=>'Every ball fell towards the centre. Nobody falls off the bottom.')},
{h:'Weight is a pull',p:'Weight is the force of gravity on an object, measured in newtons (N) with a forcemeter. On Earth each kilogram weighs about 10 N.',
 predict:{q:'1 kg weighs about 10 N. A 2 kg bag weighs about…',opts:['10 N: gravity is the same for all','20 N','2 N'],ans:1},
 task:'Hang three different masses on the forcemeter',show:()=>run(4,[0,2,3].map(j=>()=>hang(j))),
 go:()=>begin({},'Drag a mass onto the hook, or use the buttons.',4,()=>Object.keys(S.tried).length>=3,()=>'Double the mass, double the pull. A heavier thing is also harder to speed up, which is why they still fall together.')},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.hook()});
const QS=[
 ['Why does an apple fall when it comes off the tree?',[['gravity pulls it towards the Earth','ok'],['the air pushes it down','air'],['heavy things just want to go down','want']]],
 ['A book rests on a table. Which is true?',[['gravity pulls it down and the table pushes it up','ok'],['no forces act on it','still'],['gravity stops while it is on the table','still']]],
 ['A 5 kg ball and a 1 kg ball of the same size are dropped together from 2 m. What happens?',[['they land at almost the same time','ok'],['the 5 kg ball lands much sooner','heavy'],['the 1 kg ball lands first','light']]],
 ['A feather falls more slowly than a coin. Why?',[['air resistance slows the feather much more','ok'],['gravity does not pull on feathers','nograv'],['the feather is too light to fall','heavy']]],
 ['A child in Australia drops a ball. It falls…',[['towards the centre of the Earth, to the ground','ok'],['up, away from the Earth','map'],['sideways along the ground','map']]],
 ['A bag has a mass of 3 kg. About how much does it weigh on Earth?',[['30 N','ok'],['3 N','unit'],['3 kg','kg']]],
 ['Water on a hillside will flow…',[['downhill, pulled by gravity','ok'],['uphill towards the sky','map'],['nowhere, water has no weight','nograv']]]];
function why(t){let m='Gravity pulls every object towards the centre of the Earth, all the time.';
 if(t==='air')m='Air does not push things down. Gravity, a pull from the Earth, makes them fall.';
 if(t==='want')m='Objects do not want anything. Gravity is a force between the Earth and the apple.';
 if(t==='still')m='Gravity still pulls the book. The table pushes up just as hard, so the forces balance and it stays still.';
 if(t==='heavy')m='Heavy things do not fall much faster. Without air, all objects fall together.';
 if(t==='light')m='Light things are not faster either. Same size and shape means they land together.';
 if(t==='nograv')m='Gravity pulls on everything that has mass, feathers and water too.';
 if(t==='map')m='Down means towards the centre of the Earth, wherever you are on the globe.';
 if(t==='unit')m='Each kilogram weighs about 10 N on Earth, so 3 kg weighs about 30 N.';
 if(t==='kg')m='Kilograms measure mass. Weight is a force, so it is measured in newtons.';
 return m}
function next(){turn++;const Q=QS[turn%QS.length],r=turn%3,opts=[...Q[1].slice(r),...Q[1].slice(0,r)];
 qa.innerHTML=`<p><b>${Q[0]}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qa.querySelector('.fl-pick');opts.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>judge(t)});voice('Challenge: '+Q[0]);A.redraw()}
function judge(t){qa.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=qa.querySelector('.fl-fb'),ok=t==='ok';
 if(ok)A.win();else A.sound.miss();fb.innerHTML=(ok?'✓ Right: gravity pulls everything towards the centre of the Earth.':'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{qa.hidden=A.step!==5;keys.hidden=A.step===5;controls()},
 init:A=>{fresh();const w=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Gravity lab controls'},w);qa=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up});A.every(tickFall);controls()}});
A.start()})})();
