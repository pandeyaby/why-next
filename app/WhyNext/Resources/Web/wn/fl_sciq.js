/* Flagship: Asking scientific questions (ages 5–8; KS1 Working scientifically: ask simple questions and recognise that
   they can be answered in different ways; NGSS K-2-ETS1-1 asking questions and gathering information). Tap things in a
   garden to ask how and why questions; find out by watching a tadpole over days, by testing which ball bounces highest,
   and by looking it up for the Moon; sort questions by the way to find out; and spot a question science cannot answer
   (what you like best). Distinct from flagask / flagfind (asking people for help) and flagobs (observation vs idea). */
(()=>{
const WAYS=[['👀','watch'],['🧪','test'],['📖','look it up']];
const GARDEN=[['🐌','snail','Where do snails go on a sunny day?'],['🌻','sunflower','Why does the sunflower turn to the sun?'],['💧','puddle','Where does the puddle go when it dries?'],['🐝','bee','Why do bees visit flowers?']];
const SORTQ=[['Does a plant grow without water?',1],['What does a caterpillar turn into?',0],['How hot is the Sun?',2]];
const BALLS=[['tennis ball',.55,'about half way up'],['sponge ball',.25,'only a little way'],['bouncy ball',.85,'nearly all the way up']];
VIS.reg('flagsciq',c=>{let A,pad,chal,qi=-1,runs=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const now=()=>['ask','watch','test','book','sort','like','chal'][A.step];
function word(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.light?500:800} ${px}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-12)}
function pic(e,x,y,px){const g=A.ctx;g.font=`${px}px "Noto Color Emoji","Apple Color Emoji","Segoe UI Emoji",sans-serif`;g.textAlign='center';g.textBaseline='middle';g.globalAlpha=1;g.fillStyle='#000';g.fillText(e,x,y)}
function blank(o){for(const k in S)delete S[k];Object.assign(S,{id:++runs,ball:[],asked:[],day:0,h:[0,0,0],looked:false,where:[null,null,null],pick:null,chosen:null,msg:'',then:()=>{}},o||{});A.redraw()}
function box(x,y,w,h,fill,on){const g=A.ctx,C=A.col;g.fillStyle=fill;A.paint.rrect(x,y,w,h,14);g.fill();g.strokeStyle=C.tx;g.lineWidth=on?5:2;g.stroke()}
// four big tap spots in a 2×2 grid (garden things, ways, answers)
function cell(i,n){const W=A.W,H=A.H,cols=2,w=W*.42,h=H*(n>2?.27:.34),x=W*.06+(i%cols)*(W*.46),y=H*.16+Math.floor(i/cols)*(h+H*.04);return{x,y,w,h}}
// frogspawn → tadpole → back legs → front legs → froglet, drawn so each change is easy to see
function frogStage(x,y,k){const g=A.ctx,C=A.col,d=S.day;g.fillStyle=C.tx;g.strokeStyle=C.tx;g.lineWidth=3;
 if(d===0){for(let i=0;i<7;i++){const a=i*0.9,ex=x+Math.cos(a)*26*k*(i?1:0),ey=y+Math.sin(a)*20*k*(i?1:0);g.fillStyle=A.alpha(C.pn,.9);g.beginPath();g.arc(ex,ey,12*k,0,7);g.fill();g.stroke();g.fillStyle=C.tx;g.beginPath();g.arc(ex,ey,4*k,0,7);g.fill()}return}
 if(d===4){pic('🐸',x,y,64*k);return}
 g.beginPath();g.ellipse(x,y,22*k,15*k,0,0,7);g.fill();g.beginPath();g.moveTo(x+20*k,y);for(let t=0;t<=1;t+=.1)g.lineTo(x+20*k+t*50*k,y+Math.sin(t*9)*8*k);g.stroke();
 if(d>=2){g.beginPath();g.moveTo(x+12*k,y+12*k);g.lineTo(x+18*k,y+28*k);g.moveTo(x+4*k,y+13*k);g.lineTo(x+2*k,y+29*k);g.stroke()}
 if(d>=3){g.beginPath();g.moveTo(x-12*k,y+10*k);g.lineTo(x-20*k,y+24*k);g.stroke()}}
function draw(A){const{ctx:g,W,H,col:C}=A,k=now(),big=A.narrow?15:18;g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.06:.45);g.fillRect(0,0,W,H);
 if(k==='chal'){word('How can we find out?',W/2,H*.35,A.narrow?18:22);WAYS.forEach((w,i)=>pic(w[0],W*(.25+i*.25),H*.58,A.narrow?34:44));A.fx.draw(g);return}
 if(k==='ask'){word('Tap a thing. Ask a question!',W/2,H*.07,big);GARDEN.forEach((t,i)=>{const r=cell(i,4),on=S.asked.includes(i);box(r.x,r.y,r.w,r.h,on?A.alpha(C.gr,.25):A.alpha(C.tx,.06),on);pic(t[0],r.x+r.w/2,r.y+r.h*.42,A.narrow?40:52);word(t[1],r.x+r.w/2,r.y+r.h*.82,A.narrow?14:16)});
  word(S.msg||'How? Why? Where?',W/2,H*.92,A.narrow?13:15,{c:C.mu})}
 if(k==='watch'){word(S.day?`Look ${S.day} of 4`:'Frogspawn in a tank',W/2,H*.07,big);const r={x:W*.16,y:H*.16,w:W*.68,h:H*.56};box(r.x,r.y,r.w,r.h,A.alpha(C.cy,.18));frogStage(W/2,r.y+r.h*.45,A.narrow?1:1.3);
  word(['frogspawn (eggs)','week 2: a tadpole','week 8: back legs','week 10: front legs too','week 12: a little frog'][S.day],W/2,r.y+r.h*.86,A.narrow?15:17);
  word(S.msg||'Tap the tank to look again later.',W/2,H*.86,A.narrow?13:15,{c:C.mu})}
 if(k==='test'){word('Test it. Drop each ball.',W/2,H*.07,big);const base=H*.8,top=H*.2;g.strokeStyle=C.tx;g.lineWidth=3;g.beginPath();g.moveTo(W*.04,base);g.lineTo(W*.96,base);g.stroke();
  g.setLineDash([6,5]);g.beginPath();g.moveTo(W*.04,top);g.lineTo(W*.96,top);g.stroke();g.setLineDash([]);word('same drop height',W*.5,top-14,12,{c:C.mu,light:true});
  BALLS.forEach((b,i)=>{const x=W*(.2+i*.3),hh=S.h[i];if(hh>0){g.fillStyle=A.alpha(C.ac,.3);g.fillRect(x-14,base-(base-top)*hh,28,(base-top)*hh)}A.paint.ball(x,base-(base-top)*(S.ball[i]?S.ball[i].y:1)-16,16,[C.am,C.pk,C.vi][i]);word(b[0],x,base+18,A.narrow?12:14,{max:W*.3})});
  word(S.msg||'Tap a ball to drop it.',W/2,H*.95,A.narrow?13:15,{c:C.mu})}
 if(k==='book'){word('How far away is the Moon?',W/2,H*.07,big);pic('🌍',W*.18,H*.45,A.narrow?44:56);pic('🌙',W*.82,H*.3,A.narrow?36:46);g.setLineDash([4,6]);g.strokeStyle=C.mu;g.lineWidth=2;g.beginPath();g.moveTo(W*.26,H*.42);g.lineTo(W*.74,H*.32);g.stroke();g.setLineDash([]);
  const r={x:W*.3,y:H*.56,w:W*.4,h:H*.26};box(r.x,r.y,r.w,r.h,S.looked?A.alpha(C.gr,.25):A.alpha(C.tx,.06),S.looked);pic('📖',W/2,r.y+r.h*.42,A.narrow?36:46);word(S.looked?'about 384,000 km':'tap the book',W/2,r.y+r.h*.82,A.narrow?13:15);
  word(S.msg||'Too far to test. Too far to watch.',W/2,H*.92,A.narrow?13:15,{c:C.mu})}
 if(k==='sort'){const q=SORTQ.findIndex((_,i)=>S.where[i]==null);word(q<0?'All sorted!':SORTQ[q][0],W/2,H*.08,A.narrow?14:17,{max:W*.94});
  WAYS.forEach((w,i)=>{const x=W*.04+i*W*.32,y=H*.22,ww=W*.28,hh=H*.62;box(x,y,ww,hh,A.alpha([C.cy,C.gr,C.vi][i],.16));pic(w[0],x+ww/2,y+hh*.2,A.narrow?30:40);word(w[1],x+ww/2,y+hh*.42,A.narrow?13:15,{max:ww-6});
   SORTQ.forEach((sq,j)=>{if(S.where[j]===i)word('✓ '+sq[0].split(' ').slice(0,3).join(' ')+'…',x+ww/2,y+hh*.65,11,{max:ww-6,light:true})})});
  word(S.msg||'Tap the way to find out.',W/2,H*.93,A.narrow?13:15,{c:C.mu})}
 if(k==='like'){word('Can we find this out?',W/2,H*.07,big);(S.cards||[]).forEach((t,i)=>{const y=H*(.2+i*.22),on=S.chosen===i;box(W*.06,y,W*.88,H*.18,on?A.alpha(C.ac,.25):A.alpha(C.tx,.06),on);word(t,W/2,y+H*.09,A.narrow?14:16,{max:W*.84})});
  word(S.msg||'Tap the one science can NOT answer.',W/2,H*.92,A.narrow?13:15,{c:C.mu})}
 A.fx.draw(g)}
// ---------- actions ----------
function ask(i){if(S.asked.includes(i))return;S.asked.push(i);A.sound.pop();S.msg=GARDEN[i][2];say(S.msg);A.redraw();S.then()}
function look(){if(S.day>=4)return;S.day++;A.sound.tick();S.msg=['About 2 weeks on: a tadpole with a tail!','About 8 weeks: back legs grow.','About 10 weeks: front legs too.','About 12 weeks: a little frog! We found out by watching.'][S.day-1];say(S.msg);A.redraw();S.then()}
function drop(i){if(S.h[i]||S.ball[i])return;const id=S.id,o=S.ball[i]={y:1};A.sound.whoosh();
 A.tween(o,{y:0},A.reduced()?10:450,'io',()=>{if(S.id!==id)return;A.tween(o,{y:BALLS[i][1]},A.reduced()?10:450,'out',()=>{if(S.id!==id)return;S.h[i]=BALLS[i][1];
  S.msg=S.h.every(x=>x)?'The bouncy ball went highest. We found out by testing.':`The ${BALLS[i][0]} bounced ${BALLS[i][2]}.`;say(S.msg);A.redraw();S.then()})})}
function read(){if(S.looked)return;S.looked=true;A.sound.pop();S.msg='The book says about 384,000 km. We found out by looking it up.';say(S.msg);A.redraw();S.then()}
function place(way){const q=SORTQ.findIndex((_,i)=>S.where[i]==null);if(q<0)return;const want=SORTQ[q][1];
 if(way===want){S.where[q]=way;A.sound.pop();S.msg=['We watch it change over days.','We try it and see: a test.','We cannot test or watch the Sun up close. We look it up.'][want]}
 else{A.sound.miss();S.msg=want===1?'We can try this ourselves: do a test.':want===0?'This happens slowly. Watch it over many days.':'We cannot test or watch this. Look it up in a book or ask an expert.'}
 say(S.msg);A.redraw();S.then()}
function choose(i){S.chosen=i;A.sound.tick();S.msg=i===S.answer?'Yes! “Best” is what you like. People like different things.':'Science can find this out by watching, testing or looking it up.';if(i!==S.answer)A.sound.miss();say(S.msg);A.redraw();S.then()}
function buttons(){if(!pad)return;pad.innerHTML='';const k=now();if(k==='chal')return;const b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='ask')GARDEN.forEach((t,i)=>b(t[0]+' '+t[1],()=>ask(i),'Ask about the '+t[1]));
 if(k==='watch')b('👀 Look again later',look,'Look at the tank again a few weeks later');
 if(k==='test')BALLS.forEach((x,i)=>b('Drop '+x[0],()=>drop(i)));
 if(k==='book')b('📖 Look it up',read,'Look it up in a book');
 if(k==='sort')WAYS.forEach((w,i)=>b(w[0]+' '+w[1],()=>place(i),'Find out by: '+w[1]));
 if(k==='like')(S.cards||[]).forEach((t,i)=>b(t,()=>choose(i)))}
