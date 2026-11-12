/* Flagship – mass changes in open and closed systems (ages 13–15; AQA GCSE Chemistry 4.3.1.2 mass changes when a
   reactant or product is a gas; KS3 conservation of mass; NGSS MS-PS1-5). Run marble chips and acid open and sealed on a
   balance, heat magnesium to constant mass, sort reactions by where a gas goes, work out the mass of gas lost or
   gained, and build a closed-system test. Not flagburn (combustion products) or flagcoll (rates). */
(()=>{
const RUN={open:[152.40,152.11,151.88,151.70,151.58,151.52],shut:[152.40,152.40,152.40,152.40,152.40,152.40]};
const HEAT=[25.24,25.33,25.38,25.40,25.40];
const SORTS=[['Marble chips + acid, open flask',0,'CO₂ gas escapes into the air.'],['Copper heated in air',1,'Oxygen from the air joins: copper oxide.'],
['Two solutions make a precipitate',2,'No gas in or out, so no change.'],['Magnesium + acid, open flask',0,'Hydrogen gas escapes.'],
['Iron wool rusting in air',1,'Oxygen joins the iron.'],['Marble chips + acid, sealed flask',2,'The CO₂ is trapped inside.'],['Acid + alkali neutralise',2,'Only a salt and water: no gas.']];
const BIN=['Mass goes down','Mass goes up','No change'];
const SUMS=[{q:'Open flask: 80.00 g before, 79.12 g after. Mass of CO₂ lost?',ok:'0.88 g',o:['79.12 g','159.12 g','0 g'],why:{'79.12 g':'That is the reading after. The gas lost is the difference: 80.00 − 79.12.','159.12 g':'Do not add the readings. Subtract: 80.00 − 79.12.','0 g':'0 g would be a sealed flask. In an open flask CO₂ escapes.'}},
{q:'0.24 g magnesium makes 0.40 g magnesium oxide. Mass of oxygen gained?',ok:'0.16 g',o:['0.64 g','0.40 g','0.24 g'],why:{'0.64 g':'Do not add them. Oxide − metal = 0.40 − 0.24.','0.40 g':'0.40 g is all the oxide. The oxygen is only the extra part.','0.24 g':'0.24 g is the magnesium, not the oxygen that joined it.'}},
{q:'Sealed flask: 120.50 g before the reaction. Reading after?',ok:'120.50 g',o:['119.62 g','121.38 g','0 g'],why:{'119.62 g':'Nothing can leave a sealed flask, so the total stays 120.50 g.','121.38 g':'Nothing can get in either. The total stays 120.50 g.','0 g':'The atoms are all still there. Total mass is conserved.'}},
{q:'12.35 g copper carbonate is heated. 7.95 g copper oxide is left. Mass of CO₂ given off?',ok:'4.40 g',o:['7.95 g','20.30 g','12.35 g'],why:{'7.95 g':'That is the solid left. The CO₂ is 12.35 − 7.95.','20.30 g':'Subtract, do not add: 12.35 − 7.95 = 4.40 g.','12.35 g':'That is the start mass. Only part of it leaves as CO₂.'}}];
const PARTS=[['Rigid stopper in the flask',1,''],['Weigh flask and contents before',1,''],['Weigh again after, still sealed',1,''],
['Leave the flask open',0,'Open lets CO₂ escape, so mass seems to fall.'],['Weigh only the solid chips',0,'You must weigh everything: flask, acid and chips.'],['Take out the stopper, then weigh',0,'Opening it first lets the gas out before you weigh.']];
VIS.reg('flagmsys',c=>{let A,bt,qz,qq=-1,run=0;const W={};
const K='#0f172a',OK='#047857',NO='#b91c1c',LN='#64748b',GR='#1d4ed8',GAS='#0e7490',GASF='#cffafe',HOT='#b45309',HOTF='#fef3c7',LCD='#052e16',LCDT='#bbf7d0';
const fz=(n,w)=>`${w||700} ${n}px system-ui,sans-serif`,q=n=>A.narrow?n:Math.round(n*1.15),mc=g=>{g.textAlign='center';g.textBaseline='middle'};
const at=()=>['flask','heat','sort','sum','plan','quiz'][A.step],inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const ding=()=>A.sound.pop(),buzz=()=>A.sound.miss(),rr=(...a)=>A.paint.rrect(...a);
function bg(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#ecfeff',A.col.dark?.05:.45);g.fillRect(0,0,A.W,A.H)}
function tag(t,y,ok,n){const g=A.ctx;let s=q(n||13);g.font=fz(s,800);let w=g.measureText(t).width+24;while(w>A.W-10&&s>10){s--;g.font=fz(s,800);w=g.measureText(t).width+24}
const h=s+14,x=Math.max(5,A.W/2-w/2);g.fillStyle='#ffffff';rr(x,y-h/2,w,h,7);g.fill();g.lineWidth=ok?3:1.5;g.strokeStyle=ok?OK:LN;g.stroke();g.fillStyle=K;mc(g);g.fillText(t,x+w/2,y+1)}
function pill(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||'#ffffff';rr(r.x,r.y,r.w,r.h,9);g.fill();g.lineWidth=(o.ok||o.no||o.on)?3.5:1.8;g.strokeStyle=o.ok?OK:o.no?NO:o.on?GR:LN;g.stroke();
if(t==null)return;g.fillStyle=o.ink||K;const fs=o.px||Math.round(r.h*.4);g.font=fz(fs,800);mc(g);fit(t,r.x+r.w/2,r.y+r.h/2+1,r.w-12,fs)}
function fit(t,x,y,mw,fs){const g=A.ctx;let a='',L=[];t.split(' ').forEach(w=>{const tr=a?a+' '+w:w;if(g.measureText(tr).width>mw&&a){L.push(a);a=w}else a=tr});L.push(a);L.forEach((l,i)=>g.fillText(l,x,y+(i-(L.length-1)/2)*fs*1.15,mw+6))}
/* a top-pan balance with a conical flask; bubbles leave only when open */
function balance(cx,by,val,sealed,fizz){const g=A.ctx,s=Math.min(q(70),A.W*.18);g.fillStyle='#e2e8f0';rr(cx-s*1.3,by,s*2.6,s*.5,8);g.fill();g.strokeStyle=LN;g.lineWidth=1.5;g.stroke();
g.fillStyle=LCD;rr(cx-s*.8,by+s*.08,s*1.6,s*.34,5);g.fill();g.fillStyle=LCDT;g.font=fz(Math.round(s*.28),800);mc(g);g.fillText(val.toFixed(2)+' g',cx,by+s*.26);
g.fillStyle='#ffffff';g.strokeStyle=K;g.lineWidth=2.5;g.beginPath();g.moveTo(cx-s*.18,by-s*1.5);g.lineTo(cx-s*.18,by-s*1.1);g.lineTo(cx-s*.7,by-2);g.lineTo(cx+s*.7,by-2);g.lineTo(cx+s*.18,by-s*1.1);g.lineTo(cx+s*.18,by-s*1.5);g.stroke();
g.fillStyle='#bae6fd';g.beginPath();g.moveTo(cx-s*.5,by-s*.42);g.lineTo(cx-s*.68,by-4);g.lineTo(cx+s*.68,by-4);g.lineTo(cx+s*.5,by-s*.42);g.closePath();g.fill();
g.fillStyle='#d6d3d1';[[-.3,-.12],[0,-.1],[.28,-.14]].forEach(([a,b])=>{g.beginPath();g.arc(cx+a*s,by+b*s,s*.08,0,7);g.fill()});
if(sealed){g.fillStyle='#78350f';g.fillRect(cx-s*.22,by-s*1.62,s*.44,s*.2)}
if(fizz){g.fillStyle=GAS;for(let i=0;i<6;i++){const k=(fizz*7+i*13)%20/20;const y=sealed?by-s*(.5+k*.9):by-s*(.5+k*2.1);g.beginPath();g.arc(cx+Math.sin(i*2+fizz)*s*.12,y,s*.05,0,7);g.fill()}}}
/* step 1: open v sealed flask */
function fKeys(){const w=Math.min(q(150),(A.W-30)/2),h=q(46);return[{k:'seal',x:A.W/2-w-5,y:A.H*.82,w,h},{k:'go',x:A.W/2+5,y:A.H*.82,w,h}]}
function drawFlask(){const s=W.f;bg();tag(s.open&&s.shut?'Both runs done':`Run ${s.open||s.shut?'2':'1'} of 2: ${s.seal?'sealed':'open'} flask`,A.H*.07,s.open&&s.shut,13);
const v=(s.seal?RUN.shut:RUN.open)[s.i];balance(A.W/2,A.H*.56,v,s.seal,s.busy?s.i+1:0);
const g=A.ctx;g.fillStyle=A.col.tx;g.font=fz(q(13),700);mc(g);g.fillText(`open: ${s.open?'152.40 → 151.52 g':'not run'}   sealed: ${s.shut?'152.40 → 152.40 g':'not run'}`,A.W/2,A.H*.73,A.W-10);
const [a,b]=fKeys();pill(a,s.seal?'Take stopper out':'Put stopper in',{bg:HOTF,ink:HOT,px:q(15)});pill(b,s.busy?'Reacting…':'Start reaction',{bg:GASF,ink:GAS,on:s.busy,px:q(15)})}
function toggleSeal(){const s=W.f;if(s.busy)return;s.seal=!s.seal;s.i=0;A.sound.tick();say(s.seal?'Stopper in: a closed system. Nothing gets in or out.':'Stopper out: an open system. Gas can leave.')}
function react(){const s=W.f;if(s.busy)return;s.busy=1;s.i=0;const me=run,steps=RUN.open.length-1;
for(let j=1;j<=steps;j++)setTimeout(()=>{if(me!==run)return;s.i=j;A.redraw();if(j===steps){s.busy=0;finishRun()}},j*(A.reduced()?20:150))}
function finishRun(){const s=W.f;if(s.seal){s.shut=1;ding();say('Sealed: 152.40 g before and after. The CO₂ is trapped, so the total mass is the same.')}
else{s.open=1;ding();say('Open: 152.40 g fell to 151.52 g. 0.88 g of CO₂ left the flask. No atoms were destroyed.')}}
/* step 2: heat magnesium to constant mass */
function hKey(){const w=Math.min(q(220),A.W*.7);return{x:A.W/2-w/2,y:A.H*.82,w,h:q(46)}}
function drawHeat(){const s=W.h,g=A.ctx;bg();tag(s.done?'Constant mass reached':s.n?`Heat ${s.n} done. Lift the lid again.`:'Heat it, lifting the lid to let air in.',A.H*.07,s.done,13);
const cx=A.W/2,cy=A.H*.42,r=Math.min(q(70),A.W*.18);g.fillStyle='#e7e5e4';g.beginPath();g.moveTo(cx-r,cy-r*.4);g.lineTo(cx-r*.7,cy+r*.5);g.lineTo(cx+r*.7,cy+r*.5);g.lineTo(cx+r,cy-r*.4);g.closePath();g.fill();g.strokeStyle=K;g.lineWidth=2.5;g.stroke();
g.fillStyle=s.n?'#f8fafc':'#9ca3af';g.fillRect(cx-r*.5,cy+r*.1,r,r*.25);g.strokeRect(cx-r*.5,cy+r*.1,r,r*.25);
g.fillStyle='#a8a29e';g.fillRect(cx-r*1.05,cy-r*(s.lift?.95:.55),r*2.1,r*.12);if(s.lift){g.fillStyle=HOT;g.font=fz(q(13),800);mc(g);g.fillText('O₂ in ↓',cx+r*1.4,cy-r*.4)}
g.fillStyle=LCD;rr(cx-q(80),cy+r*.75,q(160),q(36),6);g.fill();g.fillStyle=LCDT;g.font=fz(q(17),800);mc(g);g.fillText(HEAT[s.n].toFixed(2)+' g',cx,cy+r*.75+q(18));
g.fillStyle=A.col.tx;g.font=fz(q(12),700);g.fillText('Crucible + lid 25.00 g. Mg 0.24 g. Readings: '+HEAT.slice(0,s.n+1).map(x=>x.toFixed(2)).join(', '),cx,A.H*.74,A.W-10);
pill(hKey(),s.done?'Done':'Heat and lift the lid',{bg:HOTF,ink:HOT,px:q(15)})}
function heatOnce(){const s=W.h;if(s.done)return;s.n=Math.min(4,s.n+1);s.lift=1;const me=run;setTimeout(()=>{if(me===run){s.lift=0;A.redraw()}},300);
if(s.n>=4){s.done=1;ding();return say('25.40 g twice: constant mass. 0.16 g of oxygen joined 0.24 g of magnesium to make 0.40 g of MgO.')}
A.sound.tick();say(`Heat ${s.n}: ${HEAT[s.n].toFixed(2)} g. Mass went up: oxygen from the air is joining the magnesium.`)}
/* step 3: sort by where the gas goes */
function sBins(){const w=(A.W-40)/3,h=A.H*.32;return BIN.map((t,j)=>({j,x:10+j*(w+10),y:A.H*.6,w,h}))}
function sCard(){const w=Math.min(A.W-24,q(340)),h=q(58);return{x:A.W/2-w/2,y:A.H*.22,w,h}}
function drawSort(){const s=W.s,g=A.ctx;bg();tag(s.n>=7?'All 7 sorted':`Card ${s.n+1} of 7: what happens to the reading?`,A.H*.07,s.n>=7,13);
sBins().forEach(r=>{g.fillStyle=[GASF,HOTF,'#e2e8f0'][r.j];rr(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=[GAS,HOT,LN][r.j];g.lineWidth=2;g.stroke();g.fillStyle=K;g.font=fz(q(14),800);g.textAlign='center';g.textBaseline='top';
fit(BIN[r.j],r.x+r.w/2,r.y+q(16),r.w-8,q(14));const n=SORTS.slice(0,s.n).filter(x=>x[1]===r.j).length;g.font=fz(q(18),800);g.fillText(n?'✓ '+n:'',r.x+r.w/2,r.y+r.h*.6)});
if(s.n<7){const r=sCard(),d=W.drag;pill(d?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r,SORTS[s.n][0],{on:!!d,no:s.miss,px:q(15)})}}
function sortIt(j){const s=W.s;if(s.n>=7)return;const [t,a,why]=SORTS[s.n];
if(j!==a){s.miss=1;buzz();return say(a===0?`Not ${BIN[j].toLowerCase()}. A gas is made and the flask is open, so it escapes: the reading falls.`:a===1?'A gas from the air (oxygen) joins the solid, so the reading rises. Burning or rusting in air adds mass.':'No gas can leave or enter here, so the reading stays the same.')}
s.n++;s.miss=0;ding();say(`${t}: ${BIN[a].toLowerCase()}. ${why}`+(s.n>=7?' All 7 sorted.':''))}
/* step 4: work out the gas */
function oKeys(){const Q=SUMS[Math.min(W.c.n,3)],all=[Q.ok,...Q.o],sh=W.c.n%4,ord=all.slice(sh).concat(all.slice(0,sh)),w=(A.W-30)/2,h=q(48);
return ord.map((t,i)=>({t,x:10+(i%2)*(w+10),y:A.H*.52+Math.floor(i/2)*(h+10),w,h}))}
function drawSum(){const s=W.c;bg();if(s.n>=4){tag('All 4 worked out',A.H*.07,1);SUMS.forEach((Q,j)=>tag(`${['CO₂ lost','O₂ gained','sealed total','CO₂ given off'][j]}: ${Q.ok}`,A.H*(.26+j*.16),1,15));return}
const Q=SUMS[s.n];tag(`Sum ${s.n+1} of 4`,A.H*.07,0,13);pill({x:12,y:A.H*.16,w:A.W-24,h:A.H*.28},Q.q,{px:q(16)});oKeys().forEach(r=>pill(r,r.t,{no:s.miss===r.t,px:q(18)}))}
function answer(t){const s=W.c;if(s.n>=4)return;const Q=SUMS[s.n];
if(t!==Q.ok){s.miss=t;buzz();return say(Q.why[t])}
s.n++;s.miss=null;ding();say(`${Q.ok}. Mass is conserved: the difference is the gas.`+(s.n>=4?' All 4 done.':''))}
/* step 5: build a closed-system test */
function pTiles(){const w=(A.W-30)/2,h=q(52);return PARTS.map((p,i)=>({i,x:10+(i%2)*(w+10),y:A.H*.2+Math.floor(i/2)*(h+10),w,h}))}
function drawPlan(){const s=W.p,g=A.ctx;bg();tag(s.got.length>=3?'A fair closed-system test':`Pick the 3 steps of a fair test (${s.got.length} of 3)`,A.H*.07,s.got.length>=3,13);
pTiles().forEach(r=>pill(r,PARTS[r.i][0],{ok:s.got.includes(r.i),no:s.miss===r.i,bg:s.got.includes(r.i)?'#dcfce7':null,px:q(14)}));
if(s.got.length>=3){g.fillStyle=A.col.tx;g.font=fz(q(14),700);mc(g);g.fillText('Same mass before and after: mass is conserved.',A.W/2,A.H*.78,A.W-12)}}
function pickPart(i){const s=W.p;if(s.got.length>=3||s.got.includes(i))return;const [t,good,why]=PARTS[i];
if(!good){s.miss=i;buzz();return say(why)}s.got.push(i);s.miss=null;ding();say(`${t}: yes.`+(s.got.length>=3?' Sealed, weighed before and after: the readings match.':''))}
function draw(){const k=at();if(k==='quiz'){bg();tag('Challenge',A.H*.2,1);tag('open · closed · conserved',A.H*.5,0,18);return}
({flask:drawFlask,heat:drawHeat,sort:drawSort,sum:drawSum,plan:drawPlan})[k]();A.fx.draw(A.ctx)}
function down(p){const k=at();
if(k==='flask'){const b=fKeys().find(r=>inside(p,r));if(b)(b.k==='seal'?toggleSeal:react)();return false}
if(k==='heat'){if(inside(p,hKey()))heatOnce();return false}
if(k==='sort'&&W.s.n<7){if(inside(p,sCard())){W.drag={x:p.x,y:p.y};return true}const b=sBins().find(r=>inside(p,r));if(b)sortIt(b.j);return false}
if(k==='sum'&&W.c.n<4){const r=oKeys().find(r=>inside(p,r));if(r)answer(r.t);return false}
if(k==='plan'){const r=pTiles().find(r=>inside(p,r));if(r)pickPart(r.i)}return false}
function move(p){if(!W.drag)return;W.drag.x=p.x;W.drag.y=p.y;A.redraw()}
function up(p){if(!W.drag)return;W.drag=null;const b=sBins().find(r=>inside(p,r));if(b)sortIt(b.j);else A.redraw()}
function reboot(){run++;for(const k in W)delete W[k];Object.assign(W,{f:{seal:0,i:0,busy:0,open:0,shut:0},h:{n:0,lift:0,done:0},s:{n:0},c:{n:0},p:{got:[]},drag:null,check:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keypad();W.check()}
function arm(i,desc,ok,msg){reboot();say(desc);W.check=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function auto(i,acts,ms){steps[i].go();const me=run;acts.forEach((f,j)=>setTimeout(()=>{if(me===run)f()},ms*(j+1)))}
function keypad(){if(!bt)return;bt.innerHTML='';const k=at(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},bt,t).onclick=f};
if(k==='flask'){B(W.f.seal?'Take stopper out':'Put stopper in',toggleSeal);B('Start reaction',react,'Start the reaction and watch the balance')}
if(k==='heat'&&!W.h.done)B('Heat and lift the lid',heatOnce);
if(k==='sort'&&W.s.n<7)BIN.forEach((t,j)=>B(t,()=>sortIt(j),`${SORTS[W.s.n][0]}: ${t}`));
if(k==='sum'&&W.c.n<4)oKeys().forEach(r=>B(r.t,()=>answer(r.t),`Answer ${r.t}`));
if(k==='plan'&&W.p.got.length<3)PARTS.forEach((p,i)=>{if(!W.p.got.includes(i))B(p[0],()=>pickPart(i))})}
const steps=[
{h:'Open or sealed?',p:'Marble chips (calcium carbonate) react with acid and make carbon dioxide gas. Run it open, then with a stopper in, and watch the balance.',
predict:{q:'Open flask: what will the balance reading do?',opts:['Stay the same: mass is conserved','Go down: the CO₂ escapes'],ans:1},task:'Run it open and sealed',
show:()=>auto(0,[react,()=>{},()=>{},()=>{},()=>{},()=>{},()=>{},toggleSeal,react],170),
go:()=>arm(0,'Open flask of acid and marble chips on a balance, 152.40 g. Buttons: put stopper in, start reaction.',()=>W.f.open&&W.f.shut,'Open: gas leaves, reading falls. Sealed: no change.')},
{h:'Gaining mass',p:'Magnesium burns in air. Lift the lid each time you heat it so oxygen gets in. Heat until the mass stops changing.',
predict:{q:'Magnesium burns in an open crucible. Its mass…',opts:['goes down: burning uses it up','goes up: oxygen joins it'],ans:1},task:'Heat to constant mass',
show:()=>auto(1,[heatOnce,heatOnce,heatOnce,heatOnce],500),
go:()=>arm(1,'Crucible with 0.24 g magnesium: 25.24 g.',()=>W.h.done,'2Mg + O₂ → 2MgO: oxygen from the air adds mass.')},
{h:'Where does the gas go?',p:'Drag each reaction to what the balance shows. Ask: is a gas made or used, and can it get out or in?',task:'Sort all 7 cards',
show:()=>auto(2,SORTS.map(x=>()=>sortIt(x[1])),550),
go:()=>arm(2,'Card: marble chips and acid, open flask. Boxes: down, up, no change.',()=>W.s.n>=7,'Gas out: down. Gas in: up. Sealed or no gas: same.')},
{h:'Work out the gas',p:'Mass is conserved, so the change in the reading is the mass of gas that left or joined.',task:'Solve all 4',
show:()=>auto(3,SUMS.map(Q=>()=>answer(Q.ok)),700),
go:()=>arm(3,'Open flask: 80.00 g before, 79.12 g after. How much CO₂ was lost?',()=>W.c.n>=4,'Gas mass = difference in the readings.')},
{h:'Design the test',p:'Plan a test that shows mass is conserved even when a gas is made. Tap the 3 steps you need.',task:'Pick all 3 steps',
show:()=>auto(4,[0,1,2].map(i=>()=>pickPart(i)),600),
go:()=>arm(4,'Six step cards. Pick the three that make a fair closed-system test.',()=>W.p.got.length>=3,'Seal it, weigh it all, weigh again sealed.')},
{h:'Challenge',p:'',go:()=>{reboot();pose()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>W.check()});
const QS=[
{q:'An open flask of fizzing acid gets lighter. Why?',a:'Gas escapes into the air',o:[['Mass is destroyed','destroy'],['The liquid gets less dense','dense']]},
{q:'Steel wool is heated in air. Its mass…',a:'increases',o:[['decreases','burn'],['stays the same','same']]},
{q:'The same fizzing reaction in a sealed flask. Mass…',a:'stays the same',o:[['goes down','sealed'],['goes up','gain']]},
{q:'0.48 g Mg makes 0.80 g MgO. Oxygen gained?',a:'0.32 g',o:[['1.28 g','add'],['0.80 g','whole']]},
{q:'Which is a closed system?',a:'A stoppered flask',o:[['An open beaker','open'],['A crucible with the lid off','lid']]},
{q:'Why does a precipitation reaction show no mass change, even open?',a:'No gas is made or used',o:[['Solids weigh nothing','solid'],['The reaction is too slow','slow']]}];
function why(t){let m='Follow the gas: out means lighter, in means heavier, trapped means no change.';
if(t==='destroy')m='Atoms are never destroyed in a reaction. The CO₂ just left the flask.';
if(t==='dense')m='Density does not change mass. The reading falls because CO₂ gas leaves.';
if(t==='burn')m='Burning in air adds oxygen. Iron + oxygen → iron oxide, heavier than the iron.';
if(t==='same')m='The flask is open to the air, so oxygen can join the iron: mass goes up.';
if(t==='sealed')m='Sealed means the gas cannot leave, so the reading stays the same.';
if(t==='gain')m='Nothing can get into a sealed flask either. Total mass is constant.';
if(t==='add')m='Subtract, do not add: 0.80 − 0.48 = 0.32 g of oxygen.';
if(t==='whole')m='0.80 g is all of the oxide. The oxygen is only the extra 0.32 g.';
if(t==='open')m='An open beaker lets gases in and out: an open system.';
if(t==='lid')m='With the lid off, air can get in, so it is open.';
if(t==='solid')m='Solids have mass. The total stays the same because no gas enters or leaves.';
if(t==='slow')m='Speed does not matter. With no gas made or used, nothing leaves the beaker.';
return m}
function pose(){qq++;const Q=QS[qq%QS.length],all=[[Q.a,'ok'],...Q.o],r=qq%3,ord=all.slice(r).concat(all.slice(0,r));
qz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
const bx=qz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},bx,v).onclick=()=>grade(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function grade(t,a){qz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else buzz();
fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=pose;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.12,draw,onStep:B=>{qz.hidden=B.step!==5;bt.hidden=B.step===5;keypad()},
init:B=>{A=B;const bx=c.el('div',{class:'fl-below'},A.below);bt=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Mass lab buttons'},bx);qz=c.el('div',{class:'fl-chal'},A.below);reboot();A.gest({down,move,up});keypad()}}).start()})})();
