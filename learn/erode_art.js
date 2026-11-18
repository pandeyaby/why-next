/* Data, drawings and screen-reader text for the preventing-erosion lab (flag_erode.js; bundled in learn.js).
   Facts (NGSS 2-ESS2-1; USDA NRCS conservation practice standards: Windbreak/Shelterbelt 380, Terrace 600, Critical Area
   Planting 342; National Geographic "Erosion"; BGS "Coastal erosion"; NOAA and Natural England dune guidance): erosion is
   soil, sand or rock being carried away by water, wind or ice. Bare soil washes off a slope fastest; plant cover shields
   the soil from raindrops and roots bind it (the Universal Soil Loss Equation cover factor is 1.0 for bare soil and about
   0.01 to 0.05 for dense grass). Terraces break a long slope into short flat steps so water slows down. A wall at the
   foot of a slope holds back soil that slides down but does not stop the slope wearing. A windbreak (a row of trees,
   a hedge or a fence) slows the wind on its downwind side for roughly 10 times its height, so it must stand on the
   side the wind comes from. Marram grass and sand fences trap blowing sand on dunes. Tray soil-loss numbers below are
   for this model: their order matches field studies, the exact grams do not come from one. */
const ERART=(()=>{
/* [card, 0 water 1 wind, why not the other] */
const AGENT=[['Soil washes down a hill in a storm',0,'Rain water runs downhill and carries the soil with it.'],['Sand blows off a dune onto a road',1,'Dry sand is lifted and carried by the wind.'],
 ['A river bank falls in, bit by bit',0,'Fast river water eats into the bank.'],['Dust blows off a dry, bare field',1,'Wind picks up dry, loose soil.'],['Waves pull sand off a beach',0,'Sea water in waves carries the sand away.']];
/* tray covers: [name, grams washed off in the model, what it does] */
const COVER=[['Bare soil',80,'Nothing holds the soil, so rain splashes it loose and carries it away.'],['Grass',10,'Leaves soften each raindrop and roots grip the soil.'],
 ['Wall at bottom',30,'The wall catches soil at the bottom, but soil still slides down the hill.'],['Steps (terraces)',20,'Flat steps slow the water down, so it carries less soil.']];
const FIX=[['A steep farm hill loses soil every time it rains.',[['Cut flat steps and plant crops on them',''],['Pull up all the plants','Bare soil washes away fastest. Plants and roots hold it.'],['Water it more with a hose','More running water carries away more soil.']]],
 ['Sand from a dune blows onto a road.',[['Sweep the road every day','Sweeping clears the road, but the dune keeps blowing. Stop the sand at the dune.'],['Plant marram grass and put up a sand fence',''],['Dig the dune flat','Flat, bare sand blows away even more easily.']]],
 ['A river bank is falling into the river.',[['Cut down the bushes on the bank','Roots hold the bank together. Without them it falls in faster.'],['Paint the bank','Paint does not hold soil. Roots or big rocks do.'],['Plant trees with deep roots on the bank','']]],
 ['Dry soil blows off a flat field on windy days.',[['Plant a row of trees on the windy side',''],['Plough the field again','Freshly ploughed soil is loose and blows away more easily.'],['Plant trees on the far side, away from the wind','A windbreak must meet the wind first, on the side it comes from.']]]];
const KIDS=[['Erosion is…',[['Ann','soil or sand carried away by wind or water.',''],['Ben','when a hill grows taller.','Erosion takes land away. It wears hills down, not up.'],['Col','something only volcanoes do.','Wind, rain, rivers and waves all cause erosion.']]],
 ['Plants slow erosion because…',[['Dee','they drink up all the rain.','Plants use some water, but mostly their roots grip the soil and leaves soften the drops.'],['Eve','roots hold soil and leaves soften the rain.',''],['Fin','they make the soil heavier.','Weight is not the reason. Roots tie the soil together.']]],
 ['To find the best fix, we…',[['Gia','give the fix we like less rain.','That is not fair. Each tray must get the same rain.'],['Hal','only test one fix.','You need to compare fixes to know which works best.'],['Ida','test each fix with the same rain.','']]]];
const QZ=[['Which tray loses the most soil in the rain?','Bare soil',[['Soil with grass','bare'],['Soil with steps','bare']]],['Where should a windbreak go?','On the side the wind comes from',[['On the far side','side'],['In the middle of the field','side']]],
 ['How do roots help stop erosion?','They hold the soil together',[['They make the soil wet','roots'],['They push the soil away','roots']]],['Two trays are tested. One gets more rain. Is it a fair test?','No, the rain must be the same',[['Yes, rain does not matter','fair'],['Yes, if the trays look alike','fair']]],
 ['A wall at the foot of a hill…','catches soil that slides down',[['stops all rain falling','wall'],['makes the hill grow','wall']]],['Sand blows from a dune onto a road. Best fix?','Plant grass on the dune',[['Sweep the road','sweep'],['Flatten the dune','sweep']]]];
const WHY={bare:'With no plants, nothing holds the soil or softens the rain, so bare soil washes away most.',side:'A windbreak slows the wind behind it, so it must face the wind first.',roots:'Roots grip the soil and tie it together.',
 fair:'Only change the thing you are testing. Keep the rain the same.',wall:'A wall holds back soil at the bottom; the hill above still wears.',sweep:'Fix the cause: plants and fences stop the sand at the dune.'};
const H={agent:['Water or wind? Drag the card or tap a box.','Water and wind both carry land away.'],tray:['Pick a tray, then drag the cloud across it.','Grass held the soil best.'],wind:['Drag the hedge to shelter the whole field.','The hedge faces the wind first.'],
 fix:['Pick the best fix. Tap one.','Match the fix to the problem.'],kids:['Who is right? Tap them.','Facts checked.'],quiz:['Plants, steps, walls and windbreaks.','']};
function hill(X,x0,x1,top,bot,kind,lost){X.save();const mid=x0+(x1-x0)*.5;X.fillStyle='#92400e';X.beginPath();X.moveTo(x0,bot);X.lineTo(x0,top);X.lineTo(mid,top);X.lineTo(x1,bot);X.closePath();X.fill();
 X.fillStyle='#b45309';X.beginPath();X.moveTo(x0,top);X.lineTo(mid,top);X.lineTo(x1,bot);X.lineTo(x1-(x1-mid)*.06,bot);X.lineTo(mid,top+8);X.lineTo(x0,top+8);X.closePath();X.fill();
 const sl=f=>({x:mid+(x1-mid)*f,y:top+(bot-top)*f});
 if(kind===1){X.strokeStyle='#15803d';X.lineWidth=2;for(let k=0;k<=24;k++){const f=k/24,p=k<10?{x:x0+(mid-x0)*k/10,y:top}:sl((k-10)/14);X.beginPath();X.moveTo(p.x,p.y);X.lineTo(p.x-3,p.y-9);X.moveTo(p.x,p.y);X.lineTo(p.x+3,p.y-10);X.stroke();X.strokeStyle='#a16207';X.beginPath();X.moveTo(p.x,p.y);X.lineTo(p.x+1,p.y+12);X.stroke();X.strokeStyle='#15803d'}}
 if(kind===2){const p=sl(1);X.fillStyle='#6b7280';for(let r=0;r<3;r++)for(let c=0;c<2;c++){X.fillRect(p.x+2+c*13-(r%2)*6,bot-12*(r+1),12,11)}}
 if(kind===3){X.fillStyle='#fffbeb';X.beginPath();X.moveTo(mid,top);for(let k=1;k<=4;k++){const a=sl((k-1)/4),b=sl(k/4);X.lineTo(b.x,a.y);X.lineTo(b.x,b.y)}X.lineTo(x1,top);X.closePath();X.fill();
  X.strokeStyle='#78350f';X.lineWidth=3;X.beginPath();X.moveTo(mid,top);for(let k=1;k<=4;k++){const a=sl((k-1)/4),b=sl(k/4);X.lineTo(b.x,a.y);X.lineTo(b.x,b.y)}X.stroke()}
 X.restore()}
function say(k,S){let d='Challenge.';
 if(k==='agent')d=S.won?'All sorted.':`Card: ${AGENT[S.k][0]}. Sorted ${S.k} of ${AGENT.length}.`;
 if(k==='tray')d=S.won?'All four trays tested.':`Tray: ${COVER[S.pick][0]}. Rain ${Math.round(S.rain*100)}% done. Results so far: ${COVER.map((c,i)=>S.res[i]!=null?c[0]+' '+S.res[i]+' g':'').filter(Boolean).join(', ')||'none'}.`;
 if(k==='wind')d=S.won?'The whole field is sheltered.':`Wind blows from the left. Field from ${Math.round(S.f0*100)}% to ${Math.round(S.f1*100)}% across. Hedge at ${Math.round(S.hx*100)}% across; calm air reaches ${Math.min(100,Math.round((S.hx+S.reach)*100))}% across. ${S.cover}% of the field is sheltered.`;
 if(k==='fix')d=S.won?'All four problems fixed.':`${FIX[S.k][0]} Choices: ${FIX[S.k][1].map(x=>x[0]).join('; ')}.`;
 if(k==='kids')d=S.won?'All three checked.':`${KIDS[S.k][0]} `+KIDS[S.k][1].map(x=>x[0]+' says '+x[1]).join(' ');
 return d}
return {AGENT,COVER,FIX,KIDS,QZ,WHY,H,hill,say}})();
