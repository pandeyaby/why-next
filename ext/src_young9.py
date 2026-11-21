"""Wave 9 (18 Nov 2026): new young (ages 3-5) Mathematics, Science and Personal & Social Development topics, so the
lesson builder keeps its 2-of-3 young mix with subjects other than English. Each fills a gap: no existing topic or
lesson covers it (zero is only mentioned in passing in v1 numeral and addition topics; thermal insulation first
appears at age 8 as electrical insulators and at 12 as heat-transfer design; dressing appears only as choosing
clothes for the weather). Names use curriculum terms (EYFS Development Matters 2021: Mathematics, Understanding the
World and PSED Managing Self; NCETM Mastering Number)."""

from dsl import T, U, C, P

CC, MM, SA = "Counting & Cardinality", "Matter & Materials", "Self-Awareness"

# ---------------------------------------------------------------- Mathematics, ages 4-5 (EYFS Number)
T("y9_zero", C, CC, "Zero means none", "4-5",
  "Know that zero (0) is the number for none: an empty plate has 0 grapes, taking the last one away leaves 0, and 0 comes just before 1 when counting back ('3, 2, 1, 0'). Zero is a number like the others, not 'nothing to write'",
  ["Says 'zero' or 'none' for an empty box",
   "Counts back 3, 2, 1, 0 as things are taken away",
   "Matches the numeral 0 to an empty group"],
  "If you eat the last biscuit on {{name}}'s plate, can they tell you how many biscuits are left and show you the number 0?",
  [], [("ey_count_five", "h", "Knowing a group is empty builds on counting small groups"),
       ("ey_numerals", "s", "Writing 0 for none extends matching numerals 1 to 5 to groups")])

# ---------------------------------------------------------------- Science, ages 4-5 (EYFS Understanding the World)
T("y9_insulation", C, MM, "Keeping things warm or cold by wrapping them", "4-5",
  "Find out that wrapping something in a thick, fluffy material (a woolly hat, a blanket, bubble wrap) slows down heat moving in or out, so warm things stay warm and cold things stay cold for longer. A coat keeps your own warmth in; it does not make heat",
  ["Predicts which wrapped cup of warm water will stay warm longest",
   "Says that a scarf around an ice cube makes it melt more slowly",
   "Explains that a coat keeps our own warmth in"],
  "If you wrap one ice cube in a sock and leave one bare, can {{name}} guess which will melt first and then check?",
  [], [("ey_hot_cold", "h", "Telling hot, warm and cold apart is needed to notice something cooling down"),
       ("ey_melting", "s", "Watching ice melt shows heat moving into something cold")])

# ---------------------------------------------------------------- Personal & Social Development, ages 3-4 (PSED Managing Self)
T("y9_dressing", P, SA, "Getting dressed by myself", "3-4",
  "Put clothes on in a sensible order (pants before trousers, socks before shoes, coat last), find the front and back using the label, and work a big button or a zip, asking for help with the tricky part only",
  ["Puts socks on before shoes",
   "Turns a T-shirt so the label is at the back",
   "Does up a big button or starts a zip with a little help"],
  "When {{name}} gets dressed in the morning, can they put their clothes on in the right order and turn their top so the label is at the back?",
  [], [("ey_my_body", "s", "Knowing body parts helps match each piece of clothing to where it goes"),
       ("ey_routines", "s", "Dressing in order is a routine of steps that come one after another")])

# ---------------------------------------------------------------- foundation edges: v1 topics that build on these
for _k, _id, _s, _r in [
    ("y9_zero", "mt_fR0UtsSREU", "s", "Reading and writing numbers from 0 starts with knowing 0 means none"),
    ("y9_insulation", "mt_rTn43s8RNX", "s", "Choosing a material for a job, such as a warm coat or a cool box, uses what wrapping does to heat"),
    ("y9_dressing", "mt_Dj2xr8CoI0", "s", "Choosing clothes for the weather builds on putting them on by yourself"),
]:
    U(_k, _id, _s, _r)
