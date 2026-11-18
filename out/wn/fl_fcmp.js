/* Flagship: comparing fractions (ages 7-8). Cut one bar into more and more equal parts and watch the unit fraction
   shrink, order unit fractions from biggest, shade two fractions with the same denominator and pick the bigger, place
   < or > between two fractions, and lay one pizza slice on another to see that only same-size wholes can be compared. */
(()=>{
const CUTS=[2,3,4,5,6,8,10,12];
const DEAL=[3,5,2,4];
const SAME=[{a:2,b:4,d:5},{a:5,b:3,d:8}];
const NAME={5:'fifths',8:'eighths'};
const SIGNS=[{l:[1,3],r:[1,6]},{l:[3,7],r:[5,7]},{l:[1,4],r:[1,2]}];
const PIES=[{a:[1,2,.45],b:[1,4,1],note:"Leo's quarter is more pizza. His whole pizza is much bigger."},{a:[1,2,1],b:[1,4,1],note:'Same size pizzas: now one half is more than one quarter.'}];
VIS.reg('flagfcmp',c=>{let A,bar,box,qi=-1,run=0;const F={};
const stage=()=>['cut','order','same','sign','pizza','chal'][A.step];
const sfx=k=>A.sound[k](),draw=()=>A.redraw(),sync=()=>{draw();buttons()};
function speak(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
const purple=()=>A.col.dark?'#a78bfa':'#7c3aed',teal=()=>A.col.dark?'#5eead4':'#0f766e';
function label(t,x,y,px,ink,maxW){const g=A.ctx,s=Math.round(px*(A.narrow?1:1.12));g.font=`800 ${s}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=ink||A.col.tx;g.fillText(t,x,y,maxW||A.W-20)}
/* stacked fraction n over d */
function frac(n,d,x,y,px,ink){const g=A.ctx,s=Math.round(px*(A.narrow?1:1.12));g.font=`800 ${s}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=ink||A.col.tx;
 g.fillText(String(n),x,y-s*.62);g.fillText(String(d),x,y+s*.62);const w=Math.max(g.measureText(String(n)).width,g.measureText(String(d)).width)+6;g.fillRect(x-w/2,y-1.2,w,2.4)}
/* a bar cut into d equal parts with the first k parts shaded */
function strip(x,y,w,h,d,k,col){const g=A.ctx,C=A.col;g.fillStyle=C.dark?'#0f172a':'#ffffff';g.fillRect(x,y,w,h);g.fillStyle=col||purple();g.fillRect(x,y,w*k/d,h);
 g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(x,y,w,h);g.lineWidth=1.5;for(let i=1;i<d;i++){g.beginPath();g.moveTo(x+w*i/d,y);g.lineTo(x+w*i/d,y+h);g.stroke()}}
function tile(r,fill){const g=A.ctx;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fillStyle=fill;g.fill();g.lineWidth=2;g.strokeStyle=A.col.tx;g.stroke()}
const inside=(p,r)=>r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function paint(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.05:.3);g.fillRect(0,0,W,H);({cut:dCut,order:dOrder,same:dSame,sign:dSign,pizza:dPizza,chal:dChal})[stage()](g,W,H,C);A.fx.draw(g)}
/* ---- 1: cut the same whole into more parts ---- */
const BX=()=>({x:A.W*.06,w:A.W*.88});
const track=()=>({x0:A.W*.1,x1:A.W*.9,y:A.H*.86});
function dCut(g,W,H,C){const{x,w}=BX(),d=F.d;label(`One whole cut into ${d} equal parts`,W/2,H*.06,14);strip(x,H*.11,w,H*.11,d,1);frac(1,d,x+w/(2*d),H*.29,15);
 const seen=CUTS.filter(n=>F.seen[n]),rowH=Math.min(24,(H*.42)/CUTS.length);seen.forEach((n,i)=>{const y=H*.4+i*rowH;g.fillStyle=n===d?purple():A.alpha(purple(),.45);g.fillRect(x,y,w/n,rowH-4);g.fillStyle=C.tx;g.font=`700 ${A.narrow?11:12}px system-ui,sans-serif`;g.textAlign='left';g.textBaseline='middle';g.fillText(`1/${n}`,x+w/n+6,y+rowH/2-2)});
 if(!seen.length)label('Your parts will line up here.',W/2,H*.5,13,C.tx);const T=track();g.strokeStyle=C.mu;g.lineWidth=6;g.lineCap='round';g.beginPath();g.moveTo(T.x0,T.y);g.lineTo(T.x1,T.y);g.stroke();
 const hx=T.x0+(T.x1-T.x0)*CUTS.indexOf(d)/(CUTS.length-1);g.fillStyle=purple();g.beginPath();g.arc(hx,T.y,16,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();label('fewer parts',T.x0+30,T.y-26,11,C.tx);label('more parts',T.x1-30,T.y-26,11,C.tx)}
function setCut(i){if(stage()!=='cut')return;i=Math.max(0,Math.min(CUTS.length-1,i));const d=CUTS[i];if(d===F.d&&F.seen[d])return;const more=d>F.d;F.d=d;F.seen[d]=1;sfx('tick');
 speak(`Cut into ${d} equal parts. One part is 1/${d}.${more?' More parts, so each part is smaller.':' Fewer parts, so each part is bigger.'}`);sync();F.want()}
const cutsDone=()=>CUTS.filter(n=>F.seen[n]).length>=5&&F.seen[2]&&(F.seen[8]||F.seen[10]||F.seen[12]);
/* ---- 2: order unit fractions ---- */
const cardAt=i=>{const w=(A.W-50)/4;return{x:10+i*(w+10),y:A.H*.08,w,h:A.H*.2}};
function dOrder(g,W,H,C){DEAL.forEach((d,i)=>{if(F.put.includes(d))return;const r=cardAt(i);tile(r,F.oops===d?A.alpha(C.rd,.25):A.alpha(purple(),.14));frac(1,d,r.x+r.w/2,r.y+r.h/2,18)});
 const{x,w}=BX(),rh=H*.12;label(F.put.length<4?'Tap the biggest one left.':'Biggest to smallest: 1/2, 1/3, 1/4, 1/5',W/2,H*.34,14);
 [0,1,2,3].forEach(i=>{const y=H*.41+i*(rh+6);g.strokeStyle=C.mu;g.setLineDash([5,4]);g.strokeRect(x,y,w,rh);g.setLineDash([]);const d=F.put[i];if(d){strip(x,y,w,rh,d,1);g.fillStyle=C.tx;frac(1,d,x+w-26,y+rh/2,12)}else label(i?'next':'biggest',x+w/2,y+rh/2,12,C.tx)})}
function pickCard(d){if(stage()!=='order'||F.put.includes(d))return;const want=Math.min(...DEAL.filter(n=>!F.put.includes(n)));
 if(d===want){F.put.push(d);sfx('pop');speak(F.put.length<4?`Yes. 1/${d} is the biggest left.`:'Done! More equal parts means smaller parts.');sync();return F.want()}
 F.oops=d;setTimeout(()=>{F.oops=null;draw()},A.reduced()?10:800);sfx('miss');speak(`1/${d} is smaller than 1/${want}. Cutting into ${d} parts makes smaller parts than cutting into ${want}.`);draw()}
/* ---- 3: same denominator ---- */
const rowAt=k=>({x:A.W*.06,y:A.H*(k?.42:.2),w:A.W*.7,h:A.H*.12});
const padAt=i=>{const w=(A.W-40)/3;return{x:10+i*(w+10),y:A.H*.72,w,h:Math.min(A.H*.18,74)}};
function dSame(g,W,H,C){if(F.r>=SAME.length){label('Same denominator: more parts means bigger.',W/2,H*.45,15);return}const R=SAME[F.r];
 [[R.a,0],[R.b,1]].forEach(([n,k])=>{const r=rowAt(k);label(`Shade ${n}/${R.d}`,r.x+r.w/2,r.y-14,13);strip(r.x,r.y,r.w,r.h,R.d,F.sh[k],k?teal():purple());frac(F.sh[k],R.d,r.x+r.w+W*.1,r.y+r.h/2,15,F.sh[k]===n?C.gr:C.tx)});
 if(ready())[[R.a,'a'],[R.b,'b'],['same','s']].forEach(([n,t],i)=>{const b=padAt(i);tile(b,F.oops===i?A.alpha(C.rd,.25):F.ok&&n===Math.max(R.a,R.b)?A.alpha(C.gr,.3):A.alpha(C.cy,.12));t==='s'?label('Same',b.x+b.w/2,b.y+b.h/2,16):frac(n,R.d,b.x+b.w/2,b.y+b.h/2,15)});
 else label('Tap the parts to shade them.',W/2,H*.8,13)}
const ready=()=>F.r<SAME.length&&F.sh[0]===SAME[F.r].a&&F.sh[1]===SAME[F.r].b;
function shade(k,i){if(stage()!=='same'||F.r>=SAME.length||F.ok)return;F.sh[k]=F.sh[k]===i+1?i:i+1;sfx('tick');const R=SAME[F.r];speak(`${F.sh[k]}/${R.d} shaded.${ready()?' Now: which is bigger?':''}`);sync()}
function fill(k){const R=SAME[F.r];if(F.r<SAME.length)shade(k,(k?R.b:R.a)-1)}
function choose(i){if(stage()!=='same'||!ready()||F.ok)return;const R=SAME[F.r],big=R.a>R.b?0:1;
 if(i===big){F.ok=1;sfx('pop');speak(`Yes. Both are ${NAME[R.d]} of the same whole, so ${Math.max(R.a,R.b)}/${R.d} has more parts and is bigger.`);return sync()}
 F.oops=i;setTimeout(()=>{F.oops=null;draw()},A.reduced()?10:800);sfx('miss');
 speak(i===2?`Not the same. The parts are the same size, but ${Math.max(R.a,R.b)} parts is more than ${Math.min(R.a,R.b)} parts.`:`Look at the bars. ${Math.min(R.a,R.b)} parts is less than ${Math.max(R.a,R.b)} parts of the same size.`);draw()}
/* ---- 4: < or > ---- */
const gapAt=()=>({x:A.W*.4,y:A.H*.14,w:A.W*.2,h:A.H*.22});
function dSign(g,W,H,C){if(F.r>=SIGNS.length){label('The open side faces the bigger fraction.',W/2,H*.45,15);return}const Q=SIGNS[F.r],G=gapAt();
 frac(Q.l[0],Q.l[1],W*.2,H*.25,26);frac(Q.r[0],Q.r[1],W*.8,H*.25,26);tile(G,F.ok?A.alpha(C.gr,.25):F.oops?A.alpha(C.rd,.22):A.alpha(C.cy,.12));label(F.sign||'?',G.x+G.w/2,G.y+G.h/2,34);
 label(F.ok?'Yes!':'Tap the box to change the sign, then Check.',W/2,H*.44,13);if(F.ok||F.oops){strip(W*.06,H*.54,W*.88,H*.12,Q.l[1],Q.l[0]);strip(W*.06,H*.72,W*.88,H*.12,Q.r[1],Q.r[0],teal());
  label(`${Q.l[0]}/${Q.l[1]}`,W*.1,H*.51,12);label(`${Q.r[0]}/${Q.r[1]}`,W*.1,H*.69,12)}}
const truth=Q=>{const a=Q.l[0]/Q.l[1],b=Q.r[0]/Q.r[1];return a>b?'>':a<b?'<':'='};
function cycle(){if(stage()!=='sign'||F.ok||F.r>=SIGNS.length)return;const o=['<','>','='];F.sign=o[(o.indexOf(F.sign)+1)%3];F.oops=0;sfx('tick');speak(`The sign is ${F.sign}.`);sync()}
function setSign(s){if(stage()!=='sign'||F.ok)return;F.sign=s;F.oops=0;sync()}
function checkSign(){if(stage()!=='sign'||F.ok||!F.sign||F.r>=SIGNS.length)return;const Q=SIGNS[F.r],t=truth(Q),L=`${Q.l[0]}/${Q.l[1]}`,R=`${Q.r[0]}/${Q.r[1]}`;
 if(F.sign===t){F.ok=1;sfx('pop');speak(`Yes: ${L} ${t} ${R}. The open side faces the bigger fraction.`);return sync()}F.oops=1;sfx('miss');
 const big=t==='>'?L:R;speak(F.sign==='='?`They are not equal. Look at the bars: ${big} is bigger.`:Q.l[1]===Q.r[1]?`Same denominator, so count the parts: ${big} has more. The open side faces ${big}.`:`${big} is bigger: fewer equal parts means bigger parts. Turn the sign so it opens towards ${big}.`);sync()}
/* ---- 5: same whole? ---- */
const pieAt=k=>({x:A.W*(k?.7:.27),y:A.H*.42,R:Math.min(A.W*.2,A.H*.28)});
function slice(x,y,r,n,d,col,a){const g=A.ctx;g.globalAlpha=a||1;g.fillStyle=col;g.beginPath();g.moveTo(x,y);g.arc(x,y,r,-Math.PI/2,-Math.PI/2+2*Math.PI*n/d);g.closePath();g.fill();g.globalAlpha=1}
function pie(x,y,r,n,d,col){const g=A.ctx,C=A.col;g.fillStyle=C.dark?'#78350f':'#fde68a';g.beginPath();g.arc(x,y,r,0,7);g.fill();slice(x,y,r,n,d,col);g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.arc(x,y,r,0,7);g.stroke();
 for(let i=0;i<d;i++){const t=-Math.PI/2+2*Math.PI*i/d;g.beginPath();g.moveTo(x,y);g.lineTo(x+r*Math.cos(t),y+r*Math.sin(t));g.stroke()}}
function dPizza(g,W,H,C){if(F.r>=PIES.length){label('Compare fractions of the same whole.',W/2,H*.45,15);return}const P=PIES[F.r],a=pieAt(0),b=pieAt(1),ra=a.R*P.a[2],rb=b.R*P.b[2];
 pie(a.x,a.y,ra,P.a[0],P.a[1],purple());pie(b.x,b.y,rb,P.b[0],P.b[1],teal());label('Mia: 1/2',a.x,a.y+a.R+18,13);label('Leo: 1/4',b.x,b.y+b.R+18,13);
 if(F.lift)slice(F.lx,F.ly,ra,P.a[0],P.a[1],purple(),.75);label(F.ok?P.note:'Drag Mia\'s slice onto Leo\'s slice.',W/2,H*.07,13,C.tx,W-16)}
function lay(){if(stage()!=='pizza'||F.ok||F.r>=PIES.length)return;const b=pieAt(1);F.lift=1;F.lx=b.x;F.ly=b.y;F.ok=1;sfx('pop');speak(PIES[F.r].note);sync();F.want()}
function nextPie(){if(stage()!=='pizza'||!F.ok)return;F.r++;F.ok=0;F.lift=0;sfx('step');if(F.r<PIES.length)speak('Now both pizzas are the same size. Compare again.');sync();F.want()}
function dChal(g,W,H,C){const{x,w}=BX();[3,4,6].forEach((d,i)=>{strip(x,H*(.2+i*.22),w,H*.13,d,1);label(`1/${d}`,x+w/d+24,H*(.2+i*.22)+H*.065,13)});label('More equal parts, smaller parts.',W/2,H*.9,14)}
function onward(){const v=stage();if(v==='same'&&F.ok){F.r++;F.ok=0;F.sh=[0,0];sfx('step');sync();return F.want()}if(v==='sign'&&F.ok){F.r++;F.ok=0;F.oops=0;F.sign=null;sfx('step');sync();return F.want()}if(v==='pizza')nextPie()}
function buttons(){if(!bar)return;bar.innerHTML='';const v=stage(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},bar,t).onclick=f};
 if(v==='cut'){b('◀ Fewer parts',()=>setCut(CUTS.indexOf(F.d)-1));b('More parts ▶',()=>setCut(CUTS.indexOf(F.d)+1))}
 if(v==='order'&&F.put.length<4)DEAL.forEach(d=>{if(!F.put.includes(d))b(`1/${d}`,()=>pickCard(d),`One ${['','','half','third','quarter','fifth'][d]}`)});
 if(v==='same'&&F.r<SAME.length){const R=SAME[F.r];if(F.ok)b(F.r<SAME.length-1?'Next pair':'Finish',onward);else if(!ready()){b(`Shade ${R.a}/${R.d}`,()=>fill(0));b(`Shade ${R.b}/${R.d}`,()=>fill(1))}else{b(`${R.a}/${R.d} is bigger`,()=>choose(0));b(`${R.b}/${R.d} is bigger`,()=>choose(1));b('They are the same',()=>choose(2))}}
 if(v==='sign'&&F.r<SIGNS.length){if(F.ok)b(F.r<SIGNS.length-1?'Next one':'Finish',onward);else{['<','>','='].forEach(s=>b(s,()=>setSign(s),{'<':'is less than','>':'is greater than','=':'is equal to'}[s]));b('Check',checkSign)}}
 if(v==='pizza'&&F.r<PIES.length)F.ok?b(F.r<PIES.length-1?'Next pizzas':'Finish',nextPie):b("Put Mia's slice on Leo's",lay)}
function down(p){const v=stage();
 if(v==='cut'){const T=track();if(Math.abs(p.y-T.y)<34){F.drag=1;slideTo(p.x);return true}}
 if(v==='order')DEAL.forEach((d,i)=>{if(!F.put.includes(d)&&inside(p,cardAt(i)))pickCard(d)});
 if(v==='same'&&F.r<SAME.length){if(F.ok)return onward(),false;[0,1].forEach(k=>{const r=rowAt(k);if(inside(p,r))shade(k,Math.floor((p.x-r.x)/r.w*SAME[F.r].d))});if(ready())[0,1,2].forEach(i=>{if(inside(p,padAt(i)))choose(i)})}
 if(v==='sign'){if(F.ok)onward();else if(inside(p,gapAt()))cycle()}
 if(v==='pizza'&&F.r<PIES.length){if(F.ok)return nextPie(),false;const a=pieAt(0);if(Math.hypot(p.x-a.x,p.y-a.y)<a.R){F.drag=1;F.lift=1;F.lx=p.x;F.ly=p.y;draw();return true}}return false}
function slideTo(x){const T=track(),i=Math.round((x-T.x0)/(T.x1-T.x0)*(CUTS.length-1));setCut(i)}
function move(p){if(!F.drag)return;if(stage()==='cut')slideTo(p.x);if(stage()==='pizza'){F.lx=p.x;F.ly=p.y;draw()}}
function up(){if(!F.drag)return;F.drag=0;if(stage()==='pizza'&&!F.ok){const b=pieAt(1);if(Math.hypot(F.lx-b.x,F.ly-b.y)<b.R)lay();else{F.lift=0;speak("Drop it right on top of Leo's slice.");draw()}}}
const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(n,acts){steps[n].go();const k=++F.k;acts.forEach((f,j)=>setTimeout(()=>{if(k===F.k)f()},A.reduced()?30*(j+1):(j+1)*330))}
function reset(){const k=(F.k||0)+1;for(const x in F)delete F[x];Object.assign(F,{k,want:()=>{},d:2,seen:{},put:[],sh:[0,0],r:0,ok:0,oops:null,sign:null,drag:0,lift:0})}
const steps=[
{h:'More parts, smaller parts',p:'A unit fraction is one equal part of a whole, like 1/3. The bottom number, the denominator, says how many equal parts the whole is cut into.',
 predict:{q:'You cut the same bar into more equal parts. What happens to each part?',opts:['It gets bigger','It gets smaller','It stays the same'],ans:1},task:'Try at least 5 cuts, up to 8 or more',
 show:()=>play(0,[1,2,3,4,5].map(i=>()=>setCut(i))),
 go:()=>{reset();F.seen[2]=1;speak('Drag the dot or press More parts.');buttons();F.want=fin(0,cutsDone,'The bigger the denominator, the smaller each part.')}},
{h:'Biggest first',p:'Put the unit fractions in order, biggest first. Think about the size of each part, not the size of the number.',
 predict:{q:'Which is the biggest: 1/2, 1/3, 1/4 or 1/5?',opts:['1/5, because 5 is biggest','1/2','They are all the same'],ans:1},task:'Order 4 unit fractions',
 show:()=>play(1,[2,3,4,5].map(d=>()=>pickCard(d))),
 go:()=>{reset();speak('Tap the biggest unit fraction.');buttons();F.want=fin(1,()=>F.put.length>=4,'1/2 > 1/3 > 1/4 > 1/5.')}},
{h:'Same denominator',p:'When two fractions have the same denominator, the parts are the same size. Then the numerator, the top number, tells you how many parts.',
 predict:{q:'Which is bigger: 2/5 or 4/5?',opts:['2/5','4/5','The same: both are fifths'],ans:1},task:'Shade and compare 2 pairs',
 show:()=>play(2,SAME.flatMap(R=>[()=>fill(0),()=>fill(1),()=>choose(R.a>R.b?0:1),onward])),
 go:()=>{reset();speak('Tap the parts to shade 2/5 on the top bar.');buttons();F.want=fin(2,()=>F.r>=SAME.length,'Same denominator: the bigger numerator is the bigger fraction.')}},
{h:'< and >',p:'The sign < means is less than. The sign > means is greater than. The open side always faces the bigger fraction.',task:'Place 3 signs',
 show:()=>play(3,SIGNS.flatMap(Q=>[()=>setSign(truth(Q)),checkSign,onward])),
 go:()=>{reset();speak('Choose the sign that goes in the box.');buttons();F.want=fin(3,()=>F.r>=SIGNS.length,'1/3 > 1/6, 3/7 < 5/7 and 1/4 < 1/2.')}},
{h:'Same whole?',p:'We can only compare fractions of the same whole. A half of a tiny pizza can be less than a quarter of a giant one.',
 predict:{q:'Mia has 1/2 of a small pizza. Leo has 1/4 of a giant pizza. Who has more?',opts:['Mia, because 1/2 is more than 1/4','Leo','They have the same'],ans:1},task:'Compare 2 pairs of slices',
 show:()=>play(4,[lay,nextPie,lay,nextPie]),
 go:()=>{reset();speak("Drag Mia's slice onto Leo's slice.");buttons();F.want=fin(4,()=>F.r>=PIES.length,'Only compare fractions of the same whole.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>F.want()});
const QS=[['Which is bigger: 1/3 or 1/5?',[['1/3','ok'],['1/5','bigden'],['They are equal','eq']]],
 ['Which is bigger: 3/8 or 5/8?',[['5/8','ok'],['3/8','lessn'],['Equal: both are eighths','sameden']]],
 ['Which order is biggest first?',[['1/2, 1/3, 1/4','ok'],['1/4, 1/3, 1/2','flip'],['1/2, 1/4, 1/3','mixed']]],
 ['Which is true?',[['1/6 < 1/4','ok'],['1/6 > 1/4','bigden'],['1/6 = 1/4','eq']]],
 ['Two same-size cakes: one cut into 10 equal parts, one into 5. Which parts are bigger?',[['The fifths','ok'],['The tenths','tenths'],['Same size','samesize']]],
 ['2/7 __ 6/7. Which sign goes in the gap?',[['<','ok'],['>','turn'],['=','eq']]],
 ['Mia has 1/2 of a small pizza. Leo has 1/4 of a giant one. Is Mia sure to have more?',[['No: the pizzas are not the same size','ok'],['Yes: 1/2 is always more','whole'],['No: 4 is more than 2','four']]]];
function why(t){let m='Compare the size of the parts, then how many parts.';
 if(t==='bigden')m='A bigger denominator means more parts, so each part is smaller. 1/3 is bigger than 1/5, and 1/4 is bigger than 1/6.';
 if(t==='eq')m='They are not equal. Draw both on the same bar: one part is clearly bigger.';
 if(t==='lessn')m='Both are eighths, so the parts match. 5 eighths is more than 3 eighths.';
 if(t==='sameden')m='Same denominator means same-size parts, not same fraction. Count them: 5 is more than 3.';
 if(t==='flip')m='That is smallest first. 1/2 is the biggest: halves are bigger than thirds and quarters.';
 if(t==='mixed')m='1/3 is bigger than 1/4, so it comes before 1/4.';
 if(t==='tenths')m='Cutting into 10 makes smaller parts than cutting into 5. The fifths are bigger.';
 if(t==='samesize')m='More cuts make smaller parts. Fifths are bigger than tenths.';
 if(t==='turn')m='6/7 is bigger, so the open side faces 6/7: 2/7 < 6/7.';
 if(t==='whole')m='Only for the same whole. A quarter of a giant pizza can be more than half a tiny one.';
 if(t==='four')m='4 parts of a whole are smaller, not bigger. And the pizzas are different sizes, so you can not tell yet.';
 return m}
function ask(){qi++;const[q,ops]=QS[qi%QS.length],rot=(qi*2+1)%3;box.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=box.querySelector('.fl-pick');[...ops.slice(rot),...ops.slice(0,rot)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>judge(t)});speak('Challenge: '+q);draw()}
function judge(t){box.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=box.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){run++;A.win()}else{run=0;sfx('miss')}fb.innerHTML=(ok?`✓ Right! ${run} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw:paint,onStep:A=>{box.hidden=A.step!==5;bar.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);bar=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);box=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}});
A.start()})})();
