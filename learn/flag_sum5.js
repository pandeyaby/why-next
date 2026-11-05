/* Flagship: fluent adding and subtracting within 5 (ages 5–6; CCSS K.OA.5 "fluently add and subtract within 5";
   NC Y1 related facts within 10). Instant recall of all facts with totals or starts of 0–5 — not finger-counting every time.
   Flash dots to subitise a sum, strip a five-frame, hide-and-say a take-away, beat the slow finger-count, build every
   partner for a number, then a challenge that traps counting-on, swapping the sign, and adding the same number twice. */
(()=>{
VIS.reg('flagsum5',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['flash','frame','hide','race','build','mix','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function dots(g,n,cx,cy,r,col){const pos=[[0,-.7],[-.65,.35],[.65,.35],[-.65,-.35],[.65,-.35],[0,.15]];
 for(let i=0;i<n;i++){const[dx,dy]=pos[i]||[0,0];g.beginPath();g.arc(cx+dx*r,cy+dy*r,r*.28,0,7);g.fillStyle=col;g.fill();g.strokeStyle=A.col.tx;g.lineWidth=1.5;g.stroke()}}
function fiveFrame(g,x,y,w,h,filled){g.strokeStyle=A.col.tx;g.lineWidth=2;g.strokeRect(x,y,w,h);const cw=w/5;
 for(let i=1;i<5;i++){g.beginPath();g.moveTo(x+i*cw,y);g.lineTo(x+i*cw,y+h);g.stroke()}
 for(let i=0;i<5;i++){if(i<filled){g.beginPath();g.arc(x+cw*(i+.5),y+h/2,Math.min(cw,h)*.28,0,7);g.fillStyle=A.col.ac;g.fill();g.strokeStyle=A.col.tx;g.lineWidth=1.5;g.stroke()}}}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.08:.4);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Facts within 5 — answer straight away',W/2,H*.32,A.narrow?15:18,{w:900});T('No slow finger counting.',W/2,H*.5,A.narrow?13:16,{c:C.mu});A.fx.draw(g);return}
 if(k==='flash'){T(S.show?`${S.a} + ${S.b} = ${S.a+S.b}`:`How many in all?`,W/2,H*.1,A.narrow?16:19,{w:800});
  if(S.flash){dots(g,S.a,W*.28,H*.5,Math.min(W,H)*.16,C.vi);T('+',W/2,H*.5,28,{w:900});dots(g,S.b,W*.72,H*.5,Math.min(W,H)*.16,C.or)}
  else T('Tap Flash to see the dots. Then say the total.',W/2,H*.55,A.narrow?13:15,{c:C.mu})}
 if(k==='frame'){T(`Five-frame: ${S.filled} in, ${5-S.filled} empty`,W/2,H*.1,A.narrow?15:18,{w:800});
  fiveFrame(g,W*.1,H*.35,W*.8,H*.28,S.filled);T('Tap + or −, or drag along the frame.',W/2,H*.85,A.narrow?12:14,{c:C.mu})}
 if(k==='hide'){T(`${S.whole} bears. ${S.shown} show. How many hide?`,W/2,H*.1,A.narrow?14:17,{w:800});
  const u=Math.min(W,H)*.09;for(let i=0;i<S.whole;i++){const x=W*.15+i*(W*.7/(S.whole||1)),y=H*.5;
   g.beginPath();g.arc(x,y,u,0,7);g.fillStyle=i<S.shown?C.ac:A.alpha(C.tx,.15);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();
   if(i>=S.shown){g.fillStyle=C.mu;g.fillRect(x-u*.6,y-u*.6,u*1.2,u*1.2)}}
  T(S.guess!=null?`You said ${S.guess}`:'Tap a number for the hidden bears',W/2,H*.85,A.narrow?13:15,{c:C.mu})}
 if(k==='race'){T(`${S.a} ${S.op} ${S.b} = ?`,W/2,H*.18,A.narrow?22:28,{w:900});
  T(S.raced?'Time! Fingers would still be counting.':'Beat the slow finger count.',W/2,H*.4,A.narrow?13:15,{c:C.mu});
  if(S.fingers){for(let i=0;i<5;i++){const on=i<S.fingers;g.beginPath();g.arc(W*.2+i*W*.15,H*.65,Math.min(W,H)*.05,0,7);g.fillStyle=on?C.or:A.alpha(C.tx,.12);g.fill();g.strokeStyle=C.tx;g.lineWidth=1.5;g.stroke()}}}
 if(k==='build'){T(`Every way to make ${S.target}`,W/2,H*.1,A.narrow?16:19,{w:800});
  T(`Found: ${(S.found||[]).map(([a,b])=>a+'+'+b).join(', ')||'none yet'}`,W/2,H*.28,A.narrow?13:15,{c:C.mu});
  T(`Pick first number: ${S.pick==null?'—':S.pick}`,W/2,H*.5,A.narrow?14:16);
  T(`Need ${(S.found||[]).length} of ${S.need} pairs`,W/2,H*.7,A.narrow?13:15,{c:C.mu})}
 if(k==='mix'){T(`Tap the fact that equals ${S.target}`,W/2,H*.12,A.narrow?15:18,{w:800});
  (S.opts||[]).forEach((t,i)=>{const x=W*.2+i*W*.3,y=H*.5;g.fillStyle=S.picked===i?A.alpha(C.ac,.35):A.alpha(C.tx,.08);g.fillRect(x-W*.12,y-H*.1,W*.24,H*.2);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(x-W*.12,y-H*.1,W*.24,H*.2);T(t,x,y,A.narrow?16:20,{w:800})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{filled:3,whole:5,shown:2,guess:null,a:2,b:3,op:'+',flash:0,show:0,raced:0,fingers:0,target:4,found:[],pick:null,need:5,opts:[],picked:null,lock:0,check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*320))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='flash'){btn('Flash dots',()=>{S.flash=1;S.show=0;A.sound.tick();say(`Dots: ${S.a} and ${S.b}. How many in all?`);A.redraw();setTimeout(()=>{if(A.step===0){S.show=1;say(`${S.a} + ${S.b} = ${S.a+S.b}`);A.redraw();S.check()}},A.reduced()?40:700)},'Flash the two groups of dots');
  btn('New sum',()=>{const pairs=[[1,1],[1,2],[2,2],[1,3],[2,3],[1,4],[0,5],[3,2]];const p=pairs[(S.a+S.b+1)%pairs.length];S.a=p[0];S.b=p[1];S.flash=0;S.show=0;say('New sum ready. Flash the dots.');A.redraw()},'Pick a new sum within 5')}
 if(kind()==='frame'){btn('+ one',()=>{if(S.filled<5){S.filled++;A.sound.tick();say(S.filled+' in the five-frame.');A.redraw();S.check()}},'Add one counter');
  btn('− one',()=>{if(S.filled>0){S.filled--;A.sound.tick();say(S.filled+' in the five-frame.');A.redraw();S.check()}},'Take one counter away');
  btn('Empty',()=>{S.filled=0;say('Empty five-frame.');A.redraw();S.check()},'Clear the five-frame')}
 if(kind()==='hide'){[0,1,2,3,4,5].forEach(n=>btn(String(n),()=>{S.guess=n;A.sound.tick();say('You said '+n+' hide.');A.redraw();S.check()},'Say '+n+' bears hide'))}
 if(kind()==='race'){const ans=S.op==='+'?S.a+S.b:S.a-S.b;[0,1,2,3,4,5].filter(n=>n===ans||Math.abs(n-ans)<=2).slice(0,4).forEach(n=>btn(String(n),()=>{S.raced=1;S.ans=n;A.sound.tick();say('You answered '+n+'.');A.redraw();S.check()},'Answer '+n));
  btn('Start race',()=>{S.fingers=0;S.raced=0;S.ans=null;say('Ready? Answer before the fingers count up.');A.redraw();const r=run;const tick=()=>{if(r!==run||S.raced)return;if(S.fingers<5){S.fingers++;A.redraw();setTimeout(tick,A.reduced()?30:380)}else say('Fingers finished. Try to beat them next time.')};setTimeout(tick,A.reduced()?20:450)},'Start the slow finger count')}
 if(kind()==='build'){[0,1,2,3,4,5].filter(n=>n<=S.target).forEach(n=>btn(String(n),()=>{
  if(S.pick==null){S.pick=n;say('First number '+n+'. Now the partner that makes '+S.target+'.');A.redraw()}
  else{const a=S.pick,b=n;S.pick=null;if(a+b===S.target){const key=a+','+b;if(!S.found.some(([x,y])=>x===a&&y===b)){S.found.push([a,b]);A.sound.pop();say(a+' + '+b+' = '+S.target)}else say('You already have that pair.')}
  else{A.sound.miss();say(a+' + '+b+' is '+(a+b)+', not '+S.target)}A.redraw();S.check()}},'Choose '+n))}
 if(kind()==='mix'){(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();say('You picked '+t);A.redraw();S.check()},'Pick '+t))}
}
function down(p){if(kind()==='chal')return false;S.drag=1;S.dx0=p.x;return true}
function move(p){if(!S.drag)return;if(kind()==='frame'){const nw=Math.max(0,Math.min(5,Math.round((p.x-A.W*.1)/(A.W*.8)*5)));if(nw!==S.filled){S.filled=nw;A.redraw();S.check()}}
 if(kind()==='mix'){const i=Math.floor((p.x-A.W*.05)/(A.W*.3));if(i>=0&&i<(S.opts||[]).length){S.picked=i;A.redraw()}}}
