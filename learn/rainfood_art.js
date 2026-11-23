/* Data and pictures for flagrainfood (everyday foods from rainforests, ages 5–7). Sources: Britannica 'Cacao' (Theobroma
   cacao, native to the Amazon; flowers and pods grow straight from the trunk and older branches; a pod holds 20 to 60
   seeds); ICCO 'Growing cocoa' and 'Processing cocoa' (harvest, open pods, ferment the beans about 5 to 7 days under
   banana leaves, sun-dry about a week, then roast, grind and mix with sugar); Kew 'Vanilla planifolia' (a climbing orchid
   vine from the forests of Mexico and Central America; green pods are cured for months until dark brown); Kew and
   Mori & Prance 1990 'Bertholletia excelsa' (Brazil nut trees fruit well only in forest: their hooded flowers are opened
   by large, strong forest bees, and agoutis bury the seeds, which grow into new trees; almost all Brazil nuts are
   gathered from wild trees); bananas descend from wild plants of South-East Asian tropical forests (Perrier et al. 2011,
   PNAS); apples need cold winters. Slips it targets: chocolate comes from milk or brown cows; foods grow near home;
   cacao pods hang on thin branches; vanilla is white; any small insect can pollinate a Brazil nut flower; a lone Brazil
   nut tree in a field fruits as well as one in forest; lunchbox foods have nothing to do with rainforests. */
