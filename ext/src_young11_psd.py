"""Wave 11 (20 Nov 2026), Personal & Social part: new young (ages 4-11) Personal &
Social Development topics so the lesson builder has a young PSD queue again. Each
fills a gap: no existing topic or lesson teaches it. Start ages are 4, 6, 8 and 10
(v1 clusters occupy 5, 7 and 9 in most domains). Names use the PSHE Association
Programme of Study 2020 and UK fire, water, first-aid and safeguarding guidance."""

from dsl import T, U, C, P, R, L, M

EM, FC, RDM, SA = (
    "Emotional Literacy", "Friendship & Cooperation",
    "Responsible Decision-Making", "Self-Awareness",
)

# ---------------------------------------------------------------- Personal & Social Development
T("y11_fire", C, RDM, "Fire safety: get out and stay out", "4-5",
  "Know what to do if there is fire or smoke at home: get out, stay out, and go to the family's meeting place; never hide in a cupboard or under a bed; tell a grown-up or call for help once outside; and know that smoke alarms mean 'get out now'",
  ["Says 'get out and stay out' if there is fire or smoke",
   "Says not to hide, and to go to a meeting place outside",
   "Says that a smoke alarm means leave the house now"],
  "If {{name}} heard the smoke alarm at home, can they tell you what they would do, and why they would not hide?",
  [], [("ey_safety_rules", "h", "Getting out in a fire is a safety rule, like holding hands near a road"),
       ("ey_tell_grownup", "s", "Once outside, a trusted grown-up is who you tell")])

T("y11_doctor", P, RDM, "Visiting the doctor or dentist", "4-5",
  "Know that doctors, nurses and dentists are trusted grown-ups whose job is to help us stay healthy, even when a visit feels strange or a bit uncomfortable; we can ask what will happen, sit still for a short check, and tell them if something hurts",
  ["Says that a doctor, nurse or dentist is there to help them stay healthy",
   "Asks, or is happy for a grown-up to ask, what will happen in the visit",
   "Tells the adult if something hurts"],
  "Before a check-up, can {{name}} tell you why they are going and what they can do if something feels uncomfortable?",
  [], [("ey_tell_grownup", "h", "Doctors, nurses and dentists are trusted grown-ups we can talk to"),
       ("ey_my_body", "s", "A check-up is about looking after the body they can already name")])

T("y11_borrowing", P, FC, "Borrowing and looking after other people's things", "4-5",
  "Ask before borrowing a toy or tool, use it carefully, and give it back when asked or when finished, and tell the owner if it gets damaged, so other people's things are treated with care",
  ["Asks before taking something that belongs to someone else",
   "Gives it back when asked or when they have finished",
   "Tells the owner if it gets damaged"],
  "If {{name}} wants to play with a friend's toy, do they ask first, look after it, and give it back when they are done?",
  [], [("ey_sharing_turns", "h", "Borrowing is sharing with a promise to look after the thing and give it back"),
       ("ey_gentle_hands", "s", "Looking after someone else's toy uses gentle hands")])

T("y11_water", C, RDM, "Water safety with a grown-up", "6-7",
  "Know the rules that keep us safe in and near water: only go in with a trusted grown-up, stay where you can be seen, no running by a pool, and call for help rather than jumping in after someone; even strong swimmers follow the same rules",
  ["Says they only go in water with a trusted grown-up",
   "Stays where they can be seen, and does not run by a pool",
   "Says to call for help rather than jump in after someone"],
  "At a pool or the seaside, can {{name}} tell you the rules they would follow, including what to do if they saw someone in trouble in the water?",
  [], [("ey_safety_rules", "h", "Water rules sit with other rules that keep us safe"),
       ("y11_fire", "s", "In both fire and water, the first job is to get help, not to hide or to rush in"),
       ("mt_q3vRl4dddK", "s", "Water safety is part of everyday safety awareness once children go to pools and the seaside") ])

T("y11_secrets", C, RDM, "Good surprises and worry secrets", "6-7",
  "Tell the difference between a good surprise (a short, happy secret, such as a birthday present, that will be told soon) and a worry secret (one that makes them feel uncomfortable, scared or 'you must not tell'), and know that a worry secret should always be told to a trusted grown-up, even if they were asked to keep it",
  ["Gives an example of a good surprise and of a worry secret",
   "Says that a worry secret should be told to a trusted grown-up",
   "Says it is still right to tell even if someone asked them not to"],
  "If someone told {{name}} a secret that made them feel uncomfortable and said 'don't tell', can they tell you what they would do and why?",
  [], [("ey_tell_grownup", "h", "A worry secret is one of the things we tell a trusted grown-up"),
       ("y10_medicine_safety", "s", "Both are times when 'someone said it was fine' is not a reason to stay quiet"),
       ("mt_Wc6cOTQ1bA", "s", "Choosing to tell a worry secret is a right choice, even when someone asked you not to") ])

