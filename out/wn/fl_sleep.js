/* Flagship – sleep, screens and wellbeing (ages 14–15; RSHE physical health: the importance of sufficient good quality sleep).
   Hours teens need, the later teen body clock, social jet lag, how screens cut sleep, and caffeine's half-life. */
(()=>{
const HAB=[['scroll','Scrolling in bed','Stop scrolling in bed',60,'Scrolling pushes the time you actually fall asleep later. That is the biggest cost.'],
 ['game','Gaming until lights out','Stop gaming an hour before bed',30,'An exciting game keeps your brain alert, so it takes longer to drop off.'],
 ['ping','Notifications on all night','Turn notifications off',20,'Pings at night wake you up or pull you back to the phone.'],
 ['blue','Night mode off','Turn night mode on',5,'Night mode cuts bright light a little. Light is a smaller effect than time and alertness.']];
const CUP=[12,15,18,21],BED=22.5,HALF=5;
VIS.reg('flagsleep',c=>{let A,row,box,n=-1,best=0,g;const T={};
const view=()=>['need','clock','lag','screen','caff','test'][A.step];
const voice=s=>{c.say(s);A&&A.cv.setAttribute('aria-label',s)};
const upd=s=>{voice(s);ctrls();A.redraw()};const sz=n=>Math.round(n*(A.narrow?1:1.12));
function say(s,x,y,n,o){o=o||{};g.font=`${o.w||700} ${sz(n)}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(s,x,y,o.mw||A.W-16)}
const clk=h=>{h=((h%24)+24)%24;const hh=Math.floor(h),mm=Math.round((h-hh)*60),ap=hh<12?'am':'pm';return`${(hh+11)%12+1}${mm?':'+String(mm).padStart(2,'0'):''} ${ap}`};
const dur=h=>{const m=Math.round(h*60);return m<60?`${m} min`:`${Math.floor(m/60)} h${m%60?` ${m%60} min`:''}`};
const within=(p,r)=>p.x>r.x-8&&p.x<r.x+r.w+8&&p.y>r.y-8&&p.y<r.y+r.h+8;
/* a time axis from h0 to h1 drawn at row y */
const ax=(h0,h1)=>({x0:A.W*.08,x1:A.W*.92,h0,h1,X(h){return this.x0+(h-this.h0)/(this.h1-this.h0)*(this.x1-this.x0)},H(x){return this.h0+(x-this.x0)/(this.x1-this.x0)*(this.h1-this.h0)}});
function axis(a,y,step){const K=A.col;g.strokeStyle=K.mu;g.lineWidth=1.5;g.beginPath();g.moveTo(a.x0,y);g.lineTo(a.x1,y);g.stroke();
 for(let h=a.h0;h<=a.h1+1e-6;h+=step){const x=a.X(h);g.beginPath();g.moveTo(x,y-4);g.lineTo(x,y+4);g.stroke();say(clk(h).replace(':00',''),x,y+14,10,{c:K.tx,w:600})}}
function band(a,y,h,from,to,col,lab){const x=a.X(from),w=a.X(to)-x;g.fillStyle=col;g.fillRect(x,y-h/2,w,h);g.lineWidth=2;g.strokeStyle=A.col.tx;g.strokeRect(x,y-h/2,w,h);if(lab)say(lab,x+w/2,y,12,{c:'#fff',w:800,mw:w-6})}
function knob(x,y){g.beginPath();g.arc(x,y,13,0,7);g.fillStyle=A.col.ac;g.fill();g.lineWidth=2.5;g.strokeStyle=A.col.tx;g.stroke()}
const NAVY='#2b3a8c';
const need=()=>ax(19,33),lagA=()=>ax(20,38);
const lagMid=()=>((T.wb+T.ww)/2)-((22.5+31)/2),wkSleep=()=>T.ww-T.wb;
const habR=i=>({x:A.W*.05,y:A.H*(.08+i*.15),w:A.W*.9,h:A.H*.12});
const left=t=>Math.pow(.5,(BED-t)/HALF);
function draw(A){const{W,H,col:K}=A,v=view();g=A.ctx;g.fillStyle=A.mix(K.pn,NAVY,K.dark?.08:.05);g.fillRect(0,0,W,H);
 if(v==='test'){say('Teens need 8 to 10 hours.',W/2,H*.25,15,{w:800});say('Keep weekend wake-ups close to school days.',W/2,H*.43,14);say('Phones cost sleep mostly through time and alertness.',W/2,H*.61,14);say('Caffeine: half is still there 5 hours later.',W/2,H*.79,14);return}
 if(v==='need'){const a=need(),y=H*.45,s=31-T.bed;axis(a,y+30,2);
  g.fillStyle=A.alpha(K.gr,.18);g.fillRect(a.X(21),y-38,a.X(23)-a.X(21),76);say('Bedtimes that give 8–10 h',a.X(22),y-48,11,{c:K.tx});
  band(a,y,34,T.bed,31,NAVY,'Asleep');knob(a.X(T.bed),y);say('Wake 7 am',a.X(31),y-30,11,{w:800});
  say(`Bedtime ${clk(T.bed)} · Sleep ${dur(s)}`,W/2,H*.12,15,{w:800});
  say(s>=8&&s<=10?'In the 8–10 hour range':s<8?'Short of 8 hours':'Over 10 hours',W/2,H*.8,14,{w:800})}
 if(v==='clock'){const a=ax(19,26);[['Age 10',20.5,T.s10],['Age 16',22.5,T.s16]].forEach(([lab,h,on],i)=>{const y=H*(.25+i*.3);
   say(lab,a.x0,y-28,13,{al:'left',w:800});g.strokeStyle=K.mu;g.lineWidth=1.5;g.beginPath();g.moveTo(a.x0,y);g.lineTo(a.x1,y);g.stroke();
   if(on){g.fillStyle=A.alpha(NAVY,K.dark?.6:.25);g.fillRect(a.X(h),y-14,a.x1-a.X(h),28);g.beginPath();g.arc(a.X(h),y,10,0,7);g.fillStyle='#f4c20d';g.fill();g.strokeStyle=K.tx;g.lineWidth=2;g.stroke();
    say(`Sleepy from about ${clk(h)}`,a.X(h)+8,y+26,12,{al:h>22?'right':'left',w:800})}else say('Tap to see',W/2,y+18,12,{c:K.tx,w:600})});
  axis(a,H*.84,1)}
 if(v==='lag'){const a=lagA();[['School night',22.5,31],['Weekend',T.wb,T.ww]].forEach(([lab,b,w],i)=>{const y=H*(.24+i*.26);say(lab,a.x0,y-28,13,{al:'left',w:800});
   band(a,y,28,b,w,i?'#7a3f9e':NAVY,dur(w-b));const m=a.X((b+w)/2);g.fillStyle='#f4c20d';g.beginPath();g.moveTo(m,y-15);g.lineTo(m-8,y-28);g.lineTo(m+8,y-28);g.closePath();g.fill();g.strokeStyle=K.tx;g.lineWidth=2;g.stroke();
   if(i){knob(a.X(b),y);knob(a.X(w),y)}});axis(a,H*.68,3);
  const j=lagMid();say(`Social jet lag: ${dur(Math.abs(j))}`,W/2,H*.84,15,{w:800});say(j<=1&&wkSleep()>=8?'Close to your school-night clock':`Like flying ${Math.round(Math.abs(j))} time zones every weekend`,W/2,H*.93,12,{c:K.tx})}
 if(v==='screen'){HAB.forEach(([k,lab,,mins],i)=>{const r=habR(i),on=T.h[k];A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fillStyle=on?A.alpha('#d62828',K.dark?.3:.12):A.alpha(K.gr,K.dark?.3:.14);g.fill();g.lineWidth=2;g.strokeStyle=K.tx;g.stroke();
   say(lab,r.x+12,r.y+r.h/2,13,{al:'left',w:800,mw:r.w*.62});say(on?`−${mins} min`:'off',r.x+r.w-12,r.y+r.h/2,13,{al:'right',w:800})});
  const s=9-HAB.reduce((t,[k,,,m])=>t+(T.h[k]?m:0),0)/60;const y=H*.72;g.fillStyle=K.mu;g.fillRect(W*.05,y,W*.9,18);g.fillStyle=s>=8.5?'#2f9b47':'#c25400';g.fillRect(W*.05,y,W*.9*s/9,18);g.strokeStyle=K.tx;g.lineWidth=2;g.strokeRect(W*.05,y,W*.9,18);
  say(`An example school night: ${dur(s)} of sleep`,W/2,H*.84,14,{w:800});say('Lights out 10:30 pm, alarm 7:30 am: 9 h possible',W/2,H*.93,11,{c:K.tx,w:600})}
 if(v==='caff'){const a=ax(12,24),y0=H*.72,top=H*.14;g.strokeStyle=K.mu;g.lineWidth=1.5;g.beginPath();g.moveTo(a.x0,top);g.lineTo(a.x0,y0);g.lineTo(a.x1,y0);g.stroke();
  [1,.5,.25].forEach(f=>{const y=y0-(y0-top)*f;g.setLineDash([4,5]);g.beginPath();g.moveTo(a.x0,y);g.lineTo(a.x1,y);g.stroke();g.setLineDash([]);say(`${f*100}%`,a.x0+4,y-9,10,{al:'left',w:600})});
  g.strokeStyle='#c25400';g.lineWidth=3.5;g.beginPath();for(let h=T.cup;h<=24;h+=.1){const x=a.X(h),y=y0-(y0-top)*Math.pow(.5,(h-T.cup)/HALF);h===T.cup?g.moveTo(x,y):g.lineTo(x,y)}g.stroke();
  const bx=a.X(BED);g.strokeStyle=NAVY;g.lineWidth=3;g.beginPath();g.moveTo(bx,top);g.lineTo(bx,y0);g.stroke();say('Bed 10:30 pm',bx,top-8,11,{w:800,al:'right'});
  knob(a.X(T.cup),y0);axis(a,y0,3);const f=left(T.cup);say(`Drink at ${clk(T.cup)} → ${Math.round(f*100)}% left at bedtime`,W/2,H*.9,14,{w:800})}
 A.fx.draw(g)}
/* actions */
const nope=t=>{A.sound.miss();upd(t)},yes=t=>{A.sound.pop();upd(t);T.want()};
function setBed(h){T.bed=Math.max(20,Math.min(26,Math.round(h*2)/2));const s=31-T.bed;
 if(s>=8&&s<=10)yes(`Bedtime ${clk(T.bed)} gives ${dur(s)}. That is in the 8 to 10 hours teens need.`);
 else upd(s<8?`${dur(s)} is short. Most 13 to 18 year olds need 8 to 10 hours. Try an earlier bedtime.`:`${dur(s)} is a lot. Most teens need 8 to 10 hours.`)}
function age(k){if(T[k])return;T[k]=1;A.sound.tick();upd(k==='s10'?'At 10, melatonin, the sleep signal, starts rising around 8:30 pm.':'At 16, the same signal comes about two hours later. That is biology in puberty, not laziness.');T.want()}
function moveLag(which,d){T[which]=Math.max(which==='wb'?21:27,Math.min(which==='wb'?27:38,T[which]+d));const j=lagMid(),s=wkSleep();
 if(s<8)return nope(`Only ${dur(s)} at the weekend. Keep at least 8 hours.`);
 if(j<=1)yes(`Social jet lag is ${dur(Math.abs(j))}. A small lie-in, and Monday will not feel like a long flight.`);else upd(`Social jet lag is ${dur(j)}. Your body clock shifts that much every weekend, then has to shift back.`)}
function flip(i){const[k,,,mins,why]=HAB[i];if(!T.h[k])return;T.h[k]=0;A.sound.tick();const lost=HAB.reduce((t,[q,,,m])=>t+(T.h[q]?m:0),0);
 if(lost<=30)return yes(`${why} Now you get ${dur(9-lost/60)}.`);upd(`${why} Saved ${mins} min. Still losing ${lost} min.`+(k==='blue'?' Night mode alone does not fix it.':''))}
function drink(t){T.cup=Math.max(12,Math.min(21,Math.round(t*2)/2));const f=left(T.cup);
 if(f<.5)yes(`At ${clk(T.cup)} only ${Math.round(f*100)}% is left by 10:30 pm. Half goes about every 5 hours.`);else nope(`At ${clk(T.cup)}, ${Math.round(f*100)}% is still in you at bedtime. That can delay sleep. Try earlier.`)}
function ctrls(){if(!row)return;row.innerHTML='';const v=view(),b=(t,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},row,t).onclick=fn};
 if(v==='need'){b('Bedtime 30 min earlier',()=>setBed(T.bed-.5));b('Bedtime 30 min later',()=>setBed(T.bed+.5))}
 if(v==='clock'){if(!T.s10)b('Show age 10',()=>age('s10'));if(!T.s16)b('Show age 16',()=>age('s16'))}
 if(v==='lag'){b('Weekend bedtime earlier',()=>moveLag('wb',-.5));b('Weekend wake-up earlier',()=>moveLag('ww',-.5));b('Weekend wake-up later',()=>moveLag('ww',.5))}
 if(v==='screen')HAB.forEach(([k,,act],i)=>{if(T.h[k])b(act,()=>flip(i))});
 if(v==='caff')CUP.forEach(t=>b(`Drink at ${clk(t)}`,()=>drink(t)))}
let grab=null;
function down(p){const v=view();
 if(v==='need'){const a=need();if(Math.abs(p.x-a.X(T.bed))<30){grab='bed';return true}return false}
 if(v==='clock'){age(p.y<A.H*.42?'s10':'s16');return false}
 if(v==='lag'){const a=lagA(),y=A.H*.5;if(Math.abs(p.y-y)<30){grab=Math.abs(p.x-a.X(T.wb))<Math.abs(p.x-a.X(T.ww))?'wb':'ww';return true}return false}
 if(v==='screen'){HAB.forEach((x,i)=>{if(within(p,habR(i)))flip(i)});return false}
 if(v==='caff'){grab='cup';return true}return false}
function move(p){if(!grab)return;const v=view();if(grab==='bed'){T.bed=Math.max(20,Math.min(26,need().H(p.x)));A.redraw()}
 if(grab==='cup'){T.cup=Math.max(12,Math.min(21,ax(12,24).H(p.x)));A.redraw()}
 if(grab==='wb'||grab==='ww'){const h=lagA().H(p.x);T[grab]=grab==='wb'?Math.max(21,Math.min(27,h)):Math.max(27,Math.min(38,h));A.redraw()}}
function up(){if(grab==='bed')setBed(T.bed);if(grab==='cup')drink(T.cup);if(grab==='wb'||grab==='ww'){T[grab]=Math.round(T[grab]*2)/2;moveLag(grab,0)}grab=null}
const fin=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const k=++T.tok;fns.forEach((fn,j)=>setTimeout(()=>{if(k===T.tok)fn()},A.reduced()?j*50+50:(j+1)*ms))};
const clear=()=>{const t=(T.tok||0)+1;for(const k in T)delete T[k];Object.assign(T,{tok:t,want:()=>{},bed:24,s10:0,s16:0,wb:25,ww:36,h:{scroll:1,game:1,ping:1,blue:1},cup:21});grab=null};
const steps=[
{h:'How much sleep?',p:'School starts, so the alarm is fixed at 7 am. Drag the bedtime, or use the buttons, until you get enough sleep.',predict:{q:'How much sleep do 13 to 18 year olds need each night?',opts:['8 to 10 hours','6 hours is plenty','5 hours plus a nap'],ans:0},task:'Find a bedtime that gives 8 to 10 hours',
 show:()=>{steps[0].go();play([()=>setBed(23.5),()=>setBed(23)],600)},
 go:()=>{clear();upd('Bedtime is midnight and the alarm is 7 am. Is that enough?');T.want=fin(0,()=>31-T.bed>=8&&31-T.bed<=10,'8 to 10 hours a night is the advice for 13 to 18 year olds.')}},
{h:'Your body clock shifts',p:'In puberty the body clock runs later. Compare when the sleep signal starts at 10 and at 16.',predict:{q:'Many teens feel wide awake at 10 pm. Why?',opts:['Their body clock runs later in puberty','They are just being lazy','Screens are the only reason'],ans:0},task:'Compare age 10 and age 16',
 show:()=>{steps[1].go();play([()=>age('s10'),()=>age('s16')],600)},
 go:()=>{clear();upd('Tap each age to see when the body starts to feel sleepy.');T.want=fin(1,()=>T.s10&&T.s16,'A later body clock is normal for teens, but school still starts early. That is why bedtime habits matter.')}},
{h:'Social jet lag',p:'Weekend lie-ins shift your body clock, like flying to another time zone. Drag the weekend sleep bar ends, or use the buttons.',task:'Get social jet lag to 1 hour or less, with 8+ hours of sleep',
 show:()=>{steps[2].go();play([()=>moveLag('wb',-1),()=>moveLag('wb',-1),()=>moveLag('ww',-2),()=>moveLag('ww',-2)],500)},
 go:()=>{clear();upd('School nights: 10:30 pm to 7 am. This weekend: 1 am to noon. The yellow arrows mark the middle of sleep.');T.want=fin(2,()=>lagMid()<=1&&wkSleep()>=8,'A lie-in of an hour or so is fine. A big one makes Monday feel like jet lag.')}},
{h:'Screens and sleep',p:'This example night loses sleep to four phone habits. Change habits until you get at least 8 h 30 min.',predict:{q:'How do phones at night cut sleep the most?',opts:['They push sleep later and keep you alert','Only through blue light','They do not affect sleep'],ans:0},task:'Get to 8 h 30 min or more',
 show:()=>{steps[3].go();play([()=>flip(0),()=>flip(1)],600)},
 go:()=>{clear();upd('Four habits are on. Which ones cost the most sleep?');T.want=fin(3,()=>HAB.reduce((t,[k,,,m])=>t+(T.h[k]?m:0),0)<=30,'Time and alertness cost the most. Night mode helps only a little.')}},
{h:'Caffeine late in the day',p:'Caffeine leaves your body slowly: about half is gone every 5 hours. Pick when to have an energy drink.',predict:{q:'A can at 6 pm. How much caffeine is left at 10:30 pm?',opts:['About half','None, it is gone in an hour','All of it'],ans:0},task:'Find a time with under half left at bedtime',
 show:()=>{steps[4].go();play([()=>drink(18),()=>drink(15)],600)},
 go:()=>{clear();upd('An energy drink at 9 pm. How much is still in you at bedtime?');T.want=fin(4,()=>left(T.cup)<.5,'Caffeine after lunch can still be in you at bedtime.')}},
{h:'Challenge',p:'',go:()=>{clear();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>T.want()});
const QS=[['Alarm at 7 am. Which bedtime gives a 15-year-old enough sleep?',[['10:30 pm','ok'],['12:30 am','late'],['2 am','vlate']]],
 ['Why do many teens not feel sleepy until late?',[['Their body clock shifts later in puberty','ok'],['They are lazy','lazy'],['They eat too much','food']]],
 ['School nights 10:30 pm to 7 am. Which weekend plan keeps social jet lag low?',[['11 pm to 8 am','ok'],['2 am to 1 pm','lie'],['Stay up all night','allnight']]],
 ['Which phone change saves the most sleep?',[['Stop scrolling in bed','ok'],['Only turn on night mode','night'],['Turn the brightness up','bright']]],
 ['When is the latest time for a coffee, to have under half left at 10:30 pm?',[['About 5 pm','ok'],['9 pm','nine'],['It never matters','never']]],
 ['You slept 6 hours all week. What helps most?',[['A regular earlier bedtime','ok'],['Sleep till 2 pm on Sunday','sunday'],['More energy drinks','drinks']]]];
function why(t){let m='Aim for 8 to 10 hours, keep a regular wake time, and cut late screens and caffeine.';
 if(t==='late')m=`12:30 am to 7 am is only 6 h 30 min. Teens need 8 to 10 hours.`;
 if(t==='vlate')m=`2 am to 7 am is 5 hours, far below the 8 to 10 teens need.`;
 if(t==='lazy')m=`It is not laziness. The body clock runs about two hours later in puberty.`;
 if(t==='food')m=`Food is not the main reason. The teen body clock shifts later.`;
 if(t==='lie')m=`2 am to 1 pm moves the middle of sleep by about 4 hours. That is big social jet lag.`;
 if(t==='allnight')m=`An all-nighter cuts sleep and throws your body clock out for days.`;
 if(t==='night')m=`Night mode helps only a little. Time scrolling and an alert brain cost far more.`;
 if(t==='bright')m=`Brighter light makes it harder to feel sleepy, not easier.`;
 if(t==='nine')m=`At 9 pm almost all of it is still in you at 10:30 pm.`;
 if(t==='never')m=`It does matter. Half the caffeine is still there about 5 hours later.`;
 if(t==='sunday')m=`A huge lie-in gives social jet lag and makes Monday harder. A steady earlier bedtime works better.`;
 if(t==='drinks')m=`Caffeine hides tiredness but does not replace sleep, and it can cut tonight's sleep too.`;
 return m}
function next(){n++;const[q,ops]=QS[n%QS.length],r=n%3;box.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const pk=box.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},pk,o).onclick=()=>grade(t)});voice('Challenge: '+q);A.redraw()}
function grade(t){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){best++;A.win()}else{best=0;A.sound.miss()}fb.innerHTML=(ok?'Correct. In a row: '+best+'.':'Not quite. '+why(t))+' <button type="button" class="linkish">Another question</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{box.hidden=A.step!==5;row.hidden=A.step===5;ctrls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);row=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);box=E('div',{class:'fl-chal'},A.below);clear();
  A.gest({down,move,up});ctrls()}});
A.start()})})();
