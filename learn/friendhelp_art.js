/* Data and pictures for flagfriendhelp (helping a friend learn: a clue, not the answer; ages 6-7). Sources: Wood,
   Bruner and Ross (1976), 'The role of tutoring in problem solving', Journal of Child Psychology and Psychiatry 17:
   89-100 (scaffolding: the helper takes over only the parts the learner cannot yet do); Wood and Middleton (1975), 'A
   study of assisted problem-solving', British Journal of Psychology 66: 181-191 (contingent help: after a fail give a
   bit more help, after a success give less); Webb (1989), 'Peer interaction and learning in small groups',
   International Journal of Educational Research 13: 21-39 (being given only the answer, with no explanation, goes
   with less learning; giving explanations helps the explainer); EEF Teaching and Learning Toolkit, peer tutoring
   (about +5 months on average; training tutors to give hints and praise matters). Slips it targets: telling the
   answer or doing it for them; jumping straight to the biggest help; jumping in while a friend is still working;
   carrying on helping after they have got it; unkind words. */
const FRIENDHELP=(()=>{
/* step 1: does it help them think, or do it for them? z = 0 clue, 1 does it for them */
const SAYS=[{t:'The answer is 9.',z:1},{t:'What could you try?',z:0},{t:'Here, I will do it for you.',z:1},{t:'Look at the first sound.',z:0},{t:'Just copy mine.',z:1},{t:'Try counting on from 7.',z:0}];
const BINS=['Helps them think','Does it for them'];
const BWHY=['A clue leaves the thinking to your friend, so they learn how.','If you do it for them, your friend does not learn how to do the next one.'];
/* step 2: the help ladder. Rungs 0-3 get bigger; 4 = step back and say well done */
const RUNGS=['Ask: What could you try?','Give a clue: Look at the straight edges.','Show a different one, then let them try','Do it together, step by step'];
const BACK='Step back: say well done';
/* rounds: who, the friend's state, what was tried last (-1 nothing), the right choice */
const ROUNDS=[{who:'Sam',s:'Sam is stuck on the jigsaw and says: Help!',last:-1,ans:0,face:'stuck'},
 {who:'Sam',s:'You asked. Sam is still stuck.',last:0,ans:1,face:'stuck'},
 {who:'Sam',s:'You gave a clue. Sam is still stuck.',last:1,ans:2,face:'stuck'},
 {who:'Sam',s:'You showed a different one. Now Sam puts the piece in!',last:2,ans:4,face:'happy'},
 {who:'Mia',s:'Mia is stuck and says: I cannot do it.',last:-1,ans:0,face:'stuck'},
 {who:'Mia',s:'You asked. Mia says: Oh, I could try the corners! She finds a piece.',last:0,ans:4,face:'happy'}];
/* step 3: who can do the next one? n = 1 the friend who got a clue, 0 the friend who was told */
const NEXT=[{a:'Ava was told: The answer is 12.',b:'Ben got a clue and worked out 12 himself.',n:1,task:'a new sum'},
 {a:'Leo got a clue: Start with the corners.',b:'Zara had the jigsaw done for her.',n:0,task:'a new jigsaw'},
 {a:'Ollie copied the spelling of cat.',b:'Isla was told: Say the sounds, c-a-t.',n:1,task:'the word hat'}];
/* step 4: what should the helper do now? 0 wait, 1 small clue, 2 say well done */
const SIGNS=[{t:'Sam is counting on his fingers.',z:0,face:'think'},{t:'Mia has stopped and says: I am stuck.',z:1,face:'stuck'},
 {t:'Leo got it right!',z:2,face:'happy'},{t:'Zara is trying a new piece.',z:0,face:'think'},{t:'Ollie tried 3 times. He says: Can you help?',z:1,face:'stuck'}];
const DO=['Wait','Small clue','Say well done'];
const DOWHY=['Your friend is still working. Wait and let them think.','Your friend is stuck. Give the smallest clue.','Your friend did it. No more help: say well done.'];
/* step 5: kind words? k = 1 kind */
const WORDS=[{t:'Good try! Look at this bit again.',k:1},{t:'You are so slow!',k:0},{t:'Everyone gets stuck sometimes.',k:1},{t:'That is easy. Why can you not do it?',k:0},{t:'You did it! You checked it yourself.',k:1}];
const DESC=['A speech bubble with something a helper says, and two boxes: Helps them think, and Does it for them. Drag the bubble to a box, or use the buttons.',
 'A friend who is stuck, and a ladder of help from small at the bottom to big at the top, with Step back beside it. Tap the help to give next.',
 'Two friends. One was told the answer or had it done for them, and one got a clue. Tap the friend who can do the next one.',
 'A friend and what they are doing. Choose what a good helper does now: wait, give a small clue, or say well done.',
 'Something a helper says, and two boxes: Kind and helpful, or Unkind. Drag the words to a box, or use the buttons.'];
const TXT=['A clue, or the answer? Sort what helpers say.','Smallest help first. Only go up if your friend is still stuck.','Who can do the next one on their own?','Is your friend stuck, still trying, or done?','Kind words help a friend keep trying.'];
const DONE=['A clue helps your friend think: What could you try? Doing it for them does not teach them how.',
 'Start small. Go up one step only if your friend is still stuck. When they get it, step back and say well done.',
 'The friend who worked it out with a clue knows how to do the next one. Being told the answer does not teach how.',
 'Still trying? Wait. Stuck? A small clue. Done? Say well done, and no more help.',
 'Kind words praise the trying. Unkind words make a friend want to give up.'];
const QS=[{q:'Your friend is stuck on 8 + 5. What is the best first help?',a:'What could you try?',o:[['It is 13.','tell'],['Give me your pencil, I will do it.','doit']]},
 {q:'You gave a small clue and your friend is still stuck. What now?',a:'Give a bit more help',o:[['Tell the answer','tell'],['Give up and walk away','quit']]},
 {q:'Your friend is still counting on their fingers. What do you do?',a:'Wait and let them think',o:[['Tell them the answer','early'],['Take over','doit']]},
 {q:'Your friend got it right after your clue. What now?',a:'Say well done, no more help',o:[['Give a bigger clue','more'],['Do the next one for them','doit']]},
 {q:'Why is telling the answer not much help?',a:'They cannot do the next one',o:[['Answers are always wrong','myth'],['It takes too long','quit']]},
 {q:'Which helper words are kind?',a:'Good try! Look at this bit again.',o:[['You are so slow!','unkind'],['That is easy!','unkind']]},
 {q:'Your friend is stuck. Which is the smallest help?',a:'Ask: What could you try?',o:[['Do it together','big'],['Show them a different one','big']]}];
/* canvas helpers */
function PEN(A){const INK='#0f172a',OK='#047857',NO='#b91c1c',RIM='#64748b',F='px system-ui,sans-serif',sz=n=>A.narrow?n:Math.round(n*1.15);
 const g=()=>A.ctx,dk=()=>A.col.dark,fg=()=>dk()?'#f1f5f9':INK;
 function wrap(t,max,font){const c=g();c.font=font;const out=[];let line='';for(const w of t.split(' ')){const nx=line?line+' '+w:w;if(line&&c.measureText(nx).width>max){out.push(line);line=w}else line=nx}if(line)out.push(line);return out}
 function strip(t,tone,note,bad){const c=g(),font=`800 ${sz(16)}${F}`,L=wrap(t,A.W-34,font),lh=sz(16)*1.3,h=L.length*lh+14;
  c.fillStyle=tone==='ok'?(dk()?'#14532d':'#dcfce7'):tone==='no'?(dk()?'#7f1d1d':'#fee2e2'):(dk()?'#1e293b':'#ffffff');A.paint.rrect(8,8,A.W-16,h,12);c.fill();
  c.lineWidth=tone?2.5:1.2;c.strokeStyle=tone==='ok'?OK:tone==='no'?NO:RIM;c.stroke();c.font=font;c.fillStyle=fg();c.textAlign='left';c.textBaseline='top';L.forEach((r,i)=>c.fillText(r,17,15+i*lh));
  let y=8+h+6;if(note){const f2=`700 ${sz(14)}${F}`,L2=wrap(note,A.W-34,f2).slice(0,3);c.font=f2;c.fillStyle=bad?(dk()?'#fca5a5':NO):(dk()?'#86efac':OK);L2.forEach((r,i)=>c.fillText(r,17,y+i*sz(14)*1.3));y+=L2.length*sz(14)*1.3+6}return y}
 function box(r,t,o){o=o||{};const c=g();c.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':o.sel?'#dbeafe':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,12);c.fill();
  c.lineWidth=o.no||o.ok||o.sel?3.5:1.6;c.strokeStyle=o.no?NO:o.ok?OK:o.sel?'#1d4ed8':RIM;c.stroke();if(!t)return;let n=sz(o.n||15),L;
  for(;;){L=wrap(t,r.w-14,`800 ${n}${F}`);if(L.length*n*1.2<=r.h-8||n<=10)break;n--}c.font=`800 ${n}${F}`;c.fillStyle=INK;c.textAlign='center';c.textBaseline='middle';
  const y0=o.low?r.y+r.h-L.length*n*1.2/2-6:r.y+r.h/2;L.forEach((s,i)=>c.fillText(s,r.x+r.w/2,y0+(i-(L.length-1)/2)*n*1.2))}
 /* a speech bubble with its tail at the bottom left */
 function bubble(r,t,o){const c=g();box(r,t,o);c.fillStyle=o&&o.sel?'#dbeafe':'#ffffff';c.strokeStyle=RIM;c.lineWidth=1.6;c.beginPath();c.moveTo(r.x+20,r.y+r.h-1);c.lineTo(r.x+14,r.y+r.h+14);c.lineTo(r.x+36,r.y+r.h-1);c.fill();c.stroke()}
 /* a friend's face: stuck, think or happy; shirt colour by name */
 function pal(x,y,s,face,name){const c=g(),u=s/2,shirt={Sam:'#2563eb',Mia:'#db2777',Ava:'#7c3aed',Ben:'#ea580c',Leo:'#0d9488',Zara:'#ca8a04',Ollie:'#16a34a',Isla:'#dc2626'}[name]||'#2563eb';
  c.save();c.translate(x,y);c.fillStyle=shirt;A.paint.rrect(-u*.45,u*.15,u*.9,u*.8,u*.2);c.fill();c.fillStyle='#e0b48a';c.beginPath();c.arc(0,-u*.25,u*.45,0,7);c.fill();c.strokeStyle='#1e293b';c.lineWidth=Math.max(2,u*.06);c.stroke();
  c.fillStyle='#3f2a14';c.beginPath();c.arc(0,-u*.38,u*.45,Math.PI*1.05,Math.PI*1.95);c.fill();c.fillStyle='#1e293b';[-1,1].forEach(d=>{c.beginPath();c.arc(d*u*.16,-u*.25,u*.05,0,7);c.fill()});
  c.lineCap='round';c.beginPath();if(face==='happy')c.arc(0,-u*.12,u*.18,.2,Math.PI-.2);else if(face==='stuck'){c.arc(0,u*.02,u*.16,Math.PI+.4,-.4)}else{c.moveTo(-u*.12,-u*.05);c.lineTo(u*.12,-u*.08)}c.stroke();
  if(face==='think'){c.fillStyle=dk()?'#cbd5e1':'#64748b';[[.55,-.7,.07],[.7,-.9,.1]].forEach(([a,b,r])=>{c.beginPath();c.arc(u*a,u*b,u*r,0,7);c.fill()})}
  if(face==='stuck'){c.fillStyle='#38bdf8';c.beginPath();c.arc(u*.4,-u*.45,u*.07,0,7);c.fill()}
  if(name){c.font=`800 ${sz(13)}${F}`;c.fillStyle='#ffffff';c.textAlign='center';c.textBaseline='middle';c.fillText(name,0,u*.55)}c.restore()}
 /* the help ladder: rungs from the bottom (small help) to the top (big help) */
 function ladder(r,mark){const c=g(),n=RUNGS.length,gap=6,rh=(r.h-gap*(n-1))/n,out=[];c.strokeStyle=dk()?'#94a3b8':'#475569';c.lineWidth=4;c.beginPath();c.moveTo(r.x-6,r.y);c.lineTo(r.x-6,r.y+r.h);c.moveTo(r.x+r.w+6,r.y);c.lineTo(r.x+r.w+6,r.y+r.h);c.stroke();
  for(let i=0;i<n;i++){const q={i,x:r.x,y:r.y+r.h-(i+1)*rh-i*gap,w:r.w,h:rh};out.push(q);box(q,(i+1)+'. '+RUNGS[i],{n:13,no:mark.bad===i,ok:mark.used.includes(i),sel:mark.last===i})}return out}
 return{wrap,strip,box,bubble,pal,ladder,sz,fg,dk,INK,OK,NO,RIM,F}}
return{SAYS,BINS,BWHY,RUNGS,BACK,ROUNDS,NEXT,SIGNS,DO,DOWHY,WORDS,DESC,TXT,DONE,QS,PEN}})();
