/* Flagship: Comparing and ordering numbers (ages 6–7; CCSS 1.NBT.3 compare two two-digit numbers based on
   meanings of the tens and ones digits, using >, =, and <; NC Y2 NPV compare and order numbers from 0 to 100).
   Place-value compare (tens first, then ones), drag into > = < slots, order three numbers, catch digit-sum and
   reverse-digit myths. Distinct from flagcmpnum (1–10 only), flag2digit (build tens/ones), flagmore (concrete more). */
(()=>{
VIS.reg('flagcmp2d',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['tens','ones','symbol','order','myth','line','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function card(g,n,x,y,w,h,hot){const C=A.col;g.fillStyle=hot?A.alpha(C.ac,.35):A.alpha(C.am,.4);g.beginPath();if(g.roundRect)g.roundRect(x,y,w,h,10);else g.rect(x,y,w,h);g.fill();g.strokeStyle=C.tx;g.lineWidth=hot?4:2;g.stroke();T(String(n),x+w/2,y+h/2,Math.min(28,h*.55),{w:900})}
function place(g,n,x,y){const C=A.col,t=Math.floor(n/10),o=n%10,u=Math.min(A.W,A.H)*.04;
 T(String(n),x,y-u*2.2,18,{w:900});T('tens',x-u*3.2,y-u*1.1,11,{c:C.mu});T('ones',x+u*3.2,y-u*1.1,11,{c:C.mu});
 for(let i=0;i<t;i++){g.fillStyle=C.cy;g.fillRect(x-u*5.2,y+i*u*.95,u*1.6,u*.85);g.strokeStyle=C.tx;g.lineWidth=1;g.strokeRect(x-u*5.2,y+i*u*.95,u*1.6,u*.85)}
 for(let i=0;i<o;i++){g.fillStyle=C.am;g.fillRect(x+u*2.2+(i%3)*u*1.05,y+Math.floor(i/3)*u*1.05,u*.9,u*.9);g.strokeStyle=C.tx;g.strokeRect(x+u*2.2+(i%3)*u*1.05,y+Math.floor(i/3)*u*1.05,u*.9,u*.9)}}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#dcfce7',C.dark?.08:.38);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Compare with > = <',W/2,H*.32,A.narrow?15:18,{w:900});T('Tens first, then ones',W/2,H*.55,A.narrow?12:14,{c:C.mu});A.fx.draw(g);return}
 if(k==='tens'||k==='ones'){T(S.title||'Compare place value',W/2,H*.07,A.narrow?13:15,{w:800});
  place(g,S.a||34,W*.22,H*.28);place(g,S.b||43,W*.78,H*.28);
  T(S.msg||'Look at the tens first.',W/2,H*.92,12,{c:C.mu,max:W*.92});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.62+i*.1);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.08,y-H*.04,W*.84,H*.08);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.08,y-H*.04,W*.84,H*.08);T(String(t),W/2,y,A.narrow?12:13,{max:W*.8})})}
 if(k==='symbol'){T(`${S.a||47}  ?  ${S.b||74}`,W/2,H*.12,A.narrow?18:22,{w:900});
  ['>','=','<'].forEach((sym,i)=>{const x=W*(.18+i*.28),y=H*.42,w=W*.2,h=H*.18;g.fillStyle=S.sym===sym?A.alpha(C.ac,.35):A.alpha(C.tx,.08);g.beginPath();if(g.roundRect)g.roundRect(x,y,w,h,12);else g.rect(x,y,w,h);g.fill();g.strokeStyle=C.tx;g.lineWidth=S.sym===sym?4:2;g.stroke();T(sym,x+w/2,y+h/2,32,{w:900})});
  T(S.msg||'Drag or tap the right symbol.',W/2,H*.78,13,{c:C.mu});T('> means greater · < means less · = means equal',W/2,H*.92,11,{c:C.mu})}
 if(k==='order'){T(S.title||'Order smallest → largest',W/2,H*.08,A.narrow?13:15,{w:800});
  const slots=[{x:W*.06,y:H*.55,w:W*.28,h:H*.22},{x:W*.36,y:H*.55,w:W*.28,h:H*.22},{x:W*.66,y:H*.55,w:W*.28,h:H*.22}];
  slots.forEach((r,i)=>{g.fillStyle=A.alpha(C.tx,.05);g.fillRect(r.x,r.y,r.w,r.h);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(r.x,r.y,r.w,r.h);T(['1st','2nd','3rd'][i],r.x+r.w/2,r.y+14,12,{c:C.mu});
   if(S.slot[i]!=null)card(g,S.nums[S.slot[i]],r.x+r.w*.15,r.y+r.h*.3,r.w*.7,r.h*.5,0)});
  S.nums.forEach((n,i)=>{if(S.slot.includes(i))return;const r={x:W*.08+i*(W*.3),y:H*.2,w:W*.24,h:H*.2};let rr=r;if(S.drag&&S.drag.i===i)rr={...r,x:S.drag.x-r.w/2,y:S.drag.y-r.h/2};card(g,n,rr.x,rr.y,rr.w,rr.h,S.pick===i)});
  T(S.msg||'Drag each number into order, or tap then a slot.',W/2,H*.92,12,{c:C.mu})}
 if(k==='myth'||k==='line'){T(S.title||'Choose',W/2,H*.1,A.narrow?13:15,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.28+i*.2);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.05,y-H*.08,W*.9,H*.16);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.05,y-H*.08,W*.9,H*.16);T(String(t),W/2,y,A.narrow?12:14,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{a:34,b:43,sym:null,nums:[58,29,71],slot:[null,null,null],pick:null,drag:null,picked:null,opts:[],title:'',msg:'',check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*180))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function wantSym(){if(S.a>S.b)return '>';if(S.a<S.b)return '<';return '='}
