/* Flagship – looking closely and noticing changes (3–4): slide time to melt ice, spot Before/Now differences, sweep a
   magnifier for tiny details, see fast and slow changes over an hour, a day and a week, and order first, then, now. */
(()=>{const mn=Math.min,mx=Math.max,cl=(v,a,b)=>mn(b,mx(a,v));
 const SCN=[{k:'banana',ch:1,say:'The banana was yellow. Now it has brown spots.'},{k:'puddle',ch:1,say:'The puddle was big. Now it is small.'},
  {k:'teddy',ch:0,say:'The teddy looks the same before and now.'},{k:'flower',ch:1,say:'The flower was shut. Now it is open.'},{k:'ball',ch:0,say:'The ball looks the same before and now.'}];
 const BITS=[{k:'ladybird',u:-.3,v:-.42,n:'a tiny ladybird'},{k:'seed',u:.04,v:.08,n:'a little brown seed'},{k:'drop',u:.36,v:.34,n:'a drop of juice'}];
 const SPOT={Top:[-.3,-.42],Middle:[.04,.08],Bottom:[.36,.34],Left:[-.42,.25]};
 const STOP=['Now','1 hour','1 day','1 week'];
 const ICE=[1,0,0,0],PUD=[1,.5,0,0],BAN=[0,0,.4,1];
 const SETS=[{k:'apple',n:'apple slice',v:[0,.5,1]},{k:'ice',n:'ice',v:[0,.5,1]}];
VIS.reg('flagchange',c=>{let A,ctl,qb,live,Pn,Sd;c.fig.classList.add('young');
 const st={gen:0,hook:()=>{},msg:'',grab:null,ptr:null,slid:0};
 const speak=t=>{c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(live)live.textContent=t}};
 const mode=()=>['melt','spot','lens','time','order','quiz'][A.step];
 const U=()=>mn(A.W,A.H);
 const lb=(x,t,X,Y,z,col,wt)=>{x.font=`${wt||800} ${A.narrow?z:z+3}px system-ui,sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillStyle=col;x.fillText(t,X,Y,A.W-14)};
 const brownOf=b=>A.mix('#facc15','#7c4a1e',b*.85);
 // ---- little pictures
 function banana(x,X,Y,s,b){x.save();x.translate(X,Y);x.rotate(-.35);x.fillStyle=brownOf(b*.6);x.beginPath();x.moveTo(-s,0);x.quadraticCurveTo(0,s*1.1,s,0);x.quadraticCurveTo(0,s*.45,-s,0);x.fill();
  x.strokeStyle='#5b3a12';x.lineWidth=2;x.stroke();if(b>0){x.fillStyle='#4a2c0c';for(let i=0;i<Math.round(b*6);i++){x.beginPath();x.arc(-s*.6+i*s*.24,s*.38+Math.sin(i*2)*s*.06,s*.07,0,7);x.fill()}}x.restore()}
 function puddle(x,X,Y,s,z){if(z<=0)return;x.fillStyle=A.alpha(A.col.cy,.75);x.beginPath();x.ellipse(X,Y+s*.4,s*1.1*z+2,s*.42*z+1,0,0,7);x.fill();x.strokeStyle=A.col.cy;x.lineWidth=2;x.stroke()}
 function flower(x,X,Y,s,o){x.strokeStyle=A.col.gr;x.lineWidth=3;x.beginPath();x.moveTo(X,Y+s);x.lineTo(X,Y);x.stroke();
  if(o>.5){x.fillStyle=A.col.pk;for(let i=0;i<5;i++){const a=i*1.2566;x.beginPath();x.arc(X+Math.cos(a)*s*.42,Y+Math.sin(a)*s*.42,s*.3,0,7);x.fill()}x.fillStyle='#facc15';x.beginPath();x.arc(X,Y,s*.22,0,7);x.fill()}
  else{x.fillStyle=A.col.pk;x.beginPath();x.ellipse(X,Y-s*.15,s*.22,s*.4,0,0,7);x.fill()}}
 function teddy(x,X,Y,s){const k='#b7793f';[[-.55,-.6],[.55,-.6]].forEach(([u,v])=>{x.fillStyle=k;x.beginPath();x.arc(X+u*s,Y+v*s,s*.3,0,7);x.fill()});x.fillStyle=k;x.beginPath();x.arc(X,Y,s*.7,0,7);x.fill();
  x.fillStyle='#1f2937';[-.25,.25].forEach(u=>{x.beginPath();x.arc(X+u*s,Y-s*.12,s*.09,0,7);x.fill()});x.beginPath();x.arc(X,Y+s*.18,s*.12,0,7);x.fill()}
 function ice(x,X,Y,s,m){const C=A.col;x.strokeStyle=A.mix(C.tx,C.pn,.35);x.lineWidth=3;x.beginPath();x.moveTo(X-s,Y-s);x.lineTo(X-s*.8,Y+s);x.lineTo(X+s*.8,Y+s);x.lineTo(X+s,Y-s);x.stroke();
  const lvl=Y+s-s*(.25+m*.55);x.fillStyle=A.alpha(C.cy,.45);x.beginPath();x.moveTo(X-s*.86,lvl);x.lineTo(X-s*.8,Y+s);x.lineTo(X+s*.8,Y+s);x.lineTo(X+s*.86,lvl);x.fill();
  const q=s*.55*(1-m);if(q>1.5){x.fillStyle='#e0f2fe';Pn.rrect(X-q,lvl-q*1.3,q*2,q*2,q*.35);x.fill();x.strokeStyle='#0369a1';x.lineWidth=2;x.stroke()}}
 function slice(x,X,Y,s,b){x.fillStyle=A.mix('#dc2626','#7f1d1d',b*.4);x.beginPath();x.arc(X,Y,s,0,7);x.fill();x.fillStyle=A.mix('#fef9c3','#a0642a',b*.85);x.beginPath();x.arc(X,Y,s*.86,0,7);x.fill()}
 function item(x,k,X,Y,s,now){if(k==='banana')banana(x,X,Y,s,now?1:0);else if(k==='puddle')puddle(x,X,Y,s,now?.45:1);else if(k==='flower')flower(x,X,Y,s,now?1:0);else if(k==='teddy')teddy(x,X,Y,s*.8);else Pn.ball(X,Y,s*.6,A.col.or)}
 // ---- step 0: melt slider
 const track=()=>({x0:A.W*.14,x1:A.W*.86,y:A.H*.88});
 const knobX=t=>{const T=track();return T.x0+(T.x1-T.x0)*t};
 function slider(x,t,marks){const C=A.col,T=track();x.strokeStyle=A.mix(C.ln,C.tx,.3);x.lineWidth=8;x.lineCap='round';x.beginPath();x.moveTo(T.x0,T.y);x.lineTo(T.x1,T.y);x.stroke();
  marks.forEach((m,i)=>{const X=T.x0+(T.x1-T.x0)*i/(marks.length-1);lb(x,m,X,T.y-A.H*.055,12,C.tx,700)});
  Pn.shadow(6,2,.3);x.fillStyle=C.vi;x.beginPath();x.arc(knobX(t),T.y,mn(22,A.W*.055),0,7);x.fill();Pn.noShadow();lb(x,'⏱',knobX(t),T.y,14,'#fff')}
 function meltV(x){const C=A.col,s=U()*.2;ice(x,A.W/2,A.H*.45,s,st.t);slider(x,st.t,['Before','Now']);
  lb(x,st.msg||(st.t>.97?'The ice is water now!':'Drag the clock to see later'),A.W/2,A.H*.08,15,st.t>.97?C.gr:C.tx)}
 function setT(t){st.t=cl(t,0,1);tell()}
 // ---- step 1: spot the difference
 const rowY=now=>A.H*(now?.72:.33),colX=i=>A.W*(i+1)/6,itS=()=>mn(A.W*.07,A.H*.075);
 function spotV(x){const C=A.col,s=itS();[0,1].forEach(now=>{const y=rowY(now);x.fillStyle=A.alpha(now?C.gr:C.am,.12);Pn.rrect(A.W*.03,y-A.H*.16,A.W*.94,A.H*.32,14);x.fill();
   lb(x,now?'Now':'Before',A.W*.1,y-A.H*.12,12,C.tx);SCN.forEach((o,i)=>{item(x,o.k,colX(i),y,s,now);if(now&&st.found[i]){x.strokeStyle=C.gr;x.lineWidth=4;x.beginPath();x.arc(colX(i),y,s*1.35,0,7);x.stroke()}
    if(now&&st.miss===i){x.strokeStyle=C.rd;x.lineWidth=3;x.setLineDash([5,4]);x.beginPath();x.arc(colX(i),y,s*1.35,0,7);x.stroke();x.setLineDash([])}})});
  const n=st.found.filter(Boolean).length;lb(x,st.msg||`Tap what changed in Now (${n} of 3)`,A.W/2,A.H*.07,14,C.tx)}
 function tapSpot(i){const o=SCN[i];if(st.found[i])return;if(!o.ch){st.miss=i;Sd.miss();st.msg='';return tell(o.say+' Find a change.')}
  st.miss=null;st.found[i]=1;Sd.pop();tell('Yes! '+o.say)}
 // ---- step 2: magnifier
 const appleP=()=>({X:A.W/2,Y:A.H*.5,R:U()*.36}),lensR=()=>U()*.15;
 function bit(x,b,X,Y,s){if(b.k==='ladybird'){x.fillStyle='#dc2626';x.beginPath();x.arc(X,Y,s,0,7);x.fill();x.fillStyle='#111';x.fillRect(X-.4,Y-s,.8,s*2);[[-.4,-.2],[.4,.3]].forEach(([u,v])=>{x.beginPath();x.arc(X+u*s,Y+v*s,s*.25,0,7);x.fill()})}
  else if(b.k==='seed'){x.fillStyle='#5b3410';x.beginPath();x.ellipse(X,Y,s*.6,s,0,0,7);x.fill()}else{x.fillStyle=A.alpha('#bae6fd',.95);x.beginPath();x.arc(X,Y,s*.8,0,7);x.fill();x.strokeStyle='#0284c7';x.lineWidth=1;x.stroke()}}
 function appleScene(x,z,cx,cy){const P=appleP();x.save();x.translate(cx,cy);x.scale(z,z);x.translate(-cx,-cy);slice(x,P.X,P.Y,P.R,.15);BITS.forEach(b=>bit(x,b,P.X+b.u*P.R,P.Y+b.v*P.R,P.R*.025));x.restore()}
 function lensV(x){const C=A.col,L=st.lens,r=lensR();appleScene(x,1,0,0);x.save();x.beginPath();x.arc(L.x,L.y,r,0,7);x.clip();x.fillStyle=C.pn;x.fillRect(0,0,A.W,A.H);appleScene(x,3.2,L.x,L.y);x.restore();
  x.strokeStyle='#334155';x.lineWidth=7;x.beginPath();x.arc(L.x,L.y,r,0,7);x.stroke();x.strokeStyle='#a16207';x.lineWidth=10;x.lineCap='round';x.beginPath();x.moveTo(L.x+r*.72,L.y+r*.72);x.lineTo(L.x+r*1.35,L.y+r*1.35);x.stroke();
  const n=st.seen.filter(Boolean).length;lb(x,st.msg||`Move the magnifier. Found ${n} of 3`,A.W/2,A.H*.07,14,C.tx)}
 function lensCheck(){const P=appleP(),L=st.lens;let hit=null;BITS.forEach((b,i)=>{if(!st.seen[i]&&H(L.x-(P.X+b.u*P.R),L.y-(P.Y+b.v*P.R))<lensR()*.45){st.seen[i]=1;hit=b}});
  if(hit){Sd.pop();tell(`Up close you can see ${hit.n}! `)}else A.redraw()}
 function lensTo(name){const P=appleP(),[u,v]=SPOT[name];A.tween(st.lens,{x:P.X+u*P.R,y:P.Y+v*P.R},450,'out',()=>{const before=st.seen.join('');lensCheck();if(st.seen.join('')===before)tell('Nothing new here. Try another spot.')})}
 // ---- step 3: fast or slow
 function timeV(x){const C=A.col,s=U()*.11,k=st.stop,y=A.H*.42;ice(x,A.W*.2,y,s,1-ICE[k]);puddle(x,A.W*.5,y,s*1.3,PUD[k]);if(!PUD[k])lb(x,'dry',A.W*.5,y+s*.5,12,C.mu,700);banana(x,A.W*.8,y,s*1.1,BAN[k]);
  ['Ice','Puddle','Banana'].forEach((n,i)=>lb(x,n,A.W*(.2+i*.3),A.H*.64,13,C.tx,700));slider(x,k/3,STOP);
  lb(x,st.msg||'Tap a time on the clock line',A.W/2,A.H*.08,14,C.tx)}
 const STORY=['Now: hard ice, a big puddle, a yellow banana.','1 hour later the ice has melted and the puddle is smaller. The banana looks the same.','1 day later the puddle has dried up. The banana has brown spots.','1 week later the banana is brown all over. Some changes are fast, some slow.'];
 function goStop(k){st.stop=k;st.visit[k]=1;Sd.tick();tell(STORY[k])}
 // ---- step 4: first, then, now
 const slotP=i=>[A.W*(i+1)/4,A.H*.38],cardP=i=>[A.W*(i+1)/4,A.H*.78],cardS=()=>mn(A.W*.1,A.H*.1);
 function pic(x,k,X,Y,s,v){if(k==='apple')slice(x,X,Y,s*.7,v);else ice(x,X,Y,s*.65,v)}
 function orderV(x){const C=A.col,S=SETS[st.set],s=cardS();if(!S)return lb(x,'Both in order!',A.W/2,A.H/2,18,C.gr);
  ['First','Then','Now'].forEach((n,i)=>{const[X,Y]=slotP(i);x.strokeStyle=C.mu;x.lineWidth=2;x.setLineDash([6,5]);Pn.rrect(X-s,Y-s,s*2,s*2,12);x.stroke();x.setLineDash([]);lb(x,n,X,Y-s*1.3,13,C.tx);
   const j=st.slot[i];if(j!=null)pic(x,S.k,X,Y,s,S.v[j])});
  st.deck.forEach((j,i)=>{if(j==null||(st.grab===i&&st.slid))return;const[X,Y]=cardP(i);x.fillStyle=A.alpha(C.cy,.12);Pn.rrect(X-s,Y-s,s*2,s*2,12);x.fill();x.strokeStyle=st.pick===i?C.tx:C.cy;x.lineWidth=st.pick===i?4:2;x.stroke();pic(x,S.k,X,Y,s,S.v[j])});
  if(st.grab!=null&&st.slid&&st.ptr)pic(x,S.k,st.ptr.x,st.ptr.y,s,S.v[st.deck[st.grab]]);
  lb(x,st.msg||`Put the ${S.n} pictures in order`,A.W/2,A.H*.07,14,C.tx)}
 const shuffleOf=n=>n?[1,0,2]:[2,0,1];
 function newSet(){st.slot=[null,null,null];st.deck=shuffleOf(st.set);st.pick=null}
 function drop(i){const S=SETS[st.set],next=st.slot.indexOf(null),j=st.deck[i];st.pick=null;if(j==null||next<0)return;
  if(j!==next){Sd.miss();st.msg='';const w=S.k==='apple'?(j>next?'This slice is more brown. Brown comes later.':'This slice is less brown. It came earlier.'):(j>next?'There is less ice here. Melting comes later.':'There is more ice here. It came earlier.');return tell(w+` Find the ${['first','then','now'][next]} picture.`)}
  st.slot[next]=j;st.deck[i]=null;Sd.pop();if(next===2){st.set++;tell(`First, then, now: the ${S.n} changed bit by bit.`);if(st.set<SETS.length){const g=st.gen;setTimeout(()=>{if(g===st.gen){newSet();tell()}},700)}}else tell()}
 // ---- live description + pads
 function tell(note){const m=mode();let t='';
  if(m==='melt')t=st.t>.97?'The cup now has water and no ice.':`Ice cube in a cup. Time: ${Math.round(st.t*100)}% of the way to Now.`;
  else if(m==='spot')t=`Found: ${SCN.filter((o,i)=>st.found[i]).map(o=>o.k).join(', ')||'nothing yet'}.`;
  else if(m==='lens')t=`Magnifier over the apple slice. Found: ${BITS.filter((b,i)=>st.seen[i]).map(b=>b.n).join(', ')||'nothing yet'}.`;
  else if(m==='time')t=`Time: ${STOP[st.stop]}. Seen ${st.visit.filter(Boolean).length} of 4 times.`;
  else if(m==='order'){const S=SETS[st.set];t=S?`Order the ${S.n}: ${st.slot.filter(v=>v!=null).length} of 3 placed.`:'Both sets are in order.'}
  else t='Challenge time.';speak((note?note+' ':'')+t);pads();st.hook()}
 function pads(){if(!A||!ctl)return;ctl.innerHTML='';const m=mode();
  const B=(t,f,al)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':al||null},ctl,t);e.onclick=f};
  if(m==='melt'){B('⏪ Earlier',()=>setT(st.t-.25),'Go back in time');B('⏩ Later',()=>setT(st.t+.25),'Go forward in time')}
  if(m==='spot')SCN.forEach((o,i)=>{if(!st.found[i])B(o.k[0].toUpperCase()+o.k.slice(1),()=>tapSpot(i),`Did the ${o.k} change?`)});
  if(m==='lens')Object.keys(SPOT).forEach(n=>B('🔍 '+n,()=>lensTo(n),`Move the magnifier to the ${n.toLowerCase()} of the slice`));
  if(m==='time')STOP.forEach((n,k)=>B('⏱ '+n,()=>goStop(k),`Show ${n}`));
  if(m==='order'&&SETS[st.set]){if(st.pick==null)st.deck.forEach((j,i)=>{if(j!=null)B(`Picture ${i+1}`,()=>{st.pick=i;Sd.tick();tell(`Picture ${i+1} picked. ${SETS[st.set].k==='apple'?`It is ${['not brown','a bit brown','very brown'][j]}`:`It has ${['a big ice cube','a small ice cube','no ice, just water'][j]}`}.`)},`Pick picture ${i+1}`)});
   else{B('⬆ Put it next',()=>drop(st.pick),'Put it in the next empty box');B('✋ Another',()=>{st.pick=null;pads()},'Pick another picture')}}
  A.redraw()}
 const fin=(k,test,say)=>()=>{if(A.step===k&&test()&&(!steps[k].predict||A.pred[k]!=null))A.done(say()+A.reveal(k))};
 const later=(fs,gap)=>{const g=st.gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===st.gen)f()},j*gap))};
 const reset=()=>{st.gen++;st.hook=()=>{};st.grab=null;st.ptr=null;st.msg='';st.miss=null;st.pick=null};
 const steps=[
  {h:'Watch the ice',p:'Here is an ice cube in a cup. Drag the clock along to see what happens later.',predict:{q:'The cup sits in a warm room. What will the ice do?',opts:['Stay the same','Melt into water'],ans:1},task:'Drag the clock all the way to Now',
   show:()=>{steps[0].go();later([.25,.5,.75,1].map(t=>()=>setT(t)),350)},go:()=>{reset();st.t=0;tell();st.hook=fin(0,()=>st.t>.97,()=>'Before: hard ice. Now: water. The ice changed, it did not go away.')}},
  {h:'Spot the change',p:'Look at Before and Now. What is different? Tap it in the Now picture.',task:'Find the 3 things that changed',
   show:()=>{steps[1].go();later([0,1,3].map(i=>()=>tapSpot(i)),450)},go:()=>{reset();st.found=[0,0,0,0,0];tell();st.hook=fin(1,()=>st.found.filter(Boolean).length===3,()=>'Banana, puddle and flower changed. The teddy and ball stayed the same.')}},
  {h:'Look up close',p:'A magnifier makes small things look big. Drag it over the apple slice.',task:'Find 3 tiny things',
   show:()=>{steps[2].go();later(['Top','Middle','Bottom'].map(n=>()=>lensTo(n)),600)},go:()=>{reset();st.seen=[0,0,0];const P=appleP();st.lens={x:P.X+P.R*.5,y:P.Y-P.R*.6};tell();st.hook=fin(2,()=>st.seen.every(Boolean),()=>'Looking up close helps you notice tiny things.')}},
  {h:'Fast or slow?',p:'Ice, a puddle and a banana sit in the sun. Tap each time to see what changes.',predict:{q:'Which changes first?',opts:['The banana','The ice'],ans:1},task:'Look at all 4 times',
   show:()=>{steps[3].go();later([1,2,3].map(k=>()=>goStop(k)),450)},go:()=>{reset();st.stop=0;st.visit=[1,0,0,0];tell(STORY[0]);st.hook=fin(3,()=>st.visit.every(Boolean),()=>'Ice melts fast. The banana goes brown slowly, over days.')}},
  {h:'First, then, now',p:'Put the pictures in order. Say it: first, then, now.',task:'Put both sets in order',
   show:()=>{steps[4].go();const one=()=>{const S=SETS[st.set];if(!S)return;const n=st.slot.indexOf(null);drop(st.deck.indexOf(n))};later([one,one,one,()=>{},one,one,one],450)},
   go:()=>{reset();st.set=0;newSet();tell();st.hook=fin(4,()=>st.set>=SETS.length,()=>'Changes happen bit by bit. First, then, now tells the story.')}},
  {h:'Challenge',p:'',go:()=>{reset();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>st.hook()});
 const QS=[['The ice cube is gone. Now the cup has water. What happened?','ice',[['It melted into water','ok'],['It went away','gone'],['Someone ate it','ate']]],
  ['Before, the puddle was big. Now it is small. What changed?','pud',[['It got smaller','ok'],['It got bigger','bigger'],['Nothing','nothing']]],
  ['The banana was yellow. Now it has brown spots. Is it the same banana?','ban',[['Yes, it changed','ok'],['No, a new banana','new'],['It did not change','same']]],
  ['What helps you see a tiny bug on a leaf?','lens',[['A magnifier','ok'],['A quick look far away','far'],['Shutting your eyes','shut']]],
  ['Which is slow: ice melting or a banana going brown?','ban',[['The banana going brown','ok'],['The ice melting','fast'],['Both are the same','both']]],
  ['First the apple slice is white. Then what?','apple',[['It goes brown','ok'],['It goes white again','back'],['It grows bigger','grow']]]];
 let qi=-1,sc=0;
 function quizV(x){const k=QS[qi%QS.length][1],X=A.W/2,Y=A.H/2,s=U()*.22;if(k==='ice')ice(x,X,Y,s,1);else if(k==='pud')puddle(x,X,Y,s*1.2,.45);else if(k==='ban')banana(x,X,Y,s,.6);else if(k==='lens'){x.strokeStyle='#334155';x.lineWidth=8;x.beginPath();x.arc(X,Y,s*.7,0,7);x.stroke()}else slice(x,X,Y,s*.8,0)}
 function ask(){qi++;const[q,,ops]=QS[qi%QS.length],r=qi%3;
  qb.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=qb.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(tag)});speak('Challenge: '+q);A.redraw()}
 function mark(tag){qb.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=qb.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Yes!';break;
   case 'gone':m='The ice did not go away. It turned into the water in the cup.';break;
   case 'ate':m='Nobody ate it. Warm ice melts into water.';break;
   case 'bigger':m='Look again: before big, now small. The puddle got smaller as it dried.';break;
   case 'nothing':m='Something did change. The puddle is smaller now than before.';break;
   case 'new':m='It is the same banana. It changed colour as it got older.';break;
   case 'same':m='It did change. Yellow before, brown spots now: that is a change.';break;
   case 'far':m='A quick look from far misses tiny things. Use a magnifier.';break;
   case 'shut':m='You need your eyes open to look. A magnifier makes the bug look big.';break;
   case 'fast':m='Ice melts fast, in about an hour in the sun. The banana takes days.';break;
   case 'both':m='They are not the same. Ice melts in an hour; a banana browns over days.';break;
   case 'back':m='It does not go back to white. It goes brown, and stays brown.';break;
   default:m='The slice does not grow. It goes brown when it is left out.'}
  const good=tag==='ok';if(good){sc++;A.win()}else{sc=0;Sd.miss()}fb.innerHTML=`${good?'✓':'✗'} ${m}${good?` Stars: ${sc}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 function draw(A){const{ctx:x,W,H,col:C}=A,m=mode();x.fillStyle=A.mix(C.pn,'#dcfce7',C.dark?.05:.4);x.fillRect(0,0,W,H);
  ({melt:meltV,spot:spotV,lens:lensV,time:timeV,order:orderV,quiz:quizV})[m](x);A.fx.draw(x)}
 const close=(p,X,Y,d)=>Math.hypot(p.x-X,p.y-Y)<d,H=Math.hypot;
 function onDown(p){const m=mode(),T=track();st.grab=null;st.ptr=null;st.slid=0;st.p0=p;
  if(m==='melt'){if(Math.abs(p.y-T.y)<A.H*.08){st.grab=0;setT((p.x-T.x0)/(T.x1-T.x0));return true}return false}
  if(m==='spot'){const i=SCN.findIndex((o,i)=>close(p,colX(i),rowY(1),itS()*1.6));if(i>=0)tapSpot(i);return false}
  if(m==='lens'){if(close(p,st.lens.x,st.lens.y,lensR()*1.3)){st.grab=0;return true}return false}
  if(m==='time'){if(Math.abs(p.y-T.y)<A.H*.1){goStop(Math.round(cl((p.x-T.x0)/(T.x1-T.x0),0,1)*3))}return false}
  if(m==='order'){const i=[0,1,2].find(i=>st.deck[i]!=null&&close(p,...cardP(i),cardS()*1.3));if(i!=null){st.grab=i;return true}if(st.pick!=null&&p.y<A.H*.6)drop(st.pick);return false}return false}
 function onMove(p){if(st.grab==null)return;if(H(p.x-st.p0.x,p.y-st.p0.y)>10)st.slid=1;st.ptr=p;const m=mode(),T=track();
  if(m==='melt'){st.t=cl((p.x-T.x0)/(T.x1-T.x0),0,1);A.redraw()}else if(m==='lens'){st.lens.x=cl(p.x,0,A.W);st.lens.y=cl(p.y,A.H*.12,A.H);lensCheck()}else A.redraw()}
 function onUp(p){const i=st.grab,m=mode(),slid=st.slid;st.grab=null;st.slid=0;st.ptr=null;if(i==null)return;
  if(m==='melt')return tell();if(m==='lens')return tell();
  if(m==='order'){if(!slid){st.pick=i;Sd.tick();return tell(`Picture ${i+1} picked. Tap the top row to put it next.`)}if(p.y<A.H*.6)drop(i);else A.redraw()}}
 A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{qb.hidden=A.step!==5;live.hidden=A.step===5;ctl.hidden=A.step===5;pads()},
  init:A=>{Pn=A.paint;Sd=A.sound;const E=c.el,bx=E('div',{class:'fl-below'},A.below);live=E('p',{class:'fl-read','aria-hidden':'true'});
   ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);qb=E('div',{class:'fl-chal'},A.below);
   st.t=0;A.gest({down:onDown,move:onMove,up:onUp});pads()}});
 A.start()})})();
