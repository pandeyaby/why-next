/* Flagship: coordinates in all four quadrants (ages 10–11; NC England Y6 position and direction, CCSS 6.NS.C.6 and
   6.NS.C.8). Tap points into each quadrant, plot and read points with negative coordinates, find the missing corner
   of a rectangle and a square across the axes, and measure lines that cross zero. Every tap has a button twin. */
(()=>{
const K={ink:'#0f172a',dim:'#475569',axis:'#1e293b',grid:'#cbd5e1',card:'#ffffff',ok:'#166534',okBg:'#dcfce7',no:'#9f1239',tip:'#eef2ff',
 pt:'#1d4ed8',pt2:'#b91c1c',gold:'#a16207',goldSoft:'#fef3c7',tag:'#7c2d12',shade:['#dbeafe','#fde68a','#dcfce7','#fce7f3']};
const D=Q4ART,F=D.fmt;
VIS.reg('flagquad4',c=>{let A,X,pad,chal,qi=-1,tok=0;const G={after:()=>{}};
const z=n=>Math.round(n*(A.narrow?1:1.12));
const put=(s,x,y,n,col,al,wt)=>{X.font=`${wt||700} ${z(n)}px system-ui,sans-serif`;X.fillStyle=col||K.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y,A.W-16)};
function split(s,maxW,n){X.font=`700 ${z(n)}px system-ui,sans-serif`;const out=[];let cur='';
 for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(cur&&X.measureText(t).width>maxW){out.push(cur);cur=w}else cur=t}out.push(cur);return out}
function card(x,y,w,h,bg,edge,lw,r){A.paint.rrect(x,y,w,h,r==null?8:r);X.fillStyle=bg;X.fill();if(edge){X.lineWidth=lw||2;X.strokeStyle=edge;X.stroke()}}
function top(s,won){const L=split(s,A.W-40,13),lh=z(13)+4,h=Math.max(z(40),L.length*lh+14);card(10,8,A.W-20,h,won?K.okBg:K.tip,won?K.ok:K.axis);
 L.forEach((r,i)=>put(r,A.W/2,8+h/2+(i-(L.length-1)/2)*lh,13,won?K.ok:K.ink));return 8+h}
function bottom(){if(!G.msg)return;const L=split((G.bad?'✗ ':'✓ ')+G.msg,A.W-44,13),lh=z(13)+5,h=L.length*lh+10,y=A.H-h-8;
 card(10,y,A.W-20,h,K.card,G.bad?K.no:K.ok,3);L.forEach((r,i)=>put(r,A.W/2,y+5+lh*(i+.5),13,G.bad?K.no:K.ink))}
const speak=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const nope=s=>{G.bad=true;G.msg=s;A.sound.miss();refresh()};
const good=s=>{G.bad=false;G.msg=s;A.sound.pop();refresh()};
const within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const same=(a,b)=>a[0]===b[0]&&a[1]===b[1];
/* ---- the grid: x and y from −5 to 5 ---- */
function grid(t){const room=A.H-t-z(A.step===2||A.step===4?118:64),S=Math.min(A.W-40,room),u=S/10,ox=(A.W-S)/2,oy=t+z(10);
 G.g={ox,oy,u,S};const px=x=>ox+(x+5)*u,py=y=>oy+(5-y)*u;G.px=px;G.py=py;
 if(A.step===0){[[1,1],[-1,1],[-1,-1],[1,-1]].forEach(([sx,sy],i)=>{X.fillStyle=A.alpha(K.shade[i],.7);X.fillRect(sx>0?px(0):ox,sy>0?oy:py(0),S/2,S/2)})}
 X.strokeStyle=K.grid;X.lineWidth=1;for(let i=-5;i<=5;i++){X.beginPath();X.moveTo(px(i),oy);X.lineTo(px(i),oy+S);X.stroke();X.beginPath();X.moveTo(ox,py(i));X.lineTo(ox+S,py(i));X.stroke()}
 X.strokeStyle=K.axis;X.lineWidth=2.5;X.beginPath();X.moveTo(ox-6,py(0));X.lineTo(ox+S+6,py(0));X.moveTo(px(0),oy-6);X.lineTo(px(0),oy+S+6);X.stroke();
 for(let i=-5;i<=5;i++){if(!i)continue;const s=(i<0?'−':'')+Math.abs(i);put(s,px(i),py(0)+z(10),10,K.dim,'center',600);put(s,px(0)-z(9),py(i),10,K.dim,'center',600)}
 put('x',ox+S+z(12),py(0),12,K.axis);put('y',px(0),oy-z(2)<12?12:oy-z(4),12,K.axis);put('0',px(0)-z(8),py(0)+z(10),10,K.dim)}
function dot(p,col,lab,r){const x=G.px(p[0]),y=G.py(p[1]);X.fillStyle=col;X.beginPath();X.arc(x,y,r||z(7),0,7);X.fill();X.strokeStyle='#fff';X.lineWidth=2;X.stroke();
 if(lab){const left=x>A.W*.62;X.font=`700 ${z(12)}px system-ui,sans-serif`;const w=X.measureText(lab).width+10,bx=left?x-w-8:x+8,by=y-z(22);card(bx,by,w,z(18),K.card,col,1.5,6);put(lab,bx+w/2,by+z(9),12,col)}}
function snap(p){const g=G.g;if(!g)return null;const x=Math.round((p.x-g.ox)/g.u)-5,y=5-Math.round((p.y-g.oy)/g.u);
 if(x<-5||x>5||y<-5||y>5||p.x<g.ox-g.u/2||p.x>g.ox+g.S+g.u/2||p.y<g.oy-g.u/2||p.y>g.oy+g.S+g.u/2)return null;return[x,y]}
/* ---- step 0: put a point in every quadrant ---- */
function tapExplore(p){const where=D.quad(p);G.pts.push(p);if(G.pts.length>6)G.pts.shift();A.sound.tick();
 if(/top|bottom/.test(where))G.seen.add(where);const n=G.seen.size;
 if(n===4&&!G.won){G.won=true;return good(`${F(p)} is ${where}. All four quadrants: the signs of x and y tell you which one.`)}
 G.bad=false;G.msg=`${F(p)}: ${p[0]<0?Math.abs(p[0])+' left':p[0]?p[0]+' right':'no move across'}, ${p[1]<0?Math.abs(p[1])+' down':p[1]?p[1]+' up':'no move up'}. ${/top|bottom/.test(where)?'Quadrant: '+where:'This is '+where+', not in a quadrant'}. Quadrants found: ${n} of 4.`;refresh()}
/* ---- step 1: plot the target ---- */
function tapPlot(p){if(G.won)return;const t=D.PLOT[G.si];
 if(!same(p,t)){let m='Start at (0, 0). Go across first (the x number), then up or down (the y number).';
  if(same(p,[t[1],t[0]]))m=`That is ${F(p)}: the numbers are swapped. Go across first: x = ${F(t).split(',')[0].slice(1)}, then up or down.`;
  else if(same(p,[-t[0],t[1]])||same(p,[t[0],-t[1]])||same(p,[-t[0],-t[1]]))m=`That is ${F(p)}. Check the signs: negative x goes left, negative y goes down.`;
  return nope(m)}
 G.pts.push(p);if(G.si===D.PLOT.length-1){G.won=true;return good(`${F(p)} plotted. Across first, then up or down, and a minus sign means left or down.`)}good(`${F(p)} plotted. Next one.`);G.si++}
/* ---- steps 2 and 4: tap the right answer ---- */
const R=()=>G.list[G.si];
const order=()=>{const n=R().opts.length,r=(G.si+1)%n;return[...Array(n)].map((_,j)=>(j+r)%n)};
function pick(i){if(G.won)return;const Q=R(),[lab,tag]=Q.opts[i];if(tag!=='ok')return nope(why(tag));G.done.push(lab);
 if(G.si===G.list.length-1){G.won=true;return good(`${lab}. ${G.end}`)}good(`${lab}. Next one.`);G.si++}
function tiles(y){const Q=R(),n=Q.opts.length,gap=8,w=(A.W-28-gap*(n-1))/n,h=z(40);G.tileHit=order().map((i,j)=>{const x=14+j*(w+gap);card(x,y,w,h,K.goldSoft,K.gold,2,12);put(Q.opts[i][0],x+w/2,y+h/2,15,K.tag);return{x,y,w,h,i}})}
/* ---- step 3: missing corner ---- */
function tapShape(p){if(G.won)return;const S=D.SHAPE[G.si];
 if(!same(p,S.miss)){const [a,b,c2]=S.given;return nope(`${F(p)} would not make a ${S.name}. Opposite sides are parallel: the missing corner is straight below ${F(a)} (same x) and level with ${F(c2)} (same y).`)}
 G.done.push(F(p));if(G.si===D.SHAPE.length-1){G.won=true;return good(`${F(p)} completes the ${S.name}. It shares its x with one corner and its y with another.`)}good(`${F(p)} completes the ${S.name}. Next one.`);G.si++}
function drawShape(){const S=D.SHAPE[G.si],P=S.given.concat(G.won?[S.miss]:[]);X.strokeStyle=K.pt;X.lineWidth=3;X.beginPath();P.forEach((p,i)=>i?X.lineTo(G.px(p[0]),G.py(p[1])):X.moveTo(G.px(p[0]),G.py(p[1])));if(G.won)X.closePath();X.stroke();
 S.given.forEach(p=>dot(p,K.pt,F(p)));if(G.won)dot(S.miss,K.ok,F(S.miss))}
/* ---- input, drawing, controls ---- */
const kind=()=>['explore','plot','read','shape','dist','quiz'][A.step];
function down(p){const k=kind();
 if(k==='read'||k==='dist'){const r=(G.tileHit||[]).find(r=>within(p,r));if(r){pick(r.i);refresh();return true}return false}
 const q=snap(p);if(!q)return false;if(k==='explore')tapExplore(q);if(k==='plot')tapPlot(q);if(k==='shape')tapShape(q);refresh();return true}
function draw(){X.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);X.fillRect(0,0,A.W,A.H);if(A.col.dark){X.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);X.fill()}
 const k=kind();let t;
 if(k==='explore'){t=top(G.won?'Top right (+, +), top left (−, +), bottom left (−, −), bottom right (+, −).':'Tap any point on the grid. Put a point in each of the four quadrants.',G.won);grid(t);G.pts.forEach((p,i)=>dot(p,K.pt,i===G.pts.length-1?F(p):null))}
 if(k==='plot'){const tg=D.PLOT[Math.min(G.si,D.PLOT.length-1)];t=top(G.won?'Across first (x), then up or down (y). Minus means left or down.':`Plot ${F(tg)}. Tap the point on the grid.`,G.won);grid(t);G.pts.forEach(p=>dot(p,K.pt,F(p)))}
 if(k==='read'){const Q=R();t=top(G.won?'Read across first: how far left or right. Then up or down.':'What are the coordinates of the red point? Tap the answer.',G.won);grid(t);dot(Q.p,K.pt2,null,z(9));tiles(G.g.oy+G.g.S+z(18))}
 if(k==='shape'){const S=D.SHAPE[G.si];t=top(G.won?'The missing corner shares its x with one corner and its y with another.':`Three corners of a ${S.name}. Tap the fourth corner.`,G.won);grid(t);drawShape()}
 if(k==='dist'){const Q=R();t=top(G.won?'Count the squares from end to end. Across zero, add the two distances.':`How long is the line from ${F(Q.a)} to ${F(Q.b)}? Count the squares.`,G.won);grid(t);
  X.strokeStyle=K.pt2;X.lineWidth=4;X.beginPath();X.moveTo(G.px(Q.a[0]),G.py(Q.a[1]));X.lineTo(G.px(Q.b[0]),G.py(Q.b[1]));X.stroke();dot(Q.a,K.pt2,F(Q.a));dot(Q.b,K.pt2,F(Q.b));tiles(G.g.oy+G.g.S+z(18))}
 if(k==='quiz'){t=top('Signs give the quadrant. Across first, then up or down. Count squares across zero.');grid(t);dot([-3,2],K.pt,'(−3, 2)');dot([4,-1],K.pt,'(4, −1)');dot([-2,-4],K.pt,'(−2, −4)')}
 bottom();A.fx.draw(X)}
