/* Flagship: measuring and plotting lengths (ages 7-8; CCSS 2.MD.9 "generate measurement data by measuring lengths of
   several objects to the nearest whole unit ... show the measurements by making a line plot, where the horizontal scale
   is marked off in whole-number units"; NC England Year 2 measurement and statistics). Slide a leaf to 0 on a
   centimetre ruler, round three leaves to the nearest centimetre, stack ten leaf lengths as Xs on a line plot, read the
   plot, and repair a scale that skipped a number. Not flagindir (indirect comparison) or flaglenht (cube units). */
(()=>{
VIS.reg('flaglplot',c=>{let K,row,box,qi=-1,ver=0;const D={};c.fig.classList.add('young');
const INK='#1c1917',OK='#047857',NO='#b91c1c',LEAF='#15803d',WOOD='#fde68a',EDGE='#92400e',XC='#1d4ed8',TAU=Math.PI*2;
const DATA=[6,8,5,7,6,9,7,8,7,7],ROUND=[4.8,6.3,7.6],LO=4,HI=10;
const Q=[{t:'Tap the length most leaves have',a:7,why:'Look for the tallest stack of Xs.'},{t:'Tap the length of the longest leaf',a:9,why:'Longest means furthest right that has an X.'},{t:'Tap the length of the shortest leaf',a:5,why:'Shortest means furthest left that has an X.'},{t:'How many leaves are longer than 7 cm?',a:3,n:1,why:'Count the Xs above 8 and 9, not above 7.'}];
const tab=()=>['zero','round','plot','read','scale','chal'][K.step];
const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
function tag(t,x,y,o){o=o||{};const g=K.ctx;let s=o.s||(K.narrow?15:17);g.font=`800 ${s}px system-ui,sans-serif`;let w=g.measureText(t).width+20;
 while(w>K.W-10&&s>10){s--;g.font=`800 ${s}px system-ui,sans-serif`;w=g.measureText(t).width+20}const h=s+14,l=cl(x-w/2,5,K.W-w-5);
 g.fillStyle='#ffffff';K.paint.rrect(l,y-h/2,w,h,11);g.fill();g.lineWidth=o.ok||o.no?3:1.5;g.strokeStyle=o.ok?OK:o.no?NO:'#78716c';g.stroke();
 g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,l+w/2,y+1)}
function paper(){const g=K.ctx;g.fillStyle=K.mix(K.col.pn,'#fef9c3',K.col.dark?.06:.55);g.fillRect(0,0,K.W,K.H)}
/* a ruler 0..N cm across the canvas */
function ruler(y,N){const g=K.ctx,x0=18,u=(K.W-36)/N,h=K.narrow?34:42;g.fillStyle=WOOD;K.paint.rrect(x0-8,y,u*N+16,h,6);g.fill();g.strokeStyle=EDGE;g.lineWidth=1.5;g.stroke();
 g.fillStyle=INK;g.strokeStyle=INK;g.font=`800 ${K.narrow?11:13}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='bottom';
 for(let i=0;i<=N;i++){const x=x0+i*u;g.lineWidth=2;g.beginPath();g.moveTo(x,y);g.lineTo(x,y+h*.45);g.stroke();g.fillText(String(i),x,y+h-3);
  if(i<N){g.lineWidth=1;g.beginPath();g.moveTo(x+u/2,y);g.lineTo(x+u/2,y+h*.25);g.stroke()}}return{x0,u}}
function leaf(x1,x2,y,mx){const g=K.ctx,m=(x1+x2)/2,r=(x2-x1)/2,t=Math.min(mx||99,Math.max(10,r*.32));g.fillStyle=LEAF;g.beginPath();g.moveTo(x1,y);g.quadraticCurveTo(m,y-t*2,x2,y);g.quadraticCurveTo(m,y+t*2,x1,y);g.fill();
 g.strokeStyle='#bbf7d0';g.lineWidth=1.5;g.beginPath();g.moveTo(x1,y);g.lineTo(x2,y);g.stroke()}
/* step 0 */
function drawZero(){const Z=D.z;paper();const R=ruler(K.H*.55,12);const x1=R.x0+Z.at*R.u,x2=x1+7*R.u;leaf(x1,x2,K.H*.38);
 const g=K.ctx;g.strokeStyle=K.col.dark?'#f87171':NO;g.setLineDash([4,4]);g.lineWidth=2;[x1,x2].forEach(x=>{g.beginPath();g.moveTo(x,K.H*.3);g.lineTo(x,K.H*.56);g.stroke()});g.setLineDash([]);
 tag(Z.at?`Starts at ${Z.at}, ends at ${Z.at+7}`:'Starts at 0, ends at 7: the leaf is 7 cm',K.W/2,K.H*.14,{ok:Z.done});tag('Drag the leaf along the ruler',K.W/2,K.H*.88,{s:12})}
function slide(at,quiet){const Z=D.z;at=cl(Math.round(at),0,5);if(at===Z.at&&quiet)return;Z.at=at;if(!at)Z.done=1;K.sound.tick();if(quiet)return K.redraw();zeroSay()}
function zeroSay(){const a=D.z.at;tell(a?`The leaf starts at ${a} and ends at ${a+7}. ${a+7} is where it ends, not how long it is. Slide it to 0.`:'The leaf starts at 0 and ends at 7, so it is 7 cm long. From 2 to 9 was 7 cm too: 9 − 2 = 7.')}
/* step 1 */
function rchips(){const v=ROUND[Math.min(D.r.k,2)],lo=Math.floor(v),w=Math.min(150,K.W*.36),gap=(K.W-2*w)/3;return[lo,lo+1].map((n,j)=>({n,x:gap+j*(w+gap),y:K.H*.68,w,h:K.H*.18}))}
function drawRound(){const R0=D.r,g=K.ctx;paper();const N=10,R=ruler(K.H*.36,N);if(R0.k<3){const v=ROUND[R0.k],x2=R.x0+v*R.u;leaf(R.x0,x2,K.H*.24);
  g.strokeStyle=NO;g.lineWidth=2.5;g.beginPath();g.moveTo(x2,K.H*.16);g.lineTo(x2,K.H*.38);g.stroke();
  rchips().forEach(ch=>{g.fillStyle=R0.bad===ch.n?'#7f1d1d':'#1e293b';K.paint.rrect(ch.x,ch.y,ch.w,ch.h,12);g.fill();g.fillStyle='#ffffff';g.font=`800 ${K.narrow?18:22}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(ch.n+' cm',ch.x+ch.w/2,ch.y+ch.h/2)});
  tag(`Leaf ${R0.k+1} of 3: which whole cm is nearest?`,K.W/2,K.H*.08,{s:K.narrow?12:15})}
 else{tag('Rounded: '+R0.got.map(n=>n+' cm').join(', '),K.W/2,K.H*.12,{ok:1});ROUND.forEach((v,i)=>{const y=K.H*(.58+i*.13);leaf(R.x0,R.x0+v*R.u,y,K.H*.025);tag(`≈ ${Math.round(v)} cm`,Math.min(K.W-40,R.x0+v*R.u+44),y,{s:12,ok:1})})}}
