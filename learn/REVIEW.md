# Content review log (2026-10-19)

This is an author self-review, **not** a teacher review. All 30 lessons are still marked `self-checked`.

## Method
1. **Re-solving.** I dumped every practice and mastery item (360 in total, 172 of them parameterised) and solved each one by hand.
2. **Automated checks** (`validate_lessons.py`, run in CI):
   - every parameter combination is enumerated
   - every answer must be exact to 2 dp
   - multiple-choice options must be distinct
   - no placeholder may be left unfilled
   - each item must have at least 4 valid combinations
   - each explanation must state the answer
   - each lesson needs at least 2 parameterised practice items and at least 2 parameterised pool items
   - no duplicate prompts within a lesson
3. **Reading level.** Flesch–Kincaid grade (`readability.py`) is calculated for each explanation and must be no more than its target + 0.5:
   - family/kid ≤ 5.0
   - family/adult ≤ 10.0
   - learner/simpler ≤ 6.5
   - learner/teen-adult ≤ 9.5

   FK is a crude measure, and maths words like "denominator" inflate it.
4. **Misconceptions and ambiguity.** I checked whether any wrong choice could reasonably be defended as right, whether any prompt could be read two ways, and whether the right answer could be reached by faulty reasoning.

## Findings and fixes
| Lesson / item | Problem | Fix |
|---|---|---|
| 03 m6 | Some combinations gave a negative or zero difference | Added `where a>b` |
| 05 p3 | The hint pointed towards counting on rather than the target strategy | Reworded the hint |
| 07 m2 | "3 × 2" is read as "3 groups of 2" in the UK but often "3, two times" in the US, so the item was ambiguous | Item now asks "Which one is the same as 3 groups of 2?", and the grown-up text explains the convention |
| 10 p4 | "Is this a quarter?" could be true by coincidence for unequal pieces | Now asks "Does that show quarters?", meaning equal parts |
| 16 text | Notation | Gives brackets/parentheses and BIDMAS/BODMAS/PEMDAS |
| 19 m5 | "Standard notation" clashes with UK "standard form" (scientific notation) | Changed to "written the usual way" |
| 24 m4 | Some combinations showed "1x" | Added `where a-c>=2` |
| 02 kid, 09 kid/adult, 13 kid | FK above target (5.2, 5.2/12.3, 7.7) | Rewrote with shorter sentences |
| 26–30 (new) | Written for this round, and re-solved by hand. They cover rounding a remainder up or down in context, and the forgotten placeholder 0 in long multiplication | n/a |

## Round 2: calculus and chemistry slices (2026-10-19)
Lessons 31–40 (calculus) and 41–50 (chemistry) follow hard prerequisite links in the map. I re-solved every item by hand. The validator enumerates every parameter combination, and every lesson passes the reading-level targets.

**Calculus path:** gradient and line equation → function notation → limits → average rate of change → average to instantaneous → first principles → notation → power rule → sums and multiples → tangents and normals.
- The Calculus goal now targets *Equations of tangents and normals*, a simple application.
- Integration is not included. In the map, *The definite integral* needs a long chain (*Velocity–time graphs*, *Net change as accumulated rate*, *Estimating areas*) that has no lessons yet.

**Chemistry path:** particles → particle model and density → atoms, elements and compounds → pure substances and mixtures → periodic table → counting atoms → conservation of mass → reactions rearrange atoms → word equations → balancing equations.
- The Chemistry goal now targets *Balancing chemical equations*.

**Engine changes**
- Goal paths now follow hard prerequisites only. Soft links had been pulling maths lessons into the chemistry path.
- "Nearby" top-ups now stay in the goal's subject.
- Multiple-choice options are now shuffled on display. Before this, the correct answer was stored first in 146 of 157 items, and the panel showed choices in stored order. That was a real flaw in rounds 1 and 2.

**Accuracy checks**
- Quoted data checked: oxygen melts at −218 °C and boils at −183 °C; Mendeleev 1869; Group 1 reactivity; potassium burns with a lilac flame.
- Reacting masses use real ratios: Fe:S 7:4, Mg:O 3:2, H₂:O₂ 4:32, CaCO₃ → CaO + CO₂ 100:56:44, MgCO₃ 84:40:44, Na:Cl 23:35.5.

