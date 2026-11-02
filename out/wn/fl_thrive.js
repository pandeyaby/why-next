/* Flagship – eating, sleeping and moving to grow (ages 3–4). Bodies need food, water, sleep and moving: give the child
   what each body clue asks for, sort every-day foods from sometimes foods, drag the moon across the night until the
   sleep battery is full (for a teddy, a puppy and you), line people up from baby to grown-up, and run, jump and climb
   while the heart beats faster. */
(()=>{
const KIT=[['🍎','food','a hungry tummy'],['💧','water','a dry mouth'],['🛏️','bed','a tired body'],['⚽','ball','moving and playing']];
const CLUE=[{face:'😋',cue:'My tummy is rumbling!',want:0},{face:'🥵',cue:'I ran a lot. My mouth is dry!',want:1},{face:'🥱',cue:'I keep yawning. My eyes are heavy.',want:2}];
const FOOD=[{e:'🍎',n:'apple',bin:0,why:'Fruit is good every day. It helps you grow and stay well.'},{e:'🍬',n:'sweets',bin:1,why:'Sweets have lots of sugar. They are a sometimes food: a small treat, not every day.'},{e:'🥕',n:'carrot',bin:0,why:'Vegetables are good every day. They help your body grow.'}];
const BINS=[['🍽️','Every day'],['🫙','Sometimes']];
const SLEEPERS=[['🧸','Teddy'],['🐶','Puppy'],['🧒','You']],FULL=10;
const SIZES=[['👶','baby',.42],['🧒','toddler',.6],['👧','big girl',.8],['🧑','grown-up',1]],DECK=[0,2,0,1];/* deck positions: big girl, grown-up, toddler (the baby starts in line) */
const MOVES=[{n:'Run',ing:'Running',e:'🏃',say:'Run to the tree!',goal:'🌳'},{n:'Jump',ing:'Jumping',e:'🤸',say:'Jump up to the star!',goal:'⭐'},{n:'Climb',ing:'Climbing',e:'🧗',say:'Climb up to the top!',goal:'🚩'}];
VIS.reg('flagthrive',c=>{let A,pad,quiz,qn=-1,gen=0,streak=0;c.fig.classList.add('young');
const blank=()=>({r:0,n:0,busy:0,ok:0,bad:-1,drag:null,after:()=>{},hrs:0,moon:0,lined:1,pos:0,beat:1,fast:0}),S=blank();
const part=()=>['need','food','sleep','grow','move','quiz'][A.step];
const z=n=>Math.round(n*(A.narrow?1:1.12)),fast=()=>A.reduced()||S.fast;
const tell=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
function words(g,t,x,y,maxw,size,col,wt){g.font=`${wt||700} ${z(size)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;
 const ls=[];let cur='';String(t).split(' ').forEach(w=>{const n=cur?cur+' '+w:w;if(g.measureText(n).width>maxw&&cur){ls.push(cur);cur=w}else cur=n});ls.push(cur);
 const lh=z(size)*1.24;ls.forEach((s,i)=>g.fillText(s,x,y+(i-(ls.length-1)/2)*lh))}
function glyph(g,e,x,y,s){g.fillStyle='#000';g.font=`${Math.round(s)}px system-ui,"Noto Color Emoji","Apple Color Emoji",sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(e,x,y)}
function box(g,r,fill,edge,lw,dash){g.save();A.paint.shadow(6,2,.14);g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,16);g.fill();A.paint.noShadow();if(dash)g.setLineDash([7,5]);g.strokeStyle=edge;g.lineWidth=lw||2;A.paint.rrect(r.x,r.y,r.w,r.h,16);g.stroke();g.restore()}
function row(n,h,y){const w=Math.min(z(120),(A.W-24-(n-1)*10)/n),x0=(A.W-(w*n+(n-1)*10))/2;return Array.from({length:n},(_,j)=>({x:x0+j*(w+10),y:y==null?A.H-h-14:y,w,h}))}
const tray=()=>row(part()==='food'?2:4,z(part()==='food'?104:92));
const childBox=()=>{const s=z(120);return{x:A.W/2-s/2,y:A.H*.2,w:s,h:s}};
const foodSpot=()=>{const s=z(110);return{x:A.W/2-s/2,y:A.H*.22,w:s,h:s}};
/* the night sky: the moon slides along an arc from bedtime (left) to morning (right) */
const sky=()=>({x0:A.W*.14,x1:A.W*.86,y:A.H*.42,rise:A.H*.2});
const moonAt=t=>{const s=sky();return{x:s.x0+(s.x1-s.x0)*t,y:s.y-Math.sin(Math.PI*t)*s.rise}};
const lineSlots=()=>row(4,z(120),A.H*.16);
const deckSlots=()=>{const r=row(3,z(100));return SIZES.map((_,j)=>j?r[DECK[j]]:r[0])};
/* the move track: start and goal points for run, jump and climb */
function track(){const m=S.r,W=A.W,H=A.H;if(m===0)return{a:{x:W*.16,y:H*.72},b:{x:W*.82,y:H*.72}};if(m===1)return{a:{x:W*.5,y:H*.74},b:{x:W*.5,y:H*.3}};return{a:{x:W*.35,y:H*.78},b:{x:W*.62,y:H*.24}}}
const here=()=>{const t=track();return{x:t.a.x+(t.b.x-t.a.x)*S.pos,y:t.a.y+(t.b.y-t.a.y)*S.pos}};
function draw(A,dt){const g=A.ctx,C=A.col,W=A.W,H=A.H,p=part(),d=S.drag;
 if(p==='quiz'){words(g,'Food, water, sleep and moving help you grow.',W/2,H*.45,W-40,19,C.tx,800);return}
 if(p==='need'){const k=CLUE[S.r],b=childBox();words(g,S.ok?`Yes! ${KIT[k.want][1]} for ${KIT[k.want][2]}.`:k.cue,W/2,H*.09,W-30,17,S.ok?C.gr:C.tx,800);
  g.fillStyle=A.alpha(C.cy,.12);g.beginPath();g.arc(b.x+b.w/2,b.y+b.h/2,b.w*.55,0,7);g.fill();glyph(g,S.ok?'😊':k.face,b.x+b.w/2,b.y+b.h/2,b.w*.78);
  if(!S.ok)tray().forEach((r,j)=>{if(d&&d.j===j&&d.x!=null)return;kitCard(g,r,j)});if(d&&d.x!=null){const r=tray()[d.j];kitCard(g,{...r,x:d.x-r.w/2,y:d.y-r.h/2},d.j)}}
 if(p==='food'){const f=FOOD[S.r],s=foodSpot();words(g,S.ok?`${f.n}: ${BINS[f.bin][1].toLowerCase()} food.`:'Every day food, or sometimes food?',W/2,H*.09,W-30,17,S.ok?C.gr:C.tx,800);
  if(!S.ok){const at=d&&d.x!=null?{...s,x:d.x-s.w/2,y:d.y-s.h/2}:s;box(g,at,S.bad>=0?A.mix(C.pn,C.rd,.18):C.pn,S.bad>=0?C.rd:C.am,3);glyph(g,f.e,at.x+at.w/2,at.y+at.h*.42,at.h*.55);words(g,f.n,at.x+at.w/2,at.y+at.h*.86,at.w-8,15,C.tx,800)}
  tray().forEach((r,j)=>{box(g,r,A.mix(C.pn,j?C.vi:C.gr,.12),j?C.vi:C.gr,3);glyph(g,BINS[j][0],r.x+r.w/2,r.y+r.h*.4,z(40));words(g,BINS[j][1],r.x+r.w/2,r.y+r.h*.82,r.w-8,15,C.tx,800);
   if(S.ok&&f.bin===j)glyph(g,f.e,r.x+r.w*.82,r.y+r.h*.25,z(30))})}
 if(p==='sleep'){const who=SLEEPERS[S.r],s=sky(),m=moonAt(S.moon),full=S.hrs>=FULL;
  g.fillStyle=A.alpha(C.vi,.10);A.paint.rrect(10,H*.13,W-20,H*.47,18);g.fill();g.strokeStyle=A.alpha(C.vi,.5);g.setLineDash([4,6]);g.lineWidth=2;g.beginPath();for(let i=0;i<=24;i++){const q=moonAt(i/24);i?g.lineTo(q.x,q.y):g.moveTo(q.x,q.y)}g.stroke();g.setLineDash([]);
  words(g,'bedtime',s.x0,s.y+z(24),z(90),13,C.tx,700);words(g,'morning',s.x1,s.y+z(24),z(90),13,C.tx,700);glyph(g,'☀️',s.x1,s.y-z(4),z(28));
  glyph(g,'🌙',m.x,m.y,z(44));glyph(g,who[0],W/2,H*.5,z(50));glyph(g,full?'😊':'💤',W/2+z(40),H*.44,z(24));
  const bx=W/2-z(130),by=H*.68,bw=z(260),bh=z(40),cell=(bw-8)/FULL;box(g,{x:bx,y:by,w:bw,h:bh},C.pn,full?C.gr:C.ln,3);
  for(let i=0;i<FULL;i++){if(i<S.hrs){g.fillStyle=full?C.gr:A.mix(C.pn,C.gr,.6);A.paint.rrect(bx+4+i*cell+1,by+5,cell-2,bh-10,4);g.fill()}}
  words(g,full?`${who[1]} slept ${S.hrs} hours. Battery full!`:`Sleep battery: ${S.hrs} of ${FULL} hours`,W/2,by+bh+z(22),W-30,15,full?C.gr:C.tx,800);
  if(!S.ok&&S.hrs<FULL)words(g,'Drag the moon to morning',W/2,H*.08,W-30,15,C.tx,800);else words(g,'Wake up!',W/2,H*.08,W-30,16,C.gr,800)}
 if(p==='grow'){words(g,S.lined>=4?'Baby, toddler, big girl, grown-up.':'Smallest to biggest. Who comes next?',W/2,H*.08,W-30,16,C.tx,800);
  lineSlots().forEach((r,j)=>{const on=j<S.lined;box(g,r,on?A.mix(C.pn,C.gr,.12):A.alpha(C.cy,.06),on?C.gr:C.cy,on?3:2,!on);if(on)person(g,r,j)});
  if(S.lined<4)deckSlots().forEach((r,j)=>{if(j<S.lined||(d&&d.j===j&&d.x!=null))return;box(g,r,S.bad===j?A.mix(C.pn,C.rd,.2):C.pn,S.bad===j?C.rd:C.am,S.bad===j?4:2.5);person(g,r,j)});
  if(d&&d.x!=null){const r=deckSlots()[d.j];person(g,{...r,x:d.x-r.w/2,y:d.y-r.h/2},d.j)}}
 if(p==='move'){const t=track(),mv=MOVES[S.r],h=here();words(g,S.ok?`${mv.n}! Your heart beats faster.`:mv.say,W/2,H*.08,W-30,17,S.ok?C.gr:C.tx,800);
  g.strokeStyle=A.alpha(C.am,.8);g.lineWidth=z(10);g.lineCap='round';g.setLineDash([2,z(16)]);g.beginPath();g.moveTo(t.a.x,t.a.y);g.lineTo(t.b.x,t.b.y);g.stroke();g.setLineDash([]);
  if(S.r===2){g.strokeStyle=C.tx;g.lineWidth=3;const L=z(16);[-L,L].forEach(o=>{g.beginPath();g.moveTo(t.a.x+o,t.a.y);g.lineTo(t.b.x+o,t.b.y);g.stroke()})}
  glyph(g,mv.goal,t.b.x,t.b.y-z(28),z(40));glyph(g,mv.e,h.x,h.y-z(10),z(52));
  const hb=1+.12*Math.sin(performance.now()/1000*Math.PI*2*S.beat*.9);glyph(g,'❤️',W-z(44),H*.2,z(34)*hb);words(g,S.beat>1.6?'fast':S.beat>1.2?'faster':'calm',W-z(44),H*.2+z(30),z(80),13,C.tx,700)}
 A.fx.draw(g)}
function kitCard(g,r,j){const C=A.col,bad=S.bad===j;box(g,r,bad?A.mix(C.pn,C.rd,.2):C.pn,bad?C.rd:C.cy,bad?4:2.5);glyph(g,KIT[j][0],r.x+r.w/2,r.y+r.h*.4,z(40));words(g,KIT[j][1],r.x+r.w/2,r.y+r.h*.82,r.w-8,15,C.tx,800)}
function person(g,r,j){const s=SIZES[j];glyph(g,s[0],r.x+r.w/2,r.y+r.h*(.84-s[2]*.36),r.h*.44*s[2]);words(g,s[1],r.x+r.w/2,r.y+r.h*.9,r.w-6,12,A.col.tx,700)}
function nope(t,j){A.sound.miss();S.bad=j==null?-1:j;tell(t);setTimeout(()=>{S.bad=-1;A.redraw()},fast()?10:1100);A.redraw()}
/* count one success; move to the next round after a short pause unless the step stays on one scene */
function hooray(t,stay){S.n++;A.sound.pop();if(S.n<3&&!stay){const r0=S.r,g0=gen;S.busy=1;setTimeout(()=>{if(S.r!==r0||g0!==gen)return;Object.assign(S,{busy:0,r:S.r+1,ok:0,hrs:0,moon:0,pos:0});tell(t+' Next one.');pads();A.redraw()},fast()?5:1300)}tell(t);pads();A.redraw();S.after()}
/* all answers come here, from a drag, a tap or a button */
function pick(j){const p=part();if(p==='quiz'||S.n>=3||S.busy||S.ok)return;
 if(p==='need'){const k=CLUE[S.r];if(j!==k.want)return nope(`The ${KIT[j][1]} is for ${KIT[j][2]}. ${k.cue} That needs ${KIT[k.want][1]}.`,j);S.ok=1;return hooray(`${KIT[j][1]} for ${KIT[j][2]}. Your body tells you what it needs.`)}
 if(p==='food'){const f=FOOD[S.r];if(j!==f.bin)return nope(f.why,0);S.ok=1;return hooray(f.why)}
 if(p==='grow'){if(j<S.lined)return;if(j!==S.lined)return nope(`The ${SIZES[j][1]} is bigger than that. Find the next size up.`,j);S.lined++;return hooray(`${SIZES[j][1]}: bigger again.${j===3?' Grown-ups stop getting taller.':''}`,1)}}
function sleepTo(t){if(part()!=='sleep'||S.ok||S.busy||S.n>=3)return;S.moon=Math.max(S.moon,Math.min(1,t));S.hrs=Math.min(12,Math.floor(S.moon*12+.001));A.redraw()}
function wake(){if(part()!=='sleep'||S.ok||S.busy||S.n>=3)return;const who=SLEEPERS[S.r][1];
 if(S.hrs<FULL)return nope(`${who} only slept ${S.hrs} hours and is still tired. Children need about 10 to 13 hours of sleep. Keep the moon going.`);S.ok=1;hooray(`${who} slept ${S.hrs} hours and wakes up full of energy. Sleep helps bodies grow.`)}
function stepMove(k){if(part()!=='move'||S.ok||S.busy||S.n>=3)return;S.pos=Math.max(S.pos,Math.min(1,k));S.beat=1+(S.n+S.pos)*.33;if(S.pos>=1){S.ok=1;hooray(`You did it! ${MOVES[S.r].ing} makes your heart beat faster and your muscles strong.`)}A.redraw()}
function pads(){if(!pad)return;pad.innerHTML='';const p=part(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=f};if(p==='quiz'||S.n>=3||S.ok)return;
 if(p==='need')KIT.forEach((k,j)=>B(k[0]+' '+k[1],()=>pick(j),'Give '+k[1]));
 if(p==='food')BINS.forEach((b,j)=>B(b[0]+' '+b[1],()=>pick(j),FOOD[S.r].n+': '+b[1]+' food'));
 if(p==='sleep'){B('🌙 One more hour',()=>{sleepTo((S.hrs+1)/12);tell(`${S.hrs} hours of sleep.`)});B('☀️ Wake up',wake)}
 if(p==='grow')[1,3,2].forEach(j=>{if(j>=S.lined)B(SIZES[j][0]+' '+SIZES[j][1],()=>pick(j),'Next: '+SIZES[j][1])});
 if(p==='move')B(MOVES[S.r].e+' '+MOVES[S.r].n+' a bit',()=>{stepMove(S.pos+.34);if(!S.ok)tell('Keep going!')})}
const inside=(q,r)=>q.x>r.x&&q.x<r.x+r.w&&q.y>r.y&&q.y<r.y+r.h;
function down(q){const p=part();if(p==='quiz'||S.busy||S.ok||S.n>=3)return false;
 if(p==='sleep'){const m=moonAt(S.moon);if(Math.hypot(q.x-m.x,q.y-m.y)<z(46)){S.drag={sleep:1};return true}return false}
 if(p==='move'){const h=here();if(Math.hypot(q.x-h.x,q.y-h.y)<z(54)){S.drag={move:1};return true}return false}
 if(p==='food'){if(inside(q,foodSpot())){S.drag={j:0,x:null,x0:q.x,y0:q.y,item:1};return true}const j=tray().findIndex(r=>inside(q,r));if(j>=0)pick(j);return false}
 const set=p==='grow'?deckSlots():tray(),j=set.findIndex((r,i)=>inside(q,r)&&!(p==='grow'&&i<S.lined));if(j<0)return false;S.drag={j,x:null,x0:q.x,y0:q.y};return true}
function move(q){const d=S.drag;if(!d)return;
 if(d.sleep){const s=sky();sleepTo((q.x-s.x0)/(s.x1-s.x0));return}
 if(d.move){const t=track(),vx=t.b.x-t.a.x,vy=t.b.y-t.a.y;stepMove(((q.x-t.a.x)*vx+(q.y-t.a.y)*vy)/(vx*vx+vy*vy));return}
 if(d.x!=null||Math.hypot(q.x-d.x0,q.y-d.y0)>8){d.x=q.x;d.y=q.y;A.redraw()}}
function up(q){const d=S.drag;S.drag=null;if(!d)return;const p=part();
 if(d.sleep){if(S.moon>=.99)wake();else tell(`${S.hrs} hours so far. Keep dragging the moon to morning.`);return}
 if(d.move){if(!S.ok)tell('Keep going!');return}
 if(d.item){if(d.x==null)return A.redraw();const j=tray().findIndex(r=>inside(q,{x:r.x-10,y:r.y-30,w:r.w+20,h:r.h+40}));if(j>=0)pick(j);else{tell('Drop it on a box.');A.redraw()}return}
 if(d.x==null)return pick(d.j);const tgt=p==='grow'?lineSlots()[Math.min(3,S.lined)]:childBox();
 if(inside(q,{x:tgt.x-30,y:tgt.y-30,w:tgt.w+60,h:tgt.h+60}))pick(d.j);else{tell(p==='grow'?'Drop it in the next empty box.':'Drop it on the child.');A.redraw()}}
const doneWhen=(i,msg)=>()=>{if(A.step===i&&S.n>=3&&(!steps[i].predict||A.pred[i]!=null))A.done(msg+A.reveal(i))};
function autoplay(f){const k=++gen,go=()=>{if(k!==gen||S.n>=3)return;f();setTimeout(go,60)};setTimeout(go,30)}
const fresh=()=>{gen++;Object.assign(S,blank())};
function solveOne(){const p=part();if(p==='need')return pick(CLUE[S.r].want);if(p==='food')return pick(FOOD[S.r].bin);if(p==='grow')return pick(S.lined);
 if(p==='sleep'){if(S.busy||S.ok)return;if(S.hrs<FULL)return sleepTo((S.hrs+1)/12);return wake()}if(p==='move'){if(!S.busy&&!S.ok)stepMove(S.pos+.34)}}
const show=i=>()=>{steps[i].go();S.fast=1;autoplay(solveOne)};
const steps=[
{h:'What does my body need?',p:'Your body gives you clues. Drag what the child needs onto the child, or tap it.',task:'Help 3 times',show:show(0),
 go:()=>{fresh();tell('My tummy is rumbling! What do I need?');pads();S.after=doneWhen(0,'Hungry: food. Thirsty: water. Tired: sleep.')}},
{h:'Every day or sometimes?',p:'Drag the food to the plate if it is good every day, or to the jar if it is a sometimes treat.',predict:{q:'Sweets taste nice. Should you eat them every day?',opts:['Yes, lots every day','No, just sometimes'],ans:1},task:'Sort 3 foods',show:show(1),
 go:()=>{fresh();tell('An apple. Every day or sometimes?');pads();S.after=doneWhen(1,'Fruit and vegetables every day. Sweets just sometimes.')}},
{h:'Sleep fills you up',p:'Drag the moon across the night sky. Watch the sleep battery fill. Wake up when it is full.',predict:{q:'Does staying up late help you grow?',opts:['Yes, more time to play','No, sleep helps you grow'],ans:1},task:'Fill 3 sleep batteries',show:show(2),
 go:()=>{fresh();tell('Teddy is in bed. Drag the moon to morning.');pads();S.after=doneWhen(2,'Children need about 10 to 13 hours of sleep. Animals need sleep too.')}},
{h:'I have grown!',p:'The baby goes first. Drag the next biggest person into the next box.',predict:{q:'Do grown-ups keep getting taller and taller?',opts:['Yes, forever','No, they stop getting taller'],ans:1},task:'Line up 3 people',show:show(3),
 go:()=>{fresh();tell('The baby is first. Who comes next?');pads();S.after=doneWhen(3,'You were a baby. Now you are bigger. Children grow; grown-ups stop getting taller.')}},
{h:'Move your body',p:'Drag the child along the path. Watch the heart beat faster.',task:'Run, jump and climb',show:show(4),
 go:()=>{fresh();tell('Run to the tree! Drag the child.');pads();S.after=doneWhen(4,'Moving every day makes your heart and muscles strong.')}},
{h:'Challenge',p:'',go:()=>{fresh();challenge()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.after()});
const QS=[['Ben is yawning. What does he need?',[['Sleep','ok'],['A sweet','treat'],['A ball','play']]],
 ['Which food is good every day?',[['A banana','ok'],['Sweets','treat'],['Crisps','treat']]],
 ['How do you grow big and strong?',[['Eat, drink, sleep and move','ok'],['Only eat sweets','treat'],['Stay up very late','late']]],
 ['Your mouth is dry after running. What helps?',[['A drink of water','ok'],['Going to bed','sleep'],['A sweet','treat']]],
 ['Which helps your heart get strong?',[['Running and jumping','ok'],['Sitting still all day','still'],['Staying up late','late']]]];
function why(t){let m='Your body needs food, water, sleep and moving.';
 if(t==='treat')m='Sweets and crisps are sometimes foods. Fruit, vegetables and water are for every day.';if(t==='play')m='A ball is for moving. A yawn means your body needs sleep.';
 if(t==='late')m='Staying up late leaves your body tired. Sleep helps you grow.';if(t==='sleep')m='A dry mouth means your body needs water, not sleep.';
 if(t==='still')m='Sitting still all day does not make your heart work. Running and jumping do.';return m}
function challenge(){qn++;const[q,ops]=QS[qn%QS.length],rot=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box2=quiz.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},box2,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Yes! That helps your body grow.':'✗ '+why(t)}${ok?` Stars in a row: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=challenge}
A=FK.shell(c,{steps,ratio:.66,tall:1.25,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;pads()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});A.every(()=>part()==='move'&&!A.reduced());pads()}});
A.start()})})();
