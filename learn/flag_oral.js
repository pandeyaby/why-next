/* Flagship – saying sentences before writing them (ages 5–6): say a sentence aloud several times so it sticks
   (oral rehearsal), tap one finger per word to count its words, write it word by word in the order you said it,
   read it back to catch a word that went missing, and hold a sentence in your head once it is hidden.
   Challenge on the usual slips: writing before saying, counting letters as words, not re-reading, mixing up words. */
(()=>{const PIC={'🐶':'The dog runs to the park.','🚢':'I can see a big ship.'};
const CNT=[['🐱','The cat naps.'],['🚗','My dad has a red car.'],['🦆','We fed the ducks.']];
const WR=[['🚢','I can see a big ship.'],['🚌','The bus is red.']];
const MISS=[['The dog ran to the park.',2],['Mum and I went to the shop.',1],['I like to play in the sand.',6]];
const HOLD=[['⚽','Sam kicks the red ball.','big'],['🐝','A bee sits on a flower.','tree']];
const words=s=>s.replace(/[.]/g,'').split(' ');
VIS.reg('flagoral',c=>{let A,keys,box,q=-1,streak=0;c.fig.classList.add('young');
const O={tok:0,want:()=>{},says:0,k:0,lit:0,line:[],gap:-1,done:0,hidden:false,chips:[],grab:null,bad:-1};
const view=()=>['say','count','write','check','hold','quiz'][A.step];
const note=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const z=n=>Math.round(n*(A.narrow?1.05:1.2));
function wr(g,s,x,y,n,col,w){g.font=`${w||700} ${z(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(s,x,y,A.W-12)}
function pill(g,r,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=lw||2;g.strokeStyle=edge;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke()}
const on=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
function rowRects(n,y,h){const gap=6,w=(A.W-12-gap*(n-1))/n;return Array.from({length:n},(_,i)=>({x:6+i*(w+gap),y:A.H*y,w,h:A.H*h}))}
function bubble(g,s,a){const{W,H,col:C}=A;g.globalAlpha=a;pill(g,{x:W*.06,y:H*.36,w:W*.88,h:H*.18},A.alpha(C.cy,.14),C.tx);wr(g,'“'+s+'”',W/2,H*.45,16,C.tx,800);g.globalAlpha=1}
function hand(g,n,lit){const{W,H,col:C}=A;for(let i=0;i<n;i++){const x=W*(.5+(i-(n-1)/2)*.11),y=H*.86;g.fillStyle=i<lit?A.alpha(C.gr,.55):A.alpha(C.ln,.35);g.beginPath();g.ellipse(x,y,W*.03,H*.07,0,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=1.5;g.stroke();if(i<lit)wr(g,String(i+1),x,y,11,C.tx,800)}}
function draw(A){const{ctx:g,W,H,col:C}=A,v=view();g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.05:.35);g.fillRect(0,0,W,H);
 if(v==='quiz'){wr(g,'Say it → write it → read it back',W/2,H*.45,15,C.tx,800);return}
 if(v==='say'){wr(g,'🐶🌳',W/2,H*.16,44);bubble(g,PIC['🐶'],1);
  wr(g,'In my head:',W*.3,H*.68,12,C.tx,600);for(let i=0;i<3;i++){pill(g,{x:W*.48+i*W*.15,y:H*.63,w:W*.12,h:H*.1},A.alpha(C.gr,i<O.says?.6:.08),C.tx)}
  wr(g,O.says>=3?'I can remember it!':O.says?'Say it again':'Say it out loud',W/2,H*.86,13,C.tx,700)}
 if(v==='count'){const[e,s]=CNT[Math.min(O.k,2)],ws=words(s),rs=rowRects(ws.length,.3,.18);wr(g,e,W/2,H*.13,34);
  ws.forEach((w,i)=>pill(g,rs[i],A.alpha(C.or,i<O.lit?.4:.14),O.bad===i?C.rd:C.tx,O.bad===i?4:2));ws.forEach((w,i)=>wr(g,w,rs[i].x+rs[i].w/2,rs[i].y+rs[i].h/2,ws.length>5?11:14));
  wr(g,'One finger for each word',W/2,H*.6,12,C.tx,600);wr(g,'Counted: '+O.done+' of 3',W/2,H*.68,11,C.tx,600);hand(g,ws.length,O.lit)}
 if(v==='write'){const[e,s]=WR[Math.min(O.k,1)],ws=words(s),slots=rowRects(ws.length,.3,.15);wr(g,e,W*.12,H*.12,30);wr(g,'I said: “'+s+'”',W*.56,H*.12,12,C.tx,700);
  slots.forEach((r,i)=>{pill(g,r,A.alpha(O.line[i]!=null?C.gr:C.ln,.18),C.tx);if(O.line[i]!=null){const t=ws[O.line[i]];wr(g,i===0?t:t,r.x+r.w/2,r.y+r.h/2,ws.length>5?11:13,C.tx,800)}});
  if(O.line.length===ws.length)wr(g,'.',slots[ws.length-1].x+slots[ws.length-1].w+3,H*.4,18,C.tx,900);
  const cr=rowRects(O.chips.length,.66,.15);O.chips.forEach((ci,i)=>{if(O.grab&&O.grab.i===i)return;pill(g,cr[i],A.alpha(C.or,.2),O.bad===i?C.rd:C.tx,O.bad===i?4:2);wr(g,ws[ci],cr[i].x+cr[i].w/2,cr[i].y+cr[i].h/2,ws.length>5?11:13)});
  if(O.grab)wr(g,ws[O.chips[O.grab.i]],O.grab.x,O.grab.y,14,C.tx,800);wr(g,'Written: '+O.done+' of 2',W/2,H*.9,11,C.tx,600)}
 if(v==='check'){const[s,gp]=MISS[Math.min(O.k,2)],full=words(s),ws=full.filter((_,i)=>i!==gp||O.fixed),rs=rowRects(ws.length,.4,.15);
  wr(g,'I said: “'+s+'”',W/2,H*.12,12,C.tx,700);wr(g,'I wrote:',W/2,H*.3,12,C.tx,600);ws.forEach((w,i)=>{pill(g,rs[i],A.alpha(O.fixed&&i===gp?C.gr:C.cy,.16),C.tx);wr(g,w,rs[i].x+rs[i].w/2,rs[i].y+rs[i].h/2,ws.length>6?10:13)});
  if(!O.fixed)for(let i=0;i<=ws.length;i++){const x=i===0?rs[0].x-2:i===ws.length?rs[i-1].x+rs[i-1].w+2:(rs[i-1].x+rs[i-1].w+rs[i].x)/2;g.fillStyle=O.bad===i?C.rd:C.vi;g.beginPath();g.arc(Math.max(5,Math.min(W-5,x)),H*.62,5,0,7);g.fill()}
  wr(g,O.fixed?'Now it matches what I said.':'Tap the dot where a word went missing',W/2,H*.72,12,C.tx,700);wr(g,'Fixed: '+O.done+' of 3',W/2,H*.84,11,C.tx,600)}
 if(v==='hold'){const[e,s]=HOLD[Math.min(O.k,1)],ws=words(s);wr(g,e,W/2,H*.12,34);
  if(!O.hidden){bubble(g,s,1);wr(g,'Said it '+O.says+' times. Then hide it.',W/2,H*.66,12,C.tx,700)}
  else{const slots=rowRects(ws.length,.3,.15);slots.forEach((r,i)=>{pill(g,r,A.alpha(O.line[i]!=null?C.gr:C.ln,.18),C.tx);if(O.line[i]!=null)wr(g,O.line[i],r.x+r.w/2,r.y+r.h/2,12,C.tx,800)});
   const cr=rowRects(O.chips.length,.62,.15);O.chips.forEach((t,i)=>{pill(g,cr[i],A.alpha(C.vi,.16),O.bad===i?C.rd:C.tx,O.bad===i?4:2);wr(g,t,cr[i].x+cr[i].w/2,cr[i].y+cr[i].h/2,11)})}
  wr(g,'From memory: '+O.done+' of 2',W/2,H*.9,11,C.tx,600)}
 A.fx.draw(g)}
const no=t=>{A.sound.miss();note(t);A.redraw()},yay=t=>{A.sound.pop();note(t);pad();A.redraw();O.want()};
const later=(fn,ms)=>{const t=O.tok;setTimeout(()=>{if(t===O.tok){fn();pad();A.redraw()}},A.reduced()?20:ms)};
function say(){if(O.says>=3&&view()==='say')return;O.says++;A.sound.tick();if(view()==='hold'){note(`“${HOLD[O.k][1]}” Said it ${O.says} times.`);pad();return A.redraw()}
 if(O.says<3){note(`“${PIC['🐶']}” Said ${O.says} time${O.says>1?'s':''}. Say it again.`);pad();return A.redraw()}yay('Three times! Now the sentence is ready to write.')}
function tapWord(i){const ws=words(CNT[O.k][1]);if(O.k>2)return;if(i<O.lit){O.bad=i;return no(`You counted “${ws[i]}” already. One finger for each word, once.`)}
 if(i>O.lit){O.bad=i;return no(`Go in the order you say it. The next word is “${ws[O.lit]}”.`)}O.bad=-1;O.lit++;A.sound.tick();
 if(O.lit<ws.length){note(ws.slice(0,O.lit).join(' ')+'… '+O.lit);return A.redraw()}O.done++;const n=ws.length;yay(`${n} words, ${n} fingers: “${CNT[O.k][1]}”`);later(()=>{O.k++;O.lit=0},800)}
function chipsFor(n){const a=[...Array(n).keys()];return a.map((_,i)=>a[(i*3+1)%n]).filter((v,i,s)=>s.indexOf(v)===i).concat(a).filter((v,i,s)=>s.indexOf(v)===i)}
function place(i){O.grab=null;const ws=words(WR[O.k][1]);if(O.k>1||i<0)return A.redraw();const ci=O.chips[i],want=O.line.length;
 if(ws[ci]!==ws[want]){O.bad=i;return no(`You said “${ws.slice(0,want).join(' ')||'…'} ${ws[want]}”. The next word you said is “${ws[want]}”.`)}
 O.bad=-1;O.line.push(ci);O.chips.splice(i,1);A.sound.tick();if(O.line.length<ws.length){note(ws.slice(0,O.line.length).join(' '));pad();return A.redraw()}
 O.done++;yay(`Written: “${WR[O.k][1]}” Same words, same order as I said.`);later(()=>{O.k++;O.line=[];if(O.k<2)O.chips=chipsFor(words(WR[O.k][1]).length)},800)}
function gapAt(i){const[s,gp]=MISS[O.k]||[];if(s==null||O.fixed)return;if(i!==gp){O.bad=i;const ws=words(s).filter((_,j)=>j!==gp);return no(`Read it slowly. “${ws.slice(0,i).join(' ')||'(start)'}” matches what you said there. Look further on.`)}
 O.bad=-1;O.fixed=true;O.done++;yay(`“${words(s)[gp]}” was missing. Reading it back caught it.`);later(()=>{O.k++;O.fixed=false},900)}
function hide(){if(O.says<2)return no('Say it at least 2 times first, so it sticks.');const[,s,extra]=HOLD[O.k],ws=words(s);O.hidden=true;O.line=[];O.chips=ws.slice().reverse().concat([extra]);note('Hidden! Build it from memory.');pad();A.redraw()}
function pick(i){const[,s,extra]=HOLD[O.k]||[];if(!s||!O.hidden)return;const ws=words(s),want=ws[O.line.length],t=O.chips[i];
 if(t!==want){O.bad=i;return no(t===extra?`Say it in your head again. It was not “${extra}”.`:`Not yet. Say the sentence in your head: what comes after “${O.line[O.line.length-1]||'the start'}”?`)}
 O.bad=-1;O.line.push(t);O.chips.splice(i,1);A.sound.tick();if(O.line.length<ws.length){pad();return A.redraw()}
 O.done++;yay(`“${s}” You held it in your head!`);later(()=>{O.k++;O.hidden=false;O.says=0;O.line=[];O.chips=[]},900)}
function pad(){if(!keys)return;keys.innerHTML='';const v=view(),K=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},keys,t);b.onclick=fn};
 if(v==='say'&&O.says<3)K('🗣️ Say it',say,'Say the sentence out loud');
 if(v==='count'&&O.k<3)words(CNT[O.k][1]).forEach((w,i)=>K(w,()=>tapWord(i),'Finger for the word '+w));
 if(v==='write'&&O.k<2)O.chips.forEach((ci,i)=>K(words(WR[O.k][1])[ci],()=>place(i),'Write the word '+words(WR[O.k][1])[ci]));
 if(v==='check'&&O.k<3&&!O.fixed){const ws=words(MISS[O.k][0]).filter((_,j)=>j!==MISS[O.k][1]);for(let i=0;i<=ws.length;i++)K(i===0?'⬚ '+ws[0]:i===ws.length?ws[i-1]+' ⬚':ws[i-1]+' ⬚ '+ws[i],()=>gapAt(i),'Missing word '+(i===0?'at the start':i===ws.length?'at the end':'between '+ws[i-1]+' and '+ws[i]))}
 if(v==='hold'&&O.k<2){if(!O.hidden){K('🗣️ Say it',say,'Say the sentence out loud');K('🙈 Hide it',hide,'Hide the sentence')}else O.chips.forEach((t,i)=>K(t,()=>pick(i),'Next word '+t))}}
function down(p){const v=view();
 if(v==='say'&&p.y>A.H*.3&&p.y<A.H*.6)say();
 if(v==='count'&&O.k<3){const rs=rowRects(words(CNT[O.k][1]).length,.3,.18),i=rs.findIndex(r=>on(p,r));if(i>=0)tapWord(i)}
 if(v==='write'&&O.k<2){const i=rowRects(O.chips.length,.66,.15).findIndex(r=>on(p,r));if(i>=0){O.grab={i,x:p.x,y:p.y,y0:p.y};return true}}
 if(v==='check'&&O.k<3&&!O.fixed){const ws=words(MISS[O.k][0]).length-1,rs=rowRects(ws,.4,.15);let best=-1,bd=1e9;for(let i=0;i<=ws;i++){const x=i===0?rs[0].x:i===ws?rs[i-1].x+rs[i-1].w:(rs[i-1].x+rs[i-1].w+rs[i].x)/2,d=Math.abs(p.x-x);if(d<bd&&Math.abs(p.y-A.H*.6)<A.H*.2){bd=d;best=i}}if(best>=0)gapAt(best)}
 if(v==='hold'&&O.hidden){const i=rowRects(O.chips.length,.62,.15).findIndex(r=>on(p,r));if(i>=0)pick(i)}return false}
function move(p){if(O.grab){O.grab.x=p.x;O.grab.y=p.y;A.redraw()}}
function up(p){if(!O.grab)return;const g=O.grab;place(p.y<A.H*.52||Math.abs(p.y-g.y0)<10?g.i:-1)}
const fin=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const run=(fs,ms)=>{const t=++O.tok;fs.forEach((fn,j)=>setTimeout(()=>{if(t===O.tok)fn()},A.reduced()?j*30+30:(j+1)*ms))};
const fresh=()=>{O.tok++;Object.assign(O,{want:()=>{},says:0,k:0,lit:0,line:[],done:0,hidden:false,chips:[],grab:null,bad:-1,fixed:false})};
const nextChip=()=>{const ws=words(WR[O.k][1]);return O.chips.findIndex(ci=>ws[ci]===ws[O.line.length])};
const steps=[
{h:'Say it out loud',p:'Look at the picture. Before you write, say your sentence out loud. Say it again, and again.',
 predict:{q:'Which sentence is easier to remember?',opts:['One I said once','One I said 3 times'],ans:1},task:'Say it 3 times',
 show:()=>{steps[0].go();run([say,say,say],400)},go:()=>{fresh();note('The dog runs to the park. Say it out loud.');pad();O.want=fin(0,()=>O.says>=3,'Saying it again and again helps you hold it.')}},
{h:'Count the words',p:'Say it slowly. Put up one finger for each word.',
 predict:{q:'How many words in “The cat naps.”?',opts:['11, one for each letter','3'],ans:1},task:'Count 3 sentences',
 show:()=>{steps[1].go();const f=[];[3,6,4].forEach((n,s)=>{for(let i=0;i<n;i++)f.push(()=>tapWord(O.lit));f.push(()=>{},()=>{},()=>{})});run(f,240)},
 go:()=>{fresh();note('The cat naps. Tap each word as you say it.');pad();O.want=fin(1,()=>O.done>=3,'A finger for each word tells you how many words to write.')}},
{h:'Write it down',p:'Now write the words in the same order you said them.',task:'Write 2 sentences',
 show:()=>{steps[2].go();const f=[];[6,4].forEach(n=>{for(let i=0;i<n;i++)f.push(()=>place(nextChip()));f.push(()=>{},()=>{},()=>{})});run(f,260)},
 go:()=>{fresh();O.chips=chipsFor(6);note('I can see a big ship. Write the first word.');pad();O.want=fin(2,()=>O.done>=2,'Said first, so every word went down in order.')}},
{h:'Read it back',p:'Read what you wrote. Does it say what you said? Find the gap.',
 predict:{q:'You said it, then wrote it. Do you need to read it back?',opts:['No, it must be right','Yes, a word can go missing'],ans:1},task:'Fix 3 sentences',
 show:()=>{steps[3].go();run([()=>gapAt(2),()=>{},()=>{},()=>{},()=>gapAt(1),()=>{},()=>{},()=>{},()=>gapAt(6)],330)},
 go:()=>{fresh();note('I wrote: The dog to the park. What is missing?');pad();O.want=fin(3,()=>O.done>=3,'Reading back finds words your hand left out.')}},
{h:'Hold it in your head',p:'Say it 2 or 3 times. Hide it. Now write it from memory.',task:'Write 2 from memory',
 show:()=>{steps[4].go();const f=[];[5,6].forEach((n,s)=>{f.push(say,say,hide);for(let i=0;i<n;i++)f.push(()=>pick(O.chips.indexOf(words(HOLD[O.k][1])[O.line.length])));f.push(()=>{},()=>{},()=>{},()=>{})});run(f,220)},
 go:()=>{fresh();note('Sam kicks the red ball. Say it, then hide it.');pad();O.want=fin(4,()=>O.done>=2,'Said aloud, held in your head, then written.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>O.want()});
const QS=[['What should you do first?',[['Say my sentence out loud','ok'],['Start writing straight away','rush'],['Pick a pencil colour','off']]],
 ['How many words in “I see a cat.”?',[['4','ok'],['8','letters'],['1','whole']]],
 ['Ali said: “The fox ran away.” He wrote: “The fox away.” What is wrong?',[['A word is missing','ok'],['Nothing','none'],['Too many words','extra']]],
 ['When you are done writing, what next?',[['Read it back','ok'],['Stop, it is right','none'],['Rub it all out','rubout']]],
 ['You said: “My cat is black.” Which did you write?',[['My cat is black.','ok'],['My black is cat.','order'],['My dog is black.','swap']]],
 ['Why say it 2 or 3 times?',[['So I remember it','ok'],['So it gets longer','longer'],['So I can skip writing','skip']]]];
function why(t){let m='Say it, count the words, write it, then read it back.';
 if(t==='rush')m='Writing first makes it easy to lose the words. Say it out loud first.';
 if(t==='off')m='The pen can wait. Say your sentence first so you know the words.';
 if(t==='letters')m='That counts letters. Count words: I, see, a, cat. That is 4.';
 if(t==='whole')m='A sentence has many words. Put up a finger for each: 4.';
 if(t==='none')m='Read it back: “The fox … away.” The word “ran” is missing.';
 if(t==='extra')m='It has fewer words than he said, not more. “ran” is missing.';
 if(t==='rubout')m='No need. Read it back and fix just the missing bit.';
 if(t==='order')m='The words are mixed up. Write them in the order you said them.';
 if(t==='swap')m='You said cat, not dog. Read it back and check each word.';
 if(t==='longer')m='Saying it again does not make it longer. It helps you remember.';
 if(t==='skip')m='You still write it. Saying it first helps you write it well.';
 return m}
function ask(){q++;const[qq,ops]=QS[q%QS.length],r=q%3;box.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=box.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>grade(t)});note('Challenge: '+qq);A.redraw()}
function grade(t){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?'✓ Yes! Streak: '+streak+'.':'✗ '+why(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{box.hidden=A.step!==5;keys.hidden=A.step===5;pad()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);keys=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);box=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});pad()}});
A.start()})})();
