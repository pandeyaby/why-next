/* Flagship – rehearsing and varying sentences (ages 7–8): say a line of dialogue and put the inverted commas round only
   the spoken words; try different verbs aloud and keep the one that fits the moment (crept, whispered, yelled); join two
   short ideas with the conjunction that keeps the meaning (because, so, but, when); say one idea three ways and choose
   the clear one, not the longest; then rewrite a story so it mixes a short sentence, a joined sentence and dialogue.
   Challenge on the usual slips: marks round the whole sentence, fancy but wrong verbs, "so" for a reason, piles of
   adjectives, and every sentence built the same way. */
(()=>{
const TALK=[{who:'Tom',w:["Let's",'go!','shouted','Tom.'],ok:[0,2]},{who:'Mia',w:['Mia','whispered,','It','is','a','secret.'],ok:[2,6]},
 {who:'Sam',w:['Can','I','help?','asked','Sam.'],ok:[0,3]}];
const VERB=[['🦊','The fox does not want to be seen.','The fox ___ across the garden.',[['crept',''],['stomped','Stomping is loud. The fox would be heard and seen.'],['raced','Racing is fast, but it is not sneaky.'],['went','"Went" is fine, but it does not show that the fox is sneaking.']]],
 ['🤫','Ella is telling a secret.','"Don\'t tell anyone," Ella ___.',[['whispered',''],['yelled','If Ella yells, everyone hears the secret!'],['laughed','Laughing does not fit a secret. Say it softly.'],['said','"Said" works, but it does not show that the words are secret.']]],
 ['📣','Ben is calling across a big field.','"Over here!" Ben ___.',[['yelled',''],['whispered','Nobody across a field can hear a whisper.'],['muttered','Muttering is quiet and grumpy. Ben needs to be loud.'],['said','"Said" is too plain. Ben has to be loud to be heard.']]]];
const JOIN=[['Mia put on her coat','she was cold.','because'],['It began to rain,','we went inside.','so'],['Sam wanted to play,','he had to tidy up.','but'],['I will call you','I get home.','when']];
const JW={because:'"Because" gives a reason.',so:'"So" tells what happens as a result.',but:'"But" shows a problem or a surprise.',when:'"When" tells the time it happens.'};
const THREE=[['🐕','Tell how the dog ran to the gate.',[['The dog raced to the gate, barking.',''],['The dog ran. It ran fast. It ran to the gate.','Three short sentences all say "ran". It sounds choppy.'],['The big brown hairy fast quick dog ran very very fast to the gate.','Too many describing words pile up. One or two good ones say more.']]],
 ['🏆','Tell what Jo said when she won.',[['"I did it!" cried Jo.',''],['Jo said she did it and she said it.','"Said" twice tells us nothing new.'],['Jo said, I did it!','Jo\'s words need inverted commas round them.']]]];
const SHAPE=['short','joined','speech'],SHN={short:'a short sentence',joined:'a joined sentence',speech:'dialogue'};
const STORY=[['Max opened the box.','Max opened the box because it rattled.','"What is in here?" asked Max.'],
 ['A frog jumped out.','A frog jumped out when the lid came off.','"Ribbit!" croaked the frog.'],
 ['Max laughed.','Max laughed so much that he fell over.','"A frog!" laughed Max.']];
VIS.reg('flagrehearse',c=>{let A,ctl,chal,cq=-1,streak=0;c.fig.classList.add('young');
const S={tok:0,next:()=>{},t:0,marks:[],gone:0,v:0,vok:0,pick:'',j:0,jok:0,hold:null,k:0,kok:0,rows:[0,0,0],taps:0,oops:-1};
const stage=()=>['marks','verb','join','three','mix','quiz'][A.step];
const speak=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const pt=n=>Math.round(n*(A.narrow?1.08:1.25));
function word(g,s,x,y,n,col,wt,al){g.font=`${wt||700} ${pt(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(s,x,y,A.W*.92)}
function lines(g,s,x,y,n,col,wt,mw){g.font=`${wt||700} ${pt(n)}px system-ui,sans-serif`;if(g.measureText(s).width<=mw)return word(g,s,x,y,n,col,wt);
 const ws=s.split(' '),h=Math.ceil(ws.length/2);word(g,ws.slice(0,h).join(' '),x,y-pt(n)*.6,n,col,wt);word(g,ws.slice(h).join(' '),x,y+pt(n)*.6,n,col,wt)}
function tile(g,r,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.lineWidth=lw||2;g.strokeStyle=edge||A.col.tx;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.stroke()}
const hit=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
function lay(){const T=TALK[S.t%3],g=A.ctx;g.font=`700 ${pt(14)}px system-ui,sans-serif`;const gap=A.narrow?14:pt(20),ws=T.w.map(s=>g.measureText(s).width),tot=ws.reduce((a,b)=>a+b,0)+gap*(ws.length+1);
 let x=Math.max(6,(A.W-tot)/2)+gap;const xs=[],gx=[x-gap/2];ws.forEach((w,i)=>{xs.push(x+w/2);x+=w+gap;gx.push(x-gap/2)});return{xs,gx,y:A.H*.5}}
const cardR=k=>({x:A.W*.04,y:A.H*(.3+k*.22),w:A.W*.92,h:A.H*.19});
const rowR=k=>({x:A.W*.04,y:A.H*(.06+k*.24),w:A.W*.92,h:A.H*.2});
const chipR=k=>{const w=(A.W-30)/4;return{x:6+k*(w+6),y:A.H*.8,w,h:A.H*.14}};
const slotR=()=>({x:A.W*.32,y:A.H*.38,w:A.W*.36,h:A.H*.16});
function draw(A){const{ctx:g,W,H,col:C}=A,m=stage();g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.05:.35);g.fillRect(0,0,W,H);
 if(m==='quiz'){word(g,'🗣️ Say it. Try it. Choose it.',W/2,H*.42,17,C.tx,800);word(g,'Then write the best one.',W/2,H*.6,13);return}
 if(m==='marks'){const T=TALK[S.t%3],L=lay();word(g,'🗣️ '+T.who+' is talking.',W/2,H*.14,15,C.tx,800);
  T.w.forEach((s,i)=>word(g,s,L.xs[i],L.y,14,C.tx,700));
  L.gx.forEach((x,i)=>{const on=S.marks.includes(i);g.fillStyle=on?C.gr:S.oops===i?C.rd:A.alpha(C.tx,.25);g.beginPath();g.arc(x,L.y+pt(20),on?7:5,0,7);g.fill();
   if(on){const open=S.marks.filter(k=>k<i).length%2===0;word(g,open?'“':'”',x,L.y-pt(4),24,C.gr,800)}});
  word(g,'Tap a dot to put inverted commas there.',W/2,H*.76,11,C.tx,600);word(g,'Done: '+S.gone+' of 3',W/2,H*.9,11,C.tx,600)}
 if(m==='verb'){const V=VERB[S.v%3];word(g,V[0]+' '+V[1],W/2,H*.12,13,C.tx,800);const r=slotR();
  word(g,V[2].replace('___',S.pick?S.pick:'_____'),W/2,H*.3,15,C.tx,800);tile(g,r,A.alpha(S.oops>=0?C.rd:C.cy,.12),S.oops>=0?C.rd:C.tx);word(g,S.hold?'…':S.pick||'drop a word',W/2,r.y+r.h/2,12,C.tx,700);
  V[3].forEach(([w],k)=>{const q=chipR(k);if(!(S.hold&&S.hold.k===k)){tile(g,q,A.alpha(C.or,.16));word(g,w,q.x+q.w/2,q.y+q.h/2,12,C.tx,800)}});
  if(S.hold)word(g,V[3][S.hold.k][0],S.hold.x,S.hold.y,14,C.tx,800);word(g,'Moments done: '+S.vok+' of 3',W/2,H*.66,11,C.tx,600)}
 if(m==='join'){const J=JOIN[S.j%4];word(g,J[0],W/2,H*.18,14,C.tx,800);word(g,J[1],W/2,H*.66,14,C.tx,800);const r=slotR();
  tile(g,r,A.alpha(S.oops>=0?C.rd:C.vi,.12),S.oops>=0?C.rd:C.tx);word(g,S.hold?'…':S.pick||'join word?',W/2,r.y+r.h/2,13,C.tx,800);
  Object.keys(JW).forEach((w,k)=>{const q=chipR(k);if(!(S.hold&&S.hold.k===k)){tile(g,q,A.alpha(C.gr,.14));word(g,w,q.x+q.w/2,q.y+q.h/2,12,C.tx,800)}});
  if(S.hold)word(g,Object.keys(JW)[S.hold.k],S.hold.x,S.hold.y,14,C.tx,800);word(g,'Joined: '+S.jok+' of 4',W/2,H*.08,11,C.tx,600)}
 if(m==='three'){const T=THREE[S.k%2];word(g,T[0]+' '+T[1],W/2,H*.13,13,C.tx,800);T[2].forEach(([s],k)=>{const r=cardR(k);tile(g,r,A.alpha(S.oops===k?C.rd:C.cy,.1),S.oops===k?C.rd:C.tx,S.oops===k?3:2);lines(g,(k+1)+'. '+s,W/2,r.y+r.h/2,11,C.tx,700,r.w-12)});
  word(g,'Best picked: '+S.kok+' of 2',W/2,H*.22,11,C.tx,600)}
 if(m==='mix'){STORY.forEach((v,k)=>{const r=rowR(k),sh=SHAPE[S.rows[k]];tile(g,r,A.alpha([C.cy,C.vi,C.or][S.rows[k]],.15));lines(g,v[S.rows[k]],W/2,r.y+r.h*.4,12,C.tx,700,r.w-12);word(g,'('+SHN[sh]+') tap to change',W/2,r.y+r.h*.78,9,C.tx,600)});
  const used=new Set(S.rows).size;word(g,'Sentence shapes used: '+used+' of 3',W/2,H*.88,12,C.tx,800)}
 A.fx.draw(g)}
const miss=t=>{A.sound.miss();speak(t);A.redraw()},good=t=>{A.sound.pop();speak(t);buttons();A.redraw();S.next()};
const later=f=>{const t=S.tok;setTimeout(()=>{if(t===S.tok){f();buttons();A.redraw()}},A.reduced()?20:700)};
function mark(i){if(S.gone>=3)return;const T=TALK[S.t%3];if(S.marks.includes(i))return;
 if(!T.ok.includes(i)){S.oops=i;const lo=T.ok[0],hi=T.ok[1];
  return miss(i>lo&&i<hi?'That dot is in the middle of what '+T.who+' says. The marks go before the first spoken word and after the last.':T.who+' did not say "'+(T.w[i]||T.w[i-1]).replace(/[,.]/g,'')+'". Only the spoken words go inside.')}
 S.oops=-1;S.marks.push(i);if(S.marks.length<2)return good('Yes. Now where does the closing mark go?');
 S.gone++;good(S.gone>=3?'All three! The ! or ? stays inside the closing mark.':'Yes! Only '+T.who+"'s words are inside.");if(S.gone<3)later(()=>{S.t++;S.marks=[]})}
function verb(k){S.hold=null;if(S.vok>=3)return A.redraw();const V=VERB[S.v%3],[w,why]=V[3][k];S.pick=w;
 if(why){S.oops=k;return miss('Say it aloud: "'+V[2].replace('___',w)+'" '+why)}
 S.oops=-1;S.vok++;good(S.vok>=3?'Three moments, three good words. Say it, try it, keep the one that fits.':'Yes! "'+w+'" fits the moment.');if(S.vok<3)later(()=>{S.v++;S.pick=''})}
function join(k){S.hold=null;if(S.jok>=4)return A.redraw();const J=JOIN[S.j%4],w=Object.keys(JW)[k];S.pick=w;
 if(w!==J[2]){S.oops=k;return miss(JW[w]+' Does "'+J[0].replace(/,$/,'')+' '+w+' '+J[1]+'" make sense?')}
 S.oops=-1;S.jok++;good(S.jok>=4?'Four ideas joined. One sentence, two clauses.':'Yes: "'+J[0]+' '+w+' '+J[1]+'"');if(S.jok<4)later(()=>{S.j++;S.pick=''})}
function three(k){if(S.kok>=2)return;const T=THREE[S.k%2],[,why]=T[2][k];
 if(why){S.oops=k;return miss(why)}
 S.oops=-1;S.kok++;good(S.kok>=2?'Clear beats long. The best version fits and sounds right.':'Yes! Clear and lively.');if(S.kok<2)later(()=>S.k++)}
function cycle(k){S.rows[k]=(S.rows[k]+1)%3;S.taps++;const used=new Set(S.rows);A.sound.tick();
 if(used.size>=3){speak('A short sentence, a joined sentence and dialogue. Now the story sounds lively.');buttons();A.redraw();return S.next()}
 const need=SHAPE.filter((_,i)=>!used.has(i)).map(s=>SHN[s]).join(' and ');speak('Line '+(k+1)+' is now '+SHN[SHAPE[S.rows[k]]]+'. Still missing: '+need+'.');buttons();A.redraw()}
function buttons(){if(!ctl)return;ctl.innerHTML='';const m=stage(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=f};
 if(m==='marks'&&S.gone<3){const T=TALK[S.t%3];T.w.concat(['']).forEach((s,i)=>{if(!S.marks.includes(i))B(i<T.w.length?'❝ before "'+s+'"':'❞ at the end',()=>mark(i),'Inverted commas '+(i<T.w.length?'before '+s:'at the end'))})}
 if(m==='verb'&&S.vok<3)VERB[S.v%3][3].forEach(([w],k)=>B(w,()=>verb(k),'Try the word '+w));
 if(m==='join'&&S.jok<4)Object.keys(JW).forEach((w,k)=>B(w,()=>join(k),'Join with '+w));
 if(m==='three'&&S.kok<2)THREE[S.k%2][2].forEach(([s],k)=>B((k+1)+'. '+s,()=>three(k),'Choose version '+(k+1)));
 if(m==='mix')STORY.forEach((_,k)=>B('Change line '+(k+1),()=>cycle(k),'Change the shape of line '+(k+1)))}
function down(p){const m=stage();
 if(m==='marks'){const L=lay();let best=-1,bd=1e9;L.gx.forEach((x,i)=>{const d=Math.hypot(p.x-x,p.y-L.y-pt(20));if(d<bd){bd=d;best=i}});if(bd<pt(30))mark(best);return false}
 if(m==='verb'||m==='join'){for(let k=0;k<4;k++)if(hit(p,chipR(k))){S.hold={k,x:p.x,y:p.y,sx:p.x,sy:p.y};A.redraw();return true}return false}
 if(m==='three'){for(let k=0;k<3;k++)if(hit(p,cardR(k)))three(k);return false}
 if(m==='mix'){for(let k=0;k<3;k++)if(hit(p,rowR(k)))cycle(k);return false}return false}
function move(p){if(!S.hold)return;S.hold.x=p.x;S.hold.y=p.y;A.redraw()}
function up(p){if(!S.hold)return;const k=S.hold.k,r=slotR(),inside=hit(p,{x:r.x-20,y:r.y-20,w:r.w+40,h:r.h+40});
 if(inside||Math.hypot(p.x-S.hold.sx,p.y-S.hold.sy)<10){stage()==='verb'?verb(k):join(k);return}S.hold=null;A.redraw()}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const auto=(fs,ms)=>{const t=++S.tok;fs.forEach((f,j)=>setTimeout(()=>{if(t===S.tok)f()},A.reduced()?j*30+30:(j+1)*ms))};
const clear=()=>{S.tok++;Object.assign(S,{next:()=>{},t:0,marks:[],gone:0,v:0,vok:0,pick:'',j:0,jok:0,hold:null,k:0,kok:0,rows:[0,0,0],taps:0,oops:-1})};
const wait=()=>{};
const steps=[
{h:'Say it, then mark it',p:'Say the line out loud first, the way the person would. Then put inverted commas (speech marks) round the words they say.',
 predict:{q:'Where do the inverted commas go?',opts:['Round the whole sentence','Round only the spoken words'],ans:1},task:'Mark 3 lines of dialogue',
 show:()=>{steps[0].go();const f=()=>{const T=TALK[S.t%3];T.ok.forEach(i=>{if(!S.marks.includes(i))mark(i)})};auto([f,wait,wait,f,wait,wait,f],330)},
 go:()=>{clear();speak('Tom is talking. Where do the inverted commas go?');buttons();S.next=ready(0,()=>S.gone>=3,'Speech marks hug the spoken words, and the ! or ? goes inside them.')}},
{h:'Try different words',p:'Say the sentence with each word. Which one fits the moment? Drag a word into the box, or tap it.',
 predict:{q:'Which word is best?',opts:['The loudest, most exciting word','The word that fits what is happening'],ans:1},task:'Pick a word for 3 moments',
 show:()=>{steps[1].go();auto([()=>verb(0),wait,wait,()=>verb(0),wait,wait,()=>verb(0)],330)},
 go:()=>{clear();speak('The fox does not want to be seen. Which word fits?');buttons();S.next=ready(1,()=>S.vok>=3,'Trying words aloud helps you choose the one that fits.')}},
{h:'Join two ideas',p:'Two short ideas can become one sentence. Pick the joining word (conjunction) that keeps the meaning.',task:'Join 4 pairs',
 show:()=>{steps[2].go();auto(JOIN.map(J=>()=>join(Object.keys(JW).indexOf(J[2]))).flatMap(f=>[f,wait,wait]),250)},
 go:()=>{clear();speak('Mia put on her coat. She was cold. Which word joins them?');buttons();S.next=ready(2,()=>S.jok>=4,'Because, so, but and when each change the meaning in their own way.')}},
{h:'Say it three ways',p:'Here is one idea said three ways. Read each one aloud. Pick the version that sounds best.',
 predict:{q:'The best sentence is the one with…',opts:['The most describing words','Clear words that fit'],ans:1},task:'Pick the best version twice',
 show:()=>{steps[3].go();auto([()=>three(0),wait,wait,()=>three(0)],330)},
 go:()=>{clear();speak('How did the dog run to the gate? Pick the best version.');buttons();S.next=ready(3,()=>S.kok>=2,'Long is not the same as good. Choose the clear one.')}},
{h:'Mix your sentences',p:'Every line here is short and plain. Tap a line to change its shape. Use a short sentence, a joined sentence and dialogue.',task:'Use all 3 sentence shapes',
 show:()=>{steps[4].go();auto([()=>cycle(1),()=>cycle(2),()=>cycle(2)],380)},
 go:()=>{clear();speak('Three short lines. Tap a line to change it.');buttons();S.next=ready(4,()=>new Set(S.rows).size>=3,'Mixing shapes keeps a reader interested.')}},
{h:'Challenge',p:'',go:()=>{clear();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.next()});
const QS=[['Which line is punctuated correctly?',[['"Come back!" called Dad.','ok'],['"Come back! called Dad."','whole'],['Come back! "called Dad."','wrong']]],
 ['A mouse sneaks past a cat. Which word fits best?',[['tiptoed','ok'],['thundered','loud'],['walked','plain']]],
 ['Which joining word fits? "We stayed in ___ it was raining."',[['because','ok'],['so','so'],['but','but']]],
 ['Which sentence sounds best?',[['The owl swooped down.','ok'],['The big dark grey soft owl swooped down very very fast.','pile'],['The owl went. It went down.','choppy']]],
 ['A story has five sentences that all start "I went". What should you do?',[['Say some aloud in new ways','ok'],['Write it faster','fast'],['Add more "I went" lines','more']]],
 ['Why say a sentence aloud before you write it?',[['To hear if it sounds right','ok'],['To make it longer','long'],['So you do not need full stops','stops']]]];
function why(t){let m='Say it aloud, try a few ways, and keep the clearest one.';
 if(t==='whole')m='"Called Dad" is not what Dad said, so it goes outside the marks.';
 if(t==='wrong')m='The marks are round the wrong words. Dad said "Come back!"';
 if(t==='loud')m='Thundering is loud. The cat would hear it!';
 if(t==='plain')m='"Walked" is plain. A sneaky word shows the mouse is being careful.';
 if(t==='so')m='"So" means a result. The rain is the reason, so use "because".';
 if(t==='but')m='"But" shows a surprise. Staying in when it rains is no surprise.';
 if(t==='pile')m='A pile of describing words slows the reader down. Keep the strong verb.';
 if(t==='choppy')m='Two short "went" sentences sound choppy and say little.';
 if(t==='fast')m='Speed does not fix it. Change how some sentences start.';
 if(t==='more')m='More of the same makes it worse. Vary the sentences.';
 if(t==='long')m='Longer is not better. Saying it helps you hear if it sounds right.';
 if(t==='stops')m='Every sentence still needs a capital letter and a full stop.';
 return m}
function quiz(){cq++;const[q,ops]=QS[cq%QS.length],r=cq%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark2(t)});speak('Challenge: '+q);A.redraw()}
function mark2(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?'✓ Yes! In a row: '+streak+'.':'✗ '+why(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});buttons()}});
A.start()})})();