function nearest(n){const R0=D.r;if(R0.k>=3)return;const v=ROUND[R0.k],best=Math.round(v);if(n!==best){R0.bad=n;K.sound.miss();
  return tell(n<v?`The leaf ends past ${n}, and it is closer to ${n+1}. Count the small marks: it is more than halfway.`:`The leaf ends before ${n}. It is less than halfway there, so it is closer to ${n-1}.`)}
 R0.bad=-1;R0.k++;R0.got.push(n);K.sound.pop();tell(`Yes, about ${n} cm. The end is nearer the ${n} mark.`+(R0.k>=3?' All 3 leaves rounded to the nearest whole centimetre.':''))}
/* line plot */
function scaleX(n,skip){const ns=skip?[4,5,6,8,9,10]:[4,5,6,7,8,9,10],i=ns.indexOf(n);if(i<0)return null;const u=(K.W-50)/(ns.length-1);return 25+i*u}
function axis(y,skip,cnt,hot){const g=K.ctx;g.strokeStyle=K.col.tx;g.lineWidth=2.5;g.beginPath();g.moveTo(12,y);g.lineTo(K.W-12,y);g.stroke();
 const sz=K.narrow?18:22,xc=K.col.dark?'#93c5fd':XC,hc=K.col.dark?'#6ee7b7':OK;for(let n=LO;n<=HI;n++){const x=scaleX(n,skip);if(x==null)continue;g.lineWidth=2;g.beginPath();g.moveTo(x,y-6);g.lineTo(x,y+6);g.stroke();
  g.fillStyle=K.col.tx;g.font=`800 ${K.narrow?13:15}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='top';g.fillText(String(n),x,y+9);
  for(let j=0;j<(cnt[n]||0);j++){g.fillStyle=hot===n?hc:xc;g.font=`900 ${sz}px system-ui,sans-serif`;g.textBaseline='middle';g.fillText('✕',x,y-sz*(j+.9))}}
 g.fillStyle=K.col.tx;g.font=`700 ${K.narrow?11:13}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='top';g.fillText('Leaf length (cm)',K.W/2,y+30)}
function counts(list){const o={};list.forEach(n=>o[n]=(o[n]||0)+1);return o}
function drawPlot(){const P=D.p,g=K.ctx;paper();const lw=(K.W-20)/10;DATA.forEach((n,i)=>{const x=10+i*lw,y=K.H*.06;g.fillStyle=i<P.k?'#d6d3d1':i===P.k?'#1d4ed8':'#ffffff';K.paint.rrect(x+2,y,lw-4,K.H*.11,8);g.fill();g.strokeStyle='#78716c';g.lineWidth=1;g.stroke();
  g.fillStyle=i===P.k?'#ffffff':INK;g.font=`800 ${K.narrow?12:15}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(n+'',x+lw/2,y+K.H*.055)});
 axis(K.H*.8,0,counts(DATA.slice(0,P.k)));tag(P.k>=10?'All 10 leaves plotted':`Leaf ${P.k+1} is ${DATA[P.k]} cm: tap above ${DATA[P.k]}`,K.W/2,K.H*.25,{ok:P.k>=10,no:P.miss,s:K.narrow?12:15})}
function mark(n){const P=D.p;if(P.k>=10)return;if(n==null)n=DATA[P.k];if(n!==DATA[P.k]){P.miss=1;K.sound.miss();return tell(`That X went above ${n}, but this leaf is ${DATA[P.k]} cm. Find ${DATA[P.k]} on the line.`)}
 P.miss=0;P.k++;K.sound.pop();const C=counts(DATA.slice(0,P.k));tell(`X above ${n}. ${C[n]>1?`That makes ${C[n]} Xs stacked above ${n}.`:''}`+(P.k>=10?' All 10 leaves are on the line plot. Each X is one leaf.':` ${P.k} of 10 plotted.`))}
function pick(x,skip){let best=null,d=1e9;for(let n=LO;n<=HI;n++){const sx=scaleX(n,skip);if(sx!=null&&Math.abs(sx-x)<d){d=Math.abs(sx-x);best=n}}return best}
/* step 3 */
function nchips(){const w=Math.min(110,K.W*.26),gap=(K.W-3*w)/4;return[2,3,4].map((n,j)=>({n,x:gap+j*(w+gap),y:K.H*.14,w,h:K.H*.13}))}
function drawRead(){const Rd=D.q,g=K.ctx;paper();const q=Q[Math.min(Rd.k,3)];axis(K.H*.8,0,counts(DATA),Rd.hot);
 if(Rd.k<4){tag(`${Rd.k+1} of 4: ${q.t}`,K.W/2,K.H*.06,{s:K.narrow?12:15});if(q.n)nchips().forEach(ch=>{g.fillStyle='#1e293b';K.paint.rrect(ch.x,ch.y,ch.w,ch.h,12);g.fill();g.fillStyle='#ffffff';g.font=`800 ${K.narrow?18:22}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(String(ch.n),ch.x+ch.w/2,ch.y+ch.h/2)})}
 else tag('All 4 read from the plot',K.W/2,K.H*.08,{ok:1})}
