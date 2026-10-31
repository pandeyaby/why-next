/* Flagship – thinking before starting (ages 6–7): wake up what you already know about a new topic (drag memory bubbles
   into the think cloud), sort Know and Wonder cards (the K and W of a KWL chart), race Rush against Sam with a think time
   you choose, pick the thing you already know that helps with a new job, and put Stop, Think, Wonder, Start in order. */
(()=>{
const MEM=[['Bees make honey.',1],['I like pizza.',0],['Bees can sting.',1],['My bike is red.',0],['I saw a bee on a flower.',1],['Bees buzz.',1]];
const KW=[['Bees have wings.','k'],['How do bees make honey?','w'],['Bees live in a hive.','k'],['Where do bees sleep?','w'],['Why do bees like flowers?','w'],['Honey is sweet.','k']];
const USE=[['Read the new word sunhat',['I can read sun and hat.','I can hop on one foot.','I have a cat.'],0],
 ['Make a paper boat',['I like the colour blue.','I can fold paper in half.','I can count to 10.'],1],
 ['Count 12 apples',['I can whistle.','My shoes are new.','I can count to 10, then keep going.'],2],
 ['Plant a seed',['Plants need water and light.','Cars have wheels.','I can draw a cat.'],0]];
const PLAN=['🛑 Stop','💭 Think: what do I know?','❓ Wonder: what do I want to find out?','▶️ Start'];
/* race model: every second of looking first saves wrong tries, but past 2 seconds it is just waiting */
const MIST=[4,2,0,0,0],timeFor=t=>t+6+2*MIST[t];
VIS.reg('flagthink',c=>{let A,pad,qbox,qi=-1,ver=0,streak=0;c.fig.classList.add('young');
const fresh=()=>({want:()=>{},won:0,r:0,cloud:[],kw:[],drag:null,bad:-1,tried:{},run:null,rk:0,order:[],pick:-1,deck:[]}),S=fresh();
const mode=()=>['wake','kw','race','use','plan','quiz'][A.step],fast=()=>A.reduced();
const fz=n=>Math.round(n*(A.narrow?1:1.12)),say=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
const need=()=>({wake:3,kw:4,race:3,use:3,plan:1}[mode()]||9);
function txt(g,t,x,y,n,col,wt,mw){g.font=`${wt||800} ${fz(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,mw||A.W-12)}
function card(g,x,y,w,h,t,state,n){const C=A.col,edge=state==='bad'?C.rd:state==='good'?C.gr:state==='hot'?C.vi:A.mix(C.tx,C.pn,.35);
 g.fillStyle=state==='good'?A.alpha(C.gr,.22):C.dark?'#1e293b':'#fff';A.paint.rrect(x-w/2,y-h/2,w,h,12);g.fill();g.lineWidth=state?4:2;g.strokeStyle=edge;g.stroke();txt(g,t,x,y,n||13,C.tx,700,w-10)}
/* ---- 1 wake up what you know ---- */
const bub=i=>{const cols=A.narrow?2:3,w=(A.W-24)/cols,row=Math.floor(i/cols);return{x:12+w*(i%cols)+w/2,y:A.H*(A.narrow?.56:.62)+row*A.H*(A.narrow?.13:.16),w:w-10,h:A.H*(A.narrow?.1:.12)}};
function drawWake(g){const C=A.col;card(g,A.W*.2,A.H*.17,A.W*.32,A.H*.16,'New: Bees 🐝',null,15);
 g.fillStyle=A.mix(C.pn,'#ddd6fe',C.dark?.18:.55);g.beginPath();g.ellipse(A.W*.66,A.H*.22,A.W*.3,A.H*.17,0,0,7);g.fill();g.strokeStyle=C.vi;g.lineWidth=2;g.stroke();
 txt(g,S.cloud.length?`I already know: ${S.cloud.length}`:'My think cloud',A.W*.66,A.H*.12,13,C.tx);S.cloud.slice(-2).forEach((i,j)=>txt(g,MEM[i][0],A.W*.66,A.H*(.21+j*.08),12,C.tx,700,A.W*.5));
 MEM.forEach((m,i)=>{if(S.cloud.includes(i))return;let b=bub(i);if(S.drag&&S.drag.i===i&&S.drag.x!=null)b={...b,x:S.drag.x,y:S.drag.y};card(g,b.x,b.y,b.w,b.h,m[0],i===S.bad?'bad':null,12)})}
function wake(i){if(mode()!=='wake'||S.won>=need()||S.cloud.includes(i))return;const[t,ok]=MEM[i];
 if(!ok){S.bad=i;return miss(`"${t}" is true, but it is not about bees. Pick a thing you know about bees.`)}
 S.cloud.push(i);S.won++;A.sound.pop();say(S.won<need()?`Yes! You already knew: ${t} ${need()-S.won} more.`:'Your think cloud is full. You knew lots about bees before you started!');keys();A.redraw();S.want()}
/* ---- 2 know or wonder ---- */
function drawKW(g){const C=A.col,top=A.H*.06,h=A.H*.5;[['k','I know',A.W*.25],['w','I wonder',A.W*.75]].forEach(([k,l,x])=>{g.fillStyle=A.mix(C.pn,k==='k'?'#bbf7d0':'#fde68a',C.dark?.16:.5);A.paint.rrect(x-A.W*.23,top,A.W*.46,h,14);g.fill();g.strokeStyle=A.mix(C.tx,C.pn,.4);g.lineWidth=2;g.stroke();
  txt(g,(k==='k'?'K  ':'W  ')+l,x,top+18,14);S.kw.filter(z=>KW[z][1]===k).forEach((z,j)=>txt(g,KW[z][0],x,top+46+j*22,11,C.tx,600,A.W*.44))});
 const z=S.deck[0];if(z==null)return;let p={x:A.W/2,y:A.H*.76};if(S.drag&&S.drag.x!=null)p=S.drag;card(g,p.x,p.y,Math.min(A.W*.8,360),A.H*.14,KW[z][0],S.bad===z?'bad':null,14)}
function sortKW(k){if(mode()!=='kw'||S.won>=need())return;const z=S.deck[0];if(z==null)return;
 if(KW[z][1]!==k){S.bad=z;return miss(k==='k'?`"${KW[z][0]}" asks something. A question you want to find out goes under I wonder.`:`"${KW[z][0]}" tells a thing. It is something you know, not a question.`)}
 S.deck.shift();S.kw.push(z);S.won++;A.sound.pop();say(k==='k'?'Yes, that is a thing you know.':'Yes, that is a question to find out.');keys();A.redraw();S.want()}
/* ---- 3 rush or think ---- */
function drawRace(g){const C=A.col,lanes=[['Rush',0],['Sam',S.run?S.run.t:null]];
 lanes.forEach(([n,t],j)=>{const y=A.H*(.16+j*.25),x0=A.W*.2,x1=A.W*.95;txt(g,n,A.W*.1,y,14);g.fillStyle=A.mix(C.pn,C.mu,.25);A.paint.rrect(x0,y-14,x1-x0,28,10);g.fill();
  if(t==null||!S.run)return;const tot=timeFor(t),f=Math.min(1,S.run.u*timeFor(0)/tot);g.fillStyle=j?C.vi:C.or;A.paint.rrect(x0,y-14,Math.max(8,(x1-x0)*f),28,10);g.fill();
  txt(g,f>=1?`done in ${tot} s · ${MIST[t]} wrong tries`:t&&S.run.u*timeFor(0)<t?'looking at the box…':'building…',(x0+x1)/2,y+26,12,C.tx,700)});
 txt(g,'Sam looks at the box picture first for…',A.W/2,A.H*.62,13);for(let t=0;t<5;t++){const x=A.W*(.14+t*.18),on=S.run&&S.run.t===t;g.fillStyle=on?C.vi:S.tried[t]?A.alpha(C.gr,.3):(C.dark?'#1e293b':'#fff');
  g.beginPath();g.arc(x,A.H*.76,Math.min(28,A.W*.07),0,7);g.fill();g.strokeStyle=on?C.vi:A.mix(C.tx,C.pn,.35);g.lineWidth=2;g.stroke();txt(g,t+' s',x,A.H*.76,14,on?'#fff':C.tx);if(S.tried[t])txt(g,timeFor(t)+' s',x,A.H*.89,11,C.mu,700)}}
function race(t){if(mode()!=='race')return;S.tried[t]=timeFor(t);S.run={t,u:0};A.sound.tick();const k=++S.rk;
 A.tween(S.run,{u:1},fast()?10:Math.min(800,timeFor(0)*60),'io',()=>{if(k!==S.rk||mode()!=='race')return;const n=Object.keys(S.tried).length;S.won=n;
  say(t===0?'Sam rushed like Rush: 4 wrong tries, 14 seconds.':MIST[t]?`Sam looked for ${t} second and still made 2 wrong tries: ${timeFor(t)} seconds.`:t===2?'Sam looked for 2 seconds, then put every piece right: 8 seconds, the fastest!':`Sam looked for ${t} seconds. No wrong tries, but the extra looking made it ${timeFor(t)} seconds.`);
  keys();A.redraw();S.want()})}
/* ---- 4 use what you know ---- */
function drawUse(g){const u=USE[S.r%4];card(g,A.W/2,A.H*.15,Math.min(A.W*.9,420),A.H*.16,'New job: '+u[0],null,15);txt(g,'Which thing you know helps?',A.W/2,A.H*.32,13,A.col.mu,700);
 u[1].forEach((t,i)=>{const y=A.H*(.46+i*.17);card(g,A.W/2,y,Math.min(A.W*.86,400),A.H*.13,t,i===S.bad?'bad':i===S.pick?'good':null,13)})}
function useIt(i){if(mode()!=='use'||S.won>=need())return;const u=USE[S.r%4];
 if(i!==u[2]){S.bad=i;return miss(`"${u[1][i]}" is a thing you know, but it does not help to ${u[0].toLowerCase()}. Which one links to the new job?`)}
 S.pick=i;S.won++;A.sound.pop();say(`Yes! "${u[1][i]}" helps you ${u[0].toLowerCase()}.`);const v=ver;setTimeout(()=>{if(v!==ver)return;S.r++;S.pick=-1;keys();A.redraw()},fast()?10:800);S.want();keys();A.redraw()}
/* ---- 5 my think plan ---- */
function drawPlan(g){for(let i=0;i<4;i++){const y=A.H*(.1+i*.12),t=S.order[i]!=null?PLAN[S.order[i]]:`${i+1}. ?`;card(g,A.W/2,y,Math.min(A.W*.9,420),A.H*.1,t,S.order[i]!=null?'good':i===S.order.length?'hot':null,13)}
 S.deck.forEach((p,j)=>{const b=planBox(j);card(g,b.x,b.y,b.w,b.h,PLAN[p],p===S.bad?'bad':null,12)})}
const planBox=j=>{const w=(A.W-24)/2;return{x:12+w*(j%2)+w/2,y:A.H*(.66+Math.floor(j/2)*.15),w:w-10,h:A.H*.12}};
function plan(p){if(mode()!=='plan'||S.won>=need())return;const want=S.order.length;
 if(p!==want){S.bad=p;return miss(p===3?'Not yet! Starting comes last. First stop, then think what you know.':want===0?'First, stop. You cannot think well while you are rushing.':`Next is: ${PLAN[want].slice(2)}.`)}
 S.order.push(p);S.deck=S.deck.filter(z=>z!==p);A.sound.pop();if(S.order.length===4){S.won=1;say('Stop, think, wonder, start. That is your think plan!')}else say(`${PLAN[p].slice(2)}. Then what?`);keys();A.redraw();S.want()}
/* ---- shared ---- */
function draw(A){const{ctx:g,W,H,col:C}=A,v=mode();g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.05:.35);g.fillRect(0,0,W,H);
 if(v==='quiz'){txt(g,'🛑 Stop  →  💭 Think  →  ❓ Wonder  →  ▶️ Start',W/2,H*.45,15);return}
 ({wake:drawWake,kw:drawKW,race:drawRace,use:drawUse,plan:drawPlan})[v](g);A.fx.draw(g)}
function miss(t){A.sound.miss();say(t);const v=ver;setTimeout(()=>{if(v===ver){S.bad=-1;A.redraw()}},fast()?10:1100);A.redraw()}
function keys(){if(!pad)return;pad.innerHTML='';const v=mode(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=fn};if(v==='quiz')return;
 if(v==='race'){for(let t=0;t<5;t++)B(`${t} s`,()=>race(t),`Sam looks first for ${t} seconds, then builds`);return}
 if(S.won>=need())return;
 if(v==='wake')MEM.forEach((m,i)=>{if(!S.cloud.includes(i))B(m[0],()=>wake(i),`Put "${m[0]}" in my think cloud`)});
 if(v==='kw'&&S.deck.length){B('✅ I know',()=>sortKW('k'),'Put this card under I know');B('❓ I wonder',()=>sortKW('w'),'Put this card under I wonder')}
 if(v==='use')USE[S.r%4][1].forEach((t,i)=>B(t,()=>useIt(i),`This helps: ${t}`));
 if(v==='plan')S.deck.forEach(p=>B(PLAN[p],()=>plan(p),`Next in my plan: ${PLAN[p].slice(2)}`))}
function hit(p,b){return Math.abs(p.x-b.x)<b.w/2&&Math.abs(p.y-b.y)<b.h/2}
function down(p){const v=mode();if(v==='wake'){const i=MEM.findIndex((m,i)=>!S.cloud.includes(i)&&hit(p,bub(i)));if(i>=0){S.drag={i,x:null,y:null,x0:p.x,y0:p.y};return true}}
 if(v==='kw'&&S.deck.length&&hit(p,{x:A.W/2,y:A.H*.76,w:Math.min(A.W*.8,360),h:A.H*.14})){S.drag={i:S.deck[0],x:null,y:null,x0:p.x,y0:p.y};return true}
 if(v==='race'&&p.y>A.H*.66&&p.y<A.H*.86){const t=Math.round((p.x/A.W-.14)/.18);if(t>=0&&t<5)race(t)}
 if(v==='use'){for(let i=0;i<3;i++)if(hit(p,{x:A.W/2,y:A.H*(.46+i*.17),w:Math.min(A.W*.86,400),h:A.H*.13}))useIt(i)}
 if(v==='plan'){const j=S.deck.findIndex((z,j)=>hit(p,planBox(j)));if(j>=0)plan(S.deck[j])}return false}
function move(p){const d=S.drag;if(!d)return;if(d.x!=null||Math.hypot(p.x-d.x0,p.y-d.y0)>8){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=S.drag;S.drag=null;if(!d)return;const v=mode();
 if(v==='wake'){if(d.x==null||p.y<A.H*.42)wake(d.i);else{say('Drag it up into the think cloud.');A.redraw()}}
 if(v==='kw'){if(d.x==null){say('Drag the card to I know or I wonder, or use the buttons.');return A.redraw()}if(p.y<A.H*.6)sortKW(p.x<A.W/2?'k':'w');else A.redraw()}}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list,gap){const k=++ver;list.forEach((fn,j)=>setTimeout(()=>{if(k===ver)fn()},fast()?j*40+30:(j+1)*(gap||300)))}
const wipe=deck=>{ver++;Object.assign(S,fresh(),{deck:deck||[]})};
const steps=[
{h:'Wake up what you know',p:'Something new is coming: bees! Before you start, stop and think. What do you already know? Drag those bubbles into your think cloud.',predict:{q:'You have not had a lesson on bees yet. Do you know anything about bees?',opts:['No, nothing yet','Yes, I know some things'],ans:1},task:'Put 3 bee things in your think cloud',
 show:()=>{steps[0].go();play([()=>wake(0),()=>wake(2),()=>wake(4)],450)},go:()=>{wipe();say('New topic: bees. What do you already know?');keys();S.want=ready(0,()=>S.won>=3,'Even before a lesson, you know things. Waking them up gives new facts a place to go.')}},
{h:'Know or wonder?',p:'A KWL chart has K for what I know and W for what I wonder. Put each card in the right side.',task:'Sort 4 cards',
 show:()=>{steps[1].go();play([0,1,2,3].map(z=>()=>sortKW(KW[z][1])),450)},go:()=>{wipe([0,1,2,3,4,5]);say('Card: '+KW[0][0]+' Is it I know or I wonder?');keys();S.want=ready(1,()=>S.won>=4,'Things you know tell. Things you wonder ask.')}},
{h:'Rush or think?',p:'Rush starts a puzzle at once. Sam looks at the box picture first. Pick how long Sam looks, and race!',predict:{q:'Who finishes the puzzle first?',opts:['Rush, who starts at once','Sam, who looks first for a short time'],ans:1},task:'Race 3 different think times',
 show:()=>{steps[2].go();play([()=>race(0),()=>race(2),()=>race(4)],1000)},go:()=>{wipe();say('Pick how many seconds Sam looks at the box first.');keys();S.want=ready(2,()=>S.won>=3&&S.tried[0]!=null&&Object.keys(S.tried).some(t=>t>0),'A short think made Sam fastest. Rushing caused wrong tries, and thinking too long is slow too.')}},
{h:'Use what you know',p:'Here is a new job. Tap the thing you already know that will help.',task:'Find the helpful thing 3 times',
 show:()=>{steps[3].go();play(USE.slice(0,3).flatMap(u=>[()=>useIt(u[2]),()=>{}]),450)},go:()=>{wipe();say('New job: '+USE[0][0]+'. Which thing you know helps?');keys();S.want=ready(3,()=>S.won>=3,'New jobs are easier when you link them to something you know.')}},
{h:'My think plan',p:'Put the four steps in order. What do you do first, before you start something new?',task:'Put the 4 steps in order',
 show:()=>{steps[4].go();play([0,1,2,3].map(p=>()=>plan(p)),400)},go:()=>{wipe([2,0,3,1]);say('Put the think plan in order. What comes first?');keys();S.want=ready(4,()=>S.won>=1,'Stop, think what you know, wonder, then start.')}},
{h:'Challenge',p:'',go:()=>{wipe();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Mia is about to learn about frogs. What should she do first?',[['Think: what do I know about frogs?','ok'],['Start reading as fast as she can','rush'],['Say "I know nothing about frogs"','nothing']]],
 ['Before a new maths game, Leo thinks for a little while. Is that wasting time?',[['No, it helps him make fewer mistakes','ok'],['Yes, he should just start','waste'],['He should think all lesson long','forever']]],
 ['Which card goes under I wonder?',[['How do frogs breathe under water?','ok'],['Frogs can jump.','know'],['I had toast for breakfast.','off']]],
 ['New job: make a paper plane. What do you know that helps?',[['How to fold paper in half','ok'],['How to ride a bike','off'],['Nothing helps with new things','nothing']]],
 ['What comes first in the think plan?',[['Stop and think what I know','ok'],['Start straight away','rush'],['Write what I learned','learned']]]];
function hint(t){let m='Stop and think what you already know before you start.';
 if(t==='rush')m='Rushing in skips the think. In the race, Rush made 4 wrong tries. Stop and think first.';
 if(t==='nothing')m='You almost always know something already. In the lab you knew bees buzz and make honey before any lesson.';
 if(t==='waste')m='A short think is not wasted. Sam looked for 2 seconds and finished faster than Rush.';
 if(t==='forever')m='Too long is slow too. Sam was fastest with a short look, not a very long one.';
 if(t==='know')m='Frogs can jump tells a thing. It is something you know. I wonder cards ask a question.';
 if(t==='off')m='That is true, but it is not about the new thing. Pick something that links to it.';
 if(t==='learned')m='What I learned comes at the end, after you finish. First, stop and think.';return m}
function quiz(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 qbox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qbox.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
function judge(t){qbox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qbox.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! Think first, then start.':'✗ '+hint(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.66,tall:1.25,draw,onStep:A=>{qbox.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);qbox=E('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});keys()}});
A.start()})})();
