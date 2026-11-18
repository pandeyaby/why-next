/* Flagship – random sampling methods (ages 13–15; GCSE statistics, CCSS 7.SP.1). Read a random number table and skip
   repeats and out-of-range pairs; set the interval and random start for a systematic sample; find the start that hits
   only corner houses; build a proportional stratified sample; match situations to methods. Not flagsample (12–14). */
(()=>{
const PAIRS=[['23',1],['07',1],['41',1],['07',0,'rep'],['58',0,'big'],['15',1],['00',0,'zero'],['36',1]];
const YEARS=[['Y7',240,12],['Y8',200,10],['Y9',160,8],['Y10',200,10]];
const KS=[6,10,12];
const JOBS=[['A computer picks 50 random ID numbers',0],['Every 20th car through the gate, after a random start',1],['Each age group sampled in proportion to its size',2],
['30 names drawn from a hat holding every member',0],['Every 5th name on the register, starting at a random name',1],['Same share of Year 7 to Year 11 as the school, picked at random within each year',2]];
const MNAME=['Simple random','Systematic','Stratified'];
VIS.reg('flagrsamp',c=>{let A,pad,quiz,qx=-1,tok=0;const M={};
const INK='#0f172a',YES='#047857',NO='#b91c1c',GRID='#64748b',PICK='#1d4ed8',PICKF='#dbeafe',CORN='#7c3aed',UI='system-ui,sans-serif';
const ft=(n,w)=>`${w||700} ${n}px ${UI}`,sc=n=>A.narrow?n:Math.round(n*1.15),mid=g=>{g.textAlign='center';g.textBaseline='middle'};
const now=()=>['srs','sys','cyc','strat','match','chal'][A.step],within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const ding=()=>A.sound.pop(),buzz=()=>A.sound.miss();
function base(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#eff6ff',A.col.dark?.05:.45);g.fillRect(0,0,A.W,A.H)}
function chip(t,x,y,o){o=o||{};const g=A.ctx;let n=sc(o.n||13);g.font=ft(n,800);let w=g.measureText(t).width+22;while(w>A.W-10&&n>9){n--;g.font=ft(n,800);w=g.measureText(t).width+22}
const h=n+14,l=Math.max(5,Math.min(A.W-w-5,x-w/2));g.fillStyle='#ffffff';A.paint.rrect(l,y-h/2,w,h,h/2);g.fill();g.lineWidth=o.ok?3:1.5;g.strokeStyle=o.ok?YES:GRID;g.stroke();g.fillStyle=INK;mid(g);g.fillText(t,l+w/2,y+1)}
function cell(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.fill||'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,Math.min(8,r.h/4));g.fill();g.lineWidth=o.ok||o.no||o.on?3:1;g.strokeStyle=o.ok?YES:o.no?NO:o.on?PICK:GRID;g.stroke();
if(t==null)return;g.fillStyle=INK;g.font=ft(o.n||Math.max(9,Math.round(r.h*.42)),o.b?800:600);mid(g);g.fillText(t,r.x+r.w/2,r.y+r.h/2+1)}
function grid(n,cols,y0,h){const gap=3,w=(A.W-20-gap*(cols-1))/cols,ch=Math.min(h/Math.ceil(n/cols)-gap,w);return[...Array(n)].map((_,i)=>({i,x:10+(i%cols)*(w+gap),y:y0+Math.floor(i/cols)*(ch+gap),w,h:ch}))}
function wrapCard(r,t,o){o=o||{};const g=A.ctx;cell(r,null,o);g.fillStyle=INK;const n=o.n||sc(13);g.font=ft(n,700);const L=[];let cur='';t.split(' ').forEach(w=>{const tr=cur?cur+' '+w:w;if(g.measureText(tr).width>r.w-14&&cur){L.push(cur);cur=w}else cur=tr});L.push(cur);
mid(g);const lh=n*1.2;L.forEach((ln,i)=>g.fillText(ln,r.x+r.w/2,r.y+r.h/2+(i-(L.length-1)/2)*lh+1))}
/* 1: random number table */
function pairR(){const n=PAIRS.length,gap=6,w=Math.min(sc(52),(A.W-20-gap*(n-1))/n);const x0=(A.W-(n*w+(n-1)*gap))/2;return PAIRS.map((p,i)=>({i,x:x0+i*(w+gap),y:A.H*.15,w,h:sc(34)}))}
function useR(){const w=Math.min(sc(130),(A.W-36)/2),h=sc(40),y=A.H*.86;return[{k:1,x:A.W/2-w-6,y,w,h},{k:0,x:A.W/2+6,y,w,h}]}
function drawSrs(){const s=M.r;base();const R=pairR();
R.forEach(r=>cell(r,PAIRS[r.i][0],{b:1,n:sc(15),on:r.i===s.k,ok:r.i<s.k&&PAIRS[r.i][1],fill:r.i<s.k?(PAIRS[r.i][1]?'#ecfdf5':'#f1f5f9'):null,no:s.no&&r.i===s.k}));
chip(s.k>=8?`Sample: ${s.picked.join(', ')}`:`Pair ${s.k+1} of 8: use it or skip it? Students are 01 to 50`,A.W/2,A.H*.08,{ok:s.k>=8,n:12});
grid(50,10,A.H*.27,A.H*.54).forEach(r=>{const id=String(r.i+1).padStart(2,'0');cell(r,id,{fill:s.picked.includes(id)?PICKF:null,on:s.picked.includes(id)})});
if(s.k<8)useR().forEach(b=>cell(b,b.k?'Use it':'Skip it',{b:1,n:sc(15)}))}
function judge(use){const s=M.r;if(s.k>=8)return;const [v,ok,why]=PAIRS[s.k];
if(use!==!!ok){s.no=1;buzz();return speak(ok?`${v} is a student on the list and not yet picked, so use it.`:why==='rep'?`${v} is already in the sample. Skip repeats, or you count one person twice.`:why==='big'?`There is no student ${v}. Skip it; do not swap in a nearby number, or student 50 gets an extra chance.`:'There is no student 00 on a list from 01 to 50. Skip it.')}
s.no=0;s.k++;if(ok)s.picked.push(v);ding();speak((ok?`Student ${v} joins the sample.`:`Skipped ${v}.`)+(s.k>=8?` Sample of 5: ${s.picked.join(', ')}. Every student had the same chance.`:''))}
/* 2: systematic */
function kR(){const w=Math.min(sc(70),(A.W-40)/3),y=A.H*.17;return KS.map((k,i)=>({k,x:A.W/2-(1.5*w+8)+i*(w+8),y,w,h:sc(34)}))}
function drawSys(){const s=M.s;base();chip(s.k==null?'60 people, sample of 6. Choose the interval k':s.st==null?`k = ${s.k}. Now tap a start in row 1 (1 to ${s.k})`:`Start ${s.st}, every ${s.k}th: ${picks(s).join(', ')}`,A.W/2,A.H*.08,{n:12,ok:s.st!=null});
kR().forEach(b=>cell(b,`k = ${b.k}`,{b:1,n:sc(14),on:s.k===b.k}));const P=s.st!=null?picks(s):[];
grid(60,10,A.H*.3,A.H*.66).forEach(r=>cell(r,String(r.i+1),{fill:P.includes(r.i+1)?PICKF:s.k&&s.st==null&&r.i<s.k?'#fefce8':null,on:P.includes(r.i+1)}))}
function picks(s){const o=[];for(let v=s.st;v<=60;v+=s.k)o.push(v);return o}
function setK(k){const s=M.s;s.st=null;if(k!==10){s.k=null;buzz();return speak(`Every ${k}th of 60 gives ${60/k} people, not 6. The interval is population ÷ sample = 60 ÷ 6.`)}s.k=10;ding();speak('k = 60 ÷ 6 = 10. Now choose a random start from 1 to 10.')}
function setStart(v){const s=M.s;if(!s.k){buzz();return speak('Choose the interval first.')}if(v>s.k){buzz();return speak(`Start inside the first ${s.k}, or you get fewer than 6.`)}s.st=v;ding();speak(`Start ${v}: ${picks(s).join(', ')}. That is 6 people, evenly spread.`)}
/* 3: hidden cycle */
function drawCyc(){const s=M.c,g=A.ctx;base();const P=s.st?picks({st:s.st,k:10}).filter(v=>v<=40):[],corner=P.filter(v=>v%10===0).length;
chip(s.st?`Start ${s.st}: houses ${P.join(', ')}. Corner houses: ${corner} of 4`:'Every 10th house is a big corner house. Tap a start (1 to 10)',A.W/2,A.H*.08,{n:12,ok:s.all&&s.none});
grid(40,10,A.H*.2,A.H*.52).forEach(r=>{const v=r.i+1;cell(r,String(v),{fill:v%10===0?'#ede9fe':P.includes(v)?PICKF:null,on:P.includes(v),n:Math.max(9,Math.round(r.h*.38))});if(v%10===0){g.fillStyle=CORN;g.fillRect(r.x+3,r.y+3,6,6)}});
chip(`${s.all?'✓':'○'} only corner houses   ${s.none?'✓':'○'} no corner houses`,A.W/2,A.H*.79,{n:12,ok:s.all&&s.none});chip('Purple = corner house',A.W/2,A.H*.91,{n:11})}
function tryStart(v){const s=M.c;s.st=v;A.sound.tick();if(v===10){s.all=1;speak('Start 10 picks 10, 20, 30, 40: every one a corner house. The interval matches the pattern, so the sample is biased.')}
else{s.none=1;speak(`Start ${v} misses every corner house. The pattern in the list decides who is picked.`)}}
/* 4: stratified */
function rowR(){const h=Math.min(sc(46),A.H*.12);return YEARS.map((y,i)=>({i,y:A.H*.2+i*(h+8),h}))}
function btnR(r,d){const w=sc(40);return{x:d<0?A.W-2*w-24:A.W-w-12,y:r.y+(r.h-w*.9)/2,w,h:w*.9}}
function drawStrat(){const s=M.t,g=A.ctx;base();const tot=s.n.reduce((a,b)=>a+b,0),done=s.n.every((v,i)=>v===YEARS[i][2]);
chip(done?'Proportional: 12 + 10 + 8 + 10 = 40':`School of 800, sample of 40. Set each year: total ${tot}`,A.W/2,A.H*.08,{n:12,ok:done});
rowR().forEach(r=>{const [nm,size,need]=YEARS[r.i],v=s.n[r.i];g.fillStyle=A.col.tx;g.font=ft(sc(13),800);g.textAlign='left';g.textBaseline='middle';g.fillText(`${nm}: ${size}`,12,r.y+r.h/2);
const bw=A.W-2*sc(40)-24-12-sc(82)-12,bx=12+sc(82);g.fillStyle='#e2e8f0';g.fillRect(bx,r.y+r.h*.25,bw,r.h*.5);g.fillStyle=v===need?'#10b981':'#60a5fa';g.fillRect(bx,r.y+r.h*.25,bw*Math.min(1,v/16),r.h*.5);
g.fillStyle=INK;g.font=ft(sc(14),800);g.textAlign='left';g.fillText(String(v),bx+6,r.y+r.h/2);cell(btnR(r,-1),'−',{b:1,n:sc(20)});cell(btnR(r,1),'+',{b:1,n:sc(20)})});
g.fillStyle=A.col.tx;g.font=ft(sc(12),700);mid(g);g.fillText('Each year: (year size ÷ 800) × 40',A.W/2,A.H*.86)}
function bump(i,d){const s=M.t,[nm,size,need]=YEARS[i];s.n[i]=Math.max(0,Math.min(16,s.n[i]+d));A.sound.tick();const v=s.n[i];
if(s.n.every((x,j)=>x===YEARS[j][2])){ding();return speak('Each year is sampled in proportion: 240 ÷ 800 × 40 = 12, then 10, 8 and 10. Now pick at random inside each year.')}
if(v===need)return speak(`${nm}: ${v} is right. ${size} ÷ 800 × 40 = ${need}.`);if(s.n.every(x=>x===10)){buzz();return speak('10 each ignores the year sizes. Y7 is 30% of the school, so it gets 30% of 40 = 12.')}
speak(`${nm}: ${v}. ${v<need?'Too few':'Too many'}: ${nm} is ${size} of 800 students, so it gets ${size} ÷ 800 of the 40.`)}
/* 5: match */
function binR(){const gap=8,w=(A.W-20-2*gap)/3,h=A.H*.3;return MNAME.map((m,i)=>({i,x:10+i*(w+gap),y:A.H*.64,w,h}))}
function jobR(){const w=Math.min(sc(380),A.W-24),h=Math.min(sc(70),A.H*.18);return{x:A.W/2-w/2,y:A.H*.2,w,h}}
function drawMatch(){const s=M.m,g=A.ctx;base();chip(s.k>=6?'All 6 matched':`Card ${s.k+1} of 6: drag it to its method`,A.W/2,A.H*.08,{n:12,ok:s.k>=6});
binR().forEach(r=>{cell(r,null,{fill:['#eff6ff','#fefce8','#f5f3ff'][r.i]});g.fillStyle=INK;g.font=ft(sc(12),800);g.textAlign='center';g.textBaseline='top';g.fillText(MNAME[r.i],r.x+r.w/2,r.y+8);
g.font=ft(sc(22),900);g.fillText(String(JOBS.slice(0,s.k).filter(j=>j[1]===r.i).length),r.x+r.w/2,r.y+r.h*.5)});
if(s.k<6){const r=jobR(),d=M.drag;wrapCard(d?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r,JOBS[s.k][0],{no:s.no,on:!!d})}}
function place(b){const s=M.m;if(s.k>=6)return;const [t,ok]=JOBS[s.k];
if(b!==ok){s.no=1;buzz();return speak(ok===0?'Each one is picked purely by chance from the whole list, with no interval and no groups: simple random.':ok===1?'A fixed gap after a random start is systematic.':'The sample copies the group sizes of the population: stratified.')}
s.no=0;s.k++;ding();speak(`${MNAME[ok]}. `+['Every member has the same chance, chosen independently.','Random start, then a fixed interval.','Groups first, in proportion, then random within each.'][ok]+(s.k>=6?' All 6 matched.':''))}
function draw(){const k=now();if(k==='chal'){base();chip('Challenge',A.W/2,A.H*.2,{ok:1});chip('Random means every member has a known, equal chance',A.W/2,A.H*.52,{n:13});return}
({srs:drawSrs,sys:drawSys,cyc:drawCyc,strat:drawStrat,match:drawMatch})[k]();A.fx.draw(A.ctx)}
function down(p){const k=now();
if(k==='srs'&&M.r.k<8){const b=useR().find(r=>within(p,r));if(b)judge(!!b.k);return false}
if(k==='sys'){const b=kR().find(r=>within(p,r));if(b)return setK(b.k),false;const r=grid(60,10,A.H*.3,A.H*.66).find(r=>within(p,r));if(r)setStart(r.i+1);return false}
if(k==='cyc'){const r=grid(40,10,A.H*.2,A.H*.52).find(r=>within(p,r));if(r&&r.i<10)tryStart(r.i+1);else if(r){buzz();speak('Start in the first 10 houses.')}return false}
if(k==='strat'){rowR().forEach(r=>{if(within(p,btnR(r,-1)))bump(r.i,-1);else if(within(p,btnR(r,1)))bump(r.i,1)});return false}
if(k==='match'&&M.m.k<6){if(within(p,jobR())){M.drag={x:p.x,y:p.y};return true}const b=binR().find(r=>within(p,r));if(b)place(b.i)}return false}
function move(p){if(!M.drag)return;M.drag.x=p.x;M.drag.y=p.y;A.redraw()}
function up(p){if(!M.drag)return;M.drag=null;const b=binR().find(r=>within(p,r));if(b)place(b.i);else A.redraw()}
function wipe(){tok++;for(const k in M)delete M[k];Object.assign(M,{r:{k:0,picked:[]},s:{k:null,st:null},c:{st:null},t:{n:[0,0,0,0]},m:{k:0},drag:null,gate:()=>{}})}
function speak(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();ctl();M.gate()}
function arm(i,desc,ok,msg){wipe();speak(desc);M.gate=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function replay(i,acts,ms){steps[i].go();const t=tok;acts.forEach((f,j)=>setTimeout(()=>{if(t===tok)f()},ms*(j+1)))}
function ctl(){if(!pad)return;pad.innerHTML='';const k=now(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn sm','aria-label':l||t},pad,t).onclick=f};
if(k==='srs'&&M.r.k<8){B(`Use ${PAIRS[M.r.k][0]}`,()=>judge(true));B(`Skip ${PAIRS[M.r.k][0]}`,()=>judge(false))}
if(k==='sys'){KS.forEach(v=>B(`k = ${v}`,()=>setK(v)));if(M.s.k)for(let v=1;v<=M.s.k;v++)B(`Start ${v}`,()=>setStart(v))}
if(k==='cyc')for(let v=1;v<=10;v++)B(`Start ${v}`,()=>tryStart(v));
if(k==='strat')YEARS.forEach(([nm],i)=>{B(`${nm} −`,()=>bump(i,-1),`${nm} one fewer`);B(`${nm} +`,()=>bump(i,1),`${nm} one more`)});
if(k==='match'&&M.m.k<6)MNAME.forEach((m,i)=>B(m,()=>place(i)))}
const steps=[
{h:'Simple random sample',p:'Students are numbered 01 to 50. Read the random number table two digits at a time and keep each pair that names a new student, until you have 5.',
predict:{q:'58 comes up, but the list stops at 50. What do you do?',opts:['Use student 50 instead','Skip it and read the next pair'],ans:1},task:'Decide all 8 pairs',
show:()=>replay(0,PAIRS.map(p=>()=>judge(!!p[1])),450),
go:()=>arm(0,'Random pairs 23 07 41 07 58 15 00 36 above a grid of students 01 to 50.',()=>M.r.k>=8,'Skip repeats and numbers not on the list. Every student then has the same chance.')},
{h:'Systematic sample',p:'For a sample of n from a list of N, take every kth person, where k = N ÷ n. Pick the start at random from 1 to k.',
task:'Set k, then a start, for a sample of 6',show:()=>replay(1,[()=>setK(10),()=>setStart(4)],1200),
go:()=>arm(1,'A list of 60 people. Buttons k = 6, 10, 12.',()=>M.s.st!=null&&M.s.k===10,'k = 60 ÷ 6 = 10, random start, then every 10th.')},
{h:'Hidden pattern',p:'A street has 40 houses. Every 10th one is a big corner house. Try different starts with k = 10.',
predict:{q:'Is every 10th house, starting at house 10, a fair sample of the street?',opts:['Yes: it is systematic, so it is random','No: it picks only corner houses'],ans:1},task:'Find a start with only corner houses, and one with none',
show:()=>replay(2,[()=>tryStart(10),()=>tryStart(3)],1300),
go:()=>arm(2,'40 houses; 10, 20, 30 and 40 are corner houses.',()=>M.c.all&&M.c.none,'If the list repeats with the same gap as k, a systematic sample can be badly biased. Use a simple random sample instead.')},
{h:'Stratified sample',p:'Split the population into groups (strata), then sample each group in proportion to its size: (group size ÷ total) × sample size.',
predict:{q:'A school has 4 year groups of different sizes. For 40, should each year give 10?',opts:['Yes, 10 each is fair','No, bigger years give more'],ans:1},task:'Set all 4 years',
show:()=>replay(3,YEARS.flatMap(([, ,need],i)=>[()=>{M.t.n[i]=need-1;bump(i,1)}]),900),
go:()=>arm(3,'Y7 240, Y8 200, Y9 160, Y10 200 students. Plus and minus for each year.',()=>M.t.n.every((v,i)=>v===YEARS[i][2]),'Proportional strata: 12, 10, 8, 10. Then choose at random inside each year.')},
{h:'Which method?',p:'Drag each situation to the method it uses.',task:'Match all 6',show:()=>replay(4,JOBS.map(j=>()=>place(j[1])),600),
go:()=>arm(4,'Card: A computer picks 50 random ID numbers. Boxes: Simple random, Systematic, Stratified.',()=>M.m.k>=6,'Chance alone: simple random. Fixed gap: systematic. Groups in proportion: stratified.')},
{h:'Challenge',p:'',go:()=>{wipe();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>M.gate()});
const QS=[
{q:'600 students: 360 girls, 240 boys. In a stratified sample of 50, how many girls?',a:'30',o:[['25','equal'],['36','tenth']]},
{q:'Why choose people at random?',a:'Each has the same chance, so bias is less likely',o:[['It makes the sample match exactly','exact'],['It is always quickest','quick']]},
{q:'A systematic sample of 8 from a list of 200 uses which interval?',a:'25',o:[['8','kn'],['200','kN']]},
{q:'In the table, 47 comes up a second time. What do you do?',a:'Skip the repeat',o:[['Count that person twice','twice'],['Stop sampling','stop']]},
{q:'Asking the first 20 people at the gym door is…',a:'Not random: an opportunity sample',o:[['A simple random sample','handy'],['A systematic sample','handy']]},
{q:'Which method makes sure each year group appears in proportion?',a:'Stratified',o:[['Simple random','luck'],['Systematic','luck']]}];
function why(t){let m='Random selection gives every member a fair chance.';
if(t==='equal')m='Equal halves ignore the sizes. Girls are 360 ÷ 600 = 60%, and 60% of 50 is 30.';
if(t==='tenth')m='That takes a tenth of 360. Use the share: 360 ÷ 600 × 50 = 30.';
if(t==='exact')m='No sample matches exactly. Random choice removes bias in who is picked; results still vary by chance.';
if(t==='quick')m='Random sampling is often slower. Its point is fairness, not speed.';
if(t==='kn')m='Every 8th person gives 25 people. The interval is 200 ÷ 8 = 25.';
if(t==='kN')m='An interval of 200 picks 1 person. Divide the list size by the sample size.';
if(t==='twice')m='Counting someone twice gives them extra weight. Skip repeats.';
if(t==='stop')m='Just skip the repeat and keep reading pairs until the sample is full.';
if(t==='handy')m='Only people at the door that moment can be picked, so it is not random. That is opportunity sampling.';
if(t==='luck')m='That could give the right mix by luck, but only stratifying makes sure.';
return m}
function ask(){qx++;const Q=QS[qx%QS.length],all=[[Q.a,'ok'],...Q.o],r=qx%3,ord=all.slice(r).concat(all.slice(0,r));
quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
const box=quiz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},box,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else buzz();
fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.66,tall:1.25,draw,onStep:B=>{quiz.hidden=B.step!==5;pad.hidden=B.step===5;ctl()},
init:B=>{A=B;const bx=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Sampling buttons'},bx);quiz=c.el('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});ctl()}}).start()})})();
