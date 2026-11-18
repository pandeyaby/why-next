/* Flagship – high-resolution mass spectrometry (ages 17–18; A-level Chemistry: precise isotopic masses to 4 d.p. tell
   apart molecular formulae with the same nominal mass, e.g. CO 27.9949, N₂ 28.0061, C₂H₄ 28.0313). Drag each formula
   to its peak, build a formula to hit a measured M⁺, drag the decimal-places slider until peaks split, match a
   measured mass, then find the slip in a worked sum. Isotope masses from NIST (shown to 6 d.p.): ¹H 1.007825, ¹²C 12 exactly, ¹⁴N 14.003074, ¹⁶O 15.994915. */
(()=>{
const MS={C:12,H:1.00782503,N:14.00307401,O:15.99491462},EL=['C','H','N','O'],SUB='₀₁₂₃₄₅₆₇₈₉';
const fm=f=>EL.map(e=>f[e]?e+(f[e]>1?String(f[e]).split('').map(d=>SUB[d]).join(''):''):'').join(''),mz=f=>EL.reduce((a,e)=>a+(f[e]||0)*MS[e],0),d4=v=>v.toFixed(4);
const P=s=>{const f={};s.replace(/([CHNO])(\d*)/g,(_,e,n)=>{f[e]=+(n||1)});return f};
/* step 1: the three 28s, dropped onto their peaks */
const TRIO=['CO','N2','C2H4'].map(P);
/* step 2: [target formula] — learner builds it from the measured mass */
const BUILD=['C2H4O','CO2','CH2O'].map(P);
/* step 3: sets of formulas and the fewest decimal places that tell them apart */
const SETS=[[['C2H6O','C2H4O'],0],[['C2H4O','C3H8'],1],[['CO','N2','C2H4'],2],[['CO2','N2O'],2]].map(([a,k])=>[a.map(P),k]);
/* step 4: [measured formula, candidates] (the first candidate is right; shown in rotated order) */
const MATCH=[['C3H6O','C4H10','C2H2O2'],['CH2O','C2H6','N2H2'],['N2O','CO2','C3H8'],['C2H4O2','C3H8O','CH4N2O']].map(a=>a.map(P));
/* step 5: [worked lines, wrong line, why] */
const SLIPS=[[['C₂H₄O','C: 2 × 12.000000 = 24.000000','H: 4 × 1.008 = 4.032','O: 1 × 15.994915 = 15.994915','Total: 44.0269'],2,'1.008 is the average Ar of hydrogen. HRMS uses the ¹H isotope mass, 1.007825.'],
 [['C₃H₈','C: 3 × 12.011 = 36.033','H: 8 × 1.007825 = 8.062600','Total: 44.0956'],1,'12.011 is the average Ar of carbon. The ¹²C isotope mass is exactly 12.'],
 [['C₃H₆O','C: 3 × 12.000000 = 36.000000','H: 6 × 1.007825 = 6.046950','O: 1 × 15.994915 = 15.994915','Total: 58'],4,'Rounding to 58 throws away the decimals that tell C₃H₆O from C₄H₁₀.'],
 [['C₂H₆','C: 2 × 12.000000 = 24.000000','H: 4 × 1.007825 = 4.031300','Total: 28.0313'],2,'C₂H₆ has 6 hydrogens, not 4. The total should be 30.0470.']];
VIS.reg('flagaccm',c=>{let A,X,ctl,chq,qk=-1,run=0,grab=null;const G={};
const INKD='#0f172a',PAPR='#ffffff',GREY='#64748b',GOOD='#047857',BAD='#be123c',NAVY='#1d4ed8',ROSE='#fde2e7',MINT='#dcfce7',GOLD='#fef9c3',ICE='#e0f2fe',LILY='#ede9fe';
const z=n=>Math.round(n*(A.narrow?.9:1.05)),fo=(n,w)=>`${w||700} ${z(n)}px system-ui,sans-serif`,hitR=(p,r,m=0)=>r&&p.x>=r.x-m&&p.x<=r.x+r.w+m&&p.y>=r.y-m&&p.y<=r.y+r.h+m;
const ORD=['peak','build','dp','match','slip','quiz'],now=()=>ORD[A.step],LEN={peak:3,build:BUILD.length,dp:SETS.length,match:MATCH.length,slip:SLIPS.length},fin=n=>G[n].i>=LEN[n];
const warn=()=>A.col.dark?'#fda4af':BAD,ink=()=>A.col.tx;
function back(){X.fillStyle=A.col.dark?'#0b1120':'#f8fafc';X.fillRect(0,0,A.W,A.H)}
function ft(n,w,al){X.font=fo(n,w);X.textAlign=al||'center';X.textBaseline='middle'}
function para(t,x,y,w,n){const out=[];let ln='';for(const wd of String(t).split(' ')){const tr=ln?ln+' '+wd:wd;if(ln&&X.measureText(tr).width>w){out.push(ln);ln=wd}else ln=tr}out.push(ln);
 const lh=z(n)*1.28;out.forEach((s,i)=>X.fillText(s,x,y+(i-(out.length-1)/2)*lh))}
function chip(r,t,o={}){X.fillStyle=o.bg||PAPR;A.paint.rrect(r.x,r.y,r.w,r.h,10);X.fill();X.lineWidth=o.ring?3.2:1.2;X.strokeStyle=o.ring||GREY;X.stroke();
 if(t!=null){X.fillStyle=o.fg||INKD;ft(o.n||17,o.w||700);para(t,r.x+r.w/2,r.y+r.h/2,r.w-12,o.n||17)}}
function top(t,won){ft(14,800);const w=Math.min(A.W-8,X.measureText(t).width+28),h=z(14)+14,y=A.H*.02;chip({x:A.W/2-w/2,y,w,h},null,{bg:won?MINT:PAPR,ring:won?GOOD:null});X.fillStyle=INKD;X.fillText(t,A.W/2,y+h/2+1,w-12)}
function say1(t,y,n,col){X.fillStyle=col||ink();ft(n||14,650);para(t,A.W/2,y,A.W-28,n||14)}
function end(t,L){back();top(t,1);L.forEach((s,i)=>chip({x:12,y:A.H*(.16+i*.21),w:A.W-24,h:A.H*.17},s,{n:16,bg:'#ecfdf5'}))}
function table(y){ft(12,650);X.fillStyle=ink();X.fillText('¹H 1.007825   ¹²C 12.000000   ¹⁴N 14.003074   ¹⁶O 15.994915',A.W/2,y,A.W-16)}
/* ---- 1: drag the formula to its peak ---- */
const LO=27.985,HI=28.04,axX=v=>24+(v-LO)/(HI-LO)*(A.W-48);
function peakR(){return TRIO.map((f,j)=>{const x=axX(mz(f)),w=z(74);return{j,x:x-w/2,y:A.H*.14,w,h:A.H*.38,cx:x}})}
function drawPeak(){const s=G.peak;back();if(fin('peak'))return end('All 3 peaks named',['CO 27.9949: ¹⁶O is under 16','N₂ 28.0061','C₂H₄ 28.0313: each H adds 0.0078']);
 const f=TRIO[s.order[s.i]];top(`Formula ${s.i+1} of 3: drag it to its peak`);const base=A.H*.52;X.strokeStyle=ink();X.lineWidth=1.5;X.beginPath();X.moveTo(18,base);X.lineTo(A.W-18,base);X.stroke();
 peakR().forEach(r=>{const done=s.named[r.j];X.fillStyle=s.bad===r.j?BAD:done?GOOD:(A.col.dark?'#93c5fd':NAVY);X.fillRect(r.cx-3,r.y+z(26),6,base-r.y-z(26));
  ft(12,750);X.fillStyle=ink();X.fillText(d4(mz(TRIO[r.j])),r.cx,base+z(14));if(done)chip({x:r.cx-z(34),y:r.y,w:z(68),h:z(24)},fm(TRIO[r.j]),{n:13,bg:MINT})});
 table(A.H*.62);if(s.msg)say1(s.msg,A.H*.69,12,warn());const c0=cardR();chip(grab?{...c0,x:grab.x-c0.w/2,y:grab.y-c0.h/2}:c0,fm(f),{n:24,w:800,bg:GOLD,ring:grab?NAVY:null})}
function cardR(){const w=z(130);return{x:A.W/2-w/2,y:A.H*.78,w,h:z(52)}}
function peak(j){const s=G.peak;if(fin('peak'))return;const k=s.order[s.i],f=TRIO[k];let m;
 if(j===k){s.named[k]=1;s.i++;s.msg='';s.bad=null;A.sound.pop();return speak(`Yes: ${fm(f)} adds up to ${d4(mz(f))}.`)}
 s.bad=j;A.sound.miss();m=`${fm(f)} adds up to ${d4(mz(f))}, not ${d4(mz(TRIO[j]))}. Use the isotope masses.`;s.msg=m;speak(m)}
/* ---- 2: build the formula ---- */
function pmR(){const g=z(8),w=(A.W-24-g*3)/4,h=z(44);return EL.flatMap((e,j)=>[{e,d:1,x:12+j*(w+g),y:A.H*.56,w,h},{e,d:-1,x:12+j*(w+g),y:A.H*.56+h+z(40),w,h}])}
function drawBuild(){const s=G.build;back();if(fin('build'))return end('All 3 formulas built',['44.0262 = C₂H₄O','43.9898 = CO₂','30.0106 = CH₂O']);
 const T=BUILD[s.i],have=mz(s.f);top(`Mass ${s.i+1} of 3: build the formula`);chip({x:12,y:A.H*.11,w:A.W-24,h:z(44)},`Measured M⁺ = ${d4(mz(T))}`,{n:19,w:800,bg:GOLD});
 chip({x:12,y:A.H*.11+z(52),w:A.W-24,h:z(44)},`${fm(s.f)||'nothing yet'} = ${d4(have)}`,{n:19,w:800,bg:Math.abs(have-mz(T))<5e-5?MINT:ICE});table(A.H*.42);
 if(s.msg)say1(s.msg,A.H*.49,12,warn());const g=pmR();g.forEach(r=>chip(r,(r.d>0?'+ ':'− ')+r.e,{n:18,bg:r.d>0?LILY:PAPR}));
 EL.forEach((e,j)=>{const r=g[j*2];ft(16,800);X.fillStyle=ink();X.fillText(`${e}: ${s.f[e]||0}`,r.x+r.w/2,r.y+r.h+z(20))})}
function nudge(e,d){const s=G.build;if(fin('build'))return;s.f[e]=Math.max(0,Math.min(9,(s.f[e]||0)+d));const T=BUILD[s.i],have=mz(s.f),want=mz(T);let m='';
 if(Math.abs(have-want)<5e-5){s.i++;s.f={};s.msg='';A.sound.pop();return speak(`Yes: ${fm(T)} = ${d4(want)}, a perfect match.`)}
 A.sound.tick();if(Math.round(have)===Math.round(want)&&EL.some(k=>s.f[k]))m=`Nominal mass ${Math.round(have)} fits, but ${d4(have)} is ${d4(Math.abs(have-want))} ${have>want?'too high':'too low'}. Same 44, wrong formula.`;s.msg=m;speak(m||`${fm(s.f)||'Nothing'} = ${d4(have)}. Target ${d4(want)}.`)}
/* ---- 3: decimal places slider ---- */
function trackR(){return{x:z(30),y:A.H*.64,w:A.W-z(60),h:z(10)}}
const dpX=k=>{const t=trackR();return t.x+k/4*t.w};
function drawDp(){const s=G.dp;back();if(fin('dp'))return end('All 4 sets checked',['Different whole numbers: 0 d.p. is enough','C₂H₄O v C₃H₈: 1 d.p.','CO, N₂, C₂H₄ and CO₂ v N₂O: 2 d.p.']);
 const [F]=SETS[s.i],k=s.k,vals=F.map(f=>mz(f).toFixed(k));top(`Set ${s.i+1} of 4: fewest decimal places to tell apart`);
 const w=(A.W-24-z(8)*(F.length-1))/F.length;F.forEach((f,j)=>{const same=vals.filter(v=>v===vals[j]).length>1;const bx=12+j*(w+z(8));chip({x:bx,y:A.H*.13,w,h:z(78)},null,{bg:same?ROSE:MINT,ring:same?BAD:null});
  ft(18,800);X.fillStyle=INKD;X.fillText(fm(f),bx+w/2,A.H*.13+z(24),w-8);ft(17,750);X.fillText(vals[j],bx+w/2,A.H*.13+z(56),w-8)});
 say1(`Instrument reads to ${k} decimal place${k===1?'':'s'}. Drag the dial, then let go.`,A.H*.44,13);if(s.msg)say1(s.msg,A.H*.53,12,warn());
 const t=trackR();X.fillStyle=A.col.dark?'#334155':'#cbd5e1';A.paint.rrect(t.x,t.y,t.w,t.h,5);X.fill();
 for(let q=0;q<=4;q++){ft(13,700);X.fillStyle=ink();X.fillText(q+' d.p.',dpX(q),t.y+z(30))}
 const kx=grab?grab.x:dpX(k);X.fillStyle=A.col.dark?'#93c5fd':NAVY;X.beginPath();X.arc(kx,t.y+t.h/2,z(16),0,7);X.fill()}
function setDp(k){const s=G.dp;if(fin('dp'))return;s.k=k;const [F,ok]=SETS[s.i],vals=F.map(f=>mz(f).toFixed(k)),apart=new Set(vals).size===vals.length;let m;
 if(k===ok){s.i++;s.k=4;s.msg='';A.sound.pop();return speak(`Yes: at ${k} d.p. they read ${vals.join(', ')}, all different.`)}
 A.sound.miss();if(!apart){const v=vals.find((x,j)=>vals.indexOf(x)!==j);m=`At ${k} d.p. two of them both read ${v}. The instrument cannot tell them apart.`}
 else m=`They do split at ${k} d.p., but fewer decimal places already separate them.`;s.msg=m;speak(m)}
/* ---- 4: match the measured mass ---- */
function rot(i){const a=[0,1,2],r=i%3;return a.slice(r).concat(a.slice(0,r))}
function matchR(){const h=z(52);return rot(G.match.i).map((v,j)=>({v,x:12,y:A.H*(.42+j*.17),w:A.W-24,h}))}
function drawMatch(){const s=G.match;back();if(fin('match'))return end('All 4 masses matched',['58.0419 = C₃H₆O','30.0106 = CH₂O, 44.0011 = N₂O','60.0211 = C₂H₄O₂']);
 const C=MATCH[s.i];top(`Spectrum ${s.i+1} of 4: which formula?`);chip({x:12,y:A.H*.11,w:A.W-24,h:z(48)},`M⁺ measured at ${d4(mz(C[0]))}`,{n:19,w:800,bg:GOLD});table(A.H*.29);
 if(s.msg)say1(s.msg,A.H*.36,12,warn());matchR().forEach(r=>chip(r,fm(C[r.v]),{n:20,w:800,bg:s.bad===r.v?ROSE:ICE,ring:s.bad===r.v?BAD:null}))}
function match(v){const s=G.match;if(fin('match'))return;const C=MATCH[s.i],want=mz(C[0]),got=mz(C[v]);let m;
 if(v===0){s.i++;s.msg='';s.bad=null;A.sound.pop();return speak(`Yes: ${fm(C[0])} adds up to ${d4(want)}.`)}
 s.bad=v;A.sound.miss();m=`${fm(C[v])} adds up to ${d4(got)}, ${d4(Math.abs(got-want))} ${got>want?'too high':'too low'}. Same nominal mass, different formula.`;s.msg=m;speak(m)}
/* ---- 5: slip in a worked sum ---- */
function slipR(){const L=SLIPS[G.slip.i][0],h=z(40);return L.map((t,j)=>({t,j,x:12,y:A.H*.12+j*(h+z(8)),w:A.W-24,h}))}
function drawSlip(){const s=G.slip;back();if(fin('slip'))return end('All 4 slips found',['Use isotope masses, not average Ar','¹²C is exactly 12','Keep 4 d.p. and count every atom']);
 top(`Working ${s.i+1} of 4: tap the wrong line`);slipR().forEach(r=>chip(r,r.t,{n:16,w:r.j?650:800,bg:s.bad===r.j?ROSE:r.j?PAPR:GOLD,ring:s.bad===r.j?BAD:null}));
 if(s.msg)say1(s.msg,A.H*.86,12,warn())}
function slip(j){const s=G.slip;if(fin('slip'))return;const [L,bad,why]=SLIPS[s.i];let m;
 if(j===bad){s.i++;s.msg='';s.bad=null;A.sound.pop();return speak(`Found it. ${why}`)}
 s.bad=j;A.sound.miss();m=j===0?'The formula line is just the question. Check the sums below it.':`${L[j].split(' =')[0]} is right. Check the masses and the atom counts.`;s.msg=m;speak(m)}
/* ---- pointer ---- */
function down(p){const n=now();if(n!=='quiz'&&fin(n))return false;
 if(n==='peak'&&hitR(p,cardR())){grab={x:p.x,y:p.y};A.redraw();return true}
 if(n==='peak'){const r=peakR().find(r=>hitR(p,r));if(r)peak(r.j)}
 if(n==='build'){const r=pmR().find(r=>hitR(p,r));if(r)nudge(r.e,r.d)}
 if(n==='dp'){const t=trackR();if(p.y>t.y-z(30)&&p.y<t.y+z(40)){grab={x:Math.max(t.x,Math.min(t.x+t.w,p.x)),y:p.y};A.redraw();return true}}
 if(n==='match'){const r=matchR().find(r=>hitR(p,r));if(r)match(r.v)}
 if(n==='slip'){const r=slipR().find(r=>hitR(p,r));if(r)slip(r.j)}return false}
function move(p){if(!grab)return;if(now()==='dp'){const t=trackR();grab.x=Math.max(t.x,Math.min(t.x+t.w,p.x));G.dp.k=Math.round((grab.x-t.x)/t.w*4)}else{grab.x=p.x;grab.y=p.y}A.redraw()}
function up(p){if(!grab)return;const g=grab;grab=null;const n=now();
 if(n==='peak'){const r=peakR().find(r=>hitR(p,r,10));if(r)peak(r.j);else A.redraw()}
 if(n==='dp'){const t=trackR();setDp(Math.round((g.x-t.x)/t.w*4))}}
function reset(){run++;grab=null;for(const q in G)delete G[q];Object.assign(G,{peak:{i:0,order:[2,0,1],named:{}},build:{i:0,f:{}},dp:{i:0,k:4},match:{i:0},slip:{i:0},check:()=>{}})}
function speak(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();btns();G.check()}
function open(i,first,ok,msg){reset();speak(first);G.check=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function play(i,acts,ms){steps[i].go();const me=run;acts.forEach((f,j)=>setTimeout(()=>{if(me===run)f()},ms*(j+1)))}
function btns(){if(!ctl)return;ctl.innerHTML='';const n=now(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};if(n==='quiz'||fin(n))return;
 if(n==='peak'){const f=TRIO[G.peak.order[G.peak.i]];TRIO.forEach((q,j)=>add(d4(mz(q)),()=>peak(j),`Put ${fm(f)} on the peak at ${d4(mz(q))}`))}
 if(n==='build')EL.forEach(e=>{add('+'+e,()=>nudge(e,1),`Add one ${e}`);add('−'+e,()=>nudge(e,-1),`Take away one ${e}`)});
 if(n==='dp')[0,1,2,3,4].forEach(k=>add(k+' d.p.',()=>setDp(k),`Read to ${k} decimal places`));
 if(n==='match')rot(G.match.i).forEach(v=>add(fm(MATCH[G.match.i][v]),()=>match(v)));
 if(n==='slip')SLIPS[G.slip.i][0].forEach((t,j)=>add(`Line ${j+1}`,()=>slip(j),`Line ${j+1}, ${t}, is wrong`))}
const fillB=f=>()=>{const s=G.build;s.f={...f};const e=EL.find(k=>f[k]);s.f[e]--;nudge(e,1)};
const steps=[
{h:'Three molecules, one Mr',p:'CO, N₂ and C₂H₄ all have a nominal mass of 28. A high-resolution instrument measures M⁺ to four decimal places. Drag each formula to its peak.',
predict:{q:'Will high-resolution MS show CO, N₂ and C₂H₄ at the same m/z?',opts:['yes, they are all 28','no, the decimals differ'],ans:1},task:'Name all 3 peaks',
show:()=>play(0,[2,0,1].map(k=>()=>peak(k)),600),go:()=>open(0,'Drag the formula onto the peak at its accurate mass.',()=>fin('peak'),'Same nominal mass, three accurate masses.')},
{h:'Add the isotope masses',p:'An accurate mass is the sum of the isotope masses of the atoms. Tap + and − to build a formula that hits the measured M⁺.',
predict:{q:'Why is ¹²C exactly 12 when ¹H is 1.007825?',opts:['all atoms weigh whole numbers','¹²C defines the mass unit'],ans:1},task:'Build all 3',
show:()=>play(1,BUILD.map(f=>fillB(f)),700),go:()=>open(1,'Build the formula whose accurate mass matches M⁺.',()=>fin('build'),'Each formula has its own accurate mass.')},
{h:'How many decimals?',p:'A low-resolution instrument rounds m/z. Drag the dial to the fewest decimal places that still tell every formula in the set apart.',task:'Check all 4 sets',
show:()=>play(2,SETS.map(q=>()=>setDp(q[1])),700),go:()=>open(2,'Drag the dial to the fewest decimal places that split the set.',()=>fin('dp'),'Low resolution merges formulas with the same nominal mass.')},
{h:'Match the spectrum',p:'Each M⁺ was measured to four decimal places. Add up the isotope masses and choose the formula that matches.',
predict:{q:'M⁺ is 58.0419. Could C₄H₁₀ (also 58) be the compound?',opts:['yes, the nominal mass fits','no, it adds to 58.0783'],ans:1},task:'Match all 4',
show:()=>play(3,MATCH.map(()=>()=>match(0)),600),go:()=>open(3,'Tap the formula whose accurate mass matches M⁺.',()=>fin('match'),'The formula is the one whose sum matches to 4 d.p.')},
{h:'Find the slip',p:'Each working has one wrong line. Tap it.',task:'Find all 4',
show:()=>play(4,SLIPS.map(q=>()=>slip(q[1])),650),go:()=>open(4,'Tap the line with the slip.',()=>fin('slip'),'Every slip found.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>G.check()});
const QS=[
{q:'M⁺ is at 44.0262. Which formula is it?',a:'C₂H₄O',o:[['CO₂','CO₂ adds to 43.9898, which is 0.0364 too low.'],['C₃H₈','C₃H₈ adds to 44.0626, which is 0.0364 too high.']]},
{q:'Why is the mass of ¹²C exactly 12?',a:'The unit is defined as 1/12 of a ¹²C atom.',o:[['Every atom has a whole-number mass.','¹H is 1.007825 and ¹⁶O is 15.994915: isotope masses are not whole numbers.'],['It is rounded.','It is exact by definition, not rounded.']]},
{q:'Why can a low-resolution spectrum not tell CO from N₂?',a:'Both read 28 when m/z is rounded.',o:[['They fragment the same way.','The question is about M⁺. The masses differ only after the decimal point.'],['N₂ does not ionise.','N₂ ionises fine. Rounded to 28, the two peaks overlap.']]},
{q:'Which mass for hydrogen do you use in HRMS?',a:'1.007825',o:[['1.008','1.008 is the average Ar, mixing in ²H. Use the ¹H isotope mass.'],['1','A whole number loses the decimals that HRMS needs.']]},
{q:'What is the accurate mass of N₂?',a:'28.0061',o:[['28.0134','That uses Ar 14.0067. Use the ¹⁴N isotope mass, 14.003074.'],['28.0000','Only ¹²C is a whole number. 2 × 14.003074 = 28.0061.']]},
{q:'Which peak gives the molecular formula in HRMS?',a:'The M⁺ peak',o:[['The tallest peak','The tallest is the base peak, often a fragment.'],['The M+1 peak','M+1 comes from ¹³C and is small. Use M⁺.']]}];
function ask(){qk++;const T=QS[qk%QS.length],all=[[T.a,''],...T.o],r=qk%3,ord=all.slice(r).concat(all.slice(0,r));
 chq.innerHTML=`<p><b>${T.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=chq.querySelector('.fl-pick');ord.forEach(([v,why])=>{c.el('button',{type:'button',class:'lbtn'},g,v).onclick=()=>score(why,T.a)});c.say('Challenge: '+T.q);A.redraw()}
function score(why,a){chq.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chq.querySelector('.fl-fb'),ok=!why;if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why)+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why)}
function draw(){const n=now();if(n==='quiz'){back();top('Challenge',1);['Sum isotope masses, not average Ar','¹²C is exactly 12','Same nominal mass, different 4 d.p. mass'].forEach((t,i)=>chip({x:14,y:A.H*(.2+i*.24),w:A.W-28,h:A.H*.18},t,{n:17,bg:[GOLD,MINT,ICE][i]}));return}
 ({peak:drawPeak,build:drawBuild,dp:drawDp,match:drawMatch,slip:drawSlip})[n]();A.fx.draw(A.ctx)}
FK.shell(c,{steps,ratio:.7,tall:1.3,draw,onStep:B=>{chq.hidden=B.step!==5;ctl.hidden=B.step===5;btns()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Mass spectrometry buttons'},w);chq=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});btns()}}).start()})})();
