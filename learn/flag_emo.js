/* Flagship – emotion vocabulary (ages 7–9): rank anger words by strength on a feeling thermometer, sort close cousins
   (scared/worried, lonely/alone, embarrassed/guilty) by the clue that tells them apart, mix two feelings in one jar,
   find every precise word for a left-out moment, and drop the exact word into an "I feel …" bubble. */
(()=>{const mn=Math.min,hy=Math.hypot;
 const HOT=['annoyed','cross','angry','furious'],HOTSHOW=[2,0,3,1];
 const PAIR=[['Scared','Worried','Danger right now?','Or something that might happen later?',[['A big dog runs at you',0],['Thinking about tomorrow’s test',1]]],
  ['Lonely','Alone','Wanting someone to be with?','Or just nobody near, and that is fine?',[['No one to play with in a busy playground',0],['Reading happily in your room',1]]],
  ['Embarrassed','Guilty','Others saw an awkward moment?','Or you did something wrong?',[['You trip on stage and people laugh',0],['You broke a mug and hid it',1]]]];
 const MIX=[['🏫','First day at a new school',['excited','nervous','bored','sleepy']],['👋','Last day of a great holiday',['happy','sad','furious','bored']]],MIXOK=[['excited','nervous'],['happy','sad']];
 const MIXNO={bored:'Bored means nothing to do. A new day like this is full of new things.',sleepy:'Sleepy is your body, not how you feel about the day.',furious:'Furious is the strongest anger. Nothing unfair happened here.'};
 const PARTY=[['disappointed',1],['left out',1],['proud',0],['lonely',1],['sad',2],['jealous',1],['grateful',0]];
 const PNO={proud:'Proud is about something good you did. Nothing went well for Mia here.',grateful:'Grateful is for a kind thing someone did for you. That did not happen.',sad:'Sad is true, but blurry. Which kind of sad? Find a sharper word.'};
 const SPOT=[['🏆','You practised for weeks and won the spelling quiz.','proud',['grateful','proud','jealous']],
  ['🧣','Gran knitted you a warm scarf.','grateful',['proud','embarrassed','grateful']],
  ['🎭','You tripped on stage and people laughed.','embarrassed',['embarrassed','guilty','grateful']]];
 const MEAN={proud:'Proud is when YOU did something good.',grateful:'Grateful is when someone did something kind FOR you.',jealous:'Jealous is wanting what someone else has got.',guilty:'Guilty is when you did something wrong.',embarrassed:'Embarrassed is when others see an awkward moment.'};
VIS.reg('flagemo',c=>{let A,pad,chal,read;c.fig.classList.add('young');
 const S={rung:[null,null,null,null],pk:0,pc:0,mk:0,mix:[],party:[],sk:0,sel:null,drag:null,bad:null,note:'',run:0,want:()=>{},Q:null};
 const say=t=>{c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(read)read.textContent=t}};
 const mode=()=>['hot','pair','mix','party','spot','quiz'][A.step];
 const fz=z=>A.narrow?z:z+2;
 function txt(x,t,X,Y,z,k,w){x.font=`${w||800} ${fz(z)}px system-ui,sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillStyle=k;x.fillText(t,X,Y,A.W-12)}
 function box(x,R,k,thick,a){x.fillStyle=A.mix(A.col.pn,k,a==null?.16:a);A.paint.rrect(R.x,R.y,R.w,R.h,14);x.fill();x.lineWidth=thick?4:2;x.strokeStyle=k;x.stroke()}
 function wrapT(x,t,R,z,k){x.font=`800 ${fz(z)}px system-ui,sans-serif`;const L=[];let s='';t.split(' ').forEach(w=>{const n=s?s+' '+w:w;if(s&&x.measureText(n).width>R.w-14){L.push(s);s=w}else s=n});L.push(s);
  L.forEach((l,i)=>txt(x,l,R.x+R.w/2,R.y+R.h/2+(i-(L.length-1)/2)*fz(z)*1.25,z,k))}
 const inR=(p,R)=>R&&p.x>R.x&&p.x<R.x+R.w&&p.y>R.y&&p.y<R.y+R.h;
 /* layout */
 const rungR=i=>{const h=mn(54,A.H*.14),g=8;return{x:A.W*.5,y:A.H*.86-(i+1)*(h+g),w:A.W*.46,h}};
 const hotChip=j=>{const h=mn(54,A.H*.14);return{x:A.W*.04,y:A.H*.16+j*(h+10),w:A.W*.38,h}};
 const binR=b=>{const g=10,w=(A.W-3*g)/2;return{x:g+b*(w+g),y:A.H*.5,w,h:A.H*.46}};
 const cardR=j=>{const w=(A.W-30)/2;return{x:10+j*(w+10),y:A.H*.06,w,h:A.H*.22}};
 const jarR=()=>({x:A.W*.56,y:A.H*.22,w:A.W*.38,h:A.H*.7});
 const mixR=j=>{const h=mn(52,A.H*.13);return{x:A.W*.05,y:A.H*.24+j*(h+9),w:A.W*.44,h}};
 const partyR=j=>{const g=8,w=(A.W-3*g)/2,h=mn(50,A.H*.12);return{x:g+(j%2)*(w+g),y:A.H*.3+Math.floor(j/2)*(h+g),w,h}};
 const bubR=()=>({x:A.W*.18,y:A.H*.36,w:A.W*.64,h:mn(58,A.H*.14)});
 const spotR=j=>{const h=mn(50,A.H*.11);return{x:A.W*.2,y:A.H*.56+j*(h+7),w:A.W*.6,h}};
 const at=R=>S.drag&&S.drag.R===R?{x:S.drag.p.x-R.w/2,y:S.drag.p.y-R.h/2,w:R.w,h:R.h}:R;
 /* pieces: every tappable or draggable thing in the current step */
 function pieces(){const v=mode(),P=[];
  if(v==='hot')HOTSHOW.forEach((w,j)=>{if(!S.rung.includes(w))P.push({id:w,R:hotChip(j),t:HOT[w]})});
  if(v==='pair'&&S.pk<3)PAIR[S.pk][4].forEach((cd,j)=>{if(!(S.pc>>j&1))P.push({id:j,R:cardR(j),t:cd[0]})});
  if(v==='mix')MIX[S.mk][2].forEach((w,j)=>{if(!S.mix.includes(w))P.push({id:w,R:mixR(j),t:w})});
  if(v==='spot'&&S.sk<3)SPOT[S.sk][3].forEach((w,j)=>P.push({id:w,R:spotR(j),t:w}));return P}
 function targets(){const v=mode();if(v==='hot')return[0,1,2,3].map(i=>({id:i,R:rungR(i)}));if(v==='pair')return[0,1].map(b=>({id:b,R:binR(b)}));
  if(v==='mix')return[{id:0,R:jarR()}];if(v==='spot')return[{id:0,R:bubR()}];return[]}
 /* drawing */
 function hotV(x){const C=A.col,top=rungR(3),bot=rungR(0);txt(x,'Feeling thermometer',A.W*.73,A.H*.05,14,C.tx);
  x.fillStyle=A.mix(C.gr,C.rd,.5);const tw=12;x.fillStyle=A.paint.lin(0,bot.y+bot.h,0,top.y,[[0,C.gr],[.5,C.am],[1,C.rd]]);A.paint.rrect(A.W*.47-tw,top.y,tw,bot.y+bot.h-top.y,6);x.fill();
  txt(x,'strong',A.W*.47-tw/2,top.y-12,11,C.rd);txt(x,'mild',A.W*.47-tw/2,bot.y+bot.h+12,11,C.gr);
  [0,1,2,3].forEach(i=>{const R=rungR(i),w=S.rung[i];box(x,R,w==null?C.mu:A.mix(C.gr,C.rd,i/3),w!=null,w==null?.05:.22);txt(x,w==null?'step '+(i+1):HOT[w],R.x+R.w/2,R.y+R.h/2,w==null?12:17,w==null?C.mu:C.tx)});
  pieces().forEach(P=>{const R=at(P.R);box(x,R,C.vi,S.sel===P.id,S.sel===P.id?.3:.14);txt(x,P.t,R.x+R.w/2,R.y+R.h/2,17,C.tx)})}
 function pairV(x){const C=A.col;if(S.pk>=3)return txt(x,'Three pairs, six clues spotted!',A.W/2,A.H/2,16,C.gr);const pr=PAIR[S.pk];
  [0,1].forEach(b=>{const R=binR(b);box(x,R,b?C.cy:C.or,0,.1);txt(x,pr[b],R.x+R.w/2,R.y+R.h*.2,19,C.tx,900);wrapT(x,pr[b+2],{x:R.x,y:R.y+R.h*.35,w:R.w,h:R.h*.3},12,C.mu);
   PAIR[S.pk][4].forEach((cd,j)=>{if(S.pc>>j&1&&cd[1]===b)wrapT(x,'✓ '+cd[0],{x:R.x,y:R.y+R.h*.66,w:R.w,h:R.h*.3},12,C.gr)})});
  txt(x,`Pair ${S.pk+1} of 3`,A.W/2,A.H*.4,12,C.mu,700);
  pieces().forEach(P=>{const R=at(P.R);box(x,R,S.bad===P.id?C.rd:C.vi,S.sel===P.id||S.bad===P.id,.18);wrapT(x,P.t,R,13,C.tx)})}
 function mixV(x){const C=A.col,m=MIX[S.mk],J=jarR(),K=[C.am,C.cy];txt(x,m[0]+' '+m[1],A.W/2,A.H*.08,15,C.tx);
  x.lineWidth=3;x.strokeStyle=C.mu;A.paint.rrect(J.x,J.y,J.w,J.h,18);x.stroke();
  S.mix.forEach((w,i)=>{const h=(J.h-8)/2,y=J.y+J.h-4-(i+1)*h;x.fillStyle=A.alpha(K[i],.55);A.paint.rrect(J.x+4,y,J.w-8,h,12);x.fill();txt(x,w,J.x+J.w/2,y+h/2,16,C.tx,900)});
  if(!S.mix.length)txt(x,'feeling jar',J.x+J.w/2,J.y+J.h/2,12,C.mu,700);
  pieces().forEach(P=>{const R=at(P.R);box(x,R,S.bad===P.id?C.rd:C.vi,S.sel===P.id||S.bad===P.id,.16);txt(x,P.t,R.x+R.w/2,R.y+R.h/2,16,C.tx)});txt(x,`Mix ${S.mk+1} of 2`,A.W/2,A.H*.97,12,C.mu,700)}
 function partyV(x){const C=A.col;txt(x,'🎈',A.W/2,A.H*.08,mn(34,A.H*.08),C.tx);wrapT(x,'Everyone in Mia’s class got a party invite except her.',{x:8,y:A.H*.13,w:A.W-16,h:A.H*.14},14,C.tx);
  PARTY.forEach(([w,f],j)=>{const R=partyR(j),on=S.party.includes(w),k=on?(f===1?C.gr:f===2?C.am:C.rd):C.vi;box(x,R,k,on||S.bad===j,on?.26:.12);txt(x,(on&&f===1?'✓ ':'')+w,R.x+R.w/2,R.y+R.h/2,16,C.tx)});
  txt(x,`Words that fit: ${S.party.filter(w=>PARTY.find(q=>q[0]===w)[1]===1).length} of 4`,A.W/2,A.H*.95,14,C.tx)}
 function spotV(x){const C=A.col;if(S.sk>=3)return txt(x,'Three exact words!',A.W/2,A.H/2,16,C.gr);const s=SPOT[S.sk],B=bubR();
  txt(x,s[0],A.W/2,A.H*.08,mn(34,A.H*.08),C.tx);wrapT(x,s[1],{x:8,y:A.H*.14,w:A.W-16,h:A.H*.18},15,C.tx);
  x.setLineDash([7,6]);box(x,B,C.vi,0,.06);x.setLineDash([]);txt(x,S.note||'I feel …',B.x+B.w/2,B.y+B.h/2,S.note?16:15,S.note?C.gr:C.mu);
  pieces().forEach(P=>{const R=at(P.R);box(x,R,S.bad===P.id?C.rd:C.or,S.sel===P.id||S.bad===P.id,.18);txt(x,P.t,R.x+R.w/2,R.y+R.h/2,16,C.tx)});txt(x,`${S.sk+1} of 3`,A.W/2,A.H*.97,12,C.mu,700)}
 function draw(A){const{ctx:x,W,H,col:C}=A,v=mode();x.fillStyle=A.mix(C.pn,'#fde68a',C.dark?.04:.22);x.fillRect(0,0,W,H);
  const f={hot:hotV,pair:pairV,mix:mixV,party:partyV,spot:spotV}[v];if(f)f(x);else txt(x,S.Q?S.Q.big:'💬',W/2,H/2,mn(W,H)*.22,'#000');A.fx.draw(x)}
 /* actions */
 const blip=t=>{A.sound.miss();report(t)};
 function place(id,t){const v=mode();S.sel=null;
  if(v==='hot'){if(S.rung[t]!=null)return blip('That step is taken. Pick an empty one.');S.rung[t]=id;A.sound.tick();
   if(S.rung.every(w=>w!=null)){if(S.rung.every((w,i)=>w===i))return report('Mild to strong: annoyed, cross, angry, furious.');const pos=S.rung.indexOf(3);S.rung=[null,null,null,null];
    return blip(pos!==3?'Not yet. Furious is the strongest: it goes at the top. Try again.':'Close. Annoyed is the mildest: a little fed up. Try again.')}return report()}
  if(v==='pair'){const cd=PAIR[S.pk][4][id];if(cd[1]!==t){S.bad=id;return blip(`Look again: "${cd[0]}". ${PAIR[S.pk][2+cd[1]]} That is ${PAIR[S.pk][cd[1]].toLowerCase()}.`)}
   S.bad=null;S.pc|=1<<id;A.sound.pop();let m='Yes.';if(S.pc===3){S.pk++;S.pc=0;m=S.pk<3?'Both right. Next pair.':'All three pairs done.'}return report(m)}
  if(v==='mix'){const ok=MIXOK[S.mk];if(!ok.includes(id)){S.bad=id;return blip(MIXNO[id]||'That does not fit this moment.')}S.bad=null;S.mix.push(id);A.sound.pop();
   if(S.mix.length===2){const was=MIX[S.mk][1];if(S.mk<1){setTimeout(()=>{if(mode()==='mix'){S.mk=1;S.mix=[];report()}},A.reduced()?10:900)}return report(`${was}: ${ok[0]} and ${ok[1]}, both at once.`)}return report()}
  if(v==='spot'){const s=SPOT[S.sk];if(id!==s[2]){S.bad=id;return blip(MEAN[id]+' Try another word.')}S.bad=null;S.note='I feel '+id+'!';A.sound.pop();const r=S.run;
   setTimeout(()=>{if(r===S.run&&mode()==='spot'){S.sk++;S.note='';report()}},A.reduced()?10:900);return report(MEAN[id])}}
 function tapWord(j){const[w,f]=PARTY[j];if(S.party.includes(w))return;S.party.push(w);if(f!==1){S.bad=j;return blip(PNO[w])}S.bad=null;A.sound.pop();report(`Yes, ${w} fits.`)}
 function report(msg){const v=mode();let t;
  if(v==='hot')t='Thermometer, mild to strong: '+S.rung.map((w,i)=>`step ${i+1} ${w==null?'empty':HOT[w]}`).join(', ')+'.';
  else if(v==='pair')t=S.pk<3?`Sort: ${PAIR[S.pk][0]} or ${PAIR[S.pk][1]}. Cards left: ${pieces().map(p=>p.t).join('; ')||'none'}.`:'All pairs sorted.';
  else if(v==='mix')t=`${MIX[S.mk][1]}. Jar holds: ${S.mix.join(' and ')||'nothing yet'}.`;
  else if(v==='party')t=`Mia was left out. Words picked: ${S.party.join(', ')||'none'}.`;
  else if(v==='spot')t=S.sk<3?`${SPOT[S.sk][1]} Pick the exact word.`:'All three done.';else t='Challenge time.';
  say((msg?msg+' ':'')+t);sync();S.want()}
 function sync(){if(!A||!pad)return;pad.innerHTML='';const v=mode(),E=c.el;
  const K=(t,f,lab,off)=>{const b=E('button',{type:'button',class:'lbtn ghost','aria-label':lab||null},pad,t);b.disabled=!!off;b.onclick=f};
  if(v==='hot'){const free=[0,1,2,3].find(i=>S.rung[i]==null);pieces().forEach(P=>K(`${P.t} → step ${free+1}`,()=>place(P.id,free),`Put ${P.t} on thermometer step ${free+1}`));K('Clear',()=>{S.rung=[null,null,null,null];report()},'Clear the thermometer')}
  if(v==='pair'&&S.pk<3)pieces().forEach(P=>[0,1].forEach(b=>K(`${P.t} → ${PAIR[S.pk][b]}`,()=>place(P.id,b))));
  if(v==='mix')pieces().forEach(P=>K('Add '+P.t,()=>place(P.id,0),'Add '+P.t+' to the jar'));
  if(v==='party')PARTY.forEach(([w],j)=>K(w,()=>tapWord(j),(S.party.includes(w)?'Picked ':'Pick ')+w,S.party.includes(w)));
  if(v==='spot'&&S.sk<3)pieces().forEach(P=>K('I feel '+P.t,()=>place(P.id,0)));A.redraw()}
 const fin=(st,ok,msg)=>()=>{if(A.step===st&&ok()&&(!steps[st].predict||A.pred[st]!=null))A.done(msg()+A.reveal(st))};
 const later=(fs,gap)=>{const r=S.run;fs.forEach((f,j)=>setTimeout(()=>{if(r===S.run)f()},A.reduced()?j*30:j*gap))};
 const reset=()=>{S.run++;S.want=()=>{};S.Q=null;S.bad=null;S.sel=null;S.drag=null;S.note=''};
 const steps=[
  {h:'How strong?',p:'Some feeling words are the same feeling, at a different strength. Put the four anger words on the thermometer, mild at the bottom.',
   predict:{q:'Annoyed and furious: are they the same?',opts:['Yes, both just mean angry','Same family, but very different strength'],ans:1},task:'Order the words from mild to strong',
   show:()=>{steps[0].go();later([0,1,2,3].map(i=>()=>place(i,i)),450)},go:()=>{reset();S.rung=[null,null,null,null];report();S.want=fin(0,()=>S.rung.every((w,i)=>w===i),()=>'A small word for a small feeling, a big word for a big one. Annoyed is not furious.')}},
  {h:'Close cousins',p:'Some words sound alike but mean different things. Read the clue in each box, then drag each card to the right word.',
   predict:{q:'Can you feel lonely in a busy playground?',opts:['No, lonely means nobody is there','Yes, lonely means wanting someone to be with'],ans:1},task:'Sort all three pairs',
   show:()=>{steps[1].go();const f=[];[0,1,2].forEach(k=>PAIR[k][4].forEach((cd,j)=>f.push(()=>place(j,cd[1]))));later(f,450)},
   go:()=>{reset();S.pk=0;S.pc=0;report();S.want=fin(1,()=>S.pk>=3,()=>'Scared is now, worried is later. Lonely is wanting company, alone is just nobody near. Guilty is doing wrong, embarrassed is being seen.')}},
  {h:'Two at once',p:'A moment can bring two feelings at the same time. Drop the two that fit into the jar.',
   predict:{q:'Can you feel two different feelings at once?',opts:['No, one feeling at a time','Yes, feelings can mix'],ans:1},task:'Fill both jars',
   show:()=>{steps[2].go();later([()=>place('excited',0),()=>place('nervous',0),()=>{},()=>place('happy',0),()=>place('sad',0)],500)},
   go:()=>{reset();S.mk=0;S.mix=[];report();S.want=fin(2,()=>S.mk===1&&S.mix.length===2,()=>'Mixed feelings are normal. Naming both tells people much more than one word.')}},
  {h:'More than sad',p:'Mia was the only one not invited. Tap every word that could fit how she feels.',task:'Find four words that fit',
   show:()=>{steps[3].go();later([0,1,3,5].map(j=>()=>tapWord(j)),450)},
   go:()=>{reset();S.party=[];report();S.want=fin(3,()=>['disappointed','left out','lonely','jealous'].every(w=>S.party.includes(w)),()=>'Disappointed, left out, lonely, jealous: each one says more than sad.')}},
  {h:'The exact word',p:'Drag the word that fits best into the speech bubble.',task:'Finish all three bubbles',
   show:()=>{steps[4].go();later([0,1,2].map(k=>()=>place(SPOT[k][2],0)),1100)},
   go:()=>{reset();S.sk=0;report();S.want=fin(4,()=>S.sk>=3,()=>'Proud is about what you did. Grateful is about what someone did for you. Embarrassed is about being seen.')}},
  {h:'Challenge',p:'',go:()=>{reset();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.want()});
 const QZ=[['Your friend got the bike you wanted.','🚲',[['jealous','ok'],['proud','prd'],['grateful','grt']]],
  ['You fed the cat without being asked, and Dad noticed.','🐱',[['proud','ok'],['guilty','glt'],['embarrassed','emb']]],
  ['You sit alone at lunch and wish someone would talk to you.','🍎',[['lonely','ok'],['grateful','grt'],['proud','prd']]],
  ['Your test results come out next week.','📝',[['worried','ok'],['furious','fur'],['proud','prd']]],
  ['Someone taps your chair, just a little.','🪑',[['annoyed','ok'],['furious','fur'],['grateful','grt']]],
  ['You let your brother take the blame for what you did.','💭',[['guilty','ok'],['proud','prd'],['embarrassed','emb']]]];
 let qn=-1,stars=0;
 function ask(){qn++;const[q,big,ops]=QZ[qn%QZ.length],rot=qn%3;S.Q={big};
  chal.innerHTML=`<p><b>${q}</b> Which word fits best?</p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(tag)});say('Challenge: '+q);A.redraw()}
 function mark(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Yes, that is the exact word!';break;
   case 'prd':m='Proud is for something good YOU did. Is that what happened here?';break;
   case 'grt':m='Grateful is for a kind thing someone did for you. Nobody did that here.';break;
   case 'glt':m='Guilty is for doing something wrong. Feeding the cat was a good thing.';break;
   case 'emb':m='Embarrassed is about others seeing an awkward moment. Think about who did what.';break;
   default:m='Furious is the very strongest anger. Match the size of the word to the size of the feeling.'}
  const ok=tag==='ok';if(ok){stars++;A.win()}else{stars=0;A.sound.miss()}fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Stars: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 /* pointer: drag a card onto a target, or tap a card then tap a target */
 function down(p){const v=mode();if(v==='party'){const j=PARTY.findIndex((q,j)=>inR(p,partyR(j)));if(j>=0)tapWord(j);return false}
  const P=pieces().find(q=>inR(p,q.R));if(P){S.drag={id:P.id,R:P.R,p,p0:p};A.redraw();return true}
  if(S.sel!=null){const T=targets().find(q=>inR(p,q.R));if(T)place(S.sel,T.id)}return false}
 function move(p){if(S.drag){S.drag.p=p;A.redraw()}}
 function up(p){const d=S.drag;if(!d)return;S.drag=null;const T=p&&targets().find(q=>inR(p,q.R));
  if(T&&hy(p.x-d.p0.x,p.y-d.p0.y)>12)return place(d.id,T.id);S.sel=S.sel===d.id?null:d.id;if(S.sel!=null){A.sound.tick();say('Picked '+(pieces().find(q=>q.id===d.id)||{}).t+'. Now tap where it goes.')}A.redraw()}
 A=FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:A=>{chal.hidden=A.step!==5;read.hidden=A.step===5;pad.hidden=A.step===5;sync()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
   A.gest({down,move,up});sync()}});
 A.start()})})();
