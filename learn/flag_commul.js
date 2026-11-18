/* Flagship: Commutative Multiplication (ages 6–7; Y2 / 3.OA.B.5 arrays).
   Build a×b array, flip to b×a (same dots), match equal products, reject "order always changes total",
   then challenge. Distinct from repeated-addition intro and times-tables drill. */
(()=>{
VIS.reg('flagcommul',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['build','flip','same','match','myth','make','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function array(g,r,c,x0,y0,cell){const{col:C}=A;for(let i=0;i<r;i++)for(let j=0;j<c;j++){const x=x0+j*cell,y=y0+i*cell;g.fillStyle=A.alpha(C.or,.85);g.beginPath();g.arc(x,y,cell*.32,0,6.3);g.fill();g.strokeStyle=C.tx;g.lineWidth=1.5;g.stroke()}}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind(),cell=Math.min(W,H)*.09;g.fillStyle=A.mix(C.pn,'#fce7f3',C.dark?.08:.4);g.fillRect(0,0,W,H);
 if(k==='chal'){T('a×b = b×a',W/2,H*.35,A.narrow?18:20,{w:900});T('Same dots · flipped array',W/2,H*.58,A.narrow?12:14,{c:C.mu});A.fx.draw(g);return}
 if(k==='build'){T(`Build ${S.r||3} rows of ${S.c||4}`,W/2,H*.08,A.narrow?13:15,{w:800});array(g,S.r||0,S.c||0,W*.2,H*.25,cell);T(S.msg||`${(S.r||0)}×${(S.c||0)} = ${(S.r||0)*(S.c||0)} dots`,W/2,H*.9,12,{c:C.mu})}
 if(k==='flip'){T('Flip the array',W/2,H*.08,A.narrow?14:16,{w:800});
  array(g,S.r||3,S.c||4,W*.12,H*.28,cell*.9);T(`${S.r||3}×${S.c||4}`,W*.28,H*.18,12,{c:C.mu});
  if(S.flipped){array(g,S.c||4,S.r||3,W*.58,H*.28,cell*.9);T(`${S.c||4}×${S.r||3}`,W*.72,H*.18,12,{c:C.mu})}
  T(S.msg||'Tap Flip',W/2,H*.9,12,{c:C.mu})}
 if(k==='same'){T('Same dots?',W/2,H*.08,A.narrow?14:16,{w:800});
  array(g,2,5,W*.12,H*.3,cell*.85);array(g,5,2,W*.58,H*.22,cell*.85);T('2×5',W*.28,H*.18,12,{c:C.mu});T('5×2',W*.72,H*.18,12,{c:C.mu});
  T(S.msg||'Do both show 10?',W/2,H*.9,12,{c:C.mu})}
 if(k==='match'){T('Which pair matches?',W/2,H*.1,A.narrow?14:16,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.28+i*.2);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.05,y-H*.08,W*.9,H*.16);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.05,y-H*.08,W*.9,H*.16);T(t,W/2,y,A.narrow?12:14,{max:W*.84})})}
 if(k==='myth'){T('True idea?',W/2,H*.1,A.narrow?14:16,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.28+i*.2);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.05,y-H*.08,W*.9,H*.16);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.05,y-H*.08,W*.9,H*.16);T(t,W/2,y,A.narrow?11:13,{max:W*.84})})}
 if(k==='make'){T(`Make ${S.target||12} two ways`,W/2,H*.08,A.narrow?13:15,{w:800});
  array(g,S.r||0,S.c||0,W*.35,H*.28,cell);T(S.msg||`${S.r||0}×${S.c||0} = ${(S.r||0)*(S.c||0)}`,W/2,H*.9,13,{c:C.mu})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{r:0,c:0,flipped:0,picked:null,msg:'',opts:[],target:12,check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*220))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='build'){btn('+ row',()=>{S.r=Math.min(5,(S.r||0)+1);if(!S.c)S.c=4;S.msg=`${S.r}×${S.c}`;A.sound.tick();say(S.msg);A.redraw();S.check()},'Add a row');btn('Set 3×4',()=>{S.r=3;S.c=4;S.msg='3×4 = 12';A.sound.tick();say(S.msg);A.redraw();S.check()},'Build 3 by 4')}
 if(kind()==='flip')btn('Flip array',()=>{S.flipped=1;S.msg=`${S.r}×${S.c} and ${S.c}×${S.r} — same ${(S.r)*(S.c)} dots`;A.sound.tick();say(S.msg);A.redraw();S.check()},'Flip rows and columns');
 if(kind()==='same'){btn('Yes, both 10',()=>{S.picked=1;S.msg='Same product — commute!';A.sound.tick();say(S.msg);A.redraw();S.check()},'Same');btn('No, different',()=>{S.picked=0;S.msg='Count again — both are 10';A.sound.miss();say(S.msg);A.redraw()},'Different')}
 if(kind()==='match'||kind()==='myth')(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();say(t);A.redraw();S.check()},'Pick: '+t));
 if(kind()==='make'){btn('3×4',()=>{S.r=3;S.c=4;S.msg='3×4 = 12';A.sound.tick();say(S.msg);A.redraw();S.check()},'3 times 4');btn('4×3',()=>{S.r=4;S.c=3;S.msg='4×3 = 12';A.sound.tick();say(S.msg);A.redraw();S.check()},'4 times 3');btn('2×6',()=>{S.r=2;S.c=6;S.msg='2×6 = 12';A.sound.tick();say(S.msg);A.redraw();S.check()},'2 times 6')}}
