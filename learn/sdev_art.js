/* Data and helpers for the standard deviation lab (flag_sdev.js; bundled in the main learn.js like pctdec_art.js so the
   lab file stays under 20 KB). mean(a) and sd(a) use the population formula (divide by n); dots(ctx, data, x0, w, lo, hi,
   y, r, col) draws a stacked dot plot; axis(ctx, x0, w, lo, hi, y, step, f) draws the number line with labels. */
const SDART={
mean(a){return a.reduce((s,v)=>s+v,0)/a.length},
sd(a){const m=SDART.mean(a);return Math.sqrt(a.reduce((s,v)=>s+(v-m)*(v-m),0)/a.length)},
r2(v){return String(Math.round(v*100)/100)},
dots(D,a,x0,w,lo,hi,y,r,col){const seen={};a.forEach(v=>{const k=seen[v]=(seen[v]||0)+1,x=x0+w*(v-lo)/(hi-lo);D.fillStyle=col;D.beginPath();D.arc(x,y-r-(k-1)*(2*r+2),r,0,7);D.fill()})},
axis(D,x0,w,lo,hi,y,step,f){D.strokeStyle='#334155';D.lineWidth=2;D.beginPath();D.moveTo(x0,y);D.lineTo(x0+w,y);D.stroke();D.fillStyle='#475569';D.font=`600 ${f(11)}px system-ui,sans-serif`;D.textAlign='center';D.textBaseline='top';
 for(let v=lo;v<=hi;v+=step){const x=x0+w*(v-lo)/(hi-lo);D.beginPath();D.moveTo(x,y-4);D.lineTo(x,y+4);D.stroke();D.fillText(String(v),x,y+6)}},
D0:[2,4,4,4,5,5,7,9],D3:[3,4,5,6,7],
bank:[['Data 1, 3, 5 have mean 3. What is the standard deviation (divide by n)?','1.63',[['2.67','noRoot'],['0','signedSum']]],
['Every value is multiplied by 3. The SD was 2. What is it now?','6',[['2','scaleNoChange'],['18','scaleSquare']]],
['Every value has 5 added. The SD was 2. What is it now?','2',[['7','shiftAdds'],['10','shiftAdds']]],
['Data 4, 4, 4, 4. What is the standard deviation?','0',[['4','sdIsMean'],['1','sdIsMean']]],
['Class A has SD 2 marks and class B has SD 9 marks. The means are the same. Whose marks are closer together?','Class A',[['Class B','bigIsTight'],["You can't tell without the mean",'needMean']]],
['The squared distances from the mean add to 50 for 8 values. What is the SD?','2.5',[['6.25','noRoot'],['0.88','rootFirst']]]]};