function refresh(){const k=kind();let d='Challenge.';
 if(k==='explore')d=`Grid from −5 to 5. Points: ${G.pts.map(F).join(', ')||'none'}. Quadrants found: ${G.seen.size} of 4.`;
 if(k==='plot')d=`Target ${F(D.PLOT[Math.min(G.si,D.PLOT.length-1)])}. Plotted: ${G.pts.map(F).join(', ')||'none'}.`;
 if(k==='read')d=`A red point is ${R().p[0]<0?Math.abs(R().p[0])+' left':R().p[0]+' right'} of the y-axis and ${R().p[1]<0?Math.abs(R().p[1])+' below':R().p[1]+' above'} the x-axis. Choices: ${R().opts.map(o=>o[0]).join(', ')}.`;
 if(k==='shape'){const S=D.SHAPE[G.si];d=`${S.name} corners ${S.given.map(F).join(', ')}. Done: ${G.done.join(', ')||'none'}.`}
 if(k==='dist')d=`Line from ${F(R().a)} to ${F(R().b)}. Choices: ${R().opts.map(o=>o[0]).join(', ')}. Done: ${G.done.join(', ')||'none'}.`;
 speak((G.msg?G.msg+' ':'')+d);buttons();G.after()}
function buttons(){if(!pad)return;pad.innerHTML='';const k=kind(),b=(label,fn,aria)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':aria||null},pad,label).onclick=fn};
 if(k==='explore'&&!G.won)[[3,2],[-3,2],[-3,-2],[3,-2],[0,4]].forEach(p=>b(F(p),()=>{tapExplore(p);refresh()},`Put a point at ${F(p)}`));
 if(k==='plot'&&!G.won){const t=D.PLOT[G.si];[t,[t[1],t[0]],[-t[0],t[1]]].forEach(p=>b(F(p),()=>{tapPlot(p);refresh()},`Plot the point ${F(p)}`))}
 if((k==='read'||k==='dist')&&!G.won)order().forEach(i=>{const lab=R().opts[i][0];b(lab,()=>{pick(i);refresh()},`Answer ${lab}`)});
 if(k==='shape'&&!G.won){const S=D.SHAPE[G.si];[S.miss,[S.miss[1],S.miss[0]],[-S.miss[0],S.miss[1]]].sort((a,b)=>a[0]-b[0]).forEach(p=>b(F(p),()=>{tapShape(p);refresh()},`Put the fourth corner at ${F(p)}`))}
 A.redraw()}
