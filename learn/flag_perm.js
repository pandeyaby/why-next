/* Flagship – permutations and combinations (16–18): fill a 1st/2nd/3rd podium from 4 runners and see 4 × 3 × 2;
   gather the 24 ordered podiums into teams to see nCr = nPr / r!; step n! up from 0! = 1; explore nCr with the
   symmetry nCr = nC(n − r) on a Pascal row; build the distinct arrangements of AAB and AABB to see n! / (p! q!). */
(()=>{
const RUN=['A','B','C','D'],PLACE=['1st','2nd','3rd'],WORDS=['AAB','AABB'],NEED=[3,6];
const fac=n=>n<2?1:n*fac(n-1),P=(n,r)=>fac(n)/fac(n-r),Cn=(n,r)=>r<0||r>n?0:Math.round(P(n,r)/fac(r));
const PERMS=[];RUN.forEach(a=>RUN.forEach(b=>RUN.forEach(d=>{if(a!==b&&b!==d&&a!==d)PERMS.push(a+b+d)})));
const key=s=>s.split('').sort().join('');
VIS.reg('flagperm',c=>{let A,pad,quiz,qi=-1,tick=0,wt=0;
const fresh=()=>({cb:()=>{},pod:[],seen:[],teams:[],n:3,fv:{},cn:6,cr:2,cv:{},wi:0,slot:[],made:[],last:'',hot:[],quick:0}),S=fresh();
const mode=()=>['pod','team','fact','ncr','rep','quiz'][A.step];
const px=n=>Math.round(n*(A.narrow?.95:1.05)),fast=()=>A.reduced();
const say=s=>{c.say(s);A&&A.cv.setAttribute('aria-label',s)};
function txt(g,s,x,y,sz,col,al,wt){g.font=`${wt||600} ${px(sz)}px system-ui,sans-serif`;g.fillStyle=col||A.col.tx;g.textAlign=al||'center';g.textBaseline='middle';g.fillText(s,x,y)}
const hues=()=>[A.col.cy,A.col.or,A.col.gr,A.col.vi];
function tile(g,x,y,w,h,label,fill,sz,id){g.fillStyle=fill;A.paint.rrect(x,y,w,h,Math.min(10,h*.2));g.fill();g.strokeStyle=A.alpha(A.col.tx,.35);g.lineWidth=1.5;g.stroke();
 txt(g,label,x+w/2,y+h/2,sz,A.col.tx,'center',800);if(id)S.hot.push(Object.assign({x,y,w,h},id))}
function render(A){const{ctx:g,W,H,col:C}=A,m=mode(),N=A.narrow;S.hot=[];g.fillStyle=A.mix(C.pn,'#dbeafe',C.dark?.05:.35);g.fillRect(0,0,W,H);
 if(m==='pod'){const s=Math.min(W*.19,H*.17,84),gap=s*.25,x0=(W-4*s-3*gap)/2;
  txt(g,'Runners: tap one to fill the next place',W/2,H*.06,12,C.mu);
  RUN.forEach((r,i)=>{const used=S.pod.includes(r);tile(g,x0+i*(s+gap),H*.11,s,s*.8,r,used?A.alpha(C.ln,.3):A.alpha(hues()[i],.55),20,used?null:{run:r})});
  const sw=Math.min(W*.26,110),sx=(W-3*sw-2*gap)/2,sy=H*.36;
  PLACE.forEach((p,i)=>{const r=S.pod[i],x=sx+i*(sw+gap);g.strokeStyle=C.mu;g.lineWidth=2;g.setLineDash(r?[]:[5,4]);A.paint.rrect(x,sy,sw,s*.9,10);
   if(r){g.fillStyle=A.alpha(hues()[RUN.indexOf(r)],.55);g.fill()}g.stroke();g.setLineDash([]);txt(g,r||'?',x+sw/2,sy+s*.45,20,C.tx,'center',800);txt(g,p,x+sw/2,sy+s*.9+px(11),11,C.mu)});
  const choices=[4,3,2].map((v,i)=>i<S.pod.length?String(v):'□').join(' × ');txt(g,`choices: ${choices}${S.pod.length===3?' = 24':''}`,W/2,H*.64,14,C.tx,'center',800);
  const cols=N?4:8,cw=Math.min((W-24)/cols,90);S.seen.forEach((w,i)=>{const x=(W-cols*cw)/2+(i%cols)*cw,y=H*.72+Math.floor(i/cols)*px(26);txt(g,w,x+cw/2,y,12,C.tx,'center',700)});
  txt(g,`different podiums made: ${S.seen.length}`,W/2,H*.95,12,C.mu)}
 if(m==='team'){const cols=N?4:8,rows=24/cols,gw=W-24,cw=gw/cols,ch=Math.min(H*.62/rows,52);
  PERMS.forEach((w,i)=>{const t=S.teams.indexOf(key(w)),x=12+(i%cols)*cw,y=H*.07+Math.floor(i/cols)*ch;
   tile(g,x+3,y+3,cw-6,ch-6,w,t<0?A.alpha(C.ln,.28):A.alpha(hues()[t],.55),13,{perm:w})});
  const k=S.teams.length;txt(g,`teams found: ${k} of 4   ·   ordered podiums grouped: ${6*k} of 24`,W/2,H*.78,12,C.tx,'center',700);
  txt(g,k?`each team is listed 3! = 6 times, so 4C3 = 24 ÷ 6 = 4`:'Tap a podium: every podium with the same 3 runners joins its team.',W/2,H*.88,k?13:11,k?C.tx:C.mu,'center',k?800:600)}
 if(m==='fact'){const n=S.n,bw=Math.min((W-40)/8,46),bx=(W-n*bw)/2;
  for(let i=0;i<n;i++){g.fillStyle=A.alpha(hues()[i%4],.6);A.paint.rrect(bx+i*bw+3,H*.08,bw-6,H*.2,4);g.fill();txt(g,String(i+1),bx+i*bw+bw/2,H*.18,11,C.tx,'center',800)}
  if(!n)txt(g,'(an empty shelf)',W/2,H*.18,12,C.mu);
  const prod=n?Array.from({length:n},(_,i)=>n-i).join(' × '):'1, by definition';txt(g,`${n}! = ${prod}`,W/2,H*.38,n>6&&N?12:15,C.tx,'center',800);
  txt(g,`= ${fac(n).toLocaleString('en-GB')} ${n===1?'order':'orders'} of ${n} ${n===1?'book':'books'}`,W/2,H*.47,15,C.tx,'center',800);
  const tw=(W-24)/9;for(let k=0;k<=8;k++){const x=12+k*tw,on=k===n;g.fillStyle=on?A.alpha(C.or,.6):A.alpha(C.ln,.25);A.paint.rrect(x+2,H*.58,tw-4,H*.24,6);g.fill();
   txt(g,`${k}!`,x+tw/2,H*.64,11,C.tx,'center',800);txt(g,String(fac(k)),x+tw/2,H*.74,N?9:11,C.tx,'center',700);S.hot.push({fac:k,x,y:H*.58,w:tw,h:H*.24})}
  txt(g,'Tap a box or use n − / n +',W/2,H*.9,11,C.mu)}
 if(m==='ncr'){const n=S.cn,r=S.cr,bw=(W-40)/(n+1),top=Math.max(...Array.from({length:n+1},(_,k)=>Cn(n,k))),base=H*.6,hh=H*.36;
  for(let k=0;k<=n;k++){const v=Cn(n,k),h=Math.max(3,v/top*hh),x=20+k*bw,col=k===r?C.or:k===n-r?C.vi:A.alpha(C.cy,.55);g.fillStyle=col;A.paint.rrect(x+bw*.15,base-h,bw*.7,h,3);g.fill();
   txt(g,String(v),x+bw/2,base-h-px(8),n>8&&N?8:10,C.tx,'center',700);txt(g,String(k),x+bw/2,base+px(10),10,C.tx,'center',700);S.hot.push({bar:k,x,y:base-hh,w:bw,h:hh+px(22)})}
  txt(g,`r = 0 … ${n}   (orange: r = ${r},  purple: n − r = ${n-r})`,W/2,base+px(26),10,C.mu);
  txt(g,`${n}P${r} = ${P(n,r)}   ·   ${r}! = ${fac(r)}`,W/2,H*.8,13,C.tx,'center',700);
  txt(g,`${n}C${r} = ${n}P${r} ÷ ${r}! = ${Cn(n,r)}  =  ${n}C${n-r}`,W/2,H*.9,15,C.tx,'center',800)}
 if(m==='rep'){const w=WORDS[S.wi],L=w.length,s=Math.min(W*.18,H*.16,78),gap=s*.3,x0=(W-L*s-(L-1)*gap)/2;
  txt(g,`Word: ${w}   ·   tap letters to build an arrangement`,W/2,H*.05,12,C.mu);
  w.split('').forEach((ch,i)=>{const used=S.slot.includes(i);tile(g,x0+i*(s+gap),H*.1,s,s*.8,ch,used?A.alpha(C.ln,.3):A.alpha(ch==='A'?C.cy:C.or,.55),20,used?null:{let:i})});
  for(let i=0;i<L;i++){const x=x0+i*(s+gap),j=S.slot[i];g.strokeStyle=C.mu;g.lineWidth=2;g.setLineDash(j==null?[5,4]:[]);A.paint.rrect(x,H*.32,s,s*.8,8);g.stroke();g.setLineDash([]);if(j!=null)txt(g,w[j],x+s/2,H*.32+s*.4,20,C.tx,'center',800)}
  txt(g,`different arrangements: ${S.made.length} of ?`,W/2,H*.56,13,C.tx,'center',800);
  S.made.forEach((v,i)=>txt(g,v,W/2+(i-(S.made.length-1)/2)*px(L*13),H*.66,13,C.tx,'center',700));
  if(S.made.length>=NEED[S.wi])txt(g,S.wi?'4! ÷ (2! × 2!) = 24 ÷ 4 = 6':'3! ÷ 2! = 6 ÷ 2 = 3',W/2,H*.78,15,C.gr,'center',800);
  if(S.last)txt(g,S.last,W/2,H*.9,11,C.mu)}
 if(m==='quiz'){txt(g,'nPr = n! ÷ (n − r)!',W/2,H*.3,18,C.tx,'center',800);txt(g,'nCr = nPr ÷ r!',W/2,H*.5,18,C.tx,'center',800);txt(g,'order matters → permutation · order does not → combination',W/2,H*.7,11,C.mu)}
 A.fx.draw(g)}
function addRunner(r){if(mode()!=='pod'||S.pod.includes(r))return;S.pod.push(r);A.sound.tick();
 if(S.pod.length<3){say(`${r} takes ${PLACE[S.pod.length-1]}. ${4-S.pod.length} runners left for ${PLACE[S.pod.length]}.`);return A.redraw()}
 const w=S.pod.join(''),fresh=!S.seen.includes(w);if(fresh)S.seen.push(w);say(`Podium ${w}${fresh?'':' again'}. 4 choices for 1st, then 3, then 2: 4 × 3 × 2 = 24 podiums. You have made ${S.seen.length}.`);
 S.pod=[];A.redraw();S.cb()}
function groupTeam(w){if(mode()!=='team')return;const k=key(w);if(S.teams.includes(k)){say(`Team ${k} is already grouped: ${PERMS.filter(p=>key(p)===k).join(', ')}.`);return}
 S.teams.push(k);A.sound.pop();say(`Team ${k}: the 6 podiums ${PERMS.filter(p=>key(p)===k).join(', ')} are one team. ${S.teams.length} of 4 teams.`);controls();A.redraw();S.cb()}
function setN(n){if(mode()!=='fact')return;S.n=Math.max(0,Math.min(8,n));S.fv[S.n]=1;A.sound.tick();say(S.n?`${S.n}! = ${fac(S.n)}.`:'0! = 1. There is exactly one way to arrange nothing.');A.redraw();S.cb()}
function setC(n,r){if(mode()!=='ncr')return;S.cn=Math.max(1,Math.min(10,n));S.cr=Math.max(0,Math.min(S.cn,r));if(S.cn===10)S.cv[S.cr]=1;A.sound.tick();
 say(`n = ${S.cn}, r = ${S.cr}: ${S.cn}P${S.cr} = ${P(S.cn,S.cr)}, ${S.cn}C${S.cr} = ${Cn(S.cn,S.cr)}, the same as ${S.cn}C${S.cn-S.cr}.`);controls();A.redraw();S.cb()}
function putLetter(i){if(mode()!=='rep'||S.slot.includes(i))return;const w=WORDS[S.wi];S.slot.push(i);A.sound.tick();
 if(S.slot.length<w.length){say(`Placed ${w[i]}.`);return A.redraw()}
 const v=S.slot.map(j=>w[j]).join('');S.slot=[];if(S.made.includes(v)){S.last=`${v} again: swapping identical letters gives nothing new.`;A.sound.miss()}else{S.made.push(v);S.last=`New: ${v}.`}
 say(S.last+` ${S.made.length} different so far.`);A.redraw();
 if(!S.wi&&S.made.length>=NEED[0]){const id=++wt;setTimeout(()=>{if(id!==wt||mode()!=='rep')return;S.wi=1;S.made=[];S.last='3! ÷ 2! = 3. Now try AABB.';say(S.last);controls();A.redraw()},fast()||S.quick?20:1400)}S.cb()}
function controls(){if(!pad)return;pad.innerHTML='';const m=mode(),B=(s,fn,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost sm','aria-label':l||null},pad,s);e.onclick=fn};
 if(m==='pod'){RUN.forEach(r=>B(`Runner ${r}`,()=>addRunner(r),`Put runner ${r} in the next place`));B('Clear',()=>{S.pod=[];say('Podium cleared.');A.redraw()},'Clear the podium')}
 if(m==='team'){const nx=PERMS.find(p=>!S.teams.includes(key(p)));if(nx)B(`Group ${nx}'s team`,()=>groupTeam(nx),`Group every podium with runners ${key(nx)}`)}
 if(m==='fact'){B('n −',()=>setN(S.n-1),'Decrease n');B('n +',()=>setN(S.n+1),'Increase n')}
 if(m==='ncr'){B('n −',()=>setC(S.cn-1,S.cr),'Decrease n');B('n +',()=>setC(S.cn+1,S.cr),'Increase n');B('r −',()=>setC(S.cn,S.cr-1),'Decrease r');B('r +',()=>setC(S.cn,S.cr+1),'Increase r')}
 if(m==='rep'){WORDS[S.wi].split('').forEach((ch,i)=>B(`${ch} (tile ${i+1})`,()=>putLetter(i),`Place letter ${ch}, tile ${i+1}`));B('Clear',()=>{S.slot=[];say('Slots cleared.');A.redraw()},'Clear the slots')}A.redraw()}
const hit=(p,z)=>p.x>=z.x&&p.x<=z.x+z.w&&p.y>=z.y&&p.y<=z.y+z.h;
function down(p){const z=S.hot.find(q=>hit(p,q));if(!z)return false;
 if(z.run)addRunner(z.run);else if(z.perm)groupTeam(z.perm);else if(z.fac!=null)setN(z.fac);else if(z.bar!=null)setC(S.cn,z.bar);else if(z.let!=null)putLetter(z.let);return false}
const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(fs,gap){const id=++tick;fs.forEach((fn,j)=>setTimeout(()=>{if(id===tick)fn()},fast()?j*30+20:(j+1)*(gap||280)))}
const reset=()=>{tick++;wt++;Object.assign(S,fresh())};
const seq=s=>s.split('').map(r=>()=>addRunner(r));
const steps=[
{h:'Filling places in order',p:'Four runners race. Tap runners to fill 1st, 2nd and 3rd. Watch how many choices are left for each place.',
 predict:{q:'How many different 1st-2nd-3rd podiums can 4 runners make?',opts:['12','24','64'],ans:1},task:'Make 3 different podiums',
 show:()=>{steps[0].go();play([...seq('ABC'),...seq('BAC'),...seq('CAB')])},go:()=>{reset();say('Four runners, three places. Tap a runner for 1st.');controls();S.cb=finish(0,()=>S.seen.length>=3,'Multiplication principle: 4 × 3 × 2 = 24 ordered podiums. That is 4P3.')}},
{h:'When order does not matter',p:'These are all 24 podiums. A team of 3 does not care who came 1st. Tap a podium to gather its team.',
 predict:{q:'How many different teams of 3 can you pick from 4 runners?',opts:['24','4','12'],ans:1},task:'Gather all 24 podiums into teams',
 show:()=>{steps[1].go();play(['ABC','ABD','ACD','BCD'].map(w=>()=>groupTeam(w)))},go:()=>{reset();say('24 podiums. Tap one to gather its team.');controls();S.cb=finish(1,()=>S.teams.length===4,'Each team of 3 appears 3! = 6 times, so 4C3 = 4P3 ÷ 3! = 24 ÷ 6 = 4.')}},
{h:'Factorials',p:'n! is the number of ways to put n different books in a row. Step n up and down.',task:'Look at 0! and then at 6!',
 show:()=>{steps[2].go();play([()=>setN(2),()=>setN(1),()=>setN(0),()=>setN(6)])},go:()=>{reset();say('3! = 6. Step n.');controls();S.cb=finish(2,()=>S.fv[0]&&S.fv[6],'n! = n × (n − 1)!, so 1! = 1 × 0! forces 0! = 1. Factorials grow fast: 6! = 720.')}},
{h:'Choosing r from n',p:'Each bar is nCr for one value of r. Set n and r with the buttons, or tap a bar.',
 predict:{q:'Which is bigger, 10C3 or 10C7?',opts:['10C3','10C7','They are equal'],ans:2},task:'At n = 10, find two values of r with the same nCr',
 show:()=>{steps[3].go();play([()=>setC(10,2),()=>setC(10,3),()=>setC(10,7)])},go:()=>{reset();say('n = 6, r = 2. Set n to 10.');controls();S.cb=finish(3,()=>Object.keys(S.cv).some(r=>+r!==5&&S.cv[10-r]),'Choosing r to take is the same as choosing n − r to leave, so nCr = nC(n − r).')}},
{h:'Repeated letters',p:'Build every different arrangement of the letters. Identical letters look the same, so some orders repeat.',
 predict:{q:'How many different arrangements does AAB have?',opts:['6','3','2'],ans:1},task:'Find all arrangements of AAB, then of AABB',
 show:()=>{steps[4].go();const g=s=>s.map(i=>()=>putLetter(i));play([()=>{S.quick=1},...g([0,1,2]),...g([0,2,1]),...g([2,0,1]),()=>{},
  ...g([0,1,2,3]),...g([0,2,1,3]),...g([0,2,3,1]),...g([2,0,1,3]),...g([2,0,3,1]),...g([2,3,0,1])],120)},
 go:()=>{reset();say('Word AAB. Tap letters to build an arrangement.');controls();S.cb=finish(4,()=>S.wi===1&&S.made.length>=6,'Divide by the orders of the identical letters: n! ÷ (p! q!). AABB has 4! ÷ (2! 2!) = 6.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.cb()});
const QS=[['In how many ways can 1st, 2nd and 3rd be given out among 8 runners?',[['336','ok'],['56','comb'],['512','pow']]],
 ['How many ways can you choose a team of 3 from 8 players?',[['56','ok'],['336','perm'],['11','add']]],
 ['How many different arrangements of the letters of LEVEL are there?',[['30','ok'],['120','rep'],['60','half']]],
 ['A code has 3 digits from 0 to 9, and digits may repeat. How many codes are there?',[['1000','ok'],['720','norep'],['120','sel']]],
 ['Which of these is equal to 9C2?',[['9C7','ok'],['9C3','sym'],['9P2','ord']]],
 ['What is the value of 0!?',[['1','ok'],['0','zero'],['It is undefined','undef']]]];
function why(t){let m='Ask first: does order matter, and can things repeat?';
 if(t==='comb')m='56 is 8C3, which ignores order. Medals have an order: 8 × 7 × 6 = 336 = 8P3.';
 if(t==='pow')m='8 × 8 × 8 lets one runner win two medals. Each runner can only finish once: 8 × 7 × 6 = 336.';
 if(t==='perm')m='336 = 8P3 counts ABC and CBA as different. A team has no order, so divide by 3! = 6: 336 ÷ 6 = 56.';
 if(t==='add')m='Use multiplication, not addition: 8C3 = (8 × 7 × 6) ÷ 3! = 56.';
 if(t==='rep')m='120 = 5! treats the two Ls and the two Es as different. Divide by 2! for the Ls and 2! for the Es: 120 ÷ 4 = 30.';
 if(t==='half')m='60 divides by only one 2!. LEVEL has two repeated letters, L twice and E twice, so 5! ÷ (2! × 2!) = 30.';
 if(t==='norep')m='720 = 10 × 9 × 8 forbids repeats. Here digits may repeat, so each place has 10 choices: 10³ = 1000.';
 if(t==='sel')m='120 = 10C3 ignores order, but 123 and 321 are different codes, and repeats are allowed: 10 × 10 × 10 = 1000.';
 if(t==='sym')m='The symmetry is nCr = nC(n − r). With n = 9 and r = 2, n − r = 7, so 9C2 = 9C7 = 36.';
 if(t==='ord')m='9P2 = 72 counts ordered pairs. 9C2 = 72 ÷ 2! = 36, the same as 9C7.';
 if(t==='zero')m='0! is 1, not 0. There is one way to arrange nothing, and n! = n × (n − 1)! needs 1! = 1 × 0!.';
 if(t==='undef')m='0! is defined as 1. It keeps nCr = n! ÷ (r!(n − r)!) working, for example nC0 = 1.';
 return m}
function ask(){qi++;const[q,os]=QS[qi%QS.length],k=qi%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');os.slice(k).concat(os.slice(0,k)).forEach(([o,tag])=>{const e=c.el('button',{type:'button',class:'lbtn'},row,o);e.onclick=()=>mark(tag)});say('Challenge: '+q);A.redraw()}
let streak=0;
function mark(tag){quiz.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=tag==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Correct.':'✗ '+why(tag)}${ok?` Streak ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.3,draw:render,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move:()=>{},up:()=>{}});controls()}});
A.start()})})();
