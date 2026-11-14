/* Flagship – Greek and Latin roots for word meaning (ages 9–11; CCSS L.4.4b and L.5.4b "use common, grade-appropriate
   Greek and Latin affixes and roots as clues to the meaning of a word"; NC England Years 5–6 "use knowledge of morphology
   and etymology ... to understand the meaning of new words"). Tap the gap to split a word into its parts, give each part
   its meaning to build a definition, sort words into root families, decode new words, catch a false friend with the
   sentence, and build a word from a definition. Roots are clues: the sentence has the last word. */
(()=>{
 const SPLIT=[['telescope',4,'tele = far, scope = look at'],['microphone',5,'micro = small, phone = sound'],['transport',5,'trans = across, port = carry']];
 const MEAN=[['microscope',[['micro',['small','many','far'],0],['scope',['look at','write','carry'],0]],'a tool for looking at small things'],
  ['biology',[['bio',['two','life','book'],1],['logy',['study of','fear of','sound'],0]],'the study of living things'],
  ['audible',[['aud',['see','say','hear'],2],['ible',['able to be','full of','not'],0]],'able to be heard']];
 const FAM=['spect: look','port: carry','dict: say'];
 const SORT=[['inspect',0],['export',1],['predict',2],['spectator',0],['portable',1],['dictionary',2]];
 const DEC=[['subterranean','Moles are subterranean animals.','sub = under, terra = earth',['live under the ground','live under the sea','live above the clouds'],0],
  ['interrupt','Please do not interrupt the speaker.','inter = between, rupt = break',['break in while someone talks','carry across','look again'],0],
  ['phony','The "gold" watch was phony: it was only painted metal.','looks like phon = sound',['fake','loud','about sound'],0]];
 const TILES=['tele','micro','bio','port','scope','phone','logy','able','graph'];
 const MEANS={tele:'far',micro:'small',bio:'life',port:'carry',scope:'look at',phone:'sound',logy:'study of',able:'can be',graph:'write'};
 const BUILD=[['a tool for seeing far away',['tele','scope']],['the study of life',['bio','logy']],['able to be carried',['port','able']]];
 VIS.reg('flagroot',c=>{let A,pad,quiz;
  const R={id:0,wi:0,pi:0,cut:-1,mi:0,part:0,si:0,di:0,bi:0,pick:[],line:'',bad:false,fin:()=>{}};
  const part=()=>['split','mean','sort','dec','build','chal'][A.step];
  const fz=n=>Math.round(n*(A.narrow?1:1.12));
  const INK='#172033',GREY='#475569',RULE='#64748b',WHITE='#ffffff',OK='#047857',NO='#b91c1c',GK='#1d4ed8',LT='#9a3412',CREAM='#fefce8',EDGE='#a16207';
  function say(g,t,x,y,n,col,w,al){g.font=`${w||800} ${fz(n)}px system-ui,sans-serif`;g.fillStyle=col;g.textAlign=al||'center';g.textBaseline='middle';g.fillText(String(t),x,y,A.W-12)}
  function lines(g,t,max,n){g.font=`800 ${fz(n)}px system-ui,sans-serif`;const out=[];let row='';t.split(' ').forEach(w=>{const tr=row?row+' '+w:w;if(row&&g.measureText(tr).width>max){out.push(row);row=w}else row=tr});out.push(row);return out}
  function block(g,t,x,y,max,n,col){const L=lines(g,t,max,n);L.forEach((l,i)=>say(g,l,x,y+(i-(L.length-1)/2)*fz(n+6),n,col))}
  function box(g,r,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=edge;g.lineWidth=lw||2;g.stroke()}
  const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
  function note(g){if(!R.line)return;const L=lines(g,(R.bad?'✗ ':'✓ ')+R.line,A.W-44,13),lh=fz(13)+6,h=L.length*lh+12,y=A.H-h-6;box(g,{x:10,y,w:A.W-20,h},WHITE,R.bad?NO:OK,3);L.forEach((l,i)=>say(g,l,A.W/2,y+6+lh*(i+.5),13,INK))}
  const tell=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
  const nope=t=>{R.bad=true;R.line=t;A.sound.miss();tell(t);A.redraw()};
  const yes=t=>{R.bad=false;R.line=t;A.sound.pop()};
  function head(g,t,sub){const r={x:12,y:A.H*.04,w:A.W-24,h:A.H*.17};box(g,r,CREAM,EDGE,2.5);say(g,t,A.W/2,r.y+r.h*(sub?.36:.5),20,INK,900);if(sub)say(g,sub,A.W/2,r.y+r.h*.76,12,GREY,700)}
  // letter tiles for the split step
  const letR=(w,i)=>{const n=w.length,lw=Math.min(40,(A.W-28)/n),x0=(A.W-lw*n)/2;return{x:x0+i*lw,y:A.H*.3,w:lw-3,h:A.H*.13}};
  const gapR=(w,i)=>{const a=letR(w,i);return{x:a.x+a.w-8,y:a.y-6,w:14,h:a.h+12}};
  const optR=i=>{const w=(A.W-36)/3;return{x:12+i*(w+6),y:A.H*.52,w,h:A.H*.15}};
  const binR=i=>{const w=(A.W-36)/3;return{x:12+i*(w+6),y:A.H*.42,w,h:A.H*.24}};
  const tileR=i=>{const w=(A.W-36)/3,h=A.H*.1;return{x:12+(i%3)*(w+6),y:A.H*.34+Math.floor(i/3)*(h+6),w,h}};
  function picture(g){const v=part();
   if(v==='split'){const S=SPLIT[R.wi];if(!S)return head(g,'All three split!');head(g,'Where do the parts meet?','Tap the gap between two letters');const w=S[0];
    for(let i=0;i<w.length;i++){const r=letR(w,i),side=R.cut<0?null:i<S[1]?GK:LT;box(g,r,side?(i<S[1]?'#dbeafe':'#ffedd5'):WHITE,side||RULE,2);say(g,w[i],r.x+r.w/2,r.y+r.h/2,20,INK,900)}
    for(let i=0;i<w.length-1;i++){const r=gapR(w,i);g.fillStyle=R.cut===i?OK:'#cbd5e1';g.fillRect(r.x+5,r.y,4,r.h)}
    if(R.cut>=0)say(g,S[2],A.W/2,A.H*.56,15,INK,800)}
   if(v==='mean'){const M=MEAN[R.mi];if(!M)return head(g,'All three built!');head(g,M[0],'Give each part its meaning');const P=M[1],pw=(A.W-24)/P.length;
    P.forEach((q,i)=>{const r={x:12+i*pw,y:A.H*.26,w:pw-6,h:A.H*.12},done=i<R.part;box(g,r,i===R.part?'#dbeafe':done?'#dcfce7':WHITE,i===R.part?GK:done?OK:RULE,i===R.part?3:2);say(g,q[0],r.x+r.w/2,r.y+r.h*.35,16,INK,900);say(g,done?q[1][q[2]]:'?',r.x+r.w/2,r.y+r.h*.75,12,done?OK:GREY,800)});
    const Q=P[R.part];if(Q)Q[1].forEach((o,i)=>{const r=optR(i);box(g,r,WHITE,RULE,2.5);block(g,o,r.x+r.w/2,r.y+r.h/2,r.w-10,14,INK)});else block(g,`${M[0]} = ${M[2]}`,A.W/2,A.H*.6,A.W-40,15,OK)}
   if(v==='sort'){const S=SORT[R.si];head(g,S?S[0]:'All six sorted!',S?'Which root family?':'');FAM.forEach((f,i)=>{const b=binR(i);box(g,b,['#dbeafe','#ffedd5','#ede9fe'][i],[GK,LT,'#6d28d9'][i],3);block(g,f,b.x+b.w/2,b.y+b.h*.3,b.w-10,13,INK);
     const n=SORT.slice(0,R.si).filter(x=>x[1]===i).map(x=>x[0]);n.forEach((w,j)=>say(g,w,b.x+b.w/2,b.y+b.h*(.58+j*.2),11,GREY,700))})}
   if(v==='dec'){const D=DEC[R.di];if(!D)return head(g,'All three decoded!');head(g,D[0],D[2]);block(g,D[1],A.W/2,A.H*.32,A.W-40,14,INK);D[3].forEach((o,i)=>{const r=optR(i);box(g,r,WHITE,RULE,2.5);block(g,o,r.x+r.w/2,r.y+r.h/2,r.w-10,13,INK)})}
   if(v==='build'){const B=BUILD[R.bi];if(!B)return head(g,'All three built!');head(g,'Build the word',B[0]);const got=R.pick.join(' + ')||'tap two parts';say(g,got,A.W/2,A.H*.27,17,R.pick.length?INK:GREY,900);
    TILES.forEach((t,i)=>{const r=tileR(i),on=R.pick.includes(t);box(g,r,on?'#dbeafe':WHITE,on?GK:RULE,on?3:2);say(g,t,r.x+r.w/2,r.y+r.h*.38,15,INK,900);say(g,MEANS[t],r.x+r.w/2,r.y+r.h*.76,10,GREY,700)})}}
  function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#f8fafc',C.dark?.05:.5);g.fillRect(0,0,A.W,A.H);if(C.dark){g.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);g.fill()}
   if(part()==='chal')say(g,'root + root = meaning, then check the sentence',A.W/2,A.H/2,14,INK);else picture(g);note(g);A.fx.draw(g)}
  // ---- moves ----
  function cut(i){const S=SPLIT[R.wi];if(!S||R.cut>=0)return;const w=S[0];if(i!==S[1]-1)return nope(`${w.slice(0,i+1)} + ${w.slice(i+1)}: those are not parts with a meaning. Look for a part you know from another word.`);
   R.cut=i;yes(`${w.slice(0,S[1])} + ${w.slice(S[1])}. ${S[2]}.`);sync();const id=R.id;setTimeout(()=>{if(id!==R.id)return;R.wi++;R.cut=-1;sync()},A.reduced()?20:900)}
  function mean(j){const M=MEAN[R.mi];if(!M)return;const Q=M[1][R.part];if(!Q)return;
   if(j!==Q[2]){const w=Q[1][j];return nope(Q[0]==='bio'&&w==='two'?'bi- (one letter shorter) means two, as in bicycle. bio means life, as in biography.':Q[0]==='aud'?`aud means hear, as in audio and audience. ${w==='see'?'vis means see.':'dict means say.'}`:`${Q[0]} does not mean ${w}. Think of another word with ${Q[0]} in it.`)}
   yes(`${Q[0]} = ${Q[1][Q[2]]}.`);R.part++;if(R.part>=M[1].length){yes(`${M[0]} = ${M[2]}.`);const id=R.id;setTimeout(()=>{if(id!==R.id)return;R.mi++;R.part=0;sync()},A.reduced()?20:900)}sync()}
  function sortTo(j){const S=SORT[R.si];if(!S)return;if(j!==S[1])return nope(`Find the root inside ${S[0]}. It has ${FAM[S[1]].split(':')[0]}, which means ${FAM[S[1]].split(': ')[1]}.`);yes(`${S[0]}: ${FAM[j]}.`);R.si++;sync()}
  function decode(j){const D=DEC[R.di];if(!D)return;if(j!==D[4]){return nope(D[0]==='phony'?(j===2?'phony looks like phon, but the sentence says painted metal. Here it means fake: a false friend. Roots are clues; the sentence decides.':'Read the sentence again: a "gold" watch that is only painted metal is fake.'):`Use both parts: ${D[2]}. Then check it fits the sentence.`)}
   yes(D[0]==='phony'?'phony means fake. It only looks like phon. The sentence won.':`${D[0]}: ${D[3][D[4]]}. ${D[2]}.`);R.di++;sync()}
  function tap(t){const B=BUILD[R.bi];if(!B||R.pick.includes(t))return;R.pick.push(t);if(R.pick.length<2){yes(`${t} = ${MEANS[t]}. Now the second part.`);return sync()}
   const ok=R.pick[0]===B[1][0]&&R.pick[1]===B[1][1];if(!ok){const bad=R.pick.find((x,i)=>x!==B[1][i])||R.pick[0],swap=R.pick[0]===B[1][1]&&R.pick[1]===B[1][0];R.pick=[];sync();
     return nope(swap?`Right parts, wrong order. English puts ${B[1][0]} first: ${B[1].join('')}.`:`${bad} means ${MEANS[bad]}. "${B[0]}" needs parts that mean ${B[1].map(x=>MEANS[x]).join(' and ')}.`)}
   yes(`${B[1].join('')}: ${B[0]}.`);R.pick=[];R.bi++;sync()}
  function sync(){const v=part();let t='';
   if(v==='split'){const S=SPLIT[R.wi];t=S?`Word: ${S[0]}. Tap the gap where its two parts meet.`:'All three words split.'}
   else if(v==='mean'){const M=MEAN[R.mi],Q=M&&M[1][R.part];t=M?(Q?`${M[0]}: what does ${Q[0]} mean?`:`${M[0]} means ${M[2]}.`):'All three meanings built.'}
   else if(v==='sort'){const S=SORT[R.si];t=S?`Word: ${S[0]}. Is it in the spect, port or dict family?`:'All six sorted.'}
   else if(v==='dec'){const D=DEC[R.di];t=D?`${D[1]} Clue: ${D[2]}. What does ${D[0]} mean here?`:'All three decoded.'}
   else if(v==='build'){const B=BUILD[R.bi];t=B?`Build a word that means ${B[0]}. Picked: ${R.pick.join(' + ')||'none'}.`:'All three built.'}
   else t='Challenge.';tell((R.line?R.line+' ':'')+t);keys();R.fin()}
  function keys(){if(!pad)return;pad.innerHTML='';const v=part(),add=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);e.onclick=f};
   if(v==='split'&&SPLIT[R.wi]&&R.cut<0){const w=SPLIT[R.wi][0];for(let i=0;i<w.length-1;i++)add(`${w.slice(0,i+1)} | ${w.slice(i+1)}`,()=>cut(i),`Split after ${w.slice(0,i+1)}`)}
   if(v==='mean'){const M=MEAN[R.mi],Q=M&&M[1][R.part];if(Q)Q[1].forEach((o,j)=>add(o,()=>mean(j),`${Q[0]} means ${o}`))}
   if(v==='sort'&&SORT[R.si])FAM.forEach((f,j)=>add(f,()=>sortTo(j),`Put in the ${f} family`));
   if(v==='dec'&&DEC[R.di])DEC[R.di][3].forEach((o,j)=>add(o,()=>decode(j)));
   if(v==='build'&&BUILD[R.bi])TILES.forEach(t=>{if(!R.pick.includes(t))add(t,()=>tap(t),`${t}, means ${MEANS[t]}`)});A.redraw()}
  function down(p){const v=part(),find=(n,f)=>{for(let i=0;i<n;i++)if(hit(p,f(i)))return i;return -1};let i;
   if(v==='split'&&SPLIT[R.wi]){const w=SPLIT[R.wi][0],r0=letR(w,0),lw=r0.w+3;if(p.y>r0.y-14&&p.y<r0.y+r0.h+14){const k=Math.round((p.x-r0.x)/lw)-1;if(k>=0&&k<w.length-1)cut(k)}}
   if(v==='mean'&&(i=find(3,optR))>=0)mean(i);
   if(v==='sort'&&(i=find(3,binR))>=0)sortTo(i);
   if(v==='dec'&&(i=find(3,optR))>=0)decode(i);
   if(v==='build'&&(i=find(TILES.length,tileR))>=0)tap(TILES[i]);return false}
  // ---- steps ----
  const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
  const play=(fs,gap0)=>{const id=++R.id,gap=A.reduced()?40:(gap0||340);fs.forEach((f,i)=>setTimeout(()=>{if(id===R.id)f()},i*gap))};
  const reset=()=>{R.id++;R.fin=()=>{};R.wi=0;R.cut=-1;R.mi=0;R.part=0;R.si=0;R.di=0;R.bi=0;R.pick=[];R.line='';R.bad=false};
  const steps=[
   {h:'Split the word',p:'Many long words are built from Greek or Latin parts. Tap the gap where the two parts meet.',
    predict:{q:'telescope, television and telephone all start with tele. What does tele mean?',opts:['far','screen','look'],ans:0},
    task:'Split 3 words',show:()=>{steps[0].go();play(SPLIT.map(S=>()=>cut(S[1]-1)),1100)},go:()=>{reset();sync();R.fin=fin(0,()=>R.wi>=SPLIT.length,'Each part carries a meaning: tele far, scope look, micro small, phone sound, trans across, port carry.')}},
   {h:'Build the meaning',p:'Give each part its meaning, then put the meanings together.',
    predict:{q:'What does bio mean in biology?',opts:['two','life','book'],ans:1},
    task:'Build 3 meanings',show:()=>{steps[1].go();play(MEAN.flatMap(M=>M[1].map(Q=>()=>mean(Q[2])).concat([()=>{}, ()=>{}])),520)},go:()=>{reset();sync();R.fin=fin(1,()=>R.mi>=MEAN.length,'small + look at = microscope. life + study of = biology. hear + able to be = audible.')}},
   {h:'Root families',p:'Words that share a root share a meaning. Find the root inside each word.',
    task:'Sort 6 words',show:()=>{steps[2].go();play(SORT.map(S=>()=>sortTo(S[1])))},go:()=>{reset();sync();R.fin=fin(2,()=>R.si>=SORT.length,'spect look, port carry, dict say: each family shares a meaning.')}},
   {h:'Decode new words',p:'Use the parts as clues, then check the meaning fits the sentence. Watch out for a word that only looks like a root.',
    predict:{q:'The "gold" watch was phony: it was only painted metal. phony looks like phon (sound). What does phony mean here?',opts:['about sound','fake','very loud'],ans:1},
    task:'Decode 3 words',show:()=>{steps[3].go();play(DEC.map(D=>()=>decode(D[4])))},go:()=>{reset();sync();R.fin=fin(3,()=>R.di>=DEC.length,'Roots are strong clues, but the sentence has the last word.')}},
   {h:'Make a word',p:'Read the meaning. Tap the two parts in order to build the word.',
    task:'Build 3 words',show:()=>{steps[4].go();play(BUILD.flatMap(B=>B[1].map(t=>()=>tap(t))))},go:()=>{reset();sync();R.fin=fin(4,()=>R.bi>=BUILD.length,'telescope, biology, portable: you can build a word from its meaning.')}},
   {h:'Challenge',p:'',go:()=>{reset();ask()}}];
  steps.forEach(x=>{if(x.task)x.onPredict=()=>R.fin()});
  // ---- challenge: each wrong answer names its slip ----
  const Q=[['What does transatlantic mean?','across the Atlantic',[['under the Atlantic','sub'],['between Atlantic towns','inter']]],
   ['Which word means "able to be seen"?','visible',[['audible','sense'],['portable','sense']]],
   ['A biography is…','writing about a person\'s life',[['a book about two people','bi'],['the study of life','logy']]],
   ['Dictation is when someone…','says words for you to write down',[['breaks words apart','rupt'],['carries words away','port']]],
   ['Which word comes from port, meaning carry?','export',[['expect','look'],['predict','dict']]],
   ['"The new phone was phony." What is the best clue to phony?','the rest of the sentence',[['the root phon (sound)','false'],['the first letter, p','letter']]]];
  function slip(tag){let m='Split the word, give each part its meaning, then check the sentence.';
   if(tag==='sub')m='under is sub-, as in submarine. trans- means across, as in transport.';
   if(tag==='inter')m='between is inter-, as in interrupt. trans- means across.';
   if(tag==='sense')m='aud is hearing and port is carrying. vis means see, as in vision.';
   if(tag==='bi')m='bi- means two, but bio means life. A biography is writing (graph) about a life.';
   if(tag==='logy')m='-logy is study of. graph means write, so a biography is life writing.';
   if(tag==='rupt')m='rupt means break. dict means say, as in predict and dictionary.';
   if(tag==='port')m='port means carry, but dict means say. Dictation is saying words aloud.';
   if(tag==='look')m='expect comes from spect, look (look out for). Look for port, carry: export.';
   if(tag==='dict')m='predict has dict, say: say before. Look for port, carry: export.';
   if(tag==='false')m='phony only looks like phon. It means fake, and only the sentence tells you that.';
   if(tag==='letter')m='One letter tells you nothing. Use the parts and the sentence.';return m}
  let qi=-1,streak=0;
  function ask(){qi++;const [q,ans,bad]=Q[qi%Q.length],all=[[ans,'ok']].concat(bad),k=qi%3,order=all.slice(k).concat(all.slice(0,k));
   quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
   const r=quiz.querySelector('.fl-pick');order.forEach(([w,tag])=>{const e=c.el('button',{type:'button',class:'lbtn'},r,w);e.onclick=()=>judge(tag,ans)});tell('Challenge: '+q);A.redraw()}
  function judge(tag,ans){quiz.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=quiz.querySelector('.fl-fb');
   if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+streak+'.':'✗ '+slip(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
  A=FK.shell(c,{steps,ratio:.66,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
   init:A=>{const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);A.gest({down})}});
  A.start()})})();
