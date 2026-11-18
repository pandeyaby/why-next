/* Flagship – esterification as a reversible reaction (ages 16–18; A-level chemistry: carboxylic acid + alcohol ⇌ ester +
   water with an acid catalyst; Kc for ethanoic acid + ethanol ≈ 4, so 1 : 1 stops at about 2/3; excess alcohol or removing
   water or ester raises the yield; the catalyst only shortens the time to equilibrium; ΔH ≈ 0, so heating barely moves Kc).
   Build the equation, slide the ethanol, pull out water, race catalyst and heat, and sort changes by their effect. */
(()=>{
const K=4;
/* equilibrium ester (mol) from a mol acid, b mol alcohol, e ester, w water already present: (e+x)(w+x)=K(a-x)(b-x) */
function eq(a,b,e,w){const A2=1-K,B=e+w+K*(a+b),C=e*w-K*a*b;if(Math.abs(A2)<1e-9)return -C/B;const d=Math.sqrt(B*B-4*A2*C),r=[(-B+d)/(2*A2),(-B-d)/(2*A2)].filter(x=>x>=-Math.min(e,w)-1e-9&&x<=Math.min(a,b)+1e-9);return r[0]}
const SPEC=[['ethanoic acid','L'],['ethanol','L'],['ethyl ethanoate','R'],['water','R'],['ethene','x'],['sulfuric acid','c']];
const TARG=[.8,.9,.94];
const RUNS=[[0,0,'no catalyst, room temperature','months'],[0,1,'no catalyst, heated','days'],[1,0,'catalyst, room temperature','days'],[1,1,'catalyst, heated under reflux','about an hour']];
const SHIFT=[['more ethanol',0,'Extra reactant: the position moves right to use it up.'],['remove water',0,'Taking a product away: the position moves right to replace it.'],
 ['distil off the ester',0,'Ethyl ethanoate boils lowest (77 °C). Removing it pulls the position right.'],['add water',1,'Extra product: the position moves left and ester is hydrolysed.'],
 ['add catalyst',2,'A catalyst speeds both directions equally. Same position, reached sooner.'],['heat under reflux',2,'ΔH is close to zero, so Kc barely changes. Heat only gets there faster.'],
 ['add NaOH',1,'NaOH turns the acid into ethanoate ions, which cannot form ester. Ester is hydrolysed too.']];
const BOX=['More ester','Less ester','Yield unchanged'];
VIS.reg('flagester',c=>{let A,X,pad,box,qi=-1,tok=0,hold=null;const G={};
const INK='#111827',FACE='#ffffff',WIRE='#4b5563',WIN='#047857',LOSS='#b91c1c',BLUE='#1d4ed8',ACID='#fde68a',ALC='#bfdbfe',EST='#bbf7d0',WAT='#e0e7ff',PALE='#fee2e2';
const q=n=>Math.round(n*(A.narrow?1:1.1)),ff=(n,w)=>`${w||700} ${q(n)}px system-ui,sans-serif`;
const PART=['build','slide','dry','race','shift','quiz'],part=()=>PART[A.step],SZ={build:5,slide:3,dry:1,race:4,shift:7},fin=k=>G[k].i>=SZ[k];
const on=(p,r,m=0)=>!!r&&p.x>=r.x-m&&p.x<=r.x+r.w+m&&p.y>=r.y-m&&p.y<=r.y+r.h+m;
function bg(){X.fillStyle=A.col.dark?'#030712':'#f9fafb';X.fillRect(0,0,A.W,A.H)}
function put(t,x,y,n,w,col,al){X.fillStyle=col||INK;X.font=ff(n,w);X.textAlign=al||'center';X.textBaseline='middle';X.fillText(t,x,y,A.W-14)}
function slab(r,t,o){o=o||{};X.fillStyle=o.bg||FACE;A.paint.rrect(r.x,r.y,r.w,r.h,o.rr||8);X.fill();X.lineWidth=o.ring?3.5:1.5;X.strokeStyle=o.ring||WIRE;X.stroke();if(t!=null)put(t,r.x+r.w/2,r.y+r.h/2+1,o.n||16,o.w,o.ink)}
function pill(t,ok){X.font=ff(14,800);const w=Math.min(A.W-12,X.measureText(t).width+28),h=q(14)+16,y=A.H*.025;slab({x:A.W/2-w/2,y,w,h},null,{bg:ok?'#d1fae5':FACE,ring:ok?WIN:null,rr:h/2});put(t,A.W/2,y+h/2+1,14,800)}
function lines(m,y,n){if(!m)return;n=n||13;X.font=ff(n);const L=[];let s='';m.split(' ').forEach(w=>{const t=s?s+' '+w:w;if(X.measureText(t).width>A.W-26&&s){L.push(s);s=w}else s=t});L.push(s);L.forEach((t,j)=>put(t,A.W/2,y+(j-(L.length-1)/2)*q(n+4),n,700,A.col.tx))}
/* bar chart of the mixture: acid, alcohol, ester, water */
function bars(m,y0,h,cap){const L=[['acid',m[0],ACID],['ethanol',m[1],ALC],['ester',m[2],EST],['water',m[3],WAT]],w=(A.W-50)/4,top=Math.max(cap||1,...m);
 L.forEach(([n,v,col],j)=>{const x=20+j*(w+3.3),bh=h*v/top;X.fillStyle=col;X.fillRect(x,y0+h-bh,w-6,bh);X.strokeStyle=WIRE;X.lineWidth=1;X.strokeRect(x,y0+h-bh,w-6,bh);put(n,x+(w-6)/2,y0+h+q(12),12,700,A.col.tx);put(v.toFixed(2),x+(w-6)/2,y0+h-bh-q(10),12,800,A.col.tx)})}
/* ---- 1: build the equation ---- */
function deck(){const n=SPEC.length,cols=A.narrow?2:3,w=(A.W-20-(cols-1)*8)/cols,h=q(40);return SPEC.map((s,j)=>({j,name:s[0],x:10+(j%cols)*(w+8),y:A.H*.48+Math.floor(j/cols)*(h+8),w,h}))}
function slots(){const w=Math.min(q(150),(A.W-60)/2),h=q(40),y1=A.H*.17,y2=y1+h+q(36);return[{x:10,y:y1,w,h},{x:A.W-10-w,y:y1,w,h},{x:10,y:y2,w,h},{x:A.W-10-w,y:y2,w,h}]}
function drawBuild(){const s=G.build,S=slots();pill(fin('build')?'Equation built':`Build it: ${s.i<4?`slot ${s.i+1} of 4`:'choose the arrow'}`,fin('build'));
 S.forEach((r,j)=>{const v=s.put[j];slab(r,v||'',{bg:v?(j<2?ACID:EST):FACE,ring:j===s.i?BLUE:null,n:15})});put('+',A.W/2,S[0].y+S[0].h/2,22,800,A.col.tx);put('+',A.W/2,S[2].y+S[2].h/2,22,800,A.col.tx);
 put(s.i>=5?'⇌  (H⁺ catalyst over the arrow)':s.i===4?'→ or ⇌ ?':'',A.W/2,(S[0].y+S[0].h+S[2].y)/2,s.i>=5?14:16,800,A.col.tx);
 if(s.i<4)deck().filter(d=>!s.used.includes(d.j)).forEach(d=>{const g=hold&&hold.j===d.j;slab(g?{...d,x:hold.x-d.w/2,y:hold.y-d.h/2}:d,d.name,{n:14,bg:s.bad===d.j?PALE:FACE,ring:g?BLUE:s.bad===d.j?LOSS:null})});
 if(s.i===4)arrows().forEach(r=>slab(r,r.t,{n:24,w:800,bg:s.bad===r.t?PALE:'#fef3c7',ring:s.bad===r.t?LOSS:null}));lines(s.m,A.H*.92)}
const arrows=()=>{const w=q(110);return[{t:'→',x:A.W/2-w-8,y:A.H*.62,w,h:q(50)},{t:'⇌',x:A.W/2+8,y:A.H*.62,w,h:q(50)}]};
function choose(j){const s=G.build;if(s.i>3)return;const [n,side]=SPEC[j],want=s.i<2?'L':'R';
 if(side!==want){s.bad=j;A.sound.miss();s.m=side==='c'?'Sulfuric acid is the catalyst. It is written over the arrow, not as a reactant.':side==='x'?'Ethene is not in this reaction. It makes ethanol industrially, but it is not a reactant here.':want==='L'?`${n} is a product. The left side is the acid and the alcohol.`:`${n} is a reactant. The right side is the ester and the water it makes.`;return say(s.m)}
 s.put[s.i]=n;s.used.push(j);s.i++;s.bad=null;s.m='';A.sound.pop();say(`${n} placed.`+(s.i===4?' Now pick the arrow.':''))}
function arrow(t){const s=G.build;if(s.i!==4)return;if(t==='→'){s.bad=t;A.sound.miss();s.m='A one-way arrow says it all turns to ester. It does not: water hydrolyses the ester back, so use ⇌.';return say(s.m)}
 s.i=5;s.bad=null;s.m='CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O';A.sound.pop();say('Reversible: '+s.m)}
/* ---- 2: slide the ethanol ---- */
const rail=()=>({x:30,y:A.H*.72,w:A.W-60,h:q(10)}),bv=()=>1+G.slide.v*4,knobX=()=>rail().x+rail().w*G.slide.v;
const conv=()=>eq(1,bv(),0,0);
function drawSlide(){const s=G.slide,x=conv();pill(fin('slide')?'All 3 targets hit':`Target ${s.i+1} of 3: ${Math.round(TARG[s.i]*100)}% or more`,fin('slide'));
 put(`1 mol acid + ${bv().toFixed(1)} mol ethanol → ${(x*100).toFixed(0)}% converted`,A.W/2,A.H*.15,14,800,A.col.tx);bars([1-x,bv()-x,x,x],A.H*.21,A.H*.36,5);
 const r=rail();X.fillStyle=A.col.dark?'#374151':'#d1d5db';A.paint.rrect(r.x,r.y,r.w,r.h,5);X.fill();X.fillStyle=BLUE;X.beginPath();X.arc(knobX(),r.y+r.h/2,q(16),0,7);X.fill();X.strokeStyle='#fff';X.lineWidth=3;X.stroke();
 put('1 mol',r.x,r.y+q(30),12,700,A.col.tx);put('5 mol ethanol',r.x+r.w,r.y+q(30),12,700,A.col.tx,'right');lines(s.m,A.H*.93)}
function nudge(d){const s=G.slide;s.v=Math.max(0,Math.min(1,Math.round((s.v+d/8)*8)/8));s.m='';say(`${bv().toFixed(1)} mol ethanol: ${(conv()*100).toFixed(0)}% of the acid converted.`)}
function test(){const s=G.slide;if(fin('slide'))return;const x=conv(),t=TARG[s.i];
 if(x<t){A.sound.miss();s.m=`${(x*100).toFixed(0)}% is short of ${Math.round(t*100)}%. Add ethanol: each extra mole helps, but less than the one before.`;return say(s.m)}
 s.i++;A.sound.pop();s.m='';say(`${(x*100).toFixed(0)}% with ${bv().toFixed(1)} mol ethanol.`+(fin('slide')?' All 3 hit: from 1 to 5 mol ethanol the yield only rose from 67% to 94%.':''))}
/* ---- 3: pull out water or ester ---- */
function drawDry(){const s=G.dry,m=[s.m4[0],s.m4[1],s.m4[2]+s.out,s.m4[3]];pill(fin('dry')?'Over 90% converted':'Remove a product: get over 90%',fin('dry'));
 put(`${(m[2]*100).toFixed(0)}% converted · ${s.n} removal${s.n===1?'':'s'}`,A.W/2,A.H*.15,14,800,A.col.tx);bars(m,A.H*.22,A.H*.38,1);lines(s.msg,A.H*.9)}
function pull(k){const s=G.dry;if(fin('dry'))return;const m=s.m4;let gone;if(k===3){gone=m[3];m[3]=0}else{gone=m[2];s.out+=m[2];m[2]=0}
 const x=eq(m[0],m[1],m[2],m[3]);m[0]-=x;m[1]-=x;m[2]+=x;m[3]+=x;s.n++;A.sound.pop();const tot=m[2]+s.out;
 s.msg=`${gone.toFixed(2)} mol ${k===3?'water':'ester'} taken out. The mixture made ${x.toFixed(2)} mol more ester to restore Kc.`;if(tot>.9){s.i=1;s.msg+=` ${(tot*100).toFixed(0)}% after ${s.n} removals.`}say(s.msg)}
/* ---- 4: catalyst and heat ---- */
function cells(){const w=(A.W-30)/2,h=A.H*.27;return RUNS.map((r,j)=>({j,x:10+(j%2)*(w+10),y:A.H*.14+Math.floor(j/2)*(h+10),w,h}))}
function drawRace(){const s=G.race;pill(fin('race')?'All 4 runs done':`Run ${s.i+1} of 4: tap the next box`,fin('race'));
 cells().forEach(r=>{const [cat,hot,name,time]=RUNS[r.j],done=s.seen.includes(r.j);slab(r,null,{bg:done?EST:FACE,ring:r.j===s.i?BLUE:s.bad===r.j?LOSS:null});
  put(cat?'catalyst':'no catalyst',r.x+r.w/2,r.y+q(14),12,800,INK);put(hot?'heated':'room temp.',r.x+r.w/2,r.y+q(30),12,700,INK);if(done){put('ester: 0.67 mol',r.x+r.w/2,r.y+r.h*.6,15,800,INK);put('time: '+time,r.x+r.w/2,r.y+r.h*.83,13,700,INK)}else put('tap to run',r.x+r.w/2,r.y+r.h*.65,13,700,'#374151')});lines(s.m,A.H*.88)}
function race(j){const s=G.race;if(fin('race'))return;if(j!==s.i){s.bad=j;A.sound.miss();s.m='Run them in order so you can compare one change at a time.';return say(s.m)}
 s.seen.push(j);s.i++;s.bad=null;A.sound.pop();s.m=j===0?'Same 2/3 yield, but it takes months.':j===3?'Still 0.67 mol: the catalyst and heat change the time, not the position.':`Still 0.67 mol. Only the time changed: ${RUNS[j][3]}.`;say(s.m)}
/* ---- 5: sort the changes ---- */
function trays(){const g=8,w=(A.W-4*g)/3;return[0,1,2].map(j=>({j,x:g+j*(w+g),y:A.H*.44,w,h:A.H*.53}))}
const card=()=>{X.font=ff(15);const w=Math.min(A.W-20,X.measureText(SHIFT[Math.min(G.shift.i,6)][0]).width+q(28));return{x:A.W/2-w/2,y:A.H*.13,w,h:q(46)}};
function drawShift(){const s=G.shift;pill(fin('shift')?'All 7 sorted':`Change ${s.i+1} of 7: effect on yield?`,fin('shift'));
 trays().forEach(b=>{slab(b,null,{bg:['#d1fae5','#fee2e2','#e0e7ff'][b.j],ring:s.bad===b.j?LOSS:WIRE});X.fillStyle=INK;X.font=ff(13,800);X.textAlign='center';X.textBaseline='top';X.fillText(BOX[b.j],b.x+b.w/2,b.y+6,b.w-6);
  X.font=ff(12,600);SHIFT.slice(0,s.i).filter(z=>z[1]===b.j).forEach((z,k)=>X.fillText(z[0],b.x+b.w/2,b.y+q(28)+k*q(18),b.w-6))});
 if(!fin('shift')){const r=card();slab(hold&&hold.card?{...r,x:hold.x-r.w/2,y:hold.y-r.h/2}:r,SHIFT[s.i][0],{n:15,ring:hold?BLUE:null})}lines(s.m,A.H*.355)}
function shift(j){const s=G.shift;if(fin('shift'))return;const [t,ok,why]=SHIFT[s.i];if(j!==ok){s.bad=j;A.sound.miss();s.m=why;return say(why)}
 s.i++;s.bad=null;s.m='';A.sound.pop();say(`${t}: ${BOX[ok].toLowerCase()}. ${why}`+(fin('shift')?' All 7 sorted.':''))}
/* ---- pointer ---- */
function down(p){const k=part();if(k==='quiz'||fin(k))return false;
 if(k==='build'){if(G.build.i===4){const r=arrows().find(r=>on(p,r));if(r)arrow(r.t);return false}const d=deck().find(d=>!G.build.used.includes(d.j)&&on(p,d));if(d){hold={j:d.j,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}}
 if(k==='slide'&&Math.abs(p.y-(rail().y+5))<q(30)){hold={rail:1};move(p);return true}
 if(k==='race'){const r=cells().find(r=>on(p,r));if(r)race(r.j)}
 if(k==='shift'){if(on(p,card())){hold={card:1,x:p.x,y:p.y};return true}const b=trays().find(r=>on(p,r));if(b)shift(b.j)}return false}
function move(p){if(!hold)return;if(hold.rail){const r=rail();G.slide.v=Math.max(0,Math.min(1,Math.round((p.x-r.x)/r.w*8)/8));A.redraw();return}hold.x=p.x;hold.y=p.y;A.redraw()}
function up(p){if(!hold)return;const h=hold;hold=null;if(h.rail)return say(`${bv().toFixed(1)} mol ethanol: ${(conv()*100).toFixed(0)}% of the acid converted.`);
 if(h.card){const b=trays().find(r=>on(p,r));if(b)shift(b.j);else A.redraw();return}
 if(on(p,slots()[G.build.i],12)||Math.hypot(p.x-h.x0,p.y-h.y0)<8)choose(h.j);else A.redraw()}
function fresh(){tok++;hold=null;for(const k in G)delete G[k];PART.slice(0,5).forEach(k=>G[k]={i:0});Object.assign(G.build,{put:[],used:[]});G.slide.v=0;Object.assign(G.dry,{m4:[1/3,1/3,2/3,2/3],n:0,out:0});G.race.seen=[];G.cb=()=>{}}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();pads();G.cb()}
function begin(i,first,ready,msg){fresh();say(first);G.cb=()=>{if(A.step===i&&ready()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function demo(i,acts,ms){steps[i].go();const me=tok;acts.forEach((f,j)=>setTimeout(()=>{if(me===tok)f()},ms*(j+1)))}
function pads(){if(!pad)return;pad.innerHTML='';const k=part(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};if(k==='quiz'||fin(k))return;
 if(k==='build'){if(G.build.i<4)SPEC.forEach(([n],j)=>{if(!G.build.used.includes(j))b(n,()=>choose(j),`Put ${n} in slot ${G.build.i+1}`)});else['→','⇌'].forEach(t=>b(t,()=>arrow(t),t==='→'?'One-way arrow':'Reversible arrow'))}
 if(k==='slide'){b('− ethanol',()=>nudge(-1),'Less ethanol');b('+ ethanol',()=>nudge(1),'More ethanol');b('Check',test,'Check the target')}
 if(k==='dry'){b('Remove water',()=>pull(3),'Remove the water');b('Distil off ester',()=>pull(2),'Distil off the ester')}
 if(k==='race')RUNS.forEach((r,j)=>{if(!G.race.seen.includes(j))b(r[2],()=>race(j),`Run: ${r[2]}`)});
 if(k==='shift')BOX.forEach((h,j)=>b(h,()=>shift(j),`${SHIFT[G.shift.i][0]}: ${h}`))}
const steps=[
{h:'A two-way reaction',p:'A carboxylic acid and an alcohol make an ester and water. The water can also split the ester back. Build the equation and choose the arrow.',
predict:{q:'1 mol ethanoic acid + 1 mol ethanol, with catalyst, left for a week. How much ester?',opts:['About 1 mol: it all reacts','About 0.67 mol: it stops short'],ans:1},task:'Build the equation',
show:()=>demo(0,[()=>choose(0),()=>choose(1),()=>choose(2),()=>choose(3),()=>arrow('⇌')],500),go:()=>begin(0,'Drag a reactant into slot 1, or use the buttons.',()=>G.build.i>=5,'Reversible: Kc ≈ 4, so 1 : 1 stops at 2/3.')},
{h:'Excess alcohol',p:'Kc = [ester][water] / ([acid][alcohol]) ≈ 4. Add more ethanol and the position moves right. Slide it and check each target.',
predict:{q:'Double the ethanol from 1 to 2 mol. The ester…',opts:['doubles to 1.33 mol','rises to about 0.85 mol'],ans:1},task:'Hit all 3 targets',
show:()=>demo(1,[()=>nudge(2),test,()=>nudge(2),test,()=>nudge(4),test],420),go:()=>begin(1,'1 mol ethanol: 67% converted. Drag the blue knob.',()=>fin('slide'),'More alcohol, more ester, with shrinking returns.')},
{h:'Take a product away',p:'Start at equilibrium with 1 : 1. Remove the water, or distil off the ester. Watch the mixture make more ester to restore Kc.',
predict:{q:'Water is a product. Remove it, and the mixture…',opts:['stays at 67% ester','makes more ester'],ans:1},task:'Reach over 90%',
show:()=>demo(2,[()=>pull(3),()=>pull(3),()=>pull(3),()=>pull(3)],500),go:()=>begin(2,'At equilibrium: 0.67 mol ester. Tap Remove water.',()=>fin('dry'),'Remove a product and the position moves right.')},
{h:'Catalyst and heat',p:'Concentrated sulfuric acid is the catalyst, and the mixture is heated under reflux. Run all four and compare the ester and the time.',
predict:{q:'Does the acid catalyst raise the equilibrium yield?',opts:['Yes','No, only the speed'],ans:1},task:'Run all 4',
show:()=>demo(3,RUNS.map((_,j)=>()=>race(j)),450),go:()=>begin(3,'Tap the first box: no catalyst, room temperature.',()=>fin('race'),'Rate changes, position does not.')},
{h:'More, less or same?',p:'Sort each change by what it does to the ester at equilibrium.',task:'Sort all 7 changes',
show:()=>demo(4,SHIFT.map(z=>()=>shift(z[1])),420),go:()=>begin(4,'More ethanol. Drag it to a box, or use the buttons.',()=>fin('shift'),'Shift with reactants and products; not with a catalyst.')},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>G.cb()});
const QS=[
{q:'Kc ≈ 4. Start with 1 mol acid and 1 mol ethanol. Ester at equilibrium?',a:'0.67 mol',o:[['1 mol','all'],['0.50 mol','half']]},
{q:'Why does excess ethanol raise the yield of ester?',a:'The position moves right to use it up',o:[['Ethanol catalyses the reaction','cat'],['It makes Kc bigger','bigK']]},
{q:'What does the H₂SO₄ catalyst do to Kc?',a:'Nothing',o:[['Increases it','catK'],['Decreases it','catK2']]},
{q:'Which is Kc for esterification?',a:'[ester][water] / ([acid][alcohol])',o:[['[acid][alcohol] / ([ester][water])','flip'],['[ester] / ([acid][alcohol])','nowater']]},
{q:'Ester + NaOH(aq), heated. Why does it go to completion?',a:'The acid ends up as a carboxylate ion, which cannot re-form ester',o:[['NaOH is a catalyst','naohcat'],['The reaction is very exothermic','exo']]},
{q:'Heating the 1 : 1 mixture under reflux mainly…',a:'gets to equilibrium faster',o:[['raises the yield a lot','heatY'],['stops the back reaction','oneway']]}];
function why(t){let m='Use Kc: change a concentration and the position moves to restore it.';
 switch(t){case 'all':m='It never all reacts: the back reaction balances it at x²/(1−x)² = 4, x = 0.67.';break;
 case 'half':m='0.5 would give Kc = 1. With Kc = 4, x/(1−x) = 2, so x = 0.67.';break;
 case 'cat':m='Ethanol is a reactant. Adding a reactant moves the position right.';break;
 case 'bigK':m='Kc only changes with temperature. More ethanol moves the position, not Kc.';break;
 case 'catK':m='A catalyst speeds both directions equally, so Kc is unchanged.';break;
 case 'catK2':m='A catalyst cannot lower Kc. It only shortens the time to equilibrium.';break;
 case 'flip':m='That is upside down: products go on top in Kc.';break;
 case 'nowater':m='Water is a product in the same liquid mixture, so it belongs in Kc.';break;
 case 'naohcat':m='NaOH is used up: it turns the acid into the carboxylate salt.';break;
 case 'exo':m='ΔH is small. Completion comes from the carboxylate ion, which the alcohol cannot attack.';break;
 case 'heatY':m='ΔH is close to zero, so Kc and the yield barely change with temperature.';break;
 case 'oneway':m='Heat speeds both directions. Reflux stops vapour escaping; it does not stop the back reaction.';break}
 return m}
function next(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 box.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=box.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},g,v).onclick=()=>rule(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function rule(t,a){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next;c.say(ok?'Yes.':why(t))}
function draw(){const k=part();bg();if(k==='quiz'){pill('Challenge',1);put('acid + alcohol ⇌ ester + water · Kc ≈ 4',A.W/2,A.H*.5,15,800,A.col.tx);return}
 ({build:drawBuild,slide:drawSlide,dry:drawDry,race:drawRace,shift:drawShift})[k]();A.fx.draw(X)}
FK.shell(c,{steps,ratio:.62,tall:1.3,draw,onStep:B=>{box.hidden=B.step!==5;pad.hidden=B.step===5;pads()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Reaction buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});pads()}}).start()})})();
