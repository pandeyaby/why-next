/* Data and drawings for the getting-dressed flagship (flagdress), ages 3–4 (EYFS PSED Managing Self: manage their own
   needs, including dressing). Order: pants before trousers, socks before shoes, coat last; label at the back; shoes
   on the right feet (the sticker-halves trick); buttons from the bottom, each to the hole beside it; the coat flip.
   Slips it targets: outer clothes before inner ones, the top on back to front, shoes on the wrong feet, buttons in
   the wrong holes, and waiting for a grown-up to do it all instead of trying and asking for help with one bit. */
const DRS=(()=>{
const KIT=[{k:'pants',t:'Pants',e:'🩲',need:[]},{k:'trousers',t:'Trousers',e:'👖',need:['pants']},{k:'socks',t:'Socks',e:'🧦',need:[]},
 {k:'shoes',t:'Shoes',e:'👟',need:['socks','trousers']},{k:'coat',t:'Coat',e:'🧥',need:['pants','trousers','socks','shoes']}];
const TOPS=[{c:'#2563eb',lab:0},{c:'#db2777',lab:1},{c:'#16a34a',lab:0},{c:'#f59e0b',lab:1}];
const BINS=['Ready to go','Turn it round'];
const PAIRS=[1,0,1];
const FLIP=[{t:'Lay the coat on the floor, inside up',e:'🧥'},{t:'Stand by the hood',e:'🧍'},{t:'Push both arms into the sleeves',e:'💪'},{t:'Flip it up over your head',e:'🙌'}];
const DESC=[
 'A child in a vest, and five things to put on: pants, trousers, socks, shoes and a coat.',
 'Four children in tops. Some have the label at the front. Two boxes: Ready to go, and Turn it round.',
 'A pair of shoes, each with half a smiley sticker inside.',
 'A coat with 4 buttons on one side and 4 holes on the other.',
 'Four cards for the coat flip, and four numbered spaces.'];
const DONE=[
 'Pants, then trousers. Socks, then shoes. Coat last. What goes next to your skin goes on first.',
 'The label goes at the back. If you can see it at the front, turn the top round.',
 'When the two sticker halves make a whole smiley, the shoes are on the right feet.',
 'Start at the bottom and do each button into the hole next to it. Then the coat is not wonky.',
 'Floor, stand by the hood, arms in, flip! Now you can put your own coat on.'];
const QS=[
 {q:'Socks or shoes: which goes on first?',a:'Socks',o:[['Shoes','order'],['It does not matter','order']]},
 {q:'Where does the label on your top go?',a:'At the back',o:[['At the front','label'],['On your arm','label']]},
 {q:'The two sticker halves do not make a smiley. What do you do?',a:'Swap the shoes',o:[['Walk anyway','feet'],['Take the stickers out','feet']]},
 {q:'Which button do you do first?',a:'The bottom one',o:[['Any one','button'],['The top one, then skip some','button']]},
 {q:'Your zip will not start. What can you do?',a:'Try, then ask for help with that bit',o:[['Give up and stay inside','help'],['Wait for a grown-up to do it all','help']]},
 {q:'Pants or trousers: which goes on first?',a:'Pants',o:[['Trousers','order'],['Both at once','order']]}];
/* the child: head, vest body, legs; worn clothes drawn on top */
function kid(A,K,on){const g=A.ctx,u=K.u;g.fillStyle='#fcd34d';g.beginPath();g.arc(K.x,K.y,u*.5,0,7);g.fill();g.fillStyle='#111827';[-1,1].forEach(d=>{g.beginPath();g.arc(K.x+d*u*.17,K.y-u*.05,u*.05,0,7);g.fill()});
 g.strokeStyle='#111827';g.lineWidth=2;g.beginPath();g.arc(K.x,K.y+u*.08,u*.18,.2,Math.PI-.2);g.stroke();
 const by=K.y+u*.55,bh=u*1.5,lw=u*.38,ly=by+bh,lh=u*1.6;g.fillStyle='#f8fafc';A.paint.rrect(K.x-u*.6,by,u*1.2,bh,10);g.fill();g.strokeStyle='#94a3b8';g.stroke();
 g.fillStyle='#fcd34d';[-1,1].forEach(d=>g.fillRect(K.x+(d<0?-u*.5:u*.12),ly,lw,lh));
 if(on.pants){g.fillStyle='#a855f7';A.paint.rrect(K.x-u*.55,ly-u*.15,u*1.1,u*.45,8);g.fill()}
 if(on.trousers){g.fillStyle='#1d4ed8';g.fillRect(K.x-u*.55,ly-u*.1,u*1.1,u*.3);[-1,1].forEach(d=>g.fillRect(K.x+(d<0?-u*.55:u*.08),ly,lw+u*.07,lh*.92))}
 if(on.socks){g.fillStyle='#ef4444';[-1,1].forEach(d=>g.fillRect(K.x+(d<0?-u*.52:u*.1),ly+lh*.86,lw+u*.04,lh*.14))}
 if(on.shoes){g.fillStyle='#111827';[-1,1].forEach(d=>{A.paint.rrect(K.x+(d<0?-u*.7:u*.08),ly+lh*.96,lw+u*.24,u*.28,6);g.fill()})}
 if(on.coat){g.fillStyle='#16a34a';A.paint.rrect(K.x-u*.75,by-u*.05,u*1.5,bh+u*.45,12);g.fill();g.fillStyle='#fde047';for(let j=0;j<3;j++){g.beginPath();g.arc(K.x,by+bh*(.2+j*.3),u*.07,0,7);g.fill()}}}
/* a child seen from the front in a top: a star on the front, or the label showing at the neck (top on back to front) */
function top(A,r,t){const g=A.ctx,cx=r.x+r.w/2,u=Math.min(r.w,r.h)*.28,y=r.y+r.h*.3;g.fillStyle='#fcd34d';g.beginPath();g.arc(cx,y,u*.55,0,7);g.fill();
 g.fillStyle=t.c;g.beginPath();g.moveTo(cx-u*.9,y+u*.6);g.lineTo(cx-u*1.7,y+u*1.2);g.lineTo(cx-u*1.3,y+u*1.6);g.lineTo(cx-u*.9,y+u*1.3);g.lineTo(cx-u*.9,y+u*2.5);g.lineTo(cx+u*.9,y+u*2.5);g.lineTo(cx+u*.9,y+u*1.3);g.lineTo(cx+u*1.3,y+u*1.6);g.lineTo(cx+u*1.7,y+u*1.2);g.lineTo(cx+u*.9,y+u*.6);g.closePath();g.fill();
 if(t.lab){g.fillStyle='#ffffff';g.fillRect(cx-u*.22,y+u*.6,u*.44,u*.4);g.strokeStyle='#111827';g.lineWidth=1.5;g.strokeRect(cx-u*.22,y+u*.6,u*.44,u*.4)}
 else{g.fillStyle='#ffffff';g.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,q=i%2?u*.22:u*.5;g.lineTo(cx+Math.cos(a)*q,y+u*1.7+Math.sin(a)*q)}g.closePath();g.fill()}}
/* one shoe; flip mirrors it. Its inner edge (big-toe side) bulges; half a smiley sits on that side */
function shoe(A,x,y,u,flip,colour){const g=A.ctx;g.save();g.translate(x,y);g.scale(flip?-1:1,1);g.fillStyle=colour;g.beginPath();g.moveTo(0,u);g.bezierCurveTo(-u*.55,u,-u*.6,-u*.2,-u*.25,-u*.95);g.bezierCurveTo(0,-u*1.15,u*.6,-u*.9,u*.5,-u*.2);g.bezierCurveTo(u*.45,u*.4,u*.4,u,0,u);g.fill();
 g.fillStyle='#fde047';g.beginPath();g.arc(u*.5,-u*.1,u*.3,Math.PI*.5,Math.PI*1.5);g.fill();g.fillStyle='#111827';g.beginPath();g.arc(u*.38,-u*.2,u*.05,0,7);g.fill();g.strokeStyle='#111827';g.lineWidth=2;g.beginPath();g.arc(u*.5,-u*.1,u*.18,Math.PI*.55,Math.PI*.95);g.stroke();g.restore()}
return{KIT,TOPS,BINS,PAIRS,FLIP,DESC,DONE,QS,kid,top,shoe}})();
