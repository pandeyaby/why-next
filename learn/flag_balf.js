/* Flagship: Balanced & Unbalanced Forces (ages 8-9; NGSS 3-PS2-1 "plan and conduct an investigation to provide evidence
   of the effects of balanced and unbalanced forces on the motion of an object"; NC Y3/Y5 forces, measured in newtons).
   Run tug-of-war trials on a box and log each result with a dot trail (equal gaps = steady, growing gaps = speeding up);
   find a balanced pair, make the box go the other way, run a fair test changing only one pull, keep a rolling trolley
   steady by matching friction, then speed up, slow down and turn a sliding puck. Not flagfdiag (drawing arrows to scale
   on squared paper), flagdrop (gravity) or flagfrict (surfaces). */
(()=>{
VIS.reg('flagbalf',c=>{let A,ctl,chal,qn=-1,run=0;const T={};
const DARK='#0f172a',LEFT='#1d4ed8',RIGHT='#b91c1c',FRIC='#a16207',OKC='#047857',TAG='#f8fafc',MAX=10,FR=4;
const mode=()=>['tug','flip','fair','roll','puck','chal'][A.step];
const clip=(v,a,b)=>Math.max(a,Math.min(b,v));
function narrate(t){c.say(t);A.cv.setAttribute('aria-label',t)}
function tag(t,x,y,o){o=o||{};const g=A.ctx;let fs=o.f||(A.narrow?13:16);g.font=`700 ${fs}px system-ui`;while(fs>10&&g.measureText(t).width>(o.w||A.W)-16){fs--;g.font=`700 ${fs}px system-ui`}
 const w=Math.max(o.w||0,g.measureText(t).width+18),h=fs*1.9,L=clip(x-w/2,3,A.W-w-3);g.fillStyle=o.bg||TAG;A.paint.rrect(L,y-h/2,w,h,8);g.fill();g.lineWidth=o.edge?2.5:1.2;g.strokeStyle=o.edge||'#64748b';g.stroke();
 g.fillStyle=DARK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,L+w/2,y+1);return{x:L,y:y-h/2,w,h}}
const unit=()=>A.W*(A.narrow?.032:.028),floorY=()=>A.H*.7,boxW=()=>A.W*(A.narrow?.16:.12);
/* one trial: start speed v0 (px/s), net force (N) -> dot trail every 0.25 s for 2 s; friction never pushes backwards */
function trial(x0,v0,net){const k=A.W*(v0?.012:.022),pts=[];let x=x0,v=v0;for(let i=0;i<=8;i++){pts.push(x);for(let j=0;j<10;j++){v=v+net*k*.025;if(v0>0&&v<0)v=0;x+=v*.025}}return pts}
function verdict(v0,net){if(!v0)return net===0?'stayed still':net>0?'moved right, faster and faster':'moved left, faster and faster';return net===0?'kept the same speed':net>0?'sped up':'slowed down'}
function arrow(x,y,len,dir,col,label){const g=A.ctx;if(len<1)return;const x2=x+dir*len;g.strokeStyle=col;g.fillStyle=col;g.lineWidth=7;g.beginPath();g.moveTo(x,y);g.lineTo(x2-dir*10,y);g.stroke();
 g.beginPath();g.moveTo(x2,y);g.lineTo(x2-dir*16,y-11);g.lineTo(x2-dir*16,y+11);g.closePath();g.fill();if(label)tag(label,x+dir*len/2,y-26,{f:A.narrow?12:14,edge:col})}
function crate(x,lbl){const g=A.ctx,w=boxW(),y=floorY();g.fillStyle='#d6a35c';g.fillRect(x-w/2,y-w*.8,w,w*.8);g.strokeStyle=DARK;g.lineWidth=2;g.strokeRect(x-w/2,y-w*.8,w,w*.8);
 g.beginPath();g.moveTo(x-w/2,y-w*.8);g.lineTo(x+w/2,y);g.moveTo(x+w/2,y-w*.8);g.lineTo(x-w/2,y);g.stroke();if(lbl){g.fillStyle=DARK;g.font=`700 ${A.narrow?11:13}px system-ui`;g.textAlign='center';g.fillText(lbl,x,y+18)}}
function trolley(x){const g=A.ctx,w=boxW(),y=floorY();g.fillStyle='#93c5fd';g.fillRect(x-w/2,y-w*.6,w,w*.45);g.strokeStyle=DARK;g.lineWidth=2;g.strokeRect(x-w/2,y-w*.6,w,w*.45);
 [-.3,.3].forEach(f=>{g.fillStyle=DARK;g.beginPath();g.arc(x+f*w,y-w*.09,w*.09,0,7);g.fill()})}
function ground(){const g=A.ctx,y=floorY();g.strokeStyle=A.col.tx;g.lineWidth=3;g.beginPath();g.moveTo(0,y);g.lineTo(A.W,y);g.stroke()}
function trail(){if(!T.dots)return;const g=A.ctx,y=floorY()+30,shown=T.anim==null?T.dots.length:Math.min(T.dots.length,1+Math.floor(T.anim*8));g.fillStyle=A.col.tx;
 for(let i=0;i<shown;i++){g.beginPath();g.arc(clip(T.dots[i],6,A.W-6),y,4,0,7);g.fill()}if(A.narrow)return;g.font='600 12px system-ui';g.textAlign='left';g.fillText('dot every ¼ s',6,y+18)}
function table(){const rows=T.log.slice(-3),g=A.ctx;if(!rows.length)return;const y0=A.H*.04,h=A.H*.075;rows.forEach((r,i)=>tag(r,A.W/2,y0+h*(i+.5),{w:A.W*.94,f:A.narrow?11:13,bg:i===rows.length-1?'#ecfdf5':TAG}))}
/* where the box is drawn: start, mid-trial (between dots) or the last dot */
function xNow(){const d=T.dots;if(!d)return T.x;if(T.anim==null)return clip(d[8],boxW()/2,A.W-boxW()/2);const u=T.anim*8,i=Math.min(7,Math.floor(u));return clip(d[i]+(d[i+1]-d[i])*(u-i),boxW()/2,A.W-boxW()/2)}
/* ---- tug of war (steps 1-3) ---- */
function drawTug(){const g=A.ctx,x=xNow(),y=floorY()-boxW()*.4,u=unit(),w=boxW();ground();trail();crate(x);
 arrow(x-w/2,y,T.L*u,-1,LEFT,`${T.L} N`);arrow(x+w/2,y,T.R*u,1,RIGHT,`${T.R} N`);table();
 const net=T.R-T.L;tag(net?`Unbalanced: ${Math.abs(net)} N more to the ${net>0?'right':'left'}`:T.L?'Balanced: equal and opposite':'No pulls yet',A.W/2,A.H*.92,{edge:net?RIGHT:OKC})}
function setPull(side,v,quiet){T[side]=clip(Math.round(v),0,MAX);T.dots=null;T.x=A.W/2;if(quiet)return A.redraw();
 if(mode()==='fair'&&side==='L'&&T.L!==5){A.sound.miss();return say(`Left is now ${T.L} N. In a fair test you change one thing only, so keep the left pull at 5 N and change the right.`)}
 A.sound.tick();say(`Left pull ${T.L} N, right pull ${T.R} N. Press Let go to test it.`)}
function letGo(fast){if(T.anim!=null)return;const m=mode(),net=(m==='roll'?T.P-FR:T.R-T.L),v0=m==='roll'?A.W*.18:0,x0=m==='roll'?A.W*.18:A.W/2;
 T.dots=trial(x0,v0,net);T.x=x0;const res=verdict(v0,net);T.last={net,res,L:T.L,R:T.R,P:T.P};
 const row=m==='roll'?`Push ${T.P} N, friction ${FR} N: ${res}`:`Left ${T.L} N, right ${T.R} N: ${res}`;T.log.push(row);
 if(m==='fair'&&T.L===5&&T.R>5&&!T.fair.includes(T.R))T.fair.push(T.R);
 if(m==='roll')T.rolls[res]=1;const v=run;if(fast===true||A.reduced()){T.anim=null;return finish()}T.anim=0;A.sound.whoosh();
 const tickF=dt=>{if(v!==run||T.anim==null)return false;T.anim=Math.min(1,T.anim+dt/1.2);if(T.anim>=1){T.anim=null;finish();return false}return true};T.tick=tickF;A.kick()}
function finish(){const L=T.last,m=mode();let msg;
 if(m==='roll')msg=L.net===0?`Push ${L.P} N matches friction ${FR} N. Balanced, so the trolley kept the same speed: the dots are evenly spaced.`:L.net>0?`Push ${L.P} N is bigger than friction ${FR} N. Unbalanced, so it sped up: the gaps grow.`:`Push ${L.P} N is smaller than friction ${FR} N. Unbalanced, so it slowed down: the gaps shrink.`;
 else if(L.net===0)msg=L.L?`${L.L} N left and ${L.R} N right are balanced. The box stayed still.`:'With no pulls at all, nothing changes. Give both teams a pull.';
 else msg=`${Math.abs(L.net)} N more to the ${L.net>0?'right':'left'}: unbalanced. The box sped up towards the ${L.net>0?'right':'left'} team.`;
 if(m==='fair')msg+=` Fair-test runs with left at 5 N: ${T.fair.length} of 3.`+(T.fair.length>=3?' A bigger gap between the pulls made the box speed up more: look at the dot trails.':'');say(msg)}
/* ---- rolling trolley vs friction ---- */
function drawRoll(){const g=A.ctx,x=xNow(),y=floorY()-boxW()*.35,u=unit(),w=boxW();ground();g.fillStyle=A.alpha(FRIC,.25);g.fillRect(0,floorY(),A.W,10);trail();trolley(x);
 arrow(x,y,T.P*u,1,LEFT,'');tag(`push ${T.P} N`,x+Math.max(T.P*u,40)/2+10,y-28,{f:A.narrow?11:13,edge:LEFT});arrow(x,floorY()-8,FR*u,-1,FRIC,'');tag(`friction ${FR} N`,clip(x-FR*u/2,50,A.W-50),floorY()+46,{f:A.narrow?11:13,edge:FRIC});table();
 tag('The trolley is already rolling right',A.W/2,A.H*.92,{edge:'#475569'})}
function setPush(v,quiet){T.P=clip(Math.round(v),0,MAX);T.dots=null;T.x=A.W*.18;if(quiet)return A.redraw();A.sound.tick();say(`Push ${T.P} N against friction ${FR} N. Press Let go.`)}
/* ---- sliding puck seen from above ---- */
function drawPuck(){const g=A.ctx;g.fillStyle=A.alpha('#bae6fd',.35);g.fillRect(A.W*.03,A.H*.18,A.W*.94,A.H*.6);g.strokeStyle=A.col.tx;g.lineWidth=2;g.strokeRect(A.W*.03,A.H*.18,A.W*.94,A.H*.6);
 g.strokeStyle=A.alpha(A.col.tx,.6);g.setLineDash([4,6]);g.lineWidth=2;g.beginPath();T.path.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.stroke();g.setLineDash([]);
 const [px,py]=T.pk;g.fillStyle='#334155';g.beginPath();g.arc(px,py,A.W*.035,0,7);g.fill();arrow(px+A.W*.04,py,A.W*.07,1,OKC,'');
 ['behind','in front','the side'].forEach((k,i)=>{const z=puckZones()[i];g.strokeStyle=T.done[k]?OKC:LEFT;g.lineWidth=2;g.setLineDash(T.done[k]?[]:[5,4]);g.strokeRect(z.x,z.y,z.w,z.h);g.setLineDash([]);g.fillStyle=A.col.tx;g.font=`600 ${A.narrow?10:12}px system-ui`;g.textAlign='center';g.textBaseline='top';g.fillText(k,z.x+z.w/2,z.y+z.h+3)});
 tag(`Pushes tried: ${Object.keys(T.done).length} of 3`,A.W/2,A.H*.9,{edge:Object.keys(T.done).length>2?OKC:LEFT});tag('Puck sliding right on ice, seen from above',A.W/2,A.H*.08,{w:A.W*.94})}
function puckZones(){const [px,py]=T.pk,s=A.W*.09;return[{x:px-s*2.2,y:py-s/2,w:s,h:s},{x:px+s*1.3,y:py-s/2,w:s,h:s},{x:px-s/2,y:py+s*.6,w:s,h:s*.9}]}
function shove(k){if(T.done[k]&&Object.keys(T.done).length<3)return say(`You tried a push from ${k}. Try another side.`);T.done[k]=1;const [px,py]=T.pk;A.sound.pop();
 const msg={'behind':'A push from behind is in the same direction as the motion. Unbalanced: the puck speeds up.','in front':'A push from in front is against the motion. Unbalanced: the puck slows down.','the side':'A push from the side changes the direction. Unbalanced forces can turn a moving thing too.'}[k];
 T.path=[[A.W*.1,py],[px,py],k==='the side'?[px+A.W*.18,py-A.H*.2]:[px+(k==='behind'?A.W*.3:A.W*.08),py]];say(msg+(Object.keys(T.done).length>2?' Speed up, slow down, turn: each one needed an unbalanced force.':''))}
function draw(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#fef3c7',A.col.dark?.04:.28);g.fillRect(0,0,A.W,A.H);const m=mode();
 if(m==='chal'){tag('Challenge',A.W/2,A.H*.14,{edge:LEFT});tag('Use what your tests showed',A.W/2,A.H*.5,{f:A.narrow?15:19});return}
 if(m==='roll')return drawRoll();if(m==='puck')return drawPuck();drawTug()}
function reset(){run++;for(const k in T)delete T[k];Object.assign(T,{L:0,R:0,P:0,x:A.W/2,dots:null,anim:null,log:[],fair:[],rolls:{},done:{},pk:[A.W*.45,A.H*.48],path:[],grab:null,hook:()=>{}})}
function say(t){narrate(t);A.redraw();pads();T.hook()}
const passIf=(i,test,msg)=>()=>{if(A.step===i&&test()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,intro,test,msg,init){reset();if(init)init();narrate(intro);pads();T.hook=passIf(i,test,msg)}
function auto(i,acts,gap){steps[i].go();const v=run;acts.forEach((f,j)=>setTimeout(()=>{if(v===run)f()},A.reduced()?30*(j+1):(gap||700)*(j+1)))}
function pads(){if(!ctl)return;ctl.innerHTML='';const m=mode(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(['tug','flip','fair'].includes(m)){B('Left pull −',()=>setPull('L',T.L-1),'Left pull one newton less');B('Left pull +',()=>setPull('L',T.L+1),'Left pull one newton more');
  B('Right pull −',()=>setPull('R',T.R-1),'Right pull one newton less');B('Right pull +',()=>setPull('R',T.R+1),'Right pull one newton more');B('Let go ▶',()=>letGo(),'Let go and watch the box')}
 if(m==='roll'){B('Push −',()=>setPush(T.P-1),'Push one newton less');B('Push +',()=>setPush(T.P+1),'Push one newton more');B('Let go ▶',()=>letGo(),'Let the trolley roll')}
 if(m==='puck')[['behind','Push from behind'],['in front','Push from in front'],['the side','Push from the side']].forEach(([k,t])=>B(t,()=>shove(k)))}
/* pointer: drag an arrow tip to set a pull, tap the box to let go, tap a dashed square to push the puck */
function down(p){const m=mode();if(T.anim!=null)return false;
 if(m==='puck'){const i=puckZones().findIndex(z=>p.x>=z.x-8&&p.x<=z.x+z.w+8&&p.y>=z.y-8&&p.y<=z.y+z.h+8);if(i>=0)shove(['behind','in front','the side'][i]);return false}
 const x=T.x,w=boxW(),near=Math.abs(p.y-(floorY()-w*.4))<w;if(!near)return false;if(Math.abs(p.x-x)<w/2&&m!=='roll'){letGo();return false}
 if(m==='roll'){if(p.x>x+w*.3){T.grab='P';return true}if(Math.abs(p.x-x)<w/2)letGo();return false}
 T.grab=p.x<x?'L':'R';return true}
function move(p){if(!T.grab)return;const u=unit(),w=boxW();if(T.grab==='P')setPush((p.x-T.x)/u,true);else if(T.grab==='L')setPull('L',(T.x-w/2-p.x)/u,true);else setPull('R',(p.x-T.x-w/2)/u,true)}
function up(){const k=T.grab;T.grab=null;if(!k)return;if(k==='P')setPush(T.P);else setPull(k,T[k])}
const steps=[
{h:'Tug of war',p:'Two teams pull a box on wheels (friction is tiny here). Drag an arrow tip, or use the buttons, to set each pull in newtons (N). Then let go.',
 predict:{q:'Both teams pull with 6 N. What does the box do?',opts:['stays still','moves to the team that looks stronger','moves a bit, then stops'],ans:0},task:'Find a balanced pair: the box stays still',
 show:()=>auto(0,[()=>setPull('L',6),()=>setPull('R',6),letGo]),
 go:()=>begin(0,'A box on the floor with a rope to each side. Both pulls are 0 N.',()=>T.last&&T.last.net===0&&T.last.L>0,'Equal pulls in opposite directions are balanced: no change in motion.')},
{h:'Unbalanced',p:'Now make the pulls different. Which way does the box go?',
 predict:{q:'Left pulls 8 N, right pulls 3 N. Which way does the box go?',opts:['left, towards the 8 N team','right, towards the 3 N team','nowhere, both teams pull'],ans:0},task:'Make the box move left',
 show:()=>auto(1,[()=>setPull('L',8),()=>setPull('R',3),letGo]),
 go:()=>begin(1,'The box again, both pulls at 0 N.',()=>T.last&&T.last.net<0,'The bigger pull wins by the difference. Unbalanced forces start the box moving.')},
{h:'Fair test',p:'Investigate: does a bigger difference make the box speed up more? Keep the left pull at 5 N. Change only the right pull.',
 predict:{q:'Left stays 5 N. Right goes 6, then 8, then 10 N. What happens?',opts:['the box speeds up more each time','the same every time','the box slows down'],ans:0},task:'Run 3 tests: left 5 N, right bigger than 5',
 show:()=>auto(2,[6,8,10].map(v=>()=>{setPull('R',v);letGo(true)}),600),
 go:()=>begin(2,'The box with the left pull set to 5 N.',()=>T.fair.length>=3,'One thing changed, so the results are fair evidence: more unbalance, more speeding up.',()=>{T.L=5})},
{h:'Already moving',p:'This trolley is already rolling right. Friction pulls back on it with 4 N. Set the push, then let go and read the dots.',
 predict:{q:'The push is 4 N and friction is 4 N. What does the rolling trolley do?',opts:['keeps the same speed','slows down and stops','speeds up'],ans:0},task:'Find the push that keeps the speed steady',
 show:()=>auto(3,[()=>{setPush(1);letGo(true)},()=>setPush(4),letGo],700),
 go:()=>begin(3,'A trolley rolling right. Friction 4 N pulls back. Push 0 N.',()=>T.rolls['kept the same speed'],'Balanced forces do not mean stopped. A moving thing with balanced forces keeps the same speed.')},
{h:'Speed up, slow down, turn',p:'A puck slides on ice. Tap a dashed square to push it from behind, from in front or from the side.',task:'Try all three pushes',
 show:()=>auto(4,[()=>shove('behind'),()=>shove('in front'),()=>shove('the side')]),
 go:()=>begin(4,'A puck sliding right on ice, seen from above, with three dashed push squares.',()=>Object.keys(T.done).length>2,'Unbalanced forces change motion: faster, slower or a new direction.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>T.hook()});
const QS=[
 {q:'A book sits still on a table. Its weight pulls down 5 N. How hard does the table push up?',ans:'5 N',bad:[['0 N, it is not moving','none'],['10 N, to hold it up','more']]},
 {q:'Team A pulls 9 N left. Team B pulls 6 N right. What happens to the rope?',ans:'It moves left',bad:[['It stays still','still'],['It moves right','small']]},
 {q:'A sledge slides at a steady speed. The forces on it are…',ans:'balanced',bad:[['unbalanced, it is moving','move'],['zero, nothing pushes','none']]},
 {q:'Mia tests pulls of 2, 4 and 6 N, but uses a heavier box each time. Why is it not fair?',ans:'She changed two things',bad:[['She needed 4 tests','count'],['Nothing is wrong','fair']]},
 {q:'A ball rolls towards you. You push against it. What happens?',ans:'It slows down',bad:[['It speeds up','dir'],['It keeps the same speed','still']]},
 {q:'A trolley rolls with a 6 N push and 4 N friction. What happens?',ans:'It speeds up',bad:[['It keeps the same speed','move'],['It slows down','small']]}];
function slip(t){let m='Compare the two forces: equal and opposite means balanced.';
 if(t==='none')m='Still does not mean no forces. Weight pulls down, so something must push back just as hard.';
 if(t==='more')m='If the table pushed 10 N up, the book would jump up. Balanced means equal: 5 N.';
 if(t==='still')m='The pulls are not equal, so the forces are unbalanced and the motion changes.';
 if(t==='small')m='The bigger force wins. Look at which side has more newtons.';
 if(t==='move')m='Moving at a steady speed means no change in motion, so the forces are balanced.';
 if(t==='count')m='More tests help, but the real problem is that two things changed at once.';
 if(t==='fair')m='A fair test changes one thing only. The heavier box is a second change.';
 if(t==='dir')m='A push against the motion slows it. A push in the same direction speeds it up.';
 return m}
function ask(){qn++;const Q=QS[qn%QS.length],opts=[[Q.ans,'ok'],...Q.bad],r=qn%3,ord=opts.slice(r).concat(opts.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Answer: '+v},row,v).onclick=()=>mark(t,Q.ans)});narrate('Challenge: '+Q.q);A.redraw()}
function mark(t,ans){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();narrate(ok?'Yes: '+ans+'.':slip(t));
 fb.innerHTML=(ok?`✓ Yes: ${ans}.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:Q=>{chal.hidden=Q.step!==5;ctl.hidden=Q.step===5;pads()},
 init:Q=>{A=Q;const w=c.el('div',{class:'fl-below'},Q.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Force controls'},w);chal=c.el('div',{class:'fl-chal'},Q.below);reset();
  A.every(dt=>T.tick?T.tick(dt):false);A.gest({down,move,up});pads()}}).start()})})();
