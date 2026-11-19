/* Data for flagempf (empirical formula from percentage composition, ages 16–18). Sources: AQA A-level Chemistry 7405
   3.1.2.3 (empirical and molecular formula); OCR A H432 2.1.3 (amount of substance); Ar values as on the AQA and OCR data
   sheets (H 1.0, C 12.0, N 14.0, O 16.0, Na 23.0, Mg 24.3, P 31.0, S 32.1, Fe 55.8). Method: take 100 g so each
   percentage is a mass in grams; moles = mass ÷ Ar; divide by the smallest; multiply to whole numbers only if needed.
   Slips it targets: dividing by the atomic number, dividing oxygen by 32 (O2), reading the mass ratio as the atom ratio,
   dividing by the largest, rounding 1.5 or 1.33 to a whole number, and giving a ratio that is not the simplest. */
const EMPF=(()=>{
const AR={H:1.0,C:12.0,N:14.0,O:16.0,Na:23.0,Mg:24.3,P:31.0,S:32.1,Fe:55.8};
/* scene 1: divide each mass by the right number. chips: [value, tag]; ok = Ar, z = atomic number, two/four = Mr of the element molecule */
const CHIPS={C:[[12.0,'ok'],[6,'z']],H:[[2.0,'two'],[1.0,'ok']],O:[[8,'z'],[16.0,'ok'],[32.0,'two']],Fe:[[26,'z'],[55.8,'ok']],N:[[14.0,'ok'],[28.0,'two'],[7,'z']],P:[[124.0,'four'],[15,'z'],[31.0,'ok']]};
const DIVIDE=[{name:'Compound X',els:[['C',40.0],['H',6.7],['O',53.3]],f:'CH₂O'},{name:'An iron oxide',els:[['Fe',69.9],['O',30.1]],f:'Fe₂O₃'}];
/* scene 2: divide by the smallest number of moles */
const SMALL=[{name:'A hydrocarbon',els:[['C',80.0],['H',20.0]]},{name:'An oxide of nitrogen',els:[['N',30.4],['O',69.6]]},{name:'A sodium salt',els:[['Na',32.4],['S',22.6],['O',45.0]]}];
/* scene 3: scale a ratio to whole numbers. Ratios come from the data; best = the smallest multiplier that works */
const WHOLE=[{els:[['Fe',69.9],['O',30.1]],best:2},{els:[['C',81.8],['H',18.2]],best:3},{els:[['P',43.6],['O',56.4]],best:2}];
/* scene 4: build a formula until its percentages match the data */
const BUILD=[{name:'Sodium salt',els:[['Na',32.4],['S',22.6],['O',45.0]],want:[2,1,4]},{name:'A liquid fuel',els:[['C',52.2],['H',13.0],['O',34.8]],want:[2,6,1]}];
const ROBOT=[
 {say:'"50% sulfur and 50% oxygen by mass means the formula is SO."',ok:false,fix:'Equal masses are not equal atoms. S: 50 ÷ 32.1 = 1.56 mol; O: 50 ÷ 16.0 = 3.13 mol. That is 1 : 2, so SO₂.'},
 {say:'"Divide each mass by the relative atomic mass, not the atomic number."',ok:true,fix:'Moles = mass ÷ Ar. The atomic number counts protons and says nothing about mass.'},
 {say:'"For oxygen, divide by 32.0 because oxygen is O₂."',ok:false,fix:'We are counting O atoms in the compound, so divide by Ar = 16.0. Oxygen gas being O₂ does not matter here.'},
 {say:'"A ratio of 1 : 1.33 should be multiplied by 3."',ok:true,fix:'1.33 is about 4/3, so × 3 gives 3 : 4.'},
 {say:'"A ratio of 1 : 1.5 is close enough to round to 1 : 2."',ok:false,fix:'1.5 is a half, not experimental error. Multiply by 2 to get 2 : 3.'},
 {say:'"Glucose, C₆H₁₂O₆, has the empirical formula CH₂O."',ok:true,fix:'6 : 12 : 6 simplifies to 1 : 2 : 1, the simplest whole-number ratio.'}];
const QS=[
 {q:'A compound is 75.0% carbon and 25.0% hydrogen by mass. What is its empirical formula?',a:'CH₄',o:[['C₃H','mass'],['CH₂','z']]},
 {q:'An oxide of iron is 72.4% Fe and 27.6% O. What is its empirical formula?',a:'Fe₃O₄',o:[['FeO','round'],['Fe₂O₃','tworound']]},
 {q:'An oxide of nitrogen is 25.9% N and 74.1% O. What is its empirical formula?',a:'N₂O₅',o:[['NO₃','round'],['N₄O₅','o2']]},
 {q:'An oxide of sulfur is 40.0% S and 60.0% O. What is its empirical formula?',a:'SO₃',o:[['S₂O₃','mass'],['S₂O₆','notsimple']]},
 {q:'A hydrocarbon is 85.7% C and 14.3% H. What is its empirical formula?',a:'CH₂',o:[['C₂H₄','notsimple'],['C₆H','mass']]},
 {q:'After dividing by the smallest, Al : O is 1 : 1.50. What is the empirical formula?',a:'Al₂O₃',o:[['AlO₂','round'],['Al₄O₆','notsimple']]}];
const SLIP={
 mass:'You used the percentages as if they were atoms. Divide each by its Ar first: heavy atoms give fewer moles per gram.',
 z:'You divided by the atomic number. Moles = mass ÷ relative atomic mass (C 12.0, not 6).',
 o2:'You divided oxygen by 32.0 (O₂). In the compound you count O atoms, so use Ar = 16.0.',
 round:'You rounded a ratio like 1.5 or 1.33 to a whole number. Multiply every number by 2 or 3 instead.',
 tworound:'× 2 turns 1.33 into 2.66, which is still not whole. 1.33 is 4/3, so multiply by 3.',
 notsimple:'Those numbers share a factor. The empirical formula is the simplest whole-number ratio, so divide them down.',
 other:'Take 100 g, divide each mass by Ar, divide by the smallest, then scale to whole numbers.'};
const DESC=[
 'Cards show each element\'s mass in 100 g of the compound, with number chips under each. Tap the chip to divide by.',
 'Bars show the moles of each element. Tap the bar to divide every amount by.',
 'Bars show a mole ratio with dashed lines at whole numbers. Drag the multiplier knob, then lock in.',
 'Build a formula with the up and down arrows. Bars compare your formula\'s percentages with the data.',
 'A robot makes a claim about empirical formulae. Decide if it is right or a slip.'];
const DONE=['Moles come from dividing by Ar.','The smallest became 1 every time.','Whole numbers, simplest ratio.','Your formulas match the data.','All 6 claims checked.'];
return{AR,CHIPS,DIVIDE,SMALL,WHOLE,BUILD,ROBOT,QS,SLIP,DESC,DONE}})();
