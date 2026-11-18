/* Flagship: What Causes Wind (ages 7-9; Met Office "What is wind?" and sea breeze guides). Shine the Sun on a beach and
   watch the sand warm faster than the sea; heat the air in a hot-air balloon until it floats up; watch cool sea air
   slide in under the rising warm air (a sea breeze) and test it with a windsock; flip to night for a land breeze; then
   change the temperature gap and see a bigger gap make a stronger wind. Not flagair (air is all around us), flagwxtype
   (sunny, rainy, windy days) or flagcloud (cloud types). */
(()=>{
VIS.reg('flagwind',c=>{let A,ctl,quiz,qn=-1,gen=0;const Z={};
const INK='#0f172a',PAPER='#fff7ed',WARM='#c2410c',COOL='#0369a1',OK='#047857',SAND='#e9c46a',SEA='#38bdf8';
const part=()=>['heat','lift','day','night','gap','chal'][A.step];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t)}
function tag(t,x,y,o){o=o||{};const g=A.ctx;let fs=o.f||(A.narrow?13:15);g.font=`700 ${fs}px system-ui`;const maxW=(o.w||A.W)-14;while(fs>10&&g.measureText(t).width>maxW){fs--;g.font=`700 ${fs}px system-ui`}
 const w=Math.max(o.w||0,g.measureText(t).width+20),h=fs*1.85,lx=clamp(x-w/2,3,A.W-w-3);g.fillStyle=o.bg||PAPER;A.paint.rrect(lx,y-h/2,w,h,8);g.fill();g.lineWidth=o.rim?2.5:1.2;g.strokeStyle=o.rim||'#78716c';g.stroke();
 g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,lx+w/2,y+1)}
const G=()=>A.H*.74,mid=()=>A.W*.5;
/* the beach: sand on the left, sea on the right */
function beach(night){const g=A.ctx;g.fillStyle=night?'#1e1b4b':'#bae6fd';g.fillRect(0,0,A.W,G());g.fillStyle=SAND;g.fillRect(0,G(),mid(),A.H-G());g.fillStyle=SEA;g.fillRect(mid(),G(),A.W-mid(),A.H-G());
 g.strokeStyle=INK;g.lineWidth=2;g.beginPath();g.moveTo(0,G());g.lineTo(A.W,G());g.stroke();const r=A.H*.06,sx=A.W*.12,sy=A.H*.13;
 if(night){g.fillStyle='#f1f5f9';g.beginPath();g.arc(sx,sy,r,0,7);g.fill();g.fillStyle='#1e1b4b';g.beginPath();g.arc(sx+r*.45,sy-r*.2,r*.85,0,7);g.fill();for(let i=0;i<14;i++){g.fillStyle='#f8fafc';g.fillRect((i*131)%A.W,(i*47)%(G()*.6),2,2)}}
 else{g.fillStyle='#facc15';g.beginPath();g.arc(sx,sy,r,0,7);g.fill();g.strokeStyle='#a16207';g.lineWidth=2;g.stroke();for(let i=0;i<8;i++){const a=i*.785;g.beginPath();g.moveTo(sx+Math.cos(a)*r*1.3,sy+Math.sin(a)*r*1.3);g.lineTo(sx+Math.cos(a)*r*1.7,sy+Math.sin(a)*r*1.7);g.stroke()}}}
function temps(land,sea){tag(`Sand ${land} °C`,A.W*.25,A.H*.87,{rim:land>sea?WARM:COOL});tag(`Sea ${sea} °C`,A.W*.75,A.H*.87,{rim:sea>land?WARM:COOL})}
function thermo(x,t){const g=A.ctx,top=G()-A.H*.36,bot=G()-A.H*.05,lvl=bot-(bot-top)*clamp((t-10)/20,0,1);g.fillStyle='#fff';g.fillRect(x-7,top,14,bot-top);g.strokeStyle=INK;g.lineWidth=2;g.strokeRect(x-7,top,14,bot-top);
 g.fillStyle=t>18?WARM:COOL;g.fillRect(x-5,lvl,10,bot-lvl);g.beginPath();g.arc(x,bot+6,10,0,7);g.fill();g.stroke()}
/* ---- 1: uneven warming ---- */
const landT=()=>15+3*Z.hr,seaT=()=>15+Math.floor(Z.hr/2);
function drawHeat(){beach(false);const g=A.ctx;if(Z.hr){g.strokeStyle=A.alpha('#f59e0b',.8);g.lineWidth=3;for(let i=0;i<5;i++){const x=A.W*(.08+i*.2);g.beginPath();g.moveTo(A.W*.12,A.H*.13);g.lineTo(x,G()-4);g.stroke()}}
 thermo(A.W*.3,landT());thermo(A.W*.7,seaT());temps(landT(),seaT());tag(Z.hr?`${Z.hr} hour${Z.hr>1?'s':''} of sunshine`:'Tap the Sun to shine for 1 hour',A.W*.6,A.H*.1,{rim:WARM})}
function shine(){if(Z.hr>=4)return say('Four hours of sunshine. The sand is much warmer than the sea.');Z.hr++;A.sound.tick();
 say(Z.hr<4?`Hour ${Z.hr}: sand ${landT()} °C, sea ${seaT()} °C.`:`Hour 4: sand ${landT()} °C, sea ${seaT()} °C. The Sun shone on both the same, but the sand warmed up much faster. Water takes far more energy to warm, and its warmth spreads down into deep water.`)}
/* ---- 2: hot-air balloon ---- */
function drawLift(){const g=A.ctx,h=Z.heat,up=Z.y,cx=A.W*.5,r=A.H*.17,cy=A.H*.48-up;g.fillStyle='#e0f2fe';g.fillRect(0,0,A.W,A.H);g.fillStyle='#86efac';g.fillRect(0,A.H*.86,A.W,A.H*.14);
 g.fillStyle=A.mix('#fde68a','#fb923c',h/4);g.beginPath();g.arc(cx,cy,r,0,7);g.fill();g.strokeStyle=INK;g.lineWidth=2.5;g.stroke();
 const n=28-4*h;for(let i=0;i<n;i++){const a=i*2.4,d=r*.85*Math.sqrt((i+.5)/28)*(1+h*.03),j=Math.sin(Z.t*(4+h*3)+i)*h*1.6;g.fillStyle=h>1?WARM:COOL;g.beginPath();g.arc(cx+Math.cos(a)*d*.9+j,cy+Math.sin(a)*d*.9,4,0,7);g.fill()}
 g.strokeStyle=INK;g.lineWidth=2;g.beginPath();g.moveTo(cx-r*.5,cy+r*.86);g.lineTo(cx-r*.3,cy+r*1.35);g.moveTo(cx+r*.5,cy+r*.86);g.lineTo(cx+r*.3,cy+r*1.35);g.stroke();
 g.fillStyle='#92400e';g.fillRect(cx-r*.32,cy+r*1.35,r*.64,r*.38);g.strokeRect(cx-r*.32,cy+r*1.35,r*.64,r*.38);
 if(h){g.fillStyle='#f97316';g.beginPath();g.moveTo(cx-8,cy+r*1.3);g.quadraticCurveTo(cx,cy+r*(1.3-.12*h),cx+8,cy+r*1.3);g.fill()}
 tag(`Air inside: ${[20,40,60,80,100][h]} °C · ${n} bits of air`,A.W/2,A.H*.08,{w:A.W*.9,rim:h?WARM:COOL});tag(up>4?'Floating up':'On the ground',A.W/2,A.H*.94,{rim:up>4?OK:'#78716c'})}
function burn(d){const h=clamp(Z.heat+d,0,4);if(h===Z.heat)return say(d>0?'The air is as hot as it goes.':'The air is already cool.');Z.heat=h;A.sound.tick();const goal=h>=3?A.H*.2:0;A.tween(Z,{y:goal},700,'io');
 if(h===4)Z.top=1;if(Z.top&&h===0)Z.down=1;
 say(h>=3?`Air ${[20,40,60,80,100][h]} °C. The warm air has spread out, so the balloon holds fewer bits of air. It is lighter than the same space of cool air, so it floats up.`:h===0?(Z.top?'The air cooled, the balloon filled with cool air again and sank back down.':'Cool air inside.'):`Air ${[20,40,60,80,100][h]} °C. The bits of air move faster and spread out.`)}
/* ---- 3, 4, 5: moving air. A parcel loop: along the ground, up, across high up, down ---- */
function spot(u,flip){const s=Math.floor(u*4)%4,f=u*4-Math.floor(u*4),xa=A.W*.22,xb=A.W*.78,lo=G()-A.H*.07,hi=A.H*.3;let x,y;
 if(s===0){x=xb+(xa-xb)*f;y=lo}else if(s===1){x=xa;y=lo+(hi-lo)*f}else if(s===2){x=xa+(xb-xa)*f;y=hi}else{x=xb;y=hi+(lo-hi)*f}
 return{x:flip?A.W-x:x,y,s}}
function flow(dt){if(!Z.go||Z.speed<=0)return;for(let i=0;i<Z.u.length;i++){const was=Z.u[i]*4%4,nu=(Z.u[i]+dt*Z.speed)%1;Z.u[i]=nu;const now=nu*4%4;if(was<1&&now>=1){Z.hits++;arrived()}}}
function drawLoop(flip){const g=A.ctx;for(const u of Z.u){const p=spot(u,flip),warm=p.s===1||p.s===2;g.fillStyle=warm?'#fb923c':'#7dd3fc';g.beginPath();g.arc(p.x,p.y,A.narrow?6:8,0,7);g.fill();g.strokeStyle=INK;g.lineWidth=1.5;g.stroke()}
 const lo=G()-A.H*.07,a=A.W*(flip?.62:.38),d=flip?1:-1;if(Z.speed>0){g.strokeStyle=COOL;g.lineWidth=3;g.beginPath();g.moveTo(a-d*30,lo-18);g.lineTo(a+d*30,lo-18);g.lineTo(a+d*20,lo-26);g.moveTo(a+d*30,lo-18);g.lineTo(a+d*20,lo-10);g.stroke()}}
function sock(flip){const g=A.ctx,x=Z.sx,top=G()-A.H*.2,s=Z.speed,d=flip?1:-1,L=A.W*.09,droop=s>0?clamp(1-s*2.2,0,1):1;g.strokeStyle=INK;g.lineWidth=3;g.beginPath();g.moveTo(x,G());g.lineTo(x,top);g.stroke();
 g.fillStyle='#ef4444';g.beginPath();g.moveTo(x,top-8);g.lineTo(x+d*L*(1-droop*.7),top+droop*L*.9);g.lineTo(x,top+10);g.closePath();g.fill();g.stroke();g.fillStyle=INK;g.beginPath();g.arc(x,top-6,5,0,7);g.fill()}
function arrived(){A.sound.pop();const k=part();if(k==='day'){if(Z.hits===6)tell('Six parcels of cool sea air have slid onto the beach to fill the space left by rising warm air. That moving air is the sea breeze.');}
 else if(k==='night'){Z[Z.dark?'nightN':'dayN']=(Z[Z.dark?'nightN':'dayN']||0)+1;if(Z.dark&&Z.nightN===3)tell('At night the sand is cooler than the sea. Warm air rises over the sea, and cool land air slides out to sea: a land breeze.')}Z.check()}
function drawDay(){beach(false);drawLoop(false);sock(false);temps(26,17);tag(Z.go?`Cool air arrived on the beach: ${Z.hits}`:'Tap the Sun to start',A.W*.6,A.H*.1,{rim:Z.hits>=6?OK:COOL})}
function drawNight(){const f=Z.dark;beach(f);drawLoop(f);sock(f);temps(f?12:26,f?16:17);tag(f?'Night: the sand cools fastest':'Day: the sand warms fastest',A.W*.6,A.H*.1,{rim:f?COOL:WARM})}
const gapNow=()=>Z.land-17;
function drawGap(){const d=gapNow(),f=d<0;beach(false);drawLoop(f);sock(f);temps(Z.land,17);thermo(A.W*.07,Z.land);
 tag(d===0?'Same temperature: no wind':`Gap ${Math.abs(d)} °C: ${Math.abs(d)>=9?'strong':Math.abs(d)>=5?'steady':'gentle'} ${f?'land':'sea'} breeze`,A.W*.6,A.H*.1,{w:A.W*.7,rim:d===0?'#78716c':OK})}
function setLand(t,quiet){Z.land=clamp(Math.round(t),11,29);const d=gapNow();Z.speed=Math.abs(d)*.035;Z.go=d!==0;if(d===0)Z.calm=1;if(d>=12)Z.gust=1;if(quiet)return A.redraw();A.sound.tick();
 say(d===0?'Sand and sea are both 17 °C. No air rises more than any other, so there is no wind.':`Sand ${Z.land} °C, sea 17 °C, a ${Math.abs(d)} °C gap. ${Math.abs(d)>=12?'The biggest gap gives the strongest breeze.':'A bigger gap would make a stronger breeze.'}`)}
function draw(){const g=A.ctx,k=part();if(k==='chal'){g.fillStyle=A.mix(A.col.pn,'#fed7aa',A.col.dark?.08:.35);g.fillRect(0,0,A.W,A.H);tag('Challenge',A.W/2,A.H*.15,{rim:WARM});tag('Why does the wind blow?',A.W/2,A.H*.5,{f:A.narrow?16:20});return}
 ({heat:drawHeat,lift:drawLift,day:drawDay,night:drawNight,gap:drawGap})[k]()}
function reset(){gen++;for(const k in Z)delete Z[k];Object.assign(Z,{hr:0,heat:0,y:0,t:0,top:0,down:0,go:0,speed:0,u:[...Array(12)].map((_,i)=>i/12),hits:0,dark:0,sx:A.W*.36,land:17,calm:0,gust:0,grab:null,check:()=>{}})}
function startSun(){if(Z.go)return;Z.go=1;Z.speed=.28;A.sound.whoosh();A.kick();say('The sand warms the air above it. The warm air rises, and cool air from over the sea slides in along the ground to fill the gap.')}
function flip(){Z.dark=!Z.dark;Z.go=1;Z.speed=.28;A.sound.tick();A.kick();say(Z.dark?'Night. The sand loses its warmth fast; the sea stays warmer. Watch the windsock.':'Day. The sand is warmer again. Watch the windsock.')}
function upd(){A.redraw();keys();Z.check()}
function say(t){tell(t);upd()}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,intro,ok,msg){reset();tell(intro);keys();Z.check=finish(i,ok,msg)}
function demo(i,acts,ms){steps[i].go();const v=gen;acts.forEach((f,j)=>setTimeout(()=>{if(v===gen)f()},Array.isArray(ms)?ms[j]:(ms||500)*(j+1)))}
function keys(){if(!ctl)return;ctl.innerHTML='';const k=part(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=()=>{f();upd()}};
 if(k==='heat')B('Shine for 1 hour',shine);
 if(k==='lift'){B('Heat the air',()=>burn(1));B('Let it cool',()=>burn(-1))}
 if(k==='day'){B('Start the sunshine',startSun);B('Windsock nearer the sea',()=>moveSock(Z.sx+A.W*.1));B('Windsock further inland',()=>moveSock(Z.sx-A.W*.1))}
 if(k==='night')B(Z.dark?'Make it day':'Make it night',flip);
 if(k==='gap'){B('Warmer sand',()=>setLand(Z.land+3),'Make the sand 3 degrees warmer');B('Cooler sand',()=>setLand(Z.land-3),'Make the sand 3 degrees cooler')}}
