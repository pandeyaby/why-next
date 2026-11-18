/* Flagship – number pattern relationships (ages 10–11; CCSS 5.OA.B.3, NC England Y6 algebra and coordinates). Grow two
   sequences from two rules, find the rule that links every pair of corresponding terms, plot the (A, B) pairs, choose a
   step that makes B a multiple of A, and judge statements about why the link holds. Buttons for every canvas action. */
(()=>{
 const LINK=[[3,6,['+ 3','× 2','+ 6'],1],[4,12,['+ 8','+ 4','× 3'],2]];         // [A step, B step, options, right]
 const MAKE=[[2,3,[3,5,6,8]],[2,5,[5,7,10,12]]];                              // [A step, times, B step options]
 const SAYS=[['B’s step is double A’s step, so each B term stays double.',1],['B is always 3 more than A.',0],['The points go through (0, 0).',1],['It still works if both start at 1.',0],['The (A, B) points make a straight line.',1]];
 const seqOf=(st,n,s0)=>Array.from({length:n},(_,i)=>(s0||0)+st*i);
 VIS.reg('flagtwoseq',c=>{let A,pad,chal;
 const S={then:()=>{}};
 const mode=()=>['grow','link','plot','make','why','chal'][A.step];
 const INK='#1e293b',DIM='#475569',RULE='#64748b',WHITE='#ffffff',OK='#047857',NO='#b91c1c',HEAD='#e0f2fe',GOOD='#dcfce7',AC='#1d4ed8',BC='#be185d',ATINT='#dbeafe',BTINT='#fce7f3';
 const z=n=>Math.round(n*(A.narrow?1.05:1.2));
 function tx(g,s,x,y,n,col,al){g.font=`700 ${z(n)}px system-ui,sans-serif`;g.fillStyle=col||INK;g.textAlign=al||'center';g.textBaseline='middle';g.fillText(String(s),x,y)}
 function wrapLines(g,s,max,n){g.font=`700 ${z(n)}px system-ui,sans-serif`;const out=[];let cur='';for(const w of s.split(' ')){const t=cur?cur+' '+w:w;if(cur&&g.measureText(t).width>max){out.push(cur);cur=w}else cur=t}out.push(cur);return out}
 function rbox(g,r,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();g.strokeStyle=edge;g.lineWidth=lw||2;g.stroke()}
 const isIn=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 function title(g,s,col){const r={x:10,y:8,w:A.W-20,h:A.H*.12};rbox(g,r,HEAD,'#0369a1',2);const L=wrapLines(g,s,r.w-16,14);L.forEach((l,i)=>tx(g,l,A.W/2,r.y+r.h/2+(i-(L.length-1)/2)*z(18),14,col))}
 function bottom(g){if(!S.msg)return;const L=wrapLines(g,(S.bad?'✗ ':'✓ ')+S.msg,A.W-40,13),lh=z(13)+5,h=L.length*lh+10,y=A.H-h-6;rbox(g,{x:10,y,w:A.W-20,h},WHITE,S.bad?NO:OK,3);L.forEach((l,i)=>tx(g,l,A.W/2,y+5+lh*(i+.5),13))}
 const aria=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
 const bad=s=>{S.bad=true;S.msg=s;A.sound.miss();aria(s);A.redraw()};
 const fine=s=>{S.bad=false;S.msg=s;A.sound.pop()};
 const cellR=(row,i,y0)=>{const w=(A.W-20-z(34))/5;return{x:10+z(34)+i*w+2,y:y0+row*z(56),w:w-4,h:z(44)}};
 function rows(g,a,b,y0,mark){[[a,'A',AC,ATINT],[b,'B',BC,BTINT]].forEach(([s,n,col,tint],row)=>{tx(g,n,10+z(14),cellR(row,0,y0).y+z(22),18,col);
  for(let i=0;i<5;i++){const r=cellR(row,i,y0),has=i<s.length;rbox(g,r,has?(mark===i?'#fef08a':tint):WHITE,has?col:RULE,has?2.5:1.5);if(has)tx(g,s[i],r.x+r.w/2,r.y+r.h/2,17,INK)}})}
 function drawGrow(g){const a=seqOf(3,S.na),b=seqOf(6,S.nb),full=S.na>=5&&S.nb>=5;title(g,full?'A: 0, 3, 6, 9, 12. B: 0, 6, 12, 18, 24.':'Rule A: start at 0, add 3. Rule B: start at 0, add 6.',full?OK:INK);rows(g,a,b,A.H*.22);
  tx(g,'Tap a row to add its next term.',A.W/2,A.H*.22+z(122),12,DIM)}
 function grow(row){if(row===0){if(S.na>=5)return bad('Row A is full. Fill row B now.');S.na++}else{if(S.nb>=5)return bad('Row B is full. Fill row A now.');S.nb++}A.sound.tick();S.msg='';if(S.na>=5&&S.nb>=5)fine('Look down each column: 3 and 6, 6 and 12, 9 and 18.');update()}
 const optR=i=>{const gap=8,w=(A.W-20-2*gap)/3;return{x:10+i*(w+gap),y:A.H*.6,w,h:z(42)}};
 function drawLink(g){const q=LINK[S.li];if(!q){title(g,'B = A × 2 when B adds 6, B = A × 3 when B adds 12.',OK);S.log.forEach((l,i)=>tx(g,l,A.W/2,A.H*.32+i*z(26),15,OK));return}
  title(g,`A adds ${q[0]}, B adds ${q[1]}. Which rule turns every A term into its B term?`);rows(g,seqOf(q[0],5),seqOf(q[1],5),A.H*.2,S.col);
  q[2].forEach((o,i)=>{const r=optR(i);rbox(g,r,S.wrong===i?'#fee2e2':WHITE,S.wrong===i?NO:RULE,2.5);tx(g,`B = A ${o}`,r.x+r.w/2,r.y+r.h/2,15)})}
 function link(i){const q=LINK[S.li];if(!q)return;const o=q[2][i],a=seqOf(q[0],5),b=seqOf(q[1],5);
  if(i===q[3]){S.wrong=null;S.col=null;S.log.push(`A adds ${q[0]}, B adds ${q[1]}: B = A ${o}`);fine(`Every column works: ${a[1]} ${o} = ${b[1]}, ${a[2]} ${o} = ${b[2]}, ${a[3]} ${o} = ${b[3]}.`);S.li++;return update()}
  S.wrong=i;const k=Number(o.slice(2));
  if(o[0]==='+'){const j=a.findIndex((x,t)=>t>0&&x+k!==b[t]);S.col=j;return bad(`${a[j]} + ${k} = ${a[j]+k}, but B’s term is ${b[j]}. ${j===1?'':'It worked for the first pair only. '}A rule must work for every pair.`)}
  bad('Check every column, not just one.')}
 const G=()=>{const x0=z(40),y1=A.H*.17,w=A.W-x0-18,h=A.H*.56;return{x0,y0:y1+h,w,h}};
 const toPx=(x,y)=>{const g=G();return{x:g.x0+x/12*g.w,y:g.y0-y/24*g.h}};
 const PTS=[[3,6],[6,12],[9,18],[12,24]];
 function drawPlot(g){const p=PTS[S.pi];title(g,p?`Plot pair ${S.pi+1}: (A, B) = (${p[0]}, ${p[1]}). Tap the grid.`:'The points make a straight line through (0, 0).',p?INK:OK);const gg=G();
  for(let x=0;x<=12;x+=3){const a=toPx(x,0),b=toPx(x,24);g.strokeStyle='#cbd5e1';g.lineWidth=1;g.beginPath();g.moveTo(a.x,a.y);g.lineTo(b.x,b.y);g.stroke();tx(g,x,a.x,a.y+z(12),11,DIM)}
  for(let y=0;y<=24;y+=3){const a=toPx(0,y),b=toPx(12,y);g.strokeStyle=y%6?'#e2e8f0':'#cbd5e1';g.beginPath();g.moveTo(a.x,a.y);g.lineTo(b.x,b.y);g.stroke();if(y%6===0)tx(g,y,a.x-z(12),a.y,11,DIM)}
  tx(g,'A →',gg.x0+gg.w-z(10),gg.y0+z(26),11,AC);tx(g,'B ↑',gg.x0-z(22),gg.y0-gg.h-z(4),11,BC);
  if(!p){const a=toPx(0,0),b=toPx(12,24);g.strokeStyle=OK;g.lineWidth=3;g.beginPath();g.moveTo(a.x,a.y);g.lineTo(b.x,b.y);g.stroke()}
  S.pts.forEach(([x,y])=>{const q=toPx(x,y);g.fillStyle=OK;g.beginPath();g.arc(q.x,q.y,z(7),0,7);g.fill()});
  if(S.miss){const q=toPx(...S.miss);g.strokeStyle=NO;g.lineWidth=3;g.beginPath();g.arc(q.x,q.y,z(9),0,7);g.stroke()}
  if(p){const q=toPx(S.cx,S.cy);g.strokeStyle=AC;g.lineWidth=2;g.strokeRect(q.x-z(8),q.y-z(8),z(16),z(16))}}
 function plot(x,y){const p=PTS[S.pi];if(!p)return;
  if(x===p[0]&&y===p[1]){S.miss=null;S.pts.push([x,y]);S.pi++;fine(S.pi>=4?'All four pairs sit on one straight line through (0, 0).':`(${x}, ${y}) plotted: across ${x}, up ${y}.`);return update()}
  S.miss=[x,y];
  if(x===p[1]&&y===p[0])return bad(`That is (${x}, ${y}): the numbers are swapped. Go across for A (${p[0]}) first, then up for B (${p[1]}).`);
  if(x>12||y>24||x<0||y<0)return bad('Stay on the grid.');
  bad(`That point is (${x}, ${y}). Go across to ${p[0]}, then up to ${p[1]}.`)}
 const stepR=i=>{const gap=8,w=(A.W-20-3*gap)/4;return{x:10+i*(w+gap),y:A.H*.62,w,h:z(42)}};
 function drawMake(g){const q=MAKE[S.mi];if(!q){title(g,'To make B = k × A, B’s step is k times A’s step.',OK);S.log.forEach((l,i)=>tx(g,l,A.W/2,A.H*.32+i*z(26),15,OK));return}
  title(g,`A adds ${q[0]}. Pick B’s step so every B term is ${q[1]} times its A term.`);rows(g,seqOf(q[0],5),S.tryB?seqOf(S.tryB,5):[0],A.H*.2);
  q[2].forEach((o,i)=>{const r=stepR(i);rbox(g,r,S.tryB===o?(o===q[0]*q[1]?GOOD:'#fee2e2'):WHITE,RULE,2.5);tx(g,`+ ${o}`,r.x+r.w/2,r.y+r.h/2,15)})}
 function make(o){const q=MAKE[S.mi];if(!q)return;S.tryB=o;const a=seqOf(q[0],5),b=seqOf(o,5);
  if(o===q[0]*q[1]){fine(`B: ${b.join(', ')}. Each is ${q[1]} × its A term, because ${o} = ${q[1]} × ${q[0]}.`);S.log.push(`A adds ${q[0]}, B adds ${o}: B = ${q[1]} × A`);S.mi++;S.tryB=null;return update()}
  if(o===q[0]+q[1])return bad(`Adding ${q[0]} + ${q[1]} gives B: ${b.slice(0,3).join(', ')}… but ${a[1]} × ${q[1]} = ${a[1]*q[1]}. The step must be ${q[1]} × ${q[0]}.`);
  if(o===q[1])return bad(`A step of ${o} gives B: ${b.slice(0,3).join(', ')}…, but ${a[1]} × ${q[1]} = ${a[1]*q[1]}, not ${b[1]}. Multiply A’s step by ${q[1]}.`);
  bad(`B would be ${b.slice(0,4).join(', ')}. Is ${b[1]} equal to ${q[1]} × ${a[1]}? Make B’s step ${q[1]} times A’s.`)}
 const binR=i=>{const gap=8,w=(A.W-20-gap)/2;return{x:10+i*(w+gap),y:A.H*.58,w,h:z(42)}};
 const sayR=()=>({x:A.W*.08,y:A.H*.2,w:A.W*.84,h:A.H*.28});
 function drawWhy(g){const q=SAYS[S.wi];title(g,q?'A adds 3 and B adds 6. True or false? Drag the card.':'B stays double A because both start at 0 and B’s step is double.',q?INK:OK);
  ['True','False'].forEach((t,i)=>{const r=binR(i);rbox(g,r,S.drag&&isIn(S.drag,r)?GOOD:WHITE,RULE,2.5);tx(g,`${t} (${S.tally[i]})`,r.x+r.w/2,r.y+r.h/2,15)});
  if(q){const r0=sayR(),r=S.drag?{...r0,x:S.drag.x-r0.w/2,y:S.drag.y-r0.h/2}:r0;rbox(g,r,'#fef3c7','#b45309',3);const L=wrapLines(g,q[0],r.w-20,14);L.forEach((l,i)=>tx(g,l,r.x+r.w/2,r.y+r.h/2+(i-(L.length-1)/2)*z(19),14))}}
 function judgeSay(i){const q=SAYS[S.wi];if(!q)return;const truth=q[1]?0:1;
  if(i===truth){S.tally[i]++;fine(['Yes: 6 is double 3, so every column doubles.','Right, it is false: 6 is 3 more than 3, but 12 is 6 more than 6.','Yes: term 1 is 0 in both rows, so the line starts at (0, 0).','Right, it is false: 1, 4, 7 and 1, 7, 13. 7 is not double 4.','Yes: equal steps across, equal steps up.'][S.wi]);S.wi++;return update()}
  if(S.wi===1)return bad('Check more columns: 6 and 12 differ by 6, and 9 and 18 by 9. The gap grows, so it is not “3 more”.');
  if(S.wi===3)return bad('Try it: A is 1, 4, 7 and B is 1, 7, 13. 7 is not double 4, so the start matters.');
  bad(['Look at the steps: 6 is 2 × 3, so B gains double each time.','','Both rows start at 0, so (0, 0) is the first point.','','The points rise by the same amount each step, so they line up.'][S.wi])}
 function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#f8fafc',C.dark?.05:.5);g.fillRect(0,0,A.W,A.H);if(C.dark){g.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);g.fill()}
  const v=mode();if(v==='grow')drawGrow(g);if(v==='link')drawLink(g);if(v==='plot')drawPlot(g);if(v==='make')drawMake(g);if(v==='why')drawWhy(g);
  if(v==='chal'){title(g,'Same start, B’s step k times A’s: B = k × A.');rows(g,seqOf(3,5),seqOf(6,5),A.H*.24)}
  bottom(g);A.fx.draw(g)}
 function update(){const v=mode();let s='Challenge.';
  if(v==='grow')s=`Row A has ${S.na} terms: ${seqOf(3,S.na).join(', ')}. Row B has ${S.nb} terms: ${seqOf(6,S.nb).join(', ')}.`;
  if(v==='link')s=LINK[S.li]?`A: ${seqOf(LINK[S.li][0],5).join(', ')}. B: ${seqOf(LINK[S.li][1],5).join(', ')}. Pick the rule from A to B.`:'Both links found.';
  if(v==='plot')s=PTS[S.pi]?`Plot (${PTS[S.pi][0]}, ${PTS[S.pi][1]}). Marker at (${S.cx}, ${S.cy}). ${S.pts.length} plotted.`:'Four points on a straight line through the origin.';
  if(v==='make')s=MAKE[S.mi]?`A adds ${MAKE[S.mi][0]}. Choose B’s step to make B ${MAKE[S.mi][1]} times A.`:'Both steps chosen.';
  if(v==='why')s=SAYS[S.wi]?`Statement: ${SAYS[S.wi][0]} True or false?`:'All five statements judged.';
  aria((S.msg?S.msg+' ':'')+s);ctl();S.then()}
 function ctl(){if(!pad)return;pad.innerHTML='';const v=mode(),b=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);e.onclick=f};
  if(v==='grow'&&(S.na<5||S.nb<5)){b('Row A: add 3',()=>grow(0),'Add the next term to row A');b('Row B: add 6',()=>grow(1),'Add the next term to row B')}
  if(v==='link'&&LINK[S.li])LINK[S.li][2].forEach((o,i)=>b(`B = A ${o}`,()=>link(i),`Rule: B equals A ${o.replace('×','times').replace('+','plus')}`));
  if(v==='plot'&&PTS[S.pi]){const mv=(dx,dy)=>()=>{S.cx=Math.max(0,Math.min(12,S.cx+dx));S.cy=Math.max(0,Math.min(24,S.cy+dy));S.msg='';update()};
   b('A − 3',mv(-3,0),'Move the marker left 3');b('A + 3',mv(3,0),'Move the marker right 3');b('B − 3',mv(0,-3),'Move the marker down 3');b('B + 3',mv(0,3),'Move the marker up 3');b(`Plot (${S.cx}, ${S.cy})`,()=>plot(S.cx,S.cy),`Plot the point ${S.cx}, ${S.cy}`)}
  if(v==='make'&&MAKE[S.mi])MAKE[S.mi][2].forEach(o=>b(`B adds ${o}`,()=>make(o),`B’s step is ${o}`));
  if(v==='why'&&SAYS[S.wi]){b('True',()=>judgeSay(0),'The statement is true');b('False',()=>judgeSay(1),'The statement is false')}A.redraw()}
 function down(p){const v=mode();
  if(v==='grow'){for(const row of [0,1]){const r0=cellR(row,0,A.H*.22);if(p.y>=r0.y-6&&p.y<=r0.y+r0.h+6){grow(row);return true}}return false}
  if(v==='link'){const i=[0,1,2].find(i=>isIn(p,optR(i)));if(LINK[S.li]&&i!=null){link(i);return true}return false}
  if(v==='plot'){if(!PTS[S.pi])return false;const g=G();if(p.x<g.x0-14||p.x>g.x0+g.w+14||p.y<g.y0-g.h-14||p.y>g.y0+14)return false;S.cx=Math.max(0,Math.min(12,Math.round((p.x-g.x0)/g.w*4)*3));S.cy=Math.max(0,Math.min(24,Math.round((g.y0-p.y)/g.h*8)*3));plot(S.cx,S.cy);return true}
  if(v==='make'){const q=MAKE[S.mi];const i=[0,1,2,3].find(i=>isIn(p,stepR(i)));if(q&&i!=null){make(q[2][i]);return true}return false}
  if(v==='why'){if(!SAYS[S.wi])return false;if(isIn(p,sayR())){S.drag={x:p.x,y:p.y};return true}const i=[0,1].find(i=>isIn(p,binR(i)));if(i!=null){judgeSay(i);return true}return false}return false}
 function move(p){if(S.drag){S.drag={x:p.x,y:p.y};A.redraw()}}
 function up(p){if(!S.drag)return;const i=[0,1].find(i=>isIn(p||S.drag,binR(i)));S.drag=null;if(i!=null)judgeSay(i);else A.redraw()}
 const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
 const chain=(fs,gap)=>{const id=++S.run;fs.forEach((f,j)=>setTimeout(()=>{if(id===S.run)f()},j*(A.reduced()?30:gap)))};
 const reset=()=>{S.run=(S.run||0)+1;Object.assign(S,{then:()=>{},na:1,nb:1,li:0,log:[],wrong:null,col:null,pi:0,pts:[],miss:null,cx:0,cy:0,mi:0,tryB:null,wi:0,tally:[0,0],drag:null,msg:'',bad:false})};
 const steps=[
 {h:'Two rules, two rows',p:'Both rows start at 0. Tap a row, or use the buttons, to add terms until each row has 5.',
 predict:{q:'A adds 3 and B adds 6. How will B’s terms compare with A’s?',opts:['Double them','3 more than them','The same'],ans:0},
 task:'Fill both rows',show:()=>{steps[0].go();chain([0,1,0,1,0,1,0,1].map(r=>()=>grow(r)),220)},go:()=>{reset();update();S.then=finish(0,()=>S.na>=5&&S.nb>=5,'Each B term is double the A term above it.')}},
 {h:'Find the link',p:'Corresponding terms sit in the same column. Pick the rule that works for every column.',
 predict:{q:'A: 0, 3, 6. B: 0, 6, 12. Is the link “add 3”?',opts:['No, it fails at 6 → 12','Yes, 3 + 3 = 6','Only for odd numbers'],ans:0},
 task:'Find 2 links',show:()=>{steps[1].go();chain(LINK.map(q=>()=>link(q[3])),600)},go:()=>{reset();update();S.then=finish(1,()=>S.li>=LINK.length,'Test a rule on every pair, not just the first.')}},
 {h:'Plot the pairs',p:'Each column gives an ordered pair (A, B). Tap the grid, or move the marker with the buttons and plot.',
 predict:{q:'The four points (3, 6), (6, 12), (9, 18), (12, 24) will…',opts:['line up through (0, 0)','make a curve','be scattered'],ans:0},
 task:'Plot 4 points',show:()=>{steps[2].go();chain(PTS.map(([x,y])=>()=>{S.cx=x;S.cy=y;plot(x,y)}),450)},go:()=>{reset();update();S.then=finish(2,()=>S.pi>=PTS.length,'Across for A, up for B: the pairs make a straight line.')}},
 {h:'Make your own link',p:'A adds 2. Choose B’s step so B is always a multiple of A.',
 task:'Choose 2 steps',show:()=>{steps[3].go();chain(MAKE.map(q=>()=>make(q[0]*q[1])),600)},go:()=>{reset();update();S.then=finish(3,()=>S.mi>=MAKE.length,'Same start at 0, and B’s step is k times A’s step.')}},
 {h:'Why does it work?',p:'Drag each statement to True or False, or use the buttons.',
 task:'Judge 5 statements',show:()=>{steps[4].go();chain(SAYS.map(q=>()=>judgeSay(q[1]?0:1)),450)},go:()=>{reset();update();S.then=finish(4,()=>S.wi>=SAYS.length,'Both start at 0 and B’s step is double, so B stays double.')}},
 {h:'Challenge',p:'',go:()=>{reset();nextQ()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.then()});
 const Q=[['A adds 5 and B adds 10, both from 0. What is B when A is 20?','40',[['25','plus'],['30','plusstep']]],
 ['A: 0, 4, 8, 12. B: 0, 12, 24, 36. What is the rule from A to B?','B = A × 3',[['B = A + 8','first'],['B = A × 4','step']]],
 ['A adds 3. What must B add so that B = 4 × A?','12',[['7','addk'],['4','kalone']]],
 ['A adds 2 and B adds 6, both from 0. Which ordered pair fits?','(4, 12)',[['(12, 4)','swap'],['(4, 8)','four']]],
 ['Both rows start at 1. A adds 2 and B adds 4. Is B always double A?','No: 1, 3, 5 and 1, 5, 9',[['Yes: 4 is double 2','start'],['Yes: they both start at 1','start']]]];
 function hint(tag){let m='Line up the terms in columns and test your rule on every column.';
  if(tag==='plus')m='Adding is not the link here. B is double A, so B = 2 × 20 = 40.';
  if(tag==='plusstep')m='Do not add the step. Each B term is a multiple of its A term.';
  if(tag==='first')m='+ 8 fits 4 → 12 only. 8 + 8 = 16, not 24. Check every column.';
  if(tag==='step')m='4 is A’s step, not the link. 4 × 3 = 12 and 8 × 3 = 24, so B = A × 3.';
  if(tag==='addk')m='Do not add 3 + 4. B’s step must be 4 × A’s step: 4 × 3 = 12.';
  if(tag==='kalone')m='A step of 4 gives 0, 4, 8, but 4 × 3 = 12. B’s step must be 4 × A’s step: 12.';
  if(tag==='four')m='Here B adds 3 times as much as A (6 = 3 × 2), so B = 3 × A. When A is 4, B is 12.';
  if(tag==='swap')m='An ordered pair is (A, B): A first. A = 4 goes with B = 12.';
  if(tag==='start')m='The start matters. 1, 3, 5 and 1, 5, 9: 5 is not double 3.';
  return m}
 let qn=-1,good=0;
 function nextQ(){qn++;const [q,ans,wr]=Q[qn%Q.length],all=[[ans,'ok']].concat(wr),r=qn%3,order=all.slice(r).concat(all.slice(0,r));
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');order.forEach(([w,tag])=>{const e=c.el('button',{type:'button',class:'lbtn'},row,w);e.onclick=()=>score(tag,ans)});aria('Challenge: '+q);A.redraw()}
 function score(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=chal.querySelector('.fl-fb');
  if(ok){good++;A.win()}else{good=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+good+'.':'✗ '+hint(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=nextQ}
 A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;pad.hidden=A.step===5;ctl()},
  init:A=>{const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}});
 A.start()})})();
