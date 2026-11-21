/* Data for flagsongrhyme (hearing rhyme in songs, ages 2–3; EYFS Development Matters 2021 Communication and Language,
   birth to three: enjoy singing, sing songs and say rhymes; Letters and Sounds Phase 1 Aspect 5,
   rhythm and rhyme). Traditional nursery rhymes, words as usually sung in the UK. Rhyme pairs: star/are, dock/clock,
   two/shoe, moon/spoon, wall/fall, spout/out, wool/full. Slips it targets: choosing the word that fits the meaning
   rather than the sound (cup for spoon), hearing the same START as a rhyme (moon/milk), close-but-different endings
   (bed/bell), looking for the rhyme at the start of a line, and joining in on every word instead of the rhyming one. */
const SRY=(()=>{
/* scene 1: the frog song. r marks the words to clap on. */
const FROG=[{w:'Twinkle'},{w:'twinkle'},{w:'little'},{w:'star',e:'⭐',r:1},{w:'How'},{w:'I'},{w:'wonder'},{w:'what'},{w:'you'},{w:'are',e:'✨',r:1}];
const BREAK=4; /* line 2 starts at word 4 */
/* scene 2: sing the first line, pause, and the child fills the last word. t tags the slip each wrong picture shows. */
const GAPS=[
 {a:'Hickory, dickory, dock',b:'The mouse ran up the …',end:'dock',ok:{w:'clock',e:'🕰️'},no:[{w:'dog',e:'🐶',t:'start'},{w:'cheese',e:'🧀',t:'meaning'}]},
 {a:'One, two',b:'Buckle my …',end:'two',ok:{w:'shoe',e:'👞'},no:[{w:'coat',e:'🧥',t:'meaning'},{w:'toes',e:'🦶',t:'start'}]},
 {a:'The cow jumped over the moon',b:'The dish ran away with the …',end:'moon',ok:{w:'spoon',e:'🥄'},no:[{w:'cup',e:'☕',t:'meaning'},{w:'mouse',e:'🐭',t:'start'}]}];
const TRAYS=[[1,0,2],[2,1,0],[0,2,1]]; /* where the right picture sits: index into [ok, ...no] per round */
/* scene 3: same at the end? s=1 when they rhyme; t is the slip a wrong "same" shows */
const PAIRS=[{a:'star',ea:'⭐',b:'car',eb:'🚗',s:1},{a:'moon',ea:'🌙',b:'milk',eb:'🥛',s:0,t:'start'},{a:'hill',ea:'⛰️',b:'Jill',eb:'👧',s:1},
 {a:'bed',ea:'🛏️',b:'bell',eb:'🔔',s:0,t:'close'},{a:'cat',ea:'🐱',b:'dog',eb:'🐶',s:0,t:'meaning'}];
/* scene 4: tap the two words that rhyme. r marks them. */
const FIND=[
 {n:'Humpty Dumpty',l:[['Humpty','Dumpty','sat','on','a','wall'],['Humpty','Dumpty','had','a','great','fall']],r:['0:5','1:5']},
 {n:'Incy Wincy Spider',l:[['Incy','Wincy','spider','climbed','up','the','spout'],['Down','came','the','rain','and','washed','the','spider','out']],r:['0:6','1:8']},
 {n:'Baa, Baa, Black Sheep',l:[['Baa,','baa,','black','sheep,','have','you','any','wool?'],['Yes','sir,','yes','sir,','three','bags','full']],r:['0:7','1:6']}];
/* scene 5: the song box. Rhyming words share a colour. */
const BOX=[
 {n:'Twinkle, Twinkle',e:'⭐',l:['Twinkle, twinkle, little STAR','How I wonder what you ARE']},
 {n:'Hickory Dickory',e:'🐭',l:['Hickory, dickory, DOCK','The mouse ran up the CLOCK']},
 {n:'Humpty Dumpty',e:'🥚',l:['Humpty Dumpty sat on a WALL','Humpty Dumpty had a great FALL']},
 {n:'Incy Wincy',e:'🕷️',l:['Incy Wincy spider climbed up the water SPOUT','Down came the rain and washed the spider OUT']},
 {n:'Hey Diddle Diddle',e:'🐄',l:['The cow jumped over the MOON','The dish ran away with the SPOON']}];
const DESC=[
 'Stepping stones with the words of Twinkle, twinkle. A frog sits on the first word. Two big buttons: Hop and Clap.',
 'A song line, then a second line with a gap at the end. Three pictures to fill the gap.',
 'Two pictures at a time, and two big buttons: Same at the end, and Not the same.',
 'The words of a song in two lines. Tap the two words that sound the same at the end.',
 'Five song cards. Tap one to see its rhyming words light up in the same colour.'];
const DONE=[
 'You clapped on star and are. They sound the same at the end: that is a rhyme.',
 'Dock, clock. Two, shoe. Moon, spoon. The word that fits is the one that sounds the same at the end.',
 'Star and car rhyme. Hill and Jill rhyme. Moon and milk only start the same, so they do not rhyme.',
 'The rhyming words were at the end of each line: wall, fall; spout, out; wool, full.',
 ''];
const QS=[
 {q:'Hickory, dickory, dock. The mouse ran up the …',a:'clock',o:[['dog','start'],['cheese','meaning']]},
 {q:'Do star and car sound the same at the end?',a:'Yes',o:[['No, they start with different sounds','start'],['No, a star is not a car','meaning']]},
 {q:'In Twinkle, twinkle, where do the rhyming words come?',a:'At the end of each line',o:[['At the start of each line','place'],['On every word','every']]},
 {q:'Bed and bell: do they sound the same at the end?',a:'No',o:[['Yes, they sound close','close'],['Yes, they both start with b','start']]},
 {q:'When do you clap in the frog song?',a:'On the rhyming words',o:[['On every word','every'],['On the first word','place']]},
 {q:'The cow jumped over the moon. The dish ran away with the …',a:'spoon',o:[['cup','meaning'],['mouse','start']]}];
return{FROG,BREAK,GAPS,TRAYS,PAIRS,FIND,BOX,DESC,DONE,QS}})();
