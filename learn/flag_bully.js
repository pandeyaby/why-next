/* Flagship – understanding bullying (ages 7–9): mark the days on a week strip to tell a one-off falling out from
   behaviour that happens again and again; sort hurts that are on purpose from accidents; load a power see-saw and then
   level it with helpers; sort physical, verbal, social and cyberbullying; sort actions that help from ones that make
   it worse. Every drag has a tap or button twin, and the canvas label always says what is on screen. */
(()=>{
const DAYS=['Mon','Tue','Wed','Thu','Fri'];
const WEEK=[{t:'Monday: Jo and Ava both want the red pen. They shout. Then they say sorry and play.',d:[0],rep:0},
 {t:'Monday to Thursday: Max hides Ava\'s bag and laughs with his friends.',d:[0,1,2,3],rep:1},
 {t:'Every lunch this week, Lily tells Sam: "You can\'t sit with us."',d:[0,1,2,3,4],rep:1}];
const DECKS={
 aim:{bins:['On purpose','By accident'],cards:[['Kai bumps into you in a busy line.',1,'In a busy line bumps happen. He did not plan it.'],
  ['Kai trips you up, then laughs with his mates.',0,'He laughed, so he meant it. That is on purpose.'],
  ['Ella kicks a ball and it hits you by mistake.',1,'The ball went the wrong way. She did not mean it.'],
  ['Ella hides your PE shoes every Friday.',0,'Doing it every Friday takes a plan. That is on purpose.'],
  ['Tom steps on your foot and says "Sorry!"',1,'He said sorry straight away. It was an accident.'],
  ['Tom calls you a name to make others laugh.',0,'He chose the name to hurt you. That is on purpose.']]},
 pow:{bins:['Max','Ava'],cards:[['3 friends join in with Max',0,'The friends join Max, so they make his side stronger.'],
  ['Max is older and bigger',0,'Being older and bigger gives Max more power.'],
  ['Max knows a secret about Ava',0,'Max can use the secret to scare Ava. That is power for Max.'],
  ['A trusted grown-up',1,'A grown-up helps Ava. Put them on her side.'],
  ['A friend who stands with Ava',1,'That friend is on Ava\'s side. They are an upstander.'],
  ['Kids who say "Stop it!"',1,'Saying "Stop it!" helps Ava, so it goes on her side.']]},
 kind:{bins:['Physical','Verbal','Social','Cyber'],tip:['hurting a body or things','hurting with words','leaving out, rumours','online, on screens'],
  cards:[['Pushing Ava over every playtime',0,'Pushing hurts her body. That is physical bullying.'],
  ['Calling Sam names about his glasses',1,'Names are words. That is verbal bullying.'],
  ['Telling everyone "Don\'t play with Mo"',2,'Leaving Mo out on purpose is social bullying.'],
  ['Sending mean messages in a game chat',3,'Messages on a screen are cyberbullying.'],
  ['Spreading a made-up story about Ella',2,'A made-up story told about someone is a rumour. That is social bullying.'],
  ['Taking and breaking Leo\'s things',0,'Breaking his things is physical bullying.'],
  ['Posting a photo online to laugh at Jo',3,'Posting online to laugh at Jo is cyberbullying.'],
  ['Saying "I\'ll get you after school"',1,'A threat is said in words. That is verbal bullying.']]},
 act:{bins:['Helps','Makes it worse'],cards:[['Tell a trusted grown-up',0,'Telling a grown-up is the best help. They can stop it.'],
  ['Keep it a secret',1,'A secret lets bullying keep going. Tell a grown-up.'],
  ['Hit back',1,'Hitting back can get you hurt or in trouble. Get away and tell.'],
  ['Save the mean messages to show',0,'Saved messages show a grown-up what happened.'],
  ['Send a mean message back',1,'A mean reply makes it bigger. Save it and tell.'],
  ['Stand with them and be kind',0,'Being kind to the person is what an upstander does.'],
  ['Laugh along so you are not next',1,'Laughing along joins in with the bully.'],
  ['Tell again if it does not stop',0,'If it does not stop, tell again, or tell a new grown-up.']]}};
VIS.reg('flagbully',c=>{let A,pad,quiz,qi=-1,run=0;c.fig.classList.add('young');
const B0=()=>({want:()=>{},won:0,si:0,marks:[],ci:0,put:[],drag:null,hot:-1,lit:-1}),S=B0();
const mode=()=>['week','aim','pow','kind','act','quiz'][A.step],deck=()=>DECKS[mode()];
const fz=n=>Math.round(n*(A.narrow?1:1.12)),R=()=>A.reduced();
const tell=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
function say(g,t,x,y,n,col,wt){g.font=`${wt||800} ${fz(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-16)}
function wrap(g,t,x,y,w,n,col){g.font=`700 ${fz(n)}px system-ui,sans-serif`;const L=[];let cur='';t.split(' ').forEach(z=>{const s=cur?cur+' '+z:z;if(g.measureText(s).width>w&&cur){L.push(cur);cur=z}else cur=s});L.push(cur);
 const h=fz(n)*1.25;L.forEach((s,i)=>say(g,s,x,y+(i-(L.length-1)/2)*h,n,col,700))}
function tile(g,x,y,w,h,col,a,edge){g.fillStyle=A.alpha(col,a);A.paint.rrect(x,y,w,h,14);g.fill();g.strokeStyle=edge||col;g.lineWidth=edge?5:2.5;A.paint.rrect(x,y,w,h,14);g.stroke()}
/* week strip */
const dayBox=i=>{const{W,H}=A,w=(W-24)/5;return{x:12+i*w+3,y:H*.44,w:w-6,h:H*.26}};
function drawWeek(g){const{W,H}=A,C=A.col,s=WEEK[Math.min(S.si,2)];tile(g,10,H*.04,W-20,H*.3,C.am,.14);wrap(g,s.t,W/2,H*.19,W-44,15);
 DAYS.forEach((d,i)=>{const b=dayBox(i),on=S.marks.includes(i);tile(g,b.x,b.y,b.w,b.h,on?C.rd:C.mu,on?.28:.08,S.lit===i?C.rd:null);say(g,d,b.x+b.w/2,b.y+b.h*.3,14);if(on)say(g,'✗',b.x+b.w/2,b.y+b.h*.7,22,C.rd)});
 const n=S.marks.length;say(g,n?(n===1?'1 time: a one-off':`${n} times: again and again`):'Tap the days it happened',W/2,H*.82,15);say(g,`Story ${Math.min(S.si+1,3)} of 3`,W/2,H*.94,12,C.mu,600)}
/* sorting decks */
const binBox=i=>{const{W,H}=A,n=deck().bins.length,w=(W-20)/n;return{x:10+i*w+3,y:H*.52,w:w-6,h:H*.44}};
const cardBox=()=>{const{W,H}=A;return{x:W*.06,y:H*.05,w:W*.88,h:H*.27}};
function drawCard(g){const k=deck().cards[S.ci];if(!k)return;const b=cardBox(),d=S.drag,x=d?d.x-b.w/2:b.x,y=d?d.y-b.h/2:b.y;
 A.paint.shadow(10,4,.22);tile(g,x,y,b.w,b.h,A.col.cy,.2);A.paint.noShadow();g.fillStyle=A.col.pn;A.paint.rrect(x+4,y+4,b.w-8,b.h-8,11);g.fill();wrap(g,k[0],x+b.w/2,y+b.h/2,b.w-30,15);
 if(!d)say(g,mode()==='pow'?'Drag me to Max or Ava ↓':'Drag me into a box ↓',A.W/2,A.H*.41,12,A.col.mu,600)}
function drawBins(g){const D=deck(),C=A.col,cols=[C.gr,C.vi,C.or,C.cy];D.bins.forEach((t,i)=>{const b=binBox(i),n=S.put.filter(p=>p[1]===i).length;
 tile(g,b.x,b.y,b.w,b.h,cols[i%4],.14,S.hot===i?C.rd:null);say(g,t,b.x+b.w/2,b.y+fz(16),D.bins.length>3?13:16);if(D.tip)wrap(g,D.tip[i],b.x+b.w/2,b.y+fz(44),b.w-10,10,C.mu);
 for(let j=0;j<n;j++){g.fillStyle=cols[i%4];A.paint.rrect(b.x+8,b.y+b.h-14-j*12,b.w-16,9,4);g.fill()}say(g,String(n),b.x+b.w/2,b.y+b.h*.62,22)})}
/* the power see-saw: Max's weights on the left, Ava's on the right */
function drawSaw(g){const{W,H}=A,C=A.col,m=S.put.filter(p=>p[1]===0).length,a=S.put.filter(p=>p[1]===1).length,ang=Math.max(-.32,Math.min(.32,(m-a)*.11)),
 px=W/2,py=H*.8,L=W*.4;g.fillStyle=C.mu;g.beginPath();g.moveTo(px,py);g.lineTo(px-22,py+H*.14);g.lineTo(px+22,py+H*.14);g.fill();
 g.save();g.translate(px,py);g.rotate(-ang);g.fillStyle=C.tx;A.paint.rrect(-L,-7,2*L,14,7);g.fill();
 [[-1,m,C.vi,'Max'],[1,a,C.gr,'Ava']].forEach(([s,n,col,who])=>{for(let j=0;j<n;j++){g.fillStyle=col;A.paint.rrect(s*L*.75-18,-22-j*18,36,15,4);g.fill()}say(g,who,s*L*.75,26,15)});g.restore();
 say(g,m>a?'Max has more power. Hard for Ava to stop it.':m===a&&m?'Level! With help, Ava is not alone.':'',W/2,H*.47,14,m>a?C.rd:C.gr)}
function draw(A){const{ctx:g,W,H,col:C}=A,v=mode();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.04:.4);g.fillRect(0,0,W,H);
 if(v==='quiz'){say(g,'Repeated, on purpose, and hard to stop?',W/2,H*.4,15);say(g,'🛑 Tell a trusted grown-up',W/2,H*.6,18);return}
 if(S.won>=goal()){wrap(g,doneText(),W/2,H/2,W-40,16);return A.fx.draw(g)}
 if(v==='week')drawWeek(g);else{if(v==='pow'){drawSaw(g);const D=deck();D.bins.forEach((t,i)=>{if(S.hot===i){const b=binBox(i);g.strokeStyle=C.rd;g.lineWidth=5;A.paint.rrect(b.x,b.y,b.w,b.h,14);g.stroke()}})}else drawBins(g);drawCard(g)}
 A.fx.draw(g)}
const goal=()=>({week:3,aim:1,pow:1,kind:1,act:1}[mode()]||9);
function doneText(){return{week:'Once is a falling out. Again and again, on purpose, is bullying.',aim:'Bullying is on purpose. Accidents are not bullying.',
 pow:'Bullies use power. Helpers and grown-ups level it up.',kind:'Physical, verbal, social and cyber: all four are bullying.',act:'Tell a trusted grown-up. Keep telling until it stops.'}[mode()]}
const miss=(t,lit)=>{A.sound.miss();if(mode()==='week')S.lit=lit==null?-1:lit;else S.hot=lit==null?-1:lit;tell(t);setTimeout(()=>{S.lit=S.hot=-1;A.redraw()},R()?10:900);A.redraw()};
function win(t){S.won++;A.sound.pop();tell(t);buttons();A.redraw();S.want()}
function mark(i){if(mode()!=='week'||S.won>=3)return;const s=WEEK[S.si];if(S.marks.includes(i))return miss(`You marked ${DAYS[i]} already.`,i);
 if(!s.d.includes(i))return miss(`The story does not say ${DAYS[i]}. Read it again.`,i);S.marks.push(i);A.sound.tick();tell(`${DAYS[i]} marked. ${S.marks.length} so far.`);buttons();A.redraw()}
function verdict(rep){if(mode()!=='week'||S.won>=3)return;const s=WEEK[S.si];if(S.marks.length<s.d.length)return miss('Mark every day it happened first.');
 if(rep!==s.rep)return miss(rep?'It only happened once, and they made up. That is a falling out, not bullying.':`It happened ${s.d.length} times. That is again and again.`);
 S.si++;S.marks=[];win(rep?'Again and again. That is part of bullying.':'Just once. A falling out is not bullying.')}
function place(b){const D=deck(),k=D&&D.cards[S.ci];if(!k||S.won)return;S.drag=null;if(b!==k[1])return miss(k[2],b);
 S.put.push([S.ci,b]);S.ci++;A.sound.tick();if(S.ci>=D.cards.length)return win(doneText());tell(`Yes: ${D.bins[b]}. Next card: ${D.cards[S.ci][0]}`);buttons();A.redraw()}
function buttons(){if(!pad)return;pad.innerHTML='';const v=mode(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=fn};
 if(v==='quiz'||S.won>=goal())return;
 if(v==='week'){const s=WEEK[S.si];B('Mark the next day',()=>{const i=s.d.find(d=>!S.marks.includes(d));if(i!=null)mark(i)},'Mark the next day the story says');B('Just once',()=>verdict(0));B('Again and again',()=>verdict(1));return}
 deck().bins.forEach((t,i)=>B('→ '+t,()=>place(i),'Put this card in '+t))}
function down(p){const v=mode();if(v==='quiz'||S.won>=goal())return false;
 if(v==='week'){for(let i=0;i<5;i++){const b=dayBox(i);if(p.x>b.x&&p.x<b.x+b.w&&p.y>b.y&&p.y<b.y+b.h){mark(i);break}}return false}
 const b=cardBox();if(p.x>b.x&&p.x<b.x+b.w&&p.y>b.y&&p.y<b.y+b.h){S.drag={x:p.x,y:p.y};A.redraw();return true}
 const i=binAt(p);if(i>=0)place(i);return false}
const binAt=p=>p.y>A.H*.45?Math.max(0,Math.min(deck().bins.length-1,Math.floor((p.x-10)/((A.W-20)/deck().bins.length)))):-1;
function move(p){if(S.drag){S.drag={x:p.x,y:p.y};A.redraw()}}
function up(p){if(!S.drag)return;const i=binAt(p);S.drag=null;if(i>=0)place(i);else A.redraw()}
const chk=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list,gap){const k=++run;list.forEach((fn,j)=>setTimeout(()=>{if(k===run)fn()},R()?j*40+30:(j+1)*(gap||240)))}
const fresh=()=>{run++;Object.assign(S,B0())};
const sortAll=()=>deck().cards.map(k=>()=>place(k[1]));
const setup=(n,say0,msg)=>()=>{fresh();tell(say0);buttons();S.want=chk(n,()=>S.won>=goal(),msg)};
const steps=[
{h:'Once, or again and again?',p:'Read the story. Tap each day it happened. Then choose: just once, or again and again.',
 predict:{q:'Two friends shout at each other once, then make up. Is that bullying?',opts:['Yes, it is bullying','No, it is a falling out'],ans:1},task:'Check all 3 stories',
 show:()=>{steps[0].go();play(WEEK.flatMap(s=>s.d.map(d=>()=>mark(d)).concat([()=>verdict(s.rep)])),170)},go:setup(0,'Story 1. Tap the days it happened.','Bullying happens again and again. One fight is a falling out.')},
{h:'On purpose?',p:'Bullying is done on purpose, to hurt. Drag each card to On purpose or By accident.',task:'Sort all 6 cards',
 show:()=>{steps[1].go();play(sortAll(),260)},go:setup(1,'Is it on purpose, or by accident?','An accident is not bullying. Bullying is meant to hurt.')},
{h:'Who has the power?',p:'Bullies often have more power: more friends, bigger, or a secret. Put each card on the side it helps.',
 predict:{q:'Max has 3 friends with him. Ava is on her own. Who finds it harder to stop?',opts:['Max','Ava','Both the same'],ans:1},task:'Load the see-saw, then level it',
 show:()=>{steps[2].go();play(sortAll(),260)},go:setup(2,'Put each card on Max\'s side or Ava\'s side.','Power makes it hard to stop. Helpers even it up.')},
{h:'Four kinds',p:'Physical hurts a body. Verbal uses words. Social leaves people out or spreads rumours. Cyber happens online.',
 predict:{q:'Leaving Mo out on purpose, day after day. Is that bullying?',opts:['No, only hitting counts','Yes, it is social bullying'],ans:1},task:'Sort all 8 cards',
 show:()=>{steps[3].go();play(sortAll(),240)},go:setup(3,'Which kind of bullying is it?','No hitting needed: words, leaving out and screens can be bullying too.')},
{h:'What can you do?',p:'If it happens to you, or you see it, what helps? Drag each card to Helps or Makes it worse.',
 predict:{q:'A friend says "Don\'t tell, it will get worse." What is best?',opts:['Keep it secret','Tell a trusted grown-up'],ans:1},task:'Sort all 8 actions',
 show:()=>{steps[4].go();play(sortAll(),240)},go:setup(4,'Helps, or makes it worse?','Tell, save proof, stand with them, and tell again if it does not stop.')},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Rob and Zara argue about a game once, then play again. What is it?',[['A falling out','ok'],['Bullying','once'],['Cyberbullying','where']]],
 ['Every day, Kim tells others not to play with Ana. What kind of bullying?',[['Social','ok'],['Physical','hit'],['It is not bullying','words']]],
 ['Mean messages about Leo keep coming in a game chat. What should Leo do first?',[['Save them and tell a grown-up','ok'],['Send a mean one back','back'],['Delete them and say nothing','secret']]],
 ['You see Ella being pushed every playtime. What does an upstander do?',[['Get a grown-up and be kind to Ella','ok'],['Watch and say nothing','watch'],['Push the bully','back']]],
 ['Leo told a teacher, but it is still going on. What now?',[['Tell again, or tell another grown-up','ok'],['Give up, telling does not work','quit'],['Keep it secret now','secret']]]];
function why(t){let m='Bullying is repeated, on purpose and hard to stop. Tell a trusted grown-up.';
 if(t==='once')m='It happened once and they made up. Bullying happens again and again.';
 if(t==='where')m='Nothing happened online, and it was only once. It is a falling out.';
 if(t==='hit')m='No one is hurt in the body. Leaving someone out is social bullying.';
 if(t==='words')m='Leaving someone out on purpose, day after day, is bullying. It is called social bullying.';
 if(t==='back')m='Hitting or being mean back can make it worse and get you hurt. Get away and tell a grown-up.';
 if(t==='secret')m='Keeping quiet lets it go on. Save the proof and tell a trusted grown-up.';
 if(t==='watch')m='Watching and saying nothing is being a bystander. An upstander gets help and is kind.';
 if(t==='quit')m='Keep telling. If one grown-up does not stop it, tell another one until it stops.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});tell('Challenge: '+q);A.redraw()}
let streak=0;
function judge(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes, well spotted.':'✗ '+why(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});buttons()}});
A.start()})})();
