/* Flagship – waiting for my turn (ages 3–4): tap who goes next in the slide line until it is your go; pick wait or grab
   and see what happens to the game; count Kit's swings until it is your turn; turn the sand timer and find that asking
   again and again does not make the sand fall faster; sort the things that help you wait. Big buttons, few words. */
(()=>{
const KIDS=[['Ana','#db2777'],['Ben','#2563eb'],['Kit','#16a34a'],['You','#d97706']];
const SCENES=[{t:'Kit has the spade',w:'dig'},{t:'Ben is on the slide',w:'slide'},{t:'Gran is talking',w:'talk'}];
const CH=[['Grab it','grab'],['Say "My turn next?" and wait','wait'],['Push in','push']];
const opts=r=>CH.slice(r%3).concat(CH.slice(0,r%3)),SWINGS=[5,7],SAND=[2000,2000];
const IDEAS=[['Sing a song',1],['Grab the toy',0],['Count to 10',1],['Push in',0],['Watch the timer',1],['Shout "Me now!"',0]];
VIS.reg('flagwait',c=>{let A,pad,quiz,qi=-1,run=0;c.fig.classList.add('young');
const B0=()=>({want:()=>{},r:0,won:0,line:[0,1,2,3],gone:0,pick:-1,sw:0,sand:0,t0:0,flip:0,asks:0,idea:0,sorted:[],tip:-1,mood:0,grab:null}),S=B0();
const mode=()=>['line','choose','count','timer','ideas','quiz'][A.step];
const fs=n=>Math.round(n*(A.narrow?1:1.15)),R=()=>A.reduced();
const speak=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
function txt(g,t,x,y,n,col){g.font=`800 ${fs(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-16)}
function card(g,x,y,w,h,col,a){g.fillStyle=A.alpha(col,a);A.paint.rrect(x,y,w,h,14);g.fill();g.strokeStyle=col;g.lineWidth=3;A.paint.rrect(x,y,w,h,14);g.stroke()}
function kid(g,k,x,y,r,face){const[n,col]=KIDS[k];A.paint.ball(x,y,r,col);g.fillStyle='#fff';[-.35,.35].forEach(d=>{g.beginPath();g.arc(x+d*r,y-r*.15,r*.13,0,7);g.fill()});
 g.strokeStyle='#fff';g.lineWidth=3;g.beginPath();if(face<0)g.arc(x,y+r*.55,r*.3,Math.PI*1.15,Math.PI*1.85);else g.arc(x,y+r*.15,r*.35,.2,Math.PI-.2);g.stroke();txt(g,n,x,y+r+fs(12),12)}
const lineX=i=>A.W*(.3+i*.18),U=()=>Math.min(A.W/13,40);
function drawLine(g){const{W,H}=A,C=A.col;g.strokeStyle=C.mu;g.lineWidth=6;g.beginPath();g.moveTo(W*.02,H*.25);g.lineTo(W*.1,H*.25);g.lineTo(W*.02+W*.12,H*.7);g.stroke();
 txt(g,'slide',W*.08,H*.18,12);S.line.forEach((k,i)=>{const x=lineX(i);if(S.tip===i){card(g,x-U()*1.2,H*.38,U()*2.4,U()*3.2,C.rd,.2)}kid(g,k,x,H*.5,U(),1)});
 txt(g,S.line[0]===3?'Your go!':'Who goes next? Tap them.',W/2,H*.86,15)}
function drawChoose(g){const{W,H}=A,C=A.col,sc=SCENES[Math.min(S.r,2)];txt(g,sc.t,W/2,H*.08,16);kid(g,2,W*.3,H*.28,U()*1.1,S.mood<0?-1:1);kid(g,3,W*.7,H*.28,U()*1.1,S.mood<0?-1:1);
 const h=H*.15;opts(S.r).forEach(([t],i)=>{const y=H*(.5+i*.165);card(g,12,y,W-24,h,S.tip===i?C.rd:S.pick===i?C.gr:C.vi,.14);txt(g,t,W/2,y+h/2,14)})}
function drawCount(g){const{W,H}=A,C=A.col,n=SWINGS[Math.min(S.r,1)],a=(S.sw%2?.5:-.5);g.strokeStyle=C.mu;g.lineWidth=5;g.beginPath();g.moveTo(W*.2,H*.08);g.lineTo(W*.8,H*.08);g.stroke();
 const px=W*.5,py=H*.08,L=H*.32,sx=px+Math.sin(a)*L,sy=py+Math.cos(a)*L;g.lineWidth=3;g.beginPath();g.moveTo(px,py);g.lineTo(sx,sy);g.stroke();kid(g,2,sx,sy,U()*.9,1);
 for(let i=0;i<n;i++){const x=W/2+(i-(n-1)/2)*Math.min(44,(W-30)/n),on=i<S.sw;g.fillStyle=on?C.am:A.alpha(C.mu,.3);g.beginPath();g.arc(x,H*.66,fs(15),0,7);g.fill();txt(g,String(i+1),x,H*.66,13,on?'#111':C.tx)}
 txt(g,S.sw>=n?'Your turn on the swing!':`Kit has ${n} swings. Count them: ${S.sw}`,W/2,H*.82,15);kid(g,3,W*.85,H*.42,U()*.8,1)}
function sandLeft(){if(!S.flip)return 1;const d=SAND[Math.min(S.r,1)];return R()?0:Math.max(0,1-(performance.now()-S.t0)/d)}
function drawTimer(g){const{W,H}=A,C=A.col,x=W/2,y=H*.42,w=Math.min(W*.3,110),h=H*.6,top=sandLeft();g.strokeStyle=C.tx;g.lineWidth=4;
 g.beginPath();g.moveTo(x-w/2,y-h/2);g.lineTo(x+w/2,y-h/2);g.lineTo(x,y);g.lineTo(x+w/2,y+h/2);g.lineTo(x-w/2,y+h/2);g.lineTo(x,y);g.closePath();g.stroke();
 g.fillStyle=C.am;const t=top*h/2;g.beginPath();g.moveTo(x-w/2*top,y-t);g.lineTo(x+w/2*top,y-t);g.lineTo(x,y);g.fill();
 const b=(1-top);g.beginPath();g.moveTo(x-w/2*b,y+h/2-b*h/2);g.lineTo(x+w/2*b,y+h/2-b*h/2);g.lineTo(x+w/2,y+h/2);g.lineTo(x-w/2,y+h/2);g.fill();
 if(S.flip&&top>0){g.fillRect(x-1.5,y,3,h/2)}txt(g,!S.flip?'Tap the timer to turn it':top>0?'Sand is falling… wait':'All the sand is down!',W/2,H*.9,15)}
function drawIdeas(g){const{W,H}=A,C=A.col,it=IDEAS[S.idea];if(it){card(g,W*.15,H*.06,W*.7,H*.18,C.am,.18);txt(g,it[0],W/2,H*.15,16)}
 const bw=(W-30)/2,bh=H*.62;[['Helps me wait',C.gr],['Not waiting',C.rd]].forEach(([t,col],i)=>{const x=10+i*(bw+10);card(g,x,H*.32,bw,bh,S.tip===i?C.rd:col,S.tip===i?.3:.1);txt(g,t,x+bw/2,H*.32+fs(18),13);
  S.sorted.filter(j=>IDEAS[j][1]===(1-i)).forEach((j,n)=>txt(g,IDEAS[j][0],x+bw/2,H*.32+fs(48)+n*fs(24),12))})}
function draw(A){const{ctx:g,W,H,col:C}=A,v=mode();g.fillStyle=A.mix(C.pn,'#dcfce7',C.dark?.05:.45);g.fillRect(0,0,W,H);
 if(v==='quiz'){kid(g,3,W/2,H*.45,U()*1.4,1);return}
 if(S.won>=lastN()){txt(g,doneText(),W/2,H/2,15);return A.fx.draw(g)}
 ({line:drawLine,choose:drawChoose,count:drawCount,timer:drawTimer,ideas:drawIdeas})[v](g);A.fx.draw(g)}
const lastN=()=>({line:1,choose:3,count:2,timer:2,ideas:1}[mode()]||9);
function doneText(){return{line:'The one at the front goes next. Then you!',choose:'Wait and ask. Then everyone can play.',count:'Counting helps the wait go by.',timer:'The sand falls at its own speed. Wait for it.',ideas:'Sing, count or watch. That helps you wait.'}[mode()]}
const miss=(t,i)=>{A.sound.miss();S.tip=i==null?-1:i;speak(t);setTimeout(()=>{S.tip=-1;A.redraw()},R()?10:800);A.redraw()};
function win(t){S.won++;S.r++;A.sound.pop();if(S.won<lastN()){speak(t+' Next one.');S.pick=-1;S.mood=0;S.sw=0;S.flip=0;S.asks=0}else speak(t);buttons();A.redraw();S.want()}
function tapKid(i){if(mode()!=='line'||S.won>=1)return;if(i==null)i=0;const k=S.line[i];
 if(S.line[0]===3)return;if(k===3&&i)return miss('You are at the back. Wait: the others go first.',i);
 if(i)return miss(`${KIDS[k][0]} is behind ${KIDS[S.line[0]][0]}. ${KIDS[S.line[0]][0]} is at the front, so ${KIDS[S.line[0]][0]} goes next.`,i);
 S.line.shift();S.line.push(k);S.gone++;A.sound.tick();if(S.line[0]===3)return win('3 friends had a go. Now you are at the front. Your go!');speak(`${KIDS[k][0]} goes down the slide! Who is next?`);A.redraw()}
function choose(i){if(mode()!=='choose'||S.won>=3)return;const O=opts(S.r);if(i==null)i=O.findIndex(o=>o[1]==='wait');const w=O[i][1];S.pick=i;
 if(w==='grab'){S.mood=-1;return miss('Grabbing makes Kit sad. The game stops, and you still have to wait.',i)}
 if(w==='push'){S.mood=-1;return miss('Pushing in is not fair. Ben is cross, and a grown-up sends you to the back.',i)}
 S.mood=1;win(['Kit says, "Yes, after me!" You wait, then you dig.','Ben goes down. Then it is your go.','Gran finishes talking. Then she listens to you.'][Math.min(S.r,2)])}
function swing(){if(mode()!=='count'||S.won>=2)return;const n=SWINGS[Math.min(S.r,1)];if(S.sw>=n)return;S.sw++;A.sound.tick();if(S.sw>=n)return speak(`${n}! Kit gets off. Say "My turn?"`),buttons(),A.redraw();speak(String(S.sw));A.redraw()}
function myGo(){const v=mode();if(v==='count'){const n=SWINGS[Math.min(S.r,1)];if(S.won>=2)return;if(S.sw<n)return miss(`Not yet. Kit has ${n-S.sw} more swing${n-S.sw>1?'s':''}. Keep counting.`);return win('Kit gets off. Your turn on the swing!')}
 if(v==='timer'){if(S.won>=2)return;if(!S.flip)return miss('Turn the timer first.');S.asks++;if(sandLeft()>0)return miss(S.asks>1?'Asking again does not make the sand fall faster. Watch it.':'Not yet. Some sand is still at the top.');win('All the sand is down. Your go!')}}
function flip(){if(mode()!=='timer'||S.won>=2||S.flip)return;S.flip=1;S.t0=performance.now();S.asks=0;A.sound.whoosh();speak('The sand is falling. Wait for it.');buttons();A.redraw()}
function sortIdea(b){if(mode()!=='ideas'||S.won>=1)return;const it=IDEAS[S.idea];if(!it)return;if(b==null)b=1-it[1];
 if(b!==1-it[1])return miss(it[1]?`${it[0]} is a good way to wait. It keeps you busy.`:`${it[0]} is not waiting. It hurts or upsets others.`,b);
 S.sorted.push(S.idea);S.idea++;A.sound.tick();if(S.idea>=IDEAS.length)return win('You know lots of ways to wait.');speak(`Yes. Next: ${IDEAS[S.idea][0]}.`);A.redraw()}
function buttons(){if(!pad)return;pad.innerHTML='';const v=mode(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=fn};
 if(v==='quiz'||S.won>=lastN())return;
 if(v==='line')S.line.forEach((k,i)=>B(KIDS[k][0],()=>tapKid(i),`${KIDS[k][0]}, place ${i+1} in the line`));
 if(v==='choose')opts(S.r).forEach(([t],i)=>B(t,()=>choose(i)));
 if(v==='count'){B('Count a swing',swing,'Count one of Kit’s swings');B('My go now?',myGo,'Ask if it is my go now')}
 if(v==='timer'){if(!S.flip)B('Turn the timer',flip,'Turn the sand timer over');B('Is it my go?',myGo)}
 if(v==='ideas'){B('Helps me wait',()=>sortIdea(0));B('Not waiting',()=>sortIdea(1))}}
function down(p){const v=mode(),{W,H}=A;if(S.won>=lastN())return false;
 if(v==='line'&&p.y>H*.3&&p.y<H*.75){const i=S.line.findIndex((k,i)=>Math.abs(p.x-lineX(i))<U()*1.2);if(i>=0)tapKid(i)}
 if(v==='choose'&&p.y>H*.5){const i=Math.floor((p.y-H*.5)/(H*.165));if(i>=0&&i<3)choose(i)}
 if(v==='count'&&p.y<H*.6)swing();
 if(v==='timer'){S.grab={y0:p.y};return true}
 if(v==='ideas'&&p.y>H*.32)sortIdea(p.x>W/2?1:0);return false}
function move(){}
function up(p){const d=S.grab;S.grab=null;if(!d)return;if(!S.flip)flip();else myGo()}
const check=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list,gap){const k=++run;list.forEach((fn,j)=>setTimeout(()=>{if(k===run)fn()},R()?j*40+30:(j+1)*(gap||300)))}
const fresh=()=>{run++;Object.assign(S,B0())};
const steps=[
{h:'Who goes next?',p:'This is the line for the slide. Tap the one who goes next.',
 predict:{q:'You are at the back of the line. Do you get a go?',opts:['No, never','Yes, when the others have had a go'],ans:1},task:'Tap who goes next until it is your go',
 show:()=>{steps[0].go();play([0,0,0].map(()=>()=>tapKid(0)))},go:()=>{fresh();speak('Who goes down the slide next?');buttons();S.want=check(0,()=>S.won>=1,'Each go, the line moves up. Then it is you.')}},
{h:'Grab or wait?',p:'What do you do? Tap a card or a button.',
 predict:{q:'Ben grabs the spade from Kit. Does he get to dig faster?',opts:['Yes, faster','No: Kit is sad and the game stops'],ans:1},task:'Choose well 3 times',
 show:()=>{steps[1].go();play([0,1,2].map(()=>()=>choose()))},go:()=>{fresh();speak(SCENES[0].t+'. What do you do?');buttons();S.want=check(1,()=>S.won>=3,'Say "My turn next?" and wait. The game keeps going.')}},
{h:'Count the swings',p:'Kit is on the swing. Tap the swing to count each go. When you get to the end, it is your turn.',task:'Count until it is your turn, twice',
 show:()=>{steps[2].go();play([...Array(5)].map(()=>swing).concat([myGo],[...Array(7)].map(()=>swing),[myGo]),220)},go:()=>{fresh();speak('Count Kit’s swings.');buttons();S.want=check(2,()=>S.won>=2,'Counting gives your waiting a job to do.')}},
{h:'The sand timer',p:'Tap the timer to turn it. When all the sand is down, it is your go.',
 predict:{q:'Will asking "Is it my go?" again and again make the sand fall faster?',opts:['Yes, faster','No, it falls the same'],ans:1},task:'Wait for the timer, twice',
 show:()=>{steps[3].go();const k=++run,T=(f,ms)=>setTimeout(()=>{if(k===run)f()},R()?30:ms);T(flip,200);T(myGo,800);T(myGo,2350);T(flip,2550);T(myGo,4700)},go:()=>{fresh();speak('Turn the sand timer.');buttons();S.want=check(3,()=>S.won>=2,'The timer shows how long. Asking does not make it faster.')}},
{h:'Ways to wait',p:'Does it help you wait? Tap a box.',task:'Sort all 6',
 show:()=>{steps[4].go();play(IDEAS.map(()=>()=>sortIdea()))},go:()=>{fresh();speak('What helps you wait?');buttons();S.want=check(4,()=>S.won>=1,'Singing, counting and watching help. Grabbing and pushing do not.')}},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Kit is on the slide. You want a go. What do you say?',[['"My turn next?"','ok'],['"Get off!"','rude'],['Nothing. Just push','push']]],
 ['Ana, Ben and you are in a line. Ana is at the front. Who goes next?',[['Ana','ok'],['You','me'],['Ben','ben']]],
 ['Mum is on the phone. You want a snack. What can you do?',[['Wait and sing a song','ok'],['Pull her arm and shout','tug'],['Take the snack','take']]],
 ['The sand timer is still going. What happens if you ask again and again?',[['The sand falls the same','ok'],['The sand goes faster','faster'],['The sand stops','stops']]],
 ['Kit has 3 more swings. What can you do while you wait?',[['Count them: 1, 2, 3','ok'],['Grab the swing','grab'],['Cry until she gets off','cry']]]];
function why(t){let m='Wait, and find something to do while you wait.';
 if(t==='rude')m='"Get off!" makes Kit cross. Ask, "My turn next?"';
 if(t==='push')m='Pushing hurts and is not fair. Ask, then wait.';
 if(t==='me')m='You are behind Ana. The one at the front goes next.';
 if(t==='ben')m='Ben is behind Ana. Ana is at the front, so Ana goes next.';
 if(t==='tug')m='Mum is busy talking. Wait, and sing a song until she is done.';
 if(t==='take')m='Taking it is not waiting. Wait, then ask Mum.';
 if(t==='faster')m='Asking does not change the sand. It falls at its own speed.';
 if(t==='stops')m='The sand keeps falling. When it is all down, it is your go.';
 if(t==='grab')m='Grabbing can hurt Kit. Count her swings, then it is you.';
 if(t==='cry')m='Waiting can feel hard. Counting helps more than crying.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});speak('Challenge: '+q);A.redraw()}
let streak=0;
function judge(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! Good waiting.':'✗ '+why(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});A.every(()=>mode()==='timer'&&S.flip&&sandLeft()>0);buttons()}});
A.start()})})();
