/* Flagship – plot structure and character development (11–14). One original story, "Maya and the crew": a proud rower who
   relies on no one is forced, by a storm and her missing brother, to ask the town crew for help. Deal event cards onto the
   story mountain one at a time; shape the tension line so the climax is the peak; plot Maya's character arc from the
   evidence in each event; link each turning event to the event that caused it; then swap the winter storm for a calm summer
   day and mark which events collapse, showing how setting drives plot and character. */
(()=>{const EV=['Maya rows alone in a cold harbour town. “I don’t need a crew,” she says.','A storm warning: her brother’s fishing boat has not come back.',
  'Rowing out alone, Maya is beaten back by the waves again and again.','Soaked and shaking, she bangs on the crew’s door and asks for help.',
  'Six oars together, they push through the waves and tow the boat home.','In spring Maya joins the crew and calls the stroke for the others.'];
 const ST=['Exposition','Inciting incident','Rising action','Climax','Falling action','Resolution'];
 const SD=['sets up who, where and how things are','the event that starts the problem','the problem grows and tension builds','the turning point, where tension peaks','the results of the climax play out','the new normal at the end'];
 const LV=['Alone','Turning','Trusts others'],ARC=[0,0,0,1,2,2],
  QT=['“I don’t need a crew.”','She goes out alone, telling no one.','She refuses to turn back or call for help.','She swallows her pride and asks.','She matches her stroke to theirs.','She leads the crew she once refused.'];
 const LINK=[[2,1,'Why does Maya row out into the storm?'],[3,2,'Why does Maya finally ask for help?'],[5,4,'Why does Maya join the crew in spring?']];
 const STORM=[1,2,3,4],DECK=[3,0,5,1,4,2];
VIS.reg('flagplot',c=>{let A,ctl,quiz,live;
 const S={slot:[],dk:0,tn:[5,5,5,5,5,5],cur:0,arc:[0,0,0,0,0,0],ln:0,found:[],calm:0,cut:[],hold:null,at:null,note:'',fn:()=>{},tok:0};
 const kind=()=>['mtn','tense','arc','cause','set','quiz'][A.step];
 function lines(x,s,X,Y,w,lh,max){const o=[];let r='';for(const t of s.split(' ')){const q=r?r+' '+t:t;if(r&&x.measureText(q).width>w){o.push(r);r=t}else r=q}o.push(r);o.slice(0,max||9).forEach((l,i)=>x.fillText(l,X,Y+i*lh));return Math.min(o.length,max||9)}
 function rows(top,bot){const n=6,g=6,h=(bot-top-g*5)/n;return[...Array(n)].map((_,i)=>({i,x:8,y:top+i*(h+g),w:A.W-16,h}))}
 const hit=(p,R)=>R&&p.x>=R.x&&p.x<=R.x+R.w&&p.y>=R.y&&p.y<=R.y+R.h;
 function card(){return{x:12,y:A.H-86,w:A.W-24,h:78}}
 function gx(i){return 40+i*(A.W-64)/5}function gy(v,G){return G.y+G.h-v/10*G.h}
 function graph(){return{y:52,h:A.H*(A.narrow?.5:.46)}}
 function draw(A){const{ctx:x,W,H,col:C}=A,k=kind();x.fillStyle=A.mix(C.pn,C.cy,.05);x.fillRect(0,0,W,H);x.textBaseline='alphabetic';x.textAlign='left';x.fillStyle=C.tx;x.font=`800 ${A.narrow?15:17}px system-ui`;
  if(k==='mtn'){x.fillText('Story mountain',10,22);const R=rows(34,H-100);
   R.forEach((r,i)=>{const b=[8,14,22,34,18,10][i];x.fillStyle=A.alpha(C.am,i===3?.9:.5);A.paint.rrect(W-8-b,r.y+r.h/2-7,b,14,4);x.fill()});
   R.forEach(r=>{const e=S.slot[r.i];x.fillStyle=e!=null?A.mix(C.pn,C.gr,.14):C.pn;A.paint.rrect(r.x,r.y,r.w-40,r.h,10);x.fill();x.strokeStyle=e!=null?C.gr:A.alpha(C.tx,.35);x.lineWidth=1.5;x.stroke();
    x.fillStyle=r.i===3?C.am:C.vi;x.font=`800 ${A.narrow?12:13}px system-ui`;x.fillText(ST[r.i],r.x+8,r.y+15);x.fillStyle=e!=null?C.tx:C.mu;x.font=`600 ${A.narrow?12:13}px system-ui`;
    lines(x,e!=null?EV[e]:'tap here to place the card',r.x+8,r.y+31,r.w-60,14,Math.max(1,Math.floor((r.h-20)/14)))});
   const K=card(),e=DECK[S.dk];if(e!=null){const P=S.hold&&S.at?{...K,x:S.at.x-K.w/2,y:S.at.y-20}:K;x.fillStyle=A.mix(C.pn,C.am,.2);A.paint.rrect(P.x,P.y,P.w,P.h,12);x.fill();x.strokeStyle=C.am;x.lineWidth=2;x.stroke();
    x.fillStyle=C.tx;x.font=`700 ${A.narrow?14:15}px system-ui`;lines(x,'🂠 '+EV[e],P.x+10,P.y+22,P.w-20,18,3)}else{x.fillStyle=C.gr;x.fillText('All six events are on the mountain.',12,H-40)}}
  if(k==='tense'){const G=graph();x.fillText('Tension, event by event',10,22);x.fillStyle=C.mu;x.font='600 12px system-ui';x.save();x.translate(14,G.y+G.h/2);x.rotate(-Math.PI/2);x.textAlign='center';x.fillText('tension',0,0);x.restore();
   x.strokeStyle=A.alpha(C.tx,.4);x.lineWidth=1;x.strokeRect(28,G.y,W-44,G.h);x.strokeStyle=C.am;x.lineWidth=3;x.beginPath();S.tn.forEach((v,i)=>i?x.lineTo(gx(i),gy(v,G)):x.moveTo(gx(i),gy(v,G)));x.stroke();
   S.tn.forEach((v,i)=>{A.paint.ball(gx(i),gy(v,G),i===S.cur?11:8,i===S.cur?C.vi:C.am);x.fillStyle=C.tx;x.textAlign='center';x.font='700 12px system-ui';x.fillText(i+1,gx(i),G.y+G.h+16)});
   x.textAlign='left';x.font=`700 ${A.narrow?13:14}px system-ui`;x.fillStyle=C.vi;x.fillText(`Event ${S.cur+1}: ${ST[S.cur]}`,10,G.y+G.h+42);x.fillStyle=C.tx;x.font=`600 ${A.narrow?13:14}px system-ui`;
   const n=lines(x,EV[S.cur],10,G.y+G.h+62,W-20,17,3);x.fillStyle=C.mu;lines(x,S.note,10,G.y+G.h+70+n*17,W-20,17,4)}
  if(k==='arc'){const G=graph();x.fillText('Maya’s character arc',10,22);LV.forEach((l,j)=>{const y=G.y+G.h-(j+.5)*G.h/3;x.fillStyle=A.alpha(C.tx,.06+.04*j);x.fillRect(28,G.y+G.h-(j+1)*G.h/3,W-44,G.h/3);
    x.fillStyle=C.mu;x.font='600 11px system-ui';x.fillText(l,32,y-G.h/6+14)});x.strokeStyle=C.cy;x.lineWidth=3;x.beginPath();S.arc.forEach((v,i)=>{const y=G.y+G.h-(v+.5)*G.h/3;i?x.lineTo(gx(i),y):x.moveTo(gx(i),y)});x.stroke();
   S.arc.forEach((v,i)=>{A.paint.ball(gx(i),G.y+G.h-(v+.5)*G.h/3,i===S.cur?11:8,i===S.cur?C.vi:C.cy);x.fillStyle=C.tx;x.textAlign='center';x.font='700 12px system-ui';x.fillText(i+1,gx(i),G.y+G.h+16)});x.textAlign='left';
   x.fillStyle=C.vi;x.font=`700 ${A.narrow?13:14}px system-ui`;x.fillText(`Event ${S.cur+1} evidence:`,10,G.y+G.h+42);x.fillStyle=C.tx;x.font=`italic 600 ${A.narrow?14:15}px system-ui`;lines(x,QT[S.cur],10,G.y+G.h+62,W-20,18,2);
   x.fillStyle=C.mu;x.font=`600 ${A.narrow?13:14}px system-ui`;lines(x,S.note,10,G.y+G.h+104,W-20,17,4)}
  if(k==='cause'){const L=LINK[Math.min(S.ln,2)];x.fillText(S.ln>2?'Every link found':L[2],10,22);const R=rows(34,H-60);
   R.forEach(r=>{const eff=S.ln<3&&r.i===L[0];x.fillStyle=eff?A.mix(C.pn,C.am,.22):C.pn;A.paint.rrect(r.x+30,r.y,r.w-30,r.h,10);x.fill();x.strokeStyle=eff?C.am:A.alpha(C.tx,.3);x.lineWidth=eff?2.5:1.2;x.stroke();
    x.fillStyle=C.tx;x.font=`600 ${A.narrow?12:13}px system-ui`;lines(x,(r.i+1)+'. '+EV[r.i],r.x+40,r.y+17,r.w-50,14,Math.max(1,Math.floor((r.h-6)/14)))});
   x.strokeStyle=C.gr;x.lineWidth=3;S.found.forEach(([e,f])=>{const a=R[f],b=R[e];x.beginPath();x.moveTo(a.x+28,a.y+a.h/2);x.quadraticCurveTo(a.x-4,(a.y+b.y+b.h)/2,b.x+28,b.y+b.h/2);x.stroke();A.paint.ball(b.x+28,b.y+b.h/2,4,C.gr)});
   x.fillStyle=C.mu;x.font=`600 ${A.narrow?13:14}px system-ui`;lines(x,S.note,10,H-38,W-20,16,2)}
  if(k==='set'){const R=rows(64,H-60);x.fillStyle=S.calm?A.alpha(C.am,.18):A.alpha(C.cy,.14);x.fillRect(0,30,W,H-30);x.fillStyle=C.tx;x.fillText(S.calm?'☀️ Setting: a calm summer lake':'🌊 Setting: a winter storm at sea',10,22);
   x.font=`600 ${A.narrow?12:13}px system-ui`;x.fillStyle=C.mu;x.fillText(S.calm?'Tap each event that could not happen now.':'Swap the setting to see what it holds up.',10,50);
   R.forEach(r=>{const cut=S.cut.includes(r.i);x.fillStyle=cut?A.mix(C.pn,C.rd,.2):C.pn;A.paint.rrect(r.x,r.y,r.w,r.h,10);x.fill();x.strokeStyle=cut?C.rd:A.alpha(C.tx,.3);x.lineWidth=1.3;x.stroke();
    x.fillStyle=cut?C.mu:C.tx;x.font=`600 ${A.narrow?12:13}px system-ui`;lines(x,(cut?'✗ ':'')+EV[r.i],r.x+10,r.y+17,r.w-20,14,Math.max(1,Math.floor((r.h-6)/14)))});x.fillStyle=C.tx;x.font=`600 ${A.narrow?13:14}px system-ui`;lines(x,S.note,10,H-38,W-20,16,2)}
  if(k==='quiz'&&S.q){x.fillStyle=A.mix(C.pn,C.vi,.12);A.paint.rrect(10,10,W-20,H-20,14);x.fill();x.fillStyle=C.tx;x.font=`700 ${A.narrow?14:16}px system-ui`;S.qh=lines(x,S.q.s,24,36,W-48,20,5);x.fillStyle=C.vi;x.font=`800 ${A.narrow?13:14}px system-ui`;x.fillText('Story mountain',24,40+20*S.qh);
   ST.forEach((s,i)=>{const y=66+20*S.qh+i*40;x.fillStyle=S.q.done&&S.q.key===s?C.gr:C.tx;x.font=`700 ${A.narrow?13:14}px system-ui`;x.fillText(`${i+1}. ${s}`,24,y);x.fillStyle=C.mu;x.font=`600 12px system-ui`;x.fillText(SD[i],24,y+14)});
   }
  A.fx.draw(x)}
 function say(m){S.note=m||'';const k=kind();let t=m||'';if(k==='mtn')t+=' Placed: '+ST.map((s,i)=>s+' '+(S.slot[i]!=null?'filled':'empty')).join(', ')+'.';
  if(k==='tense')t+=' Tension: '+S.tn.join(', ')+'.';if(k==='arc')t+=' Arc: '+S.arc.map(v=>LV[v]).join(', ')+'.';
  if(k==='set')t+=` Setting ${S.calm?'calm summer':'winter storm'}. Crossed out: ${S.cut.map(i=>i+1).join(', ')||'none'}.`;
  A.cv.setAttribute('aria-label',t.trim()||'Plot lab');c.say(t);if(live)live.textContent=m||'';pads();A.redraw();S.fn()}
 function drop(r){const e=DECK[S.dk];if(e==null)return;if(S.slot[r]!=null)return say(ST[r]+' is already filled.');
  if(e===r){S.slot[r]=e;S.dk++;A.sound.pop();say(`Yes: ${ST[r]} is ${SD[r]}.`)}
  else{A.sound.miss();say(`Not ${ST[r]}: that is ${SD[r]}. This card is ${SD[e]}.`)}}
 function rule(){const t=S.tn;if(!(t[0]<t[1]&&t[1]<t[2]&&t[2]<t[3]))return'Tension should climb from the exposition through the inciting incident and rising action.';
  if(t[4]>=t[3]||t[5]>=t[3])return'The climax must be the highest point: nothing after it is more tense.';if(t[5]>=t[4])return'Let it settle: the resolution is calmer than the falling action.';return''}
 function nudge(d){S.tn[S.cur]=Math.max(0,Math.min(10,S.tn[S.cur]+d));const r=rule();d>0?A.sound.pop():A.sound.tick&&A.sound.tick();say(r||'That shape works: rising action, a peak at the climax, then falling action.')}
 function setArc(i,v){S.cur=i;S.arc[i]=v;const ok=v===ARC[i];ok?A.sound.pop():A.sound.miss();
  say(ok?`Fits: ${QT[i]} shows “${LV[v]}”.`:v>ARC[i]?`Too soon. ${QT[i]} She has not changed that far yet.`:`Look again: ${QT[i]} shows more change than “${LV[v]}”.`)}
 function cause(i){if(S.ln>2)return;const[e,f]=LINK[S.ln];if(i===f){S.found.push([e,f]);S.ln++;A.sound.pop();say(`Yes: event ${f+1} causes event ${e+1}. One event pushes the next.`)}
  else{A.sound.miss();say(i===e?'That is the effect itself. Look for the event that pushes Maya into it.':i>e?`Event ${i+1} comes after, so it cannot cause it.`:`Event ${i+1} happens earlier, but it is not what directly forces this choice.`)}}
 function cut(i){if(!S.calm)return say('Swap to the calm summer setting first.');if(S.cut.includes(i))return;
  if(STORM.includes(i)){S.cut.push(i);A.sound.pop();say(`Right: without the storm, event ${i+1} has no reason to happen.`)}else{A.sound.miss();say(i===0?'Maya can still row alone and be proud on a calm lake.':'Without the storm she never needed the crew, so she would not change. But the event itself could still happen.')}}
 function pads(){if(!ctl)return;ctl.innerHTML='';const k=kind(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':l||null},ctl,t).onclick=f};
  if(k==='mtn'&&DECK[S.dk]!=null)ST.forEach((s,i)=>{if(S.slot[i]==null)b('Put on '+s,()=>drop(i),`Put the card “${EV[DECK[S.dk]]}” on ${s}`)});
  if(k==='tense'||k==='arc'){b('◀ Event',()=>{S.cur=(S.cur+5)%6;say(k==='arc'?QT[S.cur]:'')});b('Event ▶',()=>{S.cur=(S.cur+1)%6;say(k==='arc'?QT[S.cur]:'')});
   if(k==='tense'){b('Tension up',()=>nudge(1));b('Tension down',()=>nudge(-1))}else LV.forEach((l,v)=>b(l,()=>setArc(S.cur,v),`Set event ${S.cur+1} to ${l}`))}
  if(k==='cause'&&S.ln<3)EV.forEach((e,i)=>b('Event '+(i+1),()=>cause(i),`Event ${i+1} caused it: ${e}`));
  if(k==='set'){b(S.calm?'Back to the winter storm':'Swap to a calm summer lake',()=>{S.calm^=1;S.cut=[];say(S.calm?'Calm water, warm sun. Which events fall apart?':'The storm is back.')});if(S.calm)EV.forEach((e,i)=>{if(!S.cut.includes(i))b('Cross out '+(i+1),()=>cut(i),`Cross out event ${i+1}: ${e}`)})}}
 const fin=(n,ok,m)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(m+A.reveal(n))};
 const seq=(fs,ms)=>{const t=++S.tok;fs.forEach((f,j)=>setTimeout(()=>{if(t===S.tok)f()},j*ms))};
 const clear=()=>{S.tok++;S.fn=()=>{};S.slot=[];S.dk=0;S.tn=[5,5,5,5,5,5];S.cur=0;S.arc=[0,0,0,0,0,0];S.ln=0;S.found=[];S.calm=0;S.cut=[];S.note=''};
 const steps=[
  {h:'Build the story mountain',p:'A plot has a shape. Drag each event card onto its stage of the mountain, or tap a stage. Cards come one at a time, out of order.',
   predict:{q:'Where does the climax come?',opts:['At the very end of the story','At the peak of tension, before things settle','Right at the start'],ans:1},
   task:'Place all six events',show:()=>seq(DECK.map(e=>()=>drop(e)),600),go:()=>{clear();S.fn=fin(0,()=>S.dk>=6,'The climax is the turning point near the end. The resolution comes after it.')}},
  {h:'Shape the tension',p:'Pick an event with the arrows or by tapping its dot, then raise or lower its tension. Drag a dot up or down to set it.',
   predict:{q:'Which event is the turning point?',opts:['The storm warning','Maya asking the crew for help','Maya joining the crew in spring'],ans:1},
   task:'Make the climax the peak',show:()=>{S.tn=[2,4,6,7,4,2];S.cur=3;nudge(2)},go:()=>{clear();S.note='All flat at 5. A story with no rise and fall has no pull.';S.fn=fin(1,()=>!rule(),'Tension climbs to the turning point, then falls away. That is why the climax sits near the end, not at it.')}},
  {h:'Character arc',p:'How Maya changes is her character arc. For each event, read the evidence and set where she is. Tap a band on the graph, or use the buttons.',
   task:'Match Maya’s arc to the evidence',show:()=>seq(ARC.map((v,i)=>()=>setArc(i,v)),500),go:()=>{clear();S.note='Tap a band on the graph, or use the buttons.';S.fn=fin(2,()=>S.arc.every((v,i)=>v===ARC[i]),'Maya changes at the climax. Her new trust shows in actions, not a speech about it.')}},
  {h:'Cause and effect',p:'A plot is a chain, not a list. For each question, tap the event that caused it.',
   predict:{q:'What does a key incident usually do in a story?',opts:['Decorates the scene','Forces a character to decide or act'],ans:1},
   task:'Find all three causes',show:()=>seq(LINK.map(l=>()=>cause(l[1])),700),go:()=>{clear();S.fn=fin(3,()=>S.ln>2,'Each event forces the next. The failure alone in event 3 is what makes Maya’s change believable.')}},
  {h:'Setting drives the plot',p:'The setting is where and when. Swap the winter storm for a calm summer lake. Then cross out every event that could no longer happen.',
   predict:{q:'If the storm became a calm summer day, what happens?',opts:['Nothing much changes','The problem disappears, so Maya has no reason to change'],ans:1},
   task:'Cross out the four events that need the storm',show:()=>{S.calm=1;seq(STORM.map(i=>()=>cut(i)),500)},go:()=>{clear();S.fn=fin(4,()=>S.cut.length===4,'Take the storm away and the problem, the climax and Maya’s change all collapse. The setting is part of the plot.')}},
  {h:'Challenge',p:'',go:()=>{S.tok++;S.fn=()=>{};next()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>S.fn()});
 const QB=[['A girl lives with her strict aunt in a grey city. Which stage is this?','Exposition',['Climax','Rising action']],
  ['A letter arrives saying the family farm will be sold. The story’s problem starts here.','Inciting incident',['Exposition','Climax']],
  ['Ravi faces the bully in front of the whole school and refuses to back down. Tension is at its highest.','Climax',['Resolution','Rising action']],
  ['After the trial, the town slowly rebuilds and people start speaking again.','Falling action',['Resolution','Inciting incident']],
  ['A year later, Jo runs the shop she once hated, and is happy.','Resolution',['Climax','Falling action']],
  ['Each failed escape plan makes the guards more watchful.','Rising action',['Climax','Exposition']],
  ['A character is cruel at the start and cruel at the end. What does the story lack?','Character arc',['Setting','Exposition']],
  ['A story is set in a city during a power cut. The dark streets let the thief escape. What drives this event?','Setting',['Resolution','Character arc']]];
 let qn=-1,streak=0;
 function next(){qn++;const[s,key,wr]=QB[qn%QB.length],r=qn%3,o=[key,...wr],op=o.slice(r).concat(o.slice(0,r));S.q={s,key,done:0};
  quiz.innerHTML=`<p><b>${s}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;const row=quiz.querySelector('.fl-pick');
  op.forEach(w=>{c.el('button',{type:'button',class:'lbtn sm'},row,w).onclick=()=>mark(w)});A.cv.setAttribute('aria-label','Challenge: '+s);c.say('Challenge: '+s);A.redraw()}
 function mark(w){quiz.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const{key}=S.q,ok=w===key,fb=quiz.querySelector('.fl-fb');const i=ST.indexOf(key),j=ST.indexOf(w);let m;
  if(ok)m=i>=0?`Right: the ${key.toLowerCase()} is ${SD[i]}.`:key==='Setting'?'Right: the dark is the setting, and here it makes the escape possible.':'Right: with no change, there is no character arc.';
  else if([w,key].sort().join()==='Climax,Resolution')m='The climax is the turning point at peak tension. The resolution is the calm new normal after it.';
  else if([w,key].sort().join()==='Climax,Rising action')m='Rising action builds tension step by step. The climax is the one moment it peaks and turns.';
  else if(key==='Setting')m='Ask what makes the event possible. Here the dark streets do, so the setting drives it.';
  else if(key==='Character arc')m='The character never changes, so there is no arc. The setting and set-up can be fine.';
  else m=`${w} is ${j>=0?SD[j]:'not the stage'}. This is the ${key.toLowerCase()}: ${SD[i]}.`;
  S.q.done=1;A.redraw();if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=next}
 function down(p){const k=kind();if(k==='quiz')return false;
  if(k==='mtn'){if(hit(p,card())&&DECK[S.dk]!=null){S.hold=1;S.at=p;A.redraw();return true}const r=rows(34,A.H-100).find(r=>hit(p,r));if(r)drop(r.i);return false}
  if(k==='tense'||k==='arc'){const G=graph();let b=0,d=1e9;for(let i=0;i<6;i++){const q=Math.abs(p.x-gx(i));if(q<d){d=q;b=i}}if(p.y>G.y+G.h+24)return false;S.cur=b;S.hold=1;S.at=p;move(p);return true}
  const r=rows(k==='set'?64:34,A.H-60).find(r=>hit(p,r));if(r)k==='cause'?cause(r.i):cut(r.i);return false}
 function move(p){if(!S.hold)return;S.at=p;const k=kind(),G=graph();if(k==='tense'){const v=Math.round(Math.max(0,Math.min(10,(G.y+G.h-p.y)/G.h*10)));if(v!==S.tn[S.cur]){S.tn[S.cur]=v;say(rule()||'That shape works: rising action, a peak at the climax, then falling action.')}}
  else if(k==='arc'){const v=Math.max(0,Math.min(2,Math.floor((G.y+G.h-p.y)/G.h*3)));if(v!==S.arc[S.cur])setArc(S.cur,v)}else A.redraw()}
 function up(){const k=kind();if(k==='mtn'&&S.hold&&S.at){const r=rows(34,A.H-100).find(r=>hit(S.at,r));S.hold=null;if(r)drop(r.i);else A.redraw();return}S.hold=null}
 A=FK.shell(c,{steps,ratio:.66,tall:1.5,draw,onStep:A=>{const q=A.step===5;quiz.hidden=!q;live.hidden=q;ctl.hidden=q;pads();A.cv.setAttribute('aria-label',steps[A.step].p||'Challenge')},
  init:A=>{const E=c.el,box=E('div',{class:'fl-below'},A.below);live=E('p',{class:'fl-read','aria-hidden':'true'},box);
   ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Plot lab controls'},box);quiz=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});pads()}});
 A.start()})})();
