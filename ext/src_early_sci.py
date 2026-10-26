"""Ages 2-4 (wave 6): early-years Science, learned through play with a grown-up."""

from dsl import T, C, P, R, L, M

SI, OL, MM, FM, WL, WC = "Scientific Inquiry", "Organisms & Life Processes", "Matter & Materials", "Forces & Motion", "Waves, Light & Sound", "Weather & Climate"
EM, SRR, FC, ESA, SA, RDM = "Emotional Literacy", "Self-Regulation & Resilience", "Friendship & Cooperation", "Empathy & Social Awareness", "Self-Awareness", "Responsible Decision-Making"
LL = "Learning to Learn"
CC, GE, ME, MT = "Counting & Cardinality", "Geometry", "Measurement", "Mathematical Thinking"

# ---------------------------------------------------------------- Science, ages 2-4
T("ey_senses", C, SI, "Exploring with my five senses", "2-3",
  "Use looking, listening, touching, smelling and tasting (when safe) to explore everyday things, and name which body part helps with each sense",
  ["Points to eyes, ears, nose, mouth and hands when asked which helps them see, hear, smell, taste and feel",
   "Describes something with a sense word such as soft, loud, smelly or bumpy",
   "Knows some things are for looking at, not tasting"],
  "If {{name}} is handed a pine cone, do they look, feel and sniff it, and can they say which part of their body tells them it is prickly?",
  [], [])

T("ey_noticing_changes", P, SI, "Looking closely and noticing changes", "3-4",
  "Watch something carefully over time (a puddle drying, a banana going brown, ice in a cup) and say what is different now from before",
  ["Spots and describes a change between two visits, such as 'the puddle is smaller'",
   "Uses before and now, or first and then, to talk about the change",
   "Uses a magnifier or looks up close to notice small details"],
  "If {{name}} puts an apple slice on a plate in the morning, can they tell you what has changed about it by the afternoon?",
  [], [("ey_senses", "h", "Noticing a change starts with looking, touching or smelling carefully")])

T("ey_wondering_why", M, SI, "Wondering and asking 'why?'", "3-4",
  "Ask curious questions about the world (why is the sky blue, where does rain go) and have a go at a simple guess before a grown-up helps find out",
  ["Asks a why, how or what-if question about something they notice",
   "Offers their own guess, such as 'maybe the rain goes in the ground'",
   "Helps find out by looking, trying or asking"],
  "When {{name}} sees a snail, do they ask a question about it and make their own guess about the answer?",
  [], [("ey_senses", "s", "Questions often come from something they have seen, heard or touched")])

T("ey_will_it_happen", P, SI, "Guessing then trying to find out", "4-5",
  "Make a simple prediction in play (will the toy car reach the end? will the sponge float?), try it, and say whether the guess was right",
  ["Says what they think will happen before trying",
   "Tries it and watches what happens",
   "Says 'I was right' or 'it was different' without being upset"],
  "Before {{name}} drops a feather and a block, can they guess which will land first, then try it and say what happened?",
  [], [("ey_wondering_why", "h", "A prediction is a guess about a question they have wondered"),
       ("ey_noticing_changes", "s", "Checking a guess means watching closely what happens")])

T("ey_living_things", C, OL, "Living and not living", "3-4",
  "Sort things into living (people, animals, plants) and not living (rocks, toys, cars) using simple clues: living things eat or drink, grow and move or change by themselves",
  ["Sorts pictures or objects into living and not living",
   "Gives one reason, such as 'the dog eats food' or 'the plant grows'",
   "Knows a toy robot is not alive even though it moves"],
  "If {{name}} sees a worm, a stone and a toy car, can they say which one is alive and give a reason?",
  [], [("ey_senses", "s", "Watching and touching things gives the clues they use to decide")])

T("ey_baby_animals", L, OL, "Animals and their babies", "2-3",
  "Match common animals with their young (cow and calf, cat and kitten, duck and duckling, sheep and lamb) and know that babies grow into grown-up animals",
  ["Names the baby of several farm or pet animals",
   "Matches pictures of grown-up animals with their babies",
   "Says that a kitten will grow into a cat"],
  "When {{name}} looks at a picture book of farm animals, can they find the lamb and say who its mummy is?",
  [], [])

T("ey_my_body", L, OL, "Naming parts of my body", "2-3",
  "Name and point to main body parts (head, shoulders, knees, toes, elbows, tummy) and say simple things they do, such as legs for walking",
  ["Points to at least eight body parts when named",
   "Joins in a body song such as 'Head, Shoulders, Knees and Toes'",
   "Says what one body part helps them do"],
  "If you say 'touch your elbow', can {{name}} do it, and can they tell you what their legs help them do?",
  [], [])

T("ey_growing_body", C, OL, "Eating, sleeping and moving to grow", "3-4",
  "Know that people and animals need food, water, sleep and exercise to grow and stay healthy, and that their own body is growing",
  ["Says that they need food, water and sleep",
   "Compares a baby photo with now and says they have grown",
   "Names a healthy habit such as drinking water or running about"],
  "If {{name}} looks at a photo of themselves as a baby, can they say how they have changed and what helps them grow?",
  [], [("ey_my_body", "h", "Talking about growing needs names for the parts of the body"),
       ("ey_living_things", "s", "Growing is one of the signs of being alive")])

T("ey_plants_need", C, OL, "Plants need water and light", "3-4",
  "Look after a plant and see that it needs water and light to stay healthy: a plant left dry or in a dark cupboard wilts or turns pale",
  ["Waters a plant and says why",
   "Notices a droopy plant and suggests giving it water",
   "Says plants need light from the sun"],
  "If {{name}} sees a droopy plant on the windowsill, can they suggest what it needs?",
  [], [("ey_living_things", "h", "Plants need things because they are alive"),
       ("ey_noticing_changes", "s", "They notice the plant drooping or perking up")])

