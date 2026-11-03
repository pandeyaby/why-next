/* Flagship – factors, multiples and primes (ages 9–11, Y5/Y6; CCSS 4.OA.B.4, 6.NS.B.4): arrange n tiles into full
   rectangles to find every factor pair, sort numbers into prime and composite by trying rectangles, tap the common
   factors of 24 and 36, find the common multiples of 6 and 8 on a 1–60 grid, and test 91 and 97 by dividing only by
   primes up to 10. Feedback names the usual slips: odd means prime, 1 is prime, the product is the lowest common multiple. */
(()=>{const PR=[7,9,2,15,1],CF=[24,36],GRID=60,BIG=[91,97],TRY=[2,3,5,7];
const fac=n=>{const f=[];for(let d=1;d<=n;d++)if(n%d===0)f.push(d);return f},isP=n=>fac(n).length===2;
VIS.reg('flagfpair',c=>{let A,box,ch,qk=-1,good=0;
const S={};
const page=()=>['rect','prime','cf','cm','test','quiz'][A.step];
const speak=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const z=n=>Math.round(n*(A.narrow?1:1.15)),R=()=>A.redraw();
/* all text is the theme text colour over pale tints, so it reads in both themes */
function put(g,s,x,y,n,w,al){g.font=`${w||700} ${z(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=A.col.tx;g.fillText(s,x,y,A.W-14)}
function cell(g,x,y,w,h,col,a,edge){g.fillStyle=A.alpha(col,a);A.paint.rrect(x,y,w,h,Math.min(8,w/4));g.fill();g.lineWidth=edge||1.5;g.strokeStyle=edge>2?A.col.rd:A.col.tx;A.paint.rrect(x,y,w,h,Math.min(8,w/4));g.stroke()}
const within=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* n tiles laid out c to a row: full rows in green, a short last row in red */
function tiles(g,n,cols,top,hgt){const{W}=A,rows=Math.ceil(n/cols),sz=Math.min((W*.9)/cols,hgt/rows,46),x0=(W-sz*cols)/2,left=n%cols;
 for(let i=0;i<n;i++){const r=Math.floor(i/cols),k=i%cols,short=left&&r===rows-1;cell(g,x0+k*sz+2,top+r*sz+2,sz-4,sz-4,short?A.col.rd:A.col.gr,short?.35:.3)}
 return left}
function rectView(g,n,txt){const{W,H}=A,left=tiles(g,n,S.cols,H*.2,H*.56);put(g,`${n} tiles, ${S.cols} in each row`,W/2,H*.07,15,800);
 put(g,left?`${Math.floor(n/S.cols)} full rows and ${left} left over: ${S.cols} is not a factor`:`${S.cols} × ${n/S.cols} = ${n}: a full rectangle`,W/2,H*.13,13);if(txt)put(g,txt,W/2,H*.93,13,700)}
const slots=n=>{const w=(A.W-12*(n+1))/n;return[...Array(n)].map((_,i)=>({x:12+i*(w+12),y:A.H*.82,w,h:A.H*.14}))};
function numGrid(){const cols=10,w=(A.W-20)/cols,h=Math.min(w*.8,(A.H*.72)/6);return[...Array(GRID)].map((_,i)=>({n:i+1,x:10+(i%cols)*w,y:A.H*.2+Math.floor(i/cols)*h,w:w-3,h:h-3}))}
const chips=()=>{const L=[...new Set(fac(24).concat(fac(36)))].sort((a,b)=>a-b),cols=A.narrow?5:7,w=(A.W-20)/cols,h=A.H*.13;return L.map((n,i)=>({n,x:10+(i%cols)*w,y:A.H*.36+Math.floor(i/cols)*(h+6),w:w-6,h}))};
function draw(A){const{ctx:g,W,H,col:C}=A,v=page();g.fillStyle=A.mix(C.pn,'#ecfccb',C.dark?.04:.35);g.fillRect(0,0,W,H);
 if(v==='quiz'){put(g,'A factor pair makes a full rectangle',W/2,H*.3,17,800);put(g,'A prime has exactly 2 factors',W/2,H*.48,17,800);put(g,'Common multiples: in both times tables',W/2,H*.66,15);return}
 if(v==='rect'){rectView(g,12,'Pairs found: '+(S.pairs.length?S.pairs.map(([a,b])=>a+' × '+b).join(', '):'none yet'))}
 if(v==='prime'){const n=PR[Math.min(S.round,PR.length-1)];if(S.round<PR.length){S.cols=Math.min(S.cols,n);rectView(g,n,'Only 1 row works? Then it is prime.')}else put(g,'Primes: 7 and 2. Not prime: 9, 15 and 1.',W/2,H/2,15,800)}
 if(v==='cf'){put(g,'Tap the numbers that are factors of 24 and of 36',W/2,H*.07,14,800);put(g,'24: '+fac(24).join(', '),W/2,H*.17,13);put(g,'36: '+fac(36).join(', '),W/2,H*.26,13);
  chips().forEach(r=>{const got=S.got.includes(r.n);cell(g,r.x,r.y,r.w,r.h,got?C.gr:C.cy,got?.35:.1,S.oops===r.n?4:1.5);put(g,String(r.n),r.x+r.w/2,r.y+r.h/2,16,800)});put(g,`Found ${S.got.length} of 6`,W/2,H*.93,14)}
 if(v==='cm'){put(g,'Ring = in the 6s.  Dot = in the 8s.  Tap a number in both.',W/2,H*.07,13,800);numGrid().forEach(r=>{const six=r.n%6===0,ate=r.n%8===0,got=S.got.includes(r.n);
   cell(g,r.x,r.y,r.w,r.h,got?C.gr:six&&ate&&S.oops==='x'?C.or:C.pn,got?.4:six&&ate&&S.oops==='x'?.25:.8,S.oops===r.n?4:1);put(g,String(r.n),r.x+r.w/2,r.y+r.h/2,11,got?800:600);
   if(six){g.lineWidth=2.5;g.strokeStyle=C.vi;g.beginPath();g.arc(r.x+r.w/2,r.y+r.h/2,Math.min(r.w,r.h)*.46,0,7);g.stroke()}
   if(ate){g.fillStyle=C.tx;g.beginPath();g.arc(r.x+r.w-6,r.y+6,3.5,0,7);g.fill()}});put(g,`Common multiples found: ${S.got.join(', ')||'none yet'}`,W/2,H*.93,13)}
 if(v==='test'){const n=BIG[Math.min(S.round,1)];put(g,S.round<2?`Is ${n} prime?`:'91 = 7 × 13.  97 is prime.',W/2,H*.08,19,800);put(g,'10 × 10 = 100, so only try primes below 10',W/2,H*.17,13);
  S.tries.forEach((d,i)=>{const q=Math.floor(n/d),r=n%d;put(g,`${n} ÷ ${d} = ${q}${r?' r '+r:''}  ${r?'(not a factor)':'(a factor!)'}`,W/2,H*(.3+i*.1),15,r?600:800)});
  slots(4).forEach((r,i)=>{cell(g,r.x,r.y,r.w,r.h,C.or,S.tries.includes(TRY[i])?.3:.1,1.5);put(g,'÷ '+TRY[i],r.x+r.w/2,r.y+r.h/2,15,800)})}
 A.fx.draw(g)}
const miss=(t,m)=>{S.oops=m;A.sound.miss();speak(t);R()},hit=t=>{S.oops=null;A.sound.pop();speak(t);keys();R();S.want()};
/* step 0: choose how many tiles go in each row */
function setCols(k,n){n=n||12;k=Math.max(1,Math.min(n,k));S.cols=k;A.sound.tick();if(n%k){speak(`${k} in a row leaves ${n%k} over. ${k} is not a factor of ${n}.`);keys();return R()}
 if(page()!=='rect'){speak(`${k} × ${n/k} = ${n}. A full rectangle.`);return R()}
 const pr=[Math.min(k,12/k),Math.max(k,12/k)];if(!S.pairs.some(q=>q[0]===pr[0]))S.pairs.push(pr);S.pairs.sort((a,b)=>a[0]-b[0]);
 if(S.pairs.length<3){speak(`${k} × ${12/k} = 12. Factor pair ${pr[0]} and ${pr[1]}. ${S.pairs.length} found.`);keys();return R()}
 hit('1 × 12, 2 × 6 and 3 × 4. The factors of 12 are 1, 2, 3, 4, 6 and 12.')}
/* step 1 */
const NOTE={7:'7 tiles only make 1 row of 7. Its only factors are 1 and 7, so it is prime.',9:'9 makes 3 rows of 3. 9 = 3 × 3, so it is not prime, even though it is odd.',2:'2 has exactly 2 factors, 1 and 2. It is prime: the only even prime.',
 15:'15 makes 3 rows of 5. 15 = 3 × 5, so it is not prime.',1:'1 has only 1 factor. A prime needs exactly 2, so 1 is not prime.'};
function call(p){if(S.round>=PR.length)return;const n=PR[S.round];if(p!==isP(n))return miss('Not quite. '+NOTE[n],p);S.round++;S.cols=1;
 if(S.round<PR.length){A.sound.tick();S.oops=null;speak(`Yes. ${NOTE[n]} Next: ${PR[S.round]}.`);keys();return R()}hit(`Yes. ${NOTE[n]}`)}
/* step 2 */
function pickF(n){if(S.got.includes(n))return;if(24%n||36%n){const a=24%n?24:36,b=a===24?36:24;return miss(`${n} is a factor of ${b}, but ${a} ÷ ${n} leaves ${a%n} over. It must go into both.`,n)}
 S.got.push(n);S.got.sort((a,b)=>a-b);if(S.got.length<6){A.sound.tick();S.oops=null;speak(`${n} goes into 24 and 36. ${S.got.length} found.`);keys();return R()}hit('1, 2, 3, 4, 6 and 12. The highest common factor is 12.')}
/* step 3 */
function pickM(n){if(S.got.includes(n))return;const six=n%6===0,ate=n%8===0;if(!(six&&ate))return miss(six?`${n} is in the 6s (6 × ${n/6}) but not the 8s.`:ate?`${n} is in the 8s (8 × ${n/8}) but not the 6s.`:`${n} is not in the 6s or the 8s.`,n);
 S.got.push(n);S.got.sort((a,b)=>a-b);if(S.got.length<2){A.sound.tick();S.oops=null;speak(`${n} is 6 × ${n/6} and 8 × ${n/8}. Find the next one.`);keys();return R()}hit('24 and 48. The lowest common multiple of 6 and 8 is 24, not 6 × 8.')}
/* step 4 */
function divide(d){if(S.round>=2||S.tries.includes(d))return;const n=BIG[S.round];S.tries.push(d);A.sound.tick();speak(n%d?`${n} ÷ ${d} leaves ${n%d} over.`:`${n} ÷ ${d} = ${n/d}. So ${d} is a factor.`);keys();R()}
function decide(p){if(S.round>=2)return;const n=BIG[S.round];
 if(p&&!isP(n))return miss(S.tries.includes(7)?'Look at your tries: 91 ÷ 7 = 13, so 91 = 7 × 13 and is not prime.':'Keep trying. One of 2, 3, 5 or 7 goes into 91 exactly.',p);
 if(!p&&isP(n))return miss(S.tries.length<4?'Try all of 2, 3, 5 and 7 first. If none goes in, it is prime.':'None of 2, 3, 5 or 7 went in, so 97 has no factor pair except 1 × 97. It is prime.',p);
 if(p&&S.tries.length<4)return miss('You might be right, but test 2, 3, 5 and 7 first to be sure.',p);
 S.round++;S.tries=[];if(S.round<2){A.sound.tick();S.oops=null;speak('Yes. 91 = 7 × 13, so it is not prime. Now test 97.');keys();return R()}hit('Yes. No prime below 10 divides 97, so 97 is prime.')}
function keys(){if(!box)return;box.innerHTML='';const v=page(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost sm','aria-label':l||null},box,t);b.onclick=fn};
 if(v==='rect'||(v==='prime'&&S.round<PR.length)){const n=v==='rect'?12:PR[S.round];B('− 1 per row',()=>setCols(S.cols-1,n),'One fewer tile in each row');B('+ 1 per row',()=>setCols(S.cols+1,n),'One more tile in each row')}
 if(v==='prime'&&S.round<PR.length){B('Prime',()=>call(true),`${PR[S.round]} is prime`);B('Not prime',()=>call(false),`${PR[S.round]} is not prime`)}
 if(v==='cf')chips().forEach(r=>{if(!S.got.includes(r.n))B(String(r.n),()=>pickF(r.n),`${r.n} is a common factor`)});
 if(v==='cm')[6,8,12,14,16,24,30,32,36,40,48].forEach(n=>{if(!S.got.includes(n))B(String(n),()=>pickM(n),`${n} is in both tables`)});
 if(v==='test'&&S.round<2){TRY.forEach(d=>{if(!S.tries.includes(d))B('÷ '+d,()=>divide(d),`Divide ${BIG[S.round]} by ${d}`)});B('Prime',()=>decide(true),`${BIG[S.round]} is prime`);B('Not prime',()=>decide(false),`${BIG[S.round]} is not prime`)}}
function down(p){const v=page();
 if(v==='rect'||v==='prime'){S.drag=1;return true}
 if(v==='cf'){chips().forEach(r=>{if(within(p,r))pickF(r.n)});return false}
 if(v==='cm'){numGrid().forEach(r=>{if(within(p,r))pickM(r.n)});return false}
 if(v==='test'){slots(4).forEach((r,i)=>{if(within(p,r))divide(TRY[i])});return false}return false}
function move(p){if(!S.drag)return;const n=page()==='rect'?12:PR[S.round];if(n==null)return;const k=Math.max(1,Math.min(n,Math.round(p.x/A.W*n+.5)));if(k!==S.cols)setCols(k,n)}
function up(){S.drag=0}
const ready=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const seq=(fns,ms)=>{const k=++S.tok;fns.forEach((fn,j)=>setTimeout(()=>{if(k===S.tok)fn()},A.reduced()?j*30+30:(j+1)*ms))};
const clear=()=>{const t=(S.tok||0)+1;Object.keys(S).forEach(k=>delete S[k]);Object.assign(S,{tok:t,want:()=>{},round:0,cols:5,pairs:[],got:[],tries:[],oops:null,drag:0})};
const steps=[
{h:'Factor pairs',p:'Drag across the tiles, or use the buttons, to change how many go in each row. A full rectangle shows a factor pair.',task:'Find all 3 factor pairs of 12',
 show:()=>{steps[0].go();seq([1,2,3].map(k=>()=>setCols(k)),900)},
 go:()=>{clear();speak('12 tiles, 5 in each row. 2 are left over.');keys();S.want=ready(0,()=>S.pairs.length>=3,'12 = 1 × 12 = 2 × 6 = 3 × 4.')}},
{h:'Prime or not?',p:'A prime number has exactly 2 factors: 1 and itself. Try rectangles, then decide.',predict:{q:'Is 9 a prime number?',opts:['Yes, it is odd','No, 9 = 3 × 3','Yes, 9 is not in the 2s'],ans:1},task:'Decide 5 numbers',
 show:()=>{steps[1].go();seq(PR.map(n=>()=>call(isP(n))),850)},
 go:()=>{clear();S.cols=1;speak('7 tiles. Can they make more than 1 row?');keys();S.want=ready(1,()=>S.round>=PR.length,'Odd does not mean prime, and 1 is not prime.')}},
{h:'Common factors',p:'A common factor goes exactly into both numbers.',task:'Find all 6 common factors of 24 and 36',
 show:()=>{steps[2].go();seq([1,2,3,4,6,12].map(n=>()=>pickF(n)),600)},
 go:()=>{clear();speak('Which numbers go into both 24 and 36?');keys();S.want=ready(2,()=>S.got.length>=6,'Common factors 1, 2, 3, 4, 6, 12.')}},
{h:'Common multiples',p:'A common multiple is in both times tables. Find the numbers with a ring and a dot.',predict:{q:'What is the first number in both the 6 and the 8 times tables?',opts:['48, because 6 × 8 = 48','24','14, because 6 + 8 = 14'],ans:1},task:'Find 2 common multiples up to 60',
 show:()=>{steps[3].go();seq([24,48].map(n=>()=>pickM(n)),1000)},
 go:()=>{clear();speak('Rings show the 6s, dots show the 8s.');keys();S.want=ready(3,()=>S.got.length>=2,'24 comes before 48.')}},
{h:'Test big numbers',p:'To test a number below 100, divide by 2, 3, 5 and 7. If none goes in exactly, it is prime.',predict:{q:'To check if 97 is prime, what must you try?',opts:['Every number up to 96','Only 2, 3, 5 and 7','Only 2 and 5'],ans:1},task:'Decide if 91 and 97 are prime',
 show:()=>{steps[4].go();seq([()=>divide(7),()=>decide(false),...TRY.map(d=>()=>divide(d)),()=>decide(true)],600)},
 go:()=>{clear();speak('Is 91 prime? Try dividing.');keys();S.want=ready(4,()=>S.round>=2,'91 = 7 × 13; 97 is prime.')}},
{h:'Challenge',p:'',go:()=>{clear();pose()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Is 1 a prime number?',[['No, it has only 1 factor','ok'],['Yes, it divides by 1 and itself','one'],['Yes, it is the smallest number','small']]],
 ['Which list shows all the factors of 18?',[['1, 2, 3, 6, 9, 18','ok'],['2, 3, 6, 9','ends'],['18, 36, 54','mult']]],
 ['Is 51 prime?',[['No, 51 = 3 × 17','ok'],['Yes, it is odd','odd'],['Yes, it is not in a times table I know','table']]],
 ['What is the lowest common multiple of 4 and 6?',[['12','ok'],['24','product'],['2','hcf']]],
 ['What is the highest common factor of 24 and 36?',[['12','ok'],['6','notall'],['72','lcm']]],
 ['Which number is a multiple of 7?',[['63','ok'],['17','digit'],['1','factor']]]];
function slip(t){let m='Check it with tiles: can you make a full rectangle?';
 if(t==='one')m='1 and itself are the same number here, so 1 has only 1 factor. A prime needs exactly 2.';
 if(t==='small')m='Being small does not make it prime. The smallest prime is 2.';
 if(t==='ends')m='Every number has 1 and itself as factors. Do not leave out 1 and 18.';
 if(t==='mult')m='Those are multiples of 18. Factors go into 18, so they are 18 or less.';
 if(t==='odd')m='Odd is not enough. 5 + 1 = 6 is in the 3s, so 51 = 3 × 17.';
 if(t==='table')m='Test it: 51 ÷ 3 = 17 exactly. So 51 has a factor pair 3 × 17.';
 if(t==='product')m='24 is a common multiple, but 12 comes first: 4 × 3 and 6 × 2.';
 if(t==='hcf')m='2 is the highest common factor. The lowest common multiple is in both tables: 12.';
 if(t==='notall')m='6 is a common factor, but 12 also goes into both, and it is higher.';
 if(t==='lcm')m='72 is a common multiple. Factors are 24 or less: 12 is the highest.';
 if(t==='digit')m='Having a 7 in it does not make a multiple. 17 ÷ 7 leaves 3 over. 63 = 7 × 9.';
 if(t==='factor')m='1 is a factor of 7, not a multiple. Multiples are 7, 14, 21 … 63.';
 return m}
function pose(){qk++;const[q,ops]=QS[qk%QS.length],sh=qk%3;ch.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const rw=ch.querySelector('.fl-pick');ops.slice(sh).concat(ops.slice(0,sh)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},rw,o);b.onclick=()=>judge(t)});speak('Challenge: '+q);R()}
function judge(t){ch.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=ch.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){good++;A.win()}else{good=0;A.sound.miss()}fb.innerHTML=(ok?'Yes, that’s right. In a row: '+good+'.':'Not this time. '+slip(t))+' <button type="button" class="linkish">Another question</button>';fb.querySelector('button').onclick=pose}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{ch.hidden=A.step!==5;box.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);box=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);ch=E('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});keys()}});
A.start()})})();
