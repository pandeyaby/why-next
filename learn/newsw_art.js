/* Data, words and drawings for flagnewsworry (news and pictures that worry me, ages 10–11). Basis: Childline "Worried
   about the world" and BBC Newsround "If you are upset by the news" (it is normal to feel worried; take a break from
   the news; talk to an adult you trust; get facts from a trusted source); Holman, Garfin and Silver 2014 (PNAS): hours
   of repeated coverage after the Boston Marathon bombing went with more acute stress than being there; Pfefferbaum et
   al. 2001: more TV coverage, more stress symptoms in children far from the event; AAP and APA advice to families:
   limit exposure, ask what the child saw, give facts and reassurance, "look for the helpers" (Fred Rogers); Full Fact
   and BBC Reality Check: old photos and videos are often reshared as new. Slips it targets: worry means something is
   wrong with me; watching more will calm me; pretending to be fine or keeping it secret; trusting comments and rumours;
   assuming a shared picture is new; passing a scary clip on to a younger child; scrolling at bedtime. */
const NWS=(()=>{
const R=(x,y,w,h)=>({x,y,w,h}),on=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function brush(A,C){const fs=n=>Math.round(A.narrow?n:n*1.12);
 function line(s,x,y,n,o){o=o||{};const g=A.ctx;g.font=`${o.b||800} ${fs(n)}px system-ui,sans-serif`;g.fillStyle=o.c||C.ink;g.textAlign='center';g.textBaseline='middle';
  const out=[];let cur='';String(s).split(' ').forEach(w=>{const t=cur?cur+' '+w:w;if(o.w&&g.measureText(t).width>o.w&&cur){out.push(cur);cur=w}else cur=t});out.push(cur);
  const lh=fs(n)*1.2;out.forEach((t,i)=>g.fillText(t,x,y+(i-(out.length-1)/2)*lh))}
 function chip(r,fill,how){const g=A.ctx;g.fillStyle=how==='ok'?'#d1fae5':how==='ko'?'#fee2e2':fill||'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,Math.min(10,r.h/3));g.fill();
  g.lineWidth=how?3:1.5;g.strokeStyle={ok:C.ok,ko:C.ko,sel:C.sel,hot:C.warm}[how]||C.rim;g.stroke()}
 function lay(n,cols,a,gap){gap=gap||7;const rows=Math.ceil(n/cols),w=(a.w-gap*(cols-1))/cols,h=(a.h-gap*(rows-1))/rows;
  return Array.from({length:n},(_,i)=>R(a.x+(i%cols)*(w+gap),a.y+Math.floor(i/cols)*(h+gap),w,h))}
 return{line,chip,lay}}
/* 1. how worry can feel after a news video; w 1 = a worry sign */
const SIGNS=[{t:'My tummy feels tight',w:1},{t:'I want to play outside',w:0},{t:'My heart beats fast',w:1},{t:'The picture keeps popping into my head',w:1},
 {t:'I feel full after lunch',w:0},{t:'I keep thinking “what if?”',w:1}];
/* 2. an autoplay feed after a flood video; up = how much each clip adds to the worry meter */
const FEED=[{t:'Flood news: water in the streets',up:2},{t:'The same flood, filmed again',up:2},{t:'Comment: “It will happen HERE next!”',up:3},
 {t:'Rumour: “A dam is about to burst!”',up:3},{t:'The first video, again',up:2},{t:'Scarier music added to the clip',up:2}];
const TOP=14;
/* 3. say it to a grown-up: three gaps; chips with slot (right gap) or s (the slip) */
const GAP=['I saw…','It made me feel…','I want to know…'];
const BITS=[{t:'a video about a big flood',slot:0},{t:'nothing, I am fine',s:'pretend'},{t:'worried, and my tummy is tight',slot:1},
 {t:'can I watch more of it?',s:'more'},{t:'could it happen here?',slot:2},{t:'please don’t tell anyone',s:'secret'}];
/* 4. Rami's questions and the facts his grown-up checks with him (FACT order is shuffled on screen) */
const QN=['Is it near us?','Is anyone helping?','Is that photo from today?','Could it flood our house?'];
const FACT=[{t:'Rescue teams, doctors and volunteers are there',q:1},{t:'That photo is from 2019. Someone shared it again',q:2},
 {t:'The map shows it is in another country, far away',q:0},{t:'Our area gets flood warnings, and we have a plan',q:3}];
/* 5. after a worrying story: helps (0) or makes the worry bigger (1) */
const MOVES=[{t:'Close the video',k:0,s:'close'},{t:'Watch it again and again',k:1,s:'more'},{t:'Tell a grown-up you trust',k:0,s:'tell'},
 {t:'Pretend you are fine',k:1,s:'pretend'},{t:'Check the facts with a grown-up',k:0,s:'check'},{t:'Look for more pictures at bedtime',k:1,s:'bed'},
 {t:'Do something calm, like drawing or a walk',k:0,s:'calm'},{t:'Send the scary clip to a younger cousin',k:1,s:'share'}];
const START=['Rami has just watched a news video about a flood. Tap each thing that is a sign of worry.',
 'The next video plays by itself. Swipe up on the phone to watch more, or drag the phone to the table to put it down.',
 'Help Rami tell his dad. Drag a card into each gap, or tap a card then a gap.',
 'Rami has questions. Drag each question to the fact that answers it, or tap a question then a fact.',
 'Does it help, or make the worry bigger? Drag each card to a box, or tap a card then a box.','Challenge.'];
const LEARNT=['Tight tummy, fast heart, a picture that keeps coming back, “what if?” thoughts: that is worry. Lots of people feel it after scary news.',
 'Every extra video pushes the worry meter up. Putting the phone down stops it growing. Next: talk to someone.',
 'Rami said what he saw, how he felt and what he wants to know. No pretending.',
 'Checking facts with a grown-up answered his “what if?”: far away, helpers there, an old photo, and a plan at home.',
 'Stop, tell, check, calm down. Watching more, hiding it and sharing it make the worry bigger.'];
const QUIZ=[{q:'Mia feels worried after a news video. Is something wrong with her?',a:'No, lots of people feel worried after scary news',o:[['Yes, she should not feel like that','wrongfeel'],['Yes, she must hide it','pretend']]},
 {q:'A flood video keeps playing new clips. What will help Rami most?',a:'Stop watching and talk to a grown-up',o:[['Watch every clip to know everything','more'],['Read all the comments','rumour']]},
 {q:'A comment says, “It will happen here next!” Is that a fact?',a:'No, check it with a grown-up and a trusted news source',o:[['Yes, lots of people liked it','rumour'],['Yes, comments are always true','rumour']]},
 {q:'A scary photo is being shared today. Was it taken today?',a:'Not always, old photos get shared again',o:[['Yes, people only share new photos','old'],['Yes, it is on the news','old']]},
 {q:'Dad asks, “Are you OK?” Ali is still worried about the video. What should he say?',a:'“I saw a video and I feel worried”',o:[['“I am fine”','pretend'],['“Nothing happened”','secret']]},
 {q:'Ali’s little cousin asks what the video was. What is best?',a:'Do not show it, tell a grown-up instead',o:[['Send it to him','share'],['Show him the scariest part','share']]},
 {q:'It is bedtime and Zoe keeps thinking about the news. What helps?',a:'Tell a grown-up, then do something calm',o:[['Search for more pictures in bed','bed'],['Keep it to herself','secret']]}];
/* ---------- drawings ---------- */
function kid(g,x,y,s,cloud){g.save();g.fillStyle='#8b5e3c';g.beginPath();g.arc(x,y-s*.55,s*.2,0,7);g.fill();g.fillStyle='#2563eb';A0(g,x-s*.22,y-s*.33,s*.44,s*.55,s*.12);g.fill();
 if(cloud>0){const r=s*(.05+cloud*.025);g.fillStyle='rgba(71,85,105,.8)';[[-.9,0],[0,-.35],[.9,0],[0,.25]].forEach(([dx,dy])=>{g.beginPath();g.arc(x+s*.5+dx*r,y-s*.62+dy*r,r,0,7);g.fill()})}g.restore()}
function A0(g,x,y,w,h,r){g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
function phone(g,r,down){g.save();if(down){g.fillStyle='#334155';A0(g,r.x,r.y+r.h*.7,r.w,r.h*.12,8);g.fill();g.restore();return}
 g.fillStyle='#111827';A0(g,r.x,r.y,r.w,r.h,14);g.fill();g.fillStyle='#ffffff';A0(g,r.x+6,r.y+14,r.w-12,r.h-28,8);g.fill();g.restore()}
function gauge(g,r,v,max){g.save();g.fillStyle='#ffffff';A0(g,r.x,r.y,r.w,r.h,r.w/2);g.fill();g.strokeStyle='#64748b';g.lineWidth=1.5;g.stroke();
 const f=Math.min(1,v/max),h=(r.h-8)*f;g.fillStyle=f>.7?'#dc2626':f>.4?'#f59e0b':'#16a34a';A0(g,r.x+4,r.y+r.h-4-h,r.w-8,Math.max(h,0.1),(r.w-8)/2);g.fill();g.restore()}
return{R,on,brush,SIGNS,FEED,TOP,GAP,BITS,QN,FACT,MOVES,START,LEARNT,QUIZ,kid,phone,gauge}})();