T("ey_seeds_grow", P, OL, "Growing from a seed", "4-5",
  "Plant a seed such as a bean or cress, care for it and watch roots and shoots appear, then put pictures of the stages in order",
  ["Plants a seed and waters it",
   "Spots the first shoot and describes it",
   "Puts three pictures (seed, shoot, plant) in order"],
  "After {{name}} plants a bean in a jar, can they tell you what came out first and put photos of its growth in order?",
  [], [("ey_plants_need", "h", "Growing a seed means giving it the water and light plants need"),
       ("ey_noticing_changes", "h", "They watch for small changes day by day")])

T("ey_animal_homes", C, OL, "Where animals live", "4-5",
  "Match animals to the places they live (fish in water, birds in nests, rabbits in burrows, worms in soil) and say one way the home helps the animal",
  ["Matches several animals to their homes",
   "Finds a minibeast under a log or stone and says why it lives there",
   "Says a nest keeps baby birds safe"],
  "When {{name}} lifts a log in the park and finds woodlice, can they say why the woodlice might like living there?",
  [], [("ey_living_things", "h", "Animals are living things that need a safe home"),
       ("ey_baby_animals", "s", "Nests and burrows keep young animals safe")])

T("ey_float_sink", P, MM, "Floating and sinking", "3-4",
  "Drop objects into water during bath or water play and sort them into ones that float and ones that sink",
  ["Sorts at least six objects into floaters and sinkers",
   "Uses the words float and sink correctly",
   "Guesses whether a new object will float before trying"],
  "In the bath, can {{name}} show you something that floats and something that sinks and use those words?",
  [], [("ey_senses", "s", "They look and feel objects before and after dropping them in")])

T("ey_materials_feel", L, MM, "Hard, soft, rough and smooth", "3-4",
  "Describe how materials feel and behave (hard, soft, rough, smooth, bendy, stretchy, wet, dry) and sort everyday objects by one of these",
  ["Sorts objects into soft and hard",
   "Uses at least four texture words",
   "Picks a soft material for a teddy's bed and says why"],
  "If {{name}} puts their hand in a feely bag, can they describe what they touch as rough, smooth, hard or soft?",
  [], [("ey_senses", "h", "Feeling materials uses the sense of touch")])

T("ey_melting", C, MM, "Melting and freezing", "4-5",
  "Watch ice melt in a warm place and water freeze in the freezer, and know that warming melts and cooling freezes",
  ["Says that ice turns into water when it gets warm",
   "Predicts that an ice lolly left in the sun will melt",
   "Helps freeze water into ice cubes and checks them later"],
  "If {{name}} leaves an ice cube on a plate, can they say what will happen and why?",
  [], [("ey_noticing_changes", "h", "Melting is a change they watch happen over time"),
       ("ey_materials_feel", "s", "They feel the difference between hard ice and runny water")])

T("ey_push_pull", C, FM, "Pushes and pulls in play", "3-4",
  "Make things move by pushing and pulling (a swing, a wagon, a door) and notice that a bigger push makes things go further or faster",
  ["Shows a push and a pull with a toy",
   "Says that a harder push made the ball roll further",
   "Uses push and pull to describe opening a door or drawer"],
  "When {{name}} plays with a toy car, can they show a gentle push and a strong push and say which made it go further?",
  [], [])

T("ey_ramps", P, FM, "Rolling things down slopes", "4-5",
  "Roll balls and cars down ramps, see that things roll faster on a steeper slope and that round things roll while flat things slide or stop",
  ["Builds a ramp with a board and books",
   "Finds that a steeper ramp makes the car go faster",
   "Sorts objects into ones that roll and ones that do not"],
  "If {{name}} props a board on some books, can they find out which toys roll down and whether a steeper ramp is faster?",
  [], [("ey_push_pull", "h", "A ramp gives a toy the push that starts it moving"),
       ("ey_will_it_happen", "s", "They guess which toy will roll furthest, then test it")])

T("ey_light_shadow", C, WL, "Light, dark and shadows", "4-5",
  "Notice that we need light to see, that the sun and lamps give light, and that a shadow appears when something blocks the light",
  ["Names a light source such as the sun, a torch or a lamp",
   "Makes a shadow with their hand or body",
   "Says the shadow is gone when the light is off"],
  "Using a torch in a dark room, can {{name}} make a shadow puppet and explain why it disappears when the torch goes off?",
  [], [("ey_senses", "h", "Seeing depends on light reaching their eyes")])

T("ey_weather", L, WC, "Weather and what to wear", "3-4",
  "Name kinds of weather (sunny, rainy, windy, snowy, cloudy, foggy), look out of the window to say what today is like, and choose suitable clothes",
  ["Names today's weather",
   "Chooses a coat and wellies for rain or a sun hat for sunshine",
   "Notices the wind moving leaves or the washing"],
  "Before going out, can {{name}} look outside, say what the weather is like and choose what to wear?",
  [], [("ey_senses", "s", "They look, listen and feel to tell what the weather is doing")])

T("ey_day_night", C, WC, "Day, night and the seasons", "4-5",
  "Know that it is light in the day and dark at night, that the sun rises and sets, and that the year has seasons with different weather (cold winter, warm summer)",
  ["Says what we see in the sky in the day and at night",
   "Orders morning, afternoon and night activities",
   "Matches a season to its weather or clothes"],
  "Can {{name}} tell you what they might see in the sky at night that they cannot see in the day, and what the weather is like in winter?",
  [], [("ey_weather", "h", "Seasons are described by the weather they bring"),
       ("ey_light_shadow", "s", "The sun gives the light that makes daytime")])
