/* Flagship: skip counting in 4s, 8s, 50s and 100s (ages 7-8; NC Year 3 "count from 0 in multiples of 4, 8, 50 and 100"
   and "find 10 or 100 more or less than a given number"). A frog hops a number track, a 1-40 grid shows the 4s inside
   the 2s, a second frog shows two hops of 4 make one hop of 8, then hops of 50 and 100 count on to 1000.
   Every tap or drag has a button twin. */
(()=>{
VIS.reg('flagfours',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['four','grid','eight','fifty','hund','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
/* a number track: F = {v, step, lo, hi, lab, y, col, trail} */
const X=(F,v)=>A.W*.06+(v-F.lo)/(F.hi-F.lo)*A.W*.88;
function track(F){const g=A.ctx,C=A.col,y=F.y;g.strokeStyle=C.tx;g.lineWidth=3;g.beginPath();g.moveTo(X(F,F.lo),y);g.lineTo(X(F,F.hi),y);g.stroke();
 const minor=F.minor||F.step;for(let v=F.lo;v<=F.hi+1e-9;v+=minor){g.lineWidth=1.5;g.beginPath();g.moveTo(X(F,v),y-5);g.lineTo(X(F,v),y+5);g.stroke()}
 for(let v=F.lo;v<=F.hi;v+=F.lab){g.lineWidth=2.5;g.beginPath();g.moveTo(X(F,v),y-9);g.lineTo(X(F,v),y+9);g.stroke();T(String(v),X(F,v),y+22,A.narrow?10:13,{c:C.mu})}
 (F.trail||[]).forEach((v,i)=>{if(!i)return;const a=X(F,F.trail[i-1]),b=X(F,v),m=(a+b)/2,r=Math.abs(b-a)/2;g.strokeStyle=A.alpha(F.col,.8);g.lineWidth=2.5;g.beginPath();g.ellipse(m,y-4,r,Math.min(26,r*.9+6),0,Math.PI,2*Math.PI);g.stroke()});
 const fx=X(F,F.v);g.fillStyle=F.col;g.beginPath();g.ellipse(fx,y-20,15,12,0,0,7);g.fill();g.fillStyle=C.pn;g.beginPath();g.arc(fx-5,y-25,3.5,0,7);g.arc(fx+5,y-25,3.5,0,7);g.fill();
 T(String(F.v),fx,y-46,A.narrow?15:18,{c:F.col,w:900});if(F.name)T(F.name,8,y-46,12,{al:'left',c:C.mu})}
function hop(F,d){const nv=F.v+d*F.step;if(nv<F.lo||nv>F.hi){A.sound.miss();say(`The track stops at ${d>0?F.hi:F.lo}.`);return}
 F.v=nv;if(d>0)F.trail.push(nv);else F.trail.pop();A.sound.tick();say(S.say(F));A.redraw();S.check()}
/* the 1-40 grid */
function cell(n){const cols=8,w=A.W*.9/cols,h=A.H*.8/5,i=n-1;return[A.W*.05+(i%cols)*w,A.H*.12+Math.floor(i/cols)*h,w-4,h-4]}
function mark(n){if(S.m.has(n)){S.m.delete(n);A.sound.tick();say(`${n} unmarked.`);A.redraw();return}
 if(n%4){A.sound.miss();S.bad=n;const lo=n-n%4,m=n%2?`${n} is odd, so it is not in the 2s or the 4s.`:`${n} is in the 2s count, but not the 4s: ${lo} + 4 = ${lo+4}.`;say(m);A.redraw();return}
 S.bad=0;S.m.add(n);A.sound.tick();say(`${n} = ${n/4} fours. ${10-S.m.size?10-S.m.size+' more to find.':'All ten found: every second 2s number is a 4s number.'}`);A.redraw();S.check()}
function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.04:.3);g.fillRect(0,0,W,H);const k=kind();
 if(k==='chal'){T('4s: 4, 8, 12, 16, 20 …   8s: 8, 16, 24, 32 …',W/2,H*.3,A.narrow?13:16);T('50s: 50, 100, 150, 200 …',W/2,H*.45,A.narrow?13:16);T('100 more: only the hundreds digit goes up',W/2,H*.6,A.narrow?12:15,{c:C.mu});A.fx.draw(g);return}
 if(k==='grid'){for(let n=1;n<=40;n++){const[x,y,w,h]=cell(n),on=S.m.has(n);A.paint.rrect(x,y,w,h,8);g.fillStyle=on?C.gr:n===S.bad?A.alpha(C.rd,.25):A.alpha(C.tx,.05);g.fill();
   g.strokeStyle=n%2?A.alpha(C.tx,.25):C.ac;g.lineWidth=n%2?1:2;g.stroke();T(String(n),x+w/2,y+h/2,A.narrow?14:17,{c:on?C.pn:C.tx,w:on?900:700});if(!(n%2)&&!on){g.fillStyle=C.ac;g.beginPath();g.arc(x+w-7,y+7,3,0,7);g.fill()}}
  T('Blue dot = in the 2s count',W*.05,H*.06,12,{al:'left',c:C.mu});A.fx.draw(g);return}
 (S.F||[]).forEach(track);if(S.top)T(S.top,8,16,13,{al:'left',c:C.mu,w:700});
 S.F&&S.F.forEach(F=>{const n=F.trail.length-1;T(`${n} hop${n===1?'':'s'} of ${F.step}`,W-8,F.y+42,12,{al:'right',c:C.mu})});A.fx.draw(g)}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{check:()=>{},say:()=>''},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?30*(j+1):(j+1)*220))}
