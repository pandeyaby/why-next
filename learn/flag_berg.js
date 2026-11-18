/* Flagship: ice and snow (ages 5–7). Pick the six-armed snow crystal, sort solid water, liquid water and not water,
   drop ice and stones in a tank to see ice float low, steer a ship clear of an iceberg's hidden part, check facts. */
(()=>{
const {FLAKES,SORT,BINS,DROP,LANES,BERGS,KIDS,QZ,WHY}=BERGART;
const Q={ink:'#111827',dim:'#374151',sheet:'#fefcf7',edge:'#1f2937',sea:'#bfdbfe',seaDk:'#1e3a8a',ice:'#ecfeff',iceEdge:'#0e7490',hid:'#67e8f9',sky:'#f0f9ff',good:'#166534',goodBg:'#dcfce7',bad:'#9f1239',hint:'#fff7ed',on:'#dbeafe',stone:'#78716c'};
VIS.reg('flagberg',c=>{let A,X,pad,box,qi=-1,tok=0;const G={after:()=>{}};
const u=n=>Math.round(n*(A.narrow?1:1.12));
const voice=m=>{c.say(m);A.cv.setAttribute('aria-label',m)};
function say(t,x,y,n,col,wt,al){X.font=`${wt||700} ${u(n)}px system-ui,sans-serif`;X.fillStyle=col||Q.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(t),x,y)}
function wrap(t,w,n){X.font=`700 ${u(n)}px system-ui,sans-serif`;const out=[];let ln='';for(const wd of String(t).split(' ')){const nx=ln?ln+' '+wd:wd;if(ln&&X.measureText(nx).width>w){out.push(ln);ln=wd}else ln=nx}out.push(ln);return out}
function box2(x,y,w,h,fill,stroke,lw){A.paint.rrect(x,y,w,h,12);X.fillStyle=fill;X.fill();if(stroke){X.lineWidth=lw||2;X.strokeStyle=stroke;X.stroke()}}
const within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function top(t,won){const L=wrap(t,A.W-44,14),lh=u(14)+4,h=Math.max(u(36),L.length*lh+14);box2(12,10,A.W-24,h,won?Q.goodBg:Q.hint,won?Q.good:Q.edge,2);L.forEach((r,i)=>say(r,A.W/2,10+h/2+(i-(L.length-1)/2)*lh,14,won?Q.good:Q.ink));return 10+h}
function note(){if(!G.msg)return;const L=wrap((G.bad?'✗ ':'✓ ')+G.msg,A.W-48,13),lh=u(13)+5,h=L.length*lh+12,y=A.H-h-10;box2(12,y,A.W-24,h,'#ffffff',G.bad?Q.bad:Q.good,3);L.forEach((r,i)=>say(r,A.W/2,y+6+lh*(i+.5),13,G.bad?Q.bad:Q.ink))}
const miss=m=>{G.bad=true;G.msg=m;A.sound.miss();sync()};
const hitOk=m=>{G.bad=false;G.msg=m;A.sound.pop()};
const part=()=>['flake','sort','tank','berg','kids','quiz'][A.step];
/* ---- snow crystals ---- */
function flake(x,y,r,arms,style){X.strokeStyle=Q.iceEdge;X.lineCap='round';X.lineWidth=Math.max(2,r*.09);
 for(let i=0;i<arms;i++){const a=-Math.PI/2+i*2*Math.PI/arms,cx=Math.cos(a),cy=Math.sin(a);X.beginPath();X.moveTo(x,y);X.lineTo(x+cx*r,y+cy*r);X.stroke();
  for(const f of style?[.45,.72]:[.6]){const bx=x+cx*r*f,by=y+cy*r*f,bl=r*(style===2?.32:.24);for(const s of[-1,1]){const b=a+s*Math.PI/3;X.beginPath();X.moveTo(bx,by);X.lineTo(bx+Math.cos(b)*bl,by+Math.sin(b)*bl);X.stroke()}}}
 X.fillStyle=Q.iceEdge;X.beginPath();X.arc(x,y,r*.1,0,7);X.fill()}
function drawFlakes(t0,b0){const R=FLAKES[Math.min(G.round,2)],w=(A.W-u(48))/3,h=Math.min(w*1.25,b0-t0-u(40));
 say('Which one is a real snow crystal?',A.W/2,t0+u(18),A.narrow?14:16,Q.ink,800);
 G.fr=R.map(([arms,st],i)=>{const r={x:u(16)+i*(w+u(8)),y:t0+u(36),w,h,i};box2(r.x,r.y,w,h,G.sel===i?Q.on:Q.sky,Q.edge,2);flake(r.x+w/2,r.y+h*.45,Math.min(w,h)*.36,arms,st);
  if(G.counted&&G.counted.has(i))say(arms+' arms',r.x+w/2,r.y+h-u(14),13,Q.dim,800);return r})}
function pickFlake(i){if(G.won)return;const R=FLAKES[G.round],[arms]=R[i];G.counted=G.counted||new Set();G.counted.add(i);
 if(arms!==6)return miss(`That one has ${arms} arms. A snow crystal always has six arms, because ice crystals grow in six directions.`);
 hitOk('Six arms: a real snow crystal. Snow is made of tiny crystals of ice.');G.round++;G.counted=new Set();if(G.round===FLAKES.length){G.won=true;G.msg='Every snow crystal is ice with six arms.'}sync()}
/* ---- sorting ---- */
function drawSort(t0,b0){const left=SORT.filter((_,i)=>!G.placed.has(i)),cur=left.length?SORT.indexOf(left[0]):-1;G.cur=cur;const bh=u(84),by=b0-bh,w=(A.W-u(40))/3;
 G.bins=BINS.map((b,i)=>{const r={x:u(12)+i*(w+u(8)),y:by,w,h:bh,i};box2(r.x,r.y,w,bh,['#e0f2fe','#dbeafe','#f5f5f4'][i],Q.edge,2);wrap(b,w-u(10),12).forEach((ln,j)=>say(ln,r.x+w/2,r.y+u(16)+j*u(15),12,Q.ink,800));
  const n=[...G.placed].filter(k=>SORT[k][1]===i).length;say(n?`${n} here`:'',r.x+w/2,r.y+bh-u(14),12,Q.dim,700);return r});
 if(cur<0){say('All sorted!',A.W/2,(t0+by)/2,20,Q.good,900);G.cardR=null;return}
 const cw=Math.min(u(220),A.W*.6),ch=u(64),d=G.drag,cx=d?d.x-cw/2:A.W/2-cw/2,cy=d?d.y-ch/2:t0+(by-t0)/2-ch/2;G.cardR={x:A.W/2-cw/2,y:t0+(by-t0)/2-ch/2,w:cw,h:ch};
 box2(cx,cy,cw,ch,'#ffffff',d?Q.seaDk:Q.edge,d?3.5:2.5);say(SORT[cur][0],cx+cw/2,cy+ch/2,19,Q.ink,900);say(`${G.placed.size+1} of ${SORT.length}`,A.W/2,t0+u(16),12,Q.dim,700)}
function place(bin){if(G.won||G.cur<0)return;const [name,ok]=SORT[G.cur];
 if(bin!==ok){const why=[`${name} is water that is frozen hard. That makes it solid water: ice.`,`${name} is water that can flow and splash. It is liquid water.`,`${name} is not made of water. It does not melt into water.`][ok];return miss(why)}
 G.placed.add(G.cur);A.sound.tick();hitOk(`${name}: ${BINS[bin].toLowerCase()}.`);if(G.placed.size===SORT.length){G.won=true;G.msg='Snow, icicles, hail and icebergs are all frozen water.'}sync()}
/* ---- tank ---- */
function drawTank(t0,b0){const x0=u(16),x1=A.W-u(16),tw=x1-x0,sy=t0+u(70),wy=sy+(b0-sy)*.25,by=b0-u(8);G.wy=wy;G.tankR={x:x0,y:sy,w:tw,h:by-sy};
 X.fillStyle=Q.sea;X.fillRect(x0,wy,tw,by-wy);X.strokeStyle=Q.edge;X.lineWidth=2.5;X.strokeRect(x0,sy,tw,by-sy);X.strokeStyle=Q.seaDk;X.lineWidth=2;X.beginPath();X.moveTo(x0,wy);X.lineTo(x1,wy);X.stroke();say('water line',x1-u(8),wy-u(10),11,Q.seaDk,800,'right');
 const tw4=tw/DROP.length;G.pieces=DROP.map(([n,fl,sz],i)=>{const s=u(30+36*sz),cx=x0+tw4*(i+.5);let y;const inT=G.dropped.has(i);if(!inT)y=t0+u(10);else y=fl?wy-s*.1:by-s-2;
  const d=G.drag&&G.drag.i===i,px=d?G.drag.x-s/2:cx-s/2,py=d?G.drag.y-s/2:y;const r={x:cx-s/2,y,w:s,h:s,i};
  if(fl){X.fillStyle=Q.ice;X.fillRect(px,py,s,s);X.strokeStyle=Q.iceEdge;X.lineWidth=2.5;X.strokeRect(px,py,s,s);if(inT){X.fillStyle='rgba(14,116,144,.18)';X.fillRect(px,wy,s,py+s-wy)}}
  else{X.fillStyle=n==='Coin'?'#ca8a04':Q.stone;X.beginPath();X.ellipse(px+s/2,py+s/2,s/2,n==='Coin'?s/5:s/2.4,0,0,7);X.fill()}
  if(!inT)say(n,cx,py+s+u(12),11,Q.ink,800);return r})}
function drop(i){if(G.won||G.dropped.has(i))return;const [n,fl,sz]=DROP[i];G.dropped.add(i);A.sound.tick();
 hitOk(fl?`${n}: it floats! Most of it is under the water line. Only a little sticks out.`:`${n}: it sinks to the bottom.`);
 if(G.dropped.size===DROP.length){G.won=true;G.msg='Ice floats, big or small, with most of it under the water. Ice is lighter than the same amount of water.'}sync()}
/* ---- iceberg lanes ---- */
const blocked=(L,bergs)=>bergs.some(([x,l,r])=>L+.07>x-l&&L-.07<x+r);
function drawBerg(t0,b0){const bergs=BERGS[Math.min(G.round,2)],wy=t0+(b0-t0)*.32,W=A.W-u(32),x0=u(16),X0=f=>x0+W*f;
 X.fillStyle=Q.sky;X.fillRect(x0,t0+u(6),W,wy-t0-u(6));X.fillStyle=Q.sea;X.fillRect(x0,wy,W,b0-wy-u(4));
 bergs.forEach(([x,l,r])=>{const tipW=W*.07;X.fillStyle=Q.ice;X.strokeStyle=Q.iceEdge;X.lineWidth=2.5;X.beginPath();X.moveTo(X0(x)-tipW,wy);X.lineTo(X0(x)-tipW*.3,wy-u(34));X.lineTo(X0(x)+tipW*.5,wy-u(26));X.lineTo(X0(x)+tipW,wy);X.closePath();X.fill();X.stroke();
  X.fillStyle='rgba(103,232,249,.55)';X.beginPath();X.moveTo(X0(x)-tipW,wy);X.lineTo(X0(x-l),wy+u(30));X.lineTo(X0(x-l*.6),b0-u(30));X.lineTo(X0(x+r*.7),b0-u(20));X.lineTo(X0(x+r),wy+u(34));X.lineTo(X0(x)+tipW,wy);X.closePath();X.fill();X.strokeStyle=Q.iceEdge;X.setLineDash([6,4]);X.stroke();X.setLineDash([])});
 say('hidden ice under the water',A.W/2,b0-u(12),11,Q.seaDk,800);
 G.laneR=LANES.map((L,i)=>{const w=u(64),h=u(36),r={x:X0(L)-w/2,y:t0+u(12),w,h,i};X.strokeStyle=Q.dim;X.lineWidth=1.5;X.setLineDash([3,5]);X.beginPath();X.moveTo(X0(L),r.y+h);X.lineTo(X0(L),b0-u(24));X.stroke();X.setLineDash([]);const gone=G.hit&&G.hit.has(i);box2(r.x,r.y,w,h,gone?'#fee2e2':'#ffffff',gone?Q.bad:Q.edge,2);say(['Left','Middle','Right'][i],r.x+w/2,r.y+h/2,13,gone?Q.bad:Q.ink,800);return r})}
function steer(i){if(G.won)return;const bergs=BERGS[G.round];G.hit=G.hit||new Set();
 if(blocked(LANES[i],bergs)){G.hit.add(i);return miss(`Crunch! The ${['left','middle','right'][i]} way hits ice under the water. Look at the hidden part, not only the tip.`)}
 hitOk(`Safe! The ${['left','middle','right'][i]} way misses all the hidden ice.`);G.round++;G.hit=new Set();if(G.round===BERGS.length){G.won=true;G.msg='Most of an iceberg is under the water, so ships keep well away from the tip.'}sync()}
/* ---- facts ---- */
function drawKids(t0,b0){const [lead,kids]=KIDS[Math.min(G.round,2)];say(lead,A.W/2,t0+u(20),18,Q.ink,900);const h=Math.min(u(74),(b0-t0-u(44))/3-u(6));
 G.kidR=kids.map((k,i)=>{const r={x:u(16),y:t0+u(40)+i*(h+u(6)),w:A.W-u(32),h,i};box2(r.x,r.y,r.w,h,'#ffffff',Q.edge,2);X.fillStyle=['#fecaca','#c7d2fe','#fde68a'][i];X.beginPath();X.arc(r.x+u(26),r.y+h/2,u(15),0,7);X.fill();
  say(k[0],r.x+u(26),r.y+h/2,11,Q.ink,800);const L=wrap(k[1],r.w-u(70),13);L.forEach((ln,j)=>say(ln,r.x+u(52),r.y+h/2+(j-(L.length-1)/2)*u(17),13,Q.ink,700,'left'));return r})}
function judge(i){if(G.won)return;const k=KIDS[G.round][1][i];if(k[2])return miss(`${k[0]} is not right. ${k[2]}`);hitOk(`${k[0]} is right: ${KIDS[G.round][0].replace('…','')} ${k[1]}`);G.round++;if(G.round===KIDS.length){G.won=true;G.msg='Ice and snow are frozen water. Ice floats, mostly hidden.'}sync()}
function draw(){X.fillStyle=A.col.dark?'#1f2937':Q.sheet;X.fillRect(0,0,A.W,A.H);X.fillStyle=Q.sheet;A.paint.rrect(5,5,A.W-10,A.H-10,16);X.fill();
 const k=part(),H={flake:['Tap the real snow crystal.','Snow is ice crystals.'],sort:['Drag the card into a box, or tap a box.','All sorted.'],tank:['Drag each thing into the water, or tap it.','Ice floats!'],berg:['Pick a safe way for the ship.','Ships stayed safe.'],kids:['Who is right? Tap them.','Facts checked.'],quiz:['Snow is ice. Ice floats, mostly hidden.','']};
 const t=top(G.won?H[k][1]:H[k][0],G.won),bot=A.H-(G.msg?u(70):u(12));
 if(k==='flake')drawFlakes(t,bot);if(k==='sort')drawSort(t+u(4),bot);if(k==='tank')drawTank(t,bot);if(k==='berg')drawBerg(t,bot);if(k==='kids')drawKids(t+u(4),bot);
 if(k==='quiz'){flake(A.W/2,t+(bot-t)/2,Math.min(A.W,bot-t)*.25,6,1)}note();A.fx.draw(X)}
let p0=null;
function down(p){const k=part();p0=p;if(G.won&&k!=='quiz')return false;
 if(k==='flake'){const r=(G.fr||[]).find(q=>within(p,q));if(r){pickFlake(r.i);return true}}
 if(k==='sort'){if(within(p,G.cardR)){G.drag={x:p.x,y:p.y};A.redraw();return true}const b=(G.bins||[]).find(q=>within(p,q));if(b){place(b.i);return true}}
 if(k==='tank'){const r=(G.pieces||[]).find(q=>!G.dropped.has(q.i)&&within(p,q));if(r){G.drag={i:r.i,x:p.x,y:p.y};A.redraw();return true}}
 if(k==='berg'){const r=(G.laneR||[]).find(q=>within(p,q));if(r){steer(r.i);return true}}
 if(k==='kids'){const r=(G.kidR||[]).find(q=>within(p,q));if(r){judge(r.i);return true}}
 return false}
function move(p){if(!G.drag)return;G.drag.x=p.x;G.drag.y=p.y;A.redraw()}
function up(p){const d=G.drag;G.drag=null;if(!d)return;const tap=p0&&Math.hypot(p.x-p0.x,p.y-p0.y)<10,k=part();
 if(k==='sort'){const b=(G.bins||[]).find(q=>within(p,q));if(b)place(b.i);else A.redraw();return}
 if(k==='tank'){if(tap||p.y>G.wy-u(20))drop(d.i);else A.redraw()}}
function sync(){const k=part();let d='Challenge.';
 if(k==='flake')d=G.won?'All three found.':`Round ${G.round+1} of 3. Crystals: ${FLAKES[G.round].map((f,i)=>['left','middle','right'][i]+(G.counted&&G.counted.has(i)?' with '+f[0]+' arms':'')).join(', ')}.`;
 if(k==='sort'){G.cur=SORT.findIndex((_,i)=>!G.placed.has(i));d=G.won?'All nine sorted.':`Card: ${SORT[G.cur][0]}. ${G.placed.size} of ${SORT.length} sorted.`}
 if(k==='tank')d=`In the water: ${DROP.filter((_,i)=>G.dropped.has(i)).map(q=>q[0]+(q[1]?' floating, mostly under the water line':' on the bottom')).join('; ')||'nothing yet'}.`;
 if(k==='berg')d=G.won?'All three ships safe.':`Ship ${G.round+1} of 3. Hidden ice under ${LANES.map((L,i)=>blocked(L,BERGS[G.round])?['left','middle','right'][i]:'').filter(Boolean).join(' and ')} way.`;
 if(k==='kids')d=G.won?'All three checked.':`${KIDS[G.round][0]} `+KIDS[G.round][1].map(q=>q[0]+': '+q[1]).join(' ');
 voice((G.msg?G.msg+' ':'')+d);ctl();G.after()}
function ctl(){if(!pad)return;pad.innerHTML='';const k=part(),b=(t,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},pad,t).onclick=()=>{fn();sync()}};
 if(!G.won){if(k==='flake')['Left','Middle','Right'].forEach((n,i)=>b(n+' crystal',()=>pickFlake(i)));
  if(k==='sort')BINS.forEach((n,i)=>b(n,()=>place(i)));
  if(k==='tank')DROP.forEach((q,i)=>{if(!G.dropped.has(i))b('Drop the '+q[0].toLowerCase(),()=>drop(i))});
  if(k==='berg')['Left','Middle','Right'].forEach((n,i)=>b(n+' way',()=>steer(i)));
  if(k==='kids')KIDS[G.round][1].forEach((q,i)=>b(q[0]+' is right',()=>judge(i)))}
 A.redraw()}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const auto=(fns,ms)=>{const id=++tok;fns.forEach((f,j)=>setTimeout(()=>{if(id===tok){f();sync()}},(j+1)*(A.reduced()?50:ms)))};
function fresh(){tok++;Object.assign(G,{after:()=>{},won:false,msg:'',bad:false,sel:null,drag:null,round:0,placed:new Set(),dropped:new Set(),counted:new Set(),hit:new Set(),cur:0})}
const steps=[
{h:'Snow is made of ice',p:'Snow falls from clouds when it is very cold. Look closely at one bit of snow. It is a tiny crystal of ice.',
predict:{q:'What is snow made of?',opts:['White powder','Tiny bits of ice','Bits of cloud'],ans:1},
task:'Find the real snow crystal 3 times',show:()=>{steps[0].go();auto(FLAKES.map(()=>()=>pickFlake(FLAKES[G.round].findIndex(f=>f[0]===6))),450)},go:()=>{fresh();sync();G.after=ready(0,()=>G.won,'Six arms every time.')}},
{h:'Solid or liquid water?',p:'Water can be liquid, like rain. It can be solid, like ice and snow. Solid water is frozen hard.',
predict:{q:'Is an iceberg made of water?',opts:['No, it is rock','Yes, frozen water','No, it is glass'],ans:1},
task:'Sort all 9 cards',show:()=>{steps[1].go();auto(SORT.map(()=>()=>place(SORT[G.cur][1])),200)},go:()=>{fresh();sync();G.after=ready(1,()=>G.won,'All nine sorted.')}},
{h:'Does ice float?',p:'Put things in the water. Watch where they end up. Look at how much of the ice is under the water line.',
predict:{q:'You drop a big block of ice in water. What happens?',opts:['It sinks, it is big','It floats','It floats on top, all dry'],ans:1},
task:'Drop all 4 things in the water',show:()=>{steps[2].go();auto(DROP.map((_,i)=>()=>drop(i)),400)},go:()=>{fresh();sync();G.after=ready(2,()=>G.won,'Ice floats low in the water.')}},
{h:'The hidden iceberg',p:'An iceberg is a huge piece of ice in the sea. You see only the tip. Most of it is hidden under the water.',
predict:{q:'How much of an iceberg is under the water?',opts:['A tiny bit','About half','Most of it'],ans:2},
task:'Get 3 ships safely past',show:()=>{steps[3].go();auto(BERGS.map(()=>()=>steer(LANES.findIndex(L=>!blocked(L,BERGS[G.round])))),500)},go:()=>{fresh();sync();G.after=ready(3,()=>G.won,'Three ships safe.')}},
{h:'Check the facts',p:'Three children talk about ice and snow. Only one is right each time.',
task:'Find who is right 3 times',show:()=>{steps[4].go();auto(KIDS.map(()=>()=>judge(KIDS[G.round][1].findIndex(q=>!q[2]))),450)},go:()=>{fresh();sync();G.after=ready(4,()=>G.won,'Facts checked.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>G.after()});
let streak=0;
function ask(){qi++;const [q,right,wrong]=QZ[qi%QZ.length],all=[[right,'ok']].concat(wrong),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 box.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=box.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>check(tag,right)});voice('Challenge: '+q);A.redraw()}
function check(tag,right){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),ok=tag==='ok';let m=WHY[tag]||'Snow and ice are frozen water, and ice floats.';
 if(tag==='sink')m='Ice does not sink, even a big piece. Ice is lighter than the same amount of water, so it floats.';
 if(tag==='tip')m='The tip is the small part. Most of an iceberg is hidden under the water.';
 if(tag==='arms')m='Count again: a snow crystal has six arms. Ice crystals grow in six directions.';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+right+'. In a row: '+streak+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:B=>{box.hidden=B.step!==5;pad.hidden=B.step===5;ctl()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Ice and snow lab buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
