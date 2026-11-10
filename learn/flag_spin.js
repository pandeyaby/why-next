/* Flagship: Earth's spin and orbit (ages 7-9; National Curriculum in England Year 5 Earth and space: Earth's rotation
   explains day and night and the Sun's apparent movement across the sky; Earth orbits the Sun). Spin Earth through one
   24-hour turn, find day for Ben while Ava has night, watch the Sun seem to cross Ava's sky while only Earth turns,
   carry Earth once round the Sun in 365 days, then sort what a spin and an orbit each make. Not flagmoonph or flagstar. */
(()=>{
VIS.reg('flagspin',c=>{let A,pad,quizBox,qi=-1,epoch=0;const M={};c.fig.classList.add('young');
const INK='#0f172a',YES='#047857',NO='#b91c1c',SUN='#f59e0b',SEA='#0ea5e9',DARK='#1e293b',SPACE='#020617',SKY='#7dd3fc',GRASS='#4d7c0f',TAU=Math.PI*2;
const SORT=[['Day and night',0,'Day and night come from Earth spinning once every 24 hours.'],['Your birthday comes round again',1,'One trip round the Sun is one year, so your birthday comes round once a year.'],
 ['The Sun seems to rise in the east',0,'As Earth spins, your side turns towards the Sun, so it seems to rise.'],['365 days go by',1,'Earth takes about 365 days to go once round the Sun.'],
 ['24 hours go by',0,'One whole spin takes about 24 hours.'],['Summer comes round again',1,'The seasons come round once on each trip round the Sun.']];
const now=()=>['spin','far','sky','orbit','sort','chal'][A.step];
const lim=(v,a,b)=>v<a?a:v>b?b:v,wrap=a=>{while(a>Math.PI)a-=TAU;while(a<=-Math.PI)a+=TAU;return a};
function pill(t,x,y,o){o=o||{};const g=A.ctx;let f=o.f||(A.narrow?14:16);g.font=`800 ${f}px system-ui,sans-serif`;let w=g.measureText(t).width+18;
 while(w>A.W-8&&f>10){f--;g.font=`800 ${f}px system-ui,sans-serif`;w=g.measureText(t).width+18}const h=f+13,l=lim(x-w/2,4,A.W-w-4);
 g.fillStyle='#ffffff';A.paint.rrect(l,y-h/2,w,h,10);g.fill();g.lineWidth=o.ok||o.no?3:1.5;g.strokeStyle=o.ok?YES:o.no?NO:'#64748b';g.stroke();
 g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,l+w/2,y+1)}
function clock(h){const r=((Math.round(h)%24)+24)%24;return r===0?'12 midnight':r===12?'12 midday':r<12?r+' am':(r-12)+' pm'}
const isDay=h=>{const r=((h%24)+24)%24;return r>6&&r<18};
/* Earth seen from above the North Pole; the Sun is to the left, so the left half is lit. A clock hour h puts a person at
   screen angle -h/24 of a turn: 12 midday faces the Sun, 6 am is the sunrise edge. Earth turns anticlockwise. */
function geo(){const k=now();if(k==='sky'&&!A.narrow)return{sx:A.W*.05,ex:A.W*.27,ey:A.H*.5,R:Math.min(A.W*.17,A.H*.3)};
 if(k==='sky')return{sx:A.W*.07,ex:A.W*.55,ey:A.H*.25,R:A.H*.15};return{sx:A.W*.08,ex:A.W*.6,ey:A.H*.5,R:Math.min(A.W*.25,A.H*.33)}}
function earth(G,h,who){const g=A.ctx,{sx,ex,ey,R}=G;g.fillStyle=SPACE;if(!k2())g.fillRect(0,0,A.W,A.H);else if(A.narrow)g.fillRect(0,0,A.W,A.H*.5);else g.fillRect(0,0,A.W*.5,A.H);
 g.fillStyle=SUN;g.beginPath();g.arc(sx,ey,R*.55,0,TAU);g.fill();g.strokeStyle='rgba(253,224,71,.55)';g.lineWidth=2;
 for(let i=-2;i<=2;i++){g.beginPath();g.moveTo(sx+R*.7,ey+i*R*.4);g.lineTo(ex-R*1.1,ey+i*R*.4);g.stroke()}
 g.fillStyle=DARK;g.beginPath();g.arc(ex,ey,R,0,TAU);g.fill();g.fillStyle=SEA;g.beginPath();g.arc(ex,ey,R,Math.PI/2,Math.PI*1.5);g.closePath();g.fill();
 g.strokeStyle='#cbd5e1';g.lineWidth=2;g.beginPath();g.arc(ex,ey,R,0,TAU);g.stroke();
 g.fillStyle='#ffffff';g.beginPath();g.arc(ex,ey,4,0,TAU);g.fill();
 who.forEach(([n,dh,col])=>{const a=-(h+dh)/24*TAU,x=ex+Math.cos(a)*R,y=ey+Math.sin(a)*R;g.fillStyle=col;g.strokeStyle='#ffffff';g.lineWidth=2.5;
  g.beginPath();g.arc(x,y,A.narrow?9:11,0,TAU);g.fill();g.stroke();const q=R*.3+16;pill(n,x-Math.cos(a)*q,y-Math.sin(a)*q,{f:12})});
 g.strokeStyle='rgba(255,255,255,.7)';g.lineWidth=2;g.beginPath();g.arc(ex,ey,R+12,-2.4,-1.4);g.stroke();
 const a=-1.4;g.fillStyle='rgba(255,255,255,.7)';g.beginPath();g.moveTo(ex+Math.cos(a)*(R+18),ey+Math.sin(a)*(R+18));g.lineTo(ex+Math.cos(a)*(R+6),ey+Math.sin(a)*(R+6));g.lineTo(ex+Math.cos(a+.25)*(R+12),ey+Math.sin(a+.25)*(R+12));g.fill()}
const k2=()=>now()==='sky';
/* step 0 and 1: spin */
function drawSpin(){const E=M.e,G=geo(),far=now()==='far';earth(G,E.h,far?[['Ava',0,'#e11d48'],['Ben',12,'#7c3aed']]:[['Ava',0,'#e11d48']]);
 pill(far?`Ava ${isDay(E.h)?'day':'night'} · Ben ${isDay(E.h+12)?'day':'night'}`:`Ava: ${clock(E.h)}, ${isDay(E.h)?'day':'night'}`,A.W/2,A.H*.07,{ok:E.done});
 pill(far?'Drag Earth round to spin it':`Spun: ${Math.max(0,Math.round(E.spun))} of 24 hours`,A.W/2,A.H*.93,{f:12,ok:E.done})}
function spinBy(dh,quiet){const E=M.e;E.h+=dh;if(dh>0)E.spun+=dh;const k=now();if(k==='spin'&&E.spun>=23.5)E.done=1;
 if(k==='far'&&!isDay(E.h)&&isDay(E.h+12))E.done=1;if(k==='sky'&&E.spun>=11.5&&E.from)E.done=1;A.sound.tick();if(quiet)return A.redraw();spinMsg()}
function spinMsg(){const E=M.e,k=now(),d=isDay(E.h);
 if(k==='spin')return say(E.done?`One whole spin: 24 hours, one day. Ava is back at ${clock(E.h)}.`:`Ava: ${clock(E.h)}. Her side of Earth faces ${d?'the Sun, so it is day':'away from the Sun, so it is night'}. Spun ${Math.round(E.spun)} hours.`);
 if(k==='far')return say(`Ava has ${d?'day':'night'} (${clock(E.h)}). Ben, on the far side, has ${isDay(E.h+12)?'day':'night'} (${clock(E.h+12)}).`+(E.done?' Half of Earth always has day while the other half has night.':''));
 const r=((Math.round(E.h)%24)+24)%24;say(`${clock(E.h)}. `+(r===6?'Sunrise: Ava turns into the sunlight. The Sun seems to come up in the east.':r===18?'Sunset: Ava turns away from the Sun. It seems to go down in the west.':d?'Earth is turning Ava along, so the Sun seems to move across her sky.':'Night. Ava faces away from the Sun.'))}
/* step 2: Ava's sky */
function drawSky(){const E=M.e,G=geo();earth(G,E.h,[['Ava',0,'#e11d48']]);const g=A.ctx,x0=A.narrow?0:A.W*.5,y0=A.narrow?A.H*.5:0,w=A.narrow?A.W:A.W*.5,h=A.narrow?A.H*.5:A.H;
 const r=((E.h%24)+24)%24,up=Math.sin((r-6)/12*Math.PI),d=r>=6&&r<=18;g.fillStyle=d?A.mix('#fb923c',SKY,lim(up*2.2,0,1)):SPACE;g.fillRect(x0,y0,w,h);
 if(!d){g.fillStyle='#ffffff';for(let i=0;i<16;i++){g.beginPath();g.arc(x0+(i*37%100)/100*w,y0+((i*61+11)%55)/100*h,1.6,0,TAU);g.fill()}}
 const gy=y0+h*.78;if(d){const t=(r-6)/12,sx=x0+w*.1+t*w*.8,sy=gy-up*h*.6;g.fillStyle=SUN;g.beginPath();g.arc(sx,sy,A.narrow?14:18,0,TAU);g.fill()}
 g.fillStyle=GRASS;g.fillRect(x0,gy,w,y0+h-gy);g.strokeStyle='#ffffff';g.lineWidth=2;g.strokeRect(x0+1,y0+1,w-2,h-2);
 pill('East',x0+w*.13,gy+h*.11,{f:12});pill('West',x0+w*.87,gy+h*.11,{f:12});pill("Ava's sky",x0+w/2,gy+h*.11,{f:12});
 pill(`${clock(E.h)} · spun ${Math.max(0,Math.round(E.spun))} h`,A.narrow?A.W*.2:A.W*.25,A.narrow?A.H*.05:A.H*.08,{ok:E.done,f:12})}
/* step 3: orbit */
function og(){return{cx:A.W/2,cy:A.H*.52,rx:Math.min(A.W*.38,A.H*.62),ry:A.H*.34}}
function drawOrbit(){const O=M.o,g=A.ctx,{cx,cy,rx,ry}=og();g.fillStyle=SPACE;g.fillRect(0,0,A.W,A.H);
 g.strokeStyle='rgba(203,213,225,.6)';g.setLineDash([6,7]);g.lineWidth=2;g.beginPath();g.ellipse(cx,cy,rx,ry,0,0,TAU);g.stroke();g.setLineDash([]);
 g.fillStyle=SUN;g.beginPath();g.arc(cx,cy,A.narrow?20:26,0,TAU);g.fill();
 g.strokeStyle=YES;g.lineWidth=5;g.beginPath();g.ellipse(cx,cy,rx,ry,0,0,-O.a/365*TAU,true);g.stroke();
 pill('Birthday',cx+rx,cy+ry*.22,{f:11});const a=-O.d/365*TAU,x=cx+Math.cos(a)*rx,y=cy+Math.sin(a)*ry;
 g.fillStyle=SEA;g.beginPath();g.arc(x,y,A.narrow?11:13,0,TAU);g.fill();g.fillStyle=DARK;g.beginPath();g.arc(x,y,A.narrow?11:13,a-Math.PI/2,a+Math.PI/2);g.fill();
 g.strokeStyle='#ffffff';g.lineWidth=2;g.beginPath();g.arc(x,y,A.narrow?11:13,0,TAU);g.stroke();
 pill(`Day ${Math.round(O.d)} of the trip · ${Math.round(O.d)} spins`,A.W/2,A.H*.07,{ok:O.done})}
function setDay(d,quiet){const O=M.o;d=lim(d,0,365);O.d=d;O.a=Math.max(O.a,d);if(O.a>=360&&d>=360)O.done=1;A.sound.tick();if(quiet)return A.redraw();orbitMsg()}
function orbitMsg(){const O=M.o,d=Math.round(O.d);say(O.done?'Back to the birthday: 365 days, one year. Earth spun about 365 times on the way. The trip takes about a quarter of a day more, so every 4 years we add 29 February.':
 `Day ${d}. Earth has spun about ${d} times since the birthday${d>=180&&d<=185?', and it is halfway round the Sun':''}.`)}
/* step 4: spin or orbit */
function binsS(){return['Spin: 1 day','Orbit: 1 year'].map((t,v)=>({t,v,x:A.W*(.04+v*.5),y:A.H*.52,w:A.W*.42,h:A.H*.38}))}
function drawSort(){const S=M.srt,g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#e0f2fe',A.col.dark?.08:.6);g.fillRect(0,0,A.W,A.H);
 if(S.k<SORT.length)pill(SORT[S.k][0],A.W/2,A.H*.3,{f:A.narrow?16:20});
 binsS().forEach(b=>{g.fillStyle=SPACE;A.paint.rrect(b.x,b.y,b.w,b.h,12);g.fill();g.strokeStyle=A.col.tx;g.lineWidth=2;g.stroke();const cx=b.x+b.w/2,cy=b.y+b.h*.4,r=Math.min(b.w,b.h)*.16;
  if(b.v===0){g.fillStyle=DARK;g.beginPath();g.arc(cx,cy,r,0,TAU);g.fill();g.fillStyle=SEA;g.beginPath();g.arc(cx,cy,r,Math.PI/2,Math.PI*1.5);g.fill();g.strokeStyle='#ffffff';g.lineWidth=2;g.beginPath();g.arc(cx,cy,r+7,-2.4,-.6);g.stroke()}
  else{g.fillStyle=SUN;g.beginPath();g.arc(cx,cy,r*.6,0,TAU);g.fill();g.strokeStyle='#cbd5e1';g.lineWidth=1.5;g.beginPath();g.ellipse(cx,cy,r*2,r*1.1,0,0,TAU);g.stroke();g.fillStyle=SEA;g.beginPath();g.arc(cx+r*2,cy,5,0,TAU);g.fill()}
  pill(b.t,cx,b.y+b.h*.82,{f:13})});pill(S.k>=SORT.length?'All 6 sorted':`${S.k+1} of ${SORT.length}: a spin or an orbit?`,A.W/2,A.H*.08,{ok:S.k>=SORT.length})}
function sortTo(v){const S=M.srt;if(S.k>=SORT.length)return;const [t,ok,why]=SORT[S.k];if(v!==ok){A.sound.miss();return say(`Think again about "${t}". ${why}`)}S.k++;A.sound.pop();say(`${ok?'Orbit':'Spin'}. ${why}`)}
function draw(){const k=now();if(k==='chal'){earth(geo(),12,[]);pill('Challenge',A.W/2,A.H*.08,{ok:1});return}
 ({spin:drawSpin,far:drawSpin,sky:drawSky,orbit:drawOrbit,sort:drawSort})[k]();A.fx.draw(A.ctx)}
const ang=(p,G)=>Math.atan2(p.y-G.ey,p.x-G.ex);
function down(p){const k=now();if(k==='spin'||k==='far'||k==='sky'){const G=geo();if(Math.hypot(p.x-G.ex,p.y-G.ey)>G.R*1.6)return false;M.drag=1;M.a0=ang(p,G);return true}
 if(k==='orbit'){M.drag=1;move(p);return true}
 if(k==='sort'){const b=binsS().find(b=>p.x>b.x&&p.x<b.x+b.w&&p.y>b.y&&p.y<b.y+b.h);if(b)sortTo(b.v);return false}return false}
function move(p){if(!M.drag)return;const k=now();if(k==='orbit'){const{cx,cy,rx,ry}=og();let a=-Math.atan2((p.y-cy)/ry,(p.x-cx)/rx);if(a<0)a+=TAU;let d=a/TAU*365;
  if(M.o.d>300&&d<60)d=365;if(Math.abs(d-M.o.d)>120)return;return setDay(d,1)}
 const G=geo(),a=ang(p,G),da=wrap(a-M.a0);M.a0=a;spinBy(-da/TAU*24,1)}
function up(){if(!M.drag)return;M.drag=0;const k=now();if(k==='orbit')orbitMsg();else spinMsg()}
function fresh(){epoch++;for(const k in M)delete M[k];Object.assign(M,{e:{h:12,spun:0,done:0,from:0},o:{d:0,a:0,done:0},srt:{k:0},drag:0,hit:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();M.hit()}
const goal=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function enter(i,desc,ok,msg,pre){fresh();if(pre)pre();say(desc);M.hit=goal(i,ok,msg)}
function demo(i,acts,ms){steps[i].go();const e0=epoch;acts.forEach((f,j)=>setTimeout(()=>{if(e0===epoch)f()},ms*(j+1)))}
function keys(){if(!pad)return;pad.innerHTML='';const k=now(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='spin'||k==='far'||k==='sky'){B('Spin 3 hours',()=>spinBy(3),'Spin Earth on by 3 hours');B('Spin 1 hour',()=>spinBy(1),'Spin Earth on by 1 hour');B('Spin back',()=>spinBy(-3),'Spin Earth back by 3 hours')}
 if(k==='orbit'){B('On 1 month',()=>setDay(M.o.d+365/12),'Move Earth on by about 30 days');B('On 1 week',()=>setDay(M.o.d+7),'Move Earth on by 7 days');B('Back to the birthday',()=>{M.o.a=0;M.o.done=0;setDay(0)})}
 if(k==='sort'){B('Spin: 1 day',()=>sortTo(0));B('Orbit: 1 year',()=>sortTo(1))}}
const steps=[
{h:'One spin, one day',p:'Earth from above the North Pole, with the Sun on the left. Drag round Earth, or tap Spin, to turn it all the way round.',
 predict:{q:'How long does Earth take to spin round once?',opts:['About 1 hour','About 24 hours, one day','About 365 days'],ans:1},task:'Spin Earth one whole turn',
 show:()=>demo(0,[6,6,6,6].map(n=>()=>spinBy(n)),650),
 go:()=>enter(0,'Earth seen from above, with the Sun on the left. Ava is on the side facing the Sun. It is 12 midday for her.',()=>M.e.done,'Earth spins round once in about 24 hours. That is one day and one night.')},
{h:'Day here, night there',p:'Ben lives on the other side of Earth. Spin Earth until Ava has night and Ben has day.',
 predict:{q:'It is midday for Ava. What is it for Ben, on the far side of Earth?',opts:['Midday too','Night','Sunset'],ans:1},task:'Make it night for Ava and day for Ben',
 show:()=>demo(1,[()=>spinBy(3),()=>spinBy(3),()=>spinBy(3),()=>spinBy(3)],650),
 go:()=>enter(1,'Earth from above. Ava is on the sunny side at midday. Ben is on the dark side, at midnight.',()=>M.e.done,'The half of Earth facing the Sun has day. The other half has night.')},
{h:'The Sun seems to move',p:'Spin Earth from sunrise to sunset and watch the Sun in Ava\'s sky. The Sun itself stays still.',
 predict:{q:'The Sun crosses Ava\'s sky in the day. What is really moving?',opts:['The Sun goes round Earth','Earth is spinning','The clouds push the Sun'],ans:1},task:'Spin from sunrise to sunset',
 show:()=>demo(2,[3,3,3,3].map(n=>()=>spinBy(n)),650),
 go:()=>enter(2,'Two pictures: Earth from above, and the sky Ava sees. It is 6 am, sunrise.',()=>M.e.done,'Only Earth turns. As it spins, the Sun seems to rise in the east, cross the sky and set in the west.',()=>{M.e.h=6;M.e.from=1})},
{h:'A trip round the Sun',p:'Drag Earth along its path round the Sun, or tap On 1 month, until it is back at the birthday.',
 predict:{q:'Earth goes round the Sun once. How many times does it spin on the way?',opts:['Once','About 365 times','12 times'],ans:1},task:'Take Earth all the way round the Sun',
 show:()=>demo(3,[90,180,270,365].map(d=>()=>setDay(d)),650),
 go:()=>enter(3,'The Sun in the middle and Earth on its path, at the birthday mark.',()=>M.o.done,'Earth orbits the Sun once in about 365 days. That is one year.')},
{h:'Spin or orbit?',p:'Does a spin make it, or a trip round the Sun? Tap a box for each card.',task:'Sort all 6',
 show:()=>demo(4,SORT.map(([,v])=>()=>sortTo(v)),500),
 go:()=>enter(4,'A card and two boxes: Spin, 1 day, and Orbit, 1 year.',()=>M.srt.k>=SORT.length,'A spin makes a day. An orbit makes a year.')},
{h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>M.hit()});
const QS=[
 {q:'Why is it night in your town?',a:'Your side of Earth faces away from the Sun',o:[['The Sun goes out at night','out'],['The Moon covers the Sun','cover']]},
 {q:'How long does Earth take to spin round once?',a:'About 24 hours',o:[['About a year','year'],['About an hour','hour']]},
 {q:'How long does Earth take to go once round the Sun?',a:'About 365 days',o:[['About 24 hours','day'],['About a month','month']]},
 {q:'The Sun seems to cross the sky. Why?',a:'Earth is spinning',o:[['The Sun goes round Earth','round'],['The wind blows the Sun','round']]},
 {q:'It is day in the UK. Is it day everywhere on Earth?',a:'No, the far side has night',o:[['Yes, all of Earth is lit','all'],['Yes, it is day at the same time','all']]},
 {q:'Since your last birthday, what has Earth done?',a:'Gone once round the Sun',o:[['Spun round once','day'],['Gone round the Moon','moon']]}];
function why(t){let m='Picture Earth spinning by the Sun, and going round it.';
 if(t==='out')m='The Sun never goes out. Your side of Earth has turned away from it, and the other side has day.';
 if(t==='cover')m='The Moon does not cover the Sun at night. Earth itself is in the way: your side faces away from the Sun.';
 if(t==='year')m='A year is one trip round the Sun. One spin is much quicker: about 24 hours.';
 if(t==='hour')m='One hour is only a small part of a spin. A whole spin takes about 24 hours.';
 if(t==='day')m='24 hours is one spin, which makes one day. A trip round the Sun takes about 365 days.';
 if(t==='month')m='About a month is the Moon\'s pattern. Earth takes about 365 days to go round the Sun.';
 if(t==='round')m='The Sun stays still. Earth spins, so the Sun only seems to move across the sky.';
 if(t==='all')m='Only the half of Earth facing the Sun has day. The other half has night at the same time.';
 if(t==='moon')m='Earth goes round the Sun, not the Moon. The Moon goes round Earth.';
 return m}
function quiz(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 quizBox.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quizBox.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>judge(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function judge(t,a){quizBox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quizBox.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:B=>{quizBox.hidden=B.step!==5;pad.hidden=B.step===5;keys()},
 init:B=>{A=B;const wrap=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Earth controls'},wrap);quizBox=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});keys()}}).start()})})();
