/* Flagship 65 – question words (5–6): tap who/what/where/when/why/how and see which part of a park picture each one asks
   about; answer questions by tapping the picture; drag the right word into a question that fits an answer; end each
   sentence with ? or . (a sentence can start with When and still tell). Challenge: kinds of answer, picking the word, marks. */
(()=>{const mn=Math.min,hy=Math.hypot,W6=['Who','What','Where','When','Why','How'];
 const KN={Who:'a person',What:'a thing',Where:'a place',When:'a time',Why:'a reason',How:'the way it happens'};
 // picture parts: x,y (0..1 of the picture), hit radius, kind word that would ask about it
 const OB={sun:{n:'the sun',x:.86,y:.22,r:.09,k:'When'},tree:{n:'the tree',x:.2,y:.36,r:.17,k:'Where'},dog:{n:'the dog',x:.3,y:.82,r:.08,k:'What'},
  mia:{n:'Mia',x:.52,y:.66,r:.09,k:'Who'},ball:{n:'the ball',x:.63,y:.86,r:.06,k:'What'},sam:{n:'Sam',x:.82,y:.68,r:.08,k:'Who'},bike:{n:'the bike',x:.82,y:.82,r:.09,k:'How'}};
 const NOUN={Who:'a person',What:'a thing',Where:'a place',When:'a time clue',How:'a thing'};
 const LOOK={Who:['mia','sam'],What:['ball','dog','bike'],Where:['tree'],When:['sun'],Why:['sun'],How:['bike']};
 const SAYS={Who:'Who asks about a person: Mia or Sam.',What:'What asks about a thing: a ball, a dog, a bike.',Where:'Where asks about a place: under the tree.',
  When:'When asks about a time: in the day, when the sun is out.',Why:'Why asks for a reason. The answer often starts with "because": because it is sunny.',How:'How asks about the way something happens: Sam comes on his bike.'};
 // find questions: word, question, the part to tap, the answer
 const FQ=[['Who','Who is kicking the ball?','mia','Mia is.'],['What','What is Mia kicking?','ball','A ball.'],['Where','Where is the dog sleeping?','tree','Under the tree.'],
  ['When','When is this: in the day or at night?','sun','In the day. The sun is out.'],['How','How does Sam get to the park?','bike','On his bike.'],
  ['Why','Why is the dog lying in the shade?','sun','Because it is hot and sunny.'],['Who','Who is riding a bike?','sam','Sam is.'],['What','What is under the tree?','dog','A dog.']];
 const GQ=[['Who','is kicking the ball?','Mia.'],['Where','is the dog sleeping?','Under the tree.'],['How','does Sam get to the park?','On his bike.'],
  ['Why','is the dog in the shade?','Because it is hot.'],['When','do we have lunch?',"At 12 o'clock."],['What','is Mia kicking?','A ball.']];
 const MQ=[['Where is my hat','?'],['My hat is on the bed','.'],['Who ate the cake','?'],['Tom ate the cake','.'],['When it rains, I wear boots','.'],['How old are you','?']];
VIS.reg('flagqw',c=>{let A,pad,chal,read;c.fig.classList.add('young');
 const S={lit:null,seen:[],fq:0,got:[],gq:0,gd:[],mq:0,md:[],free:4,flash:null,drag:null,dp:null,ok:0,want:()=>{},run:0,last:'',Q:null};
 const say=t=>{S.last=t;c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(read)read.textContent=t}};
 const view=()=>['look','find','gap','mark','find','quiz'][A.step];
 const al=(...a)=>A.alpha(...a),rr=(...a)=>A.paint.rrect(...a);
 const font=(x,w,z,a)=>{x.font=`${w} ${z}px system-ui,sans-serif`;x.textAlign=a||'center';x.textBaseline='middle'};
 const pic=()=>({x:0,y:0,w:A.W,h:A.H});
 const at=id=>{const P=pic(),o=OB[id],s=mn(P.w,P.h);return{x:P.x+o.x*P.w,y:P.y+o.y*P.h,r:o.r*s+10}};
 const tile=i=>{const cols=3,w=(A.W-24-(cols-1)*8)/cols,h=mn(54,A.H*.13),y0=A.H-2*h-16;return{x:12+(i%cols)*(w+8),y:y0+Math.floor(i/cols)*(h+8),w,h}};
 const curF=()=>FQ[A.step===4?S.free:S.fq];
 function status(){const v=view();let t;
  if(v==='look')t=S.lit?SAYS[S.lit]:`A park picture. Tap a question word to see what it asks about. ${S.seen.length} of 6 tried.`;
  else if(v==='find'){const q=curF();t=S.ok?`${q[1]} ${q[3]}`:`${q[1]} Tap the answer in the picture.`}
  else if(v==='gap')t=S.gd.length<GQ.length?`The answer is "${GQ[S.gq][2]}" Which word starts the question: blank ${GQ[S.gq][1]} ${S.gd.length} of 6 done.`:'All six questions have their word.';
  else if(v==='mark')t=S.md.length<MQ.length?`"${MQ[S.mq][0]}" Does it end with a question mark or a full stop? ${S.md.length} of 6 done.`:'All six sentences have their mark.';
  else t='Challenge time.';say(t);sync();S.want()}
 // ---- drawing ----
 function person(x,X,Y,s,col,lit){x.fillStyle='#f2c9a0';x.beginPath();x.arc(X,Y-s*.9,s*.32,0,7);x.fill();x.fillStyle=col;x.beginPath();x.moveTo(X,Y-s*.6);x.lineTo(X+s*.38,Y+s*.2);x.lineTo(X-s*.38,Y+s*.2);x.closePath();x.fill();
  x.strokeStyle='#7c4a1e';x.lineWidth=3;x.beginPath();x.moveTo(X-s*.12,Y+s*.2);x.lineTo(X-s*.16,Y+s*.6);x.moveTo(X+s*.12,Y+s*.2);x.lineTo(X+s*.3,Y+s*.55);x.stroke()}
 function scene(x){const C=A.col,P=pic(),g=P.y+P.h*.7,s=mn(P.w,P.h);
  x.fillStyle=A.mix('#bae6fd',C.pn,C.dark?.3:.05);x.fillRect(P.x,P.y,P.w,P.h*.7);x.fillStyle=A.mix('#86efac',C.pn,C.dark?.35:.05);x.fillRect(P.x,g,P.w,P.h*.3);
  let o=at('sun');x.fillStyle='#facc15';x.beginPath();x.arc(o.x,o.y,s*.07,0,7);x.fill();
  o=at('tree');x.fillStyle='#92400e';x.fillRect(o.x-s*.025,o.y,s*.05,g-o.y+4);x.fillStyle='#15803d';[[0,-.06,.12],[-.08,0,.09],[.08,0,.09]].forEach(([a,b,r])=>{x.beginPath();x.arc(o.x+a*s,o.y+b*s,r*s,0,7);x.fill()});
  x.fillStyle='rgba(0,0,0,.22)';x.beginPath();x.ellipse(o.x+s*.06,g+P.h*.12,s*.2,s*.06,0,0,7);x.fill();
 o=at('dog');x.fillStyle='#a16207';x.beginPath();x.ellipse(o.x,o.y,s*.06,s*.03,0,0,7);x.fill();x.beginPath();x.arc(o.x-s*.06,o.y-s*.02,s*.025,0,7);x.fill();
  o=at('mia');person(x,o.x,o.y,s*.13,'#db2777');o=at('ball');x.fillStyle='#f97316';x.beginPath();x.arc(o.x,o.y,s*.03,0,7);x.fill();
  o=at('bike');x.strokeStyle='#334155';x.lineWidth=3;[-1,1].forEach(k=>{x.beginPath();x.arc(o.x+k*s*.06,o.y,s*.04,0,7);x.stroke()});x.beginPath();x.moveTo(o.x-s*.06,o.y);x.lineTo(o.x,o.y-s*.05);x.lineTo(o.x+s*.06,o.y);x.stroke();
  o=at('sam');person(x,o.x,o.y,s*.12,'#2563eb');
  const lit=view()==='look'&&S.lit?LOOK[S.lit]:S.flash?[S.flash]:[];lit.forEach(id=>{const q=at(id);x.strokeStyle=S.flashBad&&!S.lit?C.rd:C.am;x.lineWidth=4;x.setLineDash([7,5]);x.beginPath();x.arc(q.x,q.y,q.r,0,7);x.stroke();x.setLineDash([])})}
 function words(x,used){const C=A.col;W6.forEach((w,i)=>{const r=S.drag===i&&S.dp?{...tile(i),x:S.dp.x-tile(i).w/2,y:S.dp.y-tile(i).h/2}:tile(i),on=used(w);
  x.fillStyle=on?al(C.vi,.35):al(C.vi,.14);rr(r.x,r.y,r.w,r.h,12);x.fill();x.strokeStyle=C.vi;x.lineWidth=on?3:2;x.stroke();font(x,800,A.narrow?18:21);x.fillStyle=C.tx;x.fillText(w,r.x+r.w/2,r.y+r.h/2)})}
 const gapR=()=>({x:16,y:A.H*.1,w:mn(120,A.W*.3),h:52});
 function gapView(x){const C=A.col,G=GQ[S.gq],R=gapR();font(x,600,13,'left');x.fillStyle=C.mu;x.fillText('Answer:',16,A.H*.42);
  font(x,800,A.narrow?20:24,'left');x.fillStyle=C.tx;x.fillText(S.gd.length<6?G[2]:'All done!',16,A.H*.42+28);
  if(S.gd.length<6){x.strokeStyle=C.am;x.lineWidth=3;x.setLineDash([6,5]);rr(R.x,R.y,R.w,R.h,10);x.stroke();x.setLineDash([]);font(x,700,A.narrow?16:19,'left');x.fillStyle=C.tx;
   const rest=G[1],L=[];let cur='';rest.split(' ').forEach(w=>{const k=cur?cur+' '+w:w;if(x.measureText(k).width>A.W-R.w-44&&cur){L.push(cur);cur=w}else cur=k});L.push(cur);L.forEach((l,j)=>x.fillText(l,R.x+R.w+10,R.y+R.h/2+(j-(L.length-1)/2)*20))}
  words(x,w=>S.gd.some(k=>GQ[k][0]===w))}
 const markT=i=>{const w=mn(110,(A.W-36)/2),h=64;return{x:A.W/2-w-6+i*(w+12),y:A.H-h-14,w,h}};
 const endR=()=>({x:A.W-62,y:A.H*.12,w:48,h:56});
 function markView(x){const C=A.col;if(S.md.length<6){const s=MQ[S.mq][0];x.fillStyle='#fff';A.paint.shadow(8,3,.2);rr(12,A.H*.08,A.W-24,72,14);x.fill();A.paint.noShadow();
   font(x,700,A.narrow?16:19,'left');x.fillStyle='#111827';const Lw=A.W-100;let L=[],cur='';s.split(' ').forEach(w=>{const k=cur?cur+' '+w:w;if(x.measureText(k).width>Lw&&cur){L.push(cur);cur=w}else cur=k});L.push(cur);
   L.forEach((l,j)=>x.fillText(l,24,A.H*.08+36+(j-(L.length-1)/2)*21));const E=endR();x.strokeStyle=C.am;x.lineWidth=3;x.setLineDash([5,4]);rr(E.x,E.y,E.w,E.h,8);x.stroke();x.setLineDash([])}
  font(x,500,A.narrow?12:14,'left');S.md.slice(-3).forEach((k,j)=>{x.fillStyle=C.tx;x.fillText('✓ '+MQ[k][0]+MQ[k][1],16,A.H*.36+j*22)});
  ['?','.'].forEach((m,i)=>{const r=S.drag==='m'+i&&S.dp?{...markT(i),x:S.dp.x-markT(i).w/2,y:S.dp.y-32}:markT(i);x.fillStyle=al(i?C.cy:C.vi,.18);rr(r.x,r.y,r.w,r.h,14);x.fill();x.strokeStyle=i?C.cy:C.vi;x.lineWidth=2;x.stroke();
   font(x,900,34);x.fillStyle=C.tx;x.fillText(m,r.x+r.w/2,r.y+r.h/2-4);font(x,600,11);x.fillText(i?'full stop':'question mark',r.x+r.w/2,r.y+r.h-10)})}
 function draw(A){const{ctx:x,W,H,col:C}=A,v=view();x.fillStyle=A.mix(C.pn,'#fef9c3',C.dark?.04:.35);x.fillRect(0,0,W,H);
  if(v==='look')scene(x);else if(v==='find'){scene(x);const q=curF();x.fillStyle=al(C.pn,.92);rr(8,8,W-16,40,10);x.fill();font(x,800,A.narrow?15:18);x.fillStyle=C.tx;x.fillText(q[1],W/2,28)}
  else if(v==='gap')gapView(x);else if(v==='mark')markView(x);else{font(x,900,mn(W,H)*.17);x.fillStyle=al(C.vi,.5);x.fillText(S.Q?S.Q.big:'?',W/2,H/2)}
  if(S.glow>0){x.strokeStyle=al(C.gr,S.glow);x.lineWidth=6;x.strokeRect(3,3,W-6,H-6)}A.fx.draw(x)}
 // ---- actions ----
 const fresh=()=>{S.run++;S.want=()=>{};S.Q=null;S.drag=null;S.flash=null;S.lit=null};
 const glow=()=>{S.glow=1;A.tween(S,{glow:0},900,'out')};
 function look(w){S.lit=w;if(!S.seen.includes(w))S.seen.push(w);A.sound.tick();status()}
 function tap(id){if(S.ok)return;const q=curF(),o=OB[id];S.flash=id;
  if(id===q[2]){S.ok=1;S.flashBad=0;if(A.step!==4&&!S.got.includes(S.fq))S.got.push(S.fq);A.sound.pop();glow();status();return}
  S.flashBad=1;A.sound.miss();say(q[0]==='Why'?`Why wants a reason. Is ${o.n} the reason the dog wants shade?`:q[0]==='When'?`When wants a time. ${o.n[0].toUpperCase()+o.n.slice(1)} is not a time. What tells you if it is day or night?`:`${q[0]} wants ${KN[q[0]]}. ${o.n[0].toUpperCase()+o.n.slice(1)} ${o.k===q[0]?'is the right kind, but look again at the question.':`is ${NOUN[o.k]}, not ${KN[q[0]]}.`}`);A.redraw()}
 function nextF(){if(A.step===4){S.free=(S.free+1)%FQ.length}else if(S.got.length<4)S.fq=[0,1,2,3].find(i=>!S.got.includes(i));S.ok=0;S.flash=null;status()}
 function pick(w){if(S.gd.length>=GQ.length)return;S.drag=null;const G=GQ[S.gq];
  if(w!==G[0]){A.sound.miss();say(`"${w}" asks for ${KN[w]}, but "${G[2]}" is ${KN[G[0]]}. Try another word.`);A.redraw();return}
  S.gd.push(S.gq);S.gq=mn(GQ.length-1,S.gd.length);A.sound.pop();if(S.gd.length===6)glow();say(`Yes: ${G[0]} ${G[1]} ${G[2]}`);sync();S.want()}
 function mark(m){if(S.md.length>=MQ.length)return;S.drag=null;const M=MQ[S.mq];
  if(m!==M[1]){A.sound.miss();say(M[1]==='.'?(/^(Who|What|Where|When|Why|How)/.test(M[0])?`It starts with ${M[0].split(' ')[0]}, but it tells you something. It does not ask. Use a full stop.`:'It tells you something. It does not ask, so it needs a full stop.'):'It asks something and wants an answer, so it needs a question mark.');A.redraw();return}
  S.md.push(S.mq);S.mq=mn(MQ.length-1,S.md.length);A.sound.pop();if(S.md.length===6)glow();status()}
 function sync(){if(!A)return;if(A.step!==5)A.cv.setAttribute('aria-label',S.last);if(!pad)return A.redraw();pad.innerHTML='';const v=view();
  const B=(t,f,off,lab)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':lab||null},pad,t);e.disabled=!!off;e.onclick=f};
  if(v==='look')W6.forEach(w=>B(w,()=>look(w),0,`Show what ${w} asks about`));
  if(v==='find'){Object.keys(OB).forEach(id=>B(OB[id].n,()=>tap(id),S.ok,`Answer: ${OB[id].n}`));B(A.step===4?'New question':'Next question',nextF,A.step!==4&&(!S.ok||S.got.length>=4))}
  if(v==='gap'&&S.gd.length<6)W6.forEach(w=>B(w,()=>pick(w),0,`Start the question with ${w}`));
  if(v==='mark'&&S.md.length<6){B('? question mark',()=>mark('?'));B('. full stop',()=>mark('.'))}A.redraw()}
 const fin=(st,ok,msg)=>()=>{if(A.step===st&&ok()&&(!steps[st].predict||A.pred[st]!=null))A.done(msg()+A.reveal(st))};
 const seq=(fs,gap)=>{const r=S.run;fs.forEach((f,j)=>setTimeout(()=>{if(r===S.run)f()},A.reduced()?j*20:j*gap))};
 const steps=[
  {h:'Words that ask',p:'Each question word asks about something different. Tap a word, or tap the picture.',
   predict:{q:'Which question word asks about a place?',opts:['Who','Where','When'],ans:1},task:'Try all six question words',
   show:()=>seq(W6.map(w=>()=>look(w)),420),go:()=>{fresh();S.seen=[];status();S.want=fin(0,()=>S.seen.length===6,()=>'Who: a person. What: a thing. Where: a place. When: a time. Why: a reason. How: the way.')}},
  {h:'Find the answer',p:'Read the question. Tap the answer in the picture, or use a button.',
   predict:{q:'"Where is the dog sleeping?" What kind of answer do you need?',opts:['A person','A place','A time'],ans:1},task:'Answer four questions',
   show:()=>{S.got=[];S.fq=0;S.ok=0;status();seq([0,1,2,3].flatMap(i=>[()=>tap(FQ[i][2]),nextF]),300)},
   go:()=>{fresh();S.got=[];S.fq=0;S.ok=0;status();S.want=fin(1,()=>S.got.length>=4,()=>'The question word told you what kind of answer to look for.')}},
  {h:'Pick the word',p:'Here is the answer. Which word starts the question? Drag a word to the gap, or tap it.',
   predict:{q:'The answer is "Because it is hot." Which word starts the question?',opts:['Where','Why','Who'],ans:1},task:'Give all six questions their word',
   show:()=>{S.gd=[];S.gq=0;status();seq(GQ.map(()=>()=>pick(GQ[S.gq][0])),300)},go:()=>{fresh();S.gd=[];S.gq=0;status();S.want=fin(2,()=>S.gd.length===6,()=>'"Because" answers Why. A time answers When. A place answers Where.')}},
  {h:'? or .',p:'A question asks. A telling sentence tells. Drag the right mark to the end, or press a button.',
   predict:{q:'"When it rains, I wear boots" starts with When. What goes at the end?',opts:['A question mark: it starts with When','A full stop: it tells you something'],ans:1},task:'Give all six sentences their mark',
   show:()=>{S.md=[];S.mq=0;status();seq(MQ.map(()=>()=>mark(MQ[S.mq][1])),300)},go:()=>{fresh();S.md=[];S.mq=0;status();S.want=fin(3,()=>S.md.length===6,()=>'A question asks and ends with ?. A sentence can start with When and still tell.')}},
  {h:'Your turn',p:'More questions about the park. Tap the answer, then try a new question.',go:()=>{fresh();S.ok=0;status()}},
  {h:'Challenge',p:'',go:()=>{fresh();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.want()});
 const QZ={place:['Which word asks about a place?','Where',[['Where','ok'],['When','wwhen'],['Who','who']]],
  time:['You want to know the time of the party. Which word do you start with?','When',[['When','ok'],['Where','wwhere'],['Why','why']]],
  reason:['"Why are you sad?" Which is the best answer?','Why',[['Because I lost my toy.','ok'],['In the garden.','aplace'],['Yesterday.','atime']]],
  person:['The answer is "Grandma." What was the question?','Who',[['Who is coming to tea?','ok'],['What is coming to tea?','what'],['Where is tea?','aplace']]],
  how:['"How did you get to school?" Which is the best answer?','How',[['By bus.','ok'],["At 9 o'clock.",'atime'],['Because I was late.','areason']]],
  mark:['"Who is at the door" needs which mark at the end?','?',[['?','ok'],['.','dot'],[',','comma']]],
  tell:['Which one is a question?','?',[['Where is the cat?','ok'],['When I grow up, I want to be a vet.','tellstart'],['The cat is in the box.','tell']]]};
 let qi=-1,run=0;
 function ask(){qi++;const K=Object.keys(QZ),k=K[qi%K.length],rot=qi%3,[q,big,ops]=QZ[k];S.Q={k,big};
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(tag)});say('Challenge: '+q);A.redraw()}
 function judge(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Yes!';break;
   case 'wwhen':m='When asks about a time. Where asks about a place. They sound alike, so listen to the end.';break;
   case 'who':m='Who asks about a person, not a place.';break;
   case 'wwhere':m='Where asks about a place. For a time, start with When.';break;
   case 'why':m='Why asks for a reason. For a time, start with When.';break;
   case 'aplace':m='That answer is a place. It would answer Where.';break;
   case 'atime':m='That answer is a time. It would answer When.';break;
   case 'areason':m='"Because" gives a reason. It answers Why, not How.';break;
   case 'what':m='What asks about a thing. Grandma is a person, so ask Who.';break;
   case 'dot':m='It asks something, so it needs a question mark, not a full stop.';break;
   case 'comma':m='A comma does not end a sentence. A question ends with ?.';break;
   case 'tellstart':m='It starts with When, but it tells you something. It is not a question.';break;
   default:m='That one tells you something. A question asks and wants an answer.'}
  const ok=tag==='ok';if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Stars: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;read.hidden=A.step===5;pad.hidden=A.step===5;sync()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
   const inR=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
   A.gest({down:p=>{const v=view();S.dp=null;
     if(v==='look'){let b=null,bd=1e9;for(const id in OB){const o=at(id),d=hy(p.x-o.x,p.y-o.y)/o.r;if(d<1&&d<bd){bd=d;b=id}}if(b){const o=OB[b];look(o.k);say(`${o.n[0].toUpperCase()+o.n.slice(1)}: ask with ${o.k}. ${SAYS[o.k]}`)}return false}
     if(v==='find'){let best=null,bd=1e9;for(const id in OB){const o=at(id),d=hy(p.x-o.x,p.y-o.y)/o.r;if(d<1&&d<bd){bd=d;best=id}}if(best)tap(best);return false}
     if(v==='gap'){const i=W6.findIndex((w,i)=>inR(p,tile(i)));if(i>=0&&S.gd.length<6){S.drag=i;S.p0=p;return true}return false}
     if(v==='mark'){const i=[0,1].find(i=>inR(p,markT(i)));if(i!=null&&S.md.length<6){S.drag='m'+i;S.p0=p;return true}}return false},
    move:p=>{S.dp=p;A.redraw()},
    up:p=>{const d=S.drag;S.drag=null;S.dp=null;const tapd=S.p0&&hy(p.x-S.p0.x,p.y-S.p0.y)<10;
     if(typeof d==='number'){if(tapd||p.y<A.H*.5)pick(W6[d]);else A.redraw()}
     else if(d){if(tapd||p.y<A.H*.6)mark(d==='m0'?'?':'.');else A.redraw()}}});
   sync()}});
 A.start()})})();
