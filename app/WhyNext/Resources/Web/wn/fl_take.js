/* Flagship: subtraction as taking away (ages 4–6; EYFS/Y1: take away / how many left).
   Remove counters from a starting group, read the remainder, reject add-back and
   removed=left myths, build a take-away sentence, then challenge. Distinct from
   addition combining (would be put-together) and fluent within-5 (flagsum5). */
(()=>{
VIS.reg('flagtake',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['remove','left','addback','removed','sentence','idea','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function plate(g,n,gone){const W=A.W,H=A.H,total=n+(gone||0),cols=Math.min(total,5),x0=W*.5-(cols-1)*W*.09,y=H*.42;
 for(let i=0;i<total;i++){const x=x0+(i%cols)*W*.18,yy=y+Math.floor(i/cols)*H*.14,out=i>=n;
  g.beginPath();g.arc(x,yy,Math.min(W,H)*.05,0,7);g.fillStyle=out?A.alpha(A.col.rd,.25):A.alpha(A.col.or,.75);g.fill();g.strokeStyle=A.col.tx;g.lineWidth=2;g.stroke();
  if(out){g.beginPath();g.moveTo(x-10,yy-10);g.lineTo(x+10,yy+10);g.moveTo(x+10,yy-10);g.lineTo(x-10,yy+10);g.strokeStyle=A.col.rd;g.stroke()}}}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#ffedd5',C.dark?.08:.35);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Take away → how many left?',W/2,H*.32,A.narrow?13:16,{w:900});T('Remove some. Count what remains.',W/2,H*.52,A.narrow?12:14,{c:C.mu});A.fx.draw(g);return}
 if(k==='remove'){T(`Start ${S.start||7}. Take away to leave ${S.want||4}`,W/2,H*.1,A.narrow?13:15,{w:800});plate(g,S.n||7,(S.start||7)-(S.n||7));T(`On plate: ${S.n||7}`,W/2,H*.85,A.narrow?14:16,{c:C.mu})}
 if(k==='left'){T('How many are left?',W/2,H*.1,A.narrow?15:18,{w:800});plate(g,4,3);T(S.picked==null?'Pick 4 left (not 3 removed)':'Picked '+['4 left','3 removed'][S.picked],W/2,H*.85,A.narrow?12:14,{c:C.mu})}
 if(k==='addback'){T('Do not put them back',W/2,H*.1,A.narrow?14:16,{w:800});plate(g,S.n||4,S.back?0:3);T(S.picked==null?'Keep them off, or add back?':'Picked '+['keep removed off','add back onto plate'][S.picked],W/2,H*.85,A.narrow?11:13,{c:C.mu})}
 if(k==='removed'){T('Removed ≠ left',W/2,H*.1,A.narrow?15:18,{w:800});
  T('7 − 3 → ?',W/2,H*.4,A.narrow?20:24);T(S.picked==null?'Is the answer 4 left or 3 removed?':'Picked '+['4 left','3 removed'][S.picked],W/2,H*.75,A.narrow?12:14,{c:C.mu})}
 if(k==='sentence'){T('Build the take-away sentence',W/2,H*.1,A.narrow?13:15,{w:800});
  T(S.said?`${S.start} − ${S.gone} = ${S.start-S.gone}`:'Tap to write 7 − 3 = 4',W/2,H*.45,A.narrow?18:22,{w:800});
  T(S.said?'Minus means take away':'Act it, then write it',W/2,H*.75,A.narrow?12:14,{c:C.mu})}
 if(k==='idea'){T('Tap the true sentence',W/2,H*.1,A.narrow?15:18,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.3+i*.18);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.06,y-H*.07,W*.88,H*.14);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.06,y-H*.07,W*.88,H*.14);T(t,W/2,y,A.narrow?11:13,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{start:7,n:7,want:4,gone:3,back:0,said:0,picked:null,opts:[],check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*280))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='remove'){btn('Take one away',()=>{if(S.n>0){S.n--;A.sound.tick();say(S.n+' left');A.redraw();S.check()}},'Remove one');btn('Put one back',()=>{if(S.n<S.start){S.n++;A.sound.tick();say(S.n+' on plate');A.redraw();S.check()}},'Undo one remove')}
 if(kind()==='left'){btn('4 left',()=>{S.picked=0;A.sound.tick();say('4 remain');A.redraw();S.check()},'Four left');btn('3 removed',()=>{S.picked=1;A.sound.miss();say('Removed is not how many left');A.redraw()},'Removed count — wrong')}
 if(kind()==='addback'){btn('Keep removed off',()=>{S.picked=0;S.back=0;S.n=4;A.sound.tick();say('Keep them off');A.redraw();S.check()},'Keep off');btn('Add back onto plate',()=>{S.picked=1;S.back=1;S.n=7;A.sound.miss();say('That undoes take-away');A.redraw()},'Add back — wrong')}
 if(kind()==='removed'){btn('4 left',()=>{S.picked=0;A.sound.tick();say('Remainder is 4');A.redraw();S.check()},'Four left');btn('3 removed',()=>{S.picked=1;A.sound.miss();say('3 is what you took, not left');A.redraw()},'Three removed — wrong')}
 if(kind()==='sentence'){btn('Write 7 − 3 = 4',()=>{S.said=1;A.sound.tick();say('7 take away 3 is 4');A.redraw();S.check()},'Write the sentence')}
 if(kind()==='idea')(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();say(t);A.redraw();S.check()},'Pick: '+t))}
