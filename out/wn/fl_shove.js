/* Flagship – pushes and pulls in play (ages 3–4): sort everyday actions into a push (away from you) or a pull (towards
   you); give a toy car a gentle, middle or strong push to park it in a spot; push a ball from the side opposite the goal;
   open and shut a drawer and a door with the right push or pull; then push a swing up to a star. */
(()=>{
const ACTS=[['⚽','kick a ball',0],['🗄️','open a drawer',1],['🛒','pull a wagon',1],['👶','push a buggy',0],['🪢','tug a rope',1],['🛝','push a swing',0]];
const POW=[['gentle',1.4],['middle',2.8],['strong',4.2]],SPOTS=[1,0,2];
const GOALS=['right','left','right'];
const JOBS=[['Open the drawer','drawer',1],['Shut the drawer','drawer',0],['Open the door. Its sign says PUSH.','door',0],['Shut the door again','door',1]];
VIS.reg('flagshove',c=>{let A,box,ask,qn=-1,seq=0,tw=0,wins=0;c.fig.classList.add('young');
const B0=()=>({want:()=>{},i:0,ok:0,car:0,roll:0,ball:0,hand:'',job:0,out:0,open:0,amp:0,pushes:0,t:0,drag:null,red:0,note:''}),S=B0();
const part=()=>['sort','car','ball','home','swing','quiz'][A.step];
const z=n=>Math.round(n*(A.narrow?1:1.15)),Q=()=>A.reduced(),U=()=>(A.W-90)/5.2,floor=()=>A.H*.72;
const tell=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
function word(g,t,x,y,n,al){g.font=`800 ${z(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=A.col.tx;g.fillText(t,x,y,A.W-14)}
function slab(g,x,y,w,h,col,r){g.fillStyle=A.alpha(col,.5);A.paint.rrect(x,y,w,h,r||6);g.fill();g.strokeStyle=A.col.tx;g.lineWidth=2.5;A.paint.rrect(x,y,w,h,r||6);g.stroke()}
function hand(g,x,y,dir){g.save();g.translate(x,y);g.scale(dir,1);g.font=`${z(30)}px system-ui`;g.textAlign='center';g.textBaseline='middle';g.fillText('🫲',0,0);g.restore()}
const trays=()=>{const w=A.W*.42,h=A.H*.26;return[{x:8,y:A.H-h-8,w,h},{x:A.W-w-8,y:A.H-h-8,w,h}]};
const hit=(p,r)=>p&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function draw(A){const{ctx:g,W,H,col:C}=A,v=part(),u=U(),fy=floor();g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.05:.4);g.fillRect(0,0,W,H);
 if(v==='quiz'){word(g,'Push: away from you.',W/2,H*.35,18);word(g,'Pull: towards you.',W/2,H*.5,18);word(g,'Bigger push, further it goes.',W/2,H*.65,16);return}
 if(v==='sort'){const tr=trays();[['➡️ Push','away from me'],['⬅️ Pull','towards me']].forEach(([n,n2],i)=>{g.fillStyle=A.alpha(i?C.vi:C.cy,.16);A.paint.rrect(tr[i].x,tr[i].y,tr[i].w,tr[i].h,12);g.fill();g.setLineDash([6,5]);g.strokeStyle=C.tx;g.lineWidth=2;A.paint.rrect(tr[i].x,tr[i].y,tr[i].w,tr[i].h,12);g.stroke();g.setLineDash([]);word(g,n,tr[i].x+tr[i].w/2,tr[i].y+tr[i].h/2-z(9),15);word(g,n2,tr[i].x+tr[i].w/2,tr[i].y+tr[i].h/2+z(11),12)});
  if(S.i<ACTS.length){const[e,n]=ACTS[S.i],d=S.drag&&S.drag.x!=null?S.drag:{x:W/2,y:H*.34};slab(g,d.x-W*.22,d.y-H*.13,W*.44,H*.26,S.red?C.rd:C.or,14);g.font=`${z(34)}px system-ui`;g.textAlign='center';g.fillText(e,d.x,d.y-z(10));word(g,n,d.x,d.y+H*.07,14)}
  word(g,`Sorted ${S.i} of ${ACTS.length}`,W/2,z(12),12)}
 if(v==='car'||v==='ball'||v==='swing'){g.strokeStyle=C.tx;g.lineWidth=2.5;g.beginPath();g.moveTo(6,fy);g.lineTo(W-6,fy);g.stroke()}
 if(v==='car'){const x0=62;for(let k=0;k<3;k++){const sx=x0+POW[k][1]*u,on=SPOTS[Math.min(S.ok,2)]===k&&S.ok<3;g.fillStyle=A.alpha(on?C.gr:C.mu,on?.35:.15);g.fillRect(sx-u*.5,fy-6,u,10);if(on)word(g,'🅿️ park here',sx,fy+z(18),12)}
  const cx=x0+S.car*u;slab(g,cx-u*.6,fy-u*.62,u*1.2,u*.45,S.red?C.rd:C.pk,10);[-.33,.33].forEach(d=>{g.beginPath();g.arc(cx+d*u,fy-u*.15,u*.15,0,7);g.fillStyle=C.tx;g.fill()});
  if(!S.roll){const pull=S.drag?Math.max(0,Math.min(1.6,(S.drag.x0-S.drag.x)/u)):0;hand(g,cx-u*.9-pull*u*.6,fy-u*.4,1);if(S.drag)word(g,POW[lev(pull)][0]+' push',cx,fy-u*.9,13)}
  word(g,`Parked ${Math.min(S.ok,3)} of 3`,12,z(12),12,'left')}
 if(v==='ball'){const side=GOALS[Math.min(S.ok,2)],gx=side==='right'?W-30:30,bx=W/2+S.ball*u;g.strokeStyle=C.gr;g.lineWidth=5;g.beginPath();g.moveTo(gx,fy);g.lineTo(gx,fy-u*1.4);g.stroke();
  if(S.ok<3)word(g,'🥅 goal',gx+(side==='right'?-u*.6:u*.6),fy-u*1.6,12);A.paint.ball(bx,fy-u*.32,u*.3,S.red?C.rd:C.cy);if(S.hand)hand(g,S.hand==='L'?bx-u*.75:bx+u*.75,fy-u*.32,S.hand==='L'?1:-1);
  word(g,`Goals ${Math.min(S.ok,3)} of 3`,12,z(12),12,'left')}
 if(v==='home'){const j=JOBS[Math.min(S.job,3)];word(g,S.job<4?j[0]:'All done!',W/2,z(14),14);
  const dx=W*.08,dw=W*.36,dy=H*.3;slab(g,dx,dy,dw,H*.45,C.or,4);slab(g,dx+dw*.08-S.out*dw*.12,dy+H*.06,dw*.84+S.out*dw*.24,H*.13+S.out*H*.04,S.job<2&&S.red?C.rd:C.am,4);g.beginPath();g.arc(dx+dw/2,dy+H*.125+S.out*H*.02,5,0,7);g.fillStyle=C.tx;g.fill();word(g,S.out?'drawer: open':'drawer: shut',dx+dw/2,dy+H*.5,11);
  const rx=W*.56,rw=W*.34,ry=H*.18,rh=H*.62;slab(g,rx,ry,rw,rh,C.ln,2);const ow=rw*(1-S.open*.65);slab(g,rx,ry,ow,rh,S.job>=2&&S.red?C.rd:C.cy,2);
  if(S.open<.5){slab(g,rx+ow*.2,ry+rh*.25,ow*.6,rh*.12,C.pn,3);word(g,'PUSH',rx+ow/2,ry+rh*.31,12)}word(g,S.open>.5?'door: open':'door: shut',rx+rw/2,ry+rh+z(10),11);
  word(g,`Jobs ${Math.min(S.job,4)} of 4`,12,H-z(10),12,'left')}
 if(v==='swing'){const px=W/2,py=z(30),L=Math.min(fy-py-z(26),(W/2-z(22))/Math.sin(50*Math.PI/180)),a=S.amp*Math.sin(S.t)*Math.PI/180,sx=px+Math.sin(a)*L,sy=py+Math.cos(a)*L;
  g.strokeStyle=C.tx;g.lineWidth=3;g.beginPath();g.moveTo(px-W*.3,py);g.lineTo(px+W*.3,py);g.stroke();g.lineWidth=2;g.beginPath();g.moveTo(px,py);g.lineTo(sx,sy);g.stroke();slab(g,sx-u*.4,sy-6,u*.8,12,C.vi,4);
  g.font=`${z(26)}px system-ui`;g.textAlign='center';g.fillText('🧒',sx,sy-z(16));const sa=50*Math.PI/180;g.fillText('⭐',px+Math.sin(sa)*L,py+Math.cos(sa)*L-z(14));
  word(g,`Swing: ${Math.round(S.amp)}°  Pushes: ${S.pushes} of 2  Stars: ${Math.min(S.ok,2)} of 2`,W/2,H-z(10),11)}
 A.fx.draw(g)}
const lev=p=>p<.6?0:p<1.15?1:2;
const no=t=>{A.sound.miss();S.red=1;tell(t);setTimeout(()=>{S.red=0;A.redraw()},Q()?10:650);keys();A.redraw()};
const yay=t=>{A.sound.pop();S.red=0;tell(t);keys();A.redraw();S.want()};
const sortWhy=[' kicks the ball away from you: a push.',': you pull it out towards you.',': you pull the handle towards you.',': you push it away in front of you.',': you pull the rope towards you.',': your hands push it away.'];
function sortAct(bin){if(part()!=='sort'||S.i>=ACTS.length)return;S.drag=null;const[,n,isPull]=ACTS[S.i],line=n[0].toUpperCase()+n.slice(1)+sortWhy[S.i];
 if(bin!==isPull)return no(`Not quite. ${line} Does it go away from you, or come towards you?`);S.i++;if(S.i<ACTS.length){A.sound.tick();tell(line);keys();return A.redraw()}yay(line+' All sorted!')}
function shove(k){if(part()!=='car'||S.ok>=3||S.roll)return;S.drag=null;const go=POW[k][1],want=SPOTS[S.ok],run=++tw;S.roll=1;keys();
 A.tween(S,{car:go},Q()?1:300+go*150,'out',()=>{if(run!==tw)return;S.roll=0;
  if(k!==want){const t=k>want?`A ${POW[k][0]} push went too far! Try a gentler push.`:`A ${POW[k][0]} push did not go far enough. Push harder.`;S.car=0;return no(t)}
  S.ok++;const t=`A ${POW[k][0]} push parked it. A bigger push makes the car go further.`;S.car=0;if(S.ok<3){A.sound.pop();tell(t);keys();A.redraw();S.want()}else yay(t+' Three parked!')})}
function kick(from){if(part()!=='ball'||S.ok>=3)return;const side=GOALS[S.ok],goes=from==='L'?'right':'left',run=++tw;S.hand=from;S.ball=0;
 A.tween(S,{ball:(goes==='right'?1:-1)*2.2},Q()?1:600,'out',()=>{if(run!==tw)return;S.hand='';
  if(goes!==side){S.ball=0;return no(`Pushed from the ${from==='L'?'left':'right'}, the ball goes ${goes}: away from the push. The goal is on the ${side}. Push from the other side.`)}
  S.ok++;S.ball=0;const t=`Goal! A push from the ${from==='L'?'left':'right'} sends the ball ${goes}, away from your hand.`;if(S.ok<3){A.sound.pop();tell(t);keys();A.redraw();S.want()}else yay(t+' Three goals!')})}
function doJob(pull){if(part()!=='home'||S.job>=4)return;const[,what,need]=JOBS[S.job];
 if(pull!==need){const t=what==='drawer'?(need?'A push shoves the drawer in, but it is shut already. Pull the handle towards you to open it.':'Pulling brings it out more. Push it away from you to shut it.'):(need?'Pushing sends the door away. To shut it, pull it back towards you.':'The sign says PUSH. Pulling does not open this door. Push it away from you.');return no(t)}
 if(what==='drawer')A.tween(S,{out:need?1:0},Q()?1:400);else A.tween(S,{open:need?0:1},Q()?1:400);S.job++;
 const t=`${need?'Pull':'Push'}! ${what==='drawer'?(need?'The drawer comes out towards you.':'The drawer slides in, away from you.'):(need?'The door comes back towards you and shuts.':'The door swings open, away from you.')}`;
 if(S.job<4){A.sound.pop();tell(t);keys();A.redraw();S.want()}else yay(t+' All four jobs done.')}
function swingIt(strong){if(part()!=='swing'||S.ok>=2)return;if(S.pushes>=2){S.amp=0;S.pushes=0}S.pushes++;S.amp=Math.min(70,S.amp+(strong?26:12));A.sound.tick();A.redraw();
 if(S.amp>=50){S.ok++;S.pushes=0;const t='Up to the star! Strong pushes make the swing go higher.';S.amp=S.ok<2?0:S.amp;if(S.ok<2){A.sound.pop();tell(t+' Now do it again.');keys();A.redraw();S.want()}else yay(t);return}
 if(S.pushes>=2)return no(`Only ${Math.round(S.amp)}°. Not up to the star. Gentle pushes only go a little way. Try strong pushes.`);tell(`${strong?'Whoosh! A big swing.':'A small swing.'} ${Math.round(S.amp)}°.`);keys()}
function keys(){if(!box)return;box.innerHTML='';const v=part(),K=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},box,t);b.onclick=fn};
 if(v==='sort'&&S.i<ACTS.length){K('➡️ Push',()=>sortAct(0),'It is a push');K('⬅️ Pull',()=>sortAct(1),'It is a pull')}
 if(v==='car'&&S.ok<3&&!S.roll)POW.forEach(([n],k)=>K(n+' push',()=>shove(k),`Give the car a ${n} push`));
 if(v==='ball'&&S.ok<3){K('Push from the left 🫲',()=>kick('L'),'Push the ball from the left side');K('🫱 Push from the right',()=>kick('R'),'Push the ball from the right side')}
 if(v==='home'&&S.job<4){K('Push',()=>doJob(0),'Push it away from you');K('Pull',()=>doJob(1),'Pull it towards you')}
 if(v==='swing'&&S.ok<2){K('gentle push',()=>swingIt(0),'Give the swing a gentle push');K('strong push',()=>swingIt(1),'Give the swing a strong push')}A.redraw()}
function down(p){const v=part(),u=U();
 if(v==='sort'&&S.i<ACTS.length&&Math.abs(p.x-A.W/2)<A.W*.22&&Math.abs(p.y-A.H*.34)<A.H*.13){S.drag={x:null,y:null,x0:p.x,y0:p.y};return true}
 if(v==='car'&&S.ok<3&&!S.roll&&p.y>floor()-u*1.4&&p.y<floor()+u*.4&&p.x<62+S.car*u+u){S.drag={x0:p.x,x:p.x};return true}
 if(v==='ball'&&S.ok<3&&p.y>floor()-u*1.2){kick(p.x<A.W/2?'L':'R');return false}
 if(v==='home'&&S.job<4){const what=JOBS[S.job][1];if((what==='drawer')===(p.x<A.W/2))tell('Use Push or Pull.');else tell(`That is the ${what==='drawer'?'door':'drawer'}. This job is the ${what}.`)}
 if(v==='swing'&&S.ok<2&&p.y>A.H*.3){swingIt(p.x>A.W/2?1:0);return false}return false}
function move(p){if(!S.drag)return;S.drag.x=p.x;S.drag.y=p.y;A.redraw()}
function up(p){const d=S.drag,v=part();if(!d)return;S.drag=null;
 if(v==='car'){const pull=(d.x0-p.x)/U();if(pull<.15){tell('Drag the hand back, then let go.');return A.redraw()}return shove(lev(Math.min(1.6,pull)))}
 if(Math.hypot(p.x-d.x0,p.y-d.y0)<8){tell('Drag the card to a box, or use the buttons.');return A.redraw()}const b=trays().findIndex(r=>hit(p,r));if(b<0){tell('Drop it in a box.');return A.redraw()}sortAct(b)}
const end=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function auto(fs,gap){const k=++seq;fs.forEach((fn,j)=>setTimeout(()=>{if(k===seq||fn.keep)fn()},Q()?j*60+30:(j+1)*(gap||420)))}
const fresh=()=>{seq++;tw++;Object.assign(S,B0())};
const steps=[
{h:'Push or pull?',p:'A push moves a thing away from you. A pull brings it towards you. Drag each card to a box, or use the buttons.',
 predict:{q:'You open a drawer. Is that a push or a pull?',opts:['A push','A pull'],ans:1},task:'Sort all 6 cards',
 show:()=>{steps[0].go();auto(ACTS.map(a=>()=>sortAct(a[2])))},go:()=>{fresh();tell('Is it a push or a pull?');keys();S.want=end(0,()=>S.i>=ACTS.length,'Push is away from you. Pull is towards you.')}},
{h:'Gentle or strong?',p:'Drag the hand back and let go, or pick a push. Park the car in the green spot.',
 predict:{q:'Which push makes the car go further?',opts:['A gentle push','A strong push'],ans:1},task:'Park the car 3 times',
 show:()=>{steps[1].go();const k=seq;SPOTS.forEach((s,j)=>setTimeout(()=>{if(k===seq)shove(s)},Q()?j*80+30:j*1100+150))},go:()=>{fresh();tell('Push the car to the green spot.');keys();S.want=end(1,()=>S.ok>=3,'A bigger push makes it go further. A gentle push goes a little way.')}},
{h:'Which way will it go?',p:'Tap a side of the ball to push it from there. Get it in the goal.',
 predict:{q:'You push the ball from the left. Which way does it go?',opts:['Left, to your hand','Right, away from your hand'],ans:1},task:'Score 3 goals',
 show:()=>{steps[2].go();const k=seq;GOALS.forEach((s,j)=>setTimeout(()=>{if(k===seq)kick(s==='right'?'L':'R')},Q()?j*80+30:j*900+300))},go:()=>{fresh();tell('Where is the goal?');keys();S.want=end(2,()=>S.ok>=3,'A push sends a thing away from the push.')}},
{h:'Open and shut',p:'Do each job with a push or a pull.',task:'Do all 4 jobs',
 show:()=>{steps[3].go();auto(JOBS.map(j=>()=>doJob(j[2])))},go:()=>{fresh();tell('Open the drawer. Push or pull?');keys();S.want=end(3,()=>S.job>=4,'Open a drawer with a pull, shut it with a push. A PUSH door opens away from you.')}},
{h:'Swing up high',p:'You get 2 pushes. Tap the swing or a button. Can you get it up to the star?',task:'Reach the star 2 times',
 show:()=>{steps[4].go();auto([()=>swingIt(1),()=>swingIt(1),()=>swingIt(1),()=>swingIt(1)])},go:()=>{fresh();tell('Push the swing.');keys();S.want=end(4,()=>S.ok>=2,'Strong pushes make the swing go higher than gentle ones.')}},
{h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['You want the car to go a long way. Which push?',[['A strong push','ok'],['A gentle push','soft'],['No push','none']]],
 ['You open a drawer. What do you do?',[['Pull it towards me','ok'],['Push it away from me','pushdraw'],['Wait for it to move','none']]],
 ['You push a ball from the right side. Which way does it roll?',[['Left, away from my hand','ok'],['Right, to my hand','toward'],['It stays still','none']]],
 ['You tug a rope towards you. What is that?',[['A pull','ok'],['A push','pushrope'],['Not a push or a pull','neither']]],
 ['The swing only goes a little way. What will make it go higher?',[['A stronger push','ok'],['A gentler push','soft'],['Stop pushing','none']]]];
function why(t){let m='Think: does it go away from you, or come towards you?';
 if(t==='soft')m='A gentle push only moves it a little. A bigger push makes it go further and higher.';
 if(t==='none')m='Things need a push or a pull to start moving.';
 if(t==='pushdraw')m='Pushing shoves the drawer in. You pull the handle towards you to open it.';
 if(t==='toward')m='A push sends a thing away from your hand, not back to it.';
 if(t==='pushrope')m='The rope comes towards you, so it is a pull.';
 if(t==='neither')m='Tugging moves the rope towards you: that is a pull.';
 return m}
function quiz(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;
 ask.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=ask.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>score(t)});tell('Challenge: '+q);A.redraw()}
function score(t){ask.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=ask.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){wins++;A.win()}else{wins=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! Super pusher.':'✗ '+why(t)}${ok?` Streak: ${wins}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{ask.hidden=A.step!==5;box.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);box=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);ask=E('div',{class:'fl-chal'},A.below);fresh();A.every(dt=>{if(part()!=='swing'||!S.amp)return false;S.t+=dt*(Q()?0:3);if(S.ok<2&&S.pushes===0&&S.amp)S.amp=Math.max(0,S.amp-dt*4);return !Q()});A.gest({down,move,up});keys()}});
A.start()})})();
