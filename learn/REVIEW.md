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

## What a teacher review should focus on
1. **Pedagogical sequence and prerequisites.** Do the age-10 bridge lessons (26–30) and the learner slice match how UK KS2/KS3 classes actually teach these topics?
2. **Misconceptions.** Are the wrong choices the mistakes children really make? Are any common ones missing (for example "multiplying always makes bigger" in fractions or decimals, and sign errors when solving equations)?
3. **Wording for real 10-year-olds**, especially the multi-step and remainder problems, which are reading-heavy.
4. **The family slice for under-7s.** Is it realistic for a parent to deliver, and are the "Try it at home" activities sensible?
5. **Mastery thresholds** (3 of 4, from a pool of 7) and the spaced-review intervals (3/7/14/30/60 days).
6. **Notation.** Long-division layout, and how remainders are written (r, fraction, decimal).
