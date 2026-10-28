/* Flagship – seeing 1, 2 or 3 at a glance (ages 3–4, with a grown-up): perceptual subitising. Dots flash on a plate and
   hide before there is time to count, and the child taps how many. Then: drag 3 dots far apart and find it is still 3
   (conservation of number), match dice faces to birds on a fence (same number, different arrangement), raise fingers to
   show a small group, and sort big and tiny things by how many, not by size. Every drag also works with buttons. */
(()=>{const lo=Math.min,hi=Math.max;
 const NW=['none','one','two','three'];
 const LAY={mid:[[0,0]],side:[[-.45,0],[.45,0]],up:[[0,-.45],[0,.45]],tri:[[0,-.5],[-.48,.36],[.48,.36]],line:[[-.6,0],[0,0],[.6,0]],slant:[[-.5,-.5],[0,0],[.5,.5]],diag:[[-.45,-.45],[.45,.45]]};
 const FL=[[3,'tri'],[1,'mid'],[2,'side'],[3,'line'],[2,'up'],[1,'mid'],[3,'slant']];
 const DIE={1:LAY.mid,2:LAY.diag,3:LAY.slant},FN=[2,3,1],FG=[2,3,1],ORD=[1,2,3,4,0];
 const GR=[{k:'ball',n:2,r:.2,t:'2 big balls'},{k:'bead',n:3,r:.045,t:'3 tiny beads'},{k:'moon',n:1,r:.3,t:'1 big moon'},{k:'mix',n:3,t:'1 big, 1 middle and 1 small ball'}];
VIS.reg('flagglance',c=>{let A,pad,chal,read;c.fig.classList.add('young');
 const S={gen:0,want:()=>{},note:'',drag:null,at:null,moved:0};
 const say=t=>{c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(read)read.textContent=t}};
 const view=()=>['flash','spread','dice','fingers','size','quiz'][A.step];
 const fz=z=>A.narrow?z:z+3;
 const txt=(x,t,X,Y,z,k,w)=>{x.font=`${w||800} ${fz(z)}px system-ui,sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillStyle=k;x.fillText(t,X,Y,A.W-16)};
 const M=()=>lo(A.W,A.H);
 function spots(x,pts,X,Y,s,r,k){pts.forEach(([u,v])=>A.paint.ball(X+u*s,Y+v*s,r,k))}
 function plate(x,X,Y,R){const C=A.col;A.paint.shadow(10,4,.22);x.fillStyle=A.mix(C.pn,'#ffffff',C.dark?.08:.7);x.beginPath();x.arc(X,Y,R,0,7);x.fill();A.paint.noShadow();
  x.strokeStyle=A.mix(C.ln,C.tx,.25);x.lineWidth=3;x.beginPath();x.arc(X,Y,R*.82,0,7);x.stroke()}
 function die(x,X,Y,s,v,ring){const C=A.col;A.paint.shadow(8,3,.25);x.fillStyle=C.dark?'#f1f5f9':'#ffffff';A.paint.rrect(X-s,Y-s,s*2,s*2,s*.28);x.fill();A.paint.noShadow();
  x.strokeStyle=ring||'#334155';x.lineWidth=ring?5:2.5;x.stroke();DIE[v].forEach(([u,w])=>{x.fillStyle='#111827';x.beginPath();x.arc(X+u*s*1.05,Y+w*s*1.05,s*.2,0,7);x.fill()})}
 function bird(x,X,Y,r){const C=A.col;A.paint.ball(X,Y,r,C.cy);x.fillStyle=C.am;x.beginPath();x.moveTo(X+r*.85,Y-r*.15);x.lineTo(X+r*1.45,Y);x.lineTo(X+r*.85,Y+r*.2);x.fill();
  x.fillStyle='#111827';x.beginPath();x.arc(X+r*.35,Y-r*.3,r*.14,0,7);x.fill()}
 function apple(x,X,Y,r){A.paint.ball(X,Y,r,A.col.rd);x.strokeStyle=A.col.gr;x.lineWidth=r*.22;x.beginPath();x.moveTo(X,Y-r*.8);x.quadraticCurveTo(X+r*.35,Y-r*1.35,X+r*.6,Y-r*1.25);x.stroke()}
 // ---- step 0: flash
 const tileP=i=>[A.W*(i+1)/4,A.H*.86],tileS=()=>lo(A.W*.1,A.H*.08);
 function flashV(x){const C=A.col,R=M()*.27,X=A.W/2,Y=A.H*.43,f=S.fl,[n,k]=FL[f.round%FL.length];plate(x,X,Y,R);
  if(f.shown)spots(x,LAY[k],X,Y,R*.62,R*.17,C.vi);
  else{x.fillStyle=A.mix(C.am,C.pn,C.dark?.45:.25);x.beginPath();x.arc(X,Y,R*.92,Math.PI,0);x.lineTo(X+R*.92,Y+R*.35);x.lineTo(X-R*.92,Y+R*.35);x.closePath();x.fill();txt(x,'?',X,Y-R*.15,34,C.tx)}
  [1,2,3].forEach((v,i)=>{const[tx,ty]=tileP(i),s=tileS();x.fillStyle=A.alpha(C.cy,.16);A.paint.rrect(tx-s,ty-s,s*2,s*2,14);x.fill();x.strokeStyle=C.cy;x.lineWidth=2.5;x.stroke();txt(x,String(v),tx,ty,26,C.tx)});
  txt(x,S.note||(f.shown?'Look!':'How many did you see?'),A.W/2,A.H*.07,15,C.tx);txt(x,'⭐'.repeat(f.got)||' ',A.W/2,A.H*.15,14,C.tx)}
 function peek(){const f=S.fl,g=S.gen,r=f.round;f.shown=1;A.sound.whoosh();A.redraw();setTimeout(()=>{if(g===S.gen&&f.round===r&&f.shown){f.shown=0;S.note='';tell('The cup is down. How many dots did you see?')}},1100)}
 function answer(v){const f=S.fl,n=FL[f.round%FL.length][0];if(f.got>=3)return;
  if(v!==n){S.note='';A.sound.miss();return say(`Not ${v}. There ${v>n?'were fewer':'were more'}. Tap the plate to peek again.`)}
  f.got++;f.round++;f.shown=1;A.sound.pop();tell(`Yes, ${NW[n]}! You saw it without counting.`);if(f.got<3){const g=S.gen;setTimeout(()=>{if(g===S.gen){f.shown=0;peek()}},500)}}
 // ---- step 1: spread
 const START=[[.4,.58],[.6,.58],[.5,.4]],FAR=[[.16,.3],[.84,.34],[.5,.82]];
 const dotR=()=>M()*.07,dp=d=>[d.x*A.W,d.y*A.H];
 const minGap=()=>{let m=1e9;S.sp.forEach((a,i)=>S.sp.forEach((b,j)=>{if(j>i)m=lo(m,Math.hypot((a.x-b.x)*A.W,(a.y-b.y)*A.H))}));return m};
 const spreadOK=()=>S.sp.every(d=>d.mv)&&minGap()>M()*.33;
 function spreadV(x){const C=A.col;x.fillStyle=A.alpha(C.gr,.12);A.paint.rrect(A.W*.05,A.H*.16,A.W*.9,A.H*.78,18);x.fill();
  S.sp.forEach((d,i)=>{const[X,Y]=dp(d);A.paint.ball(X,Y,dotR(),C.pk);if(S.drag===i){x.strokeStyle=C.tx;x.lineWidth=4;x.beginPath();x.arc(X,Y,dotR()+4,0,7);x.stroke()}});
  txt(x,S.note||(spreadOK()?'Far apart. Still 3!':'Drag the dots far apart'),A.W/2,A.H*.08,15,spreadOK()?C.gr:C.tx)}
 function spreadTo(P){S.sp.forEach((d,i)=>{d.mv=1;A.tween(d,{x:P[i][0],y:P[i][1]},500,'out',i===2?()=>tell():null)})}
 // ---- step 2: dice
 const fenceP=j=>[A.W*(j+1)/4,A.H*.3],dieP=v=>[A.W*v/4,A.H*.8],dieS=()=>lo(A.W*.075,A.H*.08);
 function diceV(x){const C=A.col,br=lo(A.W*.03,A.H*.035);
  FN.forEach((n,j)=>{const[X,Y]=fenceP(j),w=A.W*.11;x.fillStyle=A.mix(C.am,'#000',.25);x.fillRect(X-w,Y+br*1.1,w*2,6);x.fillRect(X-w*.85,Y+br,6,br*2.2);x.fillRect(X+w*.85-6,Y+br,6,br*2.2);
   const pts=n===1?[0]:n===2?[-.45,.45]:[-.6,0,.6];pts.forEach(u=>bird(x,X+u*w,Y,br));txt(x,'Fence '+'ABC'[j],X,Y-br*2.6,12,C.mu,700)});
  [1,2,3].forEach(v=>{if(S.drag===v-1&&S.moved&&S.at)return;const j=S.dc.on[v];const[X,Y]=j!=null?[fenceP(j)[0],A.H*.52]:dieP(v);die(x,X,Y,dieS(),v,S.dc.sel===v?C.tx:S.dc.bad===v?C.rd:null)});
  if(S.drag!=null&&S.moved&&S.at)die(x,S.at.x,S.at.y,dieS(),S.drag+1,C.tx);
  txt(x,S.note||'Put each dice by the fence that matches',A.W/2,A.H*.07,14,C.tx)}
 function place(v,j){const D=S.dc;D.sel=null;if(D.on[v]!=null)return;if(Object.values(D.on).includes(j)){S.note='';A.sound.miss();return say(`Fence ${'ABC'[j]} has a dice already. Pick another fence.`)}
  if(FN[j]!==v){D.bad=v;A.sound.miss();S.note='';tell(`That dice has ${v} dots. Fence ${'ABC'[j]} has ${FN[j]} birds. ${v>FN[j]?'Too many dots.':'Not enough dots.'} Try again.`);return}
  D.bad=null;D.on[v]=j;A.sound.pop();tell(`Yes! ${v} dots and ${v} birds. Same number, different look.`)}
 // ---- step 3: fingers
 const handP=()=>[A.W/2,A.H*.74];
 function fingerBox(i){const[X,Y]=handP(),s=M()*.06,up=S.fg.up[i],t=i===0;const fx=X+(i-2)*s*1.35+(t?-s*.5:0),len=up?s*(t?2:3.2):s*.9;return{x:fx-s*.5,y:(t?Y:Y-s*1.6)-len,w:s,h:len+s*.6,s}}
 function fingersV(x){const C=A.col,n=FG[S.fg.round%3],[X,Y]=handP(),s=M()*.06,skin=C.dark?'#e7b48f':'#f2c29b',edge='#7c4a2a';
  for(let i=0;i<n;i++)apple(x,A.W/2+(i-(n-1)/2)*s*2.6,A.H*.24,s*.85);
  for(let i=0;i<5;i++){const b=fingerBox(i);x.fillStyle=skin;A.paint.rrect(b.x,b.y,b.w,b.h,b.s*.5);x.fill();x.strokeStyle=edge;x.lineWidth=2;x.stroke()}
  x.fillStyle=skin;A.paint.rrect(X-s*3,Y-s*1.8,s*6,s*3.1,s*1.2);x.fill();x.strokeStyle=edge;x.stroke();
  const k=S.fg.up.filter(Boolean).length;txt(x,`${k} finger${k===1?'':'s'} up`,X,Y+s*.1,15,'#3b1d0e');
  txt(x,S.note||'Show the apples with your fingers',A.W/2,A.H*.07,14,C.tx);txt(x,'⭐'.repeat(S.fg.got)||' ',A.W/2,A.H*.14,13,C.tx)}
 function fingerSet(i,on){const F=S.fg;if(F.got>=3||F.wait)return;F.up[i]=on;A.sound.tick();const k=F.up.filter(Boolean).length,n=FG[F.round%3];
  if(k===n){F.got++;F.wait=1;A.sound.pop();tell(`Yes! ${n} apple${n>1?'s':''}, ${n} finger${n>1?'s':''}.`);const g=S.gen;setTimeout(()=>{if(g!==S.gen)return;F.wait=0;if(F.got<3){F.round++;F.up=[0,0,0,0,0]}tell()},600);return}
  tell(k>n?`${k} fingers is too many. There are ${n} apples. Fold one down.`:'')}
 const raise=d=>{const F=S.fg,i=d>0?ORD.find(i=>!F.up[i]):[...ORD].reverse().find(i=>F.up[i]);if(i!=null)fingerSet(i,d>0?1:0)};
 // ---- step 4: size
 const basketP=i=>[A.W*(i+1)/4,A.H*.84];
 function groupDraw(x,g,X,Y,s){const C=A.col;if(g.k==='mix'){[[-.62,.3],[0,.18],[.5,.08]].forEach(([u,r],i)=>A.paint.ball(X+u*s,Y,s*r,[C.or,C.cy,C.gr][i]));return}
  const xs=g.n===1?[0]:g.n===2?[-.5,.5]:[-.45,0,.45];xs.forEach(u=>{if(g.k==='moon'){x.fillStyle='#facc15';x.beginPath();x.arc(X,Y,s*g.r,0,7);x.fill();x.fillStyle=A.mix(C.pn,'#1e293b',.7);x.beginPath();x.arc(X+s*g.r*.45,Y-s*g.r*.2,s*g.r*.85,0,7);x.fill()}
   else A.paint.ball(X+u*s,Y,s*g.r,g.k==='ball'?C.or:C.vi)})}
 function sizeV(x){const C=A.col,g=GR[S.sz.i],s=M()*.9;
  [1,2,3].forEach((v,i)=>{const[X,Y]=basketP(i),w=lo(A.W*.11,A.H*.11);x.fillStyle=A.alpha(C.am,.2);A.paint.rrect(X-w,Y-w*.7,w*2,w*1.4,12);x.fill();x.strokeStyle=C.am;x.lineWidth=2.5;x.stroke();txt(x,String(v),X,Y,24,C.tx)});
  if(g){const[X,Y]=S.drag===0&&S.moved&&S.at?[S.at.x,S.at.y]:[A.W/2,A.H*.42];x.fillStyle=A.alpha(C.cy,.1);A.paint.rrect(X-A.W*.4,Y-A.H*.2,A.W*.8,A.H*.4,16);x.fill();groupDraw(x,g,X,Y,s*.55)}
  txt(x,S.note||(g?'How many? Drag it to a basket':'All sorted!'),A.W/2,A.H*.07,14,g?C.tx:C.gr)}
 function sortTo(v){const g=GR[S.sz.i];if(!g)return;
  if(v!==g.n){A.sound.miss();S.note='';const m=g.k==='ball'||g.k==='moon'?`Big things are not more. Each ${g.k} is just one.`:g.k==='bead'?'Tiny things still count. Each bead is one.':'Big, middle or small, each ball is one.';return tell(`Not ${v}. ${m} Look again.`)}
  S.sz.i++;A.sound.pop();tell(`Yes, ${g.t}: ${NW[g.n]}. Size does not change how many.`)}
 // ---- description + controls
 function tell(msg){const v=view();let t='';
  if(v==='flash')t=S.fl.got>=3?'You got 3 right.':`${S.fl.got} right so far.`;
  else if(v==='spread')t=`3 dots on the mat. They are ${spreadOK()?'far apart':'close together'}.`;
  else if(v==='dice')t=`Fence A has ${FN[0]} birds, B has ${FN[1]}, C has ${FN[2]}. Placed: ${[1,2,3].filter(k=>S.dc.on[k]!=null).map(k=>`${k} on ${'ABC'[S.dc.on[k]]}`).join(', ')||'none'}.`;
  else if(v==='fingers'){const n=FG[S.fg.round%3];t=S.fg.got>=3?'All 3 done.':`There ${n>1?'are':'is'} ${n} apple${n>1?'s':''}. You have ${S.fg.up.filter(Boolean).length} fingers up.`}
  else if(v==='size'){const g=GR[S.sz.i];t=g?`On the card: ${g.t}.`:'All 4 cards sorted.'}
  else t='Challenge time.';say((msg?msg+' ':'')+t);refresh();S.want()}
 function refresh(){if(!A||!pad)return;pad.innerHTML='';const v=view();
  const B=(t,f,al)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':al||null},pad,t);e.onclick=f};
  if(v==='flash'&&S.fl.got<3){B('👀 Peek',peek,'Show the dots again');[1,2,3].forEach(k=>B(String(k),()=>answer(k),`I saw ${k}`))}
  if(v==='spread'){B('↔ Spread out',()=>spreadTo(FAR),'Move the dots far apart');B('🤏 Bunch up',()=>spreadTo(START),'Move the dots close together')}
  if(v==='dice'){const D=S.dc;if(D.sel==null)[1,2,3].forEach(k=>{if(D.on[k]==null)B('🎲 '+k,()=>{D.sel=k;A.sound.tick();refresh()},`Pick the dice with ${k} dots`)});
   else{[0,1,2].forEach(j=>B('Fence '+'ABC'[j],()=>place(D.sel,j),`Put it by fence ${'ABC'[j]}`));B('✋ Another',()=>{D.sel=null;refresh()},'Pick another dice')}}
  if(v==='fingers'&&S.fg.got<3){B('☝ One more',()=>raise(1),'Put one more finger up');B('👇 One less',()=>raise(-1),'Fold one finger down')}
  if(v==='size'&&GR[S.sz.i])[1,2,3].forEach(k=>B('🧺 '+k,()=>sortTo(k),`Put it in basket ${k}`));
  A.redraw()}
 const ok=(st,cond,msg)=>()=>{if(A.step===st&&cond()&&(!steps[st].predict||A.pred[st]!=null))A.done(msg()+A.reveal(st))};
 const seq=(fs,gap)=>{const g=S.gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===S.gen)f()},j*gap))};
 const clear=()=>{S.gen++;S.want=()=>{};S.drag=null;S.at=null;S.note=''};
 const steps=[
  {h:'Quick look',p:'Tap the plate. The dots show for a moment, then hide. How many did you see? Do not count, just look.',task:'Get 3 quick looks right',
   show:()=>{steps[0].go();const a=()=>answer(FL[S.fl.round%FL.length][0]);seq([a,a,a],700)},
   go:()=>{clear();S.fl={round:0,got:0,shown:0};tell();peek();S.want=ok(0,()=>S.fl.got>=3,()=>'Small groups you just see. No counting needed.')}},
  {h:'Move them apart',p:'Here are 3 dots, close together. Drag them far apart.',predict:{q:'If the 3 dots go far apart, how many?',opts:['More than 3','Still 3'],ans:1},task:'Spread all 3 dots far apart',
   show:()=>{steps[1].go();spreadTo(FAR)},go:()=>{clear();S.sp=START.map(([x,y])=>({x,y,mv:0}));tell();S.want=ok(1,spreadOK,()=>'Close or far, it is still 3. Moving them does not change how many.')}},
  {h:'Dice and birds',p:'A dice shows a number with dots. Drag each dice to the fence with the same number of birds.',task:'Match all 3 dice',
   show:()=>{steps[2].go();seq([1,2,3].map(v=>()=>place(v,FN.indexOf(v))),500)},go:()=>{clear();S.dc={on:{},sel:null,bad:null};tell();S.want=ok(2,()=>Object.keys(S.dc.on).length===3,()=>'2 birds in a row and 2 dots on a slant are both two.')}},
  {h:'Show me with fingers',p:'Look at the apples. Tap fingers to put up the same number.',task:'Show 3 groups with your fingers',
   show:()=>{steps[3].go();const s=()=>{const F=S.fg,n=FG[F.round%3];ORD.slice(0,n).forEach((i,j)=>{if(j<n-1)F.up[i]=1});fingerSet(ORD[n-1],1)};seq([s,s,s],900)},
   go:()=>{clear();S.fg={round:0,got:0,up:[0,0,0,0,0],wait:0};tell();S.want=ok(3,()=>S.fg.got>=3,()=>'Your fingers can show a small number fast.')}},
  {h:'Big or tiny?',p:'Look at each card. How many things? Put it in the basket with that number.',predict:{q:'2 big balls or 3 tiny beads. Which has more?',opts:['The big balls','The tiny beads'],ans:1},task:'Sort all 4 cards',
   show:()=>{steps[4].go();seq(GR.map(g=>()=>sortTo(g.n)),450)},go:()=>{clear();S.sz={i:0};tell();S.want=ok(4,()=>S.sz.i>=GR.length,()=>'How many is about how many things, not how big they are.')}},
  {h:'Challenge',p:'',go:()=>{clear();quiz()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.want()});
 const QZ=[['How many dots?',{k:'tri',n:3},[['3','ok'],['2','less'],['4','more']]],
  ['The 3 dots move far apart. How many now?',{k:'far',n:3},[['3','ok'],['More than 3','spread'],['Less than 3','fewer']]],
  ['2 big balls and 3 tiny beads. Which group has more?',{k:'size'},[['The beads','ok'],['The balls','big'],['They are the same','same']]],
  ['This dice has 2 dots. How many birds match it?',{k:'die',n:2},[['2 birds','ok'],['3 birds','die3'],['1 bird','die1']]],
  ['The plate is empty. How many dots?',{k:'none',n:0},[['None','ok'],['1','zero1'],['3','zero3']]],
  ['How many apples? Show it with fingers.',{k:'apple',n:1},[['1 finger','ok'],['All 5 fingers','all'],['2 fingers','two']]]];
 let qn=-1,run=0;
 function quizV(x){const C=A.col,q=QZ[qn%QZ.length][1],X=A.W/2,Y=A.H/2,R=M()*.3;
  if(q.k==='size'){A.paint.ball(X-R*1.3,Y,R*.35,C.or);A.paint.ball(X-R*.5,Y,R*.35,C.or);[0,.25,.5].forEach(u=>A.paint.ball(X+R*(.7+u*1.2),Y,R*.08,C.vi));return}
  if(q.k==='die')return die(x,X,Y,R*.6,2);if(q.k==='apple')return apple(x,X,Y,R*.4);
  plate(x,X,Y,R);if(q.k==='far')spots(x,[[-.9,-.6],[.9,-.3],[0,.9]],X,Y,R*.7,R*.15,C.vi);else if(q.n)spots(x,LAY[q.k],X,Y,R*.62,R*.17,C.vi)}
 function quiz(){qn++;const[q,,ops]=QZ[qn%QZ.length],r=qn%3;
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>grade(tag)});say('Challenge: '+q);A.redraw()}
 function grade(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Yes!';break;
   case 'less':m='2 is one fewer. Look at the shape: 3 dots make a triangle.';break;
   case 'more':m='4 is one more than there is. Look again: 3 dots make a triangle.';break;
   case 'spread':m='Moving dots apart does not add any. Far apart or close, 3 is still 3.';break;
   case 'fewer':m='No dot went away. They only moved, so there are still 3.';break;
   case 'big':m='The balls are bigger, but there are only 2. The 3 beads are more.';break;
   case 'same':m='2 and 3 are not the same. 3 tiny beads is more than 2 big balls.';break;
   case 'die3':m='3 birds is one too many. The dice has 2 dots, so 2 birds match.';break;
   case 'die1':m='1 bird is one too few. The dice has 2 dots, so 2 birds match.';break;
   case 'zero1':m='There are no dots at all. An empty plate has none, or zero.';break;
   case 'zero3':m='Look again. The plate is empty, so there are none.';break;
   case 'all':m='All 5 fingers is 5. There is 1 apple, so put up 1 finger.';break;
   default:m='2 fingers is one too many. There is just 1 apple.'}
  const good=tag==='ok';if(good){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${good?'✓':'✗'} ${m}${good?` Stars: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
 function draw(A){const{ctx:x,W,H,col:C}=A,v=view();x.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.06:.4);x.fillRect(0,0,W,H);
  ({flash:flashV,spread:spreadV,dice:diceV,fingers:fingersV,size:sizeV,quiz:quizV})[v](x);A.fx.draw(x)}
 const near=(p,X,Y,d)=>Math.hypot(p.x-X,p.y-Y)<d;
 function down(p){const v=view();S.drag=null;S.at=null;S.moved=0;S.d0=p;
  if(v==='flash'){const i=[0,1,2].find(i=>near(p,...tileP(i),tileS()*1.3));if(i!=null)answer(i+1);else if(near(p,A.W/2,A.H*.43,M()*.3))peek();return false}
  if(v==='spread'){const i=S.sp.findIndex(d=>near(p,...dp(d),dotR()*1.8));if(i>=0){S.drag=i;return true}return false}
  if(v==='dice'){const k=[1,2,3].find(k=>S.dc.on[k]==null&&near(p,...dieP(k),dieS()*1.5));if(k){S.drag=k-1;return true}
   if(S.dc.sel){const j=[0,1,2].find(j=>near(p,...fenceP(j),A.W*.13));if(j!=null)place(S.dc.sel,j)}return false}
  if(v==='fingers'){for(let i=0;i<5;i++){const b=fingerBox(i);if(p.x>b.x-8&&p.x<b.x+b.w+8&&p.y>b.y-8&&p.y<b.y+b.h){fingerSet(i,S.fg.up[i]?0:1);break}}return false}
  if(v==='size'){const i=[0,1,2].find(i=>near(p,...basketP(i),A.W*.12));if(i!=null){sortTo(i+1);return false}if(GR[S.sz.i]&&near(p,A.W/2,A.H*.42,A.W*.4)){S.drag=0;return true}return false}return false}
 function move(p){if(S.drag==null)return;if(Math.hypot(p.x-S.d0.x,p.y-S.d0.y)>10)S.moved=1;S.at=p;const v=view();
  if(v==='spread'){const d=S.sp[S.drag];d.x=hi(.08,lo(.92,p.x/A.W));d.y=hi(.2,lo(.9,p.y/A.H))}A.redraw()}
 function up(p){const i=S.drag,v=view(),moved=S.moved;S.drag=null;S.moved=0;S.at=null;if(i==null)return;
  if(v==='spread'){if(moved)S.sp[i].mv=1;return tell(moved?'':'Drag a dot to move it.')}
  if(v==='dice'){if(!moved){S.dc.sel=i+1;A.sound.tick();return tell(`Dice with ${i+1} dots picked. Now tap a fence.`)}const j=[0,1,2].find(j=>near(p,...fenceP(j),A.W*.14)||near(p,fenceP(j)[0],A.H*.5,A.W*.12));if(j!=null)place(i+1,j);else A.redraw();return}
  if(v==='size'){const b=[0,1,2].find(b=>near(p,...basketP(b),A.W*.14));if(moved&&b!=null)sortTo(b+1);else A.redraw()}}
 A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;read.hidden=A.step===5;pad.hidden=A.step===5;refresh()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
   S.fl={round:0,got:0,shown:0};A.gest({down,move,up});refresh()}});
 A.start()})})();
