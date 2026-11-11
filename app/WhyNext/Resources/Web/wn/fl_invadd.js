/* Flagship: Inverse — addition undoes subtraction (ages 6–7; Y2 / 1.OA.4).
   Act add then undo with subtract; check a sum by subtracting; solve missing-number with inverse;
   reject “add and subtract are unrelated” and “must recount from scratch”; then challenge.
   Distinct from combining sets (flagaddtog) and take-away how-many-left (flagtake). */
(()=>{
VIS.reg('flaginvadd',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['undo','check','missing','pair','myth','idea','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function dots(g,n,ox,oy,cols,col){const{col:C}=A,r=A.narrow?7:9,gap=A.narrow?20:24;
 for(let i=0;i<n;i++){const x=ox+(i%cols)*gap,y=oy+Math.floor(i/cols)*gap;g.fillStyle=col||C.am;g.beginPath();g.arc(x,y,r,0,Math.PI*2);g.fill();g.strokeStyle=C.tx;g.lineWidth=1.2;g.stroke()}}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#dcfce7',C.dark?.08:.4);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Add and subtract undo each other',W/2,H*.32,A.narrow?13:16,{w:900});T('Check · missing number · fact families',W/2,H*.55,A.narrow?12:14,{c:C.mu});A.fx.draw(g);return}
 if(k==='undo'){T('Add 3, then undo with − 3',W/2,H*.09,A.narrow?13:15,{w:800});
  T('Start 5',W*.22,H*.28,13);dots(g,5,W*.1,H*.36,5,C.am);
  T(S.added?'+ 3 → 8':'Tap Add 3',W/2,H*.28,A.narrow?12:14,{c:C.mu});
  if(S.added){dots(g,8,W*.38,H*.36,5,C.ac)}
  if(S.undone){T('− 3 → back to 5',W*.78,H*.28,13);dots(g,5,W*.62,H*.36,5,C.gr)}
  T(S.msg||'Add, then take the same away',W/2,H*.88,A.narrow?12:14,{c:C.mu})}
 if(k==='check'){T('Check 15 + 7 = 22',W/2,H*.1,A.narrow?14:16,{w:800});
  T('15 + 7 = 22',W/2,H*.35,A.narrow?20:24,{w:900});
  T(S.checked?'22 − 7 = 15 ✓':'Tap Check with subtract',W/2,H*.62,A.narrow?13:15,{c:C.mu});
  T(S.msg||'',W/2,H*.86,12,{c:C.mu})}
 if(k==='missing'){T('□ + 9 = 14',W/2,H*.12,A.narrow?18:22,{w:900});
  T(S.found?'□ = 14 − 9 = 5':'Use inverse: 14 − 9',W/2,H*.45,A.narrow?14:16,{c:C.mu});
  T(S.msg||'Subtract to find the missing addend',W/2,H*.78,A.narrow?12:14,{c:C.mu})}
 if(k==='pair'){T('Fact family for 5, 9, 14',W/2,H*.1,A.narrow?13:15,{w:800});
  T('5 + 9 = 14',W/2,H*.32,A.narrow?16:18);T('14 − 9 = 5',W/2,H*.5,A.narrow?16:18);
  T(S.paired?'They undo each other':'Tap Show the pair',W/2,H*.72,A.narrow?13:15,{c:C.mu})}
 if(k==='myth'){T('Do you need to recount from scratch?',W/2,H*.12,A.narrow?13:15,{w:800,max:W*.92});
  T('You know 13 + 5 = 18',W/2,H*.4,A.narrow?14:16);
  T(S.picked==null?'Can you say 18 − 5 = 13 straight away?':'Picked '+['yes — use the inverse','no — recount every time'][S.picked],W/2,H*.7,A.narrow?12:14,{c:C.mu,max:W*.92})}
 if(k==='idea'){T('Tap the true sentence',W/2,H*.1,A.narrow?15:18,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.3+i*.18);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.06,y-H*.07,W*.88,H*.14);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.06,y-H*.07,W*.88,H*.14);T(t,W/2,y,A.narrow?11:13,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{added:0,undone:0,checked:0,found:0,paired:0,picked:null,msg:'',opts:[],check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*260))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='undo'){btn('Add 3',()=>{S.added=1;S.msg='Now 8. Undo next.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Add three');btn('Undo with − 3',()=>{if(!S.added){A.sound.miss();say('Add first');return}S.undone=1;S.msg='Back to 5 — add and subtract undo';A.sound.tick();say(S.msg);A.redraw();S.check()},'Subtract three to undo')}
 if(kind()==='check'){btn('Check: 22 − 7 = 15',()=>{S.checked=1;S.msg='Same numbers — the sum checks out';A.sound.tick();say(S.msg);A.redraw();S.check()},'Check with subtraction')}
 if(kind()==='missing'){btn('□ = 14 − 9 = 5',()=>{S.found=1;S.msg='Inverse finds the missing number';A.sound.tick();say(S.msg);A.redraw();S.check()},'Solve with inverse')}
 if(kind()==='pair'){btn('Show the undoing pair',()=>{S.paired=1;A.sound.tick();say('5 + 9 = 14 and 14 − 9 = 5');A.redraw();S.check()},'Show fact family pair')}
 if(kind()==='myth'){btn('Yes — use the inverse',()=>{S.picked=0;A.sound.tick();say('You can reuse the fact');A.redraw();S.check()},'Use inverse');btn('No — recount every time',()=>{S.picked=1;A.sound.miss();say('Inverse lets you reuse the fact');A.redraw()},'Recount myth')}
 if(kind()==='idea')(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();say(t);A.redraw();S.check()},'Pick: '+t))}
