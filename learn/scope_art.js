/* Data and screen-reader text for the telescope lab (flag_scope.js; bundled in learn.js).
   Science (space science for ages 7–9; NASA Space Place "How do telescopes work?", ESA/Hubble and NASA Webb fact sheets,
   Royal Museums Greenwich): a telescope's wide lens or curved mirror collects far more light than the pupil of an eye, so
   faint objects show; light caught grows with the area of the opening (width × width). A convex lens refracts (bends)
   parallel starlight so it meets at one point, the focus; a concave (curved-in) mirror reflects it to a focus; the
   eyepiece lens magnifies the image. Moving air bends starlight about (twinkling), so telescopes go on high mountains or
   into space: Hubble (1990, 2.4 m mirror) orbits Earth about 500 km up; James Webb (launched 25 Dec 2021, 6.5 m gold
   mirror, sees infrared) orbits the Sun about 1.5 million km from Earth, about four times farther than the Moon. */
const SCART=(()=>{
/* stars in the eyepiece view: [x, y] in -1..1, and the light needed to see it (lens width × width, in cm²) */
const STARS=[[-.5,-.3,1],[.35,.45,1],[.1,-.6,4],[-.2,.55,4],[.62,-.1,9],[-.7,.25,9],[.25,.1,16],[-.38,-.68,16],[.55,.62,25],[-.05,.3,25],[.7,.35,36],[-.6,-.05,36],[.42,-.45,36]];
const GAL={x:-.15,y:-.18,need:49};
/* lens rounds: focal length as a share of the space behind the lens; a fatter lens bends light more */
const LENS=[[.62,'thin lens'],[.34,'fat lens']];
const MIRRORS=['Flat','Curved in','Bulging out'];
const MIRW=['A flat mirror bounces the light straight back, but it stays spread out. It never meets at one bright point.','',
 'A mirror that bulges out spreads the light even wider apart. Telescopes need a mirror that is curved in, like a bowl.'];
/* heights: [label, blur 0..1] */
const LEVELS=[['On the ground',1],['High mountain, 4 km up',.55],['Plane height, 10 km up',.3],['Hubble, about 500 km up',0]];
const LEVW=['Lots of moving air above you bends the starlight about, so the star twinkles and smears.',
 'Less air above you now, so the star is sharper. That is why big telescopes are built on high mountains.',
 'Most of the air is below you now, but some is still moving above. Go higher.',''];
const KIDS=[['Why is a telescope’s main lens or mirror so wide?',[['Ann','To look grand.','Size is not for show. A wide lens or mirror catches more light, so faint things show up.'],['Ben','To catch more light, so faint things show.',''],['Col','To make stars into big balls.','Stars are so far away they still look like dots. The wide part catches more light.']]],
 ['Why is Hubble up in space?',[['Dee','To be closer to the stars.','500 km is tiny next to how far the stars are. It is up there to get above the blurry air.'],['Eve','To get above the air that blurs the view.',''],['Fin','Telescopes do not work on Earth.','Telescopes on Earth work well, best on high mountains. Space just gives a clearer view.']]],
 ['What does the curved mirror in a telescope do?',[['Gia','It makes its own light.','A mirror makes no light. It bounces light that comes in.'],['Hal','It lets the light pass through it.','That is what a lens does. A mirror bounces light back.'],['Ida','It bounces the light to one point.','']]]];
const QZ=[['Which telescope shows the faintest stars?','One with a 2 m wide mirror',[['One with a 10 cm lens','small'],['Your eyes with no telescope','eyes']]],
 ['A star looks like a blurry blob. What should you do?','Move the eyepiece to focus',[['Make the lens smaller','small'],['Swap in a flat mirror','flat']]],
 ['Why do stars twinkle?','Moving air bends their light',[['They switch on and off','flash'],['Clouds in space block them','clouds']]],
 ['Where is the James Webb Space Telescope?','In space, far past the Moon',[['On a high mountain','mount'],['Inside the air, like a plane','air']]],
 ['Which part do you look through to make the picture bigger?','The eyepiece lens',[['The tube','tube'],['The lens cap','cap']]],
 ['Who saw four moons going round Jupiter with a telescope in 1610?','Galileo Galilei',[['Isaac Newton','newton'],['The Hubble telescope','hubble']]]];
const WHY={small:'A smaller lens catches less light, so faint stars fade away. Wider catches more.',eyes:'Your eye’s opening is less than 1 cm wide. A telescope’s is far wider, so it catches far more light.',
 flat:'A flat mirror cannot bring light to a point. To focus, move the eyepiece until the blob shrinks to a dot.',flash:'Stars shine all the time. Moving air bends their light about, so they seem to flicker.',
 clouds:'Space has no clouds. The twinkle comes from moving air around Earth.',mount:'Big telescopes are on mountains, but Webb is in space, about 1.5 million km away.',
 air:'Webb is far above the air: it goes round the Sun about 1.5 million km from Earth.',tube:'The tube just holds the parts and keeps out stray light. The eyepiece lens magnifies.',
 cap:'A cap only covers the lens to keep it clean. The eyepiece lens magnifies.',newton:'Newton built the first good mirror telescope in 1668. Galileo saw Jupiter’s moons in 1610.',
 hubble:'Hubble went up in 1990. Galileo saw Jupiter’s moons in 1610.'};
const H={wide:['Drag the orange dot to make the lens wider.','Galaxy found!'],lens:['Drag the white screen until the star is a sharp dot.','Both lenses focused.'],
 mirror:['Drag a mirror into the slot at the back, or tap it.','Light meets at one point.'],space:['Drag the telescope up through the air.','Above the air!'],
 kids:['Who is right? Tap them.','Facts checked.'],quiz:['Wide to catch light, curved to focus, high to see clearly.','']};
function say(k,S){let d='Challenge.';
 if(k==='wide'){const n=STARS.filter(s=>S.d*S.d>=s[2]).length;d=`Lens ${S.d} cm wide catches ${S.d*S.d} times the light of a 1 cm lens. ${n} of ${STARS.length} stars show.`+(S.d*S.d>=GAL.need?' The faint galaxy shows.':' The faint galaxy is hidden.')}
 if(k==='lens'){const [f,nm]=LENS[Math.min(S.k,1)];d=S.won?'Both lenses focused.':`A ${nm}. Starlight comes in straight and bends through the lens. The screen is ${S.gap<-.02?'too close: the light has not met yet':S.gap>.02?'too far: the light met and spread out again':'at the focus: a sharp dot'}.`}
 if(k==='mirror')d=S.m==null?'Telescope tube with an empty slot at the back. Mirrors to try: flat, curved in, bulging out.':`${MIRRORS[S.m]} mirror in the slot. `+(S.m===1?'The light bounces back and meets at one point.':S.m===0?'The light bounces straight back, still spread out.':'The light bounces back and spreads apart.');
 if(k==='space')d=`Telescope ${LEVELS[S.lv][0].toLowerCase()}. `+(S.lv===3?'No air above: the star is a steady sharp dot.':'Air above makes the star twinkle and smear.');
 if(k==='kids')d=S.won?'All three checked.':`${KIDS[S.k][0]} `+KIDS[S.k][1].map(x=>x[0]+' says '+x[1]).join(' ');
 return d}
return {STARS,GAL,LENS,MIRRORS,MIRW,LEVELS,LEVW,KIDS,QZ,WHY,H,say}})();
