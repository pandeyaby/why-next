/* Flagship – doubles to double 5 (ages 4–5; EYFS Development Matters Reception Mathematics "automatically recall number
   bonds ... including double facts"; ELG Number: recall double facts up to 5 + 5; NCETM Mastering Number, Reception:
   doubles as two equal groups, with fingers, dice and mirrors). Five scenes: give a ladybird the same spots on both wings,
   count a block and its mirror image, sort dominoes into double or not, show a double on two hands, and drag double 1 to
   double 5 onto 2, 4, 6, 8, 10. Not flagttdbl (doubling in times tables). Data in learn/doub_art.js. */
(()=>{const {WING,SPOT,MIR,DOM,SIDES,HANDS,FACTS,QS}=DUB;
VIS.reg('flagdoubles',c=>{let A,ctl,chal,qq=-1,ver=0;const D={};c.fig.classList.add('young');
const NAVY='#1e293b',GOOD='#047857',OOPS='#b91c1c',MID='#6b7280',SEL='#7c3aed',RED='#dc2626',BLU='#2563eb',PX='px system-ui,sans-serif';
const part=()=>['wing','mirror','domino','hands','facts','quiz'][A.step];
const big=n=>A.narrow?n:Math.round(n*1.15);
function bg(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#dcfce7',A.col.dark?.07:.5);g.fillRect(0,0,A.W,A.H)}
function chip(t,x,y,o){o=o||{};const g=A.ctx;let n=big(o.n||14);g.font=`800 ${n}${PX}`;let w=g.measureText(t).width+24;
 while(w>A.W-10&&n>10){n--;g.font=`800 ${n}${PX}`;w=g.measureText(t).width+24}
 const h=n+16,x0=Math.max(5,Math.min(A.W-w-5,x-w/2));g.fillStyle='#ffffff';A.paint.rrect(x0,y-h/2,w,h,10);g.fill();
 g.lineWidth=o.ok||o.no?3:1.5;g.strokeStyle=o.ok?GOOD:o.no?OOPS:MID;g.stroke();g.fillStyle=NAVY;g.textAlign='center';g.textBaseline='middle';g.fillText(t,x0+w/2,y+1)}
function box(r,o){o=o||{};const g=A.ctx;g.fillStyle=o.no?'#fee2e2':o.ok?'#d1fae5':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=o.no||o.ok||o.on?4:2;g.strokeStyle=o.no?OOPS:o.ok?GOOD:o.on?SEL:MID;g.stroke()}
function text(t,x,y,n,col){const g=A.ctx;g.fillStyle=col||NAVY;g.font=`900 ${big(n)}${PX}`;g.textAlign='center';g.textBaseline='middle';g.fillText(t,x,y)}
function strip(n,y,h,pad){const gap=8,w=Math.min(120,(A.W-2*(pad||10)-gap*(n-1))/n),x0=(A.W-(w*n+gap*(n-1)))/2;return Array.from({length:n},(_,i)=>({i,x:x0+i*(w+gap),y,w,h}))}
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function dots(cx,cy,k,s,col){const g=A.ctx,P={1:[[0,0]],2:[[-1,-1],[1,1]],3:[[-1,-1],[0,0],[1,1]],4:[[-1,-1],[1,-1],[-1,1],[1,1]],5:[[-1,-1],[1,-1],[0,0],[-1,1],[1,1]]}[k]||[];
 g.fillStyle=col;P.forEach(([a,b])=>{g.beginPath();g.arc(cx+a*s,cy+b*s,s*.42,0,7);g.fill()})}
/* 1. ladybird wings */
const bug=()=>{const r=Math.min(A.W*.3,A.H*.32);return{x:A.W/2,y:A.H*.5,r}};
function drawWing(){const s=D.a,g=A.ctx,b=bug();bg();
 if(s.r>=3){chip('3 ladybirds: both wings the same',A.W/2,A.H*.1,{ok:1});WING.forEach((n,j)=>chip(`${n} and ${n} is ${2*n}: double ${n} is ${2*n}`,A.W/2,A.H*(.34+j*.18),{n:15}));return}
 const n=WING[s.r];chip(s.won?`Double ${n} is ${2*n}`:`Ladybird ${s.r+1} of 3: tap the right wing to add spots`,A.W/2,A.H*.07,{n:13,ok:s.won});
 g.fillStyle='#111827';g.beginPath();g.arc(b.x,b.y-b.r*.95,b.r*.32,0,7);g.fill();
 [-1,1].forEach(side=>{g.fillStyle=RED;g.beginPath();g.moveTo(b.x,b.y-b.r*.75);g.arc(b.x,b.y,b.r,-Math.PI/2,Math.PI/2,side<0);g.closePath();g.fill();g.lineWidth=3;g.strokeStyle='#7f1d1d';g.stroke();
  const k=side<0?n:s.k;for(let i=0;i<k;i++){const [u,v]=SPOT[i];g.fillStyle='#111827';g.beginPath();g.arc(b.x+side*u*b.r,b.y+v*b.r,b.r*.11,0,7);g.fill()}});
 g.strokeStyle='#111827';g.lineWidth=3;g.beginPath();g.moveTo(b.x,b.y-b.r*.7);g.lineTo(b.x,b.y+b.r);g.stroke();
 text(String(n),b.x-b.r*.55,b.y+b.r*1.12,16,A.col.tx);text(String(s.k),b.x+b.r*.55,b.y+b.r*1.12,16,s.k===n?GOOD:A.col.tx)}
function spot(d){const s=D.a;if(s.r>=3||s.won)return;s.k=Math.max(0,Math.min(6,s.k+d));tell(`Right wing: ${s.k} spots. Left wing: ${WING[s.r]}.`)}
function wings(){const s=D.a;if(s.r>=3)return;const n=WING[s.r];
 if(s.won){s.r++;s.k=0;s.won=0;return tell(s.r>=3?'All 3 ladybirds done. A double is two groups the same.':'Next ladybird. Tap the right wing to add spots.')}
 if(s.k!==n){A.sound.miss();return tell(s.k<n?`Not yet: ${s.k} is fewer than ${n}. Add spots until both wings are the same.`:`Too many: ${s.k} is more than ${n}. Take one away.`)}
 s.won=1;A.sound.pop();tell(`Both wings have ${n}. ${n} and ${n} is ${2*n}. Double ${n} is ${2*n}. Tap Wings match for the next one.`)}
/* 2. mirror */
const numKeys=()=>strip(5,A.H*.7,A.H*.12).concat(strip(5,A.H*.85,A.H*.12)).map((r,i)=>({...r,i,v:i+1}));
function drawMirror(){const s=D.b,g=A.ctx;bg();
 if(s.r>=3){chip('Mirror doubles',A.W/2,A.H*.1,{ok:1});MIR.forEach((n,j)=>chip(`${n} and ${n} in the mirror is ${2*n}`,A.W/2,A.H*(.34+j*.17),{n:15}));return}
 const n=MIR[s.r],u=Math.min(A.W*.08,A.H*.1),mx=A.W/2,y=A.H*.36;chip(`Mirror ${s.r+1} of 3: how many blocks now?`,A.W/2,A.H*.07,{n:13});
 g.fillStyle=A.col.dark?'#94a3b8':'#cbd5e1';g.fillRect(mx-3,A.H*.18,6,A.H*.38);
 for(let i=0;i<n;i++){[-1,1].forEach(sd=>{const x=mx+sd*(14+i*(u+4))-(sd<0?u:0);g.fillStyle=sd<0?BLU:'rgba(37,99,235,.55)';g.fillRect(x,y-u/2,u,u);g.lineWidth=2;g.strokeStyle=NAVY;g.strokeRect(x,y-u/2,u,u)})}
 text(`${n} blocks`,mx-A.W*.24,y+u+12,13,A.col.tx);text('mirror',mx+A.W*.24,y+u+12,13,A.col.tx);
 numKeys().forEach(r=>{box(r,{no:s.bad===r.v});text(String(r.v),r.x+r.w/2,r.y+r.h/2+1,18)})}
function guess(v){const s=D.b;if(s.r>=3)return;const n=MIR[s.r];
 if(v!==2*n){s.bad=v;A.sound.miss();return tell(v===n?`${n} is just the blocks on one side. Count the mirror too.`:v===n+2?`${n+2} is ${n} and 2 more. Double means ${n} and ${n} again.`:v===n+1?`${n+1} is just 1 more. The mirror shows ${n} more, not 1.`:`Count every block: ${n} on this side, ${n} in the mirror.`)}
 s.r++;s.bad=0;A.sound.pop();tell(`Yes: ${n} and ${n} is ${2*n}. Double ${n} is ${2*n}.`+(s.r>=3?' The mirror always makes two groups the same.':''))}
/* 3. double or not */
function lane(k){const w=(A.W-36)/2;return{x:12+k*(w+12),y:A.H*.1,w,h:A.H*.3}}
function domR(){const gap=10,w=Math.min(150,(A.W-gap*4)/3),h=Math.min(w*.55,A.H*.2),x0=(A.W-(3*w+2*gap))/2;return DOM.map((_,i)=>({i,x:x0+(i%3)*(w+gap),y:A.H*.5+Math.floor(i/3)*(h+gap*2),w,h}))}
function domino(r,[a,b],o){const g=A.ctx;box(r,o);g.strokeStyle=NAVY;g.lineWidth=2;g.beginPath();g.moveTo(r.x+r.w/2,r.y+6);g.lineTo(r.x+r.w/2,r.y+r.h-6);g.stroke();
 const s=Math.min(r.w*.09,r.h*.2);dots(r.x+r.w*.25,r.y+r.h/2,a,s,NAVY);dots(r.x+r.w*.75,r.y+r.h/2,b,s,NAVY)}
function drawDomino(){const s=D.c,g=A.ctx;bg();
 SIDES.forEach(([e,t],k)=>{const r=lane(k);g.fillStyle=k?(A.col.dark?'#7f1d1d':'#fecaca'):(A.col.dark?'#064e3b':'#bbf7d0');A.paint.rrect(r.x,r.y,r.w,r.h,18);g.fill();
  g.lineWidth=s.hot===k?4:2;g.strokeStyle=s.hot===k?SEL:MID;g.stroke();text(e+' '+t,r.x+r.w/2,r.y+r.h*.18,15,A.col.dark?'#f9fafb':NAVY);
  const got=s.in.filter(i=>(DOM[i][0]===DOM[i][1]?0:1)===k);got.forEach((i,j)=>{const d=DOM[i];text(`${d[0]}+${d[1]}`,r.x+r.w*(.2+j*.3),r.y+r.h*.65,15,A.col.dark?'#f9fafb':NAVY)})});
 domR().forEach(r=>{if(s.in.includes(r.i)||(D.drag&&D.drag.i===r.i))return;domino(r,DOM[r.i],{no:s.bad===r.i,on:s.pick===r.i})});
 if(D.drag){const d=D.drag,r=domR()[d.i];domino({x:d.x-r.w/2,y:d.y-r.h/2,w:r.w,h:r.h},DOM[d.i],{on:1})}
 chip(s.in.length>=6?'All 6 dominoes sorted':'Double or not a double?',A.W/2,A.H*.045,{n:13,ok:s.in.length>=6})}
function sortDom(i,k){const s=D.c;if(s.in.includes(i))return;s.pick=null;const [a,b]=DOM[i],dbl=a===b;
 if((dbl?0:1)!==k){s.bad=i;A.sound.miss();return tell(dbl?`${a} and ${b} are the same, so it is a double: ${a+b}.`:`${a} and ${b} are not the same. A double needs two groups the same.`)}
 s.in.push(i);s.bad=-1;A.sound.pop();tell((dbl?`${a} and ${a}: a double, ${a+b}.`:`${a} and ${b}: not the same, not a double.`)+(s.in.length>=6?' All sorted.':` ${s.in.length} of 6.`))}
/* 4. two hands */
function fingerR(h,f){const w=Math.min(A.W*.06,34),gap=w*.3,x0=h?A.W*.56:A.W*.06,hgt=A.H*.32;return{x:x0+f*(w+gap),y:A.H*.24,w,h:hgt}}
function drawHands(){const s=D.d,g=A.ctx;bg();
 if(s.r>=3){chip('3 doubles on two hands',A.W/2,A.H*.1,{ok:1});HANDS.forEach((n,j)=>chip(`${n} fingers and ${n} fingers is ${2*n}`,A.W/2,A.H*(.34+j*.17),{n:15}));return}
 const n=HANDS[s.r];chip(`Hands ${s.r+1} of 3: show double ${n}`,A.W/2,A.H*.07,{n:13});
 [0,1].forEach(h=>{for(let f=0;f<5;f++){const r=fingerR(h,f),up=s.up[h][f];g.fillStyle=up?(h?'#f59e0b':'#fbbf24'):(A.col.dark?'#475569':'#e5e7eb');
  const top=up?r.y:r.y+r.h*.62;A.paint.rrect(r.x,top,r.w,r.y+r.h-top,r.w/2);g.fill();g.lineWidth=2;g.strokeStyle=NAVY;g.stroke()}
  const L=fingerR(h,0),R=fingerR(h,4);g.fillStyle=A.col.dark?'#fcd34d':'#fde68a';A.paint.rrect(L.x-4,L.y+L.h-6,R.x+R.w-L.x+8,A.H*.14,14);g.fill();g.lineWidth=2;g.strokeStyle=NAVY;g.stroke();
  text(String(s.up[h].filter(Boolean).length),(L.x+R.x+R.w)/2,L.y+L.h+A.H*.07,18)})}
const raised=h=>D.d.up[h].filter(Boolean).length;
function finger(h,f){const s=D.d;if(s.r>=3)return;s.up[h][f]=!s.up[h][f];tell(`Left hand ${raised(0)}, right hand ${raised(1)}.`)}
function bump(h,d){const s=D.d;if(s.r>=3)return;const k=Math.max(0,Math.min(5,raised(h)+d));s.up[h]=[0,1,2,3,4].map(f=>f<k);tell(`Left hand ${raised(0)}, right hand ${raised(1)}.`)}
function hands(){const s=D.d;if(s.r>=3)return;const n=HANDS[s.r],a=raised(0),b=raised(1);
 if(a!==b){A.sound.miss();return tell(`${a} and ${b} are not the same. A double needs the same on both hands.`)}
 if(a!==n){A.sound.miss();return tell(`That is double ${a}, which is ${2*a}. Show double ${n}: ${n} on each hand.`)}
 s.r++;s.up=[[0,0,0,0,0],[0,0,0,0,0]].map(x=>x.map(Boolean));A.sound.pop();tell(`${n} and ${n} is ${2*n}. Double ${n} is ${2*n}.`+(s.r>=3?' All 3 shown.':' Next one.'))}
/* 5. double facts */
const ansR=()=>strip(5,A.H*.16,A.H*.26,8),factR=()=>strip(5,A.H*.68,A.H*.22,8);
function drawFacts(){const s=D.e;bg();chip(s.got.length>=5?'2, 4, 6, 8, 10: doubles go up in 2s':'Drag each double to its answer',A.W/2,A.H*.06,{n:13,ok:s.got.length>=5});
 ansR().forEach(r=>{const v=2*(r.i+1),f=s.got.includes(r.i+1);box(r,{ok:f,on:s.hot===r.i});text(String(v),r.x+r.w/2,r.y+r.h*.35,22);if(f)text(`dbl ${r.i+1}`,r.x+r.w/2,r.y+r.h*.75,12)});
 factR().forEach(r=>{const n=FACTS[r.i];if(s.got.includes(n)||(D.drag&&D.drag.i===r.i))return;box(r,{no:s.bad===n,on:s.pick===r.i});text('double',r.x+r.w/2,r.y+r.h*.32,11);text(String(n),r.x+r.w/2,r.y+r.h*.68,22)});
 if(D.drag){const d=D.drag,r=factR()[d.i];const q={x:d.x-r.w/2,y:d.y-r.h/2,w:r.w,h:r.h};box(q,{on:1});text('double',d.x,q.y+r.h*.32,11);text(String(FACTS[d.i]),d.x,q.y+r.h*.68,22)}}
function fact(n,slot){const s=D.e;if(s.got.includes(n))return;s.pick=null;const v=2*(slot+1);
 if(v!==2*n){s.bad=n;A.sound.miss();return tell(v===n+2?`${v} is ${n} and 2 more. Double ${n} is ${n} and ${n}.`:v===n+1?`${v} is ${n} and 1 more. Double ${n} is ${n} and ${n}.`:`Double ${n} is ${n} and ${n}. Count on ${n} from ${n}.`)}
 s.got.push(n);s.bad=0;A.sound.pop();tell(`Double ${n} is ${2*n}.`+(s.got.length>=5?' All 5. The answers go 2, 4, 6, 8, 10.':''))}
function draw(){const k=part();if(k==='quiz'){bg();chip('Challenge',A.W/2,A.H*.16,{ok:1});chip('Double: the same number twice',A.W/2,A.H*.5,{n:14});return}
 ({wing:drawWing,mirror:drawMirror,domino:drawDomino,hands:drawHands,facts:drawFacts})[k]();A.fx.draw(A.ctx)}
function down(p){const k=part();
 if(k==='wing'){const b=bug();if(p.x>b.x&&Math.hypot(p.x-b.x,p.y-b.y)<=b.r)spot(1);return false}
 if(k==='mirror'){const r=numKeys().find(r=>inside(p,r));if(r)guess(r.v);return false}
 if(k==='domino'){const r=domR().find(r=>inside(p,r)&&!D.c.in.includes(r.i));if(r){D.drag={i:r.i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}
  const b=[0,1].find(j=>inside(p,lane(j)));if(b!=null&&D.c.pick!=null)sortDom(D.c.pick,b);return false}
 if(k==='hands'){for(let h=0;h<2;h++)for(let f=0;f<5;f++)if(inside(p,fingerR(h,f))){finger(h,f);return false}return false}
 if(k==='facts'){const r=factR().find(r=>inside(p,r)&&!D.e.got.includes(FACTS[r.i]));if(r){D.drag={i:r.i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}
  const a=ansR().find(r=>inside(p,r));if(a&&D.e.pick!=null)fact(FACTS[D.e.pick],a.i);return false}return false}
function move(p){const d=D.drag;if(!d)return;d.x=p.x;d.y=p.y;const k=part();
 if(k==='domino'){const h=[0,1].find(j=>inside(p,lane(j)));D.c.hot=h==null?-1:h}
 if(k==='facts'){const a=ansR().find(r=>inside(p,r));D.e.hot=a?a.i:-1}A.redraw()}
function up(p){const d=D.drag;if(!d)return;D.drag=null;const tap=Math.hypot(p.x-d.x0,p.y-d.y0)<10,k=part();
 if(k==='domino'){D.c.hot=-1;const b=[0,1].find(j=>inside(p,lane(j)));if(b!=null)return sortDom(d.i,b);if(tap){D.c.pick=d.i;return tell('Domino picked. Now tap Double or Not a double.')}}
 if(k==='facts'){D.e.hot=-1;const a=ansR().find(r=>inside(p,r));if(a)return fact(FACTS[d.i],a.i);if(tap){D.e.pick=d.i;return tell(`Double ${FACTS[d.i]} picked. Now tap its answer.`)}}A.redraw()}
function reset(){ver++;for(const k in D)delete D[k];Object.assign(D,{a:{r:0,k:0,won:0},b:{r:0,bad:0},c:{in:[],bad:-1,hot:-1,pick:null},d:{r:0,up:[[0,0,0,0,0],[0,0,0,0,0]].map(x=>x.map(Boolean))},e:{got:[],bad:0,hot:-1,pick:null},drag:null,hook:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();D.hook()}
const ready=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function open(i,desc,ok,msg){reset();tell(desc);D.hook=ready(i,ok,msg)}
function play(i,acts,ms){steps[i].go();const v0=ver;acts.forEach((f,j)=>setTimeout(()=>{if(v0===ver)f()},ms*(j+1)))}
function keys(){if(!ctl)return;ctl.innerHTML='';const k=part(),K=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(k==='wing'&&D.a.r<3){K('➕ Add a spot',()=>spot(1),'Add a spot to the right wing');K('➖ Take one away',()=>spot(-1),'Take a spot off the right wing');K(D.a.won?'Next ladybird →':'✔ Wings match',wings)}
 if(k==='mirror'&&D.b.r<3)for(let v=1;v<=10;v++)K(String(v),()=>guess(v),`${v} blocks`);
 if(k==='domino')DOM.forEach(([a,b],i)=>{if(!D.c.in.includes(i)){K(`${a} and ${b} → Double`,()=>sortDom(i,0));K(`${a} and ${b} → Not`,()=>sortDom(i,1),`${a} and ${b}: not a double`)}});
 if(k==='hands'&&D.d.r<3){K('Left ➕',()=>bump(0,1),'One more finger on the left hand');K('Left ➖',()=>bump(0,-1),'One less finger on the left hand');K('Right ➕',()=>bump(1,1),'One more finger on the right hand');K('Right ➖',()=>bump(1,-1),'One less finger on the right hand');K('✔ Check',hands,'Check my double')}
 if(k==='facts')FACTS.forEach((n,i)=>{if(!D.e.got.includes(n))[2,4,6,8,10].forEach((v,j)=>{if(Math.abs(v-2*n)<=2)K(`double ${n} → ${v}`,()=>fact(n,j))})})}
const steps=[
{h:'Ladybird wings',p:'A double is two groups the same. Tap the right wing to add spots until both wings match, then tap Wings match.',
 task:'Give 3 ladybirds matching wings',show:()=>play(0,WING.flatMap(n=>[...Array(n)].map(()=>()=>spot(1)).concat([()=>wings(),()=>wings()])),280),
 go:()=>open(0,'A ladybird with 3 spots on the left wing and none on the right.',()=>D.a.r>=3,'3 and 3 is 6, 5 and 5 is 10, 2 and 2 is 4. Same on both wings makes a double.')},
{h:'Mirror double',p:'Put blocks by a mirror. The mirror shows the same again. Tap how many blocks you see in all.',
 predict:{q:'4 blocks and the same in the mirror. How many?',opts:['6','8'],ans:1},task:'Count 3 mirror doubles',
 show:()=>play(1,MIR.map(n=>()=>guess(2*n)),650),
 go:()=>open(1,'4 blue blocks by a mirror. The mirror shows 4 more.',()=>D.b.r>=3,'Double 4 is 8, not 6: double means the same number again, not 2 more.')},
{h:'Double or not?',p:'Drag each domino to Double or Not a double, or tap it and then tap a box.',
 predict:{q:'A domino has 4 and 1. Is it a double?',opts:['Yes, it has two sides','No, the sides are not the same'],ans:1},task:'Sort all 6 dominoes',
 show:()=>play(2,DOM.map(([a,b],i)=>()=>sortDom(i,a===b?0:1)),550),
 go:()=>open(2,'Six dominoes. Two boxes: Double and Not a double.',()=>D.c.in.length>=6,'3 and 3, 2 and 2, 1 and 1 are doubles. 4 and 1, 5 and 4, 3 and 2 are not: the sides are not the same.')},
{h:'Two hands',p:'Tap fingers to put them up or down. Show the double on two hands, then tap Check.',
 task:'Show 3 doubles on your hands',show:()=>play(3,HANDS.flatMap(n=>[()=>{D.d.up=[0,1].map(()=>[0,1,2,3,4].map(f=>f<n));tell(`${n} up on each hand.`)},()=>hands()]),600),
 go:()=>open(3,'Two hands, all fingers down. Show double 2.',()=>D.d.r>=3,'Double 2 is 4, double 4 is 8, double 5 is 10. Same fingers on each hand.')},
{h:'Double facts',p:'Drag double 1 to double 5 onto their answers, or tap a card and then an answer.',
 predict:{q:'What is double 5?',opts:['55','10'],ans:1},task:'Match all 5 doubles',
 show:()=>play(4,FACTS.map(n=>()=>fact(n,n-1)),550),
 go:()=>open(4,'Five cards: double 1 to double 5. Answers: 2, 4, 6, 8, 10.',()=>D.e.got.length>=5,'Double 5 is 10, not 55: it is 5 and 5, not the digit written twice. The answers go up in 2s.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>D.hook()});
function oops(t){let m='Count both groups: the same number twice.';
 if(t==='plus2')m='That is 2 more. Double means the same number again.';
 if(t==='one')m='That is just 1 more. Double means the same number again.';
 if(t==='side')m='That is one group. A double has two groups the same: count both.';
 if(t==='same')m='A double needs the two groups to be the same.';
 if(t==='digits')m='Do not write the number twice. Double 5 is 5 and 5, which is 10.';
 return m}
function ask(){qq++;const Q=QS[qq%QS.length],all=[[Q.a,'ok'],...Q.o],r=qq%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+oops(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':oops(t))}
FK.shell(c,{steps,ratio:.62,tall:1.12,draw,onStep:S=>{chal.hidden=S.step!==5;ctl.hidden=S.step===5;keys()},
 init:S=>{A=S;const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Doubles buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});keys()}}).start()})})();
