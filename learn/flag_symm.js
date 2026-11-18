/* Flagship – lines of symmetry (ages 8–9, Year 4 geometry: identify lines of symmetry in 2-D shapes presented in different
   orientations; complete a simple symmetric figure with respect to a specific line of symmetry). Fold a rectangle on four
   candidate lines and see which folds match (2, not 4: the diagonals fail), then complete figures on squared paper across a
   vertical, a horizontal and a diagonal mirror line. Wrong squares get feedback that names the slip: sliding the half
   across instead of flipping it, counting the distance from the wrong place, or flipping the wrong way. */
(()=>{
/* grids: R rows, C cols, m = mirror ('v' between cols C/2-1 and C/2, 'h' between rows R/2-1 and R/2, 'd' top-left to bottom-right) */
const G=[null,
 {R:6,C:8,m:'v',give:[[0,3],[1,2],[1,3],[2,1],[2,2],[2,3],[3,3],[4,3],[5,2],[5,3]],name:'tree'},
 {R:6,C:8,m:'v',give:[[0,0],[1,0],[1,1],[3,1],[3,2],[4,0],[5,2]],name:'gaps'},
 {R:6,C:8,m:'h',give:[[0,1],[0,6],[1,1],[1,2],[1,5],[1,6],[2,3],[2,4],[2,0]],name:'flat'},
 {R:6,C:6,m:'d',give:[[0,2],[0,3],[1,4],[1,5],[2,5],[0,1]],name:'diag'}];
const mir=(g,[r,c])=>g.m==='v'?[r,g.C-1-c]:g.m==='h'?[g.R-1-r,c]:[c,r];
const side=(g,[r,c])=>g.m==='v'?(c<g.C/2?0:1):g.m==='h'?(r<g.R/2?0:1):(c>r?0:c<r?1:2);
const dist=(g,[r,c])=>g.m==='v'?(c<g.C/2?g.C/2-1-c:c-g.C/2):g.m==='h'?(r<g.R/2?g.R/2-1-r:r-g.R/2):Math.abs(r-c);
const key=([r,c])=>r+','+c;
/* rectangle fold lines in unit coords (rectangle is [-1.6,1.6] x [-1,1]) */
const LN=[{n:'up and down',a:[0,-1.35],b:[0,1.35],ok:1},{n:'across',a:[-1.95,0],b:[1.95,0],ok:1},{n:'corner to corner',a:[-1.6,-1],b:[1.6,1],ok:0},{n:'the other corner to corner',a:[-1.6,1],b:[1.6,-1],ok:0}];
const RECT=[[-1.6,-1],[1.6,-1],[1.6,1],[-1.6,1]];
function refl(p,a,b){const dx=b[0]-a[0],dy=b[1]-a[1],t=((p[0]-a[0])*dx+(p[1]-a[1])*dy)/(dx*dx+dy*dy),fx=a[0]+t*dx,fy=a[1]+t*dy;return[2*fx-p[0],2*fy-p[1]]}
VIS.reg('flagsymm',c=>{let A,ctl,chal,qi=-1,streak=0;const S={};
const tell=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const fs=n=>Math.round(n*(A.narrow?1:1.12)),R=()=>A.redraw();
function txt(g,s,x,y,n,col,w){g.font=`${w||700} ${fs(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(s,x,y,A.W-12)}
const grid=()=>G[A.step];
/* grid layout: cell size and origin */
function lay(){const g=grid(),top=34,bot=8,s=Math.floor(Math.min((A.W-24)/g.C,(A.H-top-bot)/g.R));return{s,x:Math.round((A.W-s*g.C)/2),y:top+Math.round((A.H-top-bot-s*g.R)/2)}}
const cellAt=p=>{const g=grid(),L=lay(),c=Math.floor((p.x-L.x)/L.s),r=Math.floor((p.y-L.y)/L.s);return r>=0&&r<g.R&&c>=0&&c<g.C?[r,c]:null};
const target=()=>{const g=grid();return new Set(g.give.map(p=>key(mir(g,p))))};
const giveSet=()=>new Set(grid().give.map(key));
/* rectangle view transform */
function rT(){const u=Math.min(A.W/4.6,(A.H-60)/2.9);return{u,cx:A.W/2,cy:A.H/2+10}}
const toS=(p,T)=>[T.cx+p[0]*T.u,T.cy+p[1]*T.u];
function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#f1f5f9',C.dark?.04:.5);g.fillRect(0,0,W,H);
 if(A.step===5){txt(g,'A line of symmetry folds a shape',W/2,H*.3,16);txt(g,'onto itself exactly',W/2,H*.42,16);txt(g,'Each square and its partner are the same',W/2,H*.6,14,C.mu);txt(g,'distance from the mirror line',W/2,H*.7,14,C.mu);return}
 if(A.step===0){const T=rT(),P=RECT.map(p=>toS(p,T));g.beginPath();P.forEach((p,i)=>i?g.lineTo(...p):g.moveTo(...p));g.closePath();g.fillStyle=A.alpha(C.cy,.22);g.fill();g.lineWidth=3;g.strokeStyle=C.tx;g.stroke();
  LN.forEach((l,i)=>{const a=toS(l.a,T),b=toS(l.b,T),on=S.fold===i,found=S.found.includes(i);g.setLineDash(found?[]:[9,7]);g.lineWidth=on?5:found?4:3;g.strokeStyle=found?C.gr:on&&!l.ok?C.rd:C.vi;g.beginPath();g.moveTo(...a);g.lineTo(...b);g.stroke();g.setLineDash([])});
  if(S.fold!=null){const l=LN[S.fold],Q=RECT.map(p=>toS(refl(p,l.a,l.b),T));g.beginPath();Q.forEach((p,i)=>i?g.lineTo(...p):g.moveTo(...p));g.closePath();g.fillStyle=A.alpha(l.ok?C.gr:C.rd,.16);g.fill();g.setLineDash([6,5]);g.lineWidth=3;g.strokeStyle=l.ok?C.gr:C.rd;g.stroke();g.setLineDash([])}
  txt(g,`Lines of symmetry found: ${S.found.length}`,W/2,16,14);return}
 const G0=grid(),L=lay(),s=L.s,T=target(),GV=giveSet();
 for(let r=0;r<G0.R;r++)for(let c2=0;c2<G0.C;c2++){const x=L.x+c2*s,y=L.y+r*s,k=key([r,c2]),mine=S.on.has(k),bad=mine&&!T.has(k);
  g.fillStyle=GV.has(k)?A.mix(C.pn,C.cy,.55):mine?A.mix(C.pn,bad?C.rd:C.gr,bad?.4:.5):S.peek&&T.has(k)?A.alpha(C.gr,.15):C.pn;g.fillRect(x,y,s,s);if(mine){g.beginPath();g.arc(x+s/2,y+s/2,s*.12,0,7);g.fillStyle=C.tx;g.fill()}
  if(S.cur&&S.cur[0]===r&&S.cur[1]===c2){g.lineWidth=3;g.strokeStyle=C.or;g.strokeRect(x+2,y+2,s-4,s-4)}}
 g.lineWidth=1;g.strokeStyle=C.mu;for(let r=0;r<=G0.R;r++){g.beginPath();g.moveTo(L.x,L.y+r*s);g.lineTo(L.x+G0.C*s,L.y+r*s);g.stroke()}
 for(let c2=0;c2<=G0.C;c2++){g.beginPath();g.moveTo(L.x+c2*s,L.y);g.lineTo(L.x+c2*s,L.y+G0.R*s);g.stroke()}
 if(S.bad){const[r,c2]=S.bad;g.lineWidth=4;g.strokeStyle=C.rd;g.strokeRect(L.x+c2*s+1,L.y+r*s+1,s-2,s-2)}
 g.lineWidth=5;g.strokeStyle=C.vi;g.setLineDash([12,6]);g.beginPath();
 if(G0.m==='v'){g.moveTo(L.x+G0.C/2*s,L.y-8);g.lineTo(L.x+G0.C/2*s,L.y+G0.R*s+8)}else if(G0.m==='h'){g.moveTo(L.x-8,L.y+G0.R/2*s);g.lineTo(L.x+G0.C*s+8,L.y+G0.R/2*s)}else{g.moveTo(L.x,L.y);g.lineTo(L.x+G0.C*s,L.y+G0.R*s)}
 g.stroke();g.setLineDash([]);
 const left=[...T].filter(k=>!S.on.has(k)).length;txt(g,left?`Squares still to shade: ${left}`:'Symmetric!',W/2,16,14,left?C.tx:C.gr);A.fx.draw(g)}
/* step 0: fold on a line */
function fold(i){if(A.step!==0)return;S.fold=i;const l=LN[i];
 if(!l.ok){A.sound.miss();tell(`Fold ${l.n}: the corners do not meet, the red outline sticks out. Not a line of symmetry.`);return R()}
 if(!S.found.includes(i))S.found.push(i);A.sound.pop();tell(`Fold ${l.n}: both halves match exactly. A line of symmetry! Found ${S.found.length} of 2.`);R();S.want()}
/* steps 1–4: shade a square */
function why(k){const g=grid(),[r,c2]=k.split(',').map(Number),p=[r,c2],d=dist(g,p);
 if(g.m==='v'||g.m==='h'){const shift=g.m==='v'?[r,c2-g.C/2]:[r-g.R/2,c2];if(giveSet().has(key(shift)))return'You slid that square across. A mirror flips the half: a square next to the line stays next to the line.'}
 if(g.m==='d'){const flat=[r,g.C-1-c2],flat2=[g.R-1-r,c2];if(giveSet().has(key(flat))||giveSet().has(key(flat2)))return'You flipped it straight across, as if the mirror stood up. Flip across the slanted line: swap the row and the column.'}
 const near=g.give.filter(q=>dist(g,q)===d);if(near.length)return`This square is ${d} square${d===1?'':'s'} from the mirror line, but no shaded square on the other side matches it in that row. Count from the mirror line, not from the edge.`;
 return`No square on the given side is ${d} square${d===1?'':'s'} from the mirror line in that place. Each square needs a partner the same distance away.`}
function tap(p){const g=grid();if(!g||S.done)return;const k=key(p);S.cur=p;
 if(side(g,p)!==1){A.sound.miss();tell('That side is already drawn. Shade squares on the other side of the mirror line.');return R()}
 if(S.on.has(k)){S.on.delete(k);if(S.bad&&key(S.bad)===k)S.bad=null;A.sound.tick();tell(`Row ${p[0]+1}, column ${p[1]+1} is clear again.`);return R()}
 S.on.add(k);const T=target();
 if(!T.has(k)){S.bad=p;S.miss++;A.sound.miss();tell(why(k)+' Tap it again to clear it.');return R()}
 S.bad=null;const left=[...T].filter(x=>!S.on.has(x)).length,wrong=[...S.on].filter(x=>!T.has(x)).length;
 if(left||wrong){A.sound.tick();tell(`Yes: ${dist(g,p)} from the line, like its partner. ${left} to go.`);return R()}
 S.done=1;A.sound.pop();tell('Every square has a partner the same distance from the mirror line. The figure is symmetric.');R();S.want()}
function move(dr,dc){const g=grid();if(!g)return;const p=S.cur||[0,0];S.cur=[Math.max(0,Math.min(g.R-1,p[0]+dr)),Math.max(0,Math.min(g.C-1,p[1]+dc))];const k=key(S.cur);
 tell(`Row ${S.cur[0]+1}, column ${S.cur[1]+1}: ${giveSet().has(k)?'shaded, given':S.on.has(k)?'shaded by you':'empty'}${side(g,S.cur)===1?'':', given side'}. ${dist(g,S.cur)} from the mirror line.`);R()}
function pad(){if(!ctl)return;ctl.innerHTML='';const B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};
 if(A.step===0)LN.forEach((l,i)=>B(`Fold ${l.n}`,()=>fold(i),`Fold the rectangle ${l.n}`));
 else if(A.step<5){B('↑',()=>move(-1,0),'Move up');B('↓',()=>move(1,0),'Move down');B('←',()=>move(0,-1),'Move left');B('→',()=>move(0,1),'Move right');B('Shade or clear',()=>tap(S.cur||[0,0]),'Shade or clear the square at the cursor')}}
function down(p){if(A.step===0){const T=rT();let best=-1,bd=24;LN.forEach((l,i)=>{const a=toS(l.a,T),b=toS(l.b,T),dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((p.x-a[0])*dx+(p.y-a[1])*dy)/(dx*dx+dy*dy))),d=Math.hypot(p.x-a[0]-t*dx,p.y-a[1]-t*dy);if(d<bd){bd=d;best=i}});if(best>=0)fold(best);return false}
 if(A.step<5){const q=cellAt(p);if(q)tap(q)}return false}
const check=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const k=++S.tok;fns.forEach((fn,j)=>setTimeout(()=>{if(k===S.tok)fn()},A.reduced()?j*30+30:(j+1)*ms))};
const reset=()=>{const t=(S.tok||0)+1;Object.keys(S).forEach(k=>delete S[k]);Object.assign(S,{tok:t,want:()=>{},on:new Set(),found:[],fold:null,bad:null,cur:null,miss:0,done:0})};
const auto=()=>{const g=grid();S.on.clear();S.bad=null;S.done=0;const T=[...target()].map(k=>k.split(',').map(Number));play(T.map(p=>()=>tap(p)),Math.min(420,3600/T.length))};
const grids=(n,intro,msg)=>({go:()=>{reset();S.cur=[0,grid().m==='v'?grid().C/2:0];tell(intro);pad();S.want=check(n,()=>S.done,msg)},show:()=>{steps[n].go();auto()}});
const steps=[
{h:'Fold the rectangle',p:'A line of symmetry is a fold line where one half lands exactly on the other. Tap a line to fold on it.',
 predict:{q:'How many lines of symmetry does a rectangle have?',opts:['4: across, up and down, and both diagonals','2: across, and up and down','1'],ans:1},task:'Find both lines of symmetry',
 show:()=>{steps[0].go();play([()=>fold(2),()=>fold(0),()=>fold(1)],1100)},
 go:()=>{reset();tell('A rectangle with four dashed lines. Tap a line to fold the rectangle on it.');pad();S.want=check(0,()=>S.found.length>=2,'2 lines: the diagonals fail because the corners do not meet.')}},
{h:'Complete the tree',p:'The dashed line is a mirror line. Tap squares to shade them so the right side is the reflection of the left. Your squares get a dot.',task:'Complete the symmetric figure',
 ...grids(1,'Half a tree is on the left of a vertical mirror line. Shade its reflection on the right.','Each square sits as far right of the line as its partner sits left.')},
{h:'Mind the gaps',p:'Some squares are away from the mirror line. Count the squares from the line to each one.',
 predict:{q:'A square is 2 squares left of the mirror line. Where is its partner?',opts:['2 squares right of the line','At the right-hand edge','4 squares right of the line'],ans:0},task:'Complete the figure with gaps',
 ...grids(2,'These squares do not all touch the mirror line. Count each one from the line.','Same distance from the line, on the other side, in the same row.')},
{h:'A mirror lying down',p:'Now the mirror line goes across. Reflect the top half down into the bottom half.',task:'Reflect across the horizontal line',
 ...grids(3,'The mirror line goes across the middle. Shade the reflection below it.','A horizontal mirror keeps each square in its column and flips it from top to bottom.')},
{h:'A slanted mirror',p:'This mirror line goes corner to corner. A square reflects straight across the line, at a right angle to it.',
 predict:{q:'The square in row 1, column 3 is above the slanted line. Where is its partner?',opts:['Row 3, column 1','Row 6, column 3','Row 1, column 4'],ans:0},task:'Reflect across the diagonal',
 ...grids(4,'A diagonal mirror line goes from the top-left corner to the bottom-right. Shade the reflection below it.','With this diagonal mirror, row and column swap: row 1, column 3 goes to row 3, column 1.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['How many lines of symmetry does a square have?',[['4','ok'],['2','sq2'],['8','sq8']]],
 ['How many lines of symmetry does a rectangle (not a square) have?',[['2','ok'],['4','diag'],['0','none']]],
 ['A square is 3 squares left of a vertical mirror line. Where is its reflection?',[['3 squares right of the line','ok'],['At the right edge of the grid','edge'],['3 squares right of the left edge','slide']]],
 ['How many lines of symmetry does an equilateral triangle have?',[['3','ok'],['1','tri1'],['0','tri0']]],
 ['A parallelogram with no right angles, and long and short sides. How many lines of symmetry?',[['0','ok'],['2','para'],['1','para1']]],
 ['Which letter has a horizontal line of symmetry?',[['B','ok'],['A','letA'],['F','letF']]]];
function hintFor(t){let m='Fold it in your head: do the halves land on each other?';
 if(t==='sq2')m='Fold a square corner to corner too: the corners meet. That adds 2 diagonal lines to the 2 straight ones.';
 if(t==='sq8')m='Count fold lines through the middle: up and down, across, and 2 diagonals. That is 4.';
 if(t==='diag')m='Fold a long rectangle on a diagonal: the corners do not meet. Only across and up and down work.';
 if(t==='none')m='Fold it in half up and down: the halves match. So it has at least 1 line.';
 if(t==='edge')m='Count from the mirror line, not from the edge of the grid. 3 left means 3 right.';
 if(t==='slide')m='That slides the square. A reflection is measured from the mirror line on both sides.';
 if(t==='tri1')m='An isosceles triangle has 1 line. An equilateral triangle has 3 equal sides, so it folds 3 ways, each through a corner.';
 if(t==='tri0')m='Fold it from one corner to the middle of the opposite side: the halves match.';
 if(t==='para')m='Its diagonals and middle lines do not fold it onto itself. Try it with paper: the corners never meet.';
 if(t==='para1')m='No fold works: the slant makes each half the wrong way round.';
 if(t==='letA')m='A has a vertical line: left and right match. Folded across the middle, the top and bottom differ.';
 if(t==='letF')m='F has no line of symmetry at all: no fold makes the halves match.';
 return m}
function ask(){qi++;const[q,ops]=QS[qi%QS.length],rot=qi%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);R()}
function mark(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}const m=ok?'Yes, that’s right. In a row: '+streak+'.':'Not this time. '+hintFor(t);fb.innerHTML=m+' <button type="button" class="linkish">Another question</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;pad()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move:()=>{},up:()=>{}});pad()}});
A.start()})})();
