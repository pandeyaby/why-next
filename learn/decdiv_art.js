/* Data for the decimal division lab (flag_decdiv.js; bundled in the main learn.js like pctdec_art.js so the lab file stays
   under 20 KB). Sharing problems count ones, tenths and hundredths as [o, t, h]; jump and scaling problems are in tenths and
   hundredths so every check is whole-number arithmetic. f100(h) writes h hundredths as a short decimal (480 → 4.8). */
const DDART={
f100(h){return (h/100).toFixed(2).replace(/\.?0+$/,'')},
NAME:['ones','tenths','hundredths'],ONE:['one','tenth','hundredth'],COL:['#1d4ed8','#b45309','#047857'],
SHARE0:[{n:[7,2,0],p:3,label:'7.2 ÷ 3'}],
SHARE2:[{n:[3,0,0],p:4,label:'3 ÷ 4'},{n:[5,4,0],p:4,label:'5.4 ÷ 4'}],
POINT:[{q:'12.6 ÷ 3',d:'42',ans:1,est:'12 ÷ 3 = 4'},{q:'25.5 ÷ 5',d:'51',ans:1,est:'25 ÷ 5 = 5'},{q:'0.84 ÷ 4',d:'21',ans:0,est:'0.8 ÷ 4 = 0.2'}],
JUMPS:[{a:48,b:6},{a:20,b:4}],
SCALE:[{a:480,b:60},{a:240,b:8},{a:90,b:30}],
bank:[['What is 8.4 ÷ 4?','2.1',[['21','pointPlace'],['2.01','zeroGap']]],
['Share £5.40 equally between 4 people. How much each?','£1.35',[['£1.10','noExchange'],['£13.50','pointPlace']]],
['What is 7 ÷ 4 as a decimal?','1.75',[['1.3','remainderAsDecimal'],['17.5','pointPlace']]],
['What is 4.8 ÷ 0.6?','8',[['0.8','alwaysSmaller'],['80','scaleOne']]],
['What is 2.4 ÷ 0.08?','30',[['3','scaleShort'],['0.3','alwaysSmaller']]],
['What is 0.9 ÷ 3?','0.3',[['3','pointPlace'],['0.03','zeroGap']]]]};
