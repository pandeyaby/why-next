/* Text data for the matter cycling lab (flag_matcyc.js; bundled in the main learn.js like structad_art.js so the lab file
   stays under 20 KB): wrong[from-to] explains why matter does not move that way round the cycle, and bank holds the
   challenge questions as [question, right answer, [[wrong answer, misconception tag], ...]]. */
const MCDATA={
wrong:{'0-2':'Rabbits cannot take matter straight from air and soil. Plants take it in first: carbon dioxide through leaves, water and minerals through roots.',
 '0-3':'Decomposers feed on dead things and waste, not straight on air and soil.','1-0':'Grass does give some back when it breathes, but follow the matter into an animal next.',
 '1-3':'That happens when grass dies. For this trip, follow the matter into the rabbit that eats it.','2-0':'The rabbit breathes some out, but its droppings and body still hold matter. Who feeds on those?',
 '2-1':'Matter does not flow from rabbit back into grass directly. Something must break the rabbit\u2019s waste down first.','3-1':'Decomposers give nutrients back to the soil and carbon dioxide to the air first; then the grass takes them in.',
 '3-2':'Rabbits do not eat decomposers here. Decomposers return matter to the soil and air.'},
bank:[['A log rots away on the forest floor. Where did its matter go?','Into the soil and the air',[['It was destroyed','vanish'],['It turned into energy','energyNotMatter']]],
['What do decomposers do in an ecosystem?','Break down dead things and give nutrients back to the soil',[['Make food from sunlight','plantRole'],['Spread disease, so they are only harmful','decomposersBad']]],
['Where does grass get most of the matter it grows from?','Carbon dioxide from the air and water',[['Only from the soil','plantsFromSoil'],['From sunlight','energyNotMatter']]],
['Which will rot in a compost heap?','An orange peel',[['A crisp packet','plasticRots'],['A metal spoon','plasticRots']]],
['In a sealed jar garden with no decomposers, what happens over time?','Dead matter piles up and nutrients run out',[['Nothing changes','noCycle'],['The plants grow faster','decomposersBad']]],
['How does matter from a rabbit get back to the air?','The rabbit breathes out carbon dioxide, and decomposers break down its body',[['It cannot: animals keep it forever','noCycle'],['Only plants can return matter','noCycle']]]]};