**Misconceptions targeted**
- Calculus:
  - f(x) read as f × x
  - run ÷ rise
  - "+c makes a line steeper"
  - (x + h)² = x² + h²
  - the power-rule slip −1 → 0
  - multiplying derivatives of a product
  - f′(3) read as 3f′
  - a negative dy/dx read as negative y
- Chemistry:
  - air between gas particles
  - particles expanding or melting
  - O₂ thought to be a compound
  - "pure" juice
  - burning destroying mass
  - changing subscripts to balance
  - 4 + 3 instead of 4 × 3 for brackets in formulae

**Fix during writing:** the lesson 43 kid text was at FK 7.5, so I rewrote it to 6.3.

## UK/US policy
- UK spelling, £ and pence, and metric units throughout.
- Where the terms differ, both are given: brackets (parentheses), BIDMAS/BODMAS (PEMDAS), indices (exponents).
- Avoid wordings that depend on the reading convention for "3 × 4", or explain the convention where it matters (lesson 07).

## Reading levels (FK grade: kid/simpler, adult/teen)
| Lesson | Audience | Kid | Adult |
|---|---|---|---|
| 01-one-to-one-counting | family | 2.4 | 6.9 |
| 02-how-many-in-total | family | 2.6 | 6.3 |
| 03-addition-as-combining | family | 4.4 | 7.9 |
| 04-subtraction-as-taking-away | family | 3.1 | 6.6 |
| 05-reading-plus-minus-equals | family | 0.9 | 5.1 |
| 06-what-the-equals-sign-means | family | 1.3 | 7.9 |
| 07-multiplication-as-repeated-addition | family | 0.8 | 5.2 |
| 08-division-as-equal-sharing | family | 3.4 | 5.9 |
| 09-fraction-notation | family | 3.9 | 5.4 |
| 10-fractions-of-amounts | family | 1.5 | 5.8 |
| 11-understanding-fractions | family | 2.6 | 7.1 |
| 12-fractions-on-a-number-line | family | 2.5 | 6.3 |
| 13-equivalent-fractions | family | 4.4 | 8.2 |
| 14-equations-as-balance | family | 3.8 | 6.9 |
| 15-letters-as-variables | family | 1.8 | 8.0 |
| 16-order-of-operations | learner | 5.6 | 6.9 |
| 17-writing-algebraic-equations | learner | 5.5 | 6.1 |
| 18-using-simple-formulae | learner | 4.9 | 6.6 |
| 19-algebraic-notation | learner | -1.0 | 5.2 |
| 20-substituting-into-formulae | learner | 5.8 | 7.1 |
| 21-using-inverse-operations | learner | 3.6 | 5.0 |
| 22-expanding-single-brackets | learner | 4.7 | 5.0 |
| 23-writing-expressions-from-words | learner | 1.9 | 7.8 |
| 24-solving-linear-equations | learner | 4.0 | 8.1 |
| 25-word-problems-with-linear-equations | learner | 2.1 | 5.1 |
| 26-long-multiplication | learner | 0.1 | 5.2 |
| 27-long-division-with-remainders | learner | 4.9 | 5.7 |
| 28-brackets-in-expressions | learner | 1.9 | 4.3 |
| 29-multi-step-problems | learner | 0.5 | 5.3 |
| 30-writing-number-sentences | learner | 3.6 | 7.8 |
| 31-function-notation | learner | -0.2 | 2.4 |
| 32-gradient-and-equation-of-a-line | learner | 0.5 | 1.6 |
| 33-average-rate-of-change | learner | 1.8 | 4.2 |
| 34-average-to-instantaneous-rate | learner | 0.7 | 3.2 |
| 35-limits | learner | -0.3 | 2.3 |
| 36-derivative-from-first-principles | learner | 0.8 | 5.1 |
| 37-derivative-notation | learner | 0.5 | 3.7 |
| 38-differentiating-powers-of-x | learner | 2.8 | 5.7 |
| 39-differentiating-sums-and-multiples | learner | 1.3 | 6.0 |
| 40-tangents-and-normals | learner | 0.8 | 3.7 |
| 41-matter-is-made-of-particles | learner | 3.1 | 5.9 |
| 42-the-particle-model | learner | 4.0 | 3.1 |
| 43-atoms-elements-and-compounds | learner | 6.3 | 7.0 |
| 44-pure-substances-and-mixtures | learner | 6.0 | 7.1 |
| 45-the-periodic-table | learner | 4.8 | 7.0 |
| 46-counting-atoms-in-formulae | learner | 5.8 | 6.7 |
| 47-conservation-of-mass | learner | 5.8 | 5.0 |
| 48-reactions-rearrange-atoms | learner | 6.3 | 6.0 |
| 49-word-equations | learner | 3.9 | 7.4 |
| 50-balancing-chemical-equations | learner | 3.5 | 4.5 |

