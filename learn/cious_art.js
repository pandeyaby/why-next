/* Data for the Year 5–6 suffixes lab (flag_cious.js; bundled in the main learn.js so the lab file stays small).
   Rules and word lists follow English Appendix 1 of the National Curriculum in England, Years 5 and 6. */
const CIOUSART=(()=>{
const P={paper:'#fffdf8',ink:'#111827',dim:'#374151',rim:'#1f2937',clue:'#0c4a6e',clueBg:'#e0f2fe',gap:'#1d4ed8',gapBg:'#dbeafe',okc:'#166534',okBg:'#dcfce7',bad:'#9f1239',badBg:'#ffe4e6',cons:'#7c2d12',consBg:'#fed7aa',vow:'#065f46',vowBg:'#a7f3d0'};
/* /ʃəs/: [stem before the gap, letter (c or t), clue word, why] */
const SHUS=[['vi','c','vice','vice ends in -ce, so the sh sound is spelt c: vicious.'],['cau','t','caution','caution has a t (-tion), so it is t: cautious.'],['gra','c','grace','grace ends in -ce, so c: gracious.'],
 ['ambi','t','ambition','ambition has -tion, so t: ambitious.'],['spa','c','space','space ends in -ce, so c: spacious.'],['nutri','t','nutrition','nutrition has -tion, so t: nutritious.'],['mali','c','malice','malice ends in -ce, so c: malicious.'],['infec','t','infection','infection has -tion, so t: infectious.']];
/* /ʃəl/: [stem, letter, the letter just before the ending, why] */
const SHUL=[['offi','c','i','i is a vowel, so -cial: official.'],['par','t','r','r is a consonant, so -tial: partial.'],['spe','c','e','e is a vowel, so -cial: special.'],['essen','t','n','n is a consonant, so -tial: essential.'],
 ['artifi','c','i','i is a vowel, so -cial: artificial.'],['confiden','t','n','n is a consonant, so -tial: confidential.'],['finan','c','n','An exception: n is a consonant, but finance ends in -ce, so financial keeps the c.']];
/* -ant/-ance or -ent/-ence: [stem before the gap, ending after it, a or e, clue, why] */
const ANCE=[['observ','nt','a','observation','observation has -ation, so a: observant.'],['innoc','nt','e','soft c','The c says s, a soft c, so e: innocent.'],['hesit','ncy','a','hesitation','hesitation has -ation, so a: hesitancy.'],
 ['intellig','nt','e','soft g','The g says j, a soft g, so e: intelligent.'],['toler','nce','a','toleration','toleration has -ation, so a: tolerance.'],['frequ','nt','e','qu','After qu it is e: frequent.'],['confid','nce','e','confidential','confidential has a clear e sound (con-fi-DEN-tial), so e: confidence.'],['subst','nce','a','substantial','substantial has a clear a sound (sub-STAN-tial), so a: substance.']];
/* families: [given word, right relative, wrong relative] */
const FAM=[['observant','observance','observence'],['decent','decency','decancy'],['hesitant','hesitancy','hesitency'],['frequent','frequency','frequancy'],['tolerant','tolerance','tolerence'],['obedient','obedience','obediance']];
/* proofreading sign: [word, fix or null, note] */
const SIGN=[['Our',null,''],['spatious',['spacious'],'space ends in -ce, so c: spacious.'],['café',null,''],['serves',null,''],['delicious',null,'delicious is right: it is a -cious word to learn by sight.'],['food.',null,''],
 ['The',null,''],['offitial',['official'],'i is a vowel, so -cial: official.'],['chef',null,''],['is',null,''],['patient',null,'patient is right: here the sh sound is spelt ti.'],
 ['and',null,''],['her',null,''],['assistence',['assistance'],'Assistant has an a, and the family keeps it: assistance.'],['is',null,''],['essential.',null,'essential is right: n is a consonant, so -tial.']];
const QS=[['Which is right?','spacious',[['spatious','sound'],['spaceous','keepe']]],['Which is right?','partial',[['parcial','cons'],['parshal','sound']]],
 ['Which is right?','innocent',[['innocant','softc'],['inocent','root']]],['Which is right?','observance',[['observence','fam'],['observanse','sound']]],
 ['Which is right?','nutritious',[['nutricious','tion'],['nutritous','sound']]],['Which is right?','frequency',[['frequancy','qu'],['frequensy','sound']]]];
return{P,SHUS,SHUL,ANCE,FAM,SIGN,QS}})();
