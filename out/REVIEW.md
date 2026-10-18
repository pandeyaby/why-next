# Review log: secondary extension (wave 1: v1-secondary-ext.0.1 · wave 2: v1-secondary-ext.0.2 · wave 3: v1-secondary-ext.0.3 · wave 4: v1-secondary-ext.0.4)

**Who reviewed it:** the same agent that wrote the topics did this review as a separate second pass. **No human, and no separate reviewer, has checked this work yet.** Please treat it as a first QA pass, not as independent expert review.

## Method
1. **Topic sample.** I drew 30 topics at random, stratified across the five domains (Python `random.seed(20261018)`). For each one I checked that the science and maths are correct and that the age band is right. I also checked that the evidence items are observable and that the assessment prompt matches the topic. Every standard code was checked against the official wording.
2. **Edge sample.** I drew 36 random new edges (`random.seed(7)`). For each one I asked three questions: is the dependency real, is hard vs soft right, and does the reason actually explain the link?
3. **Overlap audit.** I compared every new topic's name and description against all v1 topics in the same subject (Jaccard similarity on content words, flagged above 0.22), then judged each flagged pair by hand.
4. **Reason audit.** I listed every edge reason shorter than 42 characters to find vague or truncated wording.

## Findings and fixes (all applied)
| # | Finding | Fix |
|---|---|---|
| 1 | MS-PS1-4 (thermal energy and particle motion) on *Diffusion* was a loose fit | Removed. *Diffusion* is now left without a standard |
| 2 | MS-PS1-4 on *Gas pressure* was a loose fit | Removed. Kept KS3.Sci.Phys.MotionAndForces.5 |
| 3 | MS-PS1-1 (models of atomic composition of molecules) on *Subatomic particles* targets molecules, not subatomic structure | Removed |
| 4 | MS-PS3-5 on *Energy transfer pathways* is specifically about KE change and transfer | Removed |
| 5 | MS-PS3-3 (design a device to minimise/maximise thermal transfer) on *Rate of heat transfer* is a loose fit | Removed |
| 6 | *Gamma emission* was described as changing the element | Fixed. Only alpha and beta decay change the element |
| 7 | Isotopes were said to have "the same" chemical properties | Changed to "almost identical", with a reason based on electrons |
| 8 | Energy pathways listed sound as radiation | Fixed. Radiation means EM waves, and sound is noted as a mechanical wave |
| 9 | *Second law* evidence item was imprecise ("never the reverse") | Changed to "never spontaneously the reverse". The edge from *Dissipation* is now soft |
| 10 | *Exponential equations* (4ˣ = 8 → x = 3/2) need fractional exponents | Added a soft prerequisite → *Rational exponents* |
| 11 | Duplicate of v1 **mt_hCVPYlF-7Y** (integer powers) | Removed `al_exponent_notation` and repointed 4 edges |
| 12 | Duplicate of v1 **mt_bO-njVOige** "Powers of Ten Notation" | Removed `al_sci_notation` and repointed 3 edges |
| 13 | Duplicate of v1 **mt_JyfLtl_nhw** (work done = F × d) | Removed `en_work_calc` and repointed the work–energy principle edge |
| 14 | Duplicate of v1 **mt_fbYbe3YSVj** "Newton's Third Law" | Removed `mo_third_law_pairs` and repointed the momentum-conservation edge |
| 15 | Topics that partly overlap coarse KS3 v1 topics | Renamed and refocused 10 topics on what they add beyond v1: *Why heating curves have flat sections*, *Charges and masses of subatomic particles*, *Counting atoms in formulae and equations*, *Why dissipated energy is less useful*, *Cooling curves and rate of heat loss* (type R), *Calculating pressure in liquids (p = ρgh)* (type P), *Constant of proportionality (y = kx)*, *Inverse proportion equations (y = k/x)*, *Magnetic field patterns of wires and solenoids* (type R), *Slopes of parallel and perpendicular lines* |
| 16 | Edge *Trends across a period* ← *Halogens* was marked hard, but it is a contrast, not a requirement | Changed to soft |
| 17 | Edge *Measuring rates from graphs* ← *Factors affecting rate*: either can come first | Changed to soft |
| 18 | One reason was truncated ("Exponential functions are the other side") | Rewritten |

