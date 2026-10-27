/* Writing process words (5–8): put plan, draft, revise, edit in order; plan a story first, next, last; revise by adding
   detail (the dog picture changes); edit by tapping three mistakes; match a writing job to instructions, recount or story. */
(()=>{const M=Math,F=(w,z)=>w+' '+z+'px system-ui';
 const STEP=[['💭','Plan','think of ideas'],['✏️','Draft','write it down'],['✨','Revise','make it better'],['🔍','Edit','fix mistakes']];
 const STORY=[['🪁','The kite flies away.'],['🌳','It gets stuck in a tree.'],['🤝','A friend gets it down.']];
 const SLOT={0:['1','2','3','4'],1:['First','Next','Last']};
 const ADD=[['big','Big! Now we can see the dog.'],['fluffy','Fluffy! A detail word paints a picture.'],['in the park','Now we know where. That is detail too.'],['fix a full stop','That is editing, not revising. Revise means make the words and ideas better.']];
 const ED=[['i','I','I is always a capital letter.'],['like'],['my'],['red'],['kyte','kite','Kite is spelt k-i-t-e.'],['_','.','A sentence ends with a full stop.']];
 const KIND=[['📋','Instructions','tell how, step by step'],['📅','Recount','what really happened'],['🐉','Story','made up, to enjoy']];
 const JOB=[['🌱','Tell how to plant a seed.',0],['🦒','Tell Gran what you did at the zoo.',1],['🐲','Make up a tale about a dragon.',2]];
 const QS=[['Mia thinks of ideas and draws a plan.','Plan',['Edit','Draft']],['Ben writes his story down fast. It is messy, and that is OK.','Draft',['Plan','Edit']],
  ['Zoe adds the word "shiny" to make it better.','Revise',['Edit','Plan']],['Sam fixes a capital letter.','Edit',['Revise','Draft']],
  ['Tess reads it again to check the spelling.','Edit',['Plan','Revise']],['Who will read my writing?','Audience',['Purpose','Draft']],
  ['Why am I writing this?','Purpose',['Audience','Edit']],['First, get bread. Next, add jam.','Instructions',['Story','Recount']],
  ['On Saturday I went to the beach with Dad.','Recount',['Instructions','Story']],['Once upon a time, a dragon lost its hat.','Story',['Recount','Instructions']]];
 const DEF={Plan:'Plan is thinking of ideas first.',Draft:'A draft is the first go at writing it down.',Revise:'Revise means make the words and ideas better.',Edit:'Edit means fix mistakes like capitals, full stops and spelling.',
  Audience:'The audience is who will read it.',Purpose:'The purpose is why you write it.',Instructions:'Instructions tell how to do something.',Recount:'A recount tells what really happened.',Story:'A story is made up.'};
VIS.reg('flagwproc',c=>{let A,pad,chal,read;c.fig.classList.add('young');
 const G={ord:[],add:{},fix:{},ji:0,jok:0,gen:0,check:()=>{},Q:null,shake:-1};
 const mode=()=>['order','plan','rev','edit','kind','quiz'][A.step];
 const ft=(x,w,z,a)=>{x.font=F(w,z);x.textAlign=a||'center';x.textBaseline='middle'};
 const box=(x,r,f,s,rr)=>{x.fillStyle=f;A.paint.rrect(r.x,r.y,r.w,r.h,rr||14);x.fill();if(s){x.strokeStyle=s;x.lineWidth=3;x.stroke()}};
 const inR=(p,r)=>r&&p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
 const items=()=>A.step===0?STEP:STORY,MIX={0:[2,0,3,1],1:[1,2,0]};
 const row=(n,i,y,h)=>{const w=(A.W-24-(n-1)*8)/n;return{x:12+i*(w+8),y,w,h}};
 const slotR=i=>{const n=items().length,N=A.narrow;return A.step===0&&N?row(2,i%2,A.H*.06+M.floor(i/2)*(A.H*.2),A.H*.18):row(n,i,A.H*.1,A.H*.3)};
 const tileR=j=>{const n=items().length,N=A.narrow;return A.step===0&&N?row(2,j%2,A.H*.52+M.floor(j/2)*(A.H*.22),A.H*.2):row(n,j,A.H*.56,A.H*.3)};
 function card(x,C,it,r,col){box(x,r,A.alpha(col,.2),col);ft(x,400,M.min(r.h*.36,36));x.fillStyle=C.tx;x.fillText(it[0],r.x+r.w/2,r.y+r.h*.32);
  ft(x,800,[18,13,0,0,15][A.step]);const t=it[1],w=r.w-10;let L=[t];if(x.measureText(t).width>w&&t.includes(' ')){const s=t.split(' '),h=M.ceil(s.length/2);L=[s.slice(0,h).join(' '),s.slice(h).join(' ')]}
  L.forEach((l,k)=>x.fillText(l,r.x+r.w/2,r.y+r.h*(L.length>1?.62+k*.18:.7)));if(it[2]&&r.h>60){ft(x,600,12);x.fillStyle=C.mu;if(x.measureText(it[2]).width<r.w-8)x.fillText(it[2],r.x+r.w/2,r.y+r.h*.9)}}
 function orderView(x,C){const I=items();I.forEach((_,i)=>{const r=slotR(i),k=G.ord[i];if(k!=null)card(x,C,I[k],r,C.gr);else{x.setLineDash([6,6]);box(x,r,A.alpha(C.tx,.04),A.alpha(C.tx,.35));x.setLineDash([]);ft(x,800,20);x.fillStyle=C.mu;x.fillText(SLOT[A.step][i],r.x+r.w/2,r.y+r.h/2)}});
  MIX[A.step].forEach((k,j)=>{if(G.ord.includes(k))return;const r=tileR(j),s=G.shake===k?M.sin(Date.now()/40)*4:0;card(x,C,I[k],{...r,x:r.x+s},C.cy)})}
 function place(k){const I=items();if(G.ord.includes(k)||G.ord.length>=I.length)return;
  if(k===G.ord.length){G.ord.push(k);A.sound.pop();tell(A.step===0?`${I[k][1]}: ${I[k][2]}.`:`${SLOT[1][k]}: ${I[k][1]}`)}
  else{G.shake=k;A.sound.miss();setTimeout(()=>{G.shake=-1;A.redraw()},400);tell(A.step===0?`Not yet. ${I[k][1]} comes after ${I[k-1][1]}.`:`Not yet. What happens before that?`)}}
 const sent=()=>'I saw a '+(G.add.big?'big ':'')+(G.add.fluffy?'fluffy ':'')+'dog'+(G.add['in the park']?' in the park':'')+'.';
 const addR=i=>{const N=A.narrow;return N?row(2,i%2,A.H*.62+M.floor(i/2)*(A.H*.18),A.H*.15):row(4,i,A.H*.72,A.H*.18)};
 function revView(x,C){const N=A.narrow,cx=A.W/2,cy=A.H*.3,s=G.add.big?1.5:1;
  if(G.add['in the park']){x.fillStyle=A.alpha(C.gr,.3);x.fillRect(0,cy+26*s,A.W,A.H*.12);ft(x,400,44);x.fillText('🌳',A.W*.15,cy);x.fillText('🌳',A.W*.85,cy)}
  ft(x,400,40*s);x.fillText(G.add.fluffy?'🐩':'🐕',cx,cy);ft(x,800,N?18:22);x.fillStyle=C.tx;x.fillText(sent(),cx,A.H*.54);
  ADD.forEach(([t],i)=>{const r=addR(i),on=G.add[t];box(x,r,on?A.alpha(C.gr,.25):C.pn,on?C.gr:A.alpha(C.cy,.7));ft(x,800,16);x.fillStyle=C.tx;x.fillText((i<3?'+ ':'')+t,r.x+r.w/2,r.y+r.h/2)})}
 const nAdd=()=>['big','fluffy','in the park'].filter(k=>G.add[k]).length;
 function addW(i){const[t,m]=ADD[i];if(i<3){if(G.add[t])return;G.add[t]=1;A.sound.pop()}else A.sound.miss();tell(m)}
 const edR=i=>{const N=A.narrow,n=ED.length,w=(A.W-20)/n;return{x:10+i*w+2,y:A.H*(N?.34:.3),w:w-4,h:A.H*.28}};
 function editView(x,C){ft(x,700,15);x.fillStyle=C.mu;x.fillText('Tap each mistake to fix it.',A.W/2,A.H*.14);
  ED.forEach((e,i)=>{const r=edR(i),f=G.fix[i];box(x,r,f?A.alpha(C.gr,.25):C.pn,f?C.gr:A.alpha(C.tx,.3));ft(x,800,A.narrow?20:26);x.fillStyle=C.tx;x.fillText(f?e[1]:e[0]==='_'?'▢':e[0],r.x+r.w/2,r.y+r.h/2)});
  ft(x,700,15);x.fillStyle=C.mu;x.fillText(`Fixed: ${nFix()} of 3`,A.W/2,A.H*.8)}
 const nFix=()=>Object.keys(G.fix).length;
 function fixW(i){const e=ED[i];if(G.fix[i])return;if(e.length<3){A.sound.tick();return tell(`"${e[0]}" is fine. Look for a capital, a spelling or a full stop.`)}G.fix[i]=1;A.sound.pop();tell(e[2])}
 const kR=i=>row(3,i,A.H*.56,A.H*.34);
 function kindView(x,C){const j=JOB[M.min(G.ji,2)],done=G.jok>=3;box(x,{x:12,y:A.H*.06,w:A.W-24,h:A.H*.42},A.alpha(C.vi,.15),A.alpha(C.vi,.6));ft(x,400,40);x.fillText(done?'🎉':j[0],A.W/2,A.H*.18);
  ft(x,800,A.narrow?16:19);x.fillStyle=C.tx;x.fillText(done?'All three matched!':j[1],A.W/2,A.H*.32);ft(x,600,13);x.fillStyle=C.mu;x.fillText(done?'':'Purpose: why are you writing? Pick the kind.',A.W/2,A.H*.41);
  KIND.forEach((k,i)=>card(x,C,k,kR(i),C.cy))}
 function pick(i){if(G.jok>=3)return;const j=JOB[G.ji];if(i===j[2]){G.jok++;G.ji++;A.sound.pop();tell('Yes! '+DEF[KIND[i][1]])}else{A.sound.miss();tell(DEF[KIND[i][1]]+' Is that the job here?')}}
 function draw(A){const{ctx:x,col:C}=A,m=mode();x.fillStyle=A.mix(C.pn,C.cy,.04);x.fillRect(0,0,A.W,A.H);
  if(m==='order'||m==='plan')orderView(x,C);else if(m==='rev')revView(x,C);else if(m==='edit')editView(x,C);else if(m==='kind')kindView(x,C);
  else if(G.Q){ft(x,800,A.narrow?24:30);x.fillStyle=C.tx;x.fillText(G.Q.done?G.Q.a:'Which word?',A.W/2,A.H*.4);if(G.Q.done){ft(x,600,15);x.fillStyle=C.mu;x.fillText(DEF[G.Q.a],A.W/2,A.H*.55)}}
  if(G.shake>=0)A.redraw&&requestAnimationFrame(()=>A.redraw());A.fx.draw(x)}
 function status(){const m=mode(),I=A.step<2?items():0;return I?`Placed: ${G.ord.map(k=>I[k][1]).join(', ')||'none'}.`:m==='rev'?'Sentence: '+sent():m==='edit'?`Sentence: ${ED.map((e,i)=>G.fix[i]?e[1]:e[0]).join(' ')}. Fixed ${nFix()} of 3.`:m==='kind'&&G.jok<3?'Job: '+JOB[G.ji][1]:''}
 function tell(t){const s=(t?t+' ':'')+status();c.say(t||s);A.cv.setAttribute('aria-label',s);if(read)read.textContent=t||'';controls();A.redraw();G.check()}
 function controls(){if(!A||!pad)return;pad.innerHTML='';const m=mode(),b=(t,f)=>{c.el('button',{type:'button',class:'lbtn ghost'},pad,t).onclick=f};
  if(m==='order'||m==='plan')MIX[A.step].forEach(k=>{if(!G.ord.includes(k))b(items()[k][0]+' '+items()[k][1],()=>place(k))});
  if(m==='rev')ADD.forEach(([t],i)=>{if(!G.add[t])b((i<3?'+ ':'')+t,()=>addW(i))});
  if(m==='edit')ED.forEach((e,i)=>{if(!G.fix[i])b(e[0]==='_'?'End of sentence':e[0],()=>fixW(i))});
  if(m==='kind'&&G.jok<3)KIND.forEach((k,i)=>b(k[0]+' '+k[1],()=>pick(i)))}
 const when=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg()+A.reveal(n))};
 const play=(fs,ms)=>{const g=++G.gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===G.gen)f()},j*ms))};
 const reset=()=>{G.gen++;G.check=()=>{};Object.assign(G,{ord:[],add:{},fix:{},ji:0,jok:0,shake:-1})};
 const steps=[
  {h:'The writing steps',p:'Writers do four steps. Tap the steps in order.',predict:{q:'What do writers do first?',opts:['Edit','Plan','Draft'],ans:1},
   task:'Put the four steps in order',show:()=>play([0,1,2,3].map(k=>()=>place(k)),500),
   go:()=>{reset();G.check=when(0,()=>G.ord.length===4,()=>'Plan, draft, revise, edit. Writing is not done in one go.')}},
  {h:'Plan: first, next, last',p:'A plan puts ideas in order. That order is the sequence. Tap what happens first, next and last.',
   task:'Plan the kite story',show:()=>play([0,1,2].map(k=>()=>place(k)),500),
   go:()=>{reset();G.check=when(1,()=>G.ord.length===3,()=>'First, next, last: a plan with a clear sequence. Now the draft is easy to write.')}},
  {h:'Revise: make it better',p:'The draft says "I saw a dog." Tap words to add detail.',predict:{q:'Adding the word "fluffy" to make it better is…',opts:['Editing','Revising','Planning'],ans:1},
   task:'Add two detail words',show:()=>play([()=>addW(0),()=>addW(1)],600),
   go:()=>{reset();G.check=when(2,()=>nAdd()>=2,()=>'Revising changes the words and ideas to make the writing better. Details paint a picture.')}},
  {h:'Edit: fix mistakes',p:'Edit means fix mistakes. Look for a capital letter, a spelling and a full stop.',predict:{q:'Fixing a capital letter is…',opts:['Revising','Editing','Planning'],ans:1},
   task:'Fix three mistakes',show:()=>play([0,4,5].map(i=>()=>fixW(i)),500),
   go:()=>{reset();G.check=when(3,()=>nFix()>=3,()=>'"I like my red kite." Checking like this is also called proofreading.')}},
  {h:'Why am I writing?',p:'The purpose is why you write. The audience is who reads it. Pick the kind of writing for each job.',
   task:'Match all three jobs',show:()=>play(JOB.map(j=>()=>pick(j[2])),600),
   go:()=>{reset();G.check=when(4,()=>G.jok>=3,()=>'Instructions tell how. A recount tells what really happened. A story, or narrative, is made up.')}},
  {h:'Challenge',p:'',go:()=>{G.gen++;G.check=()=>{};ask()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>G.check()});
 let qi=-1,run=0;
 function ask(){qi++;const[t,a,ds]=QS[qi%QS.length];let opts=[a,...ds];const r=qi%3;opts=opts.slice(r).concat(opts.slice(0,r));G.Q={t,a,done:0};
  chal.innerHTML=`<p><b>${t}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const rw=chal.querySelector('.fl-pick');opts.forEach(o=>{c.el('button',{type:'button',class:'lbtn'},rw,o).onclick=()=>judge(o)});A.redraw();tell('Challenge: '+t)}
 function judge(o){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const a=G.Q.a,fb=chal.querySelector('.fl-fb'),ok=o===a;let m='Right. '+DEF[a];
  if(!ok){if(o==='Revise'&&a==='Edit'||o==='Edit'&&a==='Revise')m='Revise makes it better. Edit fixes mistakes. '+DEF[a];
   else if(o==='Audience'||o==='Purpose')m='Audience is who reads it. Purpose is why you write it.';
   else m=`${DEF[o]} ${DEF[a]}`}
  G.Q.done=1;if(ok){run++;A.win()}else{run=0;A.sound.miss()}A.redraw();
  fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Stars: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask;
  A.cv.setAttribute('aria-label',(ok?'Correct. ':'Not quite. ')+m)}
 function down(p){const m=mode();
  if(m==='order'||m==='plan'){const j=MIX[A.step].findIndex((k,j)=>!G.ord.includes(k)&&inR(p,tileR(j)));if(j>=0)place(MIX[A.step][j])}
  else if(m==='rev'){const i=ADD.findIndex((_,i)=>inR(p,addR(i)));if(i>=0)addW(i)}
  else if(m==='edit'){const i=ED.findIndex((_,i)=>inR(p,edR(i)));if(i>=0)fixW(i)}
  else if(m==='kind'){const i=KIND.findIndex((_,i)=>inR(p,kR(i)));if(i>=0)pick(i)}return false}
 A=FK.shell(c,{steps,ratio:.62,tall:.95,draw,onStep:A=>{const q=A.step===5;chal.hidden=!q;read.hidden=q;pad.hidden=q;if(!q)tell('')},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},bx);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);A.gest({down});controls()}});
 A.start()})})();
