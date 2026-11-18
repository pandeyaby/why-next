"""Wave 10 (18 Nov 2026): new young (ages 4-9) Mathematics, Personal & Social Development and Learning to Learn topics,
so the lesson builder keeps its 2-of-3 young mix across subjects other than English and Science. Each fills a gap: no
existing topic or lesson teaches it (counting back is only met as counting back to 0 in 'Zero means none' and as the
number sequence in 'Counting within 1,000'; subtraction is otherwise taught as take-away with objects or as known
facts; medicines and household products appear in no lesson; no Learning to Learn lesson uses examples and
non-examples to pin down a new idea). Names use curriculum terms (DfE National Curriculum 2013 Year 1 Mathematics;
NCETM Mastering Number; PSHE Association Programme of Study 2020, KS1 Health and wellbeing H37-H40 and Keeping safe;
EYFS Development Matters 2021 PSED; EEF Metacognition and self-regulated learning 2021; Frayer model)."""

from dsl import T, U, C, P, M

AS, RDM, LL = "Addition & Subtraction", "Responsible Decision-Making", "Learning to Learn"

# ---------------------------------------------------------------- Mathematics, ages 4-5 (Reception 'one less' into Year 1 subtraction within 10)
T("y10_count_back", P, AS, "Counting back to subtract", "4-5",
  "Subtract a small number by starting at the whole and counting back one step for each thing taken away ('9 ... 8, 7, 6'), on a number track or number line, without saying the start number as one of the counts; then check the answer by counting on",
  ["Counts back from the start number to take away 1, 2 or 3",
   "Does not count the start number as the first step back",
   "Checks a subtraction by counting on from the answer"],
  "If {{name}} has 8 grapes and eats 3, can they say 'seven, six, five' to find what is left, without counting all the grapes again?",
  [], [("y8_counting_on", "h", "Counting back is counting on run the other way, one step for each thing"),
       ("mt_zuKAX6lcYR", "h", "Counting back is a quicker way to work out a take-away")])

# ---------------------------------------------------------------- Personal & Social Development, ages 4-5 (PSHE KS1 Health and wellbeing; Keeping safe)
T("y10_medicine_safety", C, RDM, "Medicines and household products: ask first", "4-5",
  "Know that medicines can help when we are poorly but can harm if we take the wrong ones or too much, so we only take them from a trusted grown-up; know that cleaning products and some sweets-lookalikes are not food, never taste or touch something unknown, and tell a grown-up if we find tablets or a bottle",
  ["Says who can give them medicine (a parent, carer or doctor)",
   "Leaves a found tablet or bottle alone and tells a grown-up",
   "Says that a sweet-looking tablet or juice-coloured bottle might not be food"],
  "If {{name}} found some tablets on the floor that looked like sweets, can they tell you what they would do and why?",
  [], [("ey_safety_rules", "h", "Leaving medicines alone is another rule that keeps us safe"),
       ("ey_tell_grownup", "h", "Finding something unsafe means telling a trusted grown-up")])

# ---------------------------------------------------------------- Learning to Learn, ages 7-9 (metacognition: concept learning)
T("y10_examples", M, LL, "Testing an idea with examples and non-examples", "7-9",
  "Pin down what a new word or idea means by collecting examples (things that are it), non-examples (things that are not), and near misses that share some features but miss one that matters, then use them to say the must-have features and test the definition",
  ["Sorts examples, non-examples and near misses for a new idea",
   "Names the must-have feature that a near miss is missing",
   "Fixes a definition that lets a non-example in"],
  "When {{name}} learns a new word such as 'triangle' or 'mammal', can they give one thing that is it, one that is not, and say what makes the difference?",
  [], [("ey_sorting", "h", "Sorting by one feature at a time is how examples and non-examples are told apart"),
       ("y8_worked_examples", "s", "Studying a few chosen examples carefully is how both strategies learn from cases")])

# ---------------------------------------------------------------- foundation edge: a v1 topic that builds on this
U("y10_medicine_safety", "mt_q3vRl4dddK", "s", "Everyday safety awareness includes knowing medicines and cleaning products are not for tasting")
