"""Wave 11 (20 Nov 2026), Learning to Learn part: new young (ages 6-11) strategies
not already in the 2-11 graph, so the lesson builder has a young Learning to Learn
queue again. Each fills a gap: no existing topic or lesson teaches it. Names use
EEF Metacognition and self-regulated learning 2021, CPA, cognitive load and
deliberate practice."""

from dsl import T, U, C, P, R, L, M

LL = "Learning to Learn"

# ---------------------------------------------------------------- Learning to Learn (strategies not already in the 2-11 graph)
T("y11_cpa", R, LL, "Concrete, then pictures, then symbols", "6-8",
  "Learn a new idea in three steps: first with things you can move (blocks, counters, coins), then with a drawing or diagram of those things, then with the written symbols or numbers, and go back a step when the symbols are not yet clear",
  ["Shows a new idea with objects before writing it",
   "Draws a picture that stands for the same idea",
   "Goes back to objects or a drawing when the symbols are confusing"],
  "When {{name}} meets a new kind of sum or fraction, can they show it with objects, then draw it, and only then write the symbols?",
  [], [("ey_practice", "h", "Moving from objects to pictures to symbols is a way of practising a new idea in steps"),
       ("pr_dual_coding", "s", "A drawing that stands for the objects is the middle step")])

T("y11_warmup", P, LL, "A quick look back at yesterday", "6-8",
  "Start a practice session with a short look back at yesterday's work (two or three questions or facts, from memory first), then go on to today's new work, so yesterday's learning is warmed up rather than left behind",
  ["Begins practice with a short look back, not with the new work",
   "Tries the look-back questions from memory first",
   "Says why a short look back helps before new work"],
  "Before {{name}} starts today's practice, can they try two questions from yesterday from memory, then begin the new work?",
  [], [("ey_practice", "h", "A look back only helps if yesterday was practised"),
       ("ey_routines", "s", "A short look back is a routine that comes first, like other 'what comes next' habits"),
       ("mt_8dstvf-KKb", "s", "Looking back at yesterday's work is the same habit as checking your own work, applied to the last session") ])

T("y11_guided", P, LL, "I do, we do, you do", "6-8",
  "Learn a new skill in three rounds: first watch a grown-up do it and listen to each step (I do), then do it together, taking turns on the steps (we do), then try one alone while the grown-up stays nearby (you do), instead of being asked to work alone after a single demonstration",
  ["Watches a full demonstration and names a step they saw",
   "Shares the steps with a grown-up on a second go",
   "Tries the next one alone, asking for a hint only if stuck"],
  "When {{name}} learns a new skill, can they watch you do it, then do one with you, and then try the next one on their own?",
  [], [("ey_copying", "h", "Watching a grown-up do it first is the 'I do' step"),
       ("ey_having_a_go", "h", "The 'you do' step is a supported go at something new"),
       ("mt_LE7nFEwS12", "s", "The 'you do' step still needs a moment of thinking before starting on your own") ])

T("y11_think_pair", P, LL, "Think, pair, share", "6-7",
  "When asked a thinking question, use three beats: a short quiet think of their own, a talk with a partner to compare ideas, then a share with the group, so they have an idea ready instead of going blank when asked first",
  ["Uses a quiet think before talking",
   "Shares their idea with a partner and listens to the partner's idea",
   "Offers an idea to the group after the partner talk"],
  "When you ask {{name}} a thinking question, can they have a quiet think, talk it over with a partner, and then share an idea with you?",
  [], [("ey_having_a_go", "s", "Having a think of their own is a kind of having a go"),
       ("ey_own_ideas", "h", "The quiet think is time for their own idea before they hear someone else's"),
       ("mt_n6GhzDPllD", "s", "Talking the idea over with a partner is exploring ideas through talk") ])

T("y11_read_question", P, LL, "What is this question asking me?", "7-9",
  "Before starting an answer, read the question twice, mark the thing it is asking for (how many, why, which one, show your working), and say the ask in their own words, so they do not jump into a method that answers a different question",
  ["Reads a question twice before writing an answer",
   "Marks or says the thing the question is asking for",
   "Puts the ask in their own words before choosing a method"],
  "When {{name}} gets a worded question, can they read it twice, tell you what it is asking for, and only then start the working?",
  [], [("mt_LE7nFEwS12", "h", "Reading the question carefully is how thinking before starting looks on a written task"),
       ("pr_success_criteria", "s", "Knowing what a good answer must include starts with knowing what was asked")])

