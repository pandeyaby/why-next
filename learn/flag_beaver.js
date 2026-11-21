/* Flagship – how plants and animals change their surroundings to meet their needs (ages 5–6; NGSS K-ESS2-2).
   Scenes: pile sticks into a beaver dam and watch the pond fill, drag four animals to the place each one changes,
   grow a tree for four years until its roots crack a path, sort six changes by the need they meet (safe home, food,
   water), then name who made a change from a clue picture. Data in learn/beaver_art.js. */
(()=>{const {SPOTS,ANIMALS,MISS,NEEDS,JOBS,WHO,CLUES,DESC,DONE,QS}=BVR;
VIS.reg('flagbeaver',c=>{let A,btns,qbox,qn=-1,gen=0;const S={};
const INK='#1c1917',GOOD='#15803d',BAD='#b91c1c',EDGE='#78716c',HOT='#7c3aed',WATER='#38bdf8',DEEP='#0284c7',WOOD='#92400e',FONT='px system-ui,sans-serif';
const scene=()=>['dam','match','roots','need','clue','quiz'][A.step];
const fs=n=>A.narrow?n:Math.round(n*1.15);
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function sky(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#ecfccb',A.col.dark?.08:.45);g.fillRect(0,0,A.W,A.H)}
function words(t,x,y,n,col,wt){const g=A.ctx;g.font=`${wt||800} ${fs(n)}${FONT}`;g.fillStyle=col||INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,x,y)}
function wrapWords(t,r,n){const g=A.ctx;g.font=`800 ${fs(n)}${FONT}`;const out=[];let line='';t.split(' ').forEach(w=>{const tryL=line?line+' '+w:w;if(g.measureText(tryL).width>r.w-12&&line){out.push(line);line=w}else line=tryL});out.push(line);
 const lh=fs(n)+3;out.forEach((l,i)=>words(l,r.x+r.w/2,r.y+r.h/2+(i-(out.length-1)/2)*lh,n))}
function banner(t,y,o){o=o||{};const g=A.ctx;let n=fs(o.n||14);g.font=`800 ${n}${FONT}`;let w=g.measureText(t).width+28;while(w>A.W-8&&n>10){n--;g.font=`800 ${n}${FONT}`;w=g.measureText(t).width+28}
 const h=n+16,x=Math.max(4,(A.W-w)/2);g.fillStyle='#fffbeb';A.paint.rrect(x,y-h/2,w,h,9);g.fill();g.lineWidth=o.ok?3:1.5;g.strokeStyle=o.ok?GOOD:EDGE;g.stroke();g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y+1)}
function card(r,o){o=o||{};const g=A.ctx;g.fillStyle=o.bad?'#fee2e2':o.good?'#dcfce7':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=o.bad||o.good||o.on?3.5:1.6;g.strokeStyle=o.bad?BAD:o.good?GOOD:o.on?HOT:EDGE;g.stroke()}
function grid(n,cols,top,h,maxW){const gap=10,w=Math.min(maxW||170,(A.W-20-gap*(cols-1))/cols),left=(A.W-(w*cols+gap*(cols-1)))/2;return Array.from({length:n},(_,i)=>({i,x:left+(i%cols)*(w+gap),y:top+Math.floor(i/cols)*(h+gap),w,h}))}
/* ---- 1. beaver dam ---- */
const damSpot=()=>({x:A.W*.52,y:A.H*.13,w:Math.max(56,A.W*.13),h:A.H*.36});
const stickR=()=>grid(4,4,A.H*.66,Math.min(A.H*.17,70),120);
function drawDam(){const s=S.dam,g=A.ctx,top=A.H*.24,bot=A.H*.38,d=damSpot(),lvl=s.on.length/4;sky();
 g.fillStyle=WATER;g.fillRect(0,top,A.W,bot-top);
 const rise=lvl*A.H*.09;g.fillStyle=DEEP;g.globalAlpha=.25+lvl*.6;g.fillRect(0,top-rise,d.x,bot-top+2*rise);g.globalAlpha=1;
 if(s.on.length>=4){g.fillStyle=WOOD;g.beginPath();g.ellipse(d.x*.45,top+(bot-top)/2,Math.min(40,d.x*.2),22,0,Math.PI,0);g.fill();words('home',d.x*.45,top+(bot-top)/2+16,11,'#ffffff',700);g.fillStyle=WATER;g.globalAlpha=.55;g.fillRect(d.x+d.w,top+(bot-top)*.35,A.W-d.x-d.w,(bot-top)*.3);g.globalAlpha=1}
 g.setLineDash([7,6]);g.lineWidth=2.5;g.strokeStyle=s.hot===1?HOT:INK;g.strokeRect(d.x,d.y,d.w,d.h);g.setLineDash([]);
 s.on.forEach((k,j)=>{g.strokeStyle=WOOD;g.lineWidth=7;g.lineCap='round';const y=d.y+d.h-12-j*(d.h-24)/3;g.beginPath();g.moveTo(d.x+6,y+4);g.lineTo(d.x+d.w-6,y-4);g.stroke()});
 words('flow →',A.W*.86,top-12,12,INK,700);
 if(s.on.length)words(s.on.length>=4?'deep pond':'water rising',d.x/2,top-rise-14>14?top-rise-14:14,13,INK);
 banner(s.on.length>=4?'Dam built: a pond filled up':'Pile the sticks across the stream',A.H*.06,{ok:s.on.length>=4,n:13});
 stickR().forEach(r=>{if(s.on.includes(r.i)||(S.drag&&S.drag.i===r.i))return;stickCard(r,{on:s.pick===r.i})});
 if(S.drag){const q=S.drag,r=stickR()[q.i];stickCard({x:q.x-r.w/2,y:q.y-r.h/2,w:r.w,h:r.h},{on:1})}}
function stickCard(r,o){card(r,o);const g=A.ctx;g.strokeStyle=WOOD;g.lineWidth=8;g.lineCap='round';g.beginPath();g.moveTo(r.x+14,r.y+r.h*.62);g.lineTo(r.x+r.w-14,r.y+r.h*.38);g.stroke();words('stick',r.x+r.w/2,r.y+r.h*.84,11,INK,700)}
function addStick(i){const s=S.dam;if(s.on.includes(i))return;s.pick=null;s.on.push(i);A.sound.pop();say(s.on.length>=4?'4 sticks. The water backs up behind the dam into a deep pond.':`Stick ${s.on.length} of 4. The water behind the dam gets deeper.`)}
/* ---- 2. who changes which place ---- */
const spotR=()=>grid(4,2,A.H*.13,Math.min(A.H*.2,88),200),beastR=()=>grid(4,4,A.H*.72,Math.min(A.H*.14,58),110);
function place(k,r,done){const g=A.ctx,cx=r.x+r.w/2,cy=r.y+r.h*.5;
 if(k==='stream'){g.fillStyle=WATER;g.fillRect(r.x+8,cy-8,r.w-16,16);if(done){g.fillStyle=DEEP;g.fillRect(r.x+8,cy-11,r.w*.45,22);g.fillStyle=WOOD;g.fillRect(cx-4,cy-13,10,26)}}
 if(k==='field'){g.fillStyle='#65a30d';g.fillRect(r.x+8,cy-2,r.w-16,6);g.fillStyle='#a16207';g.fillRect(r.x+8,cy+4,r.w-16,10);if(done){g.fillStyle=INK;g.beginPath();g.ellipse(cx,cy+6,12,7,0,0,7);g.fill()}}
 if(k==='tree'){g.fillStyle=WOOD;g.fillRect(cx-4,cy,8,16);g.fillStyle='#16a34a';g.beginPath();g.arc(cx,cy-4,13,0,7);g.fill();if(done){g.fillStyle='#a16207';g.beginPath();g.ellipse(cx+6,cy-4,9,5,0,0,Math.PI);g.fill()}}
 if(k==='soil'){g.fillStyle='#78350f';g.fillRect(r.x+8,cy-10,r.w-16,22);if(done){g.strokeStyle='#fde68a';g.lineWidth=3;g.beginPath();g.moveTo(r.x+16,cy-4);g.bezierCurveTo(cx-20,cy+12,cx+10,cy-12,r.x+r.w-16,cy+5);g.stroke()}}}
function fitWords(t,x,y,n,maxW,col){const g=A.ctx;let v=fs(n);g.font=`800 ${v}${FONT}`;while(g.measureText(t).width>maxW&&v>9){v--;g.font=`800 ${v}${FONT}`}g.fillStyle=col||INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,x,y)}
function drawMatch(){const s=S.match;sky();const n=Object.keys(s.put).length;banner(n>=4?'Every animal changed a place':'Drag each animal to the place it changes',A.H*.05,{ok:n>=4,n:13});
 spotR().forEach(r=>{const P=SPOTS[r.i],who=s.put[P.k];card(r,{good:!!who,on:s.hot===r.i});place(P.k,r,!!who);words(P.n,r.x+r.w/2,r.y+r.h*.16,13);if(who)fitWords(`${who}: ${P.made}`,r.x+r.w/2,r.y+r.h*.85,12,r.w-10,GOOD)});
 beastR().forEach(r=>{const An=ANIMALS[r.i];if(Object.values(s.put).includes(An.n)||(S.drag&&S.drag.i===r.i))return;card(r,{bad:s.bad===r.i,on:s.pick===r.i});words(An.n,r.x+r.w/2,r.y+r.h/2,15)});
 if(S.drag){const q=S.drag,r=beastR()[q.i];card({x:q.x-r.w/2,y:q.y-r.h/2,w:r.w,h:r.h},{on:1});words(ANIMALS[q.i].n,q.x,q.y,15)}}
function match(i,j){const s=S.match,An=ANIMALS[i],P=SPOTS[j];if(Object.values(s.put).includes(An.n))return;s.pick=null;
 if(An.to!==P.k){s.bad=i;A.sound.miss();return say(`Not the ${P.n.toLowerCase()}. ${MISS[An.n]}`)}
 s.put[P.k]=An.n;s.bad=-1;A.sound.pop();say(`Yes: the ${An.n.toLowerCase()} makes ${P.made}.`)}
/* ---- 3. roots crack a path ---- */
const growR=()=>({x:A.W/2-80,y:A.H*.82,w:160,h:Math.max(48,A.H*.12)});
function drawRoots(){const s=S.roots,g=A.ctx,ground=A.H*.5,tx=A.W*.28,yr=s.yr;sky();g.fillStyle='#a16207';g.fillRect(0,ground,A.W,A.H*.3);
 const tilt=yr>=3?Math.min(1,(yr-2)/2):0,px=A.W*.36,pw=A.W*.6;
 g.save();g.translate(px,ground);g.rotate(-tilt*.16);g.fillStyle='#a8a29e';g.fillRect(0,-16,pw,16);g.strokeStyle=INK;g.lineWidth=1.5;g.strokeRect(0,-16,pw,16);
 if(yr>=4){g.strokeStyle=INK;g.lineWidth=3;g.beginPath();g.moveTo(pw*.3,-16);g.lineTo(pw*.34,-9);g.lineTo(pw*.29,-4);g.lineTo(pw*.33,0);g.stroke()}g.restore();
 const th=6+yr*5;g.fillStyle=WOOD;g.fillRect(tx-th/2,ground-A.H*.3,th,A.H*.3);g.fillStyle='#16a34a';g.beginPath();g.arc(tx,ground-A.H*.32,A.H*.07+yr*A.H*.012,0,7);g.fill();
 g.strokeStyle=WOOD;g.lineCap='round';[[.5,.1],[.62,.16],[.75,.08]].forEach(([fx,dy],k)=>{g.lineWidth=2+yr*2.2;g.beginPath();g.moveTo(tx,ground+6);g.quadraticCurveTo(A.W*fx*.8,ground+A.H*dy,A.W*(fx+.1*k)+yr*8,ground+A.H*(dy*.6));g.stroke()});
 banner(yr>=4?'The path cracked':`Year ${yr} of 4`,A.H*.06,{ok:yr>=4,n:13});
 if(yr<4){const r=growR();card(r,{on:1});words('Grow a year',r.x+r.w/2,r.y+r.h/2,15)}}
function grow(){const s=S.roots;if(s.yr>=4)return;s.yr++;A.sound.pop();
 say(s.yr<3?`Year ${s.yr}: the roots get thicker under the path.`:s.yr===3?'Year 3: the thick roots push the path up.':'Year 4: the roots pushed so hard the path cracked.')}
/* ---- 4. which need ---- */
const needBins=()=>[0,1,2].map(k=>{const w=(A.W-32)/3;return{k,x:8+k*(w+8),y:A.H*.11,w,h:A.H*.3}});
const jobR=()=>grid(6,3,A.H*.5,Math.min(A.H*.17,72),170);
function drawNeed(){const s=S.need,g=A.ctx;sky();banner(s.put.length>=6?'All sorted':'Which need does each change meet?',A.H*.045,{ok:s.put.length>=6,n:13});
 needBins().forEach(b=>{g.fillStyle=['#e0f2fe','#fef3c7','#dbeafe'][b.k];A.paint.rrect(b.x,b.y,b.w,b.h,12);g.fill();g.lineWidth=s.hot===b.k?4:2;g.strokeStyle=s.hot===b.k?HOT:EDGE;g.stroke();
  words(NEEDS[b.k],b.x+b.w/2,b.y+16,14);s.put.filter(i=>JOBS[i].to===b.k).forEach((i,j)=>fitWords(JOBS[i].s,b.x+b.w/2,b.y+42+j*fs(17),13,b.w-8))});
 jobR().forEach(r=>{if(s.put.includes(r.i)||(S.drag&&S.drag.i===r.i))return;card(r,{bad:s.bad===r.i,on:s.pick===r.i});wrapWords(JOBS[r.i].n,r,12)});
 if(S.drag){const q=S.drag,r=jobR()[q.i],rr={x:q.x-r.w/2,y:q.y-r.h/2,w:r.w,h:r.h};card(rr,{on:1});wrapWords(JOBS[q.i].n,rr,12)}}
function sortJob(i,k){const s=S.need,J=JOBS[i];if(s.put.includes(i))return;s.pick=null;
 if(J.to!==k){s.bad=i;A.sound.miss();return say(`Not ${NEEDS[k].toLowerCase()}. ${J.why}`)}
 s.put.push(i);s.bad=-1;A.sound.pop();say(`Yes. ${J.why}`+(s.put.length>=6?' All sorted.':` ${s.put.length} of 6.`))}
/* ---- 5. clue detective ---- */
const whoR=()=>grid(4,2,A.H*.62,Math.min(A.H*.15,60),200);
function clueArt(k,cx,cy,z){const g=A.ctx;g.fillStyle='#65a30d';g.fillRect(cx-z,cy+z*.35,2*z,z*.25);
 if(k==='stump'){g.fillStyle=WOOD;g.beginPath();g.moveTo(cx-z*.16,cy+z*.35);g.lineTo(cx-z*.16,cy-z*.05);g.lineTo(cx-z*.04,cy-z*.2);g.lineTo(cx,cy-z*.5);g.lineTo(cx+z*.05,cy-z*.2);g.lineTo(cx+z*.16,cy-z*.05);g.lineTo(cx+z*.16,cy+z*.35);g.fill();g.strokeStyle='#fde68a';g.lineWidth=2;g.beginPath();g.moveTo(cx-z*.04,cy-z*.2);g.lineTo(cx+z*.05,cy-z*.2);g.stroke();g.fillStyle='#fbbf24';[-.6,-.45,.5,.65].forEach(f=>g.fillRect(cx+z*f,cy+z*.3,9,5));g.fillStyle=WATER;g.fillRect(cx-z,cy+z*.6,2*z,z*.12)}
 if(k==='hole'){g.fillStyle='#a16207';g.beginPath();g.ellipse(cx+z*.35,cy+z*.28,z*.35,z*.2,0,Math.PI,0);g.fill();g.fillStyle=INK;g.beginPath();g.ellipse(cx-z*.25,cy+z*.42,z*.22,z*.14,0,0,7);g.fill()}
 if(k==='cast'){g.strokeStyle='#78350f';g.lineWidth=4;[-.6,-.1,.45].forEach(f=>{g.beginPath();g.arc(cx+z*f,cy+z*.25,z*.09,0,7);g.arc(cx+z*f+4,cy+z*.18,z*.06,0,7);g.stroke()})}
 if(k==='path'){g.fillStyle=WOOD;g.fillRect(cx-z*.75,cy-z*.6,z*.12,z*.95);g.fillStyle='#16a34a';g.beginPath();g.arc(cx-z*.69,cy-z*.7,z*.25,0,7);g.fill();
  g.save();g.translate(cx-z*.45,cy+z*.35);g.rotate(-.14);g.fillStyle='#a8a29e';g.fillRect(0,-12,z*1.3,12);g.strokeStyle=INK;g.lineWidth=3;g.beginPath();g.moveTo(z*.4,-12);g.lineTo(z*.45,-6);g.lineTo(z*.4,0);g.stroke();g.restore()}}
function drawClue(){const s=S.clue;sky();if(s.r>=CLUES.length){banner('All 4 clues solved',A.H*.1,{ok:1});CLUES.forEach((C,j)=>clueArt(C.k,A.W*(.14+j*.24),A.H*.45,Math.min(A.W*.1,60)));return}
 const C=CLUES[s.r];banner(`Clue ${s.r+1} of 4: who made this?`,A.H*.05,{n:13});clueArt(C.k,A.W/2,A.H*.3,Math.min(A.W*.28,A.H*.3));
 wrapWords(C.n,{x:8,y:A.H*.47,w:A.W-16,h:A.H*.1},12);whoR().forEach(r=>{card(r,{bad:s.bad===r.i});words(WHO[r.i],r.x+r.w/2,r.y+r.h/2,15)})}
function guess(j){const s=S.clue;if(s.r>=CLUES.length)return;const C=CLUES[s.r];
 if(j!==C.who){s.bad=j;A.sound.miss();return say(j===3?'Roots only push from below. Look again at the clue.':`Not a ${WHO[j].toLowerCase()}. Look at the clue: ${C.n.toLowerCase()}.`)}
 s.bad=-1;s.r++;A.sound.pop();say(C.why)}
/* ---- frame ---- */
function draw(){const k=scene();if(k==='quiz'){sky();banner('Challenge',A.H*.25,{ok:1});banner('Who changed it, and why?',A.H*.5,{n:13});return}
 ({dam:drawDam,match:drawMatch,roots:drawRoots,need:drawNeed,clue:drawClue})[k]();A.fx.draw(A.ctx)}
const dragLists={dam:()=>stickR().filter(r=>!S.dam.on.includes(r.i)),match:()=>beastR().filter(r=>!Object.values(S.match.put).includes(ANIMALS[r.i].n)),need:()=>jobR().filter(r=>!S.need.put.includes(r.i))};
function targetAt(k,p){if(k==='dam')return hit(p,damSpot())?0:null;const list=k==='match'?spotR():needBins(),t=list.find(r=>hit(p,r));return t?(k==='match'?t.i:t.k):null}
function drop(k,i,t){if(k==='dam')addStick(i);else if(k==='match')match(i,t);else sortJob(i,t)}
function down(p){const k=scene();
 if(k==='roots'){if(hit(p,growR())||hit(p,{x:0,y:A.H*.1,w:A.W*.5,h:A.H*.5}))grow();return false}
 if(k==='clue'){const r=whoR().find(r=>hit(p,r));if(r)guess(r.i);return false}
 if(!dragLists[k])return false;const r=dragLists[k]().find(r=>hit(p,r));if(r){S.drag={i:r.i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}
 const st=S[k],t=targetAt(k,p);if(t!=null&&st.pick!=null)drop(k,st.pick,t);return false}
function move(p){if(!S.drag)return;S.drag.x=p.x;S.drag.y=p.y;const k=scene(),t=targetAt(k,p);S[k].hot=t==null?-1:k==='dam'?1:t;A.redraw()}
function lift(p){const q=S.drag;if(!q)return;S.drag=null;const k=scene(),st=S[k];st.hot=-1;const t=targetAt(k,p);if(t!=null)return drop(k,q.i,t);
 if(Math.hypot(p.x-q.x0,p.y-q.y0)<10){st.pick=q.i;return say(k==='dam'?'Picked a stick. Now tap the dam spot.':'Picked. Now tap where it goes.')}
 if(k==='dam')say('Put the stick across the stream, on the dashed dam spot.');A.redraw()}
function reset(){gen++;for(const k in S)delete S[k];Object.assign(S,{dam:{on:[],pick:null,hot:-1},match:{put:{},pick:null,bad:-1,hot:-1},roots:{yr:0},need:{put:[],pick:null,bad:-1,hot:-1},clue:{r:0,bad:-1},drag:null,check:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();twins();S.check()}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,ok){reset();say(DESC[i]);S.check=finish(i,ok,DONE[i])}
function auto(i,acts,ms){steps[i].go();const g0=gen;acts.forEach((f,j)=>setTimeout(()=>{if(g0===gen)f()},ms*(j+1)))}
function twins(){if(!btns)return;btns.innerHTML='';const k=scene(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},btns,t).onclick=f};
 if(k==='dam')[0,1,2,3].forEach(i=>{if(!S.dam.on.includes(i))B(`Stick ${i+1} → dam`,()=>addStick(i),`Put stick ${i+1} on the dam`)});
 if(k==='match')ANIMALS.forEach((An,i)=>{if(!Object.values(S.match.put).includes(An.n))SPOTS.forEach((P,j)=>B(`${An.n} → ${P.n}`,()=>match(i,j)))});
 if(k==='roots'&&S.roots.yr<4)B('Grow a year',grow,'Grow the tree for one more year');
 if(k==='need')JOBS.forEach((J,i)=>{if(!S.need.put.includes(i))NEEDS.forEach((n,b)=>B(`${J.n} → ${n}`,()=>sortJob(i,b)))});
 if(k==='clue'&&S.clue.r<CLUES.length)WHO.forEach((w,j)=>B(w,()=>guess(j),`It was made by: ${w}`))}
const steps=[
{h:'Build a dam',p:'Beavers pile sticks and mud across a stream. Drag the sticks onto the dam spot and watch the water.',
 predict:{q:'A beaver piles sticks across a stream. What happens to the water?',opts:['It flows on just the same','It backs up into a deep pond'],ans:1},task:'Pile all 4 sticks on the dam',
 show:()=>auto(0,[0,1,2,3].map(i=>()=>addStick(i)),450),go:()=>begin(0,()=>S.dam.on.length>=4)},
{h:'Who changes it?',p:'Animals change the places they live. Drag each animal to the place it changes.',task:'Match all 4 animals',
 show:()=>auto(1,ANIMALS.map((An,i)=>()=>match(i,SPOTS.findIndex(P=>P.k===An.to))),500),go:()=>begin(1,()=>Object.keys(S.match.put).length>=4)},
{h:'Plants push too',p:'A tree grows next to a path. Grow it year by year and watch its roots.',
 predict:{q:'Can a tree change a hard path?',opts:['No, plants are too soft','Yes, its growing roots push it up'],ans:1},task:'Grow the tree for 4 years',
 show:()=>auto(2,[grow,grow,grow,grow],450),go:()=>begin(2,()=>S.roots.yr>=4)},
{h:'Why change it?',p:'Living things change places to get what they need. Sort each change by the need it meets.',task:'Sort all 6 changes',
 show:()=>auto(3,JOBS.map((J,i)=>()=>sortJob(i,J.to)),450),go:()=>begin(3,()=>S.need.put.length>=6)},
{h:'Clue detective',p:'Scientists use clues. Look at each clue picture and say who made the change.',task:'Solve all 4 clues',
 show:()=>auto(4,CLUES.map(C=>()=>guess(C.who)),600),go:()=>begin(4,()=>S.clue.r>=CLUES.length)},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
function slipMsg(t){let m='Look for the clue and the need behind each change.';
 if(t==='dam')m='A dam holds water back, so it fills up into a pond behind it.';
 if(t==='plant')m='Plants change places too: growing roots push hard enough to crack a path.';
 if(t==='need')m='Living things change a place to meet a need: a safe home, food or water.';
 if(t==='clue')m='Use the clue: chewed wood means a beaver, curly soil piles mean worms.';
 return m}
function ask(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok'],...Q.o],sh=qn%3,ord=all.slice(sh).concat(all.slice(0,sh));
 qbox.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=qbox.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){qbox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qbox.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+slipMsg(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':slipMsg(t))}
FK.shell(c,{steps,ratio:.7,tall:1.3,draw,onStep:st=>{qbox.hidden=st.step!==5;btns.hidden=st.step===5;twins()},
 init:st=>{A=st;const w=c.el('div',{class:'fl-below'},A.below);btns=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Changing places lab buttons'},w);qbox=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up:lift});twins()}}).start()})})();
