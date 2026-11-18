/* Flagship: area of compound (rectilinear) shapes (ages 8–9). Paint the squares of an L-shape, drag a cut that splits it
   into two rectangles (both cut directions give the same total), work out two unmarked sides from the opposite sides,
   find the area by taking a corner away from a big rectangle, then a challenge. Shapes and text are in carea_art.js. */
(()=>{
const D=CAREA,G=D.GRID;
VIS.reg('flagcarea',c=>{let A,cx,bar,quizEl,round=-1,token=0,grab=null;const s={};
function hue(){const q=A.col;return{text:q.tx,quiet:q.mu,back:q.pn,night:q.dark,ink:'#111827',fill:'#fde68a',fillB:'#a5f3fc',line:q.dark?'#cbd5e1':'#475569',hole:q.dark?'#334155':'#e2e8f0',okc:'#166534',okb:'#dcfce7',noc:'#9f1239',strip:q.dark?'#3730a3':'#e0e7ff',cut:'#be123c'}}
const sz=n=>A.narrow?n:Math.round(n*1.15);
const voice=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
function label(t,x,y,n,colour,bold,side){cx.font=`${bold||700} ${sz(n)}px system-ui,sans-serif`;cx.textAlign=side||'center';cx.textBaseline='middle';cx.fillStyle=colour;cx.fillText(String(t),x,y,A.W-10)}
function fold(t,w,n){cx.font=`700 ${sz(n)}px system-ui,sans-serif`;const out=[];let line='';for(const word of String(t).split(' ')){const test=line?line+' '+word:word;if(line&&cx.measureText(test).width>w){out.push(line);line=word}else line=test}out.push(line);return out}
function plate(x,y,w,h,fill,edge){A.paint.rrect(x,y,w,h,8);cx.fillStyle=fill;cx.fill();if(edge){cx.lineWidth=2;cx.strokeStyle=edge;cx.stroke()}}
function strip(t){const k=hue(),rows=fold(t,A.W-36,13),lh=sz(17),h=rows.length*lh+12;plate(9,7,A.W-18,h,k.strip);rows.forEach((r,i)=>label(r,A.W/2,13+lh*(i+.5),13,k.night?'#f8fafc':k.ink));return 7+h+sz(8)}
function verdict(){if(!s.text)return;const k=hue(),rows=fold((s.slip?'✗ ':'✓ ')+s.text,A.W-40,12),lh=sz(16),h=rows.length*lh+10,y=A.H-h-7;plate(9,y,A.W-18,h,'#ffffff',s.slip?k.noc:k.okc);rows.forEach((r,i)=>label(r,A.W/2,y+5+lh*(i+.5),12,s.slip?k.noc:k.ink))}
const slip=t=>{s.slip=true;s.text=t;A.sound.miss();voice(t);A.redraw()};
const win=t=>{s.slip=false;s.text=t;A.sound.pop();voice(t);A.redraw();s.check()};
const info=t=>{s.slip=false;s.text=t;voice(t);A.redraw()};
/* grid geometry for the 8 by 6 L-shape */
const inL=(x,y)=>x<G.w-G.gapW||y>=G.gapH;
function frame(top){const u=Math.floor(Math.min((A.W-sz(40))/G.w,(A.H-top-sz(96))/G.h)),ox=Math.round((A.W-u*G.w)/2),oy=top+sz(6);return{u,ox,oy}}
function cellAt(p){const f=s.f;if(!f)return null;const x=Math.floor((p.x-f.ox)/f.u),y=Math.floor((p.y-f.oy)/f.u);return x>=0&&x<G.w&&y>=0&&y<G.h?{x,y}:null}
function grid(f,tint){const k=hue();for(let y=0;y<G.h;y++)for(let x=0;x<G.w;x++){const X=f.ox+x*f.u,Y=f.oy+y*f.u;cx.fillStyle=inL(x,y)?(tint?tint(x,y):'#f8fafc'):k.hole;cx.fillRect(X,Y,f.u,f.u);cx.strokeStyle=k.line;cx.lineWidth=1;cx.strokeRect(X+.5,Y+.5,f.u-1,f.u-1)}
 cx.strokeStyle=k.ink;cx.lineWidth=3;cx.beginPath();const P=[[0,0],[G.w-G.gapW,0],[G.w-G.gapW,G.gapH],[G.w,G.gapH],[G.w,G.h],[0,G.h]];P.forEach(([x,y],i)=>i?cx.lineTo(f.ox+x*f.u,f.oy+y*f.u):cx.moveTo(f.ox+x*f.u,f.oy+y*f.u));cx.closePath();cx.stroke()}
/* step 1: paint squares */
function showPaint(top){const k=hue(),f=s.f=frame(top);grid(f,(x,y)=>s.painted.has(x+','+y)?k.fill:'#f8fafc');label(`painted ${s.painted.size} squares`,A.W/2,f.oy+G.h*f.u+sz(16),12,k.text,800)}
function paintCell(q){if(!q)return;if(!inL(q.x,q.y)){if(!s.warned){s.warned=1;slip('That square is in the missing corner, outside the L. Only squares inside the shape count.')}return}
 const key=q.x+','+q.y;if(s.painted.has(key))return;s.painted.add(key);A.sound.tick();if(s.painted.size===36){win('All 36 squares painted. The area is 36 square centimetres, written 36 cm².');return}voice(`${s.painted.size} squares painted.`);A.redraw()}
function paintRow(){for(let y=0;y<G.h;y++){const todo=[];for(let x=0;x<G.w;x++)if(inL(x,y)&&!s.painted.has(x+','+y))todo.push({x,y});if(todo.length){todo.forEach(paintCell);return}}}
/* steps 2 and 3: cut into two rectangles */
function pieces(d,at){if(d==='v')return[[0,0,at,G.h],[at,G.gapH,G.w-at,G.h-G.gapH]];return[[0,0,G.w-G.gapW,at],[0,at,G.w,G.h-at]]}
function showCut(top){const k=hue(),f=s.f=frame(top),ok=s.done[s.cut.d]!=null&&s.cut.at===D.GOOD[s.cut.d];
 grid(f,ok?(x,y)=>(s.cut.d==='v'?x<s.cut.at:y<s.cut.at)?k.fill:k.fillB:null);
 if(ok)pieces(s.cut.d,s.cut.at).forEach(([x,y,w,h])=>{label(`${w} × ${h} = ${w*h}`,f.ox+(x+w/2)*f.u,f.oy+(y+h/2)*f.u,12,k.ink,900)});
 cx.strokeStyle=k.cut;cx.lineWidth=4;cx.setLineDash([9,6]);cx.beginPath();if(s.cut.d==='v'){const X=f.ox+s.cut.at*f.u;cx.moveTo(X,f.oy-sz(8));cx.lineTo(X,f.oy+G.h*f.u+sz(8))}else{const Y=f.oy+s.cut.at*f.u;cx.moveTo(f.ox-sz(8),Y);cx.lineTo(f.ox+G.w*f.u+sz(8),Y)}cx.stroke();cx.setLineDash([]);
 const sums=['v','h'].filter(d=>s.done[d]!=null).map(d=>(d==='v'?'down: 30 + 6':'across: 20 + 16')+' = 36');label(sums.length?sums.join('   '):'drag down or across to place the cut',A.W/2,f.oy+G.h*f.u+sz(18),12,k.text,800)}
function cutNow(){const {d,at}=s.cut,good=D.GOOD[d];
 if(at!==good){let m=`That cut leaves one piece still shaped like an L. Try a cut from the inside corner.`;
  if(d==='v'&&at<good)m=`The left piece is a rectangle, but the right piece still has a step. Move the cut right to the inside corner.`;
  if(d==='v'&&at>good)m=`The right piece is a rectangle, but the left piece still has a step. Move the cut left to the inside corner.`;
  if(d==='h'&&at<good)m=`The top piece is a rectangle, but the bottom piece is still an L. Move the cut down to the inside corner.`;
  if(d==='h'&&at>good)m=`The bottom piece is a rectangle, but the top piece is still an L. Move the cut up to the inside corner.`;slip(m);return}
 s.done[d]=d==='v'?[30,6]:[20,16];A.sound.tick();const sum=d==='v'?'5 × 6 = 30 and 3 × 2 = 6, so 30 + 6 = 36 cm².':'5 × 4 = 20 and 8 × 2 = 16, so 20 + 16 = 36 cm².';
 if(s.want.every(w=>s.done[w]!=null)){win(sum+(s.want.length>1?' Both cuts give 36.':''));return}info(sum+' Now cut the other way.')}
function nudge(v){const max=s.cut.d==='v'?G.w-1:G.h-1;s.cut.at=Math.max(1,Math.min(max,s.cut.at+v));A.sound.tick();voice(`Cut ${s.cut.d==='v'?'down':'across'} at ${s.cut.at} squares from the ${s.cut.d==='v'?'left':'top'}.`);A.redraw()}
function turn(){s.cut={d:s.cut.d==='v'?'h':'v',at:2};A.sound.tick();voice(`The cut now goes ${s.cut.d==='v'?'down':'across'}.`);A.redraw()}
/* steps 4 and 5: a measured L-shape, 10 cm by 7 cm with a 6 by 3 corner missing */
function cmFrame(top){const C=D.CM,u=Math.min((A.W-sz(90))/C.w,(A.H-top-sz(110))/C.h),ox=(A.W-u*C.w)/2,oy=top+sz(22);return{u,ox,oy,at:(x,y)=>[ox+x*u,oy+(C.h-y)*u]}}
function cmShape(f,fill){const k=hue(),pts=[[0,0],[10,0],[10,4],[4,4],[4,7],[0,7]];cx.beginPath();pts.forEach(([x,y],i)=>{const [X,Y]=f.at(x,y);i?cx.lineTo(X,Y):cx.moveTo(X,Y)});cx.closePath();cx.fillStyle=fill;cx.fill();cx.strokeStyle=k.ink;cx.lineWidth=3;cx.stroke()}
function tag(t,x,y,on){const k=hue(),w=sz(48),h=sz(24);plate(x-w/2,y-h/2,w,h,on?'#ede9fe':'#ffffff',on?'#7c3aed':k.ink);label(t,x,y,12,k.ink,900)}
function showMiss(top){const k=hue(),f=s.f=cmFrame(top);cmShape(f,k.fill);
 const lab=(t,x,y)=>{const [X,Y]=f.at(x,y);tag(t,X,Y,false)};lab('10 cm',5,0);lab('7 cm',0,3.5);lab('4 cm',2,7);lab('4 cm',10,2);
 const ends=[[[4,4],[10,4]],[[4,4],[4,7]]];ends.forEach(([p,q],i)=>{if(s.found[i]!=null)return;const [x1,y1]=f.at(...p),[x2,y2]=f.at(...q);cx.strokeStyle='#7c3aed';cx.lineWidth=5;cx.setLineDash([6,4]);cx.beginPath();cx.moveTo(x1,y1);cx.lineTo(x2,y2);cx.stroke();cx.setLineDash([])});
 s.spots=[f.at(7,4),f.at(4,5.5)].map(([X,Y],i)=>[X+(i?-sz(32):0),Y+(i?0:sz(18))]);s.spots.forEach(([X,Y],i)=>{const v=s.found[i];tag(v!=null?v+' cm':'?',X,Y,s.sel===i)})}
function choose(i,v){const [name,ans,,why]=D.MISS[i];s.sel=i;if(v!==ans){slip(why[v]||`Not ${v} cm. Use the opposite sides.`);return}
 s.found[i]=v;A.sound.tick();if(s.found.every(x=>x!=null)){win('The step across is 10 − 4 = 6 cm and the step down is 7 − 4 = 3 cm.');return}info(`The ${name} is ${v} cm. Now find the other missing side.`)}
function showTake(top){const k=hue(),f=s.f=cmFrame(top);const [x0,y0]=f.at(0,7),W=10*f.u,H=7*f.u;
 if(s.phase>=1){cx.fillStyle=k.fillB;cx.fillRect(x0,y0,W,H);cx.strokeStyle=k.ink;cx.lineWidth=2;cx.strokeRect(x0,y0,W,H)}
 cmShape(f,s.phase>=1?k.fillB:k.fill);const [cxA,cyA]=f.at(4,7);
 if(s.phase>=2){cx.fillStyle=k.hole;cx.fillRect(cxA,cyA,6*f.u,3*f.u);cx.strokeStyle=k.cut;cx.lineWidth=3;cx.setLineDash([7,5]);cx.strokeRect(cxA,cyA,6*f.u,3*f.u);cx.setLineDash([]);cmShape(f,k.fillB)}
 else if(s.phase===1){cx.fillStyle='rgba(190,18,60,.18)';cx.fillRect(cxA,cyA,6*f.u,3*f.u)}
 s.corner={x:cxA,y:cyA,w:6*f.u,h:3*f.u};s.box={x:x0,y:y0,w:W,h:H};
 const say=['tap the L-shape to fill the big rectangle','big rectangle 10 × 7 = 70 cm²: now tap the corner','70 − 6 × 3 = 70 − 18 = 52 cm²'][s.phase];label(say,A.W/2,y0+H+sz(20),12,k.text,800)}
function fillBig(){if(s.phase>0)return;s.phase=1;A.sound.tick();info('The whole big rectangle is 10 × 7 = 70 cm². Part of it is not in the L. Now take away the corner.')}
function takeCorner(){if(s.phase===0){slip('First fill in the whole big rectangle: tap the L-shape. Then you know what to take away from.');return}if(s.phase>1)return;s.phase=2;A.sound.tick();
 win('The corner is 6 × 3 = 18 cm², so the L-shape is 70 − 18 = 52 cm². Splitting gives 4 × 7 + 6 × 4 = 28 + 24 = 52 too.')}
const which=()=>['paint','cut','cut2','miss','take','quiz'][A.step];
function render(a){cx=a.ctx;const k=hue(),w=which();cx.fillStyle=k.back;cx.fillRect(0,0,A.W,A.H);
 if(w==='quiz'){label('Area of compound shapes',A.W/2,A.H*.34,17,k.text,900);label('split · add · take away',A.W/2,A.H*.5,13,k.quiet,700);A.fx.draw(cx);return}
 const top=strip(s.title||'');({paint:showPaint,cut:showCut,cut2:showCut,miss:showMiss,take:showTake})[w](top);verdict();A.fx.draw(cx)}
function blank(o){token++;grab=null;for(const key in s)delete s[key];Object.assign(s,{text:'',slip:false,check:()=>{},painted:new Set(),warned:0,cut:{d:'v',at:2},done:{},want:['v'],found:[null,null],sel:null,phase:0},o||{})}
function demo(i,acts){const me=token;acts.forEach((f,j)=>setTimeout(()=>{if(me===token&&A.step===i)f()},A.reduced()?30*(j+1):260*(j+1)))}
const passWhen=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function tools(){if(!bar)return;bar.innerHTML='';const w=which(),b=(t,f)=>{c.el('button',{type:'button',class:'lbtn'},bar,t).onclick=f};
 if(w==='paint')b('Paint the next row',paintRow);
 if(w==='cut'||w==='cut2'){b(s.cut&&s.cut.d==='h'?'Move the cut up':'Move the cut left',()=>nudge(-1));b(s.cut&&s.cut.d==='h'?'Move the cut down':'Move the cut right',()=>nudge(1));b('Turn the cut',()=>{turn();tools()});b('Cut here',cutNow)}
 if(w==='miss')D.MISS.forEach(([n,,opts],i)=>opts.forEach(v=>b(`${n}: ${v} cm`,()=>choose(i,v))));
 if(w==='take'){b('Fill the big rectangle',fillBig);b('Take away the corner',takeCorner)}}
function down(p){const w=which();if(w==='quiz')return false;
 if(w==='paint'){grab={k:'paint'};paintCell(cellAt(p));return true}
 if(w==='cut'||w==='cut2'){grab={k:'cut',x:p.x,y:p.y};const f=s.f;if(f)s.cut.at=s.cut.d==='v'?Math.max(1,Math.min(G.w-1,Math.round((p.x-f.ox)/f.u))):Math.max(1,Math.min(G.h-1,Math.round((p.y-f.oy)/f.u)));A.redraw();return true}
 if(w==='miss'){(s.spots||[]).forEach(([X,Y],i)=>{if(Math.hypot(p.x-X,p.y-Y)<sz(34)){s.sel=i;A.sound.tick();info(`Picked the ${D.MISS[i][0]}. Choose its length with the buttons.`)}});return true}
 if(w==='take'){const r=s.corner,inC=r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h,bx=s.box,inB=bx&&p.x>=bx.x&&p.x<=bx.x+bx.w&&p.y>=bx.y&&p.y<=bx.y+bx.h;if(inC)takeCorner();else if(inB)fillBig();return true}return true}
function move(p){if(!grab)return;if(grab.k==='paint'){paintCell(cellAt(p));return}
 const f=s.f,dx=Math.abs(p.x-grab.x),dy=Math.abs(p.y-grab.y);if(dx<6&&dy<6)return;const d=dy>dx?'v':'h';
 if(d!==s.cut.d){s.cut.d=d;tools()}s.cut.at=d==='v'?Math.max(1,Math.min(G.w-1,Math.round((grab.x-f.ox)/f.u))):Math.max(1,Math.min(G.h-1,Math.round((grab.y-f.oy)/f.u)));A.redraw()}
function up(){const g=grab;grab=null;if(g&&g.k==='cut')cutNow()}
const steps=[
{h:'Count the squares',p:D.STEPP[0],
 predict:{q:'The L fits in an 8 by 6 box. What is its area?',opts:['8 × 6 = 48 cm²','less than 48 cm²','8 + 6 = 14 cm²'],ans:1},
 task:'Paint every square of the L',show:()=>demo(0,[0,1,2,3,4,5].map(()=>paintRow)),
 go:()=>{blank({title:'Drag across the L to paint its squares'});voice('An L-shape on a grid, 8 squares wide and 6 tall, with a 3 by 4 corner missing at the top right.');tools();s.check=passWhen(0,()=>s.painted.size===36,D.DONE[0])}},
{h:'Cut into two rectangles',p:D.STEPP[1],
 task:'Cut the L into two rectangles',show:()=>demo(1,[()=>nudge(1),()=>nudge(1),()=>nudge(1),cutNow]),
 go:()=>{blank({title:'Drag a cut line down or across the L'});voice('Cut line down the L at 2 squares from the left.');tools();s.check=passWhen(1,()=>s.done.v!=null||s.done.h!=null,D.DONE[1])}},
{h:'Cut it the other way',p:D.STEPP[2],
 predict:{q:'If you cut the other way, the total area will be…',opts:['different, because the pieces change','still 36 cm²','double'],ans:1},
 task:'Make both cuts and compare',show:()=>demo(2,[()=>nudge(1),()=>nudge(1),()=>nudge(1),cutNow,()=>{turn();tools()},()=>nudge(1),()=>nudge(1),cutNow]),
 go:()=>{blank({title:'Cut down once and across once',want:['v','h']});voice('Make a cut down and a cut across. Compare the totals.');tools();s.check=passWhen(2,()=>s.done.v!=null&&s.done.h!=null,D.DONE[2])}},
{h:'Find the missing sides',p:D.STEPP[3],
 task:'Find both missing lengths',show:()=>demo(3,[()=>choose(0,6),()=>choose(1,3)]),
 go:()=>{blank({title:'Tap a ? on the shape, then pick its length'});voice('An L-shape: bottom 10 cm, left 7 cm, top 4 cm, right 4 cm. Two inside steps are marked ?.');tools();s.check=passWhen(3,()=>s.found.every(x=>x!=null),D.DONE[3])}},
{h:'Take away the corner',p:D.STEPP[4],
 predict:{q:'Big rectangle 70 cm², missing corner 18 cm². The L-shape is…',opts:['70 + 18 = 88 cm²','70 − 18 = 52 cm²','70 cm²'],ans:1},
 task:'Fill the big rectangle, then remove the corner',show:()=>demo(4,[fillBig,takeCorner]),
 go:()=>{blank({title:'Tap the shape, then tap the missing corner'});voice('The 10 cm by 7 cm L-shape with a 6 by 3 corner missing.');tools();s.check=passWhen(4,()=>s.phase===2,D.DONE[4])}},
{h:'Challenge',p:'',go:()=>{blank();quiz()}}];
steps.forEach(st=>{if(st.task)st.onPredict=()=>s.check()});
function quiz(){round++;const [q,opts]=D.QZ[round%D.QZ.length],k=round%3;quizEl.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quizEl.querySelector('.fl-pick');opts.slice(k).concat(opts.slice(0,k)).forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>grade(t)});voice('Challenge: '+q);A.redraw()}
let inRow=0;function grade(t){quizEl.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=quizEl.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){inRow++;A.win()}else{inRow=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Correct! ${inRow} in a row.`:'✗ '+(D.WHY[t]||'Try the lab step again.'))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw:render,onStep:A=>{quizEl.hidden=A.step!==5;bar.hidden=A.step===5;tools()},
 init:A=>{cx=A.ctx;const wrapEl=c.el('div',{class:'fl-below'},A.below);bar=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Area controls'},wrapEl);quizEl=c.el('div',{class:'fl-chal'},A.below);blank();
  A.gest({down,move,up});tools()}});
A.start()})})();
