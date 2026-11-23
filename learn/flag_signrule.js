/* Flagship – multiplying and dividing negative numbers (ages 11-13; KS3 directed numbers, CCSS 7.NS.2): pick where
   a jumps of b land, extend a times-table pattern past zero, drag a negative multiplier that turns the answer round,
   fill the sign grid, divide by checking with a multiplication, and count the negatives in a longer product.
   Data and drawings: signrule_art.js. */
(()=>{const R=SIGNRULE,f=R.fmt,b=R.br;
VIS.reg('flagsignrule',c=>{let A,P,row,chal,qn=-1,run=0;const S={};
const part=()=>['jump','pat','turn','grid','div','cnt','chal'][A.step];
const over=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function back(){const g=A.ctx;g.fillStyle=A.col.dark?'#111827':'#f8fafc';g.fillRect(0,0,A.W,A.H)}
/* three answer cards in a row along the bottom */
function opts(list,bad,good){const gap=8,h=Math.min(64,A.H*.16),w=(A.W-16-gap*(list.length-1))/list.length,y=A.H-h-8;
 return list.map((v,i)=>{const r={v,x:8+i*(w+gap),y,w,h};P.card(r,typeof v==='number'?f(v):v,{n:22,no:bad===v,ok:good===v});return r})}
/* ---------- 1. jumps on a number line ---------- */
let JC=[];
function land(v){const s=S.ju,it=R.JUMP[s.i];if(!it||s.show)return;const ans=it.a*it.b;if(v!==ans){s.bad=v;A.sound.miss();
  return tell(v===it.a+it.b?`That adds ${it.a} and ${b(it.b)}. ${it.a} × ${b(it.b)} means ${it.a} jumps of ${f(it.b)}.`:v===-ans?`Look at the jump: ${f(it.b)} points ${it.b<0?'left':'right'}, so ${it.a} of them end up ${it.b<0?'left':'right'} of 0.`:`Count ${it.a} jumps of ${f(it.b)} from 0.`,true)}
 s.bad=null;s.show=1;A.sound.pop();tell(`${it.a} jumps of ${f(it.b)} land on ${f(ans)}: ${it.a} × ${b(it.b)} = ${f(ans)}.`+(s.i+1<R.JUMP.length?' Tap Next jump.':''),false);}
function nextJump(){const s=S.ju;if(!s.show)return;s.show=0;s.i++;s.bad=null;tell(s.i<R.JUMP.length?`Jump ${s.i+1}: where does ${R.JUMP[s.i].a} × ${b(R.JUMP[s.i].b)} land?`:R.DONE[0],false)}
function drawJump(){const s=S.ju,it=R.JUMP[s.i],y0=P.head(it?`${s.i+1} of ${R.JUMP.length}: ${it.a} × ${b(it.b)} = ${it.a} jumps of ${f(it.b)}. Where do they land?`:R.DONE[0],it?(s.bad!=null?'no':s.show?'ok':''):'ok',S.msg,S.err);
 const ly=y0+(A.H-y0)*.52,X=P.line(ly,-12,12,A.narrow?4:2);if(it&&s.show){const col=it.b<0?P.negc():P.posc(),at=P.hops(X,ly,it.a,it.b,col),g=A.ctx;g.font=`800 ${P.sz(16)}${P.F}`;g.fillStyle=col;g.textAlign='center';g.textBaseline='top';g.fillText(f(at),X(at),ly+30)}
 JC=it&&!s.show?opts(it.o,s.bad,null):[]}
/* ---------- 2. keep the pattern going ---------- */
let PC=[];
/* answer cards for row a: the answer, the wrong sign, and the answer minus 3 (forgot to add 3), turned by row */
function patOpts(a){const v=a*R.PAT_B,o=[v,-v,v-3],k=(-a)%3;return o.slice(k).concat(o.slice(0,k))}
function patPick(v){const s=S.pa,a=R.PAT_A[s.i];if(a==null)return;const ans=a*R.PAT_B;if(v!==ans){s.bad=v;A.sound.miss();
  return tell(v===-ans?`The answers go up by 3 each row: ${f((a+1)*R.PAT_B)}, then ${f(ans)}. Keep adding 3.`:`Look at the last answer and add 3.`,true)}
 s.i++;s.bad=null;A.sound.pop();tell(`${b(a)} × (−3) = ${f(ans)}.`+(s.i<R.PAT_A.length?' Next row.':''),false)}
function drawPat(){const s=S.pa,a=R.PAT_A[s.i],y0=P.head(a!=null?`Each row up the table adds 3. What is ${b(a)} × (−3)?`:R.DONE[1],a!=null?(s.bad!=null?'no':''):'ok',S.msg,S.err);
 const oh=Math.min(64,A.H*.16),top=y0+2,bot=A.H-(a!=null?oh+16:8),rh=Math.min(34,(bot-top)/R.PAT_A.length),g=A.ctx;
 R.PAT_A.forEach((x,i)=>{const y=top+i*rh,known=i<s.i,now=i===s.i;g.font=`800 ${P.sz(17)}${P.F}`;g.textBaseline='middle';g.textAlign='right';g.fillStyle=P.fg();
  g.fillText(`${b(x)} × (−3) =`,A.W*.56,y+rh/2);if(known){const v=x*R.PAT_B;g.textAlign='left';g.fillStyle=v<0?P.negc():v>0?P.posc():P.fg();g.fillText(f(v),A.W*.6,y+rh/2);
   if(i>0){g.font=`700 ${P.sz(12)}${P.F}`;g.fillStyle=P.dk()?'#86efac':P.OK;g.fillText('+3',A.W*.8,y)}}
  else if(now){g.strokeStyle='#1d4ed8';g.lineWidth=2.5;A.paint.rrect(A.W*.58,y+3,64,rh-6,6);g.stroke()}});
 PC=a!=null?opts(patOpts(a),s.bad,null):[]}
/* ---------- 3. a negative multiplier turns the answer round ---------- */
let TRK=null;
function setA(a,why){const s=S.tu,it=R.TURN[s.i];if(!it)return;s.a=Math.max(-4,Math.min(4,a));const p=s.a*it.b;A.redraw();
 if(why==='move'){A.cv.setAttribute('aria-label',`${b(s.a)} × ${b(it.b)} = ${f(p)}. Target ${f(it.t)}.`);return}
 if(p===it.t){s.i++;A.sound.pop();return tell(`${b(s.a)} × ${b(it.b)} = ${f(p)}. Hit!`+(s.i<R.TURN.length?' Next target.':''),false)}
 tell(Math.abs(p)===Math.abs(it.t)?`${f(p)} is the right size but on the wrong side of 0. Change the sign of the first number.`:`${b(s.a)} × ${b(it.b)} = ${f(p)}. The target is ${f(it.t)}.`,Math.abs(p)===Math.abs(it.t))}
function drawTurn(){const s=S.tu,it=R.TURN[s.i],y0=P.head(it?`Target ${s.i+1} of ${R.TURN.length}: make ? × ${b(it.b)} = ${f(it.t)}. Drag the dot.`:R.DONE[2],it?(S.err?'no':''):'ok',S.msg,S.err);
 if(!it){TRK=null;return}const g=A.ctx,ty=y0+30,x0=40,x1=A.W-40,TX=a=>x0+(a+4)/8*(x1-x0);TRK={x:x0-20,y:ty-26,w:x1-x0+40,h:52,TX,x0,x1};
 g.strokeStyle=P.fg();g.lineWidth=3;g.beginPath();g.moveTo(x0,ty);g.lineTo(x1,ty);g.stroke();g.font=`700 ${P.sz(13)}${P.F}`;g.textAlign='center';g.textBaseline='top';
 for(let a=-4;a<=4;a++){g.fillStyle=a<0?P.negc():a>0?P.posc():P.fg();g.fillText(f(a),TX(a),ty+14);g.beginPath();g.moveTo(TX(a),ty-6);g.lineTo(TX(a),ty+6);g.stroke()}
 g.fillStyle=s.a<0?'#b91c1c':'#1d4ed8';g.beginPath();g.arc(TX(s.a),ty,15,0,7);g.fill();g.strokeStyle='#ffffff';g.lineWidth=3;g.stroke();g.fillStyle='#ffffff';g.font=`800 ${P.sz(13)}${P.F}`;g.textBaseline='middle';g.fillText(f(s.a),TX(s.a),ty);
 const ly=A.H-46,X=P.line(ly,-12,12,3),p=s.a*it.b;g.fillStyle=P.dk()?'#fde68a':'#92400e';g.beginPath();g.moveTo(X(it.t),ly-30);g.lineTo(X(it.t)-8,ly-44);g.lineTo(X(it.t)+8,ly-44);g.closePath();g.fill();
 g.font=`800 ${P.sz(13)}${P.F}`;g.textBaseline='bottom';g.fillText('target',X(it.t),ly-46);P.arrow(X,ly-74,it.b,P.dk()?'#94a3b8':'#64748b');g.textBaseline='bottom';g.fillStyle=P.fg();g.fillText(`${b(it.b)}`,X(it.b/2),ly-80);
 P.arrow(X,ly-12,p,p<0?P.negc():P.posc());g.textBaseline='bottom';g.fillStyle=P.fg();g.font=`800 ${P.sz(15)}${P.F}`;g.fillText(`${b(s.a)} × ${b(it.b)} = ${f(p)}`,A.W/2,ly-96)}
/* ---------- 4. the sign grid ---------- */
let GC=[];
function gridPick(sg){const s=S.gr,it=R.GRID[s.i];if(!it)return;const p=it.a*it.b,want=p>0?'+':'−';if(sg!==want){s.bad=sg;A.sound.miss();
  return tell(it.a<0&&it.b<0?`Both are negative. Think of the pattern: (−1) × (−3) = 3. Negative × negative is positive.`:it.a<0||it.b<0?`One number is negative, so the answer is on the negative side: ${b(it.a)} × ${b(it.b)} = ${f(p)}.`:`Positive × positive stays positive.`,true)}
 s.cells[s.i]=want;s.i++;s.bad=null;A.sound.pop();tell(`${b(it.a)} × ${b(it.b)} = ${f(p)}, so this cell is ${want==='+'?'positive':'negative'}.`+(s.i<4?' Next cell.':''),false)}
function drawGrid(){const s=S.gr,it=R.GRID[s.i],y0=P.head(it?`${b(it.a)} × ${b(it.b)}: positive or negative?`:R.DONE[3],it?(s.bad?'no':''):'ok',S.msg,S.err);
 const oh=it?Math.min(64,A.H*.16)+16:8,side=Math.min(A.W*.8,A.H-y0-oh-16),cs=side/3,gx=(A.W-side)/2,gy=y0+4,g=A.ctx,hd=['×','+','−'];
 for(let r=0;r<3;r++)for(let k=0;k<3;k++){const q={x:gx+k*cs,y:gy+r*cs,w:cs-4,h:cs-4};if(!r||!k){P.card(q,r||k?hd[r||k]:'×',{n:22});continue}
  const i=(r-1)*2+(k-1),v=s.cells[i];P.card(q,v||'',{n:30,sel:i===s.i,ok:!!v})}
 GC=it?opts(['+','−'],s.bad,null):[]}
/* ---------- 5. dividing ---------- */
let DC=[];
function divPick(v){const s=S.dv,it=R.DIV[s.i];if(!it)return;const ans=it.n/it.d;if(v!==ans){s.bad=v;A.sound.miss();
  return tell(v===-ans?`Check: ${b(it.d)} × ${b(v)} = ${f(it.d*v)}, not ${f(it.n)}. The sign is wrong.`:v===it.n*it.d?`That multiplies. Dividing undoes multiplying: find ${b(it.d)} × ? = ${f(it.n)}.`:`Find ${b(it.d)} × ? = ${f(it.n)}.`,true)}
 s.i++;s.bad=null;A.sound.pop();tell(`${b(it.n)} ÷ ${b(it.d)} = ${f(ans)}, because ${b(it.d)} × ${b(ans)} = ${f(it.n)}.`+(s.i<R.DIV.length?' Next one.':''),false)}
function drawDiv(){const s=S.dv,it=R.DIV[s.i],y0=P.head(it?`${s.i+1} of ${R.DIV.length}: ${b(it.n)} ÷ ${b(it.d)} = ?`:R.DONE[4],it?(s.bad!=null?'no':''):'ok',S.msg,S.err);if(!it){DC=[];return}
 const g=A.ctx,cy=y0+(A.H-y0-80)/2;g.textAlign='center';g.textBaseline='middle';g.font=`800 ${P.sz(26)}${P.F}`;g.fillStyle=P.fg();g.fillText(`${b(it.n)} ÷ ${b(it.d)} = ?`,A.W/2,cy-20);
 g.font=`700 ${P.sz(17)}${P.F}`;g.fillStyle=P.dk()?'#cbd5e1':'#334155';g.fillText(`Check: ${b(it.d)} × ? = ${f(it.n)}`,A.W/2,cy+18);DC=opts(it.o,s.bad,null)}
/* ---------- 6. count the negatives ---------- */
let CC=[];
function cntPick(sg){const s=S.cn,it=R.CNT[s.i];if(!it)return;const neg=it.f.filter(x=>x<0).length,p=it.f.reduce((x,y)=>x*y,1),want=p>0?'+':'−';if(sg!==want){s.bad=sg;A.sound.miss();
  return tell(`Count the negatives: there ${neg===1?'is 1':'are '+neg}. ${neg%2?'One is left over after pairing, so the answer is negative.':'They all pair up, so the answer is positive.'}`,true)}
 s.i++;s.bad=null;A.sound.pop();tell(`${it.f.map(b).join(' × ')} = ${f(p)}. ${neg} negative${neg===1?'':'s'}: ${neg%2?'odd, so negative':'even, so positive'}.`+(s.i<R.CNT.length?' Next one.':''),false)}
function drawCnt(){const s=S.cn,it=R.CNT[s.i],y0=P.head(it?`${s.i+1} of ${R.CNT.length}: is the answer positive or negative?`:R.DONE[5],it?(s.bad?'no':''):'ok',S.msg,S.err);if(!it){CC=[];return}
 const n=it.f.length,gap=8,w=Math.min(78,(A.W-16-gap*(n-1))/n),x0=(A.W-(n*w+(n-1)*gap))/2,cy=y0+(A.H-y0-90)/2,g=A.ctx;let k=0;
 it.f.forEach((v,i)=>{const r={x:x0+i*(w+gap),y:cy-w/2,w,h:w};P.card(r,b(v),{n:20,col:v<0?'#b91c1c':'#1d4ed8'});if(v<0){g.font=`700 ${P.sz(12)}${P.F}`;g.fillStyle=P.negc();g.textAlign='center';g.textBaseline='top';g.fillText('neg '+(++k),r.x+w/2,r.y+w+4)}});
 CC=opts(['+','−'],s.bad,null)}
/* ---------- wiring ---------- */
function draw(){back();const m=part();if(m==='chal'){P.head('Challenge: signs when you multiply and divide','ok');const g=A.ctx,X=P.line(A.H*.62,-12,12,3);P.hops(X,A.H*.62,-3,-4,P.posc());return}
 ({jump:drawJump,pat:drawPat,turn:drawTurn,grid:drawGrid,div:drawDiv,cnt:drawCnt})[m]()}
function down(p){const m=part();
 if(m==='jump'){const r=JC.find(r=>over(p,r));if(r)land(r.v);else if(S.ju.show)nextJump();return false}
 if(m==='pat'){const r=PC.find(r=>over(p,r));if(r)patPick(r.v);return false}
 if(m==='turn'&&TRK&&over(p,TRK)){S.tu.drag=1;setA(nearA(p.x),'move');return true}
 if(m==='grid'){const r=GC.find(r=>over(p,r));if(r)gridPick(r.v);return false}
 if(m==='div'){const r=DC.find(r=>over(p,r));if(r)divPick(r.v);return false}
 if(m==='cnt'){const r=CC.find(r=>over(p,r));if(r)cntPick(r.v);return false}return false}
function nearA(x){const t=TRK;return Math.round((x-t.x0)/(t.x1-t.x0)*8-4)}
function move(p){if(part()==='turn'&&S.tu.drag&&TRK){const a=Math.max(-4,Math.min(4,nearA(p.x)));if(a!==S.tu.a)setA(a,'move')}}
function up(p){if(part()==='turn'&&S.tu.drag){S.tu.drag=0;setA(S.tu.a,'drop')}}
function clear(){run++;for(const k in S)delete S[k];Object.assign(S,{ju:{i:0,bad:null,show:0},pa:{i:R.PAT_OPEN,bad:null},tu:{i:0,a:1,drag:0},gr:{i:0,bad:null,cells:[]},dv:{i:0,bad:null},cn:{i:0,bad:null},msg:null,err:false,check:()=>{}})}
function tell(t,bad){S.msg=t;S.err=!!bad;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();S.check()}
const finish=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(R.DONE[i]+A.reveal(i))};
function open(i,ok){clear();c.say(R.DESC[i]);A.cv.setAttribute('aria-label',R.DESC[i]);S.check=finish(i,ok);keys();A.redraw()}
function auto(i,list){steps[i].go();const e=run;let t=0;list.forEach(([ms,fn])=>{t+=ms;setTimeout(()=>{if(e===run)fn()},t)})}
function keys(){if(!row)return;row.innerHTML='';const m=part(),K=(t,fn,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},row,t).onclick=fn};
 const it={jump:R.JUMP[S.ju.i],div:R.DIV[S.dv.i]}[m];
 if(m==='jump'&&it){if(S.ju.show)K('Next jump',nextJump);else it.o.forEach(v=>K(f(v),()=>land(v),`${it.a} × ${b(it.b)} lands on ${f(v)}`))}
 if(m==='pat'&&R.PAT_A[S.pa.i]!=null){const a=R.PAT_A[S.pa.i];patOpts(a).forEach(v=>K(f(v),()=>patPick(v),`${b(a)} × (−3) = ${f(v)}`))}
 if(m==='turn'&&R.TURN[S.tu.i]){K('First number − 1',()=>setA(S.tu.a-1,'drop'));K('First number + 1',()=>setA(S.tu.a+1,'drop'))}
 if(m==='grid'&&R.GRID[S.gr.i]){const g=R.GRID[S.gr.i];K('+ positive',()=>gridPick('+'),`${b(g.a)} × ${b(g.b)} is positive`);K('− negative',()=>gridPick('−'),`${b(g.a)} × ${b(g.b)} is negative`)}
 if(m==='div'&&it)it.o.forEach(v=>K(f(v),()=>divPick(v),`${b(it.n)} ÷ ${b(it.d)} = ${f(v)}`));
 if(m==='cnt'&&R.CNT[S.cn.i]){const q=R.CNT[S.cn.i].f.map(b).join(' × ');K('+ positive',()=>cntPick('+'),`${q} is positive`);K('− negative',()=>cntPick('−'),`${q} is negative`)}}
const steps=[
{h:'Jumps of a negative',p:R.TXT[0],task:'Land all 4 jumps',
 show:()=>auto(0,R.JUMP.flatMap(it=>[[450,()=>land(it.a*it.b)],[450,nextJump]])),go:()=>open(0,()=>S.ju.i>=R.JUMP.length||(S.ju.i===R.JUMP.length-1&&S.ju.show))},
{h:'Follow the pattern',p:R.TXT[1],predict:{q:'1 × (−3) = −3 and 0 × (−3) = 0. What is (−1) × (−3)?',opts:['−3','3'],ans:1},task:'Fill the last 3 rows',
 show:()=>auto(1,R.PAT_A.slice(R.PAT_OPEN).map(a=>[480,()=>patPick(a*R.PAT_B)])),go:()=>open(1,()=>S.pa.i>=R.PAT_A.length)},
{h:'Turn it round',p:R.TXT[2],predict:{q:'4 × 2 = 8. What is (−4) × 2?',opts:['8','−8'],ans:1},task:'Hit all 4 targets',
 show:()=>auto(2,R.TURN.map(it=>[520,()=>setA(it.t/it.b,'drop')])),go:()=>open(2,()=>S.tu.i>=R.TURN.length)},
{h:'The sign grid',p:R.TXT[3],task:'Fill all 4 cells',
 show:()=>auto(3,R.GRID.map(it=>[450,()=>gridPick(it.a*it.b>0?'+':'−')])),go:()=>open(3,()=>S.gr.i>=R.GRID.length)},
{h:'Dividing',p:R.TXT[4],predict:{q:'(−12) ÷ (−3) = ?',opts:['−4','4'],ans:1},task:'Answer all 4',
 show:()=>auto(4,R.DIV.map(it=>[450,()=>divPick(it.n/it.d)])),go:()=>open(4,()=>S.dv.i>=R.DIV.length)},
{h:'Count the negatives',p:R.TXT[5],predict:{q:'(−1) × (−1) × (−1) = ?',opts:['1','−1'],ans:1},task:'Answer all 5',
 show:()=>auto(5,R.CNT.map(it=>[450,()=>cntPick(it.f.reduce((x,y)=>x*y,1)>0?'+':'−')])),go:()=>open(5,()=>S.cn.i>=R.CNT.length)},
{h:'Challenge',p:'',go:()=>{clear();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
function why(t){let m='Same signs give a positive answer; different signs give a negative answer.';
 if(t==='negneg')m='Both numbers are negative. Negative × negative (or ÷) is positive: same signs, positive answer.';
 if(t==='addrule')m='That is adding, not multiplying. (−3) + (−4) moves 7 left from 0: −7. The sign rule is only for × and ÷.';
 if(t==='mixed')m='The signs are different, so the answer is negative.';
 if(t==='drop')m='The sign was dropped. Check: 3 × 6 = 18, not −18, so the answer must be negative.';
 if(t==='count')m='Count the negatives: an odd number gives a negative answer, an even number gives a positive one.';
 if(t==='add')m='That adds the numbers. Multiply or divide them, then fix the sign.';
 if(t==='times')m='That multiplies when it should divide (or adds when it should multiply). Read the sign between the numbers.';
 return m}
function quiz(){qn++;const Q=R.QS[qn%R.QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>score(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function score(t,a){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.6,tall:1.15,draw,onStep:X=>{chal.hidden=X.step!==6;row.hidden=X.step===6;keys()},
 init:X=>{A=X;P=R.PEN(A);const w=c.el('div',{class:'fl-below'},A.below);row=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Sign rules lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});keys()}}).start()})})();
