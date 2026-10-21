# Science review: flagships 9 (states), 10 (acids), 11 (atoms) and their reels

Reviewed Oct 20, 2026 against published sources. Reels were checked from ffmpeg stills (one every 3 s) and the narration and caption text in `whynext-reels/src/specs.json` and `reels.py`.
The verdicts are **correct**, **simplified-ok** (fine for ages 9–14) and **wrong**. Every wrong item in the labs is fixed in code; the reel corrections are listed for the Explainer bot.

## Flagship 9: states of matter (flag_state.js)
| Claim | Verdict | Source | Fix |
|---|---|---|---|
| Solid: packed in a fixed pattern, jiggling on the spot; liquid: touching but sliding past; gas: far apart and moving fast | correct | https://www.bbc.co.uk/bitesize/articles/z9r4jxs | – |
| Melting does not change the particles (same 48, same size) | correct | same | – |
| A liquid takes the shape of its container but keeps its volume; a gas has no fixed shape or volume and fills the jar | correct | same | – |
| The ice particles are drawn tightly packed (ice is actually slightly less dense than water) | simplified-ok | https://chem.libretexts.org (water anomaly) | – |
| Water melts at 0 °C and boils at 100 °C | simplified-ok (at 1 atm) | NIST WebBook | – |
| Honey is a liquid; sand is a solid (grains); steam is a gas and the visible cloud is droplets | correct | BBC Bitesize KS2 states of matter | – |
| Milk is a liquid; air is a gas | simplified-ok (milk is an emulsion and air a mixture of gases) | – | – |
| Ethanol −114/78, mercury −39/357, oxygen −218/−183, nitrogen −210/−196, iron 1538/2862 (°C) | correct | https://pubchem.ncbi.nlm.nih.gov | – |
| Salt (NaCl) boils at 1413 °C | **wrong** | PubChem / CRC 94th ed.: 1465 °C https://pubchem.ncbi.nlm.nih.gov/compound/Sodium-Chloride | changed to 1465 °C |
| Wax melts at 60 °C and boils at 370 °C | **wrong** (paraffin wax is a mixture that melts over about 46–68 °C and has no single boiling point) | https://www.hywax.com/blog/paraffin-wax-melting-point ; ASTM D87 | replaced by bromine, −7 / 59 °C (PubChem) |

## Flagship 10: acids and alkalis (flag_acid.js)
| Claim | Verdict | Source | Fix |
|---|---|---|---|
| pH runs 0–14: below 7 acidic, 7 neutral, above 7 alkaline | correct (simplified-ok: values outside 0–14 exist) | https://www.bbc.co.uk/bitesize/articles/z38bbqt | – |
| Lemon 2, vinegar 3, milk 6.5, pure water 7, toothpaste 9, oven cleaner 13 | correct | Oak National KS3 pH lesson; BBC Bitesize (toothpaste ≈ 9) | – |
| Soap 10 | simplified-ok (BBC gives 8–9 for some soaps, others 9–10; brands vary) | BBC Bitesize, same page | – |
| Red cabbage juice is purple; acid turns it red/pink; alkali turns it blue → green → yellow | correct (the colour map matches the RSC chart: 1 red, 2–3 pink, 4–5 violet, 6–7 purple, 8 indigo, 9 blue, 10–11 blue-green, 12 green-yellow) | https://edu.rsc.org/download?ac=512306 ; RHS chart | – |
| "Alkalis such as soap would turn it green" | simplified-ok (pH 9–10 gives blue-green) | RSC chart | – |
| Universal indicator: red → orange → yellow → green at 7 → blue → purple | correct | BBC Bitesize | – |
| Strong acid at 0.1 mol/L is pH 1; each drop of strong alkali cancels an equal amount (1:1); one drop too many goes alkaline | simplified-ok (strong monoprotic acid and alkali, ideal 1:1, no buffering) | OpenStax Chemistry 2e §14.2 | – |
| Water dilutes an acid: pH rises towards 7 but never reaches it or crosses it | correct | OpenStax Chemistry 2e §14.2 | – |
| Dilution message "Nine times the volume" | **wrong** (0.5 L topped up to 4 L is 8 times the volume; pH 1 → 1.9 is right for 8×) | arithmetic | the message now works the ratio out from the real volumes |
| Acid + alkali → salt + water | correct (for hydroxide alkalis) | BBC Bitesize neutralisation | – |

