/* Flagship – ordering events in time (ages 4–6, NC Y1 Measurement: "sequence events in chronological order using language
   [for example, before and after, next, first, today, yesterday, tomorrow, morning, afternoon and evening]"; EYFS
   Development Matters reception "begin to describe a sequence of events, real or fictional, using words such as first,
   then"). Drag picture cards into time slots: a seed growing (first, next, last), two jobs told with "before" and "after",
   the parts of a day as the sun moves, yesterday / today / tomorrow on a three-day strip, and a four-picture snowman story.
   Targets the slips that "before" means "the one you hear first", that evening comes straight after morning, and that
   yesterday and tomorrow are the same kind of "not today". */
(()=>{const FONT='Nunito,ui-rounded,system-ui,sans-serif';
const SCN=[
 {id:'plant',slots:['First','Next','Last'],cards:[['seed','Seed',0,'A seed comes first. It goes in the soil before anything grows.'],['shoot','Shoot',1,'The little shoot grows after the seed and before the flower.'],['flower','Flower',2,'The flower is last. It needs the shoot to grow first.']]},
 {id:'words',rounds:[{say:'Before you put on your shoes, put on your socks.',cards:[['shoe','Shoes',1,'"Before your shoes" means shoes come second. Socks go on first.'],['sock','Socks',0,'Socks go on first. The sentence says shoes, but socks are before.']]},
  {say:'Eat your lunch after you wash your hands.',cards:[['plate','Eat lunch',1,'"After you wash" means washing is first. Then you eat.'],['tap','Wash hands',0,'Wash first. You hear "eat" first, but you do it second.']]}],slots:['First','Then']},
 {id:'day',slots:['Morning','Afternoon','Evening'],cards:[['bowl','Breakfast',0,'Breakfast is in the morning, when the sun comes up.'],['slide','Play after lunch',1,'Lunch is in the middle of the day. After lunch is the afternoon.'],['bath','Bath and bed',2,'Bath and bed come in the evening, when the sun goes down.']]},
 {id:'days',slots:['Yesterday','Today','Tomorrow'],cards:[['tree','We went to the park',0,'The park is done. It happened yesterday, the day before today.'],['house','I am at nursery',1,'Nursery is now. Now is today.'],['cake','My party',2,'The party has not happened yet. It is tomorrow, the day after today.']]},
 {id:'snow',slots:['First','Next','Then','Last'],cards:[['ball','Roll a big ball',0,'You need a ball of snow first, before you can build.'],['man','Stack the snowman',1,'Stack it after you roll the ball.'],['face','Give him a face',2,'The face goes on after he is built.'],['melt','The sun melts him',3,'He melts last. You cannot melt a snowman you have not built.']]}];
VIS.reg('flagorder',c=>{let A,pads,quiz,qi=-1,streak=0;c.fig.classList.add('young');const S={};
const sc=()=>['plant','words','day','days','snow','quiz'][A.step];
const tell=s=>{c.say(s);if(A)A.cv.setAttribute('aria-label',s)};
const fs=n=>Math.round(n*(A.narrow?1:1.2));
function txt(g,s,x,y,n,colr,w){g.font=`${w||800} ${fs(n)}px ${FONT}`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=colr||A.col.tx;g.fillText(s,x,y,A.W-12)}
function wrapTxt(g,s,x,y,maxw,n,colr){g.font=`700 ${fs(n)}px ${FONT}`;const ws=s.split(' '),ls=[];let cur='';ws.forEach(w=>{const t=cur?cur+' '+w:w;if(g.measureText(t).width>maxw&&cur){ls.push(cur);cur=w}else cur=t});ls.push(cur);
 ls.forEach((l,i)=>txt(g,l,x,y+(i-(ls.length-1)/2)*fs(n)*1.2,n,colr,700))}
const top=()=>S.say?A.H*.16:A.H*.04;
function slotRect(i){const n=S.slots.length,gap=A.W*.03,room=A.H-homeRect(0).h-A.H*.04-top()-fs(16)-fs(30),w=Math.min((A.W-gap*(n+1))/n,room/1.05),x0=(A.W-(n*w+(n-1)*gap))/2;return{x:x0+i*(w+gap),y:top()+fs(16),w,h:w*1.05}}
function homeRect(j){const n=Math.max(2,S.cards.length),gap=A.W*.03,w=Math.min((A.W-gap*(n+1))/n,A.H*.32),x0=(A.W-(n*w+(n-1)*gap))/2;return{x:x0+j*(w+gap),y:A.H-w*1.05-A.H*.04,w,h:w*1.05}}
function icon(g,k,cx,cy,r){const K=A.col,ink=K.tx;g.lineWidth=Math.max(2,r*.08);g.strokeStyle=ink;g.lineJoin='round';
 const soil=()=>{g.fillStyle='#8a5a2b';g.fillRect(cx-r*.8,cy+r*.45,r*1.6,r*.4);g.strokeRect(cx-r*.8,cy+r*.45,r*1.6,r*.4)};
 const stem=h=>{g.beginPath();g.moveTo(cx,cy+r*.45);g.lineTo(cx,cy+r*.45-h);g.strokeStyle='#2f7d3a';g.lineWidth=Math.max(3,r*.12);g.stroke();g.strokeStyle=ink;g.lineWidth=Math.max(2,r*.08)};
 const leaf=(dx,y)=>{g.beginPath();g.ellipse(cx+dx,y,r*.22,r*.1,dx>0?-.5:.5,0,7);g.fillStyle='#3f9b4a';g.fill();g.stroke()};
 if(k==='seed'){soil();g.beginPath();g.ellipse(cx,cy+r*.62,r*.16,r*.1,0,0,7);g.fillStyle='#e8c27a';g.fill();g.stroke()}
 if(k==='shoot'){soil();stem(r*.5);leaf(-r*.2,cy+r*.05);leaf(r*.2,cy+r*.1)}
 if(k==='flower'){soil();stem(r*.85);leaf(r*.22,cy+r*.15);for(let a=0;a<6;a++){g.beginPath();g.arc(cx+Math.cos(a)*r*.25,cy-r*.4+Math.sin(a)*r*.25,r*.17,0,7);g.fillStyle='#e05a8a';g.fill();g.stroke()}g.beginPath();g.arc(cx,cy-r*.4,r*.15,0,7);g.fillStyle='#f4c20d';g.fill();g.stroke()}
 if(k==='sock'){g.beginPath();g.moveTo(cx-r*.15,cy-r*.7);g.lineTo(cx+r*.2,cy-r*.7);g.lineTo(cx+r*.2,cy+r*.2);g.lineTo(cx+r*.55,cy+r*.35);g.quadraticCurveTo(cx+r*.6,cy+r*.7,cx+r*.2,cy+r*.65);g.lineTo(cx-r*.15,cy+r*.55);g.closePath();g.fillStyle='#4f7fd6';g.fill();g.stroke()}
 if(k==='shoe'){g.beginPath();g.moveTo(cx-r*.6,cy+r*.5);g.lineTo(cx-r*.6,cy-r*.1);g.lineTo(cx-r*.1,cy-r*.1);g.quadraticCurveTo(cx+r*.1,cy+r*.2,cx+r*.6,cy+r*.25);g.lineTo(cx+r*.65,cy+r*.5);g.closePath();g.fillStyle='#c0392b';g.fill();g.stroke()}
 if(k==='plate'){g.beginPath();g.arc(cx,cy,r*.6,0,7);g.fillStyle='#f5f1e6';g.fill();g.stroke();g.beginPath();g.arc(cx,cy,r*.35,0,7);g.stroke();g.beginPath();g.arc(cx-r*.1,cy,r*.15,0,7);g.fillStyle='#e0a030';g.fill();g.beginPath();g.arc(cx+r*.15,cy+r*.08,r*.1,0,7);g.fillStyle='#3f9b4a';g.fill()}
 if(k==='tap'){g.fillStyle='#9aa4ad';g.fillRect(cx-r*.5,cy-r*.6,r*.7,r*.22);g.strokeRect(cx-r*.5,cy-r*.6,r*.7,r*.22);g.fillRect(cx+r*.05,cy-r*.6,r*.18,r*.45);g.strokeRect(cx+r*.05,cy-r*.6,r*.18,r*.45);
  for(let i=0;i<3;i++){g.beginPath();g.ellipse(cx+r*.14,cy+r*(.0+i*.25),r*.07,r*.1,0,0,7);g.fillStyle='#3b8fd9';g.fill()}}
 if(k==='bowl'){g.beginPath();g.arc(cx,cy,r*.6,0,Math.PI);g.closePath();g.fillStyle='#f2e3c2';g.fill();g.stroke();g.beginPath();g.moveTo(cx+r*.2,cy-r*.05);g.lineTo(cx+r*.55,cy-r*.6);g.stroke()}
 if(k==='slide'){g.beginPath();g.moveTo(cx-r*.6,cy+r*.6);g.lineTo(cx-r*.3,cy-r*.5);g.lineTo(cx-r*.1,cy-r*.5);g.lineTo(cx+r*.6,cy+r*.6);g.strokeStyle='#d07a1c';g.lineWidth=Math.max(3,r*.12);g.stroke();g.strokeStyle=ink;g.lineWidth=Math.max(2,r*.08);g.beginPath();g.moveTo(cx-r*.3,cy-r*.5);g.lineTo(cx-r*.3,cy+r*.6);g.stroke()}
 if(k==='bath'){g.beginPath();g.moveTo(cx-r*.65,cy);g.lineTo(cx+r*.65,cy);g.quadraticCurveTo(cx+r*.6,cy+r*.55,cx,cy+r*.55);g.quadraticCurveTo(cx-r*.6,cy+r*.55,cx-r*.65,cy);g.fillStyle='#e8f1f8';g.fill();g.stroke();for(let i=0;i<4;i++){g.beginPath();g.arc(cx-r*.4+i*r*.27,cy-r*.12,r*.12,0,7);g.fillStyle='#ffffff';g.fill();g.stroke()}}
 if(k==='tree'){g.fillStyle='#7a4a22';g.fillRect(cx-r*.08,cy,r*.16,r*.6);g.beginPath();g.arc(cx,cy-r*.2,r*.45,0,7);g.fillStyle='#3f9b4a';g.fill();g.stroke()}
 if(k==='house'){g.beginPath();g.rect(cx-r*.45,cy-r*.1,r*.9,r*.7);g.fillStyle='#f0d9a8';g.fill();g.stroke();g.beginPath();g.moveTo(cx-r*.6,cy-r*.1);g.lineTo(cx,cy-r*.65);g.lineTo(cx+r*.6,cy-r*.1);g.closePath();g.fillStyle='#c0392b';g.fill();g.stroke();g.fillStyle='#4f7fd6';g.fillRect(cx-r*.12,cy+r*.2,r*.24,r*.4)}
 if(k==='cake'){g.beginPath();g.rect(cx-r*.5,cy-r*.05,r,r*.6);g.fillStyle='#f3b6c8';g.fill();g.stroke();g.fillStyle='#ffffff';g.fillRect(cx-r*.5,cy-r*.05,r,r*.15);g.fillStyle='#4f7fd6';g.fillRect(cx-r*.05,cy-r*.45,r*.1,r*.4);g.beginPath();g.ellipse(cx,cy-r*.55,r*.07,r*.12,0,0,7);g.fillStyle='#f4a20d';g.fill()}
 const snow=(x,y,rr)=>{g.beginPath();g.arc(x,y,rr,0,7);g.fillStyle='#ffffff';g.fill();g.stroke()};
 if(k==='ball')snow(cx,cy+r*.2,r*.42);
 if(k==='man'||k==='face'){snow(cx,cy+r*.3,r*.35);snow(cx,cy-r*.25,r*.25);if(k==='face'){g.fillStyle=ink;g.beginPath();g.arc(cx-r*.08,cy-r*.3,r*.04,0,7);g.arc(cx+r*.08,cy-r*.3,r*.04,0,7);g.fill();g.beginPath();g.moveTo(cx,cy-r*.22);g.lineTo(cx+r*.25,cy-r*.18);g.lineTo(cx,cy-r*.15);g.fillStyle='#e67e22';g.fill()}}
 if(k==='melt'){g.beginPath();g.ellipse(cx,cy+r*.45,r*.6,r*.15,0,0,7);g.fillStyle='#bfe0f5';g.fill();g.stroke();g.beginPath();g.moveTo(cx-r*.1,cy+r*.4);g.lineTo(cx+r*.2,cy+r*.45);g.lineTo(cx-r*.1,cy+r*.5);g.fillStyle='#e67e22';g.fill();
  g.beginPath();g.arc(cx+r*.35,cy-r*.45,r*.2,0,7);g.fillStyle='#f4c20d';g.fill();g.stroke()}}
function sky(g,i,r){const K=A.col,cx=r.x+r.w/2,yy=[r.y+r.h*.5,r.y+r.h*.22,r.y+r.h*.5][i],xx=[r.x+r.w*.25,cx,r.x+r.w*.75][i];
 g.beginPath();g.arc(xx,yy,r.w*.09,0,7);g.fillStyle=i===2?'#e67e22':'#f4c20d';g.fill();g.lineWidth=1.5;g.strokeStyle=K.tx;g.stroke()}
function card(g,cd,r,lift){const K=A.col;g.save();A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fillStyle=lift?A.mix(K.pn,K.am,.18):K.pn;g.fill();g.lineWidth=lift?3:2;g.strokeStyle=K.tx;g.stroke();
 icon(g,cd.k,r.x+r.w/2,r.y+r.h*.4,r.w*.42);wrapTxt(g,cd.label,r.x+r.w/2,r.y+r.h*.86,r.w-10,11,K.tx);g.restore()}
function draw(A){const{ctx:g,W,H,col:K}=A,v=sc();g.fillStyle=A.mix(K.pn,K.am,K.dark?.05:.08);g.fillRect(0,0,W,H);
 if(v==='quiz'){txt(g,'First, next, last',W/2,H*.3,20);txt(g,'Morning, afternoon, evening',W/2,H*.48,15,K.tx,700);txt(g,'Yesterday, today, tomorrow',W/2,H*.62,15,K.tx,700);return}
 if(S.say)wrapTxt(g,'“'+S.say+'”',W/2,H*.08,W-24,13,K.tx);
 S.slots.forEach((lab,i)=>{const r=slotRect(i);g.save();g.setLineDash([7,6]);A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fillStyle=A.mix(K.pn,K.tx,.05);g.fill();g.lineWidth=2;g.strokeStyle=K.mu;g.stroke();g.restore();
  if(v==='day')sky(g,i,r);if(v==='days'&&i===1){g.beginPath();g.arc(r.x+r.w-12,r.y+12,6,0,7);g.fillStyle=K.ac;g.fill()}
  txt(g,lab,r.x+r.w/2,r.y-fs(9),13,K.tx,800)});
 S.cards.forEach(cd=>{if(cd===S.drag)return;card(g,cd,{x:cd.x,y:cd.y,w:cd.w,h:cd.h},cd.flash)});
 if(S.drag){const d=S.drag;card(g,d,{x:d.x,y:d.y,w:d.w,h:d.h},1)}
 if(S.msg)txt(g,S.msg,W/2,(slotRect(0).y+slotRect(0).h+homeRect(0).y)/2,13,K.tx,800);A.fx.draw(g)}
function place(cd){const r=cd.at>=0?slotRect(cd.at):homeRect(cd.home);A.tween(cd,{x:r.x,y:r.y,w:r.w,h:r.h},260,'out')}
function load(spec,say){const t=S.tok;Object.keys(S).forEach(k=>delete S[k]);S.tok=t||0;S.want=()=>{};S.say=say||'';S.slots=spec.slots;S.msg='';S.drag=null;
 const ord=spec.cards.map((_,j)=>j);const sh=[[2,0,1],[1,0],[2,0,1],[1,2,0],[2,0,3,1]][Math.max(0,A.step)]||ord;
 S.cards=(sh.length===spec.cards.length&&!say?sh:ord).map((j,h)=>{const[k,label,want,tip]=spec.cards[j];return{k,label,want,tip,at:-1,home:h,flash:0}});S.cards.forEach(cd=>{const r=homeRect(cd.home);Object.assign(cd,{x:r.x,y:r.y,w:r.w,h:r.h})})}
function put(cd,slot){if(sc()==='quiz'||!cd)return;const other=S.cards.find(o=>o.at===slot&&o!==cd);if(other){other.at=-1;place(other)}cd.at=slot;place(cd);A.sound.tick();
 tell(`${cd.label} goes in ${S.slots[slot]}.`);S.msg='';check();buttons();A.redraw()}
function nextFree(){for(let i=0;i<S.slots.length;i++)if(!S.cards.some(o=>o.at===i))return i;return -1}
function check(){if(S.cards.some(cd=>cd.at<0))return;const bad=S.cards.find(cd=>cd.at!==cd.want);
 if(bad){A.sound.miss();S.msg='Not yet. Try again.';tell('Not yet. '+bad.tip);const k=S.tok;setTimeout(()=>{if(k!==S.tok)return;S.cards.forEach(cd=>{if(cd.at!==cd.want){cd.at=-1;place(cd)}});buttons();A.redraw()},A.reduced()?40:900);return}
 S.cards.forEach(cd=>{cd.flash=1});A.sound.pop();
 if(S.rounds&&S.round<S.rounds.length-1){S.msg='Yes!';tell('Yes! '+S.cards.find(cd=>cd.want===0).label+' first. Now the next one.');const k=S.tok;setTimeout(()=>{if(k!==S.tok)return;S.round++;newRound()},A.reduced()?40:900);return}
 S.msg='In order!';tell('In order! '+S.cards.slice().sort((a,b)=>a.want-b.want).map((cd,i)=>S.slots[i]+': '+cd.label).join('. ')+'.');S.ok=1;S.want()}
function newRound(){const R=SCN[1],keep={round:S.round,rounds:R.rounds,want:S.want};load({slots:R.slots,cards:R.rounds[keep.round].cards},R.rounds[keep.round].say);Object.assign(S,keep);
 tell('Listen: '+S.say+' What do you do first?');buttons();A.redraw()}
function buttons(){if(!pads)return;pads.innerHTML='';if(sc()==='quiz')return;const f=nextFree();
 S.cards.forEach(cd=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':cd.at<0&&f>=0?`Put ${cd.label} in ${S.slots[f]}`:`Take back ${cd.label}`},pads,cd.at<0?cd.label:'Take back '+cd.label);
  b.onclick=()=>{if(cd.at<0){const g=nextFree();if(g>=0)put(cd,g)}else{cd.at=-1;place(cd);S.msg='';tell(`${cd.label} is back on the table.`);buttons();A.redraw()}}})}
const inR=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function down(p){if(sc()==='quiz'||S.ok)return false;const cd=[...S.cards].reverse().find(o=>inR(p,{x:o.x,y:o.y,w:o.w,h:o.h}));if(!cd)return false;S.drag=cd;S.off={x:p.x-cd.x,y:p.y-cd.y,sx:p.x,sy:p.y};return true}
function move(p){if(!S.drag)return;S.drag.x=p.x-S.off.x;S.drag.y=p.y-S.off.y;A.redraw()}
function up(p){const cd=S.drag;if(!cd)return;S.drag=null;const moved=Math.hypot(p.x-S.off.sx,p.y-S.off.sy)>8,mid={x:cd.x+cd.w/2,y:cd.y+cd.h/2};
 if(!moved){if(cd.at<0){const f=nextFree();if(f>=0)return put(cd,f)}return place(cd)}
 for(let i=0;i<S.slots.length;i++){const r=slotRect(i);if(inR(mid,{x:r.x-10,y:r.y-10,w:r.w+20,h:r.h+20}))return put(cd,i)}cd.at=-1;place(cd);buttons()}
const ok=(n,msg)=>()=>{if(A.step===n&&S.ok&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const play=(acts,ms)=>{const k=++S.tok;acts.forEach((fn,j)=>setTimeout(()=>{if(k===S.tok)fn()},A.reduced()?j*30+30:(j+1)*ms))};
const byLabel=l=>S.cards.find(cd=>cd.label===l);
const auto=labels=>labels.map((l,i)=>()=>put(byLabel(l),i));
const steps=[
{h:'First, next, last',p:'Drag the pictures into order. What happens first?',task:'Grow the plant in order',
 show:()=>{steps[0].go();play(auto(['Seed','Shoot','Flower']),550)},
 go:()=>{load(SCN[0]);tell('A seed, a shoot and a flower. Which comes first?');buttons();S.want=ok(0,'Seed first, next a shoot, last a flower.')}},
{h:'Before and after',p:'Listen to the words. Put the job you do first in First.',predict:{q:'"Before you put on your shoes, put on your socks." What do you do first?',opts:['Socks','Shoes','Both at once'],ans:0},task:'Do both jobs in the right order',
 show:()=>{steps[1].go();play([...auto(['Socks','Shoes']),()=>{},()=>{},...auto(['Wash hands','Eat lunch'])],550)},
 go:()=>{S.round=0;S.want=ok(1,'Before and after tell you the order, not the words you hear first.');newRound()}},
{h:'Morning to evening',p:'The sun moves across the sky. Put each thing in its time of day.',predict:{q:'What comes straight after morning?',opts:['Afternoon','Evening','Night'],ans:0},task:'Fill the day in order',
 show:()=>{steps[2].go();play(auto(['Breakfast','Play after lunch','Bath and bed']),550)},
 go:()=>{load(SCN[2]);tell('Morning, afternoon, evening. Where does each thing go?');buttons();S.want=ok(2,'Morning, then afternoon, then evening.')}},
{h:'Yesterday, today, tomorrow',p:'Today is in the middle. Where do the other days go?',predict:{q:'Your party is the day after today. When is it?',opts:['Tomorrow','Yesterday','Today'],ans:0},task:'Put each day in its place',
 show:()=>{steps[3].go();play(auto(['We went to the park','I am at nursery','My party']),550)},
 go:()=>{load(SCN[3]);tell('Yesterday is done. Today is now. Tomorrow is next.');buttons();S.want=ok(3,'Yesterday is before today. Tomorrow is after today.')}},
{h:'The snowman story',p:'The story got mixed up. Put the four pictures in order.',task:'Tell the snowman story in order',
 show:()=>{steps[4].go();play(auto(['Roll a big ball','Stack the snowman','Give him a face','The sun melts him']),550)},
 go:()=>{load(SCN[4]);tell('Four pictures. Roll, stack, face, melt. Which is first?');buttons();S.want=ok(4,'First roll, next stack, then the face, last he melts.')}},
{h:'Challenge',p:'',go:()=>{load({slots:[],cards:[]});ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['What comes straight after morning?',[['Afternoon','ok'],['Evening','skip'],['Night','night']]],
 ['"Before you go out, put your coat on." What do you do first?',[['Put my coat on','ok'],['Go out','heard'],['Take my coat off','off']]],
 ['Today is Monday. What day was yesterday?',[['Sunday','ok'],['Tuesday','tomorrow'],['Monday','today']]],
 ['Can the snowman melt before you build him?',[['No, build him first','ok'],['Yes, any time','any'],['Yes, at night','night2']]],
 ['When do we have breakfast?',[['In the morning','ok'],['In the evening','eve'],['After lunch','lunch']]],
 ['Which comes first?',[['The seed','ok'],['The flower','flower'],['They come together','same']]]];
function why(t){let m='Think about what happens first.';
 if(t==='skip')m='Evening is later. Afternoon comes after morning, then evening.';
 if(t==='night')m='Night is at the end of the day. Afternoon comes after morning.';
 if(t==='heard')m='You hear "go out" first, but "before" tells you the coat goes on first.';
 if(t==='off')m='The coat goes on, not off. Then you go out.';
 if(t==='tomorrow')m='Tuesday is tomorrow, the day after today. Yesterday was the day before: Sunday.';
 if(t==='today')m='Monday is today. Yesterday was the day before: Sunday.';
 if(t==='any')m='You cannot melt a snowman you have not made. Build first, melt last.';
 if(t==='night2')m='Night does not change the order. You build him first.';
 if(t==='eve')m='Evening is for bath and bed. Breakfast is in the morning.';
 if(t==='lunch')m='After lunch is the afternoon. Breakfast is in the morning.';
 if(t==='flower')m='The flower grows last. The seed comes first.';
 if(t==='same')m='One comes first: the seed. The flower grows from it later.';
 return m}
function ask(){qi++;const[q,ops]=QS[qi%QS.length],rot=qi%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),good=t==='ok';
 if(good){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(good?'Yes! In a row: '+streak+'.':'Not quite. '+why(t))+' <button type="button" class="linkish">Another question</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.66,tall:1.2,draw,onStep:A=>{quiz.hidden=A.step!==5;pads.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pads=E('div',{class:'fl-ctl',role:'group','aria-label':'Picture cards'},w);quiz=E('div',{class:'fl-chal'},A.below);load(SCN[0]);
  A.gest({down,move,up});const fit=()=>requestAnimationFrame(()=>{if(S.cards&&!S.drag)S.cards.forEach(cd=>{const r=cd.at>=0?slotRect(cd.at):homeRect(cd.home);Object.assign(cd,{x:r.x,y:r.y,w:r.w,h:r.h})});A.redraw()});if(typeof ResizeObserver!=='undefined')new ResizeObserver(fit).observe(A.stage);buttons()}});
A.start()})})();