const frog=(o)=>Object.assign({trail:[o.v]},o);
function controls(){if(!ctl)return;ctl.innerHTML='';const k=kind(),btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||null},ctl,t).onclick=f};if(k==='chal')return;
 if(k==='grid'){btn('Mark next 4s number',()=>{for(let n=4;n<=40;n+=4)if(!S.m.has(n)){mark(n);return}},'Mark the next number in the 4s count');btn('Clear',()=>{S.m.clear();S.bad=0;say('Grid cleared.');A.redraw()},'Clear all marks');return}
 S.F.forEach(F=>{btn(`${F.name?F.name+' ':''}+${F.step}`,()=>hop(F,1),`Hop ${F.step} forward${F.name?' with the '+F.name:''}`);btn(`${F.name?F.name+' ':''}−${F.step}`,()=>hop(F,-1),`Hop ${F.step} back${F.name?' with the '+F.name:''}`)})}
/* tap ahead of a frog to hop forward, behind it to hop back; tap a grid square to mark it */
function down(p){const k=kind();if(k==='chal')return false;
 if(k==='grid'){for(let n=1;n<=40;n++){const[x,y,w,h]=cell(n);if(p.x>x&&p.x<x+w&&p.y>y&&p.y<y+h){mark(n);return true}}return false}
 const F=(S.F||[]).find(F=>Math.abs(p.y-(F.y-14))<44);if(!F)return false;const fx=X(F,F.v);if(Math.abs(p.x-fx)<12)return true;hop(F,p.x>fx?1:-1);return true}
