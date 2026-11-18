/* Flagship: days, weeks, months and years (ages 5-6). Build the week wheel day by day, turn the Today arrow past
   Sunday to see the week start again, hop on to find a day in 3 days, build the year wheel of 12 months, then fill
   a 30-day month with whole weeks and a year with months. Big targets; every canvas tap has a button too. */
(()=>{
const DAYS=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
const MIX7=[3,0,5,1,6,2,4],MIX12=[7,2,10,0,5,11,3,8,1,9,4,6],HOPS=[[3,3],[5,4],[1,2]];
VIS.reg('flagcal',c=>{let A,pad,quiz,qn=-1,streak=0;const K={};
const mode=()=>['week','turn','hop','year','fill','chal'][A.step];
const ding=k=>A.sound[k](),paintNow=()=>A.redraw(),both=()=>{paintNow();keys()};
function tell(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
const ink=()=>A.col.tx,hue=i=>['#1d4ed8','#be185d','#a16207','#15803d','#c2410c','#7e22ce','#0f766e'][i%7];/* dark fills keep white labels above 4.5:1 in both themes */
function txt(t,x,y,px,col,w){const g=A.ctx;g.font=`${w||800} ${Math.round(px*(A.narrow?1:1.1))}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||ink();g.fillText(t,x,y,A.W-16)}
function chip(x,y,w,h,fill,label,px,on){const g=A.ctx;A.paint.rrect(x-w/2,y-h/2,w,h,h/2.4);g.fillStyle=fill;g.fill();g.lineWidth=on?4:2;g.strokeStyle=on?(A.col.dark?'#fde047':'#111827'):A.alpha(ink(),.55);g.stroke();if(label)txt(label,x,y+1,px,'#fff',800)}
/* the wheel: n chips round a circle, starting at the top and going clockwise */
function wheel(n){const big=A.H*(n===7?.31:.3),R=Math.min(A.W*.37,big),cx=A.W/2,cy=A.H*(mode()==='turn'||mode()==='hop'?.47:.4);
 return{cx,cy,R,at:i=>{const a=-Math.PI/2+i*2*Math.PI/n;return{x:cx+R*Math.cos(a),y:cy+R*Math.sin(a)}},cw:n===7?Math.min(96,A.W*.25):Math.min(70,A.W*.17),ch:n===7?32:28}}
const name7=i=>A.narrow&&mode()!=='week'?DAYS[i].slice(0,3):DAYS[i],name12=i=>MONTHS[i].slice(0,3);
function drawWheel(g,n,shown,hl){const Wh=wheel(n);g.strokeStyle=A.alpha(ink(),.3);g.lineWidth=3;g.beginPath();g.arc(Wh.cx,Wh.cy,Wh.R,0,7);g.stroke();
 for(let i=0;i<n;i++){const p=Wh.at(i),has=shown(i);if(has)chip(p.x,p.y,Wh.cw,Wh.ch,hue(i),n===7?name7(i):name12(i),n===7?13:12,hl===i);
  else{g.setLineDash([5,4]);A.paint.rrect(p.x-Wh.cw/2,p.y-Wh.ch/2,Wh.cw,Wh.ch,12);g.fillStyle=A.col.pn;g.fill();g.strokeStyle=A.alpha(ink(),.6);g.lineWidth=2;g.stroke();g.setLineDash([]);txt(String(i+1),p.x,p.y+1,13,A.col.mu,700)}}
 return Wh}
/* the tray of shuffled cards under the wheel */
function tray(n){const cols=4,rows=Math.ceil(n/cols),gap=8,w=(A.W-gap*(cols+1))/cols,h=n===7?40:34,y0=A.H-(rows*(h+gap))-6;
 return (n===7?MIX7:MIX12).map((v,k)=>({v,x:gap+(k%cols)*(w+gap),y:y0+Math.floor(k/cols)*(h+gap),w,h}))}
function drawTray(g,n){const list=n===7?DAYS:MONTHS;tray(n).forEach(t=>{if(K.put.includes(t.v))return;A.paint.rrect(t.x,t.y,t.w,t.h,12);g.fillStyle=hue(t.v);g.fill();txt(list[t.v],t.x+t.w/2,t.y+t.h/2+1,A.narrow?13:15,'#fff',800)})}
function paint(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#fef9c3',C.dark?.04:.35);g.fillRect(0,0,W,H);const m=mode();
 if(m==='week'||m==='year'){const n=m==='week'?7:12;const Wh=drawWheel(g,n,i=>K.put.includes(i),-1);drawTray(g,n);
  txt(K.put.length<n?`${K.put.length} of ${n}`:(n===7?'7 days = 1 week':'12 months = 1 year'),Wh.cx,Wh.cy-8,n===7?20:18);txt(K.put.length<n?'Tap the next one':'In order!',Wh.cx,Wh.cy+18,13,C.mu,700)}
 if(m==='turn'||m==='hop'){if(m==='hop')trail(g,C);const Wh=drawWheel(g,7,()=>1,K.day);const p=Wh.at(K.day);
  g.strokeStyle=C.tx;g.lineWidth=5;g.lineCap='round';g.beginPath();g.moveTo(Wh.cx,Wh.cy);g.lineTo(Wh.cx+(p.x-Wh.cx)*.62,Wh.cy+(p.y-Wh.cy)*.62);g.stroke();A.paint.ball(Wh.cx,Wh.cy,9,C.dark?'#fde047':'#b45309');
  if(m==='hop'){const P=HOPS[K.pz%3];txt(`Start: ${DAYS[P[0]]}. Hop ${P[1]} days.`,W/2,H*.06,15);txt(`Hops so far: ${K.trail.length}`,W/2,H*.95,15,C.tx,700)}
  else{txt('Today is '+DAYS[K.day],W/2,H*.06,17);txt(`Yesterday: ${DAYS[(K.day+6)%7]}   Tomorrow: ${DAYS[(K.day+1)%7]}`,W/2,H*.95,A.narrow?13:15,C.tx,700)}}
 if(m==='fill')drawFill(g,W,H,C);
 if(m==='chal'){drawWheel(g,7,()=>1,-1);txt('7 days, 12 months',W/2,H*.4,18)}
 A.fx.draw(g)}
/* April as a calendar page (7 columns), then the year as 12 blocks */
/* hop arcs bulge outside the wheel, numbered 1, 2, 3 ... so today is never counted */
function trail(g,C){const Wh=wheel(7);(K.trail||[]).forEach((d,k)=>{const a=Wh.at(d),b=Wh.at((d+1)%7),mx=(a.x+b.x)/2,my=(a.y+b.y)/2,ox=(mx-Wh.cx)*.32,oy=(my-Wh.cy)*.32;g.strokeStyle=C.dark?'#fde047':'#b45309';g.lineWidth=3;g.beginPath();g.moveTo(a.x,a.y);g.quadraticCurveTo(mx+ox,my+oy,b.x,b.y);g.stroke();
 A.paint.label(String(k+1),mx+ox*.85,my+oy*.85,{bg:C.dark?'#854d0e':'#92400e',font:'800 14px system-ui,sans-serif'})})}
function grid(){const cols=7,gap=5,cs=Math.min((A.W-gap*8)/7,A.H*.09),x0=(A.W-(cs*7+gap*6))/2,y0=A.H*.12;return{cs,gap,x0,y0,at:d=>({x:x0+(d%cols)*(cs+gap),y:y0+Math.floor(d/cols)*(cs+gap)})}}
function blocks(){const G=grid(),gap=6,w=(A.W-gap*7)/6,h=Math.min(40,A.H*.085),y0=G.y0+5*(G.cs+G.gap)+56;return MONTHS.map((m,i)=>({x:gap+(i%6)*(w+gap),y:y0+Math.floor(i/6)*(h+gap),w,h}))}
function drawFill(g,W,H,C){const G=grid();txt('April has 30 days',W/2,H*.06,16);
 for(let d=0;d<30;d++){const p=G.at(d),wk=Math.floor(d/7),inW=d<K.days;A.paint.rrect(p.x,p.y,G.cs,G.cs,6);g.fillStyle=inW?(d<K.weeks*7?hue(wk):(C.dark?'#475569':'#64748b')):C.pn;g.fill();g.lineWidth=1.5;g.strokeStyle=A.alpha(C.tx,.5);g.stroke();txt(String(d+1),p.x+G.cs/2,p.y+G.cs/2+1,12,inW?'#fff':C.tx,700)}
 const yy=G.y0+5*(G.cs+G.gap)+16;txt(`${K.weeks} week${K.weeks===1?'':'s'} and ${K.days-K.weeks*7} day${K.days-K.weeks*7===1?'':'s'}`,W/2,yy,15,C.tx,700);
 blocks().forEach((b,i)=>{const on=i<K.months;A.paint.rrect(b.x,b.y,b.w,b.h,8);g.fillStyle=on?hue(i):C.pn;g.fill();g.lineWidth=1.5;g.strokeStyle=A.alpha(C.tx,.5);g.stroke();txt(name12(i),b.x+b.w/2,b.y+b.h/2+1,12,on?'#fff':C.tx,700)});
 txt(`${K.months} of 12 months in the year`,W/2,yy+25,14,C.tx,700)}
function place(v){const m=mode(),n=m==='week'?7:12,list=n===7?DAYS:MONTHS;if((m!=='week'&&m!=='year')||K.put.length>=n)return;
 if(K.put.includes(v)){tell(`${list[v]} is on the wheel already.`);return}
 const want=K.put.length;if(v!==want){ding('miss');tell(want===0?(n===7?`That is ${list[v]}. The week starts with Monday here.`:`That is ${list[v]}. The year starts with January.`):`That is ${list[v]}. We need the one after ${list[want-1]}.`);return}
 K.put.push(v);ding('pop');tell(K.put.length<n?`${list[v]}! What comes after ${list[v]}?`:(n===7?'Sunday! That is all 7 days, in order. 7 days make 1 week.':'December! That is all 12 months, in order. 12 months make 1 year.'));both();K.want()}
function setDay(d){if(mode()!=='turn')return;d=(d+7)%7;if(d===K.day)return;const fwd=(K.day+1)%7===d,back=(K.day+6)%7===d;
 if(!fwd&&!back){tell('Move one day at a time, to the next day or the day before.');return}
 if(fwd&&K.day===6)K.wrap=1;if(back)K.back=1;K.day=d;ding('tick');
 tell((fwd&&d===0?'After Sunday the week starts again. ':'')+`Today is ${DAYS[d]}. Yesterday was ${DAYS[(d+6)%7]}. Tomorrow is ${DAYS[(d+1)%7]}.`+(K.wrap&&!K.back?' Now go back one day.':''));both();K.want()}
function startHop(){const P=HOPS[K.pz%3];K.day=P[0];K.trail=[];tell(`Today is ${DAYS[P[0]]}. Hop on ${P[1]} days. Do not count today.`)}
function hop(){if(mode()!=='hop')return;if(K.trail.length>=7){tell('That is a whole week. Press Start again.');return}K.trail.push(K.day);K.day=(K.day+1)%7;ding('tick');tell(`Hop ${K.trail.length}: ${DAYS[K.day]}.`);both()}
function check(){if(mode()!=='hop')return;const P=HOPS[K.pz%3],n=K.trail.length;let msg;
 if(n===P[1]){K.solved++;ding('pop');msg=`Yes! ${P[1]} days after ${DAYS[P[0]]} is ${DAYS[K.day]}.`;if(K.solved<2){K.pz++;startHop();msg+=' Try the next one.'}}
 else if(n===P[1]-1)msg=`That is ${n} hops. Did you count ${DAYS[P[0]]} as 1? Today is not a hop. Hop once more.`;
 else msg=n<P[1]?`Only ${n} hops. You need ${P[1]}.`:`That is ${n} hops, too many. Press Start again.`;
 if(n!==P[1])ding('miss');tell(msg);both();K.want()}
function addWeek(){if(mode()!=='fill')return;if(K.days+7<=30){K.days+=7;K.weeks++;ding('pop');tell(`${K.weeks} week${K.weeks>1?'s':''} = ${K.days} days.`+(K.days+7>30?' Another week will not fit! Add single days.':''))}else tell('A whole week will not fit. Only '+(30-K.days)+' days are left. Add a day.');both();K.want()}
function addDay(){if(mode()!=='fill'||K.days>=30)return;if(30-K.days>=7){tell('Fill whole weeks first: 7 days at a time.');return}K.days++;ding('tick');tell(K.days===30?'April is full: 4 weeks and 2 days. A month is a bit longer than 4 weeks.':`Day ${K.days}.`);both();K.want()}
function addMonth(){if(mode()!=='fill')return;if(K.days<30){tell('Fill April first.');return}if(K.months>=12)return;K.months++;ding('tick');tell(K.months===12?'12 months make 1 year. A year is about 52 weeks.':`${MONTHS[K.months-1]}: ${K.months} month${K.months>1?'s':''}.`);both();K.want()}
const hitR=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function nearDay(p){const Wh=wheel(7);let best=-1,bd=1e9;for(let i=0;i<7;i++){const q=Wh.at(i),d=Math.hypot(p.x-q.x,p.y-q.y);if(d<bd){bd=d;best=i}}return bd<Wh.cw?best:-1}
function down(p){const m=mode();
 if(m==='week'||m==='year'){const t=tray(m==='week'?7:12).find(t=>!K.put.includes(t.v)&&hitR(p,t));if(t)place(t.v);return false}
 if(m==='turn'){K.drag=1;const d=nearDay(p);if(d>=0)setDay(d);return true}
 if(m==='hop'){const d=nearDay(p);if(d===(K.day+1)%7)hop();else if(d>=0&&d!==K.day){ding('miss');tell('Hop one day at a time: tap the very next day.')}return false}
 if(m==='fill'){const G=grid();for(let d=0;d<30;d++){const q=G.at(d);if(hitR(p,{x:q.x,y:q.y,w:G.cs,h:G.cs})){30-K.days>=7?addWeek():addDay();return false}}if(blocks().some(b=>hitR(p,b)))addMonth()}return false}
function move(p){if(K.drag&&mode()==='turn'){const d=nearDay(p);if(d>=0)setDay(d)}}
function up(){K.drag=0}
function keys(){if(!pad)return;pad.innerHTML='';const m=mode(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||null},pad,t).onclick=f};
 if(m==='week'||m==='year'){const n=m==='week'?7:12;(n===7?MIX7:MIX12).forEach(v=>{if(!K.put.includes(v))b(n===7?DAYS[v]:MONTHS[v],()=>place(v))})}
 if(m==='turn'){b('◀ Yesterday',()=>setDay(K.day-1),'Go back one day');b('Tomorrow ▶',()=>setDay(K.day+1),'Go on one day')}
 if(m==='hop'){b('Hop 1 day ▶',hop,'Hop on one day');b('This is the day!',check);b('Start again',()=>{startHop();both()})}
 if(m==='fill'){b('Add a week (7 days)',addWeek);b('Add 1 day',addDay);b('Add a month',addMonth)}}
const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function auto(n,acts,ms){steps[n].go();const k=++K.run;acts.forEach((f,j)=>setTimeout(()=>{if(k===K.run)f()},A.reduced()?30*(j+1):(j+1)*(ms||380)))}
function fresh(){const run=(K.run||0)+1;for(const x in K)delete K[x];Object.assign(K,{run,want:()=>{},put:[],day:4,wrap:0,back:0,drag:0,trail:[],pz:0,solved:0,days:0,weeks:0,months:0})}
const steps=[
{h:'Seven days',p:'A week has 7 days, and they always come in the same order. Here the week starts on Monday. Some calendars start on Sunday, but the order stays the same.',
 predict:{q:'How many days are in one week?',opts:['5 days','7 days','10 days'],ans:1},task:'Put the 7 days on the wheel in order',
 show:()=>auto(0,DAYS.map((d,i)=>()=>place(i))),
 go:()=>{fresh();tell('Tap the days in order. Start with Monday.');keys();K.want=fin(0,()=>K.put.length===7,'7 days, in order, make 1 week.')}},
{h:'After Sunday',p:'Today is the day we are in now. Yesterday was the day before. Tomorrow is the day after. The days go round and round like a wheel.',
 predict:{q:'What day comes after Sunday?',opts:['None: the week is over','Monday','Saturday'],ans:1},task:'Go on from Friday past Sunday, then go back one day',
 show:()=>auto(1,[()=>setDay(5),()=>setDay(6),()=>setDay(0),()=>setDay(6)]),
 go:()=>{fresh();K.day=4;tell('Today is Friday. Tap Tomorrow, or drag the arrow round.');keys();K.want=fin(1,()=>K.wrap&&K.back,'After Sunday comes Monday again: the week goes round.')}},
{h:'Hop on',p:'To find the day in 3 days, start on today and hop 3 times. Today is not a hop. The first hop lands on tomorrow.',
 task:'Solve 2 hop puzzles',
 show:()=>auto(2,[hop,hop,hop,check,hop,hop,hop,hop,check]),
 go:()=>{fresh();startHop();keys();K.want=fin(2,()=>K.solved>=2,'You counted on from the next day, not from today.')}},
{h:'Twelve months',p:'A month is a much longer part of the year. There are 12 months, from January to December. Then a new year starts with January again.',
 predict:{q:'How many months are in a year?',opts:['7','12','52'],ans:1},task:'Put the 12 months on the wheel in order',
 show:()=>auto(3,MONTHS.map((m,i)=>()=>place(i)),300),
 go:()=>{fresh();tell('Tap the months in order. Start with January.');keys();K.want=fin(3,()=>K.put.length===12,'12 months, in order, make 1 year.')}},
{h:'Weeks, months, years',p:'Days make weeks, weeks make months, and months make a year. A month has 28 to 31 days, so it is a bit more than 4 weeks.',
 predict:{q:'Which is longer: a week or a month?',opts:['A week','A month','They are the same'],ans:1},task:'Fill April with weeks and days, then fill the year with months',
 show:()=>auto(4,[addWeek,addWeek,addWeek,addWeek,addDay,addDay,...MONTHS.map(()=>addMonth)],230),
 go:()=>{fresh();tell('Tap Add a week, or tap the calendar.');keys();K.want=fin(4,()=>K.days===30&&K.months===12,'A month is about 4 weeks, and 12 months make a year.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>K.want()});
const QS=[['What day comes after Sunday?',[['Monday','ok'],['Saturday','back'],['No day: the week is over','end']]],
 ['How many days are in a week?',[['7','ok'],['5','school'],['12','mix']]],
 ['How many months are in a year?',[['12','ok'],['7','mix'],['52','weeks']]],
 ['Today is Tuesday. What day was yesterday?',[['Monday','ok'],['Wednesday','fwd'],['Sunday','two']]],
 ['Which month comes after March?',[['April','ok'],['February','back'],['May','skip']]],
 ['Today is Friday. What day will it be in 3 days?',[['Monday','ok'],['Sunday','today'],['Tuesday','extra']]],
 ['Which is the longest?',[['a year','ok'],['a month','part'],['a week','part']]]];
function why(t){let m='Think of the wheel: the days and months go round in order.';
 if(t==='back')m='That one comes before. After means the next one on the wheel.';
 if(t==='end')m='The week never stops. After Sunday it starts again with Monday.';
 if(t==='school')m='School may be 5 days, but the week has 7 days: Saturday and Sunday count too.';
 if(t==='mix')m='7 is the days in a week. 12 is the months in a year.';
 if(t==='weeks')m='52 is about how many weeks are in a year. There are 12 months.';
 if(t==='fwd')m='Wednesday is tomorrow. Yesterday is the day before today.';
 if(t==='two')m='Sunday is two days before. Yesterday is just one day back.';
 if(t==='skip')m='May comes after April. You skipped a month.';
 if(t==='today')m='You counted Friday as 1. Start on Friday and hop: Saturday 1, Sunday 2, Monday 3.';
 if(t==='extra')m='That is 4 hops. Saturday 1, Sunday 2, Monday 3: stop on Monday.';
 if(t==='part')m='A year is made of 12 months, and a month is about 4 weeks, so the year is longest.';
 return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],r=(qn*2+1)%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');[...ops.slice(r),...ops.slice(0,r)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>mark(t)});tell('Challenge: '+q);paintNow()}
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;ding('miss')}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.66,tall:1.25,draw:paint,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});keys()}});
A.start()})})();
