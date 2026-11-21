/* Data for flagnumword (number words to twenty, ages 5–6). Sources: DfE National Curriculum 2013 Year 1 Number and place
   value ("read and write numbers from 1 to 20 in numerals and words"); DfE English Appendix 1 Year 1 spelling (days and
   number words are common exception and pattern words); NCETM Mastering Number, Year 1 ("teen numbers are 10 and some
   more"); Fuson 1988 and Miura 1987 on the irregular English teen words (ones said first, so 17 is written 71).
   Slips it targets: reading a word from its first letter only (six/seven), writing the ones digit first for a teen
   word (seventeen → 71), mixing -teen and -ty (thirteen/thirty), the spelling changes three → thir, five → fif and
   eight + teen → eighteen, and inventing oneteen / twoteen for 11 and 12. */
const NWD=(()=>{
const WORD=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty'];
const READ=[6,9,2];
const TEEN=[17,14,19];
const SPELL=[{n:13,ok:'thirteen',o:[['threeteen','thir'],['thirty','ty']]},{n:15,ok:'fifteen',o:[['fiveteen','fif'],['fifty','ty']]},
 {n:18,ok:'eighteen',o:[['eightteen','eigh'],['eighty','ty']]},{n:12,ok:'twelve',o:[['twoteen','own'],['twenty','ty']]}];
const CARDS=[{w:'eleven',n:11},{w:'twelve',n:12},{w:'sixteen',n:16},{w:'twenty',n:20}];
const ROBOT=[{w:'sixteen',wrote:'61',ok:false,fix:'Sixteen says six first, but six is the ones. Teen means one ten, so write 1 then 6: 16.'},
 {w:'fourteen',wrote:'14',ok:true,fix:'Fourteen is one ten and four ones: 14.'},
 {w:'twelve',wrote:'20',ok:false,fix:'Twelve and twenty both start with tw. Twenty is 2 tens, 20. Twelve is 1 ten and 2 ones: 12.'},
 {w:'twenty',wrote:'20',ok:true,fix:'Twenty ends in -ty: 2 tens and no ones, 20.'}];
const DESC=[
 'A number word on a card, and number keys 1 to 10. Tap the numeral that matches the word.',
 'A teen number word, a tens box and a ones box, and keys 0 to 9. Build the numeral.',
 'A numeral and three spellings. Tap the right number word.',
 'A track from 11 to 20 and four word cards. Drag each card to its numeral.',
 'A robot reads number words and writes the numerals. Buttons: Right or Slip.'];
const DONE=[
 'six, nine and two. Read every letter: six and seven both start with s.',
 'Teen words say the ones first, but you write the ten first: seventeen is 17.',
 'thirteen, fifteen, eighteen, twelve. Three changes to thir, five to fif, and 12 has its own word.',
 'eleven, twelve, sixteen and twenty are on the track. Eleven, twelve and twenty have no teen in them.',
 'The robot slipped twice: 61 for sixteen, and 20 for twelve.'];
const QS=[
 {q:'Which numeral is nineteen?',a:'19',o:[['91','order'],['90','ty']]},
 {q:'How do you spell 15?',a:'fifteen',o:[['fiveteen','fif'],['fifty','ty']]},
 {q:'Which word is 12?',a:'twelve',o:[['twoteen','own'],['twenty','ty']]},
 {q:'Which word is 6?',a:'six',o:[['seven','first'],['sixteen','teen']]},
 {q:'Ben hears "sixteen" and writes 61. What went wrong?',a:'He wrote the ones first',o:[['Nothing, 61 is right','order'],['He wrote sixty','ty']]},
 {q:'How do you spell 13?',a:'thirteen',o:[['threeteen','thir'],['thirty','ty']]}];
return{WORD,READ,TEEN,SPELL,CARDS,ROBOT,DESC,DONE,QS}})();
