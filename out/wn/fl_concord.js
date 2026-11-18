/* Flagship: agreement in sentences (ages 8–10; CCSS L.3.1f, subject–verb and pronoun–antecedent agreement).
   Tap the head noun so the phrase after it can be crossed out, drag the verb that agrees into the gap, use the rules
   for each, everyone, neither … nor and there is/are, drag the pronoun that matches its antecedent (and see the link
   drawn back to it, across sentences too), then fix a note with three agreement errors. Buttons do every action too. */
(()=>{
const {P,HEAD,DRAG,RULE,PRON,NOTE,QS}=CONCORDART;
const WRONG_AT=NOTE.map((w,i)=>w[1]?i:-1).filter(i=>i>=0);
const bare=w=>w.replace(/[.,]/g,'').toLowerCase();
VIS.reg('flagconcord',c=>{let A,X,pads,ask,seq=0,qn=-1;
const S={hook:()=>{}};
const mode=()=>['head','drag','rule','pron','note','chal'][A.step];
const u=n=>Math.round(n*Math.min(1.2,Math.max(1,A.W/380)));
const font=(n,w)=>{X.font=`${w||700} ${u(n)}px system-ui,sans-serif`};
function txt(s,x,y,n,col,w,al){font(n,w);X.fillStyle=col;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y)}
function box(x,y,w,h,f,e,lw){A.paint.rrect(x,y,w,h,u(9));X.fillStyle=f;X.fill();if(e){X.strokeStyle=e;X.lineWidth=lw||2;X.stroke()}}
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function lines(s,max,n){font(n);const L=[];let cur='';String(s).split(' ').forEach(w=>{const t=cur?cur+' '+w:w;if(cur&&X.measureText(t).width>max){L.push(cur);cur=w}else cur=t});L.push(cur);return L}
/* lay words out as tiles, wrapping and centring each line */
function flow(words,y0,n){font(n,800);const g=u(7),lh=u(n*2.2),out=[];let x=0,y=y0,row=[];const max=A.W-u(36);
 const close=()=>{const used=row.length?row[row.length-1].x+row[row.length-1].w:0,dx=u(18)+(max-used)/2;row.forEach(r=>r.x+=dx);row=[]};
 words.forEach((w,i)=>{const tw=Math.max(u(34),X.measureText(w).width+u(14));if(row.length&&x+tw>max){close();x=0;y+=lh}const r={x,y,w:tw,h:u(n*1.75),i,t:w};row.push(r);out.push(r);x+=tw+g});close();return out}
function tile(r,label,n,f,e,col){box(r.x,r.y,r.w,r.h,f,e,2);txt(label,r.x+r.w/2,r.y+r.h/2,n,col||P.ink,800)}
function topline(s,ok){const L=lines(s,A.W-u(40),14),lh=u(19),h=L.length*lh+u(14);box(u(10),u(10),A.W-u(20),h,ok?P.okBg:'#fef9c3',ok?P.okc:P.rim,2);
 L.forEach((t,i)=>txt(t,A.W/2,u(10)+u(7)+lh*(i+.5),14,ok?P.okc:P.ink,700));return u(10)+h}
function msgline(){if(!S.msg)return;const L=lines((S.bad?'✗ ':'✓ ')+S.msg,A.W-u(44),13),lh=u(18),h=L.length*lh+u(12),y=A.H-h-u(10);
 box(u(12),y,A.W-u(24),h,S.bad?P.badBg:'#ffffff',S.bad?P.bad:P.okc,2.5);L.forEach((t,i)=>txt(t,A.W/2,y+u(6)+lh*(i+.5),13,S.bad?P.bad:P.ink,700))}
const miss=m=>{S.bad=true;S.msg=m;A.sound.miss();sync()};
const good=m=>{S.bad=false;S.msg=m;A.sound.pop()};
/* after a right answer the solved sentence stays up for a moment, then the next one comes */
function advance(total,last){S.lock=true;sync();const id=seq;setTimeout(()=>{if(id!==seq)return;S.lock=false;S.solved=false;S.n++;if(S.n>=total){S.won=true;S.msg=last}sync()},A.reduced()?30:450)}
/* step 0: the head noun */
function tapHead(i){if(S.won||S.lock)return;const h=HEAD[S.n];if(h[0][i]==='___')return;if(i!==h[1]){const w=bare(h[0][i]);
 return miss(i>=h[2][0]&&i<=h[2][1]?h[4]:`“${w}” is not the subject's main noun. Which noun comes first, before the gap?`)}
 S.solved=true;good(`${h[0][1]} is the head noun, so the verb is “${h[3]}”.`);advance(HEAD.length,'Cross out the phrase, then match the verb to the head noun.')}
/* step 1: drag a verb */
function putVerb(k){if(S.won||S.lock)return;const d=DRAG[S.n];if(k)return miss(d[4]);S.solved=true;good(`${d[0]} ${d[2]} ${d[1]}`);advance(DRAG.length,'Every verb agrees with its real subject.')}
/* step 2: each / every / neither … nor */
function pickRule(k){if(S.won||S.lock)return;const r=RULE[S.n];if(k)return miss(r[3]);S.solved=true;good(r[3]);advance(RULE.length,'Each and every: singular. Neither … nor: the nearer subject. And: plural.')}
/* step 3: pronoun and antecedent */
function putPron(k){if(S.won||S.lock)return;const p=PRON[S.n];if(k)return miss(p[5]);S.solved=true;good(p[5]);advance(PRON.length,'Each pronoun points back to its antecedent and matches it.')}
/* step 4: fix the note */
function tapNote(i){if(S.won)return;const w=NOTE[i];if(!w[1])return miss(w[2]||`“${bare(w[0])}” is fine. Look at each verb and pronoun: does it match its subject or antecedent?`);
 if(S.fixed.includes(i))return;S.fixed.push(i);good(`${bare(w[0])} → ${w[1][0]}. ${w[2]}`);if(S.fixed.length===WRONG_AT.length){S.won=true;S.msg='Three agreement errors fixed.'}sync()}
function drawHead(t){const h=HEAD[Math.min(S.n,HEAD.length-1)],sol=S.solved||S.won,ws=h[0].map(w=>w==='___'&&sol?h[3]:w);
 S.hits=flow(ws,t+u(30),17);S.hits.forEach(r=>{const inPhrase=sol&&r.i>=h[2][0]&&r.i<=h[2][1],isHead=sol&&r.i===h[1],isGap=h[0][r.i]==='___';
  tile(r,r.t,17,isGap?(sol?P.okBg:P.gapBg):isHead?P.headBg:P.tile,isGap?(sol?P.okc:P.gap):isHead?P.head:'#cbd5e1',inPhrase?P.strike:isGap&&!sol?P.gap:P.ink);
  if(inPhrase){X.strokeStyle=P.strike;X.lineWidth=2.5;X.beginPath();X.moveTo(r.x+u(4),r.y+r.h/2);X.lineTo(r.x+r.w-u(4),r.y+r.h/2);X.stroke()}});
 const yb=S.hits[S.hits.length-1].y+u(62);txt('Tap the main noun of the subject',A.W/2,yb,13,P.dim,700);txt(`Sentence ${Math.min(S.n+1,HEAD.length)} of ${HEAD.length}`,A.W/2,yb+u(22),12,P.dim,700)}
function gapSentence(before,after,fill,y,n){const ws=before.split(' ').concat(['___'],after.split(' ').filter(Boolean));const R=flow(ws,y,n);let g=null;
 R.forEach(r=>{const isGap=r.t==='___';if(isGap)g=r;tile(r,isGap&&fill?fill:r.t,n,isGap?(fill?P.okBg:P.gapBg):P.tile,isGap?(fill?P.okc:P.gap):'#cbd5e1',isGap?(fill?P.okc:P.gap):P.ink)});return{R,g}}
function verbTiles(two,y){const w=u(110),h=u(54),gp=u(28),x0=(A.W-2*w-gp)/2;return two.map((t,k)=>{const d=S.drag&&S.drag.k===k,r={x:x0+k*(w+gp),y,w,h,k};
 const rx=d?S.drag.x-w/2:r.x,ry=d?S.drag.y-h/2:y;box(rx,ry,w,h,P.tile,P.tileEdge,d?4:2.5);txt(t,rx+w/2,ry+h/2,22,P.head,900);return r})}
function drawDrag(t){const d=DRAG[Math.min(S.n,DRAG.length-1)],sol=S.solved||S.won;const {R,g}=gapSentence(d[0],d[1],sol?d[2]:null,t+u(30),17);S.slot=g;
 const yb=R[R.length-1].y+u(58);const two=S.n%2?[d[3],d[2]]:[d[2],d[3]];S.order=two.map(v=>v===d[2]?0:1);S.hits=sol?[]:verbTiles(two,yb);
 txt('Drag a verb into the gap, or tap it',A.W/2,yb+u(74),12,P.dim,700)}
function drawRule(t){const r=RULE[Math.min(S.n,RULE.length-1)],sol=S.solved||S.won,parts=r[0].split('___');const {R}=gapSentence(parts[0].trim(),parts[1].trim(),sol?r[1][0]:null,t+u(30),17);
 let y=R[R.length-1].y+u(56);if(sol){font(13,800);const w=X.measureText(r[2]).width+u(26);box((A.W-w)/2,y,w,u(30),P.linkBg,P.link,2);txt(r[2],A.W/2,y+u(15),13,P.link,800);S.hits=[];return}
 const two=S.n%2?[r[1][1],r[1][0]]:r[1];S.order=two.map(v=>v===r[1][0]?0:1);S.hits=verbTiles(two,y)}
function drawPron(t){const p=PRON[Math.min(S.n,PRON.length-1)],sol=S.solved||S.won;const {R,g}=gapSentence(p[0],p[1],sol?p[3]:null,t+u(58),17);S.slot=g;
 const ante=p[2].split(' '),hits=R.filter(r=>ante.includes(bare(r.t))||ante.includes(r.t.replace(/[.,]/g,'')));
 if(sol&&g&&hits.length){const a=hits[hits.length-1],x1=a.x+a.w/2,x2=g.x+g.w/2,top=Math.min(a.y,g.y)-u(16);hits.forEach(r=>{X.strokeStyle=P.link;X.lineWidth=3;A.paint.rrect(r.x-2,r.y-2,r.w+4,r.h+4,u(10));X.stroke()});
  X.strokeStyle=P.link;X.lineWidth=3;X.beginPath();X.moveTo(x2,g.y);X.quadraticCurveTo((x1+x2)/2,top-u(14),x1,a.y);X.stroke();txt('antecedent',(x1+x2)/2,top-u(18),11,P.link,800)}
 const yb=R[R.length-1].y+u(62);const two=S.n%2?[p[4],p[3]]:[p[3],p[4]];S.order=two.map(v=>v===p[3]?0:1);S.hits=sol?[]:verbTiles(two,yb);
 if(!sol)txt('Drag the pronoun into the gap, or tap it',A.W/2,yb+u(74),12,P.dim,700)}
function drawNote(t,b){box(u(14),t+u(8),A.W-u(28),b-t-u(14),'#fefce8',P.rim,2.5);const ws=NOTE.map((w,i)=>S.fixed.includes(i)?w[1][0]+(/[.,]$/.test(w[0])?w[0].slice(-1):''):w[0]);
 S.hits=flow(ws,t+u(22),15);S.hits.forEach(r=>{const ok=S.fixed.includes(r.i);tile(r,r.t,15,ok?P.okBg:'#fffef5',ok?P.okc:'#e5e7eb',ok?P.okc:P.ink)});
 txt(`Errors fixed: ${S.fixed.length} of ${WRONG_AT.length}`,A.W/2,Math.min(b-u(14),S.hits[S.hits.length-1].y+u(52)),12,P.dim,700)}
function draw(){X.fillStyle=A.col.dark?'#111827':P.paper;X.fillRect(0,0,A.W,A.H);X.fillStyle=P.paper;A.paint.rrect(5,5,A.W-10,A.H-10,16);X.fill();
 const m=mode(),T={head:['Which word is the subject? Tap its main noun.','Head nouns found.'],drag:['Which verb agrees? Drag it into the gap.','Verbs agree.'],rule:['Each, every, neither … nor. Pick the verb.','Rules used.'],
  pron:['Which pronoun matches? Drag it into the gap.','Pronouns match.'],note:['Tap the 3 words that do not agree.','Note fixed.'],chal:['Agreement challenge','']};
 const t=topline(T[m][S.won?1:0]||T[m][0],S.won),b=A.H-(S.msg?u(74):u(12));
 if(m==='head')drawHead(t);if(m==='drag')drawDrag(t);if(m==='rule')drawRule(t);if(m==='pron')drawPron(t);if(m==='note')drawNote(t,b);
 if(m==='chal')lines('the box of crayons is · one of my friends has · each has · neither the cat nor the dogs are · the girls packed their bags',A.W-u(40),15).forEach((s,i)=>txt(s,A.W/2,t+u(32)+i*u(24),15,P.dim,700));msgline();A.fx.draw(X)}
function down(p){const m=mode();if(S.won||S.lock)return false;const r=(S.hits||[]).find(q=>hit(p,q));if(!r)return false;
 if(m==='drag'||m==='pron'){S.drag={x:p.x,y:p.y,k:r.k,x0:p.x,y0:p.y};A.redraw();return true}
 if(m==='head')tapHead(r.i);if(m==='rule')pickRule(S.order[r.k]);if(m==='note')tapNote(r.i);return true}
function move(p){if(S.drag){S.drag.x=p.x;S.drag.y=p.y;A.redraw()}}
function up(p){const d=S.drag;if(!d)return;S.drag=null;const tap=Math.hypot(p.x-d.x0,p.y-d.y0)<8,inSlot=hit(p,S.slot&&{x:S.slot.x-u(16),y:S.slot.y-u(16),w:S.slot.w+u(32),h:S.slot.h+u(32)});
 if(!tap&&!inSlot)return A.redraw();const k=S.order[d.k];if(mode()==='drag')putVerb(k);else putPron(k)}
function sync(){const m=mode();let d='Challenge.';
 if(m==='head')d=S.won?'All six head nouns found.':`Sentence: ${HEAD[S.n][0].join(' ').replace('___','blank').replace(/\.$/,'')}. Which word is the subject's main noun?`;
 if(m==='drag')d=S.won?'All seven verbs agree.':`${DRAG[S.n][0]} blank ${DRAG[S.n][1]} Choose ${DRAG[S.n][2]} or ${DRAG[S.n][3]}.`;
 if(m==='rule')d=S.won?'All six rule sentences done.':`${RULE[S.n][0].replace('___','blank')} Choose ${RULE[S.n][1].join(' or ')}.`;
 if(m==='pron')d=S.won?'All six pronouns match.':`${PRON[S.n][0]} blank ${PRON[S.n][1]} Choose ${PRON[S.n][3]} or ${PRON[S.n][4]}.`;
 if(m==='note')d=`Note: ${NOTE.map((w,i)=>S.fixed.includes(i)?w[1][0]:w[0]).join(' ')} Fixed ${S.fixed.length} of ${WRONG_AT.length}.`;
 const say=(S.msg?S.msg+' ':'')+d;c.say(say);A.cv.setAttribute('aria-label',say);buttons();S.hook()}
function buttons(){if(!pads)return;pads.innerHTML='';const m=mode(),add=(t,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},pads,t).onclick=()=>{fn();sync()}};if(S.won||S.lock)return A.redraw();
 if(m==='head')HEAD[S.n][0].forEach((w,i)=>{if(w!=='___')add(bare(w),()=>tapHead(i))});
 if(m==='drag'){const d=DRAG[S.n];add(d[2],()=>putVerb(0));add(d[3],()=>putVerb(1))}
 if(m==='rule'){const r=RULE[S.n];add(r[1][0],()=>pickRule(0));add(r[1][1],()=>pickRule(1))}
 if(m==='pron'){const p=PRON[S.n];add(p[3],()=>putPron(0));add(p[4],()=>putPron(1))}
 if(m==='note')NOTE.forEach((w,i)=>{if(!S.fixed.includes(i)&&(w[1]||w[2]))add('Check “'+bare(w[0])+'”',()=>tapNote(i))});A.redraw()}
const whenDone=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const id=seq;fns.forEach((f,j)=>setTimeout(()=>{if(id===seq){f();sync()}},(j+1)*(A.reduced()?80:ms)))};
function reset(){seq++;Object.assign(S,{hook:()=>{},won:false,lock:false,solved:false,msg:'',bad:false,n:0,drag:null,fixed:[],hits:[],slot:null,order:[0,1]})}
const steps=[
{h:'Find the head noun',p:'The subject is who or what the sentence is about. Its main word is the head noun. A phrase after it, like “of crayons”, only adds detail. Cross that phrase out and the verb matches the head noun.',
predict:{q:'The box of crayons ___ on the shelf. Which verb fits?',opts:['are','is'],ans:1},
task:'Find 6 head nouns',show:()=>{steps[0].go();play(HEAD.map(h=>()=>tapHead(h[1])),640)},go:()=>{reset();sync();S.hook=whenDone(0,()=>S.won,'The head noun picked the verb.')}},
{h:'Drag the verb that agrees',p:'One subject: is, was, has, or a verb with s. More than one: are, were, have, no s. Watch for “one of”, phrases like “as well as”, and “there is/are”, where the subject comes after the verb.',
predict:{q:'One of my friends ___ a dog. Which verb fits?',opts:['have','has'],ans:1},
task:'Fill 7 gaps',show:()=>{steps[1].go();play(DRAG.map(()=>()=>putVerb(0)),640)},go:()=>{reset();sync();S.hook=whenDone(1,()=>S.won,'Real subject first, then the verb.')}},
{h:'Each, every, neither … nor',p:'Each, every and everyone mean every single one, so they are singular. With neither … nor or either … or, the verb matches the nearer subject. Two subjects joined by and are plural.',
predict:{q:'Neither the cat nor the dogs ___ hungry.',opts:['is','are'],ans:1},
task:'Pick 6 verbs',show:()=>{steps[2].go();play(RULE.map(()=>()=>pickRule(0)),640)},go:()=>{reset();sync();S.hook=whenDone(2,()=>S.won,'Rules used.')}},
{h:'Pronoun meets antecedent',p:'A pronoun stands for a noun said earlier, its antecedent. It must match: one thing is it or its, more than one is they, them or their. The antecedent can be in the sentence before.',
predict:{q:'The box of pens fell. ___ lid came off.',opts:['Their','Its'],ans:1},
task:'Match 6 pronouns',show:()=>{steps[3].go();play(PRON.map(()=>()=>putPron(0)),640)},go:()=>{reset();sync();S.hook=whenDone(3,()=>S.won,'Each pronoun points back to its antecedent.')}},
{h:'Fix the note',p:'This note has three words that do not agree: two verbs and one pronoun. Check each subject and each antecedent, then tap the wrong word.',
task:'Fix the 3 errors',show:()=>{steps[4].go();play(WRONG_AT.map(i=>()=>tapNote(i)),600)},go:()=>{reset();sync();S.hook=whenDone(4,()=>S.won,'Note fixed.')}},
{h:'Challenge',p:'',go:()=>{reset();ask0()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.hook()});
function ask0(){qn++;const [q,ok,bad]=QS[qn%QS.length],all=[[ok,'ok']].concat(bad),r=qn%(all.length),ord=all.slice(r).concat(all.slice(0,r));
 ask.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=ask.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>judge(tag,ok)});const s='Challenge: '+q.replace('___','blank');c.say(s);A.cv.setAttribute('aria-label',s);A.redraw()}
let streak=0;
function judge(tag,ok){ask.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=ask.querySelector('.fl-fb'),right=tag==='ok';let m='Find the real subject or the antecedent first, then make the verb or pronoun match it.';
 if(tag==='near')m='That verb matches the noun just before the gap. Cross out the phrase and match the head noun: one basket, one window, so is.';
 if(tag==='there')m='After “there”, look ahead for the subject. Three birds is more than one, so are.';
 if(tag==='nor')m='With neither … nor, match the nearer subject. My parents is nearer the verb, so are.';
 if(tag==='each')m='Each means every single one, so it is singular: each of the girls has.';
 if(tag==='ante')m='Find the antecedent in the sentence before: the dogs, more than one, so them.';
 if(tag==='pnear')m='The handle belongs to the cupboard, one thing, so its. Toys is only inside “of toys”.';
 if(tag==='and')m='Two people joined by and make a plural subject: Tom and his dad go.';
 if(right){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${right?'✓ Yes: '+ok+'. In a row: '+streak+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask0}
FK.shell(c,{steps,ratio:.66,tall:1.25,draw,onStep:B=>{ask.hidden=B.step!==5;pads.hidden=B.step===5;buttons()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pads=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Agreement lab buttons'},w);ask=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
