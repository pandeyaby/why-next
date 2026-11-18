/* Flagship: number bonds to 10 (topic "Number bonds to 9"; ages 4-6; CCSS K.OA.4 / NC Y1 — find the number that
   makes 10 with a given 1-9). Fill a ten-frame, find the empty spaces, match pairs that make 10, complete equations,
   and snap quick bonds. Every tap has a button twin. */
(()=>{
VIS.reg('flagnbonds',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['fill','empty','pairs','eq','snap','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function frame(x,y,u,filled,emptyGlow){const g=A.ctx,C=A.col;g.strokeStyle=C.tx;g.lineWidth=3;g.strokeRect(x,y,u*5,u*2);
 for(let i=0;i<10;i++){const cx=x+(i%5)*u+u*.5,cy=y+Math.floor(i/5)*u+u*.5;g.beginPath();g.arc(cx,cy,u*.32,0,7);
  if(i<filled){g.fillStyle=C.ac;g.fill()}else if(emptyGlow){g.fillStyle=A.alpha(C.or,.25);g.fill()}
  g.strokeStyle=C.tx;g.lineWidth=2;g.stroke()}}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind(),u=Math.min(W/11,H*.11);
 g.fillStyle=A.mix(C.pn,'#dbeafe',C.dark?.05:.35);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Pairs that make 10',W/2,H*.26,A.narrow?16:20,{w:900});T('1+9  2+8  3+7  4+6  5+5',W/2,H*.46,A.narrow?14:17);T('6+4  7+3  8+2  9+1  10+0',W/2,H*.64,A.narrow?14:17,{c:C.mu});A.fx.draw(g);return}
 const fx=(W-5*u)/2,fy=H*.2;
 if(k==='fill'||k==='empty'){frame(fx,fy,u,S.filled,k==='empty');
  T(k==='fill'?(S.filled<S.given?`Put ${S.given} in the ten-frame`:`${S.given} in the frame`):`How many empty? ${S.filled} full`,W/2,H*.08,A.narrow?13:15,{w:800});
  if(k==='empty'){S.choices.forEach((o,i)=>{const r={x:10+i*((W-40)/3+10),y:H*.72,w:(W-40)/3,h:H*.16};
   g.fillStyle=A.alpha(C.vi,.14);A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=C.tx;g.stroke();T(String(o),r.x+r.w/2,r.y+r.h/2,22,{w:800})})}
  else T(`${S.filled} of ${S.given}`,W/2,H*.88,16,{c:C.mu})}
 if(k==='pairs'){T(S.pairDone>=S.pairs.length?'All pairs that make 10!':`Tap the partner of ${S.pairs[S.pairDone][0]} to make 10`,W/2,H*.08,A.narrow?13:15,{w:800});
  const n=S.pairs[Math.min(S.pairDone,S.pairs.length-1)][0];
  frame(W*.08,H*.22,u*.85,n,false);frame(W*.52,H*.22,u*.85,S.picked||0,true);
  T(String(n),W*.08+u*2.1,H*.22+u*2.5,18);T(S.picked?String(S.picked):'?',W*.52+u*2.1,H*.22+u*2.5,18);
  T(`${n} + ${S.picked||'?'} = ${S.picked?n+S.picked:'?'}`,W/2,H*.88,18,{w:900})}
 if(k==='eq'){T(S.eqDone>=S.eqs.length?'Equations done!':`What goes in the box? ${S.eqs[S.eqDone][0]} + □ = 10`,W/2,H*.2,A.narrow?14:17,{w:800});
  T(`${S.eqs[Math.min(S.eqDone,S.eqs.length-1)][0]} + ? = 10`,W/2,H*.42,28,{w:900});
  if(S.eqDone<S.eqs.length)S.eqChoices.forEach((o,i)=>{const r={x:10+i*((W-40)/3+10),y:H*.62,w:(W-40)/3,h:H*.18};
   g.fillStyle=A.alpha(C.gr,.14);A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=C.tx;g.stroke();T(String(o),r.x+r.w/2,r.y+r.h/2,24,{w:800})})}
 if(k==='snap'){T(S.snapDone>=S.snaps.length?'Quick bonds done!':`Fast! ${S.snaps[S.snapDone]} needs…`,W/2,H*.2,A.narrow?15:18,{w:800});
  T(String(S.snaps[Math.min(S.snapDone,S.snaps.length-1)]),W/2,H*.42,48,{w:900});
  if(S.snapDone<S.snaps.length)S.snapChoices.forEach((o,i)=>{const r={x:10+i*((W-40)/3+10),y:H*.62,w:(W-40)/3,h:H*.18};
   g.fillStyle=A.alpha(C.or,.16);A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=C.tx;g.stroke();T(String(o),r.x+r.w/2,r.y+r.h/2,24,{w:800})})}
 A.fx.draw(g)}
function addFill(){if(S.filled>=S.given)return;S.filled++;A.sound.tick();say(S.filled+' in the frame.');A.redraw();S.check()}
function pickEmpty(o){const want=10-S.filled;if(o!==want){A.sound.miss();say('Count the empty spaces. '+S.filled+' full means '+(10-S.filled)+' empty, not '+o+'.');return}
 A.sound.pop();S.gotEmpty=1;say('Yes! '+S.filled+' + '+want+' = 10.');A.redraw();S.check()}
function pickPartner(o){if(S.pairDone>=S.pairs.length)return;const need=S.pairs[S.pairDone][1];
 if(o!==need){A.sound.miss();say(S.pairs[S.pairDone][0]+' needs '+need+' to make 10, not '+o+'.');return}
 S.picked=o;A.sound.pop();say(S.pairs[S.pairDone][0]+' + '+o+' = 10.');S.pairDone++;
 setTimeout(()=>{S.picked=0;if(S.pairDone<S.pairs.length)say('Now the partner of '+S.pairs[S.pairDone][0]+'.');A.redraw();controls()},A.reduced()?5:700);
 A.redraw();S.check()}
function pickEq(o){if(S.eqDone>=S.eqs.length)return;const need=S.eqs[S.eqDone][1];
 if(o!==need){A.sound.miss();say(S.eqs[S.eqDone][0]+' + '+need+' = 10. Try again.');return}
 A.sound.pop();say(S.eqs[S.eqDone][0]+' + '+o+' = 10.');S.eqDone++;
 if(S.eqDone<S.eqs.length){const n=S.eqs[S.eqDone][1];S.eqChoices=shuf([n,n===5?4:5,(n%9)+1])}
 A.redraw();controls();S.check()}
function pickSnap(o){if(S.snapDone>=S.snaps.length)return;const n=S.snaps[S.snapDone],need=10-n;
 if(o!==need){A.sound.miss();say(n+' and '+need+' make 10, not '+o+'.');return}
 A.sound.pop();say(n+' + '+o+' = 10.');S.snapDone++;
 if(S.snapDone<S.snaps.length){const n2=S.snaps[S.snapDone],w=10-n2;S.snapChoices=shuf([w,w===1?2:1,(w%8)+1])}
 A.redraw();controls();S.check()}
function shuf(a){return [a[0],a[2],a[1]]}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{filled:0,given:7,gotEmpty:0,choices:[3,7,10],pairs:[[7,3],[4,6],[9,1]],pairDone:0,picked:0,eqs:[[6,4],[2,8],[8,2]],eqDone:0,eqChoices:[4,5,3],snaps:[3,9,5,1],snapDone:0,snapChoices:[7,2,6],check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*280))}
function controls(){if(!ctl)return;ctl.innerHTML='';const k=kind(),btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||null},ctl,t).onclick=f};if(k==='chal')return;
 if(k==='fill'&&S.filled<S.given)btn('Add one',addFill,'Add one counter to the ten-frame');
 if(k==='empty'&&!S.gotEmpty)S.choices.forEach(o=>btn(String(o)+' empty',()=>pickEmpty(o),'There are '+o+' empty spaces'));
 if(k==='pairs'&&S.pairDone<S.pairs.length){const opts=shuf([S.pairs[S.pairDone][1],(S.pairs[S.pairDone][1]%8)+1,10-S.pairs[S.pairDone][1]===5?4:5]);
  opts.forEach(o=>btn('Partner '+o,()=>pickPartner(o),'Use '+o+' as the partner'))}
 if(k==='eq'&&S.eqDone<S.eqs.length)S.eqChoices.forEach(o=>btn(String(o),()=>pickEq(o),'Put '+o+' in the box'));
 if(k==='snap'&&S.snapDone<S.snaps.length)S.snapChoices.forEach(o=>btn(String(o),()=>pickSnap(o),'Bond with '+o))}
