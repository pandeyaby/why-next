/* Flagship – fragmentation patterns (ages 17–18; A-level Chemistry mass spectrometry). M⁺• splits into a cation and a
   neutral radical; only the cation reaches the detector. Snip bonds in butanone, put the charge on the detected piece,
   predict base peaks from cation stability, tell isomers apart and label peaks. Heights rounded from NIST EI spectra.
   Not flagmion (finding M⁺ and Mr) or flagtof (how the spectrometer works). */
(()=>{
/* butanone pieces left to right, with masses: CH3 | CO | CH2 | CH3 */
const BUT=[['CH₃',15],['CO',28],['CH₂',14],['CH₃',15]];
const nm=(a,b)=>({'0-0':'CH₃','1-3':'C₂H₅CO','0-1':'CH₃CO','2-3':'C₂H₅','0-2':'CH₃COCH₂','3-3':'CH₃'})[a+'-'+b];
/* charge: [molecule, peak seen, [piece A, mass], [piece B, mass], index of the detected piece] */
const EQ=[['propan-1-ol',31,['CH₂OH',31],['C₂H₅',29],0],['propanone',43,['CH₃',15],['CH₃CO',43],1],['propan-2-ol',45,['CH₃CHOH',45],['CH₃',15],0],['benzaldehyde',77,['CHO',29],['C₆H₅',77],1]];
/* base peak: [molecule, candidate peaks, base, cation, reason] */
const BASE=[['propanone',[15,43,58],43,'CH₃CO⁺','an acylium ion, R–C≡O⁺, is stabilised by the oxygen'],['2-methylpropane',[15,43,58],43,'(CH₃)₂CH⁺','a secondary carbocation is more stable than CH₃⁺'],
 ['pentan-3-one',[29,57,86],57,'C₂H₅CO⁺','the acylium ion C₂H₅CO⁺ is the most stable cation it can make']];
/* isomer spectra (m/z, % height) */
const SPEC={p1:[[27,16],[29,18],[31,100],[42,14],[59,11],[60,7]],p2:[[27,17],[29,13],[43,19],[45,100],[59,3]],al:[[27,47],[28,58],[29,88],[57,30],[58,100]],
 one:[[15,12],[42,10],[43,100],[58,25]],k2:[[27,8],[41,14],[43,100],[58,10],[71,10],[86,20]],k3:[[27,12],[29,59],[57,100],[86,21]]};
/* pairs: [spectrum, [structure A, B], right, key] */
const ISO=[['p1',['propan-1-ol CH₃CH₂CH₂OH','propan-2-ol CH₃CH(OH)CH₃'],0,'31 is CH₂OH⁺, which only propan-1-ol can make'],['al',['propanone CH₃COCH₃','propanal CH₃CH₂CHO'],1,'29 (CHO⁺ or C₂H₅⁺) is tall and there is no big 43 for CH₃CO⁺'],
 ['k3',['pentan-2-one CH₃COC₃H₇','pentan-3-one C₂H₅COC₂H₅'],1,'57 is C₂H₅CO⁺ and there is no big 43 for CH₃CO⁺'],['p2',['propan-1-ol CH₃CH₂CH₂OH','propan-2-ol CH₃CH(OH)CH₃'],1,'45 is CH₃CHOH⁺: M⁺ lost a CH₃ from either side of the C–OH'],
 ['k2',['pentan-2-one CH₃COC₃H₇','pentan-3-one C₂H₅COC₂H₅'],0,'43 is CH₃CO⁺, which needs a CH₃ next to the C=O']];
/* butanone peaks and labels: [label, m/z] */
const BSPEC=[[15,4],[29,17],[43,100],[57,8],[72,25]],LAB=[['CH₃CO⁺',43],['C₂H₅⁺',29],['[CH₃COC₂H₅]⁺•',72],['C₂H₅CO⁺',57],['CH₃⁺',15]];
VIS.reg('flagfrag',c=>{let A,g,bar,cq,qi=-1,ep=0;const Z={};
const DK='#0f172a',GD='#047857',BD='#be123c',PL='#ffffff',GR='#64748b',HL='#1d4ed8',ION='#dbeafe',RAD='#e2e8f0';
const k=n=>Math.round(n*(A.narrow?.92:1.06)),fo=(n,w)=>`${w||700} ${k(n)}px system-ui,sans-serif`,on=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const now=()=>['snip','eq','base','iso','lab','quiz'][A.step];
const end={snip:()=>Z.snip.got.size>=4,eq:()=>Z.eq.n>=EQ.length,base:()=>Z.base.n>=BASE.length,iso:()=>Z.iso.n>=ISO.length,lab:()=>Z.lab.n>=LAB.length};
const hot=()=>A.col.dark?'#fda4af':BD,ink=()=>A.col.tx;
function wipe(){g.fillStyle=A.col.dark?'#0b1120':'#f8fafc';g.fillRect(0,0,A.W,A.H)}
function tf(n,w,al){g.font=fo(n,w);g.textAlign=al||'center';g.textBaseline='middle'}
function fill(t,x,y,w,n){const out=[];let s='';t.split(' ').forEach(q=>{const z=s?s+' '+q:q;if(g.measureText(z).width>w&&s){out.push(s);s=q}else s=z});out.push(s);
 const lh=k(n)*1.25;out.forEach((v,i)=>g.fillText(v,x,y+(i-(out.length-1)/2)*lh))}
function pill(r,t,o){o=o||{};g.fillStyle=o.bg||PL;A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();g.lineWidth=o.ring?3.5:1.4;g.strokeStyle=o.ring||GR;g.stroke();
 if(t!=null){g.fillStyle=o.tx||DK;tf(o.n||15,o.w||750);fill(t,r.x+r.w/2,r.y+r.h/2,r.w-10,o.n||15)}}
function top(t,won){tf(14,800);const w=Math.min(A.W-8,g.measureText(t).width+26),h=k(14)+14,y=A.H*.02;pill({x:A.W/2-w/2,y,w,h},null,{bg:won?'#d1fae5':PL,ring:won?GD:null});g.fillStyle=DK;g.fillText(t,A.W/2,y+h/2+1,w-12)}
function txt(t,y,n,col){g.fillStyle=col||ink();tf(n||14,650);fill(t,A.W/2,y,A.W-24,n||14)}
function done(t,L){wipe();top(t,1);L.forEach((s,i)=>pill({x:12,y:A.H*(.14+i*.2),w:A.W-24,h:A.H*.17},s,{n:15,bg:'#ecfdf5'}))}
/* a stick spectrum in box r; peaks [[mz,h]]; returns bar rects */
function spectrum(r,P,max,o){o=o||{};const X=m=>r.x+m/max*r.w;g.strokeStyle=ink();g.lineWidth=1.5;g.beginPath();g.moveTo(r.x,r.y);g.lineTo(r.x,r.y+r.h);g.lineTo(r.x+r.w,r.y+r.h);g.stroke();
 tf(10,650);g.fillStyle=ink();g.fillText('m/z',r.x+r.w-10,r.y+r.h+k(22));g.save();g.translate(r.x-k(10),r.y+r.h/2);g.rotate(-Math.PI/2);g.fillText('abundance',0,0);g.restore();
 const seen=[];P.slice().sort((a,b)=>b[1]-a[1]).forEach(([m])=>{const x=X(m);if(seen.every(v=>Math.abs(v-x)>k(17))){seen.push(x);tf(11,750);g.fillStyle=ink();g.fillText(String(m),x,r.y+r.h+k(10))}});
 return P.map(([m,h])=>{const x=X(m),y=r.y+r.h*(1-h/100),R={m,x:x-k(11),y:Math.min(y,r.y+r.h-k(26)),w:k(22),h:r.y+r.h-Math.min(y,r.y+r.h-k(26))};
  g.fillStyle=o.mark&&o.mark(m)?HL:(o.ghost?GR:(A.col.dark?'#93c5fd':'#1e40af'));g.fillRect(x-2.5,y,5,r.y+r.h-y);
  if(o.ring&&o.ring(m)){g.strokeStyle=BD;g.lineWidth=2.5;g.strokeRect(R.x,R.y,R.w,R.h)}return R})}
/* step 1: snip a bond in butanone */
function groups(){const n=BUT.length,w=Math.min(k(66),(A.W-40)/n-12),y=A.H*.16,h=k(44),gap=(A.W-24-n*w)/(n-1);return BUT.map((b,i)=>({i,t:b[0],x:12+i*(w+gap),y,w,h}))}
function bonds(){const G=groups();return G.slice(1).map((r,i)=>({b:i,x:G[i].x+G[i].w,y:r.y,w:r.x-(G[i].x+G[i].w),h:r.h}))}
function sides(){const b=Z.snip.cut;if(b==null)return[];const w=(A.W-36)/2,y=A.H*.32,h=k(46),L=[[0,b],[b+1,3]];
 return L.map(([a,z],j)=>{const m=BUT.slice(a,z+1).reduce((s,q)=>s+q[1],0);return{j,a,z,m,t:`${nm(a,z)} (${m})`,x:12+j*(w+12),y,w,h}})}
function drawSnip(){const s=Z.snip;wipe();if(end.snip())return done('4 fragment peaks made',['One break gives one cation and one radical.','Only the cation is detected.','Butanone: 15, 29, 43, 57 (and M⁺ at 72)']);
 top(s.cut==null?'Tap a bond to break it':'Tap the piece that keeps the + charge');
 groups().forEach(r=>pill(r,r.t,{n:15,bg:s.cut!=null&&r.i<=s.cut?ION:PL}));bonds().forEach(r=>{g.strokeStyle=s.cut===r.b?BD:ink();g.lineWidth=s.cut===r.b?4:3;g.setLineDash(s.cut===r.b?[4,4]:[]);g.beginPath();g.moveTo(r.x+2,r.y+r.h/2);g.lineTo(r.x+r.w-2,r.y+r.h/2);g.stroke();g.setLineDash([])});
 sides().forEach(r=>pill(r,r.t,{n:15,bg:'#fef3c7',tx:'#78350f'}));if(s.msg)txt(s.msg,A.H*.47,13,s.ok?(A.col.dark?'#6ee7b7':GD):s.warn?hot():ink());
 spectrum({x:k(30),y:A.H*.56,w:A.W-k(46),h:A.H*.3},[...s.got].map(m=>[m,60]).concat([[72,30]]),80,{mark:m=>m!==72})}
function snipBond(b){const s=Z.snip;if(end.snip())return;s.cut=b;s.ok=0;s.warn=0;s.msg='One bond broke. Which piece is the ion?';A.sound.tick();say(s.msg)}
function charge(j){const s=Z.snip;if(end.snip()||s.cut==null)return;const S=sides(),ion=S[j],rad=S[1-j];let m;
 const eq=`[CH₃COCH₂CH₃]⁺• → ${nm(ion.a,ion.z)}⁺ + ${nm(rad.a,rad.z)}•`;s.cut=null;
 if(s.got.has(ion.m)){A.sound.miss();s.ok=0;s.warn=1;m=`${eq}. You already have the peak at ${ion.m}. Try the other piece, or another bond.`;s.msg=m;return say(m)}
 s.got.add(ion.m);s.ok=1;A.sound.pop();s.msg=`${eq}: a peak at ${ion.m}. The ${rad.m}-mass radical is neutral, so it is not detected.`;say(s.msg)}
/* step 2: which piece carries the charge */
function eqOpts(){const [, ,a,b]=EQ[Z.eq.n],w=(A.W-36)/2,h=k(56),y=A.H*.5;return[a,b].map((p,j)=>({j,t:`${p[0]}  (${p[1]})`,x:12+j*(w+12),y,w,h}))}
function drawEq(){const s=Z.eq;wipe();if(end.eq())return done('4 equations written',['M⁺• → cation⁺ + radical•','The peak gives the mass of the cation.','Charge and the odd electron go to different pieces.']);
 const [mol,pk]=EQ[s.n];top(`${s.n+1} of 4: ${mol} has a peak at m/z ${pk}`);txt('Drag the + onto the piece that is detected.',A.H*.15,14);
 txt(`[M]⁺•  →  ? ⁺  +  ? •`,A.H*.25,20);eqOpts().forEach(r=>pill(r,r.t,{n:16,bg:s.bad===r.j?'#ffe4e6':PL,ring:s.bad===r.j?BD:null}));
 const P=Z.drag&&Z.drag.plus?Z.drag:{x:A.W/2,y:A.H*.38};g.fillStyle=HL;g.beginPath();g.arc(P.x,P.y,k(24),0,7);g.fill();g.fillStyle='#ffffff';tf(26,900);g.fillText('+',P.x,P.y+1);
 if(s.msg)txt(s.msg,A.H*.75,13,hot())}
function eqPick(j){const s=Z.eq;if(end.eq())return;const [mol,pk,a,b,ans]=EQ[s.n],P=[a,b];let m;
 if(j===ans){s.n++;s.bad=null;s.msg='';A.sound.pop();return say(`[${mol}]⁺• → ${P[j][0]}⁺ + ${P[1-j][0]}•. The cation has mass ${pk}, so it makes the peak.`)}
 s.bad=j;A.sound.miss();m=`${P[j][0]} has mass ${P[j][1]}, not ${pk}. With the + it would be the peak; here it is the neutral radical, which is not detected.`;s.msg=m;say(m)}
/* step 3: which peak is the base peak */
function drawBase(){const s=Z.base;wipe();if(end.base())return done('3 base peaks predicted',['Acylium ions RCO⁺ are stable.','More substituted carbocations are more stable.','Most stable cation → most ions → tallest peak.']);
 const [mol,P]=BASE[s.n];top(`${mol}: tap the peak you think is tallest`);s.R=spectrum({x:k(30),y:A.H*.16,w:A.W-k(46),h:A.H*.4},P.map(m=>[m,55]),95,{ghost:1,ring:m=>s.bad===m});
 if(s.msg)txt(s.msg,A.H*.78,13,hot())}
function basePick(m){const s=Z.base;if(end.base())return;const [mol,,b,ion,why]=BASE[s.n];let t;
 if(m===b){s.n++;s.bad=null;s.msg='';A.sound.pop();return say(`Yes: ${b} is ${ion} in ${mol}; ${why}.`)}
 s.bad=m;A.sound.miss();t=m===BASE[s.n][1][2]?`${m} is M⁺•. It is often small: most molecular ions break up before they reach the detector.`:`${m} is a less stable cation, so fewer of them form. The tallest peak comes from the most stable cation.`;s.msg=t;say(t)}
/* step 4: tell isomers apart */
function isoBoxes(){const [,N]=ISO[Z.iso.n],w=(A.W-36)/2,h=k(64),y=A.H*.74;return N.map((t,j)=>({j,t,x:12+j*(w+12),y,w,h}))}
function specCard(){const w=A.W-24,h=A.H*.5;return Z.drag&&Z.drag.spec?{x:Z.drag.x-w/2,y:Z.drag.y-h/3,w,h}:{x:12,y:A.H*.1,w,h}}
function drawIso(){const s=Z.iso;wipe();if(end.iso())return done('5 spectra matched',['propan-1-ol 31 vs propan-2-ol 45','propanal 29 vs propanone 43','pentan-3-one 57 vs pentan-2-one 43']);
 top(`${s.n+1} of 5: drag the spectrum onto its molecule`);const r=specCard();pill(r,null,{bg:A.col.dark?'#111827':PL,ring:Z.drag?HL:null});
 spectrum({x:r.x+k(28),y:r.y+k(12),w:r.w-k(40),h:r.h-k(46)},SPEC[ISO[s.n][0]],90);
 isoBoxes().forEach(b=>pill(b,b.t,{n:13,bg:s.bad===b.j?'#ffe4e6':'#ede9fe',ring:s.bad===b.j?BD:null}));if(s.msg)txt(s.msg,A.H*.66,12,hot())}
function isoPick(j){const s=Z.iso;if(end.iso())return;const [,N,ans,key]=ISO[s.n];let m;
 if(j===ans){s.n++;s.bad=null;s.msg='';A.sound.pop();return say(`${N[ans].split(' ')[0]}: ${key}.`)}
 s.bad=j;A.sound.miss();m=`Both have the same M⁺, so look at the fragments: ${key}.`;s.msg=m;say(m)}
/* step 5: label butanone's peaks */
function drawLab(){const s=Z.lab;wipe();if(end.lab())return done('Butanone labelled',['72 M⁺•, 57 C₂H₅CO⁺, 43 CH₃CO⁺ (base)','29 C₂H₅⁺, 15 CH₃⁺','Mass = 12 per C, 1 per H, 16 per O']);
 top(`Label ${s.n+1} of 5: drag it onto its peak`);s.R=spectrum({x:k(30),y:A.H*.3,w:A.W-k(46),h:A.H*.48},BSPEC,80,{ring:m=>s.bad===m,mark:m=>s.put.includes(m)});
 const L=LAB[s.n][0],w=k(150),h=k(46),r=Z.drag&&Z.drag.lab?{x:Z.drag.x-w/2,y:Z.drag.y-h/2,w,h}:{x:A.W/2-w/2,y:A.H*.13,w,h};s.box=r;pill(r,L,{n:16,bg:'#fef3c7',tx:'#78350f',ring:Z.drag?HL:null});
 if(s.msg)txt(s.msg,A.H*.25,12,hot())}
function labPick(m){const s=Z.lab;if(end.lab())return;const [L,mz]=LAB[s.n];let t;
 if(m===mz){s.put.push(mz);s.n++;s.bad=null;s.msg='';A.sound.pop();return say(`${L} at ${mz}.`)}
 s.bad=m;A.sound.miss();t=`${L} has mass ${mz} (C = 12, H = 1, O = 16), not ${m}.`;s.msg=t;say(t)}
function down(p){const q=now();
 if(q==='snip'&&!end.snip()){const b=bonds().find(r=>on(p,{x:r.x-6,y:r.y-8,w:r.w+12,h:r.h+16}));if(b)return snipBond(b.b),false;const r=sides().find(r=>on(p,r));if(r)charge(r.j)}
 if(q==='base'&&!end.base()&&Z.base.R){const r=Z.base.R.find(r=>on(p,{x:r.x-6,y:r.y-20,w:r.w+12,h:r.h+40}));if(r)basePick(r.m)}
 if(q==='eq'&&!end.eq()&&Math.hypot(p.x-A.W/2,p.y-A.H*.38)<k(34)){Z.drag={plus:1,x:p.x,y:p.y};A.redraw();return true}
 if(q==='iso'&&!end.iso()&&on(p,specCard())){Z.drag={spec:1,x:p.x,y:p.y};A.redraw();return true}
 if(q==='lab'&&!end.lab()&&on(p,Z.lab.box)){Z.drag={lab:1,x:p.x,y:p.y};A.redraw();return true}return false}
function move(p){if(Z.drag){Z.drag.x=p.x;Z.drag.y=p.y;A.redraw()}}
function up(p){const d=Z.drag;if(!d)return;Z.drag=null;const q=now();
 if(q==='eq'){const r=eqOpts().find(r=>on(p,r));if(r)return eqPick(r.j)}
 if(q==='iso'){const r=isoBoxes().find(r=>on(p,{x:r.x,y:r.y-30,w:r.w,h:r.h+30}));if(r)return isoPick(r.j)}
 if(q==='lab'&&Z.lab.R){const r=Z.lab.R.find(r=>on(p,{x:r.x-8,y:r.y-40,w:r.w+16,h:r.h+60}));if(r)return labPick(r.m)}A.redraw()}
function zero(){ep++;for(const q in Z)delete Z[q];Object.assign(Z,{snip:{got:new Set(),cut:null},eq:{n:0},base:{n:0},iso:{n:0},lab:{n:0,put:[]},drag:null,goal:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();Z.goal()}
function start(i,first,ok,msg){zero();say(first);Z.goal=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function play(i,acts,ms){steps[i].go();const me=ep;acts.forEach((f,j)=>setTimeout(()=>{if(me===ep)f()},ms*(j+1)))}
function keys(){if(!bar)return;bar.innerHTML='';const q=now(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},bar,t).onclick=f};
 if(q==='snip'&&!end.snip()){if(Z.snip.cut==null)bonds().forEach(r=>b(`Break ${BUT[r.b][0]}–${BUT[r.b+1][0]}`,()=>snipBond(r.b)));else sides().forEach(r=>b(`+ on ${r.t}`,()=>charge(r.j),`Charge on ${r.t}`))}
 if(q==='eq'&&!end.eq())eqOpts().forEach(r=>b(`+ on ${r.t}`,()=>eqPick(r.j),`Charge on ${r.t}`));
 if(q==='base'&&!end.base())BASE[Z.base.n][1].forEach(m=>b(`m/z ${m}`,()=>basePick(m),`Tallest is m/z ${m}`));
 if(q==='iso'&&!end.iso())ISO[Z.iso.n][1].forEach((t,j)=>b(t.split(' ')[0],()=>isoPick(j),`Spectrum is ${t}`));
 if(q==='lab'&&!end.lab())BSPEC.forEach(([m])=>b(`m/z ${m}`,()=>labPick(m),`Put ${LAB[Z.lab.n][0]} on m/z ${m}`))}
const steps=[
{h:'Snip a bond',p:'The molecular ion M⁺• has lost one electron. It can split into two pieces: one keeps the + charge, the other is a neutral radical. Only ions are detected.',
predict:{q:'One bond in M⁺• breaks. How many peaks does that one break give?',opts:['two, one for each piece','one: only the charged piece'],ans:1},task:'Make 4 different peaks',
show:()=>play(0,[()=>snipBond(0),()=>charge(0),()=>snipBond(1),()=>charge(0),()=>snipBond(1),()=>charge(1),()=>snipBond(0),()=>charge(1)],450),go:()=>start(0,'Tap a bond to break it.',end.snip,'A fragment peak is the mass of the cation.')},
{h:'Where is the charge?',p:'Write M⁺• → X⁺ + Y•. The peak tells you which piece is X⁺: its mass equals the m/z value. The other piece is the radical.',
predict:{q:'In M⁺• → X⁺ + Y•, what is Y?',opts:['another ion','a neutral radical'],ans:1},task:'Write all 4 equations',
show:()=>play(1,EQ.map(q=>()=>eqPick(q[4])),600),go:()=>start(1,'Drag the + onto the piece that is detected.',end.eq,'The + goes on the piece whose mass is the m/z.')},
{h:'The tallest peak',p:'The base peak is the tallest. It comes from the most stable cation, because more of those form. Acylium ions (RCO⁺) and secondary or tertiary cations are stable.',
predict:{q:'In propanone, which peak is tallest?',opts:['58, the molecular ion','43, CH₃CO⁺'],ans:1},task:'Predict all 3 base peaks',
show:()=>play(2,BASE.map(q=>()=>basePick(q[2])),600),go:()=>start(2,'Tap the peak you think is tallest.',end.base,'Stable cation, tall peak.')},
{h:'Tell isomers apart',p:'Isomers have the same M⁺, so M⁺ cannot tell them apart. Their fragments can. Look for the peak only one of them can make.',task:'Match all 5 spectra',
show:()=>play(3,ISO.map(q=>()=>isoPick(q[2])),600),go:()=>start(3,'Drag the spectrum onto its molecule.',end.iso,'Same M⁺, different fragments.')},
{h:'Label the peaks',p:'Work out each fragment mass: C = 12, H = 1, O = 16. Then drag each label onto its peak in the spectrum of butanone.',task:'Label all 5 peaks',
show:()=>play(4,LAB.map(q=>()=>labPick(q[1])),500),go:()=>start(4,'Drag the label onto its peak.',end.lab,'Every peak is a cation you can name.')},
{h:'Challenge',p:'',go:()=>{zero();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.goal()});
const QS=[
{q:'A ketone has a large peak at m/z 43. Which ion is most likely?',a:'CH₃CO⁺',o:[['CH₃⁺','CH₃⁺ is at 15. 43 = 12 + 3 + 12 + 16.'],['C₂H₅⁺','C₂H₅⁺ is at 29.']]},
{q:'Which equation for a fragmentation is right?',a:'[C₂H₅OH]⁺• → CH₂OH⁺ + CH₃•',o:[['[C₂H₅OH]⁺• → CH₂OH⁺ + CH₃⁺','The charge is not shared out: one piece is a neutral radical.'],['[C₂H₅OH]⁺• → CH₂OH• + CH₃•','One piece must keep the + charge, or nothing would be detected.']]},
{q:'Propan-1-ol and propan-2-ol: which peak tells them apart?',a:'31 vs 45',o:[['60 vs 60','Both have M⁺ = 60, so M⁺ cannot tell isomers apart.'],['29 vs 29','Both show a peak at 29, so it does not tell them apart.']]},
{q:'Why is the base peak of pentan-3-one at 57?',a:'C₂H₅CO⁺ is a stable acylium ion',o:[['57 is the molecular ion','M⁺ for C₅H₁₀O is 86, not 57.'],['C₂H₅⁺ is the most stable cation','C₂H₅⁺ is at 29, and it is a primary cation.']]},
{q:'A peak at m/z 77 in an aromatic compound suggests…',a:'C₆H₅⁺',o:[['C₆H₆⁺•','C₆H₆ has mass 78.'],['C₆H₅•','A radical is neutral and is not detected.']]}];
function quiz(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,''],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 cq.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=cq.querySelector('.fl-pick');ord.forEach(([v,m])=>{c.el('button',{type:'button',class:'lbtn'},box,v).onclick=()=>grade(m,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function grade(m,a){cq.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=cq.querySelector('.fl-fb'),ok=!m;if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+m)+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':m)}
function draw(){const q=now();if(q==='quiz'){wipe();top('Challenge',1);['M⁺• → X⁺ + Y•','Peak = mass of the cation','Stable cation → base peak','Isomers: compare fragments'].forEach((t,i)=>txt(t,A.H*(.26+i*.15),17));return}
 ({snip:drawSnip,eq:drawEq,base:drawBase,iso:drawIso,lab:drawLab})[q]();A.fx.draw(A.ctx)}
FK.shell(c,{steps,ratio:.66,tall:1.2,draw,onStep:B=>{cq.hidden=B.step!==5;bar.hidden=B.step===5;keys()},
 init:B=>{A=B;g=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);bar=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Spectrum buttons'},w);cq=c.el('div',{class:'fl-chal'},A.below);zero();A.gest({down,move,up});keys()}}).start()})})();
