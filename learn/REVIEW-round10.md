# Content review log, part 2

## Round 10: persona walk-through, touch, early-years materials (2026-10-20)

### Method
`scripts/persona_audit.cjs` (Playwright, touch emulation) opens all 103 lessons as three personas:
- **Kid**, 10 years old: band 10-12 on an iPhone 13
- **Teen**, 16 years old: band 16-18 on a Pixel 7
- **Grandparent**, 70 years old and new to tech: band "grand" on an iPad (gen 7)

For each lesson it records five things:
- every control smaller than 44 × 44 px
- jargon in the text the persona reads
- captions that do not tell you what to do
- the feedback after a deliberately wrong answer
- console errors

`tests/touch.e2e.cjs` then drags every draggable visual with real touch events.

### Findings and fixes
| Finding (persona) | Fix |
|---|---|
| About 1,250 controls under 44 px: level buttons, hints, ↑/↓ buttons, number keys, sorter cards, map buttons, the theme toggle (all) | New `learn/touch.css`, loaded last, sets a 44 px minimum. Before this, `vis.css` 36 px rules overrode the `learn.css` ones |
| Drag handles about 26 px on a phone (all) | A press within 26 px of a handle grabs it (`slop` in `vis_core.js`). Handles are also r = 18 on coarse pointers |
| Periodic-table cells about 18 px on a phone (kid, teen, grand) | On touch screens the table scrolls sideways with 44 px cells |
| A swipe over a picture did not scroll the page (all phones) | Pictures use `touch-action: pan-y pinch-zoom`; only handles and cards capture the finger |
| Map side panel showed "centrality", "upstream", "PROCEDURAL", "v1" (grand) | These moved into a collapsed "For teachers and parents" section. The card now says "Why Next? topic" / "earlier topic" |
| Hard words in descriptions and lessons: numerator, correspondence, equivalent … (kid) | Plain-words glossary. Terms are underlined (`dfn`) with a tap/hover meaning, in both the map text and the lesson text |
| Flask masses looked like real grams for one atom (teen) | Scale note: "relative atomic masses in grams" |
| Light-meter numbers looked like measurements (teen) | Labelled "(illustrative)" |
| Particle picture kept old colours after a theme switch while paused or with reduced motion (all) | Repaints on a `wntheme` event |
| Map labels cut at 24 characters (grand) | Full names, wrapped over lines |
| `slopes`: the "move up/down" slider did not change the caption (kid) | The caption now states where the line crosses the y-axis |
| Flask visual crashed after the mass-note edit (all; caught by the audit) | Fixed initialisation order |

The audit result after the fixes:
- **Small targets:** 0 for all three personas. Inline text links in the "leads here" lists are exempt as inline links.
- **Grandparent:** no jargon.
- **Kid:** 16 lessons still use their own subject word in the lesson text, e.g. "denominator" in Fraction Notation and "derivative" in the calculus lessons. These words are glossed where they first appear in the explanation. The calculus lessons are outside the kid's band anyway.
- No caption lacks an action.
- No weak feedback.

### New lessons (89–103)
Lessons 89–101 are early-years foundations (audience "family"): halves and quarters, materials, states of matter, heating and cooling, dissolving and separating, and reversible changes. They complete chemistry for ages under 10 (25/25).

Lessons 102–103 are learner lessons:
- 102: square and cube numbers
- 103: slopes of parallel and perpendicular lines

They use six new visuals: `states`, `separate`, `matlab`, `objects`, `squares` and `slopes`. I re-solved every item by hand.

### Coverage per goal (`python3 learn/goal_coverage.py --all`; topics with a lesson / topics on the path)
| Goal | u10 | 10-12 | 13-15 | 16-18 | adult | grand |
|---|---|---|---|---|---|---|
| fractions | 10/10 ✔ | – | – | – | – | – |
| algebra | 20/40 | 14/14 ✔ | 2/2 ✔ | – | – | – |
| calculus | 43/114 | 37/55 | 25/33 | 21/21 ✔ | 21/21 ✔ | 21/21 ✔ |
| integration | 60/213 | 47/92 | 34/48 | 30/30 ✔ | 30/30 ✔ | 30/30 ✔ |
| chemistry | 25/25 ✔ | 14/14 ✔ | 6/6 ✔ | 1/1 ✔ | 1/1 ✔ | 1/1 ✔ |

Every ✔ pair is enforced in `check_all`.

The most-blocking gaps are shared by calculus and integration at ages 10–15:
- plotting linear graphs
- coordinates
- negative numbers and sign rules
- expanding double brackets
- area of triangles and parallelograms

At ages under 10, the biggest gap is written multiplication and division.

### Remaining weaknesses
- All content is still self-checked; no teacher has reviewed it.
- The u10 calculus and integration paths are long (114 and 213 topics), and coverage there is 38% and 28%.
- Touch tests run in emulated Chromium, not on real iOS Safari.
