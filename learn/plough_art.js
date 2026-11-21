/* Data for flagplough (spotting constellations, ages 5–7). Star positions are a flat sketch in degrees (x right, y up)
   with Merak at (0,0): pointer gap Merak–Dubhe about 5.4°, Dubhe to Polaris about 28.7° (about 5 pointer gaps), pan and
   handle spacings from the real Plough (Megrez–Dubhe about 10°, Mizar–Alkaid about 6.7°). Sources: Royal Museums
   Greenwich, "How to find the North Star" and "The Plough"; IAU constellation list (Ursa Major, Cassiopeia); NGSS
   1-ESS1-1 (patterns of the Sun, Moon and stars); NASA Space Place. Slips it targets: the North Star is the brightest
   star (it is about the 48th brightest; Sirius is brightest), stars vanish in the day, the Plough stays still while the
   North Star moves, a turned or upside-down Plough is a different pattern, and using the wrong stars as pointers. */
const PLO=(()=>{
const PLOUGH=[{n:'Alkaid',x:-25,y:1},{n:'Mizar',x:-19,y:3.5},{n:'Alioth',x:-15,y:4.5},{n:'Megrez',x:-9.5,y:3.5},{n:'Phecda',x:-8,y:-1},{n:'Merak',x:0,y:0},{n:'Dubhe',x:0,y:5.4}];
const LINKS=[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,3]];
const POLARIS={n:'North Star',x:0,y:34.1};
const FAINT=[[-22,9],[-12,10],[-4,10.5],[-28,6],[-16,-4],[-5,-5],[4,3],[-27,-4],[3,-4],[-11,14],[6,16],[-20,22],[-6,28],[8,30]];
const BRIGHT={x:12,y:22};
const W5=[[-5,0],[-2.5,-3],[0,-1],[2.5,-3.5],[5,-1]];
const ODD=[[-6,0],[-3,2],[-1,-2],[1,1],[3,-1],[5,2],[6,-2]];
const SHAPES=[{rot:200,d:['w','odd']},{rot:90,d:['mirror','w']},{rot:310,d:['mirror','odd']}];
const ROBOT=[{s:'The North Star is the brightest star in the sky.',ok:false,fix:'Many stars are brighter. Sirius is the brightest. The North Star is easy to find, not extra bright.'},
 {s:'Follow the 2 pointer stars to find the North Star.',ok:true,fix:'The 2 stars at the end of the pan point to it.'},
 {s:'The stars go away in the daytime.',ok:false,fix:'The stars are still there. The Sun is so bright that we cannot see them.'},
 {s:'In the night, the Plough turns round the North Star.',ok:true,fix:'Earth spins, so the stars seem to turn round the North Star.'}];
const DESC=[
 'A night sky with many stars. 7 of them make the Plough, a pan with a bent handle.',
 'The Plough and a big part of the night sky above it. Find the pointer stars, then the North Star.',
 'The night sky with the North Star in the middle and the Plough below it. A button moves the time on.',
 'Three small skies. One shows the Plough turned round. Tap that sky.',
 'A robot says things about stars. Buttons: Right or Slip.'];
const DONE=[
 'All 7 stars: 3 in the bent handle and 4 in the pan. That is the Plough.',
 'Merak and Dubhe point the way. About 5 pointer gaps up is the North Star. It is only medium bright.',
 'After 6 hours the Plough has turned a quarter of the way round, but the North Star stayed put.',
 'The Plough can look upside down or on its side, but it never flips like a mirror.',
 'The robot slipped twice: the North Star is not the brightest, and stars are still there in the day.'];
const QS=[
 {q:'How many bright stars make the Plough?',a:'7',o:[['5','w'],['3','count']]},
 {q:'Which stars point to the North Star?',a:'The 2 at the end of the pan',o:[['The 3 in the handle','pointer'],['The brightest star','bright']]},
 {q:'Is the North Star the brightest star?',a:'No, many stars are brighter',o:[['Yes, the brightest of all','bright'],['It is a planet, not a star','planet']]},
 {q:'Where are the stars in the daytime?',a:'Still there, hidden by sunlight',o:[['Gone until night','day'],['Behind the Moon','moon']]},
 {q:'You watch all night. Which star stays nearly still?',a:'The North Star',o:[['A star in the Plough','still'],['The brightest star','bright']]},
 {q:'The Plough looks upside down. Why?',a:'The sky has turned round',o:[['It is a new pattern','flip'],['Its stars moved apart','apart']]}];
return{PLOUGH,LINKS,POLARIS,FAINT,BRIGHT,W5,ODD,SHAPES,ROBOT,DESC,DONE,QS}})();
