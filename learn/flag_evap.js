/* Flagship: evaporation and the water cycle (ages 8-9). Watch a puddle turn into invisible water vapour hour by hour,
   race three saucers at different temperatures, find where the drops on a cold can come from, label evaporation,
   condensation, precipitation and collection on a picture, and zoom into a cloud to find tiny drops that join into rain. */
(()=>{
const SAUCERS=[{n:'Fridge',t:5,r:3},{n:'Room',t:20,r:10},{n:'Sunny sill',t:35,r:25}];
const SPOTS=[{w:'evaporation',x:.2,y:.56,why:'The sun warms the sea. Liquid water evaporates and rises as water vapour.'},
 {w:'condensation',x:.46,y:.2,why:'High up the air is cold. Water vapour cools and condenses into tiny drops: a cloud.'},
 {w:'precipitation',x:.72,y:.44,why:'The drops join, get heavy and fall as rain, snow or hail: precipitation.'},
 {w:'collection',x:.62,y:.86,why:'Rain runs into rivers and back to the sea: collection. Then it all starts again.'}];
const WORDS=['condensation','collection','evaporation','precipitation'];
VIS.reg('flagevap',c=>{let A,ctl,quiz,qn=-1,streak=0;const S={};
const part=()=>['pud','sauc','can','cyc','cloud','chal'][A.step];
const ping=k=>A.sound[k](),paintNow=()=>A.redraw(),refresh=()=>{paintNow();pads()};
function tell(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
const sea=()=>A.col.dark?'#38bdf8':'#0369a1',sky=()=>A.col.dark?'#0b1220':'#e0f2fe';
function txt(t,x,y,px,ink,al){const g=A.ctx,s=Math.round(px*(A.narrow?1:1.1));g.font=`800 ${s}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=ink||A.col.tx;g.fillText(t,x,y,A.W-16)}
function blob(x,y,rx,ry,col){const g=A.ctx;g.fillStyle=col;g.beginPath();g.ellipse(x,y,Math.max(rx,0.1),Math.max(ry,0.1),0,0,7);g.fill()}
function sun(x,y,r){const g=A.ctx;g.fillStyle=A.col.dark?'#fbbf24':'#f59e0b';g.beginPath();g.arc(x,y,r,0,7);g.fill();g.strokeStyle=g.fillStyle;g.lineWidth=3;
 for(let i=0;i<8;i++){const a=i*Math.PI/4;g.beginPath();g.moveTo(x+Math.cos(a)*r*1.3,y+Math.sin(a)*r*1.3);g.lineTo(x+Math.cos(a)*r*1.7,y+Math.sin(a)*r*1.7);g.stroke()}}
function puff(x,y,s){const g=A.ctx;g.fillStyle=A.col.dark?'#cbd5e1':'#ffffff';[[0,0,1],[-.8,.2,.7],[.8,.2,.75],[-.3,-.4,.7],[.4,-.35,.65]].forEach(([dx,dy,k])=>{g.beginPath();g.arc(x+dx*s,y+dy*s,s*k,0,7);g.fill()});
 g.strokeStyle=A.col.mu;g.lineWidth=1.5;g.beginPath();g.ellipse(x,y+s*.2,s*1.6,s*.9,0,0,7);g.stroke()}
const near=(p,x,y,r)=>Math.hypot(p.x-x,p.y-y)<r;
function paint(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=sky();g.fillRect(0,0,W,H);({pud:dPud,sauc:dSauc,can:dCan,cyc:dCyc,cloud:dCloud,chal:dChal})[part()](g,W,H,C);A.fx.draw(g)}
/* ---- 1: the puddle ---- */
const rail=()=>({a:A.W*.12,b:A.W*.88,y:A.H*.9});
function dPud(g,W,H,C){const h=S.hr,left=1-h/6;txt(`Hour ${h}: ${Math.round(left*100)}% of the puddle is left`,W/2,H*.06,14);sun(W*.84,H*.17,H*.05);
 g.fillStyle=C.dark?'#475569':'#94a3b8';g.fillRect(W*.1,H*.66,W*.8,H*.05);blob(W/2,H*.66,W*.36*left,H*.035*left,A.alpha(sea(),.85));
 for(let i=0;i<h*5;i++){const x=W*(.16+(i*.618%1)*.68),y=H*(.58-(i*.754+.3)%1*.42);g.fillStyle=A.alpha(C.tx,.35);g.beginPath();g.arc(x,y,2.4,0,7);g.fill()}
 if(h)txt('Dots = water vapour, a gas. Really it is invisible.',W/2,H*.76,12,C.tx);const R=rail();g.strokeStyle=C.mu;g.lineWidth=6;g.lineCap='round';g.beginPath();g.moveTo(R.a,R.y);g.lineTo(R.b,R.y);g.stroke();
 const k=R.a+(R.b-R.a)*h/6;g.fillStyle=sea();g.beginPath();g.arc(k,R.y,15,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();txt('0 h',R.a,R.y-24,11);txt('6 h',R.b,R.y-24,11)}
function setHr(h){if(part()!=='pud')return;h=Math.max(0,Math.min(6,h));if(h===S.hr)return;S.hr=h;ping('tick');
 tell(h===6?'The puddle is gone. The water evaporated: it changed from liquid into water vapour, a gas in the air.':`Hour ${h}. The puddle is shrinking. Water is evaporating into the air.`);refresh();S.want()}
/* ---- 2: saucer race ---- */
const dish=i=>({x:A.W*(.18+i*.32),y:A.H*.5,r:Math.min(A.W*.14,A.H*.17)});
function dSauc(g,W,H,C){txt(S.hr?`After ${S.hr} hour${S.hr>1?'s':''}`:'Each saucer starts with 100 ml',W/2,H*.07,14);
 SAUCERS.forEach((s,i)=>{const d=dish(i),ml=Math.max(0,100-s.r*S.hr),hot=s.t>25;blob(d.x,d.y,d.r,d.r*.42,C.dark?'#334155':'#e2e8f0');g.strokeStyle=S.miss===i?C.rd:C.tx;g.lineWidth=S.miss===i?4:2;g.beginPath();g.ellipse(d.x,d.y,d.r,d.r*.42,0,0,7);g.stroke();
  blob(d.x,d.y,d.r*.85*ml/100,d.r*.34*ml/100,A.alpha(sea(),.85));txt(s.n,d.x,d.y-d.r*.42-34,13);txt(`${s.t} °C`,d.x,d.y-d.r*.42-15,12,hot?C.rd:C.tx);txt(`${ml} ml`,d.x,d.y+d.r*.7,14,ml?C.tx:C.gr)});
 txt(S.got?'Warmer water evaporates faster.':S.hr>=4?'One saucer is dry. Tap the one that dried first.':'Press Wait 1 hour.',W/2,H*.88,13)}
function wait(){if(part()!=='sauc'||S.hr>=4)return;S.hr++;ping('tick');tell(`${S.hr} hour${S.hr>1?'s':''} later: fridge ${100-3*S.hr} ml, room ${100-10*S.hr} ml, sunny sill ${Math.max(0,100-25*S.hr)} ml.`);refresh()}
function pickDish(i){if(part()!=='sauc'||S.hr<4||S.got)return;if(i===2){S.got=1;ping('pop');tell('Yes. The sunny sill was the warmest, so its water evaporated fastest. Temperature changes the rate of evaporation.');refresh();return S.want()}
 S.miss=i;setTimeout(()=>{S.miss=null;paintNow()},A.reduced()?10:800);ping('miss');tell(i===0?'The fridge saucer still has most of its water. Cold water evaporates slowly.':'The room saucer still has 60 ml. Look for 0 ml.');paintNow()}
/* ---- 3: the cold can ---- */
const tin=k=>({x:A.W*(k?.7:.3),y:A.H*.2,w:A.W*.16,h:A.H*.42});
function dCan(g,W,H,C){txt(`${S.min} minutes in a warm room`,W/2,H*.07,14);[0,1].forEach(k=>{const b=tin(k);g.fillStyle=k?(C.dark?'#f97316':'#fdba74'):(C.dark?'#38bdf8':'#7dd3fc');A.paint.rrect(b.x-b.w/2,b.y,b.w,b.h,10);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();
  txt(k?'Warm can':'Cold can',b.x,b.y+b.h+16,13);txt(k?'20 °C':'4 °C',b.x,b.y+b.h+33,12);if(!k)for(let i=0;i<S.min*2;i++){const x=b.x-b.w/2+8+((i*29)%Math.max(8,b.w-16)),y=b.y+12+((i*41)%Math.max(8,b.h-24));blob(x,y,3,4,C.dark?'#f8fafc':A.alpha(sea(),.9))}});
 txt(S.got?'Water vapour in the air condensed on the cold can.':S.min>=15?'Where did the drops come from?':'Press Wait 5 minutes.',W/2,H*.9,13)}
function tick(){if(part()!=='can'||S.min>=15)return;S.min+=5;ping('tick');tell(S.min<15?`${S.min} minutes. Drops are forming on the cold can only.`:'15 minutes. The cold can is covered in drops. The warm can is dry.');refresh()}
function why(i){if(part()!=='can'||S.min<15||S.got)return;let m='Look at the warm can: same room, same air, no drops.';
 if(i===1){S.got=1;ping('pop');m='Yes. Air holds invisible water vapour. Next to the cold can it cools and condenses into liquid drops.';tell(m);refresh();return S.want()}
 if(i===0)m='The can is sealed and metal. Nothing leaked: the warm can has the same drink and stays dry.';
 if(i===2)m='Cans do not sweat. Only the cold can got wet, so the cold made water come out of the air.';ping('miss');tell(m);paintNow()}
/* ---- 4: label the cycle ---- */
function dCyc(g,W,H,C){g.fillStyle=A.alpha(sea(),.8);g.fillRect(0,H*.68,W*.42,H*.32);g.fillStyle=C.dark?'#166534':'#86efac';g.beginPath();g.moveTo(W*.42,H);g.lineTo(W*.42,H*.72);g.lineTo(W*.78,H*.38);g.lineTo(W,H*.5);g.lineTo(W,H);g.fill();
 g.strokeStyle=sea();g.lineWidth=5;g.beginPath();g.moveTo(W*.78,H*.42);g.quadraticCurveTo(W*.62,H*.75,W*.4,H*.86);g.stroke();sun(W*.1,H*.12,H*.045);puff(W*.5,H*.14,H*.06);puff(W*.74,H*.18,H*.05);
 g.strokeStyle=sea();g.lineWidth=2;for(let i=0;i<5;i++){const x=W*(.68+i*.03);g.beginPath();g.moveTo(x,H*.27);g.lineTo(x-4,H*.36);g.stroke()}
 g.setLineDash([4,5]);g.strokeStyle=C.tx;g.beginPath();g.moveTo(W*.2,H*.66);g.lineTo(W*.4,H*.24);g.stroke();g.setLineDash([]);
 SPOTS.forEach((s,i)=>{const x=W*s.x,y=H*s.y;if(i<S.lab){g.font=`800 ${A.narrow?11:12}px system-ui,sans-serif`;const w=g.measureText(s.w).width+12;g.fillStyle=C.dark?'#1e293b':'#ffffff';g.fillRect(x-w/2,y-11,w,22);g.strokeStyle=C.gr;g.lineWidth=2;g.strokeRect(x-w/2,y-11,w,22);txt(s.w,x,y,11)}
  else if(i===S.lab){g.strokeStyle=S.miss?C.rd:C.vi;g.lineWidth=4;g.beginPath();g.arc(x,y,18,0,7);g.stroke();txt('?',x,y,16)}});
 txt(S.lab<4?'Which word goes in the ring?':'All four labelled!',W/2,H*.95,13,C.dark?C.tx:'#0f172a')}
function place(w){if(part()!=='cyc'||S.lab>=4)return;const s=SPOTS[S.lab];if(w===s.w){S.lab++;S.miss=0;ping('pop');tell(s.why);refresh();return S.want()}S.miss=1;ping('miss');
 let m=`Not ${w} here.`;if(w==='evaporation')m='Evaporation is liquid turning into gas. Here the water is doing something else.';if(w==='condensation')m='Condensation is gas cooling into liquid drops. That happens up in the cold air, at the cloud.';
 if(w==='precipitation')m='Precipitation is water falling from clouds: rain, snow or hail.';if(w==='collection')m='Collection is water gathering in rivers, lakes and the sea.';tell(m);paintNow()}
/* ---- 5: inside a cloud ---- */
const lens=()=>({a:A.W*.14,b:A.W*.86,y:A.H*.9});
function dCloud(g,W,H,C){const z=S.zoom;txt(['A cloud from the ground','Closer: fuzzy edges','Closer: tiny dots','Very close: tiny drops of liquid water'][z-1],W/2,H*.06,14);
 if(z<3)puff(W/2,H*.4,H*(.12+z*.03));else{const n=S.join?Math.max(3,24>>S.join):24,r=(z===3?3:6)*(1+S.join*.9);
  for(let i=0;i<n;i++){const x=W*(.15+(i*.618%1)*.7),y=H*(.3+(i*.754+.2)%1*.3)+(S.join>=3?S.fall*H*.03:0);blob(x,y,r,r,A.alpha(sea(),.85))}
  if(S.join>=3)txt('Too heavy! The drops fall as rain.',W/2,H*.15,13);else if(z===4)txt(S.join?'The drops bump and join: bigger drops.':'Not gas: liquid drops, about 0.02 mm wide.',W/2,H*.15,12)}
 const L=lens();g.strokeStyle=C.mu;g.lineWidth=6;g.lineCap='round';g.beginPath();g.moveTo(L.a,L.y);g.lineTo(L.b,L.y);g.stroke();const k=L.a+(L.b-L.a)*(z-1)/3;g.fillStyle=C.vi;g.beginPath();g.arc(k,L.y,15,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();
 txt('far',L.a,L.y-24,11);txt('zoom',L.b,L.y-24,11)}
function setZoom(z){if(part()!=='cloud'||S.join)return;z=Math.max(1,Math.min(4,z));if(z===S.zoom)return;S.zoom=z;ping('tick');tell(['A cloud looks like a soft white lump.','The edges look fuzzy.','Now you can see tiny dots.','They are tiny drops of liquid water. A cloud is not water vapour: vapour is invisible.'][z-1]);refresh()}
function bump(){if(part()!=='cloud'||S.zoom<4||S.join>=3)return;S.join++;ping('pop');if(S.join>=3){let f=0;const k=S.k,go=()=>{if(k!==S.k||f>=6)return;S.fall=++f;paintNow();setTimeout(go,A.reduced()?5:120)};go();tell('The drops are too heavy to float, so they fall as rain. That is precipitation.');S.want()}else tell('Drops bump into each other and join. They get bigger.');refresh()}
function dChal(g,W,H,C){sun(W*.12,H*.14,H*.05);puff(W*.6,H*.2,H*.07);g.fillStyle=A.alpha(sea(),.8);g.fillRect(0,H*.72,W,H*.28);txt('evaporation → condensation → precipitation → collection',W/2,H*.62,12,C.tx)}
function pads(){if(!ctl)return;ctl.innerHTML='';const v=part(),btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t).onclick=f};
 if(v==='pud'){btn('+1 hour',()=>setHr(S.hr+1));btn('Back 1 hour',()=>setHr(S.hr-1))}
 if(v==='sauc'){if(S.hr<4)btn('Wait 1 hour',wait);else if(!S.got)SAUCERS.forEach((s,i)=>btn(s.n,()=>pickDish(i),`${s.n} saucer`))}
 if(v==='can'){if(S.min<15)btn('Wait 5 minutes',tick);else if(!S.got){btn('It leaked out of the can',()=>why(0));btn('Water vapour in the air condensed',()=>why(1));btn('The can is sweating',()=>why(2))}}
 if(v==='cyc'&&S.lab<4)WORDS.forEach(w=>btn(w,()=>place(w)));
 if(v==='cloud'){if(S.zoom<4)btn('Zoom in',()=>setZoom(S.zoom+1));else if(S.join<3)btn('Drops bump and join',bump)}}
function down(p){const v=part();
 if(v==='pud'){const R=rail();if(Math.abs(p.y-R.y)<34){S.drag=1;slide(p.x);return true}}
 if(v==='sauc')SAUCERS.forEach((s,i)=>{const d=dish(i);if(near(p,d.x,d.y,d.r))pickDish(i)});
 if(v==='can'&&S.min<15&&[0,1].some(k=>{const b=tin(k);return p.x>b.x-b.w/2&&p.x<b.x+b.w/2&&p.y>b.y&&p.y<b.y+b.h}))tick();
 if(v==='cloud'){const L=lens();if(Math.abs(p.y-L.y)<34){S.drag=1;slide(p.x);return true}if(S.zoom>=4)bump()}return false}
function slide(x){if(part()==='pud'){const R=rail();setHr(Math.round((x-R.a)/(R.b-R.a)*6))}if(part()==='cloud'){const L=lens();setZoom(1+Math.round((x-L.a)/(L.b-L.a)*3))}}
function move(p){if(S.drag)slide(p.x)}
function up(){S.drag=0}
const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function auto(n,acts){steps[n].go();const k=++S.k;acts.forEach((f,j)=>setTimeout(()=>{if(k===S.k)f()},A.reduced()?30*(j+1):(j+1)*340))}
function clear(){const k=(S.k||0)+1;for(const x in S)delete S[x];Object.assign(S,{k,want:()=>{},hr:0,min:0,got:0,miss:null,lab:0,zoom:1,join:0,fall:0,drag:0})}
const steps=[
{h:'Where did the puddle go?',p:'Evaporation is when a liquid turns into a gas. Water that evaporates becomes water vapour, a gas you cannot see.',
 predict:{q:'A puddle slowly dries up. Where does the water go?',opts:['It soaks into the tray','Into the air as water vapour','It is gone for ever'],ans:1},task:'Run the clock to hour 6',
 show:()=>auto(0,[1,2,3,4,5,6].map(h=>()=>setHr(h))),
 go:()=>{clear();tell('Drag the dot or press +1 hour.');pads();S.want=finish(0,()=>S.hr>=6,'The water did not vanish. It evaporated into the air as water vapour.')}},
{h:'Warm dries faster',p:'Water evaporates at any temperature, not only when it boils. The warmer it is, the faster it evaporates.',
 predict:{q:'Three saucers of water: in a fridge, in a room, on a sunny sill. Which dries first?',opts:['The fridge one','The room one','The sunny one'],ans:2},task:'Wait 4 hours, then tap the dry saucer',
 show:()=>auto(1,[wait,wait,wait,wait,()=>pickDish(2)]),
 go:()=>{clear();tell('Press Wait 1 hour.');pads();S.want=finish(1,()=>S.got,'The higher the temperature, the faster the rate of evaporation.')}},
{h:'Drops on a cold can',p:'Condensation is when a gas cools and turns back into a liquid. The air around us holds water vapour.',task:'Wait 15 minutes and explain the drops',
 show:()=>auto(2,[tick,tick,tick,()=>why(1)]),
 go:()=>{clear();tell('Two cans in the same warm room. Press Wait 5 minutes.');pads();S.want=finish(2,()=>S.got,'Cooling water vapour makes it condense into liquid.')}},
{h:'The water cycle',p:'The same water goes round and round: evaporation, condensation, precipitation and collection.',task:'Label all 4 parts',
 show:()=>auto(3,SPOTS.map(s=>()=>place(s.w))),
 go:()=>{clear();tell('Pick the word for the ring by the sea.');pads();S.want=finish(3,()=>S.lab>=4,'Evaporation, condensation, precipitation, collection, and round again.')}},
{h:'What is a cloud?',p:'Zoom in on a cloud. Then watch what makes it rain.',
 predict:{q:'What is a cloud made of?',opts:['Water vapour gas','Tiny drops of liquid water','Smoke'],ans:1},task:'Zoom all the way in and make it rain',
 show:()=>auto(4,[()=>setZoom(2),()=>setZoom(3),()=>setZoom(4),bump,bump,bump]),
 go:()=>{clear();tell('Drag the dot or press Zoom in.');pads();S.want=finish(4,()=>S.join>=3,'Clouds are tiny drops. When they join and get heavy, they fall.')}},
{h:'Challenge',p:'',go:()=>{clear();quizNext()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Wet washing dries on a line. Where does the water go?',[['Into the air as water vapour','ok'],['Into the ground','ground'],['It is used up and gone','gone']]],
 ['Which puddle dries fastest?',[['One on a hot, sunny day','ok'],['One on a cold, cloudy day','cold'],['They all dry at the same speed','same']]],
 ['Drops form on a cold glass of juice. Where did they come from?',[['Water vapour in the air condensed','ok'],['The juice leaked through the glass','leak'],['The glass is sweating','sweat']]],
 ['Does water have to boil before it can evaporate?',[['No: it evaporates at any temperature, faster when warm','ok'],['Yes: only at 100 °C','boil'],['Yes: only in sunshine','sunny']]],
 ['What is a cloud made of?',[['Tiny drops of water or bits of ice','ok'],['Water vapour gas','gas'],['Smoke','smoke']]],
 ['Rain, snow and hail falling from clouds is called...',[['Precipitation','ok'],['Condensation','cond'],['Evaporation','evap']]],
 ['Water vapour cools and turns back into liquid. This is...',[['Condensation','ok'],['Evaporation','evap2'],['Collection','coll']]]];
function slip(t){let m='Think about where the water goes and whether it is warming or cooling.';
 if(t==='ground')m='The washing hangs in the air, not on the ground. The water evaporates into the air.';
 if(t==='gone')m='Water is never used up. It evaporates into water vapour and comes back later as rain.';
 if(t==='cold')m='Cold water evaporates slowly. Heat speeds evaporation up.';
 if(t==='same')m='Temperature changes the rate. Warm puddles dry faster than cold ones.';
 if(t==='leak')m='Glass has no holes. The water came out of the air, like on the cold can.';
 if(t==='sweat')m='Glasses cannot sweat. Water vapour in the air cooled on the glass and condensed.';
 if(t==='boil')m='Boiling is fast evaporation, but puddles dry on cool days too. Evaporation happens at any temperature.';
 if(t==='sunny')m='Washing dries indoors and on cloudy days, just more slowly. Warmth helps, but it is not needed.';
 if(t==='gas')m='Water vapour is invisible. You can see a cloud because it is made of tiny drops or ice.';
 if(t==='smoke')m='Smoke comes from burning. Clouds are water: tiny drops or bits of ice.';
 if(t==='cond')m='Condensation is gas turning into liquid. Falling rain, snow and hail are precipitation.';
 if(t==='evap'||t==='evap2')m='Evaporation goes the other way: liquid into gas. Gas cooling into liquid is condensation.';
 if(t==='coll')m='Collection is water gathering in rivers and seas. Gas into liquid is condensation.';return m}
function quizNext(){qn++;const[q,ops]=QS[qn%QS.length],sh=(qn+2)%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>mark(t)});tell('Challenge: '+q);paintNow()}
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;ping('miss')}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quizNext}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw:paint,onStep:A=>{quiz.hidden=A.step!==5;ctl.hidden=A.step===5;pads()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});pads()}});
A.start()})})();
