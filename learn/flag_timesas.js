/* Flagship: multiplicative comparison (ages 9-10; CCSS 4.OA.1 "interpret a multiplication equation as a comparison",
   4.OA.2). Build 4 times as many with copies of a bar, race "4 more" against "4 times as many", read 35 = 5 × 7 both
   ways, fit copies of an unknown bar into a whole, and pick the equation for a sentence. Distinct from flagttfam
   (times-table facts) and flagratio (part to part mixing): here one quantity is a number of copies of another. */
(()=>{
VIS.reg('flagtimesas',c=>{let A,ctl,ask,qk=-1,tick=0;const Z={};
const INK='#0f172a',OKG='#047857',BAD='#b91c1c',TOM='#2563eb',SAR='#c2410c',GH='#94a3b8';
const READ=[['35 is 5 times as many as 7',1],['35 is 7 times as many as 5',1],['35 is 5 more than 7',0],['7 is 5 times as many as 35',0]];
const FIND=[[36,4],[40,5],[42,6]];
const WRITE=[{s:'Tom has 8 stickers. Sara has 3 times as many.',e:['s = 3 × 8','s = 8 + 3','s = 8 ÷ 3'],a:0,m:'times',bars:[8,3]},
 {s:'A red ribbon is 6 cm. A blue ribbon is 5 times as long.',e:['b = 6 + 5','b = 5 × 6','b = 6 − 5'],a:1,m:'times',bars:[6,5]},
 {s:'Ali has 30 cards. That is 6 times as many as Ben has.',e:['30 = 6 + b','b = 30 × 6','30 = 6 × b'],a:2,m:'unknown',bars:[5,6]},
 {s:'Mia has 4 more apples than Jo. Jo has 9.',e:['m = 4 × 9','m = 9 + 4','m = 9 ÷ 4'],a:1,m:'more',bars:[9,0]}];
const which=()=>['build','more','read','find','write','chal'][A.step];
const bnd=(v,a,b)=>v<a?a:v>b?b:v;
function chip(t,x,y,o){o=o||{};const g=A.ctx;let f=o.f||(A.narrow?13:15);g.font=`700 ${f}px system-ui,sans-serif`;let w=g.measureText(t).width+16;
 while(w>A.W-8&&f>10){f--;g.font=`700 ${f}px system-ui,sans-serif`;w=g.measureText(t).width+16}const h=f+12,l=bnd(x-w/2,4,A.W-w-4);
 g.fillStyle='#ffffff';A.paint.rrect(l,y-h/2,w,h,8);g.fill();g.lineWidth=o.good||o.bad?3:1.5;g.strokeStyle=o.good?OKG:o.bad?BAD:'#64748b';g.stroke();
 g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,l+w/2,y+1);return{l,w}}
function paper(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.08:.7);g.fillRect(0,0,A.W,A.H)}
/* a bar of n unit cells starting at x, with cell width u; groups of size k get a thick outline */
function bar(x,y,n,u,h,col,k,lab){const g=A.ctx;for(let i=0;i<n;i++){g.fillStyle=A.alpha(col,.85);g.fillRect(x+i*u+1,y,u-2,h)}
 if(k){g.strokeStyle=A.col.dark?'#f8fafc':INK;g.lineWidth=2.5;for(let i=0;i*k<n;i++){g.strokeRect(x+i*k*u,y,Math.min(k,n-i*k)*u,h)}}
 if(lab)chip(lab,x-6,y+h/2,{f:12,align:1})}
function lbl(t,x,y){const g=A.ctx;g.font=`700 ${A.narrow?12:14}px system-ui,sans-serif`;g.fillStyle=A.col.tx;g.textAlign='left';g.textBaseline='middle';g.fillText(t,x,y)}
/* 0: build 4 times as many */
function geoB(){const x=A.W*.06,u=(A.W*.88)/24;return{x,u,h:Math.max(26,A.H*.11)}}
function drawBuild(){paper();const B=Z.build,G=geoB(),y1=A.H*.3,y2=A.H*.58;lbl('Tom: 3 stickers',G.x,y1-G.h*.6);bar(G.x,y1,3,G.u,G.h,TOM,3);
 lbl(`Sara: ${B.n} sticker${B.n===1?'':'s'}`,G.x,y2-G.h*.6);bar(G.x,y2,B.n,G.u,G.h,SAR,3);
 for(let i=0;i<4;i++){A.ctx.setLineDash([5,4]);A.ctx.strokeStyle=GH;A.ctx.lineWidth=1.5;A.ctx.strokeRect(G.x+i*3*G.u,y2,3*G.u,G.h);A.ctx.setLineDash([])}
 const hx=G.x+B.n*G.u;A.ctx.fillStyle=SAR;A.ctx.beginPath();A.ctx.arc(hx,y2+G.h/2,12,0,7);A.ctx.fill();A.ctx.strokeStyle='#fff';A.ctx.lineWidth=3;A.ctx.stroke();
 const k=B.n/3;chip(B.n%3?`${B.n} is not a whole number of Toms`:`${B.n} = ${k} × 3: ${k} time${k>1?'s':''} as many as Tom`,A.W/2,A.H*.84,{good:B.n===12,bad:B.n%3>0});
 chip('Goal: Sara has 4 times as many as Tom',A.W/2,A.H*.09,{good:B.n===12})}
function setN(n){const B=Z.build;n=bnd(Math.round(n),0,24);if(n===B.n)return;B.n=n;A.sound.tick();
 tell(n===12?'Sara has 12. That is 4 copies of Tom’s 3, so 4 times as many: 4 × 3 = 12.':n===7?'7 is 3 + 4. That is 4 more than Tom, not 4 times as many. Make 4 copies of Tom’s bar.':n%3?`${n} stickers. That does not fill whole copies of Tom’s bar.`:`${n} stickers is ${n/3} copies of Tom’s 3, so ${n/3} times as many.`)}
function addCopy(){setN(Math.floor(Z.build.n/3)*3+3)}
/* 1: 4 more or 4 times? */
function drawMore(){paper();const M=Z.more,x=A.W*.06,u=(A.W*.88)/24,h=Math.max(22,A.H*.09),t=M.t,y=[A.H*.24,A.H*.5,A.H*.74];
 lbl(`Tom: ${t}`,x,y[0]-h*.7);bar(x,y[0],t,u,h,TOM,t);lbl(`4 more than Tom: ${t} + 4 = ${t+4}`,x,y[1]-h*.7);bar(x,y[1],t,u,h,TOM);bar(x+t*u,y[1],4,u,h,'#16a34a');
 lbl(`4 times as many as Tom: 4 × ${t} = ${4*t}`,x,y[2]-h*.7);bar(x,y[2],4*t,u,h,SAR,t);
 const win=t+4>4*t?'4 more is bigger':t+4<4*t?'4 times is bigger':'the same';chip(`Tom has ${t}: ${win}`,A.W/2,A.H*.08,{good:M.tried.size>=3&&M.tried.has(1)})}
function setT(t){const M=Z.more;t=bnd(t,1,6);M.t=t;M.tried.add(t);A.sound.tick();
 tell(t===1?'Tom has 1. 4 more gives 5, but 4 times as many gives only 4. Times as many is not always bigger.':`Tom has ${t}. 4 more is ${t+4}, but 4 times as many is ${4*t}. Adding 4 is not the same as making 4 copies.`)}
/* 2: read 35 = 5 × 7 */
function drawRead(){paper();const R=Z.read,g=A.ctx,x=A.W*.06,u=(A.W*.88)/35,h=Math.max(26,A.H*.1),k=R.flip?5:7,n=35/k;
 chip('35 = 5 × 7',A.W/2,A.H*.09,{f:18,good:R.k>=READ.length});lbl(`35 as ${n} groups of ${k}`,x,A.H*.24);bar(x,A.H*.28,35,u,h,SAR,k);
 lbl(`one group: ${k}`,x,A.H*.5);bar(x,A.H*.54,k,u,h,TOM,k);if(R.k<READ.length)chip(`Card ${R.k+1}: "${READ[R.k][0]}"`,A.W/2,A.H*.8,{f:A.narrow?12:15});
 else chip('Both readings are true; the "more" ones are false',A.W/2,A.H*.8,{good:1})}
function judgeRead(v){const R=Z.read;if(R.k>=READ.length)return;const [t,ok]=READ[R.k];if(v!==ok){A.sound.miss();
  return tell(ok?`Look at the bar. "${t}" is true: 35 is ${t.includes('7 times')?'7 copies of 5':'5 copies of 7'}. Tap the bar to regroup it.`:t.includes('more')?'False. 7 + 5 is 12, not 35. "More" means adding; "times as many" means copies.':'False. It is the other way round: 35 is the big amount, so 35 is 5 times as many as 7.')}
 R.k++;A.sound.pop();tell(`${ok?'True':'False'}: ${t}.`+(R.k===READ.length?' One multiplication fact gives two comparisons.':''))}
/* 3: find the unknown */
function drawFind(){paper();const F=Z.find,g=A.ctx,end=F.k>=FIND.length;if(end)F.n=7;
 const [big,k]=FIND[end?2:F.k],x=A.W*.06,u=(A.W*.88)/big,h=Math.max(26,A.H*.1),y1=A.H*.3,y2=A.H*.62;
 chip(`${big} is ${k} times as many as a number. Find the number.`,A.W/2,A.H*.09,{f:A.narrow?12:15});lbl(`${big}`,x,y1-h*.6);bar(x,y1,big,u,h,SAR);
 for(let i=0;i<k;i++){const ox=x+i*F.n*u;g.setLineDash([6,4]);g.strokeStyle=A.col.dark?'#f8fafc':INK;g.lineWidth=2;g.strokeRect(ox,y1-3,F.n*u,h+6);g.setLineDash([])}
 lbl(`the number: ${F.n}`,x,y2-h*.6);bar(x,y2,F.n,u,h,TOM);const hx=x+F.n*u;g.fillStyle=TOM;g.beginPath();g.arc(hx,y2+h/2,12,0,7);g.fill();g.strokeStyle='#fff';g.lineWidth=3;g.stroke();
 chip(end?'All 3 solved: divide the big amount by the times':k*F.n===big?`${k} × ${F.n} = ${big}: it fits`:k*F.n>big?`${k} × ${F.n} = ${k*F.n}: too big`:`${k} × ${F.n} = ${k*F.n}: too small`,A.W/2,A.H*.86,{good:k*F.n===big,bad:k*F.n!==big})}
function setF(n){const F=Z.find;if(F.k>=FIND.length)return;n=bnd(Math.round(n),1,FIND[F.k][0]);if(n===F.n)return;F.n=n;A.sound.tick();A.redraw()}
function checkF(){const F=Z.find;if(F.k>=FIND.length)return;const [big,k]=FIND[F.k];
 if(k*F.n!==big){A.sound.miss();return tell(F.n===big-k?`${F.n} is ${big} − ${k}. That treats "times" as "more". ${k} copies of ${F.n} make ${k*F.n}.`:`${k} copies of ${F.n} make ${k*F.n}, not ${big}. Drag the bar until ${k} copies fit exactly.`)}
 F.k++;A.sound.pop();tell(`${k} × ${big/k} = ${big}, so the number is ${big} ÷ ${k} = ${big/k}.`+(F.k<FIND.length?' Next one.':''));if(F.k<FIND.length)F.n=1}
function solveF(){const F=Z.find;if(F.k>=FIND.length)return;F.n=FIND[F.k][0]/FIND[F.k][1];checkF()}
/* 4: write the equation */
function tiles(){const n=3,w=A.W*.28,gap=A.W*.04,x0=(A.W-n*w-(n-1)*gap)/2;return[0,1,2].map(i=>({x:x0+i*(w+gap),y:A.H*.68,w,h:A.H*.16}))}
function drawWrite(){paper();const Wt=Z.write,g=A.ctx,end=Wt.k>=WRITE.length,Q=WRITE[end?3:Wt.k];if(end)chip('4 equations written: times multiplies, more adds',A.W/2,A.H*.92,{good:1});
 chip(Q.s,A.W/2,A.H*.1,{f:A.narrow?12:15});const [a,k]=Q.bars,x=A.W*.06,u=(A.W*.88)/36,h=Math.max(20,A.H*.08);
 if(Q.m==='more'){bar(x,A.H*.26,a,u,h,TOM);bar(x,A.H*.42,a,u,h,SAR);bar(x+a*u,A.H*.42,4,u,h,'#16a34a')}else{bar(x,A.H*.26,a,u,h,TOM,a);bar(x,A.H*.42,a*k,u,h,SAR,a)}
 lbl(Q.m==='more'?'same as Jo, then 4 more':`${k} copies`,x,A.H*.58);
 tiles().forEach((t,i)=>{g.fillStyle=A.col.dark?'#1e293b':'#ffffff';A.paint.rrect(t.x,t.y,t.w,t.h,10);g.fill();const hit=end&&i===Q.a;g.strokeStyle=hit?OKG:Wt.bad===i?BAD:'#64748b';g.lineWidth=hit||Wt.bad===i?3:1.5;g.stroke();
  g.fillStyle=A.col.tx;g.font=`700 ${A.narrow?13:17}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(Q.e[i],t.x+t.w/2,t.y+t.h/2)})}
function pickEq(i){const Wt=Z.write;if(Wt.k>=WRITE.length)return;const Q=WRITE[Wt.k];if(i!==Q.a){Wt.bad=i;A.sound.miss();
  const e=Q.e[i];return tell(Q.m==='more'?'"4 more" means add 4 to Jo’s 9. Times would make 4 copies of 9.':e.includes('+')||e.includes('−')?'"Times as many" means copies, so multiply. Adding or taking away is for "more" or "fewer".':e.includes('÷')?'The new amount is bigger, so it is not a share. Multiply.':'Ali’s 30 is the big amount. 30 is 6 copies of Ben’s cards, so 30 = 6 × b.')}
 Wt.k++;Wt.bad=-1;A.sound.pop();tell(`${Q.e[i]}.`+(Q.m==='more'?' This one was "more", so it adds.':' "Times as many" multiplies.'))}
function draw(){const k=which();if(k==='chal'){paper();bar(A.W*.1,A.H*.4,3,A.W*.05,A.H*.12,TOM,3);bar(A.W*.1,A.H*.6,12,A.W*.05,A.H*.12,SAR,3);chip('Challenge',A.W/2,A.H*.12,{good:1});return}
 ({build:drawBuild,more:drawMore,read:drawRead,find:drawFind,write:drawWrite})[k]();A.fx.draw(A.ctx)}
function down(p){const k=which();if(k==='build'){const G=geoB();if(p.y>A.H*.45&&p.y<A.H*.75){Z.drag='b';setN((p.x-G.x)/G.u);return true}return false}
 if(k==='more'){setT(Math.ceil((p.x-A.W*.06)/(A.W*.88/24)));return false}
 if(k==='read'){Z.read.flip=!Z.read.flip;A.sound.pop();tell(Z.read.flip?'Regrouped: 35 is 7 groups of 5.':'Regrouped: 35 is 5 groups of 7.');return false}
 if(k==='find'){if(p.y>A.H*.5){Z.drag='f';const F=Z.find;if(F.k<FIND.length)setF((p.x-A.W*.06)/(A.W*.88/FIND[F.k][0]));return true}return false}
 if(k==='write'){const i=tiles().findIndex(t=>p.x>t.x&&p.x<t.x+t.w&&p.y>t.y&&p.y<t.y+t.h);if(i>=0)pickEq(i);return false}return false}
function move(p){if(Z.drag==='b')setN((p.x-geoB().x)/geoB().u);if(Z.drag==='f'){const F=Z.find;if(F.k<FIND.length)setF((p.x-A.W*.06)/(A.W*.88/FIND[F.k][0]))}}
function up(){if(Z.drag==='f')checkF();Z.drag=0}
function fresh(){tick++;for(const k in Z)delete Z[k];Object.assign(Z,{build:{n:3},more:{t:3,tried:new Set([3])},read:{k:0,flip:0},find:{k:0,n:1},write:{k:0,bad:-1},drag:0,check:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();btns();Z.check()}
const reach=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,desc,ok,msg){fresh();c.say(desc);A.cv.setAttribute('aria-label',desc);btns();Z.check=reach(i,ok,msg)}
function auto(i,acts,ms){steps[i].go();const t0=tick;acts.forEach((f,j)=>setTimeout(()=>{if(t0===tick)f()},ms*(j+1)))}
function btns(){if(!ctl)return;ctl.innerHTML='';const k=which(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn sm','aria-label':l||t},ctl,t).onclick=f};
 if(k==='build'){B('− 1',()=>setN(Z.build.n-1),'Take one sticker from Sara');B('+ 1',()=>setN(Z.build.n+1),'Give Sara one more sticker');B('Add a copy of Tom',addCopy,'Add one more copy of Tom’s 3 stickers')}
 if(k==='more')[1,2,3,4,5,6].forEach(t=>B('Tom has '+t,()=>setT(t)));
 if(k==='read'){B('True',()=>judgeRead(1),'This card is true');B('False',()=>judgeRead(0),'This card is false');B('Regroup the bar',()=>down({x:0,y:0}))}
 if(k==='find'&&Z.find.k<FIND.length){B('− 1',()=>setF(Z.find.n-1),'Make the number 1 smaller');B('+ 1',()=>setF(Z.find.n+1),'Make the number 1 bigger');B('Check',checkF,'Check if the copies fit')}
 if(k==='write'&&Z.write.k<WRITE.length)WRITE[Z.write.k].e.forEach((e,i)=>B(e,()=>pickEq(i),'Choose '+e))}
const steps=[
{h:'Times as many',p:'Tom has 3 stickers. Sara has 4 times as many. Drag Sara’s bar, or add copies of Tom’s bar.',
 predict:{q:'How many stickers does Sara have?',opts:['7','12','4'],ans:1},task:'Make Sara’s bar 4 times as long as Tom’s',
 show:()=>auto(0,[addCopy,addCopy,addCopy],600),
 go:()=>begin(0,'Two bars. Tom has 3 stickers. Sara starts with 3. Dashed boxes show 4 copies of Tom’s bar.',()=>Z.build.n===12,'4 times as many as 3 is 4 × 3 = 12.')},
{h:'More or times?',p:'Compare "4 more than Tom" with "4 times as many as Tom". Tap a bar or a button to change Tom’s amount.',
 predict:{q:'Tom has 1. Which gives Sara more?',opts:['4 times as many','4 more','they are the same'],ans:1},task:'Try Tom = 1 and two other amounts',
 show:()=>auto(1,[()=>setT(1),()=>setT(5),()=>setT(2)],700),
 go:()=>begin(1,'Three bars: Tom has 3; 4 more than Tom is 7; 4 times as many as Tom is 12.',()=>Z.more.tried.has(1)&&Z.more.tried.size>=3,'"More" adds; "times as many" makes copies.')},
{h:'Read it two ways',p:'35 = 5 × 7. Tap the bar to regroup it. Is each card true or false?',task:'Judge all 4 cards',
 show:()=>auto(2,[()=>judgeRead(1),()=>down({x:0,y:0}),()=>judgeRead(1),()=>judgeRead(0),()=>judgeRead(0)],550),
 go:()=>begin(2,'A bar of 35 split into 5 groups of 7, and one group of 7 below it.',()=>Z.read.k>=READ.length,'35 = 5 × 7 means 35 is 5 times as many as 7, and 7 times as many as 5.')},
{h:'Find the number',p:'Drag the blue bar until its copies fit the orange bar exactly, then let go or tap Check.',
 predict:{q:'36 is 4 times as many as a number. The number is…',opts:['32','9','144'],ans:1},task:'Solve all 3',
 show:()=>auto(3,[solveF,solveF,solveF],800),
 go:()=>begin(3,'An orange bar of 36. A blue bar for the unknown number, with 4 dashed copies over the orange bar.',()=>Z.find.k>=FIND.length,'If a is k times as many as b, then b = a ÷ k.')},
{h:'Write the equation',p:'Read the sentence, look at the bars and tap the matching equation.',task:'Write all 4 equations',
 show:()=>auto(4,WRITE.map(q=>()=>pickEq(q.a)),600),
 go:()=>begin(4,'A sentence, a bar model and three equations to choose from.',()=>Z.write.k>=WRITE.length,'Times as many multiplies; more adds.')},
{h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.check()});
const QS=[
 {q:'A dog weighs 6 kg. A man weighs 12 times as much. How much does the man weigh?',a:'72 kg',o:[['18 kg','add'],['2 kg','div']]},
 {q:'What does 24 = 3 × 8 tell you?',a:'24 is 3 times as many as 8',o:[['24 is 3 more than 8','more'],['8 is 3 times as many as 24','swap']]},
 {q:'48 is 6 times as many as a number. What is the number?',a:'8',o:[['42','sub'],['288','mult']]},
 {q:'Jo has 2 sweets. Which gives Kim more: 3 more than Jo, or 3 times as many?',a:'3 times as many: 6',o:[['3 more: 5','bigger'],['They are the same','bigger']]},
 {q:'Eva has 5 shells. Leo has 4 times as many. Which equation fits?',a:'L = 4 × 5',o:[['L = 5 + 4','add'],['L = 5 ÷ 4','div']]},
 {q:'A tree is 20 m tall. That is 5 times as tall as a shed. How tall is the shed?',a:'4 m',o:[['100 m','mult'],['15 m','sub']]}];
function why(t){let m='Times as many means copies of the smaller amount.';
 if(t==='add')m='That adds the numbers. "Times as many" means copies, so multiply.';
 if(t==='div')m='The amount that is times as many is the bigger one, so multiply, do not divide.';
 if(t==='more')m='"More" would mean 8 + 3 = 11. 24 = 3 × 8 means 3 copies of 8.';
 if(t==='swap')m='The bigger number is the one that is times as many. 24 is 3 copies of 8.';
 if(t==='sub')m='That takes away. Here the big amount is copies of the number, so divide.';
 if(t==='mult')m='The number is smaller than the big amount. Divide the big amount by the times.';
 if(t==='bigger')m='It depends on the start. For 2: 3 more is 5 but 3 times as many is 6. For 1, 3 more wins.';
 return m}
function quiz(){qk++;const Q=QS[qk%QS.length],all=[[Q.a,'ok'],...Q.o],r=qk%3,ord=all.slice(r).concat(all.slice(0,r));
 ask.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=ask.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},box,v).onclick=()=>judge(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function judge(t,a){ask.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=ask.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1,draw,onStep:B=>{ask.hidden=B.step!==5;ctl.hidden=B.step===5;btns()},
 init:B=>{A=B;const box=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Comparison controls'},box);ask=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});btns()}}).start()})})();
