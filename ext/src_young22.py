"""Wave 22 (25 Nov 2026): one new young English topic for ages 4-5, because English was due, every young v1 English
topic without a lesson already overlaps an existing lesson, and new English topics cannot start at ages 5-10 (v1
already has cluster summaries there). It fills a gap, checked against lesson titles, key ideas, kid text and labs on
25 Nov 2026:
- Giving clear instructions (English, Speaking & Listening 4-5): 'Following two-step instructions' (flagtwo, ages 3-4)
  is listening and doing what someone else says; 'Telling a story from picture cards' (flagpicstory) orders story
  events with first, next and last; 'Remembering what comes next' (flagroutine) recalls a daily routine; 'Four Types of
  Sentences' (flagkinds, ages 6-7) names commands as a written sentence type. No lesson teaches a young child to GIVE
  spoken instructions that someone else can follow: start with a doing word (a bossy verb: Take, Spread, Put), not
  'I like bread' or a question; say what to get ready; say exactly what and where (one slice, on the plate), because a
  listener (or a robot) does exactly what you say and cannot guess; and give the steps one after another in the order
  they must happen, then check by watching someone follow them. DfE Development Matters (2021) Reception Communication
  and Language: 'use talk to help work out problems and organise thinking and activities, and to explain how things
  work'; EYFS Statutory Framework (2024) ELG Speaking ('offer explanations'; full sentences); Talk for Writing (Corbett
  and Strong) oral rehearsal of 'how to' texts in Reception; EEF Preparing for Literacy (2018) recommendation 1
  (develop communication and language through talk)."""

from dsl import T, U, L

SL = "Speaking & Listening"

# ---------------------------------------------------------------- English, ages 4-5 (Reception speaking: explaining how)
T("y22_give_instructions", L, SL, "Giving clear instructions", "4-5",
  "Give spoken instructions that someone else can follow: start each step with a doing word (a bossy verb such as Take, Spread, Put, Cut), not with 'I like' or a question; say what to get ready before starting; say exactly what and where ('Put one slice on the plate', not 'Put it there'), because a listener does exactly what you say and cannot guess what you meant; give the steps one after another in the order they must happen; and watch someone (or a pretend robot) follow your words, then fix the step that went wrong",
  ["Says an instruction that starts with a doing word, such as 'Spread the jam'",
   "Names the things to get ready before giving the steps",
   "Changes a muddled instruction like 'Put it there' into an exact one like 'Put the bread on the plate'"],
  "Play robots at snack time: {{name}} is the boss and you are the robot. Do exactly what they say and nothing more. If they say 'Put it on', hold the bread on your head! Swap, and let them be the robot.",
  [], [("ey_two_steps", "h", "Before giving steps to someone else, a child follows two spoken steps in order"),
       ("y8_picture_story", "s", "Saying steps one after another uses the same 'what happens next' order as telling a story from picture cards")])

# ---------------------------------------------------------------- foundation edge: a v1 topic that builds on it
U("y22_give_instructions", "mt_u1-UfD0rTH", "s", "A command sentence with a bossy verb is the written form of the spoken instructions the child already gives")
