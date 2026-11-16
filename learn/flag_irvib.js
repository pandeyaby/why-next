/* Flagship: bonds absorb infrared by vibrating (ages 16–18; AQA A-level Chemistry 3.3.6.2 infrared spectroscopy and the link
   between IR absorption by CO₂, CH₄ and H₂O and global warming; OCR A 4.2.4). Pluck ball-and-spring bonds to see that a heavier
   atom lowers the wavenumber and a stronger bond raises it, tune an IR source until C=O absorbs (resonance), sort vibrations by
   whether they change the dipole, and find which gases in air trap the infrared given out by the ground. Drag, tap or buttons. */
(()=>{
const K={ink:'#0f172a',dim:'#334155',card:'#ffffff',ok:'#166534',okBg:'#dcfce7',no:'#9f1239',tip:'#f5f3ff',edge:'#1e293b',sel:'#1d4ed8',
 spring:'#475569',ir:'#b91c1c',irBg:'#fee2e2',band:'#ede9fe',bandInk:'#5b21b6',
 atom:{C:['#334155','#ffffff'],H:['#e2e8f0','#0f172a'],D:['#94a3b8','#0f172a'],O:['#dc2626','#ffffff'],Cl:['#16a34a','#ffffff']}};
const I=IRART,B=I.BONDS,nu=b=>{const [, , ,m1,m2,k]=B[b],mu=m1*m2/(m1+m2);return Math.round(1303*Math.sqrt(k/mu)/10)*10};
VIS.reg('flagirvib',c=>{let A,X,pad,chal,qi=-1,tok=0;const G={after:()=>{}};
const z=n=>Math.round(n*(A.narrow?1:1.12));
const put=(s,x,y,n,col,al,wt)=>{X.font=`${wt||700} ${z(n)}px system-ui,sans-serif`;X.fillStyle=col||K.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y)};
function split(s,maxW,n){X.font=`700 ${z(n)}px system-ui,sans-serif`;const out=[];let cur='';
 for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(cur&&X.measureText(t).width>maxW){out.push(cur);cur=w}else cur=t}out.push(cur);return out}
function rect(x,y,w,h,bg,edge,lw,r){A.paint.rrect(x,y,w,h,r==null?10:r);X.fillStyle=bg;X.fill();if(edge){X.lineWidth=lw||2;X.strokeStyle=edge;X.stroke()}}
function centre(s,x,y,w,h,n,col,wt){const L=split(s,w-10,n),lh=z(n)+3;L.forEach((r,i)=>put(r,x+w/2,y+h/2+(i-(L.length-1)/2)*lh,n,col,'center',wt))}
function bar(s,won){const L=split(s,A.W-40,13),lh=z(13)+4,h=Math.max(z(32),L.length*lh+12);rect(10,8,A.W-20,h,won?K.okBg:K.tip,won?K.ok:K.edge,2,8);
 L.forEach((r,i)=>put(r,A.W/2,8+h/2+(i-(L.length-1)/2)*lh,13,won?K.ok:K.ink));return 8+h}
function base(){if(!G.msg)return;const L=split((G.bad?'✗ ':'✓ ')+G.msg,A.W-44,12),lh=z(12)+5,h=L.length*lh+10,y=A.H-h-8;
 rect(10,y,A.W-20,h,K.card,G.bad?K.no:K.ok,3,8);L.forEach((r,i)=>put(r,A.W/2,y+5+lh*(i+.5),12,G.bad?K.no:K.ink))}
const read=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const fail=s=>{G.bad=true;G.msg=s;A.sound.miss();sync()};
const pass=s=>{G.bad=false;G.msg=s;A.sound.pop();sync()};
const on=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* ---- a ball-and-spring bond ---- */
function springBond(b,x0,y,len,amp){const [lab,l,r,m1,m2,,ord]=B[b],r1=z(12)+Math.cbrt(m1)*z(4),r2=z(12)+Math.cbrt(m2)*z(4),d=amp*Math.cos(G.t*nu(b)/1000*2*Math.PI*(A.reduced()?0:1)),x2=x0+len+d;
 X.strokeStyle=K.spring;X.lineWidth=2;for(let o=0;o<ord;o++){const off=(o-(ord-1)/2)*z(7);X.beginPath();const n=14;for(let i=0;i<=n;i++){const xx=x0+r1+(x2-r2-x0-r1)*i/n,yy=y+off+(i%2?-1:1)*z(5)*(i&&i<n?1:0);i?X.lineTo(xx,yy):X.moveTo(xx,yy)}X.stroke()}
 const ball=(x,rad,el)=>{const [bg,ink]=K.atom[el];X.fillStyle=bg;X.strokeStyle=K.ink;X.lineWidth=1.5;X.beginPath();X.arc(x,y,rad,0,7);X.fill();X.stroke();put(el,x,y,12,ink,'center',900)};
 ball(x0,r1,l);ball(x2,r2,r);return{x:x2-r2,y:y-r2,w:r2*2,h:r2*2}}
/* ---- steps 0 and 1: pluck bonds ---- */
const SET=()=>A.step===0?['CH','CD','CCl']:['CO1','CO2','CO3'];
function pluck(b){if(G.won)return;G.cur=b;G.amp=z(16);G.t=0;G.done.add(b);A.sound.tick();const S=SET(),[lab,,,,,,,rng]=B[b];
 G.bad=false;G.msg=`${lab} vibrates at about ${nu(b)} cm⁻¹ in this model (data book: ${rng} cm⁻¹).`;
 if(S.every(x=>G.done.has(x))){G.won=true;G.msg=A.step===0?'Same spring, heavier atom: C–H 3030, C–D 2230, C–Cl 800 cm⁻¹. More mass, lower frequency.':'Same atoms, stiffer spring: C–O 1110, C=O 1710, C≡O 2150 cm⁻¹. Stronger bond, higher frequency.'}sync()}
function drawPluck(t){const S=SET(),y0=t+z(10),rowH=Math.min(z(80),(A.H-y0-z(120))/3),len=Math.min(A.W*.3,z(150));G.atomHit=[];G.rowHit=[];
 S.forEach((b,i)=>{const y=y0+i*rowH,cur=G.cur===b,x0=z(40);rect(14,y,A.W-28,rowH-z(6),cur?'#eff6ff':K.card,cur?K.sel:'#94a3b8',cur?2.5:1.2,10);
  const hit=springBond(b,x0,y+rowH/2-z(3),len,cur?(G.drag?G.drag.d:G.amp):0);G.atomHit.push({...hit,x:hit.x-8,y:hit.y-8,w:hit.w+16,h:hit.h+16,b});G.rowHit.push({x:14,y,w:A.W-28,h:rowH-z(6),b});
  const tx=x0+len+z(50);put(B[b][0],tx,y+rowH*.32,14,K.ink,'left',900);put(G.done.has(b)?`${nu(b)} cm⁻¹`:'pluck me',tx,y+rowH*.62,12,G.done.has(b)?K.ir:K.dim,'left',800)})}
/* ---- step 2: tune the IR source ---- */
const LO=400,HI=4000,TARGET=nu('CO2');
const sx=v=>20+(A.W-40)*(v-LO)/(HI-LO),vx=x=>LO+(x-20)/(A.W-40)*(HI-LO);
function tune(v){if(G.won)return;G.src=Math.max(LO,Math.min(HI,Math.round(v/10)*10));const off=Math.abs(G.src-TARGET);G.amp=off<40?z(18):z(2);G.t=0;
 if(off<40){G.won=true;return pass(`At ${G.src} cm⁻¹ the photons match the C=O vibration, so they are absorbed and the bond vibrates harder. Every other wavenumber passes straight through.`)}
 G.bad=false;G.msg=`${G.src} cm⁻¹: the photons do not match the C=O vibration, so they pass through. ${G.src<TARGET?'Go higher.':'Go lower.'}`;A.sound.tick();sync()}
function drawTune(t){const y0=t+z(10);G.cur='CO2';springBond('CO2',z(50),y0+z(30),Math.min(A.W*.3,z(150)),G.amp||0);put('C=O bond',z(50)+Math.min(A.W*.3,z(150))+z(50),y0+z(30),13,K.ink,'left',900);
 const gy=y0+z(70),gh=A.H-gy-z(170);rect(14,gy,A.W-28,gh,'#f8fafc','#94a3b8',1.5,8);put('% of IR getting through',20,gy+z(10),11,K.dim,'left');
 X.strokeStyle=K.ink;X.lineWidth=2;X.beginPath();for(let v=LO;v<=HI;v+=10){const x=sx(v),dip=G.tried.has(Math.round(v/100))||G.won?Math.exp(-Math.pow((v-TARGET)/45,2)):0,y=gy+z(20)+(gh-z(30))*dip*.85;v===LO?X.moveTo(x,y):X.lineTo(x,y)}X.stroke();
 const ty=gy+gh+z(30);X.fillStyle=K.irBg;X.fillRect(20,ty-z(6),A.W-40,z(12));X.strokeStyle=K.ir;X.strokeRect(20,ty-z(6),A.W-40,z(12));
 [500,1500,2500,3500].forEach(v=>put(v,sx(v),ty+z(18),11,K.dim));put('wavenumber / cm⁻¹',A.W/2,ty+z(34),11,K.dim);
 const hx=sx(G.src);G.knob={x:hx-z(18),y:ty-z(22),w:z(36),h:z(44)};X.fillStyle=K.ir;X.beginPath();X.arc(hx,ty,z(13),0,7);X.fill();put('IR',hx,ty,10,'#ffffff','center',900);
 X.strokeStyle=K.ir;X.setLineDash([4,4]);X.beginPath();X.moveTo(hx,ty-z(14));X.lineTo(hx,gy);X.stroke();X.setLineDash([]);G.track={x:10,y:ty-z(24),w:A.W-20,h:z(48)}}
/* ---- step 3: does the dipole change? ---- */
function judge(m,act){if(G.won||G.sorted[m]!=null)return;G.pick=null;const md=I.MODES[m];if(md[1]!==(act?1:0))return fail(`${md[0]}: ${md[2]}`);
 G.sorted[m]=act?1:0;A.sound.pop();G.bad=false;G.msg=md[2];if(I.MODES.every((_,i)=>G.sorted[i]!=null)){G.won=true;G.msg='A vibration absorbs IR only if it changes the dipole. Symmetric stretches and same-atom bonds cannot.'}sync()}
function drawModes(t){const y0=t+z(8),gap=z(6),w=(A.W-28-gap)/2,ch=z(34);G.modeHit=[];let n=0;
 I.MODES.forEach((md,i)=>{if(G.sorted[i]!=null)return;const x=14+(n%2)*(w+gap),y=y0+Math.floor(n/2)*(ch+gap);n++;const d=G.drag&&G.drag.m===i,pk=G.pick===i,px=d?G.drag.x-w/2:x,py=d?G.drag.y-ch/2:y;
  rect(px,py,w,ch,pk?'#dbeafe':K.card,pk?K.sel:K.edge,pk?3:1.5,10);centre(md[0],px,py,w,ch,11,K.ink,700);G.modeHit.push({x,y,w,h:ch,i})});
 const left=I.MODES.filter((_,i)=>G.sorted[i]==null).length,by=y0+Math.ceil(left/2)*(ch+gap)+z(4),bh=A.H-by-z(70),bw=(A.W-28-gap)/2;G.binHit=['IR active: dipole changes','IR inactive: no dipole change'].map((s,k)=>{const x=14+k*(bw+gap);rect(x,by,bw,bh,k?'#f1f5f9':K.irBg,k?'#475569':K.ir,2,10);centre(s,x,by,bw,z(30),11,k?K.dim:K.ir,800);
  let j=0;I.MODES.forEach((md,i)=>{if(G.sorted[i]===(k?0:1)){put('✓ '+md[0],x+bw/2,by+z(40)+j*z(18),10,K.ok,'center',700);j++}});return{x,y:by,w:bw,h:bh,k}})}
/* ---- step 4: which gases trap the ground's IR? ---- */
function addGas(g){if(G.won||G.gas.has(g))return;G.gas.add(g);const gs=I.GASES[g];
 if(!gs[2]){G.bad=false;G.msg=`${gs[0]} (${gs[1]}): no change. ${gs[3]}`;A.sound.tick();return sync()}
 A.sound.pop();G.bad=false;G.msg=`${gs[0]}: absorbs. ${gs[3]}`;if(I.GASES.every((q,i)=>!q[2]||G.gas.has(i))){G.won=true;G.msg='CO₂, H₂O and CH₄ trap the ground’s IR; N₂, O₂ and Ar, 99% of air, let it pass. Absorbed energy is passed on and re-emitted, some back down, warming the surface.'}sync()}
function drawGas(t){const y0=t+z(8),gap=z(6),cols=3,w=(A.W-28-gap*2)/cols,ch=z(46);G.gasHit=I.GASES.map((g,i)=>{const x=14+(i%cols)*(w+gap),y=y0+Math.floor(i/cols)*(ch+gap),got=G.gas.has(i);
  rect(x,y,w,ch,got?(g[2]?K.irBg:'#f1f5f9'):K.card,got?(g[2]?K.ir:'#475569'):K.edge,got?2.5:1.5,10);put(g[0],x+w/2,y+ch*.36,14,K.ink,'center',900);put(g[1],x+w/2,y+ch*.72,10,K.dim,'center',600);return{x,y,w,h:ch,i}});
 const gy=y0+2*(ch+gap)+z(6),gh=A.H-gy-z(76);rect(14,gy,A.W-28,gh,'#f8fafc','#94a3b8',1.5,10);X.fillStyle='#a16207';X.fillRect(16,gy+gh-z(12),A.W-32,z(10));put('warm ground gives out IR',A.W/2,gy+gh-z(22),10,K.dim);
 const trap=[...G.gas].filter(i=>I.GASES[i][2]).length;for(let k=0;k<5;k++){const x=40+k*(A.W-80)/4,top=gy+z(30)+trap*(gh-z(70))*.3;X.strokeStyle=K.ir;X.lineWidth=2.5;X.beginPath();X.moveTo(x,gy+gh-z(30));X.lineTo(x,top);X.stroke();
  X.fillStyle=K.ir;X.beginPath();X.moveTo(x-5,top+7);X.lineTo(x,top);X.lineTo(x+5,top+7);X.fill();if(trap){X.beginPath();X.arc(x,top-z(6),z(4),0,7);X.fill()}}
 put(trap?`${trap} of 3 absorbers: less IR escapes`:'No absorbers: IR escapes to space',A.W/2,gy+z(10),11,trap?K.ir:K.dim,'center',800)}
/* ---- input, animation and drawing ---- */
const kind=()=>['pluck','pluck','tune','modes','gas','quiz'][A.step];
function down(p){const k=kind(),hit=L=>(L||[]).find(r=>on(p,r));
 if(k==='pluck'){const a=hit(G.atomHit);if(a&&!G.won){G.cur=a.b;G.drag={b:a.b,x0:p.x,d:0};return true}const r=hit(G.rowHit);if(r){pluck(r.b);return true}}
 if(k==='tune'&&(on(p,G.knob)||on(p,G.track))){G.drag={tune:1};tune(vx(p.x));G.tried.add(Math.round(G.src/100));return true}
 if(k==='modes'){const m=hit(G.modeHit);if(m){G.pick=m.i;G.drag={m:m.i,x:p.x,y:p.y,sx:p.x,sy:p.y};A.redraw();return true}const b=hit(G.binHit);if(b&&G.pick!=null){judge(G.pick,b.k===0);return true}}
 if(k==='gas'){const g=hit(G.gasHit);if(g){addGas(g.i);return true}}
 return false}
function move(p){const d=G.drag;if(!d)return;if(d.b){d.d=Math.max(-z(20),Math.min(z(30),p.x-d.x0));A.redraw()}else if(d.tune){tune(vx(p.x));G.tried.add(Math.round(G.src/100))}else{d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=G.drag;G.drag=null;if(!d)return;if(d.b)return pluck(d.b);if(d.tune)return sync();
 if(d.m!=null){const moved=Math.hypot(p.x-d.sx,p.y-d.sy)>10,b=(G.binHit||[]).find(q=>on(p,q));if(moved&&b)judge(d.m,b.k===0);else sync()}}
function draw(){X.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);X.fillRect(0,0,A.W,A.H);if(A.col.dark){X.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);X.fill()}
 const k=kind();let t;
 if(k==='pluck'){t=bar(G.won?(A.step===0?'Heavier atoms vibrate more slowly.':'Stronger bonds vibrate faster.'):'Drag an atom to stretch its bond and let go, or tap a row. Pluck all three bonds.',G.won);drawPluck(t)}
 if(k==='tune'){t=bar(G.won?'A bond absorbs only IR that matches its own vibration.':'Drag the IR source along the scale until the C=O bond absorbs.',G.won);drawTune(t)}
 if(k==='modes'){t=bar(G.won?'IR active = the vibration changes the dipole.':'Drag each vibration to a box, or tap it, then a box.',G.won);drawModes(t)}
 if(k==='gas'){t=bar(G.won?'Greenhouse gases are the ones with IR-active vibrations.':'Tap gases to add them to the air. Find the 3 that absorb the ground’s IR.',G.won);drawGas(t)}
 if(k==='quiz'){t=bar('Frequency rises with bond strength and falls with mass; only a changing dipole absorbs.');G.cur='CO2';drawPluck(t)}
 base();A.fx.draw(X)}
function sync(){const k=kind();let d='Challenge.';
 if(k==='pluck')d='Bonds: '+SET().map(b=>B[b][0]+(G.done.has(b)?' '+nu(b)+' per cm':' not plucked')).join(', ')+'.';
 if(k==='tune')d=`IR source at ${G.src} per cm. C=O vibrates at ${TARGET} per cm. ${G.won?'Absorbed.':'Passing through.'}`;
 if(k==='modes')d='Vibrations left: '+(I.MODES.filter((_,i)=>G.sorted[i]==null).map(m=>m[0]).join('; ')||'none')+(G.pick!=null?'. Picked: '+I.MODES[G.pick][0]:'')+'.';
 if(k==='gas')d='Gases added: '+([...G.gas].map(i=>I.GASES[i][0]+(I.GASES[i][2]?' absorbs':' no effect')).join(', ')||'none')+'.';
 read((G.msg?G.msg+' ':'')+d);keys();G.after()}
function keys(){if(!pad)return;pad.innerHTML='';const k=kind(),b=(s,fn,aria)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':aria||null},pad,s).onclick=()=>{fn();sync()}};
 if(k==='pluck'&&!G.won)SET().forEach(x=>b('Pluck '+B[x][0],()=>pluck(x)));
 if(k==='tune'&&!G.won){[[-500,'−500'],[-50,'−50'],[50,'+50'],[500,'+500']].forEach(([dv,s])=>b(s+' cm⁻¹',()=>{tune(G.src+dv);G.tried.add(Math.round(G.src/100))},`Move the IR source ${s} per cm`))}
 if(k==='modes'&&!G.won){if(G.pick==null)I.MODES.forEach((m,i)=>{if(G.sorted[i]==null)b('Pick: '+m[0],()=>{G.pick=i;A.sound.tick()})});else{b(`${I.MODES[G.pick][0]}: IR active`,()=>judge(G.pick,true));b(`${I.MODES[G.pick][0]}: IR inactive`,()=>judge(G.pick,false));b('Pick another',()=>{G.pick=null})}}
 if(k==='gas'&&!G.won)I.GASES.forEach((g,i)=>{if(!G.gas.has(i))b('Add '+g[0],()=>addGas(i))});
 A.redraw()}
const settle=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const id=++tok;fns.forEach((f,j)=>setTimeout(()=>{if(id===tok){f();sync()}},(j+1)*(A.reduced()?30:ms)))};
function reset(){tok++;Object.assign(G,{after:()=>{},won:false,msg:'',bad:false,cur:null,amp:0,t:0,done:new Set(),drag:null,src:1000,tried:new Set(),sorted:{},pick:null,gas:new Set()})}
const steps=[
{h:'A bond is a spring',p:'Think of a covalent bond as a spring joining two balls. Stretch it and let go, and it vibrates at its own natural frequency. Infrared spectra quote this as a wavenumber, in cm⁻¹.',
predict:{q:'Swap the H in C–H for a heavier Cl atom. What happens to the frequency?',opts:['It goes up','It goes down','It stays the same: it is still one bond'],ans:1},
task:'Pluck all three bonds: C–H, C–D and C–Cl',show:()=>{steps[0].go();play(['CH','CD','CCl'].map(b=>()=>pluck(b)),500)},go:()=>{reset();sync();G.after=settle(0,()=>G.won,'Heavier atom, lower wavenumber.')}},
{h:'Stiffer spring, faster vibration',p:'Now keep the atoms the same, C and O, and change the bond. A double bond is a stronger, stiffer spring than a single bond.',
predict:{q:'Which absorbs at the highest wavenumber?',opts:['C–O, the longest bond','C≡O, the strongest bond','All the same: same atoms'],ans:1},
task:'Pluck C–O, C=O and C≡O',show:()=>{steps[1].go();play(['CO1','CO2','CO3'].map(b=>()=>pluck(b)),500)},go:()=>{reset();sync();G.after=settle(1,()=>G.won,'Stronger bond, higher wavenumber.')}},
{h:'Only the matching frequency',p:'An infrared photon can give a bond one step more vibrational energy. The energy steps are fixed, so the photon’s frequency must match the bond’s own.',
predict:{q:'Shine IR of every wavenumber at a C=O bond. What does it absorb?',opts:['All of it equally','Only IR near its own wavenumber, about 1700 cm⁻¹','Only the highest wavenumbers'],ans:1},
task:'Tune the IR source until the C=O bond absorbs',show:()=>{steps[2].go();play([()=>tune(1200),()=>tune(2400),()=>tune(TARGET)].map(f=>()=>{f();G.tried.add(Math.round(G.src/100))}),600)},go:()=>{reset();sync();G.after=settle(2,()=>G.won,'Matching frequency: absorbed.')}},
{h:'The dipole must change',p:'IR is an electric field that flips back and forth. It can only push a vibration that makes the molecule’s dipole change. If the dipole stays the same, the IR has nothing to push on.',
predict:{q:'N₂ has a very strong triple bond. Does its stretch absorb IR?',opts:['Yes: every bond absorbs IR','No: stretching N≡N never changes the dipole','Yes, strong bonds absorb the most'],ans:1},
task:'Sort all 7 vibrations into IR active and IR inactive',show:()=>{steps[3].go();play(I.MODES.map((m,i)=>()=>judge(i,!!m[1])),350)},go:()=>{reset();sync();G.after=settle(3,()=>G.won,'Dipole change decides it.')}},
{h:'The greenhouse effect',p:'The warm ground gives out infrared. Gases whose vibrations absorb it hold some of that energy in the air and send part of it back down.',
task:'Find the 3 gases that absorb the ground’s IR',show:()=>{steps[4].go();play([0,3,4,5].map(i=>()=>addGas(i)),450)},go:()=>{reset();sync();G.after=settle(4,()=>G.won,'CO₂, H₂O and CH₄, not N₂, O₂ or Ar.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>G.after()});
function ask(){qi++;const [q,ans,wrongs]=I.bank[qi%I.bank.length],all=[[ans,'ok']].concat(wrongs),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>mark(tag,ans)});read('Challenge: '+q);A.redraw()}
let streak=0;
function mark(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=tag==='ok';let m=I.WHYM[tag]||'Think spring: stiffness, mass, and whether the dipole changes.';
 if(tag==='same')m='Same atoms, but C=O is a stiffer spring than C–O, so it vibrates faster and absorbs at a higher wavenumber.';
 if(tag==='massnot')m='The spring is the same, but D is twice as heavy as H, so the reduced mass rises and the frequency drops.';
 if(tag==='strong')m='N₂ vibrates fine. It does not absorb because the stretch keeps its dipole at zero, so IR cannot drive it.';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+streak+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:B2=>{chal.hidden=B2.step!==5;pad.hidden=B2.step===5;keys()},
 init:B2=>{A=B2;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Bond vibration lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);
  A.every(dt=>{if(!G.amp||A.reduced()||G.drag)return false;G.t+=dt;if(G.t>6){G.t=0;G.amp=A.step===2&&G.won?G.amp:0;return false}return true});A.gest({down,move,up})}}).start()})})();
