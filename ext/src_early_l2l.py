"""Ages 2-4 (wave 6): early-years Learning to Learn."""

from dsl import T, C, P, R, L, M

SI, OL, MM, FM, WL, WC = "Scientific Inquiry", "Organisms & Life Processes", "Matter & Materials", "Forces & Motion", "Waves, Light & Sound", "Weather & Climate"
EM, SRR, FC, ESA, SA, RDM = "Emotional Literacy", "Self-Regulation & Resilience", "Friendship & Cooperation", "Empathy & Social Awareness", "Self-Awareness", "Responsible Decision-Making"
LL = "Learning to Learn"
CC, GE, ME, MT = "Counting & Cardinality", "Geometry", "Measurement", "Mathematical Thinking"

# ---------------------------------------------------------------- Learning to Learn, ages 2-4
T("ey_paying_attention", M, LL, "Paying attention to one thing", "2-3",
  "Focus on one activity for a few minutes (a story, a puzzle, stacking cups), and bring attention back after a distraction with help",
  ["Listens to a short story to the end",
   "Stays with a puzzle for a few minutes",
   "Returns to an activity after being distracted"],
  "Can {{name}} sit with you for a whole short picture book, looking and listening?",
  [], [])

T("ey_copying", P, LL, "Learning by watching and copying", "2-3",
  "Learn new skills by watching someone else and copying them (actions to a song, stirring, stacking blocks, wiping a table)",
  ["Copies a grown-up's actions in a song",
   "Imitates a simple task after watching",
   "Watches carefully before having a go"],
  "If you show {{name}} how to stack three cups, do they watch and then copy you?",
  [], [("ey_paying_attention", "h", "Copying needs them to watch closely first")])

T("ey_two_steps", P, LL, "Following two-step instructions", "3-4",
  "Listen to and carry out an instruction with two parts ('get your shoes and bring them to the door'), holding both parts in mind",
  ["Completes a two-part instruction",
   "Asks for the instruction again if they forget",
   "Repeats the steps back in their own words"],
  "If you ask {{name}} to 'put your cup in the sink and then fetch your coat', can they do both?",
  [], [("ey_paying_attention", "h", "Holding two steps in mind needs focused listening")])

T("ey_having_a_go", M, LL, "Having a go at something new", "3-4",
  "Be willing to try something new or tricky (a new food, a climbing frame, painting) and see mistakes as part of learning",
  ["Tries a new activity when encouraged",
   "Says 'I'll have a go'",
   "Keeps trying after a small mistake"],
  "When {{name}} sees a new climbing frame, do they have a go at it, even if carefully?",
  [], [("ey_copying", "s", "Watching someone else try first can give the confidence to start")])

T("ey_asking_questions", M, LL, "Asking questions to find out", "3-4",
  "Ask a grown-up or friend questions to learn something (what is that called? how do you do it?) and listen to the answer",
  ["Asks what something is called",
   "Asks how to do something they cannot yet do",
   "Listens to the answer and tries it"],
  "When {{name}} doesn't know how something works, do they ask you a question and then try what you suggest?",
  [], [("ey_paying_attention", "s", "Listening to the answer needs attention")])

T("ey_finishing", M, LL, "Sticking with it until it's finished", "3-4",
  "Choose an activity and keep going until it is done (a jigsaw, a drawing, a tower), feeling proud of finishing",
  ["Finishes a short jigsaw or drawing",
   "Says 'I'm finished' and shows it",
   "Comes back to finish something they started"],
  "Does {{name}} keep going with a jigsaw until the last piece is in, and then show you proudly?",
  [], [("ey_paying_attention", "h", "Finishing needs them to keep their attention on one task")])

T("ey_routines", P, LL, "Remembering what comes next", "3-4",
  "Remember the steps of familiar routines (wash hands, dry hands, sit for snack; coat, shoes, door) and do them with fewer reminders",
  ["Says what comes next in a daily routine",
   "Follows a picture routine on the wall",
   "Notices when a step is missed"],
  "At bedtime, can {{name}} tell you what comes after bath and pyjamas?",
  [], [("ey_two_steps", "h", "A routine is a longer chain of steps held in memory")])

T("ey_practice", C, LL, "Getting better with practice", "4-5",
  "Notice that doing something again and again makes it easier (pedalling, cutting with scissors, writing their name) and choose to practise",
  ["Says something used to be hard but now is easy",
   "Chooses to practise a skill",
   "Compares a first try with a later try"],
  "Can {{name}} tell you something they couldn't do before but can do now because they kept practising?",
  [], [("ey_having_a_go", "h", "Practice starts with being willing to have a go"),
       ("ey_finishing", "s", "Sticking with a task gives them the repeats that build skill")])

T("ey_tricky", M, LL, "Noticing when something is tricky", "4-5",
  "Recognise and say when a task is hard ('this is tricky'), and choose what to do: slow down, try again or ask for help",
  ["Says 'this is tricky' or 'I'm stuck'",
   "Chooses between trying again and asking for help",
   "Slows down when a task is hard"],
  "When a puzzle gets hard, can {{name}} say 'this is tricky' and decide what to do next?",
  [], [("ey_having_a_go", "h", "Noticing difficulty happens while having a go"),
       ("ey_asking_questions", "s", "Asking for help is one choice when it is tricky")])

T("ey_different_way", M, LL, "Trying a different way", "4-5",
  "When something isn't working, try a different way (turn the puzzle piece, use a bigger block at the bottom, hold the cup with two hands)",
  ["Turns or swaps a piece that will not fit",
   "Changes how they build after a tower falls",
   "Says 'let me try another way'"],
  "If {{name}}'s tower keeps falling, do they try putting the big blocks at the bottom?",
  [], [("ey_tricky", "h", "They change approach once they notice the first way is tricky")])

T("ey_plan_play", M, LL, "Making a simple plan for play", "4-5",
  "Say what they are going to make or do before starting ('I'm going to build a house for teddy'), gather what they need and check at the end",
  ["Says their plan before starting",
   "Collects the things they need",
   "Compares what they made with their plan"],
  "Before {{name}} starts building, can they tell you what they plan to make and what they will need?",
  [], [("ey_routines", "s", "A plan is a short sequence of steps, like a routine"),
       ("ey_finishing", "h", "Checking against a plan means finishing what they started")])

T("ey_talk_about_learning", M, LL, "Talking about what I did and learned", "4-5",
  "Describe what they did during an activity and one thing they found out or got better at ('I found out the big ball rolls further')",
  ["Tells a grown-up what they did",
   "Says one thing they found out",
   "Says what they would do next time"],
  "At the end of the day, can {{name}} tell you one thing they found out or got better at?",
  [], [("ey_practice", "s", "Noticing that they got better gives them something to talk about"),
       ("ey_plan_play", "s", "Comparing what they did with their plan prompts reflection")])

T("ey_wait_listen", M, LL, "Listening carefully to learn", "3-4",
  "Stop, look at the person speaking and listen when a grown-up explains or reads, and show they listened by answering a simple question",
  ["Stops and looks at the speaker when called",
   "Answers a simple question about what they heard",
   "Waits until the speaker has finished"],
  "After you read {{name}} a short story, can they answer a simple question about it?",
  [], [("ey_paying_attention", "h", "Listening to learn is paying attention to speech")])
