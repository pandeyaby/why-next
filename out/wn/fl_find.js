/* Flagship – asking questions to find out (ages 3–4). A thing you do not know: pick the question that fits the need
   ("What is it called?" for a name, "How do I do it?" for a job) and drag it to a helper who can answer; then listen
   and do the helper's steps in the order you heard them. Big cards, few words, every drag has a button twin. */
(()=>{
const NAMES=[['🦔','hedgehog'],['🪁','kite'],['🧲','magnet']];
const JOBS=[{pic:'🫙',job:'open the jar',steps:[['✋','Hold the jar'],['🔄','Twist the lid']]},
 {pic:'🧥',job:'zip my coat',steps:[['🪝','Hook the zip'],['⬆️','Pull it up']]},
 {pic:'🧱',job:'build a tall tower',steps:[['🟥','Big block first'],['🟦','Small block on top'],['🐢','Go slow']]}];
const ASKS=[{k:'name',t:'What is it called?'},{k:'how',t:'How do I do it?'},{k:'quit',t:'I give up'}];
const WHO=[[['👩','a grown-up',1],['🧸','teddy',0],['🐱','the cat',0]],[['🐶','the dog',0],['🧒','a friend',1],['🧸','teddy',0]],[['🐟','the fish',0],['🪴','the plant',0],['👨','a grown-up',1]]];
const MIX=[{need:'how',pic:'🎁',job:'open the box',steps:[['✂️','Cut the tape'],['📦','Lift the flap']]},{need:'name',pic:'🦩',nm:'flamingo'},{need:'how',pic:'👟',job:'do up my shoe',steps:[['🔗','Press the strap'],['👍','Pat it flat']]}];
VIS.reg('flagfind',c=>{let A,pad,chal,timer=0,qn=-1;c.fig.classList.add('young');
const fresh0=()=>({r:0,won:0,phase:'ask',said:'',heard:[],order:[],got:[],drag:null,pick:-1,shake:-1,lit:'',known:'',want:()=>{}});let S=fresh0();
const kind=()=>['name','how','steps','who','mix','quiz'][A.step];
const lim=()=>3;
const slow=()=>A.reduced();
const tell=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const job=()=>kind()==='mix'?MIX[S.r%3]:JOBS[S.r%3];
const need=()=>kind()==='name'?'name':kind()==='how'?'how':kind()==='mix'?job().need:'';
/* geometry: thing in the middle, helper on the right, child on the left, question cards along the bottom */
const zone=()=>({x:A.W*.66,y:A.H*.06,w:A.W*.31,h:A.H*.5});
function cards(){const n=kind()==='who'?3:ASKS.length,g=8,w=(A.W-24-g*(n-1))/n,h=Math.min(A.H*.22,70);return[...Array(n)].map((_,i)=>({x:12+i*(w+g),y:A.H-h-10,w,h}))}
function stepTiles(){const st=job().steps||[],n=st.length,g=10,w=Math.min((A.W-24-g*(n-1))/n,150),tot=n*w+g*(n-1);return S.order.map((_,i)=>({x:(A.W-tot)/2+i*(w+g),y:A.H*.62,w,h:A.H*.3}))}
function font(px,bold){return`${bold?800:600} ${Math.round(px*(A.narrow?1:1.12))}px system-ui,sans-serif`}
function write(g,t,x,y,px,col,al,maxw){g.font=font(px,1);g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;const lim=maxw||A.W-20;
 if(g.measureText(t).width<=lim)return g.fillText(t,x,y,lim);const ws=t.split(' '),rows=[''];ws.forEach(w=>{const tr=(rows[rows.length-1]+' '+w).trim();if(g.measureText(tr).width>lim&&rows[rows.length-1])rows.push(w);else rows[rows.length-1]=tr});
 const lh=px*1.2;rows.forEach((r,k)=>g.fillText(r,x,y+(k-(rows.length-1)/2)*lh,lim))}
const says=st=>st.map((s,k)=>k?s[1][0].toLowerCase()+s[1].slice(1):s[1]).join(', then ')+'.';
function face(g,x,y,r,emo){g.font=`${Math.round(r*1.6)}px system-ui,"Apple Color Emoji","Segoe UI Emoji",sans-serif`;g.textAlign="center";g.textBaseline="middle";g.fillStyle="#000";g.fillText(emo,x,y)}
function bubble(g,t,x,y,maxw){const C=A.col;g.font=font(14,1);const tw=g.measureText(t).width,two=tw+22>maxw,w=two?maxw:tw+22,h=two?54:34;
 g.fillStyle=C.dark?A.mix(C.pn,'#ffffff',.12):'#ffffff';g.strokeStyle=C.cy;g.lineWidth=3;A.paint.rrect(x-w/2,y-17,w,h,14);g.fill();g.stroke();write(g,t,x,y-17+h/2,14,C.tx,0,w-16)}
function drawScene(g){const C=A.col,z=zone(),v=kind();
 g.fillStyle=A.alpha(C.gr,.13);A.paint.rrect(z.x,z.y,z.w,z.h,18);g.fill();g.strokeStyle=S.lit==='zone'?C.gr:A.alpha(C.gr,.6);g.lineWidth=S.lit==='zone'?5:3;A.paint.rrect(z.x,z.y,z.w,z.h,18);g.stroke();
 face(g,z.x+z.w/2,z.y+z.h*.45,Math.min(z.w,z.h)*.3,v==='who'?'🤔':'👩');write(g,v==='who'?'Who?':'Helper',z.x+z.w/2,z.y+z.h*.88,13,C.tx,0,z.w-10);
 face(g,A.W*.1,A.H*.3,A.H*.09,'🧒');
 const th=v==='name'?NAMES[S.r%3]:v==='who'?['🐦']:job();if(th){face(g,A.W*.38,A.H*.27,A.H*.12,th[0]||th.pic);
  const lab=v==='who'?'Who can tell me its name?':v==='name'||(v==='mix'&&th.need==='name')?(S.known||'?'):S.phase==='done'?'Done!':th.job?'I want to '+th.job:'';write(g,lab,A.W*.38,A.H*.49,lab==='?'?26:13,lab==='?'?C.am:C.tx,0,A.W*.4)}
 if(S.said)bubble(g,S.said,A.W*.38,A.H*.06+17,A.W*.5)}
function drawCards(g){const C=A.col,v=kind(),rs=cards();rs.forEach((r,i)=>{if(S.drag&&S.drag.i===i&&S.drag.x!=null)return;paintCard(g,r,i,S.shake===i,S.pick===i)});
 if(S.drag&&S.drag.x!=null){const r=rs[S.drag.i];paintCard(g,{x:S.drag.x-r.w/2,y:S.drag.y-r.h/2,w:r.w,h:r.h},S.drag.i,0,1)}
 function paintCard(g,r,i,bad,sel){g.fillStyle=bad?A.alpha(C.rd,.16):A.mix(C.pn,C.cy,C.dark?.18:.1);A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.strokeStyle=bad?C.rd:sel?C.vi:C.cy;g.lineWidth=bad||sel?5:3;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.stroke();
  if(v==='who'){const h=WHO[S.r%3][i];face(g,r.x+r.w/2,r.y+r.h*.4,r.h*.26,h[0]);write(g,h[1],r.x+r.w/2,r.y+r.h*.82,12,C.tx,0,r.w-8)}
  else write(g,ASKS[i].t,r.x+r.w/2,r.y+r.h/2,13,C.tx,0,r.w-10)}}
function drawTiles(g){const C=A.col,st=job().steps;stepTiles().forEach((r,i)=>{const s=st[S.order[i]],used=S.got.includes(S.order[i]),bad=S.shake===i;
 g.fillStyle=used?A.alpha(C.gr,.2):bad?A.alpha(C.rd,.16):A.mix(C.pn,C.am,C.dark?.16:.12);A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.strokeStyle=used?C.gr:bad?C.rd:C.am;g.lineWidth=4;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.stroke();
 face(g,r.x+r.w/2,r.y+r.h*.38,r.h*.2,s[0]);write(g,used?'✓ '+s[1]:s[1],r.x+r.w/2,r.y+r.h*.76,12,C.tx,0,r.w-8)})}
function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#f0fdf4',C.dark?.03:.5);g.fillRect(0,0,A.W,A.H);
 if(kind()==='quiz'){face(g,A.W*.3,A.H*.45,A.H*.14,'🧒');face(g,A.W*.7,A.H*.45,A.H*.14,'👩');bubble(g,'Ask, listen, try!',A.W/2,A.H*.15,A.W*.8);return}
 drawScene(g);if(S.phase==='steps')drawTiles(g);else if(S.phase==='ask')drawCards(g);
 if(S.phase==='done'&&S.won>=lim())write(g,'All found out!',A.W/2,A.H*.78,18,C.gr);A.fx.draw(g)}
function oops(m,i){A.sound.miss();S.shake=i==null?-1:i;tell(m);S.said=m.length<44?m:S.said;clearTimeout(timer);timer=setTimeout(()=>{S.shake=-1;A.redraw()},slow()?10:850);A.redraw()}
function round(){S.phase=kind()==='steps'?'steps':'ask';S.said='';S.known='';S.got=[];S.pick=-1;S.drag=null;
 if(S.phase==='steps'){const n=job().steps.length;S.order=[...Array(n).keys()].reverse();S.said=says(job().steps);tell('The grown-up says: '+S.said+' Now you do it.')}}
function scored(m){S.won++;A.sound.pop();S.phase='done';tell(m);controls();A.redraw();setTimeout(()=>{if(S.won<lim()&&A.step<5){S.r++;round();controls();tell(m+' Next one.');A.redraw()}S.want()},slow()?20:650)}
/* asking: the card must fit the need (a name or a way to do it); giving up is never the answer */
function ask(i){const v=kind();if(S.phase!=='ask'||S.won>=lim())return;S.pick=-1;
 if(v==='who'){const h=WHO[S.r%3][i];if(!h[2])return oops(`${h[1][0].toUpperCase()+h[1].slice(1)} cannot tell you. Ask a person: a grown-up or a friend.`,i);
  S.said='I will help you!';return scored(`Yes! ${h[1][0].toUpperCase()+h[1].slice(1)} can answer.`)}
 const a=ASKS[i].k,nd=need();
 if(a==='quit')return oops('If you give up, you never find out. Ask a helper!',i);
 if(a!==nd)return oops(nd==='name'?'That asks how to do a job. You want its name. Ask: what is it called?':'You know what it is. You want to know how. Ask: how do I do it?',i);
 if(nd==='name'){const nm=v==='mix'?job().nm:NAMES[S.r%3][1];S.known=nm;S.said=`It is a ${nm}.`;return scored(`You asked, and now you know: a ${nm}!`)}
 S.said=says(job().steps);
 if(v==='how')return scored(`Good asking! The grown-up says: ${S.said}`);
 const n=job().steps.length;S.order=[...Array(n).keys()].reverse();S.got=[];S.phase='steps';tell('The grown-up says: '+S.said+' Now you try it.');controls();A.redraw()}
/* trying: do the steps in the order you heard them */
function tryStep(slot){if(S.phase!=='steps')return;const want=S.got.length,s=S.order[slot],st=job().steps;if(S.got.includes(s))return;
 if(s!==want)return oops(`Listen again: first ${st[0][1].toLowerCase()}, then ${st[1][1].toLowerCase()}${st[2]?', then '+st[2][1].toLowerCase():''}.`,slot);
 S.got.push(s);A.sound.tick();if(S.got.length===st.length){S.said='';return scored(`You listened and did it! You can ${job().job}.`)}tell(`Yes: ${st[s][1]}. What comes next?`);A.redraw()}
function controls(){if(!pad)return;pad.innerHTML='';const v=kind();const btn=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=f};
 if(v==='quiz'||S.won>=lim()&&S.phase==='done')return;
 if(S.phase==='steps')S.order.forEach((s,slot)=>btn(job().steps[s][0]+' '+job().steps[s][1],()=>tryStep(slot),'Do this step: '+job().steps[s][1]));
 else if(v==='who')WHO[S.r%3].forEach((h,i)=>btn(h[0]+' '+h[1],()=>ask(i),'Ask '+h[1]));
 else if(S.phase==='ask')ASKS.forEach((a,i)=>btn(a.t,()=>ask(i),'Say to the helper: '+a.t))}
const inR=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
function down(p){if(S.phase==='steps'){const k=stepTiles().findIndex(r=>inR(p,r));if(k>=0)tryStep(k);return false}
 if(S.phase!=='ask')return false;const i=cards().findIndex(r=>inR(p,r));if(i>=0){if(kind()==='who'){ask(i);return false}S.drag={i,x:null,y:null,sx:p.x,sy:p.y};return true}
 if(inR(p,zone())&&S.pick>=0)ask(S.pick);return false}
function move(p){const d=S.drag;if(!d)return;if(d.x!=null||Math.hypot(p.x-d.sx,p.y-d.sy)>8){d.x=p.x;d.y=p.y;S.lit=inR(p,zone())?'zone':'';A.redraw()}}
function up(p){const d=S.drag;S.drag=null;S.lit='';if(!d)return;if(d.x==null){S.pick=d.i;A.sound.tick();tell(`Picked "${ASKS[d.i].t}". Now tap the helper.`);return A.redraw()}if(inR(p,zone()))ask(d.i);A.redraw()}
const check=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function auto(fns,ms){const me=++qn;fns.forEach((f,j)=>setTimeout(()=>{if(me===qn)f()},slow()?40*j+30:(j+1)*(ms||700)))}
function reset(){qn++;clearTimeout(timer);S=fresh0();if(A)round()}
const right=k=>ASKS.findIndex(a=>a.k===k);
const steps=[
{h:'What is it called?',p:'You see a thing. You do not know its name. Drag a question to the helper. Or tap a question.',task:'Find out 3 names',
 show:()=>{steps[0].go();auto([0,1,2].map(()=>()=>ask(right('name'))),800)},go:()=>{reset();tell('What is that thing? Ask the helper.');controls();S.want=check(0,()=>S.won>=3,'To learn a name, ask: what is it called?')}},
{h:'How do I do it?',p:'You want to do a job, but you cannot yet. Ask the helper how.',predict:{q:'You cannot open the jar. What helps most?',opts:['Keep pulling hard','Ask: how do I open it?'],ans:1},task:'Ask about 3 jobs',
 show:()=>{steps[1].go();auto([0,1,2].map(()=>()=>ask(right('how'))),800)},go:()=>{reset();tell('You want to open the jar. Ask the helper how.');controls();S.want=check(1,()=>S.won>=3,'To learn how, ask: how do I do it?')}},
{h:'Listen, then try',p:'The helper tells you the steps. Listen. Then tap the steps in the same order.',predict:{q:'The helper tells you how. What next?',opts:['Grab it and do it my way','Listen, then do the steps'],ans:1},task:'Do 3 jobs the way you heard',
 show:()=>{steps[2].go();const seq=[];JOBS.forEach(j=>{j.steps.forEach((_,s)=>seq.push(()=>tryStep(S.order.indexOf(s))));seq.push(()=>{})});auto(seq,420)},go:()=>{reset();controls();S.want=check(2,()=>S.won>=3,'Asking works when you listen and try.')}},
{h:'Who can help?',p:'Ask someone who can talk back: a grown-up or a friend. Tap who to ask.',task:'Pick a helper 3 times',
 show:()=>{steps[3].go();auto([0,1,2].map(r=>()=>ask(WHO[r].findIndex(h=>h[2]))),800)},go:()=>{reset();tell('Who can tell you? Tap them.');controls();S.want=check(3,()=>S.won>=3,'A grown-up or a friend can answer.')}},
{h:'Ask, listen, try',p:'New things! Is it a name you need, or how to do it? Ask. If they tell you steps, try them.',task:'Find out about 3 new things',
 show:()=>{steps[4].go();const seq=[];MIX.forEach(m=>{seq.push(()=>ask(right(m.need)));(m.steps||[]).forEach((_,s)=>seq.push(()=>tryStep(S.order.indexOf(s))));seq.push(()=>{})});auto(seq,520)},go:()=>{reset();tell('A new thing. What do you need to know?');controls();S.want=check(4,()=>S.won>=3,'Name? Ask what. Job? Ask how. Then listen and try.')}},
{h:'Challenge',p:'',go:()=>{reset();ask1()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QQ=[['You see a big bird. You do not know its name. What do you ask?',[['What is it called?','ok'],['How do I do it?','mixup'],['Nothing. I just guess.','guess']]],
 ['You cannot put on your boot. What can you ask?',[['How do I put it on?','ok'],['What is it called?','mixup2'],['I say: I give up.','quit']]],
 ['You ask, "How do I zip it?" Dad tells you. What do you do now?',[['Listen, then try it','ok'],['Run off to play','run'],['Ask the same thing again and again','again']]],
 ['Who can tell you the name of a tree?',[['A grown-up or a friend','ok'],['My teddy','teddy'],['The tree','tree']]],
 ['Gran says, "Push it down, then turn it." What is first?',[['Push it down','ok'],['Turn it','turn'],['It does not matter','any']]]];
function because(t){let m='Think: what do you need to know? Then ask a person and listen.';
 if(t==='mixup')m='"How do I do it?" asks about a job. You want a name, so ask: what is it called?';
 if(t==='guess')m='A guess can be wrong. Ask, and you find out for sure.';
 if(t==='mixup2')m='You know it is a boot. You need to know how, so ask how.';
 if(t==='quit')m='Giving up means you never learn it. Ask how!';
 if(t==='run')m='The answer only helps if you try it. Listen, then do it.';
 if(t==='again')m='Dad already told you. Now listen and try the steps.';
 if(t==='teddy')m='Teddy cannot talk back. Ask a grown-up or a friend.';
 if(t==='tree')m='A tree cannot talk! Ask a person.';
 if(t==='turn')m='Gran said push first. Do the steps in the order you hear them.';
 if(t==='any')m='The order matters. First push, then turn.';
 return m}
function ask1(){qn++;const k=(qn%QQ.length+QQ.length)%QQ.length,[q,ops]=QQ[k],sh=k%3;
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ops.slice(sh).concat(ops.slice(0,sh)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
let run=0;
function mark(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! Good asking.':'✗ '+because(t)}${ok?` In a row: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask1}
A=FK.shell(c,{steps,ratio:.6,tall:1.2,draw,onStep:A=>{chal.hidden=A.step!==5;pad.hidden=A.step===5;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});controls()}});
A.start()})})();
