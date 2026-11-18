/* Flagship: Representing Addition and Subtraction (ages 4–6; CCSS K.OA.1).
   Show + and − with objects, a drawing, and fingers — not only written numerals.
   Distinct from flagaddtog (join mats to a total) and flagtake (take-away focus alone). */
(()=>{
VIS.reg('flagrepass',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['objs','draw','fingers','minus','myth','true','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function dots(g,n,ox,oy,col){const r=A.narrow?8:10,gap=A.narrow?20:24;for(let i=0;i<n;i++){const x=ox+(i%5)*gap,y=oy+Math.floor(i/5)*gap;g.fillStyle=col;g.beginPath();g.arc(x,y,r,0,Math.PI*2);g.fill();g.strokeStyle=A.col.tx;g.lineWidth=1.2;g.stroke()}}
function hand(g,n,ox,oy){const{col:C}=A;g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(ox,oy,A.W*.28,A.H*.22);T('✋',ox+A.W*.14,oy+A.H*.08,22);T(String(n)+' up',ox+A.W*.14,oy+A.H*.16,A.narrow?12:14,{w:800})}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#e0e7ff',C.dark?.08:.4);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Show + and − many ways',W/2,H*.35,A.narrow?14:16,{w:900});T('objects · drawing · fingers',W/2,H*.58,A.narrow?12:14,{c:C.mu});A.fx.draw(g);return}
 if(k==='objs'){T(S.title||'Show with objects',W/2,H*.07,A.narrow?13:15,{w:800});
  g.fillStyle=A.alpha(C.tx,.07);g.fillRect(W*.06,H*.16,W*.4,H*.42);g.fillRect(W*.54,H*.16,W*.4,H*.42);
  g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.06,H*.16,W*.4,H*.42);g.strokeRect(W*.54,H*.16,W*.4,H*.42);
  T('Start '+ (S.start||0),W*.26,H*.22,13);T('Add '+ (S.add||0),W*.74,H*.22,13);
  dots(g,S.start||0,W*.14,H*.32,C.am);dots(g,S.add||0,W*.62,H*.32,C.ac);
  T(S.joined?`Altogether ${S.total}`:S.msg||'Tap Join to combine.',W/2,H*.88,A.narrow?12:14,{c:C.mu})}
 if(k==='draw'){T('Draw the story',W/2,H*.08,A.narrow?14:16,{w:800});
  g.fillStyle='#fff';if(C.dark)g.fillStyle=A.alpha(C.pn,.9);g.fillRect(W*.1,H*.2,W*.8,H*.5);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.1,H*.2,W*.8,H*.5);
  const marks=S.marks||0;for(let i=0;i<marks;i++){T('🍎',W*.2+(i%6)*(W*.1),H*.35+Math.floor(i/6)*H*.15,22)}
  T(S.msg||`Draw ${S.need||0} apples.`,W/2,H*.88,12,{c:C.mu})}
 if(k==='fingers'){T('Show on fingers',W/2,H*.08,A.narrow?14:16,{w:800});
  hand(g,S.left||0,W*.08,H*.28);hand(g,S.right||0,W*.36,H*.28);
  T(`Total shown: ${(S.left||0)+(S.right||0)}`,W*.78,H*.4,A.narrow?12:14,{w:800,max:W*.4});
  T(S.msg||'Raise fingers to match 3 + 2.',W/2,H*.88,12,{c:C.mu})}
 if(k==='minus'){T('Show take-away',W/2,H*.07,A.narrow?13:15,{w:800});
  dots(g,S.have||0,W*.2,H*.3,C.am);T(`${S.have||0} − ${S.gone||0} → ${S.leftOver??'?'}`,W/2,H*.7,A.narrow?16:18,{w:900});
  T(S.msg||'Tap to take some away.',W/2,H*.9,12,{c:C.mu})}
 if(k==='myth'||k==='true'){T(S.title||'Choose',W/2,H*.1,A.narrow?13:15,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.28+i*.2);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.05,y-H*.08,W*.9,H*.16);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.05,y-H*.08,W*.9,H*.16);T(t,W/2,y,A.narrow?12:14,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{start:0,add:0,total:0,joined:0,marks:0,need:0,left:0,right:0,have:0,gone:0,leftOver:null,picked:null,opts:[],title:'',msg:'',check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*180))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='objs'){btn('Join objects',()=>{S.joined=1;S.total=(S.start||0)+(S.add||0);S.msg='Altogether '+S.total;A.sound.tick();say(S.msg);A.redraw();S.check()},'Combine both object groups');
  btn('Set 3 and 2',()=>{S.start=3;S.add=2;A.redraw();S.check()},'Show three plus two objects')}
 if(kind()==='draw'){btn('Draw one apple',()=>{S.marks=Math.min(S.need,(S.marks||0)+1);S.msg=`Drawn ${S.marks}`;A.sound.tick();A.redraw();S.check()},'Add one apple mark');
  btn('Draw all needed',()=>{S.marks=S.need;A.redraw();S.check()},'Complete the drawing')}
 if(kind()==='fingers'){btn('Left +1',()=>{S.left=Math.min(5,(S.left||0)+1);A.sound.tick();A.redraw();S.check()},'Raise one left finger');
  btn('Right +1',()=>{S.right=Math.min(5,(S.right||0)+1);A.sound.tick();A.redraw();S.check()},'Raise one right finger');
  btn('Show 3 + 2',()=>{S.left=3;S.right=2;A.redraw();S.check()},'Set three and two fingers')}
 if(kind()==='minus'){btn('Take 1 away',()=>{if((S.have||0)>(S.leftOverTarget||0)){S.have--;S.gone=(S.gone||0)+1;S.leftOver=S.have;A.sound.tick();A.redraw();S.check()}},'Remove one object');
  btn('Finish take-away',()=>{S.have=S.leftOverTarget;S.gone=S.startHave-S.leftOverTarget;S.leftOver=S.have;A.redraw();S.check()},'Complete the subtraction')}
 if(kind()==='myth'||kind()==='true')(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();say(t);A.redraw();S.check()},'Pick: '+t))}
