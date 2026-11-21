/* Flagship – fire safety: get out and stay out (ages 4–5; PSHE Association KS1 keeping safe at home and in an
   emergency; UK fire and rescue advice for families). Scenes: tap the smoke alarm and choose the first move; drag a
   child along the floor under the smoke and past the toys to the door; drag the family to the meeting place; choose
   what to do when the cat is still inside; dial 999 and answer the operator. Data in learn/getout_art.js. */
(()=>{const {FIRSTS,SMOKE,KID0,DOOR,TOYS,LOW,TALL,STOP,FAM,SPOTS,STAY,KEYS,NUM,SERVICE,WHERE,DESC,DONE,QS}=GTO;
VIS.reg('flaggetout',c=>{let A,bar,quiz,qi=-1,gen=0;const S={};c.fig.classList.add('young');
const INK='#0f172a',GOOD='#047857',WRONG='#b91c1c',RIM='#64748b',HOT='#7c3aed',FONT='px system-ui,sans-serif';
const SCENES=['alarm','crawl','meet','stay','call','quiz'],scene=()=>SCENES[A.step];
const px=n=>Math.round(A.narrow?n:n*1.12);
const hit=(p,b)=>!!b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
const box=(cx,cy,w,h)=>({x:cx-w/2,y:cy-h/2,w,h});
const pt=f=>({x:f.x*A.W,y:f.y*A.H});
/* writes one line of text, shrinking it until it fits the given width */
function write(s,x,y,n,o={}){const g=A.ctx;let k=px(n);g.font=`${o.w||800} ${k}${FONT}`;while(o.max&&k>9&&g.measureText(s).width>o.max){k--;g.font=`${o.w||800} ${k}${FONT}`}
 g.fillStyle=o.c||INK;g.textAlign=o.a||'center';g.textBaseline='middle';g.fillText(s,x,y)}
/* a rounded card; state picks the fill and border so right, wrong and chosen read without colour alone (✓ / ✗ text too) */
function card(b,state){const g=A.ctx,F={good:['#d1fae5',GOOD],wrong:['#fee2e2',WRONG],hot:['#ede9fe',HOT]}[state]||['#ffffff',RIM];
 g.fillStyle=F[0];A.paint.rrect(b.x,b.y,b.w,b.h,Math.min(12,b.h/3));g.fill();g.lineWidth=state?4:2;g.strokeStyle=F[1];g.stroke()}
/* card text on up to two lines */
function cardText(s,b,n){const w=s.split(' ');if(w.length<4)return write(s,b.x+b.w/2,b.y+b.h/2,n,{max:b.w-12});
 const cut=Math.ceil(w.length/2);write(w.slice(0,cut).join(' '),b.x+b.w/2,b.y+b.h*.33,n,{max:b.w-12});write(w.slice(cut).join(' '),b.x+b.w/2,b.y+b.h*.7,n,{max:b.w-12})}
function banner(s,good){const g=A.ctx;let k=px(14);g.font=`800 ${k}${FONT}`;while(g.measureText(s).width>A.W-36&&k>10){k--;g.font=`800 ${k}${FONT}`}
 const w=g.measureText(s).width+24,b={x:(A.W-w)/2,y:6,w,h:k+16};card(b,good?'good':'');write(s,A.W/2,b.y+b.h/2+1,k/(A.narrow?1:1.12))}
function wall(tint,t){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,tint,A.col.dark?.1:t);g.fillRect(0,0,A.W,A.H)}
const grid=(list,top,hf)=>{const gap=8,w=(A.W-gap*3)/2,h=A.H*hf;return list.map((_,i)=>({i,x:gap+(i%2)*(w+gap),y:A.H*top+Math.floor(i/2)*(h+gap),w,h}))};
/* ---------- 1. the alarm ---------- */
const alarmAt=()=>({x:A.W*.5,y:A.H*.2,r:Math.max(26,A.W*.05)});
const firstCards=()=>grid(FIRSTS,.5,.2);
function drawAlarm(){const s=S.a,g=A.ctx,al=alarmAt();wall('#c7d2fe',.45);
 g.fillStyle=s.rang?'#fecaca':'#f8fafc';g.beginPath();g.arc(al.x,al.y,al.r,0,7);g.fill();g.lineWidth=3;g.strokeStyle=s.rang?WRONG:RIM;g.stroke();write(s.rang?'🔴':'⚪',al.x,al.y,18);
 write('🛏️🧒',A.W*.17,A.H*.34,30);
 if(!s.rang){banner('Tap the smoke alarm');return}
 const bp=box(A.W*.6,A.H*.36,Math.min(A.W*.6,260),A.H*.1);card(bp,'wrong');write('BEEP! BEEP! BEEP!',bp.x+bp.w/2,bp.y+bp.h/2,16,{max:bp.w-10});
 firstCards().forEach(b=>{const F=FIRSTS[b.i];card(b,s.bad===F.k?'wrong':s.ok&&F.k==='out'?'good':'');cardText((s.bad===F.k?'✗ ':'')+F.t,b,13)});
 banner(s.ok?'Out you go!':'What do you do?',s.ok)}
function ring(){if(S.a.rang)return;S.a.rang=1;A.sound.miss();say('BEEP! BEEP! The smoke alarm means: get out now. What do you do?')}
function first(k){const s=S.a;if(!s.rang||s.ok)return;if(k!=='out'){s.bad=k;A.sound.miss();return say(slip(k))}s.ok=1;s.bad='';A.sound.pop();say('Yes! Shout “Fire!” to wake everyone, and get out.')}
/* ---------- 2. crawl under the smoke ---------- */
const doorBox=()=>{const d=pt(DOOR);return box(d.x,d.y,Math.max(56,A.W*.13),A.H*.3)};
function drawCrawl(){const s=S.c,g=A.ctx,top=SMOKE*A.H,D=doorBox();wall('#fde68a',.35);
 g.fillStyle='rgba(51,65,85,.9)';g.fillRect(0,0,A.W,top);
 for(let i=0;i<7;i++){g.fillStyle='rgba(148,163,184,.55)';g.beginPath();g.arc(A.W*(i+.5)/7,top-6,A.W*.05,0,7);g.fill()}
 write('smoke: hot, and hard to breathe',A.W*.42,top*.55,13,{c:'#ffffff',max:A.W*.7});write('clean air down low',A.W*.4,A.H*.96,12,{c:A.col.tx,max:A.W*.5});
 card(D,s.out?'good':'');write('🚪',D.x+D.w/2,D.y+D.h*.42,26);write('way out',D.x+D.w/2,D.y+D.h*.82,11,{max:D.w-4});
 TOYS.forEach((t,i)=>{const p=pt(t);g.fillStyle=s.toy===i?'#fecaca':'#fef3c7';g.beginPath();g.arc(p.x,p.y,A.H*.055,0,7);g.fill();g.lineWidth=s.toy===i?4:2;g.strokeStyle=s.toy===i?WRONG:RIM;g.stroke();write(t.e,p.x,p.y,20)});
 if(s.path.length>1){g.strokeStyle=HOT;g.lineWidth=3;g.setLineDash([5,7]);g.beginPath();s.path.forEach((q,i)=>i?g.lineTo(q.x,q.y):g.moveTo(q.x,q.y));g.stroke();g.setLineDash([])}
 if(!s.out){const k=s.kid;g.fillStyle='#ffffff';g.beginPath();g.arc(k.x,k.y,24,0,7);g.fill();g.lineWidth=3;g.strokeStyle=HOT;g.stroke();write('🧒',k.x,k.y,22)}
 banner(s.out?'Out of the house!':'Drag me to the door',s.out)}
function crawlTo(p){const s=S.c;if(s.out)return;s.kid={x:p.x,y:p.y};s.path.push({x:p.x,y:p.y});
 if(p.y<SMOKE*A.H){restart();return say('Cough! Smoke is up high. Get down low and go.')}
 const t=TOYS.findIndex(q=>{const c0=pt(q);return Math.hypot(c0.x-p.x,c0.y-p.y)<A.H*.055+16});
 if(t>=0){restart();s.toy=t;return say(`Leave the ${TOYS[t].t}. Toys can be bought again. You cannot. Just get out.`)}
 if(hit(p,doorBox())){s.out=1;s.drag=false;A.sound.pop();return say('You got out! Low under the smoke, and no stopping for toys.')}A.redraw()}
function restart(quiet){const s=S.c;s.kid=pt(KID0);s.path=[];s.drag=false;s.toy=-1;if(!quiet)A.sound.miss()}
/* the button routes: crawl low (safe), walk tall (smoke), stop for teddy (toy) */
function route(pts){const s=S.c;if(s.out)return;restart(1);s.path=[pt(KID0)];const g0=gen;
 pts.forEach((q,j)=>setTimeout(()=>{if(g0===gen&&!s.out&&s.path.length)crawlTo(pt(q))},A.reduced()?0:170*(j+1)))}
/* ---------- 3. the meeting place ---------- */
const spotBox=i=>{const p=pt(SPOTS[i]);return box(p.x,p.y,Math.min(A.W*.36,170),A.H*.24)};
const famBox=i=>{const w=Math.max(52,A.W*.1);return box(10+w/2+i*(w+8),A.H*.88,w,A.H*.16)};
function drawMeet(){const s=S.m,g=A.ctx;wall('#bbf7d0',.4);g.fillStyle='#fecaca';g.fillRect(A.W*.02,A.H*.18,A.W*.2,A.H*.5);write('🏠',A.W*.12,A.H*.38,34);write('💨🔥',A.W*.12,A.H*.58,20);
 SPOTS.forEach((P,i)=>{const b=spotBox(i);card(b,s.bad===i?'wrong':s.hot===i?'hot':P.good&&s.safe.length?'good':'');write(P.e,b.x+b.w/2,b.y+b.h*.3,24);cardText(P.t,{x:b.x,y:b.y+b.h*.45,w:b.w,h:b.h*.55},12);
  if(P.good)s.safe.forEach((f,j)=>write(FAM[f].e,b.x+b.w*(.25+j*.25),b.y-12,18))});
 FAM.forEach((F,i)=>{if(s.safe.includes(i))return;const b=s.drag&&s.drag.i===i?box(s.drag.x,s.drag.y,famBox(i).w,famBox(i).h):famBox(i);card(b,s.pick===i?'hot':'');write(F.e,b.x+b.w/2,b.y+b.h*.38,22);write(F.n,b.x+b.w/2,b.y+b.h*.8,11,{max:b.w-4})});
 banner(s.safe.length>=FAM.length?'All 3 safe at the tree':'Take everyone to the meeting place',s.safe.length>=FAM.length)}
function meet(i,to){const s=S.m;s.drag=null;s.hot=-1;s.pick=null;if(s.safe.includes(i))return;const P=SPOTS[to];
 if(!P.good){s.bad=to;A.sound.miss();return say(P.why)}s.safe.push(i);s.bad=-1;A.sound.pop();say(`${FAM[i].n} is at the meeting place. `+(s.safe.length>=FAM.length?'Everyone is safe and counted.':`${s.safe.length} of 3.`))}
/* ---------- 4. stay out ---------- */
const stayCards=()=>grid(STAY,.46,.2);
function drawStay(){const s=S.s;wall('#bbf7d0',.4);write('🏠',A.W*.25,A.H*.22,40);write('🐱 Kitty is inside!',A.W*.62,A.H*.22,15,{c:A.col.tx,max:A.W*.5});write(`Safe things picked: ${s.done.length} of 2`,A.W/2,A.H*.38,13,{c:A.col.tx,max:A.W-20});
 stayCards().forEach(b=>{const T=STAY[b.i];card(b,s.done.includes(b.i)?'good':s.bad===b.i?'wrong':'');cardText((s.done.includes(b.i)?'✓ ':s.bad===b.i?'✗ ':'')+T.t,b,13)});
 banner(s.done.length>=2?'Stay out. Firefighters will help Kitty':'Tap the 2 safe things',s.done.length>=2)}
function stay(i){const s=S.s,T=STAY[i];if(s.done.includes(i)||s.done.length>=2)return;if(!T.good){s.bad=i;A.sound.miss();return say(T.why)}
 s.done.push(i);s.bad=-1;A.sound.pop();say(T.t+'. '+(s.done.length>=2?'A firefighter says: thank you for telling me.':'1 of 2.'))}
/* ---------- 5. call 999 ---------- */
const keyBoxes=()=>{const w=Math.min(A.W*.2,84),h=A.H*.12,x0=A.W/2-w*1.5-6;return KEYS.map((k,i)=>({k,x:x0+(i%3)*(w+6),y:A.H*.3+Math.floor(i/3)*(h+6),w,h}))};
const answerCards=()=>{const L=S.p.stage===1?SERVICE:WHERE;return L.map((_,i)=>box(A.W/2,A.H*(.38+i*.2),Math.min(A.W*.8,320),A.H*.16))};
function drawCall(){const s=S.p,g=A.ctx;wall('#bfdbfe',.4);const scr={x:A.W*.2,y:A.H*.12,w:A.W*.6,h:A.H*.14};card(scr,s.stage>=3?'good':'');
 write(s.stage===0?(s.typed||'Tap 9, 9, 9').split('').join(' '):s.stage===1?'“Which service do you need?”':s.stage===2?'“Where are you?”':'🚒 Help is on the way',scr.x+scr.w/2,scr.y+scr.h/2,15,{max:scr.w-10});
 if(s.stage===0)keyBoxes().forEach(b=>{card(b,s.bad===b.k?'wrong':'');write(b.k,b.x+b.w/2,b.y+b.h/2,20)});
 else if(s.stage<3){const L=s.stage===1?SERVICE:WHERE;answerCards().forEach((b,i)=>{card(b,s.bad===L[i].t?'wrong':'');cardText(L[i].t,b,14)})}
 banner(s.stage>=3?'You called 999':'Call 999 from outside',s.stage>=3)}
function press(k){const s=S.p;if(s.stage)return;if(k!==NUM[s.typed.length]){s.bad=k;A.sound.miss();return say(`That is ${k==='*'?'star':k==='#'?'hash':k}. The fire number is 9, 9, 9: three nines.`)}
 s.bad='';s.typed+=k;A.sound.tick();if(s.typed===NUM){s.stage=1;return say('Ringing… “Emergency. Which service do you need?”')}say(`${s.typed.length} of 3 nines.`)}
function answer(i){const s=S.p,L=s.stage===1?SERVICE:WHERE;if(s.stage<1||s.stage>2)return;const o=L[i];if(!o.good){s.bad=o.t;A.sound.miss();return say(o.why)}
 s.bad='';s.stage++;A.sound.pop();say(s.stage===2?'“Fire. Where are you?”':'“Fire engines are coming to 12 Oak Road. Stay at your meeting place.”')}
/* ---------- input ---------- */
function draw(){const k=scene();if(k==='quiz'){wall('#fecaca',.35);banner('Challenge',1);write('Get out · Get low · Stay out · 999',A.W/2,A.H*.5,15,{c:A.col.tx,max:A.W-20});return}
 ({alarm:drawAlarm,crawl:drawCrawl,meet:drawMeet,stay:drawStay,call:drawCall})[k]();A.fx.draw(A.ctx)}
function down(p){const k=scene();
 if(k==='alarm'){const al=alarmAt();if(Math.hypot(p.x-al.x,p.y-al.y)<al.r+12)ring();else if(S.a.rang){const b=firstCards().find(b=>hit(p,b));if(b)first(FIRSTS[b.i].k)}return false}
 if(k==='crawl'){const q=S.c.kid;if(!S.c.out&&Math.hypot(p.x-q.x,p.y-q.y)<44){S.c.drag=true;S.c.toy=-1;S.c.path=[{x:q.x,y:q.y}];A.redraw();return true}return false}
 if(k==='meet'){const f=FAM.findIndex((_,i)=>!S.m.safe.includes(i)&&hit(p,famBox(i)));if(f>=0){S.m.drag={i:f,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}
  const t=SPOTS.findIndex((_,i)=>hit(p,spotBox(i)));if(t>=0&&S.m.pick!=null)meet(S.m.pick,t);return false}
 if(k==='stay'){const b=stayCards().find(b=>hit(p,b));if(b)stay(b.i);return false}
 if(k==='call'){if(!S.p.stage){const b=keyBoxes().find(b=>hit(p,b));if(b)press(b.k)}else{const i=answerCards().findIndex(b=>hit(p,b));if(i>=0)answer(i)}return false}return false}
function move(p){const k=scene();if(k==='crawl'&&S.c.drag)return crawlTo(p);
 if(k==='meet'&&S.m.drag){Object.assign(S.m.drag,{x:p.x,y:p.y});const t=SPOTS.findIndex((_,i)=>hit(p,spotBox(i)));S.m.hot=t;A.redraw()}}
function up(p){const k=scene();if(k==='crawl'){S.c.drag=false;return}
 if(k==='meet'&&S.m.drag){const d=S.m.drag,t=SPOTS.findIndex((_,i)=>hit(p,spotBox(i)));if(t>=0)return meet(d.i,t);S.m.drag=null;S.m.hot=-1;
  if(Math.hypot(p.x-d.x0,p.y-d.y0)<10){S.m.pick=d.i;return say(`${FAM[d.i].n} picked. Now tap a place.`)}A.redraw()}}
function reset(){gen++;for(const k in S)delete S[k];Object.assign(S,{a:{rang:0,bad:'',ok:0},c:{kid:pt(KID0),path:[],drag:false,toy:-1,out:0},m:{safe:[],bad:-1,pick:null,drag:null,hot:-1},s:{done:[],bad:-1},p:{typed:'',stage:0,bad:''},check:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.check()}
const finish=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(DONE[i]+A.reveal(i))};
function enter(i,ok){reset();say(DESC[i]);if(ok)S.check=finish(i,ok)}
function play(i,acts,ms){steps[i].go();const g0=gen;acts.forEach((f,j)=>setTimeout(()=>{if(g0===gen)f()},ms*(j+1)))}
/* every canvas action has a labelled button twin */
function buttons(){if(!bar)return;bar.innerHTML='';const k=scene(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},bar,t).onclick=f};
 if(k==='alarm'){if(!S.a.rang)add('🔔 Tap the smoke alarm',ring);else if(!S.a.ok)FIRSTS.forEach(F=>add(F.t,()=>first(F.k)))}
 if(k==='crawl'&&!S.c.out){add('🐾 Crawl low along the floor',()=>route(LOW));add('🚶 Walk tall',()=>route(TALL));add('🧸 Stop for teddy',()=>route(STOP))}
 if(k==='meet'){if(S.m.pick==null)FAM.forEach((F,i)=>{if(!S.m.safe.includes(i))add(`${F.e} Pick ${F.n}`,()=>{S.m.pick=i;say(`${F.n} picked. Now choose a place.`)})});
  else SPOTS.forEach((P,j)=>add(`${P.e} ${P.t}`,()=>meet(S.m.pick,j),`Take ${FAM[S.m.pick].n} to: ${P.t}`))}
 if(k==='stay'&&S.s.done.length<2)STAY.forEach((T,i)=>{if(!S.s.done.includes(i))add(T.t,()=>stay(i))});
 if(k==='call'){if(!S.p.stage)['9','1','0'].forEach(d=>add(`Press ${d}`,()=>press(d)));else if(S.p.stage<3)(S.p.stage===1?SERVICE:WHERE).forEach((o,i)=>add(o.t,()=>answer(i)))}}
const steps=[
{h:'The smoke alarm',p:'It is night. Tap the smoke alarm on the ceiling. Then choose what to do.',
 predict:{q:'The smoke alarm beeps. Where is the safest place to be?',opts:['Hiding under my bed','Outside the house'],ans:1},task:'Tap the alarm, then choose',
 show:()=>play(0,[ring,()=>first('out')],520),go:()=>enter(0,()=>S.a.ok)},
{h:'Get down low',p:'There is smoke in the hall. Drag the child to the door. Do not stop for toys.',
 predict:{q:'Smoke fills the top of the hall. Where is the cleaner air?',opts:['Up high, near the ceiling','Down low, near the floor'],ans:1},task:'Get to the door',
 show:()=>play(1,[()=>route(LOW)],200),go:()=>enter(1,()=>S.c.out)},
{h:'Meeting place',p:'You are out! Drag each person to the big tree. That is the meeting place your family picked.',
 predict:{q:'You are out of the house. Can you wait right next to it?',opts:['Yes, I am out now','No, go to the meeting place'],ans:1},task:'Get all 3 to the tree',
 show:()=>play(2,[0,1,2].map(i=>()=>meet(i,0)),480),go:()=>enter(2,()=>S.m.safe.length>=FAM.length)},
{h:'Stay out',p:'Kitty the cat is still inside. Tap the two safe things to do.',
 predict:{q:'Kitty is still inside. Do you go back in for her?',opts:['Yes, quickly','No, tell a firefighter'],ans:1},task:'Pick the 2 safe things',
 show:()=>play(3,[1,3].map(i=>()=>stay(i)),480),go:()=>enter(3,()=>S.s.done.length>=2)},
{h:'Call 999',p:'A grown-up calls 999 from outside. You can too. Tap 9, 9, 9, then answer.',task:'Call 999 and ask for Fire',
 show:()=>play(4,[()=>press('9'),()=>press('9'),()=>press('9'),()=>answer(0),()=>answer(0)],420),go:()=>enter(4,()=>S.p.stage>=3)},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
/* the feedback names the slip, so the child knows what to change */
function slip(t){let m='Get out, stay out, and call 999.';
 if(t==='hide')m='Never hide under a bed or in a cupboard. Smoke gets in, and firefighters cannot find you. Get out.';
 if(t==='toys')m='Leave toys and things. They can be bought again. You cannot. Get out.';
 if(t==='look')m='Do not go and look for the fire. Shout “Fire!” and get out the quickest way.';
 if(t==='tall')m='Smoke rises, so the clean air is near the floor. Get down low and go.';
 if(t==='back')m='Never go back in, not for toys or pets. Tell a firefighter, and stay out.';
 if(t==='close')m='Do not wait by the house. Heat and smoke come out. Go to your meeting place.';
 if(t==='shed')m='Hiding means nobody knows you are safe. Go to the meeting place.';
 if(t==='number')m='For a fire in the UK, call 9 9 9: three nines.';
 if(t==='meaning')m='The beep is a warning. It means there may be smoke. Get out now.';
 return m}
function ask(){qi++;const Q=QS[qi%QS.length],opts=[[Q.a,'ok'],...Q.o],r=qi%3,list=opts.slice(r).concat(opts.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');list.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':slip(t))}
FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:X=>{quiz.hidden=X.step!==5;bar.hidden=X.step===5;buttons()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);bar=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Fire safety lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}}).start()})})();
