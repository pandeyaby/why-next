/* Flagship – fitting shapes into holes (ages 2–3, with a grown-up): drag a circle, square and triangle into a shape
   sorter, find that an upside-down triangle only drops in once it is turned so its corners line up, turn a standing
   rectangle to lie flat, let shapes go on a slope to see that only the round one rolls, sort shapes into corners and
   no corners, then fill the whole sorter with turned pieces. Every drag also works with buttons. */
(()=>{const lo=Math.min,hi=Math.max,PI=Math.PI;
 const SH={circle:{n:'circle',hole:'round hole',per:360,b:'● Circle',has:'It is round, with no corners.'},
  square:{n:'square',hole:'square hole',per:90,b:'■ Square',has:'It has 4 straight sides and 4 corners.'},
  triangle:{n:'triangle',hole:'triangle hole',per:120,b:'▲ Triangle',has:'It has 3 straight sides and 3 corners.'},
  rect:{n:'rectangle',hole:'rectangle hole',per:180,b:'▬ Rectangle',has:'It has 2 long sides and 2 short sides.'},
  oval:{n:'oval',hole:'oval hole',per:180,b:'⬭ Oval',has:'It is round like an egg, with no corners.'}};
 const CORN={circle:0,square:4,triangle:3,rect:4,oval:0};
 const LV={match:[['circle','square','triangle'],[['triangle',0],['circle',0],['square',0]]],turn:[['triangle'],[['triangle',60]]],
  flat:[['square','rect'],[['rect',90]]],fill:[['circle','square','triangle','rect'],[['rect',90],['circle',0],['triangle',60],['square',30]]]};
VIS.reg('flagfit',c=>{let A,pad,chal,read;c.fig.classList.add('young');
 const S={pcs:[],holes:[],sel:null,drag:null,at:null,moved:0,tried:{},roll:null,gen:0,want:()=>{},note:''};
 const say=t=>{c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(read)read.textContent=t}};
 const view=()=>['match','turn','flat','roll','sort','fill','quiz'][A.step];
 const fz=z=>A.narrow?z:z+3;
 const txt=(x,t,X,Y,z,k,w)=>{x.font=`${w||800} ${fz(z)}px system-ui,sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillStyle=k;x.fillText(t,X,Y,A.W-16)};
 const colOf=k=>{const C=A.col;return{circle:C.rd,square:C.cy,triangle:C.am,rect:C.vi,oval:C.gr}[k]};
 // outline of a shape of size r turned a degrees; returns its corner points
 function path(x,k,X,Y,r,a){const t=a*PI/180;x.beginPath();if(k==='circle'){x.arc(X,Y,r,0,7);return[]}
  if(k==='oval'){x.ellipse(X,Y,r*1.2,r*.72,t,0,7);return[]}
  const P=k==='square'?[[-1,-1],[1,-1],[1,1],[-1,1]].map(([u,v])=>[u*r*.82,v*r*.82]):k==='rect'?[[-1.3,-.55],[1.3,-.55],[1.3,.55],[-1.3,.55]].map(([u,v])=>[u*r,v*r])
   :[0,1,2].map(i=>{const q=-PI/2+i*2*PI/3;return[Math.cos(q)*r*1.15,Math.sin(q)*r*1.15]});
  const Q=P.map(([u,v])=>[X+u*Math.cos(t)-v*Math.sin(t),Y+u*Math.sin(t)+v*Math.cos(t)]);Q.forEach((q,i)=>i?x.lineTo(q[0],q[1]):x.moveTo(q[0],q[1]));x.closePath();return Q}
 function piece(x,k,X,Y,r,a,ring){const C=A.col,k0=colOf(k);A.paint.shadow(8,3,.25);path(x,k,X,Y,r,a);x.fillStyle=A.paint.lin(X,Y-r,X,Y+r,[[0,A.mix(k0,'#fff',.25)],[1,k0]]);x.fill();A.paint.noShadow();
  x.strokeStyle=ring||A.mix(k0,'#000',.35);x.lineWidth=ring?5:2.5;x.stroke()}
 function dots(x,k,X,Y,r,a){const Q=path(x,k,X,Y,r,a);x.fillStyle=A.col.tx;Q.forEach(q=>{x.beginPath();x.arc(q[0],q[1],5,0,7);x.fill()})}
 const fits=P=>P.k==='circle'||((Math.round(P.a)%SH[P.k].per)+SH[P.k].per)%SH[P.k].per===0;
 const R=()=>lo(A.W/(hi(S.holes.length,S.pcs.length,3)*3.3),A.H*.1);
 const holeP=j=>[A.W*(j+1)/(S.holes.length+1),A.H*.31];
 const trayP=i=>[A.W*(i+1)/(S.pcs.length+1),A.H*.78];
 const posOf=i=>{const P=S.pcs[i];if(S.drag===i&&S.at&&S.moved)return[S.at.x,S.at.y];if(P.in!=null)return holeP(P.in);return trayP(i)};
 function boxV(x){const C=A.col,r=R(),lid=A.mix(C.am,C.pn,C.dark?.55:.45);x.fillStyle=A.mix(lid,'#000',.18);A.paint.rrect(A.W*.04,A.H*.14,A.W*.92,A.H*.42,16);x.fill();
  x.fillStyle=lid;A.paint.rrect(A.W*.04,A.H*.14,A.W*.92,A.H*.34,16);x.fill();
  S.holes.forEach((k,j)=>{const[X,Y]=holeP(j);path(x,k,X,Y,r*1.07,0);x.fillStyle=C.dark?'#05080f':'#3b2412';x.fill()});
  S.pcs.forEach((P,i)=>{if(S.drag===i)return;const[X,Y]=posOf(i);piece(x,P.k,X,Y,r*.95,P.a,S.sel===i?C.tx:P.bad?C.rd:null)});
  if(S.drag!=null){const P=S.pcs[S.drag],[X,Y]=posOf(S.drag);piece(x,P.k,X,Y,r*.95,P.a,C.tx)}
  const left=S.pcs.filter(P=>P.in==null).length;txt(x,left?S.note||'Drag a shape to its hole':'All in! 🎉',A.W/2,A.H*.06,15,left?C.tx:C.gr);
  if(left&&S.sel!=null)txt(x,'Tap it again to turn it ↻',A.W/2,A.H*.95,13,C.mu,700)}
 // slope for the roll step
 const SL=()=>({x0:A.W*.06,y0:A.H*.16,x1:A.W*.66,y1:A.H*.6,end:A.W*.97});
 const ROLL=['square','circle','triangle'];
 function slopeAt(t,r){const s=SL(),L=Math.hypot(s.x1-s.x0,s.y1-s.y0),g=Math.atan2(s.y1-s.y0,s.x1-s.x0),run=L+(s.end-s.x1)-r*2,d=t*run;
  if(d<=L)return{x:s.x0+Math.cos(g)*d+Math.sin(g)*r,y:s.y0+Math.sin(g)*d-Math.cos(g)*r,g,d};return{x:s.x1+(d-L),y:s.y1-r,g:0,d}}
 function rollV(x){const C=A.col,s=SL(),r=lo(A.W*.07,A.H*.09);x.fillStyle=A.mix(C.gr,C.pn,.55);x.beginPath();x.moveTo(s.x0,s.y0);x.lineTo(s.x1,s.y1);x.lineTo(s.end,s.y1);x.lineTo(s.end,s.y1+12);x.lineTo(s.x0,s.y1+12);x.closePath();x.fill();
  x.strokeStyle=A.mix(C.gr,'#000',.3);x.lineWidth=3;x.beginPath();x.moveTo(s.x0,s.y0);x.lineTo(s.x1,s.y1);x.lineTo(s.end,s.y1);x.stroke();
  if(S.roll){const k=S.roll.k,off=k==='circle'?r:k==='square'?r*.82:r*.575,P=slopeAt(S.roll.t,off),a=P.g*180/PI+(k==='circle'?P.d/r*180/PI:0);piece(x,k,P.x,P.y,r,a)}
  ROLL.forEach((k,i)=>{if(S.roll&&S.roll.k===k)return;const dr=S.drag===i&&S.moved&&S.at,X=dr?S.at.x:A.W*(i+1)/4,Y=dr?S.at.y:A.H*.84;piece(x,k,X,Y,r*.85,0,S.drag===i?C.tx:null);if(dr)return;if(S.tried[k])txt(x,S.tried[k],X,Y+r*1.35,12,k==='circle'?C.gr:C.tx,700)});
  txt(x,S.note||'Drag a shape to the top of the slope',A.W/2,A.H*.06,15,C.tx)}
 const SORT=['oval','square','circle','triangle','rect'];
 const binX=b=>A.W*(b?.74:.26);
 function sortV(x){const C=A.col,r=lo(A.W*.06,A.H*.075),bw=A.W*.44,by=A.H*.5;
  [0,1].forEach(b=>{x.fillStyle=A.alpha(b?C.gr:C.cy,.14);A.paint.rrect(binX(b)-bw/2,by,bw,A.H*.46,14);x.fill();x.strokeStyle=b?C.gr:C.cy;x.lineWidth=2;x.stroke();
   txt(x,b?'No corners':'Corners',binX(b),by+A.H*.06,14,C.tx)});
  const inBin=[[],[]];SORT.forEach((k,i)=>{if(S.sorted[k]!=null)inBin[S.sorted[k]].push(k)});
  inBin.forEach((L,b)=>L.forEach((k,j)=>{const X=binX(b)+(j-(L.length-1)/2)*bw/3.2,Y=by+A.H*.27;piece(x,k,X,Y,r*.8,0);if(!b){dots(x,k,X,Y,r*.8,0);txt(x,String(CORN[k]),X,Y+r*1.45,13,C.tx)}}));
  SORT.forEach((k,i)=>{if(S.sorted[k]!=null)return;const[X,Y]=S.drag===i&&S.moved&&S.at?[S.at.x,S.at.y]:[A.W*(i+1)/6,A.H*.24];piece(x,k,X,Y,r,0,S.sel===i||S.drag===i?C.tx:S.badK===k?C.rd:null)});
  txt(x,S.note||'Corners or no corners?',A.W/2,A.H*.06,15,C.tx)}
 function draw(A){const{ctx:x,W,H,col:C}=A,v=view();x.fillStyle=A.mix(C.pn,'#dbeafe',C.dark?.06:.45);x.fillRect(0,0,W,H);
  if(v==='roll')rollV(x);else if(v==='sort')sortV(x);else if(v==='quiz'){const r=H*.2;piece(x,S.Q||'triangle',W/2,H/2,r,0)}else boxV(x);A.fx.draw(x)}
 const oops=t=>{A.sound.miss();S.note='';say(t);A.redraw()};
 function load(v){const L=LV[v];S.holes=L[0].slice();S.pcs=L[1].map(([k,a])=>({k,a,in:null,bad:0}));S.sel=null;S.note=''}
 function select(i){S.sel=i;S.pcs.forEach(P=>P.bad=0);A.sound.tick();tell(`${SH[S.pcs[i].k].n} picked. ${fits(S.pcs[i])?'It lines up.':'It is turned.'}`)}
 function turn(i,cb){const P=S.pcs[i];if(!P||P.in!=null)return;const to=Math.round(P.a)+30;A.sound.tick();
  A.tween(P,{a:to},260,'out',()=>{P.a=to%360;tell(fits(P)?`Now the ${SH[P.k].n} lines up with its hole.`:`The ${SH[P.k].n} turned. Not lined up yet.`);cb&&cb()})}
 function tryFit(i,j){const P=S.pcs[i],H=S.holes[j];S.sel=null;if(!P||P.in!=null)return;
  if(H!==P.k){P.bad=1;const tip=H==='square'&&P.k==='rect'?'The rectangle is too long for the square hole.':`That is the ${SH[H].hole}. ${SH[P.k].has}`;S.sel=i;return oops(`Bump! ${tip} Find the ${SH[P.k].hole}.`)}
  if(!fits(P)){P.bad=1;S.sel=i;return oops(P.k==='rect'?'Bump! The rectangle is standing up. The hole lies flat. Turn it.':`Bump! Right hole, but the corners do not line up. Turn the ${SH[P.k].n}.`)}
  P.in=j;P.bad=0;A.sound.pop();A.fx.add(10,q=>({x:holeP(j)[0],y:holeP(j)[1],vx:(Math.random()-.5)*200,vy:-Math.random()*160,g:400,life:.7,r:2.5,col:colOf(P.k),drag:.4}));
  tell(`Plop! The ${SH[P.k].n} fits the ${SH[H].hole}.`)}
 const rollMsg={circle:'Rolls!',square:'Slides, stops',triangle:'Stops'};
 function roll(k,cb){if(S.roll&&S.roll.busy)return;const far=k==='circle';S.roll={k,t:.12,busy:1};A.sound.whoosh();
  A.tween(S.roll,{t:far?1:k==='square'?.3:.15},far?1400:500,far?'io':'out',()=>{S.roll.busy=0;S.tried[k]=rollMsg[k];
   tell(far?'The circle rolls away! Round all over, no corners to stop it.':k==='square'?'The square slides a little, then stops. Its flat side and corners stop it.':'The triangle stays put. It sits on a flat side.');cb&&cb()})}
 function sortTo(k,b){if(S.sorted[k]!=null)return;S.sel=null;const want=CORN[k]?0:1;
  if(b!==want){S.badK=k;return oops(want?`Run a finger round the ${SH[k].n}. No pointy corners! ${SH[k].has}`:`Feel the pointy bits on the ${SH[k].n}. ${SH[k].has}`)}
  S.badK=null;S.sorted[k]=b;A.sound.pop();tell(want?`Yes! The ${SH[k].n} has no corners.`:`Yes! The ${SH[k].n} has ${CORN[k]} corners.`)}
 function tell(msg){const v=view();let t;
  if(v==='match'||v==='fill'||v==='turn'||v==='flat'){const inn=S.pcs.filter(P=>P.in!=null).map(P=>SH[P.k].n),out=S.pcs.filter(P=>P.in==null).map(P=>SH[P.k].n);
   t=out.length?`In the box: ${inn.join(', ')||'nothing yet'}. Still out: ${out.join(', ')}.`:'Every shape is in the box.'}
  else if(v==='roll')t=`Tried: ${ROLL.filter(k=>S.tried[k]).map(k=>SH[k].n+' '+rollMsg[k].toLowerCase()).join(', ')||'none yet'}.`;
  else if(v==='sort')t=`Corners: ${SORT.filter(k=>S.sorted[k]===0).map(k=>SH[k].n).join(', ')||'none'}. No corners: ${SORT.filter(k=>S.sorted[k]===1).map(k=>SH[k].n).join(', ')||'none'}.`;
  else t='Challenge time.';say((msg?msg+' ':'')+t);refresh();S.want()}
 function refresh(){if(!A||!pad)return;pad.innerHTML='';const v=view();
  const B=(t,f,al)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':al||null},pad,t);e.onclick=f};
  if(LV[v]){if(S.sel==null||S.pcs[S.sel].in!=null)S.pcs.forEach((P,i)=>{if(P.in==null)B(SH[P.k].b,()=>select(i),`Pick the ${SH[P.k].n}`)});
   else{const i=S.sel;B('↻ Turn',()=>turn(i),`Turn the ${SH[S.pcs[i].k].n}`);S.holes.forEach((k,j)=>{if(!S.pcs.some(P=>P.in===j))B('⬇ '+SH[k].hole,()=>tryFit(i,j),`Put it in the ${SH[k].hole}`)});B('✋ Another',()=>{S.sel=null;refresh()},'Pick another shape')}}
  if(v==='roll'&&!(S.roll&&S.roll.busy))ROLL.forEach(k=>B('Let go: '+SH[k].n,()=>roll(k),`Let the ${SH[k].n} go on the slope`));
  if(v==='sort'){if(S.sel==null)SORT.forEach((k,i)=>{if(S.sorted[k]==null)B(SH[k].b,()=>{S.sel=i;A.sound.tick();tell(`${SH[k].n} picked. Corners or no corners?`)},`Pick the ${SH[k].n}`)});
   else{const k=SORT[S.sel];B('📐 Corners',()=>sortTo(k,0),'Put it in Corners');B('⭕ No corners',()=>sortTo(k,1),'Put it in No corners')}}
  A.redraw()}
 const ok=(st,cond,msg)=>()=>{if(A.step===st&&cond()&&(!steps[st].predict||A.pred[st]!=null))A.done(msg()+A.reveal(st))};
 const seq=(fs,gap)=>{const g=S.gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===S.gen)f()},j*gap))};
 const clear=()=>{S.gen++;S.want=()=>{};S.drag=null;S.at=null;S.sel=null;S.note='';S.badK=null};
 const allIn=()=>S.pcs.every(P=>P.in!=null);
 const fitAll=()=>{const fs=[];S.pcs.forEach((P,i)=>{const t=((SH[P.k].per-Math.round(P.a)%SH[P.k].per)%SH[P.k].per)/30;for(let n=0;n<(P.k==='circle'?0:t);n++)fs.push(()=>turn(i));fs.push(()=>tryFit(i,S.holes.indexOf(P.k)))});seq(fs,420)};
 const hole=(v,st,msg,note)=>()=>{clear();load(v);S.note=note;tell();S.want=ok(st,allIn,msg)};
 const steps=[
  {h:'Find the hole',p:'Drag each shape to the hole that looks the same. Or tap a shape, then tap a hole.',task:'Put the circle, square and triangle in',
   show:()=>{steps[0].go();fitAll()},go:hole('match',0,()=>'Round in round, square in square, triangle in triangle.','Drag a shape to its hole')},
  {h:'Turn it round',p:'Oh no, the triangle is upside down! Tap it to turn it. Then drop it in.',predict:{q:'The triangle is upside down. Will it go in?',opts:['Yes, push hard','No, turn it first'],ans:1},
   task:'Turn the triangle and drop it in',show:()=>{steps[1].go();fitAll()},go:hole('turn',1,()=>'Turn it till the corners line up, then it drops in.','Tap the triangle to turn it')},
  {h:'Long and flat',p:'This rectangle is standing up. The hole is long and lies flat. Make it fit.',task:'Turn the rectangle to lie flat and fit it',
   show:()=>{steps[2].go();fitAll()},go:hole('flat',2,()=>'The rectangle lay down flat to match the long hole.','Long hole or square hole?')},
  {h:'Roll or stop?',p:'Put each shape on the slope. Watch what it does.',predict:{q:'Which shape will roll down the slope?',opts:['The square','The circle'],ans:1},task:'Try all 3 shapes on the slope',
   show:()=>{steps[3].go();seq(ROLL.map(k=>()=>roll(k)),1700)},go:()=>{clear();S.tried={};S.roll=null;tell();S.want=ok(3,()=>ROLL.every(k=>S.tried[k]),()=>'Round shapes roll. Flat sides and corners stop.')}},
  {h:'Corners or curves?',p:'A corner is a pointy bit where two straight sides meet. Sort the shapes.',predict:{q:'Does a circle have corners?',opts:['Yes, 4','No, none'],ans:1},task:'Sort all 5 shapes',
   show:()=>{steps[4].go();seq(SORT.map(k=>()=>sortTo(k,CORN[k]?0:1)),420)},go:()=>{clear();S.sorted={};tell();S.want=ok(4,()=>SORT.every(k=>S.sorted[k]!=null),()=>'Square, rectangle and triangle have corners. Circle and oval are curved.')}},
  {h:'Fill the box',p:'Some shapes are turned. Turn each one until it lines up, then drop it in.',task:'Fit all 4 shapes',
   show:()=>{steps[5].go();fitAll()},go:hole('fill',5,()=>'You turned and matched every shape. The circle fits any way round!','Turn, then drop')},
  {h:'Challenge',p:'',go:()=>{clear();quiz()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.want()});
 const QZ=[['The triangle will not go in. What can you do?','triangle',[['Turn it','ok'],['Push harder','push'],['Try the round hole','round']]],
  ['Which shape can roll?','circle',[['The circle','ok'],['The square','sq'],['The triangle','tri']]],
  ['How many corners does a triangle have?','triangle',[['3','ok'],['4','four'],['None','none']]],
  ['Where does the square go?','square',[['In the square hole','ok'],['In the round hole','sqround'],['In the rectangle hole','long']]],
  ['Which shape has no corners?','oval',[['The oval','ok'],['The rectangle','rect'],['The square','sq2']]],
  ['The rectangle is standing up. The hole is flat. What can you do?','rect',[['Turn it to lie flat','ok'],['Put it in the square hole','rsq'],['Push it in standing up','stand']]]];
 let qn=-1,run=0;
 function quiz(){qn++;const[q,pic,ops]=QZ[qn%QZ.length],r=qn%3;S.Q=pic;
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>grade(tag)});say('Challenge: '+q);A.redraw()}
 function grade(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Yes!';break;
   case 'push':m='Pushing will not help. Turn it until the corners line up with the hole.';break;
   case 'round':m='The round hole has no corners. A triangle has 3 corners, so it needs the triangle hole.';break;
   case 'sq':m='The square has flat sides and corners. It slides and stops. The circle rolls.';break;
   case 'tri':m='The triangle sits still on a flat side. Only the round circle rolls.';break;
   case 'four':m='4 corners is a square. Count the triangle: 1, 2, 3 corners.';break;
   case 'none':m='No corners is a circle. A triangle has 3 pointy corners.';break;
   case 'sqround':m='The square has 4 corners. The round hole has none, so it will not fit.';break;
   case 'long':m='The rectangle hole is longer. The square has 4 sides the same, so it needs the square hole.';break;
   case 'rect':m='A rectangle has 4 corners. The oval is curved all round.';break;
   case 'sq2':m='A square has 4 corners. The oval is curved all round.';break;
   case 'rsq':m='The square hole is too short. The rectangle is long, so it needs the long hole.';break;
   default:m='Standing up, it is the wrong way. Turn it so it lies flat like the hole.'}
  const good=tag==='ok';if(good){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${good?'✓':'✗'} ${m}${good?` Stars: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
 const near=(p,X,Y,d)=>Math.hypot(p.x-X,p.y-Y)<d;
 function down(p){const v=view();S.drag=null;S.at=null;S.moved=0;S.d0=p;
  if(LV[v]){const r=R(),i=S.pcs.findIndex((P,i)=>P.in==null&&near(p,...trayP(i),r*1.4));if(i>=0){S.drag=i;return true}
   if(S.sel!=null){const j=S.holes.findIndex((k,j)=>near(p,...holeP(j),r*1.3));if(j>=0)tryFit(S.sel,j)}return false}
  if(v==='roll'){const r=lo(A.W*.07,A.H*.09),i=ROLL.findIndex((k,i)=>near(p,A.W*(i+1)/4,A.H*.84,r*1.4));if(i>=0&&!(S.roll&&S.roll.busy)){S.drag=i;return true}return false}
  if(v==='sort'){const r=lo(A.W*.06,A.H*.075),i=SORT.findIndex((k,i)=>S.sorted[k]==null&&near(p,A.W*(i+1)/6,A.H*.24,r*1.5));if(i>=0){S.drag=i;return true}
   if(S.sel!=null&&p.y>A.H*.5)sortTo(SORT[S.sel],p.x>A.W/2?1:0);return false}return false}
 function move(p){if(S.drag==null)return;if(Math.hypot(p.x-S.d0.x,p.y-S.d0.y)>10)S.moved=1;S.at=p;A.redraw()}
 function up(p){const i=S.drag,v=view();S.drag=null;if(i==null)return;const moved=S.moved;S.moved=0;S.at=null;
  if(LV[v]){if(!moved){if(S.sel===i)turn(i);else select(i);return}const r=R();let best=-1,bd=r*1.6;S.holes.forEach((k,j)=>{const[X,Y]=holeP(j),d=Math.hypot(p.x-X,p.y-Y);if(d<bd){bd=d;best=j}});
   if(best>=0)tryFit(i,best);else{S.sel=i;refresh()}return}
  if(v==='roll'){if(!moved||p.y<A.H*.66)roll(ROLL[i]);else A.redraw();return}
  if(v==='sort'){if(!moved){S.sel=i;A.sound.tick();return tell(`${SH[SORT[i]].n} picked. Corners or no corners?`)}if(p.y>A.H*.45)sortTo(SORT[i],p.x>A.W/2?1:0);else A.redraw()}}
 A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==6;read.hidden=A.step===6;pad.hidden=A.step===6;refresh()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
   A.gest({down,move,up});load('match');refresh()}});
 A.start()})})();
