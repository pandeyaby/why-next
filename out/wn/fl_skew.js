/* Flagship – shape of a distribution (ages 14–16; CCSS HSS-ID.A.2–3, AQA GCSE Statistics 8382). Scenes: name the shape
   of six histograms (symmetric, positive skew, negative skew, bimodal); drag bars to build each shape while live mean
   and median markers show the mean pulled towards the tail; slide the walkers' times away from the runners' at a
   parkrun until one hump splits into two peaks; match real data (pay, heights, age at death) to its shape; tell the
   mean from the median on a skewed chart. Data in learn/skew_art.js. Distinct from flagbshape (binomial B(n, p) shape
   from n and p) and flagoutlr (one outlier and choosing an average): this lab is about reading and naming shape. */
(()=>{const K=SKW;
/* summary of counts for the values 1..n: total, mean, median, moment skewness */
function stats(n){let N=0,S=0;n.forEach((c,i)=>{N+=c;S+=c*(i+1)});if(!N)return{N:0,mean:0,median:0,g1:0};const mean=S/N;let v=0,t=0;
 n.forEach((c,i)=>{v+=c*Math.pow(i+1-mean,2);t+=c*Math.pow(i+1-mean,3)});v/=N;t/=N;
 const at=r=>{let run=0;for(let i=0;i<n.length;i++){run+=n[i];if(run>=r)return i+1}return n.length};
 const median=N%2?at((N+1)/2):(at(N/2)+at(N/2+1))/2;return{N,mean,median,g1:v?t/Math.pow(v,1.5):0}}
/* which of SHAPES the built bars show, or -1 when it is none of them clearly */
function shapeOf(n){const s=stats(n);if(s.g1>=.6&&s.mean>s.median)return 1;if(s.g1<=-.6&&s.mean<s.median)return 2;
 if(Math.abs(s.g1)<=.1&&Math.abs(s.mean-s.median)<=.1)return 0;return -1}
/* two clear peaks: a dip between two maxima at most 70% of the smaller one; one peak: rises then falls with no dip */
function twoPeaks(t){for(let i=1;i<t.length-1;i++)for(let j=i+2;j<t.length-1;j++){if(t[i]<t[i-1]||t[j]<t[j+1])continue;const low=Math.min(...t.slice(i,j+1));if(low<=.7*Math.min(t[i],t[j]))return true}return false}
function onePeak(t){let down=false;for(let i=1;i<t.length;i++){if(t[i]<t[i-1])down=true;else if(t[i]>t[i-1]&&down)return false}return true}
VIS.reg('flagskew',c=>{let A,pad,box,qi=-1,epoch=0,hold=null;const S={};
const BG='#f8fafc',INK='#0f172a',BAR='#2563eb',BAR2='#ea580c',MEAN='#b91c1c',MED='#047857',GOOD='#15803d',BAD='#b91c1c',RULE='#94a3b8',FF='px system-ui,sans-serif';
const stage=()=>['name','build','runs','context','spot','chal'][A.step];
const fz=n=>A.narrow?n:Math.round(n*1.12);
function chip(t,x,y,o){o=o||{};const g=A.ctx;let f=fz(o.n||13);g.font=`700 ${f}${FF}`;while(g.measureText(t).width+20>A.W-8&&f>10){f--;g.font=`700 ${f}${FF}`}
 const w=g.measureText(t).width+20,h=f+13,l=Math.max(4,Math.min(A.W-w-4,x-w/2));g.fillStyle='#ffffff';A.paint.rrect(l,y-h/2,w,h,8);g.fill();
 g.lineWidth=o.ok||o.no?3:1.3;g.strokeStyle=o.ok?GOOD:o.no?BAD:RULE;g.stroke();g.fillStyle=o.col||INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,l+w/2,y+1)}
function seg(a,b,col,w,dash){const g=A.ctx;g.setLineDash(dash||[]);g.strokeStyle=col;g.lineWidth=w;g.beginPath();g.moveTo(a.x,a.y);g.lineTo(b.x,b.y);g.stroke();g.setLineDash([])}
/* the chart area and its x position for a value v on a 1..n scale */
const area=()=>({l:A.W*.1,r:A.W*.95,t:A.H*.2,b:A.H*.78});
const xAt=(v,n)=>{const P=area();return P.l+(v-.5)/n*(P.r-P.l)};
function bars(n,o){o=o||{};const g=A.ctx,P=area(),top=o.max||Math.max(9,...n),bw=(P.r-P.l)/n.length;
 g.fillStyle=BG;g.fillRect(0,0,A.W,A.H);seg({x:P.l,y:P.b},{x:P.r,y:P.b},INK,2);
 n.forEach((cnt,i)=>{const h=cnt/top*(P.b-P.t),x=P.l+i*bw;g.fillStyle=o.pick===i?'#1e3a8a':o.cols?o.cols[i]:BAR;g.fillRect(x+2,P.b-h,bw-4,h);
  if(o.stack){const h2=o.stack[i]/top*(P.b-P.t);g.fillStyle=BAR2;g.fillRect(x+2,P.b-h-h2,bw-4,h2)}
  g.fillStyle=INK;g.font=`700 ${fz(10)}${FF}`;g.textAlign='center';g.textBaseline='top';g.fillText(o.lab?o.lab(i):String(i+1),x+bw/2,P.b+4)})}
function marker(v,n,col,txt,row){const P=area(),x=xAt(v,n);seg({x,y:P.t-6},{x,y:P.b},col,3,[7,5]);chip(txt,x,P.b+fz(26)+row*fz(24),{n:11,col})}
/* 1. name the shape */
function drawName(){const s=S.name;if(s.i>=K.NAME.length){bars([0,0,0,0,0,0,0,0,0]);chip('All 6 shapes named',A.W/2,A.H*.1,{ok:1});return}
 bars(K.NAME[s.i].n);chip(`Chart ${s.i+1} of ${K.NAME.length}: what shape is it?`,A.W/2,A.H*.08,{n:13,no:s.miss!=null})}
function nameIt(k){const s=S.name;if(s.i>=K.NAME.length)return;const a=K.NAME[s.i].a;let m;
 if(k===a){s.miss=null;s.i++;A.sound.pop();return say(`Yes: ${K.SHAPES[a].toLowerCase()}.`+(s.i<K.NAME.length?' Next chart.':''))}
 if((k===1&&a===2)||(k===2&&a===1))m='Skew is named after the tail, not the peak. Find the long thin side: a tail on the right is positive, on the left is negative.';
 else if(k===0)m='The two sides do not match. One side trails off in a long thin tail, so it is skewed.';
 else if(a===3)m='Count the peaks: there are two humps with a dip between, so it is bimodal.';
 else m='There is only one peak here. Bimodal means two separate peaks with a dip between them.';
 s.miss=k;A.sound.miss();say(m)}
/* 2. build shapes by dragging bars; the mean and median follow live */
function drawBuild(){const s=S.build,st=stats(s.n);bars(s.n,{pick:s.pick});if(st.N){marker(st.mean,9,MEAN,`mean ${st.mean.toFixed(1)}`,0);marker(st.median,9,MED,`median ${st.median}`,1)}
 chip(s.i>=K.BUILD.length?'All 3 shapes built':`Shape ${s.i+1} of 3: build ${K.BUILD[s.i].say}`,A.W/2,A.H*.08,{n:12,ok:s.i>=K.BUILD.length})}
function setBar(i,h){const s=S.build;if(s.i>=K.BUILD.length)return;s.pick=i;s.n[i]=Math.max(0,Math.min(9,Math.round(h)));const st=stats(s.n);
 A.cv.setAttribute('aria-label',`Bar ${i+1} is ${s.n[i]} high. Mean ${st.mean.toFixed(1)}, median ${st.median}.`);check()}
function check(){const s=S.build;if(s.i>=K.BUILD.length)return A.redraw();if(shapeOf(s.n)!==K.BUILD[s.i].want)return A.redraw();const st=stats(s.n);s.i++;hold=null;A.sound.pop();
 say(`That is ${K.SHAPES[K.BUILD[s.i-1].want].toLowerCase()}: mean ${st.mean.toFixed(1)}, median ${st.median}.`+(s.i<3?' Next shape.':' The mean follows the tail.'))}
function preset(j){const s=S.build;s.n=K.SHOW[j].slice();check()}
/* 3. runners and walkers: move the walkers' typical time away from the runners' */
function runCounts(gap){const R=K.RUN,f=c=>[...Array(R.bars)].map((_,x)=>Math.round(R.peak*Math.exp(-Math.pow(x-c,2)/(2*R.sd*R.sd))));return{a:f(R.c0),b:f(R.c0+gap)}}
function drawRuns(){const s=S.runs,R=K.RUN,c2=runCounts(s.gap),tot=c2.a.map((v,i)=>v+c2.b[i]);bars(c2.a,{stack:c2.b,max:18,lab:i=>String(R.min0+R.step*i)});
 chip(s.done?'Two peaks, then one: done':s.two?'Now slide the walkers back into one peak':'Slide the walkers until there are two clear peaks',A.W/2,A.H*.08,{n:12,ok:s.done});
 chip('■ runners',A.W*.3,A.H*.92,{n:11,col:BAR});chip('■ walkers',A.W*.7,A.H*.92,{n:11,col:'#c2410c'});chip('minutes',A.W/2,A.H*.92,{n:10})}
function gapTo(g){const s=S.runs;s.gap=Math.max(0,Math.min(8,Math.round(g)));const c2=runCounts(s.gap),tot=c2.a.map((v,i)=>v+c2.b[i]);
 if(!s.two&&twoPeaks(tot)){s.two=true;A.sound.pop();return say(`Walkers' typical time ${K.RUN.min0+K.RUN.step*(K.RUN.c0+s.gap)} minutes: two groups, two peaks. That is bimodal.`)}
 if(s.two&&!s.done&&onePeak(tot)){s.done=true;A.sound.pop();return say('The groups overlap again, so the peaks merge into one hump.')}
 A.cv.setAttribute('aria-label',`Walkers' typical time ${K.RUN.min0+K.RUN.step*(K.RUN.c0+s.gap)} minutes. ${twoPeaks(tot)?'Two peaks.':onePeak(tot)?'One peak.':'A flat top, no clear dip.'}`);A.redraw()}
/* 4. match the context: four big shape buttons on the canvas */
const tiles=()=>{const w=(A.W-36)/2,h=Math.min(A.H*.16,62);return K.SHAPES.map((t,k)=>({k,t,x:12+(k%2)*(w+12),y:A.H*.52+Math.floor(k/2)*(h+10),w,h}))};
function drawContext(){const s=S.ctx,g=A.ctx;g.fillStyle=BG;g.fillRect(0,0,A.W,A.H);if(s.i>=K.CONTEXT.length){chip('All 6 data sets matched',A.W/2,A.H*.2,{ok:1});return}
 chip(`Data ${s.i+1} of ${K.CONTEXT.length}`,A.W/2,A.H*.1,{n:12});chip(K.CONTEXT[s.i].t,A.W/2,A.H*.28,{n:14});chip('What shape would its histogram have?',A.W/2,A.H*.41,{n:11});
 tiles().forEach(b=>{g.fillStyle=s.miss===b.k?'#fee2e2':'#ffffff';A.paint.rrect(b.x,b.y,b.w,b.h,10);g.fill();g.lineWidth=s.miss===b.k?3:1.4;g.strokeStyle=s.miss===b.k?BAD:RULE;g.stroke();
  g.fillStyle=INK;g.font=`800 ${fz(14)}${FF}`;g.textAlign='center';g.textBaseline='middle';g.fillText(b.t,b.x+b.w/2,b.y+b.h/2)})}
function contextIs(k){const s=S.ctx;if(s.i>=K.CONTEXT.length)return;const C=K.CONTEXT[s.i];
 if(k!==C.a){s.miss=k;A.sound.miss();return say(`Not ${K.SHAPES[k].toLowerCase()}. ${C.why}`)}s.miss=null;s.i++;A.sound.pop();say(`Yes, ${K.SHAPES[k].toLowerCase()}. ${C.why}`)}
/* 5. two unlabelled lines: which is the mean (or the median)? */
function spotLines(){const R=K.SPOT[S.spot.i],st=stats(R.n),meanFirst=S.spot.i%2===0;return meanFirst?[['A',st.mean,'mean'],['B',st.median,'median']]:[['A',st.median,'median'],['B',st.mean,'mean']]}
function drawSpot(){const s=S.spot;if(s.i>=K.SPOT.length){bars([0,0,0,0,0,0,0,0,0]);chip('All 4 lines found',A.W/2,A.H*.1,{ok:1});return}
 bars(K.SPOT[s.i].n);spotLines().forEach(([L,v],j)=>marker(v,9,j?'#7c3aed':'#b45309','line '+L,j));chip(`Chart ${s.i+1} of 4: which line is the ${K.SPOT[s.i].ask}?`,A.W/2,A.H*.08,{n:12,no:s.miss})}
function spotIs(L){const s=S.spot;if(s.i>=K.SPOT.length)return;const R=K.SPOT[s.i],st=stats(R.n),hit=spotLines().find(x=>x[0]===L),tail=st.g1>0?'right':'left';
 if(hit[2]!==R.ask){s.miss=true;A.sound.miss();return say(`Line ${L} is the ${hit[2]}. The tail is on the ${tail}, so the mean is pulled further ${tail} than the median.`)}
 s.miss=false;s.i++;A.sound.pop();say(`Yes: line ${L} is the ${R.ask}. The mean (${st.mean.toFixed(1)}) sits on the tail side of the median (${st.median}).`)}
function draw(){const k=stage();if(k==='chal'){bars([1,3,6,8,6,4,2,1,1]);chip('Challenge',A.W/2,A.H*.1,{ok:1});chip('Name the shape by its tail',A.W/2,A.H*.92,{n:12});return}
 ({name:drawName,build:drawBuild,runs:drawRuns,context:drawContext,spot:drawSpot})[k]();A.fx.draw(A.ctx)}
/* pointer: drag bars (2), drag the walkers' hump sideways (3); the other scenes are taps */
const within=(p,b)=>p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
function barAt(p,n){const P=area();return Math.max(0,Math.min(n-1,Math.floor((p.x-P.l)/((P.r-P.l)/n))))}
function down(p){const k=stage();hold=null;
 if(k==='context'){const b=tiles().find(t=>within(p,t));if(b)contextIs(b.k);return false}
 if(k==='spot'){const lines=spotLines(),near=lines.map(([L,v])=>[L,Math.abs(p.x-xAt(v,9))]).sort((a,b)=>a[1]-b[1])[0];if(near[1]<40)spotIs(near[0]);return false}
 if(k==='build'){hold={bar:barAt(p,9)};move(p);return true}
 if(k==='runs'){hold={x:p.x,g:S.runs.gap};return true}
 return false}
function move(p){const P=area();if(!hold)return;if(stage()==='build')setBar(hold.bar,(P.b-p.y)/(P.b-P.t)*9);
 else if(stage()==='runs')gapTo(hold.g+(p.x-hold.x)/((P.r-P.l)/K.RUN.bars))}
function reset(){epoch++;hold=null;for(const k in S)delete S[k];Object.assign(S,{name:{i:0,miss:null},build:{i:0,n:K.START.slice(),pick:4},runs:{gap:K.RUN.start,two:false,done:false},ctx:{i:0,miss:null},spot:{i:0,miss:false},hook:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();S.hook()}
/* buttons under the canvas do everything the canvas does */
function controls(){if(!pad)return;pad.innerHTML='';const k=stage(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='name'&&S.name.i<K.NAME.length)K.SHAPES.forEach((t,j)=>add(t,()=>nameIt(j)));
 if(k==='build'&&S.build.i<3){const b=S.build;add('◀ Bar',()=>{b.pick=Math.max(0,b.pick-1);say(`Bar ${b.pick+1} picked, height ${b.n[b.pick]}.`)},'Pick the bar to the left');add('Bar ▶',()=>{b.pick=Math.min(8,b.pick+1);say(`Bar ${b.pick+1} picked, height ${b.n[b.pick]}.`)},'Pick the bar to the right');
  add('Shorter',()=>setBar(b.pick,b.n[b.pick]-1),'Make the picked bar shorter');add('Taller',()=>setBar(b.pick,b.n[b.pick]+1),'Make the picked bar taller')}
 if(k==='runs'&&!S.runs.done){add('Walkers faster',()=>gapTo(S.runs.gap-1),'Make the walkers 3 minutes faster');add('Walkers slower',()=>gapTo(S.runs.gap+1),'Make the walkers 3 minutes slower')}
 if(k==='context'&&S.ctx.i<K.CONTEXT.length)K.SHAPES.forEach((t,j)=>add(t,()=>contextIs(j)));
 if(k==='spot'&&S.spot.i<K.SPOT.length){add('Line A',()=>spotIs('A'));add('Line B',()=>spotIs('B'))}}
const complete=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function open(i,ok){reset();say(K.DESC[i]);S.hook=complete(i,ok,K.DONE[i])}
function demo(i,acts,ms){steps[i].go();const mine=epoch;acts.forEach((f,j)=>setTimeout(()=>{if(mine===epoch)f()},ms*(j+1)))}
const steps=[
{h:'Name the shape',p:'A histogram\'s shape has a name. Symmetric: both sides match. Skewed: one side trails off in a long thin tail. Bimodal: two peaks. Tap the name for each chart.',
 predict:{q:'A chart peaks on the left and has a long tail on the right. What is it called?',opts:['Negative skew','Positive skew','Symmetric'],ans:1},task:'Name all 6 charts',
 show:()=>demo(0,K.NAME.map(R=>()=>nameIt(R.a)),450),go:()=>open(0,()=>S.name.i>=K.NAME.length)},
{h:'Build a skew',p:'Drag the bars up and down, or pick a bar and use the buttons. The red line is the mean and the green line is the median. Watch them as the tail grows.',
 predict:{q:'You stretch a long tail out to the right. Where does the mean go?',opts:['Left of the median','Right of the median','Exactly on the median'],ans:1},task:'Build all 3 shapes',
 show:()=>demo(1,[0,1,2].map(j=>()=>preset(j)),700),go:()=>open(1,()=>S.build.i>=K.BUILD.length)},
{h:'Two groups, two peaks',p:'Finishing times at a parkrun: runners in blue, walkers in orange. Drag the chart sideways, or use the buttons, to change how slow the walkers are.',
 predict:{q:'The walkers are much slower than the runners. What shape do all the times make?',opts:['One tall peak','Two peaks','A flat line'],ans:1},task:'Make two peaks, then one',
 show:()=>demo(2,[()=>gapTo(6),()=>gapTo(1)],700),go:()=>open(2,()=>S.runs.done)},
{h:'Real data, real shapes',p:'Think about what the data measures. Where would most values be? Is there a long tail, or two groups?',task:'Match all 6 data sets',
 show:()=>demo(3,K.CONTEXT.map(C=>()=>contextIs(C.a)),450),go:()=>open(3,()=>S.ctx.i>=K.CONTEXT.length)},
{h:'Spot the mean',p:'Each chart has two lines, A and B: one is the mean and one is the median. Use the tail to decide.',task:'Find all 4 lines',
 show:()=>demo(4,K.SPOT.map((R,i)=>()=>{const L=spotLines().find(x=>x[2]===R.ask);spotIs(L[0])}),500),go:()=>open(4,()=>S.spot.i>=K.SPOT.length)},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.hook()});
function ask(){qi++;const Q=K.QS[qi%K.QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 box.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=box.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>reply(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function reply(t,a){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),yes=t==='ok';if(yes)A.win();else A.sound.miss();
 const why=K.SLIP[t]||K.SLIP.other;fb.innerHTML=(yes?`✓ Yes: ${a}.`:'✗ '+why)+' <button type="button" class="lbtn sm">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(yes?'Yes.':why)}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:x=>{box.hidden=x.step!==5;pad.hidden=x.step===5;controls()},
 init:x=>{A=x;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Shape of a distribution lab buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up:()=>{hold=null}});controls()}}).start()})})();
