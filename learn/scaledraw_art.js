/* Data and drawings for flagscaledraw (scale drawings and similar shapes; Maths, ages 10-11). Sources: DfE National
   Curriculum in England (2013) Year 6 Ratio and proportion ('solve problems involving similar shapes where the scale
   factor is known or can be found'; 'solve problems involving the calculation of percentages ... and the use of scale
   factors'), Year 6 Measurement (convert between metres and kilometres); Ordnance Survey map scales (1:25 000 and
   1:50 000: at 1:50 000, 1 cm on the map is 50 000 cm = 500 m on the ground); NCETM Year 6 ratio and proportion
   materials (scale factor as a multiplier, not an addition). Slips it targets: adding instead of multiplying (a
   4 cm wall at 1 cm : 2 m called 6 m; a 2 by 1 rectangle enlarged by 3 drawn 5 by 4); multiplying when you should
   divide (real to plan); finding a scale factor as a difference (4 to 12 called 8); scaling one side only; forgetting
   to convert metres to kilometres. */
const SCD=(()=>{
/* step 1: plan to real, 1 cm stands for 2 m; side = [x0,y0,x1,y1] in plan cm */
const PLAN={k:2,rooms:[{t:'Living room',x:0,y:0,w:5,h:3},{t:'Kitchen',x:5,y:0,w:3,h:3},{t:'Hall',x:0,y:3,w:8,h:1}]};
const READ=[{t:'the living room',cm:5,side:[0,0,5,0]},{t:'the kitchen wall',cm:3,side:[8,0,8,3]},{t:'the hall',cm:8,side:[0,4,8,4]}];
/* step 2: real to plan; draw each fence at 1 cm : 2 m */
const FENCE=[{m:8,t:'A fence 8 m long'},{m:14,t:'A hedge 14 m long'},{m:5,t:'A gate path 5 m long'}];
/* step 3: enlarge by a scale factor */
const ENL=[{w:2,h:1,k:3},{w:3,h:2,k:2}];
/* step 4: find the scale factor from A to B */
const PAIR=[{a:[4,2],b:[12,6],k:'3',o:[['8','diff'],['6','half']]},{a:[3,5],b:[6,10],k:'2',o:[['3','diff'],['5','diff']]},{a:[8,4],b:[4,2],k:'\u00BD',o:[['4','diff'],['2','flip']]}];
const PAIR_WHY={diff:'That is how many squares longer, not how many times longer. Divide: new side \u00F7 old side.',half:'Look again: 4 \u00D7 3 = 12 and 2 \u00D7 3 = 6.',flip:'B is smaller than A, so the scale factor is less than 1. 8 \u00D7 \u00BD = 4.'};
/* step 5: map at 1 : 50 000, so 1 cm on the map is 500 m; places at cm along a road from the school */
const MAP={cmPerUnit:1,m:500,places:[{t:'Park',cm:6,e:'\u{1F333}'},{t:'Station',cm:9,e:'\u{1F689}'}]};
const MAP_OPTS=[[['3 km','ok'],['30 km','units'],['6 km','scale']],[['4.5 km','ok'],['9 km','scale'],['45 km','units']]];
const DESC=['A house plan where 1 cm stands for 2 m. Tap the real length of the side shown in orange.',
 'A centimetre grid. Drag the end of the orange bar to draw the real length at 1 cm for 2 m, then tap Check.',
 'A small rectangle and a grid. Drag the corner to draw its enlargement by the scale factor, then tap Check.',
 'Two similar rectangles, A and B. Tap the scale factor that turns A into B.',
 'A map at 1 to 50 000. Drag the ruler end to the place, then tap the real distance.'];
const TXT=['On a plan, 1 cm stands for a real length. Multiply to find the real size.','To draw a real length, divide by the scale.',
 'Enlarge by a scale factor: multiply EVERY side by it.','Scale factor = new side \u00F7 old side. It can be less than 1.',
 'On a 1 : 50 000 map, 1 cm is 50 000 cm, which is 500 m.'];
const DONE=['5 cm is 10 m, 3 cm is 6 m and 8 cm is 16 m. Each cm is 2 m, so multiply by 2. Adding 2 would be wrong.',
 '8 m is 4 cm, 14 m is 7 cm and 5 m is 2.5 cm. Real to plan: divide by 2.',
 '2 by 1 became 6 by 3, and 3 by 2 became 6 by 4. Every side was multiplied, so the shape stayed the same.',
 'The factors were 3, 2 and \u00BD. Divide a new side by its old side. A factor under 1 makes it smaller.',
 '6 cm is 6 \u00D7 500 m = 3,000 m = 3 km. 9 cm is 4,500 m = 4.5 km.'];
const QS=[{q:'A plan uses 1 cm for 3 m. A wall is 4 cm on the plan. How long is the real wall?',a:'12 m',o:[['7 m','add'],['1.3 m','flip']]},
 {q:'A rectangle 3 cm by 2 cm is enlarged by scale factor 4. What size is the new rectangle?',a:'12 cm by 8 cm',o:[['7 cm by 6 cm','add'],['12 cm by 2 cm','shape']]},
 {q:'Rectangle A is 5 cm long. Similar rectangle B is 15 cm long. What is the scale factor from A to B?',a:'3',o:[['10','diff'],['\u2153','flip']]},
 {q:'A map is 1 : 50 000. Two towns are 4 cm apart. How far apart are they really?',a:'2 km',o:[['20 km','units'],['200 m','units']]},
 {q:'A model car is 1 : 20. The real car is 4 m long. How long is the model?',a:'20 cm',o:[['80 m','flip'],['24 cm','add']]},
 {q:'A plan uses 1 cm for 5 m. A real garden is 30 m long. How long is it on the plan?',a:'6 cm',o:[['150 cm','flip'],['25 cm','add']]},
 {q:'A triangle has sides 2, 3 and 4 cm. It is enlarged by scale factor 2. Which set is right?',a:'4, 6 and 8 cm',o:[['4, 5 and 6 cm','add'],['4, 3 and 4 cm','shape']]},
 {q:'Rectangle A is 12 cm wide. Similar rectangle B is 3 cm wide. What is the scale factor from A to B?',a:'\u00BC',o:[['9','diff'],['4','flip']]}];
/* ---------- drawings ---------- */
const INK='#0f172a',PAPER='#f8fafc',GRID='#cbd5e1',ORANGE='#c2410c',TEAL='#0f766e',OK='#047857',NO='#b91c1c',EDGE='#64748b',FF='px system-ui,sans-serif';
function rr(g,x,y,w,h,r){g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
function words(g,t,max,font){g.font=font;const out=[];let cur='';String(t).split(' ').forEach(w=>{const nx=cur?cur+' '+w:w;if(cur&&g.measureText(nx).width>max){out.push(cur);cur=w}else cur=nx});if(cur)out.push(cur);return out}
/* squared paper: cols x rows squares of u px from (x,y) */
function paper(g,x,y,cols,rows,u,dark){g.fillStyle=dark?'#0b1220':PAPER;g.fillRect(x,y,cols*u,rows*u);g.strokeStyle=dark?'#334155':GRID;g.lineWidth=1;
 for(let i=0;i<=cols;i++){g.beginPath();g.moveTo(x+i*u,y);g.lineTo(x+i*u,y+rows*u);g.stroke()}for(let j=0;j<=rows;j++){g.beginPath();g.moveTo(x,y+j*u);g.lineTo(x+cols*u,y+j*u);g.stroke()}}
function txt(g,t,x,y,n,o){o=o||{};g.font=`${o.w||800} ${n}${FF}`;g.fillStyle=o.col||INK;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillText(t,x,y)}
/* a rectangle on squared paper, in squares */
function block(g,x,y,u,w,h,fill,line){g.fillStyle=fill;g.fillRect(x,y,w*u,h*u);g.strokeStyle=line;g.lineWidth=3;g.strokeRect(x,y,w*u,h*u)}
/* a ruler along the bottom, 0..n cm, with u px per cm */
function ruler(g,x,y,n,u,dark){g.fillStyle=dark?'#fde68a':'#fef3c7';g.fillRect(x-6,y,n*u+12,30);g.strokeStyle='#92400e';g.lineWidth=1.5;g.strokeRect(x-6,y,n*u+12,30);
 for(let i=0;i<=n*2;i++){const xx=x+i*u/2;g.beginPath();g.moveTo(xx,y);g.lineTo(xx,y+(i%2?8:14));g.stroke();if(i%2===0&&(n<=10||i%4===0))txt(g,String(i/2),xx,y+22,11,{w:700})}}
function TOOLS(A){const dk=()=>A.col.dark,ink=()=>dk()?'#f1f5f9':INK,g=()=>A.ctx,sz=n=>A.narrow?n:Math.round(n*1.08);
 function top(t,tone,note,bad){const c=g(),f=`800 ${sz(16)}${FF}`,L=words(c,t,A.W-34,f),lh=sz(16)*1.3,h=L.length*lh+14;
  c.fillStyle=tone==='ok'?(dk()?'#14532d':'#dcfce7'):tone==='no'?(dk()?'#7f1d1d':'#fee2e2'):(dk()?'#1e293b':'#ffffff');rr(c,8,8,A.W-16,h,10);c.fill();
  c.lineWidth=tone?2.5:1.2;c.strokeStyle=tone==='ok'?OK:tone==='no'?NO:EDGE;c.stroke();c.font=f;c.fillStyle=ink();c.textAlign='left';c.textBaseline='top';L.forEach((r,i)=>c.fillText(r,17,15+i*lh));
  let y=8+h+6;if(note){const f2=`700 ${sz(14)}${FF}`,L2=words(c,note,A.W-34,f2).slice(0,3);c.font=f2;c.fillStyle=bad?(dk()?'#fca5a5':NO):(dk()?'#86efac':OK);L2.forEach((r,i)=>c.fillText(r,17,y+i*sz(14)*1.3));y+=L2.length*sz(14)*1.3+6}return y}
 function btn(r,t,o){o=o||{};const c=g();c.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':o.hot?'#ffedd5':'#ffffff';rr(c,r.x,r.y,r.w,r.h,10);c.fill();
  c.lineWidth=o.no||o.ok||o.hot?3.5:1.6;c.strokeStyle=o.no?NO:o.ok?OK:o.hot?ORANGE:EDGE;c.stroke();let n=sz(o.n||16),L;for(;;){L=words(c,t,r.w-12,`800 ${n}${FF}`);if(L.length*n*1.2<=r.h-6||n<=11)break;n--}
  c.font=`800 ${n}${FF}`;c.fillStyle=INK;c.textAlign='center';c.textBaseline='middle';L.forEach((s,i)=>c.fillText(s,r.x+r.w/2,r.y+r.h/2+(i-(L.length-1)/2)*n*1.2))}
 return{top,btn,ink,say:(t,x,y,n,o)=>txt(g(),t,x,y,sz(n),Object.assign({col:ink()},o||{}))}}
return{PLAN,READ,FENCE,ENL,PAIR,PAIR_WHY,MAP,MAP_OPTS,DESC,TXT,DONE,QS,rr,paper,block,ruler,txt,TOOLS,ORANGE,TEAL,INK}})();
