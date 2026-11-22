/* Data, text helpers and drawings for flagstrength (things I am good at and things I am practising, ages 6–7;
   PSHE Association Programme of Study (2020) KS1 health and wellbeing: what they are good at, what they like and
   dislike, and how to manage when finding things difficult; DfE Relationships Education and Health Education
   statutory guidance 2019 (self-respect, mental wellbeing); EYFS ELG Self-Regulation (2021): set and work towards
   simple goals; Locke and Latham (2002) on specific goals). Slips it targets: "practising means I am bad at it",
   "saying I am good at something is showing off", "grown-ups are good at everything", "I am bad at it" self-talk,
   "I am not good at anything", and goals that are too big, vague, perfect or about beating others. */
const STRN=(()=>{
const box=(x,y,w,h)=>({x,y,w,h}),inside=(p,b)=>!!b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
function pen(A,K){const fs=n=>Math.round(A.narrow?n:n*1.16);
 function text(s,x,y,n,o){o=o||{};const g=A.ctx;g.font=`${o.b||800} ${fs(n)}px system-ui,sans-serif`;g.fillStyle=o.c||K.ink;g.textAlign='center';g.textBaseline='middle';
  const rows=[];let r='';String(s).split(' ').forEach(w=>{const t=r?r+' '+w:w;if(o.w&&g.measureText(t).width>o.w&&r){rows.push(r);r=w}else r=t});rows.push(r);
  const lh=fs(n)*1.2;rows.forEach((t,i)=>g.fillText(t,x,y+(i-(rows.length-1)/2)*lh))}
 function card(b,fill,state){const g=A.ctx;g.fillStyle=state==='ok'?'#d1fae5':state==='ko'?'#fee2e2':fill||'#ffffff';A.paint.rrect(b.x,b.y,b.w,b.h,Math.min(12,b.h/3));g.fill();
  g.lineWidth=state?3:1.6;g.strokeStyle={ok:K.ok,ko:K.ko,sel:K.sel}[state]||K.rim;g.stroke()}
 function cells(n,cols,a,gap){gap=gap||8;const rows=Math.ceil(n/cols),w=(a.w-gap*(cols-1))/cols,h=(a.h-gap*(rows-1))/rows;
  return Array.from({length:n},(_,i)=>box(a.x+(i%cols)*(w+gap),a.y+Math.floor(i/cols)*(h+gap),w,h))}
 return{fs,text,card,cells}}
/* 1. Sam's cards: k 0 = good at it now, 1 = still practising */
const SAM=[{t:'Sam rides his bike with no help',sh:'Bike',k:0},
 {t:'Sam swims 3 strokes, then he has to stop',sh:'Swimming',k:1},
 {t:'Sam’s friends ask him to draw cats for them',sh:'Drawing',k:0},
 {t:'Sam ties his laces, but they come undone',sh:'Laces',k:1},
 {t:'Sam reads a story to his little sister',sh:'Reading',k:0},
 {t:'Sam catches 2 balls out of 10',sh:'Catching',k:1}];
/* 2. everyone has both: p = index of the thing each person is still practising */
const FOLK=[{n:'Ava',c:'#be185d',s:['Swims fast','Reads big books','Skipping with a rope'],p:2},
 {n:'Leo',c:'#1d4ed8',s:['Builds Lego towns','Riding a bike','Counts to 100'],p:1},
 {n:'Dad',c:'#047857',s:['Playing the guitar','Cooks dinner','Fixes bikes'],p:0},
 {n:'Miss Khan',c:'#7c3aed',s:['Tells stories','Knows about plants','Speaking Spanish'],p:2}];
/* 3. put-downs and the kind words that fix each one; f = which put-down a kind card fixes, s = slip for a wrong card */
const DOWN=[{t:'“I’m bad at reading.”',sh:'reading'},{t:'“I will never catch a ball.”',sh:'catching'},{t:'“I’m no good at laces.”',sh:'laces'}];
const KIND=[{t:'I’m practising reading.',f:0},{t:'I give up.',s:'giveup'},{t:'I can’t catch yet. I’m practising.',f:1},
 {t:'Everyone is better than me.',s:'compare'},{t:'Laces are tricky. I’m getting better.',f:2},{t:'I’m the best at everything.',s:'boast'}];
/* 4. goals: ok = small, clear and about Sam's own practice */
const GOALS=[{t:'Be the best in the class at football',s:'best'},{t:'Catch the ball 5 times in a row',ok:1},
 {t:'Never drop a ball again',s:'never'},{t:'Read 1 page to Mum every night',ok:1},{t:'Get better',s:'vague'},{t:'Be good at everything by Friday',s:'everything'}];
/* 5. my own board */
const SKILLS=['Drawing','Running','Reading','Building','Singing','Counting','Swimming','Riding a bike','Tying laces','Writing','Catching','Helping'];
const DESC=['Six things about Sam. Drag each card to Good at it now or Still practising, or tap a card and then tap a box.',
 'Four people. Each one has a thing they are still practising. Tap it for each person.',
 'Sam is putting himself down. Drag the kind words that fix what he said, or tap them.',
 'Sam wants to practise. Drag the 2 good goals onto his goal board, or tap them.',
 'Now make your own board. Put 2 things in I’m good at and 1 thing in I’m practising. Then pick your words.','Challenge.'];
const DONE=['Things Sam can do well are things he is good at. Things he can do only some of the time are things he is practising. Both are part of Sam.',
 'Everyone is good at some things and still practising others, even grown-ups. Nobody is good at everything.',
 'Swap “I’m bad at it” for “I’m practising it”. Kind words help you keep going.',
 'A good goal is small and clear, and it is about your own practice, not about beating others.',
 'You named 2 things you are good at and 1 thing you are practising, and you used kind words about it.'];
const QS=[{q:'Mo can write his name, but some letters are still wobbly. What is writing for Mo?',a:'A thing he is still practising',o:[['A thing he is bad at','bad'],['A thing he can never do','never2']]},
 {q:'Zara can ride her scooter fast, with no help. Is it OK for her to say “I’m good at scooting”?',a:'Yes, it is true and it is OK to say',o:[['No, that is showing off','showoff'],['No, only grown-ups can say that','onlygrown']]},
 {q:'Is anyone good at everything?',a:'No, everyone is still practising something',o:[['Yes, grown-ups are','grownup'],['Yes, the cleverest children are','nobody']]},
 {q:'Ben says, “I’m bad at maths.” What could he say instead?',a:'“I’m practising maths.”',o:[['“I give up on maths.”','giveup'],['“Everyone is better than me.”','compare']]},
 {q:'Which is a good goal for Ella, who is practising swimming?',a:'Swim 5 strokes without stopping',o:[['Be the best swimmer in the class','best'],['Get better','vague']]},
 {q:'Kit says, “I’m not good at anything.” What is true?',a:'Everyone is good at some things',o:[['Kit is right','kit'],['Only some children are good at things','nobody']]},
 {q:'Ava is practising skipping. She trips a lot. What should she do?',a:'Keep practising a little each day',o:[['Stop: she is bad at it','bad'],['Only try when no one is looking','hide']]}];
/* ---------- drawings ---------- */
function star(g,x,y,r){g.save();g.fillStyle='#f59e0b';g.strokeStyle='#92400e';g.lineWidth=2;g.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,d=i%2?r*.45:r;g.lineTo(x+Math.cos(a)*d,y+Math.sin(a)*d)}g.closePath();g.fill();g.stroke();g.restore()}
function sprout(g,x,y,r){g.save();g.fillStyle='#a16207';g.fillRect(x-r*.55,y+r*.25,r*1.1,r*.6);g.strokeStyle='#166534';g.lineWidth=Math.max(2,r*.12);g.beginPath();g.moveTo(x,y+r*.25);g.lineTo(x,y-r*.35);g.stroke();
 g.fillStyle='#16a34a';g.beginPath();g.ellipse(x-r*.3,y-r*.4,r*.32,r*.16,-.6,0,7);g.ellipse(x+r*.3,y-r*.5,r*.32,r*.16,.6,0,7);g.fill();g.restore()}
function kid(g,x,y,s,col,happy){g.save();g.fillStyle=col;g.beginPath();g.arc(x,y-s*.28,s*.2,0,7);g.fill();
 g.beginPath();g.moveTo(x-s*.3,y+s*.4);g.quadraticCurveTo(x,y-s*.15,x+s*.3,y+s*.4);g.closePath();g.fill();
 g.strokeStyle='#ffffff';g.lineWidth=1.8;g.beginPath();if(happy)g.arc(x,y-s*.3,s*.09,.4,2.7);else g.arc(x,y-s*.16,s*.08,3.6,5.8);g.stroke();
 g.fillStyle='#ffffff';[-1,1].forEach(k=>{g.beginPath();g.arc(x+k*s*.07,y-s*.33,s*.025,0,7);g.fill()});g.restore()}
return{box,inside,pen,SAM,FOLK,DOWN,KIND,GOALS,SKILLS,DESC,DONE,QS,star,sprout,kid}})();
