/* Data for flagsemi (punctuating the boundary between independent clauses with a semi-colon, colon or dash, ages
   10–11). Sources: DfE (2013) National Curriculum in England, English Appendix 2, Year 6 'use of the semi-colon, colon
   and dash to mark the boundary between independent clauses [for example, It's raining; I'm fed up]' and its glossary
   entries for clause, independent clause, colon and semi-colon; STA (2023) KS2 English grammar, punctuation and
   spelling test framework; Oxford Guide to Plain English (Cutts, 5th ed.) on colons, semicolons and dashes; Truss
   (2003) on the comma splice. Slips it targets: joining two clauses with a comma (comma splice), putting a semi-colon
   or colon in front of a part that cannot stand alone, using a semi-colon where the second clause explains the first,
   and thinking a dash is only for lists or interruptions. */
const SEM=(()=>{
const GROUPS=[{t:'The bus was late',ok:1},{t:'because it snowed',ok:0,why:'"Because it snowed" leaves you asking: what happened? It cannot stand alone.'},
 {t:'We missed the start',ok:1},{t:'after the long match',ok:0,why:'"After the long match" has no verb. It is a phrase, not a clause.'},
 {t:'She smiled',ok:1,why:'Short, but it has a subject (she) and a verb (smiled), and it makes sense alone.'},{t:'running for the door',ok:0,why:'"Running for the door" has no subject saying who. It cannot stand alone.'}];
const LINES=[{w:['It','was','raining','I','stayed','in'],gap:2},{w:['The','shop','had','closed','we','went','home'],gap:3},{w:['Mia','loves','maths','her','brother','loves','art'],gap:2}];
const MARKS=[[';','semi-colon',1],[',','comma',0],['No mark','nothing',0]];
const PAIRS=[{t:'I knew she was home: her bike was by the door.',k:0,why:'The second clause explains how you knew. Explaining is the colon\'s job.'},
 {t:'Tom likes tea; Ana likes coffee.',k:1,why:'Two balanced clauses side by side. Neither explains the other.'},
 {t:'The plan failed: nobody had read the map.',k:0,why:'The second clause gives the reason the plan failed, so a colon fits.'},
 {t:'The sun rose; the birds began to sing.',k:1,why:'Two linked events of equal weight. A semi-colon fits.'},
 {t:'There was one problem: the door was locked.',k:0,why:'The first clause sets up "one problem" and the second tells you what it was.'},
 {t:'Some pupils walk to school; others take the bus.',k:1,why:'A balanced contrast of two equal clauses. A semi-colon fits.'}];
const TESTS=[{t:'I was tired; I went to bed.',ok:1,why:'Both sides stand alone, so the semi-colon is right.'},
 {t:'I was tired; because I ran all day.',ok:0,why:'"Because I ran all day" cannot stand alone. Use no mark: I was tired because I ran all day.'},
 {t:'It started to pour – we ran inside.',ok:1,why:'Both sides stand alone. The dash marks the boundary with a quick, informal pause.'},
 {t:'After lunch; we played outside.',ok:0,why:'"After lunch" is not a clause. A comma goes after it, not a semi-colon.'},
 {t:'She won the race: she had trained for months.',ok:1,why:'Both sides stand alone, and the second explains the first.'},
 {t:'The cat hid, it hates thunder.',ok:0,why:'Two clauses joined by a comma: that is a comma splice.'}];
const FIXES=[['It was cold; we wore coats.',1,'A semi-colon joins the two clauses.'],['It was cold, we wore coats.',0,'Still a comma splice: a comma cannot join two clauses on its own.'],
 ['It was cold. We wore coats.',1,'Two separate sentences work too.'],['It was cold we wore coats.',0,'No mark at all runs the clauses together.'],['It was cold, so we wore coats.',1,'A comma plus the joining word "so" works.']];
const DESC=[
 'Six groups of words. Two boxes: stands alone, and cannot stand alone.',
 'A sentence with two clauses and no mark. Tap the gap between the clauses, then pick a mark.',
 'Six sentences. Two boxes: colon (the second part explains the first), and semi-colon (two balanced clauses).',
 'Six sentences with a mark between clauses. Two boxes: correct, and wrong. Cover each side: can it stand alone?',
 'A comma splice: It was cold, we wore coats. Five versions. Tap every version that fixes it.'];
const DONE=[
 'An independent clause has a subject and a verb and makes sense alone. Because-parts and phrases cannot stand alone.',
 'A semi-colon marks the boundary between two independent clauses. A comma there is a comma splice.',
 'Colon: the second clause explains or expands the first. Semi-colon: two related clauses of equal weight.',
 'The test: cover each side of the mark. If both stand alone, a semi-colon, colon or dash can join them.',
 'Three fixes for a comma splice: a semi-colon, a full stop, or a comma with a joining word such as so.'];
const QS=[
 {q:'Which is punctuated correctly?',a:"It's raining; I'm fed up.",o:[["It's raining, I'm fed up.",'splice'],["It's raining; and I'm fed up.",'join']]},
 {q:'Which mark shows the second clause explains the first? "We stayed in __ the roads were flooded."',a:'A colon',o:[['A comma','splice'],['No mark','splice']]},
 {q:'What is wrong with "After the storm; we went out."?',a:'"After the storm" cannot stand alone',o:[['Nothing, it is correct','cover'],['It needs a colon instead','cover']]},
 {q:'Where does a dash fit best?',a:'In a story: I opened the box – it was empty.',o:[['In a list: eggs – milk – bread','dash'],['After a phrase: After lunch – we played.','cover']]},
 {q:'Which is a balanced pair that suits a semi-colon?',a:'Cats sleep all day; owls hunt at night.',o:[['I was late: my alarm broke.','colon'],['Cats sleep all day; because they are lazy.','cover']]},
 {q:'"The film was long, I fell asleep." What is this mistake called?',a:'A comma splice',o:[['A fragment','splice'],['A list comma','splice']]}];
return{GROUPS,LINES,MARKS,PAIRS,TESTS,FIXES,DESC,DONE,QS}})();
