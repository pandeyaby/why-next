"""Wave 19 (23 Nov 2026): one new young Personal & Social topic for ages 3-4, because the 2-4 band and PSD were both
due and every young v1 PSD topic without a lesson already overlaps an existing lesson. It fills a gap, checked against
lesson titles, key ideas and kid text on 23 Nov 2026:
- Saying goodbye at nursery: my grown-up comes back (PSD 3-4): 'Coping with Life Changes' (age 5) covers big changes
  such as a new baby or a new house, 'Calming down with big breaths' and 'Simple Calming Strategies' cover calming in
  general, and 'Telling a grown-up when something feels wrong' covers trusted grown-ups; no lesson teaches the daily
  goodbye at nursery or childminder: that the grown-up always comes back, knowing *when* by the order of the day
  (after story time, not a clock time), a short goodbye routine (hug, wave, 'see you after story'), that sad or worried
  at goodbye is OK and not naughty, going to the key person for comfort, and that the worried feeling gets smaller once
  you start to play. DfE Development Matters 2021 PSED (birth to three: 'find ways to calm themselves, through being
  calmed and comforted by their key person'; 3 and 4 year olds: 'show more confidence in new social situations');
  DfE EYFS statutory framework 2024, key person requirement; Bowlby 1969 and Ainsworth et al. 1978 (secure base);
  AAP HealthyChildren.org and ZERO TO THREE guidance on separation anxiety (say goodbye, keep it short, never sneak away)."""

from dsl import T, U, P

SRR = "Self-Regulation & Resilience"

# ---------------------------------------------------------------- Personal & Social Development, ages 3-4 (separation)
T("y19_goodbye", P, SRR, "Saying goodbye at nursery: my grown-up comes back", "3-4",
  "Know that their grown-up always comes back at the end of a nursery or childminder session, and know when by the order of the day ('after story time'), not by a clock; join in a short goodbye routine (a hug, a wave at the window, the same goodbye words each day) and know their grown-up will always say goodbye rather than slip away; know that feeling sad, worried or cross at goodbye is OK and is not being naughty; go to their key person or another nursery grown-up for a cuddle and help; and notice that the worried feeling gets smaller once they start to play, hold a comfort toy or take slow breaths",
  ["Says that their grown-up comes back, and when ('after story time')",
   "Joins in a short goodbye routine, then goes to their key person",
   "Says how they feel at goodbye and names one thing that helps (a cuddle, a toy from home, choosing a game)"],
  "On the way to nursery, ask {{name}}: 'Who will you go to after our goodbye hug, and when will I come back?' Can they say their key person and 'after story time'?",
  [], [("ey_calm_down", "s", "Slow breaths and a cuddly toy help the worried feeling at goodbye get smaller"),
       ("ey_routines", "s", "Knowing what comes next in the nursery day tells a child when their grown-up comes back")])

# ---------------------------------------------------------------- foundation edge: a v1 topic that builds on the goodbye topic
U("y19_goodbye", "mt_aS-Gdh-MHx", "s", "Coping with a big change uses the same tools as the daily goodbye: knowing what stays the same, a trusted grown-up and a comfort toy")
