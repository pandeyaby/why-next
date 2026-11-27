/* Data and drawings for flagprewrite (Pre-writing shapes: lines, circles and crosses; English, Handwriting &
   Transcription, ages 3-4). Sources: DfE Development Matters (2021) Physical Development 3-4 'use a comfortable grip
   with good control when holding pens and pencils', Reception 'develop the foundations of a handwriting style which is
   fast, accurate and efficient'; EYFS Statutory Framework (2024) ELG Fine Motor Skills; Beery and Beery (2010) Beery VMI
   norms (children imitate a vertical line, then a horizontal line and a circle, and copy a cross at about 4; diagonals,
   square, X and triangle come later); National Handwriting Association advice on pre-writing patterns (lines start at
   the top or the left, round shapes start at the top and go anticlockwise, as c, a, o and d do).
   Slips it targets: starting a line down at the bottom and pushing up; going across from right to left; a circle that
   starts at the bottom, goes clockwise or stops with a gap; a cross whose lines meet at an end (a T or an L), not in
   the middle. */
const PWS=(()=>{
const DESC=['Rain lines. A cloud is at the top and puddles are at the bottom. Drag from each green dot at the top down to the puddle, or use the buttons, to make rain.',
 'Three roads. A car waits on the left of each road, and a flag is on the right. Drag from the car across to the flag, or use the buttons.',
 'Two balls to draw. Each dotted circle has a green dot at the top and an arrow pointing round to the left. Drag round the circle back to the dot, or use the buttons.',
 'Two windows. Each one needs a cross: a line down from the top, then a line across that meets it in the middle. Drag along the dotted lines, or use the buttons.',
 'Pip the pencil draws a shape. Watch, then tap Right way or Wrong way, or use the buttons.',
 'A picture of a house in the rain with four parts missing: the sun, the rain, the window and the path. Drag each shape card to the part that needs it, or tap a card and then a part.'];
const TXT=['A line down starts at the top. Pull the pencil down, like rain falling.',
 'A line across starts on the left. Go across to the right, like a car on a road.',
 'A circle starts at the top. Go round to the left, the way you make c and o, and join up at the start.',
 'A cross is two lines. Draw a line down. Then draw a line across that meets it in the middle.',
 'Look at where Pip starts and which way Pip goes.',
 'These shapes make pictures. Later they make letters too.'];
const DONE=['Three lines down, all from the top. That is rain!','Three lines across, all from the left. The cars got to the flags.',
 'Two round balls. Each one started at the top, went round to the left and joined up.','Two crosses. Each line down came first, and each line across met it in the middle.',
 'You checked where Pip started and which way Pip went.','Sun is a circle, rain is lines down, the path is a line across and the window is a cross.'];
/* step 5: Pip's drawings. k = shape, ok = right way, why = what went wrong */
const CLIPS=[{k:'down',from:'top',ok:true,say:'a line down from the top'},
 {k:'down',from:'bottom',ok:false,say:'a line from the bottom, pushing up',why:'Pip started at the bottom. A line down starts at the top.'},
 {k:'across',from:'right',ok:false,say:'a line across from the right',why:'Pip started on the right. A line across starts on the left.'},
 {k:'round',from:'top',ok:true,say:'a circle from the top, round to the left'},
 {k:'round',from:'gap',ok:false,say:'a circle that stops with a gap',why:'Pip stopped too soon. Keep going round until you join up at the start.'},
 {k:'cross',from:'tee',ok:false,say:'a line down and a line across at the top, like a T',why:'The lines meet at the top, so it is a T. In a cross they meet in the middle.'},
 {k:'cross',from:'mid',ok:true,say:'a cross that meets in the middle'}];
/* step 6: picture parts and the shape each one needs */
const SHAPES=[{k:'round',name:'Circle'},{k:'down',name:'Line down'},{k:'across',name:'Line across'},{k:'cross',name:'Cross'}];
const PARTS=[{k:'round',name:'the sun',no:'The sun is round. It needs a circle.'},{k:'down',name:'the rain',no:'Rain falls down. It needs lines down.'},
 {k:'cross',name:'the window',no:'The window has four panes. It needs a cross: a line down and a line across.'},{k:'across',name:'the path',no:'The path goes along the ground. It needs a line across.'}];
/* challenge: a = right answer; o = [wrong answer, slip tag] */
const QS=[{q:'Where does a line down start?',a:'At the top',o:[['At the bottom','bottom'],['In the middle','middle']]},
 {q:'Which way does a line across go?',a:'From the left to the right',o:[['From the right to the left','rtl'],['From the top down','down']]},
 {q:'Where does a circle start?',a:'At the top',o:[['At the bottom','bottom'],['At the side','middle']]},
 {q:'A circle for o goes round which way first?',a:'Round to the left, like c',o:[['Round to the right','cw'],['Straight down','down']]},
 {q:'A cross is a line down and a line across. Where do they meet?',a:'In the middle',o:[['At the top, like T','tee'],['At the bottom, like L','ell']]},
 {q:'Sam draws a ball, but it has a gap. What should Sam do?',a:'Keep going round to the start',o:[['Stop, it is done','gap'],['Start again at the bottom','bottom']]}];
/* ---------- drawings ---------- */
const INK='#0f172a',PALE='#f8fafc',GOOD='#047857',BAD='#b91c1c',LINE='#64748b',PICK='#1d4ed8',GO='#16a34a',STOP='#dc2626',FONT='px system-ui,sans-serif';
function rr(g,x,y,w,h,r){r=Math.min(r,w/2,h/2);g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
function wrap(g,text,maxW,font){g.font=font;const rows=[];let line='';String(text).split(' ').forEach(w=>{const t=line?line+' '+w:w;if(line&&g.measureText(t).width>maxW){rows.push(line);line=w}else line=t});if(line)rows.push(line);return rows}
/* the message strip at the top, a fixed height so the drawing places never move */
function head(A,text,mood,room){const g=A.ctx,dk=A.col.dark;let fs=A.narrow?18:20,rows;
 do{rows=wrap(g,text,A.W-40,`800 ${fs}px system-ui,sans-serif`);if(rows.length*fs*1.28+14<=room)break;fs--}while(fs>12);
 g.fillStyle=mood==='ok'?(dk?'#14532d':'#dcfce7'):mood==='no'?(dk?'#7f1d1d':'#fee2e2'):(dk?'#1e293b':'#ffffff');rr(g,8,8,A.W-16,room,14);g.fill();
 g.strokeStyle=mood==='ok'?GOOD:mood==='no'?BAD:LINE;g.lineWidth=mood?2.5:1.2;g.stroke();g.font=`800 ${fs}px system-ui,sans-serif`;g.fillStyle=dk?PALE:INK;g.textAlign='left';g.textBaseline='middle';
 rows.forEach((t,i)=>g.fillText(t,20,8+room/2+(i-(rows.length-1)/2)*fs*1.28))}
function dotted(g,dk,draw){g.save();g.setLineDash([3,9]);g.lineCap='round';g.lineWidth=5;g.strokeStyle=dk?'#94a3b8':'#94a3b8';g.beginPath();draw();g.stroke();g.restore()}
function startDot(g,x,y,dk){g.fillStyle=GO;g.beginPath();g.arc(x,y,13,0,7);g.fill();g.strokeStyle=dk?'#dcfce7':'#ffffff';g.lineWidth=3;g.stroke()}
function arrowHead(g,x,y,ang,col){g.save();g.translate(x,y);g.rotate(ang);g.fillStyle=col;g.beginPath();g.moveTo(10,0);g.lineTo(-6,-8);g.lineTo(-6,8);g.closePath();g.fill();g.restore()}
/* a drawn stroke: the child's crayon line */
function crayon(g,pts,col,w){if(pts.length<2)return;g.save();g.lineCap='round';g.lineJoin='round';g.strokeStyle=col;g.lineWidth=w||9;g.beginPath();g.moveTo(pts[0].x,pts[0].y);pts.forEach(p=>g.lineTo(p.x,p.y));g.stroke();g.restore()}
function cloud(g,cx,cy,w,dk){const r=Math.min(w/9,24),n=Math.max(3,Math.round(w/(1.5*r)));g.fillStyle=dk?'#cbd5e1':'#e2e8f0';g.beginPath();for(let k=0;k<n;k++){const x=cx-w/2+r+k*(w-2*r)/(n-1),y=cy+(k%2?-r*.35:r*.15);g.moveTo(x+r,y);g.arc(x,y,r,0,7)}g.rect(cx-w/2+r,cy-r*.2,w-2*r,r*1.1);g.fill()}
function puddle(g,cx,cy,w,dk){g.fillStyle=dk?'#1d4ed8':'#93c5fd';g.beginPath();g.ellipse(cx,cy,w/2,9,0,0,7);g.fill()}
function car(g,x,y,dk){g.fillStyle='#dc2626';rr(g,x-20,y-14,40,16,5);g.fill();rr(g,x-11,y-24,22,12,4);g.fill();g.fillStyle=dk?'#e2e8f0':'#1e293b';[x-11,x+11].forEach(cx=>{g.beginPath();g.arc(cx,y+3,5,0,7);g.fill()})}
function flag(g,x,y,dk){g.strokeStyle=dk?'#e2e8f0':'#334155';g.lineWidth=3;g.beginPath();g.moveTo(x,y+12);g.lineTo(x,y-26);g.stroke();g.fillStyle='#f59e0b';g.beginPath();g.moveTo(x,y-26);g.lineTo(x+20,y-19);g.lineTo(x,y-12);g.closePath();g.fill()}
function ball(g,x,y,r){g.fillStyle='#f97316';g.beginPath();g.arc(x,y,r,0,7);g.fill();g.strokeStyle='#ffffff';g.lineWidth=4;g.beginPath();g.arc(x,y,r*.7,-.6,.6);g.stroke()}
function sun(g,x,y,r,dk){g.strokeStyle='#d97706';g.lineWidth=4;g.lineCap='round';for(let i=0;i<8;i++){const a=i*Math.PI/4;g.beginPath();g.moveTo(x+Math.cos(a)*(r+6),y+Math.sin(a)*(r+6));g.lineTo(x+Math.cos(a)*(r+16),y+Math.sin(a)*(r+16));g.stroke()}g.fillStyle='#facc15';g.beginPath();g.arc(x,y,r,0,7);g.fill();g.strokeStyle='#b45309';g.lineWidth=3;g.stroke()}
/* Pip the pencil, tip at (x, y) */
function pip(g,x,y,dk){g.save();g.translate(x,y);g.rotate(-.6);g.fillStyle='#fde68a';g.beginPath();g.moveTo(0,0);g.lineTo(9,-16);g.lineTo(-9,-16);g.closePath();g.fill();g.fillStyle=INK;g.beginPath();g.moveTo(0,0);g.lineTo(3.5,-6);g.lineTo(-3.5,-6);g.closePath();g.fill();
 g.fillStyle='#2563eb';g.fillRect(-9,-58,18,42);g.fillStyle='#f9a8d4';g.fillRect(-9,-68,18,10);g.fillStyle='#ffffff';g.beginPath();g.arc(-3.5,-42,3.2,0,7);g.arc(3.5,-42,3.2,0,7);g.fill();g.fillStyle=INK;g.beginPath();g.arc(-3,-42,1.6,0,7);g.arc(4,-42,1.6,0,7);g.fill();g.restore()}
/* a small icon of each pre-writing shape, centred at (x, y) with half-size s */
function icon(g,k,x,y,s,col){g.save();g.strokeStyle=col;g.lineWidth=Math.max(4,s/5);g.lineCap='round';g.beginPath();
 if(k==='down'){g.moveTo(x,y-s);g.lineTo(x,y+s)}else if(k==='across'){g.moveTo(x-s,y);g.lineTo(x+s,y)}else if(k==='round'){g.arc(x,y,s*.85,0,7)}else{g.moveTo(x,y-s);g.lineTo(x,y+s);g.moveTo(x-s,y);g.lineTo(x+s,y)}g.stroke();g.restore()}
function chip(g,r,label,state,dk,k){g.fillStyle=state==='no'?'#fee2e2':state==='ok'?'#dcfce7':state==='sel'?'#dbeafe':'#ffffff';rr(g,r.x,r.y,r.w,r.h,14);g.fill();g.strokeStyle=state==='no'?BAD:state==='ok'?GOOD:state==='sel'?PICK:LINE;g.lineWidth=state?4:2;g.stroke();
 const s=Math.min(r.h*.3,18);if(k)icon(g,k,r.x+s+14,r.y+r.h/2,s,'#1e293b');g.font=`800 ${r.w<120?14:16}${FONT}`;g.fillStyle=INK;g.textAlign=k?'left':'center';g.textBaseline='middle';g.fillText(label,k?r.x+2*s+24:r.x+r.w/2,r.y+r.h/2)}
/* ---------- judging one stroke (T = how far off still counts, in px) ---------- */
const far=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
function offLine(pts,a,b){const L=far(a,b)||1;return Math.max(...pts.map(p=>Math.abs((b.x-a.x)*(a.y-p.y)-(a.x-p.x)*(b.y-a.y))/L))}
/* a straight stroke: right start, right way, all the way, near the dotted line */
function lineVerdict(pts,a,b,T){const s=pts[0],e=pts[pts.length-1];
 if(far(s,b)<T*1.3&&far(e,a)<far(e,b))return'back';
 if(far(s,a)>T*1.3)return'start';
 if(offLine(pts,a,b)>T*1.4)return'wobble';
 if(far(e,b)>T*1.5)return'short';return'ok'}
/* a round stroke: start at the top, turn to the left (anticlockwise), all the way round and join up */
function roundVerdict(pts,t,T){const s=pts[0],e=pts[pts.length-1];let turn=0;
 for(let i=1;i<pts.length;i++){let d=Math.atan2(pts[i].y-t.y,pts[i].x-t.x)-Math.atan2(pts[i-1].y-t.y,pts[i-1].x-t.x);if(d>Math.PI)d-=2*Math.PI;if(d<-Math.PI)d+=2*Math.PI;turn+=d}
 const onRing=pts.filter(p=>Math.abs(far(p,t)-t.R)<t.R*.45).length/pts.length;
 if(far(s,{x:t.x,y:t.y+t.R})<T*1.3)return'bottom';
 if(far(s,{x:t.x,y:t.y-t.R})>T*1.4)return'start';
 if(onRing<.7)return'wobble';
 if(turn>5)return'cw';
 if(turn>-5.2||far(e,s)>T*1.6)return'gap';return'ok'}
const LINE_SAY={down:{back:'You pushed up from the bottom. Rain falls down: start at the green dot at the top.',start:'Start at the green dot at the top, under the cloud.',wobble:'Try to stay on the dotted line, straight down.',short:'Keep going, all the way down to the puddle.',ok:'Down from the top. Splash!'},
 across:{back:'You went from the flag back to the car. Start on the left, where the car is.',start:'Start at the green dot by the car, on the left.',wobble:'Try to stay on the road, straight across.',short:'Keep going, all the way to the flag.',ok:'Across from the left. The car got to the flag!'}};
const ROUND_SAY={bottom:'You started at the bottom. A circle starts at the top, at the green dot.',start:'Start at the green dot at the top.',wobble:'Try to stay on the dotted circle as you go round.',
 cw:'That went round to the right. Circles for c and o go round to the left first. Follow the arrow.',gap:'Keep going round until you get back to the green dot, so the ball has no gap.',ok:'Round to the left and joined up. A ball!'};
/* pretend strokes for Show me and the buttons; the lab feeds them through the same judge */
function pathFor(kind,t,how){const n=14,L=[];
 if(kind==='line'){const [a,b]=how==='back'?[t.b,t.a]:[t.a,t.b];for(let j=0;j<=n;j++)L.push({x:a.x+(b.x-a.x)*j/n,y:a.y+(b.y-a.y)*j/n});return L}
 if(kind==='round'){const a0=how==='bottom'?Math.PI/2:-Math.PI/2,dir=how==='cw'?1:-1,span=how==='gap'?Math.PI*1.1:Math.PI*2.02;for(let j=0;j<=26;j++){const a=a0+dir*span*j/26;L.push({x:t.x+Math.cos(a)*t.R,y:t.y+Math.sin(a)*t.R})}return L}
 if(kind==='v')return pathFor('line',{a:{x:t.x,y:t.y-t.R},b:{x:t.x,y:t.y+t.R}},how);
 const yy={top:t.y-t.R*.85,low:t.y+t.R*.85}[how]||t.y;return pathFor('line',{a:{x:t.x-t.R,y:yy},b:{x:t.x+t.R,y:yy}},how==='back'?'back':'')}
/* one of Pip's drawings as points; null lifts the pencil */
function clipPts(C,W,H,y0){const s=Math.min(W*.26,(H-y0)*.24),cx=W/2,cy=y0+18+s,t={x:cx,y:cy,R:s};
 if(C.k==='down')return pathFor('line',{a:{x:cx,y:cy-s},b:{x:cx,y:cy+s}},C.from==='bottom'?'back':'');
 if(C.k==='across')return pathFor('line',{a:{x:cx-s,y:cy},b:{x:cx+s,y:cy}},C.from==='right'?'back':'');
 if(C.k==='round')return pathFor('round',t,C.from);
 return pathFor('v',t,'').concat([null],pathFor('h',t,C.from==='tee'?'top':'mid'))}
/* the house scene for the picture step: grass, walls, roof and door */
function house(g,W,hx,hw,hy,hh,ground,cy,dk){g.fillStyle=dk?'#14532d':'#bbf7d0';g.fillRect(8,ground,W-16,cy-ground-6);g.fillStyle=dk?'#78350f':'#fed7aa';g.fillRect(hx-hw/2,hy,hw,hh);g.fillStyle='#b91c1c';g.beginPath();g.moveTo(hx-hw/2-10,hy);g.lineTo(hx,hy-hh*.55);g.lineTo(hx+hw/2+10,hy);g.closePath();g.fill(); g.fillStyle=dk?'#1e293b':'#7c2d12';g.fillRect(hx+hw*.12,hy+hh*.4,hw*.22,hh*.6);}
return{DESC,TXT,DONE,CLIPS,SHAPES,PARTS,QS,INK,PALE,GOOD,BAD,LINE,PICK,GO,STOP,rr,wrap,head,far,lineVerdict,roundVerdict,LINE_SAY,ROUND_SAY,pathFor,clipPts,house,dotted,startDot,arrowHead,crayon,cloud,puddle,car,flag,ball,sun,pip,icon,chip}})();
