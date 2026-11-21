/* Data for flagsunpath (shadows through the day and the year, ages 10–11). Sources: NGSS 5-ESS1-2 (graph daily changes
   in the length and direction of shadows); DfE (2013) National Curriculum science, Year 3 light ("recognise that shadows
   are formed when the light from a light source is blocked") and Year 5 Earth and space ("use the idea of the Earth's
   rotation to explain day and night and the apparent movement of the sun across the sky"). Sun positions are worked out
   in the lab from the standard formulas for a place at 51.5° N (London), in sun time: sin(altitude) = sin(lat)sin(dec)
   + cos(lat)cos(dec)cos(15° × hours from noon), with declination 0° in March, +23.4° in June and −23.4° in December.
   Slips it targets: the shadow points towards the sun, the shadow is longest when the sun is highest, shadows are the
   same length all day, the sun moves (not the Earth turning), and the midday shadow is the same all year. */
const SUNP=(()=>{
const LAT=51.5,STICK_M=1;
/* scene 1: put the sun where it makes the shadow reach each flag (compass bearings: 0 = north, 90 = east) */
const FLAGS=[{to:270,name:'west'},{to:0,name:'north'},{to:45,name:'north-east'}];
/* scene 2: raise or lower the sun (altitude in degrees, steps of 3 from 15) until the 1 m stick's shadow is this long */
const LENGTHS=[2,1,0.5];
/* scene 3: measure the shadow at these sun times (hours) on a March day */
const TIMES=[8,10,12,14,16];
/* scene 4: read each shadow: hour of the day (March) and the right answer */
const READ=[{t:8.5,a:'morning'},{t:12,a:'midday'},{t:15.5,a:'afternoon'},{t:10,a:'morning'},{t:17,a:'afternoon'}];
/* scene 5: midday shadow in three months (sun's declination in degrees) */
const MONTHS=[{m:'June',dec:23.4},{m:'March',dec:0},{m:'December',dec:-23.4}];
/* scene 6: right or wrong */
const CLAIMS=[
 {say:'"In the morning my shadow points roughly west."',ok:true,fix:'In the morning the sun is in the east or south-east, and a shadow points away from the sun, so it points west or north-west.'},
 {say:'"My shadow is longest at midday, when the sun is strongest."',ok:false,fix:'At midday the sun is highest, so the shadow is shortest. Shadows are longest early and late, when the sun is low.'},
 {say:'"A shadow points towards the sun."',ok:false,fix:'The stick blocks the light, so the dark patch falls on the far side, away from the sun.'},
 {say:'"The sun seems to move because the Earth turns."',ok:true,fix:'The Earth spins once a day from west to east, so the sun seems to rise in the east and set in the west.'},
 {say:'"My midday shadow is the same length in June and December."',ok:false,fix:'The midday sun is much lower in December, so the midday shadow is longer in winter.'},
 {say:'"A shadow chart for one day makes a U shape: long, short, then long."',ok:true,fix:'Long in the morning, shortest at midday, long again in the evening: a U shape.'}];
/* challenge: answer + two wrong answers tagged with the slip they show */
const QS=[
 {q:'Early in the morning the sun is in the east. Which way does a tree\'s shadow point?',a:'West',o:[['East','toward'],['South','south']]},
 {q:'When is the shadow of a lamp post shortest?',a:'Around midday',o:[['Early in the morning','longnoon'],['It is the same all day','same']]},
 {q:'The sun sinks lower in the evening. What happens to a shadow?',a:'It gets longer',o:[['It gets shorter','lowshort'],['It stays the same','same']]},
 {q:'In the UK, which way does a shadow point at midday?',a:'North',o:[['South','toward'],['East','time']]},
 {q:'Why does the sun seem to move across the sky?',a:'The Earth spins round once a day',o:[['The sun goes round the Earth each day','sunmoves'],['Clouds push it along','other']]},
 {q:'Which midday shadow is longest?',a:'In December',o:[['In June','season'],['They are all the same','same']]}];
const SLIP={
 toward:'A shadow points away from the sun, not towards it. Find the sun first, then look the opposite way.',
 south:'In the morning the sun is in the east, so the shadow points the opposite way, to the west.',
 longnoon:'A low sun makes a long shadow. Early in the morning the sun is low, so the shadow is long, not short.',
 same:'Shadows change all day because the sun\'s height in the sky changes. Higher sun, shorter shadow.',
 lowshort:'A lower sun makes a longer shadow, like a torch held low that throws a long shadow across the floor.',
 time:'At midday in the UK the sun is due south, so the shadow points due north.',
 sunmoves:'It looks as if the sun moves, but the Earth is spinning. The sun stays put.',
 season:'In June the midday sun is high, so the shadow is short. In December the sun stays low, so it is long.',
 other:'Clouds do not move the sun. The sun seems to cross the sky because the Earth turns.'};
const DESC=[
 'Looking down on a stick with north at the top. The sun sits on a ring round the stick. Drag the sun so the shadow reaches the flag.',
 'A side view of a 1 metre stick and the sun in the sky. Drag the sun up or down and watch the length of the shadow.',
 'A side view of the stick on a March day with a time slider, and a chart of shadow length. Move the time and measure at each mark.',
 'Looking down on a stick and its shadow, with north at the top. Decide if it is morning, midday or afternoon.',
 'A side view of the stick at midday. Pick a month to see how high the midday sun is and how long the shadow is.',
 'A child makes a claim about shadows. Decide if it is right or wrong.'];
const DONE=['The shadow always points away from the sun.','Higher sun, shorter shadow.','Long, short, long: a U shape.','The shadow tells you where the sun is.','The midday shadow is longest in winter.','All 6 claims checked.'];
return{LAT,STICK_M,FLAGS,LENGTHS,TIMES,READ,MONTHS,CLAIMS,QS,SLIP,DESC,DONE}})();
