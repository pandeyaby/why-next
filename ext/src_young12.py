"""Wave 12 (22 Nov 2026): one new young (age 4-5) Mathematics topic, because every young v1 Mathematics topic still
without a lesson overlaps one that has a lesson (checked title by title on 22 Nov 2026: estimating, missing numbers,
10 or 100 more or less, halves and quarters, odd and even, place value, money, shapes, turns and angles all have
lessons). It fills a gap: every counting lesson counts things you can touch or see (objects, dots, fingers, bus
passengers); none counts actions or sounds that are gone as soon as they happen. Names use curriculum terms
(DfE Development Matters 2021, Reception Mathematics: "count objects, actions and sounds"; Gelman and Gallistel 1978,
the abstraction principle; NCETM Mastering Number, Reception)."""

from dsl import T, U, P

CC = "Counting & Cardinality"

# ---------------------------------------------------------------- Mathematics, ages 4-5 (EYFS Number: count actions and sounds)
T("y12_count_actions", P, CC, "Counting claps, jumps and sounds", "4-5",
  "Count things that cannot be touched or lined up, such as claps, jumps, drum beats and bell rings, by saying one number for each one as it happens and stopping when they stop; keep track with a finger for each one; know that a loud or quiet, big or small, fast or slow action still counts as one; and make a given number of actions ('jump 4 times') by counting as you go and stopping on the number",
  ["Counts up to 6 drum beats or claps and says how many",
   "Does exactly 4 jumps when asked, stopping on 'four'",
   "Says that 3 loud bangs and 3 quiet taps are the same number"],
  "If you clap 4 times while {{name}} listens with their eyes shut, can they tell you how many claps there were, and then jump that many times?",
  [], [("ey_count_five", "h", "Counting sounds and actions uses the same one-number-for-each-one rule as counting things"),
       ("ey_number_names", "s", "Saying one number name per clap needs the number names in order")])

# ---------------------------------------------------------------- foundation edge: a v1 topic that builds on this
U("y12_count_actions", "mt_yqAL6O5i_v", "s", "Counting sets to 20 uses the same one-number-for-each-one rule, now for things that stay still")
