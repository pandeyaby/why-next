/* Data, text helpers and drawings for flagjot (jot it down so I don't have to hold it, ages 8–10; working memory
   holds only a few items at once: Cowan 2001, Gathercole & Alloway 2008 for children; cognitive offloading: Risko &
   Gilbert 2016; EEF Metacognition and self-regulated learning (2021) and Improving Mathematics in Key Stages 2 and 3
   (2017) on jottings and recording in-between results; DfE National Curriculum (2013) Year 3 to 4 two-step problems).
   Slips it targets: "I can hold it all in my head", copying out the whole question, jotting facts that do not matter,
   not writing the in-between answer (or starting step 2 from the original number), and jotting bare numbers. */
const JOT=(()=>{
const box=(x,y,w,h)=>({x,y,w,h}),inside=(p,b)=>!!b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
function kit(A,K){const px=n=>Math.round(A.narrow?n:n*1.15);
 function words(s,x,y,n,o){o=o||{};const g=A.ctx;g.font=`${o.b||800} ${px(n)}px system-ui,sans-serif`;g.fillStyle=o.c||K.ink;g.textAlign=o.al||'center';g.textBaseline='middle';
  const rows=[];let line='';for(const w of String(s).split(' ')){const t=line?line+' '+w:w;if(o.w&&g.measureText(t).width>o.w&&line){rows.push(line);line=w}else line=t}rows.push(line);
  const lh=px(n)*1.22;rows.forEach((t,i)=>g.fillText(t,x,y+(i-(rows.length-1)/2)*lh))}
 function card(b,fill,state){const g=A.ctx;g.fillStyle=state==='ok'?'#d1fae5':state==='ko'?'#fee2e2':fill||K.card;A.paint.rrect(b.x,b.y,b.w,b.h,Math.min(10,b.h/3));g.fill();
  g.lineWidth=state?3:1.5;g.strokeStyle={ok:K.ok,ko:K.ko,sel:K.sel}[state]||K.rim;g.stroke()}
 /* lay chips out in rows inside an area; returns one box per text */
 function flow(list,area,n){const g=A.ctx;g.font=`800 ${px(n)}px system-ui,sans-serif`;const h=px(n)*2.1,gap=6,out=[];let x=area.x,y=area.y;
  list.forEach(t=>{const w=Math.min(area.w,g.measureText(t).width+px(16));if(x+w>area.x+area.w){x=area.x;y+=h+gap}out.push(box(x,y,w,h));x+=w+gap});return out}
 return{px,words,card,flow}}
/* 1. the coach's message: six facts */
const MSG=['Swim club is on Thursday','at 4 o’clock','bring £3','bring goggles','bring a towel','meet at Gate B'],SHORT=['Thursday','4 o’clock','£3','goggles','towel','Gate B'];
/* 2. Ria's apples: which facts change the answer */
const APPLE=[{t:'3 bags',need:true,j:'3 bags'},{t:'6 apples in each bag',need:true,j:'6 apples in each'},{t:'the bags are red',slip:'colour'},
 {t:'on Monday',slip:'day'},{t:'eats 2 apples',need:true,j:'eats 2'},{t:'Copy the whole question',slip:'copy'}];
/* 3. two steps: number tiles with the slip each wrong one shows */
const STEP=[{q:'Step 1: how many apples in 3 bags of 6?',tiles:[[9,'add'],[18,''],[12,'times']],j:'18 apples in all'},
 {q:'Step 2: Ria eats 2. How many are left?',tiles:[[4,'wrongstart'],[20,'addinstead'],[16,'']],j:'16 left (answer)'}];
/* 4. a full head: the chairs problem */
const CHAIRS=['5 tables','4 chairs at each table','3 chairs are broken','How many good chairs?'];
/* 5. bare numbers and what they mean */
const NUMS=[[3,'bags'],[6,'apples in a bag'],[18,'apples in all'],[2,'apples eaten']];
const DESC=['The coach gives a message with 6 facts. Drag each fact into your head or onto the jotter. Your head has 4 spaces.',
 'Ria’s apple question has 6 cards. Drag only the facts that change the answer onto the jotter.',
 'Two steps. Drag the right number onto the jotter for step 1, then for step 2. The jotter keeps the in-between answer.',
 'Your head is full of facts from the chairs question. Drag facts onto the jotter to make room, then tap Work it out.',
 'Ria jotted only numbers. Drag each label onto the number it goes with.','Challenge.'];
const DONE=['Your head holds only a few things. The jotter keeps the rest safe.','Jot the numbers and what they mean. Leave out facts that do not change the answer.',
 'Jot each in-between answer. Step 2 starts from it.','Jotting facts down frees room in your head to think about the next step.',
 'Jot what each number means, not just the number.'];
const QS=[{q:'A question has 5 numbers and 3 steps. What helps most?',a:'Jot the facts and each in-between answer',o:[['Hold it all in my head','overflow'],['Copy out the whole question','copy']]},
 {q:'Step 1 gave 3 × 6 = 18 apples. Step 2: take away 2. Where do you start?',a:'From 18, the in-between answer',o:[['From 6','wrongstart'],['From 3','wrongstart']]},
 {q:'“Ria has 3 red bags of 6 apples.” Which part do you NOT need to jot?',a:'The bags are red',o:[['3 bags','need'],['6 apples in each bag','need']]},
 {q:'Your jotter says only 3, 6, 2. What is missing?',a:'What each number means',o:[['More numbers','label'],['Nothing, it is fine','label']]},
 {q:'Your head is full and you need to work out the next step. What do you do?',a:'Jot some facts down',o:[['Try harder to hold them all','full'],['Guess the answer','guess']]},
 {q:'3 bags with 6 apples in each. How many apples?',a:'18',o:[['9','add'],['12','times']]},
 {q:'Why does jotting help you solve a problem?',a:'It frees room in my head to think',o:[['It is only for the teacher','why'],['It makes the numbers smaller','why']]}];
/* ---------- drawings ---------- */
function bubble(g,b){g.save();g.fillStyle='#ede9fe';g.strokeStyle='#6d28d9';g.lineWidth=2;const r=Math.min(b.w,b.h)*.18;g.beginPath();
 g.moveTo(b.x+r,b.y);g.arcTo(b.x+b.w,b.y,b.x+b.w,b.y+b.h,r);g.arcTo(b.x+b.w,b.y+b.h,b.x,b.y+b.h,r);g.arcTo(b.x,b.y+b.h,b.x,b.y,r);g.arcTo(b.x,b.y,b.x+b.w,b.y,r);g.closePath();g.fill();g.stroke();
 [[.18,1.06,.05],[.1,1.13,.03]].forEach(([u,v,s])=>{g.beginPath();g.arc(b.x+b.w*u,b.y+b.h*v,b.w*s,0,7);g.fill();g.stroke()});g.restore()}
function pad(g,b){g.save();g.fillStyle='#fffbeb';g.strokeStyle='#92400e';g.lineWidth=2;g.fillRect(b.x,b.y,b.w,b.h);g.strokeRect(b.x,b.y,b.w,b.h);
 g.strokeStyle='#fca5a5';g.beginPath();g.moveTo(b.x+b.w*.1,b.y);g.lineTo(b.x+b.w*.1,b.y+b.h);g.stroke();g.strokeStyle='#bfdbfe';
 for(let y=b.y+b.h*.2;y<b.y+b.h-4;y+=b.h*.13){g.beginPath();g.moveTo(b.x+2,y);g.lineTo(b.x+b.w-2,y);g.stroke()}
 g.fillStyle='#92400e';for(let i=0;i<5;i++){g.beginPath();g.arc(b.x+b.w*(.15+i*.175),b.y,4,0,7);g.fill()}g.restore()}
return{box,inside,kit,MSG,SHORT,APPLE,STEP,CHAIRS,NUMS,DESC,DONE,QS,bubble,pad}})();
