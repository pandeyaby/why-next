/* Flagship: Earth's layers (ages 7–9). Drill from the crust to the centre, label the four layers, put them in order of
   thickness (the crust is by far the thinnest), then from coolest to hottest, sort solid and liquid layers, check facts. */
(()=>{
const {L,DRAWN,LABELS,KIDS,QZ,WHY}=LAYERSART;
const Z={ink:'#111827',sub:'#374151',bg:'#fefcf7',line:'#1f2937',drill:'#1d4ed8',ok:'#166534',okBg:'#dcfce7',no:'#9f1239',tip:'#fff7ed',sky:'#e0f2fe'};
VIS.reg('flaglayers',c=>{let A,X,pad,box,qa=-1,gen=0;const M={after:()=>{}};
const q=n=>Math.round(n*(A.narrow?1:1.12));
const aria=m=>{c.say(m);A.cv.setAttribute('aria-label',m)};
function put(t,x,y,n,col,wt,al){X.font=`${wt||700} ${q(n)}px system-ui,sans-serif`;X.fillStyle=col||Z.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(t),x,y)}
function brk(t,w,n){X.font=`700 ${q(n)}px system-ui,sans-serif`;const o=[];let ln='';for(const wd of String(t).split(' ')){const nx=ln?ln+' '+wd:wd;if(ln&&X.measureText(nx).width>w){o.push(ln);ln=wd}else ln=nx}o.push(ln);return o}
function panel(x,y,w,h,fill,stroke,lw){A.paint.rrect(x,y,w,h,12);X.fillStyle=fill;X.fill();if(stroke){X.lineWidth=lw||2;X.strokeStyle=stroke;X.stroke()}}
const inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function lead(t,won){const T=brk(t,A.W-44,14),lh=q(14)+4,h=Math.max(q(36),T.length*lh+14);panel(12,10,A.W-24,h,won?Z.okBg:Z.tip,won?Z.ok:Z.line,2);T.forEach((r,i)=>put(r,A.W/2,10+h/2+(i-(T.length-1)/2)*lh,14,won?Z.ok:Z.ink));return 10+h}
function said(){if(!M.msg)return;const T=brk((M.bad?'✗ ':'✓ ')+M.msg,A.W-48,13),lh=q(13)+5,h=T.length*lh+12,y=A.H-h-10;panel(12,y,A.W-24,h,'#ffffff',M.bad?Z.no:Z.ok,3);T.forEach((r,i)=>put(r,A.W/2,y+6+lh*(i+.5),13,M.bad?Z.no:Z.ink))}
const wrong=m=>{M.bad=true;M.msg=m;A.sound.miss();sync()};
const right=m=>{M.bad=false;M.msg=m;A.sound.pop()};
const RB=[1,.9,.55,.19,0],RK=[6371,6336,3480,1220,0],km=d=>{const r=1-d;for(let i=0;i<4;i++)if(r<=RB[i]&&r>=RB[i+1]){const f=(r-RB[i+1])/(RB[i]-RB[i+1]);return 6371-(RK[i+1]+f*(RK[i]-RK[i+1]))}return 6371};
const kind=()=>['drill','label','thick','heat','state','kids','quiz'][A.step];
/* half-Earth cut-away: centre at the bottom middle */
function earth(t0,b0,opt){const R=Math.min(A.W/2-q(18),b0-t0-q(14)),cx=A.W/2,cy=b0-q(4);M.geo={cx,cy,R};
 X.fillStyle=Z.sky;X.fillRect(q(10),t0,A.W-q(20),cy-t0);
 DRAWN.forEach((f,i)=>{X.fillStyle=L[i][4];X.beginPath();X.moveTo(cx-R*f,cy);X.arc(cx,cy,R*f,Math.PI,0);X.closePath();X.fill();X.strokeStyle=Z.line;X.lineWidth=1.5;X.stroke()});
 X.strokeStyle=Z.line;X.lineWidth=2;X.beginPath();X.moveTo(cx-R-4,cy);X.lineTo(cx+R+4,cy);X.stroke();
 if(opt&&opt.names)DRAWN.forEach((f,i)=>{if(!opt.names.has(i))return;const r1=i<3?DRAWN[i+1]:0,mid=R*(f+r1)/2;if(i===0)put('Crust',cx,cy-R-q(8),12,Z.ink,900);else put(L[i][0],cx,cy-mid,13,Z.ink,900)});
 if(!M.msg)put('Crust drawn thicker so you can see it',cx,cy+q(12),10,Z.sub,700)}
function layerAt(p){const g=M.geo;if(!g||p.y>g.cy+2)return -1;const d=Math.hypot(p.x-g.cx,p.y-g.cy)/g.R;if(d>1.04)return -1;let k=0;DRAWN.forEach((f,i)=>{if(d<=f+.001)k=i});return k}
/* step 1: drill */
function drawDrill(t0,b0){earth(t0,b0,{names:M.seen});const g=M.geo,y=g.cy-g.R+g.R*M.depth;X.strokeStyle=Z.drill;X.lineWidth=5;X.beginPath();X.moveTo(g.cx,g.cy-g.R-q(14));X.lineTo(g.cx,y);X.stroke();
 X.fillStyle=Z.drill;X.beginPath();X.moveTo(g.cx-q(9),y-q(6));X.lineTo(g.cx+q(9),y-q(6));X.lineTo(g.cx,y+q(8));X.closePath();X.fill();M.bit={x:g.cx-q(24),y:y-q(24),w:q(48),h:q(44)};
 put(`${(Math.round(km(M.depth)/5)*5).toLocaleString('en-GB')} km down`,g.cx+q(12),g.cy-g.R-q(10),12,Z.ink,900,'left')}
function dig(to){if(M.won)return;M.depth=Math.max(M.depth,Math.min(1,to));const r=1-M.depth;let i=0;DRAWN.forEach((f,j)=>{if(r<=f)i=j});
 const was=M.seen.has(i);M.seen.add(i);for(let j=0;j<i;j++)M.seen.add(j);if(!was){A.sound.tick();right(`You reached the ${L[i][0].toLowerCase()}: ${L[i][3]?'solid':'liquid'} and ${L[i][5]}.`)}
 if(M.depth>=1){M.won=true;M.msg='Crust, mantle, outer core, inner core. About 6,371 km to the centre.'}sync()}
/* step 2: labels */
function drawLabel(t0,b0){const left=LABELS.filter(i=>!M.names.has(i));M.cur=left.length?left[0]:-1;const top=t0+q(56);earth(top,b0,{names:M.names});
 if(M.cur<0)return;const w=Math.min(q(200),A.W*.6),h=q(40),d=M.drag;M.card={x:A.W/2-w/2,y:t0+q(8),w,h};const x=d?d.x-w/2:M.card.x,y=d?d.y-h/2:M.card.y;panel(x,y,w,h,'#ffffff',d?Z.drill:Z.line,d?3.5:2.5);put(L[M.cur][0],x+w/2,y+h/2,16,Z.ink,900)}
function label(at){if(M.won||M.cur<0)return;const n=M.cur;if(at!==n){const where=['the outside','the second layer','the third layer','the centre'];return wrong(`That is ${where[at]}. The ${L[n][0].toLowerCase()} is ${where[n]}${n===3?'':n===2?', the liquid layer around the centre':n===0?', the layer we live on':', the thick hot rock under the crust'}.`)}
 M.names.add(n);A.sound.tick();right(`${L[n][0]}: right place.`);if(M.names.size===4){M.won=true;M.msg='From the outside in: crust, mantle, outer core, inner core.'}sync()}
/* steps 3 and 4: tap layers in order */
const goal=()=>kind()==='thick'?[0,3,2,1]:[0,1,2,3];
function drawBars(t0,b0){const order=goal(),done=M.seq.length,heat=kind()==='heat',hh=Math.min(q(58),(b0-t0-q(30))/4-q(6)),maxW=A.W-q(150);
 M.bars=L.map((ly,i)=>{const y=t0+q(26)+i*(hh+q(6)),r={x:q(12),y,w:A.W-q(24),h:hh,i};const got=M.seq.includes(i);panel(r.x,y,r.w,hh,got?Z.okBg:'#ffffff',got?Z.ok:Z.line,2);put(ly[0],r.x+q(10),y+hh/2-(heat?q(9):0),13,Z.ink,900,'left');
  if(heat)put(got?ly[5]:'?',r.x+q(10),y+hh/2+q(10),11,Z.sub,700,'left');else{const w=Math.max(2,maxW*ly[2]/2900);X.fillStyle=ly[4];X.fillRect(r.x+q(110),y+hh/2-q(8),w,q(16));X.strokeStyle=Z.line;X.lineWidth=1;X.strokeRect(r.x+q(110),y+hh/2-q(8),w,q(16));if(got)put(ly[2].toLocaleString('en-GB')+' km'+(i===3?' to the centre':''),r.x+r.w-q(8),y+hh-q(9),11,Z.sub,800,'right')}
  if(got)put(String(M.seq.indexOf(i)+1),r.x+r.w-q(14),y+q(12),13,Z.ok,900);return r});
 put(heat?'Tap from coolest to hottest':'Tap from thinnest to thickest',A.W/2,t0+q(12),13,Z.sub,800)}
function tapBar(i){if(M.won||M.seq.includes(i))return;const want=goal()[M.seq.length],heat=kind()==='heat';
 if(i!==want){const n=L[i][0],w=L[want][0];return wrong(heat?`Not yet. The ${w.toLowerCase()} is cooler than the ${n.toLowerCase()}. It gets hotter the deeper you go.`:`The ${w.toLowerCase()} is thinner than the ${n.toLowerCase()}. Look at the bars: ${L[want][2].toLocaleString('en-GB')} km.`)}
 M.seq.push(i);A.sound.tick();right(heat?`${L[i][0]}: ${L[i][5]}.`:`${L[i][0]}: about ${L[i][2].toLocaleString('en-GB')} km thick.`);
 if(M.seq.length===4){M.won=true;M.msg=heat?'Hotter and hotter towards the centre.':'The crust is by far the thinnest: like the skin on an apple.'}sync()}
/* step 5: solid or liquid */
function drawState(t0,b0){const left=[0,1,2,3].filter(i=>!M.sorted.has(i));M.cur=left.length?left[0]:-1;earth(t0+q(64),b0-q(70),{names:M.sorted});
 const w=(A.W-q(40))/2,h=q(56),y=b0-h;M.bins=['Solid','Liquid'].map((n,i)=>{const r={x:q(14)+i*(w+q(12)),y,w,h,i};panel(r.x,y,w,h,i?'#fef9c3':'#ffedd5',Z.line,2);put(n,r.x+w/2,y+h/2,16,Z.ink,900);return r});
 if(M.cur>=0){const cw=Math.min(q(200),A.W*.6);panel(A.W/2-cw/2,t0+q(10),cw,q(40),'#ffffff',Z.line,2.5);put('Is the '+L[M.cur][0].toLowerCase()+'…',A.W/2,t0+q(30),15,Z.ink,900)}}
function solid(bin){if(M.won||M.cur<0)return;const i=M.cur,isSolid=L[i][3]===1;if((bin===0)!==isSolid){const fix=['The crust is solid rock: we stand on it.','The mantle is mostly solid rock. It is hot and creeps very slowly, but it is not liquid.','The outer core is liquid metal. It flows.','The inner core is the hottest part, but it is squeezed so hard that it stays solid metal.'][i];return wrong(fix)}
 M.sorted.add(i);A.sound.tick();right(`${L[i][0]}: ${isSolid?'solid':'liquid'}.`);if(M.sorted.size===4){M.won=true;M.msg='Only the outer core is liquid. The mantle is solid rock that creeps slowly.'}sync()}
/* step 6: children */
function drawKids(t0,b0){const [stem,kids]=KIDS[Math.min(M.round,2)];put(stem,A.W/2,t0+q(20),18,Z.ink,900);const h=Math.min(q(74),(b0-t0-q(44))/3-q(6));
 M.kid=kids.map((k,i)=>{const r={x:q(16),y:t0+q(40)+i*(h+q(6)),w:A.W-q(32),h,i};panel(r.x,r.y,r.w,h,'#ffffff',Z.line,2);X.fillStyle=['#fecaca','#c7d2fe','#fde68a'][i];X.beginPath();X.arc(r.x+q(26),r.y+h/2,q(15),0,7);X.fill();
  put(k[0],r.x+q(26),r.y+h/2,11,Z.ink,800);const T=brk(k[1],r.w-q(70),13);T.forEach((ln,j)=>put(ln,r.x+q(52),r.y+h/2+(j-(T.length-1)/2)*q(17),13,Z.ink,700,'left'));return r})}
function judge(i){if(M.won)return;const k=KIDS[M.round][1][i];if(k[2])return wrong(`${k[0]} is not right. ${k[2]}`);right(`${k[0]} is right: ${KIDS[M.round][0].replace('…','')} ${k[1]}`);M.round++;if(M.round===KIDS.length){M.won=true;M.msg='Thin crust, thick hot mantle, metal core.'}sync()}
function draw(){X.fillStyle=A.col.dark?'#1f2937':Z.bg;X.fillRect(0,0,A.W,A.H);X.fillStyle=Z.bg;A.paint.rrect(5,5,A.W-10,A.H-10,16);X.fill();
 const k=kind(),H={drill:['Drag the drill down to the centre of Earth.','You reached the centre!'],label:['Drag the name onto its layer, or tap the layer.','All four layers named.'],thick:['How thick is each layer?','Crust: thinnest by far.'],heat:['Which layer is hottest?','Hottest at the centre.'],
  state:['Solid or liquid? Tap a box.','Only the outer core is liquid.'],kids:['Who is right? Tap them.','Facts checked.'],quiz:['Crust, mantle, outer core, inner core.','']};
 const t=lead(M.won?H[k][1]:H[k][0],M.won),bot=A.H-(M.msg?q(70):q(12));
 if(k==='drill')drawDrill(t+q(24),bot);if(k==='label')drawLabel(t,bot);if(k==='thick'||k==='heat')drawBars(t,bot);if(k==='state')drawState(t,bot);if(k==='kids')drawKids(t+q(4),bot);
 if(k==='quiz'){M.names=new Set([0,1,2,3]);earth(t+q(20),bot,{names:M.names})}said();A.fx.draw(X)}
let p0=null;
function down(p){const k=kind();p0=p;if(M.won&&k!=='quiz')return false;
 if(k==='drill'&&inR(p,M.bit)){M.drag={x:p.x,y:p.y};return true}
 if(k==='label'){if(inR(p,M.card)){M.drag={x:p.x,y:p.y};A.redraw();return true}const at=layerAt(p);if(at>=0){label(at);return true}}
 if(k==='thick'||k==='heat'){const r=(M.bars||[]).find(b=>inR(p,b));if(r){tapBar(r.i);return true}}
 if(k==='state'){const r=(M.bins||[]).find(b=>inR(p,b));if(r){solid(r.i);return true}}
 if(k==='kids'){const r=(M.kid||[]).find(b=>inR(p,b));if(r){judge(r.i);return true}}
 return false}
function move(p){if(!M.drag)return;M.drag.x=p.x;M.drag.y=p.y;if(kind()==='drill'&&M.geo){const g=M.geo;dig((p.y-(g.cy-g.R))/g.R);return}A.redraw()}
function up(p){const d=M.drag;M.drag=null;if(!d)return;if(kind()==='label'){const at=layerAt(p);if(at>=0)label(at);else A.redraw()}}
function sync(){const k=kind();let d='Challenge.';
 if(k==='drill')d=`Drill ${(Math.round(km(M.depth)/5)*5).toLocaleString('en-GB')} km down. Layers reached: ${[...M.seen].sort().map(i=>L[i][0]).join(', ')||'none yet'}.`;
 if(k==='label'){const left=LABELS.filter(i=>!M.names.has(i));d=M.won?'All four named.':`Name to place: ${L[left[0]][0]}. Named: ${[...M.names].map(i=>L[i][0]).join(', ')||'none'}.`}
 if(k==='thick'||k==='heat')d=M.won?'All four in order.':`Order so far: ${M.seq.map(i=>L[i][0]).join(', ')||'none'}.`+(k==='thick'?' Thickness bars: '+L.map(l=>l[0]+' '+l[2]+' km').join(', ')+'.':'');
 if(k==='state'){const left=[0,1,2,3].filter(i=>!M.sorted.has(i));d=M.won?'All four sorted.':`Layer: ${L[left[0]][0]}. Sorted: ${M.sorted.size} of 4.`}
 if(k==='kids')d=M.won?'All three checked.':`${KIDS[M.round][0]} `+KIDS[M.round][1].map(x=>x[0]+': '+x[1]).join(' ');
 aria((M.msg?M.msg+' ':'')+d);btns();M.after()}
function btns(){if(!pad)return;pad.innerHTML='';const k=kind(),b=(t,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},pad,t).onclick=()=>{fn();sync()}};
 if(!M.won){if(k==='drill')b('Drill deeper',()=>dig(M.depth+.15));
  if(k==='label')['Outside layer','Second layer','Third layer','Centre'].forEach((n,i)=>b('Put on: '+n,()=>label(i)));
  if(k==='thick'||k==='heat')L.forEach((l,i)=>{if(!M.seq.includes(i))b(l[0],()=>tapBar(i))});
  if(k==='state'){b('Solid',()=>solid(0));b('Liquid',()=>solid(1))}
  if(k==='kids')KIDS[M.round][1].forEach((x,i)=>b(x[0]+' is right',()=>judge(i)))}
 A.redraw()}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const run=(fns,ms)=>{const id=++gen;fns.forEach((f,j)=>setTimeout(()=>{if(id===gen){f();sync()}},(j+1)*(A.reduced()?50:ms)))};
function clean(){gen++;Object.assign(M,{after:()=>{},won:false,msg:'',bad:false,drag:null,round:0,depth:0,seen:new Set(),names:new Set(),seq:[],sorted:new Set(),cur:0})}
const steps=[
{h:'Drill down',p:'Under our feet is the crust, the rocky outside of Earth. What is under that? Drill all the way to the centre.',
predict:{q:'What is under Earth’s crust?',opts:['An empty space','Very hot rock','Water all the way down'],ans:1},
task:'Drill to the centre of Earth',show:()=>{steps[0].go();run([1,2,3,4,5,6,7].map(()=>()=>dig(M.depth+.15)),280)},go:()=>{clean();sync();M.after=ready(0,()=>M.won,'Four layers on the way down.')}},
{h:'Name the layers',p:'Earth has three main layers: the crust, the mantle and the core. The core has two parts, the outer core and the inner core.',
predict:{q:'Which layer is at the very centre?',opts:['The crust','The mantle','The inner core'],ans:2},
task:'Put all 4 names on their layers',show:()=>{steps[1].go();run(LABELS.map(()=>()=>label(LABELS.find(i=>!M.names.has(i)))),400)},go:()=>{clean();sync();M.after=ready(1,()=>M.won,'All four named.')}},
{h:'How thick?',p:'The picture made the crust thick so you could see it. Here are the real sizes. Earth is about 6,371 km from the outside to the centre.',
predict:{q:'Which layer is the thinnest?',opts:['The mantle','The crust','The inner core'],ans:1},
task:'Tap the layers from thinnest to thickest',show:()=>{steps[2].go();run([0,3,2,1].map(i=>()=>tapBar(i)),350)},go:()=>{clean();sync();M.after=ready(2,()=>M.won,'Thinnest to thickest.')}},
{h:'Hotter and hotter',p:'The deeper you go, the hotter it gets. The inside of Earth is hot enough to melt rock.',
predict:{q:'Where is Earth hottest?',opts:['At the crust','Halfway down','At the centre'],ans:2},
task:'Tap the layers from coolest to hottest',show:()=>{steps[3].go();run([0,1,2,3].map(i=>()=>tapBar(i)),350)},go:()=>{clean();sync();M.after=ready(3,()=>M.won,'Coolest to hottest.')}},
{h:'Solid or liquid?',p:'The mantle is very hot rock, but it is mostly solid. It moves very, very slowly. Which layer is really liquid?',
task:'Sort all 4 layers',show:()=>{steps[4].go();run([0,1,2,3].map(i=>()=>solid(L[i][3]?0:1)),380)},go:()=>{clean();sync();M.after=ready(4,()=>M.won,'Only the outer core is liquid.')}},
{h:'Check the facts',p:'Three children talk about Earth’s layers. Only one is right each time.',
task:'Find who is right 3 times',show:()=>{steps[5].go();run(KIDS.map(()=>()=>judge(KIDS[M.round][1].findIndex(x=>!x[2]))),450)},go:()=>{clean();sync();M.after=ready(5,()=>M.won,'Facts checked.')}},
{h:'Challenge',p:'',go:()=>{clean();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>M.after()});
let row=0;
function ask(){qa++;const [qq,ok,bad]=QZ[qa%QZ.length],all=[[ok,'ok']].concat(bad),r=qa%3,ord=all.slice(r).concat(all.slice(0,r));
 box.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=box.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},g,w).onclick=()=>grade(tag,ok)});aria('Challenge: '+qq);A.redraw()}
function grade(tag,ok){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),good=tag==='ok';let m=WHY[tag]||'Crust, mantle, outer core, inner core: thin, thick, liquid, solid.';
 if(tag==='lava')m='Not a sea of lava. The mantle is mostly solid rock that is so hot it creeps very slowly.';
 if(tag==='squeeze')m='The inner core is solid: it is squeezed so hard it cannot melt. The outer core is the liquid metal.';
 if(tag==='thick')m='The crust is the thinnest layer, only about 35 km. The mantle is about 2,900 km thick.';
 if(good){row++;A.win()}else{row=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Yes: '+ok+'. In a row: '+row+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:B=>{box.hidden=B.step!==6;pad.hidden=B.step===6;btns()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Earth layers lab buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
