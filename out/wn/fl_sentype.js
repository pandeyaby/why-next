/* Flagship – types of sentences (ages 11-14; KS3 grammar): tap the main clauses (and learn why phrases and
   subordinate clauses are not), sort sentences into simple, compound, complex and compound-complex by counting
   clauses rather than words, join two simple sentences with coordinating or subordinating conjunctions (and meet the
   comma splice), move a subordinate clause and its comma without changing the type, and vary a paragraph's sentence
   types for rhythm and a hard-hitting ending. Data and canvas helpers: sentype_art.js. */
(()=>{const D=SNT;
VIS.reg('flagsentype',c=>{let A,K,pad,quiz,qa=-1,tok=0;const Z={};
const STAGES=['find','sort','join','move','vary','quiz'],stage=()=>STAGES[A.step];
const within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
function wash(){const g=A.ctx;g.fillStyle=A.col.dark?'#111827':'#f8fafc';g.fillRect(0,0,A.W,A.H)}
function speak(t,bad){Z.msg=t;Z.bad=!!bad;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();panel();Z.test()}
/* ---- 1. find the main clauses ---- */
let FCH=[];
function tapChunk(i){const f=Z.fi,ch=D.FIND[f.s];if(!ch||f.hit.includes(i))return;const k=ch[i];
 if(k.c!=='I'){f.wrong=i;A.sound.miss();return speak(D.WHY[k.c](k.t.replace(/[,.]$/,'')),true)}
 f.hit.push(i);f.wrong=-1;A.sound.pop();const need=ch.filter(x=>x.c==='I').length,got=f.hit.length;
 if(got<need)return speak(`Main clause: "${k.t.replace(/[,.]$/,'')}". It can stand alone. Is there another?`,false);
 f.s++;f.hit=[];speak(`Yes: ${need} main clause${need>1?'s':''}, so this sentence is ${D.TYPES[D.typeOf(ch)].toLowerCase()}.`+(f.s<D.FIND.length?' Next sentence.':''),false)}
function drawFind(){const f=Z.fi,ch=D.FIND[f.s],y0=K.banner(ch?`Sentence ${f.s+1} of ${D.FIND.length}: tap every main clause`:D.DONE[0],ch?(Z.bad?'no':''):'ok',Z.msg,Z.bad);
 if(!ch){FCH=[];return}const list=ch.map((k,i)=>({t:k.t,state:f.hit.includes(i)?'I':f.wrong===i?'no':'x'}));FCH=K.chips(list,14,y0+10,A.W-28,{n:18});
 const g=A.ctx,ly=Math.min(A.H-30,FCH.bottom+22);g.font=`700 ${K.sz(13)}${K.F}`;g.textAlign='left';g.textBaseline='top';g.fillStyle=K.fg();g.fillText('Green = main clause (subject + verb, stands alone)',14,ly)}
/* ---- 2. sort by type ---- */
let BINS=[],CARD=null;
function sortAs(t){const s=Z.so,it=D.SORT[s.i];if(!it)return;s.drag=null;
 if(t!==it.a){s.wrong=t;A.sound.miss();let m=`Not ${D.TYPES[t].toLowerCase()}. Count the clauses: ${it.why}.`;
  if(it.a===0&&it.t.length>50)m=`Long is not the same as complex. ${cap(it.why)}, so it is simple.`;
  if(it.a===0&&/ and /.test(it.t))m=`"And" here joins two subjects and two verbs inside one clause, so it is still simple.`;
  if(it.trap&&t===it.trap[0])m=it.trap[1];
  if(it.a===3&&!(it.trap&&t===it.trap[0]))m=`It has two main clauses (compound) and a subordinate clause (complex) at once: ${it.why}.`;
  return speak(m,true)}
 s.n[it.a]++;s.i++;s.wrong=-1;A.sound.pop();speak(`${D.TYPES[it.a]}: ${it.why}.`,false)}
function drawSort(){const s=Z.so,it=D.SORT[s.i],y0=K.banner(it?`${s.i+1} of ${D.SORT.length}: which type?`:D.DONE[1],it?(Z.bad?'no':''):'ok',Z.msg,Z.bad);
 const cols=A.narrow?2:4,gap=8,bw=(A.W-16-gap*(cols-1))/cols,bh=A.narrow?52:60,rows=4/cols,top=A.H-8-rows*bh-(rows-1)*gap;
 BINS=D.TYPES.map((t,k)=>({t:k,x:8+(k%cols)*(bw+gap),y:top+Math.floor(k/cols)*(bh+gap),w:bw,h:bh}));BINS.forEach(r=>K.box(r,`${D.TYPES[r.t]} (${s.n[r.t]})`,{no:s.wrong===r.t}));
 if(it){const w=Math.min(A.W-40,460),d=s.drag,lines=K.split(it.t,w-24,`700 ${K.sz(17)}${K.F}`),h=lines.length*K.sz(17)*1.3+22;CARD={x:d?d.x-w/2:(A.W-w)/2,y:d?d.y-h/2:Math.min(y0+10,top-h-10),w,h};
  const g=A.ctx;g.fillStyle=d?'#dbeafe':'#ffffff';A.paint.rrect(CARD.x,CARD.y,w,h,12);g.fill();g.lineWidth=2;g.strokeStyle=d?'#1d4ed8':K.RIM;g.stroke();g.fillStyle='#0f172a';g.font=`700 ${K.sz(17)}${K.F}`;g.textAlign='left';g.textBaseline='top';lines.forEach((l,i)=>g.fillText(l,CARD.x+12,CARD.y+11+i*K.sz(17)*1.3))}else CARD=null}
/* ---- 3. join two ideas ---- */
let JB=[];
function joinWith(j){const s=Z.jo,it=D.JOIN[j];s.last=j;
 if(it.ty<0){A.sound.miss();return speak(it.m,true)}if(!it.ok){A.sound.miss();return speak(it.m,true)}
 if(it.ty===1)s.comp=1;if(it.ty===2)s.cx=1;A.sound.pop();speak(it.m+(s.comp&&s.cx?'':s.comp?' Now make a complex one.':' Now make a compound one.'),false)}
function drawJoin(){const s=Z.jo,full=s.comp&&s.cx,y0=K.banner(full?D.DONE[2]:`Make a compound${s.comp?' ✓':''} and a complex${s.cx?' ✓':''} sentence that make sense`,full?'ok':Z.bad?'no':'',Z.msg,Z.bad);
 const it=D.JOIN[s.last],g=A.ctx;let y=y0+6;const src=it?[{t:it.s,state:it.ty<0||!it.ok?'no':it.ty===1?'J':'D'}]:[{t:'The storm hit the coast.',state:'I'},{t:'The town lost power.',state:'I'}];
 const R=K.chips(src,14,y,A.W-28,{n:17});y=R.bottom+8;g.font=`800 ${K.sz(14)}${K.F}`;g.fillStyle=K.fg();g.textAlign='left';g.textBaseline='top';
 g.fillText(it?(it.ty<0?'Error: comma splice':`Type: ${D.TYPES[it.ty]}${it.ok?'':' (but the meaning does not fit)'}`):'Two simple sentences. Pick a joining word.',14,y);y+=K.sz(14)*1.6;
 const cols=A.narrow?4:8,gap=6,w=(A.W-16-gap*(cols-1))/cols,h=46,rows=Math.ceil(D.JOIN.length/cols),gy=Math.max(y,A.H-8-rows*h-(rows-1)*gap);JB=D.JOIN.map((x,k)=>({k,x:8+(k%cols)*(w+gap),y:gy+Math.floor(k/cols)*(h+gap),w,h}));
 JB.forEach(r=>K.box(r,D.JOIN[r.k].w,{sel:s.last===r.k,n:15}))}
/* ---- 4. move the subordinate clause ---- */
let SUBR=null,GAP=null;
const moveText=(m,front,comma)=>front?`${cap(m.sub)}${comma?',':''} ${m.main}.`:`${cap(m.main)}${comma?',':''} ${m.sub}.`;
function relocate(front){const v=Z.mv;if(v.k>=D.MOVE.length)return;v.front=front;v.drag=null;A.sound.tick();
 speak(front?(v.comma?'Clause first, with a comma. Still complex.':'The subordinate clause is first. What goes after it?'):'The subordinate clause is at the end. Still complex: moving it does not change the type.',false)}
function toggleComma(){const v=Z.mv;if(v.k>=D.MOVE.length)return;v.comma=!v.comma;
 if(v.comma&&!v.front){A.sound.miss();return speak('With the subordinate clause at the end, you do not need a comma before it.',true)}
 if(!v.comma){A.sound.tick();return speak(v.front?'Without the comma, the reader runs the two clauses together.':'No comma: right for a clause at the end.',v.front)}
 v.k++;v.front=false;v.comma=false;A.sound.pop();speak(`Clause first, comma after it, still complex. ${v.k} of ${D.MOVE.length}.`,false)}
function drawMove(){const v=Z.mv,m=D.MOVE[v.k],y0=K.banner(m?`Put the subordinate clause first, with its comma (${v.k} of ${D.MOVE.length})`:D.DONE[3],m?(Z.bad?'no':''):'ok',Z.msg,Z.bad);SUBR=GAP=null;if(!m)return;
 const g=A.ctx,mainC={t:(v.front?m.main:cap(m.main))+(v.front?'.':''),state:'I'},subC={t:(v.front?cap(m.sub):m.sub)+(v.front?'':'.'),state:'D'},comma={t:v.comma?',':'+,',state:v.comma?'J':'x'};
 const list=v.front?[subC,comma,mainC]:[mainC,comma,subC],R=K.chips(list,14,y0+14,A.W-28,{n:18});SUBR=R[v.front?0:2];GAP=R[1];
 if(v.drag){g.globalAlpha=.85;g.fillStyle='#fef3c7';A.paint.rrect(v.drag.x-SUBR.w/2,v.drag.y-SUBR.h/2,SUBR.w,SUBR.h,9);g.fill();g.strokeStyle=K.SUB;g.lineWidth=2.6;g.stroke();g.globalAlpha=1}
 let y=R.bottom+16;const f=`700 ${K.sz(14)}${K.F}`;g.fillStyle=K.fg();g.textAlign='left';g.textBaseline='top';
 ['Type: Complex (1 main clause + 1 subordinate clause)','Drag the amber clause. Tap the small gap for a comma.'].forEach(t=>{K.split(t,A.W-28,f).forEach(l=>{g.font=f;g.fillText(l,14,y);y+=K.sz(14)*1.35});y+=6})}
/* ---- 5. vary the paragraph ---- */
let SLOT=[];
function cycle(k){const v=Z.va;if(v.ok)return;v.pick[k]=(v.pick[k]+1)%D.VARY[k].length;A.sound.tick();judgeVary()}
function judgeVary(){const v=Z.va,opts=v.pick.map((p,k)=>D.VARY[k][p]),types=new Set(opts.flatMap(o=>o.ty)),last=opts[2],lw=last.t.split('. ').pop().split(' ').length;
 if(types.size<3)return speak(types.size===1?'Every sentence is the same type, so the paragraph sounds choppy and flat. Mix in other types.':`Only ${types.size} types so far. Use at least 3.`,true);
 if(last.ty[last.ty.length-1]!==0||lw>5)return speak('Good mix. Now the ending: after long sentences, a short simple sentence lands harder than a long one.',true);
 v.ok=1;A.sound.pop();speak(`${types.size} types, and it ends on "${last.t.split('. ').pop()}" (${lw} words). The short ending lands hard.`,false)}
function drawVary(){const v=Z.va,y0=K.banner(v.ok?D.DONE[4]:'Tap each part to rewrite it. Use 3+ types, end short.',v.ok?'ok':Z.bad?'no':'',Z.msg,Z.bad),g=A.ctx;
 const list=v.pick.map((p,k)=>({t:D.VARY[k][p].t,state:'x'}));SLOT=K.chips(list,14,y0+6,A.W-28,{n:A.narrow?14:15});
 const sents=v.pick.flatMap((p,k)=>{const o=D.VARY[k][p],parts=o.t.split('. ').map((x,j,arr)=>j<arr.length-1?x+'.':x);return parts.map((t,j)=>({w:t.split(' ').length,ty:o.ty[Math.min(j,o.ty.length-1)]}))});
 const top=SLOT.bottom+12,bh=Math.max(6,Math.min(20,(A.H-top-8)/sents.length-4)),mx=Math.max(...sents.map(s=>s.w)),cols=['#64748b','#1d4ed8','#b45309','#7c3aed'],lab=Math.min(170,A.W*.45);
 sents.forEach((s,i)=>{const y=top+i*(bh+4);g.fillStyle=cols[s.ty];g.fillRect(lab,y,(A.W-lab-16)*s.w/mx,bh);g.fillStyle=K.fg();g.font=`700 ${Math.min(K.sz(12),bh+3)}${K.F}`;g.textAlign='right';g.textBaseline='middle';g.fillText(`${D.TYPES[s.ty]}, ${s.w}`,lab-6,y+bh/2)})}
/* ---- input ---- */
function down(p){const m=stage();
 if(m==='find'){const r=FCH.find(r=>within(p,r));if(r)tapChunk(r.i);return false}
 if(m==='sort'){if(CARD&&within(p,CARD)){Z.so.drag={x:p.x,y:p.y};return true}const b=BINS.find(r=>within(p,r));if(b)sortAs(b.t);return false}
 if(m==='join'){const b=JB.find(r=>within(p,r));if(b)joinWith(b.k);return false}
 if(m==='move'){if(GAP&&within(p,{x:GAP.x-8,y:GAP.y-8,w:GAP.w+16,h:GAP.h+16})){toggleComma();return false}if(SUBR&&within(p,SUBR)){Z.mv.drag={x:p.x,y:p.y,x0:p.x};return true}return false}
 if(m==='vary'){const r=SLOT.find(r=>within(p,r));if(r)cycle(r.i);return false}return false}
function move(p){const d=stage()==='sort'?Z.so.drag:stage()==='move'?Z.mv.drag:null;if(d){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const m=stage();
 if(m==='sort'&&Z.so.drag){Z.so.drag=null;const b=BINS.find(r=>within(p,r));if(b)sortAs(b.t);else{A.redraw();speak('Drop the sentence on one of the four boxes.',false)}}
 if(m==='move'&&Z.mv.drag){const d=Z.mv.drag;Z.mv.drag=null;if(Math.abs(p.x-d.x0)<12&&Math.abs(p.y-d.y)<12){relocate(!Z.mv.front);return}relocate(p.x<A.W/2)}}
/* ---- wiring ---- */
function blank(){tok++;for(const k in Z)delete Z[k];Object.assign(Z,{fi:{s:0,hit:[],wrong:-1},so:{i:0,n:[0,0,0,0],wrong:-1,drag:null},jo:{last:-1,comp:0,cx:0},mv:{k:0,front:false,comma:false,drag:null},va:{pick:[0,0,0],ok:0},msg:null,bad:false,test:()=>{}})}
function open(i,finished){blank();c.say(D.DESC[i]);A.cv.setAttribute('aria-label',D.DESC[i]);Z.test=()=>{if(A.step===i&&finished()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(D.DONE[i]+A.reveal(i))};panel();A.redraw()}
function auto(i,fs){steps[i].go();const t0=tok;fs.forEach((f,n)=>setTimeout(()=>{if(t0===tok)f()},420*(n+1)))}
function panel(){if(!pad)return;pad.innerHTML='';const m=stage(),btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(m==='find'&&D.FIND[Z.fi.s])D.FIND[Z.fi.s].forEach((k,i)=>{if(!Z.fi.hit.includes(i))btn(k.t.replace(/[,.]$/,''),()=>tapChunk(i),`Main clause? ${k.t}`)});
 if(m==='sort'&&D.SORT[Z.so.i])D.TYPES.forEach((t,k)=>btn(t,()=>sortAs(k),`Sentence type: ${t}`));
 if(m==='join')D.JOIN.forEach((x,k)=>btn(x.w,()=>joinWith(k),`Join with ${x.w}`));
 if(m==='move'&&Z.mv.k<D.MOVE.length){btn('Clause to the front',()=>relocate(true));btn('Clause to the end',()=>relocate(false));btn(Z.mv.comma?'Remove the comma':'Add a comma',toggleComma)}
 if(m==='vary'&&!Z.va.ok)D.VARY.forEach((o,k)=>btn(`Rewrite part ${k+1}`,()=>cycle(k)))}
const steps=[
{h:'Main clauses',p:D.TXT[0],predict:{q:'"After the long, stormy night, the tired villagers slowly walked home." How many main clauses?',opts:['Two: there is a comma','One'],ans:1},task:'Find every main clause in 3 sentences',
 show:()=>auto(0,[()=>tapChunk(1),()=>tapChunk(0),()=>tapChunk(2),()=>tapChunk(1),()=>tapChunk(3)]),go:()=>open(0,()=>Z.fi.s>=D.FIND.length)},
{h:'Name the type',p:D.TXT[1],predict:{q:'"The enormous grey elephant with the torn ear trumpeted loudly across the dusty plain." What type is it?',opts:['Complex: it is long','Simple'],ans:1},task:'Sort all 6 sentences',
 show:()=>auto(1,D.SORT.map(it=>()=>sortAs(it.a))),go:()=>open(1,()=>Z.so.i>=D.SORT.length)},
{h:'Join two ideas',p:D.TXT[2],predict:{q:'"The storm hit the coast, then the town lost power." Is that a correct compound sentence?',opts:['Yes: "then" joins them','No: it is a comma splice'],ans:1},task:'Make a compound and a complex sentence',
 show:()=>auto(2,[()=>joinWith(6),()=>joinWith(1),()=>joinWith(4)]),go:()=>open(2,()=>Z.jo.comp&&Z.jo.cx)},
{h:'Move the clause',p:D.TXT[3],predict:{q:'Move "because it was raining" to the front. What type is the sentence now?',opts:['Compound','Still complex'],ans:1},task:'Put the clause first, with its comma, twice',
 show:()=>auto(3,[()=>relocate(true),toggleComma,()=>relocate(true),toggleComma]),go:()=>open(3,()=>Z.mv.k>=D.MOVE.length)},
{h:'Vary for effect',p:D.TXT[4],predict:{q:'After two long sentences, which ending hits harder?',opts:['A long sentence','A short, simple sentence'],ans:1},task:'Use 3+ types and end on a short sentence',
 show:()=>auto(4,[()=>cycle(0),()=>cycle(0),()=>cycle(1),()=>cycle(1),()=>cycle(2)]),go:()=>open(4,()=>Z.va.ok)},
{h:'Challenge',p:'',go:()=>{blank();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.test()});
function slipNote(t){let m='Count the clauses: main clauses can stand alone, subordinate clauses cannot.';
 if(t==='long')m='Length does not decide the type. One subject and one verb make one clause, so a long sentence can be simple.';
 if(t==='and')m='"And" can join two subjects or two verbs inside one clause. Compound needs two main clauses.';
 if(t==='splice')m='"Then" is an adverb, not a coordinating conjunction, so a comma plus "then" cannot join two main clauses: that is a comma splice.';
 if(t==='because')m='"Because" is a subordinating conjunction: "because the road was icy" cannot stand alone, so the sentence is complex.';
 if(t==='relative')m='"Which was soaked" is a relative clause, a kind of subordinate clause, so the sentence is complex.';
 if(t==='cc')m='Two main clauses joined by "and" plus the subordinate clause "If it snows" make it compound-complex.';
 if(t==='comma')m='"After lunch" has no verb, so it is a phrase. A comma does not make a new clause.';
 return m}
function ask(){qa++;const Q=D.QS[qa%D.QS.length],all=[[Q.a,'ok'],...Q.o],r=qa%3,order=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=quiz.querySelector('.fl-pick');order.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>grade(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function grade(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok',msg=ok?`Yes: ${a}.`:slipNote(t);if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?'✓ ':'✗ ')+msg+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(msg)}
function draw(){wash();const m=stage();if(m==='quiz'){K.banner('Challenge: types of sentences','ok');K.chips([{t:'main clause',state:'I'},{t:'subordinate clause',state:'D'},{t:'and / but / so',state:'J'},{t:'phrase',state:'P'}],14,A.H*.4,A.W-28,{n:17});return}
 ({find:drawFind,sort:drawSort,join:drawJoin,move:drawMove,vary:drawVary})[m]();A.fx.draw(A.ctx)}
FK.shell(c,{steps,ratio:.62,tall:1.4,draw,onStep:X=>{quiz.hidden=X.step!==5;pad.hidden=X.step===5;panel()},
 init:X=>{A=X;K=D.PEN(A);const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Sentence lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);blank();A.gest({down,move,up});panel()}}).start()})})();
