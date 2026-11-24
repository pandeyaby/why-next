/* Data and pictures for flagtoilet (using the toilet by myself; ages 3-4). Sources: DfE Development Matters 2021, PSED,
   3 and 4 year olds ('be increasingly independent in meeting their own care needs, e.g. brushing teeth, using the
   toilet, washing and drying their hands thoroughly'); DfE EYFS statutory framework 2024, ELG Managing Self ('manage
   their own basic hygiene and personal needs, including dressing, going to the toilet'); NHS 'How to potty train'
   (wipe from front to back, wash hands every time, never punish or tell off for accidents); ERIC, The Children's Bowel
   & Bladder Charity (go when you feel the need, do not hold on); Water UK 'Fine to Flush' and the water companies'
   '3 Ps' (only pee, poo and paper go down the toilet; wet wipes do not break up and block pipes). Slips it targets:
   holding on to finish a game; doing the steps out of order (pants up before wiping, skipping the flush or the hand
   wash because hands look clean); wiping back to front; flushing wet wipes, paper towels or toys; thinking an accident
   is naughty and hiding it. */
const LOO=(()=>{
/* step 1: the 'I need to go' feeling. AT[r] = how many plays before the feeling starts in round r */
const AT=[2,1,3],LVL=['No feeling yet','A little feeling: I need to go!','A big feeling: hurry!','Oops, too late'];
/* step 2: the toilet steps. need = steps that must be done first (flush and pants up can swap) */
const STEPS=[{k:'down',t:'Pants down',need:[]},{k:'sit',t:'Sit on the toilet',need:['down']},{k:'wipe',t:'Wipe, front to back',need:['sit']},
 {k:'flush',t:'Flush',need:['wipe']},{k:'up',t:'Pants up',need:['wipe']},{k:'wash',t:'Wash hands with soap',need:['flush','up']},{k:'dry',t:'Dry my hands',need:['wash']},
 {k:'run',t:'Run off to play',need:['dry','x']}];
const NEED={sit:'Pants down first, then sit.',wipe:'Sit and do your wee or poo first, then wipe.',flush:'Wipe first, then flush.',up:'Wipe first, then pants up. Do not pull them up before you wipe.',
 wash:'Flush and pull your pants up first, then wash your hands.',dry:'Wash first, then dry.',run:'Not yet! Wash and dry your hands first. Germs are too small to see, so hands can look clean and still have germs.'};
/* step 3: wiping. ok = front to back */
const WIPES=3;
/* step 4: what goes down the toilet? ok = 1 it can be flushed */
const PS=[{k:'wee',ok:1,t:'Wee'},{k:'wetwipe',ok:0,t:'Wet wipe',why:'Wet wipes do not break up like toilet paper. They block the pipes. Put them in the bin.'},{k:'poo',ok:1,t:'Poo'},
 {k:'car',ok:0,t:'Toy car',why:'Toys never go in the toilet. They get stuck in the pipes. Put toys back on the shelf.'},{k:'paper',ok:1,t:'Toilet paper'},{k:'towel',ok:0,t:'Paper towel',why:'Paper towels are thick and do not break up. They go in the bin.'}];
/* step 5: after an accident. ok = a good thing to do */
const OOPS=[{k:'tell',ok:1,t:'Tell a grown-up'},{k:'hide',ok:0,t:'Hide it',why:'Do not hide. Accidents happen to lots of children. You are not in trouble, and a grown-up will help.'},{k:'clean',ok:1,t:'Put on clean pants'},
 {k:'wet',ok:0,t:'Keep wet pants on',why:'Wet pants feel cold and sore. Tell a grown-up and change into clean ones.'},{k:'bag',ok:1,t:'Wet clothes in a bag'},{k:'wash',ok:1,t:'Wash my hands'}];
const DESC=['A child playing with blocks, a feeling meter, and a toilet. Tap Keep playing, and watch the meter. Tap the toilet when the feeling starts.',
 'Toilet step cards. Tap or drag the step that comes next. Done steps line up at the top.',
 'A child on the toilet, seen from the side. The front is the tummy side, the back is the bottom. Drag the paper along the line to wipe, or use the buttons.',
 'One thing at a time, and two boxes: Down the toilet, and In the bin. Drag it to a box, or use the buttons.',
 'After an accident. Tap or drag the things that help. Some cards do not help.'];
const TXT=['Your body tells you when you need a wee or a poo. Listen to it!','Do the toilet steps in order.','Wipe from front to back.','Only 3 things go down the toilet: wee, poo and toilet paper.','Accidents happen. What do you do?'];
const DONE=['You went when the feeling was little. Go straight away, even in the middle of a game. The game can wait.',
 'Pants down, sit, wipe, flush, pants up, wash, dry. Then off to play!',
 'Front to back, with fresh paper each time. That keeps germs from your bottom away.',
 'Wee, poo and toilet paper go down the toilet. Wipes, paper towels and toys never do.',
 'Tell a grown-up, change into clean pants, put the wet clothes in a bag and wash your hands. You are not naughty.'];
const QS=[{q:'You need a wee, but your game is fun. What do you do?',a:'Go now, then play',o:[['Finish the game first','hold'],['Wait until home time','hold']]},
 {q:'You wiped. What comes next?',a:'Flush, and pants up',o:[['Run off to play','germs'],['Sit back down','order']]},
 {q:'Which way do you wipe?',a:'Front to back',o:[['Back to front','wipe'],['Any way at all','wipe']]},
 {q:'Can a wet wipe go down the toilet?',a:'No, it goes in the bin',o:[['Yes, it is like paper','flush'],['Yes, if it is small','flush']]},
 {q:'Your hands look clean after the toilet. Do you wash them?',a:'Yes, every time',o:[['No, they look clean','germs'],['Only if they are messy','germs']]},
 {q:'Oops, you had an accident. What do you do?',a:'Tell a grown-up',o:[['Hide it','hide'],['Keep the wet pants on','hide']]},
 {q:'Which of these can go down the toilet?',a:'Toilet paper',o:[['A toy car','flush'],['A paper towel','flush']]}];
/* ---------- pictures: drawn on a white card ---------- */
const INK='#1e293b';
function kid(g,u,x,y,h,o){o=o||{};const r=h*.18,lw=Math.max(1.5,u*.05);g.fillStyle='#f2c79b';g.beginPath();g.arc(x,y-h+r,r,0,7);g.fill();g.strokeStyle=INK;g.lineWidth=lw;g.stroke();
 g.fillStyle=o.col||'#0ea5e9';g.beginPath();g.moveTo(x-h*.19,y-h+2*r+2);g.lineTo(x+h*.19,y-h+2*r+2);g.lineTo(x+h*.25,y-h*.3);g.lineTo(x-h*.25,y-h*.3);g.closePath();g.fill();
 g.strokeStyle=INK;g.lineWidth=Math.max(2,u*.07);g.beginPath();g.moveTo(x-h*.1,y-h*.3);g.lineTo(x-h*.1,y);g.moveTo(x+h*.1,y-h*.3);g.lineTo(x+h*.1,y);g.stroke();
 const ey=y-h+r*.9;g.fillStyle=INK;[-1,1].forEach(d=>{g.beginPath();g.arc(x+d*r*.38,ey,Math.max(1.2,r*.12),0,7);g.fill()});g.lineWidth=lw*.8;g.beginPath();
 if(o.sad)g.arc(x,y-h+r*1.75,r*.35,Math.PI+.5,-.5);else g.arc(x,y-h+r*1.15,r*.38,.5,Math.PI-.5);g.stroke();
 if(o.arm){g.lineWidth=Math.max(2,u*.07);g.beginPath();g.moveTo(x-h*.17,y-h+2*r+h*.08);g.lineTo(x-h*.4,y-h*.55);g.moveTo(x+h*.17,y-h+2*r+h*.08);g.lineTo(x+h*.4,y-h*.55);g.stroke()}}
function bowl(g,u,x,y,s){s=s||1;g.fillStyle='#ffffff';g.strokeStyle=INK;g.lineWidth=Math.max(1.5,u*.05);g.fillRect(x-u*.18*s,y-u*.95*s,u*.36*s,u*.4*s);g.strokeRect(x-u*.18*s,y-u*.95*s,u*.36*s,u*.4*s);
 g.beginPath();g.ellipse(x,y-u*.45*s,u*.55*s,u*.16*s,0,0,7);g.fill();g.stroke();g.beginPath();g.moveTo(x-u*.5*s,y-u*.42*s);g.quadraticCurveTo(x-u*.45*s,y+u*.1*s,x-u*.2*s,y+u*.2*s);g.lineTo(x-u*.25*s,y+u*.55*s);g.lineTo(x+u*.25*s,y+u*.55*s);g.lineTo(x+u*.2*s,y+u*.2*s);g.quadraticCurveTo(x+u*.45*s,y+u*.1*s,x+u*.5*s,y-u*.42*s);g.fill();g.stroke();
 g.fillStyle='#bae6fd';g.beginPath();g.ellipse(x,y-u*.45*s,u*.38*s,u*.09*s,0,0,7);g.fill()}
function pants(g,u,col){g.fillStyle=col||'#f472b6';g.strokeStyle=INK;g.lineWidth=Math.max(1.5,u*.05);g.beginPath();g.moveTo(-u*.55,-u*.3);g.lineTo(u*.55,-u*.3);g.lineTo(u*.5,u*.25);g.lineTo(u*.12,u*.25);g.lineTo(0,u*.05);g.lineTo(-u*.12,u*.25);g.lineTo(-u*.5,u*.25);g.closePath();g.fill();g.stroke()}
function arrow(g,u,x,y,dy,col){g.strokeStyle=col||'#1d4ed8';g.fillStyle=col||'#1d4ed8';g.lineWidth=u*.1;g.beginPath();g.moveTo(x,y-dy*u*.3);g.lineTo(x,y+dy*u*.25);g.stroke();g.beginPath();g.moveTo(x-u*.16,y+dy*u*.2);g.lineTo(x+u*.16,y+dy*u*.2);g.lineTo(x,y+dy*u*.45);g.closePath();g.fill()}
function roll(g,u,x,y){g.fillStyle='#ffffff';g.strokeStyle=INK;g.lineWidth=Math.max(1.5,u*.05);g.fillRect(x-u*.3,y-u*.35,u*.6,u*.7);g.strokeRect(x-u*.3,y-u*.35,u*.6,u*.7);g.beginPath();g.ellipse(x,y-u*.35,u*.3,u*.1,0,0,7);g.fill();g.stroke();g.fillStyle='#94a3b8';g.beginPath();g.ellipse(x,y-u*.35,u*.1,u*.04,0,0,7);g.fill()}
function drop(g,u,x,y,col){g.fillStyle=col;g.strokeStyle=INK;g.lineWidth=Math.max(1.5,u*.04);g.beginPath();g.moveTo(x,y-u*.6);g.bezierCurveTo(x+u*.5,y,x+u*.4,y+u*.5,x,y+u*.5);g.bezierCurveTo(x-u*.4,y+u*.5,x-u*.5,y,x,y-u*.6);g.fill();g.stroke()}
function sink(g,u){g.fillStyle='#e2e8f0';g.strokeStyle=INK;g.lineWidth=Math.max(1.5,u*.05);g.beginPath();g.moveTo(-u*.75,-u*.05);g.lineTo(u*.75,-u*.05);g.quadraticCurveTo(u*.7,u*.6,0,u*.6);g.quadraticCurveTo(-u*.7,u*.6,-u*.75,-u*.05);g.fill();g.stroke();
 g.fillStyle='#64748b';g.fillRect(-u*.08,-u*.6,u*.16,u*.4);g.fillRect(-u*.08,-u*.6,u*.4,u*.12);g.fillStyle='#38bdf8';g.fillRect(u*.22,-u*.48,u*.07,u*.4);
 g.fillStyle='#ffffff';[[-.35,.2],[-.15,.32],[-.4,.38]].forEach(([a,b])=>{g.beginPath();g.arc(u*a,u*b,u*.09,0,7);g.fill();g.stroke()})}
function icon(g,n,x,y,s){const u=s/2;g.save();g.translate(x,y);g.lineCap='round';g.lineJoin='round';
 switch(n){
 case'play':[['#ef4444',-.6,.15],['#2563eb',0,.15],['#f59e0b',-.3,-.45]].forEach(([c,a,b])=>{g.fillStyle=c;g.fillRect(u*a,u*b,u*.58,u*.58);g.strokeStyle=INK;g.lineWidth=Math.max(1.5,u*.04);g.strokeRect(u*a,u*b,u*.58,u*.58)});break;
 case'toilet':bowl(g,u,0,u*.25);break;
 case'down':pants(g,u*.8);arrow(g,u,u*.6,-u*.15,1);break;
 case'up':pants(g,u*.8);arrow(g,u,u*.6,u*.1,-1);break;
 case'sit':bowl(g,u*.9,u*.1,u*.35);kid(g,u,-u*.05,u*.05,u*.9,{col:'#16a34a'});break;
 case'wipe':case'paper':roll(g,u,-u*.25,0);g.fillStyle='#ffffff';g.strokeStyle=INK;g.lineWidth=Math.max(1.5,u*.04);g.fillRect(u*.05,u*.1,u*.6,u*.4);g.strokeRect(u*.05,u*.1,u*.6,u*.4);g.setLineDash([u*.08,u*.06]);g.beginPath();g.moveTo(u*.35,u*.1);g.lineTo(u*.35,u*.5);g.stroke();g.setLineDash([]);break;
 case'flush':bowl(g,u*.9,0,u*.3);g.fillStyle='#64748b';g.fillRect(u*.18,-u*.6,u*.32,u*.09);g.strokeStyle='#0284c7';g.lineWidth=u*.07;g.beginPath();g.arc(0,-u*.15,u*.16,0,5);g.stroke();break;
 case'wash':sink(g,u);break;
 case'dry':g.fillStyle='#a78bfa';g.strokeStyle=INK;g.lineWidth=Math.max(1.5,u*.05);g.fillRect(-u*.45,-u*.65,u*.9,u*1.25);g.strokeRect(-u*.45,-u*.65,u*.9,u*1.25);g.fillStyle='#ede9fe';g.fillRect(-u*.45,u*.3,u*.9,u*.14);g.fillStyle='#64748b';g.fillRect(-u*.6,-u*.75,u*1.2,u*.1);break;
 case'run':kid(g,u,0,u*.75,u*1.4,{arm:1,col:'#f97316'});g.strokeStyle='#94a3b8';g.lineWidth=u*.06;[-.2,.1,.4].forEach(b=>{g.beginPath();g.moveTo(-u*.95,u*b);g.lineTo(-u*.6,u*b);g.stroke()});break;
 case'wee':drop(g,u,0,0,'#fde047');break;
 case'poo':g.fillStyle='#92400e';g.strokeStyle=INK;g.lineWidth=Math.max(1.5,u*.04);[[0,.35,.55,.2],[0,.05,.42,.17],[0,-.22,.28,.14]].forEach(([a,b,w,h])=>{g.beginPath();g.ellipse(u*a,u*b,u*w,u*h,0,0,7);g.fill();g.stroke()});break;
 case'wetwipe':g.fillStyle='#93c5fd';g.strokeStyle=INK;g.lineWidth=Math.max(1.5,u*.05);A0(g,u);g.fillStyle='#ffffff';g.fillRect(-u*.25,-u*.62,u*.5,u*.3);g.strokeRect(-u*.25,-u*.62,u*.5,u*.3);drop(g,u*.35,u*.45,u*.3,'#38bdf8');break;
 case'towel':g.fillStyle='#d6d3d1';g.strokeStyle=INK;g.lineWidth=Math.max(1.5,u*.05);g.fillRect(-u*.6,-u*.45,u*1.2,u*.9);g.strokeRect(-u*.6,-u*.45,u*1.2,u*.9);g.beginPath();g.moveTo(-u*.6,0);g.lineTo(u*.6,0);g.stroke();break;
 case'car':g.fillStyle='#dc2626';g.strokeStyle=INK;g.lineWidth=Math.max(1.5,u*.05);g.beginPath();g.moveTo(-u*.75,u*.2);g.lineTo(-u*.75,-u*.1);g.lineTo(-u*.4,-u*.15);g.lineTo(-u*.2,-u*.45);g.lineTo(u*.35,-u*.45);g.lineTo(u*.55,-u*.12);g.lineTo(u*.75,-u*.1);g.lineTo(u*.75,u*.2);g.closePath();g.fill();g.stroke();
  g.fillStyle=INK;[-.42,.42].forEach(a=>{g.beginPath();g.arc(u*a,u*.25,u*.17,0,7);g.fill()});g.fillStyle='#bae6fd';g.fillRect(-u*.12,-u*.38,u*.38,u*.22);break;
 case'tell':kid(g,u,-u*.35,u*.8,u*1.6,{col:'#7c3aed',arm:1});kid(g,u,u*.4,u*.8,u*1.0,{col:'#0ea5e9'});g.fillStyle='#e0f2fe';g.strokeStyle='#0369a1';g.lineWidth=u*.05;g.beginPath();g.ellipse(u*.45,-u*.55,u*.42,u*.28,0,0,7);g.fill();g.stroke();g.fillStyle=INK;g.font=`800 ${Math.round(u*.3)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText('Help!',u*.45,-u*.55);break;
 case'hide':g.fillStyle='#b45309';g.strokeStyle=INK;g.lineWidth=Math.max(1.5,u*.05);g.fillRect(-u*.85,-u*.1,u*1.7,u*.65);g.strokeRect(-u*.85,-u*.1,u*1.7,u*.65);g.fillRect(-u*.85,-u*.5,u*.3,u*.45);g.fillRect(u*.55,-u*.5,u*.3,u*.45);g.fillStyle='#f2c79b';g.beginPath();g.arc(u*.15,-u*.25,u*.2,Math.PI,0);g.fill();g.stroke();break;
 case'clean':pants(g,u*.9,'#4ade80');g.fillStyle='#facc15';[[-.6,-.6],[.65,-.55],[.7,.45]].forEach(([a,b])=>{g.beginPath();for(let i=0;i<8;i++){const r=i%2?u*.05:u*.14,t=i*Math.PI/4;g.lineTo(u*a+Math.cos(t)*r,u*b+Math.sin(t)*r)}g.closePath();g.fill()});break;
 case'wet':pants(g,u*.9,'#f472b6');drop(g,u*.3,-u*.3,u*.55,'#38bdf8');drop(g,u*.3,u*.25,u*.62,'#38bdf8');break;
 case'bag':g.fillStyle='#22c55e';g.strokeStyle=INK;g.lineWidth=Math.max(1.5,u*.05);g.beginPath();g.moveTo(-u*.5,-u*.3);g.lineTo(u*.5,-u*.3);g.lineTo(u*.6,u*.65);g.lineTo(-u*.6,u*.65);g.closePath();g.fill();g.stroke();g.beginPath();g.arc(0,-u*.3,u*.25,Math.PI,0);g.stroke();break;
 case'bin':g.fillStyle='#64748b';g.strokeStyle=INK;g.lineWidth=Math.max(1.5,u*.05);g.beginPath();g.moveTo(-u*.45,-u*.4);g.lineTo(u*.45,-u*.4);g.lineTo(u*.36,u*.7);g.lineTo(-u*.36,u*.7);g.closePath();g.fill();g.stroke();g.fillStyle='#475569';g.fillRect(-u*.55,-u*.58,u*1.1,u*.16);g.strokeRect(-u*.55,-u*.58,u*1.1,u*.16);g.strokeStyle='#cbd5e1';g.lineWidth=u*.05;[-.15,.15].forEach(a=>{g.beginPath();g.moveTo(u*a,-u*.25);g.lineTo(u*a*.8,u*.55);g.stroke()});break;
 default:break}
 g.restore()}
function A0(g,u){g.beginPath();g.moveTo(-u*.7,-u*.5);g.lineTo(u*.7,-u*.5);g.lineTo(u*.7,u*.5);g.lineTo(-u*.7,u*.5);g.closePath();g.fill();g.stroke()}
/* side view for the wiping step: the child faces right, so the front (tummy) is on the right and the back (bottom) on the left */
function side(g,x,y,w,h,dark){const u=Math.min(w,h)/2.2;g.save();g.translate(x,y);bowl(g,u,0,u*.45);
 g.fillStyle='#0ea5e9';g.strokeStyle=INK;g.lineWidth=Math.max(1.5,u*.05);g.beginPath();g.moveTo(-u*.35,-u*.1);g.lineTo(u*.25,-u*.1);g.lineTo(u*.2,-u*1.05);g.lineTo(-u*.3,-u*1.05);g.closePath();g.fill();g.stroke();
 g.fillStyle='#f2c79b';g.beginPath();g.arc(-u*.05,-u*1.3,u*.27,0,7);g.fill();g.stroke();g.fillStyle=INK;g.beginPath();g.arc(u*.1,-u*1.33,u*.04,0,7);g.fill();
 g.strokeStyle=INK;g.lineWidth=Math.max(2,u*.08);g.beginPath();g.moveTo(u*.2,-u*.15);g.lineTo(u*.7,-u*.15);g.lineTo(u*.7,u*.4);g.stroke();g.restore()}
/* canvas helpers */
function PEN(A){const OK='#047857',NO='#b91c1c',RIM='#64748b',F='px system-ui,sans-serif',sz=n=>A.narrow?n:Math.round(n*1.15);
 const g=()=>A.ctx,dk=()=>A.col.dark,fg=()=>dk()?'#f1f5f9':'#0f172a';
 function lines(t,max,font){const c=g();c.font=font;const out=[];let cur='';for(const w of t.split(' ')){const nx=cur?cur+' '+w:w;if(cur&&c.measureText(nx).width>max){out.push(cur);cur=w}else cur=nx}if(cur)out.push(cur);return out}
 function head(t,tone,note,bad){const c=g(),font=`800 ${sz(17)}${F}`,L=lines(t,A.W-34,font),lh=sz(17)*1.3,h=L.length*lh+14;
  c.fillStyle=tone==='ok'?(dk()?'#14532d':'#dcfce7'):tone==='no'?(dk()?'#7f1d1d':'#fee2e2'):(dk()?'#1e293b':'#ffffff');A.paint.rrect(8,8,A.W-16,h,12);c.fill();
  c.lineWidth=tone?2.5:1.2;c.strokeStyle=tone==='ok'?OK:tone==='no'?NO:RIM;c.stroke();c.font=font;c.fillStyle=fg();c.textAlign='left';c.textBaseline='top';L.forEach((r,i)=>c.fillText(r,17,15+i*lh));
  let y=8+h+6;if(note){const f2=`700 ${sz(15)}${F}`,L2=lines(note,A.W-34,f2).slice(0,3);c.font=f2;c.fillStyle=bad?(dk()?'#fca5a5':NO):(dk()?'#86efac':OK);L2.forEach((r,i)=>c.fillText(r,17,y+i*sz(15)*1.3));y+=L2.length*sz(15)*1.3+6}return y}
 function tile(r,word,o){o=o||{};const c=g();c.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':o.sel?'#dbeafe':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,12);c.fill();
  c.lineWidth=o.no||o.ok||o.sel?3.5:1.6;c.strokeStyle=o.no?NO:o.ok?OK:o.sel?'#1d4ed8':RIM;c.stroke();
  if(o.pic){const th=word?Math.min(r.h*.36,sz(o.n||15)*2.6):0,s=Math.min(r.w*.74,r.h-th-8);icon(c,o.pic,r.x+r.w/2,r.y+5+s/2,s);if(!word)return;r={x:r.x,y:r.y+r.h-th-2,w:r.w,h:th}}
  if(!word)return;let n=sz(o.n||16),L;for(;;){L=lines(word,r.w-10,`800 ${n}${F}`);if(L.length*n*1.18<=r.h-4||n<=11)break;n--}
  c.font=`800 ${n}${F}`;c.fillStyle='#0f172a';c.textAlign='center';c.textBaseline='middle';L.forEach((s,i)=>c.fillText(s,r.x+r.w/2,r.y+r.h/2+(i-(L.length-1)/2)*n*1.18))}
 return{lines,head,tile,sz,fg,dk,OK,NO,RIM,F}}
return{AT,LVL,STEPS,NEED,WIPES,PS,OOPS,DESC,TXT,DONE,QS,icon,side,kid,PEN}})();
