/* Flagship – oxidation and reduction as electron transfer (ages 16–18): drag the two electrons from an iron atom to a
   copper(II) ion and watch both half-equations appear, sort half-equations into oxidation and reduction (OIL RIG),
   balance half-equations by charge, predict displacement from the reactivity series, and decide which oxides carbon can
   reduce and which need electrolysis. */
(()=>{
const HALF=[['Zn → Zn²⁺ + 2e⁻',0,'Electrons are products, so zinc loses them: oxidation.'],['Ag⁺ + e⁻ → Ag',1,'The electron is a reactant, so Ag⁺ gains it: reduction.'],
 ['Mg → Mg²⁺ + 2e⁻',0,'Mg loses 2 electrons and its charge rises from 0 to +2: oxidation.'],['Cu²⁺ + 2e⁻ → Cu',1,'Cu²⁺ gains 2 electrons and its charge falls to 0: reduction.'],
 ['2Br⁻ → Br₂ + 2e⁻',0,'Non-metal ions can be oxidised too: 2Br⁻ lose 2 electrons.']];
const BAL=[{l:'Al',r:'Al³⁺',side:1,n:3,lq:0,rq:3},{l:'Cl₂',r:'2Cl⁻',side:0,n:2,lq:0,rq:-2},{l:'Fe²⁺',r:'Fe³⁺',side:1,n:1,lq:2,rq:3}];
const SER=['K','Na','Ca','Mg','Al','C','Zn','Fe','H','Cu','Ag','Au'];
const PAIRS=[['Zn','CuSO₄','Cu',1,'Zn is above Cu, so Zn gives its electrons to Cu²⁺: Zn + Cu²⁺ → Zn²⁺ + Cu.'],['Cu','MgSO₄','Mg',0,'Cu is below Mg, so Cu cannot give electrons to Mg²⁺. No reaction.'],
 ['Cu','AgNO₃','Ag',1,'Cu is above Ag, so Cu is oxidised and Ag⁺ is reduced: Cu + 2Ag⁺ → Cu²⁺ + 2Ag.']];
const OX=[['Fe₂O₃','Fe',1,'Fe is below C, so carbon (as CO in the blast furnace) reduces Fe³⁺ to Fe.'],['Al₂O₃','Al',0,'Al is above C, so carbon cannot reduce Al³⁺. Molten Al₂O₃ is electrolysed instead.'],
 ['ZnO','Zn',1,'Zn is below C, so heating ZnO with carbon gives zinc.'],['CuO','Cu',1,'Cu is well below C, so carbon reduces CuO easily.']];
VIS.reg('flagredox',c=>{let A,ctl,quizBox,qi=-1,run=0,gen=0;
const fresh=()=>({moved:0,drag:null,deck:[],placed:[],n:0,bad:-1,hl:-1,e:0,round:0,said:'',next:()=>{}}),S=fresh();
const M=()=>['flow','sort','bal','series','ore','quiz'][A.step],goal=()=>({flow:2,sort:4,bal:3,series:3,ore:4}[M()]||99);
function say(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function T(g,s,x,y,n,col,w,al){g.font=`700 ${Math.round(n*(A.narrow?1:1.1))}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(s,x,y,w||A.W-10)}
function rr(g,r,f,s,lw){g.fillStyle=f;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();if(s){g.strokeStyle=s;g.lineWidth=lw||1.5;g.stroke()}}
const In=(p,r)=>p.x>r.x-5&&p.x<r.x+r.w+5&&p.y>r.y-5&&p.y<r.y+r.h+5,edge=()=>A.mix(A.col.tx,A.col.pn,.45),face=()=>A.col.dark?'#1e293b':'#fff',soft=h=>A.mix(A.col.pn,h,A.col.dark?.22:.55);
/* step 1 geometry: iron atom left, copper ion right */
const feP=()=>({x:A.W*.25,y:A.H*.36,r:Math.min(A.W,A.H)*.13}),cuP=()=>({x:A.W*.75,y:A.H*.36,r:Math.min(A.W,A.H)*.13});
const eHome=i=>{const f=feP(),a=-Math.PI/2+(i?.75:-.75);return{x:f.x+f.r*1.25*Math.cos(a),y:f.y+f.r*1.25*Math.sin(a)}};
const eAway=i=>{const q=cuP(),a=-Math.PI/2+(i?.75:-.75);return{x:q.x+q.r*1.25*Math.cos(a),y:q.y+q.r*1.25*Math.sin(a)}};
const bins=()=>[0,1].map(i=>({x:i*A.W/2+6,y:A.H*.04,w:A.W/2-12,h:A.H*.62})),dock=()=>({x:A.W*.1,y:A.H*.74,w:A.W*.8,h:A.H*.17});
const pm=()=>{const s=Math.min(A.W*.16,74);return[{x:A.W*.5-s*1.6,y:A.H*.56,w:s,h:s},{x:A.W*.5+s*.6,y:A.H*.56,w:s,h:s}]};
const yn=()=>[0,1].map(i=>({x:A.W*(A.narrow?.36:.42)+i*(A.W*(A.narrow?.32:.28)),y:A.H*.62,w:A.W*(A.narrow?.29:.25),h:A.H*.2}));
function ladder(g,hi,x0,w){const h=A.H*.92/SER.length,C=A.col;SER.forEach((s,i)=>{const r={x:x0,y:A.H*.04+i*h,w,h:h-3},on=hi.includes(s),nm=s==='C'||s==='H';
 rr(g,r,on?soft('#fde68a'):nm?soft('#e2e8f0'):face(),on?C.vi:edge(),on?3:1);T(g,s,r.x+r.w/2,r.y+r.h/2,12,C.tx,r.w-4)});T(g,'more reactive ↑',x0+w/2,A.H*.02,10,C.tx,w*1.6)}
function drawFlow(g){const C=A.col,f=feP(),q=cuP(),done=S.moved>=2;
 A.paint.ball(f.x,f.y,f.r,done?'#86efac':'#94a3b8');A.paint.ball(q.x,q.y,q.r,done?'#c2410c':'#3b82f6');
 T(g,done?'Fe²⁺':'Fe',f.x,f.y,18,'#0f172a');T(g,done?'Cu':'Cu²⁺',q.x,q.y,18,done?'#fff':'#fff');
 T(g,done?'iron(II) ion':'iron atom',f.x,f.y+f.r+16,12);T(g,done?'copper atom':'copper(II) ion',q.x,q.y+q.r+16,12);T(g,'SO₄²⁻ (spectator ion, unchanged)',A.W/2,A.H*.08,12,C.tx);
 for(let i=0;i<2;i++){let p=i<S.moved?eAway(i):eHome(i);if(S.drag&&S.drag.i===i&&S.drag.x!=null)p=S.drag;A.paint.ball(p.x,p.y,11,'#facc15');T(g,'e⁻',p.x,p.y,11,'#0f172a',30)}
 g.strokeStyle=edge();g.setLineDash([5,5]);g.beginPath();g.moveTo(f.x+f.r+8,f.y);g.lineTo(q.x-q.r-8,q.y);g.stroke();g.setLineDash([]);
 const y=A.H*.72;T(g,S.moved>=1?'Fe → Fe²⁺ + 2e⁻   oxidation (loss of electrons)':'Drag each e⁻ from Fe to Cu²⁺',A.W/2,y,13,C.tx);if(done)T(g,'Cu²⁺ + 2e⁻ → Cu   reduction (gain of electrons)',A.W/2,y+A.H*.09,13,C.tx);
 if(done)T(g,'Overall: Fe + Cu²⁺ → Fe²⁺ + Cu',A.W/2,y+A.H*.18,14,C.tx)}
function drawSort(g){const C=A.col;bins().forEach((r,i)=>{rr(g,r,soft(i?'#bfdbfe':'#fecaca'),i===S.hl?C.vi:edge(),i===S.hl?4:1.5);T(g,i?'Reduction: gains e⁻':'Oxidation: loses e⁻',r.x+r.w/2,r.y+20,13,C.tx,r.w-8);
  S.placed.filter(o=>o.b===i).forEach((o,j)=>T(g,HALF[o.k][0],r.x+r.w/2,r.y+52+j*26,12,C.tx,r.w-10))});
 const k=S.deck[0];if(k!=null){let r=dock();if(S.drag&&S.drag.x!=null)r={...r,x:S.drag.x-r.w/2,y:S.drag.y-r.h/2};rr(g,r,face(),S.bad===k?C.rd:edge(),S.bad===k?4:2);T(g,HALF[k][0],r.x+r.w/2,r.y+r.h/2,17,C.tx,r.w-12)}}
function drawBal(g){const C=A.col,b=BAL[S.round%3],e=S.e,eS=e?` + ${e===1?'':e}e⁻`:'';const L=b.side?b.l:b.l+eS,R=b.side?b.r+eS:b.r;
 const lq=b.lq-(b.side?0:e),rq=b.rq-(b.side?e:0),ok=lq===rq;T(g,'Balance the charge with electrons',A.W/2,A.H*.08,13,C.tx);T(g,`${L}  →  ${R}`,A.W/2,A.H*.24,22,C.tx);
 const q=v=>(v>0?'+':v<0?'−':'')+Math.abs(v);T(g,`charge left: ${q(lq)}    charge right: ${q(rq)}`,A.W/2,A.H*.4,14,ok&&S.n>S.round?(C.dark?'#4ade80':'#15803d'):C.tx);
 pm().forEach((r,i)=>{rr(g,r,face(),S.hl===i?C.vi:edge(),S.hl===i?4:2);T(g,i?'+ e⁻':'− e⁻',r.x+r.w/2,r.y+r.h/2,16,C.tx,r.w-6)});
 T(g,`electrons: ${e}`,A.W/2,A.H*.56+Math.min(A.W*.16,74)+16,13,C.tx);T(g,`Half-equation ${Math.min(3,S.round+1)} of 3`,A.W/2,A.H*.9,12,C.tx)}
function drawSeries(g){const C=A.col,P=PAIRS[S.round%3],w=A.W*(A.narrow?.22:.14);ladder(g,[P[0],P[2]],8,w);const x=w+16+(A.W-w-16)/2;
 T(g,`${P[0]} + ${P[1]}(aq)`,x,A.H*.2,20,C.tx,A.W-w-24);T(g,S.n>S.round?(P[3]?'✓ It reacts':'✓ No reaction'):'Does it react?',x,A.H*.4,14,C.tx,A.W-w-24);
 if(S.n<=S.round)yn().forEach((r,i)=>{rr(g,r,face(),S.bad===i?C.rd:S.hl===i?C.vi:edge(),S.bad===i||S.hl===i?4:2);T(g,i?'No reaction':'Reacts',r.x+r.w/2,r.y+r.h/2,14,C.tx,r.w-8)})}
function drawOre(g){const C=A.col;bins().forEach((r,i)=>{rr(g,r,soft(i?'#e9d5ff':'#d6d3d1'),i===S.hl?C.vi:edge(),i===S.hl?4:1.5);T(g,i?'Too reactive: electrolysis':'Carbon can reduce it',r.x+r.w/2,r.y+20,13,C.tx,r.w-8);
  S.placed.filter(o=>o.b===i).forEach((o,j)=>T(g,`${OX[o.k][0]} → ${OX[o.k][1]}`,r.x+r.w/2,r.y+52+j*26,13,C.tx,r.w-10))});
 const k=S.deck[0];if(k!=null){let r=dock();if(S.drag&&S.drag.x!=null)r={...r,x:S.drag.x-r.w/2,y:S.drag.y-r.h/2};rr(g,r,face(),S.bad===k?C.rd:edge(),S.bad===k?4:2);T(g,OX[k][0]+'  (series: '+SER.slice(4,8).join(' > ')+')',r.x+r.w/2,r.y+r.h/2,15,C.tx,r.w-12)}}
function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.3);g.fillRect(0,0,A.W,A.H);const m=M();
 if(m==='flow')drawFlow(g);if(m==='sort')drawSort(g);if(m==='bal')drawBal(g);if(m==='series')drawSeries(g);if(m==='ore'||m==='quiz'){if(m==='quiz')S.moved=2;m==='ore'?drawOre(g):drawFlow(g)}A.fx.draw(g)}
function hl(i){S.hl=i;const v=gen;setTimeout(()=>{if(v===gen){S.hl=-1;A.redraw()}},400)}
function miss(t){A.sound.miss();say(t);A.redraw()}
function hit(t){S.n++;S.bad=-1;A.sound.pop();say(t);pad();A.redraw();S.next()}
function give(){if(S.moved>=2)return;S.moved++;hit(S.moved<2?'Fe has lost one electron. One more to go.':'Fe lost 2 electrons: oxidised to Fe²⁺. Cu²⁺ gained 2: reduced to Cu.')}
function bin(b){const k=S.deck[0];if(k==null||S.n>=goal())return;hl(b);const ore=M()==='ore',it=ore?OX[k]:HALF[k],want=ore?(it[2]?0:1):it[1];
 if(want!==b){S.bad=k;return miss(ore?it[3]:(b?'Look where the electrons are: on the right they are released, so this is a loss. ':'Electrons on the left are taken in, so this is a gain. ')+it[2])}
 S.placed.push({k:S.deck.shift(),b});hit(ore?it[3]:it[2])}
function nudge(d){if(S.n>S.round||S.n>=3)return;hl(d>0?1:0);S.e=Math.max(0,Math.min(6,S.e+d));A.sound.tick();const b=BAL[S.round%3],lq=b.lq-(b.side?0:S.e),rq=b.rq-(b.side?S.e:0);
 if(lq!==rq){say(`Charge left ${lq}, right ${rq}. Not balanced yet.`);return A.redraw()}const v=gen;hit(`Balanced: ${b.side?b.l+' → '+b.r+' + '+b.n+'e⁻ is oxidation':b.l+' + '+b.n+'e⁻ → '+b.r+' is reduction'}. Total charge is the same on both sides.`);
 if(S.n<3)setTimeout(()=>{if(v===gen){S.round++;S.e=0;pad();A.redraw()}},A.reduced()?20:900)}
function judge(i){if(S.n>S.round||S.n>=3)return;hl(i);const P=PAIRS[S.round%3],want=P[3]?0:1;if(i!==want){S.bad=i;return miss(i?`${P[0]} is above ${P[2]} in the series, so it does react. `+P[4]:`Check the series: ${P[0]} is below ${P[2]}. `+P[4])}
 const v=gen;hit(P[4]);if(S.n<3)setTimeout(()=>{if(v===gen){S.round++;S.bad=-1;pad();A.redraw()}},A.reduced()?20:900)}
function pad(){if(!ctl)return;ctl.innerHTML='';const m=M();if(m==='quiz'||S.n>=goal())return;const B=(t,l,f)=>{const b=c.el('button',{type:'button',class:'lbtn ghost sm','aria-label':l},ctl,t);b.onclick=f};
 if(m==='flow')B('Move an electron to Cu²⁺','Move one electron from the iron atom to the copper ion',give);
 if((m==='sort'||m==='ore')&&S.deck.length){const lab=m==='sort'?['Oxidation','Reduction']:['Carbon can reduce it','Electrolysis'],nm=m==='sort'?HALF[S.deck[0]][0]:OX[S.deck[0]][0];lab.forEach((t,b)=>B(t,`${nm}: ${t}`,()=>bin(b)))}
 if(m==='bal')[['− electron',-1],['+ electron',1]].forEach(([t,d])=>B(t,t+' in the half-equation',()=>nudge(d)));
 if(m==='series')['Reacts','No reaction'].forEach((t,i)=>B(t,`${PAIRS[S.round%3][0]} with ${PAIRS[S.round%3][1]}: ${t}`,()=>judge(i)))}
function down(p){const m=M();if(m==='quiz'||S.n>=goal())return false;
 if(m==='flow'){const i=S.moved;if(i<2){const e=eHome(i);if(Math.hypot(p.x-e.x,p.y-e.y)<34){S.drag={i,x:null,x0:p.x,y0:p.y};return true}const q=cuP();if(Math.hypot(p.x-q.x,p.y-q.y)<q.r)say('Drag the yellow electron from Fe onto Cu²⁺, or use the button.')}return false}
 if(m==='bal'){const i=pm().findIndex(r=>In(p,r));if(i>=0)nudge(i?1:-1);return false}
 if(m==='series'){const i=yn().findIndex(r=>In(p,r));if(i>=0)judge(i);return false}
 if(S.deck.length&&In(p,dock())){S.drag={x:null,x0:p.x,y0:p.y};return true}const i=bins().findIndex(r=>In(p,r));if(i>=0)bin(i);return false}
function move(p){const d=S.drag;if(d&&(d.x!=null||Math.hypot(p.x-d.x0,p.y-d.y0)>6)){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=S.drag,m=M();S.drag=null;if(!d)return;if(m==='flow'){const q=cuP();if(Math.hypot(p.x-q.x,p.y-q.y)<q.r*1.5)return give();say('Drop the electron on the Cu²⁺ ion.');return A.redraw()}
 const i=bins().findIndex(r=>In(p,r));if(d.x==null||i<0){say('Drag the card into a box, or use a button.');return A.redraw()}bin(i)}
const fin=(n,t,msg)=>()=>{if(A.step===n&&t()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function auto(fs,gap){const k=++gen;fs.forEach((f,j)=>setTimeout(()=>{if(k===gen)f()},A.reduced()?j*40+30:(j+1)*(gap||450)))}
const begin=(deck,x)=>{gen++;Object.assign(S,fresh(),{deck},x||{})};
const steps=[
{h:'Electrons move',p:'An iron nail goes into blue copper(II) sulfate solution. Drag each electron from the Fe atom to the Cu²⁺ ion.',predict:{q:'Which particle loses electrons?',opts:['The Cu²⁺ ion','The Fe atom'],ans:1},task:'Move 2 electrons',
 show:()=>{steps[0].go();auto([give,give],600)},go:()=>{begin([]);say('Drag an electron from iron to the copper ion.');pad();S.next=fin(0,()=>S.moved>=2,'Iron is oxidised (loses e⁻), copper(II) is reduced (gains e⁻). Sulfate just watches.')}},
{h:'OIL RIG',p:'Oxidation Is Loss, Reduction Is Gain (of electrons). Sort each half-equation by where the electrons sit.',task:'Sort 4 half-equations',
 show:()=>{steps[1].go();auto([0,1,2,3].map(()=>()=>bin(HALF[S.deck[0]][1])))},go:()=>{begin([0,1,4,3,2]);say('Oxidation or reduction?');pad();S.next=fin(1,()=>S.n>=4,'Electrons as products: oxidation. Electrons as reactants: reduction.')}},
{h:'Balance by charge',p:'A half-equation must balance atoms and charge. Add or remove electrons until the total charge matches on both sides.',predict:{q:'Al → Al³⁺. How many electrons are released?',opts:['1, one per atom','3, to match the 3+ charge'],ans:1},task:'Balance 3 half-equations',
 show:()=>{steps[2].go();auto([()=>nudge(1),()=>nudge(1),()=>nudge(1),()=>{},()=>{},()=>nudge(1),()=>nudge(1),()=>{},()=>{},()=>nudge(1)],380)},go:()=>{begin([]);say('Add electrons until the charge balances.');pad();S.next=fin(2,()=>S.n>=3,'Count charge, not just atoms: Al → Al³⁺ + 3e⁻, Cl₂ + 2e⁻ → 2Cl⁻, Fe²⁺ → Fe³⁺ + e⁻.')}},
{h:'Displacement',p:'A more reactive metal gives electrons to the ions of a less reactive one. Use the series to decide.',predict:{q:'Copper in magnesium sulfate solution: does copper displace magnesium?',opts:['Yes, any metal swaps','No, Cu is less reactive'],ans:1},task:'Judge 3 reactions',
 show:()=>{steps[3].go();auto([()=>judge(0),()=>{},()=>judge(1),()=>{},()=>judge(0)],500)},go:()=>{begin([]);say('Does it react?');pad();S.next=fin(3,()=>S.n>=3,'Higher in the series means it loses electrons more easily, so it is the reducing agent.')}},
{h:'Extracting metals',p:'Extraction is reduction: metal ions gain electrons. Carbon can reduce oxides of metals below it in the series.',task:'Sort 4 oxides',
 show:()=>{steps[4].go();auto([0,1,2,3].map(()=>()=>bin(OX[S.deck[0]][2]?0:1)))},go:()=>{begin([1,0,2,3]);say('Can carbon reduce this oxide?');pad();S.next=fin(4,()=>S.n>=4,'Carbon reduces Fe, Zn and Cu oxides. Aluminium is above carbon, so it needs electrolysis.')}},
{h:'Challenge',p:'',go:()=>{begin([]);quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.next()});
const QS=[['Zn + Cu²⁺ → Zn²⁺ + Cu. What is oxidised?',[['Zn: it loses 2 electrons','ok'],['Cu²⁺: it gains electrons','swap'],['The sulfate ions','spect']]],
 ['Mg + Fe²⁺ → Mg²⁺ + Fe. What is the oxidising agent?',[['Fe²⁺','ok'],['Mg','agent'],['Mg²⁺','product']]],
 ['Al → Al³⁺ + ?e⁻. How many electrons?',[['3','ok'],['1','count'],['3, on the left side','side']]],
 ['Will copper displace silver from silver nitrate solution?',[['Yes: Cu is above Ag','ok'],['No: Ag is more reactive','series'],['Only if oxygen is present','oxygen']]],
 ['Why is aluminium made by electrolysis, not with carbon?',[['Al is more reactive than carbon','ok'],['Carbon would be too costly','cost'],['Al³⁺ can never gain electrons','never']]]];
function why(t){let m='Look back at the lab: follow the electrons, and use the reactivity series.';
 if(t==='swap')m='Gaining electrons is reduction (RIG). The species that loses them, Zn, is oxidised.';
 if(t==='spect')m='Sulfate ions are spectators: they are unchanged, so they are neither oxidised nor reduced.';
 if(t==='agent')m='Mg is the reducing agent: it gives electrons away. The oxidising agent accepts them, and is itself reduced.';
 if(t==='product')m='Mg²⁺ is a product. The oxidising agent is the reactant that gains electrons: Fe²⁺.';
 if(t==='count')m='Balance charge: 0 on the left, so 3+ on the right needs 3 electrons to cancel it.';
 if(t==='side')m='Electrons are released in oxidation, so they go on the right: Al → Al³⁺ + 3e⁻.';
 if(t==='series')m='Ag is below Cu in the series, so Cu gives electrons to Ag⁺ and displaces it.';
 if(t==='oxygen')m='Here oxidation means losing electrons. No oxygen is needed: Cu + 2Ag⁺ → Cu²⁺ + 2Ag.';
 if(t==='cost')m='Cost is not the reason. Carbon is below aluminium, so it cannot reduce Al³⁺ at all.';
 if(t==='never')m='Al³⁺ does gain electrons, at the cathode in electrolysis. Carbon just cannot supply them.';return m}
function quiz(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 quizBox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quizBox.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});say('Challenge: '+q);A.redraw()}
function mark(t){quizBox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quizBox.querySelector('.fl-fb'),good=t==='ok';
 if(good){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Correct.':'✗ '+why(t)}${good?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.6,tall:1.05,draw,onStep:A=>{quizBox.hidden=A.step!==5;ctl.hidden=A.step===5;pad()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quizBox=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});pad()}});
A.start()})})();