T("y11_allergies", C, RDM, "Allergies and not sharing food", "6-7",
  "Know that some people become very ill from foods or stings that are safe for others, so we never share food from a packed lunch, we do not press someone to try a food they have said no to, and we tell a grown-up at once if a friend has a rash, swelling or trouble breathing after eating",
  ["Says not to share packed-lunch food, because some foods make some people ill",
   "Stops asking once someone has said they cannot eat a food",
   "Tells a grown-up at once if a friend feels ill after eating"],
  "If a friend at lunch said 'I can't eat that' and {{name}} had some to offer, can they tell you what they would do, and what they would do if the friend then felt ill?",
  [], [("ey_safety_rules", "h", "Not sharing food is a safety rule, not just a manners rule"),
       ("ey_tell_grownup", "s", "Trouble after eating is a time to get a grown-up straight away"),
       ("mt_q3vRl4dddK", "s", "Not sharing food that could make someone ill is everyday safety awareness") ])

T("y11_left_out", C, EM, "When I feel left out", "6-7",
  "Notice the feeling of being left out, name it, and use a helpful next step: ask to join in, find another person or activity, or tell a grown-up if it keeps happening, instead of hurting someone back or pretending they do not mind",
  ["Names the feeling as being left out or lonely",
   "Chooses a helpful next step (ask to join, find something else, or tell a grown-up)",
   "Says that hurting someone back will not help"],
  "If {{name}} saw friends playing without them, can they tell you how that might feel and one helpful thing they could do next?",
  [], [("ey_feeling_words", "h", "Being left out is a feeling they can name, like sad or angry"),
       ("ey_joining_in", "s", "Asking to join in is one of the helpful next steps"),
       ("mt_LhkP_KKIRS", "s", "Naming the feeling of being left out uses the same skill as naming basic emotions") ])

T("y11_strengths", M, SA, "Things I am good at and things I am practising", "6-7",
  "Name a few things they can already do well and a few they are still practising, see both as part of who they are, and choose one thing to practise without putting themselves down for not being good at it yet",
  ["Names at least two things they are already good at",
   "Names one thing they are still practising",
   "Chooses a practice goal without putting themselves down"],
  "Can {{name}} tell you two things they are already good at and one thing they are still practising, without saying 'I am bad at it'?",
  [], [("ey_i_can", "h", "Talking about what they can already do is the start of also naming what they are practising"),
       ("ey_practice", "s", "A thing they are practising is one they can get better at"),
       ("mt_H4YZ1rSKP3", "s", "Words for strengths and practice come from the vocabulary they already use about themselves") ])

T("y11_999", P, RDM, "Calling 999 or getting a grown-up", "8-10",
  "Know when an emergency needs a grown-up or a 999 call (someone is badly hurt, has trouble breathing, there is fire, or a person is in danger), how to make the call (stay calm, say where you are, what has happened, and your name; do not hang up until told), and that 999 is not for practice or minor bumps",
  ["Gives two situations that need 999 or a grown-up at once, and one that does not",
   "Says they would stay calm, give their name, where they are and what happened",
   "Says not to hang up until the operator says so, and not to call 999 for practice"],
  "If {{name}} were with someone who could not breathe easily and no grown-up was in the room, can they tell you who they would call and what they would say?",
  [], [("y11_fire", "h", "Fire is one of the times we get help from outside the house"),
       ("y11_water", "s", "Getting help rather than rushing in is the same idea in the water and in an emergency call"),
       ("ey_tell_grownup", "s", "A 999 operator is another trusted adult we tell when someone is in danger"),
       ("mt_q3vRl4dddK", "s", "Knowing when to call 999 extends everyday safety awareness to an emergency") ])

T("y11_worrying_news", M, EM, "News and pictures that worry me", "10-11",
  "Notice when a news story, video or image leaves them worried, know they can stop watching, talk to a trusted adult about what they saw, and check facts with that adult rather than watching it again or scrolling for more, without having to pretend they are fine",
  ["Notices and names a worried feeling after a news story or video",
   "Stops watching and talks to a trusted adult about it",
   "Checks what is known with that adult rather than searching for more images"],
  "If {{name}} saw a news video that left them worried, can they tell you what they would do next, and who they would talk to?",
  [], [("ey_tell_grownup", "h", "A trusted grown-up is who we talk to when news leaves us worried"),
       ("mt_Iwg2diBSyW", "s", "A simple calming strategy can help the body while they find an adult to talk to")])

# ---------------------------------------------------------------- foundation edges: v1 topics that build on these (new topics start at 4 or below)
for _k, _id, _s, _r in [
    ("y11_fire", "mt_q3vRl4dddK", "s", "Everyday safety awareness includes knowing what to do if there is fire or smoke"),
    ("y11_doctor", "mt_q3vRl4dddK", "s", "Everyday safety and health includes knowing what a doctor or dentist is for"),
    ("y11_borrowing", "mt_lAvS72LOUO", "s", "Everyday kindness includes looking after other people's things and giving them back"),
]:
    U(_k, _id, _s, _r)
