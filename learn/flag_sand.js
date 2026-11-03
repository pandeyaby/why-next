/* Flagship – exploring sand and water (ages 2–3, EYFS Development Matters birth to three, Understanding the World:
   "explore materials with different properties" and "explore natural materials, indoors and outside"). Scoop dry sand
   into a bucket, tip it out and watch it fall into a heap, water the sand, tip out a wet-sand castle that keeps its
   shape, and pour water until a cup is full. Targets the toddler ideas that all sand makes a castle, that water makes
   sand fall apart, and that a full cup can still take more. */
(()=>{
VIS.reg('flagsand',c=>{let A,pads,quiz,qn=-1,run=0;c.fig.classList.add('young');const Z={};
const scene=()=>['scoop','dry','water','wet','cups','quiz'][A.step];
const speak=s=>{c.say(s);if(A)A.cv.setAttribute('aria-label',s)};
const big=n=>Math.round(n*(A.narrow?1.08:1.25)),again=()=>A.redraw();
function word(g,s,x,y,n,colr,wt){g.font=`${wt||800} ${big(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=colr||A.col.tx;g.fillText(s,x,y,A.W-14)}
const ink=(g,colr,a)=>{g.fillStyle=A.mix(A.col.pn,colr,a);g.fill();g.lineWidth=2.5;g.strokeStyle=A.col.tx;g.stroke()};
const sandCol=w=>A.mix('#e6c48a','#8a5a2b',w*.85);
const cupBox=i=>{const w=Math.min(A.W*.2,A.H*.32),gap=(A.W-3*w)/4;return{x:gap+i*(w+gap),y:A.H*.42,w,h:w*1.15}};
const hit=(p,r)=>p.x>r.x-8&&p.x<r.x+r.w+8&&p.y>r.y-8&&p.y<r.y+r.h+8;
function pail(g,x,y,w,h,lvl,wet,up){g.save();g.translate(x,y);if(up)g.scale(1,-1);
 g.beginPath();g.moveTo(-w/2,-h/2);g.lineTo(w/2,-h/2);g.lineTo(w*.38,h/2);g.lineTo(-w*.38,h/2);g.closePath();ink(g,A.col.cy,.28);
 if(lvl>0){const top=h/2-h*lvl;g.beginPath();g.moveTo(-w*.38-(w*.12)*(1-(top+h/2)/h),top);g.lineTo(w*.38+(w*.12)*(1-(top+h/2)/h),top);g.lineTo(w*.38,h/2);g.lineTo(-w*.38,h/2);g.closePath();g.fillStyle=sandCol(wet);g.fill()}
 g.beginPath();g.arc(0,-h/2,w*.45,Math.PI,0);g.lineWidth=2;g.strokeStyle=A.col.tx;g.stroke();g.restore()}
function heap(g,x,base,w,h,wet){g.beginPath();g.moveTo(x-w/2,base);g.quadraticCurveTo(x,base-h*2,x+w/2,base);g.closePath();g.fillStyle=sandCol(wet);g.fill();g.lineWidth=2;g.strokeStyle=A.col.tx;g.stroke()}
function castle(g,x,base,w,h,wet,slump){const hh=h*(1-slump*.8),ww=w*(1+slump*.9);if(slump>.5)return heap(g,x,base,w*2.1,h*.3,wet);
 g.beginPath();g.moveTo(x-ww/2,base);g.lineTo(x-ww*.38,base-hh);for(let k=0;k<4;k++){const a=x-ww*.38+k*ww*.19;g.lineTo(a,base-hh-10);g.lineTo(a+ww*.095,base-hh-10);g.lineTo(a+ww*.095,base-hh)}
 g.lineTo(x+ww*.38,base-hh);g.lineTo(x+ww/2,base);g.closePath();g.fillStyle=sandCol(wet);g.fill();g.lineWidth=2.5;g.strokeStyle=A.col.tx;g.stroke()}
function draw(A){const{ctx:g,W,H,col:K}=A,v=scene();g.fillStyle=A.mix(K.pn,K.or,K.dark?.05:.1);g.fillRect(0,0,W,H);
 const ground=H*.86;g.fillStyle=A.mix(K.pn,K.or,.22);g.fillRect(0,ground,W,H-ground);
 if(v==='quiz'){word(g,'Dry sand pours',W/2,H*.3,18);word(g,'Wet sand sticks and keeps a shape',W/2,H*.46,15);word(g,'Full means no more fits',W/2,H*.64,15,K.mu);return}
 const bw=Math.min(W*.24,H*.36),bh=bw*.95;
 if(v==='scoop'){heap(g,W*.24,ground,W*.34,H*.2,0);pail(g,W*.72,ground-bh/2,bw,bh,Z.fill,0);Z.grains.forEach(q=>{g.beginPath();g.arc(q.x,q.y,3,0,7);g.fillStyle=sandCol(0);g.fill()});
  word(g,Z.fill>=1?'The bucket is full!':`Scoops: ${Z.n} of 3`,W/2,24,16)}
 if(v==='dry'||v==='wet'){const wet=v==='wet'?1:0,lift=Z.lift;
  if(Z.tipped){castle(g,W/2,ground,bw*1.25,bh*1.1,wet,wet?0:Z.slump);if(lift<1)pail(g,W/2,ground-bh/2-lift*H*.35,bw,bh,0,wet,1)}
  else pail(g,W/2,ground-bh/2,bw,bh,1,wet,0);
  word(g,Z.tipped&&lift>=1?(wet?'It stands up! Wet sand sticks.':'It falls down. Dry sand pours.'):(wet?'A bucket of wet sand':'A bucket of dry sand'),W/2,24,16)}
 if(v==='water'){const tx=W*.18,tw=W*.64,th=H*.22;g.beginPath();g.rect(tx,ground-th,tw,th);g.fillStyle=sandCol(Z.wet);g.fill();g.lineWidth=2.5;g.strokeStyle=K.tx;g.stroke();
  const cx=W*.72,cy=H*.3;g.save();g.translate(cx,cy);g.rotate(-Z.tilt*.6);g.scale(1.5,1.5);g.beginPath();g.rect(-bw*.35,-bw*.25,bw*.6,bw*.5);ink(g,K.gr,.4);g.beginPath();g.moveTo(-bw*.35,-bw*.1);g.lineTo(-bw*.75,-bw*.35);g.lineWidth=6;g.strokeStyle=K.tx;g.stroke();g.restore();
  Z.drops.forEach(d=>{g.beginPath();g.arc(d.x,d.y,4,0,7);g.fillStyle=K.cy;g.fill()});
  word(g,Z.wet>=1?'Now the sand is wet and dark':Z.wet>0?'A bit wet. More water!':'Dry sand. Water it!',W/2,24,16)}
 if(v==='cups'){for(let i=0;i<3;i++){const r=cupBox(i),f=Z.cup[i];g.beginPath();g.rect(r.x,r.y,r.w,r.h);g.lineWidth=3;g.strokeStyle=K.tx;g.stroke();
   if(f>0){g.fillStyle=A.alpha(K.cy,.5);g.fillRect(r.x+2,r.y+r.h-r.h*f,r.w-4,r.h*f-2)}
   if(Z.spill===i){g.beginPath();g.ellipse(r.x+r.w/2,r.y+r.h+12,r.w*.7,8,0,0,7);g.fillStyle=A.alpha(K.cy,.45);g.fill()}
   word(g,f>=1?'full':f>0?'half':'empty',r.x+r.w/2,r.y-14,13,K.tx,700)}
  word(g,`Full cups: ${Z.tgt.filter(f=>f>=1).length} of 3`,W/2,22,15)}
 A.fx.draw(g)}
const oops=s=>{A.sound.miss();speak(s);again()},yay=s=>{A.sound.pop();speak(s);buttons();again();Z.want()};
/* step 0: scoop */
function scoop(){if(scene()!=='scoop'||Z.fill>=1)return;Z.n++;A.sound.tick();for(let i=0;i<8;i++)Z.grains.push({x:A.W*.62+Math.random()*A.W*.2,y:A.H*.2-i*6,v:120+i*10});A.kick();
 A.tween(Z,{fill:Math.min(1,Z.n/3)},500,'out');if(Z.n<3){speak(`Scoop! Dry sand pours in. ${3-Z.n} more.`);return again()}yay('The bucket is full of dry sand. It poured in like water.')}
/* steps 1 and 3: tip the bucket */
function tip(){const v=scene();if((v!=='dry'&&v!=='wet')||Z.tipped)return;Z.tipped=1;A.sound.whoosh();
 A.tween(Z,{lift:1},900,'out',()=>{if(v==='dry'){A.tween(Z,{slump:1},700,'out',()=>yay('It fell down into a heap. Dry sand does not stick, so it cannot keep a shape.'))}else yay('A castle! Wet sand sticks together, so it keeps the bucket shape.')});again()}
/* step 2: water */
function pourCan(){if(scene()!=='water'||Z.wt>=1)return;A.sound.whoosh();A.tween(Z,{tilt:1},250,'out',()=>A.tween(Z,{tilt:0},350));
 for(let i=0;i<10;i++)Z.drops.push({x:A.W*.55-Math.random()*A.W*.3,y:A.H*.35-i*8});A.kick();const to=Math.min(1,Z.wt+.5);
 Z.wt=to;A.tween(Z,{wet:to},600,'out',()=>{if(to>=1)yay('The sand is wet now. Wet sand looks darker.')});if(to<1){speak('Splash! The sand is a bit wet. Water it once more.');return again()}}
/* step 4: fill cups */
function pourCup(i){if(scene()!=='cups')return;const f=Z.tgt[i];
 if(f>=1){Z.spill=i;A.fx.add(10,j=>({x:cupBox(i).x+cupBox(i).w/2,y:cupBox(i).y,vx:(j-5)*30,vy:-60,g:400,life:.6,r:3,col:A.col.cy}));A.kick();return oops('That cup is full. No more fits, so the water spills over. Fill an empty cup.')}
 A.sound.tick();Z.spill=-1;Z.tgt[i]=f+.5;const done=Z.tgt.filter(x=>x>=1).length;
 A.tween(Z.cup,{[i]:f+.5},400,'out',()=>{if(done===3)yay('All 3 cups are full. A full cup has no room for more.')});
 if(f+.5<1){speak('Half full. Pour once more.');buttons();return again()}
 if(done<3){speak(`Full to the top! ${3-done} more cups.`);buttons();return again()}}
function buttons(){if(!pads)return;pads.innerHTML='';const v=scene(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pads,t);b.onclick=fn};
 if(v==='scoop'&&Z.fill<1)B('Scoop sand',scoop);
 if((v==='dry'||v==='wet')&&!Z.tipped)B('Tip the bucket',tip);
 if(v==='water'&&Z.wt<1)B('Pour water',pourCan);
 if(v==='cups')[0,1,2].forEach(i=>B(`Pour in cup ${i+1}`,()=>pourCup(i),`Pour water in cup ${i+1}, now ${Z.tgt[i]>=1?'full':Z.tgt[i]>0?'half full':'empty'}`))}
let hold=null;
function down(p){const v=scene();if(v==='scoop'){scoop();return false}if(v==='dry'||v==='wet'){tip();return false}if(v==='water'){pourCan();return false}
 if(v==='cups'){for(let i=0;i<3;i++)if(hit(p,cupBox(i))){pourCup(i);return false}hold={x:p.x};return true}return false}
function move(p){if(!hold)return;for(let i=0;i<3;i++){const r=cupBox(i);if(p.x>r.x&&p.x<r.x+r.w&&Z.tgt[i]<1&&hold.i!==i){hold.i=i;pourCup(i)}}}
const ok=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const seq=(fns,ms)=>{const k=++Z.tok;fns.forEach((fn,j)=>setTimeout(()=>{if(k===Z.tok)fn()},A.reduced()?j*30+30:(j+1)*ms))};
const fresh=()=>{const t=(Z.tok||0)+1;Object.keys(Z).forEach(k=>delete Z[k]);Object.assign(Z,{tok:t,want:()=>{},n:0,fill:0,grains:[],tipped:0,lift:0,slump:0,wet:0,wt:0,tilt:0,drops:[],cup:[0,0,0],tgt:[0,0,0],spill:-1});hold=null};
const steps=[
{h:'Scoop the sand',p:'Tap to scoop dry sand into the bucket.',task:'Fill the bucket',
 show:()=>{steps[0].go();seq([scoop,scoop,scoop],700)},
 go:()=>{fresh();speak('A pile of dry sand and a bucket. Tap to scoop.');buttons();Z.want=ok(0,()=>Z.fill>=1||Z.n>=3,'Dry sand pours in.')}},
{h:'Dry sand castle?',p:'Tip the bucket over. Lift it up. Look!',predict:{q:'Will dry sand make a castle?',opts:['No, it falls down','Yes, it stands up','It turns into water'],ans:0},task:'Tip the bucket',
 show:()=>{steps[1].go();seq([tip],400)},
 go:()=>{fresh();speak('A bucket full of dry sand. Tip it over.');buttons();Z.want=ok(1,()=>Z.slump>=1,'Dry sand falls down.')}},
{h:'Add water',p:'Tap the watering can. Pour water on the sand.',task:'Make the sand wet',
 show:()=>{steps[2].go();seq([pourCan,pourCan],800)},
 go:()=>{fresh();speak('Dry sand in a tray and a watering can. Pour water.');buttons();Z.want=ok(2,()=>Z.wet>=1,'Water makes sand wet.')}},
{h:'Wet sand castle?',p:'Now the sand is wet. Tip the bucket over.',predict:{q:'Will wet sand make a castle?',opts:['Yes, it keeps its shape','No, the water makes it fall','It pours out like water'],ans:0},task:'Tip the wet bucket',
 show:()=>{steps[3].go();seq([tip],400)},
 go:()=>{fresh();speak('A bucket full of wet sand. Tip it over.');buttons();Z.want=ok(3,()=>Z.tipped&&Z.lift>=1,'Wet sand keeps a shape.')}},
{h:'Fill the cups',p:'Tap a cup to pour water in. Fill each cup to the top.',predict:{q:'A cup is full. Can more water go in?',opts:['No, it spills over','Yes, lots more','Yes, if I pour fast'],ans:0},task:'Make 3 cups full',
 show:()=>{steps[4].go();seq([0,0,1,1,2,2].map(i=>()=>pourCup(i)),600)},
 go:()=>{fresh();speak('3 empty cups and a jug of water. Tap a cup to pour.');buttons();Z.want=ok(4,()=>Z.tgt.every(f=>f>=1),'Full means no more fits.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.want()});
const QS=[['Which sand makes a castle?',[['Wet sand','ok'],['Dry sand','dry'],['No sand','none']]],
 ['Which sand pours like water?',[['Dry sand','ok'],['Wet sand','wetpour'],['Sand in a castle','castle']]],
 ['What happens to a dry sand castle?',[['It falls down','ok'],['It stands up','stands'],['It gets bigger','bigger']]],
 ['The cup is full. You pour more water. What happens?',[['It spills over','ok'],['It all fits in','fits'],['The cup gets bigger','grow']]],
 ['What does water do to sand?',[['Makes it stick together','ok'],['Makes it fly away','fly'],['Makes it fall apart','apart']]],
 ['What colour is wet sand?',[['Darker','ok'],['White','white'],['The same','same']]]];
function why(t){let m='Dry sand pours. Wet sand sticks and keeps a shape.';
 if(t==='dry')m='Dry sand pours and falls down. Add some water to make it stick.';
 if(t==='none')m='We need sand to make a castle. Wet sand works best.';
 if(t==='wetpour')m='Wet sand sticks together in lumps. It is dry sand that pours.';
 if(t==='castle')m='A castle keeps its shape. It is dry sand that pours.';
 if(t==='stands')m='Dry sand cannot stick together, so the castle falls down.';
 if(t==='bigger')m='The sand does not grow. Dry sand slides down into a heap.';
 if(t==='fits')m='A full cup has no room. The water goes over the top.';
 if(t==='grow')m='The cup stays the same size. The extra water spills out.';
 if(t==='fly')m='Water makes sand heavy and sticky, so it does not fly away.';
 if(t==='apart')m='A little water helps sand stick together. That is why wet sand makes a castle.';
 if(t==='white')m='Wet sand looks darker, not white. Look at the tray when you pour.';
 if(t==='same')m='Look again: wet sand turns darker than dry sand.';
 return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],rot=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});speak('Challenge: '+q);again()}
function judge(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),right=t==='ok';
 if(right){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=(right?'Yes! In a row: '+run+'.':'Not quite. '+why(t))+' <button type="button" class="linkish">Another question</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;pads.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pads=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);fresh();
  A.gest({down,move,up:()=>{hold=null}});
  A.every(dt=>{let live=false;const fall=a=>{a.forEach(q=>{q.y+=(q.v||160)*dt});return a.filter(q=>q.y<A.H*.8)};
   if(Z.grains.length){Z.grains=fall(Z.grains);live=true}if(Z.drops.length){Z.drops=fall(Z.drops);live=true}return live});buttons()}});
A.start()})})();
