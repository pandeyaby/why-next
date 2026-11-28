"""Wave 29 (28 Nov 2026): two new young topics, because English and Personal & Social were due (the last four runs
built Maths, Science and Learning to Learn) and every young v1 English and Personal & Social topic without a lesson
already overlaps an existing lesson. Each fills a gap, checked against lesson titles, key ideas, kid text and labs on
28 Nov 2026:
- Putting two words together (English, Speaking & Listening 2-3): 'Words for things I see' (3-4) is single naming
  words; 'Sharing a book with a grown-up' (2-3) is pointing and naming in a book; 'Joining in with repeated refrains'
  (2-3) is saying a learned line; 'Building sentences' (4-5) is the whole who-and-does sentence with a capital and a
  full stop; 'Talking about what happened' (4-5) is the past tense. No lesson teaches the first step from single words
  to two-word combinations (CDC 2022 milestone at 2 years: 'says at least two words together, like More milk'): the
  meanings toddlers first join (Brown 1973 stage I relations: more, all gone, no, bye; who does it, as in 'dog run';
  whose it is, as in 'Daddy shoe'; where it is, as in 'teddy bed'; what it is like, as in 'big ball'), that the
  two words must both fit what is happening, and that a grown-up helps most by saying it back a little longer ('Yes,
  the dog is running!', an expansion or recast) instead of asking the child to repeat a correct sentence.
  Development Matters (2021) Communication and Language, birth to three; CDC Learn the Signs. Act Early. milestones
  (2022); Brown (1973) A First Language; Cleave et al. (2015) meta-analysis of recasts, AJSLP.
- Staying safe in the sun (Personal & Social, Responsible Decision-Making 6-7): 'Weather and what to wear' (5-6)
  picks a sun hat and a T-shirt for a hot day; 'Sunlight warms things up' (5-6) is heat and shade as physics; 'Hot,
  warm and cold' and 'Rules that keep us safe' (3-4) are about hot things that burn by touch. No lesson teaches sun
  protection: the sun's UV light, not its heat, causes sunburn, so you can burn on a cloudy, breezy or cool day and
  in the water; the sun is strongest in the middle of the day, and when your shadow is shorter than you, find shade;
  cover up with a wide-brimmed hat, a T-shirt with sleeves and sunglasses; put sun cream (SPF 30 or more, 4 or 5 star
  UVA) on skin the clothes do not cover, including ears, neck, nose and the backs of hands and feet, and put more on
  every 2 hours and after swimming or drying with a towel; and drink water. DfE (2019) Health Education statutory
  guidance, Health and prevention (safe and unsafe exposure to the sun and how to reduce the risk of sun damage);
  NHS 'Sunscreen and sun safety'; WHO Global Solar UV Index guide (2002); US EPA SunWise shadow rule."""

from dsl import T, U, L, C

SL = "Speaking & Listening"
RDM = "Responsible Decision-Making"

# ---------------------------------------------------------------- English, ages 2-3 (two-word combinations)
T("y29_two_words", L, SL, "Putting two words together", "2-3",
  "Join two words to say more than one word can: 'more milk' and 'all gone' for wanting more and for nothing left, 'no bath' and 'bye car' for saying no and goodbye, 'dog run' for who is doing what, 'Daddy shoe' for whose it is, 'teddy bed' for where it is, and 'big ball' for what it is like; choose two words that both fit what is happening; and hear a grown-up say it back a little longer ('Yes, the dog is running!') so the next words come",
  ["Says two words together to ask or tell, such as 'more juice' or 'all gone'",
   "Uses two words for who is doing something or where something is, such as 'dog run' or 'teddy bed'",
   "Copies a longer phrase after a grown-up says it back, such as 'big dog run'"],
  "At snack time, wait a moment before giving more. Does {{name}} say two words, like 'more apple'? Say it back a little longer: 'More apple, please!'",
  [], [("y11_shared_book", "s", "Pointing and naming pictures in a shared book gives the single words that get joined"),
       ("y8_refrains", "s", "Saying a short repeated line with a grown-up is practice at saying words one after another")])

# ---------------------------------------------------------------- Personal & Social Development, ages 6-7 (sun safety)
T("y29_sun_safe", C, RDM, "Staying safe in the sun", "6-7",
  "Know that the sun's UV light, which you cannot see or feel, causes sunburn, so skin can burn on a cloudy, breezy or cool day and in the water; that the sun is strongest in the middle of the day, and when your shadow is shorter than you are it is time to find shade; cover up with a wide-brimmed hat, a T-shirt with sleeves and sunglasses; put sun cream (SPF 30 or more with 4 or 5 star UVA) on skin the clothes do not cover, including ears, neck, nose and the backs of hands and feet, and put more on every 2 hours and after swimming or drying with a towel; and drink water on hot days",
  ["Says that you can get sunburnt on a cloudy day or in the pool, because UV gets through",
   "Uses the shadow rule: a short shadow means the sun is strong, so find shade",
   "Names the skin that sun cream must cover and says when to put more on"],
  "On a sunny day out, ask {{name}} to check their shadow. Is it shorter than they are? Can they tell you three ways to stay safe and where the sun cream still needs to go?",
  [], [("y11_water", "s", "Like water safety, sun safety means a grown-up's rules for being outdoors on hot days"),
       ("mt_q3vRl4dddK", "s", "Sun protection is part of everyday safety awareness"),
       ("y14_teeth", "s", "Like brushing teeth, sun cream is a daily habit that protects the body for later")])

# ---------------------------------------------------------------- foundation edge: a v1 topic that builds on it
U("y29_two_words", "mt_N8CpN1EJrP", "s", "Building a whole sentence with who and what they do grows out of joining two words, such as 'dog run'")
