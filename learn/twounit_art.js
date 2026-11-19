/* Data for flagtwounit (measuring with different units, ages 7–8). Sources: CCSS Math 2.MD.A.2 ("Measure the length of an
   object twice, using length units of different lengths for the two measurements; describe how the two measurements
   relate to the size of the unit chosen"); DfE (2013) National Curriculum mathematics, Year 2 measurement (choose and use
   standard units, cm and m, to estimate and measure length); NIST: 1 inch = 2.54 cm exactly. Real sizes used: a drinking
   straw about 20 cm, a large paper clip about 5 cm, a school exercise book 28 cm (11 in), a pencil 18 cm (7 in), a spoon
   15 cm (6 in). Slips it targets: a bigger unit gives a bigger number; the count is the same whatever the unit; gaps or
   overlaps between units; starting a ruler at 1, not 0; a number with no unit. */
const TWU=(()=>{
/* scenes 1 and 2: a 60 cm scarf measured with straws, then with paper clips */
const SCARF=60,UNITS=[{k:'straw',name:'straw',plural:'straws',cm:20,col:'#f472b6'},{k:'clip',name:'paper clip',plural:'paper clips',cm:5,col:'#60a5fa'}];
/* scene 3: drag the unit to make a 24 cm ribbon take this many units */
const RIBBON=24,TARGETS=[6,3,12];
/* scene 4: line the thing up with 0, then read it in cm and in inches */
const THINGS=[{name:'book',cm:28,inch:11,col:'#fbbf24'},{name:'pencil',cm:18,inch:7,col:'#a3e635'}];
/* scene 5: two people measure the same rug with their own feet; whose foot is longer? */
const FEET=[{a:'Kai',an:8,b:'Mum',bn:5,long:1},{a:'Dad',an:4,b:'Zara',bn:7,long:0},{a:'Gran',an:6,b:'Leo',bn:9,long:0}];
const ROBOT=[
 {say:'A straw is longer than a paper clip, so you need more straws.',ok:false,fix:'Longer units fit fewer times. The scarf was 3 straws but 12 paper clips.'},
 {say:'The scarf is 3 straws long and 12 clips long. The scarf is the same length both times.',ok:true,fix:'Yes. The length did not change, only the unit did.'},
 {say:'Leave a little gap between the clips so they are easy to count.',ok:false,fix:'Gaps make the count too small. Lay units end to end with no gaps and no overlaps.'},
 {say:'Start the ruler at 1, because 1 is the first number.',ok:false,fix:'Line the end of the thing up with 0. Starting at 1 adds a centimetre that is not there.'},
 {say:'The book is 28 cm and 11 inches. An inch is longer than a centimetre.',ok:true,fix:'Yes. Fewer inches fit, so each inch must be longer: 1 inch is about 2 and a half cm.'}];
const DESC=[
 'A pink scarf and a box of straws. Tap the scarf or the button to lay a straw end to end.',
 'The same scarf and a box of paper clips. Tap to lay the clips end to end.',
 'A ribbon and a unit bar with a handle. Drag the handle to make the unit longer or shorter.',
 'A ruler and a thing to measure. Drag the thing so its end is at 0, then read the ruler.',
 'Two people measured the same rug with their feet. Tap the person with the longer foot.',
 'A robot says things about measuring. Buttons: Right or Slip.'];
const DONE=[
 'The scarf is 3 straws long.',
 'The same scarf is 12 paper clips long: a shorter unit fits more times.',
 'Long unit, few of them. Short unit, lots of them.',
 'A centimetre is shorter than an inch, so you get more centimetres.',
 'Fewer feet means a longer foot.',
 'Three slips: bigger unit means more, gaps, and starting at 1.'];
const QS=[
 {q:'A desk is 6 hands long. Will it be more or fewer pencils long, if a pencil is longer than a hand?',a:'Fewer pencils',o:[['More pencils','big'],['The same, 6','same']]},
 {q:'A rope is 10 big steps long. Sam measures it in small steps. What could he get?',a:'14 small steps',o:[['7 small steps','big'],['10 small steps','same']]},
 {q:'Ava lays clips along a book with gaps between them. Her count will be…',a:'Too small',o:[['Too big','gapbig'],['Just right','gap']]},
 {q:'A crayon starts at 1 on the ruler and ends at 9. How long is it?',a:'8 cm',o:[['9 cm','zero'],['10 cm','zero']]},
 {q:'A shoe is 20 cm long. About how many inches long is it?',a:'8 inches',o:[['20 inches','same'],['50 inches','big']]},
 {q:'Mia says her ribbon is "12". What is missing?',a:'The unit, like 12 cm',o:[['Nothing, 12 is fine','unit'],['A bigger number','big']]}];
/* a long saying split over two balanced lines inside one white card (the robot scene) */
function card2(g,rr,W,text,y,f,F,edge,ink){g.font=`700 ${f}${F}`;const max=W-34;let rows=[text];
 if(g.measureText(text).width>max){const w=text.split(' ');let best=1,gap=1e9;for(let k=1;k<w.length;k++){const d=Math.abs(g.measureText(w.slice(0,k).join(' ')).width-g.measureText(w.slice(k).join(' ')).width);if(d<gap){gap=d;best=k}}rows=[w.slice(0,best).join(' '),w.slice(best).join(' ')]}
 while(f>10&&rows.some(t=>g.measureText(t).width>max)){f--;g.font=`700 ${f}${F}`}
 const wd=Math.max(...rows.map(t=>g.measureText(t).width))+24,h=rows.length*(f+5)+14,l=(W-wd)/2;g.fillStyle='#ffffff';rr(l,y-h/2,wd,h,10);g.fill();g.lineWidth=1.4;g.strokeStyle=edge;g.stroke();
 g.fillStyle=ink;g.textAlign='center';g.textBaseline='middle';rows.forEach((t,k)=>g.fillText(t,W/2,y+(k-(rows.length-1)/2)*(f+5)))}
return{card2,SCARF,UNITS,RIBBON,TARGETS,THINGS,FEET,ROBOT,DESC,DONE,QS}})();