function down(p){const k=kind();if(k==='chal')return false;
 if(k==='fill'){addFill();return true}
 if(k==='empty'&&!S.gotEmpty){const w=(A.W-40)/3;S.choices.forEach((o,i)=>{if(p.x>=10+i*(w+10)&&p.x<=10+i*(w+10)+w&&p.y>=A.H*.72)pickEmpty(o)});return true}
 if(k==='pairs'&&S.pairDone<S.pairs.length){pickPartner(S.pairs[S.pairDone][1]);return true}
 if(k==='eq'&&S.eqDone<S.eqs.length){const w=(A.W-40)/3;S.eqChoices.forEach((o,i)=>{if(p.x>=10+i*(w+10)&&p.x<=10+i*(w+10)+w&&p.y>=A.H*.62)pickEq(o)});return true}
 if(k==='snap'&&S.snapDone<S.snaps.length){const w=(A.W-40)/3;S.snapChoices.forEach((o,i)=>{if(p.x>=10+i*(w+10)&&p.x<=10+i*(w+10)+w&&p.y>=A.H*.62)pickSnap(o)});return true}
 return false}
const steps=[
{h:'Fill some',p:'A ten-frame has ten spaces. Put 7 counters in. Leave the rest empty.',
 predict:{q:'A ten-frame has how many spaces?',opts:['10','7','5'],ans:0},
 task:'Put 7 counters in the ten-frame',show:()=>auto(0,Array(7).fill(addFill)),
 go:()=>{reset({given:7,filled:0});say('Put seven counters in.');controls();S.check=finish(0,()=>S.filled>=7,'7 counters in. 3 spaces stay empty.')}},
{h:'Count the empty',p:'Seven are full. How many empty spaces to make 10? Those empty spaces are the bond partner.',
 predict:{q:'7 counters are in. How many empty to make 10?',opts:['3','7','10'],ans:0},
 task:'Choose how many are empty',show:()=>auto(1,[()=>pickEmpty(3)]),
 go:()=>{reset({filled:7,given:7,choices:[3,7,10],gotEmpty:0});say('How many empty spaces?');controls();S.check=finish(1,()=>S.gotEmpty,'7 + 3 = 10. Three is the bond partner of seven.')}},
{h:'Match pairs',p:'Find the partner that makes 10. 7 needs 3. 4 needs 6. 9 needs 1.',
 predict:{q:'What is the partner of 4 to make 10?',opts:['6','4','14'],ans:0},
 task:'Match 3 pairs that make 10',show:()=>auto(2,[()=>pickPartner(3),()=>pickPartner(6),()=>pickPartner(1)]),
 go:()=>{reset({pairs:[[7,3],[4,6],[9,1]],pairDone:0,picked:0});say('Find each partner.');controls();S.check=finish(2,()=>S.pairDone>=3,'7+3, 4+6 and 9+1 all make 10.')}},
{h:'Finish the equation',p:'Read 6 + □ = 10. What number goes in the box?',
 task:'Complete 3 equations',show:()=>auto(3,[()=>pickEq(4),()=>pickEq(8),()=>pickEq(2)]),
 go:()=>{reset({eqs:[[6,4],[2,8],[8,2]],eqDone:0,eqChoices:[4,5,3]});say('What goes in the box?');controls();S.check=finish(3,()=>S.eqDone>=3,'6+4, 2+8 and 8+2 all equal 10.')}},
{h:'Quick bonds',p:'See a number. Snap its partner to 10 as fast as you can.',
 predict:{q:'The partner of 9 to make 10 is…',opts:['1','9','10'],ans:0},
 task:'Snap 4 quick bonds',show:()=>auto(4,[()=>pickSnap(7),()=>pickSnap(1),()=>pickSnap(5),()=>pickSnap(9)]),
 go:()=>{reset({snaps:[3,9,5,1],snapDone:0,snapChoices:[7,2,6]});say('Quick! Partner to 10.');controls();S.check=finish(4,()=>S.snapDone>=4,'3+7, 9+1, 5+5 and 1+9 make 10.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['7 + ? = 10',[['3','ok'],['7','same'],['17','teen']]],
 ['Which pair makes 10?',[['4 + 6','ok'],['4 + 4','half'],['5 + 6','eleven']]],
 ['Partner of 1 to make 10?',[['9','ok'],['1','same'],['10','ten']]],
 ['5 + 5 =',[['10','ok'],['55','digits'],['0','zero']]],
 ['8 needs what to make 10?',[['2','ok'],['8','same'],['18','teen']]],
 ['Why do we learn bonds to 10?',[['so we can make 10 quickly without counting all','ok'],['so we can skip counting forever','skip'],['because 10 is unlucky','luck']]],
 ['9 + 2 =',[['11, not a bond to 10','ok'],['10','force'],['92','digits']]]];
function why(t){let m='Number bonds to 10 are pairs that add to exactly 10.';
 if(t==='same')m='The partner is what you ADD, not the same number again (unless it is 5 + 5).';
 if(t==='teen')m='That makes a teen, bigger than 10. For a bond to 10, stop at 10.';
 if(t==='half')m='4 + 4 = 8, not 10. 4 needs 6.';
 if(t==='eleven')m='5 + 6 = 11. Too much. 5 needs another 5.';
 if(t==='ten')m='1 + 10 = 11. The partner of 1 is 9.';
 if(t==='digits')m='Do not stick the digits together. Add the values: 5 + 5 = 10.';
 if(t==='zero')m='5 + 5 is 10, not 0.';
 if(t==='skip')m='Bonds help you be quick. You still count when you need to.';
 if(t==='luck')m='10 matters because our number system is built on tens, not because of luck.';
 if(t==='force')m='9 + 2 is 11. To make 10 from 9 you only need 1.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+2)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.6,tall:1.12,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Number bond controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:()=>{},up:()=>{}});controls()}});
A.start()})})();
