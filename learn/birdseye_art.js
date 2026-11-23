/* Data and pictures for flagbirdseye (looking from above: bird's-eye view; ages 4-5). Sources: DfE Development
   Matters (2021), Reception Mathematics ('select, rotate and manipulate shapes to develop spatial reasoning skills';
   'discuss routes and locations'); DfE National Curriculum (2013), Geography KS1 ('use aerial photographs and plan
   perspectives'; 'devise a simple map'); Piaget and Inhelder (1956), The Child's Conception of Space (young children
   often assume others see what they see); Frick, Mohring and Newcombe (2014), 'Picturing perspectives', Frontiers in
   Psychology 5:386 (perspective taking improves a lot between 4 and 8). Views: a sphere is a circle from every side;
   a cube is a square from the top and the side; a cylinder standing up is a circle from above and a rectangle from
   the side; a cone standing on its base is a circle with its point in the middle from above and a triangle from the
   side; a square-based pyramid is a square with lines to the middle from above and a triangle from the side; a
   cuboid lying flat is a rectangle from above. Slips it targets: drawing the side view for the top (a hat from above
   is a triangle); thinking the thing itself changes; thinking everything looks different from above (a ball does not). */
const BIRDSEYE=(()=>{
const NAME={ball:'ball',box:'box',hat:'party hat',tin:'tin',cube:'block',pyr:'pyramid'};
/* step 1: drag each toy to how it looks from above */
const MATCH=['ball','box','hat','cube'];
const TOPS=[{k:'ball',l:'Circle'},{k:'box',l:'Long rectangle'},{k:'hat',l:'Circle with a dot'},{k:'cube',l:'Square'}];
/* step 2: move the eye to the top */
const EYE=['hat','tin','box'];
const SIDEWORD={ball:'a circle',box:'a long rectangle',hat:'a triangle',tin:'a rectangle',cube:'a square',pyr:'a triangle'};
const TOPWORD={ball:'a circle',box:'a long rectangle',hat:'a circle with a dot',tin:'a circle',cube:'a square',pyr:'a square with lines to the middle'};
/* step 3: same from the side and the top? s = 1 same */
const SAME=[{k:'ball',s:1},{k:'tin',s:0},{k:'cube',s:1},{k:'hat',s:0},{k:'pyr',s:0}];
/* step 4: who sees this picture? b = 1 the bird above, 0 the child at the side */
const WHO=[{k:'tin',b:1},{k:'hat',b:0},{k:'hat',b:1},{k:'pyr',b:0},{k:'pyr',b:1}];
/* step 5: a bird's-eye plan of a playground (x, y, w, h as parts of the plan) */
const PLAN=[{k:'sand',l:'sandpit',x:.08,y:.12,w:.3,h:.36,why:'The sandpit is round, so from above it is a circle.'},
 {k:'slide',l:'slide',x:.55,y:.1,w:.12,h:.62,why:'A slide is long and thin, so from above it is a long thin rectangle.'},
 {k:'frame',l:'climbing frame',x:.12,y:.6,w:.28,h:.3,why:'The climbing frame has square sides, so from above it is a square of bars.'},
 {k:'tree',l:'tree',x:.75,y:.55,w:.2,h:.33,why:'From above you see the top of the tree: a green circle of leaves.'}];
const FIND=['sand','slide','frame'];
const DESC=['Four toys in a row and four shapes below: how each toy looks from above. Drag a toy onto its shape, or use the buttons.',
 'A toy with an eye beside it. Drag the eye up to the top, or tap Look from above, to see how the toy looks from up high.',
 'A toy, and two boxes: Same from the side and the top, or Different. Drag the toy to a box, or use the buttons.',
 'A picture of a toy seen from one place. Tap the bird if it is seen from above, or the child if it is seen from the side.',
 'A bird\'s-eye plan of a playground, as a bird sees it from above. Tap the thing that is named, or use the buttons.'];
const TXT=['From above, how does each toy look? Drag it to its shape.','Move the eye to the top. What does the toy look like now?','Does it look the same from the side and the top?','Who saw it: the bird up high, or the child at the side?','This is a plan: the playground seen from above. Find each thing.'];
const DONE=['From above: the ball is a circle, the box a long rectangle, the hat a circle with a dot, the block a square.',
 'From the side the hat is a triangle, but from above it is a circle with a dot. The toy did not change; the place you look from did.',
 'A ball and a block look the same from the side and the top. A tin, a hat and a pyramid look different.',
 'From above you see the top: circles and squares. From the side you see triangles and rectangles.',
 'A plan shows each thing from above: a round sandpit is a circle, a slide is a long rectangle.'];
const QS=[{q:'A party hat stands on the table. What does it look like from above?',a:'A circle with a dot',o:[['A triangle','side'],['A square','guess']]},
 {q:'A tin of beans stands up. What does it look like from above?',a:'A circle',o:[['A rectangle','side'],['A triangle','guess']]},
 {q:'Which toy looks like a circle from every side?',a:'A ball',o:[['A tin','tin'],['A party hat','hat']]},
 {q:'You look down at a hat, then crouch to look from the side. Did the hat change shape?',a:'No, only where I look from changed',o:[['Yes, it got pointy','change'],['Yes, it got round','change']]},
 {q:'On a plan of the park, what shape is the round pond?',a:'A circle',o:[['A triangle','side'],['A long rectangle','plan']]},
 {q:'A bird flies over a box. What does the bird see?',a:'A rectangle',o:[['A circle','guess'],['A triangle','side']]},
 {q:'A pyramid from above looks like ...',a:'A square with lines to the middle',o:[['A triangle','side'],['A circle','guess']]}];
/* canvas helpers */
function KIT(A){const INK='#0f172a',OK='#047857',NO='#b91c1c',RIM='#64748b',F='px system-ui,sans-serif',sz=n=>A.narrow?n:Math.round(n*1.15);
 const g=()=>A.ctx,dk=()=>A.col.dark,fg=()=>dk()?'#f1f5f9':INK;
 function wrap(t,max,font){const c=g();c.font=font;const out=[];let line='';for(const w of t.split(' ')){const nx=line?line+' '+w:w;if(line&&c.measureText(nx).width>max){out.push(line);line=w}else line=nx}if(line)out.push(line);return out}
 function head(t,tone,note,bad){const c=g(),font=`800 ${sz(16)}${F}`,L=wrap(t,A.W-34,font),lh=sz(16)*1.3,h=L.length*lh+14;
  c.fillStyle=tone==='ok'?(dk()?'#14532d':'#dcfce7'):tone==='no'?(dk()?'#7f1d1d':'#fee2e2'):(dk()?'#1e293b':'#ffffff');A.paint.rrect(8,8,A.W-16,h,12);c.fill();
  c.lineWidth=tone?2.5:1.2;c.strokeStyle=tone==='ok'?OK:tone==='no'?NO:RIM;c.stroke();c.font=font;c.fillStyle=fg();c.textAlign='left';c.textBaseline='top';L.forEach((r,i)=>c.fillText(r,17,15+i*lh));
  let y=8+h+6;if(note){const f2=`700 ${sz(14)}${F}`,L2=wrap(note,A.W-34,f2).slice(0,3);c.font=f2;c.fillStyle=bad?(dk()?'#fca5a5':NO):(dk()?'#86efac':OK);L2.forEach((r,i)=>c.fillText(r,17,y+i*sz(14)*1.3));y+=L2.length*sz(14)*1.3+6}return y}
 function tile(r,t,o){o=o||{};const c=g();c.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':o.sel?'#dbeafe':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,12);c.fill();
  c.lineWidth=o.no||o.ok||o.sel?3.5:1.6;c.strokeStyle=o.no?NO:o.ok?OK:o.sel?'#1d4ed8':RIM;c.stroke();if(!t)return;let n=sz(o.n||15),L;
  for(;;){L=wrap(t,r.w-8,`800 ${n}${F}`);if(L.length<=2||n<=9)break;n--}c.font=`800 ${n}${F}`;c.fillStyle=INK;c.textAlign='center';c.textBaseline='bottom';L.forEach((s,i)=>c.fillText(s,r.x+r.w/2,r.y+r.h-6-(L.length-1-i)*n*1.15))}
 /* a toy k drawn as v: 'toy' (how it looks to you), 'side' or 'top'; centred on (x,y) in a box of size s */
 function toy(k,v,x,y,s){const c=g(),u=s/2;c.save();c.translate(x,y);c.lineJoin='round';c.lineWidth=Math.max(2,u*.05);c.strokeStyle='#1e293b';
  const col={ball:'#ef4444',box:'#d97706',hat:'#7c3aed',tin:'#0891b2',cube:'#16a34a',pyr:'#ca8a04'}[k];
  const fillS=f=>{c.fillStyle=f;c.fill();c.stroke()};
  if(k==='ball'){c.beginPath();c.arc(0,0,u*.7,0,7);fillS(col);if(v!=='top'){c.strokeStyle='#ffffff';c.beginPath();c.arc(0,0,u*.7,-.5,.5);c.stroke()}c.fillStyle='rgba(255,255,255,.7)';c.beginPath();c.arc(-u*.25,-u*.25,u*.12,0,7);c.fill()}
  else if(k==='cube'){const a=u*.6;if(v==='toy'){c.beginPath();c.moveTo(-a,-a*.6);c.lineTo(-a*.6,-a);c.lineTo(a,-a);c.lineTo(a*.6,-a*.6);c.closePath();fillS('#4ade80');c.beginPath();c.moveTo(a*.6,-a*.6);c.lineTo(a,-a);c.lineTo(a,a*.6);c.lineTo(a*.6,a);c.closePath();fillS('#15803d');c.beginPath();c.rect(-a,-a*.6,a*1.6,a*1.6);fillS(col)}else{c.beginPath();c.rect(-a,-a,a*2,a*2);fillS(col)}}
  else if(k==='box'){const w=u*.9,h=u*.38;if(v==='toy'){c.beginPath();c.moveTo(-w,-h*.2);c.lineTo(-w*.7,-h);c.lineTo(w*1.05,-h);c.lineTo(w*.75,-h*.2);c.closePath();fillS('#fbbf24');c.beginPath();c.moveTo(w*.75,-h*.2);c.lineTo(w*1.05,-h);c.lineTo(w*1.05,h*.6);c.lineTo(w*.75,h*1.4);c.closePath();fillS('#92400e');c.beginPath();c.rect(-w,-h*.2,w*1.75,h*1.6);fillS(col)}
   else if(v==='top'){c.beginPath();c.rect(-w,-h*1.1,w*2,h*2.2);fillS(col)}else{c.beginPath();c.rect(-w,-h*.6,w*2,h*1.2);fillS(col)}}
  else if(k==='tin'){const r=u*.45,h=u*.6;if(v==='top'){c.beginPath();c.arc(0,0,r*1.2,0,7);fillS('#cbd5e1');c.beginPath();c.arc(0,0,r*.95,0,7);fillS('#94a3b8')}
   else{c.beginPath();c.rect(-r,-h,r*2,h*2);fillS(col);c.fillStyle='#ffffff';c.fillRect(-r+2,-h*.3,r*2-4,h*.6);if(v==='toy'){c.beginPath();c.ellipse(0,-h,r,r*.3,0,0,7);fillS('#cbd5e1')}}}
  else if(k==='hat'){const r=u*.55,h=u*.7;if(v==='top'){c.beginPath();c.arc(0,0,r*1.1,0,7);fillS(col);c.strokeStyle='#fde68a';c.lineWidth=Math.max(2,u*.06);for(let i=1;i<3;i++){c.beginPath();c.arc(0,0,r*1.1*i/3,0,7);c.stroke()}c.fillStyle='#fde047';c.strokeStyle='#1e293b';c.beginPath();c.arc(0,0,u*.1,0,7);c.fill();c.stroke()}
   else{c.beginPath();c.moveTo(-r,h*.7);c.lineTo(0,-h);c.lineTo(r,h*.7);c.closePath();fillS(col);if(v==='toy'){c.beginPath();c.ellipse(0,h*.7,r,r*.22,0,0,Math.PI);c.stroke()}c.fillStyle='#fde047';c.beginPath();c.arc(0,-h,u*.1,0,7);c.fill();c.stroke()}}
  else if(k==='pyr'){const a=u*.6;if(v==='top'){c.beginPath();c.rect(-a,-a,a*2,a*2);fillS(col);c.beginPath();c.moveTo(-a,-a);c.lineTo(a,a);c.moveTo(a,-a);c.lineTo(-a,a);c.stroke()}
   else{c.beginPath();c.moveTo(-a,a*.7);c.lineTo(0,-a);c.lineTo(a,a*.7);c.closePath();fillS(col);if(v==='toy'){c.beginPath();c.moveTo(0,-a);c.lineTo(a*.35,a*.85);c.lineTo(a,a*.7);c.stroke()}}}
  c.restore()}
 /* the watcher: a bird above or a child at the side */
 function bird(x,y,s){const c=g();c.save();c.translate(x,y);c.fillStyle='#1d4ed8';c.beginPath();c.ellipse(0,0,s*.3,s*.16,0,0,7);c.fill();c.beginPath();c.moveTo(-s*.1,-s*.05);c.lineTo(-s*.45,-s*.35);c.lineTo(s*.05,-s*.08);c.closePath();c.fill();
  c.beginPath();c.moveTo(s*.1,-s*.05);c.lineTo(s*.45,-s*.35);c.lineTo(s*.2,-s*.04);c.closePath();c.fill();c.fillStyle='#f59e0b';c.beginPath();c.moveTo(s*.3,0);c.lineTo(s*.42,s*.04);c.lineTo(s*.3,s*.08);c.fill();c.fillStyle='#ffffff';c.beginPath();c.arc(s*.2,-s*.03,s*.05,0,7);c.fill();c.restore()}
 function child(x,y,s){const c=g();c.save();c.translate(x,y);c.fillStyle='#2563eb';A.paint.rrect(-s*.15,-s*.1,s*.3,s*.45,s*.06);c.fill();c.fillStyle='#d6a77a';c.beginPath();c.arc(0,-s*.25,s*.16,0,7);c.fill();c.fillStyle='#3f2a14';c.beginPath();c.arc(0,-s*.3,s*.16,Math.PI,0);c.fill();
  c.strokeStyle='#1e293b';c.lineWidth=s*.07;c.lineCap='round';c.beginPath();c.moveTo(-s*.07,s*.35);c.lineTo(-s*.07,s*.5);c.moveTo(s*.07,s*.35);c.lineTo(s*.07,s*.5);c.stroke();c.restore()}
 /* one plan item seen from above, in rect r */
 function planItem(it,r,hi){const c=g();c.save();c.lineWidth=hi?4:2;c.strokeStyle=hi?'#1d4ed8':'#1e293b';
  if(it.k==='sand'){const R=Math.min(r.w,r.h)/2;c.fillStyle='#fde68a';c.beginPath();c.arc(r.x+r.w/2,r.y+r.h/2,R,0,7);c.fill();c.stroke()}
  else if(it.k==='tree'){const R=Math.min(r.w,r.h)/2;c.fillStyle='#16a34a';c.beginPath();c.arc(r.x+r.w/2,r.y+r.h/2,R,0,7);c.fill();c.stroke();c.fillStyle='#15803d';c.beginPath();c.arc(r.x+r.w/2-R*.3,r.y+r.h/2-R*.2,R*.35,0,7);c.fill()}
  else if(it.k==='slide'){c.fillStyle='#f97316';c.fillRect(r.x,r.y,r.w,r.h);c.strokeRect(r.x,r.y,r.w,r.h);c.fillStyle='#fed7aa';c.fillRect(r.x+r.w*.25,r.y+4,r.w*.5,r.h-8)}
  else{const S=Math.min(r.w,r.h);c.fillStyle='#bfdbfe';c.fillRect(r.x,r.y,S,S);c.strokeRect(r.x,r.y,S,S);c.lineWidth=2;c.strokeStyle='#1e3a8a';for(let i=1;i<3;i++){c.beginPath();c.moveTo(r.x+S*i/3,r.y);c.lineTo(r.x+S*i/3,r.y+S);c.moveTo(r.x,r.y+S*i/3);c.lineTo(r.x+S,r.y+S*i/3);c.stroke()}}
  c.restore()}
 return{wrap,head,tile,toy,bird,child,planItem,sz,fg,dk,INK,OK,NO,RIM,F}}
return{NAME,MATCH,TOPS,EYE,SIDEWORD,TOPWORD,SAME,WHO,PLAN,FIND,DESC,TXT,DONE,QS,KIT}})();
