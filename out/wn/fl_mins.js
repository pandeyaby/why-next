/* Flagship: telling time to five minutes (ages 6-7; NC Y2 "tell and write the time to five minutes, including quarter
   past/to the hour, and draw the hands on a clock face"; CCSS 1.MD.3 extended). Count the minute marks in 5s, drag the
   long hand to quarter past and quarter to, and watch the short hand creep towards the next hour. Every drag has a button twin. */
(()=>{
VIS.reg('flagmins',c=>{let A,ctl,chal,qi=-1,run=0,drag=false;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['count','qpast','qto','words','sand','chal'][A.step];
const NUM=['twelve','one','two','three','four','five','six','seven','eight','nine','ten','eleven'];
const hr12=h=>((h-1)%12+12)%12+1,two=m=>(m<10?'0':'')+m;
function words(h,m){if(m===0)return hr12(h)+" o'clock";if(m===15)return'quarter past '+hr12(h);if(m===30)return'half past '+hr12(h);if(m===45)return'quarter to '+hr12(h+1);
 const n={5:'five',10:'ten',20:'twenty',25:'twenty-five'};return m<30?n[m]+' past '+hr12(h):n[60-m]+' to '+hr12(h+1)}
const digi=(h,m)=>hr12(h)+':'+two(m);
function geo(){const r=Math.min(A.W*.3,A.H*.4);return{x:A.narrow?A.W/2:A.W*.36,y:A.H*.47,r}}
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function hand(a,len,w,col){const g=A.ctx,{x,y}=geo();g.strokeStyle=col;g.lineWidth=w;g.lineCap='round';g.beginPath();g.moveTo(x,y);g.lineTo(x+Math.sin(a)*len,y-Math.cos(a)*len);g.stroke();g.lineCap='butt'}
function face(){const g=A.ctx,C=A.col,{x,y,r}=geo();g.fillStyle=C.pn;g.strokeStyle=C.tx;g.lineWidth=3;g.beginPath();g.arc(x,y,r,0,7);g.fill();g.stroke();
 for(let i=0;i<60;i++){const a=i*Math.PI/30,big=i%5===0,r0=r*(big?.86:.92);g.strokeStyle=big?C.tx:A.alpha(C.tx,.45);g.lineWidth=big?2.5:1;g.beginPath();g.moveTo(x+Math.sin(a)*r0,y-Math.cos(a)*r0);g.lineTo(x+Math.sin(a)*r*.97,y-Math.cos(a)*r*.97);g.stroke()}
 for(let n=1;n<=12;n++){const a=n*Math.PI/6;T(String(n),x+Math.sin(a)*r*.72,y-Math.cos(a)*r*.72,r>110?20:16,{w:800})}
 S.counted.forEach(n=>{const a=n*Math.PI/6;A.paint.label(String(n*5),x+Math.sin(a)*(r+18),y-Math.cos(a)*(r+16),{bg:A.alpha(C.gr,.22),col:C.tx,font:'800 13px system-ui,sans-serif'})});
 const m=S.m,h=S.h;if(S.side){g.fillStyle=A.alpha(m<=30?C.cy:C.or,.16);g.beginPath();g.moveTo(x,y);g.arc(x,y,r*.95,-Math.PI/2,-Math.PI/2+(m<=30?m:m-60)*Math.PI/30,m>30);g.closePath();g.fill()}
 hand((h%12+m/60)*Math.PI/6,r*.5,7,C.tx);hand(m*Math.PI/30,r*.8,4,C.ac);g.fillStyle=C.tx;g.beginPath();g.arc(x,y,6,0,7);g.fill()}
function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.35);g.fillRect(0,0,W,H);const k=kind();
 if(k==='chal'){T('Each number on the clock is 5 more minutes',W/2,H*.3,A.narrow?14:17);T('Long hand on 3: quarter past.  On 9: quarter to.',W/2,H*.48,A.narrow?13:16);T('The short hand creeps on to the next hour',W/2,H*.66,A.narrow?13:16,{c:C.mu});A.fx.draw(g);return}
 face();const{x,y,r}=geo(),tx=A.narrow?W/2:W*.78,ty=A.narrow?y+r+46:H*.36;
 T(digi(S.h,S.m),tx,ty,A.narrow?22:30,{w:900});T(words(S.h,S.m),tx,ty+(A.narrow?26:40),A.narrow?15:18,{w:800,c:C.ac});
 if(S.goal&&!A.narrow)T('Make: '+S.goal[2],tx,ty+80,15,{c:C.mu});A.fx.draw(g)}
function setM(m,quiet){let mm=((Math.round(m/5)*5)%60+60)%60;const prev=S.m;if(prev>=45&&mm<15)S.h++;else if(prev<15&&mm>=45)S.h--;S.m=mm;
 if(!quiet){A.sound.tick();say(digi(S.h,S.m)+', '+words(S.h,S.m)+'. Short hand '+(S.m===0?'right on '+hr12(S.h):'between '+hr12(S.h)+' and '+hr12(S.h+1))+'.')}A.redraw();S.check()}
function nudge(d){setM(S.m+d)}
function tapNum(n){if(kind()!=='count')return;const want=S.counted.length+1;if(n!==want){A.sound.miss();say('Count from the 12 in order. Next is '+want+', not '+n+'.');return}
 S.counted.push(n);S.m=n*5%60;if(n===12)S.h++;A.sound.tick();say(n+' means '+n*5+' minutes'+(n===12?', a whole hour':'')+'.');A.redraw();S.check()}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
const at=(h,m)=>()=>hr12(S.h)===hr12(h)&&S.m===m;
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{h:3,m:0,counted:[],side:0,goal:null,check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?30*(j+1):(j+1)*300))}
const walk=(i,n,d)=>auto(i,Array(n).fill(()=>nudge(d)));
function controls(){if(!ctl)return;ctl.innerHTML='';const k=kind(),btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||null},ctl,t).onclick=f};if(k==='chal')return;
 if(k==='count'){btn('Count the next number',()=>tapNum(S.counted.length+1));return}
 btn('− 5 min',()=>nudge(-5),'Move the long hand back 5 minutes');btn('+ 5 min',()=>nudge(5),'Move the long hand on 5 minutes')}
