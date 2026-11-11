/* Flagship: Times tables for 3, 4 and 8 (ages 7–8; NC Year 3 Number – multiplication and
   division: recall and use multiplication and division facts for the 3, 4 and 8
   multiplication tables; connect the 2, 4 and 8 tables by doubling).
   The learner doubles 2s arrays into 4s arrays, climbs a doubling ladder from 1 × 7 to
   8 × 7, splits a 3-row array into 2 rows and 1 row to build 3 × 8 from facts they know,
   finds missing factors (? × 4 = 32) on a number dial with too-big / too-small feedback,
   and sorts numbers into the 8s table, catching the "every 4s number is an 8s number" myth.
   Distinct from flagfours (hopping in 4s and 8s along a line) and flagttfam (2, 5, 10
   facts and fact families): this lab derives the 3, 4 and 8 facts by doubling and splitting. */
(()=>{
VIS.reg('flagttdbl',c=>{
let A,ctl,chal,qn=-1;const S={};
const PG=['four','eight','three','missing','sort','quiz'];
const DBL=[3,7,9],LAD=[1,2,4,8],MISS=[[4,32,8],[8,56,7],[3,27,9]];
const SORT=[[24,1],[28,0],[40,1],[36,0],[56,1],[12,0]];
const tell=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const now=()=>PG[A.step];
function T(s,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.a||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(String(s),x,y,o.m||A.W-16)}
function foot(t,y){const g=A.ctx,px=A.narrow?13:15,rows=[''];g.font=`600 ${px}px system-ui,sans-serif`;
 for(const w of t.split(' ')){const i=rows.length-1,s=(rows[i]+' '+w).trim();if(g.measureText(s).width>A.W-20&&rows[i])rows.push(w);else rows[i]=s}
 const k=Math.min(3,rows.length);rows.slice(0,3).forEach((s,j)=>T(s,A.W/2,y+(j-(k-1)/2)*(px+4),px,{w:600}))}
const wash=(k,a)=>A.mix(A.col.pn,A.col[k],A.col.dark?a*.8:a);
function card(b,k,a,label,px){const g=A.ctx;g.fillStyle=wash(k,a);A.paint.rrect(b.x,b.y,b.w,b.h,10);g.fill();g.strokeStyle=A.col.tx;g.lineWidth=1.5;g.stroke();if(label!=null)T(label,b.x+b.w/2,b.y+b.h/2,px||18)}
const inBox=(p,b)=>b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
/* an array of dots: rows × cols inside a box; rows past `split` drawn in a second colour */
function dots(rows,cols,bx,by,bw,bh,split,kA,kB){const g=A.ctx,s=Math.min(bw/cols,bh/rows),r=Math.max(3,s*.34);
 for(let i=0;i<rows;i++)for(let j=0;j<cols;j++){g.fillStyle=A.col[split!=null&&i>=split?kB:kA];g.beginPath();g.arc(bx+(j+.5)*s,by+(i+.5)*s,r,0,7);g.fill()}return s}
/* ---- four: double the 2s ---- */
function paintFour(){const C=A.col,n=DBL[Math.min(S.di,2)],dup=S.dupd;
 if(S.di>=3){T('4 × 3 = 12, 4 × 7 = 28, 4 × 9 = 36',A.W/2,A.H*.4,A.narrow?16:20,{c:C.gr});return}
 T(dup?`4 × ${n} = ${4*n}: ${2*n} + ${2*n}`:`2 × ${n} = ${2*n}`,A.W/2,A.H*.08,A.narrow?20:24,{c:dup?C.gr:C.tx});
 const bw=Math.min(A.W-40,n*34),bx=A.W/2-bw/2,s=bw/n;dots(2,n,bx,A.H*.16,bw,2*s,null,'cy','cy');
 S.copy={x:bx-6,y:A.H*.16-6,w:bw+12,h:2*s+12};const ty=A.H*.16+2*s+10;
 if(dup)dots(2,n,bx,ty,bw,2*s,null,'vi','vi');else{const g=A.ctx;g.setLineDash([5,5]);g.strokeStyle=C.mu;g.lineWidth=2;g.strokeRect(bx-6,ty-6,bw+12,2*s+12);g.setLineDash([]);T('drop the copy here',A.W/2,ty+s,14,{c:C.mu,w:600})}
 S.slot={x:bx-6,y:ty-6,w:bw+12,h:2*s+12};if(S.ghost)dots(2,n,S.ghost.x-bw/2,S.ghost.y-s,bw,2*s,null,'vi','vi');
 if(!dup)T('drag the 2 rows down',A.W/2,A.H*.16-14>20?A.H*.16-14:A.H*.16+2*s+2,13,{c:C.mu,w:600})}
function doubleIt(){if(S.di>=3)return;const n=DBL[S.di];if(!S.dupd){S.dupd=true;S.ghost=null;return speak(`Doubled: 2 × ${n} = ${2*n}, so 4 × ${n} = ${2*n} + ${2*n} = ${4*n}. Tap Next fact.`,true)}
 S.di++;S.dupd=false;if(S.di>=3){S.fourDone=true;return speak('Three 4s facts, each double a 2s fact.',true)}speak(`Now 2 × ${DBL[S.di]} = ${2*DBL[S.di]}. Double it.`)}
/* ---- eight: the doubling ladder ---- */
function rung(i){const h=A.narrow?52:56,w=A.narrow?A.W-40:A.W*.6;return{x:A.W/2-w/2,y:A.H*.72-i*(h+12),w,h}}
function paintEight(){const C=A.col;T('Double, double, double: 1 × 7 to 8 × 7',A.W/2,A.H*.06,A.narrow?15:18);
 LAD.forEach((k,i)=>{const b=rung(i),on=i<=S.lv;card(b,on?(i===3?'gr':'cy'):'ln',on?.3:.08,on?`${k} × 7 = ${k*7}`:`${k} × 7 = ?`,A.narrow?19:22);
  if(i>0&&on)T(`= double ${LAD[i-1]*7}`,b.x+b.w-10,b.y+b.h/2,12,{a:'right',c:C.mu,w:600})})}
function climb(){if(S.lv>=3)return;S.lv++;const k=LAD[S.lv];
 if(S.lv===3){S.top=true;return speak('28 doubled is 56. So 8 × 7 = 56. The 8s are double the 4s, and the 4s are double the 2s.',true)}
 speak(`${LAD[S.lv-1]} × 7 = ${LAD[S.lv-1]*7}. Double it: ${k} × 7 = ${k*7}.`,true)}
/* ---- three: split 3 rows into 2 rows + 1 row ---- */
function grid3(){const cols=8,s=Math.min((A.W-96)/cols,A.H*.13),bw=s*cols;return{x:A.W/2-bw/2-14,y:A.H*.2,s,bw}}
function paintThree(){const C=A.col,G=grid3(),k=S.cut,g=A.ctx;
 T(k===0||k===3?'3 × 8 = ?':`${k} × 8 = ${k*8} and ${3-k} × 8 = ${(3-k)*8}`,A.W/2,A.H*.08,A.narrow?17:21,{c:k===1||k===2?C.gr:C.tx});
 dots(3,8,G.x,G.y,G.bw,3*G.s,k,'cy','am');const ly=G.y+k*G.s;g.strokeStyle=C.rd;g.lineWidth=3;g.beginPath();g.moveTo(G.x-14,ly);g.lineTo(G.x+G.bw+14,ly);g.stroke();
 g.fillStyle=C.rd;g.beginPath();g.arc(G.x+G.bw+22,ly,11,0,7);g.fill();S.knob={x:G.x+G.bw+22,y:ly};
 T(k===1||k===2?`${k*8} + ${(3-k)*8} = 24, so 3 × 8 = 24`:'drag the red line between the rows',A.W/2,G.y+3*G.s+30,A.narrow?15:17,{c:k===1||k===2?C.gr:C.mu})}
function setCut(k){k=Math.max(0,Math.min(3,k));if(k===S.cut)return;S.cut=k;
 if(k===1||k===2){S.split=true;return speak(`${k} × 8 = ${k*8} and ${3-k} × 8 = ${(3-k)*8}. Add them: 3 × 8 = 24.`,true)}
 speak('The line is at the edge, so nothing is split. Move it between two rows.')}
/* ---- missing factor dial ---- */
function dial(i){const cols=A.narrow?4:6,w=(A.W-30-(cols-1)*8)/cols,h=46,r=Math.floor(i/cols),cc=i%cols;return{x:15+cc*(w+8),y:A.H*.42+r*(h+8),w,h}}
function paintMissing(){const C=A.col,f=MISS[Math.min(S.mi,2)];if(S.mi>=3){T('8 × 4 = 32, 7 × 8 = 56, 9 × 3 = 27',A.W/2,A.H*.3,A.narrow?16:20,{c:C.gr});return}
 T(`? × ${f[0]} = ${f[1]}   (${f[1]} ÷ ${f[0]})`,A.W/2,A.H*.08,A.narrow?20:24);
 if(S.try){const v=S.try,got=v*f[0];T(`${v} × ${f[0]} = ${got}`,A.W/2,A.H*.2,A.narrow?18:22,{c:got===f[1]?C.gr:C.tx});
  const bw=A.W-60;const g=A.ctx;g.fillStyle=wash('ln',.25);g.fillRect(30,A.H*.28,bw,16);g.fillStyle=got===f[1]?C.gr:C.cy;g.fillRect(30,A.H*.28,bw*Math.min(1.25,got/f[1])/1.25,16);
  g.strokeStyle=C.tx;g.lineWidth=2;const tx=30+bw/1.25;g.beginPath();g.moveTo(tx,A.H*.26);g.lineTo(tx,A.H*.33);g.stroke();T(f[1],tx,A.H*.36,13,{w:600})}
 for(let i=0;i<12;i++)card(dial(i),'cy',S.try===i+1?.4:.14,i+1,18)}
function tryN(v){if(S.mi>=3)return;const[k,big,ans]=MISS[S.mi];S.try=v;const got=v*k;
 if(v===ans){S.mi++;S.try=null;if(S.mi>=3){S.missDone=true;return speak('32 ÷ 4 = 8, 56 ÷ 8 = 7, 27 ÷ 3 = 9. Each division fact undoes a times fact.',true)}
  return speak(`${v} × ${k} = ${big}, so ${big} ÷ ${k} = ${v}. Next one.`,true)}
 speak(got<big?`${v} × ${k} = ${got}: too small by ${big-got}, that is ${(big-got)/k} more ${k}s.`:`${v} × ${k} = ${got}: too big by ${got-big}. Go down.`,false)}
/* ---- sort: in the 8s table? ---- */
function bin(i){const w=(A.W-36)/2;return{x:12+i*(w+12),y:A.H*.5,w,h:A.H*.3}}
function paintSort(){const C=A.col;T('Is it in the 8 times table?',A.W/2,A.H*.07,A.narrow?17:20);
 ['in the 8s table','not in the 8s table'].forEach((t,i)=>{const b=bin(i);card(b,i?'am':'gr',.14);T(t,b.x+b.w/2,b.y+16,14,{w:600});
  S.placed.filter(p=>p[1]===i).forEach((p,j)=>T(p[0],b.x+20+(j%3)*((b.w-40)/2),b.y+48+Math.floor(j/3)*30,18))});
 const cur=SORT[S.si];if(cur){const p=S.hold||{x:A.W/2,y:A.H*.27};card({x:p.x-36,y:p.y-24,w:72,h:48},'vi',.35,cur[0],22);if(!S.hold)T('drag me to a box',A.W/2,A.H*.27+36,13,{c:C.mu,w:600})}
 else T('All sorted!',A.W/2,A.H*.27,20,{c:C.gr})}
function place(i){const cur=SORT[S.si];if(!cur)return;S.hold=null;const[v,in8]=cur;
 if((i===0)!==(in8===1)){if(in8)return speak(`${v} is 8 × ${v/8}, so it is in the 8s table.`,false);
  if(v%4===0)return speak(`${v} is 4 × ${v/4}, but 8s are only every other 4s number: 8, 16, 24, 32, 40, 48, 56.`,false);return speak(`${v} is not a multiple of 8.`,false)}
 S.placed.push([v,i]);S.si++;if(S.si>=SORT.length){S.sorted=true;return speak('24, 40 and 56 are in the 8s. 28, 36 and 12 are 4s numbers that are not 8s numbers.',true)}
 speak(in8?`Yes: ${v} = 8 × ${v/8}.`:`Yes: ${v} is not in the 8s table.`,true)}
/* ---- frame ---- */
function paint(){const{ctx:g,W,H,col:C}=A,k=now();g.fillStyle=A.mix(C.pn,C.cy,C.dark?.05:.05);g.fillRect(0,0,W,H);
 if(k==='quiz'){T('Fact check',W/2,H*.42,A.narrow?19:22);T('Answer below',W/2,H*.55,14,{c:C.mu,w:500});A.fx.draw(g);return}
 ({four:paintFour,eight:paintEight,three:paintThree,missing:paintMissing,sort:paintSort})[k]();if(S.msg)foot(S.msg,H*.92);A.fx.draw(g)}
function speak(t,good){S.msg=t;if(good)A.sound.pop();else if(good===false)A.sound.miss();tell(t);pads();A.redraw();S.after&&S.after()}
function fresh(){for(const k in S)delete S[k];Object.assign(S,{di:0,dupd:false,lv:0,cut:0,mi:0,try:null,si:0,placed:[],msg:'',after:()=>{}});A.redraw()}
function pads(){if(!ctl)return;ctl.innerHTML='';const k=now();if(k==='quiz')return;
 const add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn',style:'min-height:48px;padding:8px 12px','aria-label':l||t},ctl,t).onclick=f};
 if(k==='four'&&S.di<3)add(S.dupd?'Next fact':'Double it',doubleIt);
 if(k==='eight'&&S.lv<3)add(`Double to ${LAD[S.lv+1]} × 7`,climb);
 if(k==='three'){add('Move line up',()=>setCut(S.cut-1));add('Move line down',()=>setCut(S.cut+1))}
 if(k==='missing'&&S.mi<3)for(let v=1;v<=12;v++)add(String(v),()=>tryN(v),`Try ${v} × ${MISS[S.mi][0]}`);
 if(k==='sort'&&SORT[S.si]){add('In the 8s',()=>place(0),`${SORT[S.si][0]}: in the 8s table`);add('Not in the 8s',()=>place(1),`${SORT[S.si][0]}: not in the 8s table`)}}
function down(p){const k=now();if(k==='quiz')return false;
 if(k==='four'){if(!S.dupd&&inBox(p,S.copy)){S.ghost={x:p.x,y:p.y,sy:p.y};return true}if(S.dupd&&inBox(p,S.slot)){doubleIt();return true}return false}
 if(k==='eight'){if(S.lv<3&&inBox(p,rung(S.lv+1))){climb();return true}return false}
 if(k==='three'){if(S.knob&&Math.hypot(p.x-S.knob.x,p.y-S.knob.y)<30){S.drag3=true;return true}return false}
 if(k==='missing'){for(let i=0;i<12;i++)if(inBox(p,dial(i))){tryN(i+1);return true}return false}
 if(k==='sort'&&SORT[S.si]){const at=S.hold||{x:A.W/2,y:A.H*.27};if(Math.abs(p.x-at.x)<44&&Math.abs(p.y-at.y)<30){S.hold={x:p.x,y:p.y};return true}for(let i=0;i<2;i++)if(inBox(p,bin(i))){place(i);return true}}
 return false}
function move(p){if(S.ghost){S.ghost.x=p.x;S.ghost.y=p.y;A.redraw()}else if(S.drag3){const G=grid3();setCut(Math.round((p.y-G.y)/G.s));A.redraw()}else if(S.hold){S.hold={x:p.x,y:p.y};A.redraw()}}
function up(p){if(S.ghost){const gh=S.ghost;S.ghost=null;if(inBox(gh,S.slot)||(p&&inBox(p,S.slot)))doubleIt();else A.redraw();return}
 if(S.drag3){S.drag3=false;return}if(S.hold){const i=[0,1].find(j=>inBox(S.hold,bin(j)));if(i!=null)place(i);else{S.hold=null;A.redraw()}}}
const watch=(i,ok,line)=>()=>{if(A.step===i&&!A.isDone&&A.pred[i]!=null&&ok())A.done(line()+A.reveal(i))};
function auto(i,acts){steps[i].go();acts.forEach((f,j)=>setTimeout(()=>{if(A.step===i)f()},A.reduced()?20*(j+1):(j+1)*320))}
function open(i,hint,ok,line){fresh();speak(hint);S.after=watch(i,ok,line)}
const steps=[
{h:'4s are double 2s',p:'4 is double 2. So every 4s fact is double the 2s fact with the same number: 2 × 7 = 14, so 4 × 7 = 28.',
 predict:{q:'2 × 7 = 14. What is 4 × 7?',opts:['16','28','11'],ans:1},
 task:'Double three 2s facts',show:()=>auto(0,[doubleIt,doubleIt,doubleIt,doubleIt,doubleIt,doubleIt]),
 go:()=>open(0,'Drag the two rows down to copy them, or tap Double it.',()=>S.fourDone,()=>'Each 4s fact is double a 2s fact.')},
{h:'8s are double 4s',p:'8 is double 4. Double three times and 1 × 7 becomes 8 × 7: 7, 14, 28, 56.',
 predict:{q:'4 × 6 = 24. What is 8 × 6?',opts:['28','30','48'],ans:2},
 task:'Climb the ladder to 8 × 7',show:()=>auto(1,[climb,climb,climb]),
 go:()=>open(1,'Tap the next rung to double.',()=>S.top,()=>'8 × 7 = 56.')},
{h:'3s: 2 lots and 1 more',p:'3 rows is 2 rows and 1 more row. So 3 × 8 is 2 × 8 add 1 × 8: 16 + 8 = 24.',
 predict:{q:'3 × 8 is 2 × 8 and one more…',opts:['3','8','1'],ans:1},
 task:'Split the array to find 3 × 8',show:()=>auto(2,[()=>setCut(1),()=>setCut(2)]),
 go:()=>open(2,'Drag the red dot to move the line.',()=>S.split,()=>'3 × 8 = 24.')},
{h:'Division: the missing number',p:'32 ÷ 4 asks: what times 4 makes 32? Try a fact, check if it is too big or too small, and use the 4s facts you know.',
 predict:{q:'What is 36 ÷ 4?',opts:['9','32','40'],ans:0},
 task:'Find three missing numbers',show:()=>auto(3,MISS.map(f=>()=>tryN(f[2]))),
 go:()=>open(3,'Tap a number to try it.',()=>S.missDone,()=>'Three division facts found.')},
{h:'Is it an 8s number?',p:'Every 8s number is also a 4s number, because 8 is two 4s. But only every other 4s number is an 8s number.',
 predict:{q:'Is every number in the 4s table also in the 8s table?',opts:['yes, 8 is made of 4s','no, only every other one'],ans:1},
 task:'Sort all six numbers',show:()=>auto(4,SORT.map(s=>()=>place(s[1]?0:1))),
 go:()=>open(4,'Drag the number into a box, or use the buttons.',()=>S.sorted,()=>'Sorted.')},
{h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.after()});
const QS=[
 ['What is 8 × 7?',[['56','ok'],['15','add'],['54','near']]],
 ['4 × 9 = 36. What is 8 × 9?',[['72','ok'],['40','dbl'],['45','dbl']]],
 ['What is 3 × 6?',[['18','ok'],['15','three'],['9','add']]],
 ['What is 24 ÷ 3?',[['8','ok'],['21','sub'],['72','mul']]],
 ['What is 48 ÷ 8?',[['6','ok'],['40','sub'],['7','near']]],
 ['Which number is in the 8s table?',[['32','ok'],['28','four8'],['36','four8']]],
 ['2 × 12 = 24. What is 4 × 12?',[['48','ok'],['26','dbl'],['28','dbl']]]];
function why(t){let m='Use a fact you know and double, split or undo it.';
 if(t==='add')m='You added the two numbers. 8 × 7 means 8 groups of 7, not 8 + 7.';
 if(t==='dbl')m='Double the whole answer: the 8s are double the 4s, and the 4s are double the 2s.';
 if(t==='three')m='3 lots is 2 lots and 1 more lot of the same number: 3 × 6 = 12 + 6.';
 if(t==='sub')m='You took away. Division asks: what times the small number makes the big one?';
 if(t==='mul')m='You multiplied. To divide, find the missing number in ? × 3 = 24.';
 if(t==='near')m='Close, but check it: multiply your answer back and see if you get the number.';
 if(t==='four8')m='That is a 4s number, but not an 8s number. The 8s are every other 4s number.';
 return m}
function quiz(){qn++;const Q=QS[qn%QS.length],r=qn%3,opts=[...Q[1].slice(r),...Q[1].slice(0,r)];
 chal.innerHTML=`<p><b>${Q[0]}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');opts.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn',style:'min-height:48px;min-width:56px'},row,v).onclick=()=>judge(t)});tell('Challenge: '+Q[0]);A.redraw()}
function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok)A.win();else A.sound.miss();fb.innerHTML=(ok?'✓ Yes! ':'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.7,tall:1.35,draw:paint,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;pads()},
 init:A=>{fresh();const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Times table buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up});pads()}});
A.start()})})();
