# Round 13 review: reading starters for meaning

Sample: 150 starter lessons, chosen at random (seed 13) from all 1,465 and covering every subject and age band. For each one I read the title, the worked example and the first practice items, and asked two questions: is it correct, and is it about this topic?

## Error rate

| | Lessons judged | Wrong or off-topic | Rate |
|---|---|---|---|
| Before (commit 690bc1e) | 75 (first half of the sample) | 49 | **65%** |
| After (commit 7cdb818) | 75 (same lessons) | 22 | **29%** |
| After | 150 (full sample) | 40 | **27%** |

A lesson counts as an error if its worked example or one of its first two practice items is factually wrong, or is about a different topic.

## Findings and fixes

| # | Finding (examples from the sample) | Count before | Fix | Status |
|---|---|---|---|---|
| 1 | Generic examples spliced in an unrelated "archetype fact": Reflection gets "The Sun is low in the sky"; Alcohols get "Acid + metal → salt + hydrogen"; Heart gets "Teeth chop it…"; Solar cells get the transformer line | 24 | Generic examples no longer borrow an archetype step or title (`worked_for`) | Fixed |
| 2 | The example bank fell back to any entry when none matched, e.g. Rain & Puddles got "Coal vs wind" | 3 | `arch_worked.pick` returns only entries whose pattern matches the topic | Fixed |
| 3 | "Plotting points in the first quadrant" plotted (−7, 7) | 1 | `t_coord`: "first quadrant" now forces positive coordinates | Fixed |
| 4 | Loose-fit science topics borrowed basic drills: Redox and Metallic bonding got proton counting; Chirality got pH; Noble gases got gas laws | 12 | Outside maths, archetype items are used only when the archetype keyword is in the title, and not for basic drills at age 15+ unless a tuned or bank example exists. `acids` no longer matches "amino acid" | Mostly fixed (Noble gases→gas laws remains) |
| 5 | Maths topics matched on description words alone: Congruence → nth term, Shape of a distribution → negative numbers, Polar coordinates → plotting points | 20 | Maths is "strong" only when the keyword or archetype name is in the title, or the domain matches for ages under 14. Loose fits get a topic-built example plus link and vocabulary questions | Partly fixed (see remaining) |
| 6 | Sibling top-up leaked items from other domains (an earthquake question in Solar cells) | 2 | The topic's own domain is tried first; other domains only while the pool has fewer than 5 items | Reduced (a magnet question still appears in Solar cells and Transmission losses) |
| 7 | Rounding Large Numbers taught partitioning; Division with Decimals used whole numbers | 2 | — | Open |

## Remaining errors (40/150)

- **Maths: title keyword matches but wrong sub-skill (about 27).** Examples: Volume of cones → cuboid; Angles in triangles → triangle area; Geometric sequences → arithmetic; Circle theorems and Tangents → circle area; Matrix and complex-number topics → reflection drill; Telling time → kg to g; Pictograms and Types of data → mean. Fixing these needs archetypes for A-level and statistics topics, not filtering.
- **Science (about 13).** Examples: Digestion → breathing-rate drill; Conductors (age 5) → V = IR; Mass vs weight → inverse-square law; Echoes → pitch; ocean topics → generic habitat questions; magnet questions leaking into electricity topics.

## Trade-off

Taking out borrowed off-topic content lowered the quality scorer, which had been rewarding numeric examples whether or not they fitted the topic.

- Mean score went from 81 to 75.
- Lessons below 65 went from 36 to 242. Most are A-level chemistry (`matter` 71, `acids` 15) and advanced statistics; they now have a correct but generic topic-built example.

I chose correctness over the score and did not loosen the scorer to recover the numbers.
