/* Flagship – types of data (ages 11–13): sort variables into categorical or numerical (with the "does a mean make
   sense?" test), zoom into the gap between two values to see why height is continuous and siblings are discrete,
   classify numerical variables, pick a chart that suits each data set and see it drawn, then run survey questions
   through the classification tree. Drag a card or the number line, or use the buttons. */
(()=>{
const VARS=[['Eye colour','c','Colours are names. You cannot find the mean of blue and brown.'],['Number of siblings','n','You can count siblings and find a mean number.'],
 ['Football shirt number','c','Shirt numbers are labels. Shirt 7 and shirt 9 do not average to a shirt 8 player.'],['Height in cm','n','Height is measured, and a mean height makes sense.'],
 ['Favourite sport','c','Sports are names, so this is categorical.'],['Shoe size','n','Sizes are numbers in order, and a mean shoe size makes sense.']];
const NUMS=[['Number of goals in a match','d','Goals are counted: 2 or 3, never 2.5.'],['Time to run 100 m','c','Time is measured. Between 14.2 s and 14.3 s there is always 14.25 s.'],
 ['Age in years','c','Age is time, so it is continuous, even when we round it to whole years.'],['Shoe size (UK)','d','Shoe sizes only come in set steps: 5, 5½, 6. There is no size 5.3.'],
 ['Mass of an apple in g','c','Mass is measured and can take any value in a range.'],['Pets at home','d','Pets are counted in whole numbers.']];
const SETS=[{t:'Favourite sport of 30 pupils',k:'cat',ok:['bar','pie'],d:[['Football',11],['Netball',7],['Tennis',5],['Swim',7]]},
 {t:'Number of siblings of 30 pupils',k:'disc',ok:['bar'],d:[['0',6],['1',12],['2',8],['3',4]]},
 {t:'Heights of 30 pupils, grouped (cm)',k:'cont',ok:['hist'],d:[['140–150',5],['150–160',12],['160–170',9],['170–180',4]]},
 {t:'Temperature every hour on one day (°C)',k:'time',ok:['line'],d:[['9am',8],['11am',12],['1pm',15],['3pm',14]]}];
const CH=[['bar','Bar chart (gaps)'],['pie','Pie chart'],['hist','Histogram (no gaps)'],['line','Line graph']];
const TREE=[['Favourite colour','c'],['Number of pets','d'],['Reaction time in seconds','t'],['Bus route number','c'],['Mass of a bag in kg','t']];
VIS.reg('flagdtype',c=>{let A,pad,qbox,qi=-1,ver=0,streak=0;
const fresh=()=>({want:()=>{},won:0,r:0,deck:[],placed:[],bad:-1,drag:null,zoom:0,zx:null,pick:null,path:[],note:''}),S=fresh();
const mode=()=>['cat','gap','dc','chart','tree','quiz'][A.step],fast=()=>A.reduced();
const say=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)},need=()=>({cat:5,gap:3,dc:4,chart:3,tree:3}[mode()]||9);
function label(g,t,x,y,n,col,wt,mw,al){g.font=`${wt||700} ${n}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,mw||A.W-12)}
function tile(g,x,y,w,h,t,st){const C=A.col;g.fillStyle=C.dark?'#1e293b':'#fff';A.paint.rrect(x-w/2,y-h/2,w,h,10);g.fill();if(st){g.fillStyle=st==='ok'?A.alpha(C.gr,.22):A.alpha(C.rd,.18);g.fill()}
 g.strokeStyle=st==='ok'?C.gr:st==='no'?C.rd:st==='on'?C.vi:A.mix(C.tx,C.pn,.4);g.lineWidth=st?3:1.5;g.stroke();label(g,t,x,y,13,C.tx,700,w-8)}
/* two drop zones side by side, used by the sorting steps */
function bins(g,names,items,src){const C=A.col;names.forEach(([k,n],i)=>{const x=A.W*(.26+i*.48),y0=A.H*.05,w=A.W*.45,h=A.H*.52;g.fillStyle=A.mix(C.pn,i?'#bae6fd':'#fbcfe8',C.dark?.15:.45);A.paint.rrect(x-w/2,y0,w,h,12);g.fill();
 label(g,n,x,y0+16,14,C.tx,800,w-8);items.filter(z=>src[z][1]===k).forEach((z,j)=>label(g,src[z][0],x,y0+40+j*19,11.5,C.tx,600,w-10))});
 const z=S.deck[0];if(z==null)return;const p=S.drag&&S.drag.x!=null?S.drag:{x:A.W/2,y:A.H*.74};tile(g,p.x,p.y,Math.min(A.W*.7,320),A.H*.12,src[z][0],S.bad===z?'no':null)}
function drop(k,src,tagNames){if(S.won>=need())return;const z=S.deck[0];if(z==null)return;const[n,want,why]=src[z];
 if(k!==want){S.bad=z;return miss(`${n} is not ${tagNames[k]}. ${why}`)}S.deck.shift();S.placed.push(z);S.won++;A.sound.pop();say(`${n}: ${tagNames[k]}. ${why}`);keys();A.redraw();S.want()}
const catNames={c:'categorical',n:'numerical'},dcNames={d:'discrete',c:'continuous'};
/* ---- the in-between test: zoom into the gap between two neighbouring values ---- */
function drawGap(g){const C=A.col,x0=A.W*.08,x1=A.W*.92,lo=152+(S.zoom?[0,.5,.55,.555][S.zoom]:0),step=Math.pow(10,-S.zoom-1);
 label(g,'Height in cm (measured)',A.W/2,A.H*.08,14,C.tx,800);line(g,A.H*.24,x0,x1);
 for(let i=0;i<=10;i++){const x=x0+(x1-x0)*i/10,v=lo+i*step;g.strokeStyle=C.tx;g.lineWidth=i%5?1:2;g.beginPath();g.moveTo(x,A.H*.24-(i%5?6:11));g.lineTo(x,A.H*.24+(i%5?6:11));g.stroke();
  if(i%5===0||!A.narrow&&S.zoom<2)label(g,v.toFixed(S.zoom+1),x,A.H*.32,A.narrow?10:11,C.mu,700)}
 const mid=lo+5*step;g.fillStyle=C.vi;g.beginPath();g.arc(S.zx==null?(x0+x1)/2:S.zx,A.H*.24,9,0,7);g.fill();
 label(g,S.zoom?`Zoomed in ${S.zoom}×: ${mid.toFixed(S.zoom+1)} cm is a real height`:'Drag along the line to zoom into a gap',A.W/2,A.H*.41,13,C.tx,700);
 label(g,'Number of siblings (counted)',A.W/2,A.H*.56,14,C.tx,800);line(g,A.H*.7,x0,x1);
 [[x0,'2'],[x1,'3']].forEach(([x,t])=>{A.paint.ball(x,A.H*.7,10,C.ac);label(g,t,x,A.H*.79,13,C.tx,800)});
 g.setLineDash([5,5]);g.strokeStyle=C.rd;g.beginPath();g.moveTo((x0+x1)/2,A.H*.63);g.lineTo((x0+x1)/2,A.H*.77);g.stroke();g.setLineDash([]);
 label(g,'2.5 siblings? Impossible. Nothing in between.',A.W/2,A.H*.88,13,C.rd,800)}
function line(g,y,x0,x1){g.strokeStyle=A.col.tx;g.lineWidth=3;g.beginPath();g.moveTo(x0,y);g.lineTo(x1,y);g.stroke()}
function zoomIn(){if(mode()!=='gap'||S.zoom>=3)return;S.zoom++;S.won=S.zoom;S.zx=null;A.sound.pop();const lo=152+[0,.5,.55,.555][S.zoom],v=(lo+5*Math.pow(10,-S.zoom-1)).toFixed(S.zoom+1);
 say(S.zoom<3?`Zoomed in. Between the marks there is still room: ${v} cm is a real height. Zoom again.`:`Still more values: ${v} cm. A measured value can always be split finer, so height is continuous. Siblings stay at 2 or 3: discrete.`);keys();A.redraw();S.want()}
/* ---- choose a chart and see it ---- */
function drawChart(g){const C=A.col,s=SETS[S.r%4];label(g,s.t,A.W/2,A.H*.06,14,C.tx,800);const kind=S.pick,x0=A.W*.1,x1=A.W*.94,yb=A.H*.78,top=A.H*.16;
 if(!kind){label(g,'Pick a chart below to draw this data',A.W/2,A.H*.45,13,C.mu,700);return}
 const max=Math.max(...s.d.map(r=>r[1])),n=s.d.length,cols=[C.ac,C.or,C.gr,C.pk],ok=s.ok.includes(kind);
 if(kind==='pie'){let a=-Math.PI/2;const tot=s.d.reduce((t,r)=>t+r[1],0),R=Math.min(A.W*.2,A.H*.28),cx=A.W/2,cy=A.H*.47;s.d.forEach((r,i)=>{const b=a+r[1]/tot*2*Math.PI;g.fillStyle=cols[i];g.beginPath();g.moveTo(cx,cy);g.arc(cx,cy,R,a,b);g.fill();
  const m=(a+b)/2;label(g,r[0],cx+Math.cos(m)*(R+28),cy+Math.sin(m)*(R+14),11,C.tx,700,90);a=b})}
 else{g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.moveTo(x0,top);g.lineTo(x0,yb);g.lineTo(x1,yb);g.stroke();const w=(x1-x0)/n;
  s.d.forEach((r,i)=>{const h=(yb-top)*r[1]/max,x=x0+w*i;if(kind==='line'){g.fillStyle=C.vi;g.beginPath();g.arc(x+w/2,yb-h,5,0,7);g.fill();if(i){const p=s.d[i-1],ph=(yb-top)*p[1]/max;g.strokeStyle=C.vi;g.beginPath();g.moveTo(x-w/2,yb-ph);g.lineTo(x+w/2,yb-h);g.stroke()}}
   else{const gap=kind==='bar'?w*.22:0;g.fillStyle=A.alpha(cols[i],.85);g.fillRect(x+gap/2,yb-h,w-gap,h);g.strokeStyle=C.tx;g.lineWidth=1;g.strokeRect(x+gap/2,yb-h,w-gap,h)}
   label(g,r[0],x+w/2,yb+13,A.narrow?10:11,C.tx,700,w-2)})}
 label(g,ok?'✓ Suits this data':'✗ Does not suit this data',A.W/2,A.H*.93,14,ok?C.gr:C.rd,800)}
function chart(k){if(mode()!=='chart'||S.won>=need())return;const s=SETS[S.r%4];S.pick=k;A.redraw();
 if(!s.ok.includes(k)){const m={cat:{line:'A line joins points, which says there are values between Football and Netball. There are not.',hist:'A histogram is for continuous data. Sports are separate categories, so use gaps.'},
  disc:{hist:'No gaps says 1.5 siblings exist. Discrete data needs gaps (a bar chart or vertical line chart).',pie:'A pie hides the order 0, 1, 2, 3. A bar chart with gaps keeps the order.',line:'A line says 1.5 siblings exist between the points. Use separate bars.'},
  cont:{bar:'Gaps say no heights exist between 150 and 160. But 150.0 cm is real. Continuous groups touch: no gaps.',pie:'A pie loses the order of the groups. A histogram shows the shape of the spread.',line:'These are grouped counts, not readings over time. Use a histogram with touching bars.'},
  time:{bar:'Temperature changes smoothly between readings. A line graph shows the readings in between.',pie:'Temperatures are not parts of a whole, so a pie makes no sense.',hist:'This is one reading at each time, not counts in groups. Use a line graph.'}}[s.k][k];return miss(m)}
 S.won++;A.sound.pop();say(`Yes: a ${CH.find(z=>z[0]===k)[1].toLowerCase()} suits ${s.t.toLowerCase()}.`);const v=ver;setTimeout(()=>{if(v!==ver)return;S.r++;S.pick=null;keys();A.redraw()},fast()?10:900);keys();S.want()}
/* ---- classification tree ---- */
const NODE={root:[.5,.14,'Data'],c:[.25,.42,'Categorical'],n:[.75,.42,'Numerical'],d:[.55,.72,'Discrete'],t:[.85,.72,'Continuous']};
function drawTree(g){const C=A.col,q=TREE[S.r%TREE.length],P=k=>[NODE[k][0]*A.W,NODE[k][1]*A.H];label(g,'Question: '+q[0],A.W/2,A.H*.04+6,14,C.tx,800);
 [['root','c'],['root','n'],['n','d'],['n','t']].forEach(([a,b])=>{const[x0,y0]=P(a),[x1,y1]=P(b);g.strokeStyle=S.path.includes(b)?C.vi:A.mix(C.tx,C.pn,.5);g.lineWidth=S.path.includes(b)?4:2;g.beginPath();g.moveTo(x0,y0);g.lineTo(x1,y1);g.stroke()});
 Object.keys(NODE).forEach(k=>{const[x,y]=P(k);tile(g,Math.min(Math.max(x,A.W*.13),A.W*.87),y,Math.min(A.W*.28,150),A.H*.11,NODE[k][2],k===S.bad?'no':S.path.includes(k)?'ok':null)})}
function branch(k){if(mode()!=='tree'||S.won>=need()||k==='root')return;const q=TREE[S.r%TREE.length],at=S.path.length?'n':'root',ans=q[1];
 if(at==='root'&&!['c','n'].includes(k)||at==='n'&&!['d','t'].includes(k))return miss(at==='root'?'Start at the top: is it categorical or numerical?':'Now split numerical: discrete or continuous?');
 const right=at==='root'?(ans==='c'?'c':'n'):ans;if(k!==right){S.bad=k;return miss(k==='c'?`${q[0]} is a number you can average, so it is numerical.`:k==='n'?`${q[0]} is a label or a name. Its mean makes no sense, so it is categorical.`:k==='d'?`${q[0]} is measured, so there is always a value in between: continuous.`:`${q[0]} is counted in whole steps, so it is discrete.`)}
 S.path.push(k);A.sound.tick();if(k==='n'){say('Numerical. Now: counted (discrete) or measured (continuous)?');keys();return A.redraw()}
 S.won++;A.sound.pop();say(`${q[0]}: ${S.path.map(z=>NODE[z][2].toLowerCase()).join(', ')}.`);const v=ver;setTimeout(()=>{if(v!==ver)return;S.r++;S.path=[];keys();A.redraw()},fast()?10:900);keys();A.redraw();S.want()}
/* ---- shared ---- */
function draw(A){const{ctx:g,W,H,col:C}=A,v=mode();g.fillStyle=A.mix(C.pn,'#ecfeff',C.dark?.04:.35);g.fillRect(0,0,W,H);
 if(v==='quiz'){label(g,'Categorical: names · Discrete: counted · Continuous: measured',W/2,H*.45,14,C.tx,800);return}
 if(v==='cat')bins(g,[['c','Categorical (names, labels)'],['n','Numerical (numbers to work with)']],S.placed,VARS);
 if(v==='dc')bins(g,[['d','Discrete (counted, set steps)'],['c','Continuous (measured)']],S.placed,NUMS);
 if(v==='gap')drawGap(g);if(v==='chart')drawChart(g);if(v==='tree')drawTree(g);A.fx.draw(g)}
function miss(t){A.sound.miss();say(t);const v=ver;setTimeout(()=>{if(v===ver){S.bad=-1;A.redraw()}},fast()?10:1200);A.redraw()}
function keys(){if(!pad)return;pad.innerHTML='';const v=mode(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost sm','aria-label':l||null},pad,t);b.onclick=fn};if(v==='quiz'||S.won>=need())return;
 if(v==='cat')[['c','Categorical'],['n','Numerical']].forEach(([k,t])=>B(t,()=>drop(k,VARS,catNames),`This variable is ${t.toLowerCase()}`));
 if(v==='dc')[['d','Discrete'],['c','Continuous']].forEach(([k,t])=>B(t,()=>drop(k,NUMS,dcNames),`This variable is ${t.toLowerCase()}`));
 if(v==='gap')B('🔍 Zoom into the gap',zoomIn,'Zoom in between two height marks');
 if(v==='chart')CH.forEach(([k,t])=>B(t,()=>chart(k),`Draw a ${t.toLowerCase()}`));
 if(v==='tree')['c','n','d','t'].forEach(k=>B(NODE[k][2],()=>branch(k),`Choose ${NODE[k][2]}`))}
function down(p){const v=mode();if((v==='cat'||v==='dc')&&S.deck.length&&Math.abs(p.x-A.W/2)<Math.min(A.W*.35,160)&&Math.abs(p.y-A.H*.74)<A.H*.08){S.drag={x:null,y:null,x0:p.x,y0:p.y};return true}
 if(v==='gap'&&Math.abs(p.y-A.H*.24)<A.H*.1){S.drag={x:null,y:null,x0:p.x,y0:p.y};return true}
 if(v==='tree'){for(const k of['c','n','d','t']){const x=Math.min(Math.max(NODE[k][0]*A.W,A.W*.13),A.W*.87),y=NODE[k][1]*A.H;if(Math.abs(p.x-x)<Math.min(A.W*.125,75)&&Math.abs(p.y-y)<A.H*.06)branch(k)}}return false}
function move(p){const d=S.drag;if(!d)return;if(d.x!=null||Math.hypot(p.x-d.x0,p.y-d.y0)>8){d.x=p.x;d.y=p.y;if(mode()==='gap')S.zx=Math.max(A.W*.08,Math.min(A.W*.92,p.x));A.redraw()}}
function up(p){const d=S.drag;S.drag=null;if(!d)return;const v=mode();
 if(v==='gap'){if(d.x!=null&&Math.abs(p.x-d.x0)>25)zoomIn();else{say('Drag the purple dot along the height line to zoom into a gap.');A.redraw()}return}
 if(d.x==null||p.y>A.H*.6){say('Drag the card up into a box, or use the buttons.');return A.redraw()}v==='cat'?drop(p.x<A.W/2?'c':'n',VARS,catNames):drop(p.x<A.W/2?'d':'c',NUMS,dcNames)}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list,gap){const k=++ver;list.forEach((fn,j)=>setTimeout(()=>{if(k===ver)fn()},fast()?j*40+30:(j+1)*(gap||300)))}
const wipe=deck=>{ver++;Object.assign(S,fresh(),{deck:deck||[]})};
const steps=[
{h:'Names or numbers?',p:'Categorical data are names or labels. Numerical data are numbers you can work with. Test: does a mean make sense? Sort each variable.',predict:{q:'A football shirt number, like 7. Categorical or numerical?',opts:['Numerical: it is a number','Categorical: it is a label'],ans:1},task:'Sort 5 variables',
 show:()=>{steps[0].go();play([0,1,2,3,4].map(z=>()=>drop(VARS[z][1],VARS,catNames)),420)},go:()=>{wipe([0,1,2,3,4,5]);say('Variable: '+VARS[0][0]+'. Categorical or numerical?');keys();S.want=ready(0,()=>S.won>=5,'A number that is only a label is categorical. Ask: does a mean make sense?')}},
{h:'The in-between test',p:'Numerical data can be counted or measured. Drag along the height line to zoom into the gap between two marks. Then look at siblings.',predict:{q:'Is there a height between 152.5 cm and 152.6 cm?',opts:['No, nothing in between','Yes, like 152.55 cm'],ans:1},task:'Zoom into the height gap 3 times',
 show:()=>{steps[1].go();play([zoomIn,zoomIn,zoomIn],500)},go:()=>{wipe();say('Height line from 152 to 153 cm, and a siblings line from 2 to 3. Drag along the height line.');keys();S.want=ready(1,()=>S.zoom>=3,'Measured data is continuous: there is always a value in between. Counted data is discrete.')}},
{h:'Discrete or continuous?',p:'Discrete data are counted or come in set steps. Continuous data are measured and can take any value in a range.',predict:{q:'Age in years. Discrete or continuous?',opts:['Discrete: it goes 11, 12, 13','Continuous: age is time'],ans:1},task:'Sort 4 numerical variables',
 show:()=>{steps[2].go();play([0,1,2,3].map(z=>()=>drop(NUMS[z][1],NUMS,dcNames)),420)},go:()=>{wipe([0,1,2,3,4,5]);say('Variable: '+NUMS[0][0]+'. Discrete or continuous?');keys();S.want=ready(2,()=>S.won>=4,'Rounding does not change the type: age and time are continuous.')}},
{h:'Pick the chart',p:'The type of data decides the chart. Pick one and it is drawn. Does it suit the data?',task:'Pick a suitable chart for 3 data sets',
 show:()=>{steps[3].go();play([()=>chart('bar'),()=>{},()=>{},()=>chart('bar'),()=>{},()=>{},()=>chart('hist')],330)},go:()=>{wipe();say('Data: '+SETS[0].t+'. Pick a chart.');keys();S.want=ready(3,()=>S.won>=3,'Gaps for categories and counts; touching bars for grouped measurements; a line for readings over time.')}},
{h:'Survey sandbox',p:'Run each survey question through the tree. First categorical or numerical, then discrete or continuous.',task:'Classify 3 survey questions',
 show:()=>{steps[4].go();play([()=>branch('c'),()=>{},()=>{},()=>{},()=>branch('n'),()=>branch('d'),()=>{},()=>{},()=>{},()=>branch('n'),()=>branch('t')],300)},go:()=>{wipe();say('Question: '+TREE[0][0]+'. Start at the top of the tree.');keys();S.want=ready(4,()=>S.won>=3,'Two questions classify any data: names or numbers? counted or measured?')}},
{h:'Challenge',p:'',go:()=>{wipe();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['UK shoe size (5, 5½, 6, …) is…',[['Numerical, discrete','ok'],['Numerical, continuous','cont'],['Categorical','catnum']]],
 ['Time taken to solve a puzzle, recorded to the nearest second, is…',[['Continuous','ok'],['Discrete, because it is rounded','round'],['Categorical','catnum']]],
 ['Which chart suits heights grouped as 140 ≤ h < 150, 150 ≤ h < 160, …?',[['Histogram with no gaps','ok'],['Bar chart with gaps','gaps'],['Line graph','line']]],
 ['Phone numbers are…',[['Categorical: they are labels','ok'],['Numerical, discrete','label'],['Numerical, continuous','label']]],
 ['Number of cars passing the school in an hour is…',[['Discrete','ok'],['Continuous','cont'],['Categorical','catnum']]]];
function hint(t){let m='Ask two things: does a mean make sense? Is it counted or measured?';
 if(t==='cont')m='Continuous data are measured. This one is counted or comes in set steps, so it is discrete.';
 if(t==='round')m='Rounding is how we record it, not what it is. Time is measured, so it is continuous.';
 if(t==='catnum')m='These are real amounts you can average, so the data are numerical, not categorical.';
 if(t==='gaps')m='Gaps say no heights exist between the groups, but 150.0 cm does. Grouped continuous data has touching bars.';
 if(t==='line')m='A line graph is for readings over time. Grouped counts of heights need a histogram.';
 if(t==='label')m='A phone number is a label. The mean of two phone numbers means nothing, so it is categorical.';return m}
function quiz(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 qbox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qbox.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
function judge(t){qbox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qbox.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Correct.':'✗ '+hint(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.6,tall:1.1,draw,onStep:A=>{qbox.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);qbox=E('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});keys()}});
A.start()})})();
