/* Flagship – resolving disagreements with friends (ages 7–9). Ava and Leo fall out. Cool the cross-o-meter before
   talking, say how you feel with an I-statement, listen and say back the other side, then drag a fix onto the table and
   watch both friends' star meters: only a fix that gives each of them enough is one both can accept. Last, sort what
   friends can sort out themselves from what needs a grown-up. */
(()=>{
const COOL=[['Take 3 slow breaths',1],['Shout louder',0],['Count to 5',1],['Grab the ball',0],['Step back for a minute',1],['Call Leo a name',0]];
const HOT={'Shout louder':'Shouting makes you both crosser. The meter goes up.','Grab the ball':'Grabbing starts a new fight. The meter goes up.','Call Leo a name':'A name hurts Leo and heats you up.'};
/* say: [what happened, [line, tag]] */
const SAY=[['Leo took over your game.',[['You always ruin everything!','blame'],['I feel cross because I wanted a turn to choose.','ok'],['Say nothing and sulk.','quiet']]],
 ['Leo laughed at your drawing.',[['You are so mean.','name'],['Fine, I do not care.','quiet'],['I felt upset when you laughed at my drawing.','ok']]],
 ['Leo did not pass you the ball all game.',[['I feel left out because I did not get the ball.','ok'],['You are the worst player ever!','name'],['It is all your fault!','blame']]]];
/* listen: [Leo says, [reply, tag]] */
const HEAR=[['I want tag because we played football yesterday.',[['But I want football!','talk'],['So you want tag because we had football yesterday?','ok'],['That is a silly reason.','mock']]],
 ['I took the swing because I only had one go.',[['So you felt you did not get a fair go?','ok'],['Stop talking, it is my turn.','talk'],['Whatever.','mock']]],
 ['I used the red pen because the dragon needs fire.',[['Who cares about fire?','mock'],['You want red for the fire, and so do I?','ok'],['Give it! Give it now!','talk']]]];
/* fixes: [problem, [fix, Ava stars, Leo stars, tag]] — accept when both get 2+ */
const FIX=[['Ava wants football. Leo wants tag.',[['Ava picks: football all break',3,0,'win'],['Tag first, then football',2,2,'ok'],['Nobody plays',0,0,'lose'],['Leo picks: tag all break',0,3,'win']]],
 ['One swing. Both want it.',[['Both stomp off',0,0,'lose'],['Take turns: 10 pushes each',2,2,'ok'],['Leo keeps it all break',0,3,'win'],['Ava pushes Leo off',3,0,'win']]],
 ['One red pen. Both want to colour the dragon.',[['Ava gives in, like always',0,3,'givein'],['Snap the pen in two',0,0,'lose'],['Leo does the fire, Ava the wings, then swap',2,2,'ok'],['Ava hides the pen',3,0,'win']]]];
const FIXWHY={win:(a,b)=>`${a} gets it all and ${b} gets nothing. ${b} will not agree to that.`,lose:()=>'Nobody gets anything. Both lose, so it is not a fix.',givein:()=>'Giving in every time is not fair to Ava. Find a fix that works for both.'};
/* help: [what, 0 = we can sort it, 1 = get a grown-up] */
const HELP=[['We both want the same seat.',0],['Someone is hitting.',1],['We talked twice and still cannot agree.',1],['We want different games.',0],['Someone is hurt or scared.',1],['We both want the blue pen.',0]];
const BINS=['We can sort it','Get a grown-up'];
VIS.reg('flagagree',c=>{let A,pad,quiz,qn=-1,run=0,stars=0;c.fig.classList.add('young');
const fresh=()=>({hook:()=>{},wait:0,n:0,k:0,heat:.9,bad:-1,got:-1,grab:null,sa:0,sb:0,bin:-1,line:''}),S=fresh();
const part=()=>['cool','say','hear','fix','help','quiz'][A.step];
const sz=n=>Math.round(n*(A.narrow?1:1.12)),fast=()=>A.reduced();
const tell=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
function words(g,t,x,y,w,n,col,wt){g.font=`${wt||700} ${sz(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;const L=[];let s='';
 for(const z of t.split(' ')){const q=s?s+' '+z:z;if(g.measureText(q).width>w&&s){L.push(s);s=z}else s=q}L.push(s);const h=sz(n)*1.2;L.forEach((r,i)=>g.fillText(r,x,y+(i-(L.length-1)/2)*h))}
const hit=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* a child: head, hair, eyebrows that slant when cross, mouth by mood (0 cross .. 1 happy) */
function kid(g,x,y,r,mood,hair,top){g.save();g.fillStyle=top;g.beginPath();g.ellipse(x,y+r*1.75,r*.95,r*.75,0,Math.PI,0);g.fill();
 g.fillStyle='#e0ac69';g.beginPath();g.arc(x,y,r,0,7);g.fill();g.fillStyle=hair;g.beginPath();g.arc(x,y-r*.1,r*1.02,Math.PI*1.08,Math.PI*1.92);g.fill();
 g.strokeStyle='#3b2412';g.lineWidth=Math.max(2,r*.09);const brow=(1-mood)*r*.18;for(const d of[-1,1]){g.beginPath();g.moveTo(x+d*r*.55,y-r*.32-brow);g.lineTo(x+d*r*.15,y-r*.3+brow);g.stroke();
  g.fillStyle='#3b2412';g.beginPath();g.arc(x+d*r*.35,y-r*.08,r*.09,0,7);g.fill()}
 g.beginPath();const bend=(mood-.5)*r*.5;g.moveTo(x-r*.35,y+r*.45);g.quadraticCurveTo(x,y+r*.45+bend,x+r*.35,y+r*.45);g.stroke();g.restore()}
function bubble(g,t,x,y,w,from,col){const C=A.col,n=sz(14);g.font=`600 ${n}px system-ui`;let L=1,q='';for(const z of t.split(' ')){const u=q?q+' '+z:z;if(g.measureText(u).width>w-16&&q){L++;q=z}else q=u}
 const h=L*n*1.2+16;g.fillStyle=C.dark?'#1e293b':'#ffffff';g.strokeStyle=col||C.mu;g.lineWidth=2.5;A.paint.rrect(x-w/2,y-h/2,w,h,14);g.fill();g.stroke();
 g.beginPath();g.moveTo(from-8,y-h/2+1);g.lineTo(from,y-h/2-12);g.lineTo(from+8,y-h/2+1);g.fill();words(g,t,x,y,w-16,14,C.tx,600)}
function card(g,t,r,lit,bad,good){const C=A.col;g.fillStyle=good?A.alpha(C.gr,.2):C.dark?'#172033':'#f0f9ff';A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();
 g.strokeStyle=bad?C.rd:good?C.gr:lit?C.vi:C.mu;g.lineWidth=bad||lit||good?4.5:2;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke();words(g,t,r.x+r.w/2,r.y+r.h/2,r.w-14,13)}
function grid(n,y0,h,cols){const W=A.W,cl=cols||(A.narrow?1:n),rows=Math.ceil(n/cl),gap=8,w=Math.min((W-20-gap*(cl-1))/cl,A.narrow?W-20:260),rh=(h-gap*(rows-1))/rows,x0=(W-cl*w-gap*(cl-1))/2;
 return Array.from({length:n},(_,i)=>({x:x0+(i%cl)*(w+gap),y:y0+Math.floor(i/cl)*(rh+gap),w,h:rh}))}
const pair=()=>{const r=Math.min(A.W,A.H)*.075;return{r,a:{x:A.W*.2,y:A.H*.17},b:{x:A.W*.8,y:A.H*.17}}};
function friends(g,ma,mb){const P=pair();kid(g,P.a.x,P.a.y,P.r,ma,'#7c2d12','#a855f7');kid(g,P.b.x,P.b.y,P.r,mb,'#1f2937','#0ea5e9');
 words(g,'Ava',P.a.x,P.a.y+P.r*2.75,80,12,A.col.mu);words(g,'Leo',P.b.x,P.b.y+P.r*2.75,80,12,A.col.mu)}
/* cross-o-meter: a bar from calm (green) to cross (red) */
function meter(g){const C=A.col,x=A.W*.3,w=A.W*.4,y=A.H*.36,h=22;g.fillStyle=A.paint.lin(x,0,x+w,0,[[0,'#16a34a'],[.5,'#eab308'],[1,'#dc2626']]);A.paint.rrect(x,y,w,h,11);g.fill();
 g.strokeStyle=C.tx;g.lineWidth=2;A.paint.rrect(x,y,w,h,11);g.stroke();const px=x+w*S.heat;g.fillStyle=C.tx;g.beginPath();g.moveTo(px,y-4);g.lineTo(px-9,y-18);g.lineTo(px+9,y-18);g.fill();
 words(g,'calm',x-26,y+h/2,60,11,C.mu,600);words(g,'cross',x+w+30,y+h/2,60,11,C.mu,600);words(g,S.heat<=.3?'Ready to talk':'Too cross to talk',A.W/2,y+h+18,A.W,13,S.heat<=.3?C.gr:C.rd)}
function starRow(g,x,y,n,col){for(let i=0;i<3;i++){const cx=x+(i-1)*24,on=n>i-.01&&n>=i+.5;g.beginPath();for(let k=0;k<10;k++){const a=-Math.PI/2+k*Math.PI/5,rr=k%2?5:11;g.lineTo(cx+Math.cos(a)*rr,y+Math.sin(a)*rr)}g.closePath();
 g.fillStyle=on?col:'transparent';g.fill();g.strokeStyle=A.col.tx;g.lineWidth=1.5;g.stroke()}}
const coolR=()=>grid(6,A.H*.5,A.H*.46,A.narrow?2:3),optR=()=>grid(3,A.H*.52,A.H*.46),fixR=()=>grid(4,A.H*.52,A.H*.45,2),binR=()=>grid(2,A.H*.62,A.H*.34,2);
const table=()=>({x:A.W*.3,y:A.H*.3,w:A.W*.4,h:A.H*.17});
const helpCard=()=>{const w=Math.min(A.W*.62,280),h=A.H*.17;return S.grab&&S.grab.x!=null?{x:S.grab.x-w/2,y:S.grab.y-h/2,w,h}:{x:(A.W-w)/2,y:A.H*.36,w,h}};
const fixCard=i=>{const r=fixR()[i];return S.grab&&S.grab.i===i&&S.grab.x!=null?{...r,x:S.grab.x-r.w/2,y:S.grab.y-r.h/2}:r};
function draw(A){const{ctx:g,W,H,col:C}=A,v=part();g.fillStyle=A.mix(C.pn,'#dcfce7',C.dark?.05:.35);g.fillRect(0,0,W,H);
 if(v==='quiz'){friends(g,1,1);words(g,'Calm down. Say how you feel. Listen. Find a fix for both.',W/2,H*.62,W-30,16);return}
 if(S.n>=goal()){friends(g,1,1);words(g,wrapUp(),W/2,H*.6,W-30,16);return A.fx.draw(g)}
 if(v==='cool'){friends(g,1-S.heat,.2);meter(g);coolR().forEach((r,i)=>card(g,COOL[i][0],r,false,S.bad===i,false))}
 if(v==='say'){const[what,ops]=SAY[S.k];friends(g,.3,.4);words(g,what,W/2,H*.08,W*.5,13);if(S.line)bubble(g,S.line,W/2,H*.42,W*(A.narrow?.64:.42),W*.36,C.gr);else words(g,'What will Ava say?',W/2,H*.42,W,14,C.mu);
  optR().forEach((r,j)=>card(g,ops[j][0],r,false,S.bad===j,S.got===j))}
 if(v==='hear'){const[lines,ops]=HEAR[S.k];friends(g,.5,.5);bubble(g,lines,W/2,H*.42,W*(A.narrow?.64:.42),W*.64,C.cy);optR().forEach((r,j)=>card(g,ops[j][0],r,false,S.bad===j,S.got===j))}
 if(v==='fix'){const[prob,ops]=FIX[S.k],P=pair();friends(g,S.sa/3,S.sb/3);if(!A.narrow)words(g,prob,W/2,H*.07,W*.38,13);starRow(g,P.a.x,P.a.y-P.r*1.7,S.sa,C.or);starRow(g,P.b.x,P.b.y-P.r*1.7,S.sb,C.or);
  const t=table();g.setLineDash([7,5]);g.strokeStyle=S.got>=0?C.gr:C.vi;g.lineWidth=3;A.paint.rrect(t.x,t.y,t.w,t.h,14);g.stroke();g.setLineDash([]);
  words(g,S.got>=0?ops[S.got][0]:'Drag a fix here',t.x+t.w/2,t.y+t.h/2,t.w-12,13,S.got>=0?C.tx:C.mu);
  ops.forEach((o,i)=>{if(i!==S.got)card(g,o[0],fixCard(i),!!(S.grab&&S.grab.i===i),S.bad===i,false)})}
 if(v==='help'){words(g,'Can you two sort it, or do you need a grown-up?',W/2,H*.08,W-24,14);binR().forEach((r,j)=>card(g,BINS[j],r,false,S.bad===j,S.bin===j));
  if(S.k<HELP.length){const r=helpCard();card(g,HELP[S.k][0],r,!!S.grab,false,false)}}
 A.fx.draw(g)}
const goal=()=>({cool:3,say:3,hear:3,fix:3,help:4}[part()]||99);
const wrapUp=()=>({cool:'Calm first. Then you can talk.',say:'I feel ... because ... tells, without blaming.',hear:'Say back what you heard. Then they know you listened.',fix:'A good fix gives both of you enough.',help:'Hitting, hurt or stuck? Get a grown-up.'}[part()]);
const miss=(t,j)=>{A.sound.miss();S.bad=j==null?-1:j;tell(t);setTimeout(()=>{S.bad=-1;A.redraw()},fast()?10:900);A.redraw()};
function deal(){S.grab=null;S.got=-1;S.bin=-1;S.line='';S.sa=0;S.sb=0}
function next(t){S.n++;A.sound.pop();if(S.n<goal()&&part()!=='cool'){const k=S.k;S.wait=1;setTimeout(()=>{if(S.k!==k)return;S.wait=0;S.k++;deal();tell(t+' Next one.');buttons();A.redraw()},fast()?5:900);tell(t)}else{tell(t);buttons()}A.redraw();S.hook()}
function cool(i){if(part()!=='cool'||S.n>=goal())return;const[w,good]=COOL[i];if(!good){A.tween(S,{heat:Math.min(1,S.heat+.2)},400);return miss(HOT[w],i)}
 A.tween(S,{heat:Math.max(.05,S.heat-.3)},500,'out');next(S.n+1<3?`${w}. The meter goes down. Keep going.`:`${w}. Now Ava is calm and ready to talk.`)}
function choose(j){const v=part();if(!(v==='say'||v==='hear')||S.n>=3||S.wait||S.got>=0)return;const[,ops]=(v==='say'?SAY:HEAR)[S.k],[line,tag]=ops[j];
 const W={blame:'Blaming makes Leo defend himself. Say how YOU feel and why.',name:'Names hurt and start a new fight. Say how you feel instead.',quiet:'Sulking keeps it inside. Leo cannot fix what he does not know.',
  talk:'That jumps in with your side. Listen first, then say back what Leo said.',mock:'That tells Leo his feelings do not count. Say back his reason.'};
 if(tag!=='ok')return miss(W[tag],j);S.got=j;if(v==='say')S.line=line;next(v==='say'?'An I-statement: your feeling and the reason, with no blame.':'You said back his reason. Leo knows you listened.')}
function place(i){if(part()!=='fix'||S.n>=3||S.wait||S.got>=0)return;const[,ops]=FIX[S.k],[f,a,b,tag]=ops[i];A.tween(S,{sa:a,sb:b},600,'out');
 if(a<2||b<2){const m=tag==='win'?FIXWHY.win(a>b?'Ava':'Leo',a>b?'Leo':'Ava'):FIXWHY[tag]();setTimeout(()=>{if(part()==='fix')A.tween(S,{sa:0,sb:0},400)},fast()?20:1200);return miss(m,i)}
 S.got=i;next(`${f}: Ava and Leo both get enough. A fix you can both accept!`)}
function sortTo(j){if(part()!=='help'||S.n>=goal()||S.wait)return;const[w,k]=HELP[S.k];
 if(j!==k)return miss(k?`${w} Do not sort that alone. Get a grown-up.`:`${w} You can sort this one: talk, listen, find a fix.`,j);S.bin=j;next(`${w} ${BINS[k]}.`)}
function buttons(){if(!pad)return;pad.innerHTML='';const v=part(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=f};
 if(v==='quiz'||S.n>=goal()||S.wait)return;
 if(v==='cool')COOL.forEach((x,i)=>B(x[0],()=>cool(i)));
 if(v==='say'||v==='hear')(v==='say'?SAY:HEAR)[S.k][1].forEach((x,j)=>B(x[0],()=>choose(j),(v==='say'?'Ava says: ':'Reply: ')+x[0]));
 if(v==='fix')FIX[S.k][1].forEach((x,i)=>B(x[0],()=>place(i),'Try the fix: '+x[0]));
 if(v==='help')BINS.forEach((b,j)=>B(b,()=>sortTo(j),`${HELP[S.k][0]} ${b}`))}
function down(p){const v=part();if(S.n>=goal()||S.wait)return false;
 if(v==='cool'){const i=coolR().findIndex(r=>hit(p,r));if(i>=0)cool(i)}
 if(v==='say'||v==='hear'){const j=optR().findIndex(r=>hit(p,r));if(j>=0)choose(j)}
 if(v==='fix'){const i=fixR().findIndex((r,k)=>k!==S.got&&hit(p,r));if(i>=0){S.grab={i,x:null,x0:p.x,y0:p.y};return true}}
 if(v==='help'){if(hit(p,helpCard())){S.grab={x:null,x0:p.x,y0:p.y};return true}const j=binR().findIndex(r=>hit(p,r));if(j>=0)sortTo(j)}return false}
function move(p){const d=S.grab;if(!d)return;if(d.x!=null||Math.hypot(p.x-d.x0,p.y-d.y0)>8){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=S.grab,v=part();S.grab=null;if(!d)return;
 if(v==='fix'){if(d.x==null||hit(p,table()))place(d.i);else A.redraw();buttons()}
 if(v==='help'){const j=binR().findIndex(r=>hit(p,r));if(j>=0)sortTo(j);else A.redraw()}}
const finish=(n,msg)=>()=>{if(A.step===n&&S.n>=goal()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function auto(fns,gap){const k=++run;fns.forEach((f,j)=>setTimeout(()=>{if(k===run)f()},fast()?j*60+30:(j+1)*gap))}
const restart=()=>{run++;Object.assign(S,fresh());if(A)deal()};
const okAt=(L,k)=>L[S.k][1].findIndex(o=>o[k]==='ok');
const steps=[
{h:'Cool down first',p:'Ava is too cross to talk. Tap what helps her calm down.',predict:{q:'Leo shouts at Ava. When is the best time to sort it out?',opts:['Right now, while both are cross','After they both calm down'],ans:1},task:'Bring the meter down to calm',
 show:()=>{steps[0].go();auto([0,2,4].map(i=>()=>cool(i)),900)},
 go:()=>{restart();S.heat=.95;tell('Ava is very cross. What helps her calm down?');buttons();S.hook=finish(0,'Calm first. Then you can think and talk.')}},
{h:'Say how you feel',p:'Pick what Ava says. Tell your feeling and the reason.',task:'Say it 3 times',
 show:()=>{steps[1].go();auto([0,1,2].map(()=>()=>choose(okAt(SAY,1))),1100)},
 go:()=>{restart();tell(SAY[0][0]+' What will Ava say?');buttons();S.hook=finish(1,'I feel ... because ... is calm, clear and blames nobody.')}},
{h:'Listen to their side',p:'Leo explains. Pick the reply that shows you listened.',predict:{q:'When Leo explains his side, what helps most?',opts:['Plan what to say while he talks','Listen to the end, then say back what he said'],ans:1},task:'Listen 3 times',
 show:()=>{steps[2].go();auto([0,1,2].map(()=>()=>choose(okAt(HEAR,1))),1100)},
 go:()=>{restart();tell('Leo says: '+HEAR[0][0]);buttons();S.hook=finish(2,'Saying back what you heard shows you listened.')}},
{h:'Find a fix for both',p:'Drag a fix to the table. Watch both star meters.',predict:{q:'Ava wants football. Leo wants tag. Which fix will they both accept?',opts:['Whoever shouts loudest picks','Tag first, then football'],ans:1},task:'Fix 3 fall-outs',
 show:()=>{steps[3].go();auto([0,1,2].map(()=>()=>place(okAt(FIX,3))),1200)},
 go:()=>{restart();tell(FIX[0][0]+' Find a fix for both.');buttons();S.hook=finish(3,'A compromise: each gives a little, so both get enough.')}},
{h:'Sort it, or get help?',p:'Drag each card to a box.',task:'Sort 4 cards',
 show:()=>{steps[4].go();auto([0,1,2,3].map(()=>()=>sortTo(HELP[S.k][1])),1100)},
 go:()=>{restart();tell(HELP[0][0]+' Can you sort it?');buttons();S.hook=finish(4,'Most fall-outs you can fix. Hitting, hurt or stuck needs a grown-up.')}},
{h:'Challenge',p:'',go:()=>{restart();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.hook()});
const QS=[['Mo and Jen both want to be the goalie. What is a fair fix?',[['Swap at half time','ok'],['Mo is goalie: he asked first','win'],['Nobody is goalie','lose']]],
 ['Kai is cross and shouting. What should he do first?',[['Take some slow breaths','ok'],['Shout until he wins','shout'],['Tell Jen she is stupid','name']]],
 ['Which one says how you feel without blaming?',[['I feel sad because I was left out.','ok'],['You left me out on purpose!','blame'],['You never let me play.','blame']]],
 ['Jen explains why she wants the bike. What do you do?',[['Listen, then say back her reason','ok'],['Talk over her','talk'],['Walk off and never play again','walk']]],
 ['Sam always lets Ali choose, so they never argue. Is that a fair fix?',[['No: Sam should get a say too','ok'],['Yes: no arguing is best','givein'],['Yes: Ali is louder','win']]]];
function why(t){let m='Calm down, say how you feel, listen, then find a fix for both.';
 if(t==='win')m='One friend gets it all and the other gets nothing. That is not a fix both accept.';if(t==='lose')m='Nobody gets anything. A fix should give both of you something.';
 if(t==='shout')m='Shouting heats it up. Calm down first.';if(t==='name')m='Names hurt and start a new fight.';if(t==='blame')m='"You" lines blame. Start with "I feel" and say why.';
 if(t==='talk')m='Talking over someone means you did not hear them. Listen first.';if(t==='walk')m='Walking off for ever ends a friendship. Talk it through.';if(t==='givein')m='Giving in every time is not fair to you. Both should get a say.';return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const bx=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},bx,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok){stars++;A.win()}else{stars=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Yes! That helps you both.':'✗ '+why(t)}${ok?` Fixes in a row: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.66,tall:1.35,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);restart();A.gest({down,move,up});buttons()}});
A.start()})})();
