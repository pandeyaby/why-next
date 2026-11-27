"""Wave 27 (27 Nov 2026): two new young topics for ages 4-5, because Personal & Social and young English were due and
every young v1 Personal & Social, Learning to Learn and English topic without a lesson already overlaps an existing
lesson. Each fills a gap, checked against lesson titles, key ideas, kid text and labs on 27 Nov 2026:
- If I get lost: stop, stay and ask a safe helper (PSD, Responsible Decision-Making 4-5): 'Rules that keep us safe'
  (3-4) says stay with your grown-up so you do not get lost, but not what to do once you are lost; 'Asking for Help'
  (5-6) and 'Vocabulary: making decisions and keeping safe' (5-8) name trusted grown-ups in general; 'Calling 999 or
  getting a grown-up' (8-10) is about emergencies; 'Fire safety' and 'Water safety' name firefighters and lifeguards
  for those dangers only. The wave 6 topic 'Telling a grown-up when something feels wrong' was skipped as an overlap
  and is kept as a prerequisite. No lesson teaches what to do when you are lost in a shop or a park: stop instead of
  running to look, stay inside (never go out to the car park or road), ask a safe helper near you (a person who works
  there, at the till or with a name badge, a police officer, or a grown-up with children), tell them your name and
  your grown-up's name (and the phone number on a wristband or card), stay with the helper, and never go off with
  anyone, even someone who says they will take you to your grown-up. NCMEC KidSmartz 'If you get lost in a store'
  (go to a checkout counter or an employee, never go to the parking lot); Kidpower International guidance on getting
  lost (stay in one place, get help from a safe stranger such as a person at a counter or a mother with children);
  PSHE Association Programme of Study (2020) KS1 Keeping safe ('people whose job it is to help keep us safe'); DfE
  Relationships Education statutory guidance (2019) Being safe ('how to ask for advice or help for themselves or
  others, and to keep trying until they are heard').
- Writing a card: To, a message and From (English, Writing Composition 4-5): 'Writing my name' (4-5) and 'Writing
  labels and captions' (4-5) write single names, words and one sentence about a picture; 'Writing Across Genres'
  (11+) is the formal letter layout; 'Building Writing Stamina' (6+) lists letters as one purpose among many. No lesson
  teaches a young child the parts of a card or note: 'To' and the name of the person it is for at the top, a short
  message that fits the reason for the card (Happy birthday, Thank you for, Get well soon), 'Love from' or 'From' and
  their own name at the bottom, and the same name as after 'To' on the envelope, so the reader knows who it is for,
  why it was sent and who sent it. DfE Development Matters (2021) Reception Literacy: 'write short sentences with
  words with known sound-letter correspondences using a capital letter and full stop'; EYFS Statutory Framework (2024)
  ELG Writing ('write simple phrases and sentences that can be read by others'); National Curriculum in England (2013)
  English Year 1 Writing composition ('saying out loud what they are going to write about') and Year 2 ('writing for
  different purposes')."""

from dsl import T, U, P

RDM = "Responsible Decision-Making"
WC = "Writing Composition"

# ---------------------------------------------------------------- Personal & Social Development, ages 4-5 (getting lost)
T("y27_lost", P, RDM, "If I get lost: stop, stay and ask a safe helper", "4-5",
  "Know what to do if they get lost in a shop, a park or another busy place: stop and stay inside instead of running to look or going out to the car park or road; ask a safe helper nearby, such as a person who works there (at the till or with a name badge), a police officer, or a grown-up with children; tell the helper their own name and their grown-up's name (and show the phone number on a wristband or card); stay with the helper where they are; and never go off with anyone, even someone who says they will take them to their grown-up",
  ["Says the first thing to do when lost: stop and stay inside, not run off to look",
   "Picks out a safe helper in a picture of a shop, such as the person at the till with a badge",
   "Says their own name and their grown-up's name, and knows not to go off with anyone"],
  "Next time you are in a shop, play 'Who could help?': can {{name}} point to someone who works there, say what they would tell them, and say why they would stay inside?",
  [], [("ey_tell_grownup", "h", "Knowing which trusted grown-ups to tell comes before choosing a safe helper when no trusted grown-up is near"),
       ("ey_safety_rules", "s", "Staying with your grown-up is the rule; this is what to do when that rule has slipped")])

# ---------------------------------------------------------------- English, ages 4-5 (writing for a purpose: a card)
T("y27_card", P, WC, "Writing a card: To, a message and From", "4-5",
  "Write a card or note for someone they know: 'To' and the name of the person it is for at the top; a short message in the middle that fits the reason for the card (Happy birthday, Thank you for the book, Get well soon), said out loud first; 'Love from' or 'From' and their own name at the bottom; names starting with a capital letter; and the same name as after 'To' on the envelope, so the reader knows who it is for, why it was sent and who it is from",
  ["Puts 'To' and the other person's name at the top, and their own name after 'Love from' at the bottom",
   "Chooses a message that fits the card, such as 'Get well soon' for someone who is poorly",
   "Writes the name of the person the card is for on the envelope"],
  "When a birthday or a thank-you comes up, make a card together. Can {{name}} say who it is for, say the message out loud, then write 'To', the name, and their own name after 'Love from'?",
  [], [("y11_write_name", "h", "Signing a card at the bottom uses the name they can already write"),
       ("y13_labels", "s", "A label names one thing and a caption is one sentence; a card puts a name, a message and a name in order")])

# ---------------------------------------------------------------- foundation edges: v1 topics that build on them
U("y27_lost", "mt_q3vRl4dddK", "s", "Everyday safety and knowing your trusted adults builds on knowing what to do if you get lost in a busy place")
U("y27_card", "mt_lIs10UMkPG", "s", "Writing letters and other real pieces for a purpose builds on writing a short card that says who it is for and who it is from")
