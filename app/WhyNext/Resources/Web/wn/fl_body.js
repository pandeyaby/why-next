/* Flagship – naming parts of my body (ages 2–3, with a grown-up): tap head, tummy, hands and toes on a child figure,
   tap "head, shoulders, knees and toes" in song order from top to bottom, drag a hand and a foot to bend the elbow and
   the knee, tap the part that helps you walk, clap, eat or hug, then build a body by dragging head, arms and legs to
   the right place. */
(()=>{const lo=Math.min,hi=Math.max;
 const NAME={head:'head',shoulders:'shoulders',elbows:'elbow',hands:'hands',tummy:'tummy',knees:'knee',toes:'toes',mouth:'mouth',arms:'arm',legs:'leg'};
 const FIND=['head','tummy','hands','toes'],SONG=['head','shoulders','knees','toes'];
 const JOB=[['🚶','walk',['legs','knees','toes'],'Legs and feet help you walk.'],['👏','clap',['hands'],'You clap with your hands.'],
  ['🍎','eat',['mouth'],'Your mouth helps you eat.'],['🤗','hug',['arms','elbows','hands'],'Your arms give a big hug.']];
 const PIECE=[['head','🙂 Head'],['arms','💪 Arms'],['legs','🦵 Legs']],TRAY=[2,0,1];
VIS.reg('flagbody',c=>{let A,pad,chal,read;c.fig.classList.add('young');
 const S={fi:0,song:[],el:0,kn:0,ji:0,jok:0,built:[],drag:null,at:null,bad:null,flash:null,gen:0,want:()=>{}};
 const say=t=>{c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(read)read.textContent=t}};
 const view=()=>['find','song','bend','job','build','quiz'][A.step];
 const fz=z=>A.narrow?z:z+3;
 const txt=(x,t,X,Y,z,k,w)=>{x.font=`${w||800} ${fz(z)}px system-ui,sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillStyle=k;x.fillText(t,X,Y,A.W-16)};
 const wrap=(x,t,X,Y,w,z,k)=>{x.font=`800 ${fz(z)}px system-ui,sans-serif`;const L=[];let r='';t.split(' ').forEach(v=>{const q=r?r+' '+v:v;if(r&&x.measureText(q).width>w-6){L.push(r);r=v}else r=q});L.push(r);
  const g=fz(z)*1.2;L.forEach((l,i)=>txt(x,l,X,Y+(i-(L.length-1)/2)*g,z,k))};
 const RX=()=>{const g=G(side()),e=g.cx+2.1*g.u;return{x:(A.W+e)/2,w:A.W-e-4}};
 const oops=t=>{A.sound.miss();say(t);A.redraw()};
 // body geometry: unit u, centre cx
 const G=cx=>{const u=A.H*.105,y=A.H*.05;cx=cx==null?A.W*.5:cx;
  const ea=S.el*1.9,ka=S.kn*1.7,sh=[cx+1.1*u,y+2.15*u],el=[cx+1.55*u,y+3.4*u],hd=[el[0]+Math.sin(.25+ea)*1.25*u,el[1]+Math.cos(.25+ea)*1.25*u],
   kn=[cx+.6*u,y+6*u],ft=[kn[0]+Math.sin(ka)*1.5*u,kn[1]+Math.cos(ka)*1.5*u];
  return{u,cx,y,head:[cx,y+.95*u],r:.85*u,sh,el,hd,kn,ft,L:{sh:[2*cx-sh[0],sh[1]],el:[2*cx-el[0],el[1]],hd:[2*cx-el[0]-Math.sin(.25)*1.25*u,el[1]+Math.cos(.25)*1.25*u],kn:[2*cx-kn[0],kn[1]],ft:[2*cx-kn[0],kn[1]+1.5*u]}}};
 function zones(g){const u=g.u,L=g.L;return[['head',g.head,.9],['mouth',[g.cx,g.y+1.3*u],.32],['shoulders',g.sh,.45],['shoulders',L.sh,.45],['elbows',g.el,.4],['elbows',L.el,.4],
  ['hands',g.hd,.5],['hands',L.hd,.5],['tummy',[g.cx,g.y+3.5*u],.75],['arms',[(g.sh[0]+g.el[0])/2,(g.sh[1]+g.el[1])/2],.3],['arms',[(L.sh[0]+L.el[0])/2,(L.sh[1]+L.el[1])/2],.3],
  ['knees',g.kn,.42],['knees',L.kn,.42],['legs',[g.cx+.6*u,g.y+5.1*u],.38],['legs',[g.cx-.6*u,g.y+5.1*u],.38],['toes',[g.ft[0]+.15*u,g.ft[1]+.2*u],.55],['toes',[L.ft[0]-.15*u,L.ft[1]+.2*u],.55]]}
 function partAt(p,g){let best=null,d0=1e9;for(const[k,P,r]of zones(g)){const d=Math.hypot(p.x-P[0],p.y-P[1]);if(d<r*g.u*1.25&&d/(r+.2)<d0){d0=d/(r+.2);best=k}}return best}
 const ptsOf=(g,k)=>zones(g).filter(z=>z[0]===k).map(z=>z[1]);
 function limb(x,a,b,cc,w){x.strokeStyle=cc;x.lineWidth=w;x.lineCap='round';x.beginPath();x.moveTo(a[0],a[1]);x.lineTo(b[0],b[1]);x.stroke()}
 function person(x,g,only){const C=A.col,u=g.u,skin=A.mix(C.pn,'#f2b98c',C.dark?.55:.85),shirt=A.mix(C.cy,C.pn,.2),pants=A.mix(C.vi,C.pn,.2),L=g.L,has=k=>!only||only.includes(k);
  if(has('legs')){limb(x,[g.cx+.6*u,g.y+4.3*u],g.kn,pants,u*.62);limb(x,g.kn,g.ft,skin,u*.5);limb(x,[g.cx-.6*u,g.y+4.3*u],L.kn,pants,u*.62);limb(x,L.kn,L.ft,skin,u*.5);
   x.fillStyle=A.mix(C.rd,'#000',.2);[[g.ft,1],[L.ft,-1]].forEach(([f,s])=>{x.beginPath();x.ellipse(f[0]+s*.2*u,f[1]+.2*u,.45*u,.25*u,0,0,7);x.fill()})}
  if(has('arms')){limb(x,g.sh,g.el,shirt,u*.5);limb(x,g.el,g.hd,skin,u*.42);limb(x,L.sh,L.el,shirt,u*.5);limb(x,L.el,L.hd,skin,u*.42);
   x.fillStyle=skin;[g.hd,L.hd].forEach(h=>{x.beginPath();x.arc(h[0],h[1],.3*u,0,7);x.fill()})}
  x.fillStyle=shirt;A.paint.rrect(g.cx-1.15*u,g.y+1.9*u,2.3*u,2.6*u,.5*u);x.fill();
  if(has('head')){x.fillStyle=skin;x.beginPath();x.arc(g.head[0],g.head[1],g.r,0,7);x.fill();x.fillStyle='#3b2414';x.beginPath();x.arc(g.head[0],g.head[1]-.15*u,g.r,Math.PI*1.05,Math.PI*1.95);x.fill();
   x.fillStyle='#1f2937';[-.3,.3].forEach(d=>{x.beginPath();x.arc(g.cx+d*u,g.y+.95*u,.09*u,0,7);x.fill()});x.strokeStyle='#9f1239';x.lineWidth=2.5;x.beginPath();x.arc(g.cx,g.y+1.18*u,.25*u,.2,Math.PI-.2);x.stroke()}}
 function ring(x,P,r,k){x.strokeStyle=k;x.lineWidth=4;x.beginPath();x.arc(P[0],P[1],r,0,7);x.stroke()}
 function mark(x,g,k,col){const r=zones(g).find(z=>z[0]===k)[2]*g.u;ptsOf(g,k).forEach(P=>ring(x,P,r,col))}
 const side=()=>A.narrow?A.W*.3:A.W*.34;
 function findV(x){const C=A.col,g=G(side());person(x,g);if(S.flash)mark(x,g,S.flash[0],S.flash[1]?C.gr:C.rd);
  const T=S.fi>=4?'All found!':`Tap the ${NAME[FIND[S.fi]].toUpperCase()}`;const R=RX();wrap(x,T,R.x,A.H*.4,R.w,17,S.fi>=4?C.gr:C.tx);
  FIND.slice(0,S.fi).forEach((k,i)=>txt(x,'✓ '+NAME[k],R.x,A.H*(.58+i*.09),13,C.gr))}
 function songV(x){const C=A.col,g=G(side());person(x,g);S.song.forEach(k=>mark(x,g,k,C.gr));if(S.flash&&!S.flash[1])mark(x,g,S.flash[0],C.rd);
  const R=RX();SONG.forEach((k,i)=>txt(x,(i<S.song.length?'🎵 ':'')+(i+1)+'. '+k,R.x,A.H*(.25+i*.13),14,i<S.song.length?C.gr:i===S.song.length?C.tx:C.mu))}
 function bendV(x){const C=A.col,g=G(side());person(x,g);ring(x,g.hd,g.u*.45,S.el>=1?C.gr:C.am);ring(x,g.ft,g.u*.5,S.kn>=1?C.gr:C.am);
  if(S.el>=1)txt(x,'elbow',g.el[0]+g.u*.9,g.el[1],12,C.tx);if(S.kn>=1)txt(x,'knee',g.kn[0]+g.u*.9,g.kn[1],12,C.tx);
  txt(x,S.el>=1&&S.kn>=1?'Bendy elbow, bendy knee!':'Drag the hand up. Drag the foot up.',A.W*.5,A.H*.97,13,S.el>=1&&S.kn>=1?C.gr:C.tx)}
 function jobV(x){const C=A.col,g=G(side());person(x,g);if(S.flash)mark(x,g,S.flash[0],S.flash[1]?C.gr:C.rd);
  const R=RX();if(S.jok>=4)return wrap(x,'Every part has a job!',R.x,A.H*.45,R.w,15,C.gr);const j=JOB[S.ji];txt(x,j[0],R.x,A.H*.32,40,C.tx,400);wrap(x,`What helps you ${j[1]}?`,R.x,A.H*.55,R.w,14,C.tx)}
 const slot=k=>{const g=G(side()),u=g.u;return{head:[g.head[0],g.head[1]],arms:[g.cx+1.4*u,g.y+3*u],legs:[g.cx,g.y+6*u]}[k]};
 const trayP=i=>[RX().x,A.H*(.2+i*.27)];
 function buildV(x){const C=A.col,g=G(side());person(x,g,S.built);x.setLineDash([6,5]);x.strokeStyle=C.mu;x.lineWidth=2;
  PIECE.forEach(([k])=>{if(S.built.includes(k))return;const P=slot(k);x.beginPath();x.arc(P[0],P[1],g.u*.8,0,7);x.stroke()});x.setLineDash([]);
  TRAY.forEach((pi,i)=>{const[k,l]=PIECE[pi];if(S.built.includes(k))return;const P=S.drag===k&&S.at?[S.at.x,S.at.y]:trayP(i);
   const bw=lo(A.W*.3,RX().w);x.fillStyle=A.alpha(S.bad===k?C.rd:C.cy,.16);A.paint.rrect(P[0]-bw/2,P[1]-A.H*.1,bw,A.H*.2,14);x.fill();x.strokeStyle=S.bad===k?C.rd:C.cy;x.lineWidth=S.bad===k?4:2;x.stroke();txt(x,l,P[0],P[1],14,C.tx)});
  if(S.built.length>=3){const R=RX();wrap(x,'A whole body!',R.x,A.H*.45,R.w,16,C.gr)}}
 function draw(A){const{ctx:x,W,H,col:C}=A,v=view();x.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.05:.4);x.fillRect(0,0,W,H);
  const f={find:findV,song:songV,bend:bendV,job:jobV,build:buildV}[v];if(f)f(x);else txt(x,S.Q||'🧒',W/2,H/2,60,C.tx,400);A.fx.draw(x)}
 const what=k=>/s$/.test(NAME[k])?`Those are your ${NAME[k]}.`:`That is your ${NAME[k]}.`;
 function find(k){if(S.fi>=4)return;const w=FIND[S.fi];if(k!==w){S.flash=[k,0];const tip={head:'Your head is at the very top.',tummy:'Your tummy is in the middle, under your shirt.',hands:'Your hands are at the end of your arms.',toes:'Your toes are at the very bottom, on your feet.'}[w];return oops(`${what(k)} ${tip}`)}
  S.flash=[k,1];S.fi++;A.sound.pop();tell(`Yes! ${what(k)}`)}
 function sing(k){if(S.song.length>=4)return;const w=SONG[S.song.length];if(k!==w){S.flash=[k,0];return oops(S.song.includes(k)?`You did ${NAME[k]}. Next comes ${NAME[w]}.`:`${what(k)} The song goes down your body. Next is ${NAME[w]}.`)}
  S.flash=null;S.song.push(k);A.sound.tick();tell(['Head!','Shoulders!','Knees!','And toes!'][S.song.length-1])}
 function bend(which,v){if(which==='el'){S.el=v;if(v>=1&&!S.elOk){S.elOk=1;A.sound.pop();return tell('Your arm bends at the elbow.')}}else{S.kn=v;if(v>=1&&!S.knOk){S.knOk=1;A.sound.pop();return tell('Your leg bends at the knee.')}}A.redraw()}
 function anim(which,cb){A.tween(S,which==='el'?{el:1}:{kn:1},450,'io',()=>{bend(which,1);cb&&cb()})}
 function job(k){if(S.jok>=4)return;const j=JOB[S.ji];if(!j[2].includes(k)){S.flash=[k,0];return oops(`${what(k)} ${j[3]}`)}
  S.flash=[k,1];S.jok++;S.ji=lo(3,S.jok);A.sound.pop();tell(`Yes! ${j[3]}`)}
 function put(k,to){if(S.built.includes(k))return;if(to!==k){S.bad=k;return oops({head:'The head goes at the top, on your shoulders.',arms:'Arms go at the sides. They hang from your shoulders.',legs:'Legs go at the bottom. You stand on your feet.'}[k])}
  S.bad=null;S.sel=null;S.built.push(k);A.sound.pop();tell(`The ${NAME[k]}${k==='head'?'':'s'} go${k==='head'?'es':''} there!`)}
 function tell(msg){const v=view();let t;
  if(v==='find')t=S.fi>=4?'Head, tummy, hands and toes found.':`Find the ${NAME[FIND[S.fi]]}.`;
  else if(v==='song')t=`Song so far: ${S.song.map(k=>NAME[k]).join(', ')||'not started'}.`;
  else if(v==='bend')t=`Elbow ${S.elOk?'bent':'straight'}. Knee ${S.knOk?'bent':'straight'}.`;
  else if(v==='job')t=S.jok>=4?'All four jobs done.':`What helps you ${JOB[S.ji][1]}?`;
  else if(v==='build')t=`Body has: ${['body',...S.built.map(k=>NAME[k]+(k==='head'?'':'s'))].join(', ')}.`;else t='Challenge time.';
  say((msg?msg+' ':'')+t);refresh();S.want()}
 function refresh(){if(!A||!pad)return;pad.innerHTML='';const v=view();
  const B=(t,f,al)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':al||null},pad,t);e.onclick=f};
  const parts=(ks,f)=>ks.forEach(k=>B(NAME[k],()=>f(k),`Tap the ${NAME[k]}`));
  if(v==='find'&&S.fi<4)parts(['head','shoulders','tummy','hands','knees','toes'],find);
  if(v==='song'&&S.song.length<4)parts(['toes','knees','head','shoulders'],sing);
  if(v==='bend'){if(!S.elOk)B('💪 Bend the elbow',()=>anim('el'));if(!S.knOk)B('🦵 Bend the knee',()=>anim('kn'))}
  if(v==='job'&&S.jok<4)parts(['legs','hands','mouth','arms','head'],job);
  if(v==='build'&&S.built.length<3){TRAY.forEach(pi=>{const[k,l]=PIECE[pi];if(!S.built.includes(k))B((S.sel===k?'✋ ':'')+l,()=>{S.sel=k;A.sound.tick();tell(`${l.split(' ')[1]} picked. Where does it go?`)},`Pick the ${l.split(' ')[1].toLowerCase()}`)});
   if(S.sel&&!S.built.includes(S.sel))[['head','⬆ Top'],['arms','↔ Sides'],['legs','⬇ Bottom']].forEach(([to,l])=>B(l,()=>put(S.sel,to),`Put it at the ${l.split(' ')[1].toLowerCase()}`))};A.redraw()}
 const ok=(st,cond,msg)=>()=>{if(A.step===st&&cond()&&(!steps[st].predict||A.pred[st]!=null))A.done(msg()+A.reveal(st))};
 const seq=(fs,gap)=>{const g=S.gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===S.gen)f()},j*gap))};
 const clear=()=>{S.gen++;S.want=()=>{};S.drag=null;S.at=null;S.bad=null;S.flash=null};
 const steps=[
  {h:'Find it!',p:'This is Kit. Tap the part the words say. A grown-up can read it out.',task:'Find head, tummy, hands and toes',
   show:()=>{steps[0].go();seq(FIND.map(k=>()=>find(k)),420)},go:()=>{clear();S.fi=0;tell();S.want=ok(0,()=>S.fi>=4,()=>'Head at the top, tummy in the middle, hands on your arms, toes at the bottom.')}},
  {h:'Head, shoulders, knees and toes',p:'Sing the song and tap each part. The song goes from the top down.',
   predict:{q:'What comes after shoulders in the song?',opts:['Toes','Knees'],ans:1},task:'Tap the song parts in order',
   show:()=>{steps[1].go();seq(SONG.map(k=>()=>sing(k)),420)},go:()=>{clear();S.song=[];tell();S.want=ok(1,()=>S.song.length>=4,()=>'Head, shoulders, knees and toes: top to bottom.')}},
  {h:'Bendy parts',p:'Drag Kit\u2019s hand up. Then drag Kit\u2019s foot up. Where does it bend?',
   predict:{q:'Where does your leg bend?',opts:['It does not bend','At the knee'],ans:1},task:'Bend the elbow and the knee',
   show:()=>{steps[2].go();anim('el',()=>anim('kn'))},go:()=>{clear();S.el=0;S.kn=0;S.elOk=0;S.knOk=0;tell();S.want=ok(2,()=>S.elOk&&S.knOk,()=>'Arms bend at the elbow. Legs bend at the knee.')}},
  {h:'What does it do?',p:'Each part helps you do things. Tap the part that helps.',task:'Find the part for walk, clap, eat and hug',
   show:()=>{steps[3].go();seq(['legs','hands','mouth','arms'].map(k=>()=>job(k)),420)},go:()=>{clear();S.ji=0;S.jok=0;tell();S.want=ok(3,()=>S.jok>=4,()=>'Legs walk, hands clap, mouth eats, arms hug.')}},
  {h:'Build Kit',p:'Drag each part to its place. Or tap a button.',
   predict:{q:'Where do the legs go?',opts:['At the top','At the bottom'],ans:1},task:'Put head, arms and legs in place',
   show:()=>{steps[4].go();seq(['head','arms','legs'].map(k=>()=>put(k,k)),450)},go:()=>{clear();S.built=[];S.sel=null;tell();S.want=ok(4,()=>S.built.length>=3,()=>'Head on top, arms at the sides, legs at the bottom.')}},
  {h:'Challenge',p:'',go:()=>{clear();quiz()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.want()});
 const QZ=[['What do your legs help you do?','🦵',[['Walk and run','ok'],['Eat','eat'],['Clap','clap']]],
  ['Where is your head?','🙂',[['At the top','ok'],['At the bottom','bottom'],['On your tummy','tummy']]],
  ['Your arm bends in the middle. What is that called?','💪',[['Elbow','ok'],['Knee','knee'],['Toes','toes']]],
  ['Head, shoulders, knees and ...?','🎵',[['Toes','ok'],['Nose','nose'],['Elbows','elbows']]],
  ['What do you clap with?','👏',[['Hands','ok'],['Feet','feet'],['Tummy','tum']]],
  ['Where are your toes?','🦶',[['On your feet','ok'],['On your hands','hands'],['On your head','head']]]];
 let qn=-1,run=0;
 function quiz(){qn++;const[q,pic,ops]=QZ[qn%QZ.length],r=qn%3;S.Q=pic;
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>grade(tag)});say('Challenge: '+q);A.redraw()}
 function grade(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Yes!';break;
   case 'eat':m='You eat with your mouth. Legs help you walk and run.';break;
   case 'clap':m='You clap with your hands. Legs help you walk.';break;
   case 'bottom':m='Your feet are at the bottom. Your head is at the top.';break;
   case 'tummy':m='Your tummy is in the middle. Your head sits on top, on your shoulders.';break;
   case 'knee':m='Your knee is the bend in your leg. Your arm bends at the elbow.';break;
   case 'toes':m='Toes are on your feet. They do not bend your arm. That is your elbow.';break;
   case 'nose':m='Nose comes later in the song. First it is head, shoulders, knees and toes.';break;
   case 'elbows':m='Elbows are not in that line. The song goes head, shoulders, knees and toes.';break;
   case 'feet':m='Feet stamp, they do not clap. You clap with your hands.';break;
   case 'tum':m='You can pat your tummy, but you clap with your hands.';break;
   case 'hands':m='Hands have fingers. Toes are on your feet.';break;
   default:m='Your head has eyes and a nose. Toes are down on your feet.'}
  const good=tag==='ok';if(good){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${good?'✓':'✗'} ${m}${good?` Stars: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
 function down(p){const v=view(),g=G(side());S.drag=null;S.at=null;
  if(v==='bend'){if(!S.elOk&&Math.hypot(p.x-g.hd[0],p.y-g.hd[1])<g.u*.9){S.drag='el';S.y0=p.y;return true}if(!S.knOk&&Math.hypot(p.x-g.ft[0],p.y-g.ft[1])<g.u*.9){S.drag='kn';S.y0=p.y;return true}
   const k=partAt(p,g);if(k==='shoulders')oops('Shoulders let your arm swing. Drag the hand to find the bend.');return false}
  if(v==='build'){const i=TRAY.findIndex((pi,i)=>{const P=trayP(i);return!S.built.includes(PIECE[pi][0])&&Math.abs(p.x-P[0])<A.W*.15&&Math.abs(p.y-P[1])<A.H*.1});if(i>=0){S.drag=PIECE[TRAY[i]][0];S.at=p;return true}return false}
  const k=partAt(p,g);if(!k)return false;if(v==='find')find(k);else if(v==='song')sing(k);else if(v==='job')job(k);return false}
 function move(p){const d=S.drag;if(!d)return;if(view()==='bend'){const g=G(side()),f=hi(0,lo(1,(S.y0-p.y)/(g.u*1.3)));if(f>=1){S.drag=null;bend(d,1)}else{if(d==='el')S.el=f;else S.kn=f;A.redraw()}}else{S.at=p;A.redraw()}}
 function up(p){const d=S.drag;S.drag=null;S.at=null;if(!d)return A.redraw();
  if(view()==='bend'){if(d==='el'&&!S.elOk)S.el=0;if(d==='kn'&&!S.knOk)S.kn=0;return A.redraw()}
  const g=G(side());let best=null,bd=g.u*1.6;['head','arms','legs'].forEach(k=>{const P=slot(k),dd=Math.hypot(p.x-P[0],p.y-P[1]);if(dd<bd){bd=dd;best=k}});if(best)put(d,best);else A.redraw()}
 A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;read.hidden=A.step===5;pad.hidden=A.step===5;refresh()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
   A.gest({down,move,up});refresh()}});
 A.start()})})();
