/* Data for flaghardpart (practise the part I find hard, ages 10–11). Ana's times-table quiz uses the England
   multiplication tables check as the anchor for "slow": that check allows 6 seconds per question (STA 2022), so a right
   answer that took longer is not yet fluent. Leo's subtraction slips follow the "smaller-from-larger" bug found in
   column subtraction (Brown and Burton 1978; VanLehn 1990): in each column he takes the smaller digit from the larger
   instead of exchanging a ten. The five-day race is a picture of the idea (more tries on the weak facts fix them
   sooner), not real data. Slips it targets: only wrong answers count as hard; redo the whole test; the whole topic is
   the hard part; easy practice feels good so it must be working; once fixed, never look again. */
const HARDPART=(()=>{
const SLOW=6;
const QUIZ=[{q:'2 × 7',a:14,g:14,t:2},{q:'5 × 8',a:40,g:40,t:2},{q:'6 × 7',a:42,g:42,t:11},{q:'10 × 6',a:60,g:60,t:1},{q:'7 × 8',a:56,g:54,t:9},
 {q:'3 × 7',a:21,g:21,t:3},{q:'8 × 6',a:48,g:48,t:12},{q:'4 × 8',a:32,g:32,t:3},{q:'8 × 7',a:56,g:54,t:10},{q:'2 × 6',a:12,g:12,t:2}];
const hard=r=>r.g!==r.a||r.t>SLOW;
const SUMS=[{a:58,b:23,leo:35},{a:72,b:38,leo:46},{a:96,b:41,leo:55},{a:51,b:24,leo:33},{a:83,b:47,leo:44}];
const STEPS=['Lining up the columns','Exchanging a ten','Taking away the tens'];
const STEPBAD=['The columns are lined up: tens under tens, ones under ones. Look at the ones column.',
 '',
 'The tens were taken away correctly from what Leo wrote. The slip came first, in the ones: he needed to exchange a ten.'];
const LEOQ={q:'So what should Leo practise next?',opts:['Sums that need an exchange','20 more mixed sums','Easy sums with no exchange'],ans:0,
 bad:{1:'Mixed sums spend most tries on the parts Leo can already do. His slip is one step: exchanging.',2:'He already gets those right. Practise the step that goes wrong: sums that need an exchange.'}};
const HARD=['6 × 7','7 × 8','8 × 6','8 × 7'],EASY=['2 × 7','5 × 8','10 × 6','3 × 7'],SLOTS=10,NEED=7;
const DAYS=5,START=[45,35,40,30],GAIN=10;
const PLANS=[{n:'Plan A: the whole quiz again',hard:4},{n:'Plan B: mostly the hard facts',hard:8}];
const RACEQ={q:'Where did most of Plan A\u2019s tries go?',opts:['Facts Ana already knew','The hard facts'],ans:0,
 bad:'Plan A gave only 4 of its 10 tries a day to the hard facts. The other 6 went on facts that were already fluent.'};
const RECHECK=[{q:'6 × 7',g:42,a:42,t:2},{q:'7 × 8',g:56,a:56,t:3},{q:'8 × 6',g:48,a:48,t:9},{q:'8 × 7',g:56,a:56,t:2},{q:'7 × 9',g:56,a:63,t:8}];
const BINS=['Keep practising','Easy now: check now and then'];
const DESC=['Ana\u2019s quiz: 10 times-table questions, each with her answer and how many seconds it took. Tap a row to mark it as hard.',
 'Leo\u2019s column subtraction: 5 sums, with his answers. Find the step where each wrong sum went wrong.',
 'An empty plan with 10 practice slots, and cards for Ana\u2019s facts. Tap cards to fill the slots.',
 'Two plans side by side, each with bars for Ana\u2019s 4 hard facts. Tap Next day to practise.',
 'A week later: 5 new results. Put each card in Keep practising or Easy now.'];
const DONE=['Wrong answers and slow right answers are both hard parts: 4 of the 10.',
 'All 3 wrong sums slipped at the same step: exchanging a ten. That is Leo\u2019s hard part.',
 'Most of the plan is on the hard part, and every hard fact gets a go.',
 'Plan B fixed the hard facts sooner. Plan A spent most of its tries on facts Ana already knew.',
 'The hard part moves as you learn: keep what is still slow or wrong, and check the rest now and then.'];
const TXT=['Ana got 8 out of 10. A right answer that took more than 6 seconds is slow: she had to work it out. Mark every hard one, then check.',
 'Leo got 3 sums wrong. Is all of subtraction hard for him, or one step? Tap the step that went wrong in each wrong sum.',
 'Ana has 10 tries for tomorrow. Build a plan that spends them where they help. Try "Same quiz again" too and compare.',
 'Same 10 tries a day, two plans. Tap Next day 5 times and watch the hard facts.',
 'Practice changes the hard part. Sort the new results: what still needs work, and what is easy now?'];
const QS=[{q:'Mia got every question right, but 3 took her a long time. Which should she practise?',a:'The 3 slow ones',o:[['None: they were all right','onlywrong'],['The whole test again','redo']]},
 {q:'Sam spends practice time redoing the questions he got right. What is the problem?',a:'He is practising what he already knows',o:[['Nothing: practice is practice','easyfeel'],['He should do harder new topics instead','avoid']]},
 {q:'Jo gets long division wrong every time at the subtract step. What should Jo practise?',a:'The subtract step',o:[['All of division again from the start','whole'],['Nothing: division is just hard','avoid']]},
 {q:'A fact was hard last week but is now quick and right. What now?',a:'Check it now and then',o:[['Keep practising it every day','forever'],['Never look at it again','drop']]},
 {q:'Which plan uses 10 tries best, if 2 facts are hard?',a:'Most tries on the 2 hard facts',o:[['1 try on each of 10 facts','redo'],['10 tries on facts already fluent','easyfeel']]},
 {q:'How can you tell which part you find hard?',a:'Look for wrong answers and slow ones',o:[['Look only at the score','onlywrong'],['Pick the topic you like least','avoid']]}];
const END=['Mark wrong and slow answers','Find the step that goes wrong','Spend most tries on the hard part','Check again: the hard part moves'];
return{SLOW,QUIZ,hard,SUMS,STEPS,STEPBAD,LEOQ,HARD,EASY,SLOTS,NEED,DAYS,START,GAIN,PLANS,RACEQ,RECHECK,BINS,DESC,DONE,TXT,QS,END}})();
/* Canvas drawing helpers for flaghardpart: background, text, cards, the title pill and answer chips. */
const HARDPART_DRAW=A=>{const INK='#0f172a',YES='#047857',NO='#b91c1c',LINE='#64748b',F='px system-ui,sans-serif',z=n=>A.narrow?n:Math.round(n*1.12);
function bg(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#ede9fe',A.col.dark?.07:.45);g.fillRect(0,0,A.W,A.H)}
function txt(t,x,y,n,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${z(n)}${F}`;g.fillStyle=o.col||INK;g.textAlign=o.al||'left';g.textBaseline='middle';g.fillText(t,x,y)}
function card(r,o){o=o||{};const g=A.ctx;g.fillStyle=o.fill||'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,o.rad||9);g.fill();g.lineWidth=o.lw||1.4;g.strokeStyle=o.edge||LINE;g.stroke()}
function title(t,o){o=o||{};const g=A.ctx;let n=z(13);g.font=`800 ${n}${F}`;while(g.measureText(t).width>A.W-36&&n>9){n--;g.font=`800 ${n}${F}`}
 const w=g.measureText(t).width+24,h=n+15,y=A.H*.065;card({x:(A.W-w)/2,y:y-h/2,w,h},{rad:12,lw:o.ok||o.no?3:1.5,edge:o.ok?YES:o.no?NO:LINE});
 g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y+1)}
function opts(labels,y){const k=labels.length,gap=7,w=Math.min(230,(A.W-14-gap*(k-1))/k),h=Math.min(A.H*.12,50),x0=(A.W-(w*k+gap*(k-1)))/2;
 return labels.map((t,i)=>({i,t,x:x0+i*(w+gap),y:y==null?A.H-h-8:y,w,h}))}
function optDraw(r,bad){card(r,{fill:bad?'#fee2e2':'#ffffff',edge:bad?NO:LINE,lw:bad?3:1.5,rad:12});const g=A.ctx;let n=z(13);g.font=`800 ${n}${F}`;
 while(g.measureText(r.t).width>r.w-10&&n>8){n--;g.font=`800 ${n}${F}`}g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(r.t,r.x+r.w/2,r.y+r.h/2+1)}
return{bg,txt,card,title,opts,optDraw}};
