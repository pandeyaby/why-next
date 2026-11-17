/* Data, drawings and screen-reader text for the tsunami lab (flag_tsun.js; bundled in learn.js so the lab file stays small).
   Facts (NOAA Tsunami Program, USGS, BGS, UNESCO IOC "Tsunami Glossary"): most tsunamis are started by large undersea
   earthquakes that lift or drop the sea floor; landslides and volcanic eruptions into the sea can start them too. Wind and
   tides do not ("tidal wave" is a wrong name). The wave speed is about √(g × depth): in 4,000 m of water about 700 km/h,
   like a jet plane, while the wave may be under 1 m tall; in 100 m about 110 km/h; in 10 m about 35 km/h, faster than a
   person can run. As it slows near land it grows taller. Natural warnings: strong or long shaking near the coast, the sea
   suddenly draining far out, a loud roar. A tsunami is a series of waves for hours, and the first is often not the biggest:
   go to high ground or inland at once and stay until officials say it is safe. */
const TSUNART=(()=>{
const CAUSE=[['An earthquake under the sea',1],['Strong wind',0],['An underwater landslide',1],['The tide coming in',0],['A volcano erupting into the sea',1]];
/* places along the sea: [name, depth m, speed km/h, height words, x along the profile 0..1, compare] */
const PLACE=[['Deep ocean',4000,700,'under 1 m tall',.18,'as fast as a jet plane'],['Edge of the land',100,110,'about 2 m tall',.6,'as fast as a car on a motorway'],['Near the beach',10,35,'can be over 10 m tall',.86,'faster than you can run']];
const SIGN=[['The ground shakes hard',1],['Big waves on a windy day',0],['The sea rushes far out',1],['A high tide',0],['A loud roar from the sea',1]];
const SAFE=[['The ground shakes hard for a long time. You are on the beach.',[['Run to high ground now',''],['Go and look at the sea','Never go to look. A tsunami can arrive within minutes, faster than you can run.'],['Wait for a siren first','Strong shaking near the sea is the warning. Do not wait for a siren: go to high ground now.']]],
 ['The sea has gone far out. Fish are flapping on the sand.',[['Pick up the fish','The sea going out means the wave is coming. Get away from the beach now.'],['Run uphill or inland',''],['Walk out to look','The dry sea floor is where the wave will hit first. Go uphill.']]],
 ['The first wave has gone back out.',[['Go back to the beach','More waves come, often for hours, and a later one can be the biggest.'],['Go down to help boats','The harbour is low and close to the sea. Stay on high ground.'],['Stay up high until told it is safe','']]]];
const KIDS=[['A tsunami is…',[['Ann','a giant wave made by the tide.','Tides do not make tsunamis. That is why "tidal wave" is the wrong name.'],['Ben','waves made when a huge push moves the sea, like an earthquake.',''],['Col','one big wave made by wind.','Wind makes normal waves. A tsunami is a series of waves from the sea floor moving.']]],
 ['Out in the deep ocean, a tsunami is…',[['Dee','a huge wall of water.','In deep water it is often under 1 m tall. It grows near land.'],['Eve','low but very fast.',''],['Fin','very slow.','In deep water it is as fast as a jet plane, about 700 km/h.']]],
 ['After the first wave…',[['Gia','it is safe to go back.','More waves can come for hours. Stay on high ground.'],['Hal','more waves can come.',''],['Ida','the sea will be calm.','The sea can rise again and again. Wait until it is called safe.']]]];
const QZ=[['What starts most tsunamis?','An earthquake under the sea',[['Strong wind','wind'],['The tide','tide']]],
 ['Where is a tsunami fastest?','In the deep ocean',[['Near the beach','slow'],['In a harbour','slow']]],
 ['How tall is a tsunami in the deep ocean?','Often under 1 m',[['As tall as a block of flats','tall'],['It has no height','tall']]],
 ['The sea rushes far out. What should you do?','Go to high ground',[['Look for shells','look'],['Take a photo','look']]],
 ['The first wave has gone. Is it safe?','No, more waves can come',[['Yes, it is over','back'],['Yes, if the sun is out','back']]],
 ['Why is "tidal wave" the wrong name?','Tides do not cause tsunamis',[['Tsunamis are too small','tall'],['Tides are too fast','tide']]]];
const WHY={wind:'Wind only stirs the top of the sea. A tsunami moves the whole sea, from the floor up.',tide:'Tides rise and fall every day. A tsunami comes from the sea floor or a landslide moving.',
 slow:'A tsunami is fastest where the water is deepest, and slows near land.',tall:'In deep water a tsunami is low and long. It grows tall only near the shore.',
 look:'Never go to look. Get to high ground at once.',back:'A tsunami is a series of waves. Later ones can be bigger.'};
const H={cause:['What can start a tsunami? Tap a box.','Three things can start one.'],lift:['Drag the sea floor up, or tap the button.','The push makes waves that spread out.'],speed:['Tap the places from fastest wave to slowest.','Fast in deep water, slow and tall near land.'],
 sign:['Is it a warning sign? Tap a box.','Shaking, sea rushing out, a roar.'],safe:['What should you do? Tap one.','Go high, stay high.'],kids:['Who is right? Tap them.','Facts checked.'],quiz:['Deep and fast, then slow and tall.','']};
/* side view of the sea: sea floor rising to a beach on the right */
const floorY=(f,top,bot)=>f<.5?bot:f<.75?bot-(f-.5)/.25*(bot-top)*.55:bot-(bot-top)*(.55+(f-.75)/.25*.42);
function sea(X,x0,x1,top,bot,bump){X.save();X.fillStyle='#bfdbfe';X.beginPath();X.moveTo(x0,top);const n=60;for(let k=0;k<=n;k++){const f=k/n;X.lineTo(x0+f*(x1-x0),top-(bump?bump(f):0))}
 for(let k=n;k>=0;k--){const f=k/n;X.lineTo(x0+f*(x1-x0),floorY(f,top,bot))}X.closePath();X.fill();X.strokeStyle='#1e3a8a';X.lineWidth=2;X.beginPath();for(let k=0;k<=n;k++){const f=k/n,y=top-(bump?bump(f):0);k?X.lineTo(x0+f*(x1-x0),y):X.moveTo(x0,y)}X.stroke();
 X.fillStyle='#d6b98c';X.beginPath();X.moveTo(x0,bot+2);for(let k=0;k<=n;k++){const f=k/n;X.lineTo(x0+f*(x1-x0),floorY(f,top,bot))}X.lineTo(x1,bot+30);X.lineTo(x0,bot+30);X.closePath();X.fill();X.restore()}
function say(k,S){let d='Challenge.';
 if(k==='cause'||k==='sign'){const L=k==='cause'?CAUSE:SIGN;d=S.won?'All sorted.':`Card: ${L[S.k][0]}. Sorted ${S.k} of ${L.length}.`}
 if(k==='lift')d=S.won?'Waves spread out both ways.':`Sea floor lifted ${Math.round(S.lift*100)}%. The water above is lifted the same amount.`;
 if(k==='speed')d=S.won?'All three in order.':`Places: ${PLACE.map(p=>p[0]+', '+p[1].toLocaleString('en-GB')+' m deep').join('; ')}. Tapped: ${S.seq.map(i=>PLACE[i][0]).join(', ')||'none'}.`;
 if(k==='safe')d=S.won?'All three answered.':`${SAFE[S.k][0]} Choices: ${SAFE[S.k][1].map(x=>x[0]).join('; ')}.`;
 if(k==='kids')d=S.won?'All three checked.':`${KIDS[S.k][0]} `+KIDS[S.k][1].map(x=>x[0]+' says '+x[1]).join(' ');
 return d}
return {CAUSE,PLACE,SIGN,SAFE,KIDS,QZ,WHY,H,floorY,sea,say}})();
