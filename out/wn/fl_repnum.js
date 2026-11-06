/* Flagship: representing numbers with objects (ages 4–6; EYFS/Y1 number: cardinality & representation).
   Build a shown numeral with counters, match equal collections, reject digit-shape-as-count and "extra for luck",
   then a challenge on those slips. Distinct from one-to-one counting procedure (flagcount). */
(()=>{
VIS.reg('flagrepnum',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['build','match','same','fix','digit','fix2','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#ecfeff',C.dark?.08:.35);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Show a number with objects',W/2,H*.32,A.narrow?14:17,{w:900});T('The count of objects is the number',W/2,H*.52,A.narrow?12:15,{c:C.mu});A.fx.draw(g);return}
 if(k==='build'){T('Make this number with counters',W/2,H*.08,A.narrow?14:17,{w:800});T(String(S.want||0),W/2,H*.28,48,{w:900});
  for(let i=0;i<(S.n||0);i++){const x=W*(.15+(i%5)*.15),y=H*(.48+Math.floor(i/5)*.18);g.fillStyle=A.alpha(C.ac,.45);g.beginPath();g.arc(x,y,Math.min(W,H)*.045,0,7);g.fill();T('●',x,y,18)}
  T(`${S.n||0} counters — need ${S.want}`,W/2,H*.9,A.narrow?12:14,{c:C.mu})}
 if(k==='match'){T('Which tray shows '+S.want+'?',W/2,H*.08,A.narrow?14:17,{w:800});
  (S.trays||[]).forEach((t,i)=>{const x=W*(.18+i*.32);g.fillStyle=S.picked===i?A.alpha(C.ac,.35):A.alpha(C.tx,.08);g.fillRect(x-W*.12,H*.28,W*.24,H*.42);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(x-W*.12,H*.28,W*.24,H*.42);
   for(let j=0;j<t;j++)T('⬤',x-W*.06+(j%2)*W*.08,H*.4+Math.floor(j/2)*H*.1,16);T(S.picked===i?'picked':'tray '+(i+1),x,H*.78,11,{c:C.mu})})}
 if(k==='same'){T('Do these show the same number?',W/2,H*.08,A.narrow?13:16,{w:800});
  T('🍎'.repeat(S.left||0),W*.28,H*.4,22);T('🚗'.repeat(S.right||0),W*.72,H*.4,22);T(S.left+' apples',W*.28,H*.58,13,{c:C.mu});T(S.right+' cars',W*.72,H*.58,13,{c:C.mu});
  T(S.ans==null?'Tap Same number or Different':(S.ans?'Same':'Different'),W/2,H*.82,A.narrow?13:15,{c:C.mu})}
 if(k==='fix'){T('Fix the tray so it shows '+S.want,W/2,H*.1,A.narrow?14:17,{w:800});
  for(let i=0;i<(S.n||0);i++)T('🔵',W*(.2+(i%4)*.2),H*(.4+Math.floor(i/4)*.2),26);T(`${S.n} on tray — need ${S.want}`,W/2,H*.85,13,{c:C.mu})}
 if(k==='digit'){T('The digit is a symbol, not a pile',W/2,H*.1,A.narrow?13:16,{w:800});
  T(String(S.want),W*.3,H*.45,56,{w:900});T('⬤'.repeat(S.n||0),W*.7,H*.45,22);T('digit '+S.want,W*.3,H*.7,12,{c:C.mu});T(S.n+' objects',W*.7,H*.7,12,{c:C.mu});
  T(S.ok?'Yes — digit matches the count':'Make objects equal the digit',W/2,H*.88,A.narrow?12:14,{c:C.mu})}
 if(k==='fix2'){T('Tap the true idea',W/2,H*.1,A.narrow?15:18,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.3+i*.18);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.06,y-H*.07,W*.88,H*.14);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.06,y-H*.07,W*.88,H*.14);T(t,W/2,y,A.narrow?12:14,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{n:0,want:4,picked:null,left:0,right:0,ans:null,ok:0,trays:[],opts:[],check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*280))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function add(){if(S.n>=10)return;S.n++;A.sound.tick();say(S.n+' counters.');A.redraw();S.check()}
function rem(){if(S.n<=0)return;S.n--;A.sound.tick();say(S.n+' counters.');A.redraw();S.check()}
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='build'||kind()==='fix'||kind()==='digit'){btn('+ Add counter',add,'Add one counter');btn('− Take away',rem,'Remove one counter')}
 if(kind()==='match')(S.trays||[]).forEach((t,i)=>btn('Tray '+(i+1)+' ('+t+')',()=>{S.picked=i;A.sound.tick();say('Tray '+(i+1));A.redraw();S.check()},'Pick tray '+(i+1)));
 if(kind()==='same'){btn('Same number',()=>{S.ans=1;A.sound.tick();say('Same number');A.redraw();S.check()},'Same number');btn('Different',()=>{S.ans=0;A.sound.tick();say('Different');A.redraw();S.check()},'Different')}
 if(kind()==='fix2')(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();say(t);A.redraw();S.check()},'Pick: '+t))}
function down(p){if(kind()==='chal')return false;S.drag=1;
 if(kind()==='build'||kind()==='fix'||kind()==='digit'){if(p.x>A.W/2)add();else rem();return true}
 if(kind()==='match'){const i=Math.min(2,Math.max(0,Math.floor((p.x/A.W)*3)));S.picked=i;A.redraw();S.check();return true}
 if(kind()==='same'){S.ans=p.x<A.W/2?1:0;A.redraw();S.check();return true}
 return true}