function tap(p){const k=now(),W=A.W,H=A.H;if(k==='chal')return false;const inR=r=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
 if(k==='ask'){for(let i=0;i<4;i++)if(inR(cell(i,4))){ask(i);return true}return false}
 if(k==='watch'){look();return true}
 if(k==='test'){const i=Math.max(0,Math.min(2,Math.floor((p.x/W-.05)/.3)));drop(i);return true}
 if(k==='book'){if(p.y>H*.5){read();return true}return false}
 if(k==='sort'){const i=Math.floor((p.x-W*.04)/(W*.32));if(i>=0&&i<3&&p.y>H*.2){place(i);return true}return false}
 if(k==='like'){const i=Math.floor((p.y-H*.2)/(H*.22));if(i>=0&&i<(S.cards||[]).length){choose(i);return true}return false}return false}
const fin=(i,ok,msg)=>()=>{if(A.step===i&&!A.isDone&&A.pred[i]!=null&&ok())A.done(msg+A.reveal(i))};
function play(i,acts){steps[i].go();acts.forEach((f,j)=>setTimeout(()=>{if(A.step===i)f()},A.reduced()?30*(j+1):(j+1)*300))}
const steps=[
{h:'Ask a question',p:'Scientists ask how, why and where questions about the world. Tap things in the garden to ask a question about each one.',
 predict:{q:'A science question is one that…',opts:['only grown-ups can ask','we can find out the answer to','has no answer'],ans:1},
 task:'Ask 3 questions',show:()=>play(0,[()=>ask(0),()=>ask(1),()=>ask(2)]),
 go:()=>{blank();say('Tap the snail, sunflower, puddle or bee.');buttons();S.then=fin(0,()=>S.asked.length>=3,'Three good questions. Now: how can we find out the answers?')}},
{h:'Find out by watching',p:'Some answers need us to watch for a long time. What does frogspawn turn into? Look at the tank again and again for weeks.',
 predict:{q:'How can we find out what frogspawn turns into?',opts:['make a guess','watch it for many weeks','look at it once'],ans:1},
 task:'Look at the tank 4 times',show:()=>play(1,[look,look,look,look]),
 go:()=>{blank();say('Tap the tank to look again.');buttons();S.then=fin(1,()=>S.day>=4,'Eggs, tadpole, legs, frog. We watched it change over about 12 weeks.')}},
{h:'Find out by testing',p:'Some answers we can test. Which ball bounces highest? Drop each ball from the same height and look.',
 predict:{q:'Which ball bounces highest?',opts:['the biggest ball, for sure','we must drop each one to find out','all balls bounce the same'],ans:1},
 task:'Drop all 3 balls',show:()=>play(2,[()=>drop(0),()=>drop(1),()=>drop(2)]),
 go:()=>{blank();say('Tap a ball to drop it.');buttons();S.then=fin(2,()=>S.h.every(x=>x),'The bouncy ball went highest. A test told us.')}},
{h:'Find out by looking it up',p:'Some answers we cannot watch or test. The Moon is too far away. We can look in a book or ask an expert.',
 predict:{q:'How far is the Moon? How can we find out?',opts:['measure it with a ruler','look in a book or ask an expert','nobody can ever know'],ans:1},
 task:'Look it up in the book',show:()=>play(3,[read]),
 go:()=>{blank();say('Tap the book.');buttons();S.then=fin(3,()=>S.looked,'About 384,000 km. We found out by looking it up.')}},
{h:'Which way?',p:'Watch it, test it or look it up. Pick the best way to find out each answer.',
 predict:{q:'Does a plant grow without water? Best way?',opts:['look it up only','do a test with two plants','look once and guess'],ans:1},
 task:'Sort 3 questions',show:()=>play(4,[()=>place(1),()=>place(0),()=>place(2)]),
 go:()=>{blank();say('Tap the best way for each question.');buttons();S.then=fin(4,()=>S.where.every(x=>x!=null),'Test the plant, watch the caterpillar, look up the Sun.')}},
{h:'Not a science question',p:'Science finds out how the world works. It cannot say which thing is best, because people like different things.',
 predict:{q:'What is the best ice cream? Can science find out?',opts:['yes, test all the ice creams','no, it is what you like','yes, look it up'],ans:1},
 task:'Tap the question science cannot answer',show:()=>play(5,[()=>choose(1)]),
 go:()=>{blank({cards:['Do snails like wet places?','Which colour is the best?','Do ice cubes melt in the sun?'],answer:1});say('Tap the one science can not answer.');buttons();S.then=fin(5,()=>S.chosen===1,'Which colour is best is up to you. The other two we can find out.')}},
{h:'Challenge',p:'',go:()=>{blank();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.then()});
const QS=[
 ['Does a ball roll further on grass or on a path?',[['🧪 test it','ok'],['📖 look it up','book'],['👀 watch for days','slow']]],
 ['How does a bean seed grow into a plant?',[['👀 watch it for days','ok'],['🧪 test it once','once'],['🤔 just guess','guess']]],
 ['How many moons does Jupiter have?',[['📖 look it up','ok'],['🧪 test it','far'],['👀 watch from the garden','far']]],
 ['Which is the nicest song?',[['😊 it is what you like','ok'],['🧪 test it','like'],['📖 look it up','like']]],
 ['Do ice cubes melt faster in the sun or the shade?',[['🧪 test it','ok'],['🤔 just guess','guess'],['📖 look it up only','book']]],
 ['Where does a puddle go when it dries?',[['👀 watch it over the day','ok'],['🤔 just guess','guess'],['😊 it is what you like','like']]]];
function why(t){let m='Pick the way that can really find the answer.';
 if(t==='book')m='We can try this ourselves. A test shows us.';
 if(t==='slow')m='This is quick to try. Do a test now.';
 if(t==='once')m='Growing takes many days. Look once is not enough. Watch it.';
 if(t==='guess')m='A guess is not finding out. Watch it or test it.';
 if(t==='far')m='That is too far to test or watch. Look it up or ask an expert.';
 if(t==='like')m='Nicest or best is what you like. Science cannot say.';
 return m}
function next(){qi++;const Q=QS[qi%QS.length],r=(qi+1)%3,opts=[...Q[1].slice(r),...Q[1].slice(0,r)];
 chal.innerHTML=`<p><b>${Q[0]}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');opts.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>mark(t)});say('Challenge: '+Q[0]);A.redraw()}
function mark(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok)A.win();else A.sound.miss();fb.innerHTML=(ok?'✓ Yes! That way can find the answer.':'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.66,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;pad.hidden=A.step===6;buttons()},
 init:A=>{const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Science question controls'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down:tap});buttons()}});
A.start()})})();
