/* Flagship – matching pairs (ages 2–3): hang each loose sock next to its pair on the washing line (colour AND pattern
   must match; a red stripy sock is not the pair of a red spotty one), play a flip-two-cards pairs game, say "same" or
   "not the same" (a big duck and a little duck are not a pair), find the lonely one with no pair, and put each lid on
   the pot it matches by size. Every drag or tap has a big button too. */
(()=>{const mn=Math.min,mx=Math.max,hy=Math.hypot;
 const LINE=[['rd','spots','red spotty'],['cy','stripes','blue stripy'],['gr','plain','green']];
 const BASKET=[['cy','stripes','blue stripy',1],['rd','stripes','red stripy',-1],['gr','plain','green',2],['rd','spots','red spotty',0]];
 const CARDS=['🍎','🐶','🚗','🐶','🚗','🍎'];
 const SAME=[[['🦆',1],['🦆',.55],0,'One duck is big and one is little. Not the same size, so not a pair.'],
  [['circle','rd'],['square','rd'],0,'Both are red, but one is round and one is a square. Not the same shape.'],
  [['🍌',1],['🍌',1],1,'Same! Two bananas, the same size.'],
  [['circle','cy'],['circle','cy'],1,'Same! Two blue circles, the same colour and the same shape.']];
 const LONELY=[[['🍎','apple'],['🍐','pear'],['🍎','apple'],['🍊','orange'],['🍐','pear']],
  [['⭐','star'],['🌙','moon'],['☀️','sun'],['🌙','moon'],['⭐','star']],
  [['🐸','frog'],['🐟','fish'],['🐟','fish'],['🐸','frog'],['🐝','bee']]];
 const POTS=[[1,'big'],[.72,'middle'],[.48,'little']],LIDS=[1,2,0];
VIS.reg('flagmatch',c=>{let A,pad,chal,q=-1,gen=0;c.fig.classList.add('young');
 const S={sock:[],held:null,pick:-1,up:[],open:[],lock:0,si:0,li:0,lonelyWrong:-1,lid:[],pic:'',want:()=>{}};
 const tell=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
 const view=()=>['sock','snap','same','lonely','lid','quiz'][A.step];
 const X=f=>f*A.W,Y=f=>f*A.H,big=z=>A.narrow?z:z+6;
 const txt=(x,s,px,py,z,k,w)=>{x.font=`${w||800} ${big(z)}px system-ui,sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillStyle=k;x.fillText(s,px,py,A.W-12)};
 const emo=(x,e,px,py,z)=>{x.font=`${z}px system-ui,sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillStyle=A.col.tx;x.fillText(e,px,py)};
 const bad=t=>{A.sound.miss();tell(t);A.redraw()};
 const yes=t=>{A.sound.pop();tell(t);pads();A.redraw();S.want()};
 // ---- socks on the washing line ----
 const ss=()=>mn(A.W*.17,A.H*.24);
 const lineAt=i=>({x:X(.2+i*.3),y:Y(.36)}),basketAt=i=>({x:X(.13+i*.25),y:Y(.8)});
 function sockShape(x,px,py,s){const L=px-s*.22,R=px+s*.22,T=py-s*.6;x.beginPath();x.moveTo(L,T);x.lineTo(R,T);x.lineTo(R,py);x.lineTo(px+s*.36,py);x.arc(px+s*.36,py+s*.16,s*.16,-Math.PI/2,Math.PI/2);x.lineTo(px-s*.06,py+s*.32);x.quadraticCurveTo(L,py+s*.32,L,py+s*.12);x.closePath()}
 function sock(x,px,py,col,pat,on){const s=ss(),C=A.col,k=C[col];x.save();sockShape(x,px,py,s);x.fillStyle=k;x.fill();x.clip();x.fillStyle=A.alpha('#fff',.85);
  if(pat==='spots')for(let a=0;a<3;a++)for(let b=0;b<2;b++){x.beginPath();x.arc(px-s*.08+b*s*.17+(a%2)*s*.05,py-s*.42+a*s*.24,s*.06,0,7);x.fill()}
  if(pat==='stripes')for(let a=0;a<4;a++)x.fillRect(px-s*.3,py-s*.5+a*s*.22,s*.9,s*.08);x.restore();
  x.save();sockShape(x,px,py,s);x.strokeStyle=on?C.am:C.tx;x.lineWidth=on?5:2;x.stroke();x.restore()}
 function sockV(x){const C=A.col;x.strokeStyle=C.mu;x.lineWidth=3;x.beginPath();x.moveTo(X(.03),Y(.14));x.quadraticCurveTo(X(.5),Y(.2),X(.97),Y(.14));x.stroke();
  x.fillStyle=A.alpha(C.or,.16);A.paint.rrect(X(.02),Y(.62),X(.96),Y(.36),20);x.fill();txt(x,'basket',X(.5),Y(.95),11,C.tx,600);
  LINE.forEach(([k,p],i)=>{const q=lineAt(i);x.fillStyle=C.mu;x.fillRect(q.x-3,Y(.13),6,Y(.06));sock(x,q.x,q.y,k,p,S.pick===i)});
  BASKET.forEach(([k,p,,pair],i)=>{let q=basketAt(i);if(S.sock[i]){const l=lineAt(pair);q={x:l.x+ss()*.55,y:l.y}}else if(S.held&&S.held.i===i)q=S.held;sock(x,q.x,q.y,k,p)});
  const n=S.sock.filter(Boolean).length;txt(x,n>=3?'Every sock has its pair!':'Find the pair for each sock',A.W/2,Y(.06),15,n>=3?C.gr:C.tx)}
 function hang(i,j){S.held=null;if(S.sock[i])return A.redraw();const b=BASKET[i];if(j<0)return A.redraw();const l=LINE[j];
  if(b[3]!==j){if(b[0]===l[0])return bad(`Both are red, but one has ${b[1]} and one has ${l[1]}. Not the same, so not a pair.`);
   if(b[1]===l[1]&&b[1]!=='plain')return bad(`Both have ${b[1]}, but one is ${b[2].split(' ')[0]} and one is ${l[2].split(' ')[0]}. Not the same colour.`);
   return bad(`The ${b[2]} sock and the ${l[2]} sock are not the same. Look at the colour and the pattern.`)}
  S.sock[i]=true;yes(`Same! The ${l[2]} socks are a pair.`)}
 // ---- flip two cards ----
 const card=i=>{const g=10,w=(A.W-4*g)/3,h=mn(Y(.36),w*1.1);return{x:g+(i%3)*(w+g),y:Y(.14)+Math.floor(i/3)*(h+g),w,h}};
 function snapV(x){const C=A.col;CARDS.forEach((e,i)=>{const r=card(i),face=S.up.includes(i)||S.open.includes(i);x.fillStyle=face?A.alpha(S.up.includes(i)?C.gr:C.cy,.18):A.alpha(C.vi,.55);A.paint.rrect(r.x,r.y,r.w,r.h,16);x.fill();
   x.strokeStyle=S.up.includes(i)?C.gr:C.tx;x.lineWidth=S.up.includes(i)?4:2;x.stroke();if(face)emo(x,e,r.x+r.w/2,r.y+r.h/2,mn(r.w,r.h)*.5);else txt(x,String(i+1),r.x+r.w/2,r.y+r.h/2,22,'#fff')});
  txt(x,S.up.length>=6?'All three pairs found!':'Turn over two cards. Are they the same?',A.W/2,Y(.06),15,S.up.length>=6?C.gr:C.tx)}
 function flip(i){if(S.lock||S.up.includes(i)||S.open.includes(i))return;S.open.push(i);A.sound.tick();A.redraw();if(S.open.length<2)return tell(`Card ${i+1} is ${CARDS[i]}. Turn over one more.`);
  const[a,b]=S.open;if(CARDS[a]===CARDS[b]){S.up.push(a,b);S.open=[];return yes(`Same! ${CARDS[a]} and ${CARDS[b]} are a pair.`)}
  S.lock=1;bad(`${CARDS[a]} and ${CARDS[b]} are not the same. They turn back over.`);const g=gen;setTimeout(()=>{if(g!==gen)return;S.open=[];S.lock=0;A.redraw()},900)}
 // ---- same or not the same? ----
 const thing=(x,t,px,py,z)=>{const C=A.col;if(t[0]==='circle'||t[0]==='square'){x.fillStyle=C[t[1]];x.beginPath();if(t[0]==='circle')x.arc(px,py,z*.42,0,7);else A.paint.rrect(px-z*.4,py-z*.4,z*.8,z*.8,6);x.fill();x.strokeStyle=C.tx;x.lineWidth=2;x.stroke()}else emo(x,t[0],px,py,z*t[1])};
 function sameV(x){const C=A.col;if(S.si>=SAME.length)return txt(x,'You can tell same from not the same!',A.W/2,Y(.4),18,C.gr);const r=SAME[S.si],z=mn(A.W*.3,A.H*.42);
  thing(x,r[0],X(.28),Y(.48),z);thing(x,r[1],X(.72),Y(.48),z);txt(x,`Same, or not the same? (${S.si+1} of 4)`,A.W/2,Y(.08),15,C.tx)}
 function judgeSame(v){if(S.si>=SAME.length)return;const r=SAME[S.si];if(v!==r[2])return bad(v?r[3]:'Look again: they are the same in every way. That makes a pair.');S.si++;yes(r[3])}
 // ---- who has no pair? ----
 const spot=i=>{const w=A.W/5;return{x:i*w,y:Y(.3),w,h:Y(.4)}};
 function lonelyV(x){const C=A.col;if(S.li>=LONELY.length)return txt(x,'You found every lonely one!',A.W/2,Y(.4),18,C.gr);
  LONELY[S.li].forEach(([e],i)=>{const r=spot(i);if(S.lonelyWrong===i){x.fillStyle=A.alpha(C.rd,.18);A.paint.rrect(r.x+4,r.y,r.w-8,r.h,14);x.fill()}emo(x,e,r.x+r.w/2,r.y+r.h/2,mn(r.w*.7,64))});
  txt(x,`Which one has no pair? (${S.li+1} of 3)`,A.W/2,Y(.1),15,C.tx)}
 function pickLonely(i){if(S.li>=LONELY.length)return;const row=LONELY[S.li],n=row.filter(r=>r[0]===row[i][0]).length;
  if(n>1){S.lonelyWrong=i;return bad(`That ${row[i][1]} has a pair: there are two of them. Find the one with no pair.`)}S.lonelyWrong=-1;S.li++;yes(`Yes! The ${row[i][1]} is all alone. It has no pair.`)}
 // ---- lids on pots ----
 const potAt=i=>({x:X(.2+i*.3),y:Y(.42)}),lidHome=i=>({x:X(.2+i*.3),y:Y(.82)}),pw=f=>mn(A.W*.26,A.H*.4)*f;
 function lid(x,px,py,f,on){const C=A.col,w=pw(f);x.fillStyle=C.am;A.paint.rrect(px-w/2,py-8,w,16,8);x.fill();x.fillRect(px-6,py-18,12,12);x.strokeStyle=on?C.tx:A.alpha(C.tx,.6);x.lineWidth=2;A.paint.rrect(px-w/2,py-8,w,16,8);x.stroke()}
 function lidV(x){const C=A.col;POTS.forEach(([f],i)=>{const p=potAt(i),w=pw(f),h=w*.6;x.fillStyle=A.alpha(C.cy,.5);A.paint.rrect(p.x-w/2,p.y,w,h,10);x.fill();x.strokeStyle=C.tx;x.lineWidth=2;x.stroke();
   const j=S.lid.indexOf(i);if(j>=0)lid(x,p.x,p.y-6,POTS[LIDS[j]][0],1)});
  LIDS.forEach((k,j)=>{if(S.lid[j]>=0)return;let p=lidHome(j);if(S.held&&S.held.i===j)p=S.held;lid(x,p.x,p.y,POTS[k][0],1)});
  txt(x,S.lid.filter(v=>v>=0).length>=3?'Every pot has the lid that matches!':'Put each lid on the pot that is the same size',A.W/2,Y(.08),14,C.tx)}
 function putLid(j,i){S.held=null;if(S.lid[j]>=0||i<0)return A.redraw();const k=LIDS[j];if(S.lid.includes(i))return bad('That pot has a lid. Try another pot.');
  if(k!==i)return bad(POTS[k][0]>POTS[i][0]?`The ${POTS[k][1]} lid is too big for the ${POTS[i][1]} pot. It wobbles off.`:`The ${POTS[k][1]} lid is too small for the ${POTS[i][1]} pot. It falls in!`);
  S.lid[j]=i;yes(`The ${POTS[i][1]} lid fits the ${POTS[i][1]} pot. Same size!`)}
 function draw(A){const{ctx:x,W,H,col:C}=A,v=view();x.fillStyle=A.mix(C.pn,'#fef9c3',C.dark?.05:.35);x.fillRect(0,0,W,H);
  const f={sock:sockV,snap:snapV,same:sameV,lonely:lonelyV,lid:lidV}[v];if(f)f(x);else{emo(x,S.pic||'🧦',W/2,H*.48,mn(W*.3,110));txt(x,'Find the same one',W/2,H*.12,16,C.tx)}A.fx.draw(x)}
 function pads(){if(!pad)return;pad.innerHTML='';const v=view(),B=(t,f,al)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':al||null},pad,t);b.onclick=f};
  if(v==='sock'){const j=LINE.findIndex((_,j)=>!BASKET.some((b,i)=>S.sock[i]&&b[3]===j));if(j>=0){c.el('p',{class:'fl-tk'},pad,`Which sock goes with the ${LINE[j][2]} sock?`);BASKET.forEach((b,i)=>{if(!S.sock[i])B('🧦 '+b[2],()=>hang(i,j))})}}
  if(v==='snap'&&S.up.length<6)CARDS.forEach((e,i)=>{if(!S.up.includes(i))B('Card '+(i+1),()=>flip(i))});
  if(v==='same'&&S.si<SAME.length){B('✓ Same',()=>judgeSame(1));B('✗ Not the same',()=>judgeSame(0))}
  if(v==='lonely'&&S.li<LONELY.length)LONELY[S.li].forEach(([e,n],i)=>B(e,()=>pickLonely(i),n+' '+(i+1)));
  if(v==='lid'){const j=LIDS.findIndex((_,j)=>!(S.lid[j]>=0));if(j>=0)POTS.forEach(([,n],i)=>B(`${POTS[LIDS[j]][1]} lid → ${n} pot`,()=>putLid(j,i)))}}
 const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
 const play=(fs,ms)=>{const g=++gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===gen)f()},j*ms))};
 const reset=()=>{gen++;S.want=()=>{};S.held=null;S.pick=-1;S.lock=0;S.lonelyWrong=-1};
 const steps=[
  {h:'Sock pairs',p:'A pair is two things that are the same. Drag a sock from the basket to the one that matches it.',
   predict:{q:'Which sock goes with the red spotty sock?',opts:['The red stripy sock','The red spotty sock'],ans:1},task:'Find the pair for all three socks',
   show:()=>{steps[0].go();play([3,0,2].map(i=>()=>hang(i,BASKET[i][3])),600)},
   go:()=>{reset();S.sock=[];tell('Find the pair for the red spotty sock.');pads();S.want=fin(0,()=>S.sock.filter(Boolean).length>=3,'Same colour and same pattern: a pair.')}},
  {h:'Find the pairs',p:'Tap two cards to turn them over. If they are the same, they stay up.',task:'Find all three pairs',
   show:()=>{steps[1].go();play([0,5,1,3,2,4].map(i=>()=>flip(i)),450)},
   go:()=>{reset();S.up=[];S.open=[];tell('Turn over two cards.');pads();S.want=fin(1,()=>S.up.length>=6,'Two the same make a pair.')}},
  {h:'Same or not the same?',p:'Look at both. Are they the same in every way? Tap Same or Not the same.',
   predict:{q:'A big duck and a little duck. Are they the same?',opts:['Same','Not the same'],ans:1},task:'Answer four times',
   show:()=>{steps[2].go();play(SAME.map(r=>()=>judgeSame(r[2])),550)},
   go:()=>{reset();S.si=0;tell('A big duck and a little duck. Same, or not the same?');pads();S.want=fin(2,()=>S.si>=4,'Same colour, same shape, same size.')}},
  {h:'No pair',p:'Every thing has a pair, but one. Tap the lonely one.',task:'Find the lonely one three times',
   show:()=>{steps[3].go();play(LONELY.map(row=>()=>pickLonely(row.findIndex(r=>row.filter(z=>z[0]===r[0]).length===1))),550)},
   go:()=>{reset();S.li=0;tell('Which one has no pair?');pads();S.want=fin(3,()=>S.li>=3,'Two the same are a pair; one on its own has no pair.')}},
  {h:'Lids and pots',p:'Each pot has a lid the same size. Drag a lid onto a pot.',
   predict:{q:'Which lid fits the big pot?',opts:['The little lid','The big lid'],ans:1},task:'Put a lid on every pot',
   show:()=>{steps[4].go();play(LIDS.map((k,j)=>()=>putLid(j,k)),550)},
   go:()=>{reset();S.lid=[-1,-1,-1];tell('Put each lid on the pot that is the same size.');pads();S.want=fin(4,()=>S.lid.filter(v=>v>=0).length>=3,'Same size: the lid fits.')}},
  {h:'Challenge',p:'',go:()=>{reset();quiz()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
 const QZ=[['🐱','cat',[['🐱','cat','ok'],['🐯','tiger','tiger'],['🐶','dog','dog']]],['🍎','red apple',[['🍎','red apple','ok'],['🍏','green apple','green'],['🍅','tomato','tomato']]],
  ['🚗','red car',[['🚗','red car','ok'],['🚙','blue car','car'],['🚌','bus','bus']]],['🧤','glove',[['🧤','glove','ok'],['🧦','sock','sock'],['👟','shoe','shoe']]],['🐟','fish',[['🐟','fish','ok'],['🐠','stripy fish','stripy'],['🐳','whale','whale']]]];
 let stars=0;
 function quiz(){q++;const[e,n,o]=QZ[q%QZ.length],r=q%3;S.pic=e;
  chal.innerHTML=`<p><b>Find the one that is the same as the ${n}.</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');o.slice(r).concat(o.slice(0,r)).forEach(([em,nm,tag])=>{const b=c.el('button',{type:'button',class:'lbtn','aria-label':nm},row,em);b.onclick=()=>mark(tag)});tell('Challenge: find the same as the '+n);A.redraw()}
 function mark(tag){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Yes! Same, same. That is a pair.';break;
   case 'tiger':m='A tiger has stripes like some cats, but it is much bigger. Not the same.';break;
   case 'dog':m='A dog is an animal too, but it is not a cat. Not the same.';break;
   case 'green':m='Same shape, but this apple is green. A pair is the same colour too.';break;
   case 'tomato':m='Red and round, but a tomato is not an apple. Look closely.';break;
   case 'car':m='Both are cars, but this one is blue and taller. Not the same.';break;
   case 'bus':m='A bus has wheels like a car, but it is much longer. Not the same.';break;
   case 'sock':m='Socks come in pairs too, but a sock is not a glove.';break;
   case 'shoe':m='A shoe goes on a foot. A glove goes on a hand. Not the same.';break;
   case 'stripy':m='Both are fish, but this one has stripes. Look at the colours.';break;
   default:m='A whale lives in the sea too, but it is not a fish like this one.'}
  const ok=tag==='ok';if(ok){stars++;A.win()}else{stars=0;A.sound.miss()}
  fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Stars: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
 const inside=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 function down(p){const v=view();S.held=null;
  if(v==='sock'){const i=BASKET.findIndex((_,i)=>!S.sock[i]&&hy(p.x-basketAt(i).x,p.y-basketAt(i).y)<mx(34,ss()*.7));if(i>=0){S.held={i,x:p.x,y:p.y};return true}return false}
  if(v==='snap'){const i=CARDS.findIndex((_,i)=>inside(p,card(i)));if(i>=0)flip(i);return false}
  if(v==='lonely'){const i=[0,1,2,3,4].findIndex(i=>inside(p,spot(i)));if(i>=0)pickLonely(i);return false}
  if(v==='lid'){const j=LIDS.findIndex((_,j)=>!(S.lid[j]>=0)&&hy(p.x-lidHome(j).x,p.y-lidHome(j).y)<mx(40,pw(.5)));if(j>=0){S.held={i:j,x:p.x,y:p.y};return true}}return false}
 function move(p){if(S.held){S.held.x=p.x;S.held.y=p.y;A.redraw()}}
 function up(p){const v=view(),h=S.held;if(!h)return;
  if(v==='sock'){const j=LINE.findIndex((_,j)=>hy(p.x-lineAt(j).x,p.y-lineAt(j).y)<ss()*1.1);return hang(h.i,j)}
  if(v==='lid'){const i=POTS.findIndex(([f],i)=>Math.abs(p.x-potAt(i).x)<pw(f)*.6&&p.y<Y(.7));return putLid(h.i,i)}}
 A=FK.shell(c,{steps,ratio:.66,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==5;pad.hidden=A.step===5;pads()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});pads()}});
 A.start()})})();