Net effect: 234 → 230 topics. After the fixes I rebuilt everything and re-ran all checks; they pass (see README_EXT.md).

## Not fixed: open doubts
- Most edge reasons are fine but short (about 75 are under 42 characters). A domain expert could make many of them more specific.
- *Diffusion and particle movement* (Matter) sits close to v1 **mt_i80I-1MLP2** "How Diffusion Works" (Organisms). They are kept separate because one is about physical mechanism and the other about cells. They are not linked, because the rules forbid edges from v1 topics to new ones.
- Age bands follow the English KS3/KS4 sequence, with the US grade for each CCSS/NGSS code as a check. US course sequencing (e.g. Algebra I in grade 8 vs grade 9) varies by district.

---

# Wave 2 review (Waves, Electricity & Circuits, Geometry & Trigonometry, Statistics & Probability, Calculus)

## Method
I did this review myself; nobody independent reviewed it.
1. **Overlap audit (all 250 first-draft wave-2 topics).** I compared every wave-2 name and description against v1 and wave-1 topics in the same and neighbouring domains, looking for duplicates and partial overlaps.
2. **Random sample of 40 items** (seed `20261019`, Python `random.Random`):
   - 25 topics, stratified: 4 each from Waves, Electricity & Circuits, Geometry, Data & Statistics and Calculus, 2 from Probability, plus 3 more at random.
   - 15 edges drawn from wave-2 topics outside the topic sample.
   - Each topic was checked for correctness (science and maths facts, worked numbers), age band, type, standards fit, evidence and prompt quality, and every incoming edge (hard/soft call, reason, direction). Each edge was checked for necessity, strength and reason.
3. **Standards pass (all 138 tagged wave-2 topics).** I listed each topic next to its standard's official title or description from `curriculum-standards.json`, and HS-PS4 text from nextgenscience.org, and checked fit. I also looked for missing verified tags among the untagged topics.
4. **Re-check.** I rebuilt and re-ran every validator after the fixes.

