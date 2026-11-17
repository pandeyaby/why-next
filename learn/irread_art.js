/* Data for the reading-an-infrared-spectrum lab (flag_irread.js; bundled in the main learn.js so the lab file stays small).
   Simplified spectra: each trough is [centre in cm⁻¹, half-width, depth in %], placed at the main absorptions in the NIST WebBook / SDBS
   spectra of propanone, ethanol, ethanoic acid, propan-1-ol and propan-2-ol. Ranges from the AQA data booklet and OCR data sheet. */
const IRREADART=(()=>{
/* each trough: [centre cm⁻¹, half-width, depth %]; simplified spectra with the main absorptions at their reference positions */
const SPEC={
 propanone:{name:'propanone',T:[[3005,22,22],[2925,18,14],[1715,16,84],[1420,14,40],[1362,12,55],[1220,16,62],[1092,12,22],[530,14,32]]},
 ethanol:{name:'ethanol',T:[[3340,130,62],[2975,22,46],[2895,18,28],[1450,14,24],[1380,12,28],[1088,14,38],[1050,16,72],[880,12,40]]},
 acid:{name:'ethanoic acid',T:[[3000,260,52],[2950,16,20],[1712,18,86],[1410,16,44],[1295,18,62],[940,22,36],[620,14,30]]},
 prop1:{name:'propan-1-ol',T:[[3330,125,60],[2965,20,46],[2880,18,32],[1460,14,26],[1220,12,14],[1060,16,70],[970,12,46],[890,12,20]]},
 prop2:{name:'propan-2-ol',T:[[3350,125,60],[2972,20,50],[1465,14,22],[1380,10,34],[1368,10,30],[1130,14,58],[950,12,52],[818,12,30]]}};
const tAt=(sp,v)=>{let a=0;for(const [c,w,d] of sp.T)a+=d*Math.exp(-Math.pow((v-c)/w,2)/2);return Math.max(3,96-a)};
const TARGETS=[['A',1715],['B',1220],['C',3005]];
const REG=[['Bonds to H: O–H, N–H, C–H',4000,2500,'X–H'],['Triple bonds: C≡N, C≡C',2500,2000,'≡'],['Double bonds: C=O, C=C',2000,1500,'C=O'],['Fingerprint region',1500,500,'fingerprint']];
const REG_ORDER=[2,0,3,1];
const KINDS=[['acid','Carboxylic acid'],['ethanol','Alcohol'],['propanone','Ketone']];
const KIND_WHY={ethanol:'This has a broad, rounded O–H trough near 3340 and no strong trough near 1700, so there is no C=O: an alcohol.',
 propanone:'There is a strong, sharp trough at 1715 (C=O) but no broad trough above 3200, so no O–H: a ketone.',
 acid:'There is a very broad O–H trough from about 2500 to 3300 that swallows the C–H, plus a strong C=O at 1712: a carboxylic acid.'};
const REFS=['prop1','prop2','ethanol'];
const CLAIMS=[['propanone','“It has an O–H group.”',false,'No broad trough between 3230 and 3550, so no O–H. The small sharp troughs near 3000 are C–H.'],
 ['acid','“It contains a C=O bond.”',true,'Yes: the strong, sharp trough at about 1712 cm⁻¹ is C=O.'],
 ['ethanol','“The sharp trough at 2975 is the O–H.”',false,'No: that narrow trough is C–H. The O–H is the broad, rounded one centred near 3340.'],
 ['prop2','“You can name it from the troughs above 1500 alone.”',false,'No: propan-1-ol looks almost the same above 1500. Only the fingerprint region below 1500 tells them apart.']];
const Q=[['On an IR spectrum, an absorption shows as…','a trough pointing down',[['a peak pointing up','up'],['a coloured line','colour']]],
 ['The x-axis of an IR spectrum runs…','from about 4000 on the left down to 500 cm⁻¹',[['from 0 up to 4000 cm⁻¹','dir'],['in nanometres','unit']]],
 ['A strong, sharp trough at 1720 cm⁻¹ shows…','a C=O bond',[['an O–H bond','oh'],['a C–H bond','ch']]],
 ['A broad trough at 3350 cm⁻¹, no trough near 1700. The compound is…','an alcohol',[['a ketone','ket'],['a carboxylic acid','acid']]],
 ['What is the fingerprint region used for?','matching a spectrum to a known compound',[['finding O–H bonds','fpoh'],['nothing, it is noise','noise']]],
 ['Transmittance falls to 10% at one wavenumber. How much IR was absorbed there?','about 90%',[['about 10%','pct'],['none','pct']]]];
const FIX={up:'IR spectra plot transmittance, so an absorption is a dip: less radiation gets through.',colour:'It is a plot of transmittance; absorptions are troughs.',dir:'Wavenumber runs backwards: about 4000 cm⁻¹ on the left, falling to about 500 on the right.',
 unit:'IR spectra use wavenumber in cm⁻¹: the number of waves per centimetre.',oh:'O–H gives a broad trough above 2500, not a sharp one near 1700.',ch:'C–H absorbs near 2850–3100, not 1720.',
 ket:'A ketone would show a strong C=O near 1700.',acid:'An acid shows C=O near 1700 as well as a very broad O–H.',fpoh:'O–H sits above 3000. The fingerprint region is below 1500 and is matched as a whole pattern.',noise:'It is real absorption by the whole molecule, unique to each compound.',pct:'Transmittance is the part that gets through. 10% through means about 90% absorbed.'};
return{SPEC,tAt,TARGETS,REG,REG_ORDER,KINDS,KIND_WHY,REFS,CLAIMS,Q,FIX}})();
