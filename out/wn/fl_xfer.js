/* Flagship: transferring skills (ages 8–9; Learning to Learn: Perkins & Salomon near/far transfer and bridging, Gick & Holyoak
   analogical transfer, Chi et al. surface vs deep structure, EEF metacognition guidance). Spot which new problems share a trick
   (not a topic), build the table for one, sort look-alike problems by their trick, carry a skill into other subjects, check when
   a trick does not fit, and order the questions that make transfer happen. Tap, drag or use the buttons. */
(()=>{
const {SPOT,FLAV,CONE,TRICKS,SORTS,WHERE,FIT,ROUTINE,BANK,WHY}=XFERART;
const Z={ink:'#111827',mid:'#374151',base:'#fffdf8',rim:'#1f2937',tip:'#fff7ed',good:'#166534',goodBg:'#dcfce7',bad:'#9f1239',badBg:'#ffe4e6',pick:'#1d4ed8',pickBg:'#dbeafe',
 tabA:'#ede9fe',tabB:'#fef3c7',cell:'#ffffff'};
const SHUF=[3,0,4,1,2];
VIS.reg('flagxfer',c=>{let A,X,pad,chal,qx=-1,streak=0,job=0;const V={after:()=>{}};
const sz=n=>Math.round(n*(A.narrow?1:1.1));
function tellAll(s){c.say(s);A.cv.setAttribute('aria-label',s)}
function ink(s,x,y,n,col,w,al){X.font=`${w||700} ${sz(n)}px system-ui,sans-serif`;X.fillStyle=col||Z.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y)}
function lines(s,maxW,n){X.font=`700 ${sz(n)}px system-ui,sans-serif`;const out=[];let r='';for(const w of String(s).split(' ')){const t=r?r+' '+w:w;if(r&&X.measureText(t).width>maxW){out.push(r);r=w}else r=t}out.push(r);return out}
function tile(x,y,w,h,f,e,lw,rad){A.paint.rrect(x,y,w,h,rad||12);X.fillStyle=f;X.fill();if(e){X.lineWidth=lw||2;X.strokeStyle=e;X.stroke()}}
function inTile(s,r,n,col){const L=lines(s,r.w-sz(14),n),lh=sz(n)+4;L.forEach((t,i)=>ink(t,r.x+r.w/2,r.y+r.h/2+(i-(L.length-1)/2)*lh,n,col))}
const isIn=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function header(s,won){const L=lines(s,A.W-44,14),lh=sz(14)+4,h=Math.max(sz(36),L.length*lh+14);tile(12,10,A.W-24,h,won?Z.goodBg:Z.tip,won?Z.good:Z.rim,2);L.forEach((r,i)=>ink(r,A.W/2,10+h/2+(i-(L.length-1)/2)*lh,14,won?Z.good:Z.ink));return 10+h}
function footer(){if(!V.msg)return 0;const L=lines((V.bad?'✗ ':'✓ ')+V.msg,A.W-48,13),lh=sz(13)+5,h=L.length*lh+12,y=A.H-h-10;tile(12,y,A.W-24,h,'#ffffff',V.bad?Z.bad:Z.good,3);L.forEach((r,i)=>ink(r,A.W/2,y+6+lh*(i+.5),13,V.bad?Z.bad:Z.ink));return h+14}
const wrong=s=>{V.bad=true;V.msg=s;A.sound.miss();sync()};
const right=s=>{V.bad=false;V.msg=s;A.sound.pop()};
const stage=()=>['spot','sort','where','fit','routine','quiz'][A.step];
/* ---------- step 0: spot the trick, then use it ---------- */
function spot(i){if(V.won)return;if(V.phase==='build')return;const S=SPOT[i];if(V.found.includes(i))return;
 if(!S[1])return wrong(S[2]);V.found.push(i);right(S[2]);if(V.found.length===2){V.phase='build';V.msg+=' Now use the trick: fill the ice cream table.'}sync()}
function fill(r,cl){if(V.won||V.phase!=='build')return;const key=r+','+cl;if(V.cells.has(key))return;V.cells.add(key);A.sound.tick();
 const n=V.cells.size;right(`${FLAV[r]} in a ${CONE[cl].toLowerCase()} cone. That is ${n} so far.`);if(n===6){V.won=true;V.msg='3 flavours × 2 cones = 6 ice creams. The outfits trick worked on a new problem.'}sync()}
function nextEmpty(){for(let r=0;r<3;r++)for(let cl=0;cl<2;cl++)if(!V.cells.has(r+','+cl))return[r,cl];return null}
function drawSpot(t0,b0){if(V.phase!=='build'){const ex={x:sz(14),y:t0,w:A.W-sz(28),h:sz(46)};tile(ex.x,ex.y,ex.w,ex.h,Z.tabA,Z.rim,2);inTile('Worked example: 2 tops × 3 shorts. A table of every pair gives 6 outfits.',ex,13,Z.ink);
  const y0=ex.y+ex.h+sz(10),gw=(A.W-sz(38))/2,gh=Math.min(sz(110),(b0-y0-sz(8))/2);V.spotR=SPOT.map((S,i)=>{const r={x:sz(14)+(i%2)*(gw+sz(10)),y:y0+Math.floor(i/2)*(gh+sz(8)),w:gw,h:gh,i},got=V.found.includes(i);
   tile(r.x,r.y,r.w,r.h,got?Z.goodBg:'#ffffff',got?Z.good:Z.rim,got?3:2);inTile(S[0],r,13,Z.ink);return r});return}
 const lw=Math.min(sz(110),A.W*.28),cw=(A.W-sz(28)-lw)/2,ch=Math.min(sz(58),(b0-t0-sz(40))/3.4);V.cellR=[];ink('Ice creams: every flavour with every cone',A.W/2,t0+sz(10),14,Z.ink,900);
 CONE.forEach((n,cl)=>{tile(sz(14)+lw+cl*cw+3,t0+sz(24),cw-6,ch*.7,Z.tabB,Z.rim,1.5,8);ink(n+' cone',sz(14)+lw+cl*cw+cw/2,t0+sz(24)+ch*.35,13,Z.ink,900)});
 FLAV.forEach((f,r)=>{const y=t0+sz(28)+ch*.7+r*ch;tile(sz(14),y+3,lw-6,ch-6,Z.tabA,Z.rim,1.5,8);ink(f,sz(14)+lw/2,y+ch/2,13,Z.ink,900);
  CONE.forEach((n,cl)=>{const R={x:sz(14)+lw+cl*cw+3,y:y+3,w:cw-6,h:ch-6,r,cl},got=V.cells.has(r+','+cl);V.cellR.push(R);tile(R.x,R.y,R.w,R.h,got?Z.goodBg:Z.cell,got?Z.good:Z.mid,got?2.5:1.5,8);ink(got?`${f} + ${n.toLowerCase()}`:'tap',R.x+R.w/2,R.y+R.h/2,12,got?Z.ink:Z.mid,800)})});
 ink(`Ice creams found: ${V.cells.size}`,A.W/2,t0+sz(28)+ch*.7+3*ch+sz(16),15,Z.ink,900)}
/* ---------- steps 1 and 3: one card, two boxes ---------- */
const deck=()=>stage()==='sort'?SORTS:FIT;
const boxNames=()=>stage()==='sort'?TRICKS:['Adding fits','Adding does not fit'];
function place(b){if(V.won)return;const D=deck(),C=D[V.card],want=stage()==='sort'?C[1]:(C[1]?0:1);if(b!==want)return wrong(C[2]);right(C[2]);V.card++;
 if(V.card>=D.length){V.won=true;V.msg=stage()==='sort'?'Look-alike problems can need different tricks. Sort by what they ask.':'Before using a trick, check the new problem is the same kind.'}sync()}
function drawDeck(t0,b0){const names=boxNames(),bw=(A.W-sz(38))/2,bh=Math.min(sz(110),(b0-t0)*.4),by=b0-bh;
 if(stage()==='fit'){const r={x:sz(14),y:t0,w:A.W-sz(28),h:sz(38)};tile(r.x,r.y,r.w,r.h,Z.tabA,Z.rim,2);inTile('The trick from last week: "How many altogether? Add."',r,13,Z.ink);t0+=sz(46)}
 V.boxR=names.map((n,i)=>{const r={x:sz(14)+i*(bw+sz(10)),y:by,w:bw,h:bh,i};tile(r.x,r.y,bw,bh,i?Z.tabB:Z.tabA,Z.rim,2.5);inTile(n,r,15,Z.ink);return r});
 const D=deck();if(V.card<D.length){const cw=Math.min(A.W-sz(40),sz(420)),L=lines(D[V.card][0],cw-sz(20),15),chh=L.length*(sz(15)+4)+sz(22),home={x:(A.W-cw)/2,y:t0+(by-t0-chh)/2,w:cw,h:chh},d=V.drag;V.cardR=home;
  const R=d?{x:d.x-cw/2,y:d.y-chh/2,w:cw,h:chh}:home;tile(R.x,R.y,R.w,R.h,'#ffffff',d?Z.pick:Z.rim,3);inTile(D[V.card][0],R,15,Z.ink);ink(`Card ${V.card+1} of ${D.length}`,A.W/2,Math.max(t0+sz(8),home.y-sz(12)),12,Z.mid,800)}}
/* ---------- step 2: where else can it help? ---------- */
function where(i){if(V.won)return;const W=WHERE[V.round],P=W[2][i];if(V.hits.includes(i))return;if(!P[1])return wrong(P[2]);V.hits.push(i);right(P[2]);
 if(V.hits.length===2){V.round++;V.hits=[];if(V.round>=WHERE.length){V.won=true;V.msg='A skill from one subject can work in another. Ask: where else could this help?'}else V.msg+=' Next skill!'}sync()}
function drawWhere(t0,b0){const W=WHERE[Math.min(V.round,WHERE.length-1)],sk={x:sz(14),y:t0,w:A.W-sz(28),h:sz(56)};tile(sk.x,sk.y,sk.w,sk.h,Z.tabA,Z.rim,2.5);inTile(`Skill: ${W[0]}. You learned it in ${W[1]}.`,sk,14,Z.ink);
 const y0=sk.y+sk.h+sz(10),gw=(A.W-sz(38))/2,gh=Math.min(sz(100),(b0-y0-sz(8))/2);V.whereR=W[2].map((P,i)=>{const r={x:sz(14)+(i%2)*(gw+sz(10)),y:y0+Math.floor(i/2)*(gh+sz(8)),w:gw,h:gh,i},got=V.hits.includes(i)&&V.round<WHERE.length;
  tile(r.x,r.y,r.w,r.h,got?Z.goodBg:'#ffffff',got?Z.good:Z.rim,got?3:2);inTile(P[0],r,13,Z.ink);return r})}
/* ---------- step 4: the transfer questions in order ---------- */
function order(k){if(V.won)return;const want=V.placed.length;if(V.placed.includes(k))return;if(k!==want){return wrong(want===0?'Start by asking what the problem is really asking. The topic can fool you.':`Not yet. Step ${want+1} comes before that: "${ROUTINE[want]}"`)}
 V.placed.push(k);right(`Step ${want+1}: ${ROUTINE[k]}`);if(V.placed.length===ROUTINE.length){V.won=true;V.msg='Ask, remember, pick, check it fits, then try and check. That is how a skill crosses over.'}sync()}
function drawRoutine(t0,b0){const n=ROUTINE.length,gap=sz(6),rh=Math.min(sz(46),(b0-t0-gap*(n-1))/n),colW=(A.W-sz(38))/2;V.pileR=[];
 SHUF.forEach((k,j)=>{if(V.placed.includes(k))return;const r={x:sz(14),y:t0+j*(rh+gap),w:colW,h:rh,k};V.pileR.push(r);tile(r.x,r.y,r.w,r.h,'#ffffff',Z.rim,2,10);inTile(ROUTINE[k],r,12,Z.ink)});
 for(let s=0;s<n;s++){const r={x:sz(24)+colW,y:t0+s*(rh+gap),w:colW,h:rh},k=V.placed[s];tile(r.x,r.y,r.w,r.h,k!=null?Z.goodBg:Z.cell,k!=null?Z.good:Z.mid,k!=null?2.5:1.5,10);inTile(k!=null?`${s+1}. ${ROUTINE[k]}`:`${s+1}.`,r,12,k!=null?Z.ink:Z.mid)}}
function draw(){X.fillStyle=A.col.dark?'#1f2937':Z.base;X.fillRect(0,0,A.W,A.H);X.fillStyle=Z.base;A.paint.rrect(5,5,A.W-10,A.H-10,16);X.fill();
 const K=stage(),T={spot:[V.phase==='build'?'Use the trick: tap each box in the table.':'Which new problems use the same trick? Tap 2.','Same trick, new problem.'],sort:['Which trick does this problem need? Drag it to a box.','Sorted by trick, not topic.'],
  where:['Where else can this skill help? Tap 2 places.','Skills can cross subjects.'],fit:['Does the adding trick fit? Drag the card to a box.','Check it fits first.'],routine:['Put the transfer questions in order. Tap the first one.','Your transfer routine.'],quiz:['Look under the surface: what is it really asking?','']};
 const t=header(V.won?T[K][1]:T[K][0],V.won),b=A.H-footer()-sz(6);
 if(K==='spot')drawSpot(t+sz(8),b);if(K==='sort'||K==='fit')drawDeck(t+sz(10),b);if(K==='where')drawWhere(t+sz(8),b);if(K==='routine')drawRoutine(t+sz(8),b);
 if(K==='quiz'){const r={x:sz(30),y:t+sz(30),w:A.W-sz(60),h:Math.min(sz(140),b-t-sz(60))};tile(r.x,r.y,r.w,r.h,Z.tabA,Z.rim,2);inTile('Same topic does not mean same trick. Same trick can be in a new subject.',r,15,Z.ink)}
 A.fx.draw(X)}
/* ---------- pointer ---------- */
let held=null;
function down(p){const K=stage();
 if(K==='spot'){if(V.phase==='build'){const r=(V.cellR||[]).find(q=>isIn(p,q));if(r){held={t:'paint'};fill(r.r,r.cl);return true}}else{const r=(V.spotR||[]).find(q=>isIn(p,q));if(r){spot(r.i);return true}}}
 if((K==='sort'||K==='fit')&&!V.won){if(V.cardR&&isIn(p,V.cardR)){held={t:'card'};V.drag={x:p.x,y:p.y};A.redraw();return true}const r=(V.boxR||[]).find(q=>isIn(p,q));if(r){place(r.i);return true}}
 if(K==='where'){const r=(V.whereR||[]).find(q=>isIn(p,q));if(r){where(r.i);return true}}
 if(K==='routine'){const r=(V.pileR||[]).find(q=>isIn(p,q));if(r){order(r.k);return true}}
 return false}
function move(p){if(!held)return;if(held.t==='card'){V.drag={x:p.x,y:p.y};A.redraw()}if(held.t==='paint'){const r=(V.cellR||[]).find(q=>isIn(p,q));if(r)fill(r.r,r.cl)}}
function up(p){const h=held;held=null;if(!h)return;if(h.t==='card'){V.drag=null;const r=(V.boxR||[]).find(q=>isIn(p,q));if(r)place(r.i);else A.redraw()}}
/* ---------- live description and buttons ---------- */
function sync(){const K=stage();let d='Challenge.';
 if(K==='spot')d=V.phase==='build'?`Ice cream table: ${V.cells.size} of 6 filled.`:`Problems: ${SPOT.map((S,i)=>(i+1)+'. '+S[0]).join(' ')} Found ${V.found.length} of 2.`;
 if(K==='sort'||K==='fit')d=V.won?'All cards placed.':`Card ${V.card+1} of ${deck().length}: ${deck()[V.card][0]} Boxes: ${boxNames().join(', ')}.`;
 if(K==='where')d=V.won?'Both skills carried across.':`Skill: ${WHERE[V.round][0]}. Places: ${WHERE[V.round][2].map(P=>P[0]).join('; ')}. Found ${V.hits.length} of 2.`;
 if(K==='routine')d=`Placed ${V.placed.length} of 5: ${V.placed.map(k=>ROUTINE[k]).join(' then ')||'none yet'}.`;
 tellAll((V.msg?V.msg+' ':'')+d);knobs();V.after()}
function knobs(){if(!pad)return;pad.innerHTML='';const K=stage(),b=(t,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},pad,t).onclick=()=>{fn();sync()}};
 if(!V.won){if(K==='spot'){if(V.phase==='build'){const e=nextEmpty();if(e)b(`Fill ${FLAV[e[0]]} + ${CONE[e[1]].toLowerCase()}`,()=>fill(e[0],e[1]))}else SPOT.forEach((S,i)=>{if(!V.found.includes(i))b(`Problem ${i+1}`,()=>spot(i))})}
  if(K==='sort'||K==='fit')boxNames().forEach((n,i)=>b(n,()=>place(i)));
  if(K==='where')WHERE[V.round][2].forEach((P,i)=>{if(!V.hits.includes(i))b(P[0].split(':')[0],()=>where(i))});
  if(K==='routine')SHUF.forEach(k=>{if(!V.placed.includes(k))b(ROUTINE[k],()=>order(k))})}
 A.redraw()}
const ok=(n,test,msg)=>()=>{if(A.step===n&&test()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const run=(fns,ms)=>{const id=++job;fns.forEach((f,j)=>setTimeout(()=>{if(id===job){f();sync()}},(j+1)*(A.reduced()?50:ms)))};
function clear(){job++;Object.assign(V,{after:()=>{},won:false,msg:'',bad:false,phase:'spot',found:[],cells:new Set(),card:0,drag:null,round:0,hits:[],placed:[]})}
const steps=[
{h:'Spot the same trick',p:'A trick you learned for one problem can solve a new one. Look at what the problem asks, not what it is about.',
predict:{q:'Which problem uses the same trick as the outfits?',opts:['The story about getting dressed','Ice creams: flavours and cones','The days of the week'],ans:1},
task:'Find the 2 matching problems, then fill the table',show:()=>{steps[0].go();run([()=>spot(0),()=>spot(2),...[0,1,2].flatMap(r=>[0,1].map(cl=>()=>fill(r,cl)))],380)},go:()=>{clear();sync();V.after=ok(0,()=>V.won,'6 ice creams.')}},
{h:'Look under the surface',p:'Two problems can look alike on the surface but need different tricks. Sort each one by the trick it needs.',
predict:{q:'"Pizza: 3 toppings and 2 crusts" and "Making a pizza: first, next, last". Same trick?',opts:['Yes, both are about pizza','No, they need different tricks'],ans:1},
task:'Sort all 6 problems by trick',show:()=>{steps[1].go();run(SORTS.map(S=>()=>place(S[1])),420)},go:()=>{clear();sync();V.after=ok(1,()=>V.won,'Sorted by trick.')}},
{h:'Where else can it help?',p:'Skills are not stuck in one subject. Ask yourself: where else could I use this?',
predict:{q:'Sorting by a rule is a science skill. Can it help in English?',opts:['No, it is a science skill','Yes, like sorting words by their ending'],ans:1},
task:'Find 2 places for each skill',show:()=>{steps[2].go();run(WHERE.flatMap(W=>W[2].map((P,i)=>[P,i]).filter(q=>q[0][1]).map(q=>()=>where(q[1]))),450)},go:()=>{clear();sync();V.after=ok(2,()=>V.won,'Two skills carried across.')}},
{h:'Check the trick fits',p:'A trick only helps if the new problem is the same kind. "Altogether" means add. Other questions may need a different trick.',
predict:{q:'"Tom is 9. Ana is 7. How much older is Tom?" Does adding fit?',opts:['Yes, add: 16','No, find the difference'],ans:1},
task:'Decide for all 4 problems',show:()=>{steps[3].go();run(FIT.map(F=>()=>place(F[1]?0:1)),420)},go:()=>{clear();sync();V.after=ok(3,()=>V.won,'Checked before using it.')}},
{h:'Your transfer questions',p:'Good learners ask the same questions every time they meet a new problem. Put them in order.',
task:'Tap the 5 questions in order',show:()=>{steps[4].go();run([0,1,2,3,4].map(k=>()=>order(k)),380)},go:()=>{clear();sync();V.after=ok(4,()=>V.won,'Routine ready.')}},
{h:'Challenge',p:'',go:()=>{clear();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>V.after()});
function ask(){qx++;const [q,good,bads]=BANK[qx%BANK.length],all=[[good,'ok'],...bads],r=qx%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>grade(tag,good)});tellAll('Challenge: '+q);A.redraw()}
function grade(tag,good){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),yes=tag==='ok';let m=WHY[tag]||'Ask what the problem is really asking.';
 if(tag==='surface')m='Same topic is not the same trick. Ignore the surface and look at what it asks you to do.';
 if(tag==='onesubject')m='A skill is not stuck in the subject where you learned it. Sorting by a rule helps in English and maths too.';
 if(tag==='addfits')m='Adding fits "altogether". "How much older" compares, so find the difference: 10 − 7 = 3.';
 if(yes){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${yes?'✓ Yes: '+good+'. In a row: '+streak+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;knobs()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Transferring skills lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
