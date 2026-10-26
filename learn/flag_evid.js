/* Flagship – using and evaluating textual evidence (ages 11–14): find the line that proves a claim, rate quotations as
   strong, weak or off the point, trim a quotation to the words that matter, embed it in your own sentence, and explain it. */
(()=>{const mn=Math.min,mx=Math.max;
 const TEXT=['Maya gripped her script so hard that the pages crumpled.','The hall was packed, and chairs scraped near the back.','Her teacher gave a thumbs-up. Maya did not smile back.','She had practised her lines every night for three weeks.','When her name was called, she breathed in and walked out.'];
 const FIND=[['Maya is nervous.',0,{1:'Line 2 is about the hall, not Maya. A packed hall might cause nerves, but it does not show them.',2:'Not smiling could mean nerves, focus or annoyance. Look for a clearer sign.',3:'Practice shows effort, not nerves.',4:'Line 5 shows her going on, not her nerves.'}],
  ['Maya has worked hard to prepare.',3,{0:'Gripping a script shows nerves, not preparation.',1:'Line 2 describes the audience.',2:'The thumbs-up is the teacher, not Maya’s work.',4:'Walking out happens now. It says nothing about practice.'}],
  ['Maya finds the courage to perform.',4,{0:'Line 1 shows fear, the opposite of courage.',1:'The crowd is the challenge, not her courage.',2:'Line 3 is before she goes on.',3:'Practice is preparation. Courage is facing the moment.'}]];
 const BINS=['Strong','Weak','Does not support'];
 const RATE=[['“gripped her script so hard that the pages crumpled”',0,'It shows Maya’s own body reacting, and it fits only one reading: tension.'],['“The hall was packed”',1,'It is about the setting. It gives a reason she might be nervous, not proof that she is.'],
  ['“Maya did not smile back”',1,'It is about Maya, but it fits more than one reading: nerves, focus or annoyance.'],['“practised her lines every night”',2,'It shows preparation. It does not show nerves; if anything, it suggests confidence.']];
 const TRIM=[[0,'Maya is nervous',['gripped','crumpled.'],9],[4,'Maya finds courage',['breathed','walked'],6]];
 const GAP=[['Maya’s nerves show when she ___ that the pages crumpled.',[['“gripped her script so hard”','ok'],['“Maya gripped her script so hard.”','dump'],['“the pages crumpled”','clash']]],
  ['Maya has worked hard, since she practised ___.',[['“The hall was packed”','off'],['“every night for three weeks”','ok'],['“She had practised her lines every night for three weeks.”','dump']]],
  ['The crowd adds pressure, because the hall was ___.',[['“thumbs-up”','off'],['“The hall was packed, and chairs scraped near the back.”','dump'],['“packed”','ok']]]];
 const GAPWHY={dump:'That drops a whole sentence into yours, so the grammar breaks. Embed only the words that fit.',clash:'Now the sentence says the pages crumpled twice and loses the action. Pick the words that fill the gap.',off:'Those words do not prove this point. Choose evidence that matches the claim.'};
 const LINK=[['“gripped … the pages crumpled”',[['This shows that she gripped her script so hard that the pages crumpled.','retell'],['The verb “gripped” and the crumpled pages show tension she cannot hide.','ok'],['This shows that Maya is nervous.','restate']]],
  ['“every night for three weeks”',[['“Every night” stresses a habit kept up over time, so her effort was steady.','ok'],['This shows she practised every night for three weeks.','retell'],['This proves she worked hard.','restate']]],
  ['“breathed in and walked out”',[['This shows she is brave.','restate'],['This shows she breathed in and walked out.','retell'],['Taking a breath shows she feels the fear; walking out anyway shows courage.','ok']]]];
 const LINKWHY={retell:'That repeats the quotation in other words. Say how the words prove the point.',restate:'That repeats the claim. Explain which word does the work, and why.'};
VIS.reg('flagevid',c=>{let A,keys,qz,echo;
 const K={fi:0,fok:0,ri:0,rated:[],ti:0,tok:0,a:-1,b:-1,gi:0,gok:0,fill:0,li:0,lok:0,red:null,lift:null,at:null,after:()=>{},ver:0,big:null};
 const out=t=>{c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(echo)echo.textContent=t}};
 const scene=()=>['find','rate','trim','gap','link','quiz'][A.step];
 const sz=n=>A.narrow?n:n+2,font=(n,w)=>`${w||600} ${sz(n)}px system-ui,sans-serif`;
 function lines(g,t,w,f){g.font=f;const ws=t.split(' '),L=[];let s='';ws.forEach(x=>{const z=s?s+' '+x:x;if(g.measureText(z).width>w&&s){L.push(s);s=x}else s=z});if(s)L.push(s);return L}
 function para(g,t,X,Y,w,n,col,wt,mid){const f=font(n,wt),L=lines(g,t,w,f),h=sz(n)*1.3;g.font=f;g.fillStyle=col;g.textBaseline='middle';g.textAlign=mid?'center':'left';
  const y0=Y-(L.length-1)*h/2;L.forEach((l,i)=>g.fillText(l,mid?X+w/2:X,y0+i*h));return L.length*h}
 function slab(g,r,col,hard,a){g.fillStyle=A.alpha(col,a||.13);A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=col;g.lineWidth=hard?3.5:1.5;g.stroke()}
 const at=(p,r)=>r&&p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
 const wrong=t=>{A.sound.miss();out(t);A.redraw()};
 const head=()=>mn(54,A.H*.13);
 const lineR=i=>{const t=head()+6,h=(A.H-t-8)/5;return{x:8,y:t+i*h,w:A.W-16,h:h-6}};
 const binR=i=>{const g=8,w=(A.W-4*g)/3,h=mn(84,A.H*.2);return{x:g+i*(w+g),y:A.H-h-8,w,h}};
 const optR=(i,n)=>{const t=A.H*.42,h=(A.H-t-8)/n;return{x:8,y:t+i*h,w:A.W-16,h:h-8}};
 const quoteC=()=>({x:A.W*.06,y:A.H*.3,w:A.W*.88,h:mn(80,A.H*.2)});
 function chips(g){const T=TRIM[K.ti],ws=TEXT[T[0]].split(' '),f=font(15,700),pad=10,gap=8,R=[];let x=10,y=A.H*.3;g.font=f;
  ws.forEach(w=>{const cw=g.measureText(w).width+2*pad,ch=sz(15)*2.4;if(x+cw>A.W-10){x=10;y+=ch+gap}R.push({x,y,w:cw,h:ch,t:w});x+=cw+gap});return R}
 const checkR=()=>({x:A.W*.2,y:A.H-mn(60,A.H*.14)-10,w:A.W*.6,h:mn(60,A.H*.14)});
 function findV(g){const C=A.col;if(K.fok>=3)return para(g,'Three claims, three lines that prove them.',10,A.H/2,A.W-20,16,C.gr,800,1);
  slab(g,{x:8,y:6,w:A.W-16,h:head()-8},C.or,1,.18);para(g,'Claim: '+FIND[K.fi][0]+' Tap the line that proves it.',16,6+(head()-8)/2,A.W-32,13,C.tx,800,1);
  TEXT.forEach((t,i)=>{const r=lineR(i);slab(g,r,K.red===i?C.rd:C.vi,K.red===i,.08);para(g,(i+1)+'  '+t,r.x+10,r.y+r.h/2,r.w-20,13,C.tx,500)})}
 function rateV(g){const C=A.col;para(g,'Claim: Maya is nervous. How well does each quotation support it?',10,A.H*.1,A.W-20,14,C.tx,800,1);
  BINS.forEach((b,i)=>{const r=binR(i),n=K.rated.filter(k=>RATE[k][1]===i).length;slab(g,r,[C.gr,C.or,C.mu][i],K.red===i,.15);para(g,b,r.x+4,r.y+r.h*.35,r.w-8,12,C.tx,800,1);para(g,n?'✔'.repeat(n):'',r.x,r.y+r.h*.72,r.w,13,C.tx,800,1)});
  if(K.ri>=4)return para(g,'All four rated. Strong evidence is about the character and fits one reading.',10,A.H*.45,A.W-20,14,C.gr,800,1);
  let r=quoteC();if(K.lift&&K.at)r={...r,x:K.at.x-r.w/2,y:K.at.y-r.h/2};slab(g,r,C.cy,!!K.lift,.2);para(g,RATE[K.ri][0],r.x+10,r.y+r.h/2,r.w-20,14,C.tx,700,1);
  para(g,'Drag it to a box, or use the buttons.',10,A.H*.56,A.W-20,12,C.mu,600,1)}
 function trimV(g){const C=A.col;if(K.tok>=2)return para(g,'Both quotations trimmed to the words that matter.',10,A.H/2,A.W-20,16,C.gr,800,1);
  const T=TRIM[K.ti];para(g,`Point: ${T[1]}. Tap the first and last word of the shortest quotation that proves it.`,10,A.H*.12,A.W-20,13,C.tx,800,1);
  const lo=mn(K.a,K.b<0?K.a:K.b),hi=mx(K.a,K.b);chips(g).forEach((r,i)=>{const on=K.a>=0&&i>=lo&&i<=hi;slab(g,r,on?C.cy:C.mu,on,on?.35:.08);para(g,r.t,r.x,r.y+r.h/2,r.w,15,C.tx,700,1)});
  const n=K.a<0?0:hi-lo+1;para(g,n?`Selected: ${n} word${n>1?'s':''}`:'Nothing selected yet',10,A.H*.66,A.W-20,13,C.mu,700,1);const r=checkR();slab(g,r,C.gr,1,.2);para(g,'Check quotation',r.x,r.y+r.h/2,r.w,15,C.tx,800,1)}
 function gapV(g){const C=A.col;if(K.gok>=3)return para(g,'Three quotations embedded so each sentence still reads smoothly.',10,A.H/2,A.W-20,16,C.gr,800,1);
  const G=GAP[K.gi],ok=G[1].find(o=>o[1]==='ok')[0];slab(g,{x:8,y:8,w:A.W-16,h:A.H*.3},C.or,K.lift!=null,.14);para(g,K.fill?G[0].replace('___',ok):G[0],18,8+A.H*.15,A.W-36,15,C.tx,700,1);
  G[1].forEach((o,j)=>{let r=optR(j,3);if(K.lift===j&&K.at)r={...r,x:K.at.x-r.w/2,y:K.at.y-r.h/2};slab(g,r,K.red===j?C.rd:C.vi,K.red===j||K.lift===j,.12);para(g,o[0],r.x+10,r.y+r.h/2,r.w-20,13,C.tx,600,1)});
  para(g,'Drag the words that fit into the gap.',10,A.H*.37,A.W-20,12,C.mu,600,1)}
 function linkV(g){const C=A.col;if(K.lok>=3)return para(g,'Three explanations that zoom in on the words.',10,A.H/2,A.W-20,16,C.gr,800,1);
  const L=LINK[K.li];slab(g,{x:8,y:8,w:A.W-16,h:A.H*.3},C.cy,0,.14);para(g,'Evidence: '+L[0]+' Which explanation says how it proves the point?',18,8+A.H*.15,A.W-36,14,C.tx,700,1);
  L[1].forEach((o,j)=>{const r=optR(j,3);slab(g,r,K.red===j?C.rd:C.vi,K.red===j,.1);para(g,o[0],r.x+10,r.y+r.h/2,r.w-20,13,C.tx,600,1)})}
 function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.05:.35);g.fillRect(0,0,W,H);
  const f={find:findV,rate:rateV,trim:trimV,gap:gapV,link:linkV}[scene()];if(f)f(g);else{g.font=`900 ${mn(W,H)*.16}px Georgia,serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=A.alpha(C.vi,.5);g.fillText(K.big||'“ ”',W/2,H/2)}A.fx.draw(g)}
 function choose(i){if(K.fok>=3)return;const F=FIND[K.fi];if(i!==F[1]){K.red=i;return wrong(F[2][i])}K.red=null;K.fok++;K.fi=mn(2,K.fok);A.sound.pop();report(`Yes, line ${i+1} proves it.`)}
 function rate(b){if(K.ri>=4)return;const q=RATE[K.ri];if(q[1]!==b){K.red=b;return wrong(`Not ${BINS[b].toLowerCase()}. ${q[2]}`)}K.red=null;K.rated.push(K.ri);K.ri++;A.sound.pop();report(`${BINS[b]}: ${q[2]}`)}
 function word(i){if(K.tok>=2)return;if(K.a<0||K.b>=0){K.a=i;K.b=-1}else K.b=i;A.sound.tick();report()}
 function check(){if(K.tok>=2)return;const T=TRIM[K.ti],ws=TEXT[T[0]].split(' ');if(K.a<0)return wrong('Tap the first word, then the last word.');
  const lo=mn(K.a,K.b<0?K.a:K.b),hi=mx(K.a,K.b),pick=ws.slice(lo,hi+1),n=pick.length;
  if(n<2)return wrong('One word is too little to prove anything. Keep the action.');
  if(!T[2].some(k=>pick.includes(k)))return wrong(`“${pick.join(' ')}” does not show it. Keep the word that does the work.`);
  if(n>T[3])return wrong(`${n} words is more than you need. Cut the words that do not prove the point.`);
  K.tok++;K.ti=mn(1,K.tok);K.a=K.b=-1;A.sound.pop();report(`Good: “${pick.join(' ').replace(/[.,]$/,'')}” keeps the proof and nothing extra.`)}
 function slot(j){if(K.gok>=3||K.fill)return;const o=GAP[K.gi][1][j];if(o[1]!=='ok'){K.red=j;return wrong(GAPWHY[o[1]])}K.red=null;K.fill=1;A.sound.pop();report('It reads as one smooth sentence.');
  const v=K.ver;setTimeout(()=>{if(v!==K.ver)return;K.gok++;K.fill=0;K.gi=mn(2,K.gok);report()},A.reduced()?10:700)}
 function link(j){if(K.lok>=3)return;const o=LINK[K.li][1][j];if(o[1]!=='ok'){K.red=j;return wrong(LINKWHY[o[1]])}K.red=null;K.lok++;K.li=mn(2,K.lok);A.sound.pop();report('That explains how the words prove the point.')}
 function report(msg){const v=scene();let t;
  if(v==='find')t=K.fok>=3?'All three claims proved.':`Claim: ${FIND[K.fi][0]} Lines: `+TEXT.map((x,i)=>(i+1)+'. '+x).join(' ');
  else if(v==='rate')t=K.ri>=4?'All four quotations rated.':`Rate ${RATE[K.ri][0]} as strong, weak or does not support.`;
  else if(v==='trim'){const T=TRIM[K.ti],ws=TEXT[T[0]].split(' ');t=K.tok>=2?'Both trimmed.':K.a<0?`Point: ${T[1]}. Sentence: ${TEXT[T[0]]}`:`Selected: ${ws.slice(mn(K.a,K.b<0?K.a:K.b),mx(K.a,K.b)+1).join(' ')}`}
  else if(v==='gap')t=K.gok>=3?'All three embedded.':`Sentence: ${GAP[K.gi][0].replace('___','blank')} Options: `+GAP[K.gi][1].map(o=>o[0]).join('; ');
  else if(v==='link')t=K.lok>=3?'All three explained.':`Evidence ${LINK[K.li][0]}. Options: `+LINK[K.li][1].map(o=>o[0]).join(' | ');else t='Challenge time.';
  out((msg?msg+' ':'')+t);buttons();K.after()}
 function buttons(){if(!A||!keys)return;keys.innerHTML='';const v=scene();
  const btn=(t,f,off,lab)=>{const e=c.el('button',{type:'button',class:'lbtn ghost sm','aria-label':lab||null},keys,t);e.disabled=!!off;e.onclick=f};
  if(v==='find'&&K.fok<3)TEXT.forEach((t,i)=>btn('Line '+(i+1),()=>choose(i),0,'Line '+(i+1)+': '+t));
  if(v==='rate'&&K.ri<4)BINS.forEach((b,i)=>btn(b,()=>rate(i)));
  if(v==='trim'&&K.tok<2){TEXT[TRIM[K.ti][0]].split(' ').forEach((w,i)=>btn(w,()=>word(i),0,`Word ${i+1}: ${w}`));btn('Check quotation',check)}
  if(v==='gap'&&K.gok<3&&!K.fill)GAP[K.gi][1].forEach((o,j)=>btn(o[0],()=>slot(j),0,'Put in the gap: '+o[0]));
  if(v==='link'&&K.lok<3)LINK[K.li][1].forEach((o,j)=>btn(String.fromCharCode(65+j),()=>link(j),0,'Explanation '+String.fromCharCode(65+j)+': '+o[0]));A.redraw()}
 const fin=(n,cond,msg)=>()=>{if(A.step===n&&cond()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg()+A.reveal(n))};
 const auto=(fs,ms)=>{const v=K.ver;fs.forEach((f,j)=>setTimeout(()=>{if(v===K.ver&&f)f()},A.reduced()?j*20:j*ms))};
 const wipe=()=>{K.ver++;K.after=()=>{};K.big=null;K.lift=null;K.at=null;K.red=null};
 const steps=[
  {h:'Find the line',p:'Read the five lines about Maya. For each claim, tap the line that proves it.',task:'Prove three claims',
   show:()=>{steps[0].go();auto(FIND.map(f=>()=>choose(f[1])),400)},go:()=>{wipe();K.fi=0;K.fok=0;report();K.after=fin(0,()=>K.fok>=3,()=>'Each claim needs its own line; one quotation does not prove everything.')}},
  {h:'Strong or weak?',p:'Evidence can be strong, weak or off the point. Rate each quotation for the claim that Maya is nervous.',
   predict:{q:'Which is stronger evidence that Maya is nervous?',opts:['“The hall was packed”, because crowds cause nerves','“gripped her script so hard that the pages crumpled”'],ans:1},task:'Rate all four quotations',
   show:()=>{steps[1].go();auto(RATE.map(q=>()=>rate(q[1])),350)},go:()=>{wipe();K.ri=0;K.rated=[];report();K.after=fin(1,()=>K.ri>=4,()=>'Strong evidence shows the character directly and fits only one reading.')}},
  {h:'Trim the quote',p:'Short quotations are easier to embed and analyse. Keep only the words that prove the point.',
   predict:{q:'Is a longer quotation stronger evidence?',opts:['Yes, more words give more proof','No, keep only the words that prove it'],ans:1},task:'Trim two quotations',
   show:()=>{steps[2].go();auto([()=>word(1),()=>word(5),check,()=>word(6),()=>word(10),check],250)},go:()=>{wipe();K.ti=0;K.tok=0;K.a=K.b=-1;report();K.after=fin(2,()=>K.tok>=2,()=>'Short, exact quotations keep the proof and drop the padding.')}},
  {h:'Embed it',p:'Build the quotation into your own sentence, so the sentence still makes sense when read aloud.',task:'Embed three quotations',
   show:()=>{steps[3].go();auto([()=>slot(0),0,()=>slot(1),0,()=>slot(2)],450)},go:()=>{wipe();K.gi=0;K.gok=0;K.fill=0;report();K.after=fin(3,()=>K.gok>=3,()=>'An embedded quotation fits the grammar of your sentence.')}},
  {h:'Explain the link',p:'A quotation does not explain itself. Pick the explanation that zooms in on the words.',
   predict:{q:'After a good quotation, do you still need to explain it?',opts:['No, the quote speaks for itself','Yes, say how the words prove it'],ans:1},task:'Choose three explanations',
   show:()=>{steps[4].go();auto([1,0,2].map(j=>()=>link(j)),400)},go:()=>{wipe();K.li=0;K.lok=0;report();K.after=fin(4,()=>K.lok>=3,()=>'Point, evidence, then explain which word does the work.')}},
  {h:'Challenge',p:'',go:()=>{wipe();pose()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>K.after()});
 const Q=[['Claim: Leo is lonely. Which evidence is strongest?',[['“He ate lunch alone again, staring at the door.”','ok'],['“The canteen was noisy.”','setting'],['“Leo liked maths.”','offclaim']]],
  ['Which sentence embeds the quotation correctly?',[['Sam “slammed the door”, which shows his anger.','ok'],['Sam is angry. “He slammed the door and threw his bag.”','dump'],['Sam is angry “slammed”.','broken']]],
  ['Which explanation analyses the evidence?',[['“Whispered” suggests she fears being overheard.','ok'],['This shows that she whispered.','retell'],['This shows that she is scared.','restate']]],
  ['Which is the best-trimmed quotation to show Tom is cold?',[['“shivering in the doorway”','ok'],['the whole paragraph about the storm','long'],['“the”','short']]],
  ['The text says “Jo smiled.” Is “Jo is happy” stated or inferred?',[['Inferred: the smile is a clue','ok'],['Stated: the text says so','stated'],['Neither: we can not use it','refuse']]],
  ['Why is “Amir never missed a training session” strong evidence that he is dedicated?',[['It shows a habit kept up over time','ok'],['Because it is a long quotation','long'],['Because it mentions training','topic']]]];
 let qi=-1,run=0;
 function pose(){qi++;const[q,ops]=Q[qi%Q.length],r=qi%3;K.big='“ ? ”';
  qz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=qz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>verdict(tag)});out('Challenge: '+q);A.redraw()}
 function verdict(tag){qz.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=qz.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Correct.';break;
   case 'setting':m='That describes the place, not Leo. Evidence should show the character.';break;
   case 'offclaim':m='True, but it has nothing to do with loneliness. Evidence must match the claim.';break;
   case 'dump':m='That is a dropped-in quotation: it stands alone, cut off from your sentence.';break;
   case 'broken':m='The quote is bolted on and the sentence no longer makes sense.';break;
   case 'retell':m='That retells the quotation. Analysis says how the words prove the point.';break;
   case 'restate':m='That just repeats the claim. Name the word and what it suggests.';break;
   case 'long':m='Length is not strength. Keep only the words that prove it.';break;
   case 'short':m='Too short: “the” proves nothing. Keep the key words.';break;
   case 'stated':m='The text says she smiled, not that she is happy. Happiness is inferred.';break;
   case 'refuse':m='Inferences are allowed if the evidence supports them. A smile does.';break;
   default:m='Mentioning the topic is not enough. It is strong because it shows a repeated action.'}
  const good=tag==='ok';if(good){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${good?'✓':'✗'} ${m}${good?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}
 function grab(p){const v=scene();K.lift=null;K.at=null;
  if(v==='find'&&K.fok<3){for(let i=0;i<5;i++)if(at(p,lineR(i)))choose(i);return false}
  if(v==='rate'&&K.ri<4){if(at(p,quoteC())){K.lift=1;return true}for(let i=0;i<3;i++)if(at(p,binR(i)))rate(i);return false}
  if(v==='trim'&&K.tok<2){if(at(p,checkR()))return check(),false;chips(A.ctx).forEach((r,i)=>{if(at(p,r))word(i)});return false}
  if(v==='gap'&&K.gok<3&&!K.fill){for(let j=0;j<3;j++)if(at(p,optR(j,3))){K.lift=j;return true}return false}
  if(v==='link'&&K.lok<3){for(let j=0;j<3;j++)if(at(p,optR(j,3)))link(j)}return false}
 function drop(p){const v=scene(),k=K.lift;K.lift=null;K.at=null;if(k==null)return A.redraw();
  if(v==='rate'){const i=[0,1,2].find(i=>at(p,binR(i)));if(i!=null)rate(i);else A.redraw()}
  else if(v==='gap'){if(p.y<8+A.H*.3||at(p,optR(k,3)))slot(k);else A.redraw()}}
 A=FK.shell(c,{steps,ratio:.66,tall:1.32,draw,onStep:A=>{qz.hidden=A.step!==5;keys.hidden=A.step===5;buttons()},
  init:A=>{const E=c.el,wrap=E('div',{class:'fl-below'},A.below);echo=E('p',{class:'fl-read','aria-hidden':'true'});
   keys=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},wrap);qz=E('div',{class:'fl-chal'},A.below);
   A.gest({down:grab,move:p=>{K.at=p;A.redraw()},up:drop});buttons()}});
 A.start()})})();
