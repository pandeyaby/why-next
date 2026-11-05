/* Flagship: reading and writing numerals 0–20 (ages 5–6; CCSS K.CC.3 "write numbers from 0 to 20"; NC Y1 read and write
   numbers from 1 to 20 in numerals). Match a count to its numeral, build teens as ten-and-ones, tap digits to write,
   place on a 0–20 line, catch 12/21 swaps, then a challenge on teen structure and digit order. */
(()=>{
VIS.reg('flagto20',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['match','teen','write','line','swap','read','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#e0e7ff',C.dark?.08:.35);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Read and write 0 to 20',W/2,H*.32,A.narrow?16:20,{w:900});T('Teens are ten and some ones.',W/2,H*.52,A.narrow?13:16,{c:C.mu});A.fx.draw(g);return}
 if(k==='match'){T(`Count the dots. Tap the numeral.`,W/2,H*.1,A.narrow?14:17,{w:800});
  const n=S.n||0,r=Math.min(W,H)*.04,cols=5;for(let i=0;i<n;i++){const x=W*.2+(i%cols)*W*.12,y=H*.35+Math.floor(i/cols)*H*.12;
   g.beginPath();g.arc(x,y,r,0,7);g.fillStyle=C.ac;g.fill();g.strokeStyle=C.tx;g.lineWidth=1.5;g.stroke()}
  T(S.pick!=null?`You tapped ${S.pick}`:'',W/2,H*.9,A.narrow?13:15,{c:C.mu})}
 if(k==='teen'){T(`Build ${S.target}: one ten and ${S.target-10} ones`,W/2,H*.1,A.narrow?14:17,{w:800});
  // tens rod + ones cubes
  g.fillStyle=C.vi;g.fillRect(W*.12,H*.35,W*.18,H*.35);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.12,H*.35,W*.18,H*.35);T('10',W*.21,H*.52,18,{w:900,c:'#fff'});
  for(let i=0;i<(S.ones||0);i++){const x=W*.4+(i%5)*W*.1,y=H*.4+Math.floor(i/5)*H*.15;g.fillStyle=C.or;g.fillRect(x,y,W*.08,H*.12);g.strokeRect(x,y,W*.08,H*.12)}
  T(`Ones: ${S.ones||0}  Total: ${10+(S.ones||0)}`,W/2,H*.9,A.narrow?14:16,{c:C.mu})}
 if(k==='write'){T(`Write the number ${S.target}`,W/2,H*.12,A.narrow?16:20,{w:800});
  T(S.typed||'_',W/2,H*.4,A.narrow?36:48,{w:900});T('Tap digits below. Clear to restart.',W/2,H*.7,A.narrow?12:14,{c:C.mu})}
 if(k==='line'){T(`Put the bead on ${S.target}`,W/2,H*.1,A.narrow?15:18,{w:800});
  const y=H*.5,x0=W*.08,x1=W*.92;g.strokeStyle=C.tx;g.lineWidth=3;g.beginPath();g.moveTo(x0,y);g.lineTo(x1,y);g.stroke();
  for(let i=0;i<=20;i++){const x=x0+(x1-x0)*i/20;g.beginPath();g.moveTo(x,y-8);g.lineTo(x,y+8);g.stroke();if(i%5===0)T(String(i),x,y+22,11,{w:700})}
  const bx=x0+(x1-x0)*(S.pos??0)/20;g.beginPath();g.arc(bx,y,12,0,7);g.fillStyle=C.ac;g.fill();g.stroke();T(`Bead at ${S.pos??0}`,W/2,H*.85,A.narrow?13:15,{c:C.mu})}
 if(k==='swap'){T('Which numeral matches the word?',W/2,H*.12,A.narrow?14:17,{w:800});
  T(S.word||'',W/2,H*.35,A.narrow?22:28,{w:900});
  (S.opts||[]).forEach((t,i)=>{const x=W*.25+i*W*.25,y=H*.65;g.fillStyle=S.picked===i?A.alpha(C.ac,.35):A.alpha(C.tx,.08);g.fillRect(x-W*.1,y-H*.08,W*.2,H*.16);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(x-W*.1,y-H*.08,W*.2,H*.16);T(String(t),x,y,A.narrow?18:22,{w:800})})}
 if(k==='read'){T(`What number is this?`,W/2,H*.15,A.narrow?15:18,{w:800});
  T(String(S.shown??''),W/2,H*.4,A.narrow?42:56,{w:900});T(S.said!=null?`You said ${S.said}`:'Tap the value',W/2,H*.85,A.narrow?13:15,{c:C.mu})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{n:7,pick:null,target:14,ones:0,typed:'',pos:0,word:'twelve',opts:[12,21,20],picked:null,shown:16,said:null,lock:0,check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*300))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='match'){(S.choices||[5,7,9,12]).forEach(n=>btn(String(n),()=>{S.pick=n;A.sound.tick();say('You tapped '+n);A.redraw();S.check()},'Numeral '+n))}
 if(kind()==='teen'){btn('+ one',()=>{if(S.ones<10){S.ones++;A.sound.tick();say((10+S.ones)+' in all');A.redraw();S.check()}},'Add one');
  btn('− one',()=>{if(S.ones>0){S.ones--;A.sound.tick();say((10+S.ones)+' in all');A.redraw();S.check()}},'Remove one');
  btn('Clear ones',()=>{S.ones=0;say('Just the ten');A.redraw();S.check()},'Clear ones')}
 if(kind()==='write'){for(let d=0;d<=9;d++)btn(String(d),()=>{if((S.typed||'').length<2){S.typed=(S.typed||'')+d;A.sound.tick();say('Written '+S.typed);A.redraw();S.check()}},'Digit '+d);
  btn('Clear',()=>{S.typed='';say('Cleared');A.redraw()},'Clear digits')}
 if(kind()==='line'){btn('−1',()=>{S.pos=Math.max(0,(S.pos||0)-1);A.sound.tick();A.redraw();S.check()},'Move left');
  btn('+1',()=>{S.pos=Math.min(20,(S.pos||0)+1);A.sound.tick();A.redraw();S.check()},'Move right');
  btn('Jump to target',()=>{S.pos=S.target;A.sound.pop();A.redraw();S.check()},'Jump bead to target')}
 if(kind()==='swap'){(S.opts||[]).forEach((t,i)=>btn(String(t),()=>{S.picked=i;A.sound.tick();say('Picked '+t);A.redraw();S.check()},'Pick '+t))}
 if(kind()==='read'){(S.choices||[14,16,61,60]).forEach(n=>btn(String(n),()=>{S.said=n;A.sound.tick();say('You said '+n);A.redraw();S.check()},'Say '+n))}
}
function down(p){if(kind()==='chal')return false;S.drag=1;return true}
function move(p){if(!S.drag)return;if(kind()==='line'){const x0=A.W*.08,x1=A.W*.92;S.pos=Math.max(0,Math.min(20,Math.round((p.x-x0)/(x1-x0)*20)));A.redraw()}
 if(kind()==='swap'){const i=Math.floor((p.x-A.W*.125)/(A.W*.25));if(i>=0&&i<(S.opts||[]).length){S.picked=i;A.redraw()}}}
