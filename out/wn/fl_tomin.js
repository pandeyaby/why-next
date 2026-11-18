/* Flagship: telling time to the minute (ages 7–8; NC Y3 "tell and write the time from an analogue clock… to the
   nearest minute"; CCSS 2.MD.7). Count single minute marks, set times like 3:17 and 4:42, read past/to with any minute,
   match digital. Distinct from flagmins (five-minute jumps) and flagclock (hours and half hours). */
(()=>{
VIS.reg('flagtomin',c=>{let A,ctl,chal,qi=-1,run=0,drag=false;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['marks','set','past','to','match','myth','chal'][A.step];
const hr12=h=>((h-1)%12+12)%12+1,two=m=>(m<10?'0':'')+m;
function words(h,m){if(m===0)return hr12(h)+" o'clock";if(m===15)return'quarter past '+hr12(h);if(m===30)return'half past '+hr12(h);if(m===45)return'quarter to '+hr12(h+1);
 if(m<30)return m+' minute'+(m===1?'':'s')+' past '+hr12(h);const left=60-m;return left+' minute'+(left===1?'':'s')+' to '+hr12(h+1)}
const digi=(h,m)=>hr12(h)+':'+two(m);
function geo(){const r=Math.min(A.W*.3,A.H*.4);return{x:A.narrow?A.W/2:A.W*.36,y:A.H*.47,r}}
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function hand(a,len,w,col){const g=A.ctx,{x,y}=geo();g.strokeStyle=col;g.lineWidth=w;g.lineCap='round';g.beginPath();g.moveTo(x,y);g.lineTo(x+Math.sin(a)*len,y-Math.cos(a)*len);g.stroke();g.lineCap='butt'}
function face(){const g=A.ctx,C=A.col,{x,y,r}=geo();g.fillStyle=C.pn;g.strokeStyle=C.tx;g.lineWidth=3;g.beginPath();g.arc(x,y,r,0,7);g.fill();g.stroke();
 for(let i=0;i<60;i++){const a=i*Math.PI/30,big=i%5===0,r0=r*(big?.84:.92);g.strokeStyle=big?C.tx:(S.glowMark===i?C.ac:A.alpha(C.tx,.4));g.lineWidth=big?2.6:(S.glowMark===i?2.2:1);
  g.beginPath();g.moveTo(x+Math.sin(a)*r0,y-Math.cos(a)*r0);g.lineTo(x+Math.sin(a)*r*.98,y-Math.cos(a)*r*.98);g.stroke()}
 for(let n=1;n<=12;n++){const a=n*Math.PI/6;T(String(n),x+Math.sin(a)*r*.7,y-Math.cos(a)*r*.7,r>110?18:15,{w:800})}
 const m=S.m,h=S.h;hand((h%12+m/60)*Math.PI/6,r*.48,7,C.tx);hand(m*Math.PI/30,r*.78,3.5,C.ac);
 g.fillStyle=C.tx;g.beginPath();g.arc(x,y,5,0,7);g.fill()}
function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#fce7f3',C.dark?.05:.35);g.fillRect(0,0,W,H);const k=kind();
 if(k==='chal'){T('Read every minute mark',W/2,H*.3,A.narrow?15:18,{w:900});T('Past before :30 · to after :30',W/2,H*.5,A.narrow?13:16,{c:C.mu});T('Match the digital time',W/2,H*.68,A.narrow?13:16,{c:C.mu});A.fx.draw(g);return}
 if(k==='myth'||k==='match'){T(S.title||'Choose',W/2,H*.12,A.narrow?14:16,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.3+i*.2);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.05,y-H*.08,W*.9,H*.16);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.05,y-H*.08,W*.9,H*.16);T(t,W/2,y,A.narrow?13:15,{max:W*.84})});A.fx.draw(g);return}
 face();const{x,y,r}=geo(),tx=A.narrow?W/2:W*.78,ty=A.narrow?y+r+44:H*.34;
 T(digi(S.h,S.m),tx,ty,A.narrow?22:28,{w:900});T(words(S.h,S.m),tx,ty+(A.narrow?26:38),A.narrow?13:15,{w:800,c:C.ac,max:A.narrow?W*.9:W*.4});
 if(S.goal)T('Make: '+S.goal,tx,ty+(A.narrow?52:78),13,{c:C.mu,max:A.narrow?W*.9:W*.4});
 if(k==='marks'&&S.count!=null)T('Minute marks counted: '+S.count+' / 7',tx,ty+(A.narrow?74:108),12,{c:C.mu});
 A.fx.draw(g)}
