/* Data and screen-reader text for the small-bodies lab (flag_comet.js; bundled in learn.js).
   Science (Earth and space for ages 7–9; NASA Science "Asteroids", "Comets", "Meteors & Meteorites" and "Dwarf Planets"
   pages, IAU Resolution B5 of 24 August 2006, Royal Museums Greenwich): most known asteroids are rocky bodies in the main
   belt between Mars and Jupiter; Ceres (about 940 km across) is the largest object there and is a dwarf planet. Comets are
   balls of ice, dust and rock from the Kuiper Belt and Oort Cloud; near the Sun the ice turns to gas, making a glowing coma
   and tails that point away from the Sun (pushed by sunlight and the solar wind). A meteoroid is a small rock in space,
   a meteor is the streak of light as it burns up in the air (a shooting star), and a meteorite is a piece that reaches the
   ground; most meteoroids burn up completely. The IAU counts a planet as a body that goes round the Sun, is massive enough
   to be pulled round, and has cleared the area around its orbit; a dwarf planet passes the first two tests only, which is
   why Pluto (in the Kuiper Belt) was reclassified in 2006. Moons go round planets, so they are neither. */
const CMART=(()=>{
/* the strip: [name, colour, place 0..1]; the main belt sits between Mars and Jupiter */
const ORB=[['Sun','#f59e0b',0],['Mercury','#a8a29e',.06],['Venus','#fcd34d',.13],['Earth','#3b82f6',.2],['Mars','#dc2626',.27],['Jupiter','#d97706',.53],['Saturn','#ca8a04',.65],['Uranus','#22d3ee',.76],['Neptune','#2563eb',.86]];
const BELT=[.32,.44],KUIPER=.93;
/* what the drop says by zone */
const ZONE={inner:'Only a few asteroids come this close to the Sun. Most are farther out. Try again.',
 outer:'Out here, past Neptune, the objects are mostly ice. That is the Kuiper Belt, where Pluto lives. Asteroids are rocky and most are nearer the Sun.',
 gas:'Big planets like this have no rocky belt round them. Look for the gap between Mars and Jupiter.'};
/* comet stops: [angle on the orbit, label, message] */
const STOPS=[[0,'far','Far from the Sun the comet is a frozen lump of ice, dust and rock. It is too cold for a tail.'],
 [Math.PI,'close','Close to the Sun, the ice turns into gas. A glowing cloud and a long tail stream out, away from the Sun.'],
 [Math.PI*4/3,'going','The comet is heading away now, and its tail is in front of it! The tail always points away from the Sun.']];
/* meteor scene: [name, where, what the drop says if this name is put here wrongly] */
const ROCKS=[['Meteoroid','a small rock still out in space'],['Meteor','a rock burning up in the air'],['Meteorite','a bit that landed on the ground']];
const ROCKW={'0-1':'A meteoroid is still out in space. Once it glows in the air we call it a meteor.','0-2':'Only a rock that lands is a meteorite. This one is still out in space.',
 '1-0':'This one is burning and glowing in the air. That streak of light is a meteor.','1-2':'It has not landed yet. A glowing rock in the air is a meteor.',
 '2-0':'This rock has landed. A space rock that reaches the ground is a meteorite.','2-1':'It is not glowing any more: it is on the ground. That makes it a meteorite.'};
/* planet test: [name, goes round the Sun, round shape, cleared its path, answer 0 planet / 1 dwarf planet / 2 neither, why] */
const BODIES=[['Earth',1,1,1,0,'Earth goes round the Sun, is round and has cleared its path.'],
 ['Pluto',1,1,0,1,'Pluto goes round the Sun and is round, but it shares its path with lots of icy objects in the Kuiper Belt.'],
 ['Ceres',1,1,0,1,'Ceres is round, but it shares its path with the other asteroids in the belt.'],
 ['Jupiter',1,1,1,0,'Jupiter goes round the Sun, is round and has cleared its path.'],
 ['The Moon',0,1,1,2,'The Moon is round, but it goes round Earth, not the Sun. It is a moon.'],
 ['Halley’s Comet',1,0,0,2,'Halley’s Comet goes round the Sun, but it is a small lumpy ball of ice, not round. It is a comet.']];
const BINS=['Planet','Dwarf planet','Neither'];
const RULES=['Goes round the Sun','Round shape','Cleared its path'];
const KIDS=[['What is a comet made of?',[['Ava','Burning rock, like a little sun.','Comets do not burn. They are ice, dust and rock. The glow is gas and dust lit by the Sun.'],['Bo','Ice, dust and rock.',''],['Cy','Just gas, like a cloud.','The cloud only forms near the Sun. The middle, the nucleus, is a solid lump of ice, dust and rock.']]],
 ['Why is Pluto called a dwarf planet?',[['Dan','It shares its path with lots of other icy objects.',''],['Ela','It stopped going round the Sun.','Pluto still goes round the Sun, once every 248 years.'],['Flo','It shrank.','Pluto did not change. In 2006 scientists agreed new rules for what counts as a planet.']]],
 ['What is a shooting star?',[['Gus','A star falling down to Earth.','Stars are huge and very far away. They do not fall.'],['Hana','A comet flying past.','Comets stay far out in space for weeks. A shooting star lasts a second.'],['Ian','A space rock burning up in the air.','']]]];
const QZ=[['Where are most asteroids?','Between Mars and Jupiter',[['Between Earth and the Moon','moon'],['Past Neptune','kuiper']]],
 ['Which way does a comet’s tail point?','Away from the Sun',[['Always behind the comet','behind'],['Towards the Sun','towards']]],
 ['A rock from space lands in a field. What is it called?','A meteorite',[['A meteor','meteor'],['A meteoroid','meteoroid']]],
 ['Which of these is a dwarf planet?','Ceres',[['Mars','mars'],['The Moon','moon2']]],
 ['When does a comet grow a tail?','When it comes close to the Sun',[['All the time','always'],['When it is far from the Sun','far']]],
 ['What do asteroids mostly look like?','Lumpy rocks of many shapes',[['Perfect round balls','round'],['Glowing balls of gas','gas']]]];
const WHY={moon:'Only a few asteroids come near Earth. The main belt is between Mars and Jupiter.',kuiper:'Past Neptune is the Kuiper Belt, full of icy objects like Pluto. The rocky main belt is between Mars and Jupiter.',
 behind:'The tail is pushed by sunlight and the solar wind, so it points away from the Sun, even when the comet is leaving.',towards:'Sunlight and the solar wind push the tail outwards, away from the Sun.',
 meteor:'A meteor is the streak of light in the air. Once it lands it is a meteorite.',meteoroid:'A meteoroid is a rock still out in space. Once it lands it is a meteorite.',
 mars:'Mars is a planet: round, goes round the Sun and has cleared its path.',moon2:'The Moon goes round Earth, not the Sun, so it is a moon, not a dwarf planet.',
 always:'Far from the Sun a comet is frozen, with no tail. The tail grows as the Sun heats it.',far:'Far away it is too cold. The ice turns to gas only near the Sun.',
 round:'Most asteroids are too small for their gravity to pull them round, so they are lumpy.',gas:'Asteroids are solid rock or metal. They do not glow.'};
const H={belt:['Drag 3 asteroids to where most of them live.','Asteroids in the belt!'],comet:['Drag the comet round its path. Visit all 3 rings.','Tail always points away from the Sun.'],
 meteor:['Drag each name onto the right rock.','All 3 named!'],dwarf:['Tap a body to test it, then drag it to a box.','All 6 sorted!'],
 kids:['Who is right? Tap them.','Facts checked.'],quiz:['Rocky asteroids, icy comets, burning meteors, and dwarf planets.','']};
function say(k,S){let d='Challenge.';
 if(k==='belt')d=`The Sun and 8 planets in a row. ${S.n} of 3 asteroids are in the belt between Mars and Jupiter.`;
 if(k==='comet'){const r=S.r||1;d=`Comet ${r<.3?'very close to':r<1?'near':'far from'} the Sun. `+(S.tail>0?`It has a tail pointing away from the Sun.`:'No tail: it is frozen.')+` Rings visited: ${S.seen.length} of 3.`}
 if(k==='meteor')d='Three rocks: one in space, one glowing in the air, one on the ground. '+S.lab.map((v,i)=>v==null?'':`${ROCKS[v][0]} on ${['the space rock','the glowing rock','the landed rock'][i]}.`).join(' ');
 if(k==='dwarf'){const b=BODIES[S.sel];d=(b?`${b[0]}: `+RULES.map((r,i)=>r+(b[i+1]?' yes':' no')).join(', ')+'. ':'')+`${S.sorted.length} of 6 sorted.`}
 if(k==='kids')d=S.won?'All three checked.':`${KIDS[S.k][0]} `+KIDS[S.k][1].map(x=>x[0]+' says '+x[1]).join(' ');
 return d}
return {ORB,BELT,KUIPER,ZONE,STOPS,ROCKS,ROCKW,BODIES,BINS,RULES,KIDS,QZ,WHY,H,say}})();
