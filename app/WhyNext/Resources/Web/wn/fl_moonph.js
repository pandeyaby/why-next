/* Flagship: Sun, Moon and stars (ages 6-7; NGSS 1-ESS1-1 "use observations of the sun, moon, and stars to describe
   patterns that can be predicted"). Move the Sun from sunrise in the east to sunset in the west, turn the clock to
   night and see the stars that were there all day, step a whole month of Moon shapes, put the shapes in order, and
   sort what we see in the day sky, the night sky or both. Not flagsky (day/night sort and seasons) or flagstar. */
(()=>{
VIS.reg('flagmoonph',c=>{let A,pad,quizBox,qi=-1,epoch=0;const M={};c.fig.classList.add('young');
const INK='#0f172a',YES='#047857',NO='#b91c1c',SUN='#f59e0b',LIT='#fef3c7',DARKM='#475569',NIGHT='#0f172a',DAY='#7dd3fc',GRASS='#4d7c0f';
const LEN=29.5,ORDER=[0,4,7,11,15],NAMES=['new moon','thin crescent','half moon','nearly full','full moon'],SHUF=[3,0,4,1,2];
const SKY=[['the Sun',0,'We see the Sun in the day. At night it is on the other side of Earth.'],['lots of stars',1,'Stars show at night. In the day the bright sky hides them.'],
 ['the Moon',2,'The Moon can be in the night sky, and on many days you can see it in the day too.'],['a bright blue sky',0,'Sunlight makes the sky bright and blue in the day.'],
 ['sunset',0,'Sunset is the end of the day, when the Sun goes down in the west.'],['a dark sky',1,'When the Sun has set, the sky goes dark.']];
const now=()=>['sun','stars','phase','order','sort','chal'][A.step];
const lim=(v,a,b)=>v<a?a:v>b?b:v;
function pill(t,x,y,o){o=o||{};const g=A.ctx;let f=o.f||(A.narrow?14:16);g.font=`800 ${f}px system-ui,sans-serif`;let w=g.measureText(t).width+18;
 while(w>A.W-8&&f>10){f--;g.font=`800 ${f}px system-ui,sans-serif`;w=g.measureText(t).width+18}const h=f+13,l=lim(x-w/2,4,A.W-w-4);
 g.fillStyle='#ffffff';A.paint.rrect(l,y-h/2,w,h,10);g.fill();g.lineWidth=o.ok||o.no?3:1.5;g.strokeStyle=o.ok?YES:o.no?NO:'#64748b';g.stroke();
 g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,l+w/2,y+1)}
/* the Moon d days after new moon; waxing is lit on the right, as seen from the northern half of Earth */
function moon(x,y,r,d){const g=A.ctx,th=2*Math.PI*((d%LEN)/LEN),f=(1-Math.cos(th))/2,right=th<Math.PI;
 g.fillStyle=DARKM;g.beginPath();g.arc(x,y,r,0,7);g.fill();if(f>.02){g.fillStyle=LIT;g.beginPath();g.arc(x,y,r,-Math.PI/2,Math.PI/2,!right);g.closePath();g.fill();
  g.fillStyle=f>.5?LIT:DARKM;g.beginPath();g.ellipse(x,y,Math.max(.5,r*Math.abs(Math.cos(th))),r,0,0,7);g.fill()}
 g.strokeStyle='#cbd5e1';g.lineWidth=1.5;g.beginPath();g.arc(x,y,r,0,7);g.stroke()}
function shape(d){d=Math.round(d)%30;return d<=1||d>=28?'new moon':d<=6||d>=24?'crescent':d<=8||d>=22?'half moon':d<=13||d>=17?'nearly full':'full moon'}
function ground(){const g=A.ctx,y=A.H*.78;g.fillStyle=GRASS;g.fillRect(0,y,A.W,A.H-y);g.fillStyle='#7c2d12';g.fillRect(A.W*.46,y-A.H*.12,A.W*.08,A.H*.12);
 g.fillStyle='#b91c1c';g.beginPath();g.moveTo(A.W*.44,y-A.H*.12);g.lineTo(A.W*.5,y-A.H*.2);g.lineTo(A.W*.56,y-A.H*.12);g.fill();return y}
function stars(a){if(a<=0)return;const g=A.ctx;g.fillStyle=`rgba(255,255,255,${a})`;for(let i=0;i<34;i++){const x=(i*97%100)/100*A.W,y=((i*53+17)%70)/100*A.H*.95;g.beginPath();g.arc(x,y,i%5?1.6:2.6,0,7);g.fill()}}
/* step 0: the Sun's path */
function sunXY(t){const y0=A.H*.78;return{x:A.W*.1+t*A.W*.8,y:y0-Math.sin(Math.PI*t)*A.H*.55}}
function part(t){return t<.06?'sunrise':t<.4?'morning':t<.6?'midday':t<.94?'afternoon':'sunset'}
function drawSun(){const S=M.sun,g=A.ctx,hi=Math.sin(Math.PI*S.t);g.fillStyle=A.mix('#fb923c',DAY,lim(hi*2,0,1));g.fillRect(0,0,A.W,A.H);
 g.strokeStyle='rgba(15,23,42,.35)';g.setLineDash([6,8]);g.lineWidth=2;g.beginPath();for(let i=0;i<=40;i++){const p=sunXY(i/40);i?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y)}g.stroke();g.setLineDash([]);
 const p=sunXY(S.t);g.fillStyle=SUN;g.beginPath();g.arc(p.x,p.y,A.narrow?20:24,0,7);g.fill();const y=ground();
 pill('East',A.W*.1,y+A.H*.1,{f:13});pill('West',A.W*.9,y+A.H*.1,{f:13});pill(part(S.t),A.W/2,A.H*.07,{ok:S.done})}
function moveSun(t){const S=M.sun;S.t=lim(t,0,1);if(S.t>=.97&&S.start)S.done=1;A.redraw()}
function sunMsg(){const S=M.sun,k=part(S.t);say(k==='sunrise'?'Sunrise. The Sun comes up in the east.':k==='sunset'?'Sunset. The Sun goes down in the west, the other side of the sky.':k==='midday'?'Midday. The Sun is at its highest.':`${k[0].toUpperCase()+k.slice(1)}. The Sun is moving across the sky towards the west.`)}
/* step 1: day to night */
function drawStars(){const N=M.night,g=A.ctx;g.fillStyle=A.mix(DAY,NIGHT,N.u);g.fillRect(0,0,A.W,A.H);stars(N.peek?1:lim((N.u-.6)/.25,0,1));
 const sy=A.H*.25+N.u*A.H*.9;if(sy<A.H*.8){g.fillStyle=SUN;g.beginPath();g.arc(A.W*.78,sy,A.narrow?20:24,0,7);g.fill()}moon(A.W*.22,A.H*.22,A.narrow?16:20,7);ground();
 pill(N.u<.3?'Day':N.u<.6?'Evening':N.u<.85?'Getting dark':'Night',A.W/2,A.H*.07,{ok:N.u>=.85});if(N.peek)pill('Sky glow off: the stars were there all day',A.W/2,A.H*.9,{f:12,ok:1})}
function setNight(u){const N=M.night;N.u=lim(u,0,1);N.peek=0;A.redraw()}
function nightMsg(){const u=M.night.u;say(u<.3?'Day. The sky is bright, so no stars show.':u<.6?'Evening. The Sun is going down.':u<.85?'Getting dark. The first stars are showing.':'Night. Now you see lots of stars. They were in the sky all day, hidden by the bright sky.')}
function peek(){M.night.peek=1;A.sound.pop();A.redraw();say('If the sunny sky did not glow, you could see stars in the day. They are always there.')}
/* step 2: a month of Moon shapes */
function drawPhase(){const P=M.ph,g=A.ctx;g.fillStyle=NIGHT;g.fillRect(0,0,A.W,A.H);stars(.6);moon(A.W/2,A.H*.38,A.H*.2,P.d);
 pill(`Day ${P.d}: ${shape(P.d)}`,A.W/2,A.H*.08,{ok:P.done});const n=30,w=(A.W-24)/n,y=A.H*.82;
 for(let i=0;i<n;i++){const x=12+w*i+w/2;if(P.seen.has(i))moon(x,y,Math.min(w*.42,9),i);else{g.strokeStyle='#64748b';g.lineWidth=1;g.beginPath();g.arc(x,y,Math.min(w*.42,9)*.5,0,7);g.stroke()}
  if(i===P.d){g.strokeStyle='#fde047';g.lineWidth=2.5;g.strokeRect(x-w/2+1,y-14,w-2,28)}}pill('Drag along the days',A.W/2,A.H*.94,{f:11})}
function setDay(d,quiet){const P=M.ph;d=lim(Math.round(d),0,29);if(d===P.d&&quiet)return;for(let i=Math.min(P.d,d);i<=Math.max(P.d,d);i++)P.seen.add(i);P.d=d;
 if(P.seen.has(15)&&d===29)P.done=1;A.sound.tick();if(quiet)return A.redraw();
 const s=shape(d),grow=d>1&&d<14,shrink=d>16&&d<28;say(`Day ${d}: ${s}.`+(grow?' The lit part is growing each night.':shrink?' The lit part is shrinking each night.':s==='full moon'?' The whole face is lit.':' Almost none of the Moon is lit.'))}
/* step 3: put the shapes in order */
function cards(){const n=5,gap=8,w=Math.min(96,(A.W-gap*(n+1))/n),x0=(A.W-(w*n+gap*(n-1)))/2;return SHUF.map((k,i)=>({k,x:x0+i*(w+gap),y:A.H*.55,w,h:w*1.25}))}
function drawOrder(){const O=M.ord,g=A.ctx;g.fillStyle=NIGHT;g.fillRect(0,0,A.W,A.H);const C=cards(),w=C[0].w;
 for(let i=0;i<5;i++){const x=C[0].x+i*(w+8),y=A.H*.17;g.strokeStyle='#94a3b8';g.setLineDash([5,5]);g.lineWidth=1.5;A.paint.rrect(x,y,w,w,10);g.stroke();g.setLineDash([]);
  if(i<O.n)moon(x+w/2,y+w/2,w*.36,ORDER[i]);else{g.fillStyle='#cbd5e1';g.font='800 15px system-ui,sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(String(i+1),x+w/2,y+w/2)}}
 C.forEach(b=>{if(O.used.has(b.k))return;g.fillStyle='#1e293b';A.paint.rrect(b.x,b.y,b.w,b.h,10);g.fill();g.strokeStyle=O.bad===b.k?NO:'#94a3b8';g.lineWidth=O.bad===b.k?3:1.5;g.stroke();moon(b.x+b.w/2,b.y+b.w*.55,b.w*.34,ORDER[b.k])});
 pill(O.n>=5?'New moon to full moon, in order':`Tap the shape that comes ${['first','second','third','fourth','fifth'][O.n]}`,A.W/2,A.H*.07,{ok:O.n>=5})}
function pickCard(k){const O=M.ord;if(O.n>=5||O.used.has(k))return;if(k===O.n){O.used.add(k);O.n++;O.bad=-1;A.sound.pop();
  return say(O.n>=5?'In order: new moon, thin crescent, half moon, nearly full, full moon. The lit part grows a little each night.':`Yes, the ${NAMES[k]} comes next.`)}
 O.bad=k;A.sound.miss();say(k>O.n?`Not yet. The ${NAMES[k]} comes later. Look for the shape with a little less light.`:'That one is already placed.')}
/* step 4: day, night or both */
function binsS(){return['Day','Night','Both'].map((t,v)=>({t,v,x:A.W*(.03+v*.33),y:A.H*.56,w:A.W*.28,h:A.H*.34}))}
function drawSort(){const S=M.srt,g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#e0f2fe',A.col.dark?.08:.6);g.fillRect(0,0,A.W,A.H);
 if(S.k<SKY.length)pill(SKY[S.k][0],A.W/2,A.H*.3,{f:A.narrow?17:20});
 binsS().forEach(b=>{g.fillStyle=b.v===0?DAY:b.v===1?NIGHT:'#64748b';A.paint.rrect(b.x,b.y,b.w,b.h,12);g.fill();g.strokeStyle=A.col.tx;g.lineWidth=2;g.stroke();
  const cx=b.x+b.w/2,cy=b.y+b.h*.4,r=Math.min(b.w,b.h)*.17;if(b.v===0){g.fillStyle=SUN;g.beginPath();g.arc(cx,cy,r,0,7);g.fill()}else if(b.v===1){g.fillStyle='#ffffff';for(let i=0;i<3;i++){g.beginPath();g.arc(cx-r+i*r,cy+(i%2?-r*.5:r*.3),3,0,7);g.fill()}}else moon(cx,cy,r,7);
  pill(b.t,cx,b.y+b.h*.82,{f:13})});pill(S.k>=SKY.length?'All 6 sorted':`${S.k+1} of ${SKY.length}: when do we see it?`,A.W/2,A.H*.08,{ok:S.k>=SKY.length})}
function sortTo(v){const S=M.srt;if(S.k>=SKY.length)return;const [t,ok,why]=SKY[S.k];if(v!==ok){A.sound.miss();return say(`Think again about ${t}. ${why}`)}S.k++;A.sound.pop();say(`${['Day','Night','Both'][ok]}. ${why}`)}
function draw(){const k=now();if(k==='chal'){const g=A.ctx;g.fillStyle=NIGHT;g.fillRect(0,0,A.W,A.H);stars(.7);moon(A.W*.3,A.H*.45,A.H*.16,11);g.fillStyle=SUN;g.beginPath();g.arc(A.W*.72,A.H*.45,A.H*.12,0,7);g.fill();pill('Challenge',A.W/2,A.H*.1,{ok:1});return}
 ({sun:drawSun,stars:drawStars,phase:drawPhase,order:drawOrder,sort:drawSort})[k]();A.fx.draw(A.ctx)}
function down(p){const k=now();if(k==='sun'){M.drag=1;moveSun((p.x-A.W*.1)/(A.W*.8));return true}
 if(k==='stars'){M.drag=1;M.y0=p.y;M.u0=M.night.u;return true}
 if(k==='phase'){M.drag=1;setDay((p.x-12)/((A.W-24)/30)-.5,1);return true}
 if(k==='order'){const b=cards().find(b=>!M.ord.used.has(b.k)&&p.x>b.x&&p.x<b.x+b.w&&p.y>b.y&&p.y<b.y+b.h);if(b)pickCard(b.k);return false}
 if(k==='sort'){const b=binsS().find(b=>p.x>b.x&&p.x<b.x+b.w&&p.y>b.y&&p.y<b.y+b.h);if(b)sortTo(b.v);return false}return false}
function move(p){if(!M.drag)return;const k=now();if(k==='sun')moveSun((p.x-A.W*.1)/(A.W*.8));if(k==='stars')setNight(M.u0+(p.y-M.y0)/(A.H*.6));if(k==='phase')setDay((p.x-12)/((A.W-24)/30)-.5,1)}
function up(){if(!M.drag)return;M.drag=0;const k=now();if(k==='sun')sunMsg();if(k==='stars')nightMsg();if(k==='phase')setDay(M.ph.d)}
function fresh(){epoch++;for(const k in M)delete M[k];Object.assign(M,{sun:{t:0,start:1,done:0},night:{u:0,peek:0},ph:{d:0,seen:new Set([0]),done:0},ord:{n:0,used:new Set(),bad:-1},srt:{k:0},drag:0,hit:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();M.hit()}
const goal=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function enter(i,desc,ok,msg){fresh();say(desc);M.hit=goal(i,ok,msg)}
function demo(i,acts,ms){steps[i].go();const e0=epoch;acts.forEach((f,j)=>setTimeout(()=>{if(e0===epoch)f()},ms*(j+1)))}
function keys(){if(!pad)return;pad.innerHTML='';const k=now(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='sun'){B('Later',()=>{moveSun(M.sun.t+.2);sunMsg()},'Move the Sun on: later in the day');B('Earlier',()=>{moveSun(M.sun.t-.2);sunMsg()},'Move the Sun back: earlier in the day')}
 if(k==='stars'){B('Later',()=>{setNight(M.night.u+.25);nightMsg()},'Make it later, towards night');B('Earlier',()=>{setNight(M.night.u-.25);nightMsg()},'Make it earlier, towards day');if(M.night.u<.6)B('Turn off the sky glow',peek)}
 if(k==='phase'){B('Next night',()=>setDay(M.ph.d+1),'Go on 1 night');B('One week on',()=>setDay(M.ph.d+7),'Go on 7 nights');B('Back to day 0',()=>setDay(0),'Go back to the new moon')}
 if(k==='order')SHUF.forEach(j=>{if(!M.ord.used.has(j))B(NAMES[j],()=>pickCard(j),'Pick the '+NAMES[j])});
 if(k==='sort'){B('Day',()=>sortTo(0));B('Night',()=>sortTo(1));B('Both',()=>sortTo(2))}}
const steps=[
{h:'Sun up, Sun down',p:'It is sunrise. Drag the Sun across the sky, or tap Later, until the day ends.',
 predict:{q:'The Sun comes up in the east. Where does it go down?',opts:['the same side','the other side, the west','it does not go down'],ans:1},task:'Move the Sun from sunrise to sunset',
 show:()=>demo(0,[.25,.5,.75,1].map(t=>()=>{moveSun(t);sunMsg()}),600),
 go:()=>enter(0,'A sky at sunrise. The Sun is low on the east side, by a house.',()=>M.sun.done,'Every day the Sun comes up in the east and goes down in the west.')},
{h:'Stars in the day',p:'Drag down on the sky, or tap Later, to go from day to night. Watch for stars.',
 predict:{q:'Where are the stars in the daytime?',opts:['They go away','Still there, hidden by the bright sky','They are asleep'],ans:1},task:'Make it dark enough to see lots of stars',
 show:()=>demo(1,[()=>peek(),()=>{setNight(.5);nightMsg()},()=>{setNight(.75);nightMsg()},()=>{setNight(1);nightMsg()}],700),
 go:()=>enter(1,'A day sky with the Sun, a pale half Moon and a house.',()=>M.night.u>=.85,'Stars come out at night. In the day the bright sky hides them.')},
{h:'The Moon changes shape',p:'Each dot is one night. Drag along the dots, or tap Next night, from new moon all the way round.',
 predict:{q:'Night after night after the new moon, the lit part of the Moon…',opts:['gets bigger','gets smaller','stays the same'],ans:0},task:'Go from new moon, past full moon, to the end of the month',
 show:()=>demo(2,[()=>setDay(7),()=>setDay(15),()=>setDay(22),()=>setDay(29)],700),
 go:()=>enter(2,'A night sky with a new moon. A row of 30 dots shows 30 nights.',()=>M.ph.done,'The Moon grows to full, then shrinks back. The pattern takes about a month, then starts again.')},
{h:'Put the Moon in order',p:'Tap the Moon shapes in order, from new moon to full moon.',task:'Put all 5 shapes in order',
 show:()=>demo(3,[0,1,2,3,4].map(j=>()=>pickCard(j)),600),
 go:()=>enter(3,'Five Moon shape cards, mixed up, and five empty boxes.',()=>M.ord.n>=5,'From new to full, the lit part grows a little each night.')},
{h:'Day sky or night sky?',p:'When can we see each thing? Tap Day, Night or Both.',
 predict:{q:'Can you ever see the Moon in the daytime?',opts:['No, never','Yes, on many days','Only in winter'],ans:1},task:'Sort all 6',
 show:()=>demo(4,SKY.map(([,v])=>()=>sortTo(v)),500),
 go:()=>enter(4,'A sky card and three boxes: Day, Night and Both.',()=>M.srt.k>=SKY.length,'The Sun is a day thing, stars are a night thing, and the Moon can be both.')},
{h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>M.hit()});
const QS=[
 {q:'The Sun came up in the east. Where will it go down tonight?',a:'In the west',o:[['In the east again','same'],['It stays up all night','stay']]},
 {q:'Where are the stars at lunch time?',a:'In the sky, hidden by the bright sky',o:[['Gone until night','gone'],['Behind the Moon','gone']]},
 {q:'Tonight is a full moon. What will the Moon look like in a week?',a:'Less of it lit up',o:[['Full again','jump'],['Bigger than full','jump']]},
 {q:'How long until the Moon shapes start again?',a:'About a month',o:[['One day','day'],['One year','year']]},
 {q:'Can we see the Moon in the day?',a:'Yes, on many days',o:[['No, only at night','night'],['Only if it is full','night']]},
 {q:'In summer the Sun goes down late. When do the stars come out?',a:'Later at night',o:[['At the same time all year','summer'],['They do not come out','gone']]}];
function why(t){let m='Look at the sky again: the Sun, Moon and stars follow patterns.';
 if(t==='same')m='The Sun comes up in the east and goes down on the other side, in the west.';
 if(t==='stay')m='Every day the Sun goes down at sunset. That is when night begins.';
 if(t==='gone')m='Stars do not go away. The bright day sky hides them, like a torch in sunshine.';
 if(t==='jump')m='After full moon the lit part shrinks a little each night. In a week it is a half moon.';
 if(t==='day')m='The Moon changes a little each night. It takes about a month to go all the way round.';
 if(t==='year')m='A year is too long. The Moon goes round its shapes about once a month.';
 if(t==='night')m='The Moon is in the day sky on many days, even when it is not full. Look for it after school.';
 if(t==='summer')m='Stars show when the sky is dark. In summer it gets dark later, so stars come out later.';
 return m}
function quiz(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 quizBox.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quizBox.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>judge(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function judge(t,a){quizBox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quizBox.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:B=>{quizBox.hidden=B.step!==5;pad.hidden=B.step===5;keys()},
 init:B=>{A=B;const wrap=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Sky controls'},wrap);quizBox=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});keys()}}).start()})})();
