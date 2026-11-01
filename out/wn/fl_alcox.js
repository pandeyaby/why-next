/* Flagship – primary, secondary and tertiary alcohols (ages 16–18): drag an –OH round a branched carbon skeleton and
   classify by the carbons bonded to the C–OH carbon (not the size of the molecule); warm three alcohols with acidified
   dichromate(VI) and watch orange turn green or stay orange; strip H from O and H from C to form C=O and find that a
   tertiary centre has no C–H to lose; choose distillation or reflux to stop at propanal or go on to propanoic acid;
   then predict the products of four oxidations. Every canvas action has a button twin. */
(()=>{
const CLS=['primary (1°)','secondary (2°)','tertiary (3°)'];
const NB=[[1],[0,2,4],[1,3],[2],[1]];/* 2-methylbutane skeleton: C1 C2 C3 C4 in a chain, C5 a methyl branch on C2 */
const TUBE=[{n:'propan-1-ol',c:0},{n:'propan-2-ol',c:1},{n:'2-methylpropan-2-ol',c:2}];
const SUBS=[['CH₃','H','H'],['CH₃','CH₃','H'],['CH₃','CH₃','CH₃']],MADE=['propanal, an aldehyde: C=O at the end of the chain','propanone, a ketone: C=O inside the chain'];
const ROWS=[{a:'butan-1-ol + excess oxidant, reflux',o:['Butanal','Butanoic acid','Butanone'],k:1,w:['Under reflux the aldehyde cannot escape, so it is oxidised on to the acid.','','Butan-1-ol is primary: the –OH is on an end carbon, so no ketone.']},
 {a:'butan-2-ol, reflux',o:['Butanoic acid','Butanal','Butanone'],k:2,w:['A secondary alcohol stops at the ketone. No C–C bond breaks to make an acid.','The C–OH carbon has 2 carbon neighbours, so the C=O is inside the chain: a ketone.','']},
 {a:'2-methylpropan-2-ol, reflux',o:['2-Methylpropanoic acid','No reaction: stays orange','Butanone'],k:1,w:['Tertiary: the C–OH carbon has no H, so no C=O can form.','','Making butanone would need a C–C bond to break. Dichromate does not do that.']},
 {a:'ethanol, distil off as it forms',o:['Ethanal','Ethanoic acid','Propanone'],k:0,w:['','Distilling removes ethanal (bp 20 °C) before it is oxidised further.','Ethanol has 2 carbons and is primary, so it cannot give a 3-carbon ketone.']}];
VIS.reg('flagalcox',c=>{let A,pad,qb,qn=-1,run=0,ver=0;
const S={};const fresh=()=>Object.assign(S,{oh:-1,drag:null,seen:new Set(),tube:[0,0,0],heat:[0,0,0],cls:0,rmO:[0,0,0],rmC:[0,0,0],cv:[0,0,0],tried:0,kit:-1,flow:0,made:new Set(),pick:[-1,-1,-1,-1],want:()=>{}});fresh();
const mode=()=>['class','tubes','co','kit','rows','quiz'][A.step];
const speak=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
const q=n=>Math.round(n*(A.narrow?1:1.12));
function tx(g,t,x,y,n,col,w,al){g.font=`${w||700} ${q(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col;g.fillText(t,x,y)}
const sh=(h,k)=>A.mix(A.col.pn,h,A.col.dark?k*.3:k);
function rr(g,b,f,e){g.fillStyle=f;A.paint.rrect(b.x,b.y,b.w,b.h,10);g.fill();g.lineWidth=2;g.strokeStyle=e||A.mix(A.col.tx,A.col.pn,.55);g.stroke()}
const near=(p,o,r)=>Math.hypot(p.x-o.x,p.y-o.y)<r;
const cpos=i=>{const W=A.W,H=A.H;return[{x:W*.18,y:H*.5},{x:W*.39,y:H*.36},{x:W*.6,y:H*.5},{x:W*.81,y:H*.36},{x:W*.39,y:H*.14}][i]};
const ohPos=()=>S.drag||(S.oh<0?{x:A.W*.5,y:A.H*.82}:(()=>{const p=cpos(S.oh);return S.oh===4?{x:p.x-A.W*.13,y:p.y}:{x:p.x,y:p.y+A.H*.2}})());
const tubeX=i=>A.W*(.2+i*.3),rowB=i=>({x:10,y:A.H*(.04+i*.24),w:A.W-20,h:A.H*.21});
const CEN=()=>({x:A.W*.42,y:A.H*.42}),SPOT=[{dx:0,dy:-1},{dx:-1,dy:0},{dx:0,dy:1}];
function draw(A){const{ctx:g,W,H,col:C}=A,m=mode(),ink=C.tx,mu=C.mu;g.fillStyle=sh('#ecfeff',.3);g.fillRect(0,0,W,H);
 if(m==='class'){g.lineWidth=4;g.strokeStyle=A.mix(ink,C.pn,.35);NB.forEach((n,i)=>n.forEach(j=>{if(j>i){const a=cpos(i),b=cpos(j);g.beginPath();g.moveTo(a.x,a.y);g.lineTo(b.x,b.y);g.stroke()}}));
  const o=ohPos();if(S.oh>=0&&!S.drag){const p=cpos(S.oh);g.beginPath();g.moveTo(p.x,p.y);g.lineTo(o.x,o.y);g.stroke()}
  NB.forEach((n,i)=>{const p=cpos(i),on=i===S.oh;A.paint.ball(p.x,p.y,18,on?C.am:'#64748b');tx(g,'C',p.x,p.y,14,'#fff',900)});
  A.paint.ball(o.x,o.y,20,'#dc2626');tx(g,'OH',o.x,o.y,12,'#fff',900);
  if(S.oh>=0){const n=NB[S.oh].length;tx(g,`${n} C neighbour${n>1?'s':''}, ${3-n} H → ${CLS[n-1]}`,W/2,H*.95,12,ink,800)}else tx(g,'Drag the –OH onto a carbon',W/2,H*.95,13,mu)}
 if(m==='tubes'){TUBE.forEach((t,i)=>{const x=tubeX(i),top=H*.12,h=H*.5,w=Math.min(54,W*.15),u=S.tube[i],col=A.mix('#ea580c','#15803d',u);
   g.fillStyle=sh('#ffffff',.9);A.paint.rrect(x-w/2,top,w,h,w/2);g.fill();g.lineWidth=2;g.strokeStyle=A.mix(ink,C.pn,.4);g.stroke();g.fillStyle=S.heat[i]?col:A.alpha('#ea580c',.85);A.paint.rrect(x-w/2+4,top+h*.45,w-8,h*.55-4,w/2-4);g.fill();
   if(S.heat[i])tx(g,'🔥',x,top+h+20,18,ink);t.n.replace('lp','l\np').split('\n').forEach((l,j,a)=>tx(g,l,x,H*(.78-(a.length-1)*.03+j*.06),11,ink,800));tx(g,CLS[t.c].split(' ')[0],x,H*.86,11,mu,700);
   if(S.heat[i]===2)tx(g,u>.5?'green':'stays orange',x,H*.93,11,ink,800)})}
 if(m==='co'){const o=CEN(),L=Math.min(W,H)*.2,sub=SUBS[S.cls],done=S.cv[S.cls];['1°','2°','3°'].forEach((t,i)=>{const b={x:10+i*(W-20)/3,y:H*.02,w:(W-20)/3-6,h:H*.1};rr(g,b,i===S.cls?sh('#fde68a',1):sh('#ffffff',.9));tx(g,t+(S.cv[i]?' ✓':''),b.x+b.w/2,b.y+b.h/2,13,ink,800)});
  g.lineWidth=3;g.strokeStyle=A.mix(ink,C.pn,.3);sub.forEach((s,i)=>{if(done&&s==='H'&&i===sub.lastIndexOf('H'))return;const d=SPOT[i],p={x:o.x+d.dx*L,y:o.y+d.dy*L};g.beginPath();g.moveTo(o.x,o.y);g.lineTo(p.x,p.y);g.stroke();
   A.paint.ball(p.x,p.y,s==='H'?14:19,s==='H'?'#94a3b8':'#475569');tx(g,s,p.x,p.y,s==='H'?12:11,'#fff',900)});
  const ox=o.x+L,hx=ox+L*.75;g.beginPath();g.moveTo(o.x,o.y-(done?5:0));g.lineTo(ox,o.y-(done?5:0));if(done){g.moveTo(o.x,o.y+5);g.lineTo(ox,o.y+5)}g.stroke();
  if(!done&&!S.rmO[S.cls]){g.beginPath();g.moveTo(ox,o.y);g.lineTo(hx,o.y);g.stroke();A.paint.ball(hx,o.y,14,'#94a3b8');tx(g,'H',hx,o.y,12,'#fff',900)}
  A.paint.ball(o.x,o.y,20,'#334155');tx(g,'C',o.x,o.y,14,'#fff',900);A.paint.ball(ox,o.y,18,'#dc2626');tx(g,'O',ox,o.y,13,'#fff',900);
  tx(g,done?MADE[S.cls].split(':')[0]+' + H₂O':S.cls===2&&S.tried?'No H on this carbon: no C=O':'Tap the H on O, then an H on C',W/2,H*.93,13,ink,800)}
 if(m==='kit'){const fx=W*.3,fy=H*.66,r=Math.min(W,H)*.13,ref=S.kit===1;g.lineWidth=3;g.strokeStyle=A.mix(ink,C.pn,.35);g.fillStyle=sh('#ffffff',.9);g.beginPath();g.arc(fx,fy,r,0,7);g.fill();g.stroke();
  g.fillStyle=A.mix('#ea580c','#15803d',S.made.has(ref?'acid':'al')&&S.flow>=1?1:S.flow*.6);g.beginPath();g.arc(fx,fy,r-5,.15,Math.PI-.15);g.fill();if(S.flow)tx(g,'🔥',fx,fy+r+16,18,ink);
  if(S.kit===0){g.beginPath();g.moveTo(fx,fy-r);g.lineTo(fx,fy-r*1.6);g.lineTo(W*.78,fy-r*.6);g.stroke();g.lineWidth=10;g.strokeStyle=A.alpha(C.cy,.5);g.beginPath();g.moveTo(fx+W*.08,fy-r*1.5);g.lineTo(W*.7,fy-r*.8);g.stroke();
   g.lineWidth=3;g.strokeStyle=A.mix(ink,C.pn,.35);g.strokeRect(W*.74,fy-r*.5,W*.1,r*1.2);if(S.flow)for(let k=0;k<4;k++){const u=(S.flow*3+k/4)%1;g.fillStyle=C.cy;g.beginPath();g.arc(fx+(W*.78-fx)*u,fy-r*1.6+(r)*u,3,0,7);g.fill()}
   tx(g,'distillation',W*.62,H*.1,13,ink,800);if(S.made.has('al'))tx(g,'propanal (bp 48 °C) collected',W*.62,H*.95,12,ink,800)}
  if(ref){g.strokeRect(fx-8,fy-r*3.3,16,r*2.3);g.lineWidth=12;g.strokeStyle=A.alpha(C.cy,.5);g.beginPath();g.moveTo(fx,fy-r*3.1);g.lineTo(fx,fy-r*1.2);g.stroke();
   if(S.flow)for(let k=0;k<3;k++){const u=(S.flow*3+k/3)%1;g.fillStyle=C.cy;g.beginPath();g.arc(fx,fy-r*1.1-r*2*(u<.5?u*2:2-u*2),3,0,7);g.fill()}
   tx(g,'reflux',W*.66,H*.1,13,ink,800);if(S.made.has('acid'))tx(g,'propanoic acid stays in the flask',W*.62,H*.95,12,ink,800)}
  if(S.kit<0)tx(g,'Choose the apparatus',W*.66,H*.2,13,mu)}
 if(m==='rows')ROWS.forEach((r,i)=>{const b=rowB(i),p=S.pick[i],good=p===r.k;rr(g,b,p<0?sh('#ffffff',.9):good?sh('#dcfce7',1):sh('#fee2e2',1),p>=0&&!good?C.rd:0);tx(g,r.a,b.x+10,b.y+b.h*.3,12,ink,800,'left');tx(g,p<0?'Tap to choose a product':(good?'✓ ':'✗ ')+r.o[p],b.x+10,b.y+b.h*.7,13,ink,700,'left')});
 if(m==='quiz'){tx(g,'1° → aldehyde → acid · 2° → ketone · 3° → no reaction',W/2,H*.45,12,ink,800)}A.fx.draw(g)}
/* actions */
function putOH(i){S.oh=i;const n=NB[i].length;S.seen.add(n);A.sound.tick();speak(`The –OH is on a carbon with ${n} carbon neighbour${n>1?'s':''} and ${3-n} H. This is a ${CLS[n-1]} alcohol.${S.seen.size<3?` Classes found: ${S.seen.size} of 3.`:''}`);S.want();keys();A.redraw()}
function warm(i){if(S.heat[i])return;S.heat[i]=1;const k=ver,o=TUBE[i].c<2;A.sound.pop();A.tween(S.tube,{[i]:o?1:0},A.reduced()?1:1100,'io',()=>{if(k!==ver)return;S.heat[i]=2;speak(o?`${TUBE[i].n} turns the dichromate from orange to green: the alcohol is oxidised and Cr₂O₇²⁻ is reduced to Cr³⁺.`:`${TUBE[i].n} stays orange. A tertiary alcohol is not oxidised.`);S.want();A.redraw()})}
function pickCls(i){S.cls=i;A.sound.tick();speak(`${CLS[i]} centre: the C–OH carbon has ${i+1} carbon group${i?'s':''} and ${2-i} H.`);keys();A.redraw()}
function strip(which){const i=S.cls;if(S.cv[i])return;if(which==='O'){S.rmO[i]=1;A.sound.tick();speak('H removed from the O. Now an H must leave the carbon too.')}
 else if(which==='C'){if(i===2){S.tried=1;A.sound.miss();speak('There is no H on this carbon, only carbon groups. No C=O can form, so a tertiary alcohol is not oxidised.');S.want()}
  else if(!S.rmO[i]){A.sound.miss();speak('Take the H from the O first; both H atoms leave, joining [O] to make water.')}else{S.cv[i]=1;A.sound.pop();speak(`C=O formed: ${MADE[i]}. The two H atoms and [O] make H₂O.`);S.want()}}
 else{A.sound.miss();speak('That is a carbon group. Oxidation removes H atoms, not carbon. A C–C bond does not break.')}keys();A.redraw()}
function setKit(k){S.kit=k;S.flow=0;A.sound.tick();speak(k?'Reflux: the condenser is upright, so vapour drips back into the flask.':'Distillation: vapour goes through the condenser into a separate flask.');keys();A.redraw()}
function heat(){if(S.kit<0)return speak('Choose distillation or reflux first.');const k=ver,o=S;S.flow=0;A.tween(o,{flow:1},A.reduced()?1:1000,'io',()=>{if(k!==ver)return;const p=S.kit?'acid':'al';S.made.add(p);A.sound.pop();
 speak(S.kit?'Under reflux the propanal (bp 48 °C) keeps dripping back and is oxidised on to propanoic acid.':'Propanal (bp 48 °C) boils off as it forms, well below propan-1-ol (97 °C), so it escapes before further oxidation.');S.want();keys();A.redraw()})}
function choose(i,k){S.pick[i]=k;const r=ROWS[i];if(k===r.k){A.sound.pop();speak(`${r.a}: ${r.o[k]}.`);S.want()}else{A.sound.miss();speak(r.w[k])}keys();A.redraw()}
function keys(){if(!pad)return;pad.innerHTML='';const m=mode(),B=(t,f)=>{c.el('button',{type:'button',class:'lbtn ghost sm'},pad,t).onclick=f};
 if(m==='class')NB.forEach((n,i)=>B(`Put –OH on C${i+1}${i===4?' (branch)':''}`,()=>putOH(i)));
 if(m==='tubes')TUBE.forEach((t,i)=>{if(!S.heat[i])B(`🔥 Warm ${t.n} with dichromate`,()=>warm(i))});
 if(m==='co'){[0,1,2].forEach(i=>{if(i!==S.cls)B(`Show the ${CLS[i]} centre`,()=>pickCls(i))});if(!S.cv[S.cls]){B('Remove H from the O',()=>strip('O'));B('Remove H from the C–OH carbon',()=>strip('C'))}}
 if(m==='kit'){B('Set up distillation',()=>setKit(0));B('Set up reflux',()=>setKit(1));B('🔥 Heat with excess oxidant',heat)}
 if(m==='rows')ROWS.forEach((r,i)=>{if(S.pick[i]!==r.k)r.o.forEach((o,k)=>B(`${r.a.split(',')[0]} → ${o}`,()=>choose(i,k)))})}
function down(p){const m=mode();
 if(m==='class'){if(near(p,ohPos(),30)){S.drag={x:p.x,y:p.y};return true}const i=NB.findIndex((n,j)=>near(p,cpos(j),26));if(i>=0)putOH(i);return false}
 if(m==='tubes'){const i=[0,1,2].find(k=>Math.abs(p.x-tubeX(k))<A.W*.12);if(i!=null)warm(i);return false}
 if(m==='co'){if(p.y<A.H*.13){pickCls(Math.min(2,Math.floor((p.x-10)/((A.W-20)/3))));return false}const o=CEN(),L=Math.min(A.W,A.H)*.2;
  if(near(p,{x:o.x+L*1.75,y:o.y},24))strip('O');else{const i=SPOT.findIndex(d=>near(p,{x:o.x+d.dx*L,y:o.y+d.dy*L},24));if(i>=0)strip(SUBS[S.cls][i]==='H'?'C':'R')}return false}
 if(m==='kit'){if(near(p,{x:A.W*.3,y:A.H*.66},A.H*.15))heat();else setKit(p.x>A.W*.5?0:1);return false}
 if(m==='rows'){const i=[0,1,2,3].findIndex(k=>{const b=rowB(k);return p.y>=b.y&&p.y<=b.y+b.h});if(i>=0)choose(i,(S.pick[i]+1)%3);return false}return false}
function move(p){if(S.drag){S.drag.x=p.x;S.drag.y=p.y;A.redraw()}}
function up(p){if(!S.drag)return;S.drag=null;let b=-1,d=1e9;NB.forEach((n,i)=>{const e=Math.hypot(p.x-cpos(i).x,p.y-cpos(i).y);if(e<d){d=e;b=i}});if(d<A.W*.14)putOH(b);A.redraw()}
const ok=(n,f,msg)=>()=>{if(A.step===n&&f()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const reset=(n,f,msg,t)=>{ver++;fresh();S.want=ok(n,f,msg);speak(t);keys()};
function later(fs,gap){const k=ver;fs.forEach((f,j)=>setTimeout(()=>{if(k===ver)f()},A.reduced()?j*30+10:j*gap+200))}
const steps=[
{h:'Classify by neighbours',p:'Find the carbon that holds the –OH. Count the carbons bonded to it: 1 means primary, 2 secondary, 3 tertiary. Drag the –OH round the skeleton.',
 predict:{q:'What decides whether an alcohol is primary, secondary or tertiary?',opts:['How many carbons the whole molecule has','How many carbons are bonded to the C–OH carbon','Whether the chain is branched'],ans:1},task:'Make a primary, a secondary and a tertiary alcohol',
 show:()=>{steps[0].go();later([()=>putOH(0),()=>putOH(2),()=>putOH(1)],600)},go:()=>reset(0,()=>S.seen.size>=3,'Same 5 carbons, three classes: only the C–OH carbon\'s neighbours count.','A branched 5-carbon skeleton.')},
{h:'Warm with dichromate',p:'Acidified potassium dichromate(VI) is orange. If it oxidises the alcohol, it is reduced to green Cr³⁺. Warm each tube.',
 predict:{q:'Which tubes turn from orange to green?',opts:['All three: every alcohol is oxidised','The primary and the secondary only','The tertiary only: it has the most carbons'],ans:1},task:'Warm all 3 tubes',
 show:()=>{steps[1].go();later([0,1,2].map(i=>()=>warm(i)),500)},go:()=>reset(1,()=>S.heat.every(h=>h===2),'Primary and secondary alcohols turn it green. The tertiary one stays orange.','Three alcohols, one oxidant.')},
{h:'Where the C=O comes from',p:'Oxidation takes an H from the O and an H from the C–OH carbon, leaving C=O. Try it on each centre.',task:'Make C=O from 1° and 2°, then try 3°',
 show:()=>{steps[2].go();later([()=>strip('O'),()=>strip('C'),()=>pickCls(1),()=>strip('O'),()=>strip('C'),()=>pickCls(2),()=>strip('O'),()=>strip('C')],450)},go:()=>reset(2,()=>S.cv[0]&&S.cv[1]&&S.tried,'1° gives an aldehyde, 2° a ketone. 3° has no C–H to lose, so it resists.','The C–OH centre of a primary alcohol.')},
{h:'Distil or reflux?',p:'Propan-1-ol is oxidised first to propanal, then to propanoic acid. The apparatus decides where it stops.',
 predict:{q:'Heat propan-1-ol with excess oxidant under reflux. What do you get?',opts:['Propanal','Propanoic acid','Propanone'],ans:1},task:'Make propanal, then make propanoic acid',
 show:()=>{steps[3].go();later([()=>setKit(0),heat,()=>setKit(1),heat],1150)},go:()=>reset(3,()=>S.made.size>=2,'Distil to collect the aldehyde; reflux with excess oxidant to reach the acid.','Propan-1-ol with acidified dichromate.')},
{h:'Predict the product',p:'Use the class and the conditions. Tap each row until you have the product.',task:'Get all 4 products right',
 show:()=>{steps[4].go();later(ROWS.map((r,i)=>()=>choose(i,r.k)),350)},go:()=>reset(4,()=>ROWS.every((r,i)=>S.pick[i]===r.k),'Class tells you aldehyde, ketone or nothing; conditions tell you aldehyde or acid.','Four oxidations to predict.')},
{h:'Challenge',p:'',go:()=>{ver++;quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Classify 2-methylpropan-1-ol.',[['Primary','ok'],['Tertiary','size'],['Secondary','size']]],
 ['Warm 2-methylpropan-2-ol with acidified K₂Cr₂O₇. What do you see?',[['It stays orange','ok'],['It turns green','tert'],['It turns colourless','colour']]],
 ['Propan-2-ol is oxidised. What forms?',[['Propanone','ok'],['Propanal','ketone'],['Propanoic acid','ketone']]],
 ['To make ethanal, not ethanoic acid, from ethanol you should…',[['Distil it off as it forms','ok'],['Heat under reflux with excess oxidant','reflux'],['Use a tertiary alcohol','tert']]],
 ['The mixture turns from orange to green. What does that show?',[['The alcohol was oxidised and Cr₂O₇²⁻ reduced to Cr³⁺','ok'],['The alcohol is tertiary','colour'],['Nothing reacted','colour']]],
 ['Butan-1-ol is heated under reflux with excess acidified dichromate. Product?',[['Butanoic acid','ok'],['Butanal','reflux'],['Butanone','ketone']]]];
function why(t){let m='Use the class of the alcohol and the conditions.';
 if(t==='size')m='Count only the carbons bonded to the C–OH carbon, not all the carbons or the branches elsewhere.';
 if(t==='tert')m='A tertiary C–OH carbon has no H, so no C=O can form: no reaction, and the dichromate stays orange.';
 if(t==='reflux')m='Reflux sends the aldehyde back into the oxidant, so it goes on to the acid. Distil to stop at the aldehyde.';
 if(t==='ketone')m='A secondary alcohol gives a ketone (C=O inside the chain). Aldehydes and acids come from primary alcohols.';
 if(t==='colour')m='Orange Cr₂O₇²⁻ turning green Cr³⁺ means the dichromate was reduced, so the alcohol was oxidised.';return m}
function quiz(){qn++;const[qq,ops]=QS[qn%QS.length],r=qn%3;qb.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qb.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>mark(t)});speak('Challenge: '+qq);A.redraw()}
function mark(t){qb.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qb.querySelector('.fl-fb'),y=t==='ok';if(y){run++;A.win()}else{run=0;A.sound.miss()}
 fb.innerHTML=(y?`✓ Correct. ${run} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:A=>{qb.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
 init:A=>{const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);qb=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up});keys()}});
A.start()})})();
