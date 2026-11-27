"""Wave 28 (27 Nov 2026): one new young Learning to Learn topic for ages 3-4, because Learning to Learn at 2-4 was the
most overdue young band and every young Learning to Learn topic without a lesson was already skipped as an overlap
(Trying a different way, Talking about what I did and learned, Listening carefully to learn, Choosing resources for
myself, Saying it again to remember). It fills a gap, checked against lesson titles, key ideas, kid text and labs on
27 Nov 2026:
- Remembering where things are: look, say, check (Learning to Learn 3-4): 'Remembering what comes next' (3-4) is
  memory for the order of steps in a routine; 'Learning songs and rhymes by heart' (3-4) is memory for words by saying
  them again and again; 'Paying attention to one thing' (2-3) is staying on one thing; 'Prepositions' (5-6) teaches
  the position words themselves; 'Chunking to remember' (6-7) and 'Memory tricks' (8-9) are for older children. No
  lesson teaches a young child to remember WHERE something is (visual-spatial working memory): look carefully before
  it is hidden, say the place out loud with a position word and a landmark ('the key is under the red cup'), keep the
  picture in your head while you wait, then look again and check; a quick glance or a guess is easily forgotten; and
  putting things back in the same place each time means you do not have to remember a new place. Development Matters
  (2021) Characteristics of Effective Learning ('Creating and thinking critically'; 'Playing and exploring'); Harvard
  Center on the Developing Child (2014) 'Enhancing and Practicing Executive Function Skills with Children from Infancy
  to Adolescence' (ages 3-5: matching and memory games, hiding games for working memory); EEF (2021) Early Years
  evidence store, self-regulation and executive function (working memory); Gathercole and Alloway (2008) 'Working
  Memory and Learning' (young children hold only a few things; saying it aloud helps keep it)."""

from dsl import T, U, M

LL = "Learning to Learn"

# ---------------------------------------------------------------- Learning to Learn, ages 3-4 (remembering where)
T("y28_where_memory", M, LL, "Remembering where things are: look, say, check", "3-4",
  "Remember where something is (visual-spatial working memory): look carefully at where it goes before it is hidden instead of a quick glance; say the place out loud with a position word and a landmark ('the key is under the red cup', 'my shoes are by the door'); keep that picture in their head while they wait; then look again and check, and if they were wrong, look and say it again; know that a guess or a quick look is easily forgotten and that memory holds only a few places at once; and put things back in the same home each time so there is no new place to remember",
  ["Watches where a toy is hidden and finds it after a short wait",
   "Says where something is with a position word and a landmark, such as 'under the red cup'",
   "Puts a thing back in its own place so it is easy to find next time"],
  "Hide a small toy under one of three cups while {{name}} watches. Can they say where it is, wait while you count to five, then find it?",
  [], [("ey_paying_attention", "s", "Looking carefully at where a thing goes needs attention to stay on it while it is hidden"),
       ("ey_routines", "s", "Remembering the order of steps comes before remembering places; both use saying it to yourself")])

# ---------------------------------------------------------------- foundation edge: a v1 topic that builds on it
U("y28_where_memory", "mt_8dstvf-KKb", "s", "Checking your own work builds on the habit of looking again to check what you remembered, first met when finding where a thing was hidden")
