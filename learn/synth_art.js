/* Data for the synthesising-across-multiple-texts flagship (flagsynth), ages 10–11. CCSS ELA RI.5.9 ("integrate
   information from several texts on the same topic in order to write or speak about the subject knowledgeably"),
   W.5.8 ("summarize or paraphrase information in notes and finished work, and provide a list of sources"); KS2
   English writing: "précis longer passages", "note and develop initial ideas, drawing on reading and research".
   Hedgehog facts checked against the British Hedgehog Preservation Society and PTES/Hedgehog Street guidance. */
const SYN=(()=>{
const SRC={A:['📗','Book: Garden Wildlife'],B:['💻','Website: hedgehog charity'],C:['📰','Leaflet: council']};
const FACTS=[['A','Hedgehogs eat beetles and caterpillars.',0],['B','Earthworms are a big part of a hedgehog’s diet.',0],
 ['A','Hedgehogs hibernate from about November.',1],['C','Hibernation can last until March.',1],
 ['B','A 13 cm hole in a fence lets hedgehogs move between gardens.',2],['C','Never give hedgehogs milk. Leave out water.',2]];
const IDEAS=[['🍽️','Food'],['❄️','Winter'],['🏡','Helping them']];
const JOIN=[{idea:0,opts:[['Hedgehogs eat beetles, caterpillars and lots of earthworms.','ok'],
  ['The book says they eat beetles. The website says they eat worms.','stack'],['Hedgehogs eat beetles and caterpillars.','one']]},
 {idea:1,opts:[['Hedgehogs hibernate all year round.','wrong'],['Hedgehogs hibernate from about November until March.','ok'],['Hedgehogs hibernate in November.','one']]},
 {idea:2,opts:[['The website says cut a hole. The leaflet says no milk.','stack'],['Give hedgehogs milk and a hole in the fence.','wrong'],
  ['To help, cut a 13 cm hole in your fence and leave water, not milk.','ok']]}];
const RANGE={a:['A','Hedgehogs travel about 1 km a night.',1],b:['B','They can travel up to 2 km a night.',2],max:3};
const OWN=[{src:['C','Never give hedgehogs milk, because it can make them very ill.'],opts:[
  ['Never give hedgehogs milk, because it can make them very ill.','copy'],['Never give hedgehogs milk, as it can make them really ill.','patch'],
  ['The leaflet warns that milk upsets a hedgehog’s tummy, so leave out water instead.','ok']]},
 {src:['B','A 13 cm hole in your fence lets hedgehogs move between gardens.'],opts:[
  ['The charity website suggests a small gap, about 13 cm, so hedgehogs can roam from garden to garden.','ok'],
  ['A 13 cm hole in your fence lets hedgehogs move between gardens.','copy'],['A 13 cm gap in your fence lets hedgehogs move between gardens.','patch']]}];
const PARA={slots:['Topic sentence','Facts joined from the sources','How to help','List of sources'],items:[
 ['Sources: Garden Wildlife (book), a hedgehog charity website, a council leaflet.',3],
 ['Hedgehogs eat beetles, caterpillars and earthworms, and hibernate from about November to March.',1],
 ['Hedgehogs are garden visitors that need our help.',0],
 ['To help, cut a 13 cm hole in your fence and leave out water, not milk.',2]]};
const QS=[
 {q:'You have notes from 3 sources. How should you plan your paragraph?',a:'Group the notes by idea, across the sources',o:[['Write about one source, then the next','stack'],['Use only the best source','one']]},
 {q:'Which sentence synthesises the book and the website?',a:'Hedgehogs eat beetles, caterpillars and earthworms',o:[['The book says beetles. The website says worms.','stack'],['Hedgehogs eat beetles','one']]},
 {q:'One source says 1 km a night, another says up to 2 km. What do you write?',a:'Hedgehogs travel about 1 to 2 km a night',o:[['Hedgehogs travel 3 km a night','add'],['The website is wrong','pick']]},
 {q:'You change one word in a sentence from a source. Is that your own words?',a:'No, that is still copying',o:[['Yes, one new word is enough','patch'],['Yes, if the sentence is short','patch']]},
 {q:'Why list your sources at the end?',a:'So readers know where the facts came from and can check them',o:[['To make it longer','none'],['You do not need to','none']]},
 {q:'Which is in your own words and credits the source?',a:'The leaflet warns that milk makes hedgehogs ill',o:[['Never give hedgehogs milk, because it can make them very ill','copy'],['Hedgehogs love milk','wrong']]}];
return{SRC,FACTS,IDEAS,JOIN,RANGE,OWN,PARA,QS}})();
/* helpers kept out of the lab file: the copy meter and the range and join feedback */
const SYNF=(()=>{const words=t=>t.split(/\s+/).filter(Boolean),bare=w=>w.toLowerCase().replace(/[^a-z0-9’']/g,'');
/* which words of t sit inside a run of 3+ words that also appears in the source s */
function copied(t,s){const a=words(t).map(bare),b=words(s).map(bare),hot=a.map(()=>false);
 for(let i=0;i+2<a.length;i++)for(let j=0;j+2<b.length;j++)if(a[i]===b[j]&&a[i+1]===b[j+1]&&a[i+2]===b[j+2]){hot[i]=hot[i+1]=hot[i+2]=true}return hot}
function rangeSays(L,H){const lo=SYN.RANGE.a[2],hi=SYN.RANGE.b[2];if(L===lo&&H===hi)return`About ${lo} to ${hi} km a night. The book’s ${lo} km and the website’s ${hi} km both fit.`;
 const bits=[];if(L<lo)bits.push(`It starts at ${L} km, but no source says less than about ${lo} km.`);if(L>lo)bits.push(`It starts at ${L} km, which leaves out the book’s ${lo} km.`);
 if(H>hi)bits.push(`It goes to ${H} km, but no source says more than ${hi} km. Do not add facts.`);if(H<hi)bits.push(`It ends at ${H} km, which leaves out the website’s ${hi} km.`);return bits.join(' ')}
const JOINWHY={stack:'That stacks the sources one after another. Join the facts into one idea.',one:'That uses only one of the sources. Bring in the other fact too.',wrong:'Neither source says that. A synthesis must stay true to every text.'};
return{words,copied,rangeSays,JOINWHY}})();
