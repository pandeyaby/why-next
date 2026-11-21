/* Data for flagcircp (parts of a circle, ages 10–11). Sources: DfE (2013) National Curriculum mathematics, Year 6
   geometry ("illustrate and name parts of circles, including radius, diameter and circumference and know that the
   diameter is twice the radius"); NCETM Year 6 ready-to-progress materials on circles. Slips it targets: a diameter is
   any line across a circle (it must pass through the centre), the diameter is half the radius, radii pointing different
   ways have different lengths, compasses set to the diameter, and the circumference is the width of the circle. */
const CIRP=(()=>{
/* scene 1: name the part. Each round turns the picture: rad = radius angle, dia = diameter angle, chord = [a1, a2] */
const NAME=[
 {want:'radius',rad:-50,dia:200,chord:[60,140]},
 {want:'diameter',rad:120,dia:-20,chord:[200,290]},
 {want:'circumference',rad:30,dia:100,chord:[160,250]},
 {want:'centre',rad:250,dia:10,chord:[60,150]},
 {want:'diameter',rad:-130,dia:60,chord:[-20,70]}];
const PART={centre:'the centre',radius:'a radius',diameter:'a diameter',circumference:'the circumference',chord:'a chord'};
const WHY={
 centre:'That is the centre: the middle point, the same distance from every point on the edge.',
 radius:'That line goes from the centre to the edge. That is a radius.',
 diameter:'That line goes right across, through the centre. That is a diameter.',
 chord:'That line goes across, but it misses the centre. It is a chord, not a diameter.',
 circumference:'That is the circumference: the curved edge, the whole way round.'};
/* scene 2: drag the end of a radius to each ring (angles in degrees, 0 = right, clockwise on screen) */
const SPOTS=[-90,45,165];const RAD_CM=4;
/* scene 3: drag B round the edge until AB is a diameter. A sits at 180 degrees */
const DIAM=[3,4.5,2.5];
/* scene 4: set the compasses (opening in cm) to draw the circle asked for */
const COMPASS=[{ask:'a circle with a diameter of 8 cm',r:4,d:8},{ask:'a circle with a radius of 3 cm',r:3,d:6},{ask:'a circle with a diameter of 5 cm',r:2.5,d:5}];
/* scene 5: roll wheels of these diameters (cm) one full turn */
const ROLL=[2,3,4];
/* scene 6: right or slip */
const ROBOT=[
 {say:'"Every radius of this circle is the same length."',ok:true,fix:'Every point on the edge is the same distance from the centre, so every radius is equal.'},
 {say:'"The radius is 5 cm, so the diameter is 2.5 cm."',ok:false,fix:'The diameter is twice the radius, not half: 2 × 5 = 10 cm.'},
 {say:'"Any straight line across a circle is a diameter."',ok:false,fix:'Only a line through the centre is a diameter. A line across that misses the centre is a chord, and it is shorter.'},
 {say:'"The circumference is the distance all the way round."',ok:true,fix:'Yes: the circumference is the length of the curved edge, like the perimeter of the circle.'},
 {say:'"To draw a circle 10 cm across, open the compasses to 10 cm."',ok:false,fix:'10 cm across is the diameter. The compasses make the radius, so open them to 5 cm.'},
 {say:'"The circumference is a bit more than 3 diameters long."',ok:true,fix:'Yes: one turn of a wheel rolls a bit more than 3 times its diameter.'}];
/* challenge: answer + two wrong answers tagged with the slip they show */
const QS=[
 {q:'The radius of a circle is 7 cm. How long is the diameter?',a:'14 cm',o:[['3.5 cm','half'],['7 cm','same']]},
 {q:'The diameter of a plate is 26 cm. What is its radius?',a:'13 cm',o:[['52 cm','double'],['26 cm','same']]},
 {q:'A line goes across a circle but misses the centre. What is it?',a:'A chord',o:[['A diameter','across'],['A radius','radline']]},
 {q:'You need a circle 12 cm across. What do you open the compasses to?',a:'6 cm',o:[['12 cm','compass'],['24 cm','double']]},
 {q:'What is the circumference of a circle?',a:'The distance all the way round',o:[['The distance across the middle','width'],['The space inside','inside']]},
 {q:'A wheel has a diameter of 10 cm. One turn rolls it about how far?',a:'A bit more than 30 cm',o:[['10 cm','width'],['20 cm','twice']]}];
/* challenge feedback: one message for each slip tag in QS */
const SLIP={
 half:'You halved it. The diameter is twice the radius, so double the radius.',
 double:'You doubled it. The radius is half the diameter, so halve it.',
 same:'The radius and diameter are not the same length: the diameter goes right across, so it is twice as long.',
 across:'A diameter must pass through the centre. A line across that misses the centre is a chord.',
 radline:'A radius starts at the centre. This line goes from edge to edge, so it is a chord.',
 compass:'The compass opening is the radius, not the distance across. For 12 cm across, open them to half: 6 cm.',
 width:'The circumference is the distance round the curved edge, and that is longer than the distance across.',
 inside:'The space inside is the area. The circumference is the length of the edge.',
 twice:'Twice the diameter is too short: one turn is a bit more than 3 diameters.',
 other:'Picture the circle: the radius is centre to edge and the diameter is twice as long.'};
const DESC=[
 'A circle with a dot, three lines labelled A, B and C, and its curved edge. Tap the part that is asked for.',
 'A circle with a radius from the centre to a handle on the edge, and three rings on the edge. Drag the handle to each ring.',
 'A circle with point A fixed on the left edge and point B on the edge. Drag B round until the line A to B is a diameter.',
 'A ruler and a pair of compasses. Drag along the ruler to open the compasses, then press Draw the circle.',
 'A wheel on a track with a red mark on its rim. Drag the wheel to the right to roll it one full turn.',
 'A robot makes a claim about circles. Decide if it is right or a slip.'];
const DONE=['You named every part.','Every radius was 4 cm.','The diameter was twice the radius each time.','Compasses open to the radius.','One turn is a bit more than 3 diameters.','All 6 claims checked.'];
return{SLIP,NAME,PART,WHY,SPOTS,RAD_CM,DIAM,COMPASS,ROLL,ROBOT,QS,DESC,DONE}})();
