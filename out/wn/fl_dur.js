/* Flagship: comparing durations (ages 4-6; NC Y1 "compare, describe and solve practical problems for time [for example,
   quicker, slower, earlier, later]" and "measure and begin to record time"). Time bars on a clap line: Play grows them
   together, so the one still going takes longer. Make two jobs last the same time, slide a late start back to the start
   line (finishing last is not taking longest), pick the quicker runner and order three jobs. Every drag has a button twin. */
(()=>{
const MAX=10,COLS=['#2563eb','#16a34a','#c2410c'];
VIS.reg('flagdur',c=>{let A,ctl,chal,qi=-1,run=0;const S={};
const kind=()=>['long','same','line','quick','order','chal'][A.step];
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const fg=()=>A.col.tx,soft=()=>A.col.mu;
function write(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||800} ${Math.round(px*(A.narrow?1:1.15))}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||fg();g.fillText(t,x,y,o.max||A.W-10)}
/* geometry: a clap ruler on top, then one lane per job */
function geo(){const W=A.W,H=A.H,x0=W*.06,x1=W*.94,top=H*.19,n=S.lanes.length,lh=Math.min((H*.78)/n,H*.3);return{x0,x1,u:(x1-x0)/MAX,top,lh,bh:Math.min(lh*.42,46)}}
const X=t=>{const G=geo();return G.x0+G.u*t};
function lane(i){const G=geo(),y=G.top+i*G.lh+G.lh*.42;return{y,h:G.bh}}
function shown(L){return Math.max(0,Math.min(L.d,S.now-L.s))}
function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.04:.3);g.fillRect(0,0,W,H);
 if(kind()==='chal'){write('Line up the starts.',W/2,H*.34,16);write('The one still going takes longer.',W/2,H*.48,15,{c:soft(),w:700});write('Fewer claps means quicker.',W/2,H*.62,15,{c:soft(),w:700});A.fx.draw(g);return}
 const G=geo();g.lineWidth=1.5;
 for(let t=0;t<=MAX;t++){const x=X(t);g.strokeStyle=A.alpha(fg(),t===0?.9:.22);g.setLineDash(t===0?[]:[4,5]);g.beginPath();g.moveTo(x,G.top-6);g.lineTo(x,H-6);g.stroke();g.setLineDash([]);
  write(String(t),x,G.top-18,14,{w:800,c:t<=S.now?fg():soft()})}
 write(t0(),G.x0,H*.04+6,14,{al:'left',w:700,c:soft(),max:W-G.x0*2});
 if(S.now<MAX&&S.now>0){const x=X(S.now);g.strokeStyle=C.rd;g.lineWidth=3;g.beginPath();g.moveTo(x,G.top-6);g.lineTo(x,H-6);g.stroke()}
 S.lanes.forEach((L,i)=>{const R=lane(i),w=shown(L)*G.u,col=COLS[i%3],sel=S.picks.indexOf(i);
  write(L.name+(sel>=0&&kind()==='order'?`  (${sel+1})`:''),G.x0,R.y-R.h/2-14,17,{al:'left'});
  A.paint.rrect(X(L.s),R.y-R.h/2,Math.max(w,0.01),R.h,8);g.fillStyle=col;if(w>0)g.fill();
  if(S.ghost&&w<L.d*G.u){A.paint.rrect(X(L.s),R.y-R.h/2,L.d*G.u,R.h,8);g.strokeStyle=A.alpha(col,.7);g.setLineDash([6,5]);g.lineWidth=2;g.stroke();g.setLineDash([])}
  if(S.hit===i){A.paint.rrect(X(L.s)-4,R.y-R.h/2-4,L.d*G.u+8,R.h+8,10);g.strokeStyle=fg();g.lineWidth=3;g.stroke()}
  if(L.drag&&w>=L.d*G.u-0.5){const hx=L.drag==='end'?X(L.s+L.d):X(L.s)+L.d*G.u/2;g.fillStyle=fg();g.beginPath();g.arc(hx,R.y,Math.max(12,R.h*.36),0,7);g.fill();g.fillStyle=C.pn;write(L.drag==='end'?'↔':'⇆',hx,R.y+1,14,{c:C.pn})}
  if(w>=L.d*G.u-0.5&&L.d>0){const lab=L.d+(L.d===1?' clap':' claps'),ex=X(L.s+L.d)+(L.drag==='end'?Math.max(12,R.h*.36)+8:8);g.font=`800 ${A.narrow?15:17}px system-ui,sans-serif`;
   if(ex+g.measureText(lab).width<W-4)write(lab,ex,R.y,15,{al:'left'});else write(lab,X(L.s+L.d)-10,R.y,15,{al:'right',c:'#fff'})}});
 A.fx.draw(g)}
function t0(){return S.now>=MAX?'1 line = 1 clap':S.now>0?`Clap ${Math.floor(S.now)}…`:'Press Play to start the clock'}
/* Play: the clock runs and the bars grow; each whole clap ticks */
function play(after){if(S.playing)return;Object.assign(S,{playing:true,now:0,hit:-1,last:0,after});A.redraw();A.kick()}
function tickPlay(dt){if(!S.playing)return false;S.now=Math.min(MAX,S.now+dt*(A.reduced()?40:3.2));if(Math.floor(S.now)>S.last){S.last=Math.floor(S.now);A.sound.tick()}
 if(S.now>=MAX){S.playing=false;describe();const f=S.after;S.after=null;f&&f();S.check()}return true}
function describe(){const ls=S.lanes.map(L=>`${L.name} ${L.d} claps`).join(', ');say(`Each bar starts ${S.lanes.every(L=>L.s===0)?'at the start line':'at its own place'}. ${ls}.`)}
function pickLane(i){const k=kind(),L=S.lanes[i];if(!L)return;A.sound.tick();S.hit=i;
 if(k==='long'){S.pick=i;S.playing=false;S.now=MAX;say(i===0?'Yes. Brushing teeth keeps going after the candle is out. It takes longer: 8 claps, not 1.':'Blowing out a candle is over in 1 clap. Look at which bar is still going after that.')}
 else if(k==='quick'){S.pick=i;S.playing=false;S.now=MAX;say(i===0?'Yes. Mia gets there in 4 claps. Fewer claps means quicker.':'Sam takes 7 claps. More claps means more time, so Sam is slower, not quicker.')}
 else if(k==='order'){if(S.picks.includes(i))return;const want=S.order[S.picks.length];if(i!==want){S.picks=[];S.hit=-1;A.sound.miss();say(`Not ${L.name} yet. Look for the shortest bar that is left: the fewest claps.`);A.redraw();return}
  S.picks.push(i);say(S.picks.length<3?`${L.name}: ${L.d} ${L.d===1?'clap':'claps'}. Now the next shortest.`:'Shortest to longest: sneeze, shoes, lunch.')}
 A.redraw();S.check()}
function setLen(i,d){const L=S.lanes[i];d=Math.max(1,Math.min(MAX-L.s,d));if(L.d===d)return;L.d=d;A.sound.tick();
 say(d===S.lanes[0].d?`Tidy up takes ${d} claps, the same time as the song.`:d<S.lanes[0].d?`Tidy up takes ${d} claps. That is a shorter time than the song.`:`Tidy up takes ${d} claps. That is a longer time than the song.`);A.redraw();S.check()}
function setStart(i,s){const L=S.lanes[i];s=Math.max(0,Math.min(MAX-L.d,s));if(L.s===s)return;L.s=s;A.sound.tick();
 say(s===0?'Both start at the start line now. The bath goes on to 6 claps, the snack stops at 3. The bath takes longer.':`The snack starts at clap ${s} and ends at clap ${s+L.d}. It ends last, but it started late.`);A.redraw();S.check()}
let drag=null;
function down(p){const k=kind();if(k==='chal')return false;for(let i=0;i<S.lanes.length;i++){const R=lane(i),L=S.lanes[i];if(p.y<R.y-R.h/2-26||p.y>R.y+R.h/2+10)continue;
  if(L.drag==='end'){drag={i,m:'end'};move(p);return true}if(L.drag==='move'){drag={i,m:'move',off:p.x-X(L.s)};return true}
  if(k==='long'||k==='quick'||k==='order'){pickLane(i);return true}}return false}
function move(p){if(!drag)return;const G=geo(),L=S.lanes[drag.i];if(drag.m==='end')setLen(drag.i,Math.round((p.x-X(L.s))/G.u));else setStart(drag.i,Math.round((p.x-drag.off-G.x0)/G.u))}
function controls(){if(!ctl)return;ctl.innerHTML='';const k=kind(),btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||null},ctl,t).onclick=f};
 if(k==='chal')return;if(k!=='same'&&k!=='line'&&k!=='order')btn('▶ Play',()=>play(),'Play: start the clock');
 if(k==='same'){btn('− 1 clap',()=>setLen(1,S.lanes[1].d-1),'Make tidy up one clap shorter');btn('+ 1 clap',()=>setLen(1,S.lanes[1].d+1),'Make tidy up one clap longer')}
 if(k==='line'){btn('◀ Slide snack',()=>setStart(1,S.lanes[1].s-1),'Slide the snack one clap to the left');btn('Slide snack ▶',()=>setStart(1,S.lanes[1].s+1),'Slide the snack one clap to the right')}
 if(k==='long'||k==='quick'||k==='order')S.lanes.forEach((L,i)=>btn(L.name,()=>pickLane(i),'Choose '+L.name))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null))A.done(msg+A.reveal(i))};
