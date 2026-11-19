/* Data for flagcoinval (coin values, ages 5–6). Sources: DfE (2013) National Curriculum mathematics, Year 1 measurement
   ("recognise and know the value of different denominations of coins and notes"); NCETM Year 1 money guidance;
   The Royal Mint coin specifications (diameters: 1p 20.3 mm, 2p 25.9 mm, 5p 18.0 mm, 10p 24.5 mm, 20p 21.4 mm (7-sided),
   50p 27.3 mm (7-sided), £1 23.43 mm (12-sided, two colours), £2 28.4 mm (two colours)); Bank of England notes
   (£5 green-blue, £10 orange-brown). Slips it targets: a bigger coin is worth more (the 2p is bigger than the 5p),
   more coins means more money, and £1 is just "1", less than 50p. */
const CNV=(()=>{
/* every coin: value in pence, name, real diameter in mm, metal and shape */
const COIN={
 1:{v:1,t:'1p',mm:20.3,metal:'copper',sides:0,say:'1 penny'},
 2:{v:2,t:'2p',mm:25.9,metal:'copper',sides:0,say:'2 pence'},
 5:{v:5,t:'5p',mm:18.0,metal:'silver',sides:0,say:'5 pence'},
 10:{v:10,t:'10p',mm:24.5,metal:'silver',sides:0,say:'10 pence'},
 20:{v:20,t:'20p',mm:21.4,metal:'silver',sides:7,say:'20 pence'},
 50:{v:50,t:'50p',mm:27.3,metal:'silver',sides:7,say:'50 pence'},
 100:{v:100,t:'£1',mm:23.43,metal:'two',sides:12,say:'1 pound'},
 200:{v:200,t:'£2',mm:28.4,metal:'two',sides:0,say:'2 pounds'},
 500:{v:500,t:'£5',note:1,col:'#99f6e4',say:'5 pound note'},
 1000:{v:1000,t:'£10',note:1,col:'#fdba74',say:'10 pound note'}};
/* scene 1: find the coin. Each round shows four coins; a clue for the wrong tap */
const FIND=[{want:10,show:[2,10,1,50]},{want:5,show:[5,20,1,2]},{want:50,show:[20,100,50,10]},{want:2,show:[1,2,10,5]},{want:100,show:[200,50,100,20]}];
const LOOKS={1:'The 1p is a small brown coin.',2:'The 2p is a big brown coin.',5:'The 5p is the smallest silver coin.',10:'The 10p is a big round silver coin.',
 20:'The 20p is silver with 7 flat sides.',50:'The 50p is the big silver coin with 7 flat sides.',100:'The £1 has 12 sides and two colours.',200:'The £2 is the biggest coin, round, with two colours.'};
/* scene 2: which is worth more? Most pairs put the bigger coin on the lower value, so size is a trap */
const PAIRS=[[2,5],[10,20],[50,100],[1,5],[200,500]];
/* scene 3: line coins up from least to most */
const LINE=[[5,1,10,2],[100,20,200,50]];
/* scene 4: swap one coin for smaller coins of the same value */
const SWAP=[{big:10,small:1},{big:5,small:1},{big:10,small:2},{big:20,small:10}];
const ROBOT=[{say:'The 2p is bigger than the 5p, so it is worth more.',ok:false,fix:'Size does not tell you. 5 is more than 2, so the 5p is worth more.'},
 {say:'One 10p is worth the same as ten 1p coins.',ok:true,fix:'Yes. Ten 1p coins make 10p, the same as one 10p coin.'},
 {say:'Three coins is always more money than one coin.',ok:false,fix:'Not always. One 50p is more than three 1p coins: 50p and 3p.'},
 {say:'A £5 note is worth more than a £2 coin.',ok:true,fix:'Yes. 5 pounds is more than 2 pounds, even if the coin feels heavier.'},
 {say:'£1 is less than 50p, because 1 is less than 50.',ok:false,fix:'£1 is one pound, and one pound is 100 pence. So £1 is worth more than 50p.'}];
const DESC=[
 'Four coins and a coin name. Tap the coin with that name.',
 'Two coins. Tap the one that is worth more money.',
 'Four coins and four empty spaces. Tap the coins from least money to most.',
 'One coin on the left. Tap the pile of small coins to put one in the tray, until the tray is worth the same.',
 'A robot says things about coins. Buttons: Right or Slip.'];
const DONE=[
 'You know the coins: look at the number, the colour and the shape.',
 'Look at the number on the coin, not how big it is.',
 'From least to most: 1p, 2p, 5p, 10p, 20p, 50p, £1, £2.',
 'One coin can be worth the same as lots of small coins.',
 'The robot slipped three times: size, how many coins and £1 can trick you.'];
const QS=[
 {q:'Which coin is worth more: the 2p or the 5p?',a:'The 5p',o:[['The 2p, it is bigger','size'],['They are the same','same']]},
 {q:'How many 1p coins make 10p?',a:'10',o:[['1','count'],['2','count']]},
 {q:'Which is worth more: one 20p or three 1p coins?',a:'One 20p',o:[['Three 1p coins','many'],['They are the same','same']]},
 {q:'Which coin has 7 flat sides and is worth the most of these?',a:'50p',o:[['10p','look'],['2p','look']]},
 {q:'Which is worth more: £1 or 50p?',a:'£1',o:[['50p, because 50 is more than 1','pound'],['They are the same','same']]},
 {q:'Which is worth the most: a £5 note, a £2 coin or a £1 coin?',a:'The £5 note',o:[['The £2 coin','size'],['The £1 coin','pound']]}];
return{COIN,FIND,LOOKS,PAIRS,LINE,SWAP,ROBOT,DESC,DONE,QS}})();
