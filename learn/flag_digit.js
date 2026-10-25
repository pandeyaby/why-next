/* Flagship 59 – writing digits 0–9 (ages 5–6): trace digits from the green start dot (order enforced), turn backwards
   digits round, 9 circle-first vs 6, put digits on the line at tall-letter size, free tracing. Challenge varies. */
(()=>{const TAU=Math.PI*2,H2=Math.hypot;
 // pen strokes per digit in a 0.6 × 1 box (y down)
 const arc=(cx,cy,rx,ry,t0,t1)=>{const n=Math.max(8,Math.ceil(Math.abs(t1-t0)*14)),o=[];for(let i=0;i<=n;i++){const t=t0+(t1-t0)*i/n;o.push([cx+rx*Math.cos(t),cy+ry*Math.sin(t)])}return o};
 const seg=(...p)=>p;
 const SHAPE={0:[arc(.3,.5,.27,.48,-Math.PI/2,-Math.PI/2-TAU)],1:[seg([.18,.12],[.32,0],[.32,1])],
  2:[arc(.3,.27,.25,.25,Math.PI+.35,TAU+.6).concat(seg([.04,1],[.58,1]))],
  3:[arc(.28,.26,.25,.24,3.6,TAU+Math.PI/2).concat(arc(.28,.74,.28,.26,-Math.PI/2,Math.PI-.5))],
  4:[seg([.4,0],[.02,.66],[.6,.66]),seg([.45,.04],[.45,1])],
  5:[seg([.1,0],[.08,.45]).concat(arc(.28,.68,.28,.3,-2.4,2.5)),seg([.1,0],[.56,0])],
  6:[arc(.36,.6,.32,.58,-1.2,-Math.PI).concat(arc(.3,.74,.26,.26,Math.PI,-Math.PI+.25))],
  7:[seg([.02,0],[.58,0],[.2,1])],
  8:[arc(.3,.25,.22,.24,-.6,-1.5*Math.PI).concat(arc(.3,.73,.28,.26,-Math.PI/2,1.5*Math.PI),arc(.3,.25,.22,.24,Math.PI/2,-.6))],
  9:[arc(.3,.27,.25,.25,-.6,-TAU).concat(seg([.55,1]))]};
 const STK={};for(const d in SHAPE)STK[d]=SHAPE[d].map(s=>{const o=[s[0]];let acc=0;for(let i=1;i<s.length;i++){const a=s[i-1],b=s[i],L=H2(b[0]-a[0],b[1]-a[1]);let u=0;
   while(acc+L-u>=.035){u+=.035-acc;acc=0;o.push([a[0]+(b[0]-a[0])*u/L,a[1]+(b[1]-a[1])*u/L])}acc+=L-u}const z=s[s.length-1];if(H2(z[0]-o[o.length-1][0],z[1]-o[o.length-1][1])>.008)o.push(z);return o});
 const HOW={0:'Go round to the left, all the way back to the top.',1:'Go straight down.',2:'Over to the right, down the slope, along the line.',
  3:'Round, back to the middle, round again.',4:'Down the slope and across. Lift. Then the long stick, from the top.',5:'Down, round the belly. Lift. Put the hat on.',
  6:'Curve down, then curl round at the bottom.',7:'Along the top, then a slope down to the left.',8:'Make an S, then go back up to the top.',9:'Make the circle first, then the stick down.'};
 const FACE={2:'a 2 curls over to the right, then runs along the line',3:'the bumps of a 3 bulge out to the right',5:'the belly of a 5 bulges out to the right, under the hat',
  7:'a 7 goes along the top, then slopes down to the left',9:'the circle of a 9 is on the left, with the stick on the right',4:'the stick of a 4 is on the right'};
 const CARDS=[[3,1],[5,0],[7,1],[2,0],[9,1],[4,0]],LINE=[[4,-.42,1],[7,.3,1.38],[0,0,.55]];
VIS.reg('flagdigit',c=>{let A,pad,chal,read;c.fig.classList.add('young');
 const G={d:1,s:0,k:0,fin:0,dr:null,sx:[],ln:[],sel:0,flash:0,want:()=>{},Q:null,said:'',tok:0,free:3};
 const tell=t=>{G.said=t;c.say(t);if(read){read.textContent=t;A.cv.setAttribute('aria-label',t)}};
 const mode=()=>['trace','trace','flip','trace','line','trace','q'][A.step];
 const ft=(x,w,z,a)=>{x.font=`${w} ${z}px system-ui`;x.textAlign=a||'center';x.textBaseline='middle'};
 const box=()=>{const h=Math.min(A.H*.68,A.W*.95);return{h,x:A.W/2-h*.3,y:A.H*.13}};
 const toPx=(B,p)=>({x:B.x+p[0]*B.h,y:B.y+p[1]*B.h});
 const strokes=()=>{const B=box();return STK[G.d].map(s=>s.map(p=>toPx(B,p)))};
 const tol=()=>Math.max(24,box().h*.1);
 function status(){const m=mode();let t;
  if(m==='trace'){const n=STK[G.d].length;t=`${G.fin?`The ${G.d} is traced.`:`Trace the ${G.d}.`} Start at the top. ${HOW[G.d]}`+(n>1?` Line ${G.s+1} of ${n}.`:'')+(G.k?' Keep going.':' Put a finger on the green dot.')}
  else if(m==='flip'){const left=CARDS.filter((q,i)=>G.sx[i]<0);t=left.length?`${CARDS.map((q,i)=>q[0]+(G.sx[i]<0?' backwards':'')).join(', ')}. ${left.length} to turn.`:'Every digit faces the right way now.'}
  else if(m==='line'){t=G.ln.map(o=>`${o.d}: ${onLine(o)?'on the line':o.y<lineY()-4?'above the line':'below the line'}, ${okSize(o)?'the right size':o.h>tall()?'too big':'too small'}`).join('. ')+'.'}
  else t='';tell(t);sync();G.want()}
 const disc=(x,X,Y,r,c)=>{x.fillStyle=c;x.beginPath();x.arc(X,Y,r,0,TAU);x.fill()};
 function lines(x,B,ex){const C=A.col,L=12,R=A.W-12;x.strokeStyle=A.alpha(C.ac,.55);x.lineWidth=2;
  [B.y,B.y+B.h].forEach((y,i)=>{x.beginPath();x.moveTo(L,y);x.lineTo(R,y);x.lineWidth=i?3:1.5;x.stroke()});x.setLineDash([6,8]);x.lineWidth=1.5;x.beginPath();x.moveTo(L,B.y+B.h*.42);x.lineTo(R,B.y+B.h*.42);x.stroke();x.setLineDash([]);
  if(ex){ft(x,600,12,'left');x.fillStyle=C.mu;x.fillText('top line',L+2,B.y-9);x.fillText('baseline',L+2,B.y+B.h+12)}}
 function pen(x,S,w,col,k){x.strokeStyle=col;x.lineWidth=w;x.lineCap='round';x.lineJoin='round';S.forEach((s,i)=>{const n=k==null?s.length:k[i];if(n<2)return;x.beginPath();x.moveTo(s[0].x,s[0].y);for(let j=1;j<n;j++)x.lineTo(s[j].x,s[j].y);x.stroke()})}
 function glyph(x,d,cx,base,h,sx,col,w){const B={h,x:-h*.3,y:-h};x.save();x.translate(cx,base);x.scale(sx==null?1:sx,1);pen(x,STK[d].map(s=>s.map(p=>toPx(B,p))),w||Math.max(4,h*.09),col);x.restore()}
 function arrowAt(x,a,b,col){const g=Math.atan2(b.y-a.y,b.x-a.x);x.save();x.translate(b.x,b.y);x.rotate(g);x.fillStyle=col;x.beginPath();x.moveTo(9,0);x.lineTo(-6,-7);x.lineTo(-6,7);x.closePath();x.fill();x.restore()}
 function traceView(x){const C=A.col,B=box(),S=strokes();lines(x,B,1);
  x.setLineDash([2,12]);pen(x,S,Math.max(9,B.h*.05),A.alpha(C.tx,.35));x.setLineDash([]);
  S.forEach((s,i)=>{if(i<G.s&&!G.fin)return;[.3,.62].forEach(f=>{const j=Math.floor(s.length*f);if(s[j+2])arrowAt(x,s[j],s[j+2],A.alpha(C.vi,.8))})});
  pen(x,S,Math.max(12,B.h*.065),C.ac,S.map((s,i)=>G.fin||i<G.s?s.length:i===G.s?G.k+1:0));
  if(!G.fin){const s=S[G.s],p=s[G.k];disc(x,p.x,p.y,G.k?13:17,C.gr);x.fillStyle='#fff';ft(x,800,14);x.fillText(G.k?'':String(G.s+1),p.x,p.y+1);
   if(!G.k&&s[3])arrowAt(x,s[1],s[3],C.gr)}}
 function flipView(x){const C=A.col;CARDS.forEach((q,i)=>{const r=cardR(i);x.fillStyle=G.sx[i]<0?A.alpha(C.rd,.08):A.alpha(C.gr,.1);A.paint.rrect(r.x,r.y,r.w,r.h,14);x.fill();x.strokeStyle=G.sx[i]<0?A.alpha(C.tx,.35):C.gr;x.lineWidth=2;x.stroke();
  glyph(x,q[0],r.x+r.w/2,r.y+r.h*.84,r.h*.66,G.sx[i],C.tx);if(G.sx[i]>0&&q[1]){ft(x,800,18);x.fillStyle=C.gr;x.fillText('✓',r.x+r.w-14,r.y+16)}})}
 function lineView(x){const C=A.col,Y=lineY(),T=tall();x.strokeStyle=A.alpha(C.ac,.6);x.lineWidth=1.5;x.beginPath();x.moveTo(12,Y-T);x.lineTo(A.W-12,Y-T);x.stroke();x.lineWidth=3;x.beginPath();x.moveTo(12,Y);x.lineTo(A.W-12,Y);x.stroke();
  const hx=A.W*.08;x.save();x.translate(hx,Y);x.strokeStyle=C.mu;x.lineWidth=Math.max(4,T*.09);x.lineCap='round';x.beginPath();x.moveTo(0,-T);x.lineTo(0,0);x.moveTo(0,-T*.45);x.quadraticCurveTo(T*.3,-T*.75,T*.42,-T*.4);x.lineTo(T*.42,0);x.stroke();x.restore();
  ft(x,600,12);x.fillStyle=C.mu;x.fillText('tall letter',hx+T*.2,Y+16);
  G.ln.forEach((o,i)=>{const cx=lnX(i),ok=onLine(o)&&okSize(o);if(i===G.sel){x.strokeStyle=A.alpha(C.vi,.5);x.lineWidth=2;x.setLineDash([4,4]);x.strokeRect(cx-o.h*.38,o.y-o.h-6,o.h*.76,o.h+12);x.setLineDash([])}
   glyph(x,o.d,cx,o.y,o.h,1,ok?C.gr:C.tx);disc(x,cx,o.y-o.h-14,15,A.alpha(C.vi,.25));x.strokeStyle=C.vi;x.lineWidth=2;x.stroke();ft(x,800,13);x.fillStyle=C.tx;x.fillText('⇕',cx,o.y-o.h-13)})}
 function draw(A){const{ctx:x,W,H,col:C}=A,m=mode();x.fillStyle=A.mix(C.pn,'#ecfccb',C.dark?.04:.35);x.fillRect(0,0,W,H);
  if(m==='trace')traceView(x);else if(m==='flip')flipView(x);else if(m==='line')lineView(x);
  else if(G.Q){const Q=G.Q,base=H*.78,h=H*.56;
   if(Q.k==='rev'){const hr=Math.min(h,W*.5);[0,1].forEach(i=>{const cx=W*(i?.72:.28);glyph(x,Q.d,cx,base,hr,i===Q.bad?-1:1,C.tx);ft(x,700,16);x.fillStyle=C.mu;x.fillText(i?'right one':'left one',cx,base+24)})}
   else if(Q.k==='line'){const Y=H*.72,T=Math.min(H*.4,W*.3);x.strokeStyle=A.alpha(C.ac,.6);x.lineWidth=3;x.beginPath();x.moveTo(12,Y);x.lineTo(W-12,Y);x.stroke();x.lineWidth=1.5;x.beginPath();x.moveTo(12,Y-T);x.lineTo(W-12,Y-T);x.stroke();
    Q.ds.forEach((d,i)=>glyph(x,d,W*(.2+.3*i),Y+(i===Q.bad?Q.dy*T:0),T,1,C.tx))}
   else if(Q.k==='start'){const B={h:h,x:W/2-h*.3,y:H*.14},s=STK[Q.d],first=toPx(B,s[0][0]),last=toPx(B,s[s.length-1][s[s.length-1].length-1]);pen(x,s.map(t=>t.map(p=>toPx(B,p))),Math.max(6,h*.06),A.alpha(C.tx,.6));
    [[first,'A'],[last,'B'],[toPx(B,[.3,.55]),'C']].forEach(([p,l],i)=>{const o=i===1&&H2(first.x-last.x,first.y-last.y)<30?{x:p.x+28,y:p.y}:p;disc(x,o.x,o.y,14,C.vi);ft(x,800,14);x.fillStyle='#fff';x.fillText(l,o.x,o.y+1)})}
   else if(Q.k==='order')glyph(x,Q.d,W/2,base,h,1,C.tx)}
  if(G.flash>0){x.strokeStyle=A.alpha(C.gr,G.flash);x.lineWidth=6;x.strokeRect(3,3,W-6,H-6)}A.fx.draw(x)}
 const cardR=i=>{const cols=A.narrow?3:6,w=(A.W-16-(cols-1)*10)/cols,h=Math.min(w*1.25,(A.H-40)/(A.narrow?2:1)*.8),r=Math.floor(i/cols),k=i%cols,top=A.narrow?(A.H-2*h-12)/2:(A.H-h)/2;return{x:8+k*(w+10),y:top+r*(h+12),w,h}};
 const lineY=()=>A.H*.8,tall=()=>Math.min(A.H*.36,A.W*.24),lnX=i=>A.W*(.4+.22*i);
 const onLine=o=>Math.abs(o.y-lineY())<2,okSize=o=>Math.abs(o.h-tall())<2;
 const fresh=()=>{G.tok++;G.want=()=>{};G.Q=null;G.dr=null};
 const start=d=>{G.d=d;G.s=0;G.k=0;G.fin=0;status()};
 function adv(j){const S=STK[G.d][G.s];G.k=j;if(G.k>=S.length-1){A.sound.pop();if(G.s<STK[G.d].length-1){G.s++;G.k=0;G.dr=null;tell(`Lift your finger. Line ${G.s+1}: start at the green dot.`);sync();return}
   G.fin=1;G.dr=null;G.flash=1;A.tween(G,{flash:0},900,'out');status();return}A.redraw()}
 function show(){if(G.fin)start(G.d);const k=++G.tok,nx=()=>{if(k!==G.tok||G.fin||mode()!=='trace')return;adv(Math.min(STK[G.d][G.s].length-1,G.k+2));setTimeout(nx,A.reduced()?0:24)};nx()}
 function flip(i){if(G.sx[i]>0){shake();tell(`That ${CARDS[i][0]} already faces the right way: ${FACE[CARDS[i][0]]}.`);return}
  A.sound.tick();A.tween(G.sx,{[i]:1},A.reduced()?0:450,'io',()=>{G.sx[i]=1;status();if(G.sx.every(v=>v>0))tell(`Every digit faces the right way now. ${FACE[CARDS[i][0]]}.`)})}
 function nudge(i,dy,ds){const o=G.ln[i];if(!o)return;G.sel=i;o.y+=dy;o.h=Math.max(tall()*.3,Math.min(tall()*1.6,o.h*(ds||1)));snap(o);A.sound.tick();status()}
 function snap(o){if(Math.abs(o.y-lineY())<10)o.y=lineY();if(Math.abs(o.h-tall())<tall()*.09)o.h=tall()}
 function setLine(){G.ln=LINE.map(([d,dy,s])=>({d,y:lineY()+dy*tall(),h:tall()*s}))}
 function shake(){A.sound.miss()}
 function sync(){if(!A)return;if(A.step!==6)A.cv.setAttribute('aria-label',G.said);if(!pad)return A.redraw();pad.innerHTML='';const m=mode();
  const B=(t,f,dis,lab)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':lab||null},pad,t);e.disabled=!!dis;e.onclick=f};
  if(m==='trace'){B('Trace it for me',show,0,`Trace the ${G.d} for me`);B('Start again',()=>start(G.d),!G.k&&!G.s&&!G.fin);
   if(A.step===5)for(let d=0;d<10;d++)B(String(d),()=>{G.free=d;start(d)},0,`Trace the digit ${d}`)}
  if(m==='flip')CARDS.forEach((q,i)=>B(`Turn ${q[0]}`,()=>flip(i),G.sx[i]>0&&!q[1],`Turn the ${q[0]} round`));
  if(m==='line'){G.ln.forEach((o,i)=>B(`Digit ${o.d}`,()=>{G.sel=i;status()},0,`Choose the digit ${o.d}`+(i===G.sel?' (chosen)':'')));const o=G.ln[G.sel]||{};
   B('↑ Up',()=>nudge(G.sel,-tall()*.1),0,`Move the ${o.d} up`);B('↓ Down',()=>nudge(G.sel,tall()*.1),0,`Move the ${o.d} down`);B('Bigger',()=>nudge(G.sel,0,1.1),0,`Make the ${o.d} bigger`);B('Smaller',()=>nudge(G.sel,0,1/1.1),0,`Make the ${o.d} smaller`)}
  A.redraw()}
 const fin=(st,test,msg)=>()=>{if(A.step===st&&test()&&(!steps[st].predict||A.pred[st]!=null)){G.flash=1;A.tween(G,{flash:0},1100,'out');A.done(msg()+A.reveal(st))}};
 const steps=[
  {h:'Start at the top',p:'Put your finger on the green dot. Follow the dots down to the line.',
   predict:{q:'Where does your pencil start for a 1?',opts:['At the bottom, going up','At the top, going down','Either end is fine'],ans:1},task:'Trace the 1 from the green dot',show,
   go:()=>{fresh();start(1);G.want=fin(0,()=>G.fin,()=>'Top to bottom. Every digit starts at the top.')}},
  {h:'Over and down: 2',p:'Follow the purple arrows. The 2 curls over, slides down, then runs along the line.',
   predict:{q:'Which way does a 2 curl at the top?',opts:['Over to the right, then down','Over to the left, then down','Straight down first'],ans:0},task:'Trace the 2',show,
   go:()=>{fresh();start(2);G.want=fin(1,()=>G.fin,()=>'Over to the right, down the slope, along the line.')}},
  {h:'Which way round?',p:'Some digits are backwards. Tap a backwards one to turn it round.',
   predict:{q:'Can a digit face either way?',opts:['Yes, any way round is fine','No: each digit faces one way, so people can read it'],ans:1},task:'Turn every backwards digit the right way',
   show:()=>{const k=G.tok;CARDS.forEach((q,i)=>setTimeout(()=>{if(k===G.tok&&G.sx[i]<0)flip(i)},A.reduced()?0:i*260))},
   go:()=>{fresh();G.sx=CARDS.map(q=>q[1]?-1:1);status();G.want=fin(2,()=>G.sx.every(v=>v>0),()=>'3, 7 and 9 are the ones children turn round most. A backwards digit is hard for other people to read.')}},
  {h:'9 and 6',p:'Trace the 9. Which part do you draw first?',
   predict:{q:'To write a 9, what do you draw first?',opts:['The stick down','The circle at the top','The circle at the bottom'],ans:1},task:'Trace the 9',show,
   go:()=>{fresh();start(9);G.want=fin(3,()=>G.fin,()=>'Circle first, then the stick. A 6 is different: it curves down first and curls at the bottom.')}},
  {h:'On the line',p:'Drag each digit onto the thick line. Drag its ⇕ circle to make it as tall as the tall letter.',task:'Make every digit sit on the line, as tall as the letter',
   show:()=>{G.ln.forEach(o=>A.tween(o,{y:lineY(),h:tall()},A.reduced()?0:600,'io'));setTimeout(()=>{G.ln.forEach(o=>{o.y=lineY();o.h=tall()});status()},A.reduced()?0:650)},
   go:()=>{fresh();setLine();G.sel=0;status();G.want=fin(4,()=>G.ln.every(o=>onLine(o)&&okSize(o)),()=>'All three sit on the line and are as tall as a tall letter, so they are easy to read.')}},
  {h:'Your turn',p:'Pick any digit and trace it. Say how it starts as you go.',go:()=>{fresh();start(G.free)}},
  {h:'Challenge',p:'',go:()=>{fresh();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>G.want()});
 const KS=['start','rev','69','line','order','rev','count','69','start','rev','line','order'],REV=[3,7,9,2,5];let qn=-1,run=0;
 function ask(){qn++;const k=KS[qn%KS.length],j=qn%3;let q,ops;
  if(k==='start'){const d=[7,3,5,0,8,2][qn%6];G.Q={k,d};q=`Where does the pencil start for ${d}?`;ops=[['A: at the top','ok'],['B: at the bottom, where it ends','end'],['C: in the middle','mid']]}
  else if(k==='rev'){const d=REV[qn%REV.length],bad=qn%2;G.Q={k,d,bad};q=`Which ${d} faces the right way?`;ops=[['The left one',bad?'ok':'mirror'],['The right one',bad?'mirror':'ok']]}
  else if(k==='69'){const six=qn%2===0;G.Q={k,d:-1};q=six?'Which digit curves down from the top and curls round at the bottom?':'Which digit starts with a circle at the top, then a stick down?';ops=[['6',six?'ok':'six'],['9',six?'nine':'ok'],['0','zero']]}
  else if(k==='line'){const ds=[[2,5,8],[4,1,6],[3,0,7]][qn%3],bad=qn%3,dy=qn%2?-.35:.3;G.Q={k,ds,bad,dy};q='Which digit is not sitting on the line?';ops=ds.map((d,i)=>[String(d),i===bad?'ok':'online'])}
  else if(k==='order'){const five=qn%2===0;G.Q={k,d:five?5:4};q=five?'What do you draw last on a 5?':'What do you draw first on a 4?';
   ops=five?[['The hat on top','ok'],['The round belly','belly'],['The stick down','stick5']]:[['The slope down and across','ok'],['The long stick','stick4'],['The line across the top','top4']]}
  else{G.Q={k};q='How many different digits are there?';ops=[['10: from 0 to 9','ok'],['9: from 1 to 9','nozero'],['Lots: 10, 11, 12 and more','many']]}
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');ops.slice(j%ops.length).concat(ops.slice(0,j%ops.length)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(tag)});
  const Q=G.Q,extra=k==='rev'?` Picture: two ${Q.d}s; the ${Q.bad?'right':'left'} one is a mirror image.`:k==='line'?` Picture: ${Q.ds.join(', ')}; the ${Q.ds[Q.bad]} is ${Q.dy<0?'floating above':'hanging below'} the line.`:k==='start'?` Picture: a ${Q.d} with dot A at the top, B where it ends and C in the middle.`:'';
  tell('Challenge: '+q+extra);A.redraw()}
 function judge(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb'),Q=G.Q;let m;
  if(tag==='ok')m=Q.k==='rev'?`Yes: ${FACE[Q.d]}.`:Q.k==='line'?`Yes: the ${Q.ds[Q.bad]} is off the line.`:'Yes!';
  else if(tag==='end')m=`B is where the ${Q.d} ends. Every digit starts at the top.`;
  else if(tag==='mid')m='Starting in the middle makes wobbly digits. Every digit starts at the top.';
  else if(tag==='mirror')m=`That one is a mirror image. Look again: ${FACE[Q.d]}.`;
  else if(tag==='six')m='A 6 curves down first and curls at the bottom. Circle first at the top is a 9.';
  else if(tag==='nine')m='A 9 has its circle at the top. Curving down and curling at the bottom is a 6.';
  else if(tag==='zero')m='A 0 is one round loop, with no stick and no curl.';
  else if(tag==='online')m='That one sits on the line. Look for the digit that floats up or hangs down.';
  else if(tag==='belly')m='The belly comes before the hat: down, round the belly, lift, then the hat.';
  else if(tag==='stick5')m='The stick comes first. The hat goes on last.';
  else if(tag==='stick4')m='The long stick comes second. First the slope down and across, then lift and draw the stick.';
  else if(tag==='top4')m='A 4 has no line across the top. That is a 7.';
  else if(tag==='nozero')m='Do not forget 0. From 0 to 9 there are 10 digits.';
  else m='10, 11 and 12 are numbers made from two digits. There are only 10 digits: 0 to 9.';
  const ok=tag==='ok';if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Stars: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 A=FK.shell(c,{steps,ratio:.62,tall:1.12,draw,onStep:A=>{chal.hidden=A.step!==6;read.hidden=A.step===6;pad.hidden=A.step===6;sync()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
   A.gest({down:p=>{const m=mode();
     if(m==='trace'){if(G.fin)return false;const S=strokes(),s=S[G.s],T=tol(),dd=q=>H2(p.x-q.x,p.y-q.y);
      if(dd(s[G.k])<T){G.dr='tr';return true}
      if(!G.k&&dd(s[s.length-1])<T){shake();tell(`That is where the ${G.d} ends. Start at the green dot at the top.`);return false}
      if(S.some(t=>t.some(q=>dd(q)<T))){shake();tell(G.k?'Carry on from the green dot, where you stopped.':'Start at the green dot.')}return false}
     if(m==='flip'){const i=CARDS.findIndex((q,i)=>{const r=cardR(i);return p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h});if(i>=0)flip(i);return false}
     if(m==='line'){for(let i=0;i<G.ln.length;i++){const o=G.ln[i],cx=lnX(i);
       if(H2(p.x-cx,p.y-(o.y-o.h-14))<28){G.sel=i;G.dr='h';G.y0=p.y;G.v0=o.h;return true}
       if(Math.abs(p.x-cx)<Math.max(30,o.h*.4)&&p.y>o.y-o.h-6&&p.y<o.y+10){G.sel=i;G.dr='m';G.y0=p.y;G.v0=o.y;return true}}return false}return false},
    move:p=>{const m=mode();
     if(G.dr==='tr'){const s=strokes()[G.s],T=tol();let best=-1;for(let j=G.k+1;j<Math.min(s.length,G.k+9);j++)if(H2(p.x-s[j].x,p.y-s[j].y)<T)best=j;
      if(best>0)adv(best);else if(H2(p.x-s[G.k].x,p.y-s[G.k].y)>T*2.2){G.dr=null;shake();tell('Off the dots. Go back to the green dot and keep going.');A.redraw()}}
     else if(m==='line'&&G.dr){const o=G.ln[G.sel];if(G.dr==='m')o.y=Math.max(tall()*.5,Math.min(A.H-6,G.v0+p.y-G.y0));else o.h=Math.max(tall()*.3,Math.min(tall()*1.6,G.v0-(p.y-G.y0)));A.redraw()}},
    up:()=>{const d=G.dr;G.dr=null;if(d==='m'||d==='h'){snap(G.ln[G.sel]);status()}
     if(d==='tr'&&!G.fin)status()}});
   sync()}});
 A.start()})})();