function setM(m,quiet){let mm=((Math.round(m)%60)+60)%60;const prev=S.m;if(prev>=50&&mm<10)S.h++;else if(prev<10&&mm>=50)S.h--;S.m=mm;S.glowMark=mm;
 if(!quiet){A.sound.tick();say(digi(S.h,S.m)+', '+words(S.h,S.m))}A.redraw();S.check()}
function nudge(d){setM(S.m+d)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{h:3,m:0,count:0,glowMark:-1,goal:'',opts:[],picked:null,check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*160))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
const at=(h,m)=>()=>hr12(S.h)===hr12(h)&&S.m===m;
function controls(){if(!ctl)return;ctl.innerHTML='';const k=kind(),btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};if(k==='chal')return;
 if(k==='marks'){btn('+ 1 minute mark',()=>{if(S.count<7){S.count++;setM((S.base||0)+S.count);say('Mark '+S.count+': '+S.count+' minute'+(S.count===1?'':'s')+' past.')}else S.check()},'Count the next minute mark');return}
 if(k==='myth'||k==='match'){(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();say(t);A.redraw();S.check()},'Pick '+t));return}
 btn('− 1 min',()=>nudge(-1),'Move minute hand back 1 minute');btn('+ 1 min',()=>nudge(1),'Move minute hand on 1 minute');
 btn('− 5 min',()=>nudge(-5),'Jump back 5 minutes');btn('+ 5 min',()=>nudge(5),'Jump on 5 minutes')}
function down(p){const k=kind();if(k==='chal'||k==='myth'||k==='match'){if(k==='myth'||k==='match'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.22)/(A.H*.2))));S.picked=i;A.sound.tick();A.redraw();S.check()}return k!=='chal'}
 const{x,y,r}=geo();if(Math.hypot(p.x-x,p.y-y)>r*1.2)return false;drag=true;move(p);return true}
