"""Wave 26 (27 Nov 2026): one new young English topic for ages 3-4, because young English was overdue after Maths and
Science lessons and every young English v1 topic without a lesson already overlaps an existing lesson. It fills a gap,
checked against lesson titles, key ideas, kid text and labs on 27 Nov 2026:
- Pre-writing shapes: lines, circles and crosses (English, Handwriting & Transcription 3-4): 'Giving meaning to marks'
  (ages 3-4) is about saying what marks mean, not how to form them; 'Sitting and holding a pencil' (ages 4-6) teaches
  posture, grip and where letters start; 'Letter Formation Families' and 'Forming Capital Letters' (ages 5-6) form real
  letters; 'Circles, squares and triangles' (ages 3-4) names shapes but never draws them; 'Copying and making
  patterns' is bead and sound patterns. No lesson teaches the pre-writing strokes themselves: a vertical line drawn
  top to bottom, a horizontal line drawn left to right, a circle that starts at the top and goes round anticlockwise
  (the way c, a, o and d are made) and closes, and a cross made of a line down and then a line across that meet in
  the middle, in the usual developmental order (vertical, horizontal, circle, then cross; diagonals, square, X and
  triangle come later, around 4-5). DfE Development Matters (2021) Physical Development 3-4 'use a comfortable grip
  with good control when holding pens and pencils' and Reception 'develop the foundations of a handwriting style which
  is fast, accurate and efficient'; EYFS Statutory Framework (2024) ELG Fine Motor Skills; Beery and Beery (2010)
  Beery VMI developmental norms for imitating and copying lines, circle and cross; the National Handwriting
  Association guidance on pre-writing patterns."""

from dsl import T, U, P

HT = "Handwriting & Transcription"

# ---------------------------------------------------------------- English, ages 3-4 (pre-writing strokes)
T("y26_prewriting", P, HT, "Pre-writing shapes: lines, circles and crosses", "3-4",
  "Draw the pre-writing shapes that letters are built from, starting in the right place and going the right way: a line down from the top (|), a line across from the left (-), a circle that starts at the top, goes round to the left (anticlockwise, the way c, a, o and d go) and joins up, and a cross (+) made of a line down and then a line across that meet in the middle; first by watching a grown-up draw it (imitating), then from a finished picture (copying)",
  ["Draws a line down from the top and a line across from the left",
   "Draws a closed circle starting at the top and going round to the left",
   "Copies a cross whose two lines meet in the middle"],
  "Draw a line down, a line across, a circle and a cross on paper. Can {{name}} draw each one under yours, starting where you started?",
  [], [("ey_copying", "s", "Children first draw a shape by watching a grown-up draw it, then copy it"),
       ("y8_mark_making", "s", "Making marks on purpose comes before controlling the shape of each mark")])

# ---------------------------------------------------------------- foundation edge: a v1 topic that builds on it
U("y26_prewriting", "mt_WBfj79OqXz", "s", "Lines down from the top and circles that go round to the left are the moves a well-held pencil then makes for letters")