function reply(v){const Rd=D.q;if(Rd.k>=4)return;const q=Q[Rd.k];if(v!==q.a){K.sound.miss();return tell(`Not ${v}. ${q.why}`)}Rd.hot=q.n?null:v;Rd.k++;K.sound.pop();
 tell(q.n?'Yes, 3: two leaves are 8 cm and one is 9 cm.':`Yes, ${v} cm.`+(v===7?' 4 Xs stack above 7, more than any other length.':''))}
/* step 4 */
function drawScale(){const S=D.s,g=K.ctx;paper();const C=counts(DATA);if(!S.fixed)delete C[7];axis(K.H*.78,!S.fixed,C);
 if(!S.fixed){const x=(scaleX(6,1)+scaleX(8,1))/2;g.strokeStyle=NO;g.lineWidth=3;g.setLineDash([5,4]);g.beginPath();g.arc(x,K.H*.78,18,0,TAU);g.stroke();g.setLineDash([])}
 tag(S.fixed?'4 5 6 7 8 9 10: equal steps, every whole number':'Ravi\'s line plot: 6 then 8? Tap the gap',K.W/2,K.H*.1,{ok:S.fixed,no:!S.fixed,s:K.narrow?12:15});
 if(S.fixed)tag('The four 7 cm leaves have a place again',K.W/2,K.H*.22,{s:12})}
