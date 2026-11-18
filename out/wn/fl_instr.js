/* Flagship – identifying compounds with instrumental analysis (ages 16–18): choose a test-tube test or an instrument for
   each job; tap the molecular ion (M⁺) in mass spectra; tap IR dips to read bonds from the data sheet and name the
   functional group; count ¹H NMR environments and see the peaks; then rule out candidates with MS, IR and NMR evidence.
   Every canvas action has a button twin. */
(()=>{
const JOBS=[{a:'Find the Mr of a tiny sample',o:['Mass spectrometry','Bromine water','Infrared (IR)'],k:0,w:['','Bromine water only tests for C=C. It gives no mass.','IR shows which bonds are present, not the mass of the molecule.']},
 {a:'Roadside breath test for ethanol',o:['¹H NMR','Infrared (breathalyser)','Mass spectrometry'],k:1,w:['An NMR magnet fills a room. It cannot go to the roadside.','','Mass spectrometers are lab instruments. Breathalysers measure the IR that ethanol absorbs.']},
 {a:'Count H environments to find the carbon skeleton',o:['Limewater','Infrared (IR)','¹H NMR'],k:2,w:['Limewater only tests for CO₂.','IR shows bonds such as O–H and C=O, not H environments.','']},
 {a:'Show a C=C is present, quickly and cheaply',o:['Bromine water: orange to colourless','Mass spectrometry','Flame test'],k:0,w:['','The Mr does not show a C=C directly. Bromine water does it in seconds.','A flame test identifies metal ions, not C=C.']}];
const MS=[{n:'ethanol',p:[[15,10],[27,20],[29,25],[31,100],[45,50],[46,22]]},{n:'propanone',p:[[15,25],[27,8],[42,10],[43,100],[58,30]]},{n:'butane',p:[[15,8],[27,35],[29,45],[41,30],[43,100],[58,13]]}];
const FP=[[1460,22,18],[1380,18,16],[900,16,22],[700,14,20]],GRP=[0,1,2];
const IR=[{n:'ethanoic acid',k:1,b:[[2960,300,52,'O–H (acid) 2500–3000'],[1710,45,70,'C=O 1680–1750'],[1250,50,40,'C–O 1000–1300']]},
 {n:'ethanol',k:0,b:[[3350,170,62,'O–H (alcohol) 3230–3550'],[2950,50,30,'C–H 2850–3300'],[1060,45,60,'C–O 1000–1300']]},
 {n:'propanone',k:2,b:[[2960,50,26,'C–H 2850–3300'],[1715,40,75,'C=O 1680–1750'],[1220,40,40,'fingerprint region (below 1500)']]}];
const NMR=[{n:'ethanol',f:'CH₃–CH₂–OH',g:[['CH₃',1.2,3],['CH₂',3.7,2],['OH',2.6,1]]},{n:'propanone',f:'CH₃–CO–CH₃',g:[['both CH₃',2.1,6]],w:'Both CH₃ groups sit the same way round the C=O, so they are one environment: 1 peak.'},
 {n:'propan-2-ol',f:'CH₃–CH(OH)–CH₃',g:[['both CH₃',1.2,6],['CH',4,1],['OH',2.2,1]],w:'The two CH₃ groups are mirror images either side of the CH, so they count once: CH₃, CH, OH.'},
 {n:'propan-1-ol',f:'CH₃–CH₂–CH₂–OH',g:[['CH₃',.9,3],['CH₂',1.6,2],['CH₂–O',3.6,2],['OH',2.3,1]],w:'No symmetry here: CH₃, the middle CH₂, the CH₂ next to O and the OH are all different.'}];
const PZ=[{c:['M⁺ at m/z 60','IR: broad 3230–3550, nothing at 1680–1750','¹H NMR: 3 environments'],o:[['propan-1-ol',2,'It has 4 H environments, not 3.'],['propan-2-ol',-1],['methoxyethane',1,'No O–H in an ether, so no broad band at 3230–3550.'],['ethanoic acid',1,'An acid shows C=O at 1680–1750, and its O–H is at 2500–3000.']]},
 {c:['M⁺ at m/z 58','IR: sharp 1680–1750, no O–H','¹H NMR: 1 environment'],o:[['propanal',2,'Propanal has 3 environments: CH₃, CH₂ and CHO.'],['prop-2-en-1-ol',1,'It has an O–H band and C=C, but no C=O.'],['propanone',-1],['butane',1,'Butane has no C=O band at 1680–1750.']]}];
VIS.reg('flaginstr',c=>{let A,pad,qb,qn=-1,run=0,ver=0;
const S={};const fresh=()=>Object.assign(S,{pick:[-1,-1,-1,-1],ms:0,msHit:-1,msOk:0,ir:0,irTap:-1,irOk:0,nm:0,nmAns:-1,nmOk:0,pz:0,out:new Set(),pzOk:0,wait:0,want:()=>{}});fresh();
const mode=()=>['jobs','ms','ir','nmr','solve','quiz'][A.step];
const speak=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
const q=n=>Math.round(n*(A.narrow?1:1.12));
function tx(g,t,x,y,n,col,w,al){g.font=`${w||700} ${q(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col;g.fillText(t,x,y)}
const sh=(h,k)=>A.mix(A.col.pn,h,A.col.dark?k*.3:k);
function rr(g,b,f,e){g.fillStyle=f;A.paint.rrect(b.x,b.y,b.w,b.h,10);g.fill();g.lineWidth=2;g.strokeStyle=e||A.mix(A.col.tx,A.col.pn,.55);g.stroke()}
const rowB=i=>({x:10,y:A.H*(.04+i*.24),w:A.W-20,h:A.H*.21});
const X0=()=>A.W*.08,X1=()=>A.W*.96,Y0=()=>A.H*.14,YB=()=>A.H*.74;
const msX=m=>X0()+(X1()-X0())*(m-10)/52,irX=v=>X0()+(X1()-X0())*(4000-v)/3500,irV=x=>4000-3500*(x-X0())/(X1()-X0()),dX=d=>X0()+(X1()-X0())*(5-d)/5;
const trans=(s,v)=>100-s.b.concat(FP).reduce((t,[c0,w,d])=>t+d*Math.exp(-(((v-c0)/w)**2)),0);
const cardB=i=>({x:10+(i%2)*(A.W-20)/2,y:A.H*(.42+Math.floor(i/2)*.28),w:(A.W-20)/2-8,h:A.H*.24});
const lock=n=>S.wait=n;
function draw(A){const{ctx:g,W,H,col:C}=A,m=mode(),ink=C.tx,mu=C.mu,ax=A.mix(ink,C.pn,.35);g.fillStyle=sh('#f0f9ff',.3);g.fillRect(0,0,W,H);
 const axes=(l,r,lab)=>{g.lineWidth=2;g.strokeStyle=ax;g.beginPath();g.moveTo(X0(),Y0()-8);g.lineTo(X0(),YB());g.lineTo(X1(),YB());g.stroke();tx(g,l,X0(),YB()+14,10,mu,700);tx(g,r,X1(),YB()+14,10,mu,700);tx(g,lab,W/2,YB()+30,11,ink,800)};
 if(m==='jobs')JOBS.forEach((r,i)=>{const b=rowB(i),p=S.pick[i],good=p===r.k;rr(g,b,p<0?sh('#ffffff',.9):good?sh('#dcfce7',1):sh('#fee2e2',1),p>=0&&!good?C.rd:0);tx(g,r.a,b.x+10,b.y+b.h*.3,12,ink,800,'left');tx(g,p<0?'Tap to choose a method':(good?'✓ ':'✗ ')+r.o[p],b.x+10,b.y+b.h*.7,13,ink,700,'left')});
 if(m==='ms'){const s=MS[S.ms%3];axes('10','62','m/z');tx(g,'Unknown '+(S.ms%3+1)+' of 3'+(S.msHit===s.p.length-1?': '+s.n:''),W/2,H*.06,13,ink,800);
  s.p.forEach(([z,h],i)=>{const x=msX(z),y=YB()-(YB()-Y0())*h/100,hit=i===S.msHit,mp=i===s.p.length-1;g.fillStyle=hit?(mp?C.gn:C.rd):A.mix(ink,C.pn,.25);const bw=Math.min(8,(X1()-X0())/52*.6),pz=s.p[i-1],nz=s.p[i+1],dx=nz&&nz[0]-z<3?-7:pz&&z-pz[0]<3&&pz[1]>h?7:0;g.fillRect(x-bw/2,y,bw,YB()-y);tx(g,String(z),x+dx,y-9,10,ink,800);
   if(hit)tx(g,mp?'M⁺: Mr = '+z:h===100?'base peak':'fragment',x,y-24,11,mp?C.gn:C.rd,900)})}
 if(m==='ir'){const s=IR[S.ir%3];axes('4000','500','wavenumber / cm⁻¹');tx(g,'Spectrum '+(S.ir%3+1)+' of 3'+(S.irOk>S.ir%3?': '+s.n:''),W/2,H*.06,13,ink,800);
  g.fillStyle=A.alpha(C.cy,.12);g.fillRect(irX(1500),Y0(),X1()-irX(1500),YB()-Y0());tx(g,'fingerprint',(irX(1500)+X1())/2,YB()-10,10,mu,700);
  g.lineWidth=2.5;g.strokeStyle=C.bl;g.beginPath();for(let v=4000;v>=500;v-=10){const x=irX(v),y=Y0()+(YB()-Y0())*(1-trans(s,v)/100)*.95;v===4000?g.moveTo(x,y):g.lineTo(x,y)}g.stroke();
  if(S.irTap>=0){const b=s.b[S.irTap],x=irX(b[0]),y=Y0()+(YB()-Y0())*(1-trans(s,b[0])/100)*.95;A.paint.ball(x,y,7,C.am);tx(g,b[3],Math.min(Math.max(x,W*.25),W*.75),y+20,11,ink,900)}}
 if(m==='nmr'){const s=NMR[S.nm%4],shown=S.nmAns>=0;tx(g,s.n+':  '+s.f,W/2,H*.06,14,ink,900);axes('δ 5','0','chemical shift δ / ppm');
  if(shown)s.g.forEach(([l,d,n],i)=>{const x=dX(d),y=YB()-(YB()-Y0())*n/7;g.lineWidth=4;g.strokeStyle=['#2563eb','#db2777','#059669','#d97706'][i];g.beginPath();g.moveTo(x,YB());g.lineTo(x,y);g.stroke();tx(g,l,x,y-10,11,ink,900);tx(g,n+'H',x,y-24,10,mu,700)});
  else tx(g,'How many peaks? Pick a number.',W/2,H*.44,14,mu,700);tx(g,shown?'One peak per H environment (splitting not shown)':'',W/2,H*.94,11,mu,700)}
 if(m==='solve'){const z=PZ[S.pz%2];z.c.forEach((t,i)=>tx(g,t,W/2,H*(.07+i*.1),12,ink,800));z.o.forEach(([n,cl],i)=>{const b=cardB(i),x=S.out.has(i);rr(g,b,x?sh('#e5e7eb',1):sh('#ffffff',.9));tx(g,n,b.x+b.w/2,b.y+b.h*.4,13,x?mu:ink,800);
   if(x){g.strokeStyle=C.rd;g.lineWidth=3;g.beginPath();g.moveTo(b.x+12,b.y+b.h*.4);g.lineTo(b.x+b.w-12,b.y+b.h*.4);g.stroke();tx(g,'ruled out by '+['MS','IR','NMR'][cl],b.x+b.w/2,b.y+b.h*.75,10,mu,700)}})}
 if(m==='quiz')tx(g,'MS → Mr · IR → bonds · NMR → H environments',W/2,H*.45,12,ink,800);A.fx.draw(g)}
/* actions */
function job(i,k){S.pick[i]=k;const r=JOBS[i];if(k===r.k){A.sound.pop();speak(`${r.a}: ${r.o[k]}.`);S.want()}else{A.sound.miss();speak(r.w[k])}keys();A.redraw()}
function msTap(i){if(S.wait)return;const s=MS[S.ms%3],p=s.p[i];S.msHit=i;if(i===s.p.length-1){S.msOk++;A.sound.pop();speak(`Yes: the molecular ion M⁺ is the peak with the highest m/z, ${p[0]}. So Mr = ${p[0]}: ${s.n}.`);S.want();nextIn(()=>{S.ms++;S.msHit=-1})}
 else{A.sound.miss();speak(p[1]===100?`m/z ${p[0]} is the base peak: the most common fragment, not the whole molecule. Look further right.`:`m/z ${p[0]} is a fragment. The molecular ion has the highest m/z.`)}keys();A.redraw()}
function nextIn(f){const k=ver;lock(1);setTimeout(()=>{if(k!==ver)return;lock(0);if(!S.doneStep)f();keys();A.redraw()},A.reduced()?5:800)}
function irTap(x){const s=IR[S.ir%3],v=irV(x);let b=-1,d=1e9;s.b.forEach((t,i)=>{const e=Math.abs(t[0]-v)/Math.max(t[1],80);if(e<d){d=e;b=i}});if(d>2.2)return speak(`${Math.round(v/10)*10} cm⁻¹: no strong band here.`);S.irTap=b;A.sound.tick();speak(`Dip at about ${s.b[b][0]} cm⁻¹: ${s.b[b][3]}.`);A.redraw()}
function irPick(k){if(S.wait)return;const s=IR[S.ir%3];if(k===s.k){S.irOk++;A.sound.pop();speak(`Yes: ${s.n}, ${['an alcohol: broad O–H at 3230–3550 and no C=O.','a carboxylic acid: very broad O–H at 2500–3000 plus C=O at 1680–1750.','a ketone: C=O at 1680–1750 and no O–H.'][k]}`);S.want();nextIn(()=>{S.ir++;S.irTap=-1})}
 else{A.sound.miss();speak(k===0?(s.k===1?'An alcohol has no C=O at 1680–1750, and its O–H sits higher, at 3230–3550.':'There is no broad O–H band, so it is not an alcohol.'):k===1?(s.k===0?'An acid would also show C=O at 1680–1750. There is none here.':'An acid would show a very broad O–H at 2500–3000.'):'A ketone has no O–H band. Look at 2500–3550.')}keys();A.redraw()}
function nmPick(n){if(S.wait)return;const s=NMR[S.nm%4];S.nmAns=n;if(n===s.g.length){S.nmOk++;A.sound.pop();speak(`Yes: ${s.n} has ${n} H environment${n>1?'s':''}, so ${n} peak${n>1?'s':''}: ${s.g.map(t=>t[0]).join(', ')}.`);S.want();nextIn(()=>{S.nm++;S.nmAns=-1})}
 else{A.sound.miss();speak(`Not ${n}. `+(s.w||'Count groups of H in different places: CH₃, CH₂ and OH are each different.'))}keys();A.redraw()}
function rule(i){if(S.wait||S.out.has(i))return;const z=PZ[S.pz%2],o=z.o[i];if(o[1]<0){A.sound.miss();speak(`${o[0]} fits every clue: ${z.c.join('; ')}. Keep it.`);return}
 S.out.add(i);A.sound.tick();speak(`${o[0]} ruled out: ${o[2]}`);if(S.out.size===3){S.pzOk++;A.sound.pop();speak(`Solved: it is ${z.o.find(t=>t[1]<0)[0]}. ${o[0]} ruled out too: ${o[2]}`);S.want();nextIn(()=>{S.pz++;S.out=new Set()})}keys();A.redraw()}
function keys(){if(!pad)return;pad.innerHTML='';const m=mode(),B=(t,f)=>{c.el('button',{type:'button',class:'lbtn ghost sm'},pad,t).onclick=f};
 if(m==='jobs')JOBS.forEach((r,i)=>{if(S.pick[i]!==r.k)r.o.forEach((o,k)=>B(`${r.a} → ${o}`,()=>job(i,k)))});
 if(m==='ms')MS[S.ms%3].p.forEach(([z],i)=>B(`Peak at m/z ${z}`,()=>msTap(i)));
 if(m==='ir'){IR[S.ir%3].b.forEach(b=>B(`Read dip near ${b[0]} cm⁻¹`,()=>irTap(irX(b[0]))));GRP.forEach((t,k)=>B(`It is ${['an alcohol','a carboxylic acid','a ketone'][k]}`,()=>irPick(k)))}
 if(m==='nmr')[1,2,3,4].forEach(n=>B(`${n} peak${n>1?'s':''}`,()=>nmPick(n)));
 if(m==='solve')PZ[S.pz%2].o.forEach((o,i)=>{if(!S.out.has(i))B(`Rule out ${o[0]}`,()=>rule(i))})}
function down(p){const m=mode();
 if(m==='jobs'){const i=[0,1,2,3].findIndex(k=>{const b=rowB(k);return p.y>=b.y&&p.y<=b.y+b.h});if(i>=0)job(i,(S.pick[i]+1)%3)}
 if(m==='ms'){const s=MS[S.ms%3];let b=-1,d=1e9;s.p.forEach(([z],i)=>{const e=Math.abs(p.x-msX(z));if(e<d){d=e;b=i}});if(d<16)msTap(b)}
 if(m==='ir'&&p.x>X0()&&p.x<X1())irTap(p.x);
 if(m==='solve')[0,1,2,3].forEach(i=>{const b=cardB(i);if(p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h)rule(i)});return false}
const ok=(n,f,msg)=>()=>{if(A.step===n&&f()&&(!steps[n].predict||A.pred[n]!=null)){S.doneStep=1;A.done(msg+A.reveal(n))}};
const reset=(n,f,msg,t)=>{ver++;fresh();S.doneStep=0;S.want=ok(n,f,msg);speak(t);keys()};
function later(fs,gap){const k=ver;fs.forEach((f,j)=>setTimeout(()=>{if(k===ver)f()},A.reduced()?j*30+10:j*gap+200))}
const steps=[
{h:'Test tube or instrument?',p:'Chemical tests (bromine water, limewater) give quick yes-or-no answers. Instruments give the Mr, the bonds and the carbon skeleton. Match each job to a method.',
 predict:{q:'Why do labs often use instruments instead of test-tube tests?',opts:['They are fast, sensitive and work on tiny samples','They never need reference data','Every test costs less than a test tube'],ans:0},task:'Choose the best method for all 4 jobs',
 show:()=>{steps[0].go();later(JOBS.map((r,i)=>()=>job(i,r.k)),350)},go:()=>reset(0,()=>JOBS.every((r,i)=>S.pick[i]===r.k),'Tests answer one question cheaply; instruments identify the whole compound.','Four jobs to match.')},
{h:'Mass spectrum: find M⁺',p:'A mass spectrometer ionises molecules and sorts the ions by m/z. Tap the molecular ion peak M⁺: its m/z is the Mr.',
 predict:{q:'Which peak gives the Mr of the compound?',opts:['The tallest peak','The peak with the highest m/z (furthest right)','The first peak on the left'],ans:1},task:'Find M⁺ in 3 spectra',
 show:()=>{steps[1].go();later([0,1,2].map(()=>()=>msTap(MS[S.ms%3].p.length-1)),1000)},go:()=>reset(1,()=>S.msOk>=3,'M⁺ is the furthest-right peak; the tallest is the base peak, a fragment.','Mass spectrum of an unknown.')},
{h:'IR: read the bonds',p:'Bonds absorb IR at set wavenumbers. Tap a dip to read it from the data sheet, then name the functional group.',
 predict:{q:'Broad band at 2500–3000 cm⁻¹ and a strong one at 1710 cm⁻¹. What is it?',opts:['An alcohol','A carboxylic acid','A ketone'],ans:1},task:'Name the group in 3 spectra',
 show:()=>{steps[2].go();later([0,1,2].map(()=>()=>{irTap(irX(IR[S.ir%3].b[0][0]));irPick(IR[S.ir%3].k)}),1000)},go:()=>reset(2,()=>S.irOk>=3,'O–H 3230–3550 alcohol; O–H 2500–3000 with C=O acid; C=O alone ketone.','IR spectrum of an unknown.')},
{h:'¹H NMR: count environments',p:'H atoms in the same place in the molecule are one environment and give one peak. Mirror-image groups count once.',
 predict:{q:'How many peaks in the ¹H NMR spectrum of propanone, CH₃COCH₃?',opts:['1','2','6'],ans:0},task:'Count peaks for 4 molecules',
 show:()=>{steps[3].go();later([0,1,2,3].map(()=>()=>nmPick(NMR[S.nm%4].g.length)),1000)},go:()=>reset(3,()=>S.nmOk>=4,'Count environments, not H atoms: symmetry merges groups.','Ethanol, CH₃–CH₂–OH.')},
{h:'Solve the unknown',p:'Use all three clues. Tap a candidate to rule it out; keep the one that fits every clue.',task:'Solve both unknowns',
 show:()=>{steps[4].go();later([0,1].flatMap(p=>PZ[p].o.map((o,i)=>o[1]<0?0:()=>rule(i)).filter(Boolean)),900)},go:()=>reset(4,()=>S.pzOk>=2,'MS gives the Mr, IR the functional group, NMR the skeleton: together they pin it down.','Four candidates, three clues.')},
{h:'Challenge',p:'',go:()=>{ver++;quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Peaks at m/z 15, 43 and 58; the tallest is at 43. What is the Mr?',[['58','ok'],['43','base'],['15','base']]],
 ['IR: broad band at 2500–3000 cm⁻¹ and a strong band at 1710 cm⁻¹. Which group?',[['Carboxylic acid','ok'],['Alcohol','oh'],['Ketone','oh']]],
 ['How many peaks in the ¹H NMR spectrum of propan-2-ol?',[['3','ok'],['4','env'],['8','env']]],
 ['Why compare the fingerprint region with a database?',[['Its pattern is unique to each compound','ok'],['It holds the O–H band','fp'],['It gives the Mr','fp']]],
 ['An advantage of instrumental methods over test-tube tests?',[['Fast, accurate and sensitive on tiny samples','ok'],['They need no reference data','adv'],['They show colour changes by eye','adv']]],
 ['Ethanol and methoxymethane both give M⁺ at 46. Which tells them apart quickly?',[['IR: only ethanol has an O–H band','ok'],['Mass spectrometry: compare M⁺','same'],['Measure the Mr again','same']]]];
function why(t){let m='Match each technique to what it measures: MS the Mr, IR the bonds, NMR the H environments.';
 if(t==='base')m='The tallest peak is the base peak, a common fragment. The molecular ion M⁺ has the highest m/z.';
 if(t==='oh')m='Two O–H ranges: 3230–3550 for alcohols, a very broad 2500–3000 for acids. C=O at 1680–1750 plus the low O–H means an acid.';
 if(t==='env')m='Count environments, not atoms: the two CH₃ groups are equivalent, so CH₃, CH and OH give 3 peaks.';
 if(t==='fp')m='Below 1500 cm⁻¹ many bonds overlap into a pattern unique to one compound, so it is matched with a database.';
 if(t==='adv')m='Instruments still need reference data, but they are fast, accurate and sensitive, and need very little sample.';
 if(t==='same')m='Same molecular formula, same Mr: MS cannot separate them. IR finds the O–H in ethanol.';return m}
function quiz(){qn++;const[qq,ops]=QS[qn%QS.length],r=qn%3;qb.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qb.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>mark(t)});speak('Challenge: '+qq);A.redraw()}
function mark(t){qb.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qb.querySelector('.fl-fb'),y=t==='ok';if(y){run++;A.win()}else{run=0;A.sound.miss()}
 fb.innerHTML=(y?`✓ Correct. ${run} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:A=>{qb.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
 init:A=>{const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);qb=c.el('div',{class:'fl-chal'},A.below);A.gest({down});keys()}});
A.start()})})();
