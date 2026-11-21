/* Flagship – visiting the doctor or dentist (ages 4–5; Development Matters 2021 Reception PSED; DfE health education
   guidance on dental check-ups). Scenes: sort real reasons for a visit from worries (it is never a punishment, and we go
   when nothing hurts too), put a visit in order so it holds no surprises, drag each tool to the place it checks and hear
   that it only looks or listens, keep still for the dentist mirror and put a hand up when a tooth feels sore, then bring
   a worry meter down with things that help. Every drag or tap has a labelled button twin. Data in learn/docvisit_art.js. */
(()=>{const {pic,WHY,VISIT,SHUF,ZONES,TOOLS,SORE,CALM,DESC,DONE,QS}=DCV;
VIS.reg('flagdocvisit',c=>{let A,keys,ask,qno=-1,run=0;c.fig.classList.add('young');
const P={ink:'#1f2937',yes:'#047857',no:'#b91c1c',edge:'#94a3b8',pick:'#1d4ed8',white:'#ffffff',cream:'#fef9c3',green:'#dcfce7',blue:'#dbeafe',pink:'#fce7f3',gum:'#fda4af'};
const st={};const part=()=>['why','visit','tools','tell','calm','quiz'][A.step];
const z=n=>Math.round(A.narrow?n:n*1.15);
const rc=(x,y,w,h)=>({x,y,w,h}),on=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* text that wraps inside width w; long lines go onto more lines */
function txt(s,x,y,n,o){o=o||{};const g=A.ctx;g.font=`${o.b||800} ${z(n)}px system-ui,sans-serif`;g.fillStyle=o.c||P.ink;g.textAlign='center';g.textBaseline='middle';
 if(!o.w||g.measureText(s).width<=o.w)return g.fillText(s,x,y);const lines=[];let cur='';for(const word of s.split(' ')){const t=cur?cur+' '+word:word;if(g.measureText(t).width>o.w&&cur){lines.push(cur);cur=word}else cur=t}lines.push(cur);
 const lh=z(n)*1.2;lines.forEach((t,i)=>g.fillText(t,x,y+(i-(lines.length-1)/2)*lh))}
/* a card; right and wrong also carry ✓ and ✗ in the words */
function tile(r,bg,mood){const g=A.ctx;g.fillStyle=mood==='yes'?'#d1fae5':mood==='no'?'#fee2e2':bg||P.white;A.paint.rrect(r.x,r.y,r.w,r.h,Math.min(14,r.h/3));g.fill();
 g.lineWidth=mood?4:2;g.strokeStyle={yes:P.yes,no:P.no,pick:P.pick}[mood]||P.edge;g.stroke()}
function wash(t){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,t,A.col.dark?.14:.45);g.fillRect(0,0,A.W,A.H)}
function score(t,n,of){txt(`${t}: ${n} of ${of}`,A.W/2,A.H*.95,13,{c:A.col.tx,b:700})}
/* ---------- 1. why we go ---------- */
const reasonR=()=>rc(A.W*.08,A.H*.08,A.W*.84,A.H*.2),pileR=i=>rc(A.W*(.04+i*.48),A.H*.4,A.W*.44,A.H*.46);
function drawWhy(){wash(P.blue);const live=st.r<WHY.length,W=WHY[Math.min(st.r,WHY.length-1)];let r=reasonR();if(st.drag)r=rc(st.drag.x-r.w/2,st.drag.y-r.h/2,r.w,r.h);
 tile(r,P.cream,st.drag?'pick':'');txt(live?W.t:'✓ All sorted',r.x+r.w/2,r.y+r.h/2,15,{w:r.w-16});
 ['Yes, that is why we go','No, that is not why'].forEach((t,i)=>{const b=pileR(i);tile(b,P.white,st.bad===i?'no':'');txt((st.bad===i?'✗ ':'')+t,b.x+b.w/2,b.y+z(20),12,{w:b.w-10});
  st.sorted.filter(x=>x.y===(i===0)).forEach((x,j)=>txt('✓ '+x.t,b.x+b.w/2,b.y+b.h*(.34+j*.22),11,{w:b.w-12,b:700,c:P.yes}))});score('Sorted',st.sorted.length,WHY.length)}
function file(yes){const W=WHY[st.r];if(!W)return;if(W.y!==yes){st.bad=yes?0:1;A.sound.miss();return say(oops(W.slip||'real',W.t))}
 st.sorted.push(W);st.r++;st.bad=-1;A.sound.pop();say(`${yes?'Yes':'No'}: ${W.t}.`+(st.r<WHY.length?' Next card.':''))}
/* ---------- 2. the visit in order ---------- */
const stepR=i=>{const w=(A.W-30)/2;return rc(10+(i%2)*(w+10),A.H*(.06+Math.floor(i/2)*.22),w,A.H*.19)},slotR=i=>rc(A.W*.06,A.H*(.52+i*.1),A.W*.88,A.H*.085);
function drawVisit(){wash(P.green);SHUF.forEach((v,i)=>{if(st.order.includes(v))return;let r=stepR(i);if(st.drag&&st.drag.i===i)r=rc(st.drag.x-r.w/2,st.drag.y-r.h/2,r.w,r.h);
  tile(r,P.white,st.bad===v?'no':st.drag&&st.drag.i===i?'pick':'');txt((st.bad===v?'✗ ':'')+VISIT[v],r.x+r.w/2,r.y+r.h/2,12,{w:r.w-12})});
 VISIT.forEach((_,i)=>{const r=slotR(i),has=i<st.order.length;tile(r,has?P.white:P.cream,has?'yes':'');txt(`${i+1}. `+(has?'✓ '+VISIT[st.order[i]]:''),r.x+r.w/2,r.y+r.h/2,12,{b:700,w:r.w-12})});score('In order',st.order.length,VISIT.length)}
function placeStep(v){if(st.order.includes(v))return;const want=st.order.length;if(v!==want){st.bad=v;A.sound.miss();return say(oops('order',VISIT[v],VISIT[want]))}
 st.order.push(v);st.bad=-1;A.sound.pop();say(`${v+1}: ${VISIT[v]}.`+(st.order.length<VISIT.length?' What comes next?':' That is the whole visit.'))}
/* ---------- 3. tools: drag to the place they check ---------- */
const bodyC=()=>({x:A.W/2,y:A.H*.36,s:Math.min(A.W*.6,A.H*.52)});
function spot(k){const B=bodyC(),s=B.s;return{ear:[-s*.16,-s*.32],mouth:[0,-s*.27],chest:[0,-s*.02],arm:[s*.2,-s*.08]}[k].map((v,i)=>v+(i?B.y:B.x))}
const chipR=i=>rc(i%2?A.W*.7:A.W*.03,A.H*(.12+Math.floor(i/2)*.26),A.W*.27,A.H*.09),trayR=()=>rc(A.W*.3,A.H*.7,A.W*.4,A.H*.19);
function drawTools(){wash(P.pink);const B=bodyC(),g=A.ctx,live=st.r<TOOLS.length,T=TOOLS[Math.min(st.r,TOOLS.length-1)];pic(g,A.paint,'body',B.x,B.y,B.s);
 ZONES.forEach((Z,i)=>{const r=chipR(i),[sx,sy]=spot(Z.k),got=st.used.find(u=>u.z===Z.k),bad=st.bad===Z.k;g.strokeStyle=A.col.tx;g.lineWidth=2;g.beginPath();g.moveTo(i%2?r.x:r.x+r.w,r.y+r.h/2);g.lineTo(sx,sy);g.stroke();
  g.fillStyle=P.pick;g.beginPath();g.arc(sx,sy,z(5),0,7);g.fill();tile(r,P.white,got?'yes':bad?'no':'');txt((got?'✓ ':bad?'✗ ':'')+Z.n,r.x+r.w/2,r.y+r.h/2,12,{w:r.w-6})});
 let t=trayR();if(st.drag)t=rc(st.drag.x-t.w/2,st.drag.y-t.h/2,t.w,t.h);tile(t,P.cream,st.drag?'pick':'');
 if(live){pic(g,A.paint,T.k,t.x+t.w/2,t.y+t.h*.42,Math.min(t.w,t.h)*.62);txt(T.n,t.x+t.w/2,t.y+t.h*.86,12,{w:t.w-6})}else txt('✓ All tools tried',t.x+t.w/2,t.y+t.h/2,12,{w:t.w-8,c:P.yes});
 score('Tools tried',st.used.length,TOOLS.length)}
function useOn(k){const T=TOOLS[st.r];if(!T)return;if(k!==T.z){st.bad=k;A.sound.miss();return say(oops('tool',T.n,(ZONES.find(Z=>Z.k===k)||{}).n))}
 st.used.push(T);st.r++;st.bad='';A.sound.pop();say(`The ${T.n}: ${T.does}`+(st.r<TOOLS.length?' Here is the next tool.':''))}
/* ---------- 4. keep still, and tell if it hurts ---------- */
const toothR=i=>{const w=(A.W*.84)/5;return rc(A.W*.08+i*w+3,A.H*.3,w-6,A.H*.17)},stillR=()=>rc(A.W*.05,A.H*.66,A.W*.43,A.H*.18),handR=()=>rc(A.W*.52,A.H*.66,A.W*.43,A.H*.18);
function drawTell(){wash(P.cream);const g=A.ctx,live=st.r<SORE.length,sore=SORE[Math.min(st.r,SORE.length-1)];g.fillStyle=P.gum;A.paint.rrect(A.W*.05,A.H*.25,A.W*.9,A.H*.27,z(20));g.fill();
 for(let i=0;i<5;i++){const r=toothR(i),here=live&&i===st.at,ow=here&&i===sore;tile(r,P.white,ow?'no':i<st.at&&live?'yes':'');if(ow)txt('Ow!',r.x+r.w/2,r.y+r.h/2,13,{c:P.no});else if(live&&i<st.at)txt('✓',r.x+r.w/2,r.y+r.h/2,14,{c:P.yes})}
 if(live){const r=toothR(st.at);pic(g,A.paint,'mirror',r.x+r.w/2,r.y-A.H*.08,z(56))}
 txt(live?(st.at===sore?'This tooth feels sore!':'This tooth feels fine.'):'✓ The dentist knows which teeth to help.',A.W/2,A.H*.58,13,{c:A.col.tx,w:A.W-16});
 tile(stillR(),P.white,st.bad==='still'?'no':'');txt((st.bad==='still'?'✗ ':'')+'Keep still',stillR().x+stillR().w/2,stillR().y+stillR().h/2,14,{w:stillR().w-8});
 tile(handR(),P.blue,'');txt('Hand up: it hurts',handR().x+handR().w/2,handR().y+handR().h/2,14,{w:handR().w-8});score('Sore teeth told',st.told,SORE.length)}
function keepStill(){if(st.r>=SORE.length)return;if(st.at===SORE[st.r]){st.bad='still';A.sound.miss();return say(oops('hide'))}st.bad='';st.at=Math.min(4,st.at+1);A.sound.tick();say('You kept still. The mirror moves to the next tooth.')}
function handUp(){if(st.r>=SORE.length)return;if(st.at!==SORE[st.r]){A.sound.tick();return say('That tooth feels fine. You can put your hand up any time you need a rest. For now, keep still.')}
 st.told++;st.r++;st.at=0;st.bad='';A.sound.pop();say('You told the dentist: that one hurts. Now they know which tooth to help.'+(st.r<SORE.length?' A new check starts.':''))}
/* ---------- 5. bring the worry down ---------- */
const doR=i=>{const w=(A.W-30)/2;return rc(10+(i%2)*(w+10),A.H*(.26+Math.floor(i/2)*.21),w,A.H*.18)};
function drawCalm(){wash(P.blue);const g=A.ctx,left=4-st.calm.length,bar=rc(A.W*.06,A.H*.06,A.W*.88,A.H*.13);tile(bar,P.white,left===0?'yes':'');txt(`Worry: ${left} of 4`,bar.x+bar.w*.22,bar.y+bar.h/2,13,{w:bar.w*.4});
 for(let i=0;i<4;i++){g.fillStyle=i<left?'#f59e0b':'#e2e8f0';A.paint.rrect(bar.x+bar.w*(.46+i*.13),bar.y+bar.h*.25,bar.w*.1,bar.h*.5,z(6));g.fill();g.strokeStyle=P.ink;g.lineWidth=1.5;g.stroke()}
 CALM.forEach((C,i)=>{const r=doR(i),got=st.calm.includes(i),bad=st.bad===i;tile(r,P.white,got?'yes':bad?'no':'');txt((got?'✓ ':bad?'✗ ':'')+C.t,r.x+r.w/2,r.y+r.h/2,12,{w:r.w-12})});score('Helpers found',st.calm.length,4)}
function tryCalm(i){const C=CALM[i];if(!C||st.calm.includes(i))return;if(!C.ok){st.bad=i;A.sound.miss();return say(oops(C.slip))}
 st.calm.push(i);st.bad=-1;A.sound.pop();say(`${C.t}: that helps. The worry goes down.`)}
/* ---------- feedback that names the slip ---------- */
function oops(t,a,b){let m='Think about what keeps you safe and healthy, then try again.';
 if(t==='punish')m='A visit is never a punishment. Doctors, nurses and dentists help everyone stay healthy, whatever you did.';
 if(t==='onlysick')m='We go for check-ups even when nothing hurts. The dentist can spot a problem early, before it hurts.';
 if(t==='real')m=`"${a}" is a real reason. Doctors and dentists check we are healthy and help when we are poorly.`;
 if(t==='order')m=`Not yet: "${a}" comes later. First: "${b}".`;
 if(t==='tool')m=`The ${a} does not check ${b?'the '+b:'there'}. Think: does it listen, look, or check how hot you are?`;
 if(t==='hide')m='Keeping quiet means the dentist may not know it hurts. Put your hand up and say: that hurts.';
 if(t==='shut')m='If you shut your mouth, the dentist cannot see or help. Put your hand up and tell them instead.';
 if(t==='hideaway')m='Hiding does not make the visit go away, and it can feel more scary. Ask your grown-up what will happen.';
 if(t==='secret')m='A worry is not a secret to keep. Tell your grown-up or the doctor, so they can help.';
 if(t==='adult')m='32 is for grown-ups. A child has 20 baby teeth.';
 if(t==='count')m='More than that! A child has 20 baby teeth: 10 on top and 10 on the bottom.';
 return m}
/* ---------- drawing, pointer and buttons ---------- */
function draw(){const k=part();if(k==='quiz'){wash(P.cream);txt('Challenge',A.W/2,A.H*.4,22,{c:A.col.tx});txt('Why we go · What happens · Tell if it hurts',A.W/2,A.H*.55,13,{c:A.col.tx,w:A.W-20});return}
 ({why:drawWhy,visit:drawVisit,tools:drawTools,tell:drawTell,calm:drawCalm})[k]();A.fx.draw(A.ctx)}
function down(p){const k=part(),grab=o=>{st.drag=Object.assign({x:p.x,y:p.y,x0:p.x,y0:p.y},o);A.redraw();return true};
 if(k==='why'){if(on(p,reasonR())&&st.r<WHY.length)return grab({});for(let i=0;i<2;i++)if(on(p,pileR(i)))file(i===0);return false}
 if(k==='visit'){const i=SHUF.findIndex((v,j)=>!st.order.includes(v)&&on(p,stepR(j)));if(i>=0)return grab({i});return false}
 if(k==='tools'){if(on(p,trayR())&&st.r<TOOLS.length)return grab({});const i=ZONES.findIndex((_,j)=>on(p,chipR(j)));if(i>=0)useOn(ZONES[i].k);return false}
 if(k==='tell'){if(on(p,stillR()))keepStill();else if(on(p,handR()))handUp();return false}
 if(k==='calm'){const i=CALM.findIndex((_,j)=>on(p,doR(j)));if(i>=0)tryCalm(i);return false}return false}
function move(p){if(!st.drag)return;st.drag.x=p.x;st.drag.y=p.y;A.redraw()}
function up(p){const d=st.drag;if(!d)return;st.drag=null;const k=part(),tap=Math.hypot(p.x-d.x0,p.y-d.y0)<10;
 if(k==='why'){for(let i=0;i<2;i++)if(on(p,pileR(i)))return file(i===0);return A.redraw()}
 if(k==='visit'){if(tap||p.y>A.H*.48)return placeStep(SHUF[d.i]);return A.redraw()}
 if(k==='tools'){const i=ZONES.findIndex((Z,j)=>on(p,chipR(j))||Math.hypot(p.x-spot(Z.k)[0],p.y-spot(Z.k)[1])<z(24));if(i>=0)return useOn(ZONES[i].k);A.redraw()}}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();pads();st.hook()}
function pads(){if(!keys)return;keys.innerHTML='';const k=part(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},keys,t).onclick=f};
 if(k==='why'&&st.r<WHY.length){b('Yes, that is why',()=>file(true),`Yes: ${WHY[st.r].t}`);b('No, not why',()=>file(false),`No: ${WHY[st.r].t}`)}
 if(k==='visit')SHUF.forEach(v=>{if(!st.order.includes(v))b(VISIT[v],()=>placeStep(v),`Put next: ${VISIT[v]}`)});
 if(k==='tools'&&st.r<TOOLS.length)ZONES.forEach(Z=>b(Z.n,()=>useOn(Z.k),`Put the ${TOOLS[st.r].n} on the ${Z.n}`));
 if(k==='tell'){b('Keep still',keepStill);b('Hand up: it hurts',handUp,'Put your hand up: it hurts')}
 if(k==='calm')CALM.forEach((C,i)=>b(C.t,()=>tryCalm(i)))}
