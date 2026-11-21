/* Data for flagfcast (weather forecasting, ages 7–9). Facts: NOAA SciJinks "How reliable are weather forecasts?"
   (5-day forecast right about 9 times in 10, 7-day about 8 in 10, 10-day or longer about half the time); NOAA National
   Weather Service radiosonde pages (balloons launched twice a day from about 900 sites, rise for about 2 hours to over
   30 km, then burst); NWS radar (radio waves bounce off raindrops, range about 200 km); Met Office "What does a % chance
   of rain mean?" (70% = a 7 in 10 chance of rain at that place) and Met Office weather warnings (yellow, amber, red). */
const FCA=(()=>{
/* scene 1: four jobs, four tools. The tray order is mixed so position gives nothing away. */
const JOBS=['Takes photos of clouds from space','Finds where rain is falling now','Measures the air high up as it rises','Measures rain, wind and heat on the ground'];
const TOOLS=[{n:'Satellite',job:0},{n:'Radar',job:1},{n:'Weather balloon',job:2},{n:'Weather station',job:3}];
const TRAY=[2,0,3,1];
const WHY=[
 'A satellite circles high above Earth. It sees clouds from space but cannot feel the rain or wind down here.',
 'Radar sends out radio waves. They bounce back off raindrops, so it can map where rain is falling right now.',
 'A weather balloon carries sensors up through the air for about 2 hours, more than 30 km up, then it bursts.',
 'A weather station stays in one place on the ground and measures the weather right there.'];
const SLIP={0:'A satellite is out in space. It takes photos of clouds; it does not touch the air or the rain.',1:'Radar stays on the ground and sends radio waves out. It maps rain; it does not go up into the air.',2:'A balloon rises and then bursts. It measures the air it passes through; it is not out in space or on a map.',3:'A weather station only measures the spot where it stands, on the ground.'};
/* scene 2: a radar map, 8 squares across, each square 10 km. Rain moves 1 square east each hour (wind from the west). */
const COLS=8,TOWN=6,START=1,HOUR0=9;
const TIMES=['11 am','1 pm','3 pm'],TIME_ANS=1;
const TIME_SLIP=['That is only 2 hours. The rain moves 1 square each hour, and its front edge is 4 squares from the town.','','3 pm is when the back of the rain passes. It starts to rain when the front edge reaches the town.'];
const clock=h=>h<12?h+' am':h===12?'12 pm':(h-12)+' pm';
/* scene 3: five computer runs of the same forecast (°C, days 1 to 7). They start together and spread out. */
const RUNS=[[14,15,15,16,17,18,19],[14,15,16,15,14,13,12],[14,14,15,17,18,16,15],[15,15,14,14,16,18,20],[14,16,15,14,13,15,17]];
const DAY_ANS=0;
/* scene 4: 7 in 10 */
const PCT=70,WANT=7,SURE={keys:['Yes, it will rain for sure','Rain is likely, but not certain','No, it will be dry'],ans:1,
 slip:['70% is not 100%. On 3 days out of 10 like this one, it stays dry.','','Rain is more likely than dry: 7 days in 10 like this one are wet.']};
/* scene 5: three days, three plans */
const DAYS=[{d:'Saturday',w:'Sunny, light wind',k:'sun'},{d:'Sunday',w:'Yellow warning: strong wind',k:'warn'},{d:'Monday',w:'90% chance of rain',k:'rain'}];
const PLANS=[{t:'Picnic in the park',day:0},{t:'Tie down the trampoline',day:1},{t:'Pack a raincoat',day:2}];
const PLAN_SLIP={
 '0-1':'Strong wind can blow things over and snap branches. Sunday is a day to stay safe, not for a picnic.',
 '0-2':'90% chance of rain: a picnic on Monday will very likely get wet.',
 '1-0':'Saturday has only a light wind. The warning is on Sunday, so that is when the trampoline needs tying down.',
 '1-2':'Monday is rainy, not windy. The wind warning is for Sunday.',
 '2-0':'Saturday is sunny. Monday has a 90% chance of rain, so that is the day for a raincoat.',
 '2-1':'Sunday is windy. The rain is forecast for Monday.'};
const DESC=[
 'Four jobs and four forecasting tools. Drag each tool onto its job, or pick a tool and then a job with the buttons.',
 'A radar map with rain to the west of a town. Wind blows from the west. Drag the rain east one square at a time to see the time, then choose when rain reaches the town.',
 'A graph of five computer runs of the same temperature forecast for 7 days. Run the computer, then tap the day the runs agree best.',
 'Ten boxes, one for each day like tomorrow. Tap boxes to make them rainy until they show a 70% chance of rain, then answer.',
 'Three days of forecast and three plans. Drag each plan onto the right day.'];
const DONE=[
 'Each tool does one job: satellites see clouds from space, radar maps rain, balloons measure high up, stations measure on the ground.',
 'The rain moves 1 square an hour. Its front edge is 4 squares away, so it reaches the town at 1 pm.',
 'All runs agree on day 1 and spread out by day 7. Forecasts are surest for the next few days.',
 '70% means 7 in 10 days like this one are rainy. Rain is likely but not certain.',
 'Forecasts help you plan: a sunny picnic, safety in the wind, a raincoat for the rain.'];
const QS=[
 {q:'Which tool shows where rain is falling right now?',a:'Radar',o:[['A weather balloon','tool'],['A thermometer','tool']]},
 {q:'The rain’s front edge is 3 squares west of town. It moves 1 square each hour. It is 10 am now. When will it rain in town?',a:'1 pm',o:[['7 am','back'],['3 pm','edge']]},
 {q:'The forecast says 30% chance of rain. What does that mean?',a:'On 3 in 10 days like this, it rains here',o:[['It will rain for 30% of the day','pct'],['Rain will fall on 30% of the town','pct']]},
 {q:'Which forecast is most likely to be right?',a:'Tomorrow’s forecast',o:[['The forecast for 10 days away','far'],['They are all just as sure','far']]},
 {q:'A west wind is blowing. Where is the rain coming from?',a:'From the west',o:[['From the east','west'],['From the north','west']]},
 {q:'Which warning means the most danger?',a:'Red',o:[['Yellow','warn'],['Amber','warn']]},
 {q:'How does a weather balloon find out about the air high up?',a:'It carries sensors up through the air',o:[['It takes photos from space','tool'],['It bounces radio waves off rain','tool']]}];
const P=[
 'Meteorologists are scientists who forecast the weather. They collect measurements from many tools. Match each tool to its job.',
 'Radar shows where rain is now. The pale shape is where it was an hour ago. Drag the rain on, hour by hour, and find when it reaches the town.',
 'A supercomputer uses the measurements to work out what the air will do next. Forecasters run it several times, each time starting from very slightly different numbers.',
 'A forecast can say “70% chance of rain”. Each box is one day just like tomorrow. Make the boxes match the forecast.',
 'Forecasts help people plan, and warnings help keep them safe. A yellow warning means be aware, amber means be prepared and red means take action now.'];
const YES=['Yes: 1 pm. Four squares at 1 square an hour is 4 hours after 9 am.','Yes: on day 1 every run gives 14 or 15 °C. By day 7 they range from 12 to 20 °C.',
 'Yes. Rain is likely, so take a coat, but 3 days in 10 like this one stay dry.','Yes: 7 rainy days out of 10. Now, will it rain tomorrow for sure?'];
/* small pictures of each tool, drawn at (x,y) in a box of size s */
function icon(g,k,x,y,s){g.save();g.translate(x,y);g.lineWidth=Math.max(1.5,s*.06);g.strokeStyle='#1e293b';g.lineCap='round';
 if(k===0){g.fillStyle='#93c5fd';g.fillRect(-s*.45,-s*.1,s*.3,s*.2);g.fillRect(s*.15,-s*.1,s*.3,s*.2);g.fillStyle='#cbd5e1';g.fillRect(-s*.14,-s*.17,s*.28,s*.34);g.strokeRect(-s*.14,-s*.17,s*.28,s*.34)}
 if(k===1){g.fillStyle='#e2e8f0';g.beginPath();g.arc(0,-s*.05,s*.3,Math.PI*.85,Math.PI*1.95);g.closePath();g.fill();g.stroke();g.beginPath();g.moveTo(0,0);g.lineTo(-s*.15,s*.38);g.moveTo(0,0);g.lineTo(s*.15,s*.38);g.stroke()}
 if(k===2){g.fillStyle='#fca5a5';g.beginPath();g.arc(0,-s*.18,s*.24,0,7);g.fill();g.stroke();g.beginPath();g.moveTo(0,s*.06);g.lineTo(0,s*.28);g.stroke();g.fillStyle='#fde68a';g.fillRect(-s*.08,s*.28,s*.16,s*.12);g.strokeRect(-s*.08,s*.28,s*.16,s*.12)}
 if(k===3){g.beginPath();g.moveTo(0,s*.42);g.lineTo(0,-s*.3);g.moveTo(-s*.25,-s*.3);g.lineTo(s*.25,-s*.3);g.stroke();g.fillStyle='#fde68a';[-1,1].forEach(d=>{g.beginPath();g.arc(d*s*.25,-s*.3,s*.08,0,7);g.fill();g.stroke()});g.fillStyle='#ffffff';g.fillRect(-s*.15,0,s*.3,s*.2);g.strokeRect(-s*.15,0,s*.3,s*.2)}
 g.restore()}
function cloud(g,x,y,r,col){g.fillStyle=col;g.beginPath();g.arc(x-r*.6,y,r*.55,0,7);g.arc(x,y-r*.3,r*.7,0,7);g.arc(x+r*.65,y,r*.5,0,7);g.fill()}
function sun(g,x,y,r){g.strokeStyle='#b45309';g.lineWidth=Math.max(1.5,r*.18);for(let i=0;i<8;i++){const a=i*Math.PI/4;g.beginPath();g.moveTo(x+Math.cos(a)*r*1.2,y+Math.sin(a)*r*1.2);g.lineTo(x+Math.cos(a)*r*1.6,y+Math.sin(a)*r*1.6);g.stroke()}g.fillStyle='#fbbf24';g.beginPath();g.arc(x,y,r,0,7);g.fill()}
function wet(g,x,y,r){cloud(g,x,y,r,'#64748b');g.strokeStyle='#1d4ed8';g.lineWidth=2;for(let k=-1;k<=1;k++){g.beginPath();g.moveTo(x+k*r*.6,y+r*.5);g.lineTo(x+k*r*.6-3,y+r*1.05);g.stroke()}}
function warn(g,x,y,R){g.fillStyle='#facc15';g.beginPath();g.moveTo(x,y-R*1.3);g.lineTo(x+R*1.4,y+R);g.lineTo(x-R*1.4,y+R);g.closePath();g.fill();g.strokeStyle='#0f172a';g.lineWidth=2;g.stroke();
 g.fillStyle='#0f172a';g.font=`900 ${Math.round(R*1.1)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText('!',x,y+R*.1)}
return{YES,P,wet,warn,JOBS,TOOLS,TRAY,WHY,SLIP,COLS,TOWN,START,HOUR0,TIMES,TIME_ANS,TIME_SLIP,clock,RUNS,DAY_ANS,PCT,WANT,SURE,DAYS,PLANS,PLAN_SLIP,DESC,DONE,QS,icon,cloud,sun}})();
