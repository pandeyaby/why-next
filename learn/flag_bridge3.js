/* Flagship – Mental addition and subtraction: a three-digit number and ones (Mathematics, ages 7-8; NC England Y3
   'add and subtract numbers mentally: a three-digit number and ones'; NCETM bridging through ten). The learner jumps a
   marker along a zoomed number line: 342 + 5 in one jump (only the ones digit changes), 346 + 7 by bridging through 350,
   432 - 5 by bridging back through 430, 397 + 5 across the hundred at 400, then sorts sums by which digits change.
   Data and drawings: bridge3_art.js. */
(()=>{const Q=BRG;
VIS.reg('flagbridge3',c=>{c.fig.classList.add('young');
let A,pad,box,qn=-1,gen=0,hold=null,Z={};const S={};
const KEYS=['j','j','j','j','sort','chal'],key=()=>KEYS[A.step];
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const sg=d=>d<0?'\u2212':'+';
function tell(msg,bad){S.msg=msg;S.bad=!!bad;c.say(msg);A.cv.setAttribute('aria-label',msg);pads();A.redraw();S.check()}
const tone=f=>f?'ok':S.bad?'no':'';
/* ---- steps 1-4: jumps on a number line ---- */
function newLine(i){const J=Q.JUMPS[i],ans=J.s+J.d;return{i,J,ans,ten:Q.bridgeOf(J),cur:J.s,fx:J.s,legs:[],hover:null,bad:null,fin:false,
 lo:Math.min(J.s,ans)-2,hi:Math.max(J.s,ans)+2}}
function target(j){return j.ten!=null&&!j.legs.length?j.ten:j.ans}
function leap(v){const j=S.j;if(!j||j.fin||v===j.cur||v<j.lo||v>j.hi)return;
 const add=j.J.d>0,need=target(j),D=Math.abs(j.J.d),left=Math.abs(j.ans-j.cur),k=Math.abs(v-j.cur);
 if(add?v<j.cur:v>j.cur){j.bad=v;A.sound.miss();return tell(add?`Adding makes the number bigger. Jump to the right of ${j.cur}.`:`Taking away makes the number smaller. Jump to the left of ${j.cur}.`,true)}
 if(v!==need){j.bad=v;A.sound.miss();
  if(j.ten!=null&&!j.legs.length&&v===j.ans)return tell(`${v} is the answer, but stop at ${j.ten} first. That ten is the bridge: ${Math.abs(j.ten-j.cur)} gets you there.`,true);
  if(k===Math.abs(need-j.cur)-1)return tell(`That is only ${k} ${k===1?'jump':'jumps'}. Count the jumps, not the marks: the first jump from ${j.cur} lands on ${j.cur+(add?1:-1)}.`,true);
  if(j.ten!=null&&!j.legs.length)return tell(`${v} is not a ten. From ${j.cur}, ${Math.abs(j.ten-j.cur)} ${add?'more':'less'} makes ${j.ten}.`,true);
  return tell(`You have ${left} left to ${add?'add':'take away'}. ${j.cur} ${sg(j.J.d)} ${left} = ${j.ans}.`,true)}
 const from=j.cur;j.legs.push([from,v]);j.cur=v;j.bad=null;A.sound.pop();A.tween(j,{fx:v},420,'out');
 if(v===j.ans){j.fin=true;return tell(Q.DONE[j.i]+(j.legs.length>1?` ${D} = ${j.legs.map(L=>Math.abs(L[1]-L[0])).join(' + ')}.`:''),false)}
 tell(`${from} ${sg(j.J.d)} ${k} = ${v}. That uses ${k} of the ${D}, so ${D-k} ${D-k===1?'is':'are'} left.`,false)}
function viewLine(){const j=S.j,g=A.ctx,dk=A.col.dark,add=j.J.d>0,D=Math.abs(j.J.d);
 const ask=j.ten!=null?(j.legs.length?`Now jump the ${Math.abs(j.ans-j.cur)} left.`:`Jump to ${j.ten} first.`):`Jump ${add?'on':'back'} ${D}.`;
 const y0=Q.head(A,j.fin?Q.DONE[j.i]:`${j.J.s} ${sg(j.J.d)} ${D} = ?  ${ask}`,tone(j.fin),j.fin?null:S.msg,S.bad);
 const big=A.narrow?30:38;g.font=`900 ${big}${Q.F}`;g.fillStyle=dk?Q.LIGHT:Q.INK;g.textAlign='center';g.textBaseline='top';
 g.fillText(`${j.J.s} ${sg(j.J.d)} ${D} = ${j.fin?j.ans:'?'}`,A.W/2,y0+4);
 let y=y0+big+12;if(j.legs.length&&j.ten!=null){g.font=`800 ${A.narrow?16:18}${Q.F}`;g.fillStyle=dk?'#c4b5fd':'#5b21b6';
  g.fillText(`Split ${D} = ${j.legs.map(L=>Math.abs(L[1]-L[0])).join(' + ')}${j.fin?'':' + ?'}`,A.W/2,y);}y+=26;
 const x0=26,x1=A.W-26,ly=y+86,X=v=>x0+(x1-x0)*(v-j.lo)/(j.hi-j.lo);Z.X=X;Z.line={x:x0-16,y:ly-70,w:x1-x0+32,h:110};Z.lo=j.lo;Z.hi=j.hi;Z.x0=x0;Z.x1=x1;
 g.strokeStyle=dk?'#cbd5e1':Q.EDGE;g.lineWidth=4;g.beginPath();g.moveTo(x0-12,ly);g.lineTo(x1+12,ly);g.stroke();
 for(let v=j.lo;v<=j.hi;v++){const ten=v%10===0,x=X(v);g.strokeStyle=ten?Q.TEN:(dk?'#cbd5e1':Q.EDGE);g.lineWidth=ten?4:2;g.beginPath();g.moveTo(x,ly-(ten?16:9));g.lineTo(x,ly+(ten?16:9));g.stroke();
  g.font=`${ten?900:700} ${A.narrow?(ten?14:12):(ten?17:15)}${Q.F}`;g.fillStyle=ten?(dk?'#c4b5fd':'#5b21b6'):v===j.bad?(dk?'#fca5a5':Q.NO):(dk?Q.LIGHT:Q.INK);
  g.textAlign='center';g.textBaseline='top';g.fillText(String(v),x,ly+(ten?19:13))}
 j.legs.forEach(([a,b])=>Q.arc(g,X,ly,a,b,dk?'#86efac':Q.OK,`${sg(b-a)}${Math.abs(b-a)}`,dk));
 if(j.hover!=null&&j.hover!==j.cur)Q.arc(g,X,ly,j.cur,j.hover,dk?'#93c5fd':Q.SEL,`${sg(j.hover-j.cur)}${Math.abs(j.hover-j.cur)}`,dk);
 Q.marker(g,X(j.fx),ly,dk);
 const dy=ly+48,sz=Math.min(54,(A.H-dy-30)/1.1);if(sz>30){Q.digits(g,A.W/2,dy+16,j.cur,j.J.s,dk,sz);
  g.font=`700 ${A.narrow?13:15}${Q.F}`;g.fillStyle=dk?'#cbd5e1':'#334155';g.textAlign='center';g.textBaseline='top';g.fillText('Ringed digits have changed',A.W/2,dy+16+sz*1.1+6)}}
function choices(j){const add=j.J.d>0,s=add?1:-1,need=target(j);let o;
 if(j.ten!=null&&!j.legs.length)o=[need,j.ans,need+s];else o=[need,need-s,need+s];
 o=[...new Set(o)].filter(v=>v>=j.lo&&v<=j.hi&&v!==j.cur);if(o.length<3){const extra=need+2*s;if(extra>=j.lo&&extra<=j.hi&&!o.includes(extra))o.push(extra)}
 const r=j.i%o.length;return o.slice(r).concat(o.slice(0,r))}
/* ---- step 5: which digits change? ---- */
function drop(ci,k){const o=S.o,C=Q.CARDS[ci];if(o.at[ci]!=null)return;o.pick=null;const real=Q.changes(C.s,C.s+C.d);
 if(k!==real){o.bad=ci;A.sound.miss();return tell(Q.sortNo(C,k),true)}
 o.at[ci]=k;o.bad=-1;A.sound.pop();const n=Object.keys(o.at).length;tell(`${Q.sum(C)} = ${C.s+C.d}. ${Q.BINS.find(B=>B.k===k).say}`+(n<6?` ${6-n} to go.`:''),false)}
function viewSort(){const o=S.o,g=A.ctx,dk=A.col.dark,n=Object.keys(o.at).length,fin=n===6;
 const y0=Q.head(A,fin?Q.DONE[4]:`Which digits change? Sort the sums. (${n} of 6)`,tone(fin),fin?null:S.msg,S.bad);
 const bw=(A.W-32)/3,bh=Math.max(120,(A.H-y0)*.42);Z={bins:[],cards:[]};
 Q.BINS.forEach((B,i)=>{const r={k:B.k,x:8+i*(bw+8),y:y0+4,w:bw,h:bh};Z.bins.push(r);const over=hold&&hit(hold,r);
  g.fillStyle=over?(dk?'#1e3a8a':'#dbeafe'):(dk?'#1e293b':'#f8fafc');Q.rr(g,r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=over?Q.SEL:B.k==='ones'?Q.EDGE:Q.TEN;g.lineWidth=over?3:2;g.stroke();
  const f=`800 ${A.narrow?13:16}${Q.F}`,rows=Q.wrap(g,B.t,r.w-10,f);g.font=f;g.fillStyle=dk?Q.LIGHT:Q.INK;g.textAlign='center';g.textBaseline='top';rows.forEach((t,k)=>g.fillText(t,r.x+r.w/2,r.y+6+k*17));
  let yy=r.y+10+rows.length*17;g.font=`800 ${A.narrow?13:15}${Q.F}`;g.fillStyle=dk?'#86efac':Q.OK;
  Object.keys(o.at).filter(ci=>o.at[ci]===B.k).forEach(ci=>{const C=Q.CARDS[ci];g.fillText(`${Q.sum(C)} = ${C.s+C.d}`,r.x+r.w/2,yy);yy+=18})});
 const cols=A.narrow?2:3,cw=(A.W-16-(cols-1)*10)/cols,ch=56,cy=y0+bh+18;let j=0;
 Q.CARDS.forEach((C,i)=>{if(o.at[i]!=null)return;const r={ci:i,x:8+(j%cols)*(cw+10),y:cy+Math.floor(j/cols)*(ch+10),w:cw,h:ch};j++;Z.cards.push(r);if(hold&&hold.ci===i)return;
  Q.card(g,r,Q.sum(C),o.bad===i?'no':o.pick===i?'sel':'',24,dk)});
 if(hold&&hold.ci!=null)Q.card(g,{x:hold.x-cw/2,y:hold.y-ch/2,w:cw,h:ch},Q.sum(Q.CARDS[hold.ci]),'sel',24,dk)}
/* ---- challenge ---- */
function why(tag){let m='Find the next ten first, then add or take away what is left.';
 if(tag==='tens')m='The ones passed a ten, so the tens digit goes up by 1. 346 + 4 = 350, then 3 more is 353.';
 if(tag==='join')m='The ones total is not written next to the other digits. 10 ones make 1 ten, so the tens digit changes instead.';
 if(tag==='flip')m='You did 5 \u2212 2 in the ones. You cannot swap them. Jump back 2 to 430, then 3 more to 427.';
 if(tag==='dir')m='That adds instead of taking away. Taking away makes the number smaller.';
 if(tag==='hund')m='The jump passes a hundred, so the hundreds digit changes too.';
 if(tag==='off')m='Ben counted the start number. Count the jumps: 343 is 1, 344 is 2, so 5 jumps land on 347.';
 if(tag==='place')m='The 5 is ones, not tens. Adding ones moves the ones digit.';
 if(tag==='split')m='Adding 5 then 0 does not stop at a ten. 268 needs 2 to make 270.';
 if(tag==='split2')m='268 + 3 is 271, which is past 270. 268 needs exactly 2 to make the next ten.';return m}
function pose(){qn++;const T=Q.QS[qn%Q.QS.length],all=[[T.a,'ok'],...T.o],k=(qn+1)%3,list=all.slice(k).concat(all.slice(0,k));
 box.innerHTML=`<p><b>${T.q}</b></p><div class="fl-pick" role="group" aria-label="Choose one answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 list.forEach(([v,tag])=>{c.el('button',{type:'button',class:'lbtn'},box.querySelector('.fl-pick'),v).onclick=()=>judge(tag,T.a)});c.say('Challenge: '+T.q);A.cv.setAttribute('aria-label','Challenge: '+T.q);A.redraw()}
function judge(tag,a){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),good=tag==='ok';if(good)A.win();else A.sound.miss();
 fb.innerHTML=(good?`\u2713 Yes: ${a}.`:'\u2717 '+why(tag))+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=pose;c.say(good?'Yes.':why(tag))}
/* ---- wiring ---- */
function reset(){gen++;hold=null;for(const k in S)delete S[k];Object.assign(S,{j:null,o:{at:{},pick:null,bad:-1},msg:null,bad:false,check:()=>{}})}
function begin(i,goal){reset();if(i<4)S.j=newLine(i);c.say(Q.DESC[i]);A.cv.setAttribute('aria-label',Q.DESC[i]);
 S.check=()=>{if(A.step===i&&!A.isDone&&goal()&&(!PLAN[i].predict||A.pred[i]!=null))A.done(Q.DONE[i]+A.reveal(i))};pads();A.redraw()}
function play(i,acts){PLAN[i].go();const e=gen;let t=0;acts.forEach(([ms,f])=>{t+=ms;setTimeout(()=>{if(e===gen)f()},t)})}
function pads(){if(!pad)return;pad.innerHTML='';const k=key(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='j'&&S.j&&!S.j.fin){const j=S.j;choices(j).forEach(v=>b(`Jump to ${v}`,()=>leap(v),`From ${j.cur}, jump ${v>j.cur?'on':'back'} ${Math.abs(v-j.cur)} to ${v}`))}
 if(k==='sort'&&S.o){const ci=Q.CARDS.findIndex((_,i)=>S.o.at[i]==null);if(ci>=0)Q.BINS.forEach(B=>b(`${Q.sum(Q.CARDS[ci])}: ${B.t.toLowerCase()}`,()=>drop(ci,B.k),`Put ${Q.sum(Q.CARDS[ci])} in the box ${B.t}`))}}
const lineGo=i=>()=>begin(i,()=>S.j&&S.j.fin);
const legs=i=>{const J=Q.JUMPS[i],t=Q.bridgeOf(J);return(t!=null?[t]:[]).concat([J.s+J.d]).map(v=>[750,()=>leap(v)])};
const PLAN=[
{h:'Only the ones change',p:Q.TXT[0],predict:{q:'342 + 5. Which digit changes?',opts:['Only the ones digit','The tens digit','All three digits'],ans:0},task:'Jump on 5 from 342',show:()=>play(0,legs(0)),go:lineGo(0)},
{h:'Bridge through ten',p:Q.TXT[1],predict:{q:'346 + 7 = ?',opts:['343','353','3413'],ans:1},task:'Jump to 350, then jump the rest',show:()=>play(1,legs(1)),go:lineGo(1)},
{h:'Bridge back',p:Q.TXT[2],predict:{q:'432 \u2212 5 = ?',opts:['433','437','427'],ans:2},task:'Jump back to 430, then the rest',show:()=>play(2,legs(2)),go:lineGo(2)},
{h:'Across a hundred',p:Q.TXT[3],predict:{q:'397 + 5 = ?',opts:['302','402','3912'],ans:1},task:'Jump to 400, then the rest',show:()=>play(3,legs(3)),go:lineGo(3)},
{h:'Which digits change?',p:Q.TXT[4],task:'Sort all 6 sums',show:()=>play(4,Q.CARDS.map((C,i)=>[420,()=>drop(i,Q.changes(C.s,C.s+C.d))])),go:()=>begin(4,()=>Object.keys(S.o.at).length===6)},
{h:'Challenge',p:'',go:()=>{reset();pose()}}];
PLAN.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
function draw(){const g=A.ctx,dk=A.col.dark;g.fillStyle=dk?'#111827':'#fafaf9';g.fillRect(0,0,A.W,A.H);const k=key();
 if(k==='chal'){const y=Q.head(A,'Challenge: add and take away ones in your head','ok');const sz=Math.min(64,(A.H-y-40)/1.2);if(sz>30)Q.digits(g,A.W/2,y+30,402,397,dk,sz);return}
 if(k==='j'&&S.j)viewLine();else if(k==='sort')viewSort();A.fx.draw(g)}
const valAt=x=>Math.max(Z.lo,Math.min(Z.hi,Math.round(Z.lo+(x-Z.x0)/(Z.x1-Z.x0)*(Z.hi-Z.lo))));
function down(p){const k=key();
 if(k==='j'&&S.j&&!S.j.fin){if(hit(p,Z.line)){hold={x:p.x,y:p.y,x0:p.x,y0:p.y};S.j.hover=valAt(p.x);A.redraw();return true}return false}
 if(k==='sort'){const w=(Z.cards||[]).find(q=>hit(p,q));if(w){hold={ci:w.ci,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}
  const bn=(Z.bins||[]).find(q=>hit(p,q));if(bn&&S.o.pick!=null)drop(S.o.pick,bn.k);return false}return false}
function move(p){if(!hold)return;hold.x=p.x;hold.y=p.y;if(key()==='j'&&S.j)S.j.hover=valAt(p.x);A.redraw()}
function up(p){if(!hold)return;const h=hold,k=key(),tap=Math.hypot(p.x-h.x0,p.y-h.y0)<10;hold=null;
 if(k==='j'&&S.j){S.j.hover=null;return leap(valAt(p.x))}
 if(k==='sort'){const bn=Z.bins.find(q=>hit(p,q));if(bn)return drop(h.ci,bn.k);if(tap){S.o.pick=h.ci;return tell(`Picked ${Q.sum(Q.CARDS[h.ci])}. Now tap a box.`,false)}A.redraw()}}
FK.shell(c,{steps:PLAN,ratio:.7,tall:1.25,draw,onStep:X=>{box.hidden=X.step!==5;pad.hidden=X.step===5;pads()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Number line lab buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);reset();
  A.gest({down,move,up});pads()}}).start()})})();