function down(p){const k=kind();if(k==='chal')return false;const{x,y,r}=geo(),d=Math.hypot(p.x-x,p.y-y);
 if(k==='count'){if(d<r*.5||d>r*1.2)return false;let a=Math.atan2(p.x-x,y-p.y);if(a<=0)a+=2*Math.PI;tapNum(Math.round(a/(Math.PI/6))||12);return true}
 if(d>r*1.15)return false;drag=true;move(p);return true}
function move(p){if(!drag)return;const{x,y}=geo();let a=Math.atan2(p.x-x,y-p.y);if(a<0)a+=2*Math.PI;const m=Math.round(a/(Math.PI/30)/5)*5%60;if(m!==S.m)setM(m)}
const steps=[
{h:'Count in 5s',p:'The long hand is the minute hand. From one number to the next is 5 minutes. Tap the numbers in order from 1 and count in 5s.',
 predict:{q:'The long hand points to 3. How many minutes past?',opts:['15','3','30'],ans:0},
 task:'Tap 1 to 12 in order: 5, 10, 15 … 60',show:()=>auto(0,Array.from({length:12},(_,j)=>()=>tapNum(j+1))),
 go:()=>{reset({h:3,m:0});say('Tap the 1 to start counting in 5s.');controls();S.check=finish(0,()=>S.counted.length===12,'12 jumps of 5 is 60 minutes: one hour.')}},
{h:'Quarter past',p:'Drag the long hand round to the 3. That is 15 minutes, a quarter of the way round. Watch the short hand too.',
 predict:{q:'Long hand on 3. We say…',opts:['quarter past','quarter to',"3 o'clock"],ans:0},
 task:'Make quarter past 9',show:()=>walk(1,3,5),
 go:()=>{reset({h:9,m:0,side:1,goal:[9,15,'quarter past 9']});say("It is 9 o'clock. Drag the long hand to the 3.");controls();S.check=finish(1,at(9,15),'Quarter past 9 is 9:15. The short hand has moved a little past the 9.')}},
{h:'Quarter to',p:'Long hand on 9: 15 minutes are left before the next hour. We say quarter to the NEXT hour.',
 predict:{q:'At quarter to 4 the short hand is…',opts:['nearly on 4','right on 4','on the 9'],ans:0},
 task:'Make quarter to 4',show:()=>walk(2,9,5),
 go:()=>{reset({h:3,m:0,side:1,goal:[3,45,'quarter to 4']});say("It is 3 o'clock. Drag the long hand on to the 9.");controls();S.check=finish(2,at(3,45),'Quarter to 4 is 3:45. The short hand is nearly at the 4, not on it.')}},
{h:'Past and to',p:'On the right side of the clock we say minutes PAST. On the left side we say minutes TO the next hour.',
 task:'Make twenty to 4',show:()=>walk(3,8,5),
 go:()=>{reset({h:3,m:0,side:1,goal:[3,40,'twenty to 4']});say('Drag the long hand to show twenty to 4.');controls();S.check=finish(3,at(3,40),'Twenty to 4 is 3:40: 20 more minutes until 4.')}},
{h:'Free play',p:'Set any time. Read it in words and in numbers. Try 3:25.',
 predict:{q:'3:25 in words is…',opts:['twenty-five past 3','twenty-five to 3','five past 3'],ans:0},
 task:'Make 3:25',show:()=>walk(4,5,5),
 go:()=>{reset({h:3,m:0,side:1,goal:[3,25,'3:25']});say('Free play. Drag the long hand.');controls();S.check=finish(4,at(3,25),'3:25 is twenty-five past 3: five jumps of 5.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['Long hand on 4. How many minutes past?',[['20','ok'],['4','four'],['40','forty']]],
 ['Long hand on 9, short hand nearly on 6. The time is…',[['quarter to 6','ok'],['quarter past 9','swap'],['quarter to 5','hour']]],
 ['Quarter past 2 in numbers is…',[['2:15','ok'],['2:25','qtr'],['3:15','hour']]],
 ['Long hand on 6, short hand between 7 and 8.',[['half past 7','ok'],['half past 8','hour'],['6:07','swap']]],
 ['How many minutes from one number to the next?',[['5','ok'],['1','one'],['10','ten']]],
 ['Twenty to 3 in numbers is…',[['2:40','ok'],['3:20','tofix'],['3:40','hour']]],
 ['At quarter past, the long hand points to…',[['3','ok'],['15','fifteen'],['quarter','qtr']]]];
function why(t){let m='Count the long hand in 5s; read the short hand for the hour.';
 if(t==='four')m='Each number is 5 minutes, so the 4 means 4 fives: 20 minutes.';
 if(t==='forty')m='Count the jumps of 5 from the 12: 5, 10, 15, 20. That is 20, not 40.';
 if(t==='swap')m='The long hand shows minutes and the short hand shows the hour. You swapped them.';
 if(t==='hour')m='Check the short hand: it has not reached the next number yet, so use the hour it just passed.';
 if(t==='qtr')m='A quarter of an hour is 15 minutes, and the long hand points to the 3.';
 if(t==='one')m='The small marks are 1 minute each, but from number to number is 5 minutes.';
 if(t==='ten')m='Count again: from 12 to 1 is one jump of 5 minutes.';
 if(t==='tofix')m='Twenty TO 3 is 20 minutes before 3, so it is still 2 o\'clock time: 2:40.';
 if(t==='fifteen')m='There is no 15 on the clock face. 15 minutes is shown by the long hand on the 3.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+2)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.6,tall:1.12,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Clock controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:p=>move(p),up:()=>{drag=false}});controls()}});
A.start()})})();
