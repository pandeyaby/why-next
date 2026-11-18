/* Data for the chromatography lab (flag_chrom.js; bundled in the main learn.js so the lab file stays small).
   Model: a substance spends part of its time dissolved in the mobile phase (moving) and part held by the stationary
   phase (still), so it travels a fixed fraction of the solvent's distance: Rf = distance moved by the spot ÷ distance
   moved by the solvent front, both measured from the start line, so 0 ≤ Rf ≤ 1. Rf depends on the solvent, the
   stationary phase and the temperature; a pure substance gives one spot in every solvent. Dye values are illustrative. */
const CHROMART=(()=>{
const C={paper:'#fbfaf7',sheet:'#ffffff',ink:'#0f172a',soft:'#334155',line:'#64748b',front:'#0369a1',frontBg:'#e0f2fe',solv:'#bae6fd',pencil:'#57534e',
 ok:'#166534',okBg:'#dcfce7',bad:'#9f1239',badBg:'#ffe4e6',pick:'#6d28d9',pickBg:'#ede9fe',red:'#be123c',blue:'#1d4ed8',yellow:'#a16207',green:'#15803d'};
/* step 0, where does each dye end up: [name, colour, pull of paper 0–5, pull of solvent 0–5, Rf, band 0 near start | 1 middle | 2 near front, why] */
const DYES=[['Red','red',3,3,.5,1,'Red is pulled equally by the paper and the solvent, so it moves about half as far as the solvent.'],
 ['Blue','blue',5,1,.15,0,'Blue is held strongly by the stationary phase and barely dissolves in the solvent, so it stays near the start.'],
 ['Yellow','yellow',1,5,.8,2,'Yellow dissolves well in the mobile phase and is hardly held by the paper, so it moves almost with the solvent front.']];
/* step 1, measure: solvent front 8.0 cm above the start line; spots [colour, distance in cm] */
const FRONT=8,SPOTS=[['green',2.0],['red',4.4],['blue',6.0]];
/* step 2, identify: references [label, colour, Rf]; unknown U has spots at these Rf values */
const REFS=[['A','red',.2],['B','blue',.45],['C','yellow',.7],['D','red',.3]],UNK=[['red',.2],['blue',.45]];
const REFWHY={C:'U has no spot at Rf 0.70, so C is not in it.',D:'D is red too, but its Rf is 0.30, not 0.20. Colour alone does not identify a substance; the Rf must match.'};
/* step 3, set up the run: [label, is it a fault?, why] */
const SETUP=[['Start line in ink',1,'Ink is a mixture of dyes that would dissolve and run up with the samples. Draw the start line in pencil: graphite is insoluble.'],
 ['Solvent above the start line',1,'The samples would wash off into the solvent pool. The solvent must sit below the start line.'],
 ['No lid on the tank',1,'Without a lid, solvent evaporates from the paper and the front moves unevenly. A lid keeps the air saturated with solvent vapour.'],
 ['Small, concentrated spots',0,'This is right: small spots give sharp spots that do not overlap.'],
 ['Paper not touching the sides',0,'This is right: if the paper touches the tank, the solvent creeps unevenly.']];
/* step 4, same Rf in one solvent: two stages [question, options (first right), why for each wrong] */
const SOLV=[['P and Q both have Rf 0.50 in water. What next?',['Run them again in a different solvent','Conclude that P and Q are the same','Measure the water run more carefully'],
  ['One matching Rf can be a coincidence. Only a match in more than one solvent is good evidence.','The measurement was fine. Two different substances can share an Rf in one solvent.']],
 ['In ethanol, P has Rf 0.32 and Q has Rf 0.61. What can you conclude?',['P and Q are different substances','P and Q are the same substance','The ethanol run must have failed'],
  ['A pure substance would match in every solvent. Different Rf values in ethanol show they differ.','Nothing went wrong: each substance shares itself differently between ethanol and the paper.']]];
const ALT={water:[.5,.5],ethanol:[.32,.61]};
/* challenge: [question, right, [[wrong, tag]...]] */
const QS=[['A spot is 3.6 cm from the start line and the solvent front is 9.0 cm from it. Rf?','0.40',[['2.5','flip'],['0.36','base']]],
 ['A sample gives one spot in three different solvents. What does this suggest?','It is probably pure',[['It is a mixture of three substances','count'],['Its Rf is the same in every solvent','same']]],
 ['Why is the start line drawn in pencil?','Graphite does not dissolve in the solvent',[['Pencil is easier to rub out','why'],['Ink makes the spots smaller','why']]],
 ['In one solvent, dye X has Rf 0.85 and dye Y has Rf 0.15. Which is held more strongly by the stationary phase?','Y',[['X','flip2'],['Neither: Rf depends on spot size','size']]],
 ['A student reports an Rf of 1.2. What does this tell you?','A distance is wrong: Rf cannot be above 1',[['The substance moved faster than the solvent','big'],['The paper was too long','big']]],
 ['Amino acid spots are colourless. How do you see them?','Spray with a locating agent such as ninhydrin',[['Use a longer piece of paper','see'],['Add more solvent to the tank','see']]],
 ['The solvent level starts above the start line. What happens?','The samples dissolve into the solvent pool',[['The spots travel faster','level'],['Nothing changes','level']]]];
return {C,DYES,FRONT,SPOTS,REFS,UNK,REFWHY,SETUP,SOLV,ALT,QS}})();
