/* Flagship: A hundred is ten tens (ages 7–8; Y2/2.NBT.A.1 place value).
   Bundle 10 tens into 1 hundred flat; read hundreds/tens; swap 10 tens for a hundred (total same);
   build 100/200/130 on a chart; compare flats vs loose tens; reject “a hundred is 10 ones” and digit-order slips; challenge.
   Distinct from ten=ten ones (flagbundle) and counting within 1000 hops (flaghund). */
(()=>{
VIS.reg('flagtenten',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['bundle','read','swap','build','more','myth','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function rod(g,x,y,u){const{col:C}=A;for(let i=0;i<10;i++){g.fillStyle=A.alpha(C.or,.85);g.fillRect(x,y+i*(u*.1),u*.9,u*.09);g.strokeStyle=C.tx;g.lineWidth=1;g.strokeRect(x,y+i*(u*.1),u*.9,u*.09)}g.lineWidth=2.5;g.strokeStyle=C.tx;g.strokeRect(x-1,y-1,u*.9,u)}
function flat(g,x,y,u){const{col:C}=A;g.fillStyle=A.alpha(C.am,.55);g.fillRect(x,y,u,u*.7);g.strokeStyle=C.tx;g.lineWidth=2.5;g.strokeRect(x,y,u,u*.7);
 for(let r=0;r<10;r++)for(let c=0;c<10;c++){g.strokeStyle=A.alpha(C.tx,.35);g.lineWidth=1;g.strokeRect(x+c*(u/10),y+r*(u*.07),u/10,u*.07)}
 T('100',x+u/2,y+u*.35,A.narrow?12:14,{w:800})}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind(),u=Math.min(W,H)*.22;g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.08:.4);g.fillRect(0,0,W,H);
 if(k==='chal'){T('10 tens = 1 hundred',W/2,H*.35,A.narrow?16:18,{w:900});T('Place value · flats and rods',W/2,H*.58,A.narrow?12:14,{c:C.mu});A.fx.draw(g);return}
 if(k==='bundle'){T('Bundle 10 tens into 1 hundred',W/2,H*.08,A.narrow?13:15,{w:800});
  for(let i=0;i<Math.min(S.tens||0,10);i++)rod(g,W*.08+i*(W*.07),H*.22,u*.9);
  if(S.flat)flat(g,W*.35,H*.22,u*1.4);
  T(S.msg||`Tens in tray: ${S.tens||0} of 10`,W/2,H*.88,A.narrow?12:14,{c:C.mu})}
 if(k==='read'){T('How many?',W/2,H*.08,A.narrow?14:16,{w:800});
  if(S.h)flat(g,W*.12,H*.22,u*1.2);for(let i=0;i<(S.t||0);i++)rod(g,W*.55+i*(W*.08),H*.22,u);
  T(S.msg||`${S.h||0} hundred and ${S.t||0} tens`,W/2,H*.88,A.narrow?12:14,{c:C.mu})}
 if(k==='swap'){T('Swap 10 tens for 1 hundred',W/2,H*.08,A.narrow?13:15,{w:800});
  if(S.flat)flat(g,W*.35,H*.25,u*1.3);else for(let i=0;i<(S.tens||0);i++)rod(g,W*.1+i*(W*.07),H*.25,u*.85);
  T(S.msg||`Tens: ${S.tens||0}. Total cubes stay the same.`,W/2,H*.88,A.narrow?12:14,{c:C.mu,max:W*.92})}
 if(k==='build'){T(`Make ${S.target||100}`,W/2,H*.08,A.narrow?14:16,{w:800});
  for(let i=0;i<(S.h||0);i++)flat(g,W*.12+i*(u*1.1),H*.22,u);for(let i=0;i<(S.t||0);i++)rod(g,W*.55+i*(W*.07),H*.22,u*.9);
  T(S.msg||`Now ${ (S.h||0)*100+(S.t||0)*10 }`,W/2,H*.88,A.narrow?13:15,{c:C.mu})}
 if(k==='more'){T('Which side has MORE?',W/2,H*.08,A.narrow?14:16,{w:800});
  g.fillStyle=A.alpha(C.vi,.12);g.fillRect(W*.04,H*.18,W*.42,H*.55);g.fillStyle=A.alpha(C.gr,.12);g.fillRect(W*.54,H*.18,W*.42,H*.55);
  flat(g,W*.12,H*.28,u);for(let i=0;i<12;i++)rod(g,W*.58+(i%4)*(W*.07),H*.22+Math.floor(i/4)*(u*.55),u*.7);
  T('1 hundred',W*.25,H*.8,12,{c:C.mu});T('12 tens',W*.75,H*.8,12,{c:C.mu});T(S.msg||'Tap a side',W/2,H*.94,12,{c:C.mu})}
 if(k==='myth'){T('Tap the true sentence',W/2,H*.1,A.narrow?14:16,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.28+i*.2);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.05,y-H*.08,W*.9,H*.16);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.05,y-H*.08,W*.9,H*.16);T(t,W/2,y,A.narrow?11:13,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{tens:0,flat:0,h:0,t:0,target:100,picked:null,msg:'',opts:[],check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*240))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='bundle'){btn('Add a ten',()=>{if(S.flat)return;S.tens=Math.min(10,(S.tens||0)+1);S.msg=`${S.tens} tens`;if(S.tens>=10){S.flat=1;S.msg='10 tens make 1 hundred!'}A.sound.tick();say(S.msg);A.redraw();S.check()},'Add one ten rod')}
 if(kind()==='read'){[['100',1],['110',0],['10',0],['200',0]].forEach(([lab,ok])=>btn(lab,()=>{S.picked=ok?1:0;S.msg=ok?'1 hundred and 1 ten = 110':'Not that — count hundreds then tens';ok?A.sound.tick():A.sound.miss();say(S.msg);A.redraw();S.check()},'Choose '+lab))}
 if(kind()==='swap'){btn('Swap for 1 hundred',()=>{if((S.tens||0)<10){A.sound.miss();say('Need 10 tens first');return}S.flat=1;S.tens=0;S.msg='Still 100 cubes — just regrouped';A.sound.tick();say(S.msg);A.redraw();S.check()},'Swap ten tens for one hundred')}
 if(kind()==='build'){btn('+ hundred',()=>{S.h=(S.h||0)+1;S.msg=`${S.h*100+(S.t||0)*10}`;A.sound.tick();say(S.msg);A.redraw();S.check()},'Add a hundred');btn('+ ten',()=>{S.t=(S.t||0)+1;if(S.t>=10){S.t-=10;S.h=(S.h||0)+1;S.msg='10 tens → +1 hundred'}else S.msg=`${(S.h||0)*100+S.t*10}`;A.sound.tick();say(S.msg);A.redraw();S.check()},'Add a ten');btn('Clear',()=>{S.h=0;S.t=0;S.msg='Cleared';A.sound.tick();A.redraw()},'Clear')}
 if(kind()==='more'){btn('Left (1 hundred)',()=>{S.picked=0;S.msg='1 hundred = 100; 12 tens = 120 — right has more';A.sound.miss();say(S.msg);A.redraw()},'Left');btn('Right (12 tens)',()=>{S.picked=1;S.msg='Yes — 12 tens = 120 > 100';A.sound.tick();say(S.msg);A.redraw();S.check()},'Right')}
 if(kind()==='myth')(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();say(t);A.redraw();S.check()},'Pick: '+t))}
