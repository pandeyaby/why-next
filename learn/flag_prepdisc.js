/* Flagship – preparing for and explaining in discussions (ages 8–11; CCSS SL.4.1, SL.5.1; KS2 Spoken language).
   One class question, one fact sheet. Pack notes (a fact, a question, a view with a reason), back each point with
   evidence, reply to classmates by pointing to the text (the fact you cite lights up on the sheet), sort open and
   closed questions, then build a sentence that explains how your thinking changed. Drag, or tap a card then a box;
   every move has a button too. Data in learn/prepdisc_art.js. */
(()=>{const {TOPIC,SHEET,KINDS,PACK,BACK,CITE,ASK,CHANGE,QS}=PREPD;
VIS.reg('flagprepdisc',c=>{let A,tray,chal,qi=-1,gen=0;const S={};
const INK='#1e293b',OK='#047857',BAD='#b91c1c',EDGE='#64748b',HOLD='#2563eb',FONT='system-ui,sans-serif',NOTE='#fef3c7',GLOW='#fde68a';
const KEYS=['pack','back','cite','ask','change','chal'],key=()=>KEYS[A.step];
const ROUNDS={pack:[PACK],back:[BACK],cite:CITE,ask:[ASK],change:[CHANGE]};
const fs=n=>Math.round(n*(A.narrow?1:1.12));
function wrap(g,t,max){const out=[];let cur='';for(const w of t.split(' ')){const s=cur?cur+' '+w:w;if(cur&&g.measureText(s).width>max){out.push(cur);cur=w}else cur=s}out.push(cur);return out}
function box(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.fill||'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();
 g.lineWidth=o.edge?3.5:1.5;g.strokeStyle=o.edge==='ok'?OK:o.edge==='bad'?BAD:o.edge==='hold'?HOLD:EDGE;if(o.dash)g.setLineDash([5,4]);g.stroke();g.setLineDash([]);
 if(!t)return;let n=fs(o.n||13)+1,L;do{n--;g.font=`${o.wt||700} ${n}px ${FONT}`;L=wrap(g,t,r.w-14)}while(L.length*(n+4)>r.h-8&&n>9);
 g.fillStyle=o.ink||INK;g.textAlign=o.left?'left':'center';g.textBaseline='middle';const lh=n+4,y0=(o.top?r.y+8+n/2:r.y+r.h/2-(L.length-1)*lh/2);
 L.forEach((s,i)=>g.fillText(s,o.left?r.x+8:r.x+r.w/2,y0+i*lh))}
function sky(){const g=A.ctx;g.fillStyle=A.col.dark?'#1e293b':'#f8fafc';g.fillRect(0,0,A.W,A.H)}
function title(t,y,o){box({x:8,y,w:A.W-16,h:fs(30)},t,Object.assign({fill:'#e0f2fe',n:13,wt:800},o||{}))}
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const R=()=>{const k=key(),s=S[k];return ROUNDS[k][Math.min(s.r,ROUNDS[k].length-1)]};
/* layout: optional fact sheet, then the boxes (a row, or a stack of sentence parts), then the loose cards */
function lay(){const k=key(),r=R(),W=A.W,H=A.H,top=fs(30)+16;let y=top;const out={};
 if(k==='cite'||k==='back'){const h=A.narrow?H*.27:H*.25;out.sheet={x:8,y,w:W-16,h};y+=h+8}
 if(r.stack){const h=Math.min(46,(H*.5)/4-6);out.slots=r.slots.map((_,j)=>({x:8,y:y+j*(h+6),w:W-16,h}));y+=r.slots.length*(h+6)+4}
 else{const n=r.slots.length,g=8,w=(W-16-g*(n-1))/n,h=k==='pack'?H*.3:k==='cite'?H*.16:k==='back'?H*.28:H*.2;out.slots=r.slots.map((_,j)=>({x:8+j*(w+g),y,w,h}));y+=h+10}
 const cols=A.narrow?2:3,n=r.items.length,gx=8,cw=(W-16-gx*(cols-1))/cols,rows=Math.ceil(n/cols),ch=Math.min(64,(H-y-6)/rows-6);
 out.pool=r.items.map((_,i)=>({x:8+(i%cols)*(cw+gx),y:y+Math.floor(i/cols)*(ch+6),w:cw,h:ch}));return out}
function sheet(rect,lit){const g=A.ctx;box(rect,'',{fill:'#fffbeb'});g.font=`800 ${fs(11)}px ${FONT}`;g.fillStyle=INK;g.textAlign='left';g.textBaseline='top';g.fillText('📄 Fact sheet',rect.x+8,rect.y+5);
 const lh=(rect.h-24)/SHEET.length;let n=fs(12)+1;const fit=()=>SHEET.every(t=>{g.font=`600 ${n}px ${FONT}`;return wrap(g,t,rect.w-16).length*(n+2)<=lh});do n--;while(!fit()&&n>8);
 SHEET.forEach((t,i)=>{const y=rect.y+20+i*lh;if(lit.includes(i)){g.fillStyle=GLOW;g.fillRect(rect.x+4,y,rect.w-8,lh-1)}
  g.font=`${lit.includes(i)?800:600} ${n}px ${FONT}`;const L=wrap(g,t,rect.w-16);g.fillStyle=INK;L.forEach((s,j)=>g.fillText(s,rect.x+8,y+1+j*(n+2)))})}
function draw(){sky();const k=key();if(k==='chal'){title('Challenge',A.H*.2);box({x:A.W*.15,y:A.H*.4,w:A.W*.7,h:A.H*.25},'🗣️ Prepare · Point to the text · Explain',{n:15,fill:NOTE});return}
 const s=S[k],r=R(),L=lay(),done=s.r>=ROUNDS[k].length;
 title(done?doneLine(k):(r.ask||TOPIC),8,{edge:done?'ok':null});
 if(L.sheet)sheet(L.sheet,s.lit);
 L.slots.forEach((b,j)=>{const mine=r.items.map((it,i)=>s.at[i]===j?it.t:null).filter(Boolean),cap=r.slots[j].cap||1,full=mine.length>=cap;
  if(r.stack){const g=A.ctx;box(b,'',{fill:full?'#ecfdf5':'#ffffff',edge:full?'ok':s.hot===j?'hold':null,dash:!full});g.font=`800 ${fs(12)}px ${FONT}`;g.fillStyle='#1d4ed8';g.textAlign='left';g.textBaseline='middle';
   const lw=Math.min(b.w*.48,g.measureText(r.slots[j].t).width+14);g.fillText(r.slots[j].t,b.x+8,b.y+b.h/2,lw-10);if(mine[0])box({x:b.x+lw,y:b.y+4,w:b.w-lw-4,h:b.h-8},mine[0],{fill:'#ecfdf5',n:12});return}
  box(b,'',{fill:full?'#ecfdf5':'#ffffff',edge:full?'ok':s.hot===j?'hold':null,dash:!full});const g=A.ctx;let hd=0;
  if(k==='cite'){g.font=`700 ${fs(12)}px ${FONT}`;g.fillStyle=INK;g.textAlign='left';g.textBaseline='top';g.fillText(`${r.who}: “${r.said}”`,b.x+8,b.y+6,b.w-16)}
  else{const n=fs(A.narrow&&r.slots.length>2?11:12);g.font=`800 ${n}px ${FONT}`;g.fillStyle=INK;g.textAlign='center';g.textBaseline='top';const T=wrap(g,r.slots[j].t,b.w-12);T.forEach((z,q)=>g.fillText(z,b.x+b.w/2,b.y+6+q*(n+3)));hd=6+T.length*(n+3)}
  if(k==='pack'){const cw=(b.w-16)/3;KINDS.forEach(([ic,nm],q)=>{const has=r.items.some((it,i)=>s.at[i]===0&&it.kind===q);box({x:b.x+8+q*cw,y:b.y+fs(24),w:cw-6,h:fs(24)},`${has?'✓':ic} ${nm}`,{n:10,fill:has?'#d1fae5':'#f1f5f9',edge:has?'ok':null})})}
  const y0=b.y+(k==='pack'?fs(54):Math.max(fs(24),hd+4)),each=k==='pack'?Math.min(fs(30),(b.y+b.h-y0-4)/cap):(b.y+b.h-y0-2)/cap;mine.forEach((t,m)=>box({x:b.x+6,y:y0+m*each,w:b.w-12,h:each-4},t,{fill:k==='pack'?NOTE:'#ecfdf5',n:11}))});
 if(done)return;r.items.forEach((it,i)=>{if(s.at[i]!=null||(S.drag&&S.drag.i===i))return;box(L.pool[i],it.t,{edge:s.bad===i?'bad':s.pick===i?'hold':null,fill:k==='pack'?NOTE:'#ffffff',n:12})});
 if(S.drag){const d=S.drag,p=L.pool[d.i];box({x:d.x-p.w/2,y:d.y-p.h/2,w:p.w,h:p.h},r.items[d.i].t,{edge:'hold',fill:NOTE,n:12})}A.fx.draw(A.ctx)}
function doneLine(k){return{pack:'Packed: a fact, a question and a view with a reason',back:'Every point has evidence from the text',cite:'3 replies, each pointing to the text',ask:'Open questions get people talking',change:'Your thinking changed, and you said why'}[k]}
/* the one rule for every scene: a card goes in its own box; a wrong card stays out and says why */
function drop(i,j){const k=key(),s=S[k],r=R(),it=r.items[i];if(s.r>=ROUNDS[k].length||s.at[i]!=null||s.wait)return;s.pick=null;S.hot=null;
 if(it.to!==j){s.bad=i;A.sound.miss();return tell(it.to<0?it.why:it.why||(it.about?`${it.t.split(':')[0]} is about ${it.about}. It backs up “${r.slots[it.to].t}”.`:r.stack?`“${it.t}” fits after “${r.slots[it.to].t}”.`:`“${it.t}” belongs in “${r.slots[it.to].t}”.`))}
 s.at[i]=j;s.bad=null;if(it.cite!=null)s.lit=k==='back'?s.lit.concat(it.cite):[it.cite];A.sound.pop();const left=r.items.some((x,q)=>x.to>=0&&s.at[q]==null);
 let msg=k==='cite'?`You: “${it.t}” ${r.who} can check fact ${it.cite+1} on the sheet.`:k==='back'?`${r.slots[j].t}: backed by ${it.t.split(':')[0].toLowerCase()}.`:k==='pack'?`Packed: ${it.t}.`:k==='change'?sentence():`${it.t} → ${r.slots[j].t}.`;
 if(!left){if(s.r+1<ROUNDS[k].length){s.wait=1;const v=gen;setTimeout(()=>{if(v!==gen)return;s.r++;s.at={};s.lit=[];s.wait=0;tell(`Next: ${R().who} says “${R().said}”`)},900)}
  else{s.r++;if(k!=='change')msg+=' '+doneLine(k)+'.'}}tell(msg)}
function sentence(){const r=CHANGE,s=S.change,part=j=>{const i=r.items.findIndex((_,q)=>s.at[q]===j);return i<0?'…':r.items[i].t};
 return`At first I thought ${part(0)}, but then Ana pointed out ${part(1)}. Now I think ${part(2)}, because ${part(3)}.`}
function down(p){const k=key();if(k==='chal')return false;const s=S[k];if(s.r>=ROUNDS[k].length||s.wait)return false;const L=lay(),r=R();
 const i=L.pool.findIndex((b,q)=>inside(p,b)&&s.at[q]==null);if(i>=0){S.drag={i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}
 const j=L.slots.findIndex(b=>inside(p,b));if(j>=0&&s.pick!=null)drop(s.pick,j);return false}
function move(p){if(!S.drag)return;S.drag.x=p.x;S.drag.y=p.y;const s=S[key()];s.hot=lay().slots.findIndex(b=>inside(p,b));A.redraw()}
function up(p){const d=S.drag;if(!d)return;S.drag=null;const k=key(),s=S[k];s.hot=-1;const j=lay().slots.findIndex(b=>inside(p,b));
 if(j>=0)return drop(d.i,j);if(Math.hypot(p.x-d.x0,p.y-d.y0)<10){s.pick=d.i;s.bad=null;return tell(`Picked “${R().items[d.i].t}”. Now tap a box.`)}A.redraw()}
function fresh(){gen++;for(const k in S)delete S[k];KEYS.slice(0,5).forEach(k=>S[k]={r:0,at:{},lit:[],pick:null,bad:null,hot:-1});S.drag=null;S.hook=()=>{}}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.hook()}
function buttons(){if(!tray)return;tray.innerHTML='';const k=key();if(k==='chal')return;const s=S[k];if(s.r>=ROUNDS[k].length||s.wait)return;const r=R();
 const B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},tray,t).onclick=f};
 if(s.pick==null)r.items.forEach((it,i)=>{if(s.at[i]==null)B(`Pick: ${it.t}`,()=>{s.pick=i;s.bad=null;tell(`Picked “${it.t}”. Now choose a box.`)})});
 else{r.slots.forEach((b,j)=>B(`→ ${b.t}`,()=>drop(s.pick,j),`Put “${r.items[s.pick].t}” in ${b.t}`));B('Cancel',()=>{s.pick=null;tell('Nothing picked.')})}}
const done=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function open(i,desc,msg){fresh();tell(desc);const k=KEYS[i];S.hook=done(i,()=>S[k].r>=ROUNDS[k].length,msg)}
function auto(i){steps[i].go();const v=gen,k=KEYS[i],plan=[];ROUNDS[k].forEach(r=>r.items.forEach((it,q)=>{if(it.to>=0)plan.push([q,it.to])}));
 plan.forEach(([q,j],n)=>setTimeout(()=>{if(v===gen)drop(q,j)},(k==='cite'?1100:550)*(n+1)))}
const steps=[
{h:'Pack your notes',p:`Our class will discuss: ${TOPIC} Read the fact sheet first. Then pack 3 notes you can use: a fact, a question and your view with a reason.`,
 predict:{q:'What is the best way to get ready for a discussion?',opts:['Copy out the whole text','Note a fact, a question and your view'],ans:1},task:'Pack a fact, a question and a view',show:()=>auto(0),
 go:()=>open(0,'Six cards to choose from. Your notes bag holds 3: a fact, a question and your view with a reason.','Short notes you can use beat a copy of everything.')},
{h:'Back up each point',p:'A point is stronger with evidence. Drag each fact from the sheet under the point it backs up.',task:'Give all 3 points evidence',show:()=>auto(1),
 predict:{q:'Which backs up a point best?',opts:['Everyone says so','A fact from the text'],ans:1},
 go:()=>open(1,'Three points: the garden helps our lunches, it needs helpers in summer, lots of pupils enjoy it. Four cards, one is not evidence.','Each point now has a fact behind it, and it lights up on the sheet.')},
{h:'Point to the text',p:'In the discussion, classmates say things. Reply with your preparation: say which fact, from where. Watch it light up on the sheet.',task:'Reply to Mia, Leo and Ana',show:()=>auto(2),
 go:()=>open(2,'Mia says: the garden is a waste of time. Three possible replies.','Naming the fact lets everyone check it. That is how preparation helps in the talk.')},
{h:'Ask open questions',p:'Some questions get people talking. Others stop at yes or no. Sort the questions you prepared.',task:'Sort all 4 questions',show:()=>auto(3),
 go:()=>open(3,'Two boxes: open questions and closed questions. Four questions.','Open questions start with how or why and need more than yes or no.')},
{h:'Explain how you changed',p:'After the talk, explain your thinking. Say what you thought, what someone pointed out, what you think now, and why.',
 predict:{q:'Is it OK to change your mind in a discussion?',opts:['No, stick to your first view','Yes, if you explain what changed it'],ans:1},task:'Build the whole sentence',show:()=>auto(4),
 go:()=>open(4,'Four sentence starts. Four parts to drag in.','Changing your mind because of evidence is good thinking, as long as you say why.')},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.hook()});
function why(t){let m='Think about what helps everyone in the discussion.';
 if(t==='copy')m='Copying everything is not preparing. Pick a few key points you can use.';
 if(t==='none')m='Without notes you have nothing to point to. Prepare a fact, a question and your view.';
 if(t==='noreason')m='That gives no reason or evidence. Point to a fact in the text.';
 if(t==='vague')m='Too vague. Say which text and which fact so others can check it.';
 if(t==='closed')m='That is a closed question: yes or no ends the talk. Ask how or why.';
 if(t==='stuck')m='Changing your mind is fine. Say what you thought, what changed it and what you think now.';
 return m}
function ask(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],k=qi%3,ord=all.slice(k).concat(all.slice(0,k));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.66,tall:1.32,draw,onStep:X=>{chal.hidden=X.step!==5;tray.hidden=X.step===5;buttons()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);tray=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Discussion buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});buttons()}}).start()})})();