function put(i,slot){if(S.slot.includes(i)||S.slot[slot]!=null)return;const sorted=[...S.nums].sort((a,b)=>a-b),want=S.nums.indexOf(sorted[slot]);
 if(i===want){S.slot[slot]=i;A.sound.pop();S.msg=`${S.nums[i]} goes ${['first','second','third'][slot]}.`;if(S.slot.every(x=>x!=null))S.msg='Smallest to largest: '+sorted.join(', ')}
 else{A.sound.miss();S.msg=`Look at tens first. ${sorted[slot]} should go ${['first','second','third'][slot]}.`}
 S.pick=null;say(S.msg);A.redraw();S.check()}
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='tens'||kind()==='ones'||kind()==='myth'||kind()==='line')(S.opts||[]).forEach((t,i)=>btn(String(t),()=>{S.picked=i;A.sound.tick();say(String(t));A.redraw();S.check()},'Pick '+t));
 if(kind()==='symbol')['>','=','<'].forEach(sym=>btn(sym,()=>{S.sym=sym;const ok=sym===wantSym();ok?A.sound.pop():A.sound.miss();S.msg=ok?`${S.a} ${sym} ${S.b}`:`Check tens first for ${S.a} and ${S.b}.`;say(S.msg);A.redraw();S.check()},'Choose '+sym));
 if(kind()==='order'){if(S.pick==null)S.nums.forEach((n,i)=>{if(!S.slot.includes(i))btn('Pick '+n,()=>{S.pick=i;say(n+' picked. Choose a slot.');A.redraw();controls()},'Pick '+n)});
  else['1st','2nd','3rd'].forEach((lab,k)=>{if(S.slot[k]==null)btn('Put '+lab,()=>put(S.pick,k),'Put in '+lab)})}}
function down(p){const k=kind();if(k==='chal')return false;
 if(k==='tens'||k==='ones'||k==='myth'||k==='line'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.2)/(A.H*.2))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 if(k==='symbol'){const i=Math.max(0,Math.min(2,Math.floor((p.x-A.W*.18)/(A.W*.28))));S.sym=['>','=','<'][i];A.sound.tick();A.redraw();S.check();return true}
 if(k==='order'){const i=S.nums.findIndex((_,j)=>!S.slot.includes(j)&&p.x>=A.W*.08+j*(A.W*.3)&&p.x<=A.W*.08+j*(A.W*.3)+A.W*.24&&p.y>=A.H*.2&&p.y<=A.H*.4);
  if(i>=0){S.drag={i,x:p.x,y:p.y};S.pick=i;A.redraw();return true}
  const slot=Math.max(0,Math.min(2,Math.floor((p.x-A.W*.06)/(A.W*.3))));if(S.pick!=null&&p.y>A.H*.55)put(S.pick,slot);return false}
 return true}
function move(p){if(S.drag){S.drag.x=p.x;S.drag.y=p.y;A.redraw()}}
function up(p){const d=S.drag;S.drag=null;if(!p||!d||kind()!=='order'){A.redraw();return}
 const slot=Math.max(0,Math.min(2,Math.floor((p.x-A.W*.06)/(A.W*.3))));if(p.y>A.H*.5)put(d.i,slot);else A.redraw()}
