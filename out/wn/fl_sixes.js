/* Flagship: counting in 6s (topic "Counting in 6s"; ages 8-9; NC Year 4 number and place value "count in multiples of
   6, 7, 9, 25 and 1000" and Year 4 "recall multiplication facts up to 12 x 12"). Egg boxes of 6 build the count, gaps in a
   6s sequence are filled, the ones digits trace a 6-2-8-4-0 star on a digit wheel, pairs of 3s join into 6s, and one box
   off 6 x 10 gives 6 x 9. Every tap or drag has a button twin. */
(()=>{
VIS.reg('flagsixes',c=>{let A,ctl,chal,qi=-1,run=0;const S={};
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['boxes','gaps','wheel','threes','ten','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
// egg-box slots: 2 rows of 6 on the tray
function slot(i){const W=A.W,cols=A.narrow?4:6,rows=Math.ceil(S.max/cols),gap=W*.025,w=(W-gap*(cols+1))/cols,h=Math.min(w*.72,A.H*.66/rows-28);return{x:gap+(i%cols)*(w+gap),y:A.H*.17+Math.floor(i/cols)*(h+28),w,h}}
function eggBox(i,ghost){const g=A.ctx,C=A.col,b=slot(i);A.paint.rrect(b.x,b.y,b.w,b.h,8);g.fillStyle=ghost?A.alpha(C.tx,.04):A.mix(C.pn,'#a16207',C.dark?.35:.25);g.fill();g.strokeStyle=ghost?A.alpha(C.tx,.3):C.tx;g.lineWidth=ghost?1:2;g.setLineDash(ghost?[5,4]:[]);g.stroke();g.setLineDash([]);
 if(ghost)return;const r=Math.min(b.w/8,b.h/5);for(let e=0;e<6;e++){const ex=b.x+b.w*(e%3+.5)/3,ey=b.y+b.h*(Math.floor(e/3)+.5)/2;g.beginPath();g.ellipse(ex,ey,r,r*1.2,0,0,7);g.fillStyle='#fef3c7';g.fill();g.strokeStyle='#78350f';g.lineWidth=1.2;g.stroke()}
 T(String(6*(i+1)),b.x+b.w/2,b.y+b.h+13,A.narrow?12:14,{w:900,c:C.tx})}
function trayDraw(){const n=S.n;for(let i=0;i<S.max;i++)eggBox(i,i>=n);
 T(n?`${n} box${n>1?'es':''} of 6 = ${6*n} eggs`:'Tap the tray to add a box of 6',A.W/2,A.H*.08,A.narrow?15:18,{w:900});
 if(n)T(Array.from({length:n},(_,i)=>6*(i+1)).join(', '),A.W/2,A.H*.92,A.narrow?12:15,{c:A.col.mu,w:700})}
function setBoxes(n,why){if(n<0||n>S.max){A.sound.miss();say(n<0?'The tray is empty.':`The tray holds ${S.max} boxes.`);return}
 S.n=n;S.touched=1;A.sound.tick();say(why||`${n} box${n===1?'':'es'} of 6: ${6*n} eggs.`);A.redraw();controls();S.check()}
// the sequence with gaps
const SEQ=Array.from({length:10},(_,i)=>6*(i+1));
function cellAt(i){const w=(A.W-16)/5,h=A.H*.17;return{x:8+(i%5)*w,y:A.H*.14+Math.floor(i/5)*(h+12),w:w-6,h}}
function tileAt(i){const n=S.tiles.length,w=Math.min(90,(A.W-16)/n-8),h=A.H*.13;return{x:(A.W-(n*(w+8)-8))/2+i*(w+8),y:A.H*.7,w,h}}
function gapsDraw(){const g=A.ctx,C=A.col,act=S.gaps.find(i=>!S.fill[i]);
 T('Fill each gap in the 6s count',A.W/2,A.H*.06,A.narrow?14:17,{w:900});
 SEQ.forEach((v,i)=>{const b=cellAt(i),hole=S.gaps.includes(i),got=S.fill[i];A.paint.rrect(b.x,b.y,b.w,b.h,10);g.fillStyle=hole?(got?A.alpha(C.gr,.22):A.alpha(C.or,i===act?.25:.1)):A.alpha(C.ac,.1);g.fill();g.strokeStyle=i===act?C.tx:A.alpha(C.tx,.4);g.lineWidth=i===act?3:1.5;g.stroke();
  T(hole&&!got?'?':String(v),b.x+b.w/2,b.y+b.h/2,A.narrow?18:24,{w:900})});
 S.tiles.forEach((t,i)=>{if(S.used.includes(t))return;const b=tileAt(i);A.paint.rrect(b.x,b.y,b.w,b.h,10);g.fillStyle=t===S.wrong?A.alpha(C.rd,.2):A.alpha(C.vi,.14);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();T(String(t),b.x+b.w/2,b.y+b.h/2,A.narrow?17:21,{w:900})})}
function place(t){const i=S.gaps.find(j=>!S.fill[j]);if(i==null)return;const want=SEQ[i],prev=SEQ[i-1]||0;
 if(t!==want){A.sound.miss();S.wrong=t;say(t%6?`${t} is not in the 6s count: ${prev} + 6 = ${want}.`:`${t} is a multiple of 6, but this gap comes after ${prev}, so it is ${prev} + 6 = ${want}.`);A.redraw();return}
 S.fill[i]=1;S.used.push(t);S.wrong=0;A.sound.pop();say(`Yes: ${prev} + 6 = ${want}.`);A.redraw();controls();S.check()}
// the ones-digit wheel
function digitPos(d){const R=Math.min(A.W*.3,A.H*.32),a=-Math.PI/2+d*Math.PI/5;return[A.W*.4,A.H*.55].map((m,i)=>m+R*(i?Math.sin(a):Math.cos(a)))}
function wheelDraw(){const g=A.ctx,C=A.col,list=Array.from({length:S.k},(_,i)=>6*(i+1));
 T(S.k<10?`Tap the ones digit of ${6*(S.k+1)}`:'The ones digits repeat: 6, 2, 8, 4, 0',A.W/2,A.H*.07,A.narrow?14:17,{w:900});
 g.strokeStyle=C.ac;g.lineWidth=3;g.beginPath();list.forEach((v,i)=>{const[x,y]=digitPos(v%10);i?g.lineTo(x,y):g.moveTo(x,y)});g.stroke();
 for(let d=0;d<10;d++){const[x,y]=digitPos(d),hit=list.some(v=>v%10===d),r=Math.min(A.W,A.H)*.055;g.beginPath();g.arc(x,y,r,0,7);g.fillStyle=hit?C.ac:d===S.bad?A.alpha(C.rd,.25):C.pn;g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();T(String(d),x,y,A.narrow?15:19,{w:900,c:hit?C.pn:C.tx})}
 const lx=A.W*.82;list.forEach((v,i)=>T(`${v}`,lx,A.H*.17+i*A.H*.078,A.narrow?12:15,{al:'left',c:C.tx,w:800}))}
function onesTap(d){if(S.k>=10)return;const v=6*(S.k+1);
 if(d!==v%10){A.sound.miss();S.bad=d;say(d%2?`Every multiple of 6 is even, so ${v} cannot end in ${d}.`:`${6*S.k} + 6 = ${v}, which ends in ${v%10}.`);A.redraw();return}
 S.k++;S.bad=-1;A.sound.tick();say(`${v} ends in ${d}.`+(S.k===5?' Now watch: 36 starts the same pattern again.':''));A.redraw();controls();S.check()}
// eight 3s joining into 6s
function bead(gi,j){const W=A.W,gw=(W-20)/8,r=Math.min(gw/7,A.H*.05);return[10+gi*gw+gw*(j+1)/4,A.H*.42,r]}
function threesDraw(){const g=A.ctx,C=A.col;T(S.joined.length<4?'Tap a 3 to join it with its partner':'3 × 8 = 24 and 6 × 4 = 24',A.W/2,A.H*.07,A.narrow?14:17,{w:900});
 for(let gi=0;gi<8;gi++){const p=gi>>1,on=S.joined.includes(p),gw=(A.W-20)/8;
  if(gi%2===0){A.paint.rrect(12+gi*gw,A.H*.28,(on?2:1)*gw-4,A.H*.28,12);g.fillStyle=on?A.alpha(C.gr,.18):A.alpha(C.tx,.04);g.fill();g.strokeStyle=on?C.gr:A.alpha(C.tx,.35);g.lineWidth=on?3:1;g.stroke()}
  if(gi%2===1&&!on){A.paint.rrect(12+gi*gw,A.H*.28,gw-4,A.H*.28,12);g.strokeStyle=A.alpha(C.tx,.35);g.lineWidth=1;g.stroke()}
  for(let j=0;j<3;j++){const[x,y,r]=bead(gi,j);g.beginPath();g.arc(x,y,r,0,7);g.fillStyle=gi%2?C.or:C.vi;g.fill()}
  T(String(3*(gi+1)),12+gi*gw+gw/2,A.H*.64,A.narrow?12:15,{w:800,c:on&&gi%2?C.gr:C.tx})}
 S.joined.forEach(p=>T(`6 × ${p+1}`,12+(2*p+1)*(A.W-20)/8,A.H*.78,A.narrow?12:15,{w:900,c:C.gr}))}
function join(gi){const p=gi>>1;if(S.joined.includes(p)){A.sound.tick();say(`Those two 3s already make a 6: ${6*(p+1)}.`);return}
 S.joined.push(p);S.joined.sort();A.sound.pop();say(`3 + 3 = 6. Two 3s make one 6, so ${3*(2*p+2)} is in the 6s count.`);A.redraw();controls();S.check()}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#fff7ed',C.dark?.04:.4);g.fillRect(0,0,W,H);
 if(k==='chal'){T('6, 12, 18, 24, 30, 36, 42, 48, 54, 60',W/2,H*.3,A.narrow?13:17,{w:900});T('Ones digits: 6, 2, 8, 4, 0, then again',W/2,H*.47,A.narrow?13:16);T('6 × n is double 3 × n',W/2,H*.62,A.narrow?13:16,{c:C.mu});A.fx.draw(g);return}
 if(k==='boxes'||k==='ten')trayDraw();if(k==='gaps')gapsDraw();if(k==='wheel')wheelDraw();if(k==='threes')threesDraw();A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{n:0,max:12,gaps:[3,6,8],fill:{},used:[],tiles:[42,32,24,46,54,50],wrong:0,k:0,bad:-1,joined:[],check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*300))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';const k=kind(),btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||null},ctl,t).onclick=f};if(k==='chal')return;
 if(k==='boxes'||k==='ten'){btn('Add a box of 6',()=>setBoxes(S.n+1));btn('Take a box away',()=>setBoxes(S.n-1))}
 if(k==='gaps')S.tiles.forEach(t=>{if(!S.used.includes(t))btn(String(t),()=>place(t),'Put '+t+' in the next gap')});
 if(k==='wheel'&&S.k<10)for(let d=0;d<10;d++)btn(String(d),()=>onesTap(d),`${6*(S.k+1)} ends in ${d}`);
 if(k==='threes')for(let p=0;p<4;p++)if(!S.joined.includes(p))btn(`Join ${3*(2*p+1)} and ${3*(2*p+2)}`,()=>join(2*p))}
function down(p){const k=kind();if(k==='chal')return false;
 if(k==='boxes'||k==='ten'){for(let i=0;i<S.max;i++){const b=slot(i);if(p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h+20){setBoxes(i<S.n?i:i+1,i<S.n?`Boxes after ${i} taken off: ${6*i} eggs.`:null);return true}}return true}
 if(k==='gaps'){S.drag=null;S.tiles.forEach((t,i)=>{const b=tileAt(i);if(!S.used.includes(t)&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h)S.drag=t});if(S.drag!=null)place(S.drag);return true}
 if(k==='wheel'){for(let d=0;d<10;d++){const[x,y]=digitPos(d);if(Math.hypot(p.x-x,p.y-y)<Math.min(A.W,A.H)*.08){onesTap(d);break}}return true}
 if(k==='threes'){const gw=(A.W-20)/8,gi=Math.floor((p.x-10)/gw);if(gi>=0&&gi<8&&p.y>A.H*.2&&p.y<A.H*.7)join(gi);return true}return false}
const steps=[
{h:'Boxes of 6',p:'Eggs often come in boxes of 6. Each box you add is one more 6. Counting the boxes in 6s gives the multiples of 6.',
 predict:{q:'How many eggs are in 4 boxes of 6?',opts:['24','10','20'],ans:0},
 task:'Put 5 boxes on the tray and read the total',show:()=>auto(0,[1,2,3,4,5].map(n=>()=>setBoxes(n))),
 go:()=>{reset();say('Tap the tray to add a box of 6.');A.redraw();controls();S.check=finish(0,()=>S.n===5,'6, 12, 18, 24, 30: 5 boxes of 6 is 30. Four boxes is 4 × 6 = 24, not 4 + 6.')}},
{h:'Fill the gaps',p:'Each number in the 6s count is 6 more than the one before. Find the number that belongs in each gap.',
 task:'Fill all 3 gaps in the 6s count',show:()=>auto(1,[24,42,54].map(t=>()=>place(t))),
 go:()=>{reset();say('The first gap comes after 18. Which tile goes there?');A.redraw();controls();S.check=finish(1,()=>S.gaps.every(i=>S.fill[i]),'18 + 6 = 24, 36 + 6 = 42, 48 + 6 = 54.')}},
{h:'Ones digits',p:'Look at the last digit, the ones digit, of each multiple of 6. Tap it on the wheel and watch the pattern.',
 predict:{q:'Can a multiple of 6 end in 5?',opts:['No, they are all even','Yes, 6 × 5 ends in 5','Yes, after 30'],ans:0},
 task:'Tap the ones digit of every multiple of 6 up to 60',show:()=>auto(2,[6,2,8,4,0,6,2,8,4,0].map(d=>()=>onesTap(d))),
 go:()=>{reset();say('Tap the ones digit of 6.');A.redraw();controls();S.check=finish(2,()=>S.k>=10,'The ones digits go 6, 2, 8, 4, 0 and then repeat. All even: 6 × 5 = 30 ends in 0, not 5.')}},
{h:'Two 3s make a 6',p:'Here is the 3s count in groups of 3. Join each pair of 3s and see which 3s numbers are in the 6s count.',
 predict:{q:'Is every number in the 3s count also in the 6s count?',opts:['No, only every second one','Yes, they match','No, none of them'],ans:0},
 task:'Join the eight 3s into four 6s',show:()=>auto(3,[0,2,4,6].map(g=>()=>join(g))),
 go:()=>{reset();say('Tap a group of 3 to join it with the 3 next to it.');A.redraw();controls();S.check=finish(3,()=>S.joined.length===4,'6, 12, 18 and 24 are in both counts; 3, 9, 15 and 21 are only in the 3s. 6 × 4 is double 3 × 4.')}},
{h:'Use 6 × 10',p:'10 boxes of 6 is 60. You can find 6 × 9 from 6 × 10 by taking one whole box away.',
 predict:{q:'6 × 10 = 60. What is 6 × 9?',opts:['54','59','50'],ans:0},
 task:'Start at 6 × 10 and make 6 × 9',show:()=>auto(4,[()=>setBoxes(9)]),
 go:()=>{reset({n:10,max:12});say('There are 10 boxes: 60 eggs. Take one box away.');A.redraw();controls();S.check=finish(4,()=>S.n===9&&S.touched,'60 − 6 = 54. One box is 6 eggs, not 1, so 6 × 9 = 54.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['What comes next? 30, 36, 42, …',[['48','ok'],['46','four'],['52','ten']]],
 ['Which number is in the 6s count?',[['54','ok'],['56','eight'],['45','odd']]],
 ['How many eggs are in 7 boxes of 6?',[['42','ok'],['13','add'],['36','short']]],
 ['3 × 9 = 27. What is 6 × 9?',[['54','ok'],['30','add3'],['27','same']]],
 ['6 × 10 = 60. What is 6 × 11?',[['66','ok'],['61','one'],['70','ten']]],
 ['Which ones digit can a multiple of 6 never have?',[['5','ok'],['4','even'],['2','even']]],
 ['Count back in 6s: 48, 42, 36, …',[['30','ok'],['32','four'],['34','two']]]];
function why(t){let m='Each step in the 6s count is +6.';
 if(t==='four')m='That is a jump of 4. In the 6s count every jump is 6.';
 if(t==='ten')m='That jumps by 10. Add 6, not 10.';
 if(t==='eight')m='56 is in the 8s count (8 × 7). The 6s go 48, 54, 60.';
 if(t==='odd')m='45 is odd. Every multiple of 6 is even.';
 if(t==='add')m='7 + 6 adds the numbers. 7 boxes of 6 is 7 × 6 = 42.';
 if(t==='short')m='36 is 6 boxes. Add one more 6: 42.';
 if(t==='add3')m='Adding 3 is not it. 6 × 9 is double 3 × 9: 27 + 27 = 54.';
 if(t==='same')m='27 is 3 × 9. A 6 is two 3s, so double it: 54.';
 if(t==='one')m='Add a whole box of 6, not 1: 60 + 6 = 66.';
 if(t==='two')m='That counts back 2. Count back 6: 36 − 6 = 30.';
 if(t==='even')m='That digit does appear: 24 and 12 end in 4 and 2. Multiples of 6 are even, so 5 never appears.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+2)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Counting in 6s controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),up:()=>{S.drag=null}});controls()}});
A.start()})})();
