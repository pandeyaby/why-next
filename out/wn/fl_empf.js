/* Flagship – empirical formula from percentage composition (ages 16–18; AQA 7405 3.1.2.3, OCR A H432 2.1.3).
   Scenes: divide each mass in 100 g by the right Ar (atomic number and O₂ chips are traps); tap the smallest amount of
   moles to divide by; drag a multiplier until a ratio such as 1 : 1.5 becomes whole numbers; build a formula with arrows
   and watch its mass percentages meet the data; check a robot. Data in learn/empf_art.js. Distinct from flagformula
   (molecular, structural and displayed formulae): this lab turns measured mass percentages into an atom ratio. */
(()=>{const E=EMPF;
VIS.reg('flagempf',c=>{let A,pad,quiz,turn=-1,epoch=0,grip=false;const S={};
const INK='#0f172a',SOFT='#475569',YES='#15803d',NO='#b91c1c',RIM='#94a3b8',BENCH='#f0f9ff',MOLC='#2563eb',MASSC='#a8a29e',FT='px system-ui,sans-serif';
const scene=()=>['divide','small','whole','build','robot','quiz'][A.step];
const px=n=>A.narrow?n:Math.round(n*1.15),r2=v=>(Math.round(v*100)/100).toFixed(2),r3=v=>v.toPrecision(3);
const SUBS='₀₁₂₃₄₅₆₇₈₉',sub=n=>n===1?'':String(n).split('').map(d=>SUBS[d]).join('');
const formula=(els,ns)=>els.map(([e],k)=>e+sub(ns[k])).join('');
const moles=els=>els.map(([e,p])=>p/E.AR[e]);
const box=(p,b)=>!!b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
function bench(){const g=A.ctx;g.fillStyle=BENCH;g.fillRect(0,0,A.W,A.H);g.fillStyle='#e0f2fe';g.fillRect(0,A.H*.97,A.W,A.H*.03)}
/* a white rounded note with dark text, shrunk to fit */
function note(t,x,y,o){o=o||{};const g=A.ctx;let f=px(o.n||14);g.font=`700 ${f}${FT}`;while(g.measureText(t).width+20>A.W-8&&f>10){f--;g.font=`700 ${f}${FT}`}
 const w=g.measureText(t).width+20,h=f+13,l=Math.max(4,Math.min(A.W-w-4,x-w/2));g.fillStyle='#ffffff';A.paint.rrect(l,y-h/2,w,h,7);g.fill();
 g.lineWidth=o.ok||o.no?3:1.3;g.strokeStyle=o.ok?YES:o.no?NO:RIM;g.stroke();g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,l+w/2,y+1)}
function panel(b,o){o=o||{};const g=A.ctx;g.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':'#ffffff';A.paint.rrect(b.x,b.y,b.w,b.h,9);g.fill();g.lineWidth=o.no||o.ok?3:1.3;g.strokeStyle=o.no?NO:o.ok?YES:RIM;g.stroke()}
function words(t,x,y,f,col,wt){const g=A.ctx;g.fillStyle=col||INK;g.font=`${wt||700} ${px(f)}${FT}`;g.textAlign='center';g.textBaseline='middle';g.fillText(t,x,y)}
const cols=n=>{const gap=8,w=(A.W-16-gap*(n-1))/n;return[...Array(n)].map((_,k)=>({k,x:8+k*(w+gap),w}))};
/* 1. divide each mass by the right number; atomic numbers print as whole numbers, masses to 1 d.p. */
const chipTxt=(e,j)=>{const [v,t]=E.CHIPS[e][j];return t==='z'?String(v):v.toFixed(1)};
const chipBoxes=(e,col)=>E.CHIPS[e].map((ch,j)=>({j,x:col.x+4,y:A.H*(.44+j*.105),w:col.w-8,h:A.H*.09}));
function drawDivide(){const s=S.divide;bench();if(s.i>=E.DIVIDE.length){note('Both compounds done',A.W/2,A.H*.14,{ok:1});note('moles = mass ÷ Ar',A.W/2,A.H*.3,{n:14});return}
 const D=E.DIVIDE[s.i],g=A.ctx,mol=moles(D.els),top=Math.max(...mol);note(`${D.name}, per 100 g: divide each mass by …`,A.W/2,A.H*.07,{n:13});
 cols(D.els.length).forEach((col,k)=>{const [e,p]=D.els[k],got=s.got[k];panel({x:col.x,y:A.H*.15,w:col.w,h:A.H*.25},{ok:got});words(e,col.x+col.w/2,A.H*.21,22,INK,900);words(`${p.toFixed(1)} g`,col.x+col.w/2,A.H*.29,13);
  words(got?`= ${r3(mol[k])} mol`:'÷ ?',col.x+col.w/2,A.H*.36,12,got?YES:SOFT,800);
  if(!got)chipBoxes(e,col).forEach(b=>{const [v,t]=E.CHIPS[e][b.j];panel(b,{no:s.miss[k]===b.j});words(chipTxt(e,b.j),b.x+b.w/2,b.y+b.h/2,14,INK,800)});
  const base=A.H*.93,hh=A.H*.22,bw=Math.min(22,col.w*.18);g.fillStyle=MASSC;g.fillRect(col.x+col.w/2-bw-3,base-hh*p/100,bw,hh*p/100);
  if(got){g.fillStyle=MOLC;g.fillRect(col.x+col.w/2+3,base-hh*mol[k]/top,bw,hh*mol[k]/top)}words('g  mol',col.x+col.w/2,base+A.H*.025,10,SOFT)})}
function divideTap(k,j){const s=S.divide;if(s.i>=E.DIVIDE.length||s.got[k])return;const D=E.DIVIDE[s.i],[e,p]=D.els[k],[v,t]=E.CHIPS[e][j];
 if(t!=='ok'){s.miss[k]=j;A.sound.miss();let m=`${v.toFixed(1)} is the Mr of the ${e} molecule, but the compound holds single ${e} atoms.`;if(t==='z')m=`${v} is the atomic number of ${e}: it counts protons, not mass.`;return say(`${m} Divide by the Ar of ${e}, ${E.AR[e].toFixed(1)}.`)}
 s.got[k]=true;s.miss[k]=-1;A.sound.tick();const mol=moles(D.els);
 if(s.got.filter(Boolean).length<D.els.length)return say(`${e}: ${p.toFixed(1)} ÷ ${E.AR[e].toFixed(1)} = ${r3(mol[k])} mol.`);
 s.i++;s.got=[];s.miss=[];A.sound.pop();say(`Moles: ${D.els.map(([x],q)=>`${x} ${r3(mol[q])}`).join(', ')}. The masses differed, but these are atom amounts. Formula to come: ${D.f}.`+(s.i<E.DIVIDE.length?' Next compound.':''))}
/* 2. divide by the smallest */
const barCols=n=>cols(n).map(col=>({...col,y:A.H*.2,h:A.H*.62}));
function drawSmall(){const s=S.small;bench();if(s.i>=E.SMALL.length){note('All 3 divided by the smallest',A.W/2,A.H*.14,{ok:1});note('The smallest becomes 1',A.W/2,A.H*.3,{n:14});return}
 const R=E.SMALL[s.i],mol=moles(R.els),top=Math.max(...mol),g=A.ctx;note(`${s.i+1} of ${E.SMALL.length}: ${R.name}. Tap the amount to divide by`,A.W/2,A.H*.07,{n:13});
 barCols(R.els.length).forEach((b,k)=>{panel(b,{no:s.miss===k});const h=(b.h-A.H*.16)*mol[k]/top,bw=Math.min(54,b.w*.45);g.fillStyle=MOLC;g.fillRect(b.x+b.w/2-bw/2,b.y+b.h-A.H*.08-h,bw,h);
  words(`${r3(mol[k])} mol`,b.x+b.w/2,b.y+b.h-A.H*.04,12);words(R.els[k][0],b.x+b.w/2,b.y+A.H*.05,18,INK,900)});
 if(s.res)note(s.res,A.W/2,A.H*.9,{n:12,no:1})}
function smallTap(k){const s=S.small;if(s.i>=E.SMALL.length)return;const R=E.SMALL[s.i],mol=moles(R.els),lo=Math.min(...mol),by=mol[k],q=mol.map(v=>r2(v/by)),txt=R.els.map(([e],j)=>`${e} ${q[j]}`).join(' : ');
 if(by>lo+1e-9){s.miss=k;s.res=txt;A.sound.miss();return say(`Dividing by ${R.els[k][0]} gives ${txt}: some numbers fall below 1. Divide by the smallest amount so the smallest becomes 1.`)}
 s.miss=-1;s.res='';s.i++;A.sound.pop();say(`Divide by the smallest, ${r3(lo)} mol: ${txt}.`+(s.i<E.SMALL.length?' Next one.':''))}
/* 3. scale to whole numbers with a multiplier knob from ×1 to ×6 */
const track=()=>({x:A.W*.12,y:A.H*.86,w:A.W*.76});
const notchX=m=>{const T=track();return T.x+T.w*(m-1)/5};
const ratioOf=R=>{const mol=moles(R.els),lo=Math.min(...mol);return mol.map(v=>v/lo)};
const isWhole=v=>Math.abs(v-Math.round(v))<=.1;
function drawWhole(){const s=S.whole,g=A.ctx;bench();if(s.i>=E.WHOLE.length){note('All 3 ratios made whole',A.W/2,A.H*.14,{ok:1});note('Multiply, never round a half',A.W/2,A.H*.3,{n:14});return}
 const R=E.WHOLE[s.i],q=ratioOf(R).map(v=>v*s.m),top=Math.max(8,...q);note(`${s.i+1} of ${E.WHOLE.length}: make ${R.els.map(([e],k)=>`${e} ${r2(ratioOf(R)[k])}`).join(' : ')} whole`,A.W/2,A.H*.07,{n:13});
 const base=A.H*.7,hh=A.H*.52;g.strokeStyle='#cbd5e1';g.lineWidth=1;g.setLineDash([4,4]);for(let n=1;n<=top;n++){const y=base-hh*n/top;g.beginPath();g.moveTo(8,y);g.lineTo(A.W-8,y);g.stroke()}g.setLineDash([]);
 cols(q.length).forEach((col,k)=>{const h=hh*q[k]/top,bw=Math.min(60,col.w*.4),w=isWhole(q[k]);g.fillStyle=w?YES:MOLC;g.fillRect(col.x+col.w/2-bw/2,base-h,bw,h);
  note(`${R.els[k][0]} ${r2(q[k])}`,col.x+col.w/2,base+A.H*.05,{n:12,ok:w})});
 const T=track();g.fillStyle='#cbd5e1';g.fillRect(T.x,T.y-3,T.w,6);for(let m=1;m<=6;m++)words(`×${m}`,notchX(m),T.y+A.H*.06,11,SOFT);
 g.fillStyle='#ffffff';g.beginPath();g.arc(notchX(s.m),T.y,px(13),0,Math.PI*2);g.fill();g.lineWidth=3;g.strokeStyle=MOLC;g.stroke();words(`×${s.m}`,notchX(s.m),T.y,11,INK,900)}
function setMult(m){const s=S.whole;s.m=Math.max(1,Math.min(6,Math.round(m)));const R=E.WHOLE[s.i];if(!R)return;A.cv.setAttribute('aria-label',`Multiplier ${s.m}: `+ratioOf(R).map((v,k)=>`${R.els[k][0]} ${r2(v*s.m)}`).join(', '));A.redraw()}
function lockIn(){const s=S.whole;if(s.i>=E.WHOLE.length)return;const R=E.WHOLE[s.i],q=ratioOf(R).map(v=>v*s.m),ns=q.map(Math.round);
 if(!q.every(isWhole)){A.sound.miss();const rf=formula(R.els,ratioOf(R).map(Math.round)),tot=R.els.reduce((a,[e],k)=>a+E.AR[e]*Math.round(ratioOf(R)[k]),0),pc=100*E.AR[R.els[0][0]]*Math.round(ratioOf(R)[0])/tot;
  let m=`× ${s.m} gives ${q.map(r2).join(' : ')}, not whole numbers yet. Try a bigger multiplier.`;
  if(s.m===1)m=`Rounding now would give ${rf}, which is ${pc.toFixed(1)}% ${R.els[0][0]}, but the data say ${R.els[0][1]}%. A ratio like 1.5 or 2.67 is a fraction: multiply instead.`;return say(m)}
 if(s.m!==R.best){A.sound.miss();return say(`${ns.join(' : ')} is whole, but every number shares a factor. The empirical formula is the simplest ratio: use × ${R.best}.`)}
 s.i++;s.m=1;A.sound.pop();say(`Locked in: × ${R.best} gives ${ns.join(' : ')}, so the empirical formula is ${formula(R.els,ns)}.`+(s.i<E.WHOLE.length?' Next ratio.':''))}
const wholeStep=()=>{const s=S.whole,R=E.WHOLE[s.i];if(!R)return;if(s.m<R.best)setMult(s.m+1);else lockIn()};
/* 4. build a formula with arrows and compare mass percentages */
const arrows=n=>cols(n).map(col=>({col,up:{x:col.x+4,y:A.H*.14,w:col.w-8,h:A.H*.1},down:{x:col.x+4,y:A.H*.38,w:col.w-8,h:A.H*.1}}));
const pctOf=(els,ns)=>{const tot=els.reduce((a,[e],k)=>a+E.AR[e]*ns[k],0);return els.map(([e],k)=>100*E.AR[e]*ns[k]/tot)};
const gcd=(a,b)=>b?gcd(b,a%b):a;
function drawBuild(){const s=S.build,g=A.ctx;bench();if(s.i>=E.BUILD.length){note('Both formulas built',A.W/2,A.H*.14,{ok:1});note('Your % matched the data',A.W/2,A.H*.3,{n:14});return}
 const B=E.BUILD[s.i],pc=pctOf(B.els,s.ns),fit=pc.every((v,k)=>Math.abs(v-B.els[k][1])<=.6);note(`${B.name}: ${formula(B.els,s.ns)}`,A.W/2,A.H*.06,{n:14,ok:fit&&s.ns.reduce(gcd)===1});
 arrows(B.els.length).forEach((a,k)=>{panel(a.up);words('▲',a.up.x+a.up.w/2,a.up.y+a.up.h/2,16,INK,900);panel(a.down);words('▼',a.down.x+a.down.w/2,a.down.y+a.down.h/2,16,INK,900);
  words(`${B.els[k][0]} × ${s.ns[k]}`,a.col.x+a.col.w/2,A.H*.31,17,INK,900);
  const base=A.H*.84,hh=A.H*.3,bw=Math.min(24,a.col.w*.2),ok=Math.abs(pc[k]-B.els[k][1])<=.6;g.fillStyle=MASSC;g.fillRect(a.col.x+a.col.w/2-bw-3,base-hh*B.els[k][1]/100,bw,hh*B.els[k][1]/100);
  g.fillStyle=ok?YES:MOLC;g.fillRect(a.col.x+a.col.w/2+3,base-hh*pc[k]/100,bw,hh*pc[k]/100);words(`data ${B.els[k][1].toFixed(1)}%`,a.col.x+a.col.w/2,base+A.H*.035,10,SOFT);words(`yours ${pc[k].toFixed(1)}%`,a.col.x+a.col.w/2,base+A.H*.085,10,ok?YES:MOLC,800)})}
function nudge(k,d){const s=S.build;if(s.i>=E.BUILD.length)return;const B=E.BUILD[s.i];s.ns[k]=Math.max(1,Math.min(8,s.ns[k]+d));A.sound.tick();
 const pc=pctOf(B.els,s.ns),fit=pc.every((v,j)=>Math.abs(v-B.els[j][1])<=.6),f=formula(B.els,s.ns);
 if(!fit)return say(`${f}: ${B.els.map(([e],j)=>`${e} ${pc[j].toFixed(1)}%`).join(', ')}. Data: ${B.els.map(([e,p])=>`${e} ${p.toFixed(1)}%`).join(', ')}.`);
 if(s.ns.reduce(gcd)>1){A.sound.miss();return say(`${f} matches the percentages, but ${s.ns.join(' : ')} shares a factor. The empirical formula is the simplest ratio.`)}
 s.i++;s.ns=[1,1,1];A.sound.pop();say(`${f} gives ${pc.map(v=>v.toFixed(1)+'%').join(', ')}: it matches the data.`+(s.i<E.BUILD.length?' Next compound.':''))}
function buildStep(){const s=S.build,B=E.BUILD[s.i];if(!B)return;const k=s.ns.findIndex((n,j)=>n!==B.want[j]);if(k>=0)nudge(k,s.ns[k]<B.want[k]?1:-1)}
/* 5. robot: right or slip */
const twin=()=>{const w=Math.min(170,(A.W-36)/2);return[0,1].map(k=>({i:k,t:k?'✗ Slip':'✓ Right',x:A.W/2+(k?6:-w-6),y:A.H*.7,w,h:Math.min(A.H*.17,60)}))};
function drawRobot(){const s=S.robot,g=A.ctx;bench();if(s.i>=E.ROBOT.length){note('All 6 claims checked',A.W/2,A.H*.16,{ok:1});return}
 const R=E.ROBOT[s.i],u=Math.min(A.W*.055,24),x=A.W/2,y=A.H*.17;g.fillStyle='#cbd5e1';A.paint.rrect(x-u,y-u,u*2,u*2,7);g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke();g.fillStyle=INK;g.fillRect(x-u*.5,y-u*.3,u*.25,u*.25);g.fillRect(x+u*.25,y-u*.3,u*.25,u*.25);
 note(R.say,A.W/2,A.H*.4,{n:12});note(`Claim ${s.i+1} of ${E.ROBOT.length}: right, or a slip?`,A.W/2,A.H*.55,{n:12});twin().forEach(b=>{panel(b,{no:s.miss===b.i});words(b.t,b.x+b.w/2,b.y+b.h/2,16,INK,800)})}
function judge(k){const s=S.robot;if(s.i>=E.ROBOT.length)return;const R=E.ROBOT[s.i];
 if((k===0)!==R.ok){s.miss=k;A.sound.miss();return say((R.ok?'Look again: it is right. ':'Look again: it is a slip. ')+R.fix)}
 s.miss=-1;s.i++;A.sound.pop();say((R.ok?'Yes, right. ':'Yes, a slip. ')+R.fix)}
function draw(){const k=scene();if(k==='quiz'){bench();note('Challenge',A.W/2,A.H*.25,{ok:1});note('% → g → mol → ÷ smallest → whole',A.W/2,A.H*.5,{n:13});return}
 ({divide:drawDivide,small:drawSmall,whole:drawWhole,build:drawBuild,robot:drawRobot})[k]();A.fx.draw(A.ctx)}
/* canvas input: taps on chips, bars, arrows and verdicts; a drag on the multiplier knob */
function onDown(p){const k=scene();grip=false;
 if(k==='divide'&&S.divide.i<E.DIVIDE.length){const D=E.DIVIDE[S.divide.i];cols(D.els.length).forEach((col,q)=>{if(S.divide.got[q])return;chipBoxes(D.els[q][0],col).forEach(b=>{if(box(p,b))divideTap(q,b.j)})})}
 else if(k==='small'&&S.small.i<E.SMALL.length){const b=barCols(E.SMALL[S.small.i].els.length).find(b=>box(p,b));if(b)smallTap(b.k)}
 else if(k==='whole'&&S.whole.i<E.WHOLE.length&&p.y>A.H*.76){grip=true;setMult(1+5*(p.x-track().x)/track().w);return true}
 else if(k==='build'&&S.build.i<E.BUILD.length){arrows(E.BUILD[S.build.i].els.length).forEach((a,q)=>{if(box(p,a.up))nudge(q,1);else if(box(p,a.down))nudge(q,-1)})}
 else if(k==='robot'){const b=twin().find(b=>box(p,b));if(b)judge(b.i)}
 return false}
function onMove(p){if(grip)setMult(1+5*(p.x-track().x)/track().w)}
function reset(){epoch++;grip=false;for(const k in S)delete S[k];Object.assign(S,{divide:{i:0,got:[],miss:[]},small:{i:0,miss:-1,res:''},whole:{i:0,m:1},build:{i:0,ns:[1,1,1]},robot:{i:0,miss:-1},hook:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.hook()}
/* buttons mirror every canvas action */
function buttons(){if(!pad)return;pad.innerHTML='';const k=scene(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='divide'&&S.divide.i<E.DIVIDE.length)E.DIVIDE[S.divide.i].els.forEach(([e],q)=>{if(!S.divide.got[q])E.CHIPS[e].forEach(([v],j)=>add(`${e} ÷ ${chipTxt(e,j)}`,()=>divideTap(q,j),`Divide the ${e} mass by ${chipTxt(e,j)}`))});
 if(k==='small'&&S.small.i<E.SMALL.length)E.SMALL[S.small.i].els.forEach(([e],q)=>add(`÷ ${e} amount`,()=>smallTap(q),`Divide every amount by the ${e} amount`));
 if(k==='whole'&&S.whole.i<E.WHOLE.length){add('× smaller',()=>setMult(S.whole.m-1),'Lower the multiplier');add('× bigger',()=>setMult(S.whole.m+1),'Raise the multiplier');add('Lock in',lockIn,'Lock in this ratio')}
 if(k==='build'&&S.build.i<E.BUILD.length)E.BUILD[S.build.i].els.forEach(([e],q)=>{add(`${e} +1`,()=>nudge(q,1),`One more ${e}`);add(`${e} −1`,()=>nudge(q,-1),`One less ${e}`)});
 if(k==='robot'&&S.robot.i<E.ROBOT.length){add('✓ Right',()=>judge(0),'The robot is right');add('✗ Slip',()=>judge(1),'The robot made a slip')}}
const settle=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,ok){reset();say(E.DESC[i]);S.hook=settle(i,ok,E.DONE[i])}
function demo(i,acts,ms){steps[i].go();const mine=epoch;acts.forEach((f,j)=>setTimeout(()=>{if(mine===epoch)f()},ms*(j+1)))}
const times=(n,f)=>[...Array(n)].map(()=>f);
const rightChip=()=>{const s=S.divide,D=E.DIVIDE[s.i];if(!D)return;const q=D.els.findIndex((_,j)=>!s.got[j]);if(q<0)return;divideTap(q,E.CHIPS[D.els[q][0]].findIndex(([,t])=>t==='ok'))};
const steps=[
{h:'Grams to moles',p:'Take 100 g, so each percentage becomes a mass in grams. Moles of atoms = mass ÷ relative atomic mass (Ar). Tap the right number to divide by.',
 predict:{q:'Compound X is 40.0% carbon and 53.3% oxygen by mass. Does it have more O atoms than C atoms?',opts:['Yes, more O atoms','No, about the same'],ans:1},task:'Convert both compounds',
 show:()=>demo(0,times(5,rightChip),450),go:()=>begin(0,()=>S.divide.i>=E.DIVIDE.length)},
{h:'Divide by the smallest',p:'Moles give the atom ratio, but the numbers are awkward. Divide every amount by the smallest so the smallest becomes 1.',task:'Divide all 3',
 show:()=>demo(1,E.SMALL.map(R=>()=>{const m=moles(R.els);smallTap(m.indexOf(Math.min(...m)))}),600),go:()=>begin(1,()=>S.small.i>=E.SMALL.length)},
{h:'Make whole numbers',p:'If a number ends in about .5, .33 or .67, it is a fraction, not error. Drag the multiplier knob until every bar sits on a whole number, then lock in.',
 predict:{q:'After dividing by the smallest, Fe : O is 1 : 1.50. What comes next?',opts:['Round to 1 : 2','Multiply both by 2'],ans:1},task:'Make all 3 ratios whole',
 show:()=>demo(2,times(10,wholeStep),300),go:()=>begin(2,()=>S.whole.i>=E.WHOLE.length)},
{h:'Build and check',p:'Check an answer by working back: build the formula and compare its mass percentages with the data. Tap the arrows to change each number of atoms.',task:'Build both formulas',
 show:()=>demo(3,times(12,buildStep),260),go:()=>begin(3,()=>S.build.i>=E.BUILD.length)},
{h:'Check the robot',p:'The robot makes claims about empirical formulae. Is each one right, or a slip?',task:'Check all 6 claims',
 show:()=>demo(4,E.ROBOT.map(R=>()=>judge(R.ok?0:1)),500),go:()=>begin(4,()=>S.robot.i>=E.ROBOT.length)},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.hook()});
const why=t=>E.SLIP[t]||E.SLIP.other;
function ask(){turn++;const Q=E.QS[turn%E.QS.length],all=[[Q.a,'ok'],...Q.o],r=turn%3,ord=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),yes=t==='ok';if(yes)A.win();else A.sound.miss();
 fb.innerHTML=(yes?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="lbtn sm">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(yes?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:x=>{quiz.hidden=x.step!==5;pad.hidden=x.step===5;buttons()},
 init:x=>{A=x;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Empirical formula lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down:onDown,move:onMove,up:()=>{grip=false}});buttons()}}).start()})})();
