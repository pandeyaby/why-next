/* Data for flagswing (predicting motion patterns, ages 8–9). Sources: NGSS 3-PS2-2 ("Make observations and/or
   measurements of an object's motion to provide evidence that a pattern can be used to predict future motion"; examples:
   a child swinging, a ball rolling back and forth in a bowl; no technical terms such as period or frequency); simple
   pendulum time for one swing there and back T = 2π√(L/g) with g = 9.81 m/s², so a 99.4 cm "seconds pendulum" takes
   2.0 s, 25 cm takes 1.0 s and 2.25 m takes 3.0 s; the large-swing correction T ≈ T0(1 + θ²/16) adds under 2% at 30°;
   the bob's mass does not appear in T. Ramp data: on one surface the roll-out distance grows in step with the release
   height (stored energy mgh is used up by a steady rolling drag). Slips it targets: a heavier bob swings faster; a bigger
   pull makes each swing take much longer; a longer string swings faster; a pattern cannot tell you anything new. */
const SWG=(()=>{
const G=9.81,SECONDS=0.994,LMIN=0.25,LMAX=2.5;
/* time for one swing there and back, for a string L metres long let go from deg degrees */
const swingTime=(L,deg)=>{const th=(deg||0)*Math.PI/180;return 2*Math.PI*Math.sqrt(L/G)*(1+th*th/16)};
/* scene 2: the bob starts on the left; where is it after t seconds (2 s a swing)? 0 left, 1 middle, 2 right */
const WHEN=[{t:3,at:2},{t:6.5,at:1},{t:9,at:2}];
const BOBS=[{name:'cork',kg:0.01,r:9,col:'#d6a46b'},{name:'apple',kg:0.15,r:13,col:'#dc2626'},{name:'steel ball',kg:1,r:16,col:'#64748b'}];
const LENGTHS=[{want:1,L:0.25},{want:3,L:2.25}];
/* scene 6: Sam rolls a toy car from different heights on the same ramp and floor (cm) */
const RAMP=[{h:10,d:50},{h:20,d:100},{h:30,d:150}];
const ASK=[{q:'From 40 cm high, how far will it roll?',a:200,o:[160,200,400]},{q:'From 5 cm high, how far will it roll?',a:25,o:[25,45,50]},{q:'It rolled 125 cm. How high did Sam let go?',a:25,o:[20,25,125]}];
const DESC=[
 'A bob hangs on a 1 metre string. Drag the bob to one side and let go. A stopwatch times each swing there and back.',
 'The bob starts on the left and takes 2 seconds for each swing there and back. Tap where it will be at the time shown.',
 'Three bobs: cork, apple and steel ball, on the same 1 metre string. Tap a bob to hang it, then let it swing.',
 'A handle at the top changes the string length. Drag it up or down, then let the bob swing.',
 'Drag the bob out a little or a lot, then let go. Compare the swing times.',
 'A table of Sam\'s toy car rolls. Tap the distance or height that fits the pattern.'];
const DONE=[
 'Every swing takes the same time, 2 seconds: that is a pattern.',
 'Count the 2-second swings and you can say where it will be.',
 'Heavy or light, each swing still takes 2 seconds.',
 'A longer string makes each swing slower: 1 s at 25 cm, 3 s at 2.25 m.',
 'A big pull or a small pull: each swing takes about the same time.',
 'Twice as high, twice as far: the pattern lets you predict new rolls.'];
const QS=[
 {q:'A swing takes 3 seconds there and back. How long do 4 swings take?',a:'12 seconds',o:[['3 seconds','same'],['7 seconds','add']]},
 {q:'You swap a light bob for a heavy one on the same string. Each swing will…',a:'Take the same time',o:[['Be quicker','heavy'],['Be slower','heavy']]},
 {q:'Which pendulum swings back and forth fastest?',a:'The one with the shortest string',o:[['The one with the longest string','long'],['The one with the heaviest bob','heavy']]},
 {q:'Mo pulls the bob out much further. Each swing will…',a:'Take about the same time',o:[['Take much longer','big'],['Stop the pattern','stop']]},
 {q:'A ball in a bowl rolls left, right, left, right. Can you predict where it goes next?',a:'Yes, it follows a pattern',o:[['No, nobody can tell','stop'],['Only if it is heavy','heavy']]},
 {q:'From 10 cm a car rolls 50 cm. From 30 cm it rolls…',a:'150 cm',o:[['70 cm','add'],['50 cm','same']]}];
return{G,SECONDS,LMIN,LMAX,swingTime,WHEN,BOBS,LENGTHS,RAMP,ASK,DESC,DONE,QS}})();
