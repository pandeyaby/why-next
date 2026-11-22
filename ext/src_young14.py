"""Wave 14 (22 Nov 2026): two new young topics so the lesson builder has young Personal & Social and Learning to Learn
topics again (every young v1 PSD and Learning to Learn topic without a lesson overlaps one that has a lesson).
Each fills a gap, checked against lesson titles, key ideas and kid text on 22 Nov 2026:
- Brushing my teeth (PSD 4-5): 'Hygiene: washing away germs' is about hands and sneezes, 'Visiting the doctor or
  dentist' is about the visit, and 'Types of Teeth' (8-9) names incisors, canines and molars; no lesson teaches how to
  brush (every side, about 2 minutes, a pea-sized blob of fluoride toothpaste, spit and do not rinse, last thing at
  night) or why sugary food and drinks are kept to mealtimes. NHS 'Children's teeth' (reviewed 30 June 2025); OHID
  Delivering better oral health (2021); Oral Health Foundation (each sugary snack or drink: acid attack up to an hour).
  DfE EYFS ELG Managing Self: 'manage their own basic hygiene and personal needs'.
- Making a picture in my head (Learning to Learn 7-9): 'Drawing to help me think' draws on paper and 'Monitoring
  Comprehension' lists 'make a picture in your head' as one fix-up among five; no lesson teaches building a mental
  picture from the words, changing it when a new detail comes, checking it against the words, using it to remember,
  or keeping it simple (where things are and how many) for a problem. Pressley 1976 (imagery helps 8-year-olds
  remember what they read); Gambrell and Bales 1986 (imagery helps 9-11-year-olds spot what does not make sense);
  Hegarty and Kozhevnikov 1999 (schematic, not pictorial, images go with solving maths problems)."""

from dsl import T, U, P, M

RDM, LL = "Responsible Decision-Making", "Learning to Learn"

# ---------------------------------------------------------------- Personal & Social Development, ages 4-5 (looking after my teeth)
T("y14_teeth", P, RDM, "Brushing my teeth", "4-5",
  "Brush teeth twice a day, last thing at night and one other time, for about 2 minutes, with a pea-sized blob of fluoride toothpaste; clean every tooth on the outside, the inside and the chewing tops, and gently along the gums; spit the toothpaste out and do not rinse with water, so the fluoride keeps protecting the teeth; know that sugary food and drinks are best kept to mealtimes, because every sugary snack or drink starts an acid attack on teeth that lasts up to an hour; and let a grown-up help and check the brushing",
  ["Brushes the outsides, insides and chewing tops of all their teeth for about 2 minutes",
   "Uses a pea-sized blob of toothpaste, then spits it out without rinsing",
   "Says why sweets and sugary drinks are kept to mealtimes, not nibbled all day"],
  "At bedtime, can {{name}} show you how they brush the outsides, insides and tops of their teeth, then spit without rinsing?",
  [], [("y9_dressing", "s", "Brushing teeth is another everyday self-care job a child learns to do, with a grown-up checking"),
       ("y11_doctor", "s", "Brushing at home is what keeps teeth healthy between check-ups at the dentist")])

# ---------------------------------------------------------------- Learning to Learn, ages 7-9 (visualising)
T("y14_visualise", M, LL, "Making a picture in my head", "7-9",
  "While reading or listening, build a picture in your head from the details the words give (who is there, where things are, how many), change the picture when a new sentence adds or changes a detail, check the picture against the words and reread when they do not match, use the picture to remember what you read, and for a problem keep the picture simple, showing where things are and how many rather than how they look",
  ["Describes or draws the scene a short passage gives, with each detail in the right place",
   "Changes their picture when a later sentence adds or changes a detail",
   "Uses a simple picture of a word problem (dots and lines, not decorations) to find the answer"],
  "Read {{name}} a short description of a place from a book. Can they tell you what they picture, then change it when you read the next sentence?",
  [], [("pr_dual_coding", "h", "A picture in your head is the same idea as a thinking picture on paper, held in mind instead"),
       ("mt_GugVunb2lI", "s", "Making a picture in your head is one way to notice when reading stops making sense")])

# ---------------------------------------------------------------- foundation edge: a v1 topic that builds on the teeth topic
U("y14_teeth", "mt_DbXWivdJFB", "s", "Knowing the four types of teeth builds on looking after every tooth, inside, outside and on top")
