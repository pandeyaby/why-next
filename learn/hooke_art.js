/* Drawing helpers for the force–extension lab (flag_hooke.js; bundled in the main learn.js like structad_art.js so the
   lab file stays under 20 KB). spring(ctx, x, top, len, w) draws a clamp and a coiled spring of length len;
   axes(ctx, box, xMax, yMax, xStep, yStep, xLabel, yLabel) draws a labelled grid; the challenge bank lives here too. */
const HKART={
spring(D,x,top,len,w){D.fillStyle='#334155';D.fillRect(x-w,top-10,2*w,10);const n=14,seg=(len-16)/n;D.strokeStyle='#475569';D.lineWidth=2.5;D.beginPath();D.moveTo(x,top);D.lineTo(x,top+8);
 for(let i=0;i<n;i++){D.lineTo(x+(i%2?-w*.6:w*.6),top+8+seg*(i+.5))}D.lineTo(x,top+len-8);D.lineTo(x,top+len);D.stroke()},
axes(D,b,xm,ym,xs,ys,xl,yl,f){D.strokeStyle='#e2e8f0';D.lineWidth=1;for(let v=0;v<=xm+1e-9;v+=xs){const x=b.x+b.w*v/xm;D.beginPath();D.moveTo(x,b.y);D.lineTo(x,b.y+b.h);D.stroke()}
 for(let v=0;v<=ym+1e-9;v+=ys){const y=b.y+b.h-b.h*v/ym;D.beginPath();D.moveTo(b.x,y);D.lineTo(b.x+b.w,y);D.stroke()}
 D.strokeStyle='#0f172a';D.lineWidth=2;D.beginPath();D.moveTo(b.x,b.y);D.lineTo(b.x,b.y+b.h);D.lineTo(b.x+b.w,b.y+b.h);D.stroke();
 D.fillStyle='#475569';D.font=`600 ${f}px system-ui,sans-serif`;D.textAlign='center';D.textBaseline='top';for(let v=0;v<=xm+1e-9;v+=xs*2)D.fillText(String(+v.toFixed(2)),b.x+b.w*v/xm,b.y+b.h+3);
 D.textAlign='right';D.textBaseline='middle';for(let v=0;v<=ym+1e-9;v+=ys*2)D.fillText(String(+v.toFixed(2)),b.x-4,b.y+b.h-b.h*v/ym);
 D.fillStyle='#0f172a';D.font=`700 ${f}px system-ui,sans-serif`;D.textAlign='right';D.textBaseline='top';D.fillText(xl,b.x+b.w,b.y+b.h+f+6);D.textAlign='left';D.textBaseline='bottom';D.fillText(yl,b.x+2,b.y-3)},
bank:[['A spring has k = 50 N/m. What force stretches it by 0.1 m?','5 N',[['500 N','cmMetre'],['0.002 N','divide']]],
['A 10 cm spring is 16 cm long with a 3 N load. What is its extension?','6 cm',[['16 cm','lengthNotExt'],['3 cm','forceNotExt']]],
['A force–extension line passes through (0.04 m, 2 N). What is k?','50 N/m',[['0.02 N/m','upsideDown'],['0.5 N/m','cmMetre']]],
['Past the limit of proportionality, what happens to the graph?','It curves: extension is no longer proportional to force',[['It stays straight','alwaysLinear'],['The spring stops stretching','stopsStretch']]],
['Spring P has k = 20 N/m and spring Q has k = 80 N/m. Which is stiffer?','Q',[['P','stiffBackwards'],['Same: both are springs','stiffBackwards']]],
['A 4 N load stretches a spring 8 cm. What does 6 N stretch it, below the limit?','12 cm',[['10 cm','addNotScale'],['14 cm','addNotScale']]]]};
