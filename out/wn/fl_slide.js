/* Flagship: transformations on a grid (ages 8-12; NC Y4 "describe movements between positions as translations of a
   given unit to the left/right and up/down", Y6 "draw and translate simple shapes on the coordinate plane, and reflect
   them in the axes", KS3 "identify, describe and construct congruent shapes ... including rotations, reflections and
   translations"). A flag shape on squared paper: slide it onto an outline, draw the translation arrow from a corner,
   give it a quarter turn and a half turn about a centre dot, then name the move that made each copy. Every drag has a
   button twin. */
(()=>{
VIS.reg('flagslide',c=>{let A,ctl,chal,qi=-1,run=0;const S={};
const kind=()=>['slide','arrow','quarter','half','name','chal'][A.step];
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const fg=()=>A.col.tx,soft=()=>A.col.mu;
function txt(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||800} ${Math.round(px*(A.narrow?1:1.1))}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';
 g.lineJoin='round';g.lineWidth=4;g.strokeStyle=A.col.pn;g.strokeText(t,x,y,A.W-8);g.fillStyle=o.c||fg();g.fillText(t,x,y,A.W-8)}
/* the board is 12 x 8 squares; cells are [col,row] with row 0 at the top */
const COLS=12,ROWS=8,FLAG=[[0,0],[1,0],[0,1],[0,2]];
function board(){const u=Math.floor(Math.min((A.W-12)/COLS,(A.H-40)/ROWS));return{u,ox:Math.round((A.W-u*COLS)/2),oy:Math.round(34+(A.H-40-u*ROWS)/2)}}
const at=(x,y)=>FLAG.map(([a,b])=>[a+x,b+y]);
/* quarter turns clockwise (on screen) about a grid point p: centre (cx,cy) -> (px-(cy-py), py+(cx-px)) */
function turn(cells,p,q){q=((q%4)+4)%4;return cells.map(([x,y])=>{let rx=x+.5-p[0],ry=y+.5-p[1];for(let i=0;i<q;i++)[rx,ry]=[-ry,rx];return[Math.round(p[0]+rx-.5),Math.round(p[1]+ry-.5)]})}
const flip=(cells,m)=>cells.map(([x,y])=>[2*m-x-1,y]);
const key=cs=>cs.map(c=>c.join()).sort().join(';');
const same=(a,b)=>key(a)===key(b);
function cellsPath(cs,u,ox,oy,fill,stroke,dash){const g=A.ctx;g.setLineDash(dash||[]);cs.forEach(([x,y])=>{g.beginPath();g.rect(ox+x*u+1,oy+y*u+1,u-2,u-2);if(fill){g.fillStyle=fill;g.fill()}if(stroke){g.strokeStyle=stroke;g.lineWidth=2.5;g.stroke()}});g.setLineDash([])}
function dot(x,y,r,col){const g=A.ctx;g.beginPath();g.arc(x,y,r,0,7);g.fillStyle=col;g.fill()}
function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#ecfccb',C.dark?.04:.3);g.fillRect(0,0,W,H);
 if(kind()==='chal'){txt('Translate: slide. Rotate: turn. Reflect: flip.',W/2,H*.3,15);txt('Count squares from one corner.',W/2,H*.45,15,{c:soft(),w:700});txt('The new shape is congruent: same size, same shape.',W/2,H*.6,14,{c:soft(),w:700});A.fx.draw(g);return}
 const{u,ox,oy}=board();g.lineWidth=1;g.strokeStyle=A.alpha(fg(),.16);
 for(let i=0;i<=COLS;i++){g.beginPath();g.moveTo(ox+i*u,oy);g.lineTo(ox+i*u,oy+ROWS*u);g.stroke()}for(let j=0;j<=ROWS;j++){g.beginPath();g.moveTo(ox,oy+j*u);g.lineTo(ox+COLS*u,oy+j*u);g.stroke()}
 if(S.ghost)cellsPath(S.ghost,u,ox,oy,A.alpha(C.vi,.12),C.vi,[6,4]);
 (S.copies||[]).forEach((k,i)=>{const sel=S.pick===i;cellsPath(k.cells,u,ox,oy,A.alpha(sel?(k.ok?C.gr:C.rd):C.cy,.35),sel?(k.ok?C.gr:C.rd):C.cy);
  const[x,y]=k.cells[k.cells.length-1];txt(String(i+1),ox+(x+.5)*u,oy+(y+.5)*u,14)});
 if(S.orig){cellsPath(S.orig,u,ox,oy,A.alpha(fg(),.1),A.alpha(fg(),.5));const[x,y]=S.orig[0];txt('A',ox+x*u-9,oy+y*u-11,14)}
 if(S.cells){g.save();const a=S.anim;if(a){const p=[ox+a.p[0]*u,oy+a.p[1]*u];g.translate(p[0],p[1]);g.rotate(a.ang);g.translate(-p[0],-p[1])}
  cellsPath(S.cells,u,ox,oy,A.alpha(C.am,.75),fg());g.restore()}
 if(S.mark){const[x,y]=S.mark;dot(ox+x*u,oy+y*u,6,C.rd)}
 if(S.vec){const[x0,y0]=S.vec.from,[dx,dy]=S.vec.d,X0=ox+x0*u,Y0=oy+y0*u,X1=X0+dx*u,Y1=Y0+dy*u;dot(X0,Y0,5,C.ac);
  if(dx||dy){const L=Math.hypot(X1-X0,Y1-Y0),ux=(X1-X0)/L,uy=(Y1-Y0)/L,h=Math.min(14,L*.5);g.strokeStyle=C.ac;g.fillStyle=C.ac;g.lineWidth=5;g.lineCap='round';
   g.beginPath();g.moveTo(X0,Y0);g.lineTo(X1-ux*h*.8,Y1-uy*h*.8);g.stroke();g.beginPath();g.moveTo(X1,Y1);g.lineTo(X1-ux*h-uy*h*.55,Y1-uy*h+ux*h*.55);g.lineTo(X1-ux*h+uy*h*.55,Y1-uy*h-ux*h*.55);g.closePath();g.fill()}
  g.beginPath();g.arc(X1,Y1,Math.max(9,u*.4),0,7);g.strokeStyle=C.ac;g.lineWidth=3;g.setLineDash([4,3]);g.stroke();g.setLineDash([])}
 if(S.pivot){const[x,y]=S.pivot;dot(ox+x*u,oy+y*u,7,fg());dot(ox+x*u,oy+y*u,3,C.pn)}
 txt(S.top||'',8,16,14,{w:700,c:soft(),al:'left'});A.fx.draw(g)}
function moveTxt(dx,dy){const p=[];if(dx)p.push(`${Math.abs(dx)} ${dx>0?'right':'left'}`);if(dy)p.push(`${Math.abs(dy)} ${dy>0?'down':'up'}`);return p.join(', ')||'no move'}
/* actions */
function shift(dx,dy){const n=S.cells.map(([x,y])=>[x+dx,y+dy]);if(n.some(([x,y])=>x<0||y<0||x>=COLS||y>=ROWS))return;S.cells=n;S.off[0]+=dx;S.off[1]+=dy;A.sound.tick();say(S.say());A.redraw();S.check()}
function aim(dx,dy){const v=S.vec,n=[v.d[0]+dx,v.d[1]+dy],x=v.from[0]+n[0],y=v.from[1]+n[1];if(x<0||y<0||x>COLS||y>ROWS)return;v.d=n;A.sound.tick();say(S.say());A.redraw();S.check()}
function spin(q){if(S.busy)return;S.busy=1;const from=S.q,to=from+q;const end=()=>{S.anim=null;S.q=to;S.cells=turn(S.base,S.pivot,to);S.busy=0;A.sound.tick();say(S.say());A.redraw();S.check()};
 if(A.reduced()){end();return}S.anim={p:S.pivot,ang:0};A.tween(S.anim,{ang:q*Math.PI/2},500,'io',end)}
function choose(i){if(S.copies==null)return;S.pick=i;const k=S.copies[i];say(k.m);A.sound.tick();A.redraw();S.check()}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function reset(o){run++;drag=null;for(const x in S)delete S[x];Object.assign(S,{check:()=>{},say:()=>''},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?30*(j+1):(j+1)*420))}
function controls(){if(!ctl)return;ctl.innerHTML='';const k=kind(),btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||null},ctl,t).onclick=f};if(k==='chal')return;
 if(k==='slide'){btn('◀',()=>shift(-1,0),'Slide the flag 1 square left');btn('▲',()=>shift(0,-1),'Slide the flag 1 square up');btn('▼',()=>shift(0,1),'Slide the flag 1 square down');btn('▶',()=>shift(1,0),'Slide the flag 1 square right')}
 if(k==='arrow'){btn('◀',()=>aim(-1,0),'Move the arrow tip 1 square left');btn('▲',()=>aim(0,-1),'Move the arrow tip 1 square up');btn('▼',()=>aim(0,1),'Move the arrow tip 1 square down');btn('▶',()=>aim(1,0),'Move the arrow tip 1 square right')}
 if(k==='quarter'||k==='half'){btn('↺ Quarter turn',()=>spin(-1),'Turn the flag a quarter turn anticlockwise about the dot');btn('Quarter turn ↻',()=>spin(1),'Turn the flag a quarter turn clockwise about the dot')}
 if(k==='name')(S.copies||[]).forEach((x,i)=>btn(`Copy ${i+1}`,()=>choose(i),`Choose copy ${i+1}`))}
