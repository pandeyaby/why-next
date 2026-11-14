/* Flagship – telling a grown-up when something feels wrong (ages 4–5, with a grown-up; EYFS PSED self-regulation and
   managing self, DfE Relationships Education "Being safe", NSPCC PANTS). Fill a helping hand with five trusted grown-ups
   (a smiling person you do not know is not one); sort moments into "tell a grown-up" or "all OK"; get lost in a shop and
   pick the safe helpers (a shop worker at the till, a mum with children) instead of going outside or hiding; say no to an
   unwanted kiss, tickle or "come with me"; sort surprise secrets from worry secrets; and keep telling until someone listens. */
(()=>{
 const PEOPLE=[['Mum',1,'#be185d'],['someone I do not know',0,'#64748b'],['Dad',1,'#1d4ed8'],['Gran',1,'#7c3aed'],['my teacher',1,'#047857'],['nursery helper',1,'#b45309']];
 const MOMENTS=[['I fell and hurt my knee.',0],['I am playing with my friend.',1],['A big boy keeps pushing me.',0],['I feel worried. My tummy hurts.',0],['I got a sticker for tidying up.',1],['I cannot find my grown-up.',0]];
 const SHOP=[['shop worker at the till',1],['go outside to look',0,'Stay inside the shop. Your grown-up will look for you there.'],['mum with children',1],['hide behind the shelf',0,'If you hide, no one can find you. Stay where people can see you.']];
 const NO=[['Auntie wants a kiss. You do not want one.',['Say "No thank you" and wave','Kiss her anyway'],0,'Your body belongs to you. You can say no and wave or high five instead.'],
  ['Tickling goes on and on. You want it to stop.',['Keep quiet','Say "Stop!" in a big voice'],1,'Say "Stop!" loudly. If it does not stop, tell a grown-up.'],
  ['Someone says "Come with me". Your grown-up did not say yes.',['Say "No" and go to your grown-up','Go with them'],0,'Only go with someone your grown-up said yes to. Say no and go to your grown-up.']];
 const SECRETS=[['A present for Mum: shh till her birthday!',0],['Someone hurt me and said "Do not tell."',1],['A party for Dad on Sunday.',0],['A secret that makes my tummy feel funny.',1],['A grown-up said "Do not tell Mum about our game."',1]];
 VIS.reg('flagtrust',c=>{let A,keys,quiz;c.fig.classList.add('young');
  const k={id:0,hand:[],mo:0,piles:[0,0],found:[],nn:0,se:0,sp:[0,0],asked:[],heard:false,line:'',oops:false,next:()=>{}};
  const part=()=>['hand','tell','shop','no','secret','keep','chal'][A.step];
  const fz=n=>Math.round(n*(A.narrow?1.05:1.2));
  const DARK='#172033',GREY='#475569',RULE='#64748b',WHITE='#ffffff',YES='#047857',NOPE='#b91c1c',SOFTY='#dcfce7',SOFTN='#f1f5f9';
  function word(g,t,x,y,n,col,w,al){g.font=`${w||800} ${fz(n)}px system-ui,sans-serif`;g.fillStyle=col;g.textAlign=al||'center';g.textBaseline='middle';g.fillText(String(t),x,y,A.W-12)}
  function split(g,t,max,n){g.font=`800 ${fz(n)}px system-ui,sans-serif`;const out=[];let row='';t.split(' ').forEach(w=>{const tr=row?row+' '+w:w;if(row&&g.measureText(tr).width>max){out.push(row);row=w}else row=tr});out.push(row);return out}
  function para(g,t,x,y,max,n,col){const L=split(g,t,max,n);L.forEach((l,i)=>word(g,l,x,y+(i-(L.length-1)/2)*fz(n+5),n,col))}
  function pad(g,r,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.strokeStyle=edge;g.lineWidth=lw||2;g.stroke()}
  const on=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
  function person(g,x,y,s,col){g.fillStyle=col;g.beginPath();g.arc(x,y-s*.55,s*.28,0,7);g.fill();A.paint.rrect(x-s*.3,y-s*.22,s*.6,s*.62,s*.2);g.fill()}
  function bubble(g){if(!k.line)return;const L=split(g,(k.oops?'✗ ':'✓ ')+k.line,A.W-44,13),lh=fz(13)+6,h=L.length*lh+12,y=A.H-h-6;pad(g,{x:10,y,w:A.W-20,h},WHITE,k.oops?NOPE:YES,3);L.forEach((l,i)=>word(g,l,A.W/2,y+6+lh*(i+.5),13,DARK))}
  const voice=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
  const oops=t=>{k.oops=true;k.line=t;A.sound.miss();voice(t);A.redraw()};
  const good=t=>{k.oops=false;k.line=t;A.sound.pop()};
  // ---- layout ----
  const cardR=i=>{const w=(A.W-36)/3,h=A.H*.15;return{x:12+(i%3)*(w+6),y:A.H*.47+Math.floor(i/3)*(h+6),w,h}};
  const fingerR=i=>{const hx=A.W*.06,hw=A.W*.36,fw=hw/5.6,top=A.H*(.06+[.1,.03,0,.03,.12][i]);return{x:hx+i*(fw*1.15),y:top,w:fw,h:A.H*.24}};
  const rowR=i=>({x:A.W*.47,y:A.H*(.04+i*.085),w:A.W*.49,h:A.H*.075});
  const binR=i=>{const w=(A.W-36)/2;return{x:12+i*(w+12),y:A.H*.42,w,h:A.H*.3}};
  const spotR=i=>{const w=(A.W-36)/2,h=A.H*.28;return{x:12+(i%2)*(w+12),y:A.H*.1+Math.floor(i/2)*(h+8),w,h}};
  const pickR=i=>({x:14,y:A.H*(.34+i*.2),w:A.W-28,h:A.H*.16});
  function hand(g,names,mark){const pr={x:A.W*.06,y:A.H*.26,w:A.W*.38,h:A.H*.18},skin=()=>{g.fillStyle='#fde68a';g.strokeStyle='#92400e';g.lineWidth=2};
   for(let i=0;i<5;i++){const f=fingerR(i);skin();A.paint.rrect(f.x,f.y,f.w,f.h+A.H*.06,f.w/2);g.fill();g.stroke()}
   skin();A.paint.rrect(pr.x,pr.y,pr.w,pr.h,18);g.fill();g.stroke();for(let i=0;i<5;i++){const f=fingerR(i);word(g,i+1,f.x+f.w/2,f.y+fz(14),13,'#78350f',900)}
   for(let i=0;i<5;i++){const r=rowR(i),n=names[i];pad(g,r,n?(mark&&mark(i))||WHITE:SOFTN,n?RULE:'#cbd5e1',1.5);word(g,`${i+1}  ${n||'…'}`,r.x+10,r.y+r.h/2,13,n?DARK:GREY,800,'left')}}
  function scene(g){const v=part();
   if(v==='hand'){hand(g,k.hand.map(i=>PEOPLE[i][0]));PEOPLE.forEach((p,i)=>{const r=cardR(i),used=k.hand.includes(i);pad(g,r,used?SOFTY:WHITE,used?YES:RULE,used?3:2);person(g,r.x+r.w/2,r.y+r.h*.4,r.h*.44,p[2]);
     split(g,p[0],r.w-8,11).forEach((l,j,a)=>word(g,l,r.x+r.w/2,r.y+r.h*.82+(j-(a.length-1)/2)*fz(12),11,DARK))})}
   if(v==='tell'||v==='secret'){const list=v==='tell'?MOMENTS:SECRETS,at=v==='tell'?k.mo:k.se,piles=v==='tell'?k.piles:k.sp,R=list[at],top={x:14,y:A.H*.05,w:A.W-28,h:A.H*.3};pad(g,top,WHITE,RULE,2.5);
    if(R)para(g,R[0],A.W/2,top.y+top.h/2,top.w-24,16,DARK);else word(g,'All sorted!',A.W/2,top.y+top.h/2,18,YES,900);
    (v==='tell'?['Tell a grown-up','All OK']:['Surprise: OK for now','Worry secret: tell']).forEach((t,i)=>{const b=binR(i),tell=v==='tell'?i===0:i===1;pad(g,b,tell?'#fef3c7':SOFTY,tell?'#b45309':YES,3);para(g,t,b.x+b.w/2,b.y+b.h*.3,b.w-12,14,DARK);word(g,piles[i]?'✓'.repeat(piles[i]):'tap',b.x+b.w/2,b.y+b.h*.72,16,GREY,900)})}
   if(v==='shop'){word(g,'Lost in the shop',A.W/2,A.H*.03+fz(6),15,DARK,900);SHOP.forEach((s,i)=>{const r=spotR(i),got=k.found.includes(i);pad(g,r,got?SOFTY:WHITE,got?YES:RULE,got?3.5:2);const cx=r.x+r.w/2,cy=r.y+r.h*.4,s0=r.h*.42;
     if(i===0){person(g,cx,cy,s0,'#047857');g.fillStyle=WHITE;g.fillRect(cx+s0*.05,cy-s0*.1,s0*.18,s0*.12);g.fillStyle='#92400e';g.fillRect(cx-s0*.9,cy+s0*.2,s0*.5,s0*.25)}
     if(i===1){g.fillStyle='#94a3b8';g.fillRect(cx-s0*.35,cy-s0*.7,s0*.7,s0*1.1);g.fillStyle=WHITE;g.fillRect(cx-s0*.27,cy-s0*.62,s0*.54,s0*.4);word(g,'EXIT',cx,cy+s0*.2,10,DARK,900)}
     if(i===2){person(g,cx-s0*.25,cy,s0,'#be185d');person(g,cx+s0*.3,cy+s0*.18,s0*.6,'#1d4ed8');person(g,cx+s0*.62,cy+s0*.18,s0*.6,'#7c3aed')}
     if(i===3){g.fillStyle='#b45309';g.fillRect(cx-s0*.6,cy-s0*.7,s0*1.2,s0*1.1);g.fillStyle='#fde68a';[-.45,-.1,.25].forEach(f=>g.fillRect(cx-s0*.55,cy+s0*f,s0*1.1,s0*.06))}
     para(g,s[0],cx,r.y+r.h*.85,r.w-10,12,DARK)})}
   if(v==='no'){const R=NO[k.nn],top={x:14,y:A.H*.04,w:A.W-28,h:A.H*.26};pad(g,top,'#e0f2fe',RULE,2);if(!R){word(g,'You can say no.',A.W/2,top.y+top.h/2,18,YES,900);return}
    para(g,R[0],A.W/2,top.y+top.h/2,top.w-24,15,DARK);R[1].forEach((o,i)=>{const q=pickR(i);pad(g,q,WHITE,RULE,2.5);para(g,o,q.x+q.w/2,q.y+q.h/2,q.w-20,15,DARK)})}
   if(v==='keep'){hand(g,['Mum','Dad','Gran','my teacher','nursery helper'],i=>k.asked[0]===i?'#fee2e2':k.heard&&k.asked[1]===i?SOFTY:null);
    const msg=!k.asked.length?'Tap a grown-up on your hand to tell them.':k.heard?'They listened. Well done for telling!':'Busy. Tell someone else!';para(g,msg,A.W/2,A.H*.6,A.W-40,15,k.heard?YES:DARK)}}
  function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#fffbeb',C.dark?.05:.5);g.fillRect(0,0,A.W,A.H);if(C.dark){g.fillStyle='#fffbeb';A.paint.rrect(6,6,A.W-12,A.H-12,16);g.fill()}
   if(part()==='chal')word(g,'Tell a grown-up you trust.',A.W/2,A.H/2,16,DARK);else scene(g);bubble(g);A.fx.draw(g)}
  // ---- moves ----
  function addPerson(i){if(k.hand.includes(i)||k.hand.length>=5)return;if(!PEOPLE[i][1])return oops('You do not know them, even if they smile. A trusted grown-up is someone you know who keeps you safe.');k.hand.push(i);good(`${PEOPLE[i][0]} can go on your hand.`);tidy()}
  function sortMoment(i){const R=MOMENTS[k.mo];if(!R)return;if(i!==R[1])return oops(R[1]?'This is a happy moment. It is all OK.':'This is a time to tell. A grown-up can help.');k.piles[i]++;good(i?'All OK.':'Tell a grown-up. They can help.');k.mo++;tidy()}
  function tapSpot(i){if(k.found.includes(i))return;if(!SHOP[i][1])return oops(SHOP[i][2]);k.found.push(i);good(k.found.length>=2?'Tell them your name and your grown-up\'s name.':`A ${SHOP[i][0]} can help you.`);tidy()}
  function chooseNo(i){const R=NO[k.nn];if(!R)return;if(i!==R[2])return oops(R[3]);good(R[1][i]+'.');k.nn++;tidy()}
  function sortSecret(i){const R=SECRETS[k.se];if(!R)return;if(i!==R[1])return oops(R[1]?'This secret makes you feel bad. Worry secrets should be told.':'This is a happy surprise. Everyone will know soon.');k.sp[i]++;good(i?'Worry secret: tell a grown-up.':'A surprise is OK to keep for now.');k.se++;tidy()}
  function tellOne(i){if(k.heard||k.asked.includes(i))return;k.asked.push(i);const n=['Mum','Dad','Gran','my teacher','nursery helper'][i];if(k.asked.length===1)good(`${n} is busy and says "Not now". Keep telling!`);else{k.heard=true;good(`${n} listens and helps. Keep telling until someone listens.`)}tidy()}
  function tidy(){const v=part();let s='';
   if(v==='hand')s=`Grown-ups on your hand: ${k.hand.length} of 5.`;else if(v==='tell')s=MOMENTS[k.mo]?`${MOMENTS[k.mo][0]} Tell a grown-up, or all OK?`:'All six sorted.';
   else if(v==='shop')s=`You are lost in a shop. Safe helpers found: ${k.found.length} of 2.`;else if(v==='no')s=NO[k.nn]?NO[k.nn][0]:'All three done.';
   else if(v==='secret')s=SECRETS[k.se]?`${SECRETS[k.se][0]} Surprise, or worry secret?`:'All five sorted.';else if(v==='keep')s=k.heard?'Someone listened.':'Tap a grown-up to tell them.';else s='Challenge.';
   voice((k.line?k.line+' ':'')+s);knobs();k.next()}
  function knobs(){if(!keys)return;keys.innerHTML='';const v=part(),add=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},keys,t);e.onclick=f};
   if(v==='hand')PEOPLE.forEach((p,i)=>{if(!k.hand.includes(i))add(p[0],()=>addPerson(i),`Put ${p[0]} on my hand`)});
   if(v==='tell'&&MOMENTS[k.mo]){add('Tell a grown-up',()=>sortMoment(0));add('All OK',()=>sortMoment(1))}
   if(v==='shop')SHOP.forEach((s,i)=>{if(!k.found.includes(i))add(s[0],()=>tapSpot(i))});
   if(v==='no'&&NO[k.nn])NO[k.nn][1].forEach((o,i)=>add(o,()=>chooseNo(i)));
   if(v==='secret'&&SECRETS[k.se]){add('Surprise: OK for now',()=>sortSecret(0));add('Worry secret: tell',()=>sortSecret(1))}
   if(v==='keep'&&!k.heard)['Mum','Dad','Gran','my teacher','nursery helper'].forEach((n,i)=>{if(!k.asked.includes(i))add(n,()=>tellOne(i),`Tell ${n}`)});A.redraw()}
  function down(p){const v=part(),find=(n,f)=>{for(let i=0;i<n;i++)if(on(p,f(i)))return i;return -1};let i;
   if(v==='hand'&&(i=find(6,cardR))>=0)addPerson(i);
   if((v==='tell'||v==='secret')&&(i=find(2,binR))>=0)(v==='tell'?sortMoment:sortSecret)(i);
   if(v==='shop'&&(i=find(4,spotR))>=0)tapSpot(i);
   if(v==='no'&&(i=find(2,pickR))>=0)chooseNo(i);
   if(v==='keep'&&(i=find(5,rowR))>=0)tellOne(i);return false}
  // ---- steps ----
  const check=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
  const play=fs=>{const id=++k.id,gap=A.reduced()?15:300;fs.forEach((f,i)=>setTimeout(()=>{if(id===k.id)f()},i*gap))};
  const wipe=()=>{k.id++;k.next=()=>{};k.hand=[];k.mo=0;k.piles=[0,0];k.found=[];k.nn=0;k.se=0;k.sp=[0,0];k.asked=[];k.heard=false;k.line='';k.oops=false};
  const steps=[
   {h:'My helping hand',p:'Trusted grown-ups are people you know who keep you safe. Put five on your hand: one for each finger.',
    predict:{q:'A kind lady you do not know smiles at you. Is she a trusted grown-up?',opts:['Yes, she smiled','No, I do not know her'],ans:1},
    task:'Put 5 grown-ups on your hand',show:()=>{steps[0].go();play([0,2,3,4,5].map(i=>()=>addPerson(i)))},go:()=>{wipe();tidy();k.next=check(0,()=>k.hand.length===5,'Five trusted grown-ups. You can tell any of them.')}},
   {h:'Tell, or all OK?',p:'Some things you should tell a grown-up about. Hurt, worried, lost or scared? Tell. Happy? All OK.',
    task:'Sort 6 moments',show:()=>{steps[1].go();play(MOMENTS.map(R=>()=>sortMoment(R[1])))},go:()=>{wipe();tidy();k.next=check(1,()=>k.mo>=MOMENTS.length,'Hurt, pushed, worried or lost: tell a grown-up.')}},
   {h:'Lost in a shop',p:'You cannot see your grown-up. Stop. Stay inside. Find a safe helper to tell.',
    predict:{q:'You cannot see your grown-up in the shop. What do you do first?',opts:['Run outside to look','Stop and stay in the shop'],ans:1},
    task:'Find 2 safe helpers',show:()=>{steps[2].go();play([()=>tapSpot(0),()=>tapSpot(2)])},go:()=>{wipe();tidy();k.next=check(2,()=>k.found.length>=2,'A shop worker or a mum with children can help you find your grown-up.')}},
   {h:'It is OK to say no',p:'Your body belongs to you. You can say no to a kiss, a hug or a tickle you do not want.',
    predict:{q:'Grandpa wants a hug. You do not want one. Is it OK to say no?',opts:['No, I have to','Yes, and wave instead'],ans:1},
    task:'Choose for 3 moments',show:()=>{steps[3].go();play(NO.map(R=>()=>chooseNo(R[2])))},go:()=>{wipe();tidy();k.next=check(3,()=>k.nn>=NO.length,'No means no. Say it, then tell a grown-up if you need to.')}},
   {h:'Surprise or worry secret?',p:'A surprise is happy, and everyone finds out soon. A secret that makes you feel bad is a worry secret. Tell it.',
    task:'Sort 5 secrets',show:()=>{steps[4].go();play(SECRETS.map(R=>()=>sortSecret(R[1])))},go:()=>{wipe();tidy();k.next=check(4,()=>k.se>=SECRETS.length,'Surprises are fun to keep. Worry secrets get told.')}},
   {h:'Keep telling',p:'Sometimes a grown-up is busy. Do not give up. Tell another grown-up on your hand.',
    task:'Find a grown-up who listens',show:()=>{steps[5].go();play([()=>tellOne(0),()=>tellOne(3)])},go:()=>{wipe();tidy();k.next=check(5,()=>k.heard,'Keep telling until a grown-up listens.')}},
   {h:'Challenge',p:'',go:()=>{wipe();ask()}}];
  steps.forEach(x=>{if(x.task)x.onPredict=()=>k.next()});
  // ---- challenge: each wrong answer names its slip ----
  const Q=[['You fall and hurt your arm at the park. What do you do?','Tell a grown-up I know',[['Hide it and say nothing','hide'],['Wait and hope it goes away','hide']]],
   ['You get lost in a shop. What do you do?','Stay in the shop and ask a shop worker',[['Go outside to look','leave'],['Hide so no one sees me','hidden']]],
   ['Your cousin keeps tickling you. You want it to stop.','Say "Stop!" and tell a grown-up if it goes on',[['Laugh and let it go on','quiet'],['Hit my cousin','hit']]],
   ['Someone says "Do not tell Mum about this." It makes you feel bad.','Tell a trusted grown-up',[['Keep the secret','secret'],['Keep it till my birthday','secret']]],
   ['You tell your teacher, but she is busy and does not hear.','Tell her again, or tell another grown-up',[['Stop telling anyone','giveup'],['Shout at her','hit']]],
   ['Who is a trusted grown-up?','Someone I know who keeps me safe',[['Anyone who smiles at me','stranger'],['Anyone who has sweets','stranger']]]];
  function why(tag){let m='Tell a grown-up you trust. They can help.';
   if(tag==='hide')m='When you are hurt, tell a grown-up. You will not be in trouble, and they can help it get better.';
   if(tag==='leave')m='Stay inside the shop. Your grown-up will look for you there.';
   if(tag==='hidden')m='If you hide, no one can find you. Stay where people can see you and ask a shop worker.';
   if(tag==='quiet')m='Your body belongs to you. Say "Stop!" in a big voice, and tell a grown-up if it goes on.';
   if(tag==='hit')m='Hitting or shouting can hurt. Use your words, and get a grown-up to help.';
   if(tag==='secret')m='A secret that makes you feel bad is a worry secret. Tell a trusted grown-up.';
   if(tag==='giveup')m='Do not give up. Keep telling until a grown-up listens.';
   if(tag==='stranger')m='A smile or sweets does not make someone safe. Trusted grown-ups are people you know.';
   return m}
  let qi=-1,run=0;
  function ask(){qi++;const [q,ans,bad]=Q[qi%Q.length],all=[[ans,'ok']].concat(bad),s=qi%3,order=all.slice(s).concat(all.slice(0,s));
   quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
   const r=quiz.querySelector('.fl-pick');order.forEach(([w,tag])=>{const e=c.el('button',{type:'button',class:'lbtn'},r,w);e.onclick=()=>score(tag,ans)});voice('Challenge: '+q);A.redraw()}
  function score(tag,ans){quiz.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=quiz.querySelector('.fl-fb');
   if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+run+'.':'✗ '+why(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
  A=FK.shell(c,{steps,ratio:.66,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==6;keys.hidden=A.step===6;knobs()},
   init:A=>{const w=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);A.gest({down})}});
  A.start()})})();
