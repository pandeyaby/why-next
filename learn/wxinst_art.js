/* Data for the weather instruments lab (flag_wxinst.js; bundled in learn.js so the lab file stays small).
   Met Office facts used: a thermometer measures air temperature (°C) and is kept in the shade, in a white louvred box
   (a Stevenson screen) about 1.25 m above short grass; a rain gauge measures rainfall as a depth in millimetres and stands
   in the open, away from trees and walls; a wind vane shows wind direction and points to where the wind blows FROM
   (a west wind blows from the west); a cup anemometer measures wind speed: the cups spin faster in stronger wind and it
   is mounted high in the open (10 m at weather stations). Beaufort descriptions: under 6 km/h smoke drifts (light air),
   12–19 km/h leaves and twigs keep moving (gentle breeze), 39–49 km/h large branches sway (strong breeze). Rain falls
   evenly, so a wide and a narrow straight-sided pot in the same rain fill to the same depth. */
const WXART=(()=>{
const T=[['Thermometer','Temperature','#fee2e2'],['Rain gauge','Rainfall','#dbeafe'],['Wind vane','Wind direction','#fef3c7'],['Anemometer','Wind speed','#dcfce7']];
const MATCH=[3,0,2,1];
/* wind vane rounds: wind comes FROM this point (0 N, 1 E, 2 S, 3 W) */
const DIRS=['North','East','South','West'],VANE=[3,0,1];
/* anemometer: [km/h, scene, what you see] */
const SPEED=[[3,'Smoke drifts slowly up','calm'],[15,'Leaves and twigs keep moving','breeze'],[45,'Big branches sway','strong']];
const GAUGE=[8,15,23];
/* spots in the garden: [label, good for (instrument index or -1)] */
const SPOT=[['Under the tree',-1],['Open grass',1],['Sunny wall',-1],['White box in the shade',0],['Tall pole in the open',3]];
const SITE=[1,0,3];
const BADSPOT={'0-1':'Rain gauge under a tree: leaves catch the rain, so it reads too low.','0-0':'Thermometer under a tree is shaded, but leaves drip and the air is still. Use the white box.','0-3':'The anemometer under a tree is sheltered, so it reads too slow.',
 '2-1':'Rain gauge by a wall: the wall blocks rain blowing in, so it reads wrong.','2-0':'In the sun the thermometer heats up and shows more than the air temperature.','2-3':'A wall blocks the wind. The anemometer needs to be high and open.',
 '3-1':'Inside the box the gauge cannot catch rain.','3-3':'The box blocks the wind. The anemometer needs to be high and open.',
 '4-1':'Rain blows past a gauge on a tall pole. Put it near the ground in the open.','4-0':'Up the pole in the sun and wind, the thermometer does not show the air we feel. Use the white box.',
 '1-0':'Out on the grass in the sun, the thermometer warms up too much. Keep it in the shade, in the white box.','1-3':'Low on the grass, hedges and walls slow the wind. Put the anemometer up high.'};
const KIDS=[['A wind vane points west. That means…',[['Ana','the wind is going west.','The arrow points to where the wind comes FROM. The wind is coming from the west.'],['Bo','the wind is coming from the west.',''],['Cara','the wind is very strong.','A wind vane shows direction, not speed. Use an anemometer for speed.']]],
 ['The rain gauge shows 12 mm. Tomorrow it shows 20 mm and was not emptied. Rain tomorrow was…',[['Dan','20 mm.','20 mm is the total for both days. Take away the 12 mm from before.'],['Esi','8 mm.',''],['Fred','32 mm.','Do not add the two readings. The 12 mm is already in the 20 mm.']]],
 ['To find out how hot it is…',[['Gus','puts the thermometer in the sun.','The sun heats the thermometer itself. Air temperature is read in the shade.'],['Hal','uses an anemometer.','An anemometer measures wind speed, not temperature.'],['Isla','reads a thermometer in the shade.','']]]];
const QZ=[['Which tool measures wind speed?','Anemometer',[['Wind vane','vane'],['Rain gauge','tool']]],
 ['A wind vane points to the north. Where is the wind coming from?','From the north',[['From the south','from'],['It is going north','from']]],
 ['What does a rain gauge measure?','How much rain fell, in mm',[['How fast rain falls','tool'],['How cold the rain is','tool']]],
 ['Where should a rain gauge go?','In the open, away from trees',[['Under a tree, to keep it safe','site'],['On a tall pole','site']]],
 ['The anemometer cups spin faster. What changed?','The wind got stronger',[['The wind changed direction','vane'],['It got warmer','tool']]],
 ['A wide pot and a thin pot sit in the same rain. Which gets deeper water?','Both the same',[['The wide pot','wide'],['The thin pot','wide']]],
 ['Where should a thermometer go?','In the shade, in a white box',[['In full sun','sun'],['Next to a warm wall','sun']]]];
const WHY={vane:'A wind vane shows where the wind comes from. An anemometer shows how fast it blows.',tool:'Each tool measures one thing: thermometer, temperature; rain gauge, rain; wind vane, direction; anemometer, speed.',
 from:'Winds are named for where they come from. The vane points into the wind.',site:'Rain gauges stand low, in the open, away from trees and walls that block or drip rain.',
 wide:'Rain falls evenly. A wide pot catches more drops but spreads them out, so the depth is the same.',sun:'Sunshine heats the thermometer itself. Air temperature is read in the shade.'};
/* drawings of the four instruments and the three wind scenes, kept here so the lab file stays small */
const ln=(X,x1,y1,x2,y2,col,w)=>{X.strokeStyle=col;X.lineWidth=w;X.beginPath();X.moveTo(x1,y1);X.lineTo(x2,y2);X.stroke()};
function icon(X,i,x,y,s){const R='#1f2937';X.save();X.lineCap='round';
 if(i===0){X.fillStyle='#ffffff';X.fillRect(x-s*.12,y-s*.45,s*.24,s*.75);X.strokeStyle=R;X.lineWidth=2;X.strokeRect(x-s*.12,y-s*.45,s*.24,s*.75);X.fillStyle='#dc2626';X.fillRect(x-s*.05,y-s*.1,s*.1,s*.4);X.beginPath();X.arc(x,y+s*.36,s*.16,0,7);X.fill();X.stroke()}
 if(i===1){X.fillStyle='#ffffff';X.strokeStyle=R;X.lineWidth=2;X.beginPath();X.moveTo(x-s*.32,y-s*.45);X.lineTo(x+s*.32,y-s*.45);X.lineTo(x+s*.16,y-s*.25);X.lineTo(x-s*.16,y-s*.25);X.closePath();X.fill();X.stroke();X.strokeRect(x-s*.16,y-s*.25,s*.32,s*.7);X.fillStyle='#3b82f6';X.fillRect(x-s*.15,y+s*.15,s*.3,s*.29);for(let k=0;k<4;k++)ln(X,x-s*.16,y-s*.15+k*s*.15,x-s*.06,y-s*.15+k*s*.15,R,1)}
 if(i===2){ln(X,x,y-s*.1,x,y+s*.45,R,3);ln(X,x-s*.4,y-s*.1,x+s*.4,y-s*.1,R,3);X.fillStyle=R;X.beginPath();X.moveTo(x-s*.48,y-s*.1);X.lineTo(x-s*.32,y-s*.2);X.lineTo(x-s*.32,y);X.closePath();X.fill();X.fillStyle='#f59e0b';X.beginPath();X.moveTo(x+s*.28,y-s*.1);X.lineTo(x+s*.46,y-s*.28);X.lineTo(x+s*.46,y+s*.08);X.closePath();X.fill();X.stroke()}
 if(i===3){ln(X,x,y-s*.15,x,y+s*.45,R,3);[0,2.09,4.19].forEach(a=>{const ex=x+Math.cos(a)*s*.34,ey=y-s*.15+Math.sin(a)*s*.14;ln(X,x,y-s*.15,ex,ey,R,2);X.fillStyle='#16a34a';X.beginPath();X.arc(ex,ey,s*.09,0,7);X.fill();X.strokeStyle=R;X.lineWidth=1.5;X.stroke()})}
 X.restore()}
function scene(X,i,x,y,s){X.save();ln(X,x,y+s*.4,x,y-s*.05,'#78350f',4);const bend=[0,.12,.32][i];X.fillStyle='#22c55e';X.beginPath();X.ellipse(x+bend*s,y-s*.2,s*.3,s*.22,bend,0,7);X.fill();
 if(i===0){X.strokeStyle='#6b7280';X.lineWidth=2;X.beginPath();X.moveTo(x-s*.45,y+s*.4);X.bezierCurveTo(x-s*.55,y,x-s*.35,y-s*.2,x-s*.45,y-s*.45);X.stroke()}
 if(i>0)for(let k=0;k<i+1;k++)ln(X,x-s*.55,y-s*.35+k*s*.22,x-s*.35,y-s*.35+k*s*.22,'#0369a1',2);X.restore()}
/* instruction line for each step: [while working, when done] */
const H={match:['Drag each tool to what it measures, or tap a box.','Four tools matched.'],vane:['Which way does the vane point? Tap a letter or drag the arrow.','Vane turned into the wind 3 times.'],speed:['Drag each reading to what the wind does.','Readings matched.'],
  wide:['Tap the cloud to rain for an hour.','Same depth in both pots.'],gauge:['Drag the arrow to the top of the water, then Check.','All three gauges read.'],site:['Where should it go? Drag it or tap a spot.','All three placed well.'],kids:['Who is right? Tap them.','Facts checked.'],quiz:['Thermometer, rain gauge, wind vane, anemometer.','']};
/* live description of the canvas for screen readers */
function say(k,W){let d='Challenge.';if(k==='match')d=W.won?'All four matched.':`Tool: ${T[W.cur<0?0:W.cur][0]}. Matched: ${[...W.got].map(i=>T[i][0]).join(', ')||'none'}.`;
 if(k==='vane')d=W.won?'Three winds done.':`Wind ${W.k+1}: arrows show wind blowing from the ${DIRS[VANE[W.k]].toLowerCase()} side across to the ${DIRS[(VANE[W.k]+2)%4].toLowerCase()}. Vane points ${W.aim==null?'nowhere yet':DIRS[W.aim].toLowerCase()}.`;
 if(k==='speed')d=W.won?'All three matched.':`Reading: ${SPEED[W.cur][0]} km/h. Scenes: ${SPEED.map(s=>s[1]).join('; ')}.`;
 if(k==='wide')d=W.won?'Same depth.':`${W.hours} hour${W.hours===1?'':'s'} of rain. Wide pot ${W.hours*4} mm deep, thin pot ${W.hours*4} mm deep.`;
 if(k==='gauge')d=W.won?'All three read.':`Gauge ${W.k+1}. Scale 0 to 30 mm. Arrow at ${W.ptr} mm.`;
 if(k==='site')d=W.won?'All three placed.':`Place the ${T[W.cur][0].toLowerCase()}. Spots: ${SPOT.map(s=>s[0]).join(', ')}.`;
 if(k==='kids')d=W.won?'All three checked.':`${KIDS[W.k][0]} `+KIDS[W.k][1].map(x=>x[0]+' says '+x[1]).join(' ');
 return d}
/* feedback for a vane pointed the wrong way, and for a speed matched to the wrong scene */
const vaneMsg=(i,from)=>i===(from+2)%4?`That is where the wind is going. A wind vane points into the wind, to where it comes from: ${DIRS[from].toLowerCase()}.`:`Look at the arrows. The wind blows from the ${DIRS[from].toLowerCase()} side.`;
const speedMsg=i=>{const s=SPEED[i];return `${s[0]} km/h is ${s[0]<6?'only a light air':s[0]<20?'a gentle breeze':'a strong breeze'}. At that speed: ${s[1].toLowerCase()}. Faster cups mean stronger wind.`};
return {vaneMsg,speedMsg,say,icon,scene,H,T,MATCH,DIRS,VANE,SPEED,GAUGE,SPOT,SITE,BADSPOT,KIDS,QZ,WHY}})();
