/* Flagship: thunder and lightning (ages 7–9). Bump ice in a storm cloud to separate charges; charge the cloud and let
   it spark to the tallest thing; tap the bolt to heat the air and hear the bang; time flash to bang and turn seconds
   into kilometres; send three people to safe places; then a challenge. Words and data are in storm_art.js. */
(()=>{
const S=STORM,NEED=6;
VIS.reg('flagstorm',c=>{let A,x2,pad,quiz,ask=-1,run=0,grip=null;const v={};
function hue(){const t=A.col;return{word:t.tx,dim:t.mu,base:t.pn,night:t.dark,black:'#0f172a',cloud:t.dark?'#475569':'#94a3b8',cloudEdge:t.dark?'#cbd5e1':'#334155',plus:'#b91c1c',minus:'#1d4ed8',bolt:'#facc15',grass:t.dark?'#14532d':'#bbf7d0',tree:'#15803d',trunk:'#78350f',wall:'#fde68a',roof:'#9a3412',okc:'#166534',noc:'#9f1239',ribbon:t.dark?'#312e81':'#e0e7ff',heat:'#ea580c'}}
const u=n=>Math.round(A.narrow?n:n*1.1);
const speak=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
function word(t,x,y,n,col,wt,al){x2.font=`${wt||700} ${u(n)}px system-ui,sans-serif`;x2.textAlign=al||'center';x2.textBaseline='middle';x2.fillStyle=col;x2.fillText(String(t),x,y,A.W-16)}
function fold(t,max,n){x2.font=`700 ${u(n)}px system-ui,sans-serif`;const rows=[];let cur='';for(const w of String(t).split(' ')){const nx=cur?cur+' '+w:w;if(cur&&x2.measureText(nx).width>max){rows.push(cur);cur=w}else cur=nx}rows.push(cur);return rows}
function slab(x,y,w,h,fill,line){A.paint.rrect(x,y,w,h,9);x2.fillStyle=fill;x2.fill();if(line){x2.lineWidth=2;x2.strokeStyle=line;x2.stroke()}}
function ribbon(t){const k=hue(),rows=fold(t,A.W-36,13),lh=u(17),h=rows.length*lh+12;slab(9,6,A.W-18,h,k.ribbon);rows.forEach((r,i)=>word(r,A.W/2,12+lh*(i+.5),13,k.night?'#f8fafc':k.black));return 6+h+u(8)}
function verdict(){if(!v.note)return;const k=hue(),rows=fold((v.bad?'✗ ':'✓ ')+v.note,A.W-40,12),lh=u(16),h=rows.length*lh+10,y=A.H-h-6;slab(9,y,A.W-18,h,'#ffffff',v.bad?k.noc:k.okc);rows.forEach((r,i)=>word(r,A.W/2,y+5+lh*(i+.5),12,v.bad?k.noc:k.black))}
const no=t=>{v.bad=true;v.note=t;A.sound.miss();speak(t);A.redraw()};
const yes=t=>{v.bad=false;v.note=t;A.sound.pop();speak(t);A.redraw();v.pass()};
const say=t=>{v.bad=false;v.note=t;speak(t);A.redraw()};
/* a puffy cloud made of circles; returns its box */
function puff(cxm,cy,w){const k=hue(),r=w/6;x2.fillStyle=k.cloud;x2.strokeStyle=k.cloudEdge;x2.lineWidth=2;[[-2,0,1],[-1,-.6,1.2],[0,-.8,1.35],[1,-.5,1.2],[2,0,1],[-1,.3,1],[0,.35,1.1],[1,.3,1]].forEach(([a,b,s])=>{x2.beginPath();x2.arc(cxm+a*r,cy+b*r,r*s,0,7);x2.fill()});
 return{x:cxm-w/2,y:cy-r*1.9,w,h:r*3.2}}
function charges(box){const k=hue(),n=v.bumps;for(let i=0;i<NEED;i++){const fx=box.x+box.w*(.18+.64*i/(NEED-1));const up=i<n;
  const yP=up?box.y+box.h*.22:box.y+box.h*.62,yM=up?box.y+box.h*.92:box.y+box.h*.72;
  x2.fillStyle=k.plus;x2.beginPath();x2.arc(fx,yP,u(8),0,7);x2.fill();word('+',fx,yP,12,'#ffffff',900);
  x2.fillStyle=k.minus;x2.beginPath();x2.arc(fx+u(6),yM,u(8),0,7);x2.fill();word('−',fx+u(6),yM,12,'#ffffff',900)}}
/* step 1 */
function viewBump(top){const k=hue(),b=v.cloudBox=puff(A.W/2,top+(A.H-top)*.36,Math.min(A.W*.86,u(380)));charges(b);
 word(`bumps: ${v.bumps} of ${NEED}`,A.W/2,b.y+b.h+u(26),13,k.word,900);word('+ small ice goes up   − big ice sinks',A.W/2,b.y+b.h+u(48),11,k.dim,700)}
function bump(){if(v.bumps>=NEED){no('The cloud is fully charged: plus at the top, minus at the bottom. No more bumps needed.');return}v.bumps++;A.sound.tick();
 if(v.bumps===NEED){yes('Charged! Small ice took plus charges up; big ice took minus charges down.');return}say(`Bump ${v.bumps}: one small bit rises with a plus, one big bit sinks with a minus.`)}
/* step 2 */
function ground(){return A.H-u(92)}
function scene(top){const k=hue(),gy=ground();x2.fillStyle=k.grass;x2.fillRect(0,gy,A.W,A.H-gy);
 const tx=A.W*.25,th=u(130);x2.fillStyle=k.trunk;x2.fillRect(tx-u(6),gy-th*.45,u(12),th*.45);x2.fillStyle=k.tree;x2.beginPath();x2.arc(tx,gy-th*.62,u(30),0,7);x2.arc(tx,gy-th*.85,u(22),0,7);x2.fill();
 const hx=A.W*.68,hw=u(80),hh=u(46);x2.fillStyle=k.wall;x2.fillRect(hx-hw/2,gy-hh,hw,hh);x2.fillStyle=k.roof;x2.beginPath();x2.moveTo(hx-hw/2-6,gy-hh);x2.lineTo(hx,gy-hh-u(30));x2.lineTo(hx+hw/2+6,gy-hh);x2.fill();
 return{tree:{x:tx,y:gy-th},house:{x:hx,y:gy-hh-u(30)}}}
function zig(x0,y0,x1,y1){const k=hue();x2.strokeStyle=k.bolt;x2.lineWidth=u(5);x2.lineJoin='round';x2.beginPath();x2.moveTo(x0,y0);const n=6;for(let i=1;i<n;i++){const t=i/n;x2.lineTo(x0+(x1-x0)*t+(i%2?u(14):-u(14)),y0+(y1-y0)*t)}x2.lineTo(x1,y1);x2.stroke();x2.strokeStyle='#ffffff';x2.lineWidth=u(2);x2.stroke()}
function viewSpark(top){const k=hue(),sp=scene(top),cw=Math.min(A.W*.66,u(300)),b=puff(A.W/2,top+cw/6*1.95+u(4),cw);v.cloudBox=b;
 const mw=A.W*.36,mx=A.W*.58,my=b.y+b.h+u(10);slab(mx,my,mw,u(14),k.base,k.word);x2.fillStyle=k.heat;x2.fillRect(mx+2,my+2,(mw-4)*v.charge/NEED,u(14)-4);word(`charge ${v.charge} of ${NEED}`,mx+mw/2,my+u(28),11,k.word,800);
 if(v.struck)zig(A.W*.42,b.y+b.h*.9,sp.tree.x,sp.tree.y)}
function addCharge(){if(v.charge>=NEED){no('The meter is full. Press Spark now.');return}v.charge++;A.sound.tick();say(v.charge===NEED?'Full charge. The cloud bottom is packed with minus charge.':`Charge ${v.charge} of ${NEED}.`)}
function spark(){let m='';if(v.struck)m='It has already struck. Look where it hit.';else if(v.charge<NEED)m=`Only ${v.charge} of ${NEED}. Air does not carry electricity easily, so the cloud needs much more charge before it can jump.`;
 if(m){no(m);return}v.struck=1;A.sound.whoosh();yes('Flash! The spark jumped to the tallest thing: the tree, not the lower house.')}
/* step 3 */
function viewHeat(top){const k=hue(),mid=top+(A.H-top-u(130))*.5,half=Math.min(u(70),(A.H-top-u(130))*.42);v.boltBox={x:A.W/2-u(40),y:mid-half,w:u(80),h:half*2};zig(A.W/2,mid-half,A.W/2,mid+half);
 const ly=mid+half+u(22);
 if(v.hot){const rmax=Math.min(A.W*.42,half*1.1);for(let r=1;r<=3;r++){x2.strokeStyle=k.heat;x2.lineWidth=3;x2.globalAlpha=1-r*.25;x2.beginPath();x2.ellipse(A.W/2,mid,rmax*r/3*v.grow,half*r/3*v.grow,0,0,7);x2.stroke()}x2.globalAlpha=1;
  word('BOOM: the air bursts outwards',A.W/2,ly,14,k.word,900);word('air: about 30,000 °C, hotter than the Sun\'s surface',A.W/2,ly+u(20),11,k.word,800)}
 else word('air around the bolt: cool',A.W/2,ly,12,k.word,800)}
function heat(){if(v.hot)return;v.hot=1;v.grow=.4;A.tween(v,{grow:1},700,'out');A.sound.whoosh();say('The spark heats the air in a flash. The air bursts outwards. Now: what is thunder?');tools()}
function thunderIs(i){if(!v.hot){no('Tap the bolt first and watch what happens to the air.');return}const m=['Clouds do not bump together like rocks. Look at the air around the bolt.','',"Rain is quiet compared with this. The boom came from the air, not the water."][i];if(m){no(m);return}v.named=1;tools();yes('Yes: thunder is the sound of air bursting outwards from the very hot spark.')}
/* step 4 */
function viewRace(top){const k=hue(),y=top+(A.H-top-u(90))*.45,x0=u(30),x1=A.W-u(40);x2.strokeStyle=k.word;x2.lineWidth=2;x2.beginPath();x2.moveTo(x0,y);x2.lineTo(x1,y);x2.stroke();
 x2.fillStyle=k.word;x2.beginPath();x2.arc(x0,y,u(9),0,7);x2.fill();word('you',x0,y+u(22),11,k.word,800);
 puff(x1-u(10),y-u(40),u(70));word(v.known?`${v.km} km`:'? km',x1-u(10),y+u(22),12,k.word,900);
 if(v.t>0){const p=Math.min(1,v.t/(v.km*3));if(v.t>0)word('⚡ seen at once',A.W/2,y-u(64),11,k.word,800);const sx=x1-(x1-x0)*p;x2.strokeStyle=k.heat;x2.lineWidth=3;x2.beginPath();x2.arc(sx,y,u(12),Math.PI*.6,Math.PI*1.4);x2.stroke()}
 word(`count: ${Math.floor(v.t)} seconds`,A.W/2,y+u(60),16,k.word,900)}
function flash(){if(v.flashed){no('You already counted. Now pick how far away the storm is.');return}v.flashed=1;A.sound.tick();const end=v.km*3;
 const finish=()=>{v.t=end;v.heard=1;A.sound.whoosh();say(`Bang after ${end} seconds. How far away is the storm?`);tools()};
 if(A.reduced()){finish();return}v.t=.01;A.tween(v,{t:end},end*200,'lin',finish);say('Flash! Counting…')}
function guess(km){let m='';if(!v.heard)m='Press Flash and count to the bang first.';else if(km===v.km*3)m=`${km} is the number of seconds, not kilometres. Every 3 seconds is 1 km.`;else if(km===v.km*9)m=`That multiplies by 3. Divide instead: ${v.km*3} ÷ 3.`;
 if(m){no(m);return}if(km!==v.km){no(`Not ${km} km. Count again: ${v.km*3} seconds ÷ 3.`);return}v.known=1;yes(`${v.km*3} seconds ÷ 3 = ${v.km} km. Light arrived at once; the sound took ${v.km*3} seconds.`)}
/* step 5 */
function spots(top){const k=hue(),gy=ground(),w=(A.W-u(30))/2,h=(gy-top-u(10))/2;return S.PLACES.map((p,i)=>({x:u(10)+(i%2)*(w+u(10)),y:top+u(4)+Math.floor(i/2)*(h+u(6)),w,h,i}))}
function viewSafe(top){const k=hue(),bx=v.spots=spots(top);bx.forEach(b=>{const p=S.PLACES[b.i],who=v.where.map((w,j)=>w===b.i?S.PEOPLE[j].split(',')[0]:null).filter(Boolean);
  slab(b.x,b.y,b.w,b.h,k.base,k.word);icon(b.i,b.x+b.w/2,b.y+b.h*.55,Math.min(b.w,b.h)*.22);fold(p.name,b.w-12,12).forEach((r,j)=>word(r,b.x+b.w/2,b.y+u(18)+j*u(15),12,k.word,900));if(who.length)word(who.join(', '),b.x+b.w/2,b.y+b.h-u(16),11,k.night?'#bbf7d0':k.okc,800)});
 const n=v.where.length;word(n<S.PEOPLE.length?`Thunder! Where should ${S.PEOPLE[n]} go?`:'everyone is safe',A.W/2,ground()+u(20),12,k.word,900)}
function icon(i,x,y,r){const k=hue();if(i===0){x2.fillStyle=k.trunk;x2.fillRect(x-r*.12,y,r*.24,r*.9);x2.fillStyle=k.tree;x2.beginPath();x2.arc(x,y-r*.1,r*.7,0,7);x2.fill()}
 else if(i===1){x2.fillStyle=k.grass;x2.fillRect(x-r*1.6,y+r*.4,r*3.2,r*.5);x2.fillStyle=k.word;x2.beginPath();x2.arc(x,y-r*.3,r*.22,0,7);x2.fill();x2.fillRect(x-r*.08,y-r*.1,r*.16,r*.5)}
 else if(i===2){x2.fillStyle=k.wall;x2.fillRect(x-r*.8,y-r*.2,r*1.6,r*1.1);x2.fillStyle=k.roof;x2.beginPath();x2.moveTo(x-r,y-r*.2);x2.lineTo(x,y-r);x2.lineTo(x+r,y-r*.2);x2.fill()}
 else{x2.fillStyle='#2563eb';A.paint.rrect(x-r*1.1,y-r*.5,r*2.2,r*.8,6);x2.fill();x2.fillStyle='#93c5fd';x2.fillRect(x-r*.6,y-r*.4,r*1.2,r*.3);x2.fillStyle=k.black;[-.6,.6].forEach(d=>{x2.beginPath();x2.arc(x+d*r,y+r*.35,r*.22,0,7);x2.fill()})}}
function send(i){const n=v.where.length;if(n>=S.PEOPLE.length)return;const p=S.PLACES[i];if(!p.safe){no(p.why);return}v.where.push(i);A.sound.tick();
 if(v.where.length===S.PEOPLE.length){yes('Everyone is inside a building or a car. When thunder roars, go indoors.');tools();return}say(p.why);tools()}
const part=()=>['bump','spark','heat','race','safe','quiz'][A.step];
function paint(a){x2=a.ctx;const k=hue(),w=part();x2.fillStyle=k.base;x2.fillRect(0,0,A.W,A.H);
 if(w==='quiz'){word('Thunder and lightning',A.W/2,A.H*.34,16,k.word,900);word('charge · spark · boom · count',A.W/2,A.H*.5,12,k.dim,700);A.fx.draw(x2);return}
 const top=ribbon(v.head||'');({bump:viewBump,spark:viewSpark,heat:viewHeat,race:viewRace,safe:viewSafe})[w](top);verdict();A.fx.draw(x2)}
let ticket=0;
function fresh(o){ticket++;grip=null;Object.keys(v).forEach(z=>delete v[z]);Object.assign(v,{note:'',bad:false,pass:()=>{},bumps:0,charge:0,struck:0,hot:0,grow:1,named:0,km:3,t:0,flashed:0,heard:0,known:0,where:[]},o||{})}
function auto(i,acts){const me=ticket;acts.forEach((f,j)=>setTimeout(()=>{if(me===ticket&&A.step===i)f()},A.reduced()?25*(j+1):300*(j+1)))}
const passIf=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function tools(){if(!pad)return;pad.innerHTML='';const w=part(),btn=(t,f)=>{c.el('button',{type:'button',class:'lbtn'},pad,t).onclick=f};
 if(w==='bump')btn('Bump the ice',bump);
 if(w==='spark'){btn('Add charge',addCharge);btn('Spark!',spark)}
 if(w==='heat'){if(!v.hot)btn('Heat the air',heat);else if(!v.named)['Clouds banging together','Air bursting outwards','Rain hitting the ground'].forEach((t,i)=>btn('Thunder is: '+t,()=>thunderIs(i)))}
 if(w==='race'){if(!v.heard)btn('Flash!',flash);else if(!v.known)[1,3,9,27].forEach(n=>btn(n+' km',()=>guess(n)))}
 if(w==='safe'&&v.where.length<S.PEOPLE.length)S.PLACES.forEach((p,i)=>btn(p.name,()=>send(i)))}
const inBox=(p,r)=>r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function down(p){const w=part();if(w==='quiz')return false;
 if(w==='bump'){if(inBox(p,v.cloudBox))grip={y:p.y};return true}
 if(w==='spark'){if(inBox(p,v.cloudBox))addCharge();return true}
 if(w==='heat'){if(inBox(p,v.boltBox))heat();return true}
 if(w==='race'){if(!v.flashed)flash();return true}
 if(w==='safe'){const b=(v.spots||[]).find(r=>inBox(p,r));if(b)send(b.i);return true}return true}
function move(p){if(grip&&part()==='bump')grip.dy=p.y-grip.y}
function up(){const g=grip;grip=null;if(g&&part()==='bump')bump()}
const steps=[
{h:'Charge the cloud',p:S.STEPP[0],
 predict:{q:'When ice bits bump inside a storm cloud, where do the small, light bits go?',opts:['Up to the top','Down to the bottom','They stay still'],ans:0},
 task:'Bump the ice 6 times',show:()=>auto(0,Array(NEED).fill(bump)),
 go:()=>{fresh({head:S.TITLE[0]});speak(S.SAY[0]);tools();v.pass=passIf(0,()=>v.bumps===NEED,S.DONE[0])}},
{h:'Make lightning',p:S.STEPP[1],
 predict:{q:'Where will the lightning strike?',opts:['The low house roof','The tall tree','The grass in between'],ans:1},
 task:'Charge the cloud and make it spark',show:()=>auto(1,[...Array(NEED).fill(addCharge),spark]),
 go:()=>{fresh({head:S.TITLE[1]});speak(S.SAY[1]);tools();v.pass=passIf(1,()=>v.struck,S.DONE[1])}},
{h:'Heat and bang',p:S.STEPP[2],
 predict:{q:'What makes the sound of thunder?',opts:['Clouds crashing together','Air bursting out from the hot spark','Rain hitting roofs'],ans:1},
 task:'Heat the air, then say what thunder is',show:()=>auto(2,[heat,()=>thunderIs(1)]),
 go:()=>{fresh({head:S.TITLE[2]});speak(S.SAY[2]);tools();v.pass=passIf(2,()=>v.named,S.DONE[2])}},
{h:'Flash to bang',p:S.STEPP[3],
 task:'Count, then find how far away the storm is',show:()=>auto(3,[flash,()=>{},()=>{},()=>{},()=>{},()=>{},()=>{},()=>{},()=>guess(3)]),
 go:()=>{fresh({head:S.TITLE[3]});speak(S.SAY[3]);tools();v.pass=passIf(3,()=>v.known,S.DONE[3])}},
{h:'Stay safe',p:S.STEPP[4],
 task:'Send all three people somewhere safe',show:()=>auto(4,[()=>send(2),()=>send(3),()=>send(2)]),
 go:()=>{fresh({head:S.TITLE[4]});speak(S.SAY[4]);tools();v.pass=passIf(4,()=>v.where.length===S.PEOPLE.length,S.DONE[4])}},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>v.pass()});
function next(){ask++;const [q,opts]=S.QZ[ask%S.QZ.length],r=ask%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');opts.slice(r).concat(opts.slice(0,r)).forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>judge(t)});speak('Challenge: '+q);A.redraw()}
function judge(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Correct! ${run} in a row.`:'✗ '+(S.WHY[t]||'Try that lab step again.'))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.3,draw:paint,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;tools()},
 init:A=>{x2=A.ctx;const box=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Storm controls'},box);quiz=c.el('div',{class:'fl-chal'},A.below);fresh();
  A.gest({down,move,up});tools()}});
A.start()})})();
