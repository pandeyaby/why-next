# Review log: secondary extension (v1-secondary-ext.0.1)

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
