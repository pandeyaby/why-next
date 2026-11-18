/* Data for the text and media connections lab (flag_screen.js; bundled in the main learn.js so the lab file stays small).
   The Mira and Biscuit lighthouse passage, play script and film shots are written for this lab. */
const SCREENART=(()=>{
const C={paper:'#fffdf7',ink:'#1c1917',soft:'#44403c',rim:'#292524',reel:'#312e81',reelBg:'#e0e7ff',lit:'#fde68a',litInk:'#713f12',good:'#14532d',goodBg:'#dcfce7',oops:'#881337',oopsBg:'#ffe4e6',dir:'#5b21b6',dirBg:'#ede9fe'};
/* the book passage, one tappable sentence each, with what each sentence is about */
const BOOK=['Mira pushed open the green door of the lighthouse.','Snow blew in around her boots.','At the top of the spiral stairs sat an old grey cat with one torn ear.','“You must be Biscuit,” Mira whispered.','The cat blinked once, then stared at the dark sea.','Far out, a small orange light was flashing.','BANG! A wave hit the rocks below.'];
const ABOUT=['the door','the snow at her boots','the cat on the stairs','what Mira says','the cat looking at the sea','the light far out at sea','the wave'];
/* film shots and the sentence each one shows */
const SHOTS=[['Close-up: white flakes swirl past two boots.',1],['Wide shot: a tiny orange light blinks far out on black water.',5],['Close-up: a grey cat with a torn ear on the top step.',2],['Sound only: a huge crash of water on rock.',6]];
/* film moments: [moment, 0 match / 1 changed, short name, why] */
const FILM=[['Mira opens a green door.',0,'green door','The book says a green door too.'],['Rain pours past Mira’s boots.',1,'rain','The book says snow, not rain.'],
 ['A grey cat with a torn ear sits on the top step.',0,'grey cat, torn ear','Grey, one torn ear, top of the stairs: all in the book.'],['Mira shouts “Biscuit!”',1,'shouts','The book says she whispered.'],
 ['A small orange light flashes far out at sea.',0,'orange light','Small, orange, far out at sea: the book says the same.'],['The cat is black and white.',1,'black-and-white cat','The book says an old grey cat.']];
const BINS=['Matches the book','Changed from the book'];
/* play script rows [speaker, stage direction, spoken words] and stage moments [what you see or hear, row] */
const SCRIPT=[['MIRA','(shivering, rubbing her hands)','It is freezing up here.'],['KEEPER','(not looking up from the lamp)','Shut the door, then.'],['MIRA','(slams the door)','Sorry!'],['','(Biscuit jumps onto the table.)','']];
const STAGE=[['The actor playing Mira shakes and rubs her hands.',0],['A loud bang as the door shuts.',2],['A puppet cat leaps onto the table.',3],['The keeper keeps polishing the lamp, back to Mira.',1]];
/* audiobook lines [line, voice index, the clue in the words] */
const VOICES=['Quiet','Loud','Pause','Slow'];
const LINES=[['“You must be Biscuit,” Mira whispered.',0,'whispered'],['BANG! A wave hit the rocks below.',1,'BANG! in capitals'],['The light flashed… then nothing.',2,'the three dots'],['“Down. The. Stairs,” said the keeper, one word at a time.',3,'one word at a time']];
/* feelings the book tells: [book line, [right shot, wrong, wrong], [why wrong 1, why wrong 2]] */
const FEEL=[['Mira felt small and far from home.',['Wide shot: tiny Mira alone on the tall tower, a huge dark sea all round.','Close-up: Mira laughing with her friends.','A map of the town, with cheerful music.'],['The book says she felt small and alone, not happy with friends.','A map shows a place. It does not show how Mira feels.']],
 ['Her heart thumped.',['Close-up of Mira’s face, with a loud heartbeat sound.','Mira yawns and stretches.','A slow shot of the stairs, with soft music.'],['A yawn shows she is bored or sleepy, not scared.','Soft music and slow stairs feel calm. The book says her heart thumped.']],
 ['She was sure the cat knew a secret.',['The cat stares at the light, then turns to look straight at Mira.','The cat falls asleep by the lamp.','Mira reads a book on the stairs.'],['A sleeping cat does not look like it knows anything.','This shot is not about the cat at all.']]];
const QS=[['Book: “the green door”. Film: a blue door. What is this?','A change from the book',[['A match, as there is still a door','near'],['A mistake in the book','book']]],
 ['In a play script, which part is NOT said out loud?','(slams the door)',[['Sorry!','spoken'],['Shut the door, then.','spoken']]],
 ['Book: “she whispered”. How should the audiobook reader say her words?','Quietly',[['Loudly','flip'],['Very fast','other']]],
 ['Book: “Mira felt scared.” Which shot shows this best?','Close-up: wide eyes, shaking hands',[['Mira says “I am scared” to the camera','tell'],['A sunny beach','mood']]],
 ['You want to compare a film with the book. What do you do first?','Find the exact words in the book',[['Guess from memory','memory'],['Only watch the film','memory']]],
 ['Book: “an old grey cat with one torn ear”. Film: an old grey cat, both ears perfect. What changed?','The torn ear',[['The colour','near'],['The age','near']]]];
return{C,BOOK,ABOUT,SHOTS,FILM,BINS,SCRIPT,STAGE,VOICES,LINES,FEEL,QS}})();