function up(){if(kind()==='mix'&&S.picked!=null)S.check();S.drag=0}
const steps=[
{h:'Flash and add',p:'Two groups flash. See how many in all without counting one by one. That is subitising — knowing a small number at a glance.',
 predict:{q:'You see 2 dots and 3 dots. The total is…',opts:['5','23','1'],ans:0},
 task:'Flash a sum and see the total within 5',show:()=>auto(0,[()=>{S.flash=1;A.redraw()},()=>{S.show=1;A.redraw();S.check()}]),
 go:()=>{reset({a:2,b:3});say('Flash the dots, then check the total.');controls();S.check=finish(0,()=>S.show&&S.a+S.b<=5,'You saw the total without counting every dot.')}},
{h:'Five-frame',p:'A five-frame has five spaces. Fill some. The empty spaces show 5 take away the filled ones.',
 predict:{q:'3 spaces are full. How many are empty?',opts:['2','3','5'],ans:0},
 task:'Make the five-frame show exactly 4 counters',show:()=>auto(1,[()=>{S.filled=4;A.redraw();S.check()}]),
 go:()=>{reset({filled:1});say('Put exactly 4 counters in the five-frame.');controls();S.check=finish(1,()=>S.filled===4,'4 full and 1 empty: 4 + 1 = 5.')}},
{h:'Hide and say',p:'5 bears. Some hide under a cup. How many hide? Use 5 take away the ones you can see.',
 predict:{q:'5 bears, 2 show. How many hide?',opts:['3','2','7'],ans:0},
 task:'Find how many bears hide when 2 of 5 show',show:()=>auto(2,[()=>{S.guess=3;A.redraw();S.check()}]),
 go:()=>{reset({whole:5,shown:2,guess:null});say('2 bears show. How many hide?');controls();S.check=finish(2,()=>S.guess===3,'5 − 2 = 3. The hidden part is 3.')}},
{h:'Beat the fingers',p:'Fluent means you know 2 + 3 = 5 straight away. Race the slow finger count.',
 predict:{q:'Which is fluent?',opts:['saying 4 straight away for 1 + 3','counting 1, 2, 3, 4 on fingers every time','guessing any number'],ans:0},
 task:'Answer 3 + 2 before the finger count finishes',show:()=>auto(3,[()=>{S.ans=5;S.raced=1;A.redraw();S.check()}]),
 go:()=>{reset({a:3,b:2,op:'+',ans:null,raced:0,fingers:0});say('Start the race, then tap 5.');controls();S.check=finish(3,()=>S.ans===5,'3 + 2 = 5. That is a fluent fact within 5.')}},
{h:'Build every pair',p:'Every way to make 4: 0+4, 1+3, 2+2, 3+1, 4+0. Find each pair.',
 task:'Find all 5 pairs that add to 4',show:()=>auto(4,[()=>{S.found=[[0,4],[1,3],[2,2],[3,1],[4,0]];A.redraw();S.check()}]),
 go:()=>{reset({target:4,found:[],need:5,pick:null});say('Find every pair that makes 4.');controls();S.check=finish(4,()=>S.found.length>=5,'All five pairs for 4. Order matters as separate facts when you build fluency.')}},
{h:'Pick the fact',p:'Which sum or take-away equals the target? Watch the signs.',
 predict:{q:'Which equals 5?',opts:['2 + 3','5 − 5','2 + 2'],ans:0},
 task:'Pick the fact that equals 5',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({target:5,opts:['2 + 3','5 − 5','1 + 1'],picked:null});say('Tap the fact that equals 5.');controls();S.check=finish(5,()=>S.picked===0,'2 + 3 = 5. 5 − 5 = 0 and 1 + 1 = 2.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['2 + 3 =',[['5','ok'],['23','stick'],['1','sub']]],
 ['5 − 2 =',[['3','ok'],['7','add'],['2','echo']]],
 ['1 + 4 =',[['5','ok'],['14','stick'],['3','sub']]],
 ['4 − 0 =',[['4','ok'],['0','zero'],['5','five']]],
 ['Fluent within 5 means…',[['knowing the answer straight away','ok'],['always counting on fingers','fingers'],['only adding, never taking away','onlyadd']]],
 ['3 + 3 =',[['6, which is past 5','ok'],['5','force'],['33','stick']]],
 ['0 + 5 =',[['5','ok'],['0','zero'],['50','stick']]]];
function why(t){let m='Stay inside 0 to 5 and check the sign.';
 if(t==='stick')m='Do not stick the digits together. 2 + 3 is five, not twenty-three.';
 if(t==='sub')m='That was subtracting or finding a difference. For 2 + 3, add the two parts.';
 if(t==='add')m='You added instead of taking away. 5 − 2 means start at 5 and remove 2.';
 if(t==='echo')m='You repeated a number you saw. The hidden or missing part is what is left.';
 if(t==='zero')m='Taking away 0 leaves the same number. Adding 0 leaves the same number too.';
 if(t==='five')m='4 − 0 is still 4. You do not jump to 5 unless you add 1.';
 if(t==='fingers')m='Fingers help when you are learning, but fluent means you know the fact without counting every time.';
 if(t==='onlyadd')m='Within 5 includes take-aways too: 5 − 2, 4 − 1, and so on.';
 if(t==='force')m='3 + 3 = 6. That total is past 5, so it is not a within-5 fact.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+2)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Sum controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:p=>move(p),up:up});controls()}});
A.start()})})();
