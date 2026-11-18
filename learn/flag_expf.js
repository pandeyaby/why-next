/* Flagship – expected frequency (ages 12–14; NC England KS3 probability: relative frequency and expected outcomes; GCSE
   expected results = probability × number of trials; Common Core 7.SP.C.6). Place the expected count of sixes on a line, then
   see one real run; work out p × n in four contexts; repeat 120 rolls and watch results scatter round the expected value; see
   the proportion settle towards 1/6 as trials grow; and judge four dice from 600 rolls each. Rolls use a seeded generator. */
(()=>{
const LINE=[60,120,300];
const CTX=[{t:'A spinner has 4 equal parts. 1 is red. Spin it 200 times. How many reds do you expect?',p:'1/4',n:200,a:50,o:[[4,'4 is the number of parts, not a count of spins. Expected = 1/4 × 200.'],[25,'That is 200 ÷ 8. One part in 4 is red, so 200 ÷ 4.'],[150,'150 is the spins that are not red: 3/4 × 200.']]},
 {t:'P(rain on a day) = 0.3. How many rainy days do you expect in 30 days?',p:'0.3',n:30,a:9,o:[[3,'0.3 is a probability, not 3 days. Multiply: 0.3 × 30.'],[10,'That is 1/3 of 30. 0.3 is a little less than 1/3.'],[21,'21 is the dry days: 0.7 × 30.']]},
 {t:'A bag has 3 red and 7 blue counters. Take one, note it, put it back. Do this 50 times. How many reds?',p:'3/10',n:50,a:15,o:[[3,'3 is the reds in the bag, not in 50 draws.'],[21,'That uses 3 out of 7. There are 10 counters, so P(red) = 3/10.'],[35,'35 is the blue draws: 7/10 × 50.']]},
 {t:'Toss two coins 80 times. How often do you expect both to land heads?',p:'1/4',n:80,a:20,o:[[40,'That uses P = 1/2. Both heads is 1/2 × 1/2 = 1/4.'],[27,'HH, one of each, TT are not equally likely. There are 4 outcomes: HH, HT, TH, TT.'],[160,'An expected count cannot be more than the 80 tosses.']]}];
const BIG=[30,300,3000],DICE=[['Dice A',104],['Dice B',93],['Dice C',171],['Dice D',62]],JUDGE=[0,0,1,1];
let seed=7;const rnd=()=>{seed=(seed+0x6D2B79F5)|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const roll=(n,face,s)=>{seed=s;let k=0;for(let i=0;i<n;i++)if(Math.floor(rnd()*6)+1===face)k++;return k};
VIS.reg('flagexpf',c=>{let A,X,ctl,quiz,qn=-1,gen=0;const G={};
const INK='#111827',TILE='#ffffff',RIM='#4b5563',GOOD='#15803d',WRONG='#b91c1c',FOCUS='#1d4ed8',OBS='#c2410c',EXP='#1d4ed8';
const phase=()=>['line','ctx','runs','big','dice','quiz'][A.step],u=n=>Math.round(n*(A.narrow?1:1.15)),font=(n,w)=>`${w||700} ${u(n)}px system-ui,sans-serif`;
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function word(t,x,y,n,col,w,al){X.font=font(n,w);X.fillStyle=col||INK;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(t,x,y,A.W-16)}
function lines(t,max,n,w){X.font=font(n,w);const L=[];let s='';t.split(' ').forEach(d=>{const z=s?s+' '+d:d;if(s&&X.measureText(z).width>max){L.push(s);s=d}else s=z});if(s)L.push(s);return L}
function text(t,x,y,max,n,col,w){const L=lines(t,max,n,w),lh=u(n)*1.3;L.forEach((s,i)=>word(s,x,y+(i-(L.length-1)/2)*lh,n,col,w))}
function box(r,t,o){o=o||{};X.fillStyle=o.bg||TILE;A.paint.rrect(r.x,r.y,r.w,r.h,o.r||10);X.fill();X.lineWidth=o.edge?4:2;X.strokeStyle=o.edge||RIM;X.stroke();if(t)text(t,r.x+r.w/2,r.y+r.h/2+1,r.w-12,o.n||16,o.ink,o.w||800)}
function paper(){X.fillStyle=A.col.dark?'#0f172a':'#f8fafc';X.fillRect(0,0,A.W,A.H)}
function head(t,won){X.font=font(14,800);const w=Math.min(A.W-10,X.measureText(t).width+28),h=u(14)+16;box({x:A.W/2-w/2,y:A.H*.02,w,h},'',{r:h/2,bg:won?'#dcfce7':TILE,edge:won?GOOD:null});word(t,A.W/2,A.H*.02+h/2+1,14,INK,800)}
function axis(x0,x1,y,max,step,lab){const col=A.col.tx;X.strokeStyle=col;X.lineWidth=2.5;X.beginPath();X.moveTo(x0,y);X.lineTo(x1,y);X.stroke();
 for(let v=0;v<=max+1e-9;v+=step){const x=x0+(x1-x0)*v/max;X.lineWidth=1.5;X.beginPath();X.moveTo(x,y-8);X.lineTo(x,y+8);X.stroke();if(lab)word(String(+v.toFixed(3)),x,y+u(20),12,col,600)}}
/* ---- 1: place the expected number of sixes, then see one run ---- */
const L1=()=>({x0:u(26),x1:A.W-u(26),y:A.H*.5});
function drawLine(){const s=G.line,done=s.i>=LINE.length,n=LINE[Math.min(s.i,2)],max=n/2,e=L1();paper();
 head(done?'Expected = 1/6 × rolls; real runs land near it':`Roll a fair dice ${n} times: how many sixes?`,done);
 if(done){s.log.forEach((t,j)=>word(t,A.W/2,A.H*(.25+j*.17),15,A.col.tx,700));return}
 axis(e.x0,e.x1,e.y,max,max/6,1);word(`number of sixes in ${n} rolls`,A.W/2,e.y+u(44),12,A.col.mu,600);
 const v=s.v??0,x=e.x0+(e.x1-e.x0)*v/max;X.fillStyle=s.bad?WRONG:FOCUS;X.beginPath();X.arc(x,e.y,u(13),0,7);X.fill();word(String(v),x,e.y-u(28),16,A.col.tx,800);
 word('Drag the dot, or use the buttons',A.W/2,A.H*.82,13,A.col.tx,600)}
function setV(v){const s=G.line,n=LINE[s.i];if(n==null)return;const st=n/60;s.v=Math.max(0,Math.min(n/2,Math.round(v/st)*st));s.bad=0;A.redraw()}
function lock(){const s=G.line,n=LINE[s.i];if(n==null)return;const v=s.v??0,want=n/6;
 if(v===want){const k=roll(n,6,11+s.i*7);s.log.push(`${n} rolls: expected ${want}, this run ${k}`);s.i++;s.v=0;A.sound.pop();return tell(`Expected ${want} sixes: 1/6 × ${n}. One real run of ${n} rolls gave ${k}.`+(s.i>=LINE.length?' Close to expected, but rarely exact.':''))}
 s.bad=1;A.sound.miss();let m=`${v} would mean a six about once every ${+(n/v).toFixed(1)} rolls. A dice has 6 faces: 1/6 × ${n}.`;if(!v)m=`0 means no sixes at all. A dice has 6 faces, so expect 1/6 × ${n}.`;if(v===n/2)m='That is half the rolls, as for heads on a coin. A six is 1 face out of 6.';if(v===6)m='6 is the number of faces, not the number of sixes. Work out 1/6 × '+n+'.';tell(m)}
/* ---- 2: p × n in four contexts ---- */
const cTiles=()=>{const g=u(10),w=(A.W-u(28)-g)/2,h=A.H*.15;return[0,1,2,3].map(j=>({j,x:u(14)+(j%2)*(w+g),y:A.H*.56+Math.floor(j/2)*(h+g),w,h}))};
const cOpts=()=>{const q=CTX[G.ctx.i];if(!q)return[];const all=[q.a,...q.o.map(o=>o[0])];return all.map((_,j)=>all[(j+G.ctx.i+1)%4])};
function drawCtx(){const s=G.ctx,done=s.i>=CTX.length;paper();head(done?'Expected frequency = P × trials':`Context ${s.i+1} of 4`,done);
 if(done){CTX.forEach((q,j)=>word(`${q.p} × ${q.n} = ${q.a}`,A.W/2,A.H*(.22+j*.17),19,A.col.tx,800));return}
 const q=CTX[s.i];box({x:u(14),y:A.H*.12,w:A.W-u(28),h:A.H*.3},q.t,{n:16,edge:FOCUS});
 word(`P = ${q.p}   ·   trials = ${q.n}`,A.W/2,A.H*.49,15,A.col.tx,800);
 cTiles().forEach((r,j)=>box(r,String(cOpts()[j]),{n:24,bg:s.bad===cOpts()[j]?'#fee2e2':TILE,edge:s.bad===cOpts()[j]?WRONG:null}))}
function ctxTap(v){const s=G.ctx,q=CTX[s.i];if(!q)return;
 if(v===q.a){s.i++;s.bad=null;A.sound.pop();return tell(`${q.p} × ${q.n} = ${q.a}.`+(s.i>=CTX.length?' All 4 done.':''))}
 s.bad=v;A.sound.miss();const o=q.o.find(o=>o[0]===v);tell(o?o[1]:'Multiply the probability by the number of trials.')}
/* ---- 3: six runs of 120 rolls scatter round 20 ---- */
const R3=()=>({x0:u(26),x1:A.W-u(26),y:A.H*.62}),runBtn=()=>({x:A.W/2-u(100),y:A.H*.13,w:u(200),h:u(46)});
function drawRuns(){const s=G.runs,done=s.k.length>=6,e=R3();paper();head(done?'6 runs: scattered round 20, never all 20':`Run ${s.k.length+1} of 6: roll 120 times`,done);
 if(!done)box(runBtn(),'Roll 120 times',{n:16,bg:'#dbeafe',edge:FOCUS});
 axis(e.x0,e.x1,e.y,40,5,1);word('number of 4s in 120 rolls',A.W/2,e.y+u(44),12,A.col.mu,600);
 const xe=e.x0+(e.x1-e.x0)*20/40;X.strokeStyle=EXP;X.lineWidth=3;X.setLineDash([6,5]);X.beginPath();X.moveTo(xe,A.H*.35);X.lineTo(xe,e.y);X.stroke();X.setLineDash([]);word('expected 20',xe,A.H*.32,13,A.col.tx,800);
 const seen={};s.k.forEach(k=>{seen[k]=(seen[k]||0)+1;const x=e.x0+(e.x1-e.x0)*Math.min(40,k)/40,y=e.y-u(14)-(seen[k]-1)*u(22);X.fillStyle=OBS;X.beginPath();X.arc(x,y,u(9),0,7);X.fill()});
 if(s.k.length)word(`results: ${s.k.join(', ')}`,A.W/2,A.H*.85,14,A.col.tx,800)}
function runOnce(){const s=G.runs;if(s.k.length>=6)return;const k=roll(120,4,200+s.k.length*13);s.k.push(k);A.sound.tick();
 const d=k-20;tell(`Run ${s.k.length}: ${k} fours. ${d===0?'Exactly 20 this time, which is less common than you might think.':`${Math.abs(d)} ${d>0?'more':'fewer'} than expected, which is normal.`}`+(s.k.length>=6?` Spread: ${Math.min(...s.k)} to ${Math.max(...s.k)}.`:''))}
/* ---- 4: more trials, the proportion settles ---- */
const bTiles=()=>BIG.map((n,j)=>({j,n,x:u(14)+j*((A.W-u(28))/3),y:A.H*.13,w:(A.W-u(28))/3-u(8),h:u(52)}));
function drawBig(){const s=G.big,done=s.ok;paper();head(done?'More trials: proportion closer to 1/6':s.k.length<3?'Roll each amount once':'Which gives the best estimate of P(six)?',done);
 bTiles().forEach(q=>box(q,`${q.n} rolls`,{n:15,bg:s.bad===q.j?'#fee2e2':s.k[q.j]!=null?'#dcfce7':TILE,edge:s.bad===q.j?WRONG:s.k[q.j]==null?FOCUS:null}));
 const y0=A.H*.88,top=A.H*.32,x0=u(44),x1=A.W-u(14),sc=v=>y0-(y0-top)*v/.4,bw=(x1-x0)/3;X.strokeStyle=A.col.tx;X.lineWidth=2;X.beginPath();X.moveTo(x0,top);X.lineTo(x0,y0);X.lineTo(x1,y0);X.stroke();
 [0,.1,.2,.3,.4].forEach(v=>word(String(v),x0-u(18),sc(v),11,A.col.tx,600));
 X.strokeStyle=EXP;X.lineWidth=2.5;X.setLineDash([6,5]);X.beginPath();X.moveTo(x0,sc(1/6));X.lineTo(x1,sc(1/6));X.stroke();X.setLineDash([]);word('1/6',x0+u(16),sc(1/6)-u(10),12,A.col.tx,800);
 s.k.forEach((k,j)=>{if(k==null)return;const f=k/BIG[j],x=x0+j*bw+bw*.2;X.fillStyle=OBS;X.fillRect(x,sc(f),bw*.6,y0-sc(f));word(`${k}/${BIG[j]}`,x+bw*.3,sc(f)-u(26),12,A.col.tx,800);word(`= ${f.toFixed(3)}`,x+bw*.3,sc(f)-u(11),12,A.col.tx,700)})}
function bigTap(j){const s=G.big;if(s.ok)return;if(s.k[j]==null){s.k[j]=roll(BIG[j],6,683+j*31);A.sound.tick();const k=s.k[j];return tell(`${BIG[j]} rolls: ${k} sixes, expected ${(BIG[j]/6).toFixed(0)}. Proportion ${(k/BIG[j]).toFixed(3)}; 1/6 is 0.167.`+(s.k.filter(v=>v!=null).length===3?' Now tap the best estimate.':''))}
 if(s.k.filter(v=>v!=null).length<3)return tell('Roll the other amounts first.');
 if(j===2){s.ok=1;s.bad=null;A.sound.pop();return tell('3000 rolls: the proportion is closest to 1/6. The count can still be further from expected than with 30 rolls, but the proportion is steadier.')}
 s.bad=j;A.sound.miss();tell(j===0?'30 rolls is a small sample: a few lucky sixes swing the proportion a lot.':'300 is better than 30, but 3000 rolls gives a steadier proportion.')}
/* ---- 5: fair or biased? drag each dice card ---- */
const bins=()=>[0,1].map(j=>({j,x:u(14)+j*(A.W-u(28))/2,y:A.H*.7,w:(A.W-u(28))/2-u(8),h:A.H*.2})),home=()=>({x:A.W/2-u(120),y:A.H*.3,w:u(240),h:A.H*.2});
const BN=['Looks fair','Looks biased'];
function drawDice(){const s=G.dice,done=s.i>=DICE.length;paper();head(done?'Big gaps from expected suggest bias':`Dice ${s.i+1} of 4: 600 rolls, expected 100 sixes`,done);
 bins().forEach(q=>{box(q,BN[q.j],{n:16,bg:s.bad===q.j?'#fee2e2':TILE,edge:s.bad===q.j?WRONG:null});s.got.filter(g=>g[1]===q.j).forEach((g,k)=>word(g[0],q.x+q.w/2,q.y-u(14)-k*u(18),12,A.col.tx,800))});
 if(done)return;const h=home(),r=s.drag?{...h,x:s.drag.x-h.w/2,y:s.drag.y-h.h/2}:h,[nm,k]=DICE[s.i];box(r,`${nm}: ${k} sixes`,{n:19,edge:FOCUS});
 word('Fair dice: usually within about 20 of 100',A.W/2,A.H*.56,12,A.col.tx,600)}
function judge(b){const s=G.dice;if(s.i>=DICE.length)return;const [nm,k]=DICE[s.i],want=JUDGE[s.i],d=k-100;
 if(b===want){s.got.push([`${nm} (${k})`,b]);s.i++;s.bad=null;A.sound.pop();return tell(`${nm}: ${k} sixes is ${Math.abs(d)} ${d>0?'above':'below'} 100. ${b?'A gap that big is very unlikely by chance.':'A gap that small is normal for a fair dice.'}`+(s.i>=DICE.length?' All 4 judged.':''))}
 s.bad=b;A.sound.miss();let m=`${k} is only ${Math.abs(d)} away from 100. Fair dice rarely hit 100 exactly, so this is normal.`;if(want)m=`${k} is ${Math.abs(d)} away from 100. In 600 fair rolls that almost never happens, so this dice is probably biased.`;tell(m)}
/* ---- input ---- */
function down(p){const k=phase();
 if(k==='line'&&G.line.i<LINE.length){const e=L1();if(Math.abs(p.y-e.y)<u(40)){setV((p.x-e.x0)/(e.x1-e.x0)*LINE[G.line.i]/2);return true}}
 if(k==='ctx'){const q=cTiles().find(q=>inside(p,q));if(q)ctxTap(cOpts()[q.j])}
 if(k==='runs'&&inside(p,runBtn()))runOnce();
 if(k==='big'){const q=bTiles().find(q=>inside(p,q));if(q)bigTap(q.j)}
 if(k==='dice'&&G.dice.i<DICE.length){if(inside(p,home())){G.dice.drag={x:p.x,y:p.y};A.redraw();return true}const q=bins().find(q=>inside(p,q));if(q)judge(q.j)}return false}
function move(p){if(phase()==='line'&&G.line.i<LINE.length){const e=L1();setV((p.x-e.x0)/(e.x1-e.x0)*LINE[G.line.i]/2)}if(G.dice&&G.dice.drag){G.dice.drag={x:p.x,y:p.y};A.redraw()}}
function up(p){if(phase()==='line'&&G.line.i<LINE.length)return lock();const s=G.dice;if(!s||!s.drag)return;s.drag=null;const q=p&&bins().find(q=>inside(p,q));if(q)judge(q.j);else A.redraw()}
function reset(){gen++;for(const q in G)delete G[q];G.line={i:0,v:0,log:[]};G.ctx={i:0};G.runs={k:[]};G.big={k:[]};G.dice={i:0,got:[]};G.cb=()=>{}}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();G.cb()}
function begin(i,first,ready,msg){reset();tell(first);G.cb=()=>{if(A.step===i&&ready()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function auto(i,acts,ms){steps[i].go();const me=gen;acts.forEach((f,j)=>setTimeout(()=>{if(me===gen)f()},ms*(j+1)))}
function controls(){if(!ctl)return;ctl.innerHTML='';const k=phase(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(k==='line'&&G.line.i<LINE.length){const n=LINE[G.line.i],st=n/60;b('− Fewer',()=>{setV((G.line.v||0)-st);tell(`${G.line.v} sixes`)},`Fewer sixes, down by ${st}`);b('More +',()=>{setV((G.line.v||0)+st);tell(`${G.line.v} sixes`)},`More sixes, up by ${st}`);b('Lock it in',lock,`Lock in ${G.line.v||0} sixes`)}
 if(k==='ctx'&&G.ctx.i<CTX.length)cOpts().forEach(v=>b(String(v),()=>ctxTap(v),`Expect ${v}`));
 if(k==='runs'&&G.runs.k.length<6)b('Roll 120 times',runOnce);
 if(k==='big'&&!G.big.ok)BIG.forEach((n,j)=>b(`${n} rolls`,()=>bigTap(j),G.big.k[j]==null?`Roll ${n} times`:`${n} rolls is the best estimate`));
 if(k==='dice'&&G.dice.i<DICE.length)BN.forEach((n,j)=>b(n,()=>judge(j),`${DICE[G.dice.i][0]} ${n.toLowerCase()}`))}
const steps=[
{h:'How many sixes?',p:'A fair dice has 6 faces, so P(six) = 1/6. In n rolls you expect 1/6 × n sixes. Drag the dot to your answer and let go to lock it in.',
predict:{q:'You roll a fair dice 60 times. How many sixes will you get?',opts:['Exactly 10','About 10, but rarely exactly 10'],ans:1},task:'Lock in all 3 expected counts',
show:()=>auto(0,LINE.flatMap(n=>[()=>setV(n/6),()=>lock()]),450),go:()=>begin(0,'60 rolls. Drag the dot to how many sixes you expect.',()=>G.line.i>=LINE.length,'Expected = probability × number of trials.')},
{h:'Probability × trials',p:'Expected frequency = P(outcome) × number of trials. First find the probability of one trial, then multiply. Tap the expected count.',task:'Solve all 4 contexts',
show:()=>auto(1,CTX.map(q=>()=>ctxTap(q.a)),650),go:()=>begin(1,'Spinner: 1 red part out of 4, 200 spins. Tap your answer.',()=>G.ctx.i>=CTX.length,'Find P, then multiply by the trials.')},
{h:'Expected is not a promise',p:'Roll 120 times and count the 4s. You expect 1/6 × 120 = 20. Run it six times and watch where the results land.',
predict:{q:'Six runs of 120 rolls. How many runs give exactly 20 fours?',opts:['All 6: a fair dice gives what is expected','Few or none: results scatter round 20'],ans:1},task:'Do all 6 runs',
show:()=>auto(2,[0,1,2,3,4,5].map(()=>runOnce),500),go:()=>begin(2,'Tap Roll 120 times.',()=>G.runs.k.length>=6,'Results vary round the expected value.')},
{h:'More trials',p:'Relative frequency = count ÷ trials. Roll 30, 300 and 3000 times and compare each proportion of sixes with 1/6 ≈ 0.167.',
predict:{q:'As you roll more times, the proportion of sixes…',opts:['jumps around just as much','settles closer to 1/6'],ans:1},task:'Roll all 3, then pick the best estimate',
show:()=>auto(3,[()=>bigTap(0),()=>bigTap(1),()=>bigTap(2),()=>bigTap(2)],600),go:()=>begin(3,'Tap 30 rolls to start.',()=>!!G.big.ok,'Large samples give steadier estimates.')},
{h:'Fair or biased?',p:'Each dice was rolled 600 times, so 100 sixes are expected. Small gaps are normal. A huge gap suggests the dice is biased. Drag each card into a box, or tap a box.',task:'Judge all 4 dice',
show:()=>auto(4,JUDGE.map(b=>()=>judge(b)),600),go:()=>begin(4,'Dice A: 104 sixes. Drag the card into a box.',()=>G.dice.i>=DICE.length,'Compare observed with expected.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>G.cb()});
const QS=[
{q:'A fair dice is rolled 120 times. How many 4s do you expect?',a:'20',o:[['4','4 is the face, not the count. Expected = 1/6 × 120.'],['60','60 is half of 120. A 4 is 1 face out of 6, not 1 out of 2.']]},
{q:'P(win) = 0.2. Expected wins in 40 games?',a:'8',o:[['2','0.2 is a probability, not a number of wins. Multiply 0.2 × 40.'],['20','20 would be P = 0.5. Use 0.2 × 40.']]},
{q:'Expected 50 heads in 100 tosses, but you got 46. What does that show?',a:'Normal variation: results scatter round expected',o:[['The coin must be biased','A gap of 4 in 100 tosses happens often with a fair coin.'],['You did the sum wrong','1/2 × 100 = 50 is right. Real results rarely equal the expected value.']]},
{q:'Which gives the most reliable estimate of P(six)?',a:'1000 rolls',o:[['10 rolls','10 rolls is tiny: one or two sixes swing the proportion a lot.'],['100 rolls','Better than 10, but more trials give a steadier proportion.']]},
{q:'Two coins are tossed 60 times. Expected number of times both are tails?',a:'15',o:[['30','That uses P = 1/2. Both tails is 1/2 × 1/2 = 1/4.'],['20','HH, mixed, TT are not equally likely. TT is 1 of 4 outcomes: HH, HT, TH, TT.']]},
{q:'600 rolls give 172 sixes. Expected is 100. Best conclusion?',a:'The dice is probably biased',o:[['It is fine: results always vary','They vary, but 72 above expected in 600 fair rolls almost never happens.'],['It is definitely biased','Very likely biased, but probability evidence never makes it certain.']]}];
function ask(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,''],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=quiz.querySelector('.fl-pick');ord.forEach(([v,why])=>{c.el('button',{type:'button',class:'lbtn'},g,v).onclick=()=>mark(why,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(why,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=!why;if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why)+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why)}
function draw(){const k=phase();if(k==='quiz'){paper();head('Challenge',1);text('Expected frequency = P × trials. Real results scatter round it.',A.W/2,A.H*.5,A.W-u(40),17,A.col.tx,800);return}
 ({line:drawLine,ctx:drawCtx,runs:drawRuns,big:drawBig,dice:drawDice})[k]();A.fx.draw(X)}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:B=>{quiz.hidden=B.step!==5;ctl.hidden=B.step===5;controls()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Probability buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});controls()}}).start()})})();
