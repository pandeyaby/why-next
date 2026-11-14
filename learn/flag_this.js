/* Flagship – determiners and articles (ages 6–7; CCSS L.1.1h; NC England English Appendix 2: a or an by the next sound in
   Year 3, the term "determiner" in Year 4; "use determiners (articles, demonstratives)"). Say a word out loud and choose a or
   an by its first SOUND, not its first letter (an hour, a unicorn); pick a for any one and the for the one we both know;
   then stand on a near mat with a far-away shelf: one thing near is this, one thing far is that, many near is these and
   many far is those. */
(()=>{
 const AN=[['apple',1,'#dc2626'],['ball',0,'#2563eb'],['egg',1,'#ca8a04'],['cat',0,'#7c3aed'],['owl',1,'#92400e'],['sock',0,'#be185d']];
 const TRICK=[['umbrella',1,'um-brel-la: it starts with the sound "u"'],['unicorn',0,'you-ni-corn: it starts with the sound "you"'],['hour',1,'our: the h is silent, so it starts with "ou"'],['horse',0,'horse: you can hear the h']];
 const THE=[['Can I have ___ biscuit, please? (any one)',0],['___ sun is hot today.',1],['I saw a dog. ___ dog barked at me.',1],['I would like ___ banana. (any one)',0]];
 const SPOT=[['kite',0,1],['ball',1,1],['book',1,1],['boat',0,1],['cup',1,1]];// [thing, near?, how many]
 const FOUR=[['shells',1,3],['bird',0,1],['stars',0,3],['shoe',1,1],['apples',0,3],['crayons',1,3]];
 const WORD=(near,n)=>near?(n>1?'these':'this'):(n>1?'those':'that');
 VIS.reg('flagthis',c=>{let A,pad,quiz;c.fig.classList.add('young');
  const s={id:0,ai:0,ti:0,hi:0,si:0,fi:0,line:'',bad:false,fin:()=>{}};
  const part=()=>['an','trick','the','this','four','chal'][A.step];
  const fz=n=>Math.round(n*(A.narrow?1.05:1.2));
  const INK='#172033',GREY='#475569',RULE='#64748b',WHITE='#ffffff',OK='#047857',NO='#b91c1c',SKY='#e0f2fe',GRASS='#dcfce7',MAT='#fde68a',WOOD='#b45309';
  function say(g,t,x,y,n,col,w,al){g.font=`${w||800} ${fz(n)}px system-ui,sans-serif`;g.fillStyle=col;g.textAlign=al||'center';g.textBaseline='middle';g.fillText(String(t),x,y,A.W-12)}
  function lines(g,t,max,n){g.font=`800 ${fz(n)}px system-ui,sans-serif`;const out=[];let row='';t.split(' ').forEach(w=>{const tr=row?row+' '+w:w;if(row&&g.measureText(tr).width>max){out.push(row);row=w}else row=tr});out.push(row);return out}
  function block(g,t,x,y,max,n,col){const L=lines(g,t,max,n);L.forEach((l,i)=>say(g,l,x,y+(i-(L.length-1)/2)*fz(n+6),n,col))}
  function box(g,r,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,16);g.fill();g.strokeStyle=edge;g.lineWidth=lw||2;g.stroke()}
  const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
  function note(g){if(!s.line)return;const L=lines(g,(s.bad?'✗ ':'✓ ')+s.line,A.W-44,13),lh=fz(13)+6,h=L.length*lh+12,y=A.H-h-6;box(g,{x:10,y,w:A.W-20,h},WHITE,s.bad?NO:OK,3);L.forEach((l,i)=>say(g,l,A.W/2,y+6+lh*(i+.5),13,INK))}
  const tell=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
  const nope=t=>{s.bad=true;s.line=t;A.sound.miss();tell(t);A.redraw()};
  const yes=t=>{s.bad=false;s.line=t;A.sound.pop()};
  // two big answer pads on the canvas
  const twoR=i=>{const w=(A.W-36)/2;return{x:12+i*(w+12),y:A.H*.5,w,h:A.H*.2}};
  const fourR=i=>{const w=(A.W-36)/2,h=A.H*.14;return{x:12+(i%2)*(w+12),y:A.H*.5+Math.floor(i/2)*(h+8),w,h}};
  const FOURW=['this','these','that','those'];
  function thing(g,x,y,r,col,name){g.fillStyle=col;if(name==='egg'||name==='boat'){g.beginPath();g.ellipse(x,y,r*.75,r,0,0,7);g.fill()}else if(name==='book'||name==='shoe'){A.paint.rrect(x-r,y-r*.7,r*2,r*1.4,r*.25);g.fill()}
   else if(name==='kite'||name==='stars'||name==='crayons'){g.beginPath();g.moveTo(x,y-r);g.lineTo(x+r*.8,y);g.lineTo(x,y+r);g.lineTo(x-r*.8,y);g.closePath();g.fill()}else{g.beginPath();g.arc(x,y,r,0,7);g.fill()}}
  function scene(g,near,n,name,col){const top=A.H*.04,h=A.H*.42;g.fillStyle=SKY;A.paint.rrect(12,top,A.W-24,h*.62,14);g.fill();g.fillStyle=GRASS;A.paint.rrect(12,top+h*.55,A.W-24,h*.45,14);g.fill();
   const kx=A.W*.1,ky=top+h*.78,ks=h*.42;g.fillStyle='#1d4ed8';g.beginPath();g.arc(kx,ky-ks*.62,ks*.22,0,7);g.fill();A.paint.rrect(kx-ks*.22,ky-ks*.38,ks*.44,ks*.6,ks*.12);g.fill();say(g,'you',kx,ky+ks*.4,11,INK);
   const mx=A.W*.38,mw=A.W*.3;g.fillStyle=MAT;A.paint.rrect(mx-mw/2,ky-6,mw,16,6);g.fill();say(g,'near',mx,top+h*.62,11,GREY);
   const fx=A.W*.8,fw=A.W*.26,fy=top+h*.42;g.fillStyle=WOOD;g.fillRect(fx-fw/2,fy,fw,8);say(g,'far away',fx,top+h*.1,11,GREY);
   g.strokeStyle=RULE;g.setLineDash([5,6]);g.lineWidth=1.5;g.beginPath();g.moveTo(kx+ks*.3,ky-ks*.5);g.lineTo(near?mx:fx,near?ky-20:fy-14);g.stroke();g.setLineDash([]);
   if(!name)return;const r=near?h*.1:h*.075,cx=near?mx:fx,cy=near?ky-r-4:fy-r-2;for(let i=0;i<n;i++)thing(g,cx+(i-(n-1)/2)*r*2.3,cy,r,col,name)}
  function picture(g){const v=part();
   if(v==='an'||v==='trick'){const L=v==='an'?AN:TRICK,i=v==='an'?s.ai:s.ti,R=L[i],top={x:12,y:A.H*.05,w:A.W-24,h:A.H*.38};box(g,top,WHITE,RULE,2.5);
    if(!R){say(g,v==='an'?'All six done!':'All four done!',A.W/2,top.y+top.h/2,20,OK,900)}else{
     if(v==='an')thing(g,top.x+top.w*.18,top.y+top.h/2,top.h*.24,R[2],R[0]);
     g.font=`900 ${fz(30)}px system-ui,sans-serif`;const rest=R[0].slice(1),first=R[0][0],wF=g.measureText(first).width,wR=g.measureText(rest).width,x0=A.W/2+(v==='an'?A.W*.06:0)-(wF+wR)/2;
     say(g,first,x0,top.y+top.h*.42,30,'#b45309',900,'left');say(g,rest,x0+wF,top.y+top.h*.42,30,INK,900,'left');
     say(g,v==='an'?'Say it out loud. Listen to the first sound.':'Listen to the sound, not the letter.',A.W/2,top.y+top.h*.8,12,GREY,700)}
    ['a','an'].forEach((w,j)=>{const b=twoR(j);box(g,b,j?'#fef3c7':'#ede9fe',j?'#b45309':'#6d28d9',3);say(g,w,b.x+b.w/2,b.y+b.h/2,30,INK,900)})}
   if(v==='the'){const R=THE[s.hi],top={x:12,y:A.H*.05,w:A.W-24,h:A.H*.38};box(g,top,WHITE,RULE,2.5);
    if(!R)say(g,'All four done!',A.W/2,top.y+top.h/2,20,OK,900);else block(g,R[0],A.W/2,top.y+top.h/2,top.w-24,18,INK);
    [['a','any one'],['the','the one we know']].forEach(([w,h2],j)=>{const b=twoR(j);box(g,b,j?'#fef3c7':'#ede9fe',j?'#b45309':'#6d28d9',3);say(g,w,b.x+b.w/2,b.y+b.h*.4,28,INK,900);say(g,h2,b.x+b.w/2,b.y+b.h*.8,11,GREY,700)})}
   if(v==='this'){const R=SPOT[s.si];if(R)scene(g,R[1],1,R[0],'#dc2626');else scene(g,1,0);if(!R)say(g,'All five done!',A.W/2,A.H*.25,20,OK,900);
    else say(g,`the ${R[0]}`,A.W/2,A.H*.08,14,INK,800);['this','that'].forEach((w,j)=>{const b=twoR(j);box(g,b,j?'#fef3c7':'#ede9fe',j?'#b45309':'#6d28d9',3);say(g,w,b.x+b.w/2,b.y+b.h*.4,28,INK,900);say(g,j?'far away':'near me',b.x+b.w/2,b.y+b.h*.8,11,GREY,700)})}
   if(v==='four'){const R=FOUR[s.fi];if(R)scene(g,R[1],R[2],R[0],'#7c3aed');else scene(g,1,0);if(!R)say(g,'All six done!',A.W/2,A.H*.25,20,OK,900);
    else say(g,R[2]>1?`${R[2]} ${R[0]}`:`1 ${R[0]}`,A.W/2,A.H*.08,14,INK,800);
    FOURW.forEach((w,j)=>{const b=fourR(j),many=j%2===1,near=j<2;box(g,b,near?'#ede9fe':'#fef3c7',near?'#6d28d9':'#b45309',3);say(g,w,b.x+b.w/2,b.y+b.h*.4,22,INK,900);say(g,`${near?'near':'far'}, ${many?'many':'one'}`,b.x+b.w/2,b.y+b.h*.8,10,GREY,700)})}}
  function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#f8fafc',C.dark?.05:.5);g.fillRect(0,0,A.W,A.H);if(C.dark){g.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);g.fill()}
   if(part()==='chal')say(g,'a, an, the, this, that, these, those',A.W/2,A.H/2,15,INK);else picture(g);note(g);A.fx.draw(g)}
  // ---- moves ----
  function pickAn(j){const v=part(),L=v==='an'?AN:TRICK,i=v==='an'?s.ai:s.ti,R=L[i];if(!R)return;const w=j?'an':'a',right=R[1]?'an':'a';
   if(j!==R[1]){if(v==='an')return nope(R[1]?`Say "${R[0]}". It starts with a vowel sound, so it is an ${R[0]}. "a ${R[0]}" is hard to say.`:`"${R[0]}" starts with a consonant sound, so it is a ${R[0]}.`);
    return nope(`Listen, do not look: ${R[2]}. So it is ${right} ${R[0]}.`)}
   yes(`${w} ${R[0]}.`+(v==='trick'?` ${R[2][0].toUpperCase()+R[2].slice(1)}.`:''));if(v==='an')s.ai++;else s.ti++;sync()}
  function pickThe(j){const R=THE[s.hi];if(!R)return;if(j!==R[1])return nope(R[1]?(s.hi===1?'There is only one sun, so we both know which one: the sun.':'We already know which dog: the one I just told you about. So it is the dog.'):'Any one will do, so we say a. "the" points at one special thing we both know.');
   const w=j?'the':'a';yes(R[0].replace(/(^|\. )___/,(m,q)=>q+w[0].toUpperCase()+w.slice(1)).replace('___',w).replace(/ \(any one\)/,''));s.hi++;sync()}
  function pickThis(j){const R=SPOT[s.si];if(!R)return;const right=R[1]?0:1;if(j!==right)return nope(R[1]?`The ${R[0]} is near you, on the mat. Near is this: this ${R[0]}.`:`The ${R[0]} is far away. Far is that: that ${R[0]}.`);
   yes(`${['this','that'][j]} ${R[0]}.`);s.si++;sync()}
  function pickFour(j){const R=FOUR[s.fi];if(!R)return;const right=WORD(R[1],R[2]),w=FOURW[j];
   if(w!==right){const nearOK=(j<2)===!!R[1],manyOK=(j%2===1)===(R[2]>1);return nope(!manyOK&&nearOK?(R[2]>1?`There are ${R[2]} ${R[0]}. Many needs ${right}, not ${w}.`:`There is only 1 ${R[0]}. One needs ${right}, not ${w}.`):!nearOK&&manyOK?`Look where they are: ${R[1]?'near you, so '+right:'far away, so '+right}.`:`Check two things: near or far, and one or many. It is ${right}.`)}
   yes(`${right} ${R[0]}.`);s.fi++;sync()}
  function sync(){const v=part();let t='';
   if(v==='an'){const R=AN[s.ai];t=R?`Word: ${R[0]}. Pick a or an.`:'All six words done.'}
   else if(v==='trick'){const R=TRICK[s.ti];t=R?`Word: ${R[0]}. Pick a or an by the sound.`:'All four tricky words done.'}
   else if(v==='the'){const R=THE[s.hi];t=R?`${R[0].replace('___','blank')} Pick a or the.`:'All four sentences done.'}
   else if(v==='this'){const R=SPOT[s.si];t=R?`One ${R[0]} is ${R[1]?'near you on the mat':'far away on the shelf'}. Pick this or that.`:'All five done.'}
   else if(v==='four'){const R=FOUR[s.fi];t=R?`${R[2]>1?R[2]+' '+R[0]+' are':'1 '+R[0]+' is'} ${R[1]?'near you':'far away'}. Pick this, these, that or those.`:'All six done.'}
   else t='Challenge.';tell((s.line?s.line+' ':'')+t);keys();s.fin()}
  function keys(){if(!pad)return;pad.innerHTML='';const v=part(),add=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);e.onclick=f};
   if((v==='an'&&AN[s.ai])||(v==='trick'&&TRICK[s.ti])){add('a',()=>pickAn(0),'Choose a');add('an',()=>pickAn(1),'Choose an')}
   if(v==='the'&&THE[s.hi]){add('a',()=>pickThe(0),'Choose a');add('the',()=>pickThe(1),'Choose the')}
   if(v==='this'&&SPOT[s.si]){add('this',()=>pickThis(0),'Choose this');add('that',()=>pickThis(1),'Choose that')}
   if(v==='four'&&FOUR[s.fi])FOURW.forEach((w,j)=>add(w,()=>pickFour(j),`Choose ${w}`));A.redraw()}
  function down(p){const v=part();
   if(v==='an'||v==='trick'||v==='the'||v==='this'){for(let j=0;j<2;j++)if(hit(p,twoR(j))){(v==='the'?pickThe:v==='this'?pickThis:pickAn)(j);break}}
   if(v==='four')for(let j=0;j<4;j++)if(hit(p,fourR(j))){pickFour(j);break}return false}
  // ---- steps ----
  const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
  const play=fs=>{const id=++s.id,gap=A.reduced()?15:320;fs.forEach((f,i)=>setTimeout(()=>{if(id===s.id)f()},i*gap))};
  const reset=()=>{s.id++;s.fin=()=>{};s.ai=0;s.ti=0;s.hi=0;s.si=0;s.fi=0;s.line='';s.bad=false};
  const steps=[
   {h:'a or an?',p:'Say the word out loud. Does it start with a vowel sound, like a, e, i, o, u? Then use an. If not, use a.',
    predict:{q:'Which sounds right?',opts:['a egg','an egg'],ans:1},
    task:'Give 6 words a or an',show:()=>{steps[0].go();play(AN.map(R=>()=>pickAn(R[1])))},go:()=>{reset();sync();s.fin=fin(0,()=>s.ai>=AN.length,'an apple, an egg, an owl. a ball, a cat, a sock.')}},
   {h:'Listen, not look',p:'It is the first sound that counts, not the first letter. Say each word slowly.',
    predict:{q:'Unicorn starts with the letter u. Which is right?',opts:['an unicorn','a unicorn'],ans:1},
    task:'Sort 4 tricky words',show:()=>{steps[1].go();play(TRICK.map(R=>()=>pickAn(R[1])))},go:()=>{reset();sync();s.fin=fin(1,()=>s.ti>=TRICK.length,'an umbrella, a unicorn, an hour, a horse. Your ears decide.')}},
   {h:'a or the?',p:'a means any one. the means one special thing that we both know about.',
    task:'Finish 4 sentences',show:()=>{steps[2].go();play(THE.map(R=>()=>pickThe(R[1])))},go:()=>{reset();sync();s.fin=fin(2,()=>s.hi>=THE.length,'a for any one. the for the one we both know.')}},
   {h:'this or that?',p:'You are on the left. Is the thing near you on the mat, or far away on the shelf?',
    predict:{q:'A kite is far away, up in the sky. What do you say?',opts:['Look at this kite!','Look at that kite!'],ans:1},
    task:'Point at 5 things',show:()=>{steps[3].go();play(SPOT.map(R=>()=>pickThis(R[1]?0:1)))},go:()=>{reset();sync();s.fin=fin(3,()=>s.si>=SPOT.length,'Near is this. Far is that.')}},
   {h:'these or those?',p:'For many things, this turns into these, and that turns into those. Check: near or far? One or many?',
    task:'Pick the word 6 times',show:()=>{steps[4].go();play(FOUR.map(R=>()=>pickFour(FOURW.indexOf(WORD(R[1],R[2])))))},go:()=>{reset();sync();s.fin=fin(4,()=>s.fi>=FOUR.length,'this and these are near. that and those are far.')}},
   {h:'Challenge',p:'',go:()=>{reset();ask()}}];
  steps.forEach(x=>{if(x.task)x.onPredict=()=>s.fin()});
  // ---- challenge: each wrong answer names its slip ----
  const Q=[['I ate ___ orange.','an',[['a','sound'],['these','many']]],
   ['Look at ___ birds up in the tree!','those',[['these','near'],['that','one']]],
   ['___ book in my hand is new.','This',[['That','far'],['These','many']]],
   ['It took ___ hour to get there.','an',[['a','letter'],['the','the']]],
   ['We saw a cat. ___ cat was asleep.','The',[['A','again'],['An','sound']]],
   ['Can you pass me ___ crayons by my feet?','these',[['those','near'],['this','one']]]];
  function slip(tag){let m='Say it out loud and check: near or far, one or many.';
   if(tag==='sound')m='Listen to the next word. If it starts with a vowel sound, use an. If not, use a.';
   if(tag==='letter')m='Hour starts with the letter h, but the h is silent. You hear "our", a vowel sound, so it is an hour.';
   if(tag==='many')m='these and those are for many things. Here there is only one.';
   if(tag==='one')m='this and that are for one thing. Here there are many, so use these or those.';
   if(tag==='near')m='Check where they are. Near me is this or these. Far away is that or those.';
   if(tag==='far')m='The book is in my hand, so it is near. Near is this.';
   if(tag==='again')m='We already know which cat: the one we just saw. So it is the cat.';
   if(tag==='the')m='We do not know which hour. Any one will do, and hour starts with a vowel sound, so it is an hour.';return m}
  let qi=-1,streak=0;
  function ask(){qi++;const [q,ans,bad]=Q[qi%Q.length],all=[[ans,'ok']].concat(bad),k=qi%3,order=all.slice(k).concat(all.slice(0,k));
   quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
   const r=quiz.querySelector('.fl-pick');order.forEach(([w,tag])=>{const e=c.el('button',{type:'button',class:'lbtn'},r,w);e.onclick=()=>judge(tag,ans)});tell('Challenge: '+q.replace('___','blank'));A.redraw()}
  function judge(tag,ans){quiz.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=quiz.querySelector('.fl-fb');
   if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+streak+'.':'✗ '+slip(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
  A=FK.shell(c,{steps,ratio:.66,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
   init:A=>{const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);A.gest({down})}});
  A.start()})})();
