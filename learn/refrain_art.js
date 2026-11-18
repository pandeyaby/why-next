/* Data for the repeated-refrains flagship (flagrefrain), ages 2–3. Traditional tales with a line that comes back again
   and again: The Gingerbread Man, The Three Little Pigs, The Three Billy Goats Gruff, The Little Red Hen. The child joins
   in when the reader pauses, learns the pattern that tells them it is coming, keeps the words the same each time, and
   matches each refrain to its story. All four tales are traditional and out of copyright. */
const REF=(()=>{
const GB='Run, run, as fast as you can!';
const PAGES=[['🍪','The Gingerbread Man jumps out of the oven.',0],['🐄','A cow says: Stop! I want to eat you!',0],['🏃','He runs away and shouts…',1],['🐎','A horse says: Stop! I want to eat you!',0],['🏃','He runs away and shouts…',1],['🦊','He meets a fox by the river.',0]];
const ORDER=[['🐖','A pig sees him.'],['🛑','The pig says: Stop!'],['🏃',GB]];
const SHOW=[2,0,1];
const TALES=[['🍪','Gingerbread Man',GB],['🐷','Three Little Pigs','I\'ll huff and I\'ll puff!'],['🐐','Billy Goats Gruff','Who\'s that trip-trapping over my bridge?'],['🐔','Little Red Hen','Not I, said the dog.']];
const SAME=[[GB,[['Walk, walk, as slow as you can!','swap'],['Run, as fast as you can!','drop']]],['I\'ll huff and I\'ll puff!',[['I\'ll sneeze and I\'ll cough!','swap'],['I\'ll huff!','drop']]],['Who\'s that trip-trapping over my bridge?',[['Who is on my bridge?','swap'],['Who\'s that?','drop']]]];
const LINES=[['🐾','Stomp, stomp, here comes Ted!'],['💦','Splash, splash, in we go!'],['🎵','La la la, off we go!']];
const OWN=[['🧸','Teddy walks to the pond.',0],['🗣️','He sings…',1],['🦆','He sees a duck.',0],['🗣️','He sings…',1],['🐸','He sees a frog.',0],['🗣️','He sings…',1],['🛏️','Teddy goes to bed. The end.',0]];
const QS=[
 {q:'The reader stops and waits. What do you do?',a:'Say the line that comes back',o:[['Say nothing','quiet'],['Say a new line','swap']]},
 {q:'In the Gingerbread Man, what does he shout each time?',a:'Run, run, as fast as you can!',o:[['Walk, walk, as slow as you can!','swap'],['I\'ll huff and I\'ll puff!','tale']]},
 {q:'Which story says: I\'ll huff and I\'ll puff?',a:'Three Little Pigs',o:[['Gingerbread Man','tale'],['Little Red Hen','tale']]},
 {q:'A horse says: Stop! What comes next?',a:'Run, run, as fast as you can!',o:[['The end','when'],['Stop! again','when']]},
 {q:'Do the words of the line change each time?',a:'No, they stay the same',o:[['Yes, new words each time','swap'],['Only some words stay','drop']]},
 {q:'The story is just starting. Do you shout the line now?',a:'No, wait for the pause',o:[['Yes, shout it at every page','when'],['Yes, at the start','when']]}];
return{PAGES,ORDER,SHOW,TALES,SAME,LINES,OWN,QS}})();
