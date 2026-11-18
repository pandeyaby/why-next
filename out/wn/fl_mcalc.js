/* Flagship: Calculating with measurements (ages 7–8; NC Y3 Measurement: measure, compare, add and subtract lengths
   m/cm/mm, mass kg/g, capacity l/ml). Read mm, add ribbons end to end, convert 1 m 30 cm to cm before adding, read a
   50 g scale, pour 250 ml twice from 1 l, count on to find growth. Not flagcmpm/flagunits/flaglenht/flagcups. */
(()=>{
VIS.reg('flagmcalc',c=>{let A,row,quiz,turn=-1,epoch=0;const S={};c.fig.classList.add('young');
const phase=()=>['mm','join','metre','scale','pour','grow','chal'][A.step];
function speak(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function ink(s,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.b||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.ink||A.col.tx;g.fillText(String(s),x,y,o.max||A.W-10)}
function lines(s,x,y,px,o){o=o||{};const g=A.ctx,mw=o.max||A.W*.92;g.font=`${o.b||700} ${px}px system-ui,sans-serif`;const L=[];let cur='';
 String(s).split(' ').forEach(w=>{const t=cur?cur+' '+w:w;if(g.measureText(t).width>mw&&cur){L.push(cur);cur=w}else cur=t});L.push(cur);const lh=px*1.28;L.forEach((l,i)=>ink(l,x,y-(L.length-1)*lh/2+i*lh,px,{...o,max:mw}))}
function slab(r,fill,lw){const g=A.ctx;g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=A.col.tx;g.lineWidth=lw||1.5;g.stroke()}
const within=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const txt=()=>A.narrow?14:16,head=()=>A.narrow?19:23;/* red ribbon slides to join blue end to end; dial labels every 200 g, marks every 50 g */
const rx0=()=>A.W*.06,rx1=()=>A.W*.94,mmX=v=>rx0()+(rx1()-rx0())*v/100;
function mmRuler(y){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.2:.8);g.fillRect(rx0()-8,y,rx1()-rx0()+16,A.H*.12);g.strokeStyle=C.tx;g.lineWidth=1.5;g.strokeRect(rx0()-8,y,rx1()-rx0()+16,A.H*.12);
 for(let v=0;v<=100;v++){const cm=v%10===0,half=v%5===0;g.lineWidth=cm?2:1;g.beginPath();g.moveTo(mmX(v),y);g.lineTo(mmX(v),y+A.H*(cm?.05:half?.035:.022));g.stroke();if(cm)ink(v/10,mmX(v),y+A.H*.085,A.narrow?12:14,{b:800})}ink('cm',rx1()+2,y-A.H*.025,A.narrow?11:12,{al:'right',ink:C.mu})}
const THINGS=[{n:'pencil',mm:74,col:'#f59e0b',opts:[64,74,7]},{n:'crayon',mm:52,col:'#ec4899',opts:[52,5,520]},{n:'rubber',mm:38,col:'#38bdf8',opts:[30,48,38]}];
function drawMm(){const t=THINGS[Math.min(S.k,2)],g=A.ctx,y=A.H*.42;mmRuler(y);g.fillStyle=t.col;A.paint.rrect(mmX(0),y-A.H*.1,mmX(t.mm)-mmX(0),A.H*.08,6);g.fill();g.strokeStyle=A.col.tx;g.stroke();
 if(S.k<3)ink(`How long is the ${t.n}?`,A.W/2,A.H*.12,head(),{b:800});else ink('74 mm, 52 mm, 38 mm',A.W/2,A.H*.12,head(),{b:800});
 if(S.mark!=null){g.strokeStyle=S.markOk?A.col.gr:A.col.rd;g.lineWidth=3;g.beginPath();g.moveTo(mmX(S.mark),y-A.H*.14);g.lineTo(mmX(S.mark),y+A.H*.13);g.stroke()}
 lines(S.msg||'1 cm = 10 mm. Count the small marks after the last cm.',A.W/2,A.H*.76,txt(),{ink:A.col.mu})}
const cmX=v=>A.W*.06+A.W*.88*v/100;
function stick(y){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#d9f99d',C.dark?.2:.75);g.fillRect(cmX(0),y,cmX(100)-cmX(0),A.H*.08);g.strokeStyle=C.tx;g.strokeRect(cmX(0),y,cmX(100)-cmX(0),A.H*.08);
 for(let v=0;v<=100;v+=5){g.lineWidth=v%10?1:2;g.beginPath();g.moveTo(cmX(v),y);g.lineTo(cmX(v),y+A.H*(v%10?.025:.04));g.stroke();if(v%(A.narrow?20:10)===0)ink(v,cmX(v),y+A.H*.06,A.narrow?11:12,{b:700})}}
function ribbon(a,b,y,col,t){const g=A.ctx;g.fillStyle=col;A.paint.rrect(cmX(a),y,cmX(b)-cmX(a),A.H*.06,6);g.fill();g.strokeStyle=A.col.tx;g.lineWidth=1.2;g.stroke();ink(t,(cmX(a)+cmX(b))/2,y+A.H*.03,A.narrow?12:14,{b:800,ink:'#111827'})}
function drawJoin(){const y=A.H*.5;stick(y);ribbon(0,45,y-A.H*.17,'#a5b4fc','45 cm');ribbon(S.at,S.at+38,y-A.H*.09,'#fca5a5','38 cm');
 ink('45 cm + 38 cm',A.W/2,A.H*.1,head(),{b:800});if(S.at===45)ink('ends at 83',cmX(83),y+A.H*.12,txt(),{b:800,ink:A.col.gr});lines(S.msg||'Slide the red ribbon to start where the blue one ends',A.W/2,A.H*.82,txt(),{ink:A.col.mu})}
function rope(x,y,len,col,t){const g=A.ctx,w=A.W*.88*len/250;g.strokeStyle=col;g.lineWidth=A.narrow?9:12;g.lineCap='round';g.beginPath();g.moveTo(x,y);g.lineTo(x+w,y);g.stroke();g.lineCap='butt';ink(t,x+w/2,y-A.H*.06,txt(),{b:800});return w}
function drawMetre(){const C=A.col;ink('Rope A + rope B',A.W/2,A.H*.08,head(),{b:800});rope(A.W*.06,A.H*.28,130,'#f97316',S.conv?'130 cm':'1 m 30 cm');rope(A.W*.06,A.H*.46,85,'#14b8a6','85 cm');
 const r={x:A.W*.18,y:A.H*.56,w:A.W*.64,h:A.H*.12};slab(r,S.conv?A.alpha(C.gr,.25):A.alpha(C.am,.22),2);ink(S.conv?'1 m 30 cm = 130 cm ✓':'Tap: 1 m = 100 cm',r.x+r.w/2,r.y+r.h/2,txt(),{b:800});
 lines(S.msg||'Make both ropes centimetres, then add',A.W/2,A.H*.84,txt(),{ink:C.mu})}
function drawScale(){const g=A.ctx,C=A.col,cx=A.W/2,cy=A.H*.5,R=Math.min(A.W*.3,A.H*.32),val=S.g;
 g.fillStyle=A.mix(C.pn,'#ffffff',C.dark?.08:.8);g.beginPath();g.arc(cx,cy,R*1.08,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();
 const ang=v=>-Math.PI*1.25+Math.PI*1.5*v/1000;for(let v=0;v<=1000;v+=50){const a=ang(v),big=v%100===0;g.lineWidth=big?2.2:1;g.beginPath();g.moveTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R);g.lineTo(cx+Math.cos(a)*R*(big?.84:.9),cy+Math.sin(a)*R*(big?.84:.9));g.stroke();
  if(v%200===0)ink(v,cx+Math.cos(a)*R*.68,cy+Math.sin(a)*R*.68,A.narrow?11:13,{b:800})}
 const a=ang(S.shown);g.strokeStyle=C.rd;g.lineWidth=3;g.beginPath();g.moveTo(cx,cy);g.lineTo(cx+Math.cos(a)*R*.93,cy+Math.sin(a)*R*.93);g.stroke();ink('g',cx,cy+R*.45,txt(),{ink:C.mu});
 const bag=(i,on,t)=>{const r={x:A.W*(i?.72:.04),y:A.H*.08,w:A.W*.24,h:A.H*.14};slab(r,on?A.alpha(C.gr,.25):A.alpha(i?'#fde68a':'#e5e7eb',.9),on?2.5:1.5);ink(t,r.x+r.w/2,r.y+r.h/2,A.narrow?12:14,{b:800,ink:on?C.tx:'#111827'})};
 bag(0,S.bags.includes(0),'flour 350 g');bag(1,S.bags.includes(1),'sugar 400 g');lines(S.msg||'Tap each bag to put it on the scale',A.W/2,A.H*.92,A.narrow?13:15,{ink:C.mu})}
/* 1 l jug and two 250 ml glasses */
function drawPour(){const g=A.ctx,C=A.col,j={x:A.W*.08,y:A.H*.16,w:A.W*.3,h:A.H*.56},ml=S.ml;g.fillStyle=A.alpha('#fb923c',.7);g.fillRect(j.x,j.y+j.h*(1-ml/1000),j.w,j.h*ml/1000);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(j.x,j.y,j.w,j.h);
 for(let v=250;v<=1000;v+=250){const y=j.y+j.h*(1-v/1000);g.beginPath();g.moveTo(j.x+j.w,y);g.lineTo(j.x+j.w+10,y);g.stroke();ink(v+' ml',j.x+j.w+14,y,A.narrow?11:13,{al:'left',b:700})}
 ink(`${ml} ml left`,j.x+j.w/2,j.y+j.h+A.H*.05,txt(),{b:900});
 [0,1].forEach(i=>{const r=glass(i),full=S.cups>i;g.fillStyle=full?A.alpha('#fb923c',.7):A.alpha(C.tx,.04);g.fillRect(r.x,r.y+(full?0:r.h),r.w,full?r.h:0);g.strokeStyle=C.tx;g.strokeRect(r.x,r.y,r.w,r.h);ink(full?'250 ml':'glass',r.x+r.w/2,r.y+r.h+A.H*.04,A.narrow?12:14,{b:800})});
 lines(S.msg||'Tap a glass to pour 250 ml',A.W/2,A.H*.9,A.narrow?13:15,{ink:C.mu})}
const glass=i=>({x:A.W*(.6+i*.2),y:A.H*.42,w:A.W*.13,h:A.H*.22});
/* count on 23 → 41 */
const HOPS=[[23,30],[30,40],[40,41]],nlX=v=>A.W*.07+A.W*.86*(v-20)/25;
function drawGrow(){const g=A.ctx,C=A.col,y=A.H*.58;g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.moveTo(nlX(20),y);g.lineTo(nlX(45),y);g.stroke();
 for(let v=20;v<=45;v++){g.lineWidth=v%5?1:2;g.beginPath();g.moveTo(nlX(v),y-(v%5?5:9));g.lineTo(nlX(v),y+(v%5?5:9));g.stroke();const e=v===23||v===41;if(v%5===0||e)ink(v,nlX(v),y+A.H*(e?.11:.06),A.narrow?11:13,{b:e?900:600})}
 HOPS.slice(0,S.hop).forEach(([a,b])=>{g.strokeStyle=C.vi;g.lineWidth=3;g.beginPath();const m=(nlX(a)+nlX(b))/2,h=A.H*(.08+(b-a)*.01);g.moveTo(nlX(a),y);g.quadraticCurveTo(m,y-h*2,nlX(b),y);g.stroke();ink('+'+(b-a),m,y-h-A.H*.04,A.narrow?14:16,{b:900,ink:C.vi})});
 ink('🌻 last week 23 cm, now 41 cm',A.W/2,A.H*.1,A.narrow?15:18,{b:800});if(S.hop===3)ink('7 + 10 + 1 = 18 cm',A.W/2,A.H*.22,head(),{b:900,ink:C.gr});
 lines(S.msg||'Hop from 23 to 41. How much did it grow?',A.W/2,A.H*.84,txt(),{ink:C.mu})}
function draw(Q){const C=Q.col,k=phase();Q.ctx.fillStyle=Q.mix(C.pn,'#fef9c3',C.dark?.05:.45);Q.ctx.fillRect(0,0,Q.W,Q.H);
 ({mm:drawMm,join:drawJoin,metre:drawMetre,scale:drawScale,pour:drawPour,grow:drawGrow}[k]||(()=>lines(S.q||'Same units, then calculate',Q.W/2,Q.H*.42,Q.narrow?19:24,{b:800})))()}
function clear(o){epoch++;for(const k in S)delete S[k];Object.assign(S,{k:0,mark:null,markOk:false,at:0,joined:false,total:null,conv:false,bags:[],g:0,shown:0,read:null,ml:1000,cups:0,left:null,hop:0,grew:null,msg:'',q:'',ok:()=>{}},o||{})}
const passWhen=(i,cond,msg)=>()=>{if(A.step===i&&cond()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function play(i,acts){steps[i].go();const t=epoch;acts.forEach((f,j)=>setTimeout(()=>{if(t===epoch)f()},A.reduced()?25*(j+1):450*(j+1)))}
function readMm(v){if(S.k>2)return;const t=THINGS[S.k];S.mark=t.mm;S.markOk=v===t.mm;
 if(S.markOk){A.sound.pop();S.msg=`${Math.floor(v/10)} cm and ${v%10} mm = ${v} mm.`;S.k++;S.mark=null}
 else{A.sound.miss();S.msg=v<10?`${v} mm is under 1 cm. Each cm is 10 mm, so count the cm too.`:v>100?`${v} mm is longer than the whole ruler. Count 10 mm for each cm.`:v%10===0?`${v} mm is only the whole cm. Add the small marks after it.`:`Not ${v}. Start counting at 0, not at the end of the ruler.`}speak(S.msg);A.redraw();keys();S.ok()}
function slide(to){S.at=Math.max(0,Math.min(62,to));A.redraw()}
function join(){S.at=45;S.joined=true;A.sound.pop();S.msg='End to end: the red ribbon starts at 45.';speak(S.msg);A.redraw();keys();S.ok()}
function addLen(v){if(!S.joined){A.sound.miss();S.msg='Join the ribbons first, end to end.';speak(S.msg);A.redraw();return}S.total=v;
 if(v===83){A.sound.pop();S.msg='5 + 8 = 13 ones: 1 ten and 3 ones. 45 + 38 = 83 cm.'}else{A.sound.miss();S.msg=v===73?'73 forgets the ten made by 5 + 8 = 13.':'Look where the red ribbon ends on the stick.'}speak(S.msg);A.redraw();keys();S.ok()}
function convert(){if(S.conv)return;S.conv=true;A.sound.pop();S.msg='1 m = 100 cm, so 1 m 30 cm = 130 cm.';speak(S.msg);A.redraw();keys();S.ok()}
function addRope(v){if(!S.conv){A.sound.miss();S.msg='The units are different. Change 1 m 30 cm into cm first.';speak(S.msg);A.redraw();return}S.total=v;
 if(v===215){A.sound.pop();S.msg='130 cm + 85 cm = 215 cm. That is 2 m 15 cm.'}else{A.sound.miss();S.msg=v===116?'116 adds 1 + 30 + 85. The 1 means 1 metre, which is 100 cm.':'Add the two lengths: 130 + 85.'}speak(S.msg);A.redraw();keys();S.ok()}
function putBag(i){if(S.bags.includes(i))return;S.bags.push(i);S.g+=i?400:350;A.sound.pop();A.tween(S,{shown:S.g},A.reduced()?1:800,'out');S.msg=S.bags.length<2?`${S.g} g on the scale.`:'Both bags on. Read the needle.';speak(S.msg);A.redraw();keys();S.ok()}
function readScale(v){if(S.bags.length<2){A.sound.miss();S.msg='Put both bags on first.';speak(S.msg);A.redraw();return}S.read=v;
 if(v===750){A.sound.pop();S.msg='Halfway between 700 and 800 is 750 g. And 350 + 400 = 750.'}else{A.sound.miss();S.msg=v===705?'Each small mark is 50 g, not 1 g. Halfway from 700 to 800 is 750.':'The needle has not reached 800. It is halfway between 700 and 800.'}speak(S.msg);A.redraw();keys();S.ok()}
function pour(i){if(S.cups>i||S.cups<i)return;S.cups++;A.sound.pop();A.tween(S,{ml:1000-250*S.cups},A.reduced()?1:700,'out');S.msg=S.cups<2?'Poured 250 ml. 1000 − 250 = 750 ml left.':'Poured 250 ml again. Read the jug.';speak(S.msg);A.redraw();keys();S.ok()}
function left(v){if(S.cups<2){A.sound.miss();S.msg='Pour both glasses first.';speak(S.msg);A.redraw();return}S.left=v;
 if(v===500){A.sound.pop();S.msg='1 litre is 1000 ml. 1000 − 250 − 250 = 500 ml.'}else{A.sound.miss();S.msg=v===998?'You took away 2, not 2 glasses of 250 ml. 1 litre is 1000 ml.':'That is after one glass. Two glasses are 500 ml.'}speak(S.msg);A.redraw();keys();S.ok()}
function hop(){if(S.hop>=3)return;S.hop++;A.sound.pop();const[a,b]=HOPS[S.hop-1];S.msg=`${a} to ${b} is ${b-a} cm.`;speak(S.msg);A.redraw();keys();S.ok()}
function grew(v){if(S.hop<3){A.sound.miss();S.msg='Hop all the way to 41 first.';speak(S.msg);A.redraw();return}S.grew=v;
 if(v===18){A.sound.pop();S.msg='It grew 18 cm. 41 − 23 = 18.'}else{A.sound.miss();S.msg=v===64?'64 adds the heights. How much it grew is the difference: take away.':'Add the hops: 7 + 10 + 1.'}speak(S.msg);A.redraw();keys();S.ok()}
function keys(){if(!row)return;row.innerHTML='';const k=phase(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},row,t).onclick=f};
 if(k==='mm'&&S.k<3)THINGS[S.k].opts.forEach(v=>b(v+' mm',()=>readMm(v),`The ${THINGS[S.k].n} is ${v} mm`));
 if(k==='join'){if(!S.joined)b('Join end to end',join,'Slide the red ribbon to start at 45 cm');else if(S.total!==83)[73,83,93].forEach(v=>b(v+' cm',()=>addLen(v)))}
 if(k==='metre'){if(!S.conv)b('1 m = 100 cm',convert,'Change 1 metre 30 centimetres to centimetres');else if(S.total!==215)[116,215,95].forEach(v=>b(v+' cm',()=>addRope(v)))}
 if(k==='scale'){[0,1].forEach(i=>{if(!S.bags.includes(i))b(i?'Add sugar 400 g':'Add flour 350 g',()=>putBag(i))});if(S.bags.length===2&&S.read!==750)[705,750,800].forEach(v=>b(v+' g',()=>readScale(v)))}
 if(k==='pour'){if(S.cups<2)b('Pour 250 ml',()=>pour(S.cups),'Pour 250 ml into the next glass');else if(S.left!==500)[998,750,500].forEach(v=>b(v+' ml',()=>left(v)))}
 if(k==='grow'){if(S.hop<3)b('Next hop',hop,'Hop to the next ten, then to 41');else if(S.grew!==18)[64,18,28].forEach(v=>b(v+' cm',()=>grew(v)))}}
let drag=false;
function down(p){const k=phase();
 if(k==='mm'){const y=A.H*.42;if(p.y>y-A.H*.16&&p.y<y+A.H*.14&&S.k<3){const v=Math.round((p.x-rx0())/(rx1()-rx0())*100),t=THINGS[S.k];if(Math.abs(v-t.mm)<=1)readMm(t.mm);else{S.mark=v;S.markOk=false;A.sound.miss();S.msg=`That mark is ${v} mm. Find where the ${t.n} ends.`;speak(S.msg);A.redraw()}return true}return false}
 if(k==='join'&&!S.joined){const y=A.H*.41;if(p.y>y-A.H*.04&&p.y<y+A.H*.1){drag=true;return true}return false}
 if(k==='metre'){if(within(p,{x:A.W*.18,y:A.H*.56,w:A.W*.64,h:A.H*.12})){convert();return true}return false}
 if(k==='scale'){if(within(p,{x:A.W*.04,y:A.H*.08,w:A.W*.24,h:A.H*.14})){putBag(0);return true}if(within(p,{x:A.W*.72,y:A.H*.08,w:A.W*.24,h:A.H*.14})){putBag(1);return true}return false}
 if(k==='pour'){const i=[0,1].find(j=>within(p,glass(j)));if(i!=null){pour(i);return true}return false}
 if(k==='grow'&&p.y>A.H*.3&&p.y<A.H*.7){hop();return true}return false}
function move(p){if(!drag)return;slide(Math.round((p.x-A.W*.06)/(A.W*.88)*100-19))}
function up(){if(!drag)return;drag=false;if(Math.abs(S.at-45)<=4)join();else{A.sound.miss();S.msg=S.at<45?'The ribbons overlap. Start the red one where the blue one ends.':'There is a gap. Push the red ribbon back to touch the blue one.';speak(S.msg);A.redraw()}}
const steps=[
{h:'Read millimetres',p:'Each centimetre has 10 small marks. Each small mark is 1 millimetre (mm). So 1 cm = 10 mm.',
 predict:{q:'A pencil ends 4 small marks after 7 cm. How long is it?',opts:['7 mm','74 mm','11 mm'],ans:1},
 task:'Read all 3 lengths in mm',show:()=>play(0,[()=>readMm(74),()=>readMm(52),()=>readMm(38)]),
 go:()=>{clear();speak('A pencil on a ruler from 0 to 10 cm.');keys();S.ok=passWhen(0,()=>S.k===3,'7 cm 4 mm is 74 mm, because each cm is 10 mm.')}},
{h:'Add lengths',p:'To add two lengths, put them end to end. Then add the numbers, keeping the same unit.',
 predict:{q:'45 cm + 38 cm. Which is right?',opts:['73 cm','83 cm','713 cm'],ans:1},
 task:'Join the ribbons, then pick the total',show:()=>play(1,[join,()=>addLen(83)]),
 go:()=>{clear();speak('A blue ribbon of 45 cm and a red ribbon of 38 cm.');keys();S.ok=passWhen(1,()=>S.total===83,'45 cm + 38 cm = 83 cm, and the joined ribbon ends at 83.')}},
{h:'Same unit first',p:'You can only add lengths in the same unit. Change metres to centimetres: 1 m = 100 cm.',
 predict:{q:'Jo adds 1 m 30 cm and 85 cm and gets 116 cm. What went wrong?',opts:['She added the 1 as 1 cm, not 100 cm','Nothing, it is right','She should take away'],ans:0},
 task:'Change to cm, then add',show:()=>play(2,[convert,()=>addRope(215)]),
 go:()=>{clear();speak('Rope A is 1 m 30 cm. Rope B is 85 cm.');keys();S.ok=passWhen(2,()=>S.total===215,'130 cm + 85 cm = 215 cm, which is 2 m 15 cm.')}},
{h:'Read the scale',p:'Put both bags on and read the needle. Work out what each small mark is worth first.',
 predict:{q:'The needle stops halfway between 700 and 800. What does it show?',opts:['705 g','750 g','800 g'],ans:1},
 task:'Put both bags on and read the mass',show:()=>play(3,[()=>putBag(0),()=>putBag(1),()=>readScale(750)]),
 go:()=>{clear();speak('A kitchen scale from 0 to 1000 g.');keys();S.ok=passWhen(3,()=>S.read===750,'350 g + 400 g = 750 g, and the scale agrees.')}},
{h:'Take away capacity',p:'A jug holds 1 litre of juice. 1 litre = 1000 ml. Pour 250 ml into each glass.',
 task:'Pour 2 glasses, then say what is left',show:()=>play(4,[()=>pour(0),()=>pour(1),()=>left(500)]),
 go:()=>{clear();speak('A full 1 litre jug and two empty glasses.');keys();S.ok=passWhen(4,()=>S.left===500,'1000 ml − 500 ml = 500 ml left, which is half a litre.')}},
{h:'How much longer?',p:'To find how much a plant grew, find the difference. Count on from the old height to the new one.',
 predict:{q:'A plant was 23 cm and is now 41 cm. How do you find how much it grew?',opts:['Add: 23 + 41','Find the difference: 41 − 23','Use the bigger number: 41'],ans:1},
 task:'Hop from 23 to 41, then pick how much it grew',show:()=>play(5,[hop,hop,hop,()=>grew(18)]),
 go:()=>{clear();speak('A number line from 20 to 45 cm.');keys();S.ok=passWhen(5,()=>S.grew===18,'7 + 10 + 1 = 18 cm, so 41 − 23 = 18.')}},
{h:'Challenge',p:'',go:()=>{clear();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.ok()});
const BANK=[['1 m + 40 cm = ? cm','140',[['41','unit'],['50','unit']]],['56 cm + 27 cm = ? cm','83',[['73','carry'],['29','sub']]],['1 kg − 300 g = ? g','700',[['97','kg'],['1300','add']]],
 ['3 cm 6 mm = ? mm','36',[['9','mm'],['306','mm']]],['A scale goes up in 50s. The needle is one mark after 400 g. Mass?','450 g',[['401 g','scale'],['500 g','scale']]],
 ['1 l − 400 ml = ? ml','600',[['996','kg'],['1400','add']]],['A plant grew from 15 cm to 32 cm. How much did it grow?','17 cm',[['47 cm','add'],['27 cm','carry']]]];
function why(tag){let m='Put both in the same unit, then calculate.';
 if(tag==='unit')m='The units are different. 1 m is 100 cm, so change it before you add.';
 if(tag==='carry')m='Check the ones: they made a new ten that you need to count.';
 if(tag==='kg')m='1 kg = 1000 g and 1 l = 1000 ml. Change to grams or millilitres first.';
 if(tag==='mm')m='1 cm = 10 mm. 3 cm is 30 mm, then add the extra mm.';
 if(tag==='scale')m='Work out what each small mark is worth before you read the scale.';
 if(tag==='add')m='This one is a take-away or a difference, not an add.';
 if(tag==='sub')m='This one asks for the total, so add.';
 return m}
function next(){turn++;const[q,ans,bad]=BANK[turn%BANK.length],opts=[[ans,'ok'],...bad],r=turn%3,order=opts.slice(r).concat(opts.slice(0,r));S.q=q;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=quiz.querySelector('.fl-pick');order.forEach(([v,tag])=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Answer '+v},box,v).onclick=()=>score(tag,ans)});speak('Challenge: '+q);A.redraw()}
function score(tag,ans){quiz.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=tag==='ok';ok?A.win():A.sound.miss();speak(ok?'Yes, '+ans+'.':why(tag));
 fb.innerHTML=(ok?`✓ Yes: ${ans}.`:'✗ '+why(tag))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:Q=>{quiz.hidden=Q.step!==6;row.hidden=Q.step===6;keys()},
 init:Q=>{const w=c.el('div',{class:'fl-below'},Q.below);row=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Measuring controls'},w);quiz=c.el('div',{class:'fl-chal'},Q.below);clear();A.gest({down,move,up});keys()}});
A.start()})})();