## Flagship 11: atoms, elements and compounds (flag_atom.js)
| Claim | Verdict | Source | Fix |
|---|---|---|---|
| Keep cutting gold and you reach one gold atom, the smallest bit of gold | correct | BBC Bitesize atoms | – |
| Element = one type of atom; compound = different atoms chemically joined; mixture = not joined | correct | https://www.bbc.co.uk/bitesize/guides/z2vj6sg | – |
| O₂ is an element; air is a mixture; helium + neon is a mixture; water and CO₂ are compounds | correct | same | – |
| Gold atoms packed in rows | correct (face-centred cubic) | – | – |
| Zoom captions: 2 cm coin, 0.1 mm grains | simplified-ok | – | – |
| Zoom caption "about 1 nanometre" over about 8–14 atoms across | **wrong** (a gold atom is about 0.29 nm across, so the view is about 3 nm wide) | https://www.rsc.org/periodic-table/element/79/gold (atomic radius 144 pm) | caption now reads "about 3 nanometres (one gold atom ≈ 0.3 nm)" |
| Bonding valences H 1, O 2, C 4, N 3 | correct | https://chem.libretexts.org (Lewis structures) | – |
| H₂O, CH₄, NH₃, H₂O₂ single bonds; O=C=O double bonds; HCN H–C≡N; O₂ O=O; N₂ N≡N | correct | LibreTexts 4.3 Lewis Structures and Multiple Bonding | – |
| Carbon monoxide drawn as C=O (valence counting) | **wrong** (CO is C≡O, a triple bond) | https://chem.libretexts.org/…/4.03:_Lewis_Structures_and_Multiple_Bonding | a lone C–O pair now gets a triple bond |
| Molecule names | correct | – | – |

## Reels (corrections for the Explainer bot)
| Reel | Claim / frame | Verdict | Source | Correction needed |
|---|---|---|---|---|
| r21_states_of_matter | particles always moving; solid fixed and vibrating; liquid sliding past; gas far apart, fast, filling the space; same particles, different motion | correct | BBC Bitesize states of matter | none |
| r21_states_of_matter | "Everything is made of tiny particles" | simplified-ok (all matter) | – | optional: "All matter is made of…" |
| r21_acids_reactions | pH 0–14; 7 neutral (pure water); lemon ≈ 2; soap ≈ 10; acid + alkali → salt + water; HCl + NaOH → NaCl + H₂O | correct / simplified-ok (pure water is pH 7 at 25 °C; soap 8–10) | BBC Bitesize z38bbqt; Oak KS3 | none on the science |
| r21_acids_reactions | the "lemon juice" label is cut off ("lemon juic") at 6–9 s | presentation error | – | move the label left or shrink the font so the whole word fits |
| r21_acids_reactions | the grey "e.g. HCl + NaOH → NaCl + H₂O" line overlaps the "salt + water" box at about 15–21 s | presentation error | – | move the example line down below the box |
| r21_atoms | nucleus of protons and neutrons; electrons in a cloud, not planet-like orbits; mostly empty space | correct (simplified-ok: a hydrogen-1 nucleus has no neutron) | LibreTexts 3.5 The Atomic Nucleus | none |
| r21_atoms | "a pea-sized nucleus in a stadium-sized atom"; "about 10,000 to 100,000 times wider than its nucleus" | correct | LibreTexts 3.5 (pea / stadium, 1/100,000); BBC Bitesize OCR (10,000); OpenStax 2.3 | none |
| r21_atoms | the caption wraps mid-word ("proto ns + neutrons") at about 3 s | presentation error | – | stop mid-word breaks: wrap "Nucleus:" / "protons + neutrons" |
| r21_atoms | the size fact runs off both edges of the frame at about 15–21 s ("tom ≈ 10,000–100,000 × wider than its nucleus") | presentation error | – | keep the two-line layout inside the safe area (fit width ≤ 90%) |

