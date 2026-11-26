"""Wave 25 (26 Nov 2026): one new young Learning to Learn topic for ages 4-5, because Learning to Learn was the most
overdue young subject and every young Learning to Learn topic without a lesson already overlaps an existing lesson. It
fills a gap, checked against lesson titles, key ideas, kid text and labs on 26 Nov 2026:
- Same and different: comparing two things (Learning to Learn 4-5): 'Sorting by colour, size and shape' (ages 3-4)
  groups many toys by one rule; 'Looking closely and noticing changes' (ages 3-4) compares one thing before and after a
  change; 'Telling sounds apart' compares sounds; 'Spotting Patterns' (ages 7-8) finds a repeating rule; 'Testing an
  idea with examples and non-examples' (ages 7-9) compares near misses to find must-have features. No lesson teaches a
  young child to compare two different things on purpose: check one feature at a time (shape, colour, size, how many,
  what it does), say what is the same with 'both' and what is different with 'but', see that two things can be the
  same in one way and different in another (so 'same' needs 'same what?'), put each feature in a three-part 'only this
  one / both / only that one' sort, and look for differences that are small as well as big. DfE Development Matters
  (2021) Characteristics of Effective Learning 'Creating and thinking critically: making links and noticing patterns';
  Reception Understanding the World 'compare and contrast characters from stories', 'describe what they see, hear and
  feel'; EYFS Statutory Framework (2024) ELGs Past and Present, People, Culture and Communities and The Natural World
  ('know some similarities and differences between ...'); Gentner and Namy (1999) and Gentner (2010) on comparison as a
  learning mechanism in young children (side-by-side comparison helps children notice shared structure)."""

from dsl import T, U, M

LL = "Learning to Learn"

# ---------------------------------------------------------------- Learning to Learn, ages 4-5 (comparing)
T("y25_same_different", M, LL, "Same and different: comparing two things", "4-5",
  "Compare two things on purpose: look at one feature at a time (shape, colour, size, how many, what it does) instead of glancing at the whole; say what is the same with 'both' ('Both have four legs') and what is different with 'but' ('The cat is small, but the horse is big'); know that two things can be the same in one way and different in another, so 'the same' always means 'the same what?'; put each feature in a three-part sort, only this one, both, or only that one; and keep looking for small differences as well as big ones",
  ["Says one way two things are the same using 'both', and one way they are different using 'but'",
   "Sorts features of two pictures into only this one, both, and only that one",
   "Finds a small difference between two nearly matching pictures by checking one part at a time"],
  "Put a spoon and a fork next to each other. Can {{name}} tell you one way they are the same and one way they are different?",
  [], [("ey_paying_attention", "s", "Looking at one feature at a time needs the attention to stay on one thing"),
       ("ey_sorting", "s", "Sorting by one rule picks a single feature, which is what comparing checks one by one")])

# ---------------------------------------------------------------- foundation edge: a v1 topic that builds on it
U("y25_same_different", "mt_wvcFlwOrDl", "s", "Comparing two things feature by feature comes before spotting what stays the same in a repeating pattern")
