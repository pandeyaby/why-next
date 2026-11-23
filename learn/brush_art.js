/* Data and pictures for flagbrush (brushing my teeth, ages 4–5). Sources: NHS "Children's teeth" (reviewed 30 June
   2025): ages 3 to 6 brush at least twice a day for about 2 minutes, last thing at night and at least one other time,
   with a pea-sized amount of fluoride toothpaste (a smear under 3), spit out after brushing and do not rinse ("if you
   rinse, the fluoride won't work as well"), brush gently in small circles, including behind the teeth and the gums,
   with a grown-up watching; OHID Delivering better oral health (2021); Oral Health Foundation and NHS trust diet
   leaflets: every time we eat or drink something sugary, teeth are under acid attack for up to an hour, so keep
   sugary food and drinks to mealtimes and nothing sweet after the bedtime brush. Slips it targets: brushing only the
   front, more toothpaste is better, a quick brush is enough, rinsing after brushing, sweets nibbled all day are no
   worse than at a meal, and eating after the bedtime brush. */
const BRUSH=(()=>{
const VIEWS=[{k:'out',n:'Outside',spots:[[0,.35,.55],[1,.6,.4],[2,.4,.7],[3,.55,.45]]},
 {k:'in',n:'Inside',spots:[[0,.6,.6],[1,.35,.45],[2,.55,.35],[3,.4,.62]]},
 {k:'top',n:'Tops',spots:[[0,.5,.5],[1,.38,.42],[2,.62,.58],[3,.45,.5]]}];
const AMT=[{who:'You, age 4 or 5',want:'pea',lo:2,hi:3},{who:'Baby, age 2',want:'smear',lo:1,hi:1}];
const PARTS=['Top left','Top right','Bottom left','Bottom right'];
const ROUTINE=[{t:'Pea of toothpaste',n:0},{t:'Brush for 2 minutes',n:1},{t:'Spit it out',n:2},{t:'Into bed',n:3},
 {t:'Rinse with water',n:-1,why:'Do not rinse. Water washes the fluoride off, so it cannot keep your teeth strong. Just spit.'},
 {t:'Have a biscuit',n:-2,why:'Brushing is the last thing at night. A biscuit now would sit on your teeth all night. Only water after brushing.'}];
const MIX=[4,2,0,5,3,1];
const SLOTS=[{t:'Breakfast',meal:1},{t:'Snack',meal:0},{t:'Lunch',meal:1},{t:'Snack',meal:0},{t:'Dinner',meal:1},{t:'Bedtime',meal:0,bed:1}];
const TREATS=[{k:'juice',t:'Juice',at:1,c:'#f97316'},{k:'sweets',t:'Sweets',at:3,c:'#db2777'},{k:'biscuit',t:'Biscuit',at:5,c:'#a16207'}];
const DESC=['Four big teeth with yellow sticky plaque on them. First the outside, then the inside, then the chewing tops. Drag the toothbrush over each yellow spot.',
 'A toothbrush and a tube of toothpaste. Press and hold the tube to squeeze, then let go.',
 'A mouth in four parts: top left, top right, bottom left and bottom right. A timer counts to 2 minutes. Tap a part to brush it.',
 'Six cards for bedtime, mixed up. Tap the four right steps in order. Two cards are mistakes.',
 'A day from breakfast to bedtime. Juice, sweets and a biscuit sit at snack times and after the bedtime brush. Each red bar is an acid attack on teeth. Move the treats.'];
const DONE=['Outside, inside and the chewing tops are all clean. The front is only one side.',
 'A pea-sized blob for you, a tiny smear for a baby. More toothpaste does not clean better.',
 'Two minutes, and every part of the mouth got its turn.',
 'Pea of toothpaste, brush for 2 minutes, spit it out, into bed. No rinse, and nothing to eat after.',
 'Treats at mealtimes: 3 acid attacks instead of 6. Sweet things nibbled all day hurt teeth more.'];
const TXT=['Drag the brush over the yellow plaque, or use the Brush button. Clean every side.',
 'Press and hold the tube to squeeze. Let go when the blob is the right size.',
 'Tap a part of the mouth to brush it. Brush every part until the timer reaches 2 minutes.',
 'Tap the bedtime steps in order. Watch out for the two mistakes.',
 'Drag each treat to a meal, or tap it and then tap a meal. Count the red acid attacks.'];
const QS=[{q:'Which parts of each tooth do you brush?',a:'The outside, the inside and the top',o:[['Just the front','front'],['Only the ones I can see','front']]},
 {q:'How much toothpaste do you put on your brush?',a:'A pea-sized blob',o:[['As much as I can','more'],['A long stripe','more']]},
 {q:'How long do you brush your teeth?',a:'About 2 minutes',o:[['About 10 seconds','fast'],['Until it tastes minty','fast']]},
 {q:'You have brushed. What next?',a:'Spit it out, no rinse',o:[['Rinse with lots of water','rinse'],['Have a drink of juice','night']]},
 {q:'When is the best time for a sweet treat?',a:'With a meal',o:[['A little bit all day','graze'],['After the bedtime brush','night']]},
 {q:'How hard do you brush?',a:'Gently, in small circles',o:[['As hard as I can','hard'],['Fast, side to side, very hard','hard']]},
 {q:'When do you brush your teeth?',a:'At bedtime and one other time',o:[['Only when they feel dirty','times'],['Once a week','times']]}];
function SHAPES(A){const g=()=>A.ctx;
 const INK='#0f172a',OK='#047857',NO='#b91c1c',RIM='#64748b',F='px system-ui,sans-serif',sz=n=>A.narrow?n:Math.round(n*1.15);
 /* a banner across the top, and a card whose words wrap onto two lines when they do not fit */
 function banner(t,y,o){o=o||{};const g=A.ctx;let n=sz(o.n||14);g.font=`800 ${n}${F}`;let w=g.measureText(t).width+24;
  while(w>A.W-10&&n>10){n--;g.font=`800 ${n}${F}`;w=g.measureText(t).width+24}const h=n+15;g.fillStyle='#ffffff';A.paint.rrect((A.W-w)/2,y-h/2,w,h,10);g.fill();
  g.lineWidth=o.ok||o.no?3:1.4;g.strokeStyle=o.ok?OK:o.no?NO:RIM;g.stroke();g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y+1)}
 function card(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':o.sel?'#dbeafe':o.dim?'#e2e8f0':o.fill||'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();
  g.lineWidth=o.no||o.ok||o.sel?3.5:1.6;g.strokeStyle=o.no?NO:o.ok?OK:o.sel?'#1d4ed8':RIM;g.stroke();let n=sz(o.n||14);g.font=`800 ${n}${F}`;g.fillStyle=o.dim?'#475569':INK;g.textAlign='center';g.textBaseline='middle';
  const ws=t.split(' ');let rows=[t];if(g.measureText(t).width>r.w-10&&ws.length>1){let b=null;for(let k=1;k<ws.length;k++){const a=ws.slice(0,k).join(' '),z=ws.slice(k).join(' '),m=Math.max(g.measureText(a).width,g.measureText(z).width);if(!b||m<b[0])b=[m,a,z]}rows=[b[1],b[2]]}
  while(rows.some(l=>g.measureText(l).width>r.w-8)&&n>8){n--;g.font=`800 ${n}${F}`}
  rows.forEach((l,i)=>g.fillText(l,r.x+r.w/2,r.y+r.h/2+(i-(rows.length-1)/2)*(n+2)+1))}
 /* one tooth: the outside or inside face (with gum along the top), or the chewing top seen from above */
 function tooth(x,y,w,h,k){const c=g();c.fillStyle='#f8fafc';c.strokeStyle='#334155';c.lineWidth=2;
  if(k==='top'){A.paint.rrect(x,y,w,h,w*.28);c.fill();c.stroke();c.strokeStyle='#94a3b8';c.lineWidth=1.5;c.beginPath();c.moveTo(x+w*.5,y+h*.2);c.lineTo(x+w*.5,y+h*.8);c.moveTo(x+w*.2,y+h*.5);c.lineTo(x+w*.8,y+h*.5);c.stroke();return}
  c.beginPath();c.moveTo(x,y);c.lineTo(x+w,y);c.lineTo(x+w,y+h*.75);c.quadraticCurveTo(x+w,y+h,x+w*.75,y+h);c.lineTo(x+w*.25,y+h);c.quadraticCurveTo(x,y+h,x,y+h*.75);c.closePath();
  c.fillStyle=k==='in'?'#e2e8f0':'#f8fafc';c.fill();c.stroke()}
 function gum(x,y,w,h){const c=g();c.fillStyle='#f9a8d4';A.paint.rrect(x,y,w,h,h*.45);c.fill();c.strokeStyle='#9d174d';c.lineWidth=1.5;c.stroke()}
 function plaque(x,y,r,a){const c=g();c.globalAlpha=Math.max(.15,a);c.fillStyle='#facc15';for(let i=0;i<6;i++){const t=i*1.05;c.beginPath();c.arc(x+Math.cos(t)*r*.45,y+Math.sin(t)*r*.45,r*.55,0,7);c.fill()}
  c.globalAlpha=1;c.strokeStyle='#a16207';c.lineWidth=1.5;c.beginPath();c.arc(x,y,r*.9,0,7);c.stroke()}
 function brush(x,y,u,ang){const c=g();c.save();c.translate(x,y);c.rotate(ang||0);c.fillStyle='#2563eb';A.paint.rrect(-u*.15,u*.1,u*.3,u*1.6,u*.12);c.fill();
  c.fillStyle='#1e3a8a';A.paint.rrect(-u*.3,-u*.45,u*.6,u*.6,u*.1);c.fill();c.fillStyle='#e0f2fe';for(let i=0;i<4;i++)c.fillRect(-u*.26+i*u*.14,-u*.62,u*.09,u*.2);c.restore()}
 function tube(x,y,w,h,col){const c=g();c.fillStyle=col||'#e0f2fe';A.paint.rrect(x,y,w,h,h*.3);c.fill();c.strokeStyle='#0369a1';c.lineWidth=2;c.stroke();
  c.fillStyle='#0369a1';c.fillRect(x+w,y+h*.3,w*.12,h*.4);c.font=`800 ${Math.round(h*.38)}px system-ui,sans-serif`;c.textAlign='center';c.textBaseline='middle';c.fillText('paste',x+w/2,y+h/2+1)}
 function blob(x,y,amt,u){const c=g();if(!amt)return;c.fillStyle='#ffffff';c.strokeStyle='#0284c7';c.lineWidth=2;const r=u*(.18+.12*amt),wide=amt>3?u*.5*(amt-3):0;
  A.paint.rrect(x-r-wide/2,y-r*.9,2*r+wide,r*1.5,r*.7);c.fill();c.stroke();c.fillStyle='#38bdf8';c.fillRect(x-r*.6-wide/2,y-r*.35,(1.2*r+wide),r*.22)}

 /* the 2-minute timer, and a toothbrush lying flat for the toothpaste step */
 function dial(cx,cy,rad,frac,txt,all){const g=A.ctx;g.fillStyle='#ffffff';g.beginPath();g.arc(cx,cy,rad,0,7);g.fill();g.strokeStyle=RIM;g.lineWidth=2;g.stroke();
  g.fillStyle=all?'#22c55e':'#60a5fa';g.beginPath();g.moveTo(cx,cy);g.arc(cx,cy,rad*.86,-Math.PI/2,-Math.PI/2+2*Math.PI*frac);g.closePath();g.fill();
  g.fillStyle='#ffffff';g.beginPath();g.arc(cx,cy,rad*.5,0,7);g.fill();g.font=`900 ${sz(15)}${F}`;g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(txt,cx,cy+1)}
 function hbrush(H){const g=A.ctx,hy=H.y+H.h/2;g.fillStyle='#2563eb';A.paint.rrect(A.W*.12,hy-H.h*.22,H.x-A.W*.12,H.h*.44,H.h*.2);g.fill();
  g.fillStyle='#1e3a8a';A.paint.rrect(H.x,H.y,H.w,H.h,6);g.fill();g.fillStyle='#e0f2fe';for(let i=0;i<9;i++)g.fillRect(H.x+H.w*(.05+i*.105),H.y-H.h*.45,H.w*.06,H.h*.45)}
 function quiz(){banner('Challenge',A.H*.12,{ok:1});for(let i=0;i<4;i++){const w=Math.min(A.W*.12,60);tooth(A.W/2-2*w-9+i*(w+6),A.H*.38,w,w*1.4,'out')}banner('Every side, a pea, 2 minutes, spit',A.H*.86,{n:13})}
 return{tooth,gum,plaque,brush,tube,blob,banner,card,dial,hbrush,quiz}}
return{VIEWS,AMT,PARTS,ROUTINE,MIX,SLOTS,TREATS,DESC,DONE,TXT,QS,SHAPES}})();
