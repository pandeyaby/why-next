/* Line drawings for the structural adaptations lab (flag_structad.js; bundled in the main learn.js like fossil_art.js so the
   lab file stays under 20 KB): beak(ctx, kind, x, y, size) draws a seed, nectar, hooked or flat beak; body(ctx, kind, x, y, size)
   draws a flat block, a ball or a streamlined torpedo shape. */
const SADART={
beak(D,i,x,y,s){D.fillStyle='#f59e0b';D.strokeStyle='#0f172a';D.lineWidth=1.5;D.beginPath();
 if(i===0){D.moveTo(x,y-s*.35);D.lineTo(x+s*.55,y);D.lineTo(x,y+s*.35)}
 if(i===1){D.moveTo(x,y-s*.08);D.lineTo(x+s*1.5,y);D.lineTo(x,y+s*.08)}
 if(i===2){D.moveTo(x,y-s*.3);D.quadraticCurveTo(x+s*.75,y-s*.3,x+s*.55,y+s*.3);D.lineTo(x+s*.35,y+s*.05);D.lineTo(x,y+s*.2)}
 if(i===3){D.moveTo(x,y-s*.2);D.lineTo(x+s*.75,y-s*.14);D.quadraticCurveTo(x+s*.85,y,x+s*.75,y+s*.14);D.lineTo(x,y+s*.2)}D.closePath();D.fill();D.stroke()},
body(D,i,x,y,s){D.fillStyle=['#64748b','#0ea5e9','#1d4ed8'][i];D.strokeStyle='#0f172a';D.lineWidth=2;D.beginPath();
 if(i===0)D.rect(x-s*.5,y-s*.4,s,s*.8);if(i===1)D.arc(x,y,s*.45,0,7);if(i===2){D.moveTo(x+s*.9,y);D.quadraticCurveTo(x+s*.2,y-s*.42,x-s*.7,y-s*.12);D.lineTo(x-s*.9,y);D.lineTo(x-s*.7,y+s*.12);D.quadraticCurveTo(x+s*.2,y+s*.42,x+s*.9,y)}D.fill();D.stroke()}};
