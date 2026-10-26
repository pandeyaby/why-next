/* Flagship – teaching it back (ages 7–8): teach Teddy in your own words instead of copying, build an explanation from
   an idea, your own example and a reason, spot the gap that shows up when Teddy asks why, test your own examples on a
   magnet, and choose the three key ideas worth teaching. */
(()=>{const mn=Math.min,mx=Math.max,hy=Math.hypot;
 const TELL=[['Plants need light to make their food.',[['Plants need light to make their food.','copy'],['A plant makes food in its leaves using sunlight. My cress in a dark cupboard went yellow.','own'],['Plants get all their food from the soil.','wrong']]],
  ['Magnets pull things made of iron.',[['My fridge magnet sticks to the steel door, but not to our wooden table.','own'],['Magnets pull all metal things.','wrong'],['Magnets pull things made of iron.','copy']]]];
 const TEDDY={copy:'Teddy: “Those are the teacher’s words. But what do they mean?”',wrong:'Teddy learned something untrue! Check the idea before you teach it.',own:'Teddy: “Oh, now I get it!”'};
 const PART=[['idea','The idea'],['ex','My own example'],['why','Why it happens']];
 const CHUNK=[['Ice turns into water when it warms up.','idea'],['Ice is cold and hard.','true'],['Like my ice lolly dripping on a hot day.','ex'],['My teacher told me so.','auth'],['Heat from the air around it makes the ice melt.','why']];
 const CWHY={true:'True, but it does not explain melting. Pick a part that teaches the idea.',auth:'That says who told you, not why. Explain it yourself.'};
 const GAPS=[['Why do we have day and night?',[['The Earth spins round.','So each side faces the Sun, then faces away.'],['The side facing the Sun has day.','Sunlight lands on it.'],['One spin takes a whole day.','Umm… I am not sure!']],2,'Found out: a day is how long the Earth takes to spin once, about 24 hours.'],
  ['Why do we wash our hands?',[['Germs are tiny living things.','They are too small to see.'],['Soap helps get germs off.','Umm… I am not sure!'],['Wash for about 20 seconds.','It gives the soap time to work.']],1,'Found out: soap loosens germs and dirt, so water can wash them away.']];
 const FIX=[['Find out, then add it','ok'],['Skip that bit','skip'],['Make something up','guess']];
 const FIXWHY={skip:'Skipping hides the gap. Teddy will still be stuck, and so will Pip.',guess:'A made-up answer can be wrong. Find out from a book or a grown-up.'};
 const THING=[['📎','Paper clip (the teacher’s)','teach'],['🚪','Fridge door','ok'],['🥄','Wooden spoon','wood'],['🔩','Iron nail','ok'],['🌯','Kitchen foil','foil'],['🥤','Plastic cup','plastic']];
 const TWHY={teach:'That is the teacher’s example. Make up one of your own.',wood:'The magnet does not pull wood. It does not fit the idea.',foil:'Foil is a metal, but not iron. The magnet does not pull it.',plastic:'The magnet does not pull plastic. It does not fit the idea.'};
 const BEE=[['Bees carry pollen from flower to flower.',1],['The teacher wore a yellow top.',0],['This helps flowers make seeds and fruit.',1],['The video was three minutes long.',0],['Bees make honey from nectar.',1],['Sam sneezed in the lesson.',0]];
VIS.reg('flagteach',c=>{let A,pad,chal,read;
 const S={ti:0,tok:0,slot:[null,null,null],gi:0,gok:0,gap:-1,fixed:0,stuck:[],key:[],bad:null,hold:null,dp:null,p0:null,run:0,want:()=>{},Q:null,note:''};
 const say=t=>{c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(read)read.textContent=t}};
 const mode=()=>['tell','build','gap','magnet','key','quiz'][A.step];
 const sz=z=>A.narrow?z:z+2;
 const font=(x,z,w)=>{x.font=`${w||700} ${sz(z)}px system-ui,sans-serif`};
 function put(x,t,X,Y,z,k,w){font(x,z,w);x.textAlign='center';x.textBaseline='middle';x.fillStyle=k;x.fillText(t,X,Y,A.W-12)}
 function card(x,R,k,em,a){x.fillStyle=A.alpha(k,a||.14);A.paint.rrect(R.x,R.y,R.w,R.h,10);x.fill();x.lineWidth=em?3.5:1.8;x.strokeStyle=k;x.stroke()}
 function wrapIn(x,t,R,z,k,w){font(x,z,w||700);const out=[];let cur='';for(const v of t.split(' ')){const n=cur?cur+' '+v:v;if(cur&&x.measureText(n).width>R.w-14){out.push(cur);cur=v}else cur=n}out.push(cur);
  const g=sz(z)*1.22;out.forEach((l,i)=>put(x,l,R.x+R.w/2,R.y+R.h/2+(i-(out.length-1)/2)*g,z,k,w||700))}
 const over=(p,R)=>R&&p.x>R.x&&p.x<R.x+R.w&&p.y>R.y&&p.y<R.y+R.h;
 const lift=R=>S.dp?{x:S.dp.x-R.w/2,y:S.dp.y-R.h/2,w:R.w,h:R.h}:R;
 const tedR=()=>({x:A.W*.06,y:A.H*.16,w:A.W*.88,h:mn(70,A.H*.17)});
 const optR=i=>{const h=mn(72,A.H*.165);return{x:A.W*.04,y:A.H*.4+i*(h+7),w:A.W*.92,h}};
 const slotR=i=>{const h=mn(44,A.H*.1);return{x:A.W*.04,y:38+i*(h+18),w:A.W*.92,h}};
 const chunkR=i=>{const h=mn(38,A.H*.085);return{x:A.W*.04,y:A.H*.49+i*(h+5),w:A.W*.92,h}};
 const lineR=i=>{const h=mn(64,A.H*.15);return{x:A.W*.04,y:A.H*.11+i*(h+8),w:A.W*.92,h}};
 const fixR=i=>{const h=mn(44,A.H*.095);return{x:A.W*.1,y:A.H*.66+i*(h+6),w:A.W*.8,h}};
 const thingR=i=>{const g=8,w=(A.W-3*g)/2,h=mn(50,A.H*.115);return{x:g+(i%2)*(w+g),y:A.H*.5+Math.floor(i/2)*(h+g),w,h}};
 const beeR=i=>{const g=8,w=(A.W-3*g)/2,h=mn(58,A.H*.135);return{x:g+(i%2)*(w+g),y:A.H*.04+Math.floor(i/2)*(h+g),w,h}};
 const noteR=()=>({x:A.W*.04,y:A.H*.52,w:A.W*.92,h:A.H*.45});
 function tellV(x){const C=A.col;if(S.tok>=2)return put(x,'Teddy understood both, in your own words!',A.W/2,A.H/2,15,C.gr,800);
  const t=TELL[S.ti];put(x,'👩‍🏫 Teacher said: “'+t[0]+'”',A.W/2,A.H*.07,13,C.mu,700);const T=tedR();x.setLineDash([6,5]);card(x,T,C.vi,0,.05);x.setLineDash([]);
  put(x,'🧸',T.x+26,T.y+T.h/2,sz(28),C.tx);wrapIn(x,S.note||'Drag an explanation to Teddy',{x:T.x+50,y:T.y,w:T.w-56,h:T.h},13,S.note?C.tx:C.mu,800);
  t[1].forEach((o,j)=>{const R=optR(j),Q=S.hold===j?lift(R):R;card(x,Q,S.bad===j?C.rd:C.cy,S.hold===j||S.bad===j);wrapIn(x,o[0],Q,13,C.tx)})}
 function buildV(x){const C=A.col;put(x,'Teach it: “Ice melts when it gets warm.”',A.W/2,12,13,C.mu,700);
  PART.forEach((p,i)=>{const R=slotR(i),k=S.slot[i];put(x,p[1],R.x+R.w/2,R.y-9,12,C.mu,800);if(k==null){x.setLineDash([6,5]);card(x,R,C.mu,0,.05);x.setLineDash([])}else{card(x,R,C.gr,0,.16);wrapIn(x,CHUNK[k][0],R,13,C.tx)}});
  if(S.slot.every(v=>v!=null))return put(x,'Idea, your own example, and why: that teaches!',A.W/2,A.H*.62,14,C.gr,800);
  CHUNK.forEach((o,k)=>{if(S.slot.includes(k))return;const R=chunkR(k),Q=S.hold===k?lift(R):R;card(x,Q,S.bad===k?C.rd:C.or,S.hold===k||S.bad===k);wrapIn(x,o[0],Q,13,C.tx)})}
 function gapV(x){const C=A.col;if(S.gok>=2)return put(x,'Teaching it back showed Pip two gaps, now filled!',A.W/2,A.H/2,14,C.gr,800);
  const g=GAPS[S.gi];put(x,'Pip teaches Teddy: '+g[0],A.W/2,A.H*.06,13,C.tx,800);
  g[1].forEach((l,i)=>{const R=lineR(i),isGap=i===g[2]&&S.fixed;card(x,R,S.gap===i?(i===g[2]?C.am:C.rd):isGap?C.gr:C.cy,S.gap===i,.12);
   put(x,'Pip: '+l[0],R.x+R.w/2,R.y+R.h*.3,13,C.tx,800);wrapIn(x,isGap?g[3]:'🧸 Why? → '+l[1],{x:R.x,y:R.y+R.h*.45,w:R.w,h:R.h*.55},12,isGap?C.gr:C.mu,600)});
  if(S.gap===g[2]&&!S.fixed){put(x,'Pip got stuck here. What now?',A.W/2,A.H*.625,13,C.tx,800);FIX.forEach((f,j)=>{const R=fixR(j);card(x,R,S.bad===j?C.rd:C.vi,S.bad===j);put(x,f[0],R.x+R.w/2,R.y+R.h/2,14,C.tx,800)})}
  else if(!S.fixed)put(x,'Tap the part Pip could not explain.',A.W/2,A.H*.7,13,C.mu,700)}
 function magV(x){const C=A.col,mx0=A.W/2,my=A.H*.14,r=mn(A.W,A.H)*.09;put(x,'Idea: magnets pull things made of iron.',A.W/2,14,13,C.mu,700);
  x.lineWidth=r*.55;x.lineCap='butt';x.strokeStyle=C.rd;x.beginPath();x.arc(mx0,my+r*.2,r,Math.PI,0,false);x.stroke();
  x.strokeStyle='#9ca3af';x.beginPath();x.moveTo(mx0-r,my+r*.2);x.lineTo(mx0-r,my+r*.75);x.moveTo(mx0+r,my+r*.2);x.lineTo(mx0+r,my+r*.75);x.stroke();
  S.stuck.forEach((k,n)=>put(x,THING[k][0]+' '+THING[k][1],mx0,my+r*1.2+n*sz(20),13,C.gr,800));
  put(x,S.stuck.length>=2?'Two examples of your own, and both stick!':'Drag your own examples to the magnet.',A.W/2,A.H*.44,13,S.stuck.length>=2?C.gr:C.mu,800);
  THING.forEach((t,i)=>{if(S.stuck.includes(i))return;const R=thingR(i),Q=S.hold===i?lift(R):R;card(x,Q,S.bad===i?C.rd:C.or,S.hold===i||S.bad===i);wrapIn(x,t[0]+' '+t[1],Q,12,C.tx)})}
 function keyV(x){const C=A.col;BEE.forEach((b,i)=>{if(S.key.includes(i))return;const R=beeR(i),Q=S.hold===i?lift(R):R;card(x,Q,S.bad===i?C.rd:C.or,S.hold===i||S.bad===i);wrapIn(x,b[0],Q,12,C.tx)});
  const N=noteR();card(x,N,S.key.length>=3?C.gr:C.vi,0,.07);put(x,`🧸 Teddy’s card: ${S.key.length} of 3 key ideas`,N.x+N.w/2,N.y+16,13,C.tx,800);
  S.key.forEach((k,n)=>wrapIn(x,'✓ '+BEE[k][0],{x:N.x,y:N.y+30+n*N.h*.22,w:N.w,h:N.h*.22},12,C.tx))}
 function draw(A){const{ctx:x,W,H,col:C}=A;x.fillStyle=A.mix(C.pn,'#dcfce7',C.dark?.04:.35);x.fillRect(0,0,W,H);
  const f={tell:tellV,build:buildV,gap:gapV,magnet:magV,key:keyV}[mode()];if(f)f(x);else put(x,S.Q?S.Q.big:'🧸',W/2,H/2,mn(W,H)*.2,C.tx);A.fx.draw(x)}
 function teach(j){if(S.tok>=2)return;const o=TELL[S.ti][1][j];S.note=TEDDY[o[1]];if(o[1]!=='own'){S.bad=j;return nope(S.note)}
  S.bad=null;A.sound.pop();report(S.note);const r=S.run;setTimeout(()=>{if(r!==S.run)return;S.tok++;S.ti=mn(1,S.tok);S.note='';report()},A.reduced()?10:900)}
 function place(k,slot){const o=CHUNK[k],want=PART.findIndex(p=>p[0]===o[1]);if(S.slot.includes(k))return;if(want<0){S.bad=k;return nope(CWHY[o[1]])}
  if(slot!=null&&slot!==want){S.bad=k;return nope(`That part is ${PART[want][1].toLowerCase()}, not ${PART[slot][1].toLowerCase()}.`)}S.bad=null;S.slot[want]=k;A.sound.pop();report(`${PART[want][1]}: ${o[0]}`)}
 function spot(i){const g=GAPS[S.gi];if(S.fixed||S.gok>=2)return;S.gap=i;if(i!==g[2])return nope('Pip explained that part. Look for where Pip got stuck.');A.sound.tick();report('Found the gap. Teaching it back showed Pip what to learn next.')}
 function fix(j){const g=GAPS[S.gi];if(S.gap!==g[2]||S.fixed)return;const f=FIX[j];if(f[1]!=='ok'){S.bad=j;return nope(FIXWHY[f[1]])}S.bad=null;S.fixed=1;A.sound.pop();report(g[3]);
  const r=S.run;setTimeout(()=>{if(r!==S.run)return;S.gok++;S.gi=mn(1,S.gok);S.gap=-1;S.fixed=0;report()},A.reduced()?10:1000)}
 function test(i){if(S.stuck.length>=2||S.stuck.includes(i))return;const t=THING[i];if(t[2]!=='ok'){S.bad=i;return nope(TWHY[t[2]])}S.bad=null;S.stuck.push(i);A.sound.pop();report(`Clunk! The ${t[1].toLowerCase()} sticks: it has iron in it.`)}
 function pick(i){if(S.key.length>=3||S.key.includes(i))return;if(!BEE[i][1]){S.bad=i;return nope('True, but it will not help Teddy understand bees. Pick a key idea.')}S.bad=null;S.key.push(i);A.sound.pop();report('Key idea added.')}
 function nope(t){A.sound.miss();say(t);sync()}
 function report(msg){const v=mode();let t;
  if(v==='tell')t=S.tok>=2?'Both taught.':`Teacher said: ${TELL[S.ti][0]} Which explanation will you give Teddy?`;
  else if(v==='build')t=`Parts filled: ${S.slot.filter(v=>v!=null).length} of 3.`;
  else if(v==='gap')t=S.gok>=2?'Both gaps found and filled.':`Pip teaches: ${GAPS[S.gi][0]} `+GAPS[S.gi][1].map(l=>l[0]+' Why? '+l[1]).join(' ');
  else if(v==='magnet')t=`Your examples that stick: ${S.stuck.length} of 2.`;
  else if(v==='key')t=`Key ideas on Teddy’s card: ${S.key.length} of 3.`;else t='Challenge time.';say((msg?msg+' ':'')+t);sync();S.want()}
 function sync(){if(!A||!pad)return;pad.innerHTML='';const v=mode(),B=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);e.onclick=f};
  if(v==='tell'&&S.tok<2&&!S.note.includes('get it'))TELL[S.ti][1].forEach((o,j)=>B('Explanation '+(j+1),()=>teach(j),'Teach Teddy: '+o[0]));
  if(v==='build')CHUNK.forEach((o,k)=>{if(!S.slot.includes(k))B(o[0],()=>place(k))});
  if(v==='gap'&&S.gok<2&&!S.fixed){if(S.gap===GAPS[S.gi][2])FIX.forEach((f,j)=>B(f[0],()=>fix(j)));else GAPS[S.gi][1].forEach((l,i)=>B('Part '+(i+1),()=>spot(i),'Part '+(i+1)+': '+l[0]+' Why? '+l[1]))}
  if(v==='magnet'&&S.stuck.length<2)THING.forEach((t,i)=>{if(!S.stuck.includes(i))B(t[0]+' '+t[1],()=>test(i),'Try on the magnet: '+t[1])});
  if(v==='key'&&S.key.length<3)BEE.forEach((b,i)=>{if(!S.key.includes(i))B(b[0],()=>pick(i),'Put on Teddy’s card: '+b[0])});A.redraw()}
 const fin=(st,ok,msg)=>()=>{if(A.step===st&&ok()&&(!steps[st].predict||A.pred[st]!=null))A.done(msg()+A.reveal(st))};
 const later=(fs,gap)=>{const r=S.run;fs.forEach((f,j)=>setTimeout(()=>{if(r===S.run)f()},A.reduced()?j*20:j*gap))};
 const reset=()=>{S.run++;S.want=()=>{};S.Q=null;S.hold=null;S.dp=null;S.bad=null;S.note=''};
 const steps=[
  {h:'Teach Teddy',p:'Teaching back means explaining something in your own words, to a person or even a toy. Which explanation helps Teddy?',
   predict:{q:'Pip says the teacher’s exact words. Does that show Pip understands?',opts:['Yes, the words are right','Not yet, Pip might just be copying'],ans:1},task:'Help Teddy understand twice',
   show:()=>{steps[0].go();later([()=>teach(1),()=>teach(0)],1050)},go:()=>{reset();S.ti=0;S.tok=0;report();S.want=fin(0,()=>S.tok>=2,()=>'Own words plus an example showed real understanding. A copy did not.')}},
  {h:'Build an explanation',p:'A strong explanation has the idea, an example you thought of, and why it happens. Drag each part to its box.',task:'Fill all three boxes',
   show:()=>{steps[1].go();later([()=>place(0),()=>place(2),()=>place(4)],450)},go:()=>{reset();S.slot=[null,null,null];report();S.want=fin(1,()=>S.slot.every(v=>v!=null),()=>'Idea, example, reason. "My teacher told me" explains nothing.')}},
  {h:'Find the gap',p:'Teddy keeps asking why. Where Pip gets stuck is a gap: something Pip has not learned yet.',
   predict:{q:'Pip gets stuck on Teddy’s question. Is that bad?',opts:['Yes, Pip failed','No, now Pip knows what to learn'],ans:1},task:'Find and fill both gaps',
   show:()=>{steps[2].go();later([()=>spot(2),()=>fix(0),()=>{},()=>spot(1),()=>fix(0)],600)},go:()=>{reset();S.gi=0;S.gok=0;S.gap=-1;S.fixed=0;report();S.want=fin(2,()=>S.gok>=2,()=>'Explaining out loud showed the gaps, so Pip could fill them.')}},
  {h:'Your own example',p:'Make up examples yourself. Test them: do they really fit the idea?',
   predict:{q:'Which example shows you understand best?',opts:['The one the teacher gave','One you think of yourself'],ans:1},task:'Find two of your own examples that stick',
   show:()=>{steps[3].go();later([()=>test(1),()=>test(3)],450)},go:()=>{reset();S.stuck=[];report();S.want=fin(3,()=>S.stuck.length>=2,()=>'Your own examples, tested, prove the idea. Foil showed not every metal sticks.')}},
  {h:'Teach the key ideas',p:'You can not teach everything. Pick the three ideas that matter most from a lesson about bees.',task:'Put three key ideas on Teddy’s card',
   show:()=>{steps[4].go();later([0,2,4].map(i=>()=>pick(i)),400)},go:()=>{reset();S.key=[];report();S.want=fin(4,()=>S.key.length>=3,()=>'Pollen, seeds and fruit, honey: the ideas that matter. The yellow top does not.')}},
  {h:'Challenge',p:'',go:()=>{reset();quiz()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.want()});
 const QZ=[['Which shows you really understand?','💡',[['Explain it in your own words, with an example','ok'],['Say the teacher’s exact words','copy'],['Say "it is easy"','skip']]],
  ['You get stuck while explaining. What does that tell you?','🧩',[['What I need to learn next','ok'],['That I am bad at it','bad'],['To stop explaining','skip']]],
  ['Idea: some things float. Which is your own example?','🛁',[['My rubber duck in the bath','ok'],['The cork the teacher showed','teach'],['A stone in a pond','wrong']]],
  ['You teach a lesson about teeth. Which is a key idea?','🦷',[['Brushing gets rid of bits that rot teeth','ok'],['The dentist had a blue chair','detail'],['I lost a tooth on Monday','detail']]],
  ['Who can you teach it back to?','🧸',[['A friend, a grown-up or even a toy','ok'],['Only a teacher','who'],['Nobody, just read it again','skip']]],
  ['Idea: magnets pull iron. Which example fits?','🧲',[['An iron nail','ok'],['Kitchen foil','wrong'],['A wooden block','wrong']]]];
 let qn=-1,stars=0;
 function quiz(){qn++;const [q,big,ops]=QZ[qn%QZ.length],rot=qn%3;S.Q={big};
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const r=chal.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},r,o);b.onclick=()=>mark(tag)});say('Challenge: '+q);A.redraw()}
 function mark(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Yes! That is teaching it back.';break;
   case 'copy':m='Copying the words does not show you understand. Say it your own way.';break;
   case 'skip':m='Skipping the explaining skips the learning. Try saying it out loud.';break;
   case 'bad':m='Getting stuck is not failing. It shows what to learn next.';break;
   case 'teach':m='That is the teacher’s example. Think of one of your own.';break;
   case 'wrong':m='That does not fit the idea. Test your example before you teach it.';break;
   case 'detail':m='True, but it is a small detail. Teach the idea that matters.';break;
   default:m='Anyone will do, even a teddy. Saying it out loud is what helps.'}
  const ok=tag==='ok';if(ok){stars++;A.win()}else{stars=0;A.sound.miss()}fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Stars: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
 function down(p){const v=mode();S.p0=p;S.dp=null;S.hold=null;
  if(v==='tell'&&S.tok<2){const j=[0,1,2].find(j=>over(p,optR(j)));if(j!=null){S.hold=j;return true}}
  if(v==='build'){const k=CHUNK.findIndex((o,k)=>!S.slot.includes(k)&&over(p,chunkR(k)));if(k>=0){S.hold=k;return true}}
  if(v==='gap'&&!S.fixed){if(S.gap===GAPS[S.gi][2]){const j=[0,1,2].find(j=>over(p,fixR(j)));if(j!=null)fix(j)}else{const i=[0,1,2].find(i=>over(p,lineR(i)));if(i!=null)spot(i)}return false}
  if(v==='magnet'){const i=THING.findIndex((t,i)=>!S.stuck.includes(i)&&over(p,thingR(i)));if(i>=0){S.hold=i;return true}}
  if(v==='key'){const i=BEE.findIndex((b,i)=>!S.key.includes(i)&&over(p,beeR(i)));if(i>=0){S.hold=i;return true}}return false}
 function up(p){const v=mode(),k=S.hold,far=S.p0&&hy(p.x-S.p0.x,p.y-S.p0.y)>12;S.hold=null;S.dp=null;if(k==null)return A.redraw();
  if(v==='tell'){if(!far||p.y<tedR().y+tedR().h+14)teach(k);else A.redraw()}
  else if(v==='build'){if(!far)return place(k);const s=[0,1,2].find(i=>over(p,slotR(i)));if(s!=null)place(k,s);else A.redraw()}
  else if(v==='magnet'){if(!far||p.y<A.H*.46)test(k);else A.redraw()}
  else if(v==='key'){if(!far||over(p,noteR()))pick(k);else A.redraw()}}
 A=FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:A=>{chal.hidden=A.step!==5;read.hidden=A.step===5;pad.hidden=A.step===5;sync()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
   A.gest({down,move:p=>{if(S.hold!=null){S.dp=p;A.redraw()}},up});sync()}});
 A.start()})})();
