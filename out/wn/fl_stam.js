/* Flagship – building writing stamina (ages 6–7): match each writing job to its form (instructions, recount, letter),
   put seed-planting instructions in order and watch the pot respond, write a zoo-trip recount with time words and the
   past tense, lay out a thank-you letter (Dear …, message, Love from …), then keep a page going past two "stuck" moments
   by rereading and checking the plan. Every canvas tap or drag has a big button twin. */
(()=>{
const FORMS=[{e:'🔢',n:'Instructions',why:'Instructions tell how to do a job, step by step.'},{e:'🕰️',n:'Recount',why:'A recount tells what happened, in time order.'},{e:'✉️',n:'Letter',why:'A letter talks to one person, from Dear to Love from.'}];
const JOBS=[{e:'🌱',t:'Tell a friend how to plant a seed',f:0},{e:'🦁',t:'Tell what we did at the zoo',f:1},{e:'🎁',t:'Say thank you to Gran for a gift',f:2},{e:'⚽',t:'Tell what happened on sports day',f:1}];
const SEED=['Fill a pot with soil.','Push a hole in the soil.','Drop the seed in the hole.','Water the soil.'],SHUF=[2,0,3,1];
const NOTYET=['','There is no soil yet, so there is nowhere to push a hole.','The seed would roll about. Make a hole for it first.','Water first? The seed is not in yet. Water comes last.'];
const RC=[[['First, we got on the bus.','ok'],['Finally, we got on the bus.','order'],['We will get on the bus.','tense']],
 [['Next, we will see the lions.','tense'],['Next, we saw the lions.','ok'],['Lions eat meat.','fact']],
 [['First, we ate lunch.','order'],['I like ducks.','fact'],['After that, we ate lunch by the pond.','ok']],
 [['Finally, we went home, tired and happy.','ok'],['Then we will go home.','tense'],['First, we went home.','order']]];
const RCWHY={order:'That time word is in the wrong place. First starts, Finally ends.',tense:'That says will, so it has not happened yet. A recount tells what already happened: went, saw, ate.',fact:'That is not something that happened on our trip. A recount tells the events, in order.'};
const TL=['🚌','🦁','🥪','🏠'],PIECE=['Dear Gran,','Thank you for the red kite. It flies so high!','Love from Sam'],SLOT=['Top','Middle','End'];
const PAGE=['First, we got on the bus.','We sang all the way.','Next, we saw the lions.','A big lion roared at us!','After that, we ate lunch.','Finally, we went home.'];
VIS.reg('flagstam',c=>{let A,pad,qb,qn=-1,run=0,ver=0;c.fig.classList.add('young');
const S={};const fresh=()=>Object.assign(S,{at:[-1,-1,-1,-1],sel:-1,drag:null,did:[],bad:0,rc:[],lt:[-1,-1,-1],lines:0,stuck:false,wiped:0,want:()=>{}});fresh();
const mode=()=>['sort','instr','recount','letter','stamina','quiz'][A.step];
const speak=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
const fs=n=>Math.round(n*(A.narrow?1:1.15));
function txt(g,t,x,y,n,col,wt,al){g.font=`${wt||700} ${fs(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col;g.fillText(t,x,y)}
function emo(g,e,x,y,n){g.font=`${fs(n)}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(e,x,y)}
function lines(g,t,w,n){g.font=`700 ${fs(n)}px system-ui,sans-serif`;const out=[];let cur='';t.split(' ').forEach(wd=>{const s=cur?cur+' '+wd:wd;if(g.measureText(s).width>w&&cur){out.push(cur);cur=wd}else cur=s});out.push(cur);return out}
function para(g,t,x,y,w,n,col){lines(g,t,w,n).forEach((l,i)=>txt(g,l,x,y+i*fs(n)*1.25,n,col))}
const tint=(h,k)=>A.mix(A.col.pn,h,A.col.dark?k*.3:k);
function card(g,b,fill,edge){g.fillStyle=fill;A.paint.rrect(b.x,b.y,b.w,b.h,12);g.fill();g.lineWidth=2;g.strokeStyle=edge||A.mix(A.col.tx,A.col.pn,.55);g.stroke()}
const hit=(p,b)=>p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
/* layout */
const jobBox=i=>{const w=(A.W-30)/2,h=A.H*.19;return{x:10+(i%2)*(w+10),y:A.H*.03+Math.floor(i/2)*(h+8),w,h}};
const formBox=j=>{const w=(A.W-40)/3;return{x:10+j*(w+10),y:A.H*.48,w,h:A.H*.46}};
const rowBox=(i,n,top)=>{const h=(A.H*.97-top)/n-6;return{x:12,y:top+i*(h+6),w:A.W-24,h}};
const pieceBox=i=>({x:12,y:A.H*(.03+i*.1),w:A.W-24,h:A.H*.085});
const slotBox=i=>({x:A.W*.1,y:A.H*(.38+i*.2),w:A.W*.8,h:A.H*.16});
function draw(A){const{ctx:g,W,H,col:C}=A,m=mode();g.fillStyle=tint('#fef9c3',.35);g.fillRect(0,0,W,H);
 if(m==='sort'){FORMS.forEach((f,j)=>{const b=formBox(j);card(g,b,tint(['#dbeafe','#dcfce7','#fce7f3'][j],.9));emo(g,f.e,b.x+b.w/2,b.y+24,24);txt(g,f.n,b.x+b.w/2,b.y+52,13,C.tx,800);
   S.at.forEach((v,i)=>{if(v===j)emo(g,JOBS[i].e,b.x+b.w/2,b.y+86+JOBS.filter((z,k)=>k<i&&S.at[k]===j).length*36,26)})});
  JOBS.forEach((z,i)=>{if(S.at[i]>=0)return;const b=jobBox(i),d=S.drag&&S.drag.i===i,bx=d?{...b,x:S.drag.x-b.w/2,y:S.drag.y-b.h/2}:b;card(g,bx,S.sel===i?tint('#fde68a',1):tint('#ffffff',.95),S.sel===i?C.am:0);
   emo(g,z.e,bx.x+20,bx.y+bx.h/2,22);para(g,z.t,bx.x+bx.w/2+12,bx.y+bx.h/2-fs(12)*.6,bx.w-50,12,C.tx)})}
 if(m==='instr'){const s=S.did.length,px=W*.17,py=H*.27,pw=W*.24,ph=H*.2;
  g.fillStyle=A.mix('#c2410c',C.pn,C.dark?.15:0);g.beginPath();g.moveTo(px-pw/2,py-ph/2);g.lineTo(px+pw/2,py-ph/2);g.lineTo(px+pw*.38,py+ph/2);g.lineTo(px-pw*.38,py+ph/2);g.closePath();g.fill();
  if(s>=1){g.fillStyle='#57361e';g.fillRect(px-pw*.46,py-ph/2+4,pw*.92,ph*.22)}if(s>=2){g.fillStyle='#1c1008';g.beginPath();g.ellipse(px,py-ph/2+ph*.1,9,6,0,0,7);g.fill()}
  if(s>=3)emo(g,'🫘',px,py-ph/2+ph*.08,14);if(s>=4){emo(g,'💧',px-22,py-ph*.85,16);emo(g,'🌱',px,py-ph*.82,30)}
  if(S.bad){const t=S.bad;txt(g,t===3?'💧 runs out':t===2?'🫘 rolls off':'🤷 no soil',px,py+ph/2+20,12,C.tx)}
  for(let k=0;k<4;k++){const y=H*(.06+k*.105);txt(g,`${k+1}.`,W*.34,y,14,C.mu,800,'left');if(S.did[k]!=null){const w=SEED[S.did[k]].split(' ');txt(g,w[0],W*.39,y,13,C.ac,900,'left');txt(g,w.slice(1).join(' '),W*.39+g.measureText(w[0]+' ').width,y,13,C.tx,700,'left')}else{g.strokeStyle=C.mu;g.setLineDash([4,4]);g.beginPath();g.moveTo(W*.39,y+8);g.lineTo(W-14,y+8);g.stroke();g.setLineDash([])}}
  SHUF.filter(i=>!S.did.includes(i)).forEach((i,r,a)=>{const b=rowBox(r,4,H*.52);card(g,b,tint('#ffffff',.95));txt(g,SEED[i],W/2,b.y+b.h/2,14,C.tx)})}
 if(m==='recount'){const n=S.rc.length;TL.forEach((e,i)=>{const x=W*(.14+i*.24);g.globalAlpha=i<n?1:.3;emo(g,e,x,H*.07,22);g.globalAlpha=1;if(i<3){g.strokeStyle=C.mu;g.beginPath();g.moveTo(x+18,H*.07);g.lineTo(x+W*.24-18,H*.07);g.stroke()}});
  card(g,{x:10,y:H*.14,w:W-20,h:H*.36},tint('#ffffff',.97));for(let k=0;k<4;k++){const y=H*(.2+k*.085);g.strokeStyle=A.mix(C.ln,C.pn,.2);g.beginPath();g.moveTo(20,y+10);g.lineTo(W-20,y+10);g.stroke();if(k<n){const t=RC[k].find(o=>o[1]==='ok')[0],cut=t.indexOf(',')+1;txt(g,t.slice(0,cut),22,y,12,C.ac,900,'left');g.font=`900 ${fs(12)}px system-ui`;txt(g,t.slice(cut),22+g.measureText(t.slice(0,cut)).width,y,12,C.tx,700,'left')}}
  if(n<4)RC[n].forEach((o,i)=>{const b=rowBox(i,3,H*.54);card(g,b,tint('#e0f2fe',.8));txt(g,o[0],W/2,b.y+b.h/2,13,C.tx)});else txt(g,'4 events, in time order, all in the past.',W/2,H*.7,14,C.tx,800)}
 if(m==='letter'){PIECE.forEach((t,i)=>{if(S.lt[i]>=0)return;const b=pieceBox(i),d=S.drag&&S.drag.i===i,bx=d?{...b,y:S.drag.y-b.h/2}:b;card(g,bx,S.sel===i?tint('#fde68a',1):tint('#ffffff',.95),S.sel===i?C.am:0);txt(g,t.length>34&&A.narrow?t.slice(0,31)+'…':t,W/2,bx.y+bx.h/2,13,C.tx)});
  card(g,{x:A.W*.06,y:H*.34,w:W*.88,h:H*.64},tint('#fefce8',.95));SLOT.forEach((s,j)=>{const b=slotBox(j),who=S.lt.indexOf(j);if(who<0){g.setLineDash([5,5]);g.strokeStyle=C.mu;A.paint.rrect(b.x,b.y,b.w,b.h,8);g.stroke();g.setLineDash([]);txt(g,s,b.x+b.w/2,b.y+b.h/2,12,C.mu)}
   else para(g,PIECE[who],j===0?b.x+b.w*.3:j===2?b.x+b.w*.7:b.x+b.w/2,b.y+b.h/2-(who===1?fs(13)*.6:0),b.w-10,13,C.tx)})}
 if(m==='stamina'){TL.forEach((e,i)=>{const b={x:10+i*(W-20)/4,y:H*.03,w:(W-20)/4-6,h:H*.13};card(g,b,tint('#ede9fe',.8));emo(g,e,b.x+b.w/2,b.y+b.h/2,22);if(S.lines>i*1.5+1)txt(g,'✓',b.x+b.w-10,b.y+12,12,C.tx,900)});txt(g,'My plan',W/2,H*.2,12,C.mu);
  card(g,{x:10,y:H*.24,w:W-20,h:H*.6},tint('#ffffff',.97));for(let k=0;k<6;k++){const y=H*(.3+k*.088);g.strokeStyle=A.mix(C.ln,C.pn,.2);g.beginPath();g.moveTo(20,y+10);g.lineTo(W-20,y+10);g.stroke();if(k<S.lines)txt(g,PAGE[k],24,y,13,C.tx,700,'left')}
  if(S.stuck){g.fillStyle=tint('#fde68a',1);A.paint.rrect(W*.55,H*.64,W*.4,H*.14,14);g.fill();txt(g,'🤔 Stuck!',W*.75,H*.71,15,C.tx,900)}
  txt(g,`${S.lines} of 6 lines${S.wiped?` · rubbed out ${S.wiped}×`:''}`,W/2,H*.92,13,C.tx,800)}
 if(m==='quiz'){emo(g,'📝',W/2,H*.3,44);txt(g,'Pick the right kind of writing for the job.',W/2,H*.6,14,C.tx)}A.fx.draw(g)}
/* actions */
function place(i,j){if(S.at[i]>=0)return;S.sel=-1;if(JOBS[i].f===j){S.at[i]=j;A.sound.pop();speak(`${JOBS[i].t}: ${FORMS[j].n.toLowerCase()}. ${FORMS[j].why}`);S.want()}
 else{A.sound.miss();speak(`Not ${FORMS[j].n.toLowerCase()}. ${FORMS[JOBS[i].f].why}`)}keys();A.redraw()}
function instr(i){if(S.did.includes(i)||S.did.length>=4)return;const need=S.did.length;if(i===need){S.did.push(i);S.bad=0;A.sound.pop();speak(`Step ${need+1}: ${SEED[i]} ${need===3?'A shoot pops up! Fill, Push, Drop, Water are bossy verbs: they tell you what to do.':''}`);S.want()}
 else{S.bad=i;A.sound.miss();speak(NOTYET[i]||'Do that first: fill the pot with soil.')}keys();A.redraw()}
function pickRc(j){const n=S.rc.length;if(n>=4)return;const[o,t]=RC[n][j];if(t==='ok'){S.rc.push(j);A.sound.pop();speak(n<3?`Yes: ${o}`:'The recount is done. Time words keep it in order.');S.want()}else{A.sound.miss();speak(RCWHY[t])}keys();A.redraw()}
function putPiece(i,j){if(S.lt[i]>=0)return;S.sel=-1;if(i===j){S.lt[i]=j;A.sound.pop();speak(['Dear Gran goes at the top. It says who the letter is for.','The message goes in the middle.','Love from Sam goes at the end. It says who wrote it.'][i]);S.want()}
 else{A.sound.miss();speak(i===2?'Love from Sam goes at the end, so Gran sees who wrote it after she reads.':i===0?'Dear Gran goes at the top, so Gran knows it is for her.':'The message goes in the middle, between Dear and Love from.')}keys();A.redraw()}
function write(){if(S.stuck||S.lines>=6)return;S.lines++;A.sound.tick();if(S.lines===2||S.lines===4){S.stuck=true;speak(`${S.lines} lines. Oh no, stuck! What will you do?`)}else speak(S.lines>=6?'The page is full! You kept going.':`Line ${S.lines}: ${PAGE[S.lines-1]}`);if(S.lines>=6)S.want();keys();A.redraw()}
function unstick(k){if(!S.stuck)return;if(k===0){S.stuck=false;A.sound.pop();speak(`You read back "${PAGE[S.lines-1]}" and looked at your plan. Next is the ${['','','lions','','lunch'][S.lines]}. Keep going!`)}
 else if(k===1){S.wiped++;S.lines=0;S.stuck=false;A.sound.miss();speak('Rubbing it all out lost every line. You have to start again from line 1.')}else{A.sound.miss();speak('If you stop now the page stays half done. Read back your last line and look at your plan.')}keys();A.redraw()}
function keys(){if(!pad)return;pad.innerHTML='';const m=mode(),B=(t,f)=>{c.el('button',{type:'button',class:'lbtn ghost'},pad,t).onclick=f};
 if(m==='sort'){if(S.sel<0)JOBS.forEach((z,i)=>{if(S.at[i]<0)B(`${z.e} ${z.t}`,()=>{S.sel=i;speak('Now pick the kind of writing.');keys();A.redraw()})});else FORMS.forEach((f,j)=>B(`${f.e} ${f.n}`,()=>place(S.sel,j)))}
 if(m==='instr')SHUF.forEach(i=>{if(!S.did.includes(i))B(SEED[i],()=>instr(i))});
 if(m==='recount'&&S.rc.length<4)RC[S.rc.length].forEach((o,j)=>B(o[0],()=>pickRc(j)));
 if(m==='letter'){if(S.sel<0)PIECE.forEach((t,i)=>{if(S.lt[i]<0)B(t,()=>{S.sel=i;speak('Now pick where it goes.');keys();A.redraw()})});else SLOT.forEach((s,j)=>B(`Put it at the ${s.toLowerCase()}`,()=>putPiece(S.sel,j)))}
 if(m==='stamina'){if(S.stuck){B('📖 Read back and look at my plan',()=>unstick(0));B('🧽 Rub it all out',()=>unstick(1));B('🛑 Stop for today',()=>unstick(2))}else if(S.lines<6)B('✏️ Write the next line',write)}}
function down(p){const m=mode();
 if(m==='sort'){const i=JOBS.findIndex((z,k)=>S.at[k]<0&&hit(p,jobBox(k)));if(i>=0){S.drag={i,x:p.x,y:p.y};return true}if(S.sel>=0){const j=[0,1,2].find(k=>hit(p,formBox(k)));if(j!=null)place(S.sel,j)}return false}
 if(m==='instr'&&p.y>A.H*.52){const left=SHUF.filter(i=>!S.did.includes(i)),r=left.findIndex((i,k)=>hit(p,rowBox(k,4,A.H*.52)));if(r>=0)instr(left[r]);return false}
 if(m==='recount'&&p.y>A.H*.54&&S.rc.length<4){const j=[0,1,2].find(k=>hit(p,rowBox(k,3,A.H*.54)));if(j!=null)pickRc(j);return false}
 if(m==='letter'){const i=PIECE.findIndex((t,k)=>S.lt[k]<0&&hit(p,pieceBox(k)));if(i>=0){S.drag={i,x:p.x,y:p.y};return true}if(S.sel>=0){const j=[0,1,2].find(k=>hit(p,slotBox(k)));if(j!=null)putPiece(S.sel,j)}return false}
 if(m==='stamina'&&p.y>A.H*.24&&!S.stuck)write();return false}
function move(p){if(S.drag){S.drag.x=p.x;S.drag.y=p.y;A.redraw()}}
function up(p){const d=S.drag;S.drag=null;if(!d)return;const m=mode();
 if(m==='sort'){const j=[0,1,2].find(k=>hit(p,formBox(k)));if(j!=null)place(d.i,j);else{S.sel=d.i;speak('Now pick the kind of writing.')}}
 if(m==='letter'){const j=[0,1,2].find(k=>hit(p,slotBox(k)));if(j!=null)putPiece(d.i,j);else{S.sel=d.i;speak('Now pick where it goes.')}}keys();A.redraw()}
const ok=(n,f,msg)=>()=>{if(A.step===n&&f()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const reset=(n,f,msg,t)=>{ver++;fresh();S.want=ok(n,f,msg);speak(t);keys()};
function later(list,gap){const k=ver;list.forEach((f,j)=>setTimeout(()=>{if(k===ver)f()},A.reduced()?j*20+10:j*gap+200))}
const steps=[
{h:'Which kind of writing?',p:'Each writing job needs its own kind of writing. Drag each job to a box, or tap the job and then the box.',
 predict:{q:'You want to tell a friend how to plant a seed. What do you write?',opts:['A recount','Instructions','A letter'],ans:1},task:'Match all 4 jobs',
 show:()=>{steps[0].go();later([0,1,2,3].map(i=>()=>place(i,JOBS[i].f)),350)},go:()=>reset(0,()=>S.at.every(v=>v>=0),'How to = instructions. What happened = recount. Talking to one person = letter.','Four writing jobs.')},
{h:'Instructions go in order',p:'Instructions are numbered steps. Each step starts with a bossy verb that tells you what to do. Tap the steps in order and watch the pot.',
 predict:{q:'Does the order of the steps matter?',opts:['No, any order works','Yes, each step needs the one before'],ans:1},task:'Put the 4 steps in order',
 show:()=>{steps[1].go();later([0,1,2,3].map(i=>()=>instr(i)),450)},go:()=>reset(1,()=>S.did.length>=4,'In order, the seed grows. Each step starts with a bossy verb.','An empty pot.')},
{h:'Write a recount',p:'A recount tells what already happened, in time order. Pick each sentence. Use time words like First, Next, After that and Finally.',
 predict:{q:'Which words fit a recount of our trip?',opts:['We will see the lions','We saw the lions','We see the lions'],ans:1},task:'Write all 4 sentences',
 show:()=>{steps[2].go();later([0,1,2,3].map(k=>()=>pickRc(RC[k].findIndex(o=>o[1]==='ok'))),450)},go:()=>reset(2,()=>S.rc.length>=4,'Past tense (got, saw, ate, went) and time words make a clear recount.','Our zoo trip, page 1.')},
{h:'Lay out a letter',p:'A letter starts with Dear and a name. The message is in the middle. It ends with Love from and your name. Drag each part to its place.',task:'Build Sam\'s letter',
 show:()=>{steps[3].go();later([0,1,2].map(i=>()=>putPiece(i,i)),400)},go:()=>reset(3,()=>S.lt.every((v,i)=>v===i),'Dear at the top, message in the middle, Love from at the end.','Sam is writing to Gran.')},
{h:'Keep going',p:'Writers get stuck. Fill the page. Tap to write each line. When you get stuck, choose what to do.',
 predict:{q:'You get stuck halfway. What helps you keep going?',opts:['Rub it all out and start again','Read back your last line and look at your plan','Stop. It is too hard.'],ans:1},task:'Fill the page: 6 lines',
 show:()=>{steps[4].go();later([write,write,()=>unstick(0),write,write,()=>unstick(0),write,write],300)},go:()=>reset(4,()=>S.lines>=6,'Reading back and checking your plan got you to the end of the page.','A plan and an empty page.')},
{h:'Challenge',p:'',go:()=>{ver++;quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['You want to tell how to make a sandwich. What do you write?',[['Instructions with numbered steps','ok'],['A recount of your lunch','form'],['A story about a dragon','form']]],
 ['Which line fits a recount of a trip?',[['We went to the beach.','ok'],['We will go to the beach.','tense'],['Go to the beach.','form']]],
 ['Which time word starts a recount?',[['First','ok'],['Finally','order'],['Dear','form']]],
 ['Where does "Love from Mia" go in a letter?',[['At the end','ok'],['At the top','letter'],['In the middle','letter']]],
 ['You are stuck in the middle of your writing. What helps?',[['Read back and look at my plan','ok'],['Rub it all out','quit'],['Stop and never finish','quit']]],
 ['Which bossy verb could start a step in instructions?',[['Mix','ok'],['Mixed','tense'],['Yummy','form']]]];
function why(t){let m='Pick the kind of writing that does the job.';
 if(t==='tense')m='A recount tells what already happened, so use went, saw, ate. Instructions use bossy verbs like Mix.';
 if(t==='order')m='Time words show order: First, Next, After that, Finally. Finally comes last.';
 if(t==='form')m='Match the job: how to = instructions, what happened = recount, talking to one person = letter.';
 if(t==='letter')m='Dear and a name go at the top. Love from and your name go at the end.';
 if(t==='quit')m='Rubbing out or stopping loses your work. Read back your last line, look at your plan, then write the next bit.';return m}
function quiz(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;qb.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qb.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>mark(t)});speak('Challenge: '+q);A.redraw()}
function mark(t){qb.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qb.querySelector('.fl-fb'),y=t==='ok';if(y){run++;A.win()}else{run=0;A.sound.miss()}
 fb.innerHTML=(y?`✓ Yes! Right writing for the job. ${run} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.66,tall:1.2,draw,onStep:A=>{qb.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
 init:A=>{const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);qb=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up});keys()}});
A.start()})})();
