"""Wave 8 (17 Nov 2026): new young (ages 2-11) English, Mathematics, Personal & Social Development and
Learning to Learn topics, so the lesson builder keeps its 2-of-3 young mix. Each fills a gap: no existing
topic or lesson covers it. English and Maths sit at ages 2-4 (below every v1 cluster); Personal & Social
and Learning to Learn use ages with no v1 cluster. Names use the curriculum terms (EYFS Phase 1 phonics,
EYFS Mathematics ELGs, PSHE Association, EEF metacognition guidance)."""

from dsl import T, U, C, P, R, L, M

PWR, RC, WC, SL = "Phonics & Word Reading", "Reading Comprehension", "Writing Composition", "Speaking & Listening"
CC, AS = "Counting & Cardinality", "Addition & Subtraction"
EM, SRR, FC, ESA, SA = "Emotional Literacy", "Self-Regulation & Resilience", "Friendship & Cooperation", "Empathy & Social Awareness", "Self-Awareness"
LL = "Learning to Learn"

# ---------------------------------------------------------------- English, ages 2-4 (Phase 1 phonics and early literacy)
T("y8_env_sounds", L, PWR, "Telling sounds apart", "2-3",
  "Listen for and tell apart everyday sounds (a dog barking, a tap running, a drum, a shaker): general sound discrimination, the first aspect of Phase 1 phonics, which trains the ear for the sounds in words later",
  ["Names the source of a familiar sound without seeing it",
   "Matches two shakers that make the same sound",
   "Says whether two sounds are the same or different"],
  "On a walk, can {{name}} close their eyes and tell you what made a sound they hear, such as a car, a bird or a door?",
  [], [("ey_senses", "s", "Exploring through the senses includes listening closely")])

T("y8_alliteration", L, PWR, "Same first sound (alliteration)", "3-4",
  "Hear that some words begin with the same sound (alliteration: 'big brown bear', 'silly snake'), pick the odd one out by its first sound, and make up a silly string of words that share one",
  ["Says which two words start with the same sound",
   "Finds the odd one out by first sound: sun, sock, dog",
   "Makes up a short alliterative phrase about a toy or friend"],
  "Can {{name}} tell you which of 'sock, sun, dog' starts with a different sound, and then think of another word that starts like 'sock'?",
  [], [("y8_env_sounds", "h", "Hearing the first sound in a word builds on telling sounds apart")])

T("y8_refrains", L, RC, "Joining in with repeated refrains", "2-3",
  "Join in with the repeated lines of a familiar story or rhyme ('Run, run, as fast as you can!', 'I'll huff and I'll puff'), saying the refrain at the right moment and predicting when it comes again",
  ["Says the repeated line when the reader pauses",
   "Knows when the refrain is about to come",
   "Uses the refrain in their own play"],
  "When you read a favourite story with a repeated line, does {{name}} say the line with you when you pause?",
  [], [("ey_copying", "s", "Joining in starts with watching and copying a grown-up")])

T("y8_picture_story", R, RC, "Telling a story from picture cards", "3-4",
  "Put three or four picture cards of a simple story in order and tell it using 'first', 'next', 'then' and 'last', noticing that the order changes what happens",
  ["Orders three picture cards of a familiar story",
   "Uses 'first', 'next' and 'last' when telling it",
   "Spots when two cards are in the wrong order"],
  "If you give {{name}} three pictures of making a sandwich or of a story they know, can they put them in order and tell you what happens first, next and last?",
  [], [("y8_refrains", "s", "Knowing a familiar story well helps put its parts in order")])

T("y8_mark_making", R, WC, "Giving meaning to marks", "3-4",
  "Make marks, scribbles and letter-like shapes and say what they mean ('this says Mummy', 'this is my shopping list'): early mark-making, the step before writing letters",
  ["Says what their marks mean",
   "Makes marks for a purpose, such as a list or a card",
   "Includes some letter-like shapes, often from their own name"],
  "When {{name}} draws or scribbles on a card, can they tell you what it says?",
  [], [("ey_copying", "s", "Children copy the writing they see grown-ups do")])

