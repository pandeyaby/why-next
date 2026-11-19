/* Data for flagsenvar (varying sentence structure, ages 10–11). Sources: CCSS L.5.3a ("expand, combine, and reduce
   sentences for meaning, reader/listener interest, and style"); DfE National Curriculum 2013 Years 5-6 writing
   (relative clauses, commas to clarify meaning, choosing vocabulary and grammar for effect) and KS2 glossary
   (subordinate clause, relative clause, fronted adverbial); Purdue OWL "Conciseness" and "Sentence Variety";
   Strunk and White rule 17 ("omit needless words"). Slips it targets: longer always means better, "and" shows cause,
   an appositive or relative clause with only one comma, and cutting words that carry meaning. */
const SNV=(()=>{
const BUILD={a:'The storm hit',b:'the lights went out',chips:[{t:'and',k:1},{t:'so',k:1},{t:'When',k:2},{t:'because',k:2}],
 make:{and:'The storm hit, and the lights went out.',so:'The storm hit, so the lights went out.',When:'When the storm hit, the lights went out.',because:'The lights went out because the storm hit.'},goals:[1,2]};
const KIND=['','Compound (two equal main clauses)','Complex (one clause depends on the other)'];
/* expand: the base is [slot0] The dog [slot1] barked [slot2] . */
const BASE=['The dog','barked'];
const ADDS=[{t:'Suddenly,',slot:0,what:'a fronted adverbial: when or how it happened'},{t:', a scruffy terrier,',slot:1,what:'an appositive: it renames the dog, with a comma on each side'},{t:'at the gate',slot:2,what:'a phrase saying where'}];
const CUTS=[{w:['In my opinion','I think that','the','final','end','of the film','was','really','very','good.'],groups:[[0,1],[3],[7,8]],out:'I think that the end of the film was very good.'},
 {w:['We','returned','back','home','at 6 pm','in the evening.'],groups:[[2],[5]],out:'We returned home at 6 pm.'}];
const AIMS=[{aim:'Build tension at the scariest moment',opts:['The door creaked. Silence. Then a hand.','The door creaked and it went silent and then a hand appeared.','Because the door creaked, it went silent, after which a hand appeared.'],why:['','Long chains of "and" slow the moment down.','A long complex sentence explains; it does not build suspense.']},
 {aim:'Show that one thing caused the other',opts:['We stayed in because the storm was so fierce.','We stayed in. The storm was fierce.','We stayed in, and the storm was fierce.'],why:['','Two short sentences leave the link for the reader to guess.','"and" only adds; it does not say one thing caused the other.']},
 {aim:'Add a detail without starting a new sentence',opts:['My aunt, a keen cyclist, rode 50 miles.','My aunt rode 50 miles. She is a keen cyclist.','My aunt rode 50 miles and she is a keen cyclist and she was tired.'],why:['','Two sentences work, but the detail could be tucked inside one sentence.','A chain of "and" makes the sentence ramble.']}];
const ROBOT=[{s:'Longer sentences are always better writing.',ok:false,fix:'Mix lengths. A short sentence after long ones adds punch.'},
 {s:'"The dog, a scruffy terrier, barked." needs a comma on both sides of "a scruffy terrier".',ok:true,fix:'An appositive is extra information, so commas mark both ends.'},
 {s:'Joining with "and" shows that one thing caused the other.',ok:false,fix:'"and" only adds. Use because, so or as to show cause.'},
 {s:'Cutting "really" from "really very good" keeps the meaning.',ok:true,fix:'"really" and "very" do the same job. One is enough.'},
 {s:'"My aunt, who loves cycling rode 50 miles." is punctuated correctly.',ok:false,fix:'The relative clause needs a closing comma: My aunt, who loves cycling, rode 50 miles.'}];
const DESC=[
 'Two simple sentences: The storm hit. The lights went out. Four joining words: and, so, When, because. Make a compound sentence first.',
 'A short sentence, The dog barked, with three gaps. Three add-on chips. Drag each chip to its gap, or tap a chip then a gap.',
 'A wordy sentence in word tiles. Tap each tile that repeats an idea to cut it.',
 'A writing aim and three versions of the same idea. Tap the version that does the job best.',
 'A robot makes claims about sentences. Buttons: Right or Slip.'];
const DONE=[
 'and and so join equal clauses (compound). when and because make one clause depend on the other (complex), which shows how the ideas link.',
 'Suddenly, the dog, a scruffy terrier, barked at the gate. Each add-on gives the reader something new, and the appositive sits between two commas.',
 'Cut the repeats: "I think that the end of the film was very good." and "We returned home at 6 pm." Shorter, same meaning.',
 'Short sentences build tension, because shows cause, and an appositive tucks a detail inside a sentence.',
 'Three slips: longer is not always better, "and" does not show cause, and a relative clause in the middle needs two commas.'];
const QS=[
 {q:'Which joins "It rained" and "we stayed in" to show cause?',a:'Because it rained, we stayed in.',o:[['It rained, and we stayed in.','and'],['It rained. We stayed in.','short']]},
 {q:'Which is punctuated correctly?',a:'Max, my cousin, is ten.',o:[['Max, my cousin is ten.','comma'],['Max my cousin, is ten.','comma']]},
 {q:'"The small little kitten slept." Which word can you cut?',a:'little',o:[['kitten','meaning'],['slept','meaning']]},
 {q:'After three long sentences, what adds the most punch?',a:'A short sentence',o:[['Another long sentence','long'],['A sentence joined with and and and','and']]},
 {q:'Which expands "The bus stopped." with a phrase saying where?',a:'The bus stopped outside the school.',o:[['The bus stopped, and it stopped.','meaning'],['The bus, stopped.','comma']]},
 {q:'"We returned back home." Which word repeats an idea?',a:'back',o:[['home','meaning'],['returned','meaning']]}];
return{BUILD,KIND,BASE,ADDS,CUTS,AIMS,ROBOT,DESC,DONE,QS}})();
