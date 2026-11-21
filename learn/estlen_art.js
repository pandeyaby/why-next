/* Data for flagestlen (estimating lengths, ages 7–8). Sources: DfE (2013) National Curriculum mathematics programmes of
   study, Year 2 measurement (choose and use appropriate standard units to estimate and measure length in m and cm) and
   Year 3 (measure, compare lengths in m, cm, mm); CCSS 2.MD.A.3 (estimate lengths using units of inches, feet,
   centimetres and metres); NCETM Year 2 measures guidance (benchmarks: a fingertip is about 1 cm wide, a ruler 30 cm,
   a door about 2 m tall, a paper clip about 3 cm). Benchmark facts: UK standard internal door height 1981 mm (BS 4787), lever handles at
   800-1050 mm (BS 8300-2), A4 long side 297 mm. Slips it targets: picking the wrong unit (a pencil 15 m long), counting the
   benchmarks and forgetting their size (4 rulers read as 4 cm), and thinking an estimate is a wild guess or must be exact. */
const ELN=(()=>{
/* benchmarks: what is about each length */
const BENCH=[{len:'1 cm',thing:'A fingertip, side to side',icon:'tip'},{len:'30 cm',thing:'A school ruler',icon:'ruler'},
 {len:'1 m',thing:'Floor up to a door handle',icon:'handle'},{len:'2 m',thing:'A door, floor to top',icon:'door'}];
const BENCHWHY={tip:'A fingertip is tiny: about 1 cm wide.',ruler:'A school ruler is 30 cm long.',handle:'A door handle is about 1 m up from the floor.',door:'A whole door is about 2 m tall: two metre sticks.'};
const ASK=[2,0,3,1];
/* sensible estimates: one right, two with the wrong unit or a silly size */
const SENSE=[{obj:'A pencil',opts:['About 15 cm','About 15 m','About 1 cm'],ans:0,why:{1:'15 m is longer than a bus. A pencil is about half a ruler: 15 cm.',2:'1 cm is one fingertip. A pencil is much longer: about half a ruler.'}},
 {obj:'A bed',opts:['About 2 cm','About 2 m','About 20 m'],ans:1,why:{0:'2 cm is two fingertips. A bed fits a grown-up lying down: about 2 m, the height of a door.',2:'20 m is as long as a swimming pool. A bed is about 2 m.'}},
 {obj:'A car',opts:['About 40 cm','About 40 m','About 4 m'],ans:2,why:{0:'40 cm is just over one ruler. A car is about 4 m: two doors lying end to end.',1:'40 m is longer than ten cars. A car is about 4 m.'}},
 {obj:'A teaspoon',opts:['About 13 m','About 13 cm','About 1 m'],ans:1,why:{0:'13 m is longer than a classroom. A teaspoon is less than half a ruler: about 13 cm.',2:'1 m is from the floor to a door handle. A teaspoon fits in your hand: about 13 cm.'}}];
/* estimate by repeating a benchmark along the object */
const LAY=[{obj:'A table',unit:'ruler',size:30,count:4,cm:'cm'},{obj:'A pencil case',unit:'paper clip',size:3,count:4,cm:'cm'},{obj:'A bed',unit:'metre stick',size:100,count:2,cm:'m'}];
const LAYOPTS=L=>{const tot=L.size*L.count,say=L.cm==='m'?`About ${tot/100} m`:`About ${tot} cm`;return[[say,'ok'],[`About ${L.count} cm`,'count'],[`About ${L.size} cm`,'one']]};
/* estimate, then measure: real lengths in cm, a 30 cm ruler is drawn above at the same scale */
const GUESS=[{obj:'A guitar',cm:90},{obj:'A broom',cm:140},{obj:'A cat, nose to tail',cm:60}];
const ROBOT=[{say:'A door is about 2 cm tall.',ok:false,fix:'2 cm is two fingertips. A door is about 2 m tall: the unit matters.'},
 {say:'A school ruler is 30 cm, so I can use it to estimate a table.',ok:true,fix:'Yes. Picture how many rulers fit along it, then count in 30s.'},
 {say:'An estimate is just a wild guess.',ok:false,fix:'A good estimate uses a length you know, like a ruler or a door, to get close.'},
 {say:'If my estimate is not exact, it is wrong.',ok:false,fix:'An estimate only needs to be close. Then measure to check it.'},
 {say:'Checking my estimates with a ruler helps me get better.',ok:true,fix:'Yes. Each time you check, your sense of 1 cm, 30 cm and 1 m gets sharper.'}];
const DESC=[
 'A length card and four things. Tap the thing that is about that long.',
 'A thing and three estimates. Tap the estimate that makes sense.',
 'A thing and a length you know. Tap the thing to lay one more length along it, then tap the estimate.',
 'A thing, a 30 cm ruler and a tape. Drag the marker to your estimate, then tap Measure.',
 'A robot says things about estimating. Buttons: Right or Slip.'];
const DONE=[
 'About 1 cm: a fingertip. 30 cm: a ruler. 1 m: up to a door handle. 2 m: a door.',
 'Check the unit: a pencil is 15 cm, not 15 m.',
 'Count the lengths, then times by their size: 4 rulers is about 120 cm.',
 'A good estimate is close, not exact. Measuring checks it.',
 'The robot slipped three times: units matter, estimates use what you know, and close is good.'];
const QS=[
 {q:'About how tall is a classroom door?',a:'About 2 m',o:[['About 2 cm','unit'],['About 20 m','unit']]},
 {q:'A desk is about 3 rulers long. About how long is it?',a:'About 90 cm',o:[['About 3 cm','count'],['About 30 cm','one']]},
 {q:'Mia guessed a rope was 2 m. She measured 190 cm. Was it a good estimate?',a:'Yes, it was close',o:[['No, it was not exact','exact'],['No, she should not guess','guess']]},
 {q:'What is about 1 cm wide?',a:'A fingertip',o:[['A ruler','bench'],['A door','bench']]},
 {q:'A rug is about 2 metre sticks long. About how long is it?',a:'About 2 m',o:[['About 2 cm','count'],['About 100 cm','one']]},
 {q:'Which is the best way to estimate the length of a bench?',a:'Picture rulers along it and count',o:[['Say any number','guess'],['Measure it exactly first','exact']]}];
return{BENCH,BENCHWHY,ASK,SENSE,LAY,LAYOPTS,GUESS,ROBOT,DESC,DONE,QS}})();
