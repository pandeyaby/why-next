/* Flagship – brushing my teeth (ages 4–5; NHS Children's teeth; OHID 2021; Oral Health Foundation). Every side,
   a pea (and a baby's smear), 2 minutes in four parts, spit not rinse, sweets at mealtimes. Data: learn/brush_art.js. */
(()=>{const {VIEWS,AMT,PARTS,ROUTINE,MIX,SLOTS,TREATS,DESC,DONE,TXT,QS}=BRUSH;
VIS.reg('flagbrush',c=>{let A,ctl,chal,art,qn=-1,epoch=0;const S={};c.fig.classList.add('young');
const INK='#0f172a',OK='#047857',NO='#b91c1c',RIM='#64748b',F='px system-ui,sans-serif';
const mode=()=>['clean','paste','time','order','sugar','quiz'][A.step];
const sz=n=>A.narrow?n:Math.round(n*1.15);
const isIn=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const later=(ms,f)=>{const e=epoch;setTimeout(()=>{if(e===epoch)f()},ms)};
const clock=n=>`${Math.floor(n/60)}:${String(n%60).padStart(2,'0')}`;
function wash(){const g=A.ctx;g.fillStyle=A.col.dark?'#1e293b':'#f0f9ff';g.fillRect(0,0,A.W,A.H)}
const onBg=()=>A.col.dark?'#f1f5f9':INK;
const banner=(t,y,o)=>art.banner(t,y,o),card=(r,t,o)=>art.card(r,t,o);
/* ---------- 1. outside, inside and the chewing tops ---------- */
function teethR(i){const top=S.a.v<3&&VIEWS[S.a.v].k==='top',gap=A.W*.03,w=Math.min((A.W*.84-gap*3)/4,110),x0=(A.W-(4*w+3*gap))/2,h=top?w:Math.min(w*1.5,A.H*.42);return{x:x0+i*(w+gap),y:A.H*.36,w,h}}
function spotAt(j){const [t,fx,fy]=VIEWS[S.a.v].spots[j],R=teethR(t);return{x:R.x+R.w*fx,y:R.y+R.h*fy,r:Math.min(R.w*.26,22)}}
const brushU=()=>Math.min(A.W*.06,30);
function drawClean(){const s=S.a,g=A.ctx;wash();const fin=s.v>=3;banner(fin?'Every side is clean':`${VIEWS[s.v].n}: brush off the yellow plaque`,A.H*.07,{n:13,ok:fin});
 const tw=Math.min(120,(A.W-28)/3);VIEWS.forEach((V,k)=>card({x:A.W/2-1.5*tw-6+k*(tw+6),y:A.H*.14,w:tw,h:Math.min(A.H*.08,32)},(k<s.v?'✓ ':'')+V.n,{n:12,ok:k<s.v,sel:k===s.v}));
 const k=fin?'out':VIEWS[s.v].k,R0=teethR(0),R3=teethR(3);
 if(k!=='top')art.gum(R0.x-8,R0.y-A.H*.06,R3.x+R3.w-R0.x+16,A.H*.075);
 for(let i=0;i<4;i++){const R=teethR(i);art.tooth(R.x,R.y,R.w,R.h,k)}
 if(k!=='out'){g.font=`700 ${sz(11)}${F}`;g.fillStyle=onBg();g.textAlign='center';g.fillText(k==='in'?'the side by your tongue':'the tops you chew with',A.W/2,R0.y+R0.h+sz(14))}
 if(!fin)VIEWS[s.v].spots.forEach((_,j)=>{if(s.dirt[s.v][j]>0){const P=spotAt(j);art.plaque(P.x,P.y,P.r,s.dirt[s.v][j])}});
 art.brush(s.bx,s.by,brushU(),-.5)}
function scrub(d){const s=S.a;if(s.v>=3)return;const u=brushU(),bx=s.bx,by=s.by-u*.4;let wiped=0;
 VIEWS[s.v].spots.forEach((_,j)=>{if(s.dirt[s.v][j]<=0)return;const P=spotAt(j);if(Math.hypot(P.x-bx,P.y-by)<P.r*1.8){s.dirt[s.v][j]-=d/(A.W*.07);if(s.dirt[s.v][j]<=0){s.dirt[s.v][j]=0;wiped=1}}});
 if(wiped){A.sound.pop();afterWipe()}}
function afterWipe(){const s=S.a,left=s.dirt[s.v].filter(x=>x>0).length;if(left)return say(`${left} yellow spot${left>1?'s':''} still to go on the ${VIEWS[s.v].n.toLowerCase()}.`);
 s.v++;if(s.v===1)return say('The outside is clean. But teeth have an inside too, next to your tongue. Plaque hides there. Brush the inside.');
 if(s.v===2)return say('Now the chewing tops. Food gets stuck in the bumps on top. Brush the tops.');
 say('Outside, inside and tops: every side is clean.')}
function brushSpot(){const s=S.a;if(s.v>=3)return;const j=s.dirt[s.v].findIndex(x=>x>0);if(j<0)return;const P=spotAt(j),u=brushU();s.bx=P.x;s.by=P.y+u*.4;s.dirt[s.v][j]=0;A.sound.pop();afterWipe()}
/* ---------- 2. a pea for you, a smear for a baby ---------- */
const headR=()=>{const w=Math.min(A.W*.22,140),h=Math.min(A.H*.07,30);return{x:A.W*.58,y:A.H*.62,w,h}};
function drawPaste(){const s=S.b,g=A.ctx;wash();const fin=s.r>=AMT.length,R=AMT[Math.min(s.r,1)];
 banner(fin?'Right amount on both brushes':`${R.who}: how much toothpaste?`,A.H*.07,{n:13,ok:fin,no:!!s.bad});
 const sw=Math.min(110,(A.W-32)/3),sy=A.H*.15,sh=Math.min(A.H*.17,72);['smear','pea','stripe'].forEach((t,i)=>{const r={x:A.W/2-1.5*sw-8+i*(sw+8),y:sy,w:sw,h:sh};
  card(r,'',{});art.blob(r.x+r.w/2,r.y+r.h*.42,[1,2.5,6][i],Math.min(sw*.22,20));g.font=`800 ${sz(12)}${F}`;g.fillStyle=INK;g.textAlign='center';g.fillText(t==='smear'?'smear: baby':t==='pea'?'pea: age 3 to 6':'stripe: too much',r.x+r.w/2,r.y+r.h*.84)});
 const H=headR();art.hbrush(H);
 if(!fin)art.blob(H.x+H.w/2,H.y-H.h*.75,s.amt,Math.min(H.w*.25,34));
 const tw=Math.min(A.W*.36,190),th=Math.min(A.H*.1,44);art.tube(H.x+H.w/2-tw*.9,A.H*.38,tw*.8,th,s.hold?'#bae6fd':'#e0f2fe');
 g.font=`700 ${sz(12)}${F}`;g.fillStyle=onBg();g.textAlign='center';g.fillText(fin?'A pea for you. A smear for a baby.':'Press and hold to squeeze, then let go',A.W/2,A.H*.9)}
function grow(){const s=S.b;if(!s.hold||s.r>=AMT.length)return;s.amt=Math.min(7,s.amt+1);A.sound.tick();A.cv.setAttribute('aria-label',`Toothpaste on the brush: ${size(s.amt)}.`);A.redraw();later(S.slow?480:120,grow)}
const size=n=>!n?'none':n===1?'a smear':n<=3?'a pea-sized blob':'a long stripe, too much';
function judge(){const s=S.b;if(s.r>=AMT.length||!s.amt)return;const R=AMT[s.r];
 if(s.amt<R.lo){s.bad='';return say('That is a tiny smear, the amount for a baby. You are bigger: squeeze a little more.')}
 if(s.amt>R.hi){s.bad='more';A.sound.miss();const msg=s.r?'Too much for a baby. Babies under 3 need only a tiny smear. Wipe it off and try again.':'Too much! A long stripe is more than you need. A pea-sized blob cleans just as well. Wipe it off and try again.';later(S.slow?1100:150,()=>{s.amt=0;A.redraw()});return say(msg)}
 s.bad='';A.sound.pop();const was=s.r;s.r++;s.amt=0;say(was?'Yes: a tiny smear, about the size of a grain of rice, for a baby.':'Yes: a pea-sized blob. Just right for you.'+(s.r<AMT.length?' Now the baby\u2019s brush.':''))}
function squeeze(){const s=S.b;if(s.r>=AMT.length)return;s.amt=Math.min(7,s.amt+1);A.sound.tick();judge();A.redraw()}
function wipe(){S.b.amt=0;S.b.bad='';say('Wiped off. The brush is clean again.')}
/* ---------- 3. four parts, two minutes ---------- */
const partR=k=>{const x0=A.W*.05,w=A.W*.3,h=A.H*.27,y0=A.H*.2;return{x:x0+(k%2)*(w+6),y:y0+Math.floor(k/2)*(h+10),w,h}};
const stopR=()=>{const w=Math.min(A.W*.3,150),h=Math.min(A.H*.1,44);return{x:A.W*.82-w/2,y:A.H*.74,w,h}};
const total=()=>S.c.sec.reduce((a,b)=>a+b,0);
function drawTime(){const s=S.c,g=A.ctx;wash();const all=total()>=120;banner(all?'2 minutes: every part brushed':'Tap a part of the mouth to brush it',A.H*.07,{n:13,ok:all,no:!!s.bad});
 const m0=partR(0),m3=partR(3);g.fillStyle='#be185d';A.paint.rrect(m0.x-6,m0.y-6,m3.x+m3.w-m0.x+12,m3.y+m3.h-m0.y+12,26);g.fill();
 PARTS.forEach((t,k)=>{const r=partR(k),f=s.sec[k]/30;g.fillStyle='#fdf2f8';A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.fillStyle='#bbf7d0';A.paint.rrect(r.x,r.y+r.h*(1-f),r.w,r.h*f,14);g.fill();
  g.lineWidth=s.part===k?4:1.6;g.strokeStyle=s.part===k?'#1d4ed8':f>=1?OK:RIM;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.stroke();
  for(let i=0;i<4;i++){const tw=r.w*.17;art.tooth(r.x+r.w*.1+i*(tw+r.w*.04),k<2?r.y+r.h*.55:r.y+r.h*.12,tw,r.h*.3,'out')}
  g.font=`800 ${sz(12)}${F}`;g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,r.x+r.w/2,k<2?r.y+r.h*.25:r.y+r.h*.65);g.fillText((f>=1?'✓ ':'')+clock(s.sec[k]),r.x+r.w/2,k<2?r.y+r.h*.42:r.y+r.h*.84);
  if(s.part===k)art.brush(r.x+r.w*.8,r.y+r.h*.6,Math.min(r.w*.13,22),-.4)});
 const cx=A.W*.82,cy=A.H*.42,rad=Math.min(A.W*.12,A.H*.16,62);art.dial(cx,cy,rad,Math.min(1,total()/120),clock(total()),all);
 g.font=`700 ${sz(11)}${F}`;g.fillStyle=onBg();g.fillText('of 2:00',cx,cy+rad+sz(12));if(!all)card(stopR(),'Finished?',{n:14,no:s.bad==='stop'})}
function run(){const s=S.c;if(s.part<0){s.go=0;return}if(s.sec[s.part]>=30){A.sound.pop();const k=s.part;s.part=-1;s.go=0;
  return say(total()>=120?'2 minutes! Every part is clean.':`${PARTS[k]} is clean. Tap another part.`)}s.sec[s.part]++;A.redraw();later(S.slow?55:12,run)}
function pickPart(k){const s=S.c;if(total()>=120)return;if(s.sec[k]>=30){s.bad='';return say(`${PARTS[k]} is done already. Pick a part that is not finished yet.`)}
 s.part=k;s.bad='';A.sound.tick();say(`Brushing ${PARTS[k].toLowerCase()}, gently, in small circles.`);if(!s.go){s.go=1;run()}}
function stopNow(){const s=S.c;if(total()>=120)return;s.part=-1;s.bad='stop';A.sound.miss();const left=PARTS.filter((_,k)=>s.sec[k]<30).map(t=>t.toLowerCase());
 say(`Only ${clock(total())}. Plaque is still on ${left.join(', ')}. Keep going to 2 minutes.`)}
/* ---------- 4. the bedtime steps ---------- */
const rowR=(col,i)=>{const w=(A.W-24)/2,h=Math.min(A.H*.11,50),y0=A.H*.15;return{x:col?A.W/2+4:8,y:y0+i*(h+6),w,h}};
function drawOrder(){const s=S.d,g=A.ctx;wash();const fin=s.got.length>=4;banner(fin?'Bedtime brushing, in order':`Tap step ${s.got.length+1} of bedtime brushing`,A.H*.07,{n:13,ok:fin,no:s.bad>=0});
 MIX.forEach((k,i)=>card(rowR(0,i),ROUTINE[k].t,{dim:s.got.includes(k),no:s.bad===k,n:13}));
 for(let i=0;i<4;i++)card(rowR(1,i),i<s.got.length?`${i+1}. ${ROUTINE[s.got[i]].t}`:`${i+1}.`,{ok:i<s.got.length,n:13});
 const r4=rowR(1,4),tw=Math.min(r4.h*1.1,60),tx=r4.x+r4.w/2-tw/2,ty=r4.y+4;if(s.shield>0){g.save();g.globalAlpha=s.shield;g.strokeStyle='#22d3ee';g.lineWidth=7;A.paint.rrect(tx-5,ty-5,tw+10,tw*1.2+10,14);g.stroke();g.restore()}
 art.tooth(tx,ty,tw,tw*1.2,'out');g.font=`700 ${sz(11)}${F}`;g.fillStyle=onBg();g.textAlign='center';g.textBaseline='middle';g.fillText(s.shield>.5?'fluoride stays on':'fluoride washed off',r4.x+r4.w/2,ty+tw*1.2+sz(14))}
function fade(){const s=S.d;if(s.shield<=0)return;s.shield=Math.max(0,s.shield-.1);A.redraw();if(s.shield>0)later(40,fade);else later(S.slow?1200:200,()=>{s.shield=1;A.redraw()})}
function pickStep(k){const s=S.d,R=ROUTINE[k];if(s.got.length>=4||s.got.includes(k))return;
 if(R.n<0){s.bad=k;A.sound.miss();if(R.n===-1)fade();return say(R.why)}
 if(R.n!==s.got.length){s.bad=k;A.sound.miss();return say(`"${R.t}" comes later. What do you do before that?`)}
 s.got.push(k);s.bad=-1;A.sound.pop();say(R.n===2?'Spit it out. The toothpaste goes, but the fluoride stays on your teeth to keep them strong.':R.n===3?'Into bed, with nothing to eat or drink but water. That is the whole routine.':`${R.n+1}. ${R.t}. What comes next?`)}
/* ---------- 5. treats at mealtimes ---------- */
/* six times of day in a row; 2 rows of 3 on a phone */
const colR=i=>{if(A.narrow){const w=(A.W-28)/3,r=Math.floor(i/3);return{x:8+(i%3)*(w+6),y:A.H*.14+r*A.H*.39,w,h:A.H*.3}}const w=(A.W-16-5*4)/6;return{x:8+i*(w+4),y:A.H*.16,w,h:A.H*.52}};
const labH=()=>Math.min(A.H*(A.narrow?.085:.11),A.narrow?34:46);
const treatR=j=>{const s=S.e,i=s.at[j],C=colR(i),k=TREATS.filter((_,q)=>q<j&&s.at[q]===i).length;
 if(A.narrow){const h=Math.min(A.H*.062,24),w=(C.w-10)/2;return{x:C.x+3+(k%2)*(w+4),y:C.y+C.h*.55+Math.floor(k/2)*(h+4),w,h}}
 const h=Math.min(A.H*.08,34);return{x:C.x+2,y:C.y+C.h*.36+k*(h+5),w:C.w-4,h}};
const attacks=()=>3+new Set(S.e.at.filter(i=>!SLOTS[i].meal)).size;
function drawSugar(){const s=S.e,g=A.ctx;wash();const n=attacks();banner(`Acid attacks today: ${n}`+(n<=3?': as few as can be':''),A.H*.07,{n:13,ok:n<=3,no:!!s.bad});
 SLOTS.forEach((L,i)=>{const C=colR(i);g.fillStyle=L.bed?'#e0e7ff':L.meal?'#fef9c3':'#ffffff';A.paint.rrect(C.x,C.y,C.w,C.h,9);g.fill();g.strokeStyle=RIM;g.lineWidth=1.4;g.stroke();
  card({x:C.x+2,y:C.y+3,w:C.w-4,h:labH()},L.bed?'After brushing':L.t,{n:12,fill:'#ffffff'});
  if(L.meal){g.fillStyle='#ffffff';g.strokeStyle='#475569';g.lineWidth=2;g.beginPath();g.arc(C.x+C.w/2,C.y+labH()+(A.narrow?C.h*.12:C.h*.1),Math.min(C.w*(A.narrow?.12:.28),A.narrow?11:18),0,7);g.fill();g.stroke()}
  const hit=L.meal||s.at.includes(i),by=C.y+C.h+(A.narrow?3:6),bh=Math.min(A.H*(A.narrow?.045:.06),A.narrow?18:24);if(hit){g.fillStyle='#b91c1c';A.paint.rrect(C.x,by,C.w,bh,6);g.fill();g.font=`800 ${sz(10)}${F}`;g.fillStyle='#ffffff';g.textAlign='center';g.textBaseline='middle';g.fillText(L.bed?'all night':'acid',C.x+C.w/2,by+bh/2+1)}});
 TREATS.forEach((T,j)=>{if(s.drag&&s.drag.j===j)return;card(treatR(j),T.t,{n:11,sel:s.sel===j,no:s.bad===T.k,fill:'#fff7ed'})});
 if(s.drag){const r=treatR(s.drag.j);card({x:s.drag.x-r.w/2,y:s.drag.y-r.h/2,w:r.w,h:r.h},TREATS[s.drag.j].t,{n:11,sel:1})}
 g.font=`700 ${sz(11)}${F}`;g.fillStyle=onBg();g.textAlign='center';g.textBaseline='middle';g.fillText('Each red bar is an acid attack, up to an hour long',A.W/2,A.H*.93)}
function moveTreat(j,i){const s=S.e,T=TREATS[j],L=SLOTS[i];s.at[j]=i;s.sel=-1;s.drag=null;const n=attacks();
 if(L.bed){s.bad=T.k;A.sound.miss();return say(`Not after the bedtime brush: ${T.t.toLowerCase()} would sit on your teeth all night. Only water after brushing. Acid attacks: ${n}.`)}
 if(!L.meal){s.bad='';A.sound.tick();return say(`${T.t} at snack time is a new acid attack, up to an hour long. Acid attacks: ${n}.`)}
 s.bad='';A.sound.pop();say(`${T.t} with ${L.t.toLowerCase()}: no new acid attack, because teeth are already having one at the meal. Acid attacks: ${n}.`)}
/* ---------- wiring ---------- */
function draw(){const k=mode();if(k==='quiz'){wash();art.quiz();return}
 ({clean:drawClean,paste:drawPaste,time:drawTime,order:drawOrder,sugar:drawSugar})[k]();A.fx.draw(A.ctx)}
function down(p){const k=mode();
 if(k==='clean'){if(S.a.v>=3)return false;S.a.drag=1;S.a.bx=p.x;S.a.by=p.y;A.redraw();return true}
 if(k==='paste'){if(S.b.r>=AMT.length)return false;S.b.hold=1;grow();return true}
 if(k==='time'){if(isIn(p,stopR()))return stopNow(),false;const q=[0,1,2,3].find(q=>isIn(p,partR(q)));if(q!=null)pickPart(q);return false}
 if(k==='order'){const i=MIX.findIndex((_,i)=>isIn(p,rowR(0,i)));if(i>=0)pickStep(MIX[i]);return false}
 if(k==='sugar'){const s=S.e,j=TREATS.findIndex((_,j)=>isIn(p,treatR(j)));if(j>=0){s.drag={j,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}
  const i=SLOTS.findIndex((_,i)=>isIn(p,colR(i)));if(i>=0&&s.sel>=0)moveTreat(s.sel,i);return false}return false}
function move(p){const k=mode();if(k==='clean'&&S.a.drag){const s=S.a,d=Math.hypot(p.x-s.bx,p.y-s.by);s.bx=p.x;s.by=p.y;scrub(d);A.redraw()}
 if(k==='sugar'&&S.e.drag){S.e.drag.x=p.x;S.e.drag.y=p.y;A.redraw()}}
function up(p){const k=mode();if(k==='clean')S.a.drag=0;if(k==='paste'&&S.b.hold){S.b.hold=0;judge();A.redraw()}
 if(k==='sugar'&&S.e.drag){const s=S.e,d=s.drag,far=Math.hypot(d.x-d.x0,d.y-d.y0)>12;s.drag=null;const i=SLOTS.findIndex((_,i)=>isIn(d,colR(i)));
  if(far&&i>=0)moveTreat(d.j,i);else{s.sel=d.j;say(`${TREATS[d.j].t} picked. Now tap a meal to move it there.`)}}}
function fresh(){epoch++;for(const k in S)delete S[k];Object.assign(S,{slow:1,a:{v:0,dirt:VIEWS.map(V=>V.spots.map(()=>1)),bx:A.W*.5,by:A.H*.88,drag:0},b:{r:0,amt:0,hold:0,bad:''},
 c:{part:-1,sec:[0,0,0,0],go:0,bad:''},d:{got:[],bad:-1,shield:1},e:{at:TREATS.map(t=>t.at),drag:null,sel:-1,bad:''},check:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.check()}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function enter(i,ok){fresh();say(DESC[i]);S.check=finish(i,ok,DONE[i])}
function demo(i,list){steps[i].go();S.slow=0;const e=epoch;let t=0;list.forEach(([ms,f])=>{t+=ms;setTimeout(()=>{if(e===epoch)f()},t)})}
function buttons(){if(!ctl)return;ctl.innerHTML='';const k=mode(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(k==='clean'&&S.a.v<3)B('🪥 Brush the next spot',brushSpot,`Brush the next yellow spot on the ${VIEWS[S.a.v].n.toLowerCase()}`);
 if(k==='paste'&&S.b.r<AMT.length){B('Squeeze a little',squeeze,'Squeeze a little toothpaste');B('Wipe it off',wipe,'Wipe the toothpaste off')}
 if(k==='time'&&total()<120){PARTS.forEach((t,q)=>{if(S.c.sec[q]<30)B(`Brush ${t.toLowerCase()}`,()=>pickPart(q))});B('Finished?',stopNow,'Say you have finished brushing')}
 if(k==='order'&&S.d.got.length<4)MIX.forEach(q=>{if(!S.d.got.includes(q))B(ROUTINE[q].t,()=>pickStep(q))});
 if(k==='sugar'&&attacks()>3)TREATS.forEach((T,j)=>B(`Move ${T.t.toLowerCase()}`,()=>moveTreat(j,(S.e.at[j]+1)%SLOTS.length),`Move ${T.t.toLowerCase()}, now at ${SLOTS[S.e.at[j]].bed?'after brushing':SLOTS[S.e.at[j]].t.toLowerCase()}`))}
const steps=[
{h:'Every side',p:TXT[0],predict:{q:'Is brushing the front of your teeth enough?',opts:['Yes, the front is what shows','No, the inside and tops too'],ans:1},task:'Clean the outside, inside and tops',
 show:()=>demo(0,VIEWS.flatMap(V=>V.spots.map(()=>[140,brushSpot]))),go:()=>enter(0,()=>S.a.v>=3)},
{h:'A pea-sized blob',p:TXT[1],predict:{q:'Does more toothpaste clean your teeth better?',opts:['No, a blob the size of a pea is enough','Yes, lots is best'],ans:0},task:'Put the right amount on both brushes',
 show:()=>demo(1,[[250,squeeze],[300,squeeze],[500,squeeze]]),go:()=>enter(1,()=>S.b.r>=AMT.length)},
{h:'Two minutes',p:TXT[2],predict:{q:'How long should you brush your teeth?',opts:['About 10 seconds','About 2 minutes'],ans:1},task:'Brush all 4 parts to 2 minutes',
 show:()=>demo(2,[0,1,2,3].map(q=>[q?650:100,()=>pickPart(q)])),go:()=>enter(2,()=>total()>=120)},
{h:'Spit, do not rinse',p:TXT[3],predict:{q:'After brushing, should you rinse your mouth with water?',opts:['Yes, rinse it all out','No, just spit'],ans:1},task:'Put the bedtime steps in order',
 show:()=>demo(3,[0,1,2,3].map(n=>[260,()=>pickStep(ROUTINE.findIndex(R=>R.n===n))])),go:()=>enter(3,()=>S.d.got.length>=4)},
{h:'Sweets at mealtimes',p:TXT[4],predict:{q:'Three sweet treats in a day. Which is better for your teeth?',opts:['All with meals','One at a time, all day'],ans:0},task:'Get down to 3 acid attacks',
 show:()=>demo(4,TREATS.map((_,j)=>[300,()=>moveTreat(j,[0,2,4][j])])),go:()=>enter(4,()=>attacks()<=3)},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
function why(t){let m='Brush every side for about 2 minutes, with a pea of toothpaste, then spit and do not rinse.';
 if(t==='front')m='The front is only one side. Plaque hides on the inside, by your tongue, and on the chewing tops. Brush them all.';
 if(t==='more')m='More toothpaste does not clean better. A pea-sized blob is enough for you, and too much can get swallowed.';
 if(t==='fast')m='A quick brush misses lots of plaque. Brush for about 2 minutes, so every part of your mouth gets a turn.';
 if(t==='rinse')m='Rinsing washes the fluoride off, so it cannot keep your teeth strong. Just spit it out.';
 if(t==='night')m='Brushing is the last thing at night. Food or juice after it sits on your teeth all night. Only water after brushing.';
 if(t==='graze')m='Every sweet snack starts a new acid attack, up to an hour long. Keep sweet things to mealtimes.';
 if(t==='hard')m='Brush gently, in small circles. Scrubbing hard can hurt your gums and does not clean better.';
 if(t==='times')m='Brush every day, twice: last thing at night and one other time, like after breakfast.';
 return m}
function ask(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function mark(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.6,tall:1.1,draw,onStep:X=>{chal.hidden=X.step!==5;ctl.hidden=X.step===5;buttons()},
 init:X=>{A=X;art=BRUSH.SHAPES(A);const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Tooth brushing lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});buttons()}}).start()})})();
