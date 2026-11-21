/* Flagship – reading dinosaur trackways (ages 7–9). Scenes: sort fossil footprints by their shape (sharp claws, blunt
   toes, big and round), count 10 cm squares to find a footprint's length and work out hip height (about 4 footprints),
   fill the gap between prints with footprints to tell walking from running, judge whether trackways seen from above
   were made by a group, and check a robot's claims. Data in learn/track_art.js. Distinct from flagdino (real versus
   pretend dinosaurs) and flagfoss (how a fossil forms): this lab reads evidence from the tracks themselves. */
(()=>{const {MAKERS,MAKERWHO,PRINTS,SIZES,GAITS,GAITWHY,GROUPS,ROBOT,DESC,DONE,QS}=TRK;
VIS.reg('flagtrack',c=>{let A,pad,quiz,turn=-1,gen=0;const S={};c.fig.classList.add('young');
const INK='#1f2937',GOOD='#047857',BAD='#b91c1c',LINE='#6b7280',SLAB='#ead9b5',SLAB2='#dcc596',DENT='#7c4a1e',CLAW='#3b2410',GHOST='#2563eb',FACE='px system-ui,sans-serif';
const scene=()=>['shape','size','gait','group','robot','quiz'][A.step];
const pt=n=>A.narrow?n:Math.round(n*1.18);
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function slab(){const g=A.ctx;g.fillStyle=SLAB;g.fillRect(0,0,A.W,A.H);g.fillStyle=SLAB2;for(let i=0;i<9;i++){g.beginPath();g.ellipse(A.W*((i*37)%100)/100,A.H*((i*53)%100)/100,A.W*.05,A.H*.015,0,0,7);g.fill()}}
/* a white label pill that keeps inside the canvas and shrinks long text */
function pill(t,x,y,o){o=o||{};const g=A.ctx;let n=pt(o.n||14);const fit=()=>{g.font=`800 ${n}${FACE}`;return g.measureText(t).width+26};let w=fit();
 while(w>A.W-10&&n>10){n--;w=fit()}const h=n+16,left=Math.max(5,Math.min(A.W-w-5,x-w/2));g.fillStyle='#ffffff';A.paint.rrect(left,y-h/2,w,h,h/2);g.fill();
 g.lineWidth=o.good||o.bad?3:1.5;g.strokeStyle=o.good?GOOD:o.bad?BAD:LINE;g.stroke();g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,left+w/2,y+1)}
/* a tappable tile; its label wraps onto two lines when it is too wide */
function tile(r,o){o=o||{};const g=A.ctx;g.fillStyle=o.bad?'#fee2e2':o.good?'#dcfce7':o.lift?'#e0f2fe':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,11);g.fill();
 g.lineWidth=o.bad||o.good||o.lift?3.5:1.5;g.strokeStyle=o.bad?BAD:o.good?GOOD:o.lift?'#0369a1':LINE;g.stroke();if(!r.t)return;
 let n=pt(o.n||14),rows=[r.t];g.font=`800 ${n}${FACE}`;const room=r.w-12;
 if(g.measureText(r.t).width>room){const ws=r.t.split(' ');if(ws.length>1){const cut=Math.ceil(ws.length/2);rows=[ws.slice(0,cut).join(' '),ws.slice(cut).join(' ')]}}
 while(n>9&&rows.some(l=>g.measureText(l).width>room)){n--;g.font=`800 ${n}${FACE}`}
 g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';rows.forEach((l,k)=>g.fillText(l,r.x+r.w/2,r.y+r.h/2+1+(k-(rows.length-1)/2)*(n+3)))}
function row(labels,y,h){const gap=8,w=(A.W-16-gap*(labels.length-1))/labels.length;return labels.map((t,i)=>({i,t,x:8+i*(w+gap),y,w,h:Math.min(h,60)}))}
/* one fossil footprint, toes pointing along angle a (radians, 0 = up), length s pixels */
function foot(kind,cx,cy,s,a,o){o=o||{};const g=A.ctx;g.save();g.translate(cx,cy);g.rotate(a||0);g.fillStyle=o.ghost?'rgba(37,99,235,.18)':DENT;g.strokeStyle=o.ghost?GHOST:CLAW;g.lineWidth=o.ghost?1.5:1;
 if(kind===0){[-.42,0,.42].forEach(t=>{g.save();g.translate(0,s*.22);g.rotate(t);g.beginPath();g.moveTo(-s*.07,0);g.lineTo(-s*.035,-s*.6);g.lineTo(0,-s*.72);g.lineTo(s*.035,-s*.6);g.lineTo(s*.07,0);g.closePath();g.fill();if(o.ghost)g.stroke();
   if(!o.ghost){g.fillStyle=CLAW;g.beginPath();g.moveTo(-s*.03,-s*.6);g.lineTo(0,-s*.74);g.lineTo(s*.03,-s*.6);g.fill();g.fillStyle=DENT}g.restore()});
  g.beginPath();g.ellipse(0,s*.2,s*.13,s*.12,0,0,7);g.fill();if(o.ghost)g.stroke()}
 else if(kind===1){[-.5,0,.5].forEach(t=>{g.save();g.translate(0,s*.12);g.rotate(t);g.beginPath();g.ellipse(0,-s*.3,s*.12,s*.22,0,0,7);g.fill();if(o.ghost)g.stroke();g.restore()});
  g.beginPath();g.ellipse(0,s*.22,s*.24,s*.2,0,0,7);g.fill();if(o.ghost)g.stroke()}
 else{g.beginPath();g.ellipse(0,s*.12,s*.34,s*.38,0,0,7);g.fill();if(o.ghost)g.stroke();g.beginPath();g.ellipse(0,-s*.4,s*.26,s*.1,0,Math.PI,0);g.lineTo(s*.26,-s*.4);g.fill();if(o.ghost)g.stroke()}
 g.restore()}
/* 1. who made it? */
const bins=()=>row(MAKERS,A.H*(A.narrow?.7:.72),A.H*.18);
const card=()=>{const s=Math.min(A.H*.42,A.W*.36,190);return{x:(A.W-s)/2,y:A.H*.14,w:s,h:s}};
function drawShape(){const s=S.shape;slab();if(s.i>=PRINTS.length){pill('All 6 prints sorted',A.W/2,A.H*.16,{good:1});pill('Toe shape tells us who made the print',A.W/2,A.H*.38);bins().forEach(r=>tile(r,{n:13}));return}
 const P=PRINTS[s.i];pill(`Print ${s.i+1} of ${PRINTS.length}. Who made it?`,A.W/2,A.H*.07,{n:12});let r=card();if(s.hold)r={...r,x:s.hold.x-r.w/2,y:s.hold.y-r.h/2};
 tile(r,{lift:!!s.hold});foot(P.kind,r.x+r.w/2,r.y+r.h*.52,r.h*.74*P.size,0);bins().forEach(b=>{tile(b,{bad:s.bad===b.i,n:13});const k=s.tally[b.i];if(k)pill('×'+k,b.x+b.w-18,b.y+4,{n:10})})}
function sortTo(k){const s=S.shape;if(s.i>=PRINTS.length)return;const P=PRINTS[s.i];
 if(k!==P.kind){s.bad=k;A.sound.miss();return say((P.why&&P.why[k])||'Look closely at the toes: thin and pointed, fat and blunt, or no toes at all?')}
 s.bad=-1;s.tally[k]++;s.i++;A.sound.pop();say(`Yes: ${MAKERS[k].toLowerCase()}, so ${MAKERWHO[k]} made it.`+(s.i<PRINTS.length?' Next print.':''))}
/* 2. how tall at the hip? footprint length on a 10 cm grid */
const hipOpts=n=>{const v=[n*10,n*40,n*100],r=S.size.i%3;return v.map((cm,j)=>({cm,tag:j})).slice(r).concat(v.map((cm,j)=>({cm,tag:j})).slice(0,r))};
const cmText=cm=>cm>=100?`${cm} cm (${Math.floor(cm/100)} m ${cm%100} cm)`:`${cm} cm`;
const hipTiles=()=>{const Z=SIZES[Math.min(S.size.i,SIZES.length-1)];return row(hipOpts(Z.n).map(o=>`Hip ${o.cm} cm`),A.H*.82,A.H*.15).map((r,j)=>({...r,tag:hipOpts(Z.n)[j].tag}))};
function drawSize(){const s=S.size,g=A.ctx;slab();if(s.i>=SIZES.length){pill('All 3 dinosaurs measured',A.W/2,A.H*.16,{good:1});pill('Hip height: about 4 footprints',A.W/2,A.H*.38);return}
 const Z=SIZES[s.i],base=A.H*.74,q=Math.min(A.H*.56/(4*Z.n),A.W/14),gx=A.W*.1,len=Z.n*q;pill(`Dinosaur ${s.i+1} of ${SIZES.length}. Each square is 10 cm.`,A.W/2,A.H*.07,{n:12});
 g.strokeStyle='rgba(31,41,55,.45)';g.lineWidth=1;for(let x=0;x<=3;x++){g.beginPath();g.moveTo(gx+x*q,base-len);g.lineTo(gx+x*q,base);g.stroke()}
 for(let y=0;y<=Z.n;y++){g.beginPath();g.moveTo(gx,base-y*q);g.lineTo(gx+3*q,base-y*q);g.stroke()}
 foot(0,gx+1.5*q,base-len*.42,len*.98,0);g.fillStyle=INK;g.fillRect(gx+3*q+6,base-len,3,len);
 pill(`${Z.n} squares = ${Z.n*10} cm`,Math.min(A.W*.5,gx+3*q+A.W*.17),base-len/2,{n:12});
 const hx=A.W*.72,w=Math.max(q*1.6,22);g.strokeStyle=INK;g.lineWidth=1.5;for(let k=0;k<4;k++){const y=base-len*(k+1),lit=s.won!=null;g.fillStyle=lit?(k%2?'#fde68a':'#fcd34d'):'rgba(255,255,255,.35)';g.fillRect(hx,y,w,len);g.setLineDash(lit?[]:[4,4]);g.strokeRect(hx,y,w,len);g.setLineDash([])}
 pill(s.won!=null?`Hip: 4 footprints = ${Z.n*40} cm`:'Hip height?',hx+w/2,base-len*4-4,{n:11,good:s.won!=null});
 hipTiles().forEach(r=>tile(r,{bad:s.bad===r.tag,n:13}))}
function hipPick(tag){const s=S.size;if(s.i>=SIZES.length||s.won!=null)return;const Z=SIZES[s.i];
 if(tag!==1){s.bad=tag;A.sound.miss();return say(Z.why[tag])}
 s.bad=-1;s.won=s.i;A.sound.pop();const e0=gen,last=s.i===SIZES.length-1;say(`Yes: ${Z.n*10} cm × 4 = ${cmText(Z.n*40)}.`+(last?'':' Next dinosaur.'));
 setTimeout(()=>{if(e0!==gen)return;s.won=null;s.i++;A.redraw();buttons();S.test()},900)}
/* 3. walking or running? fill the gap with footprints */
const SCALE=()=>(A.W-40)/310;
const gaitTiles=()=>row(['Walking','Running'],A.H*.8,A.H*.16);
function gapBox(){const G=GAITS[Math.min(S.gait.i,GAITS.length-1)],k=SCALE(),x0=20,y=A.H*.42;return{x:x0+G.foot*k,y:y-A.H*.14,w:G.gap*G.foot*k,h:A.H*.28}}
function drawGait(){const s=S.gait,g=A.ctx;slab();if(s.i>=GAITS.length){pill('All 3 trackways read',A.W/2,A.H*.16,{good:1});pill('Count the gap in footprints, not in cm',A.W/2,A.H*.38);return}
 const G=GAITS[s.i],k=SCALE(),f=G.foot*k,y=A.H*.42,x0=20,B=gapBox();pill(`Trackway ${s.i+1} of ${GAITS.length}: ${G.note}`,A.W/2,A.H*.07,{n:12});
 foot(0,x0+f/2,y-f*.25,f,Math.PI/2);foot(0,x0+f+G.gap*f+f/2,y+f*.25,f,Math.PI/2);
 g.setLineDash([6,5]);g.strokeStyle=s.fill?GHOST:INK;g.lineWidth=2;g.strokeRect(B.x,B.y,B.w,B.h);g.setLineDash([]);
 if(s.fill)for(let j=0;j<G.gap;j++)foot(0,B.x+f*(j+.5),y,f*.95,Math.PI/2,{ghost:1});
 pill(s.fill?`${G.gap} footprints fit in the gap (${G.gap*G.foot} cm)`:`Gap: ${G.gap*G.foot} cm. Tap it to fill with footprints`,A.W/2,A.H*.67,{n:12,good:!!s.fill});
 gaitTiles().forEach(r=>tile(r,{bad:s.bad===r.i,n:15}))}
function fillGap(){const s=S.gait;if(s.i>=GAITS.length||s.fill)return;s.fill=true;A.sound.tick();const G=GAITS[s.i];say(`${G.gap} footprints fit in the gap. About 2 to 4 means walking. 6 or more means running.`)}
function gaitPick(k){const s=S.gait;if(s.i>=GAITS.length)return;const G=GAITS[s.i],want=G.run?1:0;
 if(k!==want){s.bad=k;A.sound.miss();return say(GAITWHY[s.i][k])}
 s.bad=-1;s.fill=false;s.i++;A.sound.pop();say(`Yes: ${G.gap} footprints in the gap, so it was ${G.run?'running':'walking'}.`+(s.i<GAITS.length?' Next trackway.':''))}
/* 4. a group, or not? trackways from above */
const groupTiles=()=>row(['Moving together','Not together'],A.H*.82,A.H*.15);
function drawGroup(){const s=S.group,g=A.ctx;slab();if(s.i>=GROUPS.length){pill('All 3 track sites read',A.W/2,A.H*.16,{good:1});pill('Same way, side by side: a group',A.W/2,A.H*.38);return}
 const Q=GROUPS[s.i],top=A.H*.15,h=A.H*.6;pill(`Track site ${s.i+1} of ${GROUPS.length}. Seen from above.`,A.W/2,A.H*.07,{n:12});
 g.save();g.beginPath();g.rect(6,top,A.W-12,h);g.clip();
 Q.lines.forEach(([deg,y0],j)=>{const a=deg*Math.PI/180,cx=A.W/2,cy=top+h*y0,sz=(Q.big[j]?1:.6)*Math.min(26,A.W/18),step=sz*1.5;
  for(let d=-A.W;d<A.W;d+=step){const side=(Math.round(d/step)%2)?1:-1,px=cx+Math.cos(a)*d-Math.sin(a)*side*sz*.3,py=cy+Math.sin(a)*d+Math.cos(a)*side*sz*.3;foot(2,px,py,sz,a+Math.PI/2)}});
 g.restore();groupTiles().forEach(r=>tile(r,{bad:s.bad===r.i,n:14}))}
function groupPick(k){const s=S.group;if(s.i>=GROUPS.length)return;const Q=GROUPS[s.i],want=Q.together?0:1;
 if(k!==want){s.bad=k;A.sound.miss();return say(Q.why[k])}
 s.bad=-1;s.i++;A.sound.pop();say('Yes. '+Q.slip+(s.i<GROUPS.length?' Next site.':''))}
/* 5. the robot's claims */
const votes=()=>{const w=Math.min(170,(A.W-36)/2);return[0,1].map(k=>({i:k,t:k?'✗ Slip':'✓ Right',x:A.W/2+(k?6:-w-6),y:A.H*.74,w,h:Math.min(A.H*.17,60)}))};
function drawRobot(){const s=S.robot,g=A.ctx;slab();if(s.i>=ROBOT.length){pill('All 4 robot claims checked',A.W/2,A.H*.15,{good:1});pill('Gaps in footprints; no colour in prints',A.W/2,A.H*.38,{n:13});return}
 const R=ROBOT[s.i],cx=A.W/2,cy=A.H*.22,u=Math.min(A.W*.065,28);g.fillStyle='#a8a29e';A.paint.rrect(cx-u*1.1,cy-u*.75,u*2.2,u*1.5,u*.5);g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke();
 g.fillStyle='#f59e0b';g.fillRect(cx-u*.6,cy-u*.2,u*.35,u*.35);g.fillRect(cx+u*.25,cy-u*.2,u*.35,u*.35);g.fillStyle=INK;g.fillRect(cx-u*.1,cy-u*1.15,u*.2,u*.4);
 pill(R.say,A.W/2,A.H*.46,{n:12});pill(`Claim ${s.i+1} of ${ROBOT.length}. Right, or a slip?`,A.W/2,A.H*.6,{n:12});votes().forEach(r=>tile(r,{bad:s.bad===r.i,n:16}))}
function verdict(k){const s=S.robot;if(s.i>=ROBOT.length)return;const R=ROBOT[s.i];
 if((k===0)!==R.ok){s.bad=k;A.sound.miss();return say(R.ok?`Look again. ${R.fix}`:`Think about what a footprint can really show. ${R.fix}`)}
 s.bad=-1;s.i++;A.sound.pop();say((R.ok?'Yes, right. ':'Yes, a slip. ')+R.fix)}
function draw(){const k=scene();if(k==='quiz'){slab();pill('Challenge',A.W/2,A.H*.2,{good:1});pill('Read the tracks like a scientist',A.W/2,A.H*.5,{n:13});return}
 ({shape:drawShape,size:drawSize,gait:drawGait,group:drawGroup,robot:drawRobot})[k]();A.fx.draw(A.ctx)}
function down(p){const k=scene();
 if(k==='shape'){const s=S.shape;if(s.i<PRINTS.length&&inside(p,card())){s.hold={x:p.x,y:p.y};A.sound.tick();A.redraw();return true}const b=bins().find(r=>inside(p,r));if(b)sortTo(b.i);return false}
 if(k==='size'){const r=hipTiles().find(q=>inside(p,q));if(r)hipPick(r.tag);return false}
 if(k==='gait'){if(inside(p,gapBox()))fillGap();else{const r=gaitTiles().find(q=>inside(p,q));if(r)gaitPick(r.i)}return false}
 if(k==='group'){const r=groupTiles().find(q=>inside(p,q));if(r)groupPick(r.i);return false}
 if(k==='robot'){const r=votes().find(q=>inside(p,q));if(r)verdict(r.i);return false}
 return false}
function move(p){const s=S.shape;if(s&&s.hold){s.hold={x:p.x,y:p.y};A.redraw()}}
function up(p){const s=S.shape;if(!s||!s.hold)return;s.hold=null;const b=bins().find(r=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y-18&&p.y<=r.y+r.h+18);if(b)sortTo(b.i);else A.redraw()}
function fresh(){gen++;for(const k in S)delete S[k];Object.assign(S,{shape:{i:0,bad:-1,tally:MAKERS.map(()=>0),hold:null},size:{i:0,bad:-1,won:null},gait:{i:0,bad:-1,fill:false},group:{i:0,bad:-1},robot:{i:0,bad:-1},test:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.test()}
const settle=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function open(i,ok){fresh();say(DESC[i]);S.test=settle(i,ok,DONE[i])}
function play(i,acts,ms){steps[i].go();const e0=gen;acts.forEach((f,j)=>setTimeout(()=>{if(e0===gen)f()},ms*(j+1)))}
const steps=[
{h:'Who made it?',p:'Fossil footprints show the shape of a dinosaur\'s foot. Drag each print to the box that matches its toes.',task:'Sort all 6 prints',
 show:()=>play(0,PRINTS.map(P=>()=>sortTo(P.kind)),520),go:()=>open(0,()=>S.shape.i>=PRINTS.length)},
{h:'How tall?',p:'A dinosaur\'s hip is about 4 footprints high. Count the squares, then tap the hip height.',
 predict:{q:'A footprint is 30 cm long. About how high is the hip?',opts:['About 30 cm','About 120 cm'],ans:1},task:'Measure all 3 dinosaurs',
 show:()=>play(1,SIZES.map(()=>()=>hipPick(1)),1100),go:()=>open(1,()=>S.size.i>=SIZES.length)},
{h:'Walk or run?',p:'Long steps for the size of the foot mean running. Tap the gap to fill it with footprints, then choose.',
 predict:{q:'A giant\'s prints are further apart in cm than a small dinosaur\'s. Was the giant running?',opts:['Yes, further apart means faster','Not sure: count the gap in footprints'],ans:1},task:'Read all 3 trackways',
 show:()=>play(2,GAITS.flatMap(G=>[()=>fillGap(),()=>gaitPick(G.run?1:0)]),600),go:()=>open(2,()=>S.gait.i>=GAITS.length)},
{h:'A herd?',p:'Some track sites have many trackways. Look at which way they go. Tap moving together or not together.',task:'Read all 3 track sites',
 show:()=>play(3,GROUPS.map(Q=>()=>groupPick(Q.together?0:1)),700),go:()=>open(3,()=>S.group.i>=GROUPS.length)},
{h:'Check the robot',p:'The robot makes claims about dinosaur tracks. Right, or a slip?',task:'Check all 4 robot claims',
 show:()=>play(4,ROBOT.map(R=>()=>verdict(R.ok?0:1)),700),go:()=>open(4,()=>S.robot.i>=ROBOT.length)},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(st=>{if(st.task)st.onPredict=()=>S.test()});
function why(t){let m='Use the clues a trackway really gives: toe shape, print size, gap in footprints and direction.';
 if(t==='round')m='Round prints with no toes come from long-necked giants. Thin pointed toes are claw marks from a meat-eater.';
 if(t==='cannot')m='The toe shape is a real clue: thin toes with sharp points were made by a meat-eater.';
 if(t==='foot')m='That is only the foot. The hip is about 4 footprints high, so 4 × 40 = 160 cm.';
 if(t==='ten')m='10 footprints is far too tall. The hip is about 4 footprints high: 4 × 40 = 160 cm.';
 if(t==='cm')m='Big dinosaurs take big steps even when walking. Count the gap in footprints: 3 means walking.';
 if(t==='herd')m='Crossing trackways that point every way were probably made at different times. A herd leaves trackways side by side, going the same way.';
 if(t==='colour')m='Tracks do show size and speed. They cannot show colour: only the shape of the foot pressed into mud.';
 if(t==='slow')m='About 8 footprints in each gap is a very long step for that foot. That means running.';
 return m}
function next(){turn++;const Q=QS[turn%QS.length],opts=[[Q.a,'ok'],...Q.o],r=turn%3,order=opts.slice(r).concat(opts.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=quiz.querySelector('.fl-pick');order.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},box,v).onclick=()=>score(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function score(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),right=t==='ok';if(right)A.win();else A.sound.miss();
 fb.innerHTML=(right?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="lbtn sm">Next one →</button>';fb.querySelector('button').onclick=next;c.say(right?'Yes.':why(t))}
function buttons(){if(!pad)return;pad.innerHTML='';const k=scene(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='shape'&&S.shape.i<PRINTS.length)MAKERS.forEach((m,i)=>B(m,()=>sortTo(i),`Print ${S.shape.i+1}: ${m.toLowerCase()}`));
 if(k==='size'&&S.size.i<SIZES.length)hipTiles().forEach(r=>B(r.t,()=>hipPick(r.tag),`Footprint ${SIZES[S.size.i].n*10} cm long: ${r.t}`));
 if(k==='gait'&&S.gait.i<GAITS.length){B('Fill the gap',()=>fillGap(),'Fill the gap with footprints');B('Walking',()=>gaitPick(0));B('Running',()=>gaitPick(1))}
 if(k==='group'&&S.group.i<GROUPS.length){B('Moving together',()=>groupPick(0));B('Not together',()=>groupPick(1))}
 if(k==='robot'&&S.robot.i<ROBOT.length){B('✓ Right',()=>verdict(0),'The robot is right');B('✗ Slip',()=>verdict(1),'The robot made a slip')}}
FK.shell(c,{steps,ratio:.6,tall:1.1,draw,onStep:st=>{quiz.hidden=st.step!==5;pad.hidden=st.step===5;buttons()},
 init:st=>{A=st;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Dinosaur trackways lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});buttons()}}).start()})})();
