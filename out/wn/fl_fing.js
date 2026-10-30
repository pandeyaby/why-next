/* Flagship – showing numbers on fingers (ages 3–4): tap fingers up and down to show 1 to 5 on one hand; touch each
   finger that is up to count it and find the last number says how many; use a full hand of 5 and some more for 6 to 10;
   make 5 in different ways on two hands; put one finger down each time a duck swims away. Big targets, few words. */
(()=>{
const SHOW1=[3,2,4],TEN=[7,9],COUNTS=[[0,1,1,1,1],[1,0,1,0,1]];
VIS.reg('flagfing',c=>{let A,pad,quiz,qi=-1,run=0;c.fig.classList.add('young');
const B0=()=>({want:()=>{},r:0,won:0,h:[[0,0,0,0,0],[0,0,0,0,0]],cnt:[],ways:[],ducks:5,tip:null,flash:''}),S=B0();
const mode=()=>['one','count','ten','ways','ducks','quiz'][A.step];
const fs=n=>Math.round(n*(A.narrow?1:1.15)),R=()=>A.reduced();
const speak=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
const up=k=>S.h[k].reduce((a,b)=>a+b,0),total=()=>up(0)+up(1),two=()=>['ten','ways','ducks'].includes(mode())&&mode()!=='ducks';
const word=n=>['no','one','two','three','four','five','six','seven','eight','nine','ten'][n];
function txt(g,t,x,y,n,col){g.font=`800 ${fs(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-16)}
/* hand geometry: k = 0 (left on screen) or 1; fingers ordered little finger … thumb so both hands mirror like real hands */
function geo(k){const{W,H}=A,v=mode(),pair=two();const u=pair?Math.min(W/13,H/7.5):v==='ducks'?Math.min(W/9,H/10):Math.min(W/8,H/8.5),cx=pair?W*(k?.74:.26):W/2,
 cy=v==='ducks'?H*.72:pair?H*.6:H*.64;return{u,cx,cy}}
const LEN=[1.5,2,2.2,2,1.3];
function fingers(k){const{u,cx,cy}=geo(k),m=k?1:-1,out=[];for(let i=0;i<5;i++){const thumb=i===4,o=(i-2)*m,x=cx+o*u*.92,base=cy-u*1.1+(thumb?u*1.1:0),
 isUp=S.h[k][i],len=(isUp?LEN[i]:.55)*u;out.push({x:x+(thumb?m*u:0),y:base-len,w:u*.78,h:len+u*.4,base,i,isUp})}return out}
function drawHand(g,k){const C=A.col,{u,cx,cy}=geo(k),skin=A.mix('#f2c9a0','#c58b5a',k*.25);
 fingers(k).forEach(f=>{const hot=S.tip&&S.tip.k===k&&S.tip.i===f.i;g.fillStyle=hot?C.rd:skin;A.paint.rrect(f.x-f.w/2,f.y,f.w,f.h,f.w/2);g.fill();
  g.strokeStyle=f.isUp?C.tx:A.alpha(C.mu,.7);g.lineWidth=f.isUp?3:2;A.paint.rrect(f.x-f.w/2,f.y,f.w,f.h,f.w/2);g.stroke();
  const n=S.cnt.findIndex(e=>e[0]===k&&e[1]===f.i);if(n>=0){g.fillStyle=C.am;g.beginPath();g.arc(f.x,f.y-u*.45,u*.42,0,7);g.fill();txt(g,String(n+1),f.x,f.y-u*.45,14,'#111')}});
 g.fillStyle=skin;A.paint.rrect(cx-u*2.4,cy-u*1.2,u*4.8,u*2.6,u*.9);g.fill();g.strokeStyle=C.tx;g.lineWidth=3;A.paint.rrect(cx-u*2.4,cy-u*1.2,u*4.8,u*2.6,u*.9);g.stroke();
 txt(g,String(up(k)),cx,cy+u*.15,20,'#111')}
function drawDucks(g){const{W,H}=A,C=A.col;g.fillStyle=A.alpha(C.cy,.25);A.paint.rrect(10,H*.04,W-20,H*.24,18);g.fill();
 for(let i=0;i<S.ducks;i++){const x=W/2+(i-2)*Math.min(W/6,70),y=H*.16,r=Math.min(W/16,24);A.paint.ball(x,y,r,'#facc15');g.fillStyle='#ea580c';g.beginPath();g.moveTo(x+r*.8,y-r*.2);g.lineTo(x+r*1.4,y);g.lineTo(x+r*.8,y+r*.2);g.fill();
  g.fillStyle='#111';g.beginPath();g.arc(x+r*.35,y-r*.3,r*.13,0,7);g.fill()}
 txt(g,`${S.ducks} duck${S.ducks===1?'':'s'}`,W/2,H*.33,15)}
function goal(){const v=mode();if(v==='one')return`Show ${SHOW1[Math.min(S.r,2)]}. Tap fingers.`;if(v==='count')return S.cnt.length?`You said ${S.cnt.length}.`:'Touch each finger that is up.';
 if(v==='ten')return`Show ${TEN[Math.min(S.r,1)]}. Use two hands.`;if(v==='ways')return`Make 5 a new way. Ways: ${S.ways.length}`;return''}
function draw(A){const{ctx:g,W,H,col:C}=A,v=mode();g.fillStyle=A.mix(C.pn,'#fde68a',C.dark?.05:.35);g.fillRect(0,0,W,H);
 if(v==='quiz'){txt(g,'Use your own fingers to help.',W/2,H*.45,16);txt(g,'☝ ✌ ✋',W/2,H*.62,28);return}
 if(S.won>=lastN()){txt(g,doneText(),W/2,H/2,15);return A.fx.draw(g)}
 if(v==='ducks'){drawDucks(g);drawHand(g,0)}else if(two()){drawHand(g,0);drawHand(g,1);txt(g,`${up(0)} and ${up(1)} make ${total()}`,W/2,H*.95,15)}else drawHand(g,0);
 if(v!=='ducks')txt(g,goal(),W/2,H*.08,16);A.fx.draw(g)}
const lastN=()=>({one:3,count:2,ten:2,ways:3,ducks:1}[mode()]||9);
function doneText(){return{one:'Each finger up is one more.',count:'The last number you say is how many.',ten:'A full hand is 5. Then count on: 6, 7, 8…',ways:'5 and 0, 4 and 1, 3 and 2: all make 5.',ducks:'One less duck, one finger down.'}[mode()]}
const miss=(t,tip)=>{A.sound.miss();S.tip=tip||null;speak(t);setTimeout(()=>{S.tip=null;A.redraw()},R()?10:800);A.redraw()};
function reset(){S.h=[[0,0,0,0,0],[0,0,0,0,0]];S.cnt=[];const v=mode();if(v==='count')S.h[0]=COUNTS[Math.min(S.r,1)].slice();if(v==='ducks'){S.h[0]=[1,1,1,1,1];S.ducks=5}}
function win(t){S.won++;S.r++;A.sound.pop();if(S.won<lastN()){if(mode()!=='ways')reset();speak(t+' Next one.')}else speak(t);buttons();A.redraw();S.want()}
function flip(k,i){const v=mode();if(S.won>=lastN()||v==='count'||v==='quiz')return;
 if(v==='ducks'){if(!S.h[k][i])return miss('That finger is down already. Put down one that is up.',{k,i});if(total()<=S.ducks)return miss(`There are ${S.ducks} ducks. Keep ${S.ducks} fingers up.`,{k,i})}
 if(v==='one'&&k)return;S.h[k][i]^=1;A.sound.tick();speak(`${total()} finger${total()===1?'':'s'} up.`);if(v==='ducks'&&total()===S.ducks&&!S.ducks)return win('No ducks and no fingers. Well done!');A.redraw()}
function bump(k,d){const h=S.h[k],i=d>0?h.indexOf(0):h.lastIndexOf(1);if(i<0)return miss(d>0?'That hand has all 5 fingers up. Use the other hand.':'No fingers are up on that hand.');flip(k,i)}
function check(){const v=mode();if(S.won>=lastN())return;const n=total();
 if(v==='one'){const t=SHOW1[Math.min(S.r,2)];if(n<t)return miss(`That is ${n}. Put ${t-n} more up.`);if(n>t)return miss(`That is ${n}. Too many: put ${n-t} down.`);return win(`Yes, ${t} fingers!`)}
 if(v==='ten'){const t=TEN[Math.min(S.r,1)];if(n<t)return miss(up(0)===5||up(1)===5?`That is ${n}. 5 and ${n-5}. Put up ${t-n} more.`:`That is ${n}. Put up ${t-n} more. Fill one hand first.`);if(n>t)return miss(`That is ${n}, too many. Put ${n-t} down.`);
  return win(`5 and ${t-5} make ${t}!`)}
 if(v==='ways'){if(n!==5)return miss(`That is ${up(0)} and ${up(1)}, which makes ${n}, not 5.`);const w=`${Math.max(up(0),up(1))}-${Math.min(up(0),up(1))}`;
  if(S.ways.includes(w))return miss(`You made ${up(0)} and ${up(1)} already. Move a finger to the other hand.`);S.ways.push(w);return win(`${up(0)} and ${up(1)} make 5!`)}}
function count(k,i){if(mode()!=='count'||S.won>=2)return;const F=fingers(0);if(i==null){i=F.findIndex(f=>f.isUp&&!S.cnt.some(e=>e[1]===f.i));if(i<0)return}
 if(!S.h[0][i])return miss('That finger is down. Count only fingers that are up.',{k:0,i});if(S.cnt.some(e=>e[1]===i))return miss('You counted that one already. Count each finger once.',{k:0,i});
 S.cnt.push([0,i]);A.sound.tick();if(S.cnt.length===up(0))return win(`${S.cnt.length}! The last number says how many: ${S.cnt.length} fingers.`);speak(String(S.cnt.length));A.redraw()}
function swim(){if(mode()!=='ducks'||S.won>=1)return;if(total()>S.ducks)return miss(`There are ${S.ducks} ducks but ${total()} fingers. Put one down first.`);if(!S.ducks)return;
 S.ducks--;A.sound.whoosh();speak(`One duck swims away. ${word(S.ducks)} ducks left. Put a finger down.`);A.redraw()}
function buttons(){if(!pad)return;pad.innerHTML='';const v=mode(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=fn};
 if(v==='quiz'||S.won>=lastN())return;
 if(v==='one'){B('Finger up ☝',()=>bump(0,1),'Put one more finger up');B('Finger down',()=>bump(0,-1),'Put one finger down');B('That is it ✓',check,'Check my fingers')}
 if(v==='count')B('Touch the next finger',()=>count(0),'Count the next finger that is up');
 if(v==='ten'||v==='ways'){B('Left up',()=>bump(0,1),'Left hand: one more finger up');B('Left down',()=>bump(0,-1),'Left hand: one finger down');B('Right up',()=>bump(1,1),'Right hand: one more finger up');B('Right down',()=>bump(1,-1),'Right hand: one finger down');B('Check ✓',check,'Check my fingers')}
 if(v==='ducks'){B('A duck swims away',swim);B('Finger down',()=>bump(0,-1),'Put one finger down')}}
function down(p){if(S.won>=lastN())return false;const v=mode();if(v==='quiz')return false;const hs=v==='ducks'||!two()?[0]:[0,1];
 for(const k of hs)for(const f of fingers(k))if(Math.abs(p.x-f.x)<f.w*.7&&p.y>f.y-A.H*.08&&p.y<f.base+f.w*.3){v==='count'?count(k,f.i):flip(k,f.i);return false}
 if(v==='ducks'&&p.y<A.H*.3)swim();return false}
const chk=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list,gap){const k=++run;list.forEach((fn,j)=>setTimeout(()=>{if(k===run)fn()},R()?j*40+30:(j+1)*(gap||260)))}
const fresh=()=>{run++;Object.assign(S,B0());if(A)reset()};
const U=(k,n)=>[...Array(n)].map(()=>()=>bump(k,1));
const steps=[
{h:'Show a number',p:'Tap a finger to put it up or down. Show the number. Then tap "That is it".',task:'Show 3, then 2, then 4',
 show:()=>{steps[0].go();play([...U(0,3),check,...U(0,2),check,...U(0,4),check],170)},go:()=>{fresh();speak('Show 3 fingers.');buttons();S.want=chk(0,()=>S.won>=3,'One more finger up is one more.')}},
{h:'Count to check',p:'Touch each finger that is up, one at a time. Say a number for each one.',
 predict:{q:'Count from the thumb, or from the little finger. Do you get the same number?',opts:['No, a different number','Yes, the same number'],ans:1},task:'Count two hands',
 show:()=>{steps[1].go();play([...Array(4)].map(()=>()=>count(0)).concat([...Array(3)].map(()=>()=>count(0))),220)},go:()=>{fresh();speak('Touch each finger that is up.');buttons();S.want=chk(1,()=>S.won>=2,'Touch each one once. The last number is how many.')}},
{h:'Bigger than 5',p:'One hand has 5 fingers. For more, use the other hand too.',
 predict:{q:'Can you show 7 on one hand?',opts:['Yes','No: one hand has only 5'],ans:1},task:'Show 7, then 9',
 show:()=>{steps[2].go();play([...U(0,5),...U(1,2),check,...U(0,5),...U(1,4),check],150)},go:()=>{fresh();speak('Show 7 with two hands.');buttons();S.want=chk(2,()=>S.won>=2,'5 on one hand, then count on.')}},
{h:'Many ways to make 5',p:'Use both hands. Make 5. Then make 5 a new way.',
 predict:{q:'Kit puts up 3 fingers on one hand and 2 on the other. How many is that?',opts:['3','2','5'],ans:2},task:'Make 5 three ways',
 show:()=>{steps[3].go();play([...U(0,5),check,()=>bump(0,-1),()=>bump(1,1),check,()=>bump(0,-1),()=>bump(1,1),check],180)},go:()=>{fresh();speak('Make 5 with two hands.');buttons();S.want=chk(3,()=>S.won>=3,'5 can be split many ways. It is still 5.')}},
{h:'Five little ducks',p:'When a duck swims away, put one finger down. Keep fingers and ducks the same.',task:'Sing down to no ducks',
 show:()=>{steps[4].go();play([...Array(5)].flatMap(()=>[swim,()=>bump(0,-1)]),200)},go:()=>{fresh();speak('Five little ducks. Five fingers up.');buttons();S.want=chk(4,()=>S.won>=1,'Each time a duck goes, one finger goes down.')}},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Ben holds up 3 fingers. Then 1 more goes up. How many now?',[['4','ok'],['3','same'],['5','skip']]],
 ['Kit wants to show 8. What can she do?',[['5 on one hand and 3 on the other','ok'],['8 on one hand','one'],['3 on one hand','part']]],
 ['Ana touches her fingers: 1, 2, 3, 4. How many fingers are up?',[['4','ok'],['1','first'],['5','all']]],
 ['2 fingers up on this hand. 2 on that hand. How many?',[['4','ok'],['2','half'],['22','digits']]],
 ['You are 4. How many fingers do you hold up?',[['4','ok'],['5','all'],['3','less']]]];
function why(t){let m='Count each finger that is up, once.';
 if(t==='same')m='One more went up, so it is one more than 3: 4.';
 if(t==='skip')m='Only 1 more went up. 3, then 4. Not 5.';
 if(t==='one')m='One hand has only 5 fingers. Show 5, then 3 more on the other hand.';
 if(t==='part')m='3 is not 8. Show a full hand of 5, and 3 more.';
 if(t==='first')m='The last number you say tells how many. She said 4 last.';
 if(t==='all')m='Count only the fingers that are up. Not every hand shows 5.';
 if(t==='half')m='Count both hands: 2 and 2 more is 4.';
 if(t==='digits')m='2 and 2 is 4 fingers. Count them: 1, 2, 3, 4.';
 if(t==='less')m='4 years, so 4 fingers. Count them to check.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});speak('Challenge: '+q);A.redraw()}
let streak=0;
function judge(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! Good counting.':'✗ '+why(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move:()=>{},up:()=>{}});buttons()}});
A.start()})})();
