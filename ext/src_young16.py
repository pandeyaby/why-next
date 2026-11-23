"""Wave 16 (23 Nov 2026): one new young English topic so the lesson builder has a young English topic again (every
young v1 and ext English topic without a lesson overlaps one that has a lesson, and young ext English must start at
age 4 or below). It fills a gap, checked against lesson titles, key ideas and kid text on 23 Nov 2026:
- Talking about what happened: went, not goed (English 4-5): 'Talking about a story I know' retells a familiar story,
  'A quick look back at yesterday' is a Learning to Learn warm-up that recalls facts, and 'Talking about what I did and
  learned' reflects on learning; no lesson teaches the past tense in speech, the -ed ending for most doing words, the
  common words that change instead (go/went, eat/ate, see/saw, run/ran, come/came), or time words that tell when
  (yesterday, today, tomorrow). DfE Development Matters 2021, Reception Communication and Language ('use talk to
  connect ideas, explain what is happening'; 'connect one idea or action to another using a range of connectives';
  past, present and future forms); EYFS ELG Speaking ('making use of past, present and future tenses'). Saying
  'goed' and 'runned' is the documented over-regularisation stage (Marcus et al. 1992, Monographs SRCD 57)."""

from dsl import T, U, L

SL = "Speaking & Listening"

# ---------------------------------------------------------------- English, ages 4-5 (Reception speaking)
T("y16_past_talk", L, SL, "Talking about what happened: went, not goed", "4-5",
  "Talk about something that already happened using the past tense: most doing words add -ed when they are in the past (jump, jumped; play, played; kick, kicked), but some common ones change instead (go, went; eat, ate; see, saw; run, ran; come, came; have, had), so 'I goed' becomes 'I went'; use time words that tell when (yesterday and last night for the past, today and now for the present, tomorrow for what will happen) and link events in order with first, then and after that",
  ["Says 'went', 'ate', 'saw' and 'ran' when telling about yesterday, and corrects 'goed' or 'runned' when they hear it",
   "Adds -ed to a doing word to talk about the past ('Yesterday I jumped')",
   "Chooses yesterday, today or tomorrow to match a sentence about the past, now or the future"],
  "At bedtime, ask {{name}} to tell you three things they did today, starting 'First I ...'. Listen for went, ate and saw. If you hear 'goed', just say it back the right way: 'Oh, you went to the park!'",
  [], [("y11_talk_story", "h", "Talking about what happened uses the same retelling, now for things the child did, in the past tense"),
       ("y11_story_play", "s", "Stories in play need the words that say what happened first, then next")])

# ---------------------------------------------------------------- foundation edge: a v1 topic that builds on the past-tense topic
U("y16_past_talk", "mt_4A7FYmvVhA", "s", "Describing aloud what happened builds on using the past tense in talk")
