/* Flagship – big and small, long and short (ages 2–3, with a grown-up): tap the big or small one in a pair, build a
   tower taller then shorter than Bear's, line up the ends of two crayons before saying which is longer, take a tower
   off its box to compare fairly, and put three bears in order from small to big. */
(()=>{const lo=Math.min,hi=Math.max;
 const PAIR=[['⚽','ball','big',1],['🧸','teddy','small',0],['🍎','apple','big',0],['🐶','dog','small',1]];
 const CRAY=[{a:['red',0,5],b:['blue',3,4],long:'a'},{a:['green',0,5],b:['orange',2,6],long:'b'}];
 const BEAR=[['small',.42,'Baby Bear'],['middle',.68,'Mummy Bear'],['big',1,'Daddy Bear']],START=[2,0,1];
VIS.reg('flagsize',c=>{let A,pad,chal,read;c.fig.classList.add('young');
 const S={pi:0,pok:0,my:1,tp:0,ci:0,cok:0,shift:0,lined:0,drag:null,off:0,moved:0,lift:0,line:[],wrong:-1,gen:0,want:()=>{}};
 const say=t=>{c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(read)read.textContent=t}};
 const view=()=>['pair','tower','crayon','box','order','quiz'][A.step];
 const fz=z=>A.narrow?z:z+3;
 const put=(x,t,X,Y,z,k,b)=>{x.font=`${b||800} ${fz(z)}px system-ui,sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillStyle=k;x.fillText(t,X,Y,A.W-16)};
 const card=(x,R,k,on)=>{x.fillStyle=A.alpha(k,.13);A.paint.rrect(R.x,R.y,R.w,R.h,18);x.fill();x.strokeStyle=k;x.lineWidth=on?5:2;x.stroke()};
 const inR=(p,R)=>p.x>=R.x&&p.x<=R.x+R.w&&p.y>=R.y&&p.y<=R.y+R.h,oops=t=>{A.sound.miss();say(t);A.redraw()};
 const half=i=>{const g=12,w=(A.W-3*g)/2;return{x:g+i*(w+g),y:A.H*.14,w,h:A.H*.72}};
 const floor=()=>A.H*.86,unit=()=>lo(A.H*.105,A.W*.09);
 function blocks(x,X,bot,n,k,u){for(let i=0;i<n;i++){x.fillStyle=k;A.paint.rrect(X-u*.6,bot-(i+1)*u+2,u*1.2,u-4,6);x.fill();x.strokeStyle=A.alpha('#000',.35);x.lineWidth=1.5;x.stroke()}}
 function ground(x){x.strokeStyle=A.col.mu;x.lineWidth=3;x.beginPath();x.moveTo(8,floor());x.lineTo(A.W-8,floor());x.stroke()}
 function pairV(x){const C=A.col;if(S.pok>=4)return put(x,'Big and small, all found!',A.W/2,A.H*.45,17,C.gr);const p=PAIR[S.pi];
  put(x,`Tap the ${p[2].toUpperCase()} ${p[1]}`,A.W/2,A.H*.07,17,C.tx);
  [0,1].forEach(i=>{const R=half(i),bigHere=i===p[3];card(x,R,S.wrong===i?C.rd:C.cy,S.wrong===i);put(x,p[0],R.x+R.w/2,R.y+R.h*.52,bigHere?lo(R.w,R.h)*.62:lo(R.w,R.h)*.2,C.tx,400)})}
 function towerV(x){const C=A.col,u=unit(),f=floor(),bx=A.W*.3,mx=A.W*.68;ground(x);
  x.setLineDash([7,6]);x.strokeStyle=C.am;x.lineWidth=2;x.beginPath();x.moveTo(bx-u,f-3*u);x.lineTo(A.W-10,f-3*u);x.stroke();x.setLineDash([]);
  blocks(x,bx,f,3,A.mix(C.am,C.pn,.15),u);blocks(x,mx,f,S.my,A.mix(C.cy,C.pn,.1),u);
  put(x,'🐻',bx,f-3*u-u*.7,26,C.tx,400);put(x,'Bear',bx,f+u*.45,13,C.tx);put(x,'You',mx,f+u*.45,13,C.tx);
  const goal=S.tp===0?'Make your tower TALLER than Bear\u2019s':S.tp===1?'Now make it SHORTER than Bear\u2019s':'Taller, then shorter. Well done!';put(x,goal,A.W/2,A.H*.07,15,S.tp>1?C.gr:C.tx)}
 function crayon(x,X0,len,y,k,u,name){const L=len*u;x.fillStyle=k;A.paint.rrect(X0,y-u*.32,L-u*.5,u*.64,6);x.fill();
  x.beginPath();x.moveTo(X0+L-u*.5,y-u*.32);x.lineTo(X0+L,y);x.lineTo(X0+L-u*.5,y+u*.32);x.closePath();x.fill();put(x,name,X0+L/2-u*.2,y,12,'#fff')}
 const KC={red:'#b91c1c',blue:'#1d4ed8',green:'#15803d',orange:'#c2410c'};
 function cray(){return CRAY[lo(S.ci,1)]}
 function geo(){const m=A.W*.08,u=(A.W-2*m)/9;return{m,u,ya:A.H*.38,yb:A.H*.62}}
 function crayonV(x){const C=A.col;if(S.cok>=2)return put(x,'Line up the ends, then look at the other end!',A.W/2,A.H*.45,15,C.gr);
  const r=cray(),g=geo();x.strokeStyle=C.mu;x.lineWidth=3;x.beginPath();x.moveTo(g.m,A.H*.22);x.lineTo(g.m,A.H*.78);x.stroke();put(x,'start',g.m+22,A.H*.84,12,C.mu,700);
  crayon(x,g.m+r.a[1]*g.u,r.a[2],g.ya,KC[r.a[0]],g.u,r.a[0]);crayon(x,g.m+(r.b[1]-S.off)*g.u,r.b[2],g.yb,KC[r.b[0]],g.u,r.b[0]);
  put(x,S.lined?'Ends lined up. Which is longer?':`Drag the ${r.b[0]} crayon to the start line`,A.W/2,A.H*.08,15,C.tx)}
 function boxV(x){const C=A.col,u=unit(),f=floor(),cx=A.W*.3,dx=A.W*.7,box=S.moved?0:2*u;ground(x);
  if(!S.moved){x.fillStyle=A.mix(C.or,'#7c4a12',.4);A.paint.rrect(cx-u*.9,f-box,u*1.8,box,4);x.fill();put(x,'box',cx,f-box/2,13,'#fff')}
  blocks(x,cx,f-box-S.lift,3,A.mix(C.pk,C.pn,.1),u);blocks(x,dx,f,4,A.mix(C.vi,C.pn,.1),u);
  put(x,'🐱',cx,f-box-S.lift-3*u-u*.6,24,C.tx,400);put(x,'🐶',dx,f-4*u-u*.6,24,C.tx,400);
  if(S.moved){put(x,'3 blocks',cx,f+u*.45,13,C.tx);put(x,'4 blocks',dx,f+u*.45,13,C.tx)}
  put(x,S.moved?'Both on the floor. Which is taller?':'Drag the cat\u2019s tower down to the floor',A.W/2,A.H*.06,15,C.tx)}
 const slot=i=>{const g=10,w=(A.W-4*g)/3;return{x:g+i*(w+g),y:A.H*.56,w,h:A.H*.38}},spot=i=>{const g=10,w=(A.W-4*g)/3;return{x:g+i*(w+g),y:A.H*.1,w,h:A.H*.38}};
 function orderV(x){const C=A.col;put(x,'small → middle → big',A.W/2,A.H*.05,14,C.mu,700);
  [0,1,2].forEach(i=>{const R=slot(i);card(x,R,C.gr,0);put(x,String(i+1),R.x+16,R.y+16,12,C.tx);const b=S.line[i];if(b!=null)put(x,'🧸',R.x+R.w/2,R.y+R.h*.55,lo(R.w,R.h)*.8*BEAR[b][1],C.tx,400)});
  START.forEach((b,i)=>{if(S.line.includes(b))return;const R=spot(i),P=S.drag===b&&S.at?S.at:{x:R.x+R.w/2,y:R.y+R.h/2};if(S.wrong===b)card(x,R,C.rd,1);put(x,'🧸',P.x,P.y,lo(R.w,R.h)*.8*BEAR[b][1],C.tx,400)});
  if(S.line.length>=3)put(x,'Small, middle, big!',A.W/2,A.H*.32,17,C.gr)}
 function draw(A){const{ctx:x,W,H,col:C}=A,v=view();x.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.45);x.fillRect(0,0,W,H);
  const f={pair:pairV,tower:towerV,crayon:crayonV,box:boxV,order:orderV}[v];if(f)f(x);else put(x,S.Q||'📏',W/2,H/2,60,C.tx,400);A.fx.draw(x)}
 function choose(i){if(S.pok>=4)return;const p=PAIR[S.pi],ok=(i===p[3])===(p[2]==='big');
  if(!ok){S.wrong=i;return oops(`That is the ${p[2]==='big'?'small':'big'} ${p[1]}. The ${p[2]} one ${p[2]==='big'?'takes up more room':'takes up less room'}.`)}
  S.wrong=-1;S.pok++;S.pi=lo(3,S.pok);A.sound.pop();tell(`Yes! That is the ${p[2]} ${p[1]}.`)}
 function stack(d){if(S.tp>1)return;const n=S.my+d;if(n<1)return oops('Your tower needs at least one block.');if(n>6)return oops('Six blocks is the most. Take one off.');
  S.my=n;A.sound.tick();let m=`Your tower has ${n} block${n>1?'s':''}.`;
  if(n===3)m+=' Same height as Bear\u2019s!';else if(S.tp===0&&n>3){S.tp=1;m+=' It is taller than Bear\u2019s! Now make it shorter.'}else if(S.tp===1&&n<3){S.tp=2;m+=' Now it is shorter than Bear\u2019s.'}
  tell(m)}
 function lineUp(){if(S.cok>=2||S.lined)return;S.off=cray().b[1];S.lined=1;A.sound.pop();tell(`The ${cray().b[0]} crayon is on the start line now.`)}
 function judge2(w){if(S.cok>=2)return;const r=cray(),c=r[w],o=r[w==='a'?'b':'a'];
  if(!S.lined){return oops(`Wait! The ${r.b[0]} crayon starts later. Line up the ends first to be fair.`)}
  if(w!==r.long)return oops(`Look at the far end now. The ${o[0]} crayon goes further, so the ${o[0]} one is longer.`);
  S.cok++;A.sound.pop();const was=r.long==='a';S.ci=lo(1,S.cok);S.off=0;S.lined=0;tell(`Yes, the ${c[0]} crayon is longer.${was?` The ${r.b[0]} one only looked longer because it started further along.`:''}`)}
 function moveDown(){if(S.moved)return;S.moved=1;S.lift=0;A.sound.pop();tell('The cat\u2019s tower is on the floor now. Count the blocks.')}
 function pickT(w){if(S.done4)return;if(!S.moved)return oops('Wait! The cat\u2019s tower stands on a box. Put it on the floor first.');
  if(w==='cat')return oops('Count the blocks. The cat\u2019s tower has 3. The dog\u2019s tower has 4.');S.done4=1;A.sound.pop();tell('Yes! The dog\u2019s tower is taller. The box only made the cat\u2019s tower look tall.')}
 function place(b){if(S.line.length>=3||S.line.includes(b))return;const left=START.filter(q=>!S.line.includes(q)),min=Math.min(...left);
  if(b!==min){S.wrong=b;return oops(`That bear is bigger than another one left. Find the smallest one left.`)}
  S.wrong=-1;S.line.push(b);A.sound.pop();tell(`${BEAR[b][2]} is the ${BEAR[b][0]} one.`)}
 function tell(msg){const v=view();let t;
  if(v==='pair')t=S.pok>=4?'All four found.':`Tap the ${PAIR[S.pi][2]} ${PAIR[S.pi][1]}. Left or right?`;
  else if(v==='tower')t=`Bear\u2019s tower: 3 blocks. Yours: ${S.my}.`;
  else if(v==='crayon')t=S.cok>=2?'Both crayon pairs done.':`${cray().a[0][0].toUpperCase()+cray().a[0].slice(1)} and ${cray().b[0]} crayons. ${S.lined?'Ends lined up.':'The '+cray().b[0]+' one starts further along.'}`;
  else if(v==='box')t=S.moved?'Cat\u2019s tower 3 blocks, dog\u2019s tower 4 blocks, both on the floor.':'Cat\u2019s tower stands on a box. Dog\u2019s tower is on the floor.';
  else if(v==='order')t=`Bears in line: ${S.line.map(b=>BEAR[b][0]).join(', ')||'none yet'}.`;else t='Challenge time.';
  say((msg?msg+' ':'')+t);refresh();S.want()}
 function refresh(){if(!A||!pad)return;pad.innerHTML='';const v=view();
  const B=(t,f,al)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':al||null},pad,t);e.onclick=f};
  if(v==='pair'&&S.pok<4){B('⬅ Left',()=>choose(0),'Left one');B('Right ➡',()=>choose(1),'Right one')}
  if(v==='tower'&&S.tp<2){B('➕ Add a block',()=>stack(1));B('➖ Take one off',()=>stack(-1))}
  if(v==='crayon'&&S.cok<2){const r=cray();if(!S.lined)B('⬅ Line up the ends',lineUp);B(r.a[0],()=>judge2('a'),`The ${r.a[0]} crayon is longer`);B(r.b[0],()=>judge2('b'),`The ${r.b[0]} crayon is longer`)}
  if(v==='box'&&!S.done4){if(!S.moved)B('⬇ Move to the floor',moveDown);B('🐱 Cat\u2019s tower',()=>pickT('cat'),'Cat\u2019s tower is taller');B('🐶 Dog\u2019s tower',()=>pickT('dog'),'Dog\u2019s tower is taller')}
  if(v==='order'&&S.line.length<3)START.forEach(b=>{if(!S.line.includes(b))B('🧸 '+BEAR[b][2],()=>place(b),`Put ${BEAR[b][2]} next`)});A.redraw()}
 const ok=(st,cond,msg)=>()=>{if(A.step===st&&cond()&&(!steps[st].predict||A.pred[st]!=null))A.done(msg()+A.reveal(st))};
 const seq=(fs,gap)=>{const g=S.gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===S.gen)f()},A.reduced()?j*20:j*gap))};
 const clear=()=>{S.gen++;S.want=()=>{};S.drag=null;S.at=null;S.wrong=-1};
 const steps=[
  {h:'Big or small?',p:'Big things take up lots of room. Small things take up a little room. Tap the one the words ask for.',task:'Find big and small four times',
   show:()=>{steps[0].go();seq(PAIR.map(p=>()=>choose(p[2]==='big'?p[3]:1-p[3])),420)},go:()=>{clear();S.pi=0;S.pok=0;tell();S.want=ok(0,()=>S.pok>=4,()=>'Big takes up more room. Small takes up less.')}},
  {h:'Tall and short',p:'Tall goes up high. Short stays low. Add blocks or take them off.',
   predict:{q:'Bear\u2019s tower has 3 blocks. Yours has 1. How do you make yours taller?',opts:['Take a block off','Add blocks'],ans:1},task:'Make your tower taller, then shorter',
   show:()=>{steps[1].go();seq([1,1,1,-1,-1].map(d=>()=>stack(d)),420)},go:()=>{clear();S.my=1;S.tp=0;tell();S.want=ok(1,()=>S.tp>1,()=>'More blocks go up taller. Fewer blocks stay shorter.')}},
  {h:'Long and short',p:'To see which is longer, start both at the same line. Drag the crayon, then look at the other end.',
   predict:{q:'The blue crayon sticks out further. Is it the longer one?',opts:['Yes, it sticks out more','Not sure until the ends line up'],ans:1},task:'Line up two pairs of crayons and pick the longer',
   show:()=>{steps[2].go();seq([lineUp,()=>judge2('a'),lineUp,()=>judge2('b')],500)},go:()=>{clear();S.ci=0;S.cok=0;S.off=0;S.lined=0;tell();S.want=ok(2,()=>S.cok>=2,()=>'Line up the starts. The one that goes further at the other end is longer.')}},
  {h:'Is it fair?',p:'The cat\u2019s tower stands on a box. Move it to the floor, then compare.',
   predict:{q:'Which tower is taller?',opts:['The cat\u2019s, its top is higher','The dog\u2019s'],ans:1},task:'Put the cat\u2019s tower on the floor and pick the taller',
   show:()=>{steps[3].go();seq([moveDown,()=>pickT('dog')],600)},go:()=>{clear();S.moved=0;S.lift=0;S.done4=0;tell();S.want=ok(3,()=>S.done4,()=>'Stand both on the floor to compare. A box makes a tower look tall, not be tall.')}},
  {h:'Small, middle, big',p:'Put the bears in a line. Start with the smallest one. Drag a bear to the line, or tap its button.',task:'Line up the bears from small to big',
   show:()=>{steps[4].go();seq([0,1,2].map(b=>()=>place(b)),450)},go:()=>{clear();S.line=[];tell();S.want=ok(4,()=>S.line.length>=3,()=>'Smallest first, then the middle one, then the biggest.')}},
  {h:'Challenge',p:'',go:()=>{clear();quiz()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.want()});
 const QZ=[['Which is bigger: an elephant or a mouse?','🐘',[['Elephant','ok'],['Mouse','mouse'],['They are the same','same']]],
  ['A snake goes on and on. Which word fits?','🐍',[['Long','ok'],['Tall','tall'],['Small','small']]],
  ['A short tower stands on a chair. Is the tower taller now?','🪑',[['No, it is just up high','ok'],['Yes, it got taller','chair'],['It got smaller','smaller']]],
  ['Line up small, middle and big. Which one goes first?','🧸',[['The small one','ok'],['The big one','bigfirst'],['Any one','any']]],
  ['Which is taller: a giraffe or a cat?','🦒',[['Giraffe','ok'],['Cat','cat'],['They are the same','same']]],
  ['One pencil starts further along. How do you check which is longer?','✏️',[['Line up the ends','ok'],['Pick the one that sticks out','stick'],['Pick the red one','colour']]]];
 let qn=-1,run=0;
 function quiz(){qn++;const[q,pic,ops]=QZ[qn%QZ.length],r=qn%3;S.Q=pic;
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(tag)});say('Challenge: '+q);A.redraw()}
 function mark(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Yes!';break;
   case 'mouse':m='A mouse is tiny. An elephant takes up much more room.';break;
   case 'same':m='Look again. One takes up much more room, so they are not the same.';break;
   case 'tall':m='Tall is for things that stand up high. A snake lies down and goes on and on, so it is long.';break;
   case 'small':m='Small is about room, not about going on and on. Long fits a snake.';break;
   case 'chair':m='The tower did not change. The chair lifts it up. Count the blocks to check.';break;
   case 'smaller':m='Moving a tower does not shrink it. It has the same blocks.';break;
   case 'bigfirst':m='We start with the small one, then middle, then big.';break;
   case 'any':m='Not any one. Find the smallest to go first.';break;
   case 'cat':m='A cat is short. A giraffe stands up very high, so it is tall.';break;
   case 'stick':m='Sticking out can trick you. Line up the starts, then look at the other end.';break;
   default:m='Colour does not tell size. Line up the ends to check.'}
  const good=tag==='ok';if(good){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${good?'✓':'✗'} ${m}${good?` Stars: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
 function down(p){const v=view();S.at=null;S.drag=null;
  if(v==='pair'&&S.pok<4){const i=[0,1].find(i=>inR(p,half(i)));if(i!=null)choose(i);return false}
  if(v==='tower'&&S.tp<2){const u=unit(),mx=A.W*.68;if(Math.abs(p.x-mx)<u*1.2&&p.y<floor()&&p.y>floor()-S.my*u)stack(-1);else stack(1);return false}
  if(v==='crayon'&&S.cok<2){const g=geo();if(!S.lined&&Math.abs(p.y-g.yb)<g.u){S.drag={x:p.x,off:S.off};return true}
   if(Math.abs(p.y-g.ya)<g.u*.7)judge2('a');else if(S.lined&&Math.abs(p.y-g.yb)<g.u*.7)judge2('b');return false}
  if(v==='box'&&!S.done4){const u=unit();if(!S.moved&&Math.abs(p.x-A.W*.3)<u*1.4){S.drag={y:p.y};return true}
   if(Math.abs(p.x-A.W*.3)<u*1.4)pickT('cat');else if(Math.abs(p.x-A.W*.7)<u*1.4)pickT('dog');return false}
  if(v==='order'&&S.line.length<3){const i=[0,1,2].find(i=>inR(p,spot(i)));if(i!=null&&!S.line.includes(START[i])){S.drag=START[i];S.at=p;return true}return false}return false}
 function move(p){const v=view();if(S.drag==null)return;
  if(v==='crayon'){const g=geo(),r=cray();S.off=hi(0,lo(r.b[1],S.drag.off+(S.drag.x-p.x)/g.u));if(S.off>r.b[1]-.25)S.off=r.b[1]}
  else if(v==='box'){S.lift=-hi(0,lo(2*unit(),p.y-S.drag.y))}
  else S.at=p;A.redraw()}
 function up(p){const v=view(),d=S.drag;S.drag=null;S.at=null;if(d==null)return A.redraw();
  if(v==='crayon'){if(S.off>=cray().b[1]-.3)lineUp();else A.redraw()}
  else if(v==='box'){if(S.lift<=-unit()*1.2)moveDown();else{S.lift=0;A.redraw()}}
  else if(v==='order'){if(p.y>A.H*.5)place(d);else A.redraw()}}
 A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;read.hidden=A.step===5;pad.hidden=A.step===5;refresh()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
   A.gest({down,move,up});refresh()}});
 A.start()})})();