function wipe(){run++;for(const x in st)delete st[x];Object.assign(st,{r:0,bad:-1,sorted:[],order:[],used:[],at:0,told:0,calm:[],drag:null,hook:()=>{}})}
const met=(i,test)=>()=>{if(A.step===i&&test()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(DONE[i]+A.reveal(i))};
function open(i,test){wipe();say(DESC[i]);st.hook=met(i,test)}
function auto(i,acts,ms){steps[i].go();const r0=run;acts.forEach((f,j)=>setTimeout(()=>{if(r0===run)f()},ms*(j+1)))}
const tellActs=SORE.flatMap(n=>[...Array(n).fill(()=>keepStill()),()=>handUp()]);
const steps=[
{h:'Why we go',p:'Doctors, nurses and dentists help us stay healthy. Is each card a real reason to go? Drag it to Yes or No.',
 predict:{q:'Do you only go to the dentist when a tooth hurts?',opts:['Yes, only when it hurts','No, check-ups keep teeth healthy'],ans:1},task:'Sort 5 cards',
 show:()=>auto(0,WHY.map(()=>()=>file(WHY[st.r].y)),380),go:()=>open(0,()=>st.sorted.length>=WHY.length)},
{h:'What happens',p:'Knowing what will happen makes a visit less strange. Put the visit in order: tap or drag each card into the next space.',
 task:'Put 4 parts of a visit in order',show:()=>auto(1,VISIT.map((_,v)=>()=>placeStep(v)),420),go:()=>open(1,()=>st.order.length>=VISIT.length)},
{h:'The tools',p:'The doctor and dentist use tools to look and listen. Drag each tool to the place it checks.',
 predict:{q:'Does the stethoscope hurt?',opts:['Yes, it pokes you','No, it just listens to your heart'],ans:1},task:'Try 4 tools',
 show:()=>auto(2,TOOLS.map(()=>()=>useOn(TOOLS[st.r].z)),420),go:()=>open(2,()=>st.used.length>=TOOLS.length)},
{h:'Tell if it hurts',p:'The dentist checks each tooth with a little mirror. Keep still while a tooth feels fine. If a tooth feels sore, put your hand up.',
 predict:{q:'A tooth feels sore. Should you keep quiet and be brave?',opts:['Yes, keep quiet','No, tell the dentist'],ans:1},task:'Tell the dentist about 3 sore teeth',
 show:()=>auto(3,tellActs,230),go:()=>open(3,()=>st.told>=SORE.length)},
{h:'Feeling worried',p:'It is OK to feel a bit worried. Tap the things that help, and watch the worry go down.',
 task:'Find 4 things that help',show:()=>auto(4,CALM.map((C,i)=>C.ok?()=>tryCalm(i):null).filter(Boolean),420),go:()=>open(4,()=>st.calm.length>=4)},
{h:'Challenge',p:'',go:()=>{wipe();nextQ()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>st.hook()});
function nextQ(){qno++;const Q=QS[qno%QS.length],opts=[[Q.a,''],...Q.o],k=qno%3,list=opts.slice(k).concat(opts.slice(0,k));
 ask.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Pick an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=ask.querySelector('.fl-pick');list.forEach(([t,s])=>{c.el('button',{type:'button',class:'lbtn'},g,t).onclick=()=>mark(s,Q,t)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(s,Q,t){ask.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=ask.querySelector('.fl-fb');
 const why=s?(s==='tool'?`Not quite. ${/stethoscope/.test(Q.q)?'The stethoscope listens to your heart and breathing.':'The thermometer goes under your arm to check how hot you are.'} It does not hurt.`:oops(s)):'';if(!s)A.win();else A.sound.miss();
 fb.innerHTML=(s?'✗ '+why:`✓ Yes: ${Q.a}`)+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=nextQ;c.say(s?why:'Yes.')}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:X=>{ask.hidden=X.step!==5;keys.hidden=X.step===5;pads()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Doctor and dentist lab buttons'},w);ask=c.el('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});pads()}}).start()})})();
