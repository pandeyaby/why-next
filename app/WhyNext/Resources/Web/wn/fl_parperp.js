/* Flagship: Parallel and perpendicular lines (ages 7–8; NC Y3 Geometry: identify horizontal and vertical lines and
   pairs of perpendicular and parallel lines; CCSS 4.G.1). Turn lines to flat, upright, parallel (same gap, dashed
   extensions show where tilted lines meet) and square-cornered; pick true parallel pairs; sort letters; draw both on a
   dot grid. Distinct from flagangle (single angles) and flagsym (folding): this is about how a PAIR of lines sits. */
(()=>{
const RAD=Math.PI/180,cs=a=>Math.cos(a*RAD),sn=a=>Math.sin(a*RAD),tn=a=>Math.tan(a*RAD),mod=(a,m)=>((a%m)+m)%m;
// letter strokes [x0,y0,x1,y1] in a 0..1 box, then its kind
const LETTERS=[['T',[[.1,.1,.9,.1],[.5,.1,.5,.9]],'perp'],['Z',[[.15,.1,.85,.1],[.85,.1,.15,.9],[.15,.9,.85,.9]],'par'],
 ['H',[[.2,.1,.2,.9],[.8,.1,.8,.9],[.2,.5,.8,.5]],'both'],['V',[[.15,.1,.5,.9],[.85,.1,.5,.9]],'none'],['N',[[.2,.9,.2,.1],[.2,.1,.8,.9],[.8,.9,.8,.1]],'par']];
const KIND={par:'parallel only',perp:'perpendicular only',both:'both',none:'neither'};
// look-alike pairs: angles, lengths, parallel?
const PAIRS=[{a:40,b:40,la:.8,lb:.45,ok:true,why:'Same tilt, so the gap stays the same. Length does not matter.'},
 {a:0,b:9,la:.8,lb:.8,ok:false,why:'These tilt towards each other. Make them longer and they meet, so they are not parallel.'},
 {a:90,b:90,la:.5,lb:.85,ok:true,why:'Both go straight up, so the gap stays the same.'},
 {a:62,b:118,la:.75,lb:.75,ok:false,why:'These lean towards each other and meet at the top, so they are not parallel.'}];
// dot grid: A goes 2 right, 1 up; B starts at (2,6)
const GA=[1,3,5,1],B0=[2,6],GC=10,GR=7;
VIS.reg('flagparperp',c=>{let A,keys,qa,turn=-1;const R={};
const voice=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const part=()=>['hv','par','pairs','perp','letters','grid','quiz'][A.step];
function ink(s,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(s,x,y,o.max||A.W-12)}
function start(o){for(const k in R)delete R[k];Object.assign(R,{ang:30,seen:{},drag:false,picked:{},li:0,lmsg:'',end:[...B0],got:{},msg:'',hook:()=>{}},o||{});A.redraw()}
function dot(g,x,y,r,c2){g.fillStyle=c2;g.beginPath();g.arc(x,y,r,0,7);g.fill()}
function seg(g,x,y,ang,len,col,w,dash){const dx=cs(ang)*len/2,dy=-sn(ang)*len/2;g.strokeStyle=col;g.lineWidth=w;g.setLineDash(dash||[]);g.beginPath();g.moveTo(x-dx,y-dy);g.lineTo(x+dx,y+dy);g.stroke();g.setLineDash([])}
function square(g,x,y,a,s,col){// right-angle mark in the corner between directions a and a+90
 const u=[cs(a),-sn(a)],v=[cs((a+90)),-sn((a+90))];g.strokeStyle=col;g.lineWidth=2.5;g.beginPath();g.moveTo(x+u[0]*s,y+u[1]*s);g.lineTo(x+u[0]*s+v[0]*s,y+u[1]*s+v[1]*s);g.lineTo(x+v[0]*s,y+v[1]*s);g.stroke()}
// ---------- pictures ----------
const hs=()=>A.narrow?15:18,hvName=a=>mod(a,180)===0?'horizontal':mod(a,180)===90?'vertical':'slanted';
function drawHV(g){const{W,H,col:C}=A,cx=W/2,cy=H*.5,L=Math.min(W*.62,H*.62);
 g.fillStyle=A.alpha(C.gr,.18);g.fillRect(0,H*.86,W,H*.14);g.strokeStyle=C.gr;g.lineWidth=2;g.beginPath();g.moveTo(0,H*.86);g.lineTo(W,H*.86);g.stroke();ink('flat ground',W*.12,H*.93,12,{c:C.tx,w:600,al:'left'});
 // a plumb line: a weight on a string always hangs vertically
 const sx=W*.88;g.strokeStyle=C.mu;g.lineWidth=1.5;g.beginPath();g.moveTo(sx,H*.2);g.lineTo(sx,H*.62);g.stroke();dot(g,sx,H*.64,7,C.mu);ink('string',sx,H*.71,12,{c:C.mu,w:600});ink('hanging',sx,H*.76,12,{c:C.mu,w:600})
 const n=hvName(R.ang),col=n==='slanted'?C.ac:C.gr;seg(g,cx,cy,R.ang,L,col,9);dot(g,cx+cs(R.ang)*L/2,cy-sn(R.ang)*L/2,13,C.rd);
 ink(n==='slanted'?'slanted: not flat, not straight up':n==='horizontal'?'horizontal: flat, like the ground ✓':'vertical: straight up, like the string ✓',W/2,H*.1,hs(),{c:n==='slanted'?C.tx:C.gr})}
function gapAt(x,ay,aAng,by,bAng){return(by-tn(bAng)*(x-A.W/2))-(ay-tn(aAng)*(x-A.W/2))}
function drawPar(g){const{W,H,col:C}=A,ay=H*.36,by=H*.64,aAng=20,L=W*.56,xl=W/2-L*.45,xr=W/2+L*.45;
 // dashed extensions across the whole canvas, then the two lines
 seg(g,W/2,ay,aAng,W*2.4,A.alpha(C.ac,.45),2,[6,6]);seg(g,W/2,by,R.ang,W*2.4,A.alpha(C.vi,.45),2,[6,6]);seg(g,W/2,ay,aAng,L,C.ac,7);seg(g,W/2,by,R.ang,L,C.vi,7);
 ink('A',W/2-L/2-4,ay+tn(aAng)*L/2-18,16,{c:C.ac});ink('B',W/2-L/2-4,by+tn(R.ang)*L/2-18,16,{c:C.vi});
 dot(g,W/2+cs(R.ang)*L/2,by-sn(R.ang)*L/2,12,C.rd);
 const gl=gapAt(xl,ay,aAng,by,R.ang),gr=gapAt(xr,ay,aAng,by,R.ang),same=R.ang===aAng;
 [[xl,gl],[xr,gr]].forEach(([x,gp])=>{const y0=ay-tn(aAng)*(x-W/2);g.strokeStyle=same?C.gr:C.am;g.lineWidth=3;g.beginPath();g.moveTo(x,y0);g.lineTo(x,y0+gp);g.stroke();ink(Math.abs(gp)<3?'0':`${Math.round(Math.abs(gp)/8)}`,x+16,y0+gp/2,13,{c:same?C.gr:C.tx,w:700})});
 if(!same){const t=(by-ay)/(tn(R.ang)-tn(aAng)),x=W/2+t,y=ay-tn(aAng)*t;if(x>8&&x<W-8&&y>8&&y<H-8){dot(g,x,y,8,C.rd);ink('they meet here',Math.min(W-70,Math.max(70,x)),y+(y<H/2?20:-20),12,{c:C.rd})}}
 ink(same?'Same gap all along: parallel ✓':Math.abs(gl)>Math.abs(gr)?'The gap shrinks to the right':'The gap shrinks to the left',W/2,H*.08,hs(),{c:same?C.gr:C.tx});ink('gap',xl-16,H*.93,12,{c:C.mu,w:600});ink('gap',xr+16,H*.93,12,{c:C.mu,w:600})}
const pairBox=i=>{const{W,H}=A,cols=2,w=W/cols,h=H*.39;return{x:(i%cols)*w,y:H*.14+Math.floor(i/cols)*h,w,h}};
function drawPairs(g){const{W,H,col:C}=A;ink('Tap the pairs that are parallel',W/2,H*.07,hs());
 PAIRS.forEach((p,i)=>{const b=pairBox(i),s=R.picked[i],cx=b.x+b.w/2,cy=b.y+b.h*.46,L=Math.min(b.w,b.h)*.9;g.fillStyle=s==null?A.mix(C.pn,C.ac,.06):s?A.alpha(C.gr,.16):A.alpha(C.rd,.12);A.paint.rrect(b.x+6,b.y+4,b.w-12,b.h-8,12);g.fill();
  const off=p.a===90?L*.18:L*.16,ox=p.a===90?off:0,oy=p.a===90?0:off;
  if(p.a===62){seg(g,cx-L*.18,cy,p.a,L*p.la,C.ac,6);seg(g,cx+L*.18,cy,p.b,L*p.lb,C.vi,6)}else{seg(g,cx-ox,cy-oy,p.a,L*p.la,C.ac,6);seg(g,cx+ox,cy+oy,p.b,L*p.lb,C.vi,6)}
  ink(`Pair ${i+1}`+(s==null?'':s?' ✓ parallel':' ✗'),cx,b.y+b.h-16,13,{c:s==null?C.tx:s?C.gr:C.rd})});
 if(R.msg)ink(R.msg,W/2,H*.98-6,12,{c:C.tx,w:600})}
function drawPerp(g){const{W,H,col:C}=A,cx=W/2,cy=H*.54,L=Math.min(W*.78,H*.8),aAng=30,d=mod(R.ang-aAng,180);
 seg(g,cx,cy,aAng,L,C.ac,7);seg(g,cx,cy,R.ang,L*.8,C.vi,7);ink('A',cx+cs(aAng)*L/2+14,cy-sn(aAng)*L/2,16,{c:C.ac});
 dot(g,cx+cs(R.ang)*L*.4,cy-sn(R.ang)*L*.4,13,C.rd);ink('B',cx+cs(R.ang)*L*.4+22,cy-sn(R.ang)*L*.4,16,{c:C.vi});
 const right=d===90;if(right)square(g,cx,cy,aAng,22,C.gr);else{g.strokeStyle=C.am;g.lineWidth=3;g.beginPath();g.arc(cx,cy,30,-(aAng+d)*RAD,-aAng*RAD);g.stroke()}
 ink(right?'A square corner: perpendicular ✓':d===0?'B lies on top of A':d<90?'Smaller than a right angle':'Bigger than a right angle',W/2,H*.08,hs(),{c:right?C.gr:C.tx})}
function drawLetters(g){const{W,H,col:C}=A,[ch,strokes,kind]=LETTERS[Math.min(R.li,LETTERS.length-1)],s=Math.min(W*.42,H*.6),x0=W/2-s/2,y0=H*.18,done=R.li>=LETTERS.length;
 ink(done?'All five letters sorted ✓':`Letter ${R.li+1} of 5: ${ch}`,W/2,H*.08,hs(),{c:done?C.gr:C.tx});
 strokes.forEach(([a,b,cc,d])=>{g.strokeStyle=C.tx;g.lineWidth=s*.08;g.lineCap='round';g.beginPath();g.moveTo(x0+a*s,y0+b*s);g.lineTo(x0+cc*s,y0+d*s);g.stroke()});g.lineCap='butt';
 if(R.lmsg){const i=R.lmsg.indexOf('. ');const a=i>0?R.lmsg.slice(0,i+1):R.lmsg,b=i>0?R.lmsg.slice(i+2):'';ink(a,W/2,H*.86,A.narrow?13:15,{c:C.tx,w:700});if(b)ink(b,W/2,H*.93,A.narrow?12:14,{c:C.tx,w:600})}}
const gs=()=>{const{W,H}=A,s=Math.min((W-40)/(GC-1),(H*.72)/(GR-1));return{s,x0:(W-s*(GC-1))/2,y0:H*.13}};
const gp=(c2,r)=>{const{s,x0,y0}=gs();return[x0+c2*s,y0+r*s]};
function gridKind(){const dx=R.end[0]-B0[0],dy=R.end[1]-B0[1];if(!dx&&!dy)return'none';const ax=GA[2]-GA[0],ay=GA[3]-GA[1];if(dx*ay-dy*ax===0)return'par';if(dx*ax+dy*ay===0)return'perp';return'none'}
function drawGrid(g){const{W,H,col:C}=A;for(let r=0;r<GR;r++)for(let q=0;q<GC;q++){const[x,y]=gp(q,r);dot(g,x,y,2.6,A.alpha(C.tx,.45))}
 const a0=gp(GA[0],GA[1]),a1=gp(GA[2],GA[3]),b0=gp(...B0),b1=gp(...R.end);g.strokeStyle=C.ac;g.lineWidth=6;g.beginPath();g.moveTo(...a0);g.lineTo(...a1);g.stroke();ink('A',a0[0]-14,a0[1],15,{c:C.ac});
 const k=gridKind();g.strokeStyle=k==='none'?C.vi:C.gr;g.beginPath();g.moveTo(...b0);g.lineTo(...b1);g.stroke();dot(g,...b0,7,C.vi);dot(g,...b1,12,C.rd);
 ink(`Goal: draw B ${R.got.par?'perpendicular':'parallel'} to A`,W/2,H*.06,A.narrow?14:17);
 ink(k==='par'?'B is parallel to A':k==='perp'?'B is perpendicular to A':'Neither yet: count A’s steps',W/2,H*.96,A.narrow?13:15,{c:k==='none'?C.tx:C.gr})}
function draw(A){const{ctx:g,W,H,col:C}=A,k=part();g.fillStyle=A.mix(C.pn,C.ac,C.dark?.05:.04);g.fillRect(0,0,W,H);
 if(k==='quiz'){ink('Parallel or perpendicular?',W/2,H*.42,A.narrow?17:20);ink('Answer below',W/2,H*.56,13,{c:C.mu,w:500});A.fx.draw(g);return}
 ({hv:drawHV,par:drawPar,pairs:drawPairs,perp:drawPerp,letters:drawLetters,grid:drawGrid})[k](g);A.fx.draw(g)}
// ---------- actions ----------
function setAng(a){const k=part();a=Math.round(mod(a,180)/5)*5%180;R.ang=a;A.sound.tick();
 if(k==='hv'){const n=hvName(a);R.seen[n]=true;voice(`The stick is ${n}.`+(n==='slanted'?' Keep turning.':''))}
 if(k==='par')voice(a===20?'Same tilt as A, same gap at both ends: parallel.':`B tilts ${a>20?'more':'less'} than A, so the gap changes and they would meet.`);
 if(k==='perp'){const d=mod(a-30,180);voice(d===90?'A square corner: perpendicular, though both are slanted.':`The angle is ${d<90?'smaller':'bigger'} than a right angle.`)}
 A.redraw();R.hook()}
function pickPair(i){const p=PAIRS[i];R.picked[i]=p.ok;R.msg=p.why;if(p.ok)A.sound.pop();else A.sound.miss();voice(`Pair ${i+1}: `+p.why);controls();A.redraw();R.hook()}
function answerLetter(kind){if(R.li>=LETTERS.length)return;const[ch,,right]=LETTERS[R.li];
 if(kind===right){A.sound.pop();R.lmsg=`${ch}: ${KIND[right]}. `+{T:'Square corners under the top.',Z:'Top and bottom are parallel; no square corner.',H:'Parallel uprights; the bar is perpendicular.',V:'The strokes meet at a sharp point.',N:'Parallel uprights; the slant is not square.'}[ch];R.li++}
 else{A.sound.miss();R.lmsg={par:`Look again: any square corners in ${ch}?`,perp:`Look again: two lines going the same way in ${ch}?`,both:`Check each idea on its own for ${ch}.`,none:`Look for same-way lines or square corners in ${ch}.`}[kind]}
 voice(R.lmsg);controls();A.redraw();R.hook()}
function setEnd(q,r){q=Math.max(0,Math.min(GC-1,q));r=Math.max(0,Math.min(GR-1,r));R.end=[q,r];const k=gridKind();A.sound.tick();
 if(!R.got.par&&k==='par'){R.got.par=true;A.sound.pop();voice('Parallel! B copies A’s steps. Now make B perpendicular.')}
 else if(R.got.par&&k==='perp'){R.got.perp=true;A.sound.pop();voice('Perpendicular! B turns A’s steps: 1 across, 2 up the other way.')}
 else voice(`B ends at column ${q+1}, row ${r+1}: ${k==='par'?'parallel':k==='perp'?'perpendicular':'neither'}.`);A.redraw();R.hook()}
function controls(){if(!keys)return;keys.innerHTML='';const k=part();if(k==='quiz')return;const b=(t,f,lab,on)=>{const e=c.el('button',{type:'button',class:'lbtn','aria-label':lab||t},keys,t);if(on!=null)e.setAttribute('aria-pressed',String(!!on));e.onclick=f;return e};
 if(k==='hv'||k==='par'||k==='perp')[[15,'↺ 15°'],[5,'↺ 5°'],[-5,'↻ 5°'],[-15,'↻ 15°']].forEach(([d,t])=>b(t,()=>setAng(R.ang+d),`Turn the ${k==='hv'?'stick':'line B'} ${d>0?'anticlockwise':'clockwise'} a little${Math.abs(d)>5?' more':''}`));
 if(k==='pairs')PAIRS.forEach((p,i)=>b(`Pair ${i+1}`,()=>pickPair(i),`Pair ${i+1} is parallel`,R.picked[i]!=null?R.picked[i]:null));
 if(k==='letters'&&R.li<LETTERS.length)Object.entries(KIND).forEach(([kk,t])=>b(t,()=>answerLetter(kk),`${LETTERS[R.li][0]} has ${t}`));
 if(k==='grid')[['←',-1,0,'left'],['→',1,0,'right'],['↑',0,-1,'up'],['↓',0,1,'down']].forEach(([t,dq,dr,w])=>b(t,()=>setEnd(R.end[0]+dq,R.end[1]+dr),`Move the end of line B ${w} one dot`))}
// ---------- canvas: turn a line by dragging its red end; tap a pair; drag B's end to a dot ----------
function angAt(p,cx,cy){return Math.atan2(cy-p.y,p.x-cx)/RAD}
function down(p){const k=part();if(k==='quiz'||k==='letters')return false;
 if(k==='pairs'){for(let i=0;i<PAIRS.length;i++){const b=pairBox(i);if(p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h){pickPair(i);return true}}return false}
 R.drag=true;move(p);return true}
function move(p){if(!R.drag)return;const k=part(),{W,H}=A;
 if(k==='hv')setAng(angAt(p,W/2,H*.5));if(k==='par')setAng(angAt(p,W/2,H*.64));if(k==='perp')setAng(angAt(p,W/2,H*.54));
 if(k==='grid'){const{s,x0,y0}=gs(),q=Math.round((p.x-x0)/s),r=Math.round((p.y-y0)/s);if(q!==R.end[0]||r!==R.end[1])setEnd(q,r)}}
function up(){R.drag=false}
const when=(i,ok,line)=>()=>{if(A.step===i&&!A.isDone&&A.pred[i]!=null&&ok())A.done(line()+A.reveal(i))};
function run(i,list){steps[i].go();list.forEach((f,j)=>setTimeout(()=>{if(A.step===i)f()},A.reduced()?30*(j+1):(j+1)*450))}
const steps=[
{h:'Horizontal and vertical',p:'A horizontal line lies flat, like the ground. A vertical line goes straight up and down, like a hanging string. Drag the red end to turn the stick.',
 predict:{q:'A picture of a flagpole is turned on its side. The pole in the picture is now…',opts:['still vertical','horizontal','slanted'],ans:1},
 task:'Turn the stick so it is horizontal, then vertical',show:()=>run(0,[()=>setAng(0),()=>setAng(90)]),
 go:()=>{start({ang:30});voice('The stick is slanted. Drag its red end or use the turn buttons.');controls();R.hook=when(0,()=>R.seen.horizontal&&R.seen.vertical,()=>'Flat is horizontal; straight up is vertical. They compare a line with the ground, so turning a picture changes them.')}},
{h:'Parallel lines',p:'Parallel lines go the same way and keep the same gap, so they never meet, however long they get. The dashed lines show A and B made longer.',
 predict:{q:'Two lines lean a tiny bit towards each other but do not touch on the page. Are they parallel?',opts:['Yes, because they do not touch','No, because longer lines would meet','Yes, if they are the same length'],ans:1},
 task:'Turn line B until it is parallel to line A',show:()=>run(1,[()=>setAng(30),()=>setAng(25),()=>setAng(20)]),
 go:()=>{start({ang:35});voice('B tilts more than A. Turn B until the gap is the same at both ends.');controls();R.hook=when(1,()=>R.ang===20,()=>'Same tilt, same gap at both ends: the dashed lines never meet.')}},
{h:'Which pairs are parallel?',p:'Parallel lines can be long or short, flat, upright or slanted. What matters: same way, same gap.',
 predict:{q:'A long slanted line and a short slanted line go the same way. Are they parallel?',opts:['No, they are not the same length','No, parallel lines must be flat','Yes, the gap stays the same'],ans:2},
 task:'Find both parallel pairs',show:()=>run(2,[()=>pickPair(0),()=>pickPair(2)]),
 go:()=>{start();voice('Four pairs of lines. Tap each pair that is parallel.');controls();R.hook=when(2,()=>R.picked[0]&&R.picked[2],()=>'Pairs 1 and 3: one slanted, one upright, lengths differ.')}},
{h:'Perpendicular lines',p:'Perpendicular lines meet or cross at a right angle, a square corner like the corner of a book. They do not have to be flat and upright. Turn line B around the point where it meets A.',
 predict:{q:'Line A is slanted. Can line B be perpendicular to it?',opts:['No, one line must be flat and one upright','Yes, if they meet at a right angle','Only if A and B are the same length'],ans:1},
 task:'Turn line B until it is perpendicular to line A',show:()=>run(3,[()=>setAng(100),()=>setAng(110),()=>setAng(120)]),
 go:()=>{start({ang:70});voice('Turn B until the corner with A is square.');controls();R.hook=when(3,()=>mod(R.ang-30,180)===90,()=>'A square corner between two slanted lines: they are perpendicular.')}},
{h:'Lines in letters',p:'Letters are made of lines. Look for lines that go the same way (parallel) and lines that meet in a square corner (perpendicular). A letter can have both, or neither.',
 predict:{q:'The letter Z has…',opts:['perpendicular lines','a pair of parallel lines','no straight lines'],ans:1},
 task:'Sort all five letters',show:()=>run(4,LETTERS.map(l=>()=>answerLetter(l[2]))),
 go:()=>{start();voice('Letter T. Does it have parallel lines, perpendicular lines, both or neither?');controls();R.hook=when(4,()=>R.li>=LETTERS.length,()=>'Z and N: parallel; T: perpendicular; H: both; V: neither.')}},
{h:'Draw them on a grid',p:'Line A goes 2 dots across and 1 up. A parallel line copies those steps. A perpendicular line turns them: 1 across, 2 the other way. Drag B’s red end to a dot.',
 predict:{q:'To draw a line parallel to A from a new dot, you should…',opts:['copy A’s steps: 2 across, 1 up','draw it flat, because parallel lines are flat','make it the same length as A'],ans:0},
 task:'Draw B parallel to A, then perpendicular to A',show:()=>run(5,[()=>setEnd(4,5),()=>setEnd(1,4)]),
 go:()=>{start({end:[4,6]});voice('B starts at the purple dot. Drag its red end or use the arrows.');controls();R.hook=when(5,()=>R.got.par&&R.got.perp,()=>'Copy the steps: parallel. Turn them: perpendicular.')}},
{h:'Challenge',p:'',go:()=>{start();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>R.hook()});
const QS=[
 ['Railway tracks run side by side and never meet. The two rails are…',[['parallel','ok'],['perpendicular','swap'],['vertical','hv']]],
 ['Two lines meet in a square corner. They are…',[['perpendicular','ok'],['parallel','swap'],['horizontal','hv']]],
 ['Two lines get closer but do not touch on the page. Are they parallel?',[['No, longer lines would meet','ok'],['Yes, they do not touch','touch'],['Yes, if they are the same length','length']]],
 ['Can two slanted lines be perpendicular?',[['Yes, if they meet at a right angle','ok'],['No, one must be flat and one upright','upright'],['Only if they are the same length','length']]],
 ['Which letter has a pair of parallel lines but no right angle?',[['N','ok'],['T','swap'],['V','vee']]],
 ['A flagpole stands straight up from flat ground. The pole is…',[['vertical','ok'],['horizontal','hv'],['parallel','swap']]]];
function why(t){let m='Parallel lines go the same way and never meet; perpendicular lines meet at a right angle.';
 if(t==='swap')m='Parallel lines never meet; perpendicular lines meet in a square corner. Those two got swapped.';
 if(t==='hv')m='Horizontal and vertical describe one line, flat or straight up. Parallel and perpendicular describe a pair.';
 if(t==='touch')m='Not touching on the page is not enough. If the gap shrinks, longer lines would meet, so they are not parallel.';
 if(t==='length')m='Length does not matter. Parallel lines keep the same gap whatever their length.';
 if(t==='upright')m='Perpendicular lines can both be slanted. What matters is the square corner where they meet.';
 if(t==='vee')m='V has no parallel lines: its two strokes meet at the bottom.';
 return m}
function next(){turn++;const Q=QS[turn%QS.length],r=turn%3,opts=[...Q[1].slice(r),...Q[1].slice(0,r)];
 qa.innerHTML=`<p><b>${Q[0]}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qa.querySelector('.fl-pick');opts.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>judge(t)});voice('Challenge: '+Q[0]);A.redraw()}
function judge(t){qa.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=qa.querySelector('.fl-fb'),ok=t==='ok';
 if(ok)A.win();else A.sound.miss();fb.innerHTML=(ok?'✓ Right: same way and never meeting is parallel; a square corner is perpendicular.':'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:A=>{qa.hidden=A.step!==6;keys.hidden=A.step===6;controls()},
 init:A=>{const w=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Line controls'},w);qa=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up});controls()}});
A.start()})})();
