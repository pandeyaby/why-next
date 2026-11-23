/* Data and pictures for flagpasttalk (talking about what happened: went, not goed; ages 4-5). Sources: DfE
   Development Matters (2021), Reception Communication and Language (connect ideas, explain what is happening, use
   past, present and future forms); DfE EYFS statutory framework (2024), ELG Speaking ('offer explanations ... making
   use of past, present and future tenses'); Marcus, Pinker, Ullman et al. (1992), 'Overregularization in language
   acquisition', Monographs of the SRCD 57(4): children who already say 'went' start to say 'goed' as they learn the
   -ed rule, and these errors fade with time; Brown (1973) and later work: regular past -ed and irregular past forms
   are among the first grammar endings children learn; recasting ('You went to the park!') is the advice for adults
   (Saxton 2005; NHS and Speech and Language UK guidance). Slips it targets: goed, eated, runned, seed; thinking every
   -ed word is wrong once you learn the changers; mixing time words and verb forms (yesterday I will go). */
const PASTTALK=(()=>{
/* step 1: when did it happen? z = 0 yesterday, 1 today (now), 2 tomorrow */
const WHEN=[{t:'I played in the sand.',z:0,pic:'sand'},{t:'I am eating my lunch now.',z:1,pic:'eat'},{t:'I will go to the park.',z:2,pic:'park'},
 {t:'I jumped in a puddle.',z:0,pic:'jump'},{t:'I will kick a ball.',z:2,pic:'kick'},{t:'I am running now.',z:1,pic:'run'}];
const DAYS=['Yesterday','Today, now','Tomorrow'];
const DWHY=['Played and jumped end in -ed. That means it already happened: yesterday.','I am ... now means it is happening today, right now.','I will ... means it has not happened yet: tomorrow.'];
/* step 2: the -ed machine (k = picture) */
const ED=[{w:'jump',k:'jump'},{w:'kick',k:'kick'},{w:'play',k:'sand'},{w:'walk',k:'park'}];
/* step 3: words that change */
const CHANGE=[{w:'go',p:'went',x:['goed','goes'],k:'park'},{w:'eat',p:'ate',x:['eated','eats'],k:'eat'},{w:'run',p:'ran',x:['runned','runs'],k:'run'},{w:'see',p:'saw',x:['seed','sees'],k:'see'}];
/* step 4: does the robot say it right? ok = 1 already right */
const ROBOT=[{s:'I goed to the park.',ok:0,fix:'I went to the park.'},{s:'I jumped in a puddle.',ok:1,fix:'I jumped in a puddle.'},
 {s:'I eated my lunch.',ok:0,fix:'I ate my lunch.'},{s:'I runned to Gran.',ok:0,fix:'I ran to Gran.'},{s:'I played with my friend.',ok:1,fix:'I played with my friend.'}];
/* step 5: pick the word that fits the time word */
const FRAMES=[{a:'Yesterday I',b:'to the park.',opts:['went','go','will go'],ans:0,k:'park'},{a:'Tomorrow I',b:'to the park.',opts:['went','go','will go'],ans:2,k:'park'},
 {a:'Last night I',b:'a fox.',opts:['see','saw','will see'],ans:1,k:'see'}];
const DESC=['A sentence card and three boxes: Yesterday, Today now, and Tomorrow. Drag the card to the right box, or use the buttons.',
 'A word machine. A doing word sits in it. Drag the -ed tile onto the word, or tap Add -ed, to make it about yesterday.',
 'A doing word that changes when it is about yesterday. Three word cards below. Tap the word we say for yesterday.',
 'A robot says a sentence about yesterday. Tap Right if it is right, or Fix it if a word is wrong.',
 'A sentence with a gap and a time word. Three word cards. Tap the word that fits the time word.'];
const TXT=['When did it happen? Drag each card to its day.','Add -ed to say it is done. Yesterday I ...','Some words change. Find the word for yesterday.','Is the robot right? Fix the wrong words.','Pick the word that fits yesterday or tomorrow.'];
const DONE=['Yesterday is done (played, jumped). Now is happening (I am ...). Tomorrow is not yet (I will ...).',
 'Lots of doing words add -ed for yesterday: jumped, kicked, played, walked.',
 'Some words change instead: go, went. Eat, ate. Run, ran. See, saw. We never say goed.',
 'Goed, eated and runned are fixed. Jumped and played were right all along: they do take -ed.',
 'Yesterday I went. Tomorrow I will go. Last night I saw. The time word and the doing word match.'];
const QS=[{q:'Yesterday I ___ to the shop.',a:'went',o:[['goed','goed'],['will go','will']]},
 {q:'Which one is right?',a:'I ate my lunch.',o:[['I eated my lunch.','eated'],['I eat my lunch yesterday.','now']]},
 {q:'Yesterday I ___ a ball.',a:'kicked',o:[['kick','now'],['kicken','kicken']]},
 {q:'Tomorrow I ___ Gran.',a:'will see',o:[['saw','saw'],['seed','seed']]},
 {q:'"I runned fast." What should it be?',a:'I ran fast.',o:[['I runned fast. It is right.','runned'],['I will runned fast.','runned']]},
 {q:'"I jumped in a puddle." Is it right?',a:'Yes, jump takes -ed',o:[['No, it should be jamp','jamp'],['No, it should be jump','now']]},
 {q:'Which word tells about the past?',a:'Yesterday',o:[['Tomorrow','will'],['Now','now']]}];
/* canvas helpers */
function SHAPES(A){const INK='#0f172a',OK='#047857',NO='#b91c1c',RIM='#64748b',F='px system-ui,sans-serif',sz=n=>A.narrow?n:Math.round(n*1.15);
 const g=()=>A.ctx,dk=()=>A.col.dark,fg=()=>dk()?'#f1f5f9':INK;
 function wrap(t,max,font){const c=g();c.font=font;const out=[];let line='';for(const w of t.split(' ')){const next=line?line+' '+w:w;if(line&&c.measureText(next).width>max){out.push(line);line=w}else line=next}if(line)out.push(line);return out}
 function banner(t,tone,note,bad){const c=g(),font=`800 ${sz(16)}${F}`,L=wrap(t,A.W-34,font),lh=sz(16)*1.3,h=L.length*lh+14;
  c.fillStyle=tone==='ok'?(dk()?'#14532d':'#dcfce7'):tone==='no'?(dk()?'#7f1d1d':'#fee2e2'):(dk()?'#1e293b':'#ffffff');A.paint.rrect(8,8,A.W-16,h,12);c.fill();
  c.lineWidth=tone?2.5:1.2;c.strokeStyle=tone==='ok'?OK:tone==='no'?NO:RIM;c.stroke();c.font=font;c.fillStyle=fg();c.textAlign='left';c.textBaseline='top';L.forEach((r,i)=>c.fillText(r,17,15+i*lh));
  let y=8+h+6;if(note){const f2=`700 ${sz(14)}${F}`,L2=wrap(note,A.W-34,f2).slice(0,3);c.font=f2;c.fillStyle=bad?(dk()?'#fca5a5':NO):(dk()?'#86efac':OK);L2.forEach((r,i)=>c.fillText(r,17,y+i*sz(14)*1.3));y+=L2.length*sz(14)*1.3+6}return y}
 function card(r,t,o){o=o||{};const c=g();if(!o.bare){c.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':o.sel?'#dbeafe':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,12);c.fill();
  c.lineWidth=o.no||o.ok||o.sel?3.5:1.6;c.strokeStyle=o.no?NO:o.ok?OK:o.sel?'#1d4ed8':RIM;c.stroke()}if(!t)return;let n=sz(o.n||16),L;
  for(;;){L=wrap(t,r.w-14,`800 ${n}${F}`);if(L.length*n*1.2<=r.h-8||n<=10)break;n--}c.font=`800 ${n}${F}`;c.fillStyle=INK;c.textAlign='center';c.textBaseline='middle';
  const y0=o.top?r.y+r.h-L.length*n*1.2/2-6:r.y+r.h/2;L.forEach((s,i)=>c.fillText(s,r.x+r.w/2,y0+(i-(L.length-1)/2)*n*1.2))}
 /* a child doing something, in a box of size s centred on (x,y) */
 function kid(k,x,y,s){const c=g(),u=s/2;c.save();c.translate(x,y);c.lineCap='round';c.lineJoin='round';const skin='#d6a77a',top='#2563eb';
  const leg=(a,b,d,e)=>{c.strokeStyle='#1e293b';c.lineWidth=u*.12;c.beginPath();c.moveTo(a,b);c.lineTo(d,e);c.stroke()};
  const arm=(a,b,d,e)=>{c.strokeStyle=skin;c.lineWidth=u*.1;c.beginPath();c.moveTo(a,b);c.lineTo(d,e);c.stroke()};
  const lift=k==='jump'?-u*.2:0;c.translate(0,lift);
  if(k==='jump'){leg(-u*.08,u*.25,-u*.22,u*.55);leg(u*.08,u*.25,u*.22,u*.55);arm(-u*.15,-u*.15,-u*.4,-u*.55);arm(u*.15,-u*.15,u*.4,-u*.55)}
  else if(k==='kick'){leg(-u*.08,u*.25,-u*.12,u*.75);leg(u*.08,u*.25,u*.45,u*.45);arm(-u*.15,-u*.15,-u*.4,u*.1);arm(u*.15,-u*.15,u*.35,-u*.3)}
  else if(k==='run'){leg(-u*.08,u*.25,-u*.4,u*.65);leg(u*.08,u*.25,u*.3,u*.7);arm(-u*.15,-u*.15,u*.3,-u*.35);arm(u*.15,-u*.15,-u*.35,u*.05)}
  else{leg(-u*.08,u*.25,-u*.12,u*.75);leg(u*.08,u*.25,u*.12,u*.75);arm(-u*.15,-u*.15,-u*.35,u*.15);arm(u*.15,-u*.15,u*.38,k==='eat'||k==='see'?-u*.45:u*.15)}
  c.fillStyle=top;A.paint.rrect(-u*.18,-u*.25,u*.36,u*.55,u*.08);c.fill();c.fillStyle=skin;c.beginPath();c.arc(0,-u*.45,u*.2,0,7);c.fill();c.fillStyle='#3f2a14';c.beginPath();c.arc(0,-u*.52,u*.2,Math.PI,0);c.fill();
  c.translate(0,-lift);
  if(k==='jump'){c.fillStyle='#38bdf8';c.beginPath();c.ellipse(0,u*.85,u*.55,u*.1,0,0,7);c.fill()}
  if(k==='kick'){c.fillStyle='#ffffff';c.strokeStyle='#0f172a';c.lineWidth=2;c.beginPath();c.arc(u*.68,u*.38,u*.16,0,7);c.fill();c.stroke()}
  if(k==='eat'){c.fillStyle='#dc2626';c.beginPath();c.arc(u*.42,-u*.5,u*.11,0,7);c.fill()}
  if(k==='sand'){c.fillStyle='#fcd34d';c.beginPath();c.ellipse(u*.45,u*.75,u*.35,u*.14,0,0,7);c.fill();c.fillStyle='#ef4444';c.fillRect(u*.45,u*.45,u*.14,u*.2)}
  if(k==='park'){c.fillStyle='#78350f';c.fillRect(-u*.85,-u*.1,u*.08,u*.85);c.fillStyle='#16a34a';c.beginPath();c.arc(-u*.81,-u*.25,u*.25,0,7);c.fill()}
  if(k==='see'){c.fillStyle='#ea580c';c.beginPath();c.moveTo(u*.55,u*.55);c.lineTo(u*.9,u*.45);c.lineTo(u*.85,u*.75);c.closePath();c.fill();c.beginPath();c.arc(u*.6,u*.6,u*.1,0,7);c.fill()}
  if(k==='run'){c.strokeStyle=dk()?'#94a3b8':'#64748b';c.lineWidth=2;for(let i=0;i<3;i++){c.beginPath();c.moveTo(-u*.6,-u*.2+i*u*.2);c.lineTo(-u*.85,-u*.2+i*u*.2);c.stroke()}}
  c.restore()}
 return{wrap,banner,card,kid,sz,fg,dk,INK,OK,NO,RIM,F}}
return{WHEN,DAYS,DWHY,ED,CHANGE,ROBOT,FRAMES,DESC,TXT,DONE,QS,SHAPES}})();
