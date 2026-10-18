# Marble Skill Taxonomy: secondary extension (ages 11–18), **unofficial draft**

> **Status:** unofficial draft extension by Abhinav Pandey, built on top of the open [Marble Skill Taxonomy v1](https://github.com/withmarbleapp/os-taxonomy).
> **Generative Spark, Inc. (Marble) has not reviewed or endorsed it.** Version label: `v1-secondary-ext.0.2` (wave 1 + wave 2). Nothing has been published.

## Scope
This adds secondary-school micro-topics for **grades 6–12 (ages ~11–18; KS3–KS4/post-16)**. They plug into Marble v1's existing primary graph and its coarse KS3 topics. It was built in two waves on the same branch with the same method; wave-1 ids and edges are unchanged (521/521 wave-1 edges preserved).

| Subject / domain | Wave | v1 topics | New topics | Total |
|---|---|---|---|---|
| Science / Matter & Materials: particle model, states, atoms, periodic table, bonding, reactions, moles, rates, equilibrium, nuclear | 1 | 40 | 64 | 104 |
| Science / Energy: stores and transfers, conservation, KE/GPE, work, power, heat transfer, resources | 1 | 28 | 30 | 58 |
| Mathematics / Algebra: expressions, exponents, linear, systems, polynomials, quadratics, exponentials, sequences | 1 | 25 | 74 | 99 |
| Mathematics / Functions & Modeling *(new domain)* | 1 | 0 | 31 | 31 |
| Science / Forces & Motion: kinematics, Newton's laws, momentum, vectors, projectiles, fields | 1 | 27 | 31 | 58 |
| Science / Waves, Light & Sound: wave properties, sound, EM spectrum, reflection/refraction, lenses, analog vs digital | 2 | 25 | 43 | 68 |
| Science / Electricity & Circuits *(new domain)*: charge, current, pd, resistance, Ohm's law, series/parallel, mains, magnetism/electromagnetism, induction, transformers, National Grid | 2 | 0 | 42 | 42 |
| Mathematics / Geometry: angle reasoning, congruence/similarity, transformations, Pythagoras, area/volume, circle theorems, coordinate geometry, trig, sine/cosine rules, unit circle/radians, proof, vectors | 2 | 69 | 59 | 128 |
| Mathematics / Data & Statistics: displays, averages/spread, distributions, correlation/regression, sampling/bias, study design, normal distribution, inference basics | 2 | 18 | 36 | 54 |
| Mathematics / Probability: probability rules, independence, conditional probability, counting, distributions, expected value | 2 | 15 | 15 | 30 |
| Mathematics / Calculus *(new domain)*: limits intuition, rates of change, derivative, rules, applications, integral as accumulation, FTC, simple differential equations | 2 | 0 | 51 | 51 |
| **Total** | | | **476** (wave 1: 230 · wave 2: 246) | |

**Domain placement (wave 2).** As in wave 1, new topics go into an existing v1 domain wherever one fits:
- Waves → *Waves, Light & Sound*; Geometry & Trigonometry → *Geometry*; Statistics & Probability → *Data & Statistics* + *Probability*.
- *Electricity & Circuits* is a new domain, because v1 files its few electricity topics under *Energy*. Wave-1 electrical topics (*Electrical power*, *Generating electricity by induction*, *Paying for electricity (kWh)*) stay in Energy and are used as prerequisites rather than duplicated.
- *Calculus* is a new domain (v1 has no calculus).

- **Topic types (all 476):** 198 conceptual, 195 procedural, 42 representational, 36 meta, 5 language.
- **Starting ages:** 11: 9 · 12: 29 · 13: 57 · 14: 108 · 15: 133 · 16: 117 · 17: 23.

**Edges:** 1083 new dependency edges (824 hard, 259 soft), each with a one-line reason.
- **404 bridge edges** go from a new topic into a v1 topic (263 hard), reaching 165 distinct v1 topics.
- **Wave 2 alone:** 562 edges (441 hard). 179 go to v1 (127 hard; 82 distinct v1 topics), 94 go to wave-1 topics (65 hard), and 289 stay among wave-2 topics (21 of those cross wave-2 domains).
- Main cross-domain feeds into wave 2: Calculus ← Functions & Modeling (16), Calculus ← Algebra (16), Electricity ← Energy (10), Geometry ← Algebra (7), Statistics ← Functions & Modeling (7), Calculus ← Geometry (7, trig/radians), Calculus ← Forces & Motion (6, kinematics), Waves ← Energy (2, energy transfer).
- No v1 topic depends on a new topic. v1 data is unchanged apart from the appended records.

**Standards:** 337 of the 476 topics carry at least one standard, with 451 topic–standard links: CCSS-Math 265, NGSS HS 100, UK NC KS3 64, NGSS MS 22.
- Wave 2: 138 of 246 topics tagged (CCSS-Math 120, KS3 32, NGSS HS 22, NGSS MS 4). All 51 calculus topics are untagged on purpose (see below).
- The only new standard records are **24 NGSS high-school PS codes** in the new curriculum `ngss-hs`: HS-PS1-1…8, HS-PS2-1…6, HS-PS3-1…5 (wave 1) and **HS-PS4-1…5 (wave 2)**.
- Every CCSS-Math (G-CO, G-SRT, G-C, G-GPE, G-GMD, G-MG, S-ID, S-IC, S-CP, S-MD, F-TF, N-VM, 6–8.G/SP), NGSS-MS (MS-PS4-1…3) and KS3 key used was already in v1.

## Files (`out/`)
| File | Contents |
|---|---|
| `topics.ext.json` | The 476 new topics (same schema as `data/topics.json`) |
| `dependencies.ext.json` | The 1083 new edges (same schema as `data/dependencies.json`) |
| `standards.ext.json` | The new `ngss-hs` curriculum (24 codes, codes only) |
| `merged/data/*.json` | Full merged dataset (v1 + extension) with an updated `manifest.json` (counts, sha256, `extension` block) |
| `merged/scripts/validate.mjs` | Unmodified copy of the repo validator, so it can check the merged data |
| `build-report.json` | Machine-readable output of the extension checks |
| `viewer.html` | Single-file interactive viewer (works offline; open it in a browser) |
| `REVIEW.md` | Review method, findings and fixes |

The sources are in `ext/`:
- `src_*.py` hold the topic definitions in a small DSL (`dsl.py`).
- `build.py` assigns ids, builds the outputs and runs the checks.
- `check_schema.py` runs JSON-schema validation.
- `make_viewer.py` and `viewer_template.html` build the viewer.

To rebuild: `python3 ext/build.py && python3 ext/check_schema.py && python3 ext/make_viewer.py && (cd out/merged && node scripts/validate.mjs)`.

## Method
- **Format.** Every topic has the same fields as v1: id, type, subject, domain, name, description, age range, centrality, evidence (2–4 observable items), an `assessmentPrompt` containing `{{name}}`, and standards.
- **Deterministic ids.** Each id is `"mt_" + base64url(sha256("marble-os-taxonomy/secondary-ext/v1:" + key))[:10]`, where `key` is a stable slug such as `al_quad_formula`. A salt would be appended on collision; none occurred. No id collides with v1.
- **Placement.** New topics go into v1's existing domains where one fits (Matter & Materials, Energy, Forces & Motion, Algebra, Waves Light & Sound, Geometry, Data & Statistics, Probability). *Functions & Modeling*, *Electricity & Circuits* and *Calculus* are new domains.
- **Centrality** is an approximation: `min(1, descendants_in_merged_graph / 731)`, where 731 is the largest descendant count in v1. **v1 centralities were not recomputed.**
- **Standards policy.** Only codes that are real and verified are used. CCSS and KS3 keys were taken from v1's `curriculum-standards.json`.
  - NGSS HS codes were checked against the official nextgenscience.org DCI arrangement pages (HS-PS1, HS-PS2, HS-PS3, and for wave 2 [HS-PS4](https://www.nextgenscience.org/dci-arrangement/hs-ps4-waves-and-their-applications-technologies-information-transfer)) on 2026-10-18.
  - **Calculus has no standards.** CCSS-Math has no calculus standards. AP Calculus CED identifiers (e.g. unit/topic numbers and learning objectives) are College Board material, are not in the repo's curricula, and have no repo-compatible, verifiable code format, so per the brief they were left empty rather than guessed.
  - When no code fit well, the topic's standards were left empty rather than guessed. **No codes were invented.**
- **NGSS text.** The brief asked for official text, but NGSS text is **not** included. Marble's `PROVENANCE.md` makes NGSS a codes-only source, because its licence cannot be relicensed under ODbL and limits commercial use. `ngss-hs` follows that rule, so it has no `data` field and is listed in `codesOnlySources`.

## Validation results (on the merged dataset, after wave 2)
```
$ node scripts/validate.mjs        # repo validator, run in out/merged
✓ valid — 2066 topics, 4304 dependencies, 3285 standards, 183 clusters. Referential integrity + checksums OK.
$ node scripts/validate.mjs        # original v1, unchanged
✓ valid — 1590 topics, 3221 dependencies, 3261 standards, 183 clusters. Referential integrity + checksums OK.
$ python3 ext/check_schema.py      # JSON Schema (schema/*.schema.json)
OK for all 7 files (3 extension + 4 merged data files)
$ python3 ext/build.py             # extension checks (out/build-report.json)
acyclic (Kahn on merged graph): true
dangling refs: 0 · self edges: 0 · duplicate edges: 0 · v1→new edges: 0
duplicate names within subject/domain (involving new topics): 0
age decreasing along hard edges: 0 · along soft edges: 0   (prereq.ageRangeStart ≤ topic.ageRangeStart)
new topics not reaching v1: 0 (via any edges) · 0 (via hard edges only)
every new topic has ≥1 prerequisite and an assessmentPrompt with {{name}}: yes
✓ extension checks passed
$ # extra check vs the wave-1 commit (eb444c2)
wave-1 ids changed: 0 · wave-1 edges preserved: 521/521 · v1→new edges: 0
```

## Example prerequisite chains (hard edges; NEW = extension topic)
### Wave 2
Each chain is the longest hard-edge path through new topics, then the shortest hard path inside v1 to a topic starting at age ≤10. Read left to right as "is needed for".

**The fundamental theorem of calculus** (NEW, 16–18): Number Pattern Relationships (v1, 10) → What makes a function (13) → Sketching and describing qualitative graphs (13) → Key features of graphs (14) → Average rate of change (14) → From average to instantaneous rate of change (16) → The derivative from first principles (16) → Derivative notation (16) → Differentiating powers of x (16) → Differentiating sums and multiples (16) → Antiderivatives (16) → **The fundamental theorem of calculus** (16). *(12 topics; v1 continues back through number patterns to early counting.)*

**The chain rule** (NEW, 17–18): Number Pattern Relationships (v1, 10) → What makes a function → … → Differentiating powers of x (16) → **The chain rule** (17). It also hard-depends on wave-1 *Combining and composing functions*.

**How the National Grid is organised** (NEW): Magnetic Poles (v1, 7) → Magnetic Fields (v1, 11) → Fields and forces at a distance (15) → Magnetic field patterns of wires and solenoids (15) → Generating electricity by induction (15) → How transformers work (15) → **How the National Grid is organised** (15).

**Refractive index and Snell's law** (NEW): Waves & How They Move (v1, 9) → Wave Properties & Types (v1, 11) → Reading wave diagrams and graphs (12) → Calculating wave speed (v = fλ) (13) → Wave speed depends on the medium (14) → Explaining refraction with wavefronts (14) → **Refractive index and Snell's law** (16).

**False positives and medical tests** (NEW): Reading tables (v1, 9) → Two-way tables and relative frequencies (13) → Conditional probability from tables and Venn diagrams (15) → **False positives and medical tests** (16).

### Wave 1
**Solving quadratics by factorising** (NEW, 14–16)
← Factorising x² + bx + c (NEW): *solving relies on factorising the quadratic*
← Expanding Double Brackets (v1, 13–14)
← Collecting Like Terms (v1)
← Expressions & Equations Vocabulary (v1)
← Algebraic Notation (v1)
← Writing Algebraic Equations (v1, 10–11)
← … the v1 chain continues back through Brackets in Expressions, Times tables, and Multiplication as repeated addition to One-to-one counting (ages 4–6).

**Balancing chemical equations** (NEW)
← Reactions rearrange atoms (NEW): *balancing is the symbolic form of conservation of atoms*
← Counting atoms in formulae and equations (NEW)
← Atoms, Elements & Compounds (v1, 11–12)
← The Particle Model (v1)
← Drawing Particle Diagrams (v1, ages 7–11)

**Half-life** (NEW, physics), which needs maths topics from the new domain:
← Modelling exponential decay (NEW)
← Modelling exponential growth (NEW)
← Linear versus exponential growth (NEW)
← Graphs of exponential functions (NEW)
← Function notation (NEW)
← What makes a function (NEW)
← Number Pattern Relationships (v1, 10–11)

**Calculating kinetic energy** (NEW)
← Kinetic energy depends on mass and speed (NEW)
← Speed and energy (v1, primary, ages 9–10)

## License and attribution
This is a derivative of the Marble Skill Taxonomy, so it carries **the same licences, with share-alike**:
- **Database** (structure, ids, edges, topic↔standard links): [ODbL 1.0](../LICENSE).
- **Text** (names, descriptions, evidence, prompts, reasons): [CC BY-SA 4.0](../LICENSE-CONTENT).

Required attribution:
> Marble Skill Taxonomy (v1) · © Generative Spark, Inc. (Marble) · https://withmarble.com · licensed under ODbL 1.0 (database) and CC BY-SA 4.0 (content).
> Secondary extension (unofficial draft) by Abhinav Pandey, distributed under the same licences.

Upstream standards notices (see `PROVENANCE.md`):
- **NGSS:** codes only. *"NGSS is a registered trademark of WestEd. Neither WestEd nor the lead states and partners that developed the Next Generation Science Standards were involved in the production of this product, and do not endorse it."*
- **CCSS-Math:** © 2010 NGA Center and CCSSO, under the CCSS Public License (not ODbL). This extension adds no CCSS text; it only references existing v1 keys.
- **UK National Curriculum:** *"Contains public sector information licensed under the Open Government Licence v3.0."* Only existing v1 KS3 keys are referenced.

## Known gaps and caveats
- **No KS4 codes.** The English National Curriculum publishes no official codes for KS4 (or for KS3: the `uk-nc-2013` KS3 keys in v1 were built by Marble). To avoid inventing codes I added no KS4 keys, so topics at ages 14–16 are tagged only with CCSS/NGSS codes.
- **139 topics have no standard** (31 wave 1, 108 wave 2), because no verified code fit well. This includes **all 51 calculus topics** (no CCSS calculus; AP CED identifiers not verifiable in repo format) and much GCSE/A-level physics with no NGSS/KS3 counterpart (e.g. Snell's law, lenses, Doppler, resistivity, Kirchhoff, capacitors, transformers, Lenz/Faraday, mains safety), plus UK-specific maths (histograms with unequal widths, cumulative frequency, capture–recapture, loci, bearings beyond KS3).
- **NGSS text is omitted** (codes-only, as v1 does). The repo's licensing policy takes precedence.
- **No clusters** were added for the new topics, the new domains (*Functions & Modeling*, *Electricity & Circuits*, *Calculus*), or the 14–18 age bands. `clusters.json` is unchanged.
- **v1 centralities are not updated**, even though many v1 topics now have more descendants. New-topic centrality is an approximation.
- **Overlap with v1's coarse KS3 topics** (ages 11–14). Wave 1 removed four duplicates and renamed ten topics; wave 2 removed four more duplicates (polygon angles, Earth's magnetic field, colour filters, lens ray diagrams) and refocused two (see REVIEW.md). A few close neighbours remain on purpose, e.g. wave-2 *Potential difference as energy per charge* (V = E/Q) next to wave-1 *Electrical power* (which also uses E = QV).
- **Electricity is split across two domains.** v1 and wave-1 electrical-energy topics live in *Energy*; the new circuit/electromagnetism topics live in *Electricity & Circuits*.
- **Self-review only.** A teacher or subject expert should review the topics, age bands and hard/soft calls before anyone relies on them. Most wave-2 edge reasons are short one-liners.
- **US vs UK sequencing.** Age bands follow the KS3/KS4/A-level order. US geometry, Algebra II/precalculus and AP Calculus placement varies; calculus is banded 16–18 to cover both A-level and AP.
- **Not covered yet:** organic chemistry, binomial distribution and hypothesis testing, vectors/mechanics beyond basics, complex numbers, matrices, some (+) CCSS standards (e.g. G-GPE.A.2–3 parabola/conics, N-VM matrices), further calculus (series, parametric/polar), biology and earth science at secondary level.