function down(p){if(kind()==='chal')return false;
 if(kind()==='objs'){S.joined=1;S.total=(S.start||0)+(S.add||0);A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='draw'){S.marks=Math.min(S.need,(S.marks||0)+1);A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='fingers'){if(p.x<A.W*.4)S.left=Math.min(5,(S.left||0)+1);else S.right=Math.min(5,(S.right||0)+1);A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='minus'){if((S.have||0)>(S.leftOverTarget||0)){S.have--;S.gone=(S.gone||0)+1;S.leftOver=S.have;A.sound.tick();A.redraw();S.check()}return true}
 if(kind()==='myth'||kind()==='true'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.2)/(A.H*.2))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 return true}
const steps=[
{h:'Objects for addition',p:'Represent addition with objects: start with one group, add another, and see how many altogether.',
 predict:{q:'3 objects and 2 more altogether…',opts:['5','3','2'],ans:0},
 task:'Join 3 and 2 objects',show:()=>auto(0,[()=>{S.start=3;S.add=2;S.joined=1;S.total=5;A.redraw();S.check()}]),
 go:()=>{reset({title:'Show 3 + 2 with objects',start:3,add:2,msg:'Tap Join.'});say('Show addition with objects.');controls();S.check=finish(0,()=>S.joined&&S.total===5,'Objects show 3 + 2 = 5.')}},
{h:'Draw the story',p:'A drawing also represents addition. Sketch the apples in the story instead of only writing 4 + 1.',
 predict:{q:'A drawing of 4 + 1 needs…',opts:['5 apple marks','only the digit 5','no pictures'],ans:0},
 task:'Draw 5 apples for 4 + 1',show:()=>auto(1,[()=>{S.marks=5;A.redraw();S.check()}]),
 go:()=>{reset({need:5,marks:0,msg:'Draw five apples.'});say('Draw the addition story.');controls();S.check=finish(1,()=>S.marks===5,'A drawing can stand for the sum.')}},
{h:'Fingers for a sum',p:'Mental images and fingers count too: raise 3 on one hand and 2 on the other to show 3 + 2.',
 predict:{q:'3 fingers and 2 fingers show…',opts:['5','32','1'],ans:0},
 task:'Raise 3 and 2 fingers',show:()=>auto(2,[()=>{S.left=3;S.right=2;A.redraw();S.check()}]),
 go:()=>{reset({left:0,right:0,msg:'Raise fingers for 3 + 2.'});say('Show the sum on fingers.');controls();S.check=finish(2,()=>S.left===3&&S.right===2,'Fingers represent 3 + 2 = 5.')}},
{h:'Objects for subtraction',p:'Represent subtraction the same way: start with objects, take some away, and name what is left.',
 predict:{q:'5 take away 2 leaves…',opts:['3','5','2'],ans:0},
 task:'Take 2 from 5',show:()=>auto(3,[()=>{S.have=3;S.gone=2;S.leftOver=3;A.redraw();S.check()}]),
 go:()=>{reset({have:5,startHave:5,gone:0,leftOverTarget:3,msg:'Take away until 3 remain.'});say('Show take-away with objects.');controls();S.check=finish(3,()=>S.leftOver===3,'Objects show 5 − 2 = 3.')}},
{h:'Catch a mix-up',p:'Writing only numerals is not enough for this skill. Children must also show the action with objects, drawings, or fingers.',
 predict:{q:'Which is the mix-up?',opts:['Only write digits, never show','Use cubes for 3+2','Draw the take-away'],ans:0},
 task:'Tap the mix-up',show:()=>auto(4,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Which is the mix-up?',opts:['Only write digits, never show','Use cubes for 3 + 2','Draw the take-away'],picked:null});say('Find the mix-up.');controls();S.check=finish(4,()=>S.picked===0,'Representations include objects, drawings, and fingers.')}},
{h:'True representation idea',p:'Addition and subtraction can be shown with objects, drawings, and mental images such as fingers — not numerals alone.',
 predict:{q:'Representing + and − means…',opts:['objects, drawings, fingers','only writing 3+2=5','never using fingers'],ans:0},
 task:'Tap the true idea',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Tap the true idea',opts:['Objects, drawings, and fingers','Only written number sentences','Fingers never count'],picked:null});say('Tap the true idea.');controls();S.check=finish(5,()=>S.picked===0,'Show + and − with objects, drawings, fingers.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['3 objects + 2 altogether…',[['5','ok'],['3','three'],['2','two']]],
 ['Drawing 4+1 needs…',[['5 marks','ok'],['only digit 5','digit'],['no picture','none']]],
 ['3 and 2 fingers show…',[['5','ok'],['32','thirty'],['1','one']]],
 ['5 take away 2 leaves…',[['3','ok'],['5','five'],['2','two2']]],
 ['Which is a mix-up?',[['Only write digits','ok'],['Use cubes','cubes'],['Draw take-away','draw']]],
 ['Representing +/− means…',[['objects, drawings, fingers','ok'],['only write 3+2','write'],['never use fingers','nof']]],
 ['A finger model of 4−1…',[['3 left up','ok'],['must write only','wronly'],['needs 41 fingers','forty']]]];
function why(t){let m='Show addition and subtraction with objects, a drawing, or fingers — not digits alone.';
 if(t==='three'||t==='two'||t==='five'||t==='two2'||t==='one'||t==='thirty')m='Combine or remove the groups, then count what is left altogether.';
 if(t==='digit'||t==='none'||t==='write'||t==='wronly'||t==='nof'||t==='forty'||t==='cubes'||t==='draw')m='K.OA.1 asks for objects, drawings, and mental images such as fingers, not numerals only.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Representation controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:()=>{},up:()=>{}});controls()}});
A.start()})})();
