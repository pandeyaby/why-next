/* Flagship – how a time-of-flight mass spectrometer works (16–18): ionise a vaporised sample with an electron gun, accelerate
   the ions with the same push, race them down the flight tube, read the arrival-time spectrum (first peak = smallest m/z,
   height = abundance), see 2+ ions land at half the m/z, and use t ∝ √(m/z) to identify an unknown peak. */
(()=>{const M=Math,F=(w,z)=>w+' '+z+'px system-ui',U=1.66054e-27,E=1.602177e-19,D=1;
 const tof=(mz,V)=>1e6*D*M.sqrt(mz*U/(2*E*V)),TREF=tof(24,2000),f2=v=>(M.round(v*100)/100).toFixed(2);
 const SAMP={Mg:{n:'Magnesium',iso:[[24,79],[25,10],[26,11]]},B:{n:'Boron',iso:[[10,20],[11,80]]},Ne:{n:'Neon',iso:[[20,90],[22,10]]}};
 const sup=z=>z===2?'²⁺':'⁺',SUP={10:'¹⁰',11:'¹¹',20:'²⁰',22:'²²',24:'²⁴',25:'²⁵',26:'²⁶'},SY={Mg:'Mg',B:'B',Ne:'Ne'};
 const lab=(s,m,z)=>(SUP[m]||m)+SY[s]+sup(z);
 const FB={mass:'Ionising removes an electron, which barely changes the mass. The point is the charge: only ions feel the electric field.',see:'The detector does not look for light. Ions hit it, gain electrons and make a current.',
  ke:'The same push gives the same kinetic energy (for the same charge). The lighter ion turns that energy into more speed.',speed:'Same kinetic energy, ½mv², with a smaller m means a bigger v.',
  tall:'Height shows abundance: how many ions. Arrival time depends on m/z, so the smallest m/z arrives first.',heavy:'Heavier ions are slower, so the largest m/z arrives last.',
  mass2:'The spectrometer sorts by mass ÷ charge. 24 ÷ 2 = 12.',times:'Charge divides, it does not multiply: m/z = 24 ÷ 2 = 12.',
  lin:'Time grows with the square root of m/z. Four times the m/z only doubles the time.',inv:'Heavier ions are slower, so they arrive later, not sooner.',
  speedd:'All ions of one m/z arrive together; the computer works out m/z from the time. Abundance comes from the size of the current.',massd:'The detector cannot weigh ions. m/z comes from the flight time; the current gives abundance.'};
 const CQ=[['Why must the sample be ionised?',[['Only charged particles are pushed by the electric field and make a current at the detector','ok'],['To make the particles lighter so they fly faster','mass'],['So the particles glow and the detector can see them','see']]],
  ['Two ions with the same charge get the same push. Ion A is lighter. After the plates, ion A has…',[['the same kinetic energy and a higher speed','ok'],['more kinetic energy','ke'],['the same speed','speed']]],
  ['On a time-of-flight spectrum, which ions reach the detector first?',[['The ions with the smallest m/z','ok'],['The ions in the tallest peak','tall'],['The ions with the largest m/z','heavy']]],
  ['²⁴Mg²⁺ shows up at which m/z?',[['12','ok'],['24','mass2'],['48','times']]],
  ['How does the detector give the abundance of each ion?',[['Ions gain electrons at the detector; the current is bigger when more ions arrive','ok'],['It times how fast each ion goes','speedd'],['It weighs each ion','massd']]]];
VIS.reg('flagtof',c=>{let A,pad,chal,read;
 const G={s:'Mg',gun:0,V:2000,z2:0,fly:[],hit:[],tap:null,guess:32,gt:null,race:0,miss:'',gen:0,check:()=>{},now:0,neut:0};
 const mode=()=>['ion','race','spec','charge','find','free','quiz'][A.step];
 function geo(){const W=A.W,H=A.H,N=A.narrow,top=N?74:58,iw=N?52:78,pw=N?22:30,th=N?84:96,l=10,r=W-12;
  return{W,H,N,top,l,r,io:[l,l+iw],pl:[l+iw,l+iw+pw],tu:[l+iw+pw,r-12],de:[r-12,r],y0:top,y1:top+th,sy0:top+th+(N?52:32),sy1:H-26}}
 function win(){const m=mode();if(m==='find')return[0,2*tof(16,G.V)*1.2];if(m==='quiz')return[0,15];const iso=SAMP[G.s].iso.map(q=>q[0]),zz=G.z2?[1,2]:[1];let lo=1e9,hi=0;
  iso.forEach(a=>zz.forEach(z=>{const t=tof(a/z,G.V);lo=M.min(lo,t);hi=M.max(hi,t)}));const pd=M.max(.2,(hi-lo)*.12);return[M.max(0,lo-pd),hi+pd]}
 const tx=(t,g)=>{const w=win();return g.l+30+(t-w[0])/(w[1]-w[0])*(g.r-g.l-40)},xt=(x,g)=>{const w=win();return w[0]+(x-g.l-30)/(g.r-g.l-40)*(w[1]-w[0])};
 function fire(n,list){const now=performance.now();if(!G.gun){G.neut=now;A.sound.miss();G.miss='No charge, no push: neutral atoms drift and are pumped away. Switch on the electron gun.';tell(G.miss);A.kick();return}
  const L=list||[];if(!list){const iso=SAMP[G.s].iso,tot=iso.reduce((a,b)=>a+b[1],0);iso.forEach(([m,p])=>{const k=M.round(p*n/tot);for(let i=0;i<k;i++)L.push([m,G.z2&&i%10===3?2:1])})}
  L.forEach((q,i)=>{const t=tof(q[0]/q[1],G.V);G.fly.push({m:q[0],z:q[1],t,d:1400*t/TREF,t0:now+(L.length>3?(i*37%23)*9:0),y:.25+(i*53%47)/47*.5})});A.sound.whoosh();A.kick();tell('')}
 function arrive(q){G.hit.push({mz:q.m/q.z,t:q.t,m:q.m,z:q.z,s:G.s});if(q.g){G.gt=q.t;judgeGuess()}}
 function peaks(){const P={};G.hit.forEach(h=>{const k=h.mz;(P[k]=P[k]||{mz:k,t:h.t,n:0,m:h.m,z:h.z,s:h.s}).n++});return Object.values(P).sort((a,b)=>a.t-b.t)}
 function draw(A){const{ctx:x,col:C}=A,g=geo(),m=mode();x.fillStyle=A.mix(C.pn,C.cy,.04);x.fillRect(0,0,g.W,g.H);const yc=(g.y0+g.y1)/2,h=g.y1-g.y0;
  const sec=(a,t,col,lb)=>{const yl=g.y1+14+(g.N&&t?13:0);x.fillStyle=A.alpha(col,.14);x.fillRect(a[0],g.y0,a[1]-a[0],h);x.strokeStyle=A.alpha(col,.7);x.lineWidth=1.5;x.strokeRect(a[0],g.y0,a[1]-a[0],h);x.fillStyle=C.tx;x.font=F(700,g.N?10:11);x.textAlign='center';x.fillText(lb,M.max(a[0]+x.measureText(lb).width/2-4,M.min((a[0]+a[1])/2,g.de[1]-x.measureText(lb).width/2)),yl)};
  sec(g.io,0,G.gun?C.am:C.mu,'1 Ionise');sec(g.pl,1,C.vi,'2 Accelerate');sec(g.tu,0,C.cy,'3 Flight tube (vacuum, 1 m)');sec(g.de,1,C.gr,g.N?'4':'4 Detect');
  x.fillStyle=C.vi;x.fillRect(g.pl[0]+3,g.y0+6,4,h-12);x.fillRect(g.pl[1]-7,g.y0+6,4,h-12);x.font=F(800,12);x.fillText('+',g.pl[0]+5,g.y0-3);x.fillText('−',g.pl[1]-5,g.y0-3);
  x.fillStyle=G.gun?C.am:C.mu;x.font=F(700,g.N?10:11);x.fillText(G.gun?'e⁻ gun ON':'e⁻ gun off',(g.io[0]+g.io[1])/2,g.y0+14);if(G.gun){x.strokeStyle=C.am;x.setLineDash([3,3]);x.beginPath();x.moveTo((g.io[0]+g.io[1])/2,g.y0+20);x.lineTo((g.io[0]+g.io[1])/2,g.y1-8);x.stroke();x.setLineDash([])}
  x.fillStyle=C.gr;x.fillText('detector',g.de[0]-26,g.y0+14);
  const now=performance.now();if(G.neut&&now-G.neut<2000){const u=(now-G.neut)/2000;for(let i=0;i<5;i++){x.globalAlpha=1-u;A.paint.ball(g.io[0]+14+i*9+u*40,yc-16+i*8+u*(i-2)*18,4,C.mu)}x.globalAlpha=1}
  G.fly.forEach(q=>{const e=(now-q.t0)/q.d;if(e<0)return;const u=e<.12?e*e/.24:.06+(e-.12)/.88*.94,X=g.pl[0]+u*(g.de[0]-g.pl[0]);A.paint.ball(X,g.y0+q.y*h,G.fly.length>6?3.5:8,q.g?C.pk:q.z===2?C.or:C.vi);
   if(G.fly.length<=4)A.paint.label(lab(G.s,q.m,q.z)+' · '+(M.sqrt(2*q.z*E*G.V/(q.m*U))/1e5).toFixed(2)+'×10⁵ m/s',M.min(X,g.de[0]-70),g.y0+q.y*h-16,{bg:A.alpha(C.tx,.75),col:C.pn,font:'600 11px system-ui'})});
  // spectrum
  x.strokeStyle=A.alpha(C.mu,.7);x.lineWidth=1;x.beginPath();x.moveTo(g.l+30,g.sy0);x.lineTo(g.l+30,g.sy1);x.lineTo(g.r-10,g.sy1);x.stroke();x.fillStyle=C.mu;x.font=F(600,11);x.textAlign='center';
  {const w=win(),sp=w[1]-w[0],st=[.1,.2,.25,.5,1,2,2.5,5].find(v=>sp/v<=7)||5;for(let t=M.ceil(w[0]/st)*st;t<=w[1];t+=st){const X=tx(t,g);x.fillRect(X-.5,g.sy1,1,4);x.fillText(+t.toFixed(2),X,g.sy1+15)}}x.textAlign='left';x.fillText('detector current (abundance) ↑   time of flight / μs →',g.l+34,g.sy0-6);
  const P=peaks(),mx=M.max(1,...P.map(p=>p.n));P.forEach(p=>{const X=tx(p.t,g),Y=g.sy1-(g.sy1-g.sy0-16)*p.n/mx,on=G.tap&&G.tap.mz===p.mz;x.strokeStyle=on?(G.tap.ok?C.gr:C.rd):p.z===2?C.or:C.vi;x.lineWidth=on?4:3;x.beginPath();x.moveTo(X,g.sy1);x.lineTo(X,Y);x.stroke();
   if(on)A.paint.label('m/z '+p.mz+' · '+f2(p.t)+' μs',X,Y-12,{bg:A.alpha(G.tap.ok?C.gr:C.rd,.9)})});
  if(m==='find'){const X=tx(2*tof(16,G.V),g);x.strokeStyle=C.pk;x.setLineDash([5,4]);x.lineWidth=2;x.beginPath();x.moveTo(X,g.sy0+10);x.lineTo(X,g.sy1);x.stroke();x.setLineDash([]);x.fillStyle=C.pk;x.textAlign='center';x.fillText('mystery '+f2(2*tof(16,G.V)),X,g.sy0+8);
   const R=tx(tof(16,G.V),g);x.fillStyle=C.cy;x.fillText('¹⁶O⁺ '+f2(tof(16,G.V)),R,g.sy0+22);x.fillRect(R-1,g.sy0+26,2,g.sy1-g.sy0-26);if(G.gt){const Q=tx(G.gt,g);x.fillStyle=C.vi;x.fillRect(Q-2,g.sy0+30,4,g.sy1-g.sy0-30)}}
  x.textAlign='left';x.fillStyle=C.tx;x.font=F(800,g.N?14:16);wrap(x,head(),12,22,g.W-24,g.N?18:20);x.font=F(600,12);x.fillStyle=G.miss?C.rd:C.mu;wrap(x,G.miss||sub(),12,44,g.W-24,15);A.fx.draw(x)}
 function wrap(x,s,X,Y,w,lh){let row='',n=0;for(const t of s.split(' ')){const tt=row?row+' '+t:t;if(row&&x.measureText(tt).width>w){x.fillText(row,X,Y+n++*lh);row=t}else row=tt}x.fillText(row,X,Y+n*lh)}
 function head(){const m=mode(),n=G.hit.length;if(m==='ion')return`${SAMP[G.s].n} sample · ions detected: ${n}`;if(m==='race'){const h=G.hit;return h.length>=2?`²⁴Mg⁺ ${f2(tof(24,G.V))} μs · ²⁶Mg⁺ ${f2(tof(26,G.V))} μs`:'Each ion gets KE = zeV = '+(E*G.V/1e-16).toFixed(2)+'×10⁻¹⁶ J'}
  if(m==='spec')return G.tap&&G.tap.ok?'First peak found':`Boron spectrum · ions detected: ${n}`;if(m==='charge')return G.tap&&G.tap.ok?'2+ peak found':`Magnesium with some 2+ ions · peaks: ${peaks().length}`;
  if(m==='find')return`Your guess: m/z ${G.guess}`+(G.gt?` arrived at ${f2(G.gt)} μs`:'');if(m==='free')return`${SAMP[G.s].n} · ${G.V/1000} kV · ${G.z2?'some 2+ ions':'1+ ions only'}`;return G.Q?G.Q.t:''}
 function sub(){const m=mode();if(m==='ion')return'Tap the ionisation box (or the button) to switch the electron gun, then fire.';if(m==='race')return'Same push from the plates. Watch the speeds.';
  if(m==='spec'||m==='charge')return'Fire a burst, then tap a peak on the spectrum to label it.';if(m==='find')return'Set m/z (buttons, or drag along the time axis), fire it and land on the pink line.';if(m==='free')return'Change the sample, the voltage or the charge and fire.';return''}
 function tell(msg){const p=peaks().map(p=>'m/z '+p.mz+' at '+f2(p.t)+' microseconds, '+p.n+(p.n===1?' ion':' ions')).join('; ');const s=(msg?msg+' ':'')+head()+'. '+(p?'Spectrum: '+p+'. ':'')+sub();c.say(s);A.cv.setAttribute('aria-label',s);if(read)read.textContent=msg||'';controls();A.redraw();G.check()}
 function tapPeak(mz){const P=peaks(),p=P.find(q=>q.mz===mz);if(!p)return;const m=mode();let ok=0,msg;
  if(m==='spec'){ok=p===P[0];msg=ok?`Yes: m/z ${mz} is lighter, so faster. Its peak is small because only about 20% of boron is ¹⁰B.`:'That peak is tall because most boron is ¹¹B, but it arrived later. Height is abundance; the first peak has the smallest m/z.'}
  else if(m==='charge'){ok=p.z===2&&p.m===24;msg=ok?'Yes: ²⁴Mg²⁺ has m/z 24 ÷ 2 = 12, so it arrives before every 1+ ion.':p.z===2?`That is a 2+ ion too (m/z ${mz}). Find the 2+ ion of the most common isotope, ²⁴Mg.`:`m/z ${mz} is a 1+ ion. The 2+ ions get twice the push and arrive earlier.`}
  else msg=`m/z ${mz}: ${p.n} ions at ${f2(p.t)} μs.`;G.tap={mz,ok:ok||!(m==='spec'||m==='charge')};G.miss=G.tap.ok?'':msg;ok||!(m==='spec'||m==='charge')?A.sound.pop():A.sound.miss();tell(msg)}
 function judgeGuess(){const g=G.guess;let m;if(g===64){G.miss='';A.sound.pop();return tell('Match: twice the time means 2² = 4 × the m/z, so 4 × 16 = 64 (for example SO₂⁺).')}
  if(g===32)m='m/z 32 arrives at only √2 ≈ 1.41 × the ¹⁶O⁺ time. Time grows with √(m/z), so twice the time needs 4 × the m/z.';else if(g<64)m=`m/z ${g} arrives too soon (${f2(tof(g,G.V))} μs): lighter ions are faster. Go higher.`;else m=`m/z ${g} arrives too late (${f2(tof(g,G.V))} μs). Go lower.`;
  G.miss=m;A.sound.miss();tell(m)}
 function fireGuess(){if(G.fly.some(q=>q.g))return;G.gt=null;const t=tof(G.guess,G.V);G.fly.push({m:G.guess,z:1,t,d:1400*t/TREF,t0:performance.now(),y:.5,g:1});A.sound.whoosh();A.kick();tell('')}
 function setG(v){G.guess=M.max(2,M.min(70,v));G.gt=null;G.miss='';A.sound.tick();tell('')}
 function controls(){if(!A||!pad)return;pad.innerHTML='';const m=mode(),b=(t,f,lb)=>{c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':lb||null},pad,t).onclick=f};if(m==='quiz')return;
  if(m==='ion'||m==='free')b(G.gun?'Electron gun off':'Electron gun on',()=>{G.gun=!G.gun;G.miss='';A.sound.tick();tell(G.gun?'The electron gun knocks an electron off each atom: X(g) + e⁻ → X⁺(g) + 2e⁻.':'')});
  if(m==='ion')b('Fire atoms',()=>fire(5));if(m==='race')b('Race ²⁴Mg⁺ and ²⁶Mg⁺',race);
  if(m==='spec'||m==='charge'||m==='free')b('Fire a burst',()=>{G.hit=[];G.tap=null;fire(100)});
  if(m==='charge')b(G.z2?'Only 1+ ions':'Allow 2+ ions',()=>{G.z2=!G.z2;G.hit=[];G.tap=null;tell('')});
  if(m==='spec'||m==='charge'||m==='free')peaks().forEach(p=>b('m/z '+p.mz,()=>tapPeak(p.mz),'Label the peak at m/z '+p.mz));
  if(m==='find'){[-10,-1,1,10].forEach(d=>b((d>0?'+':'−')+M.abs(d),()=>setG(G.guess+d),(d>0?'Raise':'Lower')+' m/z by '+M.abs(d)));b('Fire m/z '+G.guess,fireGuess)}
  if(m==='free'){Object.keys(SAMP).forEach(k=>b(SAMP[k].n,()=>{G.s=k;G.hit=[];G.tap=null;tell('')}));b('Voltage −',()=>{G.V=M.max(1000,G.V-500);G.hit=[];tell('')},'Lower the voltage');b('Voltage +',()=>{G.V=M.min(4000,G.V+500);G.hit=[];tell('')},'Raise the voltage');b(G.z2?'Only 1+':'Allow 2+',()=>{G.z2=!G.z2;tell('')})}}
 function race(){G.hit=[];G.gun=1;fire(0,[[24,1],[26,1]])}
 A=null;const when=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg()+A.reveal(n))};
 const play=(fs,ms)=>{const g=++G.gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===G.gen)f()},A.reduced()?j*20:j*ms))};
 const reset=o=>{G.gen++;G.check=()=>{};Object.assign(G,{s:'Mg',gun:0,V:2000,z2:0,fly:[],hit:[],tap:null,guess:32,gt:null,miss:'',neut:0},o||{})};
 const steps=[
  {h:'Ionise first',p:'A vaporised sample enters the first box. The plates push only charged particles, and the detector only sees ions.',
   predict:{q:'Neutral magnesium atoms reach the charged plates. What happens?',opts:['They speed up like ions','Nothing pushes them: they have no charge'],ans:1},
   task:'Fire atoms, switch on the gun, then get ions to the detector',show:()=>play([()=>fire(5),()=>{G.gun=1;tell('')},()=>fire(5)],700),go:()=>{reset();G.check=when(0,()=>G.hit.length>=3,()=>'Only the ions were pushed and detected. That is why the sample must be ionised.')}},
  {h:'Same push, same energy',p:'The electric field gives every 1+ ion the same kinetic energy, zeV. Since KE = ½mv², a lighter ion must go faster.',
   predict:{q:'After the plates, ²⁴Mg⁺ and ²⁶Mg⁺ have…',opts:['the same speed','the same kinetic energy, so ²⁴Mg⁺ is faster','the same speed, but ²⁶Mg⁺ has more energy'],ans:1},
   task:'Race the two isotopes down the tube',show:()=>play([race],100),go:()=>{reset({gun:1});G.check=when(1,()=>G.hit.length>=2,()=>`Same energy, different speeds: ²⁴Mg⁺ took ${f2(tof(24,2000))} μs and ²⁶Mg⁺ ${f2(tof(26,2000))} μs over 1 m.`)}},
  {h:'Read the spectrum',p:'Each ion hits the detector, gains an electron and adds to the current. Peak position gives m/z; peak height gives abundance.',
   predict:{q:'Boron is about 80% ¹¹B and 20% ¹⁰B. Which peak arrives first?',opts:['The tall ¹¹B peak: more ions','The small ¹⁰B peak: lighter ions'],ans:1},
   task:'Fire a burst of boron, then tap the first peak',show:()=>play([()=>{G.hit=[];fire(100)},()=>tapPeak(10)],2000),go:()=>{reset({s:'B',gun:1});G.check=when(2,()=>G.tap&&G.tap.ok&&G.tap.mz===10,()=>'First means smallest m/z, not biggest peak. From the heights, Ar = (10 × 20 + 11 × 80) ÷ 100 = 10.8.')}},
  {h:'Charge counts: m/z',p:'The electron gun sometimes knocks off two electrons. A 2+ ion gets twice the push.',
   predict:{q:'Where does ²⁴Mg²⁺ appear?',opts:['With ²⁴Mg⁺: same mass, same time','Earlier, at m/z 12'],ans:1},
   task:'Allow 2+ ions, fire, then tap the ²⁴Mg²⁺ peak',show:()=>play([()=>{G.z2=1;G.hit=[];fire(100)},()=>tapPeak(12)],2100),go:()=>{reset({gun:1});G.check=when(3,()=>G.tap&&G.tap.ok&&G.tap.mz===12,()=>'The spectrometer sorts by m/z, mass ÷ charge, not by mass alone.')}},
  {h:'Find the mystery ion',p:'Flight time is t = d ÷ v, and v² = 2zeV ÷ m. So t grows with √(m/z). The mystery peak takes twice as long as ¹⁶O⁺.',
   predict:{q:'Twice the flight time of m/z 16 means m/z is…',opts:['32: double the time, double the m/z','64: four times as big'],ans:1},
   task:'Set m/z so your ion lands on the pink line',show:()=>play([()=>setG(64),fireGuess],400),go:()=>{reset({gun:1});G.check=when(4,()=>G.gt&&G.guess===64,()=>'t ∝ √(m/z): doubling t needs m/z × 4.')}},
  {h:'Sandbox',p:'Try neon or boron. Raise the voltage: every ion speeds up, but the order of the peaks never changes.',go:()=>reset({gun:1})},
  {h:'Challenge',p:'',go:()=>{G.gen++;G.check=()=>{};ask()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>G.check()});
 let qi=-1,run=0;
 function ask(){qi++;let t,opts;if(qi%2===0){const a=[5,6,7,8,10][qi/2%5],tt=[4,5,6][qi/2%3];t=`An ion with m/z ${a} takes ${tt} μs. In the same spectrometer, how long does an ion with m/z ${4*a} take?`;opts=[[`${2*tt} μs`,'ok'],[`${4*tt} μs`,'lin'],[`${tt/2} μs`,'inv']]}
  else{const Q=CQ[((qi-1)/2)%CQ.length];t=Q[0];opts=Q[1].slice()}const r=qi%3;opts=opts.slice(r).concat(opts.slice(0,r));G.Q={t};
  chal.innerHTML=`<p><b>${t}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');opts.forEach(o=>{c.el('button',{type:'button',class:'lbtn sm'},row,o[0]).onclick=()=>judge(o)});G.miss='';tell('Challenge: '+t)}
 function judge(o){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=o[1]==='ok';let m='Right.';
  if(ok&&qi%2===0)m='Right: 4 × the m/z gives √4 = 2 × the time.';else if(!ok)m=FB[o[1]];
  if(ok){run++;A.win()}else{run=0;A.sound.miss()}const s=(ok?'✓ ':'✗ ')+m;A.cv.setAttribute('aria-label',s);
  fb.innerHTML=`${s}${ok?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 function down(p){const m=mode(),g=geo();if(m==='quiz')return false;
  if((m==='ion'||m==='free')&&p.x<g.io[1]&&p.y>g.y0&&p.y<g.y1){G.gun=!G.gun;G.miss='';A.sound.tick();tell(G.gun?'Electron gun on.':'Electron gun off.');return false}
  if(p.y>g.sy0-10){if(m==='find'){G.drag=1;mv(p);return true}let best=null;peaks().forEach(q=>{const d=M.abs(tx(q.t,g)-p.x);if(d<22&&(!best||d<best.d))best={d,q}});if(best)tapPeak(best.q.mz)}return false}
 function mv(p){if(!G.drag)return;const t=xt(p.x,geo());G.guess=M.max(2,M.min(70,M.round(24*(t/tof(24,G.V))**2)));G.gt=null;G.miss='';A.redraw()}
 function up(){if(G.drag){G.drag=0;A.sound.tick();tell('')}}
 A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{const q=A.step===6;chal.hidden=!q;read.hidden=q;pad.hidden=q;if(!q)tell('')},
  init:A=>{const El=c.el,box=El('div',{class:'fl-below'},A.below);read=El('p',{class:'fl-read','aria-hidden':'true'},box);
   pad=El('div',{class:'fl-ctl',role:'group','aria-label':'Spectrometer controls'},box);chal=El('div',{class:'fl-chal'},A.below);A.gest({down,move:mv,up});
   A.every(()=>{if(!G.fly.length&&!(G.neut&&performance.now()-G.neut<2000))return false;const now=performance.now(),done=G.fly.filter(q=>now-q.t0>=q.d);if(done.length){G.fly=G.fly.filter(q=>now-q.t0<q.d);done.forEach(arrive);if(!G.fly.length||G.fly.length%20===0)tell('')}return true});reset();controls()}});
 A.start()})})();