function move(){}
function up(){S.drag=0}
const steps=[
{h:'Build the number',p:'A numeral stands for a count. Place that many counters to represent it (cardinality).',
 predict:{q:'To show 4, how many counters?',opts:['4 counters','1 counter shaped like 4','as many as you like'],ans:0},
 task:'Place exactly 4 counters',show:()=>auto(0,[()=>{S.n=4;A.redraw();S.check()}]),
 go:()=>{reset({want:4,n:0});say('Add counters until you have 4.');controls();S.check=finish(0,()=>S.n===4,'4 counters represent the numeral 4.')}},
{h:'Match the trays',p:'Two collections represent the same number when they have the same count — even if the objects look different.',
 predict:{q:'Which tray shows 3?',opts:['the tray with 3 counters','the emptiest tray','the tray with the biggest toys'],ans:0},
 task:'Pick the tray with 3',show:()=>auto(1,[()=>{S.picked=1;A.redraw();S.check()}]),
 go:()=>{reset({want:3,trays:[2,3,5],picked:null});say('Pick the tray that shows 3.');controls();S.check=finish(1,()=>S.picked===1,'The middle tray has 3 — that represents 3.')}},
{h:'Same number?',p:'Apples and cars can show the same number if the counts match. Kind of object does not change the number.',
 predict:{q:'3 apples and 3 cars…',opts:['show the same number','show different numbers because apples are food','cannot be numbers'],ans:0},
 task:'Decide if the two sides show the same number',show:()=>auto(2,[()=>{S.ans=1;A.redraw();S.check()}]),
 go:()=>{reset({left:3,right:3,ans:null});say('Same number or different?');controls();S.check=finish(2,()=>S.ans===1,'Both sides have 3, so they represent the same number.')}},
{h:'Fix the tray',p:'If a tray has too many or too few, add or take away until the count matches the numeral.',
 predict:{q:'Tray has 5; numeral is 3. What do you do?',opts:['take 2 away','add 3 more','draw a bigger 3'],ans:0},
 task:'Change the tray to show 3',show:()=>auto(3,[()=>{S.n=3;A.redraw();S.check()}]),
 go:()=>{reset({want:3,n:5});say('Take counters away until 3 remain.');controls();S.check=finish(3,()=>S.n===3,'Now the tray represents 3.')}},
{h:'Digit vs pile',p:'The written digit is a symbol. The representation is the count of objects — not the curves in the digit.',
 predict:{q:'The digit 8 looks curly. How many objects for 8?',opts:['8 objects','2 objects because of 2 loops','as many loops as you see'],ans:0},
 task:'Make the object count equal 5',show:()=>auto(4,[()=>{S.n=5;S.ok=1;A.redraw();S.check()}]),
 go:()=>{reset({want:5,n:2,ok:0});say('Add until you have 5 objects.');controls();S.check=finish(4,()=>{S.ok=S.n===5?1:0;return S.n===5},'5 objects represent 5. The digit shape is only a symbol.')}},
{h:'True idea',p:'Pick the sentence that matches representation.',
 predict:{q:'Representing 6 means…',opts:['showing 6 objects','writing a fancy 6 only','adding extras for luck'],ans:0},
 task:'Tap the true sentence',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['Show 6 objects for the numeral 6','More objects are always better','Match by toy colour, not count'],picked:null});say('Tap the true idea.');controls();S.check=finish(5,()=>S.picked===0,'Representation means the object count matches the numeral.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['To show 4, use…',[['4 objects','ok'],['1 object shaped like 4','shape'],['extra objects for luck','luck']]],
 ['3 apples and 3 cars…',[['show the same number','ok'],['cannot match because they differ','kind'],['show 6 because you add them','add']]],
 ['A digit is…',[['a symbol for a count','ok'],['a pile of loops to count','loops'],['always larger when curlier','curl']]],
 ['Tray has 6; numeral is 4. You…',[['take 2 away','ok'],['add 4 more','more'],['ignore the numeral','ignore']]],
 ['Same number means…',[['same count of objects','ok'],['same colour toys','colour'],['same size toys','size']]],
 ['Representing 2 with counters…',[['place exactly 2','ok'],['place 20 to be safe','safe'],['place none and say two','none']]],
 ['Why match counts?',[['so the numeral and objects agree','ok'],['so the tray looks full','full'],['so toys stay pretty','pretty']]]];
function why(t){let m='Match the object count to the numeral.';
 if(t==='shape'||t==='loops'||t==='curl')m='The digit is a written symbol. Count objects — do not count loops in the digit.';
 if(t==='luck'||t==='safe'||t==='more')m='Extra objects change the number. Use exactly as many as the numeral says.';
 if(t==='kind'||t==='colour'||t==='size')m='Kind, colour and size do not change how many. The count is what matters.';
 if(t==='add')m='Do not add the two groups unless the question asks for a total. Here each side already shows 3.';
 if(t==='ignore'||t==='none'||t==='full'||t==='pretty')m='Change the tray until the count equals the numeral.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Representation controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:p=>move(p),up:up});controls()}});
A.start()})})();
