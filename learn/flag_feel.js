/* Flagship 58 – naming basic emotions (ages 5–7, with a grown-up): pull a face's eyebrows and mouth to make happy, sad,
   angry and scared, and see which clue tells sad from angry; match feeling words to body clues (arms up, slumped,
   fists, hiding); then build any face in the sandbox. Challenge: read a face, read a body, name a feeling for a story
   (more than one answer can fit), and why every feeling is OK. Big handles and buttons, few words. */
(()=>{const F=['happy','sad','angry','scared'],FACE={happy:{b:0,m:.9},sad:{b:.4,m:-.8},angry:{b:-.9,m:-.6},scared:{b:1,m:0},calm:{b:0,m:.15}},
 BODY=[[1,'Shoulders drop, head hangs down, a tear'],[2,'Fists tight, feet stamping, face red'],[0,'Arms up, jumping, big smile'],[3,'Hands up, shaking, hiding']],
 STORY=[['Your tower falls down.',[1,2]],['A big dog barks at you.',[3]],['A friend shares a cake with you.',[0]],['You lose your teddy.',[1,3]],['Someone pushes in front of you.',[2,1]],['It is your birthday party!',[0]]];
// which basic feeling a face shows (b: eyebrows −1 down … +1 up, m: mouth −1 down … +1 up)
function feel(b,m){if(m>=.4)return b<-.4?'mixed':'happy';if(b>=.6&&m>-.4)return'scared';if(b<=-.4)return'angry';if(m<=-.3)return b>=.15?'sad':'frown';return'calm'}
VIS.reg('flagfeel',c=>{let A,pad,chal,read;c.fig.classList.add('young');
 const G={b:0,m:.15,dr:null,on:[],chip:0,dp:null,flash:0,want:()=>{},Q:null,said:'',tok:0,miss:0};
 const tell=t=>{G.said=t;c.say(t);if(read){read.textContent=t;A.cv.setAttribute('aria-label',t)}};
 const mode=()=>['face','face','face','face','body','face','q'][A.step],cl=v=>Math.max(-1,Math.min(1,v));
 const ft=(x,w,z,a)=>{x.font=`${w} ${z}px system-ui,sans-serif`;x.textAlign=a||'center';x.textBaseline='middle'};
 const bw=b=>b<=-.4?'pulled down and close together':b>=.6?'up high':b>=.15?'up in the middle':'relaxed',mw=(b,m)=>m>=.4?'curving up':m<=-.3?'turned down':b>=.6?'open wide':'flat';
 function status(){let t;if(mode()==='face'){const f=feel(G.b,G.m);t=`Eyebrows ${bw(G.b)}. Mouth ${mw(G.b,G.m)}. `+(f==='calm'?'This face looks calm.':f==='mixed'?'A smile with angry eyebrows: a mixed-up face.':f==='frown'?'A frown. Sad or angry? Move the eyebrows to show which.':`This face looks ${f}.`)}
  else{t=`${G.on.length} of 4 feeling words placed.`+(G.on.length<4?` Next word: ${F[G.chip]}.`:' Every child has a name for their feeling.')}tell(t);sync();G.want()}
 // ---- geometry ----
 const fg=()=>{const R=Math.min(A.W*.27,(A.H-40)*.36);return{cx:A.W/2,cy:A.H*.47,R}};
 const handles=()=>{const f=fg();return{b:{x:f.cx,y:f.cy-f.R*.62},m:{x:f.cx,y:f.cy+f.R*.46}}};
 const kids=()=>{const w=(A.W-16)/4;return BODY.map((k,i)=>({x:8+w*i+w/2,y:A.H*.62,w,k:k[0]}))};
 const chipR=i=>{const w=Math.min(84,(A.W-40)/4),g=(A.W-w*4)/5;return{x:g+i*(w+g),y:12,w,h:48}};
 // ---- drawing ----
 function face(x,cx,cy,R,b,m,mini){const C=A.col,f=feel(b,m);x.fillStyle=f==='angry'&&!mini?'#fca5a5':'#fcd34d';x.beginPath();x.arc(cx,cy,R,0,7);x.fill();
  const wide=Math.max(0,b-.5)*2,lift=wide*R*.12;
  [-1,1].forEach(s=>{const ex=cx+s*R*.36,ey=cy-R*.12;x.fillStyle='#fff';x.beginPath();x.ellipse(ex,ey,R*.14,R*.13*(1+wide*.45),0,0,7);x.fill();x.fillStyle='#1f2937';x.beginPath();x.arc(ex,ey,R*(.07-wide*.015),0,7);x.fill();
   const oy=cy-R*.4-lift,iy=oy+(b<0?-b*R*.17:-Math.min(b,1)*R*.13);x.strokeStyle='#78350f';x.lineWidth=Math.max(3,R*.07);x.lineCap='round';x.beginPath();x.moveTo(cx+s*R*.58,oy);x.lineTo(cx+s*R*.14,iy);x.stroke()});
  const my=cy+R*.45,w=R*.55;x.strokeStyle='#7f1d1d';x.lineWidth=Math.max(3,R*.07);
  if(b>=.6&&Math.abs(m)<.4){x.fillStyle='#7f1d1d';x.beginPath();x.ellipse(cx,my,R*.14,R*.19,0,0,7);x.fill()}
  else{x.beginPath();x.moveTo(cx-w/2,my);x.quadraticCurveTo(cx,my+m*R*.4,cx+w/2,my);x.stroke()}
  if(f==='happy'){x.fillStyle='rgba(244,114,182,.45)';[-1,1].forEach(s=>{x.beginPath();x.arc(cx+s*R*.58,cy+R*.2,R*.12,0,7);x.fill()})}
  if(f==='sad'){x.fillStyle='#38bdf8';x.beginPath();x.ellipse(cx-R*.36,cy+R*.14,R*.05,R*.09,0,0,7);x.fill()}
  if(mini){ft(x,700,13);x.fillStyle=C.tx;x.fillText(mini,cx,cy+R+12)}}
 function handle(x,h,lab){const C=A.col;x.fillStyle=A.alpha(C.ac,.22);x.beginPath();x.arc(h.x,h.y,24,0,7);x.fill();x.strokeStyle=C.ac;x.lineWidth=3;x.stroke();ft(x,800,18);x.fillStyle=C.tx;x.fillText('↕',h.x,h.y+1);
  ft(x,600,13,'left');x.fillText(lab,h.x+30,h.y)}
 function kid(x,o,pose){const C=A.col,hy=o.y-46+(pose===1?8:0),s=Math.min(1,o.w/80);x.save();x.translate(o.x,0);x.strokeStyle=C.tx;x.lineWidth=3;x.lineCap='round';
  const sh=pose===3?Math.sin(performance.now()/40)*2*(A.reduced()?0:1):0;x.translate(sh,0);
  face(x,0,hy,16*s,FACE[F[pose]].b,FACE[F[pose]].m);x.strokeStyle=C.tx;x.lineWidth=3;
  x.beginPath();x.moveTo(0,hy+16);x.lineTo(0,o.y+20);x.stroke();
  const arms=[[[-22,-34],[22,-34]],[[-14,22],[14,22]],[[-22,6],[22,6]],[[-14,-24],[14,-24]]][pose],ay=o.y-14+(pose===1?8:0);
  arms.forEach(([dx,dy])=>{x.beginPath();x.moveTo(0,ay);x.lineTo(dx*s,ay+dy*s);x.stroke();if(pose===2){x.fillStyle=C.tx;x.beginPath();x.arc(dx*s,ay+dy*s,5,0,7);x.fill()}});
  [[-12,52],[12,52]].forEach(([dx,dy],i)=>{x.beginPath();x.moveTo(0,o.y+20);x.lineTo(dx*s,o.y+20+dy*s*(pose===2&&i?.7:1)*.6);x.stroke()});
  if(pose===0){x.strokeStyle=C.am;[-1,1].forEach(q=>{x.beginPath();x.moveTo(q*18,o.y+52);x.lineTo(q*26,o.y+58);x.stroke()})}x.restore()}
 function draw(A){const{ctx:x,W,H,col:C}=A,m=mode();x.fillStyle=A.mix(C.pn,'#fce7f3',C.dark?.05:.35);x.fillRect(0,0,W,H);
  if(m==='face'){const f=fg(),h=handles();face(x,f.cx,f.cy,f.R,G.b,G.m);handle(x,h.b,'eyebrows');handle(x,h.m,'mouth');
   const n=feel(G.b,G.m);ft(x,800,A.narrow?24:28);x.fillStyle=C.tx;x.fillText(n==='mixed'?'mixed up?':n==='frown'?'sad or angry?':n,W/2,H-22)}
  else if(m==='body'){kids().forEach((o,i)=>{kid(x,o,o.k);const j=G.on.indexOf(o.k);ft(x,600,12);x.fillStyle=C.mu;x.fillText(String(i+1),o.x-o.w/2+10,o.y-70);
    if(G.on.includes(o.k)){ft(x,800,17);x.fillStyle=C.gr;x.fillText(F[o.k],o.x,o.y+76)}});
   F.forEach((n,i)=>{if(G.on.includes(i)||G.dr===i)return;const r=chipR(i);x.fillStyle=i===G.chip?A.alpha(C.ac,.3):A.alpha(C.ac,.12);A.paint.rrect(r.x,r.y,r.w,r.h,12);x.fill();x.strokeStyle=C.ac;x.lineWidth=2;x.stroke();ft(x,700,16);x.fillStyle=C.tx;x.fillText(n,r.x+r.w/2,r.y+r.h/2)});
   if(G.dr!=null&&G.dp){ft(x,800,18);x.fillStyle=C.ac;A.paint.rrect(G.dp.x-40,G.dp.y-22,80,44,12);x.fill();x.fillStyle='#fff';x.fillText(F[G.dr],G.dp.x,G.dp.y)}}
  else if(G.Q){if(G.Q.k==='face'){const f=fg();face(x,f.cx,f.cy,f.R,G.Q.b,G.Q.m)}else{const r=Math.min(W/11,40);F.forEach((n,i)=>face(x,W*(i+.5)/4,H*.42,r,FACE[n].b,FACE[n].m,n))}}
  if(G.flash>0){x.strokeStyle=A.alpha(C.gr,G.flash);x.lineWidth=6;x.strokeRect(3,3,W-6,H-6)}A.fx.draw(x)}
 // ---- actions ----
 const fresh=()=>{G.tok++;G.want=()=>{};G.Q=null;G.dr=null},play=(fs,ms=450)=>{const k=++G.tok;let i=0;const nx=()=>{if(k!==G.tok||i>=fs.length)return;fs[i++]();setTimeout(nx,A.reduced()?0:ms)};nx()};
 const set=(b,m)=>{A.tween(G,{b,m},A.reduced()?0:500,'io',status)};
 function nudge(k,d){G[k]=cl(Math.round((G[k]+d)*10)/10);A.sound.tick();status()}
 function place(w,kidIdx){if(G.on.includes(w))return;if(BODY[kidIdx][0]!==w){A.sound.miss();G.miss++;tell(`Look again: ${BODY[kidIdx][1].toLowerCase()}. That is not how ${F[w]} usually looks.`);return}
  G.on.push(w);A.sound.pop();const left=F.findIndex((n,i)=>!G.on.includes(i));G.chip=left<0?0:left;status()}
 function sync(){if(!A)return;if(A.step!==6)A.cv.setAttribute('aria-label',G.said);if(!pad)return A.redraw();pad.innerHTML='';
  const B=(t,f,dis,lab)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':lab||null},pad,t);e.disabled=!!dis;e.onclick=()=>f()};
  if(mode()==='face'){B('Eyebrows ↑',()=>nudge('b',.25),G.b>=1,'Eyebrows up');B('Eyebrows ↓',()=>nudge('b',-.25),G.b<=-1,'Eyebrows down');B('Mouth ↑',()=>nudge('m',.25),G.m>=1,'Mouth corners up');B('Mouth ↓',()=>nudge('m',-.25),G.m<=-1,'Mouth corners down')}
  else if(G.on.length<4)kids().forEach((o,i)=>B(`${i+1}`,()=>place(G.chip,i),0,`Put ${F[G.chip]} on child ${i+1}: ${BODY[i][1]}`));A.redraw()}
 // ---- steps ----
 const fin=(st,test,msg)=>()=>{if(A.step===st&&test()&&(!steps[st].predict||A.pred[st]!=null)){G.flash=1;A.tween(G,{flash:0},1100,'out');A.done(msg()+A.reveal(st))}};
 const faceStep=(st,want,start,msg)=>()=>{fresh();G.b=start.b;G.m=start.m;status();G.want=fin(st,()=>feel(G.b,G.m)===want,msg)};
 const steps=[
  {h:'Happy',p:'Drag the mouth up or down, or use the buttons.',predict:{q:'A happy mouth curves…',opts:['down, like a rainbow','up, like a cup','flat, like a line'],ans:1},
   task:'Make a happy face',show:()=>set(.1,.9),go:faceStep(0,'happy',FACE.calm,()=>'Happy! The ends of the mouth go up, and the cheeks lift.')},
  {h:'Sad',p:'Now make the face sad. Try the eyebrows too.',predict:{q:'On a sad face, the eyebrows…',opts:['go up in the middle','go down and push together','do not move'],ans:0},
   task:'Make a sad face',show:()=>set(.4,-.8),go:faceStep(1,'sad',FACE.happy,()=>'Sad. The mouth turns down and the eyebrows go up in the middle.')},
  {h:'Angry',p:'Keep the mouth turned down. Change only the eyebrows.',predict:{q:'Sad and angry mouths both turn down. What shows which one it is?',opts:['the mouth','the eyebrows','you cannot tell'],ans:1},
   task:'Make an angry face',show:()=>set(-.9,-.6),go:faceStep(2,'angry',FACE.sad,()=>'Angry. The eyebrows pull down and close together. That is the clue that tells angry from sad.')},
  {h:'Scared',p:'Push the eyebrows up high. Put the mouth in the middle.',task:'Make a scared face',show:()=>set(1,0),
   go:faceStep(3,'scared',FACE.calm,()=>'Scared. Big wide eyes, eyebrows up high and an open mouth.')},
  {h:'Body clues',p:'Bodies show feelings too. Drag each word onto a child, or press the child’s number.',
   predict:{q:'A child’s shoulders drop and the head hangs down. The child feels…',opts:['angry','sad','scared'],ans:1},task:'Give every child a feeling word',
   show:()=>play(F.map(()=>()=>place(G.chip,BODY.findIndex(k=>k[0]===G.chip)))),go:()=>{fresh();G.on=[];G.chip=0;G.miss=0;status();G.want=fin(4,()=>G.on.length===4,()=>'Fists and stamping: angry. Slumped and slow: sad. Jumping: happy. Shaking and hiding: scared.')}},
  {h:'Any face',p:'Make any face. Show it to your grown-up. Can they name it?',go:()=>{fresh();G.b=0;G.m=.15;status()}},
  {h:'Challenge',p:'',go:()=>{fresh();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>G.want()});
 // ---- challenge ----
 const KS=['face','story','body','face','ok','story','face','body'];let qn=-1,run=0;
 function ask(){qn++;const k=KS[qn%KS.length],j=qn%4;let q,ops,ok=[],t='';
  if(k==='face'){const n=F[(qn*3)%4],f=FACE[n];G.Q={k,b:cl(f.b+(qn%2?.08:-.05)),m:f.m};q='How does this face feel?';ok=[F.indexOf(n)];ops=F.map((x,i)=>[x,i])}
  else if(k==='body'){const s=BODY[(qn*3+1)%4];q=`${s[1]}. Which feeling fits?`;ok=[s[0]];ops=F.map((x,i)=>[x,i]);G.Q={k}}
  else if(k==='story'){const s=STORY[qn%STORY.length];q=`${s[0]} How might you feel?`;ok=s[1];ops=F.map((x,i)=>[x,i]);t=s[1].length>1?' More than one answer can fit.':'';G.Q={k,s}}
  else{q='Is it OK to feel angry?';ok=['y'];ops=[['Yes. All feelings are OK. Hitting is not.','y'],['No. Angry is a bad feeling.','bad'],['Only grown-ups get angry.','big']];G.Q={k}}
  G.Q.ok=ok;G.Q.q=q;chal.innerHTML=`<p><b>${q}</b>${t}</p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick'),o=ops.slice(j%ops.length).concat(ops.slice(0,j%ops.length));o.forEach(([s,v])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,s);b.onclick=()=>judge(v)});
  const say='Challenge: '+q+(k==='face'?` Eyebrows ${bw(G.Q.b)}, mouth ${mw(G.Q.b,G.Q.m)}.`:'');A.cv.setAttribute('aria-label',say);c.say(say);A.redraw()}
 function judge(v){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb'),Q=G.Q,want=F[Q.ok[0]];let m;
  if(Q.ok.includes(v))m=Q.k==='story'&&Q.ok.length>1?`Yes. ${Q.ok.map(i=>F[i]).join(' or ')} both fit. People can feel different things.`:'Yes!';
  else if(v==='bad')m='Angry is not bad. It tells you something feels unfair. What you do next matters.';
  else if(v==='big')m='Everyone gets angry sometimes: children and grown-ups.';
  else if(Q.k==='face'&&((v===1&&want==='angry')||(v===2&&want==='sad')))m=`Look at the eyebrows. ${want==='angry'?'Pulled down and together means angry.':'Up in the middle means sad.'}`;
  else if(Q.k==='face'&&v===0)m='The mouth does not curve up, so it is not a happy smile.';
  else if(Q.k==='face'&&want==='scared')m='Wide eyes, eyebrows up high and an open mouth: that is scared.';
  else if(Q.k==='face')m=`The mouth and eyebrows say ${want}.`;
  else if(Q.k==='body')m=`${BODY.find(s=>s[0]===Q.ok[0])[1]}: most people would read that as ${want}.`;
  else m=`Most people would not feel ${F[v]} here. ${Q.ok.map(i=>F[i]).join(' or ')} fits better.`;
  if(Q.ok.includes(v)){run++;A.win();fb.innerHTML=`✓ ${m} Stars: ${run}. <button type="button" class="linkish">Another →</button>`}
  else{run=0;A.sound.miss();fb.innerHTML=`✗ ${m} <button type="button" class="linkish">Another →</button>`}fb.querySelector('button').onclick=ask}
 A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;pad.hidden=A.step===6;sync()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
   A.every(()=>mode()==='body'&&!A.reduced()&&!G.on.includes(3));
   A.gest({down:p=>{const m=mode();G.dp=p;
     if(m==='face'){const h=handles(),f=fg();if(p.y<h.b.y+f.R*.35&&Math.abs(p.x-f.cx)<f.R*1.1){G.dr='b';G.y0=p.y;G.v0=G.b;return true}
      if(p.y>h.m.y-f.R*.3&&Math.abs(p.x-f.cx)<f.R*1.1){G.dr='m';G.y0=p.y;G.v0=G.m;return true}return false}
     if(m==='body'){for(let i=0;i<4;i++){const r=chipR(i);if(!G.on.includes(i)&&p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h+6){G.dr=i;G.chip=i;return true}}return false}return false},
    move:p=>{G.dp=p;if(G.dr==='b'||G.dr==='m'){G[G.dr]=cl(G.v0+(G.y0-p.y)/(fg().R*.45));status()}else A.redraw()},
    up:p=>{const d=G.dr;G.dr=null;if(typeof d==='number'){const i=kids().findIndex(o=>Math.abs(p.x-o.x)<o.w/2&&p.y>o.y-90);if(i>=0)place(d,i);else{G.chip=d;status()}}A.redraw()}});
   sync()}});
 A.start()})})();
