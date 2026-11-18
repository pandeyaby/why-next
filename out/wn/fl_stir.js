/* Flagship – mixing things together (ages 3–4, EYFS Development Matters 3 and 4 year olds, Understanding the World:
   "explore how things work" and "talk about the differences between materials and changes they notice"). Pour water on
   flour and stir it into dough, mix red and yellow paint into orange, find the two paints that make green, stir sugar
   into water until it dissolves and taste that it is still there, and stir sand into water and watch it sink. Targets the
   ideas that mixed paints stay as spots, that dissolved sugar is gone for ever, and that sand vanishes like sugar. */
(()=>{
VIS.reg('flagstir',c=>{let A,pads,quiz,qn=-1,run=0;c.fig.classList.add('young');const Z={};
const scene=()=>['dough','orange','green','sugar','sand','quiz'][A.step];
const speak=s=>{c.say(s);if(A)A.cv.setAttribute('aria-label',s)};
const big=n=>Math.round(n*(A.narrow?1.08:1.25)),again=()=>A.redraw();
const P={red:'#d62828',yellow:'#f4c20d',blue:'#1d5fc4',orange:'#f08a1c',green:'#2f9b47',purple:'#7a3f9e',flour:'#f1e7cf',dough:'#e8cc96',sand:'#c79a5a',sugar:'#ffffff'};
const MAKE={'red+yellow':'orange','blue+yellow':'green','blue+red':'purple'};
const pots=()=>({dough:['water'],orange:['red','yellow'],green:['red','yellow','blue'],sugar:['sugar'],sand:['sand']})[scene()]||[];
function word(g,s,x,y,n,colr,wt){g.font=`${wt||800} ${big(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=colr||A.col.tx;g.fillText(s,x,y,A.W-14)}
const bowl=()=>{const r=Math.min(A.W*.25,A.H*.3);return{x:A.W/2,y:A.H*.6,r}};
const potBox=i=>{const n=pots().length,w=Math.min(A.W*.17,A.H*.2),gap=Math.min(w*.5,(A.W-n*w)/(n+1));const x0=(A.W-(n*w+(n-1)*gap))/2;return{x:x0+i*(w+gap),y:A.H*.1,w,h:w*.8}};
const hit=(p,r)=>p.x>r.x-10&&p.x<r.x+r.w+10&&p.y>r.y-10&&p.y<r.y+r.h+24;
function pot(g,k,r){const K=A.col;g.beginPath();g.rect(r.x,r.y+r.h*.15,r.w,r.h*.85);
 g.fillStyle=k==='water'?A.alpha(K.cy,.55):P[k];g.fill();g.lineWidth=2.5;g.strokeStyle=K.tx;g.stroke();
 g.beginPath();g.rect(r.x-3,r.y,r.w+6,r.h*.18);g.fillStyle=A.mix(K.pn,K.tx,.2);g.fill();g.stroke();
 if(Z.used.includes(k)){g.strokeStyle=K.tx;g.lineWidth=3;g.beginPath();g.moveTo(r.x+6,r.y+r.h*.6);g.lineTo(r.x+r.w*.42,r.y+r.h*.85);g.lineTo(r.x+r.w-6,r.y+r.h*.3);g.stroke()}
 word(g,k,r.x+r.w/2,r.y+r.h+14,12,K.tx,700)}
function inside(g,b,colr,lvl){g.save();g.beginPath();g.arc(b.x,b.y,b.r*.92,0,Math.PI);g.closePath();g.clip();g.fillStyle=colr;g.fillRect(b.x-b.r,b.y+b.r*(1-lvl)*.92,b.r*2,b.r);g.restore()}
function draw(A){const{ctx:g,W,H,col:K}=A,v=scene();g.fillStyle=A.mix(K.pn,K.vi,K.dark?.05:.07);g.fillRect(0,0,W,H);
 if(v==='quiz'){word(g,'Mixing makes changes',W/2,H*.28,18);word(g,'Red + yellow = orange',W/2,H*.44,15);word(g,'Sugar hides in water. Sand sinks.',W/2,H*.6,14,K.mu);return}
 const b=bowl();pots().forEach((k,i)=>pot(g,k,potBox(i)));
 if(v==='dough'){if(Z.mix<1){g.beginPath();g.ellipse(b.x,b.y+b.r*.55,b.r*.7*(1-Z.mix*.3),b.r*.3,0,Math.PI,0);g.fillStyle=A.mix(P.flour,P.dough,Z.mix);g.fill();g.lineWidth=1.5;g.strokeStyle=K.tx;g.stroke();
   if(Z.water)inside(g,b,A.alpha(K.cy,.45*(1-Z.mix)),.35)}
  else{g.beginPath();g.arc(b.x,b.y+b.r*.42,b.r*.42,0,7);g.fillStyle=P.dough;g.fill();g.lineWidth=2.5;g.strokeStyle=K.tx;g.stroke()}}
 if(v==='orange'||v==='green'){Z.blobs.forEach((k,i)=>{g.globalAlpha=Z.res?1-Z.mix:1;g.beginPath();g.arc(b.x+(i?1:-1)*b.r*.3,b.y+b.r*.45,b.r*.3,0,7);g.fillStyle=P[k];g.fill();g.globalAlpha=1});
  if(Z.res)inside(g,b,A.alpha(P[Z.res],Z.mix),.6)}
 if(v==='sugar'||v==='sand'){inside(g,b,A.alpha(K.cy,.4),.75);const sc=v==='sugar'?P.sugar:P.sand;
  Z.gr.forEach(q=>{const a=v==='sugar'?1-Z.mix:1;if(a<=.02)return;g.globalAlpha=a;g.beginPath();g.arc(q.x,q.y,4,0,7);g.fillStyle=sc;g.fill();g.lineWidth=1;g.strokeStyle=K.tx;g.stroke();g.globalAlpha=1});
  if(v==='sand'&&Z.settle>=1){inside(g,b,P.sand,.18)}
  if(Z.tasted)word(g,'Sweet! The sugar is still there.',W/2,H*.95,13)}
 g.beginPath();g.arc(b.x,b.y,b.r,0,Math.PI);g.closePath();g.lineWidth=3;g.strokeStyle=K.tx;g.stroke();
 const a=Z.spin;g.beginPath();g.moveTo(b.x+Math.cos(a)*b.r*.25,b.y+b.r*.45);g.lineTo(b.x+Math.cos(a)*b.r*.5,b.y-b.r*.55);g.lineWidth=7;g.lineCap='round';g.strokeStyle=A.mix(K.tx,K.or,.5);g.stroke();g.lineCap='butt';
 word(g,Z.msg,W/2,b.y+b.r+(A.narrow?20:24),14,K.tx,700);A.fx.draw(g)}
const oops=s=>{A.sound.miss();speak(s);buttons();again()},yay=s=>{A.sound.pop();speak(s);buttons();again();Z.want()};
const nm={water:'water',red:'red paint',yellow:'yellow paint',blue:'blue paint',sugar:'a spoon of sugar',sand:'a spoon of sand'};
function add(k){const v=scene();if(v==='quiz'||Z.used.includes(k)||Z.res)return;
 if(v==='orange'||v==='green'){if(Z.blobs.length>=2)return oops('There are two paints in. Stir them now.');Z.blobs.push(k)}
 if((v==='sugar'||v==='sand')){const b=bowl();for(let i=0;i<14;i++)Z.gr.push({x:b.x+(Math.random()-.5)*b.r*.4,y:b.y+b.r*.2+Math.random()*b.r*.2})}
 if(v==='dough')Z.water=1;Z.used.push(k);A.sound.tick();Z.msg=`In goes ${nm[k]}.`;speak(`In goes ${nm[k]}. `+(v==='dough'?'Now stir it.':(v==='orange'||v==='green')&&Z.blobs.length<2?'Add one more paint.':'Now stir.'));buttons();again()}
function ready(){const v=scene();return v==='dough'?Z.water:v==='orange'||v==='green'?Z.blobs.length===2:v==='sugar'||v==='sand'?Z.used.length>0:false}
function stir(){const v=scene();if(v==='quiz'||Z.st>=3)return;if(!ready()){return oops(v==='dough'?'Pour in the water first.':v==='sugar'||v==='sand'?`Add the ${v} first.`:'Add two paints first.')}
 Z.st++;A.sound.whoosh();A.tween(Z,{spin:Z.spin+Math.PI*2},450,'out');const b=bowl();
 if(v==='sand')Z.gr.forEach(q=>{q.x=b.x+(Math.random()-.5)*b.r*1.3;q.y=b.y+Math.random()*b.r*.6});
 if(v==='orange'||v==='green')Z.res=MAKE[Z.blobs.slice().sort().join('+')];
 A.tween(Z,{mix:Z.st/3},450,'out',()=>{if(Z.st<3)return;finish(v)});if(Z.st<3){Z.msg=`Stir ${Z.st} of 3`;speak(`Round and round. Stir ${3-Z.st} more.`);again()}}
function finish(v){
 if(v==='dough'){Z.msg='Dough!';return yay('The flour and water mixed into soft dough. They changed into something new.')}
 if(v==='orange'){Z.msg='Orange!';return yay('Red and yellow mixed into orange, a new colour. The spots are gone.')}
 if(v==='green'){if(Z.res==='green'){Z.msg='Green!';return yay('Blue and yellow make green!')}
  Z.msg=Z.res==='orange'?'That is orange':'That is purple';Z.bad=1;return oops(Z.res==='orange'?'Red and yellow make orange, not green. Tip it out and try two more.':'Red and blue make purple, not green. Tip it out and try two more.')}
 if(v==='sugar'){Z.msg='Where did it go?';speak('The sugar is gone from sight. Is it still there? Taste the water.');buttons();return again()}
 if(v==='sand'){Z.msg='Wait and look';speak('The sand is all swirled up. Now wait and look.');buttons();again()}}
function tipOut(){if(scene()!=='green')return;const t=Z.tok;fresh();Z.tok=t;Z.want=ok(2,()=>Z.res==='green','Blue and yellow make green.');Z.msg='Pick two paints';speak('The bowl is empty. Pick two paints.');buttons();again()}
function taste(){if(scene()!=='sugar'||Z.st<3||Z.tasted)return;Z.tasted=1;Z.msg='';yay('Sweet! You cannot see the sugar, but it is still in the water. It dissolved.')}
function wait(){if(scene()!=='sand'||Z.st<3||Z.settle)return;const b=bowl();A.sound.tick();Z.gr.forEach(q=>A.tween(q,{y:b.y+b.r*(.62+Math.random()*.2),x:b.x+(Math.random()-.5)*b.r*1.1},1100,'out'));
 A.tween(Z,{settle:1},1150,'out',()=>{Z.msg='The sand sank';yay('The sand sank to the bottom. You can still see it. Sand does not dissolve.')})}
function buttons(){if(!pads)return;pads.innerHTML='';const v=scene(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pads,t);b.onclick=fn};
 if(v==='quiz')return;if(v==='green'&&Z.bad)return B('Tip it out',tipOut);
 pots().forEach(k=>{if(!Z.used.includes(k)&&!(Z.blobs.length>=2))B(k==='water'?'Pour water':`Add ${k}`,()=>add(k))});
 if(ready()&&Z.st<3)B('Stir',stir);if(v==='sugar'&&Z.st>=3&&!Z.tasted)B('Taste it',taste);if(v==='sand'&&Z.st>=3&&!Z.settle)B('Wait and look',wait)}
let hold=null;
function down(p){if(scene()==='quiz')return false;for(let i=0;i<pots().length;i++)if(hit(p,potBox(i))){add(pots()[i]);return false}
 const b=bowl();if(Math.hypot(p.x-b.x,p.y-b.y)<b.r*1.1){hold={a:Math.atan2(p.y-b.y,p.x-b.x),acc:0,moved:0};return true}return false}
function move(p){if(!hold)return;const b=bowl(),a=Math.atan2(p.y-b.y,p.x-b.x);let d=a-hold.a;if(d>Math.PI)d-=2*Math.PI;if(d<-Math.PI)d+=2*Math.PI;hold.a=a;hold.acc+=Math.abs(d);
 if(hold.acc>Math.PI*1.2){hold.acc=0;hold.moved=1;stir()}}
function up(){if(hold&&!hold.moved)stir();hold=null}
const ok=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const seq=(fns,ms)=>{const k=++Z.tok;fns.forEach((fn,j)=>setTimeout(()=>{if(k===Z.tok)fn()},A.reduced()?j*40+40:(j+1)*ms))};
const fresh=()=>{const t=(Z.tok||0)+1;Object.keys(Z).forEach(k=>delete Z[k]);Object.assign(Z,{tok:t,want:()=>{},used:[],blobs:[],gr:[],st:0,mix:0,spin:-Math.PI/3,water:0,res:'',bad:0,tasted:0,settle:0,msg:''});hold=null};
const steps=[
{h:'Make dough',p:'Pour water on the flour. Then stir round and round.',task:'Make a ball of dough',
 show:()=>{steps[0].go();seq([()=>add('water'),stir,stir,stir],600)},
 go:()=>{fresh();Z.msg='Dry flour';speak('A bowl of dry flour and a jug of water. Pour, then stir.');buttons();Z.want=ok(0,()=>Z.mix>=1,'Flour and water make dough.')}},
{h:'Red and yellow',p:'Tap red. Tap yellow. Then stir the paint.',predict:{q:'Red and yellow mixed. What colour?',opts:['Orange','Red and yellow spots','Purple'],ans:0},task:'Mix red and yellow',
 show:()=>{steps[1].go();seq([()=>add('red'),()=>add('yellow'),stir,stir,stir],600)},
 go:()=>{fresh();Z.msg='An empty bowl';speak('Red paint, yellow paint and an empty bowl.');buttons();Z.want=ok(1,()=>Z.res==='orange'&&Z.mix>=1,'Red and yellow make orange.')}},
{h:'Make green',p:'Pick two paints that make green. Then stir.',task:'Make green paint',
 show:()=>{steps[2].go();seq([()=>add('blue'),()=>add('yellow'),stir,stir,stir],600)},
 go:()=>{fresh();Z.msg='Pick two paints';speak('Red, yellow and blue paint. Which two make green?');buttons();Z.want=ok(2,()=>Z.res==='green'&&Z.mix>=1,'Blue and yellow make green.')}},
{h:'Sugar in water',p:'Add sugar. Stir. Look. Then taste the water.',predict:{q:'You stir sugar into water. Where does it go?',opts:['It is still in the water','It is gone for ever','It makes the water white'],ans:0},task:'Stir in sugar, then taste',
 show:()=>{steps[3].go();seq([()=>add('sugar'),stir,stir,stir,taste],600)},
 go:()=>{fresh();Z.msg='A bowl of water';speak('A bowl of water and some sugar.');buttons();Z.want=ok(3,()=>Z.tasted,'Sugar dissolves. It is still there.')}},
{h:'Sand in water',p:'Add sand. Stir. Then wait and look.',predict:{q:'You stir sand into water, then wait. What happens?',opts:['It sinks to the bottom','It goes away, like sugar','It floats on top'],ans:0},task:'Stir the sand, then wait',
 show:()=>{steps[4].go();seq([()=>add('sand'),stir,stir,stir,wait],600)},
 go:()=>{fresh();Z.msg='A bowl of water';speak('A bowl of water and some sand.');buttons();Z.want=ok(4,()=>Z.settle>=1,'Sand sinks. It does not dissolve.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.want()});
const QS=[['Red and yellow paint mixed make…',[['Orange','ok'],['Purple','rb'],['Red and yellow spots','spots']]],
 ['Blue and yellow paint mixed make…',[['Green','ok'],['Orange','ry'],['Just blue','stay']]],
 ['You stir sugar into water. Where is the sugar?',[['Still in the water','ok'],['Gone for ever','gone'],['On the spoon','spoon']]],
 ['You stir sand into water and wait. Where is the sand?',[['At the bottom','ok'],['Gone, like sugar','likesugar'],['Floating on top','float']]],
 ['Flour and water stirred together make…',[['Dough','ok'],['Paint','paint'],['Dry flour','dry']]],
 ['Can you stir orange paint back into red and yellow?',[['No','ok'],['Yes, stir it the other way','unstir'],['Yes, just wait','wait']]]];
function why(t){let m='Mixing can make something new.';
 if(t==='rb')m='Red and blue make purple. Red and yellow make orange.';
 if(t==='spots')m='When you stir, the spots go. The two paints make one new colour: orange.';
 if(t==='ry')m='Red and yellow make orange. Blue and yellow make green.';
 if(t==='stay')m='The yellow changes the blue. Together they make green.';
 if(t==='gone')m='You cannot see it, but it is still there. Taste the water: it is sweet.';
 if(t==='spoon')m='The sugar went into the water. It dissolved, so you cannot see it.';
 if(t==='likesugar')m='Sand does not dissolve. It sinks, and you can still see it.';
 if(t==='float')m='Sand is heavy. It sinks to the bottom of the water.';
 if(t==='paint')m='Paint is made with colours. Flour and water make dough.';
 if(t==='dry')m='The water makes the flour wet and sticky. Stir and it turns into dough.';
 if(t==='unstir')m='Stirring the other way just mixes it more. You cannot get red and yellow back.';
 if(t==='wait')m='The paints stay mixed. Orange does not split back into red and yellow.';
 return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],rot=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});speak('Challenge: '+q);again()}
function judge(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),right=t==='ok';
 if(right){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=(right?'Yes! In a row: '+run+'.':'Not quite. '+why(t))+' <button type="button" class="linkish">Another question</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;pads.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pads=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);fresh();
  A.gest({down,move,up});buttons()}});
A.start()})})();
