/* Flagship: Weather vs climate (ages 7-9; National Curriculum in England geography KS1 "seasonal and daily weather
   patterns", KS2 "climate zones"; NGSS 3-ESS2-1 and 3-ESS2-2: typical weather in a season, climates of regions).
   Open a week of April weather that changes day to day, stack 30 Julys and see the 30-year average hold steady past one
   heatwave July, drag one January day to -4 °C and watch the monthly average barely move, label three real climate
   graphs (Singapore, London, Cairo), and decide whether a question needs the forecast or the climate record.
   Not flagwxtype (naming weather types), flagcloud or flagwind. */
(()=>{
VIS.reg('flagwxclim',c=>{let A,ctl,chal,qn=-1,gen=0;const W={};c.fig.classList.add('young');
const INK='#0f172a',GOOD='#047857',BAD='#b91c1c',SUN='#d97706',RAIN='#2563eb',GREY='#64748b',HOT='#dc2626',TAU=Math.PI*2;
const WEEK=[['Mon','sun',12],['Tue','rain',9],['Wed','cloud',14],['Thu','rain',8],['Fri','sun',15],['Sat','cloud',11],['Sun','sun',13]];
const JULY=[22,23,21,22,24,22,21,23,22,22,23,21,26,22,23,22,21,22,23,24,22,22,21,23,22,23,22,21,22,23];
const JAN=[7,8,6,7,9,8,7,6,7,8,7,6,8,7,7,7,8,6,7,8,7,6,7,9,7,8,6,7,7,8,6];
const PLACES=[{n:'Singapore',r:[245,115,170,170,170,130,150,160,130,160,260,320],tag:2},{n:'London',r:[55,40,42,44,49,45,45,50,49,69,59,55],tag:0},{n:'Cairo',r:[5,4,4,1,0,0,0,0,0,1,3,5],tag:1}];
const TAGS=['Some rain every month','Almost no rain','Very wet every month'];
const ASK=[['Do I need a coat for school tomorrow?',0],['Which month is usually warmest in London?',1],['Will it rain on sports day this afternoon?',0],['Can banana trees grow outside all year here?',1]];
const kind=()=>['week','july','jan','graphs','ask','chal'][A.step];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const avg=a=>a.reduce((s,v)=>s+v,0)/a.length,one=v=>(Math.round(v*10)/10).toFixed(1);
function chip(t,x,y,o){o=o||{};const g=A.ctx;let px=o.px||(A.narrow?15:17);g.font=`800 ${px}px system-ui,sans-serif`;let w=g.measureText(t).width+20;
 while(w>A.W-10&&px>10){px--;g.font=`800 ${px}px system-ui,sans-serif`;w=g.measureText(t).width+20}const h=px+14,l=clamp(x-w/2,5,A.W-w-5);
 g.fillStyle='#ffffff';A.paint.rrect(l,y-h/2,w,h,11);g.fill();g.lineWidth=o.ok||o.bad?3:1.5;g.strokeStyle=o.ok?GOOD:o.bad?BAD:GREY;g.stroke();
 g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,l+w/2,y+1);return{x:l,y:y-h/2,w,h}}
function wash(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#e0f2fe',A.col.dark?.07:.65);g.fillRect(0,0,A.W,A.H)}
function icon(k,x,y,r){const g=A.ctx;if(k==='sun'){g.fillStyle=SUN;g.beginPath();g.arc(x,y,r*.5,0,TAU);g.fill();g.strokeStyle=SUN;g.lineWidth=2.5;for(let i=0;i<8;i++){const a=i*TAU/8;g.beginPath();g.moveTo(x+Math.cos(a)*r*.65,y+Math.sin(a)*r*.65);g.lineTo(x+Math.cos(a)*r*.9,y+Math.sin(a)*r*.9);g.stroke()}return}
 g.fillStyle=k==='rain'?'#475569':'#94a3b8';[[-.35,.05,.38],[.05,-.12,.48],[.42,.08,.34]].forEach(([dx,dy,s])=>{g.beginPath();g.arc(x+dx*r,y+dy*r,s*r,0,TAU);g.fill()});
 if(k==='rain'){g.strokeStyle=RAIN;g.lineWidth=2.5;[-.35,0,.35].forEach(dx=>{g.beginPath();g.moveTo(x+dx*r,y+r*.5);g.lineTo(x+dx*r-4,y+r*.85);g.stroke()})}}
/* step 0: seven face-down day cards */
function cards(){const n=7,gap=6,w=Math.min(84,(A.W-gap*(n+1))/n),h=w*1.7,x0=(A.W-(w*n+gap*(n-1)))/2;return WEEK.map((d,i)=>({i,x:x0+i*(w+gap),y:A.H*.3,w,h}))}
function drawWeek(){const g=A.ctx,S=W.w;wash();chip('One town, one week in April',A.W/2,A.H*.1,{ok:S.done});
 cards().forEach(k=>{const d=WEEK[k.i],open=S.open.has(k.i);g.fillStyle=open?'#ffffff':'#1e293b';A.paint.rrect(k.x,k.y,k.w,k.h,10);g.fill();g.strokeStyle=GREY;g.lineWidth=1.5;g.stroke();
  g.fillStyle=open?INK:'#ffffff';g.font=`800 ${A.narrow?11:14}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(d[0],k.x+k.w/2,k.y+14);
  if(open){icon(d[1],k.x+k.w/2,k.y+k.h*.45,k.w*.42);g.fillStyle=INK;g.font=`800 ${A.narrow?12:16}px system-ui,sans-serif`;g.fillText(d[2]+'°C',k.x+k.w/2,k.y+k.h*.82)}else{g.font=`800 ${A.narrow?20:28}px system-ui,sans-serif`;g.fillText('?',k.x+k.w/2,k.y+k.h*.55)}});
 chip(S.done?'7 days, 3 kinds of sky, 8 to 15 °C':'Tap a card to see that day',A.W/2,A.H*.9,{px:12,ok:S.done})}
function openDay(i){const S=W.w;if(i==null)i=[0,1,2,3,4,5,6].find(j=>!S.open.has(j));if(i==null)return;S.open.add(i);A.sound.pop();const d=WEEK[i];
 if(S.open.size===7)S.done=1;tell(`${d[0]}: ${d[1]==='sun'?'sunny':d[1]==='rain'?'rainy':'cloudy'}, ${d[2]} °C.`+(S.done?' The weather changed almost every day: that is weather, what the air is doing right now.':` ${S.open.size} of 7 days open.`))}
/* step 1: thirty Julys as bars */
function drawJuly(){const g=A.ctx,S=W.j;wash();const n=S.n,bw=(A.W-52)/30,base=A.H*.8,sc=A.H*.5/12,Y=v=>base-(v-16)*sc;
 g.fillStyle=A.col.tx;g.font='700 10px system-ui,sans-serif';g.textAlign='left';g.textBaseline='bottom';[16,20,24,28].forEach(v=>g.fillText(v+'°',2,Y(v)-1));
 g.strokeStyle=A.col.tx;g.lineWidth=1.5;g.beginPath();g.moveTo(32,base);g.lineTo(A.W-20,base);g.stroke();
 for(let i=0;i<n;i++){const v=JULY[i];g.fillStyle=v>=25?HOT:SUN;g.fillRect(32+i*bw+1,Y(v),bw-2,(v-16)*sc)}
 if(n){const m=avg(JULY.slice(0,n)),y=Y(m);g.setLineDash([7,5]);g.strokeStyle=A.col.tx;g.lineWidth=2.5;g.beginPath();g.moveTo(30,y);g.lineTo(A.W-16,y);g.stroke();g.setLineDash([]);
  chip(`Average of ${n} Julys: ${one(m)} °C`,A.W/2,A.H*.17,{ok:S.done,px:A.narrow?13:15})}
 chip(`July highs in London: ${n} of 30 years`,A.W/2,A.H*.06,{px:A.narrow?12:14});chip(S.done?'One hot July, the same usual pattern':'Tap the chart to add 5 more years',A.W/2,A.H*.92,{px:12,ok:S.done})}
function addYears(){const S=W.j;if(S.n>=30)return;S.n+=5;if(S.n>=30)S.done=1;A.sound.tick();const m=avg(JULY.slice(0,S.n));
 tell(`${S.n} Julys on the chart. The average is ${one(m)} °C.`+(S.n>=15&&S.n<30?' Year 13 was a 26 °C heatwave, the red bar, but the average hardly moved.':'')+(S.done?' After 30 years the typical July is about 22 °C. That long pattern is the climate.':''))}
/* step 2: one January day dragged colder */
function janXY(i,v){const bw=(A.W-40)/31,top=A.H*.18,bot=A.H*.78;return{x:20+bw*(i+.5),y:bot-(v+6)*(bot-top)/18}}
function drawJan(){const g=A.ctx,S=W.n;wash();const top=janXY(0,12).y,zero=janXY(0,0).y,bot=janXY(0,-6).y;
 g.strokeStyle=A.alpha(A.col.tx,.35);g.lineWidth=1;[12,6,0,-6].forEach(v=>{const y=janXY(0,v).y;g.beginPath();g.moveTo(18,y);g.lineTo(A.W-18,y);g.stroke();g.fillStyle=A.col.tx;g.font='700 10px system-ui,sans-serif';g.textAlign='left';g.textBaseline='bottom';g.fillText(v+'°',20,y-1)});
 S.t.forEach((v,i)=>{const p=janXY(i,v);g.fillStyle=i===14?RAIN:GREY;g.beginPath();g.arc(p.x,p.y,i===14?(A.narrow?9:11):4,0,TAU);g.fill()});
 const m=avg(S.t),y=janXY(0,m).y;g.setLineDash([7,5]);g.strokeStyle=GOOD;g.lineWidth=2.5;g.beginPath();g.moveTo(16,y);g.lineTo(A.W-16,y);g.stroke();g.setLineDash([]);
 chip(`January average: ${one(m)} °C`,A.W/2,A.H*.08,{ok:S.done,px:A.narrow?14:16});chip(`Day 15: ${S.t[14]} °C. Drag the blue dot down`,A.W/2,A.H*.92,{px:12,bad:S.t[14]<0&&!S.done})}
function setDay(v){const S=W.n;v=clamp(Math.round(v),-4,9);if(v===S.t[14])return;S.t[14]=v;if(v===-4)S.done=1;A.sound.tick();
 tell(`Day 15 is now ${v} °C. The January average is ${one(avg(S.t))} °C.`+(S.done?' One freezing day moved the average by only about a third of a degree. A single cold day is weather; it does not change the climate.':''))}
/* step 3: climate graphs */
function panels(){const n=3,gap=8,w=(A.W-gap*(n+1))/n;return PLACES.map((p,i)=>({i,x:gap+i*(w+gap),y:A.H*.16,w,h:A.H*.5}))}
function tagRects(){const n=3,gap=6,w=(A.W-gap*(n+1))/n;return TAGS.map((t,i)=>({i,x:gap+i*(w+gap),y:A.H*.76,w,h:A.H*.16}))}
function drawGraphs(){const g=A.ctx,S=W.g;wash();chip('Rain in each month (mm)',A.W/2,A.H*.07,{px:A.narrow?12:15,ok:S.done});
 panels().forEach(P=>{const pl=PLACES[P.i],got=S.lab[P.i]!=null;g.fillStyle='#ffffff';A.paint.rrect(P.x,P.y,P.w,P.h,10);g.fill();g.strokeStyle=got?GOOD:GREY;g.lineWidth=got?3:1.5;g.stroke();
  const bw=(P.w-12)/12,sc=(P.h-44)/330;pl.r.forEach((v,m)=>{g.fillStyle=RAIN;g.fillRect(P.x+6+m*bw+.5,P.y+P.h-8-v*sc,bw-1,Math.max(1,v*sc))});
  g.fillStyle=INK;g.font=`800 ${A.narrow?10:13}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='top';g.fillText(got?pl.n:'Place '+'ABC'[P.i],P.x+P.w/2,P.y+6);
  if(got){g.font=`700 ${A.narrow?9:11}px system-ui,sans-serif`;g.fillText(TAGS[S.lab[P.i]],P.x+P.w/2,P.y+22,P.w-6)}});
 tagRects().forEach(T=>{const used=S.lab.includes(T.i),sel=S.sel===T.i;g.fillStyle=used?'#e2e8f0':sel?'#7c3aed':'#1e293b';A.paint.rrect(T.x,T.y,T.w,T.h,10);g.fill();
  g.fillStyle=used?'#334155':'#ffffff';g.font=`800 ${A.narrow?10:13}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';const ws=TAGS[T.i].split(' '),h2=Math.ceil(ws.length/2);
  g.fillText(ws.slice(0,h2).join(' '),T.x+T.w/2,T.y+T.h*.35,T.w-6);g.fillText(ws.slice(h2).join(' '),T.x+T.w/2,T.y+T.h*.68,T.w-6)})}
function pickTag(i){const S=W.g;if(S.lab.includes(i))return;S.sel=i;A.sound.tick();tell(`"${TAGS[i]}" picked. Now tap the graph it matches.`)}
function putTag(p,t){const S=W.g;if(t==null)t=S.sel;if(t==null||t<0)return tell('Tap a label first, then a graph.');if(S.lab[p]!=null)return;
 if(PLACES[p].tag!==t){A.sound.miss();S.sel=-1;const tot=PLACES[p].r.reduce((a,b)=>a+b,0);return tell(`Not this one. Place ${'ABC'[p]} gets about ${tot} mm in a whole year. Look at how tall the bars are in every month.`)}
 S.lab[p]=t;S.sel=-1;A.sound.pop();if(S.lab.every(v=>v!=null))S.done=1;const pl=PLACES[p];
 tell(`Yes: Place ${'ABC'[p]} is ${pl.n}. ${TAGS[t]}.`+(S.done?' Each graph shows the usual rain over many years. That is each place\'s climate, and it stays the same even on a day that breaks the pattern.':''))}
/* step 4: forecast or climate */
function sides(){return[{k:0,x:8,y:A.H*.42,w:A.W/2-12,h:A.H*.4},{k:1,x:A.W/2+4,y:A.H*.42,w:A.W/2-12,h:A.H*.4}]}
function drawAsk(){const g=A.ctx,S=W.a;wash();const q=ASK[S.k];chip(S.k<4?`${S.k+1} of 4`:'All 4 answered',A.W/2,A.H*.08,{px:12,ok:S.k>=4});
 if(q)chip(q[0],A.W/2,A.H*.25,{px:A.narrow?13:17});
 sides().forEach(s=>{g.fillStyle=s.k?'#065f46':'#1e3a8a';A.paint.rrect(s.x,s.y,s.w,s.h,14);g.fill();g.fillStyle='#ffffff';g.font=`800 ${A.narrow?14:18}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';
  g.fillText(s.k?'Climate record':'Weather forecast',s.x+s.w/2,s.y+s.h*.35,s.w-8);g.font=`700 ${A.narrow?10:13}px system-ui,sans-serif`;g.fillText(s.k?'the usual pattern, many years':'today and the next few days',s.x+s.w/2,s.y+s.h*.65,s.w-8)});
 if(S.last)chip(S.last,A.W/2,A.H*.92,{px:A.narrow?11:13,ok:S.ok,bad:!S.ok})}
function answer(k){const S=W.a;if(S.k>=4)return;const q=ASK[S.k];if(k!==q[1]){A.sound.miss();S.ok=0;S.last=k?'Climate is the usual pattern, not this week':'A forecast only covers the next few days';
  return tell(k?'The climate record tells you what is usual, not what will happen tomorrow or this afternoon. You need the forecast.':'A forecast only looks a few days ahead. This question is about what is usual over many years: the climate.')}
 S.k++;S.ok=1;S.last=q[1]?'Climate: what is usual':'Weather: the next few hours or days';A.sound.pop();tell(`"${q[0]}" Yes, ${q[1]?'check the climate record':'check the weather forecast'}.`+(S.k>=4?' All 4 done.':''))}
function draw(){const k=kind();if(k==='chal'){wash();chip('Challenge',A.W/2,A.H*.14,{ok:1});chip('Weather: now. Climate: the usual, over 30 years',A.W/2,A.H*.5,{px:A.narrow?12:16});return}
 ({week:drawWeek,july:drawJuly,jan:drawJan,graphs:drawGraphs,ask:drawAsk})[k]();A.fx.draw(A.ctx)}
const inside=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
function down(p){const k=kind();if(k==='jan'){const q=janXY(14,W.n.t[14]);if(Math.hypot(p.x-q.x,p.y-q.y)<44){W.drag=1;return true}return false}
 if(k==='week'){const r=cards().find(r=>inside(p,r));if(r&&!W.w.open.has(r.i))openDay(r.i);return false}
 if(k==='july'){addYears();return false}
 if(k==='graphs'){const t=tagRects().find(r=>inside(p,r));if(t){pickTag(t.i);return false}const P=panels().find(r=>inside(p,r));if(P)putTag(P.i);return false}
 if(k==='ask'){const s=sides().find(r=>inside(p,r));if(s)answer(s.k);return false}return false}
function move(p){if(!W.drag)return;const top=janXY(0,12).y,bot=janXY(0,-6).y;const v=-6+(bot-p.y)*18/(bot-top);W.n.t[14]=clamp(Math.round(v),-4,9);A.redraw()}
function up(){if(!W.drag)return;W.drag=0;const v=W.n.t[14];W.n.t[14]=99;setDay(v)}
function fresh(){gen++;for(const k in W)delete W[k];Object.assign(W,{w:{open:new Set(),done:0},j:{n:0,done:0},n:{t:JAN.slice(),done:0},g:{lab:[null,null,null],sel:-1,done:0},a:{k:0,last:'',ok:0},drag:0,hit:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();pads();W.hit()}
const check=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,desc,ok,msg){fresh();tell(desc);W.hit=check(i,ok,msg)}
function play(i,acts,ms){steps[i].go();const g0=gen;acts.forEach((f,j)=>setTimeout(()=>{if(g0===gen)f()},ms*(j+1)))}
function pads(){if(!ctl)return;ctl.innerHTML='';const k=kind(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(k==='week'&&!W.w.done)B('Open the next day',()=>openDay());
 if(k==='july'&&!W.j.done)B('Add 5 more years',addYears,'Add 5 more Julys to the chart');
 if(k==='jan'){B('Colder by 2 °C',()=>setDay(W.n.t[14]-2),'Make day 15 two degrees colder');B('Warmer by 2 °C',()=>setDay(W.n.t[14]+2),'Make day 15 two degrees warmer')}
 if(k==='graphs'&&!W.g.done)PLACES.forEach((pl,p)=>{if(W.g.lab[p]==null)TAGS.forEach((t,j)=>{if(!W.g.lab.includes(j))B(`${'ABC'[p]}: ${t}`,()=>putTag(p,j),`Label place ${'ABC'[p]} as ${t}`)})});
 if(k==='ask'&&W.a.k<4){B('Weather forecast',()=>answer(0),'Check the weather forecast');B('Climate record',()=>answer(1),'Check the climate record')}}
const steps=[
{h:'A week of weather',p:'Here is one town for one week. Tap each card, or tap the button, to see that day.',
 predict:{q:'Will every day this week have the same weather?',opts:['Yes, it stays the same all week','No, it can change from day to day'],ans:1},task:'Open all 7 days',
 show:()=>play(0,[0,1,2,3,4,5,6].map(i=>()=>openDay(i)),380),
 go:()=>begin(0,'Seven face-down cards, one for each day of a week in April.',()=>W.w.done,'Sun, cloud and rain, and 8 to 15 °C, all in one week. Weather is what the air is doing at one time, and it changes.')},
{h:'Thirty Julys',p:'Each bar is the average daytime high in London for the July of one year. Tap the chart to add 5 years at a time.',
 predict:{q:'One July was a 26 °C heatwave. Does that change the climate?',opts:['Yes, the climate is hotter now','No, the 30-year pattern stays about the same'],ans:1},task:'Add all 30 years',
 show:()=>play(1,[0,1,2,3,4,5].map(()=>()=>addYears()),420),
 go:()=>begin(1,'An empty chart for July temperatures, years 1 to 30.',()=>W.j.done,'The red heatwave bar sticks up, but the dashed average stays near 22 °C. Climate is the usual weather over about 30 years.')},
{h:'One cold day',p:'Each dot is one January day. Drag the blue dot, day 15, down to −4 °C, or use the buttons. Watch the green average line.',
 predict:{q:'Day 15 drops to −4 °C. What happens to the January average?',opts:['It falls a lot, close to −4 °C','It hardly moves, less than half a degree'],ans:1},task:'Make day 15 −4 °C',
 show:()=>play(2,[()=>setDay(3),()=>setDay(-1),()=>setDay(-4)],600),
 go:()=>begin(2,'31 January days, most between 6 and 9 °C, with an average line at 7.2 °C.',()=>W.n.done,'The average fell from 7.2 to 6.8 °C. One cold day is weather. It hardly moves the usual pattern.')},
{h:'Three climates',p:'Each graph is the usual rain for each month in a real place. Tap a label, then tap the graph it fits.',
 predict:{q:'It rained in Cairo last week. Is Cairo\'s climate wet?',opts:['Yes, it rained, so it is wet','No, one rainy day is weather; Cairo\'s climate is dry'],ans:1},task:'Label all 3 graphs',
 show:()=>play(3,PLACES.map((pl,p)=>()=>putTag(p,pl.tag)),650),
 go:()=>begin(3,'Three rainfall graphs, place A, B and C, and three labels.',()=>W.g.done,'Singapore is very wet every month, London gets some rain every month, and Cairo gets almost none. Each place has its own climate.')},
{h:'Forecast or climate?',p:'Read each question. Tap the side that answers it: the weather forecast, or the climate record.',task:'Answer all 4 questions',
 show:()=>play(4,ASK.map(q=>()=>answer(q[1])),650),
 go:()=>begin(4,'A question, with Weather forecast on the left and Climate record on the right.',()=>W.a.k>=4,'Tomorrow or this afternoon needs the forecast. What is usual, or what can grow, needs the climate.')},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>W.hit()});
const QS=[
 {q:'It snowed today. Is the climate getting colder?',a:'No, one day is weather',o:[['Yes, the snow proves it','one'],['Yes, climate is today\'s weather','same']]},
 {q:'Climate means…',a:'the usual weather over about 30 years',o:[['what the sky is doing now','same'],['the weather for one week','short']]},
 {q:'Which one is about weather?',a:'A storm is coming tonight',o:[['Deserts get very little rain','swap'],['Summers here are usually warm','swap']]},
 {q:'One rainy day in Cairo. Cairo\'s climate is…',a:'still dry',o:[['now wet','one'],['different every day','same']]},
 {q:'To choose what to wear tomorrow, check…',a:'the weather forecast',o:[['the climate graph','tool'],['last summer\'s photos','tool']]},
 {q:'Which is about climate?',a:'Winters here are usually cold',o:[['It is foggy this morning','swap'],['It will be windy later','swap']]}];
function why(t){let m='Weather is now or the next few days. Climate is the usual pattern over many years.';
 if(t==='one')m='One day, or one week, is weather. The climate only changes if the pattern changes over many years.';
 if(t==='same')m='That is weather: what the air is doing at one time. Climate is the average of many years of weather.';
 if(t==='short')m='A week is far too short. Climate is worked out from about 30 years of weather.';
 if(t==='swap')m='Words like usually and very little describe the long pattern: climate. Tonight, this morning and later are weather.';
 if(t==='tool')m='A climate graph shows what is usual, not what tomorrow will bring. For tomorrow you need the forecast.';
 return m}
function ask(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.6,tall:1.05,draw,onStep:B=>{chal.hidden=B.step!==5;ctl.hidden=B.step===5;pads()},
 init:B=>{A=B;const wrap=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Weather and climate controls'},wrap);chal=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});pads()}}).start()})})();
