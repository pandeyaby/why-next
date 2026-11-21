"""Wave 11 (20 Nov 2026), English part: new young (ages 2-4) English topics so the
lesson builder has a young English queue again. Each fills a gap: no existing topic
or lesson teaches it. They sit at ages 2-4 because v1 English clusters start at 5.
Names use EYFS Development Matters 2021 and Letters and Sounds Phase 1, and NC English KS1."""

from dsl import T, U, C, P, R, L, M

PWR, RC, WC, SL, VOC = (
    "Phonics & Word Reading", "Reading Comprehension", "Writing Composition",
    "Speaking & Listening", "Vocabulary",
)

# ---------------------------------------------------------------- English, ages 2-4 (Phase 1 phonics and early literacy)
T("y11_beat", P, PWR, "Hearing the beat in songs", "2-3",
  "Feel and copy the beat of a familiar song, rhyme or clap pattern (tapping knees, clapping or marching in time), and notice when the beat speeds up, slows down or stops: general sound discrimination for rhythm, a Phase 1 phonics aspect, before hearing rhyme or letter sounds",
  ["Taps or claps in time with a familiar song",
   "Copies a short clap pattern of two or three beats",
   "Notices when the beat stops or changes speed"],
  "When you sing a familiar song and clap the beat, can {{name}} clap along with you, and stop when you stop?",
  [], [("ey_senses", "h", "Feeling a beat starts with listening closely"),
       ("y8_env_sounds", "s", "Telling sounds apart helps notice when a beat changes")])

T("y11_rhyme", L, PWR, "Hearing rhyme in songs", "2-3",
  "Notice that some words in a song or rhyme sound the same at the end ('twinkle, twinkle, little star / how I wonder what you are'), enjoy the repeat, and bounce or join in on the rhyming word, without yet being asked to invent a rhyme or pick the odd one out",
  ["Joins in on the rhyming word of a familiar song",
   "Says that two sung words 'sound the same at the end'",
   "Listens for the next rhyming word and smiles or joins in when it comes"],
  "When you sing a favourite rhyme and pause before the last rhyming word, does {{name}} join in with that word?",
  [], [("y11_beat", "h", "Feeling the beat of a song makes the rhyming word easier to wait for"),
       ("y8_env_sounds", "s", "Hearing that endings sound the same builds on telling sounds apart")])

T("y11_voice_sounds", L, PWR, "Voice sounds", "3-4",
  "Make and tell apart voice sounds: long and short ('sssss' vs 't'), loud and quiet, high and low, and sounds that copy everyday things (a car, a snake, a clock), so the voice is ready to make the sounds in words",
  ["Makes a long sound and a short sound on request",
   "Copies a loud voice and a quiet voice",
   "Makes a voice sound to go with a familiar thing, such as a car or a snake"],
  "Can {{name}} make a long 'sssss' like a snake and a short 't' like a tap, and tell you which one was long?",
  [], [("y8_env_sounds", "h", "Copying sounds with the voice builds on telling everyday sounds apart"),
       ("y11_rhyme", "s", "Playing with voice sounds sits alongside hearing the sounds at the ends of words")])

T("y11_oral_blend", P, PWR, "Oral blending", "3-4",
  "Hear a word spoken as separate sounds, with no letters shown, and blend them into the word ('c-a-t, cat'; 'sh-ee-p, sheep'), then start to split a familiar word into its sounds for someone else to blend",
  ["Blends two or three spoken sounds into a familiar word",
   "Does this with no letters or words to look at",
   "Splits a short familiar word into its sounds for a grown-up to blend"],
  "If you say 'c-a-t' with a clear gap between the sounds and no letters to look at, can {{name}} tell you the word is cat?",
  [], [("y11_voice_sounds", "h", "Making and hearing voice sounds comes before blending those sounds into a word"),
       ("y8_alliteration", "s", "Hearing the first sound in a word is used again when blending sounds in order")])

T("y11_shared_book", P, RC, "Sharing a book with a grown-up", "2-3",
  "Sit with a grown-up and share a picture book: hold it the right way up, look at the front cover, point to pictures and talk about them, and ask to hear a favourite again. This is shared reading, before tracking print left to right or naming letters and words",
  ["Holds a book the right way up and finds the front",
   "Points to a picture and says what they see",
   "Asks to hear a favourite book again"],
  "When you sit down with a picture book, can {{name}} turn it the right way up, point to something in a picture and tell you about it?",
  [], [("ey_senses", "s", "Looking closely at pictures uses the senses"),
       ("y8_refrains", "s", "Joining in with a familiar book is part of sharing it")])

