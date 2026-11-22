"""Wave 13 (22 Nov 2026): two new young topics so the lesson builder has young English and Personal & Social topics
again (every young v1 English, Learning to Learn and PSD topic without a lesson overlaps one that has a lesson).
Each fills a gap, checked against lesson titles and key ideas on 22 Nov 2026:
- Writing labels and captions (English 4-5): 'Writing my name' writes one known word from a card, 'Pictures and Text
  Working Together' reads labels and captions in books, and segmenting hears the sounds; no lesson has the child
  write a label for a thing in their own picture and tell a label from a caption. DfE Development Matters 2021,
  Reception Writing ('write short sentences with words with known sound-letter correspondences'); EYFS ELG Writing.
- Crossing the road: stop, look, listen (PSD 6-7): 'Rules that keep us safe' (3-4) only asks children to hold a
  grown-up's hand near roads; nothing teaches the steps of the Green Cross Code, safer places to cross, why parked
  cars hide you, or why children under 8 cross with a grown-up. UK THINK! road safety, Green Cross Code (DfT);
  RoSPA; WHO 2008 World report on child injury prevention (children misjudge vehicle speed and distance)."""

from dsl import T, U, C, P

WC, RDM = "Writing Composition", "Responsible Decision-Making"

# ---------------------------------------------------------------- English, ages 4-5 (Reception writing)
T("y13_labels", P, WC, "Writing labels and captions", "4-5",
  "Write a label (one word that names a thing, such as 'dog' or 'sun') next to that thing in a picture, with a line to it, by saying the word slowly and writing a letter for each sound they hear; and know that a caption is a short sentence that tells about the whole picture ('The dog is in the sun.'), starting with a capital letter and ending with a full stop",
  ["Writes a label for a thing in their picture, saying the sounds as they write",
   "Puts the label next to the thing it names, with a line to it",
   "Says whether a card is a label (one naming word) or a caption (a short sentence about the picture)"],
  "When {{name}} draws a picture, can they write a label for one thing in it, saying the sounds as they write, and then tell you a sentence that could go underneath?",
  [], [("y11_write_name", "h", "Writing a label uses the same letter-forming as writing their name, for a new word"),
       ("y8_mark_making", "s", "A label is a mark that carries a meaning someone else can read")])

# ---------------------------------------------------------------- Personal & Social Development, ages 6-7 (road safety)
T("y13_road", C, RDM, "Crossing the road: stop, look, listen", "6-7",
  "Know the steps of the Green Cross Code (find a safer place to cross, stop at the kerb, look all around and listen, wait until no traffic is coming, then walk straight across and keep looking and listening); that crossings with a green figure or a crossing patrol are safer places; that parked cars and vans hide you from drivers; and that children under about 8 cross with a grown-up because judging how fast a car is coming is hard",
  ["Puts the steps of the Green Cross Code in order",
   "Chooses a crossing rather than a gap between parked cars or a bend",
   "Says why they hold a grown-up's hand to cross: drivers may not see them and car speed is hard to judge"],
  "On your next walk, can {{name}} find a safer place to cross and tell you each step before you cross together: stop, look and listen, wait, then walk and keep looking?",
  [], [("ey_safety_rules", "h", "Crossing the road safely builds on holding hands near roads and knowing why rules keep us safe"),
       ("mt_q3vRl4dddK", "s", "Road crossing is the road part of everyday safety awareness"),
       ("y11_water", "s", "Like water safety, road safety at this age means doing it with a trusted grown-up")])

# ---------------------------------------------------------------- foundation edge: a v1 topic that builds on the label topic
U("y13_labels", "mt_PJyCGJz5Hv", "s", "Saying a sentence before writing it builds on writing a caption under a picture")
