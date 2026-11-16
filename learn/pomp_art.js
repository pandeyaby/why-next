/* Data for the Pompeii lab (flag_pomp.js; bundled in the main learn.js so the lab file stays small).
   ERUPT: what happens with each tap on Vesuvius ([hours, ash depth on Pompeii in metres, message]); depths are rounded
   from the excavation layers (about 2.8 m of pumice, then hot ash flows, 4–6 m in all). KEEP: things buried in the ash
   ([name, what the ash did]). CAST: Fiorelli's plaster steps in order. TIME: timeline cards in order ([when, what, short label]).
   FINDS: dig tiles ([find, clue index]); CLUES: what each find tells us. bank: challenge [q, answer, wrongs]. */
const POMPART={
ERUPT:[[0,0,'A normal day in Pompeii. The mountain is quiet.'],[1,0.1,'BOOM! Vesuvius blasts a huge cloud of ash and rock high into the sky.'],
 [6,1,'The wind blows the cloud over Pompeii. Pumice stones and ash rain down. People run.'],[12,2,'The ash is piling up. Roofs begin to fall in under the weight.'],
 [18,2.8,'Nearly 3 metres of pumice and ash. Many people have escaped, but some are trapped.'],[20,5,'Next morning, clouds of red-hot ash and gas rush down the mountain and cover the town. Pompeii is buried.']],
KEEP:[['Loaf of bread','The bread was baking in an oven. It turned black like charcoal but kept its shape, with the baker\'s cuts still on top.'],
 ['Wall painting','Buried in ash, away from sun and rain, the paint kept its bright reds and yellows.'],
 ['Coins','The coins stayed in a purse. They show which emperors ruled.'],
 ['Wooden door','The wood rotted away slowly, but it left a hollow in the hard ash: the exact shape of the door.'],
 ['Glass jar','Glass does not rot. The jar was found still on the shelf.']],
CAST:['Find a hollow in the hard ash','Make a small hole and pour in runny plaster','Wait for the plaster to set hard','Dig away the ash'],
CASTM:['Archaeologists tap and find an empty space in the hard ash. Something was here and has rotted away.','They drill a small hole and pour wet plaster into the hollow until it is full.',
 'They wait. The plaster dries hard in the exact shape of the hollow.','They dig the ash away. Out comes the shape of a dog, even its collar!'],
TIME:[['Before AD 79','Pompeii is a busy Roman town of about 11,000 people','A busy Roman town'],['AD 79','Vesuvius erupts and buries Pompeii','Buried by Vesuvius'],
 ['1,700 years','Pompeii lies hidden and forgotten under the ground','Hidden and forgotten'],['1748','Diggers start to uncover the town','Digging begins'],['Today','Archaeologists are still digging and learning','Still digging']],
FINDS:[['Oven with 81 loaves',0],['Mosaic saying "Beware of the dog"',1],['Big stepping stones in a street',2],['Painted writing on a wall',3]],
CLUES:['People bought bread from bakeries','People kept dogs to guard their homes','Streets got wet and dirty, and carts drove through','Many people could read and write'],
bank:[['What buried Pompeii?','Ash and pumice falling from the sky, then hot ash clouds',[['Rivers of red-hot lava','lava'],['A huge wave from the sea','wave']]],
 ['How was Pompeii kept so well for so long?','Ash sealed it from air, rain and people',[['The Romans built it in stone that never breaks','stone'],['People looked after it for 1,700 years','looked']]],
 ['How did archaeologists make the shapes of people and animals?','They poured plaster into hollows in the ash',[['Romans carved them as statues','statue'],['The ash turned the bodies to stone','tostone']]],
 ['Why do we know so much about Roman life from Pompeii?','A whole town was frozen in time on one day',[['The Romans wrote a guidebook to it','book'],['It is the only Roman town ever built','only']]],
 ['When was Pompeii buried?','AD 79',[['1748','found'],['Last year','recent']]],
 ['How far did lava flow to bury Pompeii?','It did not: ash and pumice buried it',[['All the way across the town','lava'],['Only halfway','lava']]]],
WHYM:{lava:'Lava did not bury Pompeii. Ash and pumice fell from the sky, then clouds of hot ash rushed over the town.',wave:'There was no big wave. Pompeii was buried by ash and pumice from Vesuvius.',
 stone:'Roofs fell in and wood rotted. It was the blanket of ash that kept things safe from air, rain and people.',looked:'Nobody looked after it. It was hidden and forgotten under the ash for about 1,700 years.',
 statue:'They are not Roman statues. The bodies rotted and left hollows, and archaeologists filled them with plaster.',tostone:'The ash did not turn bodies to stone. It hardened around them, and the hollows they left were filled with plaster.',
 book:'There was no guidebook. We learn from the buildings, finds and writing that the ash kept.',only:'There were many Roman towns. Pompeii is special because it was buried all at once and kept.',
 found:'1748 is when digging started. The eruption was much earlier, in AD 79.',recent:'It was almost 2,000 years ago, in AD 79.'}};
