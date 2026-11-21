/* Flagship – Tree diagrams (ages 12–14). The learner builds and uses trees for two-stage events: grow a coin-then-
   spinner tree and count 2 × 3 outcomes; drag fractions onto the six branches for picking twice from 3 red and 2 blue
   with the counter put back; multiply along the red-red path and test it against 200 seeded picks; add the two paths
   that give one of each colour; then eat the first sweet (no putting back) and relabel the second picks out of 4. Every
   drag or tap has a labelled button twin. Data and the seeded simulation are in learn/tree_art.js. */
(()=>{const {simulate,COIN,SPIN,COL,WITH,WITHOUT,TILES1,TILES2,LEAF,LEAFP,DESC,DONE,QS}=TREE;
VIS.reg('flagtree',c=>{let A,row,quiz,ask=-1,epoch=0;
const C={ink:'#1f2937',good:'#047857',bad:'#b91c1c',line:'#94a3b8',hold:'#1d4ed8',paper:'#ffffff',lemon:'#fef9c3',mint:'#dcfce7',ice:'#e0f2fe',lilac:'#ede9fe',gold:'#fde68a',path:'#7c3aed'};
const G={};const where=()=>['grow','label','times','paths','noput','quiz'][A.step];
const sz=n=>Math.round(A.narrow?n:n*1.15);
const R=(x,y,w,h)=>({x,y,w,h}),hit=(p,r,pad)=>{pad=pad||0;return!!r&&p.x>=r.x-pad&&p.x<=r.x+r.w+pad&&p.y>=r.y-pad&&p.y<=r.y+r.h+pad},near=(p,q,d)=>Math.hypot(p.x-q.x,p.y-q.y)<=d;
function say(s,x,y,n,o){o=o||{};const g=A.ctx;g.font=`${o.b||800} ${sz(n)}px system-ui,sans-serif`;g.fillStyle=o.c||C.ink;g.textAlign=o.al||'center';g.textBaseline='middle';
 const out=[];let cur='';String(s).split(' ').forEach(w=>{const t=cur?cur+' '+w:w;if(o.w&&cur&&g.measureText(t).width>o.w){out.push(cur);cur=w}else cur=t});out.push(cur);
 const step=sz(n)*1.2;out.forEach((t,i)=>g.fillText(t,x,y+(i-(out.length-1)/2)*step))}
function panel(r,bg,tone,dash){const g=A.ctx;g.fillStyle=tone==='good'?'#d1fae5':tone==='bad'?'#fee2e2':bg||C.paper;A.paint.rrect(r.x,r.y,r.w,r.h,Math.min(10,r.h/3));g.fill();
 g.lineWidth=tone?3.5:2;g.strokeStyle={good:C.good,bad:C.bad,hold:C.hold}[tone]||C.line;if(dash)g.setLineDash([5,4]);g.stroke();g.setLineDash([])}
function backdrop(t){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,t,A.col.dark?.14:.45);g.fillRect(0,0,A.W,A.H)}
function count(t){say(t,A.W/2,A.H*.955,12,{c:A.col.tx,b:700})}
/* ---------- tree geometry: root, first-pick nodes a[i], second-pick nodes b[i][j], branch slots ---------- */
const TR=()=>R(A.W*.03,A.H*.04,A.W*.6,A.H*.84),SIDE=()=>{const t=TR(),x=t.x+t.w+A.W*.02;return R(x,t.y,A.W*.97-x,t.h)};
function geo(n1,n2){const t=TR(),root={x:t.x+t.w*.07,y:t.y+t.h/2},a=[],b=[];
 for(let i=0;i<n1;i++){a.push({x:t.x+t.w*.45,y:t.y+t.h*(i+.5)/n1});b.push([]);for(let j=0;j<n2;j++)b[i].push({x:t.x+t.w*.8,y:t.y+t.h*(i*n2+j+.5)/(n1*n2)})}return{root,a,b}}
const nodeR=()=>Math.min(16,TR().h/12),slotW=()=>Math.min(56,TR().w*.25),slotH=()=>sz(22);
function slotR(s){const q=geo(2,2),from=s<2?q.root:q.a[s<4?0:1],to=s<2?q.a[s]:q.b[s<4?0:1][s%2],t=s<2?.5:.56,x=from.x+(to.x-from.x)*t,y=from.y+(to.y-from.y)*t;return R(x-slotW()/2,y-slotH()/2,slotW(),slotH())}
const SLOTN=['first pick red','first pick blue','red then red','red then blue','blue then red','blue then blue'];
const leafOf=k=>geo(2,2).b[k>>1][k&1];
function edge(p,q,col,w){const g=A.ctx;g.strokeStyle=col||'#475569';g.lineWidth=w||2.5;g.beginPath();g.moveTo(p.x,p.y);g.lineTo(q.x,q.y);g.stroke()}
function node(p,t,fill,ring){const g=A.ctx,r=nodeR();g.fillStyle=fill||C.paper;g.beginPath();g.arc(p.x,p.y,r,0,7);g.fill();g.lineWidth=ring?4:2;g.strokeStyle=ring||C.ink;g.stroke();
 say(t,p.x,p.y+1,11,{c:fill&&fill!==C.paper&&fill!==C.gold?'#ffffff':C.ink})}
function slot(s,val,tone){const r=slotR(s),held=false;panel(r,val?C.paper:C.lemon,tone,!val);say(val||'?',r.x+r.w/2,r.y+r.h/2,11,{c:val?C.ink:'#92400e'});void held}
function treeBox(bg){const t=TR();panel(t,bg||C.paper,'')}
/* the 2-pick colour tree; vals = branch fractions (null = empty slot); hi = path index to highlight; ends = labels at the leaves */
function colourTree(vals,hi,ends,picked){const q=geo(2,2);treeBox();
 [0,1].forEach(i=>{const on=hi!=null&&(hi>>1)===i;edge(q.root,q.a[i],on?C.path:null,on?6:2.5);[0,1].forEach(j=>{const k=i*2+j,o2=hi===k||(picked&&picked.includes(k));edge(q.a[i],q.b[i][j],o2?C.path:null,o2?6:2.5)})});
 node(q.root,'▶',C.gold);[0,1].forEach(i=>{node(q.a[i],COL[i].k,COL[i].c);[0,1].forEach(j=>{const k=i*2+j,P=q.b[i][j];node(P,COL[j].k,COL[j].c,picked&&picked.includes(k)?C.good:G.bad===k+10?C.bad:null);
  if(ends)say(ends[k],P.x+nodeR()+3,P.y,10,{al:'left',b:800,c:C.ink})})});
 for(let s=0;s<6;s++)slot(s,vals[s],G.bad===s?'bad':G.okSlot===s?'good':'')}
/* ---------- 1. grow the coin-then-spinner tree ---------- */
function drawGrow(){backdrop(C.ice);const q=geo(2,3),t=TR(),sd=SIDE();treeBox();
 if(G.g[0])[0,1].forEach(i=>{edge(q.root,q.a[i]);if(G.g[i+1])[0,1,2].forEach(j=>edge(q.a[i],q.b[i][j]))});
 node(q.root,'▶',C.gold,!G.g[0]?C.hold:null);
 if(G.g[0])[0,1].forEach(i=>{node(q.a[i],COIN[i],C.gold,!G.g[i+1]?C.hold:null);if(G.g[i+1])[0,1,2].forEach(j=>{const P=q.b[i][j];node(P,SPIN[j].k,SPIN[j].c);say(`${COIN[i]}, ${SPIN[j].k}`,P.x+nodeR()+3,P.y,10,{al:'left'})})});
 say(G.g[0]?'coin':'tap ▶',q.root.x+nodeR()*.2,t.y+t.h*.08,10,{al:'left',b:700});void t;
 panel(sd,C.paper,'');const list=[];[0,1].forEach(i=>{if(G.g[i+1])[0,1,2].forEach(j=>list.push(`${COIN[i]}, ${SPIN[j].n}`))});
 say('Outcomes',sd.x+sd.w/2,sd.y+sz(14),12);list.forEach((o,k)=>say(o,sd.x+sd.w/2,sd.y+sz(34)+k*sz(18),10,{b:700}));
 if(list.length===6)say('2 × 3 = 6',sd.x+sd.w/2,sd.y+sd.h*.85,13,{c:C.good});count(`Outcomes found: ${list.length}`)}
function grow(k){if(k===0){if(G.g[0])return;G.g[0]=true;A.sound.step();return talk('The coin gives 2 branches: H for heads and T for tails. Now tap H.')}
 if(!G.g[0]){A.sound.miss();return talk(oops('order'))}if(G.g[k])return;G.g[k]=true;A.sound.pop();const n=[0,1].filter(i=>G.g[i+1]).length*3;
 talk(`After ${COIN[k-1]}, the spinner gives 3 branches: red, green, blue. ${n} outcomes so far.`+(n<6?' Now the other coin side.':' Every outcome is one path from ▶ to the end.'))}
/* ---------- 2. label the branches (put back) ---------- */
function bag(sd,y,n,eaten,label){const g=A.ctx,w=sd.w,r=Math.min(w/12,12);panel(R(sd.x,y,w,sd.h*.27),C.paper,'');
 ['R','R','R','B','B'].forEach((k,i)=>{const x=sd.x+w*(.15+(i%3)*.35),yy=y+sd.h*(i<3?.07:.15);g.fillStyle=k==='R'?'#dc2626':'#2563eb';g.beginPath();g.arc(x,yy,r,0,7);g.fill();g.strokeStyle=C.ink;g.lineWidth=1.5;g.stroke();
  say(k,x,yy+1,9,{c:'#ffffff'});if(eaten===i){g.strokeStyle=C.ink;g.lineWidth=3;g.beginPath();g.moveTo(x-r,yy-r);g.lineTo(x+r,yy+r);g.stroke()}});
 say(label,sd.x+w/2,y+sd.h*.235,9,{b:700,w:w-6});void n}
const tileR=(i,n)=>{const sd=SIDE(),top=.31,h=Math.min(.13,(.66)/n-.02);return R(sd.x,sd.y+sd.h*(top+i*(h+.02)),sd.w,sd.h*h)};
function tiles(list){list.forEach((t,i)=>{let r=tileR(i,list.length);const held=G.drag&&G.drag.t===t;if(held)r=R(G.drag.x-r.w/2,G.drag.y-r.h/2,r.w,r.h);panel(r,C.lemon,held||G.sel===t?'hold':'');say(t,r.x+r.w/2,r.y+r.h/2,13)})}
function drawLabel(){backdrop(C.mint);colourTree(G.f,null,null);const sd=SIDE();bag(sd,sd.y,5,-1,'3 red, 2 blue. Put it back.');tiles(TILES1);
 count(`Branches labelled: ${G.f.filter(Boolean).length} of 6`)}
function fill(s,t,key){const want=(key||WITH)[s];if(G.f[s])return;if(t!==want){G.bad=s;G.okSlot=-1;A.sound.miss();
  return talk(t==='3/2'?oops('ratio'):/\/5$/.test(t)&&key===WITHOUT?oops('replace',s):key===WITHOUT?oops('left',s,t):oops('swap',s,t))}
 G.f[s]=t;G.bad=-1;G.okSlot=s;G.sel=null;A.sound.pop();const left=(key?[2,3,4,5]:[0,1,2,3,4,5]).filter(k=>!G.f[k]).length;
 talk(`${t} on ${SLOTN[s]}.`+(left?` ${left} to go.`:key?' Every second pick is out of 4, and each pair still adds to 1.':' Each pair from one point adds to 1: 3/5 + 2/5 = 1.'))}
/* ---------- 3. multiply along a path ---------- */
const boxR=i=>{const sd=SIDE();return R(sd.x,sd.y+sd.h*(.33+i*.2),sd.w,sd.h*.17)};
function drawTimes(){backdrop(C.lilac);colourTree(WITH,G.leaf===0?0:null,['R,R','R,B','B,R','B,B']);const sd=SIDE();panel(R(sd.x,sd.y,sd.w,sd.h*.29),C.paper,'');
 say('P(red, red)',sd.x+sd.w/2,sd.y+sd.h*.06,11);say(G.op?'= 3/5 × 3/5':'= ?',sd.x+sd.w/2,sd.y+sd.h*.14,11,{b:700});if(G.op)say('= 9/25 = 0.36',sd.x+sd.w/2,sd.y+sd.h*.22,11,{c:C.good});
 if(G.leaf!==0)say('Tap the end of the red, red path',sd.x+sd.w/2,sd.y+sd.h*.5,10,{c:A.col.tx,w:sd.w,b:700});
 else if(!G.op)['Add 3/5 + 3/5','Multiply 3/5 × 3/5'].forEach((t,i)=>{const r=boxR(i);panel(r,C.paper,G.bad===20+i?'bad':'');say((G.bad===20+i?'✗ ':'')+t,r.x+r.w/2,r.y+r.h/2,10,{w:r.w-6})});
 else{const r=boxR(1);panel(r,C.lemon,G.sim?'good':'');say(G.sim?`R,R: ${G.sim.rr} of 200 = ${Math.round(G.sim.rr/2)}%`:'Pick 200 pairs',r.x+r.w/2,r.y+r.h/2,10,{w:r.w-6})}
 count(G.sim?'✓ 9/25 = 36%, and the picks agree':'Follow the path, then multiply')}
function leaf(k){if(G.leaf===0)return;if(k!==0){G.bad=10+k;A.sound.miss();return talk(oops('wrongleaf',k))}G.leaf=0;G.bad=-1;A.sound.pop();talk('Red then red: the path goes along 3/5, then 3/5. Add them, or multiply them?')}
function op(i){if(G.leaf!==0||G.op)return;if(i===0){G.bad=20;A.sound.miss();return talk(oops('add'))}G.op=true;G.bad=-1;A.sound.pop();
 talk('Multiply: red then red happens 3/5 of the time, then 3/5 of those times. 3/5 × 3/5 = 9/25 = 0.36. Now test it: pick 200 pairs.')}
function sim(){if(!G.op||G.sim)return;G.sim=simulate(200,.6,7);A.sound.step();talk(`In 200 pairs, red then red came up ${G.sim.rr} times, about ${Math.round(G.sim.rr/2)}%. The tree said 36%.`)}
/* ---------- 4. add the paths that fit ---------- */
function drawPaths(){backdrop(C.ice);colourTree(WITH,null,LEAFP,G.pk);const sd=SIDE();panel(sd,C.paper,'');say('P(one red and one blue)',sd.x+sd.w/2,sd.y+sz(18),11,{w:sd.w-8});
 G.pk.forEach((k,n)=>say(`${LEAF[k]}: ${LEAFP[k]}`,sd.x+sd.w/2,sd.y+sd.h*.25+n*sz(20),10,{b:700,w:sd.w-6}));
 if(G.pk.length===2){say('6/25 + 6/25',sd.x+sd.w/2,sd.y+sd.h*.5,11);say('= 12/25',sd.x+sd.w/2,sd.y+sd.h*.58,12,{c:C.good});say('All 4 paths: 25/25 = 1',sd.x+sd.w/2,sd.y+sd.h*.8,9,{b:700,w:sd.w-6})}
 count(`Paths picked: ${G.pk.length} of 2`)}
function pick(k){if(G.pk.includes(k)||G.pk.length>=2)return;if(k===0||k===3){G.bad=10+k;A.sound.miss();return talk(oops('notmix',k))}G.pk.push(k);G.bad=-1;A.sound.pop();
 talk(G.pk.length<2?`${LEAF[k]} has one of each: ${LEAFP[k]}. Is there another path with one of each?`:'Both orders count: 6/25 + 6/25 = 12/25.')}
/* ---------- 5. no putting back ---------- */
function drawNoput(){backdrop(C.lemon);colourTree(G.f,null,null);const sd=SIDE(),last=[2,3,4,5].find(s=>!G.f[s]);
 bag(sd,sd.y,5,last==null?-1:last<4?0:3,last==null?'3 red, 2 blue. Eat the first.':last<4?'Ate a red: 2 red, 2 blue left':'Ate a blue: 3 red, 1 blue left');tiles(TILES2);
 if(last==null)say('P(R,R) = 3/5 × 2/4 = 3/10',TR().x+TR().w/2,TR().y+TR().h+sz(10),10,{c:A.col.tx});
 count(last==null?'✓ Second picks are out of 4':`Second picks labelled: ${[2,3,4,5].filter(s=>G.f[s]).length} of 4`)}
/* ---------- feedback that names the slip ---------- */
function oops(t,a,b){let m='Check how many there are of each, and how many altogether, then try again.';
 if(t==='order')m='Start at ▶: flip the coin first, then spin after each coin side.';
 if(t==='count')m='Do not add the outcomes. Each of the first outcomes splits into all of the second ones, so multiply: a coin and a dice give 2 × 6 = 12.';
 if(t==='ratio')m='3/2 compares red with blue. A probability compares red with all 5 counters, so red is 3/5.';
 if(t==='swap')m=`That branch is for ${COL[a%2].n}. ${a%2?'2':'3'} of the 5 counters are ${COL[a%2].n}, so it is ${a%2?'2/5':'3/5'}, not ${b}.`;
 if(t==='add')m='Adding along a path can give a number bigger than 1, which is impossible. Multiply along a path: 4/5 × 4/5 = 16/25, and 1/2 × 1/6 = 1/12.';
 if(t==='wrongleaf')m=`That path is ${LEAF[a]}. Follow the red branch, then red again.`;
 if(t==='notmix')m=`${LEAF[a]} has no ${a===0?'blue':'red'}. One of each means red then blue, or blue then red.`;
 if(t==='onepath')m='Only one path counted. Red then blue and blue then red both give one of each: 6/25 + 6/25 = 12/25.';
 if(t==='replace')m=`You ate the first sweet, so only 4 are left. The second pick is out of 4, not 5.${a!=null?' After a '+(a<4?'red: 2 red, 2 blue are left.':'blue: 3 red, 1 blue are left.'):''}`;
 if(t==='left')m=`Count what is left. After a ${a<4?'red: 2 red and 2 blue':'blue: 3 red and 1 blue'}, so ${COL[a%2].n} is ${WITHOUT[a]}, not ${b}.`;
 if(t==='sumone')m='The branches from one point add up to 1. No rain = 1 − 0.3 = 0.7.';
 if(t==='guess')m='Two colours does not mean 50:50. Red is more likely than blue here. Use the tree: 6/25 + 6/25 = 12/25.';
 return m}
/* ---------- drawing, pointer and buttons ---------- */
function draw(){const k=where();if(k==='quiz'){backdrop(C.lemon);say('Challenge',A.W/2,A.H*.4,22,{c:A.col.tx});say('Count · label · multiply along · add the paths',A.W/2,A.H*.56,13,{c:A.col.tx,w:A.W-24});return}
 ({grow:drawGrow,label:drawLabel,times:drawTimes,paths:drawPaths,noput:drawNoput})[k]();A.fx.draw(A.ctx)}
const grab=(p,o)=>{G.drag=Object.assign({x:p.x,y:p.y,x0:p.x,y0:p.y},o);A.redraw();return true};
const list=()=>where()==='label'?TILES1:TILES2,slots=()=>where()==='label'?[0,1,2,3,4,5]:[2,3,4,5],key=()=>where()==='label'?undefined:WITHOUT;
const slotAt=p=>slots().find(s=>!G.f[s]&&hit(p,slotR(s),8));
function leafAt(p){for(let k=0;k<4;k++)if(near(p,leafOf(k),nodeR()+12))return k;return-1}
function down(p){const k=where();
 if(k==='grow'){const q=geo(2,3);if(near(p,q.root,nodeR()+12))grow(0);else{const i=[0,1].find(i=>near(p,q.a[i],nodeR()+12));if(i!=null&&G.g[0])grow(i+1)}return false}
 if(k==='label'||k==='noput'){const L=list(),i=L.findIndex((_,i)=>hit(p,tileR(i,L.length)));if(i>=0)return grab(p,{t:L[i]});const s=slotAt(p);if(s!=null&&G.sel)fill(s,G.sel,key());return false}
 if(k==='times'){const f=leafAt(p);if(f>=0)leaf(f);else if(G.leaf===0&&!G.op){const i=[0,1].find(i=>hit(p,boxR(i)));if(i!=null)op(i)}else if(G.op&&hit(p,boxR(1)))sim();return false}
 if(k==='paths'){const f=leafAt(p);if(f>=0)pick(f);return false}return false}
function move(p){if(!G.drag)return;G.drag.x=p.x;G.drag.y=p.y;A.redraw()}
function up(p){const d=G.drag;if(!d)return;G.drag=null;const tap=Math.hypot(p.x-d.x0,p.y-d.y0)<10;
 if(tap){G.sel=d.t;return talk(`${d.t} picked. Tap a branch box.`)}const s=slotAt(p);if(s!=null)return fill(s,d.t,key());A.redraw()}
function talk(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();G.hook()}
function keys(){if(!row)return;row.innerHTML='';const k=where(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},row,t).onclick=f};
 if(k==='grow'){if(!G.g[0])b('Flip the coin',()=>grow(0),'Grow the coin branches H and T');else[1,2].forEach(i=>{if(!G.g[i])b(`Spin after ${COIN[i-1]}`,()=>grow(i),`Grow the spinner branches after ${COIN[i-1]}`)})}
 if(k==='label'||k==='noput'){const s=slots().find(s=>!G.f[s]);if(s!=null)list().forEach(t=>b(`${t} → ${SLOTN[s]}`,()=>fill(s,t,key()),`Put ${t} on the branch ${SLOTN[s]}`))}
 if(k==='times'){if(G.leaf!==0)[0,1,2,3].forEach(f=>b(`Path ${LEAF[f]}`,()=>leaf(f),`Choose the path ${LEAF[f]}`));else if(!G.op){b('Add 3/5 + 3/5',()=>op(0));b('Multiply 3/5 × 3/5',()=>op(1))}else if(!G.sim)b('Pick 200 pairs',sim,'Pick 200 pairs of counters and count red, red')}
 if(k==='paths'&&G.pk.length<2)[0,1,2,3].forEach(f=>{if(!G.pk.includes(f))b(`${LEAF[f]} (${LEAFP[f]})`,()=>pick(f),`Pick the path ${LEAF[f]}, probability ${LEAFP[f]}`)})}
function clear(){epoch++;for(const x in G)delete G[x];Object.assign(G,{g:[false,false,false],f:[null,null,null,null,null,null],bad:-1,okSlot:-1,sel:null,leaf:-1,op:false,sim:null,pk:[],drag:null,hook:()=>{}})}
const met=(i,test)=>()=>{if(A.step===i&&test()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(DONE[i]+A.reveal(i))};
function enter(i,test){clear();if(i===4){G.f[0]='3/5';G.f[1]='2/5'}talk(DESC[i]);G.hook=met(i,test)}
function play(i,acts,ms){steps[i].go();const e0=epoch;acts.forEach((f,j)=>setTimeout(()=>{if(e0===epoch)f()},ms*(j+1)))}
const steps=[
{h:'Every outcome',p:'You flip a coin, then spin a spinner with three equal colours. A tree shows every outcome as a path. Tap ▶, then H and T.',
 predict:{q:'How many outcomes are there for a coin, then a 3-colour spinner?',opts:['5, because 2 + 3','6, because 2 × 3'],ans:1},task:'Grow the tree and list every outcome',
 show:()=>play(0,[()=>grow(0),()=>grow(1),()=>grow(2)],500),go:()=>enter(0,()=>G.g.every(Boolean))},
{h:'Label the branches',p:'A bag holds 3 red and 2 blue counters. Pick one, put it back, then pick again. Drag a fraction onto every branch.',
 predict:{q:'You put the first counter back. Are the second-pick chances the same as the first?',opts:['No, they change','Yes, they stay the same'],ans:1},task:'Label all 6 branches',
 show:()=>play(1,[0,1,2,3,4,5].map(s=>()=>fill(s,WITH[s])),320),go:()=>enter(1,()=>G.f.every(Boolean))},
{h:'Multiply along',p:'To find the chance of red, then red, follow that path from ▶ to its end. Tap the end, then choose how to combine the two branches.',
 predict:{q:'For P(red, then red), do you add or multiply along the branches?',opts:['Add them','Multiply them'],ans:1},task:'Find P(red, red), then test it with 200 picks',
 show:()=>play(2,[()=>leaf(0),()=>op(1),sim],600),go:()=>enter(2,()=>!!G.sim)},
{h:'Add the paths',p:'Each end now shows its chance, found by multiplying. Which paths give one red and one blue? Tap every one.',
 predict:{q:'How many paths give one red and one blue?',opts:['1 path','2 paths'],ans:1},task:'Pick every path with one of each colour',
 show:()=>play(3,[()=>pick(1),()=>pick(2)],600),go:()=>enter(3,()=>G.pk.length>=2)},
{h:'No putting back',p:'Now they are sweets, and you eat the first one. The first picks are done. Drag a fraction onto each second-pick branch.',
 predict:{q:'You eat the first sweet. Are the second-pick chances still 3/5 and 2/5?',opts:['Yes, the same','No, they change'],ans:1},task:'Label the 4 second-pick branches',
 show:()=>play(4,[2,3,4,5].map(s=>()=>fill(s,WITHOUT[s],WITHOUT)),380),go:()=>enter(4,()=>[2,3,4,5].every(s=>G.f[s]))},
{h:'Challenge',p:'',go:()=>{clear();pose()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>G.hook()});
function pose(){ask++;const Q=QS[ask%QS.length],all=[[Q.a,''],...Q.o],r=ask%3,lst=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Pick an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=quiz.querySelector('.fl-pick');lst.forEach(([t,s])=>{c.el('button',{type:'button',class:'lbtn'},g,t).onclick=()=>judge(s,Q)});c.say('Challenge: '+Q.q);A.redraw()}
function judge(s,Q){quiz.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=quiz.querySelector('.fl-fb');
 const why=!s?'':oops(s);
 if(!s)A.win();else A.sound.miss();fb.innerHTML=(s?'✗ '+why:`✓ Yes: ${Q.a}.`)+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=pose;c.say(s?why:'Yes.')}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:X=>{quiz.hidden=X.step!==5;row.hidden=X.step===5;keys()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);row=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Tree diagram lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});keys()}}).start()})})();
