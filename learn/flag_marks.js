/* Flagship – Year 6 grammar terms: voice and punctuation (ages 10–11). Learners tap the subject and object of a
   sentence (and notice that a passive or an intransitive verb has no object), then use a hyphen to change meaning
   (man-eating shark), choose a colon or a semi-colon between clauses, and match the ellipsis, bullet points and hyphen
   to their jobs. Every tile can be dragged or picked with a button twin, and every slip gets a reason. */
(()=>{
const ROLES=[{w:['The dog','chased','the cat'],s:0,o:2,e:'🐕'},{w:['Priya','painted','a tiger'],s:0,o:2,e:'🎨'},
 {w:['The baby','slept','all night'],s:0,o:-1,e:'👶'},{w:['The window','was broken','by the ball'],s:0,o:-1,e:'🪟'}];
const HY=[{a:'a man',b:'eating shark',ans:'-',job:'Means: a shark that eats people',e:'🦈',ok:'man-eating: the hyphen joins two words into one describing word.'},
 {a:'a man',b:'eating a pie',ans:' ',job:'Means: a man who is eating a pie',e:'🥧',ok:'No hyphen: the man is doing the eating, so the words stay apart.'},
 {a:'re',b:'cover the chair',ans:'-',job:'Means: put a new cover on the chair',e:'🪑',ok:'re-cover: the hyphen keeps it apart from recover, which means get better.'},
 {a:'a little',b:'used car',ans:'-',job:'Means: a car that has hardly been used',e:'🚗',ok:'little-used: without the hyphen it could be a small, second-hand car.'}];
const CL=[{a:'Pack three things',b:'a hat, a map and a torch.',ans:':',job:'Introduce a list',e:'🎒',ok:'A colon introduces the list that follows.'},
 {a:'The cat slept',b:'the dog kept watch.',ans:';',job:'Join two equal sentences',e:'🐈',ok:'A semi-colon links two full sentences that belong together.'},
 {a:'I have one wish',b:'to see the sea.',ans:':',job:'Introduce what explains it',e:'🌊',ok:'A colon points ahead to the wish itself.'},
 {a:'Some pupils walk to school',b:'others take the bus.',ans:';',job:'Join two equal sentences',e:'🚌',ok:'Both sides are full sentences, so a semi-colon joins them.'}];
const JOB=[{a:'The door creaked open',b:'',ans:'…',job:'Build suspense with a trailing pause',e:'🚪',ok:'An ellipsis at the end leaves the reader waiting.'},
 {a:'Kit list:',b:'water bottle',ans:'•',job:'Set out items down the page, one per line',e:'📋',ok:'Bullet points split a list into separate lines.'},
 {a:'“We will fight',b:'to the end.”',ans:'…',job:'Show words left out of a quote',e:'💬',ok:'An ellipsis inside a quote marks words that were cut.'},
 {a:'a well',b:'known song',ans:'-',job:'Join two words that describe a noun',e:'🎵',ok:'well-known: a hyphen makes one describing word.'}];
const TILES={hy:[['-','hyphen'],[' ','space']],cl:[[':','colon'],[';','semi-colon'],[',','comma']],job:[['…','ellipsis'],['•','bullet points'],['-','hyphen']]};
VIS.reg('flagmarks',c=>{let A,pad,chal,qn=-1,run=0,gen=0;
const st={i:0,score:0,goal:4,pick:null,role:'s',bad:null,busy:0,quick:0,drag:null,shown:null,after:null};
const blank=()=>{gen++;run++;Object.assign(st,{i:0,score:0,goal:4,pick:null,role:'s',bad:null,busy:0,quick:0,drag:null,shown:null,after:null})};
const kind=()=>[null,'role','hy','cl','job',null][A.step];
const bank=()=>({hy:HY,cl:CL,job:JOB})[kind()];
const sc=n=>Math.round(n*(A.narrow?1:1.12));
const tell=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
const font=(px,wt)=>`${wt||800} ${sc(px)}px system-ui,sans-serif`;
function txt(t,x,y,px,col,wt,max,al){const g=A.ctx;g.font=font(px,wt);g.fillStyle=col||A.col.tx;g.textAlign=al||'center';g.textBaseline='middle';
 const out=[];let line='';String(t).split(' ').forEach(w=>{const tr=line?line+' '+w:w;if(line&&max&&g.measureText(tr).width>max){out.push(line);line=w}else line=tr});out.push(line);
 const lh=sc(px)*1.28;out.forEach((l,k)=>g.fillText(l,x,y+(k-(out.length-1)/2)*lh));return out.length*lh}
function box(r,hue,dash,lw){const g=A.ctx,C=A.col,col=hue&&C[hue];g.save();
 if(dash){g.setLineDash([7,5]);g.lineWidth=lw||2.5;g.strokeStyle=col||C.mu;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.stroke();g.restore();return}
 A.paint.shadow(5,2,.13);g.fillStyle=col?A.mix(C.pn,col,.22):C.pn;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();A.paint.noShadow();
 g.lineWidth=lw||2.5;g.strokeStyle=col||C.ln;g.stroke();g.restore()}
function icon(e,x,y,s){const g=A.ctx;g.font=`${sc(s)}px system-ui,"Noto Color Emoji","Apple Color Emoji",sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText(e,x,y)}
const hit=(p,r,m)=>{m=m||0;return p.x>=r.x-m&&p.x<=r.x+r.w+m&&p.y>=r.y-m&&p.y<=r.y+r.h+m};
/* role step geometry: chunks laid out in a centred row (wrapping on phones) */
function chunks(){const it=ROLES[st.i],g=A.ctx;g.font=font(21,800);const gap=10,h=sc(58);let rows=[[]],wid=[0];
 it.w.forEach((w,k)=>{const cw=g.measureText(w).width+sc(26),r=rows.length-1;if(wid[r]&&wid[r]+gap+cw>A.W-20){rows.push([]);wid.push(0)}const rr=rows.length-1;rows[rr].push({k,w,cw});wid[rr]+=(wid[rr]?gap:0)+cw});
 const out=[];rows.forEach((row,ri)=>{let x=(A.W-wid[ri])/2;row.forEach(o=>{out.push({k:o.k,v:o.w,x,y:A.H*.34+ri*(h+sc(28)),w:o.cw,h});x+=o.cw+gap})});return out}
const noneBtn=()=>({k:-1,v:'No object',x:A.W/2-sc(80),y:A.H*.74,w:sc(160),h:sc(54)});
/* fill steps geometry */
function hole(){return{x:A.W/2-sc(37),y:A.H*.42,w:sc(74),h:sc(66)}}
function tray(){const T=TILES[kind()],n=T.length,gap=12,w=Math.min(sc(108),(A.W-24-(n-1)*gap)/n),h=sc(70),x=(A.W-(n*w+(n-1)*gap))/2;
 return T.map(([v,name],k)=>{const d=st.drag;if(d&&d.v===v&&d.x!=null)return{v,name,x:d.x-w/2,y:d.y-h/2,w,h};return{v,name,x:x+k*(w+gap),y:A.H*.78,w,h}})}
function paint(A){const g=A.ctx,C=A.col,W=A.W,H=A.H,k=kind();
 if(A.step===0){txt('Grammar words for talking about sentences',W/2,H*.07,17,C.tx,900,W-24);
  const parts=[['Priya','subject','am'],['painted','verb','vi'],['a tiger.','object','cy']];g.font=font(24,900);const gap=10,ws=parts.map(p=>g.measureText(p[0]).width+sc(22)),tot=ws.reduce((a,b)=>a+b)+gap*2;let x=(W-tot)/2;
  parts.forEach((p,k)=>{const r={x,y:H*.17,w:ws[k],h:sc(56)};box(r,p[2]);txt(p[0],x+ws[k]/2,r.y+r.h/2,24,C.tx,900);txt(p[1],x+ws[k]/2,r.y+r.h+sc(16),14,C.mu,700);x+=ws[k]+gap});
  const marks=[['-','hyphen'],[':','colon'],[';','semi-colon'],['…','ellipsis'],['•','bullets']],bw=(W-24-4*8)/5;
  marks.forEach(([m,n],k)=>{const r={x:12+k*(bw+8),y:H*.52,w:bw,h:sc(70)};box(r,['am','cy','vi','gr','am'][k]);txt(m,r.x+bw/2,r.y+r.h*.42,30,C.tx,900);txt(n,r.x+bw/2,r.y+r.h+sc(15),12,C.mu,700)});
  txt('Each mark has a job. Each word in a sentence has a role.',W/2,H*.86,15,C.tx,700,W-30);return}
 if(A.step===5){txt('Name it, then use it: subject, object, active, passive, synonym, antonym and the marks.',W/2,H*.45,17,C.tx,800,W-40);return}
 if(k==='role'){const it=ROLES[st.i];icon(it.e,W/2,H*.11,44);
  txt(st.score>st.i?'Done!':st.role==='s'?'Tap the subject: who or what the sentence is about.':'Now tap the object: who or what receives the action.',W/2,H*.24,15,C.tx,800,W-24);
  chunks().forEach(r=>{const isS=st.pick&&st.pick.s===r.k,isO=st.pick&&st.pick.o===r.k&&r.k>=0;box(r,st.bad===r.k?'rd':isS?'am':isO?'cy':null);txt(r.v,r.x+r.w/2,r.y+r.h/2,21,C.tx,800);
   if(isS||isO)txt(isS?'subject':'object',r.x+r.w/2,r.y+r.h+sc(14),13,C.mu,800)});
  if(st.role==='o'){const n=noneBtn();box(n,st.bad===-1?'rd':st.pick&&st.pick.o===-1?'cy':'vi');txt(n.v,n.x+n.w/2,n.y+n.h/2,19,C.tx,800)}
  A.fx.draw(g);return}
 const it=bank()[st.i],h=hole(),put=st.shown;icon(it.e,W/2,H*.1,42);txt(it.job,W/2,H*.23,16,C.mu,800,W-24);
 g.font=font(22,800);const aw=g.measureText(it.a).width,bw2=g.measureText(it.b).width,tight=k==='hy',inline=aw+bw2+h.w+24<W-20;
 if(inline){const x0=(W-(aw+bw2+h.w+24))/2;h.x=x0+aw+12;txt(it.a,x0,h.y+h.h/2,22,C.tx,800,0,'left');txt(it.b,h.x+h.w+12,h.y+h.h/2,22,C.tx,800,0,'left')}
 else{txt(it.a,W/2,h.y-sc(22),22,C.tx,800,W-30);if(it.b)txt(it.b,W/2,h.y+h.h+sc(24),22,C.tx,800,W-30)}
 if(put==null)box(h,st.bad==='hole'?'rd':'am',1);else{box(h,'gr');txt(put===' '?'␣':put,h.x+h.w/2,h.y+h.h/2,32,C.tx,900);if(tight)txt(it.ok,W/2,H*.66,14,C.tx,700,W-28)}
 if(put==null)tray().forEach(r=>{box(r,st.bad===r.v?'rd':'vi');txt(r.v===' '?'␣':r.v,r.x+r.w/2,r.y+r.h*.42,30,C.tx,900);txt(r.name,r.x+r.w/2,r.y+r.h*.8,12,C.tx,700)});
 A.fx.draw(g)}
function slip(msg,tag){A.sound.miss();st.bad=tag;tell(msg);A.redraw();setTimeout(()=>{st.bad=null;A.redraw()},st.quick||A.reduced()?10:1300)}
function scored(msg){st.score++;A.sound.pop();tell(msg);twins();A.redraw();
 if(st.score>=st.goal)return st.after&&st.after();const me=gen,was=st.i;st.busy=1;
 setTimeout(()=>{if(me!==gen||st.i!==was)return;Object.assign(st,{i:st.i+1,pick:null,role:'s',shown:null,busy:0});tell('Next one.');twins();A.redraw()},st.quick||A.reduced()?5:1400)}
function tapRole(k){if(st.busy||st.score>=st.goal)return;const it=ROLES[st.i];
 if(st.role==='s'){if(k===it.s){st.pick={s:k,o:null};st.role='o';A.sound.tick();tell(`${it.w[k]} is the subject. Now find the object, or choose No object.`);twins();return A.redraw()}
  if(k===1)return slip(`${it.w[1]} is the verb, the action. The subject is who or what the sentence is about.`,k);
  if(st.i===3)return slip('The ball did the breaking, but this sentence is passive: the subject is the window, the thing it happened to.',k);
  return slip(`${it.w[k]} comes after the verb. The subject usually comes before it.`,k)}
 if(k===it.o){st.pick.o=k;return scored(k<0?`Right: ${it.w[1]} has no object here.`:`${it.w[k]} is the object: it receives the action.`)}
 if(k<0)return slip(`Something does receive the action here: who or what was ${it.w[1]}?`,k);
 if(k===1)return slip('That is the verb. The object comes after the verb and receives the action.',k);
 if(st.i===2)return slip('all night tells you how long. Nothing gets slept, so slept has no object.',k);
 if(st.i===3)return slip('by the ball names the doer in a passive sentence. It is not an object, so choose No object.',k);
 slip('That is the subject you already found. Look after the verb.',k)}
function drop(v){const k=kind();if(st.busy||st.score>=st.goal||st.shown!=null)return;const it=bank()[st.i];
 if(v===it.ans){st.shown=v;return scored(it.ok)}
 let m='Check the job that mark does.';
 if(k==='hy')m=v===' '?`Without a hyphen it reads differently. ${it.job.replace('Means: ','We want ')}.`:'With a hyphen the two words act as one describing word, which changes the meaning here.';
 if(k==='cl')m=v===','?'Two full sentences joined by just a comma make a comma splice. Pick a stronger mark.':v===';'?'After a semi-colon both sides must be full sentences. The second part is not one, so use a colon.':'A colon points ahead to a list or an explanation. These are two equal sentences: use a semi-colon.';
 if(k==='job')m=v==='•'?'Bullet points start lines in a list. They cannot sit inside a sentence.':v==='…'?'An ellipsis shows a pause or missing words, not a joined describing word.':'A hyphen joins words. It does not show a pause or set out a list.';
 slip(m,v)}
function twins(){if(!pad)return;pad.innerHTML='';const k=kind();if(!k||st.score>=st.goal||st.busy)return;
 const add=(t,fn,lab)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':lab},pad,t);b.onclick=fn};
 if(k==='role'){const it=ROLES[st.i];it.w.forEach((w,j)=>add(w,()=>tapRole(j),`${st.role==='s'?'Subject':'Object'}: ${w}`));if(st.role==='o')add('No object',()=>tapRole(-1),'This sentence has no object');return}
 if(st.shown==null)TILES[k].forEach(([v,name])=>add(v===' '?'space':v,()=>drop(v),`Put a ${name} in the gap`))}
function down(p){if(st.busy||st.score>=st.goal)return false;const k=kind();
 if(k==='role'){const r=chunks().concat(st.role==='o'?[noneBtn()]:[]).find(r=>hit(p,r,5));if(r)tapRole(r.k);return false}
 if(!k||st.shown!=null)return false;const r=tray().find(r=>hit(p,r,8));if(!r)return false;st.drag={v:r.v,x:null,sx:p.x,sy:p.y};return true}
function move(p){const d=st.drag;if(d&&(d.x!=null||Math.abs(p.x-d.sx)+Math.abs(p.y-d.sy)>8)){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=st.drag;st.drag=null;if(!d)return;if(d.x==null)return drop(d.v);
 const h=hole();if(Math.abs(p.y-(h.y+h.h/2))<h.h)return drop(d.v);st.bad='hole';tell('Drop it in the dashed gap.');A.redraw();setTimeout(()=>{st.bad=null;A.redraw()},900)}
function auto(){const k=kind();if(!k)return;if(k==='role'){const it=ROLES[st.i];return tapRole(st.role==='s'?it.s:it.o)}drop(bank()[st.i].ans)}
const wrap=(n,msg)=>()=>{if(A.step===n&&st.score>=st.goal&&A.pred[n]!=null)A.done(msg+A.reveal(n))};
const demo=n=>()=>{steps[n].go();st.quick=1;const me=++run;(function loop(){if(me!==run||A.step!==n||st.score>=st.goal)return;if(!st.busy)auto();setTimeout(loop,60)})()};
const steps=[
{h:'Words for sentences',p:'Year 6 writers use exact terms. The subject is who or what a sentence is about. The object receives the action. Punctuation marks each have a job.',go:()=>{blank();tell('Priya is the subject, painted is the verb, a tiger is the object.')}},
{h:'Subject and object',p:'Tap the subject, then the object. Some verbs have no object, and in a passive sentence the doer moves into a by-phrase.',
 predict:{q:'In The window was broken by the ball, what is the subject?',opts:['The ball, because it did the breaking','The window, because the sentence is about it'],ans:1},task:'Label 4 sentences',show:demo(1),
 go:()=>{blank();tell('Tap the subject first.');twins();st.after=wrap(1,'The subject is who or what the sentence is about; it is not always the doer. Passive and some verbs like slept have no object.')}},
{h:'Hyphen or space?',p:'A hyphen joins two words so they work as one. It can change the meaning completely. Read the meaning, then drop a hyphen or a space into the gap.',
 predict:{q:'A man eating shark and a man-eating shark: same meaning?',opts:['Yes, the hyphen is just decoration','No: one is a man eating, one is a shark that eats people'],ans:1},task:'Fix 4 phrases',show:demo(2),
 go:()=>{blank();tell('Drag a hyphen or a space into the gap.');twins();st.after=wrap(2,'A hyphen joins words into one describing word and avoids a muddle: man-eating, re-cover, little-used.')}},
{h:'Colon or semi-colon?',p:'A colon introduces a list or an explanation. A semi-colon joins two full sentences that are closely linked. A comma alone cannot join two sentences.',
 predict:{q:'Can a comma join The cat slept and the dog kept watch?',opts:['Yes, a comma is enough','No, that is a comma splice'],ans:1},task:'Punctuate 4 sentences',show:demo(3),
 go:()=>{blank();tell('Drag a colon, a semi-colon or a comma into the gap.');twins();st.after=wrap(3,'Colon: points ahead to a list or an explanation. Semi-colon: joins two equal full sentences.')}},
{h:'Match the mark to the job',p:'An ellipsis is three dots. It shows a pause or words left out. Bullet points set out a list down the page. A hyphen joins words.',
 predict:{q:'What can an ellipsis show?',opts:['Only that a sentence has ended','A pause, or words left out'],ans:1},task:'Match 4 jobs',show:demo(4),
 go:()=>{blank();tell('Read the job, then drag the mark that does it.');twins();st.after=wrap(4,'Ellipsis for a pause or missing words, bullet points for a list down the page, a hyphen to join words.')}},
{h:'Challenge',p:'',go:()=>{blank();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>st.after&&st.after()});
const Q=[['Which word is a synonym of huge?',[['enormous','ok'],['tiny','anto'],['hugely','form']]],
 ['Which word is an antonym of ancient?',[['modern','ok'],['old','syn'],['antique','syn']]],
 ['In The cake was eaten by Max, what is the subject?',[['the cake','ok'],['Max','doer'],['eaten','verb']]],
 ['Which sentence uses a semi-colon correctly?',[['It rained; we stayed in.','ok'],['We need; eggs and milk.','list'],['Because it rained; we stayed in.','frag']]],
 ['What is the object in Ella kicked the ball?',[['the ball','ok'],['Ella','subj'],['kicked','verb']]],
 ['Why might a writer end a sentence with an ellipsis?',[['To build suspense or show a pause','ok'],['To start a list','colon'],['To join two words','hyph']]],
 ['Which sentence is in the active voice?',[['The chef cooked the meal.','ok'],['The meal was cooked by the chef.','pass'],['The meal was cooked.','pass']]]];
function why(t){let m='Look back at the job of each term, then try again.';
 if(t==='anto')m='tiny means the opposite, so it is an antonym. A synonym means the same: enormous.';
 if(t==='form')m='hugely is the same word in a new form, not a synonym. Enormous means the same as huge.';
 if(t==='syn')m='That means nearly the same, so it is a synonym. An antonym means the opposite: modern.';
 if(t==='doer')m='Max did the eating, but the sentence is passive. The subject is the cake.';
 if(t==='verb')m='That is the verb. Subjects and objects are the who or what around it.';
 if(t==='list')m='A semi-colon needs a full sentence on both sides. Before a list, use a colon.';
 if(t==='frag')m='Because it rained is not a full sentence on its own, so a semi-colon cannot follow it.';
 if(t==='subj')m='Ella is the subject: she does the kicking. The object receives it: the ball.';
 if(t==='colon')m='A colon introduces a list. An ellipsis shows a pause or missing words.';
 if(t==='hyph')m='A hyphen joins words. Three dots at the end show a pause.';
 if(t==='pass')m='was cooked is passive: the meal is the subject. Active puts the doer first: The chef cooked the meal.';return m}
function next(){qn++;const [q,ops]=Q[qn%Q.length],sh=qn%3,list=ops.slice(sh).concat(ops.slice(0,sh));
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=chal.querySelector('.fl-pick');list.forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},g,o);b.onclick=()=>judge(t)});tell('Challenge: '+q);A.redraw()}
let row=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const ok=t==='ok',fb=chal.querySelector('.fl-fb');
 if(ok){row++;A.win()}else{row=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Correct. Streak: ${row}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next question →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.66,tall:1.3,draw:paint,onStep:A=>{chal.hidden=A.step!==5;pad.hidden=A.step===5;twins()},
 init:A=>{const wrapEl=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},wrapEl);chal=c.el('div',{class:'fl-chal'},A.below);blank();A.gest({down,move,up});twins()}});
A.start()})})();
