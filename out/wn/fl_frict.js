/* Flagship: Friction & Surfaces (ages 7–8; KS2 Year 3 Forces and magnets: compare how things move on different
   surfaces). Roll the same toy car across ice, wood, carpet and sandpaper; drag a block both ways and watch the
   friction arrow always point against the motion; run a fair test (same push); rank surfaces from slippery to grippy;
   tilt a ramp until a block starts to slide; and see that grippy soles let you walk on ice. Distinct from flagshove
   (push and pull strength) and flagfvoc (force word matching): this lab is about friction itself and surfaces. */
(()=>{
// model values (illustrative): roll distance in metres for a gentle push, and the ramp angle where a wooden block slides
const SURF=[{k:'ice',d:3.0,ang:6},{k:'wood',d:1.6,ang:20},{k:'carpet',d:0.7,ang:30},{k:'sandpaper',d:0.4,ang:40}];
const STRONG=1.3,TRACK=4;
VIS.reg('flagfrict',c=>{let A,ctl,chal,qn=-1;const F={};
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const part=()=>['roll','arrow','fair','rank','ramp','walk','chal'][A.step];
function label(s,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.thin?500:700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(s,x,y,o.max||A.W-10)}
function clear(o){for(const k in F)delete F[k];Object.assign(F,{surf:1,push:0,car:0,moving:false,tests:[],dirs:{l:false,r:false},block:null,order:[],tilt:0,slid:{},sole:null,steps:0,slips:0,note:'',ok:()=>{}},o||{});A.redraw()}
// ---------- textures ----------
function floor(g,x,y,w,h,s){const C=A.col;const base={ice:A.mix(C.pn,'#bae6fd',C.dark?.25:.7),wood:A.mix(C.pn,'#d6a56b',C.dark?.35:.65),carpet:A.mix(C.pn,'#c084fc',C.dark?.3:.45),sandpaper:A.mix(C.pn,'#a8a29e',C.dark?.35:.7)}[s];
 g.fillStyle=base;g.fillRect(x,y,w,h);g.strokeStyle=A.alpha(C.tx,.35);g.lineWidth=1;
 if(s==='ice'){for(let i=0;i<w;i+=46){g.beginPath();g.moveTo(x+i,y+h*.7);g.lineTo(x+i+18,y+h*.3);g.stroke()}}
 if(s==='wood'){for(let i=0;i<w;i+=70){g.beginPath();g.moveTo(x+i,y);g.lineTo(x+i,y+h);g.stroke()}}
 if(s==='carpet'){g.fillStyle=A.alpha(C.tx,.3);for(let i=4;i<w;i+=8)for(let j=3;j<h;j+=7){g.fillRect(x+i,y+j,2,2)}}
 if(s==='sandpaper'){g.fillStyle=A.alpha(C.tx,.45);for(let i=0;i<w*h/40;i++){const r=(Math.sin(i*12.9898)*43758.5453)%1,q=(Math.sin(i*78.233)*12543.12)%1;g.fillRect(x+Math.abs(r)*w,y+Math.abs(q)*h,2,2)}}
 g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(x,y,w,h)}
function car(g,x,y,s){const C=A.col;g.fillStyle=C.rd;A.paint.rrect(x-s,y-s*.9,s*2,s*.7,s*.2);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();
 [-.55,.55].forEach(k=>{g.fillStyle=C.tx;g.beginPath();g.arc(x+k*s,y-s*.2,s*.26,0,7);g.fill()})}
function arrow(g,x0,y,x1,col,txt){if(Math.abs(x1-x0)<4)return;const d=Math.sign(x1-x0);g.strokeStyle=col;g.fillStyle=col;g.lineWidth=5;g.beginPath();g.moveTo(x0,y);g.lineTo(x1-d*10,y);g.stroke();g.beginPath();g.moveTo(x1,y);g.lineTo(x1-d*14,y-8);g.lineTo(x1-d*14,y+8);g.closePath();g.fill();if(txt)label(txt,(x0+x1)/2,y-16,13,{c:col})}
// ---------- drawing ----------
function draw(A){const{ctx:g,W,H,col:C}=A,p=part();g.fillStyle=A.mix(C.pn,C.gr,C.dark?.05:.07);g.fillRect(0,0,W,H);const sm=A.narrow?13:15;
 if(p==='chal'){label('Rough or smooth? More or less friction?',W/2,H*.42,A.narrow?15:18);label('Answer below',W/2,H*.56,13,{c:C.mu,thin:true});A.fx.draw(g);return}
 const x0=W*.06,x1=W*.94,m2px=(x1-x0)/TRACK;
 if(p==='roll'||p==='fair'){const s=SURF[F.surf];label(p==='roll'?'Same push, different floors':'Fair test: keep the push the same',W/2,H*.06,sm);
  const fy=H*.34;floor(g,x0,fy,x1-x0,H*.08,s.k);for(let m=0;m<=TRACK;m++){g.fillStyle=C.tx;g.fillRect(x0+m*m2px-1,fy+H*.08,2,8);label(m+' m',x0+m*m2px,fy+H*.08+18,12,{thin:true})}
  car(g,x0+F.car*m2px+16,fy,A.narrow?14:18);label(s.k+(F.push?' · strong push':' · gentle push'),W/2,H*.18,sm,{c:C.mu});
  // results so far
  F.tests.forEach((t,i)=>{const y=H*.58+i*(A.narrow?20:22);if(y>H*.97)return;g.fillStyle=A.alpha(C.ac,.25);g.fillRect(x0+90,y-7,(t.d/TRACK)*(x1-x0-150),14);label(`${t.k}${p==='fair'?(t.push?' (strong)':' (gentle)'):''}`,x0,y,12,{al:'left',thin:true,max:86});label(t.d.toFixed(1)+' m',x1,y,12,{al:'right'})})}
 if(p==='arrow'){label('Drag the block across the sandpaper',W/2,H*.06,sm);const fy=H*.55;floor(g,x0,fy,x1-x0,H*.1,'sandpaper');
  const bx=F.block?F.block.x:W/2,bw=A.narrow?56:70;g.fillStyle=A.mix(C.pn,'#d6a56b',.6);g.fillRect(bx-bw/2,fy-bw*.7,bw,bw*.7);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(bx-bw/2,fy-bw*.7,bw,bw*.7);
  if(F.block&&F.block.v){const d=Math.sign(F.block.v);arrow(g,bx,fy-bw*1.1,bx+d*70,C.cy,'you pull');arrow(g,bx,fy+H*.18,bx-d*70,C.rd,'friction')}
  label(`Pulled right: ${F.dirs.r?'yes':'not yet'} · Pulled left: ${F.dirs.l?'yes':'not yet'}`,W/2,H*.92,12,{c:C.mu})}
 if(p==='rank'){label('Tap from most slippery to most grippy',W/2,H*.06,sm);const n=SURF.length,cw=(x1-x0)/2-6,chh=H*.3;
  SURF.forEach((s,i)=>{const cx=x0+(i%2)*(cw+12),cy=H*.14+Math.floor(i/2)*(chh+10);floor(g,cx,cy,cw,chh,s.k);const at=F.order.indexOf(i);
   g.fillStyle=C.pn;A.paint.rrect(cx+cw/2-50,cy+chh/2-14,100,28,14);g.fill();label(at>=0?`${at+1}. ${s.k}`:s.k,cx+cw/2,cy+chh/2,13,{max:96})});
  label(F.note||'1 = least friction',W/2,H*.93,12,{c:C.mu,thin:true})}
 if(p==='ramp'){const s=SURF[F.surf];label(`Tilt the ramp: when does the block slide on ${s.k}?`,W/2,H*.06,sm);
  const px=W*.12,py=H*.82,len=W*(A.narrow?.72:.6),a=F.tilt*Math.PI/180,ex=px+len*Math.cos(a),ey=py-len*Math.sin(a);
  g.save();g.translate(px,py);g.rotate(-a);floor(g,0,0,len,12,s.k);const slide=F.tilt>=s.ang,bp=slide?len*.1:len*.7,bw=A.narrow?34:44;
  g.fillStyle=A.mix(C.pn,'#d6a56b',.6);g.fillRect(bp-bw/2,-bw*.8,bw,bw*.8);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(bp-bw/2,-bw*.8,bw,bw*.8);g.restore();
  g.fillStyle=C.am;g.beginPath();g.arc(ex,ey,14,0,7);g.fill();g.strokeStyle=C.tx;g.stroke();label('drag',ex,ey-26,12,{c:C.mu});
  label(`Ramp ${Math.round(F.tilt)}°`,W*.3,H*.2,15);label(slide?'It slides!':'Still gripping',W*.3,H*.28,15,{c:slide?C.rd:C.gr});
  const seen=Object.entries(F.slid).map(([k,v])=>`${k} ${v}°`).join(' · ');label(seen?'Slid at: '+seen:'Find the slide angle on wood, then sandpaper',W/2,H*.93,12,{c:C.mu,thin:true})}
 if(p==='walk'){label('Walk across the ice',W/2,H*.06,sm);const fy=H*.66;floor(g,x0,fy,x1-x0,H*.1,'ice');const px=x0+30+F.steps*((x1-x0-60)/5),r=A.narrow?12:15;
  g.strokeStyle=C.tx;g.lineWidth=4;g.beginPath();g.arc(px,fy-r*5,r,0,7);g.stroke();g.beginPath();g.moveTo(px,fy-r*4);g.lineTo(px,fy-r*2);g.lineTo(px-r,fy);g.moveTo(px,fy-r*2);g.lineTo(px+(F.slips%2?r*1.8:r),fy);g.stroke();
  g.fillStyle=C.gr;g.fillRect(x1-14,fy-r*6,6,r*6);label('🏁',x1-10,fy-r*6.6,16);
  label(F.sole?`Soles: ${F.sole}`:'Choose soles first',W/2,H*.2,sm,{c:C.mu});label(F.note||'',W/2,H*.88,12,{c:C.mu,thin:true})}
 A.fx.draw(g)}
// ---------- actions ----------
function roll(){if(F.moving)return;const s=SURF[F.surf],d=Math.min(TRACK,s.d*(F.push?STRONG:1));F.moving=true;F.car=0;A.sound.whoosh();
 A.tween(F,{car:d},A.reduced()?10:900,'out',()=>{F.moving=false;F.tests.push({k:s.k,d,push:F.push});say(`${s.k}: the car rolled ${d.toFixed(1)} m with a ${F.push?'strong':'gentle'} push.`);F.ok()})}
function pickSurf(i){F.surf=i;F.car=0;say(`Floor: ${SURF[i].k}.`);A.redraw();controls()}
function rank(i){if(F.order.includes(i))return;const want=F.order.length;if(i===want){F.order.push(i);A.sound.pop();F.note=F.order.length===4?'Ice, wood, carpet, sandpaper: slippery to grippy.':`${SURF[i].k} is number ${want+1}.`}
 else{A.sound.miss();F.note=`${SURF[i].k} grips more than ${SURF[want].k}. Rougher means more friction, so it goes later.`}say(F.note);A.redraw();F.ok()}
function tilt(t){F.tilt=Math.max(0,Math.min(50,t));const s=SURF[F.surf];if(F.tilt>=s.ang&&F.slid[s.k]==null){F.slid[s.k]=s.ang;A.sound.pop();say(`The block slides on ${s.k} at about ${s.ang}°.`)}else say(`Ramp at ${Math.round(F.tilt)}°. ${F.tilt>=s.ang?'The block slides.':'The block still grips.'}`);A.redraw();F.ok()}
function step(){if(!F.sole){say('Choose the soles first.');return}if(F.sole==='smooth'){F.slips++;A.sound.miss();F.note='Whoops! Smooth soles slip on ice: too little friction to push off.'}else{F.steps=Math.min(5,F.steps+1);A.sound.tick();F.note=F.steps>=5?'Across! Grippy soles make friction with the ice.':`Step ${F.steps} of 5.`}say(F.note);A.redraw();F.ok()}
function controls(){if(!ctl)return;ctl.innerHTML='';const p=part();if(p==='chal')return;const b=(t,f,l,on)=>{const e=c.el('button',{type:'button',class:'lbtn'+(on?' mine':''),'aria-label':l||t},ctl,t);if(on!=null)e.setAttribute('aria-pressed',String(!!on));e.onclick=f};
 if(p==='roll'||p==='fair'){SURF.forEach((s,i)=>b(s.k,()=>pickSurf(i),'Floor: '+s.k,F.surf===i));if(p==='fair'){b('Gentle push',()=>{F.push=0;say('Gentle push.');controls();A.redraw()},'Gentle push',F.push===0);b('Strong push',()=>{F.push=1;say('Strong push.');controls();A.redraw()},'Strong push',F.push===1)}b('Push the car ▶',roll,'Push the car')}
 if(p==='arrow'){b('Pull right →',()=>slideBlock(1),'Pull the block to the right');b('← Pull left',()=>slideBlock(-1),'Pull the block to the left')}
 if(p==='rank')SURF.forEach((s,i)=>b(s.k,()=>rank(i),'Rank '+s.k));
 if(p==='ramp'){[1,3].forEach(i=>b(SURF[i].k,()=>{F.surf=i;F.tilt=0;say('Ramp flat. Floor: '+SURF[i].k);controls();A.redraw()},'Ramp surface: '+SURF[i].k,F.surf===i));b('Tilt up 5°',()=>tilt(F.tilt+5),'Tilt the ramp up 5 degrees');b('Lower 5°',()=>tilt(F.tilt-5),'Lower the ramp 5 degrees')}
 if(p==='walk'){b('Smooth soles',()=>{F.sole='smooth';controls();A.redraw()},'Smooth soles',F.sole==='smooth');b('Grippy soles',()=>{F.sole='grippy';controls();A.redraw()},'Grippy soles',F.sole==='grippy');b('Take a step',step,'Take a step')}}
function slideBlock(d){const x=F.block?F.block.x:A.W/2;F.block={x:Math.max(A.W*.2,Math.min(A.W*.8,x+d*60)),v:d};F.dirs[d>0?'r':'l']=true;A.sound.tick();say(`You pull ${d>0?'right':'left'}; friction pulls ${d>0?'left':'right'}, against the motion.`);A.redraw();F.ok()}
// canvas: tap the floor to push the car, drag the block, drag the ramp end, tap a surface card, tap to step
function down(p){const k=part(),W=A.W,H=A.H;if(k==='chal')return false;
 if(k==='roll'||k==='fair'){if(p.y>H*.2&&p.y<H*.5){roll();return true}return false}
 if(k==='arrow'){F.drag={x0:p.x,last:p.x};if(!F.block)F.block={x:W/2,v:0};return true}
 if(k==='rank'){const cw=(W*.88)/2-6,chh=H*.3;for(let i=0;i<4;i++){const cx=W*.06+(i%2)*(cw+12),cy=H*.14+Math.floor(i/2)*(chh+10);if(p.x>cx&&p.x<cx+cw&&p.y>cy&&p.y<cy+chh){rank(i);return true}}return false}
 if(k==='ramp'){F.drag={ramp:true};move(p);return true}
 if(k==='walk'){step();return true}return false}
function move(p){if(!F.drag)return;const k=part();
 if(k==='arrow'){const dx=p.x-F.drag.last;if(Math.abs(dx)>2){F.block={x:Math.max(A.W*.2,Math.min(A.W*.8,F.block.x+dx)),v:Math.sign(dx)};F.drag.last=p.x;if(Math.abs(p.x-F.drag.x0)>40)F.dirs[dx>0?'r':'l']=true;say(`Moving ${dx>0?'right':'left'}: friction points ${dx>0?'left':'right'}.`);A.redraw();F.ok()}}
 if(k==='ramp'){const px=A.W*.12,py=A.H*.82;tilt(Math.atan2(py-p.y,Math.max(1,p.x-px))*180/Math.PI)}}
function up(){F.drag=null;A.redraw()}
const fin=(i,ok,msg)=>()=>{if(A.step===i&&!A.isDone&&A.pred[i]!=null&&ok())A.done(msg()+A.reveal(i))};
function auto(i,list){steps[i].go();list.forEach((f,j)=>setTimeout(()=>{if(A.step===i)f()},A.reduced()?30*(j+1):(j+1)*350))}
const tested=k=>F.tests.some(t=>t.k===k);
const steps=[
{h:'Same push, different floors',p:'Push the same toy car with the same gentle push on ice, wood and carpet. Watch how far it rolls before it stops.',
 predict:{q:'On which floor will the car roll furthest?',opts:['carpet, because it is soft','ice, because it is smooth','sandpaper, because it is rough'],ans:1},
 task:'Roll the car on ice, wood and carpet',show:()=>auto(0,[()=>{pickSurf(0);roll()},()=>{},()=>{},()=>{pickSurf(1);roll()},()=>{},()=>{},()=>{pickSurf(2);roll()}]),
 go:()=>{clear({surf:1});say('Pick a floor, then push the car.');controls();F.ok=fin(0,()=>['ice','wood','carpet'].every(tested),()=>'Ice let it roll furthest and carpet stopped it soonest. Rough surfaces make more friction.')}},
{h:'Friction pulls back',p:'Friction is a force between two surfaces that rub. It always acts against the motion: drag the block right and friction points left.',
 predict:{q:'You pull the block to the right. Friction points…',opts:['to the right, the same way','to the left, against the motion','nowhere: it only happens when things stop'],ans:1},
 task:'Drag the block right, then left',show:()=>auto(1,[()=>slideBlock(1),()=>slideBlock(-1)]),
 go:()=>{clear();say('Drag the block or use the buttons.');controls();F.ok=fin(1,()=>F.dirs.l&&F.dirs.r,()=>'Both ways, friction pointed against the motion.')}},
{h:'Make it a fair test',p:'To compare two floors, change only the floor. Keep the car and the push the same, or you cannot tell which floor made the difference.',
 predict:{q:'To compare wood and carpet fairly, keep the same…',opts:['nothing: just push hard each time','car and push, and change only the floor','floor, and change the push'],ans:1},
 task:'Test wood and carpet with the same push',show:()=>auto(2,[()=>{F.push=1;pickSurf(1);roll()},()=>{},()=>{},()=>{pickSurf(2);roll()}]),
 go:()=>{clear({surf:1});say('Choose a push and a floor, then push.');controls();F.ok=()=>{const w=F.tests.filter(t=>t.k==='wood'),cpt=F.tests.filter(t=>t.k==='carpet');
   if(w.length&&cpt.length&&!w.some(a=>cpt.some(b=>a.push===b.push))&&!A.isDone)say('Not fair yet: the push changed between wood and carpet. Use the same push for both.');
   fin(2,()=>w.some(a=>cpt.some(b=>a.push===b.push)),()=>'Same car, same push, only the floor changed: carpet made more friction than wood.')()}}},
{h:'Slippery to grippy',p:'Smooth surfaces make less friction; rough ones make more. Use your results: put the floors in order.',
 predict:{q:'Which has more friction: wood or carpet?',opts:['wood, because it is hard','carpet, because it is rougher','they are the same'],ans:1},
 task:'Tap the floors from most slippery to most grippy',show:()=>auto(3,[()=>rank(0),()=>rank(1),()=>rank(2),()=>rank(3)]),
 go:()=>{clear({order:[]});say('Tap the most slippery floor first.');controls();F.ok=fin(3,()=>F.order.length===4,()=>'Ice, wood, carpet, sandpaper: friction goes up as the surface gets rougher.')}},
{h:'Tilt the ramp',p:'Friction can hold a block still on a slope. Tilt the ramp slowly. The steeper it must go before the block slides, the more friction the surface has.',
 predict:{q:'Which ramp must be steeper before the block slides?',opts:['wood, because it is smooth','sandpaper, because it grips more','both slide at the same angle'],ans:1},
 task:'Find the slide angle on wood and on sandpaper',show:()=>auto(4,[()=>{F.surf=1;tilt(25)},()=>{F.surf=3;controls();tilt(45)}]),
 go:()=>{clear({surf:1,tilt:0});say('Drag the orange handle up or press Tilt up.');controls();F.ok=fin(4,()=>F.slid.wood!=null&&F.slid.sandpaper!=null,()=>'Wood slid at about 20° and sandpaper held until about 40°. More friction holds on to a steeper slope.')}},
{h:'Friction helps you walk',p:'Friction is not only a nuisance. When you step, your shoe pushes back on the ground, and friction stops it slipping. On ice, smooth soles slip.',
 predict:{q:'Friction is…',opts:['always a nuisance that slows things down','what lets your shoes grip so you can walk','only found on rough things'],ans:1},
 task:'Get across the ice',show:()=>auto(5,[()=>{F.sole='grippy';controls()},step,step,step,step,step]),
 go:()=>{clear({sole:null,steps:0});say('Choose soles, then take steps.');controls();F.ok=fin(5,()=>F.steps>=5,()=>'Grippy soles made enough friction to push off. Smooth soles slipped.')}},
{h:'Challenge',p:'',go:()=>{clear();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>F.ok()});
const QS=[
 ['A ball rolls across grass and across a smooth floor with the same push. Where does it roll further?',[['the smooth floor','ok'],['the grass','soft'],['the same on both','same']]],
 ['You push a box to the left. Which way does friction act on it?',[['to the right','ok'],['to the left','with'],['straight down','down']]],
 ['Leo tests wood with a gentle push and carpet with a strong push. What is wrong?',[['he changed the push too','ok'],['nothing, it is fair','fair'],['he should use a heavier car on carpet','fair']]],
 ['Why do bike brakes slow the wheel?',[['the pads rub and make friction','ok'],['the wheel runs out of push','runout'],['the brakes make the bike heavier','same']]],
 ['Which surface makes the most friction?',[['sandpaper','ok'],['ice','soft'],['polished glass','soft']]],
 ['A sledge slides fast on snow but stops on a path. Why?',[['the path is rougher, so more friction','ok'],['the sledge ran out of force','runout'],['snow pulls the sledge along','with']]]];
function why(t){let m='Friction acts between rubbing surfaces, against the motion, and rough surfaces make more of it.';
 if(t==='soft')m='Soft or bumpy surfaces like grass and carpet make more friction, so things stop sooner. Smooth surfaces let things go further.';
 if(t==='same')m='The surface matters: rougher surfaces rub more, so they make more friction.';
 if(t==='with')m='Friction never helps the motion along. It acts the opposite way to the way the thing moves.';
 if(t==='down')m='That is gravity. Friction acts along the surface, against the motion.';
 if(t==='fair')m='A fair test changes one thing only. If the push changes too, you cannot tell if the floor made the difference.';
 if(t==='runout')m='Moving things do not stop because a push runs out. Friction acts on them and slows them down.';
 return m}
function ask(){qn++;const Q=QS[qn%QS.length],r=(qn+1)%3,opts=[...Q[1].slice(r),...Q[1].slice(0,r)];
 chal.innerHTML=`<p><b>${Q[0]}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');opts.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>mark(t)});say('Challenge: '+Q[0]);A.redraw()}
function mark(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok)A.win();else A.sound.miss();fb.innerHTML=(ok?'✓ Yes. Rougher surfaces, more friction, and it always acts against the motion.':'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Friction controls'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up});controls()}});
A.start()})})();
