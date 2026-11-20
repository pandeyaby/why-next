/* Data for flagrover (space robots and rovers, ages 7–9). Sources: NASA Mars Exploration "Mars Facts" (average
   about −60 °C; thin air, mostly carbon dioxide, about 1% of Earth's air pressure); NASA "Mars Close Approach" and Mars
   relay pages (Earth–Mars distance about 55 to 400 million km, one-way radio delay about 3 to 22 minutes; radio waves
   travel at the speed of light, about 300,000 km each second); NASA Mars 2020 mission (trip about 7 months, Perseverance
   landed 18 Feb 2021 in Jezero Crater, an old lake with a river delta; drill cores sealed in sample tubes; SuperCam
   laser; Mastcam-Z cameras; top speed about 152 m an hour; Ingenuity helicopter first flew 19 Apr 2021); NASA MSL
   (Curiosity landed 6 Aug 2012 in Gale Crater; rounded pebbles from an old stream bed, 2012; lake mudstone at
   Yellowknife Bay; mineral veins left by water in cracks); NASA Mars Pathfinder (Sojourner, first Mars rover, 1997). */
const ROV=(()=>{
/* scene 1: what a person needs on Mars, and why a rover copes */
const NEEDS=[{t:'Air',fact:'Mars has very thin air, mostly carbon dioxide.',person:'A person cannot breathe it.',robot:'A rover does not breathe at all.'},
 {t:'Warmth',fact:'Mars is about −60 °C on average.',person:'A person would freeze without a heated suit.',robot:'A rover has heaters for its parts.'},
 {t:'Trip',fact:'The trip to Mars takes about 7 months.',person:'A person needs food and water all the way there and back.',robot:'A rover needs no food, and it never has to come home.'},
 {t:'Danger',fact:'A crash or a sandstorm can end a mission.',person:'People would be in danger.',robot:'If a rover breaks, no one is hurt.'}];
/* scene 2: radio delay. light travels about 300,000 km each second */
const KMS=300000,NEAR=55,FAR=400;  /* millions of km */
const mins=mkm=>mkm*1e6/KMS/60;
/* scene 3: the drive grid (cols x rows), rover start, sample rock, craters that tip a rover */
const GRID={c:6,r:5,start:[0,4],goal:[5,0],holes:[[1,3],[2,3],[3,4],[2,1],[3,1],[4,3],[1,0],[4,0]]};
const ROUTE=[[0,4],[0,3],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[5,1],[5,0]];
/* scene 4: rover tools (x,y are spots on the rover picture, as fractions of its size) */
const TOOLS=[{k:'cam',t:'Mast cameras',x:.08,y:-.95,job:'Take photos of the hills far away',hint:'Cameras sit high on the mast, like eyes.'},
 {k:'laser',t:'Laser',x:-.12,y:-1.12,job:'Find out what a rock is made of from 7 m away',hint:'The laser zaps a rock from metres away and reads the flash of light.'},
 {k:'drill',t:'Drill on the arm',x:.92,y:-.1,job:'Get powder from inside a rock',hint:'Only the drill can reach inside a rock.'},
 {k:'tube',t:'Sample tubes',x:-.45,y:-.35,job:'Keep a piece of rock to send to Earth one day',hint:'Tubes keep rock cores sealed and safe.'},
 {k:'wheel',t:'Six wheels',x:-.55,y:.42,job:'Climb over small rocks and sand',hint:'Wheels do the climbing.'}];
const JOBS=[0,2,1,3,4];
/* scene 5: rocks on Mars: three were made by water long ago */
const ROCKS=[{k:'pebble',t:'Round pebbles',water:true,why:'Round pebbles were rolled smooth by a flowing stream.'},
 {k:'sharp',t:'Sharp broken rock',water:false,why:'Sharp edges mean it broke off and was not rolled by water.'},
 {k:'layer',t:'Thin flat layers of mudstone',water:true,why:'Mud settles in flat layers at the bottom of a still lake.'},
 {k:'dune',t:'Dust dune',water:false,why:'Wind piles up dust into dunes. Mars is very windy and dry today.'},
 {k:'vein',t:'White lines in cracks',water:true,why:'Water flowed through cracks and left white minerals behind.'},
 {k:'crater',t:'Crater rim',water:false,why:'A space rock hit the ground and made the crater. That needs no water.'}];
const ROBOT=[{say:'Engineers drive the rover live, like a remote-control car.',ok:false,fix:'Radio takes 3 to 22 minutes to reach Mars, so engineers send a plan and the rover follows it.'},
 {say:'Perseverance drills rock cores and seals them in tubes.',ok:true,fix:'Yes. The tubes keep the rock safe so it could be brought to Earth one day.'},
 {say:'Rovers found rivers flowing on Mars today.',ok:false,fix:'Mars is dry today. Rovers found rocks made by rivers and lakes long ago.'},
 {say:'A rover is slower than you walk.',ok:true,fix:'Yes. Its top speed is about 150 m in an hour, so it drives slowly and carefully.'},
 {say:'We send robots because people are not allowed on Mars.',ok:false,fix:'No rule stops people. Mars is far away, very cold and has no air to breathe, so robots go first.'}];
const DESC=[
 'Four Mars panels: Air, Warmth, Trip and Danger. Tap each panel to see what it means for a person and for a rover.',
 'Earth on the left and Mars on the right. Drag Mars nearer or further, then tap Send to time the radio message.',
 'A map of Mars with craters. Tap the squares next to the rover to plan a path to the rock, then tap Send plan.',
 'A rover with five tools. Read the job, then tap the tool on the rover that does it.',
 'Six rocks a rover found on Mars. Tap the three that show water flowed there long ago.',
 'A robot says things about space rovers. Buttons: Right or Slip.'];
const DONE=[
 'People need air, warmth, food and a safe trip home. A rover needs none of these, so robots explore Mars first.',
 'The message takes about 3 minutes when Mars is near and about 22 minutes when it is far.',
 'You planned the whole drive first, because no one can steer a rover on Mars live.',
 'Cameras look, the laser tests from far away, the drill looks inside, tubes keep samples and six wheels climb.',
 'Round pebbles, flat mud layers and white veins all show Mars had water long ago.',
 'The robot slipped three times: no live driving, no rivers today, and people are not banned.'];
const QS=[
 {q:'Why do we send rovers to Mars instead of people?',a:'Mars has no air to breathe and is very far and cold',o:[['People are not allowed on Mars','people'],['Mars is too small to stand on','people']]},
 {q:'Engineers on Earth send a message to a rover on Mars. When does it get there?',a:'Between about 3 and 22 minutes later',o:[['At the very same moment','delay'],['About 7 months later','delay']]},
 {q:'How do engineers move a rover around a crater?',a:'They send a planned path and the rover follows it',o:[['They steer it live with a joystick','live'],['They ask an astronaut on Mars to push it','live']]},
 {q:'Which rover tool can look inside a rock?',a:'The drill on its arm',o:[['The wheels','tool'],['The mast cameras','tool']]},
 {q:'Which rock is a clue that water flowed on Mars long ago?',a:'Round, smooth pebbles',o:[['A sharp broken rock','water'],['A dust dune made by wind','water']]},
 {q:'Is there a river flowing on Mars today?',a:'No, Mars is dry, but rocks show it had water long ago',o:[['Yes, rovers swim in it','today'],['No, and it never had any water','today']]},
 {q:'What happens to the rock cores Perseverance drills?',a:'They are sealed in tubes to keep for Earth one day',o:[['The rover flies them home that day','tool'],['The rover eats them for power','tool']]}];
/* pictures drawn on the lab canvas */
function round(g,x,y,w,h,r){g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
/* the rover side view, centred on (x,y) with size u; hi = tool key to ring */
function paintRover(g,x,y,u,hi,ok){g.save();const P='#111827';g.lineWidth=2;g.strokeStyle=P;g.lineJoin='round';
 g.fillStyle='#e2e8f0';round(g,x-u*.7,y-u*.45,u*1.4,u*.5,u*.08);g.fill();g.stroke();
 g.fillStyle='#64748b';g.fillRect(x-u*.62,y-u*.4,u*.3,u*.22);g.fillStyle='#fbbf24';round(g,x-u*.2,y-u*.4,u*.55,u*.3,u*.05);g.fill();g.stroke();
 g.beginPath();g.moveTo(x-u*.05,y-u*.45);g.lineTo(x-u*.05,y-u*.85);g.stroke();g.fillStyle='#cbd5e1';round(g,x-u*.2,y-u*1.05,u*.42,u*.22,u*.05);g.fill();g.stroke();
 g.fillStyle='#1e3a8a';g.beginPath();g.arc(x+u*.08,y-u*.94,u*.06,0,7);g.arc(x-u*.12,y-u*.94,u*.05,0,7);g.fill();
 g.beginPath();g.moveTo(x+u*.7,y-u*.3);g.lineTo(x+u*.95,y-u*.55);g.lineTo(x+u*.95,y-u*.15);g.stroke();g.fillStyle='#475569';g.fillRect(x+u*.88,y-u*.18,u*.1,u*.16);
 g.fillStyle='#94a3b8';[-.45,-.35,-.25].forEach(d=>{round(g,x+d*u,y-u*.38,u*.07,u*.2,u*.03);g.fill();g.stroke()});
 g.lineWidth=3;g.beginPath();g.moveTo(x-u*.55,y+u*.38);g.lineTo(x-u*.3,y+u*.05);g.lineTo(x,y+u*.38);g.moveTo(x+u*.55,y+u*.38);g.lineTo(x+u*.35,y+u*.05);g.stroke();g.lineWidth=2;
 g.fillStyle='#dc2626';round(g,x-u*.2,y-u*1.18,u*.16,u*.12,u*.03);g.fill();g.stroke();
 [-.55,0,.55].forEach(d=>{g.fillStyle='#334155';g.beginPath();g.arc(x+d*u,y+u*.38,u*.17,0,7);g.fill();g.fillStyle='#cbd5e1';g.beginPath();g.arc(x+d*u,y+u*.38,u*.06,0,7);g.fill()});
 if(hi){const T=TOOLS.find(q=>q.k===hi);g.lineWidth=4;g.strokeStyle=ok?'#15803d':'#b91c1c';g.beginPath();g.arc(x+T.x*u,y+T.y*u,u*.2,0,7);g.stroke()}
 g.restore()}
/* a small rock picture for the water-clue scene */
function paintRock(g,k,x,y,u){g.save();const P='#111827';g.lineWidth=1.5;g.strokeStyle=P;
 if(k==='pebble'){[[-.4,.1,.22],[0,.2,.28],[.4,0,.2],[-.1,-.2,.18],[.3,.3,.16]].forEach(([a,b,r])=>{g.fillStyle='#d6a77a';g.beginPath();g.ellipse(x+a*u,y+b*u,r*u,r*u*.75,0,0,7);g.fill();g.stroke()})}
 if(k==='sharp'){g.fillStyle='#a16207';g.beginPath();g.moveTo(x-u*.5,y+u*.35);g.lineTo(x-u*.2,y-u*.45);g.lineTo(x+u*.05,y-u*.05);g.lineTo(x+u*.3,y-u*.5);g.lineTo(x+u*.55,y+u*.35);g.closePath();g.fill();g.stroke()}
 if(k==='layer'){['#c2410c','#ea580c','#fb923c','#c2410c','#fdba74'].forEach((c,i)=>{g.fillStyle=c;g.fillRect(x-u*.55,y-u*.4+i*u*.16,u*1.1,u*.16)});g.strokeRect(x-u*.55,y-u*.4,u*1.1,u*.8)}
 if(k==='dune'){g.fillStyle='#f59e0b';g.beginPath();g.moveTo(x-u*.6,y+u*.35);g.quadraticCurveTo(x-u*.1,y-u*.55,x+u*.6,y+u*.35);g.closePath();g.fill();g.stroke()}
 if(k==='vein'){g.fillStyle='#9a3412';round(g,x-u*.5,y-u*.4,u,u*.8,u*.12);g.fill();g.stroke();g.strokeStyle='#f8fafc';g.lineWidth=u*.07;g.beginPath();g.moveTo(x-u*.4,y-u*.2);g.lineTo(x+u*.4,y+u*.1);g.moveTo(x-u*.2,y+u*.3);g.lineTo(x+u*.1,y-u*.3);g.stroke()}
 if(k==='crater'){g.fillStyle='#b45309';g.beginPath();g.ellipse(x,y,u*.6,u*.32,0,0,7);g.fill();g.stroke();g.fillStyle='#78350f';g.beginPath();g.ellipse(x,y+u*.03,u*.4,u*.18,0,0,7);g.fill()}
 g.restore()}
function paintPlanet(g,kind,x,y,r){g.save();g.fillStyle=kind==='earth'?'#2563eb':'#c2410c';g.beginPath();g.arc(x,y,r,0,7);g.fill();
 g.fillStyle=kind==='earth'?'#16a34a':'#9a3412';g.beginPath();g.ellipse(x-r*.25,y-r*.15,r*.35,r*.25,.5,0,7);g.fill();g.beginPath();g.ellipse(x+r*.3,y+r*.35,r*.2,r*.12,0,0,7);g.fill();g.restore()}
return{paintRover,paintRock,paintPlanet,NEEDS,KMS,NEAR,FAR,mins,GRID,ROUTE,TOOLS,JOBS,ROCKS,ROBOT,DESC,DONE,QS}})();
