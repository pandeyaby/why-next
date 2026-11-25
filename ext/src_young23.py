"""Wave 23 (25 Nov 2026): one new young Personal & Social topic for ages 4-5, because Personal & Social was due and
every young v1 Personal & Social topic without a lesson already overlaps an existing lesson. It fills a gap, checked
against lesson titles, key ideas and kid text on 25 Nov 2026:
- Screen time: knowing when to switch off (PSD, Self-Regulation 4-5): 'Eating, sleeping and moving to grow' (ages 3-4)
  only names screen time in its adult notes; 'Basic digital citizenship' (7-9) is about privacy and kindness online;
  'Healthy lifestyle choices' (9-11) says screen time is not active time; 'Sleep, screens and wellbeing' (14+) is about
  teenage body clocks and phones at night; 'Patience and Delayed Gratification' (5-7) and 'Waiting for my turn' (3-4)
  are about waiting. No lesson teaches a young child to stop a screen when the timer rings or a grown-up says so
  (at the end of a show, not by hiding or begging for one more), to keep screens out of mealtimes and the hour before
  bed, to move and play after screen time, to ask a grown-up before using a phone or tablet, and to manage the cross
  feeling when a screen stops. DfE Development Matters (2021) Reception PSED: 'know and talk about the different
  factors that support their overall health and wellbeing: regular physical activity, healthy eating, toothbrushing,
  sensible amounts of screen time, having a good sleep routine, being a safe pedestrian'; EYFS Statutory Framework
  (2024) ELG Managing Self; WHO (2019) Guidelines on physical activity, sedentary behaviour and sleep for children under
  5 years (ages 3-4: sedentary screen time no more than 1 hour a day, less is better); AAP (2016) Media and Young Minds
  (screen-free meals and bedrooms, co-viewing); RCPCH (2019) The health impacts of screen time (no screens in the hour
  before bed)."""

from dsl import T, U, P

SRR = "Self-Regulation & Resilience"

# ---------------------------------------------------------------- Personal & Social Development, ages 4-5 (Reception PSED)
T("y23_screen_time", P, SRR, "Screen time: knowing when to switch off", "4-5",
  "Keep screen time short and switch off well: ask a grown-up before using a phone, tablet or TV; when the timer rings or the grown-up says it is time, stop at the end of the show and switch off, instead of begging for one more, hiding the screen or carrying on; keep screens off at mealtimes and in the hour before bed, because screens keep the brain awake and push sleep later; move and play after sitting at a screen; and when switching off feels cross or sad, take a big breath, say bye to the screen and choose the next thing to do",
  ["Switches off a tablet or TV when the timer rings, at the end of the show",
   "Says why screens are off at dinner and at bedtime",
   "Chooses something to do after screen time, such as playing outside or a book"],
  "Set a kitchen timer together before {{name}} starts a show. When it rings, let them press the off button themselves and choose what to do next: a run outside, a book or a game with you.",
  [], [("ey_waiting", "s", "Stopping a screen when the timer rings uses the same self-control as waiting a short time for a turn"),
       ("ey_growing_body", "s", "Knowing the body needs sleep and active play explains why screen time is kept short and away from bedtime")])

# ---------------------------------------------------------------- foundation edge: a v1 topic that builds on it
U("y23_screen_time", "mt_zIzJGkaj0Q", "s", "Being safe and kind online builds on a young child's first screen habits: asking a grown-up first and switching off when it is time")
