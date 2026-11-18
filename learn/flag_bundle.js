/* Flagship – a ten is ten ones (ages 6–7, place value): tap ten loose cubes into a bundle and see them become one ten,
   read numbers built from ten rods and ones, circle ten ones and swap them for a ten (the total stays the same), build
   numbers on a tens-and-ones chart where ten ones swap themselves for a ten, and compare a ten with a pile of ones.
   The Challenge targets the usual slips: counting every rod as 1, writing the digits the wrong way round, thinking a ten
   is 1 or 100 ones, losing cubes in a swap, thinking more pieces means more, and reading the 0 in 10 as nothing. */
(()=>{const LOOSE=13,READ=[[2,4],[1,7],[4,1]],SWAPS=[[1,14],[2,11]],BUILD=[17,30,10],MORE=[[[1,0],[0,9]],[[2,0],[0,15]],[[0,12],[1,0]]];
VIS.reg('flagbundle',c=>{let A,ctl,chal,qi=-1,streak=0;c.fig.classList.add('young');
const S={};
const view=()=>['make','read','swap','chart','more','quiz'][A.step];
const tell=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const px=n=>Math.round(n*(A.narrow?1.05:1.2));
/* labels are drawn in the theme text colour over pale tints, so they read in light and dark themes */
function word(g,s,x,y,n,wt){g.font=`${wt||700} ${px(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=A.col.tx;g.fillText(s,x,y,A.W-10)}
function tile(g,r,col,a,warn){g.fillStyle=A.alpha(col,a);A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.lineWidth=warn?4:2;g.strokeStyle=warn?A.col.rd:A.col.tx;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.stroke()}
const hit=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const U=()=>Math.min(A.W/(A.narrow?18:24),A.H*.058);
/* one cube, and a ten: ten cubes joined in a tall rod */
function cube(g,x,y,u,col,on){g.fillStyle=A.alpha(col,on?.85:.45);g.fillRect(x,y,u-2,u-2);g.lineWidth=on?3:1.5;g.strokeStyle=A.col.tx;g.strokeRect(x,y,u-2,u-2)}
function rod(g,x,y,u){for(let i=0;i<10;i++)cube(g,x,y+i*u,u,A.col.or);g.lineWidth=3;g.strokeStyle=A.col.tx;g.strokeRect(x-1,y-1,u,10*u)}
/* a set of t tens and o ones from (x,y); ones sit in rows of 5 to the right of the rods; returns the rects of the ones */
function set(g,t,o,x,y,u,sel){for(let i=0;i<t;i++)rod(g,x+i*u*1.5,y,u);const ox=x+t*u*1.5+(t?u*.4:0),rs=[];
 for(let i=0;i<o;i++){const r={x:ox+(i%5)*u*1.1,y:y+Math.floor(i/5)*u*1.1,w:u,h:u};cube(g,r.x,r.y,u,A.col.cy,sel&&sel.includes(i));rs.push(r)}return rs}
const setW=(t,o,u)=>t*u*1.5+(t&&o?u*.4:0)+(o?Math.min(o,5)*u*1.1:0);
const ansR=i=>{const w=(A.W-40)/3;return{x:10+i*(w+10),y:A.H*.8,w,h:A.H*.15}};
const half=k=>({x:k?A.W/2+6:6,y:A.H*.14,w:A.W/2-12,h:A.H*.72});
const colR=k=>({x:k?A.W/2+4:8,y:A.H*.13,w:A.W/2-12,h:A.H*.68});
const looseR=i=>{const u=U()*1.25,x=A.W*.08+(i%5)*u*1.35+(Math.floor(i/5)%2)*u*.5,y=A.H*.2+Math.floor(i/5)*u*1.5;return{x,y,w:u,h:u}};
const trayR=()=>{const u=U();return{x:A.W*.72,y:A.H*.12,w:u+12,h:10*u+12}};
function draw(A){const{ctx:g,W,H,col:C}=A,v=view(),u=U();g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.05:.4);g.fillRect(0,0,W,H);S.hits=[];
 if(v==='quiz'){word(g,'10 ones = 1 ten',W/2,H*.3,22,800);word(g,'1 ten and 3 ones = 13',W/2,H*.5,20,800);word(g,'Tens first, then ones',W/2,H*.7,17,700);return}
 if(v==='make'){const tr=trayR();tile(g,tr,C.or,.08,false);
  if(S.rod)rod(g,tr.x+6,tr.y+6,u);else for(let i=0;i<S.inb;i++)cube(g,tr.x+6,tr.y+6+(9-i)*u,u,C.cy,false);
  for(let i=S.inb;i<LOOSE;i++){const r=looseR(i);cube(g,r.x,r.y,r.w,C.cy,false);S.hits.push([r,i])}
  word(g,S.rod?'10 ones make 1 ten!':`Tap a cube to put it in the bundle (${S.inb} of 10)`,W/2,H*.06,13,800);
  word(g,S.rod?`1 ten and ${LOOSE-10} ones = ${LOOSE}`:`Bundle: ${S.inb} ones`,W*.36,H*.86,15,800)}
 if(v==='read'){const k=Math.min(S.round,READ.length-1),[t,o]=READ[k],x=(W-setW(t,o,u))/2;set(g,t,o,x,H*.14,u);
  word(g,S.round<READ.length?'How many cubes? Each tall rod is a ten.':'All 3 numbers read!',W/2,H*.06,13,800);
  if(S.round<READ.length)readOpts().forEach((o,i)=>{const r=ansR(i);tile(g,r,C.vi,.14,S.oops===o);word(g,String(o),r.x+r.w/2,r.y+r.h/2,20,800)})}
 if(v==='swap'){const L=colR(0),R=colR(1);tile(g,L,C.or,.06,false);tile(g,R,C.cy,.06,false);word(g,'Tens',L.x+L.w/2,H*.08,14,800);word(g,'Ones',R.x+R.w/2,H*.08,14,800);
  set(g,S.tens,0,L.x+u*.6,L.y+u*.5,u);const rs=set(g,0,S.ones,R.x+u*.5,R.y+u*.5,u,S.sel);rs.forEach((r,i)=>S.hits.push([r,i]));
  word(g,`${S.tens} tens and ${S.ones} ones = ${S.tens*10+S.ones} cubes`,W/2,H*.88,14,800);
  word(g,S.ones>=10?`Tap ones to circle 10 (${S.sel.length} of 10)`:'Fewer than 10 ones. No swap needed.',W/2,H*.96,11,700)}
 if(v==='chart'){const L=colR(0),R=colR(1),tg=BUILD[Math.min(S.round,BUILD.length-1)];tile(g,L,C.or,.06,false);tile(g,R,C.cy,.06,false);
  word(g,'Tens',L.x+L.w/2,L.y+px(14),14,800);word(g,'Ones',R.x+R.w/2,R.y+px(14),14,800);set(g,S.tens,0,L.x+u*.6,L.y+px(30),u*.8);set(g,0,S.ones,R.x+u*.5,R.y+px(30),u);
  word(g,String(S.tens),L.x+L.w/2,H*.9,26,800);word(g,String(S.ones),R.x+R.w/2,H*.9,26,800);
  word(g,S.round<BUILD.length?`Make ${tg}. Tap a column to add.`:'All 3 numbers made!',W/2,H*.06,13,800)}
 if(v==='more'){const k=Math.min(S.round,MORE.length-1),pr=MORE[k],uu=Math.min(u,(W/2-30)/8.4);
  [0,1].forEach(s=>{const r=half(s),[t,o]=pr[s];tile(g,r,s?C.gr:C.vi,.08,S.oops===s);set(g,t,o,r.x+(r.w-setW(t,o,uu))/2,r.y+uu*.6,uu);word(g,`${t?t+' ten'+(t>1?'s':''):''}${t&&o?' and ':''}${o?o+' ones':''}`,r.x+r.w/2,r.y+r.h-px(14),12,800)});
  word(g,S.round<MORE.length?'Tap the side with MORE cubes':'All 3 done!',W/2,H*.06,13,800);word(g,`Round ${Math.min(S.round+1,3)} of 3`,W/2,H*.95,11,600)}
 A.fx.draw(g)}
const readOpts=()=>{const[t,o]=READ[S.round],a=t*10+o;return[[a,t+o,o*10+t],[t+o,o*10+t,a],[o*10+t,a,t+o]][S.round%3]};
const bad=(t,mark)=>{S.oops=mark;A.sound.miss();tell(t);A.redraw()},good=t=>{S.oops=null;A.sound.pop();tell(t);pad();A.redraw();S.want()};
/* step 0 */
function bundle(){if(S.rod)return;S.inb++;A.sound.tick();if(S.inb<10){tell(`${S.inb} ones in the bundle.`);pad();return A.redraw()}
 S.rod=1;good(`10 ones make 1 ten! Now we have 1 ten and ${LOOSE-10} ones. That is ${LOOSE}.`)}
/* step 1 */
function pickRead(o){if(S.round>=READ.length)return;const[t,o1]=READ[S.round],a=t*10+o1;
 if(o===t+o1)return bad(`${o} counts each rod as 1. A rod is 10 ones. Count the tens: ${[...Array(t)].map((_,i)=>(i+1)*10).join(', ')}, then the ones.`,o);
 if(o!==a)return bad(`Tens come first. ${t} tens and ${o1} ones is ${a}, not ${o}.`,o);
 S.round++;good(`Yes! ${t} tens and ${o1} ones make ${a}.`)}
/* step 2 */
function circle(i){if(S.round>=SWAPS.length||S.ones<10)return;if(i==null)i=[...Array(S.ones).keys()].find(j=>!S.sel.includes(j));if(S.sel.includes(i)){tell('That one is circled. Tap a new one.');return}
 S.sel.push(i);A.sound.tick();if(S.sel.length<10){tell(`${S.sel.length} ones circled.`);pad();return A.redraw()}
 const tot=S.tens*10+S.ones;S.tens++;S.ones-=10;S.sel=[];S.round++;
 if(S.round<SWAPS.length){const[t,o]=SWAPS[S.round];setTimeout(()=>{S.tens=t;S.ones=o;tell(`New pile: ${t} tens and ${o} ones. Circle 10 ones.`);pad();A.redraw()},A.reduced()?5:900)}
 good(`Swapped 10 ones for 1 ten. Now ${S.tens} tens and ${S.ones} ones. Still ${tot} cubes!`)}
/* step 3 */
function add(k,d){if(S.round>=BUILD.length||S.wait)return;A.sound.tick();
 if(k){S.tens=Math.max(0,Math.min(5,S.tens+d))}else{S.ones=Math.max(0,S.ones+d);if(S.ones>=10){S.ones-=10;S.tens=Math.min(5,S.tens+1);tell('10 ones! They swap for 1 ten.');pad();A.redraw();return chk()}}
 tell(`${S.tens} tens and ${S.ones} ones. That is ${S.tens*10+S.ones}.`);pad();A.redraw();chk()}
function chk(){const tg=BUILD[S.round];if(S.tens*10+S.ones!==tg)return;S.round++;const t=Math.floor(tg/10),o=tg%10;
 S.wait=1;setTimeout(()=>{S.wait=0;S.tens=0;S.ones=0;A.redraw()},A.reduced()?5:900);good(`Yes! ${tg} is ${t} ten${t>1?'s':''} and ${o} ones.`+(o?'':' The 0 says: no ones left over.'))}
/* step 4 */
function pickMore(s){if(S.round>=MORE.length)return;const pr=MORE[S.round],val=x=>x[0]*10+x[1],big=val(pr[0])>val(pr[1])?0:1;
 if(s!==big){const[t,o]=pr[s];return bad(o>t?`More pieces is not more cubes. A ten is 10 ones, and ${val(pr[big])} is more than ${val(pr[s])}.`:`Count the ten as 10 ones. ${val(pr[s])} is less than ${val(pr[big])}.`,s)}
 S.round++;good(`Yes! ${val(pr[big])} is more than ${val(pr[1-big])}.`)}
function pad(){if(!ctl)return;ctl.innerHTML='';const v=view(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};
 if(v==='make'&&!S.rod)B('Put a cube in',()=>bundle(),'Put one cube in the bundle');
 if(v==='read'&&S.round<READ.length)readOpts().forEach(o=>B(String(o),()=>pickRead(o),`There are ${o} cubes`));
 if(v==='swap'&&S.ones>=10)B('Circle a one',()=>circle(),'Circle one more ones cube');
 if(v==='chart'&&S.round<BUILD.length){B('+ ten',()=>add(1,1),'Add a ten');B('+ one',()=>add(0,1),'Add a one');B('− ten',()=>add(1,-1),'Take away a ten');B('− one',()=>add(0,-1),'Take away a one')}
 if(v==='more'&&S.round<MORE.length){B('Left side',()=>pickMore(0),'The left side has more');B('Right side',()=>pickMore(1),'The right side has more')}}
function down(p){const v=view();
 if(v==='make'){bundle();return false}
 if(v==='read'&&S.round<READ.length){readOpts().forEach((o,i)=>{if(hit(p,ansR(i)))pickRead(o)});return false}
 if(v==='swap'){for(const[r,i]of S.hits)if(hit(p,{x:r.x-3,y:r.y-3,w:r.w+6,h:r.h+6}))return circle(i),false;return false}
 if(v==='chart'){if(hit(p,colR(1)))add(0,1);else if(hit(p,colR(0)))add(1,1);return false}
 if(v==='more'){pickMore(p.x<A.W/2?0:1);return false}return false}
const check=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const k=++S.tok;fns.forEach((fn,j)=>setTimeout(()=>{if(k===S.tok)fn()},A.reduced()?j*20+20:(j+1)*ms))};
const reset=()=>{const t=(S.tok||0)+1;Object.keys(S).forEach(k=>delete S[k]);Object.assign(S,{tok:t,want:()=>{},inb:0,rod:0,round:0,oops:null,tens:0,ones:0,sel:[],hits:[]})};
const rep=(n,f)=>[...Array(n)].map(()=>f);
const steps=[
{h:'Make a ten',p:'Here are some loose cubes. Put them in the bundle one at a time. What happens at 10?',task:'Bundle 10 ones',
 show:()=>{steps[0].go();play(rep(10,()=>bundle()),180)},
 go:()=>{reset();tell('13 loose cubes. Tap a cube to put it in the bundle.');pad();S.want=check(0,()=>S.rod,'10 ones = 1 ten.')}},
{h:'Count tens and ones',p:'Each tall rod is a ten. Count the rods in tens: 10, 20, 30. Then count on the ones.',predict:{q:'1 rod and 3 cubes. How many cubes in all?',opts:['13','4','31'],ans:0},task:'Read 3 numbers',
 show:()=>{steps[1].go();play(READ.map(([t,o])=>()=>pickRead(t*10+o)),700)},
 go:()=>{reset();tell('2 rods and 4 cubes. How many cubes?');pad();S.want=check(1,()=>S.round>=READ.length,'Tens first, then ones: 24, 17, 41.')}},
{h:'Swap 10 ones for a ten',p:'Too many ones? Circle 10 of them. They swap for 1 ten. Watch the total.',predict:{q:'You swap 10 ones for 1 ten. How many cubes now?',opts:['The same','10 fewer','10 more'],ans:0},task:'Make 2 swaps',
 show:()=>{steps[2].go();play(rep(10,()=>circle()),110);setTimeout(()=>play(rep(10,()=>circle()),110),A.reduced()?400:2200)},
 go:()=>{reset();S.tens=SWAPS[0][0];S.ones=SWAPS[0][1];tell('1 ten and 14 ones. Circle 10 ones.');pad();S.want=check(2,()=>S.round>=SWAPS.length,'A swap keeps every cube: 24 stayed 24 and 31 stayed 31.')}},
{h:'Tens and ones chart',p:'The left digit counts tens. The right digit counts ones. Tap a column to add a ten or a one.',predict:{q:'To make 30, how many ones do you need?',opts:['0','30','3'],ans:0},task:'Make 3 numbers',
 show:()=>{steps[3].go();const acts=[];BUILD.forEach(tg=>{acts.push(...rep(Math.floor(tg/10),[()=>add(1,1),160]),...rep(tg%10,[()=>add(0,1),160]));acts[acts.length-1]=[acts[acts.length-1][0],1100]});
  const k=++S.tok;let j=0;(function nx(){if(k!==S.tok||j>=acts.length)return;const[f,d]=acts[j++];f();setTimeout(nx,A.reduced()?30:d)})()},
 go:()=>{reset();tell('Make 17. Tap the tens or the ones.');pad();S.want=check(3,()=>S.round>=BUILD.length,'17 is 1 ten and 7 ones. 30 is 3 tens and 0 ones.')}},
{h:'Which is more?',p:'A ten is one rod, but it is 10 cubes. Pick the side with more cubes.',task:'Pick 3 times',
 show:()=>{steps[4].go();play(MORE.map(pr=>()=>pickMore(pr[0][0]*10+pr[0][1]>pr[1][0]*10+pr[1][1]?0:1)),650)},
 go:()=>{reset();tell('1 ten or 9 ones. Which has more?');pad();S.want=check(4,()=>S.round>=MORE.length,'1 ten beats 9 ones. Count cubes, not pieces.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['1 ten and 5 ones. What number is that?',[['15','ok'],['6','count'],['51','swap']]],
 ['How many ones make 1 ten?',[['10','ok'],['1','one'],['100','hund']]],
 ['How many tens are in 34?',[['3','ok'],['4','swap'],['34','all']]],
 ['1 ten and 12 ones. Swap 10 ones for a ten. Now you have…',[['2 tens and 2 ones','ok'],['1 ten and 2 ones','lost'],['3 tens','extra']]],
 ['Which is more: 2 tens or 15 ones?',[['2 tens','ok'],['15 ones','pieces'],['The same','same']]],
 ['In the number 10, what does the 0 tell you?',[['No ones left over','ok'],['There is nothing','zero'],['There are 0 tens','place']]]];
function hintFor(t){let m='A ten is 10 ones. Count tens first, then ones.';
 if(t==='count')m='You counted the rod as 1. A rod is a ten, 10 ones. 10 and 5 more is 15.';
 if(t==='swap')m='The digits are the wrong way round. The tens digit comes first, then the ones.';
 if(t==='one')m='A ten is one rod, but it is made of 10 cubes. Count them: 10 ones.';
 if(t==='hund')m='100 is ten tens. One ten is just 10 ones.';
 if(t==='all')m='34 is the whole number. The 3 on the left counts the tens: 30.';
 if(t==='lost')m='The 10 ones did not go away. They became a new ten, so you have 2 tens now.';
 if(t==='extra')m='Only 10 ones swap. 12 take away 10 leaves 2 ones, so it is 2 tens and 2 ones.';
 if(t==='pieces')m='More pieces is not more cubes. 2 tens is 20, and 20 is more than 15.';
 if(t==='same')m='Count the cubes: 2 tens is 20 and 15 ones is 15. 20 is more.';
 if(t==='zero')m='10 is not nothing. The 1 means one ten. The 0 just says no extra ones.';
 if(t==='place')m='The 1 is in the tens place, so there is 1 ten. The 0 is in the ones place.';
 return m}
function ask(){qi++;const[q,ops]=QS[qi%QS.length],rot=qi%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
function mark(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?'✓ Yes! In a row: '+streak+'.':'✗ '+hintFor(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;pad()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move:()=>{},up:()=>{}});pad()}});
A.start()})})();
