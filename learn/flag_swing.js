/* Flagship – predicting motion patterns (ages 8–9; NGSS 3-PS2-2). Scenes: pull a pendulum bob aside and let go while
   a stopwatch times each swing there and back (always 2 s); use that pattern to say where the bob will be after 3, 6.5
   and 9 seconds, then watch to check; hang a cork, an apple and a steel ball (same time); drag the string length to make
   a 1-second and a 3-second swing; let go from a small and a big pull (about the same); predict a toy car's roll from a
   ramp table. Physics in learn/swing_art.js. Distinct from flagramp (ages 3–4, steeper ramp, faster car) and flaghz
   (wave frequency): this lab is about measuring a repeating motion and using the pattern to predict. */
(()=>{const W=SWG,TAU=Math.PI*2,RAD=Math.PI/180;
VIS.reg('flagswing',c=>{let A,row,box,qi=-1,gen=0;const P={};c.fig.classList.add('young');
const INK='#111827',YES='#047857',NO='#b91c1c',RIM='#6b7280',WALL='#f0f9ff',WOOD='#78350f',FT='px system-ui,sans-serif';
const now=()=>['watch','where','bobs','length','pull','ramp','quiz'][A.step];
const z=n=>A.narrow?n:Math.round(n*1.15);
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function bg(){const g=A.ctx;g.fillStyle=WALL;g.fillRect(0,0,A.W,A.H)}
function note(t,x,y,o){o=o||{};const g=A.ctx;let f=z(o.n||13);g.font=`700 ${f}${FT}`;while(f>9&&g.measureText(t).width+20>A.W-10){f--;g.font=`700 ${f}${FT}`}
 const w=g.measureText(t).width+20,h=f+13,l=Math.max(5,Math.min(A.W-w-5,x-w/2));g.fillStyle='#ffffff';A.paint.rrect(l,y-h/2,w,h,9);g.fill();
 g.lineWidth=o.ok||o.no?3:1.3;g.strokeStyle=o.ok?YES:o.no?NO:RIM;g.stroke();g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,l+w/2,y+1)}
function pad(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.no?'#fee2e2':o.ok?'#d1fae5':o.on?'#e0e7ff':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();
 g.lineWidth=o.no||o.ok||o.on?3.5:1.5;g.strokeStyle=o.no?NO:o.ok?YES:o.on?'#4338ca':RIM;g.stroke();let f=z(15);g.font=`800 ${f}${FT}`;while(f>9&&g.measureText(t).width>r.w-10){f--;g.font=`800 ${f}${FT}`}
 g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,r.x+r.w/2,r.y+r.h/2)}
const keyRow=n=>{const gap=10,w=(A.W-20-gap*(n-1))/n,h=Math.min(60,A.H*.13);return Array.from({length:n},(_,i)=>({i,x:10+i*(w+gap),y:A.H-h-10,w,h}))};
/* ---------- the pendulum ---------- */
const pivot=()=>({x:A.W*.45,y:A.H*.1});
const mPx=()=>now()==='length'?A.H*.6/W.LMAX:A.H*.5;
const sw=()=>P.pen;
const T=()=>W.swingTime(sw().L,Math.abs(sw().deg));
const angle=()=>{const s=sw();return s.deg*RAD*Math.cos(TAU*s.t/T())};
const bobAt=()=>{const O=pivot(),r=sw().L*mPx(),a=angle();return{x:O.x+r*Math.sin(a),y:O.y+r*Math.cos(a)}};
function drawPendulum(){const g=A.ctx,O=pivot(),s=sw(),B=bobAt(),bob=W.BOBS[s.bob];
 g.fillStyle=WOOD;g.fillRect(O.x-A.W*.2,O.y-12,A.W*.4,12);
 if(!s.run&&s.t===0){g.strokeStyle=RIM;g.setLineDash([3,5]);g.lineWidth=1.2;g.beginPath();g.moveTo(O.x,O.y);g.lineTo(O.x,O.y+s.L*mPx());g.stroke();g.setLineDash([])}
 g.strokeStyle=INK;g.lineWidth=2;g.beginPath();g.moveTo(O.x,O.y);g.lineTo(B.x,B.y);g.stroke();
 const r=z(bob.r);g.fillStyle=bob.col;g.beginPath();g.arc(B.x,B.y,r,0,TAU);g.fill();g.strokeStyle=INK;g.lineWidth=1.5;g.stroke();
 note(`Stopwatch: ${s.t.toFixed(1)} s`,A.W*.2,A.H*.05+20,{n:12});
 if(s.log.length)note('Swings: '+s.log.slice(-4).map(v=>v.toFixed(s.fine?2:1)+' s').join(', '),A.W/2,O.y+s.L*mPx()+z(bob.r)+30,{n:12,ok:s.log.length>0})}
function step(dt){const s=P.pen;if(!s||!s.run)return false;const sp=P.fast?12:s.speed||1;s.t+=dt*sp;const per=T();
 while(s.log.length<Math.floor(s.t/per)&&(!s.stop||s.log.length<s.stop)){s.log.push(per);A.sound.tick();if(s.onSwing)s.onSwing()}
 if(s.stop&&s.log.length>=s.stop){s.t=s.stop*per;s.run=false;if(s.after)s.after()}
 if(s.until!=null&&s.t>=s.until){s.t=s.until;s.run=false;if(s.after)s.after()}return s.run}
function letGo(deg){const s=sw();if(s.run)return;if(Math.abs(deg)<3){s.deg=-15;return speak('Pull the bob further to one side, then let go.')}
 s.deg=Math.max(-35,Math.min(35,deg));s.t=0;s.log=[];s.run=true;A.kick();speak(`Let go from ${Math.round(Math.abs(s.deg))} degrees. Watch the stopwatch.`)}
/* 1. watch it swing */
function enter1(){P.pen=Object.assign(fresh(),{stop:3,onSwing:()=>{const n=P.pen.log.length;c.say(`Swing ${n}: ${P.pen.log[n-1].toFixed(1)} seconds.`)},after:()=>speak('Three swings, and each one took 2.0 seconds. The same time every swing: that is a pattern.')})}
/* 2. where will it be? */
const zones=()=>keyRow(3);
function drawWhere(){const s=P.where;drawPendulum();if(s.i>=W.WHEN.length){note('All 3 predictions checked',A.W/2,A.H*.72,{ok:1});return}
 const Q=W.WHEN[s.i];note(`Where will the bob be after ${Q.t} seconds?`,A.W/2,A.H*.68,{n:13});
 zones().forEach(k=>pad(k,['Left','Middle','Right'][k.i],{on:s.pick===k.i&&s.judge==null,ok:s.judge===true&&s.pick===k.i,no:s.judge===false&&s.pick===k.i}))}
function guess(k){const s=P.where;if(s.i>=W.WHEN.length||sw().run)return;const Q=W.WHEN[s.i];s.pick=k;s.judge=null;
 Object.assign(sw(),{t:0,log:[],run:true,speed:3,until:Q.t,stop:0,after:()=>{const ok=k===Q.at,place=['on the left','in the middle','on the right'][Q.at];s.judge=ok;
  if(ok){A.sound.pop();const e=gen;setTimeout(()=>{if(e!==gen)return;s.i++;s.pick=-1;s.judge=null;Object.assign(sw(),{t:0,log:[]});speak(s.i<W.WHEN.length?'Next time.':'All three checked.')},P.fast?400:700);
   speak(`Yes: after ${Q.t} seconds it is ${place}. ${Q.t} seconds is ${Q.t/2} swings of 2 seconds.`)}
  else{A.sound.miss();speak(`It is ${place}. ${Q.t} seconds is ${Q.t/2} swings: whole swings end back on the left, and a half swing ends on the right.`)}}});A.kick();speak(`You said ${['left','middle','right'][k]}. Watch at 3 times speed.`)}
/* 3. heavy or light */
const bobKeys=()=>keyRow(3);
function hang(k){const s=sw();if(s.run)return;Object.assign(s,{bob:k,t:0,log:[],deg:-15});speak(`The ${W.BOBS[k].name} is on the string. Drag it aside and let go, or tap Let go.`)}
function enter3(){P.pen=Object.assign(fresh(),{stop:1,after:()=>{const s=P.pen;P.tried[s.bob]=true;A.sound.pop();speak(`The ${W.BOBS[s.bob].name} took ${s.log[0].toFixed(1)} seconds. ${Object.keys(P.tried).length<3?'Try another bob.':'All three took the same time.'}`)}})}
function drawBobs(){drawPendulum();bobKeys().forEach(k=>pad(k,W.BOBS[k.i].name,{on:sw().bob===k.i,ok:P.tried[k.i]}))}
/* 4. string length */
const track=()=>({x:A.W-58,y:A.H*.12,w:40,h:A.H*.6});
const knobY=()=>{const R=track();return R.y+(sw().L-W.LMIN)/(W.LMAX-W.LMIN)*R.h};
function setLen(L){const s=sw();if(s.run)return;s.L=Math.max(W.LMIN,Math.min(W.LMAX,Math.round(L*4)/4));s.t=0;s.log=[];A.redraw()}
function enter4(){P.pen=Object.assign(fresh(),{L:1,stop:1,after:()=>{const s=P.pen,v=s.log[0],J=W.LENGTHS.find(q=>!P.made[q.want]&&Math.abs(v-q.want)<.05);
 if(J){P.made[J.want]=true;A.sound.pop();return speak(`${s.L} metres: ${v.toFixed(1)} seconds a swing. ${Object.keys(P.made).length<2?'Now make the other one.':'Both made. Longer string, slower swing.'}`)}
 speak(`${s.L} metres: ${v.toFixed(1)} seconds a swing. ${!P.made[1]&&v>1.05?'For 1 second, make the string shorter.':''}${!P.made[3]&&v<2.95?' For 3 seconds, make it longer.':''}`)}})}
function drawLength(){const g=A.ctx,R=track();drawPendulum();g.fillStyle='#64748b';A.paint.rrect(R.x+15,R.y,10,R.h,5);g.fill();
 const y=knobY();g.fillStyle='#4338ca';g.beginPath();g.arc(R.x+20,y,z(18),0,TAU);g.fill();g.strokeStyle='#ffffff';g.lineWidth=2;g.stroke();g.fillStyle='#ffffff';g.font=`800 ${z(16)}${FT}`;g.textAlign='center';g.textBaseline='middle';g.fillText('↕',R.x+20,y);
 note(`String: ${sw().L} m`,A.W*.75,A.H*.05+20,{n:12});note(`1 s swing ${P.made[1]?'✓':''}   3 s swing ${P.made[3]?'✓':''}`,A.W/2,A.H-30,{n:12,ok:P.made[1]&&P.made[3]})}
/* 5. small or big pull */
function enter5(){P.pen=Object.assign(fresh(),{stop:1,fine:true,after:()=>{const s=P.pen,a=Math.abs(s.deg);P.pulls.push({a,v:s.log[0]});
 if(a<=12)P.small=true;if(a>=25)P.big=true;A.sound.pop();speak(`From ${Math.round(a)} degrees: ${s.log[0].toFixed(2)} seconds. ${P.small&&P.big?'Small pull or big pull, about the same time.':a<=12?'Now try a big pull, 25 degrees or more.':a>=25?'Now try a small pull, 12 degrees or less.':'Try a small pull (12 degrees or less) and a big one (25 or more).'}`)}})}
function drawPull(){drawPendulum();const s=sw();if(!s.run&&s.t===0)note(`Pull: ${Math.round(Math.abs(s.deg))}°`,A.W*.8,A.H*.05+20,{n:12});
 note(P.pulls.map(q=>`${Math.round(q.a)}°: ${q.v.toFixed(2)} s`).join('   ')||'Small pull: up to 12°. Big pull: 25° or more.',A.W/2,A.H-30,{n:12,ok:P.small&&P.big})}
/* 6. ramp table */
const answers=()=>keyRow(3);
function drawRamp(){const g=A.ctx,s=P.ramp;bg();const x0=14,y0=A.H*.56,hh=A.H*.15;g.fillStyle='#fcd34d';g.beginPath();g.moveTo(x0,y0-hh);g.lineTo(x0+A.W*.3,y0);g.lineTo(x0,y0);g.closePath();g.fill();g.fillStyle='#a8a29e';g.fillRect(x0,y0,A.W-28,8);
 g.fillStyle='#2563eb';A.paint.rrect(x0+A.W*.55,y0-16,34,14,4);g.fill();
 W.RAMP.forEach((r,k)=>note(`From ${r.h} cm high: rolls ${r.d} cm`,A.W/2,A.H*.08+k*z(30),{n:12}));
 if(s.i>=W.ASK.length){note('Twice as high, twice as far',A.W/2,A.H*.68,{ok:1});return}
 const Q=W.ASK[s.i];note(Q.q,A.W/2,A.H*.68,{n:13});answers().forEach(k=>pad(k,Q.o[k.i]+' cm',{no:s.miss===k.i}))}
function answer(k){const s=P.ramp;if(s.i>=W.ASK.length)return;const Q=W.ASK[s.i],v=Q.o[k];
 if(v!==Q.a){s.miss=k;A.sound.miss();return speak(`Not ${v} cm. Look down the table: every 10 cm higher adds 50 cm of roll, so the roll is always 5 times the height.`)}
 s.miss=-1;s.i++;A.sound.pop();speak(`Yes, ${v} cm: the roll is 5 times the height.`+(s.i<W.ASK.length?' Next.':''))}
function draw(){const k=now();if(k==='quiz'){bg();note('Challenge',A.W/2,A.H*.3,{ok:1});note('Spot the pattern, then predict',A.W/2,A.H*.5);return}
 if(k==='ramp')drawRamp();else{bg();({watch:drawPendulum,where:drawWhere,bobs:drawBobs,length:drawLength,pull:drawPull})[k]()}A.fx.draw(A.ctx)}
/* pointer: drag the bob aside and release; drag the length knob; tap keys */
function down(p){const k=now(),s=P.pen;
 if(k==='ramp'){const b=answers().find(q=>hit(p,q));if(b)answer(b.i);return false}
 if(k==='where'){const b=zones().find(q=>hit(p,q));if(b)guess(b.i);return false}
 if(k==='bobs'){const b=bobKeys().find(q=>hit(p,q));if(b){hang(b.i);return false}}
 if(k==='length'){const R=track();if(p.x>R.x-10&&!s.run){P.knob=true;setLen(W.LMIN+(p.y-R.y)/R.h*(W.LMAX-W.LMIN));return true}}
 if(s&&!s.run&&k!=='where'&&k!=='length'){const B=bobAt();if(Math.hypot(p.x-B.x,p.y-B.y)<z(40)){P.grab=true;return true}}return false}
function move(p){const s=P.pen;if(P.knob){const R=track();setLen(W.LMIN+(p.y-R.y)/R.h*(W.LMAX-W.LMIN))}
 if(P.grab){const O=pivot();s.deg=Math.max(-35,Math.min(35,Math.atan2(p.x-O.x,Math.max(10,p.y-O.y))/RAD));s.t=0;A.redraw()}}
function up(){if(P.knob){P.knob=false;speak(`String: ${sw().L} metres. Tap Let go.`)}if(P.grab){P.grab=false;letGo(sw().deg)}}
const fresh=()=>({L:W.SECONDS,deg:-15,t:0,log:[],run:false,bob:1,stop:1,speed:1});
function clear(){gen++;for(const k in P)delete P[k];Object.assign(P,{pen:fresh(),where:{i:0,pick:-1,judge:null},tried:{},made:{},pulls:[],small:false,big:false,ramp:{i:0,miss:-1},fast:false,hook:()=>{}})}
function speak(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();P.hook()}
/* button twins */
function controls(){if(!row)return;row.innerHTML='';const k=now(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},row,t).onclick=f};
 if(k==='watch'||k==='bobs'||k==='length')add('Let go',()=>letGo(sw().deg),'Let the bob go from where it is');
 if(k==='where'&&P.where.i<W.WHEN.length)['Left','Middle','Right'].forEach((t,i)=>add(t,()=>guess(i),`After ${W.WHEN[P.where.i].t} seconds the bob is ${t.toLowerCase()}`));
 if(k==='bobs')W.BOBS.forEach((b,i)=>add(b.name,()=>hang(i),`Hang the ${b.name}`));
 if(k==='length'){add('Shorter string',()=>{setLen(sw().L-.25);speak(`String: ${sw().L} metres.`)},'Make the string 25 centimetres shorter');add('Longer string',()=>{setLen(sw().L+.25);speak(`String: ${sw().L} metres.`)},'Make the string 25 centimetres longer')}
 if(k==='pull'){add('Small pull',()=>letGo(-10),'Let go from 10 degrees');add('Big pull',()=>letGo(-30),'Let go from 30 degrees')}
 if(k==='ramp'&&P.ramp.i<W.ASK.length)W.ASK[P.ramp.i].o.forEach((v,i)=>add(v+' cm',()=>answer(i)))}
