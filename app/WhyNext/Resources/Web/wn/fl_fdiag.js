/* Flagship: drawing force diagrams (ages 7-12; KS3 "forces as pushes or pulls ... using force arrows in diagrams, adding
   forces in one dimension, balanced and unbalanced forces", KS2 Y5 forces measured in newtons). Squared paper, 1 square
   = 10 N: drag an arrow tip to set its size. Balance a book's weight with the table's push, draw a 40 N push to scale,
   find the resultant of a tug of war and of two pushes the same way, then balance a moving bike and watch it keep going.
   Every drag has a button twin. */
(()=>{
VIS.reg('flagfdiag',c=>{let A,ctl,chal,qi=-1,run=0;const S={};
const kind=()=>['book','scale','tug','same','bike','chal'][A.step];
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const fg=()=>A.col.tx,soft=()=>A.col.mu;
function write(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||800} ${Math.round(px*(A.narrow?1:1.1))}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.lineJoin='round';g.lineWidth=4;g.strokeStyle=A.col.pn;g.strokeText(t,x,y,o.max||A.W-8);g.fillStyle=o.c||fg();g.fillText(t,x,y,o.max||A.W-8)}
/* geometry: the object is a 2 x 2 square box on the grid, so arrows from its edges cover whole squares */
function geo(){const u=Math.floor(Math.min(A.W/15,A.H/12));return{u,cx:Math.round(A.W/2),cy:Math.round(A.H*.52)}}
const DIR={u:[0,-1],d:[0,1],l:[-1,0],r:[1,0]};
function base(F){const{u,cx,cy}=geo(),[dx,dy]=DIR[F.d],o=(F.off||0)*u;return{x:cx+dx*u+(dy?o:0),y:cy+dy*u+(dx?o:0)}}
function tip(F){const{u}=geo(),b=base(F),[dx,dy]=DIR[F.d];return{x:b.x+dx*u*F.n/10,y:b.y+dy*u*F.n/10}}
function arrow(x0,y0,x1,y1,col,lw,dash){const g=A.ctx,L=Math.hypot(x1-x0,y1-y0);if(L<1)return;const ux=(x1-x0)/L,uy=(y1-y0)/L,h=Math.min(16,L*.6);
 g.strokeStyle=col;g.fillStyle=col;g.lineWidth=lw;g.lineCap='round';g.setLineDash(dash||[]);g.beginPath();g.moveTo(x0,y0);g.lineTo(x1-ux*h*.8,y1-uy*h*.8);g.stroke();g.setLineDash([]);
 g.beginPath();g.moveTo(x1,y1);g.lineTo(x1-ux*h-uy*h*.55,y1-uy*h+ux*h*.55);g.lineTo(x1-ux*h+uy*h*.55,y1-uy*h-ux*h*.55);g.closePath();g.fill()}
const colOf=k=>A.col[k]||A.col.ac;
function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.35);g.fillRect(0,0,W,H);
 if(kind()==='chal'){write('Arrow length shows the size of a force.',W/2,H*.3,15);write('Opposite ways: take away. Same way: add.',W/2,H*.45,15,{c:soft(),w:700});write('Balanced (resultant 0 N): no change in motion.',W/2,H*.6,15,{c:soft(),w:700});A.fx.draw(g);return}
 const{u,cx,cy}=geo(),sh=S.shift||0;g.lineWidth=1;g.strokeStyle=A.alpha(fg(),.13);
 for(let x=cx%u;x<W;x+=u){g.beginPath();g.moveTo(x,0);g.lineTo(x,H);g.stroke()}for(let y=cy%u;y<H;y+=u){g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke()}
 if(S.bike){g.strokeStyle=A.alpha(fg(),.45);g.lineWidth=3;const y=cy+u+6,p=((S.road||0)%(u*2)+u*2)%(u*2);for(let x=-p;x<W;x+=u*2){g.beginPath();g.moveTo(x,y);g.lineTo(x+u,y);g.stroke()}}
 if(S.floor){g.fillStyle=A.alpha(fg(),.22);g.fillRect(cx-u*3.2,cy+u,u*6.4,6)}
 g.save();g.translate(sh,0);A.paint.rrect(cx-u,cy-u,u*2,u*2,8);g.fillStyle=A.mix(C.pn,C.am,.35);g.fill();g.strokeStyle=fg();g.lineWidth=2.5;g.stroke();
 write(S.obj,cx,cy,A.narrow?12:14,{max:u*2-4});
 S.F.forEach(F=>{const b=base(F),t=tip(F),cl=colOf(F.c);if(F.n>0)arrow(b.x,b.y,t.x,t.y,cl,F.drag?6:5);
  if(F.drag&&S.hot!==false){g.beginPath();g.arc(t.x,t.y,Math.max(9,u*.38),0,7);g.strokeStyle=cl;g.lineWidth=3;g.setLineDash([4,3]);g.stroke();g.setLineDash([])}
  const lab=`${F.name} ${F.n} N`,[dx,dy]=DIR[F.d];
  if(dy)write(lab,t.x,t.y+dy*(F.drag?Math.max(9,u*.38)+12:16),14);else write(lab,b.x+dx*8,b.y+(F.off>0?u*.5:-u*.5),14,{al:dx>0?'left':'right'})});
 g.restore();
 if(S.res){const v=S.res.v,y=cy+u*2.6;write('Resultant force',cx,y-u*.6,13,{c:soft(),w:700});g.fillStyle=fg();g.beginPath();g.arc(cx,y,4,0,7);g.fill();
  if(v)arrow(cx,y,cx+v/10*u,y,fg(),5,[9,6]);write(v?`${Math.abs(v)} N to the ${v>0?'right':'left'}`:'0 N',cx+(v>0?-8:v<0?8:0),y+u*.6,14,{al:v>0?'right':v<0?'left':'center'})}
 write(S.top||'',8,H*.06,14,{w:700,c:soft(),al:'left'});A.fx.draw(g)}
/* the bike step runs a little physics: resultant force changes the speed, balanced forces keep it */
function tick(dt){if(!S.bike)return false;const net=S.F[0].n-S.F[1].n;S.v=Math.max(0,Math.min(10,S.v+net/10*dt*(A.reduced()?6:1.4)));S.road=(S.road||0)+S.v*dt*geo().u*.9;
 const st=S.v<=0?'Stopped':net>0?'Speeding up':net<0?'Slowing down':'Steady speed';if(st!==S.st){S.st=st;S.top=`Speed: ${st}`}return true}
function setN(i,n){const F=S.F[i];n=Math.max(0,Math.min(F.max||60,Math.round(n/10)*10));if(F.n===n)return;F.n=n;A.sound.tick();S.say&&say(S.say());A.redraw();S.check()}
function setRes(v){v=Math.max(-60,Math.min(60,Math.round(v/10)*10));if(S.res.v===v)return;S.res.v=v;A.sound.tick();S.say&&say(S.say());A.redraw();S.check()}
let drag=null;
function down(p){if(kind()==='chal')return false;const i=S.F.findIndex(F=>F.drag);if(S.res&&S.res.drag){drag={r:1};move(p);return true}if(i<0)return false;drag={i};move(p);return true}
function move(p){if(!drag)return;const{u,cx}=geo();if(drag.r){setRes((p.x-cx)/u*10);return}const F=S.F[drag.i],b=base(F),[dx,dy]=DIR[F.d];setN(drag.i,((p.x-b.x)*dx+(p.y-b.y)*dy)/u*10)}
function controls(){if(!ctl)return;ctl.innerHTML='';const k=kind(),btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||null},ctl,t).onclick=f};if(k==='chal')return;
 const i=S.F.findIndex(F=>F.drag);if(i>=0){const F=S.F[i];btn('− 10 N',()=>setN(i,F.n-10),`Make the ${F.name} arrow 10 newtons smaller`);btn('+ 10 N',()=>setN(i,F.n+10),`Make the ${F.name} arrow 10 newtons bigger`)}
 if(S.res&&S.res.drag){btn('◀ 10 N',()=>setRes(S.res.v-10),'Move the resultant arrow 10 newtons to the left');btn('10 N ▶',()=>setRes(S.res.v+10),'Move the resultant arrow 10 newtons to the right')}}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null))A.done(msg+A.reveal(i))};
