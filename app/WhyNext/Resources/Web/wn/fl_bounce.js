/* Flagship – the words of resilience (7–10). Sam does not pass his swimming badge. Drag word tiles onto the story moments
   (setback, trigger, distress, regulate, self-talk, persevere); a wrong drop bounces back and says what each word really means.
   Turn a distress meter down with tools that work (slow breaths, naming it) while "shout back" pushes it up: regulating means
   bringing a feeling down to thinking level, not to zero. Flip fixed-mindset thoughts into growth ones, past a "just be
   positive" trap. Then pick each week's plan on a bounce-back graph: only keeping going with a new way reaches the badge. */
(()=>{const DEF={setback:'something going wrong that slows you down for now',trigger:'the thing that sets off a big feeling',distress:'a big upset feeling that makes it hard to think',
  regulate:'bringing a big feeling down until you can think',"self-talk":'the words you say to yourself in your head',persevere:'keeping going when it is hard, and trying new ways',
  resilience:'bouncing back after a setback','growth mindset':'believing you can get better with practice','fixed mindset':'believing you cannot change how good you are'};
 const STORY=[['🏊','Sam does not pass his swimming badge this week.','setback'],['😆','A boy shouts, “Ha, you sank!”','trigger'],['😣','Sam’s face goes hot. He wants to cry and cannot think.','distress'],
  ['🌬️','Sam takes slow breaths until he can think again.','regulate'],['💭','In his head Sam says, “I can’t do it yet. I can practise.”','self-talk'],['🔁','Each week Sam goes back and tries a new kick.','persevere']];
 const TOOLS=[['Slow breaths',-3],['Name the feeling',-2],['Squeeze, let go',-2],['Shout back',1],['Go over it again',1]];
 const WHY=['A long, slow breath out slows your heart.','Saying “I feel upset” helps the feeling shrink.','Tight then loose muscles help the body calm down.','Shouting makes the feeling bigger and starts a new problem.','Going over it again and again keeps the feeling big.'];
 const FLIP=[['I’m just bad at swimming.',[['I’m not good at it yet. Practice will help.','g'],['I’m the best swimmer ever!','p'],['Some people can swim and I can’t.','f']]],
  ['That kick is too hard for my brain.',[['It doesn’t matter. I don’t care.','p'],['My brain gets stronger when I practise hard things.','g'],['Clever kids find it easy, so I’m not clever.','f']]],
  ['I failed, so I should stop.',[['If I were good, I’d have got it first time.','f'],['I didn’t really fail.','p'],['Mistakes show me what to change next time.','g']]]];
 const PLAN=[['Give up and stay home',-1],['Same thing again',2],['Keep going and try a new way',5]];
VIS.reg('flagbounce',c=>{let A,pad,chal,read;
 const G={put:{},sel:null,lv:9,tl:[],fi:0,wk:[10,7],drag:null,dp:null,check:()=>{},gen:0,msg:'',used:0};
 const mode=()=>['story','meter','flip','line','story','quiz'][A.step],panels=()=>A.step===0?[0,1]:[0,1,2,3,4,5];
 const words=()=>panels().map(i=>STORY[i][2]).filter(w=>!Object.values(G.put).includes(w));
 function wrap(x,s,X,Y,w,lh,max){let row='',n=0;for(const t of s.split(' ')){const tt=row?row+' '+t:t;if(row&&x.measureText(tt).width>w){if(max&&n>=max-1)break;x.fillText(row,X,Y+n++*lh);row=t}else row=tt}x.fillText(row,X,Y+n*lh);return n+1}
 function tray(list,full){const x=A.ctx,W=A.W,h=A.narrow?46:48,g=8,out=[];x.font=`700 ${A.narrow?15:16}px system-ui`;let X=g,rows=[[]];
  list.forEach(t=>{const w=full?W-2*g:Math.min(W-2*g,x.measureText(t).width+30);if(X+w>W-g&&rows[rows.length-1].length){rows.push([]);X=g}rows[rows.length-1].push([t,w,X]);X+=w+g});
  const top=A.H-rows.length*(h+g);rows.forEach((r,i)=>r.forEach(([t,w,X])=>out.push({t,x:X,y:top+i*(h+g),w,h})));return out}
 function tile(x,T,on,col){const C=A.col;x.fillStyle=on?A.mix(C.pn,col,.3):A.mix(C.pn,col,.12);A.paint.rrect(T.x,T.y,T.w,T.h,12);x.fill();x.lineWidth=on?3:1.5;x.strokeStyle=on?C.am:col;x.stroke();
  x.fillStyle=C.tx;x.textAlign='center';x.textBaseline='middle';x.font=`700 ${A.narrow?15:16}px system-ui`;if(x.measureText(T.t).width<T.w-12)x.fillText(T.t,T.x+T.w/2,T.y+T.h/2+1);else{x.font=`700 ${A.narrow?13:14}px system-ui`;x.fillText(T.t,T.x+T.w/2,T.y+T.h/2+1)}}
 function pRects(){const ps=panels(),n=ps.length,cols=n===2?2:A.narrow?2:3,rows=Math.ceil(n/cols),g=8,top=34,bot=A.H-(A.narrow&&n>2?2:1)*58-10,w=(A.W-g*(cols+1))/cols,h=(bot-top-g*(rows-1))/rows;
  return ps.map((p,i)=>({p,x:g+(i%cols)*(w+g),y:top+Math.floor(i/cols)*(h+g),w,h}))}
 const inR=(p,R)=>p.x>R.x&&p.x<R.x+R.w&&p.y>R.y&&p.y<R.y+R.h;
 function meterR(){const t=tray(TOOLS.map(t=>t[0]));return{x:A.W*(A.narrow?.12:.2),y:44,w:44,h:t[0].y-44-80,tl:t}}
 function draw(A){const{ctx:x,W,H,col:C}=A,k=mode();x.fillStyle=A.mix(C.pn,C.gr,.05);x.fillRect(0,0,W,H);x.textAlign='left';x.textBaseline='alphabetic';x.fillStyle=C.tx;x.font=`800 ${A.narrow?15:17}px system-ui`;
  if(k==='story'){x.fillText('Drag each word to the moment it names',10,22);pRects().forEach(R=>{const[e,t,w]=STORY[R.p],got=G.put[R.p];x.fillStyle=got?A.mix(C.pn,C.gr,.12):C.pn;A.paint.rrect(R.x,R.y,R.w,R.h,12);x.fill();x.lineWidth=1.5;x.strokeStyle=A.alpha(C.tx,.4);x.stroke();
   x.fillStyle=C.tx;x.font=`600 ${A.narrow?13:14}px system-ui`;x.textAlign='left';x.textBaseline='alphabetic';wrap(x,e+' '+t,R.x+8,R.y+20,R.w-16,17,Math.max(2,Math.floor((R.h-44)/17)));
   const S={x:R.x+8,y:R.y+R.h-36,w:R.w-16,h:30};x.setLineDash(got?[]:[5,4]);x.strokeStyle=got?C.gr:C.mu;A.paint.rrect(S.x,S.y,S.w,S.h,8);x.stroke();x.setLineDash([]);x.textAlign='center';x.textBaseline='middle';
   x.font=`700 ${A.narrow?14:15}px system-ui`;x.fillStyle=got?C.gr:C.mu;x.fillText(got?'✓ '+got:G.sel?'tap to put “'+G.sel+'” here':'drop a word',S.x+S.w/2,S.y+S.h/2+1)});
   G.tl=tray(words());G.tl.forEach(T=>{if(!(G.drag&&G.drag.t===T.t))tile(x,T,G.sel===T.t,C.vi)})}
  if(k==='meter'){const R=meterR(),f=G.lv/10;x.fillText('Distress meter',10,24);for(let i=0;i<10;i++){const y=R.y+R.h-(i+1)*R.h/10;x.fillStyle=i>=6?A.alpha(C.rd,.25):i>=3?A.alpha(C.am,.22):A.alpha(C.gr,.22);x.fillRect(R.x,y,R.w,R.h/10)}
   x.fillStyle=G.lv>=7?C.rd:G.lv>=4?C.am:C.gr;A.paint.rrect(R.x+8,R.y+R.h*(1-f),R.w-16,R.h*f,8);x.fill();x.strokeStyle=C.tx;x.lineWidth=2;A.paint.rrect(R.x,R.y,R.w,R.h,10);x.stroke();
   x.font=`600 ${A.narrow?12:13}px system-ui`;x.fillStyle=C.tx;x.textAlign='left';[['Too big to think',8],['Can think',4.5],['Calm',1.5]].forEach(([t,v])=>x.fillText(t,R.x+R.w+8,R.y+R.h*(1-v/10)));
   x.font=`800 ${A.narrow?18:20}px system-ui`;x.textAlign='right';x.fillText(G.lv+' / 10',W-12,24);x.textAlign='left';x.font=`600 ${A.narrow?13:14}px system-ui`;x.fillStyle=C.mu;wrap(x,G.msg,12,R.y+R.h+22,W-24,17,3);
   G.tl=R.tl;G.tl.forEach((T,i)=>{if(!(G.drag&&G.drag.t===T.t))tile(x,T,0,C.vi)})}
  if(k==='flip'){const F=FLIP[Math.min(G.fi,2)],bw=W-40;x.fillText(G.fi>2?'All three thoughts flipped':`Thought ${G.fi+1} of 3: find the growth version`,10,24);
   x.fillStyle=A.mix(C.pn,C.cy,.15);A.paint.rrect(20,40,bw,A.narrow?92:80,30);x.fill();x.strokeStyle=C.cy;x.lineWidth=2;x.stroke();[[46,40+(A.narrow?100:88),9],[32,40+(A.narrow?118:106),5]].forEach(([a,b,r])=>{x.beginPath();x.arc(a,b,r,0,7);x.fill();x.stroke()});
   x.fillStyle=C.tx;x.textAlign='center';x.font=`700 ${A.narrow?16:18}px system-ui`;wrap2(x,G.fi>2?'“'+FLIP[2][1].find(o=>o[1]==='g')[0]+'”':'“'+F[0]+'”',W/2,74,bw-30,22);
   x.font=`600 ${A.narrow?13:14}px system-ui`;x.fillStyle=C.mu;x.textAlign='left';wrap(x,G.msg,12,(A.narrow?190:166),W-24,17,4);
   G.tl=G.fi>2?[]:tray(F[1].map(o=>o[0]),1);G.tl.forEach(T=>{if(!(G.drag&&G.drag.t===T.t))tile(x,T,0,C.cy)})}
  if(k==='line'){const L={x:44,y:40,w:W-60,h:H-40-3*54-46},sx=i=>L.x+i*L.w/5,sy=v=>L.y+L.h-v/30*L.h;x.fillText('Metres Sam can swim, week by week',10,24);
   x.strokeStyle=A.alpha(C.tx,.5);x.lineWidth=1.5;x.beginPath();x.moveTo(L.x,L.y);x.lineTo(L.x,L.y+L.h);x.lineTo(L.x+L.w,L.y+L.h);x.stroke();
   x.setLineDash([6,5]);x.strokeStyle=C.gr;x.beginPath();x.moveTo(L.x,sy(25));x.lineTo(L.x+L.w,sy(25));x.stroke();x.setLineDash([]);x.fillStyle=C.gr;x.font='700 13px system-ui';x.textAlign='right';x.fillText('Badge: 25 m',L.x+L.w,sy(25)-6);
   x.fillStyle=C.mu;x.textAlign='center';x.font='600 12px system-ui';for(let i=0;i<6;i++)x.fillText('Wk '+(i+1),sx(i),L.y+L.h+16);x.textAlign='right';[0,10,20,30].forEach(v=>x.fillText(v,L.x-6,sy(v)+4));
   x.strokeStyle=C.vi;x.lineWidth=3;x.beginPath();G.wk.forEach((v,i)=>i?x.lineTo(sx(i),sy(v)):x.moveTo(sx(i),sy(v)));x.stroke();G.wk.forEach((v,i)=>A.paint.ball(sx(i),sy(v),6,i===1?C.rd:C.vi));
   A.paint.label('Setback',sx(1),sy(G.wk[1])+22,{bg:A.alpha(C.rd,.85)});x.font=`600 ${A.narrow?13:14}px system-ui`;x.fillStyle=C.mu;x.textAlign='left';wrap(x,G.msg,12,L.y+L.h+36,W-24,16,2);
   G.tl=G.wk.length>=6?[]:tray(PLAN.map(p=>p[0]),1);G.tl.forEach((T,i)=>{if(!(G.drag&&G.drag.t===T.t))tile(x,T,0,C.vi)})}
  if(k==='quiz'&&G.Q){x.fillStyle=A.mix(C.pn,C.vi,.12);A.paint.rrect(10,10,W-20,96,14);x.fill();x.fillStyle=C.tx;x.font=`700 ${A.narrow?15:17}px system-ui`;wrap(x,G.Q.s,22,36,W-44,20,4);
   let y=130;x.font=`600 ${A.narrow?13:14}px system-ui`;for(const w in DEF){const on=G.Q.done&&w===G.Q.want;x.fillStyle=on?C.gr:C.tx;x.font=`800 ${A.narrow?13:14}px system-ui`;x.fillText(w+':',12,y);const ww=x.measureText(w+': ').width;x.font=`600 ${A.narrow?13:14}px system-ui`;x.fillStyle=on?C.gr:C.mu;y+=17*wrap(x,DEF[w],12+ww,y,W-24-ww,17,2)+8}}
  if(G.drag&&G.dp){const T=G.tl.find(t=>t.t===G.drag.t);if(T)tile(x,{...T,x:G.dp.x-T.w/2,y:G.dp.y-T.h/2},1,C.am)}A.fx.draw(x)}
 function wrap2(x,s,X,Y,w,lh){const ws=s.split(' '),L=[];let r='';for(const t of ws){const tt=r?r+' '+t:t;if(r&&x.measureText(tt).width>w){L.push(r);r=t}else r=tt}L.push(r);L.forEach((l,i)=>x.fillText(l,X,Y+(i-(L.length-1)/2)*lh))}
 function tell(m){G.msg=m||'';const k=mode();let s=m||'';if(k==='story')s+=' Placed: '+panels().map(i=>`moment ${i+1} ${G.put[i]||'empty'}`).join(', ')+'.';if(k==='meter')s+=` Distress ${G.lv} out of 10.`;
  if(k==='line')s+=' Weeks so far: '+G.wk.map(v=>v+' m').join(', ')+'.';c.say(s);A.cv.setAttribute('aria-label',s.trim()||'Resilience lab');if(read)read.textContent=m||'';controls();A.redraw();G.check()}
 function place(w,i){if(G.put[i])return tell('That moment already has its word.');const want=STORY[i][2];G.sel=null;
  if(w===want){G.put[i]=w;A.sound.pop();tell(`Yes: “${w}” means ${DEF[w]}.`)}else{A.sound.miss();tell(`Not that one. “${w}” means ${DEF[w]}. This moment shows ${DEF[want]}.`)}}
 function tool(i){const[t,d]=TOOLS[i];G.used++;G.lv=Math.max(1,Math.min(10,G.lv+d));d<0?A.sound.pop():A.sound.miss();tell(`${t}: ${d<0?'down':'up'} ${Math.abs(d)}. ${WHY[i]}${G.lv===1?' It will not go to zero, and it does not need to.':''}`)}
 function flip(j){if(G.fi>2)return;const o=FLIP[G.fi][1][j];if(o[1]==='g'){G.fi++;A.sound.pop();tell('Growth mindset: it says Sam can get better with practice.')}
  else{A.sound.miss();tell(o[1]==='p'?'That sounds cheerful, but it does not help Sam get better. Growth mindset is about improving with practice.':'That is still fixed mindset: it says Sam cannot change.')}}
 function plan(j){if(G.wk.length>=6)return;const v=Math.max(0,Math.min(30,G.wk[G.wk.length-1]+PLAN[j][1]));G.wk.push(v);j===2?A.sound.pop():A.sound.miss();
  tell(j===0?'Giving up: no practice, so he slips back.':j===1?'Trying the same way again helps a little.':'Keep going with a new way: a big jump.')}
 function controls(){if(!A||!pad)return;pad.innerHTML='';const k=mode(),b=(t,f,lb)=>{const e=c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':lb||null},pad,t);e.onclick=f};
  if(k==='story'){words().forEach(w=>b((G.sel===w?'✓ ':'')+w,()=>{G.sel=w;tell(`Picked “${w}”. Now choose a moment.`)},'Pick the word '+w));if(G.sel)panels().filter(i=>!G.put[i]).forEach(i=>b('Moment '+(i+1),()=>place(G.sel,i),`Put ${G.sel} on moment ${i+1}: ${STORY[i][1]}`))}
  if(k==='meter'){TOOLS.forEach((t,i)=>b(t[0],()=>tool(i)));b('Reset meter',()=>{G.lv=9;tell('Back to 9.')})}
  if(k==='flip'&&G.fi<3)FLIP[G.fi][1].forEach((o,j)=>b(o[0],()=>flip(j)));
  if(k==='line'){if(G.wk.length<6)PLAN.forEach((p,j)=>b(p[0],()=>plan(j)));b('Start again from week 2',()=>{G.wk=[10,7];tell('Back to week 2.')})}}
 const when=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg()+A.reveal(n))};
 const play=(fs,ms)=>{const g=++G.gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===G.gen)f()},j*ms))};
 const reset=()=>{G.gen++;G.check=()=>{};G.put={};G.sel=null;G.lv=9;G.fi=0;G.wk=[10,7];G.msg='';G.used=0};
 const steps=[
  {h:'Setback and trigger',p:'Sam does not pass his swimming badge. Then a boy laughs at him. Drag each word onto its moment, or tap a word and then a moment.',
   predict:{q:'Sam does not pass his badge. What is that?',opts:['The end: he failed for good','A setback: it slows him down for now'],ans:1},
   task:'Put setback and trigger on the right moments',show:()=>play([()=>place('setback',0),()=>place('trigger',1)],700),
   go:()=>{reset();G.check=when(0,()=>Object.keys(G.put).length===2,()=>'A setback is the thing going wrong. A trigger is what sets off the big feeling.')}},
  {h:'Regulate',p:'Sam is in distress: 9 out of 10. Drag tools onto the meter, or tap them. Get him down to where he can think.',
   predict:{q:'What does regulate mean?',opts:['Make the feeling go away for ever','Bring the feeling down so you can think','Hide the feeling'],ans:1},
   task:'Bring distress down to 5 or less',show:()=>play([()=>tool(0),()=>tool(1)],800),
   go:()=>{reset();G.msg='Which tools bring the feeling down?';G.check=when(1,()=>G.lv<=5,()=>'Sam can think again. The feeling is still there, just smaller: that is regulating.')}},
  {h:'Self-talk and mindset',p:'Self-talk is what you say to yourself in your head. Swap each fixed-mindset thought for the growth one. Drag it to the bubble, or tap it.',
   predict:{q:'Which is growth mindset?',opts:['Always feeling happy about everything','Believing you can get better with practice'],ans:1},
   task:'Flip all three thoughts',show:()=>play([0,1,2].map(n=>()=>flip(FLIP[n][1].findIndex(o=>o[1]==='g'))),700),
   go:()=>{reset();G.check=when(2,()=>G.fi>2,()=>'Fixed mindset says you cannot change. Growth mindset says practice and new ways help you improve.')}},
  {h:'Persevere and bounce back',p:'Sam swam 10 m, then fell back to 7 m after the setback. Pick his plan for each week. Can he reach 25 m by week 6?',
   predict:{q:'What does it mean to be resilient?',opts:['You never get upset or fail','You get upset, then bounce back and keep going'],ans:1},
   task:'Reach the 25 m badge line by week 6',show:()=>play([0,1,2,3].map(()=>()=>plan(2)),500),
   go:()=>{reset();G.msg='Tap a plan for week 3.';G.check=when(3,()=>G.wk[G.wk.length-1]>=25,()=>'Persevering with a new way got Sam past 25 m. Falling back and then climbing higher is resilience.')}},
  {h:'The whole story',p:'Now put all six words on Sam’s story. Together these moments are what resilience looks like.',
   task:'Put all six words in place',show:()=>play(STORY.map((s,i)=>()=>place(s[2],i)),400),
   go:()=>{reset();G.check=when(4,()=>Object.keys(G.put).length===6,()=>'Setback, trigger, distress, regulate, self-talk, persevere: the whole bounce back is resilience.')}},
  {h:'Challenge',p:'',go:()=>{G.gen++;G.check=()=>{};ask()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>G.check()});
 const QS=[['Leo’s kite string snaps and the kite flies away.','setback',['distress','regulate']],['A loud bang in the hall makes Ava’s worry shoot up.','trigger',['setback','self-talk']],
  ['Kim counts slowly to ten until her anger is small enough to think.','regulate',['persevere','distress']],['Raj thinks, “This is hard, but I can learn it.”','growth mindset',['fixed mindset','distress']],
  ['Zoe thinks, “I’ll never be good at maths. Some people just aren’t.”','fixed mindset',['growth mindset','trigger']],['Ben practises reading every night and tries new ways when he is stuck.','persevere',['resilience','regulate']],
  ['The team loses the final, feels low, then trains hard and plays better next year.','resilience',['persevere','setback']],['Mia shakes and cries and cannot think after getting lost in a shop.','distress',['trigger','regulate']],
  ['Before his turn, Tom quietly tells himself, “You’ve practised. You can do this.”','self-talk',['trigger','setback']]];
 let qi=-1,run=0;
 function ask(){qi++;const[s,want,wr]=QS[qi%QS.length],r=qi%3,o=[want,...wr];G.Q={s,want,done:0};const opts=o.slice(r).concat(o.slice(0,r));
  chal.innerHTML=`<p><b>${s}</b> Which word fits?</p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');opts.forEach(w=>{c.el('button',{type:'button',class:'lbtn sm'},row,w).onclick=()=>judge(w)});G.msg='';A.cv.setAttribute('aria-label','Challenge: '+s);c.say('Challenge: '+s);A.redraw()}
 function judge(o){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const{want}=G.Q,fb=chal.querySelector('.fl-fb'),ok=o===want;let m=`Right: ${want} means ${DEF[want]}.`;
  if(!ok){const pr=[o,want].sort().join('+');
   if(pr==='setback+trigger')m='A setback is the thing going wrong. A trigger is what sets off a big feeling.';
   else if(pr==='persevere+resilience')m='Persevere is the keep-going part. Resilience is the whole bounce back after a setback.';
   else if(pr==='fixed mindset+growth mindset')m=`Look at what the thought says about change. ${want==='growth mindset'?'It says Raj can learn, so it is growth.':'It says Zoe can never improve, so it is fixed.'}`;
   else if(o==='distress'||want==='distress')m=`Distress is ${DEF.distress}. Here it is ${want}: ${DEF[want]}.`;
   else m=`“${o}” means ${DEF[o]}. Here it is ${want}: ${DEF[want]}.`}
  G.Q.done=1;A.redraw();if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 function down(p){const k=mode();if(k==='quiz')return false;const T=G.tl.find(t=>inR(p,t));
  if(k==='story'&&!T){const R=pRects().find(r=>inR(p,r));if(R&&G.sel)place(G.sel,R.p);return false}
  if(!T)return false;G.drag={t:T.t,p0:p};G.dp=p;A.redraw();return true}
 function move(p){if(G.drag){G.dp=p;A.redraw()}}
 function up(){const d=G.drag;G.drag=null;if(!d)return;const p=G.dp,k=mode(),tap=Math.hypot(p.x-d.p0.x,p.y-d.p0.y)<10;
  if(k==='story'){if(tap){G.sel=d.t;return tell(`Picked “${d.t}”. Now tap a moment.`)}const R=pRects().find(r=>inR(p,r));if(R)place(d.t,R.p);else A.redraw();return}
  const i=G.tl.findIndex(t=>t.t===d.t);if(k==='meter'){if(tap||p.y<G.tl[0].y-4)tool(i);else A.redraw()}
  if(k==='flip'){if(tap||p.y<170)flip(i);else A.redraw()}
  if(k==='line')plan(i)}
 A=FK.shell(c,{steps,ratio:.66,tall:1.5,draw,onStep:A=>{const q=A.step===5;chal.hidden=!q;read.hidden=q;pad.hidden=q;controls();A.cv.setAttribute('aria-label',steps[A.step].p||'Challenge')},
  init:A=>{const E=c.el,box=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},box);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Resilience lab controls'},box);chal=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});controls()}});
 A.start()})})();