# ---------------------------------------------------------------- Mathematics, ages 3-4 (EYFS Number)
T("y8_estimate_count", C, CC, "Guessing how many, then counting", "3-4",
  "Make a sensible guess (estimate) of how many are in a small group, then count to check, and say whether the guess was 'a bit more' or 'a bit less'",
  ["Gives a sensible guess before counting",
   "Counts to check the guess",
   "Says whether the guess was close"],
  "Before {{name}} counts the grapes on their plate, can they guess how many there are, and then count to see how close they were?",
  [], [("ey_count_five", "h", "Checking an estimate needs reliable counting of small groups"),
       ("ey_subitising", "s", "Seeing small amounts at a glance is the start of estimating")])

T("y8_ordinal", C, CC, "First, second, third (ordinal numbers)", "4-5",
  "Use ordinal numbers (first, second, third ... tenth) to say position in a line or race, and see that ordinal position depends on where you start counting from",
  ["Says who came first, second and third in a race",
   "Points to the fifth bead on a string when asked",
   "Knows that 'third' is a place, while 'three' is how many"],
  "If five toys line up for a race, can {{name}} tell you which toy is first, which is third and which is last?",
  [], [("ey_count_five", "h", "Ordinal position needs counting objects in order"),
       ("ey_number_names", "h", "Ordinal words are said in the same order as the counting words")])

T("y8_doubles", C, AS, "Doubles to double 5", "4-5",
  "Know that doubling means two equal groups, and recall the doubles facts up to double 5 (double 3 is 6) using fingers, dice dots, ladybird spots and mirrors",
  ["Makes double 4 with two equal groups",
   "Recalls doubles up to double 5",
   "Explains that a double has two groups the same size"],
  "If a ladybird has 3 spots on one wing and the same on the other, can {{name}} tell you how many spots there are altogether?",
  [], [("ey_finger_numbers", "h", "Doubles are often shown on two hands"),
       ("ey_count_five", "h", "Checking a double means counting the total")])

T("y8_counting_on", P, AS, "Counting on to add", "4-5",
  "Add by holding the first number in your head and counting on from it ('five ... six, seven') instead of counting everything from one, starting from the bigger number",
  ["Counts on from the first number to add 1, 2 or 3",
   "Starts from the bigger number when adding",
   "Uses a number track to count on"],
  "If {{name}} has 5 cars and you give them 2 more, can they count on 'six, seven' instead of counting all the cars again?",
  [], [("ey_count_five", "h", "Counting on needs the counting sequence to start from any number"),
       ("ey_more_less", "s", "Comparing groups shows which number is bigger to start from")])

# ---------------------------------------------------------------- Personal & Social Development
T("y8_please_thanks", P, FC, "Saying please and thank you", "2-3",
  "Use 'please' when asking and 'thank you' when given something, with a grown-up's prompt at first, and notice how kind words make other people feel",
  ["Says 'please' when asking for something",
   "Says 'thank you' when given something",
   "Uses kind words in pretend play"],
  "At snack time, does {{name}} say 'please' when they ask for more and 'thank you' when they get it?",
  [], [("ey_play_together", "s", "Kind words are part of playing with others")])

T("y8_personal_space", C, ESA, "Personal space", "4-5",
  "Know that everyone has a bubble of personal space, notice when someone is too close or wants space, and ask before hugging or touching",
  ["Keeps a comfortable distance in a line or circle",
   "Asks 'Can I have a hug?' before hugging a friend",
   "Notices when someone steps back and gives them space"],
  "When {{name}} wants to hug a friend, do they ask first and stop if the friend says no?",
  [], [("ey_gentle_hands", "h", "Respecting personal space extends being gentle with others"),
       ("ey_noticing_upset", "s", "Noticing someone wants space uses the same face and body clues")])

T("y8_win_lose", P, SRR, "Winning and losing well", "6-7",
  "Play competitive games fairly: follow the rules, cope with losing without blaming or quitting, and win without boasting by saying 'good game'",
  ["Finishes a game they are losing",
   "Says 'good game' to the winner or loser",
   "Uses a calming strategy after losing"],
  "After {{name}} loses a board game, can they say 'good game' and play again rather than quitting or blaming someone?",
  [], [("mt_Iwg2diBSyW", "h", "Coping with losing uses simple calming strategies"),
       ("ey_sharing_turns", "h", "Fair games depend on taking turns")])