function moveSock(x,quiet){Z.sx=clamp(x,A.W*.08,A.W*.92);if(quiet)return A.redraw();A.sound.tick();
 const f=part()==='night'&&Z.dark;say(!Z.go?'The windsock hangs down. No wind yet.':`The windsock streams towards the ${f?'sea':'land'}: the wind along the ground blows from the ${f?'land to the sea':'sea to the land'}.`)}
function down(p){const k=part(),sun=Math.hypot(p.x-A.W*.12,p.y-A.H*.13)<A.H*.12;
 if(k==='heat'){if(sun){shine();upd()}return false}
 if(k==='lift'){if(p.y>A.H*.5){burn(Z.heat<4&&!Z.top?1:-1);upd()}return false}
 if(Math.abs(p.x-Z.sx)<30&&p.y>G()-A.H*.25&&p.y<G()+8){Z.grab='sock';return true}
 if(k==='day'&&sun){startSun();upd()}else if(k==='night'&&p.y<A.H*.3){flip();upd()}
 if(k==='gap'&&p.x<mid()&&p.y>G()-A.H*.4){Z.grab='th';return true}return false}
function move(p){if(Z.grab==='sock')moveSock(p.x,true);else if(Z.grab==='th')setLand(10+20*(G()-A.H*.05-p.y)/(A.H*.31),true)}
function up(){const k=Z.grab;Z.grab=null;if(k==='sock')moveSock(Z.sx);else if(k==='th')setLand(Z.land);if(k)upd()}
const steps=[
{h:'Sunshine on a beach',p:'The Sun shines on the sand and the sea the same. Tap the Sun, or press the button, for 4 hours of sunshine.',
 predict:{q:'After a sunny morning, which is warmer?',opts:['the sea, it is bigger','the sand','both the same'],ans:1},task:'Shine the Sun for 4 hours',
 show:()=>demo(0,[shine,shine,shine,shine],450),
 go:()=>begin(0,'A beach on a cool morning. Sand on the left, sea on the right, both 15 °C.',()=>Z.hr>=4,'The Sun warms the Earth unevenly: the sand gets warmer than the sea.')},
{h:'Warm air rises',p:'Heat the air inside a hot-air balloon, then let it cool. Tap below the balloon or use the buttons.',
 predict:{q:'The air inside gets hot. What does the balloon do?',opts:['it sinks, hot air is heavy','it floats up','nothing'],ans:1},task:'Make the balloon float up, then land again',
 show:()=>demo(1,[...Array(4)].map(()=>()=>burn(1)).concat([...Array(4)].map(()=>()=>burn(-1))),300),
 go:()=>begin(1,'A hot-air balloon full of cool air, sitting on the grass.',()=>Z.down,'Warm air spreads out and is lighter than the same space of cool air, so it rises.')},
{h:'Cool air rushes in',p:'Start the sunshine. Warm air over the sand rises. Watch where the cool air goes, and drag the windsock to test the wind.',
 predict:{q:'Along the beach, which way does the wind blow on a sunny afternoon?',opts:['from the sea onto the land','from the land out to sea','straight down from the sky'],ans:0},task:'See 6 parcels of cool air arrive on the beach',
 show:()=>demo(2,[startSun,()=>moveSock(A.W*.2)],[200,900]),
 go:()=>begin(2,'The sunny beach: sand 26 °C, sea 17 °C. A windsock stands on the sand.',()=>Z.hits>=6,'Warm air rises over the land and cool air moves in to replace it. That moving air is wind.')},
{h:'Night flips it',p:'At night the sand cools faster than the sea. Tap the sky, or the button, to switch between day and night.',
 predict:{q:'At night the sand is cooler than the sea. Which way does the breeze blow?',opts:['from the sea onto the land, always','from the land out to sea','there is never wind at night'],ans:1},task:'Watch the breeze by day, then by night',
 show:()=>demo(3,[flip,flip],[150,1500]),
 go:()=>begin(3,'The sunny beach by day, with no breeze yet. Switch to night to start.',()=>Z.dayN>=3&&Z.nightN>=3,'Wind blows from the cooler place towards the warmer place, where air is rising.')},
{h:'A bigger gap',p:'The sea stays at 17 °C. Drag the sand thermometer up or down, or use the buttons. Find a day with no wind, then the strongest breeze.',task:'Find no wind, then the strongest breeze',
 show:()=>demo(4,[()=>setLand(20),()=>setLand(17),()=>setLand(20),()=>setLand(23),()=>setLand(26),()=>setLand(29)],350),
 go:()=>{begin(4,'The beach with the sand at 17 °C, the same as the sea.',()=>Z.calm&&Z.gust,'No gap, no wind. The bigger the temperature gap, the stronger the wind.');setLand(17,true);Z.calm=0}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.check()});