/* drag: slide snaps to whole squares; arrow tip snaps to grid points; turning follows the angle round the dot */
let drag=null;
function cellAt(p){const{u,ox,oy}=board();return[Math.floor((p.x-ox)/u),Math.floor((p.y-oy)/u)]}
function down(p){const k=kind(),{u,ox,oy}=board();if(k==='slide'){drag={c:cellAt(p)};return true}
 if(k==='arrow'){drag={v:1};move(p);return true}
 if(k==='quarter'||k==='half'){drag={a:Math.atan2(p.y-(oy+S.pivot[1]*u),p.x-(ox+S.pivot[0]*u))};return true}
 if(k==='name'){const[x,y]=cellAt(p),i=(S.copies||[]).findIndex(q=>q.cells.some(([a,b])=>a===x&&b===y));if(i>=0)choose(i);return i>=0}return false}
function move(p){if(!drag)return;const{u,ox,oy}=board();
 if(drag.c){const[x,y]=cellAt(p),dx=Math.sign(x-drag.c[0]),dy=Math.sign(y-drag.c[1]);if(dx){shift(dx,0);drag.c[0]+=dx}else if(dy){shift(0,dy);drag.c[1]+=dy}}
 if(drag.v){const v=S.vec,gx=Math.round((p.x-ox)/u)-v.from[0],gy=Math.round((p.y-oy)/u)-v.from[1];if(gx!==v.d[0]||gy!==v.d[1])aim(gx-v.d[0],gy-v.d[1])}
 if(drag.a!=null){const a=Math.atan2(p.y-(oy+S.pivot[1]*u),p.x-(ox+S.pivot[0]*u));let d=a-drag.a;if(d>Math.PI)d-=2*Math.PI;if(d<-Math.PI)d+=2*Math.PI;if(Math.abs(d)>Math.PI/4&&!S.busy){spin(d>0?1:-1);drag.a=a}}}
