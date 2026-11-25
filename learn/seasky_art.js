/* Data and drawings for flagseasky (seasonal constellations; ages 9-10). The space view puts each constellation in its
   real direction (right ascension: Orion 5.5 h, Leo 10.7 h, Scorpius 16.9 h, Pegasus 23.0 h) and Earth at the middle of
   each month, where the direction its night side faces at midnight (the anti-Sun right ascension) is about 7.7 h + 2 h per
   month from January. A constellation within 45 degrees of that direction is high at midnight; within 35 degrees of the
   Sun (145 degrees or more away) it is lost in daylight. Times for the 9 pm view are local mean time for Britain (51.5 N,
   no summer time): Orion is due south at about 21.8 h - 2 h per month after mid-January. Sources: Royal Museums Greenwich
   'What can I see in the night sky this month?' and 'Constellations'; NASA Space Place 'Why do we see different stars
   at different times of the year?'; NGSS 5-ESS1-2; DfE National Curriculum Year 5 Earth and space; IAU constellation
   boundaries. Slips it targets: stars switch off or go away in summer; constellations travel round space; clouds or
   Earth's tilt cause the change; stars are gone in the day; every constellation is seasonal (circumpolar ones are not);
   stars come up at the same time every night; the Southern Hemisphere sees the same season with the same stars. */
