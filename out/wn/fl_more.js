/* Flagship – which has more? (ages 3–4): compare two small groups by looking, by matching one to one and by counting.
   Look and say who has more; pair spread-out cars with squashed-up cars and see the one left over; find that 5 tiny
   beads are more than 3 big balls; add or take away to make two plates the same; pick the plate with fewer. */
(()=>{
const LOOK=[[2,4,'grape'],[5,3,'grape'],[3,3,'grape']];
const MATCH=[{a:4,b:5,sa:1.7,sb:.95},{a:5,b:5,sa:.95,sb:1.5}];
const BIG=[{a:3,b:5},{a:4,b:2}];
const SAME=[[2,4],[5,3]];
const FEW=[[4,2],[1,3],[5,4]];
const WHO=['Mia','Leo'];
VIS.reg('flagmore',c=>{let A,pad,quiz,qi=-1,run=0;c.fig.classList.add('young');
const B0=()=>({want:()=>{},r:0,won:0,pairs:[],cnt:[0,0],n:[0,0],tip:-1,grab:null,ask:0}),S=B0();
const mode=()=>['look','match','big','same','few','quiz'][A.step];
const fs=n=>Math.round(n*(A.narrow?1:1.15)),R=()=>A.reduced();
const speak=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
const unit=()=>Math.min(A.W/7,62);
const rowY=r=>A.H*(r?.71:.31),trayH=()=>A.H*.3;
function label(g,t,x,y,n,al){g.font=`800 ${fs(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=A.col.tx;g.fillText(t,x,y,A.W-16)}
function setup(){const v=mode();S.pairs=[];S.cnt=[0,0];S.ask=0;S.grab=null;
 if(v==='look')S.n=LOOK[S.r].slice(0,2);if(v==='match')S.n=[MATCH[S.r].a,MATCH[S.r].b];if(v==='big')S.n=[BIG[S.r].a,BIG[S.r].b];
 if(v==='same')S.n=SAME[S.r].slice();if(v==='few')S.n=FEW[S.r].slice()}
function spreadOf(r){const v=mode();if(v==='match')return r?MATCH[S.r].sb:MATCH[S.r].sa;if(v==='big')return r?.75:1.25;return 1}
function xs(r){const n=S.n[r],u=unit(),gap=Math.min(u*spreadOf(r),(A.W-76)/Math.max(1,n-1));return[...Array(n).keys()].map(i=>A.W/2+(i-(n-1)/2)*gap)}
function kind(r){const v=mode();if(v==='match')return'car';if(v==='big')return r?'bead':'ball';if(v==='same'||v==='few')return'cookie';return'grape'}
function item(g,k,x,y,col){const u=unit(),C=A.col;
 if(k==='car'){const w=u*.64,h=u*.32;g.fillStyle=col;A.paint.rrect(x-w/2,y-h/2,w,h,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;A.paint.rrect(x-w/2,y-h/2,w,h,7);g.stroke();
  g.fillStyle=C.tx;[-.28,.28].forEach(d=>{g.beginPath();g.arc(x+d*w,y+h/2,h*.26,0,7);g.fill()});return}
 if(k==='cookie'){A.paint.ball(x,y,u*.3,A.mix(C.or,'#92400e',.3));g.fillStyle='#3b1d0b';[[-.1,-.08],[.12,.02],[-.02,.14]].forEach(([a,b])=>{g.beginPath();g.arc(x+a*u,y+b*u,u*.04,0,7);g.fill()});return}
 const r=k==='ball'?u*.46:k==='bead'?u*.12:u*.22;A.paint.ball(x,y,r,col)}
function tray(g,r){const C=A.col,y=rowY(r),h=trayH(),bad=S.tip===r;g.fillStyle=A.alpha(bad?C.rd:r?C.cy:C.pk,.16);A.paint.rrect(8,y-h/2,A.W-16,h,14);g.fill();
 g.strokeStyle=bad?C.rd:A.alpha(C.tx,.5);g.lineWidth=2;A.paint.rrect(8,y-h/2,A.W-16,h,14);g.stroke();label(g,WHO[r]+(mode()==='big'||S.cnt[r]?`: ${S.cnt[r]}`:''),18,y-h/2+fs(12),13,'left')}
function draw(A){const{ctx:g,W,H,col:C}=A,v=mode();g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.05:.45);g.fillRect(0,0,W,H);
 if(v==='quiz'){[0,1].forEach(r=>{tray(g,r);for(let i=0;i<(r?4:3);i++)item(g,'grape',W/2+(i-(r?1.5:1))*unit(),rowY(r)+6,r?C.gr:C.vi)});return}
 if(S.won>=lastRound()){label(g,doneText(),W/2,H/2,15);return A.fx.draw(g)}
 [0,1].forEach(r=>{tray(g,r);const X=xs(r),k=kind(r),col=r?C.gr:C.vi;
  X.forEach((x,i)=>{const y=rowY(r)+6,grab=S.grab&&r===0&&S.grab.i===i&&S.grab.x!=null;if(grab)return;item(g,k,x,y,col);
   if(v==='big'&&i<S.cnt[r]){g.fillStyle=C.tx;g.font=`800 ${fs(13)}px system-ui`;g.textAlign='center';g.textBaseline='middle';g.fillText(i+1,x,y-unit()*.62)}})});
 if(v==='match'){const T=xs(0),Bt=xs(1);g.strokeStyle=C.tx;g.lineWidth=3;S.pairs.forEach(([i,j])=>{g.beginPath();g.moveTo(T[i],rowY(0)+unit()*.3);g.lineTo(Bt[j],rowY(1)-unit()*.25);g.stroke()});
  if(S.ask)Bt.forEach((x,j)=>{if(!S.pairs.some(p=>p[1]===j)){g.strokeStyle=C.rd;g.lineWidth=3;g.beginPath();g.arc(x,rowY(1)+6,unit()*.48,0,7);g.stroke();label(g,'left over',x,rowY(1)+unit()*.8,11)}});
  if(S.grab&&S.grab.x!=null)item(g,'car',S.grab.x,S.grab.y,C.vi)}
 label(g,prompt(),W/2,H*.08,14);A.fx.draw(g)}
const lastRound=()=>({look:LOOK.length,match:MATCH.length,big:BIG.length,same:SAME.length,few:FEW.length}[mode()]||9);
function prompt(){const v=mode();if(v==='look')return'Who has more grapes?';if(v==='match')return S.ask?'Who has more cars?':'Match each car of Mia’s to a car of Leo’s';
 if(v==='big')return S.cnt[0]<S.n[0]||S.cnt[1]<S.n[1]?'Count each one':'Who has more things?';if(v==='same')return`Make Mia’s plate the same as Leo’s`;return'Who has fewer cookies?'}
function doneText(){return{look:'Look, then say: more, fewer or the same.',match:'Match them up. The one left over shows who has more.',big:'More means more things, not bigger things.',same:'Add one or take one away to make them the same.',few:'Fewer means not as many.'}[mode()]}
const miss=(t,r)=>{A.sound.miss();S.tip=r==null?-1:r;speak(t);setTimeout(()=>{S.tip=-1;A.redraw()},R()?10:700);buttons();A.redraw()};
function nextRound(t){S.r++;S.won++;if(S.won>=lastRound()){A.sound.pop();speak(t);buttons();A.redraw();return S.want()}A.sound.tick();setup();speak(t+' Next one.');buttons();A.redraw()}
const said=(a,b)=>a>b?0:a<b?1:2;
function pickLook(ch){if(mode()!=='look'||S.won>=LOOK.length)return;const[a,b]=S.n,ok=said(a,b);
 if(ch===ok)return nextRound(ok===2?`Both have ${a}. The same!`:`${WHO[ok]} has ${Math.max(a,b)}. ${Math.max(a,b)} is more than ${Math.min(a,b)}.`);
 if(ok===2)return miss(`Count them. Mia has ${a} and Leo has ${b}. That is the same.`,ch);
 if(ch===2)return miss(`Look again. Mia has ${a} and Leo has ${b}. They are not the same.`);
 miss(`Look again. ${WHO[ch]} has ${S.n[ch]}. ${WHO[1-ch]} has ${S.n[1-ch]}, and that is more.`,ch)}
function freeB(x){const B=xs(1);let best=-1,d=1e9;B.forEach((bx,j)=>{if(S.pairs.some(p=>p[1]===j))return;const e=Math.abs(bx-x);if(e<d){d=e;best=j}});return best}
function pair(i,j){if(mode()!=='match'||S.ask||S.won>=MATCH.length)return;if(i==null)i=[...Array(S.n[0]).keys()].find(k=>!S.pairs.some(p=>p[0]===k));if(i==null)return;
 if(S.pairs.some(p=>p[0]===i))return speak('That car has a partner already.');if(j==null)j=freeB(xs(0)[i]);if(j<0)return;
 if(S.pairs.some(p=>p[1]===j))return speak('That car of Leo’s has a partner. Pick one on its own.');
 S.pairs.push([i,j]);A.sound.tick();const left=S.n[0]-S.pairs.length;
 if(left&&S.pairs.length<S.n[1]){speak(`${S.pairs.length} pair${S.pairs.length>1?'s':''}.`);buttons();return A.redraw()}
 S.ask=1;const spare=S.n[1]-S.pairs.length;speak(spare?`All matched. Leo has ${spare} left over.`:'All matched. Nothing is left over.');buttons();A.redraw()}
function pickMatch(ch){if(mode()!=='match'||!S.ask)return;const ok=said(...S.n);
 if(ch===ok)return nextRound(ok===2?'Every car has a partner, so they have the same. Spreading out does not add cars.':'Leo has a car left over, so Leo has more, even though Mia’s row looks longer.');
 if(ok===2)return miss(ch===1?'Leo’s row is longer, but each car has a partner. Nothing is left over, so it is the same.':'Mia’s cars are squashed up, but each one has a partner. It is the same.',ch);
 miss(ch===0?'Mia’s row is longer because it is spread out. Look for the car with no partner: it is Leo’s.':'One car has no partner, so they are not the same.',ch)}
function countRow(r,all){if(mode()!=='big'||S.won>=BIG.length)return;if(S.cnt[r]>=S.n[r])return speak(`You counted ${WHO[r]}’s already: ${S.n[r]}.`);
 S.cnt[r]=all?S.n[r]:S.cnt[r]+1;A.sound.tick();speak(S.cnt[r]>=S.n[r]?`${WHO[r]} has ${S.n[r]}.`:`${S.cnt[r]}.`);buttons();A.redraw()}
function pickBig(ch){if(mode()!=='big'||S.won>=BIG.length)return;if(S.cnt[0]<S.n[0]||S.cnt[1]<S.n[1])return speak('Count both first.');const[a,b]=S.n,ok=said(a,b);
 if(ch===ok)return nextRound(ok===1?`Leo has ${b} tiny beads and Mia has ${a} big balls. ${b} is more than ${a}.`:`Mia has ${a}, Leo has ${b}. Mia has more this time.`);
 miss(ch===0&&ok===1?`Mia’s balls are bigger, but she has only ${a}. More means more things: Leo has ${b}.`:ch===2?`${a} and ${b} are not the same.`:`Leo’s beads are small and there are only ${b}. Mia has ${a}.`,ch)}
function change(d){if(mode()!=='same'||S.won>=SAME.length)return;const n=S.n[0]+d;if(n<0)return speak('Mia’s plate is empty.');if(n>7)return miss('That is too many. Take some away.',0);S.n[0]=n;A.sound.tick();speak(`Mia has ${n}.`);buttons();A.redraw()}
function checkSame(){if(mode()!=='same'||S.won>=SAME.length)return;const[a,b]=S.n;if(a===b)return nextRound(`Mia ${a}, Leo ${b}. The same!`);
 miss(a<b?`Mia has ${a} and Leo has ${b}. Mia needs ${b-a} more.`:`Mia has ${a} and Leo has ${b}. Take ${a-b} away from Mia.`,0)}
function pickFew(ch){if(mode()!=='few'||S.won>=FEW.length)return;const[a,b]=S.n,ok=a<b?0:1;
 if(ch===ok)return nextRound(`${WHO[ok]} has ${Math.min(a,b)}. ${Math.min(a,b)} is fewer than ${Math.max(a,b)}.`);
 miss(`${WHO[ch]} has ${S.n[ch]}. That is more. Fewer means not as many.`,ch)}
function buttons(){if(!pad)return;pad.innerHTML='';const v=mode(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=fn};
 const done=S.won>=lastRound(),who=fn=>{B('Mia has more',()=>fn(0));B('Leo has more',()=>fn(1));B('The same',()=>fn(2))};
 if(done||v==='quiz')return A.redraw();
 if(v==='look')who(pickLook);
 if(v==='match'){if(S.ask)who(pickMatch);else B('Match a pair',()=>pair(),'Match the next car of Mia’s to a car of Leo’s')}
 if(v==='big'){B('Count Mia’s',()=>countRow(0),'Count one of Mia’s balls');B('Count Leo’s',()=>countRow(1),'Count one of Leo’s beads');if(S.cnt[0]>=S.n[0]&&S.cnt[1]>=S.n[1])who(pickBig)}
 if(v==='same'){B('+ give Mia one',()=>change(1),'Give Mia one more cookie');B('− take one away',()=>change(-1),'Take one cookie away from Mia');B('Same now?',checkSame,'Check if the plates are the same')}
 if(v==='few'){B('Mia has fewer',()=>pickFew(0));B('Leo has fewer',()=>pickFew(1))}A.redraw()}
const rowAt=p=>Math.abs(p.y-rowY(0))<trayH()/2?0:Math.abs(p.y-rowY(1))<trayH()/2?1:-1;
function down(p){const v=mode(),r=rowAt(p);if(S.won>=lastRound())return false;
 if(v==='look'&&r>=0)pickLook(r);if(v==='few'&&r>=0)pickFew(r);if(v==='big'&&r>=0){if(S.cnt[0]>=S.n[0]&&S.cnt[1]>=S.n[1])pickBig(r);else countRow(r)}
 if(v==='same'&&r===0){const hit=xs(0).some(x=>Math.abs(x-p.x)<unit()*.4);change(hit?-1:1)}
 if(v==='match'){if(S.ask){if(r>=0)pickMatch(r);return false}if(r!==0)return false;const i=xs(0).findIndex(x=>Math.abs(x-p.x)<unit()*.45);if(i<0||S.pairs.some(q=>q[0]===i))return false;S.grab={i,x:null,y:null,x0:p.x,y0:p.y};return true}return false}
function move(p){if(!S.grab)return;S.grab.x=p.x;S.grab.y=p.y;A.redraw()}
function up(p){const d=S.grab;if(!d)return;S.grab=null;if(Math.hypot(p.x-d.x0,p.y-d.y0)<8)return pair(d.i);
 if(rowAt(p)!==1){speak('Drop it on one of Leo’s cars.');return A.redraw()}const j=xs(1).findIndex(x=>Math.abs(x-p.x)<unit()*.5);pair(d.i,j<0?freeB(p.x):j)}
const check=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list){const k=++run;list.forEach((fn,j)=>setTimeout(()=>{if(k===run)fn()},R()?j*40+30:(j+1)*330))}
const fresh=()=>{run++;Object.assign(S,B0());setup()};
const rep=(n,f)=>[...Array(n)].map(()=>f);
const steps=[
{h:'Just look',p:'Look at both plates. Who has more grapes? Tap a plate, or use a button.',task:'Answer 3 times',
 show:()=>{steps[0].go();play(LOOK.map(([a,b])=>()=>pickLook(said(a,b))))},go:()=>{fresh();speak('Who has more grapes, Mia or Leo?');buttons();S.want=check(0,()=>S.won>=3,'With a few things, you can see who has more at a glance.')}},
{h:'Match them up',p:'Drag each of Mia’s cars down to one of Leo’s, or tap Match a pair. A car with no partner is left over.',
 predict:{q:'Mia’s 4 cars are spread out in a long row. Leo’s 5 cars are squashed up. Who has more?',opts:['Mia: her row is longer','Leo'],ans:1},task:'Match the cars and say who has more, twice',
 show:()=>{steps[1].go();play([...rep(4,()=>pair()),()=>pickMatch(1),...rep(5,()=>pair()),()=>pickMatch(2)])},go:()=>{fresh();speak('Match each of Mia’s cars to one of Leo’s.');buttons();S.want=check(1,()=>S.won>=2,'Matching one to one shows who has more. A longer row is not always more.')}},
{h:'Big or many?',p:'Tap each ball and each bead to count it. Then say who has more.',
 predict:{q:'Mia has 3 big balls. Leo has 5 tiny beads. Who has more?',opts:['Mia: hers are bigger','Leo'],ans:1},task:'Count and compare, twice',
 show:()=>{steps[2].go();play([()=>countRow(0,1),()=>countRow(1,1),()=>pickBig(1),()=>countRow(0,1),()=>countRow(1,1),()=>pickBig(0)])},go:()=>{fresh();speak('Count Mia’s balls and Leo’s beads.');buttons();S.want=check(2,()=>S.won>=2,'More means more things. Big things are not always more.')}},
{h:'Make them the same',p:'Tap Mia’s plate to add a cookie. Tap a cookie to take it away. Then check.',task:'Make the plates the same, twice',
 show:()=>{steps[3].go();play([()=>change(1),()=>change(1),checkSame,()=>change(-1),()=>change(-1),checkSame])},go:()=>{fresh();speak('Make Mia’s plate the same as Leo’s.');buttons();S.want=check(3,()=>S.won>=2,'Add one or take one away until each cookie has a partner.')}},
{h:'Fewer',p:'Fewer means not as many. Who has fewer cookies?',task:'Find the plate with fewer, 3 times',
 show:()=>{steps[4].go();play(FEW.map(([a,b])=>()=>pickFew(a<b?0:1)))},go:()=>{fresh();speak('Who has fewer cookies?');buttons();S.want=check(4,()=>S.won>=3,'Fewer is the opposite of more.')}},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Mia has 3 grapes. Leo has 4 grapes. Who has more?',[['Leo','ok'],['Mia','less'],['The same','near']]],
 ['5 cars in a long row and 5 cars squashed up. Who has more?',[['The same','ok'],['The long row','long'],['The squashed row','short']]],
 ['3 big apples or 5 small grapes. Which group has more?',[['The 5 grapes','ok'],['The 3 apples','big'],['The same','near']]],
 ['Mia has 2 cookies. Leo has 4. How can Mia have the same?',[['Give Mia 2 more','ok'],['Give Mia 1 more','one'],['Take 2 from Mia','back']]],
 ['Mia has 1 sock. Leo has 3 socks. Who has fewer?',[['Mia','ok'],['Leo','fewmore'],['The same','near']]]];
function why(t){let m='Match them up or count them, then compare.';
 if(t==='less')m='Mia has 3 and Leo has 4. 4 is more than 3, so Leo has more.';
 if(t==='near')m='They are close, but not the same. Match them up: one has a spare.';
 if(t==='long')m='The long row is spread out. Match them up: every car has a partner, so it is the same.';
 if(t==='short')m='Squashing them up does not change how many. Both have 5.';
 if(t==='big')m='Apples are bigger, but there are only 3. More means more things: 5 grapes.';
 if(t==='one')m='Then Mia has 3 and Leo has 4. Mia needs 2 more to have 4.';
 if(t==='back')m='Taking away makes Mia have fewer. She needs more: 2 more makes 4.';
 if(t==='fewmore')m='Leo has 3. That is more. Fewer means not as many, so Mia has fewer.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});speak('Challenge: '+q);A.redraw()}
let streak=0;
function judge(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! Great comparing.':'✗ '+why(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});buttons()}});
A.start()})})();
