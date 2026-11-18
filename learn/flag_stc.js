/* Flagship – Stop, think, then choose (ages 7–9; CASEL responsible decision-making; IB PYP PSPE). Stop the first idea,
   list options, match options to consequences, compare now and later, choose with a reason, try the next option.
   Not flagcool (cooling feelings), flagdecide (consequence words) or flagdilem (values). */
(()=>{
const IDEAS=['Shout at him','Take a breath and say how I feel','Build it again together','Ask a grown-up for help'];
const OPTS=['Tell the teacher','Keep the secret','Talk to your friend first','Tell the whole class'];
const OUTS=[[1,'Your friend keeps cheating and does not learn'],[3,'Your friend feels shamed, and others gossip'],[0,'The teacher helps your friend learn the right way'],[2,'Your friend may own up by themselves']];
const OMISS=['That is what happens if everyone finds out, not just the teacher.','If nobody knows, what keeps happening?','Talking first gives your friend a chance to fix it.','Telling everyone spreads it far. One adult is not everyone.'];
const TIMES=['Now','Tomorrow','Next week'],JOY=[[5,1,1],[3,4,4]],NAMES=['Eat all 10 sweets now','Eat 2 now, save 8'];
const PICK=[['Play games all evening',0,'Fun now, but the homework is not done. Tomorrow you are in trouble.'],['Homework first, then play',1],['Never play games again',0,'No fun, and your friend is let down. There is a choice that works for both.']];
const WHY=[['It was my first idea',0,'A first idea is not a reason. Say what will happen.'],['My friend asked me to',0,'That is about what someone wants, not what will happen.'],['My homework gets done and I still get to play',1]];
const NEXT=[['Grab the tablet',0,'Grabbing starts a fight and you both lose the tablet.'],['Ask a grown-up to set turns',1],['Offer a swap: she goes now, you go after tea',1],['Give up and sulk',0,'Sulking does not fix it. Go back to your options and try the next one.']];
VIS.reg('flagstc',c=>{let A,box,quiz,qn=-1,ver=0;const Z={};c.fig.classList.add('young');
const INK='#0f172a',YES='#047857',NOPE='#b91c1c',RIM='#64748b',HI='#1d4ed8',STOP='#b91c1c',PI2=Math.PI*2;
const f=(n,w)=>`${w||800} ${n}px system-ui,sans-serif`,big=n=>A.narrow?n:Math.round(n*1.2);
const at=()=>['stop','match','time','why','next','chal'][A.step];
const R=(x,y,w,h,r)=>A.paint.rrect(x,y,w,h,r);
function ground(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#dcfce7',A.col.dark?.06:.5);g.fillRect(0,0,A.W,A.H)}
function pill(t,x,y,o){o=o||{};const g=A.ctx;let n=big(o.n||14);g.font=f(n);let w=g.measureText(t).width+22;while(w>A.W-10&&n>10){n--;g.font=f(n);w=g.measureText(t).width+22}
 const h=n+16,l=Math.max(5,Math.min(A.W-w-5,x-w/2));g.fillStyle='#ffffff';R(l,y-h/2,w,h,12);g.fill();g.lineWidth=o.ok||o.bad?3:1.5;g.strokeStyle=o.ok?YES:o.bad?NOPE:RIM;g.stroke();
 g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,l+w/2,y+1)}
function wrap(t,w,n){const g=A.ctx;g.font=f(n);const L=[];let s='';for(const v of t.split(' ')){const tr=s?s+' '+v:v;if(g.measureText(tr).width>w&&s){L.push(s);s=v}else s=tr}L.push(s);return L}
function box2(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.fill||'#ffffff';R(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=o.ok||o.bad||o.sel?4:1.5;g.strokeStyle=o.ok?YES:o.bad?NOPE:o.sel?HI:RIM;g.stroke();
 let n=big(o.n||13),L=wrap(t,r.w-12,n);while(L.length*(n+4)>r.h-8&&n>9){n--;L=wrap(t,r.w-12,n)}g.fillStyle=INK;g.font=f(n);g.textAlign='center';g.textBaseline='middle';
 L.forEach((s,i)=>g.fillText(s,r.x+r.w/2,r.y+r.h/2+(i-(L.length-1)/2)*(n+4)))}
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function rows(n,cols,y0,y1){const gap=8,rw=Math.ceil(n/cols),w=(A.W-gap*(cols+1))/cols,h=(y1-y0-gap*(rw-1))/rw;return [...Array(n)].map((_,i)=>({i,x:gap+(i%cols)*(w+gap),y:y0+Math.floor(i/cols)*(h+gap),w,h}))}
/* 1. stop the first idea, then find more options */
const stopR=()=>{const z=A.narrow?70:90;return{x:A.W/2-z/2,y:A.H*.27,w:z,h:z}};
const doR=()=>({x:A.W-88,y:A.H*.12,w:80,h:A.narrow?52:64});
const ideaR=()=>{const w=A.narrow?120:170;return{x:10+(A.W-w-108)*Z.s.pos,y:A.H*.12,w,h:A.narrow?52:64}};
const optR=()=>rows(3,A.narrow?1:3,A.H*.56,A.H*.97);
function drawStop(){const s=Z.s,g=A.ctx;ground();pill('Your little brother knocks your tower down',A.W/2,A.H*.05,{n:13});
 const D=doR();g.fillStyle='#fee2e2';R(D.x,D.y,D.w,D.h,12);g.fill();g.strokeStyle=STOP;g.lineWidth=3;g.stroke();g.fillStyle='#7f1d1d';g.font=f(big(13));g.textAlign='center';g.textBaseline='middle';g.fillText('DO IT',D.x+D.w/2,D.y+D.h/2);
 const S=stopR(),cx=S.x+S.w/2,cy=S.y+S.h/2,r=S.w/2;g.fillStyle=s.halt?'#94a3b8':STOP;g.beginPath();for(let k=0;k<8;k++){const a=PI2*(k+.5)/8;g.lineTo(cx+r*Math.cos(a),cy+r*Math.sin(a))}g.closePath();g.fill();
 g.fillStyle='#ffffff';g.font=f(big(15),900);g.fillText('STOP',cx,cy+1);
 box2(ideaR(),'First idea: '+IDEAS[0],{bad:!s.halt&&s.pos>.6,sel:s.halt});
 if(!s.halt){pill(s.oops?'Too late: you shouted, and he cried. Try again':'Tap STOP before the first idea reaches DO IT',A.W/2,A.H*.5,{n:12,bad:s.oops});return}
 pill(`Options found: ${s.got.length+1} of 4`,A.W/2,A.H*.5,{n:13,ok:s.got.length>=3});optR().forEach(r=>{const i=r.i+1;box2(r,IDEAS[i],{ok:s.got.includes(i)})})}
function halt(){const s=Z.s;if(s.halt)return;s.halt=1;A.sound.pop();say('Stopped. The first idea was to shout. Now think: what else could you do? Tap each other option.')}
function more(i){const s=Z.s;if(!s.halt)return say('Stop the first idea first: tap STOP.');if(s.got.includes(i))return;s.got.push(i);A.sound.tick();
 say(`Another option: ${IDEAS[i]}.`+(s.got.length>=3?' Four options, not one. Stopping gave you time to think of them.':` ${s.got.length+1} options so far.`))}
function roll(v){if(v!==ver||at()!=='stop')return;const s=Z.s;if(!s.halt){if(A.pred[0]!=null)s.pos+=.012;if(s.pos>=1){s.pos=0;s.oops=1;A.sound.miss();c.say('Too late: you shouted, and your brother cried. Try again, and tap STOP sooner.')}A.redraw();setTimeout(()=>roll(v),60)}}
/* 2. match options to consequences */
function colR(side){return OPTS.map((_,i)=>{const w=A.W*.46,h=(A.H*.84-24)/4;return{i,x:side?A.W-w-8:8,y:A.H*.13+i*(h+8),w,h}})}
function drawMatch(){const s=Z.m,g=A.ctx;ground();pill(`Your friend cheated. Matched: ${s.link.filter(v=>v!=null).length} of 4`,A.W/2,A.H*.06,{n:12,ok:s.done});
 const L=colR(0),Rr=colR(1);s.link.forEach((o,i)=>{if(o==null)return;const a=L[i],b=Rr[o];g.strokeStyle=YES;g.lineWidth=4;g.beginPath();g.moveTo(a.x+a.w,a.y+a.h/2);g.lineTo(b.x,b.y+b.h/2);g.stroke()});
 L.forEach(r=>box2(r,OPTS[r.i],{fill:'#dbeafe',sel:s.sel===r.i,ok:s.link[r.i]!=null}));
 Rr.forEach(r=>{if(Z.drag&&Z.drag.i===r.i)return;box2(r,OUTS[r.i][1],{n:12,ok:s.link.includes(r.i),bad:s.bad===r.i})});
 if(Z.drag){const d=Z.drag,r=Rr[d.i];box2({x:d.x-r.w/2,y:d.y-r.h/2,w:r.w,h:r.h},OUTS[d.i][1],{n:12,sel:1})}}
function opt(i){const s=Z.m;if(s.link[i]!=null)return;s.sel=i;A.sound.tick();say(`"${OPTS[i]}". What would most likely happen? Tap it.`)}
function link(o,i){const s=Z.m;if(i==null)i=s.sel;if(i==null||i<0)return say('Tap an option first.');if(s.link[i]!=null||s.link.includes(o))return;
 if(OUTS[o][0]!==i){s.bad=o;s.sel=-1;A.sound.miss();return say(`Not for "${OPTS[i]}". ${OMISS[i]}`)}
 s.link[i]=o;s.sel=-1;s.bad=-1;A.sound.pop();if(s.link.every(v=>v!=null))s.done=1;say(`${OPTS[i]}: ${OUTS[o][1].toLowerCase()}.`+(s.done?' Every option leads somewhere different. Thinking ahead shows you where.':''))}
/* 3. now, tomorrow, next week */
const track=()=>({x:A.W*.12,y:A.H*.72,w:A.W*.76});
const pickR=()=>rows(2,2,A.H*.82,A.H*.97);
function drawTime(){const s=Z.t,g=A.ctx;ground();pill(`You have 10 sweets. Look at: ${TIMES[s.k]}`,A.W/2,A.H*.06,{n:13,ok:s.k===2});
 [0,1].forEach(o=>{const x=A.W*(o?.55:.05),w=A.W*.4,y=A.H*.14,h=A.H*.48;g.fillStyle='#ffffff';R(x,y,w,h,12);g.fill();g.strokeStyle=s.pick===o?(o?YES:NOPE):RIM;g.lineWidth=s.pick===o?4:1.5;g.stroke();
  g.fillStyle=INK;g.font=f(big(12));g.textAlign='center';g.textBaseline='top';wrap(NAMES[o],w-10,big(12)).forEach((t,j)=>g.fillText(t,x+w/2,y+6+j*big(15)));
  const v=JOY[o][s.k],bw=w*.5,bh=h*.55,by=y+h-12;g.fillStyle='#e2e8f0';g.fillRect(x+w/2-bw/2,by-bh,bw,bh);g.fillStyle=v>=3?YES:'#c2410c';g.fillRect(x+w/2-bw/2,by-bh*v/5,bw,bh*v/5);
  g.fillStyle=INK;g.font=f(big(11));g.textBaseline='bottom';g.fillText(['','Not good','Not good','OK','Good','Great'][v],x+w/2,by-bh-2)});
 const T=track();g.strokeStyle=A.col.tx;g.lineWidth=4;g.beginPath();g.moveTo(T.x,T.y);g.lineTo(T.x+T.w,T.y);g.stroke();
 TIMES.forEach((t,k)=>{const x=T.x+T.w*k/2;g.fillStyle=A.col.tx;g.font=f(big(11));g.textAlign='center';g.textBaseline='bottom';g.fillText(t,x,T.y-14)});
 const kx=T.x+T.w*(Z.dragK!=null?Z.dragK:s.k/2);g.fillStyle=HI;g.beginPath();g.arc(kx,T.y,A.narrow?13:15,0,PI2);g.fill();g.strokeStyle='#ffffff';g.lineWidth=3;g.stroke();
 if(s.k===2)pickR().forEach(r=>box2(r,'Choose: '+NAMES[r.i],{n:12,ok:s.pick===1&&r.i===1,bad:s.pick===0&&r.i===0}))}
function when(k){const s=Z.t;k=Math.max(0,Math.min(2,k));if(k===s.k)return;s.k=k;A.sound.tick();
 say(`${TIMES[k]}: eat all now is ${['great','not good, a tummy ache and no sweets left','not good, none left'][k]}; save some is ${['OK','good, sweets still left','good'][k]}.`+(k===2?' Now choose.':''))}
function choose(o){const s=Z.t;if(s.k<2)return say('First slide to next week.');s.pick=o;if(!o){A.sound.miss();return say('It felt best now, but look at tomorrow and next week: a tummy ache and nothing left. Think about later too.')}
 s.done=1;A.sound.pop();say('Saving some is only OK now, but good tomorrow and next week. A good choice thinks about later, not just now.')}
/* 4. choose and say why */
const pR=()=>rows(3,A.narrow?1:3,A.H*.15,A.H*.5),wR=()=>rows(3,A.narrow?1:3,A.H*.6,A.H*.97);
function drawWhy(){const s=Z.w,g=A.ctx;ground();pill('Your friend says: skip homework, play games all evening!',A.W/2,A.H*.06,{n:12});
 pR().forEach(r=>box2(r,PICK[r.i][0],{fill:'#dbeafe',ok:s.p===r.i&&PICK[r.i][1],bad:s.bp===r.i}));
 if(s.p<0)return pill('1. Choose',A.W/2,A.H*.55,{n:12});pill('2. Why? Pick your reason',A.W/2,A.H*.55,{n:12,ok:s.done});
 wR().forEach(r=>box2(r,WHY[r.i][0],{ok:s.done&&WHY[r.i][1],bad:s.bw===r.i}))}
function pick(i){const s=Z.w;if(s.p>=0)return;const v=PICK[i];if(!v[1]){s.bp=i;A.sound.miss();return say(v[2])}s.p=i;s.bp=-1;A.sound.pop();say('Homework first, then play. Now say why: pick the reason that shows you thought about what will happen.')}
function reason(j){const s=Z.w;if(s.p<0)return say('Choose an option first.');if(s.done)return;const v=WHY[j];if(!v[1]){s.bw=j;A.sound.miss();return say(v[2])}
 s.done=1;s.bw=-1;A.sound.pop();say('A good reason says what will happen: the homework gets done, and you still play.')}
/* 5. it did not work: try the next option */
const nR=()=>rows(4,2,A.H*.3,A.H*.97);
function drawNext(){const s=Z.n;ground();pill('You asked your sister to share the tablet. She said no.',A.W/2,A.H*.07,{n:12});pill(`Good next tries: ${s.got.length} of 2`,A.W/2,A.H*.19,{n:13,ok:s.got.length>=2});
 nR().forEach(r=>box2(r,NEXT[r.i][0],{ok:s.got.includes(r.i),bad:s.bad===r.i}))}
function next(i){const s=Z.n,v=NEXT[i];if(s.got.includes(i)||s.got.length>=2)return;if(!v[1]){s.bad=i;A.sound.miss();return say(v[2])}
 s.got.push(i);s.bad=-1;A.sound.pop();say(`${v[0]}: a new option to try.`+(s.got.length>=2?' When a choice does not work, stop, think of the next option, and choose again.':''))}
function draw(){const k=at();if(k==='chal'){ground();pill('Challenge',A.W/2,A.H*.16,{ok:1});pill('Stop, think, then choose',A.W/2,A.H*.5,{n:15});return}
 ({stop:drawStop,match:drawMatch,time:drawTime,why:drawWhy,next:drawNext})[k]();A.fx.draw(A.ctx)}
function down(p){const k=at();
 if(k==='stop'){if(!Z.s.halt){const S=stopR();if(Math.hypot(p.x-S.x-S.w/2,p.y-S.y-S.h/2)<S.w*.75)halt();return false}const r=optR().find(r=>inside(p,r));if(r)more(r.i+1);return false}
 if(k==='match'){const l=colR(0).find(r=>inside(p,r));if(l){opt(l.i);return false}const r=colR(1).find(r=>inside(p,r));if(r&&!Z.m.link.includes(r.i)){Z.drag={i:r.i,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}return false}
 if(k==='time'){const T=track();if(Math.abs(p.y-T.y)<34&&p.x>T.x-30&&p.x<T.x+T.w+30){Z.dragK=Math.max(0,Math.min(1,(p.x-T.x)/T.w));return true}if(Z.t.k===2){const r=pickR().find(r=>inside(p,r));if(r)choose(r.i)}return false}
 if(k==='why'){const r=pR().find(r=>inside(p,r));if(r){pick(r.i);return false}if(Z.w.p>=0){const w=wR().find(r=>inside(p,r));if(w)reason(w.i)}return false}
 if(k==='next'){const r=nR().find(r=>inside(p,r));if(r)next(r.i)}return false}
function move(p){if(at()==='time'&&Z.dragK!=null){const T=track();Z.dragK=Math.max(0,Math.min(1,(p.x-T.x)/T.w));A.redraw();return}if(!Z.drag)return;Z.drag.x=p.x;Z.drag.y=p.y;A.redraw()}
function up(p){if(at()==='time'&&Z.dragK!=null){const k=Math.round(Z.dragK*2);Z.dragK=null;when(k);A.redraw();return}const d=Z.drag;if(!d)return;Z.drag=null;
 const tap=Math.hypot(p.x-d.x0,p.y-d.y0)<10;if(tap)return link(d.i);const l=colR(0).find(r=>inside(p,r));if(l)link(d.i,l.i);else A.redraw()}
function clean(){ver++;for(const k in Z)delete Z[k];Object.assign(Z,{s:{pos:0,halt:0,oops:0,got:[]},m:{link:[null,null,null,null],sel:-1,bad:-1,done:0},t:{k:0,pick:-1,done:0},w:{p:-1,bp:-1,bw:-1,done:0},n:{got:[],bad:-1},drag:null,dragK:null,cb:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();pads();Z.cb()}
const ready=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,desc,ok,msg){clean();say(desc);Z.cb=ready(i,ok,msg)}
function run(i,acts,ms){steps[i].go();const v=ver;acts.forEach((fn,j)=>setTimeout(()=>{if(v===ver)fn()},ms*(j+1)))}
function pads(){if(!box)return;box.innerHTML='';const k=at(),B=(t,fn,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},box,t).onclick=fn};
 if(k==='stop'){if(!Z.s.halt)B('STOP',halt,'Stop the first idea');else if(Z.s.got.length<3)IDEAS.forEach((t,i)=>{if(i&&!Z.s.got.includes(i))B(t,()=>more(i))})}
 if(k==='match'&&!Z.m.done){const i=Z.m.sel;if(i<0)OPTS.forEach((t,j)=>{if(Z.m.link[j]==null)B(t,()=>opt(j))});else OUTS.forEach((o,j)=>{if(!Z.m.link.includes(j))B(o[1],()=>link(j,i),`If you ${OPTS[i].toLowerCase()}: ${o[1]}`)})}
 if(k==='time'){if(Z.t.k<2)B('Later →',()=>when(Z.t.k+1),'Move the time on');if(Z.t.k>0)B('← Sooner',()=>when(Z.t.k-1),'Move the time back');if(Z.t.k===2&&!Z.t.done)NAMES.forEach((t,o)=>B('Choose: '+t,()=>choose(o)))}
 if(k==='why'&&!Z.w.done){if(Z.w.p<0)PICK.forEach((v,i)=>B(v[0],()=>pick(i)));else WHY.forEach((v,j)=>B(v[0],()=>reason(j),'Because '+v[0].toLowerCase()))}
 if(k==='next'&&Z.n.got.length<2)NEXT.forEach((v,i)=>{if(!Z.n.got.includes(i))B(v[0],()=>next(i))})}
const steps=[
{h:'Stop the first idea',p:'Your first idea pops up fast. Tap STOP before it reaches DO IT. Then find the other options.',
 predict:{q:'Your tower gets knocked down. How many choices do you have?',opts:['Just one: my first idea','Usually more than one'],ans:1},task:'Stop, then find 3 more options',
 show:()=>run(0,[halt,()=>more(1),()=>more(2),()=>more(3)],600),
 go:()=>{begin(0,'The first idea, Shout at him, slides towards DO IT. A STOP sign is on the right.',()=>Z.s.got.length>=3,'Stopping turned one idea into four options.');roll(ver)}},
{h:'What might happen?',p:'Your friend cheated in a test and asks you to keep it a secret. Tap an option, then what would most likely happen, or drag a card.',task:'Match all 4 options',
 show:()=>run(1,[[0,2],[1,0],[2,3],[3,1]].map(([i,o])=>()=>link(o,i)),650),
 go:()=>begin(1,'Four options on the left, four things that might happen on the right.',()=>Z.m.done,'Each option has its own consequence. Thinking ahead lets you see them before you choose.')},
{h:'Now and later',p:'Drag the blue dot from Now to Next week, or use the buttons. Watch both bars. Then choose.',
 predict:{q:'The choice that feels best right now is always best later too. True?',opts:['Yes, always','No, not always'],ans:1},task:'Slide to next week, then choose',
 show:()=>run(2,[()=>when(1),()=>when(2),()=>choose(1)],800),
 go:()=>begin(2,'Two choices for 10 sweets and a time line: Now, Tomorrow, Next week.',()=>Z.t.done,'Eating them all feels great now and bad later. Think about now and later before you choose.')},
{h:'Choose and say why',p:'Pick the choice you would make. Then pick the reason that shows you thought about what will happen.',task:'Choose, then give a reason',
 show:()=>run(3,[()=>pick(1),()=>reason(2)],800),
 go:()=>begin(3,'Three choices about homework and games.',()=>Z.w.done,'A good reason names a consequence, not just a feeling or a first idea.')},
{h:'Try the next option',p:'Sometimes a good choice does not work. Tap 2 good things to try next.',
 predict:{q:'Your good choice did not work. What now?',opts:['Give up: thinking did not help','Go back and try another option'],ans:1},task:'Find 2 good next tries',
 show:()=>run(4,[()=>next(1),()=>next(2)],800),
 go:()=>begin(4,'Four things to try after your sister says no.',()=>Z.n.got.length>=2,'If one option fails, you still have others. Stop, think, then choose again.')},
{h:'Challenge',p:'',go:()=>{clean();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.cb()});
const QS=[
 {q:'Someone pushes in front of you in the line. What is the first step?',a:'Stop before you act',o:[['Push them back','first'],['Do the first thing you think of','first']]},
 {q:'How many options should you think of?',a:'More than one',o:[['Just one','one'],['Only the fastest one','one']]},
 {q:'Eating all your sweets now feels great. What else should you think about?',a:'How it will feel later',o:[['Nothing, now is all that matters','now'],['Only how it feels to you this minute','now']]},
 {q:'Which is a good reason for a choice?',a:'Nobody gets hurt and the problem gets fixed',o:[['It was my first idea','reason'],['It was the quickest','reason']]},
 {q:'Your choice did not work. What next?',a:'Try another option',o:[['Give up','quit'],['Do the same thing louder','quit']]},
 {q:'When you think about what might happen, whose feelings count?',a:'Yours and other people\'s',o:[['Only yours','me'],['Only the grown-ups\'','me']]}];
function why(t){let m='Stop, think of options and what will happen, then choose.';
 if(t==='first')m='The first idea comes fast and is often not the best. Stop first, so you have time to think.';
 if(t==='one')m='One option is not a choice. Think of at least two, then compare what each would do.';
 if(t==='now')m='Some choices feel good now and bad later. Think about tomorrow and next week too.';
 if(t==='reason')m='A good reason says what will happen, not just that it came first or fast.';
 if(t==='quit')m='If a choice does not work, go back to your options and try the next one.';
 if(t==='me')m='Consequences happen to other people too. Think about how a choice affects everyone.';
 return m}
function ask(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>score(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function score(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.3,draw,onStep:B=>{quiz.hidden=B.step!==5;box.hidden=B.step===5;pads()},
 init:B=>{A=B;const wrap=c.el('div',{class:'fl-below'},A.below);box=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Choice buttons'},wrap);quiz=c.el('div',{class:'fl-chal'},A.below);clean();A.gest({down,move,up});pads()}}).start()})})();