const steps=[
{h:'Translate: slide',p:'A translation slides a shape. Every square moves the same way and the same distance: some squares left or right, and some up or down. The shape does not turn or flip.',
 predict:{q:'The flag slides 4 squares right and 2 squares up. What happens to its size?',opts:['It stays the same size','It gets bigger','It gets smaller'],ans:0},
 task:'Drag the flag onto the dashed outline: 4 right, 2 up',show:()=>auto(0,[()=>shift(1,0),()=>shift(1,0),()=>shift(1,0),()=>shift(1,0),()=>shift(0,-1),()=>shift(0,-1)]),
 go:()=>{reset({cells:at(2,4),off:[0,0],ghost:at(6,2),top:'Slide: 4 right, 2 up',
  say:()=>{const[dx,dy]=S.off;return dx===4&&dy===-2?'4 right and 2 up: the flag sits on the outline. Same size, same shape, same way round.':`So far: ${moveTxt(dx,dy)}. The outline is 4 right and 2 up from the start.`}});
  say('A flag shape on squared paper and a dashed outline. Drag the flag, or use the arrow buttons.');controls();S.check=finish(0,()=>S.off[0]===4&&S.off[1]===-2,'Translated 4 right, 2 up. Only its place changed, so the copy is congruent.')}},
{h:'Describe the slide',p:'To describe a translation, pick one corner and count how far it moves: first left or right, then up or down. Every other corner moves the same, so an arrow from one corner tells the whole move.',
 predict:{q:'Which corner should you count from?',opts:['Any corner: they all move the same','Only the top corner','The corner nearest the edge'],ans:0},
 task:'Drag the arrow tip from corner A to the same corner of the new flag',show:()=>auto(1,[()=>aim(1,0),()=>aim(1,0),()=>aim(1,0),()=>aim(1,0),()=>aim(1,0),()=>aim(0,1),()=>aim(0,1),()=>aim(0,1)]),
 go:()=>{reset({orig:at(1,1),cells:at(6,4),vec:{from:[1,1],d:[0,0]},top:'Arrow from corner A',
  say:()=>{const[dx,dy]=S.vec.d;return dx===5&&dy===3?'The arrow shows 5 right, 3 down. That is the translation.':dx===3&&dy===5?'Across comes first: 5 right, then 3 down. Swap them back.':`The arrow shows ${moveTxt(dx,dy)}. Aim for the same corner of the new flag.`}});
  say('Flag A and a coloured copy. Drag the arrow tip from corner A, or use the buttons.');controls();S.check=finish(1,()=>S.vec.d[0]===5&&S.vec.d[1]===3,'5 right, 3 down. One arrow describes the whole translation.')}},
{h:'Rotate: a quarter turn',p:'A rotation turns a shape about a fixed point called the centre of rotation. A quarter turn is 90°. Say which way: clockwise, like clock hands, or anticlockwise.',
 predict:{q:'The flagpole points up. The flag makes a quarter turn clockwise about the dot. Which way will the pole point?',opts:['To the right','To the left','Down'],ans:0},
 task:'Turn the flag about the dot until it fits the outline',show:()=>auto(2,[()=>spin(1)]),
 go:()=>{const p=[5,5],base=at(5,2);reset({base,pivot:p,q:0,cells:base,ghost:turn(base,p,1),top:'Quarter turn clockwise about the dot',
  say:()=>{const q=((S.q%4)+4)%4;return q===1?'A quarter turn clockwise: the pole now points right and the flag fits the outline.':q===3?'That is a quarter turn anticlockwise. The pole points left. Turn the other way.':q===2?'That is a half turn: the pole points down. Too far.':'Back where it started: a full turn.'}});
  say('A flag with its pole pointing up and a dot at the centre of rotation. Drag round the dot, or use the turn buttons.');controls();S.check=finish(2,()=>((S.q%4)+4)%4===1,'90° clockwise about the dot.')}},
{h:'Rotate: a half turn',p:'A half turn is 180°, two quarter turns. Clockwise or anticlockwise, a half turn ends in the same place. The shape ends upside down but is still the same size and shape.',
 predict:{q:'Is a half turn clockwise the same as a half turn anticlockwise?',opts:['Yes, both end in the same place','No, they end in different places','Only for square shapes'],ans:0},
 task:'Give the flag a half turn about the dot to fit the outline',show:()=>auto(3,[()=>spin(1),()=>{},()=>spin(1)]),
 go:()=>{const p=[6,4],base=at(6,1);reset({base,pivot:p,q:0,cells:base,ghost:turn(base,p,2),top:'Half turn about the dot',
  say:()=>{const q=((S.q%4)+4)%4;return q===2?`A half turn, 180°: the flag is upside down on the outline. You turned ${S.q>0?'clockwise':'anticlockwise'}, and either way works.`:q===0?'Back at the start.':'One quarter turn so far. Keep going.'}});
  say('A flag and a dot at the centre of rotation. Turn it twice, either way.');controls();S.check=finish(3,()=>((S.q%4)+4)%4===2,'Two quarter turns make a half turn.')}},
{h:'Name the move',p:'Look at how the copy faces. Facing the same way: a translation. Turned: a rotation. A mirror image, facing the other way: a reflection.',
 task:'Tap the copy that is a reflection of flag A',show:()=>{steps[4].go();setTimeout(()=>choose(2),A.reduced()?30:700)},
 go:()=>{const o=at(1,2);reset({orig:o,top:'Which copy is a reflection?',copies:[
  {cells:o.map(([x,y])=>[x+3,y+3]),m:'Copy 1 faces the same way as A. It only slid, so it is a translation, not a reflection.'},
  {cells:turn(o,[5,4],2),m:'Copy 2 is upside down: A turned a half turn. That is a rotation, not a reflection.'},
  {cells:flip(o,6),ok:1,m:'Copy 3 is a mirror image: the flag faces left instead of right. A reflection.'}],
  say:()=>''});say('Flag A and three copies, numbered 1 to 3. Tap a copy or use the buttons.');controls();
  S.check=()=>{if(A.step===4&&S.pick===2&&!A.isDone)A.done('Copy 3: a reflection, a mirror image. Copy 1 is a translation and copy 2 a rotation.')}}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['A triangle slides 5 squares to the left. What is this move called?',[['A translation','ok'],['A rotation','turnname'],['A reflection','flipname']]],
 ['Point (2, 3) is translated 4 right and 1 up. Where does it land?',[['(6, 4)','ok'],['(6, 2)','updown'],['(3, 7)','swap']]],
 ['A shape makes two quarter turns clockwise. What single turn is that?',[['A half turn','ok'],['A three-quarter turn','count'],['A full turn','count']]],
 ['After a translation, rotation or reflection, the new shape is\u2026',[['The same size and shape (congruent)','ok'],['Bigger','size'],['A different shape','size']]],
 ['A flagpole points up. The flag makes a half turn. Which way does the pole point now?',[['Down','ok'],['Right','quarter'],['Up','full']]],
 ['A shape slides 2 squares right, then 3 more right. What one move does both?',[['5 right','ok'],['1 right','subtract'],['6 right','times']]]];
function why(t){let m='Count squares from one corner, and check which way the copy faces.';
 if(t==='turnname')m='A rotation turns the shape. Sliding without turning is a translation.';
 if(t==='flipname')m='A reflection flips the shape into a mirror image. Sliding is a translation.';
 if(t==='updown')m='Up adds to the second number: 3 + 1 = 4. The point lands on (6, 4).';
 if(t==='swap')m='Across comes first. Add 4 to the first number and 1 to the second: (6, 4).';
 if(t==='count')m='A quarter turn is 90°. Two of them make 180°, which is a half turn.';
 if(t==='size')m='Slides, turns and flips never stretch a shape. The copy is congruent: same size, same shape.';
 if(t==='quarter')m='Right would be a quarter turn. A half turn is two quarter turns, so the pole points down.';
 if(t==='full')m='Up again would need a full turn. A half turn leaves the pole pointing down.';
 if(t==='subtract')m='Both moves go right, so add them: 2 + 3 = 5 right.';
 if(t==='times')m='Add the moves, do not multiply: 2 + 3 = 5 right.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},box,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.72,tall:.85,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Move controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:p=>move(p),up:()=>{drag=null}});controls()}});
A.start()})})();
