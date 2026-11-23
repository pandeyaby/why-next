"""Wave 17 (23 Nov 2026): two new young topics so the lesson builder has young Mathematics and Learning to Learn
topics again (every young v1 Maths and Learning to Learn topic without a lesson overlaps one that has a lesson, and
young ext Maths must start at age 4 or below). Each fills a gap, checked against lesson titles, key ideas and kid
text on 23 Nov 2026:
- Looking from above: bird's-eye view (Maths 4-5): '3-D shapes' names solids and their faces, 'Building with 3-D
  shapes' joins solids, 'Circles, squares and triangles' names flat shapes and 'Prepositions' says where things are;
  no lesson teaches that a thing looks different from above than from the side (a party hat is a triangle from the
  side and a circle with a dot from above), which things look the same from every side (a ball), or reading a simple
  plan from above. DfE Development Matters 2021, Reception Mathematics ('select, rotate and manipulate shapes to
  develop spatial reasoning skills'; 'discuss routes and locations'); DfE National Curriculum 2013 Geography KS1
  ('use aerial photographs and plan perspectives'; 'devise a simple map'); Frick, Mohring and Newcombe 2014
  (perspective taking develops from age 4 to 8).
- Helping a friend learn: a clue, not the answer (Learning to Learn 6-7): 'Asking for Help' is the stuck child's side,
  'Teaching It Back' explains your own learning and 'I do, we do, you do' is a grown-up's teaching plan; no lesson
  teaches the helper's side: let the friend try first, give the smallest clue that could work, more help only if they
  are still stuck and less once they get it, never just the answer or doing it for them, and kind words. Wood, Bruner
  and Ross 1976 (scaffolding); Wood and Middleton 1975 (contingent help: more after a fail, less after a success);
  Webb 1989 (being handed answers without explanation goes with less learning); EEF Toolkit, peer tutoring."""

from dsl import T, U, C, P

GE, LL = "Geometry", "Learning to Learn"

# ---------------------------------------------------------------- Mathematics, ages 4-5 (Reception spatial reasoning)
T("y17_above", C, GE, "Looking from above: bird's-eye view", "4-5",
  "Know that the same thing can look different from different places: from the side (side view) a party hat (cone) looks like a triangle and a tin (cylinder) like a rectangle, but from above (bird's-eye view, top view) both look like circles, the hat with a dot for its point; a box (cuboid) looks like a rectangle from above; a ball (sphere) looks like a circle from every side; the thing itself does not change, only where you look from; and a simple plan of a room or playground shows each thing as it looks from above",
  ["Matches a ball, a box, a party hat and a tin to how each looks from above",
   "Says that a party hat looks like a triangle from the side but a circle from above",
   "Finds the round sandpit and the long slide on a simple bird's-eye plan of a playground"],
  "Put a cup, a ball and a box on the floor and stand over them together. Can {{name}} tell you what shape each one looks like from up high, and then crouch down to see how they look from the side?",
  [], [("ey_shape_names", "h", "Saying what a thing looks like from above uses the names circle, square, triangle and rectangle"),
       ("mt_Qcp2d_kuta", "s", "Top views come from 3-D shapes: a cone, cylinder, cube and sphere each have their own view from above")])

# ---------------------------------------------------------------- Learning to Learn, ages 6-7 (helping a friend learn)
T("y17_help_friend", P, LL, "Helping a friend learn: a clue, not the answer", "6-7",
  "When a friend is stuck, help them learn rather than doing it for them: let them try first and wait while they are still working; when they are stuck, give the smallest help that could work (ask 'What could you try?', then a clue, then show on a different example, then do it together), giving more help only if they are still stuck and less as soon as they can do it; do not just tell the answer or do it for them, because then they cannot do the next one; and use kind words that praise the trying",
  ["Picks a clue rather than the answer to help a stuck friend",
   "Waits while a friend is still trying, and gives a bigger clue only when a small one has not worked",
   "Says why being told the answer does not help a friend do the next one"],
  "Next time {{name}} helps a sibling or friend with a puzzle, watch: do they wait, then give a small clue such as 'Look for the straight edges', instead of putting the piece in?",
  [], [("mt_mvXufozy2s", "h", "Helping a friend is the other side of asking for help: the helper gives the clue the asker needs"),
       ("y11_guided", "s", "Smallest help first, then less help, is the same idea as I do, we do, you do, run by a friend")])