When these reel fixes land and the re-renders are checked, the three reels can drop `review` in `learn/reels/manifest.json`.

## Re-rendered science reels (checked Oct 20, 2026, 11:55 PM)
I checked the re-renders of r21_acids_reactions, r21_atoms and r21_states_of_matter from stills. All four presentation fixes landed: the "lemon juice" label fits, the example equation sits below the box, the caption reads "Nucleus: / protons + neutrons", and the size fact stays inside the frame. The states reel now says "All matter is made of moving particles". **Signed off:** `review` is removed in the manifest.

## Batch 1 science reels b039–b047
I checked the narration from `whynext-reels/v2/specs_b1.json` (the render spec) and the on-screen text from ffmpeg stills (six per reel, plus a 2 fps strip of b043 at 2–6 s).

| Reel | Claim | Verdict | Source | Status |
|---|---|---|---|---|
| b039 | You can't pour a brick: solid particles are packed tight and jiggle in place; liquid particles touch but slide, so a liquid pours; gas particles fly apart and fill the space | correct | https://www.bbc.co.uk/bitesize/articles/z9r4jxs | included |
| b040 | Sand pours, but each grain is a tiny solid piece of rock that keeps its shape, so sand is a solid | correct (grains are rock/mineral fragments) | BBC Bitesize KS2 states of matter | included |
| b041 | Melting doesn't change the particles; heat makes them move faster until they break free of their places; more heat and they escape as a gas (steam) | correct / simplified-ok (strictly, steam is invisible water vapour) | BBC Bitesize changes of state | included |
| b042 | Gas can be squashed because of big gaps between particles; liquid particles already touch, so water hardly compresses | correct | BBC Bitesize particle model; OpenStax Chemistry 2e §10.1 | included |
| b043 | pH 0–14, 7 neutral (pure water), lemon ≈ 2, soap ≈ 10 | science correct / simplified-ok | BBC Bitesize z38bbqt | **held back** (on-screen error below) |
| b043 | at about 4–5 s the moving pointer sits at pH 3–4 while the label under it reads "pH 9" (the label lags the pointer) | **wrong** (shows a false pH reading) | – | correction needed |
| b044 | Each step down the pH scale is ten times more acidic: pH 3 is ten times more acidic than pH 4 | correct (each pH unit is a tenfold change in H⁺ concentration) | BBC Bitesize GCSE "strong and weak acids / pH"; OpenStax Chemistry 2e §14.2 | included |
| b045 | Acid + alkali cancel out, giving a salt and water, much closer to neutral, around pH 7 | correct / simplified-ok ("around pH 7" is rightly hedged: it is exactly 7 only for matched strong acid and alkali) | BBC Bitesize neutralisation | included |
| b046 | Everything is made of atoms; a tiny nucleus of protons and neutrons; electrons form a fuzzy cloud; mostly empty space; pea = nucleus, stadium = atom; 10,000–100,000× wider | correct / simplified-ok (hydrogen-1 has no neutron) | LibreTexts 3.5; OpenStax 2.3; BBC Bitesize OCR | included |
| b047 | The planetary orbit is an old, simplified picture; today a fuzzy cloud; we can only say where electrons are likely to be | correct | LibreTexts (quantum model / orbitals); OpenStax Chemistry 2e §6.3 | included |

**Corrections for the Explainer bot:**
- **b043:** keep the "pH N" label locked to the pointer while it sweeps, or hide the label until the pointer stops. At about 4–5 s it reads "pH 9" with the pointer at 3–4. Once re-rendered and re-checked, it can be wired to mt_AN2kJE6I0s.
- Optional, b041: say "water vapour (steam)", because visible "steam" is really droplets. This is fine as it is for the age group.
