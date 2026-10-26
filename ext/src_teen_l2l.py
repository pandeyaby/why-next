"""Ages 11-18 (wave 6): secondary Learning to Learn."""

from dsl import T, C, P, R, L, M

RC, WCO, SL, VO, ET = "Reading Comprehension", "Writing Composition", "Speaking & Listening", "Vocabulary", "English Thinking"
LL = "Learning to Learn"
EM, SRR, FC, ESA, SA, RDM = "Emotional Literacy", "Self-Regulation & Resilience", "Friendship & Cooperation", "Empathy & Social Awareness", "Self-Awareness", "Responsible Decision-Making"

# ---------------------------------------------------------------- Learning to Learn, ages 11-14
T("tn_memory_works", C, LL, "How memory works", "11-12",
  "Understand in simple terms how memory works: working memory is small, long-term memory is large, forgetting is normal, and remembering is strengthened by recalling and connecting ideas",
  ["Explains the difference between working and long-term memory",
   "Describes the forgetting curve",
   "Says why re-reading feels useful but often is not"],
  "Can {{name}} explain why they might forget a lesson by next week and what would help them remember it?",
  [], [("mt_32B7xjUPwF", "h", "Connecting new and old ideas is how long-term memory is built"),
       ("mt_v5yDTWEiyQ", "s", "Reflecting after learning shows what has been remembered")])

T("tn_retrieval", P, LL, "Testing yourself: retrieval practice", "11-12",
  "Use retrieval practice — flashcards, quizzes, brain dumps, answering questions from memory — instead of re-reading, and check answers to fix gaps",
  ["Makes and uses flashcards with questions on one side",
   "Does a brain dump and checks it against notes",
   "Explains why testing yourself beats re-reading"],
  "When {{name}} revises for a test, do they test themselves from memory rather than just reading their notes again?",
  [], [("tn_memory_works", "h", "Retrieval works because recalling strengthens long-term memory")])

T("tn_spacing", P, LL, "Spacing out practice", "11-12",
  "Plan study in short sessions spread over days and weeks rather than cramming, revisiting topics just as they begin to be forgotten",
  ["Makes a simple spaced revision timetable",
   "Explains why cramming fades quickly",
   "Revisits older topics alongside new ones"],
  "If {{name}} has a test in two weeks, can they plan short sessions spread across the fortnight instead of one long night before?",
  [], [("tn_memory_works", "h", "Spacing uses the forgetting curve to time reviews"),
       ("tn_retrieval", "s", "Each spaced session works best as self-testing")])

T("tn_note_taking", P, LL, "Taking useful notes", "11-12",
  "Take notes that help later learning — in their own words, with headings, abbreviations and questions (e.g. Cornell notes) — rather than copying everything",
  ["Writes notes in their own words",
   "Uses headings and a summary",
   "Adds questions to test themselves later"],
  "After a lesson, can {{name}} show notes that summarise key ideas in their own words with questions to test themselves?",
  [], [("mt_dRLP8g0SAg", "h", "Study notes build on research and note-taking"),
       ("mt_XnRhhEqJLJ", "s", "Good notes summarise main ideas")])

T("tn_organising", P, LL, "Organising homework and deadlines", "11-12",
  "Keep track of homework and deadlines with a planner or app, break tasks into steps, estimate time and start early",
  ["Records every homework task with its deadline",
   "Breaks a project into dated steps",
   "Starts a task before the night before it is due"],
  "With three homework tasks due on different days, can {{name}} plan when to do each so none is rushed?",
  [], [("mt_QR3vxbN1o4", "h", "Organising homework extends planning a task"),
       ("mt_HoJGVsMO7H", "h", "It uses time and attention management")])

T("tn_feedback_use", M, LL, "Using feedback to improve", "11-13",
  "Read teacher feedback carefully, identify the one or two most important targets, and act on them in the next piece of work",
  ["Restates feedback as a specific action",
   "Redrafts or corrects work using feedback",
   "Tracks targets across pieces of work"],
  "When {{name}} gets marked work back, can they say exactly what to do differently next time and show it in the next piece?",
  [], [("mt_TDUpy57QVM", "h", "Using feedback builds on learning from mistakes"),
       ("mt_33zncDHC3N", "s", "Receiving feedback well is a social skill too")])

