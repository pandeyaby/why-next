/* Flagship: mental multiplication and division (ages 8–9). Build rows of tens counters to turn 4 × 6 into 40 × 6, sort
   × 0, × 1 and ÷ 1 cards, drag the easy pair of three numbers together first, deal tens counters into bowls to divide
   240 by 6, judge three children, then a challenge. Rounds and screen-reader text are in mentx_art.js. */
(()=>{
const {TENS,CARDS,BINS,CARDW,TRI,SHARE,KIDS,QZ,WHY,H}=MXART;
const Q={ink:'#111827',sub:'#374151',bg:'#fffbeb',frame:'#1f2937',good:'#166534',goodBg:'#dcfce7',bad:'#9f1239',tip:'#fef3c7',chip:'#fde68a',chipEdge:'#92400e',hot:'#c2410c',bowl:'#e0f2fe',bowlEdge:'#075985',card:'#ffffff',sel:'#7c3aed'};
VIS.reg('flagmentx',c=>{let A,X,pad,box,qn=-1,gen=0;const G={after:()=>{}};
const v=n=>Math.round(n*(A.narrow?1:1.12));
const tell=m=>{c.say(m);A.cv.setAttribute('aria-label',m)};
function put(s,x,y,n,col,w,al){X.font=`${w||700} ${v(n)}px system-ui,sans-serif`;X.fillStyle=col||Q.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y)}
function lines(s,w,n){X.font=`700 ${v(n)}px system-ui,sans-serif`;const o=[];let l='';for(const t of String(s).split(' ')){const nx=l?l+' '+t:t;if(l&&X.measureText(nx).width>w){o.push(l);l=t}else l=nx}o.push(l);return o}
function box2(x,y,w,h,f,s,lw,r){A.paint.rrect(x,y,w,h,r||10);X.fillStyle=f;X.fill();if(s){X.lineWidth=lw||2;X.strokeStyle=s;X.stroke()}}
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const mode=()=>['tens','zero','pair','share','kids','quiz'][A.step];
function head(s,ok){const R=lines(s,A.W-44,14),lh=v(14)+4,h=Math.max(v(36),R.length*lh+14);box2(12,10,A.W-24,h,ok?Q.goodBg:Q.tip,ok?Q.good:Q.frame);R.forEach((r,i)=>put(r,A.W/2,10+h/2+(i-(R.length-1)/2)*lh,14,ok?Q.good:Q.ink));return 10+h}
function note(){if(!G.msg)return;const R=lines((G.bad?'✗ ':'✓ ')+G.msg,A.W-48,13),lh=v(13)+5,h=R.length*lh+12,y=A.H-h-10;box2(12,y,A.W-24,h,'#ffffff',G.bad?Q.bad:Q.good,3);R.forEach((r,i)=>put(r,A.W/2,y+6+lh*(i+.5),13,G.bad?Q.bad:Q.ink))}
const oops=m=>{G.bad=true;G.msg=m;A.sound.miss();sync()};
const yes=m=>{G.bad=false;G.msg=m;A.sound.pop()};
/* a tens counter: a little rod with "10" on it */
function chip(x,y,w,h,txt){box2(x-w/2,y-h/2,w,h,Q.chip,Q.chipEdge,1.5,4);put(txt||'10',x,y+.5,Math.min(12,h/1.25),Q.ink,900)}
/* answer tiles along the bottom */
function tiles(vals,b0,unit){const w=(A.W-v(48))/3;return vals.map((n,i)=>{const r={x:v(12)+i*(w+v(12)),y:b0-v(56),w,h:v(50),n};box2(r.x,r.y,w,r.h,'#ffffff',Q.frame,2.5);put(n+(unit||''),r.x+w/2,r.y+r.h/2,18,Q.ink,900);return r})}
const turn=L=>{const r=G.k%3;return L.slice(r).concat(L.slice(0,r))};
/* step: tens times a number */
function drawTens(t0,b0){const [a,n]=TENS[Math.min(G.k,2)],ask=G.rows===n&&!G.won,bt=b0-(ask?v(64):0);
 put(`${a*10} × ${n}`+(G.won?'':` · round ${G.k+1} of 3`),A.W/2,t0+v(12),15,Q.ink,900);put(`${G.rows} row${G.rows>1?'s':''} × ${a} tens = ${G.rows*a} tens`,A.W/2,t0+v(32),13,Q.sub,800);
 const top=t0+v(46),cw=Math.min((A.W-v(130))/6,v(58)),ch=(bt-top-v(4))/8,x0=(A.W-cw*a)/2;G.geo={top,ch};
 for(let i=0;i<G.rows;i++){const y=top+ch*(i+.5);put(i+1,x0-v(18),y,11,Q.sub,800);for(let j=0;j<a;j++)chip(x0+cw*(j+.5),y,cw*.86,Math.min(ch*.8,v(26)))}
 const ky=top+ch*G.rows,kx=x0+cw*a+v(26);X.strokeStyle=Q.hot;X.lineWidth=2;X.setLineDash([4,4]);X.beginPath();X.moveTo(x0,ky);X.lineTo(kx,ky);X.stroke();X.setLineDash([]);
 X.fillStyle=Q.hot;X.beginPath();X.arc(kx,ky,v(13),0,7);X.fill();X.strokeStyle='#ffffff';X.lineWidth=3;X.stroke();G.knob={x:kx-v(28),y:ky-v(28),w:v(56),h:v(56)};
 G.tiles=ask?tiles(turn([a*n*10,a*n,a*n*100]),b0):[]}
function setRows(r,check){if(G.won)return;const [a,n]=TENS[G.k];G.rows=Math.max(1,Math.min(8,Math.round(r)));if(!check)return A.redraw();
 if(G.rows===n){A.sound.tick();yes(`${n} rows of ${a} tens. ${a} × ${n} = ${a*n}, so that is ${a*n} tens. Now pick the answer.`)}else{G.msg='';}sync()}
function pickTens(x){const [a,n]=TENS[G.k];if(G.won||G.rows!==n)return;
 if(x===a*n)return oops(`${x} counts the counters, but each counter is worth 10. ${a*n} tens = ${a*n*10}.`);
 if(x===a*n*100)return oops(`${x} is too big. Only ${a*10} has a ten in it, so ${a*10} × ${n} is ${a} × ${n} = ${a*n}, ten times bigger: ${a*n*10}.`);
 A.sound.tick();G.k++;if(G.k>=3){G.won=true;G.msg='40 × 6 = 240, 30 × 7 = 210, 60 × 5 = 300: the times-table fact, then ten times bigger.';return sync()}
 yes(`Yes, ${a*10} × ${n} = ${a*n*10}. Next one.`);G.rows=1;sync()}
/* step: × 0, × 1 and ÷ 1 */
function drawZero(t0,b0){const cols=3,w=(A.W-v(48))/cols,h=v(46),bh=Math.min(v(150),(b0-t0)*.48),by=b0-bh-v(4),bw=(A.W-v(36))/2;
 G.bins=BINS.map((b,i)=>{const r={x:v(12)+i*(bw+v(12)),y:by,w:bw,h:bh,i};box2(r.x,r.y,bw,bh,G.sel!=null?'#f5f3ff':'#f8fafc',G.sel!=null?Q.sel:Q.frame,2.5);put(b,r.x+bw/2,r.y+v(16),15,Q.ink,900);
  CARDS.forEach((cd,k)=>{if(G.placed[k]!==i)return;const j=Object.keys(G.placed).filter(q=>G.placed[q]===i).indexOf(String(k));put(`${cd[0]} = ${cd[2]}`,r.x+bw/2,r.y+v(40)+j*v(22),13,Q.good,900)});return r});
 G.cards=CARDS.map((cd,k)=>{if(G.placed[k]!=null)return null;const r={x:v(12)+(k%cols)*(w+v(12)),y:t0+v(10)+Math.floor(k/cols)*(h+v(10)),w,h,k};
  if(G.drag===2&&G.sel===k&&G.dp){r.x=G.dp.x-w/2;r.y=G.dp.y-h/2}box2(r.x,r.y,w,h,Q.card,G.sel===k?Q.sel:Q.frame,G.sel===k?4:2);put(cd[0],r.x+w/2,r.y+h/2,19,Q.ink,900);return r})}
function place(k,b){if(G.won||k==null||G.placed[k]!=null)return;const cd=CARDS[k];G.sel=null;if(b!==cd[1])return oops(CARDW[cd[0]]);
 G.placed[k]=b;A.sound.tick();const left=CARDS.filter((_,i)=>G.placed[i]==null).length;if(!left){G.won=true;G.msg='× 0 gives 0. × 1 and ÷ 1 keep the number the same.';return sync()}
 yes(`${cd[0]} = ${cd[2]}. ${left} left.`);sync()}
/* step: three numbers, easy pair first */
function drawPair(t0,b0){const t=TRI[Math.min(G.k,2)],w=Math.min((A.W-v(60))/3,v(120)),h=v(84),y=t0+(b0-t0)/2-h/2-v(10),gap=(A.W-3*w)/4;
 put(t.join(' × ')+' = ?'+(G.won?'':` · round ${G.k+1} of 3`),A.W/2,t0+v(14),16,Q.ink,900);
 G.cards=t.map((n,i)=>{const r={x:gap+i*(w+gap),y,w,h,k:i};if(G.drag===3&&G.from===i&&G.dp&&G.moved){r.x=G.dp.x-w/2;r.y=G.dp.y-h/2}box2(r.x,r.y,w,h,Q.card,G.sel===i?Q.sel:Q.frame,G.sel===i?4:2.5,14);put(n,r.x+w/2,r.y+h/2,32,Q.ink,900);return r});
 put('Hint: look for two numbers that make 10 or 20.',A.W/2,y+h+v(30),12,Q.sub,700)}
function join(i,j){if(G.won||i===j||i==null||j==null)return;const t=TRI[G.k],z=t.find((_,q)=>q!==i&&q!==j),p=t[i]*t[j],all=p*z;G.sel=null;
 if(p%10)return oops(`${t[i]} × ${t[j]} = ${p}, then ${p} × ${z} = ${all}. Right answer, but the hard way. Find the pair that makes 10 or 20.`);
 A.sound.tick();G.k++;const m=`${t[i]} × ${t[j]} = ${p}, then ${p} × ${z} = ${all}. Easy!`;if(G.k>=3){G.won=true;G.msg=m+' Any order gives the same answer, so pick the easy pair.';return sync()}yes(m);sync()}
/* step: divide with tens */
function drawShare(t0,b0){const [t,n]=SHARE[Math.min(G.k,1)],e=G.each,done=!G.left&&!G.won,bt=b0-(done?v(64):0);
 put(`${t*10} ÷ ${n} · ${t*10} is ${t} tens`,A.W/2,t0+v(12),15,Q.ink,900);
 const pc=Math.min(12,Math.max(7,Math.floor((A.W-v(40))/v(30)))),cw=Math.min(v(30),(A.W-v(40))/pc),rows=Math.ceil(t/pc),py=t0+v(30),ph=rows*v(20)+v(12);
 G.pile={x:v(12),y:py,w:A.W-v(24),h:ph};box2(v(12),py,A.W-v(24),ph,G.left?'#fff7ed':'#f8fafc',G.left?Q.hot:Q.frame,G.left?2.5:1.5);
 for(let q=0;q<G.left;q++){const x=(A.W-pc*cw)/2+cw*(q%pc+.5),y=py+v(16)+Math.floor(q/pc)*v(20);chip(x,y,cw*.88,v(17))}
 if(!G.left)put('The pile is empty.',A.W/2,py+ph/2,13,Q.sub,800);
 const by=py+ph+v(14),bw=(A.W-v(24))/n,bh=bt-by-v(4);
 for(let g=0;g<n;g++){const x=v(12)+g*bw;box2(x+v(3),by,bw-v(6),bh,Q.bowl,Q.bowlEdge,2,12);for(let q=0;q<e;q++)chip(x+bw/2,by+v(16)+q*Math.min(v(20),(bh-v(36))/Math.max(e,1)),Math.min(bw-v(14),v(34)),v(16));
  put(e+(e===1?' ten':' tens'),x+bw/2,by+bh-v(12),A.narrow&&n>6?10:12,Q.bowlEdge,900)}
 G.tiles=done?tiles(turn([e,e*10,e*100]),b0):[]}
function deal(){if(G.won)return;const [,n]=SHARE[G.k];if(G.left<n)return;G.left-=n;G.each++;A.sound.tick();
 if(!G.left){yes(`Each bowl has ${G.each} tens. Now pick the answer.`)}else G.msg='';sync()}
function pickShare(x){const [t,n]=SHARE[G.k],e=t/n;if(G.won||G.left)return;
 if(x===e)return oops(`${x} counts the counters in one bowl, but each counter is 10. ${e} tens = ${e*10}.`);
 if(x===e*100)return oops(`${x} is too big: ${x} × ${n} = ${x*n}, not ${t*10}. Each bowl has ${e} tens = ${e*10}.`);
 A.sound.tick();G.k++;if(G.k>=2){G.won=true;G.msg='240 ÷ 6 = 40 and 350 ÷ 7 = 50: share the tens, then say them as tens.';return sync()}
 yes(`Yes, ${t*10} ÷ ${n} = ${e*10}. Next one.`);G.left=SHARE[1][0];G.each=0;sync()}
/* step: who is right */
function drawKids(t0,b0){const [stem,opts]=KIDS[Math.min(G.k,2)];put(stem,A.W/2,t0+v(16),17,Q.ink,900);const y0=t0+v(34),h=Math.min(v(70),(b0-y0)/3-v(6));
 G.opts=opts.map((o,i)=>{const r={x:v(16),y:y0+i*(h+v(6)),w:A.W-v(32),h,i};box2(r.x,r.y,r.w,h,'#ffffff',Q.frame,2);X.fillStyle=['#c7d2fe','#fed7aa','#a7f3d0'][i];X.fillRect(r.x+v(10),r.y+h/2-v(14),v(30),v(28));put(o[0],r.x+v(25),r.y+h/2,11,Q.ink,900);
  lines(o[1],r.w-v(70),14).forEach((ln,j,L)=>put(ln,r.x+v(52),r.y+h/2+(j-(L.length-1)/2)*v(17),14,Q.ink,700,'left'));return r})}
function judge(i){if(G.won)return;const o=KIDS[G.k][1][i];if(o[2])return oops(`${o[0]} is not right. ${o[2]}`);yes(`${o[0]} is right.`);G.k++;if(G.k>=3){G.won=true;G.msg='Tens facts, × 0, and the easy pair first: all checked.'}sync()}
function draw(){X.fillStyle=A.col.dark?'#1f2937':Q.bg;X.fillRect(0,0,A.W,A.H);X.fillStyle=Q.bg;A.paint.rrect(5,5,A.W-10,A.H-10,16);X.fill();
 const g=mode(),y=head(G.won?H[g][1]:H[g][0],G.won),b=A.H-(G.msg?lines('✓ '+G.msg,A.W-48,13).length*(v(13)+5)+v(26):v(12));
 if(g==='tens')drawTens(y,b);if(g==='zero')drawZero(y,b);if(g==='pair')drawPair(y,b);if(g==='share')drawShare(y,b);if(g==='kids')drawKids(y+v(4),b);
 if(g==='quiz'){const cw=v(40),x0=(A.W-cw*4)/2;for(let i=0;i<6;i++)for(let j=0;j<4;j++)chip(x0+cw*(j+.5),y+v(24)+i*v(26),cw*.86,v(20));put('6 rows of 4 tens = 24 tens = 240',A.W/2,y+v(24)+6*v(26),14,Q.ink,900)}note();A.fx.draw(X)}
const at=(L,p)=>(L||[]).find(r=>r&&inside(p,r));
function down(p){const g=mode();if(G.won&&g!=='quiz')return false;
 if(g==='tens'){const t=at(G.tiles,p);if(t){pickTens(t.n);return true}if(inside(p,G.knob)){G.drag=1;return true}}
 if(g==='zero'){const r=at(G.cards,p);if(r){G.sel=r.k;G.drag=2;G.dp=p;G.moved=false;A.redraw();return true}const b=at(G.bins,p);if(b&&G.sel!=null){place(G.sel,b.i);return true}}
 if(g==='pair'){const r=at(G.cards,p);if(r){G.drag=3;G.from=r.k;G.dp=p;G.p0=p;G.moved=false;return true}}
 if(g==='share'){const t=at(G.tiles,p);if(t){pickShare(t.n);return true}if(inside(p,G.pile)&&G.left){deal();return true}}
 if(g==='kids'){const r=at(G.opts,p);if(r){judge(r.i);return true}}
 return false}
function move(p){if(!G.drag)return;if(G.drag===1)return setRows((p.y-G.geo.top)/G.geo.ch);G.dp=p;if(G.drag===3&&Math.hypot(p.x-G.p0.x,p.y-G.p0.y)>v(8))G.moved=true;if(G.drag===2)G.moved=true;A.redraw()}
function up(p){const d=G.drag;if(!d)return;G.drag=0;if(d===1)return setRows(G.rows,1);
 if(d===2){const b=p&&at(G.bins,p);if(G.moved&&b)place(G.sel,b.i);else{G.dp=null;sync()}return}
 if(d===3){const i=G.from;if(G.moved){const r=p&&G.cards.find(q=>q.k!==i&&inside(p,q));G.moved=false;if(r)return join(i,r.k);return sync()}
  if(G.sel==null||G.sel===i){G.sel=G.sel===i?null:i;A.sound.tick();return sync()}join(G.sel,i)}}
function sync(){tell((G.msg?G.msg+' ':'')+MXART.say(mode(),G));controls();G.after()}
function controls(){if(!pad)return;pad.innerHTML='';const g=mode(),b=(s,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},pad,s).onclick=()=>{fn();sync()}};
 if(!G.won){if(g==='tens'){b('Add a row',()=>setRows(G.rows+1,1));b('Take away a row',()=>setRows(G.rows-1,1));(G.tiles||[]).forEach(t=>b(`Answer ${t.n}`,()=>pickTens(t.n)))}
  if(g==='zero'){if(G.sel==null)CARDS.forEach((cd,k)=>{if(G.placed[k]==null)b(`Pick ${cd[0]}`,()=>{G.sel=k})});else BINS.forEach((bn,i)=>b(`Put ${CARDS[G.sel][0]} in "${bn}"`,()=>place(G.sel,i)))}
  if(g==='pair'){const t=TRI[G.k];[[0,1],[0,2],[1,2]].forEach(([i,j])=>b(`Do ${t[i]} × ${t[j]} first`,()=>join(i,j)))}
  if(g==='share'){if(G.left)b('Give each bowl one ten',deal);(G.tiles||[]).forEach(t=>b(`Answer ${t.n}`,()=>pickShare(t.n)))}
  if(g==='kids')KIDS[G.k][1].forEach((o,i)=>b(o[0]+' is right',()=>judge(i)))}
 A.redraw()}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const id=++gen;fns.forEach((f,j)=>setTimeout(()=>{if(id===gen){f();sync()}},(j+1)*(A.reduced()?50:ms)))};
