/* Data for the angles of elevation and depression lab (flag_elev.js; bundled in the main learn.js like mil_art.js so the
   lab file stays under 20 KB). All lengths in metres, angles in degrees. Answers were recomputed with Math.tan/sin. */
const ELEVART={
deg:r=>r*180/Math.PI,rad:d=>d*Math.PI/180,
TREE:{d:20,top:14,eye:1.5},CLIFF:{h:40,want:20},RATIO:{d:20,ang:35},EYE:{want:1.6},LIGHT:{h:50,want:12},
SIDES:[['opposite','The side opposite the angle: the height above eye level, the one you want.'],['adjacent','The side next to the angle that is not the hypotenuse: the 20 m along the ground.'],['hypotenuse','The longest side, across from the right angle: the line of sight.']],
RATIOS:[['sin = opp ÷ hyp',0,'sin needs the hypotenuse, the line of sight, which you do not know. You know the adjacent side.'],['cos = adj ÷ hyp',0,'cos links the adjacent side and the hypotenuse, but you want the opposite side.'],['tan = opp ÷ adj',1,'']],
TOTAL:[['14.0 m',0,'14.0 m is only the part above your eye. The sight line starts at your eye, 1.6 m up, so add it.'],['15.6 m',1,''],['12.4 m',0,'Taking the eye height away moves the wrong way. The tree goes from the ground, below your eye, to the top.']],
DIST:[['50 × tan 12° = 10.6 m',0,'That multiplies by tan. Here the 50 m is the opposite side and the distance is adjacent, so divide: adj = opp ÷ tan.'],['50 ÷ sin 12° = 240.5 m',0,'That is the length of the sight line (the hypotenuse), not the distance along the sea.'],['50 ÷ tan 12° = 235.2 m',1,''],['50 ÷ tan 78° = 10.6 m',0,'78° is the angle from the vertical. Angles of depression are measured from the horizontal.']],
bank:[
 ['You stand 30 m from a tower. The angle of elevation to the top is 40°. Ignore eye height. How tall is it?','30 × tan 40° ≈ 25.2 m',[['30 × sin 40° ≈ 19.3 m','wrongRatio'],['30 ÷ tan 40° ≈ 35.8 m','flip']]],
 ['From the top of a 60 m cliff, the angle of depression to a boat is 25°. What is the angle of elevation from the boat to the cliff top?','25°',[['65°','vertical'],['155°','straight']]],
 ['An angle of elevation is measured…','up from the horizontal to the line of sight',[['from the vertical to the line of sight','vertical'],['down from the horizontal to the line of sight','updown']]],
 ['A kite string is 50 m long and makes 35° with the horizontal. How high is the kite above your hand?','50 × sin 35° ≈ 28.7 m',[['50 × tan 35° ≈ 35.0 m','wrongRatio'],['50 × cos 35° ≈ 41.0 m','wrongRatio']]],
 ['Your eye is 1.5 m up. You stand 25 m from a building and the angle of elevation to its top is 30°. How tall is it?','1.5 + 25 × tan 30° ≈ 15.9 m',[['25 × tan 30° ≈ 14.4 m','eye'],['25 × tan 30° − 1.5 ≈ 12.9 m','eye']]],
 ['From the top of an 80 m tower, the angle of depression to a car is 15°. How far is the car from the foot of the tower?','80 ÷ tan 15° ≈ 298.6 m',[['80 × tan 15° ≈ 21.4 m','flip'],['80 ÷ sin 15° ≈ 309.1 m','hyp']]]],
WHY:{wrongRatio:'Label the sides from the angle first. Known adjacent and wanted opposite means tan; known hypotenuse and wanted opposite means sin.',
 flip:'The ratio is upside down. tan θ = opposite ÷ adjacent, so opposite = adjacent × tan θ and adjacent = opposite ÷ tan θ.',
 vertical:'That is measured from the vertical. Both angles are measured from a horizontal line, and the two horizontals are parallel, so the angles are equal.',
 straight:'155° is the angle on the other side of the line. The elevation is the alternate angle to the depression, so it is the same 25°.',
 updown:'Down from the horizontal is an angle of depression. Elevation looks up.',
 eye:'The sight line starts at your eye, not the ground. The tan part is the height above your eye, so add the 1.5 m.',
 hyp:'Dividing by sin gives the sight line, the hypotenuse. The distance along the ground is the adjacent side, so use tan.'}};
