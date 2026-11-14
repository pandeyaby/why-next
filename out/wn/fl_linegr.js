/* Flagship – line graphs (ages 10–11; NC England Y6 Statistics: interpret and construct line graphs and use them to solve
   problems; Y5 solve problems using information in line graphs). One day of temperatures, 6 am to 6 pm: plot the missing
   readings on a 2 °C scale, read times nobody measured by sliding a time line, find where it warmed fastest, stayed the
   same and cooled, find both times it was 18 °C, and sort data that suits a line graph from data that needs a bar chart. */
(()=>{
 const T=[[6,8],[8,10],[10,16],[12,20],[14,22],[16,22],[18,14]];
 const GIVEN=[0,3,6],PLOT=[1,2,4,5];
 const READ=[[9,13,[[10,'before'],[16,'after']]],[13,21,[[20,'before'],[11,'half']]],[15,22,[[20,'dip'],[44,'add']]]];
 const SEGQ=[['warmed up fastest',1],['stayed the same',4],['cooled down',5]];
 const CARDS=[['Temperature every hour',0,'Temperature changes smoothly with time, so the points can be joined.'],['Favourite fruit in our class',1,'Fruits are separate groups. Nothing lies between apple and banana, so use bars.'],
  ['A bean plant\'s height each week',0,'The plant grows between measurements, so a line shows it.'],['Pets owned by Year 5',1,'Cats, dogs and fish are groups, not times. Use a bar chart.'],
  ['Length of a shadow through the day',0,'The shadow shrinks and grows smoothly over time: a line graph.'],['Goals scored by each player',1,'Each player is a separate group, so join nothing: use bars.']];
 const hr=h=>h===12?'12 noon':h<12?h+' am':(h-12)+' pm';
 VIS.reg('flaglinegr',c=>{let A,keys,quiz;
  const S={run:0,put:{},ri:0,cur:7,si:0,hits:[],hx:9,ci:0,pile:[0,0],note:'',bad:false,then:()=>{}};
  const part=()=>['plot','read','trend','cross','sort','chal'][A.step];
  const fz=n=>Math.round(n*(A.narrow?1:1.12));
  const INK='#172033',GREY='#475569',GRID='#cbd5e1',AXIS='#334155',LINE='#c2410c',DOT='#1d4ed8',OK='#047857',ERR='#b91c1c',CREAM='#fef3c7',WHITE='#ffffff';
  function put(g,s,x,y,n,col,al,w){g.font=`${w||700} ${fz(n)}px system-ui,sans-serif`;g.fillStyle=col;g.textAlign=al||'center';g.textBaseline='middle';g.fillText(String(s),x,y,A.W-12)}
  function wrap(g,s,max,n){g.font=`800 ${fz(n)}px system-ui,sans-serif`;const out=[];let r='';s.split(' ').forEach(w=>{const t=r?r+' '+w:w;if(r&&g.measureText(t).width>max){out.push(r);r=w}else r=t});out.push(r);return out}
  function panel(g,r,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=edge;g.lineWidth=lw||2;g.stroke()}
  function feedback(g){if(!S.note)return;const L=wrap(g,(S.bad?'✗ ':'✓ ')+S.note,A.W-44,13),lh=fz(13)+6,h=L.length*lh+12,y=A.H-h-6;panel(g,{x:10,y,w:A.W-20,h},WHITE,S.bad?ERR:OK,3);L.forEach((l,i)=>put(g,l,A.W/2,y+6+lh*(i+.5),13,INK,'center',800))}
  const live=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
  const fail=s=>{S.bad=true;S.note=s;A.sound.miss();live(s);A.redraw()};
  const pass=s=>{S.bad=false;S.note=s;A.sound.pop()};
  // ---- the graph: x = time (6 am to 6 pm), y = °C (0 to 24) ----
  const box=()=>({l:A.narrow?40:56,r:A.W-16,t:A.H*.13,b:A.H*.7});
  const X=h=>{const B=box();return B.l+(h-6)/12*(B.r-B.l)},Y=v=>{const B=box();return B.b-v/24*(B.b-B.t)};
  const toH=x=>{const B=box();return 6+Math.round((x-B.l)/(B.r-B.l)*12)},toV=y=>{const B=box();return Math.round((B.b-y)/(B.b-B.t)*24)};
  const at=h=>{for(let i=1;i<T.length;i++)if(h<=T[i][0]){const [h0,v0]=T[i-1],[h1,v1]=T[i];return v0+(v1-v0)*(h-h0)/(h1-h0)}return T[0][1]};
  function axes(g){const B=box();g.lineWidth=1;for(let v=0;v<=24;v+=2){g.strokeStyle=v%4?'#e2e8f0':GRID;g.beginPath();g.moveTo(B.l,Y(v));g.lineTo(B.r,Y(v));g.stroke();if(v%4===0)put(g,v,B.l-6,Y(v),11,GREY,'right')}
   for(let h=6;h<=18;h+=1){g.strokeStyle=h%2?'#eef2f7':GRID;g.beginPath();g.moveTo(X(h),B.t);g.lineTo(X(h),B.b);g.stroke();if(h%2===0)put(g,h===12?'12':h<12?h+'am':(h-12)+'pm',X(h),B.b+fz(11),11,GREY)}
   g.strokeStyle=AXIS;g.lineWidth=2;g.beginPath();g.moveTo(B.l,B.t);g.lineTo(B.l,B.b);g.lineTo(B.r,B.b);g.stroke();put(g,'°C',B.l+4,B.t-fz(9),11,GREY,'left')}
  function curve(g,upto){const pts=T.filter((p,i)=>upto==null||!PLOT.includes(i)||S.put[i]===p[1]);if(upto==null||pts.length===T.length){g.strokeStyle=LINE;g.lineWidth=3;g.beginPath();T.forEach(([h,v],i)=>i?g.lineTo(X(h),Y(v)):g.moveTo(X(h),Y(v)));g.stroke()}
   pts.forEach(([h,v])=>{g.fillStyle=DOT;g.beginPath();g.arc(X(h),Y(v),5,0,7);g.fill()})}
  function ask(g,s){put(g,s,A.W/2,A.H*.05,14,INK,'center',800)}
  const binR=k=>{const w=(A.W-36)/2;return{x:12+k*(w+12),y:A.H*.42,w,h:A.H*.3}};
  function scene(g){const v=part();
   if(v==='sort'){const cd=CARDS[S.ci],top={x:A.W*.12,y:A.H*.07,w:A.W*.76,h:A.H*.24};panel(g,top,cd?CREAM:WHITE,cd?'#b45309':GRID,2.5);const L=wrap(g,cd?cd[0]:'All 6 sorted',top.w-20,16);L.forEach((l,i)=>put(g,l,A.W/2,top.y+top.h/2+(i-(L.length-1)/2)*fz(20),16,cd?INK:OK,'center',800));
    ['Line graph','Bar chart'].forEach((t,k)=>{const b=binR(k);panel(g,b,'#f1f5f9',k?GREY:LINE,2.5);put(g,t,b.x+b.w/2,b.y+b.h*.3,16,INK,'center',800);
     if(k){[.3,.55,.4].forEach((f,i)=>{g.fillStyle=DOT;g.fillRect(b.x+b.w*(.3+i*.15),b.y+b.h*(.95-f),b.w*.1,b.h*f*.6)})}else{g.strokeStyle=LINE;g.lineWidth=3;g.beginPath();[.8,.6,.68,.5].forEach((f,i)=>{const x=b.x+b.w*(.25+i*.17),y=b.y+b.h*f;i?g.lineTo(x,y):g.moveTo(x,y)});g.stroke()}
     put(g,S.pile[k]?'●'.repeat(S.pile[k]):'',b.x+b.w/2,b.y+b.h*.92,12,GREY)});return}
   axes(g);
   if(v==='plot'){const left=PLOT.filter(i=>S.put[i]!==T[i][1]);ask(g,left.length?`Plot ${hr(T[left[0]][0])}: ${T[left[0]][1]} °C`:'All 7 readings plotted');curve(g,1);
    PLOT.forEach(i=>{const p=S.put[i];if(p!=null&&p!==T[i][1]){g.strokeStyle=ERR;g.lineWidth=2.5;const x=X(T[i][0]),y=Y(p);g.beginPath();g.moveTo(x-5,y-5);g.lineTo(x+5,y+5);g.moveTo(x+5,y-5);g.lineTo(x-5,y+5);g.stroke()}});
    if(!A.narrow){const B=box();put(g,'time →',B.r,B.b+fz(24),11,GREY,'right')}}
   if(v==='read'){const q=READ[S.ri];curve(g);const B=box(),x=X(S.cur);g.strokeStyle=OK;g.lineWidth=2;g.setLineDash([6,4]);g.beginPath();g.moveTo(x,B.t);g.lineTo(x,B.b);g.stroke();g.setLineDash([]);
    put(g,hr(S.cur),Math.max(B.l+40,Math.min(B.r-30,x)),B.t-fz(4),12,OK,'center',800);if(q&&S.cur===q[0]){g.fillStyle=OK;g.beginPath();g.arc(x,Y(at(S.cur)),6,0,7);g.fill()}ask(g,q?`Temperature at ${hr(q[0])}?`:'Read between the points: done')}
   if(v==='trend'){const q=SEGQ[S.si];curve(g);S.hits.forEach(k=>{g.strokeStyle=OK;g.lineWidth=7;g.beginPath();g.moveTo(X(T[k][0]),Y(T[k][1]));g.lineTo(X(T[k+1][0]),Y(T[k+1][1]));g.stroke()});ask(g,q?`Tap where it ${q[0]}`:'Steep, flat and falling found')}
   if(v==='cross'){curve(g);const B=box();g.strokeStyle='#7c3aed';g.lineWidth=2;g.setLineDash([6,4]);g.beginPath();g.moveTo(B.l,Y(18));g.lineTo(B.r,Y(18));g.stroke();g.setLineDash([]);put(g,'18 °C',B.l+6,Y(18)-fz(9),12,'#6d28d9','left',800);
    const x=X(S.hx);g.strokeStyle=GREY;g.lineWidth=1.5;g.beginPath();g.moveTo(x,B.t);g.lineTo(x,B.b);g.stroke();put(g,hr(S.hx),Math.max(B.l+40,Math.min(B.r-30,x)),B.t-fz(4),12,GREY,'center',800);
    S.hits.forEach(h=>{g.fillStyle=OK;g.beginPath();g.arc(X(h),Y(18),7,0,7);g.fill()});ask(g,S.hits.length<2?`When was it 18 °C? Found ${S.hits.length} of 2`:'Both times found')}}
  function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#f8fafc',C.dark?.05:.5);g.fillRect(0,0,A.W,A.H);if(C.dark){g.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);g.fill()}
   if(part()==='chal'){axes(g);curve(g);ask(g,'Steep = fast change. Flat = no change.')}else scene(g);feedback(g);A.fx.draw(g)}
  // ---- actions ----
  function plotAt(h,v){const i=PLOT.find(i=>T[i][0]===h);if(i==null){if(GIVEN.some(k=>T[k][0]===h))return fail(`${hr(h)} is already plotted. Plot the readings that are missing.`);return fail('Readings were taken every 2 hours. Pick 8 am, 10 am, 2 pm or 4 pm.')}
   if(S.put[i]===T[i][1])return;S.put[i]=v;const want=T[i][1];
   if(v!==want){let m=`The table says ${want} °C at ${hr(h)}, not ${v} °C.`;if(Math.abs(v-want)===1)m+=' Each grid line is 2 °C, so count up in 2s.';else if(v*2===want||v===want*2)m+=' Read the numbers on the side, not the number of lines.';else m+=` Go up from ${hr(h)} to the ${want} line.`;return fail(m)}
   pass(`${hr(h)}: ${want} °C plotted.`);update()}
  function readAns(val,tag){const q=READ[S.ri];if(!q)return;if(S.cur!==q[0])return fail(`Slide the time line to ${hr(q[0])} first.`);if(tag!=='ok')return fail(readSlip(tag,q));pass(`${hr(q[0])}: ${q[1]} °C, read from the line between two readings.`);S.ri++;update()}
  function readSlip(tag,q){let m='';if(tag==='before')m=`That is the reading before ${hr(q[0])}. Where the time line meets the graph, the line is higher.`;if(tag==='after')m=`That is the next reading. At ${hr(q[0])} the line is only part of the way there.`;
   if(tag==='half')m='That halves the temperature. Read where the time line meets the graph.';if(tag==='dip')m='The line is flat from 2 pm to 4 pm, so it stays at 22 °C the whole time.';if(tag==='add')m='Do not add the two readings. The line stays at 22 °C between them.';return m}
  function segTap(k){const q=SEGQ[S.si];if(!q||k<0||k>5)return;const d=T[k+1][1]-T[k][1];
   if(k!==q[1]){let m=`From ${hr(T[k][0])} to ${hr(T[k+1][0])} it went ${d>0?'up':d<0?'down':'nowhere'} ${d?Math.abs(d)+' °C':''}.`;
    if(S.si===0&&d===0)m+=' The highest part is not the fastest: flat means no change.';else if(S.si===0&&d>0)m+=` Find a steeper climb than ${d} °C in 2 hours.`;else if(S.si===1)m+=' Look for a flat part of the line.';else m+=' Look for the line going down.';return fail(m)}
   S.hits.push(k);pass(`${hr(T[k][0])} to ${hr(T[k+1][0])}: ${d>0?'up '+d:d<0?'down '+(-d):'no change, 0'} °C.`);S.si++;update()}
  function crossTap(h){if(S.hits.length>=2)return;S.hx=h;const v=at(h);if(Math.abs(v-18)>.01)return fail(`At ${hr(h)} the line is at ${Math.round(v*10)/10} °C, not 18 °C.`);
   if(S.hits.includes(h))return fail('Found that one. The line crosses 18 °C one more time.');S.hits.push(h);pass(S.hits.length===1?`${hr(h)}: 18 °C. Is there another time?`:`${hr(h)} too: once warming up, once cooling down.`);update()}
  function sortTo(k){const cd=CARDS[S.ci];if(!cd)return;if(k!==cd[1])return fail(cd[2]);S.pile[k]++;pass(cd[2]);S.ci++;update()}
  function update(){const v=part();let s='';
   if(v==='plot'){const left=PLOT.filter(i=>S.put[i]!==T[i][1]);s=left.length?`Plotted ${4-left.length} of 4. Next: ${hr(T[left[0]][0])}, ${T[left[0]][1]} °C. Readings: `+T.map(([h,t])=>`${hr(h)} ${t}`).join(', '):'All seven readings plotted and joined.'}
   else if(v==='read')s=`Time line at ${hr(S.cur)}. `+(READ[S.ri]?`Find the temperature at ${hr(READ[S.ri][0])}.`:'All three read.');
   else if(v==='trend')s=SEGQ[S.si]?`Tap the part of the line where it ${SEGQ[S.si][0]}.`:'All three found.';
   else if(v==='cross')s=`Time line at ${hr(S.hx)}, where the line is ${Math.round(at(S.hx)*10)/10} °C. Found ${S.hits.length} of 2 times at 18 °C.`;
   else if(v==='sort')s=CARDS[S.ci]?`${CARDS[S.ci][0]}: line graph or bar chart?`:'All six sorted.';else s='Challenge.';
   live((S.note?S.note+' ':'')+s);buttons();S.then()}
  function buttons(){if(!keys)return;keys.innerHTML='';const v=part(),b=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},keys,t);e.onclick=f};
   if(v==='plot'){const i=PLOT.find(i=>S.put[i]!==T[i][1]);if(i!=null){const h=T[i][0],w=T[i][1];[w-2,w,w+1].sort((a,b)=>(a*7+i)%3-(b*7+i)%3).forEach(t=>b(`${hr(h)}: ${t} °C`,()=>plotAt(h,t),`Plot ${t} degrees at ${hr(h)}`))}}
   if(v==='read'&&READ[S.ri]){b('◀ 1 hour',()=>slide(-1),'Time line back 1 hour');b('1 hour ▶',()=>slide(1),'Time line on 1 hour');const q=READ[S.ri];[[q[1],'ok']].concat(q[2]).sort((x,y)=>x[0]-y[0]).forEach(([t,tag])=>b(`${t} °C`,()=>readAns(t,tag),`It was ${t} degrees`))}
   if(v==='trend'&&SEGQ[S.si])T.slice(0,6).forEach((p,k)=>b(`${hr(p[0])}–${hr(T[k+1][0])}`,()=>segTap(k),`From ${hr(p[0])} to ${hr(T[k+1][0])}`));
   if(v==='cross'&&S.hits.length<2){b('◀ 1 hour',()=>{S.hx=Math.max(6,S.hx-1);S.note='';update()},'Time line back 1 hour');b('1 hour ▶',()=>{S.hx=Math.min(18,S.hx+1);S.note='';update()},'Time line on 1 hour');b('Mark this time',()=>crossTap(S.hx),'Mark this time')}
   if(v==='sort'&&CARDS[S.ci])['Line graph','Bar chart'].forEach((t,k)=>b(t,()=>sortTo(k),`Sort into ${t}`));A.redraw()}
  function slide(d){S.cur=Math.max(6,Math.min(18,S.cur+d));S.note='';update()}
  let dragging=false;
  function down(p){const v=part(),B=box(),inPlot=p.x>=B.l-10&&p.x<=B.r+10&&p.y>=B.t-10&&p.y<=B.b+10;
   if(v==='plot'&&inPlot){const h=toH(p.x);plotAt(h%2?h+(p.x>X(h)?1:-1):h,Math.max(0,Math.min(24,toV(p.y))));return true}
   if(v==='read'&&inPlot){dragging=true;S.cur=Math.max(6,Math.min(18,toH(p.x)));S.note='';update();return true}
   if(v==='trend'&&inPlot){segTap(Math.min(5,Math.floor((p.x-B.l)/(B.r-B.l)*6)));return true}
   if(v==='cross'&&inPlot){crossTap(Math.max(6,Math.min(18,toH(p.x))));return true}
   if(v==='sort'){const k=[0,1].find(k=>{const r=binR(k);return p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h});if(k!=null)sortTo(k);return k!=null}return false}
  function move(p){if(!dragging)return;const h=Math.max(6,Math.min(18,toH(p.x)));if(h!==S.cur){S.cur=h;update()}}
  function up(){dragging=false}
  // ---- steps ----
  const close=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
  const play=(fs,gap)=>{const id=++S.run;fs.forEach((f,k)=>setTimeout(()=>{if(id===S.run)f()},k*(A.reduced()?20:gap||380)))};
  const reset=()=>{S.run++;Object.assign(S,{then:()=>{},put:{},ri:0,cur:7,si:0,hits:[],hx:9,ci:0,pile:[0,0],note:'',bad:false})};
  const steps=[
   {h:'Plot the readings',p:'A thermometer was read every 2 hours. Three points are plotted. Tap the grid to plot the other four. Each grid line is 2 °C.',
    predict:{q:'Why can we join the points with a line?',opts:['The temperature changes smoothly between readings','To make the graph look neat','Every graph needs a line'],ans:0},
    task:'Plot 4 points',show:()=>{steps[0].go();play(PLOT.map(i=>()=>plotAt(T[i][0],T[i][1])))},go:()=>{reset();update();S.then=close(0,()=>PLOT.every(i=>S.put[i]===T[i][1]),'Seven points, joined in time order, make a line graph.')}},
   {h:'Read between the points',p:'Nobody read the thermometer at 9 am. Slide the time line there and read where it meets the graph.',
    predict:{q:'Nobody measured at 9 am. Can the graph tell us the temperature?',opts:['Yes: read the line between 8 am and 10 am','No: only the plotted points count','Only by guessing'],ans:0},
    task:'Read 3 in-between times',show:()=>{steps[1].go();play(READ.flatMap(q=>[()=>{S.cur=q[0];update()},()=>readAns(q[1],'ok')]))},go:()=>{reset();update();S.then=close(1,()=>S.ri>=READ.length,'9 am 13 °C, 1 pm 21 °C, 3 pm 22 °C: the line fills the gaps.')}},
   {h:'Steep, flat or falling',p:'A steep line means a fast change. A flat line means no change. Tap the part of the line that fits.',
    predict:{q:'When did it warm up fastest?',opts:['Where the line climbs most steeply','Where the line is highest','Where the line is longest'],ans:0},
    task:'Find 3 parts',show:()=>{steps[2].go();play(SEGQ.map(q=>()=>segTap(q[1])))},go:()=>{reset();update();S.then=close(2,()=>S.si>=SEGQ.length,'8 am to 10 am rose 6 °C, 2 pm to 4 pm stayed at 22 °C, and 4 pm to 6 pm fell 8 °C.')}},
   {h:'Read it backwards',p:'Now start from a temperature. Where does the line cross 18 °C? Tap each time.',
    predict:{q:'How many times was it 18 °C?',opts:['Twice: warming up and cooling down','Once','Never'],ans:0},
    task:'Find both times',show:()=>{steps[3].go();play([()=>crossTap(11),()=>crossTap(17)])},go:()=>{reset();update();S.then=close(3,()=>S.hits.length>=2,'11 am and 5 pm. A value can appear more than once on a line graph.')}},
   {h:'Line graph or bar chart?',p:'Join points only when the data changes over time. Separate groups need a bar chart.',
    task:'Sort 6 data sets',show:()=>{steps[4].go();play(CARDS.map(cd=>()=>sortTo(cd[1])))},go:()=>{reset();update();S.then=close(4,()=>S.ci>=CARDS.length,'Change over time: line graph. Separate groups: bar chart.')}},
   {h:'Challenge',p:'',go:()=>{reset();next()}}];
  steps.forEach(x=>{if(x.task)x.onPredict=()=>S.then()});
  // ---- challenge: every wrong answer names its slip ----
  const Q=[['On the graph, when did the temperature fall fastest?','4 pm to 6 pm',[['2 pm to 4 pm','high'],['6 am to 8 am','start']]],
   ['Each grid line is 2 °C. A point is 3 lines above 10 °C. What does it show?','16 °C',[['13 °C','ones'],['30 °C','tens']]],
   ['Between 2 pm and 4 pm the line is flat. What happened?','The temperature stayed at 22 °C',[['The temperature was 0 °C','zero'],['The thermometer was not read','gap']]],
   ['A graph shows how many children like each fruit. Should the points be joined?','No: use a bar chart',[['Yes: always join points','join'],['Yes, if the bars are tall','tall']]],
   ['What was the temperature at 9 am, halfway between 10 °C at 8 am and 16 °C at 10 am?','13 °C',[['10 °C','before'],['26 °C','add']]],
   ['How much warmer was it at 12 noon (20 °C) than at 6 am (8 °C)?','12 °C',[['28 °C','sum'],['20 °C','read']]]];
  function slip(tag){let m='Read the graph from the axes.';
   if(tag==='high')m='That is the highest part, but it is flat. Flat means no change, not the fastest change.';
   if(tag==='start')m='From 6 am to 8 am the line goes up, not down. Look for the steepest drop.';
   if(tag==='ones')m='Each line is worth 2 °C, not 1. Three lines is 6 °C: 10 + 6 = 16 °C.';
   if(tag==='tens')m='The scale goes up in 2s. 3 lines × 2 °C = 6 °C above 10 °C.';
   if(tag==='zero')m='A flat line can be high up. It means the value did not change: 22 °C all the time.';
   if(tag==='gap')m='The readings at 2 pm and 4 pm are both 22 °C. Flat means it stayed the same.';
   if(tag==='join')m='Only join points when the data changes over time. Fruits are separate groups.';
   if(tag==='tall')m='Bar height does not decide it. Separate groups never get joined.';
   if(tag==='before')m='10 °C is the 8 am reading. At 9 am the line is halfway up to 16 °C.';
   if(tag==='add')m='Do not add the readings. Halfway between 10 and 16 is 13.';
   if(tag==='sum')m='How much warmer means the difference: 20 − 8 = 12 °C.';
   if(tag==='read')m='20 °C is the temperature at noon. The question asks for the difference: 20 − 8.';
   return m}
  let qn=-1,run=0;
  function next(){qn++;const [q,ans,bad]=Q[qn%Q.length],all=[[ans,'ok']].concat(bad),k=qn%3,order=all.slice(k).concat(all.slice(0,k));
   quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
   const row=quiz.querySelector('.fl-pick');order.forEach(([w,tag])=>{const e=c.el('button',{type:'button',class:'lbtn'},row,w);e.onclick=()=>mark(tag,ans)});live('Challenge: '+q);A.redraw()}
  function mark(tag,ans){quiz.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=quiz.querySelector('.fl-fb');
   if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+run+'.':'✗ '+slip(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=next}
  A=FK.shell(c,{steps,ratio:.6,tall:1.05,draw,onStep:A=>{quiz.hidden=A.step!==5;keys.hidden=A.step===5;buttons()},
   init:A=>{const w=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}});
  A.start()})})();
