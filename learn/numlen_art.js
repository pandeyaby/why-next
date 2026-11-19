/* Data for flagnumlen (numbers on a number line, ages 7–8). Sources: CCSS Mathematics 2.MD.6 ("represent whole numbers
   as lengths from 0 on a number line diagram with equally spaced points … and represent whole-number sums and differences
   within 100 on a number line diagram"); DfE National Curriculum 2013 Year 2 (number line to 100) and Year 3 mental
   methods; NCETM Mastery Professional Development, Year 2 number line and empty number line. Slips it targets: counting
   tick marks instead of spaces (the ribbon from 0 to 4 called 5), landing in the wrong ten, jumping the wrong way to
   subtract, and drawing a line with unequal spaces (Bobis 2007; Teppo and van den Heuvel-Panhuizen 2014). */
const NLN=(()=>{
const RIB=[4,7,9];
const SPOT=[36,43,48];
const FWD=[[38,27],[46,35],[59,24]];
const BACK=[[72,35],[64,28],[91,46]];
const ROBOT=[
 {say:'My ribbon goes from 0 to 6. It touches 7 ticks, so it is 7 long.',ok:false,pic:{lo:0,hi:10,rib:6},fix:'Count the spaces, not the ticks. From 0 to 6 there are 6 spaces, so the ribbon is 6 long.'},
 {say:'45 + 30: I jump 3 tens from 45 and land on 75.',ok:true,pic:{lo:40,hi:80,jumps:[45,55,65,75]},fix:'Three jumps of 10 from 45 go 55, 65, 75. Only the tens digit changes.'},
 {say:'50 − 20: I jump 2 tens to the right and land on 70.',ok:false,pic:{lo:20,hi:80,jumps:[50,60,70]},fix:'Take away means jump back, to the left. 50, 40, 30: 50 − 20 = 30.'},
 {say:'My line has a wide space from 0 to 1 and a small one from 1 to 2. That is fine.',ok:false,pic:{lo:0,hi:5,odd:1},fix:'Every space on a number line must be the same size, or the lengths are wrong.'}];
const DESC=[
 'A number line from 0 to 10 and a ribbon that starts at 0. Number keys 1 to 10: tap how long the ribbon is.',
 'A number line from 30 to 50 with a tick for every number. Drag the arrow to the number, or tap a tick.',
 'A frog sits on the first number. Tap the jump tiles to add the second number: plus 10, plus 5 or plus 1.',
 'A frog sits on the first number. Tap the jump tiles to take away the second number.',
 'A robot shows a number line and says what it did. Buttons: Right or Slip.'];
const DONE=[
 'The ribbons were 4, 7 and 9 long. Count the spaces from 0, not the ticks.',
 '36, 43 and 48 are on the line. Find the ten first, then count the small spaces.',
 '38 + 27 = 65, 46 + 35 = 81 and 59 + 24 = 83. Jump the tens, then the ones.',
 '72 − 35 = 37, 64 − 28 = 36 and 91 − 46 = 45. Take away jumps go left.',
 'The robot slipped three times: it counted ticks, jumped the wrong way and drew unequal spaces.'];
const QS=[
 {q:'A ribbon goes from 0 to 5. How long is it?',a:'5',o:[['6','tick'],['4','start']]},
 {q:'From 47, you jump back 10. Where do you land?',a:'37',o:[['57','dir'],['46','one']]},
 {q:'Where is 54 on a line from 50 to 60?',a:'4 spaces after 50',o:[['4 spaces after 60','ten'],['5 ticks after 50','tick']]},
 {q:'Which line is a fair number line?',a:'All the spaces are the same size',o:[['The spaces get smaller','equal'],['It starts at 1','start']]},
 {q:'26 + 30. Where does the frog land?',a:'56',o:[['29','one'],['36','once']]},
 {q:'83 − 40 on a number line. Which way do you jump?',a:'Left, 4 jumps of 10',o:[['Right, 4 jumps of 10','dir'],['Left, 40 jumps of 10','ten']]}];
return{RIB,SPOT,FWD,BACK,ROBOT,DESC,DONE,QS}})();
