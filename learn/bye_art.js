/* Data and pictures for flagbyebye (saying goodbye at nursery: my grown-up comes back; ages 3-4). Sources: DfE
   Development Matters 2021, PSED (birth to three: 'find ways to calm themselves, through being calmed and comforted by
   their key person'; 3 and 4 year olds: 'show more confidence in new social situations'); DfE EYFS statutory framework
   2024, key person requirement; Bowlby 1969, Attachment and Loss vol. 1, and Ainsworth, Blehar, Waters and Wall 1978,
   Patterns of Attachment (a trusted grown-up is a secure base); AAP HealthyChildren.org 'Separation anxiety' and
   ZERO TO THREE 'Coping with separation anxiety' (always say goodbye, keep it short and the same each day, never sneak
   away, say when you will be back in terms of the day: 'after story time'). Slips it targets: thinking the grown-up
   might not come back; expecting them at once or 'when I cry' instead of at a set point in the day; thinking a sneaky
   exit is kinder than a goodbye; thinking sad or crying at goodbye is naughty; waiting alone at the door instead of
   going to the key person and starting to play. */
const BYE=(()=>{
/* step 1: the picture timetable for the nursery day; the grown-up comes back after story time */
const DAY=['hug','play','snack','outside','story','back'];
const SAY={hug:'Goodbye hug',play:'Play',snack:'Snack',outside:'Outside',story:'Story time',back:'Grown-up comes back'};
/* step 2: build a goodbye. ok = part of a good goodbye; why = what is wrong with it */
const ROUT=[{k:'hug',ok:1,t:'Hug'},{k:'sneak',ok:0,t:'Grown-up sneaks out',why:'Sneaking out is not a goodbye. You look up and your grown-up is gone. A goodbye tells you they are going, and coming back.'},
 {k:'wave',ok:1,t:'Wave at the window'},{k:'cling',ok:0,t:'Hold on and do not let go',why:'Holding on makes the goodbye long and hard. A short goodbye is best.'},{k:'words',ok:1,t:'"See you after story!"'}];
/* step 3: OK or not OK at goodbye? ok = 1 OK */
const FEEL=[{k:'cry',ok:1,t:'Crying'},{k:'hit',ok:0,t:'Hitting'},{k:'worried',ok:1,t:'Feeling worried'},{k:'say',ok:1,t:'Saying "I feel sad"'},{k:'throw',ok:0,t:'Throwing toys'},{k:'teddy',ok:1,t:'Holding my teddy tight'}];
/* step 4: make the worry smaller. d = how much it shrinks the worry (0 = it stays big) */
const HELP=[{k:'cuddle',d:1,t:'Cuddle with my key person'},{k:'door',d:0,t:'Wait by the door',why:'Waiting by the door keeps the worry big. Playing makes the time go by.'},{k:'teddy',d:1,t:'Hold my teddy from home'},{k:'breath',d:1,t:'Smell the flower, blow the candle'},{k:'game',d:1,t:'Choose a game'}];
/* step 5: a week of goodbyes */
const WEEK=['Monday','Tuesday','Wednesday','Thursday','Friday'];
const DESC=['The picture plan for the nursery day, left to right. Tap the next picture to move along the day.',
 'A goodbye with three empty spaces, and five cards. Drag or tap the cards that make a good goodbye.',
 'One card at a time, and two boxes: OK, and Not OK. Drag the card to a box, or use the buttons.',
 'A child with a big worry cloud. Drag or tap things that help, and watch the cloud get smaller.',
 'Five days in a row. Tap the next day to see what happens after story time.'];
const TXT=['When does your grown-up come back? Follow the picture plan.','Make a good goodbye.','Sad at goodbye. Is that OK?','Make the worry smaller.','Every day, your grown-up comes back.'];
const DONE=['Your grown-up comes back after story time. The picture plan shows when.',
 'A good goodbye: a hug, a wave, and "See you after story!" Short, and the same each day.',
 'Feeling sad, worried or cross is OK. Hitting and throwing are not OK. Say it with words.',
 'The worry got smaller: a cuddle, your teddy, slow breaths and a game all help.',
 '5 days, 5 goodbyes, and your grown-up came back every time.'];
const QS=[{q:'When does your grown-up come back?',a:'After story time',o:[['Right after the hug','clock'],['They might not come back','gone']]},
 {q:'Your grown-up has to go. What is best?',a:'A hug and a goodbye',o:[['They sneak out','sneak'],['A very long goodbye','long']]},
 {q:'Mia cries when her dad goes. Is Mia naughty?',a:'No, sad is OK',o:[['Yes, crying is naughty','naughty'],['Yes, she must stop now','naughty']]},
 {q:'You feel worried after goodbye. What can you do?',a:'Go to my key person',o:[['Wait by the door all day','alone'],['Hide on my own','alone']]},
 {q:'Your grown-up said "See you after story". Story time is done. What happens now?',a:'My grown-up comes back',o:[['I stay all night','gone'],['They come at lunch','clock']]},
 {q:'Sam feels cross at goodbye. What is OK?',a:'Say "I feel cross"',o:[['Hit the door','naughty'],['Throw the blocks','naughty']]}];
/* ---------- pictures: always drawn on a white card ---------- */
const SK='#7c2d12',INKP='#1e293b';
function person(g,u,x,y,h,col,o){o=o||{};const r=h*.17;g.fillStyle=o.skin||'#f2c79b';g.beginPath();g.arc(x,y-h+r,r,0,7);g.fill();g.strokeStyle=INKP;g.lineWidth=Math.max(1.5,u*.04);g.stroke();
 g.fillStyle=col;g.beginPath();g.moveTo(x-h*.2,y-h+2*r+2);g.lineTo(x+h*.2,y-h+2*r+2);g.lineTo(x+h*.27,y-h*.25);g.lineTo(x-h*.27,y-h*.25);g.closePath();g.fill();
 g.strokeStyle=INKP;g.lineWidth=Math.max(2,u*.07);g.beginPath();g.moveTo(x-h*.1,y-h*.25);g.lineTo(x-h*.1,y);g.moveTo(x+h*.1,y-h*.25);g.lineTo(x+h*.1,y);g.stroke();
 if(o.arm==='up'){g.beginPath();g.moveTo(x+h*.18,y-h+2*r+h*.06);g.lineTo(x+h*.38,y-h+r*.6);g.stroke()}
 if(o.arm==='out'){g.beginPath();g.moveTo(x-h*.18,y-h+2*r+h*.08);g.lineTo(x-h*.42,y-h*.62);g.moveTo(x+h*.18,y-h+2*r+h*.08);g.lineTo(x+h*.42,y-h*.62);g.stroke()}
 if(o.badge){g.fillStyle='#16a34a';g.fillRect(x-h*.07,y-h*.62,h*.14,h*.1)}
 const ey=y-h+r*.9;g.fillStyle=INKP;[-1,1].forEach(d=>{g.beginPath();g.arc(x+d*r*.38,ey,Math.max(1.2,r*.12),0,7);g.fill()});g.lineWidth=Math.max(1.2,u*.035);g.beginPath();
 if(o.mood==='sad')g.arc(x,y-h+r*1.75,r*.35,Math.PI+.5,-.5);else g.arc(x,y-h+r*1.15,r*.38,.5,Math.PI-.5);g.stroke()}
function face(g,u,mood){g.fillStyle=mood==='cross'?'#fca5a5':mood==='worried'?'#ddd6fe':mood==='sad'?'#bfdbfe':'#fde68a';g.beginPath();g.arc(0,0,u*.7,0,7);g.fill();g.strokeStyle=INKP;g.lineWidth=Math.max(2,u*.06);g.stroke();
 g.fillStyle=INKP;[-1,1].forEach(d=>{g.beginPath();g.arc(d*u*.25,-u*.15,u*.08,0,7);g.fill()});g.beginPath();
 if(mood==='happy')g.arc(0,u*.08,u*.3,.3,Math.PI-.3);else if(mood==='worried'){g.moveTo(-u*.28,u*.35);g.quadraticCurveTo(-u*.14,u*.22,0,u*.35);g.quadraticCurveTo(u*.14,u*.48,u*.28,u*.35)}else g.arc(0,u*.48,u*.28,Math.PI+.4,-.4);g.stroke();
 if(mood==='cross'){[-1,1].forEach(d=>{g.beginPath();g.moveTo(d*u*.42,-u*.38);g.lineTo(d*u*.12,-u*.28);g.stroke()})}
 if(mood==='sad'){g.fillStyle='#0284c7';g.beginPath();g.arc(-u*.27,u*.12,u*.08,0,7);g.fill()}}
function blocks(g,u){[['#ef4444',-.55,.2],['#2563eb',.05,.2],['#f59e0b',-.25,-.4]].forEach(([c,a,b])=>{g.fillStyle=c;g.fillRect(u*a,u*b,u*.55,u*.55);g.strokeStyle=INKP;g.lineWidth=Math.max(1.5,u*.04);g.strokeRect(u*a,u*b,u*.55,u*.55)})}
function teddy(g,u){g.fillStyle='#b45309';[[-.32,-.55,.17],[.32,-.55,.17],[0,-.3,.33],[0,.35,.45]].forEach(([a,b,r])=>{g.beginPath();g.arc(u*a,u*b,u*r,0,7);g.fill()});g.fillStyle='#fde68a';g.beginPath();g.arc(0,-.2*u,u*.13,0,7);g.fill();g.fillStyle=INKP;[-1,1].forEach(d=>{g.beginPath();g.arc(d*u*.12,-.38*u,u*.045,0,7);g.fill()})}
function door(g,u,open){g.fillStyle='#78350f';g.fillRect(-u*.45,-u*.85,u*.9,u*1.7);g.fillStyle=open?'#fef3c7':'#b45309';g.fillRect(-u*.36,-u*.76,u*.72,u*1.6);g.fillStyle='#facc15';g.beginPath();g.arc(u*.22,0,u*.07,0,7);g.fill()}
function bubble(g,u,t){g.fillStyle='#e0f2fe';g.strokeStyle='#0369a1';g.lineWidth=Math.max(2,u*.05);g.beginPath();g.ellipse(0,-u*.12,u*.85,u*.55,0,0,7);g.fill();g.stroke();g.beginPath();g.moveTo(-u*.3,u*.35);g.lineTo(-u*.45,u*.75);g.lineTo(-u*.05,u*.4);g.fill();
 g.fillStyle=INKP;g.font=`800 ${Math.round(u*.3)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(t,0,-u*.12)}
function icon(g,n,x,y,s){const u=s/2;g.save();g.translate(x,y);g.lineCap='round';g.lineJoin='round';
 switch(n){
 case'hug':person(g,u,-u*.22,u*.85,u*1.6,'#7c3aed',{arm:'out'});person(g,u,u*.3,u*.85,u*1.0,'#f97316',{arm:'out'});g.fillStyle='#e11d48';g.beginPath();g.moveTo(0,-u*.55);g.bezierCurveTo(-u*.25,-u*.85,-u*.5,-u*.5,0,-u*.25);g.bezierCurveTo(u*.5,-u*.5,u*.25,-u*.85,0,-u*.55);g.fill();break;
 case'play':case'game':blocks(g,u);break;
 case'snack':g.fillStyle='#dc2626';g.beginPath();g.arc(-u*.25,u*.1,u*.4,0,7);g.fill();g.strokeStyle='#166534';g.lineWidth=u*.08;g.beginPath();g.moveTo(-u*.25,-u*.3);g.lineTo(-u*.15,-u*.55);g.stroke();g.fillStyle='#bae6fd';g.fillRect(u*.25,-u*.25,u*.45,u*.75);g.strokeStyle=INKP;g.lineWidth=u*.05;g.strokeRect(u*.25,-u*.25,u*.45,u*.75);break;
 case'outside':g.strokeStyle='#dc2626';g.lineWidth=u*.12;g.beginPath();g.moveTo(-u*.6,u*.8);g.lineTo(-u*.6,-u*.5);g.lineTo(u*.7,u*.8);g.stroke();g.strokeStyle='#2563eb';g.beginPath();g.moveTo(-u*.75,-u*.15);g.lineTo(-u*.45,-u*.15);g.moveTo(-u*.75,u*.3);g.lineTo(-u*.45,u*.3);g.stroke();g.fillStyle='#f59e0b';g.beginPath();g.arc(u*.55,-u*.55,u*.22,0,7);g.fill();break;
 case'story':g.fillStyle='#2563eb';g.beginPath();g.moveTo(0,-u*.35);g.lineTo(-u*.8,-u*.55);g.lineTo(-u*.8,u*.55);g.lineTo(0,u*.75);g.lineTo(u*.8,u*.55);g.lineTo(u*.8,-u*.55);g.closePath();g.fill();g.fillStyle='#ffffff';g.fillRect(-u*.68,-u*.38,u*.6,u*.95);g.fillRect(u*.08,-u*.38,u*.6,u*.95);g.strokeStyle='#94a3b8';g.lineWidth=u*.05;[-.15,.1,.35].forEach(b=>{g.beginPath();g.moveTo(-u*.58,u*b);g.lineTo(-u*.18,u*b);g.moveTo(u*.18,u*b);g.lineTo(u*.58,u*b);g.stroke()});break;
 case'back':door(g,u*.85,1);person(g,u,0,u*.75,u*1.45,'#7c3aed',{arm:'out'});break;
 case'sneak':door(g,u*.9,1);g.fillStyle='#64748b';[[-.5,.6],[-.2,.35],[.1,.6],[.4,.35]].forEach(([a,b])=>{g.beginPath();g.ellipse(u*a,u*b,u*.09,u*.15,0,0,7);g.fill()});break;
 case'wave':g.fillStyle='#bae6fd';g.fillRect(-u*.8,-u*.8,u*1.6,u*1.3);g.strokeStyle='#78350f';g.lineWidth=u*.1;g.strokeRect(-u*.8,-u*.8,u*1.6,u*1.3);g.beginPath();g.moveTo(0,-u*.8);g.lineTo(0,u*.5);g.stroke();person(g,u,-u*.4,u*.45,u*.95,'#f97316',{arm:'up'});break;
 case'cling':person(g,u,-u*.1,u*.85,u*1.6,'#7c3aed');person(g,u,u*.35,u*.85,u*.95,'#f97316',{mood:'sad',arm:'out'});break;
 case'words':bubble(g,u,'Bye!');break;
 case'cry':face(g,u,'sad');break; case'worried':face(g,u,'worried');break; case'happy':face(g,u,'happy');break; case'cross':face(g,u,'cross');break;
 case'hit':g.fillStyle='#f2c79b';g.strokeStyle=INKP;g.lineWidth=u*.06;g.beginPath();g.arc(0,0,u*.45,0,7);g.fill();g.stroke();[-.3,-.1,.1,.3].forEach(a=>{g.beginPath();g.moveTo(u*a,-u*.45);g.lineTo(u*a,-u*.1);g.stroke()});g.strokeStyle='#dc2626';g.lineWidth=u*.08;[[.6,-.6],[.75,0],[.6,.6]].forEach(([a,b])=>{g.beginPath();g.moveTo(u*a*.85,u*b*.85);g.lineTo(u*a*1.2,u*b*1.2);g.stroke()});break;
 case'throw':g.save();g.rotate(.5);blocks(g,u*.8);g.restore();g.strokeStyle='#dc2626';g.lineWidth=u*.07;[-.3,0,.3].forEach(b=>{g.beginPath();g.moveTo(-u*.95,u*b);g.lineTo(-u*.6,u*b);g.stroke()});break;
 case'say':bubble(g,u,'I feel sad');break;
 case'teddy':teddy(g,u);break;
 case'cuddle':person(g,u,-u*.2,u*.85,u*1.6,'#16a34a',{arm:'out',badge:1});person(g,u,u*.3,u*.85,u*.95,'#f97316',{arm:'out'});break;
 case'door':door(g,u,0);person(g,u,u*.55,u*.85,u*.95,'#f97316',{mood:'sad'});break;
 case'breath':g.fillStyle='#ec4899';[0,1,2,3,4].forEach(i=>{const a=i*Math.PI*2/5;g.beginPath();g.arc(-u*.4+Math.cos(a)*u*.2,-u*.2+Math.sin(a)*u*.2,u*.15,0,7);g.fill()});g.fillStyle='#facc15';g.beginPath();g.arc(-u*.4,-u*.2,u*.12,0,7);g.fill();
  g.fillStyle='#e2e8f0';g.fillRect(u*.3,-u*.05,u*.25,u*.7);g.strokeStyle=INKP;g.lineWidth=u*.04;g.strokeRect(u*.3,-u*.05,u*.25,u*.7);g.fillStyle='#f97316';g.beginPath();g.ellipse(u*.425,-u*.25,u*.09,u*.17,0,0,7);g.fill();break;
 default:break}
 g.restore()}
/* canvas helpers */
function PEN(A){const INK='#0f172a',OK='#047857',NO='#b91c1c',RIM='#64748b',F='px system-ui,sans-serif',sz=n=>A.narrow?n:Math.round(n*1.15);
 const g=()=>A.ctx,dk=()=>A.col.dark,fg=()=>dk()?'#f1f5f9':INK;
 function wrap(t,max,font){const c=g();c.font=font;const out=[];let line='';for(const w of t.split(' ')){const nx=line?line+' '+w:w;if(line&&c.measureText(nx).width>max){out.push(line);line=w}else line=nx}if(line)out.push(line);return out}
 function strip(t,tone,note,bad){const c=g(),font=`800 ${sz(17)}${F}`,L=wrap(t,A.W-34,font),lh=sz(17)*1.3,h=L.length*lh+14;
  c.fillStyle=tone==='ok'?(dk()?'#14532d':'#dcfce7'):tone==='no'?(dk()?'#7f1d1d':'#fee2e2'):(dk()?'#1e293b':'#ffffff');A.paint.rrect(8,8,A.W-16,h,12);c.fill();
  c.lineWidth=tone?2.5:1.2;c.strokeStyle=tone==='ok'?OK:tone==='no'?NO:RIM;c.stroke();c.font=font;c.fillStyle=fg();c.textAlign='left';c.textBaseline='top';L.forEach((r,i)=>c.fillText(r,17,15+i*lh));
  let y=8+h+6;if(note){const f2=`700 ${sz(15)}${F}`,L2=wrap(note,A.W-34,f2).slice(0,3);c.font=f2;c.fillStyle=bad?(dk()?'#fca5a5':NO):(dk()?'#86efac':OK);L2.forEach((r,i)=>c.fillText(r,17,y+i*sz(15)*1.3));y+=L2.length*sz(15)*1.3+6}return y}
 function card(r,word,o){o=o||{};const c=g();c.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':o.sel?'#dbeafe':o.dim?'#f1f5f9':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,12);c.fill();
  c.lineWidth=o.no||o.ok||o.sel?3.5:1.6;c.strokeStyle=o.no?NO:o.ok?OK:o.sel?'#1d4ed8':RIM;c.stroke();
  if(o.pic){const th=word?Math.min(r.h*.34,sz(o.n||15)*2.6):0,s=Math.min(r.w*.78,r.h-th-8);icon(c,o.pic,r.x+r.w/2,r.y+5+s/2,s);if(!word)return;r={x:r.x,y:r.y+r.h-th-2,w:r.w,h:th}}
  if(!word)return;let n=sz(o.n||16),L;for(;;){L=wrap(word,r.w-10,`800 ${n}${F}`);if(L.length*n*1.18<=r.h-4||n<=11)break;n--}
  c.font=`800 ${n}${F}`;c.fillStyle=INK;c.textAlign='center';c.textBaseline='middle';L.forEach((s,i)=>c.fillText(s,r.x+r.w/2,r.y+r.h/2+(i-(L.length-1)/2)*n*1.18))}
 return{wrap,strip,card,sz,fg,dk,INK,OK,NO,RIM,F}}
return{DAY,SAY,ROUT,FEEL,HELP,WEEK,DESC,TXT,DONE,QS,icon,PEN}})();