## What a teacher review should focus on
1. **Calculus slice** (16–18): is the limits intuition rigorous enough without being off-putting? Is it right to end at tangents without integration? Is the notation (f′, dy/dx, lim) at the right level?
2. **Chemistry slice** (10–14): check accuracy, especially the simplified atom model, purity tests, and the reacting-mass numbers. Check the reading load for 10-year-olds.
3. **Pedagogical sequence and prerequisites.** Do the age-10 bridge lessons (26–30) and the learner slice match how UK KS2/KS3 classes actually teach these topics?
2. **Misconceptions.** Are the wrong choices the mistakes children really make? Are any common ones missing (for example "multiplying always makes bigger" in fractions or decimals, and sign errors when solving equations)?
3. **Wording for real 10-year-olds**, especially the multi-step and remainder problems, which are reading-heavy.
4. **The family slice for under-7s.** Is it realistic for a parent to deliver, and are the "Try it at home" activities sensible?
5. **Mastery thresholds** (3 of 4, from a pool of 7) and the spaced-review intervals (3/7/14/30/60 days).
6. **Notation.** Long-division layout, and how remainders are written (r, fraction, decimal).
## Visual learning (visual-draft)

All 50 lessons have an interactive visual (17 types). Weaker fits, stated plainly: 05 (ten-frame for reading
number sentences), 18/20/23/29 (step highlighting stands in for formulae and word problems), 44 (mixture shown
as two particle kinds; real mixture behaviour is simplified), 46/47/49 (balancer used for conservation of mass
rather than balancing). Integration as area has no lesson, so no visual. Lighthouse mobile performance is ~56,
the same as the live build (57): the cost is the 1.6 MB single-file data bundle, not the visuals (+71 KB, TBT 10 ms).

## Round 6: mobile speed and 25 more lessons (visual-draft)

**Speed.** The viewer is now a split build (see learn/README.md). Lighthouse mobile, gzip server like GitHub Pages:
before 60–82 locally (varies run to run; live site 62–65, FCP 3.2 s, TBT 320–360 ms, CLS 0.285), after 99 in three
runs (FCP 0.7 s, LCP 1.8–2.0 s, TBT 70–80 ms, CLS 0). Layout shift fixed by pre-rendering the stats line and giving
the mobile topic list a fixed height; layout cost cut with `content-visibility` on list groups and lower cards.

**Lessons 51–75.** Integration: estimating areas with strips, antiderivatives, + C and initial conditions, the
definite integral, the fundamental theorem, evaluating definite integrals, displacement and velocity, velocity–time
graphs, net change as accumulated rate, physical meaning of gradient and area. Chemistry (the whole 10–12 path to
balancing equations now has lessons): types of reaction, physical vs chemical change, irreversible changes, material
properties, particle diagrams, properties vocabulary, subatomic particles, acids/alkalis/pH, exo/endothermic.
Number and graphs: × 10 / ÷ 10, fractions as division, coordinates, percentage change, distance–time graphs,
negative temperatures. 11 new visual types (28 in all).

**Weak fits improved.** 18, 20, 23 and 29 now use the `formula` visual (substitute with sliders; 18 also draws the
rectangle). Still weaker: 05 (ten-frame for reading +, −, =), 46/47/49 (balancer used for conservation of mass),
and the sorter lessons (61, 63) are closer to an interactive quiz than a model.

**Remaining gaps.** The integration goal path for 16–18 still has 13 topics without lessons (polynomial algebra,
exponent laws, functions, kinematics prerequisites). Lessons are self-checked, not expert-reviewed.

## Round 7: integration path complete (visual-draft)