function reset(o){run++;drag=null;for(const x in S)delete S[x];Object.assign(S,{lanes:[],now:MAX,picks:[],pick:-1,hit:-1,check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*380))}
const steps=[
{h:'Which takes longer?',p:'Some jobs take a long time and some take a short time. Start two jobs together. The one that is still going when the other has stopped takes longer.',
 predict:{q:'Which takes longer?',opts:['Brushing teeth','Blowing out a candle','They take the same time'],ans:0},task:'Press Play, then tap the job that takes longer',
 show:()=>{steps[0].go();play(()=>pickLane(0))},
 go:()=>{reset({now:0,lanes:[{name:'Brush teeth',s:0,d:8},{name:'Blow out a candle',s:0,d:1}]});say('Two jobs start together. Press Play to start the clock.');controls();S.check=finish(0,()=>S.pick===0,'Brushing teeth takes longer.')}},
{h:'The same time',p:'We can measure time by counting claps. Clap at the same speed. If two jobs take the same number of claps, they take the same time.',
 task:'Drag the end of the tidy-up bar so it takes the same time as the song',
 show:()=>auto(1,[()=>setLen(1,4),()=>setLen(1,5),()=>setLen(1,6)]),
 go:()=>{reset({lanes:[{name:'Sing a song',s:0,d:6},{name:'Tidy up',s:0,d:3,drag:'end'}]});say('The song takes 6 claps. Tidy up takes 3 claps. Drag the end of the tidy-up bar, or use the buttons.');controls();S.check=finish(1,()=>S.lanes[1].d===6,'6 claps and 6 claps: the same time.')}},
{h:'Start at the same line',p:'The job that ends last does not always take the longest. It may have started late. To compare, start both at the start line, then look at which one is longer.',
 predict:{q:'The snack ends last. Which takes longer?',opts:['The bath','The snack, it ends last','They take the same time'],ans:0},task:'Slide the snack back to the start line',
 show:()=>auto(2,[()=>setStart(1,4),()=>setStart(1,3),()=>setStart(1,2),()=>setStart(1,1),()=>setStart(1,0)]),
 go:()=>{reset({lanes:[{name:'Bath',s:0,d:6},{name:'Snack',s:5,d:3,drag:'move'}]});say('The bath starts at the start line and takes 6 claps. The snack starts at clap 5 and ends at clap 8.');controls();S.check=finish(2,()=>S.lanes[1].s===0,'The bath takes longer: 6 claps, not 3.')}},
{h:'Quicker and slower',p:'In a race, the quicker one takes less time. Fewer claps means quicker. More claps means slower.',
 predict:{q:'Mia takes 4 claps to run across the park. Sam takes 7 claps. Who is quicker?',opts:['Mia','Sam, 7 is more','They are the same'],ans:0},task:'Press Play, then tap the quicker runner',
 show:()=>{steps[3].go();play(()=>pickLane(0))},
 go:()=>{reset({now:0,lanes:[{name:'Mia runs',s:0,d:4},{name:'Sam runs',s:0,d:7}]});say('Mia and Sam start together. Press Play.');controls();S.check=finish(3,()=>S.pick===0,'Mia is quicker. Sam is slower.')}},
{h:'Shortest to longest',p:'You can put jobs in order of time. Find the shortest time first: the fewest claps. Then the next. The longest time comes last.',
 task:'Tap the jobs from the shortest time to the longest time',
 show:()=>auto(4,[()=>pickLane(2),()=>pickLane(0),()=>pickLane(1)]),
 go:()=>{reset({order:[2,0,1],lanes:[{name:'Put on shoes',s:0,d:3},{name:'Eat lunch',s:0,d:9},{name:'Sneeze',s:0,d:1}]});say('Shoes 3 claps, lunch 9 claps, sneeze 1 clap. Tap the shortest first.');controls();S.check=finish(4,()=>S.picks.length===3,'Sneeze, then shoes, then lunch.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['Which takes longer: a sneeze or a night of sleep?',[['a night of sleep','ok'],['a sneeze','short'],['the same time','same']]],
 ['Ben tidies up in 5 claps. Ava takes 8 claps. Who is quicker?',[['Ben','ok'],['Ava','bigger'],['the same','same']]],
 ['A song takes 6 claps. A dance takes 6 claps. What is true?',[['They take the same time','ok'],['The song is longer','order'],['The dance is longer','order']]],
 ['Two bars start in different places. How do you see which takes longer?',[['Slide them to the start line','ok'],['Look at which ends last','end'],['Look at the colour','colour']]],
 ['Which takes the shortest time?',[['blink your eyes','ok'],['eat your dinner','long'],['sleep at night','long']]],
 ['The sand timer runs out before the song ends. Which takes longer?',[['the song','ok'],['the sand timer','end'],['the same time','same']]]];
function why(t){let m='Start both together. The one still going at the end takes longer.';
 if(t==='short')m='A sneeze is over in a moment. A night of sleep goes on and on, so sleep takes longer.';
 if(t==='bigger')m='More claps means more time. Ava takes 8 claps, so she is slower. Ben is quicker.';
 if(t==='same')m='Count the claps for each one. Different numbers of claps means different times.';
 if(t==='order')m='6 claps and 6 claps are the same number, so they take the same time. Neither is longer.';
 if(t==='end')m='Ending last is not the test. Line up the starts, then the one still going takes longer.';
 if(t==='colour')m='Colour does not tell time. Slide both bars to the start line and see which is longer.';
 if(t==='long')m='That one goes on for a long time. A blink is over in a moment, so it is the shortest.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+2)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},box,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.6,tall:1.05,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Time controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.every(dt=>tickPlay(dt));A.gest({down:p=>down(p),move:p=>move(p),up:()=>{drag=null}});controls()}});
A.start()})})();
