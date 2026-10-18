# Marble Skill Taxonomy: secondary extension (ages 11–18), **unofficial draft**

> **Status:** unofficial draft extension by Abhinav Pandey, built on top of the open [Marble Skill Taxonomy v1](https://github.com/withmarbleapp/os-taxonomy).
> **Generative Spark, Inc. (Marble) has not reviewed or endorsed it.** Version label: `v1-secondary-ext.0.6` (waves 1–5 plus a polish pass over reasons, clusters and centrality). Nothing has been published.

## Scope
This adds secondary-school micro-topics for **grades 6–12 (ages ~11–18; KS3–KS4/post-16)**. They plug into Marble v1's existing primary graph and its coarse KS3 topics. It was built in five waves on the same branch with the same method. Earlier ids and edge structure are never changed: after wave 5, all 740 wave-1–4 topics were unchanged (apart from their recomputed centrality), all 1771 wave-1–4 edges were unchanged, and no earlier topic depends on a later one. The later polish pass changed only edge-reason text and centrality values; no topic, id, edge or strength changed (see *Polish pass* below).

| Subject / domain | v1 | Wave 1 | Wave 2 | Wave 3 | Wave 4 | Wave 5 | Total |
|---|---|---|---|---|---|---|---|
| Science / Matter & Materials: particle model, atoms, bonding, reactions, moles, rates, equilibrium, nuclear (w1); organic chemistry (w3); aromatic chemistry, spectroscopy (w4); **carbonyl chemistry, amino acids, proteins, chromatography** (w5) | 40 | 64 | – | 38 | 49 | 44 | 235 |
| Science / Energy | 28 | 30 | – | – | – | – | 58 |
| Science / Forces & Motion | 27 | 31 | – | – | – | – | 58 |
| Science / Waves, Light & Sound | 25 | – | 43 | – | – | – | 68 |
| Science / Electricity & Circuits *(new domain, w2)* | 0 | – | 42 | – | – | – | 42 |
| Mathematics / Algebra: expressions … sequences (w1); **sigma notation, convergence, sums to infinity, binomial expansion, partial fractions, induction** (w3) | 25 | 74 | – | 18 | – | – | 117 |
| Mathematics / Functions & Modeling *(new domain, w1)*; parametric curves and modelling (w3); **hyperbolic functions, identities and inverses** (w5) | 0 | 31 | – | 2 | – | 12 | 45 |
| Mathematics / Geometry (incl. trigonometry) (w2); **3-D vectors, lines and planes; polar coordinates and curves; compound-angle formulae** (w4); **conics** (w5) | 69 | – | 59 | – | 25 | 19 | 172 |
| Mathematics / Data & Statistics (w2); hypothesis testing (w3); **t-tests, Poisson tests, chi-squared extensions** (w4) | 18 | – | 36 | 23 | 14 | – | 91 |
| Mathematics / Probability (w2); binomial distribution (w3); **Poisson and geometric distributions, combining random variables** (w4) | 15 | – | 15 | 7 | 16 | – | 53 |
| Mathematics / Calculus *(new domain, w2)*; **Maclaurin/Taylor series, parametric calculus, partial-fraction integration** (w3); polar areas and tangents (w4); **hyperbolic calculus, arc length, area of an ellipse** (w5) | 0 | – | 51 | 11 | 5 | 11 | 78 |
| Mathematics / Matrices & Complex Numbers *(new domain, w3)*; **eigenvalues, diagonalisation, Markov chains; polar links** (w4) | 0 | – | – | 38 | 18 | – | 56 |
| **New topics** | | **230** | **246** | **137** | **127** | **86** | **826** |

**Wave 5 by requested area:** hyperbolic functions 22 (12 definitions/graphs/identities/inverses/log forms + 10 calculus, incl. arc length and Maclaurin series) · conics 20 (incl. area of an ellipse in *Calculus*) · carbonyl chemistry 25 (aldehydes and ketones, tests, nucleophilic addition, acid derivatives, amines and amides, nitriles, practical techniques, functional-group map and multi-step synthesis) · amino acids 19 (shapes of molecules, chirality and optical isomerism, zwitterions, peptides and proteins, enzymes, chromatography). Prerequisites that nothing earlier covered were added inside these areas: odd and even functions, intermolecular forces and hydrogen bonding, nucleophiles, shapes of molecules (VSEPR), and chromatography with Rf values.

**Wave 4 by requested area:** Poisson & t-tests (incl. geometric distribution, combining random variables, chi-squared extensions) 30 · eigenvalues 15 + 3-D vectors/lines/planes 12 = 27 · polar coordinates (incl. compound-angle prerequisites and complex links) 21 · aromatic chemistry 23 · spectroscopy 26. Chi-squared goodness of fit and contingency tables were already covered in wave 3, so wave 4 adds only fitting binomial/Poisson models with estimated parameters and interpreting cell contributions.

**Wave 3 by requested area:** organic chemistry 38 · hypothesis testing (incl. binomial) 30 · matrices 19 + complex numbers 19 = 38 · series (incl. Maclaurin/Taylor and parametric) 31.

**Domain placement (same rule as before: use an existing domain wherever one fits).**
- Wave 2: Waves → *Waves, Light & Sound*; geometry & trig → *Geometry*; statistics & probability → *Data & Statistics* + *Probability*; *Electricity & Circuits* and *Calculus* are new domains.
- Wave 3: organic chemistry → *Matter & Materials* (alongside wave-1 bonding and reactions). Binomial distribution → *Probability*; hypothesis tests → *Data & Statistics*. Series split by content: sigma notation, convergence, geometric/binomial series, partial fractions and induction → *Algebra*; Maclaurin/Taylor, series–integral comparison, parametric differentiation/integration and partial-fraction integration → *Calculus*; parametric curves and parametric modelling → *Functions & Modeling*. *Matrices & Complex Numbers* is a new domain (v1 and waves 1–2 have no home for it).
- Wave 4: no new domains. Poisson/geometric/combinations of random variables → *Probability*; t-tests, Poisson tests and chi-squared extensions → *Data & Statistics*. Eigenvalues, transposes, matrix powers and Markov chains → *Matrices & Complex Numbers*; 3-D vectors, lines and planes → *Geometry* (next to wave-2 *Column vectors*). Polar coordinates, curves and compound-angle formulae → *Geometry*; polar areas, sin²/cos² integrals and tangents → *Calculus*; the three links to complex numbers → *Matrices & Complex Numbers*. Aromatic chemistry and spectroscopy → *Matter & Materials*.

- Wave 5: no new domains. Hyperbolic definitions, graphs, identities, equations and inverses → *Functions & Modeling*; hyperbolic calculus, arc length, Maclaurin series and modelling → *Calculus*. Conics → *Geometry* (next to wave-2 *The equation of a circle*), apart from *Area of an ellipse* → *Calculus*. Carbonyl chemistry and amino acids → *Matter & Materials*.

- **Topic types (all 826):** 313 conceptual, 369 procedural, 70 representational, 64 meta, 10 language.
- **Starting ages:** 11: 9 · 12: 29 · 13: 57 · 14: 121 · 15: 148 · 16: 221 · 17: 241.

**Edges:** 2031 new dependency edges (1504 hard, 527 soft), each with a reason saying what the dependent topic uses from the prerequisite (rewritten in the polish pass; see below).
- **442 bridge edges** go from a new topic into a v1 topic (275 hard), reaching 177 distinct v1 topics.
- **Wave 5 alone:** 260 edges (182 hard). 8 go to v1 (2 hard; 4 distinct v1 topics: separating mixtures, pure substances and mixtures, digestion and enzymes, ratio notation), 125 to wave-1–4 topics, and 127 stay among wave-5 topics.
- Main feeds into wave 5: Hyperbolic ← wave-1 exponentials/logarithms and quadratics, wave-2 calculus and trigonometry, wave-3 Maclaurin series; Conics ← wave-1 completing the square and inverse proportion, wave-2 circle equation, loci, transformations and tangents, wave-3 parametric differentiation, wave-4 polar coordinates; Carbonyl ← wave-3 organic (alcohols, acids, esters, mechanisms, tests) and wave-4 aromatic and spectroscopy topics; Amino acids ← wave-1 bonding, wave-2 polarisation and electric fields, wave-3 stereoisomers and natural polymers, wave-4 GC–MS, and wave-5 carbonyl topics.
- **Wave 4 alone:** 358 edges (246 hard). 7 go to v1 (2 hard; 6 distinct v1 topics: the electromagnetic spectrum, white light and colour, ratio notation, compound units, degrees and turns, separating mixtures), 40 to wave-1 topics, 56 to wave-2 topics, 84 to wave-3 topics, and 171 stay among wave-4 topics.
- Main feeds into wave 4: Poisson & t ← wave-3 hypothesis testing and binomial (24) and wave-2 Statistics/Probability (18); Eigenvalues & 3-D vectors ← wave-3 Matrices (20), wave-1 Algebra (8) and wave-2 Geometry (6); Polar ← wave-2 Geometry/trigonometry (18) and Calculus (6), plus wave-3 complex numbers (3); Aromatic ← wave-3 organic (17) and wave-1 bonding/reactions (13); Spectroscopy ← wave-3 organic (14), wave-1 Matter/Energy (12) and wave-2 Waves (4: photon energy, EM uses and hazards).
- **Wave 3 alone:** 330 edges (252 hard). 23 go to v1 (8 hard; 19 distinct v1 topics), 60 to wave-1 topics (39 hard), 55 to wave-2 topics (39 hard), and 192 stay among wave-3 topics.
- Main feeds into wave 3: Matrices & Complex ← wave-1 Algebra (20: systems, quadratics/complex roots, polynomials) and ← wave-2 Geometry (13: vectors, transformations, unit circle, radians); Organic ← wave-1 Matter (16: bonding, combustion, equilibrium, acids) and ← v1 Matter (11); Hypothesis testing ← wave-2 Statistics (15) and Probability (8); Series ← wave-1 Algebra (15: sequences, geometric series) and ← wave-2 Calculus (15).
- Wave 2 alone (for reference): 562 edges (441 hard); 179 to v1, 94 to wave 1.
- No v1 topic depends on a new topic. v1 data is unchanged apart from the appended records.

**Standards:** 398 of the 826 topics carry at least one standard, with 515 topic–standard links: CCSS-Math 317, NGSS HS 109, UK NC KS3 67, NGSS MS 22.
- Wave 5: 3 of 86 topics tagged, all conics: HSG-GPE.A.2 (*The parabola from focus and directrix*) and HSG-GPE.A.3 (*Foci of an ellipse*, *Foci of a hyperbola*), checked against the text in v1's `curriculum-standards.json`. CCSS has no hyperbolic-function codes. NGSS HS-PS1 and KS3 have no carbonyl, amino-acid or chirality PEs. KS3 *Pure and impure substances* covers basic chromatography, but the wave-5 chromatography topics (stationary/mobile phases, Rf values, TLC) are KS4/post-16 material, so, following the wave-3 rule (W3-8), they are not tagged. No new standard records.
- Wave 4: 15 of 127 topics tagged (16 links: CCSS-Math 13, NGSS HS 3). Poisson & t 6 of 30 (S-MD.2, S-MD.3, S-IC.4, S-IC.5); eigenvalues & 3-D vectors 4 of 27 (N-VM.1, N-VM.2, N-VM.8, N-VM.11, N-VM.12); polar 2 of 21 (F-TF.9 on compound-angle formulae, N-CN.4 on the complex link); aromatic 1 of 23 (HS-PS1-4 on the hydrogenation-enthalpy evidence); spectroscopy 2 of 26 (HS-PS4-5 on IR breathalysers/gas sensors and on MRI). No new standard records; the HS-PS4 page was re-read on 2026-10-18 for the spectroscopy fits.
- Wave 3: 43 of 137 topics tagged (CCSS-Math 36, NGSS HS 6, KS3 3). Matrices & complex 25 of 38 (N-VM.6–12, A-REI.8–9, N-CN.1–9); organic 9 of 38 (HS-PS1-1, -3, -4, -6, -7, HS-PS2-6, KS3 EA.3/EA.5); hypothesis testing 5 of 30 (S-MD.2, S-MD.3, S-IC.2, S-IC.4, S-IC.5); series 4 of 31 (A-APR.5, A-SSE.4).
- The only new standard records are **24 NGSS high-school PS codes** in `ngss-hs` (HS-PS1-1…8, HS-PS2-1…6, HS-PS3-1…5 from wave 1; HS-PS4-1…5 from wave 2). **Wave 3 added no new standard records:** every code it uses already existed in v1 or `ngss-hs`. The HS-PS1 and HS-PS2 pages were re-read on nextgenscience.org on 2026-10-18 to check the organic-chemistry fits.

## Files (`out/`)
| File | Contents |
|---|---|
| `topics.ext.json` | The 826 new topics (same schema as `data/topics.json`) |
| `dependencies.ext.json` | The 2031 new edges (same schema as `data/dependencies.json`) |
| `standards.ext.json` | The new `ngss-hs` curriculum (24 codes, codes only) |
| `clusters.ext.json` | 61 parent-facing cluster summaries, one per (subject, domain, starting age) group the new topics occupy (same schema as `data/clusters.json`) |
| `merged/data/*.json` | Full merged dataset (v1 + extension) with an updated `manifest.json` (counts, sha256, `extension` block) |
| `merged/scripts/validate.mjs` | Unmodified copy of the repo validator, so it can check the merged data |
| `build-report.json` | Machine-readable output of the extension checks |
| `viewer.html` | Single-file interactive viewer (works offline; open it in a browser). Each topic shows its centrality and the cluster summary for its subject, domain and starting age. |
| `REVIEW.md` | Review method, findings and fixes |

The sources are in `ext/`:
- `src_*.py` hold the topic definitions in a small DSL (`dsl.py`).
- `build.py` assigns ids, builds the outputs and runs the checks.
- `check_schema.py` runs JSON-schema validation.
- `clusters_ext.py` holds the 61 cluster summaries; `build.py` checks that every occupied group has exactly one.
- `make_viewer.py` and `viewer_template.html` build the viewer.

To rebuild: `python3 ext/build.py && python3 ext/check_schema.py && python3 ext/make_viewer.py && (cd out/merged && node scripts/validate.mjs)`.

## Method
- **Format.** Every topic has the same fields as v1: id, type, subject, domain, name, description, age range, centrality, evidence (2–4 observable items), an `assessmentPrompt` containing `{{name}}`, and standards.
- **Deterministic ids.** Each id is `"mt_" + base64url(sha256("marble-os-taxonomy/secondary-ext/v1:" + key))[:10]`, where `key` is a stable slug such as `al_quad_formula`. A salt would be appended on collision; none occurred. No id collides with v1.
- **Placement.** New topics go into v1's existing domains where one fits (Matter & Materials, Energy, Forces & Motion, Algebra, Waves Light & Sound, Geometry, Data & Statistics, Probability). *Functions & Modeling*, *Electricity & Circuits*, *Calculus* and *Matrices & Complex Numbers* are new domains.
- **Centrality** uses Marble's own method, reproduced exactly and recomputed on the merged graph (see *Polish pass → Centrality*).
- **Standards policy.** Only codes that are real and verified are used. CCSS and KS3 keys were taken from v1's `curriculum-standards.json`.
  - NGSS HS codes were checked against the official nextgenscience.org DCI arrangement pages (HS-PS1, HS-PS2, HS-PS3, and for wave 2 [HS-PS4](https://www.nextgenscience.org/dci-arrangement/hs-ps4-waves-and-their-applications-technologies-information-transfer)) on 2026-10-18.
  - **Wave 4 is mostly untagged.** CCSS-Math has no codes for the Poisson or t-distributions, eigenvalues, polar coordinates or 3-D lines and planes, and NGSS/KS3 have no aromatic-chemistry or spectroscopy PEs beyond the general ones used; only clear fits were tagged (see the standards bullet above).
  - **Calculus and most series/hypothesis-testing topics have no standards.** CCSS-Math has no codes for sigma notation, sums to infinity, Maclaurin/Taylor series, parametric equations, p-values, critical regions or type I/II errors, and the brief forbids guessing; wave-3 topics without a good fit are left empty.
  - **Calculus (wave 2) has no standards.** CCSS-Math has no calculus standards. AP Calculus CED identifiers (e.g. unit/topic numbers and learning objectives) are College Board material, are not in the repo's curricula, and have no repo-compatible, verifiable code format, so per the brief they were left empty rather than guessed.
  - When no code fit well, the topic's standards were left empty rather than guessed. **No codes were invented.**
- **NGSS text.** The brief asked for official text, but NGSS text is **not** included. Marble's `PROVENANCE.md` makes NGSS a codes-only source, because its licence cannot be relicensed under ODbL and limits commercial use. `ngss-hs` follows that rule, so it has no `data` field and is listed in `codesOnlySources`.

## Polish pass (v0.6): reasons, clusters, centrality
Only reason text and centrality changed. Every topic, id, edge and strength is the same as in the wave-5 commit (checked; see *Validation*).

### Edge reasons
- **Target:** every new edge whose reason was under 60 characters or started with the formula "Builds on…": 1723 of 2031 edges (1707 short, plus generic ones).
- **How:** the edges were dumped in 15 batches with the dependent topic's description and the prerequisite's name. Each reason was rewritten by hand to say what the dependent topic actually uses from the prerequisite (a fact, a formula, a method or a picture), in Marble's tone: one plain sentence, no full stop. A checker flagged reasons under 60 or over 140 characters, unknown or duplicate edges and missing coverage. The new text was written into `ext/src_*.py` by an AST-based script that replaces only the reason string of each matching `(ref, strength, reason)` tuple. The build then confirmed the edge set and strengths were unchanged.
- **Spot check:** 40 rewritten reasons (seeded random sample) were checked for accuracy. Three were fixed: one was inaccurate (velocity as the gradient of displacement attributed to velocity–time graphs) and two were vague. See REVIEW.md, P-1 to P-3.

| Reason length (characters) | mean | median | p10 | p90 | min | max | under 60 |
|---|---|---|---|---|---|---|---|
| Extension, before (2031 edges) | 44.8 | 43 | 28 | 65 | 9 | 111 | 1707 |
| Extension, after (2031 edges) | 78.8 | 79 | 64 | 92 | 60 | 115 | 0 |
| Marble v1, for comparison (3221 edges) | 83.2 | 76 | 54 | 122 | 22 | 275 | 572 |

### Clusters
- `out/clusters.ext.json` holds **61 clusters**, one for every (subject, domain, starting age) group the new topics occupy: 12 domains across ages 11–17. They use v1's format and its parent-facing "Your child is learning…" style. Lengths are 129–253 characters (mean 209; v1 mean 202, range 123–310).
- Each paragraph was written from the list of topics actually in that group. No group clashes with a v1 cluster, since v1 clusters stop at age 10.
- The merged `clusters.json` keeps v1's 183 clusters unchanged and appends the 61, giving 244. Both files validate against `schema/clusters.schema.json`.

### Centrality
- **Marble's method, reproduced exactly:** `centrality = (ancestors + descendants) / max over all topics of (ancestors + descendants)`. Ancestors and descendants are every topic connected to the topic through prerequisite edges (hard or soft) in either direction.
- **How it was found:** every v1 value is an exact multiple of 1/731. Candidate measures were compared on the v1 graph: descendants (Spearman 0.46 with v1; exact for 100 topics), PageRank, betweenness, harmonic, degree and others (Spearman 0.17–0.49). Ancestors plus descendants matched **all 1590 v1 values exactly** (maximum absolute error 5.6e-17; the maximum count is 731, for *One-to-one counting*). `build.py` checks this reproduction on every build.
- **Recomputed on the merged graph** for all 2416 topics. The new maximum is 1497 (still *One-to-one counting*). The extension file and the merged copy carry the same recomputed values for new topics (mean 0.156, range 0.005–0.368). The merged copy also carries recomputed v1 values; `data/topics.json` is untouched.
- **Previous method:** waves 1–5 used an approximation, `min(1, descendants / 731)`. It reproduces v1 poorly (Spearman 0.46) and ranks the new topics almost unrelated to the exact method (Spearman −0.12), so it has been replaced.

## Validation results (on the merged dataset, after wave 5 and the polish pass)
```
$ node scripts/validate.mjs        # repo validator, run in out/merged
✓ valid — 2416 topics, 5252 dependencies, 3285 standards, 244 clusters. Referential integrity + checksums OK.
$ node scripts/validate.mjs        # original v1, unchanged
✓ valid — 1590 topics, 3221 dependencies, 3261 standards, 183 clusters. Referential integrity + checksums OK.
$ python3 ext/check_schema.py      # JSON Schema (schema/*.schema.json)
OK for all 8 files (4 extension incl. clusters.ext.json + 4 merged data files)
$ python3 ext/build.py             # extension checks (out/build-report.json)
acyclic (Kahn on merged graph): true
dangling refs: 0 · self edges: 0 · duplicate edges: 0 · v1→new edges: 0
duplicate names within subject/domain (involving new topics): 0
age decreasing along hard edges: 0 · along soft edges: 0   (prereq.ageRangeStart ≤ topic.ageRangeStart)
new topics not reaching v1: 0 (via any edges) · 0 (via hard edges only)
every new topic has ≥1 prerequisite and an assessmentPrompt with {{name}}: yes
every occupied (subject, domain, age) group has one cluster summary; none clashes with a v1 cluster: yes (61)
centrality method reproduces all 1590 v1 values on the v1 graph: max abs error 5.6e-17
✓ extension checks passed
$ # wave-5 checks vs the wave-4 commit (5f05613)
wave-1–4 topics present and unchanged apart from centrality: 740/740 · wave-1–4 edges preserved (same strength and reason): 1771/1771 · earlier-topic → wave-5 edges: 0 · v1→new edges: 0
$ # polish-pass checks vs the wave-5 commit (f32a0b8); only reason text and centrality may change
data/, schema/, scripts/ untouched: yes
extension topics: same 826 ids; every field except centrality identical: yes · centrality changed: 826
extension edges: same 2031 (topic, prerequisite) pairs and strengths: yes · reasons changed: 1723
standards.ext.json unchanged: yes
merged v1 topics identical except centrality: yes · merged v1 edges identical incl. reasons: yes
merged v1 clusters preserved (183) + 61 new = 244 · v1→new edges: 0
```

## Example prerequisite chains (hard edges; NEW = extension topic)
### Wave 5
The longest hard-edge path into each topic, shown from the last v1 topic on it. Read left to right as "is needed for".

**Hyperbolic substitutions in integration** (15 topics from the v1 entry point): Plotting Linear Graphs (v1, 12) → What makes a function (13) → Sketching and describing qualitative graphs (13) → Key features of graphs (14) → Average rate of change (14) → From average to instantaneous rate of change (16) → The derivative from first principles (16) → Derivative notation (16) → Differentiating powers of x (16) → Differentiating sums and multiples (16) → Antiderivatives (16) → Integrating eˣ, 1/x, sin x and cos x (17) → Integration by substitution (17) → Integrals giving inverse hyperbolic functions (17) → Hyperbolic substitutions in integration (17)

missing Conics and planetary orbits
**Planning multi-step syntheses** (21 topics from the v1 entry point): Atoms, Elements & Compounds (v1, 11) → Charges and masses of subatomic particles (12) → Atomic number and mass number (13) → Electron shells and configurations (14) → Covalent bonding (14) → Why carbon forms so many compounds (14) → Hydrocarbons (14) → Alkanes (14) → Homologous series (14) → Alkenes (14) → The puzzle of benzene's structure (16) → The Kekulé model of benzene (16) → Enthalpy of hydrogenation and benzene's stability (17) → Evidence against the Kekulé model (17) → The delocalised model of benzene (17) → Electrophiles (17) → Electrophilic substitution mechanism (17) → Halogenation of benzene (17) → Friedel–Crafts alkylation and acylation (17) → Forming carbon–carbon bonds (17) → Planning multi-step syntheses (17)

**Choosing a chromatography method** (19 topics from the v1 entry point): Atoms, Elements & Compounds (v1, 11) → Charges and masses of subatomic particles (12) → Atomic number and mass number (13) → Electron shells and configurations (14) → Covalent bonding (14) → Why carbon forms so many compounds (14) → Hydrocarbons (14) → Alkanes (14) → Homologous series (14) → Alkenes (14) → Addition reactions of alkenes (15) → Curly arrows and reaction mechanisms (16) → Nucleophiles (17) → Amines as bases and nucleophiles (17) → Structure of amino acids (17) → Peptide bonds and dipeptides (17) → Hydrolysis of peptides and proteins (17) → Thin-layer chromatography of amino acids (17) → Choosing a chromatography method (17)

**Identifying an unknown carbonyl compound** (10 topics from the v1 entry point): Substituting into Formulae (v1, 11) → Calculating wave speed (v = fλ) (13) → Shared properties of electromagnetic waves (14) → Wave and particle models of light (16) → Photon energy (E = hf) (16) → Spectroscopy across the electromagnetic spectrum (16) → Bonds absorb infrared radiation by vibrating (16) → Reading an infrared spectrum (16) → Identifying functional groups from IR absorptions (16) → Identifying an unknown carbonyl compound (17)

**Conics in orbits and engineering** (8 topics from the v1 entry point): Proportion (v1, 12) → Constant of proportionality (y = kx) (13) → Inverse proportion equations (y = k/x) (14) → Limits at infinity and asymptotes (16) → The hyperbola (17) → Foci of a hyperbola (17) → Eccentricity and the focus–directrix definition (17) → Conics in orbits and engineering (17)

**Racemic products and single-enantiomer medicines** (16 topics from the v1 entry point): Atoms, Elements & Compounds (v1, 11) → Charges and masses of subatomic particles (12) → Atomic number and mass number (13) → Electron shells and configurations (14) → Covalent bonding (14) → Why carbon forms so many compounds (14) → Hydrocarbons (14) → Alkanes (14) → Homologous series (14) → Alkenes (14) → Addition reactions of alkenes (15) → Curly arrows and reaction mechanisms (16) → Nucleophiles (17) → Nucleophilic addition to carbonyl compounds (17) → Adding cyanide: hydroxynitriles (17) → Racemic products and single-enantiomer medicines (17)

### Wave 4
The longest hard-edge path, shown from the last v1 topic on it. Read left to right as "is needed for".

**Combined structure determination** (NEW, 17–18): Atoms, Elements & Compounds (v1, 11) → Subatomic particles (12) → Atomic number and mass number (13) → Electron shells (14) → Covalent bonding (14) → Why carbon forms so many compounds (14) → Hydrocarbons → Alkanes → Homologous series → Functional groups (15) → Alcohols (15) → Oxidising alcohols (15) → Primary, secondary and tertiary alcohols (16) → Tests for functional groups (16) → Identifying compounds with instrumental analysis (16) → How NMR works (17) → Chemical environments → Chemical shift → Integration → Interpreting proton NMR spectra → **Combined structure determination** (17). *(21 topics from the v1 entry point)*

**Coupling reactions and azo dyes** (NEW, 17–18): Atoms, Elements & Compounds (v1, 11) → … → Covalent bonding (14) → Why carbon forms so many compounds → Hydrocarbons → Alkanes → Homologous series → Alkenes (14) → The puzzle of benzene's structure (16) → The Kekulé model (16) → Enthalpy of hydrogenation (17) → Evidence against the Kekulé model → The delocalised model → Electrophiles → Electrophilic substitution → Nitration of benzene → Making phenylamine → Aromatic amines → Diazonium salts → **Coupling reactions and azo dyes** (17). *(22 topics)*

**Matrix powers by diagonalisation** (NEW, 17–18): Coordinate Transformations (v1, 11) → Column vectors and vector arithmetic (14) → Matrices: notation and order (16) → Multiplying matrices (16) → Matrices acting on vectors (16) → 2×2 matrices as transformations (16) → Invariant points and lines (17) → Eigenvectors and eigenvalues (17) → The characteristic equation → Finding eigenvectors of a 2×2 matrix → Diagonalising a matrix → **Matrix powers by diagonalisation** (17). *(12 topics)*

**Two-sample t-test** (NEW, 17–18): Proportion (v1, 12) → Inferring about a population from a sample (13) → Sampling variability (14) → The logic of a hypothesis test (16) → Null and alternative hypotheses → Test statistics → p-values (16) → Hypothesis test for a normal mean (17) → One-sample t-test (17) → **Two-sample t-test** (17). *(10 topics)*

**Areas between polar curves** (NEW, 17–18): Plotting Linear Graphs (v1, 12) → What makes a function (13) → … → Differentiating powers of x (16) → Antiderivatives (16) → Integrating eˣ, 1/x, sin x and cos x (17) → Integrating sin² and cos² with double-angle identities (17) → Calculating areas in polar coordinates (17) → **Areas between polar curves** (17).

### Wave 3
Same method as wave 2: the longest hard-edge path through new topics, then the shortest hard path inside v1 to a topic starting at age ≤10. Read left to right as "is needed for".

**Maclaurin series** (NEW, 17–18): Number Pattern Relationships (v1, 10) → What makes a function (13) → Qualitative graphs (13) → Key features of graphs (14) → Average rate of change (14) → Average to instantaneous rate of change (16) → Derivative from first principles (16) → Derivative notation (16) → Differentiating powers of x (16) → Sums and multiples (16) → Tangents and normals (16) → Small changes and linear approximation (17) → Approximating functions with polynomials (17) → **Maclaurin series** (17). *(14 topics)*

**De Moivre's theorem** (NEW, 17–18): Order of operations (v1, 10) → Ratio (v1, 11) → Square and cube numbers (v1, 11) → Solving x² = p and x³ = p (13) → Solving quadratics by square roots (14) → The quadratic formula (15) → The discriminant (15) → Complex solutions of quadratics (16) → The complex number system (16) → The Argand diagram (16) → Modulus and argument (16) → Modulus–argument form (16) → Multiplying and dividing in modulus–argument form (17) → **De Moivre's theorem** (17). *(14 topics)*

**Hypothesis test for a normal mean** (NEW, 17–18): Statistical Analysis Vocabulary (v1, 9) → Statistical questions and variability (11) → Populations and samples (12) → Random sampling methods (13) → Inferring about a population from a sample (13) → Sampling variability and sample size (14) → The logic of a hypothesis test (16) → Null and alternative hypotheses (16) → Test statistics and their null distribution (16) → p-values (16) → **Hypothesis test for a normal mean** (17).

**Condensation polymerisation** (NEW, 15–17): Drawing Particle Diagrams (v1, 7) → The Particle Model (v1, 11) → Atoms, Elements & Compounds (v1, 11) → Charges and masses of subatomic particles (12) → Atomic number and mass number (13) → Electron shells (14) → Covalent bonding (14) → Why carbon forms so many compounds (14) → Hydrocarbons (14) → Alkanes (14) → Homologous series (14) → Functional groups (15) → Alcohols (15) → Esters (15) → **Condensation polymerisation** (15). *(15 topics)*

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
- **No KS4 or A-level codes.** England publishes no official codes for KS4 or A level (the `uk-nc-2013` KS3 keys in v1 were built by Marble). To avoid inventing codes I added none, so topics at ages 14–18 are tagged only with CCSS/NGSS codes or left empty.
- **428 topics have no standard** (31 wave 1, 108 wave 2, 94 wave 3, 112 wave 4, 83 wave 5). In wave 5 only the three focus/directrix conics topics are tagged, because no verified code fit well. In wave 4 only 15 of 127 topics are tagged: the Poisson and t-distributions, eigenvalues beyond N-VM.11/12, polar coordinates, 3-D lines and planes, aromatic chemistry and NMR/IR/mass-spectrum interpretation have no matching CCSS, NGSS or KS3 codes. This includes all 51 wave-2 calculus topics and, in wave 3, most series (27 of 31), hypothesis-testing (25 of 30) and organic-chemistry (29 of 38) topics. NGSS has no organic-chemistry PEs beyond general bonding/reaction ones, and CCSS has no codes for sigma notation, convergence, Maclaurin/Taylor series, parametric equations or formal hypothesis tests (p-values, critical regions, type I/II errors). AP and A-level identifiers were not used because they are not in the repo and can't be verified in its format.
- **NGSS text is omitted** (codes-only, as v1 does). The repo's licensing policy takes precedence.
- **Clusters are one per starting age.** v1 clusters skip some ages within a domain; the extension writes one for every starting age the new topics occupy (11–17), so a few clusters cover only one to four topics (for example *Geometry* at 12, *Matter & Materials* at 11).
- **Merged centrality changes v1 values.** Recomputing on the merged graph raises the maximum from 731 to 1497, so v1 values in the merged copy change (1051 go down, 538 go up), even for the 848 v1 topics whose ancestor-plus-descendant count did not change. The files under `data/` are untouched. Because Marble's measure counts ancestors as well as descendants, topics at the end of long chains (for example *Racemic products and single-enantiomer medicines*, 0.368) score higher than their foundations.
- **Overlap.** Wave 1 removed four duplicates and renamed ten topics; wave 2 removed four more duplicates (polygon angles, Earth's magnetic field, colour filters, lens ray diagrams) and refocused two; wave 3 refocused three topics that partly repeated wave-1 topics (see REVIEW.md, W3-2 to W3-4). Wave 4 refocused one topic that repeated wave 3 (*Polar coordinates and modulus–argument form*, W4-2) and does not repeat wave-3 chi-squared tests, *Invariant points and lines* or wave-1 *Relative atomic mass*; it builds on them. Wave 3 deliberately does not repeat wave-1 *Sum of an arithmetic series*, *Sum of a finite geometric series* and *Complex solutions of quadratics*; it builds on them.
- **Series is split across domains** (Algebra, Calculus, Functions & Modeling), and electricity across Energy and Electricity & Circuits.
- **Self-review only.** A teacher or subject expert should review the topics, age bands and hard/soft calls before anyone relies on them. Edge reasons were rewritten and spot-checked (40 of 1723), but not reviewed one by one by a subject expert.
- **US vs UK sequencing.** Age bands follow the KS3/KS4/A-level order. Matrices, eigenvalues, 3-D lines and planes, polar coordinates, complex numbers in polar form, chi-squared and t-tests and Maclaurin series sit in A-level *Further* Mathematics or Statistics, and NMR, aromatic chemistry and azo dyes in A-level Chemistry, in England and in (+) CCSS standards or AP/college courses in the US; they are banded 16–18 or 17–18.
- **Wave 4 is even more downstream:** only 7 of its 358 edges reach v1 directly; it builds mainly on waves 2–3. Every wave-4 topic still reaches v1 through hard edges.
- **Some wave-4 prerequisites sit outside the requested areas** because nothing earlier covered them: variance of a random variable, unbiased estimates, transposes, compound/double-angle formulae, s/p orbitals, σ/π bonds and empirical formulae.
- **Wave 3 is mostly downstream.** Only 23 of its 330 edges reach v1 directly, because it builds on waves 1–2; every wave-3 topic still reaches v1 through hard edges.
- **Wave 5 adds some prerequisites inside the requested areas** because nothing earlier covered them: odd and even functions, intermolecular forces and hydrogen bonding, nucleophiles, shapes of molecules (VSEPR), and the principles of chromatography with Rf values.
- **Not covered yet:** surface area of revolution, differential-equation systems, non-parametric tests (sign, Wilcoxon), continuous random variables beyond the normal, UV-visible spectroscopy and colorimetry, Grignard reagents and other organometallics, DNA and nucleotide structure, the general second-degree conic with an xy term, and biology and earth science at secondary level.