function down(p){if(kind()==='chal')return false;S.drag=1;
 if(kind()==='remove'){if(p.x>A.W/2){if(S.n>0)S.n--}else if(S.n<S.start)S.n++;A.redraw();S.check();return true}
 if(kind()==='left'||kind()==='addback'||kind()==='removed'){S.picked=p.x<A.W/2?0:1;if(S.picked===0){if(kind()==='addback'){S.back=0;S.n=4}A.sound.tick();S.check()}else{if(kind()==='addback'){S.back=1;S.n=7}A.sound.miss()}A.redraw();return true}
 if(kind()==='sentence'){S.said=1;A.sound.tick();A.redraw();S.check();return true}
 return true}
function move(){}
function up(){S.drag=0}
const steps=[
{h:'Take some away',p:'Taking away means start with a group, remove some, and see how many remain.',
 predict:{q:'Taking away means…',opts:['remove some, then count how many remain','add more to the group','only name the colour of the plate'],ans:0},
 task:'Take away until 4 remain (from 7)',show:()=>auto(0,[()=>{S.n=4;A.redraw();S.check()}]),
 go:()=>{reset({start:7,n:7,want:4});say('Take biscuits away until 4 remain.');controls();S.check=finish(0,()=>S.n===4,'7 take away 3 leaves 4.')}},
{h:'How many left?',p:'How many left means the remainder on the plate — not the number you removed.',
 predict:{q:'7 biscuits, eat 3. How many left?',opts:['4','3','10'],ans:0},
 task:'Pick 4 left',show:()=>auto(1,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({picked:null});say('How many are left?');controls();S.check=finish(1,()=>S.picked===0,'4 left — not the 3 you removed.')}},
{h:'Do not add back',p:'Putting removed objects back undoes the take-away. Keep them off to see how many left.',
 predict:{q:'After taking away, putting the removed objects back…',opts:['undoes the subtraction','is required to find how many left','always makes the answer bigger than the start'],ans:0},
 task:'Keep removed objects off the plate',show:()=>auto(2,[()=>{S.picked=0;S.back=0;S.n=4;A.redraw();S.check()}]),
 go:()=>{reset({n:4,back:0,picked:null});say('Keep them off or add back?');controls();S.check=finish(2,()=>S.picked===0&&!S.back,'Keep removed off — that preserves take-away.')}},
{h:'Removed ≠ left',p:'The number you took away is not the answer for how many remain.',
 predict:{q:"Saying 'how many left' is 3 when you removed 3 from 7…",opts:['mixes up the removed count with the remainder','is always correct','means you should add next'],ans:0},
 task:'Pick 4 left for 7 − 3',show:()=>auto(3,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({picked:null});say('7 − 3 → ?');controls();S.check=finish(3,()=>S.picked===0,'Remainder 4; removed 3 is a different number.')}},
{h:'Write it',p:'After you act it out, write the take-away sentence with a minus sign: 7 − 3 = 4.',
 predict:{q:'The minus sign in 7 − 3 means…',opts:['take away','put together','skip counting only'],ans:0},
 task:'Write 7 − 3 = 4',show:()=>auto(4,[()=>{S.said=1;A.redraw();S.check()}]),
 go:()=>{reset({start:7,gone:3,said:0});say('Write the take-away sentence.');controls();S.check=finish(4,()=>S.said===1,'7 − 3 = 4 — minus means take away.')}},
{h:'True sentence',p:'Pick the sentence that matches taking away.',
 predict:{q:'Combining two groups is…',opts:['addition, not taking away','the same as subtraction','how minus always works'],ans:0},
 task:'Tap the true sentence',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['Remove some, then count how many remain','Add the removed objects back before you answer','Say the removed count is how many left'],picked:null});say('Tap the true idea.');controls();S.check=finish(5,()=>S.picked===0,'Take away = remove, then count what remains.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['Taking away means…',[['remove some, then count how many remain','ok'],['add more to the group','add'],['only name the colour of the plate','colour']]],
 ['7 biscuits, eat 3. How many left?',[['4','ok'],['3','three'],['10','ten']]],
 ['After taking away, putting the removed objects back…',[['undoes the subtraction','ok'],['is required to find how many left','required'],['always makes the answer bigger than the start','bigger']]],
 ['The minus sign in 7 − 3 means…',[['take away','ok'],['put together','together'],['skip counting only','skip']]],
 ["Saying 'how many left' is 3 when you removed 3 from 7…",[['mixes up the removed count with the remainder','ok'],['is always correct','always'],['means you should add next','addnext']]],
 ['Combining two groups is…',[['addition, not taking away','ok'],['the same as subtraction','same'],['how minus always works','minusadd']]],
 ['Changing the starting total while you remove…',[['breaks a fair take-away','ok'],['is required every time','every'],['only helps addition','helps']]]];
function why(t){let m='Taking away means remove some from a group, then count how many remain.';
 if(t==='add'||t==='together'||t==='same'||t==='minusadd'||t==='addnext'||t==='helps')m='Combining or putting together is addition. Taking away removes, then counts what is left.';
 if(t==='three'||t==='always')m='The number you removed is not how many left. 7 − 3 leaves 4.';
 if(t==='required'||t==='bigger')m='Putting removed objects back undoes the take-away. Keep them off to see the remainder.';
 if(t==='colour'||t==='skip'||t==='ten'||t==='every')m='Keep a clear start, remove some, count what remains. Minus means take away — not colour or skip-counting alone.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Take-away controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:p=>move(p),up:up});controls()}});
A.start()})})();
