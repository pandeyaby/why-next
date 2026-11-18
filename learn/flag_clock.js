/* Flagship – telling time to the hour and half past (ages 5–6, England NC Year 1 Measurement: "tell the time to the
   hour and half past the hour and draw the hands on a clock face to show these times"; US CCSS 1.MD.B.3). Turn the
   minute hand once round and see the hour hand move on one number, read o'clock times, drag the hour hand to set a time,
   turn to half past and see the hour hand stop halfway, then read half-past clocks. Targets the documented slips of
   reading the hands the wrong way round, putting the hour hand right on the number at half past, and naming the next
   hour at half past. */
(()=>{const TAU=Math.PI*2;
VIS.reg('flagclock',c=>{let A,bar,cq,turn=-1,row=0;c.fig.classList.add('young');const T={};
const part=()=>['turn','read','set','half','readhalf','quiz'][A.step];
const note=s=>{c.say(s);if(A)A.cv.setAttribute('aria-label',s)};
const px=n=>Math.round(n*(A.narrow?1.05:1.2)),paint=()=>A.redraw();
const face=()=>{const r=Math.min(A.W*.36,A.H*.4);return{x:A.W/2,y:A.H*.54,r}};
const hr=m=>{const h=Math.floor(m/60)%12;return h===0?12:h};
const say=m=>m%60===30?`half past ${hr(m)}`:`${hr(m)} o'clock`;
function label(g,s,x,y,n,col,wt){g.font=`${wt||800} ${px(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(s,x,y,A.W-12)}
function hand(g,F,ang,len,wd,col){g.beginPath();g.moveTo(F.x,F.y);g.lineTo(F.x+Math.sin(ang)*len,F.y-Math.cos(ang)*len);g.lineCap='round';g.lineWidth=wd;g.strokeStyle=col;g.stroke()}
function clock(g,m,hi){const F=face(),K=A.col;g.beginPath();g.arc(F.x,F.y,F.r,0,TAU);g.fillStyle=A.mix(K.pn,K.am,.12);g.fill();g.lineWidth=4;g.strokeStyle=K.tx;g.stroke();
 for(let i=0;i<60;i++){const a=i/60*TAU,o=F.r*.94,ii=i%5?F.r*.9:F.r*.84;g.beginPath();g.moveTo(F.x+Math.sin(a)*ii,F.y-Math.cos(a)*ii);g.lineTo(F.x+Math.sin(a)*o,F.y-Math.cos(a)*o);g.lineWidth=i%5?1.2:2.5;g.strokeStyle=K.tx;g.stroke()}
 for(let n=1;n<=12;n++){const a=n/12*TAU;label(g,String(n),F.x+Math.sin(a)*F.r*.7,F.y-Math.cos(a)*F.r*.7,Math.max(13,F.r*.14),hi===n?K.rd:K.tx)}
 hand(g,F,(m%60)/60*TAU,F.r*.8,5,K.cy);hand(g,F,(m%720)/720*TAU,F.r*.5,10,K.rd);g.beginPath();g.arc(F.x,F.y,7,0,TAU);g.fillStyle=K.tx;g.fill()}
function draw(A){const{ctx:g,W,H,col:K}=A,v=part();g.fillStyle=A.mix(K.pn,K.cy,K.dark?.04:.07);g.fillRect(0,0,W,H);
 if(v==='quiz'){label(g,"Long hand on 12: o'clock",W/2,H*.32,16);label(g,'Long hand on 6: half past',W/2,H*.48,16);label(g,'Short hand tells the hour',W/2,H*.66,15,K.mu);return}
 clock(g,T.m,v==='set'?T.goal:0);
 const top=v==='turn'?(T.m>=T.end?`${say(T.m)}: the short hand moved on 1`:'Keep turning the long hand'):
  v==='half'?(T.m>=T.end?`${say(T.m)}: short hand halfway`:'Turn the long hand to the 6'):
  v==='set'?`Make ${T.goal} o'clock`:`What time is it? Right: ${T.ok} of 3`;
 label(g,top,W/2,20,14);
 if(v==='turn'){const F=face();label(g,'short hand = hour',W*.18,H-18,12,K.rd,700);label(g,'long hand = minutes',W*.8,H-18,12,K.cy,700);void F}
 A.fx.draw(g)}
const no=s=>{A.sound.miss();note(s);paint()},yes=s=>{A.sound.pop();note(s);keys();paint();T.want()};
/* turning the minute hand (steps 0 and 3) */
function spin(dm){const v=part();if((v!=='turn'&&v!=='half')||T.m>=T.end)return;T.m=Math.max(T.start,Math.min(T.end,T.m+dm));A.sound.tick();
 if(T.m>=T.end){if(v==='turn')yes(`The long hand went all the way round, and the short hand moved from ${hr(T.start)} to ${hr(T.end)}. Now it is ${say(T.end)}.`);
  else yes(`Half past ${hr(T.start)}! The long hand is on the 6 and the short hand is halfway between ${hr(T.start)} and ${hr(T.start+60)}.`);return}
 note(v==='turn'?`The long hand moves. Look: the short hand moves a tiny bit too.`:`Keep going to the 6. The short hand is moving towards ${hr(T.start+60)}.`);paint()}
/* setting the hour hand (step 2) */
function setH(h){if(part()!=='set')return;T.m=((h%12)+12)%12*60;A.sound.tick();note(`The short hand points to ${hr(T.m)}. The long hand stays on 12.`);paint()}
function checkSet(){if(part()!=='set')return;const h=hr(T.m);if(h!==T.goal)return no(h===12?`The long hand is on 12, but the short hand shows the hour. Point the short hand at ${T.goal}.`:`That shows ${h} o'clock. Move the short hand to the ${T.goal}.`);
 T.made++;A.fx.add(12,i=>({x:face().x,y:face().y,vx:Math.cos(i)*140,vy:Math.sin(i)*140,life:.6,r:3,col:A.col.gr}));A.kick();
 if(T.made<2){A.sound.pop();T.goal=T.goals[T.made];note(`Yes, ${h} o'clock! Now make ${T.goal} o'clock.`);keys();return paint()}yes(`Yes, ${h} o'clock. The long hand on 12 means o'clock.`)}
/* reading clocks (steps 1 and 4) */
const ROUNDS={read:[180,540,360],readhalf:[270,510,690]};
function opts(m){const h=hr(m);return m%60?[[`half past ${h}`,'ok'],[`half past ${hr(m+60)}`,'next'],["6 o'clock",'six']]:[[`${h} o'clock`,'ok'],["12 o'clock",'swap'],[`half past ${h}`,'half']]}
function pickRead(t){const v=part();if(v!=='read'&&v!=='readhalf'||T.ok>=3)return;const m=T.m,h=hr(m);
 if(t==='swap')return no(`The long hand is on 12, but the short hand tells the hour. It points to ${h}, so it is ${h} o'clock.`);
 if(t==='half')return no(`Half past needs the long hand on the 6. Here it is on 12, so it is ${h} o'clock.`);
 if(t==='next')return no(`The short hand has not reached ${hr(m+60)} yet. It has just gone past ${h}, so it is half past ${h}.`);
 if(t==='six')return no(`The long hand on 6 means half past. The short hand is just past ${h}, so it is half past ${h}.`);
 T.ok++;if(T.ok<3){A.sound.pop();T.m=ROUNDS[v][T.ok];note(`Yes, ${say(m)}! Next clock: what time is it?`);keys();return paint()}yes(`Yes, ${say(m)}. 3 clocks read!`)}
function keys(){if(!bar)return;bar.innerHTML='';const v=part(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},bar,t);b.onclick=fn};
 if((v==='turn'||v==='half')&&T.m<T.end)B('Turn the long hand on',()=>spin(15),'Turn the long hand on by a quarter');
 if(v==='set'){B('Short hand back',()=>setH(hr(T.m)-1));B('Short hand on',()=>setH(hr(T.m)+1));B('Check',checkSet,`Check: is it ${T.goal} o'clock?`)}
 if((v==='read'||v==='readhalf')&&T.ok<3){const o=opts(T.m),r=T.ok%3;o.slice(r).concat(o.slice(0,r)).forEach(([s,t])=>B(s,()=>pickRead(t)))}}
let grab=null;const angAt=p=>{const F=face();return(Math.atan2(p.x-F.x,F.y-p.y)+TAU)%TAU};
function down(p){const v=part(),F=face();if(Math.hypot(p.x-F.x,p.y-F.y)>F.r*1.15)return false;
 if(v==='turn'||v==='half'){grab={k:'min',a:angAt(p)};return true}if(v==='set'){grab={k:'hr'};setH(Math.round(angAt(p)/TAU*12));return true}return false}
function move(p){if(!grab)return;const a=angAt(p);if(grab.k==='hr')return setH(Math.round(a/TAU*12));let d=a-grab.a;if(d>Math.PI)d-=TAU;if(d<-Math.PI)d+=TAU;grab.a=a;const dm=d/TAU*60;if(dm>0)spin(dm)}
function up(){if(grab&&grab.k==='hr')checkSet();grab=null}
const ok=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const later=(fns,ms)=>{const k=++T.tok;fns.forEach((fn,j)=>setTimeout(()=>{if(k===T.tok)fn()},A.reduced()?j*30+30:(j+1)*ms))};
const clean=o=>{const t=(T.tok||0)+1;Object.keys(T).forEach(k=>delete T[k]);Object.assign(T,{tok:t,want:()=>{},m:0,start:0,end:0,ok:0,made:0,goal:0,goals:[]},o);grab=null};
const steps=[
{h:'Two hands',p:'The short hand shows the hour. The long hand shows the minutes. Drag the long hand round.',predict:{q:'The long hand goes all the way round once. What does the short hand do?',opts:['Moves on 1 number','Goes all the way round too','Stays still'],ans:0},task:'Turn the long hand once round',
 show:()=>{steps[0].go();later([0,1,2,3].map(()=>()=>spin(15)),700)},
 go:()=>{clean({m:180,start:180,end:240});note("It is 3 o'clock. Drag the long hand round, or tap Turn.");keys();T.want=ok(0,()=>T.m>=T.end,'1 turn of the long hand is 1 hour.')}},
{h:'Read the hour',p:'Look at the short hand first. The long hand is on 12.',predict:{q:"At 3 o'clock, where is the long hand?",opts:['On the 12','On the 3','On the 6'],ans:0},task:'Read 3 clocks',
 show:()=>{steps[1].go();later([0,1,2].map(()=>()=>pickRead('ok')),800)},
 go:()=>{clean({m:180});note('What time is it? Look at the short hand.');keys();T.want=ok(1,()=>T.ok>=3,"Long hand on 12 means o'clock.")}},
{h:'Set the clock',p:'Drag the short hand to the number. Keep the long hand on 12.',task:"Make 7 o'clock and 2 o'clock",
 show:()=>{steps[2].go();later([()=>setH(7),checkSet,()=>setH(2),checkSet],700)},
 go:()=>{clean({m:0,goal:7,goals:[7,2]});note("Make 7 o'clock. Drag the short hand to 7.");keys();T.want=ok(2,()=>T.made>=2,'The short hand shows the hour.')}},
{h:'Half past',p:'It is 4 o\u2019clock. Drag the long hand half way round, to the 6. Watch the short hand.',predict:{q:'At half past 4, where is the short hand?',opts:['Halfway between 4 and 5','Right on the 4','Right on the 5'],ans:0},task:'Turn to half past 4',
 show:()=>{steps[3].go();later([()=>spin(15),()=>spin(15)],800)},
 go:()=>{clean({m:240,start:240,end:270});note("It is 4 o'clock. Turn the long hand to the 6.");keys();T.want=ok(3,()=>T.m>=T.end,'Half past: the short hand is halfway.')}},
{h:'Read half past',p:'The long hand is on 6. Which number has the short hand just gone past?',task:'Read 3 half-past clocks',
 show:()=>{steps[4].go();later([0,1,2].map(()=>()=>pickRead('ok')),800)},
 go:()=>{clean({m:270});note('What time is it? The long hand is on the 6.');keys();T.want=ok(4,()=>T.ok>=3,'Half past the number it has just passed.')}},
{h:'Challenge',p:'',go:()=>{clean({m:0});ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>T.want()});
const QS=[["The long hand is on 12. The short hand is on 5. What time is it?",[["5 o'clock",'ok'],["12 o'clock",'swap'],['half past 5','half']]],
 ['The long hand is on 6. The short hand is between 2 and 3. What time is it?',[['half past 2','ok'],['half past 3','next'],["6 o'clock",'six']]],
 ["Where is the long hand at 9 o'clock?",[['On the 12','ok'],['On the 9','nine'],['On the 6','half']]],
 ['Where is the short hand at half past 7?',[['Between 7 and 8','ok'],['Right on the 7','exact'],['On the 6','six']]],
 ['How long does the long hand take to go all the way round?',[['1 hour','ok'],['1 minute','minute'],['12 hours','twelve']]],
 ['Which hand tells the hour?',[['The short hand','ok'],['The long hand','swap'],['Both hands','both']]]];
function tip(t){let m="Look at the short hand for the hour and the long hand for o'clock or half past.";
 if(t==='swap')m="The short hand tells the hour. The long hand on 12 just means o'clock.";
 if(t==='half')m="Half past needs the long hand on the 6. On the 12 it is o'clock.";
 if(t==='next')m='The short hand has not got to 3 yet. It has just passed 2, so it is half past 2.';
 if(t==='six')m='The long hand on 6 means half past. Read the hour from the short hand.';
 if(t==='nine')m="At 9 o'clock the short hand points to 9. The long hand is on 12.";
 if(t==='exact')m='At half past, the short hand has moved halfway to the next number.';
 if(t==='minute')m='1 minute moves the long hand only a tiny step. A full turn is 60 minutes, 1 hour.';
 if(t==='twelve')m='The short hand takes 12 hours to go round. The long hand takes 1 hour.';
 if(t==='both')m='The long hand shows the minutes. Only the short hand tells the hour.';
 return m}
function ask(){turn++;const[q,ops]=QS[turn%QS.length],rot=turn%3;cq.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const r=cq.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},r,o);b.onclick=()=>score(t)});note('Challenge: '+q);paint()}
function score(t){cq.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=cq.querySelector('.fl-fb'),good=t==='ok';
 if(good){row++;A.win()}else{row=0;A.sound.miss()}fb.innerHTML=(good?'Yes! In a row: '+row+'.':'Not quite. '+tip(t))+' <button type="button" class="linkish">Another question</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{cq.hidden=A.step!==5;bar.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);bar=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);cq=E('div',{class:'fl-chal'},A.below);clean({m:180});
  A.gest({down,move,up});keys()}});
A.start()})})();
