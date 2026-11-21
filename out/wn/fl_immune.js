/* Flagship – The Immune System (ages 9–11). Data, drawings and helpers: learn/immune_art.js. */
(()=>{const {DOORS,CUT,GUARDS,KINDS,ABS,bump,DESC,DONE,QS,body,germ,rod,wbc,antibody,syringe,plaster}=IMM;
VIS.reg('flagimmune',c=>{let A,row,quiz,Q,epoch=0,axes,curve,band,mark,say,panel,backdrop,count;
const C={ink:'#1f2937',good:'#047857',bad:'#b91c1c',line:'#94a3b8',hold:'#1d4ed8',paper:'#ffffff',lemon:'#fef9c3',mint:'#dcfce7',ice:'#e0f2fe',rose:'#ffe4e6',lilac:'#ede9fe',blood:'#fecdd3'};
const G={};const where=()=>['doors','blood','fit','twice','vax','quiz'][A.step];
const sz=n=>Math.round(A.narrow?n:n*1.15),U=()=>Math.min(A.W,A.H);
const R=(x,y,w,h)=>({x,y,w,h}),hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h,near=(p,q,d)=>Math.hypot(p.x-q.x,p.y-q.y)<=d;
/* ---------- 1. the ways in ---------- */
const bodyR=()=>R(A.W*.03,A.H*.04,A.W*.47,A.H*.84),doorP=d=>{const b=bodyR(),D=DOORS.find(x=>x.k===d)||CUT;return{x:b.x+b.w*D.x,y:b.y+b.h*D.y}};
const cardR=i=>R(A.W*.53,A.H*(.05+i*.215),A.W*.44,A.H*.18);
const tray=()=>G.cut&&!G.patched?['plaster']:GUARDS.map((_,i)=>i).filter(i=>!G.placed.includes(i));
function drawDoors(){backdrop(C.ice);const g=A.ctx,b=bodyR();panel(b,C.paper,'');body(g,R(b.x,b.y+b.h*.02,b.w,b.h*.96),false);const u=U();
 DOORS.forEach(D=>{const p=doorP(D.k),gi=G.placed.find(i=>GUARDS[i].d===D.k),safe=gi!=null,bad=G.bad===D.k;
  g.lineWidth=3;g.setLineDash(safe?[]:[5,4]);g.strokeStyle=bad?C.bad:safe?C.good:'#b45309';g.beginPath();g.arc(p.x,p.y,u*.038,0,7);g.stroke();g.setLineDash([]);
  if(!safe)rod(g,p.x+(D.k==='eyes'?-u*.075:u*.075),p.y-u*.035,u*.05);const hr=b.h*.96*.1,cx=b.x+b.w/2,
   L={eyes:[cx+hr+4,p.y-u*.01,'left'],nose:[cx-hr-4,p.y+u*.015,'right'],skin:[p.x+u*.01,p.y+u*.075,'center'],stomach:[p.x,p.y+u*.07,'center']}[D.k];
  say((safe?'✓ ':bad?'✗ ':'')+D.n,L[0],L[1],10,{al:L[2],b:800,c:bad?C.bad:C.ink})});
 if(G.cut){const p=doorP('cut');if(G.patched)plaster(g,p.x,p.y,u*.12);else{g.strokeStyle=C.bad;g.lineWidth=4;g.beginPath();g.moveTo(p.x-u*.03,p.y-u*.02);g.lineTo(p.x+u*.03,p.y+u*.02);g.stroke();
  rod(g,p.x+u*.07,p.y-u*.02,u*.05);say('Cut',p.x+u*.07,p.y+u*.05,10,{b:700})}}
 tray().forEach((k,i)=>{let r=cardR(i);const held=G.drag&&G.drag.k===k;if(held)r=R(G.drag.x-r.w/2,G.drag.y-r.h/2,r.w,r.h);
  panel(r,k==='plaster'?'#ffedd5':C.lemon,held||G.sel===k?'hold':'');if(k==='plaster'){plaster(g,r.x+r.w*.22,r.y+r.h/2,Math.min(r.w*.34,r.h*1.2));say('Plaster',r.x+r.w*.66,r.y+r.h/2,12,{w:r.w*.6})}
  else say(GUARDS[k].n,r.x+r.w/2,r.y+r.h/2,12,{w:r.w-10})});
 count(G.cut?(G.patched?'✓ All ways in are guarded':'A cut! Cover it'):`Ways in guarded: ${G.placed.length} of 4`)}
function guard(i,d){if(G.cut||G.placed.includes(i))return;const Gd=GUARDS[i];if(Gd.d!==d){G.bad=d;A.sound.miss();return talk(oops('door',Gd,d))}
 G.placed.push(i);G.bad='';G.sel=null;A.sound.pop();let t=`${Gd.n} guards the ${Gd.d==='skin'?'skin':Gd.d}. ${Gd.job}`;
 if(G.placed.length===4){G.cut=true;t+=' Oh no: you scraped your knee and the skin is cut. Germs can get in. Drag the plaster over the cut.'}talk(t)}
function patch(onCut){if(!G.cut||G.patched)return;if(!onCut){A.sound.miss();return talk(oops('gap'))}G.patched=true;A.sound.pop();
 talk('The plaster covers the cut until new skin grows. Now every way in is guarded.')}
/* ---------- 2. inside: germs multiply, a white blood cell swallows them ---------- */
const vesR=()=>R(A.W*.04,A.H*.14,A.W*.92,A.H*.44),gpos=i=>{const v=vesR(),cols=Math.min(8,Math.max(G.n,1));return{x:v.x+v.w*((i%8)+.5)/cols,y:v.y+v.h*(G.n>8?(i<8?.3:.7):.5)}};
const home=()=>({x:A.W*.22,y:A.H*.77}),clockR=()=>R(A.W*.52,A.H*.67,A.W*.44,A.H*.2);
function drawBlood(){backdrop(C.rose);const g=A.ctx,v=vesR(),u=U();g.fillStyle=C.blood;A.paint.rrect(v.x,v.y,v.w,v.h,v.h/2);g.fill();g.strokeStyle='#9f1239';g.lineWidth=3;g.stroke();
 for(let i=0;i<6;i++){g.fillStyle='#e11d48';g.beginPath();g.ellipse(v.x+v.w*(.1+i*.16),v.y+v.h*(i%2?.82:.18),u*.03,u*.018,0,0,7);g.fill()}
 for(let i=0;i<G.n;i++){const p=gpos(i);rod(g,p.x,p.y,u*(G.n>8?.06:.075))}
 say(`Minutes: ${G.min}   ·   Germs: ${G.n}`,A.W/2,A.H*.07,13,{c:A.col.tx});
 const w=G.drag?G.drag:home();wbc(g,w.x,w.y,u*.075);if(!G.drag)say('White blood cell',home().x,home().y+u*.12,10,{c:A.col.tx,b:700});
 const k=clockR();panel(k,C.paper,'');say('⏱ Wait 20 minutes',k.x+k.w/2,k.y+k.h/2,12,{w:k.w-10});count(G.waits>=2&&!G.n?'✓ No germs left':'Germs split in two about every 20 minutes')}
function wait(){if(G.waits>=3){A.sound.tick();return talk('That is enough waiting: the germs would make you ill. Swallow them with the white blood cell.')}
 G.waits++;G.min+=20;const was=G.n;G.n=Math.min(16,G.n*2);A.sound.step();
 talk(was?`${G.min} minutes: every germ split in two. ${was} germs became ${G.n}.`+(G.waits>=2?' Now drag the white blood cell onto the germs.':' Wait again?'):`${G.min} minutes: no germs left to split. Swallowing them early stops the doubling.`)}
function swallow(i){if(!G.n)return;if(i==null)i=G.n-1;G.n--;A.sound.pop();
 talk(G.n?`The white blood cell swallowed a germ and broke it down. ${G.n} left.`:'The white blood cell swallowed every germ.'+(G.waits<2?' Tap the clock to see what waiting would have done.':''))}
/* ---------- 3. antibodies fit one kind of germ ---------- */
const kindP=i=>({x:A.W*(.18+.32*i),y:A.H*.27}),abP=j=>({x:A.W*(.18+.32*j),y:A.H*.74});
function drawFit(){backdrop(C.mint);const g=A.ctx,u=U();
 KINDS.forEach((K,i)=>{const p=kindP(i),ok=G.fit.includes(i);germ(g,p.x,p.y,u*.085,i);if(ok)antibody(g,p.x,p.y-u*.2,u*.14,K.s,C.good);
  say((ok?'✓ ':G.bad===i?'✗ ':'')+K.n,p.x,p.y+u*.16,11,{c:A.col.tx,w:A.W*.3,b:700})});
 ABS.forEach((s,j)=>{if(G.fit.includes(s))return;const p=G.drag&&G.drag.j===j?G.drag:abP(j);
  if(!G.drag||G.drag.j!==j){panel(R(abP(j).x-A.W*.14,abP(j).y-u*.13,A.W*.28,u*.31),C.paper,G.sel===j?'hold':'')}antibody(g,p.x,p.y,u*.16,KINDS[s].s);
  if(!G.drag||G.drag.j!==j)say(`${KINDS[s].w} tips`,abP(j).x,abP(j).y+u*.12,10,{b:700,w:A.W*.26})});
 count(`Antibodies fitted: ${G.fit.length} of 3`)}
function fit(j,i){const s=ABS[j];if(G.fit.includes(i)||G.fit.includes(s))return;if(s!==i){G.bad=i;A.sound.miss();return talk(oops('any',KINDS[s],KINDS[i]))}
 G.fit.push(i);G.bad=-1;G.sel=null;A.sound.pop();talk(`The ${KINDS[s].w}-tip antibody fits the ${KINDS[i].n.toLowerCase()} and sticks to it, so white blood cells can find it and destroy it.`)}
/* ---------- 4. the same germ twice ---------- */
const grR=()=>R(A.W*.13,A.H*.1,A.W*.83,A.H*.48),dx=d=>{const r=grR();return r.x+r.w*d/40},dy=v=>{const r=grR();return r.y+r.h*(1-v)};
const lowR=i=>R(A.W*(.03+i*.49),A.H*.73,A.W*.45,A.H*.15);
const ab1=d=>bump(d,3,13,.42),ab2=d=>bump(d,25,30,.95);
function drawTwice(){backdrop(C.lilac);const r=grR();axes(r,'Antibodies in the blood over 40 days');
 if(G.meet>=1)band(r,2,11,'rgba(254,202,202,.9)','Ill');if(G.meet>=2)band(r,24,27,'rgba(187,247,208,.9)','Well');
 if(G.meet>=1)curve(r,d=>ab1(d)+(G.meet>=2?ab2(d):0),'#1d4ed8',G.meet>=2?40:23);
 say('day 0',r.x+12,r.y+r.h+sz(9),10,{c:A.col.tx,b:700,al:'left'});say('day 40',r.x+r.w,r.y+r.h+sz(9),10,{c:A.col.tx,b:700,al:'right'});
 if(G.meet<2){const k=lowR(0);panel(R(A.W*.03,A.H*.73,A.W*.94,A.H*.15),C.lemon,'');germ(A.ctx,A.W*.12,A.H*.805,U()*.045,0);
  say(G.meet?'Day 24: the same germ gets in again':'Day 0: a germ gets in',A.W*.56,A.H*.805,12,{w:A.W*.7});void k}
 else{say('Which time were you ill?',A.W/2,A.H*.67,12,{c:A.col.tx,w:A.W-20});['First time','Second time'].forEach((t,i)=>{const k=lowR(i);panel(k,C.paper,G.named&&i===0?'good':G.bad===i?'bad':'');say((G.named&&i===0?'✓ ':G.bad===i?'✗ ':'')+t,k.x+k.w/2,k.y+k.h/2,12,{w:k.w-8})})}
 count(`Germ visits: ${G.meet} of 2`)}
function meet(){if(G.meet>=2)return;G.meet++;A.sound.step();
 talk(G.meet===1?'First time: white blood cells have never met this germ. Making enough antibodies takes about two weeks, and you feel ill on the way.':'Second time: memory cells remember the germ. Many antibodies come within days, before you feel ill. Which time were you ill?')}
function named(i){if(G.meet<2||G.named)return;if(i!==0){G.bad=i;A.sound.miss();return talk(oops('same'))}G.named=true;G.bad=-1;A.sound.pop();talk('Yes: only the first time. The second time the body was ready.')}
/* ---------- 5. a vaccine ---------- */
const kidP=i=>({x:A.W*(.27+.46*i),y:A.H*.19}),miniR=i=>R(A.W*(.03+.5*i),A.H*.33,A.W*.44,A.H*.32),tokR=()=>R(A.W*.3,A.H*.71,A.W*.4,A.H*.17);
const ansR=i=>R(A.W*(.02+i*.33),A.H*.71,A.W*.31,A.H*.2),WHY=[['Her body had already learned the germ',''],['The vaccine killed the germ like a medicine','cure'],['She was lucky','luck']];
const kidR=i=>R(kidP(i).x-A.W*.16,kidP(i).y-A.H*.15,A.W*.32,A.H*.31);
function drawVax(){backdrop(C.ice);const g=A.ctx,u=U();
 ['Ava','Ben'].forEach((n,i)=>{const p=kidP(i),ill=G.germ&&i===1;g.save();body(g,R(p.x-u*.12,p.y-A.H*.14,u*.24,A.H*.26),ill);g.restore();
  say(n+(i===0&&G.vax?' 💉 ✓':'')+(G.germ?(i?' · ill':' · well'):''),p.x+A.W*.12,p.y-A.H*.1,11,{c:A.col.tx,b:800,al:'left'});
  const r=miniR(i);axes(r,'antibodies, days 0 to 40');if(i===0&&G.vax)curve(r,d=>bump(d,2,12,.28)+(G.germ?bump(d,21,25,.9):0),'#1d4ed8',G.germ?40:19);
  if(i===1&&G.germ){band(r,21,31,'rgba(254,202,202,.9)','Ill',1);curve(r,d=>bump(d,23,33,.42),'#1d4ed8',40)}if(G.germ)mark(r,21,'germ');if(i===0&&G.vax)mark(r,1,'vaccine')});
 if(!G.germ){const k=tokR();let t=k;if(G.drag)t=R(G.drag.x-k.w/2,G.drag.y-k.h/2,k.w,k.h);panel(t,G.vax?C.lemon:'#e0f2fe',G.drag?'hold':'');
  if(G.vax){germ(g,t.x+t.w*.16,t.y+t.h/2,u*.04,0);say('Day 21: germ',t.x+t.w*.6,t.y+t.h/2,12,{w:t.w*.66})}else{syringe(g,t.x+t.w*.2,t.y+t.h/2,Math.min(t.h*1.1,t.w*.4));say('Vaccine',t.x+t.w*.64,t.y+t.h/2,12,{w:t.w*.6})}}
 else{say('Why did Ava stay well?',A.W/2,A.H*.675,12,{c:A.col.tx,w:A.W-16});G.why.forEach((w,i)=>{const k=ansR(i),ok=G.ans&&!WHY[w][1];panel(k,C.paper,ok?'good':G.bad===i?'bad':'');say((ok?'✓ ':G.bad===i?'✗ ':'')+WHY[w][0],k.x+k.w/2,k.y+k.h/2,10,{w:k.w-8})})}
 count(G.ans?'✓ Ava was ready':G.germ?'Ava stayed well; Ben got ill':G.vax?'Now let the germ reach them both':'Give Ava the vaccine')}
function vaccinate(who){if(G.vax)return;if(who!==0){A.sound.miss();return talk(oops('who'))}G.vax=true;A.sound.pop();
 talk('Ava had the vaccine: a weak, dead or part of a germ that cannot make her ill. Her body makes a few antibodies and memory cells, with no illness. Ben has not had it.')}
function infect(){if(G.germ)return;if(!G.vax){A.sound.miss();return talk(oops('novax'))}G.germ=true;A.sound.step();
 talk('Day 21: the real germ reaches them both. Ava\'s memory cells make many antibodies fast, so she stays well. Ben\'s body is meeting it for the first time, so he is ill for days. Why did Ava stay well?')}
function why(i){if(!G.germ||G.ans)return;const s=WHY[G.why[i]][1];if(s){G.bad=i;A.sound.miss();return talk(oops(s))}G.ans=true;G.bad=-1;A.sound.pop();
 talk('Yes: the vaccine let her body learn the germ safely, so it was ready.')}
/* ---------- feedback that names the slip ---------- */
function oops(t,a,b){let m='Look again at what each defence does, and try again.';
 if(t==='door')m=`${a.n} does not guard the ${b==='skin'?'skin':b}. ${a.job} Try another way in.`;
 if(t==='gap')m='The plaster goes on the cut. Broken skin is an open door for germs.';
 if(t==='wait')m='Germs that get in do not wait. Some split in two about every 20 minutes, so 5 can become 40 in an hour.';
 if(t==='any')m=a&&b?`Those tips are ${a.w}, but the ${b.n.toLowerCase()} has ${b.w} bumps. An antibody fits only one kind of germ, like a key fits one lock.`:'An antibody fits only one kind of germ, like a key fits one lock. Antibodies for one germ do not stop another.';
 if(t==='same')m='The second time you usually stay well. Memory cells remember the germ and make lots of antibodies within days.';
 if(t==='cure')m='A vaccine is not a medicine that kills germs. It holds a weak, dead or part of a germ, so your body learns it before the real one comes.';
 if(t==='disease')m='A vaccine does not give you the full illness. The germ in it is weakened, dead or just a part, so your body can learn it safely.';
 if(t==='abx')m='Antibiotics kill bacteria, but colds and flu are viruses. Antibiotics do not work on viruses, so rest and drinks help instead.';
 if(t==='luck')m='It was not luck. Ava\'s body had met a safe form of the germ in the vaccine, so her memory cells were ready.';
 if(t==='who')m='Give it to Ava, so you can compare her with Ben, who has not had it.';
 if(t==='novax')m='Give Ava the vaccine first. The vaccine has to come before the germ to teach her body.';
 return m}
/* ---------- drawing, pointer and buttons ---------- */
function draw(){const k=where();if(k==='quiz'){backdrop(C.lemon);say('Challenge',A.W/2,A.H*.4,22,{c:A.col.tx});say('Barriers · white blood cells · antibodies · vaccines',A.W/2,A.H*.56,13,{c:A.col.tx,w:A.W-24});return}
 ({doors:drawDoors,blood:drawBlood,fit:drawFit,twice:drawTwice,vax:drawVax})[k]();A.fx.draw(A.ctx)}
const grab=(p,o)=>{G.drag=Object.assign({x:p.x,y:p.y,x0:p.x,y0:p.y},o);A.redraw();return true};
function doorAt(p){const u=U();if(G.cut&&!G.patched&&near(p,doorP('cut'),u*.1))return'cut';const D=DOORS.find(D=>near(p,doorP(D.k),u*.08));return D?D.k:null}
function down(p){const k=where(),u=U();
 if(k==='doors'){const t=tray(),i=t.findIndex((_,j)=>hit(p,cardR(j)));if(i>=0)return grab(p,{k:t[i]});const d=doorAt(p);if(d&&G.sel!=null){if(G.sel==='plaster')patch(d==='cut');else guard(G.sel,d)}return false}
 if(k==='blood'){if(hit(p,clockR())){wait();return false}if(near(p,home(),u*.11))return grab(p,{});return false}
 if(k==='fit'){const j=ABS.findIndex((s,j)=>!G.fit.includes(s)&&near(p,abP(j),u*.15));if(j>=0)return grab(p,{j});const i=KINDS.findIndex((_,i)=>near(p,kindP(i),u*.13));if(i>=0&&G.sel!=null)fit(G.sel,i);return false}
 if(k==='twice'){if(G.meet<2&&hit(p,R(A.W*.03,A.H*.73,A.W*.94,A.H*.15)))meet();else if(G.meet>=2){const i=[0,1].find(i=>hit(p,lowR(i)));if(i!=null)named(i)}return false}
 if(k==='vax'){if(!G.germ&&hit(p,tokR()))return grab(p,{});if(G.germ){const i=[0,1,2].find(i=>hit(p,ansR(i)));if(i!=null)why(i)}return false}return false}
function move(p){if(!G.drag)return;G.drag.x=p.x;G.drag.y=p.y;const u=U();
 if(where()==='blood')for(let i=G.n-1;i>=0;i--)if(near(p,gpos(i),u*.07)){swallow(i);break}A.redraw()}
function up(p){const d=G.drag;if(!d)return;G.drag=null;const k=where(),tap=Math.hypot(p.x-d.x0,p.y-d.y0)<10;
 if(k==='doors'){if(tap){G.sel=d.k;talk(d.k==='plaster'?'Plaster picked. Tap the cut.':`${GUARDS[d.k].n} picked. Tap the way in it guards.`);return}const w=doorAt(p);
  if(d.k==='plaster')return patch(w==='cut');if(w&&w!=='cut')return guard(d.k,w);return A.redraw()}
 if(k==='blood')return A.redraw();
 if(k==='fit'){if(tap){G.sel=d.j;talk(`${KINDS[ABS[d.j]].w}-tip antibody picked. Tap the germ it fits.`);return}const i=KINDS.findIndex((_,i)=>near(p,kindP(i),U()*.15));if(i>=0)return fit(d.j,i);return A.redraw()}
 if(k==='vax'){if(G.vax){if(tap||p.y<A.H*.66)return infect();return A.redraw()}if(tap)return talk('Drag the vaccine onto Ava, or use the button.');const who=[0,1].find(i=>hit(p,kidR(i))||hit(p,miniR(i)));if(who!=null)return vaccinate(who);return A.redraw()}}
function talk(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();G.hook()}
function keys(){if(!row)return;row.innerHTML='';const k=where(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},row,t).onclick=f};
 if(k==='doors'){if(G.cut&&!G.patched){b('Plaster on the cut',()=>patch(true),'Put the plaster on the cut knee')}else if(!G.cut){const i=G.sel!=null&&G.sel!=='plaster'?G.sel:tray()[0];
  DOORS.forEach(D=>b(`${GUARDS[i].n} → ${D.n}`,()=>guard(i,D.k),`Put ${GUARDS[i].n} on the ${D.n.toLowerCase()}`))}}
 if(k==='blood'){b('Wait 20 minutes',wait,'Wait 20 minutes and watch the germs');if(G.n)b('Swallow a germ',()=>swallow(),'The white blood cell swallows one germ')}
 if(k==='fit'){const i=KINDS.findIndex((_,i)=>!G.fit.includes(i));if(i>=0)ABS.forEach((s,j)=>{if(!G.fit.includes(s))b(`${KINDS[s].w} tips → ${KINDS[i].n}`,()=>fit(j,i),`Put the ${KINDS[s].w}-tip antibody on the ${KINDS[i].n.toLowerCase()}`)})}
 if(k==='twice'){if(G.meet<2)b(G.meet?'Same germ again':'Germ gets in',meet);else if(!G.named)['First time','Second time'].forEach((t,i)=>b(t,()=>named(i),`I was ill the ${t.toLowerCase()}`))}
 if(k==='vax'){if(!G.vax){b('Vaccine → Ava',()=>vaccinate(0),'Give Ava the vaccine');b('Vaccine → Ben',()=>vaccinate(1),'Give Ben the vaccine')}else if(!G.germ)b('Germ reaches them',infect,'The same germ reaches Ava and Ben');
  else if(!G.ans)G.why.forEach((w,i)=>b(WHY[w][0],()=>why(i)))}}
function clear(){epoch++;for(const x in G)delete G[x];Object.assign(G,{placed:[],cut:false,patched:false,sel:null,bad:-1,n:2,min:0,waits:0,fit:[],meet:0,named:false,vax:false,germ:false,ans:false,why:[1,0,2],drag:null,hook:()=>{}})}
const met=(i,test)=>()=>{if(A.step===i&&test()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(DONE[i]+A.reveal(i))};
function enter(i,test){clear();talk(DESC[i]);G.hook=met(i,test)}
function play(i,acts,ms){steps[i].go();const e0=epoch;acts.forEach((f,j)=>setTimeout(()=>{if(e0===epoch)f()},ms*(j+1)))}
const steps=[
{h:'Keep germs out',p:'Germs are tiny living things that can make you ill. Your body\'s first defence is to keep them out. Drag each guard to the way in it protects.',
 task:'Guard 4 ways in, then cover the cut',show:()=>play(0,[...[3,0,2,1].map(i=>()=>guard(i,GUARDS[i].d)),()=>patch(true)],380),go:()=>enter(0,()=>G.patched)},
{h:'Germs that get in',p:'Some germs got in through a cut. Tap the clock to wait 20 minutes. Then drag the white blood cell onto the germs to swallow them.',
 predict:{q:'2 germs got in. If nothing stops them, what happens to their number?',opts:['It stays at 2','It doubles again and again'],ans:1},task:'Wait 40 minutes, then swallow every germ',
 show:()=>play(1,[wait,wait,...Array.from({length:8},()=>()=>swallow())],260),go:()=>enter(1,()=>G.waits>=2&&G.n===0)},
{h:'Antibodies fit',p:'Other white blood cells make antibodies. An antibody sticks to a germ so it can be destroyed. Drag each antibody onto a germ.',
 predict:{q:'Your body made antibodies for chickenpox. Will they also stop a cold germ?',opts:['Yes, antibodies stop any germ','No, each fits one kind'],ans:1},task:'Fit an antibody to all 3 germs',
 show:()=>play(2,[0,1,2].map(i=>()=>fit(ABS.indexOf(i),i)),420),go:()=>enter(2,()=>G.fit.length>=3)},
{h:'The second time',p:'The graph shows antibodies in your blood. Let a germ in. Later, let the same germ in again and compare.',
 predict:{q:'Months later the same germ gets in again. What happens?',opts:['You get just as ill again','Your body beats it faster'],ans:1},task:'Meet the germ twice, then say when you were ill',
 show:()=>play(3,[meet,meet,()=>named(0)],600),go:()=>enter(3,()=>G.named)},
{h:'Vaccines',p:'A vaccine lets your body meet a germ safely. Drag the vaccine to Ava. Ben does not have it. Then let the real germ reach them both.',
 predict:{q:'What is in a vaccine?',opts:['A medicine that kills germs','A weak, dead or part of a germ'],ans:1},task:'Vaccinate Ava, let the germ in, then say why',
 show:()=>play(4,[()=>vaccinate(0),infect,()=>why(G.why.indexOf(0))],600),go:()=>enter(4,()=>G.ans)},
{h:'Challenge',p:'',go:()=>{clear();Q.pose()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>G.hook()});
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:X=>{quiz.hidden=X.step!==5;row.hidden=X.step===5;keys()},
 init:X=>{A=X;({say,panel,backdrop,count}=IMM.kit(A,C,sz));({axes,curve,band,mark}=IMM.graph(A,say,panel,sz,C));const w=c.el('div',{class:'fl-below'},A.below);row=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Immune system lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);Q=IMM.quiz(c,A,quiz,oops);clear();A.gest({down,move,up});keys()}}).start()})})();