function clear(){gen++;Object.assign(G,{after:()=>{},won:false,msg:'',bad:false,drag:0,k:0,rows:1,placed:{},sel:null,dp:null,moved:false,from:null,left:SHARE[0][0],each:0,tiles:[]})}
const easy=t=>{for(const [i,j] of [[0,1],[0,2],[1,2]])if(t[i]*t[j]%10===0)return [i,j]};
const steps=[
{h:'Tens times a number',p:'40 is 4 tens. So 40 × 6 is 6 rows of 4 tens. Use the fact you know, 4 × 6, then make it ten times bigger.',
predict:{q:'4 × 6 = 24. So what is 40 × 6?',opts:['24','240','2400'],ans:1},
task:'Answer 3 tens facts',show:()=>{steps[0].go();play(TENS.flatMap(([a,n])=>[()=>setRows(n,1),()=>pickTens(a*n*10)]),300)},go:()=>{clear();sync();G.after=ready(0,()=>G.won,'Tens facts done.')}},
{h:'Times 0 and times 1',p:'0 groups, or groups of 0, make 0. Times 1 and divide by 1 keep the number the same.',
predict:{q:'What is 8 × 0?',opts:['8','0','80'],ans:1},
task:'Sort all 6 cards',show:()=>{steps[1].go();play(CARDS.map((cd,k)=>()=>place(k,cd[1])),300)},go:()=>{clear();sync();G.after=ready(1,()=>G.won,'All sorted.')}},
{h:'Three numbers',p:'You can multiply three numbers in any order. Do the easy pair first: a pair that makes 10 or 20.',
predict:{q:'Does the order change the answer to 2 × 7 × 5?',opts:['Yes, it changes','No, it is 70 any way','Only if 7 goes first'],ans:1},
task:'Find the easy pair 3 times',show:()=>{steps[2].go();play(TRI.map(()=>()=>{const [i,j]=easy(TRI[G.k]);join(i,j)}),400)},go:()=>{clear();sync();G.after=ready(2,()=>G.won,'Easy pairs.')}},
{h:'Divide with tens',p:'240 is 24 tens. Share the 24 tens into 6 bowls, one round at a time.',
predict:{q:'24 ÷ 6 = 4. So what is 240 ÷ 6?',opts:['4','40','400'],ans:1},
task:'Share 2 numbers fairly',show:()=>{steps[3].go();play(SHARE.flatMap(([t,n])=>Array.from({length:t/n},()=>deal).concat([()=>pickShare(t/n*10)])),250)},go:()=>{clear();sync();G.after=ready(3,()=>G.won,'Shared fairly.')}},
{h:'Check the facts',p:'Three children work out answers in their heads. Only one is right each time.',
task:'Find who is right 3 times',show:()=>{steps[4].go();play(KIDS.map(()=>()=>judge(KIDS[G.k][1].findIndex(o=>!o[2]))),450)},go:()=>{clear();sync();G.after=ready(4,()=>G.won,'Facts checked.')}},
{h:'Challenge',p:'',go:()=>{clear();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>G.after()});
let row=0;
function ask(){qn++;const [qq,ok,bad]=QZ[qn%QZ.length],all=[[ok,'ok']].concat(bad),r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 box.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=box.querySelector('.fl-pick');ord.forEach(([w,tg])=>{c.el('button',{type:'button',class:'lbtn'},g,w).onclick=()=>grade(tg,ok)});tell('Challenge: '+qq);A.redraw()}
function grade(tg,ok){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),win=tg==='ok';let m=WHY[tg]||'Use the fact you know, then think about tens.';
 if(tg==='tens')m='You forgot the tens. 50 is 5 tens: 5 × 3 = 15, so 50 × 3 = 15 tens = 150.';
 if(tg==='plus0')m='Adding 0 keeps a number the same, but × 0 does not. 6 groups of nothing is 0.';
 if(tg==='addall')m='You added. The signs are ×, so multiply: 4 × 5 = 20, then 20 × 7 = 140.';
 if(win){row++;A.win()}else{row=0;A.sound.miss()}fb.innerHTML=`${win?'✓ Yes: '+ok+'. In a row: '+row+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.66,tall:1.35,draw,onStep:B=>{box.hidden=B.step!==5;pad.hidden=B.step===5;controls()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Mental maths lab buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
