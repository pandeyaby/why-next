/* Flagship: area and the distributive property (ages 8-9; CCSS 3.MD.C.7c "use tiling to show that the area of a
   rectangle with sides a and b + c is the sum of a × b and a × c"; NC Y4 written multiplication by partitioning).
   Tile a 3 by 6 rectangle, cut it into 3 × 4 and 3 × 2 without losing a tile, try many cuts, split 6 × 13 at 10 to
   get 60 + 18, then build area models for bracket equations. Not flagtiles (area by tiling) or flagcover. */
(()=>{
VIS.reg('flagdistrib',c=>{let A,ctl,ask,qn=-1,gen=0;const P={};
const INK='#0f172a',LA='#7dd3fc',LB='#fdba74',EA='#0369a1',EB='#c2410c',GOOD='#047857',WARN='#b91c1c';
const BUILDS=[[5,7,3],[4,6,2],[3,8,4]];
const mode=()=>['tile','cut','any','big','build','chal'][A.step];
const clamp=(v,a,b)=>v<a?a:v>b?b:v;
function tag(t,x,y,o){o=o||{};const g=A.ctx;let s=o.s||(A.narrow?13:15);g.font=`800 ${s}px system-ui,sans-serif`;let w=g.measureText(t).width+16;
 while(w>A.W-8&&s>10){s--;g.font=`800 ${s}px system-ui,sans-serif`;w=g.measureText(t).width+16}const h=s+12,x0=clamp(x-w/2,4,A.W-w-4);
 g.fillStyle='#ffffff';A.paint.rrect(x0,y-h/2,w,h,8);g.fill();g.lineWidth=o.ok||o.no?3:1.5;g.strokeStyle=o.ok?GOOD:o.no?WARN:o.edge||'#64748b';g.stroke();
 g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,x0+w/2,y+1)}
/* rows r, columns n, first part k columns wide; returns the screen box of the rectangle */
function box(r,n){const u=Math.floor(Math.min(A.W*.86/Math.max(n,6),A.H*.42/Math.max(r,3))),w=u*n,h=u*r;return{u,x:Math.round((A.W-w)/2),y:Math.round(A.H*.21),w,h}}
function grid(r,n,k,lit,nums){const b=box(r,n),g=A.ctx;let cnt=0;for(let i=0;i<n;i++)for(let j=0;j<r;j++){if(i>=lit)continue;cnt++;
  g.fillStyle=i<k?LA:LB;g.fillRect(b.x+i*b.u+1,b.y+j*b.u+1,b.u-2,b.u-2);if(nums&&b.u>=22){g.fillStyle=INK;g.font=`700 ${Math.min(12,b.u*.4)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(String(i*r+j+1),b.x+i*b.u+b.u/2,b.y+j*b.u+b.u/2)}}
 g.strokeStyle=A.alpha(A.col.tx,.35);g.lineWidth=1;for(let i=0;i<=n;i++){g.beginPath();g.moveTo(b.x+i*b.u,b.y);g.lineTo(b.x+i*b.u,b.y+b.h);g.stroke()}
 for(let j=0;j<=r;j++){g.beginPath();g.moveTo(b.x,b.y+j*b.u);g.lineTo(b.x+b.w,b.y+j*b.u);g.stroke()}g.strokeStyle=A.col.tx;g.lineWidth=3;g.strokeRect(b.x,b.y,b.w,b.h);return b}
function sides(b,r,n,k){const g=A.ctx,f=A.narrow?13:15;g.font=`800 ${f}px system-ui,sans-serif`;g.fillStyle=A.col.tx;g.textBaseline='middle';g.textAlign='right';g.fillText(String(r),b.x-8,b.y+b.h/2);
 g.textAlign='center';if(k>0&&k<n){g.fillStyle=A.col.dark?LA:EA;g.fillText(String(k),b.x+k*b.u/2,b.y-14);g.fillStyle=A.col.dark?LB:EB;g.fillText(String(n-k),b.x+k*b.u+(n-k)*b.u/2,b.y-14)}else g.fillText(String(n),b.x+b.w/2,b.y-14)}
function knife(b,k,live){const g=A.ctx,x=b.x+k*b.u;g.strokeStyle=live?A.col.vi:A.col.tx;g.lineWidth=4;g.setLineDash([8,6]);g.beginPath();g.moveTo(x,b.y-24);g.lineTo(x,b.y+b.h+10);g.stroke();g.setLineDash([]);
 g.fillStyle=A.col.vi;g.beginPath();g.arc(x,b.y+b.h+22,A.narrow?14:12,0,7);g.fill();g.fillStyle='#ffffff';g.font='800 13px system-ui,sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('↔',x,b.y+b.h+23)}
function sums(b,r,n,k,y){const a=r*k,bb=r*(n-k);tag(`${r} × ${k} = ${a}`,A.W*.26,y,{edge:EA});tag(`${r} × ${n-k} = ${bb}`,A.W*.74,y,{edge:EB});tag(`${a} + ${bb} = ${a+bb}, and ${r} × ${n} = ${r*n}`,A.W/2,y+A.H*.1,{ok:1})}
function draw(){const m=mode(),g=A.ctx;g.fillStyle=A.col.pn;g.fillRect(0,0,A.W,A.H);const yS=A.H*.8;
 if(m==='chal'){const b=grid(3,7,4,7);sides(b,3,7,4);tag('Challenge',A.W/2,A.H*.08,{ok:1});return}
 if(m==='tile'){const T=P.tile,b=grid(3,T.n,99,T.lay,1);sides(b,3,T.n,0);const c2=3*T.lay;tag(T.lay?`${T.lay} column${T.lay>1?'s':''} of 3 = ${c2} tiles`:'Drag across the rectangle to lay tiles',A.W/2,A.H*.07,{ok:T.lay===T.n});
  if(T.lay===T.n)tag(`3 rows of 6: 3 × 6 = 18 square units`,A.W/2,yS,{ok:1});else if(T.msg)tag(T.msg,A.W/2,yS,{no:T.bad});A.fx.draw(g);return}
 if(m==='cut'||m==='any'){const C=P.cut,b=grid(3,6,C.k,6);sides(b,3,6,C.k);knife(b,C.k,P.drag);tag(m==='cut'?'Drag the cut line, or use the buttons':`Cuts tried: ${C.seen.size} of 3`,A.W/2,A.H*.07,{ok:m==='any'&&C.seen.size>=3});
  sums(b,3,6,C.k,yS-A.H*.04);if(m==='any'&&C.seen.size)tag('3 × 6 = '+[...C.seen].slice(-3).map(k=>`3 × ${k} + 3 × ${6-k}`).join(' = '),A.W/2,A.H*.97,{s:11});A.fx.draw(g);return}
 if(m==='big'){const B=P.big,b=grid(6,13,B.k,13);sides(b,6,13,B.k);knife(b,B.k,P.drag);tag(`6 × 13: cut 13 into ${B.k} + ${13-B.k}`,A.W/2,A.H*.07,{ok:B.k===10});
  sums(b,6,13,B.k,yS-A.H*.04);if(B.msg)tag(B.msg,A.W/2,A.H*.95,{no:1,s:12});A.fx.draw(g);return}
 if(m==='build'){const D=P.bld,R=BUILDS[Math.min(D.i,2)],[r,k,j]=R;tag(D.i>2?'All 3 area models built':`Build ${r} × (${k} + ${j}) = ${r} × ${k} + ${r} × ${j}`,A.W/2,A.H*.07,{ok:D.i>2});
  const b=grid(D.r,D.a+D.b,D.a,D.a+D.b);sides(b,D.r,D.a+D.b,D.a);if(D.msg)tag(D.msg,A.W/2,yS+A.H*.05,{ok:D.good,no:!D.good,s:12});
  tag(`${D.r} × ${D.a} + ${D.r} × ${D.b} = ${D.r*D.a} + ${D.r*D.b} = ${D.r*(D.a+D.b)}`,A.W/2,yS-A.H*.06,{});A.fx.draw(g)}}
/* step 0: lay columns of tiles */
function lay(n){const T=P.tile;n=clamp(n,0,T.n);if(n===T.lay)return;T.lay=n;T.msg='';A.sound.tick();
 if(n===T.n){A.win();say('Full. 6 columns of 3 tiles make 18 tiles. Counting them one by one and multiplying 3 × 6 give the same area.')}
 else say(`${n} column${n>1?'s':''} of 3 tiles: ${3*n} so far.`)}
/* steps 1 and 2: the cut */
function cutAt(k,quiet){const C=P.cut;k=clamp(k,1,5);if(k===C.k&&quiet)return;C.k=k;C.seen.add(k);A.sound.tick();if(quiet)return A.redraw();
 say(`Cut after ${k} column${k>1?'s':''}: 3 × ${k} = ${3*k} and 3 × ${6-k} = ${3*(6-k)}. Together ${3*k} + ${3*(6-k)} = 18, the same as 3 × 6.`)}
/* step 3: 6 × 13 */
function bigAt(k,quiet){const B=P.big;k=clamp(k,1,12);if(k===B.k&&quiet)return;B.k=k;B.msg='';A.sound.tick();if(quiet)return A.redraw();
 if(k===10)say('13 = 10 + 3. 6 × 10 = 60 and 6 × 3 = 18, so 6 × 13 = 60 + 18 = 78. Times by 10 is easy, so 10 is the handy cut.');
 else say(`13 = ${k} + ${13-k}. 6 × ${k} = ${6*k} and 6 × ${13-k} = ${6*(13-k)}, still 78 in all. Try a cut that makes one part easy, like a ten.`)}
function slip(){const B=P.big;B.msg='6 × 10 + 3 = 63 leaves out 15 tiles';A.sound.miss();say('If you write 6 × 10 + 3, you only count 3 tiles of the orange part. It has 6 rows of 3, which is 18 tiles, so 6 × 13 is 78, not 63.')}
/* step 4: build from the equation */
function setB(key,d){const D=P.bld;if(D.i>2)return;const lim={r:[1,6],a:[1,9],b:[1,6]}[key];D[key]=clamp(D[key]+d,lim[0],lim[1]);D.msg='';A.sound.tick();
 say(`Rectangle ${D.r} tall, cut into ${D.a} and ${D.b}. Area ${D.r} × ${D.a} + ${D.r} × ${D.b} = ${D.r*(D.a+D.b)}.`)}
function check(){const D=P.bld;if(D.i>2)return;const [r,k,j]=BUILDS[D.i];
 if(D.r===r&&D.a===k&&D.b===j){D.i++;D.good=1;D.msg=`✓ ${r} × ${k+j} = ${r*k} + ${r*j} = ${r*(k+j)}`;A.sound.pop();if(D.i<=2)Object.assign(D,{r:2,a:2,b:2});
  return say(D.i>2?'All 3 built. The number outside the brackets is the side both parts share.':`Yes. ${r} × (${k} + ${j}) = ${r*k} + ${r*j} = ${r*(k+j)}. Next one.`)}
 D.good=0;A.sound.miss();if(D.r!==r&&(D.r===k||D.r===j)){D.msg='Check the shared side';return say(`The shared side is the number outside the brackets, ${r}. Both parts are ${r} tall.`)}
 if(D.r!==r){D.msg='Check the height';return say(`The rectangle must be ${r} tall, not ${D.r}.`)}D.msg='Check the two widths';say(`The two widths are the numbers inside the brackets, ${k} and ${j}.`)}
function goTo(r,a,b){const D=P.bld;D.r=r;D.a=a;D.b=b;check()}
/* drag on the canvas */
function colAt(p,r,n){const b=box(r,n);return Math.round((p.x-b.x)/b.u)}
function down(p){const m=mode();if(m==='tile'){P.drag=1;lay(colAt(p,3,6));return true}
 if(m==='cut'||m==='any'){P.drag=1;cutAt(colAt(p,3,6),1);return true}
 if(m==='big'){const b=box(6,13);if(p.x>b.x+P.big.k*b.u+b.u*.6&&p.y>b.y&&p.y<b.y+b.h&&P.big.k===10){slip();return false}P.drag=1;bigAt(colAt(p,6,13),1);return true}
 if(m==='build'){const D=P.bld,b=box(D.r,D.a+D.b);if(p.y>b.y&&p.y<b.y+b.h&&p.x>b.x&&p.x<b.x+b.w){P.drag=1;return true}}return false}
function move(p){if(!P.drag)return;const m=mode();if(m==='tile')lay(colAt(p,3,6));if(m==='cut'||m==='any')cutAt(colAt(p,3,6),1);if(m==='big')bigAt(colAt(p,6,13),1);
 if(m==='build'){const D=P.bld,n=D.a+D.b,b=box(D.r,n),k=clamp(Math.round((p.x-b.x)/b.u),1,n-1);if(k!==D.a&&n-k<=6&&k<=9){D.a=k;D.b=n-k;A.sound.tick();A.redraw()}}}
function up(){if(!P.drag)return;P.drag=0;const m=mode();if(m==='cut'||m==='any')cutAt(P.cut.k);if(m==='big')bigAt(P.big.k);if(m==='build')setB('a',0)}
function fresh(){gen++;for(const k in P)delete P[k];Object.assign(P,{tile:{n:6,lay:0,msg:'',bad:0},cut:{k:3,seen:new Set()},big:{k:6,msg:''},bld:{i:0,r:2,a:2,b:2,msg:'',good:0},drag:0,test:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();P.test()}
const reached=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function open(i,desc,ok,msg){fresh();say(desc);P.test=reached(i,ok,msg)}
function play(i,acts,ms){steps[i].go();const g0=gen;acts.forEach((f,j)=>setTimeout(()=>{if(g0===gen)f()},ms*(j+1)))}
function buttons(){if(!ctl)return;ctl.innerHTML='';const m=mode(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(m==='tile'){B('Lay a column',()=>lay(P.tile.lay+1),'Lay one more column of 3 tiles');B('Take a column off',()=>lay(P.tile.lay-1),'Take one column of tiles off')}
 if(m==='cut'||m==='any'){B('Cut left',()=>cutAt(P.cut.k-1),'Move the cut one column left');B('Cut right',()=>cutAt(P.cut.k+1),'Move the cut one column right')}
 if(m==='big'){B('Cut left',()=>bigAt(P.big.k-1),'Move the cut one column left');B('Cut right',()=>bigAt(P.big.k+1),'Move the cut one column right');if(P.big.k===10)B('Try 6 × 10 + 3',slip,'See what goes wrong with 6 × 10 + 3')}
 if(m==='build'&&P.bld.i<=2){[['r','Height'],['a','First width'],['b','Second width']].forEach(([k,t])=>{B(t+' −',()=>setB(k,-1),t+' one less');B(t+' +',()=>setB(k,1),t+' one more')});B('Check',check,'Check the area model')}}
const steps=[
{h:'Tile the rectangle',p:'This rectangle is 3 squares tall and 6 squares long. Drag across it, or tap Lay a column, to cover it with square tiles.',
 predict:{q:'How many square tiles cover a 3 by 6 rectangle?',opts:['9, because 3 + 6','18, because 3 × 6','12'],ans:1},task:'Cover the whole rectangle',
 show:()=>play(0,[1,2,3,4,5,6].map(n=>()=>lay(n)),420),
 go:()=>open(0,'An empty rectangle, 3 squares tall and 6 long, on a square grid.',()=>P.tile.lay===6,'Area = 3 × 6 = 18 square units.')},
{h:'Cut it in two',p:'Drag the dashed cut line, or use the buttons, to cut the rectangle into two parts.',
 predict:{q:'You cut the 3 by 6 rectangle into two parts. The two areas added together make…',opts:['less than 18','18, the same','more than 18'],ans:1},task:'Cut it into 3 × 4 and 3 × 2',
 show:()=>play(1,[()=>cutAt(2),()=>cutAt(4)],900),
 go:()=>open(1,'The 3 by 6 rectangle, tiled, with a dashed cut line after 3 columns.',()=>P.cut.k===4,'3 × 6 = 3 × 4 + 3 × 2. No tile is lost when you cut.')},
{h:'Any cut works',p:'Move the cut to new places. Each cut gives a new pair of parts. Watch the total.',task:'Try 3 different cuts',
 show:()=>play(2,[()=>cutAt(1),()=>cutAt(2),()=>cutAt(5)],800),
 go:()=>open(2,'The 3 by 6 rectangle with a cut line you can move.',()=>P.cut.seen.size>=3,'Every cut gives 18: 3 × (a + b) = 3 × a + 3 × b.')},
{h:'Split a big number',p:'Now 6 × 13. That is a big times fact. Move the cut so one part is a ten.',
 predict:{q:'6 × 13 = 6 × 10 + …',opts:['3','6 × 3','13'],ans:1},task:'Split 13 into 10 + 3',
 show:()=>play(3,[()=>bigAt(8),()=>bigAt(10)],1000),
 go:()=>open(3,'A rectangle 6 squares tall and 13 long, cut after 6 columns.',()=>P.big.k===10,'6 × 13 = 6 × 10 + 6 × 3 = 60 + 18 = 78.')},
{h:'Build from the equation',p:'Make the area model for each equation. Set the height and the two widths, or drag inside to move the cut. Then tap Check.',
 predict:{q:'In 5 × (7 + 3), which side do both parts share?',opts:['7','5','3'],ans:1},task:'Build all 3 area models',
 show:()=>play(4,BUILDS.map(([r,a,b])=>()=>goTo(r,a,b)),900),
 go:()=>open(4,'A small rectangle, 2 tall, cut into 2 and 2. Change it to match the equation.',()=>P.bld.i>2,'The number outside the brackets is the shared side; the numbers inside are the widths.')},
{h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>P.test()});
const QS=[
 {q:'What is the area of a rectangle 4 squares by 7 squares?',a:'28 square units',o:[['11 square units','add'],['22 square units','perim']]},
 {q:'A 3 by 8 rectangle is cut into 3 by 5 and 3 by 3. What is the total area?',a:'15 + 9 = 24',o:[['Less than 24, a cut loses tiles','lose'],['15 + 3 = 18','one']]},
 {q:'Which is the same as 7 × 12?',a:'7 × 10 + 7 × 2',o:[['7 × 10 + 2','one'],['7 × 10 × 7 × 2','times']]},
 {q:'Which area model shows 4 × (6 + 3)?',a:'4 tall, cut into 6 and 3',o:[['6 tall, cut into 4 and 3','share'],['4 tall and 6 long, no cut','one']]},
 {q:'5 × 14 = 5 × 10 + 5 × 4. What is it?',a:'50 + 20 = 70',o:[['50 + 4 = 54','one'],['5 + 14 = 19','add']]},
 {q:'Sam says 6 × (5 + 2) = 6 × 5 + 2. Is he right?',a:'No, the 2 must be times 6 too',o:[['Yes, that is the rule','one'],['No, it is 6 + 5 + 2','add']]}];
function why(t){let m='Count the tiles in each part: rows times columns.';
 if(t==='add')m='Adding the sides is not area. Area counts the squares: rows × columns.';
 if(t==='perim')m='That adds the sides all the way round, which is the perimeter. Area is rows × columns.';
 if(t==='lose')m='A cut does not remove any tiles. The two parts add up to the whole.';
 if(t==='one')m='Both parts are the same height, so you multiply each part. The small part needs its times too.';
 if(t==='times')m='The two parts sit side by side, so you add their areas. You do not multiply them together.';
 if(t==='share')m='The number outside the brackets is the side both parts share, so it is the height.';
 return m}
function quiz(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 ask.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=ask.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){ask.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=ask.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.6,tall:1.05,draw,onStep:B=>{ask.hidden=B.step!==5;ctl.hidden=B.step===5;buttons()},
 init:B=>{A=B;const wrap=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Area model controls'},wrap);ask=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});buttons()}}).start()})})();
