"""Ages 2-4 (wave 6): early-years Mathematics."""

from dsl import T, C, P, R, L, M

SI, OL, MM, FM, WL, WC = "Scientific Inquiry", "Organisms & Life Processes", "Matter & Materials", "Forces & Motion", "Waves, Light & Sound", "Weather & Climate"
EM, SRR, FC, ESA, SA, RDM = "Emotional Literacy", "Self-Regulation & Resilience", "Friendship & Cooperation", "Empathy & Social Awareness", "Self-Awareness", "Responsible Decision-Making"
LL = "Learning to Learn"
CC, GE, ME, MT = "Counting & Cardinality", "Geometry", "Measurement", "Mathematical Thinking"

# ---------------------------------------------------------------- Mathematics, ages 2-4
T("ey_number_names", P, CC, "Saying number names in order", "2-3",
  "Join in with counting songs and rhymes and say the number names from one to five, then to ten, in order",
  ["Says numbers 1 to 5 in order",
   "Joins in counting rhymes such as 'Five Little Ducks'",
   "Begins to say numbers to 10"],
  "Can {{name}} count with you from one to five while climbing the stairs?",
  [], [])

T("ey_subitising", C, CC, "Seeing 1, 2 or 3 at a glance", "3-4",
  "Recognise small groups of one, two or three objects without counting (dots on a dice, birds on a fence) and say how many",
  ["Says how many in a group of up to 3 without counting",
   "Shows 2 or 3 fingers quickly",
   "Matches dice faces with 1, 2 or 3 dots"],
  "If you quickly show {{name}} three buttons, can they say 'three' without counting them one by one?",
  [], [("ey_number_names", "h", "They need the number names to say how many they see")])

T("ey_count_five", P, CC, "Counting up to five things", "3-4",
  "Count up to five objects by touching or moving each one once, and know that the last number said is how many there are",
  ["Counts 5 objects touching each once",
   "Says the last number as the total",
   "Gives you 'three spoons' when asked"],
  "If you ask {{name}} for three grapes, can they count out exactly three and tell you how many they have?",
  [], [("ey_number_names", "h", "Counting objects uses the number names in order"),
       ("ey_subitising", "s", "Seeing small groups at a glance helps them check their count")])

T("ey_finger_numbers", R, CC, "Showing numbers on fingers", "3-4",
  "Show amounts up to five (then ten) on fingers, in rhymes and when asked their age, and count fingers to check",
  ["Shows their age on fingers",
   "Holds up the right number of fingers for 1 to 5",
   "Counts fingers to check"],
  "Can {{name}} hold up four fingers and count them to show you?",
  [], [("ey_count_five", "h", "Showing a number on fingers needs one-to-one counting")])

T("ey_numerals", R, CC, "Matching numerals 1 to 5 to groups", "4-5",
  "Recognise the written numerals 1 to 5 (on doors, buses, birthday cards) and match each to a group with that many things",
  ["Names numerals 1 to 5",
   "Matches a numeral card to a group of objects",
   "Spots numerals in the world, such as on a door"],
  "If you show {{name}} the numeral 4, can they put four toys next to it?",
  [], [("ey_count_five", "h", "Matching a numeral to a group means counting the group"),
       ("ey_finger_numbers", "s", "Fingers give another way to show the amount a numeral means")])

T("ey_more_less", C, CC, "Which has more?", "3-4",
  "Compare two small groups by looking, matching or counting and say which has more, fewer or the same",
  ["Says which plate has more grapes",
   "Lines up two groups to compare them",
   "Makes two groups the same"],
  "If {{name}} and a friend each have some blocks, can they work out who has more?",
  [], [("ey_subitising", "s", "Small groups can be compared at a glance"),
       ("ey_count_five", "s", "Counting gives a sure way to compare")])

T("ey_shape_sorter", P, GE, "Fitting shapes into holes", "2-3",
  "Fit shapes into a shape sorter or inset puzzle by turning them until they match, noticing straight edges, corners and curves",
  ["Fits shapes into a shape sorter",
   "Turns a piece to make it fit",
   "Notices that a round shape can roll"],
  "Can {{name}} fit all the pieces into a shape sorter, turning them until they go in?",
  [], [])

T("ey_shape_names", L, GE, "Circles, squares and triangles", "3-4",
  "Name and find circles, squares, triangles and rectangles in pictures and around the home (a plate, a window, a sandwich cut in half)",
  ["Names circle, square and triangle",
   "Finds shapes around the house",
   "Says how many corners a triangle has"],
  "When you go for a walk, can {{name}} spot a circle and a triangle on signs or buildings?",
  [], [("ey_shape_sorter", "h", "Handling shapes comes before naming them")])

T("ey_building", P, GE, "Building towers and bridges", "3-4",
  "Build with blocks, choosing which shapes stack well, making towers, walls and bridges, and noticing that wide bases are steadier",
  ["Builds a tower of six or more blocks",
   "Makes a simple bridge with three blocks",
   "Says why the big block goes at the bottom"],
  "Can {{name}} build a bridge for a toy car to go under, using blocks?",
  [], [("ey_shape_sorter", "s", "Choosing blocks uses what they know about flat and round faces")])

T("ey_big_small", L, ME, "Big and small, long and short", "2-3",
  "Use size words (big, small, tall, short, long) to compare two things, and order three things by size",
  ["Says which is bigger of two objects",
   "Uses tall and short about people or towers",
   "Orders three bowls or teddies by size"],
  "Can {{name}} line up three teddies from smallest to biggest, like Goldilocks' bears?",
  [], [])

T("ey_heavy_light", C, ME, "Heavy and light, full and empty", "3-4",
  "Compare how heavy things feel by holding one in each hand, and fill and empty containers in water or sand play using full, empty and half full",
  ["Says which of two things is heavier",
   "Uses full and empty correctly",
   "Fills a cup to the top"],
  "If {{name}} holds a book in one hand and a feather in the other, can they say which is heavier?",
  [], [("ey_big_small", "h", "Comparing weight and capacity extends the language of comparing size")])

T("ey_matching", P, MT, "Matching pairs", "2-3",
  "Find two things that are the same (socks, picture cards, shoes) and explain how they match",
  ["Matches pairs of socks",
   "Plays a simple picture matching game",
   "Says 'same' about a matching pair"],
  "When you sort the washing, can {{name}} find the sock that matches?",
  [], [])

T("ey_sorting", P, MT, "Sorting by colour, size and shape", "3-4",
  "Sort objects into groups by one feature (colour, size, shape or kind) and say how they sorted",
  ["Sorts objects by colour",
   "Sorts by a different rule when asked",
   "Says the rule they used"],
  "Can {{name}} sort a pile of buttons into colours and tell you how they did it?",
  [], [("ey_matching", "h", "Sorting groups things that are the same in one way")])

T("ey_patterns", P, MT, "Copying and making patterns", "3-4",
  "Notice repeating patterns (red, blue, red, blue; clap, stamp, clap, stamp), copy them, continue them and make their own",
  ["Continues a two-colour bead pattern",
   "Copies a clapping pattern",
   "Makes their own repeating pattern"],
  "If you start a pattern of red, blue, red, blue bricks, can {{name}} say what comes next?",
  [], [("ey_sorting", "s", "Patterns repeat the same kinds of objects in turn")])