T("y11_jot", P, LL, "Jot it down so I don't have to hold it", "8-10",
  "When a problem has several facts or steps, jot down the numbers, names and in-between results instead of trying to hold them all in your head, so working memory is free to think about the next step",
  ["Jots down the facts from a multi-step problem before solving it",
   "Writes an in-between result instead of holding it in their head",
   "Says why writing it down helps when there are several things to remember"],
  "If a problem gives {{name}} several numbers and steps, do they jot the facts and in-between results down rather than trying to hold them all in their head?",
  [], [("pr_chunking", "h", "Jotting groups the facts so they do not all have to be held at once"),
       ("pr_dual_coding", "s", "A quick sketch or written note is another way of getting an idea out of your head and onto the page")])

T("y11_own_example", M, LL, "Making my own example of a new idea", "8-9",
  "After meeting a new idea, make up one fresh example of their own (not a copy of the one just taught), then check it still fits the rule, as a test of whether they understand rather than of whether they can repeat the given example",
  ["Invent a new example that is not a copy of the taught one",
   "Checks the new example against the rule or definition",
   "Fixes an example that does not actually fit"],
  "After {{name}} is taught a new idea such as 'even number' or 'noun', can they make up a new example of their own and check it still fits?",
  [], [("y10_examples", "h", "Making your own example comes after you can tell examples from non-examples"),
       ("y8_worked_examples", "s", "The taught example is the model; a new one of your own is the test")])

T("y11_sleep_learn", C, LL, "Sleep helps learning", "8-9",
  "Know that sleep helps the brain store what was practised, so a good night's sleep after learning beats staying up late to do more of the same, and plan practice to finish in time for bed rather than treating sleep as lost study time",
  ["Says that sleep helps the brain keep what was practised",
   "Chooses sleep over extra late practice when both are offered",
   "Plans a practice time that leaves room for a regular bedtime"],
  "If {{name}} has practised and it is getting late, can they tell you why going to sleep now can help tomorrow more than doing one more page?",
  [], [("ey_practice", "h", "Sleep stores practice; it does not replace it"),
       ("ey_growing_body", "s", "Knowing the body needs sleep is the start of knowing the brain uses it to store learning"),
       ("mt_nNDX_jZ-cb", "s", "Choosing sleep over one more late page is patience and delayed gratification applied to practice") ])

T("y11_one_thing", M, LL, "One new thing at a time", "9-11",
  "When something feels too much, reduce what is new: practise one new idea at a time, keep the already-known parts easy, and add the next new thing only once the first one is fluent, instead of changing several things at once",
  ["Spots when a task has more than one new thing in it",
   "Strips a practice set back to one new idea, with the rest already known",
   "Adds a second new thing only after the first is fluent"],
  "If a practice page mixes a new method with new facts and a new layout, can {{name}} say it is too much at once and suggest practising just the new method first?",
  [], [("ey_tricky", "h", "Noticing that something feels too much is the cue to reduce what is new"),
       ("pr_chunking", "s", "One new thing at a time is chunking the learning, not only the items to remember")])

T("y11_hard_part", P, LL, "Practise the part I find hard", "10-11",
  "After a practice set or a test, find the questions or steps that were wrong or slow, and spend the next practice on those parts rather than repeating the parts already fluent, so practice time goes to the bit that will move learning on",
  ["Marks the questions or steps they got wrong or found slow",
   "Plans the next practice from those harder parts, not from the easy ones",
   "Explains why repeating only the easy parts wastes practice time"],
  "After a practice set, can {{name}} point to the questions they found hard and plan to practise those next, rather than doing more of the ones they already get right?",
  [], [("ey_tricky", "h", "Noticing which part is tricky is how you choose what to practise"),
       ("mt_q7zxOloj_L", "s", "Choosing the hard part is a kind of choosing a strategy for the next practice")])

