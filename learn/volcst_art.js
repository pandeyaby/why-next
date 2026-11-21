/* Data for flagvolcst (active, dormant and extinct volcanoes, ages 7–9). Sources: BBC Bitesize KS2 Geography
   "Volcanoes" (active: erupted recently and likely to again; dormant: not erupted for a long time but could; extinct:
   not expected to erupt again); USGS Volcano Hazards Program glossary and Fact Sheet 113-97 "The Cataclysmic 1991
   Eruption of Mount Pinatubo" (about 500 years quiet; small earthquakes and steam blasts from March 1991, rising
   sulfur dioxide, a lava dome on 7 June, the climactic eruption on 15 June; warnings saved at least 5,000 lives);
   USGS HVO on the Hawaiian hot spot (Kilauea active, Mauna Kea last erupted about 4,500 years ago, Kohala about
   120,000 years ago and extinct); British Geological Survey on Arthur's Seat (about 350 million years old).
   Slips it targets: "quiet for my whole life means extinct", "dormant means safe", ignoring warning signs, and
   judging a volcano only by how it looks. */
const VST=(()=>{
const CARDS=[{t:'Lava pouring\nout today',k:0},{t:'Gas puffs and\nsmall shakes',k:0},{t:'Quiet 500 years,\nhot magma below',k:1},
 {t:'Quiet 4,500 years,\ncould wake up',k:1},{t:'Last erupted 350\nmillion years ago',k:2},{t:'Worn down,\nno magma left',k:2}];
const BINS=['Active','Dormant','Extinct'];
const SIGNS=[{when:'March 1991',k:'quake',say:'Small earthquakes shake the ground, and steam blasts out of the side.'},
 {when:'May 1991',k:'gas',say:'Much more sulfur dioxide gas comes out. Magma is rising.'},
 {when:'7 June 1991',k:'dome',say:'A dome of fresh lava pushes up near the top.'}];
const SIGNK=[['quake','Shaking'],['gas','Gas'],['dome','Lava dome']];
const ROBOT=[{s:'It has not erupted in my whole life, so it is extinct.',ok:false,fix:'A life is short. Pinatubo slept about 500 years and still erupted. It may be dormant.'},
 {s:'It erupted last year, so it is active.',ok:true,fix:'A recent eruption means active. It could erupt again soon.'},
 {s:'This volcano is only dormant, so it is safe to build right next to it.',ok:false,fix:'Dormant means asleep, not dead. It still has magma and can wake up.'},
 {s:'Arthur\'s Seat has had no magma for 350 million years, so it is extinct.',ok:true,fix:'No magma supply for that long: it is not expected to erupt again.'},
 {s:'Small earthquakes and new gas under a quiet volcano mean nothing.',ok:false,fix:'They are warning signs that magma is moving. Scientists watch for them.'}];
const HILLS=[{n:'Hill 1',k:1,under:'A big pool of hot magma, but no eruption for 2,000 years'},
 {n:'Hill 2',k:2,under:'Cold, solid rock all the way down. No magma at all'},
 {n:'Hill 3',k:0,under:'Magma rising fast, with gas leaking out of cracks'}];
const DESC=[
 'Six clue cards and three boxes: Active, Dormant and Extinct. Drag each card to a box, or tap a card then a box.',
 'Mount Pinatubo in early 1991. It has been quiet for about 500 years. Watch month by month and tap each warning sign.',
 'A plate of rock slides over a hot spot of magma. Drag the plate to the left to carry volcanoes away.',
 'A robot talks about volcanoes. Buttons: Right or Slip.',
 'Three quiet green hills that look the same. Tap a hill to look underneath, then sort it.'];
const DONE=[
 'Active: erupting now or showing signs. Dormant: quiet a long time but magma is still there. Extinct: magma gone for good.',
 'Pinatubo was dormant, not extinct. On 15 June 1991 it erupted. Warnings from these signs helped save at least 5,000 lives.',
 'The volcano on the hot spot is active, the next is dormant and the oldest is extinct, like Kilauea, Mauna Kea and Kohala in Hawaii.',
 'Three slips: a quiet lifetime does not mean extinct, dormant is not safe, and warning signs matter.',
 'Hill 3 is active, Hill 1 is dormant and Hill 2 is extinct. The outside looked the same: what matters is the magma below and the record.'];
const QS=[
 {q:'A volcano last erupted 600 years ago. Hot magma is still under it. What is it?',a:'Dormant',o:[['Extinct','life'],['Safe to live on','safe']]},
 {q:'What does extinct mean for a volcano?',a:'It is not expected to erupt again',o:[['It has not erupted for 100 years','life'],['It is quiet right now','look']]},
 {q:'A quiet volcano starts to shake and give off more gas. What should people do?',a:'Listen to scientists and be ready to leave',o:[['Nothing, it is quiet','signs'],['Nothing, it is dormant','safe']]},
 {q:'Two hills look the same. How can scientists tell which is extinct?',a:'Check for magma below and its eruption record',o:[['By how green it looks','look'],['By asking if anyone saw it erupt','life']]},
 {q:'Is a dormant volcano safe to build a town on?',a:'No, it could wake up',o:[['Yes, it is asleep','safe'],['Yes, if it is green','look']]},
 {q:'Mount Pinatubo was quiet for about 500 years before 1991. What was it?',a:'Dormant',o:[['Extinct','life'],['Never a volcano','look']]}];
return{CARDS,BINS,SIGNS,SIGNK,ROBOT,HILLS,DESC,DONE,QS}})();
