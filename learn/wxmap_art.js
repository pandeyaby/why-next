/* Data for flagwxmap (reading weather maps, ages 9–11). Sources: Met Office "Weather symbols" and "How to read a
   weather map" guides (symbols for sun, sunny spells, cloud, rain, snow and thunder; temperatures in °C; wind arrows
   point the way the wind is blowing, with the speed in mph; a wind is named from the direction it comes from, so a
   westerly blows from the west); DfE (2013) KS2 science "working scientifically" (record and present data in bar
   charts and tables, use results to make predictions) and NGSS 3-ESS2-1 (represent weather data in tables and graphs
   to describe typical conditions in a season). The island, towns and numbers are made up for practice. Slips it
   targets: a cloud means rain, sunny means warm, naming a wind by where it is going, ordering −1 after 4, reading the
   tallest bar as the driest, and thinking the weather will stay where it is. */
const WXMAP=(()=>{
/* towns: position on the map (0-1), symbol, temperature °C, wind [direction it blows TO in degrees from north, mph] */
const TOWNS=[{n:'North Bay',x:.5,y:.16,s:'snow',t:-1,w:[180,12]},{n:'West Port',x:.17,y:.48,s:'rain',t:10,w:[90,18]},
 {n:'Hill Town',x:.52,y:.5,s:'storm',t:13,w:[90,30]},{n:'East Cove',x:.84,y:.5,s:'cloud',t:8,w:[0,8]},{n:'Sunford',x:.5,y:.84,s:'sun',t:4,w:[270,10]}];
const SYMNAME={snow:'snow',rain:'rain',storm:'thunderstorm',cloud:'cloud, no rain',sun:'sunshine'};
const SYMQ=[{q:'Where will it snow?',a:0,why:{1:'Those are raindrops under the cloud, not snowflakes.',2:'That cloud has a lightning bolt: a thunderstorm.',3:'That cloud has nothing under it: cloudy and dry.',4:'That is the sun: no snow there.'}},
 {q:'Where is it cloudy but dry?',a:3,why:{1:'That cloud has raindrops under it, so it is raining.',2:'That cloud has a lightning bolt, so a storm is coming.',0:'Those are snowflakes: it is snowing.',4:'That is the sun, not a cloud.'}},
 {q:'Where is a thunderstorm on the way?',a:2,why:{1:'Raindrops mean rain, but no lightning bolt means no thunder.',3:'A plain cloud means cloudy and dry.',0:'Snowflakes mean snow.',4:'The sun means a clear sky.'}},
 {q:'Which town has the best weather for a picnic?',a:4,why:{1:'Raindrops: your picnic would get wet.',2:'Lightning: a storm is no time for a picnic.',3:'Cloudy and dry is fine, but one town has sunshine.',0:'Snowflakes: it is snowing there.'}}];
const COLD=[0,4,3,1,2];/* town index from coldest to warmest */
const COMPASS={0:'north',90:'east',180:'south',270:'west'},FROM={0:'south',90:'west',180:'north',270:'east'};
const WINDQ=[{town:1,ask:'name'},{town:0,ask:'name'},{town:3,ask:'name'},{ask:'strong',a:2}];
const NAMES=['North wind','South wind','East wind','West wind'];
const MONTHS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],RAIN=[85,65,55,45,40,35,30,40,60,90,110,95];
const SEASONS=[['Winter',[11,0,1]],['Spring',[2,3,4]],['Summer',[5,6,7]],['Autumn',[8,9,10]]];
const GRAPHQ=[{q:'Tap the wettest month.',k:'wet'},{q:'Tap the driest month.',k:'dry'},{q:'Which season is driest? Add up its 3 months.',k:'season'}];
/* rain band: squares 1-8 west to east; 9 am on square 2, 12 noon on square 4; West Port is square 1, East Cove square 8 */
const BAND={seen:[[2,'9 am'],[4,'12 noon']],ask:[{t:'3 pm',c:6},{t:'6 pm',c:8}]};
const TXT=['Weather maps use pictures called symbols. Look at what is under the cloud: drops mean rain, flakes mean snow, a bolt means thunder.',
 'Temperatures are numbers in °C. A sunny day can still be cold, so read the number.',
 'A wind arrow points the way the wind is blowing. A wind is named from where it comes from. The number is the speed in mph.',
 'A bar chart of rainfall shows a pattern through the year. A tall bar means a wet month.',
 'Weather moves. If rain moves at a steady speed, you can work out where it will be later.'];
const DESC=['A map of an island with 5 towns, each with a weather symbol. Tap the town that answers the question.',
 'The map shows a temperature in °C at each town. Tap the towns from coldest to warmest.',
 'The map shows a wind arrow and a speed in mph at each town. Answer each wind question.',
 'A bar chart of rainfall in mm for each month in Brin. Tap a bar, or use the buttons.',
 'A strip across the island in 8 squares, with the rain at 9 am and 12 noon. Drag the rain to where it will be later, or use the buttons.'];
const DONE=['Drops for rain, flakes for snow, a bolt for thunder, and a cloud with nothing under it is dry.',
 'Coldest to warmest: −1, 4, 8, 10, 13 °C. Sunny Sunford is cold, so always read the number.',
 'The arrow shows where the wind blows to, but its name says where it comes from. The biggest number is the strongest wind.',
 'Wettest: November (110 mm). Driest: July (30 mm). Summer is the driest season (105 mm).',
 'The rain moves 2 squares every 3 hours, so it reaches square 6 at 3 pm and East Cove, square 8, at 6 pm.'];
const QS=[{q:'A cloud on the map has nothing under it. What weather does it show?',a:'Cloudy and dry',o:[['Rain','cloud'],['Snow','cloud']]},
 {q:'Sunford has a sun symbol and 2 °C. Port Lee has rain and 11 °C. Which is warmer?',a:'Port Lee',o:[['Sunford','sun'],['They are the same','sun']]},
 {q:'A wind arrow points from the north to the south. What is the wind called?',a:'A north wind',o:[['A south wind','from'],['An east wind','dir']]},
 {q:'Two wind arrows show 9 mph and 24 mph. Which wind is stronger?',a:'24 mph',o:[['9 mph','speed'],['The longer arrow','speed']]},
 {q:'Which temperature is coldest: 3 °C, −2 °C or 0 °C?',a:'−2 °C',o:[['0 °C','neg'],['3 °C','neg']]},
 {q:'A rainfall chart has bars for each month. How do you find the driest month?',a:'Find the shortest bar',o:[['Find the tallest bar','tall'],['Find the last bar','tall']]},
 {q:'Rain moves 1 square east every hour. It is on square 2 at 10 am. Where is it at 1 pm?',a:'Square 5',o:[['Square 2','move'],['Square 3','move']]}];
/* canvas weather symbols, Met Office style: sun, cloud, rain drops, snowflakes, lightning */
const cloud=(g,x,y,r,dark)=>{g.fillStyle=dark?'#64748b':'#f1f5f9';g.strokeStyle='#334155';g.lineWidth=1.6;g.beginPath();g.arc(x-r*.45,y+r*.1,r*.45,Math.PI*.5,Math.PI*1.5);g.arc(x-r*.05,y-r*.2,r*.55,Math.PI,Math.PI*1.95);g.arc(x+r*.5,y+r*.05,r*.45,Math.PI*1.4,Math.PI*.5);g.closePath();g.fill();g.stroke()}
const sym=(g,P,s,x,y,r)=>{if(s==='sun'){g.strokeStyle='#b45309';g.lineWidth=2.2;for(let k=0;k<8;k++){const a=k*Math.PI/4;g.beginPath();g.moveTo(x+Math.cos(a)*r*.62,y+Math.sin(a)*r*.62);g.lineTo(x+Math.cos(a)*r*.95,y+Math.sin(a)*r*.95);g.stroke()}P.ball(x,y,r*.48,'#facc15');g.beginPath();g.arc(x,y,r*.48,0,7);g.stroke();return}
 const yy=y-r*.2;cloud(g,x,yy,r,s==='storm');
 if(s==='rain'){g.strokeStyle='#1d4ed8';g.lineWidth=2.4;[-.4,0,.4].forEach(d=>{g.beginPath();g.moveTo(x+d*r,yy+r*.6);g.lineTo(x+d*r-r*.12,yy+r*.95);g.stroke()})}
 if(s==='snow'){g.strokeStyle='#1e3a8a';g.lineWidth=1.6;[-.4,0,.4].forEach(d=>{const cx=x+d*r,cy=yy+r*.8;for(let k=0;k<3;k++){const a=k*Math.PI/3;g.beginPath();g.moveTo(cx-Math.cos(a)*r*.15,cy-Math.sin(a)*r*.15);g.lineTo(cx+Math.cos(a)*r*.15,cy+Math.sin(a)*r*.15);g.stroke()}})}
 if(s==='storm'){g.fillStyle='#facc15';g.strokeStyle='#713f12';g.lineWidth=1.2;g.beginPath();[[.05,.35],[-.2,.8],[0,.8],[-.12,1.15],[.25,.62],[.05,.62],[.2,.35]].forEach(([a,b],i)=>i?g.lineTo(x+a*r,yy+b*r):g.moveTo(x+a*r,yy+b*r));g.closePath();g.fill();g.stroke()}}
/* a temperature in a coloured circle (blue cold to orange warm), white text */
const temp=(g,x,y,t,r,f)=>{const col=t<=0?'#1d4ed8':t<=6?'#0e7490':t<=10?'#047857':'#c2410c';g.fillStyle=col;g.beginPath();g.arc(x,y,r,0,7);g.fill();g.strokeStyle='#ffffff';g.lineWidth=2;g.stroke();
 g.font=`800 ${f}px system-ui,sans-serif`;g.fillStyle='#ffffff';g.textAlign='center';g.textBaseline='middle';g.fillText((t<0?'−'+(-t):t)+'°',x,y+1)}
return{sym,temp,TOWNS,SYMNAME,SYMQ,COLD,COMPASS,FROM,WINDQ,NAMES,MONTHS,RAIN,SEASONS,GRAPHQ,BAND,TXT,DESC,DONE,QS}})();
