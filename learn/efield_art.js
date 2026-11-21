/* Data for flagefield (electric fields, ages 14–16; AQA GCSE Physics 8463 section 4.2.5.2 Electric fields (physics
   only): a charged object creates an electric field around itself; the field is strongest close to the object; a
   second charged object placed in the field feels a force; field patterns for an isolated charged sphere; sparks when
   the field is strong enough. Direction convention: the force on a small positive test charge. Inverse-square
   scaling (Coulomb's law, force proportional to 1/r²) is shown as an extension for higher attainers.
   Slips it targets: field lines pointing outwards from a negative charge, a field that is the same strength
   everywhere, no field between drawn lines, field lines that cross, and thinking a bigger gap makes sparks easier. */
const EFD=(()=>{
/* test-charge probe points (angle in degrees from +x, radius in ring units) used by the button twins */
const PROBES=[{t:'above',a:-90,r:2.2},{t:'left',a:180,r:2.2},{t:'below right',a:45,r:2.2},{t:'right',a:0,r:2.2}];
/* scene 3: rings at 1, 2 and 3 ring units; the force readout is 36/r² in "units" so the rings read 36, 9 and 4 */
const RINGS=[1,2,3],F0=36;
/* scene 4: spark meter = (Q/6)·(70/gap)²; air breaks down at 1. Q is 1–6 charge steps, gap in CSS px. */
const QMAX=6,GAP0=70,GAPMIN=30,GAPMAX=220;
/* scene 5 sandbox: starting charges (x, y as stage fractions, q = +1 or −1) */
const START=[{x:.3,y:.55,q:1},{x:.7,y:.55,q:-1}];
const DESC=['A positive sphere in the middle and a small positive test charge. Drag the test charge to probe the field.',
 'The same sphere. Flip it to negative and probe again.',
 'Three rings round the sphere, 1, 2 and 3 steps away. Drop the test charge on each ring to read the force.',
 'A charged dome on the left and an earthed metal ball on the right, with a gap. Add charge or move the ball.',
 'Sandbox: tap to add charges, tap a charge to flip it. Field lines are drawn from plus to minus.',
 'Challenge.'];
const DONE=['Field lines point away from a positive charge: that is the way a positive test charge is pushed.',
 'Around a negative charge the lines point inwards: the positive test charge is pulled in.',
 'Strongest closest: 36, then 9, then 4. Twice as far, four times weaker.',
 'Spark! The field in the gap got strong enough to make the air conduct.'];
/* challenge: a = right answer; o = [wrong answer, slip type] */
const QS=[{q:'Which way do field lines point near a negative charge?',a:'Inwards, towards the charge',o:[['Outwards, away from it','sign'],['Round it in circles','circle']]},
 {q:'A positive test charge moves twice as far from a charged sphere. The force on it…',a:'gets weaker (a quarter as big)',o:[['stays the same','same'],['gets twice as big','bigger']]},
 {q:'Is there an electric field in the space between two drawn field lines?',a:'Yes: the lines are only a sample',o:[['No, only on the lines','gap'],['Only if a charge is moving','moving']]},
 {q:'Why can two field lines never cross?',a:'The field has one direction at each point',o:[['They would cancel out','cancel'],['They can cross near big charges','cross']]},
 {q:'A charged dome is close to sparking to an earthed ball. Which change makes a spark happen?',a:'Move the ball closer',o:[['Move the ball further away','far'],['Take some charge off the dome','less']]},
 {q:'A negative test charge sits in a field. Which way is the force on it?',a:'Opposite to the field lines',o:[['Along the field lines','test'],['No force: fields only act on positive charges','none']]}];
return{PROBES,RINGS,F0,QMAX,GAP0,GAPMIN,GAPMAX,START,DESC,DONE,QS}})();
