/* Flagship: Number bonds within 20 (ages 5–6; NC Y1 AS/2).
   Recall addition pairs that sum to a total ≤20 and the related subtraction fact.
   Distinct from flagnbonds (partners that make exactly 10 on a ten-frame). */
(()=>{
VIS.reg('flagnb20',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['pair','related','snap','build','myth','true','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function bead(g,n,ox,oy,col){const r=A.narrow?7:9,gap=A.narrow?18:22;for(let i=0;i<n;i++){const x=ox+(i%10)*gap,y=oy+Math.floor(i/10)*(gap+4);g.fillStyle=col;g.beginPath();g.arc(x,y,r,0,Math.PI*2);g.fill();g.strokeStyle=A.col.tx;g.lineWidth=1.1;g.stroke()}}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#fce7f3',C.dark?.08:.38);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Bonds within 20',W/2,H*.35,A.narrow?15:17,{w:900});T('pair · related subtraction · quick recall',W/2,H*.58,A.narrow?12:14,{c:C.mu});A.fx.draw(g);return}
 if(k==='pair'||k==='build'){T(S.title||'Make the bond',W/2,H*.07,A.narrow?13:15,{w:800});
  g.fillStyle=A.alpha(C.tx,.07);g.fillRect(W*.08,H*.16,W*.84,H*.28);T(`${S.a??'?'} + ${S.b??'?'} = ${S.total??'?'}`,W/2,H*.3,A.narrow?18:22,{w:900});
  bead(g,S.a||0,W*.12,H*.52,C.am);bead(g,S.b||0,W*.12,H*.72,C.ac);T(S.msg||'Tap + to grow each part.',W/2,H*.92,12,{c:C.mu})}
 if(k==='related'){T('Related subtraction',W/2,H*.08,A.narrow?14:16,{w:800});
  T(`${S.total} − ${S.b} = ?`,W/2,H*.28,A.narrow?18:22,{w:900});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.48+i*.14);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.1,y-H*.05,W*.8,H*.1);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.1,y-H*.05,W*.8,H*.1);T(String(t),W/2,y,A.narrow?14:16)})}
 if(k==='snap'||k==='myth'||k==='true'){T(S.title||'Choose',W/2,H*.1,A.narrow?13:15,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.28+i*.2);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.05,y-H*.08,W*.9,H*.16);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.05,y-H*.08,W*.9,H*.16);T(t,W/2,y,A.narrow?12:14,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{a:0,b:0,total:0,picked:null,opts:[],title:'',msg:'',check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*160))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='pair'||kind()==='build'){btn('Part A +1',()=>{S.a=(S.a||0)+1;S.msg=`A ${S.a}, B ${S.b}`;A.sound.tick();say(S.msg);A.redraw();S.check()},'Add one to first part');
  btn('Part B +1',()=>{S.b=(S.b||0)+1;S.msg=`A ${S.a}, B ${S.b}`;A.sound.tick();say(S.msg);A.redraw();S.check()},'Add one to second part');
  btn('Set correct pair',()=>{S.a=S.wantA;S.b=S.wantB;A.redraw();S.check()},'Fill the bond parts')}
 if(kind()==='related'||kind()==='snap'||kind()==='myth'||kind()==='true')(S.opts||[]).forEach((t,i)=>btn(String(t),()=>{S.picked=i;A.sound.tick();say(String(t));A.redraw();S.check()},'Pick '+t))}
function down(p){if(kind()==='chal')return false;
 if(kind()==='pair'||kind()==='build'){if(p.y<A.H*.62)S.a=Math.min(20,(S.a||0)+1);else S.b=Math.min(20,(S.b||0)+1);A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='related'||kind()==='snap'||kind()==='myth'||kind()==='true'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.2)/(A.H*.2))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 return true}