T("y11_talk_story", L, RC, "Talking about a story I know", "3-4",
  "After a familiar story, talk about who was in it and what happened, using the character names and one or two main events, without needing the pictures in order in front of them",
  ["Names a character from a familiar story",
   "Says one thing that happened in the story",
   "Answers a simple 'who' or 'what happened' question about it"],
  "After you read a favourite story, can {{name}} tell you who it was about and one thing that happened, without looking at the pictures?",
  [], [("y11_shared_book", "h", "Sharing a book many times is how a story becomes one they can talk about"),
       ("y8_picture_story", "s", "Telling a story from pictures helps them retell one they know")])

T("y11_story_play", L, SL, "Making up a story in play", "3-4",
  "Use story language in pretend play: start with a phrase such as 'once upon a time', give toys something to say or do, and find an ending ('the end', 'they went home'), making a short made-up story rather than only retelling one they already know",
  ["Starts a play story with a story phrase",
   "Makes a toy speak or act as a character",
   "Brings the play story to an ending"],
  "When {{name}} is playing with toys, do they make up a short story for them, with a start, something that happens, and an ending?",
  [], [("y11_talk_story", "h", "Talking about a known story gives the language for making one up"),
       ("y8_refrains", "s", "Story phrases from familiar books turn up in play")])

T("y11_everyday_words", L, VOC, "Words for things I see", "3-4",
  "Use everyday names for the things around them, grouped in simple sets (clothes, food, toys, animals, rooms), and learn a more exact word when a grown-up offers one ('that's a robin, not just a bird')",
  ["Names familiar things in at least two groups, such as clothes and food",
   "Uses a more exact word a grown-up has just offered",
   "Sorts a few objects into named groups and says the group word"],
  "Can {{name}} name the clothes they are putting on, and use a more exact word such as 'robin' or 'diggers' if you have just used it?",
  [], [("ey_my_body", "s", "Naming body parts is the start of naming the things around us"),
       ("ey_all_about_me", "s", "Talking about home and family brings everyday names")])

T("y11_write_name", P, WC, "Writing my name", "4-5",
  "Recognise their own name in writing, and write it (from a name card at first) with the first letter as a capital and the rest in order, saying 'that says my name', as the step after giving meaning to marks and before writing other letters and words",
  ["Picks out their own name from a few name cards",
   "Writes the letters of their name in order, from a card if needed",
   "Uses a capital for the first letter of their name"],
  "Can {{name}} find their name card, write their name, and tell you that those marks say their name?",
  [], [("y8_mark_making", "h", "Writing a name starts from marks that already carry a meaning"),
       ("ey_all_about_me", "s", "Knowing their own name well is what they then learn to write")])

# ---------------------------------------------------------------- foundation edges: v1 topics that build on these (new topics start at 4 or below)
for _k, _id, _s, _r in [
    ("y11_rhyme", "mt_4GiE83rJF_", "s", "Spotting and inventing rhyming words builds on hearing rhyme in songs first"),
    ("y11_voice_sounds", "mt_F978c32kDr", "s", "Making letter sounds with the voice builds on playing with voice sounds"),
    ("y11_oral_blend", "mt__KHQttMde3", "s", "Blending printed sounds to read a word builds on blending spoken sounds with no letters"),
    ("y11_shared_book", "mt_1KCwbGvm1F", "s", "Tracking print left to right comes after sharing a book and talking about its pictures"),
    ("y11_talk_story", "mt_8-POYyg7GJ", "s", "Predicting what happens next is easier once they can talk about a story they already know"),
    ("y11_story_play", "mt_4A7FYmvVhA", "s", "Describing events aloud builds on making up a short story in play"),
    ("y11_everyday_words", "mt_NP101Zl-4g", "s", "Using newly taught words in speech and writing builds on a store of everyday names"),
    ("y11_write_name", "mt_PJyCGJz5Hv", "s", "Saying a sentence before writing it follows writing their own name as a first written message"),
]:
    U(_k, _id, _s, _r)