const steps=[
{h:'Tens first',p:'To compare two two-digit numbers, look at the tens digit first. More tens means a greater number, even if the ones look bigger.',
 predict:{q:'Which is greater: 34 or 43?',opts:['43','34','They are equal'],ans:0},
 task:'Tap why 43 is greater',show:()=>auto(0,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'34 and 43 — tens first',a:34,b:43,opts:['43 has more tens (4 > 3)','34 has a bigger ones digit','Add the digits: 3+4 = 4+3'],picked:null});say('Why is 43 greater?');controls();S.check=finish(0,()=>S.picked===0,'43 has 4 tens; 34 has only 3 tens.')}},
{h:'Then ones',p:'When the tens digits match, compare the ones. 58 and 52 both have 5 tens, so the ones decide.',
 predict:{q:'58 and 52 have the same tens. Which is greater?',opts:['58','52','They match'],ans:0},
 task:'Tap the greater number rule',show:()=>auto(1,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Same tens — compare ones',a:58,b:52,opts:['58: ones 8 > 2','52: swap the digits of 58','Add ones: 8 + 2'],picked:null});say('Same tens. Compare ones.');controls();S.check=finish(1,()=>S.picked===0,'Same 5 tens; 8 ones beat 2 ones, so 58 > 52.')}},
{h:'Use > = <',p:'Write the comparison with a symbol. > means greater than, < means less than, = means equal. 47 < 74 because 4 tens is less than 7 tens.',
 predict:{q:'Which symbol fits 47 ? 74?',opts:['<','>','='],ans:0},
 task:'Choose the correct symbol for 47 and 74',show:()=>auto(2,[()=>{S.sym='<';A.redraw();S.check()}]),
 go:()=>{reset({a:47,b:74,sym:null,msg:'Pick > = or <.'});say('Compare 47 and 74.');controls();S.check=finish(2,()=>S.sym==='<','47 < 74. Four tens is less than seven tens.')}},
{h:'Order three',p:'Order means smallest to largest. Compare tens first for each pair, then ones when tens match.',
 predict:{q:'Smallest to largest for 58, 29, 71?',opts:['29, 58, 71','58, 29, 71','71, 58, 29'],ans:0},
 task:'Put 29, 58 and 71 in order',show:()=>auto(3,[()=>{S.slot=[1,0,2];A.redraw();S.check()}]),
 go:()=>{reset({nums:[58,29,71],slot:[null,null,null],title:'Order 58, 29, 71'});say('Order smallest to largest.');controls();S.check=finish(3,()=>S.slot[0]===1&&S.slot[1]===0&&S.slot[2]===2,'29, 58, 71. Tens decide: 2, then 5, then 7.')}},
{h:'Catch a mix-up',p:'A common slip is adding the digits (3+4 vs 4+3) or flipping them (reading 34 as 43). Place value, not digit sum, decides size.',
 predict:{q:'Which is the mix-up?',opts:['34 > 43 because 3+4 = 4+3','Compare tens first','When tens match, compare ones'],ans:0},
 task:'Tap the mix-up',show:()=>auto(4,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Which is the mix-up?',opts:['34 > 43 because 3+4 = 4+3','Compare tens first','When tens match, compare ones'],picked:null});say('Find the mix-up.');controls();S.check=finish(4,()=>S.picked===0,'Digit sums match, but 34 has fewer tens than 43, so 34 < 43.')}},
{h:'Equal tens and ones',p:'Equal means the same tens and the same ones. 40 = 40. Writing 4 tens 0 ones is not the same as 4 ones.',
 predict:{q:'Which pair is equal?',opts:['40 = 40','40 = 4','40 = 04 as four'],ans:0},
 task:'Tap the equal pair',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'When are two numbers equal?',opts:['40 = 40','40 = 4','40 equals its digit sum 4'],picked:null});say('Which pair is equal?');controls();S.check=finish(5,()=>S.picked===0,'Equal means the same value: 40 equals 40.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
function makeQ(){const pool=[[36,63,'<'],[81,18,'>'],[55,55,'='],[47,49,'<'],[70,69,'>'],[22,22,'='],[91,19,'>']];return pool[qi%pool.length]}
function why(t,Q){let m=`Compare tens first, then ones. ${Q[0]} ${Q[2]} ${Q[1]}.`;
 if(t==='flip')m=`You flipped the digits. ${Q[0]} and ${Q[1]} keep their own tens and ones.`;
 if(t==='sum')m=`Do not add the digits. Place value decides which number is greater.`;
 if(t==='opp')m=`That symbol goes the wrong way. Greater means more, so the open side of > faces the larger number.`;
 if(t==='eq')m=`Equal only when both tens and ones match.`;
 return m}
function ask(){qi++;const Q=makeQ(),a=Q[0],b=Q[1],ans=Q[2];
 const opts=[[ans,'ok'],[ans==='>'?'<':ans==='<'?'>':'≠','opp'],[a===b?'>':'=','eq']];
 chal.innerHTML=`<p><b>Which symbol: ${a} ? ${b}?</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');const sh=(qi+1)%3;[...opts.slice(sh),...opts.slice(0,sh)].forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,String(v)).onclick=()=>mark(t,Q)});say('Challenge: '+a+' compared with '+b);A.redraw()}
function mark(t,Q){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){A.win()}else A.sound.miss();fb.innerHTML=(ok?'✓ Yes. Tens first, then ones.':'✗ '+why(t,Q))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.7,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Compare controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});controls()}});
A.start()})})();