const settle=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const replay=(fns,ms)=>{const id=++tok;fns.forEach((f,j)=>setTimeout(()=>{if(id===tok){f();refresh()}},(j+1)*(A.reduced()?30:ms)))};
function fresh(list,end){tok++;Object.assign(G,{after:()=>{},won:false,msg:'',bad:false,list:list||[],si:0,done:[],pts:[],seen:new Set(),end:end||''})}
const steps=[
{h:'Four quadrants',p:'The x-axis and y-axis cross at the origin, (0, 0), and cut the grid into four quadrants. Numbers left of zero and below zero are negative.',
predict:{q:'Where is the point (−2, 3)?',opts:['2 right and 3 up','2 left and 3 up','3 left and 2 up'],ans:1},
task:'Put a point in all four quadrants',show:()=>{steps[0].go();replay([[3,2],[-3,2],[-3,-2],[3,-2]].map(p=>()=>tapExplore(p)),700)},go:()=>{fresh();refresh();G.after=settle(0,()=>G.won,'All four quadrants.')}},
{h:'Plot points',p:'Start at the origin. The first number says how far across: right if positive, left if negative. The second says up or down.',
predict:{q:'To plot (4, −1), which way do you move first?',opts:['1 down','4 right','4 left'],ans:1},
task:'Plot all three points',show:()=>{steps[1].go();replay(D.PLOT.map(p=>()=>tapPlot(p)),750)},go:()=>{fresh();refresh();G.after=settle(1,()=>G.won,'(−3, 2), (4, −1) and (−2, −4).')}},
{h:'Read points',p:'To read a point, look down or up to the x-axis first for x, then across to the y-axis for y. Keep the minus signs.',
predict:{q:'Which point is further left: (−4, 1) or (−1, 4)?',opts:['(−1, 4)','(−4, 1)','They are the same'],ans:1},
task:'Read all three red points',show:()=>{steps[2].go();replay(D.READ.map(()=>()=>pick(0)),750)},go:()=>{fresh(D.READ,'That is 1 left and 3 down.');refresh();G.after=settle(2,()=>G.won,'(−4, 3), (2, −5) and (−1, −3).')}},
{h:'Missing corner',p:'A rectangle has straight sides that meet at right angles, so each corner shares its x-coordinate with one corner and its y-coordinate with another.',
predict:{q:'Three corners of a rectangle are (−3, 2), (2, 2) and (2, −1). Where is the fourth?',opts:['(3, −1)','(−1, −3)','(−3, −1)'],ans:2},
task:'Complete the rectangle and the square',show:()=>{steps[3].go();replay(D.SHAPE.map(S=>()=>tapShape(S.miss)),800)},go:()=>{fresh();refresh();G.after=settle(3,()=>G.won,'(−3, −1) and (−2, −2).')}},
{h:'Lengths across zero',p:'For a line that crosses an axis, count the squares on each side of zero and add them: from −3 to 4 is 3 + 4 = 7.',
predict:{q:'How long is the line from (−3, 1) to (4, 1)?',opts:['1','7','4'],ans:1},
task:'Measure all three lines',show:()=>{steps[4].go();replay(D.DIST.map(()=>()=>pick(0)),750)},go:()=>{fresh(D.DIST,'From −5 to −1 is 4 squares.');refresh();G.after=settle(4,()=>G.won,'7, 5 and 4 squares.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>G.after()});
function why(tag){let m=D.WHY[tag]||'Start at (0, 0): across first for x, then up or down for y. Minus means left or down.';
 if(tag==='swap')m='The numbers are the wrong way round. The first number is x, across; the second is y, up or down.';
 if(tag==='subNeg')m='Subtracting the numbers ignores the minus sign. Count the squares: from −3 to 0 is 3, then 0 to 4 is 4, so 7.';
 if(tag==='signFlip')m='A minus sign changes the direction: negative x goes left and negative y goes down.';
 return m}
function ask(){qi++;const [q,ans,wrongs]=D.bank[qi%D.bank.length],all=[[ans,'ok']].concat(wrongs),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>mark(tag,ans)});speak('Challenge: '+q);A.redraw()}
let run=0;
function mark(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=tag==='ok';
 if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+run+'.':'✗ '+why(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.8,tall:1.45,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;buttons()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Coordinate grid lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down})}}).start()})})();
