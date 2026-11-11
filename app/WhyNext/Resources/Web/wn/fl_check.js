/* Flagship 72 – checking your own work (ages 5–6): recount Pip's apples one touch each, fix a sentence's slips,
   ask "does it answer the question?", check a sum another way with counters, and order the look-back routine. */
(()=>{const mn=Math.min,hy=Math.hypot;
 const APL=[[.18,.3],[.42,.22],[.68,.32],[.3,.55],[.58,.6]];
 const TOK=[['the','The','A sentence starts with a capital letter.'],['dogran','dog ran','Two words need a finger space.'],['to'],['the'],['park'],['?','.','A sentence ends with a full stop.']];
 const QA=[['How many legs has a dog?','A dog has a tail.',0,'That is true, but the question was about legs.'],['What colour is a banana?','Yellow.',1,'Yellow is the colour of a banana. It answers the question.'],
  ['What do cows say?','Cows eat grass.',0,'True, but it does not say what a cow says. Moo!'],['Where do fish live?','In water.',1,'Fish live in water. That answers where.']];
 const SUM=[[3,4,6],[5,2,7]];
 const ROUT=['Finish the work','Look back at it','Fix any slips','Say "I am done!"'],ROUT_X=[2,0,3,1];
 const EARLY=['','Finish first, then look back.','You have to look back to find the slips.','Not yet! Check before you say done.'];
VIS.reg('flagcheck',c=>{let A,pad,chal,read;c.fig.classList.add('young');
 const S={seen:[],wrote:4,fixed:[],qi:0,qok:0,si:0,red:0,blue:0,ans:-1,sok:0,order:[],bad:null,hold:null,dp:null,p0:null,want:()=>{},run:0,last:'',Q:null};
 const say=t=>{S.last=t;c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(read)read.textContent=t}};
 const mode=()=>['count','fix','match','other','routine','quiz'][A.step];
 const tint=(k,a)=>A.alpha(k,a),Z=z=>A.narrow?z:z+2;
 const font=(x,z,w)=>{x.font=`${w||700} ${Z(z)}px system-ui,sans-serif`;x.textAlign='center';x.textBaseline='middle'};
 const write=(x,t,X,Y,z,k,w)=>{font(x,z,w);x.fillStyle=k;x.fillText(t,X,Y,A.W-16)};
 const panel=(x,R,k,thick,fill)=>{x.fillStyle=tint(k,fill||.13);A.paint.rrect(R.x,R.y,R.w,R.h,12);x.fill();x.strokeStyle=k;x.lineWidth=thick?4:2;x.stroke()};
 const hit=(p,R)=>p.x>R.x&&p.x<R.x+R.w&&p.y>R.y&&p.y<R.y+R.h,blip=t=>{A.sound.miss();say(t);A.redraw()};
 const apple=i=>({x:APL[i][0]*A.W+A.W*.06,y:APL[i][1]*A.H*.85+A.H*.06,r:mn(A.W,A.H)*.075});
 const ansBox=()=>({x:A.W*.25,y:A.H*.76,w:A.W*.5,h:mn(64,A.H*.15)});
 const tokR=i=>{const g=8,w=(A.W-20-2*g)/3,h=mn(60,A.H*.15);return{x:10+(i%3)*(w+g),y:A.H*.3+Math.floor(i/3)*(h+g),w,h}};
 const yn=i=>{const g=10,w=(A.W-30)/2,h=mn(64,A.H*.16);return{x:10+i*(w+g),y:A.H-h-10,w,h}};
 const frameC=i=>{const s=mn((A.W-40)/5,A.H*.13);return{x:A.W/2-2.5*s+(i%5)*s,y:A.H*.3+Math.floor(i/5)*s,s}};
 const pile=i=>{const w=(A.W-30)/2,h=mn(58,A.H*.14);return{x:10+i*(w+10),y:A.H*.64,w,h}};
 const pipBox=()=>({x:A.W*.2,y:A.H-mn(58,A.H*.14)-8,w:A.W*.6,h:mn(58,A.H*.14)});
 const slot=i=>{const h=mn(46,A.H*.1);return{x:A.W*.12,y:12+i*(h+6),w:A.W*.76,h}};
 const rcard=i=>{const g=8,w=(A.W-30)/2,h=mn(56,A.H*.13);return{x:10+(i%2)*(w+g),y:A.H-2*(h+g)+Math.floor(i/2)*(h+g),w,h}};
 function countV(x){const C=A.col;write(x,'How many apples?',A.W/2,16,15,C.tx,800);
  APL.forEach((a,i)=>{const P=apple(i),k=S.seen.indexOf(i);A.paint.ball(P.x,P.y,P.r,'#ef4444');x.fillStyle='#166534';x.fillRect(P.x-2,P.y-P.r-7,4,9);
   if(k>=0){x.fillStyle=C.dark?'#0f172a':'#fff';x.beginPath();x.arc(P.x+P.r*.75,P.y-P.r*.6,P.r*.5,0,7);x.fill();write(x,String(k+1),P.x+P.r*.75,P.y-P.r*.6,14,C.gr,900)}
   if(S.bad===i){x.strokeStyle=C.rd;x.lineWidth=4;x.beginPath();x.arc(P.x,P.y,P.r*1.3,0,7);x.stroke()}});
  const B=ansBox(),done=S.seen.length===5,right=S.wrote===5;panel(x,B,right?C.gr:done?C.rd:C.vi,done);
  write(x,'Pip wrote: '+S.wrote+(right?' ✓':''),B.x+B.w/2,B.y+B.h/2,17,C.tx,900);
  write(x,done?(right?'Checked and fixed!':`You counted 5. Tap Pip's answer to fix it.`):`Counted: ${S.seen.length}`,A.W/2,A.H*.7,14,done&&!right?C.rd:C.mu,800)}
 function fixV(x){const C=A.col;write(x,'Read Pip\'s sentence. Find the slips.',A.W/2,18,14,C.mu,800);
  const live=TOK.map((t,i)=>S.fixed.includes(i)?t[1]:t[0]).filter(w=>w!=='?');write(x,live.join(' ').replace(' .','.'),A.W/2,A.H*.14,19,C.tx,900);
  TOK.forEach((t,i)=>{const R=tokR(i),f=S.fixed.includes(i);panel(x,R,f?C.gr:S.bad===i?C.rd:C.cy,f||S.bad===i);write(x,f?t[1]:t[0],R.x+R.w/2,R.y+R.h/2,18,C.tx,800)});
  const n=S.fixed.length,ck=['Capital letter','Finger spaces','Full stop'];ck.forEach((k,j)=>{const on=S.fixed.includes([0,1,5][j]);write(x,(on?'✓ ':'○ ')+k,A.W/2,A.H*.68+j*Z(22),14,on?C.gr:C.mu,800)});
  if(n>=3)write(x,'All three slips fixed!',A.W/2,A.H*.94,15,C.gr,800)}
 function matchV(x){const C=A.col;if(S.qok>=4)return write(x,'You checked every answer against its question!',A.W/2,A.H/2,15,C.gr,800);
  const q=QA[S.qi];write(x,'Question',A.W/2,A.H*.08,13,C.mu);write(x,q[0],A.W/2,A.H*.16,17,C.tx,900);
  write(x,'Pip\'s answer',A.W/2,A.H*.32,13,C.mu);panel(x,{x:20,y:A.H*.37,w:A.W-40,h:A.H*.16},C.vi);write(x,'"'+q[1]+'"',A.W/2,A.H*.45,18,C.tx,800);
  write(x,`Answer ${S.qi+1} of 4`,A.W/2,A.H*.63,13,C.mu);[['✓ It answers it',C.gr],['✗ It does not',C.rd]].forEach((o,i)=>{const R=yn(i);panel(x,R,o[1],S.bad===i,S.bad===i?.3:.13);write(x,o[0],R.x+R.w/2,R.y+R.h/2,16,C.tx,800)})}
 function otherV(x){const C=A.col;if(S.sok>=2){write(x,'3 + 4 = 7  (Pip fixed 6)',A.W/2,A.H*.32,20,C.tx,800);write(x,'5 + 2 = 7  (it was right)',A.W/2,A.H*.46,20,C.tx,800);return write(x,'Both sums checked with counters!',A.W/2,A.H*.64,16,C.gr,800)}
  const[a,b]=SUM[S.si],got=S.red+S.blue,full=S.red===a&&S.blue===b;write(x,`Pip: ${a} + ${b} = ${S.ans>=0?S.ans:SUM[S.si][2]}`,A.W/2,A.H*.1,22,C.tx,900);
  for(let i=0;i<10;i++){const F=frameC(i);x.strokeStyle=C.mu;x.lineWidth=2;x.strokeRect(F.x,F.y,F.s,F.s);if(i<got){A.paint.ball(F.x+F.s/2,F.y+F.s/2,F.s*.36,i<S.red?'#ef4444':'#3b82f6')}}
  write(x,`Counters: ${got}`,A.W/2,A.H*.58,14,full?C.tx:C.mu,800);
  [['#ef4444',a-S.red,'red'],['#3b82f6',b-S.blue,'blue']].forEach((o,i)=>{const R=pile(i),drag=S.hold===i&&S.dp;panel(x,R,o[0],drag);write(x,`Add ${o[1]} ${o[2]}`,R.x+R.w/2,R.y+R.h/2,15,C.tx,800);
   if(drag)A.paint.ball(S.dp.x,S.dp.y,frameC(0).s*.36,o[0])});
  const P=pipBox(),bad=full&&a+b!==SUM[S.si][2]&&S.ans<0;panel(x,P,bad?C.rd:full?C.gr:C.vi,bad);write(x,bad?`${got} ≠ ${SUM[S.si][2]}: tap to fix`:full?'Checked ✓':'Count to check',P.x+P.w/2,P.y+P.h/2,15,C.tx,800)}
 function routineV(x){const C=A.col;ROUT.forEach((t,i)=>{const R=slot(i),k=S.order[i];panel(x,R,k!=null?C.gr:C.mu,0,k!=null?.2:.06);write(x,(i+1)+'. '+(k!=null?ROUT[k]:'…'),R.x+R.w/2,R.y+R.h/2,15,k!=null?C.tx:C.mu,800)});
  ROUT_X.forEach((k,j)=>{if(S.order.includes(k))return;const R=rcard(j),drag=S.hold===k&&S.dp,Q=drag?{x:S.dp.x-R.w/2,y:S.dp.y-R.h/2,w:R.w,h:R.h}:R;panel(x,Q,S.bad===k?C.rd:C.vi,drag||S.bad===k);write(x,ROUT[k],Q.x+Q.w/2,Q.y+Q.h/2,14,C.tx,800)});
  if(S.order.length>=4)write(x,'Finish, look back, fix, then done!',A.W/2,A.H*.72,15,C.gr,800)}
 function draw(A){const{ctx:x,W,H,col:C}=A,v=mode();x.fillStyle=A.mix(C.pn,'#ecfccb',C.dark?.04:.4);x.fillRect(0,0,W,H);
  const f={count:countV,fix:fixV,match:matchV,other:otherV,routine:routineV}[v];if(f)f(x);else{x.textAlign='center';x.fillStyle=tint(C.vi,.5);x.font=`900 ${mn(W,H)*.16}px system-ui`;x.fillText(S.Q?S.Q.big:'🔍',W/2,H/2)}A.fx.draw(x)}
 function tally(i){if(S.seen.length>=5)return;if(S.seen.includes(i)){S.bad=i;return blip('You counted that apple already! Touch each apple once.')}S.bad=null;S.seen.push(i);A.sound.tick();report()}
 function mend(){if(S.wrote===5)return;if(S.seen.length<5)return blip('Count every apple first. Then you will know.');S.wrote=5;A.sound.pop();report()}
 function tap(i){if(S.fixed.includes(i))return;const t=TOK[i];if(!t[1]){S.bad=i;return blip(`"${t[0]}" is fine. Look for a slip.`)}S.bad=null;S.fixed.push(i);A.sound.pop();report(t[2])}
 function judgeQ(yes){if(S.qok>=4)return;const q=QA[S.qi];if(!!yes!==!!q[2]){S.bad=yes?0:1;return blip(q[3])}S.bad=null;S.qok++;S.qi=mn(3,S.qok);A.sound.pop();report(q[3])}
 function add(k){if(S.sok>=2)return;const[a,b]=SUM[S.si];if(k===0&&S.red<a)S.red++;else if(k===1&&S.blue<b)S.blue++;else return blip(`That is all the ${k?'blue':'red'} ones. Add the ${k?'red':'blue'} ones.`);A.sound.tick();
  if(S.red===a&&S.blue===b&&a+b===SUM[S.si][2])next();report()}
 function correct(){const[a,b,c2]=SUM[S.si];if(S.red<a||S.blue<b)return blip('Put in all the counters first.');if(a+b===c2)return;S.ans=a+b;A.sound.pop();const r=S.run;report();setTimeout(()=>{if(r===S.run)next(),report()},A.reduced()?10:700)}
 function next(){S.sok++;if(S.sok<2){S.si=S.sok;S.red=S.blue=0;S.ans=-1}}
 function put(k){if(S.order.includes(k))return;const want=S.order.length;if(k!==want){S.bad=k;return blip(EARLY[k]||'Finish the work first.')}S.bad=null;S.order.push(k);A.sound.pop();report()}
 function report(msg){const v=mode();let t;
  if(v==='count')t=S.wrote===5?'Pip\'s answer is now 5. Checked!':`Pip wrote ${S.wrote}. You have counted ${S.seen.length} apples.`;
  else if(v==='fix')t='Pip wrote: "'+TOK.map((t,i)=>S.fixed.includes(i)?t[1]:t[0]).join(' ').replace(/ (\W)$/,'$1')+`" Fixed ${S.fixed.length} of 3 slips.`;
  else if(v==='match')t=S.qok>=4?'All four answers checked.':`Question: ${QA[S.qi][0]} Pip says: ${QA[S.qi][1]} Does it answer the question?`;
  else if(v==='other')t=S.sok>=2?'Both sums checked.':`Pip says ${SUM[S.si][0]} + ${SUM[S.si][1]} = ${S.ans>=0?S.ans:SUM[S.si][2]}. Counters: ${S.red} red, ${S.blue} blue.`;
  else if(v==='routine')t=S.order.length>=4?'Finish, look back, fix, say done.':'Checking steps so far: '+(S.order.map(k=>ROUT[k]).join(', ')||'none')+'.';
  else t='Challenge time.';say((msg?msg+' ':'')+t);sync();S.want()}
 function sync(){if(!A||!pad)return;pad.innerHTML='';const v=mode();
  const K=(t,f,off,lab)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':lab||null},pad,t);e.disabled=!!off;e.onclick=f};
  if(v==='count'){APL.forEach((a,i)=>K('Apple '+(i+1),()=>tally(i),S.seen.length>=5));K('Fix Pip\'s answer',mend,S.wrote===5)}
  if(v==='fix')TOK.forEach((t,i)=>K(t[0],()=>tap(i),S.fixed.includes(i),t[0]==='?'?'End of the sentence':'Word: '+t[0]));
  if(v==='match'&&S.qok<4){K('✓ It answers it',()=>judgeQ(1));K('✗ It does not',()=>judgeQ(0))}
  if(v==='other'&&S.sok<2){K('Add a red counter',()=>add(0));K('Add a blue counter',()=>add(1));K('Fix Pip\'s answer',correct)}
  if(v==='routine')ROUT_X.forEach(k=>K(ROUT[k],()=>put(k),S.order.includes(k)));A.redraw()}
 const fin=(st,ok,msg)=>()=>{if(A.step===st&&ok()&&(!steps[st].predict||A.pred[st]!=null))A.done(msg()+A.reveal(st))};
 const later=(fs,gap)=>{const r=S.run;fs.forEach((f,j)=>setTimeout(()=>{if(r===S.run)f()},A.reduced()?j*20:j*gap))};
 const reset=()=>{S.run++;S.want=()=>{};S.Q=null;S.hold=null;S.dp=null;S.bad=null};
 const steps=[
  {h:'Count again',p:'Pip says there are 4 apples. Check! Tap each apple once to count it.',
   predict:{q:'Pip says "Done!" Is Pip\'s answer right?',opts:['Yes, Pip is done','We do not know until we check'],ans:1},task:'Count every apple and fix Pip\'s answer',
   show:()=>{steps[0].go();later([0,1,2,3,4].map(i=>()=>tally(i)).concat([mend]),280)},go:()=>{reset();S.seen=[];S.wrote=4;report();S.want=fin(0,()=>S.wrote===5,()=>'Counting again, one touch for each apple, found Pip\'s slip.')}},
  {h:'Read it back',p:'Read Pip\'s sentence slowly. Tap each slip to fix it. Check: capital letter, finger spaces, full stop.',task:'Fix three slips',
   show:()=>{steps[1].go();later([0,1,5].map(i=>()=>tap(i)),400)},go:()=>{reset();S.fixed=[];report();S.want=fin(1,()=>S.fixed.length>=3,()=>'Reading it back, word by word, found all three slips.')}},
  {h:'Does it answer?',p:'Read the question. Then read Pip\'s answer. Does it answer what was asked?',
   predict:{q:'"How many legs has a dog?" Pip says "A dog has a tail." Is that a good answer?',opts:['Yes, it is true','No, it is about the wrong thing'],ans:1},task:'Check four answers',
   show:()=>{steps[2].go();later([0,1,2,3].map(i=>()=>judgeQ(QA[i][2])),450)},go:()=>{reset();S.qi=0;S.qok=0;report();S.want=fin(2,()=>S.qok>=4,()=>'A true answer can still be wrong if it does not answer the question.')}},
  {h:'Check another way',p:'Pip added in his head. Check with counters: drag or tap the red and blue piles into the frame.',
   predict:{q:'Pip checks 5 + 2 = 7 and it is right. Was checking a waste?',opts:['Yes, a waste','No, now Pip knows'],ans:1},task:'Check both sums with counters',
   show:()=>{steps[3].go();later([0,0,0,1,1,1,1,correct,9,9,9,9,0,0,0,0,0,1,1].map(k=>k===9?()=>{}:typeof k==='number'?()=>add(k):k),220)},go:()=>{reset();S.si=0;S.sok=0;S.red=S.blue=0;S.ans=-1;report();S.want=fin(3,()=>S.sok>=2,()=>'Counters found that 3 + 4 is 7, not 6, and showed 5 + 2 = 7 was right.')}},
  {h:'My checking steps',p:'Put the checking steps in order. Drag a card up, or tap it.',task:'Put the four steps in order',
   show:()=>{steps[4].go();later([0,1,2,3].map(k=>()=>put(k)),350)},go:()=>{reset();S.order=[];report();S.want=fin(4,()=>S.order.length>=4,()=>'Finish, look back, fix, and only then say you are done.')}},
  {h:'Challenge',p:'',go:()=>{reset();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.want()});
 const QZ={done:['You finish your work. What next?','📝',[['Look back and check it','ok'],['Shout "Done!" at once','rush'],['Hide it away','hide']]],
  twice:['You touch one apple twice when counting. What happens?','🍎',[['The count ends up too big','ok'],['Nothing at all','none'],['The count ends up too small','small']]],
  cap:['What does a sentence start with?','🔤',[['A capital letter','ok'],['A full stop','stop'],['A small letter','low']]],
  ask:['"How many legs has a cat?" Pip says "Cats like milk." Is it right?','🐱',[['No, it does not answer it','ok'],['Yes, cats do like milk','true'],['Yes, it is neat','neat']]],
  way:['What is a good way to check 2 + 3 = 5?','✋',[['Count it on fingers','ok'],['Look at it and hope','hope'],['See if it looks neat','neat']]],
  slip:['You check and find a slip. How can you feel?','😊',[['Pleased: I caught it!','ok'],['Sad: I am bad at this','bad'],['Leave it, no one will see','hide']]]};
 let qn=-1,stars=0;
 function ask(){qn++;const K=Object.keys(QZ),k=K[qn%K.length],rot=qn%3,[q,big,ops]=QZ[k];S.Q={big};
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(tag)});say('Challenge: '+q);A.redraw()}
 function mark(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Yes!';break;
   case 'rush':m='Saying done at once skips the check. Look back first.';break;
   case 'hide':m='Hiding a slip means it never gets fixed. Fix it!';break;
   case 'none':m='Two numbers for one apple makes the count too big.';break;
   case 'small':m='Counting one twice adds an extra number, so it is too big.';break;
   case 'stop':m='A full stop goes at the end.';break;
   case 'low':m='The first letter is a capital.';break;
   case 'true':m='True, but it is not about legs. Check it answers the question.';break;
   case 'neat':m='Neat is nice, but neat work can still have slips.';break;
   case 'hope':m='Hoping is not checking. Count it another way.';break;
   default:m='Everyone makes slips. Finding one means your checking worked.'}
  const ok=tag==='ok';if(ok){stars++;A.win()}else{stars=0;A.sound.miss()}fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Stars: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 function down(p){const v=mode();S.p0=p;S.dp=null;S.hold=null;
  if(v==='count'){const i=APL.findIndex((a,i)=>{const P=apple(i);return hy(p.x-P.x,p.y-P.y)<P.r*1.2});if(i>=0)tally(i);else if(hit(p,ansBox()))mend();return false}
  if(v==='fix'){const i=TOK.findIndex((t,i)=>hit(p,tokR(i)));if(i>=0)tap(i);return false}
  if(v==='match'){const i=[0,1].find(i=>hit(p,yn(i)));if(i!=null)judgeQ(i===0);return false}
  if(v==='other'){const i=[0,1].find(i=>hit(p,pile(i)));if(i!=null){S.hold=i;return true}if(hit(p,pipBox()))correct();return false}
  if(v==='routine'){const j=ROUT_X.findIndex((k,j)=>!S.order.includes(k)&&hit(p,rcard(j)));if(j>=0){S.hold=ROUT_X[j];return true}}return false}
 function up(p){const v=mode(),k=S.hold,far=S.p0&&hy(p.x-S.p0.x,p.y-S.p0.y)>12;S.hold=null;S.dp=null;if(k==null)return A.redraw();
  if(v==='other'){if(!far||p.y<A.H*.58)add(k);else A.redraw()}
  else if(v==='routine'){if(!far||p.y<slot(3).y+slot(3).h+20)put(k);else A.redraw()}}
 A=FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:A=>{chal.hidden=A.step!==5;read.hidden=A.step===5;pad.hidden=A.step===5;sync()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
   A.gest({down,move:p=>{S.dp=p;A.redraw()},up});sync()}});
 A.start()})})();
