/* Flagship: exploring how things work (ages 3-4). Press a torch switch, turn a tap a little and a lot, wind a toy once
   and three times, pull a zip up and squeeze a peg to hang socks. Each part does one job, and trying it shows the job.
   Big tap targets; every canvas action also has a button. */
(()=>{
VIS.reg('flagworks',c=>{let A,bar,box,q=-1,run=0;const K={};
const view=()=>['torch','tap','toy','zip','peg','quiz'][A.step];
const sfx=k=>A.sound[k](),paintNow=()=>A.redraw(),sync=()=>{paintNow();keys()};
function speak(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function word(t,x,y,px,ink,wt){const g=A.ctx;g.font=`${wt||800} ${Math.round(px*(A.narrow?1:1.15))}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=ink||A.col.tx;g.fillText(t,x,y,A.W-14)}
function slab(x,y,w,h,r,fill,edge){const g=A.ctx;A.paint.rrect(x,y,w,h,r);g.fillStyle=fill;g.fill();g.lineWidth=2.5;g.strokeStyle=edge||A.col.tx;g.stroke()}
const inside=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const water=()=>A.col.dark?'#38bdf8':'#0284c7';
function paint(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#fef9c3',C.dark?.04:.3);g.fillRect(0,0,W,H);
 ({torch:dTorch,tap:dTap,toy:dToy,zip:dZip,peg:dPeg,quiz:dQuiz})[view()](g,W,H,C);A.fx.draw(g)}
/* ---- 1: torch ---- */
const body=()=>({x:A.W*.12,y:A.H*.44,w:A.W*.46,h:A.H*.15});
const knob=()=>{const b=body(),w=Math.max(64,A.W*.16);return{x:b.x+b.w*.5-w/2,y:b.y-34,w,h:34}};
function dTorch(g,W,H,C){const b=body(),k=knob(),hx=b.x+b.w;
 if(K.on){g.fillStyle=A.alpha('#facc15',C.dark?.45:.55);g.beginPath();g.moveTo(hx+W*.08,b.y);g.lineTo(W-6,b.y-H*.2);g.lineTo(W-6,b.y+b.h+H*.2);g.lineTo(hx+W*.08,b.y+b.h);g.fill()}
 slab(b.x,b.y,b.w,b.h,12,C.dark?'#475569':'#94a3b8');g.fillStyle=C.dark?'#64748b':'#cbd5e1';g.beginPath();g.moveTo(hx,b.y);g.lineTo(hx+W*.08,b.y-H*.04);g.lineTo(hx+W*.08,b.y+b.h+H*.04);g.lineTo(hx,b.y+b.h);g.closePath();g.fill();g.strokeStyle=C.tx;g.lineWidth=2.5;g.stroke();
 g.fillStyle=K.on?'#fde047':(C.dark?'#1e293b':'#e2e8f0');g.fillRect(hx+W*.07,b.y-H*.03,6,b.h+H*.06);
 slab(k.x,k.y+(K.on?6:0),k.w,k.h-(K.on?6:0),10,K.bad?A.alpha(C.rd,.4):C.dark?'#f97316':'#fb923c');word('button',k.x+k.w/2,k.y-14,12,C.tx,700);
 word(K.on?'The light is ON':'The light is off',W/2,H*.12,17);word(`Pressed ${K.flips} time${K.flips===1?'':'s'}`,W/2,H*.82,14,C.tx,700)}
function flip(){if(view()!=='torch')return;K.on=!K.on;K.flips++;sfx(K.on?'pop':'tick');
 speak(K.on?'Click! You pressed the button. The light came on.':'Click! You pressed it again. The light went off.');sync();K.want()}
function missTorch(){K.bad=1;setTimeout(()=>{K.bad=0;paintNow()},A.reduced()?10:700);sfx('miss');
 let m='That is the handle. Find the button: it is the part that moves.';speak(m);paintNow()}
/* ---- 2: tap ---- */
const LEVEL=['off','a little','more','lots'];
const cup=()=>({x:A.W*.38,y:A.H*.6,w:A.W*.26,h:A.H*.24});
function dTap(g,W,H,C){const sx=W*.5,sy=H*.36,u=cup();g.fillStyle=C.dark?'#94a3b8':'#64748b';g.fillRect(0,H*.2,W*.44,H*.07);
 slab(W*.4,H*.17,W*.14,H*.13,8,C.dark?'#cbd5e1':'#e2e8f0');g.fillStyle=C.dark?'#cbd5e1':'#e2e8f0';g.fillRect(sx-8,H*.28,16,sy-H*.28);
 g.save();g.translate(W*.47,H*.14);g.rotate(K.turn*.5);g.fillStyle=C.dark?'#f87171':'#dc2626';g.fillRect(-W*.09,-7,W*.18,14);g.beginPath();g.arc(0,0,12,0,7);g.fill();g.restore();
 if(K.turn){const w=K.turn*5;g.fillStyle=A.alpha(water(),.85);const wob=Math.sin(performance.now()/90)*K.turn;g.fillRect(sx-w/2+wob*.3,sy,w,u.y+u.h*(1-K.cup)-sy)}
 g.fillStyle=A.alpha(water(),.8);g.fillRect(u.x+3,u.y+u.h*(1-K.cup),u.w-6,u.h*K.cup);g.strokeStyle=C.tx;g.lineWidth=3;g.beginPath();g.moveTo(u.x,u.y);g.lineTo(u.x,u.y+u.h);g.lineTo(u.x+u.w,u.y+u.h);g.lineTo(u.x+u.w,u.y);g.stroke();
 word(`Tap: ${LEVEL[K.turn]}`,W/2,H*.06,17);word(K.cup>=1?(K.turn?'Full! Turn it back to stop.':'Full, and the tap is off.'):'Drag the red handle, or use the buttons.',W/2,H*.92,13,C.tx,700)}
function setTurn(t){if(view()!=='tap')return;t=Math.max(0,Math.min(3,t));if(t===K.turn)return;const up=t>K.turn;K.turn=t;sfx('tick');
 speak(t===0?'You turned the tap back. The water stopped.':up?`You turned it more. Now ${LEVEL[t]} water comes out.`:`You turned it back a bit. Now only ${LEVEL[t]} water comes out.`);sync();K.want()}
function flow(dt){if(!A||view()!=='tap'||!K.turn)return false;if(K.cup<1){K.cup=Math.min(1,K.cup+dt*K.turn*(K.fast?.7:.12));if(K.cup>=1){sfx('pop');speak('The cup is full! Turn the tap back so the water stops.');keys()}}return true}
/* ---- 3: wind-up toy ---- */
const lane=()=>({x0:A.W*.1,x1:A.W*.92,y:A.H*.6});
function bot(x,y,s,C){const g=A.ctx;slab(x-s,y-s*1.3,s*2,s*1.3,s*.4,C.dark?'#a78bfa':'#8b5cf6');g.fillStyle=C.dark?'#0f172a':'#ffffff';g.beginPath();g.arc(x+s*.4,y-s*.85,s*.22,0,7);g.fill();
 g.fillStyle=C.tx;[x-s*.6,x+s*.6].forEach(fx=>{g.beginPath();g.arc(fx,y+s*.1,s*.25,0,7);g.fill()});g.strokeStyle=C.tx;g.lineWidth=4;g.beginPath();g.moveTo(x-s,y-s*.7);g.lineTo(x-s*1.5,y-s*.7);g.stroke();
 g.save();g.translate(x-s*1.6,y-s*.7);g.rotate(K.w*1.2);g.fillStyle=C.dark?'#fbbf24':'#d97706';g.fillRect(-4,-s*.45,8,s*.9);g.restore()}
function dToy(g,W,H,C){const L=lane(),s=Math.min(36,W*.085);g.strokeStyle=C.mu;g.lineWidth=4;g.beginPath();g.moveTo(L.x0,L.y+s*.4);g.lineTo(L.x1,L.y+s*.4);g.stroke();
 K.runs.forEach((r,i)=>{const x=L.x0+r*A.W*.17;g.fillStyle=i%2?C.gr:C.vi;g.fillRect(x-3,L.y+s*.4,6,s*1.2);word(`${r} turn${r>1?'s':''}`,x,L.y+s*1.9+(i%2)*18,12,C.tx,800)});
 bot(K.tx,L.y,s,C);word(`Key turned: ${K.w} time${K.w===1?'':'s'}`,W/2,H*.08,17);
 word(K.moving?'Off it goes!':K.runs.length?'More turns of the key: it goes further.':'Turn the key, then let go.',W/2,H*.85,14,C.tx,700)}
function wind(){if(view()!=='toy'||K.moving)return;if(K.w>=4){sfx('miss');let m='The key will not turn any more. The spring inside is wound up tight. Let go!';return speak(m)}
 if(K.done1){K.tx=lane().x0;K.done1=0}K.w++;sfx('tick');speak(`You turned the key ${K.w} time${K.w>1?'s':''}. The spring inside gets tighter.`);sync()}
function letGo(){if(view()!=='toy'||K.moving)return;if(!K.w){sfx('miss');let m='Nothing happens. Turn the key first: the spring needs winding up.';return speak(m)}
 const w=K.w,L=lane();K.moving=1;keys();sfx('whoosh');A.tween(K,{tx:L.x0+w*A.W*.17,w:0},A.reduced()?1:300+w*200,'out',()=>{K.moving=0;K.w=0;K.done1=1;K.runs.push(w);
 const d=new Set(K.runs).size;speak(`It walked and stopped. ${w} turn${w>1?'s':''} of the key took it ${w>1?'further':'a short way'}.`+(d>=2?' More winding, further walking.':''));sync();K.want()})}
/* ---- 4: zip ---- */
const zipY=()=>({lo:A.H*.8,hi:A.H*.2});
function dZip(g,W,H,C){const Z=zipY(),y=Z.lo-(Z.lo-Z.hi)*K.z,cx=W/2,open=W*.12;
 const half=(d)=>{g.fillStyle=C.dark?'#0ea5e9':'#38bdf8';g.beginPath();g.moveTo(cx+d*W*.32,Z.hi-H*.06);g.lineTo(cx+d*(y>Z.hi+2?open*(y-Z.hi)/(Z.lo-Z.hi)+4:4),Z.hi);g.lineTo(cx+d*4,y);g.lineTo(cx+d*4,Z.lo+H*.06);g.lineTo(cx+d*W*.32,Z.lo+H*.06);g.closePath();g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke()};
 half(-1);half(1);g.fillStyle=C.tx;for(let t=Z.lo;t>y;t-=9)g.fillRect(cx-5,t-3,10,4);
 const pk=K.bad?C.rd:(C.dark?'#fbbf24':'#b45309');slab(cx-16,y-14,32,28,6,pk);slab(cx-10,y+12,20,30,6,pk);
 word(K.z>=1?'Zipped up!':'Pull the tab up',W/2,H*.07,17);word(`${Math.round(K.z*100)}% zipped`,W/2,H*.95,14,C.tx,800)}
function setZip(z){if(view()!=='zip'||K.z>=1)return;z=Math.max(0,Math.min(1,z));if(z>.94)z=1;const was=K.z;K.z=z;if(Math.floor(z*4)!==Math.floor(was*4))sfx('tick');
 if(z>=1){sfx('pop');speak('Zipped! The tab pulls the slider, and the slider joins the teeth together.');K.want()}else if(z>was)speak('The slider joins the teeth as it goes up.');sync()}
function zipMiss(){K.bad=1;setTimeout(()=>{K.bad=0;paintNow()},A.reduced()?10:700);sfx('miss');let m='That is the coat. Pull the little tab on the zip.';speak(m);paintNow()}
/* ---- 5: peg ---- */
const pegAt=()=>({x:A.W*.5,y:A.H*.36});
function sock(x,y,s,col){const g=A.ctx;g.fillStyle=col;g.beginPath();g.moveTo(x-s*.35,y);g.lineTo(x+s*.35,y);g.lineTo(x+s*.35,y+s*1.1);g.quadraticCurveTo(x+s*.9,y+s*1.2,x+s*.8,y+s*1.6);g.lineTo(x-s*.2,y+s*1.6);g.quadraticCurveTo(x-s*.4,y+s*1.4,x-s*.35,y+s*1.1);g.closePath();g.fill();g.strokeStyle=A.col.tx;g.lineWidth=2;g.stroke()}
const SOCK=['#f472b6','#34d399','#fbbf24'];
function clothPeg(x,y,s,open,C){const g=A.ctx,a=open?.35:0;g.fillStyle=C.dark?'#d6a77a':'#a16207';[-1,1].forEach(d=>{g.save();g.translate(x,y);g.rotate(d*a);g.fillRect(d<0?-s*.32:s*.06,-s*.2,s*.26,s*1.3);g.restore()});
 g.fillStyle=C.dark?'#e2e8f0':'#475569';g.fillRect(x-s*.4,y+s*.42,s*.8,s*.12)}
function dPeg(g,W,H,C){const P=pegAt(),s=Math.min(70,H*.18);g.strokeStyle=C.mu;g.lineWidth=3;g.beginPath();g.moveTo(0,H*.3);g.lineTo(W,H*.3);g.stroke();
 for(let i=0;i<K.hung;i++){const x=W*(.2+i*.3);sock(x,H*.31,34,SOCK[i]);clothPeg(x,H*.235,34,0,C)}
 if(K.hung<3){if(K.open)sock(P.x,H*.31+s*.2,s*.5,SOCK[K.hung]);else sock(P.x,H*.72,s*.5,SOCK[K.hung]);clothPeg(P.x,P.y-s*.5,s,K.open,C)}
 word(`Socks on the line: ${K.hung} of 3`,W/2,H*.07,17);word(K.hung>=3?'All 3 socks are hanging up.':K.open?'The mouth is open. Now let go!':'Press and hold the peg to squeeze it.',W/2,H*.92,14,C.tx,700)}
function squeeze(){if(view()!=='peg'||K.hung>=3||K.open)return;K.open=1;sfx('tick');speak('You squeezed the ends. The mouth of the peg opened, and the sock went in.');sync()}
function release(){if(view()!=='peg'||K.hung>=3)return;if(!K.open){sfx('miss');let m='The peg is already shut. Squeeze its ends first so the mouth opens.';return speak(m)}
 K.open=0;K.hung++;sfx('pop');speak(K.hung>=3?'All 3 socks are on the line. The spring in the peg holds each one tight.':'You let go. The spring shut the peg and it holds the sock.');sync();K.want()}
function dQuiz(g,W,H,C){g.font=`${Math.round(H*.12)}px system-ui,"Noto Color Emoji",sans-serif`;g.textAlign='center';g.textBaseline='middle';['🔦','🚰','🔑','🧥'].forEach((e,i)=>g.fillText(e,W*(.17+i*.22),H*.45));
 word('What does each part do?',W/2,H*.15,17);word('Try it and see.',W/2,H*.78,15,C.tx,700)}
/* ---- controls and gestures ---- */
function keys(){if(!bar)return;bar.innerHTML='';const v=view(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},bar,t).onclick=f};
 if(v==='torch'){b('Press the button',flip,'Press the torch button');b('Press the handle',missTorch,'Press the torch handle')}
 if(v==='tap'){b('Turn it more',()=>setTurn(K.turn+1),'Turn the tap more');b('Turn it back',()=>setTurn(K.turn-1),'Turn the tap back')}
 if(v==='toy'&&!K.moving){b('Turn the key',wind,'Turn the key on the toy');b('Let go',letGo,'Let go of the toy')}
 if(v==='zip'&&K.z<1){b('Pull the tab up',()=>setZip(K.z+.25),'Pull the zip tab up');b('Pull the coat',zipMiss,'Pull the coat instead of the tab')}
 if(v==='peg'&&K.hung<3){b('Squeeze the peg',squeeze,'Squeeze the ends of the peg');b('Let go',release,'Let go of the peg')}}
function down(p){const v=view();
 if(v==='torch'){const k=knob(),hit={x:k.x-18,y:k.y-18,w:k.w+36,h:k.h+30};if(inside(p,hit))flip();else if(inside(p,body()))missTorch();return false}
 if(v==='tap'){K.gx=p.x;K.gt=K.turn;K.drag=1;return true}
 if(v==='toy'){const L=lane();if(Math.abs(p.y-L.y)<70&&p.x<K.tx-10)wind();else if(Math.abs(p.y-L.y)<70)letGo();return false}
 if(v==='zip'){const Z=zipY(),y=Z.lo-(Z.lo-Z.hi)*K.z;if(Math.abs(p.x-A.W/2)<50&&Math.abs(p.y-y-10)<50){K.drag=1;return true}if(K.z<1)zipMiss();return false}
 if(v==='peg'){const P=pegAt();if(Math.abs(p.x-P.x)<80&&p.y<A.H*.75){squeeze();K.drag=1;return true}}return false}
function move(p){const v=view();if(!K.drag)return;if(v==='tap')setTurn(K.gt+Math.round((p.x-K.gx)/(A.W*.12)));if(v==='zip'){const Z=zipY();setZip((Z.lo-p.y)/(Z.lo-Z.hi))}}
function up(){if(K.drag&&view()==='peg')release();K.drag=0}
const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(n,acts,gap){steps[n].go();const k=++K.k;acts.forEach((f,j)=>setTimeout(()=>{if(k===K.k)f()},A.reduced()?30*(j+1):(j+1)*(gap||380)))}
function reset(){const k=(K.k||0)+1;for(const x in K)delete K[x];Object.assign(K,{k,want:()=>{},on:0,flips:0,bad:0,turn:0,cup:0,fast:0,w:0,tx:A?lane().x0:0,runs:[],moving:0,done1:0,z:0,hung:0,open:0,drag:0})}
const steps=[
{h:'Press the button',p:'A torch has a button. The button is the part that switches the light on and off.',
 predict:{q:'What will the button on the torch do?',opts:['Make the light come on','Make the torch bigger','Make a song play'],ans:0},task:'Turn the light on, then off',
 show:()=>play(0,[flip,flip]),go:()=>{reset();speak('Press the orange button on the torch.');keys();K.want=finish(0,()=>K.flips>=2&&!K.on,'Press once: on. Press again: off. The button does that job.')}},
{h:'Turn the tap',p:'The handle on a tap lets water out. Turn it a little, or a lot.',
 predict:{q:'You turn the tap more. What happens?',opts:['Less water comes out','More water comes out','The water stops'],ans:1},task:'Fill the cup, then turn the tap off',
 show:()=>{steps[1].go();K.fast=1;const k=K.k;[1,2,3].forEach((t,j)=>setTimeout(()=>{if(k===K.k)setTurn(t)},A.reduced()?20:(j+1)*300));const off=()=>{if(k!==K.k)return;if(K.cup>=1){[2,1,0].forEach((t,j)=>setTimeout(()=>{if(k===K.k)setTurn(t)},A.reduced()?20:(j+1)*250))}else setTimeout(off,120)};setTimeout(off,A.reduced()?80:1000)},
 go:()=>{reset();speak('Drag the red handle sideways, or press Turn it more.');keys();K.want=finish(1,()=>K.cup>=1&&K.turn===0,'Turn more: more water. Turn back: it stops.')}},
{h:'Wind it up',p:'This toy has a key. Turning the key winds up a spring inside. When you let go, the spring makes it walk.',
 predict:{q:'You turn the key 3 times, not 1 time. How far will the toy walk?',opts:['Further','Not as far','Just the same'],ans:0},task:'Wind it 1 time and let go. Then wind it 3 times',
 show:()=>{steps[2].go();const k=++K.k;[[300,wind],[600,letGo],[1400,wind],[1600,wind],[1800,wind],[2000,letGo]].forEach(([t,f])=>setTimeout(()=>{if(k===K.k)f()},A.reduced()?t/10:t))},go:()=>{reset();speak('Press Turn the key, then Let go.');keys();K.want=finish(2,()=>new Set(K.runs).size>=2,'More turns of the key wind the spring more, so the toy walks further.')}},
{h:'Pull the zip',p:'A zip has a little tab. When you pull the tab up, it joins the two sides of the coat.',task:'Zip the coat all the way up',
 show:()=>play(3,[1,2,3,4].map(i=>()=>setZip(i/4))),go:()=>{reset();speak('Drag the tab up, or press Pull the tab up.');keys();K.want=finish(3,()=>K.z>=1,'The tab moves the slider, and the slider joins the teeth.')}},
{h:'Squeeze the peg',p:'A peg has a spring. Squeeze the ends and the mouth opens. Let go and it shuts tight.',
 predict:{q:'You squeeze the ends of a peg. What does its mouth do?',opts:['It shuts tight','It opens','Nothing happens'],ans:1},task:'Hang 3 socks on the line',
 show:()=>play(4,[squeeze,release,squeeze,release,squeeze,release]),go:()=>{reset();speak('Press and hold the peg, then let go.');keys();K.want=finish(4,()=>K.hung>=3,'Squeeze: it opens. Let go: the spring shuts it and it holds.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>K.want()});
const QS=[['The torch is off. How do you turn it on?',[['Press the button','ok'],['Shake it','shake'],['Blow on it','blow']]],
 ['You want more water from the tap. What do you do?',[['Turn the handle more','ok'],['Turn it back','back'],['Tap on the sink','sink']]],
 ['Why does the toy walk?',[['You wound up its spring','ok'],['It wants to walk','wants'],['It is magic','magic']]],
 ['The toy stopped. How can it walk again?',[['Wind it up again','ok'],['Wait and it will go','wait'],['Paint it a new colour','paint']]],
 ['How do you open a peg?',[['Squeeze its ends','ok'],['Pull its mouth apart','pull'],['Shout at it','shout']]],
 ['Which part of a zip do you pull?',[['The little tab','ok'],['The coat','coat'],['The bottom of the zip','bottom']]],
 ['You do not know how a box opens. What can you do?',[['Try each part and see','ok'],['Give up','quit'],['Hit it hard','hit']]]];
function slip(t){let m='Try the part that moves, and watch what happens.';
 if(t==='shake')m='Shaking does not switch it on. The button is the part that makes the light come on.';
 if(t==='blow')m='Blowing does nothing to a torch. Press its button to switch it on.';
 if(t==='back')m='Turning it back makes less water. Turn the handle more for more water.';
 if(t==='sink')m='The sink has no job here. The handle on the tap lets the water out.';
 if(t==='wants')m='A toy is not alive. It cannot want things. You wound up its spring, and the spring makes it walk.';
 if(t==='magic')m='It is not magic. Turning the key winds up a spring inside, and the spring makes it go.';
 if(t==='wait')m='Waiting will not wind it. The spring has run down, so turn the key again.';
 if(t==='paint')m='The colour does not make it go. The spring does. Wind it up again.';
 if(t==='pull')m='The mouth is held shut by a spring. Squeeze the ends and the mouth opens.';
 if(t==='shout')m='A peg cannot hear. Squeeze its ends to open it.';
 if(t==='coat')m='Pulling the coat does not join it. Pull the little tab, and the slider joins the teeth.';
 if(t==='bottom')m='The bottom stays still. Pull the little tab up the zip.';
 if(t==='quit')m='Do not give up! Try one part. Watch what it does. Then try the next part.';
 if(t==='hit')m='Hitting can break it. Try each part gently and see what it does.';return m}
function ask(){q++;const[qq,ops]=QS[q%QS.length],turn=(q+1)%3;box.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=box.querySelector('.fl-pick');[...ops.slice(turn),...ops.slice(0,turn)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>judge(t)});speak('Challenge: '+qq);paintNow()}
function judge(t){box.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=box.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){run++;A.win()}else{run=0;sfx('miss')}fb.innerHTML=(ok?`✓ Yes! ${run} in a row.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw:paint,onStep:A=>{box.hidden=A.step!==5;bar.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);bar=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);box=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});A.every(flow);keys()}});
A.start()})})();
