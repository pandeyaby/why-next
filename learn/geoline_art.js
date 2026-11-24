/* Data and drawings for flaglineray (points, lines, line segments and rays; ages 9-10). Sources: CCSS 4.G.A.1 ('draw
   points, lines, line segments, rays, angles (right, acute, obtuse), and perpendicular and parallel lines; identify
   these in two-dimensional figures'); CCSS 4.MD.C.5a (an angle is formed where two rays share a common endpoint);
   DfE National Curriculum 2013, Year 3 and Year 4 geometry (right angles as a quarter turn; acute and obtuse angles;
   horizontal, vertical, perpendicular and parallel lines); NCETM primary geometry glossary (a line is infinitely long;
   a line segment has two endpoints and a fixed length; a ray has one endpoint and goes on for ever in one direction;
   naming: segment AB, line AB, ray AB with the endpoint written first). Slips it targets: calling every straight
   mark a 'line'; trying to measure a ray or a line; reading ray AB and ray BA as the same ray; thinking arrows mean
   'pointing at something' rather than 'goes on for ever'; thinking longer arms make a bigger angle; counting one
   shared side twice when finding the segments in a figure. */
const GLN=(()=>{
/* the board is 12 x 8 squares; 1 square = 1 cm */
const BW=12,BH=8;
/* step 1: two draggable points and three ways to join them */
const KINDS=[{k:'seg',t:'Line segment',say:'Line segment AB: it stops at A and at B. Two endpoints, so it has a length you can measure.'},
 {k:'ray',t:'Ray',say:'Ray AB: it starts at A, goes through B and keeps going for ever. One endpoint, one arrow.'},
 {k:'line',t:'Line',say:'Line AB: it goes on for ever both ways. No endpoints, an arrow at each end.'}];
/* step 2: six figures; only segments have a length */
const FIGS=[{k:'seg',a:[1,1],b:[5,1],n:'1'},{k:'seg',a:[1,3],b:[4,7],n:'2'},{k:'seg',a:[6,1.5],b:[6,6.5],n:'3'},
 {k:'ray',a:[7.5,1],b:[9,1],n:'4'},{k:'ray',a:[8,5],b:[10,4],n:'5'},{k:'line',a:[8,7.5],b:[10,7.5],n:'6'}];
/* step 3: three points on one line; build each named ray by tapping its endpoint, then a point it passes through */
const PTS={P:[2,4],Q:[6,4],R:[10,4]},GOALS=['QR','QP','RP'];
/* step 4: an angle is two rays from one vertex */
const VX=[4,6],ARM=5,KIND=d=>d<90?'acute':d===90?'right':d<180?'obtuse':'straight';
/* step 5: a house: every side is a segment; the top of the walls is also the bottom of the roof */
const HOUSE=[[[3,4],[9,4]],[[3,4],[3,7.5]],[[9,4],[9,7.5]],[[3,7.5],[9,7.5]],[[3,4],[6,1]],[[9,4],[6,1]]];
const DESC=['A grid with two points, A and B. Drag A or B to a new place. Choose line segment, ray or line to join them.',
 'Six straight figures, numbered 1 to 6. Tap a figure to measure it with the ruler. Only some can be measured.',
 'Three points in a row: P, Q and R. Tap the endpoint of the ray first, then a point it passes through.',
 'A vertex with two rays. One ray is fixed. Drag the end of the other ray round to open or close the angle.',
 'A house made of straight sides. Tap each line segment you can find. A side counts once.'];
const TXT=['A point is an exact place. Join two points and you can make three different things.',
 'Can you measure every straight figure with a ruler?',
 'A ray is named by its endpoint first. Does the order of the letters matter?',
 'Two rays from the same endpoint make an angle. That endpoint is the vertex.',
 'Shapes are made of line segments. Find them all.'];
const DONE=['A segment has two endpoints, a ray has one, a line has none.',
 'Only line segments have a length. Rays and lines go on for ever, so a ruler can never reach the end.',
 'Ray QR and ray QP start at the same point but go opposite ways. Together they make line PR.',
 'Acute is less than a right angle, right is a square corner, obtuse is between a right angle and a straight line.',
 'The house has 6 line segments and 5 vertices. The top of the walls is also the bottom of the roof, so it counts once.'];
const QS=[{q:'Which figure has exactly two endpoints?',a:'A line segment',o:[['A ray','ends'],['A line','ends']]},
 {q:'Can you measure the length of a ray?',a:'No, it goes on for ever',o:[['Yes, from the endpoint to the arrow','length'],['Yes, it is 10 cm','length']]},
 {q:'Is ray AB the same as ray BA?',a:'No, they start at different points',o:[['Yes, same letters','order'],['Yes, both go through A and B','order']]},
 {q:'What does the arrow on a ray show?',a:'It keeps going for ever that way',o:[['It points at something','arrow'],['Where it stops','arrow']]},
 {q:'Two rays share an endpoint. What do they make?',a:'An angle',o:[['A line segment','vertex'],['A point','vertex']]},
 {q:'You make the arms of an angle longer. What happens to the angle?',a:'It stays the same size',o:[['It gets bigger','arms'],['It gets smaller','arms']]},
 {q:'A triangle is drawn. How many line segments make it?',a:'3',o:[['6, two for each corner','twice'],['1, it is one shape','twice']]},
 {q:'Which has no endpoints at all?',a:'A line',o:[['A line segment','ends'],['A ray','ends']]}];
/* ---------- drawings ---------- */
const INK='#0f172a',OK='#047857',NO='#b91c1c',RIM='#64748b',F='px system-ui,sans-serif';
function board(A,x,y,w,h){const s=Math.min(w/BW,h/BH),ox=x+(w-s*BW)/2,oy=y+(h-s*BH)/2,g=A.ctx,dk=A.col.dark;
 g.fillStyle=dk?'#0f172a':'#ffffff';g.fillRect(ox,oy,s*BW,s*BH);g.strokeStyle=dk?'#334155':'#e2e8f0';g.lineWidth=1;g.beginPath();
 for(let i=0;i<=BW;i++){g.moveTo(ox+i*s,oy);g.lineTo(ox+i*s,oy+BH*s)}for(let j=0;j<=BH;j++){g.moveTo(ox,oy+j*s);g.lineTo(ox+BW*s,oy+j*s)}g.stroke();
 g.strokeStyle=RIM;g.lineWidth=1.5;g.strokeRect(ox,oy,s*BW,s*BH);
 return{s,ox,oy,px:p=>({x:ox+p[0]*s,y:oy+p[1]*s}),un:q=>[(q.x-ox)/s,(q.y-oy)/s]}}
/* where a path from a in direction d leaves the board */
function exit(a,d){let t=1e9;if(d[0]>0)t=Math.min(t,(BW-a[0])/d[0]);if(d[0]<0)t=Math.min(t,-a[0]/d[0]);if(d[1]>0)t=Math.min(t,(BH-a[1])/d[1]);if(d[1]<0)t=Math.min(t,-a[1]/d[1]);return[a[0]+d[0]*t,a[1]+d[1]*t]}
function ends(k,a,b){const d=[b[0]-a[0],b[1]-a[1]];if(k==='seg')return[a,b];if(k==='ray')return[a,exit(a,d)];return[exit(a,[-d[0],-d[1]]),exit(a,d)]}
function arrow(g,f,t,s,col){const an=Math.atan2(t.y-f.y,t.x-f.x),L=s*.45;g.fillStyle=col;g.beginPath();g.moveTo(t.x,t.y);g.lineTo(t.x-L*Math.cos(an-.45),t.y-L*Math.sin(an-.45));g.lineTo(t.x-L*Math.cos(an+.45),t.y-L*Math.sin(an+.45));g.closePath();g.fill()}
function dot(g,p,r,col,ring){g.fillStyle=col;g.beginPath();g.arc(p.x,p.y,r,0,7);g.fill();if(ring){g.strokeStyle=ring;g.lineWidth=2;g.stroke()}}
function figure(A,B,k,a,b,col,wid){const g=A.ctx,[e0,e1]=ends(k,a,b),p0=B.px(e0),p1=B.px(e1);g.strokeStyle=col;g.lineWidth=wid||4;g.lineCap='round';g.beginPath();g.moveTo(p0.x,p0.y);g.lineTo(p1.x,p1.y);g.stroke();
 const s=Math.max(14,B.s*.7);if(k!=='seg')arrow(g,p0,p1,s,col);if(k==='line')arrow(g,p1,p0,s,col);if(k!=='line')dot(g,B.px(a),Math.max(5,B.s*.16),col);if(k==='seg')dot(g,B.px(b),Math.max(5,B.s*.16),col)}
/* distance (in squares) from board point q to the drawn figure */
function gap(k,a,b,q){const d=[b[0]-a[0],b[1]-a[1]],L2=d[0]*d[0]+d[1]*d[1];let t=((q[0]-a[0])*d[0]+(q[1]-a[1])*d[1])/L2;if(k==='seg')t=Math.max(0,Math.min(1,t));if(k==='ray')t=Math.max(0,t);return Math.hypot(a[0]+d[0]*t-q[0],a[1]+d[1]*t-q[1])}
function PEN(A){const sz=n=>A.narrow?n:Math.round(n*1.1),g=()=>A.ctx,dk=()=>A.col.dark,fg=()=>dk()?'#f1f5f9':INK;
 function wrap(t,max,font){const c=g();c.font=font;const out=[];let line='';for(const w of String(t).split(' ')){const nx=line?line+' '+w:w;if(line&&c.measureText(nx).width>max){out.push(line);line=w}else line=nx}if(line)out.push(line);return out}
 function banner(t,tone,note,bad){const c=g(),font=`800 ${sz(15)}${F}`,L=wrap(t,A.W-34,font),lh=sz(15)*1.3,h=L.length*lh+12;
  c.fillStyle=tone==='ok'?(dk()?'#14532d':'#dcfce7'):tone==='no'?(dk()?'#7f1d1d':'#fee2e2'):(dk()?'#1e293b':'#f8fafc');A.paint.rrect(8,8,A.W-16,h,10);c.fill();
  c.lineWidth=tone?2.5:1.2;c.strokeStyle=tone==='ok'?OK:tone==='no'?NO:RIM;c.stroke();c.font=font;c.fillStyle=fg();c.textAlign='left';c.textBaseline='top';L.forEach((r,i)=>c.fillText(r,17,14+i*lh));
  let y=8+h+5;if(note){const f2=`700 ${sz(13)}${F}`,L2=wrap(note,A.W-34,f2).slice(0,3);c.font=f2;c.fillStyle=bad?(dk()?'#fca5a5':NO):(dk()?'#86efac':OK);L2.forEach((r,i)=>c.fillText(r,17,y+i*sz(13)*1.3));y+=L2.length*sz(13)*1.3+5}return y}
 function tag(t,x,y,n,col){const c=g();c.font=`800 ${sz(n)}${F}`;const w=c.measureText(t).width+10,h=sz(n)*1.45;c.fillStyle=dk()?'#1e293b':'#ffffff';A.paint.rrect(x-w/2,y-h/2,w,h,6);c.fill();c.strokeStyle=col||RIM;c.lineWidth=1.5;c.stroke();c.fillStyle=fg();c.textAlign='center';c.textBaseline='middle';c.fillText(t,x,y+.5)}
 return{banner,tag,wrap,sz,fg}}
return{BW,BH,KINDS,FIGS,PTS,GOALS,VX,ARM,KIND,HOUSE,DESC,TXT,DONE,QS,board,ends,arrow,dot,figure,gap,PEN,OK,NO,RIM,INK}})();
