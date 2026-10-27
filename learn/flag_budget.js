/* Flagship – money basics: budgeting and saving (ages 14–16). Sort spending into needs and wants; balance a monthly
   budget so every pound has a job; tap a month of £4.50 drinks to see small costs add up; run six months of
   "save what's left" against "pay yourself first"; then grow £50 a month at 4% AER and see how interest really builds. */
(()=>{
 const ITEMS=[['Rent',1],['Food shopping',1],['Bus pass to work',1],['Energy bill',1],['Streaming service',0],['Takeaway pizza',0],['Extra pair of trainers',0],['Concert ticket',0]];
 const PAY=1200,RENT=550; // Jade, 19, apprentice: take-home pay a month
 const ROWS=[['Food',150,300],['Transport',60,150],['Phone',10,40],['Fun',0,400],['Savings',0,400]];
 const START=[250,120,40,350,0];
 const DRIFT=[1180,1200,1260,1150,1210,1190]; // what Jade spends when the whole £1,200 sits in her account
 const RATE=Math.pow(1.04,1/12)-1;
 const grow=(m,on)=>{let b=0;for(let i=0;i<m;i++)b=b*(1+(on?RATE:0))+50;return b};
 const gbp=v=>'£'+(Math.round(v*100)/100).toLocaleString('en-GB',{minimumFractionDigits:v%1?2:0,maximumFractionDigits:2});
VIS.reg('flagbudget',c=>{let A,pad,quiz,reader;
 const st={k:0,sorted:[],bad:null,hold:null,amt:START.slice(),days:0,run:[0,0],way:0,mon:0,on:1,tok:0,onChange:()=>{}};
 const mode=()=>['sort','plan','leak','first','grow','quiz'][A.step];
 function say(t){c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(reader)reader.textContent=t}}
 function miss(t){A.sound.miss();say(t);A.redraw()}
 const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 function txt(g,t,x,y,n,col,w,al){g.font=`${w||700} ${n}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col;g.fillText(t,x,y,A.W-12)}
 function tile(g,r,col,a,bold){g.fillStyle=A.alpha(col,a||.12);A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=col;g.lineWidth=bold?3:1.5;g.stroke()}
 const used=()=>RENT+st.amt.reduce((a,b)=>a+b,0);
 const planOk=()=>used()===PAY&&st.amt[4]>=120;
 // ---------- geometry ----------
 const binR=i=>({x:i?A.W/2+5:10,y:A.H*.42,w:A.W/2-15,h:A.H*.52});
 const rowR=i=>({x:A.W*.3,y:A.H*(.2+i*.135),w:A.W*.62,h:Math.min(26,A.H*.07)});
 function dayR(i){const cols=A.narrow?6:10,gap=5,w=(A.W-gap*(cols+1))/cols,rows=Math.ceil(30/cols),h=Math.min(44,(A.H*.6-gap*rows)/rows);return{x:gap+(i%cols)*(w+gap),y:A.H*.2+Math.floor(i/cols)*(h+gap),w,h}}
 const laneR=i=>({x:10,y:A.H*(.14+i*.42),w:A.W-20,h:A.H*.3});
 const plotR=()=>({x:A.W*.12,y:A.H*.2,w:A.W*.84,h:A.H*.6});
 // ---------- drawing ----------
 function drawSort(g){const C=A.col;['Need','Want'].forEach((n,i)=>{const r=binR(i),inn=st.sorted.filter(j=>ITEMS[j][1]===1-i);tile(g,r,i?C.or:C.cy,st.bad===i?.3:.08,st.bad===i);txt(g,n+'s',r.x+r.w/2,r.y+16,15,C.tx,800);
   inn.forEach((j,k)=>txt(g,ITEMS[j][0],r.x+r.w/2,r.y+40+k*20,12,C.mu,600))});
  const it=ITEMS[st.k];if(!it)return txt(g,'All eight sorted.',A.W/2,A.H*.18,15,C.gr,800);const at=st.hold||{x:A.W/2,y:A.H*.18},w=Math.min(A.W-20,320);
  tile(g,{x:at.x-w/2,y:at.y-24,w,h:48},C.vi,.2,true);txt(g,it[0],at.x,at.y,15,C.tx,800)}
 function drawPlan(g){const C=A.col,u=used(),left=PAY-u;txt(g,`Pay ${gbp(PAY)} · Rent and bills ${gbp(RENT)} (fixed)`,A.W/2,A.H*.06,13,C.tx);
  ROWS.forEach((w,i)=>{const r=rowR(i),v=st.amt[i],f=v/400;txt(g,w[0],A.W*.04,r.y+r.h/2,13,C.tx,700,'left');tile(g,r,C.mu,.08);
   g.fillStyle=A.alpha(i===4?C.gr:i===3?C.or:C.cy,.6);A.paint.rrect(r.x,r.y,Math.max(4,r.w*f),r.h,8);g.fill();txt(g,gbp(v),r.x+r.w*f,r.y-8,11,C.tx,700)});
  const y=A.H*.9;txt(g,left===0?'Every pound has a job ✓':left>0?`${gbp(left)} with no job yet`:`Over by ${gbp(-left)}`,A.W/2,y,14,left===0?C.gr:left>0?C.or:C.rd,800);
  if(st.amt[4]<120)txt(g,'Goal: save at least £120 (10%)',A.W/2,y+20,12,C.mu,600)}
 function drawLeak(g){const C=A.col;txt(g,'Tap each day you buy a £4.50 drink',A.W/2,A.H*.07,13,C.tx);
  for(let i=0;i<30;i++){const r=dayR(i),on=i<st.days;tile(g,r,on?C.or:C.mu,on?.3:.06,on);txt(g,on?'☕':String(i+1),r.x+r.w/2,r.y+r.h/2,on?18:11,on?C.tx:C.mu,600)}
  const s=st.days*4.5;txt(g,`${st.days} days: ${gbp(s)}`,A.W/2,A.H*.86,16,st.days===30?C.or:C.tx,800);
  if(st.days===30)txt(g,'A year (365 days): £1,642.50',A.W/2,A.H*.94,13,C.rd,700)}
 function drawFirst(g){const C=A.col;[['Save what’s left',0],['Pay yourself first',1]].forEach(([n,i])=>{const r=laneR(i),m=st.run[i];tile(g,r,i?C.gr:C.or,st.way===i?.16:.06,st.way===i);
   txt(g,n+(st.way===i?' ◀':''),r.x+12,r.y+14,13,C.tx,800,'left');const cw=(r.w-20)/6;let tot=0;
   for(let k=0;k<6;k++){const x=r.x+10+k*cw;if(k>=m){txt(g,'M'+(k+1),x+cw/2,r.y+r.h*.6,11,C.mu,500);continue}const s=i?100:Math.max(0,PAY-DRIFT[k]);tot+=s;
    const h=(r.h-56)*s/100;g.fillStyle=A.alpha(i?C.gr:C.or,.7);g.fillRect(x+cw*.2,r.y+r.h-8-h,cw*.6,h);txt(g,gbp(s),x+cw/2,r.y+r.h-14-h,10,C.tx,600)}
   txt(g,`Saved: ${gbp(tot)}`,r.x+r.w-10,r.y+14,13,i?C.gr:C.or,800,'right')})}
 function drawGrow(g){const C=A.col,r=plotR(),max=1300,Y=v=>r.y+r.h*(1-v/max),bw=r.w/24;g.strokeStyle=C.ln;g.lineWidth=1;g.strokeRect(r.x,r.y,r.w,r.h);
  [0,600,1200].forEach(v=>txt(g,'£'+v,r.x-4,Y(v),10,C.mu,500,'right'));
  for(let m=1;m<=st.mon;m++){const d=50*m,b=grow(m,st.on),x=r.x+(m-1)*bw;g.fillStyle=A.alpha(C.cy,.55);g.fillRect(x+1,Y(d),bw-2,r.y+r.h-Y(d));if(b>d){g.fillStyle=C.gr;g.fillRect(x+1,Y(b),bw-2,Y(d)-Y(b))}}
  [6,12,18,24].forEach(m=>txt(g,m+'m',r.x+(m-.5)*bw,r.y+r.h+12,10,C.mu,500));
  const b=grow(st.mon,st.on),d=50*st.mon;txt(g,`${st.on?'4% AER':'0% (cash in a drawer)'} · month ${st.mon}`,A.W/2,A.H*.06,13,C.tx);
  txt(g,`Paid in ${gbp(d)} · interest ${gbp(b-d)} · total ${gbp(b)}`,A.W/2,A.H*.13,12,C.gr,700)}
 function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#dcfce7',C.dark?.04:.3);g.fillRect(0,0,W,H);
  ({sort:drawSort,plan:drawPlan,leak:drawLeak,first:drawFirst,grow:drawGrow,quiz:()=>txt(g,'💷',W/2,H/2,60,C.tx)})[mode()](g);A.fx.draw(g)}
 // ---------- actions ----------
 function drop(i){const it=ITEMS[st.k];if(!it)return;st.hold=null;if(it[1]===1-i){st.sorted.push(st.k);st.k++;st.bad=null;A.sound.pop();
   return note(`${it[0]}: ${i?'a want. Nice to have, but life goes on without it.':'a need. You must pay it to live, work or stay safe.'}`)}
  st.bad=i;miss(i?`${it[0]} is a need: skipping it would hurt your home, health or job.`:`${it[0]} is a want. Ask: could I live and get to work without it this month?`)}
 function setAmt(i,v){const w=ROWS[i];st.amt[i]=Math.max(w[1],Math.min(w[2],Math.round(v/10)*10));A.sound.tick();note()}
 function tapDay(i){if(i!==st.days)return;st.days++;A.sound.tick();note(st.days===30?'30 drinks: £135 this month. Over a year that is £1,642.50.':'')}
 function step6(){const i=st.way;if(st.run[i]>=6)return;st.run[i]++;A.sound.tick();const k=st.run[i]-1;
  note(i?`Month ${k+1}: £100 moved to savings on payday. She lives on the other £1,100.`:`Month ${k+1}: she spent ${gbp(DRIFT[k])}, so ${gbp(Math.max(0,PAY-DRIFT[k]))} was left to save.`)}
 function setMon(m){st.mon=Math.max(0,Math.min(24,m));A.sound.tick();note(st.mon===24&&st.on?'24 months at 4%: you paid in £1,200 and earned £46.28 interest. Early pounds earn for longer; the last pound earns almost nothing.':'')}
 function note(msg){const v=mode();let t='';
  if(v==='sort')t=ITEMS[st.k]?`Card: ${ITEMS[st.k][0]}. Need or want?`:'All sorted.';
  else if(v==='plan')t='Budget: rent '+gbp(RENT)+', '+ROWS.map((w,i)=>`${w[0].toLowerCase()} ${gbp(st.amt[i])}`).join(', ')+`. Total ${gbp(used())} of ${gbp(PAY)}.`;
  else if(v==='leak')t=`${st.days} of 30 days ticked: ${gbp(st.days*4.5)}.`;
  else if(v==='first')t=`Save what’s left: ${st.run[0]} of 6 months run. Pay yourself first: ${st.run[1]} of 6 months run.`;
  else if(v==='grow')t=`Month ${st.mon} at ${st.on?'4%':'0%'}: total ${gbp(grow(st.mon,st.on))}, of which interest ${gbp(grow(st.mon,st.on)-50*st.mon)}.`;else t='Challenge time.';
  say((msg?msg+' ':'')+t);keys();st.onChange()}
 function keys(){if(!A||!pad)return;pad.innerHTML='';const v=mode();const b=(t,f,label)=>{const e=c.el('button',{type:'button',class:'lbtn ghost sm','aria-label':label||null},pad,t);e.onclick=f};
  if(v==='sort'&&ITEMS[st.k]){b('Need',()=>drop(0),`${ITEMS[st.k][0]} is a need`);b('Want',()=>drop(1),`${ITEMS[st.k][0]} is a want`)}
  if(v==='plan')ROWS.forEach((w,i)=>{b(`${w[0]} −£10`,()=>setAmt(i,st.amt[i]-10),`${w[0]}: £10 less`);b(`${w[0]} +£10`,()=>setAmt(i,st.amt[i]+10),`${w[0]}: £10 more`)});
  if(v==='leak'&&st.days<30){b('Buy today’s drink',()=>tapDay(st.days));b('Buy for a week',()=>{for(let k=0;k<7&&st.days<30;k++)tapDay(st.days)})}
  if(v==='first'){b('Save what’s left',()=>{st.way=0;note()},'Choose: save what is left');b('Pay yourself first',()=>{st.way=1;note()},'Choose: pay yourself first');if(st.run[st.way]<6)b('Run next month',step6)}
  if(v==='grow'){b('+6 months',()=>setMon(st.mon+6));b('−6 months',()=>setMon(st.mon-6));b(st.on?'Switch to 0%':'Switch to 4%',()=>{st.on=1-st.on;setMon(st.mon)})}A.redraw()}
 // ---------- canvas input ----------
 function down(p){const v=mode();
  if(v==='sort'&&ITEMS[st.k]){if(p.y<A.H*.36){st.hold=p;return true}const i=[0,1].find(i=>hit(p,binR(i)));if(i!=null)drop(i);return false}
  if(v==='plan'){const i=ROWS.findIndex((w,i)=>{const r=rowR(i);return p.y>r.y-10&&p.y<r.y+r.h+10});if(i<0)return false;const r=rowR(i),w=ROWS[i];setAmt(i,w[1]+(w[2]-w[1])*(p.x-r.x)/r.w);st.row=i;return true}
  if(v==='leak'){for(let i=0;i<30;i++)if(hit(p,dayR(i))){tapDay(i);return true}return false}
  if(v==='first'){const i=[0,1].find(i=>hit(p,laneR(i)));if(i!=null){if(st.way!==i){st.way=i;note()}else step6()}return false}
  if(v==='grow'){const r=plotR();if(hit(p,r)){setMon(Math.ceil((p.x-r.x)/r.w*24));return true}}return false}
 function move(p){const v=mode();if(v==='sort'){st.hold=p;A.redraw()}
  else if(v==='plan'&&st.row!=null){const r=rowR(st.row),w=ROWS[st.row],n=Math.max(w[1],Math.min(w[2],Math.round((w[1]+(w[2]-w[1])*(p.x-r.x)/r.w)/10)*10));if(n!==st.amt[st.row])setAmt(st.row,n)}
  else if(v==='leak'){for(let i=0;i<30;i++)if(hit(p,dayR(i)))tapDay(i)}
  else if(v==='grow'){const r=plotR(),m=Math.max(0,Math.min(24,Math.ceil((p.x-r.x)/r.w*24)));if(m!==st.mon)setMon(m)}}
 function up(p){st.row=null;if(mode()==='sort'&&st.hold){const i=[0,1].find(i=>hit(p,binR(i)));if(i!=null)drop(i);else{st.hold=null;A.redraw()}}}
 // ---------- steps ----------
 const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
 const auto=(fns,ms)=>{const k=st.tok;fns.forEach((f,j)=>setTimeout(()=>{if(k===st.tok)f()},A.reduced()?j*20:j*ms))};
 const reset=()=>{st.tok++;st.onChange=()=>{};st.k=0;st.sorted=[];st.bad=null;st.hold=null;st.amt=START.slice();st.days=0;st.run=[0,0];st.way=0;st.mon=0;st.on=1;st.row=null};
 const steps=[
  {h:'Needs and wants',p:'A need keeps you housed, fed, safe or able to work. A want is nice to have. Drag each card into a box, or use the buttons.',task:'Sort all eight costs',
   show:()=>{steps[0].go();auto(ITEMS.map(it=>()=>drop(1-it[1])),250)},go:()=>{reset();note();st.onChange=finish(0,()=>st.k>=ITEMS.length,'Needs first, then wants. Wants are where a budget can bend.')}},
  {h:'Give every pound a job',p:'Jade, 19, takes home £1,200 a month. Rent and bills are £550. Drag the bars until spending plus saving is exactly £1,200, saving at least £120.',task:'Balance the budget',
   show:()=>{steps[1].go();auto([[0,200],[1,80],[2,20],[3,200],[4,150]].map(([i,v])=>()=>setAmt(i,v)),300)},go:()=>{reset();note();st.onChange=finish(1,planOk,'Balanced: income minus spending minus saving is £0, and saving is planned, not hoped for.')}},
  {h:'Small leaks',p:'Jade buys a £4.50 drink on the way to work. Tap the days, or drag across the calendar.',
   predict:{q:'£4.50 a day, every day. Over a year that costs about…',opts:['£160','£1,600'],ans:1},task:'Fill the month',
   show:()=>{steps[2].go();auto([...Array(30).keys()].map(i=>()=>tapDay(i)),60)},go:()=>{reset();note();st.onChange=finish(2,()=>st.days>=30,'£135 a month is £1,642.50 a year. Small daily costs are big yearly ones.')}},
  {h:'Pay yourself first',p:'Run six months each way. Tap a lane to choose it, tap again to run a month.',
   predict:{q:'Jade plans to save whatever is left at the end of each month. In six months she saves…',opts:['About £600','Much less'],ans:1},task:'Run six months both ways',
   show:()=>{steps[3].go();auto([...[0,1].flatMap(w=>[()=>{st.way=w;note()},...Array(6).fill(()=>step6())])],200)},go:()=>{reset();note();st.onChange=finish(3,()=>st.run[0]>=6&&st.run[1]>=6,'Left over: £80. Paid first: £600. Money in your account tends to get spent, so move savings on payday.')}},
  {h:'Make it grow',p:'Jade puts £50 a month in a savings account paying 4% AER. Drag across the chart or use +6 months. Green shows interest.',
   predict:{q:'£50 a month for 2 years at 4%. The interest is about…',opts:['£96 (4% of £1,200, twice)','About £46'],ans:1},task:'Grow it for 24 months at 4%',
   show:()=>{steps[4].go();auto([6,12,18,24].map(m=>()=>setMon(m)),350)},go:()=>{reset();note();st.onChange=finish(4,()=>st.mon===24&&st.on,'About £46: each £50 only earns from the day it goes in. Interest grows faster the longer money stays.')}},
  {h:'Challenge',p:'',go:()=>{reset();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>st.onChange()});
 // ---------- challenge ----------
 const QS=[['Which is a need for someone working full time?',[['Getting to work','ok'],['A new phone each year','want'],['Eating out at weekends','want']]],
  ['Take-home pay £900. Rent £450, food £180, travel £90, fun £100. How much can be saved?',[['£80','ok'],['£180','calc'],['Whatever is left at month end','left']]],
  ['A £3 snack every school day (190 days). Over a year that is…',[['£570','ok'],['£3, it is only small','small'],['£57','calc']]],
  ['Best way to make saving happen?',[['Move it to savings on payday','ok'],['Save what is left at the end','left'],['Borrow if you run short','credit']]],
  ['£100 sits in savings at 5% AER for a year. You earn about…',[['£5','ok'],['£50','calc'],['£105 of interest','rate']]],
  ['Your boiler breaks: £300. Best plan in advance?',[['An emergency fund of about 3 months of essentials','ok'],['Put it on a credit card and pay later','credit'],['Hope it will not happen','left']]]];
 function why(tag){let m='Try again.';
  if(tag==='want')m='A want is nice to have. A need keeps you housed, fed, safe or able to work.';
  if(tag==='calc')m='Work it through: add the costs and take them from the income, or multiply the daily cost by the days.';
  if(tag==='left')m='Money left in your account tends to get spent. Plan saving first.';
  if(tag==='small')m='Small costs repeat. Multiply by how often: little and often adds up.';
  if(tag==='credit')m='Borrowing costs interest and puts you behind next month. A buffer avoids it.';
  if(tag==='rate')m='Interest is the extra on top. 5% of £100 is £5; your total becomes £105.';
  return m}
 let qn=-1,run=0;
 function ask(){qn++;const[q,ops]=QS[qn%QS.length],turn=qn%3;
  quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=quiz.querySelector('.fl-pick');ops.slice(turn).concat(ops.slice(0,turn)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(tag)});say('Challenge: '+q);A.redraw()}
 function judge(tag){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),good=tag==='ok';
  if(good){run++;A.win()}else{run=0;A.sound.miss()}const m=good?'✓ Yes. Streak: '+run+'.':'✗ '+why(tag);fb.innerHTML=`${m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 A=FK.shell(c,{steps,ratio:.66,tall:1.2,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
  init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);reader=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});keys()}});
 A.start()})})();
