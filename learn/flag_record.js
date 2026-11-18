/* Flagship: Recording Data (ages 5-7, NC KS1 working scientifically): choose a record, tally, table, label, answer. */
(()=>{
VIS.reg('flagrecord',c=>{let A,ctl,chal,qi=-1,run=0;const R={};
const INK='#0f172a',PAPER='#fffbeb',OK='#15803d',HI='#1d4ed8',WARN='#b91c1c';
const BIRDS=[{n:'Robin',body:'#92400e',chest:'#ef4444'},{n:'Sparrow',body:'#a16207',chest:'#fde68a'},{n:'Pigeon',body:'#64748b',chest:'#cbd5e1'}];
const VISITS=[0,1,0,2,0,1,0,1,2,0,1,2];   // robin 5, sparrow 4, pigeon 3 (last)
const HEIGHTS=[2,5,9],CARDS=[5,10,2,9];   // bean height (cm) on days 1-3
const PARTS=[{n:'shell',x:.5,y:.36,lx:.9,ly:.04,hint:'The shell is the hard, curly part on its back.'},{n:'feelers',x:.2,y:.3,lx:.1,ly:.02,hint:'Feelers are the long, thin parts on its head.'},{n:'foot',x:.62,y:.74,lx:.92,ly:1,hint:'The foot is the soft, flat part it slides on.'}];
const PICKS=[{q:'How many of each bird come to the feeder?',a:0},{q:'How tall is the bean plant each day?',a:1},{q:'What does the snail look like?',a:2}];
const WAYS=['Tally chart','Table','Labelled drawing'];
const S={pop:()=>A.sound.pop(),miss:()=>A.sound.miss(),tick:()=>A.sound.tick()},phase=()=>['pick','tally','table','label','answer','chal'][A.step];
const low=t=>t.toLowerCase(),lim=(v,a,b)=>v<a?a:v>b?b:v,line=()=>A.col.dark?'#e2e8f0':INK;
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t)}
/* dark words on a pale card: same contrast in both themes */
function card(txt,x,y,o={}){const g=A.ctx;let fs=o.fs||(A.narrow?15:18);do g.font=`700 ${fs}px system-ui`;while(g.measureText(txt).width>A.W-30&&--fs>9);g.textAlign='center';g.textBaseline='middle';
 const w=Math.max(o.w||0,g.measureText(txt).width+22),h=o.h||fs*1.8;x=lim(x,w/2+3,A.W-w/2-3);g.fillStyle=o.fill||PAPER;A.paint.rrect(x-w/2,y-h/2,w,h,10);g.fill();
 g.lineWidth=o.ring?3:1.5;g.strokeStyle=o.ring||'#a8a29e';g.stroke();g.fillStyle=INK;g.fillText(txt,x,y);return{x:x-w/2,y:y-h/2,w,h}}
function seg(a,b,x,y){const g=A.ctx;g.beginPath();g.moveTo(a,b);g.lineTo(x,y);g.stroke()}
function dot(x,y,r){const g=A.ctx;g.beginPath();g.arc(x,y,r,0,7);g.fill()}
function dotE(x,y,a,b,t){const g=A.ctx;g.beginPath();g.ellipse(x,y,a,b,t,0,7);g.fill()}
function box(r,f,s,w){const g=A.ctx;g.fillStyle=f;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=w;g.strokeStyle=s;g.stroke()}
function word(t,x,y,px,al){const g=A.ctx;g.fillStyle=INK;g.font=`800 ${px}px system-ui`;g.textAlign=al||'center';g.textBaseline='middle';g.fillText(t,x,y)}
/* tally gates: 4 upright, the 5th across */
function tally(n,x,y,h){const g=A.ctx,gap=h*.28;g.strokeStyle=INK;g.lineWidth=3;g.lineCap='round';let px=x;
 for(let i=0;i<n;i++){const k=i%5;if(k<4){seg(px+k*gap,y,px+k*gap,y+h)}else{seg(px-gap*.5,y+h*.8,px+gap*3.5,y+h*.2);px+=gap*5}}}
function bird(b,x,y,s){const g=A.ctx;g.fillStyle=b.body;dotE(x,y,s,s*.7,0);g.fillStyle=b.chest;dotE(x+s*.35,y+s*.15,s*.5,s*.45,0);
 g.fillStyle=b.body;dot(x+s*.8,y-s*.55,s*.42);g.fillStyle='#f59e0b';g.beginPath();g.moveTo(x+s*1.18,y-s*.62);g.lineTo(x+s*1.55,y-s*.5);g.lineTo(x+s*1.18,y-s*.4);g.fill();
 g.fillStyle='#fff';dot(x+s*.92,y-s*.65,s*.12);g.fillStyle='#000';dot(x+s*.95,y-s*.65,s*.06);
}
const wayBoxes=()=>{const n=A.narrow,w=n?A.W*.3:A.W*.27,h=n?A.H*.42:A.H*.5,gap=(A.W-3*w)/4;return[0,1,2].map(i=>({x:gap+i*(w+gap),y:A.H*.3,w,h}))};
const rows=()=>{const n=A.narrow,x=n?12:A.W*.4,w=A.W-x-12,y0=n?A.H*.42:A.H*.16,h=Math.min(n?A.H*.16:A.H*.2,80);return BIRDS.map((b,i)=>({x,y:y0+i*(h+8),w,h}))};
const numCards=()=>{const n=A.narrow,w=n?A.W*.2:72,h=Math.max(52,A.H*.12),x0=n?(A.W-4*w-30)/2:A.W*.42,y=A.H*.8;return CARDS.map((v,i)=>({x:x0+i*(w+10),y,w,h}))};
const at=(x,y)=>({x:A.W*(A.narrow?.1+.8*x:.2+.45*x),y:A.H*(A.narrow?.08+.55*y:.1+.6*y)}),spots=()=>PARTS.map(p=>at(p.x,p.y));
const tags=()=>{const n=A.narrow,w=n?A.W*.29:A.W*.2,h=Math.max(48,A.H*.1);return PARTS.map((p,i)=>n?{x:8+i*(w+(A.W-16-3*w)/2),y:A.H*.84,w,h}:{x:A.W*.74,y:A.H*.18+i*(h+14),w,h})};
const inside=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* step 1: choose a record */
function icon(i,r){const g=A.ctx,cx=r.x+r.w/2,cy=r.y+r.h*.42,s=Math.min(r.w,r.h)*.28;g.strokeStyle=INK;g.lineWidth=2;
 if(i===0)tally(5,cx-s*.6,cy-s*.6,s*1.2);
 if(i===1)for(let k=0;k<4;k++){seg(cx-s,cy-s+k*s*.66,cx+s,cy-s+k*s*.66);if(k<3)seg(cx-s+k*s,cy-s,cx-s+k*s,cy+s)}
 if(i===2){g.beginPath();g.arc(cx,cy,s*.6,0,7);g.stroke();seg(cx+s*.4,cy-s*.4,cx+s,cy-s);g.font='600 12px system-ui';g.fillStyle=INK;g.fillText('shell',cx+s,cy-s-8)}}
function drawPick(){const P=PICKS[Math.min(R.round,2)];card(R.round>2?'All three matched!':`${R.round+1} of 3: ${P.q}`,A.W/2,A.H*.12,{fs:A.narrow?13:17,ring:HI});
 wayBoxes().forEach((r,i)=>{const g=A.ctx;box(r,R.miss===i?'#fee2e2':PAPER,R.miss===i?WARN:'#78716c',2);icon(i,r);
  const [a,b]=WAYS[i].split(' '),f=A.narrow?12:16;word(a,r.x+r.w/2,r.y+r.h*.8,f);if(b)word(b,r.x+r.w/2,r.y+r.h*.8+18,f)})}
const PICKWHY=[[null,'A table suits numbers you measure. Birds come fast: a tally adds one mark per bird.','A drawing shows what a bird looks like, not how many came. Tally marks count them.'],
 ['Tally marks count things. Height is measured in cm: write it in a table, a row per day.',null,'A drawing shows the shape, not the height each day. A table keeps the numbers in order.'],
 ['One snail: nothing to count. Draw it and label its parts.','A table holds numbers. To show how it looks, draw it and add labels.',null]];
function pickWay(i){if(R.round>2)return;const P=PICKS[R.round];if(i===P.a){R.round++;R.miss=null;S.pop();return after(`Yes, a ${low(WAYS[i])}.`+(R.round>2?' Each question gets the record that answers it.':''))}
 R.miss=i;S.miss();after(PICKWHY[R.round][i])}
/* step 2: tally birds */
const counts=()=>BIRDS.map((b,i)=>VISITS.slice(0,R.seen).filter(v=>v===i).length);
function drawChart(full){const g=A.ctx,cn=full?[5,4,3]:counts();rows().forEach((r,i)=>{box(r,R.flash===i?'#fee2e2':R.sel===i?'#dbeafe':PAPER,R.sel===i?HI:'#78716c',R.sel===i?3:1.5);
 word(BIRDS[i].n,r.x+12,r.y+r.h/2,A.narrow?15:17,'left');
 g.strokeStyle='#a8a29e';g.lineWidth=1.5;seg(r.x+r.w*.36,r.y+6,r.x+r.w*.36,r.y+r.h-6);tally(cn[i],r.x+r.w*.42,r.y+r.h*.22,r.h*.56)})}
function drawTally(){const n=A.narrow,bx=n?A.W*.4:A.W*.18,by=n?A.H*.24:A.H*.5;
 if(R.seen<VISITS.length){bird(BIRDS[VISITS[R.seen]],bx,by,n?A.W*.07:A.W*.05);card(BIRDS[VISITS[R.seen]].n+' lands!',bx+(n?A.W*.3:0),n?by:by+A.H*.2,{fs:15})}
 card(`Bird ${Math.min(R.seen+1,12)} of 12`,n?A.W/2:A.W*.18,A.H*.07,{fs:14});drawChart(false)}
function mark(i){if(R.seen>=VISITS.length)return;const want=VISITS[R.seen];
 if(i!==want){R.flash=i;S.miss();return after(`That was a ${low(BIRDS[want].n)}, not a ${low(BIRDS[i].n)}. Put the mark in the ${low(BIRDS[want].n)} row.`)}
 R.flash=null;R.seen++;S.tick();const cn=counts();
 after(R.seen<VISITS.length?`One mark for ${low(BIRDS[i].n)}. ${BIRDS[i].n}: ${cn[i]}.`+(cn[i]===5?' That is a gate: 4 marks and 1 across.':''):'All 12 birds tallied: robin 5, sparrow 4, pigeon 3.')}
/* step 3: table of heights */
function drawTable(){const g=A.ctx,n=A.narrow,d=Math.min(R.day,2),rx=n?A.W*.18:A.W*.16,base=n?A.H*.7:A.H*.86,cm=(n?A.H*.5:A.H*.66)/10;
 g.fillStyle='#c2410c';g.fillRect(rx-50,base,56,n?20:26);g.strokeStyle=line();g.lineWidth=2;seg(rx+18,base,rx+18,base-10*cm);   // pot and ruler
 g.font='700 12px system-ui';g.textAlign='left';g.textBaseline='middle';for(let k=0;k<=10;k++){seg(rx+18,base-k*cm,rx+(k%5?26:32),base-k*cm);g.fillStyle=line();g.fillText(k,rx+36,base-k*cm)}
 if(R.day<3){const top=base-HEIGHTS[d]*cm;g.strokeStyle='#15803d';g.lineWidth=5;seg(rx-22,base,rx-22,top);g.fillStyle='#22c55e';dotE(rx-12,top+6,12,6,-.5);
  g.setLineDash([4,4]);g.strokeStyle=line();g.lineWidth=1.5;seg(rx-22,top,rx+18,top);g.setLineDash([])}
 card(R.day<3?`Day ${R.day+1}: how tall is the bean?`:'The table keeps all 3 days',n?A.W/2:A.W*.62,A.H*.07,{fs:n?14:16,ring:HI});
 const tx=n?A.W*.48:A.W*.42,tw=A.W-tx-12,th=n?A.H*.1:A.H*.12,ty=A.H*.16;['Day','Height (cm)'].forEach((s,k)=>card(s,tx+tw*(k?.68:.18),ty+th/2,{w:tw*(k?.6:.34),h:th-6,fs:13,fill:'#e7e5e4'}));
 for(let k=0;k<3;k++){const y=ty+(k+1)*th+th/2,cur=k===R.day;card(`Day ${k+1}`,tx+tw*.18,y,{w:tw*.34,h:th-6,fs:14});card(R.vals[k]==null?(cur?'?':''):`${R.vals[k]}`,tx+tw*.68,y,{w:tw*.6,h:th-6,fs:16,ring:cur?HI:null,fill:R.vals[k]!=null?'#dcfce7':PAPER})}
 if(R.day<3)numCards().forEach((r,i)=>{box(r,R.wrong===i?'#fee2e2':PAPER,'#57534e',2);word(CARDS[i],r.x+r.w/2,r.y+r.h/2,22)})}
function write(i){if(R.day>2)return;const v=CARDS[i],want=HEIGHTS[R.day];
 if(v!==want){R.wrong=i;S.miss();return after(v===10?'10 is the top of the ruler, not of the plant. Follow the dashed line.':HEIGHTS.indexOf(v)<R.day&&HEIGHTS.indexOf(v)>=0?`${v} cm was an earlier day. The plant is taller now.`:`Not ${v}. Follow the dashed line from the plant top to the ruler.`)}
 R.vals[R.day]=v;R.wrong=null;R.day++;S.pop();after(R.day<3?`Day ${R.day}: ${v} cm, written in the table. Next day.`:'Day 1: 2 cm, day 2: 5 cm, day 3: 9 cm. The plant from day 1 has gone, but the table still shows it grew 7 cm.')}
/* step 4: label a snail */
function snail(){const g=A.ctx,S=spots(),u=A.narrow?A.W/9:A.W/16,[sh,fe,ft]=S;g.fillStyle='#fde68a';g.strokeStyle=INK;g.lineWidth=2;
 dotE(ft.x-u*.6,ft.y-u*.3,u*2.6,u*.55,0);g.stroke();dot(ft.x-u*2.9,ft.y-u*.7,u*.6);g.stroke();   // foot, body and head
 g.fillStyle='#d97706';dot(sh.x,sh.y+u*.4,u*1.5);g.stroke();g.beginPath();for(let a=0;a<12;a+=.2){const r=u*1.4*(1-a/13);g.lineTo(sh.x+r*Math.cos(a),sh.y+u*.4+r*Math.sin(a))}g.stroke();
 g.lineWidth=3;g.strokeStyle=line();seg(ft.x-u*3.1,ft.y-u*1.1,fe.x,fe.y);seg(ft.x-u*2.7,ft.y-u*1.2,fe.x+u*.6,fe.y-u*.2);g.fillStyle=line();dot(fe.x+u*.6,fe.y-u*.2,4)}
function drawLabel(){snail();const g=A.ctx;spots().forEach((s,i)=>{const got=R.put[i];g.fillStyle=got!=null?OK:HI;dot(s.x,s.y,10);
 if(got!=null){const L=at(PARTS[got].lx,PARTS[got].ly),tx=lim(L.x,50,A.W-50),ty=L.y;g.strokeStyle=line();g.lineWidth=2;seg(s.x,s.y,tx,ty);card(PARTS[got].n,tx,ty,{fs:15,ring:OK})}
 else card(String(i+1),s.x,s.y,{fs:12,h:22,fill:'#dbeafe',ring:HI})});
 tags().forEach((r,i)=>{if(R.put.indexOf(i)>=0)return;const d=R.drag&&R.drag.i===i?R.drag:null,x=d?d.x-r.w/2:r.x,y=d?d.y-r.h/2:r.y;box({x,y,w:r.w,h:r.h},R.pick===i?'#dbeafe':PAPER,R.pick===i?HI:'#57534e',R.pick===i?3:2);
  word(PARTS[i].n,x+r.w/2,y+r.h/2,17)})}
function choose(i){if(R.put.indexOf(i)>=0)return;R.pick=i;S.tick();after(`Picked "${PARTS[i].n}". Now tap the spot it names.`)}
function place(s){if(R.pick==null)return after('Pick a label first.');const i=R.pick;if(R.put[s]!=null)return after(`Spot ${s+1} has a label.`);
 if(s!==i){S.miss();R.pick=null;return after(`Not spot ${s+1}. ${PARTS[i].hint}`)}
 R.put[s]=i;R.pick=null;S.pop();const left=R.put.filter(v=>v==null).length;after(left?`"${PARTS[i].n}" labelled. Its line points to the part.`:'All three parts labelled: shell, feelers and foot.')}
/* step 5: answer from the record */
const ASK=[{q:'Which bird came the most?',a:0,why:['','Sparrow has 4 marks. Robin has a full gate: 5.','The pigeon is the biggest bird and came last, but it has only 3 marks.']},
 {q:'Which bird came the least?',a:2,why:['Robin has the most marks, 5. Look for the shortest row.','Sparrow has 4. Pigeon has only 3.','']}];
function drawAnswer(){card(R.ask<2?ASK[R.ask].q:'The tally chart answered both questions.',A.narrow?A.W/2:A.W*.2,A.H*.08,{fs:A.narrow?14:16,ring:HI});
 drawChart(true)}
function answer(i){if(R.ask>1)return;const Q=ASK[R.ask];R.sel=i;if(i!==Q.a){R.flash=i;S.miss();return after(Q.why[i])}
 R.flash=null;R.ask++;S.pop();after(R.ask<2?'Yes, robin: 5 marks, the longest row.':'Yes, pigeon: 3 marks. Robin came most, pigeon least.')}
function draw(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#ecfccb',A.col.dark?.05:.45);g.fillRect(0,0,A.W,A.H);const k=phase();
 if(k==='chal'){card('Challenge',A.W/2,A.H*.12,{ring:HI});const Q=CQ[qi%CQ.length];if(Q&&Q.t)tally(Q.t,A.W/2-50,A.H*.38,A.H*.2);else if(Q)card(Q.pic,A.W/2,A.H*.5,{fs:A.narrow?16:20});return}
 ({pick:drawPick,tally:drawTally,table:drawTable,label:drawLabel,answer:drawAnswer})[k]()}
function reset(){run++;for(const k in R)delete R[k];Object.assign(R,{round:0,seen:0,day:0,vals:[null,null,null],put:[null,null,null],ask:0,check:()=>{}})}
function after(msg){tell(msg);A.redraw();pad();R.check()}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function open(i,say,ok,msg){reset();tell(say);pad();R.check=finish(i,ok,msg)}
function demo(i,acts,ms){steps[i].go();const me=run;acts.forEach((f,j)=>setTimeout(()=>{if(me===run)f()},A.reduced()?20*(j+1):(ms||300)*(j+1)))}
function pad(){if(!ctl)return;ctl.innerHTML='';const k=phase(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(k==='pick'&&R.round<3)WAYS.forEach((w,i)=>B(w,()=>pickWay(i),'Record with a '+low(w)));
 if(k==='tally')BIRDS.forEach((b,i)=>B('+ '+b.n,()=>mark(i),'Add a tally mark for '+low(b.n)));
 if(k==='table'&&R.day<3)CARDS.forEach((v,i)=>B(v+' cm',()=>write(i),`Write ${v} cm for day ${R.day+1}`));
 if(k==='label'){PARTS.forEach((p,i)=>{if(R.put.indexOf(i)<0)B(p.n,()=>choose(i),'Pick the label '+p.n)});R.put.forEach((v,s)=>{if(v==null)B('Spot '+(s+1),()=>place(s),'Put the label on spot '+(s+1))})}
 if(k==='answer'&&R.ask<2)BIRDS.forEach((b,i)=>B(b.n,()=>answer(i),'Answer '+b.n))}
function down(p){const k=phase(),hit=L=>L.findIndex(r=>inside(p,r));
 const T={pick:[wayBoxes,pickWay],tally:[rows,mark],answer:[rows,answer],table:[numCards,write]}[k];if(T){const i=hit(T[0]());if(i>=0)T[1](i)}
 if(k==='label'){const s=spots().findIndex(q=>Math.hypot(q.x-p.x,q.y-p.y)<30);if(s>=0){place(s);return false}const i=tags().findIndex((r,j)=>R.put.indexOf(j)<0&&inside(p,r));
  if(i>=0){R.pick=i;R.drag={i,x:p.x,y:p.y};A.redraw();return true}}return false}
function move(p){if(R.drag){R.drag.x=p.x;R.drag.y=p.y;A.redraw()}}
function up(p){const d=R.drag;R.drag=null;if(!d)return;const s=spots().findIndex(q=>Math.hypot(q.x-d.x,q.y-d.y)<40);if(s>=0)place(s);else choose(d.i)}
const steps=[
{h:'Pick a way to record',p:'Scientists write things down as they find them out. Which record fits each question? Tap a card.',
 predict:{q:'To count birds as they land, the best record is…',opts:['a drawing of each bird','a tally chart','just remember'],ans:1},task:'Match all 3 questions',
 show:()=>demo(0,[()=>pickWay(0),()=>pickWay(1),()=>pickWay(2)],500),
 go:()=>open(0,'Three record cards: tally chart, table and labelled drawing.',()=>R.round>2,'Count with a tally, measure into a table, draw what it looks like.')},
{h:'Tally as they land',p:'Birds land one at a time. Tap the row for each bird to add one mark. The fifth mark goes across, like a gate.',
 predict:{q:'How do you show 5 with tally marks?',opts:['5 lines in a row','4 lines and 1 across','write 5'],ans:1},task:'Tally all 12 birds',
 show:()=>demo(1,VISITS.map(v=>()=>mark(v)),180),
 go:()=>open(1,'A bird table and an empty tally chart: robin, sparrow, pigeon.',()=>R.seen>=VISITS.length,'Gates of 5 make the marks quick to count.')},
{h:'Fill in the table',p:'A bean plant grows next to a ruler. Each day, read its height and tap the number to write it in the table.',task:'Fill in all 3 days',
 show:()=>demo(2,[()=>write(2),()=>write(0),()=>write(3)],500),
 go:()=>open(2,'A bean plant by a 0 to 10 cm ruler, and a table for days 1, 2 and 3.',()=>R.day>2,'One row for each day, so the days can be compared.')},
{h:'Label the drawing',p:'We found a snail. Drag each label to its spot, or tap a label then tap the spot.',
 predict:{q:'A good science drawing has…',opts:['lots of colours','labels that name the parts','no words at all'],ans:1},task:'Label all 3 parts',
 show:()=>demo(3,[()=>choose(0),()=>place(0),()=>choose(1),()=>place(1),()=>choose(2),()=>place(2)],300),
 go:()=>open(3,'A snail drawing with 3 numbered spots. Labels: shell, feelers, foot.',()=>R.put.every(v=>v!=null),'Labels with lines show exactly which part is which.')},
{h:'Answer the question',p:'Our question was: which bird comes to the feeder the most? Use the tally chart to answer. Tap a row.',
 predict:{q:'Which bird came the most?',opts:['the pigeon: it is the biggest','count the marks to find out','the bird that came last'],ans:1},task:'Answer both questions',
 show:()=>demo(4,[()=>answer(0),()=>answer(2)],500),
 go:()=>open(4,'The tally chart: robin 5, sparrow 4, pigeon 3.',()=>R.ask>1,'The record, not a guess, answers the question.')},
{h:'Challenge',p:'',go:()=>{reset();nextQ()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>R.check()});
const CQ=[
 {pic:'cars going past',q:'You want to count the cars that go past school. Which record is best?',ans:'a tally chart',bad:[['one drawing of a car','draw'],['just remember them','mem']]},
 {t:7,q:'How many do these tally marks show?',ans:'7',bad:[['6','gate4'],['3','gate1']]},
 {pic:'Day 1: 3 cm   Day 2: 6 cm',q:'Where do you write the height for day 2?',ans:'in the day 2 row of the table',bad:[['in the day 1 row','row'],['anywhere on the page','any']]},
 {pic:'a new beetle',q:'How can you record what the beetle looks like?',ans:'draw it and label its parts',bad:[['make a tally','count'],['write one number','num']]},
 {pic:'cat 3   dog 6   fish 2',q:'A tally of pets. Which pet do most children have?',ans:'dog',bad:[['cat: it came first','first'],['fish: it came last','last']]},
 {pic:'notebook and pencil',q:'Why write data down as you go?',ans:'so you do not forget and can answer the question',bad:[['to fill the page','fill'],['it does not matter when','later']]}];
function why(t){let m='Look at what the question asks, then check the record.';
 if(t==='draw')m='One drawing shows what a car looks like, not how many went past. Make a tally mark for each car.';
 if(t==='mem')m='Cars go past fast and you will forget. A tally chart keeps the count.';
 if(t==='gate4')m='The gate is 5 marks: 4 upright and 1 across. 5 and 2 more is 7.';
 if(t==='gate1')m='The line across is a mark too, so the gate is 5, not 1. 5 and 2 more is 7.';
 if(t==='row')m='Each day has its own row. Day 2 goes in the day 2 row, or the days get mixed up.';
 if(t==='any')m='Numbers dotted about a page are hard to compare. A table gives each day a row.';
 if(t==='count')m='There is only one beetle, so a tally has nothing to count. A labelled drawing shows its parts.';
 if(t==='num')m='One number cannot show legs, wings or colour. Draw it and add labels.';
 if(t==='first')m='Coming first does not make it the most. Dog has 6, the most.';
 if(t==='last')m='Fish has only 2. Look for the biggest count: dog, 6.';
 if(t==='fill')m='A record is not to fill space. It helps you remember what you saw and answer the question.';
 if(t==='later')m='If you wait, you forget or mix things up. Write each thing down as soon as you see it.';
 return m}
function nextQ(){qi++;const Q=CQ[qi%CQ.length],o=[[Q.ans,'ok'],...Q.bad],r=qi%3,ord=o.slice(r).concat(o.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Answer: '+v},row,v).onclick=()=>judge(t,Q.ans)});tell('Challenge: '+Q.q);A.redraw()}
function judge(t,ans){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else S.miss();tell(ok?'Yes: '+ans+'.':why(t));
 fb.innerHTML=(ok?`✓ Yes: ${ans}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=nextQ}
A=FK.shell(c,{steps,ratio:.6,tall:1.05,draw,onStep:Q=>{chal.hidden=Q.step!==5;ctl.hidden=Q.step===5;pad()},
 init:Q=>{const w=c.el('div',{class:'fl-below'},Q.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Record controls'},w);chal=c.el('div',{class:'fl-chal'},Q.below);reset();A.gest({down,move,up});pad()}});
A.start()})})();
