/* Flagship: reading an infrared spectrum (ages 16–18; AQA A-level Chemistry 3.3.6.3 and OCR A 4.2.4 infrared spectroscopy:
   transmittance against wavenumber, absorptions as troughs, the fingerprint region below about 1500 cm⁻¹).
   Drag a cursor to read troughs, place the four wavenumber regions, tell alcohol, ketone and acid apart by trough shape,
   match an unknown to a reference by its fingerprint, and test claims against a spectrum. Every drag has a button. */
(()=>{
const Y={ink:'#111827',soft:'#374151',bg:'#fffdf8',rim:'#1f2937',line:'#1d4ed8',ref:'#b45309',cur:'#9f1239',ok:'#166534',okBg:'#dcfce7',bad:'#9f1239',tip:'#fff7ed',grid:'#e5e7eb',
 band:['#dbeafe','#ede9fe','#fef3c7','#dcfce7'],bandE:['#1e40af','#5b21b6','#92400e','#166534']};
const {SPEC,tAt,TARGETS,REG,REG_ORDER,KINDS,KIND_WHY,REFS,CLAIMS,Q,FIX}=IRREADART;
VIS.reg('flagirread',c=>{let A,X,pad,box,nq=-1,job=0;const R={after:()=>{}};
const q=n=>Math.round(n*(A.narrow?1:1.1));
const desc=m=>{c.say(m);A.cv.setAttribute('aria-label',m)};
function lab(t,x,y,n,col,wt,al){X.font=`${wt||700} ${q(n)}px system-ui,sans-serif`;X.fillStyle=col||Y.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(t),x,y)}
function fitLab(t,x,y,maxW,n,col,wt,al){let k=n;X.font=`${wt||700} ${q(k)}px system-ui,sans-serif`;while(k>8&&X.measureText(String(t)).width>maxW){k-=.5;X.font=`${wt||700} ${q(k)}px system-ui,sans-serif`}lab(t,x,y,k,col,wt,al)}
function brk(t,w,n){X.font=`700 ${q(n)}px system-ui,sans-serif`;const L=[];let cur='';for(const wd of String(t).split(' ')){const nx=cur?cur+' '+wd:wd;if(cur&&X.measureText(nx).width>w){L.push(cur);cur=wd}else cur=nx}L.push(cur);return L}
function pill(x,y,w,h,f,s,lw){A.paint.rrect(x,y,w,h,10);X.fillStyle=f;X.fill();if(s){X.lineWidth=lw||2;X.strokeStyle=s;X.stroke()}}
const within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function heading(t,won){const L=brk(t,A.W-44,14),lh=q(14)+4,h=Math.max(q(34),L.length*lh+12);pill(12,10,A.W-24,h,won?Y.okBg:Y.tip,won?Y.ok:Y.rim,2);L.forEach((r,i)=>lab(r,A.W/2,10+h/2+(i-(L.length-1)/2)*lh,14,won?Y.ok:Y.ink));return 10+h}
function status(){if(!R.msg)return;const L=brk((R.bad?'✗ ':'✓ ')+R.msg,A.W-48,13),lh=q(13)+5,h=L.length*lh+12,y=A.H-h-10;pill(12,y,A.W-24,h,'#ffffff',R.bad?Y.bad:Y.ok,3);L.forEach((r,i)=>lab(r,A.W/2,y+6+lh*(i+.5),13,R.bad?Y.bad:Y.ink))}
const fail=m=>{R.bad=true;R.msg=m;A.sound.miss();sync()};
const pass=m=>{R.bad=false;R.msg=m;A.sound.pop()};
const part=()=>['read','regions','shape','finger','claim','quiz'][A.step];
/* plot frame: wavenumber 4000 (left) to 500 (right), transmittance 0–100 % */
function frame(t0,b0){const L=q(44),Rr=A.W-q(16),T=t0+q(8),B=b0-q(34);R.plot={x:L,y:T,w:Rr-L,h:B-T};return R.plot}
/* the fingerprint step expands the scale below 1500 (as many printed spectra do below 2000) so close troughs can be told apart */
const split=()=>part()==='finger',vx=v=>split()?R.plot.x+(v>=1500?(4000-v)/2500*.35:.35+(1500-v)/1000*.65)*R.plot.w:R.plot.x+(4000-v)/3500*R.plot.w, ty=t=>R.plot.y+(100-t)/100*R.plot.h, xv=x=>{const f=(x-R.plot.x)/R.plot.w;return Math.round(split()?(f<=.35?4000-f/.35*2500:1500-(f-.35)/.65*1000):4000-f*3500)};
function axes(){const P=R.plot;X.strokeStyle=Y.grid;X.lineWidth=1;(split()?[4000,3000,1500,1000,500]:[4000,3000,2000,1500,1000,500]).forEach(v=>{X.beginPath();X.moveTo(vx(v),P.y);X.lineTo(vx(v),P.y+P.h);X.stroke();lab(v,vx(v),P.y+P.h+q(10),10,Y.soft,700)});
 [0,50,100].forEach(t=>{X.beginPath();X.moveTo(P.x,ty(t));X.lineTo(P.x+P.w,ty(t));X.stroke();lab(t,P.x-q(6),ty(t),10,Y.soft,700,'right')});
 X.strokeStyle=Y.rim;X.lineWidth=1.5;X.strokeRect(P.x,P.y,P.w,P.h);lab('Wavenumber / cm⁻¹',P.x+P.w/2,P.y+P.h+q(25),11,Y.soft,800);
 X.save();X.translate(q(11),P.y+P.h/2);X.rotate(-Math.PI/2);lab('Transmittance / %',0,0,10,Y.soft,800);X.restore()}
function trace(sp,col,dash,lw){X.strokeStyle=col;X.lineWidth=lw||2.2;X.setLineDash(dash||[]);X.beginPath();for(let v=4000;v>=500;v-=5){const x=vx(v),y=ty(tAt(sp,v));v===4000?X.moveTo(x,y):X.lineTo(x,y)}X.stroke();X.setLineDash([])}
function cursorLine(){const P=R.plot,x=vx(R.nu),t=Math.round(tAt(SPEC.propanone,R.nu));X.strokeStyle=Y.cur;X.lineWidth=2;X.beginPath();X.moveTo(x,P.y);X.lineTo(x,P.y+P.h);X.stroke();
 const tag=`${R.nu} cm⁻¹, ${t}%`;X.font=`800 ${q(12)}px system-ui,sans-serif`;const w=X.measureText(tag).width+12,bx=Math.max(P.x+2,Math.min(P.x+P.w-w-2,x-w/2));pill(bx,P.y+4,w,q(22),'#ffffff',Y.cur,1.5);lab(tag,bx+w/2,P.y+4+q(11),12,Y.cur,800)}
/* step 0: read troughs */
function setNu(v){if(R.won)return;R.nu=Math.max(500,Math.min(4000,Math.round(v)));const hit=TARGETS.find(([k,c])=>!R.got.includes(k)&&Math.abs(R.nu-c)<=25);
 if(hit){R.got.push(hit[0]);R.nu=hit[1];const t=Math.round(tAt(SPEC.propanone,hit[1]));pass(`Trough ${hit[0]}: ${hit[1]} cm⁻¹, ${t}% transmitted, so about ${100-t}% absorbed.`);if(R.got.length===3){R.won=true;R.msg='Read the wavenumber at the bottom of each trough. The deepest, at 1715, is the C=O.'}}sync()}
/* step 1: regions */
function placeRegion(i){if(R.won)return;const want=REG_ORDER[R.i];if(i!==want)return fail(`“${REG[want][0]}” does not go at ${REG[i][1]}–${REG[i][2]}. ${want===0?'Light H atoms vibrate fastest, so bonds to H are at the highest wavenumbers.':want===1?'Triple bonds are the stiffest bonds without H: 2500–2000.':want===2?'Double bonds come after triple bonds: 2000–1500.':'Below 1500 many bonds absorb together: that is the fingerprint region.'}`);
 R.placed.push(want);R.i++;pass(`${REG[want][0]}: ${REG[want][1]}–${REG[want][2]} cm⁻¹.`);if(R.i===REG.length){R.won=true;R.msg='Bonds to H, then triple, then double, then the fingerprint region.'}sync()}
/* step 2: kinds */
function nameKind(k){if(R.won)return;const sp=KINDS[R.i][0];if(k!==sp)return fail(KIND_WHY[sp].replace(/: an alcohol\.|: a ketone\.|: a carboxylic acid\./,'.')+' Look again at the shape of each trough.');pass(KIND_WHY[sp]);R.i++;if(R.i===KINDS.length){R.won=true;R.msg='Broad O–H: alcohol. Sharp C=O alone: ketone. Very broad O–H plus C=O: acid.'}sync()}
/* step 3: fingerprint */
function tryRef(k){if(R.won)return;R.ref=k;if(k!=='prop2'){R.tried.add(k);return fail(k==='ethanol'?'Ethanol’s fingerprint has a big C–O trough near 1050 and no pair at 1380/1368. The unknown does not match below 1500.':'Above 1500 propan-1-ol fits well. Below 1500 it does not: its C–O trough is near 1060, the unknown’s is near 1130.')}
 pass('Every trough below 1500 lines up: 1380, 1368, 1130, 950 and 818. The unknown is propan-2-ol.');R.won=true;sync()}
/* step 4: claims */
function judgeClaim(yes){if(R.won)return;const [,, truth,why]=CLAIMS[R.i];if(yes!==truth)return fail(why);pass(why);R.i++;if(R.i===CLAIMS.length){R.won=true;R.msg='Check every claim against the trough’s position, shape and depth.'}sync()}
function draw(){X.fillStyle=A.col.dark?'#1f2937':Y.bg;X.fillRect(0,0,A.W,A.H);X.fillStyle=Y.bg;A.paint.rrect(5,5,A.W-10,A.H-10,16);X.fill();
 const k=part(),H={read:['Drag the red cursor to the bottom of troughs A, B and C.','All three troughs read.'],regions:['Drop the label on its region. Tap a band or drag.','Regions placed.'],shape:['Which kind of compound is this?','Shapes read.'],
  finger:['Unknown in blue. Tap a reference to lay it on top.','Fingerprint matched.'],claim:['Is the claim right? Use the spectrum.','Claims checked.'],quiz:['Read position, shape and depth.','']};
 const t=heading(H[k][R.won?1:0]||H[k][0],R.won),bot=A.H-(R.msg?q(74):q(12));
 if(k==='quiz'){brk('Absorptions are troughs. Wavenumber runs from 4000 on the left to 500 on the right. Bonds to H sit above 2500; C=O near 1700; the fingerprint region below 1500 identifies the compound.',A.W-q(40),15).forEach((r,i)=>lab(r,A.W/2,t+q(30)+i*q(24),15,Y.soft,700));status();A.fx.draw(X);return}
 const top=k==='regions'||k==='shape'||k==='finger'||k==='claim'?t+q(40):t;frame(top,bot);
 if(k==='regions'){REG.forEach((g,i)=>{const x0=vx(g[1]),x1=vx(g[2]),done=R.placed.includes(i);X.fillStyle=Y.band[i];X.fillRect(x0,R.plot.y,x1-x0,R.plot.h);if(done)fitLab(g[3],(x0+x1)/2,R.plot.y+q(14),x1-x0-4,12,Y.bandE[i],900)});
  R.bandR=REG.map((g,i)=>({x:vx(g[1]),y:R.plot.y,w:vx(g[2])-vx(g[1]),h:R.plot.h,i}))}
 axes();
 if(k==='read'){trace(SPEC.propanone,Y.line);TARGETS.forEach(([n,cv])=>{const x=vx(cv),y=ty(tAt(SPEC.propanone,cv)),got=R.got.includes(n);pill(x-q(11),y+q(6),q(22),q(20),got?Y.okBg:'#ffffff',got?Y.ok:Y.rim,1.5);lab(n,x,y+q(16),11,got?Y.ok:Y.ink,900)});cursorLine()}
 if(k==='regions'&&R.i<REG.length){const g=REG[REG_ORDER[R.i]],w=Math.min(A.W-q(40),q(300)),d=R.drag,x=d?d.x-w/2:(A.W-w)/2,y=d?d.y-q(17):t+q(4);R.cardR={x:(A.W-w)/2,y:t+q(4),w,h:q(32)};pill(x,y,w,q(32),'#ffffff',Y.rim,2.5);fitLab(g[0],x+w/2,y+q(16),w-12,13,Y.ink,800)}
 if(k==='shape'){const sp=SPEC[KINDS[Math.min(R.i,2)][0]];trace(sp,Y.line);lab(`Spectrum ${Math.min(R.i+1,3)} of 3`,A.W/2,t+q(20),13,Y.soft,800);
}
 if(k==='finger'){X.fillStyle='rgba(22,101,52,.10)';X.fillRect(vx(1500),R.plot.y,vx(500)-vx(1500),R.plot.h);lab('fingerprint region, scale expanded',(vx(1500)+vx(500))/2,R.plot.y+R.plot.h-q(10),10,Y.ok,800);trace(SPEC.prop2,Y.line,null,2.4);if(R.ref)trace(SPEC[R.ref],Y.ref,[6,4],2);
  const w=(A.W-q(40))/3;R.refR=REFS.map((key,j)=>{const r={x:q(14)+j*(w+q(6)),y:t+q(4),w,h:q(30),key},sel=R.ref===key;pill(r.x,r.y,w,r.h,sel?'#fef3c7':'#ffffff',sel?Y.ref:Y.rim,sel?3:1.5);fitLab(SPEC[key].name,r.x+w/2,r.y+r.h/2,w-8,12,Y.ink,800);return r})}
 if(k==='claim'){const cl=CLAIMS[Math.min(R.i,3)],sp=SPEC[cl[0]];trace(sp,Y.line);brk(`${sp.name}: ${cl[1]}`,A.W-q(40),13).forEach((r,i)=>lab(r,A.W/2,t+q(14)+i*q(17),13,Y.ink,800))}
 status();A.fx.draw(X)}
let p0=null;
function down(p){const k=part();p0=p;if(R.won)return false;
 if(k==='read'&&within(p,R.plot)){R.slide=true;setNu(xv(p.x));return true}
 if(k==='regions'){if(within(p,R.cardR)){R.drag={x:p.x,y:p.y};A.redraw();return true}const b=(R.bandR||[]).find(r=>within(p,r));if(b){placeRegion(b.i);return true}}
 if(k==='finger'){const r=(R.refR||[]).find(z=>within(p,z));if(r){tryRef(r.key);return true}}
 return false}
function move(p){if(R.slide)setNu(xv(p.x));if(R.drag){R.drag.x=p.x;R.drag.y=p.y;A.redraw()}}
function up(p){R.slide=false;if(R.drag){R.drag=null;const b=(R.bandR||[]).find(r=>within(p,r));if(b)placeRegion(b.i);else A.redraw()}}
function sync(){const k=part();let d='Challenge.';
 if(k==='read')d=`Propanone spectrum. Cursor at ${R.nu} cm⁻¹, transmittance ${Math.round(tAt(SPEC.propanone,R.nu))}%. Troughs read: ${R.got.join(', ')||'none'} of A, B, C.`;
 if(k==='regions')d=R.won?'All four regions placed.':`Label: ${REG[REG_ORDER[R.i]][0]}. Bands: 4000–2500, 2500–2000, 2000–1500, 1500–500.`;
 if(k==='shape')d=R.won?'All three named.':`Spectrum ${R.i+1} of 3. Troughs: ${SPEC[KINDS[R.i][0]].T.filter(t=>t[2]>=40).map(t=>`${t[0]} cm⁻¹ ${t[1]>60?'very broad':t[1]>25?'broad':'sharp'}`).join('; ')}.`;
 if(k==='finger')d=`Unknown spectrum with troughs at ${SPEC.prop2.T.map(t=>t[0]).join(', ')} cm⁻¹. ${R.ref?'Overlay: '+SPEC[R.ref].name+', troughs at '+SPEC[R.ref].T.map(t=>t[0]).join(', ')+'.':'No overlay.'}`;
 if(k==='claim')d=R.won?'All claims checked.':`${SPEC[CLAIMS[R.i][0]].name} spectrum, troughs at ${SPEC[CLAIMS[R.i][0]].T.map(t=>t[0]).join(', ')} cm⁻¹. Claim: ${CLAIMS[R.i][1]}`;
 desc((R.msg?R.msg+' ':'')+d);keys();R.after()}
function keys(){if(!pad)return;pad.innerHTML='';const k=part(),b=(t,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},pad,t).onclick=()=>{fn();sync()}};if(R.won)return A.redraw();
 if(k==='read'){b('← 100 cm⁻¹',()=>setNu(R.nu+100));b('100 cm⁻¹ →',()=>setNu(R.nu-100));b('← 10',()=>setNu(R.nu+10));b('10 →',()=>setNu(R.nu-10))}
 if(k==='regions')REG.forEach((g,i)=>b(`${g[1]}–${g[2]}`,()=>placeRegion(i)));
 if(k==='shape')KINDS.forEach(([key,nm])=>b(nm,()=>nameKind(key)));
 if(k==='finger')REFS.forEach(key=>b('Overlay '+SPEC[key].name,()=>tryRef(key)));
 if(k==='claim'){b('Claim is right',()=>judgeClaim(true));b('Claim is wrong',()=>judgeClaim(false))}
 A.redraw()}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const demo=(fns,ms)=>{const id=++job;fns.forEach((f,j)=>setTimeout(()=>{if(id===job){f();sync()}},(j+1)*(A.reduced()?60:ms)))};
function init(){job++;Object.assign(R,{after:()=>{},won:false,msg:'',bad:false,i:0,nu:2400,got:[],placed:[],drag:null,slide:false,ref:null,tried:new Set()})}
const steps=[
{h:'Read the axes',p:'The y-axis is transmittance: the % of infrared that gets through. The x-axis is wavenumber in cm⁻¹, waves per centimetre. It runs backwards, from 4000 on the left to 500 on the right.',
predict:{q:'Where a bond absorbs infrared, the line…',opts:['rises to a peak','dips to a trough','stays flat'],ans:1},
task:'Read troughs A, B and C',show:()=>{steps[0].go();demo(TARGETS.map(([,cv])=>()=>setNu(cv)),550)},go:()=>{init();sync();R.after=ready(0,()=>R.won,'Troughs read.')}},
{h:'Four regions',p:'Where a trough sits tells you the kind of bond. The regions are the same on every spectrum.',
predict:{q:'Which bonds absorb at the highest wavenumbers?',opts:['Double bonds like C=O','Bonds to hydrogen','Single C–C bonds'],ans:1},
task:'Place all 4 regions',show:()=>{steps[1].go();demo(REG_ORDER.map(i=>()=>placeRegion(i)),450)},go:()=>{init();sync();R.after=ready(1,()=>R.won,'Regions placed.')}},
{h:'Shape matters',p:'Hydrogen bonding makes O–H troughs broad. In an alcohol the O–H is broad and rounded, 3230–3550. In a carboxylic acid it is very broad, about 2500–3300. C=O is strong and sharp, 1680–1750.',
predict:{q:'An acid has O–H and C=O. Its O–H trough is…',opts:['narrow, at 3600','very broad, over the C–H troughs','missing'],ans:1},
task:'Name 3 spectra',show:()=>{steps[2].go();demo(KINDS.map(([key])=>()=>nameKind(key)),550)},go:()=>{init();sync();R.after=ready(2,()=>R.won,'Shapes read.')}},
{h:'The fingerprint region',p:'Below about 1500 cm⁻¹ many bonds absorb together. The pattern is unique to each compound, like a fingerprint. Match it to a database spectrum to name the compound.',
predict:{q:'Propan-1-ol and propan-2-ol both have O–H. Can the region above 1500 tell them apart?',opts:['Yes, easily','No: compare the fingerprint region','Only by colour'],ans:1},
task:'Find the reference that matches',show:()=>{steps[3].go();demo([()=>tryRef('prop1'),()=>tryRef('prop2')],800)},go:()=>{init();sync();R.after=ready(3,()=>R.won,'Fingerprint matched.')}},
{h:'Test the claim',p:'A spectrum is evidence. Check each claim against where a trough is, how wide it is and how deep it goes.',
task:'Judge 4 claims',show:()=>{steps[4].go();demo(CLAIMS.map(cl=>()=>judgeClaim(cl[2])),550)},go:()=>{init();sync();R.after=ready(4,()=>R.won,'Claims judged.')}},
{h:'Challenge',p:'',go:()=>{init();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>R.after()});
function ask(){nq++;const [qq,ok,bad]=Q[nq%Q.length],all=[[ok,'ok']].concat(bad),r=nq%3,ord=all.slice(r).concat(all.slice(0,r));
 box.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=box.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>verdict(tag,ok)});desc('Challenge: '+qq);A.redraw()}
let chain=0;
function verdict(tag,ok){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),good=tag==='ok';let m=FIX[tag]||'Check the position, shape and depth of the trough.';
 if(tag==='dir')m='The wavenumber axis runs backwards: about 4000 cm⁻¹ on the left down to about 500 on the right.';
 if(tag==='pct')m='Transmittance is what gets through. At 10% transmittance, about 90% was absorbed.';
 if(tag==='fpoh')m='O–H absorbs above 3000. The fingerprint region, below 1500, is compared as a whole with a known spectrum.';
 if(good){chain++;A.win()}else{chain=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Yes: '+ok+'. In a row: '+chain+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:B=>{box.hidden=B.step!==5;pad.hidden=B.step===5;keys()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Infrared spectrum lab buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
