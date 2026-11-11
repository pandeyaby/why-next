/* Flagship: odd and even numbers (ages 6-7, NC Y2). Pair cubes, share sweets, sort by the ones digit, build from
   tens and ones, join groups (odd + odd = even). Not flagskip, flagbond or flagoddev. */
(()=>{
const PAIRSETS=[6,9,8],SHARES=[10,7],CARDS=[37,84,50,73,26,58],JOINS=[[3,5],[4,3],[2,6]];
const GOALS=[['an odd number with 3 tens',(t,o)=>t===3&&o%2===1],['an even number with 2 tens',(t,o)=>t===2&&o%2===0],['an even number with 0 ones',(t,o)=>t>0&&o===0]];
const isEven=n=>n%2===0,word=n=>isEven(n)?'even':'odd';
VIS.reg('flagoddn',c=>{let A,pad,quiz,turn=-1,run=0;const S={},bz=k=>A.sound[k]();c.fig.classList.add('young');
const DARK='#0f172a',OK='#047857',NO='#b91c1c',RIM='#64748b',PICK='#1d4ed8',CUBE=['#bfdbfe','#fbcfe8'],LONE='#fde68a';
const stage=()=>['pair','share','digit','build','join','chal'][A.step];
const font=(px,w)=>`${w||800} ${Math.round(A.narrow?px:px*1.15)}px system-ui,sans-serif`;
function ground(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#fef9c3',A.col.dark?.06:.45);g.fillRect(0,0,A.W,A.H)}
function centre(g){g.textAlign='center';g.textBaseline='middle'}
function note(t,x,y,f){f=f||{};const g=A.ctx;let px=f.px||14;g.font=font(px);let w=g.measureText(t).width+22;while(w>A.W-8&&px>9){px--;g.font=font(px);w=g.measureText(t).width+22}
 const h=px*1.2+14,l=Math.max(4,Math.min(A.W-w-4,x-w/2));g.fillStyle='#ffffff';A.paint.rrect(l,y-h/2,w,h,10);g.fill();g.lineWidth=f.good||f.bad?3:1.5;g.strokeStyle=f.good?OK:f.bad?NO:RIM;g.stroke();g.fillStyle=DARK;centre(g);g.fillText(t,l+w/2,y+1)}
function box(r,t,f){f=f||{};const g=A.ctx;g.fillStyle=f.fill||'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=f.good||f.bad||f.sel?4:2;g.strokeStyle=f.good?OK:f.bad?NO:f.sel?PICK:RIM;g.stroke();
 if(t==null)return;let px=f.px||20;g.font=font(px);while(g.measureText(t).width>r.w-10&&px>9){px--;g.font=font(px)}g.fillStyle=DARK;centre(g);g.fillText(t,r.x+r.w/2,r.y+r.h/2+1)}
function cube(x,y,s,fill,ring){const g=A.ctx;g.fillStyle=fill;A.paint.rrect(x-s/2,y-s/2,s,s,s*.22);g.fill();g.lineWidth=ring?3.5:1.5;g.strokeStyle=ring||'#334155';g.stroke()}
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const twin=()=>{const w=(A.W-36)/2,h=Math.min(70,A.H*.15);return[{x:12,y:A.H-h-12,w,h},{x:24+w,y:A.H-h-12,w,h}]};
/* --- 1. pair up --- */
function dots(n){const cols=Math.min(5,Math.ceil(n/2)),rows=Math.ceil(n/cols),s=Math.min(84,A.W/(cols+.8)),gx=A.W/(cols+1),y0=A.H*.25;
 return [...Array(n)].map((_,i)=>({x:gx*(i%cols+1)+(Math.floor(i/cols)%2?gx*.18:-gx*.18),y:y0+Math.floor(i/cols)*s*1.5,s}))}
function partner(i){const p=S.p.links.find(l=>l.includes(i));return p?p[0]===i?p[1]:p[0]:null}
function free(){const n=PAIRSETS[S.p.k];return[...Array(n).keys()].filter(i=>partner(i)==null)}
function drawPair(){const P=S.p,g=A.ctx;ground();if(P.k>=3){note('6 is even, 9 is odd, 8 is even',A.W/2,A.H*.12,{good:1});note('Even: every cube has a partner.',A.W/2,A.H*.42,{px:15});note('Odd: one cube is left on its own.',A.W/2,A.H*.6,{px:15});return}
 const n=PAIRSETS[P.k],D=dots(n),judge=free().length<2;note(judge?`${n} cubes: odd or even?`:`Set ${P.k+1} of 3: tap two cubes to make a pair`,A.W/2,A.H*.07,{px:13});
 P.links.forEach(([a,b],j)=>{g.strokeStyle=A.col.dark?'#e2e8f0':'#334155';g.lineWidth=5;g.beginPath();g.moveTo(D[a].x,D[a].y);g.lineTo(D[b].x,D[b].y);g.stroke()});
 D.forEach((d,i)=>{const q=partner(i),lone=judge&&q==null;cube(d.x,d.y,d.s*.62,q!=null?CUBE[P.links.findIndex(l=>l.includes(i))%2]:lone?LONE:'#ffffff',P.sel===i?PICK:lone?NO:null)});
 if(judge){const lone=free();if(lone.length){const d=D[lone[0]];note('no partner',d.x,d.y+d.s*.62,{px:11,bad:1})}twin().forEach((r,j)=>box(r,j?'Odd':'Even',{bad:P.miss===j}))}}
function tapCube(i){const P=S.p;if(P.k>=3||free().length<2||partner(i)!=null)return;
 if(P.sel==null||P.sel===i){P.sel=P.sel===i?null:i;bz('tick');return speak(P.sel==null?'Let go.':'Now tap its partner.')}
 P.links.push([P.sel,i]);P.sel=null;bz('pop');const left=free().length;speak(left>1?`A pair. ${left} cubes to go.`:`All pairs made. ${left?'One cube is on its own.':'None is left on its own.'} Odd or even?`)}
function judgePair(odd){const P=S.p,n=PAIRSETS[P.k];if(P.k>=3||free().length>1)return;
 if(odd===isEven(n)){P.miss=odd?1:0;bz('miss');return speak(isEven(n)?`Every cube has a partner, none left over: ${n} is even.`:`One cube has no partner: ${(n-1)/2} pairs and 1 left over. ${n} is odd.`)}
 P.k++;P.links=[];P.sel=null;P.miss=null;bz('pop');speak(`Yes, ${n} is ${word(n)}: ${isEven(n)?`${n/2} pairs and none left over`:`${(n-1)/2} pairs and 1 on its own`}.`+(P.k<3?` Next: ${PAIRSETS[P.k]} cubes.`:''))}
/* --- 2. share fairly --- */
const plates=()=>{const w=(A.W-36)/2,h=A.H*.38;return[{x:12,y:A.H*.5,w,h},{x:24+w,y:A.H*.5,w,h}]};
const pile=()=>({x:A.W*.1,y:A.H*.13,w:A.W*.8,h:A.H*.24});
function sweet(x,y,r,fill){const g=A.ctx;g.beginPath();g.arc(x,y,r,0,7);g.fillStyle=fill;g.fill();g.lineWidth=2;g.strokeStyle='#334155';g.stroke()}
function drawShare(){const H=S.h,g=A.ctx;ground();if(H.k>=2){note('10: 5 each, none left. Even.',A.W/2,A.H*.3,{good:1});note('7: 3 each and 1 left over. Odd.',A.W/2,A.H*.5,{good:1});return}
 const n=SHARES[H.k],left=n-H.a-H.b;note(`Share ${n} sweets fairly: tap a plate`,A.W/2,A.H*.06,{px:13});const P=pile(),r=Math.min(16,P.w/(2.6*Math.max(left,1)));
 for(let i=0;i<left;i++)sweet(P.x+P.w/2+(i-(left-1)/2)*r*2.5,P.y+P.h/2,r,left===1&&H.a===H.b?LONE:'#f9a8d4');if(H.k)note('10: 5 and 5, none left',A.W/2,P.y+P.h+8,{px:11,good:1});
 plates().forEach((p,j)=>{box(p,null,{bad:H.miss===j});g.fillStyle=DARK;g.font=font(14);centre(g);g.fillText(`${j?'Leo':'Mia'}: ${j?H.b:H.a}`,p.x+p.w/2,p.y+16);
  const m=j?H.b:H.a;for(let i=0;i<m;i++)sweet(p.x+p.w*(.2+.3*(i%3)),p.y+40+Math.floor(i/3)*24,9,'#f9a8d4')})}
function give(j){const H=S.h;if(H.k>=2)return;const n=SHARES[H.k],left=n-H.a-H.b,mine=j?H.b:H.a,other=j?H.a:H.b,me=j?'Leo':'Mia',you=j?'Mia':'Leo';
 if(!left)return;if(left===1&&H.a===H.b){H.k++;H.a=H.b=0;H.miss=null;bz('pop');return speak(`If ${me} gets it, ${me} has ${mine+1} and ${you} has ${other}. Not fair! ${n} will not make 2 equal groups: 1 is left over, so ${n} is odd.`)}
 if(mine+1-other>1){H.miss=j;bz('miss');return speak(`Not fair: ${me} would have ${mine+1}, ${you} ${other}. Give ${you} one.`)}
 if(j)H.b++;else H.a++;H.miss=null;bz('tick');if(n-H.a-H.b===0){const e=H.a;H.k++;H.a=H.b=0;bz('pop');return speak(`${e} each and none left over. ${n} makes 2 equal groups, so ${n} is even. Now share ${SHARES[H.k]}.`)}speak(`Mia ${H.a}, Leo ${H.b}.`)}
/* --- 3. ones digit --- */
const binR=()=>{const w=(A.W-36)/2,h=A.H*.34;return[{x:12,y:A.H*.6,w,h},{x:24+w,y:A.H*.6,w,h}]};
const cardR=()=>{const w=Math.min(170,A.W*.44),h=Math.min(96,A.H*.22);return{x:A.W/2-w/2,y:A.H*.2,w,h}};
function drawDigit(){const D=S.d,g=A.ctx;ground();note(D.k>=6?'All 6 sorted by the ones digit':`Card ${D.k+1} of 6: drag it to a box, or tap a box`,A.W/2,A.H*.07,{px:13,good:D.k>=6});
 binR().forEach((r,j)=>{box(r,null,{fill:j?'#fef3c7':'#dcfce7'});g.fillStyle=DARK;g.font=font(15);g.textAlign='center';g.textBaseline='top';g.fillText(j?'Odd':'Even',r.x+r.w/2,r.y+8);
  g.font=font(15,700);CARDS.slice(0,D.k).filter(v=>isEven(v)!==!!j).forEach((v,q)=>g.fillText(String(v),r.x+r.w*(.25+.5*(q%2)),r.y+36+Math.floor(q/2)*24))});
 if(D.k<6){const r=cardR(),d=S.drag,v=String(CARDS[D.k]);box(d?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r,v,{px:44,bad:D.miss,sel:!!d})}}
function drop(odd){const D=S.d;if(D.k>=6)return;const v=CARDS[D.k],t=Math.floor(v/10),o=v%10;
 if(odd===isEven(v)){D.miss=1;bz('miss');return speak(o===0?`${v} ends in 0: tens always pair up, so ${v} is even.`:`${(t%2)!==(o%2)?`The tens digit ${t} does not decide. `:''}The ones digit is ${o}, so ${v} is ${word(v)}.`)}
 D.k++;D.miss=0;bz('pop');speak(`Yes: ${v} ends in ${o}, so it is ${word(v)}.`+(D.k>=6?' Even numbers end in 0, 2, 4, 6 or 8.':''))}
/* --- 4. build with tens and ones --- */
const keysR=()=>{const w=(A.W-50)/4,h=Math.min(58,A.H*.13);return['+ ten','- ten','+ one','- one'].map((t,i)=>({t,x:10+i*(w+10),y:A.H-h-10,w,h}))};
function drawBuild(){const B=S.b,g=A.ctx;ground();if(B.k>=3){note('Every ten is 5 pairs.',A.W/2,A.H*.3,{good:1});note('So only the ones say odd or even.',A.W/2,A.H*.5,{px:15});return}
 note(`Make ${GOALS[B.k][0]}`,A.W/2,A.H*.06,{px:13});const v=B.t*10+B.o;g.fillStyle=A.col.tx;g.font=font(30,900);centre(g);g.fillText(String(v),A.W/2,A.H*.17);
 const s=Math.min(12,(A.W*.58/Math.max(B.t,4)-10)/2),rw=s*2+4;for(let i=0;i<B.t;i++){const x0=12+i*(rw+6);for(let q=0;q<10;q++)cube(x0+s/2+(q%2)*(s+2),A.H*.28+Math.floor(q/2)*(s+2),s,CUBE[0])}
 const ox=A.W*.62,big=Math.min(26,A.W/14);for(let q=0;q<B.o;q++){const lone=q===B.o-1&&B.o%2;cube(ox+(q%2)*(big+6),A.H*.3+Math.floor(q/2)*(big+6),big,lone?LONE:CUBE[1],lone?NO:null)}
 g.fillStyle=A.col.tx;g.font=font(12,700);g.fillText(`${B.t} tens`,12+Math.max(1,B.t)*(rw+6)/2,A.H*.24);g.fillText(`${B.o} ones`,ox+big,A.H*.25);
 keysR().forEach(r=>box(r,r.t,{px:16}));if(B.msg)note(B.msg,A.W/2,A.H*.74,{px:12,bad:B.bad,good:!B.bad})}
function adjust(dt,dob){const B=S.b;if(B.k>=3)return;B.t=Math.max(0,Math.min(9,B.t+dt));B.o=Math.max(0,Math.min(9,B.o+dob));B.msg='';bz('tick');
 const v=B.t*10+B.o;speak(`${v}: ${B.t} tens and ${B.o} ones. ${B.o%2?'One cube has no partner.':'Every cube has a partner.'}`)}
function check(){const B=S.b;if(B.k>=3)return;const[t,ok]=GOALS[B.k],v=B.t*10+B.o;
 if(!ok(B.t,B.o)){B.bad=1;bz('miss');B.msg=B.k===2&&B.o?`${B.o} ones. Take all the ones away.`:B.k<2&&B.t!==3-B.k?`You have ${B.t} tens. You need ${3-B.k}.`:`${v} ends in ${B.o}, so it is ${word(v)}. Add or take one cube.`;if(!B.t&&B.k===2)B.msg='Add at least one ten.';return speak(B.msg)}
 B.bad=0;B.msg=`${v} is ${word(v)}.`;bz('pop');B.k++;speak(`${v} is ${word(v)}. `+(B.k===3?`${v} is all tens, and every ten is 5 pairs, so it is even.`:'The tens all pair up. Only the ones decide.'))}
/* --- 5. join two groups --- */
const sideR=j=>({x:j?A.W*.52:A.W*.04,y:A.H*.16,w:A.W*.44,h:A.H*.5});
function column(n,x,y,s,joined){for(let q=0;q<n;q++){const lone=q===n-1&&n%2;cube(x+(q%2)*(s+5),y+Math.floor(q/2)*(s+5),s,lone?LONE:CUBE[q%4<2?0:1],lone?NO:null)}}
function drawJoin(){const J=S.j,g=A.ctx;ground();if(J.k>=3){note('odd + odd = even',A.W/2,A.H*.25,{good:1});note('even + odd = odd',A.W/2,A.H*.43,{good:1});note('even + even = even',A.W/2,A.H*.61,{good:1});return}
 const[a,b]=JOINS[J.k],s=Math.min(32,A.W/12);note(J.joined?`${a} + ${b} = ${a+b}: odd or even?`:`Sum ${J.k+1} of 3: drag ${b} onto ${a}, or tap Join`,A.W/2,A.H*.06,{px:13});
 if(J.joined){column(a+b,A.W/2-s,A.H*.2,s);twin().forEach((r,j)=>box(r,j?'Odd':'Even',{bad:J.miss===j}))}
 else{[a,b].forEach((n,j)=>{const r=sideR(j),d=j&&S.drag;g.fillStyle=A.col.tx;g.font=font(16);centre(g);g.fillText(`${n} (${word(n)})`,r.x+r.w/2,r.y);column(n,(d?d.x:r.x+r.w/2)-s,(d?d.y-s:r.y+22),s)});box(twin()[1],'Join',{})}}
function join(){const J=S.j;if(J.k>=3||J.joined)return;const[a,b]=JOINS[J.k];J.joined=1;bz('pop');
 speak(a%2&&b%2?`${a} + ${b} = ${a+b}. The lonely cubes from ${a} and ${b} make a new pair.`:`${a} + ${b} = ${a+b}. Any cube with no partner?`)}
function judgeJoin(odd){const J=S.j;if(J.k>=3||!J.joined)return;const[a,b]=JOINS[J.k],n=a+b;
 if(odd===isEven(n)){J.miss=odd?1:0;bz('miss');return speak(a%2&&b%2?`The two lonely cubes pair up, so ${n} has none left over: even.`:isEven(n)?`Every cube in ${n} has a partner: even.`:`One lonely cube still has no partner: ${n} is odd.`)}
 J.k++;J.joined=0;J.miss=null;bz('pop');speak(`${a} + ${b} = ${n}, ${word(n)}.`+(J.k<3?' Next sum.':''))}
/* --- frame --- */
function draw(){const s=stage();if(s==='chal'){ground();note('Challenge',A.W/2,A.H*.2,{good:1});note('Pairs with none left: even. One left over: odd.',A.W/2,A.H*.5,{px:14});return}
 ({pair:drawPair,share:drawShare,digit:drawDigit,build:drawBuild,join:drawJoin})[s]();A.fx.draw(A.ctx)}
function down(p){const s=stage();
 if(s==='pair'){if(free().length<2&&S.p.k<3){twin().forEach((r,j)=>{if(inside(p,r))judgePair(j===1)});return false}const D=S.p.k<3?dots(PAIRSETS[S.p.k]):[];const i=D.findIndex(d=>Math.hypot(p.x-d.x,p.y-d.y)<d.s*.5);if(i>=0)tapCube(i);return false}
 if(s==='share'){plates().forEach((r,j)=>{if(inside(p,r))give(j)});return false}
 if(s==='digit'){if(S.d.k>=6)return false;if(inside(p,cardR())){S.drag={x:p.x,y:p.y,x0:p.x,y0:p.y,w:'digit'};return true}binR().forEach((r,j)=>{if(inside(p,r))drop(j===1)});return false}
 if(s==='build'){keysR().forEach((r,i)=>{if(inside(p,r))adjust(i<2?(i?-1:1):0,i>1?(i===3?-1:1):0)});return false}
 if(s==='join'){const J=S.j;if(J.k>=3)return false;if(J.joined){twin().forEach((r,j)=>{if(inside(p,r))judgeJoin(j===1)});return false}
  if(inside(p,twin()[1]))join();else if(inside(p,sideR(1))){S.drag={x:p.x,y:p.y,x0:p.x,y0:p.y,w:'join'};return true}}return false}
function move(p){if(!S.drag)return;S.drag.x=p.x;S.drag.y=p.y;A.redraw()}
function up(p){const d=S.drag;if(!d)return;S.drag=null;const tap=Math.hypot(p.x-d.x0,p.y-d.y0)<10;
 if(d.w==='digit'){const j=binR().findIndex(r=>inside(p,r));if(j>=0)drop(j===1);else A.redraw();return}
 if(d.w==='join'){if(!tap&&inside(p,sideR(0)))join();else A.redraw()}}
function reset(){run++;for(const k in S)delete S[k];Object.assign(S,{p:{k:0,links:[],sel:null,miss:null},h:{k:0,a:0,b:0,miss:null},d:{k:0,miss:0},b:{k:0,t:0,o:0,msg:'',bad:0},j:{k:0,joined:0,miss:null},drag:null,hook:()=>{}})}
function speak(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.hook()}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,say,ok,msg){reset();speak(say);S.hook=finish(i,ok,msg)}
function auto(i,acts,ms){steps[i].go();const g0=run;acts.forEach((f,j)=>setTimeout(()=>{if(g0===run)f()},(A.reduced()?40:ms)*(j+1)))}
function buttons(){if(!pad)return;pad.innerHTML='';const s=stage(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(s==='pair'&&S.p.k<3){if(free().length<2){add('Even',()=>judgePair(false),`${PAIRSETS[S.p.k]} is even`);add('Odd',()=>judgePair(true),`${PAIRSETS[S.p.k]} is odd`)}else add('Make a pair',()=>{S.p.sel=null;const f=free();tapCube(f[0]);tapCube(f[1])},'Join two cubes into a pair')}
 if(s==='share'&&S.h.k<2){add('Give to Mia',()=>give(0));add('Give to Leo',()=>give(1))}
 if(s==='digit'&&S.d.k<6){const v=CARDS[S.d.k];add('Even',()=>drop(false),`${v} is even`);add('Odd',()=>drop(true),`${v} is odd`)}
 if(s==='build'&&S.b.k<3){[[1,0],[-1,0],[0,1],[0,-1]].forEach((d,i)=>add(keysR()[i].t,()=>adjust(...d)));add('Check',check)}
 if(s==='join'&&S.j.k<3){if(S.j.joined){add('Even',()=>judgeJoin(false));add('Odd',()=>judgeJoin(true))}else add('Join',join,'Join the two groups')}}
const pairAll=n=>[...Array(Math.floor(n/2))].map(()=>()=>{const f=free();tapCube(f[0]);tapCube(f[1])}).concat([()=>judgePair(!isEven(n))]);
const steps=[
{h:'Pair them up',p:'Even means every cube can have a partner. Tap two cubes to join them into a pair. Then say odd or even.',
 predict:{q:'9 cubes. You join them into pairs. What happens?',opts:['Every cube gets a partner','One cube has no partner'],ans:1},task:'Pair up 3 sets of cubes',
 show:()=>auto(0,PAIRSETS.flatMap(pairAll),300),
 go:()=>begin(0,'Six cubes. Tap two to make a pair.',()=>S.p.k>=3,'6 and 8 pair up with none left: even. 9 leaves one on its own: odd.')},
{h:'Share fairly',p:'Even numbers split into 2 equal groups. Tap a plate to give it a sweet. Keep it fair.',task:'Share 10 sweets, then 7',
 show:()=>auto(1,[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0].map(j=>()=>give(j)),250),
 go:()=>begin(1,'Ten sweets and two plates, for Mia and Leo.',()=>S.h.k>=2,'10 makes 5 and 5. 7 makes 3 and 3 with 1 left over.')},
{h:'Look at the last digit',p:'For a big number, look at the ones digit, the last one. Drag each card to Odd or Even.',
 predict:{q:'58 has 5 tens. Is 58 odd or even?',opts:['Odd, because 5 is odd','Even, because it ends in 8'],ans:1},task:'Sort all 6 numbers',
 show:()=>auto(2,CARDS.map(v=>()=>drop(!isEven(v))),500),
 go:()=>begin(2,'A card that says 37. Two boxes: Even and Odd.',()=>S.d.k>=6,'Only the ones digit matters: 0, 2, 4, 6, 8 mean even.')},
{h:'Tens always pair',p:'A ten is 10 cubes in 5 pairs. Add tens and ones to make each number, then press Check.',task:'Make all 3 numbers',
 show:()=>auto(3,[()=>{S.b.t=3;S.b.o=5;speak('35')},check,()=>{S.b.t=2;S.b.o=4;speak('24')},check,()=>{S.b.t=4;S.b.o=0;speak('40')},check],450),
 go:()=>begin(3,'No blocks yet. Add tens and ones.',()=>S.b.k>=3,'Tens always make pairs, so the ones digit decides.')},
{h:'Odd plus odd',p:'Join two groups. Do the lonely cubes find a partner?',
 predict:{q:'3 is odd and 5 is odd. What is 3 + 5?',opts:['Odd, because odd and odd make odd','Even, the two lonely cubes make a pair'],ans:1},task:'Join 3 sums',
 show:()=>auto(4,JOINS.flatMap(([a,b])=>[join,()=>judgeJoin(!isEven(a+b))]),550),
 go:()=>begin(4,'3 cubes on the left and 5 cubes on the right.',()=>S.j.k>=3,'Odd + odd = even. Even + odd = odd. Even + even = even.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.hook()});
const QS=[{q:'Is 47 odd or even?',a:'Odd',o:[['Even','tens'],['Neither, it is too big','big']]},{q:'Which number is even?',a:'30',o:[['13','tens'],['27','seven']]},
 {q:'Is 0 odd or even?',a:'Even',o:[['Odd','zero'],['Neither','zero']]},{q:'9 children get into pairs. How many have no partner?',a:'1',o:[['0','none'],['2','two']]},
 {q:'3 + 5 is…',a:'even',o:[['odd','oddodd'],['too big to tell','big']]},{q:'Share 9 sweets fairly between 2. What happens?',a:'4 each and 1 left over',o:[['4 each and none left','left'],['5 each','more']]},
 {q:'Which list is all odd numbers?',a:'1, 3, 5, 7',o:[['2, 4, 6, 8','evlist'],['1, 2, 3, 4','count']]}];
function why(t){let m='Even numbers pair up with none left over. Odd numbers leave one on its own.';
 if(t==='tens')m='The tens digit does not decide. Every ten is 5 pairs. Look at the ones digit.';
 if(t==='big')m='Any whole number is odd or even, however big. Look at the ones digit.';
 if(t==='seven')m='27 ends in 7, and 7 is odd. Even numbers end in 0, 2, 4, 6 or 8.';
 if(t==='zero')m='0 is even. It ends in 0, and 0 things leave none left over.';
 if(t==='none')m='9 is odd. 4 pairs use 8 children, and 1 child is left.';
 if(t==='two')m='If 2 were left, they could make another pair. Only 1 is left.';
 if(t==='oddodd')m='3 and 5 each have one lonely cube. Join them and those two make a pair, so 8 is even.';
 if(t==='left')m='4 and 4 is only 8. The ninth sweet is left over, because 9 is odd.';
 if(t==='more')m='5 and 5 is 10, but there are only 9 sweets.';
 if(t==='evlist')m='2, 4, 6, 8 are the even numbers. Odd numbers end in 1, 3, 5, 7 or 9.';
 if(t==='count')m='2 and 4 are even. Odd numbers go up in 2s: 1, 3, 5, 7.';return m}
function ask(){turn++;const Q=QS[turn%QS.length],all=[[Q.a,'ok'],...Q.o],r=(turn+2)%3,ord=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else bz('miss');
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:B=>{quiz.hidden=B.step!==5;pad.hidden=B.step===5;buttons()},
 init:B=>{A=B;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Odd and even buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}}).start()})})();
