/* Flagship – subject-verb agreement (ages 6–7). Find the subject (who is doing it), then play the s swap: one frog hops,
   three frogs hop, so the s jumps from the verb to the noun as the picture changes. Pick the verb for he, they and I,
   choose is or are (Tom and Ana are), and fix sentences where the verb does not match. Every drag has a button twin. */
(()=>{
/* find: words, subject tile, verb tile, picture */
const FIND=[[['Mia','kicks','the ball.'],0,1,'⚽'],[['At night,','the owls','hoot.'],1,2,'🦉'],[['The big dog','barks','at the cat.'],0,1,'🐶']];
/* swap: noun, verb, how many, picture */
const SWAP=[['frog','hop',3,'🐸'],['cat','nap',1,'🐱'],['duck','swim',2,'🦆']];
/* pick: subject, rest, cards [word, ok?, why], picture */
const PRO=[['He','over the log.',[['jumps',1],['jump',0,'He is one person, so the verb takes s: he jumps.']],'🧒'],
 ['They','in the pool.',[['swims',0,'They means more than one. No s: they swim.'],['swim',1]],'👫'],
 ['I','my bike.',[['ride',1],['rides',0,'I never takes the s. I ride, you ride.']],'🙋']];
const ISA=[['The puppy','happy.',[['is',1],['are',0,'One puppy, so use is.']],'🐶',1],['The puppies','sleepy.',[['is',0,'Puppies means more than one. Use are.'],['are',1]],'🐶',3],
 ['Tom and Ana','friends.',[['is',0,'Tom and Ana are two people. Use are.'],['are',1]],'🧒👧',1]];
/* fix: words, wrong tile, fixed word, why */
const FIX=[[['The children','plays','in the park.'],1,'play','Children means more than one child, so no s: play.','🧒🧒🧒'],
 [['She','wash','the cup.'],1,'washes','She is one person. After sh, add es: washes.','🧽'],
 [['Sam and Mia','runs','fast.'],1,'run','Sam and Mia are two people, so no s: run.','🏃']];
VIS.reg('flagsva',c=>{let A,pad,quiz,qn=-1,run=0,stars=0;c.fig.classList.add('young');
const fresh=()=>({hook:()=>{},wait:0,n:0,k:0,toks:[],pic:'',cnt:1,cards:[],bad:-1,badc:-1,grab:null,ok:0}),S=fresh();
const part=()=>['find','swap','pro','isa','fix','quiz'][A.step];
const sz=n=>Math.round(n*(A.narrow?1:1.15)),fast=()=>A.reduced();
const tell=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
function txt(g,t,x,y,w,n,col,wt){g.font=`${wt||700} ${sz(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;const L=[];let s='';
 t.split(' ').forEach(z=>{const q=s?s+' '+z:z;if(g.measureText(q).width>w&&s){L.push(s);s=z}else s=q});L.push(s);const h=sz(n)*1.22;L.forEach((r,i)=>g.fillText(r,x,y+(i-(L.length-1)/2)*h))}
function emo(g,e,x,y,s){g.font=`${s}px system-ui,"Noto Color Emoji","Apple Color Emoji",sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(e,x,y)}
/* sentence layout: tokens wrap onto lines; a slot hugs the word before it */
function layout(){const g=A.ctx,f=sz(22),h=sz(48),pad=sz(12),gap=sz(9),maxW=A.W-20;g.font=`800 ${f}px system-ui,sans-serif`;
 const P=t=>/^[.,!?]$/.test(t.w),R=S.toks.map(t=>({t,w:t.slot?sz(34):P(t)?sz(10):g.measureText(t.show||t.w).width+pad*2,h})),G=t=>t.slot||P(t)?2:gap;const lines=[[]];let lw=0;
 R.forEach((r,i)=>{const gp=G(r.t);if(lw+gp+r.w>maxW&&lines[lines.length-1].length&&gp>2){lines.push([]);lw=0}lines[lines.length-1].push(r);lw+=(lw?gp:0)+r.w});
 const y0=A.H*(A.narrow?.36:.38)-(lines.length-1)*(h+8)/2;lines.forEach((L,j)=>{const tw=L.reduce((a,r,i)=>a+r.w+(i?G(r.t):0),0);let x=(A.W-tw)/2;
  L.forEach((r,i)=>{if(i)x+=G(r.t);r.x=x;r.y=y0+j*(h+8)-h/2;x+=r.w})});return R}
function cards(){const n=S.cards.length,w=Math.min(sz(130),(A.W-24-(n-1)*12)/n),h=sz(56),y=A.H*.74,x0=(A.W-(w*n+12*(n-1)))/2;return S.cards.map((c,j)=>({x:x0+j*(w+12),y,w,h}))}
function box(g,r,label,fill,stroke,lw,n){g.save();A.paint.shadow(6,2,.15);g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();A.paint.noShadow();g.strokeStyle=stroke;g.lineWidth=lw;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke();g.restore();txt(g,label,r.x+r.w/2,r.y+r.h/2,r.w+40,n||22,A.col.tx,800)}
function draw(A){const g=A.ctx,C=A.col,W=A.W,H=A.H,v=part();if(v==='quiz'){txt(g,'One subject: add s to the verb. More than one, I or you: no s.',W/2,H*.45,W-40,17);return}
 const py=H*(A.narrow?.12:.13),m=Math.min(S.cnt,4),ps=sz(m>2?40:46);for(let i=0;i<m;i++)emo(g,S.pic,W/2+(i-(m-1)/2)*ps*1.15,py,ps);
 if(v==='swap')txt(g,S.cnt===1?'one':S.cnt+', more than one',W/2,py+ps*.85,W-20,14,C.mu);
 layout().forEach((r,i)=>{const t=r.t,bad=S.bad===i,hot=t.hot&&!S.ok;let fill=t.on?A.mix(C.pn,C.gr,.22):bad?A.mix(C.pn,C.rd,.2):C.pn,st=t.on?C.gr:bad?C.rd:t.slot||t.blank?C.vi:C.ln;
  if(t.slot){g.setLineDash(t.fill?[]:[5,4]);box(g,r,t.fill?'s':'',fill,st,2.5);g.setLineDash([])}else if(/^[.,!?]$/.test(t.w))txt(g,t.w,r.x+r.w/2,r.y+r.h*.62,30,24,C.tx,800);else box(g,r,t.show||t.w,fill,st,bad||t.on?4:2);
  if(t.role&&S.ok)txt(g,t.role,r.x+r.w/2,r.y+r.h+sz(14),r.w+30,12,t.role==='subject'?C.vi:C.mu)});
 if(v==='swap'&&!S.ok){const r=trayS();if(!(S.grab&&S.grab.x!=null))box(g,r,'s',A.alpha(C.cy,.2),C.cy,3,26);txt(g,'Drag the s to the right word',W/2,r.y+r.h+sz(18),W-20,14,C.mu)}
 if((v==='pro'||v==='isa')&&!S.ok)cards().forEach((r,j)=>{if(S.grab&&S.grab.j===j&&S.grab.x!=null)return;box(g,r,S.cards[j][0],S.badc===j?A.mix(C.pn,C.rd,.2):C.pn,S.badc===j?C.rd:C.vi,S.badc===j?4:2.5,24)});
 if(S.grab&&S.grab.x!=null){const w=v==='swap'?sz(56):cards()[0].w,h=sz(56);box(g,{x:S.grab.x-w/2,y:S.grab.y-h/2,w,h},v==='swap'?'s':S.cards[S.grab.j][0],C.pn,C.cy,3,24)}
 A.fx.draw(g)}
const trayS=()=>({x:A.W/2-sz(28),y:A.H*.72,w:sz(56),h:sz(56)});
const miss=(t,i,j)=>{A.sound.miss();S.bad=i==null?-1:i;S.badc=j==null?-1:j;tell(t);setTimeout(()=>{S.bad=S.badc=-1;A.redraw()},fast()?10:900);A.redraw()};
const T=w=>({w});
function deal(){const v=part(),k=S.k;S.ok=0;S.bad=S.badc=-1;S.grab=null;S.cards=[];S.cnt=1;
 if(v==='find'){const[ws,si,vi,p]=FIND[k];S.toks=ws.map((w,i)=>({w,role:i===si?'subject':i===vi?'verb':''}));S.si=si;S.vi=vi;S.pic=p}
 if(v==='swap'){const[nn,vv,c,p]=SWAP[k];S.cnt=c;S.pic=p;S.toks=[T('The'),T(nn),{slot:1,id:'n'},T(vv),{slot:1,id:'v'},T('.')]}
 if(v==='pro'||v==='isa'){const[sub,rest,cs,p,cn]=(v==='pro'?PRO:ISA)[k];S.pic=p;S.cnt=cn||(sub==='They'?1:1);S.toks=[{w:sub,role:'subject'},{w:'___',blank:1,role:'verb'},T(rest)];S.cards=cs}
 if(v==='fix'){const[ws,wi,fx,why,p]=FIX[k];S.pic=p;S.toks=ws.map((w,i)=>({w,hot:i===wi}));S.wi=wi;S.fx=fx;S.why=why}}
const goal=()=>3;
function next(t){S.ok=1;S.n++;A.sound.pop();if(S.n<goal()){const k=S.k,r=run;S.wait=1;setTimeout(()=>{if(S.k!==k||r!==run)return;S.wait=0;S.k++;deal();tell(t+' Next one.');buttons();A.redraw()},fast()?5:800);tell(t)}else{tell(t);buttons()}A.redraw();S.hook()}
const line=()=>S.toks.map(t=>t.slot?(t.fill?'s':''):(t.show||t.w)).filter(x=>x).join(' ').replace(/ s(?=[ .]|$)/g,'s').replace(/ \./,'.');
function findTap(i){if(part()!=='find'||S.n>=3||S.wait||S.ok)return;const w=S.toks[i].w,verb=S.toks[S.vi].w;
 if(i===S.si){S.toks[i].on=1;return next(`${w} is the subject: ${w} ${verb}. The subject does the action.`)}
 if(i===S.vi)return miss(`${w} is the verb, the action word. Who ${verb}?`,i);miss(`${w.replace(/[.,]/g,'')} is not doing it. Ask: who ${verb}?`,i)}
function putS(id){if(part()!=='swap'||S.n>=3||S.wait||S.ok)return;const one=S.cnt===1,want=one?'v':'n',[nn,vv]=SWAP[S.k],i=S.toks.findIndex(t=>t.id===id);
 if(id!==want)return miss(one?`Only one ${nn}. The s goes on the verb: the ${nn} ${vv}s.`:`${S.cnt} ${nn}s: the s goes on ${nn}, and the verb has none. The ${nn}s ${vv}.`,i);
 S.toks[i].fill=1;S.toks[i].on=1;next(`"${line()}" `+(one?'One subject, so the verb takes the s.':'More than one, so the s moves to the noun. Only one of them gets it.'))}
function pick(j){const v=part();if(!(v==='pro'||v==='isa')||S.n>=3||S.wait||S.ok)return;const[w,ok,why]=S.cards[j];if(!ok)return miss(why,1,j);
 S.toks[1]={w,show:w,on:1,role:'verb'};next(`"${line()}" The verb matches the subject.`)}
function fixTap(i){if(part()!=='fix'||S.n>=3||S.wait||S.ok)return;if(i!==S.wi)return miss(`${S.toks[i].w.replace(/[.,]/g,'')} is fine. Look at the verb: does it match who is doing it?`,i);
 S.toks[i]={w:S.fx,on:1};next(`Fixed: "${line()}" ${S.why}`)}
function buttons(){if(!pad)return;pad.innerHTML='';const v=part(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=f};
 if(v==='quiz'||S.n>=goal()||S.ok)return;
 if(v==='find'||v==='fix')S.toks.forEach((t,i)=>B(t.w.replace(/[.,]/g,''),()=>(v==='find'?findTap:fixTap)(i),v==='find'?`${t.w}: is this the subject?`:`${t.w}: fix this word`));
 if(v==='swap'){const[nn,vv]=SWAP[S.k];B(`${nn} + s`,()=>putS('n'),`Put the s on ${nn}`);B(`${vv} + s`,()=>putS('v'),`Put the s on ${vv}`)}
 if(v==='pro'||v==='isa')S.cards.forEach((cd,j)=>B(cd[0],()=>pick(j),`Use ${cd[0]}`))}
const inside=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
function down(p){const v=part();if(S.n>=goal()||S.wait||S.ok)return false;const L=layout(),i=L.findIndex(r=>inside(p,{x:r.x-3,y:r.y-6,w:r.w+6,h:r.h+12}));
 if(v==='find'&&i>=0)findTap(i);if(v==='fix'&&i>=0)fixTap(i);
 if(v==='swap'){if(i>=0&&S.toks[i].slot)putS(S.toks[i].id);else if(inside(p,trayS())){S.grab={x:null,x0:p.x,y0:p.y};return true}}
 if(v==='pro'||v==='isa'){const j=cards().findIndex(r=>inside(p,r));if(j>=0){S.grab={j,x:null,x0:p.x,y0:p.y};return true}}return false}
function move(p){const d=S.grab;if(d&&(d.x!=null||Math.hypot(p.x-d.x0,p.y-d.y0)>8)){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=S.grab;S.grab=null;if(!d)return;const v=part();if(d.x==null){if(v!=='swap')pick(d.j);return A.redraw()}
 const L=layout(),near=L.map((r,i)=>[Math.hypot(p.x-(r.x+r.w/2),p.y-(r.y+r.h/2)),i]).filter(([z,i])=>v==='swap'?S.toks[i].slot:i===1).sort((a,b)=>a[0]-b[0])[0];
 if(near&&near[0]<sz(70)){if(v==='swap')putS(S.toks[near[1]].id);else pick(d.j)}else A.redraw()}
const finish=(n,msg)=>()=>{if(A.step===n&&S.n>=goal()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function auto(f,gap){const k=++run,tick=()=>{if(k!==run||S.n>=goal())return;f();setTimeout(tick,fast()?40:gap)};setTimeout(tick,fast()?30:gap)}
const restart=()=>{run++;Object.assign(S,fresh());if(A)deal()};
const steps=[
{h:'Who is doing it?',p:'The subject is who or what does the action. Tap the subject.',task:'Find 3 subjects',
 show:()=>{steps[0].go();auto(()=>findTap(S.si),450)},
 go:()=>{restart();tell('Mia kicks the ball. Who kicks?');buttons();S.hook=finish(0,'The subject does the action. The verb is the action.')}},
{h:'The s swap',p:'Look at the picture. One frog, or more? Drag the s to the noun or the verb.',predict:{q:'Three frogs. Which is right?',opts:['The frogs hops','The frogs hop'],ans:1},task:'Place the s in 3 sentences',
 show:()=>{steps[1].go();auto(()=>putS(S.cnt===1?'v':'n'),450)},
 go:()=>{restart();tell('How many frogs? Where does the s go?');buttons();S.hook=finish(1,'One: the dog runs. More than one: the dogs run. Only one word gets the s.')}},
{h:'He, they and I',p:'Drag the verb that matches the subject, or tap it.',predict:{q:'I is one person. Which is right?',opts:['I rides my bike','I ride my bike'],ans:1},task:'Match 3 verbs',
 show:()=>{steps[2].go();auto(()=>pick(S.cards.findIndex(x=>x[1])),450)},
 go:()=>{restart();tell('He ___ over the log. Pick the verb.');buttons();S.hook=finish(2,'He, she, it: add s. They, we, I, you: no s.')}},
{h:'Is or are?',p:'Is goes with one. Are goes with more than one.',predict:{q:'Tom and Ana ___ friends.',opts:['is, Ana is one girl','are, they are two people'],ans:1},task:'Pick is or are 3 times',
 show:()=>{steps[3].go();auto(()=>pick(S.cards.findIndex(x=>x[1])),450)},
 go:()=>{restart();tell('The puppy ___ happy. Is or are?');buttons();S.hook=finish(3,'One: is. More than one, or two names joined by and: are.')}},
{h:'Fix it',p:'Each sentence has one verb that does not match. Tap it to fix it.',task:'Fix 3 sentences',
 show:()=>{steps[4].go();auto(()=>fixTap(S.wi),450)},
 go:()=>{restart();tell('The children plays in the park. Which word is wrong?');buttons();S.hook=finish(4,'Check who is doing it, then make the verb match.')}},
{h:'Challenge',p:'',go:()=>{restart();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.hook()});
const QS=[['Which sentence is right?',[['The dogs run.','ok'],['The dogs runs.','both'],['The dog run.','one']]],['I ___ to school.',[['walk','ok'],['walks','i'],['walking','ing']]],
 ['The children ___ a song.',[['sing','ok'],['sings','irr'],['singing','ing']]],['Sam and Mia ___ happy.',[['are','ok'],['is','and'],['am','am']]],
 ['She ___ the dishes.',[['washes','ok'],['washs','es'],['wash','one']]],['The cat ___ milk.',[['likes','ok'],['like','one'],['liking','ing']]]];
function why(t){let m='Find the subject, then make the verb match.';
 if(t==='both')m='Only one word gets the s. Many dogs: the dogs run.';if(t==='one')m='One person or thing: add s to the verb.';
 if(t==='i')m='I and you never take the s: I walk.';if(t==='irr')m='Children already means more than one, so no s on the verb.';
 if(t==='and')m='Two names joined by and make more than one. Use are.';if(t==='es')m='After sh, ch, s or x, add es: washes.';
 if(t==='ing')m='An ing word needs a helper, like is or am. Here use the plain verb.';if(t==='am')m='Am only goes with I.';return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},box,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok){stars++;A.win()}else{stars=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Yes! Subject and verb agree.':'✗ '+why(t)}${ok?` Stars in a row: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);restart();A.gest({down,move,up});buttons()}});
A.start()})})();
