"""Wave 18 (23 Nov 2026): one new young English topic, because every young English topic in the graph already has a
lesson. It fills a gap, checked against lesson titles, key ideas and kid text on 23 Nov 2026:
- Opposites: hot and cold, up and down (English 4-5): 'Words for things I see' names everyday things, 'Big and small,
  long and short' and 'Heavy and light, full and empty' compare measures in maths, 'The Prefix un-' builds opposites
  with un- (age 5+), 'Shades of Meaning' orders words that are alike and 'Grammar Terms: Voice and Punctuation' names
  antonym at age 10+; no young lesson teaches what an opposite word is, matching common opposite pairs across many
  kinds of word (hot/cold, wet/dry, open/closed, up/down, happy/sad, loud/quiet, awake/asleep, day/night), swapping a
  word for its opposite to flip what a sentence says, telling an opposite from a word that means the same, or that
  many words (cat, red, chair) have no opposite. DfE Development Matters 2021, Reception Communication and Language
  ('learn new vocabulary'; 'use new vocabulary in different contexts'); EYFS ELG Speaking; Murphy and Jones 2008
  (antonym pairs in child and child-directed speech, First Language 28); Jones and Murphy 2005 (International Journal
  of Corpus Linguistics 10)."""

from dsl import T, U, L

VOC = "Vocabulary"

# ---------------------------------------------------------------- English, ages 4-5 (Reception vocabulary)
T("y18_opposites", L, VOC, "Opposites: hot and cold, up and down", "4-5",
  "Know that an opposite is a word that means the other end of the same thing: hot and cold, wet and dry, open and closed, up and down, fast and slow, happy and sad, loud and quiet, awake and asleep, day and night; match common opposite pairs; swap a word for its opposite to make a sentence mean the other thing ('The door is open' becomes 'The door is closed'); tell an opposite from a word that means the same (big and large mean the same, big and little are opposites) or a word that only goes with it (the opposite of hot is cold, not sun); and know that some words, like cat, red or chair, have no opposite",
  ["Says the opposite of hot, wet, open, up and happy",
   "Changes one word in a sentence to its opposite and says what is different now",
   "Says whether two words are opposites or mean the same, and that a word like cat has no opposite"],
  "Play the opposites game at bath time: you say 'The water is hot', and {{name}} says the opposite, 'The water is cold!'. Then try wet, full, up and loud. Swap roles and let {{name}} catch you out.",
  [], [("y11_everyday_words", "h", "Opposites pair up everyday words the child already knows, such as hot and cold"),
       ("ey_big_small", "s", "Big and small, long and short are the first opposite pairs children use when they compare")])

# ---------------------------------------------------------------- foundation edges: v1 topics that build on opposites
U("y18_opposites", "mt_zBUcAPDRPM", "s", "The prefix un- makes an opposite (kind, unkind), so it builds on knowing what an opposite is")
U("y18_opposites", "mt_VLu59hpQ4T", "s", "Shades of meaning orders words between two opposites, such as hot, warm, cool and cold")
