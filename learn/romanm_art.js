/* Data for flagromanm (Roman numerals to 1000, ages 9–10). Sources: DfE (2013) National Curriculum mathematics, Year 5
   number and place value ("read Roman numerals to 1000 (M) and recognise years written in Roman numerals"); Year 4 sets
   I to C. Values I 1, V 5, X 10, L 50, C 100, D 500, M 1000; subtractive pairs IV, IX, XL, XC, CD, CM only; at most three
   of a symbol in a row; V, L and D never repeated or put before a bigger symbol (Encyclopaedia Britannica, "Roman
   numeral"; NCETM Year 5 guidance). Slips it targets: adding every symbol (MCMXCIX read as 2221), CCCC for 400, invented
   pairs such as IM, XM and DM, reading the letters like digits, and thinking a longer numeral is bigger. */
const RMK=(()=>{
const VAL={I:1,V:5,X:10,L:50,C:100,D:500,M:1000};
/* the standard numeral for 1..3999 */
function roman(n){const T=[[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];let o='';for(const [v,r] of T)while(n>=v){o+=r;n-=v}return o}
/* value with the take-away rule: a symbol before a bigger one is subtracted */
function value(s){let t=0;for(let i=0;i<s.length;i++){const v=VAL[s[i]],nx=VAL[s[i+1]]||0;t+=v<nx?-v:v}return t}
/* one place-value chunk per non-zero digit, e.g. 1999 -> M | CM | XC | IX */
function chunks(n){return[1000,100,10,1].map(p=>Math.floor(n/p)%10*p).filter(v=>v>0).map(v=>({v,r:roman(v)}))}
const HUND=[300,500,700,400,900,1000];
const SPLIT=[1999,847,2024,444];
const YEARS=[2024,1066,1999,1485];
const COLS=[{name:'Thousands',p:1000,max:3},{name:'Hundreds',p:100,max:9},{name:'Tens',p:10,max:9},{name:'Ones',p:1,max:9}];
const PAIRS=[['DCCCLXXXVIII','M'],['MCM','MM'],['CDXC','DX'],['MMXIX','MCMXCIX']];
const ROBOT=[{s:'IM is 999.',ok:false,fix:'I only goes before V or X. 999 is CM + XC + IX: CMXCIX.'},
 {s:'MCMLXXXIV is 1984.',ok:true,fix:'M is 1000, CM is 900, LXXX is 80 and IV is 4: 1984.'},
 {s:'CD is 600.',ok:false,fix:'C before D takes away: 500 − 100 = 400. 600 is DC.'},
 {s:'MMXXV is 2025.',ok:true,fix:'MM is 2000, XX is 20 and V is 5: 2025.'},
 {s:'DM is 500.',ok:false,fix:'D is never put before a bigger symbol. 500 is just D.'},
 {s:'XM is 990.',ok:false,fix:'X only goes before L or C. 990 is CM + XC: CMXC.'}];
const DESC=['Tiles C, D and M and a tray. Tap tiles to make the number. Tap the tray to take the last tile off.',
 'A Roman numeral in letter tiles. Tap the gaps where one place-value chunk ends and the next begins.',
 'Four columns: thousands, hundreds, tens and ones. Tap the top of a column to go up, the bottom to go down.',
 'Two numerals. Tap the one that is the bigger number.',
 'A robot reads film credits. Buttons: Right or Slip.'];
const DONE=['C 100, D 500, M 1000. CD is 400 and CM is 900.',
 'Split into thousands, hundreds, tens and ones, then add the chunks.',
 'Write a year one place at a time: 1999 is M, CM, XC, IX.',
 'A longer numeral is not always bigger: work out each value first.',
 'The robot invented pairs (IM, DM, XM) and read CD the wrong way round.'];
const QS=[{q:'What number is MCMXCIX?',a:'1999',o:[['2221','add'],['2199','chunk']]},
 {q:'How is 400 written?',a:'CD',o:[['CCCC','four'],['DC','flip']]},
 {q:'How is 1990 written?',a:'MCMXC',o:[['MXM','pair'],['MDCCCCXC','four']]},
 {q:'Which is bigger: DCCCLXXXVIII or M?',a:'M',o:[['DCCCLXXXVIII','long'],['They are equal','same']]},
 {q:'What number is MMXXIV?',a:'2024',o:[['2026','add'],['20024','digit']]},
 {q:'What number is D?',a:'500',o:[['50','sym'],['1000','sym']]}];
return{VAL,roman,value,chunks,HUND,SPLIT,YEARS,COLS,PAIRS,ROBOT,DESC,DONE,QS}})();
