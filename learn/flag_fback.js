/* Flagship – responding to writing feedback (ages 5–7): re-read a sentence aloud and drop the missing word into the
   right gap (a wrong gap reads back wrong), answer a reader's "tell me more" question with the detail that fits it,
   answer "why?" with a because-reason, sort feedback notes into stars and wishes, and tap every new detail in Sam's
   before-and-after story. Every drag or tap has a big button too. */
(()=>{const mn=Math.min,mx=Math.max,hy=Math.hypot;
 const READ=[[['We','went','the','park.'],'to',2],[['I','can','my','bike.'],'ride',2],[['Mum','and','I','a','cake.'],'made',3]];
 const MORE=[['I saw a dog.','What did the dog look like?',[['big, spotty','I saw a big, spotty dog.',0],['at the park','“At the park” tells where. The question asks what the dog looked like.'],['and it was nice','“Nice” does not tell what the dog looked like. Use describing words (adjectives), like big or spotty.']]],
  ['We had a picnic.','Where did you have it?',[['by the river','We had a picnic by the river.',0],['on Sunday','“On Sunday” tells when. The question asks where.'],['yummy','“Yummy” tells what the food was like. The question asks where.']]],
  ['I played.','Who did you play with?',[['with my brother','I played with my brother.',0],['in the snow','“In the snow” tells where. The question asks who.'],['a lot','“A lot” tells how much. The question asks who.']]]];
 const WHY=[['I was happy.','Why were you happy?',[['because my friend came','I was happy because my friend came.',0],['because I was happy','That says the same thing again. A reason tells what made you happy.'],['and then','“And then” does not give a reason. “Because” does.']]],
  ['I put on my coat.','Why did you put on your coat?',[['because it was cold','I put on my coat because it was cold.',0],['because it was hot','Read it back: a coat because it was hot? That does not make sense.'],['and my hat','“And my hat” tells what else. It does not say why.']]]];
 const NOTES=[['I like your word “zoomed”.',0],['Can you add what the cat looked like?',1],['Your capital letter at the start is great.',0],['A word is missing. Read it out to find it.',1]];
 const AFTER=[['On Saturday',1],['I',0],['went',0],['to',0],['the',0],['beach',0],['with Gran.',1],['I',0],['saw',0],['a',0],['tiny red',1],['crab',0],['under a rock.',1],['I',0],['was',0],['happy',0],['because it waved!',1]];
 const BEFORE='I went to the beach. I saw a crab. I was happy.'.split(' ').map(t=>[t,0]);
VIS.reg('flagfback',c=>{let A,pad,chal,q=-1,gen=0;c.fig.classList.add('young');
 const S={ri:0,rw:[],gap:-1,mi:0,wi:0,note:[],seen:[],aft:1,held:null,bad:-1,want:()=>{}};
 const tell=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
 const view=()=>['read','more','why','note','after','quiz'][A.step];
 const X=f=>f*A.W,Y=f=>f*A.H,big=z=>A.narrow?z:z+5;
 const font=(x,z,w)=>{x.font=`${w||700} ${big(z)}px system-ui,sans-serif`};
 const txt=(x,s,px,py,z,k,w,al)=>{font(x,z,w);x.textAlign=al||'center';x.textBaseline='middle';x.fillStyle=k;x.fillText(s,px,py,A.W-12)};
 const bad=t=>{A.sound.miss();tell(t);A.redraw()};
 const yes=t=>{A.sound.pop();tell(t);pads();A.redraw();S.want()};
 // lay words out on the paper, wrapping lines; returns a box per word
 const paper=()=>({x:X(.04),y:Y(.17),w:X(.92),h:view()==='more'||view()==='why'?Y(.28):Y(.44)});
 function lay(x,words,z,gapW){const P=paper();font(x,z,700);const sp=gapW||x.measureText(' ').width*1.6,lh=big(z)*1.9,out=[];let px=P.x+14,py=P.y+lh*.8;
  words.forEach(w=>{const ww=x.measureText(w).width;if(px+ww>P.x+P.w-14&&px>P.x+14){px=P.x+14;py+=lh}out.push({x:px,y:py,w:ww,h:lh});px+=ww+sp});return out}
 function sheet(x,title){const C=A.col,P=paper();x.fillStyle=C.dark?A.mix(C.pn,'#ffffff',.06):'#ffffff';A.paint.rrect(P.x,P.y,P.w,P.h,14);x.fill();x.strokeStyle=C.mu;x.lineWidth=2;x.stroke();
  if(title)txt(x,title,A.W/2,Y(.07),14,C.tx,800)}
 function words(x,list,boxes,z,hl){const C=A.col;font(x,z,700);x.textAlign='left';x.textBaseline='middle';
  list.forEach((w,i)=>{const b=boxes[i];if(hl&&hl(i)){x.fillStyle=A.alpha(C.gr,.22);A.paint.rrect(b.x-4,b.y-b.h*.32,b.w+8,b.h*.64,8);x.fill()}x.fillStyle=C.tx;x.fillText(w,b.x,b.y)})}
 // ---- word cards along the bottom ----
 const cardAt=(i,n)=>{if(n>2){const h=mn(56,mx(40,Y(.1)));return{x:X(.06),y:Y(.57)+i*(h+6),w:X(.88),h}}const g=8,w=(A.W-g*(n+1))/n,h=mx(52,Y(.15));return{x:g+i*(w+g),y:Y(.8)-h/2,w,h}};
 function cards(x,list,used){const C=A.col;list.forEach((t,i)=>{if(used&&used(i))return;let r=cardAt(i,list.length);if(S.held&&S.held.i===i)r={...r,x:S.held.x-r.w/2,y:S.held.y-r.h/2};
  x.fillStyle=A.alpha(S.bad===i?C.rd:C.cy,.2);A.paint.rrect(r.x,r.y,r.w,r.h,14);x.fill();x.strokeStyle=S.bad===i?C.rd:C.tx;x.lineWidth=2;x.stroke();
  txt(x,'➕ '+t,r.x+r.w/2,r.y+r.h/2,15,C.tx,800)})}
 // ---- 0: read it back, find the gap ----
 const curR=()=>READ[mn(S.ri,READ.length-1)];
 function readV(x){const C=A.col;if(S.ri>=READ.length){sheet(x,'Every sentence makes sense now!');const b=lay(x,READ.map(r=>{const w=r[0].slice();w.splice(r[2],0,r[1]);return w.join(' ')}).join(' ').split(' '),15);words(x,READ.map(r=>{const w=r[0].slice();w.splice(r[2],0,r[1]);return w.join(' ')}).join(' ').split(' '),b,15);return}
  const[w,miss]=curR(),list=S.gap>=0?[...w.slice(0,S.gap),miss,...w.slice(S.gap)]:w;sheet(x,`Read it out. Is a word missing? (${S.ri+1} of 3)`);const b=lay(x,list,19,40);words(x,list,b,19,i=>S.gap>=0&&i===S.gap);
  if(S.gap<0){x.fillStyle=C.am;gapsOf(b,w).forEach(g=>{x.beginPath();x.moveTo(g.x-8,g.y+16);x.lineTo(g.x,g.y+4);x.lineTo(g.x+8,g.y+16);x.closePath();x.fill()})}
  cards(x,[miss],()=>S.gap>=0)}
 const gapsOf=(b,w)=>w.map((_,i)=>i===0?{x:b[0].x-14,y:b[0].y}:{x:b[i-1].x+b[i-1].w+20,y:b[i-1].y}).concat([{x:b[w.length-1].x+b[w.length-1].w+20,y:b[w.length-1].y}]).slice(1);
 // gap k (1..n) means the word goes before word k
 function putGap(k){S.held=null;if(S.ri>=READ.length)return A.redraw();const[w,miss,ans]=curR();
  if(k!==ans){const t=w.slice();t.splice(k,0,miss);return bad(`Read it out: “${t.join(' ')}” That does not sound right. Try another gap.`)}
  S.gap=k;const t=w.slice();t.splice(k,0,miss);A.sound.pop();tell(`“${t.join(' ')}” Yes! Now it makes sense.`);A.redraw();const g=gen;setTimeout(()=>{if(g!==gen)return;S.gap=-1;S.ri++;pads();A.redraw();S.want()},700)}
 // ---- 1 and 2: tell me more / why? ----
 const setOf=()=>view()==='more'?MORE:WHY,idx=()=>view()==='more'?S.mi:S.wi;
 function qV(x){const C=A.col,L=setOf(),i=idx();if(i>=L.length){sheet(x,view()==='more'?'Every question has its detail!':'Every “why” has a because!');const s=L.map(r=>r[2][0][1]);const b=lay(x,s.join(' ').split(' '),15);words(x,s.join(' ').split(' '),b,15);return}
  const[base,ask,opts]=L[i];sheet(x,'');x.fillStyle=A.alpha(C.am,.25);A.paint.rrect(X(.04),Y(.02),X(.92),Y(.12),12);x.fill();x.strokeStyle=C.am;x.lineWidth=2;x.stroke();
  txt(x,'💬 '+ask,A.W/2,Y(.08),14,C.tx,800);const w=base.split(' ');const b=lay(x,w,19);words(x,w,b,19);
  txt(x,'Drag the answer onto the page',A.W/2,Y(.515),12,C.tx,700);cards(x,opts.map(o=>o[0]))}
 function answer(j){S.held=null;const L=setOf(),i=idx();if(i>=L.length)return A.redraw();const o=L[i][2][j];
  if(o[2]!==0){S.bad=j;return bad(o[1])}S.bad=-1;if(view()==='more')S.mi++;else S.wi++;yes(`“${o[1]}” That answers the question.`)}
 // ---- 3: stars and wishes ----
 const bin=k=>({x:k?X(.52):X(.03),y:Y(.62),w:X(.45),h:Y(.34)});
 const noteAt=i=>({x:X(.06),y:Y(.12),w:X(.88),h:Y(.4)});
 function noteV(x){const C=A.col,left=NOTES.findIndex((_,i)=>S.note[i]==null);
  [['⭐ Star','what is good',C.am],['🪄 Wish','a job to do',C.vi]].forEach(([t,u,k],j)=>{const r=bin(j);x.fillStyle=A.alpha(k,.16);A.paint.rrect(r.x,r.y,r.w,r.h,14);x.fill();x.strokeStyle=k;x.lineWidth=3;x.stroke();txt(x,t,r.x+r.w/2,r.y+22,16,C.tx,800);txt(x,u,r.x+r.w/2,r.y+48,12,C.tx,600);
   txt(x,String(S.note.filter(v=>v===j).length)+' notes',r.x+r.w/2,r.y+r.h-18,11,C.tx,600)});
  if(left<0)return txt(x,'Stars say what is good. Wishes are jobs to do.',A.W/2,Y(.3),14,C.gr,800);
  let r=noteAt(left);if(S.held)r={...r,x:S.held.x-r.w/2,y:S.held.y-r.h/2};x.fillStyle=C.dark?A.mix(C.pn,'#fde68a',.12):'#fef3c7';A.paint.rrect(r.x,r.y,r.w,r.h,10);x.fill();x.strokeStyle=C.tx;x.lineWidth=2;x.stroke();
  const ws=NOTES[left][0].split(' ');let line='',ly=r.y+r.h*.32;font(x,15,700);const lines=[];ws.forEach(w=>{if(x.measureText(line+' '+w).width>r.w-24&&line){lines.push(line);line=w}else line=line?line+' '+w:w});lines.push(line);
  lines.forEach((l,k)=>txt(x,l,r.x+r.w/2,ly+k*big(15)*1.5,15,C.tx,700));txt(x,`Note ${left+1} of 4: drag it to a box`,A.W/2,Y(.05),12,C.tx,700)}
 function sortNote(k){S.held=null;const i=NOTES.findIndex((_,i)=>S.note[i]==null);if(i<0||k<0)return A.redraw();const ans=NOTES[i][1];
  if(k!==ans)return bad(ans?'This note asks you to change something. That is a wish: a job to make your writing better.':'This note says what is already good. That is a star. Keep doing it!');
  S.note[i]=k;yes(ans?'A wish! It gives you a job to do. It does not mean your writing is bad.':'A star! It tells you what to keep doing.')}
 // ---- 4: before and after ----
 function afterV(x){const C=A.col,list=S.aft?AFTER:BEFORE;sheet(x,S.aft?`After the feedback: tap each new detail (${S.seen.length} of 5)`:'Before the feedback');const w=list.map(t=>t[0]);const b=lay(x,w,16);S.boxes=b;
  words(x,w,b,16,i=>S.aft&&list[i][1]&&S.seen.includes(i));if(S.aft)list.forEach((t,i)=>{if(t[1]&&!S.seen.includes(i)){x.strokeStyle=C.vi;x.setLineDash([4,3]);x.lineWidth=2;A.paint.rrect(b[i].x-4,b[i].y-b[i].h*.32,b[i].w+8,b[i].h*.64,8);x.stroke();x.setLineDash([])}})
  txt(x,S.aft?'Each new detail answers a reader’s question.':'Short, but the reader wants to know more.',A.W/2,Y(.7),12,C.tx,600)}
 const ASK={0:'When? On Saturday.',6:'Who with? With Gran.',10:'What was it like? Tiny and red.',12:'Where was it? Under a rock.',16:'Why were you happy? Because it waved!'};
 function tapDetail(i){if(!S.aft)return tell('Tap “After” to see the new version.');if(!AFTER[i]||!AFTER[i][1])return bad(`“${AFTER[i]?AFTER[i][0]:''}” was there before. Find the words that are new.`);
  if(S.seen.includes(i))return;S.seen.push(i);yes(ASK[i])}
 function draw(A){const{ctx:x,W,H,col:C}=A,v=view();x.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.35);x.fillRect(0,0,W,H);
  const f={read:readV,more:qV,why:qV,note:noteV,after:afterV}[v];if(f)f(x);else{txt(x,'✏️',W/2,H*.45,48,C.tx);txt(x,'Make it better',W/2,H*.15,16,C.tx,800)}A.fx.draw(x)}
 function pads(){if(!pad)return;pad.innerHTML='';const v=view(),B=(t,f,al)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':al||null},pad,t);b.onclick=f};
  if(v==='read'&&S.ri<READ.length&&S.gap<0){const[w,miss]=curR();c.el('p',{class:'fl-tk'},pad,`Where does “${miss}” go?`);for(let k=1;k<w.length;k++)B(`${w[k-1]} ▲ ${w[k]}`,()=>putGap(k),`Put ${miss} between ${w[k-1]} and ${w[k]}`)}
  if((v==='more'||v==='why')&&idx()<setOf().length)setOf()[idx()][2].forEach((o,j)=>B('➕ '+o[0],()=>answer(j)));
  if(v==='note'&&NOTES.some((_,i)=>S.note[i]==null)){B('⭐ Star',()=>sortNote(0));B('🪄 Wish',()=>sortNote(1))}
  if(v==='after'){B(S.aft?'Show before':'Show after',()=>{S.aft^=1;pads();A.redraw();tell(S.aft?'The story after the feedback.':'The story before the feedback.')});if(S.aft)AFTER.forEach((t,i)=>{if(t[1]&&!S.seen.includes(i))B(t[0],()=>tapDetail(i),'New detail: '+t[0])})}}
 const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
 const play=(fs,ms)=>{const g=++gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===gen)f()},j*ms))};
 const reset=()=>{gen++;S.want=()=>{};S.held=null;S.bad=-1;S.gap=-1};
 const steps=[
  {h:'Read it back',p:'Writers read their work out loud. If it sounds wrong, a word may be missing. Drag the word to the right gap.',
   predict:{q:'Sam wrote: “We went the park.” Does it sound right?',opts:['Yes, it is fine','No, a word is missing'],ans:1},task:'Fix all three sentences',
   show:()=>{steps[0].go();const g=++gen;let k=0;const nx=()=>{if(g!==gen||k>=READ.length)return;putGap(READ[k][2]);k++;setTimeout(nx,1000)};setTimeout(nx,300)},
   go:()=>{reset();S.ri=0;tell('Read it out. Where is the missing word?');pads();S.want=fin(0,()=>S.ri>=3,'Reading it out loud helps you hear what is missing.')}},
  {h:'Tell me more',p:'A reader asks a question. Add the detail that answers that question.',
   predict:{q:'The question is “Where did you go?” Which detail answers it?',opts:['It was fun','To the beach'],ans:1},task:'Answer three questions',
   show:()=>{steps[1].go();play(MORE.map(()=>()=>answer(0)),700)},
   go:()=>{reset();S.mi=0;tell('Read the question. Which detail answers it?');pads();S.want=fin(1,()=>S.mi>=3,'A detail that answers the question makes your writing clearer.')}},
  {h:'Why? Because…',p:'If a reader asks “why?”, add a reason with the joining word “because”.',task:'Add a reason to two sentences',
   show:()=>{steps[2].go();play(WHY.map(()=>()=>answer(0)),700)},
   go:()=>{reset();S.wi=0;tell('Answer the why question with because.');pads();S.want=fin(2,()=>S.wi>=2,'“Because” joins a reason to your sentence.')}},
  {h:'Stars and wishes',p:'Feedback can be a star (what is good) or a wish (what to change). Drag each note to its box.',
   predict:{q:'A friend says: “Can you add what the cat looked like?” Does that mean your writing is bad?',opts:['Yes, it is bad','No, it is a tip'],ans:1},task:'Sort all four notes',
   show:()=>{steps[3].go();play(NOTES.map(n=>()=>sortNote(n[1])),600)},
   go:()=>{reset();S.note=[];tell('Is this note a star or a wish?');pads();S.want=fin(3,()=>S.note.filter(v=>v!=null).length>=4,'A wish is a job to do, not a telling off.')}},
  {h:'Before and after',p:'Sam used the feedback. Switch between before and after. Tap each new detail.',task:'Find all five new details',
   show:()=>{steps[4].go();play(Object.keys(ASK).map(i=>()=>tapDetail(+i)),600)},
   go:()=>{reset();S.aft=1;S.seen=[];tell('Tap each new detail in the after story.');pads();S.want=fin(4,()=>S.seen.length>=5,'Five questions answered: the story is much clearer.')}},
  {h:'Challenge',p:'',go:()=>{reset();quiz()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
 const QZ=[['I saw a cat.','What colour was the cat?',[['I saw a black cat.','ok'],['I saw a cat in the garden.','off'],['I saw a cat cat.','reread']]],
  ['We ate.','What did you eat?',[['We ate pizza.','ok'],['We ate at home.','off'],['I do not want to change it.','ignore']]],
  ['My dog ran.','Why did your dog run?',[['My dog ran because he saw a ball.','ok'],['My dog ran because he ran.','same'],['Can you tell me more?','copy']]],
  ['I went to bed.','When did you go to bed?',[['I went to bed at seven.','ok'],['I went to bed in my room.','off'],['(rub it all out)','rub']]]];
 let stars=0;
 function quiz(){q++;const[s,ask,o]=QZ[q%QZ.length],r=q%3;
  chal.innerHTML=`<p><b>Sam wrote: “${s}”<br>💬 ${ask}</b></p><p>Which change is best?</p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');o.slice(r).concat(o.slice(0,r)).forEach(([t,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,t);b.onclick=()=>mark(tag)});tell('Challenge: '+ask);A.redraw()}
 function mark(tag){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Yes! That detail answers the question.';break;
   case 'off':m='That is a good detail, but it answers a different question. Read the question again.';break;
   case 'reread':m='Read it out: “a cat cat”. Always read your change back to check it makes sense.';break;
   case 'ignore':m='A question from a reader is a tip, not a telling off. Use it to make your writing better.';break;
   case 'same':m='“He ran because he ran” says the same thing twice. A reason tells what made it happen.';break;
   case 'copy':m='Do not copy the question into your writing. Answer it with a detail.';break;
   default:m='No need to start again. Keep your work and add one detail.'}
  const ok=tag==='ok';if(ok){stars++;A.win()}else{stars=0;A.sound.miss()}
  fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Stars: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
 const inside=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 function down(p){const v=view();S.held=null;
  if(v==='read'&&S.ri<READ.length&&S.gap<0&&inside(p,cardAt(0,1))){S.held={i:0,x:p.x,y:p.y};return true}
  if((v==='more'||v==='why')&&idx()<setOf().length){const n=setOf()[idx()][2].length,j=[...Array(n).keys()].find(j=>inside(p,cardAt(j,n)));if(j!=null){S.held={i:j,x:p.x,y:p.y};return true}}
  if(v==='note'&&NOTES.some((_,i)=>S.note[i]==null)&&inside(p,noteAt())){S.held={i:0,x:p.x,y:p.y};return true}
  if(v==='after'&&S.boxes){const i=S.boxes.findIndex(b=>p.x>=b.x-6&&p.x<=b.x+b.w+6&&Math.abs(p.y-b.y)<b.h*.4);if(i>=0)tapDetail(i)}return false}
 function move(p){if(S.held){S.held.x=p.x;S.held.y=p.y;A.redraw()}}
 function up(p){const v=view(),h=S.held;if(!h)return;S.held=null;
  if(v==='read'){const[w]=curR(),b=lay(A.ctx,w,19,40),g=gapsOf(b,w);let k=-1,d=1e9;g.forEach((q,i)=>{const e=hy(p.x-q.x,p.y-q.y);if(e<d){d=e;k=i+1}});if(d<70)return putGap(k);return A.redraw()}
  if(v==='more'||v==='why'){if(inside(p,paper()))return answer(h.i);return A.redraw()}
  if(v==='note'){const k=[0,1].find(k=>inside(p,bin(k)));return sortNote(k==null?-1:k)}}
 A=FK.shell(c,{steps,ratio:.66,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;pad.hidden=A.step===5;pads()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});pads()}});
 A.start()})})();
