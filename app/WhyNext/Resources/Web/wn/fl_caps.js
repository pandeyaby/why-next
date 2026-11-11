/* Flagship – forming capital letters (ages 5–6, with a grown-up): spot the capital in each pair on the writing lines,
   trace straight-line capitals from the top, slanted capitals from the top point, curvy capitals the right way round,
   then pick the well-made capital (tall, on the line, facing the right way) from look-alikes. */
(()=>{const PI=Math.PI;
 const arc=(cx,cy,rx,ry,a,b)=>{const n=Math.max(10,Math.ceil(Math.abs(b-a)*9)),o=[];for(let i=0;i<=n;i++){const t=a+(b-a)*i/n;o.push([cx+rx*Math.cos(t),cy+ry*Math.sin(t)])}return o};
 const line=(x0,y0,x1,y1)=>{const o=[];for(let i=0;i<=8;i++)o.push([x0+(x1-x0)*i/8,y0+(y1-y0)*i/8]);return o};
 // letter strokes in a box 0..0.7 wide, y 0 = top line, 1 = base line; the first point of a stroke is where the pencil starts
 // each stroke: [points, right way, wrong way]
 const DOWN=['⬇ Down from the top','⬆ Up from the bottom'],ACROSS=['➡ Across, left to right','⬅ Across, right to left'];
 const L={L:[[line(.12,0,.12,1),...DOWN],[line(.12,1,.6,1),...ACROSS]],
  E:[[line(.12,0,.12,1),...DOWN],[line(.12,0,.6,0),...ACROSS],[line(.12,.5,.5,.5),...ACROSS],[line(.12,1,.6,1),...ACROSS]],
  A:[[line(.35,0,.05,1),'↙ From the top point, down left','↗ From the bottom, up to the point'],[line(.35,0,.65,1),'↘ From the top point, down right','↖ From the bottom, up to the point'],[line(.17,.62,.53,.62),...ACROSS]],
  X:[[line(.06,0,.64,1),'↘ From the top left, down','↖ From the bottom right, up'],[line(.64,0,.06,1),'↙ From the top right, down','↗ From the bottom left, up']],
  C:[[arc(.38,.5,.32,.48,-.8,-2*PI+.8),'↺ From the top right, over the top and round to the left','↻ From the bottom, round to the right']],
  O:[[arc(.35,.5,.32,.48,-PI/2+.2,-PI/2+.2-2*PI),'↺ From the top, over to the left and all the way round','↻ From the top, round to the right first']],
  D:[[line(.12,0,.12,1),...DOWN],[arc(.12,.5,.5,.5,-PI/2,PI/2),'↻ From the top, round to the right and down','↺ From the bottom, round and up']]};
 const PAIRS=[['B','b'],['d','D'],['E','e'],['g','G'],['P','p']];
 const SMALL_SAY={b:'small b: its tummy is low down',d:'small d: its tummy is low down',e:'small e: it only reaches the dashed line',g:'small g: it hangs below the line',p:'small p: it hangs below the line'};
 // well-made check: [letter, kinds shown] kinds: ok, short (stops at dashed line), float (above the line), back (faces the wrong way), sink (drops below the line)
 const CHECK=[['H',['short','ok','float']],['N',['back','sink','ok']],['B',['ok','back','short']],['S',['float','ok','back']]];
 const WHY={short:'Too short. A capital reaches all the way up to the top line.',float:'It floats. A capital sits right on the line.',back:'It faces the wrong way. Look at which side the bumps or slants go.',sink:'It drops below the line. Capitals never hang down.'};
 const SETS=[null,['L','E'],['A','X'],['C','O','D']];
VIS.reg('flagcaps',c=>{let A,pad,quiz;c.fig.classList.add('young');
 const G={found:[],bad:null,done:{},cur:null,idx:0,warn:null,want:0,pick:null,tok:0,onChange:()=>{}};
 const mode=()=>['pairs','trace','trace','trace','size','quiz'][A.step];
 function tell(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
 const sz=n=>Math.round(n*(A.narrow?1.15:1.35));
 function txt(g,t,x,y,n,col,w){g.font=`${w||800} ${sz(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-10)}
 // writing lines: top line, dashed middle line, base line
 function rules(g,x,w,top,h){const C=A.col;g.save();g.strokeStyle=A.alpha(C.tx,.55);g.lineWidth=1.5;[top,top+h].forEach(y=>{g.beginPath();g.moveTo(x,y);g.lineTo(x+w,y);g.stroke()});
  g.setLineDash([6,6]);g.strokeStyle=A.alpha(C.tx,.4);g.beginPath();g.moveTo(x,top+h/2);g.lineTo(x+w,top+h/2);g.stroke();g.setLineDash([]);g.restore()}
 // draw a glyph so its capital height runs from top to top+h (scale from the measured ascent of "H")
 function glyph(g,ch,cx,top,h,col,kind){g.save();g.font=`700 100px system-ui,sans-serif`;g.textBaseline='alphabetic';const m=g.measureText('H'),cap=m.actualBoundingBoxAscent||72,k=h/cap;
  let base=top+h,scale=k;if(kind==='short')scale=k*.5;if(kind==='float')base-=h*.28;if(kind==='sink')base+=h*.35;
  g.translate(cx,base);g.scale(kind==='back'?-scale:scale,scale);g.fillStyle=col;g.textAlign='center';g.textBaseline='alphabetic';g.fillText(ch,0,0);g.restore()}
 // ---------- layout ----------
 const pairR=i=>{const n=PAIRS.length,w=(A.W-12)/(A.narrow?3:n),row=A.narrow?Math.floor(i/3):0,col=A.narrow?i%3:i,cnt=A.narrow&&row?2:3;
  const x=A.narrow?(A.W-cnt*w)/2+col*w:6+col*w,h=A.narrow?A.H*.42:A.H*.7;return{x:x+3,y:(A.narrow?A.H*.06+row*A.H*.47:A.H*.12),w:w-6,h}};
 const halfR=(i,k)=>{const r=pairR(i);return{x:r.x+k*r.w/2,y:r.y,w:r.w/2,h:r.h}};
 const letters=()=>SETS[A.step]||[];
 function box(i){const n=letters().length,cw=(A.W-16)/n,h=Math.min(A.H*.58,cw*1.15),w=h*.7;return{x:8+cw*i+(cw-w)/2,y:A.H*.14,w,h}}
 const P=(i,pt)=>{const b=box(i);return{x:b.x+pt[0]*b.w/.7,y:b.y+pt[1]*b.h}};
 const tol=()=>Math.max(22,box(0).h*.11);
 const sizeR=j=>{const w=(A.W-24)/3;return{x:8+j*(w+4),y:A.H*.2,w,h:A.H*.62}};
 // ---------- drawing ----------
 function drawPairs(g){const C=A.col;PAIRS.forEach((pr,i)=>{const r=pairR(i),got=G.found.includes(i);g.fillStyle=A.alpha(got?C.gr:C.mu,.1);A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=got?C.gr:A.alpha(C.tx,.3);g.lineWidth=got?3:1.5;g.stroke();
   const h=Math.min(r.h*.42,r.w*.42),top=r.y+(r.h-h*1.45)/2;rules(g,r.x+4,r.w-8,top,h);
   pr.forEach((ch,k)=>{const hr=halfR(i,k),bad=G.bad&&G.bad[0]===i&&G.bad[1]===k,cap=ch===ch.toUpperCase();
    g.save();g.font=`700 100px system-ui,sans-serif`;g.textBaseline='alphabetic';const m=g.measureText('H'),s=h/(m.actualBoundingBoxAscent||72);g.translate(hr.x+hr.w/2,top+h);g.scale(s,s);g.fillStyle=bad?C.rd:got&&cap?C.gr:C.tx;g.textAlign='center';g.textBaseline='alphabetic';g.fillText(ch,0,0);g.restore()});
   if(got)txt(g,'✓ capital',r.x+r.w/2,r.y+r.h-sz(10),10,C.gr)})}
 function drawTrace(g){const C=A.col,T=tol();letters().forEach((ch,i)=>{const b=box(i);rules(g,b.x-10,b.w+20,b.y,b.h);
   L[ch].forEach(([pts],s)=>{const key=ch+s,did=G.done[key],live=G.cur&&G.cur.ch===ch&&G.cur.s===s;g.lineCap='round';g.lineJoin='round';
    g.strokeStyle=did?C.ac:A.alpha(C.tx,.22);g.lineWidth=did?10:14;g.beginPath();pts.forEach((p,k)=>{const q=P(i,p);k?g.lineTo(q.x,q.y):g.moveTo(q.x,q.y)});g.stroke();
    if(live&&G.idx>0){g.strokeStyle=C.ac;g.lineWidth=10;g.beginPath();pts.slice(0,G.idx+1).forEach((p,k)=>{const q=P(i,p);k?g.lineTo(q.x,q.y):g.moveTo(q.x,q.y)});g.stroke()}
    if(!did){const q=P(i,pts[0]),q2=P(i,pts[Math.min(2,pts.length-1)]);g.fillStyle='#16a34a';g.beginPath();g.arc(q.x,q.y,Math.max(9,T*.42),0,7);g.fill();
     const a=Math.atan2(q2.y-q.y,q2.x-q.x);g.strokeStyle='#fff';g.lineWidth=2.5;g.beginPath();g.moveTo(q.x-Math.cos(a)*5,q.y-Math.sin(a)*5);g.lineTo(q.x+Math.cos(a)*6,q.y+Math.sin(a)*6);g.stroke()}});
   const all=L[ch].every((x,s)=>G.done[ch+s]);txt(g,all?`✓ ${ch}`:ch,b.x+b.w/2,b.y+b.h*1.32,13,all?C.gr:C.tx)});
  if(G.warn){const q=G.warn;g.strokeStyle=C.rd;g.lineWidth=4;g.beginPath();g.arc(q.x,q.y,T,0,7);g.stroke()}
  txt(g,'Start on a green dot and follow the grey path',A.W/2,A.H*.94,10,C.tx,700)}
 function drawSize(g){const C=A.col;if(G.want>=CHECK.length){txt(g,'All 4 checked!',A.W/2,A.H*.4,18,C.gr);return}const[ch,kinds]=CHECK[G.want];
  txt(g,`Which ${ch} is made well?`,A.W/2,A.H*.08,14,C.tx);kinds.forEach((k,j)=>{const r=sizeR(j),bad=G.pick===j&&k!=='ok';g.fillStyle=A.alpha(bad?C.rd:C.mu,.1);A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=bad?C.rd:A.alpha(C.tx,.3);g.lineWidth=bad?3:1.5;g.stroke();
   const h=Math.min(r.h*.5,r.w*.6),top=r.y+(r.h-h*1.4)/2;rules(g,r.x+6,r.w-12,top,h);glyph(g,ch,r.x+r.w/2,top,h,C.tx,k);txt(g,String(j+1),r.x+14,r.y+14,10,C.tx)})}
 function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#fef9c3',C.dark?.03:.3);g.fillRect(0,0,W,H);const m=mode();
  if(m==='pairs')drawPairs(g);if(m==='trace')drawTrace(g);if(m==='size')drawSize(g);if(m==='quiz'){rules(g,W*.2,W*.6,H*.25,H*.4);glyph(g,'A',W*.4,H*.25,H*.4,C.tx,'ok');glyph(g,'a',W*.6,H*.25,H*.4,C.tx,'ok')}A.fx.draw(g)}
 // ---------- actions ----------
 function pickPair(i,k){if(G.found.includes(i))return;const ch=PAIRS[i][k];
  if(ch!==ch.toUpperCase()){G.bad=[i,k];A.sound.miss();tell(`That is ${SMALL_SAY[ch]}. A capital reaches the top line and sits on the base line.`);A.redraw();return}
  G.bad=null;G.found.push(i);A.sound.pop();report(`Yes, capital ${ch}. It is tall and sits on the line.`)}
 const strokes=()=>letters().flatMap(ch=>L[ch].map((x,s)=>({ch,s,pts:x[0],ok:x[1],no:x[2]})));
 const left=()=>strokes().filter(x=>!G.done[x.ch+x.s]);
 function finish(st){G.done[st.ch+st.s]=1;G.cur=null;G.idx=0;G.warn=null;A.sound.pop();const all=L[st.ch].every((x,s)=>G.done[st.ch+s]);report(all?`You made capital ${st.ch}!`:'Good stroke. Lift your pencil.')}
 function wrongWay(st,how){G.warn=P(letters().indexOf(st.ch),st.pts[st.pts.length-1]);A.sound.miss();
  const vert=Math.abs(st.pts[0][0]-st.pts[st.pts.length-1][0])<.05,curve=st.pts.length>9;
  tell(curve?(st.ch==='D'?'For D the curve starts at the top and goes round to the right.':'Start near the top and go over the top to the left, the other way to a clock.'):vert||st.pts[0][1]<st.pts[st.pts.length-1][1]-.2?'Start at the top and pull down. Capitals start at the top line.':'Go across from left to right, the way we read.');buttons()}
 function choose(st,right){if(!right){wrongWay(st);return}finish(st)}
 function pickSize(j){if(G.want>=CHECK.length)return;const k=CHECK[G.want][1][j];G.pick=j;
  if(k!=='ok'){A.sound.miss();tell(WHY[k]);A.redraw();return}A.sound.pop();G.pick=null;G.want++;report('Yes: tall, on the line, facing the right way.')}
 function report(msg){const m=mode();let t='';
  if(m==='pairs')t=G.found.length<PAIRS.length?`Tap the capital in each box. ${PAIRS.length-G.found.length} to find.`:'All capitals found.';
  else if(m==='trace'){const l=left();t=l.length?`Next: ${l[0].ch}, stroke ${l[0].s+1}. ${l[0].ok}.`:'All letters made.'}
  else if(m==='size')t=G.want<CHECK.length?`Which ${CHECK[G.want][0]} is made well? Box 1, 2 or 3.`:'All checked.';
  tell((msg?msg+' ':'')+t);buttons();G.onChange()}
 function buttons(){if(!A||!pad)return;pad.innerHTML='';const m=mode(),b=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);e.onclick=f;return e};
  if(m==='pairs')PAIRS.forEach((pr,i)=>{if(!G.found.includes(i))pr.forEach((ch,k)=>b(ch,()=>pickPair(i,k),`Box ${i+1}: letter ${ch}${ch===ch.toUpperCase()?' (tall one)':' (short one)'}`))});
  if(m==='trace'){const st=left()[0];if(st){const flip=(st.s+letters().indexOf(st.ch))%2;const o=[[st.ok,1],[st.no,0]];(flip?o.reverse():o).forEach(([t,r])=>b(t,()=>choose(st,r),`${st.ch} stroke ${st.s+1}: ${t}`))}}
  if(m==='size'&&G.want<CHECK.length)[0,1,2].forEach(j=>b(`${CHECK[G.want][0]} number ${j+1}`,()=>pickSize(j)));
  A.redraw()}
 // ---------- tracing on the canvas ----------
 const near=(p,q,r)=>Math.hypot(p.x-q.x,p.y-q.y)<=r;
 function down(p){const m=mode();
  if(m==='pairs'){PAIRS.forEach((pr,i)=>[0,1].forEach(k=>{const r=halfR(i,k);if(p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h)pickPair(i,k)}));return false}
  if(m==='size'){[0,1,2].forEach(j=>{const r=sizeR(j);if(p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h)pickSize(j)});return false}
  if(m!=='trace')return false;const T=tol(),L2=left();
  const st=L2.find(x=>near(p,P(letters().indexOf(x.ch),x.pts[0]),T));if(st){G.cur=st;G.idx=0;G.warn=null;A.redraw();return true}
  const back=L2.find(x=>near(p,P(letters().indexOf(x.ch),x.pts[x.pts.length-1]),T));if(back){wrongWay(back);return false}
  tell('Put your finger on a green dot to start.');return false}
 function move(p){const st=G.cur;if(!st)return;const i=letters().indexOf(st.ch),T=tol();
  for(let k=G.idx+1;k<=Math.min(st.pts.length-1,G.idx+4);k++)if(near(p,P(i,st.pts[k]),T*1.3))G.idx=k;
  if(!near(p,P(i,st.pts[G.idx]),T*3)){G.cur=null;G.idx=0;A.sound.miss();tell('Oops, you left the path. Start again on the green dot.')}A.redraw()}
 function up(){const st=G.cur;if(!st)return;if(G.idx>=st.pts.length-1)finish(st);else{G.cur=null;G.idx=0;tell('Keep going right to the end of the path.');A.redraw()}}
 // ---------- steps ----------
 const whenDone=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
 const later=(fns,ms)=>{const k=G.tok;fns.forEach((f,j)=>setTimeout(()=>{if(k===G.tok)f()},A.reduced()?j*20+20:(j+1)*ms))};
 const fresh=()=>{G.tok++;G.onChange=()=>{};Object.assign(G,{found:[],bad:null,done:{},cur:null,idx:0,warn:null,want:0,pick:null})};
 const autoTrace=()=>{const fns=[];strokes().forEach(st=>{fns.push(()=>{G.cur=st;G.idx=0});for(let k=1;k<st.pts.length;k+=Math.max(1,Math.floor(st.pts.length/6)))fns.push(()=>{G.idx=k;A.redraw()});fns.push(()=>{G.idx=st.pts.length-1;up()})});return fns};
 const traceDone=n=>whenDone(n,()=>!left().length,['','Straight lines: start at the top, go down, then across left to right.','Slanted lines start at the top too.','Curves start near the top and go over to the left. D goes round to the right.'][n]);
 const steps=[
  {h:'Capital or small?',p:'Capital letters are tall. They touch the top line and sit on the base line. Tap the capital in each box.',
   predict:{q:'Small p hangs below the line. Does capital P hang down too?',opts:['Yes, it hangs down too','No, it sits on the line'],ans:1},task:'Find 5 capitals',
   show:()=>{steps[0].go();later(PAIRS.map((pr,i)=>()=>pickPair(i,pr.findIndex(ch=>ch===ch.toUpperCase()))),400)},go:()=>{fresh();report();G.onChange=whenDone(0,()=>G.found.length>=PAIRS.length,'Every capital touches the top line and sits on the base line.')}},
  {h:'Start at the top',p:'Put your finger on a green dot. Follow the path to the end. Each line starts at the top or on the left.',
   predict:{q:'Where does your pencil start for the long line in L?',opts:['At the bottom','At the top'],ans:1},task:'Make L and E',
   show:()=>{steps[1].go();later(autoTrace(),90)},go:()=>{fresh();report();G.onChange=traceDone(1)}},
  {h:'Slanted lines',p:'A and X have slanted lines. Start each one at the top and slide down.',task:'Make A and X',
   show:()=>{steps[2].go();later(autoTrace(),90)},go:()=>{fresh();report();G.onChange=traceDone(2)}},
  {h:'Curvy capitals',p:'C and O start near the top and go over to the left. D is a line, then a curve round to the right.',
   predict:{q:'Which way does O go round?',opts:['Over the top to the left, like C','Round to the right first'],ans:0},task:'Make C, O and D',
   show:()=>{steps[3].go();later(autoTrace(),70)},go:()=>{fresh();report();G.onChange=traceDone(3)}},
  {h:'Made well?',p:'A good capital is tall, sits on the line and faces the right way. Tap the one that is made well.',task:'Check 4 capitals',
   show:()=>{steps[4].go();later(CHECK.map(x=>()=>pickSize(x[1].indexOf('ok'))),450)},go:()=>{fresh();report();G.onChange=whenDone(4,()=>G.want>=CHECK.length,'Tall, on the line, the right way round.')}},
  {h:'Challenge',p:'',go:()=>{fresh();pose()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>G.onChange()});
 // ---------- challenge ----------
 const QS=[['Where do you start the down line of T?','✏️',[['At the top','ok'],['At the bottom','bottom'],['In the middle','mid']]],
  ['Which one is a capital?','🔤',[['R','ok'],['r','small'],['n','small']]],
  ['How tall is a capital letter?','📏',[['Up to the top line','ok'],['Up to the dashed line','short'],['Below the line','hang']]],
  ['Which way does C go?','🌙',[['Over the top to the left','ok'],['Round to the right','clock'],['Start at the bottom','bottom']]],
  ['Does capital G hang below the line like small g?','🪝',[['No, it sits on the line','ok'],['Yes, it hangs down','hang'],['It floats above the line','float']]],
  ['Which way do you draw the line across the middle of A?','➡️',[['Left to right','ok'],['Right to left','rtl'],['From the top','mid']]]];
 function slip(tag){let m='Look at the writing lines again.';
  if(tag==='bottom')m='Capitals start at the top. Pull the pencil down from the top line.';
  if(tag==='small')m='That is a small letter. A capital is tall and touches the top line.';
  if(tag==='short')m='The dashed line is for small letters like e. Capitals go up to the top line.';
  if(tag==='hang')m='Some small letters hang down, like g and p. Capitals sit on the line.';
  if(tag==='clock')m='C and O go over the top to the left. Only D goes round to the right.';
  if(tag==='rtl')m='Lines across go left to right, the same way we read.';
  if(tag==='float')m='Capitals sit right on the base line, not above it.';
  if(tag==='mid')m='Start at the top or on the left, not in the middle.';
  return m}
 let qk=-1,stars=0;
 function pose(){qk++;const[q,e,ops]=QS[qk%QS.length],turn=qk%3;
  quiz.innerHTML=`<p><b>${e} ${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const r=quiz.querySelector('.fl-pick');ops.slice(turn).concat(ops.slice(0,turn)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},r,o);b.onclick=()=>mark(tag)});tell('Challenge: '+q);A.redraw()}
 function mark(tag){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),good=tag==='ok';
  if(good){stars++;A.win()}else{stars=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Yes!':'✗ '+slip(tag)}${good?` Stars: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}
 A=FK.shell(c,{steps,ratio:.6,tall:1.05,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
  init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Actions'},w);quiz=E('div',{class:'fl-chal'},A.below);
   fresh();A.gest({down,move,up});buttons()}});
 A.start()})})();