function down(p){if(kind()==='chal')return false;
 if(kind()==='build'){S.r=3;S.c=4;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='flip'){S.flipped=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='same'){S.picked=p.x<A.W/2?1:0;S.picked===1?A.sound.tick():A.sound.miss();A.redraw();if(S.picked===1)S.check();return true}
 if(kind()==='match'||kind()==='myth'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.2)/(A.H*.2))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='make'){S.r=3;S.c=4;A.sound.tick();A.redraw();S.check();return true}
 return true}
const steps=[
{h:'Build an array',p:'An array shows multiplication as rows and columns of dots. 3 rows of 4 is 3×4.',
 predict:{q:'3 rows of 4 dots make…',opts:['12 dots','7 dots','34 dots'],ans:0},
 task:'Build a 3×4 array',show:()=>auto(0,[()=>{S.r=3;S.c=4;A.redraw();S.check()}]),
 go:()=>{reset({r:0,c:0});say('Build 3 rows of 4.');controls();S.check=finish(0,()=>S.r===3&&S.c===4,'3×4 = 12 dots.')}},
{h:'Flip rows and columns',p:'Turn the array on its side: 3×4 becomes 4×3. The dots do not change — only the view.',
 predict:{q:'Flip 3×4. The product…',opts:['stays 12','becomes 7','becomes 34'],ans:0},
 task:'Flip the array',show:()=>auto(1,[()=>{S.r=3;S.c=4;S.flipped=1;A.redraw();S.check()}]),
 go:()=>{reset({r:3,c:4,flipped:0});say('Flip to see 4×3.');controls();S.check=finish(1,()=>S.flipped,'4×3 is the same 12 dots.')}},
{h:'Same product',p:'2×5 and 5×2 both make 10. Changing the order of factors does not change the product — that is the commutative property.',
 predict:{q:'2×5 and 5×2…',opts:['both equal 10','one is bigger','only 2×5 works'],ans:0},
 task:'Confirm both show 10',show:()=>auto(2,[()=>{S.picked=1;A.redraw();S.check()}]),
 go:()=>{reset({picked:null});say('Are both arrays 10 dots?');controls();S.check=finish(2,()=>S.picked===1,'Commutative: a×b = b×a.')}},
{h:'Match equal products',p:'Pick the pair that shows the same product with factors swapped.',
 predict:{q:'Which pair matches?',opts:['3×4 and 4×3','3×4 and 3+4','3×4 and 4−3'],ans:0},
 task:'Tap the matching pair',show:()=>auto(3,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['3×4 and 4×3','3×4 and 3+4','3×4 and 4−3'],picked:null});say('Which pair matches?');controls();S.check=finish(3,()=>S.picked===0,'Swapped factors, same product.')}},
{h:'Order myth',p:'Order can change how an array looks, but not how many dots you have. Multiplication is commutative for whole numbers.',
 predict:{q:'Does swapping factors change the product?',opts:['No — product stays','Yes — always bigger','Yes — always smaller'],ans:0},
 task:'Tap the true idea',show:()=>auto(4,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['a×b equals b×a — same product','Order always changes the total','You must multiply larger factor first'],picked:null});say('Tap the true idea.');controls();S.check=finish(4,()=>S.picked===0,'Commutative property: product unchanged.')}},
{h:'Two ways to 12',p:'Make 12 as an array two different ways, like 3×4 or 4×3 (or 2×6).',
 predict:{q:'Which also makes 12?',opts:['4×3','3+4','3−4'],ans:0},
 task:'Show a 12-dot array',show:()=>auto(5,[()=>{S.r=3;S.c=4;A.redraw();S.check()}]),
 go:()=>{reset({r:0,c:0,target:12});say('Make 12 dots as rows×columns.');controls();S.check=finish(5,()=>(S.r||0)*(S.c||0)===12,'Several factor pairs make 12.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['3×4 dots = ?',[['12','ok'],['7','add'],['34','concat']]],
 ['Flip 3×4 — product?',[['Still 12','ok'],['Becomes 7','add'],['Becomes 34','concat']]],
 ['2×5 and 5×2…',[['Both 10','ok'],['Only 2×5 is 10','order'],['5×2 is 7','add']]],
 ['Matching pair?',[['3×4 and 4×3','ok'],['3×4 and 3+4','add'],['3×4 and 4−3','sub']]],
 ['Swap factors — product?',[['Stays the same','ok'],['Always grows','grow'],['Always shrinks','shrink']]],
 ['Another way to 12?',[['4×3','ok'],['3+4','add'],['12×0','zero']]],
 ['6×2 equals…',[['2×6','ok'],['6+2','add'],['6−2','sub']]]];
function why(t){let m='Multiplication is commutative: a×b = b×a for whole numbers.';
 if(t==='add'||t==='concat'||t==='sub')m='Count the array dots — do not add, subtract, or glue the digits.';
 if(t==='order'||t==='grow'||t==='shrink')m='Swapping factors changes the array shape, not the product.';
 if(t==='zero')m='12×0 is 0, not 12. Use factor pairs like 3×4 or 4×3.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Commutative multiplication controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:()=>{},up:()=>{}});controls()}});
A.start()})})();
