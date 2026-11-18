/* Data for the alliteration flagship (flagallit), ages 3–4. First sounds are written the way a grown-up models them,
   short and pure: sss, mmm, fff, and k, g, b, d, t, l, h, ch, sh. Odd-one-out sets: the odd word rhymes with one of the
   others (sun/bun, mouse/house, bat/cat, dog/log) so rhyme is the trap. Kite set: cake and cat are written with c but start
   with k; goat (g) and cheese (ch) are the decoys. Pairs: leaf and bus only END with the sound; shoe starts with sh. */
const ALLIT=(()=>{
const PIC={sun:'☀️',sock:'🧦',seal:'🦭',moon:'🌙',mouse:'🐭',milk:'🥛',bun:'🍞',mop:'🧹',map:'🗺️',top:'🔝',bat:'🦇',ball:'⚽',cat:'🐱',dog:'🐶',duck:'🦆',log:'🪵',
 kite:'🪁',cake:'🎂',key:'🔑',goat:'🐐',cheese:'🧀',bear:'🐻',fish:'🐟',fork:'🍴',house:'🏠',leaf:'🍃',bus:'🚌',shoe:'👟',door:'🚪',snake:'🐍',monkey:'🐒'};
const up1=w=>w.charAt(0).toUpperCase()+w.slice(1);
// first sounds said the way a grown-up models them (pure sounds: sss, mmm, k, g, ch, sh)
const FIRST={sun:'sss',sock:'sss',seal:'sss',moon:'mmm',mouse:'mmm',milk:'mmm',bun:'b',mop:'mmm',map:'mmm',top:'t',bat:'b',ball:'b',cat:'k',dog:'d',duck:'d',log:'l',
 kite:'k',cake:'k',key:'k',goat:'g',cheese:'ch',fish:'fff',fork:'fff',house:'h',leaf:'l',bus:'b',shoe:'sh',door:'d'};
/* 1. two bags */
const BAGW=['sun','moon','sock','mouse','seal','milk'],BAGOF=w=>FIRST[w]==='sss'?0:1,BAGS=[['snake','Sss snake'],['monkey','Mmm monkey']];
/* 2. odd one out: the odd one RHYMES with one of the others, so a rhyme-hearing child is tempted */
const TRIO=[[['sun','sock','bun'],2],[['mouse','house','milk'],1],[['bat','ball','cat'],2],[['log','dog','duck'],0]];
/* 3. same sound, different letters: start like kite */
const KW=['cake','goat','key','cheese','cat'],KYES=['cake','key','cat'];
const KNO={goat:'Goat starts with g. Say k and g: they feel close in your throat, but g has a hum. Kite starts with k, goat with g.',
 cheese:'Cheese starts with ch, like a sneeze: ch-ch. Kite starts with k. The letter c is there, but the sound is ch.'};
/* 4. silly phrases: pick the describing word that starts like the animal */
const FR=[['bear',['fluffy','bouncy','little'],1],['fish',['funny','wet','silly'],0],['dog',['tiny','pink','dizzy'],2]];
/* 5. start or end? */
const PAIRS=[['fish','fork',1],['fish','leaf',0],['moon','mop',1],['sun','bus',0],['sock','shoe',0],['dog','door',1]];
const PWHY=['Fish and fork both start with fff.','Leaf ends with fff, but it starts with l. Only the start counts.','Moon and mop both start with mmm.',
 'Bus ends with sss, but starts with b. The sound has to be at the start.','Sock starts with sss. Shoe starts with sh, a different sound, even though socks and shoes go together.','Dog and door both start with d.'];
const QS=[
 {q:'Which word starts with the same sound as sun?',a:'sock',o:[['bun','rhyme'],['moon','any']]},
 {q:'Do kite and cake start with the same sound?',a:'Yes, both start with k',o:[['No, the letters are different','spell'],['No, a kite is not a cake','mean']]},
 {q:'Fish, fork, dish. Which one starts differently?',a:'dish',o:[['fork','any'],['fish','rhyme']]},
 {q:'Which word starts like goat?',a:'gate',o:[['coat','close'],['boat','rhyme']]},
 {q:'Do bus and sun start the same?',a:'No, bus only ends with sss',o:[['Yes, both have sss','end'],['Yes, both are short','any']]},
 {q:'Do sock and shoe start the same?',a:'No, shoe starts with sh',o:[['Yes, you wear them together','mean'],['Yes, both start with s','spell']]}];
return{PIC,up1,FIRST,BAGW,BAGOF,BAGS,TRIO,KW,KYES,KNO,FR,PAIRS,PWHY,QS}})();
