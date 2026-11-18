/* Data for the coral reef lab (flag_reef.js; bundled in the main learn.js like altexp_art.js so the lab file stays small).
   PLACES: where to put a coral ([name, grows?, what happens, looks]). PETS: reef animals and the home or food each one uses.
   WHY: cards for "rainforests of the sea" ([text, true reason?, why not]). bank: challenge questions [q, answer, wrongs]. */
const REEFART={
PLACES:[['Deep, dark water',0,'Too dark. The tiny algae inside the polyps need sunlight to make food, so the coral starves.','dark'],
 ['Cold water',0,'Too cold. Reef-building coral only grows in warm seas.','cold'],
 ['Muddy water by a river',0,'Mud blocks the sunlight and settles on the polyps, so the coral cannot feed.','mud'],
 ['Very hot water',0,'Too hot! The polyps push out their algae and turn white. This is called bleaching. If the heat lasts, the coral dies.','hot'],
 ['Warm, clear, shallow, sunny water',1,'Yes! Warm, clear, shallow water lets sunlight reach the algae, so the coral grows.','sun']],
PETS:[['Clownfish',0,'It hides in the stinging tentacles of a sea anemone.'],['Octopus',1,'It squeezes into a cave to hide in the day.'],
 ['Parrotfish',2,'It scrapes algae off coral with its beak-like teeth.'],['Moray eel',3,'It waits in a narrow crack for passing prey.'],
 ['Sea turtle',4,'It sleeps under a rock ledge.'],['Crab',5,'It shelters between coral branches.']],
HOMES:['Sea anemone','Cave','Coral covered in algae','Narrow crack','Rock ledge','Coral branches'],
WHY:[['A huge variety of living things',1],['Lots of layers and hiding places',1],['A small area packed with life',1],
 ['Both are full of trees',0,'Reefs have no trees. Coral is made by animals.'],['It rains a lot on reefs',0,'Rain is not the reason. The name is about how much life there is.'],
 ['Both are made of rock',0,'Rainforests are not rock, and coral is built by living polyps.']],
bank:[['What builds a coral reef?','Tiny animals called polyps',[['Rocks that grow by themselves','rock'],['Sea plants','plant']]],
 ['Why do reef corals need sunlight?','Algae living inside them use it to make food',[['Coral is a plant','plant'],['To keep the water cold','cold']]],
 ['A coral has turned white in very hot water. What happened?','It pushed out its algae: bleaching',[['It is healthy and clean','white'],['It turned into rock','rock']]],
 ['Why are reefs called rainforests of the sea?','They are home to a huge variety of life',[['They are full of trees','trees'],['It rains a lot on them','rain']]],
 ['Most of a reef is old limestone. Which part is alive?','The thin layer of polyps on top',[['All of it, right to the bottom','allalive'],['None of it: it is rock','rock']]],
 ['Where do reef corals grow best?','Warm, clear, shallow sea',[['Deep, dark sea','dark'],['Cold, muddy water','cold']]]],
WHYM:{rock:'Coral looks like rock, but polyps build it. The rocky part is limestone cups made by living animals.',plant:'Coral is not a plant. Polyps are animals: they catch food with tentacles. The algae inside them are the plant-like part.',
 cold:'Reef corals need warm water, and the algae need clear, sunny water. Cold or muddy water stops them.',white:'White coral in hot water has lost its algae. It is stressed and can starve.',
 trees:'There are no trees on a reef. The name is about the huge number of kinds of living things.',rain:'Rain is not the reason. Reefs, like rainforests, are home to a huge variety of life.',
 allalive:'Only the top layer is alive. Underneath are limestone cups left by polyps that lived long ago.',dark:'In deep, dark water the algae get no light, so the coral cannot get enough food.'}};
