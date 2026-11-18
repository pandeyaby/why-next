/* Flagship: the heart and blood (ages 5-7; the heart is a muscle that pumps blood through blood vessels to every
   part of the body; feel the heartbeat at the chest and wrist; it beats faster when we run and keeps going in sleep).
   Squeeze the heart, join tubes to each body part, find pulse spots, compare sleep and running. Every tap has a button twin. */
(()=>{
VIS.reg('flagheart',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['pump','tube','feel','run','sleep','chal'][A.step];
const PACE={sleep:13,sit:16,run:28},PNAME={sleep:'asleep',sit:'sitting still',run:'running'};
// body map in a 0-1 box: parts the tubes reach, and spots to feel for a beat
const PART={head:[.5,.1],arm:[.17,.56],leg:[.42,.95],tummy:[.5,.52]};
const SPOT={chest:[.57,.33,1],wrist:[.2,.52,1],neck:[.5,.21,1],elbow:[.26,.4,0],knee:[.42,.76,0],hair:[.5,.03,0]};
const HEART=[.56,.33];
function box(){const h=A.H*.84,w=h*.62;return{x:A.W/2-w/2,y:A.H*.08,w,h}}
const P=(u,v)=>{const b=box();return[b.x+u*b.w,b.y+v*b.h]};
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function body(){const g=A.ctx,C=A.col,s=A.alpha(C.tx,.5),[hx,hy]=P(.5,.1),b=box();g.strokeStyle=s;g.lineWidth=2;g.fillStyle=A.alpha(C.tx,.05);
 g.beginPath();g.arc(hx,hy,b.h*.075,0,7);g.fill();g.stroke();A.paint.rrect(...P(.3,.2),b.w*.4,b.h*.42,b.w*.12);g.fill();g.stroke();
 g.lineWidth=b.w*.09;g.lineCap='round';g.strokeStyle=A.alpha(C.tx,.12);
 [[.32,.24,.17,.56],[.68,.24,.83,.56],[.42,.6,.42,.95],[.58,.6,.58,.95]].forEach(([a,b2,c2,d])=>{g.beginPath();g.moveTo(...P(a,b2));g.lineTo(...P(c2,d));g.stroke()});g.lineCap='butt'}
function tube(to,k){const[x0,y0]=P(...HEART),[x1,y1]=P(...PART[to]),g=A.ctx,C=A.col,o=k?4:-4;g.strokeStyle=k?A.alpha(A.mix(C.rd,C.tx,.45),.75):A.alpha(C.rd,.75);g.lineWidth=3;g.beginPath();g.moveTo(x0+o,y0);g.quadraticCurveTo((x0+x1)/2+o*3,(y0+y1)/2,x1+o,y1);g.stroke()}
function heart(){const g=A.ctx,C=A.col,[x,y]=P(...HEART),r=box().w*.11*S.sq;g.fillStyle=C.rd;g.beginPath();g.moveTo(x,y+r*.9);g.bezierCurveTo(x-r*1.6,y-r*.2,x-r*.7,y-r*1.3,x,y-r*.45);g.bezierCurveTo(x+r*.7,y-r*1.3,x+r*1.6,y-r*.2,x,y+r*.9);g.fill()}
function dots(){const g=A.ctx,C=A.col;for(const d of S.flow){const[x0,y0]=P(...HEART),[x1,y1]=P(...PART[d.to]),t=d.t<1?d.t:2-d.t,o=d.t<1?-4:4,mx=(x0+x1)/2+o*3,my=(y0+y1)/2,u=1-t;
 g.fillStyle=d.t<1?C.rd:A.mix(C.rd,C.tx,.45);g.beginPath();g.arc(u*u*(x0+o)+2*u*t*mx+t*t*(x1+o),u*u*y0+2*u*t*my+t*t*y1,4,0,7);g.fill()}}
function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#fde2e2',C.dark?.05:.28);g.fillRect(0,0,W,H);const k=kind();
 if(k==='chal'){T('The heart is a muscle that pumps blood',W/2,H*.3,A.narrow?15:18);T('Blood goes through tubes to every part',W/2,H*.48,A.narrow?14:16);T('Feel it at your chest and wrist',W/2,H*.66,A.narrow?14:16,{c:C.mu});A.fx.draw(g);return}
 body();S.tubes.forEach(t=>{tube(t,0);tube(t,1)});dots();heart();
 if(k==='feel'||k==='sleep')for(const n in SPOT){const[u,v]=SPOT[n],[x,y]=P(u,v),f=S.felt.has(n);g.strokeStyle=f?(SPOT[n][2]?C.gr:C.or):A.alpha(C.tx,.45);g.lineWidth=f?3:1.5;g.setLineDash(f?[]:[4,3]);g.beginPath();g.arc(x,y,13,0,7);g.stroke();g.setLineDash([])}
 const top=k==='pump'?'Squeezes: '+S.n:k==='tube'?'Tubes joined: '+S.tubes.length+' of 4':k==='feel'?'Beats found: '+[...S.felt].filter(n=>SPOT[n][2]).length:S.act?PNAME[S.act][0].toUpperCase()+PNAME[S.act].slice(1)+': about '+PACE[S.act]+' beats in 10 seconds':'Pick sleep, sit or run';
 T(top,W/2,H*.96,A.narrow?13:15,{w:800});A.fx.draw(g)}
function squeeze(){if(!S.tubes.length){S.n++;A.sound.tick();say('Squeeze '+S.n+'. No tubes yet, so the blood has nowhere to go.');pulse();return}
 S.n++;A.sound.tick();S.tubes.forEach(to=>{S.flow.push({to,t:0});S.got.add(to)});pulse();
 say('Squeeze '+S.n+'. Blood goes out to the '+S.tubes.join(', ')+' and comes back.');S.check()}
function pulse(){S.sq=1.25;A.tween(S,{sq:1},260,'out');A.redraw()}
function join(to){if(S.tubes.includes(to)){say('The '+to+' already has a tube.');return}S.tubes.push(to);A.sound.tick();say('Tube joined from the heart to the '+to+'. '+(S.tubes.length<4?'Join the next part.':'All parts joined. Now squeeze.'));A.redraw();S.check()}
function feel(n){S.felt.add(n);if(SPOT[n][2]){A.sound.tick();say('Yes! You can feel a beat at the '+n+'.'+(S.act?' It goes '+(S.act==='sleep'?'slowly':S.act==='run'?'fast':'steadily')+'.':''))}
 else{A.sound.miss();say('No beat at the '+n+'. Try the chest, or the wrist just below the thumb.')}A.redraw();S.check()}
function act(a){S.act=a;S.tried.add(a);clearInterval(S.beat);const ms=10000/PACE[a];if(!A.reduced())S.beat=setInterval(()=>{if(A.isDone&&kind()!=='run'&&kind()!=='sleep')return;squeezeQuiet()},ms);
 A.sound.tick();say('Now '+PNAME[a]+'. The heart beats about '+PACE[a]+' times in 10 seconds.');A.redraw();S.check()}
function squeezeQuiet(){S.tubes.forEach(to=>S.flow.push({to,t:0}));S.sq=1.2;A.tween(S,{sq:1},200,'out')}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function reset(o){run++;if(S.beat)clearInterval(S.beat);for(const x in S)delete S[x];Object.assign(S,{n:0,sq:1,tubes:[],flow:[],got:new Set(),felt:new Set(),tried:new Set(),act:null,check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?30*(j+1):(j+1)*320))}
const ALL=['head','arm','leg','tummy'];
function controls(){if(!ctl)return;ctl.innerHTML='';const k=kind(),btn=(t,f)=>{c.el('button',{type:'button',class:'lbtn'},ctl,t).onclick=f};if(k==='chal')return;
 if(k==='pump'||k==='tube')btn('Squeeze the heart',squeeze);
 if(k==='tube')ALL.forEach(p=>{if(!S.tubes.includes(p))btn('Tube to '+p,()=>{join(p);controls()})});
 if(k==='run'||k==='sleep')['sleep','sit','run'].forEach(a=>btn(a==='sleep'?'Sleep':a==='sit'?'Sit':'Run',()=>act(a)));
 if(k==='feel'||k==='sleep')Object.keys(SPOT).forEach(n=>btn('Feel '+n,()=>feel(n)))}
function hit(p,list){let best=null,bd=1e9;for(const n in list){const[x,y]=P(list[n][0],list[n][1]),d=Math.hypot(p.x-x,p.y-y);if(d<bd){bd=d;best=n}}return bd<34?best:null}
function down(p){const k=kind();if(k==='chal')return false;const[hx,hy]=P(...HEART);
 if((k==='pump'||k==='tube'||k==='run')&&Math.hypot(p.x-hx,p.y-hy)<box().w*.16){squeeze();return true}
 if(k==='tube'){const t=hit(p,PART);if(t){join(t);controls();return true}}
 if(k==='feel'||k==='sleep'){const s=hit(p,SPOT);if(s){feel(s);return true}}return false}
const steps=[
{h:'A pump inside you',p:'Your heart is a muscle in your chest. Each squeeze pushes blood out. Tap the heart to squeeze it.',
 predict:{q:'What does your heart do?',opts:['pumps blood','helps you think','breaks up food'],ans:0},
 task:'Squeeze the heart 5 times',show:()=>auto(0,Array(5).fill(squeeze)),
 go:()=>{reset({tubes:['head','arm','leg','tummy']});say('Tap the heart to squeeze it.');controls();S.check=finish(0,()=>S.n>=5,'Squeeze, rest, squeeze: that is a heartbeat.')}},
{h:'Tubes to every part',p:'Blood moves in tubes called blood vessels. Join a tube from the heart to each part, then squeeze.',
 predict:{q:'Does blood go to your toes?',opts:['yes, to every part','no, only the chest','only when you run'],ans:0},
 task:'Join tubes to head, arm, leg and tummy, then squeeze',show:()=>auto(1,ALL.map(t=>()=>{join(t);controls()}).concat([squeeze])),
 go:()=>{reset();say('No tubes yet. Tap a body part to join a tube.');controls();S.check=finish(1,()=>ALL.every(t=>S.got.has(t)),'Red blood goes out in one tube and comes back in another.')}},
{h:'Feel your heartbeat',p:'Put your hand on your chest, or two fingers on your wrist below the thumb. Tap the spots where you can feel a beat.',
 predict:{q:'Where can you feel your heartbeat?',opts:['wrist and chest','elbow','hair'],ans:0},
 task:'Find a beat at the chest and at the wrist',show:()=>auto(2,[()=>feel('chest'),()=>feel('wrist')]),
 go:()=>{reset({tubes:['head','arm','leg','tummy']});say('Tap a spot to feel for a beat.');controls();S.check=finish(2,()=>S.felt.has('chest')&&S.felt.has('wrist'),'The beat you feel at your wrist is your pulse.')}},
{h:'Sit or run?',p:'Try sitting still, then running. Watch how fast the heart beats each time.',
 predict:{q:'After a run, your heart beats…',opts:['faster','slower','not at all'],ans:0},
 task:'Try sit and run, and compare',show:()=>auto(3,[()=>act('sit'),()=>act('run')]),
 go:()=>{reset({tubes:['head','arm','leg','tummy']});say('Pick sit or run.');controls();S.check=finish(3,()=>S.tried.has('sit')&&S.tried.has('run'),'Running muscles need more blood, so the heart beats faster.')}},
{h:'Free play: a heart that never stops',p:'Try anything: sleep, sit, run, and feel for the beat. Does the heart stop when you sleep?',
 predict:{q:'When you are asleep, your heart…',opts:['keeps beating, slowly','stops','beats fastest'],ans:0},
 task:'Go to sleep, then feel for a beat',show:()=>auto(4,[()=>act('sleep'),()=>feel('chest')]),
 go:()=>{reset({tubes:['head','arm','leg','tummy']});say('Free play. Pick sleep, sit or run.');controls();S.check=finish(4,()=>S.act==='sleep'&&[...S.felt].some(n=>SPOT[n][2]),'Asleep, the heart still beats, just more slowly.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['What does the heart do?',[['pumps blood round the body','ok'],['helps you think','think'],['breaks up food','food']]],
 ['Blood moves through tubes called…',[['blood vessels','ok'],['bones','bone'],['muscles','mus']]],
 ['Where can you feel your heartbeat?',[['on your wrist','ok'],['on your elbow','elbow'],['in your hair','hair']]],
 ['You run fast. Your heart beats…',[['faster','ok'],['slower','slow'],['not at all','stop']]],
 ['You are fast asleep. Your heart…',[['keeps beating','ok'],['stops till morning','stop'],['beats fastest','fast']]],
 ['Your heart is a…',[['muscle','ok'],['bone','bone'],['bag of air','air']]],
 ['Does blood go to your toes?',[['yes, to every part','ok'],['no, only the chest','chest'],['only when you run','runonly']]]];
function why(t){let m='The heart is a muscle that pumps blood through tubes to every part.';
 if(t==='think')m='Thinking is the brain\'s job. The heart pumps blood.';
 if(t==='food')m='Food is broken up in the tummy. The heart pumps blood.';
 if(t==='bone'||t==='mus')m='Bones hold you up and muscles move you. Blood flows in blood vessels.';
 if(t==='elbow'||t==='hair')m='There is no beat to feel there. Try your wrist below the thumb, or your chest.';
 if(t==='slow')m='Running muscles need more blood, so the heart goes faster, not slower.';
 if(t==='stop')m='The heart never stops. It beats all day and all night, even when you sleep.';
 if(t==='fast')m='In sleep the heart beats slowly. It beats fastest when you run.';
 if(t==='air')m='Air goes into your lungs. The heart is a muscle full of blood.';
 if(t==='chest'||t==='runonly')m='Blood goes to every part of you, toes too, all the time.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+2)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Heart controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.every(dt=>{if(!S.flow||!S.flow.length)return false;for(const d of S.flow)d.t+=dt*1.1;S.flow=S.flow.filter(d=>d.t<2);return true});
  A.gest({down:p=>down(p)});c.stops.push(()=>clearInterval(S.beat));controls()}});
A.start()})})();
