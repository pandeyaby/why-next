# Marble Skill Taxonomy: secondary extension (ages 11–18), **unofficial draft**

> **Status:** unofficial draft extension by Abhinav Pandey, built on top of the open [Marble Skill Taxonomy v1](https://github.com/withmarbleapp/os-taxonomy).
> **Generative Spark, Inc. (Marble) has not reviewed or endorsed it.** Version label: `v1-secondary-ext.0.1`. Nothing has been published.

## Scope
This adds secondary-school micro-topics for **grades 6–12 (ages ~11–18; KS3–KS4/post-16)**. They plug into Marble v1's existing primary graph and its coarse KS3 topics.

| Domain (subject / domain) | New topics |
|---|---|
| Science / Matter & Materials: particle model, states and phase change, atoms, periodic table, bonding, reactions and conservation of mass, moles, rates, equilibrium, nuclear basics | 64 |
| Science / Energy: stores and transfers, conservation, KE/GPE calculations, work, power, thermal energy and heat transfer, resources | 30 |
| **Matter & Energy subtotal** | **94** |
| Mathematics / Algebra: expressions, exponents, linear equations and inequalities, systems, polynomials, quadratics, exponentials, sequences | 74 |
| Mathematics / Functions & Modeling *(new domain)*: functions, rate of change, modelling, proportion, transformations, logs, linearising data, physics-facing models | 31 |
| Science / Forces & Motion: kinematics, Newton's laws, momentum, impulse, vectors, projectiles, fields | 31 |
| **Total** | **230** |

- **Topic types:** 99 conceptual, 96 procedural, 23 representational, 10 meta, 2 language.
- **Starting ages:** 11: 5 · 12: 18 · 13: 33 · 14: 62 · 15: 75 · 16: 37.

**Edges:** 521 new dependency edges (383 hard, 138 soft), each with a one-line reason.
- **225 are bridge edges**, meaning edges from a new topic into a v1 topic. 136 of them are hard, and together they reach 111 distinct v1 topics.
- Many bridges cross subjects, so maths prerequisites feed science topics (e.g. *Half-life* ← *Modelling exponential decay*, *Calculating reacting masses* ← *Proportion*).
- No v1 topic depends on a new topic. v1 data is unchanged apart from the appended records.

**Standards:** 199 of the 230 topics carry at least one standard, with 273 topic–standard links in total: CCSS-Math 145, NGSS HS 78, UK NC KS3 32, NGSS MS 18.
- The only new standard records are **19 NGSS high-school PS codes** (HS-PS1-1…8, HS-PS2-1…6, HS-PS3-1…5), added as a new curriculum `ngss-hs`.
- Every CCSS-Math, NGSS-MS and KS3 key used was already in v1.

## Files (`out/`)
| File | Contents |
|---|---|
| `topics.ext.json` | The 230 new topics (same schema as `data/topics.json`) |
| `dependencies.ext.json` | The 521 new edges (same schema as `data/dependencies.json`) |
| `standards.ext.json` | The new `ngss-hs` curriculum (codes only) |
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
- **Placement.** New topics go into v1's existing domains where one fits (Matter & Materials, Energy, Forces & Motion, Algebra). *Functions & Modeling* is the one new domain.
- **Centrality** is an approximation: `min(1, descendants_in_merged_graph / 731)`, where 731 is the largest descendant count in v1. **v1 centralities were not recomputed.**
- **Standards policy.** Only codes that are real and verified are used. CCSS and KS3 keys were taken from v1's `curriculum-standards.json`.
  - NGSS HS codes were checked against the official nextgenscience.org DCI arrangement pages (HS-PS1, HS-PS2, HS-PS3) on 2026-10-18.
  - When no code fit well, the topic's standards were left empty rather than guessed. **No codes were invented.**
- **NGSS text.** The brief asked for official text, but NGSS text is **not** included. Marble's `PROVENANCE.md` makes NGSS a codes-only source, because its licence cannot be relicensed under ODbL and limits commercial use. `ngss-hs` follows that rule, so it has no `data` field and is listed in `codesOnlySources`.

## Validation results (on the merged dataset)
```
$ node scripts/validate.mjs        # repo validator, run in out/merged
✓ valid — 1820 topics, 3742 dependencies, 3280 standards, 183 clusters. Referential integrity + checksums OK.
$ node scripts/validate.mjs        # original v1, unchanged
✓ valid — 1590 topics, 3221 dependencies, 3261 standards, 183 clusters. Referential integrity + checksums OK.
$ python3 ext/check_schema.py      # JSON Schema (schema/*.schema.json)
OK for all 7 files (3 extension + 4 merged data files)
$ python3 ext/build.py             # extension checks
acyclic (Kahn on merged graph): true
dangling refs: 0 · self edges: 0 · duplicate edges: 0 · v1→new edges: 0
duplicate names within subject/domain (involving new topics): 0
age decreasing along hard edges: 0 · along soft edges: 0   (prereq.ageRangeStart ≤ topic.ageRangeStart)
new topics not reaching v1: 0 (via any edges) · 0 (via hard edges only)
every new topic has ≥1 prerequisite and an assessmentPrompt with {{name}}: yes
✓ extension checks passed
```

## Example prerequisite chains (hard edges; NEW = extension topic)
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
- **31 topics have no standard**, because no verified code fit well. Examples: gas laws, Kelvin scale, isotopes, relative atomic mass, electrolysis, systems of three equations, quadratic sequences, projectiles, circular motion, stopping distances.
- **NGSS text is omitted** (codes-only, as v1 does). The brief asked for official text, but the repo's licensing policy takes precedence.
- **No clusters** were added for the new topics, the new *Functions & Modeling* domain, or the 14–18 age bands. `clusters.json` is unchanged.
- **v1 centralities are not updated**, even though many v1 topics now have more descendants. New-topic centrality is an approximation.
- **Partial overlap with v1's coarse KS3 topics** (ages 11–14). Four exact duplicates were removed and ten topics renamed (see REVIEW.md). A few close neighbours remain on purpose, e.g. *Diffusion and particle movement* vs v1 *How Diffusion Works* (biology).
- **Self-review only.** A teacher or subject expert should review the topics, age bands and hard/soft calls before anyone relies on them.
- **US vs UK sequencing.** Age bands follow the KS3/KS4 order. US Algebra I and physical-science course placement varies.
- **Not covered yet:** waves, electricity and circuits, organic chemistry, geometry and trigonometry, statistics beyond line fitting, calculus.
