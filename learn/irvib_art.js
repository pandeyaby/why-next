/* Data for the bond-vibration lab (flag_irvib.js; bundled in the main learn.js like teeth_art.js so the lab file stays small).
   BONDS: [label, left atom, right atom, mass L, mass R (u), force constant k (mdyn/Å = 100 N/m), bond order, data-book range].
   The lab's wavenumber is 1303·√(k/μ) cm⁻¹ (μ in u, k in mdyn/Å), the ball-and-spring (harmonic) model.
   MODES: vibrations to sort [name, IR active?, why]. GASES: [formula, share of dry air or note, traps Earth's IR?, why]. */
const IRART={
BONDS:{CH:['C–H','C','H',12,1,5.0,1,'2850–3100'],CD:['C–D','C','D',12,2,5.0,1,'about 2200'],CCl:['C–Cl','C','Cl',12,35.5,3.4,1,'550–850'],
 CO1:['C–O','C','O',12,16,5.0,1,'1000–1300'],CO2:['C=O','C','O',12,16,11.8,2,'1680–1750'],CO3:['C≡O','C','O',12,16,18.6,3,'about 2140']},
MODES:[['HCl stretch',1,'H and Cl share electrons unequally, so stretching changes the dipole.'],
 ['N≡N stretch (N₂)',0,'Both ends are the same atom. Stretching never makes a dipole.'],
 ['O=O stretch (O₂)',0,'Same atom at both ends: no dipole at any stretch.'],
 ['CO₂ symmetric stretch',0,'Both C=O bonds stretch together. The two dipoles stay equal and opposite, so the total stays zero.'],
 ['CO₂ asymmetric stretch',1,'One C=O lengthens while the other shortens, so a dipole appears and disappears.'],
 ['CO₂ bend',1,'Bending makes the molecule V-shaped for a moment, so a dipole appears.'],
 ['H₂O bend',1,'Water is already polar; bending changes the size of its dipole.']],
GASES:[['N₂','78% of air',0,'N₂ has one bond with the same atom at each end, so its stretch does not change the dipole.'],
 ['O₂','21% of air',0,'O₂ is like N₂: its only vibration keeps the dipole at zero.'],['Ar','about 1% of air',0,'Argon is single atoms: no bonds, nothing to vibrate.'],
 ['CO₂','about 0.04%',1,'Its bend absorbs near 667 cm⁻¹, in the middle of the band the warm ground gives out.'],
 ['H₂O','up to 4%',1,'Water vapour absorbs strongly with its bend and stretches.'],['CH₄','about 0.0002%',1,'Methane’s C–H bends absorb near 1300 cm⁻¹.']],
bank:[['Which bond absorbs infrared at the higher wavenumber?','C=O, because it is stronger than C–O',[['C–O, because it is longer','longer'],['Both the same: same atoms','same']]],
 ['Replacing H with heavier D in a C–H bond makes its absorption…','Lower in wavenumber',[['Higher in wavenumber','heavier'],['Unchanged: the bond strength is the same','massnot']]],
 ['Why does N₂ not absorb infrared, even though it has a strong bond?','Its stretch does not change the dipole',[['Its bond is too strong to vibrate','strong'],['It is a gas','gas']]],
 ['A bond vibrates at 1720 cm⁻¹. Which infrared does it absorb?','IR at about 1720 cm⁻¹',[['All infrared, equally','all'],['Only the highest frequencies','highest']]],
 ['Why is CO₂ a greenhouse gas but N₂ is not?','CO₂ has vibrations that change its dipole',[['CO₂ has more bonds, so it is heavier','heavy'],['N₂ is too rare','rare']]],
 ['What does a bond gain when it absorbs an infrared photon?','More vibrational energy',[['An extra electron','electron'],['It breaks','breaks']]]],
WHYM:{longer:'Longer, weaker bonds are softer springs, so they vibrate more slowly: lower wavenumber.',same:'Same atoms, but a double bond is a stiffer spring, so it vibrates faster.',
 heavier:'A heavier atom moves more slowly on the same spring, so the frequency drops.',massnot:'Bond strength is the same, but the reduced mass rises, so the frequency falls.',
 strong:'Strong bonds still vibrate. N₂’s problem is symmetry: no dipole change, so IR cannot push it.',gas:'Being a gas is not the reason: CO₂ and H₂O are gases and absorb IR.',
 all:'A bond only absorbs photons whose energy matches one step up in its vibration.',highest:'High energy is not enough: the photon must match the bond’s own frequency.',
 heavy:'Mass is not the test. What matters is a vibration that changes the dipole.',rare:'N₂ is 78% of air, so it is common. It does not absorb because its dipole never changes.',
 electron:'IR photons have too little energy to move electrons. They make bonds vibrate more.',breaks:'IR photons are far too weak to break a bond. They raise its vibrational energy.'}};
