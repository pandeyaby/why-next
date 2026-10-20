"""Banks of worked examples per archetype. A topic gets the one whose pattern matches its title or description,
so siblings in one domain get different, fitting examples instead of sharing one."""
W = {
"investigate": [
 (r"fair test|variable|control", "Testing which paper towel soaks up most", ["Change one thing: the brand of towel.", "Measure one thing: how much water each soaks up (ml).", "Keep the rest the same: towel size, water amount, time.", "Repeat three times and compare the means."]),
 (r"conclusion|evidence|answer question|support", "Do plants grow taller with more light?", ["Results: 2 cm (dark), 5 cm (shade), 9 cm (sun) after 10 days.", "Pattern: more light, taller plants.", "Conclusion: in this test, plants grew taller with more light.", "Limit: only one kind of plant, so test others before generalising."]),
 (r"correlation|causation|another explanation", "Shark attacks and ice-cream sales", ["Both rise in the same months.", "Ask: could something else cause both? Yes: hot weather.", "Hot weather brings more swimmers and more ice cream.", "So the link is a correlation, not a cause."]),
 (r"measur|accura|equipment|observ", "Measuring the length of a leaf", ["Line the end of the leaf up with 0 on the ruler, not the edge of the ruler.", "Look straight down to avoid parallax.", "Read to the nearest millimetre: 63 mm.", "Measure two more leaves to check."]),
 (r"record|table|chart|graph|data", "Recording a melting test", ["Draw a table: time (min) | ice left (g).", "Put the thing you change in the first column.", "Write a reading every 2 minutes, with units in the headings.", "Plot a line graph: time across, mass up."]),
 (r"repeat|reliab", "Timing a ball rolling down a ramp", ["Times: 2.1 s, 2.3 s, 3.9 s, 2.2 s.", "3.9 s is far from the others: an outlier.", "Check why (it hit the side), then repeat it.", "Mean of 2.1, 2.3, 2.2 = 2.2 s."]),
 (r"classif|key|group", "Sorting animals with a key", ["Question 1: does it have legs? Snake → no.", "Question 2: does it have six legs? Ant → yes: insect.", "Question 3: does it have feathers? Robin → yes: bird.", "Each yes/no question splits the group in two."]),
 (r"design|solution|problem", "Designing a bridge from paper", ["Define the problem: hold 10 coins across a 20 cm gap.", "Sketch two designs: flat sheet and folded zig-zag.", "Test each with coins added one at a time.", "The folded design held 25 coins: choose it, then improve it."]),
 (r"question|predict|revis|mind|idea", "Asking a testable question", ["Wonder: 'Do plants like music?' is hard to test.", "Make it measurable: 'Does playing music change how tall cress grows in a week?'", "Predict, test with and without music, and compare.", "If the evidence disagrees with your idea, change your mind."])],
"watercycle": [
 (r"wind", "Why a sea breeze blows on a sunny day", ["Land heats up faster than the sea.", "Warm air over the land rises, leaving lower pressure.", "Cooler air from over the sea moves in to replace it.", "That moving air is the sea breeze."]),
 (r"season", "Why it is colder in winter", ["Earth's axis is tilted.", "In winter your hemisphere tilts away from the Sun.", "Sunlight is spread out and days are shorter.", "So the ground and air warm up less."]),
 (r"climate zone|climate change|ancient climate|weather vs|climate", "Weather or climate?", ["'It is raining in Leeds today': weather (one day).", "'Leeds has mild, wet winters': climate (the usual pattern over 30 years).", "Ice cores trap old air, so scientists can read climates from long ago."]),
 (r"cloud", "Spotting cloud types", ["Cumulus: puffy, fair weather.", "Stratus: flat grey sheets, drizzle.", "Cumulonimbus: tall towers, thunderstorms.", "All form when rising air cools and vapour condenses."]),
 (r"temperature|thermomet", "Reading a thermometer", ["Find where the liquid stops.", "Read the nearest mark: 18 °C.", "Below zero, count down from 0: −4 °C.", "Compare morning (6 °C) and afternoon (14 °C): 8 °C warmer."]),
 (r"atmosphere", "Layers of the atmosphere", ["Troposphere: where weather happens, up to about 12 km.", "Stratosphere: holds the ozone layer.", "The air gets thinner the higher you go.", "The atmosphere keeps Earth warm and blocks harmful rays."]),
 (r"where water|found", "Where Earth's water is", ["About 97% is salty sea water.", "About 2% is frozen in ice caps and glaciers.", "Less than 1% is fresh water in rivers, lakes and underground.", "So fresh water is precious."]),
 (r"rain|puddle|type|local|geograph", "Following a raindrop", ["The Sun heats the sea and water evaporates into vapour.", "The vapour rises, cools and condenses into cloud droplets.", "Droplets join until they are heavy and fall as rain.", "Rain runs into rivers and back to the sea."])],
"writing": [
 (r"opinion|persua", "Writing an opinion paragraph", ["State your opinion: 'Every school should have a garden.'", "Give a reason: 'Children learn where food comes from.'", "Add an example: 'Our class grew tomatoes for lunch.'", "Finish by restating: 'That is why gardens matter.'"]),
 (r"paragraph|organis", "Organising into paragraphs", ["Plan three ideas: habitat, food, babies.", "Give each idea its own paragraph.", "Start each with a topic sentence.", "Start a new paragraph when the idea changes."]),
 (r"inform", "Writing to inform about hedgehogs", ["Use a heading: 'All about hedgehogs'.", "Group facts under subheadings: Food, Homes.", "Use precise, factual sentences.", "Add a labelled diagram."]),
 (r"plan|saying|say", "Planning before writing", ["Say the sentence aloud first: 'The fox crept through the snow.'", "Check it makes sense, then write it.", "Use a quick plan: beginning, middle, end.", "Tick each part as you write it."]),
 (r"story|beginning|ending", "A story with a beginning and an end", ["Beginning: introduce Mia and her lost kite.", "Middle: she climbs the hill and finds it stuck in a tree.", "End: a friend helps her get it down.", "Each part is a few sentences."]),
 (r"stamina", "Building writing stamina", ["Set a timer for 5 minutes and keep writing.", "Don't stop to rub out: cross out and keep going.", "Next time try 7 minutes.", "Read back and pick your best sentence."]),
 (r"vocabulary|craft|process|defin", "Using the writing process", ["Plan: jot ideas in a mind map.", "Draft: write it all down.", "Revise: improve the words (said → whispered).", "Edit: fix spelling and punctuation, then publish."])],
"energy": [
 (r"specific heat|final temperature|mix", "Heating 2 kg of water by 10 °C", ["Q = m × c × ΔT.", "Water: c = 4200 J/kg °C.", "Q = 2 × 4200 × 10 = 84 000 J."]),
 (r"cooling|heat loss|equilibrium|hot to cold", "A hot drink cooling", ["Heat flows from the hot drink to the cooler room.", "It cools fast at first, then more slowly.", "It stops cooling when it reaches room temperature: thermal equilibrium."]),
 (r"system|boundary|accounting|model", "An energy account for a kettle", ["System: the kettle and its water.", "In: 2000 J of electrical energy each second.", "Out: 1800 J heats the water; 200 J warms the kettle and air.", "Efficiency = 1800 ÷ 2000 = 90%."]),
 (r"unwanted|reduc|insulat|design", "Keeping a house warm", ["Heat escapes through walls, roof, windows and gaps.", "Loft insulation traps air, a poor conductor.", "Double glazing has a gap that slows conduction.", "Less heat lost means lower energy bills."])],
"waves": [
 (r"interfer|superpos|standing|harmonic", "Two waves meeting", ["Crest meets crest: they add to a bigger crest.", "Crest meets trough: they cancel.", "On a guitar string, waves reflect and overlap to make standing waves.", "The lowest note has one loop: the first harmonic."]),
 (r"decibel|sound level", "How loud is it?", ["Whisper: about 30 dB; talking: 60 dB.", "Every 10 dB more is 10 times the intensity.", "Above about 85 dB for long periods can damage hearing."]),
 (r"radio|emission|absorb", "How radio works", ["A transmitter makes electrons oscillate in an aerial.", "That sends out radio waves.", "In the receiver's aerial the waves make electrons oscillate too.", "This tiny current is turned back into sound."]),
 (r"sampling|bit|digital", "Turning sound into numbers", ["Measure the wave many times a second (the sample rate).", "Store each measurement as a binary number.", "More samples and more bits make a closer copy."]),
 (r"energy, not matter|transfer energy", "A duck on a ripple", ["A ripple passes under a duck.", "The duck bobs up and down but stays in place.", "The wave moved energy across the pond, not water."])],
}
def pick(name, t, seed, skip=0):
    """skip=1 (after a near-duplicate) takes the next fitting example instead of the first."""
    import re
    bank = W.get(name)
    if not bank: return None
    x = t["name"] + " " + t["description"]
    order = [b for b in bank if re.search(b[0], t["name"], re.I)] + [b for b in bank if re.search(b[0], x, re.I) and not re.search(b[0], t["name"], re.I)]
    order += [b for b in bank[seed % len(bank):] + bank[:seed % len(bank)] if b not in order]
    _, title, steps = order[min(skip, len(order) - 1)]; return (title, steps)
