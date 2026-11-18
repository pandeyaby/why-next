/* Flagship: animal life stages (ages 6-7; NC Year 2 Animals including humans "notice that animals, including humans,
   have offspring which grow into adults"; NGSS 1-LS3-1 young animals are like, but not exactly like, their parents).
   Grow one person from baby to older adult along an age line, put the human stages in order, grow a litter of
   kittens into cats that keep their own coats, race a mouse, a dog and a child to grown-up on one time line, and sort
   what changes and what stays the same as we grow. Distinct from flagbaby (matching babies to mothers and naming
   them), flagcycle (circular life-cycle diagrams) and flaghatch (eggs or live birth): here the idea is growing up
   through stages over time. */
(()=>{
VIS.reg('flaglifest',c=>{let A,ctl,ask,qk=-1,tick=0;const Z={};c.fig.classList.add('young');
const INK='#0f172a',SKIN='#d4a373',SHIRT='#2563eb',GREY='#94a3b8',OKG='#047857',HAIR='#3f2a1d';
const STAGES=[{n:'baby',from:0,h:.3,head:.42},{n:'child',from:3,h:.55,head:.3},{n:'teenager',from:13,h:.85,head:.22},{n:'adult',from:20,h:.95,head:.2},{n:'older adult',from:65,h:.9,head:.2}];
const JUMBLE=[3,0,4,2,1];
const KITS=[{c:'#111827',n:'black'},{c:'#ea580c',n:'ginger'},{c:'#9ca3af',n:'grey'}];
const RACE=[{n:'mouse',adult:2/12,say:'about 2 months'},{n:'dog',adult:1.5,say:'about 1 to 2 years'},{n:'child',adult:18,say:'about 18 years'}];
const CARDS=[['Gets taller',1],['Is still a human',0],['Baby teeth fall out',1],['Has the same number of eyes',0],['Learns to walk and talk',1],['Hair can turn grey',1]];
const which=()=>['age','order','kits','race','change','chal'][A.step];
const bnd=(v,a,b)=>v<a?a:v>b?b:v;
function chip(t,x,y,o){o=o||{};const g=A.ctx;let f=o.f||(A.narrow?14:16);g.font=`800 ${f}px system-ui,sans-serif`;let w=g.measureText(t).width+18;
 while(w>A.W-8&&f>10){f--;g.font=`800 ${f}px system-ui,sans-serif`;w=g.measureText(t).width+18}const h=f+13,l=bnd(x-w/2,4,A.W-w-4);
 g.fillStyle='#ffffff';A.paint.rrect(l,y-h/2,w,h,9);g.fill();g.lineWidth=o.good?3:1.5;g.strokeStyle=o.good?OKG:'#64748b';g.stroke();
 g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,l+w/2,y+1)}
function ground(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#f0fdf4',A.col.dark?.1:.6);g.fillRect(0,0,A.W,A.H)}
/* a person standing on baseline y, total height H, drawn for stage s */
function person(x,y,H,s){const g=A.ctx,S=STAGES[s],hr=H*S.head/2,body=H-hr*2;g.lineCap='round';
 g.strokeStyle=SKIN;g.lineWidth=Math.max(3,H*.07);g.beginPath();g.moveTo(x-H*.05,y-body*.45);g.lineTo(x-H*.08,y);g.moveTo(x+H*.05,y-body*.45);g.lineTo(x+H*.08,y);g.stroke();
 g.fillStyle=s===0?'#e0e7ff':SHIRT;A.paint.rrect(x-H*.11,y-body,H*.22,body*.6,H*.05);g.fill();
 g.strokeStyle=SKIN;g.beginPath();g.moveTo(x-H*.1,y-body*.9);g.lineTo(x-H*.18,y-body*.45);g.moveTo(x+H*.1,y-body*.9);g.lineTo(x+H*.18,y-body*.45);g.stroke();
 g.fillStyle=SKIN;g.beginPath();g.arc(x,y-body-hr,hr,0,7);g.fill();if(s>0){g.fillStyle=s===4?'#e5e7eb':HAIR;g.beginPath();g.arc(x,y-body-hr*1.15,hr*.95,Math.PI,0);g.fill()}
 g.fillStyle=INK;g.beginPath();g.arc(x-hr*.35,y-body-hr,Math.max(1.5,hr*.1),0,7);g.arc(x+hr*.35,y-body-hr,Math.max(1.5,hr*.1),0,7);g.fill();
 if(s===4){g.strokeStyle='#78350f';g.lineWidth=Math.max(2,H*.03);g.beginPath();g.moveTo(x+H*.2,y-body*.5);g.lineTo(x+H*.24,y);g.stroke()}}
function cat(x,y,sz,col,grown){const g=A.ctx,b=sz;g.fillStyle=col;g.strokeStyle=A.col.dark?'#e5e7eb':col;g.lineWidth=1.5;g.beginPath();g.ellipse(x,y-b*.35,b*.55,b*.3,0,0,7);g.fill();g.stroke();
 const hx=x+b*.5,hy=y-b*.65,hr=b*(grown?.22:.3);g.beginPath();g.arc(hx,hy,hr,0,7);g.fill();g.stroke();g.beginPath();g.moveTo(hx-hr*.8,hy-hr*.4);g.lineTo(hx-hr*.5,hy-hr*1.5);g.lineTo(hx-hr*.05,hy-hr*.8);g.moveTo(hx+hr*.8,hy-hr*.4);g.lineTo(hx+hr*.5,hy-hr*1.5);g.lineTo(hx+hr*.05,hy-hr*.8);g.fill();
 g.strokeStyle=col;g.lineWidth=Math.max(3,b*.08);g.lineCap='round';g.beginPath();g.moveTo(x-b*.5,y-b*.4);g.quadraticCurveTo(x-b*.85,y-b*.9,x-b*.6,y-b*1.05);g.stroke();
 g.fillStyle='#fef08a';g.beginPath();g.arc(hx-hr*.35,hy-hr*.1,Math.max(1.5,hr*.14),0,7);g.arc(hx+hr*.35,hy-hr*.1,Math.max(1.5,hr*.14),0,7);g.fill()}
function beast(k,x,y,sz,grown){const g=A.ctx,s=sz*(grown?1:.55);if(k==='child')return person(x,y,s*1.3,grown?3:1);
 const col=k==='mouse'?'#6b7280':'#92400e';g.fillStyle=col;g.beginPath();g.ellipse(x,y-s*.3,s*.5,s*.26,0,0,7);g.fill();g.beginPath();g.arc(x+s*.48,y-s*.45,s*.2,0,7);g.fill();
 if(k==='mouse'){g.fillStyle='#f9a8d4';g.beginPath();g.arc(x+s*.42,y-s*.66,s*.1,0,7);g.fill()}else{g.beginPath();g.ellipse(x+s*.4,y-s*.42,s*.07,s*.17,.3,0,7);g.fill()}
 g.strokeStyle=col;g.lineWidth=Math.max(2,s*.07);g.beginPath();g.moveTo(x-s*.25,y-s*.1);g.lineTo(x-s*.25,y);g.moveTo(x+s*.25,y-s*.1);g.lineTo(x+s*.25,y);g.moveTo(x-s*.5,y-s*.3);g.lineTo(x-s*.75,y-s*(k==='mouse'?.2:.55));g.stroke()}
/* 0: grow one person along an age line */
function stageAt(age){let s=0;STAGES.forEach((S,i)=>{if(age>=S.from)s=i});return s}
function track(){return{x:A.W*.08,w:A.W*.84,y:A.H*.88,max:80}}
function drawAge(){ground();const G=Z.age,T=track(),g=A.ctx,s=stageAt(G.age);person(A.W/2,A.H*.76,A.H*.6*STAGES[s].h,s);
 g.strokeStyle=A.col.tx;g.lineWidth=3;g.beginPath();g.moveTo(T.x,T.y);g.lineTo(T.x+T.w,T.y);g.stroke();
 STAGES.forEach((S,i)=>{const x=T.x+S.from/T.max*T.w;g.lineWidth=2;g.beginPath();g.moveTo(x,T.y-8);g.lineTo(x,T.y+8);g.stroke();if(G.seen[i])chip(String(S.from),x,T.y+(i%2?-24:24),{f:10})});
 const kx=T.x+G.age/T.max*T.w;g.fillStyle=OKG;g.beginPath();g.arc(kx,T.y,13,0,7);g.fill();g.strokeStyle='#ffffff';g.lineWidth=3;g.stroke();
 chip(`Age ${Math.round(G.age)}: ${STAGES[s].n}`,A.W/2,A.H*.08,{good:G.seen.every(Boolean)});chip('age in years',A.W*.82,A.H*.8,{f:10})}
function setAge(a){const G=Z.age,before=stageAt(G.age);G.age=bnd(a,0,80);const s=stageAt(G.age);G.seen[s]=1;if(s!==before){A.sound.pop();
  tell(['A baby. Babies need grown-ups to feed them and keep them safe.','A child. Children grow taller and learn to walk, talk and read.','A teenager. Teenagers grow fast and their bodies change into adult bodies.','An adult. Adults have stopped growing taller. Many have babies of their own.','An older adult. Hair can turn grey, but they are still the same person.'][s])}else A.redraw()}
function grow(){const s=stageAt(Z.age.age);if(s>=4)return tell('An older adult is the last stage. People do not grow back into babies.');setAge(STAGES[s+1].from+1)}
/* 1: order the stages */
function drawOrder(){ground();const O=Z.order,left=JUMBLE.filter(i=>!O.row.includes(i)),gap=A.W/5;
 left.forEach((s,i)=>{const x=gap*(i+.5);person(x,A.H*.44,A.H*.3*STAGES[s].h,s);chip(STAGES[s].n,x,A.H*(i%2?.56:.5),{f:10})});
 O.row.forEach((s,i)=>{const x=gap*(i+.5);person(x,A.H*.86,A.H*.3*STAGES[s].h,s);chip(String(i+1),x,A.H*.92,{f:10})});
 chip(O.row.length===5?'Baby, child, teenager, adult, older adult':'Tap the youngest one left',A.W/2,A.H*.07,{good:O.row.length===5})}
function pick(s){const O=Z.order;if(O.row.includes(s))return;const want=[0,1,2,3,4].find(i=>!O.row.includes(i));
 if(s!==want){A.sound.miss();return tell(`Not yet. The ${STAGES[want].n} is younger than the ${STAGES[s].n}. Everyone is a ${STAGES[want].n} first.`)}O.row.push(s);A.sound.pop();
 tell(O.row.length<5?`${STAGES[s].n}: stage ${O.row.length}.`:'In order: baby, child, teenager, adult, older adult. Everyone goes through the stages one way.')}
/* 2: grow the kittens */
function drawKits(){ground();const K=Z.kits,g=A.ctx,sz=Math.min(A.W*.16,A.H*.24);chip('mum',A.W*.2,A.H*.17,{f:11});chip('dad',A.W*.62,A.H*.17,{f:11});
 cat(A.W*.2,A.H*.4,sz,'#ea580c',1);cat(A.W*.62,A.H*.4,sz,'#111827',1);
 KITS.forEach((k,i)=>{const x=A.W*(.17+i*.3);g.fillStyle=A.alpha(OKG,.12);A.paint.rrect(x-sz*.75,A.H*.5,sz*1.5,A.H*.38,12);g.fill();cat(x,A.H*.84,sz*(.6+.4*K.g[i]),k.c,K.g[i]>.99);chip(K.g[i]>.99?k.n+' cat':k.n+' kitten',x,A.H*.94,{f:10})});
 const n=K.g.filter(v=>v>.99).length;chip(n===3?'Kittens grow into cats, each with its own coat':'Tap a kitten to let it grow up',A.W/2,A.H*.07,{good:n===3})}
function growKit(i){const K=Z.kits;if(K.g[i]>0)return tell(`The ${KITS[i].n} kitten is already growing up.`);K.g[i]=.01;A.sound.whoosh();A.tween(K.g,{[i]:1},700,'out',()=>{K.g[i]=1;A.sound.pop();
  const n=K.g.filter(v=>v>.99).length;tell(`The ${KITS[i].n} kitten grew into a ${KITS[i].n} cat. A kitten always grows into a cat, like its mum and dad.`+(n===3?' Each cat looks a bit like its parents, but not exactly the same.':''))})}
function growNext(){const i=Z.kits.g.findIndex(v=>v===0);if(i<0)return tell('All three kittens have grown up.');growKit(i)}
/* 3: race to grown-up */
function drawRace(){ground();const R=Z.race,g=A.ctx,x0=A.W*.22,w=A.W*.72,u=w/20;
 RACE.forEach((r,i)=>{const y=A.H*(.36+i*.22),grown=R.t>=r.adult;g.strokeStyle=A.col.tx;g.lineWidth=1.5;g.beginPath();g.moveTo(x0,y);g.lineTo(x0+w,y);g.stroke();
  g.fillStyle=A.alpha(OKG,.35);g.fillRect(x0+r.adult*u,y-4,Math.max(3,(20-r.adult)*u),8);beast(r.n,A.W*.1,y,Math.min(A.W*.1,A.H*.15),grown);chip(grown?'grown-up':'young',A.W*.1,y+16,{f:10,good:grown})});
 const nx=x0+R.t*u;g.strokeStyle='#c2410c';g.lineWidth=3;g.beginPath();g.moveTo(nx,A.H*.22);g.lineTo(nx,A.H*.86);g.stroke();
 [0,5,10,15,20].forEach(y=>chip(String(y),x0+y*u,A.H*.92,{f:10}));chip(`${R.t<1?Math.round(R.t*12)+' months':Math.floor(R.t)+' years'} old`,A.W/2,A.H*.17,{f:12});
 chip(R.t>=18?'All grown up. The child took the longest':'Move time on. Who grows up first?',A.W/2,A.H*.07,{good:R.t>=18})}
function timeOn(dt){const R=Z.race;if(R.t>=18)return tell('Everyone is grown up: the mouse at about 2 months, the dog at 1 to 2 years and the child at about 18 years.');const was=RACE.map(r=>R.t>=r.adult);R.t=Math.min(18,R.t+dt);A.sound.tick();
 const now=RACE.filter((r,i)=>!was[i]&&R.t>=r.adult);tell(now.length?now.map(r=>`The ${r.n} is grown up at ${r.say}.`).join(' '):`${R.t<1?Math.round(R.t*12)+' months':Math.floor(R.t)+' years'}. Still waiting.`)}
/* 4: changes or stays */
function boxes(){return[{t:'Changes',v:1,x:A.W*.05,y:A.H*.55,w:A.W*.42,h:A.H*.34},{t:'Stays the same',v:0,x:A.W*.53,y:A.H*.55,w:A.W*.42,h:A.H*.34}]}
function drawChange(){ground();const C=Z.change,g=A.ctx;if(C.k<CARDS.length)chip(CARDS[C.k][0],A.W/2,A.H*.3,{f:18});
 boxes().forEach(b=>{g.fillStyle=A.alpha(b.v?'#c2410c':'#2563eb',.14);A.paint.rrect(b.x,b.y,b.w,b.h,12);g.fill();g.strokeStyle=b.v?'#c2410c':'#2563eb';g.lineWidth=2.5;g.stroke();chip(b.t,b.x+b.w/2,b.y+b.h/2,{f:13})});
 chip(C.k>=CARDS.length?'Bodies change, but you stay a human':`Card ${C.k+1} of ${CARDS.length}: changes or stays?`,A.W/2,A.H*.08,{good:C.k>=CARDS.length})}
function file(v){const C=Z.change;if(C.k>=CARDS.length)return;const [t,ch]=CARDS[C.k];if(v!==ch){A.sound.miss();return tell(ch?`"${t}" changes as you grow. Think of a baby and a grown-up.`:`"${t}" stays the same. A baby and a grown-up both have it.`)}
 C.k++;A.sound.pop();tell(`${t}: ${ch?'this changes as you grow':'this stays the same from baby to older adult'}.`)}
function draw(){const k=which();if(k==='chal'){ground();[0,1,2,3,4].forEach(s=>person(A.W*(.12+s*.19),A.H*.85,A.H*.55*STAGES[s].h,s));chip('Challenge',A.W/2,A.H*.1,{good:1});return}
 ({age:drawAge,order:drawOrder,kits:drawKits,race:drawRace,change:drawChange})[k]();A.fx.draw(A.ctx)}
function down(p){const k=which();if(k==='age'){const T=track();if(p.y>A.H*.7){Z.slide=1;setAge((p.x-T.x)/T.w*T.max);return true}grow();return false}
 if(k==='order'&&p.y<A.H*.58){const left=JUMBLE.filter(i=>!Z.order.row.includes(i)),j=bnd(Math.floor(p.x/(A.W/5)),0,left.length-1);if(left.length)pick(left[j]);return false}
 if(k==='kits'&&p.y>A.H*.48){growKit(bnd(Math.floor((p.x/A.W-.02)/.3),0,2));return false}
 if(k==='race'){timeOn(1);return false}
 if(k==='change'){const b=boxes().find(b=>p.x>b.x&&p.x<b.x+b.w&&p.y>b.y&&p.y<b.y+b.h);if(b)file(b.v);return false}return false}
function move(p){if(Z.slide){const T=track();setAge((p.x-T.x)/T.w*T.max)}}
function up(){Z.slide=0}
function fresh(){tick++;for(const k in Z)delete Z[k];Object.assign(Z,{age:{age:0,seen:[1,0,0,0,0]},order:{row:[]},kits:{g:[0,0,0]},race:{t:0},change:{k:0},slide:0,check:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();btns();Z.check()}
const reach=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,desc,ok,msg){fresh();c.say(desc);A.cv.setAttribute('aria-label',desc);btns();Z.check=reach(i,ok,msg)}
function auto(i,acts,ms){steps[i].go();const t0=tick;acts.forEach((f,j)=>setTimeout(()=>{if(t0===tick)f()},ms*(j+1)))}
function btns(){if(!ctl)return;ctl.innerHTML='';const k=which(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(k==='age'){B('Grow older',grow,'Grow to the next life stage');B('Back to baby',()=>{Z.age.age=0;tell('Back to a new baby. Drag the green dot along the age line.')},'Start again with a baby')}
 if(k==='order')JUMBLE.forEach(s=>{if(!Z.order.row.includes(s))B(STAGES[s].n,()=>pick(s),'Put the '+STAGES[s].n+' next in the line')});
 if(k==='kits')B('Grow a kitten',growNext,'Let the next kitten grow up');
 if(k==='race'){B('+1 month',()=>timeOn(1/12),'Move time on 1 month');B('+1 year',()=>timeOn(1),'Move time on 1 year');B('+6 years',()=>timeOn(6),'Move time on 6 years')}
 if(k==='change'){B('Changes',()=>file(1),'This changes as you grow');B('Stays the same',()=>file(0),'This stays the same as you grow')}}
const steps=[
{h:'Growing up',p:'Drag the green dot along the age line, or tap Grow older. Watch one person grow.',
 predict:{q:'What comes after being a child?',opts:['being a baby again','being a teenager','being an older adult'],ans:1},task:'Grow from baby to older adult',
 show:()=>auto(0,[grow,grow,grow,grow],450),
 go:()=>begin(0,'A new baby at age 0 on an age line that goes to 80 years.',()=>Z.age.seen.every(Boolean),'Baby, child, teenager, adult, older adult.')},
{h:'Put them in order',p:'Five people at different life stages. Tap them from youngest to oldest.',task:'Line up all 5 stages',
 show:()=>auto(1,[0,1,2,3,4].map(s=>()=>pick(s)),420),
 go:()=>begin(1,'Five people in a jumble: a baby, a child, a teenager, an adult and an older adult.',()=>Z.order.row.length===5,'Everyone grows through the stages in this order.')},
{h:'Kittens grow up',p:'A ginger mum and a black dad had three kittens. Tap each kitten to let it grow up.',
 predict:{q:'When these kittens grow up, they will be…',opts:['dogs','cats','kittens for ever'],ans:1},task:'Let all 3 kittens grow up',
 show:()=>auto(2,[growNext,growNext,growNext],800),
 go:()=>begin(2,'Mum, a ginger cat, and dad, a black cat. Below, a black, a ginger and a grey kitten.',()=>Z.kits.g.every(v=>v>.99),'Kittens grow into cats, like their parents.')},
{h:'Who grows up first?',p:'A baby mouse, a puppy and a baby are born on the same day. Move time on and watch.',
 predict:{q:'Which one grows into an adult first?',opts:['the child','the mouse','they all take the same time'],ans:1},task:'Move time on to 18 years',
 show:()=>auto(3,[()=>timeOn(2/12),()=>timeOn(2),()=>timeOn(6),()=>timeOn(6),()=>timeOn(6)],400),
 go:()=>begin(3,'Three lanes: a baby mouse, a puppy and a child, all just born. A time line from 0 to 20 years.',()=>Z.race.t>=18,'Different animals take different times to grow up.')},
{h:'What changes?',p:'As you grow, some things change and some stay the same. Tap a box for each card.',task:'Sort all 6 cards',
 show:()=>auto(4,CARDS.map(([,v])=>()=>file(v)),420),
 go:()=>begin(4,'A card about growing up and two boxes: Changes and Stays the same.',()=>Z.change.k>=CARDS.length,'Your body changes, but you stay a human.')},
{h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.check()});
const QS=[
 {q:'What does a puppy grow into?',a:'A dog',o:[['A cat','kind'],['It stays a puppy','stay']]},
 {q:'Which life stage comes just after child?',a:'Teenager',o:[['Baby','reverse'],['Older adult','skip']]},
 {q:'What does a baby grow into?',a:'A child, then a teenager, then an adult',o:[['An adult the next day','skip'],['It stays a baby','stay']]},
 {q:'Which grows up faster?',a:'A mouse',o:[['A human child','fast'],['They take the same time','fast']]},
 {q:'Do kittens look exactly like their parents when they grow up?',a:'A bit like them, but not exactly',o:[['Yes, exactly the same','same'],['No, they look like dogs','kind']]},
 {q:'Can an older adult grow back into a baby?',a:'No, stages go one way',o:[['Yes, when they are very old','reverse'],['Yes, every year','reverse']]}];
function why(t){let m='Animals, including humans, have babies that grow into adults, one stage at a time.';
 if(t==='kind')m='Young animals grow into the same kind of animal as their parents. A puppy grows into a dog.';
 if(t==='stay')m='Young animals do not stay young. They grow and change into adults.';
 if(t==='reverse')m='Life stages only go one way: baby, child, teenager, adult, older adult.';
 if(t==='skip')m='Growing takes time and no stage is skipped. A child becomes a teenager before an adult.';
 if(t==='fast')m='Different animals take different times. A mouse is grown up in about 2 months, a child in about 18 years.';
 if(t==='same')m='Young look like their parents, but not exactly. Each kitten has its own coat.';
 return m}
function quiz(){qk++;const Q=QS[qk%QS.length],all=[[Q.a,'ok'],...Q.o],r=qk%3,ord=all.slice(r).concat(all.slice(0,r));
 ask.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=ask.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},box,v).onclick=()=>judge(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function judge(t,a){ask.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=ask.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:B=>{ask.hidden=B.step!==5;ctl.hidden=B.step===5;btns()},
 init:B=>{A=B;const box=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Growing up controls'},box);ask=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});btns()}}).start()})})();
