/* Data for the telling-sounds-apart flagship (flagears), ages 2–3. Phase 1 phonics, Aspect 1: general sound
   discrimination of environmental sounds, plus Aspect 2 (instrumental sounds: shakers, drum, bell). Sound words are
   written the way a grown-up says them aloud (woof woof, drip drip). Shaker colours are deliberately mismatched to
   their fillings, so a child who matches by look is caught. Loud/quiet set: size is the trap (tiny baby crying is
   loud, a tiptoeing elephant is quiet). */
const EARS=(()=>{
const PIC={dog:'🐶',cat:'🐱',cow:'🐮',sheep:'🐑',duck:'🦆',hen:'🐔',owl:'🦉',pig:'🐷',drum:'🥁',bell:'🔔',book:'📕',shaker:'🪇',
 tap:'🚰',door:'🚪',phone:'☎️',clock:'⏰',bath:'🛁',kettle:'🫖',fish:'🐟',doorbell:'🛎️'};
const NAME={dog:'dog',cat:'cat',cow:'cow',sheep:'sheep',duck:'duck',hen:'hen',owl:'owl',pig:'pig',drum:'drum',bell:'bell',book:'book',shaker:'shaker',
 tap:'tap',door:'door',phone:'phone',clock:'clock',bath:'bath',kettle:'kettle',fish:'fish',doorbell:'doorbell'};
/* what each thing sounds like, said aloud */
const SAYS={dog:'Woof woof',cat:'Meow',cow:'Moo',sheep:'Baa',duck:'Quack quack',hen:'Cluck cluck',owl:'Hoo hoo',pig:'Oink oink',drum:'Boom boom',
 bell:'Jingle jingle',shaker:'Shh shh',tap:'Drip drip',door:'Knock knock',phone:'Ring ring',clock:'Tick tock',bath:'Splash',kettle:'Wheee',doorbell:'Ding dong'};
/* 1. eyes shut: hear the sound, the picture is hidden behind a curtain; pick who made it */
const SHUT=[['dog',['cat','dog','fish']],['duck',['duck','hen','owl']],['cow',['sheep','pig','cow']],['drum',['bell','drum','book']],['owl',['owl','duck','dog']]];
const SHUTNO={cat:'A cat says meow. This was woof woof: a dog.',fish:'A fish makes no sound we can hear. Woof woof is a dog.',
 hen:'A hen says cluck cluck. Quack quack is a duck.',owl:'An owl says hoo hoo.',sheep:'A sheep says baa. Moo is a cow.',pig:'A pig says oink oink. Moo is a cow.',
 bell:'A bell goes jingle jingle. Boom boom is a drum.',book:'A book is quiet. Boom boom is a drum.',duck:'A duck says quack quack. Hoo hoo is an owl.',dog:'A dog says woof woof. Hoo hoo is an owl.'};
/* 2. shakers: three fillings, two of each; colours do NOT match the fillings */
const FILL={rice:{w:'shh shh',t:'soft shh'},beans:{w:'chk chk',t:'rattly chk'},bells:{w:'jingle',t:'jingly'}};
const SHAKE=[['red','#dc2626','rice'],['red','#dc2626','beans'],['blue','#2563eb','bells'],['blue','#2563eb','rice'],['yellow','#ca8a04','beans'],['yellow','#ca8a04','bells']];
/* 3. same or different? */
const PAIRS=[['dog','dog',1],['cow','sheep',0],['drum','shaker',0],['clock','clock',1],['phone','doorbell',0],['bell','bell',1]];
const PWHY=['Woof woof and woof woof: the same dog sound.','Moo and baa: two different animals.','Boom boom and shh shh: a drum and a shaker are both toys, but they sound different.',
 'Tick tock and tick tock: the same clock sound.','Ring ring and ding dong are close, but different: a phone and a doorbell.','Jingle jingle twice: the same bell.'];
/* 4. loud or quiet? size is the trap */
const LOUD=[['Baby cries','👶',1],['Elephant tiptoes','🐘',0],['Drum bangs','🥁',1],['Mum whispers','🤫',0],['Fire engine','🚒',1],['Mouse nibbles','🐭',0]];
const LWHY=['A baby is small, but crying is very loud.','An elephant is big, but tiptoeing is quiet.','A drum bang is loud.','A whisper is quiet.','A fire engine siren is loud.','A mouse nibbling is quiet.'];
/* 5. sound walk at home: hear a sound, tap what made it */
const HOME=['tap','door','phone','clock','bath','kettle'];
const WALK=['tap','door','phone','clock','bath'];
const QS=[
 {q:'Woof woof! Who made that sound?',a:'A dog',o:[['A cat','close'],['A cow','any']]},
 {q:'Two shakers are both red. Do they sound the same?',a:'Shake them and listen',o:[['Yes, same colour','look'],['Yes, same size','look']]},
 {q:'A big elephant tiptoes. Loud or quiet?',a:'Quiet',o:[['Loud, it is big','size'],['Loud, elephants are loud','size']]},
 {q:'Boom boom, then shh shh. Same or different?',a:'Different',o:[['Same, both are toys','kind'],['Same, both are short','any']]},
 {q:'A tiny baby cries. Loud or quiet?',a:'Loud',o:[['Quiet, babies are small','size'],['Quiet, it is a baby','size']]},
 {q:'Ring ring. What made that sound?',a:'A phone',o:[['A doorbell','close'],['A clock','any']]}];
return{PIC,NAME,SAYS,SHUT,SHUTNO,FILL,SHAKE,PAIRS,PWHY,LOUD,LWHY,HOME,WALK,QS}})();
