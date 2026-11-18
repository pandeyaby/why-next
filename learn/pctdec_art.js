/* Drawing helpers for the percentage and decimal equivalents lab (flag_pctdec.js; bundled in the main learn.js like
   structad_art.js so the lab file stays under 20 KB). cells(ctx, x, y, cols, rows, size, isLit) draws a grid of hundredths
   squares; dec(h) writes h hundredths as a short decimal (40 → 0.4, 25 → 0.25); ticks(ctx, x, y, w) draws a 0–1 line in tenths;
   the step data and the challenge question bank live here too. */
const PDART={
cells(D,x,y,cols,rows,u,lit){for(let r=0;r<rows;r++)for(let k=0;k<cols;k++){D.fillStyle=lit(r*cols+k)?'#2563eb':'#ffffff';D.fillRect(x+k*u,y+r*u,u,u);D.strokeStyle='#94a3b8';D.lineWidth=.6;D.strokeRect(x+k*u,y+r*u,u,u)}},
dec(h){return h===0?'0':(h/100).toFixed(2).replace(/0$/,'').replace(/\.$/,'')},
ticks(D,x,y,w){D.strokeStyle='#1e293b';D.lineWidth=3;D.beginPath();D.moveTo(x,y);D.lineTo(x+w,y);D.stroke();for(let v=0;v<=10;v++){const t=x+w*v/10;D.lineWidth=v%5?1:2.5;D.beginPath();D.moveTo(t,y-6);D.lineTo(t,y+6);D.stroke()}},
bank:[['What is 4/5 as a decimal?','0.8',[['0.45','digitCopy'],['0.5','digitCopy']]],
['Write 9/25 as a per cent.','36%',[['9%','bottomOnly'],['25%','digitCopy']]],
['A £50 game has 20% off. What do you pay?','£40',[['£10','offNotPay'],['£30','takeAway']]],
['What is 25% of 80?','20',[['55','takeAway'],['4','divideByPercent']]],
['Which is the same as 0.4?','40%',[['4%','placeValue'],['1/4','digitCopy']]],
['What is 3/20 as a per cent?','15%',[['3%','bottomOnly'],['60%','wrongScale']]]],
SCALE:[{t:3,b:20},{t:7,b:25},{t:9,b:50}],
CARDS:[{t:1,b:4},{t:4,b:5},{t:1,b:2},{t:2,b:5},{t:3,b:4},{t:1,b:5}],
SLOTS:[20,25,40,50,75,80],
SALES:[{item:'jacket',price:40,off:25},{item:'trainers',price:60,off:20}]};
