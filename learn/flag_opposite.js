/* Flagship – opposites: hot and cold, up and down (ages 4-5; Reception vocabulary, antonyms): drag the opposite onto a
   picture word (not a word that only goes with it), tap the word in a sentence that flips its meaning, sort word pairs
   into opposites and words that mean the same, decide whether a word has an opposite at all, and find the opposite
   pairs among six picture cards. Data and drawings: oppos_art.js. */
(()=>{const O=OPPOS;
VIS.reg('flagopposite',c=>{let A,D,row,chal,qn=-1,run=0;const S={};c.fig.classList.add('young');
const part=()=>['match','flip','same','none','find','chal'][A.step];
const over=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function back(){const g=A.ctx;g.fillStyle=A.col.dark?'#172554':'#eff6ff';g.fillRect(0,0,A.W,A.H)}
/* ---------- 1. find the opposite ---------- */
let TGT=null,CH=[];
const choices=it=>(S.ma.i%2?[it.g,it.o]:[it.o,it.g]);
function pickOpp(w){const s=S.ma,it=O.MATCH[s.i];if(!it)return;s.drag=null;if(w!==it.o){s.bad=w;A.sound.miss();return tell(`${cap(w)} goes with ${it.w}, but it is not the other end. What is the other end of ${it.w}?`,true)}
 s.i++;s.bad=null;A.sound.pop();tell(`Yes! ${cap(it.w)} and ${it.o} are opposites.`+(s.i<O.MATCH.length?' Next one.':''),false)}
function drawMatch(){const s=S.ma,it=O.MATCH[s.i],y0=D.strip(it?`What is the opposite of ${it.w}?`:O.DONE[0],it?(s.bad?'no':''):'ok',S.msg,S.err);if(!it){TGT=null;CH=[];return}
 const gap=12,ch=Math.min((A.H-y0)*.42,170),cw=Math.min((A.W-24-gap)/2,ch*1.05),ty=y0+4,tw=cw,th=Math.min((A.H-y0)*.4,ch);
 TGT={x:(A.W-tw)/2,y:ty,w:tw,h:th};D.pic(TGT,it.w,{sel:!!s.drag});const cy=A.H-ch-8,x0=(A.W-2*cw-gap)/2;
 CH=choices(it).map((w,i)=>({w,x:x0+i*(cw+gap),y:cy,w0:cw,h:ch}));CH.forEach(r=>{const d=s.drag&&s.drag.w===r.w?s.drag:null,R={x:d?d.x-cw/2:r.x,y:d?d.y-ch/2:r.y,w:cw,h:ch};if(!d)D.pic(R,r.w,{no:s.bad===r.w})});
 if(s.drag){const d=s.drag;D.pic({x:d.x-cw/2,y:d.y-ch/2,w:cw,h:ch},d.w,{sel:1})}}
/* ---------- 2. flip the sentence ---------- */
let TL=[];
function flip(k){const s=S.fl,it=O.FLIP[s.i];if(!it||s.done)return;if(k!==it.k){s.bad=k;A.sound.miss();
  return tell(k===0?`"The" has no opposite. Find the word that does.`:k===2?`"Is" stays the same. Find the word you can swap.`:`A ${it.s[k]} has no opposite. Swap the word that tells what it is like.`,true)}
 s.done=1;s.bad=-1;A.sound.pop();tell(`${it.s.slice(0,3).join(' ')} ${it.to}. ${cap(it.s[3])} and ${it.to} are opposites, so now it means the other thing.`+(s.i+1<O.FLIP.length?' Tap Next.':''),false)}
function nextFlip(){const s=S.fl;if(!s.done)return;s.done=0;s.i++;s.bad=-1;tell(s.i<O.FLIP.length?'Next sentence. Which word can you swap?':O.DONE[1],false)}
function drawFlip(){const s=S.fl,it=O.FLIP[s.i],y0=D.strip(it?(s.done?'Look: the picture changed too.':'Tap the word you can swap for its opposite.'):O.DONE[1],it?(s.bad>=0?'no':s.done?'ok':''):'ok',S.msg,S.err);if(!it){TL=[];return}
 const word=s.done?it.to:it.s[3],th=Math.min(70,A.H*.15),ps=Math.min(A.H-y0-th-30,A.W*.5);const g=A.ctx;g.fillStyle='#ffffff';A.paint.rrect((A.W-ps)/2,y0+4,ps,ps,14);g.fill();O.icon(g,word,A.W/2,y0+4+ps/2,ps*.85);
 const gap=6,ws=it.s.map((w,i)=>i===it.k&&s.done?it.to:w),tot=A.W-16-gap*3,lens=ws.map(w=>Math.max(3,w.length)+2),sum=lens.reduce((a,b)=>a+b,0);let x=8;
 TL=ws.map((w,i)=>{const r={k:i,t:w,x,y:A.H-th-8,w:tot*lens[i]/sum,h:th};x+=r.w+gap;return r});TL.forEach(r=>D.box(r,r.t,{n:22,no:s.bad===r.k,ok:s.done&&r.k===it.k}))}
/* ---------- 3. opposites, or the same? ---------- */
let SB=[],PR=null;
function sortPair(z){const s=S.sa,it=O.SAME[s.i];if(!it)return;s.drag=null;if(z!==it.z){s.bad=z;A.sound.miss();
  return tell(it.z?`${cap(it.a)} and ${it.b} mean the same thing. They are not opposites.`:`${cap(it.a)} and ${it.b} are the two ends: they are opposites.`,true)}
 s.n[z]++;s.i++;s.bad=-1;A.sound.pop();tell((it.z?`${cap(it.a)} and ${it.b} mean the same.`:`${cap(it.a)} and ${it.b} are opposites.`)+(s.i<O.SAME.length?' Next pair.':''),false)}
function drawSame(){const s=S.sa,it=O.SAME[s.i],y0=D.strip(it?`${s.i+1} of ${O.SAME.length}: opposites, or the same?`:O.DONE[2],it?(s.bad>=0?'no':''):'ok',S.msg,S.err);
 const gap=10,bw=(A.W-16-gap)/2,bh=Math.min(A.H*.3,140),by=A.H-bh-8;SB=O.BINS.map((l,z)=>{const r={z,x:8+z*(bw+gap),y:by,w:bw,h:bh};D.box(r,'',{no:s.bad===z});const g=A.ctx;g.font=`800 ${D.sz(17)}${D.F}`;g.fillStyle=D.INK;g.textAlign='center';g.textBaseline='top';g.fillText(l,r.x+r.w/2,r.y+10);
  g.font=`700 ${D.sz(14)}${D.F}`;g.fillStyle='#334155';g.fillText(s.n[z]+' here',r.x+r.w/2,r.y+r.h-26);return r});
 if(it){const w=Math.min(A.W-40,300),h=Math.min(by-y0-24,90),d=s.drag;PR={x:d?d.x-w/2:(A.W-w)/2,y:d?d.y-h/2:y0+8,w,h};D.box(PR,`${it.a}  ·  ${it.b}`,{n:28,sel:!!d})}else PR=null}
/* ---------- 4. does it have an opposite? ---------- */
let YN=[];
function hasOpp(y){const s=S.no,it=O.NONE[s.i];if(!it)return;if(y!==it.y){s.bad=y;A.sound.miss();
  return tell(it.y?`${cap(it.w)} does have an opposite: ${it.o}.`:`A ${it.w==='red'?'colour':'thing'} like ${it.w} has no other end. ${it.w==='cat'?'A dog is just a different animal.':'It is just different from other '+(it.w==='red'?'colours.':'things.')}`,true)}
 s.i++;s.bad=-1;A.sound.pop();tell((it.y?`Yes: ${it.w} and ${it.o}.`:`Right: ${it.w} has no opposite.`)+(s.i<O.NONE.length?' Next word.':''),false)}
function drawNone(){const s=S.no,it=O.NONE[s.i],y0=D.strip(it?`Does ${it.w} have an opposite?`:O.DONE[3],it?(s.bad>=0?'no':''):'ok',S.msg,S.err);if(!it){YN=[];return}
 const oh=Math.min(78,A.H*.17),gap=10,ow=(A.W-16-gap)/2,oy=A.H-oh-8,ps=Math.min(oy-y0-16,A.W*.5);D.pic({x:(A.W-ps)/2,y:y0+4,w:ps,h:ps},it.w,{n:24});
 YN=[[1,'Has an opposite'],[0,'No opposite']].map(([y,l],i)=>({y,l,x:8+i*(ow+gap),y0:oy,yy:oy,w:ow,h:oh}));YN.forEach(r=>D.box({x:r.x,y:r.yy,w:r.w,h:r.h},r.l,{n:19,no:s.bad===r.y}))}
/* ---------- 5. find the pairs ---------- */
let CARDS=[];
function tapCard(i){const s=S.fi;if(s.got.length>=6||s.got.includes(i))return;if(s.first==null||s.first===i){s.first=s.first===i?null:i;s.bad=[];A.sound.tick();return tell(s.first==null?'Pick a card.':`${cap(O.DEAL[i])}. Now tap its opposite.`,false)}
 const a=O.DEAL[s.first],b=O.DEAL[i],pair=O.PAIRS.find(p=>p.includes(a)&&p.includes(b));if(!pair){s.bad=[s.first,i];s.first=null;A.sound.miss();return tell(`${cap(a)} and ${b} are not opposites. What is the other end of ${a}?`,true)}
 s.got.push(s.first,i);s.first=null;s.bad=[];A.sound.pop();tell(`${cap(a)} and ${b}: opposites!`+(s.got.length<6?' Find another pair.':''),false)}
function drawFind(){const s=S.fi,y0=D.strip(s.got.length<6?`Find the opposites. ${s.got.length/2} of 3 pairs found.`:O.DONE[4],s.got.length<6?(s.bad.length?'no':''):'ok',S.msg,S.err);
 const cols=A.narrow?2:3,rows=6/cols,gap=8,w=(A.W-16-gap*(cols-1))/cols,h=Math.min((A.H-y0-8-gap*(rows-1))/rows,w*.95);
 CARDS=O.DEAL.map((t,i)=>({i,x:8+(i%cols)*(w+gap),y:y0+4+Math.floor(i/cols)*(h+gap),w,h}));CARDS.forEach(r=>D.pic(r,O.DEAL[r.i],{n:18,ok:s.got.includes(r.i),sel:s.first===r.i,no:s.bad.includes(r.i)}))}
/* ---------- wiring ---------- */
const cap=t=>t[0].toUpperCase()+t.slice(1);
function draw(){back();const m=part();if(m==='chal'){D.strip('Challenge: opposites','ok');const s=Math.min(A.W*.4,A.H*.5);D.pic({x:A.W*.27-s/2,y:A.H*.55-s/2,w:s,h:s},'hot');D.pic({x:A.W*.73-s/2,y:A.H*.55-s/2,w:s,h:s},'cold');return}
 ({match:drawMatch,flip:drawFlip,same:drawSame,none:drawNone,find:drawFind})[m]();A.fx.draw(A.ctx)}
function down(p){const m=part();
 if(m==='match'){const r=CH.find(r=>over(p,{x:r.x,y:r.y,w:r.w0,h:r.h}));if(r){S.ma.drag={w:r.w,x:p.x,y:p.y,sx:p.x,sy:p.y};return true}return false}
 if(m==='flip'){if(S.fl.done){nextFlip();return false}const r=TL.find(r=>over(p,r));if(r)flip(r.k);return false}
 if(m==='same'){if(PR&&over(p,PR)){S.sa.drag={x:p.x,y:p.y};return true}const r=SB.find(r=>over(p,r));if(r)sortPair(r.z);return false}
 if(m==='none'){const r=YN.find(r=>over(p,{x:r.x,y:r.yy,w:r.w,h:r.h}));if(r)hasOpp(r.y);return false}
 if(m==='find'){const r=CARDS.find(r=>over(p,r));if(r)tapCard(r.i);return false}return false}
function move(p){const m=part(),d=m==='match'?S.ma.drag:m==='same'?S.sa.drag:null;if(d){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const m=part();
 if(m==='match'&&S.ma.drag){const d=S.ma.drag;S.ma.drag=null;const moved=Math.hypot(p.x-d.sx,p.y-d.sy)>12;if(!moved||over(p,TGT))pickOpp(d.w);else{A.redraw();tell('Drop the card on the picture at the top.',false)}}
 if(m==='same'&&S.sa.drag){S.sa.drag=null;const r=SB.find(r=>over(p,r));if(r)sortPair(r.z);else{A.redraw();tell('Drop the words in a box.',false)}}}
function clear(){run++;for(const k in S)delete S[k];Object.assign(S,{ma:{i:0,bad:null,drag:null},fl:{i:0,bad:-1,done:0},sa:{i:0,n:[0,0],bad:-1,drag:null},no:{i:0,bad:-1},fi:{got:[],first:null,bad:[]},msg:null,err:false,check:()=>{}})}
function tell(t,bad){S.msg=t;S.err=!!bad;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();S.check()}
const finish=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(O.DONE[i]+A.reveal(i))};
function open(i,ok){clear();c.say(O.DESC[i]);A.cv.setAttribute('aria-label',O.DESC[i]);S.check=finish(i,ok);keys();A.redraw()}
function auto(i,list){steps[i].go();const e=run;let t=0;list.forEach(([ms,f])=>{t+=ms;setTimeout(()=>{if(e===run)f()},t)})}
function keys(){if(!row)return;row.innerHTML='';const m=part(),K=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},row,t).onclick=f};
 if(m==='match'&&O.MATCH[S.ma.i]){const it=O.MATCH[S.ma.i];choices(it).forEach(w=>K(cap(w),()=>pickOpp(w),`The opposite of ${it.w} is ${w}`))}
 if(m==='flip'&&O.FLIP[S.fl.i]){const it=O.FLIP[S.fl.i];if(S.fl.done)K('Next',nextFlip,'Next sentence');else it.s.forEach((w,k)=>K(w,()=>flip(k),`Swap the word ${w} in: ${it.s.join(' ')}`))}
 if(m==='same'&&O.SAME[S.sa.i]){const it=O.SAME[S.sa.i];O.BINS.forEach((l,z)=>K(l,()=>sortPair(z),`${it.a} and ${it.b}: ${l}`))}
 if(m==='none'&&O.NONE[S.no.i]){const it=O.NONE[S.no.i];K('Has an opposite',()=>hasOpp(1),`${it.w} has an opposite`);K('No opposite',()=>hasOpp(0),`${it.w} has no opposite`)}
 if(m==='find'&&S.fi.got.length<6)O.DEAL.forEach((t,i)=>{if(!S.fi.got.includes(i))K(cap(t),()=>tapCard(i),`Card ${t}`+(S.fi.first===i?', picked':''))})}
const steps=[
{h:'Find the opposite',p:O.TXT[0],predict:{q:'What is the opposite of hot?',opts:['Fire','Cold'],ans:1},task:'Find all 5 opposites',
 show:()=>auto(0,O.MATCH.map(it=>[450,()=>pickOpp(it.o)])),go:()=>open(0,()=>S.ma.i>=O.MATCH.length)},
{h:'Flip the sentence',p:O.TXT[1],task:'Flip all 4 sentences',
 show:()=>auto(1,O.FLIP.flatMap(it=>[[450,()=>flip(it.k)],[450,nextFlip]])),go:()=>open(1,()=>S.fl.i>=O.FLIP.length||(S.fl.i===O.FLIP.length-1&&S.fl.done))},
{h:'Opposite or same?',p:O.TXT[2],predict:{q:'Big and large. Are they opposites?',opts:['Yes','No, they mean the same'],ans:1},task:'Sort all 6 pairs',
 show:()=>auto(2,O.SAME.map(it=>[420,()=>sortPair(it.z)])),go:()=>open(2,()=>S.sa.i>=O.SAME.length)},
{h:'No opposite?',p:O.TXT[3],predict:{q:'What is the opposite of cat?',opts:['Dog','Cat has no opposite'],ans:1},task:'Answer for all 6 words',
 show:()=>auto(3,O.NONE.map(it=>[420,()=>hasOpp(it.y)])),go:()=>open(3,()=>S.no.i>=O.NONE.length)},
{h:'Find the pairs',p:O.TXT[4],task:'Find all 3 pairs',
 show:()=>auto(4,O.PAIRS.flatMap(([a,b])=>[[380,()=>tapCard(O.DEAL.indexOf(a))],[380,()=>tapCard(O.DEAL.indexOf(b))]])),go:()=>open(4,()=>S.fi.got.length>=6)},
{h:'Challenge',p:'',go:()=>{clear();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
function why(t){let m='An opposite is the other end of the same thing, like hot and cold.';
 if(t==='goes')m='That word goes with it, but it is not the other end. Hot goes with fire, but the opposite of hot is cold.';
 if(t==='same')m='Those words mean the same, or nearly the same. Opposites mean the other end: big and little.';
 if(t==='every')m='Not every word has an opposite. A cat and a dog are just different animals.';
 if(t==='wrongword')m='That swapped the wrong word. Swap the word that tells what it is like: full becomes empty.';
 return m}
function quiz(){qn++;const Q=O.QS[qn%O.QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>score(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function score(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.25,draw,onStep:X=>{chal.hidden=X.step!==5;row.hidden=X.step===5;keys()},
 init:X=>{A=X;D=O.PEN(A);const w=c.el('div',{class:'fl-below'},A.below);row=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Opposites lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});keys()}}).start()})})();