W.update({
"animals": [
 (r"mammal|whale|dolphin", "Is a dolphin a fish or a mammal?", ["It breathes air through a blowhole.", "It gives birth to live young and feeds them milk.", "Those are mammal features, so it is a mammal."]),
 (r"classif|group|vocabulary", "Classifying a frog", ["Backbone? Yes: vertebrate.", "Moist skin, lays eggs in water, lives on land and in water.", "So it is an amphibian."]),
 (r"minibeast|insect", "Is a woodlouse an insect?", ["Count the legs: 14.", "Insects have 6 legs and 3 body parts.", "So a woodlouse is not an insect; it is a crustacean."]),
 (r"adapt|deep|ocean|polar|penguin|rainforest", "How a penguin is adapted", ["Thick feathers and fat keep it warm.", "Flipper-shaped wings make it a fast swimmer.", "Dark back, white front: hard to see from above or below."]),
 (r"need|nutrition|food|babies|life cycle|never alive|living", "Living, dead or never alive?", ["A dog: moves, eats, grows: living.", "A fallen leaf: was once alive: dead.", "A stone: has never done any life processes: never alive."])],
"ecosystems": [
 (r"food web|interdepend", "Reading a food web", ["Grass → rabbit → fox and grass → vole → owl.", "If rabbits fall, foxes eat more voles.", "Then owls have less food: everything is linked."]),
 (r"variation|survival|evolution|adapt", "Peppered moths", ["Moths vary: some pale, some dark.", "On sooty trees, birds spot pale moths more easily.", "Dark moths survive and breed, so dark moths become common.", "This is natural selection."]),
 (r"energy|sun|food", "Energy in a food chain", ["The Sun's energy is trapped by grass.", "A rabbit eats the grass: about 10% of the energy passes on.", "A fox eats the rabbit: about 10% of that passes on."]),
 (r"cycl|matter|carbon|decompos", "Where a fallen leaf goes", ["Decomposers such as fungi feed on it.", "They release carbon dioxide and minerals.", "Plants take them up again: matter is recycled."])],
"habitats": [
 (r"pollution|harm|human|impact|chang", "Plastic in the ocean", ["A bag drifts out to sea.", "A turtle mistakes it for a jellyfish and swallows it.", "Less plastic waste means fewer harmed animals."]),
 (r"layer|rainforest", "Rainforest layers", ["Emergent: the tallest trees, eagles.", "Canopy: dense leaves, most animals live here.", "Understorey: darker, frogs and snakes.", "Forest floor: dark, decomposers and insects."]),
 (r"need|vocabulary|habitat", "A woodlouse's habitat", ["It needs damp, dark places.", "Under a log gives shelter and rotting wood to eat.", "On a sunny path it would dry out."])],
"speaking": [
 (r"describ", "Describing a picture aloud", ["Start big: 'It is a busy beach.'", "Use position words: 'On the left, a dog chases a ball.'", "Add precise adjectives: 'a striped red umbrella'."]),
 (r"opinion|justif", "Giving an opinion with a reason", ["'I think we should have longer break,'", "'because we would come back ready to learn.'", "'For example, after PE we concentrate better.'"]),
 (r"question|asking", "Asking a good question", ["Listen to the speaker.", "Ask an open question: 'Why did you choose that?'", "Listen to the answer, then follow up."]),
 (r"listen|respond|discussion|group|talk|idea", "Building on someone's idea", ["Listen: 'We could plant flowers.'", "Agree and add: 'Yes, and we could pick ones bees like.'", "Invite others: 'What do you think, Zara?'"])],
"reading": [
 (r"predict", "Predicting from clues", ["Clue: dark clouds gather as Ben sets off without a coat.", "Predict: he will get soaked.", "Read on to check."]),
 (r"character|feeling|motive|between the lines|infer", "Inferring a character's feeling", ["Text: 'Lena kicked a stone and didn't look up.'", "Clue: kicking, not looking up.", "Inference: Lena is upset."]),
 (r"sequence|message|story|setting", "Retelling in sequence", ["First: the fox finds a locked gate.", "Then: he asks the birds for help.", "Finally: they open it together.", "Message: working together solves problems."]),
 (r"main topic|informational", "Finding the main topic", ["Read the title and headings.", "Ask: what is most of it about?", "Main topic: how bees make honey."])],
"thinking": [
 (r"monitor|meaning|self-correct", "Fixing a reading slip", ["Read: 'The horse was on fire.' That sounds wrong.", "Reread: 'The house was on fire.'", "Now it makes sense: self-corrected."]),
 (r"fluen|expression", "Reading with expression", ["Spot the question mark: let your voice rise.", "Spot the exclamation mark: say it with feeling.", "Pause at full stops."])],
"words": [
 (r"question word", "Choosing a question word", ["Who: a person. Where: a place. When: a time.", "'___ is the party?' asks about time: When.", "'___ is your teacher?' asks about a person: Who."]),
 (r"sentence", "Building a sentence", ["Who? 'The cat'.", "Does what? 'sleeps'.", "Where? 'on the warm mat'.", "Capital letter and full stop: 'The cat sleeps on the warm mat.'"]),
 (r"defin|new word|discuss", "Working out 'enormous'", ["Read: 'The enormous whale filled the bay.'", "Clue: it filled a whole bay.", "Meaning: very big. Synonym: huge."]),
 (r"sort|categor|domain", "Sorting words into categories", ["Words: oak, robin, maple, sparrow.", "Group 1 (trees): oak, maple.", "Group 2 (birds): robin, sparrow."])],
"earth": [
 (r"land|water|shape", "Land and water shapes", ["An island is land with water all around.", "A peninsula is land almost surrounded by water.", "A lake is water with land all around."]),
 (r"propert|material", "Choosing a rock for a step", ["Granite is hard and doesn't soak up water.", "Chalk is soft and crumbles.", "Granite is the better choice."]),
 (r"season", "Seasons in one tree", ["Spring: buds open.", "Summer: full green leaves.", "Autumn: leaves change colour and fall.", "Winter: bare branches."])],
"plates": [
 (r"earthquake|seismic|measur|strength", "Measuring an earthquake", ["A seismometer records the shaking as a wavy line.", "Bigger waves on the record mean a stronger quake.", "Each step up the magnitude scale is about 32 times more energy."]),
 (r"ring of fire", "Why the Pacific has a Ring of Fire", ["Many plates meet around the Pacific edge.", "At these boundaries plates sink and melt.", "So volcanoes and earthquakes form a ring."]),
 (r"fast|slow|change", "Fast and slow Earth changes", ["Fast: an earthquake or eruption changes land in minutes.", "Slow: rivers wear valleys over thousands of years.", "Both reshape Earth's surface."])],
"space": [
 (r"solar system|planet", "Ordering the planets", ["Mercury, Venus, Earth, Mars: small rocky planets.", "Jupiter, Saturn, Uranus, Neptune: giant planets.", "Further from the Sun means a longer year."]),
 (r"star|sun", "Why the Sun looks bigger than other stars", ["The Sun is a star like the others.", "It is far closer: 150 million km.", "The next star is about 270 000 times further away."]),
 (r"gravit", "Weight on the Moon", ["Moon gravity is about 1/6 of Earth's.", "A 60 kg astronaut weighs 600 N on Earth.", "On the Moon: about 100 N, but the mass is still 60 kg."])],
"forces": [
 (r"terminal", "A skydiver reaching terminal velocity", ["At first, weight is bigger than air resistance: she speeds up.", "Faster means more air resistance.", "When they balance, the speed stays steady: terminal velocity."]),
 (r"net force|resultant|calculat", "Net force on a sledge", ["Pull 50 N forward, friction 20 N back.", "Net force = 50 − 20 = 30 N forward.", "So the sledge speeds up."]),
 (r"speed|distance|time|graph", "Reading a distance–time graph", ["A straight sloping line: steady speed.", "Flat line: stopped.", "Gradient = distance ÷ time = speed."])],
"weather": [
 (r"resource|net zero|transition", "Choosing an energy source", ["Coal: reliable but releases carbon dioxide.", "Wind: renewable but only when windy.", "A mix with storage helps reach net zero."])],
})
