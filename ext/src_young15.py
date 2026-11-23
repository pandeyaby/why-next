"""Wave 15 (23 Nov 2026): one new young Personal & Social topic so the lesson builder has a young PSD topic again
(every young v1 and ext PSD topic without a lesson is in skipped, and young ext English must start at age 4 or below).
It fills a gap, checked against lesson titles, key ideas and kid text on 23 Nov 2026:
- Staying safe around dogs (PSD 4-5): 'Being gentle with people, animals and plants' strokes a pet softly and stops
  when its body says no, and 'Telling a grown-up when something feels wrong' covers getting lost; no lesson teaches
  asking the owner first, letting a dog sniff your hand, stroking its side (not hugging, and hands away from eyes,
  mouth and ears), leaving a dog alone when it is eating, sleeping or busy with a toy, reading a worried dog
  (yawning, lip licking, tail tucked, ears back, growling), or standing still like a tree when a strange dog runs up.
  Dogs Trust 'Be Dog Smart' and 'How to be safe around dogs' (2025); The Kennel Club 'Become a tree'; most bites to
  children are from a dog they know, so the rules hold for their own dog too."""

from dsl import T, U, P, M

RDM = "Responsible Decision-Making"

# ---------------------------------------------------------------- Personal & Social Development, ages 4-5 (dog safety)
T("y15_dogs", P, RDM, "Staying safe around dogs", "4-5",
  "Ask the dog's owner and your own grown-up before touching any dog, let the dog come and sniff the back of your hand, then stroke it gently on its side or shoulder, keeping hands away from its eyes, mouth and ears and never hugging it; leave a dog alone when it is eating, sleeping, resting or busy with a toy; notice when a dog wants space (turning away, yawning, licking its lips, tail tucked, ears back, going stiff, growling), even if its tail is wagging; and if a dog you do not know runs up, be a tree: stand still, fold your arms, look at your feet, then walk away slowly and tell a grown-up",
  ["Says they must ask the owner first, then lets the dog sniff their hand before a gentle stroke on its side",
   "Leaves a dog alone when it is eating, sleeping or chewing a toy",
   "Shows how to be a tree (stand still, arms folded, looking at their feet) when a dog runs up"],
  "On your next walk, when you meet a dog, can {{name}} show you what they do first (ask the owner) and how they would be a tree if a dog ran up to them?",
  [], [("ey_gentle_hands", "h", "Staying safe around dogs builds on stroking pets softly and stopping when they say no"),
       ("ey_safety_rules", "s", "Dog rules are more of the rules that keep us safe")])

# ---------------------------------------------------------------- foundation edge: a v1 topic that builds on the dog topic
U("y15_dogs", "mt_q3vRl4dddK", "s", "Everyday safety awareness includes knowing how to behave around dogs")
