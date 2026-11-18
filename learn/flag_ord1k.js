/* Flagship: Ordering Numbers to 1000 (ages 7–8; CCSS 2.NBT.4 compare two three-digit numbers based on meanings of
   the hundreds, tens and ones digits, using >, = and <; NC Y3 NPV compare and order numbers up to 1000).
   A hundreds/tens/ones chart with flats, rods and cubes: the learner taps the place that DECIDES (scan from the left,
   skip places that match), sees why a zero still holds a place and why 98 has 0 hundreds, drags a symbol into the gap,
   then drags four same-digit numbers into order and watches them land on a 0–1000 number line.
   Not flagcmp2d (two-digit tens/ones), flaghund (counting on to 1000) or flagpvc (four-digit place value). */
(()=>{
VIS.reg('flagord1k',c=>{let L,pad,quiz,turn=-1,gen=0;const st={};c.fig.classList.add('young');
const PL=['hundreds','tens','ones'],SH=['H','T','O'];
const mode=()=>['scan','scan','scan','scan','gap','line','quiz'][L.step];
function speak(t){c.say(t);if(L)L.cv.setAttribute('aria-label',t)}
function txt(s,x,y,px,o){o=o||{};const g=L.ctx;g.font=`${o.b||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.ink||L.col.tx;g.fillText(String(s),x,y,o.max||L.W-8)}
const dig=n=>[Math.floor(n/100)%10,Math.floor(n/10)%10,n%10];
function box(x,y,w,h,fill,line,lw){const g=L.ctx;g.fillStyle=fill;L.paint.rrect(x,y,w,h,10);g.fill();g.strokeStyle=line||L.col.tx;g.lineWidth=lw||1.5;g.stroke()}
/* chart geometry: a label column, then H T O columns; two number rows */
const chart=()=>{const x0=L.W*(L.narrow?.2:.18),cw=(L.W-x0-8)/3,top=L.H*.1,rh=L.H*(L.narrow?.27:.3);return{x0,cw,top,rh,row:i=>top+L.H*.06+i*(rh+L.H*.03)}};
function blocks(d,col,x,y,w,h){const g=L.ctx,C=L.col,fill=[C.vi,C.cy,C.am][col];g.strokeStyle=C.tx;g.lineWidth=1;
 if(col===0){const s=Math.min(w/3.6,h/3.6);for(let i=0;i<d;i++){const bx=x+(w-s*3.3)/2+(i%3)*s*1.15,by=y+Math.floor(i/3)*s*1.15;g.fillStyle=fill;g.fillRect(bx,by,s,s);g.strokeRect(bx,by,s,s);g.beginPath();for(let k=1;k<4;k++){g.moveTo(bx+s*k/4,by);g.lineTo(bx+s*k/4,by+s);g.moveTo(bx,by+s*k/4);g.lineTo(bx+s,by+s*k/4)}g.stroke()}}
 else if(col===1){const bw=Math.min(w/10.5,9),bh=h*.92;for(let i=0;i<d;i++){const bx=x+(w-bw*1.3*d)/2+i*bw*1.3;g.fillStyle=fill;g.fillRect(bx,y,bw,bh);g.strokeRect(bx,y,bw,bh)}}
 else{const s=Math.min(w/4.2,h/3.6);for(let i=0;i<d;i++){const bx=x+(w-s*3.4)/2+(i%3)*s*1.2,by=y+Math.floor(i/3)*s*1.2;g.fillStyle=fill;g.fillRect(bx,by,s,s);g.strokeRect(bx,by,s,s)}}}
function drawScan(){const C=L.col,G=chart(),pair=[st.a,st.b];
 txt(st.head||'Which place decides?',L.W/2,L.H*.05,L.narrow?14:16,{b:800});
 SH.forEach((s,j)=>{const x=G.x0+j*G.cw;const pick=st.tap===j,good=st.won&&j===st.key,same=st.won&&j<st.key;
  box(x+3,G.top,G.cw-6,L.H*.05,good?L.alpha(C.gr,.45):pick?L.alpha(C.ac,.35):L.alpha(C.tx,.08),C.tx,pick||good?3:1.5);
  txt(PL[j],x+G.cw/2,G.top+L.H*.025,L.narrow?12:14,{b:800});
  if(same)txt('same',x+G.cw/2,G.row(1)+G.rh+L.H*.035,L.narrow?13:14,{ink:C.mu,b:700});
  if(good)txt(dig(st.a)[j]+(dig(st.a)[j]>dig(st.b)[j]?' > ':' < ')+dig(st.b)[j],x+G.cw/2,G.row(1)+G.rh+L.H*.035,L.narrow?15:16,{b:900})});
 pair.forEach((n,i)=>{const y=G.row(i),d=dig(n);txt(n,G.x0/2,y+G.rh*.35,L.narrow?20:26,{b:900});
  d.forEach((v,j)=>{const x=G.x0+j*G.cw;box(x+3,y,G.cw-6,G.rh,L.alpha(C.tx,.04),L.alpha(C.tx,.5),1);txt(v,x+G.cw/2,y+G.rh*.16,L.narrow?20:24,{b:900,ink:n<100&&j===0?C.rd:C.tx});
   blocks(v,j,x+6,y+G.rh*.32,G.cw-12,G.rh*.62)})})}
function drawGap(){const C=L.col,y=L.H*.22,w=L.W*.28,h=L.H*.16;
 txt(st.a,L.W*.18,y+h/2,L.narrow?30:38,{b:900});txt(st.b,L.W*.82,y+h/2,L.narrow?30:38,{b:900});
 g0().setLineDash(st.sym?[]:[7,6]);box(L.W/2-w/4,y,w/2,h,st.sym?L.alpha(st.ok?C.gr:C.rd,.3):L.alpha(C.tx,.04));g0().setLineDash([]);
 if(st.sym&&!st.held)txt(st.sym,L.W/2,y+h/2,L.narrow?34:42,{b:900});
 [st.a,st.b].forEach((n,i)=>{const d=dig(n);txt(`${d[0]} hundreds ${d[1]} tens ${d[2]} ones`,i?L.W*.75:L.W*.25,y+h+L.H*.06,L.narrow?11:13,{ink:C.mu,max:L.W*.46})});
 tiles().forEach(t=>{let r=t;if(st.held===t.s)r={...t,x:st.hx-t.w/2,y:st.hy-t.h/2};box(r.x,r.y,r.w,r.h,L.alpha(C.ac,.25));txt(t.s,r.x+r.w/2,r.y+r.h/2,L.narrow?30:34,{b:900})});
 txt('> greater than   = equal to   < less than',L.W/2,L.H*.8,L.narrow?12:14,{ink:C.mu})}
const g0=()=>L.ctx;
const tiles=()=>['>','=','<'].map((s,i)=>({s,x:L.W*(.2+i*.24)-L.W*.09,y:L.H*.52,w:L.W*.18,h:L.H*.15}));
const card=i=>{const w=L.W*.21;return{x:L.W*.04+i*L.W*.24,y:L.H*.1,w,h:L.H*.13}};
const seat=i=>{const w=L.W*.21;return{x:L.W*.04+i*L.W*.24,y:L.H*.36,w,h:L.H*.15}};
function drawLine(){const C=L.col;txt(st.head||'Smallest → largest',L.W/2,L.H*.04,L.narrow?14:16,{b:800});
 st.nums.forEach((n,i)=>{if(st.seat.includes(i))return;let r=card(i);if(st.drag&&st.drag.i===i)r={...r,x:st.drag.x-r.w/2,y:st.drag.y-r.h/2};box(r.x,r.y,r.w,r.h,st.pick===i?L.alpha(C.ac,.4):L.alpha(C.am,.35),C.tx,st.pick===i?3:1.5);txt(n,r.x+r.w/2,r.y+r.h/2,L.narrow?22:28,{b:900})});
 for(let k=0;k<4;k++){const r=seat(k),i=st.seat[k];g0().setLineDash(i==null?[6,5]:[]);box(r.x,r.y,r.w,r.h,i==null?L.alpha(C.tx,.04):L.alpha(C.gr,.3));g0().setLineDash([]);
  txt(['1st','2nd','3rd','4th'][k],r.x+r.w/2,r.y-L.H*.02,L.narrow?11:13,{ink:C.mu});if(i!=null)txt(st.nums[i],r.x+r.w/2,r.y+r.h/2,L.narrow?22:28,{b:900})}
 const x0=L.W*.06,x1=L.W*.94,y=L.H*.7,g=g0();g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.moveTo(x0,y);g.lineTo(x1,y);g.stroke();
 for(let t=0;t<=10;t++){const x=x0+(x1-x0)*t/10;g.beginPath();g.moveTo(x,y-6);g.lineTo(x,y+6);g.stroke();if(t%(L.narrow?5:2)===0)txt(t*100,x,y+L.H*.035,L.narrow?11:12,{ink:C.mu})}
 st.seat.forEach((i,k)=>{if(i==null)return;const n=st.nums[i],x=x0+(x1-x0)*n/1000;L.paint.ball(x,y,7,C.vi);txt(n,x,y-L.H*(.04+.04*(k%2)),L.narrow?12:13,{b:800})});
 txt(st.msg||'Drag a number into the next seat, or tap a number then a seat.',L.W/2,L.H*.88,L.narrow?12:14,{ink:C.mu,max:L.W*.94})}
function draw(A){const C=A.col,k=mode();A.ctx.fillStyle=A.mix(C.pn,'#e0e7ff',C.dark?.07:.4);A.ctx.fillRect(0,0,A.W,A.H);
 if(k==='scan')drawScan();else if(k==='gap')drawGap();else if(k==='line')drawLine();
 else{txt('Compare three-digit numbers',A.W/2,A.H*.35,A.narrow?16:20,{b:900});txt('hundreds → tens → ones',A.W/2,A.H*.55,A.narrow?13:15,{ink:C.mu})}
 A.fx.draw(A.ctx)}
function fresh(o){gen++;for(const k in st)delete st[k];Object.assign(st,{a:412,b:398,key:0,tap:null,won:false,sym:null,ok:false,held:null,nums:[640,604,460,406],seat:[null,null,null,null],pick:null,drag:null,msg:'',head:'',check:()=>{}},o||{})}
const ready=(i,ok,msg)=>()=>{if(L.step===i&&ok()&&(!steps[i].predict||L.pred[i]!=null)&&!L.isDone)L.done(msg+L.reveal(i))};
function later(i,acts){steps[i].go();const g=gen;acts.forEach((f,j)=>setTimeout(()=>{if(g===gen)f()},L.reduced()?20*(j+1):220*(j+1)))}
function decide(){const A=dig(st.a),B=dig(st.b);for(let j=0;j<3;j++)if(A[j]!==B[j])return j;return -1}
/* tapping a place: explain the slip if it is not the place that decides */
function tapPlace(j){const A=dig(st.a),B=dig(st.b),k=st.key;st.tap=j;
 if(j===k){st.won=true;L.sound.pop();speak(`The ${PL[j]} decide: ${A[j]} ${PL[j]} ${A[j]>B[j]?'is more than':'is less than'} ${B[j]}, so ${st.a} ${st.a>st.b?'>':'<'} ${st.b}.`)}
 else if(j<k){L.sound.miss();speak(`Both have ${A[j]} ${PL[j]}. That place is the same, so move right.`)}
 else{L.sound.miss();speak(`Look further left first. The ${PL[k]} already differ: ${A[k]} and ${B[k]}.`)}
 L.redraw();st.check()}
function drop(i,k){if(st.seat.includes(i)||st.seat[k]!=null)return;const sorted=[...st.nums].sort((a,b)=>a-b),want=sorted[k],n=st.nums[i];st.pick=null;
 if(n===want){st.seat[k]=i;L.sound.pop();st.msg=st.seat.every(x=>x!=null)?'Order: '+sorted.join(' < '):`${n} goes ${['1st','2nd','3rd','4th'][k]}.`}
 else{L.sound.miss();const a=dig(n),b=dig(want);st.msg=a[0]!==b[0]?`${n} has ${a[0]} hundreds; ${want} has ${b[0]}. Hundreds first.`:`Same ${a[0]} hundreds, so look at the tens: ${a[1]} vs ${b[1]}.`}
 speak(st.msg);L.redraw();buttons();st.check()}
function setSym(s){st.sym=s;st.held=null;const want=st.a>st.b?'>':st.a<st.b?'<':'=';st.ok=s===want;st.ok?L.sound.pop():L.sound.miss();
 speak(st.ok?`${st.a} ${s} ${st.b}`:s==='='?'Equal needs every place to match.':`The open side faces the greater number. Check the tens: ${dig(st.a)[1]} and ${dig(st.b)[1]}.`);L.redraw();st.check()}
function buttons(){if(!pad)return;pad.innerHTML='';const k=mode(),b=(t,f,lab)=>{c.el('button',{type:'button',class:'lbtn','aria-label':lab||t},pad,t).onclick=f};
 if(k==='scan')PL.forEach((p,j)=>b(p[0].toUpperCase()+p.slice(1),()=>tapPlace(j),'The '+p+' decide'));
 if(k==='gap')['>','=','<'].forEach(s=>b(s,()=>setSym(s),'Put '+s+' in the gap'));
 if(k==='line'){if(st.pick==null)st.nums.forEach((n,i)=>{if(!st.seat.includes(i))b(String(n),()=>{st.pick=i;speak(n+' picked. Now choose a seat.');L.redraw();buttons()},'Pick '+n)});
  else['1st','2nd','3rd','4th'].forEach((s,k2)=>{if(st.seat[k2]==null)b('Put '+s,()=>drop(st.pick,k2),'Put '+st.nums[st.pick]+' in seat '+s)})}}
const inR=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function down(p){const k=mode();if(k==='quiz')return false;
 if(k==='scan'){const G=chart();if(p.x<G.x0||p.y<G.top)return false;tapPlace(Math.min(2,Math.floor((p.x-G.x0)/G.cw)));return true}
 if(k==='gap'){const t=tiles().find(t=>inR(p,t));if(!t)return false;st.held=t.s;st.hx=p.x;st.hy=p.y;L.redraw();return true}
 if(k==='line'){const i=st.nums.findIndex((_,j)=>!st.seat.includes(j)&&inR(p,card(j)));if(i>=0){st.drag={i,x:p.x,y:p.y};st.pick=i;L.redraw();return true}
  const s=[0,1,2,3].find(j=>inR(p,seat(j)));if(s!=null&&st.pick!=null)drop(st.pick,s);return false}
 return false}
function move(p){if(st.drag){st.drag.x=p.x;st.drag.y=p.y;L.redraw()}if(st.held){st.hx=p.x;st.hy=p.y;L.redraw()}}
function up(p){if(st.held){const s=st.held;st.held=null;if(p&&Math.abs(p.x-L.W/2)<L.W*.2&&p.y<L.H*.45)setSym(s);else L.redraw();return}
 const d=st.drag;st.drag=null;if(!d||!p){L.redraw();return}const s=[0,1,2,3].find(j=>inR(p,seat(j)));if(s!=null)drop(d.i,s);else{L.redraw();buttons()}}
const scanStep=(i,a,b,head,msg)=>()=>{fresh({a,b,head});st.key=decide();speak(`${a} and ${b}. Tap the place that decides.`);buttons();st.check=ready(i,()=>st.won,msg)};
const steps=[
{h:'Hundreds first',p:'Start at the left. 412 has 4 hundreds and 398 has 3 hundreds. More hundreds wins, even though 398 has bigger tens and ones digits.',
 predict:{q:'Which is greater: 412 or 398?',opts:['398, its digits are bigger','412','They are equal'],ans:1},
 task:'Tap the place that decides',show:()=>later(0,[()=>tapPlace(0)]),go:scanStep(0,412,398,'412 or 398?','4 hundreds beat 3 hundreds, so 412 > 398.')},
{h:'Same? Move right',p:'If the hundreds match, they cannot decide. Move one place right and compare the tens.',
 predict:{q:'352 and 325 both have 3 hundreds. Which is greater?',opts:['325','352','Equal: same digits'],ans:1},
 task:'Tap the place that decides',show:()=>later(1,[()=>tapPlace(1)]),go:scanStep(1,352,325,'352 or 325?','Hundreds match; 5 tens beat 2 tens, so 352 > 325.')},
{h:'Zero holds a place',p:'305 has 0 tens. The zero is a real digit: it says there are no tens. 350 has 5 tens.',
 predict:{q:'Which is greater: 305 or 350?',opts:['305, it ends in 5','350','Equal: same digits'],ans:1},
 task:'Tap the place that decides',show:()=>later(2,[()=>tapPlace(1)]),go:scanStep(2,305,350,'305 or 350?','0 tens is less than 5 tens, so 305 < 350.')},
{h:'Line up the places',p:'98 has no hundreds digit, so it has 0 hundreds. Line up the ones under the ones before you compare.',
 predict:{q:'Which is greater: 98 or 120?',opts:['98, because 9 > 1','120','Equal'],ans:1},
 task:'Tap the place that decides',show:()=>later(3,[()=>tapPlace(0)]),go:scanStep(3,98,120,'98 or 120?','0 hundreds is less than 1 hundred, so 98 < 120.')},
{h:'Write it with a symbol',p:'> means greater than. < means less than. The open side faces the greater number. = means every place matches.',
 task:'Drag the right symbol into the gap',show:()=>later(4,[()=>setSym('<')]),
 go:()=>{fresh({a:708,b:780});speak('708 and 780. Which symbol goes in the gap?');buttons();st.check=ready(4,()=>st.ok,'708 < 780: same 7 hundreds, then 0 tens < 8 tens.')}},
{h:'Order four numbers',p:'To order, compare the hundreds first, then the tens. These four numbers use the same digits, so place value does all the work.',
 predict:{q:'Which is smallest: 640, 604, 460 or 406?',opts:['604','406','460'],ans:1},
 task:'Put the numbers in order, smallest first',show:()=>later(5,[()=>drop(3,0),()=>drop(2,1),()=>drop(1,2),()=>drop(0,3)]),
 go:()=>{fresh({head:'Smallest → largest'});speak('Order 640, 604, 460 and 406.');buttons();st.check=ready(5,()=>st.seat.join()==='3,2,1,0','406 < 460 < 604 < 640. See them sit on the number line.')}},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>st.check()});
const BANK=[[563,536,'>',{'<':'ones','=':'same'}],[299,301,'<',{'>':'ones','=':'same'}],[740,704,'>',{'=':'zero','<':'ones'}],[815,815,'=',{'>':'all','<':'all'}],
 [96,410,'<',{'>':'lead','=':'same'}],[607,670,'<',{'>':'flip','=':'zero'}],[1000,999,'>',{'<':'lead','=':'same'}]];
function slip(tag,a,b,ans){let m=`Scan from the left: ${a} ${ans} ${b}.`;
 if(tag==='ones')m=`You let the smaller places win. Hundreds decide first, then tens: ${a} ${ans} ${b}.`;
 if(tag==='zero')m=`The zero still holds a place. ${a} and ${b} have different tens, so they are not equal.`;
 if(tag==='lead')m=`Line up the places first. The shorter number has fewer hundreds (or thousands), so its first digit is not in the same place.`;
 if(tag==='flip')m=`The symbol points the wrong way. The open side faces the greater number: ${a} ${ans} ${b}.`;
 if(tag==='same')m=`Same digits are not enough. Equal means every place matches.`;
 if(tag==='all')m=`Every place matches, so the numbers are equal: ${a} = ${b}.`;
 return m}
function next(){turn++;const [a,b,ans,bad]=BANK[turn%BANK.length];
 quiz.innerHTML=`<p><b>Which symbol fits ${a} ? ${b}</b></p><div class="fl-pick" role="group" aria-label="Choose a symbol"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');['>','=','<'].forEach(s=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Choose '+s},row,s).onclick=()=>judge(s===ans?'ok':bad[s],a,b,ans)});speak(`Challenge: ${a} compared with ${b}`);L.redraw()}
function judge(tag,a,b,ans){quiz.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=tag==='ok';
 ok?L.win():L.sound.miss();fb.innerHTML=(ok?`✓ Yes: ${a} ${ans} ${b}.`:'✗ '+slip(tag,a,b,ans))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
L=FK.shell(c,{steps,ratio:.66,tall:1.2,draw,onStep:A=>{quiz.hidden=A.step!==6;pad.hidden=A.step===6;buttons()},
 init:A=>{const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});buttons()}});
L.start()})})();