const SKY=(()=>{
const KEYS=['orion','leo','scorpius','pegasus'],NAME={orion:'Orion',leo:'Leo',scorpius:'Scorpius',pegasus:'Pegasus',plough:'The Plough',cass:'Cassiopeia'};
const RA={orion:5.5,leo:10.7,scorpius:16.9,pegasus:23.0},SEASON={orion:'Winter',leo:'Spring',scorpius:'Summer',pegasus:'Autumn'};
const MONTH=['January','February','March','April','May','June','July','August','September','October','November','December'];
const SEAS_OF=m=>['Winter','Winter','Spring','Spring','Spring','Summer','Summer','Summer','Autumn','Autumn','Autumn','Winter'][m];
const anti=m=>(7.7+2*m)%24;                                        /* hours: where the night side faces at midnight */
const sep=(k,m)=>{let d=Math.abs(RA[k]-anti(m))%24;if(d>12)d=24-d;return d*15};   /* degrees from the midnight direction */
const vis=(k,m)=>{const d=sep(k,m);return d<=45?'high':d>=145?'day':'part'};
const ang=h=>Math.PI/2-(h-7.7)*Math.PI/12;                          /* screen angle: January at the bottom, anticlockwise */
/* 9 pm view facing south from Britain: hours from due south (minus = east, still rising) */
const south=m=>{let T=(21.8-2*m)%24;if(T<0)T+=24;let ha=21-T;if(ha>12)ha-=24;if(ha<-12)ha+=24;return{T,ha}};
const where=ha=>Math.abs(ha)>=6?'below':ha<=-3.5?'east':ha>=3.5?'west':Math.abs(ha)<=1.5?'south':ha<0?'south-east':'south-west';
const clock=T=>{const h=Math.round(T)%24;return h===0?'midnight':h===12?'midday':h<12?`${h} am`:`${h-12} pm`};
/* star patterns in chart coordinates (north up, east left), -1..1; m = magnitude class 1 bright .. 3 faint */
const PAT={orion:{s:[[-.55,-.75,1],[.45,-.62,2],[-.2,0,2],[0,-.06,2],[.2,-.13,2],[-.42,.8,2],[.55,.72,1]],l:[[0,1],[0,2],[1,4],[2,3],[3,4],[2,5],[4,6]]},
 leo:{s:[[.55,.42,1],[.48,.06,3],[.58,-.25,2],[.78,-.46,3],[.62,-.72,3],[.36,-.62,3],[-.35,-.18,2],[-.36,.24,3],[-.86,.12,2]],l:[[0,1],[1,2],[2,3],[3,4],[4,5],[2,6],[6,8],[8,7],[7,0]]},
 scorpius:{s:[[.85,-.8,2],[.95,-.45,2],[.8,-.15,3],[.45,-.3,1],[.25,-.15,3],[.1,.15,3],[0,.45,3],[-.2,.75,3],[-.55,.85,2],[-.8,.65,2],[-.72,.4,3]],l:[[0,1],[1,2],[1,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10]]},
 pegasus:{s:[[-.55,-.55,2],[.4,-.6,2],[.45,.35,2],[-.5,.38,2],[.75,.6,3],[1,.82,2]],l:[[0,1],[1,2],[2,3],[3,0],[2,4],[4,5]]},
 plough:{s:[[.96,-.48,2],[.98,-.03,2],[.36,.19,2],[.1,-.08,3],[-.36,0,2],[-.72,.09,2],[-1,.56,2]],l:[[0,1],[1,2],[2,3],[3,0],[3,4],[4,5],[5,6]]},
 cass:{s:[[.91,.13,2],[.34,.5,2],[.06,-.1,2],[-.46,-.03,2],[-.97,-.53,2]],l:[[0,1],[1,2],[2,3],[3,4]]}};
/* the Plough's place round the North Star in the evening, facing north (0 = above, minus = towards the west on the left) */
const NORTH={Spring:0,Summer:-Math.PI/2,Autumn:Math.PI,Winter:Math.PI/2},SEASONS=['Winter','Spring','Summer','Autumn'];
const CARDS=['orion','leo','plough','scorpius','cass','pegasus'];
const DESC=['Space seen from above the North Pole: the Sun in the middle, Earth on its orbit, and four constellations far out in space. Drag Earth round, or use the month buttons. A window shows what the night side sees at midnight.',
 'Earth is stopped at one month. One constellation is in the same direction as the Sun. Tap it.',
 'Four constellations and four season boxes. Drag a constellation to the season when it is high on the night sky in the north of the world, or tap it and then tap a box.',
 'The sky at 9 pm, facing south from Britain: east on the left, west on the right. Change the month and watch where Orion is.',
 'The northern sky with the North Star in the middle. Change the season, and tap the two constellations you can see on every clear night of the year.'];
const TXT=['Earth goes round the Sun once a year. Its night side faces a different part of space each month.',
 'Stars do not go away. Some are just in the day sky, behind the Sun.',
 'In the north of the world, each season has its own constellations at night.',
 'Stars rise about 4 minutes earlier each night. That adds up to 2 hours each month.',
 'From Britain, a few constellations near the North Star never set.'];
const DONE=['Each season the night side faces a new part of space: Orion in winter, Leo in spring, Scorpius in summer and Pegasus in autumn.',
 'The hidden constellation was always the one on the far side of the Sun. Its stars are still there, in the day sky.',
 'Orion is a winter constellation, Leo a spring one, Scorpius a summer one and Pegasus an autumn one (in the north of the world).',
 'At 9 pm Orion rises in the east in November, is due south in January and sets in the west in April. It shifts west a little every night.',
 'The Plough and Cassiopeia circle the North Star and never set from Britain, so you can see them all year.'];
const QS=[{q:'Why can\u2019t we see Orion on summer nights in Britain?',a:'It is in the day sky, near the Sun',o:[['Its stars switch off in summer','off'],['Summer clouds always hide it','cloud']]},
 {q:'What makes the night sky change through the year?',a:'Earth\u2019s trip round the Sun',o:[['The stars travel round space','move'],['Earth\u2019s tilt turns the stars over','tilt']]},
 {q:'Which constellation is high on winter nights in the north of the world?',a:'Orion',o:[['Scorpius','season'],['Pegasus','season']]},
 {q:'Each night, a star rises about how much earlier?',a:'About 4 minutes',o:[['About 4 hours','time'],['At the same time every night','time']]},
 {q:'Orion is due south at 10 pm in January. About when is it due south a month later?',a:'About 8 pm',o:[['About midnight','time'],['At 10 pm again','time']]},
 {q:'Can you see the Plough on summer nights from Britain?',a:'Yes, it is up all year',o:[['No, it is only a spring constellation','set'],['No, it has moved away in space','move']]},
 {q:'In December it is summer in Australia. Which of these is in their December night sky?',a:'Orion',o:[['Scorpius','south'],['None: summer has no stars','off']]},
 {q:'Where are the stars of Leo in late August?',a:'Near the Sun, in the day sky',o:[['They are gone until spring','off'],['Below the ground all year','move']]}];
/* ---------- drawings ---------- */
const INK='#0f172a',OK='#047857',NO='#b91c1c',RIM='#64748b',GOLD='#fde047',F='px system-ui,sans-serif';
function stars(g,k,x,y,s,rot,o){o=o||{};const P=PAT[k],c=Math.cos(rot||0),n=Math.sin(rot||0),pt=([a,b])=>[x+(a*c-b*n)*s,y+(a*n+b*c)*s];
 g.strokeStyle=o.line||'rgba(148,163,184,.85)';g.lineWidth=Math.max(1,s*.035);g.beginPath();for(const[i,j]of P.l){const A=pt(P.s[i]),B=pt(P.s[j]);g.moveTo(A[0],A[1]);g.lineTo(B[0],B[1])}g.stroke();
 for(const st of P.s){const[px,py]=pt(st),r=Math.max(1.6,s*(st[2]===1?.11:st[2]===2?.08:.055));g.fillStyle=o.dim?'#64748b':o.col||GOLD;g.beginPath();g.arc(px,py,r,0,7);g.fill()}}
function sun(g,x,y,r){g.fillStyle='#f59e0b';g.beginPath();g.arc(x,y,r*1.35,0,7);g.globalAlpha=.25;g.fill();g.globalAlpha=1;g.fillStyle='#fbbf24';g.beginPath();g.arc(x,y,r,0,7);g.fill()}
function earth(g,x,y,r,a){/* a = direction away from the Sun: that half is night */g.fillStyle='#38bdf8';g.beginPath();g.arc(x,y,r,0,7);g.fill();g.fillStyle='#0b1220';g.beginPath();g.arc(x,y,r,a-Math.PI/2,a+Math.PI/2);g.closePath();g.fill();g.strokeStyle='#e2e8f0';g.lineWidth=1.5;g.beginPath();g.arc(x,y,r,0,7);g.stroke()}
function PEN(A){const sz=n=>A.narrow?n:Math.round(n*1.1),g=()=>A.ctx,dk=()=>A.col.dark,fg=()=>dk()?'#f1f5f9':INK;
 function wrap(t,max,font){const c=g();c.font=font;const out=[];let line='';for(const w of String(t).split(' ')){const nx=line?line+' '+w:w;if(line&&c.measureText(nx).width>max){out.push(line);line=w}else line=nx}if(line)out.push(line);return out}
 function strip(t,tone,note,bad){const c=g(),font=`800 ${sz(15)}${F}`,L=wrap(t,A.W-34,font),lh=sz(15)*1.3,h=L.length*lh+14;
  c.fillStyle=tone==='ok'?(dk()?'#14532d':'#dcfce7'):tone==='no'?(dk()?'#7f1d1d':'#fee2e2'):(dk()?'#1e293b':'#ffffff');A.paint.rrect(8,8,A.W-16,h,10);c.fill();
  c.lineWidth=tone?2.5:1.2;c.strokeStyle=tone==='ok'?OK:tone==='no'?NO:RIM;c.stroke();c.font=font;c.fillStyle=fg();c.textAlign='left';c.textBaseline='top';L.forEach((r,i)=>c.fillText(r,17,15+i*lh));
  let y=8+h+6;if(note){const f2=`700 ${sz(13)}${F}`,L2=wrap(note,A.W-34,f2).slice(0,3);c.font=f2;c.fillStyle=bad?(dk()?'#fca5a5':NO):(dk()?'#86efac':OK);L2.forEach((r,i)=>c.fillText(r,17,y+i*sz(13)*1.3));y+=L2.length*sz(13)*1.3+6}return y}
 function tag(t,x,y,n,col,bg){const c=g();c.font=`700 ${sz(n||12)}${F}`;const w=c.measureText(t).width+10,h=sz(n||12)+8;let bx=Math.max(4,Math.min(A.W-w-4,x-w/2));
  c.fillStyle=bg||'rgba(2,6,23,.78)';A.paint.rrect(bx,y-h/2,w,h,7);c.fill();c.fillStyle=col||'#f8fafc';c.textAlign='left';c.textBaseline='middle';c.fillText(t,bx+5,y+.5);return{x:bx,y:y-h/2,w,h}}
 function box(r,o){o=o||{};const c=g();c.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':o.sel?'#dbeafe':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,10);c.fill();
  c.lineWidth=o.no||o.ok||o.sel?3.5:1.5;c.strokeStyle=o.no?NO:o.ok?OK:o.sel?'#1d4ed8':RIM;c.stroke()}
 function text(t,x,y,n,align,col){const c=g();c.font=`800 ${sz(n)}${F}`;c.fillStyle=col||fg();c.textAlign=align||'left';c.textBaseline='middle';c.fillText(t,x,y)}
 return{wrap,strip,tag,box,text,sz,fg,dk}}
return{KEYS,NAME,RA,SEASON,MONTH,SEAS_OF,anti,sep,vis,ang,south,where,clock,PAT,NORTH,SEASONS,CARDS,DESC,TXT,DONE,QS,INK,OK,NO,stars,sun,earth,PEN}})();
