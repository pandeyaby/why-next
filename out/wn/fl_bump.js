/* Flagship: what happens when things collide (ages 9–10; NGSS 4-PS3-3 "ask questions and predict outcomes about the
   changes in energy that occur when objects collide", with 4-PS3-1 speed and energy; National Curriculum in England
   Year 5 forces as context). Pull back a marble and hit a still one (energy passes on), roll a ball from 10, 20 and
   30 cm into a paper cup (faster means more energy, so the cup slides farther), find where a crash's energy went
   (motion, sound, heating, a dent), drop a bouncy ball, a tennis ball and a clay ball from 1 m, and test bumpers that
   squash to protect an egg. Model numbers are illustrative and stated as such. Every canvas tap has a button twin. */
(()=>{
const INK='#0f172a',MUTE='#475569',LINE='#1e3a8a',WHITE='#ffffff',GOOD='#047857',BAD='#b91c1c',SKY='#eef2ff',PASS='#dcfce7';
const RED='#b91c1c',BLUE='#1d4ed8',WOOD='#92400e',FLOOR='#cbd5e1',WARM='#c2410c',CLAY='#7c3aed',SOFT='#e2e8f0';
const HEIGHTS=[10,20,30],SLIDE={10:6,20:12,30:18};
const BALLS=[{name:'bouncy ball',col:BLUE,up:80},{name:'tennis ball',col:'#4d7c0f',up:55},{name:'clay ball',col:CLAY,up:0}];
const BUMPERS=[{name:'No bumper',squash:.2,push:25,egg:'cracked'},{name:'Card crumple zone',squash:2,push:2.5,egg:'wobbled but stayed safe'},{name:'Sponge',squash:5,push:1,egg:'stayed safe'}];
const CLUES=[{id:'block',name:'Block slid along',clue:true,why:'The block is moving now. Some of the car\u2019s energy went into the block\u2019s motion.'},
 {id:'bang',name:'Bang sound',clue:true,why:'The bang is energy carried away as sound.'},
 {id:'dent',name:'Dented bumper',clue:true,why:'Some energy went into bending the bumper out of shape.'},
 {id:'heat',name:'Warm bumper',clue:true,why:'The bumper and block got a tiny bit warmer: energy went into heating.'},
 {id:'paint',name:'Red paint',clue:false,why:'The car was red before the crash. The colour is not a change.'},
 {id:'lamp',name:'Ceiling lamp',clue:false,why:'The lamp was on before the crash and stays on. It is not energy from the crash.'}];
VIS.reg('flagbump',c=>{let A,X,pad,box,qi=-1,run=0;const S={after:()=>{}};
const u=v=>Math.round(v*(A.narrow?1:1.1)),type=v=>`700 ${u(v)}px system-ui,sans-serif`;
const within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function word(s,x,y,v,col,al){X.font=type(v);X.fillStyle=col||INK;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y,A.W-16)}
function wrap(s,w,v){X.font=type(v);const out=[];let cur='';for(const t of String(s).split(' ')){const n=cur?cur+' '+t:t;if(cur&&X.measureText(n).width>w){out.push(cur);cur=t}else cur=n}out.push(cur);return out}
function tile(r,fill,edge,lw){X.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,8);X.fill();if(edge){X.strokeStyle=edge;X.lineWidth=lw||2;X.stroke()}}
function top(s,good){const L=wrap(s,A.W-34,13),lh=u(13)+4,r={x:10,y:8,w:A.W-20,h:Math.max(A.H*.1,L.length*lh+12)};tile(r,good?PASS:SKY,good?GOOD:LINE);L.forEach((l,i)=>word(l,A.W/2,r.y+r.h/2+(i-(L.length-1)/2)*lh,13,good?GOOD:INK));return r.y+r.h}
function bottom(){if(!S.msg)return;const L=wrap((S.bad?'✗ ':'✓ ')+S.msg,A.W-40,13),lh=u(13)+5,h=L.length*lh+10,y=A.H-h-6;tile({x:10,y,w:A.W-20,h},WHITE,S.bad?BAD:GOOD,3);L.forEach((l,i)=>word(l,A.W/2,y+5+lh*(i+.5),13))}
const tell=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const miss=s=>{S.bad=true;S.msg=s;A.sound.miss();refresh()};
const note=s=>{S.bad=false;S.msg=s;A.sound.pop();refresh()};
const scene=()=>['marbles','ramp','clues','drop','bumper'][A.step]||'quiz';
const dot=(x,y,r,col)=>{X.fillStyle=col;X.beginPath();X.arc(x,y,r,0,7);X.fill();X.strokeStyle=INK;X.lineWidth=1.5;X.stroke()};
const arrow=(x,y,len,col)=>{if(len<4)return;X.strokeStyle=col;X.fillStyle=col;X.lineWidth=3;X.beginPath();X.moveTo(x,y);X.lineTo(x+len,y);X.stroke();X.beginPath();X.moveTo(x+len+8,y);X.lineTo(x+len,y-6);X.lineTo(x+len,y+6);X.fill()};
/* step 0: one marble hits a still marble of the same size */
const track=()=>({y:A.H*.5,a0:A.W*.3,b0:A.W*.58,r:u(14)});
function drawMarbles(){const T=track(),fin=S.rolls.length>=2;top(fin?'The rolling marble almost stops. Its energy passes to the still marble, which rolls on at nearly the same speed.':'Pull the blue marble back and let go, or use the buttons. Try a gentle roll and a hard roll.',fin);
 X.fillStyle=FLOOR;X.fillRect(u(16),T.y+T.r,A.W-u(32),6);dot(S.ax,T.y,T.r,BLUE);dot(S.bx,T.y,T.r,RED);word('A',S.ax,T.y,12,WHITE);word('B',S.bx,T.y,12,WHITE);
 if(S.pull>0&&!S.moving){arrow(S.ax+T.r+4,T.y-T.r-14,S.pull*u(70),BLUE);word(S.pull>.5?'hard':'gentle',S.ax,T.y+T.r+u(20),12,BLUE)}
 if(S.va)arrow(S.ax+T.r+4,T.y-T.r-14,S.va*u(70),BLUE);if(S.vb)arrow(S.bx+T.r+4,T.y-T.r-14,S.vb*u(70),RED);
 S.rolls.forEach((r,i)=>word(`${r==='hard'?'Hard':'Gentle'} roll: A almost stopped, B rolled on ${r==='hard'?'fast':'slowly'}.`,A.W/2,T.y+u(56)+i*u(20),12,MUTE));S.aHit={x:S.ax-30,y:T.y-30,w:60,h:60}}
function roll(kind){if(S.moving)return;const T=track(),v=kind==='hard'?1:.45;S.moving=true;S.pull=0;S.ax=T.a0;S.bx=T.b0;S.va=v;S.vb=0;A.sound.tick();refresh();
 const id=run;A.tween(S,{ax:T.b0-2*T.r},A.reduced()?1:350/v,'in',()=>{if(id!==run)return;A.sound.tick();S.va=.04;S.vb=v*.96;
  A.tween(S,{bx:A.W-u(30)-T.r,ax:T.b0-2*T.r+3},A.reduced()?1:450/v,'out',()=>{if(id!==run)return;S.moving=false;S.va=0;S.vb=0;if(!S.rolls.includes(kind))S.rolls.push(kind);
   note(kind==='hard'?'Hard roll: A almost stopped and B shot off fast. More speed, more energy to pass on.':'Gentle roll: A almost stopped and B rolled off slowly. Less speed, less energy.')})})}
/* step 1: ramp heights into a paper cup */
const rampGeo=()=>{const fx=A.W*.42,fy=A.H*(A.narrow?.5:.52),hp=u(A.narrow?2.9:2.4);return {fx,fy,hp,x0:u(24)}};
function drawRamp(){const R=rampGeo(),fin=HEIGHTS.every(h=>S.tested[h]!=null);top(fin?'Higher start, faster ball, more energy. The cup slid 6, 12 and 18 cm: twice the height, twice as far.':'Tap a height on the ramp to let the ball go. Test all three.',fin);
 X.fillStyle=FLOOR;X.fillRect(R.x0,R.fy,A.W-R.x0-u(12),6);X.strokeStyle=WOOD;X.lineWidth=5;X.beginPath();X.moveTo(R.x0,R.fy-30*R.hp);X.lineTo(R.fx,R.fy);X.stroke();
 S.hHit=[];HEIGHTS.forEach(h=>{const t=1-h/30,x=R.x0+(R.fx-R.x0)*t,y=R.fy-h*R.hp;X.fillStyle=S.tested[h]!=null?GOOD:WHITE;X.beginPath();X.arc(x,y,u(10),0,7);X.fill();X.strokeStyle=INK;X.lineWidth=2;X.stroke();word(h+' cm',x+u(14),y-u(10),12,INK,'left');S.hHit.push([h,{x:x-24,y:y-24,w:48,h:48}])});
 const cx=R.fx+u(16)+S.cup*u(7);X.fillStyle=WHITE;X.strokeStyle=INK;X.lineWidth=2;X.beginPath();X.moveTo(cx,R.fy);X.lineTo(cx+u(22),R.fy);X.lineTo(cx+u(18),R.fy-u(30));X.lineTo(cx+u(4),R.fy-u(30));X.closePath();X.fill();X.stroke();
 if(S.ball)dot(S.ball.x,S.ball.y-u(8),u(8),BLUE);
 for(let cm=0;cm<=20;cm+=5){const x=R.fx+u(16)+cm*u(7);X.fillStyle=INK;X.fillRect(x,R.fy+6,2,8);word(cm,x,R.fy+u(22),11,MUTE)}word('cup slide (cm)',R.fx+u(16)+10*u(7),R.fy+u(38),11,MUTE);
 const ty=R.fy+u(60);word('Start height (cm): cup slide (cm)',A.W/2,ty,12,INK);HEIGHTS.forEach((h,i)=>word(`${h}: ${S.tested[h]!=null?S.tested[h]:'?'}`,A.W*(i+1)/4,ty+u(20),12,S.tested[h]!=null?GOOD:MUTE))}
function release(h){if(S.moving)return;const R=rampGeo();S.moving=true;S.cup=0;S.ball={x:R.x0+(R.fx-R.x0)*(1-h/30),y:R.fy-h*R.hp};A.sound.tick();refresh();const id=run;
 A.tween(S.ball,{x:R.fx+u(10),y:R.fy},A.reduced()?1:450+h*12,'in',()=>{if(id!==run)return;A.sound.tick();A.tween(S,{cup:SLIDE[h]},A.reduced()?1:500,'out',()=>{if(id!==run)return;S.moving=false;S.tested[h]=SLIDE[h];S.ball=null;
  note(`From ${h} cm the cup slid ${SLIDE[h]} cm.${h===30?' The highest start gave the fastest ball and the biggest push.':''}`)})})}
/* step 2: where did the crash's energy go? */
function drawClues(){const fin=CLUES.filter(k=>k.clue).every(k=>S.found.includes(k.id)),fy=A.H*(A.narrow?.62:.64);const ty=top(fin?'All four: the block\u2019s motion, sound, a dent and heating. The energy did not vanish; it spread out.':'A toy car hit a block. Tap the four signs that energy went somewhere.',fin);
 X.fillStyle=FLOOR;X.fillRect(u(14),fy,A.W-u(28),6);const cx=A.W*.06,cw=A.W*.34,ch=u(30),ct=fy-ch-u(8),fx=cx+cw,bx=A.W*.74;S.spots={};
 X.fillStyle=RED;X.fillRect(cx,ct,cw,ch);dot(cx+cw*.22,fy-u(8),u(9),INK);dot(cx+cw*.7,fy-u(8),u(9),INK);S.spots.paint={x:cx,y:ct,w:cw*.62,h:ch};
 X.strokeStyle=MUTE;X.lineWidth=3;X.beginPath();X.moveTo(fx,ct);for(let i=1;i<=4;i++)X.lineTo(fx-(i%2?7:0),ct+ch*i/4);X.stroke();S.spots.dent={x:fx-u(14),y:ct-2,w:u(24),h:ch+4};
 X.strokeStyle=WARM;X.lineWidth=2;for(let i=0;i<3;i++){X.beginPath();for(let t=0;t<=1;t+=.1)X.lineTo(fx-u(32)+i*u(8)+Math.sin(t*9)*3,ct-u(4)-t*u(24));X.stroke()}S.spots.heat={x:fx-u(38),y:ct-u(32),w:u(32),h:u(30)};
 X.strokeStyle=LINE;X.lineWidth=2;for(let i=1;i<=3;i++){X.beginPath();X.arc(fx+u(4),ct+u(4),i*u(8),-1.45,-.2);X.stroke()}word('BANG',fx+u(36),ct-u(30),13,LINE);S.spots.bang={x:fx+u(2),y:ct-u(46),w:u(62),h:u(48)};
 X.fillStyle=WOOD;X.fillRect(bx,fy-u(40),u(40),u(40));X.strokeStyle=MUTE;X.lineWidth=2;for(let i=0;i<3;i++){X.beginPath();X.moveTo(bx-u(34),fy-u(10)-i*u(10));X.lineTo(bx-u(10),fy-u(10)-i*u(10));X.stroke()}S.spots.block={x:bx-u(38),y:fy-u(44),w:u(82),h:u(48)};
 const lx=A.W*.86,ly=ty+u(8);X.strokeStyle=INK;X.lineWidth=2;X.beginPath();X.moveTo(lx,ty);X.lineTo(lx,ly);X.stroke();X.fillStyle='#fde68a';X.beginPath();X.arc(lx,ly+u(9),u(9),0,7);X.fill();X.stroke();S.spots.lamp={x:lx-24,y:ly-8,w:48,h:40};
 CLUES.forEach(k=>{if(!S.found.includes(k.id)&&!S.nope.includes(k.id))return;const r=S.spots[k.id];X.strokeStyle=k.clue?GOOD:BAD;X.lineWidth=3;X.setLineDash([5,3]);X.strokeRect(r.x,r.y,r.w,r.h);X.setLineDash([])});
 word(`Found ${S.found.length} of 4`,A.W/2,fy+u(28),13,S.found.length===4?GOOD:INK)}
function pick(id){const k=CLUES.find(q=>q.id===id);A.sound.tick();if(!k.clue){if(!S.nope.includes(id))S.nope.push(id);return miss(k.why)}if(!S.found.includes(id))S.found.push(id);note(k.why)}
/* step 3: drop three balls from 1 m */
function drawDrop(){const fin=S.dropped.length===3,fy=A.H*(A.narrow?.6:.62),ty=top(fin?'The clay ball\u2019s energy went into squashing, warming and a thud. The bouncy ball kept the most for the way back up.':'Tap a ball to drop it from 1 metre. Watch how high it bounces back.',fin)+u(30);
 const hp=(fy-ty)/100;X.fillStyle=FLOOR;X.fillRect(u(14),fy,A.W-u(28),6);for(let cm=0;cm<=100;cm+=25){const y=fy-cm*hp;X.fillStyle=MUTE;X.fillRect(u(14),y,8,2);word(cm,u(36),y,11,MUTE)}
 S.bHit=[];BALLS.forEach((b,i)=>{const x=A.W*(.36+i*.24),y=fy-S.by[i]*hp-u(12);if(S.flat[i]){X.fillStyle=b.col;X.beginPath();X.ellipse(x,fy-u(5),u(18),u(5),0,0,7);X.fill()}else dot(x,y,u(12),b.col);
  word(b.name,x,fy+u(20),11,INK);const got=S.dropped.includes(i);word(got?b.up+' cm':'?',x,fy+u(36),12,got?GOOD:MUTE);S.bHit.push({x:x-30,y:ty-10,w:60,h:fy-ty+20})})}
function drop(i){if(S.moving)return;S.moving=true;S.flat[i]=false;S.by[i]=100;A.sound.tick();refresh();const id=run,b=BALLS[i];
 A.tween(S.by,{[i]:0},A.reduced()?1:600,'in',()=>{if(id!==run)return;A.sound.tick();if(!b.up){S.flat[i]=true;S.moving=false;if(!S.dropped.includes(i))S.dropped.push(i);return note('The clay ball went splat and stayed down: 0 cm. Its energy went into changing shape, a thud and warming.')}
  A.tween(S.by,{[i]:b.up},A.reduced()?1:500,'out',()=>{if(id!==run)return;S.moving=false;if(!S.dropped.includes(i))S.dropped.push(i);note(`The ${b.name} bounced back to ${b.up} cm. The rest of its energy went into sound and warming.`)})})}
/* step 4: bumpers that squash */
function drawBumper(){const fin=S.tried.length===3,fy=A.H*(A.narrow?.5:.52),wx=A.W-u(30);top(fin?'Same speed, same energy. A bumper that squashes makes the stop slower and gentler, so the push on the egg is smaller.':'Pick a bumper and crash the car into the wall at the same speed. Test all three.',fin);
 X.fillStyle=FLOOR;X.fillRect(u(14),fy,A.W-u(28),6);X.fillStyle=MUTE;X.fillRect(wx,fy-u(70),u(14),u(76));
 const B=BUMPERS[S.bump],bw=u(6)+B.squash*u(4)*(1-S.sq),cw=A.W*.3,x=S.cx;X.fillStyle=BLUE;X.fillRect(x,fy-u(34),cw,u(26));dot(x+cw*.2,fy-u(8),u(8),INK);dot(x+cw*.8,fy-u(8),u(8),INK);
 X.fillStyle=S.bump===2?'#facc15':S.bump===1?'#d6a96b':SOFT;X.fillRect(x+cw,fy-u(32),bw,u(22));X.strokeStyle=INK;X.lineWidth=1.5;X.strokeRect(x+cw,fy-u(32),bw,u(22));
 X.fillStyle='#fef3c7';X.beginPath();X.ellipse(x+cw*.5,fy-u(46),u(9),u(12),0,0,7);X.fill();X.stroke();if(S.cracked){X.strokeStyle=BAD;X.lineWidth=2;X.beginPath();X.moveTo(x+cw*.5-6,fy-u(52));X.lineTo(x+cw*.5,fy-u(44));X.lineTo(x+cw*.5+5,fy-u(50));X.stroke()}
 const ty=fy+u(30);word('Push on the egg',A.W/2,ty,12,INK);S.tried.forEach((k,j)=>{const b=BUMPERS[k],y=ty+u(20)*(j+1),w=Math.max(4,(A.W*.4)*b.push/25);X.fillStyle=b.push>10?BAD:GOOD;X.fillRect(A.W*.5,y-6,w,12);word(b.name,A.W*.48,y,11,INK,'right')});
 S.carHit={x:x,y:fy-u(60),w:cw+bw,h:u(60)}}
function crash(k){if(S.moving)return;const wx=A.W-u(30);S.bump=k;S.cracked=false;S.sq=0;S.cx=u(20);S.moving=true;A.sound.tick();refresh();const id=run,b=BUMPERS[k],cw=A.W*.3,full=u(6)+b.squash*u(4);
 A.tween(S,{cx:wx-cw-full},A.reduced()?1:500,'in',()=>{if(id!==run)return;A.sound.tick();A.tween(S,{sq:1,cx:wx-cw-u(6)},A.reduced()?1:120+b.squash*60,'out',()=>{if(id!==run)return;S.moving=false;S.cracked=b.egg==='cracked';if(!S.tried.includes(k))S.tried.push(k);
  (b.egg==='cracked'?miss:note)(`${b.name}: it squashed about ${b.squash} cm and the egg ${b.egg}.${b.egg==='cracked'?' The stop was too sudden.':''}`)})})}
/* pointer */
function down(p){const m=scene();
 if(m==='marbles'&&!S.moving&&within(p,S.aHit)){S.drag={x0:p.x};return true}
 if(m==='ramp'&&S.hHit){const f=S.hHit.find(([,r])=>within(p,r));if(f){release(f[0]);return true}}
 if(m==='clues'&&S.spots){const f=CLUES.find(k=>within(p,S.spots[k.id]));if(f){pick(f.id);return true}}
 if(m==='drop'&&S.bHit){const f=S.bHit.findIndex(r=>within(p,r));if(f>=0){drop(f);return true}}
 if(m==='bumper'&&within(p,S.carHit)){crash((S.bump+1)%3);return true}return false}
function move(p){if(!S.drag)return;const T=track();S.pull=Math.max(0,Math.min(1,(S.drag.x0-p.x)/(A.W*.2)));S.ax=T.a0-S.pull*A.W*.18;A.redraw()}
function up(){if(!S.drag)return;const pl=S.pull;S.drag=null;if(pl<.08){S.pull=0;S.ax=track().a0;return A.redraw()}roll(pl>.5?'hard':'gentle')}
function draw(){X.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);X.fillRect(0,0,A.W,A.H);if(A.col.dark){X.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);X.fill()}
 const m=scene();if(m==='marbles')drawMarbles();if(m==='ramp')drawRamp();if(m==='clues')drawClues();if(m==='drop')drawDrop();if(m==='bumper')drawBumper();
 if(m==='quiz'){top('In a collision, energy moves from one object to another. Some always goes into sound, heating and changing shape.');const T=track();dot(A.W*.35,T.y,T.r,BLUE);dot(A.W*.35+2*T.r,T.y,T.r,RED);arrow(A.W*.35+3*T.r+6,T.y,u(60),RED)}
 bottom();A.fx.draw(X)}
