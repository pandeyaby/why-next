/* Flagship – positive and negative numbers (ages 11–13; KS3 directed number, CCSS 6.NS.5–7.NS.1). Pin real-world values
   on a line from −10 to 10, walk a counter to add, turn it round to subtract (so taking away a negative moves right),
   match each sum with the twin that moves the same way, and count gaps across zero. Data: dirnum_art.js. */
(()=>{const D=DIRNUM;
VIS.reg('flagdirnum',c=>{let A,cx,row,qa,qi=-1,era=0;const M={};
const OKC='#047857',NOC='#b91c1c',RULE='#64748b',SANS='px system-ui,sans-serif',neg=v=>v<0?'−'+(-v):String(v),signed=v=>v<0?'(−'+(-v)+')':String(v);
const mode=()=>['pin','add','sub','twin','gap','chal'][A.step];
const em=n=>A.narrow?n:Math.round(n*1.1);
const within=(p,b)=>!!b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
const night=()=>A.col.dark,fg=()=>night()?'#f1f5f9':'#0f172a';
function lineBreak(text,maxW,font){cx.font=font;const rows=[];let now='';for(const w of text.split(' ')){const t=now?now+' '+w:w;if(now&&cx.measureText(t).width>maxW){rows.push(now);now=w}else now=t}if(now)rows.push(now);return rows}
function header(text,state){const font=`700 ${em(15)}${SANS}`,rows=lineBreak(text,A.W-34,font),lh=em(15)*1.3,h=rows.length*lh+16;
 cx.fillStyle={ok:night()?'#14532d':'#dcfce7',no:night()?'#7f1d1d':'#fee2e2'}[state]||(night()?'#1e293b':'#ffffff');A.paint.rrect(8,8,A.W-16,h,12);cx.fill();
 cx.lineWidth=state?2.5:1.2;cx.strokeStyle=state==='ok'?OKC:state==='no'?NOC:RULE;cx.stroke();cx.font=font;cx.fillStyle=fg();cx.textAlign='left';cx.textBaseline='top';rows.forEach((r,i)=>cx.fillText(r,17,16+i*lh));return 8+h+8}
function tile(b,text,st){st=st||{};cx.fillStyle=st.no?'#fee2e2':st.ok?'#dcfce7':st.on?'#dbeafe':'#ffffff';A.paint.rrect(b.x,b.y,b.w,b.h,10);cx.fill();cx.lineWidth=st.no||st.ok||st.on?3:1.4;cx.strokeStyle=st.no?NOC:st.ok?OKC:st.on?'#1d4ed8':RULE;cx.stroke();
 let n=em(st.n||16);cx.font=`800 ${n}${SANS}`;while(cx.measureText(text).width>b.w-10&&n>9){n--;cx.font=`800 ${n}${SANS}`}cx.fillStyle='#0f172a';cx.textAlign='center';cx.textBaseline='middle';cx.fillText(text,b.x+b.w/2,b.y+b.h/2+1)}
/* ---------- the number line ---------- */
let NL={x0:0,x1:1,y:0,top:0};
const X=v=>NL.x0+(v-D.LO)*(NL.x1-NL.x0)/(D.HI-D.LO),V=x=>D.LO+(x-NL.x0)*(D.HI-D.LO)/(NL.x1-NL.x0);
const stepW=()=>(NL.x1-NL.x0)/(D.HI-D.LO);
function numberLine(top,bottom,o){o=o||{};const y=top+(A.H-bottom-top)*(o.at||.6);NL={x0:22,x1:A.W-22,y,top};
 cx.fillStyle=night()?'rgba(56,189,248,.16)':'rgba(56,189,248,.14)';cx.fillRect(NL.x0,y-26,X(0)-NL.x0,52);cx.fillStyle=night()?'rgba(251,146,60,.16)':'rgba(251,146,60,.14)';cx.fillRect(X(0),y-26,NL.x1-X(0),52);
 cx.strokeStyle=fg();cx.lineWidth=2.5;cx.beginPath();cx.moveTo(NL.x0-8,y);cx.lineTo(NL.x1+8,y);cx.stroke();
 for(let v=D.LO;v<=D.HI;v++){const x=X(v),big=v===0||v%5===0;cx.lineWidth=big?2.5:1.3;cx.beginPath();cx.moveTo(x,y-(big?9:6));cx.lineTo(x,y+(big?9:6));cx.stroke();
  const mk=o.mark||[],near=A.narrow&&!mk.includes(v)&&(mk.includes(v-1)||mk.includes(v+1));
  if((!A.narrow||v%2===0||mk.includes(v))&&!near){cx.font=`${v===0||mk.includes(v)?800:600} ${em(A.narrow?11:12)}${SANS}`;cx.fillStyle=fg();cx.textAlign='center';cx.textBaseline='top';cx.fillText(neg(v),x,y+12)}}
 cx.font=`700 ${em(11)}${SANS}`;cx.textBaseline='top';cx.fillStyle=night()?'#7dd3fc':'#075985';cx.textAlign='left';cx.fillText('← negative (smaller)',NL.x0,y+30);cx.fillStyle=night()?'#fdba74':'#9a3412';cx.textAlign='right';cx.fillText('positive (bigger) →',NL.x1,y+30)}
function counter(v,col,lab){const x=X(v),r=Math.max(11,Math.min(stepW()*.62,17)),y=NL.y-r-6;A.paint.ball(x,y,r,col||'#7c3aed');cx.strokeStyle='#0f172a';cx.lineWidth=1.5;cx.beginPath();cx.arc(x,y,r,0,7);cx.stroke();
 cx.beginPath();cx.moveTo(x,y+r);cx.lineTo(x,NL.y-1);cx.stroke();if(lab){cx.font=`800 ${em(11)}${SANS}`;cx.fillStyle='#ffffff';cx.textAlign='center';cx.textBaseline='middle';cx.fillText(lab,x,y+1)}return{x,y,r}}
function hop(a,b,txt,lift,col){const xa=X(a),xb=X(b),h=Math.min(46,Math.abs(xb-xa)*.35+14)+(lift||0),y=NL.y-6;cx.strokeStyle=col||(night()?'#86efac':OKC);cx.lineWidth=3;cx.beginPath();cx.moveTo(xa,y);cx.quadraticCurveTo((xa+xb)/2,y-h*2,xb,y);cx.stroke();
 const an=Math.atan2(y-(y-h*2),xb-(xa+xb)/2);cx.fillStyle=cx.strokeStyle;cx.beginPath();cx.moveTo(xb,y);cx.lineTo(xb-10*Math.cos(an-.5),y-10*Math.sin(an-.5));cx.lineTo(xb-10*Math.cos(an+.5),y-10*Math.sin(an+.5));cx.closePath();cx.fill();
 if(txt)A.paint.label(txt,(xa+xb)/2,y-h-12,{font:`800 ${em(12)}${SANS}`,bg:night()?'#14532d':'#065f46',col:'#ffffff'})}
/* ---------- 1. pin the values ---------- */
function placePin(v){const s=M.p,P=D.PINS[s.k];if(!P)return;s.at=0;
 if(v===P.v){s.done.push(P.v);s.k++;s.bad=null;A.sound.pop();return talk(`Yes: ${neg(v)}. `+(v<0?`${-v} below zero is left of 0.`:`${v} above zero is right of 0.`)+(s.k<D.PINS.length?' Next one.':' Now compare them: −8 is the furthest left, so it is the smallest.'))}
 s.bad=v;A.sound.miss();if(v===-P.v)return talk(`${neg(v)} is on the wrong side of zero. ${P.t} ${P.v<0?'Below zero is negative: count left from 0.':'Above zero is positive: count right from 0.'}`);
 talk(`Not ${neg(v)}. ${P.t} Count the steps from 0.`)}
/* ---------- 2 and 3. walk to add or subtract ---------- */
const sums=()=>mode()==='add'?D.ADD:D.SUB;
function tryWalk(v){const s=mode()==='add'?M.a:M.s,S=sums()[s.k];if(!S)return;const sub=mode()==='sub',dir=(sub?-S.n:S.n)>0?'right':'left',far=Math.abs(S.n);
 if(v===S.r){s.k++;s.bad=null;s.at=sums()[s.k]?sums()[s.k].a:v;s.last=S;A.sound.pop();
  return talk(`Yes: ${neg(S.a)} ${sub?'−':'+'} ${signed(S.n)} = ${neg(S.r)}. `+(sub?(S.n<0?`Taking away a negative moves right: it is the same as ${neg(S.a)} + ${far}.`:`Taking away ${far} moves ${far} left.`):(S.n<0?`Adding a negative moves left.`:`Adding a positive moves right.`))+(s.k<sums().length?' Next sum.':''))}
 s.bad=v;A.sound.miss();s.at=S.a;
 if(v===S.a)return talk(`The counter has not moved. Start at ${neg(S.a)} and walk ${far} ${dir}.`);
 if(!sub&&v===S.a-S.n)return talk(`That walks the wrong way. ${S.n<0?`That is ${neg(S.a)} + ${far}. Adding a negative number moves left.`:`Adding a positive number moves right.`}`);
 if(sub&&v===S.a+S.n)return talk(S.n<0?`${neg(v)} is ${neg(S.a)} − ${far}. Taking away a negative moves right: ${neg(S.a)} − (−${far}) = ${neg(S.a)} + ${far}.`:`That walks right. Taking away ${far} moves left, ${far} steps.`);
 if(sub&&v===S.n-S.a)return talk(`That is ${S.n} − ${neg(S.a)}, the wrong way round. Start at ${neg(S.a)} and walk ${far} left, past zero if you need to.`);
 talk(`Not ${neg(v)}. Start at ${neg(S.a)} and count ${far} steps ${dir}.`)}
/* ---------- 4. twins ---------- */
function cardBox(side,i){const top=M.top,n=D.TWINS.left.length,gap=8,h=Math.min(52,(A.H-top-14-gap*(n-1))/n),w=(A.W-16-14)/2;return{x:8+side*(w+14),y:top+i*(h+gap),w,h}}
function pickLeft(i){const s=M.t;if(s.got.includes(i))return;s.sel=i;s.bad=null;A.sound.tick();talk(`${D.TWINS.left[i]} picked. Now tap the sum on the right that moves the same way.`)}
function pickRight(j){const s=M.t;if(s.sel==null)return talk('Tap a sum on the left first.');const i=s.sel;
 if(D.TWINS.match[i]!==j){s.bad=j;A.sound.miss();return talk(`${D.TWINS.left[i]} and ${D.TWINS.right[j]} do not move the same way. Which way does ${D.TWINS.left[i]} move from its first number, and how far?`)}
 s.got.push(i);s.sel=null;s.bad=null;A.sound.pop();talk(`Twins: ${D.TWINS.left[i]} = ${D.TWINS.right[j]}. ${D.TWINS.why[i]}`+(s.got.length<D.TWINS.left.length?'':' All four matched.'))}
/* ---------- 5. gaps across zero ---------- */
function pickGap(tag){const s=M.g,G=D.GAPS[s.k];if(!G)return;
 if(tag!=='ok'){s.bad=tag;A.sound.miss();return talk(D.GAPWHY[tag])}
 s.k++;s.bad=null;s.shown=G;A.sound.pop();const cross=G.a<0&&G.b>0;talk(`Yes: ${G.opts[0][0]} ${G.u}. `+(cross?`${-G.a} up to zero, then ${G.b} more: ${-G.a} + ${G.b} = ${G.b-G.a}.`:`Both are below zero, so count from ${neg(G.a)} to ${neg(G.b)}: ${G.b-G.a} steps.`)+(s.k<D.GAPS.length?' Next one.':''))}
const optBox=i=>{const w=Math.min(150,(A.W-16-16)/3),h=Math.min(46,A.H*.1);return{x:(A.W-(3*w+16))/2+i*(w+8),y:A.H-h-8,w,h}};
/* ---------- draw ---------- */
function draw(){const m=mode();cx.fillStyle=night()?'#0f172a':'#f8fafc';cx.fillRect(0,0,A.W,A.H);
 if(m==='chal'){const t=header('Challenge: order, add, subtract and find the gap.','ok');numberLine(t,10,{at:.55});hop(-3,4,'+7',0);hop(3,-4,'−7',-26,night()?'#fda4af':'#be123c');return A.fx.draw(cx)}
 if(m==='pin'){const s=M.p,P=D.PINS[s.k],t=header(P?`Pin ${s.k+1} of 4. ${P.t}`:'All four pinned. Smallest first: −8, −6, −3, 7.',P?(s.bad!=null?'no':''):'ok');numberLine(t,10,{mark:s.done});
  s.done.forEach(v=>counter(v,'#059669',neg(v)));if(P)counter(s.drag?s.drag.v:s.at,s.bad!=null?'#dc2626':'#7c3aed','?')}
 if(m==='add'||m==='sub'){const s=m==='add'?M.a:M.s,S=sums()[s.k],sub=m==='sub';
  const t=header(S?`Sum ${s.k+1} of 3: ${neg(S.a)} ${sub?'−':'+'} ${signed(S.n)} = ?  Walk the counter to the answer.`:(sub?'Take away a positive: left. Take away a negative: right.':'Add a positive: right. Add a negative: left.'),S?(s.bad!=null?'no':''):'ok');
  numberLine(t,10,{mark:S?[S.a]:[]});if(s.last&&(!S||s.k>0)){const L=s.last;hop(L.a,L.r,(sub?'− ':'+ ')+signed(L.n),0)}
  if(S){const x=X(S.a);cx.fillStyle=night()?'#fde68a':'#92400e';cx.font=`800 ${em(11)}${SANS}`;cx.textAlign='center';cx.textBaseline='bottom';cx.fillText('start',x,NL.y+48+em(11));
   const at=s.drag?s.drag.v:s.at;counter(at,s.bad!=null?'#dc2626':'#7c3aed','');if(Math.round(at)!==S.a)A.paint.label(neg(Math.round(at)),X(at),NL.y-56,{font:`800 ${em(12)}${SANS}`,bg:'#1f2937',col:'#ffffff'})}}
 if(m==='twin'){const s=M.t,fin=s.got.length===D.TWINS.left.length;M.top=header(fin?'Each pair moves the same way: a − (−b) = a + b, and a + (−b) = a − b.':s.msg||D.TXT[3],fin?'ok':s.bad!=null?'no':'');
  D.TWINS.left.forEach((t,i)=>tile(cardBox(0,i),t,{ok:s.got.includes(i),on:s.sel===i}));D.TWINS.right.forEach((t,j)=>tile(cardBox(1,j),t,{ok:s.got.some(i=>D.TWINS.match[i]===j),no:s.bad===j}))}
 if(m==='gap'){const s=M.g,G=D.GAPS[s.k],t=header(G?`Gap ${s.k+1} of 3. ${G.t}`:'Across zero, add the two parts; on one side of zero, count straight across.',G?(s.bad?'no':''):'ok');
  const oh=Math.min(46,A.H*.1)+16;numberLine(t,oh,{mark:G?[G.a,G.b]:[]});
  if(G){[G.a,G.b].forEach((v,i)=>counter(v,i?'#ea580c':'#0284c7',''));D.GAPS[s.k].opts.forEach(([v,tag],i)=>tile(optBox(i),`${neg(v)} ${G.u}`,{no:s.bad===tag,n:14}))}
  const L=s.shown;if(L){if(L.a<0&&L.b>0){hop(L.a,0,String(-L.a),0);hop(0,L.b,String(L.b),0)}else hop(L.a,L.b,String(L.b-L.a),0)}}
 A.fx.draw(cx)}
/* ---------- pointer ---------- */
function grab(p){const m=mode();if(m==='pin'||m==='add'||m==='sub'){const s=m==='pin'?M.p:m==='add'?M.a:M.s;if(m==='pin'&&!D.PINS[s.k])return false;if(m!=='pin'&&!sums()[s.k])return false;
  const x=X(s.at),r=Math.max(11,Math.min(stepW()*.62,17));if(Math.abs(p.x-x)<r+10&&p.y<NL.y+10&&p.y>NL.y-2*r-24){s.drag={v:s.at,x0:p.x};A.redraw();return true}
  if(Math.abs(p.y-NL.y)<24){const v=Math.max(D.LO,Math.min(D.HI,Math.round(V(p.x))));m==='pin'?placePin(v):tryWalk(v)}return false}
 if(m==='twin'){for(let i=0;i<D.TWINS.left.length;i++){if(within(p,cardBox(0,i)))return pickLeft(i),false;if(within(p,cardBox(1,i)))return pickRight(i),false}return false}
 if(m==='gap'){const G=D.GAPS[M.g.k];if(G){const i=[0,1,2].find(i=>within(p,optBox(i)));if(i!=null)pickGap(G.opts[i][1])}return false}
 return false}
function slide(p){const m=mode(),s=m==='pin'?M.p:m==='add'?M.a:m==='sub'?M.s:null;if(s&&s.drag){s.drag.v=Math.max(D.LO,Math.min(D.HI,V(p.x)));A.redraw()}}
function release(p){const m=mode(),s=m==='pin'?M.p:m==='add'?M.a:m==='sub'?M.s:null;if(!s||!s.drag)return;const d=s.drag;s.drag=null;const v=Math.round(d.v);
 if(Math.abs(p.x-d.x0)<6){talk('Drag the counter along the line, or use the step buttons.');return}s.at=v;m==='pin'?placePin(v):tryWalk(v)}
/* ---------- state ---------- */
function reset(){era++;for(const k in M)delete M[k];Object.assign(M,{p:{k:0,at:0,done:[],bad:null,drag:null},a:{k:0,at:D.ADD[0].a,bad:null,drag:null,last:null},s:{k:0,at:D.SUB[0].a,bad:null,drag:null,last:null},
 t:{sel:null,got:[],bad:null,msg:''},g:{k:0,bad:null,shown:null},top:0,check:()=>{}})}
function talk(t){if(M.t&&mode()==='twin')M.t.msg=t;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();M.check()}
const settle=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,ok){reset();talk(D.DESC[i]);M.check=settle(i,ok,D.DONE[i])}
function play(i,acts){steps[i].go();const e=era;acts.reduce((t,[ms,f])=>{setTimeout(()=>{if(e===era)f()},t+ms);return t+ms},0)}
function nudge(s,d){s.at=Math.max(D.LO,Math.min(D.HI,s.at+d));s.bad=null;A.sound.tick();talk(`The counter is on ${neg(s.at)}.`)}
function controls(){if(!row)return;row.innerHTML='';const m=mode(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},row,t).onclick=f};
 if(m==='pin'&&D.PINS[M.p.k]){const s=M.p;add('◀ 1 left',()=>nudge(s,-1),'Move the pin 1 left');add('1 right ▶',()=>nudge(s,1),'Move the pin 1 right');add(`Pin it at ${neg(s.at)}`,()=>placePin(s.at))}
 if((m==='add'||m==='sub')&&sums()[(m==='add'?M.a:M.s).k]){const s=m==='add'?M.a:M.s;add('◀ 1 left',()=>nudge(s,-1),'Move the counter 1 left');add('1 right ▶',()=>nudge(s,1),'Move the counter 1 right');add(`Check: ${neg(s.at)}`,()=>tryWalk(s.at))}
 if(m==='twin'){const s=M.t;if(s.sel==null)D.TWINS.left.forEach((t,i)=>{if(!s.got.includes(i))add(t,()=>pickLeft(i),`Pick ${t}`)});else D.TWINS.right.forEach((t,j)=>{if(!s.got.some(i=>D.TWINS.match[i]===j))add(`Twin: ${t}`,()=>pickRight(j))})}
 if(m==='gap'){const G=D.GAPS[M.g.k];if(G)G.opts.forEach(([v,tag])=>add(`${neg(v)} ${G.u}`,()=>pickGap(tag)))}}
const steps=[
{h:'Opposites',p:D.TXT[0],predict:{q:'Which is colder: −8 °C or −3 °C?',opts:['−3 °C, because 3 is less than 8','−8 °C, because it is further below zero'],ans:1},task:'Pin all 4 values on the line',
 show:()=>play(0,D.PINS.map(P=>[260,()=>placePin(P.v)])),go:()=>begin(0,()=>M.p.k>=D.PINS.length)},
{h:'Adding',p:D.TXT[1],predict:{q:'4 + (−6): will the answer be bigger or smaller than 4?',opts:['Bigger: adding always makes a number bigger','Smaller: adding a negative moves left'],ans:1},task:'Walk the counter to all 3 answers',
 show:()=>play(1,D.ADD.map(S=>[300,()=>tryWalk(S.r)])),go:()=>begin(1,()=>M.a.k>=D.ADD.length)},
{h:'Subtracting',p:D.TXT[2],predict:{q:'3 − (−4) = ?',opts:['−1','7'],ans:1},task:'Walk the counter to all 3 answers',
 show:()=>play(2,D.SUB.map(S=>[300,()=>tryWalk(S.r)])),go:()=>begin(2,()=>M.s.k>=D.SUB.length)},
{h:'Twin sums',p:D.TXT[3],task:'Match all 4 twins',show:()=>play(3,D.TWINS.left.flatMap((t,i)=>[[200,()=>pickLeft(i)],[200,()=>pickRight(D.TWINS.match[i])]])),go:()=>begin(3,()=>M.t.got.length===D.TWINS.left.length)},
{h:'Gaps across zero',p:D.TXT[4],task:'Find all 3 gaps',show:()=>play(4,D.GAPS.map(()=>[300,()=>pickGap('ok')])),go:()=>begin(4,()=>M.g.k>=D.GAPS.length)},
{h:'Challenge',p:'',go:()=>{reset();pose()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>M.check()});
function slip(t){let m='Picture the number line: left is smaller, adding a negative moves left, taking away a negative moves right.';
 if(t==='bigger')m='Further left is smaller. −9 is 9 below zero and −4 is only 4 below, so −9 is colder and smaller.';
 if(t==='sign')m='Keep the sign. A minus sign means below zero, left of 0 on the line, and it changes the answer.';
 if(t==='dir')m='Adding a positive number moves right. From −5, walk 8 steps right: you pass zero and land on 3.';
 if(t==='addneg')m='Adding −7 is not adding 7. Adding a negative number moves left: from 2, 7 steps left is −5.';
 if(t==='subneg')m='Taking away −3 is not taking away 3. Taking away a negative moves right: 4 − (−3) = 4 + 3 = 7.';
 if(t==='flip')m='Taking away 2 moves left, further from zero. From −6, two steps left is −8, not −4.';
 if(t==='gap')m='That subtracts the digits. Across zero, add the parts: 6 up to zero, then 4 more, is 10.';
 return m}
function pose(){qi++;const Q=D.QS[qi%D.QS.length],all=[[Q.a,'ok'],...Q.o],k=qi%3,shown=all.slice(k).concat(all.slice(0,k));
 qa.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=qa.querySelector('.fl-pick');shown.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>judge(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function judge(t,a){qa.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qa.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=pose;c.say(ok?'Yes.':slip(t))}
FK.shell(c,{steps,ratio:.6,tall:.92,draw,onStep:X=>{qa.hidden=X.step!==5;row.hidden=X.step===5;controls()},
 init:X=>{A=X;cx=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);row=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Number line lab buttons'},w);qa=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down:grab,move:slide,up:release});controls()}}).start()})})();
