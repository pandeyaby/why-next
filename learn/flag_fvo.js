/* Flagship – fact vs opinion (ages 10–11): swipe each statement to "can be checked" or "a view"; tap the judgement word that
   turns a sentence into an opinion (numbers do not make a fact); colour the fact part and the opinion part of mixed
   sentences; tag the trick when an advert dresses an opinion up as a fact; then highlight a whole news report. */
(()=>{const lo=Math.min,hi=Math.max;
 const DECK=[['A blue whale can grow to about 30 metres long.',0,'You can check it in an encyclopedia or measure a whale. That makes it a fact.'],
  ['Whales are the most amazing animals.',1,'"Most amazing" is a judgement. Someone else may love tigers more. Nobody can prove it.'],
  ['Sharks were on Earth before there were trees.',0,'It sounds surprising, but fossils let scientists check it. Surprising is not the same as opinion.'],
  ['Homework is a waste of time.',1,'No test could prove this. Some people agree and some do not: that makes it a view.'],
  ['Water boils at 100 °C at sea level.',0,'Heat water and use a thermometer: you can check it. It is a fact.'],
  ['Summer is the best season.',1,'"Best" is a judgement. People who love snow would disagree.']];
 const CLUE=[{w:['The','film','lasts','two','hours','and','is','brilliant.'],ok:[7]},{w:['London','should','have','more','parks.'],ok:[1]},
  {w:['The','top','five','goals','were','all','spectacular.'],ok:[6]},{w:['The','delicious','cake','has','three','layers.'],ok:[1]}];
 const NUM=/^(two|three|five|\d)/i;
 const MIX=[[['The River Thames is 346 km long',0],['and it is the loveliest river in England.',1]],
  [['Our school has 400 pupils,',0],['so it is far too crowded.',1]],
  [['Sadly,',1],['the match was called off because of heavy rain.',0]]];
 const TRICK=[['🏷️ Calls it a "fact"','label'],['👥 "Everyone knows"','crowd'],['💯 Sure-sounding word','sure']];
 const AD=[['It is a fact that CrunchO is the tastiest cereal.','label'],['Everyone knows CrunchO is the best start to the day.','crowd'],['Clearly, no other cereal comes close.','sure']];
 const TWHY={label:'Saying "it is a fact" does not make it one. Tastiest is still a judgement.',crowd:'"Everyone knows" pretends the whole world agrees. It is still one view.',sure:'Clearly, obviously and definitely sound certain, but nothing has been checked.'};
 const NEWS=[['On Saturday, 300 people ran in the Millbrook Fun Run.',0],['The weather was perfect for running.',1],['The winner, Amy Cole, finished in 21 minutes.',0],
  ['She is the most inspiring athlete in the town.',1],['The run raised £4,500 for the new library.',0],['The council should hold a race every month.',1]];
 const PEN=[['🔵 Fact','Fact'],['🟠 Opinion','Opinion']];
VIS.reg('flagfvo',c=>{let A,pad,chal,read;
 const S={i:0,ri:0,got:{},bad:-1,pen:-1,drag:null,dx:0,msg:'',gen:0,hook:()=>{}};
 const kind=()=>['deck','clue','mix','ad','news','quiz'][A.step];
 const px=v=>v*A.W,py=v=>v*A.H,fs=z=>A.narrow?z:z+2;
 function lines(g,s,w){const out=[];let row='';s.split(' ').forEach(t=>{const tt=row?row+' '+t:t;if(row&&g.measureText(tt).width>w){out.push(row);row=t}else row=tt});out.push(row);return out}
 function para(g,s,x,y,w,size,col,wt,al){g.font=`${wt||700} ${fs(size)}px system-ui,sans-serif`;g.fillStyle=col;g.textAlign=al||'center';g.textBaseline='middle';const L=lines(g,s,w),lh=fs(size)*1.3;
  L.forEach((r,j)=>g.fillText(r,x,y+(j-(L.length-1)/2)*lh));return L.length*lh}
 const box=(g,r,col,f,w)=>{g.fillStyle=A.alpha(col,f);A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.lineWidth=w||2;g.strokeStyle=col;g.stroke()};
 const inR=(p,r)=>r&&p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
 const say=t=>{S.msg=t;c.say(t);A.cv.setAttribute('aria-label',t);if(read)read.textContent=t};
 // ---- layout ----
 const binR=j=>({x:j?px(.62):px(.02),y:py(.6),w:px(.36),h:py(.36)});
 const cardR=()=>({x:px(.2)+S.dx,y:py(.14),w:px(.6),h:py(.38)});
 function wordRects(g){const R=CLUE[S.ri];if(!R)return[];g.font=`800 ${fs(17)}px system-ui,sans-serif`;const out=[];let x=px(.04),y=py(.32),h=fs(17)+22;
  R.w.forEach(w=>{const wd=g.measureText(w).width+18;if(x+wd>px(.96)){x=px(.04);y+=h+10}out.push({x,y,w:wd,h});x+=wd+8});return out}
 function rowRects(list,top,bot){const n=list.length,gap=6,h=(py(bot)-py(top)-gap*(n-1))/n;return list.map((_,j)=>({x:px(.03),y:py(top)+j*(h+gap),w:px(.94),h}))}
 const penR=j=>({x:j?px(.52):px(.06),y:py(.86),w:px(.42),h:py(.11)});
 const trickR=j=>{const w=(A.W-px(.08))/3;return{x:px(.02)+j*(w+px(.02)),y:py(.8),w,h:py(.17)}};
 const parts=()=>kind()==='mix'?(MIX[S.ri]||[]):kind()==='news'?NEWS:[];
 // ---- painters ----
 function deck(g){const C=A.col;['🔎 Fact: can be checked','💭 Opinion: a view'].forEach((t,j)=>{const r=binR(j);box(g,r,j?C.am:C.cy,S.bad===j?.3:.12,S.bad===j?4:2);para(g,t,r.x+r.w/2,r.y+r.h*.3,r.w-10,14,C.tx,800);
   const n=DECK.filter((d,k)=>S.got[k]&&d[1]===j).length;para(g,'✓ '.repeat(n)||'·',r.x+r.w/2,r.y+r.h*.7,r.w-10,15,C.gr,800)});
  const d=DECK[S.i];if(!d)return para(g,'✓ All six sorted. Facts can be checked; opinions are views.',A.W/2,py(.3),A.W-30,15,C.gr,800);
  const r=cardR();A.paint.shadow(10,3,.2);box(g,r,C.vi,.14,3);A.paint.noShadow();g.fillStyle=A.mix(C.pn,C.vi,.08);A.paint.rrect(r.x+3,r.y+3,r.w-6,r.h-6,9);g.fill();
  para(g,d[0],r.x+r.w/2,r.y+r.h/2,r.w-20,15,C.tx,800);para(g,'⬅ swipe or drag ➡',A.W/2,py(.56),A.W,11,C.mu,600)}
 function clue(g){const C=A.col,R=CLUE[S.ri];if(!R)return para(g,'✓ Found every opinion word.',A.W/2,py(.4),A.W-30,16,C.gr,800);
  para(g,'Tap the word that makes this an opinion.',A.W/2,py(.1),A.W-20,14,C.tx,800);
  wordRects(g).forEach((r,j)=>{const hit=S.got[j],bad=S.bad===j;box(g,r,hit?C.or:bad?C.rd:C.ln,hit?.35:bad?.2:.06,hit||bad?3:1.5);para(g,R.w[j],r.x+r.w/2,r.y+r.h/2,r.w,17,C.tx,800)})}
 function rows(g){const C=A.col,P=parts(),k=kind(),RR=k==='mix'?rowRects(P,.16,.62):rowRects(P,.02,.82);
  if(k==='mix'&&!P.length)return para(g,'✓ Every mixed sentence split.',A.W/2,py(.4),A.W-30,16,C.gr,800);
  if(k==='mix')para(g,'One sentence, two parts. Colour each part.',A.W/2,py(.07),A.W-20,14,C.tx,800);
  P.forEach((q,j)=>{const r=RR[j],v=S.got[j],col=v==null?C.ln:v?C.am:C.cy;box(g,r,S.bad===j?C.rd:col,v==null?.05:.3,S.bad===j||v!=null?3:1.5);
   para(g,q[0],r.x+r.w/2,r.y+r.h/2,r.w-16,k==='news'?12:15,C.tx,700)});
  PEN.forEach((p,j)=>{const r=penR(j),on=S.pen===j,col=j?C.am:C.cy;box(g,r,col,on?.45:.15,on?4:2);para(g,p[0]+(on?' ✎':''),r.x+r.w/2,r.y+r.h/2,r.w,14,C.tx,800)});
  if(S.drag&&S.drag.pen!=null){const col=S.drag.pen?C.am:C.cy;A.paint.ball(S.drag.x,S.drag.y,14,col)}}
 function ad(g){const C=A.col;para(g,'📺 CrunchO advert',A.W/2,py(.06),A.W,14,C.tx,800);const RR=rowRects(AD,.13,.72);
  AD.forEach((q,j)=>{const r=RR[j],v=S.got[j];box(g,r,S.bad===j?C.rd:v?C.gr:C.vi,v?.25:.08,v||S.bad===j?3:1.5);para(g,(v?TRICK.find(t=>t[1]===q[1])[0].split(' ')[0]+' ':'')+q[0],r.x+r.w/2,r.y+r.h/2,r.w-16,14,C.tx,700)});
  TRICK.forEach((t,j)=>{let r=trickR(j);if(S.drag&&S.drag.t===j)r={...r,x:S.drag.x-r.w/2,y:S.drag.y-r.h/2};box(g,r,C.am,S.pen===j?.45:.18,S.pen===j?4:2);para(g,t[0],r.x+r.w/2,r.y+r.h/2,r.w-8,12,C.tx,800)})}
 function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,C.cy,C.dark?.04:.07);g.fillRect(0,0,W,H);
  if(k==='quiz'){para(g,S.Q||'🔎 💭',W/2,H/2,W-30,S.Q?16:44,C.tx,800);return A.fx.draw(g)}
  ({deck,clue,mix:rows,news:rows,ad})[k](g);A.fx.draw(g)}
 // ---- actions ----
 function sortCard(j){const d=DECK[S.i];if(!d)return;S.dx=0;if(d[1]!==j){S.bad=j;A.sound.miss();say(d[2]+' Try the other box.');return A.redraw()}
  S.bad=-1;S.got[S.i]=1;S.i++;A.sound.pop();say((d[1]?'Opinion. ':'Fact. ')+d[2]+(DECK[S.i]?' Next: '+DECK[S.i][0]:''));pads()}
 function tapWord(j){const R=CLUE[S.ri];if(!R)return;const w=R.w[j];if(!R.ok.includes(j)){S.bad=j;A.sound.miss();
   say(NUM.test(w)?`"${w}" is a number. Numbers can be checked, so they belong to facts. Find the word that judges.`:`"${w}" can be checked. Look for a word that shows what someone thinks or feels.`);return A.redraw()}
  S.got[j]=1;S.bad=-1;A.sound.pop();const was=R.w.join(' ');S.ri++;S.got={};say(`Yes: "${w.replace('.','')}" is a judgement, so "${was}" is an opinion.`+(CLUE[S.ri]?' Next sentence.':''));pads()}
 function colour(j,pen){const P=parts();if(!P[j]||pen<0)return say('Pick a pen first: Fact or Opinion.');const want=P[j][1];
  if(pen!==want){S.bad=j;A.sound.miss();say(pen?`"${P[j][0]}" can be checked. Use the Fact pen.`:`"${P[j][0]}" is a judgement nobody can prove. Use the Opinion pen.`);return A.redraw()}
  S.bad=-1;S.got[j]=pen;A.sound.pop();const all=P.every((_,k)=>S.got[k]!=null);
  if(kind()==='mix'&&all){S.ri++;S.got={};say('Both parts done: a fact and an opinion in one sentence.'+(MIX[S.ri]?' Next one.':''))}
  else say(`${pen?'Opinion':'Fact'}: "${P[j][0]}"`+(all?' The whole report is coloured.':''));pads()}
 function tag(line,t){const want=AD[line][1];if(TRICK[t][1]!==want){S.bad=line;A.sound.miss();say(`That line does not use "${TRICK[t][0].slice(3)}". Read it again: ${TWHY[want].split('.')[0]}?`);return A.redraw()}
  S.bad=-1;S.got[line]=1;S.pen=-1;A.sound.pop();say(TWHY[want]);pads()}
 // ---- buttons ----
 function pads(){if(!A||!pad)return;pad.innerHTML='';const k=kind(),b=(t,f,lb)=>{c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':lb||null},pad,t).onclick=f};
  if(k==='deck'&&DECK[S.i]){b('🔎 Fact',()=>sortCard(0),'Put in Fact: can be checked');b('💭 Opinion',()=>sortCard(1),'Put in Opinion: a view')}
  if(k==='clue'&&CLUE[S.ri])CLUE[S.ri].w.forEach((w,j)=>b(w,()=>tapWord(j),'Word: '+w));
  if((k==='mix'&&MIX[S.ri])||k==='news'){PEN.forEach((p,j)=>b(p[0]+(S.pen===j?' ✓':''),()=>{S.pen=j;say(p[1]+' pen ready. Tap a part.');pads()},p[1]+' pen'));
   parts().forEach((q,j)=>{if(S.got[j]==null)b('✎ '+q[0].slice(0,26)+(q[0].length>26?'…':''),()=>colour(j,S.pen),'Colour: '+q[0])})}
  if(k==='ad'){if(S.pen<0)TRICK.forEach((t,j)=>b(t[0],()=>{S.pen=j;say(t[0].slice(3)+' picked. Now pick the line it matches.');pads()}));
   else{AD.forEach((q,j)=>{if(!S.got[j])b('➡️ Line '+(j+1),()=>tag(j,S.pen),'Tag line '+(j+1)+': '+q[0])});b('↩ Pick again',()=>{S.pen=-1;pads()})}}
  A.redraw();S.hook()}
 const when=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
 const play=(fs2,ms)=>{const g=++S.gen;fs2.forEach((f,j)=>setTimeout(()=>{if(g===S.gen)f()},j*ms))};
 const reset=()=>{S.gen++;S.hook=()=>{};Object.assign(S,{i:0,ri:0,got:{},bad:-1,pen:-1,drag:null,dx:0})};
 const n=o=>Object.keys(o).length;
 const steps=[
  {h:'Can it be checked?',p:'A fact can be checked: measure it, count it or look it up. An opinion is what someone thinks or feels. Nobody can prove it.',
   task:'Swipe all six cards into the right box',show:()=>{steps[0].go();play(DECK.map(d=>()=>sortCard(d[1])),420)},
   go:()=>{reset();say('Swipe left for fact, right for opinion. First: '+DECK[0][0]);S.hook=when(0,()=>S.i>=DECK.length,'Facts can be checked. Opinions are views.')}},
  {h:'Judging words',p:'Words like best, brilliant, should and delicious judge. One judging word turns a sentence into an opinion, even if it has a number in it.',
   predict:{q:'"The top five goals were all spectacular." It has a number. Fact or opinion?',opts:['Fact: it has a number','Opinion: "spectacular" judges'],ans:1},
   task:'Find the opinion word in all four sentences',show:()=>{steps[1].go();play(CLUE.map(R=>()=>tapWord(R.ok[0])),450)},
   go:()=>{reset();say('Tap the judging word in: '+CLUE[0].w.join(' '));S.hook=when(1,()=>S.ri>=CLUE.length,'Judging words mark an opinion. Numbers alone do not make a fact.')}},
  {h:'Mixed sentences',p:'Writers often join a fact and an opinion in one sentence. Split it: colour the part you can check blue and the view orange.',
   predict:{q:'"Our school has 400 pupils, so it is far too crowded." What is it?',opts:['A fact: it has a number','A fact and an opinion joined'],ans:1},
   task:'Colour both parts of all three sentences',show:()=>{steps[2].go();play(MIX.flatMap(m=>m.map((q,j)=>()=>colour(j,q[1]))),380)},
   go:()=>{reset();say('Pick a pen, then tap each part of: '+MIX[0].map(q=>q[0]).join(' '));S.hook=when(2,()=>S.ri>=MIX.length,'One sentence can hold both. Check each part on its own.')}},
  {h:'Opinion in disguise',p:'Adverts dress opinions up as facts. Drag a trick label onto the line that uses it.',
   task:'Tag all three tricks',show:()=>{steps[3].go();play(AD.map((q,j)=>()=>tag(j,TRICK.findIndex(t=>t[1]===q[1]))),450)},
   go:()=>{reset();say('Three advert lines. Each one is an opinion pretending to be a fact.');S.hook=when(3,()=>n(S.got)>=3,'Calling it a fact, claiming everyone agrees, or sounding sure does not make it checkable.')}},
  {h:'Read like a detective',p:'News reports mix facts with the writer\u2019s views. Colour every sentence. Ask: could I check this?',
   task:'Colour all six sentences',show:()=>{steps[4].go();play(NEWS.map((q,j)=>()=>colour(j,q[1])),380)},
   go:()=>{reset();say('Colour each sentence of the Fun Run report.');S.hook=when(4,()=>n(S.got)>=NEWS.length,'Three facts you could check, three views you could argue with.')}},
  {h:'Challenge',p:'',go:()=>{reset();ask()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>S.hook()});
 const QS=[['"Mount Everest is 8,849 metres tall." Fact or opinion?',[['Fact','ok'],['Opinion','big']]],
  ['"Maths is the hardest subject." Fact or opinion?',[['Opinion','ok'],['Fact','feel']]],
  ['"Everyone agrees our pizza is the best." What is it?',[['An opinion dressed as a fact','ok'],['A fact, because everyone agrees','crowd']]],
  ['"The 3 best days of the year are in summer." Fact or opinion?',[['Opinion','ok'],['Fact','num']]],
  ['"Bats are mammals." Fact or opinion?',[['Fact','ok'],['Opinion','odd']]],
  ['"The library opens at 9 and is the nicest place in town." What is it?',[['A fact and an opinion','ok'],['Just a fact','half'],['Just an opinion','halfo']]]];
 let qi=-1,run=0;
 function ask(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%ops.length,o=ops.slice(r).concat(ops.slice(0,r));S.Q=q;
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');o.forEach(([t,tg])=>{c.el('button',{type:'button',class:'lbtn'},row,t).onclick=()=>judge(tg)});say('Challenge: '+q);A.redraw()}
 function judge(tg){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tg){case 'ok':m='Yes. You asked: could I check it?';break;
   case 'big':m='It is a big number, but surveyors measured it. You can check it, so it is a fact.';break;
   case 'feel':m='Hardest for whom? Lots of people find maths easy. It is a view, not a fact.';break;
   case 'crowd':m='"Everyone agrees" is a trick. Even if many people agree, "best" is still a judgement.';break;
   case 'num':m='The number does not save it. "Best" judges, so it is an opinion.';break;
   case 'odd':m='It may sound odd, but bats feed their babies milk. Biologists check that, so it is a fact.';break;
   case 'half':m='"Opens at 9" is a fact, but "nicest place" is a view. It is both.';break;
   default:m='"Nicest place" is a view, but "opens at 9" can be checked. It is both.'}
  const ok=tg==='ok';if(ok){run++;A.win()}else{run=0;A.sound.miss()}A.cv.setAttribute('aria-label',(ok?'Correct. ':'Not quite. ')+m);
  fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 // ---- pointer ----
 function down(p){const k=kind();S.drag=null;
  if(k==='deck'&&DECK[S.i]&&inR(p,cardR())){S.drag={x0:p.x};return true}
  if(k==='clue'){const j=wordRects(A.ctx).findIndex(r=>inR(p,r));if(j>=0)tapWord(j);return false}
  if(k==='mix'||k==='news'){const pj=[0,1].find(j=>inR(p,penR(j)));if(pj!=null){S.pen=pj;S.drag={pen:pj,x:p.x,y:p.y,x0:p.x,y0:p.y};pads();return true}
   const RR=k==='mix'?rowRects(parts(),.16,.62):rowRects(parts(),.02,.82),j=RR.findIndex(r=>inR(p,r));if(j>=0)colour(j,S.pen);return false}
  if(k==='ad'){const t=[0,1,2].find(j=>inR(p,trickR(j)));if(t!=null){S.pen=t;S.drag={t,x:p.x,y:p.y};pads();return true}
   const j=rowRects(AD,.13,.72).findIndex(r=>inR(p,r));if(j>=0&&S.pen>=0)tag(j,S.pen);return false}return false}
 function move(p){const d=S.drag;if(!d)return;if(d.x0!=null&&d.pen==null&&d.t==null){S.dx=p.x-d.x0}else{d.x=p.x;d.y=p.y}A.redraw()}
 function up(p){const d=S.drag,k=kind();S.drag=null;if(!d)return;
  if(k==='deck'){const dx=S.dx;S.dx=0;if(Math.abs(dx)>A.W*.12)sortCard(dx>0?1:0);else A.redraw();return}
  if(d.pen!=null){if(Math.hypot(p.x-d.x0,p.y-d.y0)<12)return A.redraw();const RR=k==='mix'?rowRects(parts(),.16,.62):rowRects(parts(),.02,.82),j=RR.findIndex(r=>inR(p,r));if(j>=0)colour(j,d.pen);else A.redraw();return}
  if(d.t!=null){const j=rowRects(AD,.13,.72).findIndex(r=>inR(p,r));if(j>=0)tag(j,d.t);else A.redraw()}}
 A=FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:A=>{const q=A.step===5;chal.hidden=!q;read.hidden=q;pad.hidden=q;pads()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},bx);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Fact or opinion controls'},bx);chal=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});pads()}});
 A.start()})})();
