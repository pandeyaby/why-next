/* Flagship – linear vs exponential growth (ages 15–17; CCSS F-LE.1, F-LE.3): differences vs ratios, fixed amount vs
   percent, £100 a day vs 1p doubled, 2^x overtaking steeper lines, halving vs minus 10. Not flaggrow or flagexpg. */
(()=>{
const TABLES=[{v:[5,8,11,14,17],kind:'lin'},{v:[3,6,12,24,48],kind:'exp'},{v:[100,90,81,72.9,65.61],kind:'exp'},{v:[0,1,4,9,16],kind:'none'}];
const TABLE_MISS={
 'lin>exp':'Every gap is +3: linear. The ratios (1.6, 1.38 …) are not equal.',
 'lin>none':'Every gap is +3. Equal differences mean linear.',
 'exp>lin':'The gaps grow (+3, +6, +12), but each value is × 2 the one before: exponential.',
 'exp>none':'The ratios are all × 2. Equal ratios mean exponential.',
 'dec>lin':'The falls shrink: −10, −9, −8.1. Each value is × 0.9 the one before: exponential decay.',
 'dec>none':'Every ratio is × 0.9. Equal ratios mean exponential decay.',
 'none>lin':'The gaps are +1, +3, +5, +7: not equal, so not linear.',
 'none>exp':'The ratios (4, 2.25 …) are not equal, so not exponential. These are square numbers.'};
const SITS=[['£5 is added to savings every week','lin','The same £5 each week: linear.'],
 ['A bacteria colony doubles every hour','exp','× 2 each hour: exponential.'],
 ['A phone loses 4% of a full charge every hour','lin','4% of a FULL charge is the same amount each hour: linear.'],
 ['A car loses 15% of its value each year','exp','15% of its value NOW shrinks as the value falls. × 0.85 a year: exponential.'],
 ['A taxi costs £3, then £2 for each mile','lin','+£2 for every mile: linear. The £3 is the start value.'],
 ['A bank adds 4% interest to the balance each year','exp','4% of a growing balance grows. × 1.04 a year: exponential.']];
const fmt=v=>Math.abs(v-Math.round(v))<1e-9?String(Math.round(v)):String(+v.toFixed(2));
const money=p=>p>=1e6?`£${(p/1e6).toFixed(2)} million`:'£'+p.toLocaleString('en-GB',{maximumFractionDigits:2});   // 2^d − 1 is odd, so no trailing zeros
const linTotal=d=>100*d,dblTotal=d=>(Math.pow(2,d)-1)/100;     // £100 a day vs 1p, 2p, 4p … (pounds, running totals)
const SLOPES=[10,100,1000],cross=m=>{let x=1;while(Math.pow(2,x)<=m*x)x++;return x};   // first x ≥ 1 where 2^x > m·x
VIS.reg('flaglinexp',c=>{let A,ctl,quiz,qk=-1,tok=0;
const S={};
function fresh(){tok++;Object.assign(S,{want:()=>{},won:0,j:0,bad:-1,lock:0,grab:0,gaps:[],day:0,x:1,n:0,cx:null,cy:null})}
const stage=()=>['table','sort','race','over','decay','quiz'][A.step],rm=()=>A.reduced(),fs=n=>Math.round(n*(A.narrow?1:1.12));
function say(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function text(g,t,x,y,size,weight,align,col){g.font=`${weight||700} ${fs(size)}px system-ui,sans-serif`;g.textAlign=align||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-12)}
function box(g,r,stroke,width){const C=A.col;g.fillStyle=C.dark?'#1e293b':'#fff';A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();g.strokeStyle=stroke||C.tx;g.lineWidth=width||2;A.paint.rrect(r.x,r.y,r.w,r.h,9);g.stroke()}
const hit=(p,r)=>r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function afterDelay(fn,ms){const k=tok;setTimeout(()=>{if(k===tok)fn()},rm()?10:ms)}
function play(list,gap){const k=++tok;list.forEach((fn,i)=>setTimeout(()=>{if(k===tok)fn()},rm()?i*40+30:(i+1)*(gap||400)))}
function miss(t,b){A.sound.miss();S.bad=b;say(t);setTimeout(()=>{S.bad=-1;A.redraw()},rm()?10:900);A.redraw()}

/* step 1: a table of values, gaps reveal differences and ratios */
function cell(k){const w=Math.min(78,(A.W-24)/5-6),x0=(A.W-(5*w+24))/2;return{x:x0+k*(w+6),y:A.H*.16,w,h:A.H*.16}}
function gapRect(k){const a=cell(k),b=cell(k+1);return{x:a.x+a.w*.5,y:A.H*.36,w:b.x+b.w*.5-(a.x+a.w*.5),h:A.H*.3}}
function openGap(k){if(stage()!=='table'||S.won>=4||k<0||k>3)return;const v=TABLES[S.j].v;if(!S.gaps.includes(k))S.gaps.push(k);A.sound.tick();
 say(`Gap ${k+1}: difference ${v[k+1]-v[k]>=0?'+':'−'}${fmt(Math.abs(v[k+1]-v[k]))}, ratio ${v[k]?'× '+fmt(v[k+1]/v[k]):'cannot divide by 0'}.`);A.redraw()}
const KINDS=['lin','exp','none'],kindRect=i=>({x:8+i*(A.W-16)/3,y:A.H*.79,w:(A.W-16)/3-6,h:A.H*.12});
function classify(pick){if(stage()!=='table'||S.won>=4||S.lock)return;const t=TABLES[S.j];
 if(pick!==t.kind)return miss(TABLE_MISS[`${t.v[1]<t.v[0]?'dec':t.kind}>${pick}`]||'Compare the gaps and the ratios.',pick);
 S.won++;S.gaps=[0,1,2,3];A.sound.pop();say({lin:'Linear: equal differences.',exp:'Exponential: equal ratios.',none:'Neither: differences and ratios both change.'}[t.kind]);
 if(S.won<4){S.lock=1;afterDelay(()=>{S.lock=0;S.j++;S.gaps=[];keys();A.redraw();say('A new table. Tap the gaps.')},900)}keys();A.redraw();S.want()}
function drawTable(g){const C=A.col,t=TABLES[Math.min(S.j,3)];text(g,S.won<4?`Table ${S.j+1} of 4: tap a gap to compare neighbours`:'All 4 tables sorted.',A.W/2,A.H*.07,13,900);
 t.v.forEach((v,k)=>{const r=cell(k);box(g,r);text(g,fmt(v),r.x+r.w/2,r.y+r.h/2,A.narrow?15:19,900)});
 [0,1,2,3].forEach(k=>{const r=gapRect(k),open=S.gaps.includes(k),a=t.v[k],b=t.v[k+1];g.strokeStyle=open?C.ac:C.ln;g.lineWidth=2;g.setLineDash(open?[]:[4,4]);A.paint.rrect(r.x+3,r.y,r.w-6,r.h,8);g.stroke();g.setLineDash([]);
  if(open){text(g,`${b-a>=0?'+':'−'}${fmt(Math.abs(b-a))}`,r.x+r.w/2,r.y+r.h*.3,A.narrow?12:14,900,'center',C.or);text(g,a?`×${fmt(b/a)}`:'× ?',r.x+r.w/2,r.y+r.h*.7,A.narrow?12:14,900,'center',C.cy)}
  else text(g,'tap',r.x+r.w/2,r.y+r.h/2,11,700,'center',C.mu)});
 text(g,'orange = difference (b − a)     blue = ratio (b ÷ a)',A.W/2,A.H*.72,11,800,'center',C.mu);
 KINDS.forEach((k,i)=>{const r=kindRect(i);box(g,r,S.bad===k?C.rd:C.ln,S.bad===k?4:2);text(g,['Linear','Exponential','Neither'][i],r.x+r.w/2,r.y+r.h/2,A.narrow?12:14,900)});text(g,`${Math.min(S.won,4)} of 4`,A.W-14,A.H*.96,11,800,'right',C.mu)}

/* step 2: sort situations into two bins */
const bins=()=>[{x:8,y:A.H*.64,w:A.W/2-14,h:A.H*.3},{x:A.W/2+6,y:A.H*.64,w:A.W/2-14,h:A.H*.3}];
const cardRect=()=>{const w=Math.min(A.W-30,440),h=A.H*.3;return{x:S.cx==null?(A.W-w)/2:S.cx-w/2,y:S.cy==null?A.H*.12:S.cy-h/2,w,h}};
function sortInto(k){if(stage()!=='sort'||S.won>=6||S.lock)return;const s=SITS[S.j],pick=k?'exp':'lin';S.cx=S.cy=null;
 if(pick!==s[1])return miss(s[2],k);S.won++;A.sound.pop();say('Yes. '+s[2]);
 if(S.won<6){S.lock=1;afterDelay(()=>{S.lock=0;S.j++;keys();A.redraw();say(SITS[S.j][0])},700)}keys();A.redraw();S.want()}
function wrapLines(g,t,maxW){const words=t.split(' '),out=[];let line='';words.forEach(w=>{const tryL=line?line+' '+w:w;if(g.measureText(tryL).width>maxW&&line){out.push(line);line=w}else line=tryL});out.push(line);return out}
function drawSort(g){const C=A.col;bins().forEach((b,k)=>{box(g,b,S.bad===k?C.rd:k?C.cy:C.or,S.bad===k?5:3);text(g,k?'Exponential':'Linear',b.x+b.w/2,b.y+b.h*.32,15,900);text(g,k?'same factor (× b)':'same difference (+ d)',b.x+b.w/2,b.y+b.h*.66,11,800,'center',C.mu)});
 if(S.won>=6){text(g,'All 6 sorted.',A.W/2,A.H*.27,16,900);return}const r=cardRect();box(g,r,C.ac,3);g.font=`800 ${fs(A.narrow?14:16)}px system-ui,sans-serif`;
 const lines=wrapLines(g,SITS[S.j][0],r.w-24);lines.forEach((l,i)=>text(g,l,r.x+r.w/2,r.y+r.h/2+(i-(lines.length-1)/2)*fs(20),A.narrow?14:16,800));
 text(g,`Drag the card into a box. ${S.won} of 6`,A.W/2,A.H*.05,11,700,'center',C.mu)}

/* step 3: £100 a day vs 1p doubled each day */
const RX=d=>A.W*.13+d/30*A.W*.8,RY=v=>A.H*.86-Math.min(v,4000)/4000*A.H*.68,dayAt=x=>Math.max(0,Math.min(30,Math.round((x-A.W*.13)/(A.W*.8)*30)));
function setDay(d){if(stage()!=='race')return;d=Math.max(0,Math.min(30,d));if(d===S.day)return;S.day=d;A.sound.tick();const L=linTotal(d),D=dblTotal(d);
 say(`Day ${d}: Plan A ${money(L)}, Plan B ${money(D)}. ${D>L?'B':'A'} is ahead.`);
 if(!S.won&&d===18){S.won=1;A.sound.pop();say('Day 18: £2,621.43 beats £1,800. By day 30: £10.74 million vs £3,000.');S.want()}keys();A.redraw()}
function drawRace(g){const C=A.col;g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.moveTo(RX(0),RY(4000));g.lineTo(RX(0),RY(0));g.lineTo(RX(30),RY(0));g.stroke();
 [0,10,20,30].forEach(d=>text(g,String(d),RX(d),RY(0)+14,10,700));[1000,2000,3000,4000].forEach(v=>text(g,`£${v/1000}k`,RX(0)-5,RY(v),10,700,'right'));text(g,'Day',RX(15),A.H*.97,11,800);
 g.lineWidth=3;g.strokeStyle=C.or;g.beginPath();g.moveTo(RX(0),RY(0));g.lineTo(RX(30),RY(3000));g.stroke();
 g.strokeStyle=C.cy;g.beginPath();for(let d=0;d<=30;d+=.1){const v=dblTotal(d);if(v>4000)break;d?g.lineTo(RX(d),RY(v)):g.moveTo(RX(d),RY(v))}g.stroke();
 text(g,'£100 a day (linear)',RX(19.5),RY(linTotal(19.5))+18,11,900,'left',C.or);text(g,'1p doubled daily',RX(1),RY(3750),11,900,'left',C.cy);text(g,'(exponential)',RX(1),RY(3750)+15,11,900,'left',C.cy);
 g.strokeStyle=C.ac;g.setLineDash([5,4]);g.lineWidth=2;g.beginPath();g.moveTo(RX(S.day),RY(0));g.lineTo(RX(S.day),RY(4000));g.stroke();g.setLineDash([]);
 [[linTotal(S.day),C.or],[dblTotal(S.day),C.cy]].forEach(([v,col])=>{g.fillStyle=col;g.beginPath();g.arc(RX(S.day),RY(v),7,0,7);g.fill()});
 const D=dblTotal(S.day);text(g,`Day ${S.day}: ${money(linTotal(S.day))} vs ${money(D)}${D>4000?' (off the top)':''}`,A.W/2,A.H*.06,13,900)}

/* step 4: y = m·x against y = 2^x */
const OX=x=>A.W*.12+x/16*A.W*.82,OY=(v,m)=>A.H*.86-Math.min(v,m*17)/(m*17)*A.H*.7,xAt=px=>Math.max(1,Math.min(16,Math.round((px-A.W*.12)/(A.W*.82)*16)));
function setX(x){if(stage()!=='over'||S.won>=3||S.lock)return;x=Math.max(1,Math.min(16,x));if(x===S.x)return;S.x=x;A.sound.tick();const m=SLOPES[S.j],L=m*x,E=Math.pow(2,x);
 say(`x = ${x}: ${m}x = ${L}, 2^x = ${E}.`);
 if(x===cross(m)){S.won++;A.sound.pop();say(`Overtaken at x = ${x}: ${E} beats ${L}.${S.won<3?' Now 10 times steeper.':' Each ×10 only bought 4 steps.'}`);
  if(S.won<3){S.lock=1;afterDelay(()=>{S.lock=0;S.j++;S.x=1;keys();A.redraw()},800)}S.want()}keys();A.redraw()}
function drawOver(g){const C=A.col,m=SLOPES[Math.min(S.j,2)];g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.moveTo(OX(0),OY(m*17,m));g.lineTo(OX(0),OY(0,m));g.lineTo(OX(16),OY(0,m));g.stroke();
 [0,4,8,12,16].forEach(x=>text(g,String(x),OX(x),OY(0,m)+14,10,700));text(g,String(m*16),OX(0)-4,OY(m*16,m),10,700,'right');
 g.lineWidth=3;g.strokeStyle=C.or;g.beginPath();g.moveTo(OX(0),OY(0,m));g.lineTo(OX(16),OY(m*16,m));g.stroke();
 g.strokeStyle=C.cy;g.beginPath();for(let x=0;x<=16.01;x+=.05){const v=Math.pow(2,x);if(v>m*17)break;x?g.lineTo(OX(x),OY(v,m)):g.moveTo(OX(x),OY(v,m))}g.stroke();
 text(g,`y = ${m}x`,OX(6),OY(m*6,m)-16,12,900,'right',C.or);text(g,'y = 2^x',OX(1),OY(m*17,m)+12,12,900,'left',C.cy);
 g.strokeStyle=C.ac;g.setLineDash([5,4]);g.lineWidth=2;g.beginPath();g.moveTo(OX(S.x),OY(0,m));g.lineTo(OX(S.x),OY(m*17,m));g.stroke();g.setLineDash([]);
 g.fillStyle=C.or;g.beginPath();g.arc(OX(S.x),OY(m*S.x,m),7,0,7);g.fill();g.fillStyle=C.cy;g.beginPath();g.arc(OX(S.x),OY(Math.pow(2,S.x),m),7,0,7);g.fill();
 text(g,S.won<3?`y = ${m}x vs y = 2^x: where does the curve overtake?`:'Slopes 10, 100, 1000: overtaken at x = 6, 10, 14.',A.W/2,A.H*.06,12,900);
 text(g,`x = ${S.x}:  ${m*S.x} vs ${Math.pow(2,S.x)}`,A.W/2,A.H*.13,13,900,'center',C.cy)}

/* step 5: minus 10 each step vs halve each step */
function stepDecay(){if(stage()!=='decay'||S.won)return;if(S.n>=8)return;S.n++;A.sound.tick();const L=80-10*S.n,E=80/Math.pow(2,S.n);
 say(`Step ${S.n}: minus 10 gives ${L}, halving gives ${fmt(E)}.`);
 if(S.n===8){S.won=1;A.sound.pop();say('Step 8: minus 10 hits 0. Halving is at 0.31 and never reaches 0.');S.want()}keys();A.redraw()}
function drawDecay(g){const C=A.col,base=A.H*.82,top=A.H*.18,h=v=>v/80*(base-top),w=Math.min(60,A.W*.12);
 [[80-10*S.n,C.or,'− 10 each step',A.W*.3],[80/Math.pow(2,S.n),C.cy,'× ½ each step',A.W*.7]].forEach(([v,col,lab,x])=>{g.fillStyle=col;g.fillRect(x-w/2,base-h(v),w,h(v));g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(x-w/2,base-h(80),w,h(80));
  text(g,fmt(v),x,base-h(v)-14,15,900);text(g,lab,x,base+16,12,800)});
 text(g,`Step ${S.n} of 8: start at 80`,A.W/2,A.H*.07,13,900);text(g,'Tap to take a step',A.W/2,A.H*.95,11,700,'center',C.mu)}

function draw(A){const{ctx:g,W,H,col:C}=A,v=stage();g.fillStyle=A.mix(C.pn,'#ecfeff',C.dark?.04:.3);g.fillRect(0,0,W,H);
 if(v==='quiz'){text(g,'Linear: same difference, + d',W/2,H*.38,18,900,'center',C.or);text(g,'Exponential: same factor, × b',W/2,H*.58,18,900,'center',C.cy);return}
 ({table:drawTable,sort:drawSort,race:drawRace,over:drawOver,decay:drawDecay})[v](g);A.fx.draw(g)}
function keys(){if(!ctl)return;ctl.innerHTML='';const v=stage(),B=(t,fn,label)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':label||null},ctl,t);b.onclick=fn};
 if(v==='table'&&S.won<4){B('Show all gaps',()=>[0,1,2,3].forEach(openGap));B('Linear',()=>classify('lin'));B('Exponential',()=>classify('exp'));B('Neither',()=>classify('none'))}
 if(v==='sort'&&S.won<6){B('Linear',()=>sortInto(0));B('Exponential',()=>sortInto(1))}
 if(v==='race'){B('◀ Day',()=>setDay(S.day-1),'One day back');B('Day ▶',()=>setDay(S.day+1),'One day on')}
 if(v==='over'&&S.won<3){B('◀ x − 1',()=>setX(S.x-1),'x minus 1');B('x + 1 ▶',()=>setX(S.x+1),'x plus 1')}
 if(v==='decay'&&!S.won)B('Take a step',stepDecay)}
function down(p){const v=stage();
 if(v==='table'){const k=[0,1,2,3].find(k=>hit(p,gapRect(k)));if(k!=null)openGap(k);const i=[0,1,2].find(i=>hit(p,kindRect(i)));if(i!=null)classify(KINDS[i]);return false}
 if(v==='sort'){if(S.won>=6)return false;const b=bins().findIndex(r=>hit(p,r));if(b>=0){sortInto(b);return false}if(hit(p,cardRect())){S.grab=1;return true}return false}
 if(v==='race'||v==='over'){S.grab=1;move(p);return true}
 if(v==='decay'){stepDecay();return false}return false}
function move(p){if(!S.grab)return;const v=stage();if(v==='race')return setDay(dayAt(p.x));if(v==='over')return setX(xAt(p.x));if(v==='sort'){S.cx=p.x;S.cy=p.y;A.redraw()}}
function up(p){const was=S.grab;S.grab=0;if(stage()==='sort'&&was){const b=p&&bins().findIndex(r=>hit(p,r));if(b>=0)sortInto(b);else{S.cx=S.cy=null;A.redraw()}}}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const steps=[
{h:'Differences or ratios?',p:'Linear change adds the same amount each step; exponential change multiplies by the same factor. Tap the gaps to see both, then decide.',
 predict:{q:'100, 90, 81, 72.9 … falls each step. What kind of change is it?',opts:['Linear: it goes down steadily','Exponential: × 0.9 each step','Neither'],ans:1},task:'Sort 4 tables',
 show:()=>{steps[0].go();play(TABLES.map(t=>()=>{[0,1,2,3].forEach(openGap);classify(t.kind)}),1100)},go:()=>{fresh();keys();say('Table 1: 5, 8, 11, 14, 17. Tap the gaps.');S.want=ready(0,()=>S.won>=4,'Equal differences: linear. Equal ratios: exponential.')}},
{h:'Fixed amount or fixed percent?',p:'Same amount each step: linear. Same percentage of the current value: exponential. Drag each card into a box.',
 predict:{q:'A phone loses 4% of a full charge every hour. Linear or exponential?',opts:['Exponential: it is a percentage','Linear: the same amount each hour'],ans:1},task:'Sort 6 situations',
 show:()=>{steps[1].go();play(SITS.map(s=>()=>sortInto(s[1]==='exp'?1:0)),800)},go:()=>{fresh();keys();say(SITS[0][0]);S.want=ready(1,()=>S.won>=6,'Percent of a fixed amount: linear; of the current value: exponential.')}},
{h:'£100 a day or 1p doubled?',p:'Plan A pays £100 a day. Plan B pays 1p, then 2p, 4p … doubling daily. Drag along the graph to compare running totals.',
 predict:{q:'Over 30 days, which plan pays more in total?',opts:['£100 a day: it starts far ahead','1p doubled each day','About the same'],ans:1},task:'Find the first day Plan B is ahead',
 show:()=>{steps[2].go();play([5,10,15,17,18].map(d=>()=>setDay(d)),550)},go:()=>{fresh();keys();say('Day 0: both totals are £0. Drag along the graph.');S.want=ready(2,()=>S.won>=1,'Plan B passes Plan A on day 18, then leaves it far behind.')}},
{h:'Any line gets overtaken',p:'y = mx adds m each step; y = 2^x doubles. Move the probe to the first x where the curve is above the line.',
 predict:{q:'Make the line 10 times steeper. The curve…',opts:['never catches it now','catches it only a few steps later','takes 10 times as long to catch it'],ans:1},task:'Find 3 overtaking points',
 show:()=>{steps[3].go();const seq=[];SLOPES.forEach(m=>{const k=cross(m);seq.push(()=>setX(k-1),()=>setX(k),()=>0,()=>0,()=>0)});play(seq,300)},
 go:()=>{fresh();keys();say('Line y = 10x and curve y = 2^x at x = 1: 10 vs 2.');S.want=ready(3,()=>S.won>=3,'Doubling beats adding in the end, however much is added.')}},
{h:'Decay to zero?',p:'Both start at 80. One takes 10 away each step; one halves. Which reaches zero?',
 predict:{q:'Keep halving 80. Does it ever reach 0?',opts:['Yes, after 8 halvings','No: it gets closer to 0 but never reaches it','Yes, after 80 halvings'],ans:1},task:'Take 8 steps',
 show:()=>{steps[4].go();play([...Array(8)].map(()=>stepDecay),280)},go:()=>{fresh();keys();say('Both start at 80. Take a step.');S.want=ready(4,()=>S.won>=1,'Linear decay hits zero; exponential decay only gets closer.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
const QS=[['A table goes 7, 12, 17, 22. What kind of change is it?',[['Linear: + 5 each step','ok'],['Exponential: it keeps growing','grow'],['Neither','neither']]],
 ['A town’s population grows 3% a year. What kind of change is it?',[['Exponential: × 1.03 a year','ok'],['Linear: + 3 a year','pctlin'],['Linear: + 3% of year 1, every year','first']]],
 ['y = 500x or y = 2^x: which is bigger for very large x?',[['2^x','ok'],['500x: 500 is far bigger than 2','coef'],['They stay level','level']]],
 ['A table goes 2, 6, 18, 54. What is the next value?',[['162','ok'],['90','adddiff'],['72','addlast']]],
 ['A ball keeps 60% of its height each bounce. Does the height ever reach 0 in this model?',[['No: × 0.6 never gives 0','ok'],['Yes, after a few bounces','zero'],['Yes, it loses 40 cm a bounce','fixed']]]];
function why(t){let m='Equal differences: linear. Equal ratios: exponential.';
 if(t==='grow')m='Growing is not enough: + 5 each time is linear.';if(t==='neither')m='Every gap is + 5: linear.';
 if(t==='pctlin')m='3% of a growing population grows each year: × 1.03, exponential.';
 if(t==='first')m='It is 3% of the CURRENT value, not the first year: exponential.';
 if(t==='coef')m='500x adds 500 a step; 2^x doubles. By x = 13, 8192 beats 6500.';if(t==='level')m='2^x doubles while 500x adds the same, so the gap grows.';
 if(t==='adddiff')m='Gaps 4, 12, 36 are not equal. It is × 3: 54 × 3 = 162.';if(t==='addlast')m='Adding 18 treats it as linear. It is × 3: 162.';
 if(t==='zero')m='× 0.6 always leaves 60% of something, so it never reaches 0.';if(t==='fixed')m='It loses 40% of the CURRENT height, less each bounce: × 0.6.';return m}
function ask(){qk++;const[q,ops]=QS[qk%QS.length],r=qk%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>grade(t)});say('Challenge: '+q);A.redraw()}
let streak=0;
function grade(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Correct.':'✗ '+why(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;ctl.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});keys()}});
A.start()})})();
