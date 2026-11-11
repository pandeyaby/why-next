/* Ethics and citizenship (7–11): bullying switches, bystander/upstander scene, peer-pressure rope, rights scale, fix a post, word challenge. */
(()=>{const M=Math,F=(w,z)=>w+' '+z+'px system-ui';
 const SW=['Again and again?','On purpose?','More power? (hard to stop it)'];
 const ST=[['Ben trips Kai by accident in the lunch queue. He says sorry.',[0,0,0],'Not bullying: it was an accident, and only once.'],
  ['Mia and Leah fall out over a game. Both say mean things, once.',[0,1,0],'Not bullying: a one-off fall-out between equals.'],
  ['Every day, older Max hides Sam’s bag and laughs when Sam gets upset.',[1,1,1],'Bullying: again and again, on purpose, and Sam cannot make it stop.'],
  ['For weeks, a group sends Ava mean messages in the class chat.',[1,1,1],'Cyberbullying: bullying that happens online, on phones or games.']];
 const SP=[['Walk past and say nothing','by','Bystander: you saw it and did nothing.'],['Laugh along with the group','join','Laughing along is joining in.'],
  ['Tell a teacher you trust','up','Upstander: you acted and stayed safe. Telling is not telling tales.'],['Ask Sam to come and play','up2','Upstander: helping the person being picked on is acting too.']];
 const RS=[['Zoe has not said yes to sharing it.',3,'Consent: ask first, and a no means no.'],['I’d hate it if it were me.',3,'Empathy: think how Zoe will feel.'],
  ['I do what’s right even when no one sees.',3,'Integrity: doing right when nobody is watching.'],['Nobody will find out.',-2,'Wrong way: that is about getting caught, not about what is right.'],
  ['Everyone else is doing it.',-1,'That is the peer pressure talking, not a reason.']];
 const RT=['to be safe at school','to say what you think','to learn in class','to privacy online'],RE=['not to hurt or scare others','to speak without lies or cruel words','not to stop others learning','not to share others’ photos without asking'];
 const POST=[['face','Jo’s face','Ask Jo first. Without a yes, cover her face. That is consent.'],['cap','Caption: “LOL Jo’s silly face”','Make it kind: “Fun day with Jo!” Mean posts hurt for a long time.'],
  ['tag','Tag: Elm Primary, Year 5','Take it off. Sharing where you are online is not safe.'],['sky','The sunny sky','Nothing wrong here: a post must be safe, kind and fair, not perfect.']];
 const W={bullying:'hurting someone again and again, on purpose, when it is hard for them to stop it',cyberbullying:'bullying online, on phones, games or chats',bystander:'someone who sees bullying and does nothing',
  upstander:'someone who sees something wrong and acts in a safe way',peer:'feeling pushed by friends to do something',consent:'asking and getting a clear yes, and accepting a no',integrity:'doing the right thing even when no one is watching',
  right:'something every person should have',resp:'something you should do so others keep their rights',ethical:'right and fair',dilemma:'a hard choice where every option has a downside',digital:'being safe, kind and fair online',nb:'a one-off fall-out between equals'};
 const nm=k=>({peer:'Peer pressure',right:'A right',resp:'A responsibility',dilemma:'A dilemma',digital:'Digital citizenship',nb:'Not bullying'})[k]||k[0].toUpperCase()+k.slice(1);
 const QS=[['Raj sees Kim pushed every day by older boys. He says nothing and walks on.','bystander',['upstander','bullying']],['Lena sees a mean post about Ali and reports it, then tells her mum.','upstander',['bystander','cyberbullying']],
  ['For a month, Tom gets cruel messages in a game chat from the same players.','cyberbullying',['bullying','peer']],['Your friends keep saying “Just do it, don’t be boring!”','peer',['bullying','consent']],
  ['Nia finds a £5 note no one saw drop. She hands it in.','integrity',['consent','resp']],['Every child should be safe at school. What is this?','right',['resp','ethical']],
  ['Kofi asks his friend before posting a photo of her, and she says yes.','consent',['integrity','right']],['Sophie can tell the truth and lose her friend, or lie and feel bad. What is this?','dilemma',['ethical','peer']],
  ['Putting litter in the bin so the park is nice for everyone. What is this?','resp',['right','digital']],['Two friends fall out once and both shout. Is it bullying?','nb',['bullying','cyberbullying']],
  ['Asking before you share, keeping passwords safe and being kind online.','digital',['consent','integrity']]];
VIS.reg('flagcit',c=>{let A,pad,chal,read;
 const G={si:0,sw:[0,0,0],ok:0,bad:-1,you:null,yd:0,vis:{},rope:-2,used:[],ri:0,pan:-1,tip:0,fix:{},gen:0,check:()=>{},Q:null,msg:''};
 const mode=()=>['bull','scene','rope','scale','post','quiz'][A.step];
 const ft=(x,w,z,a)=>{x.font=F(w,z);x.textAlign=a||'left';x.textBaseline='middle'},R4=[0,1,2,3];
 function lines(x,t,w){const o=[];let l='';t.split(' ').forEach(s=>{const k=l?l+' '+s:s;if(x.measureText(k).width>w&&l){o.push(l);l=s}else l=k});o.push(l);return o}
 const para=(x,t,X,Y,w,lh)=>{const L=lines(x,t,w);L.forEach((l,j)=>x.fillText(l,X,Y+j*lh));return L.length*lh};
 const box=(x,r,f,s,rr)=>{x.fillStyle=f;A.paint.rrect(r.x,r.y,r.w,r.h,rr||12);x.fill();if(s){x.strokeStyle=s;x.lineWidth=2;x.stroke()}};
 const foot=(x,C,t)=>{ft(x,700,13,'center');x.fillStyle=C.mu;x.fillText(t,A.W/2,A.H-12)};
 const inR=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
 const swR=i=>{const N=A.narrow,h=N?46:48,y=A.H*(N?.44:.4)+i*(h+8);return{x:12,y,w:A.W-24,h}};
 function bullView(x,C){const N=A.narrow,s=G.ok<ST.length?ST[G.si%ST.length]:['All four stories judged. Bullying needs all three switches on.',[1,1,1]];box(x,{x:12,y:10,w:A.W-24,h:A.H*(N?.3:.26)},A.alpha(C.cy,.12),A.alpha(C.cy,.6));
  ft(x,700,N?14:16);x.fillStyle=C.tx;para(x,s[0],24,34,A.W-48,N?19:22);
  SW.forEach((t,i)=>{const r=swR(i),on=G.sw[i]||G.ok>3,bad=G.bad===i;box(x,r,bad?A.alpha(C.rd,.16):C.pn,bad?C.rd:A.alpha(C.tx,.3));ft(x,700,N?14:16);x.fillStyle=C.tx;x.fillText(t,r.x+14,r.y+r.h/2);
   const kx=r.x+r.w-64,ky=r.y+r.h/2;box(x,{x:kx,y:ky-13,w:50,h:26},on?C.gr:A.alpha(C.mu,.5),null,13);A.paint.ball(on?kx+37:kx+13,ky,10,'#ffffff');ft(x,800,11,'center');x.fillStyle=C.tx;x.fillText(on?'yes':'no',kx-18,ky)});
  foot(x,C,`Stories judged right: ${G.ok} of ${ST.length}`)}
 const tog=i=>{G.sw[i]^=1;G.bad=-1;A.sound.tick();tell('')};
 function verdict(){const s=ST[G.si%ST.length],w=s[1].findIndex((v,i)=>v!==G.sw[i]);
  if(w>=0){G.bad=w;A.sound.miss();return tell(`Look again at "${SW[w]}". ${w===0?'Did it happen many times, or once?':w===1?'Did they mean to do it?':'Could the child make it stop?'}`)}
  G.bad=-1;G.ok=M.min(ST.length,G.ok+1);A.sound.pop();const t=s[2];G.si++;G.sw=[0,0,0];tell(t+(G.ok<ST.length?' Next story.':''))}
 const spot=i=>{const N=A.narrow,cx=A.W/2,cy=A.H*.5,rx=A.W*(N?.33:.36),ry=A.H*.3,a=[-2.4,-.75,.75,2.4][i];return{x:cx+M.cos(a)*rx,y:cy+M.sin(a)*ry}};
 const youP=()=>G.you!=null&&!G.yd?{x:spot(G.you).x+(A.narrow?50:66),y:spot(G.you).y-24}:G.yp||{x:A.W/2,y:A.H-34};
 function sceneView(x,C){const N=A.narrow,cx=A.W/2,cy=A.H*.5;x.fillStyle=A.alpha(C.gr,.1);x.beginPath();x.ellipse(cx,cy,A.W*.2,A.H*.13,0,0,7);x.fill();
  [[cx-28,cy-10,C.or],[cx-46,cy+8,C.or],[cx-18,cy+14,C.or],[cx+30,cy,C.cy,'Sam']].forEach(([X,Y,col,l])=>{A.paint.ball(X,Y,13,col);ft(x,700,12,'center');x.fillStyle=C.tx;if(l)x.fillText(l,X,Y+24)});
  SP.forEach(([t,k],i)=>{const p=spot(i),on=G.you===i&&!G.yd,seen=G.vis[k],w=N?118:150;box(x,{x:p.x-w/2,y:p.y-24,w,h:48},on?A.alpha(k.startsWith('up')?C.gr:C.rd,.25):C.pn,on?(k.startsWith('up')?C.gr:C.rd):A.alpha(C.tx,seen?.6:.3));
   ft(x,700,N?12:13,'center');x.fillStyle=C.tx;lines(x,t,w-12).forEach((l,j,a)=>x.fillText(l,p.x,p.y+(j-(a.length-1)/2)*15))});
  const y=youP();A.paint.ball(y.x,y.y,17,C.vi);ft(x,800,11,'center');x.fillStyle='#ffffff';x.fillText('You',y.x,y.y);
  foot(x,C,`Upstander ideas found: ${['up','up2'].filter(k=>G.vis[k]).length} of 2`)}
 function go2(i){G.you=i;G.yd=0;G.yp=null;const s=SP[i];G.vis[s[1]]=1;s[1].startsWith('up')?A.sound.pop():A.sound.miss();tell(s[2])}
 const grid=(i,y0,h)=>{const N=A.narrow,cols=N?1:2,w=(A.W-24-(cols-1)*8)/cols,r=M.floor(i/cols),k=i%cols;h=N?30:h;return{x:12+k*(w+8),y:A.H*(N?y0[0]:y0[1])+r*(h+6),w,h}},cardR=i=>grid(i,[.42,.5],36),resR=i=>grid(i,[.6,.66],34);
 function ropeView(x,C){const N=A.narrow,y=A.H*(N?.25:.3),L=24,R=A.W-24,mx=(L+R)/2+G.rope/5*(R-L)/2*.9;ft(x,700,N?13:15);x.fillStyle=C.tx;
  para(x,'Friends: “Share the funny photo of Zoe! It’s only a joke.”',14,22,A.W-28,18);
  box(x,{x:(L+R)/2,y:y-16,w:(R-L)/2,h:32},A.alpha(C.gr,.15),null,8);
  x.strokeStyle=A.mix(C.or,C.tx,.3);x.lineWidth=6;x.beginPath();x.moveTo(L,y);x.lineTo(R,y);x.stroke();
  x.fillStyle=G.rope>=3?C.gr:C.am;x.beginPath();x.moveTo(mx,y-18);x.lineTo(mx+10,y);x.lineTo(mx,y+18);x.lineTo(mx-10,y);x.closePath();x.fill();
  ft(x,700,12);x.fillStyle=C.tx;x.fillText('← friends’ side',L+4,y+30);ft(x,700,12,'right');x.fillText('your choice →',R-4,y+30);
  RS.forEach(([t],i)=>{const r=cardR(i),u=G.used.includes(i);box(x,r,u?A.alpha(RS[i][1]>0?C.gr:C.rd,.2):C.pn,u?(RS[i][1]>0?C.gr:C.rd):A.alpha(C.tx,.35),8);ft(x,600,N?12:13);x.fillStyle=C.tx;x.fillText((u?(RS[i][1]>0?'✓ ':'✗ '):'')+t,r.x+10,r.y+r.h/2)})}
 function reason(i){if(G.used.includes(i))return;G.used.push(i);G.rope=M.max(-5,M.min(5,G.rope+RS[i][1]));RS[i][1]>0?A.sound.pop():A.sound.miss();tell(RS[i][2]+(G.rope>=3?' You held your ground: that is standing up to peer pressure.':''))}
 const ORD=[2,0,3,1];
 function scaleView(x,C){const N=A.narrow,cx=A.W/2,py=A.H*(N?.2:.22),ang=G.tip*.18,arm=A.W*(N?.3:.26),done=G.ri>=RT.length;
  x.strokeStyle=C.mu;x.lineWidth=4;x.beginPath();x.moveTo(cx,py);x.lineTo(cx,py+A.H*.3);x.moveTo(cx-30,py+A.H*.3);x.lineTo(cx+30,py+A.H*.3);x.stroke();
  const ex=s=>({x:cx+s*arm*M.cos(ang),y:py+s*arm*M.sin(ang)});x.lineWidth=5;x.strokeStyle=C.tx;x.beginPath();x.moveTo(ex(-1).x,ex(-1).y);x.lineTo(ex(1).x,ex(1).y);x.stroke();
  [[-1,done?'All balanced!':'Right: '+RT[G.ri],C.cy],[1,G.pan<0?'Responsibility?':RE[G.pan],C.vi]].forEach(([s,t,col])=>{const e=ex(s),w=N?A.W*.44:A.W*.36;
   x.strokeStyle=A.alpha(C.tx,.5);x.lineWidth=1.5;x.beginPath();x.moveTo(e.x,e.y);x.lineTo(e.x,e.y+22);x.stroke();ft(x,700,N?12:13,'center');const L=lines(x,t,w-14),h=L.length*15+14;
   const bx=M.max(6,M.min(A.W-6-w,e.x-w/2));box(x,{x:bx,y:e.y+22,w,h},A.alpha(col,.18),col,10);x.fillStyle=C.tx;L.forEach((l,j)=>x.fillText(l,bx+w/2,e.y+22+14+j*15))});
  ft(x,700,13,'center');x.fillStyle=C.mu;x.fillText(`Balanced: ${M.min(G.ri,RT.length)} of ${RT.length}`,A.W/2,A.H*(N?.56:.62));
  ORD.forEach((k,i)=>{const r=resR(i),u=k<G.ri;box(x,r,u?A.alpha(C.gr,.18):C.pn,u?C.gr:A.alpha(C.tx,.35),8);ft(x,600,N?12:13);x.fillStyle=u?C.mu:C.tx;x.fillText((u?'✓ ':'')+RE[k],r.x+10,r.y+r.h/2)})}
 function weigh(k){if(G.ri>=RT.length||k<G.ri)return;G.pan=k;if(k===G.ri){G.tip=0;G.ri++;A.sound.pop();tell(`Balanced: the right ${RT[k]} goes with the responsibility ${RE[k]}.`);setTimeout(()=>{G.pan=-1;A.redraw()},700)}
  else{G.tip=1;A.sound.miss();tell(`Tipped: "${RE[k]}" protects the right ${RT[k]}. Which responsibility protects the right ${RT[G.ri]}?`)}}
 const pR=k=>{const N=A.narrow,X=A.W/2-(N?A.W*.36:110),w=N?A.W*.72:220,top=12;
  return k==='sky'?{x:X+10,y:top+30,w:w-20,h:34}:k==='face'?{x:X+w/2-34,y:top+70,w:68,h:68}:k==='cap'?{x:X+10,y:top+152,w:w-20,h:40}:k==='tag'?{x:X+10,y:top+198,w:w-20,h:30}:{x:X,y:top,w,h:244}};
 function postView(x,C){const ph=pR('all');box(x,ph,A.mix(C.pn,C.tx,.06),A.alpha(C.tx,.5),18);
  const sk=pR('sky');box(x,sk,A.alpha(C.cy,.35),null,8);
  const f=pR('face');if(G.fix.face){box(x,f,A.alpha(C.mu,.8),null,34);ft(x,700,11,'center');x.fillStyle='#ffffff';x.fillText('covered',f.x+34,f.y+34)}
  else{ft(x,400,48,'center');x.fillText('😜',f.x+34,f.y+36)}
  const cp=pR('cap');ft(x,700,13,'center');x.fillStyle=G.fix.cap?C.gr:C.tx;x.fillText(G.fix.cap?'“Fun day with Jo!”':'“LOL Jo’s silly face \ud83d\ude02”',cp.x+cp.w/2,cp.y+cp.h/2);
  const tg=pR('tag');ft(x,600,12,'center');x.fillStyle=G.fix.tag?C.gr:C.rd;x.fillText(G.fix.tag?'(no location)':'\ud83d\udccd Elm Primary, Year 5',tg.x+tg.w/2,tg.y+tg.h/2);
  foot(x,C,`Fixed: ${['face','cap','tag'].filter(k=>G.fix[k]).length} of 3 — tap what is not OK`)}
 function fix(k){const p=POST.find(z=>z[0]===k);if(k!=='sky')G.fix[k]=1;A.sound[k==='sky'?'tick':'pop']();tell(p[2])}
 function draw(A){const{ctx:x,col:C}=A,m=mode();x.fillStyle=A.mix(C.pn,C.gr,.04);x.fillRect(0,0,A.W,A.H);
  if(m==='bull')bullView(x,C);else if(m==='scene')sceneView(x,C);else if(m==='rope')ropeView(x,C);else if(m==='scale')scaleView(x,C);else if(m==='post')postView(x,C);
  else if(G.Q){ft(x,800,A.narrow?20:26,'center');x.fillStyle=C.tx;x.fillText(G.Q.done?nm(G.Q.a):'Which word fits?',A.W/2,A.H*.4);if(G.Q.done){ft(x,600,14,'center');x.fillStyle=C.mu;para(x,W[G.Q.a],A.W/2,A.H*.4+32,A.W-40,18)}}
  A.fx.draw(x)}
 function status(){const m=mode();return m==='bull'?ST[G.si%ST.length][0]+' '+SW.map((t,i)=>t+(G.sw[i]?' yes':' no')).join(', '):m==='scene'?'You: '+(G.you==null?'not placed':SP[G.you][0]):m==='rope'?`Rope ${G.rope} of 5.`:m==='scale'?`${G.ri} of 4 balanced.`:''}
 function tell(t){G.msg=t||'';const s=(t?t+' ':'')+status();c.say(t||s);A.cv.setAttribute('aria-label',s);if(read)read.textContent=G.msg;controls();A.redraw();G.check()}
 function controls(){if(!A||!pad)return;pad.innerHTML='';const m=mode(),b=(t,f)=>{c.el('button',{type:'button',class:'lbtn sm ghost'},pad,t).onclick=f};
  if(m==='bull'&&G.ok<ST.length){SW.forEach((t,i)=>b(`${t} ${G.sw[i]?'Yes':'No'}`,()=>tog(i)));b('Verdict \u2714',verdict)}
  if(m==='scene')SP.forEach(([t],i)=>b(t,()=>go2(i)));
  if(m==='rope'){RS.forEach(([t],i)=>{if(!G.used.includes(i))b(t,()=>reason(i))})}
  if(m==='scale'&&G.ri<RT.length)ORD.filter(k=>k>=G.ri).forEach(k=>b(RE[k],()=>weigh(k)));
  if(m==='post')POST.forEach(([k,t])=>b(t,()=>fix(k)))}
 const when=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg()+A.reveal(n))};
 const play=(fs,ms)=>{const g=++G.gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===G.gen)f()},j*ms))};
 const reset=()=>{G.gen++;G.check=()=>{};Object.assign(G,{si:0,sw:[0,0,0],ok:0,bad:-1,you:null,yd:0,yp:null,vis:{},rope:-2,used:[],ri:0,pan:-1,tip:0,fix:{}})};
 const steps=[
  {h:'Is it bullying?',p:'Bullying is hurting someone again and again, on purpose, when it is hard for them to stop it. Set the three switches for each story, then press Verdict.',
   predict:{q:'Mia and Leah fall out once and both say mean things. Is it bullying?',opts:['Yes: any mean words are bullying','No: it was once, and they are equals','Only if a teacher sees'],ans:1},
   task:'Judge all four stories',show:()=>play(ST.flatMap(s=>[()=>{G.sw=s[1].slice();tell('')},verdict]),330),
   go:()=>{reset();G.check=when(0,()=>G.ok>=ST.length,()=>'Bullying needs all three: again and again, on purpose, more power. Online, it is cyberbullying. An accident or a one-off fall-out is not bullying, but still worth sorting out.')}},
  {h:'Bystander or upstander?',p:'The group laughs at Sam every break. Drag You to a choice, or use the buttons. Find both upstander choices.',
   predict:{q:'You see it and walk past saying nothing. What are you?',opts:['Not part of it at all','A bystander','An upstander'],ans:1},
   task:'Find both upstander choices',show:()=>play([()=>go2(0),()=>go2(2),()=>go2(3)],700),
   go:()=>{reset();G.check=when(1,()=>G.vis.up&&G.vis.up2,()=>'A bystander sees and does nothing. An upstander acts in a safe way: tell an adult, or help the person. You never have to fight.')}},
  {h:'Peer pressure',p:'Peer pressure is feeling pushed by friends to do something. Tap reasons to pull the rope to your side. Some reasons pull the wrong way.',
   predict:{q:'Which reason is about integrity?',opts:['Nobody will find out','I do what’s right even when no one sees','Everyone else is doing it'],ans:1},
   task:'Pull the rope to your side',show:()=>play([0,1].map(i=>()=>reason(i)),700),
   go:()=>{reset();G.check=when(2,()=>G.rope>=3,()=>'Consent (Zoe has not said yes), empathy and integrity are real reasons. "Nobody will find out" is about getting caught, not about right and wrong.')}},
  {h:'Rights and responsibilities',p:'A right is something every person should have. A responsibility is something you should do so everyone keeps their rights. Balance each right.',
   predict:{q:'You have the right to say what you think. What goes with it?',opts:['You can say anything at all','Everyone has that right, so speak without lies or cruel words','Only adults have rights'],ans:1},
   task:'Balance all four rights',show:()=>play(R4.map(k=>()=>weigh(k)),800),
   go:()=>{reset();G.check=when(3,()=>G.ri>=RT.length,()=>'Every right comes with a responsibility. My right to be safe means I must not hurt others, because they have that right too.')}},
  {h:'Digital citizenship',p:'Digital citizenship is being safe, kind and fair online. This post is about to go up. Tap each part that is not OK.',
   task:'Fix the three problems',show:()=>play(['face','cap','tag'].map(k=>()=>fix(k)),600),
   go:()=>{reset();G.check=when(4,()=>G.fix.face&&G.fix.cap&&G.fix.tag,()=>'Safe (no location), kind (no laughing at Jo) and fair (Jo said yes first). That is digital citizenship.')}},
  {h:'Challenge',p:'',go:()=>{G.gen++;G.check=()=>{};ask()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>G.check()});
 let qi=-1,run=0;
 function ask(){qi++;const[t,a,ds]=QS[qi%QS.length];let opts=[a,...ds];const r=qi%3;opts=opts.slice(r).concat(opts.slice(0,r));G.Q={t,a,done:0};
  chal.innerHTML=`<p><b>${t}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');opts.forEach(o=>{c.el('button',{type:'button',class:'lbtn sm'},row,nm(o)).onclick=()=>judge(o)});tell('Challenge: '+t)}
 function judge(o){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const Q=G.Q,a=Q.a,fb=chal.querySelector('.fl-fb'),ok=o===a;let m='Right.';
  if(!ok){if(o==='bullying'&&a==='nb')m='Bullying is again and again, with more power. A one-off fall-out between equals is not bullying.';
   else if(o==='bystander'||a==='bystander')m='A bystander sees it and does nothing. An upstander acts in a safe way.';
   else m=`${nm(o)} means ${W[o]}. Here the answer is ${nm(a).toLowerCase()}.`}
  Q.done=1;if(ok){run++;A.win()}else{run=0;A.sound.miss()}A.redraw();
  fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask;
  A.cv.setAttribute('aria-label',(ok?'Correct. ':'Not quite. ')+m)}
 function down(p){const m=mode();
  if(m==='bull'){const i=[0,1,2].find(i=>inR(p,swR(i)));if(i!=null&&G.ok<ST.length)tog(i);return false}
  if(m==='scene'){const y=youP();if(M.hypot(p.x-y.x,p.y-y.y)<30){G.yd=1;G.yp={x:p.x,y:p.y};return true}const i=R4.find(i=>M.hypot(p.x-spot(i).x,p.y-spot(i).y)<50);if(i!=null)go2(i);return false}
  if(m==='rope'){const i=RS.findIndex((_,i)=>inR(p,cardR(i)));if(i>=0)reason(i);return false}
  if(m==='scale'){const i=ORD.findIndex((_,i)=>inR(p,resR(i)));if(i>=0)weigh(ORD[i]);return false}
  if(m==='post'){const k=['face','cap','tag','sky'].find(k=>inR(p,pR(k)));if(k)fix(k);return false}return false}
 function mv(p){if(G.yd){G.yp={x:p.x,y:p.y};A.redraw()}}
 function up(){if(!G.yd)return;const y=G.yp;let best=-1,bd=1e9;R4.forEach(i=>{const d=M.hypot(y.x-spot(i).x,y.y-spot(i).y);if(d<bd){bd=d;best=i}});G.yd=0;
  if(bd<90)go2(best);else{G.yp=null;G.you=null;tell('Drop You on a choice.')}}
 A=FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:A=>{const q=A.step===5;chal.hidden=!q;read.hidden=q;pad.hidden=q;if(!q)tell('')},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},bx);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);A.gest({down,move:mv,up});controls()}});
 A.start()})})();
