/* Flagship: Vibrations & Sound (ages 6-9; NC Y4 sound "sounds are made by something vibrating", NGSS 1-PS4-1
   "vibrating materials can make sound and sound can make materials vibrate"). Pluck a rubber band and watch it shake;
   touch it to stop the sound; find the shaking part of a drum, a guitar and a singer; shout at a drum so the rice jumps;
   dip a humming tuning fork in water. Not flagloud (hit hard or gently) or flagpitch (high and low). */
(()=>{
VIS.reg('flagvib',c=>{let A,pad,quiz,qn=-1,epoch=0;const V={};
const INK='#0f172a',CARD='#fff7ed',GOOD='#15803d',BLUE='#1e40af',BAD='#be123c',WOOD='#b45309',SKIN='#fde68a';
const THINGS=[{n:'drum',parts:[['drum skin',1],['drumstick',0],['drum legs',0]]},{n:'guitar',parts:[['round hole',0],['strings',1],['tuning pegs',0]]},
 {n:'singer',parts:[['ears',0],['hands',0],['throat (voice box)',1]]}];
const WHYNOT={drumstick:'The stick only hits. Then the drum skin shakes fast: that shaking is the sound.','drum legs':'The legs hold the drum up. Look for the part that shakes when it is hit.',
 'round hole':'The hole lets the sound out. The strings are what shake.','tuning pegs':'The pegs make the strings tight. The strings are what shake.',
 ears:'Ears hear sound. They do not make it. Put your hand on your throat and hum.',hands:'Hands are still when you sing. Feel your throat: it buzzes.'};
const phase=()=>['pluck','still','find','drum','fork','chal'][A.step];
const lim=(v,a,b)=>Math.max(a,Math.min(b,v)),ink=()=>A.col.dark?'#e2e8f0':INK,inR=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function speak(t){c.say(t);A.cv.setAttribute('aria-label',t)}
/* dark words on a pale label so they read in both themes */
function label(t,x,y,o={}){const g=A.ctx;let f=o.f||(A.narrow?15:18);do g.font=`700 ${f}px system-ui`;while(g.measureText(t).width>(o.w||A.W)-26&&--f>10);
 const w=Math.max(o.w||0,g.measureText(t).width+24),h=o.h||f*1.9,X=lim(x-w/2,4,A.W-w-4);g.fillStyle=o.bg||CARD;A.paint.rrect(X,y-h/2,w,h,12);g.fill();
 g.lineWidth=o.ring?3:1.5;g.strokeStyle=o.ring||'#a8a29e';g.stroke();g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,X+w/2,y);return{x:X,y:y-h/2,w,h}}
function rings(x,y,n,str,dir){const g=A.ctx;g.lineWidth=3;for(let k=1;k<=n;k++){g.strokeStyle=A.alpha(A.col.dark?'#7dd3fc':BLUE,str*(1-k/(n+1)));g.beginPath();g.arc(x,y,16+k*18,dir-.6,dir+.6);g.stroke()}}
/* ---- 1 and 2: a rubber band on a box ---- */
const band=()=>({x0:A.W*.2,x1:A.W*.8,y:A.H*(A.narrow?.42:.45)});
function drawBand(){const g=A.ctx,B=band(),bw=B.x1-B.x0;g.fillStyle=WOOD;A.paint.rrect(B.x0-20,B.y+8,bw+40,A.H*.22,14);g.fill();g.fillStyle='#78350f';g.beginPath();g.ellipse(A.W/2,B.y+8+A.H*.11,bw*.14,A.H*.06,0,0,7);g.fill();
 const off=V.grab?V.pull:V.amp*Math.sin(V.ph);if(V.amp>1.5){g.strokeStyle=A.alpha('#f97316',.35);g.lineWidth=5;[-1,1].forEach(s=>{g.beginPath();g.moveTo(B.x0,B.y);g.quadraticCurveTo(A.W/2,B.y+2*s*V.amp,B.x1,B.y);g.stroke()})}
 g.strokeStyle='#ea580c';g.lineWidth=6;g.lineCap='round';g.beginPath();g.moveTo(B.x0,B.y);g.quadraticCurveTo(A.W/2,B.y+2*off,B.x1,B.y);g.stroke();
 if(V.amp>1.5)rings(B.x1+14,B.y-10,3,lim(V.amp/30,.25,1),-.4);
 label(V.amp>1.5?'Shaking: you hear a twang':V.grab?'Let go!':'Still: no sound',A.W/2,A.H*.1,{ring:V.amp>1.5?GOOD:BLUE});
 if(phase()==='still'&&V.held)label('Finger holds it still',A.W/2,A.H*.86,{f:14,ring:GOOD})}
function letGo(){if(!V.grab)return;V.grab=false;V.amp=Math.abs(V.pull);V.ph=V.pull>0?Math.PI/2:-Math.PI/2;V.pull=0;if(V.amp<6)return tell('Pull it further before you let go.');
 V.plucks++;A.sound.pop();tell('Twang! The band shakes back and forth very fast. That shaking makes the sound. When it stops shaking, the sound stops.')}
function pullTo(d){V.grab=true;V.amp=0;V.pull=lim(d,-50,50);A.redraw()}
function touchBand(){if(V.amp<1.5&&!V.held)return tell('The band is already still.');V.amp=0;V.held=true;A.sound.tick();tell('Your finger holds the band still. No shaking, so no sound.')}
/* ---- 3: find the shaking part ---- */
const pcards=()=>{const n=A.narrow,w=n?A.W-40:A.W*.28,h=Math.max(46,A.H*(n?.11:.13));return[0,1,2].map(i=>n?{x:20,y:A.H*.47+i*(h+10),w,h}:{x:A.W*.06+i*(w+A.W*.04),y:A.H*.74,w,h})};
function icon(k,x,y,s,quiet){const g=A.ctx;g.lineWidth=3;g.strokeStyle=INK;
 if(k==='drum'){g.fillStyle='#dc2626';g.fillRect(x-s,y,2*s,s*.8);g.fillStyle=SKIN;g.beginPath();g.ellipse(x,y,s,s*.3,0,0,7);g.fill();g.stroke();g.strokeStyle=ink();[[-.8,.8],[.8,.8]].forEach(([a])=>{g.beginPath();g.moveTo(x+a*s,y+s*.8);g.lineTo(x+a*s*1.2,y+s*1.3);g.stroke()});
  g.strokeStyle=WOOD;g.lineWidth=5;g.beginPath();g.moveTo(x+s*.3,y-s*.15);g.lineTo(x+s*1.3,y-s*.9);g.stroke()}
 if(k==='guitar'){g.fillStyle=WOOD;g.beginPath();g.arc(x-s*.35,y+s*.4,s*.6,0,7);g.arc(x+s*.25,y+s*.4,s*.45,0,7);g.fill();g.fillStyle='#1c1917';g.beginPath();g.arc(x-s*.1,y+s*.4,s*.18,0,7);g.fill();
  g.fillStyle='#78350f';g.fillRect(x+s*.5,y+s*.32,s*1.1,s*.16);g.strokeStyle='#f1f5f9';g.lineWidth=1.5;for(let i=-1;i<=1;i++){g.beginPath();g.moveTo(x-s*.7,y+s*.4+i*5);g.lineTo(x+s*1.6,y+s*.4+i*5);g.stroke()}}
 if(k==='singer'){g.fillStyle='#fcd34d';g.beginPath();g.arc(x,y-s*.3,s*.45,0,7);g.fill();g.fillStyle='#2563eb';A.paint.rrect(x-s*.6,y+s*.35,s*1.2,s*1,14);g.fill();g.fillStyle='#fcd34d';g.fillRect(x-s*.15,y+s*.1,s*.3,s*.3);
  g.fillStyle=INK;g.beginPath();g.arc(x,y-s*.15,s*.12,0,7);g.fill();if(!quiet)rings(x+s*.3,y-s*.15,2,.8,0)}}
function drawFind(){const r=Math.min(V.round,2),T=THINGS[r],n=A.narrow;label(V.round>2?'All 3 found: each one shakes':`${r+1} of 3: what shakes on the ${T.n}?`,A.W/2,A.H*.07,{ring:V.round>2?GOOD:BLUE,f:n?14:17});
 icon(T.n,A.W/2,A.H*(n?.24:.3),Math.min(A.W,A.H)*(n?.13:.15));if(V.round>2)return;
 pcards().forEach((q,i)=>label(T.parts[i][0],q.x+q.w/2,q.y+q.h/2,{w:q.w,h:q.h,bg:V.miss===i?'#ffe4e6':CARD,ring:V.miss===i?BAD:null}))}
function choosePart(i){if(V.round>2)return;const T=THINGS[V.round],[nm,ok]=T.parts[i];if(ok){V.round++;V.miss=null;A.sound.pop();
  return tell({drum:'Yes: the drum skin shakes after the stick hits it.',guitar:'Yes: the strings shake when you pluck them.',singer:'Yes: your voice box in your throat shakes when you sing or hum.'}[T.n]+(V.round>2?' Every sound comes from something shaking.':''))}
 V.miss=i;A.sound.miss();tell(WHYNOT[nm])}
/* ---- 4: shout at a drum with rice on it ---- */
const kidX=()=>A.W*V.kid,drumX=()=>A.W*.76,skinY=()=>A.H*.52;
function drawDrum(){const g=A.ctx,s=Math.min(A.W,A.H)*(A.narrow?.1:.12),dx=drumX(),y=skinY();icon('drum',dx,y,s);
 V.rice.forEach(r=>{g.fillStyle='#fefce8';g.strokeStyle='#78716c';g.lineWidth=1;g.beginPath();g.ellipse(dx+r.x*s*.9,y-2-r.h,3,2,r.x,0,7);g.fill();g.stroke()});
 const kx=kidX(),ky=A.H*.5;icon('singer',kx,ky,s*.9,!V.wave);if(V.wave>0)rings(kx+(dx-kx)*V.wave,ky-s*.2,3,.9,0);
 g.strokeStyle=ink();g.setLineDash([6,6]);g.lineWidth=2;g.beginPath();g.moveTo(kx+s,A.H*.8);g.lineTo(dx-s,A.H*.8);g.stroke();g.setLineDash([]);
 label(V.kid>.4?'Close to the drum':'Far from the drum',(kx+dx)/2,A.H*.8,{f:13});label(V.big?'The rice jumps!':'Drag the singer, then shout',A.W/2,A.H*.08,{ring:V.big?GOOD:BLUE})}
function shout(){if(V.wave>0)return;V.wave=.01;A.sound.whoosh();A.redraw()}
function arrive(){const near=V.kid>.4;V.rice.forEach(r=>r.v=near?160+Math.random()*90:25);V.big=V.big||near;A.sound.tick();
 tell(near?'The sound reaches the drum and makes the skin shake. The shaking skin throws the rice up.':'The sound reached the drum, but it was weak by then. The rice only wobbled. Move closer and shout again.')}
function setKid(v){V.kid=lim(v,.12,.5);A.redraw()}
/* ---- 5: tuning fork and water ---- */
const fork=()=>({x:A.W*.5,y:V.dip?A.H*.42:A.H*.2,h:A.H*.3});
function drawFork(){const g=A.ctx,F=fork(),wob=V.ring*Math.sin(V.ph)*.4;g.fillStyle='#64748b';A.paint.rrect(A.W*.08,A.H*.74,A.W*.22,A.H*.1,8);g.fill();label('rubber block',A.W*.19,A.H*.68,{f:13});
 g.fillStyle=A.alpha('#38bdf8',.55);g.fillRect(A.W*.55,A.H*.6,A.W*.36,A.H*.28);g.strokeStyle=ink();g.lineWidth=3;g.strokeRect(A.W*.55,A.H*.6,A.W*.36,A.H*.28);label('water',A.W*.73,A.H*.93,{f:13});
 const fx=V.dip?A.W*.73:F.x;g.strokeStyle='#94a3b8';g.lineWidth=7;g.lineCap='round';[-1,1].forEach(s=>{g.beginPath();g.moveTo(fx+s*(12+wob*s),F.y);g.lineTo(fx+s*12,F.y+F.h*.55);g.stroke()});
 g.beginPath();g.moveTo(fx-12,F.y+F.h*.55);g.quadraticCurveTo(fx,F.y+F.h*.7,fx+12,F.y+F.h*.55);g.moveTo(fx,F.y+F.h*.65);g.lineTo(fx,F.y+F.h);g.stroke();
 if(V.ring>.3&&!V.dip)rings(fx+20,F.y+20,2,lim(V.ring/6,.2,.8),-.2);A.fx.draw(g);
 label(V.splash?'Splash! It was shaking':V.ring>.3?'Humming: shaking too fast to see':'Still fork',A.W/2,A.H*.07,{ring:V.splash?GOOD:BLUE})}
function strike(){V.dip=false;V.ring=6;A.sound.step();tell('Tap! The fork hums. It is shaking, but too fast and too small to see.')}
function dip(){V.dip=true;A.redraw();if(V.ring<.3)return tell('The fork is still, so the water stays still. Tap the fork on the block first.');
 V.splash=true;A.sound.pop();const x=A.W*.73,y=A.H*.6;A.fx.add(26,()=>({x:x+(Math.random()-.5)*30,y,vx:(Math.random()-.5)*260,vy:-120-Math.random()*240,g:700,life:.9,r:3,col:'#0284c7'}));
 tell('Splash! The shaking prongs hit the water fast and throw it up. Now you can see the shaking.')}
function lift(){V.dip=false;A.redraw();tell('Out of the water.')}
/* ---- frame clock: shaking dies away ---- */
function tickAll(dt){let busy=false;if(V.amp>.4){V.ph+=dt*60;V.amp*=Math.pow(phase()==='still'?1:.45,dt);busy=true}else if(V.amp){V.amp=0;busy=true}
 if(V.ring>.3){V.ph+=dt*80;V.ring*=Math.pow(V.dip?.2:.75,dt);if(V.dip&&Math.random()<.3){const x=A.W*.73+(Math.random()-.5)*20;A.fx.add(2,()=>({x,y:A.H*.6,vx:(Math.random()-.5)*90,vy:-60-Math.random()*90,g:600,life:.6,r:2.5,col:'#0284c7'}))}busy=true}
 if(V.wave>0){V.wave+=dt*1.4;if(V.wave>=1){V.wave=0;arrive()}busy=true}
 V.rice&&V.rice.forEach(r=>{if(r.h>0||r.v){r.v-=900*dt;r.h=Math.max(0,r.h+r.v*dt);if(r.h===0&&r.v<0)r.v=0;busy=true}});return busy}
function draw(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#ffedd5',A.col.dark?.06:.4);g.fillRect(0,0,A.W,A.H);const k=phase();
 if(k==='chal'){label('Challenge',A.W/2,A.H*.14,{ring:BLUE});const Q=CQ[qn%CQ.length];if(Q)label(Q.pic,A.W/2,A.H*.5,{f:A.narrow?18:22});return}
 ({pluck:drawBand,still:drawBand,find:drawFind,drum:drawDrum,fork:drawFork})[k]()}
function reset(){epoch++;for(const k in V)delete V[k];Object.assign(V,{amp:0,ph:0,pull:0,grab:false,plucks:0,held:false,round:0,miss:null,kid:.15,wave:0,big:false,ring:0,dip:false,splash:false,
 rice:Array.from({length:9},(_,i)=>({x:-.7+i*.175,h:0,v:0})),check:()=>{}})}
function tell(t){speak(t);A.redraw();keys();V.check()}
const ready=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function enter(i,say,ok,msg,init){reset();Object.assign(V,init||{});speak(say);keys();V.check=ready(i,ok,msg)}
function play(i,acts,ms){steps[i].go();const me=epoch;acts.forEach((f,j)=>setTimeout(()=>{if(me===epoch)f()},A.reduced()?30*(j+1):(ms||400)*(j+1)))}
function keys(){if(!pad)return;pad.innerHTML='';const k=phase(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='pluck')B('Pluck the band',()=>{pullTo(40);setTimeout(letGo,A.reduced()?10:250)},'Pull the band and let go');
 if(k==='still')B('Touch the band',touchBand,'Put a finger on the band');
 if(k==='find'&&V.round<3)THINGS[V.round].parts.forEach((p,i)=>B(p[0],()=>choosePart(i),'The '+p[0]));
 if(k==='drum'){B('◀ Move back',()=>setKid(V.kid-.1),'Move the singer away from the drum');B('Move closer ▶',()=>setKid(V.kid+.1),'Move the singer closer to the drum');B('Shout!',shout,'Shout at the drum')}
 if(k==='fork'){B('Tap on the block',strike,'Tap the fork on the rubber block');B(V.dip?'Lift out':'Dip in water',V.dip?lift:dip,V.dip?'Lift the fork out of the water':'Dip the fork in the water')}}
function down(p){const k=phase();
 if(k==='pluck'||k==='still'){const B=band();if(p.x>B.x0&&p.x<B.x1&&Math.abs(p.y-B.y)<50){if(k==='still'){touchBand();return false}pullTo(p.y-B.y);return true}if(k==='still'&&p.y>B.y+8)tell('That is the box. The band is still shaking. Touch the band itself.')}
 if(k==='find'){const i=pcards().findIndex(r=>inR(p,r));if(i>=0)choosePart(i)}
 if(k==='drum'&&Math.abs(p.x-kidX())<60&&p.y>A.H*.25&&p.y<A.H*.75){V.drag=true;return true}
 if(k==='fork'){const F=fork();if(Math.abs(p.x-(V.dip?A.W*.73:F.x))<40&&p.y>F.y-10&&p.y<F.y+F.h){V.drag=true;return true}}return false}
function move(p){const k=phase();if(k==='pluck'&&V.grab)pullTo(p.y-band().y);if(k==='drum'&&V.drag)setKid(p.x/A.W)}
function up(p){const k=phase();if(k==='pluck')letGo();if(k==='drum'&&V.drag){V.drag=false;tell(V.kid>.4?'Close to the drum. Now shout!':'Still far away. Drag closer, or shout to test it.')}
 if(k==='fork'&&V.drag){V.drag=false;if(p.y>A.H*.45&&p.x>A.W*.55)dip();else if(p.y>A.H*.6&&p.x<A.W*.35)strike()}}
const steps=[
{h:'Pluck a band',p:'A rubber band is stretched over a box. Pull the band, then let go. Watch it closely.',
 predict:{q:'Where does the twang come from?',opts:['the box','the band shaking','your finger'],ans:1},task:'Pluck the band',
 show:()=>play(0,[()=>pullTo(20),()=>pullTo(40),()=>letGo()],300),
 go:()=>enter(0,'A rubber band over a wooden box. The band is still.',()=>V.plucks>0,'Sound is made when something vibrates: moves back and forth fast.')},
{h:'Stop the sound',p:'The band is shaking and making a sound. Touch the band to stop it.',
 predict:{q:'If you hold the band still, the sound…',opts:['keeps going','stops','gets louder'],ans:1},task:'Make the sound stop',
 show:()=>play(1,[()=>touchBand()],600),
 go:()=>enter(1,'The rubber band is shaking and making a twang.',()=>V.held,'No vibration, no sound.',{amp:22})},
{h:'Find the shaking part',p:'Every sound comes from something shaking. Tap the part that shakes to make the sound.',task:'Find it on all 3',
 show:()=>play(2,[()=>choosePart(0),()=>choosePart(1),()=>choosePart(2)],600),
 go:()=>enter(2,'A drum with a stick. Which part shakes?',()=>V.round>2,'Drum skin, guitar string, voice box: each one vibrates.')},
{h:'Sound shakes things',p:'Rice sits on a drum. Drag the singer near or far, then shout. Watch the rice.',
 predict:{q:'You shout close to the drum. The rice…',opts:['stays still: nothing touched it','jumps','gets heavier'],ans:1},task:'Make the rice jump',
 show:()=>play(3,[()=>setKid(.3),()=>setKid(.5),()=>shout()],350),
 go:()=>enter(3,'A singer far from a drum with rice on it.',()=>V.big,'Sound travels through the air and makes the drum skin vibrate.')},
{h:'A hidden shake',p:'A tuning fork hums when you tap it. You cannot see it shake. Tap it on the block, then dip it in water.',
 predict:{q:'A humming fork goes into water. What happens?',opts:['nothing: it is not moving','the water splashes','the water gets warm'],ans:1},task:'Make the water splash',
 show:()=>play(4,[()=>strike(),()=>dip()],500),
 go:()=>enter(4,'A still tuning fork, a rubber block and a tank of water.',()=>V.splash,'Some vibrations are too fast and small to see, but they are there.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>V.check()});
const CQ=[
 {pic:'↔ ↔ ↔',q:'What is a vibration?',ans:'moving back and forth very fast',bad:[['getting louder','loud'],['moving one way only','oneway']]},
 {pic:'guitar',q:'A guitar makes a sound. What is shaking?',ans:'the strings',bad:[['the round hole','hole'],['the player\'s fingers','finger']]},
 {pic:'bell + hand',q:'You hold a ringing bell and it goes quiet. Why?',ans:'your hand stops it shaking',bad:[['your hand is warm','warm'],['the bell is tired','tired']]},
 {pic:'shout → drum with rice',q:'You shout near a drum. The rice on it jumps. Why?',ans:'the sound makes the drum skin shake',bad:[['the rice heard you','hear'],['your breath blew it','blow']]},
 {pic:'hmmm…',q:'You hum with a hand on your throat. What do you feel?',ans:'a buzz: your voice box is shaking',bad:[['nothing at all','nothing'],['your ears shaking','ears']]},
 {pic:'fork → water',q:'A humming tuning fork goes into water. What happens?',ans:'the water splashes',bad:[['nothing: it looks still','still'],['the fork stops at once and nothing moves','none']]}];
function slip(t){let m='Think: what is shaking back and forth?';
 if(t==='loud')m='Getting louder is not the same thing. A vibration is a fast back-and-forth shake.';
 if(t==='oneway')m='A push one way is not a vibration. It must go back and forth, again and again.';
 if(t==='hole')m='The hole lets the sound out. The strings shake to make it.';
 if(t==='finger')m='Fingers pluck, then let go. The strings keep shaking, and that is the sound.';
 if(t==='warm')m='Warmth does not stop sound. Your hand stops the bell shaking, so the sound stops.';
 if(t==='tired')m='Bells do not get tired. Your hand stops it shaking, and no shaking means no sound.';
 if(t==='hear')m='Rice cannot hear. The sound reaches the drum skin and makes it shake, and the skin throws the rice.';
 if(t==='blow')m='Your breath is too far away to move rice. It is the sound that makes the drum skin shake.';
 if(t==='nothing')m='Hum and feel again: your throat buzzes. Your voice box shakes to make the sound.';
 if(t==='ears')m='Ears hear sound. The buzz is in your throat, where the voice box shakes.';
 if(t==='still')m='It looks still, but it shakes too fast to see. The water shows it with a splash.';
 if(t==='none')m='It is still shaking when it goes in. The fast shake throws the water up.';
 return m}
function ask(){qn++;const Q=CQ[qn%CQ.length],o=[[Q.ans,'ok'],...Q.bad],r=qn%3,ord=o.slice(r).concat(o.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Answer: '+v},row,v).onclick=()=>score(t,Q.ans)});speak('Challenge: '+Q.q);A.redraw()}
function score(t,ans){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();speak(ok?'Yes: '+ans+'.':slip(t));
 fb.innerHTML=(ok?`✓ Yes: ${ans}.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.6,tall:1,draw,onStep:Q=>{quiz.hidden=Q.step!==5;pad.hidden=Q.step===5;keys()},
 init:Q=>{const w=c.el('div',{class:'fl-below'},Q.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Sound lab controls'},w);quiz=c.el('div',{class:'fl-chal'},Q.below);reset();A.every(tickAll);A.gest({down,move,up});keys()}});
A.start()})})();