T("tn_study_reading", P, LL, "Reading to study: skim, scan, question", "11-13",
  "Read textbooks and articles actively: skim for the gist, scan for facts, ask questions before reading and summarise after each section",
  ["Skims headings and summary before reading",
   "Scans to find a specific fact quickly",
   "Summarises each section in one sentence"],
  "Given a textbook chapter, can {{name}} skim it, then find a specific fact quickly and summarise each section?",
  [], [("mt_oVwNnjYPUY", "h", "Study reading uses the structure of information texts"),
       ("tn_note_taking", "s", "Summaries from reading become notes")])

# ---------------------------------------------------------------- Learning to Learn, ages 14-16
T("tn_interleaving", P, LL, "Mixing up practice: interleaving", "14-15",
  "Mix different types of problems or topics in one practice session so they learn to choose the right method, rather than doing blocks of the same thing",
  ["Builds a mixed practice set from several topics",
   "Explains why mixed practice feels harder but works better",
   "Identifies which method a problem needs before solving it"],
  "When {{name}} practises maths, do they mix different topics so they must decide which method each question needs?",
  [], [("tn_spacing", "h", "Interleaving naturally spaces practice of each topic"),
       ("mt_q7zxOloj_L", "h", "Interleaving trains choosing a strategy")])

T("tn_elaboration", P, LL, "Explaining and connecting: elaboration and concept maps", "14-15",
  "Deepen understanding by asking how and why questions, explaining ideas in their own words and drawing concept maps that link ideas together",
  ["Draws a concept map linking ten ideas with labelled arrows",
   "Answers 'why does this work?' about a topic",
   "Uses examples and diagrams alongside words (dual coding)"],
  "Can {{name}} draw a concept map of a science topic and explain why each link is there?",
  [], [("mt_6eTZUwKQZr", "h", "Elaboration builds on teaching it back"),
       ("mt_Y6P9y1Rz-u", "h", "It deepens understanding why")])

T("tn_metacognition", M, LL, "Monitoring your own understanding", "14-15",
  "Plan, monitor and evaluate their own learning: predict how well they know something, check it honestly, and adjust strategy",
  ["Rates confidence before a quiz and compares with the score",
   "Spots the 'illusion of knowing' after re-reading",
   "Changes a strategy when it is not working"],
  "Before a quiz, can {{name}} predict which questions they will get wrong, and do they change how they study when the prediction is off?",
  [], [("mt_2uHYdoxD0H", "h", "Monitoring understanding extends finding knowledge gaps"),
       ("tn_retrieval", "h", "Self-testing gives honest evidence of what is known")])

T("tn_revision_plan", P, LL, "Planning revision for exams", "14-16",
  "Plan revision for a full set of exams: list topics, rate confidence, schedule spaced and interleaved sessions, build in rest, and adjust the plan weekly",
  ["Makes a revision timetable for all subjects",
   "Prioritises weaker topics using confidence ratings",
   "Reviews and adjusts the plan each week"],
  "Six weeks before exams, can {{name}} produce a realistic revision plan that prioritises their weakest topics and includes rest?",
  [], [("tn_spacing", "h", "A revision plan schedules spaced practice"),
       ("tn_metacognition", "h", "Prioritising needs honest judgement of what is known"),
       ("tn_organising", "s", "It scales up organising homework and deadlines")])

T("tn_exam_technique", P, LL, "Exam technique: command words and timing", "14-16",
  "Read exam questions carefully, interpret command words (describe, explain, evaluate, compare), plan answers for the marks available, and manage time across a paper",
  ["Explains the difference between describe, explain and evaluate",
   "Allocates time by marks",
   "Uses past papers and mark schemes to improve"],
  "Can {{name}} explain how an 'evaluate' question needs a different answer from a 'describe' question and plan time for a two-hour paper?",
  [], [("tn_revision_plan", "s", "Past-paper practice is part of revision"),
       ("mt_8dstvf-KKb", "h", "Checking your own work is part of exam technique")])

T("tn_distractions", P, LL, "Managing phones and distractions", "14-15",
  "Notice how phones, notifications and multitasking affect focus, and set up study conditions (phone away, timer blocks, single-tasking) that protect attention",
  ["Describes the cost of switching between tasks",
   "Uses a focus technique such as 25-minute blocks",
   "Studies with the phone out of reach"],
  "When {{name}} does homework, do they put their phone away and work in focused blocks?",
  [], [("mt_HoJGVsMO7H", "h", "This builds on time and attention management")])