function up(){if(kind()==='line'||kind()==='swap')S.check();S.drag=0}
const steps=[
{h:'Match the count',p:'Count the dots. Tap the numeral that matches. Reading a numeral means knowing which mark stands for that count.',
 predict:{q:'Seven dots. Which numeral?',opts:['7','17','70'],ans:0},
 task:'Match 7 dots to the numeral 7',show:()=>auto(0,[()=>{S.pick=7;A.redraw();S.check()}]),
 go:()=>{reset({n:7,choices:[5,7,9,12],pick:null});say('Count the dots. Tap the matching numeral.');controls();S.check=finish(0,()=>S.pick===7,'7 dots match the numeral 7.')}},
{h:'Teen = ten and ones',p:'Teen numbers are one ten and some ones. 14 is a ten-rod and 4 ones.',
 predict:{q:'14 is…',opts:['1 ten and 4 ones','4 tens and 1 one','14 ones with no ten'],ans:0},
 task:'Build 14 as 1 ten and 4 ones',show:()=>auto(1,[()=>{S.ones=4;A.redraw();S.check()}]),
 go:()=>{reset({target:14,ones:0});say('Add ones until you make 14.');controls();S.check=finish(1,()=>S.ones===4,'1 ten + 4 ones = 14.')}},
{h:'Write the digits',p:'Write 16 by tapping 1 then 6. The left digit is the tens; the right digit is the ones.',
 predict:{q:'To write sixteen, which digit comes first?',opts:['1','6','0'],ans:0},
 task:'Write 16 with the digit pad',show:()=>auto(2,[()=>{S.typed='16';A.redraw();S.check()}]),
 go:()=>{reset({target:16,typed:''});say('Write 16.');controls();S.check=finish(2,()=>S.typed==='16','1 then 6 writes sixteen.')}},
{h:'Number line to 20',p:'Drag the bead, or tap +1/−1, to the target number on the 0–20 line.',
 task:'Place the bead on 11',show:()=>auto(3,[()=>{S.pos=11;A.redraw();S.check()}]),
 go:()=>{reset({target:11,pos:0});say('Move the bead to 11.');controls();S.check=finish(3,()=>S.pos===11,'The bead sits on 11.')}},
{h:'Twelve not twenty-one',p:'Twelve is 12: 1 ten and 2 ones. Twenty-one is 21: 2 tens and 1 one. Do not swap the digits.',
 predict:{q:'The word twelve matches…',opts:['12','21','20'],ans:0},
 task:'Pick the numeral for twelve',show:()=>auto(4,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({word:'twelve',opts:[12,21,20],picked:null});say('Which numeral is twelve?');controls();S.check=finish(4,()=>S.picked===0,'Twelve is 12, not 21.')}},
{h:'Read the numeral',p:'Look at the digits. Read the number. 16 is sixteen, not sixty-one.',
 predict:{q:'The numeral 16 is…',opts:['sixteen','sixty-one','six'],ans:0},
 task:'Read 16 and tap sixteen',show:()=>auto(5,[()=>{S.said=16;A.redraw();S.check()}]),
 go:()=>{reset({shown:16,choices:[16,61,6,20],said:null});say('What number is shown?');controls();S.check=finish(5,()=>S.said===16,'16 is sixteen: 1 ten and 6 ones.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['Which numeral is thirteen?',[['13','ok'],['31','swap'],['30','tens']]],
 ['17 is…',[['1 ten and 7 ones','ok'],['7 tens and 1 one','swap'],['17 tens','allten']]],
 ['Write fifteen. Digits in order?',[['1 then 5','ok'],['5 then 1','swap'],['5 then 5','dup']]],
 ['20 means…',[['2 tens and 0 ones','ok'],['2 ones','ones'],['20 tens','allten']]],
 ['The numeral 19 is…',[['nineteen','ok'],['ninety-one','swap'],['nine','drop']]],
 ['0 on the number line is…',[['the start, none','ok'],['the same as 10','ten'],['twenty','twenty']]],
 ['12 and 21…',[['use the same digits in different places','ok'],['are the same number','same'],['both mean one ten','both']]]];
function why(t){let m='Read tens on the left, ones on the right.';
 if(t==='swap')m='You swapped the digits. 13 is 1 ten and 3 ones; 31 is 3 tens and 1 one.';
 if(t==='tens')m='30 is three tens. Thirteen is 13: one ten and three ones.';
 if(t==='allten')m='Teen numbers have one ten, not seventeen tens.';
 if(t==='dup')m='Fifteen is 1 then 5, not two fives.';
 if(t==='ones')m='20 is two tens (a score), not two ones.';
 if(t==='drop')m='Dropping a digit changes the number. 19 is nineteen, not nine.';
 if(t==='ten')m='0 means none. 10 is one ten.';
 if(t==='twenty')m='20 is at the other end of this line. 0 is the start.';
 if(t==='same')m='12 and 21 look alike but place value makes them different.';
 if(t==='both')m='Only 12 has one ten. 21 has two tens.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Number controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:p=>move(p),up:up});controls()}});
A.start()})})();