function refresh(){const m=scene();let s='Challenge.';
 if(m==='marbles')s=`Marble A at the start, marble B still in the middle. Rolls tried: ${S.rolls.join(' and ')||'none yet'}.`;
 if(m==='ramp')s=`Ramp with starts at 10, 20 and 30 cm. Results: ${HEIGHTS.map(h=>h+' cm gives '+(S.tested[h]!=null?S.tested[h]+' cm':'not tested')).join(', ')}.`;
 if(m==='clues')s=`Crash scene. Energy signs found: ${S.found.map(id=>CLUES.find(k=>k.id===id).name).join(', ')||'none yet'}.`;
 if(m==='drop')s=`Three balls dropped from 100 cm. ${BALLS.map((b,i)=>b.name+': '+(S.dropped.includes(i)?b.up+' cm':'not dropped')).join(', ')}.`;
 if(m==='bumper')s=`Car with ${BUMPERS[S.bump].name}. Tested: ${S.tried.map(k=>BUMPERS[k].name+', egg '+BUMPERS[k].egg).join('; ')||'none yet'}.`;
 tell((S.msg?S.msg+' ':'')+s);buttons();S.after()}
function buttons(){if(!pad)return;pad.innerHTML='';const m=scene(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t).onclick=f};
 if(m==='marbles'){b('Roll gently',()=>roll('gentle'));b('Roll hard',()=>roll('hard'))}
 if(m==='ramp')HEIGHTS.forEach(h=>b(`From ${h} cm`,()=>release(h),`Let the ball go from ${h} centimetres`));
 if(m==='clues')CLUES.forEach(k=>b(k.name,()=>pick(k.id),'Is this a sign of energy? '+k.name));
 if(m==='drop')BALLS.forEach((x,i)=>b('Drop '+x.name,()=>drop(i)));
 if(m==='bumper')BUMPERS.forEach((x,k)=>b(x.name,()=>crash(k),'Crash with '+x.name));
 A.redraw()}
