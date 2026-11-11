/* Flagship: Finding efficient methods (ages 5–6; NC Y1 count in multiples of 2, 5 and 10, find one more and 10 more;
   EYFS ELG number patterns). Notice what repeats and use it to count faster or predict: count socks in 2s and get the
   same total as in 1s, +1 is always the next number, +10 on a hundred square is one row down, hops of 2 from 1 land
   only on odd numbers, count hands in 5s (5, 0, 5, 0 endings), and predict tower 5 from towers of 2, 4, 6.
   Not flagpat / flagabab (repeating shape patterns), flagfours (4s, 8s, 50s, 100s) or flagtenmore. */
(()=>{
VIS.reg('flageffic',c=>{let A,keys,chal,qn=-1,ver=0;const S={};c.fig.classList.add('young');
const part=()=>['socks','one','chart','odd','fives','tower','chal'][A.step];
function narrate(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function label(s,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||800} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.ink||A.col.tx;g.fillText(String(s),x,y,o.max||A.W-12)}
function box(r,fill,line){const g=A.ctx;g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=A.col.tx;g.lineWidth=line||1.5;g.stroke()}
const hitBox=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const big=()=>A.narrow?22:28,small=()=>A.narrow?15:17;
/* five pairs of socks in a row; a counted pair shows its running total */
const pairBox=i=>({x:A.W*(.03+i*.194),y:A.H*.16,w:A.W*.17,h:A.H*.32});
function sock(x,y,w,h,col){const g=A.ctx;g.fillStyle=col;g.beginPath();g.moveTo(x,y);g.lineTo(x+w*.55,y);g.lineTo(x+w*.55,y+h*.6);g.quadraticCurveTo(x+w*1.05,y+h*.62,x+w,y+h*.85);g.quadraticCurveTo(x+w*.9,y+h,x+w*.3,y+h);g.quadraticCurveTo(x,y+h,x,y+h*.75);g.closePath();g.fill();g.strokeStyle='#1f2937';g.lineWidth=1.2;g.stroke()}
const SOCK=['#f87171','#60a5fa','#facc15','#4ade80','#c084fc'];
function drawSocks(){const C=A.col;for(let i=0;i<5;i++){const r=pairBox(i),on=i<S.n;box(r,on?A.alpha(C.gr,.25):A.alpha(C.tx,.05),on?2.5:1.5);
  sock(r.x+r.w*.1,r.y+r.h*.12,r.w*.38,r.h*.55,SOCK[i]);sock(r.x+r.w*.52,r.y+r.h*.12,r.w*.38,r.h*.55,SOCK[i]);if(on)label((i+1)*2,r.x+r.w/2,r.y+r.h*.84,big())}
 label(S.n?'2s: '+Array.from({length:S.n},(_,i)=>(i+1)*2).join(', '):'Tap a pair to count in 2s',A.W/2,A.H*.62,small(),{max:A.W*.94});if(S.n===5)label('1s: 1, 2, 3 … 10. Same answer!',A.W/2,A.H*.74,small(),{ink:C.mu})}
/* a number track of ten boxes starting at S.lo */
const cell=(k,y)=>({x:A.W*(.03+k*.094),y:A.H*(y||.3),w:A.W*.088,h:A.H*.14});
function drawTrack(y,mark){const C=A.col;for(let k=0;k<10;k++){const v=S.lo+k,r=cell(k,y),lit=mark(v);box(r,lit===1?A.alpha(C.ac,.35):lit===2?A.alpha(C.gr,.4):lit===3?A.alpha(C.rd,.3):A.alpha(C.tx,.04),lit?2.5:1.2);label(v,r.x+r.w/2,r.y+r.h/2,A.narrow?15:19)}}
const ROUNDS=[5,12,19];
function drawOne(){const n=ROUNDS[S.r]||ROUNDS[2];drawTrack(.3,v=>v===n?1:v===S.got?2:v===S.bad?3:0);label(S.r<3?`What is ${n} + 1?`:'1 more is the next number',A.W/2,A.H*.14,S.r<3?big():small());label(S.msg||'Tap the number that is 1 more',A.W/2,A.H*.6,small(),{ink:A.col.mu,max:A.W*.94})}
/* rows 1–50 of a hundred square */
const sq=v=>{const k=v-1,s=Math.min(A.W*.094,A.H*.105);return{x:(A.W-10*s)/2+(k%10)*s,y:A.H*.12+Math.floor(k/10)*s,w:s-2,h:s-2}};
function drawChart(){const C=A.col;for(let v=1;v<=50;v++){const r=sq(v),lit=v===S.at?1:S.path.includes(v)?2:v===S.bad?3:0;box(r,lit===1?A.alpha(C.ac,.4):lit===2?A.alpha(C.gr,.3):lit===3?A.alpha(C.rd,.3):A.alpha(C.tx,.03),lit?2.5:1);label(v,r.x+r.w/2,r.y+r.h/2,A.narrow?12:15,{w:700})}
 label(S.at>=43?'23, 33, 43: down one row each time':`Find ${S.at} + 10`,A.W/2,A.H*.72,small(),{max:A.W*.94});if(S.msg)label(S.msg,A.W/2,A.H*.82,A.narrow?13:15,{ink:C.mu,max:A.W*.94})}
function drawOdd(){const C=A.col;drawTrack(.42,v=>v===S.frog?1:S.hops.includes(v)?2:v===S.bad?3:0);const r=cell(S.frog-S.lo,.42);label('🐸',r.x+r.w/2,r.y-A.H*.07,A.narrow?26:32);
 label(S.hops.length?S.hops.join(', '):'Hops of 2 from 1',A.W/2,A.H*.14,big());label(S.msg||'Tap where the frog lands next',A.W/2,A.H*.72,small(),{ink:C.mu,max:A.W*.94})}
const handBox=i=>({x:A.W*(.04+i*.24),y:A.H*.12,w:A.W*.2,h:A.H*.3}),nextBox=k=>({x:A.W*(.1+k*.28),y:A.H*.66,w:A.W*.24,h:A.H*.14});
function hand(r,on){const g=A.ctx,cx=r.x+r.w/2,palm=r.y+r.h*.62;g.fillStyle=on?'#fbbf24':'#fcd9b6';for(let f=0;f<5;f++){const fx=cx+(f-2)*r.w*.16,top=r.y+r.h*(f===0?.38:.12);A.paint.rrect(fx-r.w*.06,top,r.w*.12,palm-top,6);g.fill();g.strokeStyle='#7c2d12';g.lineWidth=1;g.stroke()}
 g.beginPath();g.ellipse(cx,palm,r.w*.38,r.h*.2,0,0,7);g.fill();g.stroke()}
function drawFives(){const C=A.col;for(let i=0;i<4;i++){const r=handBox(i),on=i<S.n;hand(r,on);if(on)label((i+1)*5,r.x+r.w/2,r.y+r.h+A.H*.05,big())}
 label(S.n<4?'Tap each hand to count in 5s':'5, 10, 15, 20 … what comes next?',A.W/2,A.H*.57,small(),{max:A.W*.94});
 if(S.n>=4)[21,25,30].forEach((v,k)=>{const r=nextBox(k);box(r,S.pick===v?A.alpha(v===25?C.gr:C.rd,.35):A.alpha(C.am,.2),2);label(v,r.x+r.w/2,r.y+r.h/2,big())});if(S.msg)label(S.msg,A.W/2,A.H*.9,A.narrow?13:15,{ink:C.mu,max:A.W*.94})}
const towerX=i=>A.W*(.1+i*.2),cube=()=>Math.min(A.W*.1,A.H*.05),guessBox=k=>({x:A.W*(.1+k*.28),y:A.H*.76,w:A.W*.24,h:A.H*.13});
function drawTower(){const C=A.col,g=A.ctx,s=cube(),base=A.H*.6;for(let i=0;i<5;i++){const n=i<3?(i+1)*2:i===4&&S.built?10:0,x=towerX(i)-s/2;
  for(let k=0;k<n;k++){g.fillStyle=['#f472b6','#38bdf8','#a3e635'][i%3];g.fillRect(x,base-(k+1)*s,s,s-1);g.strokeStyle='#1f2937';g.strokeRect(x,base-(k+1)*s,s,s-1)}
  label(n||'?',towerX(i),base-(n+.5)*s-(n?A.H*.03:0),A.narrow?16:19);label('tower '+(i+1),towerX(i),base+A.H*.035,A.narrow?11:13,{w:600,ink:C.mu})}
 [8,10,12].forEach((v,k)=>{const r=guessBox(k);box(r,S.pick===v?A.alpha(v===10?C.gr:C.rd,.35):A.alpha(C.vi,.2),2);label(v,r.x+r.w/2,r.y+r.h/2,big())});if(S.msg)label(S.msg,A.W/2,A.H*.7,A.narrow?12:14,{ink:C.mu,max:A.W*.94})}
function draw(Q){const C=Q.col,k=part();Q.ctx.fillStyle=Q.mix(C.pn,'#ecfccb',C.dark?.05:.45);Q.ctx.fillRect(0,0,Q.W,Q.H);
 ({socks:drawSocks,one:drawOne,chart:drawChart,odd:drawOdd,fives:drawFives,tower:drawTower}[k]||(()=>{label(S.q||'Spot the pattern',Q.W/2,Q.H*.4,Q.narrow?24:30,{max:Q.W*.92});label('Use it to go faster',Q.W/2,Q.H*.58,small(),{ink:C.mu})}))();Q.fx.draw(Q.ctx)}
function reset(o){ver++;for(const k in S)delete S[k];Object.assign(S,{n:0,r:0,lo:1,got:null,bad:null,msg:'',at:23,path:[],frog:1,hops:[1],pick:null,built:false,q:'',ok:()=>{}},o||{})}
const passIf=(i,cond,msg)=>()=>{if(A.step===i&&cond()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function demo(i,acts){steps[i].go();const t=ver;acts.forEach((f,j)=>setTimeout(()=>{if(t===ver)f()},A.reduced()?25*(j+1):380*(j+1)))}
function countPair(){if(S.n>=5)return;S.n++;A.sound.pop();narrate(S.n<5?`${S.n*2}.`:'2, 4, 6, 8, 10. Ten socks, the same as counting in 1s.');A.redraw();buttons();S.ok()}
/* +1 rounds: the wrong taps name the slip */
function plusOne(v){const n=ROUNDS[S.r];if(n==null)return;if(v===n+1){S.got=v;S.bad=null;A.sound.pop();S.msg=`${n} + 1 = ${v}`;S.r++;if(S.r<3){S.lo=ROUNDS[S.r]-4;S.got=null}}
 else{S.bad=v;A.sound.miss();S.msg=v<n?`${v} is less. 1 more is the next number.`:v===n?`${n} is where you start. Go to the next number.`:`${v} skips a number. 1 more is the very next one.`}narrate(S.msg);A.redraw();buttons();S.ok()}
function tenMore(v){if(S.at>=43)return;if(v===S.at+10){S.path.push(S.at);S.at=v;S.bad=null;A.sound.pop();S.msg=`${v - 10} + 10 = ${v}. Straight down one row.`}
 else{S.bad=v;A.sound.miss();S.msg=v===S.at+1?`${v} is 1 more. 10 more is one row down.`:v===S.at+11?`${v} is down and along. 10 more is straight down.`:`Look straight down from ${S.at}.`}narrate(S.msg);A.redraw();buttons();S.ok()}
function hop(v){if(S.frog>=9)return;if(v===S.frog+2){S.frog=v;S.hops.push(v);S.bad=null;A.sound.pop();S.msg=v<9?`${v}. Still odd.`:'1, 3, 5, 7, 9: all odd numbers.'}
 else{S.bad=v;A.sound.miss();S.msg=`${v} is a hop of ${v-S.frog}. Hops of 2 skip one number each time.`}narrate(S.msg);A.redraw();buttons();S.ok()}
function countHand(){if(S.n>=4)return;S.n++;A.sound.pop();narrate(`${S.n*5}.`+(S.n===4?' 5, 10, 15, 20. What comes next?':''));A.redraw();buttons();S.ok()}
function nextFive(v){if(S.n<4){A.sound.miss();narrate('Count the hands first.');return}S.pick=v;v===25?A.sound.pop():A.sound.miss();
 S.msg=v===25?'25. The ends go 5, 0, 5, 0, so 25 is next.':v===21?'21 adds 1. Counting in 5s adds 5 every time.':'30 jumps 10. Use the same jump of 5.';narrate(S.msg);A.redraw();buttons();S.ok()}
function guessTower(v){S.pick=v;if(v===10){S.built=true;A.sound.pop();S.msg='2, 4, 6, 8, 10. Tower 5 has 10 cubes.'}else{A.sound.miss();S.msg=v===8?'8 is tower 4. Tower 5 is one more jump of 2.':'12 is tower 6. Count the jumps: 2, 4, 6, 8, 10.'}narrate(S.msg);A.redraw();buttons();S.ok()}
function buttons(){if(!keys)return;keys.innerHTML='';const k=part(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},keys,t).onclick=f};
 if(k==='socks'&&S.n<5)b('Count a pair',countPair,'Count the next pair of socks');
 if(k==='one'&&S.r<3){const n=ROUNDS[S.r];[n-1,n+1,n+2].forEach(v=>b(String(v),()=>plusOne(v),`${n} + 1 is ${v}`))}
 if(k==='chart'&&S.at<43)[S.at+1,S.at+10,S.at+11].forEach(v=>b(String(v),()=>tenMore(v),`${S.at} + 10 is ${v}`));
 if(k==='odd'&&S.frog<9)[S.frog+1,S.frog+2].forEach(v=>b('Hop to '+v,()=>hop(v)));
 if(k==='fives'){if(S.n<4)b('Count a hand',countHand,'Count the next hand of 5');else[21,25,30].forEach(v=>b(String(v),()=>nextFive(v),'Next is '+v))}
 if(k==='tower'&&!S.built)[8,10,12].forEach(v=>b(String(v),()=>guessTower(v),'Tower 5 has '+v))}
function down(p){const k=part();if(k==='chal')return false;
 if(k==='socks'){if([0,1,2,3,4].some(i=>hitBox(p,pairBox(i)))){countPair();return true}return false}
 if(k==='one'||k==='odd'){const y=k==='one'?.3:.42;const i=[...Array(10).keys()].find(j=>hitBox(p,cell(j,y)));if(i!=null){(k==='one'?plusOne:hop)(S.lo+i);return true}return false}
 if(k==='chart'){for(let v=1;v<=50;v++)if(hitBox(p,sq(v))){tenMore(v);return true}return false}
 if(k==='fives'){if([0,1,2,3].some(i=>hitBox(p,handBox(i)))){countHand();return true}const j=[0,1,2].find(i=>hitBox(p,nextBox(i)));if(j!=null&&S.n>=4){nextFive([21,25,30][j]);return true}return false}
 if(k==='tower'){const j=[0,1,2].find(i=>hitBox(p,guessBox(i)));if(j!=null){guessTower([8,10,12][j]);return true}}return false}
const steps=[
{h:'Count in 2s',p:'Socks come in pairs. Count them in 2s: 2, 4, 6. Is it the same as counting in 1s?',
 predict:{q:'You count 5 pairs of socks in 2s. Will you get the same answer as counting in 1s?',opts:['No, you get more','Yes, 10 both ways','No, you get less'],ans:1},
 task:'Count every pair in 2s',show:()=>demo(0,[countPair,countPair,countPair,countPair,countPair]),
 go:()=>{reset();narrate('Five pairs of socks. Tap a pair to count in 2s.');buttons();S.ok=passIf(0,()=>S.n===5,'10 socks. Counting in 2s is quicker, and the answer is the same.')}},
{h:'1 more is next',p:'Adding 1 always gives the next counting number. You do not need to count from 1 again.',
 predict:{q:'What is 19 + 1?',opts:['18','20','29'],ans:1},
 task:'Find 1 more, three times',show:()=>demo(1,[()=>plusOne(6),()=>plusOne(13),()=>plusOne(20)]),
 go:()=>{reset({lo:1});narrate('A number track. What is 5 + 1?');buttons();S.ok=passIf(1,()=>S.r===3,'6, 13, 20. 1 more is always the next number.')}},
{h:'10 more: one row down',p:'On a hundred square, each row has 10 numbers. So 10 more is the number straight below.',
 predict:{q:'Where is 23 + 10 on the hundred square?',opts:['Next to 23','Straight below 23','At the end of the row'],ans:1},
 task:'Find 10 more, two times',show:()=>demo(2,[()=>tenMore(33),()=>tenMore(43)]),
 go:()=>{reset();narrate('A hundred square. 23 is lit. Tap 10 more.');buttons();S.ok=passIf(2,()=>S.at===43,'23, 33, 43. Each 10 more is one row down.')}},
{h:'Hops of 2 from 1',p:'The frog starts on 1 and hops 2 each time. Watch which numbers it lands on.',
 predict:{q:'The frog hops in 2s from 1. Will it land on 10?',opts:['Yes, soon','No, it lands on 9 then 11','Only if it hops fast'],ans:1},
 task:'Hop the frog to 9',show:()=>demo(3,[()=>hop(3),()=>hop(5),()=>hop(7),()=>hop(9)]),
 go:()=>{reset({lo:0,frog:1});narrate('A frog on 1. It hops 2 each time.');buttons();S.ok=passIf(3,()=>S.frog===9,'1, 3, 5, 7, 9. Hops of 2 from 1 land only on odd numbers.')}},
{h:'Count in 5s',p:'Each hand has 5 fingers. Count the hands in 5s, then look at how the numbers end.',
 predict:{q:'5, 10, 15, 20… What comes next?',opts:['21','25','30'],ans:1},
 task:'Count the hands, then pick what comes next',show:()=>demo(4,[countHand,countHand,countHand,countHand,()=>nextFive(25)]),
 go:()=>{reset();narrate('Four hands. Tap each one to count in 5s.');buttons();S.ok=passIf(4,()=>S.n===4&&S.pick===25,'5, 10, 15, 20, 25. The ends go 5, 0, 5, 0.')}},
{h:'Use the pattern',p:'Tower 1 has 2 cubes, tower 2 has 4, tower 3 has 6. Use the pattern to say tower 5 before you build it.',
 predict:{q:'Towers have 2, 4, 6 cubes. How many cubes will tower 5 have?',opts:['8','10','7'],ans:1},
 task:'Pick the number for tower 5',show:()=>demo(5,[()=>guessTower(10)]),
 go:()=>{reset();narrate('Towers of 2, 4 and 6 cubes. How many in tower 5?');buttons();S.ok=passIf(5,()=>S.built,'Each tower adds 2, so tower 5 has 10. The pattern told you.')}},
{h:'Challenge',p:'',go:()=>{reset();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.ok()});
const BANK=[['2, 4, 6, 8, ?','10',[['9','one'],['12','skip']]],['23 + 10 = ?','33',[['24','side'],['13','back']]],['5, 10, 15, ?','20',[['16','one'],['25','skip']]],
 ['1, 3, 5, 7, ?','9',[['8','odd'],['10','odd']]],['16 + 1 = ?','17',[['15','back'],['18','skip']]],['4 pairs of socks. How many socks?','8',[['4','pairs'],['6','skip']]],['40 + 10 = ?','50',[['41','side'],['30','back']]]];
function why(tag){let m='Find the jump, then use the same jump again.';
 if(tag==='one')m='You added 1. This pattern adds the same jump every time, not 1.';
 if(tag==='skip')m='That jumps too far. Use the same jump as before.';
 if(tag==='side')m='That is 1 more. 10 more is one row down: the tens go up, the ones stay the same.';
 if(tag==='back')m='That goes back. More means a bigger number.';
 if(tag==='odd')m='Hops of 2 from 1 land only on odd numbers: 1, 3, 5, 7, 9.';
 if(tag==='pairs')m='You counted the pairs. Each pair is 2 socks: 2, 4, 6, 8.';
 return m}
function quiz(){qn++;const[q,ans,bad]=BANK[qn%BANK.length],opts=[[ans,'ok'],...bad],rot=qn%3,order=opts.slice(rot).concat(opts.slice(0,rot));S.q=q;
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');order.forEach(([v,tag])=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Answer '+v},row,v).onclick=()=>judge(tag,q,ans)});narrate('Challenge: '+q);A.redraw()}
function judge(tag,q,ans){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=tag==='ok';ok?A.win():A.sound.miss();narrate(ok?'Yes, '+ans+'.':why(tag));
 fb.innerHTML=(ok?`✓ Yes: ${ans}.`:'✗ '+why(tag))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.62,tall:1.0,draw,onStep:Q=>{chal.hidden=Q.step!==6;keys.hidden=Q.step===6;buttons()},
 init:Q=>{const w=c.el('div',{class:'fl-below'},Q.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Counting controls'},w);chal=c.el('div',{class:'fl-chal'},Q.below);reset();A.gest({down});buttons()}});
A.start()})})();
