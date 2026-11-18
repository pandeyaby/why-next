/* Flagship: addition as combining / putting together (ages 4–6; EYFS/Y1).
   Join two mats into one total, act out “add to”, catch count-all-again and plus-means-bigger-number-only myths, then challenge.
   Distinct from cardinality-to-20 (flagobj20), take-away (flagtake), and +/−/= symbols (when built). */
(()=>{
VIS.reg('flagaddtog',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['join','addto','total','trap','story','idea','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function dots(g,n,ox,oy,cols,col){const{col:C}=A,r=A.narrow?8:10,gap=A.narrow?22:26;
 for(let i=0;i<n;i++){const x=ox+(i%cols)*gap,y=oy+Math.floor(i/cols)*gap;g.fillStyle=col||C.am;g.beginPath();g.arc(x,y,r,0,Math.PI*2);g.fill();g.strokeStyle=C.tx;g.lineWidth=1.2;g.stroke()}}
function drawMats(g){const{W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#dcfce7',C.dark?.08:.4);g.fillRect(0,0,W,H);
 T(S.title||'Put the groups together',W/2,H*.07,A.narrow?13:15,{w:800});
 if(!S.joined){g.fillStyle=A.alpha(C.tx,.07);g.fillRect(W*.06,H*.16,W*.4,H*.5);g.fillRect(W*.54,H*.16,W*.4,H*.5);
  g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.06,H*.16,W*.4,H*.5);g.strokeRect(W*.54,H*.16,W*.4,H*.5);
  T('A: '+(S.a||0),W*.26,H*.22,13);T('B: '+(S.b||0),W*.74,H*.22,13);
  dots(g,S.a||0,W*.14,H*.32,3,C.am);dots(g,S.b||0,W*.62,H*.32,3,C.ac);
  T('+',W/2,H*.4,28,{w:900})}
 else{g.fillStyle=A.alpha(C.tx,.07);g.fillRect(W*.12,H*.18,W*.76,H*.52);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.12,H*.18,W*.76,H*.52);
  T('Altogether: '+(S.total||0),W/2,H*.26,A.narrow?14:16,{w:800});dots(g,S.total||0,W*.22,H*.36,6,C.am)}
 T(S.msg||'',W/2,H*.9,12,{c:C.mu})}
function drawIdea(g){const{W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#fef9c3',C.dark?.08:.35);g.fillRect(0,0,W,H);T('Tap the true sentence',W/2,H*.1,A.narrow?15:18,{w:800});
 (S.opts||[]).forEach((t,i)=>{const y=H*(.3+i*.18);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.06,y-H*.07,W*.88,H*.14);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.06,y-H*.07,W*.88,H*.14);T(t,W/2,y,A.narrow?11:13,{max:W*.84})})}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();
 if(k==='chal'){g.fillStyle=A.mix(C.pn,'#dcfce7',C.dark?.08:.35);g.fillRect(0,0,W,H);T('Addition = putting together',W/2,H*.32,A.narrow?13:16,{w:900});T('Join two groups · find how many altogether',W/2,H*.52,A.narrow?11:13,{c:C.mu});A.fx.draw(g);return}
 if(k==='idea')drawIdea(g); else drawMats(g); A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{a:0,b:0,total:0,joined:0,done:0,msg:'',picked:null,opts:[],title:'',check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*240))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function join(){S.joined=1;S.total=(S.a||0)+(S.b||0);S.done=1;S.msg='Altogether '+S.total;A.sound.tick();say(S.msg);A.redraw();S.check()}
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='join'||kind()==='total'||kind()==='story'){btn('Join groups',()=>join(),'Join both groups into one total');btn('Split again',()=>{S.joined=0;S.msg='Two groups ready to join';A.redraw()},'Split back into two groups')}
 if(kind()==='addto'){btn('Add 2 more to A',()=>{S.a=(S.a||0)+2;S.total=(S.a)+(S.b||0);S.joined=1;S.done=1;S.msg='Started with '+(S.a-2)+', added 2 → '+S.total;A.sound.tick();A.redraw();S.check()},'Add two more objects to group A')}
 if(kind()==='trap'){btn('Count all again from 1',()=>{S.msg='You can, but the total is already '+(S.a+S.b);A.sound.miss();A.redraw()},'Show counting all again');btn('Say the total from joining',()=>{S.joined=1;S.total=S.a+S.b;S.done=1;S.msg='Joining gives '+S.total+' without starting from scratch';A.sound.tick();A.redraw();S.check()},'Say the combined total')}
 if(kind()==='idea')(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();say(t);A.redraw();S.check()},'Pick: '+t))}
function down(p){if(kind()==='chal')return false;
 if(kind()==='join'||kind()==='total'||kind()==='story'||kind()==='addto'||kind()==='trap'){if(kind()==='addto'){S.a=(S.startA||3)+2;S.b=S.startB||2;S.joined=1;S.total=S.a+S.b;S.done=1}else{S.joined=1;S.total=(S.a||0)+(S.b||0);S.done=1}A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='idea'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.22)/(A.H*.18))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 return true}
