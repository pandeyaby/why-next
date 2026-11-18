/* Flagship: understanding area (ages 8-9): unit squares, area vs perimeter. */
(()=>{
const COLS=8,ROWS=5;
const COVER=[["..####..","..####..","..####.."],["..##....","..##....","..##....","..#####."],[".######.","...##...","...##..."]];
const FAIR=[['circles','Gaps'],['overlap','Overlaps'],['units','Fair count'],['mixed','Mixed sizes']],VERDICTS=['Fair count','Gaps','Overlaps','Mixed sizes'];
const START6=[[2,1],[3,1],[4,1],[2,2],[3,2],[4,2]],MOVES=[[[4,1],[5,2]],[[2,1],[1,2]],[[3,1],[3,3]]];
const JOBS=[['Carpet to cover a floor',0],['A fence round a garden',1],['Tiles for a wall',0],['Ribbon round the edge of a card',1]];
const JOBSHAPE=["..####..","..####..","..##...."];
const HALF=[[[3,2,0],[4,2,0],[3,3,0],[4,3,0],[3,1,'br'],[4,1,'bl']],
 [[2,1,'br'],[3,1,0],[4,1,0],[5,1,'tl'],[1,2,'br'],[2,2,0],[3,2,0],[4,2,'tl']],
 [[2,0,'br'],[2,1,0],[3,1,'br'],[2,2,0],[3,2,0],[4,2,'br'],[2,3,0],[3,3,0],[4,3,0],[5,3,'br']]];
const cellsOf=rows=>rows.flatMap((r,y)=>[...r].map((ch,x)=>ch==='#'?[x,y]:null).filter(Boolean));
const key=(x,y)=>x+','+y,un=k=>k.split(',').map(Number);
function perim(cells){const s=new Set(cells.map(([x,y])=>key(x,y)));let n=0;cells.forEach(([x,y])=>[[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx,dy])=>{if(!s.has(key(x+dx,y+dy)))n++}));return n}
const halfArea=sh=>{const f=sh.filter(c=>c[2]===0).length,h=sh.length-f;return[f+h/2,f+h,f,f,h]};
VIS.reg('flagcover',c=>{let A,pad,quiz,qn=-1,good=0;const G={},al=(k,a)=>A.alpha(k,a),rd=()=>A.redraw(),rb=()=>{rd();buttons()},now=()=>[...G.sq].map(un);
const P=()=>['cover','fair','move','job','half','quiz'][A.step];
const S=n=>A.sound[n](),vo=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const px=n=>Math.round(n*(A.narrow?1:1.12));
function lab(t,x,y,n,col,w){const g=A.ctx;g.font=`${w||700} ${px(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-12)}
const mid=(t,b,n,col,w)=>lab(t,b.x+b.w/2,b.y+b.h/2,n,col,w),ln=(g,a,b,c,d)=>{g.beginPath();g.moveTo(a,b);g.lineTo(c,d);g.stroke()},within=(p,b)=>p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
function tile(g,b,fill,edge,r){g.fillStyle=fill;A.paint.rrect(b.x,b.y,b.w,b.h,r==null?10:r);g.fill();g.lineWidth=2;g.strokeStyle=edge||A.col.tx;A.paint.rrect(b.x,b.y,b.w,b.h,r==null?10:r);g.stroke()}
const flash=(k,v)=>{G[k]=v;setTimeout(()=>{G[k]=null;rd()},A.reduced()?10:850)};
function geo(){const s=Math.floor(Math.min((A.W-24)/COLS,(A.H*.6)/ROWS));return{s,x0:Math.round((A.W-COLS*s)/2),y0:Math.round(A.H*.14)}}
function box(x,y){const{s,x0,y0}=geo();return{x:x0+x*s,y:y0+y*s,w:s,h:s}}
function at(p){const{s,x0,y0}=geo(),x=Math.floor((p.x-x0)/s),y=Math.floor((p.y-y0)/s);return x>=0&&x<COLS&&y>=0&&y<ROWS?[x,y]:null}
function grid(g,C){const{s,x0,y0}=geo();g.lineWidth=1;g.strokeStyle=al(C.mu,.45);for(let i=0;i<=COLS;i++)ln(g,x0+i*s,y0,x0+i*s,y0+ROWS*s);for(let j=0;j<=ROWS;j++)ln(g,x0,y0+j*s,x0+COLS*s,y0+j*s)}
function outline(g,cells,col,w){const s=new Set(cells.map(([x,y])=>key(x,y)));g.lineWidth=w||3.5;g.strokeStyle=col;g.lineCap='round';
 cells.forEach(([x,y])=>{const b=box(x,y);[[0,-1,b.x,b.y,b.x+b.w,b.y],[0,1,b.x,b.y+b.h,b.x+b.w,b.y+b.h],[-1,0,b.x,b.y,b.x,b.y+b.h],[1,0,b.x+b.w,b.y,b.x+b.w,b.y+b.h]].forEach(([dx,dy,a1,b1,a2,b2])=>{if(!s.has(key(x+dx,y+dy)))ln(g,a1,b1,a2,b2)})})}
const us=(g,L,col)=>L.forEach(([x,y])=>unit(g,x,y,col));
const ed=g=>{g.lineWidth=1.5;g.strokeStyle=A.col.tx};
function unit(g,x,y,col){const b=box(x,y);g.fillStyle=col;g.fillRect(b.x+2,b.y+2,b.w-4,b.h-4);ed(g);g.strokeRect(b.x+2,b.y+2,b.w-4,b.h-4)}
function tri(g,x,y,k,col){const b=box(x,y),L=b.x,R=b.x+b.w,T=b.y,B=b.y+b.h,P={bl:[[L,T],[L,B],[R,B]],br:[[R,T],[R,B],[L,B]],tl:[[L,B],[L,T],[R,T]],tr:[[L,T],[R,T],[R,B]]}[k];
 g.beginPath();g.moveTo(...P[0]);g.lineTo(...P[1]);g.lineTo(...P[2]);g.closePath();g.fillStyle=col;g.fill();ed(g);g.stroke()}
const answerBox=i=>{const w=(A.W-36)/2,h=Math.min(A.H*.11,48);return{x:12+(i%2)*(w+12),y:A.H*.74+Math.floor(i/2)*(h+8),w,h}};
const pick3=i=>{const w=(A.W-40)/3,h=Math.min(A.H*.13,56);return{x:12+i*(w+8),y:A.H*.8,w,h}};
function draw(A){const{ctx:g,W,H,col:C}=A,v=P();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.06:.4);g.fillRect(0,0,W,H);
 if(v==='quiz'){grid(g,C);cellsOf(["..####..","..####.."]).forEach(([x,y])=>unit(g,x+0,y+1,al(C.cy,.45)));lab('Area = squares inside. Perimeter = edges round.',W/2,H*.08,15);lab('4 × 2: area 8 square units, perimeter 12 units',W/2,H*.86,15);return}
 ({cover:drawCover,fair:drawFair,move:drawMove,job:drawJob,half:drawHalf})[v](g,W,H,C);A.fx.draw(g)}
function drawCover(g,W,H,C){const r=Math.min(G.r,2),want=cellsOf(COVER[r]);grid(g,C);
 want.forEach(([x,y])=>{const b=box(x,y);g.fillStyle=al(C.am,.14);g.fillRect(b.x,b.y,b.w,b.h)});if(G.r>=3)us(g,want,al(C.cy,.55));else G.laid.forEach(k=>{const[x,y]=un(k);unit(g,x,y,al(C.cy,.55))});outline(g,want,C.or);
 lab(G.r>=3?'Three shapes covered.':G.f?`${want.length} unit squares: area ${want.length} square units.`:'Drag or tap to lay unit squares.',W/2,H*.07,15);
 lab(G.r>=3?'Areas: 12, 11 and 10 square units':`Squares laid: ${G.laid.size}`,W/2,H*.84,G.r>=3?17:20,C.tx,800)}
function drawFair(g,W,H,C){const r=Math.min(G.r,3),kind=FAIR[r][0],{s}=geo(),cells=cellsOf(["..####..","..####..","..####.."]);grid(g,C);outline(g,cells,C.or);
 lab(G.r>=4?'Only equal squares, edge to edge, give a fair count.':`Tiling ${r+1} of 4: is this a fair count of the area?`,W/2,H*.07,15);
 if(G.r>=4){us(g,cells,al(C.gr,.4));lab('12 unit squares = 12 square units',W/2,H*.68,16,C.tx,800);return}
 if(kind==='circles')cells.forEach(([x,y])=>{const b=box(x,y);g.beginPath();g.arc(b.x+s/2,b.y+s/2,s*.48,0,7);g.fillStyle=al(C.vi,.45);g.fill();ed(g);g.stroke()});
 if(kind==='overlap')[[2,0],[3,0],[4,0],[2,1],[3,1],[4,1],[2,2],[3,2],[4,2]].forEach(([x,y])=>{const b=box(x,y);g.fillStyle=al(C.vi,.35);g.fillRect(b.x,b.y,s*1.33,s);ed(g);g.strokeRect(b.x,b.y,s*1.33,s)});
 if(kind==='units')us(g,cells,al(C.vi,.4));
 if(kind==='mixed'){[[2,0],[4,0]].forEach(([x,y])=>{const b=box(x,y);g.fillStyle=al(C.vi,.4);g.fillRect(b.x+2,b.y+2,2*s-4,2*s-4);ed(g);g.strokeRect(b.x+2,b.y+2,2*s-4,2*s-4)});[2,3,4,5].forEach(x=>unit(g,x,2,al(C.vi,.4)))}
 lab(kind==='mixed'?'6 tiles':kind==='overlap'?'9 tiles':'12 tiles',W/2,H*.68,16,C.tx,800);
 VERDICTS.forEach((t,i)=>{const b=answerBox(i);tile(g,b,G.bad===i?al(C.rd,.25):G.f&&t===FAIR[r][1]?al(C.gr,.3):al(C.cy,.12),C.tx);mid(t,b,15)})}
function drawMove(g,W,H,C){grid(g,C);const cells=now();
 cells.forEach(([x,y])=>unit(g,x,y,G.held===key(x,y)?al(C.am,.75):al(C.gr,.5)));outline(g,cells,C.or);
 if(G.held&&G.drag){const{s}=geo();g.fillStyle=al(C.am,.75);g.fillRect(G.drag.x-s/2,G.drag.y-s/2,s,s)}
 lab(G.moved>=3?'Three moves: the area never changed.':G.held?'Tap an empty spot touching the shape.':'Drag a square to a new spot, or tap it then a spot.',W/2,H*.07,14);
 lab(`Area: ${cells.length} square units`,W/2,H*.8,19,C.tx,800);lab(`Perimeter: ${perim(cells)} units  Moves: ${Math.min(G.moved,3)} of 3`,W/2,H*.9,15)}
function drawJob(g,W,H,C){const r=Math.min(G.r,3),cells=cellsOf(JOBSHAPE);grid(g,C);
 cells.forEach(([x,y])=>unit(g,x,y,G.show===0?al(C.cy,.55):al(C.mu,.12)));outline(g,cells,G.show===1?C.rd:C.or,G.show===1?6:3.5);
 lab(G.r>=4?'Covering needs area. Going round needs perimeter.':JOBS[r][0]+': area or perimeter?',W/2,H*.07,15);
 if(G.show===0)lab(`Area: ${cells.length} square units`,W/2,H*.7,18,C.tx,800);if(G.show===1)lab(`Perimeter: ${perim(cells)} units`,W/2,H*.7,18,C.tx,800);
 if(G.r>=4)return;(A.narrow?['Area: inside','Perimeter: edge']:['Area: squares inside','Perimeter: edges round']).forEach((t,i)=>{const b=answerBox(i);tile(g,b,G.bad===i?al(C.rd,.25):al(C.vi,.12),C.tx);mid(t,b,14)})}
function drawHalf(g,W,H,C){const r=Math.min(G.r,2),sh=HALF[r],[ok,all,wh]=halfArea(sh);grid(g,C);
 sh.forEach(([x,y,k])=>k===0?unit(g,x,y,al(C.cy,.5)):tri(g,x,y,k,G.paired?al(C.pk,.55):al(C.am,.55)));
 lab(G.r>=3?'Two halves make one whole square.':G.f?`${wh} whole + ${sh.length-wh} halves = ${ok} square units`:'Count whole squares, then pair up the halves. Area?',W/2,H*.07,14);
 if(G.r>=3)return;halfChoices(r).forEach((n,i)=>{const b=pick3(i);tile(g,b,G.bad===n?al(C.rd,.25):G.f&&n===ok?al(C.gr,.3):al(C.or,.14),C.tx);mid(String(n),b,22,C.tx,800)})}
const halfChoices=r=>{const[ok,all,wh]=halfArea(HALF[r]);return[[all,ok,wh],[ok,wh,all],[wh,all,ok]][r]};
function lay(x,y){if(P()!=='cover'||G.f||G.r>=3)return;const want=new Set(cellsOf(COVER[G.r]).map(([a,b])=>key(a,b))),k=key(x,y);
 if(!want.has(k)){if(!G.warned){G.warned=1;vo('That is outside the shape. Count only inside the edge.')}return}
 if(G.laid.has(k)){if(!G.warned){G.warned=1;vo('A square is there already. Overlaps count space twice.')}return}
 G.laid.add(k);S('tick');if(G.laid.size===want.size){G.f=1;S('pop');vo(`No gaps, no overlaps: ${want.size} unit squares, so the area is ${want.size} square units.`);buttons()}else vo(`${G.laid.size} squares.`);rd()}
function layNext(){if(G.r>=3||G.f)return;const c0=cellsOf(COVER[G.r]).find(([x,y])=>!G.laid.has(key(x,y)));if(c0)lay(...c0)}
function judge(i){if(P()!=='fair'||G.f||G.r>=4)return;const[kind,right]=FAIR[G.r],t=VERDICTS[i];
 if(t!==right){S('miss');flash('bad',i);vo(kind==='circles'?'Look between the circles: the gaps are not counted.':kind==='overlap'?'Some tiles overlap, so some space is counted twice.':kind==='units'?'Equal squares, edge to edge, no gaps or overlaps: a fair count of 12.':'The tiles are different sizes, so 6 tiles is not 6 units.');return rd()}
 G.f=1;S('pop');vo(kind==='units'?'Fair: equal unit squares. Area 12 square units.':`Right: ${t.toLowerCase()}. Not a fair count.`);rb()}
const isTouching=(x,y,skip)=>[[1,0],[-1,0],[0,1],[0,-1]].some(([dx,dy])=>{const k=key(x+dx,y+dy);return k!==skip&&G.sq.has(k)});
function grab(x,y){if(P()!=='move'||G.moved>=3)return false;const k=key(x,y);if(G.sq.has(k)){G.held=k;S('tick');vo('Picked up. Put it on an empty spot touching the shape.');rb();return true}return false}
function drop(x,y){if(!G.held)return;const k=key(x,y);
 if(G.sq.has(k)||!isTouching(x,y,G.held)){S('miss');vo(G.sq.has(k)?'That spot already has a square.':'Put it where it touches the shape along an edge.');G.held=null;rb();return}
 const before=perim(now());G.sq.delete(G.held);G.sq.add(k);G.held=null;G.moved++;S('pop');const after=perim(now());
 vo(`Still 6 squares: area 6 square units. Perimeter ${after===before?'stayed':before+' →'} ${after} units.`);rb();if(G.moved>=3)G.want()}
function choose(i){if(P()!=='job'||G.f||G.r>=4)return;const[job,want]=JOBS[G.r];G.show=want;
 if(i!==want){S('miss');flash('bad',i);vo(want===0?`${job} covers a surface: area.`:`${job} goes round the edge: perimeter.`);return rd()}
 G.f=1;S('pop');vo(want===0?`Yes, area: ${cellsOf(JOBSHAPE).length} square units.`:`Yes, perimeter: ${perim(cellsOf(JOBSHAPE))} units.`);rb()}
function sayArea(n){if(P()!=='half'||G.f||G.r>=3)return;const[ok,all,wh]=halfArea(HALF[G.r]);
 if(n!==ok){S('miss');flash('bad',n);vo(n===all?'That counts each half as a whole. Two halves make one.':'That leaves out the halves. Each pair is one more square.');return rd()}
 G.f=1;G.paired=1;S('pop');vo(`${wh} wholes, ${HALF[G.r].length-wh} halves = ${(HALF[G.r].length-wh)/2} more. Area ${ok} square units.`);rb()}
function onward(){const v=P(),last=LST(v);if(!G.f||G.r>last)return;G.r++;Object.assign(G,{f:0,laid:new Set(),show:null,paired:0,bad:null,warned:0});S('step');
 if(G.r>last){rd();buttons();return G.want()}
 vo(v==='cover'?'Next shape. Cover it with unit squares.':v==='fair'?`Tiling ${G.r+1}. Is it a fair count?`:v==='job'?`${JOBS[G.r][0]}: area or perimeter?`:'Next shape. Count wholes, then pair the halves.');rb()}
function buttons(){if(!pad)return;pad.innerHTML='';const v=P(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=f};
 const last=LST(v);if(v!=='move'&&G.r>last)return;if(G.f){B(G.r<last?'Next one':'Finish',onward);return}
 if(v==='cover')B('Lay a square',layNext,'Lay the next unit square');
 if(v==='fair')VERDICTS.forEach((t,i)=>B(t,()=>judge(i)));
 if(v==='move'&&G.moved<3){const m=MOVES[G.moved%3];if(!G.held)B('Pick up a corner square',()=>grab(...(G.sq.has(key(...m[0]))?m[0]:un([...G.sq][0]))));else B('Put it down beside the shape',()=>{const spot=freeSpot();if(spot)drop(...spot)})}
 if(v==='job')['Area','Perimeter'].forEach((t,i)=>B(t,()=>choose(i)));
 if(v==='half')halfChoices(G.r).forEach(n=>B(`${n} square units`,()=>sayArea(n)))}
function freeSpot(){const m=MOVES[G.moved%3][1];if(!G.sq.has(key(...m))&&isTouching(...m,G.held))return m;for(let y=0;y<ROWS;y++)for(let x=0;x<COLS;x++)if(!G.sq.has(key(x,y))&&isTouching(x,y,G.held))return[x,y];return null}
function down(p){const v=P(),last=LST(v);if(G.f&&G.r<=last){onward();return false}
 if(v==='cover'&&G.r<3){const q=at(p);if(q){lay(...q);G.paint=1;return true}}
 if(v==='fair')VERDICTS.forEach((t,i)=>{if(within(p,answerBox(i)))judge(i)});
 if(v==='move'){const q=at(p);if(!q)return false;if(G.held&&!G.sq.has(key(...q))){drop(...q);return false}if(grab(...q)){G.drag={x:p.x,y:p.y,moved:0};return true}}
 if(v==='job')[0,1].forEach(i=>{if(within(p,answerBox(i)))choose(i)});
 if(v==='half'&&G.r<3)[0,1,2].forEach(i=>{if(within(p,pick3(i)))sayArea(halfChoices(G.r)[i])});return false}
function move(p){if(P()==='cover'&&G.paint){const q=at(p);if(q)lay(...q)}if(P()==='move'&&G.drag){G.drag.x=p.x;G.drag.y=p.y;G.drag.moved=1;rd()}}
function up(p){G.paint=0;if(P()==='move'&&G.drag){const d=G.drag;G.drag=null;if(d.moved){const q=at(p);if(q&&key(...q)!==G.held)drop(...q);else rd()}}}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const LST=v=>v==='fair'||v==='job'?3:2,SH=(n,l,q=420)=>{steps[n].go();auto(l,q)};
function auto(list,gap){const me=++G.ver;list.forEach((f,j)=>setTimeout(()=>{if(me===G.ver)f()},A.reduced()?40*(j+1):(j+1)*gap))}
function clear(){const v=(G.ver||0)+1;Object.keys(G).forEach(k=>delete G[k]);Object.assign(G,{ver:v,want:()=>{},r:0,f:0,laid:new Set(),sq:new Set(START6.map(([x,y])=>key(x,y))),moved:0,paired:0,warned:0,paint:0})}
const steps=[
{h:'Cover it',p:'A unit square has an area of 1 square unit. Cover the shape with unit squares, with no gaps and no overlaps. Count them.',predict:{q:'A rectangle is 4 squares long and 3 squares wide. How many unit squares cover it?',opts:['7','12','14'],ans:1},task:'Cover 3 shapes',
 show:()=>{SH(0,[0,1,2].flatMap(r=>[...cellsOf(COVER[r]).map(()=>layNext),onward]),70)},
 go:()=>{clear();vo('Drag or tap on the outlined shape to lay unit squares.');buttons();G.want=ready(0,()=>G.r>=3,'Area is the number of unit squares that cover a shape.')}},
{h:'Is it a fair count?',p:'Tiles measure area fairly only if all are the same unit square, with no gaps and no overlaps.',predict:{q:'12 circles cover a shape. Is its area 12 square units?',opts:['Yes','No: circles leave gaps','Yes, if they touch'],ans:1},task:'Judge 4 tilings',
 show:()=>{SH(1,[0,1,2,3].flatMap(r=>[()=>judge(VERDICTS.indexOf(FAIR[r][1])),onward]))},
 go:()=>{clear();vo('Tiling 1: is this a fair count of the area?');buttons();G.want=ready(1,()=>G.r>=4,'Same-size unit squares, no gaps, no overlaps.')}},
{h:'Move a square',p:'Six unit squares make this shape. Move one to a new spot touching the shape. Watch the area and perimeter.',predict:{q:'You move one square to a new place. What happens to the area?',opts:['It grows','It stays 6','It shrinks'],ans:1},task:'Make 3 moves',
 show:()=>{SH(2,MOVES.flatMap(([a,b])=>[()=>grab(...a),()=>drop(...b)]))},
 go:()=>{clear();vo('Drag a square to a new place that touches the shape.');buttons();G.want=ready(2,()=>G.moved>=3,'Same squares, same area, even if the perimeter changes.')}},
{h:'Area or perimeter?',p:'Area counts the squares inside a shape. Perimeter is the distance round its edge. Which does each job need?',task:'Answer 4 jobs',
 show:()=>{SH(3,[0,1,2,3].flatMap(r=>[()=>choose(JOBS[r][1]),onward]))},
 go:()=>{clear();vo(`${JOBS[0][0]}: area or perimeter?`);buttons();G.want=ready(3,()=>G.r>=4,'Covering a surface is area. Going round the edge is perimeter.')}},
{h:'Half squares',p:'Count the whole squares, then pair up the halves: two halves make one square unit.',predict:{q:'A shape has 4 whole squares and 2 half squares. What is its area?',opts:['6 square units','5 square units','4 square units'],ans:1},task:'Find 3 areas',
 show:()=>{SH(4,[0,1,2].flatMap(r=>[()=>sayArea(halfArea(HALF[r])[0]),onward]))},
 go:()=>{clear();vo('Count whole squares, then pair up the halves. What is the area?');buttons();G.want=ready(4,()=>G.r>=3,'Two half squares make one square unit.')}},
{h:'Challenge',p:'',go:()=>{clear();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>G.want()});
const QS=[['A rectangle is 5 squares long and 2 squares wide. What is its area?',[['10 square units','ok'],['7 square units','sides'],['14 square units','edge']]],
 ['Which unit measures area?',[['Square centimetres (cm²)','ok'],['Centimetres (cm)','length'],['Kilograms (kg)','mass']]],
 ['12 circles cover a shape. Is the area 12 square units?',[['No, circles leave gaps','ok'],['Yes','gaps'],['Yes, if they are all the same size','gaps2']]],
 ['You move one square of a 6-square shape. What is the area now?',[['Still 6 square units','ok'],['More than 6','moved'],['Less than 6','moved']]],
 ['How much carpet covers a floor? Find the…',[['Area','ok'],['Perimeter','mixup'],['Length of one side','oneside']]],
 ['3 whole squares and 2 half squares. What is the area?',[['4 square units','ok'],['5 square units','halfwhole'],['3 square units','nohalf']]],
 ['Two rectangles both have a perimeter of 12. Do they have the same area?',[['Not always','ok'],['Yes, always','same'],['Yes, if both are rectangles','same2']]]];
function slip(t){let m='Area is how many unit squares cover the inside.';
 if(t==='sides')m='5 + 2 adds the side lengths. Area counts the squares: 2 rows of 5 is 10.';
 if(t==='edge')m='14 is the perimeter, the edge. Area counts the squares inside: 10.';
 if(t==='length')m='Centimetres measure length. Area is counted in square units, such as cm².';
 if(t==='mass')m='Kilograms measure mass. Area is counted in square units, such as cm².';
 if(t==='gaps'||t==='gaps2')m='Circles always leave gaps, so they miss some space. Use unit squares.';
 if(t==='moved')m='Moving a square does not add or remove one: still 6 square units.';
 if(t==='mixup')m='Perimeter is the edge, like a fence. Carpet covers the floor, so you need area.';
 if(t==='oneside')m='One side is a length. Carpet covers the floor: area.';
 if(t==='halfwhole')m='That counts each half as a whole. Two halves make 1, so 3 + 1 = 4.';
 if(t==='nohalf')m='The half squares cover space too. Two halves make 1 more: 3 + 1 = 4.';
 if(t==='same'||t==='same2')m='A 1 by 5 and a 2 by 4 rectangle both have perimeter 12, but areas 5 and 8.';
 return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],k=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(k).concat(ops.slice(0,k)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});vo('Challenge: '+q);rd()}
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){good++;A.win()}else{good=0;S('miss')}fb.innerHTML=(ok?`✓ Right! ${good} in a row.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.66,tall:1.2,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});buttons()}});
A.start()})})();
