/* Flagship – numbers on a number line (ages 7–8; CCSS 2.MD.6 numbers as lengths from 0, sums and differences within 100
   on a number line diagram; NC 2013 Year 2–3). Scenes: measure a ribbon by counting spaces not ticks, drag an arrow to a
   number between two tens, jump a frog forward in tens and ones to add, jump back to take away, and check a robot's
   number lines. Data in learn/numlen_art.js. Distinct from flagnline (estimating where a number sits on 0-100 and
   0-1000) and flagcounton (counting on in ones along a track). */
(()=>{const {RIB,SPOT,FWD,BACK,ROBOT,DESC,DONE,QS}=NLN;
VIS.reg('flagnumlen',c=>{let A,pad,chal,qi=-1,gen=0;const S={};c.fig.classList.add('young');
const INK='#1e293b',GOOD='#047857',BAD='#b91c1c',GREY='#64748b',F='px system-ui,sans-serif';
/* drawing colours on the canvas paper: darker shades in the light theme, lighter ones in the dark theme */
const tone=(l,d)=>A.col.dark?d:l,RIBC=()=>tone('#be185d','#f472b6'),FROG=()=>tone('#15803d','#4ade80'),ARC=()=>tone('#1d4ed8','#60a5fa'),BACKC=()=>tone('#c2410c','#fb923c');
const scene=()=>['len','spot','fwd','back','robot','quiz'][A.step];
const sz=n=>A.narrow?n:Math.round(n*1.2);
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function paper(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#e0f2fe',A.col.dark?.05:.4);g.fillRect(0,0,A.W,A.H)}
function txt(t,x,y,n,col,wt){const g=A.ctx;g.font=`${wt||800} ${sz(n)}${F}`;g.fillStyle=col||INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,x,y)}
/* a white label card that shrinks its font until it fits the canvas */
function card(t,x,y,o){o=o||{};const g=A.ctx;let n=sz(o.n||14);g.font=`800 ${n}${F}`;let w=g.measureText(t).width+24;
 while(w>A.W-8&&n>10){n--;g.font=`800 ${n}${F}`;w=g.measureText(t).width+24}
 const h=n+16,x0=Math.max(4,Math.min(A.W-w-4,x-w/2));g.fillStyle='#ffffff';A.paint.rrect(x0,y-h/2,w,h,10);g.fill();
 g.lineWidth=o.ok||o.no?3:1.5;g.strokeStyle=o.ok?GOOD:o.no?BAD:GREY;g.stroke();g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,x0+w/2,y+1)}
function key(r,o){o=o||{};const g=A.ctx;g.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();
 g.lineWidth=o.no||o.ok?3.5:1.5;g.strokeStyle=o.no?BAD:o.ok?GOOD:GREY;g.stroke();txt(r.t,r.x+r.w/2,r.y+r.h/2+1,o.n||18,INK,900)}
/* number line geometry: x for a value, and the line itself */
const L=(lo,hi,y)=>({lo,hi,y,x0:A.W*.07,x1:A.W*.93,at(v){return this.x0+(v-lo)/(hi-lo)*(this.x1-this.x0)}});
function drawLine(l,o){o=o||{};const g=A.ctx,step=o.step||1;g.strokeStyle=A.col.tx;g.lineWidth=2.5;g.beginPath();g.moveTo(l.x0-6,l.y);g.lineTo(l.x1+6,l.y);g.stroke();
 for(let v=l.lo;v<=l.hi;v+=step){const big=o.every?v%o.every===0:true,x=o.odd&&v===1?l.at(1.6):l.at(v);g.lineWidth=big?2.5:1.5;g.beginPath();g.moveTo(x,l.y-(big?11:7));g.lineTo(x,l.y+(big?11:7));g.stroke();
  if(o.label&&o.label(v))txt(String(v),x,l.y+26,12,A.col.tx,800)}}
function hop(l,a,b,col,lab){const g=A.ctx,xa=l.at(a),xb=l.at(b),hgt=Math.min(46,Math.abs(xb-xa)*.6+10);g.strokeStyle=col;g.lineWidth=3;g.beginPath();g.moveTo(xa,l.y-3);
 g.quadraticCurveTo((xa+xb)/2,l.y-hgt*2,xb,l.y-3);g.stroke();if(lab)txt(lab,(xa+xb)/2,l.y-hgt-8,11,col,900)}
function frog(x,y){const g=A.ctx,r=Math.min(13,A.W/30);g.fillStyle=FROG();g.beginPath();g.ellipse(x,y-r,r,r*.8,0,0,7);g.fill();g.fillStyle='#fff';
 [-1,1].forEach(e=>{g.beginPath();g.arc(x+e*r*.45,y-r*1.7,r*.32,0,7);g.fill()});g.fillStyle=INK;[-1,1].forEach(e=>{g.beginPath();g.arc(x+e*r*.45,y-r*1.7,r*.15,0,7);g.fill()})}
function keyRow(list,y,h){const gap=8,n=list.length,w=Math.min(84,(A.W-20-gap*(n-1))/n),x0=(A.W-(w*n+gap*(n-1)))/2;return list.map((t,i)=>({t,v:t,x:x0+i*(w+gap),y,w,h:Math.min(h,58)}))}
/* 1. how long is the ribbon? count spaces, not ticks */
const lenKeys=()=>{const a=keyRow(['1','2','3','4','5'],A.H*.62,A.H*.15),b=keyRow(['6','7','8','9','10'],A.H*.62+Math.min(A.H*.15,58)+8,A.H*.15);return a.concat(b)};
function drawLen(){const s=S.len;paper();if(s.i>=RIB.length){card('All 3 ribbons measured',A.W/2,A.H*.14,{ok:1});card('4, 7 and 9: count the spaces',A.W/2,A.H*.34,{n:15});return}
 const n=RIB[s.i],l=L(0,10,A.H*.36),g=A.ctx;card(`Ribbon ${s.i+1} of ${RIB.length}. How long is it?`,A.W/2,A.H*.08,{n:12});
 g.fillStyle=RIBC();g.fillRect(l.at(0),l.y-22,l.at(n)-l.at(0),12);drawLine(l,{label:v=>v===0||v===10||(s.show&&v<=n)});
 if(s.show)for(let v=0;v<n;v++)txt(String(v+1),(l.at(v)+l.at(v+1))/2,l.y-34,10,RIBC(),900);
 lenKeys().forEach(r=>key(r,{no:s.bad===+r.v}))}
function lenTap(v){const s=S.len;if(s.i>=RIB.length)return;const n=RIB[s.i];
 if(v!==n){s.bad=v;A.sound.miss();
  if(v===n+1)return say(`${v} is the number of tick marks. Count the spaces between them: the 0 tick is where you start, so it is not 1.`);
  if(v===n-1)return say(`Count every space from 0 right up to the end of the ribbon. You missed one.`);
  return say(`Put your finger on 0 and count each space the ribbon covers.`)}
 s.bad=-1;s.show=true;A.sound.pop();const m=`Yes: ${n} spaces, so the ribbon is ${n} long. It touches ${n+1} ticks.`;s.i++;
 setTimeout(()=>{s.show=false;A.redraw()},900);say(m+(s.i<RIB.length?' Next ribbon.':''))}
/* 2. drag an arrow to a number between two tens */
const spotLine=()=>L(30,50,A.H*.42);
function drawSpot(){const s=S.spot;paper();if(s.i>=SPOT.length){card('All 3 numbers found',A.W/2,A.H*.14,{ok:1});card('36, 43, 48: find the ten, then count on',A.W/2,A.H*.34,{n:14});return}
 const t=SPOT[s.i],l=spotLine(),g=A.ctx;card(`Put the arrow on ${t}`,A.W/2,A.H*.1,{n:15});drawLine(l,{every:10,label:v=>v%10===0});
 const x=l.at(s.at),col=s.bad?tone(BAD,'#f87171'):ARC();g.fillStyle=col;g.beginPath();g.moveTo(x,l.y-14);g.lineTo(x-11,l.y-36);g.lineTo(x+11,l.y-36);g.closePath();g.fill();
 txt(String(s.at),x,l.y-50,13,col,900);if(s.good)txt('✓',l.at(s.good),l.y+48,18,tone(GOOD,'#4ade80'),900)}
function spotSet(v){const s=S.spot;s.at=Math.max(30,Math.min(50,v));s.bad=false;A.redraw()}
function spotCheck(){const s=S.spot;if(s.i>=SPOT.length)return;const t=SPOT[s.i],v=s.at,ten=Math.floor(t/10)*10;
 if(v!==t){s.bad=true;A.sound.miss();
  if(Math.abs(v-t)===10)return say(`That is ${v}, in the wrong ten. ${t} is ${t-ten} spaces after ${ten}.`);
  if(Math.abs(v-t)===1)return say(`That is ${v}, one space off. Start on the ${ten} tick and count ${t-ten} spaces, not ${t-ten} ticks.`);
  return say(`That is ${v}. Find ${ten} first, then count ${t-ten} small spaces to the right.`)}
 s.good=t;A.sound.pop();s.i++;s.at=40;say(`Yes: ${t} is ${ten} and ${t-ten} more.`+(s.i<SPOT.length?' Next number.':''))}
/* 3 and 4. frog jumps to add and take away */
function jumpLine(a,b,sign){const end=a+sign*b,lo=Math.floor(Math.min(a,end)/10)*10,hi=Math.ceil(Math.max(a,end)/10)*10+(Math.max(a,end)%10===0?10:0);return L(lo,Math.max(hi,lo+20),A.H*.46)}
const tiles=sign=>keyRow(sign>0?['+10','+5','+1','Undo']:['−10','−5','−1','+10','Undo'],A.H*.74,A.H*.17);
function drawJump(k,sign){const s=S[k],list=sign>0?FWD:BACK;paper();
 if(s.i>=list.length){card(sign>0?'All 3 sums jumped':'All 3 take-aways jumped',A.W/2,A.H*.14,{ok:1});card(sign>0?'Tens first, then ones':'Take away jumps go left',A.W/2,A.H*.34,{n:15});return}
 const [a,b]=list[s.i],l=jumpLine(a,b,sign),used=s.hops.reduce((t,h)=>t+Math.abs(h),0);card(`${a} ${sign>0?'+':'−'} ${b}. Jumped ${used} of ${b}.`,A.W/2,A.H*.08,{n:13,no:s.bad,ok:used===b});
 drawLine(l,{every:10,label:v=>v%10===0});let at=a;s.hops.forEach(h=>{hop(l,at,at+h,h>0?ARC():BACKC(),(h>0?'+':'−')+Math.abs(h));at+=h});frog(l.at(at),l.y-4);
 txt(String(at),l.at(at),l.y+46,13,FROG(),900);tiles(sign).forEach(r=>key(r,{n:16}))}
function jumpTap(k,sign,t){const s=S[k],list=sign>0?FWD:BACK;if(s.i>=list.length)return;const [a,b]=list[s.i];
 if(t==='Undo'){s.hops.pop();s.bad=false;A.sound.tick();return say('Undid the last jump.')}
 const h=t[0]==='+'?+t.slice(1):-t.slice(1);
 if(sign<0&&h>0){s.bad=true;A.sound.miss();return say('Take away means jump back, to the left, towards 0. Plus jumps go right.')}
 s.hops.push(h);const used=s.hops.reduce((x,y)=>x+Math.abs(y),0),at=a+sign*used;A.sound.tick();
 if(used>b){s.hops.pop();s.bad=true;A.sound.miss();return say(`That jump takes you ${used-b} too far: your jumps add to ${used}, but you need ${b}. Try a smaller jump.`)}
 s.bad=false;if(used<b)return say(`On ${at}. ${b-used} still to jump.`);
 const eq=`${a} ${sign>0?'+':'−'} ${b} = ${at}`;A.sound.pop();s.i++;s.hops=[];say(`Yes: ${eq}.`+(s.i<list.length?' Next one.':''))}
/* 5. the robot's number lines */
const verdict=()=>[0,1].map(k=>{const w=Math.min(170,(A.W-36)/2);return{k,t:k?'✗ Slip':'✓ Right',x:A.W/2+(k?6:-w-6),y:A.H*.76,w,h:Math.min(A.H*.17,60)}});
function drawRobot(){const s=S.robot,g=A.ctx;paper();if(s.i>=ROBOT.length){card('All 4 robot lines checked',A.W/2,A.H*.15,{ok:1});card('Slips: ticks, direction, unequal spaces',A.W/2,A.H*.38,{n:13});return}
 const R=ROBOT[s.i],P=R.pic,l=L(P.lo,P.hi,A.H*.44);card(R.say,A.W/2,A.H*.1,{n:11});card(`Robot ${s.i+1} of ${ROBOT.length}. Right, or a slip?`,A.W/2,A.H*.62,{n:12});
 if(P.rib){g.fillStyle=RIBC();g.fillRect(l.at(0),l.y-22,l.at(P.rib)-l.at(0),12)}
 drawLine(l,{every:P.hi-P.lo>10?10:1,step:P.hi-P.lo>10?10:1,odd:P.odd,label:v=>P.hi-P.lo>10||v===P.lo||v===P.hi||P.odd});
 if(P.jumps)for(let j=1;j<P.jumps.length;j++)hop(l,P.jumps[j-1],P.jumps[j],ARC(),'+10');
 verdict().forEach(r=>key(r,{no:s.bad===r.k,n:16}))}
function judge(k){const s=S.robot;if(s.i>=ROBOT.length)return;const R=ROBOT[s.i];
 if((k===0)!==R.ok){s.bad=k;A.sound.miss();return say(R.ok?`Look again: ${R.fix}`:`Check the spaces and the direction. ${R.fix}`)}
 s.bad=-1;A.sound.pop();s.i++;say((R.ok?'Yes, right. ':'Yes, a slip. ')+R.fix)}
function draw(){const k=scene();if(k==='quiz'){paper();card('Challenge',A.W/2,A.H*.2,{ok:1});card('Count spaces. Add: right. Take away: left.',A.W/2,A.H*.5,{n:13});return}
 if(k==='fwd')drawJump('fwd',1);else if(k==='back')drawJump('back',-1);else({len:drawLen,spot:drawSpot,robot:drawRobot})[k]();A.fx.draw(A.ctx)}
function valueAt(p){const l=spotLine();return Math.round(30+(p.x-l.x0)/(l.x1-l.x0)*20)}
function down(p){const k=scene();
 if(k==='len'){const r=lenKeys().find(q=>inside(p,q));if(r)lenTap(+r.v);return false}
 if(k==='spot'){const l=spotLine();if(S.spot.i<SPOT.length&&Math.abs(p.y-l.y)<60){S.spot.drag=true;spotSet(valueAt(p));return true}return false}
 if(k==='fwd'||k==='back'){const sign=k==='fwd'?1:-1,r=tiles(sign).find(q=>inside(p,q));if(r)jumpTap(k,sign,r.t);return false}
 if(k==='robot'){const v=verdict().find(q=>inside(p,q));if(v)judge(v.k);return false}
 return false}
function move(p){if(S.spot&&S.spot.drag)spotSet(valueAt(p))}
function up(){if(S.spot&&S.spot.drag){S.spot.drag=false;spotCheck()}}
function reset(){gen++;for(const k in S)delete S[k];Object.assign(S,{len:{i:0,bad:-1,show:false},spot:{i:0,at:40,bad:false,good:0,drag:false},fwd:{i:0,hops:[],bad:false},back:{i:0,hops:[],bad:false},robot:{i:0,bad:-1},check:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.check()}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,ok){reset();say(DESC[i]);S.check=finish(i,ok,DONE[i])}
function auto(i,acts,ms){steps[i].go();const g0=gen;acts.forEach((f,j)=>setTimeout(()=>{if(g0===gen)f()},ms*(j+1)))}
/* the quickest tens-then-ones jumps for a number b */
const plan=b=>[...Array(Math.floor(b/10)).fill(10),...(b%10>=5?[5]:[]),...Array(b%10%5).fill(1)];
const steps=[
{h:'How long?',p:'A ribbon starts at 0. How long is it? Count the spaces it covers, not the tick marks.',
 predict:{q:'A ribbon goes from 0 to 4. It touches 5 tick marks. How long is it?',opts:['5, one for each tick','4, one for each space'],ans:1},task:'Measure all 3 ribbons',
 show:()=>auto(0,RIB.map(n=>()=>lenTap(n)),650),go:()=>begin(0,()=>S.len.i>=RIB.length)},
{h:'Find the spot',p:'Only the tens are labelled. Drag the arrow to the number, or tap its tick. Find the ten first.',task:'Find 36, 43 and 48',
 show:()=>auto(1,SPOT.flatMap(t=>[()=>spotSet(t),()=>spotCheck()]),550),go:()=>begin(1,()=>S.spot.i>=SPOT.length)},
{h:'Jump to add',p:'Start on the first number. Jump the tens, then the ones, until you have jumped the second number.',task:'Jump 3 sums',
 show:()=>auto(2,FWD.flatMap(([,b])=>plan(b).map(h=>()=>jumpTap('fwd',1,'+'+h))),240),go:()=>begin(2,()=>S.fwd.i>=FWD.length)},
{h:'Jump back',p:'To take away, start on the first number and jump back towards 0.',
 predict:{q:'72 − 35. Which way do the jumps go?',opts:['Right, away from 0','Left, back towards 0'],ans:1},task:'Jump back 3 times',
 show:()=>auto(3,BACK.flatMap(([,b])=>plan(b).map(h=>()=>jumpTap('back',-1,'−'+h))),240),go:()=>begin(3,()=>S.back.i>=BACK.length)},
{h:'Check the robot',p:'The robot drew some number lines. Is each one right, or did it slip?',task:'Check all 4 robot lines',
 show:()=>auto(4,ROBOT.map(R=>()=>judge(R.ok?0:1)),700),go:()=>begin(4,()=>S.robot.i>=ROBOT.length)},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(st=>{if(st.task)st.onPredict=()=>S.check()});
function why(t){let m='Count the spaces from the start, and jump right to add, left to take away.';
 if(t==='tick')m='That counts the tick marks. A length is the number of spaces: 0 is where you start.';
 if(t==='start')m='Number lines start at 0, not 1. The first space ends at 1.';
 if(t==='dir')m='Take away jumps go left, back towards 0. Adding jumps go right.';
 if(t==='ten')m='Find the right ten first: 54 is between 50 and 60, 4 spaces after 50.';
 if(t==='one')m='That moved by ones, not tens. A jump of 10 changes the tens digit.';
 if(t==='once')m='30 is 3 tens, so jump 10 three times: 36, 46, 56.';
 if(t==='equal')m='Every space on a number line is the same size. Unequal spaces make the lengths wrong.';
 return m}
function ask(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="lbtn sm">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
function buttons(){if(!pad)return;pad.innerHTML='';const k=scene(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='len'&&S.len.i<RIB.length)for(let v=1;v<=10;v++)B(String(v),()=>lenTap(v),`The ribbon is ${v} long`);
 if(k==='spot'&&S.spot.i<SPOT.length){B('◀ 1',()=>spotSet(S.spot.at-1),'Move the arrow 1 left');B('1 ▶',()=>spotSet(S.spot.at+1),'Move the arrow 1 right');
  B('◀ 10',()=>spotSet(S.spot.at-10),'Move the arrow 10 left');B('10 ▶',()=>spotSet(S.spot.at+10),'Move the arrow 10 right');B('Put it here',()=>spotCheck(),`Put the arrow on ${S.spot.at}`)}
 if(k==='fwd'&&S.fwd.i<FWD.length)tiles(1).forEach(r=>B(r.t,()=>jumpTap('fwd',1,r.t),r.t==='Undo'?'Undo the last jump':`Jump ${r.t}`));
 if(k==='back'&&S.back.i<BACK.length)tiles(-1).forEach(r=>B(r.t,()=>jumpTap('back',-1,r.t),r.t==='Undo'?'Undo the last jump':`Jump ${r.t}`));
 if(k==='robot'&&S.robot.i<ROBOT.length){B('✓ Right',()=>judge(0),'The robot is right');B('✗ Slip',()=>judge(1),'The robot made a slip')}}
FK.shell(c,{steps,ratio:.6,tall:1.1,draw,onStep:st=>{chal.hidden=st.step!==5;pad.hidden=st.step===5;buttons()},
 init:st=>{A=st;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Number line lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}}).start()})})();
