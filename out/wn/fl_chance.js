/* Flagship: Simple Chance Experiments (ages 9–10). Run real trials and compare what happened with what was expected:
   flip a coin 20 times (results wobble around half), test "a tail is due" after a streak, roll a dice 30 times against
   the expected 5 of each, watch the share of heads settle as trials grow to 1000, estimate a hidden bag from 40 pulls,
   and judge a suspicious dice from 60 rolls. Distinct from flagprob (building probabilities as fractions from equal
   parts) and flaglikely (likelihood words): this lab is about experimental results, sample size and fairness. */
(()=>{
VIS.reg('flagchance',c=>{let A,ctl,chal,qn=-1,resets=0;const E={};
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const mode=()=>['coin','streak','die','long','bag','fair','chal'][A.step];
// seeded generator so every run is a fair random stream but "Show me" replays the same trials
function seeded(s){return()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function txt(s,x,y,size,o){o=o||{};const g=A.ctx;g.font=`${o.bold===false?500:700} ${size}px system-ui,sans-serif`;g.textAlign=o.align||'center';g.textBaseline='middle';g.fillStyle=o.col||A.col.tx;g.fillText(s,x,y,o.max||A.W-10)}
function fresh(extra){resets++;for(const k in E)delete E[k];Object.assign(E,{rnd:seeded(9001+A.step*37+((extra&&extra.fixed)?0:resets*101)),n:0,counts:[0,0,0,0,0,0],last:null,hist:[],pick:null,check:()=>{}},extra||{});A.redraw()}
// ---------- one trial of each experiment ----------
function flip(){const h=E.rnd()<.5;E.counts[h?0:1]++;E.n++;E.last=h?'H':'T';if(E.hist.length<2000&&(E.n<=50||E.n%10===0))E.hist.push([E.n,E.counts[0]/E.n])}
function roll(){const r=E.rnd();let f;if(E.loaded){f=r<1/3?6:1+Math.floor((r-1/3)/(2/3)*5)}else f=1+Math.floor(r*6);E.counts[f-1]++;E.n++;E.last=f}
function pull(){const red=E.rnd()<E.red/10;E.counts[red?0:1]++;E.n++;E.last=red?'red':'blue'}
function run(k){const m=mode();for(let i=0;i<k;i++){if(m==='coin'||m==='long'||m==='streak')flip();else if(m==='bag')pull();else roll()}A.sound.tick();narrate();A.redraw();E.check()}
function narrate(){const m=mode(),n=E.n,C=E.counts;
 if(m==='coin')say(`${n} flips: ${C[0]} heads, ${C[1]} tails. Expected about ${n/2} heads.`);
 if(m==='streak')say(`After four heads, ${n} more flips: ${C[0]} heads (${n?Math.round(100*C[0]/n):0}%). The coin has no memory.`);
 if(m==='long')say(`${n} flips. Share of heads ${n?(C[0]/n).toFixed(3):'none yet'}. Expected 0.5.`);
 if(m==='die'||m==='fair')say(`${n} rolls. ` + C.map((v,i)=>`${i+1}: ${v}`).join(', ') + `. Expected ${+(n/6).toFixed(1)} of each.`);
 if(m==='bag')say(`${n} pulls: ${C[0]} red, ${C[1]} blue. Red share ${n?(C[0]/n).toFixed(2):'none yet'}.`)}
// ---------- drawing ----------
function bars(labels,vals,expect,x,y,w,h,cols){const g=A.ctx,C=A.col,top=Math.max(expect*1.6,...vals,1),bw=w/labels.length,tops=[];
 g.strokeStyle=C.ln;g.lineWidth=1;g.beginPath();g.moveTo(x,y+h);g.lineTo(x+w,y+h);g.stroke();
 labels.forEach((l,i)=>{const bh=h*vals[i]/top;g.fillStyle=cols[i%cols.length];g.fillRect(x+i*bw+bw*.18,y+h-bh,bw*.64,bh);tops.push(y+h-bh);txt(l,x+i*bw+bw/2,y+h+14,13,{bold:false})});
 if(expect>0){const ey=y+h-h*expect/top;g.setLineDash([6,5]);g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.moveTo(x,ey);g.lineTo(x+w,ey);g.stroke();g.setLineDash([]);txt(`- - - expected ${+expect.toFixed(1)}`,x+w/2,y+h+32,12,{col:C.mu,bold:false})}
 // counts sit on a panel-coloured pill so the dashed line never runs through a number
 labels.forEach((l,i)=>A.paint.label(String(vals[i]),x+i*bw+bw/2,tops[i]-12,{bg:C.pn,col:C.tx,font:'700 13px system-ui,sans-serif'}))}
function coinPic(x,y,r,face){const g=A.ctx,C=A.col;A.paint.ball(x,y,r,C.am);g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.arc(x,y,r,0,7);g.stroke();txt(face||'?',x,y+1,r*.9,{col:'#1f1300'})}
function diePic(x,y,s,f){const g=A.ctx,C=A.col;g.fillStyle=C.pn;A.paint.rrect(x-s/2,y-s/2,s,s,s*.18);g.fill();g.strokeStyle=C.tx;g.lineWidth=2.5;g.stroke();
 const P={1:[[0,0]],2:[[-1,-1],[1,1]],3:[[-1,-1],[0,0],[1,1]],4:[[-1,-1],[1,-1],[-1,1],[1,1]],5:[[-1,-1],[1,-1],[0,0],[-1,1],[1,1]],6:[[-1,-1],[1,-1],[-1,0],[1,0],[-1,1],[1,1]]}[f]||[];
 g.fillStyle=C.tx;P.forEach(([a,b])=>{g.beginPath();g.arc(x+a*s*.26,y+b*s*.26,s*.08,0,7);g.fill()});if(!f)txt('?',x,y,s*.5)}
function bagPic(x,y,w,h){const g=A.ctx,C=A.col;g.fillStyle=A.alpha(C.vi,.22);A.paint.rrect(x-w/2,y-h/2,w,h,w*.2);g.fill();g.strokeStyle=C.tx;g.lineWidth=2.5;g.stroke();txt('10 hidden',x,y-8,13);txt('counters',x,y+10,13)}
function draw(A){const{ctx:g,W,H,col:C}=A,m=mode(),n=E.n,K=E.counts;g.fillStyle=A.mix(C.pn,C.cy,C.dark?.06:.08);g.fillRect(0,0,W,H);
 const head=s=>txt(s,W/2,H*.07,A.narrow?14:16);const left=A.narrow?W*.5:W*.18,cy=A.narrow?H*.2:H*.42,chartX=A.narrow?W*.1:W*.36,chartY=A.narrow?H*.38:H*.18,chartW=A.narrow?W*.8:W*.58,chartH=A.narrow?H*.42:H*.6;
 if(m==='chal'){txt('Expected or just chance?',W/2,H*.4,A.narrow?16:19);txt('Answer below',W/2,H*.56,13,{col:C.mu,bold:false});A.fx.draw(g);return}
 if(m==='coin'){head('Flip the coin (tap it)');coinPic(left,cy,A.narrow?30:42,E.last);txt(`${n} flips`,left,cy+(A.narrow?46:64),14);bars(['Heads','Tails'],[K[0],K[1]],n/2,chartX,chartY,chartW,chartH,[C.am,C.cy])}
 if(m==='streak'){head('Four heads in a row… then?');['H','H','H','H'].forEach((f,i)=>coinPic(W*(.2+i*.12),H*.2,A.narrow?16:22,f));coinPic(W*.68,H*.2,A.narrow?16:22,'?');
  bars(['next = H','next = T'],[K[0],K[1]],n/2,chartX,A.narrow?H*.4:H*.36,chartW,A.narrow?H*.4:H*.44,[C.am,C.cy])}
 if(m==='die'||m==='fair'){head(m==='die'?'Roll the dice (tap it)':'Is this dice fair? (tap it)');diePic(left,cy,A.narrow?50:70,E.last);txt(`${n} rolls`,left,cy+(A.narrow?44:60),14);bars(['1','2','3','4','5','6'],K,n/6,chartX,chartY,chartW,chartH,[C.cy,C.gr,C.am,C.vi,C.pk,C.rd])}
 if(m==='bag'){head('Pull a counter, look, put it back');bagPic(left,cy,A.narrow?90:110,A.narrow?60:90);txt(E.last?`last: ${E.last}`:'tap the bag',left,cy+(A.narrow?44:62),13,{col:C.mu,bold:false});bars(['red','blue'],[K[0],K[1]],0,chartX,chartY,chartW,chartH,[C.rd,C.cy])}
 if(m==='long'){head('Share of heads as flips pile up');const x0=W*.12,x1=W*.94,y0=H*.18,y1=H*.82,X=t=>x0+(x1-x0)*Math.log10(Math.max(1,t))/3,Y=p=>y1-(y1-y0)*p;
  g.strokeStyle=C.ln;g.lineWidth=1;g.strokeRect(x0,y0,x1-x0,y1-y0);[1,10,100,1000].forEach(t=>txt(String(t),X(t),y1+14,12,{bold:false}));[0,.5,1].forEach(p=>txt(String(p),x0-14,Y(p),12,{bold:false}));
  g.setLineDash([6,5]);g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.moveTo(x0,Y(.5));g.lineTo(x1,Y(.5));g.stroke();g.setLineDash([]);
  g.strokeStyle=C.am;g.lineWidth=3;g.beginPath();E.hist.forEach(([t,p],i)=>{i?g.lineTo(X(t),Y(p)):g.moveTo(X(t),Y(p))});g.stroke();
  txt(`${n} flips · share ${n?(K[0]/n).toFixed(3):'–'}`,W/2,H*.93,14)}
 A.fx.draw(g)}
// ---------- buttons and taps ----------
function controls(){if(!ctl)return;ctl.innerHTML='';const m=mode();if(m==='chal')return;const b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(m==='coin'){b('Flip 1',()=>run(1),'Flip the coin once');b('Flip 10',()=>run(10),'Flip the coin ten times')}
 if(m==='streak'){b('Flip next 10',()=>run(10),'Flip the next coin ten times');b('Flip next 100',()=>run(100),'Flip the next coin a hundred times')}
 if(m==='die'||m==='fair'){b('Roll 1',()=>run(1),'Roll the dice once');b('Roll 10',()=>run(10),'Roll the dice ten times')}
 if(m==='long'){b('+10 flips',()=>run(10));b('+100 flips',()=>run(100));b('+500 flips',()=>run(500))}
 if(m==='bag'){b('Pull 1',()=>run(1),'Pull one counter and put it back');b('Pull 10',()=>run(10),'Pull ten counters, one at a time');[3,5,7].forEach(k=>b(`${k} red`,()=>guess(k),`Guess ${k} of the 10 are red`))}
 if(m==='fair'){b('Looks fair',()=>verdict(0));b('Looks unfair',()=>verdict(1))}}
function guess(k){if(E.n<40){say(`Pull at least 40 times first: ${E.n} so far. A few pulls can mislead.`);A.sound.miss();return}E.pick=k;
 const share=E.counts[0]/E.n;say(k===7?`Yes: red came up ${(share*100).toFixed(0)}% of the time; 7 in 10 is 70%, the closest choice.`:`Red came up ${(share*100).toFixed(0)}% of pulls. ${k} in 10 would be ${k*10}%: too far off.`);if(k!==7)A.sound.miss();E.check()}
function verdict(v){if(E.n<60){say(`Roll at least 60 times first: ${E.n} so far. Ten rolls is too few to judge.`);A.sound.miss();return}E.pick=v;
 say(v?`Sixes: ${E.counts[5]} out of ${E.n}, about double the expected ${E.n/6}. Probably unfair.`:`Sixes came ${E.counts[5]} times, but a fair dice gives about ${E.n/6}. That gap is too big for luck.`);if(!v)A.sound.miss();E.check()}
function down(p){const m=mode();if(m==='chal')return false;
 if(m==='long'){run(100);return true}
 const near=Math.hypot(p.x-(A.narrow?A.W*.5:A.W*.18),p.y-(A.narrow?A.H*.2:A.H*.42))<(A.narrow?70:90);
 if(m==='streak'||near){run(1);return true}return false}
const doneIf=(i,ok,msg)=>()=>{if(A.step===i&&!A.isDone&&A.pred[i]!=null&&ok())A.done(msg()+A.reveal(i))};
function replay(i,f){steps[i].go();f();A.redraw();E.check()}
const steps=[
{h:'Flip a coin 20 times',p:'A fair coin has two equally likely outcomes, so out of 20 flips we expect about 10 heads. Run the experiment and record the results in the chart.',
 predict:{q:'In 20 flips of a fair coin you will get…',opts:['exactly 10 heads','close to 10 heads, but often not exactly 10','more tails, because tails is luckier'],ans:1},
 task:'Flip the coin 20 times',show:()=>replay(0,()=>{for(let i=0;i<20;i++)flip();narrate()}),
 go:()=>{fresh();say('Tap the coin or press Flip.');E.check=doneIf(0,()=>E.n>=20,()=>`${E.counts[0]} heads in ${E.n} flips: ${E.counts[0]===E.n/2?'spot on this time, but it will not happen every time':'not exactly '+E.n/2+', and that is normal'}. Results wobble around the expected ${E.n/2}.`)}},
{h:'Is a tail "due"?',p:'The coin just landed heads four times in a row. Many people feel a tail is now due. Test it: flip the next coin 100 times and count.',
 predict:{q:'After four heads in a row, the next flip is…',opts:['more likely to be tails','still an even chance of heads or tails','more likely to be heads again'],ans:1},
 task:'Run 100 next flips',show:()=>replay(1,()=>{for(let i=0;i<100;i++)flip();narrate()}),
 go:()=>{fresh();say('Four heads so far. Flip the next coin.');E.check=doneIf(1,()=>E.n>=100,()=>`${E.counts[0]} of 100 next flips were heads. The coin does not remember the streak.`)}},
{h:'Roll a dice 30 times',p:'A fair dice has six equally likely faces. In 30 rolls we expect about 30 ÷ 6 = 5 of each number. The dashed line shows 5.',
 predict:{q:'Compared with rolling a 1, rolling a 6 is…',opts:['harder, because 6 is the biggest','just as likely','easier, because 6 is lucky'],ans:1},
 task:'Roll the dice 30 times',show:()=>replay(2,()=>{for(let i=0;i<30;i++)roll();narrate()}),
 go:()=>{fresh();say('Tap the dice or press Roll.');E.check=doneIf(2,()=>E.n>=30,()=>`Counts: ${E.counts.join(', ')}. Each bar wobbles around 5; no face is special.`)}},
{h:'More trials, steadier share',p:'Ten flips can give 7 heads (0.7). As the number of trials grows, the share of heads settles close to the expected 0.5.',
 predict:{q:'Which is more likely to give a share of heads close to 0.5?',opts:['10 flips','1000 flips','both are the same'],ans:1},
 task:'Flip until you reach 1000',show:()=>replay(3,()=>{for(let i=0;i<1000;i++)flip();narrate()}),
 go:()=>{fresh();say('Press +100 or tap the graph to add flips.');E.check=doneIf(3,()=>E.n>=1000,()=>`After ${E.n} flips the share is ${(E.counts[0]/E.n).toFixed(3)}: much closer to 0.5 than the early wobble.`)}},
{h:'What is in the bag?',p:'This bag has 10 counters, red or blue, but you cannot see in. Pull one, note its colour, put it back. Many pulls let you estimate what is inside.',
 predict:{q:'After a few pulls, the best way to estimate the bag is to…',opts:['trust the first 3 pulls','use the share of red over many pulls','guess half red, half blue'],ans:1},
 task:'Pull 40+ times, then choose how many are red',show:()=>replay(4,()=>{for(let i=0;i<40;i++)pull();guess(7)}),
 go:()=>{fresh({red:7,fixed:1});say('Tap the bag or press Pull.');E.check=doneIf(4,()=>E.pick===7,()=>`Red was ${Math.round(100*E.counts[0]/E.n)}% of ${E.n} pulls, so 7 red out of 10 fits best. (The bag really has 7 red.)`)}},
{h:'Fair or not?',p:'Someone says this dice is fine. In 60 fair rolls we expect about 10 sixes. Roll it 60 times and compare with what you expected.',
 predict:{q:'If 6 comes up 20 times in 60 rolls, the dice is…',opts:['surely fair: anything can happen','probably unfair: about 10 were expected','unfair after only 6 rolls'],ans:1},
 task:'Roll 60 times, then judge it',show:()=>replay(5,()=>{for(let i=0;i<60;i++)roll();verdict(1)}),
 go:()=>{fresh({loaded:true,fixed:1});say('Tap the dice or press Roll.');E.check=doneIf(5,()=>E.pick===1,()=>`${E.counts[5]} sixes against an expected 10: too many to be luck. More rolls would make the case stronger.`)}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>E.check()});
// each wrong choice is tagged with the slip it shows
const QS=[
 ['A fair coin is flipped 50 times. About how many heads do you expect?',[['25','ok'],['50','all'],['2','outcomes']]],
 ['A fair dice is rolled 60 times. About how many 3s do you expect?',[['10','ok'],['3','outcomes'],['30','half']]],
 ['After five tails in a row, the next flip of a fair coin is…',[['still an even chance','ok'],['more likely heads','due'],['more likely tails','hot']]],
 ['You flip a coin 10 times and get 7 heads. What can you say?',[['It could still be fair: small samples wobble','ok'],['It must be unfair','small'],['Heads will keep winning','hot']]],
 ['Which tells you more about whether a dice is fair?',[['600 rolls','ok'],['12 rolls','small'],['Both tell you the same','small']]],
 ['A bag gives 18 red in 30 pulls (put back each time). Best estimate of the share of red?',[['18 out of 30, about 3 in 5','ok'],['half, since there are 2 colours','outcomes'],['all red, since red came first','small']]]];
function why(t){let m='Expected = number of trials × chance of the outcome.';
 if(t==='all')m='That counts every flip as heads. Heads is 1 of 2 equal outcomes, so expect half: 50 × ½ = 25.';
 if(t==='outcomes')m='That uses the number of outcomes, not the chances. Equal outcomes do not mean the colours or faces are 50-50; multiply trials by the chance.';
 if(t==='half')m='A dice has 6 faces, not 2. Each face is 1 of 6, so 60 × 1/6 = 10.';
 if(t==='due')m='The coin has no memory. Past flips do not change the next one: it is still 1 in 2.';
 if(t==='hot')m='A streak does not make a side "hot". Each flip is still 1 in 2.';
 if(t==='small')m='A few trials can be far from expected just by chance. Many trials give a steadier, more trustworthy result.';
 return m}
function ask(){qn++;const Q=QS[qn%QS.length],turn=(qn+1)%3,opts=[...Q[1].slice(turn),...Q[1].slice(0,turn)];
 chal.innerHTML=`<p><b>${Q[0]}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');opts.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>mark(t)});say('Challenge: '+Q[0]);A.redraw()}
function mark(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok)A.win();else A.sound.miss();fb.innerHTML=(ok?'✓ Right. Expected is a guide; real results wobble around it.':'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Experiment controls'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down});controls()}});
A.start()})})();