const steps=[
{h:'Count in 4s',p:'Counting in 4s means adding 4 each time: 0, 4, 8, 12, 16. Every hop is the same size.',
 predict:{q:'You count in 4s from 0. Will you say 30?',opts:['No','Yes','Only after 40'],ans:0},
 task:'Hop the frog in 4s all the way to 48',show:()=>auto(0,Array(12).fill(()=>hop(S.F[0],1))),
 go:()=>{reset({F:[frog({v:0,step:4,lo:0,hi:48,lab:4,minor:2,y:A.H*.6,col:A.col.gr})],top:'Tap ahead of the frog, or use the buttons',
  say:F=>F.v===48?'0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48. 12 hops of 4 make 48.':`${F.trail.join(', ')}. Every number ends in 0, 2, 4, 6 or 8.`});
  say('A frog at 0 on a track to 48. Tap ahead of it to hop 4.');controls();S.check=finish(0,()=>S.F[0].v===48,'You never land on 30: 28 + 4 = 32.')}},
{h:'4s hide inside the 2s',p:'Two hops of 2 make one hop of 4. So the 4s are every second number in the 2s count: 4, 8, 12, 16.',
 predict:{q:'Is every number in the 4s count also in the 2s count?',opts:['Yes, every one','No, never','Only some of them'],ans:0},
 task:'Tap every number in the 4s count, up to 40',show:()=>auto(1,[4,8,12,16,20,24,28,32,36,40].map(n=>()=>mark(n))),
 go:()=>{reset({m:new Set(),bad:0});say('Numbers 1 to 40. Even numbers have a blue dot. Tap the numbers you say when you count in 4s.');controls();S.check=finish(1,()=>S.m.size===10,'4, 8, 12 … 40: every second even number.')}},
{h:'8s are double 4s',p:'One hop of 8 is two hops of 4. So counting in 8s needs half as many hops: 8, 16, 24, 32, 40, 48.',
 predict:{q:'How many hops of 8 does it take to reach 48 from 0?',opts:['6','12','8'],ans:0},
 task:'Hop the 4s frog and the 8s frog both to 48',show:()=>auto(2,[...Array(6).fill(()=>hop(S.F[1],1)),...Array(12).fill(()=>hop(S.F[0],1))]),
 go:()=>{reset({F:[frog({v:0,step:4,lo:0,hi:48,lab:8,y:A.H*.38,col:A.col.gr,name:'4s frog'}),frog({v:0,step:8,lo:0,hi:48,lab:8,y:A.H*.78,col:A.col.vi,name:'8s frog'})],
  say:F=>{const[a,b]=S.F;return a.v===48&&b.v===48?'12 hops of 4 and 6 hops of 8 both reach 48. Each 8s number is also a 4s number.':`${F.name}: ${F.trail.join(', ')}.`}});
  say('Two frogs: one hops 4, one hops 8. Tap ahead of a frog to hop it.');controls();S.check=finish(2,()=>S.F[0].v===48&&S.F[1].v===48,'6 hops of 8 = 12 hops of 4 = 48.')}},
{h:'Count in 50s',p:'Counting in 50s goes 50, 100, 150, 200. Two 50s make 100, so the numbers end in 50, then 00, then 50 again.',
 predict:{q:'You count in 50s from 0. Which number will you say?',opts:['250','225','205'],ans:0},
 task:'Hop in 50s all the way to 500',show:()=>auto(3,Array(10).fill(()=>hop(S.F[0],1))),
 go:()=>{reset({F:[frog({v:0,step:50,lo:0,hi:500,lab:100,minor:50,y:A.H*.6,col:A.col.or})],top:'Tap ahead of the frog, or use the buttons',
  say:F=>F.v===500?'50, 100, 150 … 500: 10 hops of 50. Every two hops make another 100.':`${F.trail.join(', ')}.`});
  say('A frog at 0 on a track to 500. Each hop is 50.');controls();S.check=finish(3,()=>S.F[0].v===500,'Ten 50s make 500.')}},
{h:'Count on in 100s',p:'Counting on in 100s from any number only changes the hundreds digit: 130, 230, 330. The tens and ones stay the same.',
 predict:{q:'What is 100 more than 350?',opts:['450','400','360'],ans:0},
 task:'Start at 130 and count on in 100s to 930',show:()=>auto(4,Array(8).fill(()=>hop(S.F[0],1))),
 go:()=>{reset({F:[frog({v:130,step:100,lo:30,hi:1030,lab:100,minor:50,y:A.H*.6,col:A.col.ac})],top:'Tens and ones stay the same',
  say:F=>F.v===930?'130, 230, 330, 430, 530, 630, 730, 830, 930. Only the hundreds digit went up.':`${F.trail.join(', ')}. The 3 tens never change.`});
  say('A frog at 130. Each hop is 100.');controls();S.check=finish(4,()=>S.F[0].v===930,'100 more changes the hundreds digit only.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['What comes next? 4, 8, 12, 16, …',[['20','ok'],['18','two'],['17','one']]],
 ['What comes next? 32, 40, 48, …',[['56','ok'],['52','four'],['58','ten']]],
 ['Which number is in the 8s count?',[['56','ok'],['50','fifty'],['60','ten']]],
 ['What is missing? 150, 200, __, 300',[['250','ok'],['210','ten'],['400','hund']]],
 ['What is 100 more than 470?',[['570','ok'],['480','ten'],['500','round']]],
 ['Which number is in the 4s count but not the 8s count?',[['12','ok'],['16','both'],['24','both']]],
 ['How many 50s make 300?',[['6','ok'],['3','hund'],['30','ten']]]];
function why(t){let m='Keep every jump the same size and count the jumps.';
 if(t==='two')m='That is a jump of 2. In the 4s count every jump is 4: 16 + 4 = 20.';
 if(t==='one')m='Counting in 4s from 0 never gives an odd number. 16 + 4 = 20.';
 if(t==='four')m='That is a jump of 4, but this count goes up in 8s: 48 + 8 = 56.';
 if(t==='ten')m='That jump is 10, not the jump in this count. Find the jump first, then add it.';
 if(t==='fifty')m='50 is in the 50s and 10s counts, but 6 × 8 = 48 and 7 × 8 = 56, so 50 is not an 8s number.';
 if(t==='hund')m='Each 50 is half of 100, so you need two 50s for every 100.';
 if(t==='round')m='100 more does not round. Add 1 to the hundreds digit and keep 70: 570.';
 if(t==='both')m='That number is in both counts, because it is a whole number of 8s. 12 is 3 fours but 1½ eights.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+2)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.55,tall:.95,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Counting controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset({F:[]});
  A.gest({down:p=>down(p)});controls()}});
A.start()})})();