function down(p){if(kind()==='chal')return false;
 if(kind()==='bundle'){S.tens=Math.min(10,(S.tens||0)+1);if(S.tens>=10)S.flat=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='swap'){if((S.tens||0)>=10){S.flat=1;S.tens=0;A.sound.tick();A.redraw();S.check()}return true}
 if(kind()==='build'){if(p.x<A.W/2)S.h=(S.h||0)+1;else{S.t=(S.t||0)+1;if(S.t>=10){S.t-=10;S.h=(S.h||0)+1}}A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='more'){S.picked=p.x<A.W/2?0:1;if(S.picked===1){A.sound.tick();S.check()}else A.sound.miss();A.redraw();return true}
 if(kind()==='myth'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.2)/(A.H*.2))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='read'){S.picked=1;A.sound.tick();A.redraw();S.check();return true}
 return true}
const steps=[
{h:'Bundle ten tens',p:'Ten rods of ten make one hundred flat. Place value: the hundreds place holds groups of 100.',
 predict:{q:'10 tens make…',opts:['1 hundred','10 ones','1 ten'],ans:0},
 task:'Put 10 tens in the tray',show:()=>auto(0,[...Array(10)].map((_,i)=>()=>{S.tens=i+1;if(S.tens>=10)S.flat=1;A.redraw();S.check()})),
 go:()=>{reset({tens:0});say('Add tens until you make a hundred.');controls();S.check=finish(0,()=>S.flat,'10 tens = 1 hundred.')}},
{h:'Read hundreds and tens',p:'1 hundred flat and 1 ten rod is 110. Read hundreds first, then tens.',
 predict:{q:'1 hundred and 1 ten is…',opts:['110','11','101'],ans:0},
 task:'Choose 110',show:()=>auto(1,[()=>{S.h=1;S.t=1;S.picked=1;A.redraw();S.check()}]),
 go:()=>{reset({h:1,t:1,picked:null});say('How many in all?');controls();S.check=finish(1,()=>S.picked===1,'Hundreds then tens: 110.')}},
{h:'Swap tens for a hundred',p:'Circle 10 tens and swap them for 1 hundred. The total number of ones stays 100.',
 predict:{q:'Swap 10 tens for 1 hundred. How many ones now?',opts:['The same (100)','10 fewer','10 more'],ans:0},
 task:'Swap for 1 hundred',show:()=>auto(2,[()=>{S.tens=10;A.redraw()},()=>{S.flat=1;S.tens=0;A.redraw();S.check()}]),
 go:()=>{reset({tens:10,flat:0});say('Swap 10 tens for 1 hundred.');controls();S.check=finish(2,()=>S.flat,'Regrouping keeps the total the same.')}},
{h:'Build a number',p:'Make 100 with one flat, then try 200 and 130 (1 hundred and 3 tens).',
 predict:{q:'130 is…',opts:['1 hundred and 3 tens','13 tens only as 13','1 ten and 3 hundreds'],ans:0},
 task:'Build 100',show:()=>auto(3,[()=>{S.h=1;S.t=0;A.redraw();S.check()}]),
 go:()=>{reset({h:0,t:0,target:100});say('Make 100.');controls();S.check=finish(3,()=>(S.h||0)*100+(S.t||0)*10>=100,'1 hundred = 100.')}},
{h:'Compare flats and tens',p:'One hundred flat is 100. Twelve loose tens are 120. More pieces is not always more value — count place value.',
 predict:{q:'1 hundred vs 12 tens: which is more?',opts:['12 tens (120)','1 hundred (100)','They are equal'],ans:0},
 task:'Pick the side with more',show:()=>auto(4,[()=>{S.picked=1;A.redraw();S.check()}]),
 go:()=>{reset({picked:null});say('Which side has more ones?');controls();S.check=finish(4,()=>S.picked===1,'12 tens = 120 > 100.')}},
{h:'True place-value idea',p:'A hundred is ten tens — not ten ones, and not “1” in the ones place.',
 predict:{q:'A hundred is…',opts:['ten tens','ten ones','one ten'],ans:0},
 task:'Tap the true sentence',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['A hundred is ten tens','A hundred is ten ones','A hundred is one ten'],picked:null});say('Tap the true idea.');controls();S.check=finish(5,()=>S.picked===0,'Hundreds place: groups of 100 = ten tens.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['10 tens make…',[['1 hundred','ok'],['10 ones','ones'],['1 ten','ten']]],
 ['1 hundred and 1 ten is…',[['110','ok'],['11','eleven'],['101','flip']]],
 ['Swap 10 tens for 1 hundred. Ones now?',[['The same (100)','ok'],['10 fewer','less'],['10 more','more']]],
 ['130 is…',[['1 hundred and 3 tens','ok'],['13 ones','ones'],['3 hundreds and 1 ten','flip']]],
 ['1 hundred vs 12 tens — more is…',[['12 tens (120)','ok'],['1 hundred','flat'],['equal','eq']]],
 ['A hundred is…',[['ten tens','ok'],['ten ones','ones'],['one ten','ten']]],
 ['Why regroup tens into a hundred?',[['same total, clearer place value','ok'],['to make the number smaller','small'],['because tens disappear','gone']]]];
function why(t){let m='A hundred is ten tens. Read hundreds, then tens.';
 if(t==='ones'||t==='ten')m='Ten tens make one hundred — not ten ones, and not a single ten.';
 if(t==='eleven'||t==='flip')m='Hundreds first: 1 hundred and 1 ten is 110, not 11 or 101.';
 if(t==='less'||t==='more')m='Regrouping keeps the total: 10 tens and 1 hundred are both 100 ones.';
 if(t==='flat'||t==='eq')m='12 tens = 120 ones, which is more than 1 hundred (100).';
 if(t==='small'||t==='gone')m='Regroup to show place value clearly — the total stays the same.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Hundred tens controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:()=>{},up:()=>{}});controls()}});
A.start()})})();
