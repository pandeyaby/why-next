/* Flagship – the insect body plan (ages 7–9; NC England Y3/Y4 animals, NGSS 4-LS1-1). Name head, thorax, abdomen;
   legs only fit the thorax; place antennae, eyes, wings; moult an exoskeleton; sort minibeasts. Buttons for every action. */
(()=>{
 const PARTS=[['head','Head','the front part'],['thorax','Thorax','the middle part'],['abdomen','Abdomen','the back part']];
 const KIT=[['two antennae','head','Antennae grow on the head. Insects feel and smell with them.'],['two big eyes','head','The eyes are on the head, at the front.'],['front wings','thorax','Wings join the thorax, like the legs. Strong muscles in there move them.'],['back wings','thorax','Most insects have two pairs of wings, and both join the thorax.']];
 // [name, body parts, legs, insect?, why]
 const BUGS=[['ant',3,6,1,'No wings, but 6 legs and 3 parts, so an ant is an insect.'],['spider',2,8,0,'8 legs and 2 body parts. A spider is not an insect.'],['beetle',3,6,1,'6 legs on the thorax and 3 parts: a beetle is an insect.'],['woodlouse',7,14,0,'14 legs! A woodlouse is a cousin of crabs, not an insect.'],['butterfly',3,6,1,'6 legs and 3 parts, so a butterfly is an insect.'],['centipede',12,24,0,'Far more than 6 legs. A centipede is not an insect.']];
 VIS.reg('flaginsect',c=>{let A,pad,chal;c.fig.classList.add('young');
 const S={then:()=>{}};
 const view=()=>['parts','legs','kit','shell','sort','chal'][A.step];
 const INK='#1e293b',SOFT='#475569',RIM='#64748b',WHITE='#ffffff',OK='#047857',NO='#b91c1c',BAR='#ecfccb',HOT='#dcfce7',BODY='#7c2d12',BODY2='#9a3412',GLASS='#bae6fd',LEG='#292524',LEAF='#4d7c0f';
 const k=n=>Math.round(n*(A.narrow?1.05:1.2));
 function txt(g,s,x,y,n,col,al){g.font=`700 ${k(n)}px system-ui,sans-serif`;g.fillStyle=col||INK;g.textAlign=al||'center';g.textBaseline='middle';g.fillText(String(s),x,y)}
 function lines(g,s,max,n){g.font=`700 ${k(n)}px system-ui,sans-serif`;const out=[];let cur='';for(const w of s.split(' ')){const t=cur?cur+' '+w:w;if(cur&&g.measureText(t).width>max){out.push(cur);cur=w}else cur=t}out.push(cur);return out}
 function box(g,r,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=edge;g.lineWidth=lw||2;g.stroke()}
 const inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 function banner(g,s,col){const r={x:10,y:8,w:A.W-20,h:A.H*.12};box(g,r,BAR,LEAF,2);const L=lines(g,s,r.w-16,14);L.forEach((l,i)=>txt(g,l,A.W/2,r.y+r.h/2+(i-(L.length-1)/2)*k(18),14,col))}
 function footer(g){if(!S.msg)return;const L=lines(g,(S.bad?'✗ ':'✓ ')+S.msg,A.W-40,13),lh=k(13)+5,h=L.length*lh+10,y=A.H-h-6;box(g,{x:10,y,w:A.W-20,h},WHITE,S.bad?NO:OK,3);L.forEach((l,i)=>txt(g,l,A.W/2,y+5+lh*(i+.5),13))}
 const tell=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
 const miss=s=>{S.bad=true;S.msg=s;A.sound.miss();tell(s);A.redraw()};
 const hitOk=s=>{S.bad=false;S.msg=s;A.sound.pop()};
 const seg=()=>{const s=Math.min(A.W,A.H*1.25),y=A.H*.47,cx=A.W/2;return{head:{x:cx-s*.27,y,rx:s*.085,ry:s*.075},thorax:{x:cx-s*.1,y,rx:s*.1,ry:s*.08},abdomen:{x:cx+s*.17,y,rx:s*.18,ry:s*.11},s,y}};
 const onSeg=(p,e)=>((p.x-e.x)/e.rx)**2+((p.y-e.y)/e.ry)**2<=1.25;
 const whichSeg=p=>{const G=seg();return PARTS.map(x=>x[0]).find(n=>onSeg(p,G[n]))||null};
 function legPath(g,e,i,n,side,col){const G=seg(),t=n===1?.5:i/(n-1),x=e.x-e.rx*.6+t*e.rx*1.2,y=e.y+side*e.ry*.7,dx=(t-.5)*G.s*.12,len=G.s*.13;
  g.strokeStyle=col||LEG;g.lineWidth=3;g.lineCap='round';g.beginPath();g.moveTo(x,y);g.lineTo(x+dx*.6,y+side*len*.55);g.lineTo(x+dx*1.3,y+side*len);g.stroke()}
 function insect(g,o){const G=seg();o=o||{};
  if(o.wings)for(const [w,dx] of [[o.wings>1?2:0,-.02],[o.wings,.04]])if(w){g.fillStyle='rgba(186,230,253,.75)';g.strokeStyle='#0369a1';g.lineWidth=2;for(const sd of [-1,1]){g.beginPath();g.ellipse(G.thorax.x+G.s*(.12+dx),G.y-0+sd*G.s*.13,G.s*.17,G.s*.055,sd*(.35+dx*3),0,7);g.fill();g.stroke()}}
  const legs=o.legs||{};for(const n in legs){const L=legs[n]||0,e=G[n];const top=Math.ceil(L/2),bot=Math.floor(L/2);for(let i=0;i<top;i++)legPath(g,e,i,top,-1,n==='thorax'?LEG:NO);for(let i=0;i<bot;i++)legPath(g,e,i,bot,1,n==='thorax'?LEG:NO)}
  if(o.ant){g.strokeStyle=LEG;g.lineWidth=3;for(const sd of [-1,1]){g.beginPath();g.moveTo(G.head.x-G.head.rx*.6,G.y+sd*G.head.ry*.4);g.quadraticCurveTo(G.head.x-G.s*.14,G.y+sd*G.s*.06,G.head.x-G.s*.2,G.y+sd*G.s*.13);g.stroke()}}
  for(const n of ['abdomen','thorax','head']){const e=G[n];g.fillStyle=o.hl===n?'#c2410c':n==='thorax'?BODY2:BODY;g.beginPath();g.ellipse(e.x,e.y,e.rx,e.ry,0,0,7);g.fill();g.strokeStyle=o.bad===n?NO:INK;g.lineWidth=o.bad===n?4:2;g.stroke()}
  if(o.eyes){g.fillStyle='#111827';for(const sd of [-1,1]){g.beginPath();g.ellipse(G.head.x-G.head.rx*.3,G.y+sd*G.head.ry*.62,G.head.rx*.38,G.head.ry*.3,0,0,7);g.fill()}}
  if(o.names)for(const n of o.names){const e=G[n],lab=PARTS.find(x=>x[0]===n)[1];A.paint.label(lab,e.x,G.y+G.s*(n==='abdomen'?.15:n==='head'?-.17:.2),{bg:'#14532d',col:'#ffffff',font:`700 ${k(12)}px system-ui,sans-serif`})}}
 function drawParts(g){const want=PARTS[S.pi];banner(g,want?`Tap the ${want[1].toUpperCase()}: ${want[2]}.`:'Head, thorax, abdomen: three body parts.',want?INK:OK);insect(g,{names:S.named,bad:S.wrong,ant:true,legs:{thorax:6}})}
 function namePart(n){const want=PARTS[S.pi];if(!want)return;
  if(n===want[0]){S.wrong=null;S.named.push(n);S.pi++;hitOk(n==='head'?'The head is at the front. It has the eyes and antennae.':n==='thorax'?'The thorax is the middle part. The legs join here.':'The abdomen is the big back part. Food is digested here.');return update()}
  S.wrong=n;const got=PARTS.find(x=>x[0]===n);
  if(want[0]==='thorax'&&n==='abdomen')return miss('That is the abdomen, the big back part. The thorax is the smaller middle part.');
  if(want[0]==='abdomen'&&n==='thorax')return miss('That is the thorax, in the middle. The abdomen is the biggest part, at the back.');
  miss(`That is the ${got[1].toLowerCase()}, ${got[2]}. Find ${want[2]}.`)}
 const tray=()=>({x:A.W*.06,y:A.H*.68,w:A.W*.88,h:k(40)});
 function drawLegs(g){const n=S.legs.thorax;banner(g,n>=6?'6 legs, all on the thorax: 3 on each side.':`Put 6 legs on the insect. Legs on: ${n}.`,n>=6?OK:INK);insect(g,{legs:S.legs,ant:true,bad:S.wrong});
  if(n<6){const t=tray();box(g,t,WHITE,RIM,2);txt(g,`Leg box: ${6-n} left`,t.x+t.w/2,t.y+t.h/2,12,SOFT)}
  if(S.drag){g.strokeStyle=LEG;g.lineWidth=5;g.lineCap='round';g.beginPath();g.moveTo(S.drag.x-12,S.drag.y-10);g.lineTo(S.drag.x,S.drag.y);g.lineTo(S.drag.x+6,S.drag.y+14);g.stroke()}}
 function addLeg(n){if(S.legs.thorax>=6)return;
  if(n==='thorax'){S.wrong=null;S.legs.thorax++;A.sound.tick();S.msg='';if(S.legs.thorax===6)hitOk('Six legs, all joined to the thorax. Every insect has exactly 6.');return update()}
  S.wrong=n;miss(n==='head'?'Legs do not join the head. The head has eyes and antennae. Try the middle part.':'Legs do not join the abdomen, the biggest part. They join the thorax.')}
 const kitR=()=>({x:A.W/2-A.W*.24,y:A.H*.155,w:A.W*.48,h:k(36)});
 function drawKit(g){const q=KIT[S.ki],done=S.kit;banner(g,q?`Where do the ${q[0]} go? Tap that body part.`:'Head: eyes and antennae. Thorax: legs and wings.',q?INK:OK);
  insect(g,{legs:{thorax:6},ant:done.includes(0),eyes:done.includes(1),wings:done.includes(3)?2:done.includes(2)?1:0,bad:S.wrong,names:q?[]:['head','thorax','abdomen']});
  if(q){const r0=kitR(),r=S.drag?{...r0,x:S.drag.x-r0.w/2,y:S.drag.y-r0.h/2}:r0;box(g,r,GLASS,'#0369a1',3);txt(g,q[0],r.x+r.w/2,r.y+r.h/2,14)}}
 function fit(n){const q=KIT[S.ki];if(!q)return;
  if(n===q[1]){S.wrong=null;S.kit.push(S.ki);S.ki++;hitOk(q[2]);return update()}
  S.wrong=n;miss(q[1]==='head'?`The ${q[0]} are not on the ${n}. They are on the head, at the front.`:`Wings do not join the ${n}. They join the thorax, next to the legs.`)}
 function drawShell(g){const G=seg(),sz=.7+S.size*.1;banner(g,S.size>=3?'It moulted 3 times and grew each time.':S.tight?'Its hard case is tight. What now?':'A young insect. Help it grow 3 times.',S.size>=3?OK:INK);
  g.save();g.translate(A.W/2,G.y);g.scale(sz,sz);g.translate(-A.W/2,-G.y);insect(g,{legs:{thorax:6},ant:true,bad:S.tight?'abdomen':null});g.restore();
  if(S.tight){g.strokeStyle=NO;g.setLineDash([6,5]);g.lineWidth=3;g.beginPath();g.ellipse(A.W/2,G.y,G.s*.5*sz,G.s*.16*sz,0,0,7);g.stroke();g.setLineDash([])}
  if(S.old>0){g.globalAlpha=.35;g.save();g.translate(A.W*.82,A.H*.75);g.scale(.35,.35);g.translate(-A.W/2,-G.y);insect(g,{legs:{thorax:6}});g.restore();g.globalAlpha=1;txt(g,'old case',A.W*.82,A.H*.75+k(26),11,SOFT)}
  txt(g,`Size ${S.size+1} of 4`,A.W*.18,A.H*.75,13,SOFT)}
 function eat(){if(S.size>=3)return;if(S.tight)return miss('It is squashed! A hard case cannot stretch. It must moult first.');S.tight=true;S.msg='';A.sound.tick();tell('It ate and grew inside. Its hard case is now tight.');A.redraw()}
 function moult(){if(S.size>=3)return;if(!S.tight)return miss('Not yet: the case still fits. Eat first.');S.tight=false;S.size++;S.old++;hitOk(S.size>=3?'Moulted again: a new, bigger case.':'It crawled out of its old case. The new soft case stretched, then hardened.');update()}
 const binR=i=>{const gap=8,w=(A.W-20-gap)/2;return{x:10+i*(w+gap),y:A.H*.7,w,h:k(42)}};
 const bugR=()=>({x:A.W*.18,y:A.H*.16,w:A.W*.64,h:A.H*.46});
 function critter(g,b,r){const n=b[1],L=b[2],cx=r.x+r.w/2,cy=r.y+r.h*.48,span=r.w*.8,sw=span/n,rad=Math.min(sw*.55,r.h*.16),per=L/(n===3?1:n===2?1:n);
  g.lineCap='round';g.strokeStyle=LEG;g.lineWidth=2.5;
  for(let i=0;i<n;i++){const x=cx-span/2+sw*(i+.5),legs=n===3?(i===1?6:0):n===2?(i===0?8:0):2,ls=Math.max(1,legs/2);
   for(let j=0;j<legs;j++){const side=j%2?1:-1,t=Math.floor(j/2),dx=ls>1?(t/(ls-1)-.5)*sw*.9:0;g.beginPath();g.moveTo(x+dx*.4,cy);g.lineTo(x+dx,cy+side*rad*2.1);g.stroke()}}
  for(let i=0;i<n;i++){const x=cx-span/2+sw*(i+.5),rr=n===3?(i===2?1.25:i===1?.95:.8):n===2?(i===1?1.25:.9):.85;g.fillStyle=b[0]==='butterfly'?'#a16207':BODY;g.beginPath();g.ellipse(x,cy,rad*rr*(n>3?.7:1),rad*rr*.8,0,0,7);g.fill();g.strokeStyle=INK;g.lineWidth=1.5;g.stroke()}
  if(b[0]==='butterfly'){g.fillStyle='rgba(234,179,8,.55)';for(const sd of [-1,1]){g.beginPath();g.ellipse(cx-sw*.1,cy+sd*rad*2.4,sw*.9,rad*1.4,sd*.3,0,7);g.fill()}}
  txt(g,b[0],cx,r.y+r.h-k(14),15);txt(g,S.count?`${n} parts · ${L} legs`:'Count the legs and body parts',cx,r.y+k(14),12,SOFT)}
 function drawSort(g){const b=BUGS[S.bi];banner(g,b?'Insect or not? Drag the card to a box.':'Insects: 6 legs and 3 body parts, every time.',b?INK:OK);
  ['Insect','Not an insect'].forEach((t,i)=>{const r=binR(i);box(g,r,S.drag&&inR(S.drag,r)?HOT:WHITE,RIM,2.5);txt(g,`${t} (${S.tally[i]})`,r.x+r.w/2,r.y+r.h/2,14)});
  if(b){const r0=bugR(),r=S.drag?{...r0,x:S.drag.x-r0.w/2,y:S.drag.y-r0.h/2}:r0;box(g,r,'#fffbeb','#b45309',3);critter(g,b,r)}}
 function file(i){const b=BUGS[S.bi];if(!b)return;
  if((i===0)===!!b[3]){hitOk(b[4]);S.tally[i]++;S.bi++;S.count=false;return update()}
  S.count=true;if(b[0]==='spider')return miss('Count again: 8 legs and only 2 body parts. Spiders are arachnids, not insects.');
  if(b[0]==='woodlouse')return miss('It looks like a beetle, but count: 14 legs. A woodlouse is a crustacean.');
  if(b[0]==='centipede')return miss('Far more than 6 legs: not an insect.');
  if(b[0]==='ant')return miss('No wings does not matter. Count: 6 legs and 3 parts. It is an insect.');
  miss(`Count: ${b[2]} legs and ${b[1]} body parts. That is an insect.`)}
 function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#f8fafc',C.dark?.05:.5);g.fillRect(0,0,A.W,A.H);if(C.dark){g.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);g.fill()}
  const v=view();if(v==='parts')drawParts(g);if(v==='legs')drawLegs(g);if(v==='kit')drawKit(g);if(v==='shell')drawShell(g);if(v==='sort')drawSort(g);
  if(v==='chal'){banner(g,'3 parts, 6 legs on the thorax, antennae on the head.');insect(g,{legs:{thorax:6},ant:true,eyes:true,wings:2,names:['head','thorax','abdomen']})}
  footer(g);A.fx.draw(g)}
 function update(){const v=view();let s='Challenge.';
  if(v==='parts')s=PARTS[S.pi]?`Find the ${PARTS[S.pi][1]}, ${PARTS[S.pi][2]}. Named so far: ${S.named.join(', ')||'none'}.`:'All three parts named.';
  if(v==='legs')s=`${S.legs.thorax} of 6 legs attached to the thorax.`;
  if(v==='kit')s=KIT[S.ki]?`Place the ${KIT[S.ki][0]}: head, thorax or abdomen?`:'Antennae, eyes and wings all placed.';
  if(v==='shell')s=`Young insect size ${S.size+1} of 4. ${S.tight?'Its case is tight.':'Its case fits.'}`;
  if(v==='sort')s=BUGS[S.bi]?`Card: ${BUGS[S.bi][0]}. Insect or not?`:'All six minibeasts sorted.';
  tell((S.msg?S.msg+' ':'')+s);buttons();S.then()}
 function buttons(){if(!pad)return;pad.innerHTML='';const v=view(),b=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);e.onclick=f};
  if(v==='parts'&&PARTS[S.pi])PARTS.forEach(([n,N,d])=>b(`${N} (${d.replace('the ','')})`,()=>namePart(n),`${N}, ${d}`));
  if(v==='legs'&&S.legs.thorax<6)PARTS.forEach(([n,N])=>b(`Leg on ${N.toLowerCase()}`,()=>addLeg(n),`Attach a leg to the ${N.toLowerCase()}`));
  if(v==='kit'&&KIT[S.ki])PARTS.forEach(([n,N])=>b(`On the ${N.toLowerCase()}`,()=>fit(n),`Put the ${KIT[S.ki][0]} on the ${N.toLowerCase()}`));
  if(v==='shell'&&S.size<3){b('Eat and grow',eat,'Let the young insect eat and grow');b('Moult',moult,'Shed the old hard case')}
  if(v==='sort'&&BUGS[S.bi]){b('Insect',()=>file(0),`The ${BUGS[S.bi][0]} is an insect`);b('Not an insect',()=>file(1),`The ${BUGS[S.bi][0]} is not an insect`);b('Count for me',()=>{S.count=true;S.msg='';update()},'Show the count of legs and body parts')}
  A.redraw()}
 function down(p){const v=view();
  if(v==='parts'){const n=whichSeg(p);if(n&&PARTS[S.pi]){namePart(n);return true}return false}
  if(v==='legs'){if(S.legs.thorax>=6)return false;if(inR(p,tray())){S.drag={x:p.x,y:p.y};return true}const n=whichSeg(p);if(n){addLeg(n);return true}return false}
  if(v==='kit'){if(!KIT[S.ki])return false;if(inR(p,kitR())){S.drag={x:p.x,y:p.y};return true}const n=whichSeg(p);if(n){fit(n);return true}return false}
  if(v==='shell'){if(S.size>=3)return false;const G=seg();if(Math.abs(p.y-G.y)<G.s*.2){S.tight?moult():eat();return true}return false}
  if(v==='sort'){if(!BUGS[S.bi])return false;if(inR(p,bugR())){S.drag={x:p.x,y:p.y};return true}const i=[0,1].find(i=>inR(p,binR(i)));if(i!=null){file(i);return true}return false}return false}
 function move(p){if(S.drag){S.drag={x:p.x,y:p.y};A.redraw()}}
 function up(p){if(!S.drag)return;const at=p||S.drag,v=view();S.drag=null;
  if(v==='sort'){const i=[0,1].find(i=>inR(at,binR(i)));if(i!=null)return file(i)}
  else{const n=whichSeg(at);if(n)return v==='legs'?addLeg(n):fit(n)}A.redraw()}
 const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
 const play=(fs,gap)=>{const id=++S.run;fs.forEach((f,j)=>setTimeout(()=>{if(id===S.run)f()},j*(A.reduced()?30:gap)))};
 const reset=()=>{S.run=(S.run||0)+1;Object.assign(S,{then:()=>{},pi:0,named:[],wrong:null,legs:{head:0,thorax:0,abdomen:0},ki:0,kit:[],size:0,tight:false,old:0,bi:0,tally:[0,0],count:false,drag:null,msg:'',bad:false})};
 const steps=[
 {h:'Three body parts',p:'Tap each body part when its name comes up, or use the buttons.',
 predict:{q:'How many main body parts does every insect have?',opts:['3','2','6'],ans:0},
 task:'Name all 3 parts',show:()=>{steps[0].go();play(PARTS.map(x=>()=>namePart(x[0])),500)},go:()=>{reset();update();S.then=finish(0,()=>S.pi>=3,'Head, thorax and abdomen: 3 parts.')}},
 {h:'Where do the legs go?',p:'Drag legs from the leg box onto the insect, or tap a body part.',
 predict:{q:'Insect legs join on to which part?',opts:['The thorax (middle)','The abdomen (back)','Some on every part'],ans:0},
 task:'Attach 6 legs',show:()=>{steps[1].go();play(Array(6).fill(()=>addLeg('thorax')),260)},go:()=>{reset();update();S.then=finish(1,()=>S.legs.thorax>=6,'All 6 legs join the thorax.')}},
 {h:'Antennae, eyes and wings',p:'Drag each card onto the body part where it grows, or tap the part.',
 task:'Place 4 cards',show:()=>{steps[2].go();play(KIT.map(q=>()=>fit(q[1])),500)},go:()=>{reset();update();S.then=finish(2,()=>S.ki>=KIT.length,'The head senses. The thorax moves the legs and wings.')}},
 {h:'A skeleton on the outside',p:'Insects have no bones inside. Tap it or use the buttons to help it eat and grow.',
 predict:{q:'Where is an insect’s hard skeleton?',opts:['On the outside','Inside, like ours','It has no hard parts'],ans:0},
 task:'Grow 3 times',show:()=>{steps[3].go();play([eat,moult,eat,moult,eat,moult],380)},go:()=>{reset();update();S.then=finish(3,()=>S.size>=3,'The hard case is an exoskeleton. To grow, an insect moults it.')}},
 {h:'Insect or not?',p:'Count the legs and body parts. Drag each card to a box, or use the buttons.',
 predict:{q:'A spider has 8 legs. Is it an insect?',opts:['No','Yes, it is a minibeast','Only if it has wings'],ans:0},
 task:'Sort 6 minibeasts',show:()=>{steps[4].go();play(BUGS.map(b=>()=>file(b[3]?0:1)),420)},go:()=>{reset();update();S.then=finish(4,()=>S.bi>=BUGS.length,'Count first: 6 legs and 3 parts means insect.')}},
 {h:'Challenge',p:'',go:()=>{reset();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.then()});
 const Q=[['Which part do an insect’s legs join?','The thorax',[['The abdomen','abd'],['The head','headleg']]],
 ['How many legs does every insect have?','6',[['8','spider'],['It depends on its size','size']]],
 ['A woodlouse has 14 legs. Is it an insect?','No',[['Yes, it is a minibeast','mini'],['Yes, it looks like a beetle','looks']]],
 ['Where are the antennae?','On the head',[['On the thorax','antthor'],['On the abdomen','abd2']]],
 ['How does a young insect grow bigger?','It moults its hard case',[['Its bones grow longer','bones'],['Its case stretches','stretch']]]];
 function why(tag){let m='Count the body parts and legs, then check where each part joins.';
  if(tag==='abd')m='The abdomen is the biggest part, but legs do not join it. They join the thorax.';
  if(tag==='headleg')m='The head carries the eyes and antennae, not the legs.';
  if(tag==='spider')m='8 legs is a spider. Every insect has exactly 6.';
  if(tag==='size')m='Size does not change the rule: big or tiny, an insect has 6 legs and 3 parts.';
  if(tag==='mini')m='Minibeast just means a small animal with no backbone. Many minibeasts are not insects.';
  if(tag==='looks')m='Looks can fool you. Count: 14 legs means it is not an insect.';
  if(tag==='antthor')m='The thorax holds legs and wings. Antennae are on the head.';
  if(tag==='abd2')m='The abdomen is at the back. Antennae point forward from the head.';
  if(tag==='bones')m='Insects have no bones inside. Their skeleton is the hard outer case.';
  if(tag==='stretch')m='The hard case cannot stretch. The insect sheds it and grows a new one.';
  return m}
 let qn=-1,run=0;
 function ask(){qn++;const [q,ans,bad]=Q[qn%Q.length],all=[[ans,'ok']].concat(bad),r=qn%3,order=all.slice(r).concat(all.slice(0,r));
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');order.forEach(([w,tag])=>{const e=c.el('button',{type:'button',class:'lbtn'},row,w);e.onclick=()=>mark(tag,ans)});tell('Challenge: '+q);A.redraw()}
 function mark(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=chal.querySelector('.fl-fb');
  if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+run+'.':'✗ '+why(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
  init:A=>{const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}});
 A.start()})})();
