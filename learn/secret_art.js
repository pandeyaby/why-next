/* Data, text helpers and drawings for flagsecret (good surprises and worry secrets, ages 6–7; PSHE Association
   Programme of Study (2020) KS1 keeping safe: the difference between good surprises and secrets that should be
   shared with a trusted adult, and how to ask for help; DfE Relationships Education statutory guidance
   2019 (being safe: when to break a confidence, how to report concerns); NSPCC PANTS rule "Speak up, someone can
   help" and "Talk PANTS" guidance on surprises versus secrets). Slips it targets: "a secret called special is a nice
   one", "a present makes it a good secret", "a surprise must stay hidden for ever", "a promise means I must not tell",
   "telling a teddy or the person who asked counts", and mixing up excited feelings with worried ones. */
const SECR=(()=>{
const box=(x,y,w,h)=>({x,y,w,h}),inside=(p,b)=>!!b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
function ink(A,K){const fs=n=>Math.round(A.narrow?n:n*1.18);
 function say(s,x,y,n,o){o=o||{};const g=A.ctx;g.font=`${o.b||800} ${fs(n)}px system-ui,sans-serif`;g.fillStyle=o.c||K.ink;g.textAlign=o.al||'center';g.textBaseline='middle';
  const out=[];let row='';String(s).split(' ').forEach(w=>{const t=row?row+' '+w:w;if(o.w&&g.measureText(t).width>o.w&&row){out.push(row);row=w}else row=t});out.push(row);
  const lh=fs(n)*1.2;out.forEach((t,i)=>g.fillText(t,x,y+(i-(out.length-1)/2)*lh))}
 function tile(b,fill,mode){const g=A.ctx;g.fillStyle=mode==='ok'?'#d1fae5':mode==='ko'?'#fee2e2':fill||'#ffffff';A.paint.rrect(b.x,b.y,b.w,b.h,Math.min(12,b.h/3));g.fill();
  g.lineWidth=mode?3:1.6;g.strokeStyle={ok:K.ok,ko:K.ko,sel:K.sel}[mode]||K.rim;g.stroke()}
 /* n boxes in a grid of cols columns inside an area */
 function grid(n,cols,a,gap){gap=gap||8;const rows=Math.ceil(n/cols),w=(a.w-gap*(cols-1))/cols,h=(a.h-gap*(rows-1))/rows;
  return Array.from({length:n},(_,i)=>box(a.x+(i%cols)*(w+gap),a.y+Math.floor(i/cols)*(h+gap),w,h))}
 return{fs,say,tile,grid}}
/* 1. sort: good surprise (0) or worry secret (1); s = the slip a wrong sort shows */
const CARDS=[{t:'We hide Mum’s cake until her birthday on Sunday',sh:'Mum’s cake',k:0},
 {t:'A big boy says: “Tell, and I will hit you.”',sh:'Big boy',k:1,s:'threat'},
 {t:'We made Dad a card to give him on Friday',sh:'Dad’s card',k:0},
 {t:'A grown-up says: “Don’t tell. It’s our special secret.”',sh:'Special secret',k:1,s:'special'},
 {t:'A party for Gran on Saturday',sh:'Gran’s party',k:0},
 {t:'Someone hurt me and said: “Keep quiet.”',sh:'Keep quiet',k:1,s:'hurt'}];
/* 2. when will everyone find out? days 0-6, 7 = never */
const DAYS=['Mon','Tue','Wed','Thu','Fri','Sat','Sun','Never'];
const WEEK=[{t:'Dad’s card: give it on Friday',sh:'Dad’s card',d:4},{t:'Gran’s party on Saturday',sh:'Gran’s party',d:5},
 {t:'Mum’s cake on Sunday',sh:'Mum’s cake',d:6},{t:'“Don’t tell anyone, not ever.”',sh:'Not ever',d:7}];
/* 3. feelings: w = a worry feeling */
const CLUES=[{t:'My tummy feels sick',w:1},{t:'I can’t wait to see Gran’s face',w:0},{t:'I can’t sleep at night',w:1},
 {t:'I feel giggly and excited',w:0},{t:'I want to cry',w:1},{t:'I have a big smile',w:0}];
/* 4. what people say: w = warning words */
const SAYS=[{t:'“It’s our special secret.”',w:1},{t:'“Shh! It’s a surprise for Mum on Sunday.”',w:0},{t:'“If you tell, you will be in trouble.”',w:1},
 {t:'“Nobody will believe you.”',w:1},{t:'“Don’t peek at your present until your birthday!”',w:0},{t:'“Here are some sweets. Keep quiet.”',w:1}];
/* 5. who to tell: ok = a trusted grown-up who can help */
const PEOPLE=[{t:'My teacher',ok:1,c:'#2563eb'},{t:'Mum',ok:1,c:'#db2777'},{t:'Grandad',ok:1,c:'#059669'},
 {t:'The one who said “keep quiet”',s:'asker',c:'#7c3aed'},{t:'My teddy',s:'teddy',c:'#b45309'},{t:'Someone online I don’t know',s:'online',c:'#475569'}];
const DESC=['Six cards. Drag each one to Good surprise or Worry secret, or tap a card and then tap a box.',
 'When will everyone find out? Drag each card onto its day. A secret that is never told goes in Never.',
 'Mia keeps a secret. Tap the feelings that tell her it is a worry secret.',
 'Someone asks you to keep a secret. Tap each thing they say that is a warning sign.',
 'Someone hurt Mia and said, “Keep quiet.” Drag the card to a person who can help.','Challenge.'];
const DONE=['A good surprise makes people happy. A worry secret makes you feel bad, or someone says you must not tell.',
 'A surprise has a day when everyone finds out. A worry secret is meant to stay hidden for ever.',
 'Worried, scared or sick feelings are a sign: this is a worry secret, so tell.',
 '“Special secret”, “You will be in trouble”, “Nobody will believe you” and sweets to keep quiet are all warning signs.',
 'Tell a trusted grown-up, even if you promised. You will not be in trouble for telling.'];
const QS=[{q:'Your class is planning a party for your teacher on Friday. What kind of secret is it?',a:'A good surprise',o:[['A worry secret','soon'],['A secret to keep for ever','ever']]},
 {q:'A grown-up says, “This is our special secret. Don’t tell Mum.” What do you do?',a:'Tell a trusted grown-up',o:[['Keep it: it is special','special'],['Keep it, but feel bad','feel']]},
 {q:'Someone gives you sweets and says, “Keep quiet.” Is it a good secret now?',a:'No, it is a worry secret: tell',o:[['Yes, I got sweets','sweets'],['Yes, if I like the sweets','sweets']]},
 {q:'You promised to keep a secret, but it makes you scared. Can you tell?',a:'Yes, tell a trusted grown-up',o:[['No, a promise is a promise','promise'],['Only if they say I can','asker']]},
 {q:'Who should you tell about a worry secret?',a:'A trusted grown-up, like my teacher',o:[['My teddy','teddy'],['The one who told me to keep it','asker']]},
 {q:'A good surprise is kept until …',a:'the day everyone finds out',o:[['for ever and ever','ever'],['I get a present for it','sweets']]},
 {q:'A secret gives you a sick tummy and you can’t sleep. What does that tell you?',a:'It is a worry secret',o:[['I am just excited','excited'],['I must hide it better','feel']]}];
/* ---------- drawings ---------- */
function gift(g,x,y,s){g.save();g.fillStyle='#f59e0b';g.strokeStyle='#92400e';g.lineWidth=2;g.fillRect(x-s/2,y-s*.3,s,s*.7);g.strokeRect(x-s/2,y-s*.3,s,s*.7);
 g.fillStyle='#be123c';g.fillRect(x-s*.08,y-s*.3,s*.16,s*.7);g.fillRect(x-s/2,y-s*.02,s,s*.14);
 g.beginPath();g.ellipse(x-s*.16,y-s*.42,s*.16,s*.1,-.4,0,7);g.ellipse(x+s*.16,y-s*.42,s*.16,s*.1,.4,0,7);g.fill();g.restore()}
function warn(g,x,y,s){g.save();g.fillStyle='#fde047';g.strokeStyle='#7f1d1d';g.lineWidth=2.5;g.beginPath();g.moveTo(x,y-s*.5);g.lineTo(x+s*.55,y+s*.42);g.lineTo(x-s*.55,y+s*.42);g.closePath();g.fill();g.stroke();
 g.fillStyle='#7f1d1d';g.fillRect(x-s*.05,y-s*.22,s*.1,s*.38);g.beginPath();g.arc(x,y+s*.28,s*.06,0,7);g.fill();g.restore()}
function person(g,x,y,s,col,sad){g.save();g.fillStyle=col;g.beginPath();g.arc(x,y-s*.28,s*.2,0,7);g.fill();
 g.beginPath();g.moveTo(x-s*.3,y+s*.4);g.quadraticCurveTo(x,y-s*.15,x+s*.3,y+s*.4);g.closePath();g.fill();
 g.strokeStyle='#ffffff';g.lineWidth=1.8;g.beginPath();if(sad)g.arc(x,y-s*.16,s*.08,3.6,5.8);else g.arc(x,y-s*.3,s*.09,.4,2.7);g.stroke();
 g.fillStyle='#ffffff';[-1,1].forEach(k=>{g.beginPath();g.arc(x+k*s*.07,y-s*.33,s*.025,0,7);g.fill()});g.restore()}
return{box,inside,ink,CARDS,DAYS,WEEK,CLUES,SAYS,PEOPLE,DESC,DONE,QS,gift,warn,person}})();
