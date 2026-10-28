/* Flagship – learning by watching and copying (ages 2–3, with a grown-up): watch Owl's dance all the way through and
   copy it in order, copy a cup stack by looking, keep eyes on Owl while a butterfly flies past, ask to see the
   hand-washing steps again slowly, then teach Chick a dance and watch Chick copy it. */
(()=>{const lo=Math.min;
 const MV={clap:['👏','clap'],stomp:['🦶','stomp'],wave:['👋','wave'],up:['🙌','hands up'],water:['💧','water on'],soap:['🧼','soap'],rub:['🤲','rub rub'],rinse:['🚿','rinse'],dry:['🧻','dry']};
 const RT=[{seq:['clap','stomp','wave'],set:['clap','stomp','wave','up']},null,{seq:['stomp','clap','clap'],set:['clap','stomp','wave','up']},
  {seq:['water','soap','rub','rinse','dry'],set:['rub','dry','water','rinse','soap']},{seq:[],set:['clap','stomp','wave','up']}];
 const CUP={red:'#dc2626',blue:'#2563eb',yellow:'#eab308'},OWL=['blue','red','yellow'],TRAY=['red','yellow','blue'],SPOT=['at the bottom','in the middle','on top'];
VIS.reg('flagcopy',c=>{let A,pad,chal,read;c.fig.classList.add('young');
 const S={ph:'idle',cur:-1,seen:0,look:'owl',got:[],fin:{},cups:[],mine:[],chick:-1,wrong:null,drag:null,at:null,gen:0,want:()=>{},Q:null};
 const say=t=>{c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(read)read.textContent=t}};
 const view=()=>['dance','cups','dance','dance','teach','quiz'][A.step];
 const z=n=>A.narrow?n:n+3,nm=k=>MV[k][1];
 const text=(x,t,X,Y,n,k,w)=>{x.font=`${w||800} ${z(n)}px system-ui,sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillStyle=k;x.fillText(t,X,Y,A.W-16)};
 const box=(x,R,k,on,a)=>{x.fillStyle=A.alpha(k,a||.14);A.paint.rrect(R.x,R.y,R.w,R.h,16);x.fill();x.strokeStyle=k;x.lineWidth=on?5:2;x.stroke()};
 const inside=(p,R)=>p.x>=R.x&&p.x<=R.x+R.w&&p.y>=R.y&&p.y<=R.y+R.h,nope=t=>{A.sound.miss();say(t);A.redraw()};
 const rt=()=>RT[A.step],stage=()=>({x:10,y:10,w:A.W-20,h:A.H*.46});
 const tileR=(i,n)=>{const g=8,w=(A.W-(n+1)*g)/n,h=lo(96,A.H*.22);return{x:g+i*(w+g),y:A.H-h-10,w,h}};
 function slots(x,list,n,y){const C=A.col,g=8,r=lo(26,(A.W-20)/(n*2)-g);for(let i=0;i<n;i++){const X=A.W/2+(i-(n-1)/2)*(2*r+g);x.beginPath();x.arc(X,y,r,0,7);
  x.fillStyle=list[i]?A.alpha(C.gr,.2):A.alpha(C.mu,.12);x.fill();x.strokeStyle=list[i]?C.gr:C.mu;x.lineWidth=2;x.stroke();if(list[i])text(x,MV[list[i]][0],X,y+1,r*.9,C.tx,400);else text(x,String(i+1),X,y,12,C.mu)}}
 function tiles(x,set){const C=A.col;set.forEach((k,i)=>{const R=tileR(i,set.length);box(x,R,S.wrong===k?C.rd:C.cy,S.wrong===k);text(x,MV[k][0],R.x+R.w/2,R.y+R.h*.4,24,C.tx,400);text(x,nm(k),R.x+R.w/2,R.y+R.h*.8,11,C.tx)})}
 function fly(x,P){const t=performance.now()/300;x.save();x.translate(P.x+P.w/2+Math.cos(t)*P.w*.3,P.y+P.h*.5+Math.sin(t*1.3)*P.h*.2);text(x,'🦋',0,0,P.h*.45,A.col.tx,400);x.restore()}
 function danceV(x){const C=A.col,P=stage(),r=rt();box(x,P,C.vi,0,.08);
  if(S.ph==='play'&&S.look==='fly'){x.fillStyle=A.alpha(C.pn,.85);A.paint.rrect(P.x,P.y,P.w,P.h,16);x.fill();fly(x,P);text(x,'You are watching the butterfly…',A.W/2,P.y+P.h-16,13,C.tx);return finish(x,r)}
  text(x,'🦉',P.x+P.w*.25,P.y+P.h*.5,P.h*.42,C.tx,400);
  if(S.ph==='play'&&S.cur>=0){const k=r.seq[S.cur];text(x,MV[k][0],P.x+P.w*.68,P.y+P.h*.44,P.h*.36,C.tx,400);text(x,`${S.cur+1}. ${nm(k)}`,P.x+P.w*.68,P.y+P.h*.85,15,C.tx)}
  else text(x,S.ph==='copy'&&S.seen?'Your turn!':'Tap Watch Owl',P.x+P.w*.68,P.y+P.h*.5,15,S.ph==='copy'&&S.seen?C.gr:C.mu);finish(x,r)}
 function finish(x,r){slots(x,S.got,r.seq.length,A.H*.58);tiles(x,r.set);if(S.fin[A.step])text(x,'Copied, all in order!',A.W/2,A.H*.67,14,A.col.gr)}
 function cupDraw(x,X,Y,w,h,k){x.fillStyle=k;x.beginPath();x.moveTo(X-w/2,Y-h);x.lineTo(X+w/2,Y-h);x.lineTo(X+w*.36,Y);x.lineTo(X-w*.36,Y);x.closePath();x.fill();x.strokeStyle=A.alpha('#000',.4);x.lineWidth=1.5;x.stroke()}
 const cupW=()=>lo(A.W*.2,90),cupH=()=>lo(A.H*.1,50),trayR=i=>tileR(i,3);
 function cupsV(x){const C=A.col,b=A.H*.66,w=cupW(),h=cupH();x.strokeStyle=C.mu;x.lineWidth=3;x.beginPath();x.moveTo(10,b);x.lineTo(A.W-10,b);x.stroke();
  OWL.forEach((k,i)=>cupDraw(x,A.W*.27,b-i*h,w,h,CUP[k]));S.cups.forEach((k,i)=>cupDraw(x,A.W*.73,b-i*h,w,h,CUP[k]));
  text(x,'🦉 Owl',A.W*.27,b+16,13,C.tx);text(x,'You',A.W*.73,b+16,13,C.tx);if(S.cups.length>=3)text(x,'Same as Owl!',A.W*.73,b-3*h-20,15,C.gr);
  TRAY.forEach((k,i)=>{if(S.cups.includes(k))return;const R=trayR(i),P=S.drag===k&&S.at?S.at:{x:R.x+R.w/2,y:R.y+R.h*.75};box(x,R,S.wrong===k?C.rd:C.mu,S.wrong===k,.08);cupDraw(x,P.x,P.y,w*.8,h*.9,CUP[k]);text(x,k,R.x+R.w/2,R.y+14,11,C.tx)})}
 function teachV(x){const C=A.col,P=stage();box(x,P,C.am,0,.08);text(x,'🐥',P.x+P.w*.25,P.y+P.h*.5,P.h*.4,C.tx,400);
  if(S.chick>=0&&S.chick<3){const k=S.mine[S.chick];text(x,MV[k][0],P.x+P.w*.68,P.y+P.h*.44,P.h*.36,C.tx,400);text(x,`Chick: ${nm(k)}`,P.x+P.w*.68,P.y+P.h*.85,15,C.tx)}
  else text(x,S.chick>=3?'Chick copied you!':'Chick is watching you',P.x+P.w*.68,P.y+P.h*.5,15,S.chick>=3?C.gr:C.mu);slots(x,S.mine,3,A.H*.58);tiles(x,rt().set)}
 function draw(A){const{ctx:x,W,H,col:C}=A,v=view();x.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.05:.4);x.fillRect(0,0,W,H);
  ({dance:danceV,cups:cupsV,teach:teachV}[v]||(x=>text(x,S.Q||'🦉',W/2,H/2,60,C.tx,400)))(x);A.fx.draw(x)}
 function watch(where,gap){if(S.ph==='play'||S.fin[A.step])return;const r=rt(),g=S.gen;S.ph='play';S.look=where||'owl';S.got=[];S.wrong=null;S.cur=-1;S.fin[A.step]=0;gap=A.reduced()?20:gap||650;A.sound.step();
  say(S.look==='fly'?'The butterfly flies past while Owl shows the moves.':'Owl is showing the moves. Watch!');refresh();
  r.seq.forEach((k,i)=>setTimeout(()=>{if(g!==S.gen)return;S.cur=i;if(S.look==='owl')say(`${i+1}: ${nm(k)}`);A.sound.tick();A.redraw()},i*gap));
  setTimeout(()=>{if(g!==S.gen)return;S.ph='copy';S.cur=-1;S.seen=S.look==='owl';
   tell(S.seen?'Owl is done. Now copy the moves in the same order.':'You watched the butterfly, so you missed Owl\u2019s moves. Watch Owl this time.')},r.seq.length*gap+40)}
 function act(k){const r=rt();if(S.fin[A.step])return;
  if(S.ph==='play'){S.wrong=k;return nope('Wait! Owl is still showing. Watch all the way to the end first.')}
  if(!S.seen){S.wrong=k;return nope(S.look==='fly'?'You did not see what Owl did. Your eyes were on the butterfly. Watch Owl first.':'Watch Owl first, then copy.')}
  const want=r.seq[S.got.length];if(k!==want){S.wrong=k;return nope(`Owl did ${nm(want)} there, not ${nm(k)}.${A.step===3?' It is OK to watch again, slowly.':' Try that one again.'}`)}
  S.wrong=null;S.got.push(k);A.sound.pop();if(S.got.length>=r.seq.length)S.fin[A.step]=1;tell(S.fin[A.step]?'You copied it all, in the same order as Owl!':`Yes, ${nm(k)}!`)}
 function stack(k){if(S.cups.length>=3||S.cups.includes(k))return;const want=OWL[S.cups.length];
  if(k!==want){S.wrong=k;return nope(`Look at Owl\u2019s stack. Owl put the ${want} cup ${SPOT[S.cups.length]}.`)}S.wrong=null;S.cups.push(k);A.sound.pop();tell(`The ${k} cup goes ${SPOT[S.cups.length-1]}, just like Owl.`)}
 function teach(k){if(S.mine.length>=3)return;S.mine.push(k);A.sound.pop();if(S.mine.length<3)return tell(`Move ${S.mine.length}: ${nm(k)}.`);
  const g=S.gen,gap=A.reduced()?20:500;S.chick=-1;tell('Chick watched you. Now Chick copies!');S.mine.forEach((m,i)=>setTimeout(()=>{if(g!==S.gen)return;S.chick=i;A.sound.tick();A.redraw()},(i+1)*gap));
  setTimeout(()=>{if(g!==S.gen)return;S.chick=3;tell(`Chick did ${S.mine.map(nm).join(', ')}: the same moves in the same order. Chick learned by watching you.`)},4*gap)}
 function tell(msg){const v=view();let t;
  if(v==='dance'){const r=rt();t=S.ph==='copy'&&S.seen&&!S.fin[A.step]?`Copied ${S.got.length} of ${r.seq.length}. Moves: ${r.set.map(nm).join(', ')}.`:S.fin[A.step]?'':'Tap Watch Owl to see the moves.'}
  else if(v==='cups')t=`Owl\u2019s stack from the bottom: ${OWL.join(', ')}. Yours: ${S.cups.join(', ')||'empty'}.`;
  else if(v==='teach')t=S.mine.length<3?`Pick 3 moves for Chick. Picked: ${S.mine.map(nm).join(', ')||'none'}.`:'';else t='Challenge time.';
  say((msg?msg+' ':'')+t);refresh();S.want()}
 function refresh(){if(!A||!pad)return;pad.innerHTML='';const v=view();
  const B=(t,f,al)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':al||null},pad,t);e.onclick=f};
  if(v==='dance'&&!S.fin[A.step]){if(S.ph!=='play'){B('👀 Watch Owl',()=>watch('owl'));if(A.step===2)B('🦋 Watch the butterfly',()=>watch('fly'));if(A.step===3)B('🐢 Watch again, slowly',()=>watch('owl',1200))}
   rt().set.forEach(k=>B(MV[k][0]+' '+nm(k),()=>act(k),'Copy: '+nm(k)))}
  if(v==='cups'&&S.cups.length<3)TRAY.forEach(k=>{if(!S.cups.includes(k))B(k+' cup',()=>stack(k),`Put the ${k} cup on your stack`)});
  if(v==='teach'&&S.mine.length<3)rt().set.forEach(k=>B(MV[k][0]+' '+nm(k),()=>teach(k),'Show Chick: '+nm(k)));A.redraw()}
 const ok=(st,cond,msg)=>()=>{if(A.step===st&&cond()&&(!steps[st].predict||A.pred[st]!=null))A.done(msg()+A.reveal(st))};
 const seq=(fs,gap,at)=>{const g=S.gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===S.gen)f()},(at||0)+(A.reduced()?j*20:j*gap)))};
 const clear=()=>{S.gen++;S.want=()=>{};S.ph='idle';S.cur=-1;S.seen=0;S.got=[];S.wrong=null;S.drag=null;S.at=null;S.Q=null;S.look='owl'};
 const auto=st=>()=>{steps[st].go();const r=rt(),gap=320;watch('owl',gap);seq(r.seq.map(k=>()=>act(k)),220,A.reduced()?200:r.seq.length*gap+200)};
 const steps=[
  {h:'Watch, then copy',p:'Owl shows a dance. Watch all of it. Then copy the moves in the same order.',
   predict:{q:'When should you start copying Owl?',opts:['Right away, before Owl is done','After I watch it all'],ans:1},task:'Watch Owl, then copy the dance',
   show:auto(0),go:()=>{clear();S.fin[0]=0;tell();S.want=ok(0,()=>S.fin[0],()=>'Watch it all first, then do the same moves in the same order.')}},
  {h:'Stack like Owl',p:'Owl made a stack of cups. Look at it. Drag the cups to make yours the same, bottom first.',task:'Copy Owl\u2019s cup stack',
   show:()=>{steps[1].go();seq(OWL.map(k=>()=>stack(k)),420)},go:()=>{clear();S.cups=[];tell();S.want=ok(1,()=>S.cups.length>=3,()=>'Look, then copy: same cups, same places.')}},
  {h:'Eyes on Owl',p:'A butterfly will fly past. Pick where to look. Then copy Owl.',
   predict:{q:'Can you copy Owl if your eyes are on the butterfly?',opts:['Yes, I can guess','No, my eyes need to be on Owl'],ans:1},task:'Keep your eyes on Owl and copy the moves',
   show:auto(2),go:()=>{clear();S.fin[2]=0;tell();S.want=ok(2,()=>S.fin[2],()=>'To copy, your eyes stay on the one who is showing you.')}},
  {h:'Watch again, slowly',p:'Owl washes hands. There are five steps. It is OK to ask to see it again, slowly.',
   predict:{q:'You forgot a step. What is a good thing to do?',opts:['Stop trying','Ask to see it again'],ans:1},task:'Copy all five hand-washing steps',
   show:auto(3),go:()=>{clear();S.fin[3]=0;tell();S.want=ok(3,()=>S.fin[3],()=>'Long jobs are easier when you watch again, slowly.')}},
  {h:'Now you teach',p:'Chick learns by watching you. Pick three moves. Then watch Chick copy.',task:'Show Chick a three-move dance',
   show:()=>{steps[4].go();seq(['wave','clap','up'].map(k=>()=>teach(k)),400)},go:()=>{clear();S.mine=[];S.chick=-1;tell();S.want=ok(4,()=>S.chick>=3,()=>'Others learn by watching you, too.')}},
  {h:'Challenge',p:'',go:()=>{clear();quiz()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.want()});
 const QZ=[['Gran shows you how to stir. What do you do first?','🥣',[['Watch Gran stir','ok'],['Grab the spoon right away','grab'],['Look at the TV','tv']]],
  ['Owl claps, then stomps. What is the copy?','🦉',[['Clap, then stomp','ok'],['Stomp, then clap','order'],['Just clap','part']]],
  ['You copied a song but missed a bit. What can you do?','🎵',[['Ask to see it again','ok'],['Give up','quit'],['Say I am bad at it','bad']]],
  ['Dad wipes the table. Where do your eyes go?','🧽',[['On Dad\u2019s hands and cloth','ok'],['On the dog','dog'],['Shut them','shut']]],
  ['Your little cousin watches you build. What might they do?','🧱',[['Copy you','ok'],['Nothing at all','nothing'],['Something new every time','random']]],
  ['Owl goes fast. It is hard to copy. What helps?','🐢',[['Watch again, slowly','ok'],['Go even faster','fast'],['Copy only the end','part']]]];
 let qn=-1,run=0;
 function quiz(){qn++;const[q,pic,ops]=QZ[qn%QZ.length],r=qn%3;S.Q=pic;
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>verdict(tag)});say('Challenge: '+q);A.redraw()}
 function verdict(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Yes!';break;
   case 'grab':m='Watch first. If you grab right away, you miss how Gran does it.';break;
   case 'tv':m='Your eyes need to be on Gran to learn how she stirs.';break;
   case 'order':m='Same moves, same order. Owl clapped first, so you clap first.';break;
   case 'part':m='A copy has all the moves, not just one bit.';break;
   case 'quit':m='Missing a bit is OK. Ask to see it again and keep going.';break;
   case 'bad':m='You are still learning. Watching again helps you get it.';break;
   case 'dog':m='Look where the job is happening: Dad\u2019s hands and the cloth.';break;
   case 'shut':m='You can not see the job with your eyes shut. Watch Dad\u2019s hands.';break;
   case 'nothing':m='Little ones watch big ones a lot. They often copy what they see.';break;
   case 'random':m='When they watch you, they try to do the same as you.';break;
   default:m='Faster makes it harder. Ask to watch again, slowly.'}
  const good=tag==='ok';if(good){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${good?'✓':'✗'} ${m}${good?` Stars: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
 function down(p){const v=view();S.drag=null;S.at=null;
  if(v==='dance'||v==='teach'){const set=rt().set,i=set.findIndex((k,i)=>inside(p,tileR(i,set.length)));if(i>=0)(v==='teach'?teach:act)(set[i]);else if(v==='dance'&&inside(p,stage())&&S.ph!=='play')watch('owl');return false}
  if(v==='cups'&&S.cups.length<3){const i=TRAY.findIndex((k,i)=>!S.cups.includes(k)&&inside(p,trayR(i)));if(i>=0){S.drag=TRAY[i];S.at=p;return true}}return false}
 function up(p){const k=S.drag;S.drag=null;S.at=null;if(!k)return A.redraw();if(p.y<A.H*.7&&p.x>A.W*.45)stack(k);else if(trayR(TRAY.indexOf(k))&&inside(p,trayR(TRAY.indexOf(k))))stack(k);else A.redraw()}
 A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;read.hidden=A.step===5;pad.hidden=A.step===5;refresh()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
   A.gest({down,move:p=>{S.at=p;A.redraw()},up});A.every(()=>view()==='dance'&&S.ph==='play'&&S.look==='fly');refresh()}});
 A.start()})})();
