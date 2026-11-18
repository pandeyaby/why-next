/* Data for the static electricity flagship (flagstatic), ages 11–12 (NC England KS3 Physics 'Static electricity:
   separation of positive or negative charges when objects are rubbed together: transfer of electrons, forces between
   charged objects; the idea of electric field, forces acting across the space between objects not in contact'; IOP
   Supporting Physics Teaching 'Electrostatics'). Rubbing moves electrons from one material to the other; it does not
   make charge. The material that gains electrons is negative, the one that loses them is left positive. Like charges
   repel, unlike attract; a charged object also pulls on neutral bits by moving their electrons; a spark is charge
   jumping a small gap; charge stays where it is put on an insulator but flows away from a metal held in the hand.
   Slips it targets: positive charges moving, charge created by rubbing, like charges attracting, neutral objects
   feeling no force, the charge staying after a spark, and metals being 'uncharged materials'. */
const STA=(()=>{
const RUBS=4,BAL={p:6},JUM={p:8};
const PAIRS=[{a:'-',b:'-',t:'Two balloons, both rubbed on wool'},{a:'+',b:'-',t:'The wool jumper and its balloon'},{a:'+',b:'+',t:'Two jumpers that each lost electrons'},{a:'-',b:'+',t:'A rubbed comb and a rubbed glass rod'}];
const BITS=6;
const SPARKS=2,QMAX=5;
const ITEMS=[{t:'Plastic comb',k:0},{t:'Metal key',k:1},{t:'Glass rod',k:0},{t:'Copper pipe',k:1},{t:'Balloon',k:0},{t:'Steel spoon',k:1}];
const BINS=['Keeps its charge (insulator)','Charge flows away (conductor)'];
const T={
 signBal:'The balloon gained electrons, and electrons are negative. So the balloon is negative.',
 signJum:'The jumper lost electrons but kept all its positive charges, so it is left positive.',
 rubFirst:'Rub first: no electrons have moved yet, so both are still neutral.',
 like:'Both have the same sign. Like charges repel, so they push apart.',
 unlike:'One is positive and one is negative. Unlike charges attract, so they pull together.',
 flat:'Nothing happens: this balloon has no charge, so there is no pull.',
 noQ:'No spark: you have no extra charge yet. Shuffle your feet on the carpet first.',
 far:'Not yet: the gap is too big for this much charge. Move closer, or build up more charge.',
 item:['A plastic comb is an insulator: the electrons you rub on stay put.','A metal key is a conductor: the charge flows away through your hand.',
  'Glass is an insulator, so rubbed glass keeps its charge.','Copper is a conductor: charge flows along it and away through you.',
  'A rubber balloon is an insulator, which is why it holds its charge so well.','Steel is a metal, a conductor: the charge flows away through your hand.']};
const DESC=[
 'A balloon and a wool jumper. Each has the same number of plus and minus charges, so both are neutral.',
 'Two charged objects at a time, each marked plus or minus. Buttons: Attract or Repel.',
 'A charged balloon, an uncharged balloon and 6 tiny bits of paper on a table.',
 'A child on a carpet, a hand and a metal door handle. A charge meter shows extra electrons.',
 'Six rubbed objects to sort: insulators keep their charge, conductors lose it through your hand.'];
const DONE=[
 'Rubbing moved 4 electrons from the jumper to the balloon. The balloon is negative and the jumper positive. No charge was made: it only moved.',
 'Like charges repel and unlike charges attract. The force acts across the gap, without touching.',
 'The charged balloon pushes the paper\u2019s electrons away, so the near side is left positive and is pulled up. The uncharged balloon does nothing.',
 'Two sparks. The extra electrons jump the small gap to the metal, and you are neutral again. Lightning is the same thing, much bigger.',
 'Plastic, glass and rubber keep charge where it is rubbed. Metals pass it on, through you to the ground.'];
const QS=[
 {q:'You rub a balloon on your hair and the balloon becomes negative. What moved?',a:'Electrons moved from your hair to the balloon',o:[['Positive charges moved to your hair','plus'],['Rubbing made new negative charge','make']]},
 {q:'Two balloons are both negative. What happens when you hang them side by side?',a:'They push apart',o:[['They pull together','like'],['Nothing, they do not touch','gap']]},
 {q:'A charged comb is held over tiny bits of uncharged paper. What happens?',a:'The paper jumps up to the comb',o:[['Nothing, the paper has no charge','neutral'],['The paper is pushed away','neutral']]},
 {q:'You get a small shock from a door handle. What happened to your extra charge?',a:'It jumped to the metal, so you are neutral now',o:[['It is still on you','spark'],['It turned into heat and vanished','make']]},
 {q:'Why does a rubbed metal spoon held in your hand not pick up paper?',a:'The charge flows away through your hand',o:[['Metals cannot have charge','metal'],['Rubbing a spoon moves no electrons at all','metal']]},
 {q:'A jumper loses 5 electrons to a balloon. What is the jumper\u2019s charge?',a:'Positive',o:[['Negative','plus'],['Neutral','make']]}];
return{RUBS,BAL,JUM,PAIRS,BITS,SPARKS,QMAX,ITEMS,BINS,T,DESC,DONE,QS}})();