The 16–18 "Calculus: integration and area" goal path now has a lesson for every topic a 16–18 learner still has to
learn: 30 of 30. `learn/goal_coverage.py` mirrors the app's goal-path logic (hard prerequisites back from the
target, minus topics assumed known for the band or skipped). It runs in `check_all.sh` and fails if any required
goal/band pair has a lessonless topic. New lessons 76–88: polynomial vocabulary, laws of exponents, zero and
negative exponents, fractional exponents and radicals, solving x² = p and x³ = p, what makes a function,
multiplying polynomials, adding and subtracting polynomials, acceleration, displacement and velocity in a line, key
features of graphs, sketching qualitative graphs, scalars and vectors. New visual types (31 in all): `expo`
(exponent laws as factor tiles, the ÷ base ladder to negative powers, roots as equal factors), `roots` (level line
on y = x² / x³: two, one or no solutions) and `grid` (polynomial multiplication area grid that collects like terms).

Fit: the exponent, roots and grid visuals model the idea directly. Weaker: functions, polynomial vocabulary,
like terms and scalars/vectors use the card sorter (classification practice, not a model; a draggable vertical-line
test would fit functions better). Lessons 05, 46, 47, 49, 61, 63 unchanged this round.

## Round 8: "2052" look (visual-draft)

Default theme is now a dark glass design (`learn/theme.css`, CSS only, about 14 KB raw): frosted panels, a neon
cyan/violet/pink/amber palette, a faint star field and grid that drift with the pointer (parallax), cards that rise
in, a map whose prerequisite edges flow towards the topic they unlock, with glowing nodes (cyan = Why Next? topic,
pink = current, amber ring pulsing = learn next, green = done), and "holographic" visual widgets (scan-line glass
stage, glowing curves and handles). A "Classic look" button in the header switches to the original light design;
the choice is saved on the device and set before first paint (no flash, no layout shift). All animation stops under
prefers-reduced-motion; pointer parallax only runs with a fine pointer; mobile drops the blur and tilt for speed.
tests/theme.e2e.cjs checks: default theme, toggle + persistence, axe (WCAG 2 AA) in both themes and on mobile,
reduced motion. Lighthouse mobile stays 99–100.
Weaknesses: map labels are small on large graphs (the SVG scales down; same as before); the particle canvas keeps its
light background inside the dark panel; no user testing yet with young children or older adults.

## Round 9: weak visual fits replaced with models (visual-draft)

| Lesson | Old visual | New visual |
|---|---|---|
| 05 Reading +, − and = | ten-frame | `symbols`: choose + or −; counters join or are crossed out; an answer row shows = as "the same as"; the sentence is read in words |
| 46 Counting atoms | locked equation balancer | `sealed`: Ca(OH)₂ → CaO + H₂O in a flask; atoms move into new molecules; atom tally before/after |
| 47 Conservation of mass | balancer with masses | `sealed`: iron + sulfur on a scale; React keeps 176 g |
| 49 Word equations | balancer with names | `sealed`: magnesium + oxygen with word equation; open the flask and oxygen comes in from the air (48 g → 80 g) |
| 61 Material properties | sorter | `circuit`: put each material in the gap; bulb lights for conductors; results table builds |
| 63 Properties vocabulary | sorter | `light`: torch, material and screen; light meter 100/40/0%; sharp star, blur or shadow |
| 76 Polynomial vocabulary | sorter | `polyterms`: edit terms; terms/degree/leading coefficient/constant/standard form update |
| 81 What makes a function | sorter | `vlt`: draggable vertical line on line, parabola, circle, sideways parabola, cubic |
| 83 Adding/subtracting polynomials | sorter | `tiles`: algebra tiles; subtracting flips the second bracket; Combine cancels zero pairs |
| 88 Scalars and vectors | sorter | `vectors`: drag two walk arrows; distance (scalar) adds, displacement (vector) is the purple arrow |

Also: the particle canvas follows the theme (dark in 2052), and the map shows labels at full size (12 px) in a
scrollable region centred on the current topic, with a "Fit to width" option. Remaining: the sealed model uses
"1 atom = 1 g-per-mole" masses, said only implicitly; sorter is still used in 58–60 and 62's particle lesson is
unchanged; the map label truncation at 24 characters stays.
