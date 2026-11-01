/* Flagship – what makes someone a good friend (ages 5–7). Pin good-friend badges on a friend (bossy and mean badges
   bounce off), choose what a good friend does when games clash or someone wants to join, keep a promise and own up,
   put the steps of making up after a fall-out in order, and spot the unfriendly picture in a strip. Big taps, few words. */
(()=>{
/* badge: [words, good?, why it does or does not belong] */
const BADGE=[['Kind',1,'Kind friends say nice things and help.'],['Bossy',0,'Bossy means always telling others what to do. A good friend takes turns choosing.'],
 ['Honest',1,'Honest friends tell the truth, even after a mistake.'],['Keeps promises',1,'You can count on a friend who does what they said.'],
 ['Says mean things',0,'Mean words hurt. A good friend uses kind words.'],['Lets you join',1,'Good friends let others join in the game.']];
/* scenes: [line, mood of the other child, [[choice, tag], ...]] ; tag ok is the good-friend move */
const PLAY=[['Mia wants tag. You want blocks.','cross',[['Take turns: tag, then blocks','ok'],['Shout: we play MY game!','bossy'],['Stomp off in a huff','huff']]],
 ['Leo asks: "Can I play too?"','sad',[['No, go away.','out'],['Yes! You can be the dog.','ok'],['Only if you give me your car.','deal']]],
 ['Zara made a funny drawing.','happy',[['Laugh at it with the others','laugh'],['That is ugly.','mean'],['I like the big sun!','ok']]]];
const TRUST=[['You broke Sam\'s crayon by mistake.','sad',[['Hide it and say nothing','hide'],['Tell Sam and say sorry','ok'],['Say the cat did it','lie']]],
 ['You said you would save Sam a seat.','happy',[['Save the seat for Sam','ok'],['Give it to someone else','break'],['Forget, and sit far away','forget']]],
 ['Sam is sad. His toy is lost.','sad',[['Run off to play','leave'],['Say: I do not care','mean'],['Sit with him and help look','ok']]]];
/* fall-outs: [what happened, three steps in the right order] */
const FIX=[['Tom and Ava both grab the bike. They shout.',['Take a big breath','Say sorry for shouting','Take turns on the bike']],
 ['You called Kim a mean name.',['Stop and think','Say sorry to Kim','Ask Kim to play']]];
const ORDER_WHY=['First calm down. It is hard to fix things when you are cross.','Say sorry next, so your friend knows you mean it.','Playing again comes last, after the sorry.'];
/* strip frames: [label, friendly?] ; one unfriendly frame per strip */
const STRIP=[[['Shares the ball',1],['Says: you can\'t play!',0],['Helps tie a lace',1]],
 [['Takes turns on the slide',1],['Says thank you',1],['Grabs and bosses',0]],
 [['Whispers and points',0],['Holds the door',1],['Waves hello',1]]];
const WHY={bossy:'That is bossy. A good friend takes turns choosing the game.',huff:'Stomping off ends the game for both of you. Try taking turns.',
 out:'Saying go away leaves Leo out. Good friends let others join.',deal:'A friend does not have to pay to play. Just let him join.',
 laugh:'Laughing at someone\'s work hurts. Say what you like about it.',mean:'Mean words hurt. Good friends say kind things.',
 hide:'Hiding it is not honest. Tell Sam and say sorry.',lie:'Blaming the cat is a fib. Honest friends tell the truth.',
 break:'You made a promise. Good friends keep their promises.',forget:'Sam is counting on you. Keep your promise.',leave:'Sam is sad. A good friend stays and helps.'};
VIS.reg('flagfriend',c=>{let A,pad,quizBox,qn=-1,tok=0,streak=0;c.fig.classList.add('young');
const blank=()=>({hook:()=>{},got:0,r:0,pinned:[],held:-1,drag:null,miss:-1,seq:[],smile:0}),S=blank();
const part=()=>['pin','play','trust','fix','spot','quiz'][A.step];
const quick=()=>A.reduced(),fs=n=>Math.round(n*(A.narrow?1:1.15));
const speak=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
function word(g,t,x,y,n,col){g.font=`800 ${fs(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-16)}
function lines(g,t,x,y,w,n){g.font=`700 ${fs(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=A.col.tx;const out=[];let row='';
 t.split(' ').forEach(s=>{const z=row?row+' '+s:s;if(g.measureText(z).width>w&&row){out.push(row);row=s}else row=z});out.push(row);const lh=fs(n)*1.2;out.forEach((s,i)=>g.fillText(s,x,y+(i-(out.length-1)/2)*lh))}
/* a child: head with a mood, a coloured top */
function child(g,x,y,r,mood,top){g.fillStyle=top;A.paint.rrect(x-r*.9,y+r*.85,r*1.8,r*1.6,r*.4);g.fill();g.fillStyle='#e8b98a';g.beginPath();g.arc(x,y,r,0,7);g.fill();g.strokeStyle='#5b3a1e';g.lineWidth=2.5;g.stroke();
 g.fillStyle='#3b2a1a';[-1,1].forEach(d=>{g.beginPath();g.arc(x+d*r*.35,y-r*.12,r*.09,0,7);g.fill()});g.lineWidth=3;g.beginPath();
 if(mood==='happy')g.arc(x,y+r*.12,r*.42,.2*Math.PI,.8*Math.PI);else if(mood==='cross'){g.moveTo(x-r*.3,y+r*.45);g.lineTo(x+r*.3,y+r*.45);g.moveTo(x-r*.55,y-r*.5);g.lineTo(x-r*.18,y-r*.32);g.moveTo(x+r*.55,y-r*.5);g.lineTo(x+r*.18,y-r*.32)}
 else g.arc(x,y+r*.62,r*.34,1.2*Math.PI,1.8*Math.PI);g.stroke()}
function star(g,x,y,s,col){g.fillStyle=col;g.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,q=i%2?s*.45:s;g.lineTo(x+q*Math.cos(a),y+q*Math.sin(a))}g.closePath();g.fill()}
function tile(g,t,rc,hot,bad){const C=A.col;g.fillStyle=C.dark?'#1e293b':'#f0fdf4';A.paint.rrect(rc.x,rc.y,rc.w,rc.h,14);g.fill();g.strokeStyle=bad?C.rd:hot?C.vi:C.tx;g.lineWidth=bad||hot?5:2.5;A.paint.rrect(rc.x,rc.y,rc.w,rc.h,14);g.stroke();lines(g,t,rc.x+rc.w/2,rc.y+rc.h/2,rc.w-12,12)}
/* ---- layout ---- */
function row(n,y,h){const{W}=A,gap=10,w=Math.min((W-20-gap*(n-1))/n,180),x0=(W-n*w-gap*(n-1))/2;return Array.from({length:n},(_,k)=>({x:x0+k*(w+gap),y,w,h}))}
const pal=()=>({x:A.W/2,y:A.H*.2,r:Math.min(A.W,A.H)*.1});
function badgeRects(){const base=row(3,A.H*.56,A.H*.18).concat(row(3,A.H*.78,A.H*.18));return BADGE.map((_,i)=>S.drag&&S.drag.i===i&&S.drag.x!=null?{...base[i],x:S.drag.x-base[i].w/2,y:S.drag.y-base[i].h/2}:base[i])}
const choiceRects=()=>row(3,A.H*.5,A.H*.46);
const stepRects=()=>row(3,A.H*.42,A.H*.36);
const frameRects=()=>row(3,A.H*.12,A.H*.78);
/* ---- drawing ---- */
function meter(g,n,max){for(let i=0;i<max;i++)star(g,A.W/2-(max-1)*14+i*28,A.H*.47,10,i<n?A.col.am:A.alpha(A.col.mu,.35))}
function drawPin(g){const C=A.col,p=pal(),done=S.pinned.length;child(g,p.x,p.y,p.r,done>=4?'happy':done?'happy':'sad','#0ea5e9');
 S.pinned.forEach((i,k)=>star(g,p.x-p.r*.6+k*p.r*.4,p.y+p.r*1.6,p.r*.18,C.am));word(g,'A good friend is…',A.W/2,A.H*.47,14);
 badgeRects().forEach((rc,i)=>{if(!S.pinned.includes(i))tile(g,BADGE[i][0],rc,S.held===i,S.miss===i)})}
function drawScene(g,list){const[line,mood]=list[Math.min(S.r,2)],C=A.col,r=Math.min(A.W,A.H)*.085;child(g,A.W*.14,A.H*.15,r,mood,'#f472b6');
 g.fillStyle=C.dark?'#1e293b':'#ffffff';A.paint.rrect(A.W*.28,A.H*.04,A.W*.68,A.H*.3,14);g.fill();g.strokeStyle=C.mu;g.lineWidth=2;A.paint.rrect(A.W*.28,A.H*.04,A.W*.68,A.H*.3,14);g.stroke();lines(g,line,A.W*.62,A.H*.19,A.W*.62,14);
 meter(g,S.got,3);choiceRects().forEach((rc,k)=>tile(g,S.opts[k][0],rc,false,S.miss===k))}
function drawFix(g){const C=A.col,[what,good]=FIX[Math.min(S.r,1)];lines(g,what,A.W/2,A.H*.14,A.W-30,15);
 const rs=stepRects();S.cards.forEach((k,j)=>{const rc=rs[j],n=S.seq.indexOf(k);tile(g,good[k],rc,n>=0,S.miss===j);if(n>=0){g.fillStyle=C.gr;g.beginPath();g.arc(rc.x+20,rc.y+20,15,0,7);g.fill();word(g,String(n+1),rc.x+20,rc.y+20,13,'#ffffff')}});
 word(g,'Tap the steps in order: 1, 2, 3',A.W/2,A.H*.88,12,C.tx)}
function drawSpot(g){const C=A.col,fr=STRIP[Math.min(S.r,2)];frameRects().forEach((rc,k)=>{const[t,ok]=fr[k],x=rc.x+rc.w/2,r=Math.min(rc.w*.18,rc.h*.12);
 g.fillStyle=S.miss===k?A.alpha(C.rd,.16):A.alpha(C.cy,.1);A.paint.rrect(rc.x,rc.y,rc.w,rc.h,16);g.fill();g.strokeStyle=S.miss===k?C.rd:A.alpha(C.cy,.8);g.lineWidth=S.miss===k?5:3;A.paint.rrect(rc.x,rc.y,rc.w,rc.h,16);g.stroke();
 child(g,x-r*1.3,rc.y+rc.h*.28,r,ok?'happy':'cross','#22c55e');child(g,x+r*1.3,rc.y+rc.h*.28,r,ok?'happy':'sad','#a855f7');lines(g,t,x,rc.y+rc.h*.8,rc.w-10,12)})}
function draw(A){const{ctx:g,W,H,col:C}=A,v=part();g.fillStyle=A.mix(C.pn,'#dcfce7',C.dark?.04:.35);g.fillRect(0,0,W,H);
 if(v==='quiz'){const p=pal();child(g,W/2-p.r*1.3,H*.3,p.r,'happy','#0ea5e9');child(g,W/2+p.r*1.3,H*.3,p.r,'happy','#f472b6');word(g,'Kind. Honest. Fair. Fun.',W/2,H*.75,17);return}
 if(S.got>=target()){const p=pal();child(g,W/2,H*.28,p.r,'happy','#0ea5e9');lines(g,closing(),W/2,H*.66,W-30,15);return A.fx.draw(g)}
 if(v==='pin')drawPin(g);if(v==='play')drawScene(g,PLAY);if(v==='trust')drawScene(g,TRUST);if(v==='fix')drawFix(g);if(v==='spot')drawSpot(g);A.fx.draw(g)}
const target=()=>({pin:4,play:3,trust:3,fix:2,spot:3}[part()]||9);
const closing=()=>({pin:'Kind, honest, keeps promises, lets you join.',play:'Good friends take turns and let others join.',trust:'Good friends tell the truth and keep promises.',fix:'Friends fall out. Calm down, say sorry, play again.',spot:'Bossy, mean and leaving out are not friendly.'}[part()]);
const nope=(t,b)=>{A.sound.miss();S.miss=b==null?-1:b;speak(t);setTimeout(()=>{S.miss=-1;A.redraw()},quick()?10:900);A.redraw()};
function prep(){const v=part(),r=S.r;S.held=-1;S.drag=null;S.seq=[];
 if(v==='play'||v==='trust')S.opts=(v==='play'?PLAY:TRUST)[Math.min(r,2)][2];
 if(v==='fix')S.cards=r%2?[2,0,1]:[1,2,0]}
function yes(t){S.got++;S.r++;A.sound.pop();if(S.got<target()){prep();speak(t+' Next one.')}else speak(t);buttons();A.redraw();S.hook()}
function pin(i){if(part()!=='pin'||S.pinned.includes(i)||S.got>=4)return;S.held=-1;const[w,good,why]=BADGE[i];
 if(!good)return nope(`${w}? No. ${why}`,i);S.pinned.push(i);S.got++;A.sound.tick();
 if(S.got>=4){speak(`Yes! ${why} Your friend has all 4 badges.`);A.sound.pop();buttons();A.redraw();return S.hook()}speak(`Yes! ${why}`);buttons();A.redraw()}
function choose(b){const v=part();if(!(v==='play'||v==='trust')||S.got>=3)return;const tag=S.opts[b][1];if(tag!=='ok')return nope(WHY[tag],b);yes(v==='play'?'That is fair and friendly!':'That is honest and kind!')}
function order(j){if(part()!=='fix'||S.got>=2)return;const k=S.cards[j];if(S.seq.includes(k))return;const want=S.seq.length;
 if(k!==want)return nope(ORDER_WHY[want],j);S.seq.push(k);A.sound.tick();if(S.seq.length===3)return yes('Fixed! Friends can make up.');speak(`Step ${want+1}: ${FIX[Math.min(S.r,1)][1][k]}. What next?`);A.redraw()}
function spot(k){if(part()!=='spot'||S.got>=3)return;const[t,ok]=STRIP[Math.min(S.r,2)][k];if(ok)return nope(`"${t}" is friendly. Look for bossy, mean or leaving someone out.`,k);yes(`Yes! "${t}" is not being a good friend.`)}
function cycle(){const left=BADGE.map((_,i)=>i).filter(i=>!S.pinned.includes(i));if(!left.length)return;S.held=left[(left.indexOf(S.held)+1)%left.length];A.sound.tick();speak(`Holding: ${BADGE[S.held][0]}. Now tap Pin on friend.`);A.redraw()}
function buttons(){if(!pad)return;pad.innerHTML='';const v=part(),K=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=fn};
 if(v==='quiz'||S.got>=target())return;
 if(v==='pin')BADGE.forEach((b,i)=>{if(!S.pinned.includes(i))K(b[0],()=>pin(i),`Pin the badge ${b[0]} on your friend`)});
 if(v==='play'||v==='trust')S.opts.forEach((o,b)=>K(o[0],()=>choose(b)));
 if(v==='fix')S.cards.forEach((k,j)=>{if(!S.seq.includes(k))K(FIX[Math.min(S.r,1)][1][k],()=>order(j),`Step: ${FIX[Math.min(S.r,1)][1][k]}`)});
 if(v==='spot')STRIP[Math.min(S.r,2)].forEach(([t],k)=>K(`Picture ${k+1}`,()=>spot(k),`Picture ${k+1}: ${t}`))}
/* pointer: drag a badge onto the friend, or tap the other parts */
const inR=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
const onPal=p=>{const q=pal();return Math.hypot(p.x-q.x,p.y-q.y-q.r*.6)<q.r*2.2};
function down(p){const v=part();if(S.got>=target())return false;
 if(v==='pin'){const i=badgeRects().findIndex((r,j)=>!S.pinned.includes(j)&&inR(p,r));if(i>=0){S.drag={i,x:null,x0:p.x,y0:p.y};return true}if(onPal(p)&&S.held>=0)pin(S.held);return false}
 if(v==='play'||v==='trust'){const b=choiceRects().findIndex(r=>inR(p,r));if(b>=0)choose(b);return false}
 if(v==='fix'){const j=stepRects().findIndex(r=>inR(p,r));if(j>=0)order(j);return false}
 if(v==='spot'){const k=frameRects().findIndex(r=>inR(p,r));if(k>=0)spot(k)}return false}
function move(p){if(!S.drag)return;if(S.drag.x!=null||Math.hypot(p.x-S.drag.x0,p.y-S.drag.y0)>8){S.drag.x=p.x;S.drag.y=p.y;A.redraw()}}
function up(p){const d=S.drag;S.drag=null;if(!d)return;if(d.x==null){S.held=d.i;A.sound.tick();speak(`Holding: ${BADGE[d.i][0]}. Tap your friend to pin it.`);return A.redraw()}if(onPal(p))pin(d.i);A.redraw()}
const check=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function demo(list,gap){const k=++tok;list.forEach((fn,j)=>setTimeout(()=>{if(k===tok)fn()},quick()?j*40+30:(j+1)*(gap||300)))}
const reset=()=>{tok++;Object.assign(S,blank());if(A)prep()};
const goodAt=()=>S.opts.findIndex(o=>o[1]==='ok');
const steps=[
{h:'A good friend is…',p:'Drag a badge onto your friend. Or tap a badge button. Only good-friend badges stick.',task:'Pin 4 badges',
 show:()=>{steps[0].go();demo(BADGE.map((b,i)=>b[1]?()=>pin(i):null).filter(Boolean),550)},go:()=>{reset();speak('Which badges make a good friend?');buttons();S.hook=check(0,()=>S.got>=4,'Good friends are kind, honest, keep promises and let you join.')}},
{h:'Play fair',p:'What does a good friend do? Tap it.',predict:{q:'You and Mia want different games. A good friend…',opts:['always gets their own way','takes turns choosing'],ans:1},task:'Choose 3 times',
 show:()=>{steps[1].go();demo(PLAY.map(()=>()=>choose(goodAt())),600)},go:()=>{reset();speak(PLAY[0][0]+' What do you do?');buttons();S.hook=check(1,()=>S.got>=3,'Taking turns and letting others join keeps it fair.')}},
{h:'Honest and true',p:'Good friends tell the truth and do what they said. Tap what a good friend does.',predict:{q:'You said you would sit with Sam. Then Ben asks you. What does a good friend do?',opts:['Go with Ben. Sam will not mind.','Keep the promise to Sam'],ans:1},task:'Choose 3 times',
 show:()=>{steps[2].go();demo(TRUST.map(()=>()=>choose(goodAt())),600)},go:()=>{reset();speak(TRUST[0][0]+' What do you do?');buttons();S.hook=check(2,()=>S.got>=3,'Friends trust you when you are honest and keep promises.')}},
{h:'Make up',p:'Even good friends fall out. Tap the steps to make up, in order.',task:'Fix 2 fall-outs',
 show:()=>{steps[3].go();demo([0,1].flatMap(()=>[0,1,2].map(n=>()=>order(S.cards.indexOf(n)))),380)},go:()=>{reset();speak(FIX[0][0]+' How do they make up?');buttons();S.hook=check(3,()=>S.got>=2,'Calm down, say sorry, then play again.')}},
{h:'Spot it',p:'Look at the pictures. Tap the one where someone is not a good friend.',task:'Spot 3',
 show:()=>{steps[4].go();demo(STRIP.map(()=>()=>spot(STRIP[Math.min(S.r,2)].findIndex(f=>!f[1]))),600)},go:()=>{reset();speak('Which picture is not friendly?');buttons();S.hook=check(4,()=>S.got>=3,'Bossy, mean words and leaving out are not friendly.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.hook()});
const QS=[['Which one is a good friend?',[['Ella, who lets you join','ok'],['Max, who says: do what I say!','bossy'],['Jo, who only plays if you give her sweets','deal']]],
 ['Your friend fell out with you. Is the friendship over?',[['No. Say sorry and make up.','ok'],['Yes, forever','over'],['Yes, find a new friend','over']]],
 ['You lost your friend\'s book. What does a good friend do?',[['Tell the truth and say sorry','ok'],['Say you never had it','lie'],['Hide and hope they forget','hide']]],
 ['A new boy wants to play. What does a good friend do?',[['Say: come and play!','ok'],['Say: no new kids','out'],['Turn away and whisper','mean']]],
 ['You said: I will play with you at break. What now?',[['Play with them at break','ok'],['Play with someone else','break'],['Stay inside and forget','break']]]];
function because(t){let m='A good friend is kind, honest, fair and lets others join.';
 if(t==='bossy')m='Bossy friends tell everyone what to do. Good friends take turns.';if(t==='deal')m='A good friend does not make you pay to play.';
 if(t==='over')m='Friends have ups and downs. You can make up and be friends again.';if(t==='lie')m='That is not true. Honest friends tell the truth.';
 if(t==='hide')m='Hiding is not honest. Tell them and say sorry.';if(t==='out')m='Leaving someone out makes them sad. Let them join.';
 if(t==='mean')m='Whispering and turning away is mean. Say hello and smile.';if(t==='break')m='You made a promise. Keep it, so your friend can trust you.';return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;
 quizBox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const wrapBtns=quizBox.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},wrapBtns,o);b.onclick=()=>judge(t)});speak('Challenge: '+q);A.redraw()}
function judge(t){quizBox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quizBox.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! That is a good friend.':'✗ '+because(t)}${ok?` Stars in a row: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:A=>{quizBox.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quizBox=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}});
A.start()})})();
