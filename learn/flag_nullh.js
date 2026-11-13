/* Flagship – null and alternative hypotheses (ages 16–18; A level Statistics: tests for p, μ and ρ). Parameters not
   statistics; H₀ an equality at the claimed value; the claim sets H₁ (<, > or ≠) before the data; H₁ excludes the H₀ value. */
(()=>{const P0='H₀',P1='H₁';
/* step 1: [quantity, 0 = population parameter, 1 = sample statistic, note] */
const KIND=[['p: share of ALL voters backing the plan',0],['13/40 sampled say yes',1],['μ: mean height of ALL men',0],['x̄ = 176 cm for 50 men measured',1],
 ['p: chance this spinner lands on red',0],['p̂ = 0.35 from 60 spins',1],['ρ: correlation in the population',0],['r = 0.42 for 20 pairs',1]];
const KINDB=['Parameter','Statistic'];
/* step 2: [context, right value, [value, why it is wrong]...] */
const NUL=[['A spinner should land on red 25% of the time. Sam spins it 60 times and gets 21 reds.','0.25',[['0.35','0.35 = 21 ÷ 60 is the sample proportion, a statistic. H₀ uses the claimed value of p.'],['21','21 is a count of reds in the sample. p is a proportion, between 0 and 1.']]],
 ['A firm says 40% of customers reuse its bags. In a survey, 26 of 50 do.','0.4',[['0.52','0.52 = 26 ÷ 50 comes from the sample. H₀ tests the firm\'s 40%.'],['26','26 is a count from the sample. p is a proportion.']]],
 ['A dice is meant to be fair. In 120 rolls it shows 28 sixes.','1/6',[['28/120','28/120 is what this sample gave. H₀ is the fair value, before any data.'],['0.5','0.5 would mean a six comes up half the time. Fair means 1 in 6.']]]];
/* step 3: [claim, sign, value] */
const DIR=[['Sam suspects the spinner lands on red more often than 25%.','>','0.25'],['A rival thinks fewer than 40% reuse the bags.','<','0.4'],
 ['Ali thinks the coin is biased (no direction).','≠','0.5'],['A teacher thinks the dice shows a six less often than it should.','<','1/6']];
const SIGNS=['<','>','≠'];
/* step 4: [H₁ text, value, want left, want right] */
const SHADE=[['p > 0.25',.25,0,1],['p < 0.4',.4,1,0],['p ≠ 0.5',.5,1,1]];
/* step 5: [context, options [H₀, H₁, ok, why]] */
const PAIR=[['Claim: a new drug helps more than 40% of patients. 52 of 100 are helped.',[['p = 0.4','p > 0.4',1,''],['p > 0.4','p = 0.4',0,'Swapped. H₀ is the equality p = 0.4; the claim being tested goes in H₁.'],['p = 0.52','p > 0.52',0,'0.52 is the sample proportion. The hypotheses test the value 0.4, not the data.']]],
 ['Bags should hold 500 g on average. A buyer thinks less.',[['μ = 500','μ < 500',1,''],['x̄ = 500','x̄ < 500',0,'x̄ is the sample mean. Hypotheses are about μ, the population mean.'],['μ = 500','μ ≤ 500',0,'H₁ can never include the H₀ value. Use μ < 500.']]],
 ['Is there any correlation between sleep and test score?',[['ρ = 0','ρ ≠ 0',1,''],['r = 0','r ≠ 0',0,'r is calculated from the sample. Test ρ, the population correlation.'],['ρ = 0','ρ > 0',0,'"Any correlation" has no direction, so H₁ is two-tailed: ρ ≠ 0.']]]];
VIS.reg('flagnullh',c=>{let A,D,ctl,qz,qn=-1,epoch=0,carry=null;const M={};
const INK='#0f172a',WHITE='#fff',GREY='#64748b',RIGHT='#047857',WRONG='#be123c',HAND='#1d4ed8',PINK='#ffe4e6',MINT='#d1fae5',SKY='#e0f2fe',SAND='#fef3c7',LILAC='#ede9fe';
const u=n=>Math.round(n*(A.narrow?.92:1.05)),fz=(n,w)=>`${w||700} ${u(n)}px system-ui,sans-serif`;
const ORD=['kind','nul','dir','shade','pair','quiz'],now=()=>ORD[A.step],POOL={kind:KIND,nul:NUL,dir:DIR,shade:SHADE,pair:PAIR},gone=k=>M[k].i>=POOL[k].length;
const hits=(p,r,m=0)=>!!r&&p.x>=r.x-m&&p.x<=r.x+r.w+m&&p.y>=r.y-m&&p.y<=r.y+r.h+m;
function floor(){D.fillStyle=A.col.dark?'#020617':'#f8fafc';D.fillRect(0,0,A.W,A.H)}
function wrapT(t,x,y,w,n){const L=[];let s='';String(t).split(' ').forEach(z=>{const v=s?s+' '+z:z;if(s&&D.measureText(v).width>w){L.push(s);s=z}else s=v});L.push(s);const g=u(n)*1.3;L.forEach((l,i)=>D.fillText(l,x,y+(i-(L.length-1)/2)*g))}
function panel(r,t,o={}){D.fillStyle=o.bg||WHITE;A.paint.rrect(r.x,r.y,r.w,r.h,10);D.fill();D.lineWidth=o.ring?3.2:1.2;D.strokeStyle=o.ring||GREY;D.stroke();
 if(t!=null){D.fillStyle=o.fg||INK;D.font=fz(o.n||16,o.w||700);D.textAlign='center';D.textBaseline='middle';wrapT(t,r.x+r.w/2,r.y+r.h/2,r.w-14,o.n||16)}}
function crown(t,won){D.font=fz(14,800);const w=Math.min(A.W-8,D.measureText(t).width+28),h=u(14)+14,y=A.H*.02;panel({x:A.W/2-w/2,y,w,h},null,{bg:won?MINT:WHITE,ring:won?RIGHT:null});D.fillStyle=INK;D.textAlign='center';D.textBaseline='middle';D.fillText(t,A.W/2,y+h/2+1,w-12)}
function note(t,y,n,col){D.fillStyle=col||A.col.tx;D.font=fz(n||14,650);D.textAlign='center';D.textBaseline='middle';wrapT(t,A.W/2,y,A.W-28,n||14)}
const bad=()=>A.col.dark?'#fda4af':WRONG;
function wrap(t,L){floor();crown(t,1);L.forEach((s,i)=>panel({x:12,y:A.H*(.15+i*.2),w:A.W-24,h:A.H*.16},s,{n:15,bg:'#ecfdf5'}))}
/* ---- 1: parameter or statistic ---- */
function trays(){const g=10,w=(A.W-3*g)/2;return[0,1].map(j=>({j,x:g+j*(w+g),y:A.H*.5,w,h:A.H*.47}))}
const slip=()=>({x:16,y:A.H*.13,w:A.W-32,h:u(70)});
function drawKind(){const s=M.kind;floor();crown(gone('kind')?'All 8 sorted':`Card ${s.i+1} of 8: parameter or statistic?`,gone('kind'));
 trays().forEach(b=>{panel(b,null,{bg:b.j?SAND:SKY,ring:s.miss===b.j?WRONG:'#0369a1'});D.fillStyle=INK;D.font=fz(14,800);D.textAlign='center';D.textBaseline='top';D.fillText(KINDB[b.j],b.x+b.w/2,b.y+6,b.w-8);D.font=fz(11,600);D.fillText(b.j?'(sample)':'(population)',b.x+b.w/2,b.y+u(22),b.w-8);
  D.font=fz(13,700);KIND.slice(0,s.i).filter(x=>x[1]===b.j).forEach((x,m)=>D.fillText(x[0].split(/:| for| from| samp/)[0],b.x+b.w/2,b.y+u(42)+m*u(19),b.w-8))});
 if(!gone('kind')){const r=slip();panel(carry?{...r,x:carry.x-r.w/2,y:carry.y-r.h/2}:r,KIND[s.i][0],{ring:carry?HAND:null,n:15})}if(s.msg)note(s.msg,A.H*.42,12,bad())}
function sortKind(j){const s=M.kind;if(gone('kind'))return;const [q,ok]=KIND[s.i];
 if(j!==ok){s.miss=j;A.sound.miss();s.msg=ok?'This comes from your sample, so it is a statistic. It never goes in H₀ or H₁.':'This describes the whole population and is unknown: a parameter, what H₀ and H₁ are about.';return talk(s.msg)}
 s.i++;s.miss=null;s.msg='';A.sound.pop();talk(`${q}: ${KINDB[ok].toLowerCase()}.`+(gone('kind')?' All sorted.':''))}
/* ---- 2: drag the value into H₀ ---- */
function vals(){const o=NUL[M.nul.i],all=[o[1],...o[2].map(x=>x[0])],r=M.nul.i%3,ord=all.slice(r).concat(all.slice(0,r)),g=10,w=Math.min(u(96),(A.W-24-g*2)/3);
 return ord.map((v,j)=>({v,x:A.W/2-(3*w+2*g)/2+j*(w+g),y:A.H*.8,w,h:u(48)}))}
const hole=()=>({x:A.W/2+u(30),y:A.H*.48,w:u(92),h:u(50)});
function slotRow(s,tiles,slot,n,my){panel(slot,s.tried||'?',{bg:s.tried?PINK:'#f1f5f9',ring:s.tried?WRONG:GREY,n});
 tiles.forEach(b=>{const d=carry&&carry.v===b.v;panel(d?{...b,x:carry.x-b.w/2,y:carry.y-b.h/2}:b,b.v,{bg:LILAC,fg:'#3b0764',ring:d?HAND:null,n})});if(s.msg)note(s.msg,A.H*my,12,bad())}
function big(t,x,y,al){D.fillStyle=A.col.tx;D.font=fz(24,800);D.textBaseline='middle';D.textAlign=al;D.fillText(t,x,y)}
function drawNul(){const s=M.nul;if(gone('nul'))return wrap('All 3 null hypotheses written',['H₀: p = 0.25','H₀: p = 0.4','H₀: p = 1/6']);
 floor();crown(`Context ${s.i+1} of 3: drag the value into H₀`);panel({x:12,y:A.H*.1,w:A.W-24,h:A.H*.28},NUL[s.i][0],{n:15,bg:SAND});big(P0+': p =',A.W/2+u(20),A.H*.48+u(25),'right');slotRow(s,vals(),hole(),19,.68)}
function putNul(v){const s=M.nul;if(gone('nul'))return;const o=NUL[s.i];
 if(v!==o[1]){s.tried=v;A.sound.miss();s.msg=(o[2].find(x=>x[0]===v)||[,''])[1];return talk(s.msg)}
 s.i++;s.tried=null;s.msg='';A.sound.pop();talk(`${P0}: p = ${v}, the claimed value.`+(gone('nul')?' All 3 written.':''))}
/* ---- 3: drag the sign into H₁ ---- */
function signs(){const g=12,w=Math.min(u(74),(A.W-40)/3);return SIGNS.map((v,j)=>({v,x:A.W/2-(3*w+2*g)/2+j*(w+g),y:A.H*.8,w,h:u(54)}))}
const gap=()=>({x:A.W/2-u(10),y:A.H*.5,w:u(56),h:u(50)});
function drawDir(){const s=M.dir;if(gone('dir'))return wrap('All 4 directions set',DIR.map(([,g,v])=>`${P1}: p ${g} ${v}`));
 const [cl,,v]=DIR[s.i];floor();crown(`Claim ${s.i+1} of 4: drag the sign into H₁`);panel({x:12,y:A.H*.1,w:A.W-24,h:A.H*.24},cl,{n:15,bg:SAND});
 big(P1+': p',A.W/2-u(18),A.H*.5+u(25),'right');big(v,A.W/2+u(56),A.H*.5+u(25),'left');slotRow(s,signs(),gap(),24,.4)}
function putDir(g){const s=M.dir;if(gone('dir'))return;const [,ok,v]=DIR[s.i];let m;
 if(g===ok){s.i++;s.tried=null;s.msg='';A.sound.pop();return talk(`${P1}: p ${ok} ${v}: ${ok==='≠'?'two-tailed':'one-tailed'}.`+(gone('dir')?' All 4 set.':''))}
 s.tried=g;A.sound.miss();if(ok==='≠')m=`The claim gives no direction, so ${P1} must allow either side: p ≠ ${v}, a two-tailed test.`;
 else if(g==='≠')m=`The claim names a direction (${ok==='>'?'more':'less'}), so ${P1} is one-tailed: p ${ok} ${v}.`;
 else m=`Wrong way round: the claim says ${ok==='>'?'more':'less'} often, so p ${ok} ${v}.`;s.msg=m;talk(m)}
/* ---- 4: shade H₁ on the line ---- */
function axis(){const x0=u(24),x1=A.W-u(24),y=A.H*.5;return{x0,x1,y,at:v=>x0+v*(x1-x0)}}
function halves(){const g=axis(),v=SHADE[M.shade.i][1],xv=g.at(v);return[{j:0,x:g.x0,y:g.y-u(40),w:xv-g.x0-u(8),h:u(80)},{j:1,x:xv+u(8),y:g.y-u(40),w:g.x1-xv-u(8),h:u(80)}]}
const dot=()=>{const g=axis(),xv=g.at(SHADE[M.shade.i][1]);return{x:xv-u(12),y:g.y-u(12),w:u(24),h:u(24)}};
const tick=()=>({x:A.W/2-u(60),y:A.H*.8,w:u(120),h:u(46)});
function drawShade(){const s=M.shade;if(gone('shade'))return wrap('All 3 alternatives shaded',['p > 0.25: above only','p < 0.4: below only','p ≠ 0.5: both sides, never 0.5 itself']);
 const [h,v]=SHADE[s.i],g=axis();floor();crown(`${s.i+1} of 3: shade where ${P1} is true`);note(`${P0}: p = ${v}     ${P1}: ${h}`,A.H*.18,18);
 halves().forEach(r=>{if(s.on[r.j]){D.fillStyle=A.col.dark?'rgba(96,165,250,.45)':'rgba(29,78,216,.22)';D.fillRect(r.x,r.y,r.w,r.h)}D.strokeStyle=A.col.dark?'#94a3b8':GREY;D.setLineDash([5,4]);D.strokeRect(r.x,r.y,r.w,r.h);D.setLineDash([])});
 D.strokeStyle=A.col.tx;D.lineWidth=2;D.beginPath();D.moveTo(g.x0,g.y);D.lineTo(g.x1,g.y);D.stroke();D.fillStyle=A.col.tx;D.font=fz(12,700);D.textAlign='center';D.textBaseline='top';
 [0,.25,.5,.75,1].forEach(t=>{D.fillRect(g.at(t)-1,g.y-5,2,10);D.fillText(String(t),g.at(t),g.y+u(44))});
 const d=dot();D.fillStyle='#c2410c';D.beginPath();D.arc(d.x+d.w/2,d.y+d.h/2,u(9),0,7);D.fill();D.fillText(P0,d.x+d.w/2,g.y-u(62));
 panel(tick(),'Check',{bg:SAND,n:17});if(s.msg)note(s.msg,A.H*.7,12,bad())}
function flip(j){const s=M.shade;if(gone('shade'))return;s.on[j]=!s.on[j];s.msg='';A.sound.tick();talk(`${j?'Above':'Below'} ${SHADE[s.i][1]}: ${s.on[j]?'shaded':'clear'}.`)}
function poke(){const s=M.shade;A.sound.miss();s.msg=`The point p = ${SHADE[s.i][1]} is ${P0} itself. ${P1} never includes it.`;talk(s.msg)}
function judge(){const s=M.shade;if(gone('shade'))return;const [h,v,L,R]=SHADE[s.i];let m;
 if(+s.on[0]===L&&+s.on[1]===R){s.i++;s.on=[0,0];s.msg='';A.sound.pop();return talk(`${h}: ${L&&R?'both sides':L?'below':'above'} ${v}.`+(gone('shade')?' All 3 shaded.':''))}
 A.sound.miss();if(!s.on[0]&&!s.on[1])m=`Shade the values of p that ${P1} allows.`;else if(L&&R)m=`≠ means either side: below ${v} or above it.`;
 else if(s.on[0]&&s.on[1])m=`${h} is one-tailed: only ${L?'below':'above'} ${v}.`;else m=`${h} points the other way: ${L?'below':'above'} ${v}.`;s.msg=m;talk(m)}
/* ---- 5: pick the right pair ---- */
function pairCards(){const O=PAIR[M.pair.i][1],h=u(56),ord=[[1,0,2],[2,1,0],[0,2,1]][M.pair.i];return ord.map((j,i)=>({o:O[j],x:12,y:A.H*.36+i*(h+u(8)),w:A.W-24,h}))}
function drawPair(){const s=M.pair;if(gone('pair'))return wrap('All 3 pairs chosen',PAIR.map(([,O])=>`${P0}: ${O[0][0]}   ${P1}: ${O[0][1]}`));
 floor();crown(`Context ${s.i+1} of 3: which pair is right?`);panel({x:12,y:A.H*.1,w:A.W-24,h:A.H*.22},PAIR[s.i][0],{n:15,bg:SAND});
 pairCards().forEach(r=>panel(r,`${P0}: ${r.o[0]}    ${P1}: ${r.o[1]}`,{n:17,bg:s.miss===r.o?PINK:WHITE,ring:s.miss===r.o?WRONG:null}));if(s.msg)note(s.msg,A.H*.92,12,bad())}
function choose(o){const s=M.pair;if(gone('pair'))return;if(o[2]){s.i++;s.miss=null;s.msg='';A.sound.pop();return talk(`Yes: ${P0}: ${o[0]}, ${P1}: ${o[1]}.`+(gone('pair')?' All 3 chosen.':''))}
 s.miss=o;A.sound.miss();s.msg=o[3];talk(o[3])}
/* ---- pointer ---- */
function down(p){const k=now();if(k==='quiz'||gone(k))return false;
 if(k==='kind'){if(hits(p,slip())){carry={x:p.x,y:p.y};return true}const b=trays().find(r=>hits(p,r));if(b)sortKind(b.j)}
 if(k==='nul'){const b=vals().find(r=>hits(p,r));if(b){carry={v:b.v,x:p.x,y:p.y};return true}}
 if(k==='dir'){const b=signs().find(r=>hits(p,r));if(b){carry={v:b.v,x:p.x,y:p.y};return true}}
 if(k==='shade'){if(hits(p,dot(),4))poke();else if(hits(p,tick()))judge();else{const r=halves().find(r=>hits(p,r));if(r)flip(r.j)}}
 if(k==='pair'){const r=pairCards().find(r=>hits(p,r));if(r)choose(r.o)}return false}
function move(p){if(carry){carry.x=p.x;carry.y=p.y;A.redraw()}}
function up(p){const d=carry;if(!d)return;carry=null;const k=now();
 if(k==='kind'){const b=trays().find(r=>hits(p,r));if(b)sortKind(b.j);else A.redraw()}
 if(k==='nul'){if(hits(p,hole(),20))putNul(d.v);else A.redraw()}
 if(k==='dir'){if(hits(p,gap(),20))putDir(d.v);else A.redraw()}}
function clear(){epoch++;carry=null;for(const k in M)delete M[k];ORD.slice(0,5).forEach(k=>M[k]={i:0});M.shade.on=[0,0];M.cb=()=>{}}
function talk(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();btns();M.cb()}
function arm(i,first,ready,msg){clear();talk(first);M.cb=()=>{if(A.step===i&&ready()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function auto(i,acts,ms){steps[i].go();const me=epoch;acts.forEach((f,j)=>setTimeout(()=>{if(me===epoch)f()},ms*(j+1)))}
function btns(){if(!ctl)return;ctl.innerHTML='';const k=now(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};if(k==='quiz'||gone(k))return;
 if(k==='kind')KINDB.forEach((h,j)=>b(h,()=>sortKind(j),`${KIND[M.kind.i][0]}: ${h}`));
 if(k==='nul')vals().forEach(r=>b(r.v,()=>putNul(r.v),`${P0}: p = ${r.v}`));
 if(k==='dir')SIGNS.forEach(g=>b(g,()=>putDir(g),`${P1}: p ${g==='≠'?'not equal to':g==='<'?'less than':'greater than'} ${DIR[M.dir.i][2]}`));
 if(k==='shade'){b('Below',()=>flip(0),'Shade or clear values below the H₀ value');b('Above',()=>flip(1),'Shade or clear values above the H₀ value');b('Check',judge,'Check the shading')}
 if(k==='pair')pairCards().forEach(r=>b(`${r.o[0]}; ${r.o[1]}`,()=>choose(r.o),`H₀: ${r.o[0]}, H₁: ${r.o[1]}`))}
const steps=[
{h:'Parameter or statistic?',p:'A parameter (p, μ, ρ) describes the whole population and is unknown. A statistic (p̂, x̄, r) comes from your sample. Hypotheses are about parameters.',
predict:{q:'40 rolls give 13 sixes. Should H₀ say p = 13/40?',opts:['Yes, use the data','No, H₀ uses the claimed value'],ans:1},task:'Sort all 8 cards',
show:()=>auto(0,KIND.map(x=>()=>sortKind(x[1])),380),go:()=>arm(0,'Drag the card into a tray, or use the buttons.',()=>gone('kind'),'Parameters go in hypotheses; statistics are the evidence.')},
{h:'Write H₀',p:'H₀ is an equality for the parameter: the value that holds if nothing unusual is going on. Drag the right value into the box.',task:'Write all 3',
show:()=>auto(1,NUL.map(o=>()=>putNul(o[1])),600),go:()=>arm(1,'Read the context. Drag the value that belongs in H₀.',()=>gone('nul'),'H₀: parameter = claimed value.')},
{h:'Choose the direction of H₁',p:'H₁ comes from the claim, decided before you look at the data. "More" gives >, "less" gives <, and no direction gives ≠ (two-tailed).',
predict:{q:'Sam gets 21 reds in 60 spins (0.35). Should that sample decide H₁?',opts:['Yes, it shows p is higher','No, the claim sets H₁ first'],ans:1},task:'Set all 4 signs',
show:()=>auto(2,DIR.map(d=>()=>putDir(d[1])),550),go:()=>arm(2,'Read the claim. Drag <, > or ≠ into H₁.',()=>gone('dir'),'Words in the claim set the tail.')},
{h:'Shade H₁ on the line',p:'Tap a side of the line to shade the values of p that H₁ allows, then Check. The H₀ point is never in H₁.',
predict:{q:'H₁: p ≠ 0.5. Does it include p = 0.3?',opts:['No, only values above 0.5','Yes, either side counts'],ans:1},task:'Shade all 3',
show:()=>auto(3,SHADE.flatMap(([,,L,R])=>[...(L?[()=>flip(0)]:[]),...(R?[()=>flip(1)]:[]),()=>judge()]),450),go:()=>arm(3,'Tap below or above the H₀ point, then Check.',()=>gone('shade'),'One-tailed: one side. Two-tailed: both.')},
{h:'Spot the right pair',p:'A parameter, not a statistic; H₀ an equality at the claimed value; H₁ in the claim\'s direction, without the H₀ value.',task:'Choose all 3',
show:()=>auto(4,PAIR.map(([,O])=>()=>choose(O[0])),600),go:()=>arm(4,'Tap the correct pair of hypotheses.',()=>gone('pair'),'Parameter, equality, direction.')},
{h:'Challenge',p:'',go:()=>{clear();pose()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>M.cb()});
const QS=[
{q:'A coin is suspected of landing heads more often. Which H₁?',a:'p > 0.5',o:[['p ≠ 0.5','twotail'],['p̂ > 0.5','stat']]},
{q:'Batteries should last 20 hours on average. Which H₀?',a:'μ = 20',o:[['μ < 20','ineq'],['x̄ = 20','xbar']]},
{q:'A claim: under 10% of parts are faulty. A rival thinks it is more. Which H₁?',a:'p > 0.1',o:[['p ≥ 0.1','ge'],['p < 0.1','wayround']]},
{q:'Is a dice biased against sixes? Which hypotheses?',a:'H₀: p = 1/6, H₁: p < 1/6',o:[['H₀: p < 1/6, H₁: p = 1/6','swap'],['H₀: p = 1/6, H₁: p ≠ 1/6','nodir']]},
{q:'Why do hypotheses use p and not p̂?',a:'p is the population value being tested',o:[['p̂ is too hard to work out','hard'],['p̂ changes the answer to a two-tailed test','tails']]}];
function why(t){let m='Parameter, equality, direction.';
 switch(t){case 'twotail':m='The suspicion names a direction (more heads), so H₁ is one-tailed: p > 0.5.';break;
 case 'stat':m='p̂ is the sample proportion. Hypotheses are about p.';break;
 case 'ineq':m='H₀ is always an equality. μ < 20 is a possible H₁.';break;
 case 'xbar':m='x̄ is the sample mean. The claim is about μ, the population mean.';break;
 case 'ge':m='H₁ cannot include the H₀ value 0.1. Use p > 0.1.';break;
 case 'wayround':m='The rival thinks MORE are faulty, so H₁: p > 0.1.';break;
 case 'swap':m='Swapped: the equality goes in H₀, the claim being tested in H₁.';break;
 case 'nodir':m='"Against sixes" means fewer sixes: a direction, so one-tailed p < 1/6.';break;
 case 'hard':m='p̂ is easy to find; it is the evidence. The question is about the unknown p.';break;
 case 'tails':m='The tails come from the claim. p̂ is evidence, not part of the hypotheses.';break}
 return m}
function pose(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 qz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=qz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},g,v).onclick=()=>grade(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function grade(t,a){qz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=pose;c.say(ok?'Yes.':why(t))}
function draw(){const k=now();if(k==='quiz'){floor();crown('Challenge',1);note('Parameter · equality in H₀ · direction from the claim',A.H*.5,16);return}
 ({kind:drawKind,nul:drawNul,dir:drawDir,shade:drawShade,pair:drawPair})[k]();A.fx.draw(D)}
FK.shell(c,{steps,ratio:.7,tall:1.3,draw,onStep:B=>{qz.hidden=B.step!==5;ctl.hidden=B.step===5;btns()},
 init:B=>{A=B;D=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Hypothesis buttons'},w);qz=c.el('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});btns()}}).start()})})();
