/* Data, text helpers and drawings for flagleftout (when I feel left out, ages 6–7; PSHE Association Programme of
   Study (2020) KS1 relationships: recognise when they or others feel lonely and what to do; DfE Relationships
   Education and Health Education statutory guidance (2019): friendships have ups and downs, isolation and loneliness
   can affect children and it is very important to talk to an adult; Anti-Bullying Alliance: leaving someone out on
   purpose, again and again, is a form of bullying). Slips it targets: "I don't care" means fine, hurting back gets
   you in, standing and staring until they give in, a friend playing with someone new means the friendship is over,
   keeping repeated exclusion secret, and not noticing other children who are on their own. */
const LOUT=(()=>{
const box=(x,y,w,h)=>({x,y,w,h}),inside=(p,b)=>!!b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
function brush(A,K){const px=n=>Math.round(A.narrow?n:n*1.15);
 function say(s,x,y,n,o){o=o||{};const g=A.ctx;g.font=`${o.b||800} ${px(n)}px system-ui,sans-serif`;g.fillStyle=o.c||K.ink;g.textAlign='center';g.textBaseline='middle';
  const lines=[];let cur='';String(s).split(' ').forEach(w=>{const t=cur?cur+' '+w:w;if(o.w&&g.measureText(t).width>o.w&&cur){lines.push(cur);cur=w}else cur=t});lines.push(cur);
  const lh=px(n)*1.2;lines.forEach((t,i)=>g.fillText(t,x,y+(i-(lines.length-1)/2)*lh))}
 function tile(b,fill,mark){const g=A.ctx;g.fillStyle=mark==='ok'?'#d1fae5':mark==='ko'?'#fee2e2':fill||'#ffffff';A.paint.rrect(b.x,b.y,b.w,b.h,Math.min(12,b.h/3));g.fill();
  g.lineWidth=mark?3:1.6;g.strokeStyle={ok:K.ok,ko:K.ko,sel:K.sel}[mark]||K.rim;g.stroke()}
 function grid(n,cols,a,gap){gap=gap||8;const rows=Math.ceil(n/cols),w=(a.w-gap*(cols-1))/cols,h=(a.h-gap*(rows-1))/rows;
  return Array.from({length:n},(_,i)=>box(a.x+(i%cols)*(w+gap),a.y+Math.floor(i/cols)*(h+gap),w,h))}
 return{px,say,tile,grid}}
/* 1. feeling words for Mia: ok = fits what the picture shows, s = slip for a word that does not fit */
const FEEL=[{t:'Left out',ok:1},{t:'Proud',s:'proud'},{t:'Lonely',ok:1},{t:'Excited',s:'excited'},{t:'Sad',ok:1},{t:'Sleepy',s:'sleepy'}];
/* 2. next steps: ok = helps, s = slip */
const STEP=[{t:'Ask: “Can I play too?”',sh:'Asked to join',ok:1},{t:'Knock their tower down',s:'hurt'},{t:'Find someone else to play with',sh:'Found someone else',ok:1},
 {t:'Say: “I don’t care” and hide',s:'hide'},{t:'Start a new game and ask Ben',sh:'Started a new game',ok:1},{t:'Shout: “You’re not my friend!”',s:'mean'}];
/* 3. the playground: who is on their own? x, y as parts of the map */
const SPOT=[{n:'Tom, Zoe and Raj',x:.27,y:.3,k:3,s:'full'},{n:'Kai and Isla',x:.74,y:.3,k:2,s:'pair'},{n:'Ben',x:.24,y:.66,k:1,ok:1,w:'his own on the bench'},{n:'Lily',x:.76,y:.64,k:1,ok:1,w:'her own by the tree'}];
/* 4. just once, or keeps happening / on purpose (k 0 = just once: try a step; k 1 = tell a grown-up) */
const TALE=[{t:'The game was full today',sh:'Game full',k:0},{t:'Jo says “Nobody play with Mia” every day',sh:'Jo, every day',k:1},
 {t:'Her friend played with someone new today',sh:'New friend',k:0},{t:'Kids laugh and run off each time Mia comes',sh:'Laugh and run',k:1},
 {t:'Nobody saw Mia waiting today',sh:'Nobody saw',k:0},{t:'Mia has been alone every playtime this week',sh:'Alone all week',k:1}];
/* 5. my plan: k = which line the chip goes on, s = slip */
const LINE=['I feel …','I can …','If it keeps happening, I tell …'];
const CHIP=[{t:'left out',k:0},{t:'ask “Can I play?”',k:1},{t:'my teacher',k:2},{t:'lonely',k:0},{t:'push them',s:'hurt'},{t:'find someone on their own',k:1},
 {t:'Mum, Dad or my carer',k:2},{t:'nobody',s:'nobody'},{t:'start a new game',k:1},{t:'the playground helper',k:2}];
const INTRO=['Mia sees her friends playing without her. Drag the 3 words that fit how Mia feels into her thought cloud, or tap them.',
 'What can Mia do next? Drag the 3 steps that help into the Helps box, or tap them.',
 'Mia asked, but the game is full today. Drag Mia to a child who is on their own, or tap that child.',
 'Six things that happened to Mia. Drag each one to Just once, or to Keeps happening: tell a grown-up.',
 'Make your own plan. Drag a chip onto each line, or tap a chip.','Challenge.'];
const WELL=['Being left out can feel sad and lonely. It is a real feeling, and it is OK to name it.',
 'Asking, finding someone else or starting a new game can help. Hurting back, being mean or hiding makes it worse.',
 'When you feel left out, look around. Someone else may be on their own too. Ask them to play.',
 'Once is a time to try a step. If it keeps happening, or someone does it on purpose, tell a grown-up.',
 'You have a plan: name the feeling, try a helpful step, and tell a grown-up if it keeps happening.'];
const QS=[{q:'Ali sees his friends playing without him. His tummy feels heavy. What is he feeling?',a:'Left out',o:[['Excited','excited'],['Proud','proud']]},
 {q:'Ali feels left out. What could help?',a:'Ask, “Can I play too?”',o:[['Knock their game over','hurt'],['Say “I don’t care” and hide','hide']]},
 {q:'Ali asked. The game is full today. What can he do now?',a:'Find someone else to play with',o:[['Stand and stare until they let him in','stare'],['Tell them they are mean','mean']]},
 {q:'Every day, Jo tells everyone not to play with Ali. What should Ali do?',a:'Tell a grown-up',o:[['Keep it a secret','secret'],['Push Jo','hurt']]},
 {q:'Is it OK to feel sad when you are left out?',a:'Yes, it is a real feeling',o:[['No, only babies feel that','baby'],['No, you should pretend you don’t mind','hide']]},
 {q:'Ali’s friend played with a new friend today. Does that mean she does not like Ali now?',a:'No, friends can play with others too',o:[['Yes, she is not his friend now','over'],['Yes, so Ali should be mean to the new friend','mean']]},
 {q:'Sam is on his own on the bench. What could Ali do?',a:'Ask Sam, “Do you want to play?”',o:[['Walk past him','pass'],['Tell Sam to go away','mean']]}];
/* ---------- drawings ---------- */
function child(g,x,y,s,col,mood){g.save();g.fillStyle=col;g.beginPath();g.arc(x,y-s*.28,s*.2,0,7);g.fill();
 g.beginPath();g.moveTo(x-s*.3,y+s*.4);g.quadraticCurveTo(x,y-s*.15,x+s*.3,y+s*.4);g.closePath();g.fill();
 g.strokeStyle='#ffffff';g.lineWidth=1.8;g.beginPath();if(mood>0)g.arc(x,y-s*.3,s*.09,.4,2.7);else if(mood<0)g.arc(x,y-s*.16,s*.08,3.6,5.8);else{g.moveTo(x-s*.07,y-s*.21);g.lineTo(x+s*.07,y-s*.21)}g.stroke();
 g.fillStyle='#ffffff';[-1,1].forEach(k=>{g.beginPath();g.arc(x+k*s*.07,y-s*.33,s*.025,0,7);g.fill()});g.restore()}
function heart(g,x,y,r,fill){g.save();g.beginPath();g.moveTo(x,y+r*.9);g.bezierCurveTo(x-r*1.4,y-r*.1,x-r*.7,y-r*1.1,x,y-r*.45);g.bezierCurveTo(x+r*.7,y-r*1.1,x+r*1.4,y-r*.1,x,y+r*.9);g.closePath();
 g.fillStyle='#ffffff';g.fill();g.save();g.clip();g.fillStyle='#e11d48';g.fillRect(x-r*1.5,y+r*.9-r*1.9*fill,r*3,r*1.9*fill);g.restore();g.lineWidth=2;g.strokeStyle='#9f1239';g.stroke();g.restore()}
function cloud(g,b){g.save();g.fillStyle='#ffffff';g.strokeStyle='#64748b';g.lineWidth=1.6;const r=Math.min(b.h*.22,b.w*.12);g.beginPath();
 for(let i=0;i<8;i++){const a=i/8*Math.PI*2;g.moveTo(b.x+b.w/2+Math.cos(a)*(b.w/2-r)+r,b.y+b.h/2+Math.sin(a)*(b.h/2-r));g.arc(b.x+b.w/2+Math.cos(a)*(b.w/2-r),b.y+b.h/2+Math.sin(a)*(b.h/2-r),r,0,7)}
 g.fill();g.stroke();g.fillRect(b.x+r,b.y+r,b.w-2*r,b.h-2*r);g.restore()}
function bench(g,x,y,s){g.save();g.fillStyle='#92400e';g.fillRect(x-s*.6,y+s*.15,s*1.2,s*.1);g.fillRect(x-s*.5,y+s*.25,s*.08,s*.25);g.fillRect(x+s*.42,y+s*.25,s*.08,s*.25);g.restore()}
function tree(g,x,y,s){g.save();g.fillStyle='#78350f';g.fillRect(x+s*.35,y-s*.1,s*.12,s*.55);g.fillStyle='#15803d';g.beginPath();g.arc(x+s*.41,y-s*.25,s*.3,0,7);g.fill();g.restore()}
function grownup(g,x,y,s){g.save();g.fillStyle='#0f766e';g.beginPath();g.arc(x,y-s*.42,s*.17,0,7);g.fill();g.fillRect(x-s*.2,y-s*.22,s*.4,s*.6);g.fillStyle='#fde047';g.fillRect(x-s*.2,y-s*.08,s*.4,s*.1);g.restore()}
return{box,inside,brush,FEEL,STEP,SPOT,TALE,LINE,CHIP,INTRO,WELL,QS,child,heart,cloud,bench,tree,grownup}})();