const check=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const later=(fs,gap)=>{const id=run;fs.forEach((f,j)=>setTimeout(()=>{if(id===run)f()},150+j*(A.reduced()?60:gap)))};
const clean=()=>{run++;const T=A?track():{a0:0,b0:0};Object.assign(S,{after:()=>{},ax:T.a0,bx:T.b0,pull:0,va:0,vb:0,drag:null,rolls:[],moving:false,tested:{},cup:0,ball:null,found:[],nope:[],dropped:[],by:[100,100,100],flat:[false,false,false],bump:0,tried:[],cx:u(20),sq:0,cracked:false,msg:'',bad:false})};
const steps=[
{h:'Pass it on',p:'A moving marble has energy because it is moving. What happens when it hits a marble that is standing still?',
predict:{q:'A rolling marble hits a still marble of the same size, head-on. What happens?',opts:['The first almost stops and the second rolls on','Both stop dead','They stick and roll on together'],ans:0},
task:'Try a gentle roll and a hard roll',show:()=>{steps[0].go();later([()=>roll('gentle'),()=>roll('hard')],2000)},go:()=>{clean();refresh();S.after=check(0,()=>S.rolls.length>=2,'Energy passed from A to B.')}},
{h:'Faster hits harder',p:'A ball that starts higher on a ramp is going faster at the bottom. Faster means more energy to give the cup.',
predict:{q:'Start the ball higher up the ramp. What will the cup do?',opts:['Slide farther','Slide the same distance','Slide less, because the ball rushes past'],ans:0},
task:'Test all three heights',show:()=>{steps[1].go();later(HEIGHTS.map(h=>()=>release(h)),1500)},go:()=>{clean();refresh();S.after=check(1,()=>HEIGHTS.every(h=>S.tested[h]!=null),'More speed, more energy.')}},
{h:'Where did it go?',p:'Energy is never used up. After a crash, look for where it went: things that moved, sounds, heat and dents.',
task:'Find the four energy signs',show:()=>{steps[2].go();later(CLUES.filter(k=>k.clue).map(k=>()=>pick(k.id)),400)},go:()=>{clean();refresh();S.after=check(2,()=>CLUES.filter(k=>k.clue).every(k=>S.found.includes(k.id)),'Motion, sound, shape and heat.')}},
{h:'Bouncy or squashy',p:'Each ball hits the floor with the same speed. What it does next shows where its energy went.',
predict:{q:'The clay ball does not bounce. Where did its energy go?',opts:['Into squashing, warming and a thud','It was destroyed','Clay balls have no energy when they fall'],ans:0},
task:'Drop all three balls',show:()=>{steps[3].go();later([0,1,2].map(i=>()=>drop(i)),1300)},go:()=>{clean();refresh();S.after=check(3,()=>S.dropped.length===3,'Energy changed form, it did not vanish.')}},
{h:'Soft bumpers',p:'A crash must take the car\u2019s energy away. A squashy bumper takes it away more slowly.',
task:'Test all three bumpers',show:()=>{steps[4].go();later([0,1,2].map(k=>()=>crash(k)),1300)},go:()=>{clean();refresh();S.after=check(4,()=>S.tried.length===3,'Slower stop, smaller push.')}},
{h:'Challenge',p:'',go:()=>{clean();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.after()});
const QS=[['A bowling ball rolls faster. What happens to the pins?','They fly farther: a faster ball has more energy',[['Nothing changes: the ball is the same ball','sameBall'],['They move less: a fast ball has no time to push','tooFast']]],
['After a car hits a wall, where has its energy gone?','Into sound, heating and bending metal',[['It is used up and gone','usedUp'],['It is still in the car as speed','stillMoving']]],
['Why does a clay ball not bounce?','Its energy went into changing its shape and warming it',[['Clay is too heavy to have energy','heavy'],['The floor took the energy and destroyed it','destroyed']]],
['A moving marble hits a still marble of the same size. What happens?','The first almost stops; the second rolls on',[['Both roll on together, stuck','stick'],['The first bounces back the way it came','bounceBack']]],
['Why do bike helmets have a squashy foam layer?','The foam squashes, so the stop is slower and the push is smaller',[['Foam makes the helmet lighter, nothing else','lightOnly'],['Foam stops energy existing','destroyed']]],
['Which collision makes the loudest bang?','A fast car hitting a wall',[['A slow car hitting a wall','slowLoud'],['A car parked next to a wall','noMotion']]]];
function why(tag){let m='In a collision energy moves to the other object or spreads out as sound, heating and changes of shape. It is never destroyed.';
 if(tag==='sameBall')m='Speed matters, not just the ball. A faster ball has more energy, so it can give the pins more.';
 if(tag==='tooFast')m='A faster ball does not push less. The 30 cm ramp start sent the cup farthest.';
 if(tag==='usedUp')m='Energy is never used up. It spreads out into sound, heating and bending, which is harder to see.';
 if(tag==='stillMoving')m='The car stopped, so its moving energy is gone from the car. It went into sound, heat and the dented metal.';
 if(tag==='heavy')m='A heavy falling ball has more energy, not none. The clay squashed instead of springing back.';
 if(tag==='destroyed')m='Energy cannot be destroyed. It changes into other kinds, such as heat and sound.';
 if(tag==='stick')m='Hard marbles bounce apart. The first passes almost all its moving energy to the second and nearly stops.';
 if(tag==='bounceBack')m='That happens when a small marble hits a much heavier one. Same-size marbles swap: the first stops, the second goes.';
 if(tag==='lightOnly')m='The foam does more than save weight. It squashes, so the head slows over a longer time and gets a gentler push.';
 if(tag==='slowLoud')m='A slow car has less energy, so less goes into sound.';
 if(tag==='noMotion')m='A parked car is not moving, so it has no moving energy to turn into a bang.';
 return m}
function ask(){qi++;const [qq,ans,bad]=QS[qi%QS.length],all=[[ans,'ok']].concat(bad),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 box.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=box.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>mark(tag,ans)});tell('Challenge: '+qq);A.redraw()}
let wins=0;function mark(tag,ans){box.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=box.querySelector('.fl-fb');
 if(ok){wins++;A.win()}else{wins=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+wins+'.':'✗ '+why(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.62,tall:1.08,draw,onStep:B=>{box.hidden=B.step!==5;pad.hidden=B.step===5;buttons()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Collision lab buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up});clean()}}).start()})})();
