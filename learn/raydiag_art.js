/* Drawing helpers for the ray diagrams lab (flag_raydiag.js; bundled in the main learn.js like fossil_art.js so the lab
   file stays under 20 KB): seg draws a solid or dashed line, arrow a mid-line arrowhead, candle a candle (a = opacity,
   k = scale) and eye an eye looking right; D holds the lab's colours, Snell's law (glass n = 1.5), its cases and the challenge questions. */
const RAYART={
seg(P,x1,y1,x2,y2,col,w,dash){P.strokeStyle=col;P.lineWidth=w||3;P.setLineDash(dash||[]);P.beginPath();P.moveTo(x1,y1);P.lineTo(x2,y2);P.stroke();P.setLineDash([])},
arrow(P,x1,y1,x2,y2,col,k){const a=Math.atan2(y2-y1,x2-x1),mx=(x1+x2)/2,my=(y1+y2)/2;P.fillStyle=col;P.beginPath();P.moveTo(mx+Math.cos(a)*k,my+Math.sin(a)*k);P.lineTo(mx+Math.cos(a+2.5)*k,my+Math.sin(a+2.5)*k);P.lineTo(mx+Math.cos(a-2.5)*k,my+Math.sin(a-2.5)*k);P.fill()},
candle(P,x,y,a,k){P.globalAlpha=a;P.fillStyle='#b45309';P.fillRect(x-5*k,y-30*k,10*k,30*k);P.fillStyle='#f97316';P.beginPath();P.ellipse(x,y-38*k,5*k,8*k,0,0,7);P.fill();P.globalAlpha=1},
eye(P,x,y,k){P.fillStyle='#0f172a';P.beginPath();P.ellipse(x,y,13*k,7*k,0,0,7);P.fill();P.fillStyle='#ffffff';P.beginPath();P.arc(x+3*k,y,4*k,0,7);P.fill()},
D:(()=>{const Q0={ink:'#0f172a',grey:'#475569',rule:'#94a3b8',card:'#ffffff',good:'#047857',bad:'#b91c1c',navy:'#1e3a8a',note:'#eef2ff',won:'#dcfce7',beam:'#dc2626',glass:'#cffafe',silver:'#64748b',gold:'#b45309'},
RAD=Math.PI/180,N=1.5,snell=(i,n1,n2)=>{const s=n1*Math.sin(i*RAD)/n2;return Math.abs(s)>1?null:Math.asin(s)/RAD},
CASES=[{t:'Air into glass',i:40,a:'air',b:'glass'},{t:'Glass into air',i:25,a:'glass',b:'air'},{t:'Air into glass along the normal',i:0,a:'air',b:'glass'}],
BLOCK=[0,20,40,60],DISTS=[20,35],LENS=[{t:'thin lens',f:.36},{t:'fat lens',f:.2}],
QS=[['A ray hits a plane mirror at 35° to the normal. What is the angle of reflection?','35°',[['55°','surface'],['70°','double']]],
['A ray hits a mirror at 20° to the mirror surface. What is the angle of reflection?','70°',[['20°','surface'],['40°','double']]],
['Light passes from air into glass at an angle. It bends…','towards the normal',[['away from the normal','wayRound'],['not at all','noBend']]],
['Light enters a glass block along the normal. What happens to its direction?','It goes straight on',[['It bends towards the normal','alongNormal'],['It reflects straight back','reflect']]],
['You stand 2 m in front of a plane mirror. How far are you from your image?','4 m',[['2 m','toMirror'],['1 m','half']]],
['In a plane-mirror ray diagram, how are lines behind the mirror drawn?','Dashed: light does not really go there',[['Solid, with arrows','realRays'],['There are none: the image is on the glass','onGlass']]]];
return{Q0,RAD,N,snell,CASES,BLOCK,DISTS,LENS,QS}})()};
