/* Flagship – saying goodbye at nursery: my grown-up comes back (ages 3-4; PSED, separation and the key person): walk
   the picture plan of the nursery day to see when the grown-up comes back, build a short goodbye routine (and see why
   sneaking out or holding on does not help), sort what is OK at goodbye (feelings) from what is not (hurting), shrink a
   worry cloud with things that really help, and watch a week of goodbyes. Data and drawings: bye_art.js. */
(()=>{const B=BYE;
VIS.reg('flagbyebye',c=>{let A,P,bar,quizBox,qi=-1,gen=0;const st={};c.fig.classList.add('young');
const mode=()=>['plan','rout','feel','worry','week','quiz'][A.step];
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const Up=t=>t.charAt(0).toUpperCase()+t.slice(1);
function paper(){const g=A.ctx;g.fillStyle=A.col.dark?'#1f2937':'#fff7ed';g.fillRect(0,0,A.W,A.H)}
/* ---------- 1. the picture plan ---------- */
let PLAN=[];
function walkTo(i){const s=st.pl;if(s.at>=B.DAY.length-1)return;if(i<=s.at){A.sound.tick();return say(`We did ${B.SAY[B.DAY[i]].toLowerCase()} already. Tap the next picture.`,false)}
 if(i>s.at+1){s.bad=i;A.sound.miss();const nx=B.SAY[B.DAY[s.at+1]];return say(B.DAY[i]==='back'?`Not yet! Your grown-up comes after story time. Next is ${nx.toLowerCase()}.`:`Not yet. Next is ${nx.toLowerCase()}. Go left to right.`,true)}
 s.at=i;s.bad=-1;A.sound.pop();say(B.DAY[i]==='back'?'Story time is done, and here is your grown-up!':`${B.SAY[B.DAY[i]]}. What comes next?`,false)}
function drawPlan(){const s=st.pl,end=s.at>=B.DAY.length-1,y0=P.strip(end?B.DONE[0]:'Tap the next picture in the plan.',end?'ok':s.bad>=0?'no':'',st.msg,st.bad);
 const cols=A.narrow?3:6,rows=6/cols,gap=8,w=(A.W-16-gap*(cols-1))/cols,h=Math.min((A.H-y0-10-gap*(rows-1))/rows,w*1.25);
 PLAN=B.DAY.map((k,i)=>({i,x:8+(i%cols)*(w+gap),y:y0+4+Math.floor(i/cols)*(h+gap),w,h}));
 PLAN.forEach(r=>P.card(r,B.SAY[B.DAY[r.i]],{pic:B.DAY[r.i],n:14,ok:r.i<=s.at,sel:r.i===s.at+1&&!end,no:r.i===s.bad}));
 const m=PLAN[s.at],g=A.ctx;g.fillStyle='#f97316';g.beginPath();g.arc(m.x+m.w-12,m.y+12,9,0,7);g.fill();g.strokeStyle='#7c2d12';g.lineWidth=2;g.stroke()}
/* ---------- 2. build a goodbye ---------- */
let SLOTS=[],RC=[];
function choose(j){const s=st.ro,it=B.ROUT[j];if(s.put.length>=3||s.put.includes(j))return;s.drag=null;
 if(!it.ok){s.bad=j;A.sound.miss();return say(it.why,true)}s.put.push(j);s.bad=-1;A.sound.pop();say(`${it.t}: yes!`+(s.put.length<3?' Find the next part.':''),false)}
function drawRout(){const s=st.ro,full=s.put.length>=3,y0=P.strip(full?B.DONE[1]:`My goodbye: ${s.put.length} of 3 parts.`,full?'ok':s.bad>=0?'no':'',st.msg,st.bad);
 const gap=8,sw=(A.W-16-gap*2)/3,sh=Math.min(A.H*.22,sw*1.0);SLOTS=[0,1,2].map(k=>({x:8+k*(sw+gap),y:y0+2,w:sw,h:sh}));
 SLOTS.forEach((r,k)=>{const j=s.put[k];if(j!=null)P.card(r,B.ROUT[j].t,{pic:B.ROUT[j].k,ok:1,n:13});else{const g=A.ctx;g.setLineDash([7,6]);g.strokeStyle=P.RIM;g.lineWidth=2;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke();g.setLineDash([]);g.fillStyle=P.fg();g.font=`800 ${P.sz(24)}${P.F}`;g.textAlign='center';g.textBaseline='middle';g.fillText(String(k+1),r.x+r.w/2,r.y+r.h/2)}});
 const top=y0+sh+14,left=B.ROUT.map((_,j)=>j).filter(j=>!s.put.includes(j)),cols=Math.min(3,left.length),rows=Math.ceil(left.length/cols),cw=(A.W-16-gap*(cols-1))/cols,ch=Math.min((A.H-top-8-gap*(rows-1))/rows,cw*1.05);
 RC=left.map((j,n)=>({j,x:8+(n%cols)*(cw+gap),y:top+Math.floor(n/cols)*(ch+gap),w:cw,h:ch}));
 RC.forEach(r=>{const d=s.drag&&s.drag.j===r.j?s.drag:null;P.card(d?{x:d.x-cw/2,y:d.y-ch/2,w:cw,h:ch}:r,B.ROUT[r.j].t,{pic:B.ROUT[r.j].k,n:13,no:s.bad===r.j,sel:!!d})})}
/* ---------- 3. OK or not OK? ---------- */
let BINS=[],FC=null;
function judge(z){const s=st.fe,it=B.FEEL[s.i];if(!it)return;s.drag=null;if(z!==it.ok){s.bad=z;A.sound.miss();
  return say(it.ok?`${it.t} is OK at goodbye. Lots of children feel like this. It is not naughty.`:`${it.t} can hurt someone, so it is not OK. Say how you feel with words instead.`,true)}
 s.n[z]++;s.i++;s.bad=-1;A.sound.pop();say((it.ok?`Yes, ${it.t.toLowerCase()} is OK.`:`Yes, ${it.t.toLowerCase()} is not OK.`)+(s.i<B.FEEL.length?' Next card.':''),false)}
function drawFeel(){const s=st.fe,it=B.FEEL[s.i],y0=P.strip(it?`${s.i+1} of ${B.FEEL.length}: OK, or not OK?`:B.DONE[2],it?(s.bad>=0?'no':''):'ok',st.msg,st.bad);
 const gap=10,bw=(A.W-16-gap)/2,bh=Math.min(A.H*.26,130),by=A.H-bh-8;BINS=[[1,'OK'],[0,'Not OK']].map(([z,l],k)=>{const r={z,x:8+k*(bw+gap),y:by,w:bw,h:bh};P.card(r,`${l} (${s.n[z]})`,{n:20,no:s.bad===z});return r});
 if(it){const w=Math.min(A.W*.5,220),h=Math.min(by-y0-14,w*1.05),d=s.drag;FC={x:d?d.x-w/2:(A.W-w)/2,y:d?d.y-h/2:y0+4,w,h};P.card(FC,it.t,{pic:it.k,n:15,sel:!!d})}else FC=null}
/* ---------- 4. make the worry smaller ---------- */
let KID=null,HC=[];
function help(j){const s=st.wo,it=B.HELP[j];if(s.lvl<=0||s.used.includes(j))return;s.drag=null;
 if(!it.d){s.bad=j;A.sound.miss();return say(it.why,true)}s.used.push(j);s.lvl--;s.bad=-1;A.sound.pop();say(`${it.t}. The worry got smaller.`+(s.lvl>0?' What else helps?':''),false)}
function drawWorry(){const s=st.wo,y0=P.strip(s.lvl>0?`Worry: ${s.lvl} of 3. What helps?`:B.DONE[3],s.lvl>0?(s.bad>=0?'no':''):'ok',st.msg,st.bad),g=A.ctx;
 const kh=Math.min(A.H*.34,170),kw=Math.min(A.W-16,360);KID={x:(A.W-kw)/2,y:y0+2,w:kw,h:kh};P.card(KID,'',{sel:!!s.drag});
 const cx=KID.x+kw*.3,R=kh*.11*(1+s.lvl*.55);g.fillStyle=A.col.dark?'#94a3b8':'#94a3b8';[[-1,0],[0,-.5],[1,0],[0,.3]].forEach(([a,b])=>{g.beginPath();g.arc(cx+a*R*.8,KID.y+kh*.42+b*R*.6,R*.75,0,7);g.fill()});
 g.fillStyle='#0f172a';g.font=`800 ${P.sz(15)}${P.F}`;g.textAlign='center';g.textBaseline='middle';g.fillText(s.lvl?'worry':'',cx,KID.y+kh*.42);
 B.icon(g,s.lvl?'worried':'happy',KID.x+kw*.72,KID.y+kh*.5,kh*.62);
 const top=KID.y+kh+10,left=B.HELP.map((_,j)=>j).filter(j=>!s.used.includes(j)),cols=A.narrow?3:5,rows=Math.ceil(left.length/cols),gap=8,cw=(A.W-16-gap*(cols-1))/cols,ch=Math.min((A.H-top-8-gap*(rows-1))/Math.max(1,rows),cw*1.1);
 HC=s.lvl>0?left.map((j,n)=>({j,x:8+(n%cols)*(cw+gap),y:top+Math.floor(n/cols)*(ch+gap),w:cw,h:ch})):[];
 HC.forEach(r=>{const d=s.drag&&s.drag.j===r.j?s.drag:null;P.card(d?{x:d.x-cw/2,y:d.y-ch/2,w:cw,h:ch}:r,B.HELP[r.j].t,{pic:B.HELP[r.j].k,n:12,no:s.bad===r.j,sel:!!d})})}
/* ---------- 5. a week of goodbyes ---------- */
let DAYS=[];
function nextDay(i){const s=st.wk;if(s.n>=5)return;if(i!==s.n){s.bad=i;A.sound.miss();return say(i<s.n?`${B.WEEK[i]} is done. Tap ${B.WEEK[s.n]}.`:`Days go in order. Tap ${B.WEEK[s.n]} first.`,true)}
 s.n++;s.bad=-1;A.sound.pop();say(`${B.WEEK[i]}: goodbye hug, play, snack, outside, story, and your grown-up came back. ${s.n} of 5.`,false)}
function drawWeek(){const s=st.wk,y0=P.strip(s.n<5?`Tap ${B.WEEK[s.n]}. Does your grown-up come back?`:B.DONE[4],s.n<5?(s.bad>=0?'no':''):'ok',st.msg,st.bad);
 const cols=A.narrow?3:5,rows=Math.ceil(5/cols),gap=8,w=(A.W-16-gap*(cols-1))/cols,h=Math.min((A.H-y0-10-gap*(rows-1))/rows,w*1.3);
 DAYS=B.WEEK.map((d,i)=>({i,x:8+(i%cols)*(w+gap),y:y0+4+Math.floor(i/cols)*(h+gap),w,h}));DAYS.forEach(r=>P.card(r,B.WEEK[r.i]+(r.i<s.n?' ✓':''),{pic:r.i<s.n?'back':'hug',n:14,ok:r.i<s.n,sel:r.i===s.n,no:s.bad===r.i}))}
/* ---------- wiring ---------- */
function draw(){paper();const m=mode();if(m==='quiz'){P.strip('Challenge: goodbye at nursery','ok');const s=Math.min(A.W*.36,A.H*.5);B.icon(A.ctx,'hug',A.W*.3,A.H*.58,s);B.icon(A.ctx,'back',A.W*.7,A.H*.58,s);return}
 ({plan:drawPlan,rout:drawRout,feel:drawFeel,worry:drawWorry,week:drawWeek})[m]();A.fx.draw(A.ctx)}
function down(p){const m=mode();
 if(m==='plan'){const r=PLAN.find(r=>hit(p,r));if(r)walkTo(r.i);return false}
 if(m==='rout'){const r=RC.find(r=>hit(p,r));if(r){st.ro.drag={j:r.j,x:p.x,y:p.y,sx:p.x,sy:p.y};return true}return false}
 if(m==='feel'){if(FC&&hit(p,FC)){st.fe.drag={x:p.x,y:p.y};return true}const r=BINS.find(r=>hit(p,r));if(r)judge(r.z);return false}
 if(m==='worry'){const r=HC.find(r=>hit(p,r));if(r){st.wo.drag={j:r.j,x:p.x,y:p.y,sx:p.x,sy:p.y};return true}return false}
 if(m==='week'){const r=DAYS.find(r=>hit(p,r));if(r)nextDay(r.i);return false}return false}
function move(p){const m=mode(),d=m==='rout'?st.ro.drag:m==='feel'?st.fe.drag:m==='worry'?st.wo.drag:null;if(d){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const m=mode();
 if(m==='rout'&&st.ro.drag){const d=st.ro.drag;st.ro.drag=null;const tap=Math.hypot(p.x-d.sx,p.y-d.sy)<=12;if(tap||SLOTS.some(r=>hit(p,r)))choose(d.j);else{A.redraw();say('Drop the card in the goodbye spaces at the top.',false)}}
 if(m==='feel'&&st.fe.drag){st.fe.drag=null;const r=BINS.find(r=>hit(p,r));if(r)judge(r.z);else{A.redraw();say('Drop the card in a box.',false)}}
 if(m==='worry'&&st.wo.drag){const d=st.wo.drag;st.wo.drag=null;const tap=Math.hypot(p.x-d.sx,p.y-d.sy)<=12;if(tap||hit(p,KID))help(d.j);else{A.redraw();say('Drop it on the child at the top.',false)}}}
function reset(){gen++;for(const k in st)delete st[k];Object.assign(st,{pl:{at:0,bad:-1},ro:{put:[],bad:-1,drag:null},fe:{i:0,n:{0:0,1:0},bad:-1,drag:null},wo:{lvl:3,used:[],bad:-1,drag:null},wk:{n:0,bad:-1},msg:null,bad:false,chk:()=>{}})}
function say(t,bad){st.msg=t;st.bad=!!bad;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();st.chk()}
const fin=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(B.DONE[i]+A.reveal(i))};
function enter(i,ok){reset();c.say(B.DESC[i]);A.cv.setAttribute('aria-label',B.DESC[i]);st.chk=fin(i,ok);buttons();A.redraw()}
function play(i,acts){steps[i].go();const e=gen;let t=0;acts.forEach(([ms,f])=>{t+=ms;setTimeout(()=>{if(e===gen)f()},t)})}
function buttons(){if(!bar)return;bar.innerHTML='';const m=mode(),Bt=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},bar,t).onclick=f};
 if(m==='plan'&&st.pl.at<B.DAY.length-1)B.DAY.forEach((k,i)=>{if(i>st.pl.at)Bt(B.SAY[k],()=>walkTo(i),`Go to ${B.SAY[k]}`)});
 if(m==='rout'&&st.ro.put.length<3)B.ROUT.forEach((it,j)=>{if(!st.ro.put.includes(j))Bt(it.t,()=>choose(j),`Put in my goodbye: ${it.t}`)});
 if(m==='feel'&&B.FEEL[st.fe.i]){const it=B.FEEL[st.fe.i];Bt('OK',()=>judge(1),`${it.t} is OK`);Bt('Not OK',()=>judge(0),`${it.t} is not OK`)}
 if(m==='worry'&&st.wo.lvl>0)B.HELP.forEach((it,j)=>{if(!st.wo.used.includes(j))Bt(it.t,()=>help(j),`Try: ${it.t}`)});
 if(m==='week'&&st.wk.n<5)Bt(B.WEEK[st.wk.n],()=>nextDay(st.wk.n),`Next day: ${B.WEEK[st.wk.n]}`)}
const steps=[
{h:'When do they come back?',p:B.TXT[0],predict:{q:'When does your grown-up come back?',opts:['Right after the hug','After story time'],ans:1},task:'Walk through the whole day',
 show:()=>play(0,[1,2,3,4,5].map(i=>[450,()=>walkTo(i)])),go:()=>enter(0,()=>st.pl.at>=B.DAY.length-1)},
{h:'A good goodbye',p:B.TXT[1],predict:{q:'Is it kinder if your grown-up sneaks out when you are not looking?',opts:['Yes, then no tears','No, always say goodbye'],ans:1},task:'Make a goodbye with 3 parts',
 show:()=>play(1,B.ROUT.map((it,j)=>it.ok?[480,()=>choose(j)]:null).filter(Boolean)),go:()=>enter(1,()=>st.ro.put.length>=3)},
{h:'OK or not OK?',p:B.TXT[2],predict:{q:'Mia cries when her dad goes. Is Mia being naughty?',opts:['Yes','No, sad is OK'],ans:1},task:'Sort all 6 cards',
 show:()=>play(2,B.FEEL.map(it=>[420,()=>judge(it.ok)])),go:()=>enter(2,()=>st.fe.i>=B.FEEL.length)},
{h:'Make the worry smaller',p:B.TXT[3],task:'Make the worry go away',
 show:()=>play(3,[0,2,3].map(j=>[500,()=>help(j)])),go:()=>enter(3,()=>st.wo.lvl<=0)},
{h:'A week of goodbyes',p:B.TXT[4],task:'Tap all 5 days',
 show:()=>play(4,[0,1,2,3,4].map(i=>[420,()=>nextDay(i)])),go:()=>enter(4,()=>st.wk.n>=5)},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>st.chk()});
function why(t){let m='Your grown-up always comes back, and a short goodbye helps.';
 if(t==='gone')m='Your grown-up always comes back. Every day they came back after story time.';
 if(t==='clock')m='Not then. The picture plan shows when: your grown-up comes back after story time.';
 if(t==='sneak')m='Sneaking out is not a goodbye. A hug and "see you after story" tell you they are coming back.';
 if(t==='long')m='A very long goodbye makes it harder. A short goodbye, the same each day, is best.';
 if(t==='naughty')m='Sad, worried or cross feelings are OK. Hurting is not. Say how you feel with words.';
 if(t==='alone')m='Waiting alone keeps the worry big. Go to your key person, then choose a game.';
 return m}
function ask(){qi++;const Q=B.QS[qi%B.QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 quizBox.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=quizBox.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function mark(t,a){quizBox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quizBox.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:X=>{quizBox.hidden=X.step!==5;bar.hidden=X.step===5;buttons()},
 init:X=>{A=X;P=B.PEN(A);const w=c.el('div',{class:'fl-below'},A.below);bar=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Goodbye lab buttons'},w);quizBox=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}}).start()})})();
