/* Data for the types-of-teeth lab (flag_teeth.js; bundled in the main learn.js like reef_art.js so the lab file stays small).
   TYPES: [name, shape, job]. ARCH: tooth type at each place in one upper jaw, from the middle out (adult set).
   FOOD: [what you do, tooth type that does it, why the others are wrong]. KIDS: animals [name, teeth, diet 0 plant 1 meat 2 both]. */
const TEETHART={
TYPES:[['Incisor','flat and sharp, like a chisel','cut and bite'],['Canine','long and pointed','grip and tear'],
 ['Premolar','wide with two bumps','crush and grind'],['Molar','widest, with bumpy tops','grind and chew']],
QUARTER:[0,0,1,2,2,3,3,3],MILK:[0,0,1,3,3],
FOOD:[['Bite a piece off an apple',0,'To bite a piece off, you need flat, sharp front teeth that cut like scissors.'],
 ['Grip and tear chewy bread',1,'Gripping and tearing needs long, pointed teeth.'],
 ['Crush a crunchy cracker',2,'Crushing happens just behind the canines, on teeth with two bumps.'],
 ['Grind a nut into mush',3,'Grinding into tiny bits needs the widest, bumpy teeth at the very back.']],
KIDS:[['Lion','long canines, slicing back teeth',1],['Horse','cropping front teeth, flat grinding back teeth',0],
 ['Human','cutting, pointed and flat teeth',2],['Rabbit','long front teeth, flat back teeth, no canines',0],
 ['Wolf','long canines, slicing back teeth',1],['Pig','tusks and wide, bumpy back teeth',2]],
DIETS:['Plant eater (herbivore)','Meat eater (carnivore)','Eats both (omnivore)'],
bank:[['Which teeth cut and bite food?','Incisors',[['Molars','grind'],['Canines','tear']]],
 ['Which teeth grind food into tiny bits?','Molars',[['Incisors','cut'],['Canines','tear']]],
 ['Which teeth are long and pointed, for gripping and tearing?','Canines',[['Molars','grind'],['Incisors','cut']]],
 ['How many teeth does an adult usually have?','32',[['20','milk'],['28','wisdom']]],
 ['A skull has long canines and sharp cutting back teeth. What did it eat?','Meat',[['Grass','plant'],['Only fruit','fruit']]],
 ['A skull has no canines and wide flat back teeth. What did it eat?','Plants',[['Meat','meat'],['Nothing: no canines means no food','nocanine']]]],
WHYM:{grind:'Molars are the wide back teeth: they grind. Cutting is done by the flat, sharp incisors at the front.',
 cut:'Incisors are at the front and cut. Grinding needs the wide, bumpy molars at the back.',
 tear:'Canines are the pointed teeth for gripping and tearing, not for cutting or grinding.',
 milk:'20 is a child’s set of milk teeth. Adults have 32, including premolars and wisdom teeth.',
 wisdom:'28 is an adult set before the 4 wisdom teeth come through. The full adult set is 32.',
 plant:'Plant eaters have wide, flat grinding teeth and usually no big canines.',fruit:'Long canines and cutting back teeth are for meat, not soft fruit.',
 meat:'Meat eaters have long canines. Wide, flat teeth with no canines are for grinding plants.',nocanine:'Many plant eaters have no canines. They crop plants with incisors and grind them with flat back teeth.'}};