## Findings and fixes (all applied)
| # | Finding | Fix |
|---|---|---|
| W2-1 | Polygon-angles topic (`gt_polygon_angles`) duplicated v1 **mt_J03RFlVdas** | Removed |
| W2-2 | Earth's-field topic (`el_earth_field`) duplicated v1 **mt_56aspHjU19** (compass, field lines, Earth's field) | Removed |
| W2-3 | Colour-filter topic (`wv_colour_filters`) duplicated v1 **mt_qzGADV-NGe** (selective reflection, filters) | Removed |
| W2-4 | Lens ray-diagram topic (`wv_lens_ray_diagrams`) duplicated v1 **mt_FVERuBoCD1** | Removed. *Magnification* and *The eye, cameras and correcting vision* repointed to mt_FVERuBoCD1 + *Converging and diverging lenses* |
| W2-5 | `wv_ultrasound_seismic` (ultrasound + seismic waves): the seismic half duplicated v1 **mt__kFxuAgs6d** | Refocused as *Ultrasound imaging and detection* (prenatal scans, crack detection, sonar); soft prerequisite → mt__kFxuAgs6d |
| W2-6 | `ca_accumulation` (integral as accumulation) partly overlapped wave-1 *Physical meaning of gradient and area* (`fm_gradient_area`) | Refocused as *Net change as accumulated rate* (signed area, general rates) |
| W2-7 | KS3.ElectricityAndElectromagnetism.3/.6 on *Lenz's law* and *Faraday's law* were loose fits (KS3 covers only the generator effect and Faraday's historical contribution) | Removed while authoring |
| W2-8 | *Thin lens equation*: its only hard optics prerequisite was *Magnification*, with a mismatched reason ("extends ray-diagram work") | Hard → *Converging and diverging lenses* and v1 mt_FVERuBoCD1 (ray diagrams). *Magnification* made soft. Sign convention (real-is-positive) and f in metres for dioptres stated |
| W2-9 | *Quotient rule*: hard dependence on the chain rule is too strong (it can be derived from the product rule or taught as a formula). Its evidence item sin x / x needs trig derivatives, but that prerequisite was missing | Chain rule made soft, with a specific reason. Added a soft prerequisite → *Differentiating sin x and cos x* |
| W2-10 | *Sketching the gradient function* hard-depended on *first principles*, but gradient sketching is usually taught first, from the tangent idea | Hard → *From average to instantaneous rate of change*. First principles made soft |
| W2-11 | *Capacitors* said a capacitor "stores charge", but its net charge is zero | Reworded: stores energy by separating equal and opposite charges; Q is the charge on each plate |
| W2-12 | Photoelectric prompt implied blue light ejects electrons from any metal | Qualified to "for some metals" and "very bright red light" |
| W2-13 | *Column vectors and vector arithmetic* was tagged only N-VM.1, though it covers addition and scalar multiples | Added verified N-VM.4a and N-VM.5a |
| W2-14 | Verified tags missing on untagged topics | Added F-IF.7e → *Graphs of sine, cosine and tangent*; KS3.Maths.Geo.3 → *Bearings*; KS3.Maths.Stat.1 → *Estimating the mean from grouped data*; KS3.Maths.Prob.4 → *Mutually exclusive events and the OR rule*. I considered KS3.Maths.Geo.15 for *Surface area of cones and spheres* and rejected it, because sphere and cone surface-area formulae are KS4 |

The remaining sampled items had no problems. I checked the worked numbers: decibel ratios, the 44.1 kHz × 16-bit sampling size, the false-positive rate at 1/1000 prevalence, the 68–95–99.7 estimate, and UK and US mains values. Ages, types and hard/soft calls were also fine. All 15 sampled edges were kept unchanged. Two examples: *Integration by substitution* ← *The chain rule* (hard), and *Refractive index and Snell's law* ← *Angles of elevation and depression* (soft, for inverse-sine fluency).

Net effect: 250 → 246 wave-2 topics (476 in total). After the fixes, every check passes: the repo validator on merged and v1, JSON Schema on all 7 files, and the extension checks.

## Not fixed: open doubts (wave 2)
- **Close neighbours remain.** *Potential difference as energy per charge* (V = E/Q) sits next to wave-1 *Electrical power* (E = QV, P = IV). I kept both and did not link them: wave-1 topics were left unchanged so their ids and edges stay stable.
- **Short edge reasons.** Most wave-2 edge reasons are short (364 of 562 are under 42 characters). A domain expert could make them more specific.
- **Calculus age bands.** I banded calculus 16–18 (differentiation) and 17–18 (chain/product/quotient rules, integration techniques, differential equations) to follow A-level Year 12/13. AP Calculus sequencing differs.
- **Standards fit judgments.** Several HS-PS4 tags are judgment calls against the performance expectation's clarification statement, e.g. HS-PS4-1 on refraction with wavefronts, HS-PS4-5 on solar cells and optical fibres, and HS-PS4-3 on diffraction and interference. An NGSS specialist should confirm them.

---

# Wave 3 review (organic chemistry, hypothesis testing, matrices & complex numbers, series)

## Method
I did this review myself; nobody independent reviewed it.
1. **Build checks while authoring.** The extension checks run on every build. They caught one age violation (W3-1).
2. **Overlap audit (all 137 wave-3 topics).** I compared each topic's name and description with every v1, wave-1 and wave-2 topic in the same subject (Jaccard similarity on content words, flagged above 0.22, the wave-1 method) and judged each flagged pair by hand. I also checked by hand against the wave-1 topics wave 3 builds on: *Sum of an arithmetic series*, *Sum of a finite geometric series*, *Complex solutions of quadratics*, *Combustion of fuels* and *Systems of three linear equations*.
3. **Random sample of 30 items** (seed `20261020`, Python `random.Random`):
   - 20 topics, 5 from each requested area.
   - 10 edges drawn from wave-3 topics outside the topic sample.
   - Each topic was checked for correctness (chemistry and maths facts, worked numbers), age band, type, standards fit, evidence and prompt, and every incoming edge (necessity, hard/soft, reason).
4. **Standards pass (all 43 tagged wave-3 topics).** I compared each tag with the standard's text in `curriculum-standards.json` (CCSS, KS3) or on the nextgenscience.org HS-PS1/HS-PS2 pages, re-read on 2026-10-18.
5. **Re-check.** I rebuilt and re-ran every validator after the fixes.

## Findings and fixes (all applied)
| # | Finding | Fix |
|---|---|---|
| W3-1 | Soft edge *Cracking* (age 14) ← *Factors affecting the rate of reaction* (age 15) broke age monotonicity; the build check caught it | Edge removed (the catalyst point does not need it) |
| W3-2 | *Pollutants from burning fuels* repeated wave-1 *Combustion of fuels* (carbon monoxide and soot from incomplete combustion) | Refocused as *Sulfur dioxide, nitrogen oxides and particulates from fuels*; added a soft prerequisite → v1 *Acids, Alkalis & pH* for acid rain |
| W3-3 | *Balanced equations for burning alkanes* repeated the incomplete-combustion evidence from *Combustion of fuels* | Evidence and description now cover balancing any alkane and the oxygen needed per molecule |
| W3-4 | *Geometry of three-variable systems* partly repeated wave-1 *Systems of three linear equations*, which already interprets a unique solution as three planes meeting at a point | Renamed *Arrangements of three planes and consistency* and refocused on non-unique and inconsistent cases and the zero determinant |
| W3-5 | *Hypothesis test for a binomial proportion*: two edge reasons were sentence fragments ("Uses a p-value or" / "a critical region to decide") | Rewritten as complete reasons |
| W3-6 | *Complex conjugates and division* hard-depended on *Perfect squares and difference of squares*; (a + bi)(a − bi) can simply be multiplied out | Made soft, with a specific reason |
| W3-7 | *Summing series by the method of differences* has evidence "finds the limit of the sum as n → ∞" but no prerequisite on limits of sums | Added a soft prerequisite → *Partial sums and convergent series* |
| W3-8 | KS3.Sci.Chem.PIS.2 (filtration, distillation, crystallisation, chromatography) on *Fractional distillation of crude oil*: KS3 covers simple distillation, and fractional distillation of crude oil is KS4 content, the same reasoning that rejected a KS3 tag in wave 2 (W2-14) | Tag removed. The topic keeps a hard prerequisite on v1 *Separating Mixtures* |

The remaining sampled items had no problems. I checked the following and found them correct:
- **Chemistry facts:** alkane/alkene general formulae; E/Z (but-2-ene has E/Z isomers, but-1-ene does not); oxidation of primary, secondary and tertiary alcohols; the dichromate and bromine-water tests; conditions for hydrogenation, hydration and fermentation.
- **Statistics:** the binomial conditions; the complement step P(X ≥ 4) = 1 − P(X ≤ 3); the standard error σ/√n; one- and two-tailed splits.
- **Algebra and series:** non-commutativity, with (A + B)² ≠ A² + 2AB + B²; ranges of validity (ln(1 + x) for −1 < x ≤ 1, √(4 + x) for |x| < 4); Σr(r + 1) = n(n + 1)(n + 2)/3.

All 10 sampled edges were kept unchanged. Two examples: *Taylor series about a point* ← *Maclaurin series* (hard), and *Natural polymers* ← v1 *Chromosomes, Genes & DNA* (soft).

Every other flagged overlap pair is an intended neighbour, for example:
- *Alkanes* / *Alkenes*;
- *Determinant* / *Inverse*;
- the two chi-squared tests;
- *Maclaurin* / *Taylor*;
- a few false positives against primary "adding" topics.

Net effect: 137 wave-3 topics (613 in total), 330 wave-3 edges. After the fixes, every check passes: the repo validator on merged and v1, JSON Schema on all 7 files, the extension checks, and wave-1/2 stability (476/476 ids, 1083/1083 edges).

## Not fixed: open doubts (wave 3)
- **Standards coverage is thin outside matrices and complex numbers** (series 4/31, hypothesis testing 5/30, organic 9/38). This is because CCSS and NGSS have no codes that fit; I added nothing to fill the gap.
- **Several organic tags are judgment calls against the clarification statements:**
  - HS-PS1-4 on *Comparing fuels by energy released*: its assessment boundary excludes bond-energy totals, but the topic's reasoning matches the PE.
  - HS-PS1-6 on *Esterification as a reversible reaction*.
  - HS-PS1-7 on *Balanced equations for burning alkanes*.
  - KS3 EA.3 on *Biofuels and carbon neutrality*.
- **Age bands for Further-Maths content** are a judgment: matrices, polar-form complex numbers, Maclaurin series, chi-squared tests, and type I/II errors and power.
- **Short edge reasons.** 248 of the 330 wave-3 edge reasons are under 42 characters.

---

# Wave 4 review (Poisson & t-tests, eigenvalues & 3-D vectors, polar coordinates, aromatic chemistry, spectroscopy)

## Method
I did this review myself; nobody independent reviewed it.
1. **Build checks while authoring.** The extension checks run on every build. They caught one age violation (W4-1).
2. **Overlap audit (all 127 wave-4 topics).** Same method as wave 3: Jaccard similarity on content words against every v1, wave-1–3 and wave-4 topic in the same subject, flagged above 0.22 (57 pairs), each judged by hand. I also checked by hand against the earlier topics wave 4 builds on: the wave-3 binomial, normal-mean, confidence-interval and chi-squared topics, *Invariant points and lines*, *Modulus–argument form*, *Relative atomic mass*, *Relative formula mass* and *Solving trigonometric equations*.
3. **Random sample of 30 items** (seed `20261021`, Python `random.Random`):
   - 20 topics, 4 from each requested area (Poisson & t; eigenvalues & 3-D vectors; polar; aromatic; spectroscopy).
   - 10 edges drawn from wave-4 topics outside the topic sample.
   - Each topic was checked for correctness (chemistry and maths facts, worked numbers), age band, type, standards fit, evidence and prompt, and every incoming edge (necessity, hard/soft, reason).
4. **Standards pass (all 15 tagged wave-4 topics).** I compared each tag with the standard's text in `curriculum-standards.json` (CCSS) or on the nextgenscience.org HS-PS1 and HS-PS4 pages (HS-PS4 re-read on 2026-10-18).
5. **Re-check.** I rebuilt and re-ran every validator after the fixes.

## Findings and fixes (all applied)
| # | Finding | Fix |
|---|---|---|
| W4-1 | Soft edge *The transpose of a matrix* (age 16) ← *Inverse of a product* (age 17) broke age monotonicity; the build check caught it | Edge replaced by a soft edge → *Matrices: notation and order* (16). The transpose stays at 16 because it is a basic operation |
| W4-2 | *Polar coordinates and modulus–argument form* repeated wave-3 *Modulus–argument form*, whose evidence already includes explaining why both forms describe the same point | Refocused on what is new: the different angle conventions (0 ≤ θ < 2π and negative r in polar work, against the principal argument in −π < θ ≤ π). The third evidence item now converts such points to a principal argument. The N-CN.4 tag is kept because representing complex numbers in polar form is still the topic |
| W4-3 | *Halogenation of benzene* said "a halogen carrier such as FeBr₃ or AlCl₃", which could be read as pairing AlCl₃ with bromine | Now "FeBr₃ for bromine or AlCl₃ for chlorine" |
| W4-4 | *The molecular ion peak*: the prompt used an unknown alcohol, but alcohols often give a weak or missing M⁺ peak, so the task could mislead | Prompt changed to an unknown hydrocarbon |
| W4-5 | *How a mass spectrometer works* hard-depended on *Isotopes*; the working of the instrument does not need isotopes | Made soft ("Separating isotopes by mass is a key use") |
| W4-6 | Sampled edge *The Kekulé model of benzene* ← *Skeletal formulae* was hard, but the Kekulé structure can be drawn and understood as a displayed formula | Made soft |
| W4-7 | *The Cayley–Hamilton theorem* has the evidence "Uses it to find A⁻¹" but no link to inverse matrices | Added a soft prerequisite → *Inverse of a 2×2 matrix* |

The remaining sampled items had no problems. I checked the following and found them correct:
- **Statistics:** E(X) = Var(X) = λ, and over-dispersion as evidence against a Poisson model (mean 2.1 with variance 6.3); the standard error of a difference of means; that pairing usually increases power.
- **Matrices:** trace 7 and determinant 10 give eigenvalues 2 and 5; A² − 5A + 6I = 0 gives A⁻¹ = (5I − A)/6; Aⁿ = PDⁿP⁻¹.
- **Polar:** r = 4 cos θ is the circle centred at (2, 0) with radius 2; y = x² becomes r = tan θ sec θ; r = 2 sec θ is x = 2; ∫sin²θ from 0 to π = π/2.
- **Chemistry:** directing effects (–OH, –NH₂ and –CH₃ to positions 2 and 4; –NO₂ to position 3, so nitrate first to make 3-bromonitrobenzene); phenylamine is a weaker base than ammonia; the M+1 rule (about 1.1% per carbon); Cl and Br M+2 ratios; molecular formulae from CH₂ (Mr 56) and CH₂O (Mr 60).
- **Numbers checked outside the sample:**
  - Cl₂ peaks in the ratio 9:6:1.
  - Accurate masses: CO 27.9949, N₂ 28.0061, C₂H₄ 28.0313, C₂H₄O 44.0262.
  - Benzene hydrogenation: about −208 kJ mol⁻¹, against −360 predicted.
  - C–C bond lengths: 0.154, 0.139 and 0.134 nm.
  - The NO₂⁺ equation, balanced for atoms and charge.
  - Rose-curve petal counts and the cardioid area 3πa²/2.

Of the 10 sampled edges, one was changed (W4-6) and nine were kept. Two examples: *Tangents to polar curves* ← *Polar curves as parametric curves* (hard), and *Goodness of fit to binomial and Poisson models* ← *Degrees of freedom* (hard).

Every other flagged overlap pair is an intended neighbour, for example:
- the Poisson topics against their binomial counterparts;
- *One-sample t-test* / *Hypothesis test for a normal mean*;
- *Areas between polar curves* / *Areas between curves*;
- *Mass spectra of elements* / *Relative atomic mass* (it reads the spectrum and then uses that topic);
- pairs inside the same new area, such as lines vs planes.

Chi-squared goodness of fit and contingency tables were already covered in wave 3. Wave 4 therefore adds only fitting binomial or Poisson models with estimated parameters, and interpreting cell contributions. I dropped a planned topic on combining small expected frequencies because wave-3 *Chi-squared goodness-of-fit test* already has it as evidence.

Standards pass: all 15 tags kept.

Net effect: 127 wave-4 topics (740 in total), 358 wave-4 edges. After the fixes, every check passes: the repo validator on merged and v1, JSON Schema on all 7 files, the extension checks, and wave-1–3 stability (613/613 topics unchanged apart from centrality, 1413/1413 edges unchanged, 0 earlier → wave-4 edges).

## Not fixed: open doubts (wave 4)
- **Standards coverage is very thin** (15 of 127 topics). This is because there are no fitting codes. I added nothing to fill the gap.
- **Several tags are judgment calls:**
  - S-IC.5 on *Two-sample t-test*: the standard compares two treatments by simulation, while the topic uses a t-distribution.
  - S-IC.4 on *Confidence intervals using the t-distribution*, by the same reasoning as the wave-3 precedent.
  - HS-PS1-4 on *Enthalpy of hydrogenation and benzene's stability*: the topic uses an energy-level model, not bond-energy totals, which the assessment boundary excludes.
  - N-VM.12 on *Interpreting eigenvalues geometrically*.
- **Some prerequisites lie outside the requested areas.** These were added because nothing earlier covered them: variance of a random variable, unbiased estimates, the transpose, compound-angle formulae, s/p orbitals, σ/π bonds, empirical formulae. Wave-3 *Mean and variance of a binomial distribution* uses variance but cannot be linked to the new topic, because earlier topics never get new prerequisites.
- **Data ranges follow common A-level data sheets, which differ slightly between exam boards.** This applies to the IR ranges (O–H in alcohols about 3200–3550 cm⁻¹, O–H in acids about 2500–3300 cm⁻¹, C=O about 1680–1750 cm⁻¹) and to the diazonium temperature limit (below 10 °C).
- **Wave 4 sits deep in the graph.** Only 7 edges go straight to v1, and many chains are 25 or more topics long from early-years v1 topics. Age bands are almost all 16–18 or 17–18.
- **Short edge reasons.** 217 of the 358 wave-4 edge reasons are under 42 characters.
