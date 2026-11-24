"""Wave 20 (24 Nov 2026): one new young Personal & Social topic for ages 3-4, because Personal & Social and the 2-4 band
were due and every young v1 PSD topic without a lesson already overlaps an existing lesson. It fills a gap, checked
against lesson titles, key ideas and kid text on 24 Nov 2026:
- Using the toilet by myself (PSD 3-4): 'Hygiene: washing away germs' (Science 6-7) teaches germs and handwashing and
  only names 'after the toilet' as a time to wash; 'Getting dressed by myself' teaches clothes in order; 'Brushing my
  teeth' teaches tooth care. No lesson teaches toileting itself: noticing the body's 'I need to go' feeling and going
  straight away rather than holding on, the steps in order (pants down, sit, wipe front to back, flush, pants up, wash
  and dry hands), that only wee, poo and toilet paper go down the toilet, and that an accident is not naughty: tell a
  grown-up and change. DfE Development Matters 2021 PSED, 3 and 4 year olds ('be increasingly independent in meeting
  their own care needs, e.g. brushing teeth, using the toilet, washing and drying their hands thoroughly'); EYFS 2024
  ELG Managing Self ('manage their own basic hygiene and personal needs, including dressing, going to the toilet');
  NHS 'How to potty train' (wipe front to back, wash hands, never punish accidents); ERIC, The Children's Bowel &
  Bladder Charity (do not hold on, go when you feel the need); Water UK 'Fine to Flush' and the water companies'
  '3 Ps' (only pee, poo and paper go down the toilet)."""

from dsl import T, U, P

SA = "Self-Awareness"

# ---------------------------------------------------------------- Personal & Social Development, ages 3-4 (PSED Managing Self)
T("y20_toilet", P, SA, "Using the toilet by myself", "3-4",
  "Notice the body's 'I need to go' feeling and go to the toilet straight away instead of holding on until the end of a game; follow the steps in order (pants and trousers down, sit on the toilet, wipe from front to back with a little toilet paper, flush, pants and trousers up, wash and dry hands); know that only wee, poo and toilet paper go down the toilet, and that wipes, paper towels and toys go in the bin or back on the shelf; and know that an accident is not naughty: tell a grown-up, get clean clothes and wash hands",
  ["Says 'I need the toilet' and goes when they first feel it, even in the middle of a game",
   "Does the steps in order, including wiping front to back, flushing and washing hands",
   "Says what can go down the toilet (wee, poo and toilet paper) and what to do after an accident"],
  "Next time {{name}} goes to the toilet, can they tell you the steps in order, from 'pants down' to 'dry my hands', and say what can be flushed?",
  [], [("y9_dressing", "s", "Pulling pants and trousers down and up again is a dressing skill"),
       ("ey_routines", "s", "The toilet steps are a routine that always comes in the same order")])

# ---------------------------------------------------------------- foundation edge: a v1 topic that builds on the toilet topic
U("y20_toilet", "mt_cxJRc15osy", "s", "Learning that the body needs food and water, and gets rid of what it does not use as wee and poo, builds on noticing the 'I need to go' feeling and using the toilet")
