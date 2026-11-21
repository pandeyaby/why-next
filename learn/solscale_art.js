/* Data for flagsolscale (scale of the solar system, ages 9–11). Sources: NASA Planetary Fact Sheet (equatorial diameters
   and mean distances from the Sun; Sun diameter 1,392,700 km; Moon 3,475 km at a mean 384,400 km from Earth); G. Ottewell,
   "The Thousand-Yard Model" (a ball Sun with a peppercorn-sized Earth about 26 paces away). Model here: the Sun is a 22 cm
   football, so 1 cm of model stands for 1,392,700 ÷ 22 ≈ 63,300 km. Every size and every distance uses that one scale:
   Earth is a 2 mm pinhead 23.6 m away, Jupiter a 2.3 cm grape 123 m away, Neptune an 8 mm pea 713 m away, and the Moon a
   0.5 mm speck 6 cm from Earth. Slips it targets: planets drawn big next to the Sun; planets spaced evenly; the Moon about
   as far away as the planets; a poster can show sizes and distances to one scale; a smaller model shrinks only the sizes. */
const SOLS=(()=>{
const SUN_KM=1392700,BALL_CM=22,KM_PER_CM=SUN_KM/BALL_CM;
/* name, diameter (km), mean distance from the Sun (million km) */
const PLANETS=[
 {name:'Mercury',km:4879,mkm:57.9,col:'#78716c'},{name:'Venus',km:12104,mkm:108.2,col:'#d97706'},
 {name:'Earth',km:12756,mkm:149.6,col:'#2563eb'},{name:'Mars',km:6792,mkm:227.9,col:'#c2410c'},
 {name:'Jupiter',km:142984,mkm:778.5,col:'#a16207'},{name:'Saturn',km:120536,mkm:1432,col:'#ca8a04'},
 {name:'Uranus',km:51118,mkm:2867,col:'#0e7490'},{name:'Neptune',km:49528,mkm:4515,col:'#1d4ed8'}];
const MOON={km:3475,away:384400};
const byName=n=>PLANETS.find(p=>p.name===n);
/* model size in mm and model distance in metres for a Sun ball of sunCm centimetres */
const sizeMm=(km,sunCm)=>km/(SUN_KM/(sunCm||BALL_CM))*10;
const awayM=(mkm,sunCm)=>mkm*1e6/(SUN_KM/(sunCm||BALL_CM))/100;
/* scene 1: everyday things to stand for a planet next to the football Sun */
const THINGS=[{name:'pinhead',mm:2},{name:'pea',mm:8},{name:'grape',mm:23},{name:'tennis ball',mm:67}];
const MATCH=[{p:'Earth',ans:0,why:'The Sun is 109 times as wide as Earth. 22 cm ÷ 109 is 2 mm: a pinhead.'},
 {p:'Jupiter',ans:2,why:'The Sun is about 10 times as wide as Jupiter. 22 cm ÷ 10 is about 2 cm: a grape.'},
 {p:'Neptune',ans:1,why:'The Sun is about 28 times as wide as Neptune. 22 cm ÷ 28 is about 8 mm: a pea.'}];
/* scenes 2 and 3: the double ruler (million km on top, model metres below) */
const LINES={inner:{names:['Mercury','Venus','Earth','Mars'],max:240,tol:12},outer:{names:['Jupiter','Saturn','Uranus','Neptune'],max:4800,tol:150}};
/* scenes 2, 3 and 5: the double rulers (real distance above, model distance below) */
const RULERS={
 inner:{names:LINES.inner.names,max:LINES.inner.max,tol:LINES.inner.tol,real:n=>byName(n).mkm,model:v=>awayM(v),top:'million km',bot:'m',tStep:50,bStep:10,nudge:5,d:0},
 outer:{names:LINES.outer.names,max:LINES.outer.max,tol:LINES.outer.tol,real:n=>byName(n).mkm,model:v=>awayM(v),top:'million km',bot:'m',tStep:1000,bStep:200,nudge:100,d:-1},
 moon:{names:['Moon'],max:500,tol:25,real:()=>MOON.away/1000,model:v=>v*1000/KM_PER_CM,top:'thousand km',bot:'cm',tStep:100,bStep:1,nudge:10,d:1}};
/* scene 4: poster zoom, as log10 of km per screen pixel */
const ZMIN=3,ZMAX=7.4,ZSTEP=0.4;
/* scene 6: the biggest whole-centimetre Sun whose Neptune stays inside a 100 m field */
const FIELD_M=100,SUN_MIN=1,SUN_MAX=30;
const fitsSun=()=>{let s=SUN_MAX;while(s>SUN_MIN&&awayM(4515,s)>FIELD_M)s--;return s};
const DESC=[
 'A 22 cm football stands for the Sun. Drag the right thing into the box for each planet, or tap it.',
 'Top ruler: real distance from the Sun in millions of km. Bottom ruler: the same distance in the football model, in metres. Drag each planet to its real distance.',
 'The ruler now reaches Neptune. The four inner planets crowd at the very start. Drag each outer planet to its real distance.',
 'Sizes and distances drawn to one scale on your screen. Drag the zoom handle. Try to fit Neptune on, then try to make Earth big enough to see.',
 'The pinhead Earth with a ruler in centimetres below. Drag the Moon to its real distance from Earth, 384,000 km.',
 'Drag the handle to change the size of the model Sun. The model must fit a 100 m school field, with Neptune at the far end.'];
const DONE=[
 'Next to a football Sun, Earth is a pinhead, Jupiter a grape and Neptune a pea.',
 'The four inner planets fit in 36 m. Earth is 24 m from the football.',
 'Neptune is 713 m away: 30 times as far as Earth. The gaps grow fast.',
 'No screen can show both: fit the distances and the planets vanish; see the planets and Neptune is thousands of screens away.',
 'The Moon is only 6 cm from the pinhead Earth: very close next to the planets.',
 'A 3 cm Sun puts Neptune at 97 m. Earth is then a speck under 0.3 mm wide.'];
const QS=[
 {q:'The Sun is a 22 cm football and Earth is a pinhead. About how far apart are they?',a:'About 24 metres',o:[['About 30 cm','close'],['About 2 km','far']]},
 {q:'Why do most pictures of the solar system not show distances to scale?',a:'The planets would be too small to see',o:[['Nobody knows the distances','know'],['The planets really are close together','even']]},
 {q:'Which gap is bigger: Earth to Mars, or Saturn to Uranus?',a:'Saturn to Uranus',o:[['Earth to Mars','even'],['They are about the same','even']]},
 {q:'You make the model Sun twice as wide. The model distance to Neptune…',a:'Doubles too',o:[['Stays the same','scale'],['Halves','scale']]},
 {q:'In the football model, how far is the Moon from the pinhead Earth?',a:'About 6 cm',o:[['About 24 metres','moon'],['About 1 metre','moon']]},
 {q:'Jupiter is the biggest planet. Next to the Sun it is…',a:'About 10 times narrower',o:[['About the same size','size'],['About half as wide','size']]}];
/* challenge feedback for the remaining slips (the lab holds the rest) */
const WHY={far:'Too far. 2 km is past Neptune. Earth is about 24 m from a football Sun; Neptune is 713 m.',know:'Scientists know the distances well. The real reason is size: drawn to one scale, the planets would be specks.',scale:'Scale every length by the same amount. A Sun twice as wide means every distance is twice as far.',size:'Even Jupiter is tiny next to the Sun: the Sun is about 10 times as wide.'};
return{WHY,RULERS,SUN_KM,BALL_CM,KM_PER_CM,PLANETS,MOON,byName,sizeMm,awayM,THINGS,MATCH,LINES,ZMIN,ZMAX,ZSTEP,FIELD_M,SUN_MIN,SUN_MAX,fitsSun,DESC,DONE,QS}})();
