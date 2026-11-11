/* Flagship – knowing all letters (ages 4–6): drag each small letter to its capital partner, tell b, d, p and q apart,
   fill the gap in the alphabet train (l m n o p are four letters, not one), tell a letter's name from its sound, and
   spell words with letter names to choose between c and k. Drag or tap, big targets, few words. */
(()=>{
const PAIRS=[['S','M','T'],['A','G','R'],['B','D','Q']];
const FLIPS=[['b',['d','b','q','p']],['d',['b','p','d','q']],['p',['q','d','b','p']],['q',['p','q','b','d']]];
const TRAIN=[[['L','M','?','O','P'],'N',['N','W','E']],[['A','B','?','D'],'C',['G','C','E']],[['P','Q','?','S'],'R',['B','O','R']],[['W','X','?','Z'],'Y',['U','V','Y']]];
const NAMES=[['c',['see','kuh: its sound','ess']],['h',['huh: its sound','aitch','ay']],['w',['why','wuh: its sound','double-u']]];
const SPELL=[['cat','🐱',['k','a','c','t']],['kid','🧒',['c','i','d','k']],['dog','🐶',['b','o','g','d']]];
const NM={a:'ay',b:'bee',c:'see',d:'dee',g:'gee',i:'eye',k:'kay',o:'oh',p:'pee',q:'cue',t:'tee'};
const ABC='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
VIS.reg('flagabc',c=>{let A,pad,quiz,qi=-1,run=0;c.fig.classList.add('young');
const B0=()=>({want:()=>{},won:0,r:0,k:0,cards:[],put:[],opts:[],sel:-1,grab:null,bad:-1}),S=B0();
const mode=()=>['pair','flip','train','name','spell','quiz'][A.step];
const R=()=>A.reduced(),fz=n=>Math.round(n*(A.narrow?1:1.15));
const say=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
function words(g,t,x,y,n,col,wt){g.font=`${wt||800} ${fz(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-16)}
function tile(g,t,rc,hot,big){const C=A.col;g.fillStyle=C.dark?'#1e293b':'#fffbeb';A.paint.rrect(rc.x,rc.y,rc.w,rc.h,12);g.fill();g.strokeStyle=hot===2?C.vi:hot?C.rd:C.tx;g.lineWidth=hot?5:3;A.paint.rrect(rc.x,rc.y,rc.w,rc.h,12);g.stroke();
 const n=t.length>2?Math.min(rc.h*.3,rc.w/t.length*1.5):Math.min(rc.w,rc.h)*(big||.66);g.font=`${t.length>2?700:600} ${Math.round(n)}px "Andika","Comic Sans MS",system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=C.tx;g.fillText(t,rc.x+rc.w/2,rc.y+rc.h/2+2,rc.w-8)}
/* ---- layout ---- */
function boxes(){const{W,H}=A,n=S.opts.length,gap=10,w=Math.min((W-20-gap*(n-1))/n,150),x0=(W-n*w-gap*(n-1))/2,y=H*.5,h=Math.min(H*.42,w*1.25);return S.opts.map((_,k)=>({x:x0+k*(w+gap),y,w,h}))}
function cardRects(){const{W,H}=A,n=S.cards.length,w=Math.min(W/5,82),h=Math.min(H*.3,w*1.15),gap=(W-n*w)/(n+1);
 return S.cards.map((_,i)=>{if(S.grab&&S.grab.i===i&&S.grab.x!=null)return{x:S.grab.x-w/2,y:S.grab.y-h/2,w,h};const b=S.put[i];
  if(b>=0){const rc=boxes()[b],sw=rc.w*.48,sh=sw*1.1;return{x:rc.x+rc.w-sw-6,y:rc.y+rc.h-sh-6,w:sw,h:sh}}return{x:gap+i*(w+gap),y:H*.08,w,h}})}
/* ---- drawing ---- */
function drawPair(g){const C=A.col;boxes().forEach((rc,k)=>{g.fillStyle=S.bad===k?A.alpha(C.rd,.14):A.alpha(C.cy,.12);A.paint.rrect(rc.x-4,rc.y-4,rc.w+8,rc.h+8,16);g.fill();
  tile(g,S.opts[k],{x:rc.x,y:rc.y,w:rc.w*.62,h:rc.h*.62},S.bad===k,.8)});
 const rs=cardRects();S.cards.map((_,i)=>i).sort((a,b)=>(S.grab&&S.grab.i===a)-(S.grab&&S.grab.i===b)).forEach(i=>tile(g,S.cards[i],rs[i],S.sel===i));
 words(g,'Small letter to its capital',A.W/2,A.H*.45,13,C.mu,700)}
function drawTrain(g){const C=A.col,[seq]=TRAIN[Math.min(S.r,3)],n=seq.length,w=Math.min((A.W-30)/n-8,80),x0=(A.W-n*(w+8))/2,y=A.H*.1;
 seq.forEach((t,k)=>{const rc={x:x0+k*(w+8),y,w,h:w*1.05};g.fillStyle=k%2?'#2563eb':'#16a34a';A.paint.rrect(rc.x,rc.y+rc.h-4,rc.w,12,5);g.fill();
  tile(g,t,rc,t==='?'?2:0);g.fillStyle='#111';[.25,.75].forEach(d=>{g.beginPath();g.arc(rc.x+rc.w*d,rc.y+rc.h+12,7,0,7);g.fill()})});
 boxes().forEach((rc,k)=>tile(g,S.opts[k],rc,S.bad===k))}
function drawName(g){const C=A.col,[l]=NAMES[Math.min(S.r,2)],s=A.H*.34;tile(g,l,{x:A.W/2-s/2,y:A.H*.06,w:s,h:s},false,.8);words(g,'Tap its name',A.W/2,A.H*.45,13,C.mu,700);boxes().forEach((rc,k)=>tile(g,S.opts[k],rc,S.bad===k))}
function drawSpell(g){const C=A.col,[w,pic]=SPELL[Math.min(S.r,2)],sw=Math.min(A.W*.13,70),x0=A.W*.38;words(g,pic,A.W*.2,A.H*.22,46,C.tx,400);
 for(let i=0;i<3;i++){const rc={x:x0+i*(sw+8),y:A.H*.1,w:sw,h:sw*1.15};if(i<S.k)tile(g,w[i],rc);else{g.strokeStyle=i===S.k?C.vi:C.mu;g.lineWidth=i===S.k?5:3;g.setLineDash([6,5]);A.paint.rrect(rc.x,rc.y,rc.w,rc.h,12);g.stroke();g.setLineDash([])}}
 if(S.k<3)words(g,`Find ${NM[w[S.k]]}`,A.W/2,A.H*.45,15,C.tx,800);boxes().forEach((rc,k)=>tile(g,S.opts[k],rc,S.bad===k))}
function draw(A){const{ctx:g,W,H,col:C}=A,v=mode();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.04:.4);g.fillRect(0,0,W,H);
 if(v==='quiz'){words(g,'A B C D E F G',W/2,H*.4,22);words(g,'Say the name, then find the shape.',W/2,H*.6,14);return}
 if(S.won>=lastN()){words(g,ending(),W/2,H/2,15);return A.fx.draw(g)}
 if(v==='pair')drawPair(g);else if(v==='train')drawTrain(g);else if(v==='name')drawName(g);else if(v==='spell')drawSpell(g);
 else{words(g,`Tap ${FLIPS[Math.min(S.r,3)][0]}: ${NM[FLIPS[Math.min(S.r,3)][0]]}`,W/2,H*.25,20);boxes().forEach((rc,k)=>tile(g,S.opts[k],rc,S.bad===k,.75))}A.fx.draw(g)}
const lastN=()=>({pair:3,flip:4,train:4,name:3,spell:3}[mode()]||9);
const ending=()=>({pair:'Capital or small, it is the same letter.',flip:'Turn b around and it is a new letter.',train:'l, m, n, o, p: five letters, one at a time.',name:'Every letter has a name and a sound.',spell:'Letter names tell us which letter to write.'}[mode()]);
const miss=(t,b)=>{A.sound.miss();S.bad=b==null?-1:b;say(t);setTimeout(()=>{S.bad=-1;A.redraw()},R()?10:900);A.redraw()};
function setup(){const v=mode(),r=S.r;S.sel=-1;S.grab=null;S.k=0;
 if(v==='pair'){S.opts=PAIRS[Math.min(r,2)].slice();S.cards=S.opts.map(x=>x.toLowerCase());S.cards.push(S.cards.shift());S.put=S.cards.map(()=>-1)}
 else{S.cards=[];S.put=[];S.opts=v==='flip'?FLIPS[Math.min(r,3)][1]:v==='train'?TRAIN[Math.min(r,3)][2]:v==='name'?NAMES[Math.min(r,2)][1]:v==='spell'?SPELL[Math.min(r,2)][2]:[]}}
function win(t){S.won++;S.r++;A.sound.pop();if(S.won<lastN()){setup();say(t+' Next one.')}else say(t);buttons();A.redraw();S.want()}
/* pair: a small letter onto its capital */
function place(i,b){if(mode()!=='pair'||S.put[i]>=0)return;S.sel=-1;const l=S.cards[i],cap=S.opts[b];
 if(S.put.some((x,j)=>x===b&&j!==i))return miss(`${cap} has its partner already. Try another capital.`,b);
 if(l.toUpperCase()!==cap){let t=`That is ${l}. Its capital is ${l.toUpperCase()}, not ${cap}.`;
  if(l==='b'&&cap==='D'||l==='d'&&cap==='B')t=`Careful: b and d are flipped. b has its stick first, then its tummy. That one is ${l}.`;
  else if(l==='q'&&cap!=='Q')t=`q has its tummy first and a tail down. Its capital is Q, a circle with a tail.`;
  else if(l==='a'||l==='g'||l==='r')t=`Small ${l} does not look like ${l.toUpperCase()}, but they are one letter. ${l} goes with ${l.toUpperCase()}.`;return miss(t,b)}
 S.put[i]=b;A.sound.tick();if(S.put.every(x=>x>=0))return win('All the partners match!');say(`Yes! ${l} and ${cap} are the same letter.`);buttons();A.redraw()}
function tapBox(b){const v=mode();if(v==='pair')return onCap(b);if(S.won>=lastN()||v==='quiz')return;const o=S.opts[b];
 if(v==='flip'){const want=FLIPS[Math.min(S.r,3)][0];if(o!==want){const hint={b:'b: stick first, then the tummy.',d:'d: tummy first, like c, then a tall stick.',p:'p: stick goes down below the line, tummy on the right.',q:'q: tummy first, then a tail down below the line.'}[want];return miss(`That is ${o}, ${NM[o]}. It is ${want} turned around. Look for ${hint}`,b)}return win(`Yes! That is ${want}.`)}
 if(v==='train'){const[,ans]=TRAIN[Math.min(S.r,3)];if(o!==ans)return miss(ABC.indexOf(o)>ABC.indexOf(ans)?`${o} comes later in the ABC. Sing it slowly: the gap is the letter just after ${ABC[ABC.indexOf(ans)-1]}.`:`${o} comes earlier in the ABC. Which letter is just after ${ABC[ABC.indexOf(ans)-1]}?`,b);return win(`Yes! ${ABC[ABC.indexOf(ans)-1]}, ${ans}, ${ABC[ABC.indexOf(ans)+1]}.`)}
 if(v==='name'){const[l,ops]=NAMES[Math.min(S.r,2)],ok=l==='c'?'see':l==='h'?'aitch':'double-u';if(o===ok)return win(`Yes! The name of ${l} is ${ok}.`);
  return miss(/sound/.test(o)?`That is the sound ${l} makes. Its name is the one in the ABC song.`:`${o} is the name of a different letter. Sing the ABC to find the name of ${l}.`,b)}
 if(v==='spell'){const[w]=SPELL[Math.min(S.r,2)],want=w[S.k];if(o!==want){let t=`That is ${o}, ${NM[o]}. Find ${NM[want]}.`;
   if(o==='k'&&want==='c'||o==='c'&&want==='k')t=`c and k can both say k. The word ${w} is spelt with ${NM[want]}, ${want}. That one is ${NM[o]}.`;
   else if(o==='b'&&want==='d')t=`That is b, bee, stick first. dee is d: tummy first, then the stick.`;return miss(t,b)}
  S.k++;A.sound.tick();if(S.k>=3)return win(`Yes! ${w} is ${w.split('').map(x=>NM[x]).join(', ')}.`);say(`${NM[want]}. Now find ${NM[w[S.k]]}.`);A.redraw()}}
function pickNext(){const left=S.cards.map((_,i)=>i).filter(i=>S.put[i]<0);if(!left.length)return;S.sel=left[(left.indexOf(S.sel)+1)%left.length];A.sound.tick();say(`Picked small ${S.cards[S.sel]}. Now pick its capital.`);A.redraw()}
function onCap(b){if(S.won>=3)return;if(S.sel<0)pickNext();if(S.sel>=0)place(S.sel,b)}
function buttons(){if(!pad)return;pad.innerHTML='';const v=mode(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=fn};
 if(v==='quiz'||S.won>=lastN())return;if(v==='pair')B('Pick a letter ▶',pickNext,'Pick the next small letter');
 S.opts.forEach((o,b)=>B(v==='pair'?`On ${o}`:o,()=>tapBox(b),v==='pair'?`Put the picked letter on capital ${o}`:v==='name'?`The name is ${o}`:`Letter ${o}`))}
/* pointer */
const inR=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h,boxAt=p=>boxes().findIndex(r=>inR(p,r));
function down(p){if(S.won>=lastN())return false;
 if(mode()==='pair'){const rs=cardRects(),i=rs.findIndex((r,j)=>S.put[j]<0&&inR(p,r));if(i>=0){S.grab={i,x:null,y:null,x0:p.x,y0:p.y};return true}}
 const b=boxAt(p);if(b>=0)tapBox(b);return false}
function move(p){if(!S.grab)return;if(S.grab.x!=null||Math.hypot(p.x-S.grab.x0,p.y-S.grab.y0)>8){S.grab.x=p.x;S.grab.y=p.y;A.redraw()}}
function up(p){const g=S.grab;S.grab=null;if(!g)return;if(g.x==null){S.sel=g.i;A.sound.tick();say(`Picked small ${S.cards[g.i]}. Now tap its capital.`);return A.redraw()}const b=boxAt(p);if(b>=0)place(g.i,b);A.redraw()}
const chk=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list,gap){const k=++run;list.forEach((fn,j)=>setTimeout(()=>{if(k===run)fn()},R()?j*40+30:(j+1)*(gap||260)))}
const fresh=()=>{run++;Object.assign(S,B0());if(A)setup()};
const pick=f=>()=>tapBox(S.opts.indexOf(f()));
const steps=[
{h:'Letter partners',p:'Every letter has a capital and a small shape. Drag each small letter to its capital. Or tap a letter, then tap a capital.',predict:{q:'Capital G and small g look different. Are they the same letter?',opts:['No, two letters','Yes, one letter'],ans:1},task:'Match 3 sets of partners',
 show:()=>{steps[0].go();play([0,1,2].flatMap(()=>[0,1,2].map(i=>()=>place(i,S.opts.indexOf(S.cards[i].toUpperCase()))).concat([()=>{}])),260)},go:()=>{fresh();say('Find the partner for each small letter.');buttons();S.want=chk(0,()=>S.won>=3,'Two shapes, one letter, one name.')}},
{h:'b, d, p, q',p:'These four look alike. Turn one around and you get a new letter. Tap the one we ask for.',predict:{q:'Turn b around, like in a mirror. What is it now?',opts:['Still b','A new letter, d'],ans:1},task:'Find 4 letters',
 show:()=>{steps[1].go();play(FLIPS.map(([w])=>pick(()=>w)),500)},go:()=>{fresh();say('Tap b. Stick first, then the tummy.');buttons();S.want=chk(1,()=>S.won>=4,'Which way it faces changes the letter.')}},
{h:'Alphabet train',p:'The ABC is in order. One car is empty. Tap the letter that goes in the gap.',predict:{q:'In the ABC song, is "elemeno" one letter?',opts:['Yes, one letter','No, it is l, m, n, o'],ans:1},task:'Fill 4 gaps',
 show:()=>{steps[2].go();play(TRAIN.map(([,a])=>pick(()=>a)),500)},go:()=>{fresh();say('Which letter fills the gap?');buttons();S.want=chk(2,()=>S.won>=4,'Each letter has its own place in the ABC.')}},
{h:'Name or sound?',p:'A letter has a name, like in the ABC song. It also makes a sound in words. Tap the name.',task:'Name 3 letters',
 show:()=>{steps[3].go();play(['see','aitch','double-u'].map(n=>pick(()=>n)),500)},go:()=>{fresh();say('What is the name of this letter?');buttons();S.want=chk(3,()=>S.won>=3,'The name is the same every time.')}},
{h:'Spell with names',p:'We spell a word by saying its letter names. Tap each letter you hear.',task:'Spell 3 words',
 show:()=>{steps[4].go();play(SPELL.flatMap(([w])=>w.split('').map(l=>pick(()=>l))),420)},go:()=>{fresh();say('Spell cat: see, ay, tee.');buttons();S.want=chk(4,()=>S.won>=3,'Letter names show which letter to write.')}},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Which small letter goes with capital R?',[['r','ok'],['n','looks'],['R, the same shape','cap']]],
 ['Which letter comes after M in the ABC?',[['N','ok'],['L','before'],['O','skip']]],
 ['What is the name of the letter s?',[['ess','ok'],['sss, its sound','sound'],['see','other']]],
 ['Turn b around, like in a mirror. What is it now?',[['d','ok'],['Still b','same'],['p','down']]],
 ['Is it c or k at the start of cat?',[['c, see','ok'],['k, kay','k'],['Either one','either']]]];
function why(t){let m='Say the letter names slowly, then check each shape.';
 if(t==='looks')m=`n has no little arm. Small r is the partner of R.`;if(t==='cap')m='The partner is the small shape: r.';
 if(t==='before')m='L comes before M. Sing on from M: M, N.';if(t==='skip')m='O comes after N. You skipped N.';
 if(t==='sound')m='sss is the sound s makes in a word. Its name is ess.';if(t==='other')m='see is the name of c. The name of s is ess.';
 if(t==='same')m='Flip b and its tummy moves to the other side. Now it is d.';if(t==='down')m='p has its stick going down. A mirror flip of b gives d.';
 if(t==='k')m='k can say k too, but cat is spelt see, ay, tee.';if(t==='either')m='Both can say k, but each word has one spelling: cat uses c.';return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;
function judge(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! You know your letters.':'✗ '+why(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});buttons()}});
A.start()})})();
