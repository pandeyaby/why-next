/* Flagship – commas that stop a sentence being misread (ages 9–10; NC England Y4–Y6: use commas to clarify meaning or avoid
   ambiguity; CCSS L.4.2 / L.5.2c): set off the person spoken to, close an opener before the trap words, count list items,
   match each version to its meaning, and remove commas that break a sentence. */
(()=>{
/* person spoken to: [words, comma goes after word k, what it then means] */
const NAME=[[["Let's",'eat','Grandma.'],1,'We are asking Grandma to come and eat.'],[['Stop','Dad!'],0,'We are telling Dad to stop.'],
 [["Don't",'call','me','Jo.'],2,'We are asking Jo not to phone us.'],[['Help','Ella!'],0,'We are asking Ella to help us.'],[['Shall','we','eat','Max?'],2,'We are asking Max if it is time to eat.']];
/* opener trap: [words, trap word indexes (the comma goes just before the first), the misreading] */
const TRAP=[[['While','Mum','was','cooking','the','dog','ran','in.'],[4,5],'Mum was cooking the dog'],
 [['Most','of','the','time','travellers','worry','about','their','bags.'],[4],'time travellers worry about their bags'],
 [['As','the','boys','were','washing','the','baby','cried.'],[5,6],'the boys were washing the baby'],
 [['Inside','the','house','was','cold.'],[1,2],'"inside the house" is a place, and then nothing is cold'],
 [['After','we','ate','the','cat','curled','up.'],[3,4],'we ate the cat']];
/* how many things: [sentence, the things the commas make] */
const LIST=[['Dad bought cream cheese and bread.',['cream cheese','bread']],['Dad bought cream, cheese and bread.',['cream','cheese','bread']],
 ['I packed pens, paper clips and glue.',['pens','paper clips','glue']],['I packed pens, paper, clips and glue.',['pens','paper','clips','glue']],
 ['We ate apple pie, ice cream and jelly.',['apple pie','ice cream','jelly']]];
/* which meaning: [sentence, box 0 or 1, meaning pair, why] */
const PAIR=[['Grandma is asked to eat','Grandma is the food'],['I love 3 different things','I cook my family and pets'],['The teacher says Ben is late','Ben says the teacher is late']];
const MEAN=[["Let's eat, Grandma.",0,0,'The comma sets Grandma apart as the person spoken to.'],["Let's eat Grandma.",1,0,'With no comma, Grandma is the thing being eaten.'],
 ['I love cooking, my family and my pets.',0,1,'The commas make a list: cooking | my family | my pets.'],['I love cooking my family and my pets.',1,1,'With no comma, my family and my pets are what gets cooked.'],
 ['The teacher said Ben is late.',0,2,'With no commas, the teacher is the one speaking.'],['The teacher, said Ben, is late.',1,2,'The commas wrap "said Ben", so Ben is the speaker and the teacher is late.']];
/* stray comma: [words, the wrong one, why it is wrong, {index of a comma that stays: what it does}] */
const STRAY=[[['When','the','bell','rang,','the','dog,','barked.'],5,'A comma never cuts who does it (the dog) off from the verb (barked).',{3:'rang, closes the opener, so the dog is not read as part of it.'}],
 [['After','lunch,','we,','played','chess.'],2,'we is who played, so no comma goes between we and played.',{1:'lunch, closes the opener After lunch.'}],
 [['Sam,','can','you','pass,','the','salt?'],3,'pass the salt is one action. A comma there splits the verb from what is passed.',{0:'Sam, sets off the person spoken to.'}],
 [['We','got','apples,','pears,','and,','plums.'],4,'A comma never goes straight after and in a list.',{2:'apples, splits the first two things in the list.',3:'pears, is a choice: some writers put a comma before and.'}],
 [['Inside,','the','house,','was','cold.'],2,'the house is what was cold, so no comma goes between it and was.',{0:'Inside, closes the opener, so the house is read as the subject.'}]];
VIS.reg('flagambig',c=>{let A,g,pad,chal,qn=-1,run=0;const S={};
const INK='#111827',PAPER='#ffffff',RIM='#6b7280',GOOD='#065f46',SLIP='#9f1239',GAP='#fef3c7',GAPR='#b45309',CHIP='#ede9fe',CHIPI='#2e1065',LIVE='#1e40af';
const px=n=>Math.round(n*(A.narrow?.92:1.08)),ft=(n,w)=>`${w||700} ${px(n)}px system-ui,sans-serif`,hit=(p,r,m)=>{m=m||0;return !!r&&p.x>=r.x-m&&p.x<=r.x+r.w+m&&p.y>=r.y-m&&p.y<=r.y+r.h+m};
const PARTS=['name','trap','list','mean','stray','quiz'],cur=()=>PARTS[A.step],SETS={name:NAME,trap:TRAP,list:LIST,mean:MEAN,stray:STRAY},fin=k=>S[k].i>=SETS[k].length;
const alert=()=>A.col.dark?'#fda4af':SLIP;
function paper(){g.fillStyle=A.col.dark?'#0b1120':'#f9fafb';g.fillRect(0,0,A.W,A.H)}
function setF(n,w,al){g.font=ft(n,w);g.textAlign=al||'center';g.textBaseline='middle'}
function lines(t,x,y,w,n){const out=[];let row='';String(t).split(' ').forEach(word=>{const k=row?row+' '+word:word;if(g.measureText(k).width>w&&row){out.push(row);row=word}else row=k});out.push(row);
 const lh=px(n)*1.28;out.forEach((s,i)=>g.fillText(s,x,y+(i-(out.length-1)/2)*lh))}
function tile(r,t,o){o=o||{};g.fillStyle=o.fill||PAPER;A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();g.lineWidth=o.rim?3.4:1.4;g.strokeStyle=o.rim||RIM;g.stroke();
 if(t!=null){g.fillStyle=o.ink||INK;setF(o.n||18,o.w||750);lines(t,r.x+r.w/2,r.y+r.h/2,r.w-12,o.n||18)}}
function banner(t,won){setF(14,800);const w=Math.min(A.W-8,g.measureText(t).width+28),h=px(14)+14,y=A.H*.02;tile({x:A.W/2-w/2,y,w,h},null,{fill:won?'#d1fae5':PAPER,rim:won?GOOD:null});g.fillStyle=INK;g.fillText(t,A.W/2,y+h/2+1,w-12)}
function note(t,y,n,col){g.fillStyle=col||A.col.tx;setF(n||15,650);lines(t,A.W/2,y,A.W-26,n||15)}
function wrapUp(t,L){paper();banner(t,1);L.forEach((s,i)=>tile({x:12,y:A.H*(.15+i*.2),w:A.W-24,h:A.H*.17},s,{n:17,fill:'#ecfdf5'}))}
/* lay word tiles left to right, wrapping, each row centred; sp = space between tiles */
function row(words,y0,n,sp){setF(n,750);const h=px(n)+px(16),L=[[]];let x=0,y=y0;
 words.forEach((t,i)=>{const w=g.measureText(t).width+px(16);if(x+w>A.W-24&&x>0){L.push([]);x=0;y+=h+px(12)}L[L.length-1].push({t,i,x,y,w,h});x+=w+sp});
 L.forEach(r=>{if(!r.length)return;const last=r[r.length-1],off=(A.W-(last.x+last.w))/2;r.forEach(q=>q.x+=off)});return L.flat()}
/* ---- 1: the person spoken to ---- */
function nameRow(){return row(NAME[S.name.i][0],A.H*.34,21,px(34))}
function slots(){const W=nameRow();return W.slice(0,-1).map(r=>({k:r.i,x:r.x+r.w+2,y:r.y,w:px(30),h:r.h}))}
function commaTok(){const w=px(70),h=px(62);return S.grab?{x:S.grab.x-w/2,y:S.grab.y-h/2,w,h}:{x:A.W/2-w/2,y:A.H*.68,w,h}}
function drawName(){const s=S.name;paper();if(fin('name'))return wrapUp('All 5 commas placed',["Let's eat, Grandma.",'Stop, Dad!  Help, Ella!','The comma goes just before the name of the person you talk to.']);
 const [W,k,means]=NAME[s.i];banner(`Sentence ${s.i+1} of 5: drag the comma into a gap`);tile({x:14,y:A.H*.12,w:A.W-28,h:A.H*.14},'Make it mean: '+means,{n:15,fill:'#e0f2fe',ink:'#0c4a6e'});
 nameRow().forEach(r=>tile(r,r.t,{n:21}));slots().forEach(q=>{g.fillStyle=GAP;A.paint.rrect(q.x+3,q.y+4,q.w-6,q.h-8,6);g.fill();g.setLineDash([4,3]);g.strokeStyle=s.bad===q.k?SLIP:GAPR;g.lineWidth=2;g.stroke();g.setLineDash([])});
 if(s.msg)note(s.msg,A.H*.55,14,alert());tile(commaTok(),',',{n:34,w:900,fill:'#fde68a',ink:'#422006',rim:S.grab?LIVE:null})}
function placeName(k){const s=S.name;if(fin('name'))return;const [W,ans,means]=NAME[s.i];let m;
 if(k===ans){s.i++;s.msg='';s.bad=null;A.sound.pop();return speak(W.map((w,i)=>i===ans?w+',':w).join(' ')+' '+means)}
 const who=W[W.length-1].replace(/[.!?]$/,'');s.bad=k;A.sound.miss();
 m=`A comma after "${W[k]}" does not set off the person you are talking to. ${who} is that person, so the comma goes just before ${who}.`;s.msg=m;speak(m)}
/* ---- 2: the trap after an opener ---- */
const below=T=>Math.max(...T.map(r=>r.y+r.h))+px(44);
function trapRow(){return row(TRAP[S.trap.i][0],A.H*.36,21,px(10))}
function drawTrap(){const s=S.trap;paper();if(fin('trap'))return wrapUp('All 5 traps found',['While Mum was cooking, the dog ran in.','Most of the time, travellers worry.','A comma after the opener stops the next words joining it.']);
 const [W,trap,wrong]=TRAP[s.i];banner(`Sentence ${s.i+1} of 5: tap the first word that tricks you`);note('Read it with no comma. Where does your eye go wrong?',A.H*.18,15);
 const T=trapRow();T.forEach(r=>tile(r,r.t,{n:21,fill:s.bad===r.i?'#ffe4e6':PAPER,rim:s.bad===r.i?SLIP:null}));if(s.msg)note(s.msg,Math.max(A.H*.7,below(T)),14,alert())}
function pickTrap(i){const s=S.trap;if(fin('trap'))return;const [W,trap,wrong]=TRAP[s.i],cut=trap[0]-1;let m;
 if(trap.includes(i)){s.i++;s.msg='';s.bad=null;A.sound.pop();return speak(`Yes. With no comma you first read "${wrong}". Fixed: ${W.map((w,j)=>j===cut?w+',':w).join(' ')}`)}
 s.bad=i;A.sound.miss();if(i<trap[0])m=`"${W[i]}" is part of the opener, and it reads fine. Keep going: which word did your eye join to the opener by mistake?`;
 else m=`By "${W[i]}" you have already gone wrong. Look back to the words you first read as part of the opener.`;s.msg=m;speak(m)}
/* ---- 3: how many things ---- */
function counts(){const w=Math.min(px(78),(A.W-60)/4),h=px(70),gp=12,tot=4*w+3*gp;return[1,2,3,4].map((n,j)=>({n,x:A.W/2-tot/2+j*(w+gp),y:A.H*.71,w,h}))}
function drawList(){const s=S.list;paper();if(fin('list'))return wrapUp('All 5 lists counted',['cream cheese and bread: 2 things','cream, cheese and bread: 3 things','Each comma, and the and, starts a new thing.']);
 const [t,items]=LIST[s.i];banner(`List ${s.i+1} of 5: how many things?`);tile({x:14,y:A.H*.14,w:A.W-28,h:A.H*.16},t,{n:19});
 if(s.show){const n=s.show.length,w=Math.min(px(150),(A.W-30-(n-1)*8)/n);s.show.forEach((q,j)=>tile({x:A.W/2-(n*w+(n-1)*8)/2+j*(w+8),y:A.H*.36,w,h:A.H*.1},q,{n:14,fill:CHIP,ink:CHIPI}))}
 if(s.msg)note(s.msg,A.H*.57,14,alert());counts().forEach(r=>tile(r,String(r.n),{n:30,w:850,fill:s.bad===r.n?'#ffe4e6':'#e0f2fe',ink:'#0c4a6e',rim:s.bad===r.n?SLIP:null}))}
function countList(n){const s=S.list;if(fin('list'))return;const [t,items]=LIST[s.i];let m;
 if(n===items.length){s.i++;s.msg='';s.bad=null;s.show=null;A.sound.pop();return speak(`${n} things: ${items.join(' | ')}.`)}
 s.bad=n;s.show=items;A.sound.miss();
 if(n>items.length)m=`Too many. ${items.find(q=>q.includes(' '))?`"${items.find(q=>q.includes(' '))}" has no comma inside, so it is one thing. `:''}The commas give ${items.join(' | ')}.`;
 else m=`Too few. Each comma starts a new thing: ${items.join(' | ')}.`;s.msg=m;speak(m)}
/* ---- 4: which meaning ---- */
function boxes(){const y=A.H*.56,h=A.H*.3,w=(A.W-36)/2,P=PAIR[MEAN[S.mean.i][2]];return[{b:0,x:12,y,w,h,t:P[0]},{b:1,x:24+w,y,w,h,t:P[1]}]}
function card(){const w=Math.min(A.W-24,px(340)),h=px(62);return S.grab&&S.grab.card?{x:S.grab.x-w/2,y:S.grab.y-h/2,w,h}:{x:A.W/2-w/2,y:A.H*.17,w,h}}
function drawMean(){const s=S.mean;paper();if(fin('mean'))return wrapUp('All 6 cards matched',["Let's eat, Grandma. / Let's eat Grandma.",'cooking, my family and my pets: a list','The teacher, said Ben, is late: Ben speaks']);
 banner(`Card ${s.i+1} of 6: drag it to what it means`);boxes().forEach(r=>tile(r,r.t,{n:16,fill:r.b?'#fef9c3':'#dcfce7',rim:s.bad===r.b?SLIP:null}));
 tile(card(),MEAN[s.i][0],{n:17,rim:S.grab?LIVE:null});if(s.msg)note(s.msg,A.H*.42,13,alert())}
function sortMean(b){const s=S.mean;if(fin('mean'))return;const [t,ans,pair,why]=MEAN[s.i];let m;
 if(b===ans){s.i++;s.msg='';s.bad=null;A.sound.pop();return speak(`Yes. ${why}`)}
 s.bad=b;A.sound.miss();m=`Look at the commas again. ${why}`;s.msg=m;speak(m)}
/* ---- 5: the comma that breaks it ---- */
function strayRow(){return row(STRAY[S.stray.i][0],A.H*.3,21,px(10))}
function drawStray(){const s=S.stray;paper();if(fin('stray'))return wrapUp('All 5 stray commas gone',['When the bell rang, the dog barked.','We got apples, pears and plums.','No comma between who does it and the verb.']);
 banner(`Sentence ${s.i+1} of 5: tap the comma that should go`);const T=strayRow();T.forEach(r=>tile(r,r.t,{n:21,fill:s.bad===r.i?'#ffe4e6':PAPER,rim:s.bad===r.i?SLIP:null}));
 if(s.msg)note(s.msg,Math.max(A.H*.68,below(T)),14,alert())}
function cutStray(i){const s=S.stray;if(fin('stray'))return;const [W,bad,why,keep]=STRAY[s.i];let m;
 if(i===bad){s.i++;s.msg='';s.bad=null;A.sound.pop();return speak(`Gone: ${W.map((w,j)=>j===bad?w.replace(',',''):w).join(' ')} ${why}`)}
 s.bad=i;A.sound.miss();if(keep[i])m=`Keep that one: ${keep[i]}`;else m=`"${W[i]}" has no comma after it. Tap a word that ends in a comma.`;s.msg=m;speak(m)}
/* ---- pointer ---- */
function down(p){const k=cur();
 if(k==='trap'&&!fin('trap')){const r=trapRow().find(r=>hit(p,r));if(r)pickTrap(r.i)}
 if(k==='stray'&&!fin('stray')){const r=strayRow().find(r=>hit(p,r));if(r)cutStray(r.i)}
 if(k==='list'&&!fin('list')){const r=counts().find(r=>hit(p,r));if(r)countList(r.n)}
 if(k==='name'&&!fin('name')){if(hit(p,commaTok())){S.grab={x:p.x,y:p.y};A.redraw();return true}const q=slots().find(q=>hit(p,q,4));if(q)placeName(q.k)}
 if(k==='mean'&&!fin('mean')&&hit(p,card())){S.grab={card:1,x:p.x,y:p.y};A.redraw();return true}return false}
function move(p){if(S.grab){S.grab.x=p.x;S.grab.y=p.y;A.redraw()}}
function up(p){const d=S.grab;if(!d)return;S.grab=null;const k=cur();
 if(k==='name'){const q=slots().find(q=>hit(p,q,px(14)));if(q)return placeName(q.k)}
 if(k==='mean'){const b=boxes().find(r=>hit(p,r));if(b)return sortMean(b.b)}A.redraw()}
function reset(){run++;for(const k in S)delete S[k];Object.assign(S,{name:{i:0},trap:{i:0},list:{i:0},mean:{i:0},stray:{i:0},grab:null,check:()=>{}})}
function speak(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();S.check()}
function open(i,first,ok,msg){reset();speak(first);S.check=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function play(i,acts,ms){steps[i].go();const me=run;acts.forEach((f,j)=>setTimeout(()=>{if(me===run)f()},ms*(j+1)))}
function controls(){if(!pad)return;pad.innerHTML='';const k=cur(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='name'&&!fin('name')){const W=NAME[S.name.i][0];W.slice(0,-1).forEach((w,j)=>b(`${w} ,`,()=>placeName(j),`Put the comma after ${w}`))}
 if(k==='trap'&&!fin('trap'))TRAP[S.trap.i][0].forEach((w,j)=>b(w,()=>pickTrap(j),`${w} is where I first go wrong`));
 if(k==='list'&&!fin('list'))[1,2,3,4].forEach(n=>b(String(n),()=>countList(n),`${n} things`));
 if(k==='mean'&&!fin('mean'))PAIR[MEAN[S.mean.i][2]].forEach((t,j)=>b(t,()=>sortMean(j),`It means: ${t}`));
 if(k==='stray'&&!fin('stray'))STRAY[S.stray.i][0].forEach((w,j)=>b(w,()=>cutStray(j),`Take out the comma in ${w}`))}
const steps=[
{h:'Who are you talking to?',p:'When you talk to someone by name, a comma sets the name apart. Without it, the name can turn into part of the action.',
predict:{q:'Is "Let\'s eat Grandma." safe for Grandma?',opts:['yes, it is fine','no: it needs a comma'],ans:1},task:'Place all 5 commas',
show:()=>play(0,NAME.map(q=>()=>placeName(q[1])),600),go:()=>open(0,'Drag the comma into a gap.',()=>fin('name'),'A comma before the name means you are talking to that person.')},
{h:'The opener trap',p:'A sentence can start with an opener (While Mum was cooking). With no comma after it, your eye grabs the next words as part of the opener.',
predict:{q:'"Most of the time travellers worry about their bags." Who worries?',opts:['time travellers','travellers, most of the time'],ans:1},task:'Find all 5 traps',
show:()=>play(1,TRAP.map(q=>()=>pickTrap(q[1][0])),600),go:()=>open(1,'Tap the first word that tricks you.',()=>fin('trap'),'The comma goes after the opener, just before the trap.')},
{h:'Count the things',p:'In a list, commas and the last and split one thing from the next. Two words with no comma between them stay one thing.',
predict:{q:'"Dad bought cream cheese and bread." How many things?',opts:['3','2'],ans:1},task:'Count all 5 lists',
show:()=>play(2,LIST.map(q=>()=>countList(q[1].length)),600),go:()=>open(2,'Tap how many things are in the list.',()=>fin('list'),'Each comma starts a new thing.')},
{h:'Same words, new meaning',p:'Two sentences can have the very same words. Only the commas tell you which meaning the writer wants.',
predict:{q:'"The teacher, said Ben, is late." Who is late?',opts:['Ben','the teacher'],ans:1},task:'Match all 6 cards',
show:()=>play(3,MEAN.map(q=>()=>sortMean(q[1])),650),go:()=>open(3,'Drag the card to what it means.',()=>fin('mean'),'Commas move the meaning, not the words.')},
{h:'Too many commas',p:'A comma is not just a pause for breath. A comma between who does it and the verb, or straight after and, makes a sentence harder to read.',task:'Remove all 5 stray commas',
show:()=>play(4,STRAY.map(q=>()=>cutStray(q[1])),650),go:()=>open(4,'Tap the comma that should go.',()=>fin('stray'),'Every comma should do a job.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[
{q:'Which one asks Grandma to eat?',a:"Let's eat, Grandma.",o:[["Let's eat Grandma.",'With no comma, Grandma is the food.'],["Let's, eat Grandma.",'That comma splits Let\'s from eat, and Grandma is still the food.']]},
{q:'"When Ali called his dog came running." Where does the comma go?',a:'after called',o:[['after his','his dog goes together: it is the dog that came running.'],['after dog','That splits who came (his dog) from the verb (came).']]},
{q:'"We had fish, chips and peas." How many things?',a:'3',o:[['2','Each comma starts a new thing: fish | chips | peas.'],['4','and joins the last two things; it does not add one more.']]},
{q:'Which sentence is talking to Ravi?',a:'Ravi, pass the ball.',o:[['Pass the ball to Ravi.','Here Ravi gets the ball; nobody is talking to him.'],['Ravi passed the ball.','This tells us about Ravi. Nobody is speaking to him.']]},
{q:'Which sentence has a comma that should go?',a:'The red bus, stopped.',o:[['Today, the red bus stopped.','That comma closes the opener Today, so it stays.'],['Tom, the bus stopped!','That comma sets off Tom, the person spoken to.']]},
{q:'"After the children ate the cake was cut." Where does the comma go?',a:'after ate',o:[['after children','the children did the eating; do not cut them off from ate.'],['after cake','The cake was cut, not eaten. The comma goes after ate.']]}];
function ask(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,''],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=chal.querySelector('.fl-pick');ord.forEach(([v,msg])=>{c.el('button',{type:'button',class:'lbtn'},box,v).onclick=()=>judge(msg,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function judge(msg,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=!msg;if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+msg)+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':msg)}
function draw(){const k=cur();if(k==='quiz'){paper();banner('Challenge',1);["Let's eat, Grandma.",'While Mum was cooking, the dog ran in.','cream, cheese and bread: 3 things'].forEach((t,i)=>tile({x:14,y:A.H*(.2+i*.24),w:A.W-28,h:A.H*.18},t,{n:18}));return}
 ({name:drawName,trap:drawTrap,list:drawList,mean:drawMean,stray:drawStray})[k]();A.fx.draw(A.ctx)}
FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;controls()},
 init:B=>{A=B;g=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Comma buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});controls()}}).start()})})();