T("tn_calibration", M, LL, "Knowing what you don't know", "14-16",
  "Judge how confident to be in an answer, recognise overconfidence, and use doubt productively by checking, asking or looking up rather than guessing",
  ["Gives confidence ratings that match accuracy over time",
   "Recognises overconfidence in their own work",
   "Checks or asks when confidence is low"],
  "Over several quizzes, does {{name}}'s confidence match how often they're right, and do they check when unsure?",
  [], [("tn_metacognition", "h", "Calibration sharpens monitoring of understanding")])

# ---------------------------------------------------------------- Learning to Learn, ages 16-18
T("tn_independent_study", M, LL, "Independent study", "16-17",
  "Study independently beyond lessons: set their own goals, find and use resources, read ahead and consolidate without being told",
  ["Sets weekly independent study goals",
   "Finds extra resources for a topic",
   "Reviews progress against their goals"],
  "Without being told, does {{name}} plan extra study each week, find resources and check their progress?",
  [], [("mt_jIszRCO2ij", "h", "Independent study begins with setting learning goals"),
       ("tn_metacognition", "h", "Independent learners monitor their own understanding")])

T("tn_deliberate_practice", P, LL, "Deliberate practice", "16-17",
  "Improve a skill through deliberate practice: focus on specific weaknesses at the edge of ability, get fast feedback, and repeat with full attention",
  ["Identifies a precise sub-skill to improve",
   "Designs a practice routine with feedback",
   "Measures improvement over time"],
  "If {{name}} wants to get better at essay introductions, can they design practice that targets that skill and gets feedback?",
  [], [("tn_feedback_use", "h", "Deliberate practice depends on using feedback"),
       ("tn_interleaving", "s", "Practice design draws on spacing and interleaving")])

T("tn_long_project", P, LL, "Managing a long project", "16-18",
  "Manage a project lasting weeks or months (an extended essay, coursework, a portfolio): set milestones, keep a log, handle setbacks and finish on time",
  ["Breaks a project into milestones with dates",
   "Keeps a project log",
   "Adjusts the plan after a setback"],
  "Could {{name}} plan and complete a three-month coursework project, keeping to their own milestones?",
  [], [("tn_organising", "h", "Projects scale up organising tasks and deadlines"),
       ("tn_independent_study", "h", "Long projects need independent study habits")])

T("tn_ai_help", M, LL, "Using help wisely, including AI tools", "16-17",
  "Choose and judge sources of help — teachers, peers, textbooks, videos, AI chatbots — using them to understand rather than to avoid thinking, and checking their answers",
  ["Explains when help supports learning and when it replaces it",
   "Checks an AI answer against a reliable source",
   "Follows their school's rules on using AI"],
  "If {{name}} asks an AI tool about a homework question, do they check its answer and make sure they could do the next one themselves?",
  [], [("mt_mvXufozy2s", "h", "Using help wisely builds on asking for help"),
       ("tn_calibration", "s", "Judging help needs a sense of how reliable an answer is")])

T("tn_lectures", P, LL, "Learning from lectures and seminars", "16-18",
  "Prepare for and learn from lectures and seminars: pre-read, take selective notes, contribute in discussion and review notes within a day",
  ["Pre-reads before a lecture",
   "Takes selective notes on the main argument",
   "Contributes to a seminar discussion"],
  "At a university taster lecture, can {{name}} take notes on the main argument and review them the next day?",
  [], [("tn_note_taking", "h", "Lecture notes build on taking useful notes"),
       ("mt_LNYTNpJOGT", "s", "Seminars use discussion skills")])

T("tn_learning_identity", M, LL, "Reflecting on how you learn best", "16-18",
  "Reflect on evidence about which strategies work for them, tell myths (learning styles) from well-supported research, and build a personal learning plan for life after school",
  ["Explains why learning styles are a myth",
   "Names the strategies with best evidence",
   "Writes a personal learning plan for next year"],
  "Can {{name}} explain which study strategies work best for them, with evidence, and why 'I'm a visual learner' is a myth?",
  [], [("tn_metacognition", "h", "Reflection needs metacognitive habits"),
       ("tn_elaboration", "s", "It draws together strategies such as elaboration and retrieval")])