const steps=[
{h:'Join two groups',p:'Addition means putting two groups together. The new count is how many altogether.',
 predict:{q:'Putting 3 and 2 together makes…',opts:['5 altogether','still only 3','a smaller group than 3'],ans:0},
 task:'Join 3 and 2 into one total',show:()=>auto(0,[()=>{S.joined=1;S.total=5;S.done=1;A.redraw();S.check()}]),
 go:()=>{reset({a:3,b:2,title:'3 and 2 → altogether',joined:0});say('Join three and two.');controls();S.check=finish(0,()=>S.done&&S.total===5,'3 and 2 make 5 altogether.')}},
{h:'Add to a group',p:'Sometimes more arrive. Start with some, then add more. That is still putting together.',
 predict:{q:'You have 4, then 2 more join. Altogether…',opts:['6','4','2'],ans:0},
 task:'Add 2 more onto 4',show:()=>auto(1,[()=>{S.a=6;S.b=2;S.joined=1;S.total=6;S.done=1;A.redraw();S.check()}]),
 go:()=>{reset({a:4,b:2,startA:4,startB:2,title:'4, then 2 more',joined:0});say('Add two more to four.');controls();S.check=finish(1,()=>S.done&&S.total===6,'4 and 2 more make 6.')}},
{h:'Say the total',p:'After you join, the last number you need is the total. That is how many in all.',
 predict:{q:'5 red and 3 blue joined. How many in all?',opts:['8','5','3'],ans:0},
 task:'Join 5 and 3 and show 8',show:()=>auto(2,[()=>{S.joined=1;S.total=8;S.done=1;A.redraw();S.check()}]),
 go:()=>{reset({a:5,b:3,title:'5 and 3 → how many in all?',joined:0});say('Find how many in all.');controls();S.check=finish(2,()=>S.done&&S.total===8,'5 and 3 make 8 in all.')}},
{h:'No need to restart',p:'Once groups are joined, you already know the total. You do not have to pretend the first group vanished.',
 predict:{q:'After joining 4 and 4, the total is…',opts:['8 from putting together','0 because you must restart','only the second 4'],ans:0},
 task:'Say the total 8 from joining',show:()=>auto(3,[()=>{S.joined=1;S.total=8;S.done=1;A.redraw();S.check()}]),
 go:()=>{reset({a:4,b:4,title:'4 and 4 already joined',joined:1,total:8,done:0,msg:'Total is ready — say it'});say('Use the joined total.');controls();S.check=finish(3,()=>S.done,'Joining already gives the total.')}},
{h:'Story: cars arrive',p:'4 toy cars are parked. A friend brings 3 more. Addition finds how many cars altogether.',
 predict:{q:'4 cars, then 3 more. Altogether…',opts:['7 cars','4 cars','3 cars'],ans:0},
 task:'Join the car story to 7',show:()=>auto(4,[()=>{S.joined=1;S.total=7;S.done=1;A.redraw();S.check()}]),
 go:()=>{reset({a:4,b:3,title:'4 cars + 3 more',joined:0});say('Join the car story.');controls();S.check=finish(4,()=>S.done&&S.total===7,'4 and 3 more make 7 cars.')}},
{h:'True sentence',p:'Pick the sentence that matches addition as putting together.',
 predict:{q:'Addition means…',opts:['putting groups together to find how many in all','making a group smaller','only saying the first group’s number'],ans:0},
 task:'Tap the true sentence',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['Addition means putting two groups together for a total','Addition always means take some away','Joining groups never changes how many you have'],picked:null});say('Tap the true idea.');controls();S.check=finish(5,()=>S.picked===0,'Addition = putting together for a total.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['3 and 2 put together make…',[['5 altogether','ok'],['still only 3','only3'],['a smaller group','small']]],
 ['4, then 2 more join. Altogether…',[['6','ok'],['4','four'],['2','two']]],
 ['5 red and 3 blue in all?',[['8','ok'],['5','five'],['3','three']]],
 ['After joining 4 and 4, total is…',[['8 from putting together','ok'],['0 because you restart','zero'],['only the second 4','second']]],
 ['4 cars + 3 more = …',[['7 cars','ok'],['4 cars','cars4'],['3 cars','cars3']]],
 ['Addition means…',[['putting groups together for a total','ok'],['always take away','away'],['ignore the second group','ignore']]],
 ['Why join two mats?',[['to find how many altogether','ok'],['to hide the first group','hide'],['to make the total smaller on purpose','shrink']]]];
function why(t){let m='Addition means putting two groups together. The new count is how many altogether.';
 if(t==='only3'||t==='small'||t==='four'||t==='two'||t==='five'||t==='three')m='Keep both groups. 3+2=5, 4+2=6, 5+3=8 — not just one part.';
 if(t==='zero'||t==='second'||t==='away'||t==='ignore')m='Joining keeps both amounts. The total is their sum, not zero or only one group.';
 if(t==='cars4'||t==='cars3'||t==='hide'||t==='shrink')m='4 cars and 3 more make 7. Joining finds the total, not a smaller set.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Combining controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:()=>{},up:()=>{}});controls()}});
A.start()})})();
