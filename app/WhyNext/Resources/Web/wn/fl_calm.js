/* Flagship – simple calming strategies (ages 5–7, with a grown-up): shrink a feelings storm with slow balloon breaths
   (fast puffs make it grow), count ten slow stepping stones, drag Mia to a safe quiet space, pick a calm tool that fits
   each upset, then put "big feeling → notice → calm tool → body settles → fix it" in order. */
(()=>{const lo=Math.min,hi=Math.max;
 const SPOT=[['🛋️','Calm corner',1,'Yes! A calm corner is quiet, and your teacher can see you.'],
  ['🚪','Run out of the gate',0,'Running off alone is not safe. A grown-up must know where you are.'],
  ['📺','Loud TV room',0,'A loud room keeps your body buzzing. Quiet helps it settle.'],
  ['🛏️','My bed, after I tell Mum',1,'Yes! Your bed is quiet, and Mum knows where you are.']];
 const TOOL=[['🎈','Balloon breaths','b'],['🔢','Count to ten','c'],['🤫','Quiet space','q'],['👊','Hit back','hit'],['📢','Shout','shout']];
 const SCENE=[['🎲','Leo loses a game.','any','Leo'],['🧸','Ava\u2019s brother grabs her teddy.','any','Ava'],['🎉','The party is too loud for Sam.','q','Sam']];
 const LINE=[['😣','Big feeling'],['🔍','Notice it'],['🎈','Use a calm tool'],['🙂','Body settles'],['💬','Fix it: say how you feel']],MIX=[2,4,0,3,1];
VIS.reg('flagcalm',c=>{let A,pad,chal,read;c.fig.classList.add('young');
 const S={lvl:4,bal:0,full:0,slow:0,busy:0,t0:0,drag:null,n:0,last:0,got:[],wrong:-1,mia:null,si:0,sok:0,line:[],gen:0,want:()=>{}};
 const say=t=>{c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(read)read.textContent=t}};
 const view=()=>['breath','count','space','tool','order','quiz'][A.step];
 const fz=z=>A.narrow?z:z+3;
 const txt=(x,t,X,Y,z,k,w)=>{x.font=`${w||800} ${fz(z)}px system-ui,sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillStyle=k;x.fillText(t,X,Y,A.W-16)};
 const wrap=(x,t,X,Y,w,z,k)=>{x.font=`800 ${fz(z)}px system-ui,sans-serif`;const L=[];let r='';t.split(' ').forEach(v=>{const q=r?r+' '+v:v;if(r&&x.measureText(q).width>w-8){L.push(r);r=v}else r=q});L.push(r);
  const g=fz(z)*1.15;L.forEach((l,i)=>txt(x,l,X,Y+(i-(L.length-1)/2)*g,z,k))};
 const box=(x,R,k,on)=>{x.fillStyle=A.alpha(k,.14);A.paint.rrect(R.x,R.y,R.w,R.h,16);x.fill();x.strokeStyle=k;x.lineWidth=on?5:2;x.stroke()};
 const inR=(p,R)=>p.x>=R.x&&p.x<=R.x+R.w&&p.y>=R.y&&p.y<=R.y+R.h,oops=t=>{A.sound.miss();say(t);A.redraw()};
 const FACE=['😊','🙂','😐','😟','😣'];
 function storm(x,X,Y,l){const C=A.col,r=A.H*.04*(1+l*.5);if(l>0){x.fillStyle=A.mix(C.mu,C.pn,.25);[[-.6,.1,.7],[0,-.15,.9],[.6,.1,.7]].forEach(([dx,dy,k])=>{x.beginPath();x.arc(X+dx*r,Y+dy*r,r*k,0,7);x.fill()});
   if(l>2)txt(x,'⚡',X,Y+r*.9,14+l*3,C.am,400)}else txt(x,'☀️',X,Y,30,C.am,400);txt(x,FACE[l],X,A.H*.62,34,C.tx,400)}
 // ---- step 1: balloon breaths ----
 const balR=()=>({x:A.W*.72,y:A.H*.5,r:lo(A.W*.16,A.H*.3)});
 function breathV(x){const C=A.col,B=balR(),r=B.r*(.5+.5*S.bal);storm(x,A.W*.25,A.H*.25,S.lvl);
  txt(x,`Storm size: ${S.lvl} of 4`,A.W*.25,A.H*.86,13,C.tx);
  x.fillStyle=A.mix(C.pk,C.pn,.15);x.beginPath();x.ellipse(B.x,B.y,r*.85,r,0,0,7);x.fill();x.strokeStyle=C.tx;x.lineWidth=1.5;x.beginPath();x.moveTo(B.x,B.y+r);x.lineTo(B.x,A.H*.97);x.stroke();
  txt(x,S.lvl<=1?'The storm is small now!':S.full?'Now let it out s-l-o-w-l-y':'Drag the balloon up to breathe in',A.W/2,A.H*.06,15,S.lvl<=1?C.gr:C.tx)}
 function inhale(ms,cb){if(S.busy||S.lvl<=1)return;if(S.full)return oops('Your balloon is full. Now breathe out slowly.');S.busy=1;
  A.tween(S,{bal:1},ms||1200,'io',()=>{S.busy=0;S.full=1;A.sound.tick();tell('Balloon full of air.');cb&&cb()})}
 function exhale(slow,ms,cb){if(S.busy||S.lvl<=1)return;if(!S.full)return oops('Breathe in first. Fill the balloon up.');S.busy=1;
  A.tween(S,{bal:0},slow?(ms||2400):250,slow?'io':'out',()=>{S.busy=0;S.full=0;
   if(slow){S.lvl--;S.slow++;A.sound.pop();tell(S.lvl<=1?'Three slow breaths. Your body has settled.':'Slow breath out. The storm got smaller.')}
   else{const g=S.lvl<4;S.lvl=lo(4,S.lvl+1);oops(`A fast puff makes your heart go faster, so the storm ${g?'grew':'stays big'}. Breathe out slowly, like cooling hot soup.`);refresh()}cb&&cb()})}
 // ---- step 2: count to ten ----
 const stone=i=>{const g=A.W/6,row=i<5?0:1,k=row?9-i:i;return{x:g*(k+.5)+g*.25,y:A.H*(row?.74:.4),r:lo(g*.4,A.H*.11)}};
 function countV(x){const C=A.col,l=hi(0,4-Math.floor(S.n*.4));txt(x,FACE[l]+(l>2?' ⛈️':l>0?' ☁️':' ☀️'),A.W/2,A.H*.57,22,C.tx,400);
  for(let i=0;i<10;i++){const s=stone(i),on=i<S.n;x.fillStyle=on?A.mix(C.gr,C.pn,.35):A.mix(C.mu,C.pn,.6);x.beginPath();x.arc(s.x,s.y,s.r,0,7);x.fill();
   x.strokeStyle=i===S.n?C.ac:C.mu;x.lineWidth=i===S.n?4:1.5;x.stroke();txt(x,String(i+1),s.x,s.y,15,C.tx)}
  const at=stone(hi(0,S.n-1));txt(x,'🐰',at.x,at.y-A.H*.12,24,C.tx,400);
  txt(x,S.n>=10?'Ten slow counts. Calm again!':`Tap stone ${S.n+1}. Slow, like big steps.`,A.W*.42,A.H*.08,14,S.n>=10?C.gr:C.tx)}
 function hop(i,auto){if(S.n>=10)return;if(i!==S.n)return oops(`Count in order. The next stone is ${S.n+1}.`);const t=performance.now();
  if(!auto&&S.n&&t-S.last<600)return oops('Whoa, too fast! Fast counting does not give your body time. Wait a moment, then tap.');
  S.last=t;S.n++;A.sound.tick();tell(S.n>=10?'Ten! The wait gave your body time to settle.':`${S.n}.`)}
 // ---- step 3: quiet space ----
 const spotR=i=>{const g=10,w=(A.W-3*g)/2,h=A.H*.3;return{x:g+(i%2)*(w+g),y:A.H*.12+Math.floor(i/2)*(h+g),w,h}};
 const home=()=>({x:A.W/2,y:A.H*.9});
 function spaceV(x){const C=A.col;SPOT.forEach((s,i)=>{const R=spotR(i),got=S.got.includes(i);box(x,R,got?C.gr:S.wrong===i?C.rd:C.cy,got||S.wrong===i);
   txt(x,s[0],R.x+R.w/2,R.y+R.h*.38,26,C.tx,400);wrap(x,s[1],R.x+R.w/2,R.y+R.h*.76,R.w,12,C.tx)});
  const P=S.mia||home();txt(x,'🧒',P.x,P.y,28,C.tx,400);
  txt(x,S.got.length>=2?'Two safe, quiet places found!':'Drag Mia to a safe, quiet place',A.W/2,A.H*.05,14,S.got.length>=2?C.gr:C.tx)}
 function goSpot(i){if(S.got.length>=2||S.got.includes(i))return;const s=SPOT[i];S.mia=null;
  if(!s[2]){S.wrong=i;return oops(s[3])}S.wrong=-1;S.got.push(i);A.sound.pop();tell(s[3])}
 // ---- step 4: pick a tool that fits ----
 const toolR=i=>{const g=8,per=A.narrow?3:5,w=(A.W-g*(per+1))/per,h=A.H*(A.narrow?.17:.22);return{x:g+(i%per)*(w+g),y:A.H*.5+Math.floor(i/per)*(h+g),w,h}};
 function toolV(x){const C=A.col;if(S.sok>=3)return txt(x,'Calm tools, not hurting tools!',A.W/2,A.H*.4,17,C.gr);const s=SCENE[S.si],R={x:10,y:A.H*.05,w:A.W-20,h:A.H*.38};
  box(x,R,C.vi,0);txt(x,s[0],R.x+R.w*.14,R.y+R.h/2,30,C.tx,400);txt(x,s[1],R.x+R.w*.57,R.y+R.h*.4,14,C.tx);txt(x,'Which tool helps?',R.x+R.w*.57,R.y+R.h*.72,12,C.tx,600);
  TOOL.forEach((t,i)=>{const Q=toolR(i);box(x,Q,S.wrong===i?C.rd:C.cy,S.wrong===i);txt(x,t[0],Q.x+Q.w/2,Q.y+Q.h*.36,20,C.tx,400);wrap(x,t[1],Q.x+Q.w/2,Q.y+Q.h*.74,Q.w,11,C.tx)})}
 function useTool(i){if(S.sok>=3)return;const t=TOOL[i],s=SCENE[S.si];
  if(t[2]==='hit'){S.wrong=i;return oops('Hitting hurts someone and makes the storm bigger. Pick a calm tool first.')}
  if(t[2]==='shout'){S.wrong=i;return oops('Shouting keeps the storm loud. Calm your body first, then use your words.')}
  if(s[2]==='q'&&t[2]!=='q'){S.wrong=i;return oops('That helps a bit, but the noise keeps going. Moving to a quiet space gets away from the noise.')}
  S.wrong=-1;S.sok++;S.si=lo(2,S.sok);A.sound.pop();tell(`Yes, ${t[1].toLowerCase()} helps ${s[3]} calm down.`)}
 // ---- step 5: calm first, then fix it ----
 const cardR=(i,top)=>{const g=6,w=(A.W-6*g)/5,h=A.H*.32;return{x:g+i*(w+g),y:top?A.H*.1:A.H*.58,w,h}};
 function orderV(x){const C=A.col;txt(x,'first → → → → last',A.W/2,A.H*.5,12,C.mu,700);
  MIX.forEach((k,i)=>{if(S.line.includes(k))return;const R=cardR(i,1);box(x,R,S.wrong===k?C.rd:C.cy,S.wrong===k);txt(x,LINE[k][0],R.x+R.w/2,R.y+R.h*.35,22,C.tx,400);wrap(x,LINE[k][1].split(':')[0],R.x+R.w/2,R.y+R.h*.72,R.w,10,C.tx)});
  for(let i=0;i<5;i++){const R=cardR(i,0),k=S.line[i];box(x,{...R,y:A.H*.58},C.gr,0);if(k!=null){txt(x,LINE[k][0],R.x+R.w/2,A.H*.58+R.h*.35,22,C.tx,400);wrap(x,LINE[k][1].split(':')[0],R.x+R.w/2,A.H*.58+R.h*.72,R.w,10,C.tx)}else txt(x,String(i+1),R.x+R.w/2,A.H*.58+R.h/2,14,C.mu)}
  if(S.line.length>=5)txt(x,'Calm first, then fix it!',A.W/2,A.H*.25,16,C.gr)}
 function place(k){if(S.line.length>=5||S.line.includes(k))return;const need=S.line.length;
  if(k!==need){S.wrong=k;return oops(k===4?'Not yet! It is hard to fix things while the storm is big. Calm down first.':k>need?`Not yet. What comes before ${LINE[k][1].toLowerCase()}?`:'That one is done.')}
  S.wrong=-1;S.line.push(k);A.sound.pop();tell(`${need+1}: ${LINE[k][1]}.`)}
 function draw(A){const{ctx:x,W,H,col:C}=A,v=view();x.fillStyle=A.mix(C.pn,'#ecfdf5',C.dark?.05:.45);x.fillRect(0,0,W,H);
  const f={breath:breathV,count:countV,space:spaceV,tool:toolV,order:orderV}[v];if(f)f(x);else txt(x,S.Q||'🎈',W/2,H/2,60,C.tx,400);A.fx.draw(x)}
 function tell(msg){const v=view();let t;
  if(v==='breath')t=`Storm size ${S.lvl} of 4. Balloon ${S.full?'full':'empty'}.`;
  else if(v==='count')t=`Counted ${S.n} of 10.`;
  else if(v==='space')t=`Safe quiet places found: ${S.got.length} of 2.`;
  else if(v==='tool')t=S.sok>=3?'All three friends helped.':`${SCENE[S.si][1]} Pick a tool.`;
  else if(v==='order')t=`In line: ${S.line.map(k=>LINE[k][1]).join(', ')||'none yet'}.`;else t='Challenge time.';
  say((msg?msg+' ':'')+t);refresh();S.want()}
 function refresh(){if(!A||!pad)return;pad.innerHTML='';const v=view();
  const B=(t,f,al)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':al||null},pad,t);e.onclick=f};
  if(v==='breath'&&S.lvl>1){B('🎈 Breathe in',()=>inhale());B('🌬 Breathe out slowly',()=>exhale(1));B('💨 Fast puff',()=>exhale(0))}
  if(v==='count'&&S.n<10)B(`👣 Count ${S.n+1}`,()=>hop(S.n),`Count ${S.n+1}`);
  if(v==='space'&&S.got.length<2)SPOT.forEach((s,i)=>{if(!S.got.includes(i))B(s[0]+' '+s[1],()=>goSpot(i),`Go to: ${s[1]}`)});
  if(v==='tool'&&S.sok<3)TOOL.forEach((t,i)=>B(t[0]+' '+t[1],()=>useTool(i),`Use: ${t[1]}`));
  if(v==='order'&&S.line.length<5)MIX.forEach(k=>{if(!S.line.includes(k))B(LINE[k][0]+' '+LINE[k][1].split(':')[0],()=>place(k),`Put next: ${LINE[k][1]}`)});A.redraw()}
 const ok=(st,cond,msg)=>()=>{if(A.step===st&&cond()&&(!steps[st].predict||A.pred[st]!=null))A.done(msg()+A.reveal(st))};
 const seq=(fs,gap)=>{const g=S.gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===S.gen)f()},j*gap))};
 const clear=()=>{S.gen++;S.want=()=>{};S.drag=null;S.mia=null;S.wrong=-1;S.busy=0};
 const auto=()=>{const g=S.gen,go=()=>{if(g!==S.gen||S.lvl<=1)return;inhale(250,()=>exhale(1,500,go))};go()};
 const steps=[
  {h:'Balloon breaths',p:'A big feeling is like a storm inside. Breathe in to fill the balloon. Then let the air out slowly.',
   predict:{q:'Which breath makes the storm smaller?',opts:['Fast puffs','Slow breaths out'],ans:1},task:'Shrink the storm with slow breaths',
   show:()=>{steps[0].go();auto()},go:()=>{clear();S.lvl=4;S.bal=0;S.full=0;tell();S.want=ok(0,()=>S.lvl<=1,()=>'A slow breath out tells your body it is safe, so the storm shrinks.')}},
  {h:'Count to ten slowly',p:'Counting slowly gives your body time to settle. Tap each stone in order. Not too fast!',
   predict:{q:'Why does counting to ten help?',opts:['It is a magic word','It gives your body time to settle'],ans:1},task:'Count all ten stones slowly',
   show:()=>{steps[1].go();seq([...Array(10)].map((_,i)=>()=>hop(i,1)),260)},go:()=>{clear();S.n=0;S.last=0;tell();S.want=ok(1,()=>S.n>=10,()=>'Slow counting is a pause. While you count, the big feeling gets smaller.')}},
  {h:'A quiet space',p:'Quiet helps your body settle. A good quiet space is safe, and a grown-up knows where you are.',
   predict:{q:'Mia is upset at school. Can she run out of the gate to be alone?',opts:['Yes, to be alone','No, go to a safe quiet place'],ans:1},task:'Find two safe, quiet places for Mia',
   show:()=>{steps[2].go();seq([()=>goSpot(0),()=>goSpot(3)],500)},go:()=>{clear();S.got=[];tell();S.want=ok(2,()=>S.got.length>=2,()=>'Quiet and safe: a calm corner, or your bed after you tell a grown-up.')}},
  {h:'Pick a calm tool',p:'Help each friend pick a tool. Calm tools help. Hitting and shouting hurt.',task:'Help three friends calm down',
   show:()=>{steps[3].go();seq([()=>useTool(0),()=>useTool(1),()=>useTool(2)],500)},go:()=>{clear();S.si=0;S.sok=0;tell();S.want=ok(3,()=>S.sok>=3,()=>'Breaths, counting and quiet all calm you. A loud place needs a quiet space.')}},
  {h:'Calm first, then fix it',p:'Put the cards in order. What do you do first, and what comes last?',
   predict:{q:'Leo is calm now. Is the problem all gone?',opts:['Yes, all gone','No, but now he can think how to fix it'],ans:1},task:'Put the five cards in order',
   show:()=>{steps[4].go();seq([0,1,2,3,4].map(k=>()=>place(k)),450)},go:()=>{clear();S.line=[];tell();S.want=ok(4,()=>S.line.length>=5,()=>'Calming does not fix the problem. It helps you think, so then you can fix it.')}},
  {h:'Challenge',p:'',go:()=>{clear();quiz()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.want()});
 const QZ=[['Zoe is so cross. What can she do first?','😠',[['Take slow breaths','ok'],['Hit the wall','hit'],['Yell at her friend','yell']]],
  ['How should you breathe out to calm down?','🎈',[['Slowly, like cooling soup','ok'],['Fast puffs','fast'],['Hold your breath','hold']]],
  ['Is it OK to feel angry?','🙂',[['Yes, then calm your body','ok'],['No, never feel angry','never'],['Yes, so you can hit','hitok']]],
  ['You feel upset at school. Where is a good quiet space?','🛋️',[['The calm corner','ok'],['Out of the gate alone','alone'],['The loud hall','loud']]],
  ['When is it easiest to calm down?','🔍',[['When the feeling is still small','ok'],['When it is huge','huge'],['Only at bedtime','bed']]],
  ['Why does calming down help?','🧠',[['You can think clearly again','ok'],['The problem goes away','gone'],['You win the game','win']]]];
 let qn=-1,run=0;
 function quiz(){qn++;const[q,pic,ops]=QZ[qn%QZ.length],r=qn%3;S.Q=pic;
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(tag)});say('Challenge: '+q);A.redraw()}
 function mark(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Yes!';break;
   case 'hit':m='Hitting hurts and makes the storm bigger. Breathe first.';break;
   case 'yell':m='Yelling keeps the storm loud and can hurt a friend. Calm down first, then talk.';break;
   case 'fast':m='Fast puffs speed your heart up. A slow breath out calms it.';break;
   case 'hold':m='Holding your breath makes you feel tight. Let it out slowly instead.';break;
   case 'never':m='All feelings are OK. It is what you do next that matters.';break;
   case 'hitok':m='Feeling angry is OK, but hitting is not. Use a calm tool.';break;
   case 'alone':m='Going off alone is not safe. Stay where a grown-up knows you are.';break;
   case 'loud':m='Noise keeps your body buzzing. A quiet place helps it settle.';break;
   case 'huge':m='A huge storm is the hardest to shrink. Notice it early, while it is small.';break;
   case 'bed':m='You can calm down any time. Use a tool as soon as you notice the feeling.';break;
   case 'gone':m='The problem is still there. Calming helps you think how to fix it.';break;
   default:m='Calming does not win games. It helps your body settle so you can think.'}
  const good=tag==='ok';if(good){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${good?'✓':'✗'} ${m}${good?` Stars: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
 function down(p){const v=view();S.drag=null;
  if(v==='breath'&&S.lvl>1&&!S.busy){const B=balR();if(Math.hypot(p.x-B.x,p.y-B.y)<B.r*1.1){S.drag={y:p.y,b:S.bal,t:performance.now(),top:S.bal};return true}return false}
  if(v==='count'&&S.n<10){for(let i=0;i<10;i++){const s=stone(i);if(Math.hypot(p.x-s.x,p.y-s.y)<s.r*1.2){hop(i);break}}return false}
  if(v==='space'&&S.got.length<2){const h=home();if(Math.hypot(p.x-h.x,p.y-h.y)<A.H*.12){S.drag=1;S.mia=p;return true}const i=SPOT.findIndex((_,i)=>inR(p,spotR(i)));if(i>=0)goSpot(i);return false}
  if(v==='tool'&&S.sok<3){const i=TOOL.findIndex((_,i)=>inR(p,toolR(i)));if(i>=0)useTool(i);return false}
  if(v==='order'&&S.line.length<5){const i=MIX.findIndex((k,i)=>!S.line.includes(k)&&inR(p,cardR(i,1)));if(i>=0)place(MIX[i]);return false}return false}
 function move(p){const v=view(),d=S.drag;if(!d)return;
  if(v==='breath'){S.bal=hi(0,lo(1,d.b+(d.y-p.y)/(A.H*.5)));if(S.bal>d.top){d.top=S.bal;d.t=performance.now()}if(!S.full&&S.bal>=.95){S.full=1;d.b=S.bal;d.y=p.y;d.top=1;d.t=performance.now();A.sound.tick();say('Balloon full. Now drag it down slowly to breathe out.')}}
  else if(v==='space')S.mia=p;A.redraw()}
 function up(p){const v=view(),d=S.drag;S.drag=null;if(!d)return A.redraw();
  if(v==='breath'){if(S.full&&S.bal<=.15){const fast=performance.now()-d.t<900;S.bal=1;S.busy=0;exhale(!fast,1)}else if(!S.full){A.tween(S,{bal:0},300)}else A.redraw()}
  else if(v==='space'){const i=SPOT.findIndex((_,i)=>inR(p,spotR(i)));if(i>=0)goSpot(i);else{S.mia=null;A.redraw()}}}
 A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;read.hidden=A.step===5;pad.hidden=A.step===5;refresh()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
   A.gest({down,move,up});refresh()}});
 A.start()})})();
