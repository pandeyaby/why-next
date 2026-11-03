/* Flagship – perimeters of polygons (ages 8–9): walk round a rectangle side by side to build its perimeter, find a missing
   side when the perimeter is known, use the two-pairs rule for a rectangle, stretch a rectangle whose perimeter stays 24 cm
   while its area changes, and build every rectangle from 12 squares to see the same area give different perimeters.
   The Challenge targets the usual slips: counting the squares inside (area), adding only two sides of a rectangle,
   taking a known side off only once, forgetting to halve, adding the perimeter to the known sides, and miscounting sides. */
(()=>{const RECT=[8,5],POLYS=[[[7,5,6,8],30],[[9,4,7],26],[[5,5,5,5,5],30]],RULE=[[24,8],[20,6],[30,10]],TWELVE=[[12,1],[6,2],[4,3]];
VIS.reg('flagperim',c=>{let A,ctl,chal,qi=-1,streak=0;
const S={};
const view=()=>['walk','poly','rule','stretch','twelve','quiz'][A.step];
const tell=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const px=n=>Math.round(n*(A.narrow?1:1.15));
function word(g,s,x,y,n,wt){g.font=`${wt||700} ${px(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=A.col.tx;g.fillText(s,x,y,A.W-10)}
function box(g,r,col,a,warn){g.fillStyle=A.alpha(col,a);A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();g.lineWidth=warn?4:2;g.strokeStyle=warn?A.col.rd:A.col.tx;A.paint.rrect(r.x,r.y,r.w,r.h,9);g.stroke()}
const hit=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const ansR=i=>{const w=(A.W-40)/3;return{x:10+i*(w+10),y:A.H*.8,w,h:A.H*.15}};
/* a w-by-h rectangle of grid squares, centred in the top part of the canvas */
const unit=(w,h)=>Math.min((A.W-130)/Math.max(w,1),(A.H*.62)/Math.max(h,1),A.narrow?30:40);
const place=(w,h)=>{const u=unit(w,h),x=(A.W-w*u)/2,y=A.H*.12+(A.H*.62-h*u)/2;return{u,x,y,w:w*u,h:h*u}};
function grid(g,r,cols,rows,fillCol){g.fillStyle=A.alpha(fillCol,.16);g.fillRect(r.x,r.y,r.w,r.h);g.lineWidth=1;g.strokeStyle=A.alpha(A.col.tx,.25);
 for(let i=1;i<cols;i++){g.beginPath();g.moveTo(r.x+i*r.u,r.y);g.lineTo(r.x+i*r.u,r.y+r.h);g.stroke()}
 for(let j=1;j<rows;j++){g.beginPath();g.moveTo(r.x,r.y+j*r.u);g.lineTo(r.x+r.w,r.y+j*r.u);g.stroke()}}
const sideSeg=(r,k)=>[[r.x,r.y,r.x+r.w,r.y],[r.x+r.w,r.y,r.x+r.w,r.y+r.h],[r.x+r.w,r.y+r.h,r.x,r.y+r.h],[r.x,r.y+r.h,r.x,r.y]][k];
function edge(g,s,col,wd){g.lineWidth=wd;g.strokeStyle=col;g.lineCap='round';g.beginPath();g.moveTo(s[0],s[1]);g.lineTo(s[2],s[3]);g.stroke()}
function sideLabels(g,r,lab){const m=px(14);word(g,lab[0],r.x+r.w/2,r.y-m,13,800);word(g,lab[1],r.x+r.w+m*1.9,r.y+r.h/2,13,800);word(g,lab[2],r.x+r.w/2,r.y+r.h+m,13,800);word(g,lab[3],r.x-m*1.9,r.y+r.h/2,13,800)}
const near=(p,s)=>{const[x0,y0,x1,y1]=s,dx=x1-x0,dy=y1-y0,t=Math.max(0,Math.min(1,((p.x-x0)*dx+(p.y-y0)*dy)/(dx*dx+dy*dy)));return Math.hypot(p.x-x0-t*dx,p.y-y0-t*dy)};
/* polygon with n sides on a circle; side k joins vertex k to k+1 */
const polyPts=n=>{const cx=A.W/2,cy=A.H*.42,R=Math.min(A.W*.3,A.H*.3);return[...Array(n)].map((_,i)=>{const a=-Math.PI/2+(i+.5)*2*Math.PI/n;return[cx+R*Math.cos(a),cy+R*Math.sin(a)]})};
function draw(A){const{ctx:g,W,H,col:C}=A,v=view();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.35);g.fillRect(0,0,W,H);
 if(v==='quiz'){word(g,'Perimeter = all the way round',W/2,H*.3,18,800);word(g,'Add every side. Units: cm, m',W/2,H*.5,15,700);word(g,'Area = squares inside',W/2,H*.7,15,700);return}
 if(v==='walk'){const[a,b]=RECT,r=place(a,b);grid(g,r,a,b,C.cy);const L=[a,b,a,b];
  for(let k=0;k<4;k++)edge(g,sideSeg(r,k),S.walked.includes(k)?C.or:A.alpha(C.tx,.55),S.walked.includes(k)?7:3);
  sideLabels(g,r,L.map((n,k)=>S.walked.includes(k)?n+' cm':'tap'));
  word(g,S.walked.length?'Perimeter so far: '+S.walked.map(k=>L[k]).join(' + ')+' = '+S.walked.reduce((t,k)=>t+L[k],0)+' cm':'Tap each side to walk round it',W/2,H*.9,13,800)}
 if(v==='poly'){const k=Math.min(S.round,POLYS.length-1),[known,P]=POLYS[k],n=known.length+1,pts=polyPts(n);
  g.fillStyle=A.alpha(C.vi,.12);g.beginPath();pts.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.closePath();g.fill();
  for(let i=0;i<n;i++){const[x0,y0]=pts[i],[x1,y1]=pts[(i+1)%n],mx=(x0+x1)/2,my=(y0+y1)/2,cx=W/2,cy=H*.42,d=Math.hypot(mx-cx,my-cy)||1,miss=i===n-1;
   edge(g,[x0,y0,x1,y1],miss?(S.oops?C.rd:C.am):C.tx,miss?6:3);word(g,miss?'?':known[i]+' cm',mx+(mx-cx)/d*px(22),my+(my-cy)/d*px(16),13,800)}
  word(g,S.round<POLYS.length?`Perimeter ${P} cm. How long is the ? side?`:'All 3 shapes done!',W/2,H*.07,14,800);
  if(S.round<POLYS.length)polyOpts().forEach((o,i)=>{const r=ansR(i);box(g,r,C.vi,.14,S.oops===o);word(g,o+' cm',r.x+r.w/2,r.y+r.h/2,17,800)})}
 if(v==='rule'){const k=Math.min(S.round,RULE.length-1),[P,a]=RULE[k],b=P/2-a,r=place(a,Math.max(1,b));
  g.fillStyle=A.alpha(C.gr,.14);g.fillRect(r.x,r.y,r.w,r.h);[0,2].forEach(s=>edge(g,sideSeg(r,s),C.tx,4));[1,3].forEach(s=>edge(g,sideSeg(r,s),S.oops?C.rd:C.am,6));
  sideLabels(g,r,[a+' cm',S.lift?b+' cm':'?',a+' cm',S.lift?b+' cm':'?']);
  word(g,S.round<RULE.length?`Rectangle, perimeter ${P} cm. Find the ? side.`:'All 3 rectangles done!',W/2,H*.06,14,800);
  if(S.round<RULE.length)ruleOpts().forEach((o,i)=>{const r=ansR(i);box(g,r,C.gr,.14,S.oops===o);word(g,o+' cm',r.x+r.w/2,r.y+r.h/2,17,800)})}
 if(v==='stretch'){const L=S.len,Wd=12-L,r=place(11,11),u=r.u,x=(W-L*u)/2,y=H*.1,rr={x,y,w:L*u,h:Wd*u,u};
  grid(g,rr,L,Wd,C.or);for(let k=0;k<4;k++)edge(g,sideSeg(rr,k),C.tx,4);
  g.fillStyle=C.vi;g.beginPath();g.arc(rr.x+rr.w,rr.y+rr.h,px(11),0,7);g.fill();g.lineWidth=2;g.strokeStyle=C.tx;g.stroke();
  const tx=A.narrow?W/2:W*.84,ty=k=>A.narrow?H*(.76+k*.055):H*(.2+k*.12);word(g,`${L} cm by ${Wd} cm`,tx,ty(0),13,800);word(g,`Perimeter 24 cm`,tx,ty(1),13,700);word(g,`Area ${L*Wd} squares`,tx,ty(2),13,800);
  if(!A.narrow)word(g,'Drag the purple corner',tx,ty(3),11,600);word(g,`Biggest so far: ${S.best} squares`,tx,ty(A.narrow?3:4),11,700)}
 if(v==='twelve'){const k=S.pick,[a,b]=TWELVE[k==null?2:k],r=place(a,b);if(k!=null){grid(g,r,a,b,C.gr);for(let s=0;s<4;s++)edge(g,sideSeg(r,s),C.tx,4);
   word(g,`${a} by ${b}: area 12 squares, perimeter ${a}+${b}+${a}+${b} = ${2*(a+b)} cm`,W/2,H*.82,12,800)}else word(g,'Pick a way to lay out 12 squares',W/2,H*.4,14,800);
  TWELVE.forEach(([p,q],i)=>{const t=tileR(i);box(g,t,C.cy,S.seen.includes(i)?.3:.1,false);word(g,`${p} × ${q}`,t.x+t.w/2,t.y+t.h/2,13,800)});
  word(g,'Seen: '+S.seen.length+' of 3',W/2,H*.97,11,600)}
 A.fx.draw(g)}
const tileR=i=>{const w=(A.W-40)/3;return{x:10+i*(w+10),y:A.H*.02,w,h:A.H*.1}};
const polyOpts=()=>{const[known,P]=POLYS[S.round],s=known.reduce((t,x)=>t+x,0);return[[P-s,s,P+s],[s,P+s,P-s],[P+s,P-s,s]][S.round%3]};
const ruleOpts=()=>{const[P,a]=RULE[S.round],b=P/2-a;return[[b,P-a,P-2*a],[P-a,P-2*a,b],[P-2*a,b,P-a]][S.round%3]};
const bad=(t,mark)=>{S.oops=mark;A.sound.miss();tell(t);A.redraw()},good=t=>{S.oops=null;A.sound.pop();tell(t);pad();A.redraw();S.want()};
/* step 0 */
function walk(k){if(S.walked.includes(k)){tell('You walked that side already. Find a side that is not orange.');return}
 const L=[RECT[0],RECT[1],RECT[0],RECT[1]];S.walked.push(k);A.sound.tick();const tot=S.walked.reduce((t,j)=>t+L[j],0);
 if(S.walked.length<4){tell(`That side is ${L[k]} cm. So far ${tot} cm.`);pad();return A.redraw()}
 good(`All the way round: 8 + 5 + 8 + 5 = ${tot} cm. That is the perimeter.`)}
/* step 1 */
function pickPoly(o){if(S.round>=POLYS.length)return;const[known,P]=POLYS[S.round],s=known.reduce((t,x)=>t+x,0);
 if(o===s)return bad(`${s} cm is the sides you know added up. Take that from ${P}.`,o);
 if(o===P+s)return bad(`The perimeter already includes every side. Subtract: ${P} − ${s}.`,o);
 S.round++;good(`Yes! ${known.join(' + ')} = ${s}, and ${P} − ${s} = ${P-s} cm.`)}
/* step 2 */
function pickRule(o){if(S.round>=RULE.length)return;const[P,a]=RULE[S.round],b=P/2-a;
 if(o===P-a)return bad(`A rectangle has two sides of ${a} cm. Take off both: ${P} − ${a} − ${a}.`,o);
 if(o===P-2*a)return bad(`${o} cm is both ? sides together. They are equal, so halve it.`,o);
 S.lift=1;A.redraw();setTimeout(()=>{S.lift=0;S.round++;good(`Yes! ${P} − ${2*a} = ${P-2*a}, and half of that is ${b} cm.`)},A.reduced()?10:600)}
/* step 3 */
function setLen(L){L=Math.max(1,Math.min(11,L));if(L===S.len)return;S.len=L;S.moved=1;A.sound.tick();const ar=L*(12-L);S.best=Math.max(S.best||0,ar);
 tell(`${L} cm by ${12-L} cm. Perimeter still 24 cm. Area ${ar} squares.`);A.redraw();if(L===6)good('6 by 6 has the biggest area, 36 squares. Same perimeter, very different areas.')}
/* step 4 */
function pick12(i){S.pick=i;if(!S.seen.includes(i))S.seen.push(i);A.sound.tick();const[a,b]=TWELVE[i];tell(`${a} by ${b}: 12 squares inside, ${2*(a+b)} cm round the edge.`);A.redraw();
 if(S.seen.length>=3)good('All 12 squares each time, but the perimeters are 26, 16 and 14 cm. The long thin one has the longest edge.')}
function pad(){if(!ctl)return;ctl.innerHTML='';const v=view(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};
 if(v==='walk'&&S.walked.length<4)['Top','Right','Bottom','Left'].forEach((n,k)=>{if(!S.walked.includes(k))B(n+' side',()=>walk(k),`Walk the ${n.toLowerCase()} side`)});
 if(v==='poly'&&S.round<POLYS.length)polyOpts().forEach(o=>B(o+' cm',()=>pickPoly(o),`The missing side is ${o} cm`));
 if(v==='rule'&&S.round<RULE.length)ruleOpts().forEach(o=>B(o+' cm',()=>pickRule(o),`The other side is ${o} cm`));
 if(v==='stretch'){B('◀ Shorter',()=>setLen(S.len-1),'Make the rectangle shorter');B('Longer ▶',()=>setLen(S.len+1),'Make the rectangle longer')}
 if(v==='twelve')TWELVE.forEach(([a,b],i)=>B(`${a} × ${b}`,()=>pick12(i),`Lay out 12 squares as ${a} by ${b}`))}
function down(p){const v=view();
 if(v==='walk'){const r=place(...RECT);let j=-1,d=24;for(let k=0;k<4;k++){const e=near(p,sideSeg(r,k));if(e<d){d=e;j=k}}if(j>=0)walk(j);return false}
 if(v==='poly'&&S.round<POLYS.length){polyOpts().forEach((o,i)=>{if(hit(p,ansR(i)))pickPoly(o)});return false}
 if(v==='rule'&&S.round<RULE.length){ruleOpts().forEach((o,i)=>{if(hit(p,ansR(i)))pickRule(o)});return false}
 if(v==='stretch')return true;
 if(v==='twelve')TWELVE.forEach((_,i)=>{if(hit(p,tileR(i)))pick12(i)});return false}
function move(p){if(view()!=='stretch')return;const u=place(11,11).u;setLen(Math.round((p.x-(A.W/2))*2/u))}
function up(){}
const check=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const k=++S.tok;fns.forEach((fn,j)=>setTimeout(()=>{if(k===S.tok)fn()},A.reduced()?j*20+20:(j+1)*ms))};
const reset=()=>{const t=(S.tok||0)+1;Object.keys(S).forEach(k=>delete S[k]);Object.assign(S,{tok:t,want:()=>{},walked:[],round:0,oops:null,lift:0,len:10,best:20,moved:0,pick:null,seen:[]})};
const steps=[
{h:'Walk round the edge',p:'Perimeter is the distance all the way round a shape. Walk each side of this 8 cm by 5 cm rectangle and add as you go.',task:'Walk all 4 sides',
 show:()=>{steps[0].go();play([0,1,2,3].map(k=>()=>walk(k)),450)},
 go:()=>{reset();tell('Tap a side of the rectangle, or use the side buttons.');pad();S.want=check(0,()=>S.walked.length>=4,'Perimeter = 8 + 5 + 8 + 5 = 26 cm.')}},
{h:'The missing side',p:'If you know the perimeter and all the sides but one, add the sides you know and subtract from the perimeter.',predict:{q:'Perimeter 30 cm. Four sides add up to 26 cm. The last side is…',opts:['4 cm','56 cm','26 cm'],ans:0},task:'Find 3 missing sides',
 show:()=>{steps[1].go();play(POLYS.map(([k,P])=>()=>pickPoly(P-k.reduce((t,x)=>t+x,0))),700)},
 go:()=>{reset();tell('Perimeter 30 cm. Find the side marked with a question mark.');pad();S.want=check(1,()=>S.round>=POLYS.length,'Missing side = perimeter − the sides you know.')}},
{h:'Rectangles come in pairs',p:'A rectangle has two pairs of equal sides. Take off both known sides, then halve what is left.',predict:{q:'Perimeter 24 cm, one side 8 cm. The other side is…',opts:['16 cm','4 cm','8 cm'],ans:1},task:'Solve 3 rectangles',
 show:()=>{steps[2].go();play(RULE.map(([P,a])=>()=>pickRule(P/2-a)),900)},
 go:()=>{reset();tell('Perimeter 24 cm. One side is 8 cm.');pad();S.want=check(2,()=>S.round>=RULE.length,'Other side = (perimeter − 2 × known side) ÷ 2.')}},
{h:'Same perimeter, new area',p:'Every rectangle here has a perimeter of 24 cm. Drag the corner and watch the area, the squares inside.',predict:{q:'All these rectangles have perimeter 24 cm. Do they all have the same area?',opts:['Yes, same perimeter means same area','No, the area changes'],ans:1},task:'Find the biggest area',
 show:()=>{steps[3].go();play([9,8,7,6].map(L=>()=>setLen(L)),450)},
 go:()=>{reset();tell('10 cm by 2 cm. Area 20 squares. Drag the purple corner.');pad();S.want=check(3,()=>S.len===6,'Perimeter 24 cm can give area 11, 20, 32 or 36 squares.')}},
{h:'Same area, new perimeter',p:'12 squares can make three different rectangles. Each has area 12. Do they have the same perimeter?',task:'Make all 3 rectangles',
 show:()=>{steps[4].go();play([0,1,2].map(i=>()=>pick12(i)),600)},
 go:()=>{reset();tell('Pick 12 by 1, 6 by 2 or 4 by 3.');pad();S.want=check(4,()=>S.seen.length>=3,'Area 12 gives perimeters of 26, 16 and 14 cm.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['A square has sides of 6 cm. What is its perimeter?',[['24 cm','ok'],['36 cm','area'],['12 cm','two']]],
 ['A rectangle is 7 cm by 3 cm. What is its perimeter?',[['20 cm','ok'],['10 cm','two'],['21 cm','area']]],
 ['A triangle has perimeter 18 cm. Two sides are 5 cm and 6 cm. The third side is…',[['7 cm','ok'],['11 cm','known'],['29 cm','addp']]],
 ['A rectangle has perimeter 16 cm. One side is 5 cm. The other side is…',[['3 cm','ok'],['11 cm','once'],['6 cm','half']]],
 ['Two rectangles both have perimeter 20 cm: 5 by 5 and 9 by 1. Which has more squares inside?',[['5 by 5','ok'],['9 by 1','long'],['They are the same','same']]],
 ['A regular hexagon has sides of 4 cm. What is its perimeter?',[['24 cm','ok'],['16 cm','count'],['20 cm','count']]]];
function hintFor(t){let m='Perimeter is every side added up, all the way round.';
 if(t==='area')m='That counts the squares inside: area. Perimeter is the edge. Add all the sides.';
 if(t==='two')m='You added only two sides. A rectangle or square has four sides, so add the other two as well.';
 if(t==='known')m='That is the two known sides added up. Now subtract them from the perimeter.';
 if(t==='addp')m='You added the perimeter on. The perimeter is already the total, so subtract the known sides.';
 if(t==='once')m='A rectangle has two sides of 5 cm. Take off both, then halve what is left.';
 if(t==='half')m='That is both short sides together. They are equal, so halve it.';
 if(t==='long')m='Long and thin has less room inside. A square shape holds the most for the same perimeter.';
 if(t==='same')m='Same perimeter does not mean same area. 5 × 5 is 25 squares, but 9 × 1 is only 9.';
 if(t==='count')m='Count the sides again. A hexagon has 6 sides, so add six lots of 4 cm.';
 return m}
function ask(){qi++;const[q,ops]=QS[qi%QS.length],rot=qi%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
function mark(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?'✓ Yes! In a row: '+streak+'.':'✗ '+hintFor(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;pad()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});pad()}});
A.start()})})();
