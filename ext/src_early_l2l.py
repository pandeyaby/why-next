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


# ---------------------------------------------------------------- wave 7: Learning to Learn for ages 2-11
# EYFS Characteristics of Effective Learning (playing and exploring, active learning, creating and thinking critically)
# and recognised primary metacognition / learning-skills terms (rehearsal, chunking, success criteria, dual coding,
# mnemonics, thinking aloud, plan-monitor-evaluate).
from dsl import U  # noqa: E402

T("ey_play_what_know", M, LL, "Playing with what I know", "2-3",
  "Use pretend play to act out things they have seen (cooking, shopping, going to the doctor), using one object to stand for another",
  ["Acts out a familiar routine in pretend play",
   "Uses an object as something else, such as a block as a phone",
   "Copies words or actions from real life in play"],
  "When {{name}} plays shops or kitchens, do they act out what they have seen you do?",
  [], [("ey_copying", "s", "Pretend play replays what they have watched and copied")])

T("ey_own_ideas", M, LL, "Having my own ideas", "3-4",
  "Think of their own ideas in play and making (a new game, a different way to build a den) and try them out instead of only copying",
  ["Suggests a new game or rule",
   "Makes something in their own way",
   "Explains their idea to someone else"],
  "When {{name}} builds with blocks, do they come up with their own plan rather than copying one?",
  [], [("ey_play_what_know", "s", "Their own ideas grow out of playing with what they know")])

T("ey_choose_resources", M, LL, "Choosing resources for myself", "3-4",
  "Choose and fetch the things they need for an activity (paper and crayons for drawing, a spade for digging) and say why they chose them",
  ["Gets the right things for a task without being told",
   "Says why they chose a tool",
   "Puts things back after using them"],
  "If {{name}} wants to paint, can they gather what they need by themselves?",
  [], [("ey_two_steps", "s", "Fetching what they need is like following steps for themselves")])

T("ey_by_heart", P, LL, "Learning songs and rhymes by heart", "3-4",
  "Learn a nursery rhyme or song by heart by hearing and joining in with it many times, then say or sing it without help",
  ["Joins in the repeated parts of a rhyme",
   "Says a whole short rhyme without help",
   "Fills in the missing word when you pause"],
  "If you start 'Twinkle, Twinkle, Little Star' and stop, can {{name}} carry on by themselves?",
  [], [("ey_wait_listen", "s", "Learning by heart starts with listening carefully")])

T("pr_rehearsal", P, LL, "Saying it again to remember (rehearsal)", "5-6",
  "Remember a short list or fact by saying it over and over (rehearsal), and notice that something said several times is easier to recall",
  ["Repeats a short list to remember it",
   "Recalls a fact after rehearsing it",
   "Says that repeating helps them remember"],
  "If {{name}} needs to remember three things to fetch, do they say them over to themselves?",
  [], [("ey_by_heart", "h", "Rehearsal is the strategy behind learning rhymes by heart"),
       ("mt_M5PPDJStGm", "s", "Rote counting is rehearsal: saying a sequence again and again until it sticks")])

T("pr_chunking", P, LL, "Chunking to remember", "6-7",
  "Group items into small chunks to remember them (a phone number as 3-3-4, spellings in syllables), so the memory has fewer pieces to hold",
  ["Splits a long number into chunks to remember it",
   "Groups a list of things into sets",
   "Explains why chunks are easier to remember"],
  "If {{name}} needs to remember 6 4 9 2 7 1, can they split it into chunks to help?",
  [], [("pr_rehearsal", "h", "Chunking makes the rehearsed list shorter")])

T("pr_success_criteria", M, LL, "Knowing what good looks like (success criteria)", "6-7",
  "Use success criteria and a good example (WAGOLL: what a good one looks like) to know what they are aiming for and check their work against it",
  ["Says what a good piece of work needs before starting",
   "Points out features of a good example",
   "Ticks off success criteria in their own work"],
  "Before {{name}} writes a card, can they say what a good one needs and check theirs at the end?",
  [], [("ey_talk_about_learning", "s", "Talking about what went well becomes checking against criteria"),
       ("mt_8dstvf-KKb", "s", "Checking your own work is easier when you know what good looks like")])

