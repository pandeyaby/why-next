/* Flagship – graphs of sinh, cosh and tanh (ages 17–18): plot cosh by dragging five points to their heights and see a
   U with lowest point (0, 1) that grows faster than the parabola 1 + x²/2; name four mystery curves (sinh, cosh, tanh and
   the impostor ½eˣ) from their features; scrub far out and watch sinh and cosh close in on ½eˣ because cosh − sinh = e⁻ˣ;
   drag the horizontal asymptotes of tanh to y = ±1; stretch and shift a·f(x) + b to hit three targets; sort ranges and
   features into the right function; then a challenge on minimum points, symmetry, asymptotes and ranges. */
(()=>{const E=Math.exp,cosh=x=>(E(x)+E(-x))/2,sinh=x=>(E(x)-E(-x))/2,tanh=x=>sinh(x)/cosh(x),half=x=>E(x)/2;
const r1=v=>{const s=(Math.round(v*100)/100).toString();return s.replace('-','−')};
const PX=[-2,-1,0,1,2];
const NAMES=['sinh x','cosh x','tanh x','½eˣ'],FN=[sinh,cosh,tanh,half];
const MYST=[2,0,3,1];
const FEAT=['passes through the origin, odd, rising with no asymptotes','is even with a minimum at (0, 1)','is odd and trapped between y = −1 and y = 1','is never negative, has y-intercept ½ and tends to 0 on the left'];
const TGT=[[1,2,-1,'y = 2 cosh x − 1'],[2,3,0,'y = 3 tanh x'],[0,1,2,'y = sinh x + 2']];
const CARDS=[['range y ≥ 1',1],['range: all real y',0],['range −1 < y < 1',2],['minimum point (0, 1)',1],['asymptotes y = ±1',2],['odd, no asymptotes, through O',0]];
VIS.reg('flaghgraph',c=>{let A,ctl,chal,qn=-1,streak=0;
const S={tok:0,cb:()=>{},ys:[0,0,0,0,0],pick:2,grab:-1,mi:0,named:0,miss:-1,x:1,far:{},line:2,lineOk:false,ti:0,a:1,b:0,hit:0,ci:0,sorted:0,wrong:-1};
const kind=()=>['plot','name','far','asym','fit','sort','quiz'][A.step];
const sz=v=>Math.round(v*(A.narrow?1.04:1.2));
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
function label(g,t,x,y,v,col,w,al){g.font=`${w||700} ${sz(v)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W*.96)}
const WIN={plot:[-2.6,2.6,-.4,4.4],name:[-3,3,-3,3],far:[-4,4,-6,6],asym:[-4.5,4.5,-2.5,2.5],fit:[-3,3,-4,6]};
function frame(){const[a,b,lo,hi]=WIN[kind()]||WIN.name,top=sz(24),L=14,R=A.W-10,T=top,B=A.H-(A.narrow?sz(30):sz(22));
 return{a,b,lo,hi,L,R,T,B,X:x=>L+(x-a)/(b-a)*(R-L),Y:y=>B-(y-lo)/(hi-lo)*(B-T),inv:(px,py)=>[a+(px-L)/(R-L)*(b-a),lo+(B-py)/(B-T)*(hi-lo)]}}
function axes(g,F){const C=A.col;g.fillStyle=A.alpha(C.mu,.07);A.paint.rrect(F.L-6,F.T-4,F.R-F.L+12,F.B-F.T+8,8);g.fill();g.strokeStyle=A.alpha(C.tx,.55);g.lineWidth=1.2;g.beginPath();
 g.moveTo(F.L,F.Y(0));g.lineTo(F.R,F.Y(0));g.moveTo(F.X(0),F.T);g.lineTo(F.X(0),F.B);g.stroke();
 for(let k=Math.ceil(F.a);k<=F.b;k++)if(k)label(g,r1(k),F.X(k),F.Y(0)+9,9,C.tx,600);
 const st=F.hi-F.lo>6?2:1;for(let k=Math.ceil(F.lo);k<=F.hi;k++)if(k&&k%st===0)label(g,r1(k),F.X(0)-9,F.Y(k),9,C.tx,600)}
function plot(g,F,f,col,lw,dash){g.save();g.beginPath();g.rect(F.L,F.T,F.R-F.L,F.B-F.T);g.clip();g.strokeStyle=col;g.lineWidth=lw||3;g.setLineDash(dash||[]);g.beginPath();
 for(let i=0,first=1;i<=200;i++){const x=F.a+(F.b-F.a)*i/200,y=f(x);if(!isFinite(y))continue;first?g.moveTo(F.X(x),F.Y(y)):g.lineTo(F.X(x),F.Y(y));first=0}g.stroke();g.restore()}
function blob(g,x,y,col,r){g.beginPath();g.arc(x,y,r,0,7);g.fillStyle=col;g.fill();g.lineWidth=2;g.strokeStyle=A.col.tx;g.stroke()}
const locked=i=>Math.abs(S.ys[i]-cosh(PX[i]))<.16;
const binBox=k=>{const w=(A.W-28)/3;return{x:8+k*(w+6),y:A.H*.5,w,h:A.H*.4}};
const has=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.3);g.fillRect(0,0,W,H);const foot=H-sz(12);
 if(k==='quiz'){label(g,'sinh: odd, all real y',W/2,H*.3,14);label(g,'cosh: even, minimum (0, 1)',W/2,H*.48,14);label(g,'tanh: odd, −1 < y < 1',W/2,H*.66,14);return}
 if(k==='sort'){if(S.ci>=CARDS.length){label(g,'All six sorted!',W/2,H*.3,17,C.tx,800)}else{const r={x:W*.08,y:H*.08,w:W*.84,h:H*.28};g.fillStyle=A.alpha(S.wrong>=0?C.rd:C.vi,.14);A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();
   g.strokeStyle=S.wrong>=0?C.rd:C.tx;g.lineWidth=S.wrong>=0?3:2;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.stroke();label(g,CARDS[S.ci][0],W/2,r.y+r.h/2,15,C.tx,800)}
  NAMES.slice(0,3).forEach((n,i)=>{const b=binBox(i),f=FN[i];g.fillStyle=A.alpha(C.cy,.1);A.paint.rrect(b.x,b.y,b.w,b.h,10);g.fill();g.strokeStyle=C.tx;g.lineWidth=1.6;A.paint.rrect(b.x,b.y,b.w,b.h,10);g.stroke();
   label(g,n,b.x+b.w/2,b.y+sz(14),13,C.tx,800);g.save();g.strokeStyle=C.gr;g.lineWidth=2.5;g.beginPath();for(let j=0;j<=40;j++){const x=-1.8+3.6*j/40,y=f(x);
    const px=b.x+8+(b.w-16)*j/40,py=b.y+b.h*.62-y*b.h*.08;j?g.lineTo(px,py):g.moveTo(px,py)}g.stroke();g.restore()});
  label(g,`Sorted: ${Math.min(S.sorted,6)} of 6`,W/2,foot,11,C.tx,600);return}
 const F=frame();axes(g,F);
 if(k==='plot'){const all=S.ys.every((_,i)=>locked(i));if(all){plot(g,F,x=>1+x*x/2,A.alpha(C.or,.9),2,[6,5]);plot(g,F,cosh,C.gr,3.2)}
  S.ys.forEach((y,i)=>{const on=locked(i);g.strokeStyle=A.alpha(C.tx,.3);g.lineWidth=1;g.beginPath();g.moveTo(F.X(PX[i]),F.T);g.lineTo(F.X(PX[i]),F.B);g.stroke();blob(g,F.X(PX[i]),F.Y(y),on?C.gr:i===S.pick?C.vi:C.cy,i===S.pick?10:8)});
  label(g,all?'cosh x (green) vs 1 + x²/2 (dashed)':`Point x = ${r1(PX[S.pick])}: height ${r1(S.ys[S.pick])}`,W/2,sz(11),12,C.tx,800);label(g,`Placed: ${S.ys.filter((_,i)=>locked(i)).length} of 5`,W/2,foot,11,C.tx,600)}
 if(k==='name'){if(S.named<4){plot(g,F,FN[MYST[S.mi]],S.miss>=0?C.rd:C.vi,3.4);label(g,'Mystery curve '+(S.named+1)+' of 4: which is it?',W/2,sz(11),12,C.tx,800)}else label(g,'All four named!',W/2,sz(11),13,C.tx,800);label(g,`Named: ${S.named} of 4`,W/2,foot,11,C.tx,600)}
 if(k==='far'){plot(g,F,half,A.alpha(C.tx,.6),1.6,[6,5]);plot(g,F,x=>-E(-x)/2,A.alpha(C.tx,.6),1.6,[2,4]);plot(g,F,cosh,C.gr,3);plot(g,F,sinh,C.cy,3);const x=S.x;
  g.save();g.beginPath();g.rect(F.L,F.T,F.R-F.L,F.B-F.T);g.clip();g.strokeStyle=C.or;g.lineWidth=3;g.beginPath();g.moveTo(F.X(x),F.Y(sinh(x)));g.lineTo(F.X(x),F.Y(cosh(x)));g.stroke();g.restore();blob(g,F.X(x),F.Y(cosh(x)),C.gr,7);blob(g,F.X(x),F.Y(sinh(x)),C.cy,7);
  label(g,`x = ${r1(x)}: cosh − sinh = e⁻ˣ = ${r1(E(-x))}`,W/2,sz(11),12,C.tx,800);label(g,'green cosh, blue sinh, dashed ±½e^(±x)',W/2,foot,10,C.tx,600)}
 if(k==='asym'){plot(g,F,tanh,C.gr,3.2);const y=S.line;[y,-y].forEach(v=>{g.strokeStyle=S.lineOk?C.gr:C.or;g.lineWidth=2.5;g.setLineDash([8,6]);g.beginPath();g.moveTo(F.L,F.Y(v));g.lineTo(F.R,F.Y(v));g.stroke();g.setLineDash([])});
  blob(g,F.R-14,F.Y(y),C.or,9);label(g,`Asymptotes at y = ±${r1(y)}`,W/2,sz(11),12,C.tx,800);label(g,'Drag the orange handle up or down',W/2,foot,11,C.tx,600)}
 if(k==='fit'){if(S.hit<3){const[f,a,b,name]=TGT[S.ti];plot(g,F,x=>a*FN[f](x)+b,A.alpha(C.tx,.55),5,[3,6]);plot(g,F,x=>S.a*FN[f](x)+S.b,C.vi,3);
   label(g,`Target ${name}   You: y = ${S.a===1?'':S.a+' '}${NAMES[f]}${S.b?(S.b>0?' + ':' − ')+Math.abs(S.b):''}`.replace(/  +/g,' '),W/2,sz(11),12,C.tx,800)}else label(g,'All three matched!',W/2,sz(11),13,C.tx,800);
  label(g,`Matched: ${S.hit} of 3`,W/2,foot,11,C.tx,600)}
 A.fx&&A.fx.draw(g)}
const good=t=>{A.sound.pop();say(t);S.cb();A.redraw()};
function nudge(i,dy){S.pick=i;S.ys[i]=Math.max(0,Math.min(4.2,Math.round((S.ys[i]+dy)*10)/10));setY(i,S.ys[i])}
function setY(i,y){y=Math.max(0,Math.min(4.2,y));const t=cosh(PX[i]);if(Math.abs(y-t)<.16)y=t;S.ys[i]=y;A.sound.tick();
 say(locked(i)?`x = ${r1(PX[i])}: cosh is ${r1(t)}. Placed.`:`x = ${r1(PX[i])}: ${r1(y)} is ${y<t?'too low':'too high'}. Use (eˣ + e⁻ˣ)/2.`);S.cb();A.redraw()}
function nameIt(n){if(S.named>=4)return;const f=MYST[S.mi];if(n===f){S.named++;S.miss=-1;const was=NAMES[f];if(S.named<4)S.mi=S.named;good(`Yes, ${was}: it ${FEAT[f]}.`);return}
 S.miss=n;A.sound.miss();say(`Not ${NAMES[n]}: ${NAMES[n]} ${FEAT[n]}. Look at this curve's y-intercept and symmetry.`);A.redraw()}
function scrub(x){x=Math.max(-3.9,Math.min(3.9,Math.round(x*10)/10));S.x=x;if(x>=3)S.far.r=1;if(x<=-3)S.far.l=1;
 say(x>=3?`x = ${r1(x)}: sinh and cosh are both about ½eˣ = ${r1(half(x))}; the gap e⁻ˣ is only ${r1(E(-x))}.`:x<=-3?`x = ${r1(x)}: cosh ≈ ½e⁻ˣ but sinh ≈ −½e⁻ˣ, mirror images.`:`x = ${r1(x)}: gap e⁻ˣ = ${r1(E(-x))}.`);S.cb();A.redraw()}
function setLine(y){y=Math.max(.2,Math.min(2.4,Math.round(y*10)/10));if(Math.abs(y-1)<.08)y=1;S.line=y;S.lineOk=y===1;A.sound.tick();
 say(S.lineOk?'y = ±1: tanh gets ever closer but never reaches them.':y<1?`y = ±${r1(y)} is too low: tanh 2 = 0.96 already crosses it.`:`y = ±${r1(y)} is too high: |sinh x| < cosh x, so |tanh x| < 1.`);S.cb();A.redraw()}
function tweak(da,db){if(S.hit>=3)return;S.a=Math.max(1,Math.min(4,S.a+da));S.b=Math.max(-3,Math.min(3,S.b+db));A.sound.tick();const[f,a,b,name]=TGT[S.ti];
 if(S.a===a&&S.b===b){S.hit++;const was=name;if(S.hit<3){S.ti=S.hit;S.a=1;S.b=0}good(`${was} matched. `+[`Minimum (0, ${a+b}): a stretches the 1, then b shifts it.`,`Asymptotes y = ±${a}: the stretch moves them too.`,`Centre (0, ${b}): the shift lifts the origin point.`][S.hit-1]);keyset();return}
 say(f===1?`Minimum now at (0, ${S.a+S.b}). Target ${name}.`:f===2?`Asymptotes now y = ${S.b-S.a} and y = ${S.b+S.a}. Target ${name}.`:`Curve passes through (0, ${S.b}). Target ${name}.`);A.redraw()}
function binIt(k){if(S.ci>=CARDS.length)return;const[t,ans]=CARDS[S.ci];if(k===ans){S.ci++;S.sorted++;S.wrong=-1;good(`${t}: ${NAMES[ans]}.`);return}
 S.wrong=k;A.sound.miss();say(`${t} does not fit ${NAMES[k]}: ${NAMES[k]} ${FEAT[k]}.`);A.redraw()}
function keyset(){if(!ctl)return;ctl.innerHTML='';const k=kind(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost sm','aria-label':l||null},ctl,t);b.onclick=f};
 if(k==='plot'){PX.forEach((x,i)=>B('x = '+r1(x),()=>{S.pick=i;say(`Point x = ${r1(x)} selected.`);A.redraw()},'Select point x = '+r1(x)));B('▲ +0.5',()=>nudge(S.pick,.5),'Raise point 0.5');B('▲ +0.1',()=>nudge(S.pick,.1),'Raise point 0.1');B('▼ −0.1',()=>nudge(S.pick,-.1),'Lower point 0.1');B('▼ −0.5',()=>nudge(S.pick,-.5),'Lower point 0.5')}
 if(k==='name'&&S.named<4)NAMES.forEach((n,i)=>B(n,()=>nameIt(i),'It is '+n));
 if(k==='far')[-3.5,-2,0,2,3.5].forEach(x=>B('x = '+r1(x),()=>scrub(x)));
 if(k==='asym')[.5,1,1.5,2].forEach(y=>B('y = ±'+y,()=>setLine(y),'Asymptotes at y = plus or minus '+y));
 if(k==='fit'&&S.hit<3){B('a − 1',()=>tweak(-1,0),'Decrease the stretch a');B('a + 1',()=>tweak(1,0),'Increase the stretch a');B('b − 1',()=>tweak(0,-1),'Shift down by 1');B('b + 1',()=>tweak(0,1),'Shift up by 1')}
 if(k==='sort'&&S.ci<CARDS.length)NAMES.slice(0,3).forEach((n,i)=>B(n,()=>binIt(i),'Sort into '+n))}
function down(p){const k=kind();if(k==='sort'){for(let i=0;i<3;i++)if(has(p,binBox(i))){binIt(i);return false}return false}
 if(k==='quiz'||k==='name'||k==='fit')return false;const F=frame(),[x,y]=F.inv(p.x,p.y);
 if(k==='plot'){let best=0;PX.forEach((v,i)=>{if(Math.abs(v-x)<Math.abs(PX[best]-x))best=i});S.pick=best;S.grab=best;setY(best,y);return true}
 if(k==='far'){S.grab=1;scrub(x);return true}if(k==='asym'){S.grab=1;setLine(Math.abs(y));return true}return false}
function move(p){if(S.grab<0)return;const F=frame(),[x,y]=F.inv(p.x,p.y),k=kind();if(k==='plot')setY(S.grab,y);if(k==='far')scrub(x);if(k==='asym')setLine(Math.abs(y))}
function up(){S.grab=-1}
const finish=(i,test,msg)=>()=>{if(A.step===i&&test()&&(!steps[i].predict||A.pred[i]!=null))A.done(msg+A.reveal(i))};
const play=(fs,ms)=>{const t=++S.tok;fs.forEach((f,j)=>setTimeout(()=>{if(t===S.tok)f()},A.reduced()?j*20+20:(j+1)*ms))};
const reset=()=>{S.tok++;Object.assign(S,{cb:()=>{},ys:[0,0,0,0,0],pick:2,grab:-1,mi:0,named:0,miss:-1,x:1,far:{},line:2,lineOk:false,ti:0,a:1,b:0,hit:0,ci:0,sorted:0,wrong:-1})};
const steps=[
{h:'Plot cosh by points',p:'Drag each point to its height y = cosh x, or select it and use the arrows. Work out (eˣ + e⁻ˣ)/2 at x = 0, ±1, ±2.',
 predict:{q:'Where is the lowest point of y = cosh x?',opts:['(0, 0)','(0, 1)','It has none'],ans:1},task:'Place all 5 points',
 show:()=>{steps[0].go();play(PX.map((x,i)=>()=>setY(i,cosh(x))),450)},go:()=>{reset();say('Drag the points to their cosh heights.');keyset();S.cb=finish(0,()=>S.ys.every((_,i)=>locked(i)),'A U shape with minimum (0, 1), even, so the y-axis is a line of symmetry. It looks like 1 + x²/2 near 0 but climbs much faster, like ½e^|x|.')}},
{h:'Name the curve',p:'Each curve is sinh x, cosh x, tanh x or ½eˣ. Use the y-intercept, symmetry and asymptotes.',task:'Name all 4 curves',
 show:()=>{steps[1].go();play(MYST.map(f=>()=>nameIt(f)),700)},go:()=>{reset();say('Mystery curve 1: which function is it?');keyset();S.cb=finish(1,()=>S.named>=4,'Check three features: where it meets the y-axis, odd or even, and any horizontal asymptotes.')}},
{h:'Far out: ½eˣ',p:'cosh x − sinh x = e⁻ˣ. Scrub x far to the right, then far to the left, and watch the orange gap.',
 predict:{q:'For large positive x, sinh x and cosh x…',opts:['get further apart','get closer together','cross over'],ans:1},task:'Visit x ≥ 3 and x ≤ −3',
 show:()=>{steps[2].go();play([()=>scrub(3.5),()=>scrub(-3.5)],800)},go:()=>{reset();say('Drag across the graph to move x.');keyset();S.cb=finish(2,()=>S.far.r&&S.far.l,'As x → ∞ both curves hug ½eˣ. As x → −∞, cosh ≈ ½e⁻ˣ and sinh ≈ −½e⁻ˣ.')}},
{h:'Asymptotes of tanh',p:'tanh x = sinh x / cosh x. Drag the dashed lines to where the curve levels off.',
 predict:{q:'Does y = tanh x ever reach y = 1?',opts:['Yes, for large x','No, never'],ans:1},task:'Set the asymptotes',
 show:()=>{steps[3].go();play([()=>setLine(1.6),()=>setLine(.6),()=>setLine(1)],600)},go:()=>{reset();say('Drag the orange handle.');keyset();S.cb=finish(3,()=>S.lineOk,'Horizontal asymptotes y = 1 and y = −1. tanh passes through (0, 0) with gradient 1 there.')}},
{h:'Stretch and shift',p:'y = a·f(x) + b. a stretches the graph vertically and b moves it up or down. Match each dotted target.',
 predict:{q:'Where is the minimum of y = 2 cosh x − 1?',opts:['(0, 1)','(0, 2)','(0, −1)'],ans:0},task:'Match all 3 targets',
 show:()=>{steps[4].go();play([()=>tweak(1,0),()=>tweak(0,-1),()=>tweak(1,0),()=>tweak(1,0),()=>tweak(0,1),()=>tweak(0,1)],520)},go:()=>{reset();say('Target y = 2 cosh x − 1. Change a and b.');keyset();S.cb=finish(4,()=>S.hit>=3,'Track key points: the minimum (0, 1) of cosh moves to (0, a + b); the asymptotes ±1 of tanh move to b ± a.')}},
{h:'Ranges and features',p:'Tap the box, or a button, for the function each card describes.',task:'Sort all 6 cards',
 show:()=>{steps[5].go();play(CARDS.map(cd=>()=>binIt(cd[1])),450)},go:()=>{reset();say('Card: '+CARDS[0][0]+'. Which function?');keyset();S.cb=finish(5,()=>S.ci>=CARDS.length,'Domains are all real x. Ranges: sinh all real y, cosh y ≥ 1, tanh −1 < y < 1.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.cb()});
const QS=[['The range of y = cosh x is…',[['y ≥ 1','ok'],['y ≥ 0','zero'],['all real y','all']]],
 ['Which graph has the y-axis as a line of symmetry?',[['y = cosh x','ok'],['y = sinh x','oddc'],['y = tanh x','oddt']]],
 ['The horizontal asymptotes of y = tanh x are…',[['y = 1 and y = −1','ok'],['y = 0 only','zero2'],['none','none']]],
 ['y = 3 cosh x + 2 has minimum point…',[['(0, 5)','ok'],['(0, 2)','nost'],['(0, 3)','nob']]],
 ['For large positive x, sinh x is close to…',[['½eˣ','ok'],['eˣ','nohalf'],['1','tanhy']]],
 ['How many solutions has sinh x = k for any real k?',[['Exactly one','ok'],['Two','two'],['None if k < 0','neg']]]];
function why(t){let m='Picture the three graphs and check the key points.';
 if(t==='zero')m='cosh never gets below its minimum cosh 0 = 1, so y ≥ 1, not y ≥ 0.';
 if(t==='all')m='All real y is the range of sinh. cosh is a U with lowest value 1.';
 if(t==='oddc')m='sinh is odd: its graph has rotational symmetry about the origin, not a mirror line.';
 if(t==='oddt')m='tanh is odd too, symmetric about the origin. Only cosh is even.';
 if(t==='zero2')m='y = 0 is the asymptote of e⁻ˣ on the right. tanh levels off at y = 1 and y = −1.';
 if(t==='none')m='tanh is bounded: sinh/cosh tends to 1 as x → ∞ and −1 as x → −∞.';
 if(t==='nost')m='The stretch acts first: 3 × cosh 0 = 3, then + 2 gives 5.';
 if(t==='nob')m='You stretched but forgot the shift: 3 × 1 + 2 = 5.';
 if(t==='nohalf')m='sinh x = (eˣ − e⁻ˣ)/2, and e⁻ˣ → 0, so it is about ½eˣ, not eˣ.';
 if(t==='tanhy')m='1 is where tanh x heads. sinh keeps growing like ½eˣ.';
 if(t==='two')m='Two solutions happen for cosh x = k with k > 1. sinh is always increasing, so it hits each value once.';
 if(t==='neg')m='sinh takes every real value, negative ones too: sinh x = −2 has one solution.';
 return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});say('Challenge: '+q);A.redraw()}
function mark(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Correct. Streak: ${streak}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;keyset()},
 init:A=>{const el=c.el,w=el('div',{class:'fl-below'},A.below);ctl=el('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});keyset()}});
A.start()})})();
