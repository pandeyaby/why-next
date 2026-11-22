/* Data, text helpers and drawings for flagcpa (concrete, then pictures, then symbols, ages 6–8; Bruner (1966)
   enactive, iconic and symbolic modes; NCETM concrete-pictorial-abstract approach; EEF (2020) Improving Mathematics
   in the Early Years and Key Stage 1 and EEF (2017) Improving Mathematics in Key Stages 2 and 3, recommendation 2:
   use manipulatives and representations, and link them to the symbols; NC Year 2 division with materials and the
   ÷ and = signs). Slips it targets: "start with the symbols", "objects are babyish", "a picture must look real",
   "unequal groups still count as sharing", mixing up the 3 groups with 3 in each group, reading ÷ as − or ×, and
   guessing or giving up instead of going back a step. */
const CPAX=(()=>{
const box=(x,y,w,h)=>({x,y,w,h}),inside=(p,b)=>!!b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
function kit(A,K){const fs=n=>Math.round(A.narrow?n:n*1.16);
 function word(s,x,y,n,o){o=o||{};const g=A.ctx;g.font=`${o.b||800} ${fs(n)}px system-ui,sans-serif`;g.fillStyle=o.c||K.ink;g.textAlign='center';g.textBaseline='middle';
  const out=[];let r='';String(s).split(' ').forEach(w=>{const t=r?r+' '+w:w;if(o.w&&g.measureText(t).width>o.w&&r){out.push(r);r=w}else r=t});out.push(r);
  const lh=fs(n)*1.2;out.forEach((t,i)=>g.fillText(t,x,y+(i-(out.length-1)/2)*lh))}
 function pad(b,fill,mode){const g=A.ctx;g.fillStyle=mode==='ok'?'#d1fae5':mode==='ko'?'#fee2e2':fill||'#ffffff';A.paint.rrect(b.x,b.y,b.w,b.h,Math.min(12,b.h/3));g.fill();
  g.lineWidth=mode?3:1.6;g.strokeStyle={ok:K.ok,ko:K.ko,sel:K.sel}[mode]||K.rim;g.stroke()}
 function lay(n,cols,a,gap){gap=gap||8;const rows=Math.ceil(n/cols),w=(a.w-gap*(cols-1))/cols,h=(a.h-gap*(rows-1))/rows;
  return Array.from({length:n},(_,i)=>box(a.x+(i%cols)*(w+gap),a.y+Math.floor(i/cols)*(h+gap),w,h))}
 return{fs,word,pad,lay}}
/* 2. which picture matches the plates? g = dots in each ring; s = slip */
const PICS=[{g:[3,3,3,3],s:'swap',t:'4 rings of 3'},{g:[4,4,4],t:'3 rings of 4'},{g:[5,4,3],s:'unfair',t:'5, 4 and 3'},{g:[12],s:'nogroups',t:'12 dots, no rings'}];
/* 3. tiles for the number sentence; target 12 ÷ 3 = 4 */
const TILES=['12','3','4','÷','−','×','9'],WANT=['12','÷','3','4'];
/* 4. what each number stands for in the plates story; n = the number it matches */
const MEAN=[{t:'All the strawberries',n:'12'},{t:'The plates',n:'3'},{t:'Strawberries on one plate',n:'4'},{t:'Strawberries left over',n:null}];
/* 5. Zak is stuck on 15 ÷ 5 */
const STUCK=[{t:'Go back: draw it with dots',ok:1},{t:'Guess a number',s:'guess'},{t:'Give up on it',s:'giveup'},{t:'Copy a friend’s answer',s:'copy'}];
const ANS=[{v:3,ok:1},{v:5,s:'groups'},{v:10,s:'minus'},{v:20,s:'plus'}];
const DESC=['12 strawberries, 3 plates. Drag one strawberry at a time onto a plate, or tap a plate. Keep it fair.',
 'Which drawing shows what you did with the plates? Tap it. Then tap the drawing that is quicker to make.',
 'Now write it with symbols. Drag a tile into each box, from left to right, or tap the tiles.',
 'Each number stands for something. Drag each number onto what it means in the plates story.',
 'Zak meets 15 ÷ 5 and the symbols make no sense to him. Tap what he should do.','Challenge.'];
const DONE=['Moving real things comes first: 12 shared fairly onto 3 plates is 4 on each plate.',
 'A quick drawing stands for the real things: 3 rings with 4 dots each. Dots are enough; it does not need to look real.',
 '12 ÷ 3 = 4 says the same thing as the plates and the drawing, with symbols.',
 '12 is all the strawberries, 3 is the plates and 4 is the number on each plate. Each symbol stands for something real.',
 'When symbols are confusing, go back a step to a drawing or real things. Zak drew 5 rings and found 15 ÷ 5 = 3.'];
const QS=[{q:'Ali meets a new kind of sum, and the symbols make no sense. What should he do first?',a:'Show it with objects or a drawing',o:[['Guess the answer','guess'],['Stare at the symbols until it clicks','symfirst']]},
 {q:'10 cakes are shared fairly between 2 plates. Which drawing shows it?',a:'2 rings with 5 dots each',o:[['5 rings with 2 dots each','swap2'],['2 rings with 6 and 4 dots','unequal']]},
 {q:'20 sweets are shared between 4 bags: 20 ÷ 4 = 5. What does the 4 stand for?',a:'The 4 bags',o:[['The sweets in each bag','each'],['4 sweets left over','leftover']]},
 {q:'When you learn a new idea, which step comes first?',a:'Real things you can move',o:[['The written symbols','symfirst'],['A test','symfirst']]},
 {q:'Are counters and blocks only for children who are stuck?',a:'No, anyone can use them to learn a new idea',o:[['Yes, they are babyish','babyish'],['Yes, clever children skip them','babyish']]},
 {q:'Your drawing for 12 ÷ 3 shows 3 rings of 4 dots. Do you need to draw real strawberries?',a:'No, dots and rings are enough',o:[['Yes, it must look real','neat2'],['Yes, with leaves and seeds','neat2']]},
 {q:'Mia shares 12 sweets between 3 friends: 5, 4 and 3. Has she shown 12 ÷ 3?',a:'No, the groups must be equal',o:[['Yes, all 12 are shared','unequal'],['Yes, 12 take away 3 is 9','minus']]}];
/* ---------- drawings ---------- */
function berry(g,x,y,r){g.save();g.fillStyle='#dc2626';g.strokeStyle='#7f1d1d';g.lineWidth=1.2;g.beginPath();g.moveTo(x,y+r);g.bezierCurveTo(x-r*1.2,y+r*.2,x-r,y-r*.8,x,y-r*.6);g.bezierCurveTo(x+r,y-r*.8,x+r*1.2,y+r*.2,x,y+r);g.fill();g.stroke();
 g.fillStyle='#15803d';g.beginPath();g.ellipse(x-r*.3,y-r*.7,r*.35,r*.15,-.4,0,7);g.ellipse(x+r*.3,y-r*.7,r*.35,r*.15,.4,0,7);g.fill();g.fillStyle='#fde68a';[[-.3,0],[.3,0],[0,.4]].forEach(([u,v])=>{g.beginPath();g.arc(x+u*r,y+v*r,r*.08,0,7);g.fill()});g.restore()}
function plate(g,x,y,w,h){g.save();g.fillStyle='#ffffff';g.strokeStyle='#64748b';g.lineWidth=2;g.beginPath();g.ellipse(x,y,w/2,h/2,0,0,7);g.fill();g.stroke();g.beginPath();g.ellipse(x,y,w*.38,h*.36,0,0,7);g.strokeStyle='#cbd5e1';g.stroke();g.restore()}
/* rings with n dots each, drawn inside box b */
function rings(g,b,groups,ink,nogroups){const n=groups.length,cw=b.w/n,r=Math.min(cw*.42,b.h*.42);groups.forEach((d,i)=>{const cx=b.x+cw*(i+.5),cy=b.y+b.h/2;
  if(!nogroups){g.strokeStyle=ink;g.lineWidth=2;g.beginPath();g.arc(cx,cy,r,0,7);g.stroke()}
  const per=nogroups?d:d,cols=nogroups?6:Math.ceil(Math.sqrt(per)),rows=Math.ceil(per/cols),dot=nogroups?Math.min(b.w/30,b.h/12):Math.min(r*.22,6);
  for(let k=0;k<per;k++){const col=k%cols,row=Math.floor(k/cols),sx=nogroups?b.w*.12:r*1.0,sy=nogroups?b.h*.3:r*1.0;
   const x=nogroups?b.x+b.w*.15+col*(b.w*.7/(cols-1)):cx+(cols>1?(col/(cols-1)-.5)*sx:0),y=nogroups?cy+(row-(rows-1)/2)*sy*.9:cy+(rows>1?(row/(rows-1)-.5)*sy:0);
   g.fillStyle='#1f2937';g.beginPath();g.arc(x,y,dot,0,7);g.fill()}})}
function child(g,x,y,s,col,ok){g.save();g.fillStyle=col;g.beginPath();g.arc(x,y-s*.28,s*.2,0,7);g.fill();g.beginPath();g.moveTo(x-s*.3,y+s*.4);g.quadraticCurveTo(x,y-s*.15,x+s*.3,y+s*.4);g.closePath();g.fill();
 g.strokeStyle='#ffffff';g.lineWidth=1.8;g.beginPath();if(ok)g.arc(x,y-s*.3,s*.09,.4,2.7);else{g.moveTo(x-s*.08,y-s*.2);g.lineTo(x+s*.08,y-s*.2)}g.stroke();
 g.fillStyle='#ffffff';[-1,1].forEach(k=>{g.beginPath();g.arc(x+k*s*.07,y-s*.33,s*.025,0,7);g.fill()});g.restore()}
return{box,inside,kit,PICS,TILES,WANT,MEAN,STUCK,ANS,DESC,DONE,QS,berry,plate,rings,child}})();