T("pr_dual_coding", P, LL, "Drawing to help me think (dual coding)", "6-7",
  "Combine words and pictures (a quick sketch, a labelled diagram, a timeline) to understand and remember something better",
  ["Draws a quick picture to explain an idea",
   "Labels a simple diagram",
   "Uses a picture to remember something"],
  "After {{name}} learns how a seed grows, can they draw and label it to explain it to you?",
  [], [("ey_draw_observe", "s", "Drawing from observation becomes drawing to think"),
       ("mt_hi8cVycbwn", "s", "Sketching a simple model is a first use of drawing to explain")])

T("pr_mnemonics", P, LL, "Memory tricks (mnemonics)", "8-9",
  "Use mnemonics (a phrase, rhyme or acronym) to remember lists and spellings, such as 'Richard Of York Gave Battle In Vain' for the rainbow colours",
  ["Uses a known mnemonic correctly",
   "Makes up their own mnemonic for a list",
   "Says when a mnemonic helps and when it doesn't"],
  "Can {{name}} make up a silly sentence to remember the order of the planets?",
  [], [("pr_chunking", "s", "Mnemonics turn a list into one memorable chunk"),
       ("mt_32B7xjUPwF", "s", "A mnemonic links new items to words they already know")])

T("pr_think_aloud", M, LL, "Thinking aloud", "8-9",
  "Say their thinking out loud while solving a problem ('first I'll... that didn't work, so...') so they and others can spot where the thinking goes wrong",
  ["Talks through the steps while working",
   "Spots a mistake while thinking aloud",
   "Listens to someone else think aloud and follows the steps"],
  "When {{name}} is stuck on a puzzle, can they say out loud what they are trying and why?",
  [], [("mt_6eTZUwKQZr", "s", "Teaching it back is explaining after; thinking aloud explains during")])

T("pr_plan_monitor_evaluate", M, LL, "Plan, monitor, evaluate", "9-10",
  "Use the metacognitive cycle on a task: plan (what's the goal, which strategy), monitor (is it working, should I change), evaluate (how did it go, what next time)",
  ["Names the three stages and what each asks",
   "Changes strategy partway through when monitoring shows a problem",
   "Writes one thing to do differently next time"],
  "Before a homework task, can {{name}} say their plan, check halfway, and tell you afterwards how it went?",
  [], [("mt_QR3vxbN1o4", "h", "Planning a task is the first stage of the cycle"),
       ("mt_q7zxOloj_L", "s", "Choosing a strategy happens at the planning stage")])

T("pr_learning_styles_myth", C, LL, "Why 'learning styles' is a myth", "10-11",
  "Know that research does not support teaching to a 'visual, auditory or kinaesthetic' learning style, and that methods like words-plus-pictures and self-testing help everyone",
  ["Explains what the learning-styles claim says",
   "Says what the evidence found",
   "Names two methods that help all learners"],
  "If a quiz tells {{name}} they are a 'visual learner', can they explain why that may not be the best guide to how to study?",
  [], [("pr_dual_coding", "s", "Dual coding helps everyone, not only 'visual learners'"),
       ("mt_v5yDTWEiyQ", "s", "Reflecting on what helped is the evidence that matters")])

for _k, _id, _s, _r in [
    ("ey_play_what_know", "mt_32B7xjUPwF", "s", "Connecting new and old ideas builds on playing with what they know"),
    ("ey_own_ideas", "mt_LE7nFEwS12", "s", "Thinking before starting draws on having ideas of their own"),
    ("ey_choose_resources", "mt_QR3vxbN1o4", "s", "Planning a task includes deciding what you need"),
    ("ey_by_heart", "mt_wvcFlwOrDl", "s", "Rhymes and songs are early patterns to spot"),
]:
    U(_k, _id, _s, _r)
