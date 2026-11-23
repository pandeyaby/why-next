/* Flagship – everyday foods from rainforests (ages 5–7; KS1 science 'plants', geography 'hot areas of the world'):
   sort foods by where their plant grows, take a cacao pod to chocolate, match foods to their plants, help a Brazil nut
   tree with forest bees and an agouti, and find rainforest foods in a lunchbox. Data and pictures: rainfood_art.js. */
(()=>{const R=RAINFOOD;
VIS.reg('flagrainfood',c=>{let A,P,ctl,chal,qn=-1,epoch=0;const S={};c.fig.classList.add('young');
const part=()=>['sort','pod','match','nut','box','chal'][A.step];
const isIn=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const GREEN='#15803d',GREY='#475569';
function wash(){const g=A.ctx;g.fillStyle=A.col.dark?'#0f172a':'#f0fdf4';g.fillRect(0,0,A.W,A.H)}
/* ---------- 1. rainforest plant or not ---------- */
let ZONE=[],HAND=null;
function place(z){const s=S.so,F=R.FOODS[s.i];if(!F)return;if(z!==(F.r?0:1)){s.bad=true;A.sound.miss();return say(F.no,true)}
 s.pile[z].push(F.k);s.i++;s.bad=false;A.sound.pop();say(`Yes: ${F.t.toLowerCase()} ${F.r?'comes from a rainforest plant':'is not from a rainforest'}.`+(s.i<8?' Next food.':''))}
function drawSort(){const s=S.so,F=R.FOODS[s.i],t=P.banner(F?`Food ${s.i+1} of 8. Where does it come from?`:R.DONE[0],F?(s.bad?'no':''):'ok',S.note,S.bad);
 const zh=Math.min(A.H*.36,170),zt=A.H-zh-8;ZONE=[{x:8,y:zt,w:A.W/2-12,h:zh},{x:A.W/2+4,y:zt,w:A.W/2-12,h:zh}];const g=A.ctx;
 ZONE.forEach((r,z)=>{g.fillStyle=P.dk()?(z?'#1e293b':'#052e16'):(z?'#f1f5f9':'#dcfce7');A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.strokeStyle=z?GREY:GREEN;g.lineWidth=3;g.stroke();
  g.font=`800 ${P.sz(15)}${P.F}`;g.fillStyle=P.fg();g.textAlign='center';g.textBaseline='top';P.wrap(z?'Not from a rainforest':'From a rainforest plant',r.w-12,g.font).forEach((L,i)=>g.fillText(L,r.x+r.w/2,r.y+8+i*P.sz(17)));
  const n=s.pile[z].length,u=Math.min(r.w/4.4,r.h*.3);s.pile[z].forEach((k,j)=>P.food(k,r.x+u*.7+(j%4)*u*1.05,r.y+r.h-u*.75,u*.9));if(!n){g.font=`600 ${P.sz(12)}${P.F}`;g.fillText('drop here',r.x+r.w/2,r.y+r.h*.6)}});
 if(F){const cw=Math.min(A.W*.42,200),ch=Math.min(zt-t-10,150),d=s.drag;HAND={x:d?d.x-cw/2:(A.W-cw)/2,y:d?d.y-ch/2:t+2,w:cw,h:ch};P.card(HAND,F.t,{n:16,top:1,sel:!!d});P.food(F.k,HAND.x+cw/2,HAND.y+ch*.42,Math.min(ch*.55,cw*.5))}else HAND=null}
/* ---------- 2. from pod to chocolate ---------- */
let CARD=[],PIC=null;
function pick(i){const s=S.od,C=R.STEPS[i];if(s.seq.length>=5||s.seq.includes(i))return;
 if(C.n<0){s.bad=i;A.sound.miss();return say(C.why,true)}if(C.n!==s.seq.length){s.bad=i;A.sound.miss();return say(order(s.seq.length,C.n),true)}
 s.seq.push(i);s.bad=null;A.sound.pop();say(`${C.t}.`+(s.seq.length<5?' What comes next?':' Now it is chocolate!'))}
function order(want,got){const W=R.STEPS.find(x=>x.n===want).t.toLowerCase();return got>want?`Not yet. First ${W}.`:`That step is done already. Next: ${W}.`}
function stage(n,r){const g=A.ctx,cx=r.x+r.w/2,cy=r.y+r.h/2,u=Math.min(r.w,r.h)*.4;
 if(n===0)return P.plant('cacao',r);
 if(n===1||n===2){g.fillStyle='#f59e0b';g.strokeStyle='#92400e';g.lineWidth=2.5;if(n===1){g.beginPath();g.ellipse(cx,cy,u*.55,u,0,0,7);g.fill();g.stroke();for(let i=-1;i<2;i++){g.beginPath();g.ellipse(cx+i*u*.22,cy,u*.08,u*.9,0,0,7);g.stroke()}return}
  [-1,1].forEach(d=>{g.beginPath();g.ellipse(cx+d*u*.6,cy,u*.4,u*.9,0,d<0?Math.PI*.5:-Math.PI*.5,d<0?Math.PI*1.5:Math.PI*.5);g.fill();g.stroke()});g.fillStyle='#fafaf9';g.strokeStyle='#a8a29e';for(let i=0;i<6;i++){g.beginPath();g.ellipse(cx+(i%2?.12:-.12)*u,cy-u*.6+i*u*.24,u*.14,u*.1,0,0,7);g.fill();g.stroke()}return}
 if(n===3){g.fillStyle='#facc15';g.beginPath();g.arc(r.x+r.w*.8,r.y+u*.45,u*.3,0,7);g.fill();g.fillStyle='#a16207';g.fillRect(r.x+r.w*.1,cy+u*.4,r.w*.8,u*.2);g.fillStyle='#7c4a1e';for(let i=0;i<9;i++){g.beginPath();g.ellipse(r.x+r.w*.18+i*r.w*.08,cy+u*.3,u*.1,u*.07,0,0,7);g.fill()}return}
 if(n===4){g.fillStyle='#334155';A.paint.rrect(cx-u*.9,cy,u*1.8,u*.45,8);g.fill();g.fillStyle='#4a2511';for(let i=0;i<7;i++){g.beginPath();g.ellipse(cx-u*.6+i*u*.2,cy-u*.02,u*.1,u*.07,0,0,7);g.fill()}g.strokeStyle='#dc2626';g.lineWidth=3;for(let i=-1;i<2;i++){g.beginPath();g.moveTo(cx+i*u*.45,cy+u*.85);g.quadraticCurveTo(cx+i*u*.45+8,cy+u*.65,cx+i*u*.45,cy+u*.5);g.stroke()}return}
 P.food('choc',cx,cy,u*1.6)}
function drawPod(){const s=S.od,fin=s.seq.length>=5,t=P.banner(fin?R.DONE[1]:`Tap the steps in order. ${s.seq.length} of 5 done.`,fin?'ok':s.bad!=null?'no':'',S.note,S.bad);
 const ch=Math.min(48,A.H*.1),gap=6,rows=3,top=A.H-rows*(ch+gap)-4,cw=(A.W-16-gap)/2;PIC={x:A.W*.2,y:t,w:A.W*.6,h:Math.max(60,top-t-8)};stage(s.seq.length,PIC);
 const g=A.ctx;g.font=`700 ${P.sz(12)}${P.F}`;g.fillStyle=P.fg();g.textAlign='left';g.textBaseline='top';if(!s.seq.length)g.fillText('Pods grow on the trunk',8,t+4);
 CARD=R.MIX.map((i,j)=>({i,x:8+(j%2)*(cw+gap),y:top+Math.floor(j/2)*(ch+gap),w:cw,h:ch}));
 CARD.forEach(r=>{const k=s.seq.indexOf(r.i);P.card(r,(k>=0?`${k+1}. `:'')+R.STEPS[r.i].t,{ok:k>=0,no:s.bad===r.i,n:13})})}
/* ---------- 3. which plant does it grow on ---------- */
let PL=[],FOODR=null;
function match(p){const s=S.mt,M=R.MATCH[s.i];if(!M)return;if(p!==M.p){s.bad=p;A.sound.miss();return say(`Not the ${R.PLANTS[p].t.toLowerCase()}. ${R.PWHY[p]} Look again for ${M.t.toLowerCase()}.`,true)}
 s.done.push(p);s.i++;s.bad=-1;A.sound.pop();say(R.PWHY[p]+(s.i<4?' Next food.':''))}
function drawMatch(){const s=S.mt,M=R.MATCH[s.i],t=P.banner(M?`Where does ${M.t.toLowerCase()} grow? ${s.i} of 4.`:R.DONE[2],M?(s.bad>=0?'no':''):'ok',S.note,S.bad);
 const fs=Math.min(A.H*.2,90),narrow=A.W<520,cols=narrow?2:4,gap=8,pw=(A.W-16-gap*(cols-1))/cols,top=t+fs+10,ph=(A.H-top-8-(narrow?gap:0))/(narrow?2:1);
 PL=R.PLANTS.map((_,i)=>({i,x:8+(i%cols)*(pw+gap),y:top+Math.floor(i/cols)*(ph+gap),w:pw,h:ph}));const g=A.ctx;
 PL.forEach(r=>{g.fillStyle=P.dk()?'#1e293b':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();P.plant(R.PLANTS[r.i].k,{x:r.x+6,y:r.y+6,w:r.w-12,h:r.h-P.sz(14)-14},s.done.includes(r.i)?'ok':s.bad===r.i?'no':'');
  g.font=`800 ${P.sz(13)}${P.F}`;g.fillStyle=P.fg();g.textAlign='center';g.textBaseline='bottom';g.fillText(R.PLANTS[r.i].t,r.x+r.w/2,r.y+r.h-4)});
 if(M){const d=s.drag;FOODR={x:d?d.x-fs/2:(A.W-fs)/2,y:d?d.y-fs/2:t,w:fs*1.3,h:fs};P.card(FOODR,M.t,{n:12,top:1,sel:!!d});P.food(M.f,FOODR.x+FOODR.w/2,FOODR.y+fs*.4,fs*.55)}else FOODR=null}
/* ---------- 4. the Brazil nut tree needs the forest ---------- */
let ACT=[];
function act(k){const s=S.bz;if(s.agouti)return;
 if(k==='forest'){if(s.forest)return;s.forest=true;s.bad='';A.sound.pop();return say('The forest grows back around the tree. Big bees and agoutis live here now.')}
 if(k==='fly'){s.bad='fly';A.sound.miss();return say('The small fly cannot get in. The flower has a heavy lid, and only a big, strong bee can push it open.',true)}
 if(k==='bee'){if(!s.forest){s.bad='bee';A.sound.miss();return say('No big bees come. They live in the forest, and here the forest is cut down. Grow it back first.',true)}
  if(s.nuts)return;s.nuts=true;s.bad='';A.sound.pop();return say('The big bee pushes the lid open and carries pollen. Hard nut balls grow and fall to the ground. Each one has about 10 to 25 nuts inside.')}
 if(k==='agouti'){if(!s.nuts){s.bad='agouti';A.sound.miss();return say(s.forest?'There are no nuts yet for the agouti to bury. The flowers need a visit first.':'No agoutis here: they live in the forest. And there are no nuts yet.',true)}
  s.agouti=true;s.bad='';A.sound.pop();say('The agouti gnaws a nut ball open and buries some nuts to eat later. It forgets one, and a new Brazil nut tree grows!')}}
function drawNut(){const s=S.bz,fin=s.agouti,t=P.banner(fin?R.DONE[3]:s.nuts?'Nuts! Now who plants a new tree?':s.forest?'Who can open the flowers?':'A lonely Brazil nut tree in a field. No nuts.',fin?'ok':s.bad?'no':'',S.note,S.bad);
 const g=A.ctx,ah=Math.min(52,A.H*.11),gy=A.H-ah-18,cx=A.W/2,th=gy-t-6;g.fillStyle=P.dk()?'#14532d':'#86efac';g.fillRect(0,gy-4,A.W,8);
 if(s.forest)for(let i=0;i<6;i++){const x=A.W*(.07+i*.172);if(Math.abs(x-cx)<A.W*.1)continue;g.fillStyle='#57534e';g.fillRect(x-4,gy-th*.55,8,th*.55);g.fillStyle=i%2?'#15803d':'#166534';g.beginPath();g.ellipse(x,gy-th*.6,A.W*.07,th*.16,0,0,7);g.fill()}
 else for(let i=0;i<4;i++){const x=A.W*(.12+i*.26);if(Math.abs(x-cx)<A.W*.1)continue;g.fillStyle='#a16207';g.fillRect(x-7,gy-12,14,12)}
 g.fillStyle='#57534e';g.fillRect(cx-8,t+th*.25,16,th*.75);g.fillStyle='#166534';g.beginPath();g.ellipse(cx,t+th*.22,A.W*.18,th*.14,0,0,7);g.fill();
 g.fillStyle='#fde047';for(let i=0;i<5;i++){g.beginPath();g.arc(cx-A.W*.12+i*A.W*.06,t+th*.17+(i%2)*8,5,0,7);g.fill()}
 if(s.nuts){g.fillStyle='#78350f';[[-1.5,0],[-.6,1],[1.1,0],[2,1]].forEach(([d,o])=>{g.beginPath();g.arc(cx+d*A.W*.06,gy-10-o*4,9,0,7);g.fill()})}
 if(s.forest&&s.nuts){const bx=cx+A.W*.13,by=t+th*.1;g.fillStyle='#1d4ed8';g.beginPath();g.ellipse(bx,by,12,8,0,0,7);g.fill();g.fillStyle='#bfdbfe';g.beginPath();g.ellipse(bx-2,by-9,8,5,-.4,0,7);g.fill()}
 if(s.agouti){const ax=cx-A.W*.24;g.fillStyle='#92400e';g.beginPath();g.ellipse(ax,gy-14,26,13,0,0,7);g.fill();g.beginPath();g.arc(ax+24,gy-20,9,0,7);g.fill();g.fillStyle='#16a34a';g.fillRect(ax-48,gy-28,4,24);g.beginPath();g.ellipse(ax-46,gy-30,10,5,0,0,7);g.fill()}
 const keys=[['forest','Grow the forest back'],['fly','Small fly'],['bee','Big bee'],['agouti','Agouti']],bw=(A.W-16-18)/4;ACT=keys.map(([k,l],j)=>({k,l,x:8+j*(bw+6),y:A.H-ah-6,w:bw,h:ah}));
 ACT.forEach(r=>P.card(r,r.l,{n:12,ok:(r.k==='forest'&&s.forest)||(r.k==='bee'&&s.nuts)||(r.k==='agouti'&&s.agouti),no:s.bad===r.k}))}
/* ---------- 5. my lunchbox ---------- */
let ITEM=[];
function tapBox(j){const s=S.lb,B=R.BOX[j];if(s.got.includes(j)||s.got.length>=3)return;if(!B.r){s.bad=j;A.sound.miss();return say(`Not this one. ${B.why}`,true)}
 s.got.push(j);s.bad=-1;A.sound.pop();say(B.why+` ${s.got.length} of 3 found.`)}
function drawBox(){const s=S.lb,fin=s.got.length>=3,t=P.banner(fin?R.DONE[4]:`Tap the foods from rainforest plants. ${s.got.length} found.`,fin?'ok':s.bad>=0?'no':'',S.note,S.bad);
 const g=A.ctx,narrow=A.W<520,cols=narrow?2:3,rows=narrow?3:2,bx={x:10,y:t,w:A.W-20,h:A.H-t-10};g.fillStyle='#0369a1';A.paint.rrect(bx.x,bx.y,bx.w,bx.h,16);g.fill();
 const gap=8,cw=(bx.w-16-gap*(cols-1))/cols,ch=(bx.h-16-gap*(rows-1))/rows;ITEM=R.BOX.map((_,j)=>({j,x:bx.x+8+(j%cols)*(cw+gap),y:bx.y+8+Math.floor(j/cols)*(ch+gap),w:cw,h:ch}));
 ITEM.forEach(r=>{const B=R.BOX[r.j];P.card(r,B.t,{n:13,top:1,ok:s.got.includes(r.j),no:s.bad===r.j});P.food(B.k,r.x+r.w/2,r.y+r.h*.38,Math.min(r.h*.5,r.w*.45))})}
/* ---------- wiring ---------- */
function draw(){wash();const m=part();if(m==='chal'){P.banner('Challenge: foods from the rainforest','ok');['choc','banana','vanilla','brazil'].forEach((k,i)=>P.food(k,A.W*(.2+i*.2),A.H*.55,Math.min(A.W*.15,90)));return}
 ({sort:drawSort,pod:drawPod,match:drawMatch,nut:drawNut,box:drawBox})[m]();A.fx.draw(A.ctx)}
function down(p){const m=part();
 if(m==='sort'){if(HAND&&isIn(p,HAND)){S.so.drag={x:p.x,y:p.y};return true}const z=ZONE.findIndex(r=>isIn(p,r));if(z>=0)place(z);return false}
 if(m==='pod'){const r=CARD.find(r=>isIn(p,r));if(r)pick(r.i);return false}
 if(m==='match'){if(FOODR&&isIn(p,FOODR)){S.mt.drag={x:p.x,y:p.y};return true}const r=PL.find(r=>isIn(p,r));if(r)match(r.i);return false}
 if(m==='nut'){const r=ACT.find(r=>isIn(p,r));if(r)act(r.k);return false}
 if(m==='box'){const r=ITEM.find(r=>isIn(p,r));if(r)tapBox(r.j);return false}return false}
function move(p){const d=part()==='sort'?S.so.drag:part()==='match'?S.mt.drag:null;if(d){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const m=part();
 if(m==='sort'&&S.so.drag){S.so.drag=null;const z=ZONE.findIndex(r=>isIn(p,r));if(z>=0)place(z);else{A.redraw();say('Drop the food on a box.')}}
 if(m==='match'&&S.mt.drag){S.mt.drag=null;const r=PL.find(r=>isIn(p,r));if(r)match(r.i);else{A.redraw();say('Drop the food on a plant.')}}}
function fresh(){epoch++;for(const k in S)delete S[k];Object.assign(S,{so:{i:0,pile:[[],[]],bad:false,drag:null},od:{seq:[],bad:null},mt:{i:0,bad:-1,drag:null,done:[]},
 bz:{forest:false,nuts:false,agouti:false,bad:''},lb:{got:[],bad:-1},note:null,bad:false,check:()=>{}})}
function say(t,bad){S.note=t;S.bad=!!bad;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.check()}
const finish=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(R.DONE[i]+A.reveal(i))};
function enter(i,ok){fresh();c.say(R.DESC[i]);A.cv.setAttribute('aria-label',R.DESC[i]);S.check=finish(i,ok);buttons();A.redraw()}
function demo(i,list){steps[i].go();const e=epoch;let t=0;list.forEach(([ms,f])=>{t+=ms;setTimeout(()=>{if(e===epoch)f()},t)})}
function buttons(){if(!ctl)return;ctl.innerHTML='';const m=part(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(m==='sort'&&R.FOODS[S.so.i]){const F=R.FOODS[S.so.i];B('🌴 Rainforest plant',()=>place(0),`${F.t}: from a rainforest plant`);B('Not from a rainforest',()=>place(1),`${F.t}: not from a rainforest`)}
 if(m==='pod'&&S.od.seq.length<5)R.MIX.forEach(i=>{if(!S.od.seq.includes(i))B(R.STEPS[i].t,()=>pick(i))});
 if(m==='match'&&R.MATCH[S.mt.i])R.PLANTS.forEach((Q,i)=>B(Q.t,()=>match(i),`${R.MATCH[S.mt.i].t} grows on the ${Q.t.toLowerCase()}`));
 if(m==='nut'&&!S.bz.agouti){B('Grow the forest back',()=>act('forest'));B('Small fly',()=>act('fly'),'Send a small fly to the flowers');B('Big bee',()=>act('bee'),'Send a big bee to the flowers');B('Agouti',()=>act('agouti'),'Bring an agouti')}
 if(m==='box'&&S.lb.got.length<3)R.BOX.forEach((Q,j)=>{if(!S.lb.got.includes(j))B(Q.t,()=>tapBox(j),`${Q.t}: from a rainforest plant?`)})}
const steps=[
{h:'Rainforest or not?',p:R.TXT[0],predict:{q:'Is chocolate made from a plant?',opts:['No, it is made from milk','Yes, from beans on a tree'],ans:1},task:'Sort all 8 foods',
 show:()=>demo(0,R.FOODS.map(F=>[300,()=>place(F.r?0:1)])),go:()=>enter(0,()=>S.so.i>=8)},
{h:'From pod to chocolate',p:R.TXT[1],predict:{q:'Where do cacao pods grow?',opts:['On thin twigs, like apples','Right on the tree trunk'],ans:1},task:'Put the 5 steps in order',
 show:()=>demo(1,[0,1,2,3,4].map(n=>[350,()=>pick(R.STEPS.findIndex(x=>x.n===n))])),go:()=>enter(1,()=>S.od.seq.length>=5)},
{h:'Where does it grow?',p:R.TXT[2],predict:{q:'Vanilla ice cream is white. What colour are vanilla pods?',opts:['White, like the ice cream','Dark brown when ready'],ans:1},task:'Match all 4 foods to their plants',
 show:()=>demo(2,R.MATCH.map(M=>[400,()=>match(M.p)])),go:()=>enter(2,()=>S.mt.i>=4)},
{h:'Brazil nuts need the forest',p:R.TXT[3],predict:{q:'Will a Brazil nut tree alone in a field grow lots of nuts?',opts:['Yes, a tree is a tree','No, it needs forest bees'],ans:1},task:'Get nuts and a new tree',
 show:()=>demo(3,[[300,()=>act('forest')],[600,()=>act('bee')],[700,()=>act('agouti')]]),go:()=>enter(3,()=>S.bz.agouti)},
{h:'My lunchbox',p:R.TXT[4],task:'Find all 3 rainforest foods',
 show:()=>demo(4,[0,2,4].map(j=>[400,()=>tapBox(j)])),go:()=>enter(4,()=>S.lb.got.length>=3)},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
function why(t){let m='Chocolate, bananas, vanilla and Brazil nuts all come from rainforest plants.';
 if(t==='cow')m='Cows do not make chocolate, not even brown ones. Chocolate is made from cacao beans that grow on a rainforest tree.';
 if(t==='sugar')m='Sugar is added to make chocolate sweet, but the chocolate taste comes from roasted cacao beans.';
 if(t==='ground')m='Cacao pods are not under the ground. They grow right on the trunk of the cacao tree.';
 if(t==='twig')m='Apples hang from thin twigs, but cacao pods grow straight out of the thick trunk.';
 if(t==='cold')m='Apples and carrots grow in cool places. Bananas first came from hot, wet rainforests.';
 if(t==='white')m='Vanilla pods start green and are dried until they are dark brown. Ice cream is pale because of the cream.';
 if(t==='fly')m='A small fly cannot lift the heavy lid on the flower. Only big, strong forest bees can.';
 if(t==='field')m='Alone in a field, the tree gets no big bees, so it makes hardly any nuts. It needs the forest.';
 if(t==='wind')m='Nut balls are far too heavy for the wind. Agoutis bury the nuts, and forgotten ones grow into new trees.';
 if(t==='zero')m='Both came from rainforest plants: the banana, and the cacao beans in the chocolate.';
 return m}
function ask(){qn++;const Q=R.QS[qn%R.QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function mark(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:X=>{chal.hidden=X.step!==5;ctl.hidden=X.step===5;buttons()},
 init:X=>{A=X;P=R.SHAPES(A);const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Rainforest foods lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});buttons()}}).start()})})();