function down(p){if(kind()==='chal')return false;
 if(kind()==='undo'){if(!S.added){S.added=1;A.sound.tick()}else{S.undone=1;A.sound.tick();S.check()}A.redraw();return true}
 if(kind()==='check'||kind()==='missing'||kind()==='pair'){S.checked=S.found=S.paired=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='myth'){S.picked=p.x<A.W/2?0:1;if(S.picked===0){A.sound.tick();S.check()}else A.sound.miss();A.redraw();return true}
 if(kind()==='idea'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.22)/(A.H*.18))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 return true}
const steps=[
{h:'Undo an add',p:'If you add 3 to 5 you get 8. Take 3 away and you are back to 5. Addition and subtraction undo each other.',
 predict:{q:'After 5 + 3 = 8, what undoes the add?',opts:['subtract 3','add 3 again','ignore the 3'],ans:0},
 task:'Add 3, then undo with − 3',show:()=>auto(0,[()=>{S.added=1;A.redraw()},()=>{S.undone=1;A.redraw();S.check()}]),
 go:()=>{reset();say('Add, then undo.');controls();S.check=finish(0,()=>S.added&&S.undone,'Add and subtract undo each other.')}},
{h:'Check a sum',p:'Check 15 + 7 = 22 by calculating 22 − 7 = 15. Same numbers, reverse operation.',
 predict:{q:'To check 15 + 7 = 22 you…',opts:['calculate 22 − 7 = 15','add 7 again','count only the 15'],ans:0},
 task:'Check with 22 − 7 = 15',show:()=>auto(1,[()=>{S.checked=1;A.redraw();S.check()}]),
 go:()=>{reset();say('Check the sum with subtract.');controls();S.check=finish(1,()=>S.checked,'Subtract checks the add.')}},
{h:'Missing number',p:'For □ + 9 = 14, use the inverse: □ = 14 − 9 = 5.',
 predict:{q:'□ + 9 = 14 means □ is…',opts:['14 − 9 = 5','14 + 9 = 23','9 − 14'],ans:0},
 task:'Solve □ with 14 − 9',show:()=>auto(2,[()=>{S.found=1;A.redraw();S.check()}]),
 go:()=>{reset();say('Find the missing number.');controls();S.check=finish(2,()=>S.found,'Inverse solves missing-number problems.')}},
{h:'Fact family pair',p:'5 + 9 = 14 and 14 − 9 = 5 belong together. They are an undoing pair.',
 predict:{q:'14 − 9 = 5 undoes…',opts:['5 + 9 = 14','14 + 9 = 23','9 − 5 = 4'],ans:0},
 task:'Show the undoing pair',show:()=>auto(3,[()=>{S.paired=1;A.redraw();S.check()}]),
 go:()=>{reset();say('Show the fact family pair.');controls();S.check=finish(3,()=>S.paired,'Add and subtract form undoing pairs.')}},
{h:'Reuse the fact',p:'If you know 13 + 5 = 18, you can say 18 − 5 = 13 straight away. You do not need to recount from scratch.',
 predict:{q:'Knowing 13 + 5 = 18, can you say 18 − 5 = 13 without recounting?',opts:['yes — use the inverse','no — always recount','only if you add again'],ans:0},
 task:'Pick yes — use the inverse',show:()=>auto(4,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({picked:null});say('Reuse the fact?');controls();S.check=finish(4,()=>S.picked===0,'Inverse reuses the fact — no need to recount.')}},
{h:'True sentence',p:'Pick the sentence that matches inverse add and subtract.',
 predict:{q:'Addition and subtraction…',opts:['undo each other','never help each other','only work with the same sign'],ans:0},
 task:'Tap the true sentence',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['Addition and subtraction undo each other','Addition and subtraction are unrelated','You must always recount from zero'],picked:null});say('Tap the true idea.');controls();S.check=finish(5,()=>S.picked===0,'Inverse links add and subtract for checks and missing numbers.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['After 5 + 3 = 8, what undoes the add?',[['subtract 3','ok'],['add 3 again','again'],['ignore the 3','ignore']]],
 ['To check 15 + 7 = 22 you…',[['calculate 22 − 7 = 15','ok'],['add 7 again','add7'],['count only the 15','only15']]],
 ['□ + 9 = 14 means □ is…',[['14 − 9 = 5','ok'],['14 + 9 = 23','plus'],['9 − 14','backwards']]],
 ['14 − 9 = 5 undoes…',[['5 + 9 = 14','ok'],['14 + 9 = 23','big'],['9 − 5 = 4','swap']]],
 ['Knowing 13 + 5 = 18, 18 − 5 is…',[['13 — use the inverse','ok'],['must recount from scratch','recount'],['always 18 again','same']]],
 ['Addition and subtraction…',[['undo each other','ok'],['never help each other','never'],['only work with the same sign','sign']]],
 ['Why learn inverse?',[['to check sums and find missing numbers','ok'],['so you never subtract','nosub'],['because add and subtract are the same','sameop']]]];
function why(t){let m='Addition and subtraction undo each other. Use that to check and to find missing numbers.';
 if(t==='again'||t==='ignore'||t==='add7'||t==='only15')m='To undo an add, subtract the same number. Checking uses the reverse.';
 if(t==='plus'||t==='backwards'||t==='big'||t==='swap')m='For □ + 9 = 14, subtract: □ = 14 − 9. Keep the undoing pair.';
 if(t==='recount'||t==='same'||t==='never'||t==='sign')m='Reuse the fact with the inverse — you do not need to recount from scratch.';
 if(t==='nosub'||t==='sameop')m='Inverse helps you check calculations and solve missing-number problems.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Inverse add-subtract controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:()=>{},up:()=>{}});controls()}});
A.start()})})();