const ready=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function start(i,ok,setup){clear();if(setup)setup();speak(W.DESC[i]);P.hook=ready(i,ok,W.DONE[i])}
function demo(i,acts,ms){steps[i].go();P.fast=true;const e=gen;acts.forEach((f,j)=>setTimeout(()=>{if(e===gen)f()},ms*j+200))}
const steps=[
{h:'Pull and let go',p:'A pendulum is a weight, called a bob, on a string. Pull the bob to one side and let go. The stopwatch times each swing there and back.',task:'Time 3 swings',
 show:()=>demo(0,[()=>letGo(-20)],300),go:()=>start(0,()=>sw().log.length>=3,enter1)},
{h:'Where will it be?',p:'Each swing there and back takes 2 seconds. Use that pattern to say where the bob will be, then watch to check.',
 predict:{q:'The bob starts on the left. Each swing there and back takes 2 seconds. Where is it after 4 seconds?',opts:['On the right','In the middle','Back on the left'],ans:2},task:'Check all 3 predictions',
 show:()=>demo(1,W.WHEN.map(Q=>()=>guess(Q.at)),1200),go:()=>start(1,()=>P.where.i>=W.WHEN.length,()=>{P.pen.deg=-12;P.pen.stop=0})},
{h:'Heavy or light?',p:'Same string, three bobs. Hang each one and time one swing.',
 predict:{q:'A heavy steel ball and a light cork hang on the same string. Which swings there and back faster?',opts:['The steel ball','The cork','Neither: the same time'],ans:2},task:'Time all 3 bobs',
 show:()=>demo(2,[0,1,2].flatMap(i=>[()=>hang(i),()=>letGo(-15)]),450),go:()=>start(2,()=>Object.keys(P.tried).length>=3,enter3)},
{h:'Longer or shorter string',p:'Drag the handle on the right to change the string, then let go.',
 predict:{q:'You make the string longer. Each swing will take…',opts:['Less time','More time','The same time'],ans:1},task:'Make a 1-second swing and a 3-second swing',
 show:()=>demo(3,[()=>setLen(.25),()=>letGo(-15),()=>setLen(2.25),()=>letGo(-15)],700),go:()=>start(3,()=>P.made[1]&&P.made[3],enter4)},
{h:'Small pull or big pull',p:'Drag the bob out a little, let go, then drag it out a lot. Compare the times.',
 predict:{q:'Pull the bob out much further. Each swing will take…',opts:['Much longer','About the same time','Much less time'],ans:1},task:'Try a small pull and a big pull',
 show:()=>demo(4,[()=>letGo(-10),()=>letGo(-30)],900),go:()=>start(4,()=>P.small&&P.big,enter5)},
{h:'Rolling cars',p:'Sam lets a toy car go from different heights on one ramp. Spot the pattern in the table and predict.',task:'Answer all 3',
 show:()=>demo(5,W.ASK.map(Q=>()=>answer(Q.o.indexOf(Q.a))),600),go:()=>start(5,()=>P.ramp.i>=W.ASK.length)},
{h:'Challenge',p:'',go:()=>{clear();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>P.hook()});
function why(t){let m='Look for the pattern first, then use it to predict.';
 if(t==='heavy')m='The weight of the bob does not change the swing time. Only the string length does.';
 if(t==='long')m='A longer string swings more slowly. The shortest string goes back and forth fastest.';
 if(t==='big')m='A bigger pull makes the bob go faster, but it has further to go, so each swing takes about the same time.';
 if(t==='stop')m='A repeating motion follows a pattern, so you can predict what comes next.';
 if(t==='same')m='Each swing or step adds the same amount again. Count how many times.';
 if(t==='add')m='The pattern grows by the same amount each time: multiply, do not just add once.';
 return m}
function ask(){qi++;const Q=W.QS[qi%W.QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 box.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=box.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>grade(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function grade(t,a){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),yes=t==='ok';if(yes)A.win();else A.sound.miss();
 fb.innerHTML=(yes?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="lbtn sm">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(yes?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:x=>{box.hidden=x.step!==6;row.hidden=x.step===6;controls()},
 init:x=>{A=x;const w=c.el('div',{class:'fl-below'},A.below);row=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Pendulum lab buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);clear();A.every(step);A.gest({down,move,up});controls()}}).start()})})();
