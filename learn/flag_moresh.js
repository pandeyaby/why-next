/* Flagship: decomposing a shape into more equal shares (ages 6-7; CCSS 1.G.3 "understand for these examples that
   decomposing into more equal shares creates smaller shares"; NC Year 1 fractions "recognise, find and name a half as
   one of two equal parts ... a quarter as one of four equal parts"). Seat more friends at one pizza and watch every
   share shrink, fold a paper in half again and again, lay quarters on a half to see two cover it, judge whether cuts
   are equal shares, and line up slices of the same pizza from biggest to smallest. Distinct from flagfcmp (ages 7-8:
   naming and ordering unit fractions with < and >): here the learner meets the idea with real sharing, folding and
   covering, without fraction symbols. */
(()=>{
VIS.reg('flagmoresh',c=>{let A,pad,chal,qn=-1,gen=0;const S={};c.fig.classList.add('young');
const CRUST='#d97706',CHEESE='#fde68a',EDGE='#78350f',PEP='#b91c1c',PAPER='#fefce8',INK='#0f172a',OKC='#047857',BADC='#b91c1c',SHADE='#60a5fa';
const ORDER=[6,3,8,2,4],SHARES=[2,3,4,6,8];
const CUTS=[{k:'pie4',fair:1,say:'Four slices, all the same size. These are quarters.'},
 {k:'strips',fair:0,say:'Four strips, but some are wide and some are thin. They are not quarters.'},
 {k:'diag',fair:1,say:'Corner to corner makes two triangles of the same size. They are halves too.'},
 {k:'chord',fair:0,say:'Two parts, but one is much bigger. Not halves.'},
 {k:'thirds',fair:1,say:'Three strips of the same width. Three equal shares.'}];
const stage=()=>['seat','fold','cover','fair','line','chal'][A.step];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function tag(t,x,y,o){o=o||{};const g=A.ctx;let px=o.px||(A.narrow?14:16);g.font=`800 ${px}px system-ui,sans-serif`;let w=g.measureText(t).width+18;
 while(w>A.W-8&&px>10){px--;g.font=`800 ${px}px system-ui,sans-serif`;w=g.measureText(t).width+18}const h=px+13,l=clamp(x-w/2,4,A.W-w-4);
 g.fillStyle='#ffffff';A.paint.rrect(l,y-h/2,w,h,9);g.fill();g.lineWidth=o.ring?3:1.5;g.strokeStyle=o.ring||'#64748b';g.stroke();
 g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,l+w/2,y+1)}
function backdrop(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#fff7ed',A.col.dark?.1:.6);g.fillRect(0,0,A.W,A.H)}
/* one wedge of a pizza, pointing up when a0 is centred on -90 degrees */
function wedge(x,y,r,a0,a1,o){o=o||{};const g=A.ctx,full=a1-a0>6.28;g.beginPath();if(!full)g.moveTo(x,y);g.arc(x,y,r,a0,a1);g.closePath();
 g.fillStyle=o.ghost?'rgba(0,0,0,0)':CRUST;g.fill();if(!o.ghost){g.beginPath();if(!full)g.moveTo(x,y);g.arc(x,y,r*.86,a0,a1);g.closePath();g.fillStyle=o.lit?'#fcd34d':CHEESE;g.fill()}
 g.setLineDash(o.ghost?[6,5]:[]);g.lineWidth=o.ghost?2.5:2;g.strokeStyle=o.ghost?A.col.tx:EDGE;g.beginPath();if(!full)g.moveTo(x,y);g.arc(x,y,r,a0,a1);g.closePath();g.stroke();g.setLineDash([])}
function slice(x,y,r,n,o){const t=Math.PI*2/n;wedge(x,y,r,-Math.PI/2-t/2,-Math.PI/2+t/2,o)}
function pizza(x,y,r,n,lit){const t=Math.PI*2/n;for(let i=0;i<n;i++)wedge(x,y,r,-Math.PI/2-t/2+i*t,-Math.PI/2+t/2+i*t,{lit:i===lit});
 const g=A.ctx;g.fillStyle=PEP;[[.4,.2],[-.35,.35],[.1,-.5],[-.3,-.25],[.45,-.3]].forEach(([u,v])=>{g.beginPath();g.arc(x+u*r,y+v*r,r*.07,0,7);g.fill()})}
function heads(n,x,y,sz){const g=A.ctx,cols=['#2563eb','#db2777','#16a34a','#7c3aed','#c2410c','#0891b2','#4d7c0f','#be123c'];const gap=sz*2.3,x0=x-(n-1)*gap/2;
 for(let i=0;i<n;i++){g.fillStyle=cols[i];g.beginPath();g.arc(x0+i*gap,y,sz,0,7);g.fill();g.fillRect(x0+i*gap-sz*.9,y+sz*.9,sz*1.8,sz*1.1)}}
/* 0: more people at one pizza */
function drawSeat(){backdrop();const T=S.seat,r=Math.min(A.W*.2,A.H*.3),py=A.H*.52;pizza(A.W*.26,py,r,T.n,0);heads(T.n,A.W*.26,A.H*.9,A.narrow?7:9);
 tag('One share',A.W*.75,A.H*.14,{px:12});if(T.seen[2]&&T.n>2)slice(A.W*.75,py+r*.35,r,2,{ghost:1});slice(A.W*.75,py+r*.35,r,T.n,{lit:1});
 if(T.seen[2]&&T.n>2)tag('dashes: one share of 2',A.W*.75,A.H*.93,{px:11});
 tag(T.n===1?'Just you: the whole pizza':`${T.n} people share: ${T.n} equal slices`,A.W/2,A.H*.06,{ring:T.seen[2]&&T.seen[4]?OKC:0})}
function seatN(n){const T=S.seat;n=clamp(n,1,8);if(n===T.n)return say(n===8?'8 people is the most at this table.':'Just you: the whole pizza is yours.');T.n=n;T.seen[n]=1;A.sound.pop();
 say(n===1?'Just you. One share is the whole pizza.':n===2?'2 people: 2 equal slices. Each one is a half.':n===4?'4 people: 4 equal slices, quarters. Each slice is smaller than a half.':`${n} people: ${n} equal slices. More people, so each slice is smaller.`)}
/* 1: fold the paper */
function sheet(){const w=A.W*.5,h=Math.min(A.H*.62,w*.75);return{x:A.W*.06,y:A.H*.2,w,h}}
function drawFold(){backdrop();const g=A.ctx,F=S.fold,R=sheet(),cols=F.k>2?4:F.k>0?2:1,rows=F.k>1?2:1,pw=R.w/cols,ph=R.h/rows;
 g.fillStyle=PAPER;g.fillRect(R.x,R.y,R.w,R.h);g.fillStyle=SHADE;g.fillRect(R.x,R.y,pw,ph);g.strokeStyle=INK;g.lineWidth=2;g.strokeRect(R.x,R.y,R.w,R.h);
 g.setLineDash([7,5]);for(let i=1;i<cols;i++){g.beginPath();g.moveTo(R.x+i*pw,R.y);g.lineTo(R.x+i*pw,R.y+R.h*(i===cols-1&&F.grow<1?F.grow:1));g.stroke()}
 if(rows>1){g.beginPath();g.moveTo(R.x,R.y+ph);g.lineTo(R.x+R.w*(F.k===2?F.grow:1),R.y+ph);g.stroke()}g.setLineDash([]);
 const parts=cols*rows,bx=A.W*.62,bw=A.W*.33;tag(`${F.k} fold${F.k===1?'':'s'}: ${parts} equal part${parts>1?'s':''}`,A.W/2,A.H*.08,{ring:F.k===3?OKC:0});
 [1,2,4,8].forEach((n,i)=>{const y=A.H*(.3+i*.17);if(n>parts)return;g.fillStyle=n===parts?SHADE:A.alpha(SHADE,.35);g.fillRect(bx,y,bw/n,A.H*.07);g.strokeStyle=A.col.tx;g.lineWidth=1.5;g.strokeRect(bx,y,bw/n,A.H*.07);
  tag(['whole','half','quarter','eighth'][i],bx+bw*.62,y+A.H*.035,{px:11})})}
function foldIt(){const F=S.fold;if(F.k>=3)return say('8 parts now. The paper is too thick to fold again.');F.k++;F.grow=0;A.sound.whoosh();A.tween(F,{grow:1},380,'out');
 say(['','One fold: 2 equal parts, halves.','Two folds: 4 equal parts, quarters. Each is half of a half.','Three folds: 8 equal parts, eighths. Smaller again.'][F.k])}
function unfold(){S.fold.k=0;S.fold.grow=1;A.sound.tick();say('Flat again: one whole sheet.')}
/* 2: lay quarters on a half */
function squares(){const s=Math.min(A.W*.38,A.H*.6),y=A.H*.24;return{s,y,L:A.W*.06,Rx:A.W*.56}}
function drawCover(){backdrop();const g=A.ctx,Q=squares(),C=S.cover;g.fillStyle=PAPER;g.fillRect(Q.L,Q.y,Q.s,Q.s);g.fillStyle=A.alpha(OKC,.28);g.fillRect(Q.L,Q.y,Q.s/2,Q.s);
 g.strokeStyle=INK;g.lineWidth=2;g.strokeRect(Q.L,Q.y,Q.s,Q.s);g.beginPath();g.moveTo(Q.L+Q.s/2,Q.y);g.lineTo(Q.L+Q.s/2,Q.y+Q.s);g.stroke();
 g.setLineDash([6,5]);g.strokeRect(Q.Rx,Q.y,Q.s,Q.s);g.setLineDash([]);tag('one half',Q.L+Q.s/4,Q.y-14,{px:12});tag('quarters',Q.Rx+Q.s/2,Q.y-14,{px:12});
 C.pc.forEach(p=>{g.fillStyle=p.on?'#fbbf24':SHADE;g.fillRect(p.x,p.y,Q.s/2,Q.s/2);g.strokeStyle=INK;g.lineWidth=2;g.strokeRect(p.x,p.y,Q.s/2,Q.s/2)});
 const n=C.pc.filter(p=>p.on).length;tag(n===2?'Two quarters cover one half':n===1?'One quarter covers only part of the half':'Drag a quarter onto the half',A.W/2,A.H*.08,{ring:n===2?OKC:0})}
function homes(){const Q=squares();S.cover.pc.forEach((p,i)=>{if(!p.on){p.x=Q.Rx+(i%2)*Q.s/2;p.y=Q.y+(i>1?Q.s/2:0)}})}
function land(p){const Q=squares(),C=S.cover,cx=p.x+Q.s/4,cy=p.y+Q.s/4,n=C.pc.filter(q=>q.on).length;
 if(cx>Q.L&&cx<Q.L+Q.s/2+Q.s*.1&&cy>Q.y-Q.s*.1&&cy<Q.y+Q.s*1.1){if(n>=2){homes();A.sound.miss();return say('The half is already covered. Two quarters were enough.')}
  p.on=1;p.x=Q.L;p.y=Q.y+n*Q.s/2;A.sound.pop();return say(n?'Two quarters cover the half exactly. A half is the same as two quarters, so one quarter is smaller.':'One quarter covers only part of the half. There is still a gap.')}
 homes();A.sound.miss();say('Put the quarter on the green half, on the left.')}
function layOne(){const p=S.cover.pc.find(q=>!q.on);if(!p)return say('All the quarters that fit are on the half.');land(Object.assign(p,{x:squares().L,y:squares().y}))}
/* 3: equal shares or not */
function drawCut(k,x,y,s){const g=A.ctx;g.lineWidth=2.5;g.strokeStyle=INK;g.fillStyle=PAPER;const r=s/2,cx=x+r,cy=y+r;
 if(k==='pie4'||k==='chord'){g.beginPath();g.arc(cx,cy,r,0,7);g.fill();g.stroke()}else{g.fillRect(x,y+(k==='diag'?0:s*.15),s,k==='diag'?s:s*.7);g.strokeRect(x,y+(k==='diag'?0:s*.15),s,k==='diag'?s:s*.7)}
 g.beginPath();if(k==='pie4'){g.moveTo(cx-r,cy);g.lineTo(cx+r,cy);g.moveTo(cx,cy-r);g.lineTo(cx,cy+r)}
 if(k==='strips')[.12,.35,.68].forEach(u=>{g.moveTo(x+s*u,y+s*.15);g.lineTo(x+s*u,y+s*.85)});
 if(k==='thirds')[1/3,2/3].forEach(u=>{g.moveTo(x+s*u,y+s*.15);g.lineTo(x+s*u,y+s*.85)});
 if(k==='diag'){g.moveTo(x,y);g.lineTo(x+s,y+s)}if(k==='chord'){const d=r*.5,h=Math.sqrt(r*r-d*d);g.moveTo(cx+d,cy-h);g.lineTo(cx+d,cy+h)}g.stroke()}
function zones(){return[{x:A.W*.58,y:A.H*.2,w:A.W*.38,h:A.H*.3,fair:1,t:'Equal shares'},{x:A.W*.58,y:A.H*.58,w:A.W*.38,h:A.H*.3,fair:0,t:'Not equal'}]}
function drawFair(){backdrop();const F=S.fair,g=A.ctx,s=Math.min(A.W*.44,A.H*.62);if(F.k<CUTS.length)drawCut(CUTS[F.k].k,A.W*.06,A.H*.22,s);else{const t=Math.min(A.W*.15,A.H*.24);CUTS.forEach((m,i)=>{const x=A.W*.04+(i%3)*t*1.15,y=A.H*.2+Math.floor(i/3)*t*1.35;drawCut(m.k,x,y,t);tag(m.fair?'equal':'not equal',x+t/2,y+t+9,{px:10,ring:m.fair?OKC:BADC})})}
 zones().forEach(z=>{g.fillStyle=A.alpha(z.fair?OKC:BADC,.14);A.paint.rrect(z.x,z.y,z.w,z.h,12);g.fill();g.strokeStyle=z.fair?OKC:BADC;g.lineWidth=2.5;g.stroke();tag(z.t,z.x+z.w/2,z.y+z.h/2,{px:13})});
 tag(F.k>=CUTS.length?'Equal shares must be the same size':`Shape ${F.k+1} of ${CUTS.length}: equal or not?`,A.W/2,A.H*.08,{ring:F.k>=CUTS.length?OKC:0})}
function judge(fair){const F=S.fair;if(F.k>=CUTS.length)return;const m=CUTS[F.k];if(!!m.fair!==fair){A.sound.miss();return say((fair?'Look again: are all the parts the same size? ':'Look again: check each part against the others. ')+m.say)}
 F.k++;A.sound.pop();say(m.say+(F.k>=CUTS.length?' Counting parts is not enough: equal shares are the same size.':''))}
/* 4: order slices of the same pizza */
function spots(){const r=Math.min(A.W*.088,A.H*.2);return{r,top:A.H*.46,bot:A.H*.84,gap:A.W/5}}
function drawLine(){backdrop();const P=spots(),L=S.line,left=ORDER.filter(n=>!L.row.includes(n));
 left.forEach((n,i)=>{const x=P.gap*(i+.5);slice(x,P.top,P.r,n,{});tag(String(n),x,P.top+14,{px:11})});
 L.row.forEach((n,i)=>{const x=P.gap*(i+.5);slice(x,P.bot,P.r,n,{lit:1});tag(String(n),x,P.bot+14,{px:11})});
 tag(L.row.length===5?'Fewer people, bigger slice':'Tap the biggest slice left',A.W/2,A.H*.07,{ring:L.row.length===5?OKC:0});tag('number = people sharing one pizza',A.W/2,A.H*.17,{px:11})}
function place(n){const L=S.line;if(L.row.includes(n))return;const want=SHARES.find(v=>!L.row.includes(v));
 if(n!==want){A.sound.miss();return say(`That slice is shared by ${n}. The slice shared by ${want} is bigger, because fewer people share it.`)}L.row.push(n);A.sound.pop();
 say(L.row.length<5?`Shared by ${n}: next biggest.`:'In order: shared by 2 is biggest, shared by 8 is smallest. More equal shares make smaller shares.')}
function draw(){const k=stage();if(k==='chal'){backdrop();pizza(A.W/2,A.H*.58,Math.min(A.W*.2,A.H*.3),4,0);tag('Challenge',A.W/2,A.H*.12,{ring:OKC});return}
 ({seat:drawSeat,fold:drawFold,cover:drawCover,fair:drawFair,line:drawLine})[k]();A.fx.draw(A.ctx)}
function down(p){const k=stage();if(k==='seat'){seatN(S.seat.n>=8?1:S.seat.n+1);return false}
 if(k==='fold'){const R=sheet();if(p.x>R.x&&p.x<R.x+R.w&&p.y>R.y&&p.y<R.y+R.h)foldIt();return false}
 if(k==='cover'){const Q=squares(),hit=S.cover.pc.find(q=>!q.on&&p.x>q.x&&p.x<q.x+Q.s/2&&p.y>q.y&&p.y<q.y+Q.s/2);if(hit){S.grab={q:hit,dx:p.x-hit.x,dy:p.y-hit.y};return true}return false}
 if(k==='fair'){const z=zones().find(z=>p.x>z.x&&p.x<z.x+z.w&&p.y>z.y&&p.y<z.y+z.h);if(z)judge(!!z.fair);return false}
 if(k==='line'&&p.y<A.H*.62){const left=ORDER.filter(n=>!S.line.row.includes(n)),i=clamp(Math.floor(p.x/spots().gap),0,left.length-1);if(left.length)place(left[i]);return false}return false}
function move(p){const G=S.grab;if(!G)return;G.q.x=p.x-G.dx;G.q.y=p.y-G.dy;A.redraw()}
function up(){const G=S.grab;S.grab=null;if(G)land(G.q)}
function reset(){gen++;for(const k in S)delete S[k];Object.assign(S,{seat:{n:1,seen:{1:1}},fold:{k:0,grow:1},cover:{pc:[0,1,2,3].map(()=>({x:0,y:0,on:0}))},fair:{k:0},line:{row:[]},grab:null,check:()=>{}});homes()}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();S.check()}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function enter(i,desc,ok,msg){reset();c.say(desc);A.cv.setAttribute('aria-label',desc);controls();S.check=finish(i,ok,msg)}
function demo(i,acts,ms){steps[i].go();const g0=gen;acts.forEach((f,j)=>setTimeout(()=>{if(g0===gen)f()},ms*(j+1)))}
function controls(){if(!pad)return;pad.innerHTML='';const k=stage(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='seat'){B('Add a friend',()=>seatN(S.seat.n+1),'Add a friend to share the pizza');B('Take one away',()=>seatN(S.seat.n-1),'Take a friend away')}
 if(k==='fold'){B('Fold',foldIt,'Fold the paper in half again');B('Unfold',unfold,'Unfold the paper')}
 if(k==='cover')B('Lay a quarter on the half',layOne);
 if(k==='fair'){B('Equal shares',()=>judge(true),'These are equal shares');B('Not equal',()=>judge(false),'These are not equal shares')}
 if(k==='line')ORDER.forEach(n=>{if(!S.line.row.includes(n))B('Shared by '+n,()=>place(n),'Put the slice shared by '+n+' people next')})}
const steps=[
{h:'More friends',p:'One pizza. Add friends, one by one. Watch the size of one share.',
 predict:{q:'First 2 people share the pizza. Then 4 people share the same pizza. Each slice gets…',opts:['bigger','smaller','the same size'],ans:1},task:'Share the pizza with 2, then with 4',
 show:()=>demo(0,[1,2,3].map(n=>()=>seatN(n+1)),500),
 go:()=>enter(0,'One whole pizza and one person. On the right, the size of one share.',()=>S.seat.seen[2]&&S.seat.seen[4],'More people sharing means smaller slices.')},
{h:'Fold the paper',p:'Tap the paper, or press Fold. Each fold cuts every part in half.',
 predict:{q:'Fold a paper in half, then in half again. How many equal parts?',opts:['3','4','2'],ans:1},task:'Fold the paper 3 times',
 show:()=>demo(1,[foldIt,foldIt,foldIt],600),
 go:()=>enter(1,'A flat sheet of paper. The blue corner shows one part.',()=>S.fold.k===3,'2, then 4, then 8 parts. More parts, smaller parts.')},
{h:'Half or quarter?',p:'Two squares the same size. One is cut in halves, one in quarters. Drag quarters onto the green half.',
 predict:{q:'Which is bigger: one half or one quarter of the same square?',opts:['a quarter, because 4 is more than 2','a half','they are the same size'],ans:1},task:'Cover the half with quarters',
 show:()=>demo(2,[layOne,layOne],600),
 go:()=>enter(2,'Left: a square in two halves, one half green. Right: four quarter pieces.',()=>S.cover.pc.filter(q=>q.on).length===2,'Two quarters make one half.')},
{h:'Fair shares?',p:'Equal shares are all the same size. Is each shape cut into equal shares? Tap a box.',task:'Judge all 5 shapes',
 show:()=>demo(3,CUTS.map(m=>()=>judge(!!m.fair)),450),
 go:()=>enter(3,'A cut shape on the left. Two boxes: Equal shares and Not equal.',()=>S.fair.k>=CUTS.length,'Same size parts are equal shares.')},
{h:'Biggest to smallest',p:'Five slices from pizzas of the same size. Tap them from the biggest slice to the smallest.',
 predict:{q:'Which slice is the biggest?',opts:['shared by 8','shared by 2','they are all the same'],ans:1},task:'Line up all 5 slices, biggest first',
 show:()=>demo(4,SHARES.map(n=>()=>place(n)),450),
 go:()=>enter(4,'Five pizza slices in a jumble, each shared by a different number of people.',()=>S.line.row.length===5,'Shared by 2 is biggest. Shared by 8 is smallest.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[
 {q:'One pizza is shared by 2 people. The same pizza is shared by 8 people. Who gets the bigger slice?',a:'Each of the 2 people',o:[['Each of the 8 people','count'],['They get the same','same']]},
 {q:'Which is bigger: a half or a quarter of the same cake?',a:'A half',o:[['A quarter','count'],['They are the same','same']]},
 {q:'A sandwich is cut into 4 parts of different sizes. Are they quarters?',a:'No, quarters are equal',o:[['Yes, there are 4 parts','unequal'],['Yes, if it is a square','unequal']]},
 {q:'You fold a paper in half, then in half again. How many equal parts?',a:'4',o:[['3','fold'],['2','fold']]},
 {q:'How many quarters cover one half of the same shape?',a:'2',o:[['4','cover'],['1','cover']]},
 {q:'More people share the same pie. What happens to each share?',a:'It gets smaller',o:[['It gets bigger','more'],['It stays the same','same']]}];
function why(t){let m='Think of one pizza: the more people share it, the smaller each slice.';
 if(t==='count')m='More pieces does not mean bigger pieces. The same whole cut into more parts gives smaller parts.';
 if(t==='same')m='The whole stays the same, but it is cut into more parts, so each part is smaller.';
 if(t==='unequal')m='Quarters must be 4 equal parts. If the parts are different sizes, they are not quarters.';
 if(t==='fold')m='Each fold cuts every part in half: 1 part, then 2, then 4.';
 if(t==='cover')m='A quarter is half of a half, so it takes 2 quarters to cover one half.';
 if(t==='more')m='Sharing with more people never makes a slice bigger. Each slice gets smaller.';
 return m}
function ask(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;controls()},
 init:B=>{A=B;const box=c.el('div',{class:'fl-below'},B.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Sharing controls'},box);chal=c.el('div',{class:'fl-chal'},B.below);reset();A.gest({down,move,up});controls()}}).start()})})();
