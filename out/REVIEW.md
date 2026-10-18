# Review log: secondary extension (wave 1: v1-secondary-ext.0.1 · wave 2: v1-secondary-ext.0.2)

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
