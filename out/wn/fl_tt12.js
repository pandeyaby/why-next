/* Flagship: All times tables to 12 × 12 (ages 8–9; NC Year 4 Number – multiplication and
   division: "recall multiplication and division facts for multiplication tables up to 12 × 12").
   The learner shades the tables they already know on a 12 × 12 square and finds only 16 squares
   (10 facts) left, covers the tenth dot in every row to turn 10 × 7 into 9 × 7, joins a 1 × 12
   strip to 10 × 12 to make 11 × 12, slides a split line through a 12 × 7 array to see
   10 × 7 + 2 × 7, and hops along 12s and 7s stepping stones to read 132 ÷ 12 and 56 ÷ 7.
   Distinct from flagttfam (2, 5, 10 and fact families), flagttdbl (doubling to 3, 4, 8) and
   flagsixes (counting in 6s): this lab is about the 7, 9, 11 and 12 tables and the whole square. */
(()=>{
VIS.reg('flagtt12',c=>{
let A,ctl,chal,qx=-1;const S={};
const STAGES=['square','nine','eleven','twelve','hops','quiz'];
const KNOWN=[1,2,3,4,5,6,8,10],NEW=[7,9,11,12],ELEVEN=[11,12],HOPS=[[12,132],[7,56]];
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const now=()=>STAGES[A.step];
function put(s,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.col||A.col.tx;g.fillText(String(s),x,y,o.max||A.W-12)}
function strap(t){const g=A.ctx,px=A.narrow?13:15,out=[''];g.font=`600 ${px}px system-ui,sans-serif`;
 t.split(' ').forEach(w=>{const k=out.length-1,joined=(out[k]+' '+w).trim();if(g.measureText(joined).width>A.W-20&&out[k])out.push(w);else out[k]=joined});
 const n=Math.min(3,out.length),y0=A.H-8-n*(px+4);g.fillStyle=A.alpha(A.col.pn,.93);g.fillRect(0,y0-6,A.W,A.H-y0+6);out.slice(0,3).forEach((s,j)=>put(s,A.W/2,y0+j*(px+4)+px/2,px,{w:600}))}
const wash=(k,a)=>A.mix(A.col.pn,A.col[k],A.col.dark?a*.8:a);
function rect(x,y,w,h,k,a,line){const g=A.ctx;g.fillStyle=wash(k,a);g.fillRect(x,y,w,h);if(line!==false){g.strokeStyle=A.alpha(A.col.tx,.5);g.lineWidth=1;g.strokeRect(x+.5,y+.5,w-1,h-1)}}
const inBox=(p,b)=>!!b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
/* ---- square: shade the tables you know ---- */
function sq(){const top=A.H*.1,side=Math.min(A.W-20,A.H*.74),cell=side/13;return{x:(A.W-side)/2,y:top,cell}}
function drawSquare(){const G=sq(),C=A.col,known=n=>S.shade.includes(n);
 for(let r=1;r<=12;r++)for(let k=1;k<=12;k++){const x=G.x+k*G.cell,y=G.y+r*G.cell,on=known(r)||known(k);rect(x,y,G.cell,G.cell,on?'gr':NEW.includes(r)&&NEW.includes(k)&&S.shade.length===KNOWN.length?'am':'ln',on?.3:.08);
  if(!on&&S.shade.length===KNOWN.length)put(r*k,x+G.cell/2,y+G.cell/2,Math.max(9,G.cell*.38),{max:G.cell-2})}
 for(let i=1;i<=12;i++){const hot=known(i);rect(G.x+i*G.cell,G.y,G.cell,G.cell,hot?'gr':'cy',hot?.45:.2);rect(G.x,G.y+i*G.cell,G.cell,G.cell,hot?'gr':'cy',hot?.45:.2);
  put(i,G.x+i*G.cell+G.cell/2,G.y+G.cell/2,Math.max(10,G.cell*.45));put(i,G.x+G.cell/2,G.y+i*G.cell+G.cell/2,Math.max(10,G.cell*.45))}
 put('×',G.x+G.cell/2,G.y+G.cell/2,G.cell*.5);const left=144-cells();
 put(`squares still new: ${left}`,A.W/2,A.H*.05,A.narrow?15:18,{col:S.shade.length===KNOWN.length?C.gr:C.tx})}
function cells(){let n=0;for(let r=1;r<=12;r++)for(let k=1;k<=12;k++)if(S.shade.includes(r)||S.shade.includes(k))n++;return n}
function shade(n){if(S.shade.includes(n))return tell(`You already shaded the ${n}s.`);
 if(!KNOWN.includes(n))return tell(`The ${n}s are one of the new tables. Shade a table you already know.`,false);
 S.shade.push(n);const left=144-cells();
 if(S.shade.length===KNOWN.length){S.sqDone=true;return tell('Only 16 squares left! 7 × 9 and 9 × 7 are one fact, so that is just 10 new facts.',true)}
 tell(`${n}s shaded, along the row and down the column. ${left} squares still new.`,true)}
/* ---- nine: ten lots take one lot ---- */
function dots(){const rows=7,top=A.H*.17,gap=Math.min((A.W-60)/10,(A.H*.56)/rows);return{rows,top,gap,x0:(A.W-gap*10)/2+gap/2}}
function drawNine(){const g=A.ctx,C=A.col,D=dots();
 for(let r=0;r<D.rows;r++)for(let k=0;k<10;k++){const x=D.x0+k*D.gap,y=D.top+r*D.gap,gone=k===9&&r<S.cover;g.fillStyle=gone?wash('ln',.25):C.cy;g.beginPath();g.arc(x,y,D.gap*.32,0,7);g.fill()}
 const cx=D.x0+9*D.gap,bot=D.top+(S.cover-.5)*D.gap;g.strokeStyle=C.rd;g.lineWidth=3;g.beginPath();g.moveTo(cx,D.top-D.gap*.5);g.lineTo(cx,Math.max(D.top-D.gap*.5,bot));g.stroke();
 S.grip={x:cx,y:Math.max(D.top-D.gap*.5,bot)};g.fillStyle=C.rd;g.beginPath();g.arc(S.grip.x,S.grip.y,11,0,7);g.fill();
 put(`10 × 7 = 70, take away ${S.cover} = ${70-S.cover}`,A.W/2,A.H*.07,A.narrow?16:19,{col:S.cover===7?C.gr:C.tx});put(S.cover===7?'9 × 7 = 63':'7 rows of 10',A.W/2,D.top+D.rows*D.gap+6,A.narrow?16:18)}
function setCover(v){const n=Math.max(0,Math.min(7,Math.round(v)));if(S.nineDone){A.redraw();return}S.cover=n;
 if(n===7){S.nineDone=true;return tell('Every row lost one dot: 70 − 7 = 63. So 9 × 7 = 63. Nine lots is ten lots take away one lot.',true)}
 say(`${n} rows covered. 70 take away ${n} is ${70-n}.`);A.redraw()}
function takeOne(){tell('That takes 1 dot from one row only. 9 × 7 means 7 rows of 9, so every row loses one: take away 7, not 1.',false)}
/* ---- eleven: 10 × n and one more n ---- */
function strips(){const n=ELEVEN[S.ei]||12,u=Math.min((A.W-40)/n,A.H*.033),w=u*n,x=(A.W-w)/2,y=A.H*.17;return{n,u,w,x,y}}
function drawEleven(){const g=A.ctx,C=A.col,B=strips();
 for(let r=0;r<10;r++)rect(B.x,B.y+r*B.u,B.w,B.u,'cy',.35);put(`10 × ${B.n} = ${10*B.n}`,A.W/2,B.y-14,A.narrow?15:17);
 const sy=S.joined?B.y+10*B.u:S.sy;S.strip={x:B.x,y:sy,w:B.w,h:B.u*1.4};if(!S.elDone){rect(B.x,sy,B.w,B.u,'am',.6);put(`1 × ${B.n} = ${B.n}`,A.W/2,sy+B.u+12,A.narrow?14:15,{col:C.tx})}
 const done=ELEVEN.slice(0,S.ei).map(n=>`11 × ${n} = ${11*n}`).join('   ');put(done||'11 × 1 = 11 … 11 × 9 = 99',A.W/2,A.H*.08,A.narrow?14:16,{col:done?C.gr:C.mu,w:600});
 if(!S.joined&&!S.elDone)put('drag the strip up to join the block',A.W/2,sy+B.u+34,13,{col:C.mu,w:600})}
function join(){if(S.ei>=ELEVEN.length)return;const n=ELEVEN[S.ei];S.joined=true;A.redraw();
 setTimeout(()=>{S.ei++;S.joined=false;S.sy=A.H*.68;if(S.ei>=ELEVEN.length){S.elDone=true;return tell('11 × 11 = 121 and 11 × 12 = 132. Past 9 the "same digit twice" pattern stops, but ten lots and one more lot always works.',true)}
  tell(`${10*n} + ${n} = ${11*n}. So 11 × ${n} = ${11*n}, not ${n}${n}. Now try 11 × ${ELEVEN[S.ei]}.`,true)},A.reduced()?10:300)}
function glueDigits(){const n=ELEVEN[S.ei]||12;tell(`11 × ${n} is not ${n}${n}. That pattern only works up to 11 × 9. Join 10 × ${n} and 1 × ${n}.`,false)}
/* ---- twelve: split 12 × 7 ---- */
function arr(){const u=Math.min((A.W-40)/12,A.H*.07),x=(A.W-12*u)/2,y=A.H*.2;return{u,x,y}}
function drawTwelve(){const g=A.ctx,C=A.col,R=arr();
 for(let r=0;r<7;r++)for(let k=0;k<12;k++){g.fillStyle=k<S.cut?C.cy:C.am;g.beginPath();g.arc(R.x+(k+.5)*R.u,R.y+(r+.5)*R.u,R.u*.33,0,7);g.fill()}
 const lx=R.x+S.cut*R.u;g.strokeStyle=C.rd;g.lineWidth=3;g.beginPath();g.moveTo(lx,R.y-10);g.lineTo(lx,R.y+7*R.u+10);g.stroke();S.knob={x:lx,y:R.y+7*R.u+20};g.fillStyle=C.rd;g.beginPath();g.arc(lx,S.knob.y,12,0,7);g.fill();
 const a=S.cut*7,b=(12-S.cut)*7;put(`${S.cut} × 7 + ${12-S.cut} × 7 = ${a} + ${b} = 84`,A.W/2,A.H*.08,A.narrow?14:17,{col:S.cut===10?C.gr:C.tx});
 put(S.cut===10?'tens and twos: 70 + 14':'slide the red line',A.W/2,R.y+7*R.u+48,A.narrow?14:16,{w:600,col:S.cut===10?C.gr:C.mu})}
function setCut(v){S.cut=Math.max(1,Math.min(11,Math.round(v)));if(S.twDone){A.redraw();return}
 if(S.cut===10){S.twDone=true;return tell('10 × 7 = 70 and 2 × 7 = 14, so 12 × 7 = 84. Twelve lots is ten lots and two lots.',true)}
 say(`${S.cut} × 7 and ${12-S.cut} × 7. Find the split that gives easy tens.`);A.redraw()}
function addTwo(){tell('70 + 2 = 72 adds only two dots. 12 × 7 is 7 rows of 12: each row gets 2 more, so add 2 × 7 = 14.',false)}
/* ---- hops: division on stepping stones ---- */
function stone(i){const cols=A.narrow?4:6,w=(A.W-24)/cols,h=A.narrow?44:42;return{x:12+(i%cols)*w+3,y:A.H*.3+Math.floor(i/cols)*(h+8),w:w-6,h}}
function drawHops(){const C=A.col,job=HOPS[S.hi];
 if(!job){put('132 ÷ 12 = 11 and 56 ÷ 7 = 8',A.W/2,A.H*.15,A.narrow?16:19,{col:C.gr});return}
 const[t,target]=job;put(`${target} ÷ ${t} = ?`,A.W/2,A.H*.08,A.narrow?20:24);put(`Hop in ${t}s. Tap the stone that says ${target}.`,A.W/2,A.H*.17,A.narrow?13:15,{w:600,col:C.mu});
 for(let i=0;i<12;i++){const b=stone(i),v=t*(i+1),seen=i<S.at;rect(b.x,b.y,b.w,b.h,seen?'gr':i===S.at?'am':'cy',seen?.3:i===S.at?.3:.14);put(seen?`${i+1} × ${t} = ${v}`:i===S.at?'next':'?',b.x+b.w/2,b.y+b.h/2,A.narrow?12:14,{max:b.w-4})}}
function hop(i){const job=HOPS[S.hi];if(!job)return;const[t,target]=job,v=t*(i+1);
 if(i>S.at)return tell(`Hop one stone at a time. The next stone is ${S.at+1} × ${t}.`,false);
 if(i<S.at)return tell(`You have passed ${v}. Keep hopping forward.`,false);
 S.at++;if(v<target)return tell(`${S.at} × ${t} = ${v}. Too small: keep hopping.`);
 S.hi++;S.at=0;if(S.hi>=HOPS.length){S.hopDone=true;return tell(`${target} ÷ ${t} = ${i+1}, because ${i+1} × ${t} = ${target}. Every times fact gives a division fact.`,true)}
 tell(`${i+1} hops: ${target} ÷ ${t} = ${i+1}. Now find ${HOPS[S.hi][1]} ÷ ${HOPS[S.hi][0]}.`,true)}
function minus(){const job=HOPS[S.hi];if(!job)return;tell(`${job[1]} ÷ ${job[0]} is not ${job[1]} − ${job[0]} = ${job[1]-job[0]}. Dividing asks how many ${job[0]}s make ${job[1]}.`,false)}
/* ---- frame ---- */
function draw(){const{ctx:g,W:w,H:h,col:C}=A,k=now();g.fillStyle=A.mix(C.pn,C.vi,C.dark?.04:.05);g.fillRect(0,0,w,h);
 if(k==='quiz'){put('12 × 12 facts check',w/2,h*.42,A.narrow?18:21);put('Answer below',w/2,h*.55,14,{col:C.mu,w:500});A.fx.draw(g);return}
 ({square:drawSquare,nine:drawNine,eleven:drawEleven,twelve:drawTwelve,hops:drawHops})[k]();if(S.msg)strap(S.msg);A.fx.draw(g)}
function tell(t,good){S.msg=t;if(good)A.sound.pop();else if(good===false)A.sound.miss();say(t);pads();A.redraw();S.after&&S.after()}
function fresh(){for(const k in S)delete S[k];Object.assign(S,{shade:[],cover:0,ei:0,sy:A.H*.68,cut:6,hi:0,at:0,msg:'',after:()=>{}});A.redraw()}
function pads(){if(!ctl)return;ctl.innerHTML='';const k=now();if(k==='quiz')return;
 const add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn',style:'min-height:48px;padding:8px 12px','aria-label':l||t},ctl,t).onclick=f};
 if(k==='square'&&!S.sqDone){KNOWN.forEach(n=>{if(!S.shade.includes(n))add(`Shade the ${n}s`,()=>shade(n))});add('Shade the 7s',()=>shade(7))}
 if(k==='nine'&&!S.nineDone){add('Cover one more row',()=>setCover(S.cover+1));add('Take away just 1',takeOne)}
 if(k==='eleven'&&!S.elDone){add(`Join 1 × ${ELEVEN[S.ei]} to 10 × ${ELEVEN[S.ei]}`,join);add(`Write ${ELEVEN[S.ei]}${ELEVEN[S.ei]}`,glueDigits)}
 if(k==='twelve'&&!S.twDone){add('Split line left',()=>setCut(S.cut-1));add('Split line right',()=>setCut(S.cut+1));add('Just add 2',addTwo)}
 if(k==='hops'&&HOPS[S.hi]){const[t]=HOPS[S.hi];add(`Hop to ${S.at+1} × ${t}`,()=>hop(S.at));add(`Take ${t} away`,minus)}}
function down(p){const k=now();if(k==='quiz')return false;
 if(k==='square'){const G=sq();for(let i=1;i<=12;i++){if(inBox(p,{x:G.x+i*G.cell,y:G.y,w:G.cell,h:G.cell})||inBox(p,{x:G.x,y:G.y+i*G.cell,w:G.cell,h:G.cell})){shade(i);return true}}
  const r=Math.floor((p.y-G.y)/G.cell),q=Math.floor((p.x-G.x)/G.cell);if(r>=1&&r<=12&&q>=1&&q<=12){shade(KNOWN.includes(r)?r:q);return true}return false}
 if(k==='nine'){if(S.grip&&Math.hypot(p.x-S.grip.x,p.y-S.grip.y)<34){S.grab='cover';return true}return false}
 if(k==='eleven'){if(!S.joined&&inBox(p,{x:S.strip.x,y:S.strip.y-16,w:S.strip.w,h:S.strip.h+32})){S.grab='strip';return true}return false}
 if(k==='twelve'){if(S.knob&&Math.hypot(p.x-S.knob.x,p.y-S.knob.y)<34){S.grab='cut';return true}return false}
 if(k==='hops'&&HOPS[S.hi]){for(let i=0;i<12;i++)if(inBox(p,stone(i))){hop(i);return true}}
 return false}
function move(p){const D=dots(),B=strips(),R=arr();
 if(S.grab==='cover')setCover((p.y-D.top)/D.gap+.5);
 else if(S.grab==='strip'){S.sy=Math.max(B.y+10*B.u,Math.min(A.H*.72,p.y));if(S.sy<=B.y+10*B.u+B.u*1.2){S.grab=null;join()}else A.redraw()}
 else if(S.grab==='cut')setCut((p.x-R.x)/R.u)}
function up(){S.grab=null}
const okWhen=(i,ok,line)=>()=>{if(A.step===i&&!A.isDone&&A.pred[i]!=null&&ok())A.done(line()+A.reveal(i))};
function auto(i,acts,ms){steps[i].go();acts.forEach((f,j)=>setTimeout(()=>{if(A.step===i)f()},A.reduced()?30*(j+1):(j+1)*(ms||380)))}
function begin(i,hint,ok,line){fresh();tell(hint);S.after=okWhen(i,ok,line)}
const steps=[
{h:'You know most of the square',p:'The 12 × 12 square has 144 facts. You already know the 1s, 2s, 3s, 4s, 5s, 6s, 8s and 10s. A fact and its turnaround, like 3 × 7 and 7 × 3, have the same answer.',
 predict:{q:'Once those tables are shaded, how many of the 144 squares are still new?',opts:['about 100','only 16'],ans:1},
 task:'Shade all eight tables you know',show:()=>auto(0,KNOWN.map(n=>()=>shade(n))),
 go:()=>begin(0,'Tap a number on the edge of the square to shade that table.',()=>S.sqDone,()=>'16 squares, 10 new facts.')},
{h:'9s: ten lots take one lot',p:'9 × 7 is 7 lots of 9. Each 9 is one less than 10. So find 10 × 7, then take away one 7.',
 predict:{q:'9 × 7 is 10 × 7 take away…',opts:['1','7'],ans:1},
 task:'Cover the tenth dot in every row',show:()=>auto(1,[1,2,3,4,5,6,7].map(n=>()=>setCover(n))),
 go:()=>begin(1,'Drag the red dot down the last column.',()=>S.nineDone,()=>'9 × 7 = 63.')},
{h:'11s: ten lots and one more lot',p:'Up to 11 × 9 the answer is the digit twice: 11 × 4 = 44. After that, use 10 lots and 1 more lot.',
 predict:{q:'What is 11 × 12?',opts:['1212','132','122'],ans:1},
 task:'Make 11 × 11 and 11 × 12',show:()=>auto(2,[join,join]),
 go:()=>begin(2,'Drag the orange strip up to join the block.',()=>S.elDone,()=>'121 and 132.')},
{h:'12s: ten lots and two lots',p:'12 is 10 and 2. So 12 × 7 is 10 × 7 and 2 × 7 put together.',
 predict:{q:'12 × 7 is 10 × 7 plus…',opts:['2','14'],ans:1},
 task:'Split 12 × 7 into tens and twos',show:()=>auto(3,[()=>setCut(8),()=>setCut(9),()=>setCut(10)]),
 go:()=>begin(3,'Drag the red knob to move the split line.',()=>S.twDone,()=>'70 + 14 = 84.')},
{h:'Division facts for free',p:'Each times fact gives a division fact. 11 × 12 = 132, so 132 ÷ 12 = 11. To divide, count how many hops of 12 reach 132.',
 predict:{q:'132 ÷ 12 = ?',opts:['11','120'],ans:0},
 task:'Find 132 ÷ 12 and 56 ÷ 7',show:()=>auto(4,[...Array(11)].map((_,i)=>()=>hop(i)).concat([...Array(8)].map((_,i)=>()=>hop(i))),150),
 go:()=>begin(4,'Tap the next stone to hop.',()=>S.hopDone,()=>'11 and 8.')},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.after()});
const QS=[
 ['9 × 6 = ?',[['54','ok'],['59','one'],['56','near']]],
 ['12 × 6 = ?',[['72','ok'],['62','two'],['66','near']]],
 ['11 × 12 = ?',[['132','ok'],['1212','join'],['122','near']]],
 ['132 ÷ 11 = ?',[['12','ok'],['121','sub'],['143','sub']]],
 ['7 × 8 = ?',[['56','ok'],['15','add'],['54','near']]],
 ['You know 8 × 7 = 56. What is 7 × 8?',[['56','ok'],['a new fact to learn','turn'],['78','add']]],
 ['9 × 12 = ?',[['108','ok'],['119','one'],['118','one']]],
 ['84 ÷ 7 = ?',[['12','ok'],['77','sub'],['11','near']]]];
function why(t){let m='Use a fact you know and adjust it.';
 if(t==='one')m='Nine lots is ten lots take away one LOT, not take away 1. 9 × 6 = 60 − 6.';
 if(t==='two')m='Twelve lots is ten lots and two LOTS: 12 × 6 = 60 + 12, not 60 + 2.';
 if(t==='join')m='The double-digit pattern stops after 11 × 9. 11 × 12 = 120 + 12 = 132.';
 if(t==='sub')m='Dividing is not taking away once. Ask: how many of these make the total?';
 if(t==='add')m='That adds the numbers. Times means groups: 7 × 8 is 7 groups of 8.';
 if(t==='near')m='Close, but a near fact. Check with a fact you know, like 10 × or 5 ×.';
 if(t==='turn')m='A turnaround has the same answer: 7 × 8 = 8 × 7. It is not a new fact.';
 return m}
function ask(){qx++;const Q=QS[qx%QS.length],r=qx%3,opts=[...Q[1].slice(r),...Q[1].slice(0,r)];
 chal.innerHTML=`<p><b>${Q[0]}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');opts.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn',style:'min-height:48px'},row,v).onclick=()=>check(t)});say('Challenge: '+Q[0]);A.redraw()}
function check(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok)A.win();else A.sound.miss();fb.innerHTML=(ok?'✓ Yes! ':'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.72,tall:1.3,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;pads()},
 init:A=>{fresh();const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Times table buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up});pads()}});
A.start()})})();