T("y8_gratitude", M, SA, "Noticing good things (gratitude)", "8-9",
  "Notice and name good things, big and small, and the people behind them, and see how a habit of gratitude can lift mood, without pretending bad feelings away",
  ["Names three good things from their day",
   "Says who helped make a good thing happen",
   "Explains that gratitude sits alongside other feelings"],
  "At bedtime, can {{name}} tell you three good things that happened today and who made one of them happen?",
  [], [("ey_i_can", "s", "Noticing what is good in life builds on talking about what they like"),
       ("mt_35-DhMh_Yr", "s", "Gratitude is a partner habit to positive self-talk")])

# ---------------------------------------------------------------- Learning to Learn
T("y8_worked_examples", M, LL, "Learning from worked examples", "7-9",
  "Study a worked example step by step, explain why each step is done, then try a similar problem with fewer steps shown (faded examples), instead of starting every new skill from scratch",
  ["Explains why each step in a worked example is done",
   "Spots the mistake in a worked example",
   "Solves a matching problem after studying the example"],
  "When {{name}} learns a new kind of sum, can they look at a worked example and explain why each step is there before trying one themselves?",
  [], [("pr_success_criteria", "h", "Worked examples show what a good answer looks like step by step"),
       ("mt_6eTZUwKQZr", "s", "Explaining each step is a form of teaching it back")])

T("y8_interleaving", M, LL, "Mixing up practice (interleaving)", "10-11",
  "Mix different kinds of problems in one practice session (interleaving) instead of doing a block of the same kind, so you practise choosing the method; it feels harder but helps more in tests",
  ["Explains the difference between blocked and mixed practice",
   "Plans a mixed practice set from three topics",
   "Says why mixed practice feels harder but works better"],
  "When {{name}} revises maths, can they explain why mixing up area, perimeter and fractions questions is better than doing twenty of one kind?",
  [], [("mt_q7zxOloj_L", "h", "Interleaving trains the choice of strategy"),
       ("y8_worked_examples", "s", "Mixed practice follows once each method has been learned from examples")])

# ---------------------------------------------------------------- foundation edges: v1 topics that build on these
for _k, _id, _s, _r in [
    ("y8_env_sounds", "mt_4GiE83rJF_", "s", "Hearing rhymes needs an ear for how sounds differ"),
    ("y8_alliteration", "mt_F978c32kDr", "h", "Linking a letter to a sound starts with hearing the first sound in a word"),
    ("y8_alliteration", "mt_PvU3eoikev", "s", "Splitting a word into onset and rime builds on hearing the first sound"),
    ("y8_refrains", "mt_8-POYyg7GJ", "s", "Predicting what happens next starts with knowing when a refrain comes"),
    ("y8_picture_story", "mt_VEwM7ClYYE", "s", "Story sequence builds on ordering picture cards"),
    ("y8_mark_making", "mt_WBfj79OqXz", "s", "Holding a pencil for writing follows early mark-making"),
    ("y8_mark_making", "mt_N8CpN1EJrP", "s", "Building sentences for writing builds on knowing marks carry a message"),
    ("y8_ordinal", "mt_-vvVxpOHG2", "s", "Ordering events uses first, next and last"),
    ("y8_doubles", "mt_7XcCG43ZZW", "s", "Splitting numbers into pairs includes the doubles"),
    ("y8_counting_on", "mt_OvyoRo47K-", "s", "Adding by combining groups gets faster with counting on"),
    ("y8_estimate_count", "mt_WcfaSfVT33", "s", "Estimating then checking gives a reason to count one-to-one"),
    ("y8_please_thanks", "mt_lAvS72LOUO", "s", "Everyday kindness includes using kind words"),
    ("y8_personal_space", "mt_OJVkWvIaM_", "s", "Noticing that people like different amounts of space is a difference to respect"),
]:
    U(_k, _id, _s, _r)