function reset(o){run++;drag=null;for(const x in S)delete S[x];Object.assign(S,{F:[],obj:'',shift:0,check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*360))}
const ramp=(f,from,to)=>{const a=[];for(let n=from;n!==to;n+=to>from?10:-10)a.push(()=>f(n+(to>from?10:-10)));return a};
const slide=d=>{if(A.reduced()){S.shift=d*geo().u*.5;A.redraw();return}A.tween(S,{shift:d*geo().u*.6},700,'out')};
const steps=[
{h:'Forces are arrows',p:'A force is a push or a pull. We draw it as an arrow. The arrow points the way the force acts, and a longer arrow means a bigger force. On this grid, 1 square is 10 newtons (10 N).',
 predict:{q:'The book sits still on the table. Gravity pulls it down with 20 N. What does the table do?',opts:['Pushes up with 20 N','Nothing: tables cannot push','Pushes up with more than 20 N'],ans:0},
 task:'Drag the tip of the green arrow up until the forces balance',show:()=>auto(0,ramp(n=>setN(1,n),0,20)),
 go:()=>{reset({obj:'Book',floor:1,top:'1 square = 10 N',F:[{d:'d',n:20,name:'Weight',c:'rd'},{d:'u',n:0,name:'Table push',c:'gr',drag:1,max:30}],
  say:()=>{const n=S.F[1].n;return n===20?'Weight 20 N down, table push 20 N up. Equal and opposite: the forces are balanced, so the book stays still.':n<20?`Table push ${n} N up, weight 20 N down. Not balanced: the down force is bigger.`:`Table push ${n} N up is bigger than the 20 N weight. The book would jump up, so this is wrong.`}});
  say('A book on a table. Its weight is 20 N, pulling down. Drag the green arrow up, or use the buttons.');controls();S.check=finish(0,()=>S.F[1].n===20,'The table pushes up 20 N: balanced, so the book stays still.')}},
{h:'Draw it to scale',p:'Always draw force arrows to scale. If 1 square is 10 N, a 30 N force is 3 squares long. Count squares from the edge of the object.',
 predict:{q:'1 square is 10 N. How long is the arrow for a 40 N push?',opts:['4 squares','40 squares','10 squares'],ans:0},
 task:'Make the push arrow show 40 N',show:()=>auto(1,ramp(n=>setN(0,n),10,40)),
 go:()=>{reset({obj:'Box',top:'1 square = 10 N',F:[{d:'r',n:10,name:'Push',c:'ac',drag:1}],say:()=>`The push arrow is ${S.F[0].n/10} ${S.F[0].n===10?'square':'squares'} long: ${S.F[0].n} N.`});
  say('A box. The push arrow is 1 square long, which is 10 N. Drag its tip to the right, or use the buttons.');controls();S.check=finish(1,()=>S.F[0].n===40,'4 squares long = 40 N.')}},
{h:'Tug of war',p:'When two forces pull opposite ways, take the smaller from the bigger. That is the resultant force. It points the same way as the bigger force. If it is not 0 N, the forces are unbalanced.',
 predict:{q:'The left team pulls 30 N. The right team pulls 50 N. What is the resultant force?',opts:['20 N to the right','80 N to the right','50 N to the right'],ans:0},
 task:'Drag the dashed resultant arrow to show the resultant force',show:()=>auto(2,ramp(setRes,0,20)),
 go:()=>{reset({obj:'Rope',top:'Opposite ways: take away',F:[{d:'l',n:30,name:'Left team',c:'vi'},{d:'r',n:50,name:'Right team',c:'or'}],res:{v:0,drag:1},
  say:()=>{const v=S.res.v;return v===20?'Resultant 20 N to the right: 50 take away 30. The forces are unbalanced, so the rope moves right.':v===80?'80 N adds the pulls, but they pull opposite ways, so take away instead.':v<0?'The bigger pull is to the right, so the resultant points right.':`Resultant ${v} N. Work out 50 take away 30.`}});
  say('Tug of war. Left team 30 N, right team 50 N. Drag below the rope to draw the resultant force.');controls();S.check=()=>{if(A.step===2&&S.res.v===20&&A.pred[2]!=null&&!A.isDone){slide(1);finish(2,()=>1,'50 − 30 = 20 N to the right. Unbalanced, so the rope moves right.')()}}}},
{h:'Same way: add',p:'When two forces push the same way, add them. Two people pushing a cart together give a bigger resultant force than either one alone.',
 task:'Drag the resultant arrow to show the two pushes together',show:()=>auto(3,ramp(setRes,0,50)),
 go:()=>{reset({obj:'Cart',top:'Same way: add',F:[{d:'r',n:30,name:'Ann',c:'ac',off:-.45},{d:'r',n:20,name:'Raj',c:'gr',off:.45}],res:{v:0,drag:1},
  say:()=>{const v=S.res.v;return v===50?'Resultant 50 N to the right: 30 + 20. Both push the same way, so the forces add.':v===10?'10 N is a take-away answer. Ann and Raj push the same way, so add.':v===30?'30 N is just Ann. Raj pushes the same way too.':`Resultant ${v} N. Add 30 and 20.`}});
  say('Ann pushes the cart 30 N to the right. Raj pushes 20 N to the right too. Drag below to draw the resultant.');controls();S.check=()=>{if(A.step===3&&S.res.v===50&&!A.isDone){slide(1);A.done('30 + 20 = 50 N to the right.')}}}},
{h:'Balanced but moving',p:'Balanced forces do not mean stopped. A moving bike with balanced forces keeps going at a steady speed. Unbalanced forces make it speed up or slow down.',
 predict:{q:'The bike is moving. Pedal push and air resistance become equal. What happens?',opts:['It keeps going at a steady speed','It stops','It goes faster and faster'],ans:0},
 task:'Drag the air resistance arrow until the forces balance, and watch the speed',show:()=>auto(4,ramp(n=>setN(1,n),10,40)),
 go:()=>{reset({obj:'Bike',bike:1,v:4,road:0,top:'Speed: Speeding up',F:[{d:'r',n:40,name:'Pedal push',c:'ac'},{d:'l',n:10,name:'Air resistance',c:'vi',drag:1,max:60}],
  say:()=>{const n=S.F[1].n;return n===40?'Pedal push 40 N, air resistance 40 N. Balanced: the bike keeps going at a steady speed. It does not stop.':n<40?`Air resistance ${n} N is less than the 40 N push. Unbalanced: the bike speeds up.`:`Air resistance ${n} N is more than the push. Unbalanced: the bike slows down.`}});
  say('A moving bike. Pedal push 40 N forward, air resistance 10 N backward. Drag the purple arrow, or use the buttons.');controls();S.check=finish(4,()=>S.F[1].n===40,'Balanced while moving: steady speed, not stopped.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['A book sits still on a shelf. Its weight is 8 N. How big is the shelf\u2019s push up?',[['8 N','ok'],['0 N','nopush'],['16 N','double']]],
 ['A box is pushed 50 N to the right. Friction is 20 N to the left. What is the resultant force?',[['30 N to the right','ok'],['70 N to the right','added'],['30 N to the left','wrongway']]],
 ['On a grid, 1 square is 10 N. An arrow is 5 squares long. What force does it show?',[['50 N','ok'],['5 N','scale'],['15 N','scale']]],
 ['A car drives at a steady speed. The engine push is 600 N. How big is the air resistance plus friction?',[['600 N','ok'],['0 N','needforce'],['more than 600 N','bigger']]],
 ['Two dogs pull a sledge the same way, 30 N and 40 N. What is the resultant force?',[['70 N','ok'],['10 N','subtract'],['40 N','biggest']]],
 ['The forces on a moving ball are balanced. What does the ball do?',[['Keeps the same speed','ok'],['Stops at once','needforce'],['Speeds up','speeds']]]];
function why(t){let m='Draw both arrows: opposite ways take away, the same way add.';
 if(t==='nopush')m='The shelf does push. The book is still, so the forces balance: 8 N up for 8 N down.';
 if(t==='double')m='16 N up would beat the 8 N weight and lift the book. Still means balanced: 8 N up.';
 if(t==='added')m='Friction pulls the other way, so take it away: 50 − 20 = 30 N, not 70 N.';
 if(t==='wrongway')m='The resultant points the same way as the bigger force. 50 N right beats 20 N left.';
 if(t==='scale')m='Count squares and times by 10: 5 squares × 10 N = 50 N.';
 if(t==='needforce')m='Moving things do not need a resultant force to keep going. Balanced forces keep the speed the same.';
 if(t==='bigger')m='A bigger backward force would slow it down. Steady speed means the forces are balanced.';
 if(t==='speeds')m='Speeding up needs an unbalanced force forward. Balanced means no change: the same speed.';
 if(t==='subtract')m='Take away only when forces act opposite ways. These pull the same way, so add: 30 + 40.';
 if(t==='biggest')m='Both dogs pull, so both count. Same way means add: 30 + 40 = 70 N.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+2)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},box,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.6,tall:1.05,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Force controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.every(dt=>tick(dt));A.gest({down:p=>down(p),move:p=>move(p),up:()=>{drag=null}});controls()}});
A.start()})})();
