/* Flagship: Times tables for 2, 5 and 10 (ages 6–7; NC Year 2 Number – multiplication and
   division: recall and use multiplication and division facts for the 2, 5 and 10 tables;
   show that multiplication can be done in any order and division cannot).
   The learner makes 6 × 10 with 10p coins (every 10s fact ends in 0), cuts six tens sticks
   in half to see that 5 × 6 is half of 10 × 6, parks 7 bikes to see 2 × 7 as double 7,
   fills a fact family (3 × 5, 5 × 3, 15 ÷ 5, 15 ÷ 3) from one triangle, and covers a corner
   of a triangle to read division facts.
   Distinct from flagskip (counting in 2s, 5s, 10s along a track), flagsym (what × ÷ = mean)
   and flagcommul (flipping arrays): this lab is about recalling facts and deriving division
   facts from them. */
(()=>{
VIS.reg('flagttfam',c=>{
let A,pad,qa,q=-1;const S={};c.fig.classList.add('young');
const PAGES=['tens','fives','twos','family','divide','quiz'];
const FAM=[{t:'3 × 5 =',a:15},{t:'5 × 3 =',a:15},{t:'15 ÷ 5 =',a:3},{t:'15 ÷ 3 =',a:5}];
const COVER=[{big:20,known:2,ans:10,cards:[10,18,40]},{big:50,known:10,ans:5,cards:[40,5,500]},{big:35,known:5,ans:7,cards:[30,6,7]}];
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const pg=()=>PAGES[A.step];
function txt(s,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(String(s),x,y,o.max||A.W-16)}
function wrapTxt(t,y){const g=A.ctx,px=A.narrow?14:16,lines=[''];g.font=`600 ${px}px system-ui,sans-serif`;
 t.split(' ').forEach(w=>{const i=lines.length-1,s=(lines[i]+' '+w).trim();if(g.measureText(s).width>A.W-20&&lines[i])lines.push(w);else lines[i]=s});
 const n=Math.min(3,lines.length);lines.slice(0,3).forEach((s,j)=>txt(s,A.W/2,y+(j-(n-1)/2)*(px+4),px,{w:600}))}
const tint=(k,a)=>A.mix(A.col.pn,A.col[k],A.col.dark?a*.8:a);
function box(x,y,w,h,k,a,r){const g=A.ctx;g.fillStyle=tint(k,a);A.paint.rrect(x,y,w,h,r||12);g.fill();g.strokeStyle=A.col.tx;g.lineWidth=1.5;g.stroke()}
const hit=(p,b)=>b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
/* ---- tens: 10p coins ---- */
function coinAt(i){const per=A.narrow?5:10,r=A.narrow?24:26,gap=r*2+10,row=Math.floor(i/per),col=i%per,w=Math.min(per,10)*gap;return{x:A.W/2-w/2+gap/2+col*gap,y:A.H*.36+row*(gap),r}}
function paintTens(){const C=A.col,n=S.coins;txt(`${n} × 10 = ${n*10}`,A.W/2,A.H*.12,A.narrow?26:30,{c:n===6?C.gr:C.tx});
 for(let i=0;i<n;i++){const p=coinAt(i),g=A.ctx;g.fillStyle=tint('am',.6);g.beginPath();g.arc(p.x,p.y,p.r,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();txt('10p',p.x,p.y,A.narrow?14:15)}
 S.purse={x:A.W/2-70,y:A.H*.74,w:140,h:46};box(S.purse.x,S.purse.y,140,46,'cy',.25);txt('tap: add 10p',A.W/2,A.H*.74+23,15)}
function addCoin(d){S.coins=Math.max(0,Math.min(10,S.coins+d));const n=S.coins;
 if(n===6){S.six=true;return speak('6 × 10 = 60. Six tens make sixty. Every 10s fact ends in 0.',true)}
 if(n>6)return speak(`${n} × 10 = ${n*10}. That is more than 6 tens. Take one away.`,false);
 speak(`${n} × 10 = ${n*10}.`)}
/* ---- fives: half of each ten ---- */
function stick(i){const n=6,w=A.narrow?40:54,gap=A.narrow?12:20,tot=n*w+(n-1)*gap;return{x:A.W/2-tot/2+i*(w+gap),y:A.H*.26,w,h:A.H*.44}}
function paintFives(){const C=A.col,g=A.ctx,k=S.cut.filter(Boolean).length;txt('10 × 6 = 60. What is 5 × 6?',A.W/2,A.H*.1,A.narrow?18:22);
 for(let i=0;i<6;i++){const b=stick(i),cut=S.cut[i],ch=b.h/10;for(let j=0;j<10;j++){const keep=!cut||j>=5;g.fillStyle=keep?tint('gr',.75):tint('ln',.2);g.fillRect(b.x,b.y+j*ch+1,b.w,ch-2)}
  g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(b.x,b.y,b.w,b.h);if(cut){g.setLineDash([5,4]);g.beginPath();g.moveTo(b.x-6,b.y+b.h/2);g.lineTo(b.x+b.w+6,b.y+b.h/2);g.stroke();g.setLineDash([])}}
 txt(k===6?'5 × 6 = 30: half of 60':`Tap a ten to cut it in half (${k} of 6 cut)`,A.W/2,A.H*.78,A.narrow?16:18,{c:k===6?C.gr:C.tx})}
function cutStick(i){if(S.cut[i])return speak(`Ten ${i+1} is already cut. 5 is left.`);S.cut[i]=true;const k=S.cut.filter(Boolean).length;
 if(k===6){S.halved=true;return speak('Each 10 became 5. Six fives make 30, half of 60. So 5 × 6 = 30.',true)}
 speak(`Cut! That ten is now 5. ${k} cut, ${6-k} to go.`)}
/* ---- twos: bikes ---- */
function bikeAt(i){const per=A.narrow?4:7,w=A.narrow?(A.W-30)/4:(A.W-40)/7,row=Math.floor(i/per),col=i%per;return{x:(A.narrow?15:20)+col*w+w/2,y:A.H*.36+row*A.H*.2,w}}
function paintTwos(){const C=A.col,g=A.ctx,n=S.bikes;txt(`${n} bikes, ${n*2} wheels: 2 × ${n} = ${n*2}`,A.W/2,A.H*.1,A.narrow?18:22,{c:n===7?C.gr:C.tx});
 for(let i=0;i<n;i++){const p=bikeAt(i),r=Math.min(15,p.w/5);g.strokeStyle=C.tx;g.lineWidth=3;[-1,1].forEach(s=>{g.beginPath();g.arc(p.x+s*r*1.3,p.y,r,0,7);g.stroke()});
  g.beginPath();g.moveTo(p.x-r*1.3,p.y);g.lineTo(p.x,p.y-r*1.2);g.lineTo(p.x+r*1.3,p.y);g.stroke()}
 if(n)txt(`${Array(n).fill(2).join('+').length<28?Array(n).fill(2).join(' + '):'…'}`,A.W/2,A.H*.72,A.narrow?14:16,{c:C.mu,w:600});
 S.rack={x:A.W/2-80,y:A.H*.78,w:160,h:40};box(S.rack.x,S.rack.y,160,40,'vi',.22);txt('tap: park a bike',A.W/2,A.H*.78+20,15)}
function addBike(d){S.bikes=Math.max(0,Math.min(8,S.bikes+d));const n=S.bikes;
 if(n===7){S.seven=true;return speak('7 bikes have 14 wheels. 2 × 7 = 14, the same as 7 + 7. The 2s are doubles.',true)}
 if(n>7)return speak(`That is ${n} bikes: 2 × ${n} = ${n*2}. We want 7.`,false);speak(`${n} bikes: 2 × ${n} = ${n*2}.`)}
/* ---- family triangle ---- */
function tri(cx,cy,s,top,l,r,hide){const g=A.ctx,C=A.col;g.fillStyle=tint('cy',.16);g.beginPath();g.moveTo(cx,cy-s);g.lineTo(cx+s*1.1,cy+s*.7);g.lineTo(cx-s*1.1,cy+s*.7);g.closePath();g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();
 const px=A.narrow?20:24;[[top,cx,cy-s*.45],[l,cx-s*.55,cy+s*.38],[r,cx+s*.55,cy+s*.38]].forEach(([v,x,y],i)=>{if(hide===i){box(x-22,y-18,44,36,'am',.7,8);txt('?',x,y,px)}else txt(v,x,y,px)})}
function famCard(i){const w=A.narrow?64:76;return{x:A.W/2-1.5*w-12+i*(w+12),y:A.H*(A.narrow?.74:.78),w,h:46}}
function paintFamily(){const C=A.col,s=A.narrow?52:62,cx=A.narrow?A.W/2:A.W*.26,cy=A.narrow?A.H*.2:A.H*.36;tri(cx,cy,s,15,3,5);
 FAM.forEach((f,i)=>{const x=A.narrow?A.W/2:A.W*.68,y=(A.narrow?A.H*.42:A.H*.16)+i*(A.narrow?40:50),v=S.fam[i],cur=i===S.fam.length;
  txt(f.t+' '+(v==null?'__':v),x,y,A.narrow?20:24,{c:v!=null?C.gr:cur?C.tx:C.mu})});
 [3,5,15].forEach((v,i)=>{const b=famCard(i);box(b.x,b.y,b.w,b.h,'gr',.25);txt(v,b.x+b.w/2,b.y+b.h/2,22)});
 if(S.drag){box(S.drag.x-30,S.drag.y-22,60,44,'gr',.5);txt(S.drag.v,S.drag.x,S.drag.y,22)}}
function famPut(v){const i=S.fam.length;if(i>=FAM.length)return;const f=FAM[i];
 if(v!==f.a){if(f.t.includes('÷')&&v===15)return speak(`${f.t} asks: how many ${f.t.split(' ')[2]}s make 15? Not 15. Look at the bottom of the triangle.`,false);
  if(f.t.includes('÷'))return speak(`Check: ${v} × ${f.t.split(' ')[2]} is not 15. Use the other bottom number.`,false);
  return speak(`${f.t} is the big number at the top of the triangle, not ${v}.`,false)}
 S.fam.push(v);if(S.fam.length===FAM.length){S.famDone=true;return speak('One triangle, four facts: 3 × 5 = 15, 5 × 3 = 15, 15 ÷ 5 = 3, 15 ÷ 3 = 5.',true)}
 speak(`Yes: ${f.t} ${v}. Next: ${FAM[i+1].t}`,true)}
/* ---- cover a corner ---- */
function coverCard(i){const w=A.narrow?84:110,gap=14;return{x:A.W/2-1.5*w-gap+i*(w+gap),y:A.H*.74,w,h:52}}
function paintDivide(){const C=A.col,f=COVER[Math.min(S.ci,COVER.length-1)],s=A.narrow?58:70;
 if(S.ci>=COVER.length){txt('All three division facts found!',A.W/2,A.H*.4,A.narrow?18:22,{c:C.gr});return}
 txt(`${f.big} ÷ ${f.known} = ?`,A.W/2,A.H*.1,A.narrow?24:28);tri(A.W/2,A.H*.34,s,f.big,f.known,f.ans,2);
 f.cards.forEach((v,i)=>{const b=coverCard(i);box(b.x,b.y,b.w,b.h,'cy',.22);txt(v,b.x+b.w/2,b.y+b.h/2,24)})}
function coverPick(v){const f=COVER[S.ci];if(!f)return;
 if(v===f.ans){S.ci++;if(S.ci>=COVER.length){S.covered=true;return speak('20 ÷ 2 = 10, 50 ÷ 10 = 5, 35 ÷ 5 = 7. Each one undoes a times fact.',true)}
  return speak(`Yes: ${f.known} × ${v} = ${f.big}, so ${f.big} ÷ ${f.known} = ${v}.`,true)}
 if(v===f.big-f.known)return speak(`${v} is ${f.big} take away ${f.known}. Dividing asks how many ${f.known}s make ${f.big}.`,false);
 if(v===f.big*f.known)return speak(`${v} is ${f.big} × ${f.known}. Dividing makes it smaller here, not bigger.`,false);
 speak(`${f.known} × ${v} = ${f.known*v}, not ${f.big}. Try another.`,false)}
/* ---- frame ---- */
function paint(){const{ctx:g,W,H,col:C}=A,k=pg();g.fillStyle=A.mix(C.pn,C.gr,C.dark?.05:.05);g.fillRect(0,0,W,H);
 if(k==='quiz'){txt('Quick facts',W/2,H*.42,A.narrow?20:24);txt('Answer below',W/2,H*.56,16,{c:C.mu,w:500});A.fx.draw(g);return}
 ({tens:paintTens,fives:paintFives,twos:paintTwos,family:paintFamily,divide:paintDivide})[k]();if(S.msg)wrapTxt(S.msg,H*.92);A.fx.draw(g)}
function speak(t,good){S.msg=t;if(good)A.sound.pop();else if(good===false)A.sound.miss();say(t);keys();A.redraw();S.after&&S.after()}
function reset(){for(const k in S)delete S[k];Object.assign(S,{coins:0,cut:[0,0,0,0,0,0],bikes:0,fam:[],ci:0,msg:'',after:()=>{}});A.redraw()}
function keys(){if(!pad)return;pad.innerHTML='';const k=pg();if(k==='quiz')return;
 const b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn',style:'min-height:56px;padding:8px 16px','aria-label':l||t},pad,t).onclick=f};
 if(k==='tens'){b('Add a 10p coin',()=>addCoin(1));b('Take one away',()=>addCoin(-1))}
 if(k==='fives')b('Cut the next ten in half',()=>{const i=S.cut.findIndex(x=>!x);cutStick(i<0?0:i)});
 if(k==='twos'){b('Park a bike',()=>addBike(1));b('Take a bike away',()=>addBike(-1))}
 if(k==='family'&&!S.famDone)[3,5,15].forEach(v=>b(String(v),()=>famPut(v),`Put ${v} in ${FAM[S.fam.length].t}`));
 if(k==='divide'&&S.ci<COVER.length)COVER[S.ci].cards.forEach(v=>b(String(v),()=>coverPick(v),`Answer ${v}`))}
function down(p){const k=pg();if(k==='quiz')return false;
 if(k==='tens'){if(hit(p,S.purse)){addCoin(1);return true}for(let i=0;i<S.coins;i++){const q=coinAt(i);if(Math.hypot(p.x-q.x,p.y-q.y)<q.r){addCoin(-1);return true}}return false}
 if(k==='fives'){for(let i=0;i<6;i++)if(hit(p,stick(i))){cutStick(i);return true}return false}
 if(k==='twos'){if(hit(p,S.rack)){addBike(1);return true}return false}
 if(k==='family'){for(let i=0;i<3;i++)if(hit(p,famCard(i))){S.drag={v:[3,5,15][i],x:p.x,y:p.y,sx:p.x,sy:p.y};A.redraw();return true}return false}
 if(k==='divide'&&S.ci<COVER.length){for(let i=0;i<3;i++)if(hit(p,coverCard(i))){coverPick(COVER[S.ci].cards[i]);return true}}
 return false}
function move(p){if(S.drag){S.drag.x=p.x;S.drag.y=p.y;A.redraw()}}
function up(p){const d=S.drag;if(!d)return;S.drag=null;const moved=p&&Math.hypot(p.x-d.sx,p.y-d.sy)>20;if(!moved||p.y<famCard(0).y-8)famPut(d.v);else A.redraw()}
const check=(i,ok,line)=>()=>{if(A.step===i&&!A.isDone&&A.pred[i]!=null&&ok())A.done(line()+A.reveal(i))};
function play(i,acts){steps[i].go();acts.forEach((f,j)=>setTimeout(()=>{if(A.step===i)f()},A.reduced()?20*(j+1):(j+1)*300))}
function begin(i,hint,ok,line){reset();speak(hint);S.after=check(i,ok,line)}
const rep=(n,f)=>Array.from({length:n},()=>f);
const steps=[
{h:'The 10s: tens of coins',p:'A times fact tells you how many in some equal groups. 6 × 10 means 6 groups of 10. Each 10p coin is one group of 10.',
 predict:{q:'What is 6 × 10?',opts:['16','60','610'],ans:1},
 task:'Make 6 × 10 with 10p coins',show:()=>play(0,rep(6,()=>addCoin(1))),
 go:()=>begin(0,'Tap the box to add a 10p coin. Tap a coin to take it back.',()=>S.six,()=>'6 × 10 = 60.')},
{h:'The 5s: half of the 10s',p:'5 is half of 10. So a 5s fact is half of the 10s fact with the same number of groups.',
 predict:{q:'10 × 6 = 60. So 5 × 6 is…',opts:['30','55','65'],ans:0},
 task:'Cut all six tens in half',show:()=>play(1,[0,1,2,3,4,5].map(i=>()=>cutStick(i))),
 go:()=>begin(1,'Tap each ten to cut it in half.',()=>S.halved,()=>'5 × 6 = 30.')},
{h:'The 2s: doubles',p:'Each bike has 2 wheels. 2 × 7 means 7 groups of 2. That is the same as 7 + 7, double 7.',
 predict:{q:'2 × 7 is the same as…',opts:['7 + 2','7 + 7','2 + 2'],ans:1},
 task:'Park 7 bikes',show:()=>play(2,rep(7,()=>addBike(1))),
 go:()=>begin(2,'Tap the box to park a bike.',()=>S.seven,()=>'2 × 7 = 14.')},
{h:'A fact family',p:'Three numbers make a fact family. The big number goes at the top. If you know 3 × 5 = 15, you also know 5 × 3, 15 ÷ 5 and 15 ÷ 3.',
 predict:{q:'3 × 5 = 15. What is 15 ÷ 5?',opts:['3','10','75'],ans:0},
 task:'Fill all four facts',show:()=>play(3,[15,15,3,5].map(v=>()=>famPut(v))),
 go:()=>begin(3,'Drag a number card up to the fact, or tap a button.',()=>S.famDone,()=>'Four facts from one triangle.')},
{h:'Cover a corner',p:'Hide one corner of the triangle and you get a division fact. 20 ÷ 2 asks: how many 2s make 20? Use the times fact you know.',
 predict:{q:'What is 20 ÷ 2?',opts:['18','40','10'],ans:2},
 task:'Find all three hidden numbers',show:()=>play(4,COVER.map(f=>()=>coverPick(f.ans))),
 go:()=>begin(4,'Tap the number under the yellow cover.',()=>S.covered,()=>'Three division facts.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.after()});
const QS=[
 ['What is 5 × 4?',[['20','ok'],['9','add'],['54','join']]],
 ['What is 10 × 8?',[['80','ok'],['18','add'],['108','join']]],
 ['What is 30 ÷ 5?',[['6','ok'],['25','sub'],['150','mul']]],
 ['What is 2 × 9?',[['18','ok'],['11','add'],['29','join']]],
 ['10 × 7 = 70. What is 5 × 7?',[['35','ok'],['65','half'],['140','half']]],
 ['5 × 2 = 10. Which is also true?',[['10 ÷ 2 = 5','ok'],['10 ÷ 5 = 10','fam'],['2 ÷ 5 = 10','fam']]],
 ['What is 16 ÷ 2?',[['8','ok'],['14','sub'],['32','mul']]]];
function why(t){let m='Picture the equal groups, then use a fact you know.';
 if(t==='add')m='You added the two numbers. × means groups of: 5 × 4 is 4 groups of 5.';
 if(t==='join')m='You wrote the numbers side by side. Times by 10 puts a 0 on the end; other facts need the table.';
 if(t==='sub')m='You took away. ÷ asks how many groups: how many 5s (or 2s) make the big number?';
 if(t==='mul')m='You multiplied. To divide, think: what times the small number makes the big one?';
 if(t==='half')m='The 5s are half of the 10s. Half of 70 is 35.';
 if(t==='fam')m='In a fact family the big number is shared out. 10 ÷ 2 = 5 and 10 ÷ 5 = 2.';
 return m}
function ask(){q++;const Q=QS[q%QS.length],r=q%3,opts=[...Q[1].slice(r),...Q[1].slice(0,r)];
 qa.innerHTML=`<p><b>${Q[0]}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qa.querySelector('.fl-pick');opts.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn',style:'min-height:56px;min-width:64px'},row,v).onclick=()=>mark(t)});say('Challenge: '+Q[0]);A.redraw()}
function mark(t){qa.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=qa.querySelector('.fl-fb'),ok=t==='ok';
 if(ok)A.win();else A.sound.miss();fb.innerHTML=(ok?'✓ Yes! ':'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.7,tall:1.35,draw:paint,onStep:A=>{qa.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
 init:A=>{reset();const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Times table buttons'},w);qa=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up});keys()}});
A.start()})})();
