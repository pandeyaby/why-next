/* Flagship – collecting like terms (ages 11-12; CCSS 6.EE.A.3-4, KS3 algebra). Sort each term of an expression into
   x², x, y and number trays; collect each tray into one term and test both forms at x = 2, y = 5; cancel positive and
   negative tiles in zero pairs so each sign stays with its term; find the wrong steps in a robot's work; then set
   dials for x², x and the number until a table of values at x = 1, 2, 3 matches the long expression. Data and
   drawings: liketerm_art.js. Not flagequiv (testing equivalence with counter-examples) or flagbrackets. */
(()=>{const T=LKT,MI=T.MINUS;
VIS.reg('flagliketerm',c=>{let A,P,pad,cq,qn=-1,run=0;const K={};let hits=[];
const MODES=['sort','collect','minus','slip','build','quiz'],mode=()=>MODES[A.step];
const hit=(x,y,w,h,f)=>hits.push({x,y,w,h,f});
function top(t,tone){return P.banner(t,tone,K.note,K.bad)}
function grid(n,y0,cols,bot){const x0=8,W=A.W-16,H=A.H-y0-(bot||8),rows=Math.ceil(n/cols),w=W/cols,h=H/rows;return Array.from({length:n},(_,i)=>({x:x0+(i%cols)*w+3,y:y0+Math.floor(i/cols)*h+3,w:w-6,h:h-6}))}
/* ---------- 1. sort terms into trays ---------- */
function sortSlip(n,kind,k){const t=T.term(n,kind,true);
 if(kind==='1')return`${t} has no letter. It is a number term, so it goes with the numbers.`;
 if(k==='1')return`${t} has a letter in it, so it is not just a number.`;
 if((kind==='x2'&&k==='x')||(kind==='x'&&k==='x2'))return`x² means x × x, so ${t} is not like ${kind==='x'?'x²':'x'}. Look at the power, not just the letter.`;
 return`x and y stand for different unknowns, so ${t} cannot go with the ${T.NAME[k]}.`}
function drop(k){const s=K.so;if(s.i>=T.SORT.length)return;const [n,kind]=T.SORT[s.i];
 if(k!==kind){s.bad=k;A.sound.miss();return say(sortSlip(n,kind,k),true)}
 s.bad=null;s.tr[k].push(n);s.i++;A.sound.pop();say(`${T.term(n,kind,true)} goes with the ${T.NAME[k]}.${s.i>=T.SORT.length?'':' Next term.'}`,false)}
function drawSort(){const s=K.so,ok=s.i>=T.SORT.length,y0=top(ok?T.DONE[0]:`Term ${s.i+1} of ${T.SORT.length}. Which tray does it go in?`,ok?'ok':K.bad?'no':'');
 const ex=T.SORT.map(([n,k],i)=>T.term(n,k,i===0)).join(' ');P.text(ex,A.W/2,y0+14,14,P.fg());
 const cy=y0+34,ch=Math.max(46,(A.H-cy)*.24),cw=Math.min(170,A.W*.4);
 if(!ok){const [n,k]=T.SORT[s.i];P.box(A.W/2-cw/2,cy,cw,ch,'sel');P.text(T.term(n,k,s.i===0),A.W/2,cy+ch/2,24,P.fg())}
 grid(4,cy+ch+10,A.narrow?2:4).forEach((r,i)=>{const k=T.KINDS[i];P.box(r.x,r.y,r.w,r.h,s.bad===k?'no':'');P.text(T.NAME[k],r.x+r.w/2,r.y+16,13,T.COL[k][A.col.dark?1:0]);
  P.text(s.tr[k].map((n,j)=>T.term(n,k,j===0)).join(' ')||'empty',r.x+r.w/2,r.y+r.h/2+8,s.tr[k].length?16:12,s.tr[k].length?P.fg():T.RIM);hit(r.x,r.y,r.w,r.h,()=>drop(k))})}
/* ---------- 2. collect each tray ---------- */
function groups(){const g={};T.KINDS.forEach(k=>g[k]=[]);T.SORT.forEach(([n,k])=>g[k].push(n));return g}
function collect(k){const o=K.co;if(o.got.includes(k))return say(`The ${T.NAME[k]} are already collected.`,false);o.got.push(k);A.sound.pop();
 const g=groups()[k],tot=g.reduce((a,b)=>a+b,0),r=T.term(tot,k,true),parts=g.map((n,i)=>T.term(n,k,i===0)).join(' ');
 say(g.length<2?`${parts} is the only ${k==='1'?'number':T.LAB[k]+' term'}, so it stays ${r}.`:`${parts} = ${r}${g.some(n=>n===1)?`: ${T.LAB[k]} means 1${T.LAB[k]}`:''}: ${g.join(' + ')} lots of ${k==='1'?'one':T.LAB[k]} make ${tot}.`,false)}
function drawCollect(){const o=K.co,ok=o.got.length>=4,y0=top(ok?T.DONE[1]:`Collected ${o.got.length} of 4 trays. Tap each tray to collect it.`,ok?'ok':K.bad?'no':''),G=groups();
 const R=grid(4,y0+4,A.narrow?2:4,30),uN=k=>G[k].reduce((a,n)=>a+n*(T.size(k,1)[0]+.15),0)+(o.got.includes(k)?0:(G[k].length-1)*.5),U=Math.max(6,Math.min(...R.map((r,i)=>Math.min((r.h-44)/1.7,(r.w-16)/Math.max(uN(T.KINDS[i]),1)))));R.forEach((r,i)=>{const k=T.KINDS[i],gs=G[k],done=o.got.includes(k);P.box(r.x,r.y,r.w,r.h,done?'ok':'');
  const tot=gs.reduce((a,b)=>a+b,0);P.text(done?T.term(tot,k,true):gs.map((n,j)=>T.term(n,k,j===0)).join(' '),r.x+r.w/2,r.y+16,15,T.COL[k][A.col.dark?1:0]);
  const units=uN(k),u=U;
  let x=r.x+(r.w-units*u)/2;const yb=r.y+r.h-10;gs.forEach((n,j)=>{for(let q=0;q<n;q++){const [w,h]=T.size(k,u);T.tile(A,x,yb-h,k,u,false);x+=w+.15*u}if(!done)x+=.5*u});hit(r.x,r.y,r.w,r.h,()=>collect(k))});
 if(ok){const c=T.sum(T.SORT);P.text(`= ${T.fmt(c)}`,A.W/2,A.H-16,14,P.fg())}}
/* ---------- 3. zero pairs ---------- */
function cancel(k){const m=K.mi[k];if(!m[0]||!m[1]){A.sound.miss();return say(`No ${T.LAB[k]} pair left to cancel. ${m[1]?`The ${MI}${m[1]===1?'':m[1]}${T.LAB[k]} has nothing to cancel with, so it stays negative.`:`What is left is ${T.term(m[0],k,true)}.`}`,!!m[1])}
 m[0]--;m[1]--;A.sound.pop();say(`${T.LAB[k]} + (${MI}${T.LAB[k]}) = 0, a zero pair. Now ${now(k)}.`,false)}
function now(k){const m=K.mi[k];return(m[0]?T.term(m[0],k,true):'')+(m[1]?(m[0]?' ':'')+T.term(-m[1],k,!m[0]):'')||'0'}
function pairsLeft(){return['x','y'].some(k=>K.mi[k][0]&&K.mi[k][1])}
function drawMinus(){const ok=!pairsLeft(),y0=top(ok?T.DONE[2]:`Now: ${now('x')} ${now('y').startsWith(MI)?now('y').replace(MI,MI+' '):'+ '+now('y')}. Cancel the zero pairs.`,ok?'ok':K.bad?'no':'');
 const rows=[['x',y0+6],['y',y0+6+(A.H-y0-14)/2]],rh=(A.H-y0-14)/2;rows.forEach(([k,y])=>{P.box(8,y,A.W-16,rh-6,'');const m=K.mi[k],n=m[0]+m[1],u=Math.max(8,Math.min((rh-30)/1.7,(A.W-90)/(n*.8+1)));
  P.text(`${T.LAB[k]} tiles`,40,y+16,12,T.COL[k][A.col.dark?1:0]);let x=70;const yb=y+rh-14;
  for(let q=0;q<m[0];q++){const [w,h]=T.tile(A,x,yb-T.size(k,u)[1],k,u,false);hit(x,yb-h,w,h,()=>cancel(k));x+=w+.25*u}x+=.4*u;
  for(let q=0;q<m[1];q++){const [w,h]=T.tile(A,x,yb-T.size(k,u)[1],k,u,true);hit(x,yb-h,w,h,()=>cancel(k));x+=w+.25*u}
  P.text(`= ${now(k)}`,A.W-44,y+16,14,P.fg())})}
/* ---------- 4. find the slips ---------- */
function judge(i){const s=K.sl,cl=T.CLAIMS[i];if(s.seen.includes(i))return say(cl.why,!cl.ok);s.seen.push(i);
 if(cl.ok){A.sound.miss();return say('This one is right. '+cl.why.replace(/^Right: /,''),true)}A.sound.pop();say('Wrong, well spotted. '+cl.why,false)}
const wrongs=()=>T.CLAIMS.filter((c,i)=>!c.ok&&K.sl.seen.includes(i)).length;
function drawSlip(){const n=wrongs(),ok=n>=4,y0=top(ok?T.DONE[3]:`Wrong ones found: ${n} of 4. Tap every piece of work that is wrong.`,ok?'ok':K.bad?'no':'');
 grid(6,y0+4,A.narrow?2:3).forEach((r,i)=>{const cl=T.CLAIMS[i],seen=K.sl.seen.includes(i);P.box(r.x,r.y,r.w,r.h,seen?(cl.ok?'ok':'no'):'');
  const L=P.wrap(cl.t,r.w-12,`800 ${P.sz(15)}px system-ui`);L.forEach((ln,j)=>P.text(ln,r.x+r.w/2,r.y+r.h/2-(L.length-1)*9+j*18-(seen?8:0),15,P.fg()));
  if(seen)P.text(cl.ok?'✓ right':'✗ wrong',r.x+r.w/2,r.y+r.h-14,13,cl.ok?(A.col.dark?'#86efac':T.OK):(A.col.dark?'#fca5a5':T.NO));hit(r.x,r.y,r.w,r.h,()=>judge(i))})}
/* ---------- 5. build the simplified form ---------- */
const DK=['x2','x','1'],TGT=T.sum(T.SRC);
function dial(k,d){const b=K.bd;b[k]=Math.max(-9,Math.min(9,b[k]+d));A.sound.tick();const m=[1,2,3].filter(x=>T.val(b,x)===T.val(TGT,x)).length;
 say(m===3?`Yours is ${T.fmt(b)}. It matches at x = 1, 2 and 3.`:`Yours is ${T.fmt(b)}. It matches at ${m} of the 3 test values.`,false)}
function drawBuild(){const b=K.bd,ok=DK.every(k=>b[k]===TGT[k]),y0=top(ok?T.DONE[4]:'Set the dials so your answer is the simplified form.',ok?'ok':K.bad?'no':'');
 P.text(T.SRC.map(([n,k],i)=>T.term(n,k,i===0)).join(' '),A.W/2,y0+14,15,P.fg());P.text(`Yours: ${T.fmt(b)}`,A.W/2,y0+40,17,P.fg());
 const tbH=Math.max(64,(A.H-y0)*.32),dy=y0+58,dh=A.H-dy-tbH-14,dw=(A.W-16)/3;
 DK.forEach((k,i)=>{const x=8+i*dw+4,w=dw-8;P.box(x,dy,w,dh,b[k]===TGT[k]&&ok?'ok':'');P.text(k==='1'?'number':T.LAB[k],x+w/2,dy+14,13,T.COL[k][A.col.dark?1:0]);
  P.text('▲ +1',x+w/2,dy+dh*.32,14,P.fg());P.text(String(b[k]).replace('-',MI),x+w/2,dy+dh*.58,22,P.fg());P.text('▼ '+MI+'1',x+w/2,dy+dh*.86,14,P.fg());
  hit(x,dy,w,dh/2,()=>dial(k,1));hit(x,dy+dh/2,w,dh/2,()=>dial(k,-1))});
 const ty=A.H-tbH-6,cw=(A.W-16)/4;['x','start','yours'].forEach((h,r)=>{const y=ty+r*tbH/3;
  for(let j=0;j<4;j++){const x=8+j*cw;if(j===0){P.text(h,x+cw/2,y+tbH/6,12,T.RIM);continue}const xv=j;
   if(r===0){P.text(String(xv),x+cw/2,y+tbH/6,13,P.fg());continue}const v=r===1?T.val(TGT,xv):T.val(b,xv),same=T.val(TGT,xv)===T.val(b,xv);
   if(r===2)P.box(x+2,y+2,cw-4,tbH/3-4,same?'ok':'no');P.text(String(v).replace('-',MI),x+cw/2,y+tbH/6,13,P.fg())}})}
/* ---------- wiring ---------- */
function draw(){const g=A.ctx;hits=[];g.fillStyle=A.col.dark?'#1e293b':'#f8fafc';g.fillRect(0,0,A.W,A.H);const m=mode();
 if(m==='quiz'){const y0=top('Challenge: collecting like terms','ok');P.text('Like terms: same letters, same powers.',A.W/2,y0+30,15,P.fg());P.text('The sign in front belongs to the term.',A.W/2,y0+58,15,P.fg());return}
 ({sort:drawSort,collect:drawCollect,minus:drawMinus,slip:drawSlip,build:drawBuild})[m]();A.fx.draw(g)}
function down(p){for(let i=hits.length-1;i>=0;i--){const h=hits[i];if(p.x>=h.x&&p.x<=h.x+h.w&&p.y>=h.y&&p.y<=h.y+h.h){h.f();return false}}return false}
function fresh(){run++;for(const k in K)delete K[k];Object.assign(K,{so:{i:0,tr:{x2:[],x:[],y:[],'1':[]},bad:null},co:{got:[]},mi:{x:[...T.PAIRS.x],y:[...T.PAIRS.y]},sl:{seen:[]},bd:{x2:0,x:0,'1':0},note:null,bad:false,test:()=>{}})}
function say(t,bad){K.note=t;K.bad=!!bad;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();K.test()}
const check=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(T.DONE[i]+A.reveal(i))};
function begin(i,ok){fresh();c.say(T.DESC[i]);A.cv.setAttribute('aria-label',T.DESC[i]);K.test=check(i,ok);controls();A.redraw()}
function demo(i,list){steps[i].go();const e=run;let t=0;list.forEach(([ms,f])=>{t+=ms;setTimeout(()=>{if(e===run)f()},t)})}
function controls(){if(!pad)return;pad.innerHTML='';const m=mode(),Bt=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn sm','aria-label':l||t},pad,t).onclick=f};
 if(m==='sort'&&K.so.i<T.SORT.length){const [n,k]=T.SORT[K.so.i];T.KINDS.forEach(q=>Bt(T.NAME[q],()=>drop(q),`Put ${T.term(n,k,true)} with the ${T.NAME[q]}`))}
 if(m==='collect')T.KINDS.filter(k=>!K.co.got.includes(k)).forEach(k=>Bt(`Collect ${T.NAME[k]}`,()=>collect(k)));
 if(m==='minus')['x','y'].forEach(k=>Bt(`Cancel ${T.LAB[k]} pair`,()=>cancel(k),`Cancel a positive and a negative ${T.LAB[k]} tile`));
 if(m==='slip')T.CLAIMS.forEach((cl,i)=>Bt(`Check ${i+1}`,()=>judge(i),`Check work ${i+1}: ${cl.t.replace(/²/g,' squared')}`));
 if(m==='build')DK.forEach(k=>{const nm=k==='1'?'number':T.LAB[k];Bt(`${nm} +1`,()=>dial(k,1),`Add 1 to the ${nm==='x²'?'x squared':nm} dial`);Bt(`${nm} ${MI}1`,()=>dial(k,-1),`Take 1 from the ${nm==='x²'?'x squared':nm} dial`)})}
const steps=[
{h:'Which terms are alike?',p:T.TXT[0],predict:{q:'Are 3x and 3x² like terms?',opts:['yes, both have x','no, the powers are different'],ans:1},task:'Sort all seven terms into their trays',
 show:()=>demo(0,T.SORT.map(([n,k])=>[350,()=>drop(k)])),go:()=>begin(0,()=>K.so.i>=T.SORT.length)},
{h:'Collect each tray',p:T.TXT[1],predict:{q:'What is 3x + 5x?',opts:['8x²','8x'],ans:1},task:'Collect all four trays',
 show:()=>demo(1,T.KINDS.map(k=>[450,()=>collect(k)])),go:()=>begin(1,()=>K.co.got.length>=4)},
{h:'Signs stay with their terms',p:T.TXT[2],predict:{q:'What is y '+MI+' 4y?',opts:['3y',MI+'3y'],ans:1},task:'Cancel every zero pair',
 show:()=>demo(2,[[400,()=>cancel('x')],[400,()=>cancel('x')],[400,()=>cancel('y')]]),go:()=>begin(2,()=>!pairsLeft())},
{h:'Spot the slips',p:T.TXT[3],task:'Find all four wrong pieces of work',
 show:()=>demo(3,[0,2,3,5].map(i=>[450,()=>judge(i)])),go:()=>begin(3,()=>wrongs()>=4)},
{h:'Simplify it yourself',p:T.TXT[4],task:'Make your answer match at x = 1, 2 and 3',
 show:()=>demo(4,[[250,()=>dial('x2',1)],...[1,2,3,4,5].map(()=>[220,()=>dial('x',1)]),[220,()=>dial('1',-1)],[220,()=>dial('1',-1)]]),go:()=>begin(4,()=>DK.every(k=>K.bd[k]===TGT[k]))},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>K.test()});
function slip(t){let m='Only like terms collect: the same letters to the same powers. Each sign stays with its term.';
 if(t==='join')m='Unlike terms cannot be joined into one. 2a + 3b stays as it is; it is not 5ab.';
 if(t==='power')m='Adding like terms never changes the power. x + x + x is 3x, three lots of x; x³ means x × x × x.';
 if(t==='number')m='A number has no letter, so it only collects with other numbers. 5y + 1 has two terms.';
 if(t==='sign')m='The sign in front of a term belongs to it. In 7m '+MI+' 3n '+MI+' 2m, the 2m is taken away: 7m '+MI+' 2m = 5m.';
 if(t==='one')m='A letter on its own means 1 of it: p is 1p. So p '+MI+' 4p = 1p '+MI+' 4p = '+MI+'3p.';
 if(t==='order')m='ab and ba are the same, because a × b = b × a. So 3ab + 2ba are like terms: 5ab.';
 return m}
function ask(){qn++;const Q=T.QS[qn%T.QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 cq.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=cq.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>reply(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function reply(t,a){cq.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=cq.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':slip(t))}
FK.shell(c,{steps,ratio:.62,tall:1.3,draw,onStep:X=>{cq.hidden=X.step!==5;pad.hidden=X.step===5;controls()},
 init:X=>{A=X;P=T.PEN(A);const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Like terms lab buttons'},w);cq=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move:()=>{},up:()=>{}});controls()}}).start()})})();
