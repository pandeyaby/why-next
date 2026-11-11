/* Flagship – reading for meaning (ages 5–6): Bip the robot says every word right but does not get it. Match a sentence
   to its picture, spot sentences that do not make sense, fix a misread word, place things where the words say, retell. */
(()=>{
const PIC=[['🐱','🎩','ok'],['🎩','🐱','swap'],['🐱','mat','looks']];
const SEN=[['I put on my coat, as it was cold.','🧥',1,'A coat keeps you warm. It makes sense.'],
 ['We swam in the cake.','🎂',0,'You cannot swim in a cake! It should say lake.'],
 ['The frog can hop.','🐸',1,'Frogs hop. It makes sense.'],
 ['I rode my bike to the bark.','🐶',0,'A bark is a dog sound. You ride to the park!']];
const FIX=[{s:'Mum put the milk in the frog.',bad:6,cand:[3,4,6],pic:'🐸',opts:[['fridge','fridge','ok'],['frost','❄️','looks'],['from','❓','nofit']]},
 {s:'Dad cut the bread with a knot.',bad:6,cand:[1,3,6],pic:'🪢',opts:[['kite','🪁','looks'],['knife','🔪','ok'],['knee','🦵','looks']]}];
const ITEMS=[['⚽','ball','under','The ball goes under the table.'],['🐱','cat','bed','The cat goes on the bed.'],['🦆','duck','next','The duck goes next to the table.']];
const ZN={on:'on the table',under:'under the table',bed:'on the bed',next:'next to the table'};
const PAN=[[['👦','😢'],'Max lost his kite.'],[['👦','🔎','🌳'],'He looked in a tree.'],[['🪁','🌳'],'It was stuck at the top!']],SHOW=[2,0,1];
VIS.reg('flagmeaning',c=>{let A,pad,quiz;c.fig.classList.add('young');const G={};
const mode=()=>['say','sense','fix','place','tell','quiz'][A.step];
function speak(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
const big=n=>A.narrow?n:Math.round(n*1.15),F=(w,n)=>`${w} ${big(n)}px system-ui,sans-serif`;
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function tile(g,r,col,a,thick){g.fillStyle=A.alpha(col,a||.14);A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.strokeStyle=col;g.lineWidth=thick?4:2;g.stroke()}
function say(g,t,x,y,n,col,w){g.font=F(w||800,n);g.textAlign='center';g.textBaseline='middle';g.fillStyle=col;g.fillText(t,x,y,A.W-24)}
function emo(g,e,x,y,n){g.font=`${Math.round(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText(e,x,y)}
const pill=(t,x,y,bg)=>A.paint.label(t,x,y,{font:F(800,12),bg});
function cardsR(n,y,h){const gap=10,w=(A.W-20-gap*(n-1))/n;return[...Array(n)].map((_,i)=>({x:10+i*(w+gap),y,w,h}))}
function para(g,t,r,n){g.font=F(800,n);const out=[];let l='';t.split(' ').forEach(w=>{const s=l?l+' '+w:w;if(g.measureText(s).width>r.w-24&&l){out.push(l);l=w}else l=s});out.push(l);
 const lh=big(n)*1.35,y0=r.y+r.h/2-(out.length-1)*lh/2;out.forEach((s,i)=>say(g,s,r.x+r.w/2,y0+i*lh,n,A.col.tx))}
function words(g,ws,r,fs){g.font=F(800,fs);const sp=g.measureText(' ').width+6,lh=big(fs)*1.9,out=[];let x=r.x+14,y=r.y+big(fs)*1.6;
 ws.forEach((w,i)=>{const tw=g.measureText(w).width;if(x>r.x+14&&x+tw>r.x+r.w-14){x=r.x+14;y+=lh}out.push({x:x-5,y:y-big(fs)*1.05,w:tw+10,h:big(fs)*1.55,i,w0:w,tx:x,ty:y});x+=tw+sp});return out}
function fridge(g,x,y,s){g.fillStyle='#e2e8f0';g.strokeStyle='#475569';g.lineWidth=3;g.fillRect(x-s*.3,y-s*.5,s*.6,s);g.strokeRect(x-s*.3,y-s*.5,s*.6,s);g.beginPath();g.moveTo(x-s*.3,y-s*.1);g.lineTo(x+s*.3,y-s*.1);g.stroke();g.fillStyle='#475569';g.fillRect(x+s*.18,y-s*.4,4,s*.2)}
const pageR=h=>({x:10,y:10,w:A.W-20,h:A.H*h});
// ---------- drawing ----------
function drawSay(g){const C=A.col,p=pageR(.2);tile(g,p,C.mu,.07);para(g,'The cat sat on the hat.',p,19);
 const by=p.y+p.h+A.H*.12;emo(g,'🤖',40,by,52);const b={x:76,y:by-A.H*.09,w:A.W-86,h:A.H*.18};tile(g,b,C.vi,.1);
 para(g,G.heard?'"The cat sat on the hat." Where did the cat sit? I do not know!':'Tap ▶ to hear Bip read.',b,14);
 G.cards=cardsR(3,A.H*.56,A.H*.4);G.cards.forEach((q,i)=>{const[t,b2,tag]=PIC[i],bad=G.miss===tag,ok=G.got&&tag==='ok',s=Math.min(q.w*.5,q.h*.3);
  tile(g,q,ok?C.gr:bad?C.rd:C.cy,.12,ok||bad);emo(g,t,q.x+q.w/2,q.y+q.h*.36,s);
  if(b2==='mat'){g.fillStyle='#92400e';g.fillRect(q.x+q.w*.2,q.y+q.h*.7,q.w*.6,10)}else emo(g,b2,q.x+q.w/2,q.y+q.h*.36+s*.9,s)})}
function drawSense(g){const C=A.col,p=pageR(.2),k=Math.min(G.j,3),S=SEN[k];tile(g,p,C.mu,.07);para(g,S[0],p,18);
 say(g,`Sentence ${k+1} of 4`,A.W/2,p.y+p.h+16,12,C.mu,700);emo(g,S[1],A.W/2,A.H*.47,Math.min(90,A.H*.22));
 if(G.miss)pill('look again',A.W/2,A.H*.64,'#b91c1c');
 G.cards=cardsR(2,A.H*.72,A.H*.24);G.cards.forEach((q,i)=>{tile(g,q,i?C.rd:C.gr,.12);say(g,i?'👎 No sense':'👍 Makes sense',q.x+q.w/2,q.y+q.h/2,14,C.tx)})}
function drawFix(g){const C=A.col,R=FIX[Math.min(G.r,1)],p=pageR(.24),ws=R.s.split(' ');tile(g,p,C.mu,.07);
 if(G.fixed[G.r])ws[R.bad]=R.opts.find(o=>o[2]==='ok')[0]+'.';G.boxes=words(g,ws,p,18);
 G.boxes.forEach(b=>{if(b.i===R.bad&&(G.found||G.fixed[G.r]))tile(g,b,G.fixed[G.r]?C.gr:C.or,.22,true);else if(G.miss==='w'+b.i)tile(g,b,C.rd,.18,true);
  g.font=F(800,18);g.textAlign='left';g.textBaseline='alphabetic';g.fillStyle=C.tx;g.fillText(b.w0,b.tx,b.ty)});
 const cy=p.y+p.h+A.H*.15,ok=G.fixed[G.r];emo(g,G.r?'🍞':'🥛',A.W*.35,cy,58);
 if(ok&&!G.r)fridge(g,A.W*.65,cy,80);else emo(g,ok?'🔪':R.pic,A.W*.65,cy,58);if(!ok)pill('Does that make sense?',A.W/2,cy+48,'#b45309');
 G.cards=G.found&&!ok?cardsR(3,A.H*.7,A.H*.26):null;if(G.cards)G.cards.forEach((q,i)=>{const[w,e,tag]=R.opts[i],bad=G.miss===tag+i;tile(g,q,bad?C.rd:C.cy,.12,bad);
  if(e==='fridge')fridge(g,q.x+q.w/2,q.y+q.h*.4,q.h*.45);else emo(g,e,q.x+q.w/2,q.y+q.h*.4,Math.min(44,q.h*.4));say(g,w,q.x+q.w/2,q.y+q.h*.82,15,C.tx)})}
function scene(){const fl=A.H*.9,tt=fl-A.H*.32;return{fl,T:{x:A.W*.06,y:tt,w:A.W*.4,h:14},bed:{x:A.W*.66,y:fl-A.H*.24,w:A.W*.32,h:A.H*.24},
 next:{x:A.W*.47,y:fl-A.H*.2,w:A.W*.18,h:A.H*.2},under:{x:A.W*.06,y:tt+14,w:A.W*.4,h:fl-tt-14},on:{x:A.W*.06,y:tt-A.H*.16,w:A.W*.4,h:A.H*.16}}}
const spot=(S,z)=>{const r=S[z];return{x:r.x+r.w/2,y:z==='on'?r.y+r.h*.6:z==='bed'?r.y+r.h*.25:r.y+r.h*.55}};
function drawPlace(g){const C=A.col,S=scene(),k=Math.min(G.k,2),p=pageR(.16);tile(g,p,C.mu,.07);para(g,ITEMS[k][3],p,17);
 g.strokeStyle=C.mu;g.lineWidth=3;g.beginPath();g.moveTo(8,S.fl);g.lineTo(A.W-8,S.fl);g.stroke();
 g.fillStyle='#b45309';g.fillRect(S.T.x,S.T.y,S.T.w,S.T.h);g.fillRect(S.T.x+6,S.T.y,10,S.fl-S.T.y);g.fillRect(S.T.x+S.T.w-16,S.T.y,10,S.fl-S.T.y);
 emo(g,'🛏️',S.bed.x+S.bed.w/2,S.bed.y+S.bed.h*.6,Math.min(S.bed.w*1.1,S.bed.h*1.1));
 G.put.forEach(([i,z])=>{const q=spot(S,z);emo(g,ITEMS[i][0],q.x+(z==='on'?0:i*6),q.y,40)});
 if(G.k<3){const at=G.at&&G.held?G.at:{x:A.W-40,y:p.y+p.h+40};if(!G.held)tile(g,{x:at.x-32,y:at.y-32,w:64,h:64},C.or,.16,true);emo(g,ITEMS[G.k][0],at.x,at.y,44)}
 if(G.miss)pill(ZN[G.miss]+'?',A.W/2,p.y+p.h+20,'#b91c1c')}
function drawTell(g){const C=A.col,p=pageR(.3);tile(g,p,C.mu,.07);para(g,PAN.map(x=>x[1]).join(' '),p,16);
 G.cards=cardsR(3,A.H*.4,A.H*.5);G.cards.forEach((q,i)=>{const k=SHOW[i],n=G.order.indexOf(k),bad=G.miss===k;tile(g,q,n>=0?C.gr:bad?C.rd:C.cy,.12,n>=0||bad);
  const es=PAN[k][0];es.forEach((e,j)=>emo(g,e,q.x+q.w/2,q.y+q.h*(.25+j*.22),Math.min(40,q.w*.4)));if(n>=0)pill(['first','next','last'][n],q.x+q.w/2,q.y+q.h-14,'#047857')})}
function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.04:.3);g.fillRect(0,0,W,H);const m=mode();
 if(m==='say')drawSay(g);if(m==='sense')drawSense(g);if(m==='fix')drawFix(g);if(m==='place')drawPlace(g);if(m==='tell')drawTell(g);if(m==='quiz')emo(g,'🤖',W/2,H/2,72);A.fx.draw(g)}
// ---------- actions ----------
function hear(){if(G.heard)return;G.heard=1;A.sound.pop();report('Bip said every word right, but cannot say where the cat sat. Saying words is not reading. Can you find the picture?')}
function pickPic(i){if(G.got)return;if(!G.heard)return report('First tap ▶ to hear Bip read.');const tag=PIC[i][2];let m;
 if(tag==='ok'){G.got=1;G.miss='';A.sound.pop();m='Yes! The cat is on the hat. You got the meaning, not just the words.'}
 else{G.miss=tag;A.sound.miss();m=tag==='swap'?'That is a hat on a cat. Read it again: the cat sat on the hat.':'Mat and hat sound alike. Look at the word: hat.'}report(m)}
function judge(yes){if(G.j>3)return;const S=SEN[G.j];if(!!yes===!!S[2]){G.miss='';A.sound.pop();const k=G.j;report((yes?'Yes! ':'Good catch! ')+S[3]);later([()=>{if(G.j===k){G.j++;report()}}],900);return}
 G.miss=1;A.sound.miss();report(yes?`Look at the picture. ${S[3]} So it does not make sense.`:`It does make sense. ${S[3]}`)}
function tapW(i){const R=FIX[G.r];if(G.found||G.fixed[G.r])return;if(i===R.bad){G.found=1;G.miss='';A.sound.pop();return report(`Yes, ${R.s.split(' ')[i].replace('.','')} does not make sense here. Which word fits?`)}
 G.miss='w'+i;A.sound.miss();report(`${R.s.split(' ')[i]} is fine. Which word is silly?`)}
function fix(i){const R=FIX[G.r];if(!G.found||G.fixed[G.r])return;const[w,,tag]=R.opts[i];
 if(tag==='ok'){G.fixed[G.r]=1;G.miss='';A.sound.pop();report(`Yes! ${R.s.replace(R.s.split(' ')[R.bad],w+'.')} Now it makes sense.`);if(!G.r)later([()=>{if(!G.r){G.r=1;G.found=0;report()}}],1300);return}
 G.miss=tag+i;A.sound.miss();report(tag==='looks'?`${w} looks a bit like it, but it does not make sense. Try again.`:`${w} does not make sense there. Try again.`)}
function drop(z){if(G.k>2)return;const it=ITEMS[G.k];if(z===it[2]){G.put.push([G.k,z]);G.miss='';A.sound.pop();G.k++;return report(`Yes, the ${it[1]} is ${ZN[z]}.`+(G.k<3?' Next one.':''))}
 G.miss=z;A.sound.miss();report(`That is ${ZN[z]}. Read the words again:`)}
function tell(k){if(G.order.includes(k))return;const n=G.order.length;if(k===n){G.order.push(k);G.miss=null;A.sound.pop();return report(['First: Max lost his kite.','Next: he looked in a tree.','Last: it was stuck at the top!'][n])}
 G.miss=k;A.sound.miss();report(n?'Read it again. What did Max do next?':'Read it again. What happened first?')}
function report(msg){const m=mode();let t='';
 if(m==='say')t=!G.heard?'Tap ▶ to hear Bip.':G.got?'':'Pick the picture.';
 if(m==='sense'&&G.j<4)t=SEN[G.j][0];
 if(m==='fix')t=FIX[G.r].s+(G.found?'':' Tap the silly word.');
 if(m==='place'&&G.k<3)t=ITEMS[G.k][3];
 if(m==='tell')t=`Story told: ${G.order.length} of 3.`;
 speak((msg?msg+' ':'')+t);buttons();G.onChange()}
function buttons(){if(!A||!pad)return;pad.innerHTML='';const m=mode(),b=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);e.onclick=f};
 if(m==='say'){if(!G.heard)b('▶ Bip reads it',hear);else if(!G.got)['Cat on hat','Hat on cat','Cat on mat'].forEach((x,i)=>b(x,()=>pickPic(i)))}
 if(m==='sense'&&G.j<4){b('👍 Makes sense',()=>judge(1));b('👎 Does not make sense',()=>judge(0))}
 if(m==='fix'){const R=FIX[G.r];if(!G.found)R.cand.forEach(i=>b(`🔎 ${R.s.split(' ')[i].replace('.','')}`,()=>tapW(i),`Is ${R.s.split(' ')[i].replace('.','')} the silly word?`));else if(!G.fixed[G.r])R.opts.forEach((o,i)=>b(`Try ${o[0]}`,()=>fix(i)))}
 if(m==='place'&&G.k<3)Object.keys(ZN).forEach(z=>b(`${ITEMS[G.k][0]} ${ZN[z]}`,()=>drop(z),`Put the ${ITEMS[G.k][1]} ${ZN[z]}`));
 if(m==='tell'&&G.order.length<3)SHOW.forEach(k=>{if(!G.order.includes(k))b(PAN[k][1],()=>tell(k))});A.redraw()}
// ---------- canvas input ----------
function down(p){const m=mode(),k=(G.cards||[]).findIndex(q=>inside(p,q));G.at=p;
 if(m==='say'){if(!G.heard)hear();else if(k>=0)pickPic(k)}
 if(m==='sense'&&k>=0)judge(k===0);
 if(m==='fix'){const w=(G.boxes||[]).find(b=>inside(p,b));if(w&&!G.found)tapW(w.i);else if(k>=0)fix(k)}
 if(m==='place'&&G.k<3&&Math.hypot(p.x-(A.W-40),p.y-(A.H*.16+50))<60){G.held=1;A.redraw();return true}
 if(m==='tell'&&k>=0)tell(SHOW[k]);return false}
function up(p){if(mode()!=='place'||!G.held)return;G.held=0;G.at=null;const S=scene(),z=['on','under','bed','next'].find(z=>inside(p,S[z]));if(z)drop(z);else report('Drop it in the room.')}
// ---------- steps ----------
const whenDone=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const later=(fns,ms)=>{const k=G.tok;fns.forEach((f,j)=>setTimeout(()=>{if(k===G.tok)f()},A.reduced()?j*20+20:(j+1)*ms))};
const fresh=()=>{G.tok=(G.tok||0)+1;Object.assign(G,{onChange:()=>{},heard:0,got:0,miss:'',j:0,r:0,found:0,fixed:[0,0],k:0,put:[],held:0,at:null,order:[],cards:null,boxes:null})};
const steps=[
 {h:'Say it or get it?',p:'Bip the robot reads every word right. But does Bip get it? Hear Bip, then pick the picture.',
  predict:{q:'Bip read every word right. Did Bip really read it?',opts:['Yes, every word was right','Only if Bip knows what it means'],ans:1},task:'Hear Bip, then pick the picture',
  show:()=>{steps[0].go();later([hear,()=>pickPic(0)],700)},go:()=>{fresh();report();G.onChange=whenDone(0,()=>G.got,'Reading means getting the meaning.')}},
 {h:'Does it make sense?',p:'Read each sentence. Look at the picture. Does it make sense?',task:'Check 4 sentences',
  show:()=>{steps[1].go();later(SEN.map((s,k)=>()=>{G.j=k;judge(s[2])}),900)},go:()=>{fresh();report();G.onChange=whenDone(1,()=>G.j>3,'If it is silly, a word was read wrong.')}},
 {h:'Fix it',p:'Bip read one word wrong. Tap the silly word. Then pick a word that makes sense.',
  predict:{q:'Bip reads: "Mum put the milk in the frog." What should Bip do?',opts:['Keep reading','Stop and read it again'],ans:1},task:'Fix 2 sentences',
  show:()=>{steps[2].go();later([()=>tapW(6),()=>fix(0),()=>{G.r=1;G.found=0;tapW(6)},()=>fix(1)],800)},go:()=>{fresh();report();G.onChange=whenDone(2,()=>G.fixed[0]&&G.fixed[1],'Stop, read it again, and fix it.')}},
 {h:'Picture it',p:'Make a picture from the words. Drag each thing to where the words say, or tap a button.',
  predict:{q:'"The ball goes under the table." Can it go on the table?',opts:['Yes, near the table is fine','No, under means below it'],ans:1},task:'Put 3 things where the words say',
  show:()=>{steps[3].go();later(ITEMS.map(x=>()=>drop(x[2])),700)},go:()=>{fresh();report();G.onChange=whenDone(3,()=>G.k>2,'Small words like on and under change the picture.')}},
 {h:'Tell it back',p:'Read the story. Tap the pictures in order: first, next, last.',task:'Retell the story in order',
  show:()=>{steps[4].go();later([0,1,2].map(k=>()=>tell(k)),700)},go:()=>{fresh();report();G.onChange=whenDone(4,()=>G.order.length===3,'If you can tell it back, you got it.')}},
 {h:'Challenge',p:'',go:()=>{fresh();pose()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>G.onChange()});
// ---------- challenge ----------
const QS=[['Bip says every word right, but cannot say what happened. Has Bip really read it?','🤖',[['No, reading means getting the meaning','ok'],['Yes, every word was right','words'],['Yes, Bip was fast','words']]],
 ['You read: "Sit on the chain." It does not make sense. What should you do?','🪑',[['Stop and read it again','ok'],['Keep going','skip'],['Shut the book','skip']]],
 ['Bip read: "I put on my rock." Which word makes sense?','🧦',[['sock','ok'],['rock','looks'],['rack','looks']]],
 ['"The bird is in the box." Where is the bird?','🐦',[['Inside the box','ok'],['On top of the box','small'],['Next to the box','small']]],
 ['"Max lost his kite. He looked in a tree. It was at the top!" What happened first?','🪁',[['Max lost his kite','ok'],['He found it in the tree','order'],['He looked in the tree','order']]],
 ['"The dog dug a hole in the mud." Which picture fits?','🐶',[['A dog digging in mud','ok'],['A dog in a bath','pic'],['A cat digging in mud','pic']]]];
function slip(tag){let m='Read it again and think about what it means.';
 if(tag==='words')m='Saying the words is only half. Reading means you know what they mean.';
 if(tag==='skip')m='If it does not make sense, stop and read it again.';
 if(tag==='looks')m='That word looks a bit alike, but it does not make sense. Check the meaning.';
 if(tag==='small')m='Small words like in, on and under change the picture. Read them carefully.';
 if(tag==='order')m='Tell it in order: what happened first, next, last?';
 if(tag==='pic')m='Check every word: who is it, and what are they doing?';return m}
let qk=-1,stars=0;
function pose(){qk++;const[q,e,ops]=QS[qk%QS.length],turn=qk%3;
 quiz.innerHTML=`<p><b>${e} ${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(turn).concat(ops.slice(0,turn)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(tag)});speak('Challenge: '+q);A.redraw()}
function mark(tag){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),good=tag==='ok';
 if(good){stars++;A.win()}else{stars=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Yes!':'✗ '+slip(tag)}${good?` Stars: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}
A=FK.shell(c,{steps,ratio:.7,tall:1.25,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Actions'},w);quiz=E('div',{class:'fl-chal'},A.below);
  fresh();A.gest({down,move:p=>{G.at=p;if(G.held)A.redraw()},up});buttons()}});
A.start()})})();
