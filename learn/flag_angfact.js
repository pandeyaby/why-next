/* Flagship – angles on a straight line, round a point and vertically opposite (ages 10–11; NC England Year 6
   geometry; Euclid I.13 and I.15). Scenes: turn a ray on a straight line and watch a + b stay 180°; pick the missing
   angle on a line from number chips that hide the usual slips; turn three rays round a point until the angles are
   equal; tap the partner of a highlighted angle where two lines cross; find every angle in a crossing with a reason
   card (straight line, vertically opposite, round a point, or "it looks right"). Every drag or tap has a button twin.
   Data, words and helpers in learn/angfact_art.js. */
(()=>{const {on,norm,snap,dirOf,tip,pen,LINE,CROSS,NAMES,GIVEN,CHAIN,REASONS,START,LEARNT,QUIZ}=ANGF;
VIS.reg('flagangfact',c=>{let A,P,ctl,chal,round=-1,epoch=0;
const C={ink:'#1f2937',ok:'#047857',ko:'#b91c1c',rim:'#64748b',sel:'#1d4ed8',warm:'#b45309',bg:'#f8fafc',hd:'#1e3a8a',blue:'#bfdbfe',amb:'#fde68a',grn:'#bbf7d0',pnk:'#fbcfe8',hi:'#fef08a',dot:'#1d4ed8'};
const TINT=[C.blue,C.amb,C.grn,C.pnk];
const W={};const part=()=>['line','missing','point','cross','reason','quiz'][A.step];
const head=t=>P.text(t,A.W/2,A.H*.04,13,{c:C.hd,w:A.W-20});
const tally=(t,good)=>P.text(t,A.W/2,A.H*.955,12,{b:800,c:good?C.ok:C.ink,w:A.W-20});
const holding=i=>W.grip&&W.grip.i===i;
/* ---------- 1: a + b on a straight line ---------- */
const lineO=()=>({x:A.W/2,y:A.H*(A.narrow?.6:.66)}),lineL=()=>Math.min(A.W*.44,A.H*(A.narrow?.62:.78));
function baseLine(o,L){const g=A.ctx;g.strokeStyle=C.ink;g.lineWidth=3.5;g.lineCap='round';g.beginPath();g.moveTo(o.x-L,o.y);g.lineTo(o.x+L,o.y);g.stroke();
 g.fillStyle=C.ink;g.beginPath();g.arc(o.x,o.y,4,0,7);g.fill()}
function paintLine(){const o=lineO(),L=lineL(),r=Math.min(L*.42,A.H*.22),t=W.th;head('One straight line, one ray');
 P.wedge(o,0,t,r,C.blue,`a = ${t}°`);P.wedge(o,t,180,r*.82,C.amb,`b = ${180-t}°`);baseLine(o,L);const e=P.ray(o,t,L*.86,C.dot,3.5);P.knob(e,C.dot);
 P.text(`a + b = ${t}° + ${180-t}° = 180°`,A.W/2,A.H*.8,13,{b:800,c:C.hd});
 P.text('Tried: '+(W.tried.map(x=>x+'°').join(', ')||'none yet'),A.W/2,A.H*.87,10,{b:600,c:C.rim,w:A.W-20});
 tally(W.tried.length>=3?'✓ 3 positions: always 180°':`Positions tried: ${W.tried.length} of 3`,W.tried.length>=3)}
function setTh(d){W.th=Math.max(10,Math.min(170,d));A.redraw()}
function tryHere(){const t=W.th;if(W.tried.some(x=>Math.abs(x-t)<20)){A.sound.tick();return speak(`a = ${t}°, b = ${180-t}°. You tried close to here already: turn the ray further.`)}
 W.tried.push(t);A.sound.pop();speak(`a = ${t}° and b = ${180-t}°. Together: ${t} + ${180-t} = 180°.`+(W.tried.length>=3?' Three positions, the same total every time.':''))}
function turnRay(by){setTh(W.th+by);tryHere()}
/* ---------- 2: the missing angle on a line ---------- */
const chipBox=i=>P.grid(4,A.narrow?2:4,{x:A.W*.06,y:A.H*(A.narrow?.7:.74),w:A.W*.88,h:A.H*(A.narrow?.17:.12)})[i];
function paintMissing(){const pz=LINE[Math.min(W.pz,LINE.length-1)],o=lineO(),L=lineL(),r=Math.min(L*.4,A.H*.19),done=W.pz>=LINE.length;
 o.y=A.H*(A.narrow?.52:.56);head(done?'All 3 lines solved':`Line ${W.pz+1} of 3: find ?`);
 let d=0;pz.known.forEach((k,j)=>{P.wedge(o,d,d+k,r*(1-j*.12),TINT[j],`${k}°`);if(k===90)P.square(o,d,14);d+=k});
 const miss=180-d;P.wedge(o,d,180,r*.74,W.hot?'#fde047':C.hi,done?`${miss}°`:'?',C.warm);baseLine(o,L);
 let s=0;pz.known.forEach(k=>{s+=k;if(s<180)P.ray(o,s,L*.86,C.ink,3)});
 if(W.last)P.text(W.last,A.W/2,A.H*.64,12,{b:800,c:C.ok,w:A.W-20});
 if(!done)pz.chips.forEach(([v],i)=>{const b=chipBox(i),r2=holding(i)?{...b,x:W.grip.x-b.w/2,y:W.grip.y-b.h/2}:b;P.card(r2,'#ffffff',W.bad===i?'ko':holding(i)?'sel':'');P.text(`${v}°`,r2.x+r2.w/2,r2.y+r2.h/2,14,{b:800})});
 tally(done?'✓ 3 missing angles found':`Solved: ${W.pz} of 3`,done)}
function pickChip(i){if(W.pz>=LINE.length)return;const pz=LINE[W.pz],[v,s]=pz.chips[i];W.hot=0;
 if(s){W.bad=i;A.sound.miss();return speak(`${v}°? `+slip(s))}
 W.bad=-1;W.last=`180° − ${pz.known.join('° − ')}° = ${v}°`;W.pz++;A.sound.pop();speak(W.last+'.'+(W.pz>=LINE.length?' All three lines solved.':' Next line.'))}
/* ---------- 3: round a point ---------- */
const ptO=()=>({x:A.W/2,y:A.H*.44}),ptR=()=>Math.min(A.W*.36,A.H*.33);
const gaps=()=>{const s=W.rays.map((d,i)=>({d,i})).sort((p,q)=>p.d-q.d);return s.map((p,j)=>({from:p.d,to:s[(j+1)%3].d,v:norm(s[(j+1)%3].d-p.d)||360}))};
function paintPoint(){const o=ptO(),R=ptR(),gs=gaps(),eq=gs.every(x=>x.v===120);head(eq?'Three equal angles round a point':'Angles round a point');
 gs.forEach((x,j)=>P.wedge(o,x.from,x.to,R*(.36+j*.06),[C.blue,C.amb,C.grn][j],`${x.v}°`));
 W.rays.forEach((d,i)=>{const e=P.ray(o,d,R,C.ink,3);P.knob(e,holding(i)?C.sel:C.dot);P.text(String.fromCharCode(65+i),e.x+(e.x<o.x?-16:16),e.y-12,11,{b:800,c:C.hd})});
 P.text(gs.map(x=>x.v+'°').join(' + ')+' = 360°',A.W/2,A.H*.84,13,{b:800,c:C.hd});
 tally(eq?'✓ 120° + 120° + 120° = 360°':'Make all three angles the same size',eq)}
function setRay(i,d){d=norm(snap(d,5));if(W.rays.some((x,j)=>j!==i&&Math.min(norm(x-d),norm(d-x))<15)){A.sound.miss();return false}W.rays[i]=d;return true}
function turnRayPt(i,by){if(!setRay(i,W.rays[i]+by))return speak('Rays cannot pass through each other. Turn another ray.');A.sound.tick();sayPoint()}
function sayPoint(){const gs=gaps();speak(`Angles: ${gs.map(x=>x.v+'°').join(', ')}. Total ${gs.reduce((s,x)=>s+x.v,0)}°.`+(gs.every(x=>x.v===120)?' All equal: 360 ÷ 3 = 120° each.':''))}
/* ---------- 4: crossing lines ---------- */
const crO=()=>({x:A.W/2,y:A.H*.46}),crR=()=>Math.min(A.W*.42,A.H*.36);
const sect=phi=>[[0,phi],[phi,180],[180,180+phi],[180+phi,360]];
const sizeOf=(k,phi)=>k%2?180-phi:phi;
function crossing(o,R,phi,fills,labels){sect(phi).forEach(([a,b],k)=>P.wedge(o,a,b,R*.42,fills[k],labels[k]));
 const g=A.ctx;g.strokeStyle=C.ink;g.lineWidth=3.5;g.lineCap='round';[[0,180],[phi,phi+180]].forEach(([d1,d2])=>{const p=tip(o,d1,R),q=tip(o,d2,R);g.beginPath();g.moveTo(p.x,p.y);g.lineTo(q.x,q.y);g.stroke()})}
function paintCross(){const o=crO(),R=crR(),done=W.rd>=CROSS.length,ask=done?-1:CROSS[W.rd].ask;head(done?'Opposite angles match every time':'Which angle equals the yellow one?');
 crossing(o,R,W.phi,[0,1,2,3].map(k=>k===ask?C.hi:W.bad===k?'#fee2e2':W.found===k?C.grn:'#ffffff'),
  [0,1,2,3].map(k=>k===ask||W.found===k||W.bad===k?`${NAMES[k]} = ${sizeOf(k,W.phi)}°`:NAMES[k]));
 P.knob(tip(o,W.phi,R),C.dot);P.text('drag to turn',tip(o,W.phi,R).x,tip(o,W.phi,R).y-22,10,{b:700,c:C.rim});
 tally(done?'✓ Found 3 opposite pairs':`Pairs found: ${W.rd} of 3`,done)}
function tapAngle(k){if(W.rd>=CROSS.length)return;const ask=CROSS[W.rd].ask;if(k===ask)return speak(`That is the yellow angle itself, ${NAMES[k]}. Find its partner.`);
 if(k!==(ask+2)%4){W.bad=k;A.sound.miss();return speak(`${NAMES[k]} = ${sizeOf(k,W.phi)}°, not ${sizeOf(ask,W.phi)}°. `+slip('adjopp'))}
 W.bad=-1;W.found=k;A.sound.pop();const v=sizeOf(k,W.phi);W.rd++;
 speak(`${NAMES[ask]} and ${NAMES[k]} are vertically opposite: both ${v}°.`+(W.rd>=CROSS.length?' Three pairs, equal every time.':' The line turns. Again.'));
 if(W.rd<CROSS.length){W.phi=CROSS[W.rd].phi;W.found=-1}}
function turnLine(by){W.phi=Math.max(20,Math.min(160,W.phi+by));W.bad=-1;A.sound.tick();
 const ask=W.rd<CROSS.length?CROSS[W.rd].ask:0;speak(`The line turned. Yellow angle ${NAMES[ask]} is now ${sizeOf(ask,W.phi)}°.`)}
/* ---------- 5: give a reason ---------- */
const rsBox=i=>P.grid(4,2,{x:A.W*.04,y:A.H*(A.narrow?.66:.7),w:A.W*.92,h:A.H*(A.narrow?.22:.18)})[i];
function chainVal(k){return k%2?180-GIVEN:GIVEN}
function paintReason(){const o={x:A.W/2,y:A.H*.36},R=Math.min(A.W*.4,A.H*.28),cur=W.ch<CHAIN.length?CHAIN[W.ch].k:-1;
 head(cur<0?'Every angle found with a reason':`Find ${NAMES[cur]}: which fact gives it?`);
 const known=k=>k===0||W.vals[k]!=null;
 crossing(o,R,GIVEN,[0,1,2,3].map(k=>k===cur?C.hi:known(k)?[C.blue,C.amb,C.grn,C.pnk][k]:'#ffffff'),[0,1,2,3].map(k=>known(k)?`${NAMES[k]} = ${k?W.vals[k]:GIVEN}°`:`${NAMES[k]} = ?`));
 P.text(W.last||'Not drawn to scale: use a fact, not your eyes.',A.W/2,A.H*(A.narrow?.6:.63),11,{b:700,c:W.last?C.ok:C.rim,w:A.W-24});
 if(cur>=0)REASONS.forEach((x,i)=>{const b=rsBox(i),r2=holding(i)?{...b,x:W.grip.x-b.w/2,y:W.grip.y-b.h/2}:b;P.card(r2,'#eff6ff',W.bad===i?'ko':holding(i)?'sel':'');P.text(x.t,r2.x+r2.w/2,r2.y+r2.h/2,10,{w:r2.w-10})});
 tally(cur<0?`✓ ${GIVEN}° + ${180-GIVEN}° + ${GIVEN}° + ${180-GIVEN}° = 360°`:`Angles found: ${W.ch} of 3`,cur<0)}
function useReason(i){if(W.ch>=CHAIN.length)return;const step=CHAIN[W.ch],k=step.k,id=REASONS[i].id,v=chainVal(k);
 if(!step.ok.includes(id)){W.bad=i;A.sound.miss();return speak(slip(id==='look'?'look':id==='point'?'early':'oppb'))}
 W.bad=-1;W.vals[k]=v;const sum=(W.vals[1]||0)+(W.vals[2]||0);
 W.last=id==='line'?`${NAMES[k]} = 180° − ${k===1?GIVEN:k===2?W.vals[1]:W.vals[2]}° = ${v}° (straight line)`:id==='opp'?`${NAMES[k]} = ${NAMES[k-2]} = ${v}° (vertically opposite)`:`${NAMES[k]} = 360° − ${GIVEN}° − ${sum}° = ${v}° (round a point)`;
 W.ch++;A.sound.pop();speak(W.last+'.')}
/* ---------- what went wrong, in words ---------- */
function slip(t){let m='Use the fact that fits: a straight line is 180°, a full turn round a point is 360°, opposite angles are equal.';
 if(t==='full')m='That used 360°. Angles on a straight line add to 180°. 360° is a full turn round a point.';
 if(t==='line')m='That used 180°. Angles round a point make a full turn, so they add to 360°.';
 if(t==='same')m='Angles next to each other on a line are only equal if both are 90°. They add to 180°.';
 if(t==='add')m='That is the total of the angles you know. Take it away from 180°.';
 if(t==='ninety')m='That took it away from 90°. A straight line is 180°, two right angles.';
 if(t==='quarter')m='90° each fits four equal angles. Three equal angles share 360°: 360 ÷ 3.';
 if(t==='adjopp')m='That angle is next to it: the two share a straight line and add to 180°. The equal one is across the crossing point.';
 if(t==='oppnext')m='That is the opposite angle. The one next to it shares a straight line, so the two add to 180°.';
 if(t==='oppb')m='b is next to a, not opposite it. Angles next to each other on a straight line add to 180°.';
 if(t==='early')m='Round a point needs all the other angles at the point. You do not know them yet.';
 if(t==='look'||t==='look2')m='Diagrams are often not drawn to scale. Find the angle with a fact, not by how it looks.';
 return m}
/* ---------- canvas, pointer, buttons ---------- */
function draw(){const k=part(),g=A.ctx;g.fillStyle=C.bg;g.fillRect(0,0,A.W,A.H);P=ANGF.pen(A,C);
 if(k==='quiz'){const o={x:A.W/2,y:A.H*.45};crossing(o,Math.min(A.W,A.H)*.3,60,['#ffffff',C.hi,'#ffffff',C.hi],['','?','','?']);P.text('Challenge',A.W/2,A.H*.86,20);return}
 ({line:paintLine,missing:paintMissing,point:paintPoint,cross:paintCross,reason:paintReason})[k]();A.fx.draw(g)}
function down(p){const k=part(),grab=i=>{W.grip={i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true};
 if(k==='line'&&p.y<lineO().y+20){setTh(snap(dirOf(lineO(),p)>180?(dirOf(lineO(),p)>270?10:170):dirOf(lineO(),p)));return grab(-1)}
 if(k==='missing'&&W.pz<LINE.length){const i=LINE[0].chips.findIndex((_,j)=>on(p,chipBox(j)));if(i>=0)return grab(i)}
 if(k==='point'){const o=ptO(),R=ptR();let best=-1,bd=48;W.rays.forEach((d,i)=>{const e=tip(o,d,R),dd=Math.hypot(e.x-p.x,e.y-p.y);if(dd<bd){bd=dd;best=i}});if(best>=0)return grab(best)}
 if(k==='cross'&&W.rd<CROSS.length){const o=crO(),R=crR(),e=tip(o,W.phi,R);if(Math.hypot(e.x-p.x,e.y-p.y)<44)return grab(-2);
  const dd=Math.hypot(p.x-o.x,p.y-o.y);if(dd<R){const d=dirOf(o,p),s=sect(W.phi).findIndex(([a,b])=>d>=a&&d<b);if(s>=0)tapAngle(s)}}
 if(k==='reason'&&W.ch<CHAIN.length){const i=REASONS.findIndex((_,j)=>on(p,rsBox(j)));if(i>=0)return grab(i)}
 return false}
function drag(p){const h=W.grip;if(!h)return;h.x=p.x;h.y=p.y;const k=part();
 if(k==='line'){const d=dirOf(lineO(),p);setTh(snap(d>180?(d>270?10:170):d))}
 if(k==='point'&&setRay(h.i,dirOf(ptO(),p)))A.redraw();
 if(k==='cross'&&h.i===-2){const d=dirOf(crO(),p);W.phi=Math.max(20,Math.min(160,snap(d>180?d-180:d)))}
 if(k==='missing')W.hot=p.y<A.H*.62?1:0;A.redraw()}
function lift_end(p){const h=W.grip;if(!h)return;W.grip=null;const k=part(),tap=Math.hypot(p.x-h.x0,p.y-h.y0)<=12;W.hot=0;
 if(k==='line')return tryHere();
 if(k==='missing'){if(tap||p.y<A.H*.62)return pickChip(h.i);return A.redraw()}
 if(k==='point')return sayPoint();
 if(k==='cross'){const ask=W.rd<CROSS.length?CROSS[W.rd].ask:0;return speak(`Yellow angle ${NAMES[ask]} is now ${sizeOf(ask,W.phi)}°.`)}
 if(k==='reason'){if(tap||p.y<A.H*.6)return useReason(h.i);return A.redraw()}
 A.redraw()}
function speak(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();W.test()}
function keys(){if(!ctl)return;ctl.innerHTML='';const k=part(),btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(k==='line'){btn('Turn ray left 20°',()=>turnRay(20),'Turn the ray 20 degrees to the left');btn('Turn ray right 20°',()=>turnRay(-20),'Turn the ray 20 degrees to the right')}
 if(k==='missing'&&W.pz<LINE.length)LINE[W.pz].chips.forEach(([v],i)=>btn(`? = ${v}°`,()=>pickChip(i),`The missing angle is ${v} degrees`));
 if(k==='point')W.rays.forEach((d,i)=>{const n=String.fromCharCode(65+i);btn(`Ray ${n} ↺ 15°`,()=>turnRayPt(i,15),`Turn ray ${n} 15 degrees anticlockwise`);btn(`Ray ${n} ↻ 15°`,()=>turnRayPt(i,-15),`Turn ray ${n} 15 degrees clockwise`)});
 if(k==='cross'&&W.rd<CROSS.length){[0,1,2,3].forEach(j=>{if(j!==CROSS[W.rd].ask)btn(`Angle ${NAMES[j]}`,()=>tapAngle(j),`Angle ${NAMES[j]} equals the yellow angle`)});btn('Turn line ↺',()=>turnLine(15),'Turn the crossing line 15 degrees anticlockwise');btn('Turn line ↻',()=>turnLine(-15),'Turn the crossing line 15 degrees clockwise')}
 if(k==='reason'&&W.ch<CHAIN.length)REASONS.forEach((x,i)=>btn(x.t,()=>useReason(i),`Reason for ${NAMES[CHAIN[W.ch].k]}: ${x.t}`))}
function clear(){epoch++;for(const x in W)delete W[x];Object.assign(W,{th:130,tried:[],pz:0,last:'',hot:0,rays:[90,195,315],phi:CROSS[0].phi,rd:0,found:-1,ch:0,vals:{},bad:-1,grip:null,test:()=>{}})}
const doneWhen=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(LEARNT[i]+A.reveal(i))};
function begin(i,ok){clear();speak(START[i]);W.test=doneWhen(i,ok)}
function demo(i,acts,ms){steps[i].go();const e=epoch;acts.forEach((f,j)=>setTimeout(()=>{if(e===epoch)f()},ms*(j+1)))}
const right=n=>LINE[n].chips.findIndex(x=>!x[1]);
const steps=[
{h:'A straight line',p:'A ray starts on a straight line and splits it into two angles, a and b.',
 predict:{q:'Turn the ray. What happens to a + b?',opts:['It changes as the ray turns','It stays the same'],ans:1},task:'Try 3 different positions',
 show:()=>demo(0,[()=>{setTh(150);tryHere()},()=>{setTh(90);tryHere()},()=>{setTh(35);tryHere()}],650),go:()=>begin(0,()=>W.tried.length>=3)},
{h:'The missing angle',p:'Some angles on a straight line are known. One is missing. Use the fact you just found.',task:'Find ? on 3 lines',
 show:()=>demo(1,[0,1,2].map(n=>()=>pickChip(right(n))),650),go:()=>begin(1,()=>W.pz>=LINE.length)},
{h:'Round a point',p:'Three rays meet at a point. The angles between them go all the way round.',
 predict:{q:'Three angles go all the way round a point. What is their total?',opts:['180°, like a straight line','360°, a full turn'],ans:1},task:'Make all three angles equal',
 show:()=>demo(2,[()=>turnRayPt(1,15),()=>turnRayPt(2,15)],700),go:()=>begin(2,()=>gaps().every(x=>x.v===120))},
{h:'Crossing lines',p:'Two straight lines cross and make four angles: a, b, c and d. One is yellow.',
 predict:{q:'Which angle is always equal to the yellow one?',opts:['The one right next to it','The one opposite it, across the point'],ans:1},task:'Find the partner 3 times',
 show:()=>demo(3,[0,1,2].map(n=>()=>tapAngle((CROSS[n].ask+2)%4)),700),go:()=>begin(3,()=>W.rd>=CROSS.length)},
{h:'Give a reason',p:`Angle a is ${GIVEN}°. The picture is not drawn to scale, so each angle needs a fact.`,task:'Find b, c and d',
 show:()=>demo(4,[()=>useReason(0),()=>useReason(1),()=>useReason(1)],700),go:()=>begin(4,()=>W.ch>=CHAIN.length)},
{h:'Challenge',p:'',go:()=>{clear();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>W.test()});
function next(){round++;const X=QUIZ[round%QUIZ.length],all=[[X.a,''],...X.o],r=round%3,order=all.slice(r%all.length).concat(all.slice(0,r%all.length));
 chal.innerHTML=`<p><b>${X.q}</b></p><div class="fl-pick" role="group" aria-label="Pick an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=chal.querySelector('.fl-pick');order.forEach(([t,s])=>{c.el('button',{type:'button',class:'lbtn'},g,t).onclick=()=>judge(s,X)});c.say('Challenge: '+X.q);A.cv.setAttribute('aria-label','Challenge: '+X.q);A.redraw()}
function judge(s,X){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),m=s?slip(s):'';
 if(s)A.sound.miss();else A.win();fb.innerHTML=(s?'✗ '+m:'✓ '+X.a+'.')+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next;c.say(s?m:'Yes.')}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:X=>{chal.hidden=X.step!==5;ctl.hidden=X.step===5;keys()},
 init:X=>{A=X;P=ANGF.pen(A,C);const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Angle facts lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);clear();A.gest({down,move:drag,up:lift_end});keys()}}).start()})})();
