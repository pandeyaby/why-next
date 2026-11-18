/* Flagship – rolling things down slopes (ages 4–5). Stack books under a board to make the slope steeper and let the car
   go: more books, faster and further across the floor. Test which toys roll (round ones) and which stay (flat sides),
   tip a tin can off its flat end onto its curved side so it rolls, race a steep ramp against a gentle one, then pick the
   slope that sends the car to the teddy. Every drag has a big button twin. */
(()=>{
const TOYS=[{e:'⚽',n:'ball',roll:1},{e:'🧱',n:'brick',roll:0},{e:'🍊',n:'orange',roll:1},{e:'📕',n:'book',roll:0},{e:'🧽',n:'sponge',roll:0}];
const TUBES=[{n:'tin can',col:'#c0392b',w:.95,h:1.3},{n:'kitchen roll',col:'#efe4cc',w:.85,h:1.7},{n:'fat crayon',col:'#2e86de',w:.6,h:1.9}];
const RACES=[[1,3],[4,2],[2,3]],GOALS=[2,4,1],START=[1,2,3],MAXB=4,BOOKC=['#2f80ed','#eb5757','#27ae60','#f2994a'];
const SAYB=['','a short way','a bit further','far','very far'];
VIS.reg('flagramp',c=>{let A,pad,quiz,qn=-1,gen=0,streak=0;c.fig.classList.add('young');
const blank=()=>({n:0,busy:0,drag:null,after:()=>{},books:1,marks:[],tried:[],runs:[],r:0,pick:-1,up:1,res:{},fast:0,msg:''}),S=blank();
const phase=()=>['height','toys','turn','race','teddy','quiz'][A.step];
const z=n=>Math.round(n*(A.narrow?1:1.12)),quick=()=>A.reduced()||S.fast;
const say=t=>{S.msg=t;c.say(t);A.cv.setAttribute('aria-label',t)};
function write(g,t,x,y,maxw,px,col,wt){g.font=`${wt||800} ${z(px)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;
 const rows=[];let cur='';String(t).split(' ').forEach(w=>{const n=cur?cur+' '+w:w;if(g.measureText(n).width>maxw&&cur){rows.push(cur);cur=w}else cur=n});rows.push(cur);
 rows.forEach((s,i)=>g.fillText(s,x,y+(i-(rows.length-1)/2)*z(px)*1.22))}
function emoji(g,e,x,y,s){g.fillStyle='#000';g.font=`${Math.round(s)}px system-ui,"Noto Color Emoji","Apple Color Emoji",sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(e,x,y)}
/* a lane is one floor with one ramp: books stack at the left, the board runs down to the floor, the floor runs right */
function lane(y,h){const fy=y+h-z(12),bh=Math.min(h*.12,z(40)),fx=A.W*.45,tx=A.W*.08,end=A.W-z(16);return{y,h,fy,bh,fx,tx,end,unit:(end-fx-z(40))/MAXB}}
const main=()=>lane(A.H*.14,A.H*.84),lanes=()=>[lane(A.H*.06,A.H*.44),lane(A.H*.52,A.H*.46)];
function board(L,b){const ty=L.fy-b*L.bh;return{x0:L.tx,y0:ty,x1:L.fx,y1:L.fy,len:Math.hypot(L.fx-L.tx,L.fy-ty)}}
function spot(L,b,s){const R=board(L,b);if(s<=R.len){const u=s/R.len;return{x:R.x0+(R.x1-R.x0)*u,y:R.y0+(R.y1-R.y0)*u,a:Math.atan2(R.y1-R.y0,R.x1-R.x0)}}return{x:R.x1+(s-R.len),y:L.fy,a:0}}
const far=(L,b)=>b*L.unit;
function scene(g,L,b,hot){const C=A.col,R=board(L,b),bw=z(44);
 g.fillStyle=C.dark?'#5b4636':'#d9c3a5';g.fillRect(z(4),L.fy,A.W-z(8),z(10));
 for(let i=0;i<b;i++){g.fillStyle=BOOKC[i%4];A.paint.rrect(L.tx-bw*.5,L.fy-(i+1)*L.bh+1,bw,L.bh-2,4);g.fill();g.fillStyle='rgba(255,255,255,.75)';g.fillRect(L.tx-bw*.5+4,L.fy-(i+1)*L.bh+L.bh*.4,bw-8,2)}
 g.strokeStyle='#8a5a2b';g.lineWidth=z(8);g.lineCap='round';g.beginPath();g.moveTo(R.x0,R.y0);g.lineTo(R.x1,R.y1);g.stroke();
 if(hot){g.strokeStyle=C.am;g.lineWidth=3;g.setLineDash([5,4]);g.beginPath();g.arc(R.x0,R.y0,z(22),0,7);g.stroke();g.setLineDash([])}}
function car(g,p,r,col){g.save();g.translate(p.x,p.y);g.rotate(p.a);g.fillStyle=col;A.paint.rrect(-r*1.5,-r*1.75,r*3,r*1.1,r*.35);g.fill();
 g.fillStyle='rgba(255,255,255,.85)';A.paint.rrect(-r*.5,-r*2.3,r*1.3,r*.65,r*.2);g.fill();g.fillStyle='#222';[-.85,.85].forEach(k=>{g.beginPath();g.arc(k*r,-r*.5,r*.48,0,7);g.fill()});g.restore()}
function toy(g,p,t,r,ang){g.save();g.translate(p.x,p.y);g.rotate(p.a);if(t.roll){g.translate(0,-r);g.rotate(ang||0);emoji(g,t.e,0,2,r*2.1)}else emoji(g,t.e,0,-r*.9,r*2);g.restore()}
function tube(g,p,t,u,up,ang){const w=t.w*u,h=t.h*u;g.save();g.translate(p.x,p.y);g.rotate(p.a);
 if(up){g.fillStyle=t.col;g.fillRect(-w/2,-h,w,h);g.fillStyle='rgba(0,0,0,.18)';g.fillRect(-w/2,-h,w*.2,h);g.fillStyle=A.mix(t.col,'#fff',.35);g.beginPath();g.ellipse(0,-h,w/2,w*.14,0,0,7);g.fill()}
 else{g.translate(0,-w/2);g.rotate(ang||0);g.fillStyle=t.col;g.beginPath();g.arc(0,0,w/2,0,7);g.fill();g.strokeStyle='rgba(0,0,0,.4)';g.lineWidth=2;g.stroke();g.beginPath();g.moveTo(0,0);g.lineTo(w/2,0);g.stroke()}
 g.restore()}
/* one thing let go at the top of a lane: it speeds up down the board, then slows to a stop on the floor */
function letGo(L,b,kind,cb,extra){const R=board(L,b),run={L,b,kind,t:0,Tr:kind==='stay'?.6:.75,Tf:kind==='stay'?0:1.1,s:0,R,d:kind==='stay'?0:far(L,b),cb,...extra};
 S.runs.push(run);if(quick()){run.t=run.Tr+run.Tf;move1(run);setTimeout(()=>fin(run),5)}A.redraw();return run}
function move1(r){if(r.kind==='stay'){r.s=0;r.wob=Math.sin(r.t*30)*(1-r.t/r.Tr)*.08;return}const t=r.t;r.s=t<r.Tr?r.R.len*(t/r.Tr)**2:r.R.len+r.d*(1-(1-Math.min(1,(t-r.Tr)/r.Tf))**2)}
function fin(r){if(!r.cb)return;const f=r.cb;r.cb=null;f()}
function tick(dt){let more=false;S.runs.forEach(r=>{if(!r.cb)return;r.t=Math.min(r.Tr+r.Tf,r.t+dt);move1(r);if(r.t>=r.Tr+r.Tf)fin(r);else more=true});return more}
function draw(A){const g=A.ctx,C=A.col,W=A.W,H=A.H,p=phase(),d=S.drag,cr=z(15);
 if(p==='quiz'){write(g,'Round things roll. A steeper slope makes them go faster and further.',W/2,H*.45,W-40,19);return}
 write(g,S.msg,W/2,z(20),W-24,15,C.tx);
 if(p==='height'||p==='teddy'){const L=main(),run=S.runs[S.runs.length-1];scene(g,L,S.books,!S.busy);
  S.marks.forEach(m=>{const x=L.fx+far(L,m.b)+cr*1.5;g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.moveTo(x,L.fy);g.lineTo(x,L.fy-z(34));g.stroke();g.fillStyle=BOOKC[(m.b-1)%4];g.beginPath();g.moveTo(x,L.fy-z(34));g.lineTo(x+z(18),L.fy-z(28));g.lineTo(x,L.fy-z(22));g.fill();write(g,String(m.b),x+z(9),L.fy-z(44),z(30),12,C.tx)});
  if(p==='teddy'){const k=GOALS[S.r%3];emoji(g,'🧸',L.fx+far(L,k)+cr*3.6,L.fy-z(17),z(34))}
  car(g,run?spot(L,run.b,run.s):spot(L,S.books,cr*2.4),cr,C.rd);
  write(g,`Slope: ${S.books} book${S.books>1?'s':''} high`,W/2,z(58),W-30,14,C.tx,700)}
 if(p==='toys'){const L=main(),run=S.runs[S.runs.length-1];scene(g,L,2,0);
  shelf().forEach((r,i)=>{const t=TOYS[i],k=S.res[i];g.fillStyle=k==null?A.alpha(C.am,.12):A.alpha(k?C.gr:C.vi,.16);A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=k==null?C.am:k?C.gr:C.vi;g.lineWidth=2;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke();
   g.globalAlpha=(run&&run.i===i)||(d&&d.i===i&&d.x!=null)?.3:1;emoji(g,t.e,r.x+r.w/2,r.y+r.h*.42,z(28));g.globalAlpha=1;write(g,k==null?t.n:k?'rolls':'stays',r.x+r.w/2,r.y+r.h-z(11),r.w-4,11,C.tx)});
  if(run)toy(g,spot(L,2,run.s+cr*1.4),TOYS[run.i],cr,run.s/cr);if(d&&d.x!=null)emoji(g,TOYS[d.i].e,d.x,d.y,z(34))}
 if(p==='turn'){const L=main(),t=TUBES[S.r%3],run=S.runs[S.runs.length-1],u=z(30);scene(g,L,3,0);
  const at=spot(L,3,u*1.9+(run&&run.kind!=='stay'?run.s:0));if(run&&run.wob)at.a+=run.wob;tube(g,at,t,u,S.up,run?run.s/(t.w*u/2):0);
  write(g,S.up?'Standing on its flat end':'Lying on its curved side',W*.66,H*.36,W*.6,13,C.tx,700)}
 if(p==='race'){const[a,b]=RACES[S.r%3];lanes().forEach((L,j)=>{const bk=j?b:a,run=S.runs.find(q=>q.j===j);scene(g,L,bk,0);
   if(S.pick===j){g.strokeStyle=C.am;g.lineWidth=3;A.paint.rrect(4,L.y,W-8,L.h,12);g.stroke()}
   car(g,run?spot(L,bk,run.s):spot(L,bk,cr*2.2),cr*.9,j?C.cy:C.vi);write(g,`${j?'Bottom':'Top'} ramp: ${bk} book${bk>1?'s':''}`,W*.7,L.y+L.h*.42,W*.5,13,C.tx,700)})}
 A.fx.draw(g)}
const shelf=()=>{const n=TOYS.length,w=Math.min(z(84),(A.W-24-(n-1)*8)/n),h=z(64),x0=A.W-12-(w*n+(n-1)*8);return TOYS.map((_,i)=>({x:Math.max(12,x0)+i*(w+8),y:A.H*.2,w,h}))};
function done1(t){S.n++;A.sound.pop();say(t);buttons();A.redraw();S.after()}
function miss(t){A.sound.miss();say(t);A.redraw()}
function setBooks(b){if(S.busy)return;b=Math.max(1,Math.min(MAXB,b));if(b===S.books)return;S.books=b;S.runs=[];A.sound.tick();say(`${b} book${b>1?'s':''}. ${b>2?'A steep slope.':'A gentle slope.'}`);buttons();A.redraw()}
function launch(){const p=phase();if(S.busy||S.n>=3||(p!=='height'&&p!=='teddy'))return;S.busy=1;S.runs=[];const b=S.books,g0=gen;
 letGo(main(),b,'car',()=>{if(g0!==gen)return;S.busy=0;if(p==='height'){S.marks=S.marks.filter(m=>m.b!==b).concat({b});
   const fresh=!S.tried.includes(b);if(fresh)S.tried.push(b);const t=`${b} book${b>1?'s':''}: the car went ${SAYB[b]}.${S.tried.length>1?' More books, steeper slope, further!':''}`;
   if(fresh)done1(t);else{say(t+' Try a new number of books.');buttons();A.redraw()}return}
  const k=GOALS[S.r%3];if(b<k)return miss('Not far enough. Add a book to make the slope steeper.'),buttons();if(b>k)return miss('Too far! Take a book off for a gentler slope.'),buttons();
  done1(S.n>=2?'Right by the teddy! You picked the slope.':'Right by the teddy! Next teddy.');if(S.n<3){const r0=S.r;setTimeout(()=>{if(g0!==gen||S.r!==r0)return;S.r++;S.books=START[S.r%3];S.runs=[];say('The teddy moved. How many books now?');buttons();A.redraw()},quick()?5:1200)}})}
function tryToy(i){if(phase()!=='toys'||S.busy||S.n>=3)return;if(S.res[i]!=null)return say(`You tried the ${TOYS[i].n}. Pick a new one.`);const t=TOYS[i],g0=gen;S.busy=1;S.runs=[];say(`Let go of the ${t.n}…`);
 const run=letGo(main(),2,t.roll?'roll':'stay',()=>{if(g0!==gen)return;S.busy=0;S.res[i]=t.roll;done1(t.roll?`The ${t.n} is round. It rolls down and away!`:`The ${t.n} has flat sides. It stays put.`)},{i})}
function layDown(){if(phase()!=='turn'||S.busy||!S.up)return;S.up=0;A.sound.tick();say(`The ${TUBES[S.r%3].n} is on its curved side now.`);roll2()}
function roll2(){if(phase()!=='turn'||S.busy||S.n>=3)return;const t=TUBES[S.r%3],g0=gen,r0=S.r;S.busy=1;S.runs=[];
 if(S.up)return letGo(main(),3,'stay',()=>{if(g0!==gen)return;S.busy=0;miss(`The ${t.n} stands on its flat end. It does not roll. Lay it on its side.`);buttons()});
 letGo(main(),3,'roll',()=>{if(g0!==gen)return;done1(`On its curved side the ${t.n} rolls!`);setTimeout(()=>{if(g0!==gen||S.r!==r0)return;S.busy=0;if(S.n>=3)return;S.r++;S.up=1;S.runs=[];say(`A ${TUBES[S.r%3].n}, standing on its flat end.`);buttons();A.redraw()},quick()?5:1200)})}
function race(j){if(phase()!=='race'||S.busy||S.n>=3)return;const[a,b]=RACES[S.r%3],steep=a>b?0:1,g0=gen,r0=S.r;S.pick=j;S.busy=1;S.runs=[];A.sound.tick();say(j===steep?'You picked the steeper ramp. Go!':'You picked the gentler ramp. Go!');let left=2;
 lanes().forEach((L,k)=>letGo(L,k?b:a,'car',()=>{if(g0!==gen||--left)return;done1(j===steep?'Yes! The steeper ramp sent its car further.':'The steeper ramp won. Its car went faster and further.');
  setTimeout(()=>{if(g0!==gen||S.r!==r0||S.n>=3)return;S.busy=0;S.r++;S.pick=-1;S.runs=[];say('New race. Which car will go further? Tap it.');buttons();A.redraw()},quick()?5:1400)},{j:k}))}
function buttons(){if(!pad)return;pad.innerHTML='';const p=phase(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=f;b.disabled=!!S.busy};if(p==='quiz'||S.n>=3)return;
 if(p==='height'||p==='teddy'){if(S.books<MAXB)B('📚 Add a book',()=>setBooks(S.books+1));if(S.books>1)B('➖ Take a book off',()=>setBooks(S.books-1));B('🚗 Let it go',launch)}
 if(p==='toys')TOYS.forEach((t,i)=>{if(S.res[i]==null)B(t.e+' '+t.n,()=>tryToy(i),'Put the '+t.n+' at the top of the slope')});
 if(p==='turn'){B('✋ Let go',roll2,'Let go of the '+TUBES[S.r%3].n);if(S.up)B('🔄 Lay it on its side',layDown)}
 if(p==='race')['Top car','Bottom car'].forEach((t,j)=>B('👆 '+t,()=>race(j),t+' will go further'))}
const near=(q,o,r)=>Math.hypot(q.x-o.x,q.y-o.y)<r,within=(q,r)=>q.x>r.x&&q.x<r.x+r.w&&q.y>r.y&&q.y<r.y+r.h;
function down(q){const p=phase();if(p==='quiz'||S.busy||S.n>=3)return false;
 if(p==='height'||p==='teddy'){const L=main(),R=board(L,S.books);if(near(q,{x:R.x0,y:R.y0},z(30))){S.drag={top:1};return true}if(near(q,spot(L,S.books,z(40)),z(40))&&!S.runs.length)launch();return false}
 if(p==='toys'){const i=shelf().findIndex(r=>within(q,r));if(i<0||S.res[i]!=null)return false;S.drag={i,x:null,x0:q.x,y0:q.y};return true}
 if(p==='turn'){const L=main(),at=spot(L,3,z(57));if(near(q,{x:at.x,y:at.y-z(26)},z(60))){S.drag={x0:q.x,y0:q.y,x:null};return true}return false}
 if(p==='race'){const j=lanes().findIndex(L=>q.y>L.y&&q.y<L.y+L.h);if(j>=0)race(j);return false}return false}
function move(q){const d=S.drag;if(!d)return;if(d.top){const L=main();setBooks(Math.round((L.fy-q.y)/L.bh));return}if(d.x!=null||Math.hypot(q.x-d.x0,q.y-d.y0)>8){d.x=q.x;d.y=q.y;A.redraw()}}
function up(q){const d=S.drag,p=phase();S.drag=null;if(!d||d.top)return;
 if(p==='toys'){if(d.x==null)return tryToy(d.i);const R=board(main(),2);if(near(q,{x:R.x0,y:R.y0},z(80)))tryToy(d.i);else{say('Drop it at the top of the slope.');A.redraw()}return}
 if(p==='turn'){if(d.x!=null&&S.up&&Math.abs(q.x-d.x0)>z(24))return layDown();roll2()}}
const finish=(i,msg)=>()=>{if(A.step===i&&S.n>=3&&(!steps[i].predict||A.pred[i]!=null))A.done(msg+A.reveal(i))};
function auto(f){const k=++gen,go=()=>{if(k!==gen||S.n>=3)return;f();setTimeout(go,60)};setTimeout(go,30)}
const reset=()=>{gen++;Object.assign(S,blank())};
function oneMove(){const p=phase();if(S.busy)return;
 if(p==='height'){const nb=[1,2,4,3].find(b=>!S.tried.includes(b));if(S.books!==nb)return setBooks(nb);return launch()}
 if(p==='teddy'){const k=GOALS[S.r%3];if(S.books!==k)return setBooks(k);return launch()}
 if(p==='toys')return tryToy(TOYS.findIndex((_,i)=>S.res[i]==null));if(p==='turn')return S.up?layDown():roll2();if(p==='race'){const[a,b]=RACES[S.r%3];return race(a>b?0:1)}}
const show=i=>()=>{steps[i].go();S.fast=1;auto(oneMove)};
const steps=[
{h:'Make it steeper',p:'Drag the top of the board up, or tap Add a book. Then let the car go. A flag shows where it stops.',predict:{q:'More books make the slope steeper. What will the car do?',opts:['Go slower, not as far','Go faster and further'],ans:1},task:'Roll the car from 3 heights',show:show(0),
 go:()=>{reset();say('1 book. A gentle slope. Let the car go.');buttons();S.after=finish(0,'More books make a steeper slope. The car goes faster and further.')}},
{h:'Does it roll?',p:'Drag a toy to the top of the slope, or tap its button. Watch what it does.',predict:{q:'Will a brick roll down like a ball?',opts:['Yes, it will roll','No, it will stay'],ans:1},task:'Test 3 toys',show:show(1),
 go:()=>{reset();say('Drag a toy to the top of the slope.');buttons();S.after=finish(1,'Round things roll. Things with flat sides stay put.')}},
{h:'Turn it to roll',p:'This tin can stands on its flat end. Let go and see. Then drag it sideways, or tap Lay it on its side.',predict:{q:'A tin can is round. Standing on its flat end, will it roll?',opts:['Yes, it is round','No, not on its flat end'],ans:1},task:'Make 3 things roll',show:show(2),
 go:()=>{reset();say('A tin can, standing on its flat end.');buttons();S.after=finish(2,'It must touch the slope with its curved side to roll.')}},
{h:'Steep or gentle?',p:'Two ramps, two cars. Tap the car you think will go further. Then watch the race.',task:'Run 3 races',show:show(3),
 go:()=>{reset();say('Which car will go further? Tap it.');buttons();S.after=finish(3,'The steeper ramp wins every time. Same car, only the slope changed.')}},
{h:'Reach the teddy',p:'Pick how many books, then let the car go. Make it stop right by the teddy.',task:'Reach the teddy 3 times',show:show(4),
 go:()=>{reset();say('How many books will send the car to the teddy?');buttons();S.after=finish(4,'Steeper to go further, gentler to stop sooner.')}},
{h:'Challenge',p:'',go:()=>{reset();challenge()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.after()});
const QS=[['Which ramp makes the car go faster?',[['The steep one','ok'],['The gentle one','gentle'],['They are the same','same']]],
 ['Which one will roll down a slope?',[['A ball','ok'],['A brick','flat'],['A book','flat']]],
 ['A tin can stands on its flat end on a slope. What happens?',[['It stays put','ok'],['It rolls down','round'],['It goes up the slope','up']]],
 ['The car stops before the teddy. What should you do?',[['Make the slope steeper','ok'],['Make it less steep','less'],['Push the teddy away','teddy']]],
 ['Why does a ball roll when a box does not?',[['The ball is round','ok'],['The ball is heavier','heavy'],['The box is a colour','colour']]]];
function why(t){let m='Round things roll. A steeper slope is faster.';
 if(t==='gentle')m='A gentle slope is slow. More books make it steep, and steep is faster.';if(t==='same')m='Not the same. The race showed the steep ramp car goes faster and further.';
 if(t==='flat')m='That has flat sides, so it stays put. A ball is round, so it rolls.';if(t==='round')m='It is round, but it stands on a flat end. Only its curved side can roll.';
 if(t==='up')m='Things never roll up by themselves. The Earth pulls them down.';if(t==='less')m='Less steep makes it stop even sooner. Add a book to go further.';
 if(t==='teddy')m='Keep the teddy. Change the slope: steeper sends the car further.';if(t==='heavy')m='Weight is not it. A light ball rolls and a heavy brick stays. Round shapes roll.';
 if(t==='colour')m='Colour does not matter. Shape does: round things roll, flat sides stay.';return m}
function challenge(){qn++;const[q,ops]=QS[qn%QS.length],rot=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});say('Challenge: '+q);A.redraw()}
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Yes! You know how things roll.':'✗ '+why(t)}${ok?` Stars in a row: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=challenge}
A=FK.shell(c,{steps,ratio:.66,tall:1.2,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);reset();A.every(tick);A.gest({down,move,up});buttons()}});
A.start()})})();
