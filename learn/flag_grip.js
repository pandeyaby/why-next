/* Flagship 63 – sitting and holding a pencil (4–6): seat Pip, find the pencil spot, compare grips by drawing, tap where letters start. */
(()=>{const T2=Math.PI*2,arc=(cx,cy,rx,ry,a,b)=>{const n=Math.ceil(Math.abs(b-a)*10),o=[];for(let i=0;i<=n;i++){const t=a+(b-a)*i/n;o.push([cx+rx*Math.cos(t),cy+ry*Math.sin(t)])}return o};
 // letters in a box: x 0..1, y 0 = tall top, .4 = small top, 1 = line; first point = start. d: dots [x,y,name], first is right
 const LET={c:[arc(.5,.7,.28,.3,-.8,-.8-T2*.85)],o:[arc(.5,.7,.28,.3,-1.4,-1.4-T2)],l:[[[.5,0],[.5,1]]],
  n:[[[.3,.4],[.3,1]],[[.3,.62],...arc(.5,.62,.2,.2,Math.PI,T2),[.7,1]]],a:[[...arc(.5,.7,.28,.3,-.8,-.8-T2*.9),[.78,.42],[.78,1]]],
  d:[[...arc(.5,.7,.28,.3,-.8,-.8-T2*.9),[.78,0],[.78,1]]],t:[[[.45,.1],[.45,.95],[.6,1]],[[.25,.4],[.68,.4]]],e:[[[.22,.7],[.78,.7],...arc(.5,.7,.28,.3,0,-T2*.85)]]};
 const DOTS={c:[[.7,.49,'top'],[.5,1,'bottom'],[.5,.7,'middle']],o:[[.55,.4,'top'],[.5,1,'bottom'],[.2,.7,'left side']],l:[[.5,0,'top'],[.5,1,'bottom'],[.5,.5,'middle']],
  n:[[.3,.4,'top'],[.3,1,'bottom'],[.7,1,'bottom right']],a:[[.7,.49,'top'],[.78,1,'bottom'],[.5,.7,'middle']],d:[[.7,.49,'top of the round'],[.78,1,'bottom'],[.78,0,'top of the stick']],
  t:[[.45,.1,'top'],[.6,1,'bottom'],[.25,.4,'left of the cross']],e:[[.22,.7,'middle'],[.5,.4,'top'],[.5,1,'bottom']]};
 const FIX=[['feet','Feet on the floor'],['back','Sit up tall'],['hand','Other hand on the paper']];
 const ZONE=[['top','Too high. The pencil wobbles. Slide down.'],['mid','A bit high. Slide down to the paint, just above the wood.'],['ok','Just right! Fingers on the paint, just above the wood.'],['low','Too low. Fingers on the wood get in the way, and you cannot see your line.']];
 const GRIP=[['Fist',9,'A fist moves the whole arm. The line wobbles.'],['Flat fingers',5,'Flat fingers are stiff. The line is bumpy.'],['Pinch',.7,'Pinch with thumb and pointer, rest on the middle finger. Smooth!']];
VIS.reg('flaggrip',c=>{let A,pad,chal,read;c.fig.classList.add('young');
 const G={fix:{},hold:-1,hx:0,gr:-1,ink:[],tried:[],L:'c',seq:['c','l','n','o'],li:0,ok:[],an:0,drawing:0,dr:null,dp:null,p0:null,tok:0,want:()=>{},said:'',flash:0,Q:null,free:['a','d','t','e']};
 const tell=t=>{G.said=t;c.say(t);if(read){read.textContent=t;A.cv.setAttribute('aria-label',t)}};
 const mode=()=>['sit','hold','grip','let','let','q'][A.step];
 const ft=(x,w,z,a)=>{x.font=`${w} ${z}px system-ui,sans-serif`;x.textAlign=a||'center';x.textBaseline='middle'};
 const inR=(p,r)=>p&&p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
 function status(){const m=mode();let t;
  if(m==='sit')t='Pip at the table. '+FIX.map(([k,n])=>`${n}: ${G.fix[k]?'yes':'not yet'}`).join('. ')+'.';
  else if(m==='hold')t=G.hold<0?'A giant pencil. Drag the pinch onto it.':ZONE[G.hold][1];
  else if(m==='grip')t=G.gr<0?'Pick a grip, then draw a line on the paper.':`Grip: ${GRIP[G.gr][0]}. ${G.ink.length>8?GRIP[G.gr][2]:'Draw a line on the paper.'}`;
  else{const d=DOTS[G.L];t=`Letter ${G.L}. Where does it start? Dots: ${d.map(v=>v[2]).join(', ')}.`}
  tell(t);sync();G.want()}
 // ---------- sit
 const P=()=>{const W=A.W,H=A.H;return{fl:H*.9,seat:H*.62,hip:[W*.3,H*.6],tab:H*.46,pap:[W*.56,W*.84]}};
 const handle=k=>{const W=A.W,H=A.H;return k==='feet'?[W*.39,H*.8]:k==='back'?[W*.4,H*.32]:[W*.33,H*.7]};
 function sitView(x){const C=A.col,p=P(),W=A.W,H=A.H,F=G.fix,ink=C.tx;x.lineCap='round';x.lineJoin='round';
  x.fillStyle=A.alpha(C.tx,.08);x.fillRect(0,p.fl,W,H-p.fl);x.strokeStyle=A.alpha(C.tx,.5);x.lineWidth=6;
  x.beginPath();x.moveTo(W*.16,H*.3);x.lineTo(W*.16,p.fl);x.moveTo(W*.16,p.seat);x.lineTo(W*.34,p.seat);x.lineTo(W*.34,p.fl);x.stroke();
  x.beginPath();x.moveTo(W*.5,p.tab);x.lineTo(W*.96,p.tab);x.moveTo(W*.9,p.tab);x.lineTo(W*.9,p.fl);x.stroke();
  x.fillStyle='#fff';x.fillRect(p.pap[0],p.tab-6,p.pap[1]-p.pap[0],6);
  const hip=p.hip,sh=F.back?[W*.3,H*.3]:[W*.4,H*.36],hd=F.back?[W*.32,H*.21]:[W*.48,H*.3],r=Math.min(W,H)*.065;
  x.strokeStyle='#2563eb';x.lineWidth=Math.max(10,W*.03);x.beginPath();x.moveTo(...hip);if(F.back)x.lineTo(...sh);else x.quadraticCurveTo(W*.24,H*.38,...sh);x.stroke();
  const kn=[W*.42,p.seat-4],ft2=F.feet?[[W*.42,p.fl-6],[W*.48,p.fl-6]]:[[W*.36,H*.78],[W*.4,H*.8]];
  x.strokeStyle='#334155';x.beginPath();x.moveTo(...hip);x.lineTo(...kn);x.lineTo(...ft2[0]);x.lineTo(...ft2[1]);x.stroke();
  x.strokeStyle='#f2b38a';x.lineWidth=Math.max(7,W*.02);x.beginPath();x.moveTo(...sh);x.lineTo(W*.46,p.tab-24);x.lineTo(W*.6,p.tab-8);x.stroke();
  x.strokeStyle='#eab308';x.lineWidth=4;x.beginPath();x.moveTo(W*.6,p.tab-26);x.lineTo(W*.63,p.tab-6);x.stroke();
  x.strokeStyle='#f2b38a';x.lineWidth=Math.max(7,W*.02);x.beginPath();x.moveTo(...sh);
  if(F.hand){x.lineTo(W*.6,p.tab-30);x.lineTo(W*.76,p.tab-7)}else{x.lineTo(W*.31,H*.5);x.lineTo(W*.33,H*.68)}x.stroke();
  x.fillStyle='#f6c7a1';x.beginPath();x.arc(...hd,r,0,T2);x.fill();x.fillStyle='#1f2937';x.beginPath();x.arc(hd[0]+r*.45,hd[1]-r*.1,r*.12,0,T2);x.fill();
  FIX.forEach(([k])=>{if(F[k])return;const[hx,hy]=G.dr===k&&G.dp?[G.dp.x,G.dp.y]:handle(k);x.strokeStyle=C.ac;x.lineWidth=3;x.setLineDash([5,4]);x.beginPath();x.arc(hx,hy,26,0,T2);x.stroke();x.setLineDash([])});
  ft(x,700,A.narrow?13:15,'right');x.fillStyle=ink;FIX.forEach(([k,n],i)=>x.fillText(`${F[k]?'✓':'○'} ${n}`,W-10,18+i*22))}
 function fix(k){if(G.fix[k])return;G.fix[k]=1;A.sound.pop();const n=FIX.filter(([k])=>G.fix[k]).length;status();
  tell(k==='feet'?'Feet flat on the floor. Now Pip is steady.':k==='back'?'Sitting tall. Pip can see the paper and breathe.':'The other hand holds the paper still.');if(n===3){G.flash=1;A.tween(G,{flash:0},900,'out')}G.want()}
 // ---------- hold
 const pen=()=>({x0:A.W*.06,x1:A.W*.94,y:A.H*.3,h:Math.max(40,A.H*.13)});
 const zoneAt=x=>{const p=pen(),f=(x-p.x0)/(p.x1-p.x0);return f<.36?0:f<.66?1:f<.8?2:3};
 const pinchHome=()=>[A.W*.5,A.H*.62];
 function pinch(x,cx,cy){x.fillStyle='#f6c7a1';x.strokeStyle='#b45309';x.lineWidth=2;[[-1,'thumb'],[1,'finger']].forEach(([s])=>{x.beginPath();x.ellipse(cx,cy+s*22,15,11,0,0,T2);x.fill();x.stroke()})}
 function holdView(x){const C=A.col,p=pen(),L=p.x1-p.x0,h=p.h,y=p.y;
  x.fillStyle='#f9a8d4';x.fillRect(p.x0,y-h/2,L*.06,h);x.fillStyle='#facc15';x.fillRect(p.x0+L*.06,y-h/2,L*.74,h);x.strokeStyle='#a16207';x.lineWidth=2;x.strokeRect(p.x0,y-h/2,L*.8,h);
  x.fillStyle='#e7c9a0';x.beginPath();x.moveTo(p.x0+L*.8,y-h/2);x.lineTo(p.x0+L*.95,y-h*.12);x.lineTo(p.x0+L*.95,y+h*.12);x.lineTo(p.x0+L*.8,y+h/2);x.fill();
  x.fillStyle='#374151';x.beginPath();x.moveTo(p.x0+L*.95,y-h*.12);x.lineTo(p.x1,y);x.lineTo(p.x0+L*.95,y+h*.12);x.fill();
  ft(x,600,12);x.fillStyle=C.mu;x.fillText('paint',p.x0+L*.73,y-h/2-12);x.fillText('wood',p.x0+L*.87,y-h/2-12);
  const at=G.dr==='pinch'&&G.dp?[G.dp.x,G.dp.y]:G.hold>=0?[G.hx,y]:pinchHome();pinch(x,...at);
  const B={x:A.W*.08,y:A.H*.74,w:A.W*.84,h:A.H*.2};x.fillStyle='#fff';x.fillRect(B.x,B.y,B.w,B.h);
  if(G.hold>=0){const wob=[10,4,.6,2][G.hold];x.strokeStyle=G.hold===3?'#9ca3af':'#1f2937';x.lineWidth=G.hold===3?7:3;x.beginPath();
   for(let i=0;i<=40;i++){const X=B.x+16+(B.w-32)*i/40,Y=B.y+B.h/2+Math.sin(i*1.7)*wob+Math.sin(i*.9)*wob*.6;i?x.lineTo(X,Y):x.moveTo(X,Y)}x.stroke()}}
 function hold(z,px){const p=pen(),c2=[.2,.5,.73,.88][z];G.hold=z;G.hx=px!=null?px:p.x0+(p.x1-p.x0)*c2;G.dr=null;z===2?A.sound.pop():A.sound.miss();status()}
 // ---------- grip
 const cardR=i=>{const w=(A.W-40)/3,h=Math.min(92,A.H*.24);return{x:12+i*(w+8),y:10,w,h}};
 const paper=()=>({x:A.W*.06,y:A.H*.34,w:A.W*.88,h:A.H*.6});
 function gripPic(x,i,r){const cx=r.x+r.w/2,cy=r.y+r.h*.42,s=r.h*.3;x.save();x.translate(cx,cy);x.rotate(-.6);x.fillStyle='#facc15';x.fillRect(-4,-s*1.4,8,s*2.6);x.restore();
  x.fillStyle='#f6c7a1';x.strokeStyle='#b45309';x.lineWidth=2;
  if(i===0){A.paint.rrect(cx-s*.6,cy-s*.5,s*1.2,s,s*.4);x.fill();x.stroke()}
  else if(i===1)[[-1,-1],[0,0],[1,1]].forEach(([a,b])=>{x.beginPath();x.ellipse(cx+a*s*.55,cy+b*s*.45,s*.32,s*.22,-.6,0,T2);x.fill();x.stroke()});
  else[-2,-1,0,1,2].forEach(a=>{x.beginPath();x.ellipse(cx+a*s*.3,cy+a*s*.22,s*.2,s*.14,-.6,0,T2);x.fill();x.stroke()});
  ft(x,700,A.narrow?13:15);x.fillStyle=A.col.tx;x.fillText(GRIP[i][0],cx,r.y+r.h-12)}
 function gripView(x){const C=A.col;GRIP.forEach((g,i)=>{const r=cardR(i);x.fillStyle=G.gr===i?A.alpha(C.ac,.25):A.alpha(C.tx,.05);A.paint.rrect(r.x,r.y,r.w,r.h,12);x.fill();x.strokeStyle=G.gr===i?C.ac:A.alpha(C.tx,.25);x.lineWidth=2;x.stroke();gripPic(x,i,r)});
  const B=paper();x.fillStyle='#fff';A.paint.rrect(B.x,B.y,B.w,B.h,8);x.fill();if(!G.ink.length){ft(x,600,15);x.fillStyle='#6b7280';x.fillText(G.gr<0?'Pick a grip first':'Draw here',B.x+B.w/2,B.y+B.h/2)}
  x.strokeStyle='#1f2937';x.lineWidth=G.gr===0?6:3;x.beginPath();G.ink.forEach(([X,Y],i)=>i?x.lineTo(X,Y):x.moveTo(X,Y));x.stroke()}
 function ink(px,py){const j=GRIP[G.gr][1],B=paper(),X=Math.max(B.x+4,Math.min(B.x+B.w-4,px+(Math.random()-.5)*j*2)),Y=Math.max(B.y+4,Math.min(B.y+B.h-4,py+(Math.random()-.5)*j*2));G.ink.push([X,Y]);A.redraw()}
 function autoLine(){if(G.gr<0)return;const B=paper(),k=G.tok;G.ink=[];for(let i=0;i<=30;i++)ink(B.x+B.w*(.1+.8*i/30),B.y+B.h*(.5+.25*Math.sin(i/30*T2)));if(!G.tried.includes(G.gr))G.tried.push(G.gr);status()}
 function grip(i){G.gr=i;G.ink=[];A.sound.tick();status()}
 // ---------- letters
 const lbox=()=>{const s=Math.min(A.W*.66,A.H*.62);return{x:A.W/2-s*.5,y:Math.max(A.H*.14,(A.H-s)/2),s}};
 const lp=([u,v])=>{const b=lbox();return[b.x+u*b.s,b.y+v*b.s]};
 function strokes(x,L,f,col,w){const S=LET[L],tot=S.reduce((a,s)=>a+s.length-1,0);let left=f*tot;x.strokeStyle=col;x.lineWidth=w;x.lineCap='round';x.lineJoin='round';
  S.forEach(s=>{if(left<=0)return;x.beginPath();x.moveTo(...lp(s[0]));for(let i=1;i<s.length&&left>0;i++){const k=Math.min(1,left),a=lp(s[i-1]),b=lp(s[i]);x.lineTo(a[0]+(b[0]-a[0])*k,a[1]+(b[1]-a[1])*k);left-=1}x.stroke()})}
 function letView(x){const C=A.col,b=lbox();x.strokeStyle=A.alpha(C.tx,.3);x.lineWidth=2;[0,.4,1].forEach(v=>{x.setLineDash(v===.4?[6,6]:[]);x.beginPath();x.moveTo(12,b.y+v*b.s);x.lineTo(A.W-12,b.y+v*b.s);x.stroke()});x.setLineDash([]);
  const v=an();strokes(x,G.L,1,A.alpha(C.tx,.15),b.s*.12);if(v>0)strokes(x,G.L,v,C.ac,b.s*.09);
  if(v===0||v>=1)DOTS[G.L].forEach((d,i)=>{const[X,Y]=lp(d);x.fillStyle=v>=1&&i===0?C.gr:'#f59e0b';x.beginPath();x.arc(X,Y,Math.max(14,b.s*.07),0,T2);x.fill();x.strokeStyle='#fff';x.lineWidth=3;x.stroke()});
  ft(x,700,A.narrow?14:16,'left');x.fillStyle=C.tx;x.fillText(A.step===3?`Letter ${G.li+1} of 4`:'Your turn',12,16)}
 const an=()=>G.anK===G.tok?G.an:0;
 function pickDot(i){const v=an();if(v>0&&v<1)return;const d=DOTS[G.L];if(i!==0){A.sound.miss();
   tell(G.L==='e'&&d[i][2]==='top'?'Most letters start at the top, but e is different. It starts in the middle and goes across.':d[i][2].startsWith('bottom')?'Not the bottom. Letters start at the top.':`Not the ${d[i][2]}. Find where the pencil goes first.`);return}
  A.sound.pop();G.an=.001;G.anK=G.tok;const k=G.tok;A.tween(G,{an:1},A.reduced()?1:G.fast?450:1400,'io',()=>{if(k!==G.tok)return;if(!G.ok.includes(G.L))G.ok.push(G.L);
   tell(G.L==='e'?'e starts in the middle, goes across, then round.':`${G.L} starts at the ${d[0][2]}. Well done!`);sync();G.want();
   setTimeout(()=>{if(k!==G.tok)return;if(G.li<G.seq.length-1){G.li++;G.L=G.seq[G.li];G.an=0;status()}},A.reduced()?0:G.fast?200:900)})}
 function draw(A){const{ctx:x,W,H,col:C}=A,m=mode();x.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.03:.35);x.fillRect(0,0,W,H);
  if(m==='sit')sitView(x);else if(m==='hold')holdView(x);else if(m==='grip')gripView(x);else if(m==='let')letView(x);
  else if(G.Q&&G.Q.L){G.L=G.Q.L;G.an=0;letView(x)}
  if(G.flash>0){x.strokeStyle=A.alpha(C.gr,G.flash);x.lineWidth=6;x.strokeRect(3,3,W-6,H-6)}A.fx.draw(x)}
 const fresh=()=>{G.tok++;G.fast=0;G.want=()=>{};G.Q=null;G.dr=null};
 const later=(fs,ms)=>{const k=G.tok;fs.forEach((f,j)=>setTimeout(()=>{if(k===G.tok)f()},A.reduced()?0:j*ms))};
 const setSeq=s=>{G.seq=s;G.li=0;G.L=s[0];G.an=0;G.ok=[]};
 function sync(){if(!A)return;if(A.step!==5)A.cv.setAttribute('aria-label',G.said);if(!pad)return A.redraw();pad.innerHTML='';const m=mode();
  const B=(t,f,dis)=>{const e=c.el('button',{type:'button',class:'lbtn ghost'},pad,t);e.disabled=!!dis;e.onclick=f};
  if(m==='sit')FIX.forEach(([k,n])=>B(n,()=>fix(k),G.fix[k]));
  if(m==='hold')['Hold at the top','Hold in the middle','Hold on the paint, near the wood','Hold on the wood'].forEach((t,i)=>B(t,()=>hold(i)));
  if(m==='grip'){GRIP.forEach((g,i)=>B('Use '+g[0].toLowerCase(),()=>grip(i)));B('Draw a line',autoLine,G.gr<0);B('Clear',()=>{G.ink=[];status()})}
  if(m==='let')DOTS[G.L].map((d,i)=>[d,i]).sort((a,b)=>a[0][2]<b[0][2]?-1:1).forEach(([d,i])=>B('Start: '+d[2],()=>pickDot(i)));A.redraw()}
 const fin=(st,test,msg)=>()=>{if(A.step===st&&test()&&(!steps[st].predict||A.pred[st]!=null)){A.done(msg()+A.reveal(st))}};
 const steps=[
  {h:'Ready to write',p:'Help Pip sit ready. Drag the dotted circles, or tap the buttons.',
   predict:{q:'Where do your feet go when you write?',opts:['Flat on the floor','Swinging in the air','Tucked under the chair'],ans:0},task:'Get Pip ready to write',
   show:()=>later(FIX.map(([k])=>()=>fix(k)),450),go:()=>{fresh();G.fix={};status();G.want=fin(0,()=>FIX.every(([k])=>G.fix[k]),()=>'Feet flat, sit tall, other hand on the paper.')}},
  {h:'Where to hold',p:'Drag the pinch onto the pencil. Watch the line.',
   predict:{q:'Where do you hold a pencil?',opts:['Right on the sharp tip','On the paint, just above the wood','At the very top'],ans:1},task:'Find the best spot',
   show:()=>later([()=>hold(0),()=>hold(3),()=>hold(2)],600),go:()=>{fresh();G.hold=-1;status();G.want=fin(1,()=>G.hold===2,()=>'On the paint, just above the wood: the line is smooth and you can see it.')}},
  {h:'Pinch grip',p:'Pick a grip, then draw on the paper with your finger.',
   predict:{q:'Which grip draws the best line?',opts:['A tight fist','A pinch: two fingers and a rest','All fingers flat'],ans:1},task:'Find the smoothest grip',
   show:()=>later([()=>grip(0),autoLine,()=>grip(1),autoLine,()=>grip(2),autoLine],500),go:()=>{fresh();G.gr=-1;G.ink=[];G.tried=[];status();G.want=fin(2,()=>G.gr===2&&G.ink.length>20&&G.tried.length>1,()=>'Pinch with thumb and pointer, rest on the middle finger. Hold it gently.')}},
  {h:'Start at the top',p:'Tap the dot where the letter starts. Watch it write.',
   predict:{q:'Where do most letters start?',opts:['At the bottom','At the top','Anywhere'],ans:1},task:'Start all four letters',
   show:()=>{const k=G.tok;const go=()=>{if(k!==G.tok||G.ok.length>=4)return;pickDot(0);setTimeout(go,A.reduced()?10:800)};G.fast=1;go()},
   go:()=>{fresh();setSeq(['c','l','n','o']);status();G.want=fin(3,()=>G.ok.length>=4,()=>'c, l, n and o all start at the top.')}},
  {h:'Your turn',p:'More letters. One is different: watch out!',go:()=>{fresh();setSeq(G.free);status()}},
  {h:'Challenge',p:'',go:()=>{fresh();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>G.want()});
 const KS=['feet','spot','grip','hand','l','e','tight'];let qn=-1,run=0;
 function ask(){qn++;const k=KS[qn%KS.length],j=qn%3;let q,ops,L=null;
  if(k==='feet'){q='Where do your feet go?';ops=[['Flat on the floor','ok'],['Swinging','swing'],['Up on the chair','chair']]}
  else if(k==='spot'){q='Where do you hold the pencil?';ops=[['On the paint, near the wood','ok'],['On the sharp tip','tip'],['At the top','top']]}
  else if(k==='grip'){q='Which grip is best?';ops=[['Pinch: thumb and pointer','ok'],['A tight fist','fist'],['All fingers flat','flat']]}
  else if(k==='hand'){q='What does your other hand do?';ops=[['Holds the paper still','ok'],['Sits in my lap','lap'],['Holds up my head','head']]}
  else if(k==='l'){q='Where does l start?';L='l';ops=[['At the top','ok'],['At the bottom','bot'],['In the middle','mid']]}
  else if(k==='e'){q='Where does e start?';L='e';ops=[['In the middle','ok'],['At the top','etop'],['At the bottom','bot']]}
  else{q='How tight do you hold the pencil?';ops=[['Gently','ok'],['As tight as I can','squeeze'],['So loose it falls','loose']]}
  G.Q={k,L};chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');ops.slice(j%ops.length).concat(ops.slice(0,j%ops.length)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(tag)});
  tell('Challenge: '+q+(L?` The letter ${L} is shown with three dots.`:''));A.redraw()}
 function judge(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  if(tag==='ok')m='Yes!';
  else if(tag==='swing')m='Swinging feet make you wobble. Put them flat on the floor, or on a box.';
  else if(tag==='chair')m='Feet on the chair tip you over. Feet go flat on the floor.';
  else if(tag==='tip')m='On the tip, your fingers hide the line. Hold on the paint, just above the wood.';
  else if(tag==='top')m='At the top the pencil wobbles. Slide down to the paint near the wood.';
  else if(tag==='fist')m='A fist moves the whole arm, so the line wobbles. Pinch it instead.';
  else if(tag==='flat')m='Flat fingers are stiff. Pinch with thumb and pointer, rest on the middle finger.';
  else if(tag==='lap')m='Your other hand has a job: hold the paper so it does not slide.';
  else if(tag==='head')m='Sit tall instead. Your other hand holds the paper still.';
  else if(tag==='bot')m='Letters do not start at the bottom. Start at the top, except e.';
  else if(tag==='mid')m='l starts right at the top and goes down.';
  else if(tag==='etop')m='Most letters start at the top, but e starts in the middle.';
  else if(tag==='squeeze')m='Squeezing hurts your hand and makes it tired. Hold it gently.';
  else m='Too loose and the pencil falls. Gently, but firm enough to steer.';
  const ok=tag==='ok';if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Stars: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;read.hidden=A.step===5;pad.hidden=A.step===5;sync()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
   const near=(p,q,r)=>Math.hypot(p.x-q[0],p.y-q[1])<r;
   A.gest({down:p=>{const m=mode();G.dp=null;G.p0=p;
     if(m==='sit'){const k=FIX.map(f=>f[0]).find(k=>!G.fix[k]&&near(p,handle(k),40));if(k){G.dr=k;return true}return false}
     if(m==='hold'){const h=G.hold>=0?[G.hx,pen().y]:pinchHome();if(near(p,h,44)){G.dr='pinch';return true}const q=pen();if(Math.abs(p.y-q.y)<q.h&&p.x>q.x0&&p.x<q.x1)hold(zoneAt(p.x),p.x);return false}
     if(m==='grip'){const i=GRIP.findIndex((_,i)=>inR(p,cardR(i)));if(i>=0){grip(i);return false}if(G.gr>=0&&inR(p,paper())){G.ink=[];ink(p.x,p.y);G.dr='ink';return true}return false}
     if(m==='let'){const b=lbox(),i=DOTS[G.L].findIndex(d=>near(p,lp(d),Math.max(26,b.s*.1)));if(i>=0)pickDot(i);return false}return false},
    move:p=>{G.dp=p;if(G.dr==='ink')ink(p.x,p.y);else A.redraw()},
    up:p=>{const d=G.dr,tap=G.p0&&Math.hypot(p.x-G.p0.x,p.y-G.p0.y)<10;G.dr=null;G.dp=null;if(!d)return;
     if(d==='ink'){if(G.ink.length>8&&!G.tried.includes(G.gr))G.tried.push(G.gr);status()}
     else if(d==='pinch'){const q=pen();if(Math.abs(p.y-q.y)<q.h*1.6&&p.x>q.x0&&p.x<q.x1)hold(zoneAt(p.x),p.x);else A.redraw()}
     else{const ok=tap||(d==='feet'?p.y>A.H*.78:d==='back'?p.y<A.H*.4:p.x>P().pap[0]-20&&p.y<P().tab+30);if(ok)fix(d);else{A.sound.miss();tell(d==='feet'?'Drag the feet down to the floor.':d==='back'?'Drag Pip up tall.':'Drag the hand onto the paper.');A.redraw()}}}});
   sync()}});
 A.start()})})();
