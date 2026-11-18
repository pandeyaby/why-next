/* Data for the how-the-eye-works flagship (flageye), ages 7–9 (BBC Bitesize KS2 'How do we see?'; NC England Y6 light:
   we see things because light travels from light sources to our eyes, or from light sources to objects and then to our
   eyes; KS3 Biology: the structure of the eye). Light enters through the pupil, the lens focuses it onto the retina, the
   retina sends signals along the optic nerve, and the brain works out the picture. The iris makes the pupil smaller in
   bright light and bigger in dim light. Slips it targets: eyes sending light out to things (Driver et al. 1985), the
   pupil as a painted dot rather than a hole, the pupil shrinking in the dark, the picture being made on the lens, and
   the eye (not the brain) making sense of what we see. */
const EYE=(()=>{
const ROUNDS=[{goal:'ball',path:['lamp','ball','eye']},{goal:'lamp',path:['lamp','eye']}];
const PIECES=[{k:'lamp',t:'Lamp'},{k:'ball',t:'Ball'},{k:'eye',t:'Eye'}];
const PARTS=[
 {k:'iris',t:'Iris',job:'the coloured ring; it makes the pupil wider or smaller'},
 {k:'pupil',t:'Pupil',job:'the black hole in the middle where light gets in'},
 {k:'lens',t:'Lens',job:'bends the light so it meets on the retina'},
 {k:'retina',t:'Retina',job:'the back of the eye, where the picture lands'},
 {k:'nerve',t:'Optic nerve',job:'carries the message from the retina to the brain'}];
const ROOMS=[{t:'Sunny beach',lvl:2},{t:'Dark bedroom',lvl:0},{t:'Classroom',lvl:1}];
const SIZES=['Big pupil','Medium pupil','Small pupil'];
const FOCUS=[{t:'the far tree',far:true,want:2,start:4},{t:'the near book',far:false,want:4,start:2}];
const CHAIN=['Light goes in through the pupil','The lens bends the light','A picture lands on the retina','The optic nerve carries the message','The brain works out what you see'];
const MIX=[2,4,0,3,1];
const DESC=[
 'A lamp, a ball and an eye. Tap where the light goes, in order.',
 'An eye cut in half, seen from the side, with 5 empty labels. Cards: Iris, Pupil, Lens, Retina, Optic nerve.',
 'A place to look at, and three eyes with a big, a medium and a small pupil.',
 'Light from a tree passes through the lens into the eye. The lens can be made fatter or thinner.',
 'Five step cards about seeing, and 5 numbered spaces.'];
const DONE=[
 'Lamp, ball, eye. Light comes from a light source and bounces off things into our eyes. Eyes take light in; they never send it out.',
 'Iris, pupil, lens, retina and optic nerve. The pupil is a hole, and the picture lands on the retina at the back.',
 'Small in bright sun, big in the dark, medium in the classroom. The iris changes the pupil to let in the right amount of light.',
 'A thin lens for far things, a fatter lens for near things. The picture lands on the retina, and it is upside down.',
 'Pupil, lens, retina, optic nerve, brain. The eye catches the light, but the brain works out what you see.'];
const QS=[
 {q:'How do you see a book in a lit room?',a:'Light bounces off the book into my eyes',o:[['My eyes send light out to the book','out'],['The book glows by itself','source']]},
 {q:'What is the pupil?',a:'A hole that lets light in',o:[['A black dot on the eye','dot'],['The coloured part of the eye','iris']]},
 {q:'You walk into a dark room. What does your pupil do?',a:'Gets bigger',o:[['Gets smaller','size'],['Stays the same','size']]},
 {q:'Where does the picture land inside the eye?',a:'On the retina at the back',o:[['On the lens','lens'],['On the pupil','lens']]},
 {q:'Which part works out what you are looking at?',a:'The brain',o:[['The lens','brain'],['The pupil','brain']]},
 {q:'Which part is the coloured ring of the eye?',a:'The iris',o:[['The pupil','iris'],['The retina','iris']]}];
const T={amt:['Very little light','Some light','Lots of light'],at:{iris:'top left',pupil:'middle left',lens:'bottom left',retina:'top right',nerve:'bottom right'},
 eyeFirst:'Eyes do not send light out. Light has to start at a light source, like the lamp.',
 ballFirst:'The ball makes no light of its own. Start at the light source: the lamp.',
 again:'The light has been there already. Where does it go next?',
 skipBall:'That light lets you see the lamp, not the ball. To see the ball, the light must bounce off it first.',
 viaBall:'Light bouncing off the ball lets you see the ball. To see the lamp, its light can go straight into your eye.',
 gotBall:'Yes: lamp, ball, eye. Light bounced off the ball into your eye. Now see the lamp.',
 gotLamp:'Yes: lamp, eye. A light source sends its light straight into your eye.',
 part:{pupil:{iris:'The iris is the coloured ring. The pupil is the hole in the middle of it.',_:'The pupil is right at the front: the gap in the iris where light gets in.'},
  iris:'The iris is the coloured ring at the front, around the pupil.',
  lens:{pupil:'The pupil is only a hole. The lens sits just behind it and bends the light.',_:'The lens is the clear oval just behind the pupil.'},
  retina:'The retina is the lining at the back of the eye, where the picture lands, not at the front.',
  nerve:'The optic nerve leaves the back of the eye and goes to the brain.'},
 size:[[null,'Darker still: open the pupil as wide as it goes.','In the dark there is very little light. A small pupil lets in even less, so the pupil opens wide.'],
  ['The classroom has some light, not the dark. Pick the middle size.',null,'The classroom has some light, not bright sun. Pick the middle size.'],
  ['Bright sun is a lot of light. A big pupil would let too much in, so the iris makes it small.','Brighter than that: make the pupil small.',null]],
 sizeOk:['Yes: in the dark the pupil gets big to let more light in.','Yes: medium light, medium pupil.','Yes: in bright sun the pupil gets small.'],
 fatter:'Still blurry: the light meets behind the retina. Make the lens fatter so it bends the light more.',
 thinner:'Still blurry: the light meets in front of the retina. Make the lens thinner so it bends the light less.',
 farOk:'Sharp: a thin lens for the far tree. The picture on the retina is upside down. Now the book.',
 nearOk:'Sharp: a fatter lens for the near book. The brain turns the picture the right way up.',
 chain:['First the light has to get into the eye, through the pupil.','Light gets in through the pupil first, then the lens bends it.',
  'The light has to be bent by the lens before a sharp picture lands on the retina.',
  'The optic nerve carries a message from the retina, so the picture must land on the retina first.',
  'The brain comes last: it can only work out the picture once the optic nerve brings the message.']};
return{T,ROUNDS,PIECES,PARTS,ROOMS,SIZES,FOCUS,CHAIN,MIX,QS,DESC,DONE}})();
