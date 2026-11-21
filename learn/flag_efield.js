/* Flagship – electric fields (ages 14–16; AQA GCSE Physics 4.2.5.2, physics only). Scenes: probe a positive sphere
   with a small positive test charge and reveal its radial field lines; flip the sphere negative and watch the force
   reverse; read the force on rings 1, 2 and 3 steps out (36, 9, 4: strongest close, inverse square as an extension);
   charge a dome and move an earthed ball until the field in the gap makes the air spark; and a sandbox of up to four
   charges with traced field lines. Data in learn/efield_art.js. */
(()=>{const {PROBES,RINGS,F0,QMAX,GAP0,GAPMIN,GAPMAX,START,DESC,DONE,QS}=EFD;
VIS.reg('flagefield',c=>{let A,keys,chal,qk=-1,run=0;const st={};
const POS='#dc2626',NEG='#1d4ed8',CARD='#ffffff',INK='#111827',GRN='#047857',RED='#b91c1c',GRY='#6b7280',TYPE='px system-ui,sans-serif';
const which=()=>['probe','flip','rings','spark','sand','chal'][A.step];
const centre=()=>({x:A.W*.5,y:A.H*.56}),gap=()=>Math.min(A.W,A.H)*.135,ball=()=>gap()*.45;
const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
const col=()=>A.col.dark?'#fbbf24':'#b45309';
function label(s,x,y,n,o){o=o||{};const g=A.ctx;let k=n;g.font=(o.wt||700)+' '+k+TYPE;while(o.fit&&k>9&&g.measureText(s).width>o.fit){k--;g.font=(o.wt||700)+' '+k+TYPE}
 g.fillStyle=o.ink||A.col.tx;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillText(s,x,y)}
/* a white pill so dark text reads in both themes; ok/bad add a coloured edge */
function pill(s,x,y,n,o){o=o||{};const g=A.ctx;g.font='800 '+n+TYPE;const w=Math.min(A.W-12,g.measureText(s).width+20),h=n+14;
 g.fillStyle=CARD;A.paint.rrect(x-w/2,y-h/2,w,h,h/2);g.fill();g.lineWidth=o.ok||o.bad?3:1.5;g.strokeStyle=o.ok?GRN:o.bad?RED:GRY;g.stroke();label(s,x,y+1,n,{ink:INK,wt:800,fit:w-12})}
function bg(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#e0f2fe',A.col.dark?.06:.5);g.fillRect(0,0,A.W,A.H)}
function charge(p,q,r){const g=A.ctx;g.fillStyle=q>0?POS:NEG;g.beginPath();g.arc(p.x,p.y,r,0,7);g.fill();g.lineWidth=2;g.strokeStyle='#ffffff';g.stroke();label(q>0?'+':'−',p.x,p.y+1,Math.max(12,r*1.1),{ink:'#ffffff',wt:900})}
function arrow(a,b,w,colr){const g=A.ctx,ang=Math.atan2(b.y-a.y,b.x-a.x),h=Math.max(7,w*3);g.strokeStyle=g.fillStyle=colr;g.lineWidth=w;g.beginPath();g.moveTo(a.x,a.y);g.lineTo(b.x-h*.7*Math.cos(ang),b.y-h*.7*Math.sin(ang));g.stroke();
 g.beginPath();g.moveTo(b.x,b.y);g.lineTo(b.x-h*Math.cos(ang-.45),b.y-h*Math.sin(ang-.45));g.lineTo(b.x-h*Math.cos(ang+.45),b.y-h*Math.sin(ang+.45));g.closePath();g.fill()}
/* force on the +1 test charge from one sphere of sign q at the centre, in readout units F0/(r/gap)² */
function force(p,q){const C=centre(),r=Math.max(dist(p,C),ball()+2),u=r/gap(),f=F0/(u*u);return{f,dx:(p.x-C.x)/r*q,dy:(p.y-C.y)/r*q,u}}
/* a radial field line from the sphere edge out through angle a, arrow heads point out for + and in for − */
function radial(a,q,colr,w){const C=centre(),R=ball(),L=Math.hypot(A.W,A.H),p0={x:C.x+R*Math.cos(a),y:C.y+R*Math.sin(a)},p1={x:C.x+L*Math.cos(a),y:C.y+L*Math.sin(a)},g=A.ctx;
 g.strokeStyle=colr;g.lineWidth=w;g.beginPath();g.moveTo(p0.x,p0.y);g.lineTo(p1.x,p1.y);g.stroke();
 const m=R+gap()*1.5,mid={x:C.x+m*Math.cos(a),y:C.y+m*Math.sin(a)},d=q>0?1:-1;arrow({x:mid.x-d*9*Math.cos(a),y:mid.y-d*9*Math.sin(a)},{x:mid.x+d*9*Math.cos(a),y:mid.y+d*9*Math.sin(a)},w,colr)}
function testCharge(q){const T=st.t,F=force(T,q),len=Math.min(72,18+F.f*1.5);if(dist(T,centre())>ball()+6)arrow(T,{x:T.x+F.dx*len,y:T.y+F.dy*len},3,A.col.dark?'#f0abfc':'#7e22ce');charge(T,1,10);return F}
/* ---------- 1 and 2: probing one sphere ---------- */
function drawProbe(neg){const s=st.p,q=neg&&s.neg?-1:1;bg();s.lines.filter(L=>L.q===q).forEach(L=>radial(L.a,L.q,col(),2));charge(centre(),q,ball());
 const F=testCharge(q),list=s.lines.filter(L=>L.q===q),need=neg?2:3,done=spread(list)>=need&&(!neg||s.neg);
 pill(done?`${need} field lines found`:neg&&!s.neg?'Flip the sphere to negative':`Probe in ${need} directions: ${Math.min(spread(list),need)} of ${need}`,A.W/2,22,14,{ok:done});
 label(q>0?'positive sphere':'negative sphere',centre().x,centre().y+ball()+14,12,{fit:A.W*.5})}
/* how many probe directions are at least 50° apart */
function spread(list){const out=[];list.forEach(L=>{if(out.every(a=>{const d=Math.abs(((L.a-a)%(2*Math.PI)+3*Math.PI)%(2*Math.PI)-Math.PI);return d>.87}))out.push(L.a)});return out.length}
function probeAt(p){const s=st.p,C=centre();st.t={x:p.x,y:p.y};if(dist(p,C)<ball()+8){A.sound.miss();return say('Too close: that is inside the sphere. Probe in the space around it.')}
 const q=which()==='flip'&&s.neg?-1:1,a=Math.atan2(p.y-C.y,p.x-C.x);s.lines.push({a,q});A.sound.tick();
 say(q>0?'The test charge is pushed away from the positive sphere: a field line pointing outwards.':'The test charge is pulled towards the negative sphere: the field line points inwards.')}
function probeTwin(P){const C=centre(),a=P.a*Math.PI/180;probeAt({x:C.x+P.r*gap()*Math.cos(a),y:C.y+P.r*gap()*Math.sin(a)})}
function flip(){const s=st.p;s.neg=!s.neg;A.sound.pop();say(s.neg?'The sphere is now negative. Probe again: which way is the test charge pushed?':'The sphere is positive again.')}
/* ---------- 3: rings ---------- */
function drawRings(){const s=st.r,C=centre(),g=A.ctx;bg();for(let i=0;i<16;i++)radial(i*Math.PI/8,1,A.alpha(col(),.55),1.5);
 RINGS.forEach((k,i)=>{g.setLineDash([6,6]);g.lineWidth=s.got[i]!=null?3:2;g.strokeStyle=s.got[i]!=null?GRN:GRY;g.beginPath();g.arc(C.x,C.y,k*gap(),0,7);g.stroke();g.setLineDash([]);
  label(String(k),C.x+k*gap()*Math.cos(-2.4),C.y+k*gap()*Math.sin(-2.4),13,{wt:800})});
 charge(C,1,ball());const F=testCharge(1);
 const rows=RINGS.map((k,i)=>`ring ${k}: ${s.got[i]==null?'?':s.got[i]}`).join('   ');pill(rows,A.W/2,22,13,{ok:s.got.every(v=>v!=null)});
 label(`force here: ${Math.round(F.f)} units`,A.W/2,A.H-14,13,{fit:A.W-20})}
function dropRing(p){const s=st.r;st.t={x:p.x,y:p.y};const F=force(p,1),i=RINGS.findIndex(k=>Math.abs(F.u-k)<.18);
 if(i<0){A.sound.tick();return say(`Force ${Math.round(F.f)} units. Drop it on a dashed ring to record it.`)}
 s.got[i]=F0/(RINGS[i]*RINGS[i]);A.sound.pop();say(`Ring ${RINGS[i]}: ${s.got[i]} units.`+(s.got.every(v=>v!=null)?' Twice as far gives a quarter of the force; three times as far, a ninth.':''))}
function ringTwin(i){const C=centre();dropRing({x:C.x+RINGS[i]*gap()*Math.cos(.5),y:C.y+RINGS[i]*gap()*Math.sin(.5)})}
/* ---------- 4: the spark gap ---------- */
const scale=()=>Math.min(A.W,A.H)/400,dome=()=>({x:A.W*.22,y:A.H*.56,r:Math.min(A.W,A.H)*.16}),knob=()=>Math.min(A.W,A.H)*.05;
const gapMax=()=>Math.min(GAPMAX,(A.W-8-dome().x-dome().r-2*knob())/scale());
const meter=()=>st.k.q/QMAX*Math.pow(GAP0/st.k.gap,2);
function drawSpark(){const s=st.k,D=dome(),g=A.ctx,bx=D.x+D.r+s.gap*scale()+knob();bg();
 g.fillStyle='#cbd5e1';g.fillRect(D.x-8,D.y+D.r*.6,16,A.H-D.y-D.r*.6);charge(D,1,D.r);label(`charge: ${s.q} of ${QMAX}`,D.x,D.y-D.r-12,12);
 g.fillStyle='#94a3b8';g.beginPath();g.arc(bx,D.y,knob(),0,7);g.fill();g.lineWidth=2;g.strokeStyle=GRY;g.stroke();g.fillStyle='#64748b';g.fillRect(bx-3,D.y+knob(),6,A.H-D.y-knob());label('⏚ earth',bx,A.H-12,11);
 if(s.zap){g.strokeStyle=A.col.dark?'#fde047':'#7c3aed';g.lineWidth=3;g.beginPath();g.moveTo(D.x+D.r,D.y);const n=6;for(let i=1;i<n;i++)g.lineTo(D.x+D.r+(bx-knob()-D.x-D.r)*i/n,D.y+(i%2?-10:10));g.lineTo(bx-knob(),D.y);g.stroke()}
 const m=meter(),bw=A.W*.7,bxm=A.W*.15,by=A.H*.19;g.fillStyle=A.col.dark?'#334155':'#e2e8f0';g.fillRect(bxm,by,bw,12);g.fillStyle=m>=1?RED:GRN;g.fillRect(bxm,by,bw*Math.min(1,m/1.5),12);
 g.fillStyle=A.col.tx;g.fillRect(bxm+bw/1.5-1,by-6,3,24);label('air breaks down',bxm+bw/1.5,by-14,11);label('field in the gap',bxm,by-14,11,{al:'left'});
 pill(s.zap?'Spark! The air conducts':'Make a spark jump the gap',A.W/2,22,14,{ok:s.zap})}
function setSpark(dq,dg){const s=st.k;s.q=Math.max(1,Math.min(QMAX,s.q+dq));s.gap=Math.max(GAPMIN,Math.min(gapMax(),s.gap+dg));const was=s.zap;s.zap=meter()>=1;
 if(s.zap&&!was){A.sound.whoosh();return say('Spark! The field in the gap is strong enough to pull electrons off air molecules, so the air conducts.')}
 if(!s.zap)A.sound.tick();say(s.zap?'Still sparking.':`Charge ${s.q} of ${QMAX}, gap ${Math.round(s.gap)}. The field in the gap is ${Math.round(meter()*100)}% of what air can stand.`)}
/* ---------- 5: sandbox ---------- */
function fieldAt(p,list){let x=0,y=0;list.forEach(Q=>{const dx=p.x-Q.x*A.W,dy=p.y-Q.y*A.H,r2=dx*dx+dy*dy+1,r=Math.sqrt(r2);x+=Q.q*dx/(r2*r);y+=Q.q*dy/(r2*r)});return{x,y}}
/* traces one line by small steps along the field (dir +1) or against it (dir −1) until it reaches a charge or the edge */
function trace(p,dir,list){const pts=[{x:p.x,y:p.y}],g=A.ctx;let q={x:p.x,y:p.y};
 for(let i=0;i<320;i++){const E=fieldAt(q,list),m=Math.hypot(E.x,E.y)||1;q={x:q.x+dir*5*E.x/m,y:q.y+dir*5*E.y/m};pts.push(q);
  if(q.x<0||q.y<0||q.x>A.W||q.y>A.H||list.some(Q=>Math.hypot(q.x-Q.x*A.W,q.y-Q.y*A.H)<9))break}
 g.strokeStyle=col();g.lineWidth=1.8;g.beginPath();pts.forEach((v,i)=>i?g.lineTo(v.x,v.y):g.moveTo(v.x,v.y));g.stroke();
 const k=Math.min(pts.length-2,12);if(k>2){const a=dir>0?pts[k]:pts[k+1],b=dir>0?pts[k+1]:pts[k];arrow(a,{x:a.x+(b.x-a.x)*2.2,y:a.y+(b.y-a.y)*2.2},1.8,col())}}
function drawSand(){const s=st.s;bg();const pos=s.list.filter(Q=>Q.q>0),seeds=pos.length?pos:s.list,dir=pos.length?1:-1;
 seeds.forEach(Q=>{for(let i=0;i<12;i++){const a=i*Math.PI/6+.13;trace({x:Q.x*A.W+12*Math.cos(a),y:Q.y*A.H+12*Math.sin(a)},dir,s.list)}});
 s.list.forEach(Q=>charge({x:Q.x*A.W,y:Q.y*A.H},Q.q,13));pill(`${s.list.length} charges: lines leave + and head to −`,A.W/2,22,13)}
function addCharge(p,q){const s=st.s,hitI=s.list.findIndex(Q=>Math.hypot(p.x-Q.x*A.W,p.y-Q.y*A.H)<22);
 if(hitI>=0){s.list[hitI].q*=-1;A.sound.pop();return say(`Flipped to ${s.list[hitI].q>0?'positive':'negative'}. Watch the arrows turn round.`)}
 if(s.list.length>=4){A.sound.miss();return say('Four charges is the most. Tap one to flip it, or reset.')}
 s.list.push({x:p.x/A.W,y:p.y/A.H,q});A.sound.tick();say(`Added a ${q>0?'positive':'negative'} charge. The lines never cross.`)}
/* ---------- input ---------- */
function draw(){const k=which();if(k==='chal'){bg();pill('Challenge',A.W/2,22,14,{ok:1});charge(centre(),1,ball());for(let i=0;i<8;i++)radial(i*Math.PI/4,1,col(),2);charge(centre(),1,ball());return}
 ({probe:()=>drawProbe(0),flip:()=>drawProbe(1),rings:drawRings,spark:drawSpark,sand:drawSand})[k]();A.fx.draw(A.ctx)}
function down(p){const k=which();if(['probe','flip','rings'].includes(k)){if(dist(p,st.t)<32){st.drag=1;return true}return false}
 if(k==='spark'){const D=dome(),bx=D.x+D.r+st.k.gap*scale()+knob();if(Math.hypot(p.x-bx,p.y-D.y)<knob()+20){st.drag=1;return true}return false}
 if(k==='sand'){addCharge(p,st.s.next);st.s.next*=-1;return false}return false}
function move(p){if(!st.drag)return;const k=which();if(k==='spark'){const D=dome();st.k.gap=Math.max(GAPMIN,Math.min(gapMax(),(p.x-knob()-D.x-D.r)/scale()));const was=st.k.zap;st.k.zap=meter()>=1;if(st.k.zap&&!was)return setSpark(0,0);A.redraw();return}
 st.t={x:Math.max(8,Math.min(A.W-8,p.x)),y:Math.max(8,Math.min(A.H-8,p.y))};A.redraw()}
function up(p){if(!st.drag)return;st.drag=0;const k=which();if(k==='spark')return setSpark(0,0);if(k==='rings')return dropRing(st.t);probeAt(st.t)}
function fresh(){run++;const C=centre();for(const k in st)delete st[k];Object.assign(st,{t:{x:C.x+gap()*2.4,y:C.y+gap()*.9},drag:0,p:{lines:[],neg:false},r:{got:RINGS.map(()=>null)},k:{q:2,gap:160,zap:false},s:{list:START.map(Q=>({...Q})),next:1},hook:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();twins();st.hook()}
const ready=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(DONE[i]+A.reveal(i))};
function begin(i,ok){fresh();say(DESC[i]);if(ok)st.hook=ready(i,ok)}
function demo(i,fs,ms){steps[i].go();const r0=run;fs.forEach((f,j)=>setTimeout(()=>{if(r0===run)f()},ms*(j+1)))}
/* labelled button twins for every canvas action */
function twins(){if(!keys)return;keys.innerHTML='';const k=which(),b=(t,f)=>{c.el('button',{type:'button',class:'lbtn'},keys,t).onclick=f};
 if(k==='flip')b(st.p.neg?'Make the sphere positive':'Make the sphere negative',flip);
 if(k==='probe'||k==='flip')PROBES.forEach(P=>b('Probe '+P.t,()=>probeTwin(P)));
 if(k==='rings')RINGS.forEach((r,i)=>b(`Test charge on ring ${r}`,()=>ringTwin(i)));
 if(k==='spark'){b('Add charge',()=>setSpark(1,0));b('Remove charge',()=>setSpark(-1,0));b('Move ball closer',()=>setSpark(0,-15));b('Move ball away',()=>setSpark(0,15))}
 if(k==='sand'){b('Add + charge',()=>addCharge({x:A.W*(.2+.6*Math.random()),y:A.H*(.25+.6*Math.random())},1));b('Add − charge',()=>addCharge({x:A.W*(.2+.6*Math.random()),y:A.H*(.25+.6*Math.random())},-1));
  b('Flip the last charge',()=>{const L=st.s.list[st.s.list.length-1];if(L)addCharge({x:L.x*A.W,y:L.y*A.H},1)});b('Reset',()=>{st.s.list=START.map(Q=>({...Q}));say('Back to one plus and one minus.')})}}
const steps=[
{h:'Probe the field',p:'A small positive test charge feels a force in the field. Drag it to a spot and let go. Each probe reveals a field line.',
 predict:{q:'Which way will the field lines point around a positive sphere?',opts:['Inwards, towards it','Outwards, away from it'],ans:1},task:'Probe in 3 directions',
 show:()=>demo(0,[0,1,2].map(i=>()=>probeTwin(PROBES[i])),450),go:()=>begin(0,()=>spread(st.p.lines)>=3)},
{h:'Flip the charge',p:'Make the sphere negative, then probe again with the same positive test charge.',
 predict:{q:'The sphere turns negative. What happens to the force on the positive test charge?',opts:['Still pushed away','Now pulled in'],ans:1},task:'Flip it and probe 2 directions',
 show:()=>demo(1,[flip,()=>probeTwin(PROBES[0]),()=>probeTwin(PROBES[2])],450),go:()=>begin(1,()=>st.p.neg&&spread(st.p.lines.filter(L=>L.q<0))>=2)},
{h:'Closer is stronger',p:'Drop the test charge on each dashed ring and read the force. Look at how close the lines are, too.',
 predict:{q:'Where is the force on the test charge strongest?',opts:['The same everywhere in the field','Closest to the sphere'],ans:1},task:'Read all 3 rings',
 show:()=>demo(2,[0,1,2].map(i=>()=>ringTwin(i)),450),go:()=>begin(2,()=>st.r.got.every(v=>v!=null))},
{h:'Make a spark',p:'Charge the dome and drag the earthed ball. A spark jumps when the field in the gap is strong enough.',
 predict:{q:'Which makes a spark more likely?',opts:['A bigger gap','More charge or a smaller gap'],ans:1},task:'Make a spark',
 show:()=>demo(3,[()=>setSpark(4,0),()=>setSpark(0,-60),()=>setSpark(0,-40)],450),go:()=>begin(3,()=>st.k.zap)},
{h:'Sandbox',p:'Tap the space to add charges (plus, then minus). Tap a charge to flip it. Lines start on plus and end on minus.',go:()=>begin(4)},
{h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>st.hook()});
/* each wrong answer names the slip */
function slip(t){let m='Think of the force on a small positive test charge.';
 if(t==='sign')m='Field lines show the force on a positive test charge. A negative charge pulls it in, so the lines point inwards.';
 if(t==='circle')m='Lines from a single charge are straight and radial, like spokes. Circles are the magnetic field round a wire.';
 if(t==='same')m='The field is strongest close to the charge. Twice as far, the force is a quarter as big.';
 if(t==='bigger')m='Further away means weaker, not stronger: the lines spread out.';
 if(t==='gap')m='The field fills all the space round the charge. We only draw a few lines as a sample.';
 if(t==='moving')m='A charge at rest still feels the force. No movement is needed.';
 if(t==='cancel'||t==='cross')m='At any point the field has one direction. Two crossing lines would mean two directions, so they never cross.';
 if(t==='far'||t==='less')m='A spark needs a strong field in the gap: more charge, or a smaller gap.';
 if(t==='test')m='The field direction is for a positive charge. A negative charge is pushed the other way.';
 if(t==='none')m='Fields push or pull any charge: positive along the lines, negative against them.';
 return m}
function quiz(){qk++;const Q=QS[qk%QS.length],all=[[Q.a,'ok'],...Q.o],r=(qk+1)%3,list=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');list.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>judge(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function judge(t,a){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Right: ${a}.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Right.':slip(t))}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:X=>{chal.hidden=X.step!==5;keys.hidden=X.step===5;twins()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Electric field lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});twins()}}).start()})})();
