/* Flagship – sorting by colour, size and shape (ages 3–4): the same six toys are sorted into hoops by colour, then by
   size, then by shape; spot the one in the wrong hoop; guess the rule a friend used. Drag or tap, big targets, few words. */
(()=>{
const TOYS=[[0,0,0],[1,1,1],[0,1,2],[1,0,0],[0,0,1],[1,1,2]]; // [colour 0 red 1 blue, size 0 big 1 small, shape 0 circle 1 square 2 triangle]
const KEY={c:0,s:1,k:2},CN=['red','blue'],SN=['big','small'],KN=['circle','square','triangle'];
const HOOPS={c:['Red','Blue'],s:['Big','Small'],k:['Circles','Squares','Triangles']},WHAT={c:'colour',s:'size',k:'shape'};
const ODD=[['c',3],['s',0],['k',4]],GUESS=['s','k','c'];
VIS.reg('flagsort',c=>{let A,pad,quiz,qi=-1,run=0;c.fig.classList.add('young');
const B0=()=>({want:()=>{},won:0,r:0,rule:'c',at:TOYS.map(()=>-1),sel:-1,grab:null,bad:-1,badH:-1,flash:''}),S=B0();
const mode=()=>['c','s','k','odd','guess','quiz'][A.step];
const R=()=>A.reduced(),fs=n=>Math.round(n*(A.narrow?1:1.15));
const speak=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
const name=i=>{const t=TOYS[i];return`${SN[t[1]]} ${CN[t[0]]} ${KN[t[2]]}`};
const home=(i,rule)=>TOYS[i][KEY[rule||S.rule]];
const hoops=()=>HOOPS[S.rule];
function txt(g,t,x,y,n,col){g.font=`800 ${fs(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-16)}
/* layout: pile across the top, hoops along the bottom */
function hoopRects(){const{W,H}=A,n=hoops().length,gap=8,w=(W-20-gap*(n-1))/n,y=H*.44,h=H*.53;return hoops().map((_,k)=>({x:10+k*(w+gap),y,w,h}))}
function unit(){return Math.min(A.W/12,A.H/9.5)}
function spot(i){const u=unit(),{W,H}=A;if(S.grab&&S.grab.i===i&&S.grab.x!=null)return{x:S.grab.x,y:S.grab.y};const h=S.at[i];
 if(h<0){const cols=A.narrow?3:6,row=Math.floor(i/cols),col=i%cols,n=Math.min(cols,6);return{x:W/2+(col-(n-1)/2)*(W/(n+.4)),y:H*.12+row*u*2.15*(A.narrow?1:0)+(A.narrow?0:H*.08)}}
 const rc=hoopRects()[h],mine=TOYS.map((_,j)=>j).filter(j=>S.at[j]===h),k=mine.indexOf(i),per=Math.max(1,Math.floor(rc.w/(u*2.1)));
 return{x:rc.x+(rc.w-(Math.min(per,mine.length)-1)*u*2.05)/2+(k%per)*u*2.05,y:rc.y+u*2.2+Math.floor(k/per)*u*2.05}}
function toy(g,i,p){const t=TOYS[i],C=A.col,u=unit(),r=u*(t[1]?.55:.95),col=t[0]?'#2563eb':'#dc2626',hot=S.bad===i,sel=S.sel===i;
 g.fillStyle=col;g.strokeStyle=hot?C.am:sel?C.vi:C.tx;g.lineWidth=hot||sel?5:2.5;g.beginPath();
 if(t[2]===0)g.arc(p.x,p.y,r,0,7);else if(t[2]===1)A.paint.rrect(p.x-r,p.y-r,r*2,r*2,r*.18);else{g.moveTo(p.x,p.y-r*1.1);g.lineTo(p.x+r*1.1,p.y+r*.85);g.lineTo(p.x-r*1.1,p.y+r*.85);g.closePath()}
 g.fill();g.stroke()}
function drawHoops(g){const C=A.col;hoopRects().forEach((rc,k)=>{const bad=S.badH===k;g.fillStyle=bad?A.alpha(C.rd,.14):A.alpha(C.cy,.12);A.paint.rrect(rc.x,rc.y,rc.w,rc.h,rc.w*.18);g.fill();
 g.strokeStyle=bad?C.rd:C.cy;g.lineWidth=4;A.paint.rrect(rc.x,rc.y,rc.w,rc.h,rc.w*.18);g.stroke();
 const lab=hoops()[k];if(S.rule==='c'){g.fillStyle=k?'#2563eb':'#dc2626';g.beginPath();g.arc(rc.x+18,rc.y+18,9,0,7);g.fill()}txt(g,lab,rc.x+rc.w/2+(S.rule==='c'?8:0),rc.y+18,14)})}
function draw(A){const{ctx:g,W,H,col:C}=A,v=mode();g.fillStyle=A.mix(C.pn,'#ecfeff',C.dark?.04:.45);g.fillRect(0,0,W,H);
 if(v==='quiz'){txt(g,'Look at one thing at a time:',W/2,H*.4,15);txt(g,'colour, size or shape?',W/2,H*.55,15);return}
 drawHoops(g);const order=TOYS.map((_,i)=>i).sort((a,b)=>(S.grab&&S.grab.i===a)-(S.grab&&S.grab.i===b));order.forEach(i=>toy(g,i,spot(i)));
 const left=S.at.filter(h=>h<0).length;txt(g,S.flash||(v==='odd'?'Tap the one in the wrong hoop.':v==='guess'?'How did they sort?':left?`Sort by ${WHAT[S.rule]}.`:'All sorted!'),W/2,H*.4-6,14);A.fx.draw(g)}
const lastN=()=>({c:1,s:1,k:1,odd:3,guess:3}[mode()]||9);
const miss=(t,i,h)=>{A.sound.miss();S.bad=i==null?-1:i;S.badH=h==null?-1:h;speak(t);setTimeout(()=>{S.bad=-1;S.badH=-1;A.redraw()},R()?10:900);A.redraw()};
function setup(){const v=mode();S.sel=-1;S.grab=null;S.flash='';
 if(v==='c'||v==='s'||v==='k'){S.rule=v;S.at=TOYS.map(()=>-1)}
 if(v==='odd'){const[rule,w]=ODD[Math.min(S.r,2)];S.rule=rule;S.at=TOYS.map((_,i)=>home(i,rule));S.at[w]=(home(w,rule)+1)%HOOPS[rule].length}
 if(v==='guess'){const rule=GUESS[Math.min(S.r,2)];S.rule=rule;S.at=TOYS.map((_,i)=>home(i,rule))}}
function win(t){S.won++;S.r++;A.sound.pop();if(S.won<lastN()){setup();speak(t+' Next one.')}else speak(t);buttons();A.redraw();S.want()}
/* why a drop is wrong: name the feature that matters now, and catch a switch back to an old rule */
function drop(i,h){const v=mode();if(!['c','s','k'].includes(v)||S.at[i]>=0)return;const right=home(i);S.sel=-1;
 if(h!==right){const t=TOYS[i],same=TOYS.some((o,j)=>S.at[j]===h&&(o[0]===t[0]||o[2]===t[2]));
  const m=same&&v!=='c'?`It looks like the ones in there, but we sort by ${WHAT[v]} now. It is ${[CN,SN,KN][KEY[v]][t[KEY[v]]]}.`:`Look at the ${WHAT[v]}. That one is ${[CN,SN,KN][KEY[v]][t[KEY[v]]]}.`;return miss(m,i,h)}
 S.at[i]=h;A.sound.tick();if(S.at.every(x=>x>=0))return win(`All sorted by ${WHAT[v]}!`);speak(`Yes, ${name(i)}: ${hoops()[h]}.`);buttons();A.redraw()}
function odd(i){if(mode()!=='odd'||S.won>=3)return;const right=home(i);
 if(S.at[i]===right)return miss(`That one is ${[CN,SN,KN][KEY[S.rule]][TOYS[i][KEY[S.rule]]]}, so it belongs in ${hoops()[right]}. Find another.`,i);
 S.at[i]=right;win(`Yes! The ${name(i)} goes in ${hoops()[right]}.`)}
function guess(g){if(mode()!=='guess'||S.won>=3)return;const rule=S.rule;if(g===rule)return win(`Yes, they sorted by ${WHAT[rule]}. Every hoop has one ${WHAT[rule]}.`);
 const k=hoopRects().findIndex((_,h)=>new Set(TOYS.filter((_,j)=>S.at[j]===h).map(t=>t[KEY[g]])).size>1);
 miss(`Look in ${hoops()[k]}: it has ${[CN,SN,KN][KEY[g]].filter((_,x)=>TOYS.some((t,j)=>S.at[j]===k&&t[KEY[g]]===x)).join(' and ')} ones. So it is not ${WHAT[g]}.`,null,k)}
function pickNext(){const left=TOYS.map((_,i)=>i).filter(i=>S.at[i]<0);if(!left.length)return;const n=left[(left.indexOf(S.sel)+1)%left.length];S.sel=n;A.sound.tick();speak(`Picked: ${name(n)}.`);A.redraw()}
function into(h){if(S.sel<0)pickNext();if(S.sel>=0)drop(S.sel,h)}
function buttons(){if(!pad)return;pad.innerHTML='';const v=mode(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=fn};
 if(v==='quiz'||S.won>=lastN())return;
 if(['c','s','k'].includes(v)){B('Pick a toy ▶',pickNext,'Pick the next toy');hoops().forEach((h,k)=>B('Into '+h,()=>into(k),`Put the picked toy in the ${h} hoop`))}
 if(v==='odd')TOYS.forEach((_,i)=>B(name(i),()=>odd(i),`The ${name(i)} is in the wrong hoop`));
 if(v==='guess')['c','s','k'].forEach(r=>B({c:'Colour 🎨',s:'Size 📏',k:'Shape 🔷'}[r],()=>guess(r),`They sorted by ${WHAT[r]}`))}
function hitToy(p){const u=unit();for(let i=TOYS.length-1;i>=0;i--){const q=spot(i);if(Math.hypot(p.x-q.x,p.y-q.y)<u*1.1)return i}return -1}
const hitHoop=p=>hoopRects().findIndex(r=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h);
function down(p){const v=mode(),i=hitToy(p);if(v==='odd'){if(i>=0)odd(i);return false}if(!['c','s','k'].includes(v))return false;
 if(i>=0&&S.at[i]<0){S.grab={i,x:null,y:null,x0:p.x,y0:p.y};return true}const h=hitHoop(p);if(h>=0&&S.sel>=0)drop(S.sel,h);return false}
function move(p){if(!S.grab)return;if(S.grab.x!=null||Math.hypot(p.x-S.grab.x0,p.y-S.grab.y0)>8){S.grab.x=p.x;S.grab.y=p.y;A.redraw()}}
function up(p){const g=S.grab;S.grab=null;if(!g)return;if(g.x==null){S.sel=g.i;A.sound.tick();speak(`Picked: ${name(g.i)}. Now tap a hoop.`);return A.redraw()}const h=hitHoop(p);if(h>=0)drop(g.i,h);A.redraw()}
const chk=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list,gap){const k=++run;list.forEach((fn,j)=>setTimeout(()=>{if(k===run)fn()},R()?j*40+30:(j+1)*(gap||260)))}
const fresh=()=>{run++;Object.assign(S,B0());if(A)setup()};
const sortAll=()=>TOYS.map((_,i)=>()=>drop(i,home(i)));
const steps=[
{h:'Sort by colour',p:'Drag each toy into its hoop. Or tap a toy, then tap a hoop. Red ones go in Red. Blue ones go in Blue.',task:'Sort all 6 toys by colour',
 show:()=>{steps[0].go();play(sortAll(),240)},go:()=>{fresh();speak('Sort by colour. Red or blue?');buttons();S.want=chk(0,()=>S.won>=1,'Each hoop has one colour.')}},
{h:'Sort a new way',p:'Same toys. Now sort them by size: big or small.',predict:{q:'Can the same toys be sorted a new way?',opts:['No, only by colour','Yes, by size too'],ans:1},task:'Sort all 6 by size',
 show:()=>{steps[1].go();play(sortAll(),240)},go:()=>{fresh();speak('Sort by size. Big or small?');buttons();S.want=chk(1,()=>S.won>=1,'Same toys, new rule, new groups.')}},
{h:'Sort by shape',p:'Now look at the shape. Circles, squares or triangles?',predict:{q:'A big red circle and a small blue circle. Same hoop?',opts:['No, they look too different','Yes, both are circles'],ans:1},task:'Sort all 6 by shape',
 show:()=>{steps[2].go();play(sortAll(),240)},go:()=>{fresh();speak('Sort by shape.');buttons();S.want=chk(2,()=>S.won>=1,'Colour and size do not matter now. Only shape.')}},
{h:'Oops! Which one?',p:'Someone sorted the toys. One toy is in the wrong hoop. Tap it to move it.',task:'Fix 3 mix-ups',
 show:()=>{steps[3].go();play(ODD.map(([,w])=>()=>odd(w)),500)},go:()=>{fresh();speak('Which toy is in the wrong hoop?');buttons();S.want=chk(3,()=>S.won>=3,'Check each toy with the rule.')}},
{h:'Guess my rule',p:'A friend sorted the toys. Look in each hoop. What is the same?',task:'Guess 3 rules',
 show:()=>{steps[4].go();play(GUESS.map(r=>()=>guess(r)),500)},go:()=>{fresh();speak('How did they sort? Colour, size or shape?');buttons();S.want=chk(4,()=>S.won>=3,'Same in each hoop tells you the rule.')}},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['A red ball, a red car and a blue ball. We sort by colour. Which go together?',[['The red ball and the red car','ok'],['The red ball and the blue ball','kind'],['All three','all']]],
 ['We sort by size. Where does a little blue cup go?',[['With the small things','ok'],['With the blue things','colour'],['With the big things','size']]],
 ['Mia put 🍎 and 🍓 in one hoop, and 🍌 and 🌽 in the other. What was her rule?',[['Colour','ok'],['Size','notsize'],['No rule','norule']]],
 ['This hoop is for circles. Which one goes in?',[['A small green circle','ok'],['A small green square','colour2'],['A big green triangle','big']]],
 ['Can you sort the same toys a new way?',[['Yes, with a new rule','ok'],['No, never','once'],['Only if you get new toys','new']]]];
function why(t){let m='Pick one thing to look at, then check each toy.';
 if(t==='kind')m='Both balls, yes, but the rule is colour. Red goes with red.';
 if(t==='all')m='The blue ball is not red. It goes in a different hoop.';
 if(t==='colour')m='The rule is size, not colour. A little cup goes with small things.';
 if(t==='size')m='Look at its size: it is little, so it goes with the small things.';
 if(t==='notsize')m='The apple and the strawberry are both red. That is colour.';
 if(t==='norule')m='Look again: red in one hoop, yellow in the other. The rule is colour.';
 if(t==='colour2')m='Green is not the rule here. A square is not a circle.';
 if(t==='big')m='A triangle is not a circle, big or small.';
 if(t==='once')m='The same toys can go by colour, then size, then shape.';
 if(t==='new')m='No new toys needed. Just pick a new rule.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});speak('Challenge: '+q);A.redraw()}
let streak=0;
function judge(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! Good sorting.':'✗ '+why(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});buttons()}});
A.start()})})();
