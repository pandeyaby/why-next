/* Flagship: Sound Travels Through Materials (ages 8-9; NC Y4 sound "recognise that vibrations from sounds travel through a
   medium to the ear"). Send a drum's vibration through a row of air, water and steel particles to an ear (steel is
   fastest); follow one red particle that only jiggles; pull a string telephone tight and pinch it; pump the air out
   of a bell jar; let two astronauts talk by touching helmets. Not flagvib (what vibrates), flagloud (loud and quiet) or flagpitch (high and low). */
(()=>{
VIS.reg('flagmedium',c=>{let S,bar,cq,qk=-1,era=0;const W0={};
const NAVY='#0369a1',GO='#047857',STOP='#be123c',CARD='#f0f9ff',TXT='#0f172a';
const MED=[{k:'air',v:343,n:9,col:'#7dd3fc',dur:1.2},{k:'water',v:1480,n:16,col:'#38bdf8',dur:.3},{k:'steel',v:5960,n:28,col:'#94a3b8',dur:.12}];
const scene=()=>['row','red','phone','jar','space','chal'][S.step];
const lim=(v,a,b)=>v<a?a:v>b?b:v;
function aria(t){c.say(t);S.cv.setAttribute('aria-label',t)}
function badge(t,x,y,o){o=o||{};const g=S.ctx;let fs=o.f||(S.narrow?13:16);g.font=`700 ${fs}px system-ui`;while(fs>10&&g.measureText(t).width>(o.w||S.W)-16){fs--;g.font=`700 ${fs}px system-ui`}
 const w=Math.max(o.w||0,g.measureText(t).width+18),h=fs*1.9,lx=lim(x-w/2,3,S.W-w-3);g.fillStyle=o.bg||CARD;S.paint.rrect(lx,y-h/2,w,h,9);g.fill();g.lineWidth=o.edge?2.5:1.2;g.strokeStyle=o.edge||'#64748b';g.stroke();
 g.fillStyle=TXT;g.textAlign='center';g.textBaseline='middle';g.fillText(t,lx+w/2,y+1);return{x:lx,y:y-h/2,w,h}}
/* a pulse is a push that runs along a line from 0 to 1; returns how far the particle at u is shoved right */
function shove(u){let d=0;for(const p of W0.pulses){const f=p.t/p.dur,s=(u-f)/.06;if(f<=1.08&&p.t>0)d+=Math.exp(-s*s)*(p.stop!=null&&u>p.stop?0:1)}return d}
function spawn(dur,stop,fade){W0.pulses.push({t:0.001,dur,stop,fade});S.sound.whoosh();S.kick()}
function tick(dt){if(!W0.pulses||!W0.pulses.length)return false;let live=false;for(const p of W0.pulses){p.t+=dt;if(p.t/p.dur<1.08)live=true;else if(!p.over){p.over=1;p.cb&&p.cb()}}
 W0.pulses=W0.pulses.filter(p=>!p.over);W0.hum=(W0.hum||0)+dt;return live||W0.pulses.length>0}
const lineY=()=>S.H*.5,x0=()=>S.W*.2,x1=()=>S.W*.8;
function drum(x,y,push){const g=S.ctx,r=S.H*.13;g.fillStyle='#b45309';g.fillRect(x-r*.7,y-r,r*.7,2*r);g.strokeStyle=TXT;g.lineWidth=2;g.strokeRect(x-r*.7,y-r,r*.7,2*r);
 g.strokeStyle='#fef3c7';g.lineWidth=5;g.beginPath();g.moveTo(x+push,y-r);g.quadraticCurveTo(x+push*2.2,y,x+push,y+r);g.stroke()}
function ear(x,y,lit){const g=S.ctx,r=S.H*.09;g.fillStyle=lit?'#fcd34d':'#fbcfe8';g.beginPath();g.ellipse(x,y,r*.7,r,0,0,7);g.fill();g.strokeStyle=TXT;g.lineWidth=2;g.stroke();g.beginPath();g.arc(x-r*.1,y,r*.35,-1.4,1.4);g.stroke()}
/* ---- 1: the same drum through air, water and steel ---- */
function drawRow(red){const g=S.ctx,m=MED[W0.m],y=lineY(),a=x0(),b=x1(),n=m.n;g.fillStyle=S.alpha(m.col,.25);g.fillRect(a-8,y-S.H*.14,b-a+16,S.H*.28);
 if(m.k==='steel'){g.strokeStyle=S.alpha(S.col.tx,.5);g.lineWidth=2;g.beginPath();g.moveTo(a,y);g.lineTo(b,y);g.stroke()}
 for(let i=0;i<n;i++){const u=i/(n-1),d=shove(u)*(b-a)/(n*1.4),x=a+u*(b-a)+d,isRed=red&&i===4,yy=y+(m.k==='air'?((i*37)%5-2)*S.H*.025:0);
  if(isRed){g.strokeStyle=STOP;g.lineWidth=2;g.beginPath();g.moveTo(a+u*(b-a),y+S.H*.1);g.lineTo(a+u*(b-a),y+S.H*.15);g.stroke()}
  g.fillStyle=isRed?STOP:m.col;g.beginPath();g.arc(x,yy,Math.max(5,S.W*(m.k==='steel'?.011:.016)),0,7);g.fill();g.strokeStyle=TXT;g.lineWidth=1;g.stroke()}
 drum(a-S.W*.06,y,W0.skin||shove(0)*8);ear(b+S.W*.07,y,W0.lit);
 const T=W0.times,done=Object.keys(T);if(!red)badge(done.length?done.map(k=>`${k} ${T[k]} s`).join(' · '):'Pick a material, bang the drum',S.W/2,S.H*.1,{w:S.W*.94,edge:NAVY});
 badge(red?`Pushes sent: ${W0.sent}. The red one starts on its tick mark.`:`${m.k}: sound over 100 m`,S.W/2,S.H*.88,{edge:red?STOP:NAVY})}
function bang(){const m=MED[W0.m];if(W0.pulses.length)return;W0.lit=0;spawn(m.dur);W0.pulses[0].cb=()=>{W0.lit=1;const t=(100/m.v).toFixed(m.v>1000?3:2);W0.times[m.k]=t;S.sound.pop();
  say(`Through ${m.k}, the sound took ${t} s to travel 100 m.`+(Object.keys(W0.times).length>2?' Solids carry it fastest: the particles are packed close and held tightly, so each push is passed on quickly.':''))};say(`Bang! The vibration sets off through the ${m.k}.`)}
function pickMed(i){if(W0.pulses.length)return;W0.m=i;W0.lit=0;S.sound.tick();say(`The gap is now filled with ${MED[i].k}. Bang the drum.`)}
/* ---- 2: follow one particle ---- */
function sendRed(){if(W0.pulses.length)return;W0.sent++;spawn(.9);W0.pulses[0].cb=()=>{W0.lit=W0.arr=(W0.arr||0)+1;S.sound.pop();say(`The push reached the ear. The red particle is back on its tick mark: it jiggled, it did not travel. Pushes sent: ${W0.sent}.`)};say('Push! Watch the red particle.')}
/* ---- 3: string telephone ---- */
const cupL=()=>S.W*.12,tight=()=>W0.cup>=S.W*.84,midX=()=>(cupL()+W0.cup)/2;
function drawPhone(){const g=S.ctx,y=S.H*.45,sag=tight()?0:(S.W*.86-W0.cup)*.45,L=cupL(),R=W0.cup;
 g.strokeStyle=S.col.tx;g.lineWidth=2.5;g.beginPath();g.moveTo(L,y);g.quadraticCurveTo((L+R)/2,y+sag*2,R,y);g.stroke();
 for(const p of W0.pulses){const f=Math.min(1,p.t/p.dur),stopAt=p.stop!=null?p.stop:1,u=Math.min(f,stopAt),fadeA=p.fade?Math.max(0,1-u*2):1;if(fadeA<=0)continue;
  const x=L+(R-L)*u,yy=y+sag*2*2*u*(1-u);g.fillStyle=S.alpha('#f59e0b',fadeA);g.beginPath();g.arc(x,yy,9,0,7);g.fill()}
 [[L,-1,'You'],[R,1,'Friend']].forEach(([x,d,n])=>{g.fillStyle='#fda4af';g.beginPath();g.moveTo(x,y-14);g.lineTo(x+d*30,y-24);g.lineTo(x+d*30,y+24);g.lineTo(x,y+14);g.closePath();g.fill();g.strokeStyle=TXT;g.lineWidth=2;g.stroke();
  g.fillStyle=S.col.tx;g.font=`700 ${S.narrow?12:14}px system-ui`;g.textAlign='center';g.fillText(n,x+d*15,y+44)});
 if(W0.pinch){g.fillStyle='#fde68a';g.beginPath();g.arc(midX(),y+sag,14,0,7);g.fill();g.strokeStyle=TXT;g.stroke();badge('pinch',midX(),y+sag-30,{f:12})}
 badge(tight()?'String tight':'String slack: drag the friend\'s cup right',S.W/2,S.H*.1,{edge:tight()?GO:NAVY});
 badge(`Heard: ${W0.heard?'yes':'not yet'} · Stopped by a pinch: ${W0.blocked?'yes':'not yet'}`,S.W/2,S.H*.88,{w:S.W*.94,edge:W0.heard&&W0.blocked?GO:NAVY})}
function hello(){if(W0.pulses.length)return;const t=tight(),pin=W0.pinch;spawn(1.1,pin&&t?.5:null,!t);W0.pulses[0].cb=()=>{
  if(!t){S.sound.miss();return say('The slack string flops, so the vibration dies away before your friend. Pull it tight.')}
  if(pin){W0.blocked=1;S.sound.miss();return say('The pinch holds the string still, so the vibration stops there.')}
  W0.heard=1;S.sound.pop();say('Your voice shook the cup, the cup shook the string, the string shook your friend\'s cup: hello!')};say('"Hello!" The cup starts to vibrate.')}
function setCup(x,quiet){W0.cup=lim(x,S.W*.5,S.W*.86);if(quiet)return S.redraw();S.sound.tick();say(tight()?'The string is tight now.':'The string is still slack.')}
function pinch(){W0.pinch=!W0.pinch;S.sound.tick();say(W0.pinch?'You pinch the middle of the string.':'You let go of the string.')}
/* ---- 4: bell in a jar ---- */
function drawJar(){const g=S.ctx,cx=S.W*.42,cy=S.H*.5,r=S.H*.3,air=W0.air,ring=Math.sin((W0.hum||0)*30)*6;
 g.strokeStyle=S.col.tx;g.lineWidth=3;g.beginPath();g.moveTo(cx-r,cy+r);g.lineTo(cx-r,cy-r*.6);g.quadraticCurveTo(cx,cy-r*1.4,cx+r,cy-r*.6);g.lineTo(cx+r,cy+r);g.stroke();g.fillRect(cx-r*1.2,cy+r,r*2.4,8);
 for(let i=0;i<Math.round(air/5);i++){const px=cx-r*.85+((i*53)%17)/17*r*1.7,py=cy-r*.5+((i*31)%13)/13*r*1.4;g.fillStyle=S.alpha('#38bdf8',.8);g.beginPath();g.arc(px,py,4,0,7);g.fill()}
 g.fillStyle='#facc15';g.beginPath();g.arc(cx,cy,r*.3,Math.PI,0);g.lineTo(cx+r*.3,cy+r*.15);g.lineTo(cx-r*.3,cy+r*.15);g.closePath();g.fill();g.strokeStyle=TXT;g.lineWidth=2;g.stroke();
 g.fillStyle=TXT;g.beginPath();g.arc(cx+ring,cy+r*.25,6,0,7);g.fill();
 const mx=S.W*.2,mw=S.W*.6,my=S.H*.16,lvl=5+95*air/100;g.strokeStyle=S.col.tx;g.lineWidth=2;g.strokeRect(mx,my,mw,12);g.fillStyle=air>20?GO:STOP;g.fillRect(mx,my,mw*lvl/100,12);
 g.fillStyle=S.col.tx;g.font=`700 ${S.narrow?11:13}px system-ui`;g.textAlign='right';g.textBaseline='middle';g.fillText('sound',mx-6,my+6);
 const px=S.W*.86,hy=S.H*.32+(W0.hd||0);g.fillStyle=S.alpha(S.col.tx,.15);g.fillRect(px-S.W*.04,S.H*.4,S.W*.08,S.H*.38);g.strokeRect(px-S.W*.04,S.H*.4,S.W*.08,S.H*.38);g.lineWidth=5;g.beginPath();g.moveTo(px,hy);g.lineTo(px,S.H*.45);g.moveTo(px-S.W*.05,hy);g.lineTo(px+S.W*.05,hy);g.stroke();
 g.lineWidth=2;g.beginPath();g.moveTo(px-S.W*.04,S.H*.74);g.lineTo(cx+r,S.H*.74);g.stroke();g.fillStyle=S.col.tx;g.textAlign='center';g.textBaseline='alphabetic';g.fillText('pump',px,S.H*.84);
 badge(`Air in the jar: ${air}%`,S.W/2,S.H*.08,{edge:NAVY});badge(W0.emptied?(air===100?'Air back in: the ring is loud again':'Almost silent, but the bell still shakes'):'Pump the air out',S.W/2,S.H*.92,{edge:W0.emptied?GO:NAVY})}
function pump(d){const a=lim(W0.air+d,0,100);if(a===W0.air)return say(d<0?'The pump cannot take out any more.':'The jar is already full of air.');W0.air=a;S.sound.tick();if(a===0)W0.emptied=1;if(a===100&&W0.emptied)W0.back=1;
 say(a===0?'Almost no air is left. The hammer still hits the bell, but there is almost nothing to carry the vibration.':a===100?'The air is back. The bell is loud again.':`Air ${a}%. The ring is ${a<50?'quieter':'still clear'}.`)}
/* ---- 5: astronauts ---- */
const benX=()=>S.W*.68,touching=()=>benX()-W0.ana<=S.W*.13+1;
function drawSpace(){const g=S.ctx,y=S.H*.5,r=S.W*.065;g.fillStyle='#0b1020';g.fillRect(0,0,S.W,S.H);for(let i=0;i<40;i++){g.fillStyle='#e2e8f0';g.fillRect((i*97)%S.W,(i*61)%(S.H*.8),2,2)}
 [[W0.ana,'Ana'],[benX(),'Ben']].forEach(([x,n])=>{g.fillStyle='#f8fafc';g.fillRect(x-r*.8,y+r*.6,r*1.6,r*2);g.beginPath();g.arc(x,y,r,0,7);g.fill();g.fillStyle='#1e293b';g.beginPath();g.arc(x,y,r*.7,0,7);g.fill();
  g.fillStyle='#f8fafc';g.font=`700 ${S.narrow?12:14}px system-ui`;g.textAlign='center';g.fillText(n,x,y+r*3)});
 if(W0.ok)badge('Helmets touch: the vibration crosses through solid helmets',S.W/2,S.H*.08,{w:S.W*.94,edge:GO});else badge(touching()?'Helmets touching':'Drag Ana towards Ben',S.W/2,S.H*.08,{edge:NAVY});
 if(W0.pulses.length){const p=W0.pulses[0],f=Math.min(1,p.t/p.dur);g.strokeStyle=S.alpha('#fbbf24',touching()?1:Math.max(0,1-f*3));g.lineWidth=3;g.beginPath();g.arc(W0.ana,y,r+f*(benX()-W0.ana),-.6,.6);g.stroke()}}
function talk(){if(W0.pulses.length)return;const t=touching();spawn(.8);W0.pulses[0].cb=()=>{if(t){W0.ok=1;S.sound.pop();return say('Ben hears Ana! Her voice shook her helmet, and the vibration passed through the touching helmets.')}
  S.sound.miss();say('Ben hears nothing. Space is a vacuum: no particles to pass the vibration on.')};say('Ana speaks.')}
function setAna(x,quiet){W0.ana=lim(x,S.W*.15,benX()-S.W*.13);if(!quiet)S.sound.tick();if(quiet)return S.redraw();say(touching()?'Their helmets are touching.':'There is empty space between them.')}
function draw(){const g=S.ctx;g.fillStyle=S.mix(S.col.pn,'#e0f2fe',S.col.dark?.05:.3);g.fillRect(0,0,S.W,S.H);const k=scene();
 if(k==='chal'){badge('Challenge',S.W/2,S.H*.14,{edge:NAVY});badge('Where can sound go, and how?',S.W/2,S.H*.5,{f:S.narrow?15:19});return}
 if(k==='row')return drawRow(false);if(k==='red')return drawRow(true);({phone:drawPhone,jar:drawJar,space:drawSpace})[k]()}
function fresh(){era++;for(const k in W0)delete W0[k];Object.assign(W0,{m:0,pulses:[],times:{},lit:0,sent:0,skin:0,cup:S.W*.62,pinch:false,heard:0,blocked:0,air:100,emptied:0,back:0,ana:S.W*.25,ok:0,grab:null,test:()=>{}})}
function say(t){aria(t);S.redraw();btns();W0.test()}
const doneWhen=(i,f,msg)=>()=>{if(S.step===i&&f()&&(!steps[i].predict||S.pred[i]!=null)&&!S.isDone)S.done(msg+S.reveal(i))};
function enter(i,intro,f,msg){fresh();aria(intro);btns();W0.test=doneWhen(i,f,msg)}
/* Show me: fixed gaps, or listed times */
function play(i,acts,ms){steps[i].go();const v=era;acts.forEach((f,j)=>setTimeout(()=>{if(v===era)f()},Array.isArray(ms)?ms[j]:S.reduced()?40*(j+1):(ms||500)*(j+1)))}
function btns(){if(!bar)return;bar.innerHTML='';const k=scene(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},bar,t).onclick=f};
 if(k==='row'){MED.forEach((m,i)=>B((W0.m===i?'● ':'')+m.k[0].toUpperCase()+m.k.slice(1),()=>pickMed(i),'Fill the gap with '+m.k));B('Bang the drum',bang)}
 if(k==='red')B('Push the drum skin',sendRed);
 if(k==='phone'){B('Pull the string tight',()=>setCup(S.W*.86));B('Let it go slack',()=>setCup(S.W*.62));B(W0.pinch?'Let go of the string':'Pinch the string',pinch);B('Say hello',hello)}
 if(k==='jar'){B('Pump air out',()=>pump(-20),'Pump some air out of the jar');B('Let air in',()=>pump(20),'Let some air back into the jar')}
 if(k==='space'){B('Move Ana closer',()=>setAna(W0.ana+S.W*.08));B('Move Ana away',()=>setAna(W0.ana-S.W*.08));B('Ana speaks',talk)}}
function down(p){const k=scene();
 if(k==='row'){if(p.x<x0())bang();return false}
 if(k==='red'){if(p.x<x0()+10){W0.grab={x:p.x};return true}return false}
 if(k==='phone'){if(Math.abs(p.x-W0.cup)<40&&Math.abs(p.y-S.H*.45)<50){W0.grab={cup:1};return true}if(Math.abs(p.x-midX())<40&&Math.abs(p.y-S.H*.5)<S.H*.2)pinch();else if(p.x<cupL()+40)hello();return false}
 if(k==='jar'){if(p.x>S.W*.76){W0.grab={y:p.y};return true}return false}
 if(k==='space'){if(Math.abs(p.x-W0.ana)<S.W*.1){W0.grab={ana:1};return true}if(Math.abs(p.x-benX())<S.W*.1)talk();return false}return false}
function move(p){const d=W0.grab;if(!d)return;if(d.cup)setCup(p.x,true);else if(d.ana)setAna(p.x,true);else if(d.x!=null){W0.skin=lim(p.x-d.x,0,24);S.redraw()}else if(d.y!=null){W0.hd=lim(p.y-d.y,0,S.H*.14);if(W0.hd>=S.H*.13){d.y=p.y;W0.hd=0;pump(-20)}else S.redraw()}}
function up(){const d=W0.grab;W0.grab=null;W0.hd=0;if(!d)return;S.redraw();if(d.cup)setCup(W0.cup);else if(d.ana)setAna(W0.ana);else if(d.x!=null){const go=W0.skin>8;W0.skin=0;if(go)sendRed();else S.redraw()}}
const steps=[
{h:'Pass it on',p:'A drum, a gap and an ear. Fill the gap with air, water or steel, then bang the drum and time the sound over 100 m.',
 predict:{q:'Which gets the sound to the ear fastest?',opts:['air, it is the lightest','steel, a solid','all the same'],ans:1},task:'Time the sound through all three',
 show:()=>play(0,[()=>bang(),()=>pickMed(1),()=>bang(),()=>pickMed(2),()=>bang()],[400,1900,2000,2600,2700]),
 go:()=>enter(0,'A drum on the left, a row of air particles, and an ear on the right.',()=>Object.keys(W0.times).length>2,'Sound needs a material. It travels through gases, liquids and solids, fastest through solids.')},
{h:'Follow one particle',p:'Drag the drum skin to the right and let go, or use the button. Watch the red air particle.',
 predict:{q:'Does the red particle travel all the way to the ear?',opts:['no, it jiggles and passes the push on','yes, it carries the sound to the ear','it flies out of the row'],ans:0},task:'Send 3 pushes and watch the red one',
 show:()=>play(1,[sendRed,sendRed,sendRed],1150),
 go:()=>enter(1,'A row of air particles. One is red, with a tick mark under where it starts.',()=>W0.arr>=3,'The vibration travels; the particles only jiggle back and forth.')},
{h:'String telephone',p:'Drag the friend\'s cup to pull the string tight. Say hello. Then pinch the string and try again.',
 predict:{q:'Your friend pinches the middle of the tight string. What happens?',opts:['the sound stops at the pinch','it gets louder','nothing changes'],ans:0},task:'Get hello through, then stop it with a pinch',
 show:()=>play(2,[()=>setCup(S.W*.86),hello,pinch,hello],[300,600,2000,2200]),
 go:()=>enter(2,'Two paper cups joined by a slack string.',()=>W0.heard&&W0.blocked,'The string carries the vibration. Slack or held still, it cannot.')},
{h:'Bell in a jar',p:'A bell rings inside a jar. Drag down on the pump, or press Pump air out. Then let the air back in.',
 predict:{q:'You pump out the air. The bell keeps ringing. What do you hear?',opts:['almost nothing','the same ring','a louder ring'],ans:0},task:'Pump the air out, then let it all back in',
 show:()=>play(3,[...Array(5)].map(()=>()=>pump(-20)).concat([...Array(5)].map(()=>()=>pump(20))),220),
 go:()=>enter(3,'An electric bell ringing inside a glass jar full of air, with a sound meter.',()=>W0.back,'With no air to carry the vibration, the sound almost vanishes.')},
{h:'Talking in space',p:'Space has no air. Ana wants to talk to Ben with no radio. Drag Ana, then press Ana speaks.',task:'Get Ana\'s message to Ben',
 show:()=>play(4,[talk,()=>setAna(S.W*.55),talk],1000),
 go:()=>enter(4,'Two astronauts floating apart in space.',()=>W0.ok,'Sound cannot cross empty space, but it can travel through solid helmets that touch.')},
{h:'Challenge',p:'',go:()=>{fresh();quizNext()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>W0.test()});
const QS=[
 {q:'Why can you hear music from next door through a wall?',ans:'The vibrations pass through the wall',bad:[['Sound only goes through gaps','gaps'],['The wall makes its own sound','make']]},
 {q:'You swim underwater. A boat goes past. Can you hear its engine?',ans:'Yes, sound travels through water',bad:[['No, sound only travels in air','aironly'],['Only if your ears are above water','aironly']]},
 {q:'On a spacewalk, Ben shouts to Ana 3 m away. No radio. What does she hear?',ans:'Nothing',bad:[['A quiet shout','quiet'],['A loud shout, nothing is in the way','space']]},
 {q:'In a string telephone, what carries the sound from cup to cup?',ans:'Vibrations along the string',bad:[['Air inside the string','air'],['The words slide along the string','travel']]},
 {q:'Through which does sound travel fastest?',ans:'Steel',bad:[['Air','light'],['Water','mid']]},
 {q:'Sound travels through the air to you. What do the air particles do?',ans:'Jiggle and pass the push on',bad:[['Fly from the drum to your ear','travel'],['Stay perfectly still','still']]}];
function slip(t){let m='Sound is a vibration passed from particle to particle through a material.';
 if(t==='gaps')m='Some leaks through gaps, but it also travels through the solid wall.';
 if(t==='make')m='The wall is not the source. It passes on vibrations from the music.';
 if(t==='aironly')m='Water is a material too. Its particles pass the vibration on.';
 if(t==='quiet')m='Not even quietly. Space is empty, with no particles to pass the vibration on.';
 if(t==='space')m='Nothing blocks it, but nothing carries it either. Sound needs a material.';
 if(t==='air')m='The string is solid. Its own particles pass the vibration along.';
 if(t==='travel')m='The particles do not travel. Each one jiggles and pushes the next.';
 if(t==='light')m='Not the lightest. Sound is slowest in air, where particles are far apart.';
 if(t==='mid')m='Water is faster than air, but a solid like steel is faster still.';
 if(t==='still')m='Still particles would pass nothing on. They jiggle back and forth.';
 return m}
function quizNext(){qk++;const Q=QS[qk%QS.length],l=[[Q.ans,'ok'],...Q.bad],r=qk%3,ord=l.slice(r).concat(l.slice(0,r));
 cq.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const pk=cq.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Answer: '+v},pk,v).onclick=()=>check(t,Q.ans)});aria('Challenge: '+Q.q);S.redraw()}
function check(t,ans){cq.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=cq.querySelector('.fl-fb'),ok=t==='ok';if(ok)S.win();else S.sound.miss();aria(ok?'Yes: '+ans+'.':slip(t));
 fb.innerHTML=(ok?`✓ Yes: ${ans}.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quizNext}
FK.shell(c,{steps,ratio:.6,tall:1.1,draw,onStep:Q=>{cq.hidden=Q.step!==5;bar.hidden=Q.step===5;btns()},
 init:Q=>{S=Q;const A=Q,w=c.el('div',{class:'fl-below'},Q.below);bar=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Sound controls'},w);cq=c.el('div',{class:'fl-chal'},Q.below);fresh();
  A.every(tick);A.gest({down,move,up});btns()}}).start()})})();