function fixScale(){const S=D.s;if(S.fixed)return;S.fixed=1;K.sound.pop();tell('7 goes between 6 and 8. Now the numbers go up in equal steps of 1 cm, and the four 7 cm leaves have their stack back. 10 has no Xs, and it still gets a place.')}
function draw(){const k=tab();if(k==='chal'){paper();tag('Challenge',K.W/2,K.H*.14,{ok:1});tag('Start at 0. Nearest cm. One X per leaf.',K.W/2,K.H*.5,{s:K.narrow?13:17});return}
 ({zero:drawZero,round:drawRound,plot:drawPlot,read:drawRead,scale:drawScale})[k]();K.fx.draw(K.ctx)}
const hit=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
function down(p){const k=tab();if(k==='zero'){D.drag=1;D.dx=p.x;D.a0=D.z.at;return true}
 if(k==='round'){const ch=D.r.k<3&&rchips().find(r=>hit(p,r));if(ch)nearest(ch.n);return false}
 if(k==='plot'){if(p.y>K.H*.3)mark(pick(p.x,0));return false}
 if(k==='read'){const q=Q[Math.min(D.q.k,3)];if(q.n){const ch=nchips().find(r=>hit(p,r));if(ch)reply(ch.n)}else if(p.y>K.H*.3)reply(pick(p.x,0));return false}
 if(k==='scale'){const x=(scaleX(6,1)+scaleX(8,1))/2;if(!D.s.fixed&&Math.abs(p.x-x)<40)fixScale();else if(!D.s.fixed){K.sound.miss();tell('Look between 6 and 8 on the line. Which whole number is missing?')}return false}return false}
function move(p){if(!D.drag)return;const u=(K.W-36)/12;slide(D.a0+(p.x-D.dx)/u,1)}
function up(){if(!D.drag)return;D.drag=0;zeroSay()}
function fresh(){ver++;for(const k in D)delete D[k];Object.assign(D,{z:{at:2,done:0},r:{k:0,bad:-1,got:[]},p:{k:0,miss:0},q:{k:0,hot:null},s:{fixed:0},drag:0,hit:()=>{}})}
function tell(t){c.say(t);K.cv.setAttribute('aria-label',t);K.redraw();btns();D.hit()}
const when=(i,ok,msg)=>()=>{if(K.step===i&&ok()&&(!steps[i].predict||K.pred[i]!=null)&&!K.isDone)K.done(msg+K.reveal(i))};
function open(i,desc,ok,msg){fresh();tell(desc);D.hit=when(i,ok,msg)}
function auto(i,acts,ms){steps[i].go();const v0=ver;acts.forEach((f,j)=>setTimeout(()=>{if(v0===ver)f()},ms*(j+1)))}
function btns(){if(!row)return;row.innerHTML='';const k=tab(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},row,t).onclick=f};
 if(k==='zero'){B('◀ 1 cm',()=>slide(D.z.at-1),'Slide the leaf 1 centimetre left');B('1 cm ▶',()=>slide(D.z.at+1),'Slide the leaf 1 centimetre right')}
 if(k==='round'&&D.r.k<3)rchips().forEach(ch=>B(ch.n+' cm',()=>nearest(ch.n),`Round to ${ch.n} centimetres`));
 if(k==='plot'&&D.p.k<10)[5,6,7,8,9].forEach(n=>B('X at '+n,()=>mark(n),`Put an X above ${n} centimetres`));
 if(k==='read'&&D.q.k<4)(Q[D.q.k].n?[2,3,4]:[5,6,7,8,9]).forEach(n=>B(Q[D.q.k].n?String(n):n+' cm',()=>reply(n)));
 if(k==='scale'&&!D.s.fixed)B('Put 7 in the gap',fixScale)}
