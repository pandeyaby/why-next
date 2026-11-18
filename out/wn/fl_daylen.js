/* Flagship: why seasons change (ages 5-7; NC Y1 seasonal changes "observe and describe how day length varies",
   NGSS 1-ESS1-2 "make observations at different times of year to relate the amount of daylight to the time of year").
   London clock times (mid-month, GMT/BST as on the clock). Look out of the window at 7 pm across the year; fill in a
   June day and a December day hour by hour; put four months in order of daylight; reveal a whole year of daylight bars;
   watch a tree and a thermometer follow the long and short days. Not flagsky (day/night sky, sun path, season wheel). */
(()=>{
VIS.reg('flagdaylen',c=>{let Z,keysEl,quizEl,round=-1,epoch=0;const D={};c.fig.classList.add('young');
const MON=[['January',8,16.33,8],['February',7.42,17.25,9],['March',6.33,18.08,12],['April',6.25,19.92,15],['May',5.25,20.67,18],['June',4.72,21.33,21],
 ['July',5,21.17,23],['August',5.75,20.42,23],['September',6.58,19.33,20],['October',7.42,18.25,16],['November',7.42,16.33,11],['December',8,15.92,8]];
const hrs=i=>MON[i][2]-MON[i][1],SEA=i=>[0,0,1,1,1,2,2,2,3,3,3,0][i],SNAME=['winter','spring','summer','autumn'],SCOL=['#60a5fa','#4ade80','#fbbf24','#fb923c'];
const NIGHT='#1e1b4b',DAY='#7dd3fc',SUNC='#f59e0b',DARKTXT='#0f172a',CARDC='#ffffff',OKC='#15803d';
const scene=()=>['window','strip','grow','year','tree','quiz'][Z.step];
const fit=(v,a,b)=>Math.min(b,Math.max(a,v));
function note(t,x,y,o){o=o||{};const g=Z.ctx;let f=o.f||(Z.narrow?14:16);g.font=`800 ${f}px system-ui`;let w=g.measureText(t).width+20;
 while(w>Z.W-8&&f>10){f--;g.font=`800 ${f}px system-ui`;w=g.measureText(t).width+20}const h=f+14,left=fit(x-w/2,4,Z.W-w-4);
 g.fillStyle=CARDC;Z.paint.rrect(left,y-h/2,w,h,h/2);g.fill();g.lineWidth=o.ring?3:1.5;g.strokeStyle=o.ring||'#94a3b8';g.stroke();g.fillStyle=DARKTXT;g.textAlign='center';g.textBaseline='middle';g.fillText(t,left+w/2,y+1)}
function base(){const C=Z.col;Z.ctx.fillStyle=Z.mix(C.pn,'#ecfeff',C.dark?.05:.5);Z.ctx.fillRect(0,0,Z.W,Z.H)}
function sunAt(x,y,r){const g=Z.ctx;g.fillStyle=SUNC;g.beginPath();g.arc(x,y,r,0,7);g.fill();g.strokeStyle=SUNC;g.lineWidth=3;for(let k=0;k<8;k++){const a=k*Math.PI/4;g.beginPath();g.moveTo(x+Math.cos(a)*r*1.3,y+Math.sin(a)*r*1.3);g.lineTo(x+Math.cos(a)*r*1.7,y+Math.sin(a)*r*1.7);g.stroke()}}
function moonAt(x,y,r){const g=Z.ctx;g.fillStyle='#fef9c3';g.beginPath();g.arc(x,y,r,0,7);g.fill();g.fillStyle=NIGHT;g.beginPath();g.arc(x+r*.45,y-r*.2,r*.85,0,7);g.fill()}
const clock=v=>{const h=Math.floor(v),m=Math.round((v-h)*60/5)*5,hh=((h+11)%12)+1;return `${hh}:${String(m%60).padStart(2,'0')} ${h<12?'am':'pm'}`};
/* month tiles shared by the window and tree scenes */
function tiles(){const g=Z.ctx,n=12,w=(Z.W-16)/n,y=Z.H*.86,h=Z.H*.11;for(let i=0;i<n;i++){const on=i===D.m;g.fillStyle=on?SCOL[SEA(i)]:Z.alpha(SCOL[SEA(i)],.35);Z.paint.rrect(8+i*w+1,y,w-2,h,6);g.fill();
 if(on){g.strokeStyle=Z.col.tx;g.lineWidth=3;g.stroke()}g.fillStyle=Z.col.dark&&!on?'#f8fafc':DARKTXT;g.font=`800 ${Z.narrow?11:13}px system-ui`;g.textAlign='center';g.textBaseline='middle';g.fillText(MON[i][0][0],8+i*w+w/2,y+h/2)}}
const tileAt=p=>p.y>Z.H*.84?fit(Math.floor((p.x-8)/((Z.W-16)/12)),0,11):-1;
/* 0: the window at 7 pm */
function drawWindow(){base();const g=Z.ctx,lit=MON[D.m][2]>19,x=Z.W*.2,y=Z.H*.17,w=Z.W*.6,h=Z.H*.5;g.fillStyle=lit?DAY:NIGHT;g.fillRect(x,y,w,h);
 if(lit)sunAt(x+w*.75,y+h*.7,Z.H*.045);else{moonAt(x+w*.7,y+h*.3,Z.H*.05);g.fillStyle='#fff';[[.2,.2],[.35,.5],[.5,.15],[.15,.7],[.85,.6]].forEach(([a,b])=>{g.beginPath();g.arc(x+w*a,y+h*b,2,0,7);g.fill()})}
 g.strokeStyle='#a16207';g.lineWidth=8;g.strokeRect(x,y,w,h);g.beginPath();g.moveTo(x+w/2,y);g.lineTo(x+w/2,y+h);g.moveTo(x,y+h/2);g.lineTo(x+w,y+h/2);g.stroke();
 note(`${MON[D.m][0]}, 7 o'clock bedtime`,Z.W/2,Z.H*.08,{});note(lit?'Still light outside!':'Dark already',Z.W/2,Z.H*.76,{ring:lit?SUNC:'#6366f1'});tiles()}
function setMonth(i,quiet){D.m=fit(i,0,11);const lit=MON[D.m][2]>19;if(Z.step===0){if(lit)D.lit=1;else D.dk=1}if(Z.step===4){const s=SEA(D.m);D.saw[s]=1}if(quiet)return Z.redraw();Z.sound.tick();
 if(Z.step===4)return tell(`${MON[D.m][0]}: about ${Math.round(hrs(D.m))} hours of daylight. Warmest part of the day about ${MON[D.m][3]} degrees. ${['Bare branches in the short, cold days.','Buds and blossom as the days grow.','Full green leaves in the long, warm days.','Leaves turn orange and fall as days get shorter.'][SEA(D.m)]}`);
 tell(`${MON[D.m][0]}. The Sun sets at ${clock(MON[D.m][2])}. ${lit?'So at 7 o\'clock it is still light.':'So at 7 o\'clock it is dark.'}`)}
/* 1: fill in a June day and a December day */
function strip(i,y,frac,lab){const g=Z.ctx,x0=Z.W*.06,w=Z.W*.88,h=Z.H*.13,cw=w/24,r=MON[i][1],s=MON[i][2];
 for(let k=0;k<24;k++){const on=k+.5>r&&k+.5<s,shown=k<frac*24;g.fillStyle=shown?(on?DAY:NIGHT):Z.alpha(Z.col.tx,.1);g.fillRect(x0+k*cw+1,y,cw-2,h)}
 g.strokeStyle=Z.col.tx;g.lineWidth=1.5;g.strokeRect(x0,y,w,h);if(frac>=1){sunAt(x0+r*cw,y-10,7);moonAt(x0+s*cw+8,y-10,7)}note(lab,Z.W/2,y+h+18,{f:Z.narrow?12:14,ring:frac>=1?OKC:0})}
function drawStrip(){base();const t=D.fill;strip(5,Z.H*.2,t[0],t[0]>=1?'June: about 16½ hours of daylight':'June: tap to fill in');strip(11,Z.H*.58,t[1],t[1]>=1?'December: only about 8 hours':'December: tap to fill in');
 note('midnight',Z.W*.1,Z.H*.08,{f:11});note('midday',Z.W*.5,Z.H*.08,{f:11});note('midnight',Z.W*.9,Z.H*.08,{f:11})}
function fill(j){if(D.fill[j]>=1)return;Z.sound.whoosh();D.fill[j]=.01;Z.tween(D.fill,{[j]:1},900,'io',()=>{D.done2[j]=1;
 tell(j?'December has only about 8 hours of daylight. The rest of the day is dark.':'June has about 16 and a half hours of daylight. Light from early morning to late evening.')});Z.redraw()}
/* 2: four months in order of daylight */
const FOUR=[5,11,3,1];
function drawGrow(){base();const g=Z.ctx;FOUR.forEach((mi,k)=>{if(D.line.includes(mi))return;const x=Z.W*(.04+k*.24),y=Z.H*.08,w=Z.W*.21,h=Z.H*.3;g.fillStyle=NIGHT;Z.paint.rrect(x,y,w,h,8);g.fill();
  g.fillStyle=DAY;const top=y+h*(1-hrs(mi)/24);g.fillRect(x+4,top,w-8,y+h-top-4);note(MON[mi][0].slice(0,3),x+w/2,y+h+16,{f:12})});
 D.line.forEach((mi,k)=>{const y=Z.H*(.52+k*.11),w=Z.W*.88*hrs(mi)/24;g.fillStyle=DAY;Z.paint.rrect(Z.W*.06,y,w,Z.H*.08,6);g.fill();g.strokeStyle=Z.col.tx;g.lineWidth=1.5;g.stroke();
  g.fillStyle=DARKTXT;g.font=`800 ${Z.narrow?12:14}px system-ui`;g.textAlign='left';g.textBaseline='middle';g.fillText(`${MON[mi][0]}: ${Math.round(hrs(mi))} h`,Z.W*.08,y+Z.H*.04)});
 if(D.line.length===4)note('The days grow from winter to summer',Z.W/2,Z.H*.47,{ring:OKC})}
function pick(mi){if(D.line.includes(mi))return;const left=FOUR.filter(x=>!D.line.includes(x)),least=left.reduce((a,b)=>hrs(a)<hrs(b)?a:b);
 if(mi!==least){Z.sound.miss();return tell(`${MON[mi][0]} has more daylight than ${MON[least][0]}. Find the one with the least light.`)}
 D.line.push(mi);Z.sound.pop();tell(D.line.length<4?`${MON[mi][0]}: about ${Math.round(hrs(mi))} hours of daylight. Next?`:'December, February, April, June: each month has more daylight than the one before.')}
/* 3: a whole year of daylight */
function drawYear(){base();const g=Z.ctx,x0=Z.W*.05,bw=Z.W*.9/12,b0=Z.H*.8,sc=Z.H*.6/17;for(let i=0;i<12;i++){const x=x0+i*bw;if(D.seen[i]){g.fillStyle=SCOL[SEA(i)];g.fillRect(x+2,b0-hrs(i)*sc,bw-4,hrs(i)*sc);
  if(D.top===i){g.strokeStyle=Z.col.tx;g.lineWidth=3;g.strokeRect(x+2,b0-hrs(i)*sc,bw-4,hrs(i)*sc)}}else{g.strokeStyle=Z.alpha(Z.col.tx,.4);g.setLineDash([4,4]);g.strokeRect(x+2,b0-Z.H*.1,bw-4,Z.H*.1);g.setLineDash([])}
  g.fillStyle=Z.col.tx;g.font=`700 ${Z.narrow?11:13}px system-ui`;g.textAlign='center';g.fillText(MON[i][0][0],x+bw/2,b0+14)}
 g.strokeStyle=Z.col.tx;g.lineWidth=2;g.beginPath();g.moveTo(x0,b0);g.lineTo(x0+12*bw,b0);g.stroke();
 note(D.top===5?'June has the most daylight. Then days get shorter.':`Bars shown: ${D.seen.filter(Boolean).length} of 12`,Z.W/2,Z.H*.08,{ring:D.top===5?OKC:0});
 [['winter',.5],['spring',3],['summer',6],['autumn',9]].forEach(([n,i])=>note(n,x0+(i+.5)*bw,Z.H*.93,{f:11}))}
function reveal(i,quiet){i=fit(i,0,11);if(!D.seen[i]){D.seen[i]=1;if(quiet){Z.sound.tick();return Z.redraw()}}
 if(D.seen.every(Boolean)&&!quiet)return choose(i);if(!quiet)tell(`${MON[i][0]}: about ${Math.round(hrs(i))} hours of daylight.`)}
function showAll(){D.seen=D.seen.map(()=>1);Z.sound.pop();tell('All 12 months. The bars go up to June, then down again. Tap the tallest bar.')}
function choose(i){if(!D.seen.every(Boolean)){Z.sound.miss();return tell('Show every month first.')}D.top=i;if(i!==5){Z.sound.miss();return tell(`${MON[i][0]} has about ${Math.round(hrs(i))} hours. Look for a taller bar.`)}
 Z.sound.pop();tell('June has the most daylight. After June the days get shorter again, down to December. Then it starts again.')}
/* 4: the tree and the thermometer */
function drawTree(){base();const g=Z.ctx,s=SEA(D.m),tx=Z.W*.36,ty=Z.H*.75;g.fillStyle='#78350f';g.fillRect(tx-8,ty-Z.H*.3,16,Z.H*.3);
 g.strokeStyle='#78350f';g.lineWidth=5;[[-1,.52],[1,.48],[-.6,.62],[.7,.6]].forEach(([d,f])=>{g.beginPath();g.moveTo(tx,ty-Z.H*f*.5);g.lineTo(tx+d*Z.W*.13,ty-Z.H*f);g.stroke()});
 if(s){const n=s===1?14:s===2?40:22;for(let k=0;k<n;k++){const a=k*2.4,r=Z.H*.03+((k*37)%11)/11*Z.W*.15;g.fillStyle=s===1?'#f9a8d4':s===2?'#16a34a':['#ea580c','#ca8a04','#b45309'][k%3];g.beginPath();g.arc(tx+Math.cos(a)*r,ty-Z.H*.42+Math.sin(a)*r*.6,s===2?11:8,0,7);g.fill()}}
 const thx=Z.W*.8,top=Z.H*.18,bot=Z.H*.7,lv=bot-(bot-top)*MON[D.m][3]/25;g.fillStyle=Z.col.dark?'#334155':'#e5e7eb';Z.paint.rrect(thx-9,top,18,bot-top,9);g.fill();g.fillStyle='#dc2626';g.fillRect(thx-5,lv,10,bot-lv);g.beginPath();g.arc(thx,bot+8,14,0,7);g.fill();
 note(`${MON[D.m][3]}°C`,thx,top-14,{f:12});note(`${MON[D.m][0]}: about ${Math.round(hrs(D.m))} hours of light`,Z.W/2,Z.H*.07,{ring:SCOL[s]});tiles()}
function draw(){const k=scene();if(k==='quiz'){base();sunAt(Z.W/2,Z.H*.42,Z.H*.08);note('Challenge',Z.W/2,Z.H*.75,{ring:OKC});return}
 ({window:drawWindow,strip:drawStrip,grow:drawGrow,year:drawYear,tree:drawTree})[k]();Z.fx.draw(Z.ctx)}
function down(p){const k=scene();if(k==='window'||k==='tree'){const i=tileAt(p);if(i<0)return false;D.drag=1;setMonth(i,true);return true}
 if(k==='strip'){fill(p.y<Z.H*.45?0:1);return false}
 if(k==='grow'&&p.y<Z.H*.45){pick(FOUR[fit(Math.floor((p.x/Z.W-.04)/.24),0,3)]);return false}
 if(k==='year'){D.drag=1;reveal(Math.floor((p.x-Z.W*.05)/(Z.W*.9/12)),true);return true}return false}
function move(p){if(!D.drag)return;const k=scene();if(k==='year')reveal(Math.floor((p.x-Z.W*.05)/(Z.W*.9/12)),true);else{const i=tileAt({x:p.x,y:Z.H});setMonth(i,true)}}
function up(p){if(!D.drag)return;D.drag=0;const k=scene();if(k==='year'){if(D.seen.every(Boolean))tell('All 12 months. The bars go up to June, then down again. Tap the tallest bar.');else tell(`Bars shown: ${D.seen.filter(Boolean).length} of 12.`)}else setMonth(D.m)}
function clear(){epoch++;for(const k in D)delete D[k];Object.assign(D,{m:11,lit:0,dk:0,fill:[0,0],done2:[0,0],line:[],seen:Array(12).fill(0),top:-1,saw:[0,0,0,0],drag:0,test:()=>{}})}
function tell(t){c.say(t);Z.cv.setAttribute('aria-label',t);Z.redraw();keys();D.test()}
const gate=(i,f,msg)=>()=>{if(Z.step===i&&f()&&(!steps[i].predict||Z.pred[i]!=null)&&!Z.isDone)Z.done(msg+Z.reveal(i))};
function enter(i,m,first,f,msg){clear();D.m=m;c.say(first);Z.cv.setAttribute('aria-label',first);keys();D.test=gate(i,f,msg)}
function play(i,acts,gap){steps[i].go();const e=epoch;acts.forEach((f,j)=>setTimeout(()=>{if(e===epoch)f()},(gap||450)*(j+1)))}
function keys(){if(!keysEl)return;keysEl.innerHTML='';const k=scene(),K=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},keysEl,t).onclick=f};
 if(k==='window'||k==='tree'){K('◀ Month',()=>setMonth(D.m-1),'Go back one month');K('Month ▶',()=>setMonth(D.m+1),'Go forward one month')}
 if(k==='window')K('June',()=>setMonth(5),'Jump to June');if(k==='tree')K('July',()=>setMonth(6),'Jump to July');
 if(k==='strip'){K('Fill in June',()=>fill(0));K('Fill in December',()=>fill(1))}
 if(k==='grow')FOUR.forEach(mi=>{if(!D.line.includes(mi))K(MON[mi][0],()=>pick(mi),'Put '+MON[mi][0]+' next')});
 if(k==='year'){K('Show every month',showAll);if(D.seen.every(Boolean))[5,6,11].forEach(i=>K(MON[i][0]+' is tallest',()=>choose(i)))}}
const steps=[
{h:'Look out at bedtime',p:'It is 7 o\'clock in the evening. Is it light or dark outside? Tap the months at the bottom, or use the buttons.',
 predict:{q:'At 7 o\'clock in the evening, it is…',opts:['always dark','light in some months, dark in others','always light'],ans:1},task:'Find a light bedtime and a dark one',
 show:()=>play(0,[()=>setMonth(5),()=>setMonth(11)],700),
 go:()=>enter(0,11,'A window at 7 o\'clock in the evening in December. It is dark outside.',()=>D.lit&&D.dk,'Bedtime is light in summer and dark in winter.')},
{h:'A day in June and December',p:'Each box is one hour of the day. Tap each day to fill in the light hours and the dark hours.',
 predict:{q:'Which day has more hours of daylight?',opts:['June','December','the same: a day is always 24 hours'],ans:0},task:'Fill in both days',
 show:()=>play(1,[()=>fill(0),()=>fill(1)],1100),
 go:()=>enter(1,5,'Two empty days of 24 boxes: June on top, December below.',()=>D.done2[0]&&D.done2[1],'Both days are 24 hours. June has twice as much light.')},
{h:'Days grow longer',p:'Put these four months in order. Start with the one with the least daylight. Tap the boxes or the buttons.',
 predict:{q:'From winter to summer, the days get…',opts:['longer','shorter','no different'],ans:0},task:'Order the months from least to most daylight',
 show:()=>play(2,[11,1,3,5].map(mi=>()=>pick(mi)),450),
 go:()=>enter(2,5,'Four months, each shown as a box of light and dark: June, December, April and February.',()=>D.line.length===4,'From December to June, each month has more light.')},
{h:'A whole year',p:'Slide your finger across, or tap Show every month. Then tap the month with the most daylight.',
 predict:{q:'After June, the days…',opts:['keep getting longer','get shorter again','stop changing'],ans:1},task:'Show all 12 months, then find the most daylight',
 show:()=>play(3,[showAll,()=>choose(5)],600),
 go:()=>enter(3,5,'An empty chart with a space for each month of the year.',()=>D.top===5,'Up to June, then down to December, every year.')},
{h:'Light, warmth and trees',p:'Change the month. Watch the tree and the thermometer. Find a summer month and a winter month.',
 predict:{q:'Long, sunny summer days make it…',opts:['warmer','colder','snowy'],ans:0},task:'Visit a summer month and a winter month',
 show:()=>play(4,[()=>setMonth(6),()=>setMonth(0)],700),
 go:()=>enter(4,3,'A tree and a thermometer in April.',()=>D.saw[0]&&D.saw[2],'More daylight brings warmth and leaves.')},
{h:'Challenge',p:'',go:()=>{clear();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>D.test()});
const QS=[
 {q:'Which season has the longest days?',a:'Summer',w:[['Winter','swap'],['They are all the same','same']]},
 {q:'Why is it light at bedtime in June?',a:'The Sun sets late in summer',w:[['The Sun is closer to us','close'],['Bedtime is earlier','clock']]},
 {q:'How long is a day in December?',a:'24 hours, but only about 8 are light',w:[['Only 8 hours','short'],['Much more than 24 hours','short']]},
 {q:'After June, the days…',a:'get shorter',w:[['keep getting longer','keep'],['stay the same','same']]},
 {q:'In winter, when do we get up?',a:'Often before the Sun rises',w:[['Always after the Sun rises','keep'],['At midnight','clock']]},
 {q:'Why are summer days warm?',a:'More hours of sunshine warm the land',w:[['The Sun is closer to us','close'],['Trees make heat','tree']]},
 {q:'Which month has the shortest days?',a:'December',w:[['June','swap'],['April','keep']]}];
function why(t){let m='Count the light hours: long in summer, short in winter.';
 if(t==='swap')m='Swap it round: summer has the long days and winter has the short days.';
 if(t==='same')m='The day is always 24 hours, but the light part changes a lot.';
 if(t==='close')m='It is not about the Sun coming closer. The days are longer, so there is more sunshine.';
 if(t==='clock')m='Bedtime stays the same. The Sun sets later in summer.';
 if(t==='short')m='Every day is 24 hours. In December only about 8 of them are light.';
 if(t==='keep')m='The light hours grow up to June, then get fewer again until December.';
 if(t==='tree')m='Trees do not make the warmth. Long sunny days warm the land and air.';
 return m}
function quiz(){round++;const Q=QS[round%QS.length],opts=[[Q.a,'ok'],...Q.w],r=round%3,ord=opts.slice(r).concat(opts.slice(0,r));
 quizEl.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quizEl.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>grade(t,Q.a)});c.say('Challenge: '+Q.q);Z.redraw()}
function grade(t,a){quizEl.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quizEl.querySelector('.fl-fb'),ok=t==='ok';if(ok)Z.win();else Z.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:S=>{quizEl.hidden=S.step!==5;keysEl.hidden=S.step===5;keys()},
 init:A=>{Z=A;const box=c.el('div',{class:'fl-below'},A.below);keysEl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Daylight controls'},box);quizEl=c.el('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});keys()}}).start()})})();
