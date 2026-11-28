/* Data and drawings for flagwxdiary (Local weather patterns; Science, Earth's systems, ages 5-6).
   Sources: NGSS K-ESS2-1 'Use and share observations of local weather conditions to describe patterns over time'
   (clarification: qualitative sunny, cloudy, rainy, warm; quantitative numbers of sunny, windy and rainy days in a
   month; relative temperature at different times of the day, e.g. cooler in the morning than in the afternoon);
   National Curriculum in England (2013) Year 1 Seasonal changes ('observe changes across the four seasons'; 'observe
   and describe weather associated with the seasons and how day length varies'); Met Office for schools, weather
   diary and 'why is it warmest in the afternoon' guidance; Met Office UK climate averages (winter colder and darker,
   summer warmer and lighter). Slips it targets: taking the one day you remember best as the pattern; thinking the
   morning is the warmest part of the day; calling a single event a pattern; thinking a pattern must happen every
   single time; and thinking every season has the same weather. */
const WXD=(()=>{
const KINDS=['sun','cloud','rain'],NAME={sun:'Sunny',cloud:'Cloudy',rain:'Rainy'};
const SEEN={sun:'the sun is out and the sky is clear',cloud:'thick grey cloud and no drops',rain:'drops are falling'};
/* steps 1-2: one school week */
const WEEK=[{d:'Mon',day:'Monday',w:'rain'},{d:'Tue',day:'Tuesday',w:'sun'},{d:'Wed',day:'Wednesday',w:'rain'},{d:'Thu',day:'Thursday',w:'cloud'},{d:'Fri',day:'Friday',w:'rain'}];
/* step 3: air temperature in the shade at 9 am and 2 pm (a spring week in a UK town, degrees C) */
const TEMPS=[{day:'Monday',am:9,pm:14},{day:'Tuesday',am:11,pm:17},{day:'Wednesday',am:8,pm:12},{day:'Thursday',am:10,pm:15},{day:'Friday',am:7,pm:13}];
/* step 4: pattern (p = 0) or just one day (p = 1) */
const BINS4=['A pattern','Just one day'];
const SAYS=[{t:'Most days this week were rainy',p:0},{t:'It snowed on my birthday',p:1},{t:'Every afternoon was warmer than the morning',p:0},
 {t:'Friday was windy',p:1},{t:'Summer days are usually warmer than winter days',p:0},{t:'The puddle froze on Tuesday',p:1}];
const NO4=['That happened on lots of days, so it is a pattern. You find it by counting days.','That is one day. One day on its own is not a pattern.'];
/* step 5: winter (s = 0) or summer (s = 1), in a place with four seasons like the UK */
const BINS5=['Winter','Summer'];
const SEASON=[{t:'Frost on the grass',s:0,no:'Frost needs freezing cold air. That is winter weather.'},{t:'Hot sun, 25 \u00b0C',s:1,no:'25 \u00b0C is hot. Hot days come in summer.'},
 {t:'Snow on the swings',s:0,no:'Snow needs freezing cold. That is winter weather.'},{t:'Light at bedtime',s:1,no:'Summer days are long, so it is still light at bedtime.'},
 {t:'Dark at tea time',s:0,no:'Winter days are short, so it gets dark early.'},{t:'Picnic in warm sun',s:1,no:'Warm, sunny picnic days are most common in summer.'}];
const DESC=['Five windows, one for each day from Monday to Friday, and three weather symbols: sunny, cloudy and rainy. Drag a symbol under each window, or press a button.',
 'The weather diary for the week and a chart with three columns: Sunny, Cloudy and Rainy. Drag each day into its column, or press a button, and count.',
 'Two thermometers for one day: 9 in the morning and 2 in the afternoon. Tap the warmer one, the one with the taller red line, for each day.',
 'Six cards about the weather. Drag each card into A pattern or Just one day, or press a button.',
 'Six weather cards. Drag each one into Winter or Summer, or press a button.'];
const TXT=['Look out of the window at the same time each day. Draw what you see. That is a weather diary.',
 'Count the days in the diary. The weather with the most days is the pattern for the week. Do not trust the day you remember best.',
 'A thermometer shows how warm the air is. A taller red line means warmer. The sun warms the air all day, so the afternoon is usually warmer than the morning.',
 'A pattern is what happens again and again. One day on its own is not a pattern.',
 'Weather changes with the seasons. Where there are four seasons, winter days are usually colder and shorter. Summer days are usually warmer and longer.'];
const DONE=['Your diary: rainy, sunny, rainy, cloudy, rainy.','Rainy 3, sunny 1, cloudy 1. This week was mostly rainy.',
 'On all 5 days, 2 pm was warmer than 9 am. That is a pattern.','Patterns happen on many days. A one-off day is not a pattern.',
 'Frost, snow and early dark are winter. Hot sun, long light evenings and picnics are summer.'];
/* challenge: a = right answer; o = [wrong answer, slip tag] */
const QS=[{q:'A diary says: rain, sun, rain, rain, cloud. Which weather came most?',a:'Rain',o:[['Sun','count'],['Cloud','count']]},
 {q:'When is the air usually warmer?',a:'In the afternoon',o:[['Early in the morning','morn'],['It is the same all day','morn']]},
 {q:'Which one is a weather pattern?',a:'Most days in July were warm',o:[['It hailed on Sunday','one'],['My kite flew on Friday','one']]},
 {q:'Where there are four seasons, when do you most often see frost?',a:'Winter',o:[['Summer','season'],['Every season the same','season']]},
 {q:'Tom saw 4 sunny days and 1 rainy day. Was the week mostly sunny?',a:'Yes, 4 of 5 days were sunny',o:[['No, it rained one day','always'],['Yes, because Monday was sunny','one']]},
 {q:'Why write the weather down every day?',a:'So we can count days and spot patterns',o:[['So we remember one nice day','one'],['To change the weather','why']]}];
/* ---------- drawings ---------- */
const INK='#0f172a',LIGHT='#f1f5f9',OK='#047857',NO='#b91c1c',EDGE='#64748b',SEL='#1d4ed8',F='px system-ui,sans-serif';
function rr(g,x,y,w,h,r){r=Math.min(r,w/2,h/2);g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
function lines(g,text,maxW,font){g.font=font;const out=[];let cur='';String(text).split(' ').forEach(w=>{const t=cur?cur+' '+w:w;if(cur&&g.measureText(t).width>maxW){out.push(cur);cur=w}else cur=t});if(cur)out.push(cur);return out}
function card(g,r,label,st,size){g.fillStyle=st==='no'?'#fee2e2':st==='ok'?'#dcfce7':st==='sel'?'#dbeafe':'#ffffff';rr(g,r.x,r.y,r.w,r.h,12);g.fill();
 g.strokeStyle=st==='no'?NO:st==='ok'?OK:st==='sel'?SEL:EDGE;g.lineWidth=st?4:2;g.stroke();
 let n=size||17,rows;do{rows=lines(g,label,r.w-12,`800 ${n}${F}`);if(rows.length*n*1.2<=r.h-8)break;n--}while(n>11);
 g.font=`800 ${n}${F}`;g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';rows.forEach((t,i)=>g.fillText(t,r.x+r.w/2,r.y+r.h/2+(i-(rows.length-1)/2)*n*1.2))}
function head(A,text,tone,reply,bad){const g=A.ctx,dk=A.col.dark,s=A.narrow?17:19,f=`800 ${s}${F}`,rows=lines(g,text,A.W-36,f),lh=s*1.3,h=rows.length*lh+16;
 g.fillStyle=tone==='ok'?(dk?'#14532d':'#dcfce7'):tone==='no'?(dk?'#7f1d1d':'#fee2e2'):(dk?'#1e293b':'#ffffff');rr(g,8,8,A.W-16,h,12);g.fill();
 g.strokeStyle=tone==='ok'?OK:tone==='no'?NO:EDGE;g.lineWidth=tone?2.5:1.2;g.stroke();g.font=f;g.fillStyle=dk?LIGHT:INK;g.textAlign='left';g.textBaseline='top';rows.forEach((t,i)=>g.fillText(t,18,16+i*lh));
 let y=8+h+6;if(reply){const f2=`700 ${s-2}${F}`,r2=lines(g,reply,A.W-36,f2).slice(0,3);g.font=f2;g.fillStyle=bad?(dk?'#fca5a5':NO):(dk?'#86efac':OK);r2.forEach((t,i)=>g.fillText(t,18,y+i*(s-2)*1.3));y+=r2.length*(s-2)*1.3+6}return y}
/* weather symbols, centred at x, y, size s */
function sun(g,x,y,s){g.strokeStyle='#b45309';g.lineWidth=Math.max(2,s*.08);for(let k=0;k<8;k++){const a=k*Math.PI/4;g.beginPath();g.moveTo(x+Math.cos(a)*s*.42,y+Math.sin(a)*s*.42);g.lineTo(x+Math.cos(a)*s*.6,y+Math.sin(a)*s*.6);g.stroke()}
 g.fillStyle='#facc15';g.beginPath();g.arc(x,y,s*.32,0,7);g.fill();g.strokeStyle='#b45309';g.lineWidth=1.5;g.stroke()}
function cloud(g,x,y,s,col){g.fillStyle=col||'#94a3b8';[[-.22,.05,.22],[.05,-.08,.28],[.28,.06,.2]].forEach(([dx,dy,r])=>{g.beginPath();g.arc(x+dx*s,y+dy*s,r*s,0,7);g.fill()});g.fillRect(x-.22*s,y+.02*s,.5*s,.24*s)}
function rain(g,x,y,s){cloud(g,x,y-s*.12,s*.9,'#64748b');g.strokeStyle='#1d4ed8';g.lineWidth=Math.max(2,s*.06);g.lineCap='round';[-.2,0,.2].forEach(dx=>{g.beginPath();g.moveTo(x+dx*s,y+s*.2);g.lineTo(x+dx*s-s*.06,y+s*.38);g.stroke()});g.lineCap='butt'}
function icon(g,kind,x,y,s){if(kind==='sun')sun(g,x,y,s);else if(kind==='cloud')cloud(g,x,y,s);else rain(g,x,y,s)}
/* a window showing the sky for one kind of weather */
function window_(g,r,kind){g.fillStyle=kind==='sun'?'#bae6fd':kind==='cloud'?'#cbd5e1':'#94a3b8';g.fillRect(r.x,r.y,r.w,r.h);
 if(kind==='sun')sun(g,r.x+r.w*.62,r.y+r.h*.4,Math.min(r.w,r.h)*.62);else if(kind==='cloud'){cloud(g,r.x+r.w*.35,r.y+r.h*.35,r.w*.5,'#64748b');cloud(g,r.x+r.w*.7,r.y+r.h*.6,r.w*.45,'#475569')}
 else{cloud(g,r.x+r.w*.5,r.y+r.h*.28,r.w*.6,'#475569');g.strokeStyle='#1e3a8a';g.lineWidth=2;for(let i=0;i<7;i++){const dx=r.x+6+i*(r.w-12)/6,dy=r.y+r.h*(.5+.12*(i%3));g.beginPath();g.moveTo(dx,dy);g.lineTo(dx-3,dy+9);g.stroke()}}
 g.strokeStyle='#78350f';g.lineWidth=4;g.strokeRect(r.x,r.y,r.w,r.h);g.lineWidth=2.5;g.beginPath();g.moveTo(r.x+r.w/2,r.y);g.lineTo(r.x+r.w/2,r.y+r.h);g.moveTo(r.x,r.y+r.h/2);g.lineTo(r.x+r.w,r.y+r.h/2);g.stroke()}
/* a thermometer from 0 to 20 degrees C in box r */
function thermo(g,r,t,dk,st){const top=r.y+10,bot=r.y+r.h-26,x=r.x+r.w/2,H=bot-top,yv=v=>bot-H*v/20;
 g.fillStyle=st==='ok'?'#dcfce7':st==='no'?'#fee2e2':'#ffffff';rr(g,r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=st==='ok'?OK:st==='no'?NO:EDGE;g.lineWidth=st?4:2;g.stroke();
 g.fillStyle='#e2e8f0';rr(g,x-7,top,14,H+6,7);g.fill();g.strokeStyle=EDGE;g.lineWidth=1.5;g.stroke();
 g.fillStyle='#dc2626';g.fillRect(x-4,yv(t),8,bot-yv(t)+4);g.beginPath();g.arc(x,bot+8,11,0,7);g.fill();
 g.font=`700 12${F}`;g.fillStyle=INK;g.textAlign='right';g.textBaseline='middle';for(let v=0;v<=20;v+=5){g.fillText(String(v),x-12,yv(v));g.beginPath();g.moveTo(x-9,yv(v));g.lineTo(x-7,yv(v));g.stroke()}
 g.textAlign='left';g.font=`800 16${F}`;g.fillText(`${t} \u00b0C`,x+12,yv(t))}
return{KINDS,NAME,SEEN,WEEK,TEMPS,BINS4,SAYS,NO4,BINS5,SEASON,DESC,TXT,DONE,QS,INK,LIGHT,OK,NO,EDGE,SEL,F,rr,lines,card,head,sun,cloud,rain,icon,window_,thermo}})();
