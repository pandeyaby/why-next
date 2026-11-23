/* Flagship – helping a friend learn: a clue, not the answer (ages 6-7; scaffolding and contingent help, peer
   tutoring): sort what helpers say into clues and doing it for them, climb a help ladder one rung at a time and step
   back when the friend gets it, say who can do the next one, read whether a friend is stuck, still trying or done,
   and sort kind and unkind helper words. Data and drawings: friendhelp_art.js. */
(()=>{const H=FRIENDHELP;
VIS.reg('flagfriendhelp',c=>{let A,D,row,chal,qn=-1,run=0;const S={};c.fig.classList.add('young');
const part=()=>['sort','ladder','next','signs','words','chal'][A.step];
const over=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function back(){const g=A.ctx;g.fillStyle=A.col.dark?'#1c1917':'#fff7ed';g.fillRect(0,0,A.W,A.H)}
/* two drop boxes along the bottom, used by the clue sort and the kind-words sort */
function bins(labels,bad,filled){const gap=8,bw=(A.W-16-gap)/2,bh=Math.min(A.H*.3,140),by=A.H-bh-8;
 return labels.map((l,z)=>{const r={z,x:8+z*(bw+gap),y:by,w:bw,h:bh};D.box(r,'',{no:bad===z});const g=A.ctx;g.font=`800 ${D.sz(15)}${D.F}`;g.fillStyle=D.INK;g.textAlign='center';g.textBaseline='top';
  D.wrap(l,r.w-12,g.font).forEach((L,i)=>g.fillText(L,r.x+r.w/2,r.y+8+i*D.sz(18)));g.font=`700 ${D.sz(13)}${D.F}`;g.fillStyle='#334155';g.fillText(filled[z]+' here',r.x+r.w/2,r.y+r.h-24);return r})}
/* ---------- 1. a clue, or doing it for them? ---------- */
let SB=[],SAY=null;
function sortSay(z){const s=S.so,it=H.SAYS[s.i];if(!it)return;s.drag=null;if(z!==it.z){s.bad=z;A.sound.miss();return tell(`Not quite. "${it.t}" `+(it.z?'does the thinking for your friend.':'leaves the thinking to your friend: it is a clue.'),true)}
 s.n[z]++;s.i++;s.bad=-1;A.sound.pop();tell(H.BWHY[z]+(s.i<H.SAYS.length?' Next one.':''),false)}
function drawSort(){const s=S.so,it=H.SAYS[s.i],y0=D.strip(it?`${s.i+1} of ${H.SAYS.length}: does it help your friend think?`:H.DONE[0],it?(s.bad>=0?'no':''):'ok',S.msg,S.err);
 SB=bins(H.BINS,s.bad,s.n);if(it){const w=Math.min(A.W-60,320),h=Math.min(SB[0].y-y0-30,90),d=s.drag;SAY={x:d?d.x-w/2:(A.W-w)/2,y:d?d.y-h/2:y0+6,w,h};D.bubble(SAY,`"${it.t}"`,{n:17,sel:!!d})}else SAY=null}
/* ---------- 2. the help ladder ---------- */
let RG=[],BK=null;
function give(i){const s=S.la,r=H.ROUNDS[s.i];if(!r)return;const who=r.who;if(i!==r.ans){s.bad=i;A.sound.miss();let m;
  if(r.ans===4)m=`${who} can do it now. More help would take over. Step back and say well done.`;
  else if(i===4)m=`${who} is still stuck. Stepping back leaves ${who} stuck. Give the next bit of help.`;
  else if(i<=r.last)m=`You tried that, and ${who} is still stuck. Go one step up.`;
  else m=r.last<0?`That is a lot of help to start with. Begin at the bottom: the smallest help.`:`That jumps too far. Go up just one step.`;
  return tell(m,true)}
 s.bad=-1;A.sound.pop();if(i===4){s.used=[];S.msg=`Well done, ${who}! Less help now, because ${who} can do it.`+(s.i+1<H.ROUNDS.length?' Next friend.':'')}
 else s.used.push(i);const msg=i===4?S.msg:`Good: "${H.RUNGS[i]}" is the smallest help that might work.`;s.i++;tell(msg,false)}
function drawLadder(){const s=S.la,r=H.ROUNDS[s.i],y0=D.strip(r?r.s:H.DONE[1],r?(s.bad>=0?'no':''):'ok',S.msg,S.err);
 const lx=A.W*.42,lw=A.W-lx-14,bh=Math.min(56,A.H*.12),top=y0+4,lh=A.H-top-bh-18;RG=D.ladder({x:lx,y:top,w:lw,h:lh},{bad:s.bad,used:s.used,last:r?r.last:-1});
 BK={x:lx-6,y:A.H-bh-8,w:lw+12,h:bh};D.box(BK,H.BACK,{n:14,no:s.bad===4});const prev=H.ROUNDS[s.i-1],who=r?r.who:prev.who,face=r?r.face:'happy';
 D.pal(lx*.48,top+lh*.55,Math.min(lx*.8,lh*.55),face,who)}
/* ---------- 3. who can do the next one? ---------- */
let NX=[];
function next(n){const s=S.nx,it=H.NEXT[s.i];if(!it)return;if(n!==it.n){s.bad=n;A.sound.miss();return tell(`Look again. That friend did not work it out, so they have not learned how to do ${it.task}.`,true)}
 s.i++;s.bad=-1;A.sound.pop();tell(`Yes. That friend worked it out with a clue, so they know how to do ${it.task}.`+(s.i<H.NEXT.length?' Next story.':''),false)}
function drawNext(){const s=S.nx,it=H.NEXT[s.i],y0=D.strip(it?`Story ${s.i+1} of 3. Who can do ${it.task} on their own?`:H.DONE[2],it?(s.bad>=0?'no':''):'ok',S.msg,S.err);if(!it){NX=[];return}
 const gap=8,w=(A.W-16-gap)/2,h=A.H-y0-10,names=[it.a.split(' ')[0],it.b.split(' ')[0]];NX=[0,1].map(n=>({n,x:8+n*(w+gap),y:y0+2,w,h}));
 NX.forEach(r=>{D.box(r,'',{no:s.bad===r.n});D.pal(r.x+r.w/2,r.y+r.h*.3,Math.min(r.w*.5,r.h*.4),'think',names[r.n]);D.box({x:r.x+6,y:r.y+r.h*.58,w:r.w-12,h:r.h*.4-6},r.n?it.b:it.a,{n:14})})}
/* ---------- 4. stuck, still trying, or done? ---------- */
let OP=[];
function act(z){const s=S.sg,it=H.SIGNS[s.i];if(!it)return;if(z!==it.z){s.bad=z;A.sound.miss();
  return tell(z===0?'Your friend has stopped or finished, so waiting does not help now.':z===1&&it.z===0?'Your friend is still working it out. A clue now takes the thinking away. Wait.':z===1?'Your friend already did it. No more help needed: say well done.':'Your friend has not got it yet.',true)}
 s.i++;s.bad=-1;A.sound.pop();tell(H.DOWHY[z]+(s.i<H.SIGNS.length?' Next friend.':''),false)}
function drawSigns(){const s=S.sg,it=H.SIGNS[s.i],y0=D.strip(it?`Friend ${s.i+1} of 5: ${it.t}`:H.DONE[3],it?(s.bad>=0?'no':''):'ok',S.msg,S.err);
 const oh=Math.min(64,A.H*.14),gap=6,ow=(A.W-16-gap*2)/3,oy=A.H-oh-8;OP=it?H.DO.map((l,z)=>({z,l,x:8+z*(ow+gap),y:oy,w:ow,h:oh})):[];OP.forEach(r=>D.box(r,r.l,{n:15,no:s.bad===r.z}));
 const name=it?it.t.split(' ')[0]:'Leo';D.pal(A.W/2,y0+(oy-y0)/2,Math.min(A.W*.4,oy-y0-16),it?it.face:'happy',name)}
/* ---------- 5. kind helper words ---------- */
let KB=[],WD=null;
function kind(z){const s=S.kw,it=H.WORDS[s.i];if(!it)return;s.drag=null;const want=it.k?0:1;if(z!==want){s.bad=z;A.sound.miss();return tell(it.k?`"${it.t}" praises the trying. That is kind.`:`"${it.t}" would make a friend feel bad and want to give up.`,true)}
 s.n[z]++;s.i++;s.bad=-1;A.sound.pop();tell((it.k?'Kind: it helps your friend keep going.':'Unkind: it makes trying harder.')+(s.i<H.WORDS.length?' Next one.':''),false)}
function drawWords(){const s=S.kw,it=H.WORDS[s.i],y0=D.strip(it?`${s.i+1} of 5: kind and helpful?`:H.DONE[4],it?(s.bad>=0?'no':''):'ok',S.msg,S.err);
 KB=bins(['Kind and helpful','Unkind'],s.bad,s.n);if(it){const w=Math.min(A.W-60,320),h=Math.min(KB[0].y-y0-30,90),d=s.drag;WD={x:d?d.x-w/2:(A.W-w)/2,y:d?d.y-h/2:y0+6,w,h};D.bubble(WD,`"${it.t}"`,{n:17,sel:!!d})}else WD=null}
/* ---------- wiring ---------- */
function draw(){back();const m=part();if(m==='chal'){D.strip('Challenge: help a friend learn','ok');['Sam','Mia','Ben'].forEach((n,i)=>D.pal(A.W*(.2+i*.3),A.H*.6,Math.min(A.W*.22,110),i===1?'think':'happy',n));return}
 ({sort:drawSort,ladder:drawLadder,next:drawNext,signs:drawSigns,words:drawWords})[m]();A.fx.draw(A.ctx)}
function down(p){const m=part();
 if(m==='sort'){if(SAY&&over(p,SAY)){S.so.drag={x:p.x,y:p.y};return true}const r=SB.find(r=>over(p,r));if(r)sortSay(r.z);return false}
 if(m==='ladder'){const r=RG.find(r=>over(p,r));if(r)give(r.i);else if(over(p,BK))give(4);return false}
 if(m==='next'){const r=NX.find(r=>over(p,r));if(r)next(r.n);return false}
 if(m==='signs'){const r=OP.find(r=>over(p,r));if(r)act(r.z);return false}
 if(m==='words'){if(WD&&over(p,WD)){S.kw.drag={x:p.x,y:p.y};return true}const r=KB.find(r=>over(p,r));if(r)kind(r.z);return false}return false}
function move(p){const m=part(),d=m==='sort'?S.so.drag:m==='words'?S.kw.drag:null;if(d){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const m=part();
 if(m==='sort'&&S.so.drag){S.so.drag=null;const r=SB.find(r=>over(p,r));if(r)sortSay(r.z);else{A.redraw();tell('Drop the words in a box.',false)}}
 if(m==='words'&&S.kw.drag){S.kw.drag=null;const r=KB.find(r=>over(p,r));if(r)kind(r.z);else{A.redraw();tell('Drop the words in a box.',false)}}}
function clear(){run++;for(const k in S)delete S[k];Object.assign(S,{so:{i:0,n:[0,0],bad:-1,drag:null},la:{i:0,bad:-1,used:[]},nx:{i:0,bad:-1},sg:{i:0,bad:-1},kw:{i:0,n:[0,0],bad:-1,drag:null},msg:null,err:false,check:()=>{}})}
function tell(t,bad){S.msg=t;S.err=!!bad;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();S.check()}
const finish=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(H.DONE[i]+A.reveal(i))};
function open(i,ok){clear();c.say(H.DESC[i]);A.cv.setAttribute('aria-label',H.DESC[i]);S.check=finish(i,ok);keys();A.redraw()}
function auto(i,list){steps[i].go();const e=run;let t=0;list.forEach(([ms,f])=>{t+=ms;setTimeout(()=>{if(e===run)f()},t)})}
function keys(){if(!row)return;row.innerHTML='';const m=part(),K=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},row,t).onclick=f};
 if(m==='sort'&&H.SAYS[S.so.i])H.BINS.forEach((b,z)=>K(b,()=>sortSay(z),`"${H.SAYS[S.so.i].t}": ${b}`));
 if(m==='ladder'&&H.ROUNDS[S.la.i]){H.RUNGS.forEach((t,i)=>K((i+1)+'. '+t.split(':')[0].split(',')[0],()=>give(i),`Help step ${i+1}: ${t}`));K('Step back',()=>give(4),H.BACK)}
 if(m==='next'&&H.NEXT[S.nx.i]){const it=H.NEXT[S.nx.i];[it.a,it.b].forEach((t,n)=>K(t.split(' ')[0],()=>next(n),`${t.split(' ')[0]} can do ${it.task}`))}
 if(m==='signs'&&H.SIGNS[S.sg.i])H.DO.forEach((l,z)=>K(l,()=>act(z),`${H.SIGNS[S.sg.i].t} ${l}`));
 if(m==='words'&&H.WORDS[S.kw.i])['Kind and helpful','Unkind'].forEach((b,z)=>K(b,()=>kind(z),`"${H.WORDS[S.kw.i].t}": ${b}`))}
const steps=[
{h:'A clue or the answer?',p:H.TXT[0],task:'Sort all 6 things helpers say',
 show:()=>auto(0,H.SAYS.map(it=>[420,()=>sortSay(it.z)])),go:()=>open(0,()=>S.so.i>=H.SAYS.length)},
{h:'Smallest help first',p:H.TXT[1],predict:{q:'Sam is stuck on a jigsaw. What is the best first help?',opts:['Put the piece in for him','Ask: What could you try?'],ans:1},task:'Help Sam and Mia to the end',
 show:()=>auto(1,H.ROUNDS.map(r=>[480,()=>give(r.ans)])),go:()=>open(1,()=>S.la.i>=H.ROUNDS.length)},
{h:'Who can do the next one?',p:H.TXT[2],predict:{q:'Ava was told the answer. Ben got a clue and worked it out. Who can do the next one alone?',opts:['Both the same','Ben'],ans:1},task:'Answer all 3 stories',
 show:()=>auto(2,H.NEXT.map(it=>[450,()=>next(it.n)])),go:()=>open(2,()=>S.nx.i>=H.NEXT.length)},
{h:'Stuck or still trying?',p:H.TXT[3],predict:{q:'Your friend is still counting on their fingers. Should you help now?',opts:['Yes, help straight away','No, wait while they try'],ans:1},task:'Choose for all 5 friends',
 show:()=>auto(3,H.SIGNS.map(it=>[450,()=>act(it.z)])),go:()=>open(3,()=>S.sg.i>=H.SIGNS.length)},
{h:'Kind helper words',p:H.TXT[4],task:'Sort all 5 helper words',
 show:()=>auto(4,H.WORDS.map(it=>[420,()=>kind(it.k?0:1)])),go:()=>open(4,()=>S.kw.i>=H.WORDS.length)},
{h:'Challenge',p:'',go:()=>{clear();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
function why(t){let m='A good helper gives the smallest help that works and leaves the thinking to their friend.';
 if(t==='tell')m='Telling the answer does the thinking for them. Next time they will still be stuck.';
 if(t==='doit')m='Doing it for them means they do not learn how. Give a clue and let them try.';
 if(t==='early')m='They are still working it out. Wait: helping now takes their thinking away.';
 if(t==='more')m='They can do it now. More help would take over. Step back and say well done.';
 if(t==='quit')m='Walking away leaves them stuck. Give a bit more help, one step at a time.';
 if(t==='big')m='That is big help. Start with the smallest: ask what they could try.';
 if(t==='unkind')m='Those words make a friend feel bad. Kind words praise the trying.';
 if(t==='myth')m='The answer is not wrong. It just does not teach them how to do the next one.';
 return m}
function quiz(){qn++;const Q=H.QS[qn%H.QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>score(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function score(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:X=>{chal.hidden=X.step!==5;row.hidden=X.step===5;keys()},
 init:X=>{A=X;D=H.PEN(A);const w=c.el('div',{class:'fl-below'},A.below);row=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Helping a friend lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});keys()}}).start()})})();