const steps=[
{h:'Start at zero',p:'This leaf is on a centimetre ruler. Drag it along the ruler, or use the buttons, so it starts at 0.',
 predict:{q:'The leaf goes from 2 to 9 on the ruler. How long is it?',opts:['9 cm, where it ends','7 cm, the gap from 2 to 9'],ans:1},task:'Slide the leaf so it starts at 0',
 show:()=>auto(0,[()=>slide(1),()=>slide(0)],600),
 go:()=>open(0,'A leaf lying on a ruler from 2 to 9 centimetres.',()=>D.z.done,'Line the start up with 0. Then the number at the end is the length: 7 cm.')},
{h:'Nearest centimetre',p:'Leaves do not always end on a mark. Tap the whole centimetre the end is closest to.',
 predict:{q:'A leaf ends just past the 6 cm mark, a long way from 7. Which is nearest?',opts:['7 cm, always round up','6 cm, the mark it is closer to'],ans:1},task:'Round all 3 leaves',
 show:()=>auto(1,ROUND.map(v=>()=>nearest(Math.round(v))),650),
 go:()=>open(1,'A leaf on a ruler, ending between two whole centimetre marks.',()=>D.r.k>=3,'Look at which whole mark the end is closer to: 4.8 is about 5, 6.3 is about 6, 7.6 is about 8.')},
{h:'Build a line plot',p:'Ten leaves were measured. For each one, tap above its length on the line, or use the buttons. Each X is one leaf.',
 predict:{q:'Two leaves are both 6 cm. Where do their Xs go?',opts:['Side by side along the line','One on top of the other, above 6'],ans:1},task:'Plot all 10 leaves',
 show:()=>auto(2,DATA.map(()=>()=>mark()),420),
 go:()=>open(2,'Ten leaf lengths in a row, and an empty line plot from 4 to 10 centimetres.',()=>D.p.k>=10,'Same length, same place: the Xs stack up. The line plot shows all 10 leaves at once.')},
{h:'Read the plot',p:'Answer each question by tapping the line plot, or the buttons.',task:'Answer all 4 questions',
 show:()=>auto(3,Q.map(q=>()=>reply(q.a)),650),
 go:()=>open(3,'A finished line plot of 10 leaf lengths.',()=>D.q.k>=4,'Tallest stack: most common. Furthest right or left with an X: longest or shortest.')},
{h:'Fix the scale',p:'Ravi drew this line plot. Something is wrong with his numbers. Tap the problem, or use the button.',
 predict:{q:'Does a line plot need every whole number, even ones with no Xs?',opts:['No, leave out the empty ones','Yes, every number in equal steps'],ans:1},task:'Fix Ravi\'s scale',
 show:()=>auto(4,[()=>fixScale()],700),
 go:()=>open(4,'A line plot whose numbers go 4, 5, 6, 8, 9, 10, with no 7.',()=>D.s.fixed,'A line plot is a number line: every whole number, equally spaced, even if it has no Xs.')},
{h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>D.hit()});
const QS=[
 {q:'A pencil goes from 3 to 10 on a ruler. How long is it?',a:'7 cm',o:[['10 cm','end'],['13 cm','add']]},
 {q:'A shell ends at 5 and a little bit. To the nearest cm it is…',a:'5 cm',o:[['6 cm','up'],['4 cm','down']]},
 {q:'Three leaves are 8 cm. How does the plot show this?',a:'3 Xs stacked above 8',o:[['One X above 8','one'],['An X above 3','count']]},
 {q:'No leaf is 10 cm. Does 10 still go on the scale?',a:'Yes, every number gets a place',o:[['No, leave it out','skip'],['Only if it has an X','skip']]},
 {q:'The tallest stack is above 7. What does that tell you?',a:'7 cm is the most common length',o:[['7 leaves were measured','count'],['The longest leaf is 7 cm','long']]},
 {q:'A twig ends at 6 and nearly 7. To the nearest cm it is…',a:'7 cm',o:[['6 cm','down'],['8 cm','up']]}];
function why(t){let m='Line up with 0, round to the nearest mark, and give each object one X.';
 if(t==='end')m='The end number is only the length when you start at 0. From 3 to 10 is 10 − 3 = 7 cm.';
 if(t==='add')m='Do not add the two numbers. The length is the gap between them: 10 − 3 = 7 cm.';
 if(t==='up')m='Do not always round up. Look at which whole mark the end is closer to.';
 if(t==='down')m='Do not just drop the bit past the mark. If the end is past halfway, the next mark is nearer.';
 if(t==='one')m='Each X is one object, so 3 leaves of 8 cm need 3 Xs, stacked above 8.';
 if(t==='count')m='The numbers on the line are lengths in cm. The number of Xs tells you how many.';
 if(t==='skip')m='A line plot is a number line. Every whole number gets a place in equal steps, even with no Xs.';
 if(t==='long')m='The tallest stack is the most common length. The longest leaf is the X furthest to the right.';
 return m}
function quiz(){qi++;const Z=QS[qi%QS.length],all=[[Z.a,'ok'],...Z.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 box.innerHTML=`<p><b>${Z.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const pr=box.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},pr,v).onclick=()=>judge(t,Z.a)});c.say('Challenge: '+Z.q);K.redraw()}
function judge(t,a){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),ok=t==='ok';if(ok)K.win();else K.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.6,tall:1,draw,onStep:B=>{box.hidden=B.step!==5;row.hidden=B.step===5;btns()},
 init:B=>{K=B;const wrap=c.el('div',{class:'fl-below'},K.below);row=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Ruler and line plot controls'},wrap);box=c.el('div',{class:'fl-chal'},K.below);fresh();const A=K;A.gest({down,move,up});btns()}}).start()})})();
