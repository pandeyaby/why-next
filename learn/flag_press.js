/* Flagship – gas pressure from particle collisions (ages 12–14). Find every wall the particles push on, pump in more gas,
   heat it, squash it with a piston while a pressure gauge responds, then explain real tyres, cans and syringes. */
(()=>{
const WALLS=['Top wall','Bottom wall','Left wall','Right wall (piston)'];
const CAUSE=['More particles','Hotter gas','Less space'];
const CASES=[['Pumping up a flat bike tyre',0,'Each push of the pump adds more air particles, so more hits on the inside of the tyre.'],
 ['A deodorant can left in hot sun',1,'Hot particles move faster and hit the can harder and more often. That is why cans say do not heat.'],
 ['Pushing a syringe in with the end blocked',2,'The same particles have less space, so they reach the walls more often.'],
 ['A car tyre after a long, fast drive',1,'The tyre warms up, so the air particles inside move faster and the pressure rises.']];
VIS.reg('flagpress',c=>{let A,pad,quiz,qn=-1,gen=0,run=0;
const clean=()=>({n:0,goal:1,k:0,got:[],err:-1,N:20,T:27,vol:1,P:[],fl:[],push:0,hand:null,after:()=>{},fast:0,hold:0}),S=clean();
const part=()=>['walls','pump','heat','squash','explain','quiz'][A.step];
const q=v=>Math.round(v*(A.narrow?1:1.1)),brisk=()=>A.reduced()||S.fast;
const voice=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
const kpa=()=>Math.round(100*(S.N/20)*((S.T+273)/300)/S.vol);
function words(g,t,x,y,mw,px,col,wt){g.font=`${wt||700} ${q(px)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;
 const out=[];for(const w of String(t).split(' ')){const l=out.length-1,cand=l<0?w:out[l]+' '+w;if(l>=0&&g.measureText(cand).width<=mw)out[l]=cand;else out.push(w)}
 out.forEach((s,i)=>g.fillText(s,x,y+(i-(out.length-1)/2)*q(px)*1.25))}
function tile(g,r,mood,lw){const C=A.col,ring={ok:C.gr,bad:C.rd,hot:C.am,cool:C.cy}[mood]||C.ln;g.save();g.fillStyle=mood&&mood!=='cool'&&mood!=='hot'?A.mix(C.pn,ring,.18):C.pn;
 A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.lineWidth=lw||(mood?3:1.5);g.strokeStyle=ring;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.stroke();g.restore()}
/* layout */
const box=()=>{const W=A.W,H=A.H;return A.narrow?{x:14,y:H*.12,w:W-28,h:H*.42}:{x:14,y:H*.12,w:W*.64,h:H*.76}};
const gauge=()=>A.narrow?{x:A.W*.27,y:A.H*.77,r:A.W*.17}:{x:A.W*.84,y:A.H*.3,r:Math.min(A.W*.1,A.H*.19)};
const zone=()=>A.narrow?{x:A.W*.55,y:A.H*.6,w:A.W*.4,h:A.H*.36}:{x:A.W*.72,y:A.H*.55,w:A.W*.25,h:A.H*.4};
const pumpR=()=>{const z=zone();return{x:z.x,y:z.y,w:z.w,h:z.h*.68}},valveR=()=>{const z=zone();return{x:z.x,y:z.y+z.h*.76,w:z.w,h:z.h*.24}};
const thermo=()=>{const z=zone();return{x:z.x+z.w*.3,y:z.y+q(8),w:z.w*.4,h:z.h-q(30)}};
const pistonX=()=>{const b=box();return b.x+b.w*S.vol};
const wallR=i=>{const b=box(),m=q(22),px=pistonX();return[{x:b.x,y:b.y-m,w:px-b.x,h:m*2},{x:b.x,y:b.y+b.h-m,w:px-b.x,h:m*2},{x:b.x-m,y:b.y,w:m*2,h:b.h},{x:px-m,y:b.y,w:m*2,h:b.h}][i]};
/* particles: x in [0,vol], y in [0,1] of the full box */
const rad=.025;
function seed(n){const s=Math.sqrt((S.T+273)/300);while(S.P.length<n){const a=Math.random()*6.283;S.P.push({x:rad+Math.random()*(S.vol-2*rad),y:rad+Math.random()*(1-2*rad),vx:Math.cos(a)*.42*s,vy:Math.sin(a)*.6*s})}S.P.length=n}
function speedTo(T0,T1){const k=Math.sqrt((T1+273)/(T0+273));S.P.forEach(p=>{p.vx*=k;p.vy*=k})}
function stepGas(dt){const v=S.vol;for(const p of S.P){p.x+=p.vx*dt;p.y+=p.vy*dt;
 if(p.x<rad){p.x=rad;p.vx=Math.abs(p.vx);S.fl.push({w:2,u:p.y,t:.25})}if(p.x>v-rad){p.x=v-rad;p.vx=-Math.abs(p.vx);S.fl.push({w:3,u:p.y,t:.25})}
 if(p.y<rad){p.y=rad;p.vy=Math.abs(p.vy);S.fl.push({w:0,u:p.x,t:.25})}if(p.y>1-rad){p.y=1-rad;p.vy=-Math.abs(p.vy);S.fl.push({w:1,u:p.x,t:.25})}}
 S.fl.forEach(f=>f.t-=dt);S.fl=S.fl.filter(f=>f.t>0).slice(-60)}
function drawBox(g){const C=A.col,b=box(),px=pistonX(),hot=Math.min(1,(S.T-27)/300);
 g.fillStyle=A.alpha(A.mix(C.cy,C.rd,hot),.08);g.fillRect(b.x,b.y,px-b.x,b.h);
 g.strokeStyle=C.tx;g.lineWidth=4;g.beginPath();g.moveTo(px,b.y);g.lineTo(b.x,b.y);g.lineTo(b.x,b.y+b.h);g.lineTo(px,b.y+b.h);g.stroke();
 g.fillStyle=part()==='squash'?C.am:C.mu;g.fillRect(px-3,b.y-q(6),8,b.h+q(12));g.fillRect(px+5,b.y+b.h/2-4,Math.max(0,b.x+b.w+8-px),8);
 if(part()==='squash'){tile(g,{x:Math.min(px+q(8),A.W-q(54)),y:b.y+b.h/2-q(22),w:q(46),h:q(44)},'hot',2.5);words(g,'⇆',Math.min(px+q(8),A.W-q(54))+q(23),b.y+b.h/2,q(40),20,C.tx,800)}
 S.fl.forEach(f=>{const a=Math.min(1,f.t*4);g.fillStyle=A.alpha(C.am,a);const r=q(5)+q(6)*(1-f.t*4);g.beginPath();
  if(f.w<2)g.arc(b.x+f.u*b.w,f.w?b.y+b.h:b.y,r,0,7);else g.arc(f.w===2?b.x:px,b.y+f.u*b.h,r,0,7);g.fill()});
 const pr=Math.max(3,b.w*rad*.8),sp=Math.sqrt((S.T+273)/300);
 S.P.forEach(p=>{const x=b.x+p.x*b.w,y=b.y+p.y*b.h;g.strokeStyle=A.alpha(C.vi,.45);g.lineWidth=2;g.beginPath();g.moveTo(x,y);g.lineTo(x-p.vx*b.w*.08,y-p.vy*b.h*.08);g.stroke();
  g.fillStyle=A.mix(C.vi,C.rd,Math.min(1,(sp-1)*1.4));g.beginPath();g.arc(x,y,pr,0,7);g.fill()})}
function drawGauge(g){const C=A.col,G=gauge(),P=kpa(),a0=Math.PI*.8,a1=Math.PI*2.2,ang=a0+(a1-a0)*Math.min(1,P/300);
 g.lineWidth=q(10);g.strokeStyle=A.alpha(C.mu,.35);g.beginPath();g.arc(G.x,G.y,G.r,a0,a1);g.stroke();g.strokeStyle=P>=200?C.rd:P>100?C.am:C.cy;g.beginPath();g.arc(G.x,G.y,G.r,a0,ang);g.stroke();
 g.strokeStyle=C.tx;g.lineWidth=3;g.beginPath();g.moveTo(G.x,G.y);g.lineTo(G.x+Math.cos(ang)*G.r*.8,G.y+Math.sin(ang)*G.r*.8);g.stroke();
 words(g,P+' kPa',G.x,G.y+G.r*.45,G.r*2,16,C.tx,800);words(g,'Pressure',G.x,G.y+G.r*.85,G.r*2.4,12,C.mu,700)}
function drawZone(g,p){const C=A.col;
 if(p==='pump'){const r=pumpR(),v=valveR(),cx=r.x+r.w/2,top=r.y+q(24),hy=top+(S.push||0)*q(10);tile(g,r,'cool',2);
  g.fillStyle=C.mu;const bt=top+q(8),bb=r.y+r.h-q(38);g.fillRect(cx-r.w*.14,bt,r.w*.28,Math.max(8,bb-bt));g.fillRect(cx-3,hy,6,q(12));g.fillStyle=C.cy;g.fillRect(cx-r.w*.3,hy-4,r.w*.6,10);
  words(g,'Pump in more gas',cx,r.y+r.h-q(14),r.w-8,13,C.tx,800);tile(g,v,'hot',2);words(g,'Let some out',v.x+v.w/2,v.y+v.h/2,v.w-8,13,C.tx,800);
  words(g,S.N+' particles',cx,r.y+q(12),r.w,12,C.mu,700)}
 if(p==='heat'){const t=thermo(),f=(S.T-27)/300;tile(g,t,'',2);g.fillStyle=A.mix(C.cy,C.rd,f);const fh=(t.h-12)*(.08+.92*f);A.paint.rrect(t.x+6,t.y+t.h-6-fh,t.w-12,fh,6);g.fill();
  words(g,S.T+' °C',t.x+t.w/2,t.y+t.h+q(14),t.w*2,14,C.tx,800);words(g,'drag',t.x+t.w/2,t.y+q(14),t.w,11,C.tx,700)}}
function draw(A){const g=A.ctx,C=A.col,W=A.W,H=A.H,p=part();
 if(p==='quiz'){words(g,'Pressure comes from particles hitting the walls. More hits, or harder hits, mean more pressure.',W/2,H*.45,W-40,17,C.tx,800);return}
 if(p==='explain'){words(g,'What raised the pressure? Drag the card to its cause, or tap a box.',W/2,H*.06,W-30,15,C.tx,800);const gap=8,w=(W-24-gap*2)/3,ls=[0,1,2].map(i=>({x:12+i*(w+gap),y:H*.56,w,h:H*.4}));S.boxes=ls;
  ls.forEach((r,i)=>{tile(g,r,S.err===i?'bad':['cool','hot',''][i],2.5);words(g,CAUSE[i],r.x+r.w/2,r.y+q(20),r.w-10,13,C.tx,800);
   S.got.filter(j=>CASES[j][1]===i).forEach((j,m)=>words(g,'✓ '+CASES[j][0],r.x+r.w/2,r.y+q(58)+m*q(44),r.w-10,11,C.tx,600))});
  if(S.k<CASES.length&&S.n<S.goal){const r=card();tile(g,r,'',2.5);words(g,CASES[S.k][0],r.x+r.w/2,r.y+r.h/2,r.w-20,16,C.tx,800)}A.fx.draw(g);return}
 const head={walls:'Tap every wall that the gas particles push on.',pump:'Pump in gas until the gauge reads 200 kPa.',heat:'Heat the gas until the gauge reads 150 kPa.',squash:'Drag the piston to squash the gas into half the space.'}[p];
 words(g,head,W/2,H*.05,W-30,15,C.tx,800);
 if(p==='walls')for(let i=0;i<4;i++){const r=wallR(i),f=S.got.includes(i);if(f||S.err===i){g.fillStyle=A.alpha(f?C.gr:C.rd,.28);g.fillRect(r.x,r.y,r.w,r.h)}
  if(f){const lx=i===2?r.x+r.w+q(30):i===3?r.x-q(30):r.x+r.w/2,ly=i===0?r.y+r.h+q(10):i===1?r.y-q(10):r.y+r.h/2;words(g,'✓ pushed',lx,ly,q(80),12,C.gr,800)}}
 drawBox(g);if(p!=='walls')drawGauge(g);drawZone(g,p);
 if(p==='heat')words(g,'Same particles, same size. Only their speed changes.',box().x+box().w/2,box().y+box().h+q(16),box().w,12,C.mu,700);
 A.fx.draw(g)}
const card=()=>{const w=Math.min(A.W*.7,q(300)),h=q(80),d=S.hand;return{x:(d&&d.x!=null?d.x:A.W/2)-w/2,y:(d&&d.x!=null?d.y:A.H*.28)-h/2,w,h}};
function oops(t,j){A.sound.miss();S.err=j==null?-1:j;voice(t);setTimeout(()=>{S.err=-1;A.redraw()},brisk()?10:1300);A.redraw()}
function win(t){S.n=S.goal;A.sound.pop();voice(t);pads();A.redraw();S.after()}
function wall(i){if(part()!=='walls'||S.n>=S.goal||S.got.includes(i))return;if(i===4)return oops('There is no wall in the middle. Pressure is a push on the surfaces the particles hit.');
 S.got.push(i);A.sound.pop();const left=4-S.got.length;voice(`${WALLS[i]}: particles hit it and push on it.`+(left?` ${left} more.`:''));if(!left)S.n=1;pads();A.redraw();S.after()}
function pump(d){if(part()!=='pump'||S.n>=S.goal)return;S.N=Math.max(8,Math.min(60,S.N+d*4));seed(S.N);S.push=d>0?1:0;A.tween(S,{push:0},brisk()?1:300);
 if(S.N===40)return win('200 kPa. Twice the particles make twice as many hits each second, so the pressure doubles.');A.sound.tick();
 voice(S.N>40?`${kpa()} kPa: too high. Let some out.`:`${S.N} particles: ${kpa()} kPa.`);A.redraw()}
function heat(T){if(part()!=='heat'||S.n>=S.goal)return;T=Math.max(27,Math.min(327,T));if(T===S.T)return;speedTo(S.T,T);S.T=T;
 if(T===177)return win('150 kPa at 177 °C. Faster particles hit the walls harder and more often. They did not get bigger.');A.sound.tick();
 voice(T>177?`${T} °C, ${kpa()} kPa: too hot. Cool it a little.`:`${T} °C: ${kpa()} kPa. The particles speed up.`);A.redraw()}
function squash(v){if(part()!=='squash'||S.n>=S.goal)return;v=Math.round(Math.max(.3,Math.min(1,v))*20)/20;if(v===S.vol)return;S.vol=v;S.P.forEach(p=>{if(p.x>v-rad)p.x=v-rad-Math.random()*.05});
 if(v===.5)return win('Half the space, 200 kPa. The particles reach the walls twice as often, so the pressure doubles.');A.sound.tick();
 voice(`${Math.round(v*100)}% of the space: ${kpa()} kPa.`+(v<.5?' Too far. Pull it back.':''));A.redraw()}
function place(l){if(part()!=='explain'||S.k>=CASES.length||S.n>=S.goal)return;const d=CASES[S.k];if(l!==d[1])return oops(`Not ${CAUSE[l].toLowerCase()}. ${d[2]}`,l);
 S.got.push(S.k);S.k++;S.n++;A.sound.pop();voice(d[2]+(S.n<S.goal?' Next card.':''));pads();A.redraw();S.after()}
function pads(){if(!pad)return;pad.innerHTML='';const p=part(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=f};if(p==='quiz'||S.n>=S.goal)return;
 if(p==='walls'){WALLS.forEach((t,i)=>{if(!S.got.includes(i))B(t,()=>wall(i),'Particles push on the '+t)});B('The middle of the gas',()=>wall(4))}
 if(p==='pump'){B('Pump in more gas',()=>pump(1));B('Let some out',()=>pump(-1))}
 if(p==='heat'){B('Heat (+30 °C)',()=>heat(S.T+30));B('Cool (−30 °C)',()=>heat(S.T-30))}
 if(p==='squash'){B('Push the piston in',()=>squash(S.vol-.1));B('Pull the piston out',()=>squash(S.vol+.1))}
 if(p==='explain')CAUSE.forEach((t,i)=>B(t,()=>place(i),CASES[S.k][0]+': '+t))}
const hit=(pt,r,m)=>(m=m||0,pt.x>r.x-m&&pt.x<r.x+r.w+m&&pt.y>r.y-m&&pt.y<r.y+r.h+m);
function tempAt(y){const t=thermo(),f=1-(y-t.y)/t.h;return 27+Math.round(Math.max(0,Math.min(1,f))*10)*30}
function down(pt){const p=part();if(p==='quiz'||S.n>=S.goal)return false;
 if(p==='walls'){for(let i=0;i<4;i++)if(hit(pt,wallR(i)))return wall(i),false;if(hit(pt,box()))wall(4);return false}
 if(p==='pump'){if(hit(pt,valveR(),4))pump(-1);else if(hit(pt,pumpR(),4)){S.hand={y0:pt.y,moved:0};return true}return false}
 if(p==='heat'&&hit(pt,thermo(),q(18))){heat(tempAt(pt.y));S.hand={};return true}
 if(p==='squash'){const b=box();if(Math.abs(pt.x-pistonX())<q(44)&&pt.y>b.y-20&&pt.y<b.y+b.h+20){S.hand={};return true}}
 if(p==='explain'){if(hit(pt,card(),6)){S.hand={x:null,x0:pt.x,y0:pt.y};return true}const i=(S.boxes||[]).findIndex(r=>hit(pt,r,3));if(i>=0)place(i)}return false}
function move(pt){const d=S.hand,p=part();if(!d)return;
 if(p==='pump'){S.push=Math.max(0,Math.min(1,(pt.y-d.y0)/(pumpR().h*.35)));A.redraw()}
 if(p==='heat')heat(tempAt(pt.y));
 if(p==='squash'){const b=box();squash((pt.x-b.x)/b.w)}
 if(p==='explain'&&(d.x!=null||Math.hypot(pt.x-d.x0,pt.y-d.y0)>8)){d.x=pt.x;d.y=pt.y;A.redraw()}}
function up(pt){const d=S.hand,p=part();S.hand=null;if(!d)return;
 if(p==='pump')pump(1);
 if(p==='explain'){if(d.x==null){voice('Drag the card into a box, or tap a box.');return A.redraw()}const i=S.boxes.findIndex(r=>hit(pt,r,16));if(i>=0)place(i);else{voice('Drop the card in one of the boxes.');A.redraw()}}}
const finish=(i,msg)=>()=>{if(A.step===i&&S.n>=S.goal&&(!steps[i].predict||A.pred[i]!=null))A.done(msg+A.reveal(i))};
function auto(f){const k=++gen,go=()=>{if(k!==gen||S.n>=S.goal)return;f();setTimeout(go,90)};setTimeout(go,30)}
const reset=()=>{gen++;Object.assign(S,clean());seed(20)};
function oneMove(){const p=part();if(p==='walls')return wall([0,1,2,3].find(i=>!S.got.includes(i)));if(p==='pump')return pump(S.N<40?1:-1);
 if(p==='heat')return heat(S.T<177?S.T+30:S.T-30);if(p==='squash')return squash(S.vol>.5?S.vol-.1:S.vol+.05);if(p==='explain')return place(CASES[S.k][1])}
const show=i=>()=>{steps[i].go();S.fast=1;auto(oneMove)};
const steps=[
{h:'Hits make pressure',p:'Gas particles fly about and bounce off the walls. Every hit is a tiny push. Find the walls they push on.',predict:{q:'Does the gas push on the top wall as well as the bottom?',opts:['Yes, on every wall','No, gas only pushes down'],ans:0},task:'Find 4 walls',show:show(0),
 go:()=>{reset();voice('Tap every wall the particles push on.');pads();S.after=finish(0,'Particles hit every wall, so gas pressure pushes in all directions. Pressure is the force of the hits on each square metre of wall.')}},
{h:'More particles',p:'The box starts at 100 kPa with 20 particles. Drag the pump handle down, or tap it, to add gas.',predict:{q:'Twice as many particles, same box, same temperature. The pressure will…',opts:['Double','Stay the same','Halve'],ans:0},task:'Reach 200 kPa',show:show(1),
 go:()=>{reset();voice('Pump in gas until the gauge reads 200 kPa.');pads();S.after=finish(1,'More particles in the same space means more hits on the walls each second, so higher pressure.')}},
{h:'Heat it up',p:'Now heat the same 20 particles in the same box. Drag the thermometer, or use the buttons.',predict:{q:'Why does heating a sealed gas raise its pressure?',opts:['The particles move faster and hit the walls harder and more often','The particles get bigger and press on the walls'],ans:0},task:'Reach 150 kPa',show:show(2),
 go:()=>{reset();voice('Heat the gas until the gauge reads 150 kPa.');pads();S.after=finish(2,'Heating gives the particles more kinetic energy. They move faster, so they hit harder and more often.')}},
{h:'Squash it',p:'Keep the gas and the temperature the same. Drag the piston in to give the particles less space.',predict:{q:'Squash the gas into half the space. The pressure will…',opts:['Double','Halve','Stay the same'],ans:0},task:'Squash to half',show:show(3),
 go:()=>{reset();voice('Drag the piston to squash the gas into half the space.');pads();S.after=finish(3,'Less space means the particles reach the walls more often. Half the volume, double the pressure.')}},
{h:'Real life',p:'Use the model to explain everyday changes. Drag each card to the cause that raised the pressure.',task:'Explain 4 cases',show:show(4),
 go:()=>{reset();S.goal=4;voice('What raised the pressure? Drag the card or tap a box.');pads();S.after=finish(4,'Three ways to raise gas pressure: add particles, heat the gas, or give it less space.')}},
{h:'Challenge',p:'',go:()=>{reset();challenge()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.after()});
const QS=[['Where does gas pressure come from?',[['Particles hitting the walls of the container','ok'],['Particles hitting each other','each'],['The weight of the gas pressing down','down']]],
 ['A sealed can is heated. What happens to the gas particles?',[['They move faster','ok'],['They get bigger','big'],['More particles appear','more']]],
 ['A gas is squashed into a third of the space. The temperature stays the same. The pressure becomes…',[['3 times bigger','ok'],['A third as big','third'],['The same','same']]],
 ['A balloon goes from a warm room into a freezer and shrinks. Why?',[['The particles slow down, so they hit the walls less hard and less often','ok'],['The particles shrink','big'],['The particles stop moving','stop']]],
 ['Which walls of a gas container does the gas push on?',[['All of them','ok'],['Only the bottom','down'],['Only the top','top']]]];
function why(t){let m='Pressure comes from particles hitting the walls.';
 if(t==='each')m='Particles do hit each other, but pressure on a container is the push from hits on its walls.';if(t==='down')m='Gas particles move in every direction, so they push on every wall, not just the bottom.';
 if(t==='big')m='Particles never change size. Temperature changes how fast they move.';if(t==='more')m='The can is sealed, so the number of particles stays the same. They just move faster.';
 if(t==='third')m='Less space means more hits each second, so the pressure goes up, not down: 3 times bigger.';if(t==='same')m='The particles reach the walls more often in a smaller space, so the pressure rises.';
 if(t==='stop')m='Particles keep moving even in a freezer. They move more slowly, so they hit the walls less hard and less often.';if(t==='top')m='The particles hit every wall, so the gas pushes on all of them.';return m}
function challenge(){qn++;const[qq,ops]=QS[qn%QS.length],rot=qn%3;quiz.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>grade(t)});voice('Challenge: '+qq);A.redraw()}
function grade(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok){run++;A.win()}else{run=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Right.':'✗ '+why(t)}${ok?` Stars in a row: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=challenge}
A=FK.shell(c,{steps,ratio:.62,tall:1.25,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;pads()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});pads();
  A.every(dt=>{const p=part();if(p==='quiz'||p==='explain')return false;if(A.reduced())return false;stepGas(dt);return true})}});
A.start()})})();