const QS=[
 {q:'What starts a sea breeze on a sunny day?',ans:'The Sun warms the land more than the sea',bad:[['Waves push the air','waves'],['Trees wave and fan the air','trees']]},
 {q:'Warm air over a hot field. What does it do?',ans:'It rises',bad:[['It sinks to the ground','sink'],['It stays still','still']]},
 {q:'Warm air rises over the town. What happens next to it?',ans:'Cooler air moves in to take its place',bad:[['The gap stays empty','empty'],['Warm air rushes in from the sky','fromsky']]},
 {q:'Which part of the Earth warms fastest in the sunshine?',ans:'Dry land, like sand or rock',bad:[['The sea, it is bigger','bigsea'],['They all warm the same','same']]},
 {q:'Sand and sea are exactly the same temperature. What is the wind like?',ans:'Still: no wind',bad:[['A strong wind','strong'],['A sea breeze','same']]},
 {q:'On a sunny day at the beach, which way does air move along the ground?',ans:'From the sea onto the land',bad:[['From the land out to sea','backwards'],['Up from the sand only','uponly']]}];
function slip(t){let m='Wind is air moving from a cooler place to fill the space left by warm, rising air.';
 if(t==='waves')m='Waves are pushed by wind, not the other way round. The Sun warming the land starts it.';
 if(t==='trees')m='Trees wave because the wind pushes them. They do not make the wind.';
 if(t==='sink')m='Warm air spreads out and is lighter than cool air, so it rises, like the balloon.';
 if(t==='still')m='Warm air does not stay put. It is lighter than the cool air around it, so it rises.';
 if(t==='empty')m='Air cannot leave an empty space. Cooler air moves in at once: that is the wind.';
 if(t==='fromsky')m='Cooler air moves in, along the ground, from the cooler place nearby.';
 if(t==='bigsea')m='Size does not make it warm faster. Water takes far more energy to warm, so the sea warms slowly.';
 if(t==='same')m='The Sun warms places unevenly. Sand and rock warm faster than water.';
 if(t==='strong')m='No temperature gap means no rising warm air, so no wind.';
 if(t==='backwards')m='That is the night-time land breeze. By day the land is warmer, so cool sea air moves in.';
 if(t==='uponly')m='Warm air goes up over the sand, but along the ground the cool sea air slides in.';
 return m}
function ask(){qn++;const Q=QS[qn%QS.length],l=[[Q.ans,'ok'],...Q.bad],r=qn%3,ord=l.slice(r).concat(l.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const pk=quiz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Answer: '+v},pk,v).onclick=()=>mark(t,Q.ans)});tell('Challenge: '+Q.q);A.redraw()}
function mark(t,ans){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();tell(ok?'Yes: '+ans+'.':slip(t));
 fb.innerHTML=(ok?`✓ Yes: ${ans}.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.6,tall:1.1,draw,onStep:Q=>{quiz.hidden=Q.step!==5;ctl.hidden=Q.step===5;keys()},
 init:Q=>{A=Q;const w=c.el('div',{class:'fl-below'},Q.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Wind controls'},w);quiz=c.el('div',{class:'fl-chal'},Q.below);reset();
  A.every(dt=>{if(!Z.u)return false;const k=part();Z.t=(Z.t||0)+dt;if(k==='lift')return Z.heat>0;if(k==='day'||k==='night'||k==='gap'){flow(dt);return!!Z.go}return false});A.gest({down,move,up});keys()}}).start()})})();
