/* Flagship – simple stories with a beginning, middle and ending (ages 5–7): put picture-sentence cards in order so the
   story makes sense, choose time words (First, Then, Finally) for the right places, swap mixed-up sentences back, pick an
   ending that finishes what happened (a result or a feeling), and build a story whose ending matches its middle.
   Challenge on the usual slips: order does not matter, any time word anywhere, stopping with no ending, an ending that
   starts something new or has nothing to do with the middle. */
(()=>{
const TALES=[[['🌱','First, I planted a seed.'],['💧','Then I watered it every day.'],['🌻','Finally, a big sunflower grew. I felt proud.']],
 [['🍦','First, Mum bought me an ice cream.'],['🐕','Then a dog jumped up and knocked it over.'],['😢','Finally, Mum shared hers and I felt better.']],
 [['🎒','First, Sam packed his bag for the beach.'],['🏖️','Then he built a big sandcastle.'],['🌊','Finally, a wave washed it away and he laughed.']]];
const BARE=[['🎒','Sam packed his bag for the beach.'],['🏖️','he built a big sandcastle.'],['🌊','a wave washed it away and he laughed.']];
const BARE2=[['🌱','I planted a seed.'],['💧','I watered it every day.'],['🌻','a big sunflower grew.']];
const WORDS=['First,','Then','Finally,'],MIX=[[2,1,0],[1,0,2],[0,2,1]];
const ENDS=[[[['🐱','First, Tom saw a cat stuck in a tree.'],['🪜','Then Dad got a ladder.']],[['Finally, Dad lifted the cat down. Tom felt happy.','ok'],['First, Tom went to school.','restart'],['The sky is blue.','offtopic']]],
 [[['🎂','First, it was Mia\'s birthday.'],['🎁','Then she opened a big box.']],[['Finally, she found a puppy inside and hugged it.','ok'],['Then she opened it.','repeat'],['Cats like milk.','offtopic']]],
 [[['⚽','First, we played football in the park.'],['🪟','Then the ball smashed a window.']],[['Finally, we said sorry and helped clean up.','ok'],['First, we got a ball.','restart'],['Then we played more.','noend']]]];
const OPEN=['🏞️ First, I went to the park.','🏊 First, I went to the pool.'],MID=['🤕 Then I fell over and hurt my knee.','🐶 Then I found a lost puppy.'];
const FIN=['🩹 Finally, Dad put on a plaster and I felt better.','🏠 Finally, we took the puppy back to its owner. I felt kind.','🏆 Finally, I won a gold cup.'];
VIS.reg('flagtale',c=>{let A,pad,quiz,qn=-1,good=0;c.fig.classList.add('young');
const T={tok:0,want:()=>{},s:0,slot:[-1,-1,-1],bad:-1,fill:[],order:[0,1,2],sel:-1,mine:[-1,-1,-1],made:[],won:0,hold:null};
const part=()=>['order','words','swap','ending','build','quiz'][A.step];
const read=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const sz=n=>Math.round(n*(A.narrow?1:1.15));
function wrap(g,s,x,y,w,n,col,wt){g.font=`${wt||600} ${sz(n)}px system-ui,sans-serif`;g.textAlign='left';g.textBaseline='middle';g.fillStyle=col||A.col.tx;
 const lines=[];let cur='';s.split(' ').forEach(w0=>{const t=cur?cur+' '+w0:w0;if(g.measureText(t).width>w&&cur){lines.push(cur);cur=w0}else cur=t});lines.push(cur);
 const lh=sz(n)*1.25;lines.forEach((l,i)=>g.fillText(l,x,y+(i-(lines.length-1)/2)*lh))}
function mid(g,s,x,y,n,wt){g.font=`${wt||700} ${sz(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=A.col.tx;g.fillText(s,x,y,A.W-12)}
function plate(g,x,y,w,h,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(x,y,w,h,12);g.fill();g.lineWidth=lw||2;g.strokeStyle=edge;A.paint.rrect(x,y,w,h,12);g.stroke()}
const inbox=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
const row=(i,top,h)=>({x:6,y:A.H*(top+i*h),w:A.W-12,h:A.H*h-6});
const chip=i=>({x:A.W*(.06+i*.31),y:A.H*.02,w:A.W*.26,h:A.H*.15});
const tale=()=>TALES[Math.min(T.s,part()==='order'?1:2)];
function line(g,r,em,text,tag,col,edge){const C=A.col;plate(g,r.x,r.y,r.w,r.h,A.alpha(col||C.cy,.12),edge||C.tx,edge&&edge!==C.tx?4:2);
 if(tag){mid(g,tag,r.x+28,r.y+r.h/2,10,800)}mid(g,em,r.x+(tag?72:30),r.y+r.h/2,22);wrap(g,text,r.x+(tag?96:56),r.y+r.h/2,r.w-(tag?104:64),14)}
const TAGS=['Begin','Middle','End'];
function paint(A){const{ctx:g,W,H,col:C}=A,v=part();g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.05:.4);g.fillRect(0,0,W,H);
 if(v==='quiz'){mid(g,'Beginning → Middle → End',W/2,H*.36,17,800);mid(g,'First · Then · Finally',W/2,H*.56,15,700);return}
 if(v==='order'){const t=tale();t.forEach((cd,i)=>{if(T.slot.includes(i)||(T.hold&&T.hold.i===i))return;const r=chip(i);plate(g,r.x,r.y,r.w,r.h,A.alpha(C.or,.16),C.tx);mid(g,cd[0],r.x+r.w/2,r.y+r.h/2,30)});
  [0,1,2].forEach(k=>{const r=row(k,.2,.24),j=T.slot[k];if(j<0){plate(g,r.x,r.y,r.w,r.h,A.alpha(C.tx,.04),C.tx);mid(g,TAGS[k]+': drop a card here',W/2,r.y+r.h/2,12,600)}else line(g,r,t[j][0],t[j][1],TAGS[k],C.cy,T.bad===k?C.rd:null)});
  if(T.hold)mid(g,t[T.hold.i][0],T.hold.x,T.hold.y,32);mid(g,'Story '+(T.s+1)+' of 2',W/2,H*.95,11,600)}
 if(v==='words'){const b=T.s?BARE2:BARE;b.forEach((cd,k)=>{const r=row(k,.03,.24),w=T.fill[k];line(g,r,cd[0],(w||'____')+' '+cd[1],null,k===T.fill.length?C.or:C.cy,T.bad===k?C.rd:null)});
  WORDS.forEach((w,i)=>{const bw=(W-30)/3,x=6+i*(bw+9);plate(g,x,H*.76,bw,H*.18,A.alpha(C.gr,.18),C.tx);mid(g,w.replace(',',''),x+bw/2,H*.85,16,800)});mid(g,'Story '+(T.s+1)+' of 2',W/2,H*.97,10,600)}
 if(v==='swap'){const t=tale();T.order.forEach((j,k)=>line(g,row(k,.04,.26),t[j][0],t[j][1],null,T.sel===k?C.or:C.cy,T.sel===k?C.or:null));mid(g,'Tap two cards to swap them · '+T.won+' of 3',W/2,H*.88,12,600)}
 if(v==='ending'){const[st]=ENDS[Math.min(T.s,2)];st.forEach((cd,k)=>line(g,row(k,.03,.2),cd[0],cd[1],TAGS[k],C.cy));const r=row(2,.03,.2);plate(g,r.x,r.y,r.w,r.h,A.alpha(C.or,.12),T.bad>=0?C.rd:C.tx,T.bad>=0?4:2);mid(g,'End: which sentence finishes it?',W/2,r.y+r.h/2,13,800);mid(g,'Story '+Math.min(T.s+1,3)+' of 3 · choose below',W/2,H*.7,11,600)}
 if(v==='build'){const L=[OPEN,MID,FIN];[0,1,2].forEach(k=>{const r=row(k,.03,.24),j=T.mine[k];if(j<0){plate(g,r.x,r.y,r.w,r.h,A.alpha(C.tx,.04),T.bad===k?C.rd:C.tx,T.bad===k?4:2);mid(g,'Tap to choose the '+['beginning','middle','end'][k],W/2,r.y+r.h/2,12,600)}else{const s=L[k][j],sp=s.indexOf(' ');line(g,r,s.slice(0,sp),s.slice(sp+1),TAGS[k],C.vi,T.bad===k?C.rd:null)}});
  mid(g,'Stories that make sense: '+T.made.length+' of 2',W/2,H*.8,12,700)}
 A.fx.draw(g)}
const no=t=>{A.sound.miss();read(t);A.redraw()},yes=t=>{A.sound.pop();read(t);pads();A.redraw();T.want()};
function drop(i,k){T.hold=null;if(T.s>=2)return A.redraw();if(k==null)k=T.slot.indexOf(-1);if(k<0||T.slot[k]>=0||T.slot.includes(i))return A.redraw();T.slot[k]=i;T.bad=-1;A.sound.tick();read(tale()[i][1]);
 if(T.slot.includes(-1)){pads();return A.redraw()}const wrongAt=T.slot.findIndex((j,q)=>j!==q);if(wrongAt<0){const s=T.s;T.s++;if(T.s<2)T.slot=[-1,-1,-1];return yes(`It makes sense: ${TALES[s].map(x=>x[1]).join(' ')}`)}
 T.bad=wrongAt;const j=T.slot[wrongAt];no(j===2&&wrongAt===0?'That card is how it ends. A story begins with who and what is going on.':j===0?'That card starts the story. Nothing can happen before it.':'Read it in order. Does each part happen after the one before?')}
function back(k){if(T.slot[k]<0)return;T.slot[k]=-1;T.bad=-1;A.sound.tick();read('Card taken back.');pads();A.redraw()}
function word(i){const k=T.fill.length;if(T.s>=2||k>2)return;const need=k===0?0:k===1?1:2;
 if(i!==need){T.bad=k;return no(i===2?'Finally tells the reader the story is ending. Save it for the last sentence.':i===0?'First is for the very start. This sentence comes later.':k===0?'Then means after something else. The first sentence needs First.':'This is the last sentence. Use Finally to show the story is ending.')}
 T.bad=-1;T.fill.push(WORDS[i]);A.sound.tick();if(T.fill.length<3){read(WORDS[i]+' fits.');pads();return A.redraw()}const s=T.s;T.s++;const msg='First, then, finally: the reader knows the order.';T.fill=[];if(s===0)read(msg);yes(msg)}
function pick(k){if(T.won>=3)return;if(T.sel<0){T.sel=k;A.sound.tick();read('Now tap the card to swap with.');pads();return A.redraw()}const a=T.sel;T.sel=-1;if(a===k){pads();return A.redraw()}
 [T.order[a],T.order[k]]=[T.order[k],T.order[a]];A.sound.tick();if(T.order.every((j,q)=>j===q)){T.won++;const s=T.won;if(s<3){T.s=s;T.order=MIX[s].slice()}return yes('Now it makes sense: beginning, middle, end.')}
 const t=tale();read(T.order[0]!==0?`It still starts with “${t[T.order[0]][1]}”. What happens first?`:'The start is right now. Swap the other two.');pads();A.redraw()}
function end(i){if(T.s>=3)return;const tag=ENDS[T.s][1][i][1];
 if(tag!=='ok'){T.bad=i;return no(tag==='restart'?'That starts a new story. An ending finishes what already happened.':tag==='offtopic'?'That has nothing to do with the story. The ending tells what happened next and how they felt.':tag==='repeat'?'That says the middle again. The ending tells what she found.':'The story keeps going. An ending tells how it finishes.')}
 T.bad=-1;T.s++;yes('Yes! That ending finishes the story.')}
function cycle(k){const L=[OPEN,MID,FIN][k];T.mine[k]=(T.mine[k]+1)%L.length;T.bad=-1;A.sound.tick();read(L[T.mine[k]].replace(/^\S+ /,''));pads();A.redraw()}
function choose(k,j){T.mine[k]=j;T.bad=-1;A.sound.tick();read([OPEN,MID,FIN][k][j].replace(/^\S+ /,''));pads();A.redraw()}
function tell(){if(T.made.length>=2)return;const[b,m,f]=T.mine;if(b<0||m<0||f<0){T.bad=T.mine.indexOf(-1);return no('Choose a beginning, a middle and an end.')}
 if(f===2){T.bad=2;return no('Winning a cup has nothing to do with the middle. The ending must finish what happened in the middle.')}
 if(f!==m){T.bad=2;return no(m===0?'Your middle is about a hurt knee. The ending should tell how the knee got better.':'Your middle is about a lost puppy. The ending should tell what happened to the puppy.')}
 if(T.made.includes(m)){T.bad=1;return no('You made that story already. Pick the other middle and a new ending.')}T.made.push(m);T.bad=-1;const n=T.made.length;
 yes(n<2?'That makes sense! Now make a story with the other middle.':'Two stories, each with an ending that fits.')}
function pads(){if(!pad)return;pad.innerHTML='';const v=part(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=fn};
 if(v==='order'&&T.s<2){tale().forEach((cd,i)=>{if(!T.slot.includes(i))B(cd[0]+' '+cd[1],()=>drop(i),'Put next: '+cd[1])});T.slot.forEach((j,k)=>{if(j>=0)B('↩ '+TAGS[k],()=>back(k),'Take back the '+TAGS[k]+' card')})}
 if(v==='words'&&T.s<2)WORDS.forEach((w,i)=>B(w.replace(',',''),()=>word(i)));
 if(v==='swap'&&T.won<3)T.order.forEach((j,k)=>B((T.sel===k?'✓ ':'')+tale()[j][0]+' Card '+(k+1),()=>pick(k),'Swap card '+(k+1)+': '+tale()[j][1]));
 if(v==='ending'&&T.s<3)ENDS[T.s][1].forEach((o,i)=>B(o[0],()=>end(i)));
 if(v==='build'&&T.made.length<2){[OPEN,MID,FIN].forEach((L,k)=>L.forEach((s,j)=>B((T.mine[k]===j?'✓ ':'')+s,()=>choose(k,j))));B('📖 Read my story',tell,'Check my story')}}
function down(p){const v=part();
 if(v==='order'){for(let i=0;i<3;i++)if(!T.slot.includes(i)&&inbox(p,chip(i))){T.hold={i,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}for(let k=0;k<3;k++)if(T.slot[k]>=0&&inbox(p,row(k,.2,.24)))back(k);return false}
 if(v==='words'){for(let i=0;i<3;i++){const bw=(A.W-30)/3;if(inbox(p,{x:6+i*(bw+9),y:A.H*.76,w:bw,h:A.H*.18}))word(i)}return false}
 if(v==='swap'){for(let k=0;k<3;k++)if(inbox(p,row(k,.04,.26)))pick(k);return false}
 if(v==='build'){for(let k=0;k<3;k++)if(inbox(p,row(k,.03,.24)))cycle(k)}return false}
function move(p){if(T.hold){T.hold.x=p.x;T.hold.y=p.y;A.redraw()}}
function up(p){const h=T.hold;if(!h)return;if(Math.hypot(p.x-h.x0,p.y-h.y0)<12)return drop(h.i);const k=[0,1,2].find(k=>inbox(p,row(k,.2,.24)));drop(h.i,k==null?-1:k)}
const ok=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const later=(fns,ms)=>{const t=++T.tok;fns.forEach((f,j)=>setTimeout(()=>{if(t===T.tok)f()},A.reduced()?j*30+30:(j+1)*ms))};
const wipe=()=>{T.tok++;Object.assign(T,{want:()=>{},s:0,slot:[-1,-1,-1],bad:-1,fill:[],order:MIX[0].slice(),sel:-1,mine:[-1,-1,-1],made:[],won:0,hold:null})};
const steps=[
{h:'Beginning, middle, end',p:'Drag each picture card to its place, or tap the cards in order. A story has a beginning, a middle and an end.',task:'Put 2 stories in order',
 show:()=>{steps[0].go();later([0,1,2,0,1,2].map(i=>()=>drop(i)),350)},
 go:()=>{wipe();read('Which card comes first?');pads();T.want=ok(0,()=>T.s>=2,'Beginning, middle, end: now the story makes sense.')}},
{h:'Time words',p:'Time words tell the reader the order. Choose First, Then or Finally for each gap.',
 predict:{q:'Can a story start with “Finally”?',opts:['Yes, any time word works','No, Finally is for the end'],ans:1},task:'Fill the gaps in 2 stories',
 show:()=>{steps[1].go();later([0,1,2,0,1,2].map(i=>()=>word(i)),330)},
 go:()=>{wipe();read('Which time word starts the story?');pads();T.want=ok(1,()=>T.s>=2,'First starts it, Then moves it on, Finally ends it.')}},
{h:'Mixed up',p:'These stories are mixed up. Tap two cards to swap them until the story makes sense.',
 predict:{q:'Swap the first and last sentences. Does the story still make sense?',opts:['Yes, it has the same sentences','No, the order matters'],ans:1},task:'Fix 3 stories',
 show:()=>{steps[2].go();later([()=>pick(0),()=>pick(2),()=>pick(0),()=>pick(1),()=>pick(1),()=>pick(2)],350)},
 go:()=>{wipe();T.s=0;read('Which card is in the wrong place?');pads();T.want=ok(2,()=>T.won>=3,'The same sentences in the wrong order do not make sense.')}},
{h:'The ending',p:'A story needs an ending. It finishes what happened, or tells how someone felt.',task:'Choose 3 endings',
 show:()=>{steps[3].go();later([()=>end(0),()=>end(0),()=>end(0)],400)},
 go:()=>{wipe();read('Which sentence finishes the story?');pads();T.want=ok(3,()=>T.s>=3,'A good ending finishes the problem from the middle.')}},
{h:'Make your own',p:'Choose a beginning, a middle and an end. Tap a row on the picture to change it, then read your story.',task:'Make 2 stories that make sense',
 show:()=>{steps[4].go();later([()=>choose(0,0),()=>choose(1,0),()=>choose(2,0),tell,()=>choose(0,1),()=>choose(1,1),()=>choose(2,1),tell],320)},
 go:()=>{wipe();read('Choose how your story begins.');pads();T.want=ok(4,()=>T.made.length>=2,'Your ending matched your middle both times.')}},
{h:'Challenge',p:'',go:()=>{wipe();askQ()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>T.want()});
const QS=[['Which part of a story tells who it is about and where?',[['The beginning','ok'],['The end','theend'],['Any part','anypart']]],
 ['Which time word is best for the last sentence?',[['Finally','ok'],['First','firstlast'],['Then','thenlast']]],
 ['“Then the dog ran off. First, I got a dog.” What is wrong?',[['The order is mixed up','ok'],['Nothing is wrong','fine'],['It needs more dogs','silly']]],
 ['A story says: “First, we baked a cake. Then we put it in the oven.” What is missing?',[['An ending','ok'],['A beginning','hasbegin'],['A middle','hasmiddle']]],
 ['The middle is “I lost my hat.” Which ending fits?',[['Finally, I found it under my bed.','ok'],['Finally, I ate lunch.','nolink'],['First, I had a hat.','restart']]],
 ['Can you finish a story with “I felt happy”?',[['Yes, a feeling can end it','ok'],['No, endings cannot have feelings','nofeel'],['Only if it starts with Finally','mustfinally']]]];
function slip(t){let m='Beginning, middle, end, and an ending that finishes what happened.';
 if(t==='theend')m='The end tells how it finishes. Who and where come at the beginning.';
 if(t==='anypart')m='Readers need to know who and where first, so it goes at the beginning.';
 if(t==='firstlast')m='First is for the start. Finally tells the reader the story is ending.';
 if(t==='thenlast')m='Then moves the story on. Finally shows it is the end.';
 if(t==='fine')m='You cannot have a dog run off before you get it. Swap them round.';
 if(t==='silly')m='The number of dogs is fine. The sentences are in the wrong order.';
 if(t==='hasbegin')m='“First, we baked a cake” is the beginning. We need to know how it ended.';
 if(t==='hasmiddle')m='Putting it in the oven is the middle. What happened to the cake at the end?';
 if(t==='nolink')m='Lunch has nothing to do with the lost hat. The ending should say what happened to the hat.';
 if(t==='restart')m='That goes back to the start. An ending finishes the problem.';
 if(t==='nofeel')m='Endings can tell how someone felt, like “I felt happy”.';
 if(t==='mustfinally')m='Finally helps, but a feeling can end a story without it.';
 return m}
function askQ(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const rw=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},rw,o);b.onclick=()=>score(t)});read('Challenge: '+q);A.redraw()}
function score(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),g=t==='ok';
 if(g){good++;A.win()}else{good=0;A.sound.miss()}fb.innerHTML=(g?'✓ Yes! In a row: '+good+'.':'✗ '+slip(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=askQ}
A=FK.shell(c,{steps,ratio:.66,tall:1.25,draw:paint,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;pads()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});pads()}});
A.start()})})();