const bondOk=()=>S.a===S.wantA&&S.b===S.wantB&&S.a+S.b===S.total;
const steps=[
{h:'Build a bond to 15',p:'A number bond is a pair that adds to a total. Within 20 you need many pairs, not only partners of 10.',
 predict:{q:'8 + 7 equals…',opts:['15','14','17'],ans:0},
 task:'Make 8 + 7 on the beads',show:()=>auto(0,[()=>{S.a=8;S.b=7;A.redraw();S.check()}]),
 go:()=>{reset({title:'Bond that makes 15',total:15,wantA:8,wantB:7,msg:'Grow parts to 8 and 7.'});say('Build the bond 8 plus 7.');controls();S.check=finish(0,bondOk,'You built the bond 8 + 7 = 15.')}},
{h:'Related subtraction',p:'If 8 + 7 = 15, then 15 − 7 = 8. The same bond powers subtraction — you do not recount from scratch.',
 predict:{q:'15 − 7 using the bond is…',opts:['8','7','15'],ans:0},
 task:'Tap the related fact answer',show:()=>auto(1,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({total:15,b:7,a:8,opts:[8,7,15],picked:null});say('Use the related subtraction fact.');controls();S.check=finish(1,()=>S.picked===0,'Related fact: 15 − 7 = 8.')}},
{h:'Quick snap recall',p:'Bonds within 20 should feel quick: hear 9 + 6 and say 15 without counting every bead.',
 predict:{q:'9 + 6 equals…',opts:['15','16','14'],ans:0},
 task:'Tap the quick total',show:()=>auto(2,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Snap: 9 + 6 = ?',opts:['15','16','14'],picked:null});say('Snap the total.');controls();S.check=finish(2,()=>S.picked===0,'Quick recall: 9 + 6 = 15.')}},
{h:'Another bond to 18',p:'Try a new total. Build 11 + 7 = 18 — still within 20, still a number bond pair.',
 predict:{q:'11 + 7 equals…',opts:['18','17','19'],ans:0},
 task:'Make 11 + 7',show:()=>auto(3,[()=>{S.a=11;S.b=7;A.redraw();S.check()}]),
 go:()=>{reset({title:'Bond that makes 18',total:18,wantA:11,wantB:7,msg:'Grow parts to 11 and 7.'});say('Build 11 plus 7.');controls();S.check=finish(3,bondOk,'You built 11 + 7 = 18.')}},
{h:'Catch a mix-up',p:'A common slip is recounting every subtraction from 1, or treating bonds as only “make 10”.',
 predict:{q:'Which is the mix-up?',opts:['Bonds only ever make 10','Use 8+7 to get 15−7','Snap 9+6 as 15'],ans:0},
 task:'Tap the mix-up',show:()=>auto(4,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Which is the mix-up?',opts:['Bonds only ever make 10','Use 8+7 to get 15−7','Snap 9+6 as 15'],picked:null});say('Find the mix-up.');controls();S.check=finish(4,()=>S.picked===0,'Bonds within 20 include many totals, not only 10.')}},
{h:'True bond idea',p:'Number bonds within 20 are addition pairs and the matching subtraction facts you can recall quickly.',
 predict:{q:'Number bonds within 20 means…',opts:['pairs and related facts to 20','only ten-frame partners of 10','always count every object'],ans:0},
 task:'Tap the true idea',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Tap the true idea',opts:['Pairs + related facts within 20','Only partners that make 10','Always recount from one'],picked:null});say('Tap the true idea.');controls();S.check=finish(5,()=>S.picked===0,'Pairs and related subtraction within 20.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['8 + 7 = …',[['15','ok'],['14','fourteen'],['17','seventeen']]],
 ['15 − 7 = …',[['8','ok'],['7','seven'],['15','fifteen']]],
 ['9 + 6 = …',[['15','ok'],['16','sixteen'],['14','fourteen2']]],
 ['11 + 7 = …',[['18','ok'],['17','seventeen2'],['19','nineteen']]],
 ['Which is a mix-up?',[['Bonds only make 10','ok'],['Use related fact','rel'],['Quick snap totals','snap']]],
 ['Bonds within 20 are…',[['pairs + related facts','ok'],['ten-frame only','ten'],['always recount','count']]],
 ['13 − 5 using 8+5…',[['8','ok'],['5','five'],['13','thirteen']]]];
function why(t){let m='Recall the addition pair, then use the related subtraction fact within 20.';
 if(t==='fourteen'||t==='seventeen'||t==='sixteen'||t==='fourteen2'||t==='seventeen2'||t==='nineteen')m='Check the sum of the two parts carefully — the bond total must match.';
 if(t==='seven'||t==='fifteen'||t==='five'||t==='thirteen')m='If a + b = c, then c − b = a. Use the known addition fact.';
 if(t==='rel'||t==='snap'||t==='ten'||t==='count')m='Bonds within 20 cover many totals and related facts, not only make-10 on a ten-frame.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Number bond controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:()=>{},up:()=>{}});controls()}});
A.start()})})();
