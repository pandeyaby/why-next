"""Wave 24 (25 Nov 2026): one new young English topic for ages 4-5, because English was due after two Science lessons,
every young v1 English topic without a lesson already overlaps an existing lesson, and new English topics cannot start
at ages 5-10 (v1 already has cluster summaries there). It fills a gap, checked against lesson titles, key ideas, kid
text and labs on 25 Nov 2026:
- Answering why questions with because (English, Speaking & Listening 4-5): 'Talking about a story I know'
  (ages 3-4) answers who, what and where questions only; 'Question Words' (ages 6+) names why
  among six written question words with a question mark; 'Understanding Why' (Learning to Learn, older) is about
  knowing why a fact is true; 'Giving clear instructions' explains how to do a job; 'Joining Words with And' joins two
  ideas with and. No lesson teaches a young child to hear that a why question asks for a reason, to answer it with
  'because' plus the real cause they can see ('The ice cream melted because the sun was hot'), to tell a reason from a
  non-reason ('because I said so', 'because it did'), to say a reason the right way round (the cause after because, not
  the result), or to link two ideas into one spoken sentence with because. DfE Development Matters (2021): ages 3-4
  Communication and Language 'understand why questions, like: Why do you think the caterpillar got so fat?'; Reception
  'connect one idea or action to another using a range of connectives' and 'use talk to ... explain how things work and
  why they might happen'; EYFS Statutory Framework (2024) ELG Speaking ('offer explanations for why things might
  happen, making use of recently introduced vocabulary'); Blank, Rose and Berlin (1978) Preschool Language Assessment
  Instrument levels of questioning (why questions are level 4, reasoning about perceptions)."""

from dsl import T, U, L

SL = "Speaking & Listening"

# ---------------------------------------------------------------- English, ages 4-5 (Reception speaking: explaining why)
T("y24_why_because", L, SL, "Answering why questions with because", "4-5",
  "Answer why questions with a reason: hear that a why question asks for the reason something happened, not what or where; answer with 'because' and the real cause you can see or know ('The ice cream melted because the sun was hot'); tell a real reason from a non-reason such as 'because I said so' or 'because it did'; put the cause after because, not the result ('The puddle is there because it rained', not 'It rained because the puddle is there'); and join two ideas into one spoken sentence with because",
  ["Answers a why question about a picture with 'because' and a real reason",
   "Says whether 'because it did' is a real reason, and gives a better one",
   "Joins two ideas with because the right way round, such as 'The dog is wet because it jumped in the pond'"],
  "Play 'I wonder why' on a walk: point at a puddle, a fallen leaf or a muddy boot and ask {{name}} 'Why is it like that?'. Help them start with 'because' and give the reason they can see. Then swap: they ask you a why question.",
  [], [("y11_talk_story", "s", "Answering who, what and where questions about a known story comes before answering why questions"),
       ("y22_give_instructions", "s", "Explaining how to do a job and explaining why something happened both use talk to organise thinking")])

# ---------------------------------------------------------------- foundation edge: a v1 topic that builds on it
U("y24_why_because", "mt_6lHBTwQPrS", "s", "Spoken why-and-because answers come before naming why as a written question word that wants a reason")
