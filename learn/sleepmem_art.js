/* Data, text helpers and drawings for flagsleepmem (sleep helps learning, ages 8–9; Diekelmann and Born 2010 and Rasch
   and Born 2013: sleep after learning helps the brain keep new memories; Wilhelm et al. 2013: children gain at least as
   much from sleep as adults; Sadeh, Gruber and Raviv 2003: one hour less sleep a night made 9–12 year olds' attention
   and memory worse; Paruthi et al. 2016 (AASM consensus): ages 6–12 need 9 to 12 hours; NHS: no screens in the hour
   before bed). Slips it targets: the brain is switched off in sleep, more late practice beats sleep, sleep is wasted
   study time, bedtime maths (counting the hours back from waking), and screens or games right before lights out. */
const SLM=(()=>{
const box=(x,y,w,h)=>({x,y,w,h}),inside=(p,b)=>!!b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
function pen(A,K){const px=n=>Math.round(A.narrow?n:n*1.15);
 function say(s,x,y,n,o){o=o||{};const g=A.ctx;g.font=`${o.b||800} ${px(n)}px system-ui,sans-serif`;g.fillStyle=o.c||K.ink;g.textAlign='center';g.textBaseline='middle';
  const rows=[];let cur='';String(s).split(' ').forEach(w=>{const t=cur?cur+' '+w:w;if(o.w&&g.measureText(t).width>o.w&&cur){rows.push(cur);cur=w}else cur=t});rows.push(cur);
  const lh=px(n)*1.2;rows.forEach((t,i)=>g.fillText(t,x,y+(i-(rows.length-1)/2)*lh))}
 function card(b,fill,mark){const g=A.ctx;g.fillStyle=mark==='ok'?'#d1fae5':mark==='ko'?'#fee2e2':fill||'#ffffff';A.paint.rrect(b.x,b.y,b.w,b.h,Math.min(10,b.h/3));g.fill();
  g.lineWidth=mark?3:1.5;g.strokeStyle={ok:K.ok,ko:K.ko,sel:K.sel}[mark]||K.rim;g.stroke()}
 function cells(n,cols,a,gap){gap=gap||8;const rows=Math.ceil(n/cols),w=(a.w-gap*(cols-1))/cols,h=(a.h-gap*(rows-1))/rows;
  return Array.from({length:n},(_,i)=>box(a.x+(i%cols)*(w+gap),a.y+Math.floor(i/cols)*(h+gap),w,h))}
 return{say,card,cells}}
/* clock helpers: hours as numbers from midday (8.5 = 8:30 pm, 19 = 7:00 am next day) */
const clock=h=>{const t=((h+12)%24+24)%24,hh=Math.floor(t),mm=Math.round((t-hh)*60);return `${hh%12||12}:${mm<10?'0':''}${mm} ${hh<12?'am':'pm'}`};
const hrs=h=>{const w=Math.floor(h),half=h-w>=.5;return w+(half?'½':'')};
/* 1. what was practised today (the night shift stores one every 2 hours of sleep in this picture) */
const TODAY=['7 × 8 = 56','spell: because','a new piano tune','new word: orbit'];
/* 2. Ava sleeps at 8:30 pm; Ben does the same spellings again until 10:30 pm; both wake at 7:00 am */
const WORDS=['because','friend','people','could','where'];
const KIDS=[{n:'Ava',bed:8.5,c:'#7c3aed',say:'Practised, then slept at 8:30 pm'},{n:'Ben',bed:10.5,c:'#c2410c',say:'Did the same page again until 10:30 pm'}];
/* 3. pick a bedtime for each waking time (ages 6–12 need 9 to 12 hours) */
const WAKE=[19,18.5,18];
/* 4. helps learning stick, or gets in the way? k 0 = helps, 1 = gets in the way; s = slip */
const HAB=[{t:'Practise, then sleep',k:0,s:'helps'},{t:'Stay up late doing the same page again',k:1,s:'late'},{t:'Go to bed at the same time most nights',k:0,s:'same'},
 {t:'Play a tablet game in bed',k:1,s:'screen'},{t:'A quick check in the morning',k:0,s:'check'},{t:'Skip sleep to practise more before a test',k:1,s:'skip'},
 {t:'Practise a little every day',k:0,s:'little'},{t:'Think sleep is wasted time',k:1,s:'waste'}];
/* 5. plan tonight: fixed events and open slots (lights out 8:30 pm) */
const SLOT=[{t:'4:30 pm'},{t:'5:30 pm',fix:'Dinner'},{t:'6:00 pm'},{t:'7:00 pm'},{t:'7:30 pm',fix:'Bath and teeth'},{t:'8:00 pm'},{t:'8:30 pm',fix:'Lights out'},{t:'9:00 pm',late:1}];
const JOBS=[{t:'Practise spellings',sh:'Spellings'},{t:'Play outside',sh:'Play'},{t:'Tablet game',sh:'Tablet',screen:1},{t:'Story with a grown-up',sh:'Story'}];
const INTRO=['Today you practised 4 things. Drag the moon across the night and watch what your brain does while you sleep.',
 'Ava and Ben practised the same 5 spellings. Drag the moon across the night. Whose shelf fills up?',
 'Drag the bed to a bedtime, or use the buttons. Most children your age need 9 to 12 hours of sleep.',
 'Does it help learning stick, or get in the way? Drag each card to a tray, or tap a card then a tray.',
 'Plan tonight. Drag each thing to a free time, or tap it. Lights out is at 8:30 pm.','Challenge.'];
const WELL=['Your brain does not switch off at night. While you sleep, it stores what you practised, so it is still there tomorrow.',
 'Ben did more of the same, but he slept less. Sleep gave Ava more time to store her spellings, and she woke up fresh.',
 'Count back from when you wake up. Waking at 7:00 am, bed at 10:00 pm gives 9 hours: the least most children your age need.',
 'Practise, then sleep. A regular bedtime and a quick morning check help. Late nights, screens in bed and skipping sleep get in the way.',
 'Finish practice before bedtime, and stop screens an hour before lights out. Then let sleep do its job.'];
const QS=[{q:'Is your brain switched off when you sleep?',a:'No, it stores what you practised',o:[['Yes, it rests and does nothing','off'],['Only on school nights','school']]},
 {q:'It is bedtime. Mo has practised his tables. What helps him remember them best?',a:'Go to sleep now',o:[['Do one more hour of the same tables','late'],['Play a game in bed to relax','screen']]},
 {q:'Lia wakes at 7:00 am and needs 10 hours of sleep. When should she go to bed?',a:'9:00 pm',o:[['10:00 pm','count'],['11:00 pm','count2']]},
 {q:'There is a test tomorrow. What is the best plan?',a:'Practise today, then get a good sleep',o:[['Stay up very late to practise','skip'],['Do not practise, just sleep','nopractise']]},
 {q:'Sam’s tablet game ends just as the lights go out. What might happen?',a:'He may take longer to fall asleep',o:[['He will fall asleep faster','screen'],['Nothing at all','screen']]},
 {q:'Is sleep wasted time for learning?',a:'No, sleep helps you keep what you learned',o:[['Yes, you learn nothing asleep','waste'],['Yes, so sleep as little as you can','skip']]},
 {q:'Does sleep mean you do not need to practise?',a:'No, sleep stores practice, it does not replace it',o:[['Yes, sleep teaches you new things','nopractise'],['Yes, just sleep more','nopractise']]}];
/* ---------- drawings ---------- */
function moon(g,x,y,r){g.save();g.fillStyle='#fde68a';g.beginPath();g.arc(x,y,r,0,7);g.fill();g.fillStyle='#1e1b4b';g.beginPath();g.arc(x+r*.45,y-r*.25,r*.85,0,7);g.fill();g.restore()}
function sky(g,b,t){g.save();g.fillStyle='#1e1b4b';g.fillRect(b.x,b.y,b.w,b.h);g.fillStyle='#e0e7ff';for(let i=0;i<14;i++){const x=b.x+((i*73)%97)/97*b.w,y=b.y+((i*37)%41)/41*b.h*.8+3;g.fillRect(x,y,2,2)}
 g.fillStyle='rgba(253,230,138,.25)';g.fillRect(b.x,b.y,b.w*t,b.h);g.restore()}
function bed(g,x,y,s,col,awake){g.save();g.fillStyle='#92400e';g.fillRect(x-s*.6,y,s*1.2,s*.14);g.fillRect(x-s*.6,y-s*.25,s*.08,s*.5);g.fillStyle='#e0e7ff';g.fillRect(x-s*.5,y-s*.12,s*1.05,s*.14);
 g.fillStyle=col;g.beginPath();g.arc(x-s*.36,y-s*.18,s*.14,0,7);g.fill();g.fillStyle='#93c5fd';g.fillRect(x-s*.2,y-s*.2,s*.72,s*.16);
 g.strokeStyle='#ffffff';g.lineWidth=1.6;g.beginPath();if(awake){g.arc(x-s*.4,y-s*.2,s*.03,0,7);g.moveTo(x-s*.28,y-s*.2);g.arc(x-s*.31,y-s*.2,s*.03,0,7)}else{g.moveTo(x-s*.44,y-s*.2);g.lineTo(x-s*.38,y-s*.2);g.moveTo(x-s*.34,y-s*.2);g.lineTo(x-s*.28,y-s*.2)}g.stroke();
 if(!awake){g.fillStyle='#1e3a8a';g.font=`800 ${Math.round(s*.18)}px system-ui,sans-serif`;g.fillText('z z',x-s*.1,y-s*.42)}g.restore()}
function shelf(g,b){g.save();g.fillStyle='#fef3c7';g.fillRect(b.x,b.y,b.w,b.h);g.fillStyle='#92400e';g.fillRect(b.x,b.y+b.h-6,b.w,6);g.restore()}
return{box,inside,pen,clock,hrs,TODAY,WORDS,KIDS,WAKE,HAB,SLOT,JOBS,INTRO,WELL,QS,moon,sky,bed,shelf}})();
