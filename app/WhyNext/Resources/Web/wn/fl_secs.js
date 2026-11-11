/* Flagship: measuring time in seconds, minutes and hours (ages 5–6; NC Year 1 Measurement "measure and begin to record
   time (hours, minutes, seconds)"; CCSS K.MD.A.2 compare durations as a measurable attribute). Sort jobs by the unit that
   fits, fill a 1-minute sand timer ten seconds at a time to find 60, time a frog with a stopwatch, record a duration
   in words (not "o'clock"), and turn a 1-minute timer twice to brush for 2 minutes. Not flagdur, flaghr60 or flagtomin. */
(()=>{const lo=Math.min,hi=Math.max;
const UNIT=['seconds','minutes','hours'];
const JOBS=[['👁️','a blink',0,'A blink'],['👏','3 claps',0,'3 claps'],['🪥','brush teeth',1,'Brushing your teeth'],['🍎','a snack',1,'Eating a snack'],['🛌','a night’s sleep',2,'A night’s sleep'],['🏫','a school day',2,'A school day']];
const NOTE=[['🪥 Sand timer ran out 2 times','about 2 minutes',[["about 2 seconds",'short'],["2 o'clock",'oclock']]],
 ['⏱️ Stopwatch shows 8 after a race','8 seconds',[["8 o'clock",'oclock'],['8 hours','long']]],
 ["🎬 Film from 1 o'clock to 3 o'clock",'about 2 hours',[['about 2 minutes','short'],["3 o'clock",'oclock']]]];
VIS.reg('flagsecs',c=>{let A,pad,quiz,qn=-1,gen=0;const S={};c.fig.classList.add('young');
const INK='#0f172a',OK='#047857',NO='#b91c1c',RIM='#475569',SAND='#d97706',SEL='#6d28d9';
const font=(n,w)=>`${w||800} ${n}px system-ui,sans-serif`,sz=n=>A.narrow?n:Math.round(n*1.2);
const mode=()=>['unit','fill','frog','write','flip','chal'][A.step];
const mid=g=>{g.textAlign='center';g.textBaseline='middle'};
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function back(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#fef3c7',A.col.dark?.07:.5);g.fillRect(0,0,A.W,A.H)}
function pill(t,x,y,o){o=o||{};const g=A.ctx;let n=sz(o.n||14);g.font=font(n);let w=g.measureText(t).width+22;while(w>A.W-10&&n>10){n--;g.font=font(n);w=g.measureText(t).width+22}
 const h=n+16,x0=hi(5,lo(A.W-w-5,x-w/2));g.fillStyle='#fff';A.paint.rrect(x0,y-h/2,w,h,12);g.fill();g.lineWidth=o.ok||o.bad?3:1.5;g.strokeStyle=o.ok?OK:o.bad?NO:RIM;g.stroke();mid(g);g.fillStyle=INK;g.fillText(t,x0+w/2,y+1)}
function card(r,pic,word,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||'#fff';A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.lineWidth=o.ok||o.bad||o.on?4:2;g.strokeStyle=o.ok?OK:o.bad?NO:o.on?SEL:RIM;g.stroke();mid(g);
 if(pic){g.font=`${Math.round(lo(r.h*.4,r.w*.34))}px system-ui,sans-serif`;g.fillStyle='#000';g.fillText(pic,r.x+r.w/2,r.y+r.h*(word?.36:.5))}
 if(word){let n=Math.round(hi(11,pic?lo(sz(16),r.h*.21):lo(sz(19),r.h*.36)));g.font=font(n);while(g.measureText(word).width>r.w-8&&n>9){n--;g.font=font(n)}g.fillStyle=INK;g.fillText(word,r.x+r.w/2,r.y+r.h*(pic?.8:.5))}}
function hourglass(cx,top,w,h,f,flipT){const g=A.ctx,m=top+h/2;g.save();g.translate(cx,m);if(flipT)g.rotate(Math.PI*flipT);g.translate(-cx,-m);
 g.fillStyle='#fff';g.strokeStyle=RIM;g.lineWidth=3;g.beginPath();g.moveTo(cx-w/2,top);g.lineTo(cx+w/2,top);g.lineTo(cx+5,m);g.lineTo(cx+w/2,top+h);g.lineTo(cx-w/2,top+h);g.lineTo(cx-5,m);g.closePath();g.fill();g.stroke();
 g.fillStyle=SAND;const up=1-f,bt=f;if(up>0){const y=m-(h/2-6)*up;g.beginPath();g.moveTo(cx-(w/2-6)*up,y);g.lineTo(cx+(w/2-6)*up,y);g.lineTo(cx,m-2);g.closePath();g.fill()}
 if(bt>0){const y=top+h-4-(h/2-8)*bt;g.beginPath();g.moveTo(cx-w/2+5,top+h-4);g.lineTo(cx+w/2-5,top+h-4);g.lineTo(cx+(w/2-5)*(1-bt*.7),y);g.lineTo(cx-(w/2-5)*(1-bt*.7),y);g.closePath();g.fill()}
 g.fillStyle=INK;g.fillRect(cx-w/2-6,top-6,w+12,6);g.fillRect(cx-w/2-6,top+h,w+12,6);g.restore()}
/* 1. which unit fits? */
const bins=()=>{const w=(A.W-32)/3,h=A.H*.3;return UNIT.map((u,i)=>({i,x:8+i*(w+8),y:A.H*.66,w,h}))};
const jobCards=()=>{const w=lo(150,(A.W-40)/3),h=lo(92,A.H*.2);return JOBS.map((v,i)=>({i,x:A.W/2-1.5*w-10+(i%3)*(w+10),y:A.H*.1+Math.floor(i/3)*(h+8),w,h}))};
function drawUnit(){const s=S.u,g=A.ctx;back();
 bins().forEach(b=>{g.fillStyle=['#fde68a','#bfdbfe','#ddd6fe'][b.i];A.paint.rrect(b.x,b.y,b.w,b.h,14);g.fill();g.strokeStyle=RIM;g.lineWidth=2;g.stroke();g.fillStyle=INK;mid(g);g.font=font(sz(15));g.fillText(UNIT[b.i],b.x+b.w/2,b.y+16);
  const inBin=s.at.map((u,i)=>u===b.i?i:-1).filter(i=>i>=0);g.font=`${sz(26)}px system-ui,sans-serif`;inBin.forEach((j,k)=>g.fillText(JOBS[j][0],b.x+b.w/2+(k-(inBin.length-1)/2)*sz(34),b.y+b.h*.62))});
 jobCards().forEach(r=>{if(s.at[r.i]!=null||(S.drag&&S.drag.i===r.i))return;card(r,JOBS[r.i][0],JOBS[r.i][1],{bad:s.bad===r.i})});
 if(S.drag){const d=S.drag,r=jobCards()[d.i];card({...r,x:d.x-r.w/2,y:d.y-r.h/2},JOBS[d.i][0],JOBS[d.i][1],{on:1})}}
function sortJob(i,u){const s=S.u;if(s.at[i]!=null)return;const [,,right,name]=JOBS[i];
 if(u!==right){s.bad=i;A.sound.miss();return say(u<right?`Too short! ${name} ${i===1?'take':'takes'} longer than a few ${UNIT[u]}. Try a longer unit.`:`Too long! ${name} ${i===1?'are':'is'} over well before a few ${UNIT[u]}. Try a shorter unit.`)}
 s.at[i]=u;s.bad=null;A.sound.pop();say(`Yes: ${name} ${i===1?'take':'takes'} ${['a few seconds','a few minutes','many hours'][u]}.`+(s.at.every(x=>x!=null)?' Seconds are short, minutes are longer, hours are longest.':''))}
/* 2. fill a minute */
const glass=()=>({cx:A.W*.24,top:A.H*.2,w:lo(A.W*.3,170),h:A.H*.62});
const scoop=()=>{const w=lo(170,A.W*.4),h=lo(70,A.H*.15);return{x:A.W*.55,y:A.H*.1,w,h}};
function drawFill(){const s=S.f,g=A.ctx,G=glass();back();hourglass(G.cx,G.top,G.w,G.h,s.n/60);
 pill(s.n>=60?'60 seconds = 1 minute':`${s.n} seconds`,G.cx,A.H*.09,{ok:s.n>=60});
 if(s.n<60&&!(S.drag))card(scoop(),'🥄','+10 seconds',{});if(S.drag){const r=scoop();card({...r,x:S.drag.x-r.w/2,y:S.drag.y-r.h/2},'🥄','+10 seconds',{on:1})}
 const x0=A.W*.5,y0=A.H*.32,gap=lo(16,(A.W*.38)/10),rad=lo(6,gap*.36);for(let r=0;r<6;r++){for(let k=0;k<10;k++){g.fillStyle=r*10+k<s.n?SAND:(A.col.dark?'#334155':'#e2e8f0');g.beginPath();g.arc(x0+k*gap+rad,y0+r*(gap+6),rad,0,7);g.fill()}
  g.fillStyle=A.col.tx;g.font=font(sz(11));g.textAlign='left';g.textBaseline='middle';if(r*10<s.n)g.fillText(String(r*10+10),x0+10*gap+6,y0+r*(gap+6))}}
function addTen(){const s=S.f;if(s.n>=60){A.sound.miss();return say('It is full. 60 seconds fill the 1-minute timer, not 100.')}s.n+=10;A.sound.pop();
 say(s.n>=60?'Full! 6 scoops of 10 seconds is 60 seconds. 60 seconds make 1 minute.':`${s.n} seconds. Not a minute yet: keep going.`)}
/* 3. time the frog */
const goBtn=()=>{const w=lo(200,A.W*.5),h=lo(60,A.H*.13);return{x:A.W/2-w/2,y:A.H*.82,w,h}};
const FROG=3;
function frogT(){const f=S.g;return f.t0==null?0:((f.t1||performance.now())-f.t0)/1000}
function drawFrog(){const f=S.g,g=A.ctx,t=frogT();back();const sec=Math.floor(t);
 pill(`⏱️ ${f.t0==null?0:sec} ${sec===1?'second':'seconds'}`,A.W/2,A.H*.1,{n:18,ok:f.ok});
 const y=A.H*.55;g.fillStyle='#93c5fd';g.fillRect(0,y,A.W,A.H*.14);g.fillStyle='#78716c';g.beginPath();g.ellipse(A.W*.1,y+4,A.W*.07,A.H*.04,0,0,7);g.fill();
 g.fillStyle='#16a34a';g.beginPath();g.ellipse(A.W*.88,y+4,A.W*.08,A.H*.035,0,0,7);g.fill();
 const k=lo(1,t/FROG),hop=lo(FROG,t)%1,x=A.W*(.1+.78*k),yy=y-sz(18)-(t<FROG&&f.t0!=null?Math.sin(Math.PI*hop)*A.H*.14:0);mid(g);g.font=`${sz(34)}px system-ui,sans-serif`;g.fillText('🐸',x,yy);
 if(f.ok)pill(`It took ${FROG} seconds`,A.W/2,A.H*.35,{ok:1});card(goBtn(),'',f.t0!=null&&!f.t1?'Stop':'Start',{on:f.t0!=null&&!f.t1})}
function startStop(){const f=S.g;if(f.ok)return;if(f.t0==null||f.t1){f.t0=performance.now();f.t1=0;A.sound.tick();say('Go! The stopwatch counts the seconds. Stop it when the frog lands on the lily pad.');return}
 f.t1=performance.now();const t=frogT();if(t<FROG){A.sound.miss();return say(`Too soon! You stopped at ${Math.floor(t)} seconds, but the frog was still hopping. Press Start and wait until it lands.`)}
 if(t>FROG+1.6){A.sound.miss();return say(`Too late! The stopwatch kept counting after the frog landed, so ${Math.floor(t)} seconds is too long. Try again.`)}
 f.ok=1;A.sound.pop();say(`Stop! The stopwatch says ${FROG}. The frog took ${FROG} seconds.`)}
/* 4. write it down */
const answers=()=>{if(A.narrow){const w=A.W*.8,h=lo(50,A.H*.11);return[0,1,2].map(i=>({i,x:A.W*.1,y:A.H*.58+i*(h+8),w,h}))}const w=lo(190,(A.W-40)/3),h=lo(70,A.H*.16);return[0,1,2].map(i=>({i,x:A.W/2-1.5*w-10+i*(w+10),y:A.H*.62,w,h}))};
const ord=k=>{const N=NOTE[k],all=[[N[1],'ok'],...N[2]],r=k%3;return all.slice(r).concat(all.slice(0,r))};
function drawWrite(){const s=S.w,g=A.ctx;back();if(s.k>=3){pill('All 3 written down',A.W/2,A.H*.3,{ok:1});pill('A time taken: seconds, minutes or hours',A.W/2,A.H*.55,{n:13});return}
 pill(`Note ${s.k+1} of 3`,A.W/2,A.H*.08,{n:13});card({x:A.W*.06,y:A.H*.16,w:A.W*.88,h:A.H*.26},'',NOTE[s.k][0],{});
 g.fillStyle=A.col.tx;g.font=font(sz(14));mid(g);g.fillText('How long did it take?',A.W/2,A.H*.5);answers().forEach((r,j)=>card(r,'',ord(s.k)[j][0],{bad:s.bad===j}))}
function write(j){const s=S.w;if(s.k>=3)return;const [v,tag]=ord(s.k)[j];if(tag!=='ok'){s.bad=j;A.sound.miss();return say(why(tag))}
 s.k++;s.bad=null;A.sound.pop();say(`Yes: it took ${v}.`+(s.k>=3?' We write how long with seconds, minutes or hours.':''))}
/* 5. turn the timer */
const done2=()=>{const w=lo(200,A.W*.5),h=lo(58,A.H*.12);return{x:A.W/2-w/2,y:A.H*.84,w,h}};
const tglass=()=>({cx:A.W/2,top:A.H*.2,w:lo(A.W*.3,150),h:A.H*.5});
function drawFlip(){const s=S.t,G=tglass();back();pill(s.ok?'2 minutes of brushing':`Minutes so far: ${s.turns}`,A.W/2,A.H*.08,{ok:s.ok});
 hourglass(G.cx,G.top,G.w,G.h,s.sand,s.rot);if(s.busy)pill('1 minute (sped up)',A.W/2,A.H*.76,{n:12});if(!s.ok)card(done2(),'🪥','Done brushing',{})}
function flip(){const s=S.t;if(s.ok)return;if(s.busy)return say('Wait: the sand is still running.');s.busy=1;s.sand=0;s.rot=0;A.sound.tick();const g0=gen;
 A.tween(s,{sand:1},1000,'io',()=>{if(g0!==gen)return;s.busy=0;s.turns++;say(`The sand ran out: ${s.turns} ${s.turns===1?'minute':'minutes'} of brushing.`)});say('Turned! The sand runs for 1 minute.')}
function finish(){const s=S.t;if(s.ok||s.busy)return;if(s.turns===2){s.ok=1;A.sound.pop();return say('2 turns of a 1-minute timer is 2 minutes. Clean teeth!')}
 A.sound.miss();if(s.turns<2)return say(s.turns?'That was only 1 minute. Turn the timer once more.':'You have not turned the timer yet. Each turn is 1 minute.');
 s.turns=0;s.sand=0;say('That was more than 2 minutes: each turn adds 1 minute. Start again and turn it 2 times.')}
function draw(){const k=mode();if(k==='chal'){back();pill('Challenge',A.W/2,A.H*.16,{ok:1});pill('seconds, minutes, hours',A.W/2,A.H*.5,{n:14});return}
 ({unit:drawUnit,fill:drawFill,frog:drawFrog,write:drawWrite,flip:drawFlip})[k]();A.fx.draw(A.ctx)}
function down(p){const k=mode();
 if(k==='unit'){const r=jobCards().find(r=>inside(p,r)&&S.u.at[r.i]==null);if(r){S.drag={i:r.i,x:p.x,y:p.y};return true}return false}
 if(k==='fill'){if(S.f.n<60&&inside(p,scoop())){S.drag={x:p.x,y:p.y,x0:p.x,y0:p.y};return true}const G=glass();if(Math.abs(p.x-G.cx)<G.w/2&&p.y>G.top&&p.y<G.top+G.h)addTen();return false}
 if(k==='frog'){if(inside(p,goBtn()))startStop();return false}
 if(k==='write'){const r=answers().find(r=>inside(p,r));if(r&&S.w.k<3)write(r.i);return false}
 if(k==='flip'){const G=tglass();if(inside(p,done2())&&!S.t.ok)finish();else if(Math.abs(p.x-G.cx)<G.w/2+10&&p.y>G.top-10&&p.y<G.top+G.h+10)flip()}return false}
function move(p){if(!S.drag)return;S.drag.x=p.x;S.drag.y=p.y;A.redraw()}
function up(p){const d=S.drag;if(!d)return;S.drag=null;const k=mode();
 if(k==='unit'){const b=bins().find(b=>inside(p,b));if(b)sortJob(d.i,b.i);else A.redraw();return}
 if(k==='fill'){const G=glass(),tap=Math.hypot(p.x-d.x0,p.y-d.y0)<10;if(tap||(Math.abs(p.x-G.cx)<G.w/2+10&&p.y>G.top-20))addTen();else A.redraw()}}
function fresh(){gen++;for(const k in S)delete S[k];Object.assign(S,{u:{at:JOBS.map(()=>null),bad:null},f:{n:0},g:{t0:null,t1:0,ok:0},w:{k:0,bad:null},t:{turns:0,sand:0,rot:0,busy:0,ok:0},drag:null,hook:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.hook()}
const watch=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function open(i,desc,ok,msg){fresh();say(desc);S.hook=watch(i,ok,msg)}
function play(i,acts){steps[i].go();const g0=gen;acts.forEach(([ms,f])=>setTimeout(()=>{if(g0===gen)f()},ms))}
function buttons(){if(!pad)return;pad.innerHTML='';const k=mode(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='unit'){const i=S.u.at.findIndex(x=>x==null);if(i>=0)UNIT.forEach((u,j)=>B(`${JOBS[i][0]} ${JOBS[i][1]}: ${u}`,()=>sortJob(i,j)))}
 if(k==='fill'&&S.f.n<60)B('🥄 Add 10 seconds',addTen);
 if(k==='frog'&&!S.g.ok)B(S.g.t0!=null&&!S.g.t1?'Stop the stopwatch':'Start the stopwatch',startStop);
 if(k==='write'&&S.w.k<3)ord(S.w.k).forEach(([v],j)=>B(v,()=>write(j)));
 if(k==='flip'&&!S.t.ok){B('⏳ Turn the sand timer',flip);B('🪥 Done brushing',finish)}}
const steps=[
{h:'Seconds, minutes, hours',p:'Seconds are short. Minutes are longer. Hours are longest. Drag each job to the unit that fits.',
 predict:{q:'Brushing your teeth takes about 2 …',opts:['seconds','minutes','hours'],ans:1},task:'Sort all 6 jobs',
 show:()=>play(0,JOBS.map((v,i)=>[500*(i+1),()=>sortJob(i,v[2])])),
 go:()=>open(0,'Six jobs: a blink, 3 claps, brushing teeth, a snack, a night’s sleep, a school day. Three boxes: seconds, minutes, hours.',()=>S.u.at.every(x=>x!=null),'A blink takes seconds, a snack takes minutes, a night of sleep takes hours.')},
{h:'Fill a minute',p:'This sand timer lasts 1 minute. Each scoop is 10 seconds of sand. Drag scoops in until it is full.',
 predict:{q:'How many seconds make 1 minute?',opts:['10','60','100'],ans:1},task:'Fill the 1-minute timer',
 show:()=>play(1,[0,1,2,3,4,5].map(j=>[350*(j+1),addTen])),
 go:()=>open(1,'An empty 1-minute sand timer and a scoop that holds 10 seconds of sand. Beside it, 60 dots in rows of 10.',()=>S.f.n>=60,'60 seconds make 1 minute.')},
{h:'Time the frog',p:'A stopwatch counts seconds. Press Start, then press Stop when the frog lands on the lily pad.',
 predict:{q:'The frog does 3 quick hops. How long will that take?',opts:['About 3 seconds','About 3 minutes'],ans:0},task:'Time the frog with the stopwatch',
 show:()=>play(2,[[200,startStop],[200+FROG*1000+350,startStop]]),
 go:()=>open(2,'A stopwatch at 0 seconds. A frog on a rock, and a lily pad across the water.',()=>S.g.ok,`The frog took ${FROG} seconds. A stopwatch counts the seconds while something happens.`)},
{h:'Write it down',p:'When we time something, we write how long it took, with the unit. Pick the right words for each note.',task:'Write down all 3 times',
 show:()=>play(3,[0,1,2].map(k=>[550*(k+1),()=>write(ord(k).findIndex(o=>o[1]==='ok'))])),
 go:()=>open(3,'Three notes about things that were timed. For each, pick how long it took.',()=>S.w.k>=3,'How long is said in seconds, minutes or hours, not o\'clock.')},
{h:'Turn the timer',p:'This sand timer lasts 1 minute. Brush your teeth for 2 minutes. Tap the timer to turn it, then tap Done.',
 predict:{q:'How many times do you turn the 1-minute timer to brush for 2 minutes?',opts:['1 time','2 times','60 times'],ans:1},task:'Brush for exactly 2 minutes',
 show:()=>play(4,[[200,flip],[1500,flip],[2800,finish]]),
 go:()=>open(4,'A 1-minute sand timer and a Done brushing button. Each turn of the timer is 1 minute.',()=>S.t.ok,'Each turn of a 1-minute timer adds 1 minute, so 2 turns is 2 minutes.')},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.hook()});
const QS=[
 {q:'How many seconds make 1 minute?',a:'60',o:[['100','hundred'],['10','ten']]},
 {q:'Which takes about 1 second?',a:'A blink',o:[['A night of sleep','long'],['Eating lunch','long']]},
 {q:'Which unit fits a night of sleep?',a:'Hours',o:[['Seconds','short'],['Minutes','short']]},
 {q:'A stopwatch shows 9 at the end of a race. How long did the race take?',a:'9 seconds',o:[["9 o'clock",'oclock'],['9 hours','long']]},
 {q:'A 1-minute sand timer runs out 3 times. How long is that?',a:'3 minutes',o:[['1 minute','once'],['3 seconds','short']]},
 {q:'When do you stop the stopwatch?',a:'When the job ends',o:[['When it gets to 10','stopat'],['Before the job ends','stopat']]}];
function why(t){let m='Think about how long it really takes: seconds are short, minutes longer, hours longest.';
 if(t==='hundred')m='Not 100. Count the scoops: 6 lots of 10 seconds is 60 seconds, and that is 1 minute.';
 if(t==='ten')m='10 seconds is only one scoop. It takes 6 scoops of 10 seconds, 60 seconds, to fill a minute.';
 if(t==='long')m='That is far too long. Hours are for long things like sleep or a school day.';
 if(t==='short')m='That is too short. Seconds are for very quick things, like a blink or a clap.';
 if(t==='oclock')m="O'clock tells you when something happens, not how long it takes. Use seconds, minutes or hours.";
 if(t==='once')m='Each turn of the timer is 1 minute. 3 turns is 3 minutes, not 1.';
 if(t==='stopat')m='Stop the stopwatch when the job ends, so it shows how long the job took.';
 return m}
function ask(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,list=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');list.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.64,tall:1.15,draw,onStep:B=>{quiz.hidden=B.step!==5;pad.hidden=B.step===5;buttons()},
 init:B=>{A=B;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Time lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);
  A.every(()=>{if(mode()!=='frog'||!S.g||S.g.t0==null||S.g.t1)return false;if(Math.floor(frogT())!==S.g.last){S.g.last=Math.floor(frogT());A.cv.setAttribute('aria-label',`Stopwatch: ${S.g.last} seconds`)}return true});
  fresh();A.gest({down,move,up});buttons()}}).start()})})();
