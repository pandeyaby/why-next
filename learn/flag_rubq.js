/* Flagship – charging by electron transfer (ages 12–14; NC England KS3 physics "separation of positive or negative
   charges when objects are rubbed together: transfer of electrons, forces between charged objects"; AQA KS3 / GCSE
   4.2.5.1 static charge). Rub a balloon on hair and count the electrons that hop across, drag charges between a rod and
   a cloth (protons stay locked in their nuclei), give the partner's equal and opposite charge, decide which way the
   electrons went from the sign a material ends up with, and predict attract or repel. Charges are counted as whole
   electrons (each +1 is one missing electron, -1 one extra), never as moving positive charge. */
(()=>{
const P=5;   /* protons in each object (fixed) */
const BUILD=[{t:-2,l:'rod',r:'cloth'},{t:3,l:'rod',r:'cloth'}];
/* gainer, partner, how many electrons gained (by the first object) */
const EQ=[['balloon','hair',3],['polythene rod','wool cloth',5],['acetate rod','cloth',-4]];
/* clue, left, right, electrons go left->right (1) or right->left (0) */
const WAY=[['A polythene rod rubbed with wool ends up negative.','rod','wool',0],['An acetate rod rubbed with a cloth ends up positive.','rod','cloth',1],['A balloon rubbed on a jumper ends up negative.','balloon','jumper',0],['After rubbing, a cloth is negative and the perspex rod it rubbed is positive.','perspex','cloth',1]];
/* names, charges, attract? */
const PAIR=[['balloon','balloon',-1,-1,0],['balloon','hair',-1,1,1],['acetate','acetate',1,1,0],['polythene','acetate',-1,1,1]];
const sgn=n=>n>0?'+'+n:n<0?'−'+(-n):'0';
VIS.reg('flagrubq',c=>{let A,ctl,qz,qi=-1,epoch=0;
const Q={};
const TXT='#0f172a',GO='#047857',ERR='#b91c1c',GREY='#64748b',GRAB='#1d4ed8',PLUS='#b91c1c',MINUS='#1d4ed8',CARDC='#ffffff';
const FILL={balloon:'#fecaca',hair:'#fde68a',rod:'#e2e8f0',cloth:'#fef3c7',wool:'#fef3c7',jumper:'#dcfce7',perspex:'#e0f2fe',acetate:'#e0f2fe',polythene:'#e2e8f0'};
const z=n=>Math.round(n*(A.narrow?1:1.2)),f=(n,w)=>`${w||800} ${z(n)}px system-ui,sans-serif`;
const phase=()=>['rub','move','equal','way','force','test'][A.step],inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function ground(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#eff6ff',A.col.dark?.04:.5);g.fillRect(0,0,A.W,A.H)}
function head(t,ok,y){const g=A.ctx;y=y||A.H*.07;let n=15;g.font=f(n);while(g.measureText(t).width+30>A.W-8&&n>10){n--;g.font=f(n)}
const w=g.measureText(t).width+28,h=z(n)+16;g.fillStyle=CARDC;A.paint.rrect(A.W/2-w/2,y-h/2,w,h,8);g.fill();g.lineWidth=ok?3:1.5;g.strokeStyle=ok?GO:GREY;g.stroke();g.fillStyle=TXT;g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y+1)}
function para(t,y,n){const g=A.ctx;g.fillStyle=A.col.tx;g.font=f(n||15,700);g.textAlign='center';g.textBaseline='middle';const L=[''];t.split(' ').forEach(w=>{const s=L[L.length-1]?L[L.length-1]+' '+w:w;if(g.measureText(s).width>A.W-26)L.push(w);else L[L.length-1]=s});L.forEach((l,i)=>g.fillText(l,A.W/2,y+i*z(21)))}
/* an object box with its fixed protons on top and its electrons below; returns the symbol positions */
function body(r,name,e,o){o=o||{};const g=A.ctx;g.fillStyle=FILL[name.split(' ')[0]]||'#f1f5f9';A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=o.rim?4:2;g.strokeStyle=o.rim||GREY;g.stroke();
g.fillStyle=TXT;g.font=f(14);g.textAlign='center';g.textBaseline='top';g.fillText(name,r.x+r.w/2,r.y+6,r.w-6);
const cols=5,cw=(r.w-12)/cols,rad=Math.min(cw*.4,z(15)),spots=[];
const put=(i,row,ch)=>{const x=r.x+6+cw*(i%cols)+cw/2,y=r.y+z(26)+rad+row*rad*2.5+Math.floor(i/cols)*rad*2.5;spots.push({x,y,rad,ch});g.fillStyle=CARDC;g.beginPath();g.arc(x,y,rad,0,7);g.fill();g.strokeStyle=ch>0?PLUS:MINUS;g.lineWidth=2;g.stroke();
 g.fillStyle=ch>0?PLUS:MINUS;g.font=f(17);g.textAlign='center';g.textBaseline='middle';g.fillText(ch>0?'+':'−',x,y+1)};
for(let i=0;i<P;i++)put(i,0,1);for(let i=0;i<e;i++)put(i,1,-1);
const net=P-e;g.fillStyle=TXT;g.font=f(15);g.textBaseline='bottom';g.fillText('charge '+sgn(net),r.x+r.w/2,r.y+r.h-6);return spots}
const twin=()=>{const w=(A.W-36)/2,h=A.H*.5;return[{x:12,y:A.H*.2,w,h},{x:24+w,y:A.H*.2,w,h}]};
function total(a,b){para(`total charge: ${sgn(P-a)} and ${sgn(P-b)} make ${sgn(2*P-a-b)}`,A.H*.76,14)}
/* ---- step 1: rub ---- */
const bal=()=>{const T=twin()[0],d=Q.r.drag;return d?{...T,x:d.x-T.w/2,y:d.y-T.h/2}:{...T}};
function drawRub(){const s=Q.r;ground();head(s.moved>=3?'3 electrons moved':`Rub: ${s.moved} of 3 electrons moved`,s.moved>=3);
body(twin()[1],'hair',P-s.moved);body(bal(),'balloon',P+s.moved,{rim:s.drag?GRAB:null});total(P+s.moved,P-s.moved);
para('Drag the balloon left and right over the hair.',A.H*.86,13)}
function rubOnce(){const s=Q.r;if(s.moved>=3)return tell('3 electrons have moved. That is all this lab needs.');s.moved++;A.sound.tick();
tell(`One electron hopped from the hair to the balloon. Balloon ${sgn(-s.moved)}, hair ${sgn(s.moved)}, total 0.`)}
/* ---- step 2: only electrons move ---- */
function drawMove(){const s=Q.m;ground();if(s.n>=2){head('Both made',1);para('Only electrons moved. The protons never left their atoms, and the total stayed 0.',A.H*.4,16);return}
const B=BUILD[s.n],[L,R]=twin();head(`Make the ${B.l} ${sgn(B.t)} and the ${B.r} ${sgn(-B.t)}`);
s.spots=[body(L,B.l,s.e[0],{rim:s.miss===0?ERR:null}),body(R,B.r,s.e[1],{rim:s.miss===1?ERR:null})];total(s.e[0],s.e[1]);
const d=Q.m.drag;if(d){const g=A.ctx;g.fillStyle=CARDC;g.beginPath();g.arc(d.x,d.y,z(13),0,7);g.fill();g.strokeStyle=d.ch>0?PLUS:MINUS;g.lineWidth=3;g.stroke();g.fillStyle=d.ch>0?PLUS:MINUS;g.font=f(16);g.textAlign='center';g.textBaseline='middle';g.fillText(d.ch>0?'+':'−',d.x,d.y+1)}
para('Drag a charge from one side to the other.',A.H*.86,13)}
function shift(from,ch){const s=Q.m;if(s.n>=2)return;const B=BUILD[s.n],nm=[B.l,B.r];
if(ch>0){s.miss=from;A.sound.miss();return tell(`A proton cannot move. Protons are held in the nucleus of each atom. To make the ${nm[1-from]} more positive, move electrons away from it.`)}
if(s.e[from]<=0)return tell('No electrons left on that side.');s.e[from]--;s.e[1-from]++;s.miss=null;A.sound.pop();
const net=P-s.e[0];if(net===B.t){s.n++;const msg=`Done: ${B.l} ${sgn(B.t)}, ${B.r} ${sgn(-B.t)}, total 0.`;s.e=[P,P];return tell(msg+(s.n>=2?' Both made.':''))}
tell(`An electron moved to the ${nm[1-from]}. ${B.l} ${sgn(net)}, ${B.r} ${sgn(-net)}.`+(Math.sign(net)!==Math.sign(B.t)&&net!==0?` That is the wrong sign: move electrons the other way.`:''))}
/* ---- step 3: equal and opposite ---- */
const eOpts=n=>{const k=EQ[n][2],all=[-k,k,0],r=n%3;return all.slice(r).concat(all.slice(0,r))};
const eKeys=()=>{const w=Math.min(z(100),(A.W-40)/3),h=z(56);return[0,1,2].map(i=>({x:A.W/2-(w*1.5+12)+i*(w+12),y:A.H*.72,w,h,i}))};
function drawEq(){const s=Q.e;ground();if(s.n>=3){head('All 3 done',1);EQ.forEach((q,i)=>para(`${q[0]} ${sgn(-q[2])}, ${q[1]} ${sgn(q[2])}`,A.H*(.3+i*.12),17));return}
const [a,b,k]=EQ[s.n];head(`${s.n+1} of 3: what charge is on the ${b}?`);
para(k>0?`The ${a} gained ${k} electrons from the ${b}. It is now ${sgn(-k)}.`:`The ${a} lost ${-k} electrons to the ${b}. It is now ${sgn(-k)}.`,A.H*.2,17);
const [L,R]=twin().map(r=>({...r,y:A.H*.36,h:A.H*.28}));const g=A.ctx;[[L,a,sgn(-k)],[R,b,'?']].forEach(([r,nm,t])=>{g.fillStyle=FILL[nm.split(' ')[0]]||'#f1f5f9';A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=GREY;g.lineWidth=2;g.stroke();g.fillStyle=TXT;g.font=f(15);g.textAlign='center';g.textBaseline='middle';g.fillText(nm,r.x+r.w/2,r.y+r.h*.3,r.w-6);g.font=f(26);g.fillText(t,r.x+r.w/2,r.y+r.h*.66)});
eOpts(s.n).forEach((v,i)=>{const r=eKeys()[i];g.fillStyle=CARDC;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=s.miss===v?4:2;g.strokeStyle=s.miss===v?ERR:GREY;g.stroke();g.fillStyle=TXT;g.font=f(24);g.textAlign='center';g.textBaseline='middle';g.fillText(sgn(v),r.x+r.w/2,r.y+r.h/2+1)})}
function answerEq(v){const s=Q.e;if(s.n>=3)return;const [a,b,k]=EQ[s.n];
if(v!==k){s.miss=v;A.sound.miss();return tell(v===0?`The ${b} is not neutral now: it ${k>0?'lost':'gained'} the ${Math.abs(k)} electrons the ${a} ${k>0?'gained':'lost'}.`:`Both cannot have the same sign. The electrons left one and joined the other, so the charges are equal and opposite: ${b} ${sgn(k)}.`)}
s.n++;s.miss=null;A.sound.pop();tell(`${b} ${sgn(k)}. ${sgn(-k)} and ${sgn(k)} make 0, so charge is conserved.`+(s.n>=3?' All 3 done.':''))}
/* ---- step 4: which way did the electrons go? ---- */
const wKeys=()=>{const w=Math.min(z(160),(A.W-36)/2),h=z(58);return[0,1].map(j=>({x:A.W/2+(j?8:-w-8),y:A.H*.7,w,h,j}))};
function drawWay(){const s=Q.w,g=A.ctx;ground();if(s.n>=4){head('All 4 worked out',1);para('A negative object gained electrons. A positive object lost electrons. Positive charge never moved.',A.H*.4,16);return}
const [clue,l,r]=WAY[s.n];head(`${s.n+1} of 4: which way did the electrons go?`);para(clue,A.H*.19,16);
const [L,R]=twin().map(q=>({...q,y:A.H*.38,h:A.H*.22}));[[L,l],[R,r]].forEach(([q,nm])=>{g.fillStyle=FILL[nm]||'#f1f5f9';A.paint.rrect(q.x,q.y,q.w,q.h,12);g.fill();g.strokeStyle=GREY;g.lineWidth=2;g.stroke();g.fillStyle=TXT;g.font=f(18);g.textAlign='center';g.textBaseline='middle';g.fillText(nm,q.x+q.w/2,q.y+q.h/2,q.w-6)});
wKeys().forEach(q=>{g.fillStyle=CARDC;A.paint.rrect(q.x,q.y,q.w,q.h,12);g.fill();g.lineWidth=s.miss===q.j?4:2;g.strokeStyle=s.miss===q.j?ERR:MINUS;g.stroke();g.fillStyle=MINUS;g.font=f(16);g.textAlign='center';g.textBaseline='middle';g.fillText(q.j?`e− → to the ${r}`:`e− ← to the ${l}`,q.x+q.w/2,q.y+q.h/2+1,q.w-8)})}
function pickWay(j){const s=Q.w;if(s.n>=4)return;const [clue,l,r,dir]=WAY[s.n],to=dir?r:l,fromN=dir?l:r;
if(j!==dir){s.miss=j;A.sound.miss();return tell(`Read the clue again: the ${to} ended up negative, so it gained the electrons, and the ${fromN} is positive because it lost them. Positive charge never moves.`)}
s.n++;s.miss=null;A.sound.pop();tell(`Electrons went from the ${fromN} to the ${to}. ${to}: negative. ${fromN}: positive.`+(s.n>=4?' All 4 done.':''))}
/* ---- step 5: attract or repel ---- */
function drawForce(){const s=Q.f,g=A.ctx;ground();if(s.n>=4){head('All 4 pairs done',1);para('Like charges repel. Opposite charges attract.',A.H*.42,18);return}
const [a,b,qa,qb]=PAIR[s.n];head(`Pair ${s.n+1} of 4: attract or repel?`);const gap=s.gap,w=Math.min(z(120),A.W*.32),h=z(110),y=A.H*.32;
[[A.W/2-gap/2-w,a,qa],[A.W/2+gap/2,b,qb]].forEach(([x,nm,q])=>{g.fillStyle=FILL[nm]||'#f1f5f9';A.paint.rrect(x,y,w,h,14);g.fill();g.strokeStyle=GREY;g.lineWidth=2;g.stroke();g.fillStyle=TXT;g.font=f(15);g.textAlign='center';g.textBaseline='middle';g.fillText(nm,x+w/2,y+z(20),w-6);g.fillStyle=q>0?PLUS:MINUS;g.font=f(34);g.fillText(q>0?'+':'−',x+w/2,y+h*.62)});
para('Tap Attract or Repel below.',A.H*.78,14)}
function judgeForce(att){const s=Q.f;if(s.n>=4||s.busy)return;const [a,b,qa,qb,isAtt]=PAIR[s.n];
if(att!==!!isAtt){A.sound.miss();return tell(isAtt?`${qa>0?'+':'−'} and ${qb>0?'+':'−'} are opposite charges, so they attract.`:`Both are ${qa>0?'positive':'negative'}. Like charges repel, they push apart.`)}
s.busy=1;A.sound.pop();tell(isAtt?`Opposite charges: they pull together.`:`Like charges: they push apart.`);
A.tween(s,{gap:isAtt?z(8):Math.min(A.W*.3,z(150))},700,'io',()=>{s.n++;s.gap=z(60);s.busy=0;tell(s.n>=4?'All 4 pairs done.':`Next pair.`)})}
function draw(){const k=phase();if(k==='test'){ground();head('Challenge',1);para('Only electrons move. Equal and opposite charges. Like repel, unlike attract.',A.H*.45,15);return}
({rub:drawRub,move:drawMove,equal:drawEq,way:drawWay,force:drawForce})[k]();A.fx.draw(A.ctx)}
function down(p){const k=phase();
if(k==='rub'){if(inside(p,bal())){Q.r.drag={x:p.x,y:p.y,run:0,lx:p.x};return true}return false}
if(k==='move'&&Q.m.n<2&&Q.m.spots){for(let side=0;side<2;side++){const sp=Q.m.spots[side].find(o=>Math.hypot(p.x-o.x,p.y-o.y)<o.rad*1.5);if(sp){Q.m.drag={x:p.x,y:p.y,side,ch:sp.ch};A.redraw();return true}}return false}
if(k==='equal'){const r=eKeys().find(q=>inside(p,q));if(r)answerEq(eOpts(Q.e.n)[r.i]);return false}
if(k==='way'){const r=wKeys().find(q=>inside(p,q));if(r)pickWay(r.j);return false}return false}
function move(p){const k=phase();if(k==='rub'&&Q.r.drag){const d=Q.r.drag,H=twin()[1];d.run+=Math.abs(p.x-d.lx);d.lx=p.x;d.x=p.x;d.y=p.y;
 if(d.run>z(70)&&inside(p,{x:H.x-20,y:H.y-20,w:H.w+40,h:H.h+40})){d.run=0;rubOnce()}A.redraw();return}
if(Q.m.drag){Q.m.drag.x=p.x;Q.m.drag.y=p.y;A.redraw()}}
function up(p){const k=phase();if(k==='rub'){Q.r.drag=null;A.redraw();return}
const d=Q.m.drag;if(!d)return;Q.m.drag=null;const tgt=twin()[1-d.side];if(inside(p,tgt))shift(d.side,d.ch);else A.redraw()}
function fresh(){epoch++;for(const x in Q)delete Q[x];Object.assign(Q,{r:{moved:0,drag:null},m:{n:0,e:[P,P]},e:{n:0},w:{n:0},f:{n:0,gap:z(60)},tick:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();btns();Q.tick()}
function open(i,desc,met,msg){fresh();tell(desc);Q.tick=()=>{if(A.step===i&&met()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function demo(i,acts,ms){steps[i].go();const me=epoch;acts.forEach((fn,j)=>setTimeout(()=>{if(me===epoch)fn()},ms*(j+1)))}
function btns(){if(!ctl)return;ctl.innerHTML='';const k=phase(),B=(t,fn,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=fn};
if(k==='rub')B('Rub once',rubOnce,'Rub the balloon on the hair once');
if(k==='move'&&Q.m.n<2){const b=BUILD[Q.m.n];B(`electron → ${b.r}`,()=>shift(0,-1),`Move an electron from the ${b.l} to the ${b.r}`);B(`electron → ${b.l}`,()=>shift(1,-1),`Move an electron from the ${b.r} to the ${b.l}`);B(`proton → ${b.r}`,()=>shift(0,1),`Try to move a proton from the ${b.l} to the ${b.r}`)}
if(k==='equal'&&Q.e.n<3)eOpts(Q.e.n).forEach(v=>B(sgn(v),()=>answerEq(v),`The ${EQ[Q.e.n][1]} is ${sgn(v)}`));
if(k==='way'&&Q.w.n<4){const [,l,r]=WAY[Q.w.n];B(`to the ${l}`,()=>pickWay(0),`Electrons went to the ${l}`);B(`to the ${r}`,()=>pickWay(1),`Electrons went to the ${r}`)}
if(k==='force'&&Q.f.n<4){B('Attract',()=>judgeForce(true));B('Repel',()=>judgeForce(false))}}
const steps=[
{h:'Rub and count',p:'Everything is made of atoms with positive protons and negative electrons. Rubbing moves some electrons from one material to the other.',
predict:{q:'When you rub a balloon on hair, what moves?',opts:['positive charges','electrons'],ans:1},task:'Move 3 electrons',
show:()=>demo(0,[0,1,2].map(()=>rubOnce),600),
go:()=>open(0,'Balloon and hair, each drawn with 5 protons and 5 electrons. Both have charge 0.',()=>Q.r.moved>=3,'Balloon −3, hair +3: equal and opposite, total 0.')},
{h:'Only electrons move',p:'Protons are held in the nucleus of each atom. Electrons on the surface can be rubbed off. Build each charge by moving charges.',
predict:{q:'To make a rod positive, you ...',opts:['add protons to it','take electrons off it'],ans:1},task:'Make both charges',
show:()=>demo(1,[()=>shift(1,-1),()=>shift(1,-1),()=>shift(0,-1),()=>shift(0,-1),()=>shift(0,-1)],700),
go:()=>open(1,'Rod and cloth, 5 protons and 5 electrons each. Make the rod −2.',()=>Q.m.n>=2,'Positive means missing electrons, not extra protons.')},
{h:'Equal and opposite',p:'Every electron one object gains, the other object loses. Work out the charge left on the partner.',
predict:{q:'A balloon gains 3 electrons from hair. The hair is now ...',opts:['still 0','+3'],ans:1},task:'Answer all 3',
show:()=>demo(2,EQ.map(q=>()=>answerEq(q[2])),800),
go:()=>open(2,'The balloon gained 3 electrons from the hair. Choices for the hair: −3, +3, 0.',()=>Q.e.n>=3,'The two charges always add up to 0.')},
{h:'Which way?',p:'You are told the charge one material ends with. Use it to work out which way the electrons went.',task:'Work out all 4',
show:()=>demo(3,WAY.map(q=>()=>pickWay(q[3])),800),
go:()=>open(3,'A polythene rod rubbed with wool ends up negative. Which way did electrons go?',()=>Q.w.n>=4,'Negative gained electrons; positive lost them.')},
{h:'Push or pull',p:'Charged objects push or pull each other without touching. Decide for each pair.',
predict:{q:'Two balloons both rubbed on hair will ...',opts:['pull together','push apart'],ans:1},task:'Judge all 4 pairs',
show:()=>demo(4,PAIR.map(q=>()=>judgeForce(!!q[4])),1100),
go:()=>open(4,'Two negative balloons. Attract or repel?',()=>Q.f.n>=4,'Like charges repel; opposite charges attract.')},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Q.tick()});
const QS=[
{q:'A polythene rod becomes negative when rubbed with a cloth. Why?',a:'It gained electrons from the cloth',o:[['It lost protons to the cloth','proton'],['It made new electrons','made']]},
{q:'An acetate rod becomes +5 after rubbing. What charge is on the cloth?',a:'−5',o:[['+5','same'],['0','zero']]},
{q:'A rod becomes positive. What happened?',a:'It lost electrons',o:[['It gained protons','gainp'],['It gained electrons','gaine']]},
{q:'A negative balloon is held near a negative balloon. They ...',a:'repel',o:[['attract','likeatt'],['do nothing','none']]},
{q:'Before rubbing, rod and cloth have no charge. After, the rod is −2. The total charge is ...',a:'0',o:[['−2','lost'],['−4','double']]},
{q:'Why can rubbing move electrons but not protons?',a:'Protons are held in the nucleus',o:[['Protons are too small','small'],['Electrons are positive','sign']]}];
function oops(t){let m='Only electrons move; the two charges are equal and opposite.';
if(t==='proton')m='Protons stay in the nucleus. Negative means extra electrons gained.';
if(t==='made')m='Charge is not made by rubbing. Electrons move from one object to the other.';
if(t==='same')m='The cloth gained the 5 electrons the rod lost, so it is −5, the opposite sign.';
if(t==='zero')m='The cloth is not neutral now. It holds the 5 electrons the rod lost: −5.';
if(t==='gainp')m='Protons do not move. Positive means the rod lost electrons.';
if(t==='gaine')m='Gaining electrons makes an object negative, not positive.';
if(t==='likeatt')m='Like charges repel. Two negatives push apart.';
if(t==='none')m='Charged objects push or pull without touching. Two negatives repel.';
if(t==='lost')m='The cloth is +2, so −2 and +2 make 0. Charge is conserved.';
if(t==='double')m='Charge is not doubled. −2 on the rod and +2 on the cloth make 0.';
if(t==='small')m='Size is not the reason. Protons are held in the nucleus; outer electrons can be rubbed off.';
if(t==='sign')m='Electrons are negative. Protons are positive and stay in the nucleus.';
return m}
function ask(){qi++;const X=QS[qi%QS.length],all=[[X.a,'right'],...X.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
qz.innerHTML=`<p><b>${X.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
const bx=qz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},bx,v).onclick=()=>verdict(t,X.a)});c.say('Challenge: '+X.q);A.redraw()}
function verdict(t,a){qz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qz.querySelector('.fl-fb'),ok=t==='right';if(ok)A.win();else A.sound.miss();
fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+oops(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':oops(t))}
FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:B=>{qz.hidden=B.step!==5;ctl.hidden=B.step===5;btns()},
init:B=>{A=B;const bx=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Charge buttons'},bx);qz=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});btns()}}).start()})})();
