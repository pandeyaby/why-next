/* Flagship – completing the square (ages 15–17): split the 6 x-strips of x² + 6x evenly round an x² tile to see the
   missing 3 × 3 corner, fill that corner from the +2 units and borrow the rest to get (x + 3)² − 7, pick p = b/2 with
   its sign, slide along y = (x + p)² + q to find the turning point, then solve x² + 6x + 2 = 0 line by line.
   Every canvas tap or drag has a button twin; the canvas label says what just happened. */
(()=>{
const HALF=[['x² + 10x + 1',[['5',1],['10','dbl'],['−5','sgn'],['25','sq']],'(x + 5)² − 24','1 − 25 = −24'],
 ['x² − 8x + 3',[['−4',1],['4','sgn'],['−8','dbl'],['16','sq']],'(x − 4)² − 13','3 − 16 = −13'],
 ['x² + 3x',[['1.5',1],['3','dbl'],['−1.5','sgn'],['2.25','sq']],'(x + 1.5)² − 2.25','0 − 2.25 = −2.25']];
const HWHY={dbl:'p is half of b. (x + b)² would make 2b lots of x, twice too many.',sgn:'p has the same sign as b: (x − 4)² gives −8x, (x + 5)² gives +10x.',sq:'That is p², the number you take away for q, not p itself.'};
const CURVES=[['x² − 4x + 7 = (x − 2)² + 3',2,3],['x² + 6x + 2 = (x + 3)² − 7',-3,-7]];
const SOLVE=[[['(x + 3)² − 7 = 0',1],['(x + 6)² − 34 = 0','Halve the 6: the bracket is (x + 3)², not (x + 6)².'],['(x + 3)² + 2 = 0','(x + 3)² = x² + 6x + 9, so take the 9 away: 2 − 9 = −7.']],
 [['(x + 3)² = 7',1],['(x + 3)² = −7','Add 7 to both sides, so −7 becomes +7 on the right.'],['x + 3 = 7','Square-root both sides; you cannot just drop the square.']],
 [['x = −3 ± √7',1],['x = −3 + √7','A positive number has two square roots, ±√7. The other answer is −3 − √7.'],['x = 3 ± √7','Take 3 from both sides: x = −3 ± √7, not +3.']]];
VIS.reg('flagcsq',c=>{let A,ctl,quiz,qk=-1,tok=0;
const init0=()=>({want:()=>{},won:0,side:[0,0,0,0,0,0],fill:0,q:0,px:0,lines:['x² + 6x + 2 = 0'],bad:-1,lock:0,grab:null}),S=init0();
const stage=()=>['tiles','corner','half','turn','solve','quiz'][A.step],rm=()=>A.reduced(),fs=n=>Math.round(n*(A.narrow?1:1.12));
const say=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
function put(g,t,x,y,n,col,wt,al){g.font=`${wt||700} ${fs(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-16)}
function box(g,r,fill,warn,edge){const C=A.col;g.fillStyle=fill||(C.dark?'#1e293b':'#fff');A.paint.rrect(r.x,r.y,r.w,r.h,8);g.fill();g.strokeStyle=warn?C.rd:edge||C.ln;g.lineWidth=warn?5:2;A.paint.rrect(r.x,r.y,r.w,r.h,8);g.stroke()}
const hit=(p,r)=>r&&p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
/* ---- 1 algebra tiles ---- */
const geo=()=>{const X=Math.min(A.W*(A.narrow?.38:.3),A.H*.42),u=X/5;return{X,u,ox:A.narrow?(A.W-X-3*u)/2:A.W*.08,oy:A.H*.12}};
function stripRect(i){const{X,u,ox,oy}=geo(),s=S.side[i];
 if(s===1){const k=S.side.slice(0,i).filter(v=>v===1).length;return{x:ox+X+k*u,y:oy,w:u,h:X}}
 if(s===2){const k=S.side.slice(0,i).filter(v=>v===2).length;return{x:ox,y:oy+X+k*u,w:X,h:u}}
 if(A.narrow)return{x:(A.W-2*X-12)/2+(i%2)*(X+12),y:A.H*.68+Math.floor(i/2)*(u+6),w:X,h:u};return{x:A.W*.6,y:A.H*.12+i*(u+8),w:X,h:u}}
const count=k=>S.side.filter(v=>v===k).length;
function place(i,s){if(stage()!=='tiles'||S.won)return;if(S.side[i]&&!s){S.side[i]=0;A.sound.tick();say(`Strip ${i+1} back in the tray.`);keys();return A.redraw()}
 if(count(s)>=3)return miss(`Six strips round one square: half of 6 is 3, so each side holds 3. This side already has 3.`,i);
 S.side[i]=s;A.sound.pop();const r=count(1),b=count(2);
 if(r+b<6)say(`Strip ${i+1} on the ${s===1?'right':'bottom'}. Right ${r}, bottom ${b}.`);else{S.won=1;say('3 strips on each side. The shape is almost a square of side x + 3, but a 3 × 3 corner is missing: 9 small squares.');S.want()}keys();A.redraw()}
function drawTiles(g){const C=A.col,{X,u,ox,oy}=geo();g.fillStyle=A.alpha(C.ac,.5);g.fillRect(ox,oy,X,X);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(ox,oy,X,X);put(g,'x²',ox+X/2,oy+X/2,22,C.tx,900);
 S.side.forEach((s,i)=>{const r=stripRect(i);g.fillStyle=A.alpha(C.gr,.55);g.fillRect(r.x,r.y,r.w,r.h);g.strokeStyle=S.bad===i?C.rd:C.tx;g.lineWidth=S.bad===i?4:1.5;g.strokeRect(r.x,r.y,r.w,r.h);put(g,'x',r.x+r.w/2,r.y+r.h/2,13,C.tx,800)});
 if(S.grab&&S.grab.x!=null){g.fillStyle=A.alpha(C.gr,.4);g.fillRect(S.grab.x-20,S.grab.y-10,40,20)}
 if(stage()==='corner'||S.won){const cx=ox+X,cy=oy+X;for(let k=0;k<9;k++){const r={x:cx+(k%3)*u,y:cy+Math.floor(k/3)*u,w:u,h:u};
  if(k<S.fill){g.fillStyle=k<2?A.alpha(C.or,.75):A.alpha(C.rd,.45);g.fillRect(r.x,r.y,r.w,r.h)}g.strokeStyle=C.tx;g.setLineDash(k<S.fill?[]:[4,3]);g.lineWidth=1.5;g.strokeRect(r.x,r.y,r.w,r.h);g.setLineDash([])}}
 put(g,stage()==='corner'?`x² + 6x + 2 = ${S.fill>=9?'(x + 3)² − 7':'?'}`:`x² + 6x: right ${count(1)}, bottom ${count(2)}`,A.W/2,A.H*.05,15,C.tx,900);
 if(stage()==='corner'){const n=Math.min(S.fill,2),bor=Math.max(0,S.fill-2);put(g,`Your +2 units used: ${n} of 2   Borrowed: ${bor}`,A.W/2,A.H*.72,13,C.tx,800);if(S.fill>=9)put(g,'Borrowed 7, so take 7 away: (x + 3)² − 7',A.W/2,A.H*.82,13,C.tx,800)}}
function cornerCell(p){const{X,u,ox,oy}=geo(),cx=ox+X,cy=oy+X;if(p.x<cx||p.y<cy||p.x>cx+3*u||p.y>cy+3*u)return-1;return Math.floor((p.y-cy)/u)*3+Math.floor((p.x-cx)/u)}
function fillOne(){if(stage()!=='corner'||S.fill>=9)return;S.fill++;A.sound.tick();
 say(S.fill<=2?`Used your own unit ${S.fill} of 2.`:S.fill<9?`Borrowed ${S.fill-2}.`:'Corner full: 2 of your own and 7 borrowed. x² + 6x + 2 = (x + 3)² − 7.');if(S.fill>=9){S.won=1;A.sound.pop();S.want()}keys();A.redraw()}
/* ---- 3 halve b ---- */
function obox(i){i=(i+S.q+1)%4;const w=(A.W-50)/4;return{x:10+i*(w+10),y:A.H*.42,w,h:A.H*.2}}
function pickP(i){if(stage()!=='half'||S.won>=3||S.lock)return;const[e,ops]=HALF[S.q],[t,ok]=ops[i];if(ok!==1)return miss(HWHY[ok],i);
 S.won++;A.sound.pop();say(`p = ${t}. ${e} = ${HALF[S.q][2]}, because q = ${HALF[S.q][3]}.`);if(S.won<3){S.lock=1;setTimeout(()=>{S.lock=0;S.q++;keys();A.redraw()},rm()?10:900)}keys();A.redraw();S.want()}
function drawHalf(g){const C=A.col,[e,ops,res]=HALF[Math.min(S.q,2)];put(g,`${e} = (x + p)² + q`,A.W/2,A.H*.12,17,C.tx,900);put(g,'What is p?',A.W/2,A.H*.26,14,C.tx,800);
 ops.forEach(([t],i)=>{const r=obox(i);box(g,r,null,S.bad===i,C.tx);put(g,t,r.x+r.w/2,r.y+r.h/2,20,C.tx,900)});if(S.lock||S.won>=3)put(g,`= ${res}`,A.W/2,A.H*.78,17,C.tx,900)}
/* ---- 4 turning point ---- */
const XL=-7,XR=5,YB=-9,YT=14,gx=x=>A.W*.08+(x-XL)/(XR-XL)*A.W*.84,gy=y=>A.H*.9-(y-YB)/(YT-YB)*A.H*.72,tx=px=>XL+(px-A.W*.08)/(A.W*.84)*(XR-XL);
const mn=v=>String(v).replace('-','−'),curve=()=>CURVES[Math.min(S.q,1)],fy=x=>{const[,p,q]=curve();return(x-p)**2+q};
function setX(x){if(stage()!=='turn'||S.won>=2)return;S.px=Math.max(XL,Math.min(XR,Math.round(x*2)/2));A.sound.tick();say(`x = ${mn(S.px)}, y = ${mn(fy(S.px))}.`);keys();A.redraw()}
function checkLow(){if(stage()!=='turn'||S.won>=2||S.lock)return;const[,p,q]=curve(),x=S.px;
 if(x!==p)return miss(`At x = ${mn(x)}, y = ${mn(fy(x))}. The bracket (x ${p<0?'+':'−'} ${Math.abs(p)}) is not 0 here, so its square adds ${(x-p)**2} on top of ${mn(q)}. Move ${x<p?'right':'left'}.`,-1);
 S.won++;A.sound.pop();say(`Lowest point (${mn(p)}, ${mn(q)}): the square is 0 here and can never be negative, so ${mn(q)} is the minimum.`);if(S.won<2){S.lock=1;setTimeout(()=>{S.lock=0;S.q=1;S.px=0;keys();A.redraw()},rm()?10:900)}keys();A.redraw();S.want()}
function drawTurn(g){const C=A.col,[e,p,q]=curve();put(g,`y = ${e}`,A.W/2,A.H*.07,14,C.tx,900);
 g.strokeStyle=C.ln;g.lineWidth=1;for(let x=XL;x<=XR;x++){g.beginPath();g.moveTo(gx(x),gy(YB));g.lineTo(gx(x),gy(YT));g.stroke()}
 g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.moveTo(gx(XL),gy(0));g.lineTo(gx(XR),gy(0));g.moveTo(gx(0),gy(YB));g.lineTo(gx(0),gy(YT));g.stroke();
 [-6,-4,-2,2,4].forEach(x=>put(g,String(x).replace('-','−'),gx(x),gy(0)+12,10,C.tx,700));
 g.save();g.beginPath();g.rect(gx(XL),gy(YT),gx(XR)-gx(XL),gy(YB)-gy(YT));g.clip();g.strokeStyle=C.ac;g.lineWidth=3;g.beginPath();for(let i=0;i<=240;i++){const x=XL+(XR-XL)*i/240;i?g.lineTo(gx(x),gy(fy(x))):g.moveTo(gx(x),gy(fy(x)))}g.stroke();
 g.strokeStyle=C.or;g.setLineDash([5,4]);g.beginPath();g.moveTo(gx(XL),gy(q));g.lineTo(gx(XR),gy(q));g.stroke();g.setLineDash([]);g.restore();
 const x=S.px,y=fy(x);if(y<=YT){g.fillStyle=C.rd;g.beginPath();g.arc(gx(x),gy(y),9,0,7);g.fill()}put(g,`(${mn(x)}, ${mn(y)})`,A.W/2,A.H*.15,13,C.tx,800)}
/* ---- 5 solve ---- */
function sbox(i){i=(i+S.won+1)%3;const w=Math.min(A.W-20,420),h=A.H*.13;return{x:(A.W-w)/2,y:A.H*.5+i*(h+8),w,h}}
function pickLine(i){if(stage()!=='solve'||S.won>=3)return;const[t,ok]=SOLVE[S.won][i];if(ok!==1)return miss(ok,i);
 S.lines.push(t);S.won++;A.sound.pop();say(S.won>=3?'x = −3 + √7 ≈ −0.35 or x = −3 − √7 ≈ −5.65.':`Next line: ${t}`);keys();A.redraw();S.want()}
function drawSolve(g){const C=A.col;S.lines.forEach((t,i)=>put(g,t,A.W/2,A.H*(.07+i*.1),16,C.tx,900));
 if(S.won<3)SOLVE[S.won].forEach(([t],i)=>{const r=sbox(i);box(g,r,null,S.bad===i,C.tx);put(g,t,r.x+r.w/2,r.y+r.h/2,16,C.tx,800)});else put(g,'x ≈ −0.35 or x ≈ −5.65',A.W/2,A.H*.6,16,C.tx,900)}
/* ---- shared ---- */
function miss(t,b){A.sound.miss();S.bad=b;say(t);setTimeout(()=>{S.bad=-1;A.redraw()},rm()?10:900);A.redraw()}
function draw(A){const{ctx:g,W,H,col:C}=A,v=stage();g.fillStyle=A.mix(C.pn,'#f0fdf4',C.dark?.04:.3);g.fillRect(0,0,W,H);
 if(v==='quiz'){put(g,'x² + bx + c = (x + b/2)² − (b/2)² + c',W/2,H*.4,15,C.tx,800);put(g,'Halve b, keep its sign, take away its square.',W/2,H*.6,13,C.tx);return}
 ({tiles:drawTiles,corner:drawTiles,half:drawHalf,turn:drawTurn,solve:drawSolve})[v](g);A.fx.draw(g)}
function keys(){if(!ctl)return;ctl.innerHTML='';const v=stage(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};if(v==='quiz')return;
 if(v==='tiles'&&!S.won){const i=S.side.indexOf(0);if(i>=0){B('Strip to right side',()=>place(i,1),`Put strip ${i+1} on the right side`);B('Strip to bottom',()=>place(i,2),`Put strip ${i+1} on the bottom`)}}
 if(v==='corner'&&S.fill<9)B(S.fill<2?'Use one of your units':'Borrow a unit',fillOne);
 if(v==='half'&&S.won<3)[0,1,2,3].map(k=>(k+3-S.q)%4).forEach(i=>{const t=HALF[S.q][1][i][0];B(t,()=>pickP(i),`p = ${t}`)});
 if(v==='turn'&&S.won<2){B('◀ Left',()=>setX(S.px-.5),'Move the point left');B('Right ▶',()=>setX(S.px+.5),'Move the point right');B('This is the lowest point',checkLow)}
 if(v==='solve'&&S.won<3)[0,1,2].map(k=>(k+2-S.won%3)%3).forEach(i=>{const t=SOLVE[S.won][i][0];B(t,()=>pickLine(i),`Next line ${t}`)})}
function down(p){const v=stage();
 if(v==='tiles'){const i=S.side.findIndex((s,i)=>hit(p,stripRect(i)));if(i>=0){S.grab={i,x:null,x0:p.x,y0:p.y};return true}return false}
 if(v==='corner'){if(cornerCell(p)>=0)fillOne();return false}
 if(v==='half'){const i=[0,1,2,3].find(i=>hit(p,obox(i)));if(i!=null)pickP(i);return false}
 if(v==='turn'){S.grab={turn:1};setX(tx(p.x));return true}
 if(v==='solve'&&S.won<3){const i=[0,1,2].find(i=>hit(p,sbox(i)));if(i!=null)pickLine(i)}return false}
function move(p){const gr=S.grab;if(!gr)return;if(gr.turn)return setX(tx(p.x));if(gr.x!=null||Math.hypot(p.x-gr.x0,p.y-gr.y0)>8){gr.x=p.x;gr.y=p.y;A.redraw()}}
function up(p){const gr=S.grab;S.grab=null;if(!gr||gr.turn)return;const{X,ox,oy}=geo();
 if(gr.x==null){if(S.side[gr.i])return place(gr.i,0);return place(gr.i,count(1)<=count(2)?1:2)}
 if(p.x>ox+X&&p.y<oy+X*1.2)return place(gr.i,1);if(p.y>oy+X&&p.x<ox+X*1.2)return place(gr.i,2);say('Drop the strip against the right side or the bottom of the x² square.');A.redraw()}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function demo(list,gap){const k=++tok;list.forEach((fn,j)=>setTimeout(()=>{if(k===tok)fn()},rm()?j*40+30:(j+1)*(gap||300)))}
const clear=()=>{tok++;Object.assign(S,init0())};
const steps=[
{h:'Split the strips',p:'x² + 6x is one x² tile and six x-strips. Drag each strip against the right side or the bottom of the square (tap a strip to send it to the shorter side) and try to build a square.',
 predict:{q:'Once the strips are split evenly, how many small unit squares are missing from the corner?',opts:['6','9','36'],ans:1},task:'Place all 6 strips',
 show:()=>{steps[0].go();demo([0,1,2,3,4,5].map(i=>()=>place(i,i%2?2:1)),350)},go:()=>{clear();say('Six x-strips are in the tray. Place them round the x² tile.');keys();S.want=ready(0,()=>S.won>=1,'Half of 6 is 3 on each side, so the corner is 3 × 3.')}},
{h:'Fill the corner',p:'x² + 6x + 2 has only 2 unit squares. Tap the corner to fill it: use your 2 first, then borrow the rest. Whatever you borrow you must take away again.',
 predict:{q:'x² + 6x + 2 = (x + 3)² + q. What is q?',opts:['+2','+11','−7'],ans:2},task:'Fill all 9 corner squares',
 show:()=>{steps[1].go();demo(Array(9).fill(fillOne),150)},go:()=>{clear();S.side=[1,2,1,2,1,2];say('The corner needs 9. You have 2. Tap it.');keys();S.want=ready(1,()=>S.won>=1,'Completing the square: add (b/2)², then take it away again.')}},
{h:'Halve b, keep the sign',p:'For x² + bx + c, p is always half of b, with the same sign. Then q is c − p². Pick p for each.',task:'Find p three times',
 show:()=>{steps[2].go();demo([0,1,2].map(()=>()=>pickP(0)),1100)},go:()=>{clear();say(`${HALF[0][0]}. What is p?`);keys();S.want=ready(2,()=>S.won>=3,'p = b/2, and q = c − p².')}},
{h:'The lowest point',p:'In (x − p)² + q the square is never negative. Drag along the curve, or use the arrows, and mark the lowest point.',
 predict:{q:'Can (x − 2)² + 3 ever be less than 3?',opts:['yes, if x is negative','no: a square is never negative'],ans:1},task:'Find 2 lowest points',
 show:()=>{steps[3].go();demo([()=>setX(2),checkLow,()=>{},()=>setX(-3),checkLow],500)},go:()=>{clear();say('y = (x − 2)² + 3. Find its lowest point.');keys();S.want=ready(3,()=>S.won>=2,'The turning point of (x + p)² + q is (−p, q).')}},
{h:'Solve it',p:'Completing the square solves equations that do not factorise. Pick the correct next line each time.',task:'Choose 3 lines',
 show:()=>{steps[4].go();demo([0,1,2].map(()=>()=>pickLine(0)),500)},go:()=>{clear();say('x² + 6x + 2 = 0. Choose the next line.');keys();S.want=ready(4,()=>S.won>=3,'Isolate the square, then take ± the square root.')}},
{h:'Challenge',p:'',go:()=>{clear();ask()}}];
const QS=[['Write x² + 8x + 5 in the form (x + p)² + q.',[['(x + 4)² − 11','ok'],['(x + 8)² + 5','dbl'],['(x + 4)² + 5','noq']]],
 ['What is the minimum value of x² − 4x + 7?',[['3','ok'],['7','c'],['−2','px']]],
 ['The turning point of y = (x + 5)² − 2 is',[['(−5, −2)','ok'],['(5, −2)','sgn'],['(−2, −5)','swap']]],
 ['Solve (x − 1)² = 9.',[['x = 4 or x = −2','ok'],['x = 4','one'],['x = 10','nosq']]],
 ['x² − 10x + 30 = (x − 5)² + q. What is q?',[['5','ok'],['−5','qsg'],['55','add']]]];
function why(t){let m='Halve b for p, then q = c − p².';
 if(t==='dbl')m='p is half of b: half of 8 is 4, giving (x + 4)². Then q = 5 − 16 = −11.';if(t==='noq')m='(x + 4)² = x² + 8x + 16, which adds 16. Take it away: 5 − 16 = −11.';
 if(t==='c')m='7 is the value at x = 0, not the lowest. (x − 2)² + 3 is smallest at x = 2, where it is 3.';if(t==='px')m='−2 mixes p and q. In (x − 2)² + 3 the minimum value is q = 3, reached at x = 2.';
 if(t==='sgn')m='(x + 5)² is 0 when x = −5, so the turning point is (−5, −2).';if(t==='swap')m='The x-coordinate comes from the bracket (x = −5) and the y-coordinate is q = −2.';
 if(t==='one')m='9 has two square roots: x − 1 = 3 or x − 1 = −3, so x = 4 or x = −2.';if(t==='nosq')m='Square-root both sides first: x − 1 = ±3, not x − 1 = 9.';
 if(t==='qsg')m='q = c − p² = 30 − 25 = 5, a positive 5.';if(t==='add')m='Subtract p², do not add it: 30 − 25 = 5.';return m}
function ask(){qk++;const[q,ops]=QS[qk%QS.length],r=qk%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>grade(t)});say('Challenge: '+q);A.redraw()}
let streak=0;
function grade(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Correct.':'✗ '+why(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;ctl.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});keys()}});
A.start()})})();