const RAINFOOD=(()=>{
const FOODS=[{k:'choc',t:'Chocolate',r:1,no:'Chocolate is made from cacao beans. They grow in pods on a rainforest tree. Milk and sugar are added later.'},
 {k:'apple',t:'Apple',r:0,no:'Apple trees need cold winters. They grow in cool places, not in hot, wet rainforests.'},
 {k:'banana',t:'Banana',r:1,no:'Bananas first grew wild in rainforests in South-East Asia. Now farmers grow them in hot, wet places.'},
 {k:'milk',t:'Milk',r:0,no:'Milk comes from cows on farms. It is not from a rainforest plant at all.'},
 {k:'vanilla',t:'Vanilla',r:1,no:'Vanilla comes from the pod of an orchid that climbs up rainforest trees in Mexico.'},
 {k:'bread',t:'Bread',r:0,no:'Bread is made from wheat. Wheat grows in big open fields, not in a rainforest.'},
 {k:'brazil',t:'Brazil nuts',r:1,no:'Brazil nuts grow on giant trees in the Amazon rainforest. People collect them from the forest floor.'},
 {k:'carrot',t:'Carrot',r:0,no:'Carrots grow under the soil in cool fields, not in a rainforest.'}];
const STEPS=[{t:'Pick the pod',n:0},{t:'Scoop out the beans',n:1},{t:'Dry the beans in the sun',n:2},{t:'Roast the beans',n:3},{t:'Grind and add sugar',n:4},
 {t:'Milk a brown cow',n:-1,why:'Cows do not make chocolate. Chocolate starts as beans from the cacao tree. Some chocolate has milk added at the very end.'}];
const MIX=[2,5,0,3,1,4];
const PLANTS=[{k:'cacao',t:'Cacao tree'},{k:'bananap',t:'Banana plant'},{k:'vine',t:'Vanilla vine'},{k:'giant',t:'Brazil nut tree'}];
const MATCH=[{f:'choc',p:0,t:'Chocolate'},{f:'vanilla',p:2,t:'Vanilla'},{f:'banana',p:1,t:'Banana'},{f:'brazil',p:3,t:'Brazil nuts'}];
const PWHY=['Cacao pods grow right on the trunk of the cacao tree. The beans inside make chocolate.',
 'Bananas grow in a big bunch on a banana plant with giant leaves.',
 'Vanilla pods grow on an orchid vine that climbs up a tree. They start green and dry to dark brown.',
 'Brazil nuts grow inside a hard, round ball, high up on a giant forest tree.'];
const BOX=[{k:'banana',t:'Banana',r:1,why:'A banana: bananas came from rainforest plants.'},{k:'sand',t:'Cheese sandwich',r:0,why:'Cheese is made from milk, and bread from wheat. Neither grows in a rainforest.'},
 {k:'biscuit',t:'Chocolate biscuit',r:1,why:'The chocolate on the biscuit comes from cacao beans.'},{k:'apple',t:'Apple',r:0,why:'Apples grow in cool places with cold winters.'},
 {k:'yog',t:'Vanilla yoghurt',r:1,why:'The vanilla comes from the pods of a rainforest orchid.'},{k:'carrot',t:'Carrot sticks',r:0,why:'Carrots grow in cool fields.'}];
const DESC=['A food card and two boxes: From a rainforest plant, and Not from a rainforest. Drag the card to a box, or use the buttons.',
 'A cacao tree with pods on its trunk. Six cards are below it, mixed up. Tap the five steps from pod to chocolate in order. One card is a mistake.',
 'Four plants: a cacao tree, a banana plant, a vanilla vine and a giant Brazil nut tree. A food sits at the top. Tap the plant it grows on, or drag the food there.',
 'A Brazil nut tree standing alone in a field. It has no nuts. Grow the forest back, then choose who can help the tree.',
 'A lunchbox with six foods. Tap each food that comes from a rainforest plant.'];
const TXT=['Drag each food to a box, or tap a button. Is it from a rainforest plant?',
 'Tap the steps in order, from the pod on the tree to a bar of chocolate.',
 'Tap the plant each food grows on. Look at the pictures.',
 'Help the lonely Brazil nut tree make nuts and a new tree.',
 'Find the rainforest foods in this lunchbox.'];
const DONE=['Chocolate, bananas, vanilla and Brazil nuts all come from rainforest plants. Apples, milk, bread and carrots do not.',
 'Pod, beans, dry, roast, grind with sugar: chocolate. No cow needed!',
 'Each food has its own rainforest plant: pods on a trunk, a banana bunch, a vanilla vine and a giant nut tree.',
 'Forest bees open the flowers, nuts grow, and an agouti buries one. A new tree grows. Brazil nuts need the whole forest.',
 'Three of the six foods came from rainforest plants: the banana, the chocolate and the vanilla.'];
const QS=[{q:'What is chocolate made from?',a:'Beans from the cacao tree',o:[['Milk from brown cows','cow'],['Brown sugar','sugar']]},
 {q:'Where do cacao pods grow?',a:'On the trunk of the tree',o:[['Under the ground','ground'],['On thin twigs, like apples','twig']]},
 {q:'Which food comes from a rainforest plant?',a:'A banana',o:[['An apple','cold'],['A carrot','cold']]},
 {q:'What colour are vanilla pods when they are ready?',a:'Dark brown',o:[['White, like ice cream','white'],['Bright yellow','white']]},
 {q:'Why do Brazil nut trees need the forest?',a:'Big forest bees open their flowers',o:[['Any small fly can do the job','fly'],['They can grow nuts alone in a field','field']]},
 {q:'Who plants new Brazil nut trees?',a:'Agoutis that bury the nuts',o:[['The wind blows the nuts away','wind'],['Nobody: nuts never grow','wind']]},
 {q:'Your lunch has a banana and a chocolate biscuit. How many came from rainforest plants?',a:'2',o:[['0','zero'],['1','zero']]}];
/* canvas helpers: wrapped text, a banner, cards, and simple pictures of foods and plants */
function SHAPES(A){const INK='#0f172a',OK='#047857',NO='#b91c1c',RIM='#64748b',F='px system-ui,sans-serif',sz=n=>A.narrow?n:Math.round(n*1.15);
 const g=()=>A.ctx,dk=()=>A.col.dark,fg=()=>dk()?'#f1f5f9':INK;
 function wrap(t,max,font){const c=g();c.font=font;const o=[];let cur='';for(const w of t.split(' ')){const tr=cur?cur+' '+w:w;if(cur&&c.measureText(tr).width>max){o.push(cur);cur=w}else cur=tr}if(cur)o.push(cur);return o}
 function banner(t,tone,note,bad){const c=g(),font=`800 ${sz(15)}${F}`,L=wrap(t,A.W-34,font),lh=sz(15)*1.3,h=L.length*lh+14;
  c.fillStyle=tone==='ok'?(dk()?'#14532d':'#dcfce7'):tone==='no'?(dk()?'#7f1d1d':'#fee2e2'):(dk()?'#1e293b':'#ffffff');A.paint.rrect(8,8,A.W-16,h,12);c.fill();
  c.lineWidth=tone?2.5:1.2;c.strokeStyle=tone==='ok'?OK:tone==='no'?NO:RIM;c.stroke();c.font=font;c.fillStyle=fg();c.textAlign='left';c.textBaseline='top';L.forEach((r,i)=>c.fillText(r,17,15+i*lh));
  let y=8+h+6;if(note){const f2=`700 ${sz(13)}${F}`,L2=wrap(note,A.W-34,f2).slice(0,3);c.font=f2;c.fillStyle=bad?(dk()?'#fca5a5':NO):(dk()?'#86efac':OK);L2.forEach((r,i)=>c.fillText(r,17,y+i*sz(13)*1.3));y+=L2.length*sz(13)*1.3+6}return y}
 function card(r,t,o){o=o||{};const c=g();c.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':o.sel?'#dbeafe':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,10);c.fill();
  c.lineWidth=o.no||o.ok||o.sel?3.5:1.6;c.strokeStyle=o.no?NO:o.ok?OK:o.sel?'#1d4ed8':RIM;c.stroke();let n=sz(o.n||14),L;
  for(;;){L=wrap(t,r.w-12,`800 ${n}${F}`);if(L.length*n*1.2<=r.h-6||n<=9)break;n--}c.font=`800 ${n}${F}`;c.fillStyle=INK;c.textAlign='center';c.textBaseline='middle';
  const y0=o.top?r.y+r.h-L.length*n*1.2/2-6:r.y+r.h/2;L.forEach((s,i)=>c.fillText(s,r.x+r.w/2,y0+(i-(L.length-1)/2)*n*1.2))}
 /* a food drawn inside a box of size s centred on (x,y) */
 function food(k,x,y,s){const c=g(),u=s/2;c.save();c.translate(x,y);c.lineWidth=2;c.strokeStyle='#334155';
  if(k==='choc'||k==='biscuit'){if(k==='biscuit'){c.fillStyle='#d6a35c';c.beginPath();c.arc(0,0,u*.8,0,7);c.fill();c.stroke();c.fillStyle='#5b3417';c.beginPath();c.arc(0,0,u*.62,0,7);c.fill()}
   else{c.fillStyle='#5b3417';A.paint.rrect(-u*.75,-u*.5,u*1.5,u,u*.1);c.fill();c.stroke();c.strokeStyle='#8b5a2b';for(let i=1;i<3;i++){c.beginPath();c.moveTo(-u*.75+i*u*.5,-u*.5);c.lineTo(-u*.75+i*u*.5,u*.5);c.stroke()}c.beginPath();c.moveTo(-u*.75,0);c.lineTo(u*.75,0);c.stroke();
    c.fillStyle='#dc2626';c.fillRect(u*.2,-u*.5,u*.55,u);c.fillStyle='#ffffff';c.font=`800 ${Math.round(u*.22)}${F}`;c.textAlign='center';c.textBaseline='middle';c.fillText('choc',u*.48,0)}}
  else if(k==='banana'){c.fillStyle='#facc15';c.beginPath();c.arc(0,-u*.55,u*1.05,.35*Math.PI,.8*Math.PI);c.arc(-u*.12,-u*.95,u*1.15,.75*Math.PI,.38*Math.PI,true);c.closePath();c.fill();c.stroke();c.fillStyle='#713f12';c.fillRect(u*.42,u*.18,u*.12,u*.14)}
  else if(k==='vanilla'){c.strokeStyle='#3f2a14';c.lineWidth=Math.max(3,u*.12);c.lineCap='round';[[-u*.5,u*.6,u*.4,-u*.7],[-u*.2,u*.7,u*.65,-u*.5]].forEach(([a,b,cc,d])=>{c.beginPath();c.moveTo(a,b);c.quadraticCurveTo(0,0,cc,d);c.stroke()});
   c.fillStyle='#fef9c3';c.strokeStyle='#a16207';c.lineWidth=1.5;for(let i=0;i<5;i++){const t=i*1.257;c.beginPath();c.ellipse(-u*.45+Math.cos(t)*u*.22,-u*.4+Math.sin(t)*u*.22,u*.2,u*.1,t,0,7);c.fill();c.stroke()}}
  else if(k==='brazil'){c.fillStyle='#7c4a1e';[[-u*.4,u*.15,-.3],[u*.1,-u*.15,.4],[u*.35,u*.35,-.1]].forEach(([a,b,r])=>{c.save();c.translate(a,b);c.rotate(r);c.beginPath();c.moveTo(-u*.32,u*.2);c.quadraticCurveTo(0,-u*.55,u*.32,u*.2);c.closePath();c.fill();c.stroke();c.restore()})}
  else if(k==='apple'){c.fillStyle='#dc2626';c.beginPath();c.arc(-u*.25,u*.08,u*.5,0,7);c.arc(u*.25,u*.08,u*.5,0,7);c.fill();c.strokeStyle='#713f12';c.lineWidth=3;c.beginPath();c.moveTo(0,-u*.35);c.lineTo(u*.08,-u*.7);c.stroke();c.fillStyle='#16a34a';c.beginPath();c.ellipse(u*.3,-u*.6,u*.22,u*.1,-.5,0,7);c.fill()}
  else if(k==='milk'){c.fillStyle='#ffffff';A.paint.rrect(-u*.4,-u*.45,u*.8,u*1.2,u*.12);c.fill();c.stroke();c.fillStyle='#2563eb';c.fillRect(-u*.2,-u*.8,u*.4,u*.3);c.fillStyle='#1d4ed8';c.font=`800 ${Math.round(u*.28)}${F}`;c.textAlign='center';c.textBaseline='middle';c.fillText('milk',0,u*.15)}
  else if(k==='bread'){c.fillStyle='#d97706';c.beginPath();c.moveTo(-u*.8,u*.5);c.lineTo(-u*.8,-u*.1);c.quadraticCurveTo(-u*.8,-u*.6,0,-u*.6);c.quadraticCurveTo(u*.8,-u*.6,u*.8,-u*.1);c.lineTo(u*.8,u*.5);c.closePath();c.fill();c.stroke();c.strokeStyle='#92400e';for(let i=-1;i<2;i++){c.beginPath();c.moveTo(i*u*.35-u*.1,-u*.35);c.lineTo(i*u*.35+u*.1,-u*.05);c.stroke()}}
  else if(k==='carrot'){c.fillStyle='#ea580c';c.beginPath();c.moveTo(-u*.25,-u*.45);c.lineTo(u*.25,-u*.45);c.lineTo(0,u*.85);c.closePath();c.fill();c.stroke();c.fillStyle='#16a34a';for(let i=-1;i<2;i++){c.beginPath();c.ellipse(i*u*.15,-u*.7,u*.08,u*.25,i*.4,0,7);c.fill()}}
  else if(k==='sand'){c.fillStyle='#fde68a';c.beginPath();c.moveTo(-u*.8,u*.5);c.lineTo(u*.8,u*.5);c.lineTo(-u*.8,-u*.6);c.closePath();c.fill();c.stroke();c.fillStyle='#facc15';c.fillRect(-u*.78,u*.28,u*1.4,u*.12)}
  else if(k==='yog'){c.fillStyle='#ffffff';c.beginPath();c.moveTo(-u*.55,-u*.5);c.lineTo(u*.55,-u*.5);c.lineTo(u*.42,u*.6);c.lineTo(-u*.42,u*.6);c.closePath();c.fill();c.stroke();c.fillStyle='#fef3c7';c.fillRect(-u*.5,-u*.2,u,u*.4);c.fillStyle='#3f2a14';c.fillRect(-u*.3,-u*.04,u*.6,u*.08)}
  c.restore()}
 /* four plants, drawn in rectangle r */
 function plant(k,r,lit){const c=g(),cx=r.x+r.w/2,b=r.y+r.h,s=Math.min(r.w,r.h);c.save();c.lineWidth=2;c.strokeStyle='#14532d';
  if(k==='cacao'){c.fillStyle='#78350f';c.fillRect(cx-s*.07,r.y+r.h*.3,s*.14,r.h*.7);c.fillStyle='#15803d';c.beginPath();c.ellipse(cx,r.y+r.h*.25,s*.42,r.h*.2,0,0,7);c.fill();
   [[-1,.55],[1,.68],[-1,.82]].forEach(([d,f])=>{c.fillStyle='#f59e0b';c.strokeStyle='#92400e';c.beginPath();c.ellipse(cx+d*s*.13,r.y+r.h*f,s*.07,s*.12,d*.3,0,7);c.fill();c.stroke()})}
  if(k==='bananap'){c.fillStyle='#65a30d';c.fillRect(cx-s*.06,r.y+r.h*.35,s*.12,r.h*.65);c.fillStyle='#16a34a';[-1,1].forEach(d=>{c.beginPath();c.ellipse(cx+d*s*.24,r.y+r.h*.25,s*.28,s*.08,d*.6,0,7);c.fill()});
   c.beginPath();c.ellipse(cx,r.y+r.h*.15,s*.08,s*.26,0,0,7);c.fill();c.fillStyle='#facc15';c.strokeStyle='#713f12';for(let i=0;i<4;i++){c.beginPath();c.ellipse(cx+s*.12+(i%2)*s*.06,r.y+r.h*.42+i*s*.06,s*.09,s*.035,-.6,0,7);c.fill();c.stroke()}}
  if(k==='vine'){c.fillStyle='#57534e';c.fillRect(cx-s*.09,r.y+r.h*.1,s*.18,r.h*.9);c.strokeStyle='#15803d';c.lineWidth=4;c.beginPath();for(let t=0;t<=1;t+=.05){const y=b-t*r.h*.85,x=cx+Math.sin(t*14)*s*.14;t?c.lineTo(x,y):c.moveTo(x,y)}c.stroke();
   c.fillStyle='#22c55e';for(let i=0;i<4;i++){c.beginPath();c.ellipse(cx+(i%2?1:-1)*s*.2,b-r.h*(.2+i*.18),s*.08,s*.04,i,0,7);c.fill()}c.strokeStyle='#166534';c.lineWidth=3;for(let i=0;i<3;i++){c.beginPath();c.moveTo(cx+s*.2,r.y+r.h*(.3+i*.05));c.lineTo(cx+s*.24,r.y+r.h*(.5+i*.05));c.stroke()}}
  if(k==='giant'){c.fillStyle='#57534e';c.fillRect(cx-s*.06,r.y+r.h*.2,s*.12,r.h*.8);c.fillStyle='#166534';c.beginPath();c.ellipse(cx,r.y+r.h*.16,s*.45,r.h*.14,0,0,7);c.fill();c.fillStyle='#78350f';c.strokeStyle='#451a03';c.beginPath();c.arc(cx+s*.2,r.y+r.h*.3,s*.07,0,7);c.fill();c.stroke()}
  c.restore();if(lit){const cc=g();cc.strokeStyle=lit==='no'?NO:OK;cc.lineWidth=4;A.paint.rrect(r.x,r.y,r.w,r.h,10);cc.stroke()}}
 return{wrap,banner,card,food,plant,sz,fg,dk,INK,OK,NO,RIM,F}}
return{FOODS,STEPS,MIX,PLANTS,MATCH,PWHY,BOX,DESC,TXT,DONE,QS,SHAPES}})();