function move(p){if(!drag)return;const{x,y}=geo();let a=Math.atan2(p.x-x,y-p.y);if(a<0)a+=2*Math.PI;const m=Math.round(a/(Math.PI/30))%60;if(m!==S.m){if(kind()==='marks'){S.count=m-(S.base||0);if(S.count<0)S.count=0}setM(m)}}
const steps=[
{h:'Count minute marks',p:'Between two numbers are 4 small marks. Each small mark is 1 minute. From the 12, count 1, 2, 3… not only jumps of 5.',
 predict:{q:'From 12, three small marks on means…',opts:['3 minutes past','15 minutes past','3 o\'clock'],ans:0},
 task:'Count 7 minute marks past 3:00',show:()=>auto(0,[()=>{S.count=7;S.m=7;S.glowMark=7;A.redraw();S.check()}]),
 go:()=>{reset({h:3,m:0,base:0,count:0,goal:'3:07'});say('Count seven single minute marks past 3.');controls();S.check=finish(0,()=>S.count>=7&&S.m===7,'Seven marks past 3 is 3:07 — to the nearest minute.')}},
{h:'Set any minute',p:'Drag the long hand to any minute. 3:17 means 17 minutes past 3 — not only times that land on a number.',
 predict:{q:'3:17 means…',opts:['17 minutes past 3','17 minutes to 3','quarter past 3'],ans:0},
 task:'Make 3:17',show:()=>auto(1,[()=>{S.h=3;S.m=17;S.glowMark=17;A.redraw();S.check()}]),
 go:()=>{reset({h:3,m:0,goal:'3:17'});say('Set seventeen minutes past 3.');controls();S.check=finish(1,at(3,17),'3:17 is seventeen minutes past 3.')}},
{h:'Minutes past',p:'Before half past (:30), we usually say minutes PAST the hour. Read the long hand as total minutes from 12.',
 predict:{q:'4:23 in words is…',opts:['23 minutes past 4','23 minutes to 4','quarter past 4'],ans:0},
 task:'Make 4:23',show:()=>auto(2,[()=>{S.h=4;S.m=23;S.glowMark=23;A.redraw();S.check()}]),
 go:()=>{reset({h:4,m:0,goal:'4:23'});say('Make twenty-three minutes past 4.');controls();S.check=finish(2,at(4,23),'4:23 is 23 minutes past 4.')}},
{h:'Minutes to',p:'After half past, we often say minutes TO the next hour. 5:42 is 18 minutes to 6 because 60 − 42 = 18.',
 predict:{q:'5:42 in “to” words is…',opts:['18 minutes to 6','42 minutes to 5','18 minutes past 5'],ans:0},
 task:'Make 5:42',show:()=>auto(3,[()=>{S.h=5;S.m=42;S.glowMark=42;A.redraw();S.check()}]),
 go:()=>{reset({h:5,m:0,goal:'5:42'});say('Make 5:42 — eighteen minutes to 6.');controls();S.check=finish(3,at(5,42),'5:42 is 18 minutes to 6.')}},
{h:'Match digital',p:'The same time can be shown on a digital display and on a clock face. Match 2:09.',
 predict:{q:'Digital 2:09 matches…',opts:['9 minutes past 2','9 minutes to 2','half past 2'],ans:0},
 task:'Tap the matching reading for 2:09',show:()=>auto(4,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Digital shows 2:09. That is…',opts:['9 minutes past 2','9 minutes to 2','half past 2'],picked:null,h:2,m:9});say('Match the digital time.');controls();S.check=finish(4,()=>S.picked===0,'2:09 is nine minutes past 2.')}},
{h:'Catch a mix-up',p:'A common slip is reading only the big numbers (thinking every time is a multiple of 5) or swapping past and to.',
 predict:{q:'Which is the mix-up?',opts:['Every time must land on a big number','3:17 is 17 minutes past 3','5:42 is 18 minutes to 6'],ans:0},
 task:'Tap the mix-up',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Which is the mix-up?',opts:['Every time must land on a big number','3:17 is 17 minutes past 3','5:42 is 18 minutes to 6'],picked:null});say('Find the mix-up.');controls();S.check=finish(5,()=>S.picked===0,'Minute marks let you read every minute, not only multiples of 5.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['3 small marks past 12 means…',[['3 minutes past','ok'],['15 minutes past','five'],['3 o\'clock','hour']]],
 ['3:17 in words…',[['17 minutes past 3','ok'],['17 minutes to 3','to'],['quarter past 3','qtr']]],
 ['4:23 means…',[['23 minutes past 4','ok'],['23 minutes to 4','to'],['quarter to 5','qtr']]],
 ['5:42 as minutes to…',[['18 minutes to 6','ok'],['42 minutes to 6','raw'],['18 minutes past 5','past']]],
 ['Digital 2:09 is…',[['9 minutes past 2','ok'],['9 minutes to 2','to'],['half past 2','half']]],
 ['Minute marks between numbers…',[['each mark is 1 minute','ok'],['each mark is 5 minutes','five'],['only hours matter','hour']]],
 ['6:51 as minutes to…',[['9 minutes to 7','ok'],['51 minutes to 7','raw'],['9 minutes past 6','past']]]];
function why(t){let m='Count every minute mark. Before :30 say past; after :30 you can say minutes to the next hour.';
 if(t==='five')m='Big numbers are 5-minute jumps, but the small marks between them are 1 minute each.';
 if(t==='hour')m='Check the minute hand — it has moved past the 12, so it is not exactly o\'clock.';
 if(t==='to')m='Before half past, say minutes PAST. “To” is for times after :30.';
 if(t==='qtr')m='Quarter past is :15 and quarter to is :45 — not every nearby time.';
 if(t==='raw')m='Minutes TO means 60 minus the minute reading. 60 − 42 = 18.';
 if(t==='past')m='After :30, minutes past is still correct as a digital reading, but “to” names the next hour.';
 if(t==='half')m='Half past is :30. Read the exact minute for times like :09.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.6,tall:1.14,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Minute clock controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:p=>move(p),up:()=>{drag=false}});controls()}});
A.start()})})();
