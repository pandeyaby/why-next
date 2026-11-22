/* Data, text helpers and drawings for flagownex (making my own example of a new idea, ages 8–9; Watson and Mason
   (2005) learners generating examples; Rawson and Dunlosky (2016) and Zamary, Rawson and Dunlosky (2016): making
   examples helps when the examples are checked, because learners often accept wrong ones; EEF (2021) metacognition
   and self-regulated learning; England NC Y2 odd and even, Y2 2-D shapes in different orientations, KS1 grammar:
   noun). Slips it targets: repeating the taught example counts as understanding, a changed spelling or a capital
   makes a copy new, an odd number "is even enough", a turned square is "a diamond", checking an example by how it
   looks or how big it is, and keeping an example that does not fit because it is your own. */
const OWNX=(()=>{
const box=(x,y,w,h)=>({x,y,w,h}),inside=(p,b)=>!!b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
function nib(A,K){const sz=n=>Math.round(A.narrow?n:n*1.15);
 function write(s,x,y,n,o){o=o||{};const g=A.ctx;g.font=`${o.b||800} ${sz(n)}px system-ui,sans-serif`;g.fillStyle=o.c||K.ink;g.textAlign=o.al||'center';g.textBaseline='middle';
  const out=[];let row='';String(s).split(' ').forEach(w=>{const t=row?row+' '+w:w;if(o.w&&g.measureText(t).width>o.w&&row){out.push(row);row=w}else row=t});out.push(row);
  const lh=sz(n)*1.2;out.forEach((t,i)=>g.fillText(t,x,y+(i-(out.length-1)/2)*lh))}
 function plate(b,fill,st){const g=A.ctx;g.fillStyle=st==='ok'?'#d1fae5':st==='ko'?'#fee2e2':fill||'#ffffff';A.paint.rrect(b.x,b.y,b.w,b.h,Math.min(12,b.h/3));g.fill();
  g.lineWidth=st?3:1.6;g.strokeStyle={ok:K.ok,ko:K.ko,sel:K.sel}[st]||K.rim;g.stroke()}
 function lay(n,cols,a,gap){gap=gap||8;const rows=Math.ceil(n/cols),w=(a.w-gap*(cols-1))/cols,h=(a.h-gap*(rows-1))/rows;
  return Array.from({length:n},(_,i)=>box(a.x+(i%cols)*(w+gap),a.y+Math.floor(i/cols)*(h+gap),w,h))}
 return{sz,write,plate,lay}}
/* the new ideas Miss Lee teaches */
const IDEA=['A noun names a person, place or thing. Miss Lee’s example: dog.','An even number makes pairs with none left over. Miss Lee’s example: 6.',
 'A square has 4 equal sides and 4 square corners. Miss Lee’s is small: 1 space a side.','Fix each example so it fits the rule.','Check each example against the rule.'];
/* 1. copy (k 0) or a new example of my own (k 1) */
const NOUN=[{t:'dog',k:0},{t:'castle',k:1},{t:'the dog',k:0},{t:'grandma',k:1},{t:'Dog!',k:0},{t:'spoon',k:1}];
/* 2. numbers to test */
const NUMS=[6,7,8,9,10,13,14];
/* 3. squares on the dot grid (col,row), plus the button presets */
const TAUGHT=[[0,0],[1,0],[1,1],[0,1]];
const PRESET=[{t:'Bigger square, 2 spaces a side',p:[[0,0],[2,0],[2,2],[0,2]]},{t:'Turned square',p:[[3,1],[5,2],[4,4],[2,3]]},
 {t:'Long rectangle',p:[[0,1],[4,1],[4,3],[0,3]]},{t:'Copy of Miss Lee’s square',p:[[3,2],[4,2],[4,3],[3,3]]}];
/* 4. broken examples and fixes: ok = fits and is new, s = slip */
const BROKE=[{who:'Zak',rule:'Noun',ex:'run',fix:[{t:'runner',ok:1,why:'A runner is a person, so it is a noun.'},{t:'jump',s:'verb'},{t:'dog',s:'copy'}]},
 {who:'Ivy',rule:'Even number',ex:'11',fix:[{t:'13',s:'oddfix'},{t:'12',ok:1,why:'12 makes 6 pairs with none left over.'},{t:'6',s:'copy'}]},
 {who:'Raj',rule:'Square',ex:'a door',fix:[{t:'a ruler',s:'thin'},{t:'Miss Lee’s square',s:'copy'},{t:'a square sticky note',ok:1,why:'A square sticky note has 4 equal sides and 4 square corners.'}]}];
/* 5. check with the rule, not by looks */
const TEST=[{q:'Is “castle” a noun?',r:[{t:'Yes: it names a place',ok:1},{t:'Yes: it is a long word',s:'long'},{t:'Yes: Miss Lee said dog',s:'copy2'}]},
 {q:'Is 14 even?',r:[{t:'Yes: it is a big number',s:'big'},{t:'Yes: 14 makes 7 pairs, none left over',ok:1},{t:'Yes: it looks even',s:'looks'}]},
 {q:'Is the turned shape a square?',r:[{t:'No: squares sit flat',s:'turn'},{t:'Yes: it looks a bit like one',s:'looks'},{t:'Yes: 4 equal sides and 4 square corners',ok:1}]}];
const ASK=['Sort each answer. Is it a copy of Miss Lee’s example, or a new example of your own? Drag it to a box, or tap it and then tap a box.',
 'Drag a number into the tester, or tap it. The tester puts that many counters into pairs.',
 'Tap 4 dots, going round, to make your own square. Or use the buttons below.',
 'Drag the fix that fits the rule onto the example, or tap it.','Drag the reason that checks the example against the rule, or tap it.','Challenge.'];
const GOT=['Saying the teacher’s example again only shows you can remember it. A new example of your own shows you understand the idea.',
 'Your own example is a test. Check it against the rule: an odd number leaves 1 counter over, so it does not fit.',
 'A bigger square or a turned square is still a square: 4 equal sides and 4 square corners. Make examples that look different.',
 'When your example does not fit, fix it and check it again. A copy is not a fix.',
 'Check an example against the rule, not by how it looks or how big it is.'];
const QS=[{q:'Miss Lee says, “A verb is a doing word, like run.” Which is the best example of your own?',a:'“swim”',o:[['“run”','copy'],['“table”','notverb']]},
 {q:'Kai’s own example of an even number is 15. What should he do?',a:'Check it: 15 leaves 1 over, so pick a new one',o:[['Keep it: it is his own','keep'],['Use Miss Lee’s 6 instead','copy']]},
 {q:'Why make an example of your own?',a:'It shows you understand the idea, not just remember it',o:[['It is quicker than listening','quick'],['So you never need to check','nocheck']]},
 {q:'Is a square turned on its corner still a square?',a:'Yes: it still has 4 equal sides and 4 square corners',o:[['No, it is a diamond now','turn'],['Only if it is small','small']]},
 {q:'How do you check your own example?',a:'Test it against the rule',o:[['See if it looks right','looks'],['See if it is long or big','size']]},
 {q:'The idea: rhyming words end with the same sound, like cat and hat. Which is a new example?',a:'“bee” and “tree”',o:[['“cat” and “hat”','copy'],['“bee” and “bin”','rhyme']]},
 {q:'Leo’s example does not fit the rule. What now?',a:'Fix it, then check it again',o:[['Give up on the idea','giveup'],['Keep it: nobody will check','keep']]}];
/* ---------- drawings ---------- */
function counter(g,x,y,r,bad){g.save();g.fillStyle=bad?'#dc2626':'#2563eb';g.beginPath();g.arc(x,y,r,0,7);g.fill();g.lineWidth=2;g.strokeStyle=bad?'#7f1d1d':'#1e3a8a';g.stroke();g.restore()}
function teacher(g,x,y,s){g.save();g.fillStyle='#7c3aed';g.beginPath();g.arc(x,y-s*.42,s*.17,0,7);g.fill();g.beginPath();g.moveTo(x-s*.28,y+s*.38);g.quadraticCurveTo(x,y-s*.3,x+s*.28,y+s*.38);g.closePath();g.fill();
 g.fillStyle='#ffffff';[-1,1].forEach(k=>{g.beginPath();g.arc(x+k*s*.06,y-s*.45,s*.022,0,7);g.fill()});g.strokeStyle='#ffffff';g.lineWidth=1.6;g.beginPath();g.arc(x,y-s*.43,s*.08,.4,2.7);g.stroke();g.restore()}
function rightMark(g,a,b,c,s){const u=[(a.x-b.x),(a.y-b.y)],v=[(c.x-b.x),(c.y-b.y)],lu=Math.hypot(...u),lv=Math.hypot(...v);if(!lu||!lv)return;
 const p=[b.x+u[0]/lu*s,b.y+u[1]/lu*s],q=[b.x+v[0]/lv*s,b.y+v[1]/lv*s];g.save();g.strokeStyle='#047857';g.lineWidth=1.6;g.beginPath();g.moveTo(p[0],p[1]);g.lineTo(p[0]+q[0]-b.x,p[1]+q[1]-b.y);g.lineTo(q[0],q[1]);g.stroke();g.restore()}
return{box,inside,nib,IDEA,NOUN,NUMS,TAUGHT,PRESET,BROKE,TEST,ASK,GOT,QS,counter,teacher,rightMark}})();
