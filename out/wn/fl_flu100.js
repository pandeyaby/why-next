/* Flagship: Fluent adding and subtracting within 100 (ages 7–8; CCSS 2.NBT.5, NC Year 2–3 mental methods).
   Pick the strategy that suits the numbers: split into tens and ones (46 + 37), round and adjust (68 + 29, 83 − 19),
   count up to find a small difference (91 − 87), then check an answer with the inverse (83 − 25 = 58, not 62).
   Not flagadd100 (bridging a 2-digit number and ones), flagregroup (column method) or flagsum20 (facts within 20). */
(()=>{
VIS.reg('flagflu100',c=>{
let A,ctl,chal,qn=-1;const s={};
const PARTS=[[40,'t'],[6,'o'],[30,'t'],[7,'o']];
const ROUND={add:{a:68,b:29,r:30,sign:1},sub:{a:83,b:19,r:20,sign:-1}};
const GAPS=[[87,91],[68,72]];
const DECK=[['54 + 23','split'],['47 + 39','round'],['73 − 69','up'],['65 − 29','round'],['31 + 45','split'],['82 − 78','up']];
const KINDS=[['split','Split tens and ones','Split'],['round','Round and adjust','Round'],['up','Count up','Count up']];
const WHY={split:'No number is close to a ten, so add the tens, then the ones.',round:'One number is 1 away from a ten. Use the ten, then adjust by 1.',up:'The two numbers are close together, so count up the small gap.'};
const STEPS_ID=['split','round+','round-','gap','pick','check','chal'];
const cur=()=>STEPS_ID[A.step];
function tell(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function write(t,x,y,size,o){o=o||{};const g=A.ctx;g.font=`${o.wt||700} ${size}px system-ui,sans-serif`;g.textAlign=o.align||'center';g.textBaseline='middle';g.fillStyle=o.col||A.col.tx;g.fillText(String(t),x,y,o.fit||A.W-16)}
const tint=(k,a)=>A.mix(A.col.pn,A.col[k],A.col.dark?a*.75:a);
function tile(r,k,a,rr){const g=A.ctx;g.fillStyle=tint(k,a);A.paint.rrect(r.x,r.y,r.w,r.h,rr||10);g.fill();g.lineWidth=1.5;g.strokeStyle=A.col.tx;g.stroke()}
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function banner(t){const g=A.ctx,size=A.narrow?15:16,lines=[''];g.font=`600 ${size}px system-ui,sans-serif`;
 t.split(' ').forEach(w=>{const k=lines.length-1,try1=(lines[k]+' '+w).trim();if(lines[k]&&g.measureText(try1).width>A.W-26)lines.push(w);else lines[k]=try1});
 const n=Math.min(4,lines.length),lh=size+5,y0=A.H-n*lh-12;g.fillStyle=A.alpha(A.col.pn,.95);g.fillRect(0,y0,A.W,A.H-y0);lines.slice(0,4).forEach((l,j)=>write(l,A.W/2,y0+6+lh*j+lh/2,size,{wt:600}))}
/* a number line from lo to hi */
function line(lo,hi,y){const m=A.narrow?20:36;return{lo,hi,y,at:v=>m+(v-lo)*(A.W-2*m)/(hi-lo),val:x=>lo+(x-m)*(hi-lo)/(A.W-2*m)}}
function drawLine(L,step){const g=A.ctx;g.strokeStyle=A.col.tx;g.lineWidth=2;g.beginPath();g.moveTo(L.at(L.lo),L.y);g.lineTo(L.at(L.hi),L.y);g.stroke();
 for(let v=L.lo;v<=L.hi;v+=step){const big=v%10===0;g.lineWidth=big?2.5:1;g.beginPath();g.moveTo(L.at(v),L.y-(big?10:5));g.lineTo(L.at(v),L.y+(big?10:5));g.stroke();if(big||step>1||L.hi-L.lo<=10)write(v,L.at(v),L.y+22,A.narrow?14:16,{wt:big?800:500,col:big?A.col.vi:A.col.tx})}}
function arc(L,a,b,label,k,below){const g=A.ctx,x0=L.at(a),x1=L.at(b),h=Math.min(64,Math.max(22,Math.abs(x1-x0)*.5))*(below?-1:1);g.strokeStyle=A.col[k];g.lineWidth=3;
 g.beginPath();g.moveTo(x0,L.y);g.quadraticCurveTo((x0+x1)/2,L.y-h*1.6,x1,L.y);g.stroke();g.fillStyle=A.col[k];g.beginPath();g.arc(x1,L.y,5,0,7);g.fill();write(label,(x0+x1)/2,L.y-h*.8-(below?-14:12),A.narrow?15:17,{wt:800})}
/* ---- 1. split into tens and ones ---- */
function trays(){const w=(A.W-36)/2,y=A.H*.42;return[{x:12,y,w,h:A.H*.3,k:'t'},{x:24+w,y,w,h:A.H*.3,k:'o'}]}
function partR(i){const w=A.narrow?62:76,gap=A.narrow?10:18,x0=(A.W-4*w-3*gap)/2;return{x:x0+i*(w+gap),y:A.H*.17,w,h:48}}
function drawSplit(){write('46 + 37',A.W/2,24,A.narrow?24:28,{wt:800});
 PARTS.forEach(([v],i)=>{if(s.put[i])return;const r=s.drag&&s.drag.i===i?{x:s.drag.x-31,y:s.drag.y-24,w:62,h:48}:partR(i);tile(r,i<2?'cy':'am',.3);write(v,r.x+r.w/2,r.y+r.h/2,22,{wt:800})});
 trays().forEach(T=>{tile(T,T.k==='t'?'gr':'pk',.14,14);write(T.k==='t'?'Tens':'Ones',T.x+T.w/2,T.y+18,A.narrow?16:18,{wt:800});
  const got=PARTS.filter((p,i)=>s.put[i]===T.k).map(p=>p[0]);if(got.length)write(got.join(' + ')+(got.length===2?' = '+(got[0]+got[1]):''),T.x+T.w/2,T.y+T.h/2+8,A.narrow?18:21,{wt:800,fit:T.w-8})});
 if(s.splitOk)write('70 + 13 = 83',A.W/2,A.H*.79,A.narrow?22:26,{wt:800,col:A.col.gr})}
function putPart(i,k){if(s.put[i]||s.splitOk)return;const [v,want]=PARTS[i];
 if(k!==want)return speak(want==='o'?`${v} is ${v} ones, not ${v} tens. It goes with the ones.`:`${v} is ${v/10} tens. It goes with the tens.`,false);
 s.put[i]=k;if(PARTS.every((p,j)=>s.put[j])){s.splitOk=true;return speak('40 + 30 = 70 and 6 + 7 = 13. 70 + 13 = 83. The 13 ones hold one more ten.',true)}speak(`${v} goes in ${k==='t'?'tens':'ones'}.`,true)}
/* ---- 2 and 3. round and adjust ---- */
function chips(){const w=A.narrow?(A.W-48)/3:120,y=A.H*.62,x0=(A.W-3*w-24)/2;return[0,1,2].map(i=>({x:x0+i*(w+12),y,w,h:52}))}
function chipText(kind){const R=ROUND[kind];return[(R.sign>0?'+ ':'− ')+R.r,'+ 1','− 1']}
function drawRound(kind){const R=ROUND[kind],lo=60,hi=kind==='add'?100:90,L=line(lo,hi,A.H*.3);s.L=L;
 write(`${R.a} ${R.sign>0?'+':'−'} ${R.b}`,A.W/2,24,A.narrow?24:28,{wt:800});drawLine(L,5);
 let v=R.a,sum=`${R.a}`;if(s.big){const v2=R.a+R.sign*R.r;arc(L,v,v2,(R.sign>0?'+':'−')+R.r,'cy');v=v2;sum+=` ${R.sign>0?'+':'−'} ${R.r} = ${v2}`}
 if(s.adj){const v3=v+s.adj;arc(L,v,v3,'',s.roundOk?'gr':'rd',true);sum=`${v} ${s.adj>0?'+':'−'} 1 = ${v3}`;v=v3}
 A.ctx.fillStyle=A.col.tx;A.ctx.beginPath();A.ctx.arc(L.at(R.a),L.y,6,0,7);A.ctx.fill();write(sum,A.W/2,A.H*.5,A.narrow?20:22,{wt:800,col:s.roundOk?A.col.gr:s.adj?A.col.rd:A.col.tx});
 if(!s.roundOk)chips().forEach((r,i)=>{const dim=i===0?s.big:!s.big;tile(r,i===0?'cy':'vi',dim?.08:.28,12);write(chipText(kind)[i],r.x+r.w/2,r.y+r.h/2,22,{wt:800,col:dim?A.col.mu:A.col.tx})})}
function bigJump(kind){if(s.big||s.roundOk)return;const R=ROUND[kind];s.big=true;speak(`${R.a} ${R.sign>0?'+':'−'} ${R.r} = ${R.a+R.sign*R.r}. But ${R.r} is 1 more than ${R.b}. Now adjust by 1.`,true)}
function adjust(kind,d){const R=ROUND[kind];if(s.roundOk)return;if(!s.big)return speak(`First make the easy jump: ${R.sign>0?'add':'take away'} ${R.r}.`,false);
 const v=R.a+R.sign*R.r,want=R.sign>0?-1:1;s.adj=d;
 if(d!==want){A.redraw();return speak(R.sign>0?`You added 30, which is 1 too many. Adding 1 more makes it worse. Take 1 away: ${v} − 1.`:`You took away 20, which is 1 too many. Taking 1 more away makes it worse. Give 1 back: ${v} + 1.`,false)}
 s.roundOk=true;speak(R.sign>0?`68 + 29 = 68 + 30 − 1 = 97. You added 1 too many, so you took it back.`:`83 − 19 = 83 − 20 + 1 = 64. You took 1 too many, so you gave it back.`,true)}
/* ---- 4. count up to find the difference ---- */
function drawGap(){const G=GAPS[s.gi]||GAPS[GAPS.length-1],[b,a]=G,L=line(b-2,b+8,A.H*.42);s.L=L;
 write(GAPS[s.gi]?`${a} − ${b}: count up from ${b}`:'Both gaps found ✓',A.W/2,24,A.narrow?19:22,{wt:800});drawLine(L,1);
 const ten=Math.ceil(b/10)*10;if(s.pos>b){if(s.pos<=ten)arc(L,b,s.pos,'+'+(s.pos-b),'am');else{arc(L,b,ten,'+'+(ten-b),'am');arc(L,ten,s.pos,'+'+(s.pos-ten),'am')}}
 s.knob={x:L.at(s.pos),y:L.y};A.ctx.fillStyle=A.col.vi;A.ctx.beginPath();A.ctx.arc(s.knob.x,L.y,14,0,7);A.ctx.fill();write(s.pos,s.knob.x,L.y+48,A.narrow?18:20,{wt:800});
 if(s.pos>b)write(`up ${s.pos-b}`,A.W/2,A.H*.68,A.narrow?20:22,{wt:800,col:A.col.am})}
function moveTo(v){const G=GAPS[s.gi];if(!G)return;s.pos=Math.max(G[0],Math.min(G[0]+8,Math.round(v)));tell('At '+s.pos);A.redraw()}
function checkGap(){const G=GAPS[s.gi];if(!G)return;const [b,a]=G,d=s.pos-b;
 if(s.pos===a){s.gi++;const nx=GAPS[s.gi];if(!nx){s.gapOk=true;return speak(`${a} − ${b} = ${d}. Close numbers: count up the gap instead of taking away ${b}.`,true)}s.pos=nx[0];return speak(`Yes: ${b} + ${d} = ${a}, so ${a} − ${b} = ${d}. Now ${nx[1]} − ${nx[0]}.`,true)}
 if(s.pos<a)return speak(`${s.pos} is not ${a} yet. Keep counting up.`,false);speak(`You went past ${a}. Stop at ${a}.`,false)}
/* ---- 5. pick the strategy ---- */
const binR=i=>{const w=(A.W-44)/3;return{x:12+i*(w+10),y:A.H*.46,w,h:A.H*(A.narrow?.3:.34)}};
function drawPick(){const card=DECK[s.di];
 if(card){const r=s.cardR=A.narrow?{x:A.W/2-75,y:A.H*.15,w:150,h:58}:{x:A.W/2-95,y:A.H*.13,w:190,h:62},d=s.drag,b=d?{x:d.x-r.w/2,y:d.y-r.h/2,w:r.w,h:r.h}:r;tile(b,'vi',.2);write(card[0],b.x+b.w/2,b.y+b.h/2,A.narrow?22:26,{wt:800})}
 else write('All six sorted ✓',A.W/2,A.H*.22,A.narrow?18:20,{col:A.col.gr});
 KINDS.forEach(([k,,short],i)=>{const r=binR(i);tile(r,k==='split'?'cy':k==='round'?'am':'gr',.14,12);write(short,r.x+r.w/2,r.y+20,A.narrow?15:17,{wt:800,fit:r.w-6});
  s.sorted.filter(x=>x[1]===k).forEach((x,j)=>write('✓ '+x[0],r.x+r.w/2,r.y+50+j*24,A.narrow?14:16,{fit:r.w-6}))})}
function sortTo(k){const card=DECK[s.di];s.drag=null;if(!card)return;
 if(k!==card[1])return speak(`${card[0]}: ${WHY[card[1]]}`,false);s.sorted.push(card);s.di++;
 if(s.di>=DECK.length){s.pickOk=true;return speak('Look at the numbers first, then pick: split, round and adjust, or count up.',true)}speak(`Yes. ${WHY[k]}`,true)}
/* ---- 6. check with the inverse ---- */
function drawCheck(){const g=A.ctx;write(`Sam: 83 − 25 = ${s.guess===62?'62':s.guess}`,A.W/2,26,A.narrow?22:26,{wt:800});
 if(s.inv){const sum=s.guess+25,ok=sum===83;write(`Check: ${s.guess} + 25 = ${sum}`,A.W/2,A.H*.2,A.narrow?20:24,{wt:800,col:ok?A.col.gr:A.col.rd});write(ok?'= 83 ✓ it undoes the take-away':`≠ 83 ✗`,A.W/2,A.H*.29,A.narrow?18:20,{wt:800,col:ok?A.col.gr:A.col.rd})}
 const L=s.L=line(50,70,A.H*.5);drawLine(L,2);s.knob={x:L.at(s.guess),y:L.y};g.fillStyle=A.col.pk;g.beginPath();g.arc(s.knob.x,L.y,14,0,7);g.fill();write(s.guess,s.knob.x,L.y+46,A.narrow?18:20,{wt:800})}
function inverse(){s.inv=true;const sum=s.guess+25;if(sum===83){s.checkOk=true;return speak(`${s.guess} + 25 = 83, so 83 − 25 = ${s.guess} is right. Adding undoes taking away.`,true)}
 speak(s.guess===62?'62 + 25 = 87, not 83. Sam did 5 − 3 in the ones. You cannot take 5 from 3, so take a ten: 13 − 5 = 8. Drag the dot to fix it.':`${s.guess} + 25 = ${sum}. ${sum>83?'Too big: move the dot left.':'Too small: move the dot right.'}`,false)}
function setGuess(v){if(s.checkOk)return;s.guess=Math.max(50,Math.min(70,Math.round(v)));s.inv=false;tell('Answer '+s.guess);A.redraw()}
/* ---- frame ---- */
function draw(){const{ctx:g,W,H,col:C}=A,m=cur();g.fillStyle=A.mix(C.pn,C.cy,.04);g.fillRect(0,0,W,H);
 if(m==='chal'){write('⚡ Within 100',W/2,H*.42,A.narrow?20:24);write('Answer below',W/2,H*.56,15,{col:C.mu,wt:500});A.fx.draw(g);return}
 ({split:drawSplit,'round+':()=>drawRound('add'),'round-':()=>drawRound('sub'),gap:drawGap,pick:drawPick,check:drawCheck})[m]();if(s.msg)banner(s.msg);A.fx.draw(g)}
function speak(t,good){s.msg=t;if(good)A.sound.pop();else if(good===false)A.sound.miss();tell(t);buttons();A.redraw();s.check&&s.check()}
function reset(){for(const k in s)delete s[k];Object.assign(s,{put:{},big:false,adj:0,gi:0,pos:GAPS[0][0],di:0,sorted:[],guess:62,inv:false,msg:'',check:()=>{}});if(A)A.redraw()}
function buttons(){if(!ctl)return;ctl.innerHTML='';const m=cur();if(m==='chal')return;
 const b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(m==='split'&&!s.splitOk)PARTS.forEach(([v],i)=>{if(!s.put[i]){b(`${v} → tens`,()=>putPart(i,'t'),`Put ${v} with the tens`);b(`${v} → ones`,()=>putPart(i,'o'),`Put ${v} with the ones`)}});
 if((m==='round+'||m==='round-')&&!s.roundOk){const k=m==='round+'?'add':'sub';chipText(k).forEach((t,i)=>b(t,()=>i===0?bigJump(k):adjust(k,i===1?1:-1),i===0?`Jump ${t}`:`Adjust ${t}`))}
 if(m==='gap'&&GAPS[s.gi]){b('◀ Back one',()=>moveTo(s.pos-1));b('Up one ▶',()=>moveTo(s.pos+1));b('Check the gap',checkGap)}
 if(m==='pick'&&DECK[s.di])KINDS.forEach(([k,l])=>b(l,()=>sortTo(k),`${DECK[s.di][0]}: ${l}`));
 if(m==='check'&&!s.checkOk){b('◀ One less',()=>setGuess(s.guess-1));b('One more ▶',()=>setGuess(s.guess+1));b('Check with adding',inverse)}}
function down(p){const m=cur();if(m==='chal')return false;
 if(m==='split'&&!s.splitOk){for(let i=0;i<4;i++)if(!s.put[i]&&inside(p,partR(i))){s.drag={i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}return false}
 if((m==='round+'||m==='round-')&&!s.roundOk){const k=m==='round+'?'add':'sub',i=chips().findIndex(r=>inside(p,r));if(i<0)return false;i===0?bigJump(k):adjust(k,i===1?1:-1);return true}
 if((m==='gap'&&GAPS[s.gi])||(m==='check'&&!s.checkOk)){if(s.knob&&Math.abs(p.y-s.knob.y)<44){s.slide=true;(m==='gap'?moveTo:setGuess)(s.L.val(p.x));return true}return false}
 if(m==='pick'&&DECK[s.di]){if(inside(p,s.cardR)){s.drag={x:p.x,y:p.y};return true}const i=[0,1,2].find(j=>inside(p,binR(j)));if(i!=null){sortTo(KINDS[i][0]);return true}}
 return false}
function move(p){const m=cur();if(s.slide)return(m==='gap'?moveTo:setGuess)(s.L.val(p.x));if(s.drag){s.drag.x=p.x;s.drag.y=p.y;A.redraw()}}
function up(){const m=cur(),d=s.drag;if(s.slide){s.slide=false;return m==='gap'?checkGap():inverse()}if(!d)return;s.drag=null;
 if(m==='split'){const T=trays().find(t=>inside(d,t));return T?putPart(d.i,T.k):A.redraw()}
 if(m==='pick'){const i=[0,1,2].find(j=>inside(d,binR(j)));return i!=null?sortTo(KINDS[i][0]):A.redraw()}}
const finish=(i,ok,line)=>()=>{if(A.step===i&&!A.isDone&&(A.pred[i]!=null||!steps[i].predict)&&ok())A.done(line()+A.reveal(i))};
function demo(i,acts){steps[i].go();acts.forEach((f,j)=>setTimeout(()=>{if(A.step===i)f()},A.reduced()?30*(j+1):(j+1)*380))}
function open(i,hint,ok,line){reset();speak(hint);s.check=finish(i,ok,line)}
const steps=[
{h:'Split into tens and ones',p:'Split both numbers. Add the tens, add the ones, then put them back together. 46 + 37 = 70 + 13 = 83.',
 predict:{q:'46 + 37: is the answer in the 70s or the 80s?',opts:['the 70s: 4 tens and 3 tens make 7 tens','the 80s'],ans:1},
 task:'Put all four parts in the right box',show:()=>demo(0,PARTS.map((p,i)=>()=>putPart(i,p[1]))),
 go:()=>open(0,'Drag each part into Tens or Ones.',()=>s.splitOk,()=>'The ones made another ten.')},
{h:'Round and adjust (adding)',p:'29 is 1 less than 30. Add 30, which is easy, then take back the 1 extra. 68 + 29 = 98 − 1 = 97.',
 predict:{q:'68 + 29: you add 30 first. What next?',opts:['add 1 more','take 1 away'],ans:1},
 task:'Work out 68 + 29',show:()=>demo(1,[()=>bigJump('add'),()=>adjust('add',-1)]),
 go:()=>open(1,'Tap + 30 first, then fix it by 1.',()=>s.roundOk,()=>'Add 30, take 1 back.')},
{h:'Round and adjust (taking away)',p:'19 is 1 less than 20. Take away 20, then give back the 1 you took too many. 83 − 19 = 63 + 1 = 64.',
 predict:{q:'83 − 19: you take away 20 first. What next?',opts:['take 1 more away','add 1 back'],ans:1},
 task:'Work out 83 − 19',show:()=>demo(2,[()=>bigJump('sub'),()=>adjust('sub',1)]),
 go:()=>open(2,'Tap − 20 first, then fix it by 1.',()=>s.roundOk,()=>'Take 20, give 1 back.')},
{h:'Count up a small gap',p:'When two numbers are close, the difference is small. Count up from the smaller one: 87 → 90 is 3, 90 → 91 is 1, so 91 − 87 = 4.',
 task:'Find 91 − 87 and 72 − 68',show:()=>demo(3,[()=>moveTo(91),checkGap,()=>moveTo(72),checkGap]),
 go:()=>{open(3,'Drag the purple dot up from the smaller number. Stop at the bigger one.',()=>s.gapOk,()=>'Count up the gap.')}},
{h:'Pick a strategy',p:'Fluent means choosing a quick way for these numbers, not using one way for every sum.',
 task:'Sort all six',show:()=>demo(4,DECK.map(d=>()=>sortTo(d[1]))),
 go:()=>open(4,'Drag the card to the quickest way, or tap a box.',()=>s.pickOk,()=>'Numbers first, then the strategy.')},
{h:'Check with the inverse',p:'Adding undoes taking away. If 83 − 25 = ?, then ? + 25 must make 83 again.',
 predict:{q:'Sam says 83 − 25 = 62. Is Sam right?',opts:['yes','no'],ans:1},
 task:'Check Sam, then fix the answer',show:()=>demo(5,[inverse,()=>setGuess(58),inverse]),
 go:()=>open(5,"Tap 'Check with adding'. If it fails, drag the dot and check again.",()=>s.checkOk,()=>'58 + 25 = 83.')},
{h:'Challenge',p:'',go:()=>{reset();askNext()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>s.check()});
const QS=[
 ['46 + 37 = ?',[['83','ok'],['73','lostten'],['713','glue']]],
 ['68 + 29 = ?',[['97','ok'],['99','wrongway'],['87','lostten']]],
 ['83 − 19 = ?',[['64','ok'],['62','wrongway'],['76','flip']]],
 ['Quickest way for 92 − 88?',[['count up from 88','ok'],['take away 88 one at a time','slow'],['split both into tens and ones','slow']]],
 ['Check 83 − 25 = 58 with…',[['58 + 25','ok'],['83 + 25','inv'],['58 − 25','inv']]],
 ['54 − 27 = ?',[['27','ok'],['33','flip'],['37','lostten']]],
 ['57 + 38 = ?',[['95','ok'],['85','lostten'],['815','glue']]]];
function why(tag){let m='Look at the numbers, pick a strategy, then check with the inverse.';
 if(tag==='lostten')m='The ones made more than 10. That extra ten must join the tens.';
 if(tag==='glue')m='Do not write the tens total and ones total side by side. Add them: 70 + 13 = 83.';
 if(tag==='wrongway')m='You used a ten that was 1 too big. Adjust the other way to undo the extra 1.';
 if(tag==='flip')m='You took the smaller ones digit from the bigger one. When you cannot, take a ten first.';
 if(tag==='slow')m='The numbers are close, so the gap is small. Count up the gap instead.';
 if(tag==='inv')m='The check must undo the take-away: answer + the number taken away = the start.';
 return m}
function askNext(){qn++;const q=QS[qn%QS.length],r=qn%3,opts=[...q[1].slice(r),...q[1].slice(0,r)];
 chal.innerHTML=`<p><b>${q[0]}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');opts.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>mark(t)});tell('Challenge: '+q[0]);A.redraw()}
function mark(tag){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=tag==='ok';
 if(ok)A.win();else A.sound.miss();fb.innerHTML=(ok?'✓ Yes! ':'✗ '+why(tag))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=askNext}
A=FK.shell(c,{steps,ratio:.66,tall:1.4,draw,onStep:X=>{chal.hidden=X.step!==6;ctl.hidden=X.step===6;buttons()},
 init:X=>{A=X;reset();const w=c.el('div',{class:'fl-below'},X.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Strategy buttons'},w);chal=c.el('div',{class:'fl-chal'},X.below);A.gest({down,move,up});buttons()}});
A.start()})})();
