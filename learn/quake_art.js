/* Drawing helpers and data for the earthquake strength lab (flag_quake.js; bundled in the main learn.js like
   pctdec_art.js so the lab file stays under 20 KB). trace(ctx, x, y, w, amp, seed, col) draws a seismogram wiggle whose
   tallest swing is exactly amp pixels; house(ctx, x, y, s, col) draws a small house; star(ctx, x, y, r, col) marks an
   epicentre; frame(ctx, o) draws the seismometer (frame, spring, heavy pen weight, paper). Magnitudes follow Richter's local scale (1 mm at 100 km = magnitude 3, ×10 wiggle per step) and the
   moment-magnitude energy rule (about ×32 per step); yearly counts are USGS worldwide estimates. */
const QKART={
trace(D,x,y,w,amp,seed,col){const n=Math.max(40,Math.round(w/2)),v=[];let mx=0;
 for(let i=0;i<=n;i++){const t=i/n,env=t<.18?.06:Math.exp(-(t-.18)*4.2),s=Math.sin(i*1.9+seed)*(.6+.4*Math.sin(i*.43+seed*2));v.push(s*env);mx=Math.max(mx,Math.abs(s*env))}
 D.strokeStyle=col||'#0f172a';D.lineWidth=1.6;D.beginPath();v.forEach((s,i)=>{const px=x+w*i/n,py=y-s/mx*amp;i?D.lineTo(px,py):D.moveTo(px,py)});D.stroke()},
house(D,x,y,s,col){D.fillStyle=col;D.fillRect(x-s/2,y-s*.6,s,s*.6);D.beginPath();D.moveTo(x-s*.65,y-s*.6);D.lineTo(x,y-s*1.1);D.lineTo(x+s*.65,y-s*.6);D.closePath();D.fill()},
frame(D,o){const {dx,gy,fx,fw,wy,cx,top,px,pw,W,f}=o,ty=top+f(16),pen=W*.56+pw*.2;
 D.fillStyle='#78716c';D.fillRect(14+dx,gy,W-28,f(10));D.strokeStyle='#334155';D.lineWidth=3;D.beginPath();D.moveTo(fx,gy);D.lineTo(fx,ty);D.lineTo(fx+fw,ty);D.lineTo(fx+fw,gy);D.stroke();
 D.lineWidth=1.5;D.beginPath();D.moveTo(cx+dx,ty);for(let k=1;k<=8;k++)D.lineTo(cx+dx*(1-k/9)+(k%2?7:-7),ty+k*(wy-f(14)-ty)/9);D.lineTo(cx,wy-f(14));D.stroke();
 D.fillStyle='#334155';D.beginPath();D.arc(cx,wy,f(14),0,7);D.fill();D.font=`700 ${f(9)}px system-ui,sans-serif`;D.fillStyle='#ffffff';D.textAlign='center';D.textBaseline='middle';D.fillText('heavy',cx,wy);
 D.strokeStyle='#0f172a';D.lineWidth=2;D.beginPath();D.moveTo(cx+f(14),wy);D.lineTo(pen,wy);D.stroke();
 D.beginPath();D.rect(px,wy-f(40),pw,f(80));D.fillStyle='#ffffff';D.fill();D.lineWidth=1.5;D.strokeStyle='#334155';D.stroke();D.fillStyle='#b91c1c';D.beginPath();D.arc(pen,wy,3.5,0,7);D.fill()},
star(D,x,y,r,col){D.fillStyle=col;D.beginPath();for(let k=0;k<10;k++){const a=-Math.PI/2+k*Math.PI/5,rr=k%2?r*.45:r;D.lineTo(x+rr*Math.cos(a),y+rr*Math.sin(a))}D.closePath();D.fill()},
SEIS:[{k:'A',amp:10},{k:'B',amp:100},{k:'C',amp:1}],
MAGS:[3,4,5,6],
TOWNS:[{n:'A',km:10,i:'VIII',w:'Chimneys fall. Weak buildings are badly damaged.',fx:.3,fy:.5},
 {n:'B',km:60,i:'VI',w:'Everyone feels it. Things fall off shelves.',fx:.58,fy:.25},
 {n:'C',km:60,i:'VII',w:'Soft mud shakes more. It is hard to stand and weak walls crack.',fx:.58,fy:.78,soft:1},
 {n:'D',km:200,i:'IV',w:'Dishes rattle. Many people indoors feel it.',fx:.86,fy:.5}],
COUNTS:[{m:6,c:'about 130'},{m:4,c:'about 13,000'},{m:7,c:'about 15'},{m:5,c:'about 1,300'}],
bank:[["Quake X is magnitude 6 and quake Y is magnitude 4. At the same distance, how much taller is X's wiggle?",'100 times',[['2 times','linear'],['1.5 times','ratio']]],
['How much more energy does a magnitude 7 quake release than a magnitude 6?','about 32 times',[['10 times','ampEnergy'],['just 1 more unit','addOne']]],
['A magnitude 5.8 quake is felt in a near town and a far town. What is its magnitude in the far town?','5.8',[['about 3','magByPlace'],['more than 5.8','magByPlace']]],
['Which tells you how hard the ground shook in your own town?','the intensity',[['the magnitude','magVsInt'],['the time it started','when']]],
['At 100 km, magnitude 3 makes a 1 mm wiggle. What magnitude makes a 1000 mm wiggle there?','magnitude 6',[['magnitude 1000','linear2'],['magnitude 4','oneZero']]],
['Which happen more often around the world each year?','magnitude 5 quakes',[['magnitude 8 quakes','rareBig'],['the same number of each','rareBig']]]]};
